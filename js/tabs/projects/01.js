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
    },
    {
      t: "مشروع ١: landing page بلغتين بـ HTML و CSS",
      l: 1,
      n: "صفحة تعريف عربي وإنجليزي، RTL و LTR، على الموبايل الأول، و Lighthouse ٩٠+ من غير سطر JavaScript",
      items: [
        {
          cmd: "مشروع ١: الـ spec",
          title: "هتبني إيه بالظبط قبل ما تكتب HTML؟",
          desc: R`المشروع: صفحة تعريف (landing page) لتطبيق مذاكرة خيالي اسمه «ذاكر»، بنسختين: عربي على [[/]] وإنجليزي على [[/en/]]. HTML و CSS بس، من غير JavaScript ولا frameworks. الهدف إنك تثبّت أساس HTML و CSS كله في مشروع واحد: semantic HTML، و responsive، و RTL، و accessibility، و الأداء.

المحطة الأولى مفيهاش كود: ملف [[docs/spec.md]] فيه الأقسام بالترتيب، وشروط «خلصت» اللي هتقيس بيها. من غير spec مكتوب، هتفضل تضيف أقسام وتغيّر ألوان ومتعرفش إمتى تقف.

خلصت يعني: الملف فيه (١) هدف الصفحة في جملة، (٢) الأقسام بالترتيب ومحتوى كل قسم، (٣) شروط قابلة للقياس (أرقام: عرض الشاشة، ودرجة Lighthouse، وعدد violations)، (٤) قايمة «برّه النسخة دي». راجع درس [[user stories]] ودرس [[MVP]] في تاب «بناء مشروع كامل».`,
          example: R`p1-landing/
  docs/spec.md          الأقسام والشروط
  site/index.html       العربي RTL
  site/en/index.html    الإنجليزي LTR
  site/styles.css       CSS واحد للغتين
  site/img/             SVG للوجو والصورة الكبيرة
  tests/a11y.spec.ts    axe وكيبورد و scroll بالعرض
  playwright.config.ts  موبايل وديسكتوب
  .github/workflows/pages.yml
  README.md`,
          try: R`اكتب [[docs/spec.md]] لصفحة التعريف: الهدف، والأقسام الـ ٦ (header، و hero، ومميزات، وأسعار، وأسئلة، و CTA مع الفوتر)، وشروط «خلصت» بأرقام، وحاجتين على الأقل برّه النسخة دي. واعمل هيكل الفولدرات اللي في المثال بملفات فاضية، و commit.`,
          flag: "script",
          deep: {
            why: R`أكبر سبب إن المشاريع الشخصية مبتخلصش إنها ملهاش نهاية مكتوبة. والـ spec كمان بيفصل قرار «إيه اللي هبنيه» عن «هبنيه إزاي»: وانت بتكتب CSS مش هتقعد تفكر تضيف قسم testimonials ولا لأ، لأنك قررت خلاص.`,
            how: R`الشروط لازم تبقى قابلة للقياس. «شكلها حلو على الموبايل» مش شرط. «مفيش scroll بالعرض من 320px لـ 1440px» شرط، وتقدر تكتب له اختبار (هتكتبه في المحطة الخامسة). «accessible» مش شرط. «صفر violations في axe، والـ Tab يوصل لكل لينك» شرط.

فصل [[site/]] عن باقي المشروع مقصود: ده الفولدر اللي هيترفع بالظبط، ومفيهوش tests ولا docs ولا config. والإنجليزي في فولدر [[en/]] جواه [[index.html]]، فالرابط يبقى [[/en/]] نضيف.

وقرار «صفر JavaScript» جزء من التمرين: [[details]] و [[summary]] بيعملوا الأسئلة من غير JS، و [[:focus]] بيعمل الـ skip link، و [[prefers-color-scheme]] بيعمل الوضع الغامق.`,
            when: R`أول ساعة في المشروع. ولو في النص جت لك فكرة قسم جديد، اكتبها في «برّه النسخة دي» وكمّل.`,
            mistakes: R`spec عبارة عن تصميم في Figma من غير شروط. أو شروط زي «سريعة» و «responsive» من غير أرقام. أو تبدأ بتدوّر على قالب جاهز وتعدّل فيه، فالمشروع ميبقاش بيوري إنك تعرف HTML و CSS. أو تنسى اللغة التانية لحد الآخر، وتكتشف إن الـ CSS كله [[left]] و [[right]].`
          },
          teach: R`## الفكرة: الـ spec بيقول «إيه» و «إمتى أقف»، والفولدرات بتفصل اللي هيترفع عن الباقي

المحطة دي مفيهاش كود: ملف markdown فيه قرارات، وهيكل فولدرات فاضي. هنقرا الهيكل الأول (ليه كل ملف في مكانه)، وبعدين الـ spec المرجعي حتة حتة، ونربط كل شرط فيه بالاختبار اللي هيقيسه بعدين.

---

## ١. الهيكل

~~~text المثال
p1-landing/
  docs/spec.md          الأقسام والشروط
  site/index.html       العربي RTL
  site/en/index.html    الإنجليزي LTR
  site/styles.css       CSS واحد للغتين
  site/img/             SVG للوجو والصورة الكبيرة
  tests/a11y.spec.ts    axe وكيبورد و scroll بالعرض
  playwright.config.ts  موبايل وديسكتوب
  .github/workflows/pages.yml
  README.md
~~~

اقسمه لمجموعتين:

| المجموعة | الملفات | بتترفع على الموقع؟ |
|---|---|---|
| الموقع نفسه | كل اللي جوه [[site/]] | أيوه، الفولدر ده بس |
| حوالين الموقع | [[docs/]] و [[tests/]] و [[playwright.config.ts]] و [[.github/]] و [[README.md]] | لأ |

- [[site/en/index.html]] مش [[site/en.html]]: كده الرابط [[/en/]]، والسيرفر بيدوّر على [[index.html]] جوه الفولدر لوحده.
- [[.github/workflows/]]: GitHub بيقرا أي ملف YAML هنا كـ workflow. النقطة في أول [[.github]] جزء من الاسم.
- [[tests/a11y.spec.ts]]: Playwright بيدوّر افتراضيًا على ملفات [[.spec.ts]] و [[.test.ts]].

اعمل الهيكل بملفات فاضية (اتشغّل في Git Bash على ويندوز، ونفس الأوامر على لينكس والماك):

~~~bash
mkdir -p docs site/en site/img tests .github/workflows
touch docs/spec.md site/index.html site/en/index.html site/styles.css tests/a11y.spec.ts playwright.config.ts .github/workflows/pages.yml README.md
find . -type f | sort
~~~

- [[mkdir -p]]: اعمل الفولدر واللي قبله لو مش موجود، ومتشتكيش لو موجود.
- [[touch]]: اعمل ملف فاضي.
- [[find . -type f]]: كل الملفات ([[f]] = file)، و [[sort]] يرتّبهم.

~~~text الناتج
./.github/workflows/pages.yml
./README.md
./docs/spec.md
./playwright.config.ts
./site/en/index.html
./site/index.html
./site/styles.css
./tests/a11y.spec.ts
~~~

وبعد [[git add .]]:

~~~text git status --short
A  .github/workflows/pages.yml
A  README.md
A  docs/spec.md
...
A  tests/a11y.spec.ts
~~~

[[site/img/]] مش موجود في القايمة: git بيتابع ملفات بس، والفولدر الفاضي مبيدخلش أي commit. هيظهر لما تحط فيه أول SVG.

> على PowerShell (اتجرّب في pwsh 7): [[New-Item -ItemType Directory -Force docs, site/en, site/img, tests, .github/workflows]] للفولدرات، و [[New-Item docs/spec.md, site/index.html]] للملفات (بياخد أكتر من مسار مفصولين بفاصلة).

---

## ٢. الـ spec حتة حتة

### الهدف

~~~text docs/spec.md
## الهدف
زائر من موبايل يفهم التطبيق بيعمل إيه في ٥ ثواني، ويدوس «ابدأ ببلاش».
~~~

جملة واحدة فيها **مين** (زائر من موبايل)، و **إيه اللي يحصل** (يفهم ويدوس)، و **رقم** (٥ ثواني). كل قرار بعد كده بيترد عليها: قسم testimonials بيساعد الزائر يدوس في ٥ ثواني؟ لأ؟ يبقى برّه.

### الصفحات والأقسام

~~~text docs/spec.md
- $__bt/$__bt عربي RTL، و $__bt/en/$__bt إنجليزي LTR، ونفس الـ CSS للاتنين
1. header: لوجو، وروابط للأقسام، ولينك اللغة التانية
2. hero: عنوان (h1)، وجملة، وزرار، وصورة
...
5. أسئلة: details و summary
~~~

الأقسام **بالترتيب** وكل قسم فيه إيه. لاحظ إن فيه قرارات HTML مكتوبة من دلوقتي (h1 واحد، و [[details]] للأسئلة). ده بيخلي المحطة الجاية تنفيذ مش تفكير.

### شروط «خلصت»: كل شرط ليه اختبار

| الشرط في الـ spec | هيتقاس بإيه (المحطة) |
|---|---|
| عرض 320px لحد 1440px من غير scroll بالعرض | [[scrollWidth - clientWidth]] في Playwright (٥) |
| أول Tab على «اتخطى للمحتوى» | اختبار [[toBeFocused()]] (٥) |
| الـ focus باين في الفاتح والغامق | بإيدك، لأن مفيش أداة بتقيس «باين» |
| axe: صفر violations في اللغتين | [[@axe-core/playwright]] (٥) |
| Lighthouse موبايل: الأربع فئات ≥ 90 | [[npx lighthouse]] (٥) |
| صفر JavaScript | [[find site -name "*.js"]] لازم ميطلعش حاجة (اتجرّب على الحل المرجعي: ناتج فاضي) |

اختبار شرط زي «شكلها حلو»: مفيش. عشان كده مش في القايمة.

### برّه النسخة دي

~~~text docs/spec.md
## برّه النسخة دي
- فورم تسجيل حقيقي، و analytics، و blog
~~~

دي القايمة اللي بتحميك من نفسك: أي فكرة تيجي في النص، اكتبها هنا وكمّل. والفورم بالذات مشروع لوحده (مشروع ٣)، فزرار «اعمل حساب» بيروح للينك برّه.

---

## الخلاصة

- [[site/]] هو الموقع وبس، والباقي (اختبارات و docs و CI) حواليه.
- الـ spec فيه: هدف بجملة فيها رقم، وأقسام بالترتيب، وشروط كل واحد ليه طريقة قياس، و «برّه النسخة دي».
- git مبيشوفش الفولدر الفاضي، فـ [[site/img/]] هيظهر مع أول صورة.`,
          lines: [
            R`اسم الـ repo والفولدر الرئيسي.`,
            R`الـ spec، أول ملف في المشروع.`,
            R`الصفحة العربية، وهي الأساس: [[lang="ar" dir="rtl"]].`,
            R`النسخة الإنجليزية في فولدر، فالرابط [[/en/]].`,
            R`ملف CSS واحد بيخدم الاتجاهين.`,
            R`صور SVG: صغيرة، وحادة على أي شاشة، ومن غير طلبات كتير.`,
            R`اختبارات الـ accessibility والـ layout.`,
            R`إعداد Playwright: project للموبايل و project للديسكتوب.`,
            R`الـ workflow اللي بيختبر وبيرفع [[site/]] على GitHub Pages.`,
            R`الـ README اللي فيه اللينك والصورة.`
          ],
          sol: R`الحل المرجعي تحت. لاحظ إن كل شرط فيه رقم أو حاجة تقدر تقول عليها «أيوه» أو «لأ»، وإن «برّه النسخة دي» فيها الفورم الحقيقي: الزرار في الـ CTA بيروح لصفحة تسجيل برّه المشروع ده، لأن الفورم مشروع لوحده (مشروع ٣).

لو الـ spec بتاعك فيه أقسام أكتر، مفيش مشكلة، بس اسأل نفسك: الزائر محتاجها عشان يدوس «ابدأ»؟ ولو شروطك مفيهاش حاجة عن الكيبورد، ضيفها: هي أول حاجة هتقع لو محدش فكر فيها.`,
          solCode: R`# ذاكر: landing page

## الهدف
زائر من موبايل يفهم التطبيق بيعمل إيه في ٥ ثواني، ويدوس «ابدأ ببلاش».

## الصفحات
- $__bt/$__bt عربي RTL، و $__bt/en/$__bt إنجليزي LTR، ونفس الـ CSS للاتنين

## الأقسام بالترتيب
1. header: لوجو، وروابط للأقسام، ولينك اللغة التانية
2. hero: عنوان (h1)، وجملة، وزرار، وصورة
3. المميزات: ٣ كروت
4. الأسعار: خطتين، والمميزة عليها border
5. أسئلة: details و summary
6. CTA وفوتر

## شروط «خلصت»
- عرض 320px لحد 1440px من غير scroll بالعرض
- الكيبورد: أول Tab على «اتخطى للمحتوى»، والـ focus باين في الفاتح والغامق
- axe: صفر violations في اللغتين
- Lighthouse موبايل: الأربع فئات ≥ 90
- صفر JavaScript

## برّه النسخة دي
- فورم تسجيل حقيقي، و analytics، و blog`
        },
        {
          cmd: "مشروع ١: الهيكل الـ semantic",
          title: "تكتب HTML الصفحة بعناصر ليها معنى إزاي؟",
          desc: R`ابني [[site/index.html]] بالعربي كامل من غير أي CSS. الصفحة لازم تبقى مفهومة ومرتبة وهي HTML خام: لو شلت الـ CSS، العناوين والقوايم والروابط لسه بتحكي الصفحة.

خلصت يعني: (١) [[lang="ar" dir="rtl"]] و viewport و title و description. (٢) skip link أول عنصر في الـ body. (٣) [[header]] و [[nav]] و [[main id="main"]] و [[footer]]، وكل [[section]] ليه [[aria-labelledby]] على الـ h2 بتاعه. (٤) h1 واحد، والعناوين من غير ما تنط مستوى. (٥) كل صورة ليها [[width]] و [[height]] و alt حقيقي أو [[alt=""]] لو زينة. (٦) الأسئلة بـ [[details]] و [[summary]].

الدروس: [[<!doctype html>]] و [[lang و dir]] و [[semantic HTML]] و [[img]] و [[details و summary]] في تاب «HTML و CSS»، و [[meta و Open Graph]] في نفس التاب.`,
          example: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ذاكر: خطة مذاكرة على قدّ وقتك</title>
  <meta name="description" content="ذاكر بيقسّم المنهج على الأيام اللي فاضلة، ويفكّرك كل يوم بالمطلوب.">
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
  <link rel="icon" href="img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip" href="#main">اتخطى للمحتوى</a>
  <header class="site-header">
    <a class="logo" href="./"><img src="img/logo.svg" alt="" width="32" height="32"> ذاكر</a>
    <nav aria-label="الرئيسية">
      <ul>
        <li><a href="#features">المميزات</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
      </ul>
    </nav>
  </header>`,
          try: R`اكتب [[site/index.html]] كامل بالأقسام اللي في الـ spec، وافتحه في المتصفح من غير CSS. استخدم قارئ الشاشة أو قايمة العناوين (في DevTools: Elements، أو extension زي HeadingsMap) واتأكد إن الـ headings لوحدها بتحكي الصفحة. وبعدين افتح [[https://validator.w3.org/nu/]] وحط الملف: صفر errors.`,
          flag: "script",
          deep: {
            why: R`HTML هو الـ API بتاع صفحتك لقارئ الشاشة ولمحركات البحث وللمتصفح نفسه. [[<div class="button">]] شكله زرار بس ميتداسش بالكيبورد، ومبيتقريش إنه زرار. [[<nav>]] بيخلي مستخدم قارئ الشاشة ينط للقايمة بزرار واحد. والـ semantic HTML ببلاش: مفيش سطر JS ولا ARIA زيادة.`,
            how: R`الترتيب: skip link، وبعدين [[header]] فيه اللوجو و [[nav]]، وبعدين [[main]]، وبعدين [[footer]]. الـ skip link مخفي لحد ما ياخد focus (هتعمله في الـ CSS) وبيودي على [[#main]].

[[aria-labelledby]] على كل [[section]] بيخليه landmark ليه اسم («region: المميزات»)، فقارئ الشاشة يقدر ينط بين الأقسام. من غير اسم، [[section]] مالوش أي معنى زيادة عن [[div]].

الصور: الـ hero ليها alt بيوصف اللي فيها لأنها بتضيف معنى. اللوجو جنبه كلمة «ذاكر»، فالـ alt بتاعه [[""]] عشان قارئ الشاشة ميقولش «ذاكر ذاكر». و [[width]] و [[height]] بيحجزوا المكان قبل ما الصورة تحمّل، فمفيش CLS (درس [[CLS]] في تاب «HTML و CSS»).

[[hreflang]] على لينكات الـ [[alternate]] بيقول لجوجل إن الصفحتين نفس المحتوى بلغتين. ولينك «English» عليه [[lang="en"]] عشان قارئ الشاشة ينطقه إنجليزي.

والسعر: [[<span dir="ltr">49 EGP</span>]] جوه جملة عربي، عشان الأرقام والعملة ميتلخبطوش في الاتجاه.`,
            when: R`دايمًا قبل الـ CSS. لو بدأت بالشكل، هتختار العناصر على حسب الشكل مش المعنى.`,
            mistakes: R`[[<div onclick>]] بدل [[<button>]] أو [[<a>]]. أو h1 لكل قسم. أو عناوين بتنط من h2 لـ h4 عشان الحجم. أو [[alt="image"]] أو alt فيه اسم الملف. أو [[<br>]] للمسافات. أو تنسى [[lang]] فالموقع كله يتقري بنطق غلط. وفي الانترفيو: «إيه الفرق بين [[section]] و [[article]] و [[div]]؟» [[article]] حاجة تتفهم لوحدها لو اتنقلت (كارت سعر)، و [[section]] جزء من الصفحة ليه عنوان، و [[div]] ملوش معنى.`
          },
          teach: R`## الفكرة: كل عنصر بيقول «أنا إيه» مش «أنا شكلي إيه»

المثال أول ٢٥ سطر في [[site/index.html]]: الـ [[head]] كله والـ [[header]]. هنفكهم سطر سطر، وبعدين نبص على باقي الصفحة في الـ solCode، ونشوف المتصفح فهمها إزاي فعلًا: شجرة الـ accessibility اللي قارئ الشاشة بيقراها، ونتيجة الـ validator. الصفحة اتفتحت في Chrome 154 من غير ولا سطر CSS ولا JS.

---

## ١. أول سطرين

~~~text
<!doctype html>
<html lang="ar" dir="rtl">
~~~

- [[<!doctype html>]]: بيقول للمتصفح «دي صفحة HTML حديثة». من غيره المتصفح بيشتغل في quirks mode، وده وضع قديم بيحسب الـ box model بطريقة مختلفة.
- [[lang="ar"]]: لغة الصفحة. قارئ الشاشة بيختار النطق منها، وجوجل بيعرف الصفحة لمين، والمتصفح بيختار الخط والـ hyphenation.
- [[dir="rtl"]]: الاتجاه من اليمين للشمال. على [[html]] نفسه، فكل الصفحة بتورثه، وكل الـ logical properties في الـ CSS بعدين هتعتمد عليه.

## ٢. الـ head

~~~text
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
~~~

- [[charset="utf-8"]]: الحروف متخزنة بـ UTF-8، فالعربي يظهر صح مش رموز غريبة. المتصفح لازم يلاقيه في أول 1024 بايت من الملف، عشان كده أول حاجة.
- [[viewport]]: من غيره الموبايل بيرسم الصفحة كأن عرضها 980px ويصغّرها. [[width=device-width]] = عرض الصفحة هو عرض الشاشة، و [[initial-scale=1]] = من غير zoom في الأول.

~~~text
  <title>ذاكر: خطة مذاكرة على قدّ وقتك</title>
  <meta name="description" content="ذاكر بيقسّم المنهج على الأيام اللي فاضلة، ويفكّرك كل يوم بالمطلوب.">
~~~

- [[title]]: اسم التابة، وأول حاجة قارئ الشاشة بيقولها، والعنوان الأزرق في جوجل.
- [[description]]: الجملة الرمادي تحت العنوان في نتيجة البحث. مش بتظهر في الصفحة نفسها. Lighthouse بيخصم من SEO لو مش موجودة.

~~~text
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
~~~

[[rel="alternate"]] = «فيه نسخة تانية من الصفحة دي»، و [[hreflang]] لغتها. السطرين دول بيتكتبوا **زي ما هم** في الصفحتين، والنسخة بتشاور على نفسها كمان. كده جوجل بيعرض العربي لللي بيدوّر بالعربي.

~~~text
  <link rel="icon" href="img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
~~~

- [[rel="icon"]]: أيقونة التابة. SVG بيفضل حاد في أي حجم.
- [[rel="stylesheet"]]: ملف الـ CSS. مسار نسبي (من غير [[/]] في الأول)، فيشتغل على GitHub Pages تحت أي مسار.

## ٣. الـ body: الـ skip link والـ header

~~~text
<body>
  <a class="skip" href="#main">اتخطى للمحتوى</a>
~~~

أول عنصر بيتداس في الصفحة كلها. [[href="#main"]] بيودّي على العنصر اللي [[id="main"]]. مستخدم الكيبورد يدوس Tab مرة و Enter، فيتخطى الـ header والقايمة. هيستخبى بالـ CSS لحد ما ياخد focus.

~~~text
  <header class="site-header">
    <a class="logo" href="./"><img src="img/logo.svg" alt="" width="32" height="32"> ذاكر</a>
~~~

- [[<header>]] أول الصفحة = landmark اسمه **banner**. قارئ الشاشة يقدر ينط له بزرار.
- اللوجو لينك للصفحة الرئيسية ([[./]] = الفولدر الحالي).
- [[alt=""]]: الصورة زينة، لأن كلمة «ذاكر» مكتوبة جنبها. alt فاضي يعني «اتجاهلها»، فاسم اللينك بيبقى «ذاكر» بس. لو كان [[alt="ذاكر"]] قارئ الشاشة كان هيقول «ذاكر ذاكر».
- [[width]] و [[height]]: المتصفح بيحجز ٣٢×٣٢ قبل ما الصورة توصل، فالكلام مبيتنقلش لما تحمّل (CLS = صفر في Lighthouse).

~~~text
    <nav aria-label="الرئيسية">
      <ul>
        <li><a href="#features">المميزات</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
      </ul>
    </nav>
  </header>
~~~

- [[<nav>]] = landmark اسمه navigation. و [[aria-label]] بيدّيله اسم، فقارئ الشاشة يقول «navigation الرئيسية»، وده بيفرق لو فيه nav تاني في الفوتر.
- [[<ul>]] و [[<li>]]: القايمة قايمة. قارئ الشاشة بيقول «list, 4 items» قبل ما يبدأ، فالمستخدم عارف الحجم.
- [[href="#features"]]: لينك لقسم في نفس الصفحة بالـ id بتاعه.
- [[hreflang="en"]]: اللينك ده رايح لصفحة إنجليزي. و [[lang="en"]]: الكلمة نفسها «English» تتنطق إنجليزي، مش بحروف عربي.

---

## ٤. باقي الصفحة (الـ solCode)

| العنصر | ليه هو بالذات |
|---|---|
| [[<main id="main">]] | المحتوى الأساسي، landmark واحد بس في الصفحة، وهدف الـ skip link |
| [[<section aria-labelledby="hero-title">]] | [[aria-labelledby]] بياخد اسم القسم من النص اللي [[id]] بتاعه [[hero-title]]، فالقسم يبقى region ليه اسم |
| [[<h1>]] واحد | عنوان الصفحة كلها، وبعده [[h2]] لكل قسم و [[h3]] جواه |
| المميزات [[<ul class="cards">]] | ٣ حاجات من نفس النوع = قايمة |
| الأسعار [[<article>]] | كل خطة حاجة كاملة لوحدها |
| [[<span dir="ltr">49 EGP</span>]] | الرقم والعملة اللاتيني ميتلخبطوش جوه جملة عربي (المحطة الرابعة) |
| [[<details><summary>]] | سؤال بيفتح ويقفل من غير ولا سطر JS، وبالكيبورد |
| [[<footer>]] | landmark اسمه contentinfo |

## ٥. المتصفح فهم إيه؟

Playwright بيطلّع شجرة الـ accessibility كـ نص بـ [[page.locator('body').ariaSnapshot()]]. ده جزء من الناتج الحقيقي للصفحة العربي:

~~~text الناتج (مختصر)
- link "اتخطى للمحتوى"
- banner:
  - link "ذاكر"
  - navigation "الرئيسية":
    - list:
      - listitem: link "المميزات" ...
- main:
  - region "خطة مذاكرة على قدّ وقتك":
    - heading "خطة مذاكرة على قدّ وقتك" [level=1]
    - link "ابدأ ببلاش"
    - img "جدول أسبوع فيه مواد متوزعة على الأيام"
  - region "بيعمل إيه":
    - heading "بيعمل إيه" [level=2]
    - list:
      - listitem:
        - heading "تقسيم أوتوماتيك" [level=3]
  - region "الأسعار":
    - article:
      - heading "مجاني" [level=3]
      - paragraph: 0 EGP
  - region "أسئلة بتتكرر":
    - group: ينفع أستخدمه من غير نت؟
- contentinfo: ...
~~~

لاحظ:

- اللوجو طلع [[link "ذاكر"]] بس، من غير صورة، بسبب [[alt=""]].
- زرار «ابدأ ببلاش ←» طلع [[link "ابدأ ببلاش"]] من غير السهم، لأن السهم عليه [[aria-hidden="true"]].
- كل [[section]] بقى [[region]] باسم عنوانه، بسبب [[aria-labelledby]].
- العناوين لوحدها (1 ثم 2 ثم 3) بتحكي الصفحة.

## ٦. الـ validator

بعتنا الملف لـ [[https://validator.w3.org/nu/]] (نسخة 26.10.7) بـ [[curl]] وطلبنا الناتج JSON:

~~~text الناتج
{"version":"26.10.7","messages":[]}
~~~

[[messages]] فاضية = صفر errors وصفر warnings، في الصفحتين. وعشان تشوف شكل الغلط، بعتناله صفحة فيها [[<p>]] جوه [[<ul>]] ولينك جوه لينك:

~~~text الناتج
error: Element “p” not allowed as child of element “ul” in this context.
error: Start tag “a” seen but an element of the same type was already open.
error: Stray end tag “a”.
~~~

---

## الخلاصة

- [[lang]] و [[dir]] على [[html]]، و [[charset]] و [[viewport]] أول حاجة في الـ head.
- landmarks: [[header]] و [[nav]] و [[main]] و [[footer]]، و [[section]] بـ [[aria-labelledby]] عشان يبقى ليه اسم.
- [[alt=""]] للصورة اللي جنبها نفس الكلام، و alt حقيقي للصورة اللي بتضيف معنى، و [[width]] و [[height]] دايمًا.
- اتأكد بعينك من شجرة الـ accessibility وبالـ validator، مش من شكل الصفحة.`,
          lines: [
            R`أول سطر: HTML5 standards mode.`,
            R`اللغة والاتجاه على الـ html، فكل الصفحة بتورثهم.`,
            R`بداية الـ head.`,
            R`الترميز. لازم يبقى في أول 1024 بايت.`,
            R`من غيره الموبايل بيعرض الصفحة كأنها ديسكتوب مصغّر (980px).`,
            R`العنوان في التابة وفي نتيجة جوجل. الاسم وبعده القيمة.`,
            R`الجملة اللي تحت العنوان في نتايج البحث.`,
            R`الصفحة دي هي النسخة العربي.`,
            R`وده رابط النسخة الإنجليزي. الاتنين لازم يبقوا في الصفحتين.`,
            R`أيقونة SVG، بتبان حادة في أي حجم.`,
            R`ملف CSS واحد للاتنين.`,
            R`نهاية الـ head.`,
            R`بداية الـ body.`,
            R`أول حاجة بيوصلها الـ Tab: لينك يودي على المحتوى على طول.`,
            R`الـ header: landmark اسمه banner.`,
            R`اللوجو: الصورة [[alt=""]] لأن الاسم مكتوب جنبها، وليها أبعاد.`,
            R`[[nav]] باسم، عشان لو فيه أكتر من nav يتفرقوا.`,
            R`القايمة قايمة فعلًا، فقارئ الشاشة بيقول «list, 4 items».`,
            R`لينك لقسم في نفس الصفحة.`,
            R`لينك تاني.`,
            R`لينك تالت.`,
            R`لينك اللغة التانية: [[hreflang]] للمتصفح، و [[lang]] عشان يتنطق صح.`,
            R`نهاية القايمة.`,
            R`نهاية الـ nav.`,
            R`نهاية الـ header.`
          ],
          sol: R`الصفحة من غير CSS لازم تتقري كده: لينك «اتخطى للمحتوى»، واللوجو، وقايمة فيها ٤ لينكات، وبعدين h1 «خطة مذاكرة على قدّ وقتك»، وتحته h2 لكل قسم: «بيعمل إيه» فيها h3 لكل ميزة، و «الأسعار» فيها h3 لكل خطة، و «أسئلة بتتكرر»، و «جرّبه أسبوع ببلاش». قايمة العناوين لوحدها بتحكي الصفحة.

الـ validator لازم يطلّع [[Document checking completed. No errors or warnings to show.]]. أشهر errors: [[<a>]] جوه [[<a>]]، أو [[<ul>]] جواه حاجة غير [[<li>]]، أو [[id]] متكرر.

الغلط الشائع إنك تعمل الكروت [[<div>]]. في الحل، المميزات [[<ul>]] لأنها قايمة (قارئ الشاشة بيقول «list, 3 items»)، والأسعار [[<article>]] لأن كل خطة حاجة مستقلة.`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ذاكر: خطة مذاكرة على قدّ وقتك</title>
  <meta name="description" content="ذاكر بيقسّم المنهج على الأيام اللي فاضلة، ويفكّرك كل يوم بالمطلوب.">
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
  <link rel="icon" href="img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip" href="#main">اتخطى للمحتوى</a>
  <header class="site-header">
    <a class="logo" href="./"><img src="img/logo.svg" alt="" width="32" height="32"> ذاكر</a>
    <nav aria-label="الرئيسية">
      <ul>
        <li><a href="#features">المميزات</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
        <li><a href="en/" hreflang="en" lang="en">English</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">خطة مذاكرة على قدّ وقتك</h1>
        <p>قول لذاكر ميعاد الامتحان والمنهج، وهو يقسّمه على الأيام اللي فاضلة ويفكّرك كل يوم.</p>
        <a class="btn" href="#pricing">ابدأ ببلاش <span class="arrow" aria-hidden="true">←</span></a>
      </div>
      <img src="img/hero.svg" alt="جدول أسبوع فيه مواد متوزعة على الأيام" width="480" height="360">
    </section>

    <section id="features" aria-labelledby="features-title">
      <h2 id="features-title">بيعمل إيه</h2>
      <ul class="cards">
        <li class="card"><h3>تقسيم أوتوماتيك</h3><p>المنهج بيتوزع على الأيام حسب صعوبة كل جزء.</p></li>
        <li class="card"><h3>تذكير يومي</h3><p>إشعار الصبح بمهام النهارده بس، مش المنهج كله.</p></li>
        <li class="card"><h3>لو اتأخرت</h3><p>الخطة بتتعدل لوحدها من غير ما تبدأ من الأول.</p></li>
      </ul>
    </section>

    <section id="pricing" aria-labelledby="pricing-title">
      <h2 id="pricing-title">الأسعار</h2>
      <div class="cards">
        <article class="card">
          <h3>مجاني</h3>
          <p class="price"><span dir="ltr">0 EGP</span></p>
          <ul><li>مادة واحدة</li><li>تذكير يومي</li></ul>
          <a class="btn btn-outline" href="#signup">ابدأ</a>
        </article>
        <article class="card featured">
          <h3>برو</h3>
          <p class="price"><span dir="ltr">49 EGP</span> / الشهر</p>
          <ul><li>مواد من غير حد</li><li>تعديل الخطة لو اتأخرت</li></ul>
          <a class="btn" href="#signup">اشترك</a>
        </article>
      </div>
    </section>

    <section id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">أسئلة بتتكرر</h2>
      <details><summary>ينفع أستخدمه من غير نت؟</summary><p>أيوه، الخطة بتتحفظ على الموبايل.</p></details>
      <details><summary>ينفع ألغي الاشتراك؟</summary><p>في أي وقت، من الإعدادات، من غير أسئلة.</p></details>
    </section>

    <section id="signup" class="cta" aria-labelledby="signup-title">
      <h2 id="signup-title">جرّبه أسبوع ببلاش</h2>
      <a class="btn" href="https://app.zaker.example/signup">اعمل حساب</a>
    </section>
  </main>

  <footer class="site-footer">
    <p>© 2026 ذاكر · <a href="mailto:hi@zaker.example">hi@zaker.example</a></p>
  </footer>
</body>
</html>`
        },
        {
          cmd: "مشروع ١: الـ layout الـ responsive",
          title: "تعمل layout يمشي من 320px لـ 1440px إزاي؟",
          desc: R`اكتب [[site/styles.css]] mobile-first: الـ CSS الأساسي للموبايل، و [[@media (min-width: ...)]] بتضيف للشاشات الكبيرة. وخلي الـ grid هو اللي يقرر عدد الأعمدة بدل ما تكتب breakpoint لكل عدد.

خلصت يعني: (١) من 320px لحد 1440px مفيش scroll بالعرض ومفيش نص بيتقطع. (٢) الكروت عمود واحد على الموبايل، وبتبقى ٢ و ٣ لوحدها مع العرض. (٣) الـ hero عمودين من 48rem وطالع. (٤) الألوان والمسافات كلها CSS variables، وفيه وضع غامق بـ [[prefers-color-scheme]]. (٥) كل حاجة بتتداس ٤٤px على الأقل، والـ focus باين. (٦) مفيش [[left]] ولا [[right]] ولا [[margin-left]] في الملف كله (دي للمحطة الجاية).

الدروس: [[box model]] و [[rem و em]] و [[clamp()]] و [[CSS variables]] و [[grid]] و [[auto-fit و minmax]] و [[media queries]] و [[dark mode]] و [[logical properties]] في تاب «HTML و CSS».`,
          example: R`main > section { padding: var(--space); max-width: 70rem; margin-inline: auto; }
.hero { display: grid; gap: var(--space); align-items: center; }
.hero p { color: var(--muted); font-size: 1.15rem; max-width: 40ch; }
@media (min-width: 48rem) { .hero { grid-template-columns: 1.1fr 1fr; min-height: 70dvh; } }

.btn { display: inline-flex; gap: 0.5rem; align-items: center; min-height: 44px; padding: 0.6rem 1.4rem; border-radius: var(--radius); background: var(--brand); color: var(--brand-text); font-weight: 700; text-decoration: none; border: 2px solid var(--brand); }
.btn-outline { background: transparent; color: var(--brand); }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }

.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); list-style: none; padding: 0; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.card h3 { margin-block-start: 0; }
.card ul { padding-inline-start: 1.25rem; }`,
          try: R`اكتب الـ CSS كله. افتح الصفحة في Device Toolbar واسحب العرض ببطء من 320px لـ 1440px: أي لحظة يظهر فيها scroll بالعرض أو حاجة تتداخل، صلّحها. بعدين غيّر الـ OS للوضع الغامق (أو في DevTools: Rendering، Emulate CSS prefers-color-scheme) واتأكد إن كل حاجة مقروءة. وفي الآخر [[grep -nE "left|right" site/styles.css]] لازم ميطلعش حاجة.`,
          flag: "script",
          deep: {
            why: R`أغلب زوار أي landing page في مصر جايين من موبايل، وأول ما الصفحة تعمل scroll بالعرض أو زرار ييجي تحت زرار، الزائر بيقفل. و mobile-first بيخلي الـ CSS أبسط: الموبايل غالبًا عمود واحد من غير أي layout، والشاشات الكبيرة هي اللي بتضيف.`,
            how: R`[[repeat(auto-fit, minmax(min(100%, 16rem), 1fr))]] هو أهم سطر في الملف: «حط أعمدة كتير على قد ما يكفي، كل عمود ١٦rem على الأقل، والباقي يتوزع». على 320px عمود واحد، وعلى 600px عمودين، وعلى 900px تلاتة، من غير ولا media query. و [[min(100%, 16rem)]] بيمنع العمود يبقى أعرض من الشاشة لو الشاشة أصغر من ١٦rem.

[[clamp(1.9rem, 5vw + 0.5rem, 3.2rem)]] للعنوان: بيكبر مع الشاشة، بس مبيقلش عن الأول ولا يزيد عن التالت. و [[+ 0.5rem]] بيخلي الـ zoom يشتغل (لو الحجم [[vw]] بس، الـ zoom مش هيكبّره).

المتغيرات في [[:root]] والوضع الغامق بيغيّر قيمها بس. و [[color-scheme: light dark]] بيخلي المتصفح يغيّر ألوان الـ scrollbar والـ form controls كمان.

[[min-height: 70dvh]] للـ hero على الشاشات الكبيرة بس: [[dvh]] بيحسب الارتفاع المتاح فعلًا على الموبايل مع شريط العنوان (درس [[dvh]]).

والـ [[:focus-visible]] بـ outline بلون الـ brand: بيظهر مع الكيبورد بس مش مع الماوس، وفي الوضعين الفاتح والغامق لأنه بيستخدم المتغير.`,
            when: R`بعد ما الـ HTML يخلص. ولو لقيت نفسك بتكتب أكتر من ٣ media queries في صفحة زي دي، غالبًا الـ grid يقدر يعمل الشغل لوحده.`,
            mistakes: R`[[width: 1200px]] على container، فالموبايل يعمل scroll. أو [[height]] ثابت على كارت فالنص يخرج برّه لما يتقلب لعربي أو يكبر. أو ألوان مكتوبة في ٢٠ مكان بدل متغيرات، فالوضع الغامق يبقى مستحيل. أو [[outline: none]] من غير بديل. أو تجرّب على 375px بس (iPhone) وتنسى 320px. وفي الانترفيو: «mobile-first ولا desktop-first؟» mobile-first، لأن الموبايل هو الحالة الأبسط، و [[min-width]] بيضيف بدل ما [[max-width]] يلغي.`
          },
          teach: R`## الفكرة: الموبايل هو الأساس، والشاشة الكبيرة بتضيف

المثال ١٢ سطر من [[site/styles.css]]: الأقسام، والـ hero، والزراير، والكروت. هنفكهم سطر سطر، وبعدين نقيس الصفحة الحقيقية على ٦ عروض من 320px لـ 1440px ونشوف الأرقام اتحسبت إزاي. القياس اتعمل بـ Playwright و Chrome 154 على الحل المرجعي كامل، بـ [[getComputedStyle]] (القيمة اللي المتصفح حسبها فعلًا).

---

## ١. المتغيرات الأول (من الـ solCode)

المثال بيستخدم [[var(--space)]] و [[var(--brand)]]، ودول متعرّفين فوق في [[:root]]:

~~~text styles.css
:root {
  --brand: #0b6e4f;
  --brand-text: #ffffff;
  --radius: 12px;
  --space: clamp(1rem, 3vw, 2rem);
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #11161c; --text: #eef1f4; --brand: #4cc79a; --brand-text: #0b1a14; ... }
}
~~~

- [[:root]] هو [[html]]، فأي متغير عليه موجود في الصفحة كلها.
- [[--brand]]: أي اسم بيبدأ بشرطتين متغير. وبتقراه بـ [[var(--brand)]].
- الوضع الغامق مبيغيّرش ولا قاعدة، بيغيّر **قيم** المتغيرات بس. لما شغّلنا الصفحة بـ [[colorScheme: 'dark']]، المتغيرات بقت: [[--bg=#11161c --brand=#4cc79a --brand-text=#0b1a14]].

والتباين (contrast ratio) اتحسب بمعادلة WCAG، والحد لـ AA في النص العادي 4.5:

| اللون | على | النسبة |
|---|---|---|
| [[--brand]] الفاتح #0b6e4f | الخلفية #fffdf8 | 6.15 |
| أبيض | زرار #0b6e4f | 6.25 |
| [[--brand]] الغامق #4cc79a | الخلفية #11161c | 8.61 |
| #0b6e4f لو فضل زي ما هو في الغامق | #11161c | **2.91** ✗ |

السطر الأخير هو ليه الوضع الغامق لازم يغيّر لون الـ brand نفسه، مش الخلفية بس.

## ٢. الأقسام

~~~text
main > section { padding: var(--space); max-width: 70rem; margin-inline: auto; }
~~~

- [[main > section]]: أي [[section]] ابن مباشر لـ [[main]] ([[>]] = ابن مباشر، مش حفيد).
- [[padding: var(--space)]]: والـ [[--space]] نفسه [[clamp(1rem, 3vw, 2rem)]]: ٣٪ من عرض الشاشة، بس مش أقل من 16px ولا أكتر من 32px.
- [[max-width: 70rem]]: 70 × 16 = 1120px أقصى عرض، عشان السطور متبقاش طويلة أوي على شاشة كبيرة.
- [[margin-inline: auto]]: المسافة يمين وشمال أوتوماتيك = القسم في النص. [[inline]] = اتجاه السطر، فبيشتغل في العربي والإنجليزي.

## ٣. الـ hero

~~~text
.hero { display: grid; gap: var(--space); align-items: center; }
.hero p { color: var(--muted); font-size: 1.15rem; max-width: 40ch; }
@media (min-width: 48rem) { .hero { grid-template-columns: 1.1fr 1fr; min-height: 70dvh; } }
~~~

- [[display: grid]] من غير [[grid-template-columns]] = عمود واحد. الكلام فوق والصورة تحته. ده الموبايل.
- [[max-width: 40ch]]: [[ch]] = عرض حرف «0» في الخط، فالسطر حوالي ٤٠ حرف، أريح للقراية.
- [[@media (min-width: 48rem)]]: لو الشاشة 48rem (768px) **أو أكتر**، زوّد القواعد دي. ده معنى mobile-first: الشاشة الكبيرة بتضيف.
- [[1.1fr 1fr]]: عمودين، [[fr]] = جزء من المساحة الفاضية. الكلام ١.١ جزء والصورة جزء.
- [[min-height: 70dvh]]: ٧٠٪ من ارتفاع الشاشة المتاح فعلًا ([[dvh]] = dynamic viewport height، بيطرح شريط العنوان في الموبايل).

القياس الحقيقي على ارتفاع 800px:

~~~text grid-template-columns للـ hero
عرض 600px  →  564px                 (عمود واحد)
عرض 768px  →  366.094px 332.812px   (عمودين، min-height 560px)
عرض 1440px →  536.375px 487.625px
~~~

[[560px]] = ٧٠٪ من 800. و 366 ÷ 333 ≈ 1.1، بالظبط النسبة اللي كتبناها.

## ٤. الزرار

~~~text
.btn { display: inline-flex; gap: 0.5rem; align-items: center; min-height: 44px; padding: 0.6rem 1.4rem; border-radius: var(--radius); background: var(--brand); color: var(--brand-text); font-weight: 700; text-decoration: none; border: 2px solid var(--brand); }
.btn-outline { background: transparent; color: var(--brand); }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }
~~~

- [[inline-flex]]: الزرار في السطر زي الكلام، بس جواه flex: [[gap]] بين الكلمة والسهم، و [[align-items: center]] يحطهم على نفس الخط.
- [[min-height: 44px]]: أقل حجم مريح للصباع.
- [[border: 2px solid var(--brand)]] على الزرار المليان كمان: عشان النسخة المفرّغة ([[.btn-outline]]) تبقى بنفس الحجم بالظبط. هي بس بتشيل الخلفية وتغيّر لون الكلام.
- سطر السهم: شرحه في المحطة الجاية.

## ٥. الكروت: أهم سطر

~~~text
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); list-style: none; padding: 0; }
~~~

نفكه من جوه لبرة:

1. [[min(100%, 16rem)]]: الأصغر من عرض الحاوية و 256px. على شاشة 240px مثلًا بيبقى 240، فالعمود ميطلعش برّه.
2. [[minmax(X, 1fr)]]: العمود عرضه X على الأقل، وممكن يكبر لحد جزء متساوي من الفاضي.
3. [[repeat(auto-fit, ...)]]: كرّر العمود ده **على قد ما يكفي** في العرض.
4. [[list-style: none; padding: 0]]: المميزات [[<ul>]]، فشيل النقط والمسافة اللي قبلها. القايمة لسه قايمة لقارئ الشاشة.

النتيجة الحقيقية لقسم المميزات:

~~~text grid-template-columns للكروت
320px  →  288px                          عمود
375px  →  343px                          عمود
600px  →  274px 274px                    عمودين
768px  →  352.969px 352.969px            عمودين
900px  →  271.328px 271.328px 271.344px  تلاتة
1440px →  341.328px 341.328px 341.344px  تلاتة (الحاوية وقفت عند 1120px)
~~~

ليه 600px عمودين؟ العرض المتاح 600 − ١٨ × ٢ padding = 564. عمودين 256 + 16 gap + 256 = 528 بيكفّوا. تلاتة محتاجين 800 مش هيكفّوا. كل ده من غير ولا media query.

## ٦. باقي الكارت

~~~text
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.card h3 { margin-block-start: 0; }
.card ul { padding-inline-start: 1.25rem; }
~~~

- [[margin-block-start]] = [[margin-top]] بس logical: [[block]] = الاتجاه اللي السطور بتنزل فيه (لتحت).
- [[padding-inline-start]]: المسافة في **بداية** السطر. اتقاس: في العربي [[paddingRight: 20px]] و [[paddingLeft: 0px]]، وفي الإنجليزي العكس. نفس السطر.

## ٧. العنوان بـ [[clamp]]

~~~text
h1 { font-size: clamp(1.9rem, 5vw + 0.5rem, 3.2rem); }
~~~

[[clamp(أقل, المفضّل, أكتر)]]. المفضّل [[5vw + 0.5rem]]: ٥٪ من عرض الشاشة + 8px. القياس:

| العرض | 5vw + 8px | الناتج | ليه |
|---|---|---|---|
| 320 | 24px | 30.4px | أقل من الحد الأدنى 1.9rem، فاتثبت عليه |
| 600 | 38px | 38px | بين الحدين |
| 768 | 46.4px | 46.4px | بين الحدين |
| 900 | 53px | 51.2px | أكتر من 3.2rem، فاتثبت عليه |

و [[+ 0.5rem]] مش ديكور: لو المستخدم كبّر الخط في إعدادات المتصفح، [[rem]] بيكبر معاه، و [[vw]] لوحده لأ.

## ٨. التأكد

~~~bash
grep -nE "left|right" site/styles.css
~~~

~~~text الناتج
(مفيش ناتج، و exit code 1 يعني «ملقاش»)
~~~

و [[scrollWidth - clientWidth]] طلع **0** على الستة عروض كلهم.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[:root { --x: ... }]] | الألوان والمسافات في مكان واحد، والغامق بيغيّر القيم بس |
| [[@media (min-width: 48rem)]] | الشاشة الكبيرة بتضيف عمود للـ hero |
| [[repeat(auto-fit, minmax(min(100%, 16rem), 1fr))]] | عدد الأعمدة بيتحسب لوحده: ١ ثم ٢ ثم ٣ |
| [[clamp(1.9rem, 5vw + 0.5rem, 3.2rem)]] | العنوان بيكبر مع الشاشة بين حدين |
| [[margin-inline]] و [[padding-inline-start]] | يمين وشمال من غير ما تكتب يمين وشمال |
| [[min-height: 44px]] | كل حاجة بتتداس كبيرة كفاية للصباع |`,
          lines: [
            R`كل قسم في الـ main: مسافة من متغير، وأقصى عرض، ومتوسّط بـ [[margin-inline: auto]].`,
            R`الـ hero grid، على الموبايل عمود واحد لأن مفيش [[grid-template-columns]].`,
            R`الجملة تحت العنوان: لون أهدى، وسطرها مش أطول من ٤٠ حرف عشان يتقري.`,
            R`من 48rem (768px) وطالع: عمودين، الكلام أعرض شوية من الصورة، وارتفاع ٧٠٪ من الشاشة.`,
            R`الزرار: ٤٤px على الأقل، ولونه من المتغيرات، وليه border عشان الـ outline style يبقى بنفس الحجم.`,
            R`النسخة المفرّغة من الزرار.`,
            R`السهم بيتقلب في الإنجليزي بس. شرحه في المحطة الجاية.`,
            R`أهم سطر: عدد الأعمدة بيتحسب لوحده من العرض. و [[list-style: none]] لأن المميزات [[<ul>]].`,
            R`شكل الكارت.`,
            R`[[margin-block-start]] بدل [[margin-top]]: logical property.`,
            R`المسافة قبل النقط في القايمة، في بداية السطر في الاتجاهين.`
          ],
          sol: R`الـ CSS كامل تحت (حوالي ٥٠ سطر). اتقاس بـ Playwright على Pixel 7 و Desktop Chrome: [[scrollWidth - clientWidth]] = 0 في اللغتين، و axe (قاعدة [[color-contrast]]) نضيف في الفاتح والغامق.

لو [[grep]] طلّع حاجة، غالبًا [[text-align: left]] (خليها [[start]]) أو [[padding-left]] على قايمة (خليها [[padding-inline-start]]) أو [[left]] على الـ skip link (خليها [[inset-inline-start]]).

لو فيه scroll بالعرض ومش عارف مين السبب، في Console: [[[...document.querySelectorAll('*')].filter(e => e.scrollWidth > document.documentElement.clientWidth)]]. أشهر المتهمين: صورة من غير [[max-width: 100%]]، أو لينك طويل من غير مسافات، أو عنصر [[width]] ثابت.

ولو التباين في الوضع الغامق وقع، غالبًا لون الـ brand الغامق (#0b6e4f) فضل زي ما هو على خلفية غامقة. في الحل، الوضع الغامق بيغيّره لـ #4cc79a، ولون الكلام على الزرار بيبقى غامق.`,
          solCode: R`:root {
  --bg: #fffdf8;
  --text: #1d232b;
  --muted: #4a5563;
  --brand: #0b6e4f;
  --brand-text: #ffffff;
  --card: #ffffff;
  --border: #d9dde3;
  --radius: 12px;
  --space: clamp(1rem, 3vw, 2rem);
  font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #11161c; --text: #eef1f4; --muted: #b8c0ca; --brand: #4cc79a; --brand-text: #0b1a14; --card: #19212a; --border: #2c3845; }
}
:lang(en) { font-family: system-ui, "Segoe UI", Roboto, sans-serif; }

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); line-height: 1.7; }
img { max-width: 100%; height: auto; }
h1, h2, h3 { line-height: 1.25; text-wrap: balance; }
h1 { font-size: clamp(1.9rem, 5vw + 0.5rem, 3.2rem); margin-block: 0 1rem; }
h2 { font-size: clamp(1.5rem, 3vw + 0.5rem, 2.2rem); }
a { color: var(--brand); }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }

.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; background: var(--brand); color: var(--brand-text); padding: 0.5rem 1rem; border-radius: var(--radius); }
.skip:focus { top: 1rem; }

.site-header { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; align-items: center; justify-content: space-between; padding: 1rem var(--space); border-block-end: 1px solid var(--border); }
.logo { display: inline-flex; gap: 0.5rem; align-items: center; font-weight: 700; font-size: 1.25rem; color: var(--text); text-decoration: none; }
.site-header ul { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; list-style: none; margin: 0; padding: 0; }
.site-header nav a { display: inline-block; padding: 0.5rem 0.25rem; min-height: 44px; }

main > section { padding: var(--space); max-width: 70rem; margin-inline: auto; }
.hero { display: grid; gap: var(--space); align-items: center; }
.hero p { color: var(--muted); font-size: 1.15rem; max-width: 40ch; }
@media (min-width: 48rem) { .hero { grid-template-columns: 1.1fr 1fr; min-height: 70dvh; } }

.btn { display: inline-flex; gap: 0.5rem; align-items: center; min-height: 44px; padding: 0.6rem 1.4rem; border-radius: var(--radius); background: var(--brand); color: var(--brand-text); font-weight: 700; text-decoration: none; border: 2px solid var(--brand); }
.btn-outline { background: transparent; color: var(--brand); }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }

.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); list-style: none; padding: 0; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.card h3 { margin-block-start: 0; }
.card ul { padding-inline-start: 1.25rem; }
.featured { border: 2px solid var(--brand); }
.price { font-size: 1.5rem; font-weight: 700; }

details { border-block-end: 1px solid var(--border); padding-block: 0.75rem; }
summary { cursor: pointer; font-weight: 700; min-height: 44px; }
.cta { text-align: center; }
.site-footer { padding: var(--space); text-align: center; color: var(--muted); border-block-start: 1px solid var(--border); }

@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`
        },
        {
          cmd: "مشروع ١: الإنجليزي و RTL",
          title: "نفس الـ CSS يشتغل عربي وإنجليزي إزاي؟",
          desc: R`اعمل [[site/en/index.html]]: نفس الهيكل بالظبط، بس [[lang="en" dir="ltr"]] والمحتوى إنجليزي، والمسارات بتبدأ بـ [[../]]. والـ CSS متعدلش فيه غير سطر واحد: السهم.

خلصت يعني: (١) لينك اللغة التانية في الصفحتين بيودي على نفس المكان. (٢) الإنجليزي كله محاذي شمال والعربي يمين، من غير ولا [[if]] في الـ CSS. (٣) الأسهم والأيقونات اللي ليها اتجاه بتتقلب، والباقي (اللوجو، والصور) لأ. (٤) الأرقام والعملة في النص العربي مش متلخبطة. (٥) الخط مناسب لكل لغة.

الدروس: [[lang و dir]] و [[logical properties]] في تاب «HTML و CSS»، ودرس [[i18n و RTL]] في تاب «بناء مشروع كامل» (للمشاريع الأكبر).`,
          example: R`<html lang="en" dir="ltr">
<link rel="stylesheet" href="../styles.css">
<li><a href="../" hreflang="ar" lang="ar">العربية</a></li>
<a class="btn" href="#pricing">Start free <span class="arrow" aria-hidden="true">←</span></a>
<p class="price"><span dir="ltr">49 EGP</span> / الشهر</p>
.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; }
.card ul { padding-inline-start: 1.25rem; }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }
:lang(en) { font-family: system-ui, "Segoe UI", Roboto, sans-serif; }`,
          try: R`اعمل الصفحة الإنجليزي، وافتح الاتنين جنب بعض. دوّر على أي حاجة الاتجاه بتاعها غلط: السهم في الزرار، والنقط في القوايم، ومكان الـ skip link لما ياخد focus. وبعدين اكتب في الصفحة العربي جملة فيها رقم تليفون وسعر بالإنجليزي، وشوف بتتعرض إزاي من غير [[dir="ltr"]] ومعاه.`,
          flag: "script",
          deep: {
            why: R`لو المشروع هيتباع لعميل في المنطقة، هيطلب عربي وإنجليزي في أغلب الحالات. والفرق بين موقع معمول صح وموقع «متقلب» بيبان من أول نظرة: أيقونات في الناحية الغلط، ومسافات لازقة في الحافة الغلط. و logical properties بتخلي التكلفة تقريبًا صفر لو بدأت بيها.`,
            how: R`[[inline-start]] معناها «بداية السطر»: يمين في العربي وشمال في الإنجليزي. [[margin-inline-start]] و [[padding-inline-start]] و [[inset-inline-start]] و [[border-block-end]]، كلهم بيتقلبوا لوحدهم حسب [[dir]] على الـ html. والـ flex والـ grid أصلًا بيمشوا مع الاتجاه.

الحاجة الوحيدة اللي مبتتقلبش لوحدها: الأيقونات اللي ليها اتجاه. السهم [[←]] في العربي معناه «لقدّام»، وفي الإنجليزي لازم يبقى [[→]]. [[scaleX(-1)]] على [[[dir="ltr"]]] بيقلبه. وعليه [[aria-hidden="true"]] لأنه زينة، والزرار اسمه من الكلام.

الأرقام: خوارزمية الـ bidi في المتصفح بتحاول تفهم الاتجاه، بس مع أرقام وعملة لاتيني جوه جملة عربي ممكن ترتيبهم يتلخبط. [[<span dir="ltr">]] حوالين الحتة دي بيحل المشكلة. وفي الحقول (تليفون أو إيميل) [[dir="ltr"]] على الـ input نفسه.

الخط: [[:lang(en)]] بيدّي الإنجليزي خط تاني. والعربي محتاج خط بيدعمه كويس. [[system-ui]] كفاية هنا، ولو هتستخدم خط من برّه شوف درس [[next/font]] أو [[font-display: swap]].`,
            when: R`من أول سطر CSS في أي مشروع ممكن يبقى بلغتين، حتى لو اللغة التانية جاية بعدين.`,
            mistakes: R`ملفين CSS، واحد لكل اتجاه، ويختلفوا مع الوقت. أو [[direction: rtl]] في CSS بدل [[dir]] في HTML (الـ CSS بيغيّر الشكل بس، مش المعنى، وقارئ الشاشة مبيعرفش). أو تقلب كل الأيقونات، بما فيها اللوجو وعلامة ✓. أو [[text-align: right]] على العربي. أو تنسى [[lang]] على لينك «English» فقارئ الشاشة العربي ينطقه «إنجليش» بحروف عربي.`
          },
          teach: R`## الفكرة: الاتجاه بيتكتب مرة واحدة في HTML، والـ CSS بيمشي وراه

المثال ٩ سطور: ٥ HTML من الصفحتين، و ٤ CSS. مفيش ولا سطر فيهم بيقول «لو عربي اعمل كذا» غير سطر السهم. هنفكهم، وبعدين نقيس الصفحتين في Chrome 154 (بـ Playwright على عرض 375px) ونشوف نفس الـ CSS طلّع إيه في كل اتجاه. وفي الآخر تجربة الأرقام جوه جملة عربي، بصورة حقيقية من المتصفح.

---

## ١. سطور الـ HTML

~~~text
<html lang="en" dir="ltr">
~~~

الصفحة الإنجليزي: لغة [[en]] واتجاه شمال ليمين. ده **السطر الوحيد** اللي بيقلب الصفحة كلها.

~~~text
<link rel="stylesheet" href="../styles.css">
~~~

نفس ملف الـ CSS. [[../]] = «اطلع فولدر لفوق»، لأن الصفحة في [[site/en/]] والملف في [[site/]]. ونفس الكلام لكل الصور: [[../img/logo.svg]].

~~~text
<li><a href="../" hreflang="ar" lang="ar">العربية</a></li>
~~~

لينك الرجوع: [[../]] بيودّي على [[site/index.html]]. و [[lang="ar"]] عشان قارئ الشاشة الإنجليزي ينطق «العربية» عربي.

~~~text
<a class="btn" href="#pricing">Start free <span class="arrow" aria-hidden="true">←</span></a>
~~~

نفس الحرف [[←]] في الصفحتين. في العربي السهم اللي على الشمال معناه «لقدّام». الـ CSS هو اللي هيقلبه في الإنجليزي. و [[aria-hidden="true"]] بيشيله من قارئ الشاشة، فاسم اللينك «Start free» بس.

~~~text
<p class="price"><span dir="ltr">49 EGP</span> / الشهر</p>
~~~

ده من الصفحة العربي: الحتة اللاتيني محبوسة في [[dir="ltr"]]. شرحها في الجزء ٤.

## ٢. سطور الـ CSS

~~~text
.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; }
.card ul { padding-inline-start: 1.25rem; }
[dir="ltr"] .arrow { display: inline-block; transform: scaleX(-1); }
:lang(en) { font-family: system-ui, "Segoe UI", Roboto, sans-serif; }
~~~

- [[inset-inline-start: 1rem]]: ١٦px من **بداية** السطر. [[inset]] = left/right/top/bottom مع بعض، و [[inline-start]] = يمين في RTL وشمال في LTR. و [[top: -4rem]] بيخفيه فوق الشاشة لحد ما ياخد focus.
- [[padding-inline-start]]: المسافة قبل نقط القايمة، في بداية السطر.
- [[[dir="ltr"] .arrow]]: [[[dir="ltr"]]] selector بيطابق أي عنصر عليه الـ attribute ده، يعني الـ [[html]] في الصفحة الإنجليزي، والمسافة بعده = أي [[.arrow]] جواه. و [[scaleX(-1)]] = اعكس العرض، يعني مراية. و [[inline-block]] لازم، لأن [[transform]] مبيشتغلش على [[span]] عادي (inline).
- [[:lang(en)]]: أي عنصر لغته إنجليزي، سواء الصفحة كلها أو لينك «English» جوه الصفحة العربي. بيدّيله Roboto بدل Tahoma.

## ٣. القياس: نفس الـ CSS، اتجاهين

دوسنا Tab مرة (فالـ skip link ظهر)، وقسنا:

| القياس | العربي [[/]] | الإنجليزي [[/en/]] |
|---|---|---|
| [[direction]] المحسوب | rtl | ltr |
| الـ skip link: المسافة من اليمين | 16px | 220px |
| الـ skip link: المسافة من الشمال | 222px | 16px |
| [[padding]] قايمة الكارت يمين / شمال | 20px / 0 | 0 / 20px |
| [[transform]] السهم | none | matrix(-1, 0, 0, 1, 0, 0) |
| [[font-family]] | system-ui, "Segoe UI", Tahoma, sans-serif | system-ui, "Segoe UI", Roboto, sans-serif |
| [[text-align]] الكلام | start | start |

- 16px = 1rem: نفس الرقم، بس من ناحية مختلفة.
- [[matrix(-1, 0, 0, 1, 0, 0)]]: ده [[scaleX(-1)]] بعد ما المتصفح حسبه. أول رقم -1 = العرض معكوس، و 1 التاني = الطول زي ما هو.
- [[text-align: start]] مكتوب مرة، وبيبقى يمين أو شمال حسب [[dir]].

وتبديل اللغة اتجرّب في اختبار Playwright بتاع المحطة الجاية: «English» → [[dir="ltr"]]، و «العربية» → [[lang="ar"]].

## ٤. الأرقام جوه جملة عربي

المتصفح بيرتّب الحروف بخوارزمية اسمها bidi (Unicode Bidirectional Algorithm): الحروف العربي يمين لشمال، واللاتيني شمال ليمين. بس **الأرقام والمسافات والرموز** ملهاش اتجاه قوي، فبتاخد اتجاه اللي حواليها، وهنا بيحصل اللخبطة. حطينا الجمل دي في صفحة RTL وصوّرناها في Chrome:

| اللي في الكود | اللي ظهر على الشاشة |
|---|---|
| [[السعر: 49 EGP / الشهر]] | الحتة اللاتيني ظهرت [[EGP 49]] لو قريتها من الشمال لليمين: العملة قبل الرقم ✗ |
| [[السعر: <span dir="ltr">49 EGP</span> / الشهر]] | [[49 EGP]] ✓ |
| [[اتصل على 0100 123 4567 أو ادفع 49 EGP.]] | رقم التليفون ظهر [[4567 123 0100]] ✗، والسعر [[EGP 49]] ✗ |
| [[اتصل على <span dir="ltr">0100 123 4567</span> أو ...]] | [[0100 123 4567]] ✓ |

اقرا السطر التالت: مجموعات رقم التليفون (0100 و 123 و 4567) كل واحدة سليمة، بس **ترتيبهم** اتعكس، لأن المسافات بينهم أخدت اتجاه الجملة العربي. اللي هيقرا الرقم ده هيتصل بحد تاني. [[<span dir="ltr">]] بيقول للخوارزمية «الحتة دي كلها كتلة واحدة شمال ليمين».

> في الحقول (input) نفس الكلام: [[dir="ltr"]] على حقل الموبايل والإيميل (هتشوفه في مشروع ٣).

---

## الخلاصة

| الحاجة | بتتعمل إزاي |
|---|---|
| اتجاه الصفحة | [[dir]] على [[html]]، مرة واحدة |
| المسافات والمواضع | [[inline-start]] و [[inline-end]] و [[block-start]]، مش left و right و top |
| الأيقونات اللي ليها اتجاه | [[[dir="ltr"] .arrow { transform: scaleX(-1) }]] |
| خط مختلف للغة | [[:lang(en)]] |
| أرقام وعملة وتليفونات جوه عربي | [[<span dir="ltr">]] |
| المسارات في [[en/]] | [[../]] قبل الـ CSS والصور |`,
          lines: [
            R`الصفحة الإنجليزي: نفس الهيكل بلغة واتجاه تانيين.`,
            R`نفس ملف الـ CSS. [[../]] لأن الصفحة في فولدر [[en/]].`,
            R`لينك الرجوع للعربي، و [[lang="ar"]] عشان يتنطق عربي.`,
            R`نفس السهم [[←]] في الملفين، والـ CSS هو اللي بيقلبه.`,
            R`في العربي: العملة والرقم جوه [[dir="ltr"]] عشان ميتلخبطوش.`,
            R`الـ skip link بيبدأ من بداية السطر: يمين في العربي وشمال في الإنجليزي.`,
            R`المسافة قبل النقط في القايمة بتتقلب لوحدها.`,
            R`السطر الوحيد اللي بيعرف الاتجاه: يقلب السهم في الإنجليزي بس.`,
            R`خط مختلف لأي حاجة إنجليزي، في الصفحتين.`
          ],
          sol: R`لو كل حاجة logical من المحطة اللي فاتت، الصفحة الإنجليزي بتشتغل من غير ما تلمس الـ CSS غير سطر السهم. اتجرّبت بـ Playwright: الانتقال من «English» بيخلي [[dir="ltr"]]، ومن «العربية» بيرجّع [[lang="ar"]]، و axe نضيف في الاتنين.

جملة فيها [[اتصل على 0100 123 4567 أو ادفع 49 EGP]] من غير [[dir="ltr"]]: غالبًا هتلاقي «EGP» جت قبل الرقم أو المسافات اتنقلت. معاه بتتعرض صح.

الغلط الشائع في النسخة الإنجليزي: نسيان [[../]] في مسار الصور أو الـ CSS، فالصفحة تطلع من غير تنسيق. وتنسى تغيّر [[aria-label]] على الـ nav للإنجليزي ([[Main]]).`,
          solCode: R`<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Zaker: a study plan that fits your time</title>
  <meta name="description" content="Zaker splits your syllabus over the days you have left and reminds you every day.">
  <link rel="alternate" hreflang="ar" href="https://zaker.example/">
  <link rel="alternate" hreflang="en" href="https://zaker.example/en/">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="logo" href="./"><img src="../img/logo.svg" alt="" width="32" height="32"> Zaker</a>
    <nav aria-label="Main">
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="../" hreflang="ar" lang="ar">العربية</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">A study plan that fits your time</h1>
        <p>Tell Zaker your exam date and syllabus. It splits the work over the days you have left and reminds you every day.</p>
        <a class="btn" href="#pricing">Start free <span class="arrow" aria-hidden="true">←</span></a>
      </div>
      <img src="../img/hero.svg" alt="A weekly planner with subjects spread across the days" width="480" height="360">
    </section>

    <section id="features" aria-labelledby="features-title">
      <h2 id="features-title">What it does</h2>
      <ul class="cards">
        <li class="card"><h3>Automatic split</h3><p>The syllabus is spread over the days by how hard each part is.</p></li>
        <li class="card"><h3>Daily reminder</h3><p>A morning notification with today's tasks only.</p></li>
        <li class="card"><h3>Fell behind?</h3><p>The plan adjusts itself. No starting over.</p></li>
      </ul>
    </section>

    <section id="pricing" aria-labelledby="pricing-title">
      <h2 id="pricing-title">Pricing</h2>
      <div class="cards">
        <article class="card">
          <h3>Free</h3>
          <p class="price">0 EGP</p>
          <ul><li>One subject</li><li>Daily reminder</li></ul>
          <a class="btn btn-outline" href="#signup">Start</a>
        </article>
        <article class="card featured">
          <h3>Pro</h3>
          <p class="price">49 EGP / month</p>
          <ul><li>Unlimited subjects</li><li>Plan adjusts when you fall behind</li></ul>
          <a class="btn" href="#signup">Subscribe</a>
        </article>
      </div>
    </section>

    <section id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">FAQ</h2>
      <details><summary>Does it work offline?</summary><p>Yes, your plan is saved on your phone.</p></details>
      <details><summary>Can I cancel?</summary><p>Any time, from settings, no questions asked.</p></details>
    </section>

    <section id="signup" class="cta" aria-labelledby="signup-title">
      <h2 id="signup-title">Try it free for a week</h2>
      <a class="btn" href="https://app.zaker.example/signup">Create an account</a>
    </section>
  </main>

  <footer class="site-footer">
    <p>© 2026 Zaker · <a href="mailto:hi@zaker.example">hi@zaker.example</a></p>
  </footer>
</body>
</html>`
        },
        {
          cmd: "مشروع ١: accessibility و Lighthouse",
          title: "تثبت إن الصفحة accessible وسريعة بأرقام إزاي؟",
          desc: R`حوّل شروط الـ spec لاختبارات بتشتغل لوحدها: axe على الصفحتين، وأول Tab على الـ skip link، ومفيش scroll بالعرض، وده على موبايل وديسكتوب. وشغّل Lighthouse بوضع الموبايل على الصفحتين.

خلصت يعني: (١) [[npx playwright test]] أخضر على project الموبايل والديسكتوب. (٢) axe صفر violations بـ tags WCAG 2.2 AA، في الوضع الفاتح والغامق. (٣) Lighthouse موبايل: performance و accessibility و best practices و SEO كلهم ٩٠ أو أكتر. (٤) عملت الاختبار اليدوي من درس «قبل أي مشروع: موبايل وكيبورد وقارئ شاشة».

الدروس: [[npm init playwright]] و [[playwright.config.ts]] و [[getByRole و expect(page)]] و [[@axe-core/playwright]] و [[Lighthouse CI]] في تاب «فحص الكود»، و [[axe و Lighthouse]] و [[WCAG 2.2]] في تاب «HTML و CSS».`,
          example: R`import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const path of ['/', '/en/']) {
  test($__btno axe violations on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
  })

  test($__btno horizontal scroll on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}`,
          try: R`[[npm init -y]] و [[npm i -D @playwright/test @axe-core/playwright serve]] و [[npx playwright install chromium]]. اكتب [[playwright.config.ts]] بـ project للموبايل (Pixel 7) وواحد للديسكتوب، و [[webServer]] بيشغّل [[npx serve -l 4173 site]]. اكتب ٤ اختبارات: axe على الصفحتين، ومفيش scroll بالعرض، وأول Tab على الـ skip link، وتبديل اللغة رايح جاي. وبعدين شغّل Lighthouse على الصفحتين وسجّل الأرقام في الـ README.`,
          flag: "script",
          deep: {
            why: R`الـ accessibility اللي مش متختبرة بتقع في أول تعديل. حد بيغيّر لون الزرار فالتباين يقع، أو يحط [[div]] جديد قبل الـ skip link. الاختبار بيمسك ده في الـ PR بدل ما يمسكه مستخدم. و Lighthouse رقم واحد تقدر تحطه في الـ README وتدافع عنه.`,
            how: R`[[withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])]] بيحصر axe في قواعد WCAG لحد مستوى AA، وده المستوى اللي أغلب القوانين والشركات بتطلبه. والـ [[expect]] بيقارن بقايمة أسماء القواعد وعدد العناصر ([[color-contrast: 3]])، فلو فشل رسالة الفشل بتقولك المشكلة على طول، بدل object كبير.

الـ scroll بالعرض: [[scrollWidth - clientWidth]] على الـ [[documentElement]]. لو أكبر من صفر، فيه حاجة أعرض من الشاشة.

الـ [[for]] برّه الـ [[test]] بيعمل نسخة من كل اختبار لكل صفحة، وكل نسخة ليها اسم مختلف في التقرير. ومع projects الموبايل والديسكتوب، الاختبار الواحد بيشتغل ٤ مرات.

اختبار الوضع الغامق ملف لوحده فيه [[test.use({ colorScheme: 'dark' })]]، وبيشغّل قاعدة [[color-contrast]] بس، على الصفحتين. الإنجليزي مهمة هنا بالذات: في تجربتنا axe 4.13 مفحصش تباين النص العربي الصافي خالص (لا نجح ولا فشل)، وفحص النص اللي فيه حروف لاتيني أو أرقام بس.

Lighthouse: [[npx lighthouse URL]] بيشتغل بوضع الموبايل افتراضيًا (throttling للشبكة والـ CPU). شغّله على [[npx serve]] مش على ملف [[file://]]. وعشان يبقى شرط في كل PR، [[@lhci/cli]] بـ [[lighthouserc.json]] (درس [[Lighthouse CI]]).`,
            when: R`في آخر المشروع كمحطة، بس الأحسن تكتب اختبار axe بدري وتسيبه شغال وانت بتكتب الـ CSS.`,
            mistakes: R`[[expect(results.violations).toEqual([])]] من غير map، فالفشل يطبع ٢٠٠ سطر JSON. أو تختبر الديسكتوب بس. أو تحط [[disableRules(['color-contrast'])]] عشان الاختبار يعدّي. أو تعتبر axe أخضر يعني الموقع accessible (هو بيمسك جزء بس، والباقي يدوي). أو [[reuseExistingServer: true]] دايمًا فالاختبار يشتغل على سيرفر قديم أو على حاجة تانية خالص شغالة على نفس البورت (حصلت لنا وانا بجرّب الحل: ٦ اختبارات وقعت لأن بورت 4173 كان عليه سيرفر مشروع تاني).`
          },
          teach: R`## الفكرة: كل شرط في الـ spec يبقى اختبار بيقع لوحده

المثال اختبارين لكل صفحة: axe، ومفيش scroll بالعرض. والحل فيه الـ config، واختبار الـ skip link، وتبديل اللغة، والوضع الغامق. هنفك المثال سطر سطر، وبعدين الـ config، ونشغّل الكل، ونشوف شكل الفشل لما نبوّظ لون. اتشغّل بـ Playwright 1.64 و @axe-core/playwright (axe 4.13) و Lighthouse 13.5 على Windows 11. الفرق الوحيد عن الحل: زوّدنا [[channel: 'chrome']] في الـ config عشان يستخدم Chrome المتسطب بدل ما ينزّل Chromium، وغيّرنا البورت لـ 6035 لأن 4173 ممكن يبقى مشغول.

---

## ١. الاستيراد

~~~text tests/a11y.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
~~~

- [[test]]: بتعرّف اختبار، وبتدّيله [[page]] (تابة متصفح جديدة نضيفة لكل اختبار).
- [[expect]]: التأكيدات. اللي على [[page]] أو locator بتستنى لوحدها لحد ٥ ثواني.
- [[AxeBuilder]]: بيحقن axe في الصفحة ويشغّله ويرجّع النتايج.

## ٢. اختبارات لكل صفحة: [[for]] برّه [[test]]

~~~text
for (const path of ['/', '/en/']) {
  test($__btno axe violations on $__{path}$__bt, async ({ page }) => {
~~~

الـ [[for]] بيلف وقت **تعريف** الاختبارات، فبيعرّف اختبارين باسمين مختلفين: [[no axe violations on /]] و [[no axe violations on /en/]]. والاسم المختلف مهم: لو اتنين اختبارات ليهم نفس الاسم في نفس الملف، Playwright بيرفض يشتغل خالص: [[Error: duplicate test title "same name", first declared in dup.spec.ts:2]]. و [[async ({ page })]]: الاختبار دالة async، و [[{ page }]] destructuring بياخد الـ page من الـ fixtures.

## ٣. axe

~~~text
    await page.goto(path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
~~~

- [[page.goto(path)]]: [[path]] نسبي، فبيتلزق في [[baseURL]] من الـ config.
- [[withTags([...])]]: قواعد axe ليها tags. [[wcag2a]] و [[wcag2aa]] = WCAG 2.0 مستوى A و AA، و [[wcag21aa]] و [[wcag22aa]] = اللي اتضاف في 2.1 و 2.2. كده بنشغّل قواعد WCAG لحد AA بس، من غير قواعد «best practice» الزيادة.
- [[analyze()]]: شغّل. بترجّع object فيه [[violations]] و [[passes]] و [[incomplete]] (حاجات axe مقدرش يحكم عليها).
- [[map(v => ...)]]: كل violation يتحوّل لنص قصير: اسم القاعدة وعدد العناصر. ليه؟ شوف الجزء ٧.

## ٤. الـ scroll بالعرض

~~~text
  test($__btno horizontal scroll on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
~~~

- [[page.evaluate(() => ...)]]: الدالة دي بتتنفذ **جوه المتصفح**، والناتج بيرجع للاختبار.
- [[documentElement]] = عنصر [[html]]. [[scrollWidth]] = عرض المحتوى كله، و [[clientWidth]] = العرض الظاهر. لو المحتوى أعرض، الفرق موجب = فيه scroll بالعرض.

## ٥. الـ config

~~~text playwright.config.ts
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: { command: 'npx serve -l 4173 site', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI },
})
~~~

| الإعداد | معناه |
|---|---|
| [[testDir]] | فين الاختبارات |
| [[baseURL]] | اللي [[page.goto('/')]] بيتلزق فيه |
| [[projects]] | كل اختبار بيشتغل مرة لكل project. [[...devices['Pixel 7']]] بيفرد إعدادات الجهاز: 412×839 و touch و موبايل، و [[Desktop Chrome]] = 1280×720 |
| [[webServer.command]] | Playwright بيشغّل السيرفر ده قبل الاختبارات ويقفله بعدها |
| [[webServer.url]] | بيستنى لحد ما اللينك ده يرد قبل ما يبدأ |
| [[reuseExistingServer: !process.env.CI]] | على جهازك: لو فيه سيرفر شغال على البورت استخدمه. في CI (المتغير [[CI]] موجود): لأ، شغّل واحد جديد |

## ٦. التشغيل

~~~bash
npx playwright test --reporter=list
~~~

~~~text الناتج
  ok 3 [mobile] › tests\a11y.spec.ts:5:7 › no axe violations on / (1.6s)
  ok 1 [desktop] › tests\a11y.spec.ts:5:7 › no axe violations on / (1.7s)
  ok 5 [mobile] › tests\a11y.spec.ts:11:7 › no horizontal scroll on / (447ms)
  ...
  ok 11 [mobile] › tests\a11y.spec.ts:18:5 › skip link is the first Tab stop and moves focus to main (414ms)
  ok 13 [mobile] › tests\a11y.spec.ts:27:5 › language switch links both ways (721ms)

  16 passed (8.1s)
~~~

١٦ = (٤ اختبارات المثال + skip link + تبديل اللغة + ٢ غامق) × ٢ projects. و [[:5:7]] = السطر والعمود اللي الاختبار متعرّف فيه.

## ٧. شكل الفشل

غيّرنا [[--brand]] لـ [[#7fd1b0]] (أخضر فاتح، تباينه على الخلفية 1.77 والمطلوب 4.5) وشغّلنا:

~~~text الناتج
  1) [mobile] › tests\a11y.spec.ts:5:7 › no axe violations on / ───
    Error: expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 3

    - Array []
    + Array [
    +   "color-contrast: 1",
    + ]
~~~

- [[- Expected]] اللي كنا مستنيينه (قايمة فاضية)، و [[+ Received]] اللي جه.
- [[color-contrast: 1]]: قاعدة التباين، عنصر واحد. سطر واحد بيقولك المشكلة. من غير الـ [[map]]، نفس الفشل بيطبع الـ violation كامل بـ JSON (الـ helpUrl والـ html والـ target لكل عنصر)، وده اللي كان بيحصل في الاختبار الغامق في نسخة قديمة من الحل.

وعلى [[/en/]] نفس اللون طلّع [[color-contrast: 9]]: كل اللينكات والزراير. ليه العربي ١ بس؟ فتحنا النتيجة: العنصر الوحيد في الصفحة العربي كان لينك «English». جرّبنا صفحة فيها ٣ جمل بنفس اللون الفاتح:

~~~text الناتج من axe 4.13
violations: ["Light English", "المميزات 49"]
~~~

الجملة العربي الصافية مش في النتيجة خالص (لا violation ولا pass)، والجملة اللي فيها رقم اتفحصت. يعني axe في تجربتنا **مبيفحصش تباين النص العربي الصافي**. عشان كده الحل بيشغّل التباين على الصفحتين، والإنجليزي هي اللي بتمسك، والعين بتراجع العربي.

## ٨. الاختبارين اللي فاضلين (من الـ solCode)

~~~text
await page.keyboard.press('Tab')
await expect(page.getByRole('link', { name: 'اتخطى للمحتوى' })).toBeFocused()
await page.keyboard.press('Enter')
await expect(page).toHaveURL(/#main$/)
~~~

- [[keyboard.press('Tab')]]: Tab حقيقي من أول الصفحة.
- [[getByRole('link', { name })]]: دوّر على العنصر زي ما قارئ الشاشة بيشوفه: دور (link) واسم. لو الاسم اتغير أو العنصر بقى [[div]]، الاختبار يقع.
- [[toBeFocused()]]: هو اللي عليه الـ focus؟
- [[toHaveURL(/#main$/)]]: اللينك اشتغل، و [[$]] = آخر الـ URL.

واختبار اللغة بيدوس «English» ويتأكد إن [[html]] بقى [[dir="ltr"]]، ويدوس «العربية» ويتأكد إنه رجع [[lang="ar"]].

## ٩. Lighthouse

~~~bash
npx lighthouse http://localhost:4173/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=lh-ar.json
~~~

~~~text الناتج (من ملف الـ JSON، الصفحتين)
/     performance=100 accessibility=100 best-practices=100 seo=100   FCP 0.8 s  LCP 0.9 s  CLS 0  TBT 0 ms
/en/  performance=100 accessibility=100 best-practices=100 seo=100   FCP 0.8 s  LCP 0.9 s  CLS 0  TBT 0 ms
~~~

١٠٠ في الأربعة لأن الصفحة HTML و CSS وصورتين SVG، والصور ليها [[width]] و [[height]] (CLS = 0)، ومفيش JS (TBT = 0).

---

## الخلاصة

| الشرط | الاختبار |
|---|---|
| axe صفر violations | [[AxeBuilder.withTags([...]).analyze()]] و [[map]] للرسالة |
| مفيش scroll بالعرض | [[scrollWidth - clientWidth <= 0]] |
| أول Tab على الـ skip link | [[keyboard.press('Tab')]] و [[toBeFocused()]] |
| الوضع الغامق | [[test.use({ colorScheme: 'dark' })]] و [[withRules(['color-contrast'])]] على الصفحتين |
| موبايل وديسكتوب | [[projects]] في الـ config |
| Lighthouse ٩٠+ | [[npx lighthouse]] على السيرفر مش [[file://]] |

- axe بيمسك جزء بس، وفي تجربتنا مبيفحصش تباين العربي الصافي. الاختبار اليدوي لسه شرط.`,
          lines: [
            R`أدوات Playwright للاختبار والتأكيد.`,
            R`axe جوه Playwright.`,
            R`نفس الاختبارات للصفحتين، كل واحدة بلفّة.`,
            R`اسم الاختبار فيه المسار، فالتقرير يقولك أنهي صفحة وقعت.`,
            R`افتح الصفحة على الـ baseURL.`,
            R`شغّل axe بقواعد WCAG لحد 2.2 AA بس.`,
            R`قارن بقايمة فاضية من «القاعدة: عدد العناصر»، عشان رسالة الفشل تبقى مقروءة.`,
            R`قفلة الاختبار الأول.`,
            R`الاختبار التاني لنفس الصفحة: مفيش scroll بالعرض.`,
            R`افتح الصفحة.`,
            R`الفرق بين عرض المحتوى وعرض الشاشة.`,
            R`لازم صفر أو أقل.`,
            R`قفلة الاختبار.`,
            R`قفلة الـ [[for]].`
          ],
          sol: R`النتيجة اللي وصلنالها بالحل المرجعي: ١٢ اختبار في [[a11y.spec.ts]] (٦ لكل project) و ٤ في [[dark.spec.ts]] (الصفحتين في كل project)، كلهم [[passed]]. و Lighthouse 13 بوضع الموبايل على الصفحتين: [[performance=100 accessibility=100 best-practices=100 seo=100]].

لو اختبار الـ skip link وقع بـ [[element(s) not found]] أو مش focused: يا إما فيه عنصر بيتداس قبله (لينك في header قبله)، يا إما الـ skip link [[display: none]] (مبياخدش focus خالص). الحل يخفيه برّه الشاشة بـ [[top: -4rem]] ويرجّعه في [[:focus]].

لو Lighthouse performance أقل من ٩٠ على الصفحة دي، اتأكد إنك مش على dev server، وإن الصور ليها [[width]] و [[height]]. و SEO أقل من ١٠٠ غالبًا [[meta description]] ناقصة أو لينك نصه «اضغط هنا».`,
          solCode: R`// ── playwright.config.ts ──
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: { command: 'npx serve -l 4173 site', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI },
})

// ── tests/a11y.spec.ts ──
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const path of ['/', '/en/']) {
  test($__btno axe violations on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
  })

  test($__btno horizontal scroll on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('skip link is the first Tab stop and moves focus to main', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'اتخطى للمحتوى' })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
})

test('language switch links both ways', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await page.getByRole('link', { name: 'English' }).click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await page.getByRole('link', { name: 'العربية' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
})

// ── tests/dark.spec.ts ──
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test.use({ colorScheme: 'dark' })
for (const path of ['/', '/en/']) {
  test($__btdark mode has enough contrast on $__{path}$__bt, async ({ page }) => {
    await page.goto(path)
    const r = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
    expect(r.violations.map(v => $__bt$__{v.id}: $__{v.nodes.length}$__bt)).toEqual([])
  })
}`
        },
        {
          cmd: "مشروع ١: النشر والـ README",
          title: "ترفع الصفحة على لينك حقيقي وتكتب README يتقري إزاي؟",
          desc: R`ارفع [[site/]] على GitHub Pages بـ workflow: كل push على main بيشغّل الاختبارات، ولو عدّت بيرفع. واكتب README فيه اللينك وصورة من الموبايل.

خلصت يعني: (١) اللينك شغال من الموبايل، و [[/en/]] شغال. (٢) push فيه اختبار واقع مبيرفعش. (٣) README فيه: جملة المشروع بيعمل إيه، واللينك، وصورة حقيقية، وإزاي تشغّله وتختبره، و Lighthouse، و «اللي اتعلمته». (٤) [[node scripts/done-check.mjs]] من الدرس الأول أخضر.

الدروس: [[ci.yml]] و [[uses و run]] في تاب «GitHub Actions»، و [[playwright screenshot]] في تاب «Console» للصورة.`,
          example: R`  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5`,
          try: R`في إعدادات الـ repo على GitHub: Pages، وخلي الـ Source «GitHub Actions». اعمل الـ workflow، واعمل push، واستنى لحد ما اللينك يشتغل. وبعدين غيّر لون الـ brand لحاجة التباين بتاعها ضعيف (زي #7fd1b0 على أبيض) واعمل push: الـ deploy مش لازم يحصل. رجّع اللون. وصوّر الصفحة على الموبايل بـ [[npx playwright screenshot --device="Pixel 7" URL docs/mobile-ar.png]] وحطها في الـ README.`,
          flag: "script",
          deep: {
            why: R`مشروع من غير لينك live بيتعامل كأنه مش موجود: محدش هيعمل clone ويشغّل. والـ README هو الـ landing page بتاعة الـ repo. واللي بيراجع بيقرا أول ٥ سطور ويبص على الصورة ويدوس اللينك، في أقل من دقيقة.`,
            how: R`الـ workflow فيه job للاختبار و job للنشر، و [[needs: test]] بيخلي النشر يستنى الاختبار ينجح. الـ [[permissions]] على مستوى الـ workflow: [[pages: write]] و [[id-token: write]] دول اللي [[deploy-pages]] محتاجهم عشان يرفع من غير token تحطه انت.

[[upload-pages-artifact]] بياخد فولدر [[site]] بس، مش الـ repo كله، فالـ tests والـ docs مبيترفعوش. و [[deploy-pages]] بيرفعه وبيطلّع الرابط في [[steps.deployment.outputs.page_url]]، والرابط ده بيظهر في صفحة الـ Actions وفي الـ environment.

GitHub Pages بيخدم على [[https://USER.github.io/REPO/]]. الروابط النسبية في الحل ([[en/]] و [[../]] و [[styles.css]]) بتشتغل تحت أي مسار. لو كنت كاتب [[/styles.css]] بشرطة في الأول، هتدوّر على الملف في جذر الدومين وتقع.

الصورة: [[npx playwright screenshot --device="Pixel 7" --full-page URL file.png]]. صورة موبايل حقيقية أحسن من الديسكتوب لأنها بتثبت إن الموبايل اتعمل.`,
            when: R`أول ما الـ HTML يبقى فيه حاجة تتشاف، مش في الآخر. أول deploy بدري بيطلّع مشاكل المسارات وهي لسه صغيرة.`,
            mistakes: R`رفع الـ repo كله (فيه tests و node_modules لو اترفعوا). أو مسارات بتبدأ بـ [[/]] فتشتغل على [[localhost]] وتقع على Pages. أو الـ workflow بيرفع حتى لو الاختبارات واقعة. أو README فيه صورة ديسكتوب بس، أو صورة معمولة قبل آخر تعديل. أو تنسى تغيّر الـ Source في الإعدادات فالـ deploy job يقع بـ [[Get Pages site failed]].`
          },
          teach: R`## الفكرة: job بيختبر، و job بيرفع فولدر [[site]] بس لو الاختبار عدّى

المثال هو job النشر من [[.github/workflows/pages.yml]]، والـ solCode فيه الملف كامل والـ README. هنفك الـ workflow سطر سطر، وبعدين صورة الموبايل للـ README، وبعدين الـ README نفسه.

> النشر الفعلي على GitHub Pages محتاج repo على GitHub، فشكل التشغيل هناك مكتوب من وثايق GitHub Actions و Pages. اللي اتجرّب هنا: الملف اتقرا كـ YAML سليم (بـ PyYAML)، وأرقام نسخ الـ actions اتأكدنا منها من آخر release لكل واحدة (أكتوبر ٢٠٢٦: checkout v7.0.1، و setup-node v7.1.0، و configure-pages v6.0.0، و upload-pages-artifact v5.0.0، و deploy-pages v5.0.1)، والاختبارات اللي الـ workflow بيشغّلها اتشغّلت محليًا، والصورة اتصوّرت فعلًا.

---

## ١. أول الملف: إمتى والصلاحيات

~~~text .github/workflows/pages.yml
name: pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write
~~~

- [[name]]: الاسم اللي بيظهر في تاب Actions.
- [[on: push: branches: [main]]]: اشتغل مع كل push على main بس. الـ PRs والـ branches التانية لأ.
- [[permissions]]: الـ token اللي GitHub بيدّيه للـ workflow يقدر يعمل إيه:
  - [[contents: read]]: يقرا الكود وبس.
  - [[pages: write]]: يرفع على Pages.
  - [[id-token: write]]: يطلب token مؤقت (OIDC) يثبت بيه لـ Pages إن الـ workflow ده هو اللي بيرفع. ده اللي بيخليك متحطش أي سر بإيدك.

## ٢. job الاختبار

~~~text
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
~~~

- [[jobs]]: الشغل، وكل job جهاز جديد نضيف. و [[test]] اسم الـ job.
- [[runs-on: ubuntu-latest]]: لينكس من GitHub.
- [[uses]]: استخدم action جاهز. [[@v7]] رقم النسخة الكبيرة.
- [[actions/checkout]]: هات الكود على الجهاز. من غيره الجهاز فاضي.
- [[setup-node]] بـ [[node-version: 22]]: سطّب Node 22.
- [[npm ci]]: سطّب الـ dependencies من [[package-lock.json]] بالظبط (أسرع وأدق من [[npm i]] في CI).
- [[playwright install --with-deps chromium]]: نزّل Chromium ومكتبات لينكس اللي محتاجها.
- [[npx playwright test]]: الـ ١٦ اختبار. والمتغير [[CI]] موجود على GitHub، فـ [[reuseExistingServer]] بيبقى [[false]] وبيشغّل [[serve]] جديد.

## ٣. job النشر (المثال)

~~~text
  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
~~~

- [[needs: test]]: متبدأش غير لما [[test]] **ينجح**. لو وقع، [[deploy]] بيتعلّم «skipped». ده الشرط «push فيه اختبار واقع مبيرفعش».
- [[environment]]: GitHub بيسجّل كل نشر في environment اسمه [[github-pages]]، وبيظهر في صفحة الـ repo جنب الرابط.
- [[url: $__{{ ... }}]]: [[$__{{ }}]] صيغة GitHub Actions للقيم وقت التشغيل. [[steps.deployment.outputs.page_url]] = الـ output اسمه [[page_url]] من الخطوة اللي [[id]] بتاعها [[deployment]] (تحت).

~~~text
    steps:
      - uses: actions/checkout@v7
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5
~~~

| الخطوة | بتعمل إيه |
|---|---|
| [[checkout]] | الكود تاني (job جديد = جهاز جديد) |
| [[configure-pages]] | بيقرا إعدادات Pages للـ repo ويتأكد إنه متفعّل. لو الـ Source مش «GitHub Actions»، هنا بيقع |
| [[upload-pages-artifact]] بـ [[path: site]] | بيضغط فولدر [[site]] **بس** في artifact. الـ tests و docs و [[node_modules]] مبيترفعوش |
| [[deploy-pages]] بـ [[id: deployment]] | بياخد الـ artifact ويحطه على Pages، وبيطلّع [[page_url]] |

الملف كله اتقرا بـ PyYAML عشان نتأكد إن الـ indentation سليم:

~~~text الناتج
jobs: ['test', 'deploy']
deploy.needs: test
permissions: {'contents': 'read', 'pages': 'write', 'id-token': 'write'}
~~~

والرابط النهائي (من الوثايق): [[https://USER.github.io/REPO/]]. عشان كده كل المسارات في الـ HTML نسبية: [[styles.css]] تحت [[/REPO/]] بيلاقي [[/REPO/styles.css]]، أما [[/styles.css]] كان هيدوّر في [[https://USER.github.io/styles.css]] ويقع.

---

## ٤. صورة الموبايل

~~~bash
npx playwright screenshot --device="Pixel 7" --full-page http://localhost:4173/ docs/mobile-ar.png
~~~

- [[playwright screenshot]]: افتح الصفحة وصوّرها من غير ما تكتب اختبار.
- [[--device="Pixel 7"]]: نفس إعدادات الجهاز اللي في الاختبارات.
- [[--full-page]]: الصفحة كلها لحد آخرها، مش اللي ظاهر بس.

اتشغّل (بزيادة [[--channel chrome]] عشان يستخدم Chrome المتسطب):

~~~text الناتج
Navigating to http://localhost:6035/
Capturing screenshot into docs/mobile-ar.png
~~~

والصورة طلعت **1082 × 5993** بكسل، 236KB. ليه 1082 والـ Pixel 7 عرضه 412؟ لأن [[deviceScaleFactor]] بتاعه 2.625: كل بكسل CSS = 2.625 بكسل حقيقي، و 412 × 2.625 = 1081.5 ≈ 1082. صورة حادة زي اللي على الموبايل بالظبط.

## ٥. الـ README

~~~text README.md (أهم حتت)
# ذاكر: landing page بلغتين
صفحة تعريف لتطبيق مذاكرة، بالعربي (RTL) والإنجليزي (LTR)، HTML و CSS بس.
**Live:** https://you.github.io/p1-landing/ · [English](https://you.github.io/p1-landing/en/)
![الصفحة على موبايل بالعربي](docs/mobile-ar.png)
~~~

| الجزء | ليه |
|---|---|
| العنوان وجملة | المشروع إيه في ٥ ثواني |
| [[**Live:**]] ولينك https | أول حاجة بتتداس. وده اللي [[done-check]] بيدوّر عليه |
| [[![وصف](docs/mobile-ar.png)]] | صورة موبايل حقيقية، مسارها نسبي وموجود في الـ repo |
| «اللي اتعمل» بأرقام | Lighthouse 100 مش «سريعة» |
| «تشغيل واختبار» | ٣ أوامر، مش فقرة |
| «اللي اتعلمته» | جملتين من المشروع نفسه، هتقولهم في الانترفيو |

وعشان [[node scripts/done-check.mjs]] يعدّي بند الاختبارات: [[npm init -y]] بيحط [[test]] كده:

~~~text package.json بعد npm init -y
"test": "echo \"Error: no test specified\" && exit 1"
~~~

و [[npm test]] بيطبع [["Error: no test specified"]] ويخرج بـ 1 (جرّبناها). غيّره لـ [["test": "playwright test"]].

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[on: push: branches: [main]]] | يشتغل مع main بس |
| [[permissions: pages: write, id-token: write]] | يرفع من غير سر بتحطه بإيدك |
| [[needs: test]] | مفيش نشر من غير اختبارات عدّت |
| [[upload-pages-artifact]] بـ [[path: site]] | فولدر الموقع بس |
| [[deploy-pages]] بـ [[id: deployment]] | بيرفع وبيطلّع الرابط |
| [[playwright screenshot --device="Pixel 7" --full-page]] | صورة الـ README |

- المسارات النسبية بتشتغل تحت [[/REPO/]]، والمسارات اللي بتبدأ بـ [[/]] لأ.
- في الإعدادات: Pages ← Source ← «GitHub Actions»، مرة واحدة قبل أول push.`,
          lines: [
            R`job النشر.`,
            R`مبيبدأش غير لما job الاختبار ينجح.`,
            R`جهاز Linux جديد من GitHub.`,
            R`environment اسمه [[github-pages]]، وده بيظهر في صفحة الـ repo جنب الرابط.`,
            R`اسمه.`,
            R`الرابط جاي من output الخطوة اللي [[id]] بتاعها [[deployment]].`,
            R`الخطوات.`,
            R`هات الكود.`,
            R`جهّز إعدادات Pages للـ repo.`,
            R`اعمل artifact من فولدر [[site]] بس.`,
            R`الإعدادات بتاعته.`,
            R`الفولدر اللي هيترفع.`,
            R`[[id]] عشان السطر اللي فوق يقرا الرابط منه.`,
            R`ارفع الـ artifact على Pages.`
          ],
          sol: R`بعد أول push، في تاب Actions هتلاقي workflow اسمه [[pages]] فيه job [[test]] وبعده [[deploy]]، وتحت [[deploy]] الرابط. افتحه من الموبايل. ولما اللون اتغير لتباين ضعيف: [[test]] يقع في اختبارات axe: [[color-contrast: 1]] على الصفحة العربي و [[color-contrast: 9]] على الإنجليزي (اتجرّب محليًا بنفس الاختبارات)، و [[deploy]] يبان «skipped».

لو [[deploy]] وقع بـ [[HttpError: Not Found]] أو [[Get Pages site failed]]: الـ Pages مش متفعّل أو الـ Source مش «GitHub Actions». ولو الصفحة طلعت من غير CSS على Pages بس: مسار بيبدأ بـ [[/]].

وعشان [[done-check]] يبقى أخضر: السكربت بيشغّل [[npm test]]، و [[npm init -y]] بيحط [[test]] بيطبع «no test specified» ويخرج بـ 1. خلي [[scripts]] في [[package.json]] فيها [["test": "playwright test"]].

الحل المرجعي فيه الـ workflow كامل وREADME. لاحظ إن الـ README فيه الأرقام، وأوامر التشغيل، وجملتين «اتعلمته» حقيقيين من المشروع نفسه.`,
          solCode: R`# ── .github/workflows/pages.yml ──
name: pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v5

# ── README.md ──
# ذاكر: landing page بلغتين

صفحة تعريف لتطبيق مذاكرة، بالعربي (RTL) والإنجليزي (LTR)، HTML و CSS بس.

**Live:** https://you.github.io/p1-landing/ · [English](https://you.github.io/p1-landing/en/)

![الصفحة على موبايل بالعربي](docs/mobile-ar.png)

## اللي اتعمل
- mobile-first، و grid بيتكيف من غير media queries كتير (auto-fit و minmax)
- CSS واحد للغتين بـ logical properties، والسهم بس اللي بيتقلب
- skip link، و landmarks، و headings مرتبة، و alt حقيقي، وتباين في الوضع الفاتح والغامق
- Lighthouse موبايل: 100 / 100 / 100 / 100

## تشغيل واختبار
$__bt$__bt$__btbash
npm ci
npx serve site          # http://localhost:3000
npx playwright test     # axe + keyboard + no horizontal scroll، على موبايل وديسكتوب
$__bt$__bt$__bt

## اللي اتعلمته
- $__btmargin-left$__bt في RTL بيبقى في الناحية الغلط، و $__btmargin-inline-start$__bt بيحل ده
- الـ focus لازم يبان في الوضع الغامق كمان، مش بس الفاتح`
        }
      ]
    }
  ]
});
