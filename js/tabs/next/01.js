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
    }
  ]
});
