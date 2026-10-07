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
        }
      ]
    },
    {
      t: "الراوتنج بالفولدرات",
      l: 1,
      n: "كل فولدر جوه app حتة من الـ URL، و page.tsx هو اللي بيخليه صفحة",
      items: [
        {
          cmd: "page.tsx",
          title: "الفولدرات بتبقى URLs إزاي؟",
          desc: R`في App Router الراوتنج هو شكل الفولدرات: كل فولدر جوه [[app]] حتة من الـ URL، والفولدر بيبقى صفحة لما يبقى جواه [[page.tsx]] بيعمل [[export default]] لكومبوننت. [[app/about/page.tsx]] يبقى [[/about]]، و [[app/blog/drafts/page.tsx]] يبقى [[/blog/drafts]].

أي ملف تاني في الفولدر (كومبوننت، أو CSS، أو test) مبيبقاش route، فتقدر تحط الحاجات جنب الصفحة اللي بتستخدمها. وفيه نوعين فولدرات خاصين: [[_lib]] بـ underscore مستخبي من الراوتنج خالص، و [[(shop)]] بين قوسين بيجمّع صفحات تحت layout واحد من غير ما يدخل في الـ URL.`,
          example: R`app/page.tsx                  → /
app/about/page.tsx            → /about
app/blog/page.tsx             → /blog
app/blog/post-card.tsx        → مش صفحة: اسمه مش page
app/blog/drafts/page.tsx      → /blog/drafts
app/_lib/format.ts            → برّه الراوتنج خالص
app/(shop)/layout.tsx         → layout للسلة والدفع بس
app/(shop)/cart/page.tsx      → /cart
app/(shop)/checkout/page.tsx  → /checkout
// app/about/page.tsx
export default function AboutPage() {
  return <h1>مين إحنا</h1>;
}`,
          try: R`في الـ lab اعمل [[app/blog/post-card.tsx]] وافتح [[/blog/post-card]]: 404. وبعدين اعمل [[app/(shop)/cart/page.tsx]] وافتح [[/cart]] (مش [[/(shop)/cart]]). وجرّب تعمل [[app/cart/page.tsx]] كمان وشوف الخطأ: مسارين بيطلّعوا نفس الـ URL.`,
          flag: "script",
          deep: {
            why: "مفيش ملف راوتر تكتب فيه كل المسارات وتنسى تحدّثه. تبص على الفولدرات تعرف الموقع فيه صفحات إيه، وأي صفحة جديدة فولدر جديد.",
            how: R`وقت الـ build (وفي dev مع كل تغيير) Next بيلف على [[app]] ويبني شجرة routes. كل فولدر segment، والملفات اللي بأسماء محجوزة هي اللي ليها معنى: [[page]] و [[layout]] و [[loading]] و [[error]] و [[not-found]] و [[route]] و [[template]] و [[default]]. أي اسم تاني Next بيتجاهله في الراوتنج، بس لو اتعمله import بيدخل الـ bundle عادي.

الـ route group [[(name)]] بيتشال من الـ URL، وفايدته حاجتين: تنظيم (فولدر [[(marketing)]] وفولدر [[(dashboard)]])، و layout مختلف لكل مجموعة. وتقدر تعمل كذا root layout، كل group بـ [[<html>]] بتاعه، بس التنقل بينهم بيعمل reload كامل.

الـ private folder [[_name]] مبيدخلش الراوتنج حتى لو جواه [[page.tsx]]، فمناسب لـ [[_components]] و [[_lib]]. وفيه ناس بتفضّل تحط الحاجات دي برّه [[app]] خالص في [[src/components]] و [[src/lib]]، والاتنين صح.

والامتدادات [[.tsx]] و [[.ts]] و [[.jsx]] و [[.js]] كلها تنفع. والـ URL بيتبني من أسماء الفولدرات بالظبط، فاكتبها بحروف صغيرة وشرطة ([[order-history]]).`,
            when: "مع كل صفحة جديدة. و route groups لما يبقى فيه أجزاء من الموقع شكلها مختلف: صفحات تسويق بـ header و footer، ولوحة تحكم بـ sidebar.",
            mistakes: R`تسمّي الملف [[index.tsx]] أو [[About.tsx]] زي Pages Router، فالصفحة متظهرش: لازم [[page.tsx]]. وتعمل [[page.tsx]] من غير [[export default]]، فيطلع خطأ إن الصفحة مش React component. ومجموعتين فيهم نفس المسار ([[(shop)/cart]] و [[(account)/cart]])، فالـ build يقع بخطأ إن الاتنين بيطلّعوا نفس الـ URL.`
          },
          teach: R`## الفكرة: الـ URL هو مسار الفولدرات

المثال جزئين: شجرة ملفات وجنب كل ملف الـ URL اللي بيطلّعه، وتحتها أبسط [[page.tsx]] ممكن. عملنا الشجرة دي كلها في مشروع Next 16.4 (جوه [[src/app]])، وعملنا [[next build]] و [[next start]]، وجربنا كل URL بـ [[curl]].

---

## ١. القاعدة: فولدر + [[page.tsx]] = صفحة

| الملف | الـ URL | ليه |
|---|---|---|
| [[app/page.tsx]] | [[/]] | [[page.tsx]] مباشرة جوه [[app]] |
| [[app/about/page.tsx]] | [[/about]] | فولدر [[about]] = حتة [[/about]] في الـ URL |
| [[app/blog/page.tsx]] | [[/blog]] | نفس الفكرة |
| [[app/blog/drafts/page.tsx]] | [[/blog/drafts]] | فولدر جوه فولدر = حتتين في الـ URL |

كل فولدر اسمه **segment** (حتة من الـ URL بين علامتين [[/]]). والفولدر لوحده مش صفحة: لازم يبقى جواه ملف اسمه [[page]] بالظبط (بأي امتداد: [[.tsx]] أو [[.ts]] أو [[.jsx]] أو [[.js]]).

---

## ٢. ملف جنب الصفحة: [[app/blog/post-card.tsx]]

اسمه مش [[page]]، فـ Next مبيعملوش URL. ده كومبوننت بتستخدمه صفحة المدونة، وحطيناه جنبها عشان قريب منها (ده اسمه colocation).

---

## ٣. فولدر بـ underscore: [[app/_lib/format.ts]]

الـ [[_]] في أول اسم الفولدر بتشيله **هو وكل اللي جواه** من الراوتنج. عشان نتأكد، حطينا كمان [[app/_lib/secret/page.tsx]]، يعني فيه [[page.tsx]] حقيقي جوه [[_lib]].

---

## ٤. فولدر بين قوسين: [[app/(shop)/...]]

ده اسمه **route group**. القوسين معناهم «الفولدر ده للتنظيم بس، متحطوش في الـ URL». فـ [[app/(shop)/cart/page.tsx]] بيبقى [[/cart]]، مش [[/(shop)/cart]].

وفايدته الكبيرة: [[app/(shop)/layout.tsx]] بيلف الصفحات اللي جوه [[(shop)]] بس. حطينا فيه [[<div className="shop"><p>هيدر السلة</p>{children}</div>]].

---

## ٥. اللي طلع فعلًا

### جدول الـ build

~~~text الناتج
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /blog
├ ○ /blog/drafts
├ ○ /cart
├ ○ /checkout
└ ƒ /products/[id]
~~~

([[/products/[id]]] من الدرس اللي فات.) لاحظ: مفيش [[/blog/post-card]]، ولا أي حاجة فيها [[_lib]]، و [[/cart]] و [[/checkout]] من غير [[(shop)]].

### كل URL بـ curl

[[curl -s -o /dev/null -w '%{http_code}' URL]] بيطبع الـ status بس: [[-s]] من غير شريط تقدّم، و [[-o /dev/null]] ارمي الصفحة نفسها، و [[-w '%{http_code}']] اطبع الكود. اتشغّل في Git Bash على ويندوز:

~~~text الناتج
/blog              200
/blog/post-card    404
/blog/drafts       200
/_lib/format       404
/_lib/secret       404
/cart              200
/(shop)/cart       404
/checkout          200
~~~

- [[/blog/post-card]] بـ 404: الملف موجود، بس مش [[page]].
- [[/_lib/secret]] بـ 404 مع إن فيه [[page.tsx]] جواه: الـ [[_]] أقوى.
- [[/(shop)/cart]] بـ 404: القوسين مش جزء من الـ URL.

و HTML صفحة [[/cart]] فيه الـ layout حوالين الصفحة:

~~~text الناتج
<div class="shop"><p>هيدر السلة</p><h1>السلة</h1>...</div>
~~~

---

## ٦. الصفحة نفسها

~~~text app/about/page.tsx
export default function AboutPage() {
  return <h1>مين إحنا</h1>;
}
~~~

- [[export default]]: لازم. Next بيعمل import للملف وياخد الـ default export ويرسمه.
- [[function AboutPage()]]: الاسم نفسه مش مهم لـ Next، اختار اسم واضح.
- [[return <h1>مين إحنا</h1>;]]: JSX عادي (تاب «React»).

ولو نسيت [[export default]] (جربنا [[export function X()]] بس)، الـ build بيقع في خطوة TypeScript:

~~~text الناتج
.next/types/validator.ts(133,31): error TS2344: Type 'typeof import(".../src/app/nopage/page")' does not satisfy the constraint 'AppPageConfig<"/nopage">'.
Failed to type check.
~~~

الرسالة شكلها غريب، بس معناها: «الملف ده مش شكل صفحة»، لأن مفيهوش default export.

---

## ٧. مسارين لنفس الـ URL

عملنا [[app/cart/page.tsx]] جنب [[app/(shop)/cart/page.tsx]]. الاتنين بيطلّعوا [[/cart]]:

~~~text الناتج
Error: Turbopack build failed with 1 error:
./src/app/cart
Error: You cannot have two parallel pages that resolve to the same path. Please check /(shop)/cart and /cart.
~~~

Next مش هيختار واحد لوحده، فالـ build بيقف.

## الخلاصة

| الشكل | في الـ URL؟ | الاستخدام |
|---|---|---|
| [[about/page.tsx]] | أيوة: [[/about]] | صفحة |
| [[blog/post-card.tsx]] | لأ | كومبوننت جنب الصفحة |
| [[_lib/]] | لأ، هو وكل اللي جواه | كود مساعد |
| [[(shop)/]] | لأ، بس اللي جواه أيوة | تنظيم و layout لمجموعة صفحات |

- الصفحة = فولدر + [[page.tsx]] فيه [[export default]].
- مسارين بيطلّعوا نفس الـ URL = الـ build بيقع.`,
          lines: [
            R`الصفحة الرئيسية: [[page.tsx]] مباشرة جوه [[app]].`,
            R`فولدر [[about]] جواه page، فبقى [[/about]].`,
            "نفس الفكرة.",
            R`كومبوننت جنب الصفحة اللي بتستخدمه. مفيش URL ليه لأن اسمه مش [[page]].`,
            "فولدر جوه فولدر: segment تاني في الـ URL.",
            R`الـ [[_]] في أول الاسم بتشيل الفولدر كله من الراوتنج.`,
            R`الـ group: القوسين مبيظهروش في الـ URL، والـ layout ده بيلف صفحات [[(shop)]] بس.`,
            R`[[/cart]] مش [[/(shop)/cart]].`,
            "وكمان checkout تحت نفس الـ layout.",
            R`الصفحة لازم [[export default]] لكومبوننت.`,
            "بيرجّع JSX عادي.",
            "قفلة."
          ],
          sol: R`[[/blog/post-card]] بترجع 404: الملف موجود بس اسمه مش [[page]]، فمش route. و [[/cart]] بتفتح عادي، و [[/(shop)/cart]] نفسها 404، لأن القوسين مبيدخلوش في الـ URL.

ولما تضيف [[app/cart/page.tsx]] كمان، الـ build بيقع برسالة: [[You cannot have two parallel pages that resolve to the same path. Please check /(shop)/cart and /cart.]] يعني مسارين في الشجرة بيطلّعوا نفس الـ URL، و Next مش هيختار واحد لوحده. امسح واحد منهم، أو غيّر اسم الفولدر.`
        },
        {
          cmd: "[slug] و params",
          title: "صفحة واحدة لكل المنتجات: الجزء المتغير في الـ URL",
          desc: R`فولدر اسمه بين قوسين مربعين زي [[[slug]]] بيمسك أي قيمة في المكان ده: [[app/products/[slug]/page.tsx]] بتفتح [[/products/red-shirt]] و [[/products/blue-cap]]، والقيمة بتوصلك في [[params]].

من Next 15 [[params]] بقت Promise، فلازم [[await params]] (أو [[use(params)]] في client component). ولو المنتج مش موجود، [[notFound()]] بتعرض صفحة 404. وفيه كمان [[[...slug]]] لأي عدد أجزاء، و [[[[...slug]]]] نفسه بس بيقبل المسار الفاضي كمان.`,
          example: R`// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <h1>{product.name} - {product.price} ج.م</h1>;
}
// app/docs/[...path]/page.tsx: /docs/a/b/c → path = ["a", "b", "c"]
export default async function Docs({ params }: PageProps<"/docs/[...path]">) {
  const { path } = await params;
  return <p>{path.join(" / ")}</p>;
}`,
          try: R`اعمل الصفحة الأولى، وخلي [[getProduct]] ترجع منتج لو الـ slug [["red-shirt"]] و [[null]] لأي حاجة تانية. افتح الاتنين، وفي DevTools > Network شوف الـ status: 200 و 404. وبعدين امسح [[await]] قبل [[params]] وشوف TypeScript بيقولك إيه.`,
          flag: "script",
          deep: {
            why: "المتجر فيه ألف منتج، والمدونة فيها ٣٠٠ مقال. مينفعش فولدر لكل واحد. صفحة واحدة بتقرا الجزء المتغير من الـ URL وتجيب الداتا بتاعته.",
            how: R`Next بيطابق الـ URL مع الشجرة، والـ segment الثابت ليه أولوية: لو فيه [[app/products/new/page.tsx]] و [[app/products/[slug]/page.tsx]]، الـ [[/products/new]] بتروح للأولى.

ليه Promise؟ عشان Next يقدر يبدأ يرسم الأجزاء اللي مش محتاجة params (زي الـ layout) قبل ما يعرفها، ودي أساس الـ streaming و Partial Prerendering. في Next 15 كان الوصول المباشر (من غير await) متساب مؤقتًا مع تحذير، وفي Next 16 اتشال خالص. ونفس الكلام على [[searchParams]] و [[cookies()]] و [[headers()]].

[[PageProps<"/route">]] و [[LayoutProps]] و [[RouteContext]] أنواع global من Next 15.5، بيولّدها [[next dev]] و [[next build]] أو [[npx next typegen]]. قبلها كنت بتكتب [[{ params: Promise<{ slug: string }> }]] بإيدك، ولسه ينفع.

[[notFound()]] بترمي error خاص، فمتحطهاش جوه try/catch بيبلعه. وبتدوّر على أقرب [[not-found.tsx]] فوقها، ولو مفيش بتعرض الـ 404 الافتراضية. ونوع رجوعها [[never]]، فـ TS عارف إن اللي بعدها مش null.

والـ slug نفسه بيتعمل من العنوان وبيتخزن في الداتابيز كعمود unique، مش بيتحسب مع كل طلب.`,
            when: "أي صفحة تفاصيل: منتج، ومقال، وبروفايل، وطلب. و catch-all للـ docs والمسارات اللي عمقها متغير.",
            mistakes: R`تنسى [[await]] فتلاقي [[slug]] بـ undefined، أو تكتب [[params.slug]] على طول من كود Next 14. وتعمل [[parseInt(id)]] من غير ما تتأكد إنه رقم، فـ [[/orders/abc]] تبعت NaN للداتابيز: افحص بـ Zod أو رجّع notFound. وترجّع [[<p>مش موجود</p>]] بدل [[notFound()]]، فالصفحة ترجع 200 وجوجل يأرشف صفحات فاضية.`
          },
          teach: R`## الفكرة: فولدر واحد بيمسك أي قيمة

المثال صفحتين: صفحة منتج بتقرا الـ [[slug]] من الـ URL، وصفحة docs بتقرا عدد أجزاء مش معروف. شغّلناهم في مشروع Next 16.4 بـ [[next build]] و [[next start]]، و [[getProduct]] من الـ solCode (بترجع منتج لـ [[red-shirt]] بس، و [[null]] لأي حاجة تانية).

---

## ١. اسم الفولدر: [[app/products/[slug]/]]

القوسين المربعين معناهم «الحتة دي متغيرة». [[slug]] مجرد اسم انت اخترته (ممكن [[id]] أو [[name]])، وهو اللي هتلاقي بيه القيمة في الكود. وكلمة slug نفسها معناها الجزء المقروء في الـ URL، زي [[red-shirt]].

---

## ٢. صفحة المنتج سطر سطر

### [[import { notFound } from "next/navigation";]]

[[notFound]] دالة من Next. لما تناديها، Next بيوقف رسم الصفحة ويعرض صفحة 404 بـ status 404 حقيقي.

### [[import { getProduct } from "@/lib/products";]]

[[@/]] هو الـ import alias: بيشاور على [[src/]]. يعني الملف [[src/lib/products.ts]].

### [[export default async function ProductPage({ params }: PageProps<"/products/[slug]">)]]

[[PageProps]] بيعرف شكل [[params]] من اسم الفولدر. Next بيولّد الأنواع دي في [[.next/types/routes.d.ts]]، وده جزء منه بعد الـ build:

~~~text .next/types/routes.d.ts
"/docs/[...path]": { "path": string[]; }
"/products/[slug]": { "slug": string; }
~~~

يعني [[slug]] نوعه string، و [[path]] (الصفحة التانية) array of strings.

### [[const { slug } = await params;]]

[[params]] Promise، فلازم [[await]]. ولو نسيتها (جربنا [[const { slug } = params;]] وشغّلنا [[npx tsc --noEmit]]، يعني «افحص الأنواع ومتطلّعش ملفات»):

~~~text الناتج
src/app/products/[slug]/page.tsx(4,11): error TS2339: Property 'slug' does not exist on type 'Promise<{ slug: string; }>'.
~~~

[[(4,11)]] يعني السطر ٤ العمود ١١. والرسالة: «انت بتدوّر على [[slug]] جوه Promise، والـ Promise نفسه مفيهوش [[slug]]».

### [[const product = await getProduct(slug);]]

بيجيب المنتج. والقيمة دايمًا string حتى لو الـ URL [[/products/5]].

### [[if (!product) notFound();]]

[[!product]] يعني «لو مفيش منتج» ([[null]]). ساعتها [[notFound()]] بترمي حاجة خاصة بتوقف الدالة، فالسطر اللي بعده مبيتنفذش. وعشان نوعها [[never]] («الدالة دي مبترجعش أبدًا»)، TypeScript عارف إن [[product]] بعدها مش [[null]].

### [[return <h1>{product.name} - {product.price} ج.م</h1>;]]

بيعرض الاسم والسعر.

### اللي رجع فعلًا

~~~text الناتج
/products/red-shirt 200
<h1>تيشيرت أحمر<!-- --> - <!-- -->350<!-- --> ج.م</h1>

/products/blue 404
<meta name="robots" content="noindex"/>
~~~

- [[<!-- -->]]: تعليقات HTML صغيرة React بيحطها بين النص الثابت والقيم اللي في [[{}]]، عشان لما المتصفح يعمل hydration يعرف كل حتة فين. مبتظهرش على الشاشة.
- [[/products/blue]] رجعت 404 **في الـ status نفسه**، ومعاها [[noindex]] (جوجل ميأرشفهاش)، والصفحة فيها [[This page could not be found.]] (الـ 404 الافتراضية، لأن مفيش [[not-found.tsx]]).

---

## ٣. الـ catch-all: [[app/docs/[...path]/]]

### [[[...path]]]

التلات نقط معناهم «امسك كل اللي جاي، أي عدد أجزاء». فـ [[/docs/a/b/c]] بتيجي هنا، و [[path]] = [[["a", "b", "c"]]].

### [[const { path } = await params;]]

نفس الفكرة، بس [[path]] هنا array.

### [[return <p>{path.join(" / ")}</p>;]]

[[join(" / ")]] بيلزق عناصر الـ array ببعض وبينهم [[ / ]]:

~~~text الناتج
/docs/a/b/c 200
<p>a / b / c</p>

/docs 404
~~~

[[/docs]] لوحدها 404، لأن [[[...path]]] محتاج جزء واحد على الأقل. لو عايزها تشتغل كمان، اسم الفولدر [[[[...path]]]] (قوسين مربعين زيادة: optional catch-all). جربناه: [[/docs]] رجعت 200 و [[path]] كان [[undefined]]، و [[/docs/a/b]] رجعت [[["a","b"]]].

---

## ٤. جدول الـ build

~~~text الناتج
├ ƒ /docs/[...path]
└ ƒ /products/[slug]
~~~

الاتنين [[ƒ]] (Dynamic): Next ميعرفش القيم وقت الـ build، فبيرسمهم مع كل طلب. (في المستوى التاني [[generateStaticParams]] بيخليك تقوله القيم مقدمًا.)

## الخلاصة

| اسم الفولدر | بيمسك | [[params]] |
|---|---|---|
| [[[slug]]] | جزء واحد: [[/products/red-shirt]] | [[{ slug: "red-shirt" }]] |
| [[[...path]]] | جزء أو أكتر: [[/docs/a/b/c]] | [[{ path: ["a","b","c"] }]] |
| [[[[...path]]]] | صفر أو أكتر: [[/docs]] كمان | [[path]] ممكن [[undefined]] |

- [[await params]] دايمًا، والقيم strings.
- [[notFound()]] مش [[<p>مش موجود</p>]]: الأولى بترجع 404 حقيقي، والتانية 200.`,
          lines: [
            R`[[notFound]] من [[next/navigation]]: بترمي حاجة Next بيفهمها ويعرض 404.`,
            "دالة بتجيب المنتج (من الداتابيز أو API).",
            R`[[PageProps]] نوع global بيعمله Next من شكل الفولدرات، فـ [[params]] نوعها [[Promise<{ slug: string }>]] لوحدها.`,
            R`استنى الـ Promise وخد [[slug]]. القيمة دايمًا string، حتى لو شكلها رقم.`,
            "هات المنتج.",
            R`مش موجود؟ اعرض [[not-found.tsx]]. الكود اللي بعدها مبيتنفذش، و TS عارف إن [[product]] مش null بعدها.`,
            "اعرض.",
            "قفلة.",
            R`catch-all: [[path]] هنا array مش string.`,
            "خد الأجزاء.",
            "اعرضهم ورا بعض.",
            "قفلة."
          ],
          sol: R`[[/products/red-shirt]] بترجع 200 وفيها «تيشيرت أحمر - 350 ج.م»، وأي slug تاني زي [[/products/blue]] بيرجع 404 ويعرض صفحة الـ not-found. والـ status ده حقيقي في Network، مش كلام على الشاشة بس.

ولما تكتب [[const { slug } = params]] من غير await، TypeScript بيقول: [[Property 'slug' does not exist on type 'Promise<{ slug: string; }>']]. يعني [[params]] Promise ولازم تستناها. ولو الـ slug الغلط رجع 200: انت بترجّع [[<p>مش موجود</p>]] بدل ما تنادي [[notFound()]].`,
          solCode: R`// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
async function getProduct(slug: string) {
  return slug === "red-shirt" ? { name: "تيشيرت أحمر", price: 350 } : null;
}
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <h1>{product.name} - {product.price} ج.م</h1>;
}`
        },
        {
          cmd: "searchParams",
          title: "تقرا ?page=2&sort=price في الصفحة",
          desc: R`الـ query string بيوصل للصفحة في [[searchParams]]، وهو كمان Promise من Next 15. كل قيمة يا string، يا array لو المفتاح اتكرر ([[?tag=a&tag=b]])، يا undefined. فمتثقش في النوع: افحصه وحوّله، و Zod بيعمل ده في سطر.

الفلاتر والصفحات والبحث مكانهم الـ URL مش الـ state: اللينك بيتبعت ويفتح نفس النتيجة، وزرار الرجوع بيشتغل. وخد بالك إن قراية [[searchParams]] بتخلي الصفحة dynamic (بتترسم مع كل طلب)، لأن القيم مش معروفة وقت الـ build.`,
          example: R`// app/products/page.tsx
import * as z from "zod";
const Query = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  sort: z.enum(["new", "price"]).catch("new"),
  q: z.string().trim().max(100).optional().catch(undefined),
});
export default async function Products({ searchParams }: PageProps<"/products">) {
  const { page, sort, q } = Query.parse(await searchParams);
  const products = await getProducts({ page, sort, q, pageSize: 24 });
  return <ProductGrid products={products} page={page} sort={sort} />;
}`,
          try: R`افتح [[/products?page=abc&sort=hack]] واطبع القيم بـ console.log: هتلاقيها في ترمنال [[npm run dev]] لأن ده server component بيشتغل على السيرفر. وفي dev بس، Next بيعيد عرض نفس السطر في console المتصفح وجنبه علامة Server، بس كود الكومبوننت نفسه مبيوصلش للمتصفح. وقيمتها 1 و new. وبعدين اعمل [[npm run build]] وبص على الجدول: [[/products]] جنبها ƒ يعني dynamic.`,
          flag: "script",
          deep: {
            why: R`الفلتر اللي في state بيضيع مع أول refresh، ومينفعش تبعته لحد. والـ query string جاي من المستخدم، يعني ممكن يبقى أي حاجة: [[?page=-1]] أو [[?page=99999999]] أو [[?sort=DROP]]. لو بعته للداتابيز من غير فحص يا يقع يا يرجّع حاجات غلط.`,
            how: R`[[searchParams]] بيوصل في props الصفحة بس، مش الـ layout، لأن الـ layout مبيترسمش تاني لما الـ query يتغير. لو محتاجه في كومبوننت تحت، ابعته props، أو في client component استخدم [[useSearchParams()]] من [[next/navigation]].

[[useSearchParams]] في client component على صفحة static محتاج [[<Suspense>]] حواليه، وإلا الـ build بيقع بخطأ إن الـ hook محتاج suspense boundary، لأن الـ query مش معروف وقت الـ build فالجزء ده لازم يترسم في المتصفح.

عشان تغيّر الـ query من الواجهة: [[<Link href="?page=2">]]، أو [[router.replace]] بـ [[URLSearchParams]] جديدة (الدرس الجاي). والتنقل ده بيعيد رسم الصفحة على السيرفر بالقيم الجديدة، والـ layout بيفضل زي ما هو.

والـ pagination بـ offset ([[page]]) كويس لحد آلاف الصفوف، وبعد كده keyset pagination (تاب «SQL و Prisma»).`,
            when: "أي حاجة المستخدم ممكن يحب يبعتها لحد أو يرجعلها: بحث، وفلاتر، وترتيب، ورقم صفحة، والتاب المفتوح.",
            mistakes: R`تكتب [[Number(query.page)]] من غير فحص فتبعت NaN. وتدوّر على [[searchParams]] في الـ layout (مش بيوصله). وتحط [[useSearchParams]] في كومبوننت فوق خالص في الصفحة من غير Suspense، فالـ build يقع أو الصفحة كلها تترسم في المتصفح. وتفتكر إن [[?q=]] محمي عشان «محدش هيكتب كده»: أي bot هيكتب.`
          },
          teach: R`## الفكرة: الـ query string بيدخل، و Zod بينضّفه

الـ URL [[/products?page=2&sort=price]] فيه جزء بعد علامة [[?]] اسمه query string: أزواج [[اسم=قيمة]] بينهم [[&]]. الصفحة بتستلمه في [[searchParams]]. المثال بيعمل حاجتين: يعرّف «الشكل المسموح» بـ Zod، وبعدين يقرا القيم ويفحصها في سطر واحد. شغّلنا الـ schema في Node، والصفحة (الـ solCode) في Next 16.4 بـ dev و build.

---

## ١. [[import * as z from "zod";]]

Zod مكتبة فحص: بتوصف شكل الداتا، وبعدين تديها أي قيمة فتقولك مطابقة ولا لأ، وتحوّلها. [[* as z]] يعني «هات كل اللي في المكتبة تحت اسم [[z]]». (الإصدار اللي جربنا عليه zod 4.6.)

---

## ٢. الـ schema: [[const Query = z.object({...})]]

[[z.object]] بيوصف object وكل مفتاح فيه ليه قاعدة. القاعدة بتتقري من الشمال لليمين، كل نقطة خطوة:

### [[page: z.coerce.number().int().min(1).catch(1),]]

| الحتة | بتعمل إيه |
|---|---|
| [[z.coerce.number()]] | حوّل القيمة لرقم. ليه؟ لأن أي حاجة في الـ URL بتيجي string: [["2"]] مش [[2]] |
| [[.int()]] | لازم رقم صحيح، من غير كسور |
| [[.min(1)]] | ١ أو أكتر |
| [[.catch(1)]] | لو أي خطوة فشلت، **متطلّعش خطأ**: رجّع [[1]] |

### [[sort: z.enum(["new", "price"]).catch("new"),]]

[[z.enum]] يعني «واحدة من القيم دي بس». أي حاجة تانية تبقى [["new"]].

### [[q: z.string().trim().max(100).optional().catch(undefined),]]

| الحتة | بتعمل إيه |
|---|---|
| [[z.string()]] | لازم string (مش array) |
| [[.trim()]] | شيل المسافات من الأول والآخر |
| [[.max(100)]] | ١٠٠ حرف بالكتير |
| [[.optional()]] | مش لازم يبقى موجود |
| [[.catch(undefined)]] | لو بايظ، كأنه مش موجود |

### جربنا الـ schema على قيم مختلفة

كتبنا الـ schema في ملف [[.mjs]] وشغّلناه بـ Node، وطبعنا الداخل والخارج:

~~~text الناتج
{}                                          → {"page":1,"sort":"new"}
{"page":"2","sort":"price","q":"  كتب  "}   → {"page":2,"sort":"price","q":"كتب"}
{"page":"abc","sort":"hack"}                → {"page":1,"sort":"new"}
{"page":"-5"}                               → {"page":1,"sort":"new"}
{"page":"2.5"}                              → {"page":1,"sort":"new"}
{"q":["a","b"]}                             → {"page":1,"sort":"new"}
{"q":"xxxx...(101 حرف)"}                     → {"page":1,"sort":"new"}
~~~

- [["2"]] بقى [[2]] رقم، و [["  كتب  "]] اتنضّف لـ [["كتب"]].
- [["abc"]] و [["-5"]] و [["2.5"]] كلهم بقوا [[1]]: [[abc]] مش رقم، و [[-5]] أقل من ١، و [[2.5]] مش صحيح.
- [[q]] لما جه array (لو الـ URL فيه [[?q=a&q=b]]) أو أطول من ١٠٠ حرف، اتشال خالص.

يعني مهما المستخدم (أو bot) كتب في الـ URL، اللي بيطلع دايمًا شكل واحد مضمون.

---

## ٣. الصفحة

### [[export default async function Products({ searchParams }: PageProps<"/products">)]]

[[searchParams]] بتوصل في props الصفحة، ونوعها حسب [[PageProps]]: [[Promise<Record<string, string | string[] | undefined>>]]. يعني Promise، وجواه object كل مفتاح فيه يا string، يا array لو اتكرر، يا [[undefined]].

### [[const { page, sort, q } = Query.parse(await searchParams);]]

من جوه لبرة:

1. [[await searchParams]]: استنى الـ Promise، فيطلع object زي [[{ page: "abc", sort: "hack" }]].
2. [[Query.parse(...)]]: افحصه وحوّله بالـ schema.
3. [[const { page, sort, q } =]]: طلّع التلات قيم. بعد السطر ده TypeScript عارف إن [[page]] رقم و [[sort]] يا [["new"]] يا [["price"]].

### [[const products = await getProducts({ page, sort, q, pageSize: 24 });]]

دالة بتاعتك بتكلّم الداتابيز، بتاخد قيم مضمونة. [[pageSize: 24]] عدد المنتجات في الصفحة.

### [[return <ProductGrid products={products} page={page} sort={sort} />;]]

كومبوننت بيعرض النتيجة.

---

## ٤. شغّلنا الـ solCode

الـ solCode نفس الفكرة من غير الداتابيز، وبيطبع القيم قبل وبعد. فتحنا الصفحة في Chrome (playwright) على [[npm run dev]]:

~~~text الناتج في ترمنال npm run dev
{ page: 'abc', sort: 'hack' } { page: 1, sort: 'new' }
 GET /products?page=abc&sort=hack 200 in 118ms
{ page: '2', tag: [ 'a', 'b' ] } { page: 2, sort: 'new' }
 GET /products?page=2&tag=a&tag=b 200 in 67ms
~~~

- السطر بيتطبع **في ترمنال السيرفر**، لأن الصفحة server component.
- [[tag=a&tag=b]]: المفتاح اتكرر، فوصل array [[[ 'a', 'b' ]]]. ده اللي قلنا عليه «string أو array».
- و [[tag]] مش في الـ schema، فـ Zod شاله من الناتج.

وفي console المتصفح (dev بس) ظهر نفس السطر وقبله كلمة [[Server]] في badge رمادي:

~~~text الناتج في console المتصفح
 Server   {page: abc, sort: hack} {page: 1, sort: new}
~~~

ده React بيعيد عرض لوج السيرفر في المتصفح عشان يسهّل الـ debugging. الكود نفسه اتنفذ على السيرفر. والصفحة عرضت [[صفحة 1، ترتيب new]].

### جدول الـ build

~~~text الناتج
├ ƒ /products
~~~

[[ƒ]] يعني Dynamic: الصفحة بتقرا [[searchParams]]، والقيم دي مش معروفة غير مع الطلب، فبتترسم مع كل طلب.

## الخلاصة

- [[searchParams]] Promise، وكل قيمة string أو array أو [[undefined]]. **متثقش في النوع.**
- [[z.coerce]] يحوّل، و [[.catch(قيمة)]] يدّي قيمة افتراضية بدل ما يرمي خطأ.
- [[Query.parse(await searchParams)]] مرة واحدة في أول الصفحة، وبعدها كل حاجة مضمونة.
- قراية [[searchParams]] بتخلي الصفحة [[ƒ]] Dynamic.`,
          lines: [
            R`Zod للفحص (تفاصيله في تاب «TypeScript»).`,
            "شكل الـ query المسموح.",
            R`[[coerce]] بيحوّل [["2"]] لـ 2، و [[catch(1)]] لو القيمة بايظة ([["abc"]] أو [[-5]]) يرجّع 1 بدل ما يرمي.`,
            "ترتيب من قيمتين بس، وأي حاجة تانية تبقى new.",
            "كلمة البحث اختيارية، ولو جت array أو أطول من ١٠٠ حرف بتتشال.",
            "قفلة الـ schema.",
            R`[[searchParams]] نوعها [[Promise<Record<string, string | string[] | undefined>>]].`,
            R`استنى وافحص مرة واحدة. بعد السطر ده الأنواع مضمونة: [[page]] رقم و [[sort]] واحدة من الاتنين.`,
            "ابعتها للـ query.",
            "اعرض.",
            "قفلة."
          ],
          sol: R`في ترمنال [[npm run dev]] هتشوف القيم الخام وبعدها بعد الفحص: [[{ page: 'abc', sort: 'hack' }]] و [[{ page: 1, sort: 'new' }]]. الـ [[catch]] في Zod قلب القيم البايظة للافتراضي بدل ما يرمي، فالصفحة شغالة عادي وبتقول «صفحة 1، ترتيب new». وفي console المتصفح (dev بس) نفس السطر وجنبه badge مكتوب فيه Server.

وجدول الـ build: [[ƒ /products]]، لأن الصفحة بتقرا [[searchParams]]. لو لقيتها ○: الصفحة مش بتعمل [[await searchParams]] فعلًا. ولو الـ log ظهر في المتصفح من غير Server ومش في الترمنال: الملف عليه [[use client]].`,
          solCode: R`// app/products/page.tsx
import * as z from "zod";
const Query = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  sort: z.enum(["new", "price"]).catch("new"),
});
export default async function Products({ searchParams }: PageProps<"/products">) {
  const raw = await searchParams;
  const { page, sort } = Query.parse(raw);
  console.log(raw, { page, sort });
  return <p>صفحة {page}، ترتيب {sort}</p>;
}`
        },
        {
          cmd: "Link و useRouter",
          title: "تتنقل بين الصفحات من غير reload",
          desc: R`[[<Link href="/about">]] من [[next/link]] هو الـ [[<a>]] بتاع Next: بيغيّر الصفحة من غير reload، وبيعمل prefetch للصفحة لما اللينك يظهر على الشاشة، فالضغطة بتبقى شبه فورية.

ولما تحتاج تتنقل من الكود (بعد حفظ، أو من select)، [[useRouter()]] من [[next/navigation]] في client component: [[push]] و [[replace]] و [[back]] و [[refresh]]. و [[usePathname()]] بيقولك انت فين، مفيد للينك الـ active. وعلى السيرفر (صفحة أو Server Action) بتستخدم [[redirect()]].`,
          example: R`"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function ShopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  function sortBy(sort: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.replace($__bt$__{pathname}?$__{params}$__bt, { scroll: false });
  }
  return (
    <nav>
      <Link href="/products" className={pathname === "/products" ? "font-bold" : ""}>المنتجات</Link>
      <Link href="/cart" prefetch={false}>السلة</Link>
      <button onClick={() => sortBy("price")}>الأرخص الأول</button>
    </nav>
  );
}`,
          try: R`حط الـ nav في الـ layout جوه [[<Suspense>]] (لأنه بيستخدم [[useSearchParams]]، ومن غيرها الـ build بيقع على الصفحات الـ static زي ما شفنا في درس searchParams)، واعمل [[npm run build]] وبعدين [[npm start]] (الـ prefetch مبيشتغلش في dev). افتح DevTools > Network وانزل لحد ما لينك يظهر: هتلاقي طلب اتبعت قبل ما تضغط. وبعدين بدّل [[<Link>]] بـ [[<a>]] عادي واضغط: الصفحة هتعمل reload كامل.`,
          flag: "script",
          deep: {
            why: "الـ [[<a>]] العادي بيحمّل الصفحة من الأول: HTML و CSS و JS تاني، والـ state كلها بتروح. في تطبيق حقيقي ده بطيء وبيبان كأن الموقع اتقفل واتفتح.",
            how: R`[[<Link>]] بيطلّع [[<a href>]] حقيقي (فبيشتغل بالكيبورد، و «فتح في تاب جديد»، وجوجل بيشوفه)، بس بيمسك الضغطة ويعمل client-side navigation: بيطلب من السيرفر الـ RSC payload بتاع الصفحة الجديدة بس، ويبدّل الجزء اللي اتغير، والـ layouts المشتركة بتفضل زي ما هي بالـ state بتاعتها.

الـ prefetch في الإنتاج: اللينك لما يدخل الشاشة، Next بيحمّل مقدمًا الصفحة لو static، أو لحد أقرب [[loading.tsx]] لو dynamic. و [[prefetch={true}]] بيحمّل الصفحة الـ dynamic كاملة، و [[false]] بيقفله. وفي Next 16 الـ prefetch بقى أذكى: الـ layout المشترك بيتحمّل مرة واحدة بدل ما يتكرر مع كل لينك.

[[router.refresh()]] بيطلب الصفحة الحالية من السيرفر تاني من غير ما يمسح الـ state اللي في المتصفح، مفيد بعد تغيير حصل من برّه. و [[redirect()]] على السيرفر بيرمي error خاص (زي notFound)، فالكود اللي بعده مبيتنفذش.

والـ hooks دي بتخلي الكومبوننت client، فحطها في أصغر كومبوننت ممكن (اللينك نفسه أو الـ nav)، وسيب الصفحة server.`,
            when: R`[[<Link>]] لأي تنقل داخلي. [[router.push]] بعد حدث (حفظ، أو اختيار من قايمة). [[router.replace]] للفلاتر والبحث. [[redirect]] على السيرفر. و [[<a>]] عادي للروابط الخارجية والملفات.`,
            mistakes: R`[[<a href="/about">]] جوه الموقع فكل تنقل reload. و [[import { useRouter } from "next/router"]] في App Router. و [[router.push]] جوه الـ render مش جوه event أو effect. و [[redirect()]] جوه [[try]] فالـ [[catch]] بيبلعه والتحويل ميحصلش. و [[onClick={() => router.push("/x")}]] على [[div]] بدل [[Link]]: مفيش prefetch، ومبيتفتحش في تاب جديد، ومش accessible.`
          },
          teach: R`## الفكرة: لينكات بتبدّل الصفحة من غير ما تحمّلها من الأول

المثال كومبوننت nav فيه لينكين وزرار بيغيّر الترتيب من الكود. هنقراه سطر سطر، وبعدين نشوف بـ Chrome حقيقي (playwright على [[next build]] و [[next start]]، Next 16.4) إيه الطلبات اللي بتطلع، وإزاي نعرف إن الصفحة معملتش reload.

---

## ١. السطور اللي فوق

### [["use client";]]

[[usePathname]] و [[useRouter]] و [[useSearchParams]] hooks، والـ hooks بتشتغل في المتصفح بس، فالملف لازم يبقى client component (درس use client).

### [[import Link from "next/link";]]

[[Link]] كومبوننت Next للينكات الداخلية.

### [[import { usePathname, useRouter, useSearchParams } from "next/navigation";]]

التلاتة من [[next/navigation]]. في Pages Router كان فيه [[next/router]]، وده مش شغال في App Router.

---

## ٢. التلات hooks

| السطر | بيرجّع إيه | مثال |
|---|---|---|
| [[const pathname = usePathname();]] | المسار من غير الـ query | [["/products"]] |
| [[const router = useRouter();]] | object فيه دوال التنقل | [[router.push]] و [[router.replace]] و [[router.back]] و [[router.refresh]] |
| [[const searchParams = useSearchParams();]] | الـ query الحالي، للقراية بس | [[searchParams.get("sort")]] |

---

## ٣. دالة [[sortBy]] سطر سطر

### [[const params = new URLSearchParams(searchParams.toString());]]

من جوه لبرة:

1. [[searchParams.toString()]]: حوّل الـ query الحالي لنص، زي [["page=2&q=كتب"]].
2. [[new URLSearchParams(...)]]: اعمل منه نسخة **قابلة للتعديل** ([[URLSearchParams]] جاهزة في المتصفح). الـ [[searchParams]] اللي جاية من الـ hook للقراية بس.

ليه ننسخ القديم بدل ما نبدأ فاضي؟ عشان لو فيه [[page]] أو [[q]] يفضلوا، ونغيّر [[sort]] بس.

### [[params.set("sort", sort);]]

[[set]] بيحط القيمة، ولو المفتاح موجود بيبدّله.

### [[router.replace($__bt$__{pathname}?$__{params}$__bt, { scroll: false });]]

- [[$__bt...$__bt]] (backticks) ده template string في JavaScript، و [[$__{...}]] بيحط قيمة جوه النص. [[params]] لما يتحط في نص بيتحوّل لوحده لـ [["sort=price"]]. فالناتج [["/products?sort=price"]].
- [[router.replace]]: روح للـ URL ده **من غير ما تزوّد خطوة في الـ history**، فزرار الرجوع ميعديش على كل ترتيب جربته. ([[router.push]] بيزوّد خطوة.)
- [[{ scroll: false }]]: متطلعش لأول الصفحة بعد التنقل.

---

## ٤. الـ JSX

### [[<Link href="/products" className={pathname === "/products" ? "font-bold" : ""}>]]

- [[href]]: رايح فين.
- [[pathname === "/products" ? "font-bold" : ""]]: لو انت في الصفحة دي، حط class [[font-bold]] (Tailwind: خط تقيل). ده «اللينك الـ active».

### [[<Link href="/cart" prefetch={false}>]]

[[prefetch={false}]]: متحمّلش الصفحة دي مقدمًا.

### [[<button onClick={() => sortBy("price")}>]]

ضغطة الزرار بتنادي [[sortBy]].

---

## ٥. اللي حصل فعلًا في المتصفح

حطينا الـ nav في الـ layout جوه [[<Suspense>]] زي الـ solCode، وزودنا عليه للتجربة لينك [[<Link href="/about">]] و [[<a href="/blog">]] عادي. وسجّلنا كل طلب (من غير ملفات الـ JS والـ CSS).

### أول ما الصفحة فتحت

~~~text الناتج
document /
fetch /products?_rsc=...   next-router-segment-prefetch: /_tree
fetch /about?_rsc=...      next-router-segment-prefetch: /_tree
fetch /products?_rsc=...   next-router-state-tree: ...metadata-only
fetch /about?_rsc=...      next-router-segment-prefetch: /about/__PAGE__
~~~

- [[document /]]: الصفحة نفسها.
- الباقي **prefetch**: محدش ضغط على حاجة لسه، و Next طلب الصفحات اللي لينكاتها ظاهرة. [[_rsc]] في الـ URL والـ header [[rsc: 1]] معناهم «عايز RSC payload مش HTML».
- [[/_tree]]: شكل الـ routes بتاع الصفحة.
- [[/about/__PAGE__]]: [[/about]] صفحة static ([[○]])، فاتحمّل محتواها كله مقدمًا.
- [[/products]] dynamic ([[ƒ]])، فاتحمّل الـ metadata بس، مش المحتوى، لأن مفيش [[loading.tsx]] يتحمّل لحد عنده.
- **مفيش ولا طلب لـ [[/cart]]**: ده [[prefetch={false}]].

### ضغطنا لينك المنتجات

قبل الضغطة حطينا [[window.__m = 1]] (رقم على الصفحة نفسها، بيضيع لو حصل reload):

~~~text الناتج
== after Link click (url http://localhost:5820/products, marker 1, bold class: font-bold):
fetch /products?_rsc=...
body p: صفحة 1، ترتيب new
~~~

- مفيش طلب [[document]]، طلب [[fetch]] واحد بالمحتوى.
- [[marker 1]]: لسه موجود، يعني مفيش reload.
- [[bold class: font-bold]]: اللينك بقى active.

### ضغطنا «الأرخص الأول»

~~~text الناتج
history before sort 3
== after sort button (url http://localhost:5820/products?sort=price, marker 1, history 3):
fetch /products?sort=price&_rsc=...
body p: صفحة 1، ترتيب price
~~~

- الـ URL بقى [[?sort=price]]، والصفحة اترسمت تاني على السيرفر بالقيمة الجديدة («ترتيب price»).
- [[history.length]] (عدد الخطوات في تاريخ التاب) فضل ٣ قبل وبعد: ده [[replace]].

### ضغطنا [[<a>]] العادي

~~~text الناتج
== after plain <a> (marker undefined):
document /blog
fetch /products?_rsc=...
fetch /about?_rsc=...
~~~

[[document /blog]] = تحميل كامل، و [[marker undefined]] = كل حاجة على الصفحة اتمسحت. وبعدها الـ prefetch بدأ من الأول.

---

## ٦. من غير [[<Suspense>]]

شلنا الـ Suspense من حوالين [[<ShopNav />]]:

~~~text الناتج
⨯ useSearchParams() should be wrapped in a suspense boundary at page "/404". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
Error occurred prerendering page "/_not-found".
Export encountered an error on /_not-found/page: /_not-found, exiting the build.
~~~

الصفحات الـ static بتترسم وقت الـ build، ووقتها مفيش query. [[useSearchParams]] بيقول لـ Next «الجزء ده محتاج المتصفح»، والـ Suspense هو اللي بيحدد «لحد فين». من غيره الـ build بيقع (هنا وقع على صفحة الـ 404 لأنها أول صفحة static اتبنت).

---

## الخلاصة

| عايز | استخدم |
|---|---|
| لينك داخلي | [[<Link href>]] (prefetch + من غير reload) |
| تنقل بعد حدث | [[router.push]] |
| تغيّر فلتر أو ترتيب | [[router.replace]] + [[URLSearchParams]] |
| المسار الحالي | [[usePathname()]] |
| لينك خارجي أو ملف | [[<a>]] عادي |

- الـ prefetch بيشتغل في [[next start]] بس، مش في dev.
- [[useSearchParams]] في كومبوننت على صفحة static = لازم [[<Suspense>]] حواليه.`,
          lines: [
            "hooks التنقل بتشتغل في client component بس.",
            R`[[Link]] للروابط العادية.`,
            R`كل hooks الـ App Router من [[next/navigation]] (مش [[next/router]] بتاع Pages).`,
            "كومبوننت الـ nav.",
            R`المسار الحالي من غير الـ query، زي [[/products]].`,
            "أداة التنقل من الكود.",
            "الـ query الحالي (للقراية بس).",
            "دالة بتغيّر الترتيب.",
            "نسخة قابلة للتعديل من الـ query الحالي، عشان متضيّعش باقي الفلاتر.",
            "غيّر sort بس.",
            R`[[replace]] مش [[push]] عشان كل ترتيب ميبقاش خطوة في الـ history، و [[scroll: false]] عشان الصفحة متطلعش لفوق.`,
            "قفلة الدالة.",
            "بداية الـ JSX.",
            "الـ nav.",
            "لينك عادي، وبيتعلّم لو انت في الصفحة دي.",
            R`[[prefetch={false}]]: السلة بتتغير، فمش لازم تتحمّل مقدمًا كل ما اللينك يظهر.`,
            "زرار بيغيّر الترتيب من الكود.",
            "قفلة الـ nav.",
            "قفلة الـ return.",
            "قفلة الكومبوننت."
          ],
          sol: R`بعد [[npm start]] وفتح الصفحة، هتلاقي في Network طلبات زي [[/about?_rsc=...]] و [[/products?_rsc=...]] اتبعتت لوحدها أول ما اللينكات ظهرت، ومفيش طلب لـ [[/cart]] لأن عليه [[prefetch={false}]]. دي الـ RSC payload بتاعة الصفحات، فالضغطة بعدها بتفتح من غير ما تستنى. ولما تضغط [[<Link>]] مفيش طلب من نوع document، والـ nav نفسه مبيترسمش تاني.

ومع [[<a>]] العادي هتلاقي طلب document كامل، والـ JS والـ CSS بيتطلبوا تاني، والصفحة بتومض. لو مشفتش أي prefetch: انت غالبًا على [[npm run dev]]. ولو الـ build وقع وقال إن [[useSearchParams()]] محتاج suspense boundary: الـ nav مش ملفوف في [[<Suspense>]].`,
          solCode: R`// app/layout.tsx
import { Suspense } from "react";
import { ShopNav } from "@/components/shop-nav";
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Suspense fallback={null}>
          <ShopNav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}`
        }
      ]
    },
    {
      t: "Layouts والملفات الخاصة",
      l: 1,
      n: "layout ثابت بيلف الصفحات، وملفات بأسماء محجوزة للتحميل والأخطاء والـ 404 والـ modals",
      items: [
        {
          cmd: "layout.tsx",
          title: "جزء ثابت بيلف كل الصفحات اللي تحته",
          desc: R`[[layout.tsx]] بياخد [[children]] ويلفها: الـ header والـ sidebar والـ footer. الـ layout اللي في [[app/layout.tsx]] (root layout) إجباري، وهو اللي فيه [[<html>]] و [[<body>]]. وأي فولدر تحت ممكن يبقى ليه layout بتاعه، والـ layouts بتتداخل: [[/dashboard/orders]] بتترسم جوه layout الـ dashboard جوه الـ root layout.

أهم ميزة: لما تتنقل بين صفحتين تحت نفس الـ layout، الـ layout مبيترسمش تاني، والـ state اللي جواه (search box، أو sidebar مفتوح) بتفضل. ولو عايز العكس (يترسم من جديد مع كل صفحة، زي animation دخول)، فيه [[template.tsx]].`,
          example: R`// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "متجر الكتب" };
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}`,
          try: R`حط [[<input placeholder="اكتب حاجة" />]] في layout الـ dashboard، واعمل صفحتين تحته بينهم Link. اكتب في الخانة واتنقل: الكلام فاضل. وبعدين غيّر اسم الملف لـ [[template.tsx]] وجرّب تاني: الكلام بيتمسح مع كل تنقل.`,
          flag: "script",
          deep: {
            why: "كل صفحة في الموقع فيها نفس الـ header، وكل صفحات الـ dashboard فيها نفس الـ sidebar. من غير layouts هتكرر ده في كل صفحة، ومع كل تنقل كل ده هيترسم ويتحمّل تاني، والـ state اللي فيه تضيع.",
            how: R`Next بيبني الصفحة من فوق لتحت: root layout، وجواه layout كل فولدر في الطريق، وفي الآخر الصفحة. وكل واحد بياخد اللي تحته في [[children]].

في التنقل، Next بيقارن الشجرة القديمة بالجديدة، والأجزاء المشتركة مبتتطلبش من السيرفر تاني ومبتترسمش (partial rendering). عشان كده الـ layout مبيوصلوش [[searchParams]]، ولو محتاج حاجة بتتغير مع كل صفحة، مكانها الصفحة أو client component بـ [[usePathname]].

الـ layout server component افتراضيًا، فيقدر يبقى [[async]] ويجيب داتا (المستخدم الحالي مثلًا). بس خد بالك: الـ layout مبيترسمش تاني مع التنقل، فمتعتمدش عليه في فحص الصلاحيات (درس DAL في المستوى التاني).

[[template.tsx]] زي الـ layout بالظبط، بس بياخد key جديد مع كل تنقل، فبيتعمل من الأول والـ state بتاعته بتتمسح والـ effects بتشتغل تاني.

وفي الـ root layout، Next بيحط [[<head>]] وجواه الـ meta بتاعة الـ charset والـ viewport لوحده، وبيضيف الـ title والـ description من [[metadata]]، فمتكتبش [[<head>]] بإيدك (تاب «HTML و CSS»).`,
            when: "أي حاجة مشتركة بين كذا صفحة: navigation، و sidebar، و providers، و footer. و template لما تحتاج reset مع كل صفحة: animation دخول، أو فورم لازم يفضى.",
            mistakes: R`تحط فحص «هل المستخدم داخل؟» في الـ layout بس: الـ layout مبيتنفذش تاني مع التنقل، والصفحة نفسها ممكن تتطلب لوحدها، فالفحص مكانه الصفحة أو الـ DAL. وتكتب [[<html>]] في layout تاني غير الـ root (إلا لو root layouts متعددة في groups). وتعمل الـ root layout كله [[use client]] عشان provider واحد، فكل الموقع يبقى client.`
          },
          teach: R`## الفكرة: layout بياخد الصفحة في [[children]] ويلفها

المثال فيه layoutين: الـ root layout (اللي بيلف الموقع كله)، و layout للـ dashboard بيلف الصفحات اللي تحت [[/dashboard]] بس. هنقرا الاتنين، وبعدين نثبت بـ Chrome حقيقي (playwright على [[next build]] و [[next start]]، Next 16.4) إن الـ layout مبيترسمش تاني مع التنقل، وإن [[template.tsx]] عكسه.

---

## ١. الـ root layout: [[app/layout.tsx]]

### [[import type { Metadata } from "next";]]

[[import type]] بيجيب **نوع** TypeScript بس، مش كود. [[Metadata]] شكل الـ object بتاع العنوان والوصف.

### [[import "./globals.css";]]

import من غير اسم: «حمّل الملف ده وخلاص». الـ CSS العام بيتعمله import مرة واحدة هنا، فيتطبق على كل الصفحات.

### [[export const metadata: Metadata = { title: "متجر الكتب" };]]

Next بيدوّر على export اسمه [[metadata]] ويحوّله لـ tags في الـ [[<head>]]. وده اللي طلع في HTML أي صفحة:

~~~text الناتج
<head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>...
<title>متجر الكتب</title>
~~~

الـ [[charSet]] والـ [[viewport]] Next حطهم لوحده، والـ [[title]] من الـ [[metadata]]. عشان كده مش بتكتب [[<head>]] بإيدك.

### [[export default function RootLayout({ children }: LayoutProps<"/">)]]

- [[children]]: اللي تحت الـ layout ده. لو فاتح [[/dashboard/orders]]، الـ [[children]] هنا هي layout الـ dashboard وجواه صفحة الطلبات.
- [[LayoutProps<"/">]]: نوع جاهز زي [[PageProps]]، بيعرف إن فيه [[children]] (ولو فيه slots، زي درس [[@slot]]، بيعرفها كمان).

### [[<html lang="ar" dir="rtl">]] و [[<body>]]

الـ root layout **بس** هو اللي فيه [[<html>]] و [[<body>]]، وهو إجباري. [[lang="ar"]] اللغة (لقارئ الشاشة ومحركات البحث)، و [[dir="rtl"]] الاتجاه من اليمين للشمال. ولأنهم في HTML جاي من السيرفر، الصفحة بتظهر بالاتجاه الصح من أول لحظة.

### [[<SiteHeader />]] ثم [[<main>{children}</main>]]

الـ header فوق كل صفحة، والصفحة نفسها جوه [[<main>]].

---

## ٢. layout الـ dashboard: [[app/dashboard/layout.tsx]]

### [[export default function DashboardLayout({ children }: LayoutProps<"/dashboard">)]]

نفس الشكل، بس في فولدر [[dashboard]]، فبيلف اللي تحت [[/dashboard]] بس. ومفيهوش [[<html>]]، لأنه بيترسم **جوه** الـ root layout.

### [[<div className="flex min-h-screen">]]

Tailwind: [[flex]] يحط الولاد جنب بعض في صف، و [[min-h-screen]] أقل ارتفاع = طول الشاشة.

### [[<Sidebar />]] و [[<section className="flex-1 p-6">{children}</section>]]

الـ sidebar على جنب، والصفحة جنبه. [[flex-1]] «خد كل المساحة الفاضية»، و [[p-6]] مسافة داخلية.

### الترتيب لما تفتح [[/dashboard/orders]]

~~~text شكل الشجرة
RootLayout            (app/layout.tsx)
  DashboardLayout     (app/dashboard/layout.tsx)
    Orders            (app/dashboard/orders/page.tsx)
~~~

كل واحد بياخد اللي تحته في [[children]].

---

## ٣. التجربة: الـ layout بيفضل، والـ template بيتعمل من الأول

عملنا layout الـ dashboard زي الـ solCode (فيه [[<input>]] ولينكين)، وصفحتين [[orders]] و [[settings]]. السكربت بيفتح [[/dashboard/orders]]، ويكتب [[hello]] في الخانة، ويضغط لينك الإعدادات، ويقرا الخانة بعد ما الصفحة تتغير:

~~~text الناتج مع layout.tsx
h2: الإعدادات | input after navigation: "hello"
~~~

الصفحة اتغيرت (الـ [[h2]] بقى «الإعدادات»)، والكلام فاضل. ليه؟ لأن الصفحتين تحت نفس الـ layout، فـ Next بدّل الجزء اللي اتغير بس (الـ [[children]])، والـ layout نفسه بالـ DOM والـ state بتوعه زي ما هو. ده اسمه partial rendering.

وبعدين غيّرنا اسم الملف لـ [[template.tsx]] (من غير ما نغيّر سطر) وعملنا build تاني:

~~~text الناتج مع template.tsx
h2: الإعدادات | input after navigation: ""
~~~

الخانة فضيت. الـ template بياخد key جديد مع كل تنقل، فـ React بيمسحه ويعمله من الأول.

---

## الخلاصة

| | [[layout.tsx]] | [[template.tsx]] |
|---|---|---|
| بيلف الصفحات اللي تحته | أيوة | أيوة |
| مع التنقل بين صفحاته | بيفضل زي ما هو | بيتعمل من الأول |
| الـ state اللي جواه | بتفضل | بتتمسح |
| الاستخدام | header و sidebar و providers | animation دخول، أو فورم لازم يفضى |

- الـ root layout إجباري، وهو بس اللي فيه [[<html>]] و [[<body>]].
- [[metadata]] في الـ layout (أو الصفحة) بدل ما تكتب [[<head>]].
- الـ layout مبيترسمش تاني مع التنقل، فمتحطش فيه فحص صلاحيات لوحده.`,
          lines: [
            "نوع الـ metadata (SEO، في المستوى التالت).",
            "الـ CSS العام بيتعمله import مرة واحدة في الـ root layout.",
            R`title افتراضي لكل الموقع. [[metadata]] بتتكتب في server components بس (layout أو page).`,
            R`الـ root layout: [[children]] هنا هي الصفحة أو الـ layout اللي تحته.`,
            "بداية الـ JSX.",
            R`[[<html>]] و [[<body>]] بيتكتبوا هنا بس، مش في أي صفحة. واللغة والاتجاه من السيرفر، فمفيش ترعيشة.`,
            "الـ body.",
            "header موجود في كل الموقع، ومبيترسمش تاني مع التنقل.",
            "مكان الصفحة الحالية.",
            "قفلة body.",
            "قفلة html.",
            "قفلة الـ return.",
            "قفلة.",
            R`layout تاني جوه [[app/dashboard]]: بيلف كل حاجة تحت [[/dashboard]] بس.`,
            "بداية الـ JSX.",
            "صف: sidebar والمحتوى.",
            "الـ sidebar. لو فيه state (قايمة مفتوحة) بتفضل وانت بتتنقل بين صفحات الـ dashboard.",
            "الصفحة (orders أو settings) بتتحط هنا.",
            "قفلة div.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`مع [[layout.tsx]]: تكتب «hello» وتدوس لينك الصفحة التانية، الصفحة تتغير والكلام يفضل في الخانة، لأن الـ layout مبيترسمش تاني والـ DOM بتاعه زي ما هو. جربتها بـ build و start وقريت قيمة الـ input بعد التنقل: [["hello"]].

ومع [[template.tsx]]: نفس الخطوات، والقيمة بعد التنقل [[""]]، لأن الـ template بياخد key جديد مع كل صفحة فبيتعمل من الأول. لو الكلام اتمسح مع الـ layout كمان: غالبًا اللينك [[<a>]] مش [[<Link>]] (reload كامل)، أو الصفحتين مش تحت نفس الـ layout.`,
          solCode: R`// app/dashboard/layout.tsx (غيّر اسمه لـ template.tsx في التجربة التانية)
import Link from "next/link";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <input placeholder="اكتب حاجة" />
      <Link href="/dashboard/orders">الطلبات</Link> <Link href="/dashboard/settings">الإعدادات</Link>
      <section>{children}</section>
    </div>
  );
}
// app/dashboard/orders/page.tsx
export default function Orders() {
  return <h2>الطلبات</h2>;
}`
        },
        {
          cmd: "loading.tsx",
          title: "شاشة تحميل لكل صفحة من غير ما تكتب state",
          desc: R`[[loading.tsx]] جنب [[page.tsx]] بيظهر فورًا لما المستخدم يدخل الصفحة، لحد ما الداتا توصل والصفحة تجهز. مفيش [[isLoading]] ولا state: Next بيلف الصفحة في [[<Suspense>]] والـ loading هو الـ fallback.

الـ layout بيفضل ظاهر والتحميل بيبان في مكان الصفحة بس. والأحسن يبقى skeleton بنفس شكل المحتوى الحقيقي، مش spinner في النص، عشان الصفحة متتنططش لما المحتوى يوصل.`,
          example: R`// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}
// Next بيعمل كده لوحده:
// <Layout>
//   <Suspense fallback={<Loading />}>
//     <ProductsPage />
//   </Suspense>
// </Layout>`,
          try: R`في [[page.tsx]] بتاعة المنتجات حط [[await new Promise((r) => setTimeout(r, 3000))]] في الأول، وافتح الصفحة من لينك: هتلاقي الـ skeleton ظهر على طول والـ header ثابت. وبعدين امسح [[loading.tsx]] وجرّب تاني: الضغطة هتفضل ٣ ثواني من غير أي رد.`,
          flag: "script",
          deep: {
            why: "من غير loading، المستخدم يضغط اللينك ومفيش حاجة تحصل لحد ما السيرفر يخلص، فيضغط تاني أو يفتكر الموقع واقف. الإحساس بالسرعة بييجي من رد فوري، حتى لو الداتا لسه جاية.",
            how: R`[[loading.tsx]] بيتحوّل لـ [[<Suspense fallback={<Loading />}>]] حوالين الصفحة (وأي layout تحت نفس الفولدر). والـ Suspense ده هو اللي بيخلي Next يبعت HTML على دفعات (streaming): الـ layout والـ fallback الأول، وبعدين الصفحة لما تجهز في نفس الـ response.

ومع الـ prefetch، الـ fallback بتاع الصفحات الـ dynamic بيتحمّل مقدمًا لما اللينك يظهر، فالضغطة بتعرضه فورًا من غير ما تستنى السيرفر.

[[loading.tsx]] بيغطي الصفحة كلها. لو عايز الأجزاء السريعة تظهر والبطيئة بس هي اللي تستنى، استخدم [[<Suspense>]] بإيدك حوالين الكومبوننت البطيء (درس streaming في المستوى التاني).

والـ fallback server component عادي، بس خليه خفيف ومن غير داتا.`,
            when: R`أي صفحة بتجيب داتا ممكن تتأخر أكتر من ٣٠٠ ملّي ثانية تقريبًا. وحطه على مستوى الفولدر اللي محتاجه: loading واحد في [[app]] بيغطي كل الموقع بس بيخفي كل الصفحة.`,
            mistakes: R`spinner صغير في نص صفحة فاضية، والمحتوى لما يوصل يزق كل حاجة (CLS). وتحط [[loading.tsx]] في [[app]] بس، فكل صفحة بتستخدم نفس الـ skeleton حتى لو شكلها مختلف. وتكتب [[useState(true)]] و [[useEffect]] للتحميل في صفحة server component: ملوش لازمة، والداتا بتيجي قبل الـ render أصلًا.`
          },
          teach: R`## الفكرة: ملف بالاسم ده بس، و Next يعمل الباقي

[[loading.tsx]] كومبوننت عادي جدًا، والمهم **اسم الملف ومكانه**: جنب [[page.tsx]]. Next بيعرضه مكان الصفحة لحد ما تجهز. هنقرا الكومبوننت، وبعدين نشوف بالوقت (Next 16.4، [[next build]] و [[next start]]) إيه اللي بيظهر ولحد إمتى، مع صفحة منتجات بتستنى ٣ ثواني ([[await new Promise((r) => setTimeout(r, 3000))]]).

---

## ١. الكومبوننت سطر سطر

### [[export default function Loading()]]

[[export default]] لازم، والاسم [[Loading]] مش مهم. ومبياخدش props.

### [[<div className="grid grid-cols-2 gap-4 md:grid-cols-4">]]

Tailwind:

| الـ class | معناه |
|---|---|
| [[grid]] | اعرض الولاد في شبكة |
| [[grid-cols-2]] | عمودين |
| [[gap-4]] | مسافة بين الخانات |
| [[md:grid-cols-4]] | من الشاشات المتوسطة وأكبر: ٤ أعمدة |

نفس الـ grid اللي صفحة المنتجات الحقيقية هتستخدمه، فلما المحتوى يوصل ياخد نفس المكان بالظبط ومفيش حاجة تتزق.

### [[{Array.from({ length: 8 }, (_, i) => (]]

[[Array.from]] بيعمل array جديد:

- [[{ length: 8 }]]: طوله ٨.
- [[(_, i) => ...]]: دالة بتتنادى لكل خانة. أول parameter القيمة (فاضية هنا، فسميناها [[_]] يعني «مش محتاجها»)، والتاني [[i]] رقم الخانة من ٠ لـ ٧.

يعني ٨ عناصر JSX.

### [[<div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200" />]]

- [[key={i}]]: React محتاج [[key]] لكل عنصر في ليستة.
- [[h-64]] ارتفاع ثابت قد كارت المنتج، و [[rounded-lg]] حواف مدورة، و [[bg-gray-200]] رمادي فاتح.
- [[animate-pulse]]: animation بتخلي الشفافية تروح وتيجي («بينبض»).

ده اسمه **skeleton**: شكل المحتوى من غير المحتوى.

---

## ٢. اللي Next بيعمله: التعليق اللي في آخر المثال

~~~text الشكل اللي Next بيبنيه
<Layout>
  <Suspense fallback={<Loading />}>
    <ProductsPage />
  </Suspense>
</Layout>
~~~

[[<Suspense>]] من React: «لو اللي جوايا لسه مستني داتا، اعرض الـ [[fallback]] مكانه». و Next بيعمل اللفة دي لوحده لما يلاقي [[loading.tsx]]. الـ layout برّه الـ Suspense، فبيفضل ظاهر.

---

## ٣. التجربة الأولى: فتح الصفحة مباشرة (refresh)

سكربت Node بيطلب [[/products]] ويطبع كل حتة (chunk) من الـ response وقت ما وصلت، وفيها كام skeleton:

~~~text الناتج مع loading.tsx
0.1s 2278B 8 skeleton
0.1s 5543B 8 skeleton
3.1s 125B 0 skeleton has products
3.1s 1173B 0 skeleton has products
3.1s 14B 0 skeleton
~~~

- عند ٠.١ ثانية وصل HTML فيه الـ layout و ٨ skeletons.
- عند ٣.١ (بعد الـ ٣ ثواني بتوع الصفحة) وصل المحتوى الحقيقي **في نفس الـ response**. ده الـ streaming: السيرفر بيبعت على دفعات ومبيقفلش الاتصال لحد ما يخلص.
- [[B]] = byte.

ومن غير [[loading.tsx]]:

~~~text الناتج من غير loading.tsx
3.1s 1612B 0 skeleton has products
3.1s 4729B 0 skeleton has products
3.1s 14B 0 skeleton
~~~

ولا byte قبل ٣ ثواني: المتصفح بيبص على شاشة بيضا.

---

## ٤. التجربة التانية: الضغط على لينك

فتحنا [[/about]] في Chrome، وضغطنا لينك المنتجات، وكل نص ثانية بنقرا: الـ URL، وعدد الـ skeletons، والـ nav موجود ولا لأ، وأول الـ [[<main>]]:

~~~text الناتج مع loading.tsx
0.1s {"url":"/products","skeletons":8,"nav":true,"main":""}
...
2.6s {"url":"/products","skeletons":8,"nav":true,"main":""}
3.1s {"url":"/products","skeletons":0,"nav":true,"main":"صفحة 1، ترتيب new"}
~~~

الـ URL اتغير والـ skeleton ظهر **فورًا**، والـ nav (في الـ layout) فاضل طول الوقت. ليه فورًا من غير ما يستنى السيرفر؟ لأن الـ prefetch (درس Link) حمّل الـ [[loading.tsx]] مقدمًا لما اللينك ظهر.

~~~text الناتج من غير loading.tsx
0.1s {"url":"/about","skeletons":0,"nav":true,"main":"مين إحنا"}
...
2.6s {"url":"/about","skeletons":0,"nav":true,"main":"مين إحنا"}
3.1s {"url":"/products","skeletons":0,"nav":true,"main":"صفحة 1، ترتيب new"}
~~~

٣ ثواني الصفحة القديمة فاضلة والـ URL متغيرش: الضغطة كأنها محصلتش. وده اللي بيخلي الناس تضغط تاني.

---

## الخلاصة

| | من غير [[loading.tsx]] | مع [[loading.tsx]] |
|---|---|---|
| أول byte في الـ refresh | بعد ٣ ثواني | فورًا (layout + skeleton) |
| الضغط على لينك | مفيش رد ٣ ثواني | الـ skeleton فورًا |
| الـ layout | بيفضل | بيفضل |

- [[loading.tsx]] = [[<Suspense fallback>]] حوالين الصفحة، Next بيعمله لوحده.
- خلي الـ skeleton بنفس شكل ومقاس المحتوى الحقيقي.
- بيغطي الصفحة كلها. لو عايز جزء بس يستنى، [[<Suspense>]] بإيدك (درس streaming).`,
          lines: [
            R`اسم الملف هو المهم ([[loading.tsx]])، واسم الكومبوننت أي حاجة.`,
            "بداية الـ JSX.",
            "نفس الـ grid اللي الصفحة الحقيقية هتستخدمه، فمفيش قفزة لما المحتوى يوصل.",
            R`٨ خانات فاضية. [[Array.from]] بيعمل array بالطول ده.`,
            R`كارت رمادي بـ [[animate-pulse]] (Tailwind) بنفس ارتفاع كارت المنتج.`,
            "قفلة الـ map.",
            "قفلة الـ grid.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`مع [[loading.tsx]]: أول ما تدوس اللينك الـ header بيفضل ثابت، و ٨ كروت رمادي بتنبض بيظهروا مكان الصفحة على طول، وبعد ٣ ثواني المنتجات بتاخد مكانهم في نفس الـ grid من غير ما حاجة تتزق. ولو فتحت الصفحة بـ refresh، الـ HTML نفسه بيوصل على دفعتين في نفس الـ response: الـ skeleton الأول، والمنتجات بعد ٣ ثواني.

من غير [[loading.tsx]]: الضغطة كأنها معملتش حاجة، الصفحة القديمة فاضلة ٣ ثواني، وبعدين الجديدة تظهر مرة واحدة. لو الـ skeleton مظهرش خالص: اتأكد إن الملف جنب [[page.tsx]] بتاعة المنتجات واسمه [[loading.tsx]] بالظبط، وإن الـ await جوه الصفحة مش جوه [[layout.tsx]] بتاع نفس الفولدر (الـ loading بيغطي اللي تحته بس).`
        },
        {
          cmd: "error.tsx و not-found.tsx",
          title: "صفحة خطأ و 404 لكل جزء في الموقع",
          desc: R`[[error.tsx]] بيمسك أي خطأ بيحصل في الصفحة اللي جنبه (والحاجات اللي تحتها)، ويعرض بداله واجهة فيها زرار «جرّب تاني»، والـ layout بيفضل شغال. لازم يبقى client component ([[use client]]) لأنه React Error Boundary.

و [[not-found.tsx]] بيظهر لما تنادي [[notFound()]]، أو لما حد يفتح URL مش موجود خالص (من [[app/not-found.tsx]]). ومعاه Next بيقول للمتصفح وجوجل إن الصفحة مش موجودة، مش بيرجّع 200 عادي.`,
          example: R`// app/products/error.tsx
"use client";
import { useEffect } from "react";
export default function ProductsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div role="alert">
      <p>حصلت مشكلة وإحنا بنجيب المنتجات.</p>
      <button onClick={() => reset()}>جرّب تاني</button>
    </div>
  );
}
// app/not-found.tsx
import Link from "next/link";
export default function NotFound() {
  return <div><h1>الصفحة دي مش موجودة</h1><Link href="/">ارجع للرئيسية</Link></div>;
}`,
          try: R`في [[app/products/page.tsx]] حط [[throw new Error("DB down")]] بعد سطر [[await searchParams]] (لو حطيته قبله، الـ build هيحاول يرسم الصفحة static ويقع بالخطأ نفسه)، وافتح الصفحة في dev: هتلاقي الـ overlay بتاع Next. اقفله وشوف [[error.tsx]]. وبعدين اعمل [[npm run build && npm start]] وافتحها: هتلاقي [[error.message]] بقى رسالة عامة ومعاه [[digest]] رقم، ودوّر على نفس الرقم في لوج الترمنال.`,
          flag: "script",
          deep: {
            why: "من غير error boundary، خطأ واحد في جزء صغير (ويدجت التقييمات) بيوقّع الصفحة كلها وتظهر شاشة بيضا. و 404 من غير status صح بتخلي جوجل يأرشف صفحات «مش موجود» كأنها محتوى.",
            how: R`[[error.tsx]] بيتحوّل لـ Error Boundary حوالين الصفحة جوه الـ layout بتاع نفس الفولدر. يعني بيمسك أخطاء الصفحة والكومبوننتات اللي تحتها، بس مش أخطاء الـ layout اللي جنبه: دي بيمسكها [[error.tsx]] اللي في الفولدر اللي فوق. وأخطاء الـ root layout نفسه محتاجة [[app/global-error.tsx]]، ولازم يكون فيه [[<html>]] و [[<body>]] بتوعه.

في الإنتاج، الأخطاء اللي بتحصل في server components بتوصل للمتصفح من غير الرسالة الأصلية (عشان متسرّبش تفاصيل زي أسماء جداول)، وبيبقى معاها [[digest]] بس، والرسالة الكاملة في لوج السيرفر.

[[reset()]] بيمسح الخطأ ويرسم الجزء ده تاني من غير ما يطلب داتا جديدة من السيرفر. ومن Next 16.3 فيه كمان [[retry()]] (كان اسمه [[unstable_retry()]] في 16.2) بيعمل refresh للداتا مع الـ reset، وده الأنسب لو الخطأ جه من server component (زي الداتابيز اللي كانت واقعة).

[[notFound()]] بتدوّر على أقرب [[not-found.tsx]] فوقها. ولو اتنادت قبل ما الـ streaming يبدأ بترجع status 404، ولو بعده (جوه Suspense) الـ status بيبقى 200 بس Next بيحط [[<meta name="robots" content="noindex">]] عشان جوجل ميأرشفهاش.

وأخطاء الفورمات المتوقعة (إيميل غلط) متترميش: رجّعها كقيمة (درس useActionState). الـ error.tsx للأخطاء اللي مش متوقعة بس.`,
            when: R`[[error.tsx]] على الأقل في [[app]] وفي أي جزء مستقل (dashboard، و checkout). و [[not-found.tsx]] في [[app]] للموقع كله، وجنب الصفحات الـ dynamic لو عايز رسالة خاصة («المنتج مش موجود»).`,
            mistakes: R`تنسى [[use client]] في error.tsx فالـ build يقع. وتعرض [[error.message]] للمستخدم وتستغرب إنه مختلف في الإنتاج. وتتوقع إن error.tsx يمسك خطأ في الـ layout اللي جنبه. وترمي error لغلط validation في فورم، فالمستخدم يشوف «حصلت مشكلة» بدل «الإيميل مش صحيح».`
          },
          teach: R`## الفكرة: ملفين بأسماء محجوزة، واحد للأخطاء وواحد للـ 404

[[error.tsx]] بيظهر مكان الصفحة لو حصل فيها خطأ، و [[not-found.tsx]] بيظهر لو الصفحة مش موجودة. هنقرا الاتنين سطر سطر، وبعدين نرمي خطأ حقيقي في صفحة المنتجات ([[throw new Error("DB down")]] بعد [[await searchParams]]) ونشوفه في dev وفي الإنتاج. كله على Next 16.4.

---

## ١. [[app/products/error.tsx]] سطر سطر

### [["use client";]]

لازم. الـ error.tsx بيتحوّل لـ React Error Boundary، وده بيشتغل في المتصفح، وكمان فيه زرار بـ [[onClick]].

### [[import { useEffect } from "react";]]

هنستخدم effect عشان نسجّل الخطأ.

### [[export default function ProductsError({ error, reset }: {...})]]

Next بيدّيه حاجتين:

| الـ prop | نوعه | إيه هو |
|---|---|---|
| [[error]] | [[Error & { digest?: string }]] | الخطأ نفسه، ومعاه [[digest]] اختياري ([[?]] = ممكن ميبقاش موجود) |
| [[reset]] | [[() => void]] | دالة من غير parameters ومبترجعش حاجة: بتحاول ترسم الجزء ده تاني |

و [[&]] في TypeScript معناها «النوعين مع بعض»: Error عادي وزيادة عليه [[digest]].

### [[useEffect(() => { console.error(error); }, [error]);]]

بعد ما الكومبوننت يترسم، اطبع الخطأ. و [[[error]]] معناها «اعمل كده تاني لو [[error]] اتغير». في الحقيقة هنا بتبعته لخدمة زي Sentry.

### [[<div role="alert">]]

[[role="alert"]] بيقول لقارئ الشاشة «اقرا ده على طول».

### [[<p>حصلت مشكلة وإحنا بنجيب المنتجات.</p>]]

رسالة ثابتة للمستخدم، مش [[error.message]] (هنشوف ليه تحت).

### [[<button onClick={() => reset()}>جرّب تاني</button>]]

بينادي [[reset]].

---

## ٢. [[app/not-found.tsx]]

~~~text app/not-found.tsx
import Link from "next/link";
export default function NotFound() {
  return <div><h1>الصفحة دي مش موجودة</h1><Link href="/">ارجع للرئيسية</Link></div>;
}
~~~

مبياخدش props. ولأنه في [[app]] نفسه، بيغطي أي URL مش موجود في الموقع، وأي [[notFound()]] مفيش [[not-found.tsx]] أقرب منه:

~~~text الناتج: curl localhost:5820/nope
404
<meta name="robots" content="noindex"/>
<h1>الصفحة دي مش موجودة</h1>
~~~

status 404 حقيقي، و [[noindex]] لجوجل، والمحتوى بتاعنا.

---

## ٣. الخطأ في dev

عشان نشوف القيم، زودنا للتجربة سطر في error.tsx بيعرض [[{error.message} | digest: {error.digest}]]. وفتحنا [[/products]] على [[next dev]]:

~~~text الناتج في المتصفح
alert: حصلت مشكلة وإحنا بنجيب المنتجات.DB down | digest: 2873126124جرّب تاني
nav still there: true
~~~

- [[DB down]]: الرسالة الأصلية وصلت، لأننا في dev.
- [[nav still there: true]]: الـ layout (اللي فيه الـ nav) لسه موجود، والـ error.tsx خد مكان الصفحة بس.

وفي ترمنال dev، Next بيوريك السطر اللي رمى بالظبط:

~~~text الناتج في ترمنال next dev
    at Products (src\app\products\page.tsx:8:9)
   7 |   const raw = await searchParams;
>  8 |   throw new Error("DB down");
     |         ^
~~~

(وفي المتصفح بيظهر كمان الـ overlay الأحمر بتاع Next فوق الصفحة، وبتقفله فتلاقي الـ error.tsx تحته.)

---

## ٤. الخطأ في الإنتاج

[[next build]] و [[next start]]، ونفس الصفحة:

~~~text الناتج
curl -w "%{http_code}" → 500

alert: حصلت مشكلة وإحنا بنجيب المنتجات.Minified React error #441; visit https://react.dev/errors/441 for the full message ... | digest: 2532823434جرّب تاني
nav still there: true
~~~

- الـ status **500** (خطأ في السيرفر)، مش 200.
- [[error.message]] **مبقاش «DB down»**. بقى رسالة React رقم 441، ومعناها «حصل خطأ في Server Components، والرسالة الأصلية اتشالت في الإنتاج». ليه؟ عشان رسالة الخطأ ممكن يبقى فيها أسامي جداول أو مسارات أو أسرار.
- [[digest: 2532823434]]: رقم بيمثل الخطأ ده.

وفي ترمنال [[next start]]:

~~~text الناتج في ترمنال next start
⨯ Error: DB down
    at f_ (C:\Users\ali\...\.next\server\chunks\ssr\src_app_products_page_tsx_....js:55:32511) {
  digest: '2532823434'
}
~~~

نفس الرقم. فلو مستخدم بعتلك screenshot فيها الـ digest، تدوّر عليه في اللوج وتلاقي الخطأ الحقيقي. ولاحظ إن الـ stack بيشاور على ملف مضغوط في [[.next]] مش على [[page.tsx]]، لأن الإنتاج مبني من ملفات متصغّرة.

---

## ٥. لو الـ throw قبل [[await searchParams]]

~~~text الناتج: next build
Error occurred prerendering page "/products". Read more: https://nextjs.org/docs/messages/prerender-error
Error: DB down
>  7 |   throw new Error("DB down");
Export encountered an error on /products/page: /products, exiting the build.
~~~

Next بيحاول يرسم كل صفحة static وقت الـ build. الصفحة دي بتبقى dynamic **لما** توصل لـ [[await searchParams]]، فلو الـ throw قبلها، الخطأ بيحصل وقت الـ build نفسه والـ build بيقع.

---

## الخلاصة

| | [[error.tsx]] | [[not-found.tsx]] |
|---|---|---|
| بيظهر لما | خطأ في الصفحة أو اللي تحتها | [[notFound()]] أو URL مش موجود |
| [[use client]] | لازم | مش لازم |
| props | [[error]] و [[reset]] | مفيش |
| الـ status | 500 | 404 |

- الـ layout بيفضل، والملف بياخد مكان الصفحة بس.
- في الإنتاج [[error.message]] مش الرسالة الأصلية. اعرض رسالة ثابتة، وسجّل الـ [[digest]].
- أخطاء الـ layout نفسه بيمسكها [[error.tsx]] اللي فوقه، والـ root layout محتاج [[global-error.tsx]].`,
          lines: [
            "لازم client: الـ Error Boundaries في React بتشتغل في المتصفح.",
            "هنستخدم effect للّوج.",
            R`بياخد [[error]]، و [[digest]] (رقم بيربط الخطأ باللوج على السيرفر)، و [[reset]].`,
            "بعد ما يترسم...",
            "...ابعت الخطأ لخدمة مراقبة (Sentry مثلًا) بدل console.",
            "قفلة الـ effect.",
            "بداية الـ JSX.",
            R`[[role="alert"]] عشان قارئ الشاشة يقراه على طول.`,
            R`رسالة للمستخدم، مش [[error.message]].`,
            R`[[reset]] بيحاول يرسم الجزء ده تاني.`,
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "404 عامة للموقع كله.",
            R`[[not-found]] مبياخدش props.`,
            "رسالة ولينك يرجّعه.",
            "قفلة."
          ],
          sol: R`في dev: الـ overlay بتاع Next فيه «DB down» والسطر اللي رمى. اقفله هتلاقي [[error.tsx]] معروض مكان الصفحة، والـ layout والـ header زي ما هما.

في الإنتاج: الـ status بقى 500، و [[error.message]] مبقاش «DB down». بقى الرسالة العامة بتاعة React، وعندي طلعت بشكلها المختصر [[Minified React error #441]]، ومعناها «حصل خطأ في الـ Server Components والرسالة الأصلية متشالة في الإنتاج». ومعاه [[digest]] رقم زي [[4031509841]]. وفي ترمنال [[npm start]] هتلاقي [[⨯ Error: DB down]] وتحته [[digest: '4031509841']]: نفس الرقم، وده اللي بيربط اللي المستخدم شافه باللوج.

ولو حطيت الـ throw قبل [[await searchParams]]، الـ build بيقع بـ [[Error occurred prerendering page "/products"]]، لأن الصفحة لسه مش dynamic لحظة الـ throw فـ Next بيحاول يبنيها static. ولو شفت «DB down» نفسها في المتصفح: انت على dev مش start.`
        },
        {
          cmd: "@slot و (.)",
          title: "modal ليه URL: parallel و intercepting routes",
          desc: R`Parallel routes: فولدر اسمه بيبدأ بـ [[@]] زي [[@modal]] بيبقى slot، والـ layout بياخده prop جنب [[children]] ويرسمه في المكان اللي يعجبه. كذا صفحة في نفس الوقت، كل واحدة ليها loading و error بتوعها.

Intercepting routes: فولدر بيبدأ بـ [[(.)]] بيمسك التنقل لمسار تاني ويعرض نسخة تانية منه. مع بعض بيعملوا الـ modal المشهور: تضغط على صورة من الليستة تفتح في modal والـ URL يتغير لـ [[/photos/5]]، ولو عملت refresh أو بعت اللينك لحد، يفتح صفحة الصورة الكاملة.`,
          example: R`// app/layout.tsx
export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
// app/@modal/default.tsx
export default function Default() {
  return null;
}
// app/@modal/(.)photos/[id]/page.tsx
export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Modal><PhotoView id={id} /></Modal>;
}
// app/photos/[id]/page.tsx: نفس الصورة كصفحة كاملة لو الـ URL اتفتح مباشرة`,
          try: R`اعمل الملفات دي، وصفحة [[app/page.tsx]] فيها ٣ لينكات لـ [[/photos/1]] و [[/photos/2]] و [[/photos/3]]. اضغط لينك: الصورة تفتح modal والـ URL يتغير. اعمل refresh: تفتح الصفحة الكاملة. وبعدين امسح [[default.tsx]] واعمل [[npm run build]]: الـ build هيقع، واقرا الرسالة، هتلاقيها بتعدّ كل URL في الموقع ملهاش حاجة يرسمها الـ slot.`,
          flag: "script",
          deep: {
            why: "الـ modal العادي ملوش URL: متقدرش تبعته لحد، والـ refresh بيقفله، وزرار الرجوع بيخرّجك من الصفحة كلها بدل ما يقفله. ولوحات التحكم فيها أجزاء مستقلة (إحصائيات، وتنبيهات) كل واحد بيحمّل لوحده ولو واحد وقع الباقي يفضل.",
            how: R`كل slot ليه شجرة routes لوحده جوه نفس الـ URL. في التنقل من جوه الموقع (soft navigation)، Next بيحدّث الـ slot اللي فيه تطابق ويسيب الباقي على آخر حالة. في الـ refresh أو فتح اللينك مباشرة (hard navigation)، Next مبيعرفش الحالة القديمة، فأي slot ملوش تطابق بيرسم [[default.tsx]].

من Next 16 [[default.tsx]] إجباري لكل slot. و Next 16.4 بيفحص شكل الـ routes كله وقت الـ build (اسمه strict route matching، وشغال افتراضيًا)، فمن غيره الـ build بيقع بـ Turbopack و webpack الاتنين، والرسالة بتعدّ كل URL ملهاش page أو default في الـ slot. و [[children]] نفسه slot ضمني، فممكن تحتاج [[app/default.tsx]] كمان.

الـ intercepting بيتكتب بالنسبة لمستوى الـ route segments مش الفولدرات: [[(.)]] نفس المستوى، و [[(..)]] مستوى فوق، و [[(...)]] من الـ root. والـ [[@modal]] مش segment، فـ [[app/@modal/(.)photos]] بيمسك [[app/photos]].

الـ interception بيحصل في soft navigation بس. الـ refresh أو فتح اللينك في تاب جديد بيروح للصفحة الأصلية [[app/photos/[id]/page.tsx]]، فلازم تبقى موجودة.`,
            when: "صورة أو منتج في modal من ليستة (زي انستجرام)، و login في modal، وسلة جانبية ليها URL. و parallel routes لوحدها للوحات فيها أجزاء مستقلة، أو لعرض حاجة مختلفة حسب الدور (slot للأدمن و slot للمستخدم).",
            mistakes: R`تنسى [[default.tsx]] فالـ build يقع. وتنسى الصفحة الأصلية فالـ refresh يطلّع 404. وتقفل الـ modal بـ [[router.push("/")]] بدل [[router.back()]]، فالـ history يتلخبط. وتعمل modal بالطريقة دي لحاجة ملهاش لازمة يبقى ليها URL (تأكيد مسح مثلًا): state عادية أبسط.`
          },
          teach: R`## الفكرة: ٣ ملفات بيعملوا modal ليه URL

المثال ٣ ملفات وتعليق: الـ root layout بياخد slot اسمه [[modal]]، و [[default.tsx]] بيقول «الـ slot فاضي»، وصفحة جوه [[(.)photos]] بتمسك التنقل لـ [[/photos/5]] وتعرضه modal. شغّلنا الملفات دي في مشروع Next 16.4 (بـ [[next build]] و [[next start]])، ومعاها صفحة [[/]] فيها ٣ لينكات، وصفحة الصورة الكاملة، و [[Modal]] client component بسيط بيقفل بـ [[router.back()]].

---

## ١. شجرة الملفات

~~~text الشجرة
app/
  layout.tsx                    بياخد children و modal
  page.tsx                      الرئيسية: لينكات للصور
  photos/[id]/page.tsx          صفحة الصورة الكاملة
  @modal/
    default.tsx                 الـ slot فاضي
    (.)photos/[id]/page.tsx     نفس الصورة بس في modal
~~~

| الرمز | اسمه | معناه |
|---|---|---|
| [[@modal]] | parallel route (slot) | فولدر مش بيظهر في الـ URL، والـ layout بياخده prop اسمه [[modal]] |
| [[(.)]] | intercepting route | «لما حد يتنقل لـ [[photos]] اللي في نفس المستوى، اعرض ده بدلها» |
| [[default.tsx]] | default | اللي يترسم في الـ slot لما مفيش حاجة مطابقة |

---

## ٢. الـ root layout

### [[export default function RootLayout({ children, modal }: LayoutProps<"/">)]]

[[children]] زي العادي (الصفحة). و [[modal]] جاي من فولدر [[@modal]]: اسم الـ prop هو اسم الفولدر من غير [[@]]. و [[LayoutProps]] عارف إن فيه [[modal]] لأن Next بيقرا الفولدرات.

### [[{children}]] ثم [[{modal}]]

الاتنين بيترسموا جنب بعض. أغلب الوقت [[modal]] فاضي ([[null]])، ولما الصورة تتفتح بيبقى فيه الـ modal فوق الصفحة.

---

## ٣. [[app/@modal/default.tsx]]

~~~text app/@modal/default.tsx
export default function Default() {
  return null;
}
~~~

[[return null]] يعني «متعرضش حاجة». ده اللي بيترسم في الـ slot لما تفتح أي صفحة مباشرة (refresh أو لينك من برّه) ومفيش في [[@modal]] حاجة ليها.

---

## ٤. [[app/@modal/(.)photos/[id]/page.tsx]]

### [[export default async function PhotoModal({ params }: { params: Promise<{ id: string }> })]]

صفحة عادية بـ [[params]]. النوع مكتوب بإيده هنا بدل [[PageProps]]، والاتنين صح.

### [[const { id } = await params;]]

الـ [[id]] من الـ URL، زي أي [[[id]]].

### [[return <Modal><PhotoView id={id} /></Modal>;]]

الصورة جوه modal. الـ [[Modal]] كومبوننت بتاعك ([[use client]]، وزرار الإغلاق بينادي [[router.back()]]).

---

## ٥. التجربة

السكربت بيقرا بعد كل خطوة: الـ URL، ونص الـ modal لو موجود، والـ [[h1]] بتاع الصفحة اللي تحته:

~~~text الناتج
home: {"url":"/","modal":null,"h1":"أهلًا"}
after click: {"url":"/photos/2","modal":"صورة 2 في modalاقفل","h1":"أهلًا"}
after refresh: {"url":"/photos/2","modal":null,"h1":"صفحة الصورة 2 كاملة"}
after close (router.back): {"url":"/","modal":null,"h1":"أهلًا"}
~~~

| الخطوة | اللي حصل | ليه |
|---|---|---|
| الضغط على «صورة 2» | الـ URL بقى [[/photos/2]]، والـ modal ظهر، والرئيسية ([[أهلًا]]) لسه تحته | تنقل من جوه الموقع (soft navigation): [[(.)photos]] مسك التنقل، و [[children]] فضل زي ما هو |
| refresh | مفيش modal، والصفحة الكاملة ظهرت | فتح مباشر (hard navigation): مفيش interception، فـ [[app/photos/[id]/page.tsx]] اترسمت، و [[@modal]] رسم [[default.tsx]] |
| زرار اقفل | رجعنا [[/]] من غير modal | [[router.back()]] رجّع خطوة في الـ history |

وفي جدول الـ build ظهر الـ route ده جنب العادي:

~~~text الناتج
├ ƒ /(.)photos/[id]
├ ƒ /photos/[id]
~~~

---

## ٦. من غير [[default.tsx]]

مسحناه وعملنا [[next build]]:

~~~text الناتج
⚠ Strict route matching is enabled by default. ...
> Build error occurred
Error: Turbopack build failed with 3 errors:
Error: Interception routes must have a canonical route
Error: Parallel route slots cannot render the same URLs
- / is missing a matching page or default.tsx in @modal
- /about is missing a matching page or default.tsx in @modal
...
Every URL matched by one slot must have a matching page or default.tsx in every sibling slot.
Error: Unmatched app pages
~~~

والكلام ده معناه: لما حد يفتح [[/]] أو [[/about]] مباشرة، [[children]] عنده صفحة، بس [[@modal]] معندوش لا page ولا default، فمش عارف يرسم إيه. فـ Next 16.4 بيوقف الـ build وبيعدّ كل URL فيها المشكلة. و [[next build --webpack]] وقع بنفس الكلام. وأول سطر بيقول إن الفحص ده (strict route matching) شغال افتراضيًا.

---

## الخلاصة

- [[@name]] = slot بيوصل للـ layout كـ prop بنفس الاسم، ومش جزء من الـ URL.
- [[(.)]] = امسك التنقل لمسار في نفس المستوى، و [[(..)]] مستوى فوق، و [[(...)]] من الـ root.
- الـ interception في التنقل من جوه الموقع بس. الـ refresh بيفتح الصفحة الأصلية، فلازم تبقى موجودة.
- [[default.tsx]] لكل slot دايمًا، وإلا الـ build بيقع.
- اقفل الـ modal بـ [[router.back()]].`,
          lines: [
            R`الـ root layout بياخد [[modal]] من فولدر [[@modal]] جنب [[children]]. الـ [[@]] مبيدخلش في الـ URL.`,
            "بداية الـ JSX.",
            "html.",
            "body.",
            "الصفحة العادية.",
            "الـ slot: فاضي أغلب الوقت، وفيه الـ modal لما يتفتح.",
            "قفلة body.",
            "قفلة html.",
            "قفلة الـ return.",
            "قفلة.",
            R`[[default.tsx]]: اللي يترسم في الـ slot لما مفيش حاجة مطابقة للـ URL الحالي.`,
            R`[[null]]: مفيش modal.`,
            "قفلة.",
            R`[[(.)]] يعني «امسك [[/photos/[id]]] اللي في نفس المستوى» لما التنقل يحصل من جوه الموقع.`,
            "خد الـ id.",
            R`اعرض الصورة جوه modal فوق الصفحة الحالية. الـ Modal بيقفل بـ [[router.back()]].`,
            "قفلة."
          ],
          sol: R`الضغطة على لينك الصورة بتفتح الـ modal فوق الرئيسية (محتوى الرئيسية لسه ظاهر تحته) والـ URL بقى [[/photos/2]]. والـ refresh على نفس الـ URL بيفتح [[app/photos/[id]/page.tsx]]: الصفحة الكاملة من غير modal، لأن الـ interception بيحصل في التنقل من جوه الموقع بس.

من غير [[default.tsx]] (Next 16.4): [[next build]] بيقع، وبـ [[--webpack]] كمان. الرسالة بتقول [[/ is missing a matching page or default.tsx in @modal]] وتكرر السطر ده لكل صفحة في الموقع، وبعدها [[Every URL matched by one slot must have a matching page or default.tsx in every sibling slot.]] يعني لما تفتح أي صفحة مباشرة، الـ slot [[@modal]] ملوش حاجة يرسمها. وفوقها تحذير إن [[Strict route matching is enabled by default]]. ولو الضغطة فتحت الصفحة الكاملة بدل الـ modal: اتأكد إن فولدر [[(.)photos]] جوه [[@modal]]، وإن اللينك [[<Link>]] مش [[<a>]].`
        }
      ]
    },
    {
      t: "Server و Client Components",
      l: 1,
      n: "الافتراضي بيشتغل على السيرفر بس، و use client للحتت التفاعلية، وقواعد التوصيل بينهم",
      items: [
        {
          cmd: "Server Components",
          title: "كومبوننت بيشتغل على السيرفر بس: يقدر يعمل إيه وميقدرش إيه",
          desc: R`أي كومبوننت في [[app]] هو Server Component إلا لو قلت غير كده. بيشتغل على السيرفر بس (وقت الـ build أو مع الطلب)، فيقدر يبقى [[async]] ويكلّم الداتابيز ويقرا ملفات ويستخدم أسرار، والكود بتاعه والمكتبات اللي بيستخدمها مبيوصلوش للمتصفح خالص.

التمن: مفيش تفاعل. مفيش [[useState]] ولا [[useEffect]] ولا [[onClick]] ولا [[window]] ولا [[localStorage]]. الحتة اللي محتاجة ده بتبقى client component صغير جوه الـ server component.`,
          example: R`// app/products/page.tsx (Server Component: من غير أي directive)
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "./add-to-cart";
export default async function ProductsPage() {
  const products = await db.product.findMany({
    where: { published: true },
    select: { id: true, name: true, priceCents: true },
  });
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name}: {formatPrice(p.priceCents)}
          <AddToCart productId={p.id} />
        </li>
      ))}
    </ul>
  );
}`,
          try: R`حط [[console.log("render ProductsPage")]] في أول الكومبوننت وافتح الصفحة: هتلاقي الرسالة في ترمنال [[npm run dev]]. وهتلاقيها برضه في console المتصفح بس جنبها علامة «Server»: دي React بتعيد عرضها هناك في dev بس عشان الـ debugging، والكود نفسه اتنفذ على السيرفر. اعمل [[npm run build]]: هتلاقي الرسالة اتطبعت في ترمنال الـ build (الصفحة static فبتترسم وقت الـ build)، وبعد [[npm start]] افتح الصفحة: مش هتظهر في console المتصفح خالص. وبعدين جرّب تضيف [[useState]] جواه واقرا الخطأ اللي Next بيطلّعه.`,
          flag: "script",
          deep: {
            why: R`في SPA عادي، عشان تعرض ليستة منتجات: المتصفح بينزّل JS الصفحة كلها، وبعدين يبعت طلب لـ API، والـ API يكلّم الداتابيز، وبعدين يرسم. يعني loading spinner، و API لازم تكتبه وتحميه، و bundle فيه مكتبات التنسيق. الـ Server Component بيشيل الخطوات دي: الداتا بتتجاب جنب الداتابيز، والنتيجة HTML جاهز.`,
            how: R`React بيرسم الـ server components على السيرفر ويطلّع حاجة اسمها RSC payload: وصف للشجرة فيه ناتج الـ server components (عناصر جاهزة)، وأماكن الـ client components ومعاها الـ props بتاعتها ومسار ملف الـ JS بتاعها. Next بيستخدم الـ payload ده عشان يطلّع HTML لأول تحميل، وبيبعته نفسه في التنقل بين الصفحات.

المتصفح بيحمّل JS الـ client components بس، ويعملها hydration. أما الـ server components فمالهاش أي JS، فمكتبة markdown بحجم ١٠٠ كيلو بتستخدمها في server component بتكلّف صفر على المتصفح.

الـ server component ممكن يترسم وقت الـ build (static) أو مع كل طلب (dynamic) حسب اللي بيستخدمه، ودي تفاصيل المستوى التاني.

وفيه خلط شائع: «server component» مش معناها SSR. الـ client components كمان بتترسم HTML على السيرفر في أول تحميل. الفرق إن الـ server component بيشتغل على السيرفر بس ومبيتبعتش (سؤال في الانترفيو في آخر التاب).`,
            when: "الافتراضي لكل حاجة: الصفحات، و layouts، والحتت اللي بتعرض داتا. انقل لـ client بس الجزء اللي محتاج تفاعل أو APIs المتصفح.",
            mistakes: R`تحط [[use client]] فوق الصفحة كلها عشان زرار واحد، فكل الكود والمكتبات تروح للمتصفح. وتفتكر إن [[console.log]] في server component اتنفذ في المتصفح عشان شفته في الـ console: في dev بيتعاد عرضه هناك بعلامة «Server» بس، وهو اتنفذ على السيرفر، وفي الإنتاج بيظهر في لوجات السيرفر بس. وترجّع object فيه [[passwordHash]] من الداتابيز وتعدّيه لـ client component: الـ props بتتكتب في الصفحة وأي حد يقدر يقراها في View Source. استخدم [[select]].`
          },
          teach: R`## الفكرة: الكومبوننت ده بيتنفذ على السيرفر، واللي بيوصل للمتصفح ناتجه بس

المثال صفحة منتجات: بتكلّم الداتابيز مباشرة، وبتنسّق السعر، وجوه كل منتج زرار تفاعلي صغير. الملف مفيهوش أي directive، فهو Server Component. شغّلناه على Next 16.4، مع [[db]] تجريبي (array في الذاكرة بنفس شكل Prisma، فيه منتج مش منشور وعمود [[passwordHash]])، و [[formatPrice]] بـ [[Intl.NumberFormat]]، و [[AddToCart]] من الدرس الجاي.

---

## ١. الـ imports

| السطر | ليه |
|---|---|
| [[import { db } from "@/lib/db";]] | الداتابيز مباشرة. مفيش API في النص، لأن الكود ده على السيرفر أصلًا |
| [[import { formatPrice } from "@/lib/format";]] | دالة تنسيق. هي وأي مكتبة بتستخدمها بيفضلوا على السيرفر |
| [[import { AddToCart } from "./add-to-cart";]] | client component (الملف بتاعه أوله [[use client]]). [[./]] يعني «في نفس الفولدر» |

---

## ٢. [[export default async function ProductsPage()]]

[[async]]: الكومبوننت بيستنى داتا قبل ما يرجّع JSX. ده مسموح في Server Components بس.

---

## ٣. الـ query

### [[const products = await db.product.findMany({...});]]

[[findMany]] (شكل Prisma) بيرجّع كل الصفوف اللي بتطابق:

- [[where: { published: true }]]: المنشور بس. المنتج التالت عندنا [[published: false]] فمش هيرجع.
- [[select: { id: true, name: true, priceCents: true }]]: التلات أعمدة دول بس. [[passwordHash]] مش هيرجع.

[[priceCents]] السعر بالقروش (٣٥٠٠٠ = ٣٥٠ جنيه): الفلوس بتتخزن أرقام صحيحة عشان الكسور العشرية في الكمبيوتر مش دقيقة.

---

## ٤. الـ JSX

### [[{products.map((p) => (]] و [[<li key={p.id}>]]

لف على المنتجات، وكل منتج [[<li>]] ليه [[key]] فريد.

### [[{p.name}: {formatPrice(p.priceCents)}]]

الاسم والسعر. [[formatPrice]] اتنفذت على السيرفر، فاللي وصل نص جاهز.

### [[<AddToCart productId={p.id} />]]

ده الحتة الوحيدة اللي هيبقى ليها JavaScript في المتصفح.

---

## ٥. اللي طلع: HTML

[[curl localhost:5820/products]] بعد [[next build]] و [[next start]]:

~~~text الناتج
<li>كتاب Next<!-- -->: <!-- -->‏٣٥٠٫٠٠ ج.م.‏<div class="flex gap-2"><input type="number" min="1" value="1"/><button>ضيف للسلة</button></div></li>
~~~

- منتجين بس (المسودة اتشالت بالـ [[where]]).
- [[٣٥٠٫٠٠ ج.م.]]: [[Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" })]] نسّق [[35000 / 100]] بالأرقام العربي والعملة المصري.
- الزرار نفسه ([[AddToCart]]) اترسم HTML كمان: الـ client components برضه بتترسم على السيرفر في أول تحميل.
- دوّرنا على [[passwordHash]] في الصفحة كلها: صفر. الـ [[select]] منعه من البداية.

## ٦. اللي طلع: RSC payload

جوه نفس الصفحة فيه الـ RSC payload (وصف الشجرة اللي React بيستخدمه). ده الجزء بتاع الليستة:

~~~text الناتج
["$","ul",null,{"children":[["$","li","p1",{"children":["كتاب Next",": ","‏٣٥٠٫٠٠ ج.م.‏",["$","$L18",null,{"productId":"p1"}]]}], ...
~~~

- [[["$","li","p1",...]]]: عنصر [[li]] بـ key [[p1]]، جاهز.
- [[["$","$L18",null,{"productId":"p1"}]]]: «هنا client component رقم [[L18]]، وخد الـ props دي». يعني المتصفح بياخد مكانه والـ props بتاعته، وبيحمّل الـ JS بتاعه.
- مفيش أي أثر لـ [[ProductsPage]] ولا [[formatPrice]] ولا [[db]]: النتيجة بس.

وفي [[.next/static/chunks]] (ملفات المتصفح) لقينا الـ AddToCart:

~~~text الناتج
e.s(["AddToCart",0,function({productId:e}){let[n,s]=(0,i.useState)(1),[u,a]=(0,i.useState)(!1); ...
~~~

ودوّرنا على [[ProductsPage]] و [[formatPrice]] في نفس الفولدر: مش موجودين.

---

## ٧. الـ [[console.log]] اتطبع فين؟

حطينا [[console.log("render ProductsPage")]] في أول الكومبوننت:

| فين | اللي ظهر |
|---|---|
| [[next dev]]: الترمنال | [[render ProductsPage]] ثم [[GET /products 200]] |
| [[next dev]]: console المتصفح | نفس السطر وجنبه badge مكتوب فيه [[Server]] |
| [[next build]] | [[render ProductsPage]] وسط سطور [[Generating static pages]] |
| [[next start]]: الترمنال والمتصفح | ولا حاجة |

- في dev الكود اتنفذ على السيرفر، و React **بيعيد عرض** اللوج في المتصفح بعلامة [[Server]] عشان يسهّل عليك.
- في الـ build اتطبع لأن الصفحة اترسمت وقتها: الجدول قال [[○ /products]] (Static)، لأنها مبتقراش حاجة من الطلب.
- في [[next start]] مفيش حاجة، لأن الصفحة HTML جاهز من وقت الـ build، والكومبوننت مبيتنفذش تاني أصلًا.

---

## ٨. [[useState]] في Server Component

زودنا [[import { useState } from "react"]] و [[const [x] = useState(0);]] في الصفحة:

~~~text الناتج: next build
./src/app/products/page.tsx:1:10
Error: You're importing a module that depends on $__btuseState$__bt into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the $__bt"use client"$__bt directive.
~~~

الرسالة بتقترح [[use client]] على الملف، بس الحل الصح إنك تفصل الحتة اللي محتاجة state في كومبوننت لوحده، زي [[AddToCart]].

## الخلاصة

| Server Component يقدر | Server Component ميقدرش |
|---|---|
| [[async]] و [[await]] | [[useState]] و [[useEffect]] |
| الداتابيز والملفات والأسرار | [[onClick]] و [[onChange]] |
| مكتبات تقيلة من غير تكلفة على المتصفح | [[window]] و [[localStorage]] |

- اللي بيوصل للمتصفح: HTML + الـ RSC payload (الناتج)، و JS الـ client components بس.
- أي حاجة بتعدّيها لـ client component كـ prop بتتكتب في الصفحة، فاختار الأعمدة بـ [[select]].`,
          lines: [
            R`الداتابيز مباشرة (Prisma مثلًا، تفاصيله في تاب «SQL و Prisma»). مفيش API في النص.`,
            "دالة تنسيق. هي ومكتباتها بيشتغلوا على السيرفر ومش بيتبعتوا للمتصفح.",
            "client component صغير للزرار (الدرس الجاي).",
            R`كومبوننت [[async]]: ده مينفعش في client component.`,
            "query عادي، بيتنفذ على السيرفر وقت الطلب أو وقت الـ build.",
            "المنشور بس.",
            R`[[select]] للأعمدة اللي هتتعرض بس. أي حاجة ترجعها ممكن توصل للمتصفح لو عدّيتها لـ client component.`,
            "قفلة الـ query.",
            "بداية الـ JSX.",
            "ليستة.",
            "لف على المنتجات.",
            "عنصر لكل منتج.",
            "الاسم والسعر: HTML عادي، صفر JS في المتصفح.",
            R`هنا بس فيه JS هيروح للمتصفح: الزرار، ومعاه [[productId]] كـ prop.`,
            "قفلة العنصر.",
            "قفلة الـ map.",
            "قفلة الليستة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`في dev: السطر بيطلع في ترمنال [[npm run dev]]، وفي console المتصفح بيظهر وجنبه badge رمادي مكتوب فيه Server: دي إعادة عرض من React، مش تنفيذ في المتصفح.

في [[npm run build]] هتلاقي [[render ProductsPage]] وسط سطور [[Generating static pages]]، يعني الصفحة اترسمت وقت الـ build (وفي الجدول [[○]]). وبعد [[npm start]] الـ console فاضي، والترمنال كمان مش هيطبع حاجة مع الطلبات، لأن الصفحة static والكومبوننت مبيتنفذش تاني أصلًا.

و [[useState]]: الـ build بيقع برسالة [[You're importing a module that depends on useState into a React Server Component module. This API is only available in Client Components.]] ومعاها اقتراح إنك تعلّم الملف بـ [[use client]]. الحل الصح مش تحطها فوق الصفحة: اعمل الحتة اللي محتاجة state كومبوننت client لوحده (الدرس الجاي).`
        },
        {
          cmd: "use client",
          title: R`"use client" بتعمل إيه بالظبط، وتحطها فين؟`,
          desc: R`[[use client]] في أول الملف بتقول لـ Next: «الملف ده وكل اللي بيعمله import بيتبعتوا للمتصفح». هنا تقدر تستخدم state و effects و events و [[window]].

هي حد (boundary) مش علامة على كومبوننت واحد: اللي تحتها في شجرة الـ imports كله بيبقى client. عشان كده حطها في أصغر حتة تفاعلية (الزرار، أو الـ form)، مش فوق الصفحة. والـ client component برضه بيترسم HTML على السيرفر في أول تحميل، وبعدين المتصفح بيعمله hydration.`,
          example: R`// app/products/add-to-cart.tsx
"use client";
import { useState } from "react";
export function AddToCart({ productId }: { productId: string }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  return (
    <div className="flex gap-2">
      <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
      <button onClick={() => setAdded(true)} disabled={added}>
        {added ? "اتضاف للسلة" : "ضيف للسلة"}
      </button>
    </div>
  );
}`,
          try: R`اعمل [[npm run build]] و [[npm start]] وافتح الصفحة، وفي DevTools > Sources دوّر على [[AddToCart]]: هتلاقيه في ملف JS جوه [[_next/static/chunks]]. ودوّر على [[ProductsPage]]: مش هتلاقيها. (في [[npm run dev]] هتلاقي ملف [[add-to-cart]] باسمه، وممكن تلاقي [[ProductsPage]] كمان تحت [[about://React/Server]]: دي معلومات debugging و source maps بيبعتها React و Next في dev بس.) وبعدين امسح [[use client]] واقرا الخطأ اللي Next بيطلّعه (إنك بتستخدم [[useState]] في كومبوننت مش client).`,
          flag: "script",
          deep: {
            why: "لازم يبقى فيه حد واضح بين الكود اللي بيشتغل على السيرفر والكود اللي بيتبعت للمتصفح، لأن الغلط في الاتجاهين وحش: كود سيرفر في المتصفح معناه أسرار مكشوفة ومكتبات تقيلة، و hooks على السيرفر معناها crash.",
            how: R`الـ bundler بيمشي على الـ imports من الـ server component. أول ما يقابل ملف فيه [[use client]]، بيعتبره نقطة دخول لـ bundle المتصفح، وكل ملف بيتعمله import من جواه بيدخل نفس الـ bundle، حتى لو مفيهوش directive. عشان كده مش محتاج تكتبها في كل ملف، ومش المفروض.

الـ client component بيتنفذ مرتين في أول تحميل: مرة على السيرفر عشان يطلّع HTML (SSR)، ومرة في المتصفح عشان يربط الـ events (hydration). وده سبب إن [[window]] و [[localStorage]] مينفعوش في جسم الكومبوننت: على السيرفر مش موجودين. حطهم جوه [[useEffect]] أو event handler.

الـ props اللي بتعدّي من server لـ client لازم serializable: strings وأرقام و booleans و objects و arrays و [[Date]] و [[Map]] و [[Set]] و Promises و JSX. الدوال العادية لأ، والاستثناء Server Actions (المستوى التاني).

و [[use client]] مش معناها «متترسمش على السيرفر». لو محتاج كومبوننت ميترسمش على السيرفر خالص (مكتبة خرايط بتلمس [[window]] أول ما تتعمل import)، استخدم [[next/dynamic]] بـ [[ssr: false]] (المستوى التالت).`,
            when: R`لما الكومبوننت محتاج: state، أو effects، أو event handlers، أو APIs المتصفح، أو مكتبة بتستخدم الحاجات دي (أغلب مكتبات الـ UI والـ charts والـ animation)، أو context.`,
            mistakes: R`[[use client]] فوق [[page.tsx]] أو [[layout.tsx]] فكل الموقع يبقى client. وتكتبها في كل ملف «احتياطي». و [[localStorage.getItem]] في جسم الكومبوننت فيطلع «localStorage is not defined» على السيرفر. وتعدّي [[onClick={() => ...}]] من server component لـ client component فيطلع خطأ إن الدوال مينفعش تتبعت لـ Client Components.`
          },
          teach: R`## الفكرة: سطر واحد بيقول «الملف ده بيروح المتصفح»

المثال هو الزرار اللي الدرس اللي فات استخدمه: خانة كمية وزرار «ضيف للسلة». فيه state و events، فلازم يبقى client component. هنقراه سطر سطر، وبعدين نشوف على Next 16.4 (dev و build و start، و Chrome حقيقي بـ playwright) هو بيشتغل فين وإيه اللي بيحصل لو شلنا السطر الأول.

---

## ١. [["use client";]]

- لازم يبقى **أول سطر** في الملف، قبل أي import.
- string عادي بين علامتين، مش دالة ولا import. اسمه directive: تعليمة للـ bundler.
- معناه: «الملف ده، وكل ملف بيعمله import، يدخلوا الـ JavaScript اللي بيتبعت للمتصفح».

---

## ٢. [[import { useState } from "react";]]

[[useState]] hook من React، وهو سبب إن الملف لازم يبقى client (تاب «React» فيه الدرس بتاعه).

---

## ٣. [[export function AddToCart({ productId }: { productId: string })]]

- [[export function]] مش [[export default]]: ده كومبوننت عادي مش صفحة، فبيتعمله import باسمه [[{ AddToCart }]].
- [[productId]] جاي من الـ server component. والـ props اللي بتعدّي من server لـ client لازم تبقى **serializable** (تتحوّل نص وترجع زي ما هي): string ورقم و boolean و object و array و Date و Promise و JSX.

جربنا نعدّي دالة من الصفحة (server) للزرار: [[<AddToCart productId={p.id} onAdd={() => console.log("x")} />]]:

~~~text الناتج: next build
Error occurred prerendering page "/products".
Error: Event handlers cannot be passed to Client Component props.
  {productId: "p1", onAdd: function onAdd}
~~~

الدالة كود على السيرفر، ومينفعش تتكتب في الصفحة وتتبعت.

---

## ٤. الـ state

| السطر | معناه |
|---|---|
| [[const [qty, setQty] = useState(1);]] | الكمية، وأولها ١ |
| [[const [added, setAdded] = useState(false);]] | اتضاف ولا لأ، وأوله لأ |

[[useState]] بيرجّع حاجتين: القيمة، ودالة بتغيّرها وبتخلي React يرسم تاني.

---

## ٥. الـ JSX

### [[<input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />]]

من جوه لبرة:

1. [[e.target.value]]: اللي اتكتب في الخانة، ودايمًا string حتى لو [[type="number"]].
2. [[Number(...)]]: حوّله رقم.
3. [[setQty(...)]]: خزّنه في الـ state.

و [[value={qty}]] بيخلي الخانة تعرض الـ state (controlled input).

### [[<button onClick={() => setAdded(true)} disabled={added}>]]

- [[onClick]]: لما يتضغط، [[added]] تبقى [[true]].
- [[disabled={added}]]: بعد الضغط الزرار يتقفل.

### [[{added ? "اتضاف للسلة" : "ضيف للسلة"}]]

[[? :]] (ternary): لو [[added]] اعرض الأول، غير كده التاني.

---

## ٦. شغّلناه

### في المتصفح (next start)

كتبنا ٣ في خانة أول منتج وضغطنا الزرار:

~~~text الناتج
before: ضيف للسلة disabled: false
after: اتضاف للسلة disabled: true qty: 3
~~~

### الـ HTML جاي جاهز من السيرفر

[[curl]] لنفس الصفحة فيه:

~~~text الناتج
<div class="flex gap-2"><input type="number" min="1" value="1"/><button>ضيف للسلة</button></div>
~~~

يعني الكومبوننت **اتنفذ على السيرفر كمان** وطلّع HTML بالقيم الأولى. وبعدين في المتصفح، الـ JS بتاعه بيوصل ويربط الـ [[onClick]] و [[onChange]] بالـ HTML الموجود (ده الـ hydration). عشان كده [[window]] و [[localStorage]] مينفعوش في جسم الكومبوننت: في المرة الأولى على السيرفر مش موجودين.

### الكود في ملفات المتصفح

| | الملف اللي فيه [[AddToCart]] |
|---|---|
| [[next start]] | ملف باسم عشوائي في [[_next/static/chunks]]، وجواه [[e.s(["AddToCart",0,function({productId:e}){let[n,s]=(0,i.useState)(1) ...]] |
| [[next dev]] | ملف باسمه: [[src_app_products_add-to-cart_tsx_1f-z9dp-xib9i._.js]] |

في الإنتاج الكود متصغّر (أسماء المتغيرات بقت [[e]] و [[n]] و [[s]])، بس اسم الـ export [[AddToCart]] والنصوص فضلوا. و [[ProductsPage]] (الصفحة الـ server) مش موجودة في أي ملف هناك.

---

## ٧. من غير [[use client]]

مسحنا السطر الأول من الملف:

~~~text الناتج: next build
./src/app/products/add-to-cart.tsx:1:10
Error: You're importing a module that depends on $__btuseState$__bt into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the $__bt"use client"$__bt directive.
~~~

أي ملف من غير directive بيبقى server component، و [[useState]] مش مسموح هناك. و [[1:10]] = السطر ١ العمود ١٠، مكان [[useState]] في الـ import.

---

## الخلاصة

- [[use client]] أول سطر، وبتحدد **حد**: الملف ده وكل اللي بيعمله import بقوا client.
- الـ client component بيترسم HTML على السيرفر الأول، وبعدين بيعمل hydration في المتصفح.
- الـ props من server لـ client لازم serializable، والدوال العادية لأ.
- حطها في أصغر كومبوننت تفاعلي، مش فوق الصفحة.`,
          lines: [
            "أول سطر في الملف، قبل أي import. من هنا وتحت كله client.",
            "hooks مسموحة هنا.",
            "الـ props لازم تبقى serializable: string ورقم و boolean و object و array و Date و Promise و JSX. مينفعش دالة عادية من server component.",
            "state للكمية.",
            "state للحالة.",
            "بداية الـ JSX.",
            "div.",
            "input بـ onChange: ده سبب إن الملف client.",
            "زرار بـ onClick.",
            "النص بيتغير مع الـ state.",
            "قفلة الزرار.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`في الإنتاج: البحث في Sources عن [[AddToCart]] بيلاقيه جوه ملف في [[_next/static/chunks]]، لأن اسم الـ export بيفضل موجود حتى بعد الـ minify، ومعاه النصوص «ضيف للسلة» و «اتضاف للسلة». و [[ProductsPage]] مش موجودة في أي ملف هناك، لأنها server component.

ولما تمسح [[use client]]: نفس خطأ الدرس اللي فات، [[You're importing a module that depends on useState into a React Server Component module]]، والرسالة نفسها بتقولك علّم الملف بـ [[use client]]. لو لقيت [[ProductsPage]] في chunks الإنتاج: انت حاطط [[use client]] فوق [[page.tsx]] نفسها.`
        },
        {
          cmd: "children من السيرفر",
          title: "تحط server component جوه client component إزاي؟",
          desc: R`client component مينفعش يعمل [[import]] لـ server component: اللي بيتعمله import من ملف client بيبقى client هو كمان. بس ينفع يستلمه جاهز كـ [[children]] أو أي prop من نوع JSX، والـ server component اللي فوق هو اللي يركّبهم.

ودي نفس الطريقة اللي بتحط بيها providers (theme و React Query و i18n): كومبوننت client صغير بياخد [[children]]، وتحطه في الـ root layout. الـ provider بيبقى client، واللي جواه يفضل server.`,
          example: R`// app/providers.tsx
"use client";
import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
// app/layout.tsx (server)
import { Providers } from "./providers";
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}`,
          try: R`اعمل client component اسمه [[Toggle]] بيعرض [[children]] أو يخبيها بزرار. حط جواه server component [[async]] بيجيب داتا، مرة كـ children من الصفحة (هيشتغل)، ومرة بـ [[import]] جوه ملف الـ Toggle نفسه (هيطلع خطأ إن async component مش مدعوم في client).`,
          flag: "script",
          deep: {
            why: "الواجهة الحقيقية متداخلة: modal تفاعلي جواه محتوى من الداتابيز، وتابات جوه كل تاب داتا. لو كل حاجة جوه client component بقت client، التطبيق كله هيبقى client ويرجع SPA. الـ composition بيخليك تحط الجزء التفاعلي برّه والداتا جوه.",
            how: R`الـ server component اللي فوق بيترسم الأول، وبيطلّع ناتج كل الـ server components (بما فيهم اللي اتبعتوا كـ children) عناصر جاهزة جوه الـ RSC payload. الـ client component بيستلم [[children]] دي كعناصر خلاص اترسمت، فمبيعرفش ولا يهمه إنها جت من السيرفر، ومبيحتاجش الكود بتاعها.

إنما لو ملف client عمل [[import]] لملف كومبوننت، الـ bundler بيضم الملف ده للـ bundle بتاع المتصفح، فيتحوّل client. ولو كان [[async]] أو بيستخدم الداتابيز، يطلع خطأ.

نفس الفكرة لأي prop: [[<Tabs details={<ProductDetails />} reviews={<Reviews />} />]]، كل تاب server component والـ Tabs نفسه client.

والـ context: [[createContext]] و [[useContext]] client بس. الـ server components مبتقراش context. لو محتاج داتا مشتركة على السيرفر (المستخدم الحالي مثلًا)، ناديها في كل مكان محتاجها، و [[cache()]] من React بيخليها تتنفذ مرة واحدة في الطلب (درس DAL).`,
            when: "Providers في الـ layout، و modals و tabs و accordions جواها محتوى من السيرفر، وأي wrapper تفاعلي حوالين داتا.",
            mistakes: R`تعمل [[import ServerThing from "./server-thing"]] جوه client component وتستغرب إن فيه خطأ أو إن الكود بقى بيتبعت للمتصفح. وتحط الـ providers في [[layout.tsx]] نفسه وتكتب فوقه [[use client]]. وتعمل [[new QueryClient()]] على مستوى الملف فالكاش يتشارك بين مستخدمين على السيرفر.`
          },
          teach: R`## الفكرة: الـ client component بيستلم الـ server component جاهز، مبيستوردوش

القاعدة: اللي بيتعمله [[import]] من ملف [[use client]] بيبقى client هو كمان. بس الـ client component يقدر **يستلم** server components جاهزين في [[children]]. المثال بيطبّق ده على أشهر حالة: الـ providers في الـ root layout. شغّلناه على Next 16.4 (مع [[@tanstack/react-query]] 5 و [[next-themes]] 0.4)، وجربنا الـ solCode (Toggle و Data) بالطريقتين.

---

## ١. [[app/providers.tsx]] سطر سطر

### [["use client";]]

الـ providers بتستخدم context و state، ودول client بس.

### [[import { useState, type ReactNode } from "react";]]

- [[useState]]: هنستخدمه بطريقة خاصة تحت.
- [[type ReactNode]]: نوع «أي حاجة تترسم» (عنصر، نص، null، ليستة). كلمة [[type]] جوه الـ import معناها «ده نوع بس، متدخلوش في الـ JS».

### [[import { QueryClient, QueryClientProvider } from "@tanstack/react-query";]]

React Query: [[QueryClient]] هو الكاش، و [[QueryClientProvider]] بيوصّله لكل الكومبوننتات اللي تحته.

### [[import { ThemeProvider } from "next-themes";]]

مكتبة الـ dark mode.

### [[export function Providers({ children }: { children: ReactNode })]]

بياخد [[children]] من غير ما يعرف هي إيه.

### [[const [queryClient] = useState(() => new QueryClient());]]

- [[useState(() => ...)]]: لما تدّي [[useState]] دالة، React بينفّذها **مرة واحدة بس** أول ما الكومبوننت يتعمل، ويحتفظ بالنتيجة.
- [[const [queryClient] =]]: بناخد القيمة بس، ومش محتاجين دالة التغيير.
- ليه مش [[const queryClient = new QueryClient()]] برّه الكومبوننت؟ لأن الملف ده بيتنفذ على السيرفر كمان (SSR)، وأي متغير على مستوى الملف هناك بيتشارك بين **كل** الطلبات، يعني كاش مستخدم يبان لمستخدم تاني. جوه [[useState]] كل مستخدم ليه نسخة.

### الـ JSX

~~~text الشكل
<QueryClientProvider client={queryClient}>
  <ThemeProvider attribute="class">{children}</ThemeProvider>
</QueryClientProvider>
~~~

provider جوه provider، وفي الآخر [[children]]. و [[attribute="class"]] معناها «حط اسم الثيم كـ class على [[<html>]]».

---

## ٢. [[app/layout.tsx]] (server)

### [[import { Providers } from "./providers";]]

الـ layout server component، وبيعمل import لـ client component. ده مسموح: server يقدر يستورد client، العكس هو اللي فيه مشكلة.

### [[<html lang="ar" dir="rtl" suppressHydrationWarning>]]

[[next-themes]] بيحط class على [[<html>]] قبل ما React يعمل hydration. فالـ HTML اللي جه من السيرفر هيبقى مختلف عن اللي في المتصفح في الـ attribute ده، و React هيطلّع تحذير. [[suppressHydrationWarning]] بيقوله «عارف، متحذرش»، وبيأثر على العنصر ده بس، مش اللي جواه. ولما شغّلنا الصفحة، [[<html>]] كان عليه [[class="light"]].

### [[<body><Providers>{children}</Providers></body>]]

الصفحات بتدخل في [[Providers]] كـ [[children]]. مين اللي ركّبهم؟ الـ layout، وهو server. فالصفحات بتفضل server components مع إنها جوه client component.

---

## ٣. التجربة: Toggle و Data

[[Toggle]] client بيعرض [[children]] أو يخبيها، و [[Data]] server component [[async]] بيستنى نص ثانية ويرجّع [[<p>داتا من السيرفر</p>]].

### الطريقة الصح: [[<Toggle><Data /></Toggle>]] في الصفحة

~~~text الناتج (next start)
html class: light | main: خبّيداتا من السيرفر
after click: اعرض
after 2nd click: خبّيداتا من السيرفر
~~~

الزرار شغال، والداتا بتختفي وترجع. ودوّرنا على [[داتا من السيرفر]] في ملفات [[_next/static/chunks]]: ولا ملف. يعني [[Data]] اتنفذ على السيرفر بس، ووصل للـ Toggle عنصر خلاص اترسم جوه الـ RSC payload.

### الطريقة الغلط: [[import { Data } from "./data"]] جوه [[toggle.tsx]]

الـ build عدّى، والـ HTML نفسه كان فيه الداتا:

~~~text الناتج: curl
<main><div><button>خبّي</button><p>داتا من السيرفر</p></div>...
~~~

بس في المتصفح:

~~~text الناتج (next start)
html class: light | main: خبّيداتا من السيرفر
after click: خبّيداتا من السيرفر
after 2nd click: خبّيداتا من السيرفر
~~~

الزرار مبيعملش حاجة، و [[داتا من السيرفر]] بقت موجودة في ملف واحد في [[_next/static/chunks]]: [[Data]] دخل bundle المتصفح. وفي [[next dev]] الـ console قال السبب:

~~~text الناتج في console المتصفح (dev)
<Data> is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding $__bt'use client'$__bt to a module that was originally written for the server.
~~~

[[Data]] ملوش [[use client]]، بس لأنه اتعمله import من ملف client بقى client، والـ client components مينفعش تبقى [[async]]. وفي الإنتاج مفيش رسالة خالص، الزرار بس بيبطّل يرد، ودي أصعب في الاكتشاف.

---

## الخلاصة

| | [[<Client><Server /></Client>]] من ملف server | [[import Server]] جوه ملف client |
|---|---|---|
| [[Server]] بيتنفذ فين | السيرفر بس | المتصفح كمان (بقى client) |
| الكود بتاعه في bundle المتصفح | لأ | أيوة |
| [[async]] والداتابيز | شغالين | خطأ |

- الـ client component يستلم server components في [[children]] أو أي prop من نوع JSX.
- الـ providers: كومبوننت client صغير بياخد [[children]]، وتحطه في الـ root layout.
- [[new QueryClient()]] جوه [[useState(() => ...)]]، مش على مستوى الملف.`,
          lines: [
            "الـ providers بتستخدم context و state، فلازم client.",
            R`[[ReactNode]] نوع أي حاجة تترسم.`,
            R`React Query (تفاصيله في تاب «React»).`,
            R`الـ dark mode (تاب «HTML و CSS»).`,
            R`بياخد [[children]] من غير ما يعرف هي إيه.`,
            R`client واحد لكل مستخدم. [[useState]] مش [[new QueryClient()]] برّه الكومبوننت، عشان على السيرفر ميتشاركش بين الطلبات.`,
            "بداية الـ JSX.",
            "provider الـ React Query.",
            R`provider الثيم، وجواه [[children]].`,
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "الـ root layout، server component.",
            "layout عادي.",
            "بداية الـ JSX.",
            R`[[suppressHydrationWarning]] عشان next-themes بيحط class على [[<html>]] قبل الـ hydration.`,
            R`الصفحات جوه [[Providers]] كـ children، فبتفضل server components.`,
            "قفلة html.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`مرة الـ children: الـ Toggle بيعرض الداتا ويخبيها عادي، و [[Data]] اترسم على السيرفر ووصل للـ Toggle عنصر جاهز. الـ Toggle مبيعرفش إنه async أصلًا.

مرة الـ import جوه ملف الـ Toggle: الـ build عدّى عندي والـ HTML اترسم، بس الزرار مبقاش بيعمل حاجة. وفي [[npm run dev]] أول ما الصفحة تفتح بيطلع في الـ console (في الإنتاج مفيش رسالة، الزرار بس بيبطّل يرد): [[<Data> is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding 'use client' to a module that was originally written for the server.]] يعني [[Data]] دخل الـ bundle بتاع المتصفح وبقى client، والـ client components مينفعش تبقى async. ولو [[Data]] كان بيستخدم الداتابيز أو عليه [[server-only]]، الـ build نفسه كان هيقع.`,
          solCode: R`// app/toggle.tsx
"use client";
import { useState, type ReactNode } from "react";
export function Toggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>{open ? "خبّي" : "اعرض"}</button>
      {open && children}
    </div>
  );
}
// app/data.tsx (server component)
export async function Data() {
  await new Promise((r) => setTimeout(r, 500));
  return <p>داتا من السيرفر</p>;
}
// app/page.tsx
import { Toggle } from "./toggle";
import { Data } from "./data";
export default function Page() {
  return <Toggle><Data /></Toggle>;
}`
        },
        {
          cmd: "server-only",
          title: "تمنع كود السيرفر والأسرار إنهم يوصلوا للمتصفح",
          desc: R`[[import "server-only"]] في أول ملف بتقول «الملف ده للسيرفر بس»، ولو أي client component عمله import بالغلط، الـ build يقع برسالة واضحة بدل ما الكود (وأي سر جواه) يتبعت للمتصفح. حطه في ملفات الداتابيز والـ auth والمكتبات اللي بتستخدم مفاتيح.

ومتغيرات البيئة: اللي بتبدأ بـ [[NEXT_PUBLIC_]] بس هي اللي بتوصل للمتصفح، وبتتحط جوه الـ JS وقت الـ build. أي متغير تاني بيبقى [[undefined]] في المتصفح، وده حماية، مش bug.`,
          example: R`// lib/payments.ts
import "server-only";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// lib/public-config.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
// components/checkout-button.tsx
"use client";
import { siteUrl } from "@/lib/public-config";
import { stripe } from "@/lib/payments"; // الـ build بيقع هنا، وده المطلوب`,
          try: R`اعمل [[lib/secret.ts]] فيه [[export const key = process.env.MY_SECRET]] من غير [[server-only]]، واستخدمه في client component واطبعه: في console المتصفح هتلاقيه undefined (Next مبيبعتش المتغير للـ JS)، بس اعمل View Source: هتلاقي القيمة الحقيقية مكتوبة في الـ HTML، لأن الـ client component اترسم على السيرفر الأول (ومعاها hydration error). بعدين ضيف [[import "server-only"]] وشوف الـ build بيقع بإيه. وجرّب [[NEXT_PUBLIC_MY_SECRET]] وافتح ملف الـ JS في DevTools ودوّر على القيمة.`,
          flag: "script",
          deep: {
            why: "الحد بين السيرفر والمتصفح في Next بقى مجرد import. سطر import واحد غلط في client component ممكن يسحب ملف فيه مفتاح أو اتصال داتابيز للمتصفح. والمتغيرات: مطوّر بيحط NEXT_PUBLIC_ على مفتاح API عشان «كان undefined في المتصفح»، فالمفتاح يتنشر لكل زائر.",
            how: R`باكدج [[server-only]] فاضي تقريبًا، بس معمول بحيث لو اتعمل import في بيئة الـ client، Next يطلّع خطأ وقت الـ build إنك بتستورد حاجة محتاجة server-only في Client Component. وفيه عكسه [[client-only]] للملفات اللي بتلمس [[window]].

متغيرات البيئة: وقت الـ build، Next بيدوّر على [[process.env.NEXT_PUBLIC_X]] مكتوبة بالنص كده ويبدّلها بالقيمة. عشان كده [[process.env[name]]] أو destructuring [[const { NEXT_PUBLIC_X } = process.env]] مبيشتغلوش في المتصفح. ولو غيّرت قيمة [[NEXT_PUBLIC_]] على السيرفر، لازم build جديد.

المتغيرات من غير البادئة بتتقري من [[process.env]] على السيرفر، ومبتتبعتش للمتصفح إلا لو انت عدّيتها بإيدك كـ prop. وده بيحصل بالغلط: [[<Client config={process.env} />]].

وفيه React Taint API تجريبي ([[experimental.taint]]) بيمنع object معيّن إنه يتعدّى لـ client component، بس [[server-only]] و [[select]] بالأعمدة اللي محتاجها أبسط وكفاية غالبًا. وفحص المتغيرات بـ Zod في تاب «TypeScript»، وتفاصيلها في فئة النشر.`,
            when: R`[[server-only]] في كل ملف فيه اتصال بالداتابيز، أو مفاتيح، أو منطق auth، أو data access layer. و [[NEXT_PUBLIC_]] لحاجات عامة فعلًا: URL الموقع، ومفتاح Stripe الـ publishable، و Sentry DSN.`,
            mistakes: R`[[NEXT_PUBLIC_OPENAI_KEY]] عشان «الـ fetch من المتصفح مش شغال». الحل تعمل الطلب من السيرفر (Server Action أو Route Handler)، مش تكشف المفتاح. وتتوقع إن تغيير [[NEXT_PUBLIC_API_URL]] في [[.env]] على السيرفر هيتطبق من غير build. وتعدّي object الـ user كله لـ client component وفيه token أو hash.`
          },
          teach: R`## الفكرة: قفل على ملفات السيرفر، وبادئة للمتغيرات العامة

المثال ٣ ملفات: ملف دفع فيه مفتاح سري ومقفول بـ [[server-only]]، وملف فيه متغير عام بـ [[NEXT_PUBLIC_]]، وزرار client بيعمل import للاتنين. شغّلنا الملفات دي بالظبط على Next 16.4 (مع [[stripe]] 23)، وجربنا كمان التجربة اللي في «جرّب» خطوة خطوة. المتغيرات كانت في [[.env.local]]، والـ build قال إنه قراه: [[- Environments: .env.local]].

---

## ١. [[lib/payments.ts]]

### [[import "server-only";]]

import من غير اسم لباكدج [[server-only]] ([[npm i server-only]]). الباكدج مفيهاش كود تقريبًا، وشغلتها إنها توقّع الـ build لو الملف ده دخل bundle المتصفح.

### [[import Stripe from "stripe";]]

مكتبة الدفع.

### [[export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);]]

- [[process.env]]: object فيه متغيرات البيئة، و Next بيملاه من [[.env]] و [[.env.local]].
- [[STRIPE_SECRET_KEY]]: من غير [[NEXT_PUBLIC_]]، فموجود على السيرفر بس.
- [[!]] في الآخر لـ TypeScript: «أنا متأكد إنه مش [[undefined]]» (نوع أي متغير بيئة [[string | undefined]]).

---

## ٢. [[lib/public-config.ts]]

### [[export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;]]

[[NEXT_PUBLIC_]] في أول الاسم معناها «ده عام». وقت الـ build، Next بيدوّر على النص [[process.env.NEXT_PUBLIC_SITE_URL]] في الكود اللي رايح للمتصفح ويبدّله بالقيمة نفسها.

---

## ٣. [[components/checkout-button.tsx]]

| السطر | النتيجة |
|---|---|
| [["use client";]] | الملف ده وكل اللي بيستورده رايحين المتصفح |
| [[import { siteUrl } from "@/lib/public-config";]] | مسموح: قيمة عامة |
| [[import { stripe } from "@/lib/payments";]] | ممنوع: [[payments.ts]] عليه [[server-only]] |

حطينا الزرار في صفحة وعملنا [[next build]]:

~~~text الناتج
> Build error occurred
Error: Turbopack build failed with 2 errors:
./src/lib/payments.ts:1:1
Error: You're importing a module that depends on "server-only". This API is only available in Server Components in the App Router, but you are using it in the Pages Router.
> 1 | import "server-only";
    | ^^^^^^^^^^^^^^^^^^^^^

Import traces:
  Client Component Browser:
    ./src/lib/payments.ts [Client Component Browser]
    ./src/components/checkout-button.tsx [Client Component Browser]
    ./src/components/checkout-button.tsx [Server Component]
~~~

- الجملة [[but you are using it in the Pages Router]] غلط (إحنا في App Router)، متقفش عندها.
- المهم الـ **Import trace**: بيتقري من تحت لفوق. الصفحة (server) استوردت [[checkout-button.tsx]]، وده client، فاستورد [[payments.ts]] في bundle المتصفح ([[Client Component Browser]]). فعرفت بالظبط أنهي import تشيله.
- [[2 errors]]: التاني نفس المشكلة في [[Client Component SSR]] (نسخة الـ client component اللي بتترسم على السيرفر)، ومعاه رسالة أوضح: [['server-only' cannot be imported from a Client Component module]].

الـ build وقع **قبل** ما أي ملف يتبعت. ده المطلوب.

---

## ٤. التجربة: من غير [[server-only]]

ملف [[lib/secret.ts]] فيه [[export const key = process.env.MY_SECRET;]] (و [[MY_SECRET=sk_test_123456]] في [[.env.local]])، و client component بيطبعه ويعرضه.

~~~text الناتج: curl (View Source)
<p id="k">المفتاح: <!-- -->sk_test_123456</p>
~~~

~~~text الناتج في المتصفح (next start)
[console log] key in component: undefined
[pageerror] Minified React error #418; ... args[]=HTML ...
on screen: المفتاح:
~~~

اللي حصل خطوة خطوة:

1. على السيرفر، الـ client component اترسم HTML، وهناك [[process.env.MY_SECRET]] موجود، فالقيمة الحقيقية اتكتبت في الـ HTML.
2. في المتصفح، Next مبيحطش المتغيرات اللي من غير [[NEXT_PUBLIC_]] في الـ JS، فـ [[key]] بقى [[undefined]].
3. الـ HTML قال حاجة، والمتصفح رسم حاجة تانية، فـ React طلّع خطأ #418 (hydration mismatch: الـ HTML مش مطابق) ورسم نسخة المتصفح.

النتيجة: الشاشة فاضية، **بس السر اتسرّب في الـ HTML** لأي حد يعمل View Source. ودوّرنا على [[sk_test_123456]] في ملفات [[_next/static/chunks]]: مش موجود. التسريب كان في الـ HTML بس.

## ٥. نفس الملف مع [[server-only]]

نفس الخطأ اللي في القسم ٣، والـ trace: [[secret.ts]] ثم [[show.tsx]] ثم [[page.tsx]].

## ٦. نفس الملف بـ [[NEXT_PUBLIC_MY_SECRET]]

~~~text الناتج
[console log] key in component: pub_789
on screen: المفتاح: pub_789
~~~

ومن ملفات [[_next/static/chunks]]:

~~~text الناتج
let t="pub_789";o.s(["Show",0,func...
~~~

القيمة مكتوبة **حرفيًا** في الـ JS. يعني أي حاجة [[NEXT_PUBLIC_]] عامة لأي زائر، ولو غيّرتها لازم build جديد.

---

## الخلاصة

| | من غير بادئة | [[NEXT_PUBLIC_]] |
|---|---|---|
| على السيرفر | موجود | موجود |
| في JS المتصفح | [[undefined]] | مكتوب حرفيًا وقت الـ build |
| يتسرّب لو | client component عرضه (HTML) أو عدّيته prop | دايمًا عام |

- [[import "server-only"]] في أول أي ملف فيه داتابيز أو مفاتيح أو auth: الغلط يبقى build واقع بدل سر متسرّب.
- اقرا الـ Import trace من تحت لفوق عشان تلاقي الـ import الغلط.
- متحطش [[NEXT_PUBLIC_]] على مفتاح سري عشان «كان undefined في المتصفح».`,
          lines: [
            R`باكدج صغير ([[npm i server-only]]) ملوش أي كود وقت التشغيل: شغلته إنه يوقّع الـ build لو اتعمله import من client.`,
            "مكتبة Stripe.",
            R`مفتاح سري من غير [[NEXT_PUBLIC_]]: موجود على السيرفر بس.`,
            "متغير عام: قيمته بتتكتب حرفيًا جوه الـ JS وقت الـ build.",
            "كومبوننت client.",
            "مسموح: حاجة عامة.",
            R`ممنوع: الملف عليه [[server-only]]، فالـ build بيقع قبل ما المفتاح يتسرّب.`
          ],
          sol: R`من غير [[server-only]]: في console المتصفح [[key]] بـ undefined، بس View Source فيه القيمة الحقيقية، لأن الـ client component اترسم HTML على السيرفر الأول، وهناك [[process.env.MY_SECRET]] موجود. وبعدها المتصفح بيرسم undefined فيطلع hydration error (#418 في الإنتاج). يعني السر اتسرّب في الـ HTML، ودي بالظبط المشكلة اللي [[server-only]] بيقفلها.

مع [[import "server-only"]]: الـ build بيقع قبل أي حاجة: [[You're importing a module that depends on "server-only"]]، ومعاه import trace بيوريك السلسلة: [[lib/secret.ts]] ثم [[show.tsx]] (Client Component) ثم [[page.tsx]]. (الرسالة بتقول «Pages Router» غلط، بس الـ trace هو المهم.)

ومع [[NEXT_PUBLIC_MY_SECRET]]: القيمة بتظهر في المتصفح، ولو دوّرت عليها في ملفات [[_next/static/chunks]] هتلاقيها مكتوبة حرفيًا. أي حاجة [[NEXT_PUBLIC_]] عامة لأي زائر.`
        }
      ]
    },
    {
      t: "جلب الداتا",
      l: 2,
      n: "الكومبوننت نفسه بيجيب الداتا على السيرفر، و Suspense بيبعت الصفحة على دفعات",
      items: [
        {
          cmd: "async component",
          title: "تجيب الداتا جوه الكومبوننت نفسه، من غير useEffect",
          desc: R`في App Router مفيش [[useEffect]] ولا [[getServerSideProps]] لجلب الداتا: الـ server component بيبقى [[async]] ويعمل [[await]] على الداتابيز أو [[fetch]] مباشرة، والنتيجة بتترسم.

لو محتاج كذا حاجة مش معتمدة على بعض، ابدأهم مع بعض بـ [[Promise.all]]. لو كتبت [[await]] ورا [[await]]، كل واحد بيستنى اللي قبله (waterfall)، وتلات طلبات كل واحد ٣٠٠ ملّي ثانية بقوا ثانية تقريبًا بدل ٣٠٠.`,
          example: R`// app/dashboard/page.tsx
import { db } from "@/lib/db";
export default async function Dashboard() {
  const [orders, stats, news] = await Promise.all([
    db.order.findMany({ take: 10, orderBy: { createdAt: "desc" } }),
    db.order.aggregate({ _sum: { totalCents: true }, _count: true }),
    fetch("https://api.example.com/news", { headers: { Authorization: $__btBearer $__{process.env.NEWS_KEY}$__bt } }).then((r) => r.json()),
  ]);
  return (
    <>
      <Stats count={stats._count} totalCents={stats._sum.totalCents ?? 0} />
      <OrdersTable orders={orders} />
      <NewsList items={news} />
    </>
  );
}`,
          try: R`اعمل ٣ دوال كل واحدة بتستنى ثانية بـ [[setTimeout]] وترجع قيمة. ناديهم ورا بعض بـ await وقيس وقت فتح الصفحة، وبعدين بـ [[Promise.all]] وقيس تاني. وبعدين خلي واحدة منهم ترمي error وشوف [[Promise.all]] بيعمل إيه، والفرق لو استخدمت [[Promise.allSettled]].`,
          flag: "script",
          deep: {
            why: R`الطريقة القديمة (useEffect في المتصفح) معناها: الصفحة بتظهر فاضية، والـ JS يتحمّل، وبعدين الطلب يطلع للـ API، والـ API يكلّم الداتابيز، وبعدين تترسم. رحلات كتير فوق شبكة الموبايل البطيئة. على السيرفر الداتابيز جنبك (نفس الـ datacenter)، والطلب بياخد ملّي ثواني، والمتصفح بياخد الصفحة جاهزة.`,
            how: R`الـ server component مجرد دالة async، و React بيستنى الـ Promise قبل ما يكمّل رسم الجزء ده. وطول ما مفيش [[<Suspense>]] حواليه، الصفحة كلها بتستنى (الدرس الجاي بيحل ده).

[[fetch]] على السيرفر هو fetch العادي بتاع Node، و Next بيضيف عليه حاجتين: dedupe (نفس الـ URL ونفس الخيارات في نفس الـ render بيتنفذ مرة واحدة، حتى لو ناديته من ٣ كومبوننتات)، وخيارات كاش ([[cache]] و [[next.revalidate]]، في فئة الكاش). ومن Next 15 الـ fetch مبيتكاشش لوحده.

الـ dedupe ده للـ fetch بس. لو بتنادي الداتابيز من كذا كومبوننت في نفس الصفحة (الصفحة و [[generateMetadata]] مثلًا)، لف الدالة في [[cache()]] من [[react]] عشان تتنفذ مرة واحدة في الطلب.

وأخطاء [[Promise.all]]: لو واحد وقع، الكل وقع، والخطأ بيروح لأقرب [[error.tsx]]. لو فيه حاجة ثانوية (الأخبار) مش عايزها توقّع الصفحة، اعزلها في كومبوننت لوحده جوه Suspense و error boundary، أو استخدم [[Promise.allSettled]].`,
            when: "أي داتا بتتعرض في الصفحة. وكلّم الداتابيز مباشرة لو التطبيق هو صاحبها. لو فيه API منفصل (Express مثلًا)، كلّمه من السيرفر بـ fetch (درس BFF).",
            mistakes: R`تعمل Route Handler وتناديه بـ [[fetch("/api/products")]] من server component: رحلة HTTP زيادة لنفس السيرفر، والـ URL النسبي مبيشتغلش على السيرفر أصلًا. نادي الدالة مباشرة. و [[await]] ورا بعض لحاجات مستقلة. و [[useEffect]] مع [[fetch]] في client component لداتا كان ممكن تيجي من السيرفر.`
          },
          teach: R`## الفكرة: الصفحة نفسها [[async]]، وبتبدأ كل الطلبات مع بعض

المثال صفحة dashboard محتاجة ٣ حاجات مش معتمدة على بعض: آخر الطلبات، والإجمالي، وأخبار من API خارجي. بتبدأهم التلاتة في نفس اللحظة بـ [[Promise.all]] وبتستنى مرة واحدة. الداتابيز والـ API في المثال مش موجودين عندنا، فقسنا الفكرة نفسها بدوال بتستنى ثانية ([[setTimeout]]) على Next 16.4 بـ [[next build]] و [[next start]] و [[curl]].

---

## ١. [[export default async function Dashboard()]]

server component [[async]]، فيقدر يعمل [[await]] جواه مباشرة. مفيش [[useEffect]] ولا state ولا loading بإيدك.

---

## ٢. [[const [orders, stats, news] = await Promise.all([...]);]]

من جوه لبرة:

1. جوه الـ array ٣ نداءات: كل نداء **بيبدأ الطلب على طول** وبيرجّع Promise (وعد بقيمة هتيجي بعدين).
2. [[Promise.all([...])]]: Promise واحد بيخلص لما **التلاتة** يخلصوا، وقيمته array بالنتايج بنفس الترتيب.
3. [[await]]: استنى الـ Promise ده.
4. [[const [orders, stats, news] =]]: فك الـ array لتلات متغيرات بالترتيب.

### التلات عناصر

| السطر | بيعمل إيه |
|---|---|
| [[db.order.findMany({ take: 10, orderBy: { createdAt: "desc" } })]] | آخر ١٠ طلبات: [[take]] العدد، و [[desc]] من الأحدث للأقدم |
| [[db.order.aggregate({ _sum: { totalCents: true }, _count: true })]] | مجموع [[totalCents]] وعدد الطلبات في query واحد |
| [[fetch("https://api.example.com/news", { headers: { Authorization: ... } }).then((r) => r.json())]] | طلب لـ API خارجي، و [[.then((r) => r.json())]] بيحوّل الرد لـ object |

### [[Authorization: $__btBearer $__{process.env.NEWS_KEY}$__bt]]

header فيه المفتاح. template string ([[$__bt...$__bt]]) و [[$__{...}]] بيحط قيمة المتغير جوه النص. والطلب ده من السيرفر، فـ [[NEWS_KEY]] (من غير [[NEXT_PUBLIC_]]) مبيوصلش للمتصفح أبدًا.

---

## ٣. الـ JSX

### [[<Stats count={stats._count} totalCents={stats._sum.totalCents ?? 0} />]]

[[??]] (nullish coalescing): «لو اللي على الشمال [[null]] أو [[undefined]]، خد اللي على اليمين». [[_sum.totalCents]] بيبقى [[null]] لو مفيش طلبات خالص، فبنبعت ٠.

### [[<>...</>]]

Fragment: بيلم كذا عنصر من غير ما يضيف [[div]] في الصفحة.

---

## ٤. قسنا: ورا بعض ولا مع بعض؟

٣ دوال، كل واحدة بتستنى ثانية وترجع حرف. ٣ صفحات:

~~~text صفحة wf-seq
const a = await getA();
const b = await getB();
const c = await getC();
~~~

~~~text صفحة wf-all
const [a, b, c] = await Promise.all([getA(), getB(), getC()]);
~~~

و [[curl -w "%{time_total}"]] بيطبع الوقت الكلي للطلب:

~~~text الناتج
wf-seq 200 3.071977s
<p>ABC ورا بعض في 3038ms</p>
wf-all 200 1.016607s
<p>ABC بـ Promise.all في 1005ms</p>
~~~

- ورا بعض: ٣ ثواني. [[getB]] مبدأتش غير لما [[getA]] خلصت. ده اسمه **waterfall** (شلال: كل واحد مستني اللي قبله).
- بـ [[Promise.all]]: ثانية. التلاتة بدأوا في نفس اللحظة، والوقت = أبطأ واحد فيهم.
- الـ ٣٨ و ٥ ملّي ثانية الزيادة: وقت التايمرات نفسها والرسم.

---

## ٥. لو واحد وقع

### [[Promise.all]]

خلينا التالتة ترمي [[throw new Error("C وقعت")]]:

~~~text الناتج
wf-fail 500 1.083032s

⨯ Error: C وقعت
  digest: '236115339'
~~~

الصفحة كلها 500 (وكانت هتروح لأقرب [[error.tsx]] لو موجود)، مع إن A و B نجحوا.

### [[Promise.allSettled]] (الـ solCode)

[[allSettled]] مبيرميش خالص. بيستنى الكل، ويرجّع لكل واحد object: [[{ status: "fulfilled", value }]] لو نجح، أو [[{ status: "rejected", reason }]] لو وقع:

~~~text الناتج
wf 200 1.027043s
<p>fulfilled, fulfilled, rejected في 1015ms</p>

ترمنال next start:
[ 'fulfilled', 'fulfilled', 'rejected' ]
~~~

الصفحة 200، والوقت برضه ثانية، وانت تقرر تعرض إيه مكان اللي وقع.

### ليه [[await connection()]] في الـ solCode؟

[[connection()]] من [[next/server]] بيقول لـ Next «الصفحة دي استنى طلب حقيقي». من غيرها الصفحة مبتقراش أي حاجة من الطلب، فـ Next بيبنيها static وقت الـ build. شلناها من [[wf-all]] وعملنا build:

~~~text الناتج
├ ○ /wf-all
~~~

بقت [[○]] Static: الثانية اتصرفت مرة واحدة وقت الـ build، وكل الزيارات بعدها بتاخد نفس الـ HTML بنفس الرقم. ومعاها [[ƒ]]، فالقياس بيتعمل مع كل طلب.

---

## الخلاصة

| | الوقت لـ ٣ حاجات كل واحدة ثانية | لو واحدة وقعت |
|---|---|---|
| [[await]] ورا [[await]] | ٣ ثواني | الصفحة تقع |
| [[Promise.all]] | ثانية | الصفحة تقع (500) |
| [[Promise.allSettled]] | ثانية | الباقي يتعرض، وانت تقرر |

- الـ server component [[async]] بيجيب الداتا بنفسه، والأسرار بتفضل على السيرفر.
- الحاجات المستقلة: ابدأها مع بعض ([[Promise.all]]).
- الداتا الثانوية اللي ممكن تقع: [[allSettled]]، أو كومبوننت لوحده جوه Suspense و error boundary.`,
          lines: [
            "الداتابيز مباشرة من الكومبوننت.",
            R`الصفحة [[async]].`,
            R`التلات طلبات بيبدأوا في نفس اللحظة، والـ [[await]] بيستنى الأبطأ فيهم بس.`,
            "آخر ١٠ طلبات.",
            "الإجمالي والعدد في query واحد.",
            "API خارجي بمفتاح سري. الطلب ده من السيرفر، فالمفتاح مبيوصلش للمتصفح.",
            R`قفلة الـ [[Promise.all]].`,
            "بداية الـ JSX.",
            "Fragment.",
            R`[[_sum]] ممكن يبقى null لو مفيش طلبات، فبنحط 0.`,
            "جدول الطلبات.",
            "الأخبار.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`ورا بعض: ٣ ثواني تقريبًا، كل دالة بتستنى اللي قبلها. بـ [[Promise.all]]: ثانية واحدة تقريبًا، لأن التلاتة بدأوا في نفس اللحظة. جربتها باتنين: [[2002ms]] مقابل [[1001ms]].

لو واحدة رمت: [[Promise.all]] بيرفض كله، فالصفحة كلها بتروح لـ [[error.tsx]] (أو الـ overlay في dev) حتى لو التانيين نجحوا. و [[Promise.allSettled]] مبيرميش خالص: بيرجّع لكل واحدة [[{ status: "fulfilled", value }]] أو [[{ status: "rejected", reason }]]، والوقت برضه ثانية، وانت تقرر تعرض إيه. لو [[Promise.all]] أخد ٣ ثواني: انت بتعمل await جوه الـ array نفسه، أو بتنادي الدوال في loop بـ await.`,
          solCode: R`// app/wf/page.tsx
import { connection } from "next/server";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function getA() { await wait(1000); return "A"; }
async function getB() { await wait(1000); return "B"; }
async function getC() { await wait(1000); throw new Error("C وقعت"); }
export default async function Page() {
  await connection();
  const t = Date.now();
  const results = await Promise.allSettled([getA(), getB(), getC()]);
  console.log(results.map((r) => r.status));
  return <p>{results.map((r) => r.status).join(", ")} في {Date.now() - t}ms</p>;
}
// fulfilled, fulfilled, rejected في 1001ms`
        },
        {
          cmd: "Suspense و streaming",
          title: "تبعت الصفحة حتة حتة بدل ما تستنى أبطأ جزء",
          desc: R`لو الصفحة فيها جزء بطيء (توصيات، أو تقييمات من API تقيل)، مش لازم الصفحة كلها تستنى. اعزله في كومبوننت [[async]] لوحده ولفّه في [[<Suspense fallback={...}>]]: Next بيبعت الصفحة على طول ومكانه الـ fallback، ولما الداتا تجهز بيبعت الجزء ده في نفس الـ response ويحطه مكانه.

ده اسمه streaming، و [[loading.tsx]] هو نفس الفكرة على مستوى الصفحة كلها. بـ Suspense بإيدك بتتحكم في كل جزء لوحده.`,
          example: R`// app/products/[slug]/page.tsx
import { Suspense } from "react";
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return (
    <>
      <ProductInfo product={product} />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews productId={product.id} />
      </Suspense>
      <Suspense fallback={<p>بنجهّز التوصيات...</p>}>
        <Recommendations productId={product.id} />
      </Suspense>
    </>
  );
}
async function Reviews({ productId }: { productId: string }) {
  const reviews = await getReviews(productId);
  return <ReviewList reviews={reviews} />;
}`,
          try: R`خلي [[getReviews]] تستنى ٣ ثواني والتوصيات ٥. افتح الصفحة وبص: المنتج بيظهر فورًا، والتقييمات بعد ٣، والتوصيات بعد ٥. وبعدين شيل الـ Suspense من حوالين التقييمات وشوف الصفحة كلها بتستنى. وجرّب [[curl -N localhost:3000/products/x]] وشوف الـ HTML بيوصل على دفعات.`,
          flag: "script",
          deep: {
            why: "الصفحة سرعتها بتتحدد بأبطأ حاجة فيها. لو التوصيات بتاخد ٣ ثواني، المستخدم بيبص على شاشة فاضية ٣ ثواني عشان حاجة في آخر الصفحة ممكن ميوصلهاش أصلًا. الـ streaming بيخلي المهم يظهر فورًا والباقي يكمّل.",
            how: R`HTTP بيسمح إن الـ response يتبعت على دفعات (chunked transfer). Next بيبعت الـ HTML لحد أول Suspense مش جاهز، ومكانه الـ fallback، ويسيب الاتصال مفتوح. لما الكومبوننت يخلص، بيبعت الـ HTML بتاعه مع script صغير بيحطه مكان الـ fallback. كل ده response واحد، من غير طلبات زيادة.

الـ Suspense هو الحد: أي [[await]] جوه كومبوننت تحته بيوقف الجزء ده بس. من غير Suspense، أي await في أي مكان بيوقف كل الصفحة، لأن React مش عارف يعرض إيه مكانه.

والكومبوننتات اللي في Suspenses مختلفة بتبدأ مع بعض في نفس الوقت، فمبيبقاش فيه waterfall بينهم. بس لو [[Reviews]] نفسه فيه await ورا await، ده waterfall جواه.

والـ SEO: الـ bots بتستنى الـ response كله، فالمحتوى اللي جه بالـ streaming بيتقري. والـ status والـ headers بيتبعتوا مع أول دفعة، فمينفعش تغيّرهم بعد كده (عشان كده [[redirect]] أو [[notFound]] جوه Suspense بيتحولوا لـ meta tag مش status).

ولو فيه Nginx قدام Next، الـ buffering بيجمّع الـ response كله قبل ما يبعته فالـ streaming يبوظ (درس «أكتر من نسخة» في المستوى التالت).`,
            when: "الأجزاء البطيئة أو الثانوية: تقييمات، وتوصيات، وإحصائيات، وأي حاجة من API خارجي مش مضمون. خلي المحتوى الأساسي (اللي بيتأرشف واللي المستخدم جاي عشانه) برّه الـ Suspense.",
            mistakes: R`Suspense حوالين الصفحة كلها فمفيش فرق عن loading.tsx. أو Suspense حوالين كل كومبوننت صغير فالصفحة تفضل تتنطط والـ fallbacks تظهر وتختفي. وتحط الـ Suspense جوه الكومبوننت اللي بيعمل await نفسه: لازم يبقى فوقه، في الأب. و fallback مقاسه مختلف عن المحتوى فالصفحة تتزق.`
          },
          teach: R`## الفكرة: كل جزء بطيء في Suspense لوحده، والصفحة متستناش

صفحة منتج فيها ٣ أجزاء: بيانات المنتج (سريعة)، والتقييمات (٣ ثواني)، والتوصيات (٥ ثواني). المثال بيبعت المنتج فورًا، وكل جزء بطيء بيوصل لما يجهز **في نفس الـ response**. شغّلناه على Next 16.4 ([[next build]] و [[next start]])، و [[getReviews]] بتستنى ٣ ثواني و [[Recommendations]] ٥، وقسنا الدفعات بسكربت الـ solCode.

---

## ١. الصفحة سطر سطر

### [[import { Suspense } from "react";]]

[[Suspense]] من React نفسها، مش من Next.

### [[const { slug } = await params;]] و [[const product = await getProduct(slug);]]

المنتج نفسه أساسي، فالصفحة **بتستناه** برّه أي Suspense. ده query سريع (بالـ primary key).

### [[if (!product) notFound();]]

قبل أي streaming، فالـ 404 بيبقى status حقيقي.

### [[<ProductInfo product={product} />]]

الجزء الأساسي، جاهز.

### [[<Suspense fallback={<ReviewsSkeleton />}>]] و [[<Reviews productId={product.id} />]]

- [[Suspense]] حد: «لو اللي جوايا لسه مستني، اعرض الـ [[fallback]] وكمّل الصفحة».
- [[Reviews]] كومبوننت [[async]] بطيء. الصفحة نفسها **مش** بتعمل [[await]] عليه.

### Suspense تاني للتوصيات

مستقل عن الأول: كل واحد بيظهر لما هو يجهز.

### [[async function Reviews({ productId })]]

الجزء البطيء في كومبوننت لوحده، هو اللي بيجيب الداتا بتاعته. و [[await getReviews(productId)]] بيوقف الكومبوننت ده بس.

---

## ٢. سكربت الـ solCode

~~~bash
node -e 'const t=Date.now();fetch("http://localhost:3000/products/x").then(async r=>{for await(const c of r.body)console.log(((Date.now()-t)/1000).toFixed(1)+"s",c.length+"B")})'
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[node -e '...']] | شغّل الكود ده من غير ملف (e = evaluate) |
| [[const t=Date.now()]] | الوقت دلوقتي بالملّي ثانية |
| [[fetch(...)]] | اطلب الصفحة |
| [[for await(const c of r.body)]] | [[r.body]] stream: اقرا الـ response **حتة حتة** وقت ما بتوصل |
| [[(Date.now()-t)/1000]] | الوقت من أول الطلب بالثواني، و [[toFixed(1)]] رقم عشري واحد |
| [[c.length+"B"]] | حجم الحتة بالـ byte |

جربنا نفس السطر في PowerShell 7 ([[pwsh]]) واشتغل زي ما هو، لكن في Windows PowerShell 5.1 بيقع بـ [[ReferenceError]]، لأنه بيشيل علامات [["]] اللي جوه الـ [['...']] قبل ما يبعتها لـ Node. هناك حط الكود في ملف [[.js]] وشغّله بـ [[node file.js]]. شغّلناه على البورت بتاعنا، وزودنا عليه للتوضيح إنه يقول الحتة فيها إيه:

~~~text الناتج
status 200 transfer-encoding: chunked
0.1s 2428B منتج x | بنحمّل التقييمات | بنجهّز التوصيات
0.1s 5921B منتج x | بنحمّل التقييمات | بنجهّز التوصيات
3.1s 200B ممتاز
3.1s 934B ممتاز
5.1s 114B توصيات لـ
5.1s 96B توصيات لـ
5.1s 14B
~~~

- [[transfer-encoding: chunked]]: الـ header اللي بيقول للمتصفح «الرد جاي على دفعات، ومش عارف طوله الكلي». ده اللي HTTP بيسمح بيه، وهو أساس الـ streaming.
- عند ٠.١: المنتج والاتنين fallbacks.
- عند ٣.١: التقييمات. عند ٥.١: التوصيات.
- كله **طلب واحد** و response واحد.

---

## ٣. جوه الدفعات

### الدفعة الأولى

~~~text الناتج
<h1>منتج x</h1><!--$?--><template id="B:0"></template><p>بنحمّل التقييمات...</p><!--/$--><!--$?--><template id="B:1"></template><p>بنجهّز التوصيات...</p><!--/$-->
~~~

كل Suspense معلّم بتعليقات [[<!--$?-->]] و [[<!--/$-->]] («جزء لسه مستني»)، وجواه [[<template id="B:0">]] علامة مكانه، والـ fallback.

### دفعة الـ ٣ ثواني

~~~text الناتج
<div hidden id="S:0"><ul><li>ممتاز</li><li>كويس</li></ul></div><script>$RB=[];$RV=function(a){...
~~~

- [[<div hidden id="S:0">]]: التقييمات نفسها HTML، بس مستخبية.
- [[<script>]]: كود صغير بينقلها مكان [[B:0]] ويشيل الـ fallback.

يعني المتصفح بيعرض كل جزء أول ما يوصل، حتى قبل ما JavaScript الصفحة الكبير يتحمّل.

---

## ٤. من غير الـ Suspense حوالين التقييمات

شلناه وسبنا [[<Reviews>]] لوحده:

~~~text الناتج
status 200 transfer-encoding: chunked
3.1s 2384B منتج x | بنجهّز التوصيات | ممتاز
3.1s 5957B منتج x | بنجهّز التوصيات | ممتاز
5.1s 114B توصيات لـ
5.1s 925B توصيات لـ
~~~

ولا byte قبل ٣.١ ثانية (حتى الـ status نفسه اتطبع وقتها). ليه؟ React لما بيقابل كومبوننت مستني ومفيش Suspense فوقه، مبيعرفش يعرض إيه مكانه، فبيستنى. والتوصيات لسه جوه Suspense، فلسه بتيجي لوحدها عند ٥.

---

## الخلاصة

| | أول حاجة توصل | التقييمات | التوصيات |
|---|---|---|---|
| Suspense حوالين الاتنين | ٠.١ ث (المنتج + fallbacks) | ٣.١ ث | ٥.١ ث |
| من غير Suspense للتقييمات | ٣.١ ث | ٣.١ ث | ٥.١ ث |

- [[<Suspense fallback>]] حوالين الكومبوننت البطيء، في **الأب** مش جوه الكومبوننت نفسه.
- الكومبوننت البطيء بيجيب الداتا بتاعته بنفسه.
- المحتوى الأساسي برّه الـ Suspense، والثانوي جواه.
- لو كله وصل مرة واحدة: dev بيعمل compile أول مرة، أو proxy زي Nginx بيعمل buffering.`,
          lines: [
            R`[[Suspense]] من React نفسها.`,
            "الصفحة.",
            "الـ slug.",
            "المنتج نفسه أساسي، فالصفحة بتستناه (query بالـ primary key، سريع).",
            "مش موجود؟ 404.",
            "بداية الـ JSX.",
            "Fragment.",
            "البيانات الأساسية: جاهزة وبتتبعت في أول دفعة.",
            "حد: لحد ما الجزء اللي جواه يجهز، اعرض الـ skeleton.",
            R`كومبوننت [[async]] بطيء. الصفحة مش مستنياه.`,
            "قفلة.",
            "حد تاني مستقل: كل واحد بيظهر لما هو يجهز، مش لما الاتنين يجهزوا.",
            "التوصيات (أبطأ حاجة).",
            "قفلة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الصفحة.",
            "الجزء البطيء في كومبوننت لوحده، هو اللي بيجيب الداتا بتاعته.",
            R`الـ [[await]] هنا بيوقف الكومبوننت ده بس.`,
            "يعرض.",
            "قفلة."
          ],
          sol: R`المنتج بيظهر فورًا ومكان التقييمات والتوصيات الـ fallbacks، وبعد ٣ ثواني التقييمات تاخد مكان الـ skeleton، وبعد ٥ التوصيات. ولو شلت الـ Suspense من حوالين التقييمات، مفيش حاجة بتظهر خالص لمدة ٣ ثواني، وبعدها الصفحة والتقييمات مع بعض، والتوصيات لسه بعد ٥.

وعشان تشوف الدفعات بالوقت بدل curl، الـ script اللي تحت بيطبع كل chunk وقت ما وصل. عندي: دفعة عند 0.1 ثانية فيها الـ h1 والـ fallbacks، ودفعة عند 3.1 فيها التقييمات، ودفعة عند 5.1 فيها التوصيات، وكلها response واحد. لو كل حاجة وصلت مرة واحدة: يا انت على dev وفيه compile أول مرة، يا فيه proxy زي Nginx بيعمل buffer، يا الـ await في الصفحة نفسها مش جوه الكومبوننتات.`,
          solCode: R`node -e 'const t=Date.now();fetch("http://localhost:3000/products/x").then(async r=>{for await(const c of r.body)console.log(((Date.now()-t)/1000).toFixed(1)+"s",c.length+"B")})'
# 0.1s 1446B
# 0.1s 6553B
# 3.1s 914B
# 5.1s 83B`
        },
        {
          cmd: "use(promise)",
          title: "داتا من السيرفر لـ client component: use() ولا React Query؟",
          desc: R`لو client component محتاج داتا، مش لازم يجيبها بنفسه. الـ server component يبدأ الطلب ويبعت الـ Promise نفسه كـ prop (من غير await)، والـ client component يقراه بـ [[use(promise)]] من React، ويبقى جوه Suspense. كده الطلب بيبدأ على السيرفر بدري، والكومبوننت يفضل تفاعلي.

ولو الداتا بتتغير وانت على الصفحة (polling، و infinite scroll، وكاش في المتصفح، و mutations كتير)، React Query لسه الأداة الصح في client components (تاب «React»).`,
          example: R`// app/products/[slug]/page.tsx (server)
import { Suspense } from "react";
import { ReviewsPanel } from "./reviews-panel";
export default async function Page({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const reviewsPromise = getReviews(slug);
  return (
    <Suspense fallback={<p>بنحمّل التقييمات...</p>}>
      <ReviewsPanel reviewsPromise={reviewsPromise} />
    </Suspense>
  );
}
// app/products/[slug]/reviews-panel.tsx
"use client";
import { use, useState } from "react";
export function ReviewsPanel({ reviewsPromise }: { reviewsPromise: Promise<Review[]> }) {
  const reviews = use(reviewsPromise);
  const [minStars, setMinStars] = useState(1);
  const shown = reviews.filter((r) => r.stars >= minStars);
  return (
    <section>
      <select value={minStars} onChange={(e) => setMinStars(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+ نجوم</option>)}
      </select>
      <ul>{shown.map((r) => <li key={r.id}>{r.text}</li>)}</ul>
    </section>
  );
}`,
          try: R`خلي [[getReviews]] تستنى ثانيتين. شغّل الصفحة: التقييمات بتظهر بعد ثانيتين والفلتر شغال من غير أي طلب جديد. وبعدين خليها ترمي error وشوف الخطأ راح فين، وضيف [[error.tsx]] أو ErrorBoundary حوالين الـ Suspense.`,
          flag: "script",
          deep: {
            why: "كان عندك اختيارين وحشين: الـ client component يجيب الداتا بنفسه في useEffect (طلب بيبدأ متأخر بعد الـ hydration)، أو الـ server component يستنى الداتا ويبعتها جاهزة (الصفحة كلها تستنى). تمرير الـ Promise بيدّيك الاتنين: الطلب بيبدأ بدري على السيرفر، والصفحة متستناش.",
            how: R`React بيعرف يعمل serialize للـ Promise: بيبعت placeholder في الـ RSC payload، ولما الـ Promise يخلص على السيرفر بيبعت القيمة في نفس الـ stream. في المتصفح، [[use()]] بيشوف الـ Promise لسه مخلصش فيعمل suspend، فالـ Suspense بيعرض الـ fallback، ولما القيمة توصل الكومبوننت يترسم.

[[use]] مش hook عادي: ينفع تناديه جوه if أو loop. وبيقرا context كمان ([[use(ThemeContext)]]). بس متعملش Promise جديد جوه client component وتديه لـ [[use]]: مع كل render هيبقى Promise جديد فيعمل suspend تاني من غير نهاية. الـ Promise لازم ييجي من برّه (من server component، أو من كاش).

ولو الـ Promise اترفض، [[use]] بيرمي الخطأ، ويروح لأقرب error boundary.

إمتى React Query: الداتا اللي بتتحدث وانت قاعد (كل ٣٠ ثانية)، و infinite scroll، والكاش بين الصفحات في المتصفح، والـ mutations مع invalidation. وممكن تجمعهم: الـ server component يعمل prefetch ويبعت الداتا لـ React Query عن طريق [[HydrationBoundary]]، والـ client يكمّل بـ [[useQuery]].`,
            when: R`client component تفاعلي (فلتر، أو ترتيب، أو chart) بيعرض داتا مبدئية من السيرفر. و React Query لما الداتا نفسها بتتغير في المتصفح بعد التحميل.`,
            mistakes: R`[[use(fetch("/api/x"))]] جوه client component: Promise جديد كل render. و [[await]] في السيرفر وبعدين تبعت الداتا، فالميزة راحت. وتنسى الـ Suspense فالصفحة تستنى عند أقرب واحد فوق. وتبعت Promise بيرجّع حاجات مش serializable (class instance بـ methods).`
          },
          teach: R`## الفكرة: السيرفر يبدأ الطلب، والـ client يستلم الـ Promise نفسه

الـ server component بيبدأ يجيب التقييمات **من غير ما يستنى**، ويبعت الـ Promise كـ prop لـ client component. الـ client component بيفكّه بـ [[use()]] وبيبقى عنده فلتر تفاعلي. شغّلنا المثال على Next 16.4 و React 19.3 ([[next build]] و [[next start]] و Chrome بـ playwright)، و [[getReviews]] بتستنى ثانيتين وبترجع ٣ تقييمات (٥ و ٣ و ١ نجوم)، وبترمي خطأ لو الـ slug [[boom]].

---

## ١. الصفحة (server)

### [[import { ReviewsPanel } from "./reviews-panel";]]

server بيستورد client: مسموح.

### [[const reviewsPromise = getReviews(slug);]]

مفيش [[await]]. السطر ده **بيبدأ** الطلب على طول، والمتغير فيه Promise لسه مخلصش. الصفحة بتكمّل.

### [[<Suspense fallback={<p>بنحمّل التقييمات...</p>}>]]

لازم: [[use]] هيوقف الكومبوننت لحد ما الـ Promise يخلص، والـ Suspense هو اللي بيحدد إيه يظهر مكانه.

### [[<ReviewsPanel reviewsPromise={reviewsPromise} />]]

الـ Promise نفسه prop. React بيعرف يبعته: بيحط مكانه علامة في الـ RSC payload، ولما الـ Promise يخلص على السيرفر بيبعت القيمة في نفس الـ stream (زي درس streaming).

---

## ٢. [[reviews-panel.tsx]] (client)

### [["use client";]] و [[import { use, useState } from "react";]]

client عشان فيه [[select]] بـ state. و [[use]] من React 19.

### [[({ reviewsPromise }: { reviewsPromise: Promise<Review[]> })]]

النوع Promise لـ array من [[Review]].

### [[const reviews = use(reviewsPromise);]]

[[use]] بيفك الـ Promise:

- لو لسه مخلصش: الكومبوننت **بيعمل suspend** (بيتوقف)، فأقرب Suspense يعرض الـ fallback.
- لو خلص: بيرجّع القيمة، والكومبوننت يكمّل.
- لو اترفض (rejected): بيرمي الخطأ، فيروح لأقرب error boundary.

وعكس باقي الـ hooks، [[use]] ينفع جوه [[if]] أو loop.

### [[const [minStars, setMinStars] = useState(1);]] و [[reviews.filter((r) => r.stars >= minStars)]]

state للفلتر، والفلترة على الـ array اللي في المتصفح، من غير أي طلب.

### الـ JSX

| السطر | بيعمل إيه |
|---|---|
| [[<select value={minStars} onChange={(e) => setMinStars(Number(e.target.value))}>]] | قايمة، وقيمتها string فبنحوّلها رقم |
| [[{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+ نجوم</option>)}]] | ٥ اختيارات من array |
| [[<ul>{shown.map((r) => <li key={r.id}>{r.text}</li>)}</ul>]] | التقييمات بعد الفلتر |

---

## ٣. التجربة

~~~text الناتج: /products/book
status 200
0.6s بنحمّل التقييمات...
2.8s 1+ نجوم2+ نجوم3+ نجوم4+ نجوم5+ نجومممتازعاديوحش
after select 3+: ممتازعادي | requests: 0
~~~

- عند ٠.٦ ثانية: الصفحة ظاهرة ومكان التقييمات الـ fallback.
- عند ٢.٨: الـ Promise خلص على السيرفر، والقيمة وصلت في نفس الـ response، و [[use]] رجّعها: القايمة والتلات تقييمات.
- اخترنا «3+ نجوم»: فضل [[ممتاز]] و [[عادي]] ([[وحش]] نجمة واحدة)، و **صفر طلبات** على الشبكة.

---

## ٤. لو الـ Promise اترفض

### من غير أي error boundary

~~~text الناتج: /products/boom
status 200
0.6s ... بنحمّل التقييمات...
[pageerror] Minified React error #441; ...
2.8s This page couldn’t load
     A server error occurred. Reload to try again.
     Reload
     ERROR 121798981
~~~

- الـ status **200**: الـ streaming كان بدأ وبعت الـ headers قبل ما الخطأ يحصل، فمينفعش يتغير.
- [[#441]]: خطأ من Server Components والرسالة الأصلية متشالة في الإنتاج.
- الصفحة **كلها** اتبدلت بصفحة Next الافتراضية، حتى الـ nav. يعني خطأ في جزء ثانوي وقّع كل حاجة.
- [[121798981]] هو الـ digest، ونفسه في ترمنال [[next start]]: [[⨯ Error: reviews DB down]] و [[digest: '121798981']].

### بعد [[error.tsx]] جنب الصفحة

~~~text الناتج
2.8s المنتجات السلة ... (الـ nav)
     التقييمات مش متاحة دلوقتي.
     جرّب تاني
~~~

الـ layout والـ nav فضلوا، والجزء بتاع الصفحة بس اتبدل. ولو عايز باقي الصفحة نفسها يفضل، حط ErrorBoundary (زي [[react-error-boundary]]) حوالين الـ Suspense بس.

---

## الخلاصة

| الطريقة | الطلب بيبدأ إمتى | الصفحة بتستنى؟ | تفاعلي؟ |
|---|---|---|---|
| [[await]] في السيرفر وتبعت الداتا | على السيرفر | أيوة | أيوة |
| [[useEffect]] + [[fetch]] في الـ client | بعد الـ hydration (متأخر) | لأ | أيوة |
| تبعت الـ Promise + [[use()]] | على السيرفر بدري | لأ (Suspense) | أيوة |

- الـ Promise لازم ييجي من برّه (server component). Promise جديد جوه الـ client كل render = suspend من غير نهاية.
- [[use]] محتاج Suspense فوقه، و error boundary للأخطاء.
- الداتا اللي بتتغير وانت على الصفحة (polling، infinite scroll): React Query.`,
          lines: [
            "Suspense.",
            "الـ client component.",
            "الصفحة server.",
            "الـ slug.",
            R`من غير [[await]]: الطلب بدأ، والـ Promise نفسه هيتبعت.`,
            "بداية الـ JSX.",
            R`لازم Suspense: [[use]] بيوقف الكومبوننت لحد ما الـ Promise يخلص.`,
            "الـ Promise كـ prop. Next بيعرف يبعته للمتصفح ويكمّله لما يخلص (streaming).",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "client عشان فيه فلتر تفاعلي.",
            R`[[use]] من React 19.`,
            "النوع Promise.",
            R`[[use]] بيفك الـ Promise. وعكس الـ hooks: ينفع جوه if.`,
            "state الفلتر.",
            "فلترة في المتصفح من غير طلب جديد.",
            "بداية الـ JSX.",
            "section.",
            "select بيغيّر أقل عدد نجوم.",
            "الاختيارات.",
            "قفلة.",
            "التقييمات بعد الفلتر.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`الصفحة بتظهر فورًا ومكان التقييمات «بنحمّل التقييمات...»، وبعد ثانيتين التقييمات تظهر. وتغيير الـ select بيفلتر فورًا ومفيش أي طلب جديد في Network، لأن الفلترة على array موجود في المتصفح.

ولما [[getReviews]] ترمي من غير أي error boundary: في الإنتاج الـ status لسه 200 (الـ streaming كان بدأ)، والـ console فيها [[Minified React error #441]]، والصفحة كلها اتبدلت بصفحة Next الافتراضية «This page couldn’t load»، والرسالة الأصلية ومعاها الـ digest في لوج السيرفر. يعني خطأ في جزء ثانوي وقّع الصفحة كلها.

بعد [[error.tsx]] جنب الصفحة: الـ layout بيفضل والصفحة بس هي اللي تتبدل. ولو عايز المنتج نفسه يفضل ظاهر، حط ErrorBoundary (زي [[react-error-boundary]]) حوالين الـ Suspense بس.`
        }
      ]
    }
  ]
});
