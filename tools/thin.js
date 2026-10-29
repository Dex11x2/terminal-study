// بيلاقي الشرح الضعيف: سطر مثال شرحه كلمتين، وجدول خانته كلمتين، ودرس ناقصه شرح أو deep
//   node tools/thin.js            ملخص لكل تاب، الأسوأ الأول
//   node tools/thin.js <tab>      أسوأ الدروس في التاب ده، ومعاها الأماكن الضعيفة
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => !f.includes('app.js'));
const ctx = { console, window: {}, document: { querySelector() { return null; }, addEventListener() {} }, navigator: {}, location: { hash: '' } };
ctx.self = ctx; vm.createContext(ctx);
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }); }
  catch (e) { if (!/document|window|localStorage/.test(e.message)) console.error(f, e.message); }
}
const { DATA, BREAK, DEEP, TEACH } = vm.runInContext('({DATA, BREAK, DEEP, TEACH})', ctx);

// الكلام من غير [[code]] ومن غير علامات markdown: اللي بيتقري فعلًا كشرح
const prose = s => String(s || '').replace(/\[\[[^\]]*\]\]/g, 'X').replace(/[*_`#>|]/g, ' ').replace(/\s+/g, ' ').trim();
const words = s => prose(s).split(' ').filter(w => w && w !== 'X').length;
const GENERIC = /^(قفلة|رجّع|رجع|صف|الناتج|نهاية|خلاص|اطبع|الحل|عنوان|التشغيل|الصورة|الخدمات|نصه|قراية|السطر)\.?$/;

// نفس قاعدة tools/check.js بالظبط: #name = ... في JS private field مش تعليق
const exampleLines = ex => String(ex || '').split('\n').filter(l => l.trim() && !/^\s*(#(?!(?:include|define|pragma|ifdef|ifndef|endif)\b|[A-Za-z_$][\w$]*\s*[=;(])|\/\/|REM\b)/.test(l));
// صف جدول: | [[x]] | كلام قليل |  — الخانة التانية فيها كلمتين أو أقل
const thinRows = s => {
  if (!s) return 0;
  const noFence = String(s).replace(/^~~~[^\n]*\n[\s\S]*?^~~~\s*$/gm, '');
  return noFence.split('\n').filter(l => /^\|/.test(l) && !/^\|\s*-/.test(l)).map(l => l.split('|').slice(1, -1).map(c => c.trim()))
    .filter(c => c.length === 2 && /\[\[/.test(c[0]) && words(c[1]) <= 2 && !/^[✓✗—\-]?$/.test(prose(c[1]))).length;
};

function scoreLesson(tab, it) {
  const id = tab + '|' + it[0];
  const ex = it[3], br = BREAK[id] || [], dp = DEEP[id] || {}, tc = TEACH[id] || '';
  const issues = [];
  // سطر كود هو أقواس بس ( } أو }); أو ] ) شرحه القصير كفاية
  const code = exampleLines(ex);
  const thinL = br.map((b, i) => [i + 1, b, code[i] || '']).filter(([, b, c]) => !/^[\s{}()\[\];,]*$/.test(c) && (words(b) < 4 || GENERIC.test(prose(b))));
  if (thinL.length) issues.push(['سطور شرحها ضعيف', thinL.length, thinL.slice(0, 4).map(([i, b, c]) => i + ': ' + c.trim().slice(0, 28) + ' ← ' + prose(b).slice(0, 26))]);
  const nLines = exampleLines(ex).length;
  const keys = it[5] === "keys";
  if (nLines > 1 && !br.length && !keys) issues.push(['مثال من غير شرح سطور', 5, [nLines + ' سطر']]);
  if (words(it[2]) < 25) issues.push(['desc قصير', 3, [words(it[2]) + ' كلمة']]);
  // القاموس: كل درس مصطلح واحد — مالوش teach طويل ولا deep كامل، بس لازم desc كفاية
  if (tab === 'glossary') { const sc = issues.reduce((t, i) => t + i[1], 0); return { cmd: it[0], score: sc, issues }; }
  if (words(tc) < 120) issues.push(['teach قصير أو مش موجود', 3, [words(tc) + ' كلمة']]);
  const miss = ['why', 'how', 'when', 'mistakes'].filter(k => !dp[k] || words(dp[k]) < 6);
  if (miss.length) issues.push(['deep ناقص', miss.length, miss]);
  if (dp.how && words(dp.how) < 40) issues.push(['deep.how قصير', 2, [words(dp.how) + ' كلمة']]);
  const tr = thinRows(it[2]) + thinRows(tc) + thinRows(dp.how);
  if (tr >= 3) issues.push(['صفوف جدول خانتها كلمتين', Math.round(tr / 3), [tr + ' صف']]);
  const score = issues.reduce((s, i) => s + i[1], 0);
  return { cmd: it[0], score, issues };
}

const want = process.argv[2];
const rows = [];
for (const [tab, cats] of Object.entries(DATA)) {
  if (want && tab !== want) continue;
  const lessons = [];
  for (const c of cats) for (const it of c.items) lessons.push({ cat: c.t, ...scoreLesson(tab, it) });
  const bad = lessons.filter(l => l.score > 0);
  const sum = k => lessons.reduce((s, l) => s + (l.issues.find(i => i[0] === k)?.[1] || 0), 0);
  rows.push({ tab, n: lessons.length, bad: bad.length, score: lessons.reduce((s, l) => s + l.score, 0),
    thinLines: sum('سطور شرحها ضعيف'), noLines: lessons.filter(l => l.issues.some(i => i[0] === 'مثال من غير شرح سطور')).length,
    shortDesc: lessons.filter(l => l.issues.some(i => i[0] === 'desc قصير')).length,
    shortTeach: lessons.filter(l => l.issues.some(i => i[0] === 'teach قصير أو مش موجود')).length,
    deep: lessons.filter(l => l.issues.some(i => i[0] === 'deep ناقص')).length, lessons });
}

if (want) {
  const r = rows[0];
  if (!r) { console.log('مفيش تاب اسمه', want); process.exit(1); }
  console.log(`${r.tab}: ${r.bad} من ${r.n} درس فيهم حاجة ضعيفة (النقط: ${r.score})\n`);
  for (const l of r.lessons.filter(l => l.score).sort((a, b) => b.score - a.score)) {
    console.log(`${String(l.score).padStart(3)}  ${l.cmd}   «${l.cat}»`);
    for (const [k, , d] of l.issues) console.log(`       - ${k}: ${d.join(' | ')}`);
  }
} else {
  rows.sort((a, b) => b.score / b.n - a.score / a.n);
  console.log('tab'.padEnd(11), 'دروس'.padStart(5), 'ضعيف'.padStart(5), 'نقط/درس'.padStart(8), 'سطور'.padStart(6), 'مثال‑بلا‑شرح'.padStart(12), 'desc'.padStart(5), 'teach'.padStart(6), 'deep'.padStart(5));
  for (const r of rows) console.log(r.tab.padEnd(11), String(r.n).padStart(5), String(r.bad).padStart(5), (r.score / r.n).toFixed(1).padStart(8),
    String(r.thinLines).padStart(6), String(r.noLines).padStart(12), String(r.shortDesc).padStart(5), String(r.shortTeach).padStart(6), String(r.deep).padStart(5));
  const t = rows.reduce((a, r) => ({ n: a.n + r.n, bad: a.bad + r.bad, thin: a.thin + r.thinLines }), { n: 0, bad: 0, thin: 0 });
  console.log(`\nالمجموع: ${t.bad} من ${t.n} درس فيهم حاجة ضعيفة، و ${t.thin} سطر مثال شرحه أقل من ٤ كلمات`);
}
