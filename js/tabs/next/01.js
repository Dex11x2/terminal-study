// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
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
  labText: "create-next-app بيسألك أسئلة: اختار TypeScript و Tailwind و App Router. كل تجارب التاب ده على المشروع ده.",
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
          desc: R`[[npx create-next-app@latest]] بيعملك مشروع Next.js جاهز: React و TypeScript و Tailwind و ESLint، وسكربتات [[dev]] و [[build]] و [[start]]. بيسألك كام سؤال، والإجابات الأسلم لمشروع جديد: TypeScript أيوة، و App Router أيوة، و [[src/]] على ذوقك، و import alias [[@/*]].

أهم الملفات: [[app/layout.tsx]] الهيكل اللي بيلف كل الصفحات، و [[app/page.tsx]] الصفحة الرئيسية ([[/]])، و [[public/]] للصور والملفات اللي بتتقدّم زي ما هي، و [[next.config.ts]] إعدادات Next. ولو اخترت [[src/]] كل ده بيبقى جوه [[src/app]]. و [[npm run dev]] بيشغّل على [[localhost:3000]].`,
          example: R`npx create-next-app@latest shop
npx create-next-app@latest shop --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
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
          lines: [
            "بيسألك الأسئلة واحد واحد ويعمل فولدر اسمه shop.",
            "نفس الحاجة من غير أسئلة: كل اختيار flag. مفيد في سكربت أو لما تبقى عارف عايز إيه.",
            "ادخل المشروع.",
            R`شغّل dev server على [[localhost:3000]]. من Next 16 بيشتغل بـ Turbopack افتراضيًا.`,
            R`هتلاقي [[layout.tsx]] و [[page.tsx]] و [[globals.css]] و [[favicon.ico]]، و public فيها صور SVG.`,
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
          try: R`اعمل الملفات دي، وصفحة [[app/page.tsx]] فيها ٣ لينكات لـ [[/photos/1]] و [[/photos/2]] و [[/photos/3]]. اضغط لينك: الصورة تفتح modal والـ URL يتغير. اعمل refresh: تفتح الصفحة الكاملة. وبعدين امسح [[default.tsx]] واعمل [[npm run build && npm start]] وافتح [[/]]: هتلاقي 404، لأن الـ slot ملوش حاجة يرسمها (الـ build العادي بـ Turbopack مش هيقع). ولو عملت [[next build --webpack]] هيقع بخطأ Missing required default.js.`,
          flag: "script",
          deep: {
            why: "الـ modal العادي ملوش URL: متقدرش تبعته لحد، والـ refresh بيقفله، وزرار الرجوع بيخرّجك من الصفحة كلها بدل ما يقفله. ولوحات التحكم فيها أجزاء مستقلة (إحصائيات، وتنبيهات) كل واحد بيحمّل لوحده ولو واحد وقع الباقي يفضل.",
            how: R`كل slot ليه شجرة routes لوحده جوه نفس الـ URL. في التنقل من جوه الموقع (soft navigation)، Next بيحدّث الـ slot اللي فيه تطابق ويسيب الباقي على آخر حالة. في الـ refresh أو فتح اللينك مباشرة (hard navigation)، Next مبيعرفش الحالة القديمة، فأي slot ملوش تطابق بيرسم [[default.tsx]].

من Next 16 [[default.tsx]] إجباري لكل slot: الـ docs بتقول الـ build بيقع من غيره (وده بيحصل مع webpack)، ومع Turbopack الـ build بيعدّي والصفحات بترجع 404، فاعمله دايمًا. و [[children]] نفسه slot ضمني، فممكن تحتاج [[app/default.tsx]] كمان.

الـ intercepting بيتكتب بالنسبة لمستوى الـ route segments مش الفولدرات: [[(.)]] نفس المستوى، و [[(..)]] مستوى فوق، و [[(...)]] من الـ root. والـ [[@modal]] مش segment، فـ [[app/@modal/(.)photos]] بيمسك [[app/photos]].

الـ interception بيحصل في soft navigation بس. الـ refresh أو فتح اللينك في تاب جديد بيروح للصفحة الأصلية [[app/photos/[id]/page.tsx]]، فلازم تبقى موجودة.`,
            when: "صورة أو منتج في modal من ليستة (زي انستجرام)، و login في modal، وسلة جانبية ليها URL. و parallel routes لوحدها للوحات فيها أجزاء مستقلة، أو لعرض حاجة مختلفة حسب الدور (slot للأدمن و slot للمستخدم).",
            mistakes: R`تنسى [[default.tsx]]: مع webpack الـ build يقع، ومع Turbopack الـ build يعدّي والصفحات ترجع 404. وتنسى الصفحة الأصلية فالـ refresh يطلّع 404. وتقفل الـ modal بـ [[router.push("/")]] بدل [[router.back()]]، فالـ history يتلخبط. وتعمل modal بالطريقة دي لحاجة ملهاش لازمة يبقى ليها URL (تأكيد مسح مثلًا): state عادية أبسط.`
          },
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

من غير [[default.tsx]]: [[next build]] العادي (Turbopack) بيعدّي من غير أي تحذير، بس [[/]] وكل الصفحات التانية بترجع 404، لأن الـ slot [[@modal]] ملوش حاجة يرسمها لما تفتح الصفحة مباشرة. و [[next build --webpack]] بيقع: [[Missing required default.js file for parallel route at app/@modal]]. ولو الضغطة فتحت الصفحة الكاملة بدل الـ modal: اتأكد إن فولدر [[(.)photos]] جوه [[@modal]]، وإن اللينك [[<Link>]] مش [[<a>]].`
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

مرة الـ import جوه ملف الـ Toggle: الـ build عدّى عندي والـ HTML اترسم، بس أول ما الصفحة تفتح في المتصفح بيطلع في الـ console: [[<Data> is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding 'use client' to a module that was originally written for the server.]] يعني [[Data]] دخل الـ bundle بتاع المتصفح وبقى client، والـ client components مينفعش تبقى async. ولو [[Data]] كان بيستخدم الداتابيز أو عليه [[server-only]]، الـ build نفسه كان هيقع.`,
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
