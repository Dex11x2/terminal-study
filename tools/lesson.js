// اقرا درس واحد من غير ما تفتح ملفات التاب كلها:
//   node tools/lesson.js                      كل التابات: عدد الدروس والملفات
//   node tools/lesson.js bash                 أقسام التاب، وكل درس في أنهي ملف وسطر
//   node tools/lesson.js bash "PS1"           الدرس نفسه (الكود زي ما هو مكتوب) ومكانه بالظبط
//   node tools/lesson.js bash "PS1" --where   المكان بس (ملف:من-لحد)
//   node tools/lesson.js find "shutdown"      دوّر في أسامي الدروس وعناوينها في كل التابات
const fs = require('fs'), path = require('path');
const L = require('./lib.js');
const [a, b, ...rest] = process.argv.slice(2);
const files = L.tabFiles();
const read = f => fs.readFileSync(path.join(L.ROOT, f), 'utf8');
const die = m => { console.error(m); process.exit(1); };
const lineOf = (src, i) => src.slice(0, i).split('\n').length;

if (!a){
  for (const [k, fs_] of Object.entries(files)) console.log(k.padEnd(10), String(L.lessonsIn(fs_).length).padStart(4), 'درس في', fs_.length, 'ملف:', path.dirname(fs_[0]) + '/');
} else if (a === 'find'){
  if (!b) die('اكتب الكلمة: node tools/lesson.js find "shutdown"');
  const q = b.toLowerCase();
  for (const [k, fs_] of Object.entries(files)) for (const l of L.lessonsIn(fs_)){
    const title = (read(l.file).slice(l.start, l.end).match(/\btitle:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || '';
    if ((l.cmd + ' ' + title).toLowerCase().includes(q)) console.log(k.padEnd(8), JSON.stringify(l.cmd), '«' + title + '»', l.file + ':' + l.line);
  }
} else {
  if (!files[a]) die('مفيش تاب اسمه ' + a + '. شغّل node tools/lesson.js من غير حاجة تشوف الأسامي');
  const all = L.lessonsIn(files[a]);
  if (!b){
    let cat;
    for (const l of all){
      if (l.cat !== cat){ cat = l.cat; console.log('\n## ' + cat + '   (' + l.file + ')'); }
      console.log('  ' + String(l.line).padStart(5) + '  ' + l.cmd);
    }
  } else {
    const hit = all.filter(l => l.cmd === b);
    if (!hit.length){
      const near = all.filter(l => l.cmd.toLowerCase().includes(b.toLowerCase()));
      die('مفيش درس اسمه «' + b + '» في ' + a + (near.length ? '. يمكن تقصد: ' + near.map(l => '«' + l.cmd + '»').join(' ') : ''));
    }
    for (const l of hit){
      const src = read(l.file);
      const where = l.file + ':' + l.line + '-' + lineOf(src, l.end) + '   (قسم «' + l.cat + '»)';
      if (rest.includes('--where')) console.log(where);
      else console.log(where + '\n' + src.slice(src.lastIndexOf('\n', l.start) + 1, l.end));
    }
  }
}
