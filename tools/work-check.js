// بيتأكد إن كل تمرين «حلّها هنا» (حقل work في التمرين) شروطه سليمة، في Chrome حقيقي:
//   - الكود اللي التمرين بيبدأ بيه (work.start) لازم يقع في شرط واحد على الأقل (وإلا التمرين محلول من قبل ما يبدأ)
//   - الحل لازم يعدّي كل الشروط. الحل = work.sol لو مكتوب، وإلا الـ fence رقم work.solAt (الافتراضي 0) من نوع live أو html أو view في sol التمرين
//   node tools/work-check.js <tab>          (Chrome من CHROME أو من مكانه المعتاد؛ لو مش موجود بيقول ويخرج 0)
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const L = require('./lib.js');
const tab = process.argv[2];
if (!tab) { console.error('اكتب التاب: node tools/work-check.js css'); process.exit(1); }
const chrome = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(p => p && fs.existsSync(p));
const fix = s => String(s).split('$__{').join('$' + '{').split('$__bt').join('\x60').split('$__lt').join('<');
const raw = L.loadRaw({ [tab]: L.tabFiles()[tab] })[tab] || [];
const cases = [], bad = [];
for (const { item } of raw) (item.practice || []).forEach((p, i) => {
  if (!p.work) return;
  const where = `${item.cmd} › تمرين ${i + 1}`;
  let sol = p.work.sol;
  if (sol === undefined) {
    const fences = [...fix(p.sol || '').matchAll(/^~~~(?:live|html|view)[^\n]*\n([\s\S]*?)^~~~\s*$/gm)].map(m => m[1].replace(/\n$/, ''));
    sol = fences[p.work.solAt || 0];
  }
  if (sol === undefined) return bad.push(`${where}: مفيش حل يتفحص (لا work.sol ولا fence في sol)`);
  cases.push({ where, start: fix(p.work.start || ''), sol: fix(sol), checks: JSON.parse(fix(JSON.stringify(p.work.checks))) });
});
if (!cases.length && !bad.length) { console.log(`${tab}: مفيش تمارين فيها work`); process.exit(0); }
if (!chrome) { console.log(`${tab}: ${cases.length} تمرين فيه work، و Chrome مش موجود هنا فمتفحصوش`); process.exit(0); }

// the page uses the site's own functions, cut out of js/app.js, so the check can't drift from what the reader gets
const app = fs.readFileSync(path.join(L.ROOT, 'js/app.js'), 'utf8');
const cut = (from, to) => { const a = app.indexOf(from), b = app.indexOf(to, a); if (a < 0 || b < 0) throw new Error('مش لاقي في app.js: ' + from); return app.slice(a, b); };
const fns = cut('const liveDoc = ', '\n') + '\n' + cut('const workNorm = ', '/* a CSS condition') + cut('function workEval', 'const workMsg = ');
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'workcheck-'));
const page = path.join(dir, 'p.html');
// every start and solution is rendered in its own frame (CSS conditions read computed styles from it); the frames are made while the page
// is still parsing, so the page's load event waits for them, and the results are written on load
fs.writeFileSync(page, '<!doctype html><meta charset="utf-8"><pre id="out"></pre><div id="frames" style="position:absolute;left:-9999px"></div><script>' + fns +
  '\nconst CASES = ' + JSON.stringify(cases).replace(/</g, '\\u003c') + ';\n' +
  'const mk = code => { const f = document.createElement("iframe"); f.style.cssText = "width:800px;height:600px"; f.srcdoc = liveDoc(code); document.getElementById("frames").append(f); return f; };\n' +
  'const FR = CASES.map(c => ({ start: mk(c.start), sol: mk(c.sol) }));\n' +
  'addEventListener("load", () => { document.getElementById("out").textContent = encodeURIComponent(JSON.stringify(CASES.map((c, i) => ({ start: workEval(c.start, c.checks, FR[i].start.contentDocument), sol: workEval(c.sol, c.checks, FR[i].sol.contentDocument) })))); });</script>');
let dom;
try { dom = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--virtual-time-budget=8000', '--dump-dom', 'file:///' + page.replace(/\\/g, '/')], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 180000 }); }
finally { fs.rmSync(dir, { recursive: true, force: true }); }
const m = dom.match(/<pre id="out">([^<]*)<\/pre>/);
if (!m || !m[1]) { console.error('Chrome مرجّعش نتيجة'); process.exit(1); }
const res = JSON.parse(decodeURIComponent(m[1]));
res.forEach((r, i) => {
  const c = cases[i];
  if (r.start.every(Boolean)) bad.push(`${c.where}: كود البداية معدّي كل الشروط، فالتمرين محلول من قبل ما يبدأ`);
  r.sol.forEach((ok, j) => { if (!ok) bad.push(`${c.where}: الحل واقع في الشرط «${c.checks[j].say}»`); });
});
console.log(`${tab}: ${cases.length} تمرين «حلّها هنا» اتفحص في Chrome، ${bad.length} مشكلة`);
bad.forEach(b => console.log('  ✗ ' + b));
if (bad.length) process.exit(1);
