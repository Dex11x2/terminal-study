// كل درس هنا في مكان واحد:
//   cmd      اسم الخطوة (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.
//
// التاب ده مختلف عن الباقي: كل فئة مشروع كامل، وكل درس فيها «محطة» (milestone) في المشروع بالترتيب.
// الـ desc فيه اللي هتبنيه وشروط «خلصت»، و try هو المهمة نفسها، و sol/solCode حل مرجعي اتشغّل واتجرّب.
// الحلول المرجعية اتجرّبت في سبتمبر ٢٠٢٦ على: Node 22، و PostgreSQL 16، و Playwright 1.63 (Chromium)،
// و Vite 8، و Vitest 5، و React 19، و React Router 8، و TanStack Query 5، و MSW 3، و Express 5،
// و Prisma 7.10، و Zod 4، و Next.js 16.3، و better-auth 1.7، و @sentry/nextjs 11، و stripe 22.

TAB("projects", {
  label: "المشاريع",
  prompt: "$ ",
  lab: R`mkdir -p ~/projects && cd ~/projects
mkdir p1-landing && cd p1-landing
git init -b main
echo "node_modules/" > .gitignore
git add . && git commit -m "chore: start project 1"
gh repo create p1-landing --public --source=. --push`,
  labText: "فولدر واحد اسمه projects فيه كل المشاريع، وكل مشروع repo لوحده على GitHub من أول يوم. أول commit قبل أول سطر كود، وكل محطة branch و PR حتى لو شغال لوحدك.",
  levels: {"1":["أول مشاريع","صفحة HTML و CSS بلغتين، وتطبيق JavaScript بـ fetch و localStorage، وقبلهم تعريف «خلصت» اللي هيمشي معاك في كل مشروع"],"2":["تطبيقات حقيقية","فورم متعدد الخطوات، و React SPA باختبارات، و REST API بـ Postgres و auth و توثيق"],"3":["للإنتاج","Next.js على دومين بـ CI و SSL و Sentry، وفوقه ميزة كبيرة: دفع أو realtime أو AI"]},
  categories: [
    {
      t: "قبل ما تبدأ أي مشروع",
      l: 1,
      n: "تعريف «خلصت» واحد لكل المشاريع، وإزاي تستخدم الحل المرجعي من غير ما تضحك على نفسك",
      items: [
        {
          cmd: "قبل أي مشروع: تعريف خلصت",
          title: "المشروع يبقى خلص إمتى بالظبط؟",
          desc: R`في التاب ده ٧ مشاريع، من صفحة HTML لحد تطبيق Next.js عليه دفع. كل مشروع فئة، وكل درس فيها محطة: بتبنيها، وتتأكد من شروطها، وبعدين تبص على الحل المرجعي. الشروط دي بتتكرر في كل مشروع، فاتفق عليها مرة واحدة هنا.

«خلصت» يعني الـ ٦ حاجات دي كلها، مش «شغال على جهازي»:

(١) شغال على موبايل حقيقي (مش بس Device Toolbar)، ومفيش scroll بالعرض. (٢) تقدر تستخدمه كله بالكيبورد بس، وقارئ الشاشة بيقرا كل حاجة صح. (٣) Lighthouse على الموبايل: performance و accessibility فوق ٩٠. (٤) فيه اختبارات للمنطق (service أو دوال) ولأهم flow في المشروع. (٥) README فيه لينك live وصورة للشاشة. (٦) commits نضيفة: كل commit حاجة واحدة ورسالتها بتقول عملت إيه.

القايمة دي مأخوذة من درس [[definition of done]] في تاب «بناء مشروع كامل»، بس مقصوصة على قد المشاريع الشخصية. والفحص الآلي (lint و test) بتاعه في تاب «فحص الكود».`,
          example: R`- [ ] موبايل حقيقي: كل الشاشات، ومفيش scroll بالعرض، والزراير ٤٤px على الأقل
- [ ] كيبورد: Tab يوصل لكل حاجة بالترتيب، والـ focus باين، و Esc بيقفل أي حاجة مفتوحة
- [ ] قارئ شاشة: كل صورة ليها alt، وكل حقل ليه label، والأخطاء بتتقري
- [ ] Lighthouse موبايل: performance و accessibility و best practices فوق ٩٠
- [ ] اختبارات: المنطق (unit)، وأهم flow من أوله لآخره (e2e أو integration)
- [ ] README: لينك live، وصورة، وإزاي تشغّله، وإيه اللي اتعلمته
- [ ] git: مفيش .env، و git status نضيف، ورسايل الـ commits بتقول حاجة
- [ ] الحالات الوحشة: فاضي، وبيحمّل، وخطأ، ونت فاصل`,
          try: R`اعمل ملف [[DONE.md]] فيه القايمة دي في فولدر [[~/projects]]، وانسخه في كل مشروع تبدأه. وبعدين اكتب سكربت [[scripts/done-check.mjs]] يفحص الحاجات اللي ينفع تتفحص أوتوماتيك: README فيه لينك https وصورة موجودة فعلًا، ومفيش ملف .env متعمله commit، و git status نضيف، ورسايل آخر ١٠ commits مش «wip» أو «fix»، و [[npm test]] بيعدّي. جرّبه على أي فولدر فيه git.`,
          flag: "script",
          deep: {
            why: R`من غير تعريف ثابت، كل مشروع «بيخلص» لما تزهق منه. وبعد ٧ مشاريع يبقى عندك ٧ حاجات نص نص: واحد مش شغال على الموبايل، وواحد من غير README، وواحد لينكه واقع. اللي بيشوف الـ portfolio بتاعك (عميل أو شركة) بيفتح اللينك من الموبايل في أول ٣٠ ثانية. لو وقع أو اتقلب، مش هيكمّل يقرا الكود.`,
            how: R`القايمة فيها نوعين. نوع بيتفحص أوتوماتيك: الاختبارات، و Lighthouse (بـ Lighthouse CI في تاب «فحص الكود»)، و axe (درس [[@axe-core/playwright]])، والـ .env والـ README (السكربت في الحل). ونوع لازم بإيدك: موبايل حقيقي، وكيبورد، وقارئ شاشة. الأوتوماتيك يتحط في CI عشان ميتنساش، واليدوي تعمله قبل ما تقول «خلصت» وتكتب في الـ PR إنك عملته.

بند «الحالات الوحشة» هو اللي بيفرق مشروع طالب عن مشروع حقيقي: أي شاشة بتجيب داتا ليها ٤ حالات (بتحمّل، وفاضية، وفيها خطأ، وفيها داتا). الـ tutorials بتعمل الرابعة بس.

و «إيه اللي اتعلمته» في الـ README مش حشو: ده اللي هتتكلم عنه في الانترفيو (تاب «الانترفيو»)، ولو مكتبتوش دلوقتي هتنساه.`,
            when: R`قبل ما تقفل أي محطة في أي مشروع في التاب ده، وقبل ما تحط لينك مشروع في CV. ولو القايمة طويلة عليك في أول مشروع، البنود الأربعة الأولى هي اللي متتنازلش عنها.`,
            mistakes: R`إنك تعتبر Device Toolbar في Chrome كفاية: الموبايل الحقيقي فيه كيبورد بيغطي نص الشاشة، و [[100vh]] بيتصرف غير، واللمس مش زي الماوس. أو تشغّل Lighthouse على الـ dev server فتطلع أرقام وحشة ملهاش علاقة بالإنتاج. أو README فيه أوامر Create React App الافتراضية. أو لينك live بقاله شهرين واقع لأن الـ free tier نام. وفي الانترفيو، السؤال «إيه أصعب bug قابلك في المشروع ده؟» محتاج إجابة من المشروع نفسه، والقايمة دي بتخليك تجمعها وانت شغال.`
          },
          teach: R`## الفكرة: قايمة بإيدك، وسكربت يفحص اللي ينفع يتفحص

المثال قايمة markdown: كل سطر بيبدأ بـ [[- [ ] ]]، ودي checkbox فاضية بتتعرض على GitHub كمربع تقدر تعلّم عليه ([[- [x] ]] يعني اتعمل). القايمة دي بتتحط في وصف كل PR، وانت بتعلّم على اللي اتأكدت منه.

بس نص البنود ينفع يتفحص أوتوماتيك، فالحل المرجعي سكربت Node اسمه [[scripts/done-check.mjs]]. هنفكه حتة حتة، وبعدين نشغّله على repo حقيقي. كل اللي تحت اتشغّل على Windows 11 بـ Node 24.19 و Git 2.56 من Git Bash.

| البند | مين بيفحصه |
|---|---|
| موبايل حقيقي، وكيبورد، وقارئ شاشة | انت بإيدك (الدرس اللي بعد الجاي) |
| Lighthouse و axe | اختبارات Playwright و Lighthouse (مشروع ١) |
| README فيه لينك وصورة | السكربت |
| مفيش .env في git، و git status نضيف | السكربت |
| رسايل الـ commits | السكربت |
| الاختبارات بتعدّي | السكربت (بيشغّل [[npm test]]) |

---

## ١. الاستيراد

~~~text scripts/done-check.mjs
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
~~~

- امتداد الملف [[.mjs]] معناه إن Node يعامله كـ ES module، فـ [[import]] بيشتغل من غير ما تحط [[type: module]] في [[package.json]].
- [[node:]] في أول الاسم معناها «مكتبة جاية مع Node نفسه»، مش من npm.
- [[execSync]]: بيشغّل أمر في الترمنال ويستنى لحد ما يخلص (Sync = متزامن) ويرجّع اللي طبعه.
- [[existsSync]]: الملف ده موجود ولا لأ؟ و [[readFileSync]]: اقرا الملف كله.

## ٢. دالة صغيرة تشغّل أوامر

~~~text
const sh = cmd => execSync(cmd, { encoding: 'utf8', stdio: 'pipe' })
~~~

[[sh('git status --porcelain')]] بترجّع ناتج الأمر كـ string:

- [[encoding: 'utf8']]: من غيرها الناتج بيرجع [[Buffer]] (بايتات)، مش نص.
- [[stdio: 'pipe']]: الناتج يرجع للسكربت بدل ما يتطبع على الشاشة. ده اللي بيمنع ناتج [[npm test]] يغرق الشاشة.
- لو الأمر خرج بـ exit code غير صفر، [[execSync]] بيرمي error. وده بالظبط اللي هنستخدمه في بند الاختبارات.

## ٣. [[check]]: كل بند في سطر

~~~text
const results = []
function check(name, fn) {
  try {
    const r = fn()
    results.push({ ok: r === true, name, why: r === true ? '' : r })
  } catch (e) {
    results.push({ ok: false, name, why: String(e.message).split('\n')[0] })
  }
}
~~~

الاتفاق: كل فحص دالة بترجّع [[true]] لو تمام، أو **نص** فيه السبب لو لأ. و [[check]] بتشغّلها جوه [[try]]:

- رجّعت [[true]]: البند ✓.
- رجّعت نص: البند ✗ والنص هو السبب.
- رمت error (أمر git فشل مثلًا): ✗، والسبب أول سطر بس من رسالة الـ error ([[split('\n')[0]]])، لأن رسايل [[execSync]] طويلة.

وده بيخلي البنود تحت تبقى سطر أو اتنين، بالشكل ده: [[شرط || 'السبب']]. لو الشرط [[true]] الـ [[||]] بيرجّعه، ولو [[false]] بيرجّع النص اللي بعده.

## ٤. بنود الـ README

~~~text
const readme = existsSync('README.md') ? readFileSync('README.md', 'utf8') : ''
check('README فيه لينك live', () => /https:\/\/\S+/.test(readme) || 'مفيش لينك https')
~~~

لو مفيش README، النص فاضي (مش error). والـ regex [[/https:\/\/\S+/]] معناه: [[https://]] (الشرطتين متهرّبين بـ [[\/]] لأن [[/]] بتقفل الـ regex)، وبعدها [[\S+]] يعني حرف واحد أو أكتر مش مسافة. فـ [[http://localhost:3000]] مش هيعدّي، لأن مفيش [[s]].

~~~text
check('README فيه screenshot موجودة', () => {
  const imgs = [...readme.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map(m => m[1]).filter(p => !p.startsWith('http'))
  return (imgs.length > 0 && imgs.every(p => existsSync(p))) || 'مفيش صورة، أو مسارها غلط'
})
~~~

الصورة في markdown شكلها [[![وصف](مسار)]]. الـ regex بيمسكها كده:

~~~text الـ regex حتة حتة
!\[          علامة التعجب والقوس المربع
[^\]]*      أي حروف لحد ما القوس يتقفل (الوصف)
\]\(        القوس المربع اللي بيقفل، وبعده (
([^)\s]+)   المسار نفسه، وده المجموعة رقم 1
\)          قفلة القوس
~~~

[[matchAll]] بيرجّع كل الصور، و [[m[1]]] المسار، و [[filter]] بيشيل الصور اللي على الإنترنت (مش هنقدر نتأكد منها بـ [[existsSync]]). وفي الآخر لازم تبقى فيه صورة واحدة على الأقل، وكل المسارات موجودة فعلًا. جرّبناه على نص فيه صورتين:

~~~text الناتج
[ 'docs/m.png', 'https://x/y.png' ]   ← قبل الـ filter
~~~

## ٥. الأسرار

~~~text
check('.env مش في git', () => {
  const leaked = sh('git ls-files').split('\n').filter(f => /(^|\/)\.env(\.|$)/.test(f) && !f.endsWith('.example'))
  return leaked.length === 0 || $__btملفات أسرار في git: $__{leaked.join(', ')}$__bt
})
~~~

[[git ls-files]] بيطبع كل ملف git متابعه. الـ regex: [[.env]] في أول الاسم أو بعد [[/]]، وبعده يا إما نقطة يا إما نهاية الاسم. جرّبناه على أسامي:

~~~text الناتج
.env                 true
.env.production      true
apps/web/.env.local  true
.env.example         false   ← مسموح، مفيهوش أسرار
.envrc               false
config/env.js        false
~~~

## ٦. git status والـ commits

~~~text
check('git status نضيف', () => sh('git status --porcelain').trim() === '' || 'فيه تعديلات مش متعملها commit')
~~~

[[--porcelain]] بيطبع شكل ثابت سهل للسكربتات (سطر لكل ملف متغير). لو فاضي، مفيش حاجة مش متعملها commit.

~~~text
check('رسايل الـ commits مفهومة', () => {
  const bad = sh('git log -10 --format=%s').split('\n').filter(s => s && (s.length < 10 || /^wip\b/i.test(s) || /^(fix|update|changes|edit)\W*$/i.test(s)))
  return bad.length === 0 || $__btرسايل مش بتقول حاجة: $__{bad.join(' | ')}$__bt
})
~~~

[[git log -10 --format=%s]]: آخر ١٠ commits، والعنوان بس ([[%s]] = subject). والرسالة «وحشة» لو: أقصر من ١٠ حروف، أو بتبدأ بـ wip ([[\b]] = آخر الكلمة، و [[i]] = من غير فرق بين الكبير والصغير)، أو كلمة واحدة زي fix أو update وبعدها رموز بس ([[\W*]]). جرّبناه:

~~~text الناتج
"wip"                                             وحشة
"WIP: login"                                      وحشة
"fix."                                            وحشة
"feat: x"                                         وحشة (أقل من ١٠ حروف)
"fix(a11y): give the hero image a real alt text"  تمام
"final final"                                     تمام  ← السكربت مش بيمسكها
~~~

السطر الأخير مهم: السكربت بيمسك أشهر الرسايل الوحشة بس، مش كلها. القراية بعينك لسه مطلوبة.

## ٧. الاختبارات والطباعة

~~~text
check('الاختبارات عدّت', () => { sh('npm test'); return true })

for (const r of results) console.log($__bt$__{r.ok ? '✓' : '✗'} $__{r.name}$__{r.why ? $__bt ($__{r.why})$__bt : ''}$__bt)
process.exitCode = results.every(r => r.ok) ? 0 : 1
~~~

- [[npm test]] لو فشل بيخرج بـ 1، فـ [[sh]] بترمي، و [[check]] بتعتبره ✗. لو عدّى نوصل لـ [[return true]].
- الطباعة: علامة، واسم البند، والسبب بين قوسين لو فيه.
- [[process.exitCode = 1]] لو أي بند فشل. بنستخدم [[exitCode]] مش [[process.exit(1)]] عشان Node يخلص طباعة كل حاجة الأول. والـ exit code ده اللي الـ CI أو الـ hook بيقراه.

---

## ٨. تشغيل حقيقي

repo فيه [[package.json]] و [[npm test]] بيشغّل [[node --test]]، و commit واحد اسمه «wip»، ومن غير README:

~~~bash
node scripts/done-check.mjs; echo "exit=$?"
~~~

~~~text الناتج
✗ README فيه لينك live (مفيش لينك https)
✗ README فيه screenshot موجودة (مفيش صورة، أو مسارها غلط)
✓ .env مش في git
✓ git status نضيف
✗ رسايل الـ commits مفهومة (رسايل مش بتقول حاجة: wip)
✓ الاختبارات عدّت
exit=1
~~~

ضفنا README فيه [[https://you.github.io/dc/]] وصورة موجودة، وبالغلط [[.env]] في نفس الـ commit:

~~~text الناتج
✓ README فيه لينك live
✓ README فيه screenshot موجودة
✗ .env مش في git (ملفات أسرار في git: .env)
✓ git status نضيف
✗ رسايل الـ commits مفهومة (رسايل مش بتقول حاجة: wip)
✓ الاختبارات عدّت
exit=1
~~~

[[git rm --cached .env]] وحطيناه في [[.gitignore]] وعملنا commit: بند الـ .env بقى ✓. بس خلي بالك: الملف لسه في التاريخ القديم، والسكربت بيفحص الحالة الحالية بس (الحل الحقيقي في درس [[.env اترفع على Git]] في تاب «الأمان»). وبند «wip» فضل ✗ لأنه لسه في آخر ١٠ commits. ولما عدّلنا الـ README من غير commit:

~~~text الناتج
✗ git status نضيف (فيه تعديلات مش متعملها commit)
~~~

---

## الخلاصة

- «خلصت» = ٨ بنود، نصهم بإيدك ونصهم بيتفحص أوتوماتيك.
- كل فحص بيرجّع [[true]] أو نص السبب، و [[check]] بتمسك أي error.
- [[stdio: 'pipe']] بيخلي ناتج الأوامر يرجع للسكربت، و [[process.exitCode]] بيخلي الـ CI يعرف النتيجة.
- السكربت بيمسك الغلطات المشهورة بس: لينك https، وصورة موجودة، و .env، و wip. والباقي عينك.`,
          lines: [
            R`الموبايل الحقيقي أول بند: أغلب الزوار هيجوا منه. و ٤٤px هو أقل حجم مريح للصباع.`,
            R`ترتيب الـ Tab لازم يمشي مع ترتيب الشاشة، والـ focus لازم يبان (درس [[focus-visible]] في تاب «HTML و CSS»).`,
            R`الحاجات اللي قارئ الشاشة محتاجها. التفاصيل في درس [[كيبورد وقارئ شاشة]] في تاب «HTML و CSS».`,
            R`رقم واحد تقيس بيه. على الموبايل مش الديسكتوب، لأن Lighthouse بيبطّأ الشبكة والـ CPU في وضع الموبايل.`,
            R`نوعين من الاختبارات: المنطق لوحده، وأهم رحلة للمستخدم كاملة.`,
            R`الـ README هو أول صفحة حد بيشوفها في الـ repo.`,
            R`git نضيف: أسرار برّه، ومفيش شغل مش متعمله commit، وتاريخ مفهوم.`,
            R`الـ ٤ حالات لأي شاشة بتجيب داتا. أغلب الـ tutorials بتعمل حالة «فيها داتا» بس.`
          ],
          sol: R`السكربت بيطبع ✓ أو ✗ جنب كل بند، وسبب الفشل جنبه، و exit code بيبقى 1 لو أي بند فشل (عشان تقدر تحطه في CI أو في hook). جرّبناه على مشروع ٢ في repo جديد فيه commit واحد اسمه «wip» ومن غير README، فطلع ٣ ✗: [[README فيه لينك live (مفيش لينك https)]] و [[README فيه screenshot موجودة]] و [[رسايل الـ commits مفهومة (رسايل مش بتقول حاجة: wip)]]. ولما ضفنا README بلينك وصورة، وملف .env بالغلط في نفس الـ commit، الـ README عدّى وطلع [[ملفات أسرار في git: .env]].

الغلطات الشائعة: تفحص وجود كلمة «http» بس، فلينك [[http://localhost:3000]] يعدّي (السكربت بيدوّر على https). أو تفحص إن فيه [[![...](...)]] من غير ما تتأكد إن الصورة موجودة فعلًا في المسار ده. أو تشغّل [[npm test]] بـ [[stdio: "inherit"]] فتغرق الشاشة بناتج الاختبارات. وخلي بالك إن ملف [[.env.example]] مسموح، بس [[.env]] و [[.env.production]] لأ.

البنود اليدوية (موبايل وكيبورد وقارئ شاشة) السكربت مبيقدرش يحكم عليها: دي بتتعمل بإيدك في الدرس الجاي.`,
          solCode: R`import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const sh = cmd => execSync(cmd, { encoding: 'utf8', stdio: 'pipe' })
const results = []
function check(name, fn) {
  try {
    const r = fn()
    results.push({ ok: r === true, name, why: r === true ? '' : r })
  } catch (e) {
    results.push({ ok: false, name, why: String(e.message).split('\n')[0] })
  }
}

const readme = existsSync('README.md') ? readFileSync('README.md', 'utf8') : ''
check('README فيه لينك live', () => /https:\/\/\S+/.test(readme) || 'مفيش لينك https')
check('README فيه screenshot موجودة', () => {
  const imgs = [...readme.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map(m => m[1]).filter(p => !p.startsWith('http'))
  return (imgs.length > 0 && imgs.every(p => existsSync(p))) || 'مفيش صورة، أو مسارها غلط'
})
check('.env مش في git', () => {
  const leaked = sh('git ls-files').split('\n').filter(f => /(^|\/)\.env(\.|$)/.test(f) && !f.endsWith('.example'))
  return leaked.length === 0 || $__btملفات أسرار في git: $__{leaked.join(', ')}$__bt
})
check('git status نضيف', () => sh('git status --porcelain').trim() === '' || 'فيه تعديلات مش متعملها commit')
check('رسايل الـ commits مفهومة', () => {
  const bad = sh('git log -10 --format=%s').split('\n').filter(s => s && (s.length < 10 || /^wip\b/i.test(s) || /^(fix|update|changes|edit)\W*$/i.test(s)))
  return bad.length === 0 || $__btرسايل مش بتقول حاجة: $__{bad.join(' | ')}$__bt
})
check('الاختبارات عدّت', () => { sh('npm test'); return true })

for (const r of results) console.log($__bt$__{r.ok ? '✓' : '✗'} $__{r.name}$__{r.why ? $__bt ($__{r.why})$__bt : ''}$__bt)
process.exitCode = results.every(r => r.ok) ? 0 : 1`
        },
        {
          cmd: "قبل أي مشروع: الـ repo والـ commits",
          title: "تبدأ الـ repo إزاي وتكتب commits تتقري؟",
          desc: R`كل مشروع repo لوحده على GitHub من أول يوم، مش في الآخر. وكل محطة في المشروع بتتعمل في branch، وتدخل main بـ PR، حتى لو انت لوحدك: الـ PR بيجبرك تقرا الـ diff بتاعك، وبيبقى مكان تكتب فيه «خلصت» اتحقق إزاي.

الـ commit الكويس بيعمل حاجة واحدة، ورسالته بتقول إيه اللي اتغير وليه. شكل Conventional Commits ([[feat:]] و [[fix:]] و [[test:]] و [[docs:]] و [[chore:]]) بيخلي التاريخ يتقري بسرعة، وأغلب الشركات بتستخدمه. أوامر git نفسها في تاب «git»، و commitlint في تاب «فحص الكود».`,
          example: R`git switch -c m2-layout
git add styles.css
git commit -m "feat(layout): mobile-first grid for features and pricing"
git add index.html
git commit -m "fix(a11y): give the hero image a real alt text"
git push -u origin m2-layout
gh pr create --fill --base main
gh pr merge --squash --delete-branch`,
          try: R`في repo المشروع الأول: اعمل branch اسمه [[m1-spec]]، وحط فيه ملف [[docs/spec.md]] (هتكتبه في أول درس في المشروع)، واعمل commit بـ [[docs:]]، وافتح PR بـ [[gh pr create]]، واكتب في الوصف البنود اللي خلصت من [[DONE.md]]، واعمل merge. وبعدين [[git log --oneline]] واتأكد إن التاريخ بيحكي اللي حصل.`,
          deep: {
            why: R`اللي بيقيّم مشروعك (مراجع take-home أو مدير تقني) بيفتح تاريخ الـ commits كتير أكتر ما تتخيل: هو بيشوف إزاي بتفكر، مش بس النتيجة. repo فيه commit واحد اسمه «first commit» فيه ٣٠٠٠ سطر معناه إن الكود اتنسخ أو اتعمل مرة واحدة. وتاريخ نضيف بيساعدك انت كمان: [[git bisect]] و [[git revert]] بيشتغلوا بس لو كل commit حاجة واحدة.`,
            how: R`اشتغل على branch لكل محطة: [[m1-spec]] و [[m2-layout]]... وخلي كل commit يعدّي الاختبارات لوحده. قبل الـ commit اعمل [[git add -p]] واختار الحتت اللي تبع التغيير ده بس، والباقي يروح commit لوحده.

الرسالة: [[type(scope): وصف قصير بصيغة الأمر]]، وسطر فاضي، وبعدين «ليه» لو مش واضحة. الـ scope اختياري ([[layout]] أو [[a11y]] أو [[api]]).

[[gh pr merge --squash]] بيجمّع commits الـ branch في commit واحد على main برسالة الـ PR. ده مناسب لو الـ commits جوه الـ branch كانت فوضى. ولو كانت نضيفة، [[--rebase]] بيحافظ عليها زي ما هي. الاتنين أحسن من merge commits كتير في مشروع لوحدك.

والـ [[.gitignore]] من أول commit: [[node_modules/]] و [[.env]] و [[dist/]] و [[.next/]] و [[test-results/]]. ولو حاجة اترفعت بالغلط، شوف درس [[.env اترفع على Git]] في تاب «الأمان»: مسحها من آخر commit مش كفاية.`,
            when: R`من أول دقيقة في كل مشروع. ولو نسيت وعندك مشروع قديم كله commit واحد، مش لازم تعيد كتابة التاريخ: ابدأ النظافة من دلوقتي.`,
            mistakes: R`commit اسمه «update» أو «changes» أو «final final». أو commit فيه تغيير الـ layout وتصليح bug و upgrade مكتبة مع بعض. أو تشتغل على main على طول لحد آخر المشروع. أو ترفع [[node_modules]] لأن الـ .gitignore اتعمل بعد أول commit (لازم [[git rm -r --cached node_modules]]). وفي الانترفيو: «ليه squash؟» الإجابة الكويسة إن main بيبقى فيه commit لكل ميزة يتعمله revert لوحده.`
          },
          teach: R`## الفكرة: محطة = branch، وتغيير = commit، والدخول لـ main بـ PR

المثال ٨ أوامر بتعمل دورة محطة كاملة: تفتح branch، وتعمل commit لكل تغيير لوحده، وترفع، وتفتح PR، وتدمجه. هنمشي عليهم واحد واحد. الأوامر المحلية (switch و add و commit و log و merge) اتشغّلت فعلًا على repo تجريبي بـ Git 2.56 على ويندوز. أما [[git push]] و [[gh pr]] محتاجين repo على GitHub، فناتجهم مكتوب من وثايق GitHub و gh.

---

## ١. [[git switch -c m2-layout]]

- [[switch]]: انقل لـ branch.
- [[-c]] اختصار create: اعمله الأول وبعدين انقل له.
- [[m2-layout]]: الاسم. [[m2]] رقم المحطة، و [[layout]] هي عن إيه. الاسم ده بيظهر في الـ PR وفي التاريخ، فخليه يقول حاجة.

~~~text الناتج
Switched to a new branch 'm2-layout'
~~~

الـ branch الجديد بيبدأ من نفس الـ commit اللي انت عليه، يعني main.

## ٢. اختار الملفات: [[git status]] ثم [[git add styles.css]]

قبل أي [[add]]، شوف إيه اللي اتغير. عدّلنا ملفين:

~~~bash
git status --short
~~~

~~~text الناتج
?? index.html
?? styles.css
~~~

[[??]] يعني ملف جديد git لسه مش متابعه. احنا عايزين الملفين دول في **commitين**، لأن كل واحد تغيير مختلف. فـ [[git add styles.css]] بياخد ملف واحد بس للـ commit الجاي (الـ staging area). وفي ملف واحد فيه تغييرين، [[git add -p]] بيعرض كل حتة (hunk) ويسألك تاخدها ولا لأ.

## ٣. [[git commit -m "feat(layout): mobile-first grid for features and pricing"]]

[[-m]] = message. والرسالة على شكل Conventional Commits:

~~~text شكل الرسالة
feat(layout): mobile-first grid for features and pricing
│    │        │
│    │        └── الوصف: بصيغة الأمر، بيقول اتعمل إيه بالظبط
│    └── الـ scope (اختياري): الجزء اللي اتغير
└── النوع: feat حاجة جديدة، fix تصليح، docs، test، chore شغل جانبي
~~~

~~~text الناتج
[m2-layout 942d1c5] feat(layout): mobile-first grid for features and pricing
 1 file changed, 1 insertion(+)
 create mode 100644 styles.css
~~~

- [[942d1c5]]: أول ٧ حروف من الـ hash، ده «اسم» الـ commit.
- [[1 file changed]]: ملف واحد بس، زي ما اخترنا.
- [[create mode 100644]]: ملف جديد، و [[100644]] معناها ملف عادي مش executable.

## ٤. الـ commit التاني

~~~bash
git add index.html
git commit -m "fix(a11y): give the hero image a real alt text"
git log --oneline
~~~

~~~text الناتج
c43c01d fix(a11y): give the hero image a real alt text
942d1c5 feat(layout): mobile-first grid for features and pricing
790b0aa chore: start project 1
~~~

[[--oneline]] سطر لكل commit، الأحدث فوق. التاريخ بيتقري كأنه قصة.

## ٥. [[git push -u origin m2-layout]]

- [[origin]]: الاسم الافتراضي للـ remote (الـ repo على GitHub).
- [[-u]] اختصار [[--set-upstream]]: اربط الـ branch المحلي بالـ branch اللي على GitHub، فبعد كده [[git push]] و [[git pull]] من غير أسماء.

ولو الـ repo مالوش remote أصلًا (زي الـ repo التجريبي بتاعنا)، git بيقولك:

~~~text الناتج
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
~~~

والحل [[gh repo create p1-landing --public --source=. --push]] (أمر الـ lab فوق) أو [[git remote add origin <لينك الـ repo>]].

## ٦. [[gh pr create --fill --base main]]

[[gh]] أداة GitHub الرسمية في الترمنال (لازم [[gh auth login]] مرة واحدة).

- [[pr create]]: افتح Pull Request من الـ branch الحالي.
- [[--fill]]: خد العنوان والوصف من الـ commits بدل ما يسألك.
- [[--base main]]: الـ PR رايح على main.

بيطبع لينك الـ PR. افتحه، واقرا الـ diff كأنك حد تاني، وزوّد في الوصف بنود [[DONE.md]] اللي اتأكدت منها.

## ٧. [[gh pr merge --squash --delete-branch]]

- [[--squash]]: كل commits الـ branch تبقى commit واحد على main، ورسالته عنوان الـ PR ورقمه.
- [[--delete-branch]]: امسح الـ branch على GitHub وعندك بعد الدمج.

عملنا نفس الفكرة محليًا بـ [[git merge --squash]] عشان نشوف الشكل:

~~~bash
git switch main
git merge --squash m2-layout
git commit -m "M2: layout (#2)"
git branch -D m2-layout
git log --oneline
~~~

~~~text الناتج
4dc6b58 M2: layout (#2)
790b0aa chore: start project 1
~~~

الـ commitين بقوا واحد على main. و [[(#2)]] على GitHub بيبقى لينك للـ PR، فلو حد عايز التفاصيل (الـ commits الصغيرة والنقاش)، بيلاقيها هناك.

| الدمج | الشكل على main | إمتى |
|---|---|---|
| [[--squash]] | commit واحد لكل PR | الـ commits جوه الـ branch فوضى أو صغيرة أوي |
| [[--rebase]] | نفس الـ commits زي ما هي | كل commit نضيف ومعدّي الاختبارات لوحده |
| [[--merge]] | الـ commits + merge commit | فرق كبيرة عايزة تشوف شكل الـ branches |

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git switch -c m2-layout]] | branch للمحطة |
| [[git add <ملف>]] | اختار اللي يدخل الـ commit ده بس |
| [[git commit -m "type(scope): ..."]] | تغيير واحد برسالة بتقول عمل إيه |
| [[git push -u origin <branch>]] | ارفع واربط |
| [[gh pr create --fill --base main]] | افتح PR |
| [[gh pr merge --squash --delete-branch]] | ادمج commit واحد وامسح الـ branch |

- commit = تغيير واحد. لو الرسالة محتاجة «و» في النص، غالبًا commitين.
- الـ PR حتى لو لوحدك: بيجبرك تقرا الـ diff وتكتب «خلصت» اتحقق إزاي.`,
          lines: [
            R`branch جديد للمحطة التانية.`,
            R`خد ملف واحد بس للـ commit ده.`,
            R`[[feat]] لأنه حاجة جديدة، والـ scope [[layout]]، والوصف بيقول عملت إيه بالظبط.`,
            R`الملف التاني لـ commit لوحده، عشان ده تغيير تاني.`,
            R`[[fix]] لأنه تصليح، والـ scope [[a11y]].`,
            R`ارفع الـ branch، و [[-u]] بيربطه بالـ remote عشان [[git push]] بعد كده يبقى كفاية.`,
            R`افتح PR على main، و [[--fill]] بياخد العنوان والوصف من الـ commits.`,
            R`ادمجه كـ commit واحد على main وامسح الـ branch.`
          ],
          sol: R`بعد الـ merge، [[git log --oneline]] على main هيطلّع حاجة زي: [[a1b2c3d docs: add project 1 spec (#1)]] فوق [[chore: start project 1]]. الرقم [[(#1)]] GitHub بيضيفه لما تعمل squash، وبيوديك للـ PR اللي فيه النقاش.

لو [[gh pr create]] قالك [[must first push the current branch]] يبقى نسيت [[git push -u]]. ولو [[gh]] مش متسطب أو مش عامل login، شوف درس [[gh CLI]] في تاب «GitHub Actions» ودرس [[gh pr]] في تاب «git»، أو افتح الـ PR من موقع GitHub.

وصف PR كويس للمحطة دي: «المحطة ١: الـ spec. خلصت: الأقسام والشروط مكتوبة، ومراجعة DONE.md: مش منطبق لسه (مفيش شاشات)». مش لازم يبقى طويل، بس لازم يقول إزاي عرفت إنه خلص.`
        },
        {
          cmd: "قبل أي مشروع: موبايل وكيبورد وقارئ شاشة",
          title: "تجرّب على موبايل حقيقي وبالكيبورد وقارئ الشاشة إزاي؟",
          desc: R`٣ اختبارات بإيدك، كل واحد ١٠ دقايق، وبيمسكوا حاجات مفيش أداة بتمسكها.

الموبايل الحقيقي: شغّل السيرفر على الشبكة كلها ([[--host]] في Vite، أو [[npx serve]] بيعمل كده لوحده)، وافتح الـ Network URL من الموبايل وهو على نفس الـ Wi-Fi. وتقدر تفتح DevTools على صفحة الموبايل من الكمبيوتر بـ [[chrome://inspect]] (درس في تاب «Console»).

الكيبورد: حط الماوس بعيد، ودوس Tab من أول الصفحة لآخرها. كل حاجة بتتداس لازم توصلها، والـ focus لازم يبان، وتقدر تشغّلها بـ Enter أو Space.

قارئ الشاشة: NVDA على ويندوز (ببلاش)، أو VoiceOver على الماك والآيفون، أو TalkBack على أندرويد. التفاصيل في درس [[كيبورد وقارئ شاشة]] في تاب «HTML و CSS».`,
          example: R`npx serve -l 4173 site
ip -4 addr show | grep inet
npx lighthouse http://localhost:4173/ --only-categories=performance,accessibility,best-practices,seo --view
npx playwright test --project=mobile`,
          try: R`على أي صفحة عندك (أو صفحة الـ lab): (١) افتحها من موبايلك على نفس الـ Wi-Fi، ولف الموبايل بالعرض. (٢) Tab من أولها لآخرها واكتب كل مكان الـ focus اختفى فيه. (٣) شغّل قارئ الشاشة واسمع أول ٣٠ ثانية. (٤) شغّل Lighthouse بوضع الموبايل. اكتب ٣ مشاكل لقيتها وأنهي اختبار مسك كل واحدة.`,
          deep: {
            why: R`Lighthouse و axe بيمسكوا تقريبًا ثلث مشاكل الـ accessibility: بيشوفوا إن الصورة ليها alt، بس مش بيعرفوا إن الـ alt ده «image1.png». ومش بيعرفوا إن الـ modal بيقفل الـ focus برّه. والموبايل الحقيقي بيطلّع حاجات الـ emulator مبيطلعهاش: الكيبورد اللي بيطلع ويغطي الفورم، واللمس على زرار صغير، والنت البطيء فعلًا.`,
            how: R`[[npx serve -l 4173 site]] بيشغّل سيرفر static على البورت 4173 وبيطبع Network URL (لو مش باين، [[ip -4 addr]] على لينكس أو [[ipconfig]] على ويندوز يدّيك الـ IP). من الموبايل افتح [[http://IP:4173]]. لو مش فاتح: الـ firewall مانع البورت، أو الموبايل على شبكة تانية.

Lighthouse CLI بيحتاج Chrome على الجهاز. بيشتغل بوضع الموبايل افتراضيًا (شاشة صغيرة و CPU أبطأ ٤ مرات ونت 4G بطيء)، فالرقم أقرب لتجربة زائر حقيقي من وضع الديسكتوب. شغّله على build الإنتاج، مش الـ dev server، ومرتين أو تلاتة لأن الرقم بيتحرك.

قارئ الشاشة: أهم ٣ حاجات تسمعهم: عنوان الصفحة ولغتها صح (لو [[lang]] غلط، NVDA هيقرا العربي بنطق إنجليزي)، وكل زرار له اسم مفهوم (مش «button»)، ولما يحصل خطأ في فورم بيتقري. واستخدم قايمة العناوين (H في NVDA، أو الـ rotor في VoiceOver) وشوف لو الـ headings بتحكي الصفحة لوحدها.

والـ Playwright project اسمه [[mobile]] بيستخدم [[devices['Pixel 7']]]: viewport و touch و user agent موبايل. مفيد للاختبارات، بس مش بديل للموبايل الحقيقي.`,
            when: R`في آخر كل محطة فيها شاشة، وقبل أي «خلصت». ولو عندك وقت لحاجة واحدة بس، الكيبورد: أسرع اختبار وبيمسك مشاكل كتير.`,
            mistakes: R`تجرّب قارئ الشاشة بالعين: تبص على الـ Accessibility tree في DevTools وتفتكر إن ده كفاية. أو تشغّل Lighthouse على [[npm run dev]] فتطلع performance ٤٠ وتفتكر المشروع بطيء. أو تتأكد إن الـ focus «موجود» من غير ما تتأكد إنه «باين» على خلفية فاتحة وغامقة. أو [[outline: none]] في CSS عشان «شكله وحش»، ودي أشهر مشكلة accessibility في مواقع المبتدئين.`
          },
          teach: R`## الفكرة: ٤ أوامر بتجهّز الـ ٣ اختبارات اليدوية

الاختبارات اليدوية نفسها (موبايل، وكيبورد، وقارئ شاشة) بإيدك. الأوامر بتجهّزلها: سيرفر الموبايل يقدر يوصله، والـ IP بتاعك، و Lighthouse، واختبارات Playwright بوضع الموبايل. كل اللي تحت اتشغّل على صفحة مشروع ١ (الحل المرجعي) على Windows 11، و [[ip]] في حاوية [[ubuntu:24.04]]. وعشان بورت 4173 ممكن يكون عليه حاجة تانية، شغّلناه على 6035؛ نفس الكلام بالظبط.

---

## ١. [[npx serve -l 4173 site]]

- [[npx]]: شغّل أداة من npm من غير ما تتسطب global (لو مش موجودة في المشروع بينزّلها مؤقتًا).
- [[serve]]: سيرفر ملفات static.
- [[-l 4173]] اختصار [[--listen]]: البورت.
- [[site]]: الفولدر اللي هيتعرض (فيه [[index.html]]).

لما تشغّله في ترمنال عادي بيطبع مربع فيه [[Local:]] و [[Network:]]، والـ Network هو اللي هتفتحه من الموبايل. ولو الناتج رايح لملف أو لأداة (مش ترمنال تفاعلي)، [[serve]] بيطبع سطر واحد بس (ده من الكود بتاعه: [[if (!stdout.isTTY)]]):

~~~text الناتج من serve 14.2 لما مش في ترمنال
 INFO  Accepting connections at http://localhost:6035
~~~

وهو بيسمع على كل الشبكات مش localhost بس. اتأكدنا بـ [[netstat]] على ويندوز:

~~~text netstat -ano
TCP    0.0.0.0:6035    0.0.0.0:0    LISTENING    48380
TCP    [::]:6035       [::]:0       LISTENING    48380
~~~

[[0.0.0.0]] معناها «أي IP عند الجهاز»، فالموبايل اللي على نفس الـ Wi-Fi يقدر يوصل. و [[48380]] رقم الـ process (PID). على عكس Vite: [[npm run dev]] بيسمع على localhost بس لحد ما تزوّد [[--host]].

## ٢. [[ip -4 addr show | grep inet]]: الـ IP بتاعك

- [[ip]]: أداة الشبكة في لينكس، و [[addr show]] اعرض العناوين.
- [[-4]]: IPv4 بس.
- [[| grep inet]]: من الناتج الطويل خد السطور اللي فيها العناوين.

~~~text الناتج في ubuntu:24.04 (بعد apt-get install iproute2)
    inet 127.0.0.1/8 scope host lo
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
~~~

- [[127.0.0.1]] ده الجهاز نفسه (loopback)، مينفعش من الموبايل.
- التاني هو عنوانك على الشبكة. [[/16]] حجم الشبكة. في البيت غالبًا هتلاقي [[192.168.1.x/24]].

> صورة [[ubuntu:24.04]] الصغيرة مفيهاش [[ip]] أصلًا ([[sh: 1: ip: not found]])، وكان لازم [[apt-get install iproute2]]. على أي لينكس عادي بيبقى موجود.

وعلى ويندوز (PowerShell أو CMD):

~~~powershell
ipconfig | Select-String IPv4
~~~

~~~text الناتج
   IPv4 Address. . . . . . . . . . . : 172.29.160.1
   IPv4 Address. . . . . . . . . . . : 192.168.1.2
~~~

الأول شبكة WSL الداخلية، والتاني هو الـ Wi-Fi. من الموبايل افتح [[http://192.168.1.2:4173]]. ولو مفتحش: Windows Firewall بيسأل أول مرة Node يفتح بورت، أو الموبايل على شبكة تانية (Wi-Fi الضيوف مثلًا). وعلى الماك: [[ipconfig getifaddr en0]] (من وثايق Apple، مش متجرّب هنا).

## ٣. Lighthouse من الترمنال

~~~bash
npx lighthouse http://localhost:4173/ --only-categories=performance,accessibility,best-practices,seo --view
~~~

- [[lighthouse URL]]: افتح الصفحة في Chrome وقيسها.
- [[--only-categories=...]]: الأربع فئات اللي فيها رقم (من غير PWA).
- [[--view]]: افتح التقرير HTML في المتصفح بعد ما يخلص. ولو عايز الأرقام في ملف بدله: [[--output=json --output-path=lh.json]].

اتشغّل بـ Lighthouse 13.5 على Chrome 154، على الصفحة العربي:

~~~text الناتج
performance=100 accessibility=100 best-practices=100 seo=100
FCP 0.8 s   LCP 0.9 s   CLS 0   TBT 0 ms
~~~

وإعدادات الموبايل اللي استخدمها (من نفس التقرير، [[configSettings]]):

~~~text الناتج
screenEmulation: width 412, height 823, deviceScaleFactor 1.75, mobile true
throttling: rttMs 150, throughputKbps 1638.4, cpuSlowdownMultiplier 4
~~~

| الرقم | معناه |
|---|---|
| [[rttMs 150]] | كل رحلة للسيرفر ورجوع بتاخد ١٥٠ms، زي 4G بطيء |
| [[throughputKbps 1638.4]] | حوالي ١.٦ ميجابت في الثانية |
| [[cpuSlowdownMultiplier 4]] | المعالج أبطأ ٤ مرات، عشان يشبه موبايل متوسط |
| FCP | First Contentful Paint: أول حاجة اترسمت |
| LCP | Largest Contentful Paint: أكبر حاجة (هنا الصورة أو العنوان) |
| CLS | Cumulative Layout Shift: الحاجات اتنقلت من مكانها قد إيه |
| TBT | Total Blocking Time: الـ main thread كان مشغول قد إيه. صفر لأن مفيش JS |

## ٤. [[npx playwright test --project=mobile]]

[[--project=mobile]] بيشغّل الاختبارات على project اسمه [[mobile]] في [[playwright.config.ts]] بس. والـ project ده بيستخدم [[devices['Pixel 7']]]، وده اللي جواه فعلًا:

~~~text devices['Pixel 7'] في Playwright 1.64
viewport: 412 x 839, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true
userAgent: Mozilla/5.0 (Linux; Android 14; Pixel 7) ...
~~~

~~~text الناتج
  ok 2 [mobile] › tests\a11y.spec.ts:5:7 › no axe violations on / (1.2s)
  ok 4 [mobile] › tests\a11y.spec.ts:11:7 › no horizontal scroll on / (370ms)
  ...
  ok 8 [mobile] › tests\a11y.spec.ts:27:5 › language switch links both ways (639ms)

  8 passed (5.4s)
~~~

ده لسه Chrome على الكمبيوتر بشاشة صغيرة و touch، مش موبايل: مفيش كيبورد بيطلع يغطي الفورم، ولا صباع بيدوس جنب الزرار.

---

## ٥. الاختبارات اليدوية: بتدوّر على إيه

| الاختبار | بتعمل إيه | بيمسك إيه |
|---|---|---|
| موبايل حقيقي | افتح الـ Network URL، ولف الموبايل بالعرض | scroll بالعرض، زراير صغيرة، كيبورد بيغطي حقول |
| كيبورد | Tab من الأول للآخر، و Shift+Tab رجوع، و Enter و Space و Esc | focus مش باين، ترتيب غلط، عنصر مبيتداسش |
| قارئ شاشة | NVDA: [[Insert+F7]] قايمة العناوين واللينكات، و H بين العناوين | زرار من غير اسم، [[lang]] غلط، أخطاء مبتتقريش |

وعشان تعرف قارئ الشاشة «هيشوف» إيه قبل ما تشغّله، Playwright بيطلّع شجرة الـ accessibility كـ نص ([[locator('body').ariaSnapshot()]]). أول الصفحة العربي:

~~~text الناتج (مختصر)
- link "اتخطى للمحتوى"
- banner:
  - link "ذاكر"
  - navigation "الرئيسية":
    - list:
      - listitem: link "المميزات"
      ...
- main:
  - region "خطة مذاكرة على قدّ وقتك":
    - heading "خطة مذاكرة على قدّ وقتك" [level=1]
~~~

ده تقريبًا اللي NVDA بيقراه بالترتيب. بس مش بديل إنك تسمعه: النطق نفسه (عربي ولا إنجليزي) والإعلانات وقت التغيير مبتبانش هنا.

---

## الخلاصة

- [[serve]] بيسمع على [[0.0.0.0]]، فالموبايل يوصله بالـ IP بتاعك على الشبكة ([[ip -4 addr]] أو [[ipconfig]]).
- Lighthouse بوضع الموبايل افتراضيًا: شاشة 412، و CPU أبطأ ٤ مرات، ونت بطيء. والصفحة دي ١٠٠ في الأربعة لأنها HTML و CSS بس.
- Playwright بـ Pixel 7 = Chrome بشاشة صغيرة. الموبايل الحقيقي والكيبورد وقارئ الشاشة بإيدك.`,
          lines: [
            R`سيرفر static على البورت 4173 للفولدر [[site]]، وبيسمع على الشبكة كلها مش localhost بس.`,
            R`تعرف الـ IP بتاع جهازك على الشبكة المحلية (على ويندوز [[ipconfig]]).`,
            R`Lighthouse بوضع الموبايل (الافتراضي)، على ٤ فئات، و [[--view]] بيفتح التقرير في المتصفح.`,
            R`الاختبارات على project الموبايل بس من [[playwright.config]].`
          ],
          sol: R`أشهر ٣ حاجات بتطلع في أول مرة، ومين بيمسكها:

(١) زرار أو لينك الـ focus عليه مش باين، أو الـ Tab بيروح لعنصر مخفي (قايمة موبايل مقفولة بس لسه في الـ DOM من غير [[hidden]]). الكيبورد بيمسكها، و Lighthouse لأ.

(٢) أيقونة لوحدها جوه زرار (زي ☰ أو ✕) من غير اسم، فقارئ الشاشة بيقول «button» بس. axe و Lighthouse بيمسكوها (button-name)، وقارئ الشاشة كمان.

(٣) النص بيخرج برّه الشاشة على الموبايل بالعرض، أو جدول بيعمل scroll للصفحة كلها. الموبايل الحقيقي بيمسكها، وتقدر تكتب لها اختبار: [[scrollWidth - clientWidth <= 0]] (موجود في حل مشروع ١).

لو Lighthouse طلع أقل من ٩٠ في الـ performance على صفحة static بسيطة، غالبًا صورة كبيرة من غير أبعاد، أو خط من Google Fonts بيوقّف الرسم، أو انت شغال على dev server. وفي الـ accessibility غالبًا تباين الألوان ([[color-contrast]]) أو [[lang]] ناقص.`
        },
        {
          cmd: "قبل أي مشروع: الحل المرجعي",
          title: "تستخدم الحل المرجعي إزاي من غير ما تغش نفسك؟",
          desc: R`كل محطة في التاب ده ليها حل مرجعي اتكتب واتشغّل واتجرّب. الحل موجود عشان تقارن بيه بعد ما تخلص، مش عشان تنسخه. لو نسخته، هتخلص المشاريع السبعة في أسبوع ومش هتعرف تبني حاجة.

القاعدة: جرّب الأول لوحدك (ساعة على الأقل للمحطة)، وبعدين قارن، وبعدين ابنيها تاني من الذاكرة بعد يومين. واللي مش فاهمه في الحل، ارجع للدرس اللي في الـ desc، مش للحل نفسه.`,
          example: R`git switch -c m3-attempt
git commit -am "wip: my attempt at milestone 3"
git switch -c m3-compare
git add src/ && git commit -m "ref: reference solution for m3"
git diff m3-attempt -- src/
git switch m3-attempt
git branch -D m3-compare
echo "- m3: نسيت revokeObjectURL، وعملت validation في submit بس" >> LEARNED.md`,
          try: R`قبل أول محطة في مشروع ١: اعمل ملف [[LEARNED.md]] في الـ repo. بعد كل محطة: (١) خلّص محاولتك واعمل commit. (٢) افتح الـ sol، واكتب في LEARNED.md كل فرق بين حلك والحل المرجعي، ومين فيهم أحسن وليه (ساعات حلك هو الأحسن). (٣) متعدّلش كودك دلوقتي. (٤) بعد يومين امسح الملف اللي فيه الفرق واكتبه تاني من غير ما تبص.`,
          deep: {
            why: R`اللي بيحصل لما تقرا حل: بتحس إنك فاهم، لأن كل سطر منطقي وانت بتقراه. ده اسمه illusion of competence. الحقيقة بتبان لما تقفل الحل وتحاول تكتبه: هتلاقي نفسك مش عارف تبدأ منين. والتعلّم بيحصل في المحاولة والوقوع، مش في القراية. الحل المرجعي قيمته إنه يوريك الحاجة اللي معرفتش إنك مش عارفها، بعد ما تكون حاولت.`,
            how: R`الترتيب: (١) اقرا الـ desc والشروط، وافتح الدروس اللي مذكورة فيه. (٢) اكتب خطة في ٥ سطور قبل الكود. (٣) ابني لحد ما الشروط تتحقق، أو لحد ما تقف ساعة كاملة. (٤) لو وقفت: ارجع للدرس المذكور، وبعدين لوثائق المكتبة، وبعدين اسأل (مساعد AI أو حد)، بس بسؤال عن المفهوم مش «اكتبلي الكود». (٥) بعد ما تخلص: قارن مع الحل.

المقارنة: الحلول المرجعية مكتوبة بطريقة واحدة من طرق كتير صح. لو حلك مختلف ومحقق الشروط، مش غلط. الأهم تسأل: الحل المرجعي عامل حاجة أنا معملتهاش ليه؟ غالبًا حالة وحشة (نت فاصل، ضغطة مرتين، داتا بايظة) انت مفكرتش فيها.

الإعادة من الذاكرة بعد يومين هي أقوى خطوة: اللي هتفتكره هو اللي اتعلمته فعلًا. والمساعد AI: شوف درس [[تكتب بإيدك الأول]] في تاب «الذكاء الاصطناعي»، نفس القاعدة بالظبط.

و [[git diff m3-attempt -- src/]] في المثال بيقارن الـ branch الحالي بمحاولتك، في فولدر [[src]] بس، بعد ما تحط فيه الحل المرجعي. كده الفرق بيبان سطر سطر. والـ commit على [[m3-compare]] قبل الرجوع مهم: [[git switch]] بياخد التعديلات اللي مش متعملها commit معاه للـ branch التاني، فمن غيره الحل المرجعي كان هيفضل في ملفات محاولتك بعد ما ترجع.`,
            when: R`في كل محطة. ولو لقيت نفسك فاتح الـ sol قبل ما تكتب أي سطر، ارجع خطوة: الدروس المذكورة في الـ desc لسه مش واضحة.`,
            mistakes: R`تفتح الحل «بس عشان أشوف البداية»، وبعدين كل اللي بتكتبه نسخة منه. أو تقارن وتعدّل كودك على طول يبقى زي الحل، فمتعرفش انت كنت ناقصك إيه. أو تعتبر أي اختلاف عن الحل غلطة. أو تطلب من مساعد AI يحل المحطة وتقرا الحل وتقول «فهمت». وفي الانترفيو التقني المباشر (live coding) مفيش حل تبص عليه، وده بالظبط اللي التدريب ده بيحضّرك له.`
          },
          teach: R`## الفكرة: محاولتك في branch، والحل في branch تاني، والفرق بينهم بـ diff

المثال بيحفظ محاولتك زي ما هي، ويحط الحل المرجعي جنبها في branch مؤقت، ويوريك الفرق سطر سطر، وبعدين يرجّعك لمحاولتك من غير ما تتلمس. وفي الآخر بتكتب اللي اتعلمته في جملة. كل ده اتشغّل على repo تجريبي بـ Git 2.56 على ويندوز، والملف اللي بنقارنه [[src/photo.js]] من مشروع ٣ (محاولة نسيت [[revokeObjectURL]]).

---

## ١. [[git switch -c m3-attempt]]

branch جديد اسمه [[m3-attempt]] من main. هنا هتكتب محاولتك للمحطة ٣.

~~~text الناتج
Switched to a new branch 'm3-attempt'
~~~

## ٢. [[git commit -am "wip: my attempt at milestone 3"]]

- [[-a]] = all: خد كل الملفات **المتابَعة** اللي اتعدلت، من غير [[git add]].
- [[-m]] = الرسالة.

~~~text الناتج
[m3-attempt c95efbc] wip: my attempt at milestone 3
 1 file changed, 1 insertion(+)
~~~

> [[-a]] مبياخدش الملفات **الجديدة** (اللي git عمره ما شافها). لو محاولتك فيها ملف جديد، اعمل [[git add .]] الأول.

و «wip» هنا مقصودة: ده branch مؤقت مش هيدخل main، فمفيش مشكلة مع قاعدة الرسايل.

## ٣. [[git switch -c m3-compare]]

branch تاني من **نفس النقطة** (آخر commit في محاولتك). دلوقتي انسخ الحل المرجعي من الـ sol فوق ملفاتك في [[src/]].

## ٤. [[git add src/ && git commit -m "ref: reference solution for m3"]]

- [[git add src/]]: كل اللي اتغير في فولدر [[src]].
- [[&&]]: شغّل الأمر التاني بس لو الأول نجح.

~~~text الناتج
[m3-compare 460c0f0] ref: reference solution for m3
 1 file changed, 2 insertions(+)
~~~

ليه الـ commit ده ضروري؟ جرّبنا من غيره: حطينا الحل وعملنا [[git switch m3-attempt]] على طول:

~~~text الناتج من غير commit
Switched to branch 'm3-attempt'
M	src/photo.js
~~~

[[M]] = Modified. [[git switch]] بياخد التعديلات اللي مش متعملها commit معاه للـ branch اللي رايحله (طالما مفيش تعارض)، فالحل المرجعي بقى جوه ملفات محاولتك. بالـ commit، التعديلات بتفضل محبوسة في [[m3-compare]].

## ٥. [[git diff m3-attempt -- src/]]

- [[git diff m3-attempt]]: قارن اللي انت فيه دلوقتي (الحل) بـ [[m3-attempt]] (محاولتك).
- [[--]]: اللي بعدها مسارات، مش أسماء branches.
- [[src/]]: الكود بس، من غير ملفات تانية.

~~~text الناتج
diff --git a/src/photo.js b/src/photo.js
index 87e4829..93c90ff 100644
--- a/src/photo.js
+++ b/src/photo.js
@@ -1,4 +1,6 @@
 export function clearPreview() {
+  if (previewUrl) URL.revokeObjectURL(previewUrl)
+  previewUrl = null
   preview.hidden = true
   img.removeAttribute('src')
 }
~~~

قراية الناتج:

| الحتة | معناها |
|---|---|
| [[--- a/]] و [[+++ b/]] | [[a]] محاولتك و [[b]] الحل |
| [[@@ -1,4 +1,6 @@]] | الحتة دي: من السطر ١، كانت ٤ سطور وبقت ٦ |
| سطر بـ [[+]] | موجود في الحل ومش عندك: ده اللي ناقصك |
| سطر بـ [[-]] | عندك ومش في الحل |
| سطر بمسافة | زي بعض في الاتنين |

هنا الفرق واضح: سطرين بيحرروا الـ URL القديم. ده بالظبط اللي هيتكتب في [[LEARNED.md]].

## ٦. [[git switch m3-attempt]] و [[git branch -D m3-compare]]

ارجع لمحاولتك، وامسح branch المقارنة.

~~~text الناتج
Switched to branch 'm3-attempt'
Deleted branch m3-compare (was 460c0f0).
~~~

[[-D]] كبيرة = امسح حتى لو مش متعمله merge. أما [[-d]] الصغيرة بترفض:

~~~text الناتج من git branch -d m3-compare
error: the branch 'm3-compare' is not fully merged
hint: If you are sure you want to delete it, run 'git branch -D m3-compare'
~~~

 و [[git status]] بعدها نضيف، وملفك زي ما كتبته بالظبط.

## ٧. [[echo "..." >> LEARNED.md]]

- [[echo]] بيطبع النص.
- [[>>]] بيضيفه في **آخر** الملف (ولو مش موجود بيعمله). أما [[>]] واحدة كانت هتمسح الملف وتكتب من الأول.

~~~text cat LEARNED.md
- m3: نسيت revokeObjectURL، وعملت validation في submit بس
~~~

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| احفظ محاولتك | [[git switch -c m3-attempt]] ثم [[git commit -am "..."]] |
| حط الحل في branch لوحده | [[git switch -c m3-compare]]، انسخ الحل، [[git add src/ && git commit]] |
| شوف الفرق | [[git diff m3-attempt -- src/]] |
| ارجع وامسح | [[git switch m3-attempt]] ثم [[git branch -D m3-compare]] |
| سجّل | [[echo "..." >> LEARNED.md]] |

- الـ commit على branch المقارنة قبل ما ترجع، وإلا الحل بيتنقل لملفاتك.
- سطور [[+]] في الـ diff هي اللي ناقصاك. اكتبها في جملة، ومتعدّلش كودك دلوقتي.`,
          lines: [
            R`branch لمحاولتك انت.`,
            R`احفظ المحاولة زي ما هي، حتى لو ناقصة. [[-a]] بياخد كل الملفات المتعدلة.`,
            R`branch تاني من نفس النقطة، هتحط فيه الحل المرجعي.`,
            R`بعد ما تحط الحل في [[src/]]: اعمله commit على الـ branch ده. من غيره، التعديلات هتفضل في الملفات وتنتقل معاك لما ترجع لمحاولتك.`,
            R`شوف الفرق بين الحل ومحاولتك في الكود بس.`,
            R`ارجع لمحاولتك.`,
            R`امسح branch المقارنة. [[-D]] لأنه مش متعمله merge.`,
            R`سجّل اللي اتعلمته في جملة. الملف ده هو اللي هتراجعه قبل الانترفيو.`
          ],
          sol: R`مثال لـ LEARNED.md بعد محطتين في مشروع ٣:

«m2 (validation): حلي كان بيعرض الأخطاء بس لما تدوس احجز في الآخر. الحل المرجعي بيعمل validation لكل خطوة قبل التالي، وبيحط الـ focus على ملخص الأخطاء. ده أحسن لأن المستخدم بيعرف الغلط وهو لسه في نفس الخطوة. وكمان مكنتش عامل [[aria-describedby]]، فقارئ الشاشة مكانش بيقرا الخطأ».

«m4 (الصورة): نسيت [[URL.revokeObjectURL]]، فكل مرة يغيّر الصورة الذاكرة بتزيد. حلي كان فيه حاجة الحل المرجعي معملهاش: بيعرض أبعاد الصورة. سبتها.»

الشكل ده بالظبط هو المطلوب: الفرق، ومين أحسن، وليه. ولو ملقتش ولا فرق في محطة كاملة، يا إما انت ممتاز يا إما بصيت على الحل وانت شغال.`
        }
      ]
    }
  ]
});
