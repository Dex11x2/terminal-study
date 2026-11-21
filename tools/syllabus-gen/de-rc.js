// Reads the learning goals («Lernziele») out of the BAMF «Rahmencurriculum für Integrationskurse» (2017).
//   pdftotext -layout rahmencurriculum-integrationskurs_20171.pdf rc.txt   (tools/de/README.md)
// Each goal sits in a table row: LERNZIELE | AKTIVITÄTEN | NIVEAU | [HANDLUNGSZIELE] | FOKUS LANDESKUNDE.
// The columns are found from each table's header line; a row starts where the goal column starts with «Kann».
// Returns [{ field, sec, secT, t, act, level, lk, page }] (page = the printed page number).
//   node tools/syllabus-gen/de-rc.js   -> prints the counts per level and field (a check, writes nothing)
const FIELDS = {
  A: 'Umgang mit der Migrationssituation', B: 'Realisierung von Gefühlen, Haltungen und Meinungen',
  C: 'Umgang mit Dissens und Konflikten', D: 'Gestaltung sozialer Kontakte', E: 'Umgang mit dem eigenen Sprachenlernen',
  1: 'Ämter und Behörden', 2: 'Arbeit', 3: 'Arbeitssuche', 4: 'Aus- und Weiterbildung', 5: 'Banken und Versicherungen',
  6: 'Betreuung und Ausbildung der Kinder', 7: 'Einkaufen', 8: 'Gesundheit', 9: 'Mediennutzung', 10: 'Mobilität',
  11: 'Unterricht', 12: 'Wohnen',
};

function parseRC(text) {
  const pages = text.replace(/­/g, '').split('\f');
  const out = [];
  let sec = null, secT = '', cols = null, row = null;
  const flush = () => { if (row) { out.push(fin(row)); row = null; } };
  const fin = r => {
    const join = a => a.reduce((s, l) => (s && /[a-zäöüß]-$/.test(s) && /^[a-zäöüß]/.test(l) ? s.slice(0, -1) + l : s ? s + ' ' + l : l), '');
    return { field: r.field, sec: r.sec, secT: r.secT, t: join(r.t), act: join(r.act).replace(/\s+/g, ' '), level: r.level, lk: join(r.lk), page: r.page };
  };
  pages.forEach((pg, i) => {
    const printed = i + 1;                       // the PDF page; the number printed on it is one more (the cover has none)
    if (printed < 28) return;                    // chapters 1–6 only explain the tables (with sample rows); the goals start on p. 29
    for (const line of pg.split('\n')) {
      const h = line.match(/^\s{0,2}((?:[A-E] )?\d+(?:\.\d+)+|[A-E] \d+)\s+([A-ZÄÖÜ][A-ZÄÖÜß ,\-\/–]+)\s*$/);
      if (h) { flush(); sec = h[1]; secT = h[2].trim(); cols = null; continue; }
      if (/LERNZIELE\s+AKTIVIT/.test(line)) {
        flush();
        cols = { act: line.indexOf('AKTIVIT'), lvl: line.indexOf('NIVEAU'), lk: line.indexOf('FOKUS LANDESKUNDE'), hz: line.indexOf('HANDLUNGSZIELE') };
        continue;
      }
      if (!cols || !line.trim()) continue;
      if (/^\s*(→|\S.*Seite \d+)/.test(line) && !/^\s*Kann /.test(line)) { flush(); if (/^\s*→/.test(line)) cols = cols; continue; }
      // cut the line at the column starts (±3 characters: the rows are not always aligned with the header)
      const segs = []; const re = /\S+(?: \S+)*/g; let m;
      while ((m = re.exec(line))) segs.push({ at: m.index, s: m[0] });
      const pick = { t: [], act: [], lvl: [], hz: [], lk: [] };
      // the data columns sit a few characters off the header (the header is centred): learn the shift from the level token
      const lv = segs.find(g => /^(A1|A2|B1)/.test(g.s) && g.at > cols.act);
      if (lv && cols.shift == null) cols.shift = lv.at - cols.lvl;
      const sh = cols.shift || 0, lvlAt = cols.lvl + sh;
      for (const g of segs) {
        if (g.at < cols.act - 3) { pick.t.push(g.s); continue; }
        if (g.at < lvlAt - 1) { pick.act.push(g.s); continue; }
        if (g.at <= lvlAt + 1) {                     // the level, sometimes glued to the next column by pdftotext
          const m2 = g.s.match(/^(A1|A2|B1)\s*(.*)$/);
          if (m2) { pick.lvl.push(m2[1]); if (m2[2]) pick.lk.push(m2[2]); continue; }
        }
        const right = cols.hz > 0 && cols.lk > 0 && g.at < (cols.hz + cols.lk) / 2 + sh ? 'hz' : 'lk';
        pick[right].push(g.s);
      }
      const t = pick.t.join(' ');
      if (/^Kann\b/.test(t)) {
        flush();
        const field = sec.replace(/^([A-E]) .*/, '$1').replace(/^(\d+)\..*/, '$1');
        row = { field, sec, secT, t: [], act: [], level: '', lk: [], page: printed + 1 };
      }
      if (!row) continue;
      if (t) row.t.push(t);
      if (pick.act.length) row.act.push(pick.act.join(' '));
      if (pick.lvl.length && !row.level) row.level = pick.lvl.join(' ');
      if (pick.lk.length) row.lk.push(pick.lk.join(' '));
    }
    flush();
  });
  return out;
}

module.exports = { parseRC, FIELDS };

if (require.main === module) {
  const fs = require('fs');
  const goals = parseRC(fs.readFileSync(process.argv[2] || '.cache/de/src/rc.txt', 'utf8'));
  const by = {}; for (const g of goals) by[g.level] = (by[g.level] || 0) + 1;
  console.log('goals', goals.length, by);
  const a1 = goals.filter(g => g.level === 'A1');
  const f = {}; for (const g of a1) f[g.field] = (f[g.field] || 0) + 1;
  console.log('A1 per field', f);
  const odd = goals.filter(g => !/^(A1|A2|B1)$/.test(g.level) || !g.act);
  console.log('odd', odd.length); odd.slice(0, 10).forEach(g => console.log(' ', g.sec, JSON.stringify(g.level), g.act, '|', g.t.slice(0, 80)));
  if (process.argv.includes('--show')) a1.forEach(g => console.log(g.page, g.sec, g.act, '|', g.t, g.lk ? '  [LK] ' + g.lk : ''));
}
