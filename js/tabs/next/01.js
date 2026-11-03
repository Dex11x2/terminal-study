// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
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

TAB("next", {
  label: "Next.js",
  prompt: "$ ",
  lab: R`npx create-next-app@latest next-lab
cd next-lab
npm run dev`,
  labText: "create-next-app بيسألك أسئلة: اختار TypeScript و Tailwind و App Router، وقول No لسؤال Cache Components (بنشغّله بإيدنا في فئة «Cache Components و use cache»). كل تجارب التاب ده على المشروع ده.",
  levels: {"1":["الأساس","routing بالفولدرات، و layouts، و server و client components"],"2":["الداتا","fetching، والكاش، و server actions، و route handlers، و auth، و middleware"],"3":["الإنتاج والانترفيو","SEO و metadata، و i18n، والأداء، والنشر، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "Next.js بيعمل إيه",
      l: 1,
      n: "framework فوق React: راوتنج بالفولدرات، وسيرفر بيرسم، و build جاهز للإنتاج",
      items: [
        {
          cmd: "create-next-app",
          title: "تبدأ مشروع Next جديد وتفهم ملفاته",
          desc: R`[[npx create-next-app@latest]] بيعملك مشروع Next.js جاهز: React و TypeScript و Tailwind و ESLint، وسكربتات [[dev]] و [[build]] و [[start]]. بيسألك كام سؤال، والإجابات الأسلم لمشروع جديد: TypeScript أيوة، و App Router أيوة، و [[src/]] على ذوقك، و import alias [[@/*]]. ومن Next 16.4 فيه سؤال عن Cache Components إجابته الافتراضية أيوة: قول لأ دلوقتي، لأن دروس المستوى الأول والتاني مبنية على النموذج العادي، وبنشغّله بإيدنا في فئة «Cache Components».

أهم الملفات: [[app/layout.tsx]] الهيكل اللي بيلف كل الصفحات، و [[app/page.tsx]] الصفحة الرئيسية ([[/]])، و [[public/]] للصور والملفات اللي بتتقدّم زي ما هي، و [[next.config.ts]] إعدادات Next. ولو اخترت [[src/]] كل ده بيبقى جوه [[src/app]]. و [[npm run dev]] بيشغّل على [[localhost:3000]].`,
          example: R`npx create-next-app@latest shop
npx create-next-app@latest shop --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-cache-components
cd shop
npm run dev
ls src/app public
npx next info`,
          try: R`اعمل المشروع، وافتح [[src/app/page.tsx]] وامسح كل اللي جوه الـ return وحط [[<h1>أهلًا</h1>]]، واحفظ وبص على المتصفح. وبعدين اعمل [[src/app/about/page.tsx]] فيه component بيرجّع عنوان تاني وافتح [[/about]]: عملت صفحة جديدة من غير أي راوتر.`,
          deep: {
            why: "React لوحدها مكتبة واجهة: مفيهاش راوتنج، ولا رسم على السيرفر، ولا طريقة تجيب بيها داتا، ولا build جاهز للإنتاج. Next.js framework بيجمّع الحاجات دي بقرارات جاهزة، فبتبدأ تكتب الصفحات على طول بدل ما تقعد يومين تركّب Vite و React Router و SSR و API.",
            how: R`[[create-next-app]] بينزّل قالب ويسطّب [[next]] و [[react]] و [[react-dom]]، ويكتب [[package.json]] فيه [[next dev]] و [[next build]] و [[next start]]. تفاصيل الأوامر التلاتة والفرق بينهم في تاب «Node و npm» (درس Next.js CLI).

[[next dev]] بيبني كل صفحة أول ما تطلبها، مع Fast Refresh. من Next 16 الـ bundler الافتراضي Turbopack (مكتوب بـ Rust) في dev وفي build كمان، ولو فيه مكتبة محتاجة webpack بتشغّل بـ [[--webpack]]. في Next 15 كان Turbopack اختياري بـ [[--turbopack]].

ملفات تانية هتقابلها: [[next-env.d.ts]] بيعمله Next لوحده (متعدّلوش)، و [[tsconfig.json]] فيه [[paths]] للـ [[@/*]] عشان تكتب [[import { db } from "@/lib/db"]] بدل [[../../../lib/db]]، و [[.next/]] ناتج البناء (في .gitignore).

Next 16 محتاج Node 20.9 على الأقل، و TypeScript 5.1 أو أحدث.`,
            when: "أي مشروع React محتاج SEO، أو صفحات بتترسم على السيرفر، أو backend صغير جنب الواجهة (فورمات و API). لو لوحة أدمن ورا login ومفيهاش SEO، Vite + React أبسط (تاب «React»).",
            mistakes: R`تبدأ بـ [[create-react-app]]: اتوقف رسميًا. وتختار Pages Router لمشروع جديد عشان التوتوريال قديم. وتشغّل [[npm run dev]] على السيرفر للإنتاج بدل [[build]] وبعده [[start]]. وتعمل فولدر [[app]] في الجذر وفولدر [[src/app]] كمان، فـ Next يقرا اللي في الجذر بس ويتجاهل التاني، وتستغرب إن صفحتك مش ظاهرة.`
          },
          teach: R`## الفكرة: ٦ أوامر، أول اتنين بيعملوا نفس الحاجة

أول سطرين طريقتين لعمل نفس المشروع (بأسئلة، أو من غير أسئلة)، وبعدهم بندخل المشروع ونشغّله ونبص على ملفاته. كله اتشغّل على ويندوز 11 بـ Node 24.19 و npm 11.17، ويوم ما اتكتب الدرس [[create-next-app]] و [[next]] كانوا 16.4.0، و React 19.3.

---

## ١. [[npx create-next-app@latest shop]]

| الحتة | معناها |
|---|---|
| [[npx]] | «نزّل الباكدج دي مؤقتًا وشغّلها»، من غير ما تتسطب global (x يعني execute) |
| [[create-next-app]] | الأداة الرسمية اللي بتعمل مشروع Next |
| [[@latest]] | آخر إصدار، مش نسخة قديمة متكيّشة عندك |
| [[shop]] | اسم الفولدر اللي هيتعمل |

في الترمنال العادي بيسألك أسئلة واحد ورا التاني. الأسئلة دي من كود [[create-next-app]] 16.4 نفسه:

| السؤال | نختار |
|---|---|
| Would you like to use the recommended Next.js defaults? | لأ، عشان نشوف الأسئلة ونختار بإيدنا |
| TypeScript? | Yes |
| Which linter? (ESLint أو Biome أو None) | ESLint |
| React Compiler? | No (دلوقتي) |
| Tailwind CSS? | Yes |
| Your code inside a [[src/]] directory? | على ذوقك، الدروس بتستخدمه |
| App Router? (recommended) | Yes |
| Customize the import alias ([[@/*]])? | No، سيبه [[@/*]] |
| Cache Components? | **No** (تحت ليه) |
| AGENTS.md? | على ذوقك |

> **سؤال Cache Components مهم:** من 16.4 الإجابة الافتراضية بتاعته أيوة. ولو اتشغّل، طريقة الكاش و static و dynamic بتتغير كلها، والأخطاء اللي هتشوفها هتبقى غير اللي في دروس المستويين الأول والتاني. فقول لأ دلوقتي، وفي فئة «Cache Components و use cache» هنشغّله بسطر واحد في [[next.config.ts]].

---

## ٢. نفس الحاجة بـ flags

~~~bash
npx create-next-app@latest shop --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-cache-components
~~~

كل flag إجابة سؤال، فمفيش أسئلة:

| الـ flag | الإجابة |
|---|---|
| [[--ts]] | TypeScript (اختصار [[--typescript]]) |
| [[--tailwind]] | Tailwind CSS |
| [[--eslint]] | ESLint |
| [[--app]] | App Router |
| [[--src-dir]] | الكود جوه [[src/]] |
| [[--import-alias "@/*"]] | [[@/]] بيشاور على [[src/]]، فتكتب [[import x from "@/lib/x"]] من أي مكان |
| [[--no-cache-components]] | من غير Cache Components |

والأسئلة اللي ملهاش flag بياخد فيها الافتراضي ويقولك. ده أول الناتج على ويندوز:

~~~text الناتج
Using defaults for unprovided options:

  --no-react-compiler     No React Compiler (use --react-compiler for React Compiler)
  --agents-md             AGENTS.md (use --no-agents-md for No AGENTS.md)
  --no-agent-feedback     No agent feedback (use --agent-feedback for Agent feedback)

Creating a new Next.js app in C:\Users\ali\...\shop.

Using npm.

Initializing project with template: app-tw
~~~

[[app-tw]] اسم القالب: App Router + Tailwind. ولما شغّلناه **من غير** [[--no-cache-components]]، السطر ده ظهر جوه نفس القايمة:

~~~text الناتج من غير --no-cache-components
  --cache-components      Cache Components (use --no-cache-components for No Cache Components)
~~~

وفي [[next.config.ts]] اتكتب [[cacheComponents: true]]. يعني الافتراضي اتشغّل لوحده، وعشان كده الـ flag ده في المثال.

بعد كده بينزّل المكتبات:

~~~text الناتج
Installing dependencies:
- next
- react
- react-dom

Installing devDependencies:
- @tailwindcss/turbopack
- @types/node
- @types/react
- @types/react-dom
- eslint
- eslint-config-next
- tailwindcss
- typescript

added 357 packages, and audited 358 packages in 34s
...
Generating route types...
✓ Types generated successfully

Initialized a git repository.

Success! Created shop at C:\Users\ali\...\shop
~~~

- **dependencies**: اللي التطبيق محتاجه وهو شغال: [[next]] نفسه و [[react]] و [[react-dom]].
- **devDependencies**: أدوات وقت التطوير بس: TypeScript، وأنواع الـ TypeScript ([[@types/...]])، و ESLint، و Tailwind.
- [[Generating route types]]: Next بيعمل أنواع TypeScript من شكل الفولدرات (هتشوفها في [[PageProps]] في الدروس الجاية).
- [[Initialized a git repository]]: المشروع بقى git repo وفيه أول commit.

---

## ٣. [[cd shop]]

[[cd]] اختصار change directory: ادخل فولدر المشروع. كل الأوامر الجاية لازم تتشغّل من جوه.

---

## ٤. [[npm run dev]]

[[npm run X]] بيشغّل الـ script اللي اسمه X في [[package.json]]. وده اللي اتكتب فيه:

~~~text package.json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
~~~

يعني [[npm run dev]] = [[next dev]]. شغّلناه بـ [[-p 5820]] (رقم بورت تاني عشان ميتخانقش مع برامج على الجهاز)، ومن غيره البورت [[3000]]:

~~~text الناتج
▲ Next.js 16.4.0 (Turbopack)
- Local:         http://localhost:5820
- Network:       http://172.29.160.1:5820
✓ Ready in 3.5s
○ Compiling / ...
 GET / 200 in 646ms (next.js: 403ms, application-code: 243ms)
 GET /about 200 in 48ms (next.js: 11ms, application-code: 37ms)
 GET /nothing 404 in 209ms (next.js: 177ms, application-code: 32ms)
~~~

| السطر | معناه |
|---|---|
| [[(Turbopack)]] | الـ bundler (اللي بيحوّل كودك لحاجة المتصفح يفهمها). Turbopack الافتراضي من Next 16 |
| [[Local]] | افتحه من جهازك |
| [[Network]] | عنوان جهازك على الشبكة، فموبايل على نفس الشبكة يقدر يفتحه |
| [[○ Compiling / ...]] | dev مش بيبني كل الصفحات مقدمًا: بيبني الصفحة أول ما تتطلب |
| [[GET / 200 in 646ms]] | أول طلب: ٦٤٦ ملّي ثانية، عشان كان بيبني |
| [[GET /about 200 in 48ms]] | بعد ما اتبنت، الطلبات بقت أسرع بكتير |
| [[GET /nothing 404]] | مفيش فولدر [[nothing]] فيه [[page.tsx]]، فـ 404 |

والترمنال بيفضل مشغول طول ما السيرفر شغال، و Ctrl+C بيقفله.

### الـ Fast Refresh

جربنا بمتصفح Chrome حقيقي (playwright): فتحنا الصفحة، وحطينا رقم في متغير على [[window]]، وبعدين غيّرنا [[أهلًا]] لـ [[أهلًا يا عالم]] في [[page.tsx]] وحفظنا:

~~~text الناتج
before: أهلًا
after: أهلًا يا عالم marker: 42
~~~

النص اتغير والرقم اللي على [[window]] لسه موجود، يعني الصفحة **متعملهاش reload**: Next بدّل الكومبوننت اللي اتغير بس. وفي ترمنال dev ظهر [[✓ Compiled in 32ms]].

---

## ٥. [[ls src/app public]]

[[ls]] بيعرض اللي جوه الفولدرات (في PowerShell [[ls]] اسم تاني لـ [[Get-ChildItem]]، وهناك الأمر ده بالمسافة مبيطبعش حاجة خالص، لأن الكلمة التانية [[public]] بتتفهم فلتر على الأسامي مش فولدر تاني. جربناه في pwsh وطلع فاضي. اكتبها بفاصلة: [[ls src/app, public]]). ده الناتج في Git Bash على مشروع جديد:

~~~text الناتج
public:
file.svg
globe.svg
next.svg
vercel.svg
window.svg

src/app:
favicon.ico
globals.css
layout.tsx
page.tsx
~~~

| الملف | بيعمل إيه |
|---|---|
| [[src/app/layout.tsx]] | الهيكل اللي بيلف كل الصفحات، فيه [[<html>]] و [[<body>]] |
| [[src/app/page.tsx]] | الصفحة الرئيسية [[/]] |
| [[src/app/globals.css]] | الـ CSS العام، وفيه سطر Tailwind |
| [[src/app/favicon.ico]] | أيقونة التاب |
| [[public/]] | ملفات بتتقدّم زي ما هي: [[public/next.svg]] بتفتح من [[/next.svg]] |

وفي جذر المشروع حاجات تانية: [[next.config.ts]] (إعدادات Next)، و [[tsconfig.json]] (فيه [[paths]] اللي بتخلي [[@/*]] تشاور على [[./src/*]])، و [[next-env.d.ts]] (Next بيكتبه لوحده، وأول سطر تعليق فيه بيقول [[This file should not be edited]])، و [[.next/]] (ناتج البناء، وموجود في [[.gitignore]])، و [[AGENTS.md]] (تعليمات لأدوات الـ AI، لو وافقت عليه).

---

## ٦. [[npx next info]]

هنا [[npx]] بيشغّل [[next]] المتسطب في المشروع نفسه (مش بينزّل حاجة)، و [[info]] بيطبع معلومات البيئة:

~~~text الناتج
Operating System:
  Platform: win32
  Arch: x64
  Version: Windows 11 Home Single Language
  Available memory (MB): 32175
  Available CPU cores: 16
Binaries:
  Node: 24.19.0
  npm: 11.17.0
Relevant Packages:
  next: 16.4.0 // Latest available version is detected (16.4.0).
  react: 19.3.0
  react-dom: 19.3.0
  typescript: 5.9.3
~~~

[[win32]] اسم ويندوز عند Node حتى لو 64 بت، و [[x64]] نوع المعالج. وسطر [[Latest available version is detected]] بيقولك إنك على آخر نسخة. لما تفتح issue على GitHub بتاع Next، الفورم بيطلب الناتج ده بالظبط.

---

## الحل: الصفحتين و [[npm run build]]

بعد ما كتبنا [[page.tsx]] و [[about/page.tsx]] زي الـ solCode، [[curl localhost:5820/about]] رجّع [[<h1>مين إحنا</h1>]] في الـ HTML. وده ناتج [[npx next build]]:

~~~text الناتج
▲ Next.js 16.4.0 (Turbopack)
  Creating an optimized production build ...
✓ Compiled successfully in 3.5s
  Running TypeScript ...
  Finished TypeScript in 2.0s ...
✓ Generating static pages using 6 workers (5/5) in 725ms

Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /about

○  (Static)  prerendered as static content
~~~

- [[Running TypeScript]]: الـ build بيفحص الأنواع، ولو فيه غلطة بيقف (dev مش بيعمل كده).
- [[○]] يعني Static: الصفحة اترسمت HTML وقت الـ build، ومع كل طلب بيتبعت نفس الملف.
- [[/_not-found]]: صفحة الـ 404 الافتراضية، Next بيضيفها لوحده.
- [[6 workers]]: الـ build بيستخدم كذا process عشان يبني الصفحات مع بعض.

## الخلاصة

- [[npx create-next-app@latest]] بيعمل المشروع، وكل سؤال ليه flag. وقول **لأ** لـ Cache Components ([[--no-cache-components]]) لحد ما نوصل للفئة بتاعته.
- [[npm run dev]] للتطوير (بيبني الصفحة لما تتطلب، و Fast Refresh من غير reload)، و [[npm run build]] ثم [[npm start]] للإنتاج.
- الصفحة = فولدر جوه [[app]] فيه [[page.tsx]] بيعمل [[export default]].
- [[npx next info]] أول حاجة تبعتها لما تسأل عن مشكلة.`,
          lines: [
            "بيسألك الأسئلة واحد واحد ويعمل فولدر اسمه shop.",
            R`نفس الحاجة من غير أسئلة: كل اختيار flag. و [[--no-cache-components]] لازم تكتبه، لأن لو مكتبتهوش، Next 16.4 بيشغّل Cache Components لوحده.`,
            "ادخل المشروع.",
            R`شغّل dev server على [[localhost:3000]]. من Next 16 بيشتغل بـ Turbopack افتراضيًا.`,
            R`هتلاقي [[layout.tsx]] و [[page.tsx]] و [[globals.css]] و [[favicon.ico]]، و public فيها صور SVG. ده في bash و Git Bash، وفي PowerShell اكتبها بفاصلة: [[ls src/app, public]].`,
            "بيطبع نسخ Next و React و Node ونظامك. أول حاجة تبعتها لو بتسأل عن مشكلة أو بتفتح issue."
          ],
          sol: R`بعد ما تحفظ [[page.tsx]] المتصفح بيتحدث لوحده (Fast Refresh) من غير reload، والصفحة كلها بقت «أهلًا» بس. و [[/about]] بتفتح على طول لأن فولدر [[about]] جواه [[page.tsx]] بيعمل [[export default]] لكومبوننت. ولو عملت [[npm run build]] هتلاقي في الجدول [[○ /]] و [[○ /about]]: الاتنين static.

لو [[/about]] طلعت 404: اتأكد إن الملف اسمه [[page.tsx]] بالظبط (مش [[About.tsx]] ولا [[index.tsx]])، وإنه جوه [[src/app/about]] مش فولدر [[app]] تاني في الجذر. ولو طلع خطأ إن الصفحة مش React component، يبقى نسيت [[export default]].`,
          solCode: R`// src/app/page.tsx
export default function Home() {
  return <h1>أهلًا</h1>;
}
// src/app/about/page.tsx
export default function About() {
  return <h1>مين إحنا</h1>;
}`
        },
        {
          cmd: "App Router",
          title: "App Router ولا Pages Router: الفرق إيه؟",
          desc: R`Next فيه نظامين للراوتنج. القديم Pages Router: فولدر [[pages/]]، والداتا بتيجي من [[getServerSideProps]] و [[getStaticProps]]، وكل الكومبوننتات بتتبعت للمتصفح. والجديد App Router (من Next 13، وده الافتراضي): فولدر [[app/]]، مبني على React Server Components، والكومبوننت نفسه [[async]] وبيجيب الداتا.

المشاريع الجديدة App Router. و Pages Router لسه مدعوم، فهتقابله في مشاريع قديمة، والاتنين ممكن يعيشوا في نفس المشروع وانت بتنقل صفحة صفحة.`,
          example: R`// Pages Router: pages/products/[id].tsx
export async function getServerSideProps({ params }) {
  const product = await getProduct(params.id);
  return { props: { product } };
}
export default function ProductPage({ product }) {
  return <h1>{product.name}</h1>;
}
// App Router: app/products/[id]/page.tsx
export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProduct(id);
  return <h1>{product.name}</h1>;
}`,
          try: R`في مشروع الـ lab اعمل [[src/app/products/[id]/page.tsx]] زي النص التاني (خلي [[getProduct]] ترجع [[{ name: "كتاب " + id }]]). افتح [[/products/5]]، واعمل View Source: هتلاقي الـ h1 في الـ HTML نفسه. وبعدين اعمل [[npm run build && npm start]] وافتح DevTools > Sources ودوّر على كلمة getProduct: مش هتلاقيها. (في dev ممكن تلاقيها، لأن Next بيبعت source maps بتاعة السيرفر عشان رسايل الأخطاء.)`,
          flag: "script",
          deep: {
            why: "لو هتشتغل على مشاريع موجودة هتقابل الاتنين، ولازم تعرف تقرا كل واحد. والفرق مش شكل الفولدرات بس: هو فرق في مكان تشغيل الكود وكمية الـ JS اللي بتروح للمتصفح.",
            how: R`في Pages Router كل صفحة client component: الكود كله بيتبعت للمتصفح، وبيترسم على السيرفر HTML (SSR)، وبعدين المتصفح بيشغّله تاني عشان يربط الـ events (hydration). والداتا بتيجي بدالة منفصلة، وبتتبعت JSON جوه الصفحة.

في App Router الافتراضي Server Components: الكومبوننت بيشتغل على السيرفر بس، وبيقدر يكلّم الداتابيز مباشرة، والكود بتاعه مبيوصلش للمتصفح. والحتت التفاعلية بس هي اللي بتعلّمها [[use client]]. وفوق كده layouts متداخلة، و streaming، و Server Actions، والكاش الجديد، وكلهم مش موجودين في pages.

المقابلات السريعة: [[getServerSideProps]] بقت async component بيقرا داتا dynamic، و [[getStaticProps]] بقت async component مع كاش، و [[getStaticPaths]] بقت [[generateStaticParams]]، و [[_app.tsx]] و [[_document.tsx]] بقوا [[app/layout.tsx]]، و [[pages/api]] بقت [[route.ts]]، و [[next/router]] بقت [[next/navigation]].

لو نفس المسار موجود في الاتنين، ده خطأ في الـ build. والتنقل بين صفحة في app وصفحة في pages بيعمل reload كامل.`,
            when: R`App Router لأي حاجة جديدة. Pages Router لو بتصلّح مشروع قايم عليه، والنقل يبقى تدريجي: route route، والأسهل تبدأ بالصفحات الـ static.`,
            mistakes: R`تستورد [[useRouter]] من [[next/router]] جوه app فيطلع خطأ «NextRouter was not mounted»: الصح [[next/navigation]]. وتكتب [[getServerSideProps]] في app، و Next بيطلّع خطأ إنها مش مدعومة هناك. وتحط [[use client]] فوق كل صفحة عشان «تشتغل زي pages»، فتخسر أهم ميزة في App Router.`
          },
          teach: R`## الفكرة: نفس الصفحة مكتوبة مرتين

المثال صفحة منتج واحدة: الأول بـ Pages Router (النظام القديم)، وبعدين بـ App Router (الجديد). هنقرا كل واحدة سطر سطر، وبعدين نشغّلهم الاتنين في نفس المشروع ونشوف إيه اللي بيوصل للمتصفح فعلًا. كله اتشغّل على Next 16.4 على ويندوز، بـ [[next build]] و [[next start]] و [[curl]].

---

## ١. Pages Router: [[pages/products/[id].tsx]]

### مكان الملف

في Pages Router الملف نفسه هو الـ route: [[pages/products/[id].tsx]] يبقى [[/products/5]]. والقوسين المربعين [[[id]]] معناهم «أي قيمة هنا»، والقيمة بتوصل باسم [[id]].

### [[export async function getServerSideProps({ params })]]

- [[export]]: لازم تتصدّر عشان Next يلاقيها.
- [[getServerSideProps]]: اسم محجوز. Next بيشغّل الدالة دي **على السيرفر** مع كل طلب، قبل ما يرسم الصفحة. (SSP = Server Side Props.)
- [[{ params }]]: Next بيدّيها object فيه [[params]]، وجواه [[id]] من الـ URL.

### [[const product = await getProduct(params.id);]]

بتجيب المنتج. هنا [[params]] object عادي، فـ [[params.id]] بتشتغل على طول.

### [[return { props: { product } };]]

لازم ترجّع object فيه [[props]]. اللي جوه [[props]] Next بيدّيه للكومبوننت، **وكمان** بيكتبه JSON جوه الصفحة عشان المتصفح يستخدمه تاني.

### [[export default function ProductPage({ product })]]

الكومبوننت نفسه، دالة عادية (مش [[async]]) بتاخد [[product]] جاهز وترسمه.

---

## ٢. App Router: [[app/products/[id]/page.tsx]]

### مكان الملف

هنا الـ route **فولدر**: [[app/products/[id]/]]، والصفحة الملف اللي اسمه [[page.tsx]] جواه.

### [[export default async function ProductPage({ params }: PageProps<"/products/[id]">)]]

- الكومبوننت نفسه [[async]]: ده Server Component، ومسموح له يستنى داتا.
- [[PageProps<"/products/[id]">]]: نوع TypeScript جاهز من Next، بتديله المسار فيعرف إن [[params]] جواها [[id]] من نوع string. مش محتاج import، Next بيولّده (شفنا [[Generating route types]] في درس create-next-app).

### [[const { id } = await params;]]

من Next 15 [[params]] بقت Promise، فلازم [[await]]. والقوسين [[{ id }]] بيطلّعوا [[id]] من الـ object (destructuring).

### [[const product = await getProduct(id);]]

الداتا بتتجاب **جوه الكومبوننت نفسه**. مفيش دالة منفصلة، ومفيش [[props]].

### [[return <h1>{product.name}</h1>;]]

نفس العرض بالظبط.

---

## ٣. شغّلناهم الاتنين في نفس المشروع

حطينا صفحة الـ App Router في [[src/app/products/[id]/page.tsx]] (زي الـ solCode)، ونفس صفحة الـ Pages Router في [[src/pages/old/[id].tsx]]، وعملنا [[npx next build]]:

~~~text الناتج
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
└ ƒ /products/[id]

Route (pages)
─ ƒ /old/[id]

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
~~~

الاتنين عايشين مع بعض، وكل واحد في جدول. والاتنين [[ƒ]] يعني Dynamic: بيترسموا مع كل طلب، لأن الـ [[id]] مش معروف وقت الـ build.

### الـ HTML: الاتنين واحد

بعد [[next start]]، [[curl localhost:5820/products/5]] و [[curl localhost:5820/old/5]] الاتنين فيهم:

~~~text الناتج
<h1>كتاب 5</h1>
~~~

يعني الاتنين اترسموا على السيرفر. الفرق في اللي **اتبعت معاه**.

### Pages Router بيبعت الداتا والكود

صفحة [[/old/5]] فيها الـ script ده:

~~~text الناتج
<script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"product":{"name":"كتاب 5"}},"__N_SSP":true},"page":"/old/[id]","query":{"id":"5"},...}</script>
~~~

دي الـ [[props]] اللي رجعتها [[getServerSideProps]]، مكتوبة JSON. وفي [[.next/static/chunks]] (الملفات اللي بتروح للمتصفح) لقينا كود الكومبوننت نفسه:

~~~text الناتج
function({product:o}){return(0,t.jsx)("h1",{children:o.name})}
~~~

يعني المتصفح بينزّل الكومبوننت والداتا، ويشغّله تاني عشان يربطه بالصفحة (ده الـ hydration). أما [[getServerSideProps]] و [[getProduct]] فـ Next شالهم من الملف ده، لأنهم بيشتغلوا على السيرفر بس.

### App Router بيبعت الناتج بس

في صفحة [[/products/5]] مفيش [[__NEXT_DATA__]]. بدالها حاجة اسمها RSC payload (RSC = React Server Components)، وده الجزء بتاع الكومبوننت فيها:

~~~text الناتج
9:["$","h1",null,{"children":"كتاب 5"}]
~~~

ده **ناتج** الكومبوننت: «عنصر [[h1]] جواه كتاب 5». مش الكود. ودوّرنا على [[getProduct]] في كل [[.next/static]]: صفر نتايج. موجودة بس في [[.next/server]] (ملفات السيرفر).

---

## ٤. نفس المسار في الاتنين: خطأ

عملنا [[src/pages/products/[id].tsx]] جنب [[src/app/products/[id]/page.tsx]]:

~~~text الناتج
Error: App Router and Pages Router both match path: /products/[id]
Next.js does not support having both App Router and Pages Router routes matching the same path. Please remove one of the conflicting routes.
~~~

فلما تنقل صفحة من pages لـ app، امسح القديمة في نفس الخطوة.

---

## جدول المقارنة

| | Pages Router | App Router |
|---|---|---|
| الفولدر | [[pages/]] | [[app/]] |
| الـ route | الملف نفسه ([[[id].tsx]]) | فولدر وجواه [[page.tsx]] |
| جلب الداتا | [[getServerSideProps]] منفصلة | جوه الكومبوننت [[async]] |
| [[params]] | object عادي | Promise ([[await params]]) |
| بيوصل للمتصفح | الكومبوننت + الداتا JSON | الناتج بس (RSC payload) |
| التنقل | [[next/router]] | [[next/navigation]] |

## الخلاصة

- App Router لأي مشروع جديد، و Pages Router هتقابله في مشاريع قديمة.
- في App Router الكومبوننت نفسه بيجيب الداتا، والكود بتاعه مبيروحش للمتصفح.
- [[params]] Promise، فـ [[await]] دايمًا.
- الاتنين ينفعوا مع بعض في نفس المشروع، بس مش لنفس المسار.`,
          lines: [
            R`دالة خاصة بتشتغل على السيرفر مع كل طلب، منفصلة عن الكومبوننت.`,
            "بتجيب الداتا.",
            R`وبترجعها جوه [[props]]، فتتحوّل JSON وتتبعت للمتصفح.`,
            "قفلة.",
            "الكومبوننت بياخد الداتا جاهزة. الكود ده كله بيتبعت للمتصفح ويعمل hydration.",
            "يعرض.",
            "قفلة.",
            R`نفس الصفحة في App Router: الكومبوننت نفسه [[async]]، و [[PageProps]] نوع جاهز من Next.`,
            R`[[params]] بقت Promise من Next 15، فلازم [[await]].`,
            "بيجيب الداتا جوه الكومبوننت مباشرة.",
            "بيعرض. الكومبوننت ده مش بيتبعت للمتصفح أصلًا، الـ HTML الناتج بس.",
            "قفلة."
          ],
          sol: R`[[/products/5]] بتعرض «كتاب 5»، وفي View Source الـ [[<h1>كتاب 5</h1>]] موجود في الـ HTML نفسه، يعني السيرفر هو اللي رسم. وفي جدول الـ build هتلاقي [[ƒ /products/[id]]]: dynamic، لأن الـ id مش معروف وقت الـ build. ودوّرت على [[getProduct]] في ملفات [[.next/static]] (اللي بتروح للمتصفح): مش موجودة خالص، موجودة في ملفات السيرفر بس.

لو لقيت [[getProduct]] في Sources: غالبًا انت على [[npm run dev]] (source maps بتاعة السيرفر)، أو حاطط [[use client]] فوق الصفحة فبقت كلها بتتبعت للمتصفح. ولو TypeScript اعترض على [[params.id]]: نسيت [[await params]].`,
          solCode: R`// src/app/products/[id]/page.tsx
async function getProduct(id: string) {
  return { name: "كتاب " + id };
}
export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProduct(id);
  return <h1>{product.name}</h1>;
}`
        },
        {
          cmd: "dev server قديم و .next",
          title: "غيّرت الـ CSS ومفيش حاجة اتغيّرت حتى بعد Hard Reload: انت فاتح سيرفر قديم، مش كاش",
          desc: R`غيّرت ألوان الثيم في [[globals.css]]، وعملت Ctrl+Shift+R، واللون لسه القديم. قبل ما تمسح كاش المتصفح أو [[.next]]: **اقرا أول سطور [[npm run dev]]**. لو فيها [[Port 3000 is in use by an unknown process, using available port 3001 instead]]، يبقى فيه سيرفر قديم (من فولدر تاني أو نسخة قديمة من المشروع) لسه ماسك 3000، وانت فاتح **هو** في المتصفح، والجديد شغّال على 3001 ومحدش فاتحه.

الترتيب: (١) مين ماسك البورت ومن أنهي فولدر ([[cat .next/dev/lock]]، و [[ss -ltnp]] أو [[netstat -ano]])، (٢) قارن الـ CSS اللي كل سيرفر بيقدّمه بـ [[curl]] و [[grep]] على اللون نفسه، (٣) اقفل القديم ([[kill]] أو [[taskkill //PID 6284 //F]] في Git Bash أو [[Stop-Process]])، (٤) لو لسه فيه حاجة غريبة: اقفل السيرفر و [[rm -rf .next]] وشغّل تاني. ومن Next 16.4 لو شغّلت سيرفر تاني **من نفس الفولدر** بيرفض ويقولك PID القديم بنفسه.`,
          example: R`# Linux and Mac (and Git Bash):
cat .next/dev/lock
CSS_URL=$(curl -s http://localhost:3000/ar | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1)
curl -s "http://localhost:3000$CSS_URL" | grep -oE "(6366f1|0ea5e9)" | sort -u
ss -ltnp 'sport = :3000'
readlink /proc/3579/cwd
kill 3579
rm -rf .next && npm run dev
# Windows (Git Bash):
netstat -ano | findstr :3000
taskkill //PID 6284 //F
# Windows (PowerShell):
Get-NetTCPConnection -LocalPort 3000 | Select-Object LocalAddress, State, OwningProcess
(Get-CimInstance Win32_Process -Filter "ProcessId=6284").CommandLine
Stop-Process -Id 6284 -Force
Remove-Item -Recurse -Force .next; npm run dev`,
          lines: [
            R`Next 16 بيكتب ملف [[lock]] جوه [[.next/dev]] فيه [[pid]] و [[port]] بتاع سيرفر الـ dev الشغّال **من الفولدر ده**. لو الملف مش موجود، يبقى مفيش سيرفر شغّال من هنا (بس ممكن يكون فيه واحد من فولدر تاني).`,
            R`هات الصفحة من البورت، وطلّع منها رابط ملف الـ CSS اللي الصفحة بتطلبه: [[-o]] الجزء اللي طابق بس، و [[head -1]] أول واحد. والنتيجة بتتحط في متغير [[CSS_URL]].`,
            R`هات ملف الـ CSS نفسه من **نفس السيرفر**، ودوّر فيه على اللون القديم والجديد. اللي يطلع هو اللي السيرفر ده بيقدّمه فعلًا، بغض النظر عن المتصفح وكاشه.`,
            R`لينكس: مين بيسمع على 3000؟ [[-l]] اللي بيسمعوا بس، و [[-t]] TCP، و [[-n]] أرقام من غير أسامي، و [[-p]] اسم البرنامج والـ PID، والفلتر [[sport = :3000]] البورت ده بس.`,
            R`لينكس: الفولدر اللي البرنامج ده شغّال منه ([[cwd]] = current working directory). ده اللي بيقولك «ده السيرفر القديم من النسخة التانية».`,
            R`ابعت للبرنامج إشارة يقفل ([[SIGTERM]]). Next بيقفل نفسه وبيسيب البورت.`,
            R`امسح ناتج البناء والكاش بتاع Next وابدأ من الأول. [[&&]] يعني التاني يشتغل بس لو الأول نجح. اعمل ده **والسيرفر مقفول**.`,
            R`ويندوز: كل الاتصالات اللي فيها 3000، وآخر عمود الـ PID. السطر اللي فيه [[0.0.0.0:3000]] أو [[[::]:3000]] في العمود التاني هو السيرفر نفسه.`,
            R`ويندوز من Git Bash: اقفل البرنامج ده بالقوة. الشرطتين [[//]] عشان Git Bash ميحوّلش [[/PID]] لمسار فايل.`,
            R`PowerShell: مين ماسك 3000، و [[OwningProcess]] هو الـ PID.`,
            R`PowerShell: سطر الأمر الكامل للبرنامج. فيه مسار [[node_modules\next\...]] جوه فولدر المشروع، فبتعرف هو من أنهي فولدر.`,
            R`PowerShell: اقفل البرنامج، و [[-Force]] من غير ما يسأل.`,
            R`PowerShell: امسح [[.next]] كله ([[-Recurse]] كل اللي جواه)، وبعدين شغّل dev. [[;]] بتشغّل التاني حتى لو الأول فشل، فاتأكد إن المسح نجح.`,
          ],
          try: R`اعمل نسخة من مشروعك في فولدر تاني ([[cp -r shop shop-old]] من غير [[node_modules]] وبعدين [[npm ci]] جواه) وشغّلها بـ [[npm run dev]]. ارجع للمشروع الأصلي وغيّر لون في [[globals.css]] وشغّل [[npm run dev]]. اقرا أول ٣ سطور، وافتح [[localhost:3000]]: اللون إيه؟ وطبّق الخطوات بالترتيب لحد ما اللون الجديد يظهر على 3000.`,
          flag: "term",
          teach: R`## العَرَض

غيّرت ألوان الـ brand في [[globals.css]] من بنفسجي ([[#6366f1]]) لأزرق ([[#0ea5e9]])، وحفظت، والصفحة على [[localhost:3000]] لسه بنفسجي. عملت Hard Reload، وفتحت Incognito: لسه بنفسجي. وأول حاجة بتيجي في بالك «الكاش»، فبتمسح كاش المتصفح وبعدين [[.next]]، ومفيش فايدة.

---

## المعمل

مشروع Next 16.4.4 فيه صفحة [[/ar]] و [[/en]] و [[/]] بتحوّل لـ [[/ar]]، والألوان في [[globals.css]]:

~~~css app/globals.css (قبل)
:root { --brand: #6366f1; --accent: #f97316; }
.btn { background: var(--brand); color: white; padding: 8px 16px; }
.hero { color: var(--accent); }
~~~

واتعمل مرتين: على لينكس في [[docker run node:22-slim]] (Node 22.23) بالبورتات 3000 و 3001، وعلى ويندوز 11 (Node 24.22، و Git Bash و PowerShell 7.6 و 5.1) بالبورتات 4310 و 4311، لأن 3000 كان عليه سيرفر تاني على الجهاز أصلًا (وده نفسه العَرَض: [[curl localhost:3000]] رجّع صفحة مش بتاعتنا خالص).

عشان نعيد الحالة: عملنا نسخة من المشروع في فولدر [[/old]] **قبل** تعديل الألوان، وشغّلناها، وبعدين عدّلنا الألوان في المشروع الأصلي وشغّلنا [[npm run dev]].

---

## ١. اقرا أول سطور [[npm run dev]] (أهم خطوة ومحدش بيعملها)

~~~text npm run dev (في المشروع الأصلي)
> app@1.0.0 dev
> next dev

⚠ Port 3000 is in use by an unknown process, using available port 3001 instead.
▲ Next.js 16.4.4 (Turbopack)
- Local:         http://localhost:3001
~~~

السطر الأصفر بيقول كل حاجة: 3000 مشغول، فالسيرفر **الجديد** اشتغل على 3001. وانت لسه فاتح 3000 في المتصفح، يعني بتكلّم السيرفر القديم اللي بيقرا من فولدر [[/old]] اللي فيه الألوان القديمة. Hard Reload بيجيب نسخة جديدة **من نفس السيرفر**، ومسح [[.next]] في الفولدر الأصلي ملوش دعوة بالسيرفر التاني. عشان كده مفيش حاجة نفعت.

### ولو السيرفرين من نفس الفولدر؟

Next 16.4 بقى بيمسك الحالة دي بنفسه. شغّلنا [[npm run dev]] تاني في نفس الفولدر والأول شغّال:

~~~text الناتج (لينكس)
⚠ Port 3000 is in use by an unknown process, using available port 3001 instead.
▲ Next.js 16.4.4 (Turbopack)
- Local:         http://localhost:3001
✓ Ready in 390ms
⨯ Another next dev server is already running.

- Local:        http://localhost:3000
- PID:          3331
- Dir:          /app
- Log:          .next/dev/logs/next-development.log

You can access the existing server at http://localhost:3000,
or run kill 3331 to stop it and start a new one.
~~~

ورقم الخروج [[1]]. وعلى ويندوز نفس الرسالة بس آخر سطر [[or run taskkill /PID 12120 /F to stop it and start a new one.]] (والأمر ده بالشكل ده **مش هيشتغل في Git Bash**، شوف خطوة ٤). لاحظ إن [[Ready in]] اتطبع **قبل** الخطأ، ودي هتفرق في الدرس الجاي (الانتظار لحد ما السيرفر يجهز).

الرسالة بتعرف ده منين؟ من ملف [[.next/dev/lock]]:

~~~text cat .next/dev/lock
{"pid":3331,"port":3000,"hostname":"localhost","appUrl":"http://localhost:3000","startedAt":1793704933191}
~~~

يعني القديم من نفس الفولدر = Next بيقولك. القديم من **فولدر تاني** (نسخة قديمة، أو worktree، أو مشروع تاني خالص) = مجرد [[Port 3000 is in use]] وبيكمّل على 3001. وفي Next 15 وأقدم مفيش الحماية دي خالص.

> ملحوظة PowerShell: [[Get-Content .next\dev\lock]] والسيرفر شغّال طلّع [[The process cannot access the file '...\.next\dev\lock' because it is being used by another process.]] على 7.6 و 5.1، بينما [[cat]] في Git Bash قراه عادي. لو احتجته من PowerShell، اقراه من Git Bash أو استخدم خطوة ٣.

---

## ٢. اثبت بالـ CSS نفسه، من غير متصفح

~~~bash
for port in 3000 3001; do
  CSS_URL=$(curl -s http://localhost:$port/ar | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1)
  echo "$port CSS_URL=$CSS_URL"
  curl -s "http://localhost:$port$CSS_URL" | grep -oE "(6366f1|f97316|0ea5e9|22c55e)" | sort -u
done
~~~

~~~text الناتج (لينكس)
3000 CSS_URL=/_next/static/chunks/app_globals_0yg4wg8plh8sv.css
6366f1
f97316
3001 CSS_URL=/_next/static/chunks/app_globals_0yg4wg8plh8sv.css
0ea5e9
22c55e
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[curl -s URL]] | يجيب الـ HTML من غير شريط التحميل |
| [[grep -oE '/_next/static/chunks/[^"]+\.css']] | يطلّع رابط ملف الـ CSS: [[[^"]+]] أي حروف لحد علامة التنصيص، و [[\.css]] نقطة عادية وبعدها css |
| [[head -1]] | أول رابط بس، لو الصفحة فيها أكتر من ملف |
| [[grep -oE "(a\|b)"]] | يطلّع كل لون لقاه من اللستة، كل مرة في سطر |
| [[sort -u]] | يرتّب ويشيل المكرر، فكل لون يظهر مرة واحدة |

اسم الملف **نفسه** على السيرفرين ([[app_globals_0yg4wg8plh8sv.css]]) والمحتوى مختلف. يعني من الرابط لوحده مش هتعرف، ولازم تدوّر على اللون جوه الملف. وعلى ويندوز (Git Bash) نفس الأمر بالظبط طلّع نفس النتيجة على 4310 (القديم: [[6366f1]] و [[f97316]]) و 4311 (الجديد: [[0ea5e9]] و [[22c55e]])، والملف اسمه [[app_globals_css_20o3uo5wggppq.css]] على الاتنين.

> ليه مش DevTools؟ تنفع، بس [[curl]] بيلغي المتصفح وكاشه وإضافاته من المعادلة. لو [[curl]] جاب القديم، المشكلة في السيرفر مش في المتصفح.

---

## ٣. مين ماسك البورت، ومن أنهي فولدر؟

### لينكس: [[ss]]

~~~text ss -ltnp
LISTEN 0      511                *:3000            *:*    users:(("next-server (v1",pid=3579,fd=19))
LISTEN 0      511                *:3001            *:*    users:(("next-server (v1",pid=3649,fd=19))
~~~

اسم البرنامج [[next-server (v16.4.4)]] (اتقطع لـ 15 حرف)، و [[pid=3579]]. ومن أنهي فولدر:

~~~text readlink /proc/3579/cwd
/old
~~~

كل برنامج على لينكس ليه فولدر [[/proc/<pid>]]، و [[cwd]] جواه link للفولدر اللي شغّال منه. [[/old]] = النسخة القديمة. اتمسك.

وعشان تاخد الـ PID في متغير (للسكربت):

~~~bash
PID=$(ss -ltnpH 'sport = :3000' | grep -oE 'pid=[0-9]+' | cut -d= -f2 | head -1)
~~~

[[-H]] من غير سطر العناوين، و [[cut -d= -f2]] اللي بعد [[=]].

جربنا كمان [[lsof -nP -iTCP:3000 -sTCP:LISTEN]] جوه الكونتينر: مطلّعش حاجة ورقم خروجه [[1]] رغم إن البورت مفتوح. على جهاز لينكس عادي [[lsof]] شغّال، بس في الكونتينر [[ss]] كان الأضمن. و [[node:22-slim]] أصلًا مفيهوش [[ss]] ولا [[ps]] ولا [[pkill]] ولا [[curl]]: اتسطبوا بـ [[apt-get install -y curl procps iproute2 lsof psmisc]].

### ويندوز من Git Bash: [[netstat]]

~~~text netstat -ano | findstr :4310
  TCP    0.0.0.0:4310           0.0.0.0:0              LISTENING       6284
  TCP    [::]:4310              [::]:0                 LISTENING       6284
  TCP    [::1]:64907            [::1]:4310             TIME_WAIT       0
~~~

| العمود | معناه |
|---|---|
| [[0.0.0.0:4310]] | العنوان المحلي: بيسمع على كل الكروت على البورت ده. ده السيرفر |
| [[0.0.0.0:0]] | الطرف التاني: مفيش، لأنه مستني اتصالات |
| [[LISTENING]] | الحالة: بيستنى |
| [[6284]] | الـ PID |
| سطور [[TIME_WAIT]] | اتصالات قديمة اتقفلت (طلبات [[curl]] بتاعتك). PID بتاعها [[0]] وملهاش دعوة |

> فخّين اتقابلوا فعلًا: (١) [[findstr :3000]] بيلقط كمان [[:30001]] وأي سطر فيه 3000 في الطرف التاني، فاقرا العمود التاني. (٢) على جهاز الاختبار (Windows 11 build 26300) [[netstat]] كان **أحيانًا** بيكتب [[CLOSED]] بدل [[LISTENING]] لنفس السيرفر وهو شغّال، و [[Get-NetTCPConnection]] كتب [[Closed]] برضه. فمتعتمدش على كلمة الحالة: البورت في العمود التاني + الـ PID + [[curl]] بيرد = ده هو.

### ويندوز من PowerShell

~~~text Get-NetTCPConnection -LocalPort 4311 | Select-Object LocalAddress, LocalPort, State, OwningProcess
LocalAddress LocalPort  State OwningProcess
------------ ---------  ----- -------------
::                4311 Listen         39312
~~~

~~~text (Get-CimInstance Win32_Process -Filter "ProcessId=6284").CommandLine
"C:\Program Files\nodejs\node.exe" C:\Users\you\...\shop-old\node_modules\next\dist\server\lib\start-server.js
~~~

ويندوز معندوش [[/proc/<pid>/cwd]]، بس سطر الأمر فيه مسار [[node_modules]] جوه فولدر المشروع: [[shop-old]] = النسخة القديمة. و [[Get-NetTCPConnection]] و [[Get-CimInstance]] اشتغلوا بنفس الشكل في 7.6 و 5.1.

---

## ٤. اقفل القديم

### لينكس

~~~bash
kill 3579
~~~

ومن غير PID: [[fuser -k 3000/tcp]] بيقفل اللي ماسك البورت ([[fuser]] من باكدج [[psmisc]])، وطبع [[3000/tcp: 3579]] واتقفل.

> فخ [[pkill -f "next dev"]]: شغّلناه جوه [[bash -c '...; pkill -f "next dev"; ...']]، فقفل **الـ bash نفسه** ورقم الخروج بقى [[143]] (= اتقفل بإشارة 15، SIGTERM). [[-f]] بيدوّر في سطر الأمر كله، وسطر الـ bash فيه الكلمتين. وفي [[node:22-slim]] من غير [[procps]] الأمر مش موجود أصلًا: [[sh: 1: pkill: not found]] ورقم الخروج [[127]]. اقفل بالـ PID أو بالبورت، مش بالاسم.

### ويندوز من Git Bash: الشرطتين

~~~text taskkill /PID 6284 /F   (في Git Bash)
ERROR: Invalid argument/option - 'C:/Program Files/Git/PID'.
Type "TASKKILL /?" for usage.
~~~

Git Bash بيفتكر أي حاجة أولها [[/]] مسار لينكس، فبيحوّلها لمسار ويندوز قبل ما يبعتها: [[/PID]] بقت [[C:/Program Files/Git/PID]]. الحل [[//PID]] (الشرطة الزيادة بتقوله «سيبها زي ما هي»):

~~~text taskkill //PID 6284 //F
SUCCESS: The process with PID 6284 has been terminated.
~~~

ولو شغّلته تاني: [[ERROR: The process "6284" not found.]] ورقم الخروج [[128]]. ونفس الفخ بيضرب في أوامر تانية اتقابلت في نفس اليوم:

| الأمر في Git Bash | اللي حصل | الحل |
|---|---|---|
| [[findstr /V TIME_WAIT]] | [[FINDSTR: Cannot open TIME_WAIT]]: الـ [[/V]] اتحوّلت لمسار، فـ TIME_WAIT بقت اسم ملف | [[findstr //V TIME_WAIT]] |
| [[docker run -w /app ...]] | [[the working directory 'C:/Program Files/Git/app' is invalid, it needs to be an absolute path]] | [[MSYS_NO_PATHCONV=1 docker run -w /app ...]] |

[[MSYS_NO_PATHCONV=1]] قبل الأمر بيقفل التحويل للأمر ده كله.

### ويندوز من PowerShell

~~~powershell
Stop-Process -Id 6284 -Force
~~~

مفيش مشكلة الشرطة هنا. و [[taskkill /PID 6284 /F]] بالشكل العادي شغّال في PowerShell و cmd.

---

## ٥. لو لسه فيه حاجة غريبة: [[.next]]

[[.next]] فيه ناتج البناء وكاش Turbopack. نادرًا ما يبقى هو السبب (في المعمل ماحتجناهوش خالص: قفل السيرفر القديم كان كفاية)، بس لو بعد ما قفلت كل السيرفرات لسه فيه سلوك غريب:

~~~bash
rm -rf .next && npm run dev
~~~

**والسيرفر مقفول.** مسحناه والسيرفر شغّال عشان نشوف:

~~~text الناتج (لينكس، في لوج السيرفر الشغّال)
⨯ The directory at "/app/.next/dev" was deleted.

Deleting this directory removes caches and will cause slower performance.

Deleting this directory while Next.js is running can lead to undefined behavior. Restarting the server to recover...
~~~

Next عمل restart لنفسه (وعلى ويندوز الـ PID اتغيّر من 9648 لـ 39312 بعدها). يعني مش كارثة، بس «undefined behavior». ومع [[curl]] وقت الـ restart رجّع [[000]] (مفيش اتصال خالص).

وفي PowerShell [[rm -rf]] مش موجود بالشكل ده، والمكافئ [[Remove-Item -Recurse -Force .next]] (اشتغل في 7.6 و 5.1). ولو حطيت [[rm -rf .next]] في سكربت في [[package.json]]:

~~~text npm run rmtest   (من PowerShell)
> rm -rf .next-test

'rm' is not recognized as an internal or external command,
operable program or batch file.
~~~

npm على ويندوز بيشغّل السكربتات بـ [[cmd.exe]]. ومن Git Bash نفس السكربت **اشتغل** لأن [[rm.exe]] بتاع Git في الـ PATH، فهتفتكره شغّال وهو مش شغّال عند زميلك. الشكل اللي اشتغل في الاتنين:

~~~json package.json
"clean": "node -e \"require('fs').rmSync('.next',{recursive:true,force:true})\""
~~~

---

## ٦. البورت المحدد بيفشل بدل ما يهرب

لو [[next dev -p 4310]] والبورت مشغول، Next **مبيدوّرش** على بورت تاني:

~~~text npx next dev -p 4310   (والقديم على 4310)
⨯ Failed to start server
Error: listen EADDRINUSE: address already in use :::4310
~~~

ورقم الخروج [[1]]. ده أحسن من الهروب الصامت لـ 3001: الخطأ في وشّك. عشان كده ممكن تحط [[-p 3000]] في سكربت [[dev]].

> في الحالة الأصلية الأمر خرج بـ [[exit code 4]] («Restart dev server clean failed with exit code 4»). في المعمل مقدرناش نطلّع 4: كل الفشل كان [[1]] ([[Another next dev server]] و [[EADDRINUSE]]). الرقم بيعتمد على الأداة اللي شغّلت الأمر، فاقرا اللوج مش الرقم.

---

## البدايل اللي اترفضت وليه

| البديل | ليه لأ |
|---|---|
| تمسح كاش المتصفح | المتصفح جاب نسخة **جديدة** من السيرفر الغلط. [[curl]] بيثبت ده |
| [[rm -rf .next]] على طول | الفولدر الغلط. والقديم شغّال من [[.next]] بتاعه هو |
| تعيد تشغيل الجهاز | بيحل، بس مبيعلّمكش إيه حصل، والمرة الجاية هتعيد تشغيله تاني |
| [[pkill node]] أو [[taskkill /IM node.exe /F]] | بيقفل **كل** برامج Node: سيرفرات تانية، و VS Code extensions، وأدوات شغّالة. اقفل بالـ PID |

## إزاي تتأكد إنها اتحلت

- [[npm run dev]] أول سطر فيه [[Local: http://localhost:3000]] من غير [[Port 3000 is in use]].
- [[curl]] على 3000 + [[grep]] على الألوان: الجديدة بس ([[0ea5e9]] و [[22c55e]]). ده اللي طلع في المعمل بعد [[fuser -k 3000/tcp 3001/tcp]] و [[rm -rf .next]] وتشغيل واحد.
- [[ss -ltnp]] أو [[netstat]]: سيرفر واحد بس.

## إزاي متتكررش

- اقرا أول ٣ سطور من [[npm run dev]] كل مرة: البورت.
- سيرفر dev واحد لكل مشروع، واقفل الترمنال القديم ([[Ctrl+C]]) قبل ما تفتح واحد جديد.
- [[next dev -p 3000]] في السكربت: يفشل بصوت عالي بدل ما يهرب لـ 3001.
- قبل ما تشك في الكاش: [[cat .next/dev/lock]] و [[curl | grep]] (دقيقة واحدة).

## الخلاصة

| الخطوة | لينكس / Git Bash | PowerShell |
|---|---|---|
| مين شغّال من الفولدر ده | [[cat .next/dev/lock]] | من Git Bash (الملف مقفول على PowerShell) |
| السيرفر بيقدّم إيه | [[curl -s URL \| grep -oE "لون"]] | [[curl.exe]] بنفس الشكل |
| مين ماسك البورت | [[ss -ltnp 'sport = :3000']] أو [[netstat -ano \| findstr :3000]] | [[Get-NetTCPConnection -LocalPort 3000]] |
| من أنهي فولدر | [[readlink /proc/PID/cwd]] | [[(Get-CimInstance Win32_Process -Filter "ProcessId=PID").CommandLine]] |
| اقفل | [[kill PID]] أو [[taskkill //PID PID //F]] | [[Stop-Process -Id PID -Force]] |
| ابدأ نضيف | [[rm -rf .next && npm run dev]] | [[Remove-Item -Recurse -Force .next; npm run dev]] |

> Hard Reload بيجيب نسخة جديدة من **نفس** السيرفر. لو السيرفر غلط، كل الكاش في الدنيا مش هيفرق.`,
          deep: {
            why: R`أكتر سبب لـ «عدّلت ومفيش حاجة اتغيّرت» في الشغل اليومي مش الكاش: سيرفر تاني. ترمنال اتنسي مفتوح، أو نسخة قديمة من المشروع في فولدر تاني، أو worktree. والوقت بيضيع في مسح كاش وإعادة تشغيل لأن السؤال الغلط اتسأل («ليه الكاش مش بيتمسح؟» بدل «أنا بكلّم مين؟»).`,
            how: R`[[next dev]] بيبدأ بالبورت 3000، ولو مشغول وانت مكتبتش [[-p]]، بيجرّب 3001 وهكذا، وبيكتب سطر تحذير واحد. وفي Next 16 بيكتب [[.next/dev/lock]] فيه الـ PID والبورت، فلو حد شغّل [[next dev]] تاني من نفس الفولدر، بيلاقي الملف ويرفض ([[Another next dev server is already running]]). والـ dev في 16 بيكتب في [[.next/dev]] منفصل عن ناتج [[next build]]، فجربنا [[next build]] والـ dev شغّال: البناء نجح ([[build-exit=0]]) والـ dev فضل شغّال. وملف الـ CSS في dev اسمه مش مبني على المحتوى، فنفس الاسم ممكن يتقدّم بمحتوى مختلف من سيرفرين.`,
            when: R`أي مرة التعديل مش ظاهر: CSS، أو نص، أو env جديد، أو [[next.config]]. وبالذات بعد ما تعمل نسخة من المشروع، أو [[git worktree]]، أو تفتح المشروع في ترمنال جديد من غير ما تقفل القديم، أو بعد ما أداة (زي agent أو IDE) شغّلت السيرفر في الخلفية.`,
            mistakes: R`تمسح كاش المتصفح و [[.next]] قبل ما تقرا أول سطر في الترمنال. [[taskkill /PID 123 /F]] في Git Bash (التحويل). [[pkill -f "next dev"]] جوه سكربت فيقفل السكربت نفسه. [[pkill node]] فيقفل كل حاجة. تمسح [[.next]] والسيرفر شغّال. [[rm -rf]] في سكربت npm وزميلك على PowerShell. وتعتمد على كلمة [[LISTENING]] في [[netstat]] لوحدها.`
          },
          sol: R`أول سطر من [[npm run dev]] في المشروع الأصلي: [[⚠ Port 3000 is in use by an unknown process, using available port 3001 instead.]]. على [[localhost:3000]] اللون القديم، وعلى 3001 الجديد. والإثبات:

[[curl]] + [[grep]] على CSS الـ 3000 بيطلّع [[6366f1]] (القديم)، وعلى 3001 [[0ea5e9]] (الجديد)، واسم ملف الـ CSS واحد على الاتنين.

[[ss -ltnp]] (لينكس) أو [[netstat -ano | findstr :3000]] (ويندوز) بيدّيك PID القديم، و [[readlink /proc/PID/cwd]] أو [[CommandLine]] بيوري إنه من فولدر [[shop-old]]. اقفله ([[kill PID]] أو [[taskkill //PID PID //F]] أو [[Stop-Process]])، واقفل الجديد كمان، وشغّل [[npm run dev]] مرة واحدة: [[Local: http://localhost:3000]]، و [[curl]] بيطلّع اللون الجديد بس. مسح [[.next]] مش لازم في الحالة دي.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[npm run dev]] طبع [[⚠ Port 3000 is in use by an unknown process, using available port 3001 instead.]] وبعدين [[✓ Ready in 412ms]]. انت فاتح [[localhost:3000]] وعدّلت [[globals.css]]. هتشوف التعديل؟ وليه Hard Reload مش هيفرق؟ اكتب الإجابة في سطرين قبل ما تجرب.`, done: R`كتبت إن 3000 سيرفر تاني (قديم) وإن Hard Reload بيجيب من نفس السيرفر الغلط، وجربتها بالنسخة القديمة وطلعت صح.` },
            { lvl: 'تطبيق', t: R`ابني المعمل: نسختين من مشروع Next في فولدرين، كل واحدة بلون مختلف في [[globals.css]]، شغّل الاتنين، واكتب حلقة [[for port in 3000 3001]] بتطبع لكل بورت: رابط الـ CSS واللون اللي جواه. وبعدين اقفل القديم بالـ PID (مش بالاسم) وأثبت إن 3000 بقى فاضي.`, done: R`الحلقة طبعت لونين مختلفين للبورتين، وبعد القفل [[ss -ltn]] أو [[netstat]] مفيهوش 3000 (أو [[curl]] بيرجّع [[000]]).` },
            { lvl: 'تطبيق', t: R`صلّح الأوامر البايظة دي في Git Bash من غير ما تغيّر الشِل: [[taskkill /PID 4321 /F]] و [[findstr /V TIME_WAIT]] و [[docker run --rm -w /app node:22-slim pwd]]. شغّل كل واحد واكتب الخطأ اللي طلع، وبعدين صلّحه.`, done: R`عندك ٣ أخطاء بنصها (فيها [[C:/Program Files/Git/...]] أو [[Cannot open]])، و ٣ أوامر مصلّحة ([[//PID]] و [[//V]] و [[MSYS_NO_PATHCONV=1]]) شغّالة: آخر واحد طبع [[/app]].` },
            { lvl: 'تطبيق', t: R`اكتب سكربت [[whoport.sh]] بياخد رقم بورت ويطبع: الـ PID، واسم البرنامج، والفولدر اللي شغّال منه. على لينكس بـ [[ss]] و [[/proc]]، وعلى ويندوز نسخة PowerShell بـ [[Get-NetTCPConnection]] و [[Get-CimInstance]]. ولو البورت فاضي يطبع [[free]] ويخرج بـ 0.`, done: R`[[./whoport.sh 3000]] وسيرفر شغّال بيطبع سطر فيه PID وفولدر المشروع الصح، ومن غير سيرفر بيطبع [[free]]، والنسخة التانية بتعمل نفس الحاجة على ويندوز.` },
            { lvl: 'تحدي', t: R`قارن: شغّل [[next dev]] (من غير [[-p]]) والبورت مشغول، وبعدين [[next dev -p 3000]] والبورت مشغول. سجّل لكل واحد: السطر اللي طلع، ورقم الخروج ([[echo $?]])، والبورت اللي اشتغل عليه. أنهي واحد تحطه في سكربت [[dev]] بتاع فريق؟ وليه؟`, done: R`عندك جدول صفين: الأول [[using available port 3001 instead]] واشتغل، والتاني [[EADDRINUSE]] ورقم [[1]]. واخترت واحد بسبب مكتوب.` },
            { lvl: 'تحدي', t: R`اعمل سكربت [[clean]] في [[package.json]] بيمسح [[.next]] ويشتغل من cmd و PowerShell و Git Bash. جرّب [[rm -rf .next]] الأول من PowerShell وسجّل الخطأ، وبعدين اكتب النسخة اللي بـ [[node -e]] وجرّبها في التلاتة.`, done: R`[[rm -rf]] من PowerShell طلّع [['rm' is not recognized as an internal or external command]]، ونسخة [[node -e "require('fs').rmSync(...)"]] مسحت الفولدر في التلات شِلات ([[Test-Path .next]] = [[False]]).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`mkdir -p old new
printf ':root{--brand:#6366f1}' > old/app.css
printf ':root{--brand:#0ea5e9}' > new/app.css
cat > srv.js <<'EOF'
const http = require("http"), fs = require("fs"), path = require("path");
const [dir, port] = process.argv.slice(2);
http.createServer((q, s) => {
  if (q.url === "/ar") return s.end('<link rel="stylesheet" href="/_next/static/chunks/app_globals.css">');
  s.end(fs.readFileSync(path.join(dir, "app.css")));
}).listen(+port, "127.0.0.1");
EOF
node srv.js old 18931 & A=$!
node srv.js new 18932 & B=$!
sleep 1
for port in 18931 18932; do
  CSS_URL=$(curl -s http://127.0.0.1:$port/ar | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1)
  echo "$port $CSS_URL $(curl -s "http://127.0.0.1:$port$CSS_URL" | grep -oE "(6366f1|0ea5e9)" | sort -u)"
done
kill $A $B; wait $A $B 2>/dev/null; sleep 1`, expect: [R`18931 /_next/static/chunks/app_globals.css 6366f1`, R`18932 /_next/static/chunks/app_globals.css 0ea5e9`] },
            { os: [R`windows`], sh: R`bash`, run: R`taskkill /PID 999999 /F 2>&1 || true
MSYS_NO_PATHCONV=1 taskkill /PID 999999 /F 2>&1 || true
taskkill //PID 999999 //F 2>&1 || true`, expect: [R`C:/Program Files/Git/PID`, R`999999`] },
          ],
        }
      ]
    }
  ]
});
