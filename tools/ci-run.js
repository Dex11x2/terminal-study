// بيشغّل حقل ci بتاع الدروس على النظام اللي هو عليه، وبيقارن الناتج باللي متوقع
//   node tools/ci-run.js            كل الدروس اللي ليها ci على النظام ده
//   node tools/ci-run.js <tab>      تاب واحد
//   node tools/ci-run.js --list     عدد الفحوصات لكل نظام وتاب، من غير تشغيل
// الشكل في الدرس: ci: [{ os: ['ubuntu','macos','windows'], sh: 'bash', run: R`...`, expect: ['نص لازم يطلع'], code: 0, timeout: 60 }]
// في GitHub Actions بيشتغل على ubuntu و macos و windows (.github/workflows/lessons.yml)
const fs = require('fs'), vm = require('vm'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => !f.includes('app.js'));
const ctx = { console: { log() {}, warn() {}, error() {} }, window: {}, document: { querySelector() { return null; }, addEventListener() {} }, navigator: {}, location: { hash: '' } };
ctx.self = ctx; vm.createContext(ctx);
for (const f of files) { try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }); } catch {} }
const CI = vm.runInContext('typeof CI !== "undefined" ? CI : {}', ctx);

const here = process.platform === 'win32' ? 'windows' : process.platform === 'darwin' ? 'macos' : 'ubuntu';
const args = process.argv.slice(2), onlyTab = args.find(a => !a.startsWith('--'));
const all = Object.entries(CI).flatMap(([id, list]) => (Array.isArray(list) ? list : [list]).map((c, i) => ({ id, i, ...c })));

if (args.includes('--list')) {
  const n = {};
  for (const c of all) for (const o of c.os || []) { const k = o + ' ' + c.id.split('|')[0]; n[k] = (n[k] || 0) + 1; }
  for (const k of Object.keys(n).sort()) console.log(k.padEnd(24), n[k]);
  console.log('المجموع:', all.length, 'فحص');
  process.exit(0);
}

// each shell: file extension and the command that runs the file
const SH = {
  bash: ['.sh', f => ['bash', [f]]],
  zsh: ['.zsh', f => ['zsh', [f]]],
  sh: ['.sh', f => ['sh', [f]]],
  pwsh: ['.ps1', f => ['pwsh', ['-NoProfile', '-NonInteractive', '-File', f]]],
  powershell: ['.ps1', f => ['powershell', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', f]]],
  cmd: ['.bat', f => ['cmd', ['/d', '/c', f]]],
  node: ['.mjs', f => ['node', [f]]],
  python: ['.py', f => [here === 'windows' ? 'python' : 'python3', [f]]],
};

const mine = all.filter(c => (c.os || []).includes(here) && (!onlyTab || c.id.startsWith(onlyTab + '|')));
let fail = 0;
for (const c of mine) {
  const name = c.id.replace('|', ' › ') + (c.i ? ' #' + (c.i + 1) : '');
  const sh = SH[c.sh];
  if (!sh) { console.log('✗', name, '— sh مش معروف:', c.sh); fail++; continue; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lesson-'));
  const file = path.join(dir, 'run' + sh[0]);
  // .bat and Windows PowerShell 5.1 read the file in the console code page; give them CRLF and a BOM for .ps1
  let body = c.run.replace(/\r\n/g, '\n');
  if (sh[0] === '.bat') body = body.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, (c.sh === 'powershell' ? '﻿' : '') + body, 'utf8');
  const [cmd, argv] = sh[1](file);
  const t0 = Date.now();
  const r = spawnSync(cmd, argv, { cwd: dir, encoding: 'utf8', timeout: (c.timeout || 60) * 1000, env: { ...process.env, LC_ALL: process.env.LC_ALL || 'C.UTF-8' } });
  const out = (r.stdout || '') + (r.stderr || '');
  const code = r.status === null ? 'timeout' : r.status;
  const missing = (c.expect || []).filter(e => !out.includes(e));
  const want = c.code === undefined ? 0 : c.code;
  const ok = !r.error && code === want && !missing.length;
  console.log((ok ? '✓' : '✗'), name, `(${here}, ${c.sh}, ${Date.now() - t0}ms)`);
  if (!ok) {
    fail++;
    if (r.error) console.log('   ما اشتغلش:', r.error.message);
    if (code !== want) console.log('   كود الخروج', code, 'والمتوقع', want);
    for (const m of missing) console.log('   ناقص في الناتج:', JSON.stringify(m));
    console.log(out.split('\n').slice(0, 15).map(l => '   | ' + l).join('\n'));
  }
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`\n${mine.length - fail} من ${mine.length} نجحوا على ${here}` + (mine.length ? '' : ' (مفيش فحوصات للنظام ده)'));
process.exit(fail ? 1 : 0);
