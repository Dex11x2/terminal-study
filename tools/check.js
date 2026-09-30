// فحص المحتوى قبل الحفظ أو الرفع:  node tools/check.js
// بيقرا نفس الملفات اللي index.html بيحمّلها (من غير app.js) ويدوّر على الأخطاء الشائعة.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(f => !f.endsWith('app.js'));
// afterEvaluate: the promises of runJsCheck settle inside runInContext, so its timeout also stops a test that never ends
const ctx = vm.createContext({ console }, { microtaskMode: 'afterEvaluate' });
const tabOrigin = {};
for (const f of files) {
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try { vm.runInContext(code, ctx, { filename: f }); }
  catch (e) { console.error('✗ ' + f + ': الملف فيه غلطة JavaScript ومش هيتقري:\n  ' + e.message); process.exit(1); }
}
const { DATA, DEEP, BREAK, SOL, CMP, MISSIONS, CHECK } = vm.runInContext('({DATA, DEEP, BREAK, SOL, CMP, MISSIONS, CHECK})', ctx);

const errors = [], warnings = [];
const err = (where, msg) => errors.push(where + ': ' + msg);
const warn = (where, msg) => warnings.push(where + ': ' + msg);
const FLAGS = [undefined, 'danger', 'script', 'keys', 'term', 'console'];
const exampleLines = ex => ex.split('\n').filter(l => l.trim() && !/^\s*(#(?!(?:include|define|pragma|ifdef|ifndef|endif)\b|[A-Za-z_$][\w$]*\s*[=;(])|\/\/|REM\b)/.test(l)); // #name = ... is a JS private field, not a comment
const brackets = (where, s) => {
  if (typeof s !== 'string') return;
  const o = (s.match(/\[\[/g) || []).length, c = (s.match(/\]\]/g) || []).length;
  if (o !== c) err(where, `عدد [[ (${o}) مش زي عدد ]] (${c})`);
  if (/\[\[[^\]]*\n[^\]]*\]\]/.test(s)) err(where, '[[...]] مينفعش يعدّي على أكتر من سطر');
  if (s.includes('$__{')) err(where, '$__{ فضلت زي ما هي');
  if (s.includes("$__bt")) err(where, "$__bt فضلت زي ما هي");
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
      const sol = SOL[tab + '|' + cmd];
      if (sol) { if (typeof sol.text !== 'string' || !sol.text.trim()) err(w, 'sol لازم يبقى نص'); brackets(w + ' (sol)', sol.text); if (sol.code !== undefined && typeof sol.code !== 'string') err(w, 'solCode لازم يبقى نص'); }
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
const TAB_NAMES = { 'bash': 'bash', 'VPS': 'vps', 'Git': 'git', 'Node': 'node', 'PostgreSQL': 'pg', 'Docker': 'docker', 'GitHub Actions': 'gha', 'Nginx': 'nginx', 'التشخيص': 'diag', 'المتصفح': 'web', 'الأمان': 'sec', 'WSL': 'wsl', 'ابدأ من هنا': 'start', 'PowerShell': 'ps', 'CMD': 'cmd', 'zsh': 'zsh', 'ssh config': 'sshc', 'فحص الكود': 'quality', 'MongoDB': 'mongo', 'Python': 'python', 'Desktop و Mobile': 'apps', 'من مشاريعي': 'real', 'اختصارات النظام': 'os', 'VS Code': 'vscode', 'JavaScript': 'js', 'TypeScript': 'ts', 'HTML و CSS': 'css', 'React': 'react', 'Next.js': 'next', 'Backend بـ Node': 'api', 'SQL و Prisma': 'data', 'Python و FastAPI': 'pyapi', 'PHP و MySQL': 'php', 'Flutter و Dart': 'flutter', 'الذكاء الاصطناعي': 'ai', 'بناء مشروع كامل': 'arch', 'الانترفيو': 'interview', 'DSA': 'dsa', 'هندسة البرمجيات': 'sweng', 'APIs متقدمة': 'apis', 'Cloud و DevOps': 'cloud', 'المشاريع': 'projects', 'الشغل والكارير': 'career', 'إنجليزي للمبرمج: قراية وكتابة': 'english', 'إنجليزي للمبرمج: كلام وانترفيو': 'speak', 'C# و .NET': 'dotnet', 'Angular': 'angular', 'Java و Spring Boot': 'spring', 'React Native و Expo': 'rn', 'C و C++': 'cpp', 'Kotlin و Android': 'kotlin' };
if (DATA.glossary) DATA.glossary.forEach(cat => cat.items.forEach(it => {
  const ref = it[4] || '', m = ref.match(/^(.*?)(?: المستوى [١٢٣123])?(?:: \[\[(.+)\]\])?$/);
  const tab = m && TAB_NAMES[m[1]];
  if (!tab) return err(`glossary › ${it[0]}`, `اسم التاب في المرجع مش معروف: «${ref}»`);
  if (m[2] && !DATA[tab].some(c => c.items.some(x => x[0] === m[2]))) err(`glossary › ${it[0]}`, `المرجع بيشاور على درس مش موجود: «${ref}»`);
}));

CMP.forEach((r, i) => { if (r.length !== 4) err(`CMP صف ${i + 1}`, 'لازم ٤ خانات: المهمة و bash و PowerShell و CMD'); });
MISSIONS.forEach((m, i) => { if (!m.t || !m.d || !m.s) err(`تحدي ${i + 1}`, 'ناقصه t أو d أو s'); });

// التمارين اللي بتتصحح لوحدها (check): الشكل صح، والحل المرجعي (solution) بيعدّي اختباراته
const CHECK_KEYS = { js: ['lang', 'starter', 'tests', 'solution'], sql: ['lang', 'starter', 'setup', 'expect', 'expectSql', 'solution', 'ordered'] };
const str = v => typeof v === 'string' && v.trim() !== '';
const checks = [];
for (const id in CHECK) {
  const ch = CHECK[id], w = id.replace('|', ' › ') + ' (check)';
  if (!ch || typeof ch !== 'object' || !CHECK_KEYS[ch.lang]) { err(w, 'check لازم يبقى { lang: "js" أو "sql", ... }'); continue; }
  Object.keys(ch).filter(k => !CHECK_KEYS[ch.lang].includes(k)).forEach(k => err(w, `مفتاح مش معروف: ${k} (المسموح: ${CHECK_KEYS[ch.lang].join(' ')})`));
  if (ch.starter !== undefined && typeof ch.starter !== 'string') err(w, 'starter لازم يبقى نص');
  if (ch.lang === 'js') {
    if (!str(ch.tests)) err(w, 'tests لازم يبقى نص فيه test(...)');
    if (!str(ch.solution)) err(w, 'solution (الحل المرجعي، مش بيظهر) لازم يبقى نص عشان الفحص يتأكد إن الاختبارات بتعدّي');
  } else {
    if (!str(ch.setup)) err(w, 'setup لازم يبقى نص فيه CREATE TABLE و INSERT');
    if ((ch.expect === undefined) === (ch.expectSql === undefined)) err(w, 'لازم واحد بس من expect (الصفوف) أو expectSql (استعلام مرجعي)');
    if (ch.expect !== undefined && !(Array.isArray(ch.expect) && ch.expect.every(r => Array.isArray(r) && r.every(v => v === null || ['string', 'number', 'boolean'].includes(typeof v)))))
      err(w, 'expect لازم يبقى مصفوفة صفوف، وكل صف مصفوفة قيم: [[1, "Sara"], [2, "Ali"]]');
    if (ch.expectSql !== undefined && !str(ch.expectSql)) err(w, 'expectSql لازم يبقى نص');
    if (ch.expect !== undefined && !str(ch.solution)) err(w, 'مع expect لازم solution (استعلام مرجعي مش بيظهر) عشان الفحص يتأكد إن الصفوف صح');
    if (ch.solution !== undefined && !str(ch.solution)) err(w, 'solution لازم يبقى نص');
    if (ch.ordered !== undefined && typeof ch.ordered !== 'boolean') err(w, 'ordered لازم true أو false');
  }
  checks.push([id, w, ch]);
}

// a test that leaves a rejected promise unhandled shouldn't crash the whole check; report it and fail
process.on('unhandledRejection', e => { console.error('✗ promise اترفض من غير catch في اختبار: ' + (e && e.message || e)); process.exitCode = 1; });
(async () => {
  const js = checks.filter(([, , ch]) => ch.lang === 'js' && str(ch.tests) && str(ch.solution));
  const runJs = (code, tests) => {
    Object.assign(ctx, { __code: code, __tests: tests, __r: null });
    vm.runInContext('runJsCheck(__code, __tests).then(r => { __r = r; })', ctx, { timeout: 3000 });
    if (!ctx.__r) throw new Error('الاختبارات مستنية timer أو I/O، والفحص بيدعم الكود اللي بيخلص من غير انتظار بس');
    return ctx.__r;
  };
  for (const [, w, ch] of js) {
    try {
      const r = await runJs(ch.solution, ch.tests), bad = r.results.filter(x => !x.ok);
      if (r.error) err(w, 'الحل المرجعي: ' + r.error);
      else bad.forEach(x => err(w, `الحل المرجعي مش بيعدّي «${x.name}»: ${x.msg}`));
      const s = await runJs(ch.starter || '', ch.tests);
      if (!s.error && s.results.length && s.results.every(x => x.ok)) warn(w, 'كود البداية (starter) بيعدّي كل الاختبارات من غير ما الطالب يعمل حاجة');
    } catch (e) { err(w, 'الحل المرجعي مخلصش في ٣ ثواني أو وقع: ' + e.message); }
  }
  // SQL: نفس PGlite اللي الصفحة بتستخدمه (vendor/pglite) بيشتغل في node كمان
  const sql = checks.filter(([, , ch]) => ch.lang === 'sql' && str(ch.setup) && (str(ch.solution) || str(ch.expectSql)));
  let sqlNote = '';
  if (sql.length) {
    let db;
    try {
      const zlib = require('zlib'), V = path.join(ROOT, 'vendor', 'pglite'), gz = f => zlib.gunzipSync(fs.readFileSync(path.join(V, f)));
      const { PGlite } = await import(require('url').pathToFileURL(path.join(V, 'index.js')).href);
      db = await PGlite.create({ pgliteWasmModule: await WebAssembly.compile(gz('pglite.wasm.gz')), initdbWasmModule: await WebAssembly.compile(gz('initdb.wasm.gz')), fsBundle: new Blob([gz('pglite.data.gz')]) });
    } catch (e) { sqlNote = ` (تمارين SQL متفحصتش: PGlite مشتغلش في node: ${e.message})`; }
    if (db) {
      // نفس اللي js/sql-worker.js بيعمله: قاعدة نضيفة، setup، وبعدين الاستعلام
      const run = async (setup, q) => {
        await db.exec('ROLLBACK').catch(() => {});
        await db.exec('RESET ALL; DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public; SET search_path TO public;');
        await db.exec(setup);
        const last = [...await db.exec(q, { rowMode: 'array' })].reverse().find(r => r.fields && r.fields.length);
        return last ? last.rows : [];
      };
      for (const [, w, ch] of sql) {
        try {
          const ref = ch.expectSql !== undefined ? ch.expectSql : ch.solution;
          const exp = ch.expect !== undefined ? ch.expect : await run(ch.setup, ref);
          if (str(ch.solution)) { const d = ctx.sqlDiff(await run(ch.setup, ch.solution), exp, ch.ordered); if (d) err(w, 'الحل المرجعي مش بيطلّع الناتج المتوقع: ' + d); }
          if (str(ch.starter)) { const s = await run(ch.setup, ch.starter).catch(() => null); if (s && !ctx.sqlDiff(s, exp, ch.ordered)) warn(w, 'كود البداية (starter) بيطلّع الناتج المتوقع من غير ما الطالب يعمل حاجة'); }
        } catch (e) { err(w, 'PostgreSQL رجّع error في setup أو الحل المرجعي: ' + e.message); }
      }
      await db.close();
    }
  }

  warnings.forEach(x => console.log('! ' + x));
  errors.forEach(x => console.log('✗ ' + x));
  console.log(`\n${Object.keys(DATA).length} تاب، ${total} درس، ${MISSIONS.length} تحدي، ${checks.length} تمرين بيتصحح لوحده | ${errors.length} خطأ، ${warnings.length} تنبيه${sqlNote}`);
  process.exit(errors.length || process.exitCode ? 1 : 0);
})();
