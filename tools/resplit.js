// بيعيد تقسيم ملفات تاب لما تكبر (مثلًا بعد ما اتضاف «الشرح خطوة بخطوة»):
//   node tools/resplit.js ps            كل ملف حوالي 1200 سطر، والقسم الواحد مبيتقسمش
//   node tools/resplit.js ps 1500       حد تاني للسطور
// بيجمع أقسام التاب من كل ملفاته بالترتيب، ويوزّعها من جديد على 01.js و 02.js ...، ويحدّث index.html.
// قبل ما يكتب أي حاجة بيتأكد إن الدروس بعد التقسيم هي هي بالظبط، ولو فيه أي فرق مبيكتبش.
// متشغّلوش وفيه حد بيعدّل في ملفات التاب نفسه.
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require('./lib.js');
const [tab, limitArg] = process.argv.slice(2);
const LIMIT = +limitArg || 1200;
const die = m => { console.error(m); process.exit(1); };
const files = L.tabFiles()[tab] || die('مفيش تاب اسمه ' + tab);
const read = f => fs.readFileSync(path.join(L.ROOT, f), 'utf8');

// every category's source text, in load order, plus the head and tail of 01.js (TAB(...) header and closing)
let head, tail;
const cats = [];
files.forEach((f, n) => {
  const src = read(f);
  const m = src.match(n === 0 ? /\bcategories:\s*\[/ : /\bMORE\("[^"]+",\s*\[/) || die(f + ': مش لاقي أول الأقسام');
  const open = m.index + m[0].length - 1;
  const { end, els } = L.arrayElements(src, open);
  if (n === 0){ head = src.slice(0, open + 1); tail = src.slice(end - 1); }
  els.forEach(e => cats.push(src.slice(src.lastIndexOf('\n', e.start) + 1, e.end)));
});

const chunks = [[]]; let lines = 0;
for (const c of cats){
  const n = c.split('\n').length;
  if (chunks[chunks.length - 1].length && lines + n > LIMIT){ chunks.push([]); lines = 0; }
  chunks[chunks.length - 1].push(c); lines += n;
}
const names = chunks.map((_, i) => 'js/tabs/' + tab + '/' + String(i + 1).padStart(2, '0') + '.js');
const out = chunks.map((c, i) => i === 0
  ? head + '\n' + c.join(',\n') + '\n  ' + tail
  : '// تكملة تاب ' + tab + ': الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/' + tab + '/01.js (شرح حقول الدرس في أوله)\nMORE("' + tab + '", [\n' + c.join(',\n') + '\n]);\n');

// same lessons, same order, same content, or nothing is written
const before = JSON.stringify(L.loadRaw({ [tab]: files }));
const after = JSON.stringify(L.loadRaw({ [tab]: names }, f => out[names.indexOf(f)]));
if (before !== after) die('التقسيم الجديد بيغيّر الدروس، فمكتبتش حاجة');

files.forEach(f => fs.unlinkSync(path.join(L.ROOT, f)));
names.forEach((f, i) => fs.writeFileSync(path.join(L.ROOT, f), out[i]));
let html = read('index.html');
const tags = files.map(f => '<script src="' + f + '"></script>');
const first = html.indexOf(tags[0]);
html = html.slice(0, first) + names.map(f => '<script src="' + f + '"></script>').join('\n') + html.slice(html.indexOf(tags[tags.length - 1]) + tags[tags.length - 1].length);
fs.writeFileSync(path.join(L.ROOT, 'index.html'), html);
console.log(tab + ': ' + files.length + ' ملف بقوا ' + names.length + ' (أكبر ملف ' + Math.max(...out.map(s => s.split('\n').length)) + ' سطر)');
