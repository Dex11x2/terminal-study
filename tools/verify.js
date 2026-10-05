// سجل المراجعة: أنهي درس اتجرّب بجد، إمتى، وعلى إيه. السجل في verified.json جنب index.html.
// كل درس ليه بصمة من محتواه؛ لو حد عدّل الدرس بعد المراجعة، البصمة بتتغيّر والدرس بيرجع «محتاج مراجعة».
//   node tools/verify.js                         ملخص كل التابات: اتراجع، اتغيّر بعد المراجعة، لسه
//   node tools/verify.js todo bash               الدروس اللي محتاجة مراجعة في التاب ده، ومكان كل واحد
//   node tools/verify.js mark bash "PS1" "watch" --on "ubuntu-24.04"
//                                                سجّل إن الدروس دي اتجرّبت بشكلها الحالي (--on: اتجرّبت فين)
//   node tools/verify.js mark bash --all --on "ubuntu-24.04"     كل دروس التاب
// --on بيتكتب فيه الأنظمة اللي الأوامر اتشغّلت عليها فعلًا، ولو حاجة من الـ docs بس اكتب docs (مثلًا "pwsh-7.6, docs: macOS").
const fs = require('fs'), path = require('path');
const L = require('./lib.js');
const FILE = path.join(L.ROOT, 'verified.json');
const die = m => { console.error(m); process.exit(1); };

const load = () => fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : {};
const save = reg => fs.writeFileSync(FILE, JSON.stringify(Object.keys(reg).sort().reduce((o, k) => (o[k] = reg[k], o), {}), null, 1) + '\n');

// state of every lesson: { tab: [{cmd, file, line, state: 'ok'|'stale'|'never'}] }
function status(){
  const reg = load(), files = L.tabFiles(), raw = L.loadRaw(files), out = {};
  for (const [tab, list] of Object.entries(raw)){
    const where = L.lessonsIn(files[tab]);
    out[tab] = list.map(({item}, i) => {
      const r = reg[tab + '|' + item.cmd];
      return {cmd: item.cmd, file: where[i].file, line: where[i].line, hash: L.lessonHash(item), state: !r ? 'never' : r.hash === L.lessonHash(item) ? 'ok' : 'stale', rec: r};
    });
  }
  return out;
}
module.exports = { status };

if (require.main === module){
  const [cmd, tab, ...args] = process.argv.slice(2);
  if (!cmd){
    const st = status(); let t = {ok: 0, stale: 0, never: 0};
    console.log('التاب'.padEnd(10), 'اتراجع'.padStart(7), 'اتغيّر'.padStart(7), 'لسه'.padStart(6));
    for (const [k, list] of Object.entries(st)){
      const c = {ok: 0, stale: 0, never: 0}; list.forEach(l => c[l.state]++); for (const s in c) t[s] += c[s];
      console.log(k.padEnd(10), String(c.ok).padStart(7), String(c.stale).padStart(7), String(c.never).padStart(6));
    }
    console.log('المجموع'.padEnd(10), String(t.ok).padStart(7), String(t.stale).padStart(7), String(t.never).padStart(6));
  } else if (cmd === 'todo'){
    const st = status();
    if (!st[tab]) die('اكتب اسم تاب: node tools/verify.js todo bash');
    for (const l of st[tab].filter(l => l.state !== 'ok')) console.log((l.state === 'stale' ? 'اتغيّر ' : 'لسه   ') + ' ' + l.file + ':' + l.line + '  ' + l.cmd);
  } else if (cmd === 'mark'){
    const on = args.includes('--on') ? args[args.indexOf('--on') + 1] : null;
    if (!on) die('لازم --on: اتجرّب فين؟ مثلًا --on "ubuntu-24.04, pwsh-7.6"');
    const names = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--on');
    const st = status();
    if (!st[tab]) die('مفيش تاب اسمه ' + tab);
    const pick = args.includes('--all') ? st[tab] : names.map(n => st[tab].find(l => l.cmd === n) || die('مفيش درس اسمه «' + n + '» في ' + tab));
    if (!pick.length) die('اكتب أسامي الدروس أو --all');
    const reg = load(), date = new Date().toISOString().slice(0, 10);
    pick.forEach(l => { reg[tab + '|' + l.cmd] = {hash: l.hash, date, on}; });
    save(reg);
    console.log('اتسجّل ' + pick.length + ' درس في ' + tab);
  } else die('الأوامر: (من غير حاجة) أو todo <تاب> أو mark <تاب> ...');
}
