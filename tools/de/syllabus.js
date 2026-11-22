// Measures the German A1 course against its syllabus (syllabus/de-a1.json, ROADMAP rule 1), not against a list from memory.
//   node tools/de/syllabus.js           summary per kind, and what is missing
//   node tools/de/syllabus.js --all     every item and where it is covered
//   node tools/de/syllabus.js --write   writes the report to syllabus/de-a1-coverage.md (committed, the next chat reads it)
//
// Words (742 from the Goethe list + 55 the other exams use): «card» when a ~~~words card teaches it, «mentioned» when the
// word only appears in a German line, «missing» when it appears nowhere. Every other item (exam parts, grammar, themes,
// speech acts, notions, strategies, curriculum situations, CEFR descriptors) is placed by hand in syllabus/de-a1-map.js:
// «id | lesson | evidence». An item counts as covered only when that lesson really holds the evidence (a regex, case-insensitive),
// so a mapping can't claim more than the lesson teaches. «gap» marks a known hole with a note, «skip» an item that doesn't
// apply, with its reason.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..', '..');
const SYL = require(path.join(ROOT, 'syllabus', 'de-a1.json'));
const MAP = require(path.join(ROOT, 'syllabus', 'de-a1-map.js'));

// the lessons, read the way the page reads them: the dea1 files in index.html order
const files = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/src="(js\/tabs\/dea1\/[^"]+)"/g)].map(m => m[1]);
const cats = [];
const ctx = { R: String.raw, TAB: (k, d) => cats.push(...d.categories), MORE: (k, list) => cats.push(...list) };
for (const f of files) vm.runInNewContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);
const lessons = new Map();
cats.forEach((c, i) => c.items.forEach(it => lessons.set(it.cmd, { unit: i + 1, cat: c, text: JSON.stringify(it) })));
cats.forEach((c, i) => lessons.set('unit:' + (i + 1), { unit: i + 1, cat: c, text: JSON.stringify(c) }));

// word cards: «der Bruder, die Brüder | …» -> lemma «bruder»; «(sich) anmelden» -> «anmelden»
// The list writes words many ways: «der/die Bekannte», «zum Beispiel/z. B.», «(Kredit)-Karte», «letzt-» (any ending),
// «weh tun» (also «wehtun»). lemmas() gives every form worth looking for; a trailing «-» means «this stem + any ending».
const lemmas = w => {
  w = w.replace(/^\s*(der|die|das)\/(der|die|das)\s+/i, '').replace(/\([^)]*\)-?/g, '').split(/,/)[0].replace(/^\s*(der|die|das)\s+/i, '').trim().toLowerCase();
  const alts = w.split('/').map(s => s.trim()).filter(Boolean);
  if (/\s/.test(w) && !w.includes('/')) alts.push(w.replace(/\s+/g, ''));
  return alts;
};
const cards = new Map();
for (const [cmd, l] of lessons) {
  if (cmd.startsWith('unit:')) continue;
  const teach = JSON.parse(l.text).teach || '';
  for (const m of teach.matchAll(/^~~~words[^\n]*\n([\s\S]*?)^~~~[ \t]*$/gm))
    for (const line of m[1].split('\n')) if (line.trim()) for (const k of lemmas(line.split(' | ')[0])) if (!cards.has(k)) cards.set(k, cmd);
}
// every German line of the course, for «mentioned»
const german = [];
for (const [cmd, l] of lessons) if (!cmd.startsWith('unit:')) german.push(l.text);
const allText = german.join('\n');
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const appears = w => new RegExp('(^|[^\\p{L}])' + (w.endsWith('-') ? esc(w.slice(0, -1)) + '\\p{L}*' : esc(w)) + '($|[^\\p{L}])', 'iu').test(allText);
const cardOf = w => { for (const k of lemmas(w)) { const s = k.endsWith('-') ? k.slice(0, -1) : k; for (const [c, cmd] of cards) if (c === k || (k.endsWith('-') && c.startsWith(s))) return cmd; } };

// --find "<regex>": which lessons hold this evidence, and how often (to fill the map)
const fi = process.argv.indexOf('--find');
if (fi > 0) {
  const re = new RegExp(process.argv[fi + 1], 'giu'), inv = Object.fromEntries(Object.entries(MAP.alias).map(([a, c]) => [c, a]));
  for (const [cmd, l] of lessons) { const n = (l.text.match(re) || []).length; if (n) console.log(String(n).padStart(4), (inv[cmd] || cmd).padEnd(6), cmd); }
  process.exit(0);
}

// the hand map
const where = new Map();
for (const raw of MAP.lines.split('\n')) {
  const l = raw.trim();
  if (!l || l.startsWith('#')) continue;
  const [id, at, ...rest] = l.split(' | '), ev = rest.join(' | ').trim(); // the evidence regex may hold «|» itself
  where.set(id, { at: MAP.alias[at] || at, ev: ev || '' });
}

const rows = [];
for (const it of SYL.items) {
  const r = { id: it.id, kind: it.kind, group: it.group || '', t: it.t || it.w || (it.sec ? it.sec + ' (' + it.act + ')' : it.id), ar: it.ar || '' };
  if (it.kind === 'word') {
    const w = it.w || it.t, at = cardOf(w);
    if (at) Object.assign(r, { status: 'card', at });
    else if (lemmas(w).some(appears)) Object.assign(r, { status: 'mentioned' });
    else r.status = 'missing';
  } else if (it.skip) Object.assign(r, { status: 'skip', note: it.skip });
  else {
    const w = where.get(it.id);
    if (!w) r.status = 'unmapped';
    else if (w.at === 'skip') Object.assign(r, { status: 'skip', note: w.ev });
    else if (w.at === 'gap') Object.assign(r, { status: 'missing', note: w.ev });
    else {
      const l = lessons.get(w.at);
      if (!l) Object.assign(r, { status: 'missing', note: 'الدرس مش موجود: ' + w.at });
      else if (w.ev && !new RegExp(w.ev, 'iu').test(l.text)) Object.assign(r, { status: 'missing', note: 'الدليل «' + w.ev + '» مش موجود في ' + w.at });
      else Object.assign(r, { status: 'covered', at: w.at });
    }
  }
  rows.push(r);
}

const KINDS = { exam: 'أجزاء الامتحانات', grammar: 'القواعد', group: 'مجموعات الكلمات', theme: 'المواضيع', act: 'أفعال الكلام (Sprechhandlungen)', notion: 'المفاهيم (Notionen)', strategy: 'استراتيجيات الكلام', situation: 'مواقف منهج الاندماج', cefr: 'جمل CEFR', word: 'الكلمات' };
const out = [];
const say = s => out.push(s);
say('# قياس ألماني A1 على المنهج\n');
say('اتعمل بـ `node tools/de/syllabus.js --write` من `syllabus/de-a1.json` (١٢٩٤ بند) و `syllabus/de-a1-map.js` (مكان كل بند). البند «متغطي» لما الدرس اللي عليه فيه الدليل فعلًا. الكلمة «متغطية» لما ليها كارت في ~~~words، و«مذكورة» لما بتيجي في جملة بس (والفعل المنفصل لما بييجي متصرّف زي «gibt … ab» مش بيتحسب).\n');
say('| النوع | متغطي | ناقص | مستبعد | النسبة |');
say('|---|---|---|---|---|');
let C = 0, T = 0;
for (const k of Object.keys(KINDS)) {
  const rs = rows.filter(r => r.kind === k), skip = rs.filter(r => r.status === 'skip').length;
  const ok = rs.filter(r => r.status === 'covered' || r.status === 'card').length, n = rs.length - skip;
  const extra = k === 'word' ? ' (+' + rs.filter(r => r.status === 'mentioned').length + ' مذكورة من غير كارت)' : '';
  say(`| ${KINDS[k]} | ${ok}${extra} | ${n - ok - (k === 'word' ? rs.filter(r => r.status === 'mentioned').length : 0)} | ${skip} | ${n ? Math.round(ok / n * 100) : 100}٪ |`);
  C += ok; T += n;
}
say(`| **الكل** | **${C}** | | | **${Math.round(C / T * 100)}٪** |\n`);
const miss = rows.filter(r => r.status === 'missing' || r.status === 'unmapped');
for (const k of Object.keys(KINDS)) {
  const rs = miss.filter(r => r.kind === k);
  if (!rs.length) continue;
  say(`## ناقص: ${KINDS[k]} (${rs.length})\n`);
  if (k === 'word') say(rs.map(r => r.t).join('، ') + '\n');
  else rs.forEach(r => say(`- ${r.t}${r.ar ? ' — ' + r.ar : ''}${r.status === 'unmapped' ? ' (مش متخطط)' : ''}${r.note ? ' — ' + r.note : ''}`));
  say('');
}
const ment = rows.filter(r => r.status === 'mentioned');
if (ment.length) { say(`## كلمات مذكورة من غير كارت (${ment.length})\n`); say(ment.map(r => r.t).join('، ') + '\n'); }
const skips = rows.filter(r => r.status === 'skip');
if (skips.length) { say(`## مستبعد (${skips.length})\n`); skips.forEach(r => say(`- ${r.t} — ${r.note}`)); say(''); }
if (process.argv.includes('--all')) { say('## كل البنود\n'); rows.forEach(r => say(`- [${r.status}] ${r.id} ${r.at ? '→ ' + r.at : ''}`)); }

const report = out.join('\n') + '\n';
if (process.argv.includes('--write')) { fs.writeFileSync(path.join(ROOT, 'syllabus', 'de-a1-coverage.md'), report); console.log('اتكتب syllabus/de-a1-coverage.md'); }
console.log(out.slice(0, 16).join('\n'));
