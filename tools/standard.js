// بيقيس كل تاب على المعيار: وحدة كورس، توصل بنفسك، مشروع، مواقف من التشغيل
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = process.argv[2];
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(m => m[1]);
const ctx = { window: {}, document: { querySelector(){return null}, addEventListener(){} }, console, navigator: {}, location: { hash: '' }, localStorage: { getItem(){return null}, setItem(){} } };
ctx.self = ctx; vm.createContext(ctx);
for (const f of files) {
  if (f.includes('app.js')) continue;
  try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }); } catch (e) { if (!/document|window/.test(e.message)) console.error(f, e.message); }
}
const DATA = vm.runInContext('DATA', ctx), TEACH = vm.runInContext('typeof TEACH!=="undefined"?TEACH:{}', ctx);
const rows = [];
for (const [tab, cats] of Object.entries(DATA)) {
  let lessons = 0, ran = 0;
  for (const c of cats) for (const it of c.items) {
    lessons++;
    const t = TEACH[tab + '|' + it[0]] || '';
    if (/اتشغّل فعلًا|اتشغل فعلا/.test(t)) ran++;
  }
  const names = cats.map(c => c.t);
  rows.push({
    tab, lessons,
    unit: cats.filter(c => c.goal || c.projects).length,
    self: names.some(n => /بنفسك/.test(n)) ? 'Y' : '-',
    proj: names.filter(n => /^مشروع|ابني/.test(n)).length,
    ranPct: lessons ? Math.round(100 * ran / lessons) : 0,
    // all of a unit's projects, and the units whose projects climb صغير → متوسط → كبير
    projs: cats.reduce((n, c) => n + (c.projects || []).length, 0),
    ladder: cats.filter(c => ['صغير', 'متوسط', 'كبير'].every(l => (c.projects || []).some(p => p.lvl === l))).length,
  });
}
rows.sort((a, b) => a.ranPct - b.ranPct);
console.log('tab'.padEnd(12), 'دروس'.padStart(5), 'وحدات'.padStart(6), 'بنفسك', 'مشروع', '٪اتشغّل', 'مشاريع', 'سلّمة');
for (const r of rows) console.log(r.tab.padEnd(12), String(r.lessons).padStart(5), String(r.unit).padStart(6), '  ' + r.self + '  ', String(r.proj).padStart(4), String(r.ranPct).padStart(6) + '%', String(r.projs).padStart(6), String(r.ladder).padStart(5));
console.log('\nمشاريع =كل المشاريع في حقول projects. سلّمة = الوحدات اللي مشاريعها فيها صغير ومتوسط وكبير (القاعدة ٩).');
