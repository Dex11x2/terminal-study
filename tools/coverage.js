// بيقارن لستة المواضيع اللي لازم تبقى في كل تاب (tools/topics/*.json) بالدروس الموجودة
//   node tools/coverage.js           ملخص لكل تاب: كام موضوع موجود من كام
//   node tools/coverage.js <tab>     المواضيع الناقصة في التاب ده، وفين لقى الموجود
// الموضوع «موجود» لو أي كلمة من find موجودة في cmd أو title درس في التاب، أو في عنوان ## / ### جوه teach بتاعه.
// ذكر عابر في نص الشرح مش بيتحسب: لازم درس أو قسم باسم يتلاقي (PLAN القاعدة ٩).
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => !f.includes('app.js'));
const ctx = { console: { log() {}, warn() {}, error() {} }, window: {}, document: { querySelector() { return null; }, addEventListener() {} }, navigator: {}, location: { hash: '' } };
ctx.self = ctx; vm.createContext(ctx);
for (const f of files) { try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }); } catch {} }
const { DATA, TEACH } = vm.runInContext('({DATA, TEACH})', ctx);
// tools/topics/*.json: { "<tab>": [ { "topic": "اسم الموضوع", "find": ["keyword", ...], "lvl": "أساسي|يومي|متقدم|إنتاج" } ] }
const dir = path.join(__dirname, 'topics');
const TOPICS = Object.assign({}, ...fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))));

const low = s => String(s || '').toLowerCase();
function places(tab) {
  const out = [];
  for (const cat of DATA[tab] || []) for (const it of cat.items) {
    out.push({ where: it[0], text: low(it[0] + ' ' + (it[1] || '')) });
    for (const h of String(TEACH[tab + '|' + it[0]] || '').match(/^#{2,3} .+$/gm) || []) out.push({ where: it[0] + ' › ' + h.replace(/^#+ /, ''), text: low(h) });
  }
  return out;
}
const only = process.argv[2];
let all = 0, have = 0;
for (const [tab, topics] of Object.entries(TOPICS)) {
  if (only && tab !== only) continue;
  if (!DATA[tab]) { console.log('✗ مفيش تاب اسمه', tab); continue; }
  const P = places(tab), miss = [], hit = [];
  for (const t of topics) {
    const at = P.find(p => t.find.some(k => p.text.includes(low(k))));
    (at ? hit : miss).push([t, at]);
  }
  all += topics.length; have += hit.length;
  if (only) {
    console.log(`${tab}: ${hit.length} من ${topics.length} موجودين\n`);
    for (const [t] of miss) console.log('  ناقص', (t.lvl ? '[' + t.lvl + '] ' : '') + t.topic, '  (دوّر على: ' + t.find.join(' / ') + ')');
    console.log('');
    for (const [t, at] of hit) console.log('  موجود', t.topic, '←', at.where);
  } else console.log(tab.padEnd(10), String(hit.length).padStart(4), '/', String(topics.length).padEnd(4), miss.length ? 'ناقص: ' + miss.slice(0, 4).map(([t]) => t.topic).join('، ') + (miss.length > 4 ? '…' : '') : '✓');
}
if (!only) console.log(`\nالمجموع: ${have} من ${all} موضوع موجودين`);
