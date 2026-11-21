// Pulls the course words out of the Wiktionary dump (kaikki.org, English Wiktionary, German entries; CC BY-SA)
// and checks every noun's article and plural in the Goethe list against it.
//   node tools/syllabus-gen/de-wikt.js     (needs .cache/de/pz.txt and .cache/de/kaikki-de.jsonl.gz)
//   -> .cache/de/wikt-a1.json (the entries, kept out of git) and a report of every disagreement
// Dump: https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl.gz (≈99 MB, read as a stream)
const fs = require('fs'), zlib = require('zlib'), readline = require('readline');
const { parseWords } = require('./de-a1-words');

const C = '.cache/de/';
const words = parseWords(fs.readFileSync(C + 'pz.txt', 'utf8'));
// the lookup keys: «Samstag/Sonnabend» -> both; «(Kredit)-Karte» -> Karte; «letzt-» -> letzt (adjectives come back as letzte)
const keys = new Set();
for (const w of words) for (const k of w.w.split('/')) { const c = k.replace(/\(.*?\)-?/g, '').replace(/-$/, '').trim(); if (c) keys.add(c); }

const GENDER = { m: 'der', f: 'die', n: 'das' };
async function extract() {
  const found = {};
  const r = readline.createInterface({ input: fs.createReadStream(C + 'kaikki-de.jsonl.gz').pipe(zlib.createGunzip()) });
  for await (const line of r) {
    // the entry's own word sits right before "lang"; an earlier "word" can belong to a related word (antonyms of Mann: Frau)
    const m = line.match(/"word": "([^"]+)", "lang": "German"/); if (!m) continue;
    const w = m[1];
    if (!keys.has(w)) continue;
    const e = JSON.parse(line);
    const h = (e.head_templates || [])[0] || {};
    const g = e.pos === 'noun' ? ((h.args && h.args[1]) || '').split(',')[0] : '';
    const forms = e.forms || [];
    const pick = tag => forms.filter(f => f.tags && f.tags.length && f.tags.every(t => tag.includes(t)) && tag.every(t => f.tags.includes(t))).map(f => f.form);
    (found[w] = found[w] || []).push({
      pos: e.pos,
      gender: g.split('').map(c => GENDER[c]).filter(Boolean),          // «mf» -> der, die
      plural: e.pos === 'noun' ? pick(['plural']) : undefined,
      verb: e.pos === 'verb' ? { pres3: pick(['present', 'singular', 'third-person'])[0], past: pick(['past', 'singular', 'third-person'])[0], pp: pick(['participle', 'past'])[0], aux: forms.filter(f => (f.tags || []).includes('auxiliary')).map(f => f.form) } : undefined,
      ipa: (e.sounds || []).map(s => s.ipa).filter(Boolean)[0],
      audio: (e.sounds || []).filter(s => s.ogg_url || s.mp3_url).map(s => s.ogg_url || s.mp3_url).slice(0, 2),
      gloss: (e.senses || []).map(s => (s.glosses || []).join('; ')).filter(Boolean).slice(0, 3),
      head: h.expansion,
    });
  }
  return found;
}

// Goethe writes plurals as an ending: «-n», «-e», «–» (no change), «-ä, e» (umlaut + e), «-s»
function goethePlural(word, pl) {
  if (!pl) return null;
  const p = pl.replace(/\/$/, '').trim();
  if (p === '–' || p === '-') return [word];
  const m = p.match(/^-?([äöüÄÖÜ])?(?:,\s*)?-?([a-zß]*)$/);
  if (!m) return null;
  let stem = word;
  if (m[1]) {                                    // umlaut the last a/o/u; «au» becomes «äu» (Baum -> Bäume), not «aü»
    const um = { a: 'ä', o: 'ö', u: 'ü', A: 'Ä', O: 'Ö', U: 'Ü' };
    const idx = Math.max(...['a', 'o', 'u', 'A', 'O', 'U'].map(v => stem.lastIndexOf(v)));
    const at = /[aA]u/.test(stem.slice(idx - 1, idx + 1)) && stem[idx] === 'u' ? idx - 1 : idx;
    if (at >= 0) stem = stem.slice(0, at) + um[stem[at]] + stem.slice(at + 1);
  }
  // «die Adresse, -en» means Adressen: the list writes the full ending even after a final e
  return [/e$/.test(stem) && m[2] === 'en' ? stem + 'n' : stem + (m[2] || '')];
}

(async () => {
  const found = await extract();
  fs.writeFileSync(C + 'wikt-a1.json', JSON.stringify(found));
  const nouns = words.filter(w => w.art), missing = [], gender = [], plural = [];
  for (const n of nouns) {
    const key = n.w.split('/')[0].replace(/\(.*?\)-?/g, '').trim();
    const ent = (found[key] || []).filter(e => e.pos === 'noun');
    if (!ent.length) { missing.push(n.raw); continue; }
    const gs = new Set(ent.flatMap(e => e.gender));
    // plural-only nouns («die Möbel (pl.)»): Goethe's «die» is the plural article, Wiktionary gives the singular's gender
    if (gs.size && !gs.has(n.art) && !n.plOnly) gender.push(`${n.raw}  (Wiktionary: ${[...gs].join('/')})`);
    // nouns made from adjectives (der Beamte, die Erwachsenen): Goethe gives the weak «-n», Wiktionary the strong form; both are right
    const want = /e$/.test(key) && n.pl === '-n' && ent.some(e => /adjectival/.test(e.head || '')) ? [key + 'n', key] : goethePlural(key, n.pl), have = new Set(ent.flatMap(e => e.plural || []));
    if (want && have.size && !want.some(x => have.has(x))) plural.push(`${n.raw} -> ${want[0]}  (Wiktionary: ${[...have].join(', ')})`);
  }
  const all = [...keys], hit = all.filter(k => found[k]);
  console.log(`keys ${all.length}, found in Wiktionary ${hit.length}, missing ${all.length - hit.length}: ${all.filter(k => !found[k]).join(', ')}`);
  console.log(`nouns ${nouns.length}: not found ${missing.length}, article disagrees ${gender.length}, plural disagrees ${plural.length}`);
  console.log('ARTICLE:\n  ' + gender.join('\n  '));
  console.log('PLURAL:\n  ' + plural.join('\n  '));
  console.log('NOUN NOT FOUND: ' + missing.join(' | '));
  const withIpa = hit.filter(k => found[k].some(e => e.ipa)).length, withAudio = hit.filter(k => found[k].some(e => e.audio.length)).length;
  console.log(`IPA for ${withIpa}/${hit.length}, a real recording (Commons) for ${withAudio}/${hit.length}`);
})();
