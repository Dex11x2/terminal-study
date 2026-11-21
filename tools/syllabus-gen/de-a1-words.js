// Reads the alphabetical word list out of the Goethe A1 exam spec (pdftotext -layout output).
//   module: parseWords(text) -> [{w, art, pl, sub, page}]
//   cli:    node tools/syllabus-gen/de-a1-words.js .cache/de/pz.txt   (prints counts and a sample)
// Source: Goethe-Institut, «Goethe-Zertifikat A1: Start Deutsch 1, Prüfungsziele, Testbeschreibung»
// (A1_SD1_Pruefziele_07, 19.04.2022), Kapitel 5 «Alphabetische Wortliste», Seite 81–99.
// Only the headwords are kept: the example sentences are Goethe's text and stay out of the repo.
const fs = require('fs');

function parseWords(text) {
  const start = text.search(/Alphabetische\s+A\n/);
  const end = text.indexOf('\n               Grammatik\n', start);
  if (start < 0 || end < 0) throw new Error('word list bounds not found');
  const pages = text.slice(text.lastIndexOf('\n', start) + 1, end).split('\f');   // from the line start, or its indent is lost
  const out = [];
  let pageNo = 80;
  for (const pg of pages) {
    const m = pg.match(/Seite (\d+)/); const page = m ? +m[1] : pageNo + 1; pageNo = page;
    // the margin labels «Alphabetische» / «Wortliste» on the first page sit left of the headwords: blank them first
    const lines = pg.split('\n').filter(l => l.trim() && !/VS_08_|Seite \d+|^\s*Inventare\s*$/.test(l))
      .map(l => l.replace(/^(\s*)(Alphabetische|Wortliste)(\s+)(?=\S)/, (x, a, b, c) => a + ' '.repeat(b.length + c.length)));
    // the example column: the most common start column of text after a 2+ space gap
    const cols = {};
    for (const l of lines) { const mm = l.match(/^( *)(\S.*?)( {2,})(\S)/); if (mm) { const c = mm[1].length + mm[2].length + mm[3].length; cols[c] = (cols[c] || 0) + 1; } }
    const best = Object.entries(cols).sort((a, b) => b[1] - a[1])[0];
    if (!best) continue;                                   // a page with no entry lines
    const ex = +best[0];
    // the headword column: the smallest indent of a line that starts before the example column
    const head = Math.min(...lines.map(l => l.match(/^ */)[0].length).filter(i => i < ex - 3));
    let prev = null;
    for (const l of lines) {
      const ind = l.match(/^ */)[0].length;
      if (ind >= ex - 3) continue;                       // continuation of an example
      let body = l.slice(ind).split(/ {2,}/)[0].trim();
      // two lines where only one space separates the headword from its example («der Arbeitsplatz, -ä, e An meinem …»)
      const glued = body.match(/^((?:der|die|das)\s.*?)\s+(?=[A-ZÄÖÜ][a-zäöüß]+\s+[a-zäöüß])/);
      if (/\(pl\.\)/.test(body)) body = body.replace(/(\(pl\.\)).*$/, '$1');
      else if (glued && body.split(' ').length > 5) body = glued[1];
      if (!body || /^[A-ZÄÖÜ]$/.test(body)) { prev = null; continue; } // letter heading
      // a noun broken over two lines: «der Anruf-» + «beantworter» (not «all-» / «ander-», which are entries of their own)
      // («der Ausländer, -» ends in a plural dash, not a broken word: the comma tells them apart)
      if (prev && prev.art && /[A-Za-zäöüß]-$/.test(prev.raw) && !prev.raw.includes(',') && /^[a-zäöüß]/.test(body) && ind > head) { prev.raw = prev.raw.slice(0, -1) + body; Object.assign(prev, split(prev.raw)); continue; }
      // «der Ausländer, ausländisch»: two entries on one line (a lowercase word where the plural would be)
      const two = body.match(/^((?:der|die|das) [^,]+),\s*([a-zäöüß]+)$/);
      if (two) { out.push({ raw: two[1], sub: ind > head, page, ...split(two[1]) }, { raw: two[2], sub: true, page, ...split(two[2]) }); prev = null; continue; }
      const e = { raw: body, sub: ind > head, page, ...split(body) };
      out.push(e); prev = e;
    }
  }
  return out.map(({ raw, ...e }) => ({ ...e, raw }));
}

// «der Apfel, ¨-» -> {art:'der', w:'Apfel', pl:'¨-'}; «(sich) anmelden» -> {w:'anmelden', refl:true}
function split(s) {
  const r = {};
  let t = s;
  const pm = t.match(/,\s*(.+)$/); if (pm) { r.pl = pm[1].trim(); t = t.slice(0, pm.index).trim(); }
  const am = t.match(/^(der|die|das)\s+(.+)$/); if (am) { r.art = am[1]; t = am[2]; }
  if (/\s*\(pl\.\)$/.test(t)) { r.plOnly = true; t = t.replace(/\s*\(pl\.\)$/, ''); }
  if (/^\(sich\)\s+/.test(t)) { r.refl = true; t = t.replace(/^\(sich\)\s+/, ''); }
  r.w = t;
  return r;
}

module.exports = { parseWords };
if (require.main === module) {
  const words = parseWords(fs.readFileSync(process.argv[2], 'utf8'));
  const main = words.filter(w => !w.sub);
  console.log('entries', words.length, 'main', main.length, 'sub', words.length - main.length,
    'nouns', words.filter(w => w.art).length, 'pages', [...new Set(words.map(w => w.page))].join(','));
  for (const w of words.filter((_, i) => i % 40 === 0)) console.log(JSON.stringify(w));
}
