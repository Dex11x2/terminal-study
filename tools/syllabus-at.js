// بيسجّل قرار يدوي في syllabus/<tab>.json من غير ما تعدّل الملف بإيدك:
//   node tools/syllabus-at.js <tab> <id> "<cmd>" | "<cmd> › <عنوان القسم>"     البند ده متغطي هنا
//   node tools/syllabus-at.js <tab> <id> --note "<السبب>"                      لسه ناقص، وده اللي ناقص فيه
//   node tools/syllabus-at.js <tab> <id> --skip "<السبب>"                      مستبعد بقرار يدوي
// وكذا بند في مرة واحدة: كرّر <id> <value> ورا بعض. بعدها: node tools/syllabus.js <tab> --write
const fs = require('fs'), path = require('path');
const [tab, ...rest] = process.argv.slice(2);
const f = path.join(__dirname, '..', 'syllabus', tab + '.json');
const d = JSON.parse(fs.readFileSync(f, 'utf8'));
const by = new Map(d.items.map(i => [i.id, i]));
for (let i = 0; i < rest.length;) {
  const it = by.get(rest[i]);
  if (!it) { console.error('مفيش بند اسمه', rest[i]); process.exit(1); }
  if (rest[i + 1] === '--note') { delete it.at; it.note = rest[i + 2]; i += 3; }
  else if (rest[i + 1] === '--skip') { it.skip = rest[i + 2]; it.manual = true; i += 3; }
  else { it.at = rest[i + 1]; delete it.note; i += 2; }
}
fs.writeFileSync(f, '{\n' + Object.entries(d).filter(([k]) => k !== 'items').map(([k, v]) => ` ${JSON.stringify(k)}: ${JSON.stringify(v, null, k === 'refs' ? 1 : 0)}`).join(',\n') + ',\n "items": [\n' + d.items.map(i => '  ' + JSON.stringify(i)).join(',\n') + '\n ]\n}\n');
console.log('اتسجّل');
