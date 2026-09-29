// فحص المحتوى قبل الحفظ أو الرفع:  node tools/check.js
// بيقرا نفس الملفات اللي index.html بيحمّلها (من غير app.js) ويدوّر على الأخطاء الشائعة.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(f => !f.endsWith('app.js'));
const ctx = vm.createContext({ console });
const tabOrigin = {};
for (const f of files) {
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try { vm.runInContext(code, ctx, { filename: f }); }
  catch (e) { console.error('✗ ' + f + ': الملف فيه غلطة JavaScript ومش هيتقري:\n  ' + e.message); process.exit(1); }
}
const { DATA, DEEP, BREAK, CMP, MISSIONS } = vm.runInContext('({DATA, DEEP, BREAK, CMP, MISSIONS})', ctx);

const errors = [], warnings = [];
const err = (where, msg) => errors.push(where + ': ' + msg);
const warn = (where, msg) => warnings.push(where + ': ' + msg);
const FLAGS = [undefined, 'danger', 'script', 'keys', 'term', 'console'];
const exampleLines = ex => ex.split('\n').filter(l => l.trim() && !/^\s*(#|\/\/|REM\b)/.test(l));
const brackets = (where, s) => {
  if (typeof s !== 'string') return;
  const o = (s.match(/\[\[/g) || []).length, c = (s.match(/\]\]/g) || []).length;
  if (o !== c) err(where, `عدد [[ (${o}) مش زي عدد ]] (${c})`);
  if (/\[\[[^\]]*\n[^\]]*\]\]/.test(s)) err(where, '[[...]] مينفعش يعدّي على أكتر من سطر');
  if (s.includes('$__{')) err(where, '$__{ فضلت زي ما هي');
};

let total = 0;
for (const tab in DATA) {
  const seen = new Set();
  DATA[tab].forEach(cat => {
    if (![1, 2, 3].includes(cat.l)) err(`${tab} › ${cat.t}`, 'المستوى (l) لازم يبقى 1 أو 2 أو 3');
    cat.items.forEach(it => {
      total++;
      const [cmd, title, desc, ex, tr, flag] = it, w = `${tab} › ${cmd}`;
      if (!cmd) { err(`${tab} › ${cat.t}`, 'درس من غير cmd'); return; }
      if (seen.has(cmd)) err(w, 'الاسم ده متكرر في نفس التاب (التقدم هيتلخبط)');
      seen.add(cmd);
      if (!title) warn(w, 'مفيش title (هيظهر فاضي في «اختبرني»)');
      if (!tr) warn(w, 'مفيش try');
      if (flag !== undefined && !String(flag).split(' ').every(f => FLAGS.includes(f))) err(w, `flag غير معروف: ${flag}`);
      [title, desc, ex, tr].forEach(s => brackets(w, s));
      const d = DEEP[tab + '|' + cmd];
      if (d) ['why', 'how', 'when', 'mistakes'].forEach(k => { if (!d[k]) warn(w, `deep ناقصه ${k}`); brackets(w + ' (deep)', d[k]); });
      const b = BREAK[tab + '|' + cmd];
      if (b) {
        b.forEach(s => brackets(w + ' (lines)', s));
        if (!ex) err(w, 'فيه lines بس مفيش example');
        else if (!/\bkeys\b/.test(flag || '') && exampleLines(ex).length !== b.length)
          err(w, `المثال فيه ${exampleLines(ex).length} سطر، و lines فيها ${b.length} شرح`);
      }
    });
  });
}

// روابط القاموس: «bash المستوى ٢: [[grep]]» لازم تشاور على درس موجود
const TAB_NAMES = { 'bash': 'bash', 'VPS': 'vps', 'Git': 'git', 'Node': 'node', 'PostgreSQL': 'pg', 'Docker': 'docker', 'GitHub Actions': 'gha', 'Nginx': 'nginx', 'التشخيص': 'diag', 'المتصفح': 'web', 'الأمان': 'sec', 'WSL': 'wsl', 'ابدأ من هنا': 'start', 'PowerShell': 'ps', 'CMD': 'cmd', 'zsh': 'zsh', 'ssh config': 'sshc', 'فحص الكود': 'quality', 'MongoDB': 'mongo', 'Python': 'python', 'Desktop و Mobile': 'apps', 'من مشاريعي': 'real', 'اختصارات النظام': 'os', 'VS Code': 'vscode' };
if (DATA.glossary) DATA.glossary.forEach(cat => cat.items.forEach(it => {
  const ref = it[4] || '', m = ref.match(/^(.*?)(?: المستوى [١٢٣123])?(?:: \[\[(.+)\]\])?$/);
  const tab = m && TAB_NAMES[m[1]];
  if (!tab) return err(`glossary › ${it[0]}`, `اسم التاب في المرجع مش معروف: «${ref}»`);
  if (m[2] && !DATA[tab].some(c => c.items.some(x => x[0] === m[2]))) err(`glossary › ${it[0]}`, `المرجع بيشاور على درس مش موجود: «${ref}»`);
}));

CMP.forEach((r, i) => { if (r.length !== 4) err(`CMP صف ${i + 1}`, 'لازم ٤ خانات: المهمة و bash و PowerShell و CMD'); });
MISSIONS.forEach((m, i) => { if (!m.t || !m.d || !m.s) err(`تحدي ${i + 1}`, 'ناقصه t أو d أو s'); });

warnings.forEach(x => console.log('! ' + x));
errors.forEach(x => console.log('✗ ' + x));
console.log(`\n${Object.keys(DATA).length} تاب، ${total} درس، ${MISSIONS.length} تحدي | ${errors.length} خطأ، ${warnings.length} تنبيه`);
process.exit(errors.length ? 1 : 0);
