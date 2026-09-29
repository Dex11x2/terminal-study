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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`اعمل [[lib/secret.ts]] فيه [[export const key = process.env.MY_SECRET]] من غير [[server-only]]، واستخدمه في client component واطبعه: هتلاقيه undefined (Next مبيبعتش المتغير). بعدين ضيف [[import "server-only"]] وشوف الـ build بيقع بإيه. وجرّب [[NEXT_PUBLIC_MY_SECRET]] وافتح ملف الـ JS في DevTools ودوّر على القيمة.`,
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    },
    {
      t: "Static و Dynamic",
      l: 2,
      n: "الصفحة بتتبني مرة وقت الـ build ولا مع كل طلب، وإزاي تتجدد كل فترة",
      items: [
        {
          cmd: "static و dynamic",
          title: "الصفحة بتتبني مرة واحدة ولا مع كل طلب؟",
          desc: R`Next بيحاول يبني كل صفحة وقت [[next build]] ويخزّنها HTML جاهز (static)، فأي زائر ياخدها فورًا من غير ما حاجة تتنفذ. بس لو الصفحة بتستخدم حاجة مش معروفة غير وقت الطلب ([[cookies()]] أو [[headers()]] أو [[searchParams]] أو [[connection()]] أو fetch بـ [[no-store]])، بتبقى dynamic وبتترسم مع كل طلب.

الجدول اللي بيطبعه [[next build]] بيقولك كل صفحة إيه: [[○]] static، و [[●]] static من [[generateStaticParams]]، و [[ƒ]] dynamic، و [[◐]] جزء static وجزء dynamic (مع Cache Components). اقرا الجدول ده بعد كل build.`,
          example: R`npm run build
# Route (app)
# ┌ ○ /
# ├ ○ /about
# ├ ● /blog/[slug]
# ├ ƒ /dashboard
# └ ƒ /products
# ○ (Static)  ● (SSG)  ƒ (Dynamic)
npm start
curl -sI localhost:3000/about | grep -i cache-control
curl -sI localhost:3000/dashboard | grep -i cache-control`,
          try: R`اعمل صفحة فيها [[<p>{new Date().toISOString()}</p>]]، و build و start، وافتحها كذا مرة: الوقت ثابت (وقت الـ build). ضيف [[await cookies()]] في أولها (من [[next/headers]]) واعمل build تاني: الرمز بقى ƒ والوقت بيتغير مع كل refresh.`,
          deep: {
            why: "الصفحة الـ static مبتكلّفش حاجة: ملف جاهز، بيتقدّم من CDN في أقل من ١٠٠ ملّي ثانية، ومهما الزوار كتروا السيرفر مش حاسس. الصفحة الـ dynamic بتشغّل كود وتكلّم الداتابيز مع كل زائر. فالسؤال «ليه الصفحة دي dynamic؟» بيوفّر فلوس وسرعة.",
            how: R`وقت الـ build، Next بيحاول يرسم كل route. لو الرسم لمس API مرتبط بالطلب ([[cookies]] و [[headers]] و [[searchParams]] و [[draftMode]] و [[connection]])، أو fetch بـ [[cache: "no-store"]]، أو [[export const dynamic = "force-dynamic"]]، الـ route كله بيتعلّم dynamic.

من Next 15 الـ fetch مبقاش بيتكاش افتراضيًا، بس ده مش معناه إن الصفحة dynamic: لو fetch عادي من غير خيارات في صفحة مفيهاش حاجة dynamic تانية، Next بيرسمها وقت الـ build ويحفظ الناتج. والداتابيز نفس الكلام: query في صفحة static بيتنفذ مرة وقت الـ build بس.

ده النموذج «القديم» (لسه الافتراضي لو [[cacheComponents]] مش شغال): القرار على مستوى الـ route كله، يا static يا dynamic. مع Cache Components في Next 16 القرار بقى على مستوى كل كومبوننت: جزء static وجزء dynamic في نفس الصفحة ([[◐]])، ودي تفاصيل الفئة الجاية.

و [[export const dynamic = "force-static"]] بيجبر الصفحة static (والـ cookies بترجع فاضية)، و [["force-dynamic"]] العكس. الاتنين مش مسموحين مع [[cacheComponents]].`,
            when: "بعد كل build بص على الجدول. الصفحات العامة (الرئيسية، والمنتجات، والمقالات) المفروض static أو ISR. اللي فيها بيانات المستخدم (السلة، والطلبات، والحساب) dynamic وده طبيعي.",
            mistakes: R`تقرا [[cookies()]] في الـ root layout (عشان الثيم أو اللغة) فكل الموقع يبقى dynamic من غير ما تاخد بالك. وتستخدم [[force-dynamic]] عشان «الداتا مش بتتحدث»، والحل الصح revalidate. وتفتكر إن [[next dev]] بيوريك السلوك الحقيقي: في dev كل صفحة بتترسم مع كل طلب، فاختبر static و dynamic بـ [[build]] و [[start]].`
          },
          lines: [
            "ابني للإنتاج، واقرا جدول الـ routes اللي بيطلع في الآخر.",
            R`شغّل الناتج (في ترمنال لوحده). تفاصيل الأوامر في تاب «Node و npm».`,
            R`صفحة static: الـ header فيه [[s-maxage]]، يعني CDN يقدر يكاشها.`,
            R`صفحة dynamic: [[private, no-cache, no-store]]، يعني كل طلب بيترسم من جديد ومحدش يكاشه.`
          ]
        },
        {
          cmd: "generateStaticParams",
          title: "تبني صفحات المنتجات والمقالات وقت الـ build",
          desc: R`صفحة [[[slug]]] مش معروف قيمها وقت الـ build، فبتبقى dynamic. [[generateStaticParams]] بترجّع قايمة الـ slugs، و Next بيبني صفحة HTML لكل واحد مقدمًا ([[●]] في الجدول).

والـ slug اللي مش في القايمة؟ افتراضيًا بيترسم أول ما حد يطلبه ويتحفظ للي بعده. ولو عايز أي slug برّه القايمة يطلّع 404، [[export const dynamicParams = false]] (في النموذج القديم، مش مع Cache Components).`,
          example: R`// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 200,
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post?.published) notFound();
  return <article><h1>{post.title}</h1><div>{post.body}</div></article>;
}`,
          try: R`اعمل الصفحة بـ ٣ slugs ثابتين من غير داتابيز: [[return [{ slug: "a" }, { slug: "b" }, { slug: "c" }]]]. اعمل build وبص على الجدول: [[/blog/[slug]]] جنبها ● وتحتها الـ slugs. وبعدين افتح [[/blog/d]] بعد [[npm start]]: هتترسم أول مرة وتتحفظ.`,
          flag: "script",
          deep: {
            why: "المدونة فيها ٥٠٠ مقال ومبتتغيرش كل دقيقة. لو كل زيارة بتكلّم الداتابيز وترسم نفس المقال من الأول، ده شغل ملوش لازمة. البناء مقدمًا بيخلي كل مقال ملف جاهز على الـ CDN.",
            how: R`في الـ build، Next بينادي [[generateStaticParams]]، وبعدين يرسم الصفحة لكل object في القايمة، ويحفظ HTML و RSC payload لكل واحد. ولو فيه segments متداخلة ([[/[category]/[slug]]])، الدالة ترجع الاتنين في كل object، أو كل مستوى يعمل الدالة بتاعته.

الـ fetch اللي جوه [[generateStaticParams]] وجوه الصفحة بنفس الـ URL بيتعمله dedupe، فمش هيتنفذ مرتين.

[[dynamicParams]] (النموذج القديم): [[true]] افتراضيًا، والـ slug الجديد بيترسم أول طلب ويتكاش. [[false]]: أي حاجة برّه القايمة 404. ومع [[cacheComponents]] الخيار ده مش موجود، و [[generateStaticParams]] لازم يرجّع slug واحد على الأقل (array فاضي بيوقّع الـ build)، عشان Next يقدر يتأكد إن الصفحة مبتقراش [[cookies]] وهي مفروض static.

والمقال لما يتعدل؟ الصفحة المبنية مش هتتغير لوحدها. محتاج revalidate (الدرس الجاي) أو [[revalidatePath]] بعد التعديل (فئة الكاش).`,
            when: R`صفحات المحتوى العام اللي عددها معروف ومبتتغيرش كل ثانية: مقالات، ومنتجات، وصفحات docs، وأقسام. وفي المواقع المترجمة: [[locale]] كمان (فئة i18n).`,
            mistakes: R`ترجّع كل الـ ٥٠ ألف منتج فالـ build ياخد ساعة ويضرب الداتابيز. وتنسى إن المقال اتعدّل ومحدش عمل revalidate، فالموقع يعرض النسخة القديمة لحد الـ build الجاي. وترجّع [[{ id: 5 }]] رقم بدل string: القيم لازم strings (أو arrays للـ catch-all).`
          },
          lines: [
            "404.",
            "الداتابيز.",
            R`بتشتغل وقت [[next build]]، مش مع الطلبات.`,
            "هات المقالات...",
            "المنشورة بس.",
            "الأكتر قراية الأول.",
            "أشهر ٢٠٠ بس: بناء ١٠ آلاف صفحة بيطوّل الـ build، والباقي يتبني أول ما يتطلب.",
            "الـ slug بس.",
            "قفلة الـ query.",
            R`array فيه object لكل صفحة: [[[{ slug: "a" }, { slug: "b" }]]]. المفاتيح بنفس اسم الفولدر.`,
            "قفلة.",
            "الصفحة نفسها زي أي dynamic segment.",
            "الـ slug.",
            "المقال.",
            R`مش موجود أو مش منشور: 404. بعد السطر ده TS عارف إن [[post]] مش null.`,
            "اعرضه.",
            "قفلة."
          ]
        },
        {
          cmd: "revalidate و ISR",
          title: "صفحة static بتتجدد لوحدها كل ساعة",
          desc: R`ISR (Incremental Static Regeneration): الصفحة static، بس ليها عمر. [[export const revalidate = 3600]] في الصفحة، أو [[fetch(url, { next: { revalidate: 3600 } })]] على طلب معيّن، معناها «بعد ساعة، أول زائر ياخد النسخة القديمة، وفي الخلفية تتبني نسخة جديدة للي بعده».

وللـ queries اللي مش fetch (الداتابيز)، [[unstable_cache]] بيكاش نتيجة الدالة بمفتاح وعمر و tags. ده النموذج اللي شغال في Next 15، وفي Next 16 من غير [[cacheComponents]]. ومع Cache Components البديل [[use cache]] (الفئة الجاية).`,
          example: R`// app/blog/page.tsx
export const revalidate = 3600;
export default async function Blog() {
  const posts = await fetch("https://cms.example.com/api/posts", {
    next: { revalidate: 600, tags: ["posts"] },
  }).then((r) => r.json());
  const categories = await getCategories();
  return <PostList posts={posts} categories={categories} />;
}
// lib/queries.ts
import { unstable_cache } from "next/cache";
export const getCategories = unstable_cache(
  async () => db.category.findMany({ orderBy: { name: "asc" } }),
  ["categories"],
  { revalidate: 86400, tags: ["categories"] },
);`,
          try: R`اعمل صفحة فيها [[new Date().toISOString()]] و [[export const revalidate = 10]]. build و start، وافتح الصفحة: الوقت ثابت. استنى ١٥ ثانية واعمل refresh: لسه قديم (دي النسخة القديمة، واتبنت جديدة في الخلفية). refresh تاني: الوقت اتغير.`,
          flag: "script",
          deep: {
            why: "الـ static سريع بس بيقدم، والـ dynamic طازة بس بيكلّف مع كل زائر. أغلب المحتوى في النص: الأسعار بتتغير كام مرة في اليوم، والمقالات بتتعدل أحيانًا. ISR بيدّيك سرعة الـ static وداتا عمرها مش أكتر من المدة اللي انت حددتها.",
            how: R`الاستراتيجية اسمها stale-while-revalidate: بعد ما العمر يخلص، النسخة مبتتمسحش. أول طلب بعدها بياخد القديمة فورًا، وبيشغّل بناء جديد في الخلفية، ولو البناء نجح النسخة الجديدة تبدّل القديمة. لو فشل (الـ CMS واقع)، القديمة بتفضل. يعني مفيش زائر بيستنى البناء أبدًا، بس ممكن ياخد نسخة أقدم من العمر بشوية.

الكاش ده بيتخزن على السيرفر (في [[.next/cache]] على الديسك وفي الذاكرة)، أو على Vercel في كاش موزّع. ولو شغّال أكتر من نسخة من التطبيق، كل نسخة ليها كاش لوحدها إلا لو عملت cache handler مشترك (Redis مثلًا)، ودي تفاصيل النشر.

الـ tags بتخليك تمسح حاجة معينة فورًا بدل ما تستنى العمر: [[revalidateTag("posts", "max")]] بعد ما مقال يتنشر، أو [[revalidatePath("/blog")]] (فئة الكاش).

و [[revalidate = 0]] يعني dynamic، و [[false]] (الافتراضي) يعني للأبد لحد ما تمسحه بإيدك. وأقصر عمر في الصفحة (من الـ layout أو الصفحة أو أي fetch فيها) هو اللي بيحدد عمر الصفحة كلها.`,
            when: "محتوى بيتغير بس مش لازم في نفس الثانية: أسعار، وقوايم منتجات، ومقالات من CMS، وصفحات أقسام. واستخدم tags مع revalidateTag لما يبقى عندك حدث واضح («المقال اتنشر»).",
            mistakes: R`عمر ٥ ثواني لكل حاجة فالسيرفر شغال كأنه dynamic. و [[revalidate]] على صفحة بتقرا [[cookies]] فمبيعملش حاجة (الصفحة dynamic أصلًا). وتكاش بـ [[unstable_cache]] دالة بتقرا بيانات مستخدم معيّن من غير ما الـ user id يبقى argument، فمستخدم ياخد داتا غيره. وتشغّل ٣ نسخ ورا load balancer وتستغرب إن كل refresh بيجيب نسخة مختلفة.`
          },
          lines: [
            R`عمر الصفحة كلها: ساعة. لازم رقم مكتوب (مش حساب زي [[60 * 60]]) عشان Next بيقراه وقت الـ build.`,
            "صفحة عادية.",
            "fetch من CMS...",
            "...ليه عمر أقصر (١٠ دقايق) و tag اسمه posts عشان تمسحه بالاسم بعدين. وأقصر عمر في الصفحة هو اللي بيكسب.",
            "حوّل الرد لـ JSON.",
            "من الداتابيز، بس متكاشة (تحت).",
            "اعرض.",
            "قفلة.",
            R`[[unstable_cache]]: الاسم فيه unstable بس بقاله سنين، ومع Cache Components بيتبدل بـ [[use cache]].`,
            "بتلف دالة وبترجّع نسخة متكاشة منها.",
            "الدالة اللي هتتكاش: query للأقسام، ونتيجتها لازم تتحول JSON.",
            "مفتاح للكاش. الـ arguments بتتضاف عليه لوحدها.",
            "يوم كامل، و tag للمسح.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "Cache Components و use cache",
      l: 2,
      n: "النموذج الجديد في Next 16: كاش صريح على الدوال والكومبوننتات، وصفحة فيها shell ثابت وحتت dynamic",
      items: [
        {
          cmd: "الكاش من 14 لـ 16",
          title: "Next بيكاش إيه لوحده، وإيه اللي اتغير في 15 و 16؟",
          desc: R`الكاش أكتر حاجة اتغيرت في Next. في Next 14 كان كل fetch بيتكاش للأبد لوحده، والناس كانت بتتفاجئ إن الداتا مبتتحدثش. Next 15 قلب الافتراضي: fetch و Route Handlers الـ GET مبيتكاشوش إلا لو طلبت. و Next 16 ضاف نموذج جديد اسمه Cache Components ([[cacheComponents: true]]): كل حاجة dynamic، والكاش بتطلبه صراحة بـ [[use cache]] على دالة أو كومبوننت.

النموذجين شغالين في Next 16: من غير الفلاج النموذج القديم (الدروس اللي فاتت)، ومعاه الجديد. المشاريع الجديدة الأحسن تبدأ بالجديد، والقديمة تنقل على مهلها.`,
          example: R`// Next 14: الـ fetch ده كان بيتكاش للأبد من غير ما تطلب
const a = await fetch("https://api.example.com/products");
// Next 15، و 16 من غير cacheComponents: لازم تطلب الكاش
const b = await fetch("https://api.example.com/products", { cache: "force-cache" });
const c = await fetch("https://api.example.com/products", { next: { revalidate: 3600, tags: ["products"] } });
// Next 16 مع cacheComponents: true في next.config.ts
async function getProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  return db.product.findMany();
}`,
          try: R`في مشروع الـ lab (من غير أي فلاج) اعمل صفحة فيها [[fetch("https://httpbin.org/uuid")]] واعرض الـ uuid. في [[npm run dev]] اعمل refresh: بيتغير. ضيف [[cache: "force-cache"]]: بقى ثابت. وبعدين ضيف [[cacheComponents: true]] في [[next.config.ts]] واقرا الأخطاء اللي هتطلع: دي الفئة دي كلها.`,
          flag: "script",
          deep: {
            why: "لما الكاش كان ضمني، الناس كانت بتقضي ساعات تسأل «ليه الداتا مش بتتحدث؟». ولما بقى مقفول افتراضيًا في 15، تطبيقات كتير بقت أبطأ لأن محدش طلب كاش. الكاش الصريح بـ use cache بيحل الاتنين: من غيره الداتا طازة دايمًا، ومعاه انت عارف بالظبط إيه متكاش ولحد إمتى.",
            how: R`في النموذج القديم فيه ٤ طبقات لازم تعرفهم في الانترفيو: Request Memoization (نفس الـ fetch في نفس الـ render مرة واحدة)، و Data Cache (نتايج الـ fetch بين الطلبات، على السيرفر)، و Full Route Cache (الـ HTML و RSC payload بتوع الصفحات الـ static)، و Router Cache (الصفحات اللي اتزارت في المتصفح، عشان back و forward يبقوا فوريين).

Next 15 غيّر: fetch افتراضيًا [[no-store]]، و GET في Route Handlers مبيتكاشش، و Router Cache للصفحات عمره صفر (الـ layouts والـ loading لسه بيتكاشوا). وقرار static أو dynamic لسه على مستوى الـ route كله.

Next 16 مع [[cacheComponents]]: مفيش كاش ضمني خالص، وأي داتا async بتتعامل كـ dynamic، إلا اللي عليه [[use cache]]. والصفحة الواحدة بقت ممكن تبقى shell ثابت وجواه أجزاء dynamic (Partial Prerendering، وده اللي كان تجريبي باسم PPR في 14 و 15). و [[export const revalidate]] و [[dynamic]] و [[fetchCache]] مبقوش مسموحين، وبدالهم [[use cache]] و [[cacheLife]].

تفعيله سطر في [[next.config.ts]]: [[cacheComponents: true]]. ومن غيره، [[use cache]] بيطلّع خطأ وقت الـ build إنه محتاج الفلاج.`,
            when: R`في الانترفيو: «الكاش في Next شغال إزاي؟» لازم تسأل «أنهي نسخة؟». وفي الشغل: اعرف المشروع على أنهي نموذج قبل ما تلمس الكاش، لأن نفس الكود بيتصرف مختلف.`,
            mistakes: R`تقرا مقالة من ٢٠٢٣ عن الكاش وتطبقها على Next 15، فتستغرب إن fetch مبيتكاشش. وتخلط النموذجين: [[export const revalidate]] في مشروع فيه [[cacheComponents]] فالـ build يقع. وتفتكر إن [[use cache]] شغال من غير الفلاج.`
          },
          lines: [
            R`نفس السطر: في Next 14 متكاش، وفي 15 و 16 بيروح للـ API مع كل render (إلا لو الصفحة كلها static واتبنت وقت الـ build).`,
            R`[[force-cache]]: خده من الكاش لو موجود، ومتروحش للـ API غير أول مرة.`,
            "كاش بعمر ساعة و tag للمسح. ده الأشهر في النموذج القديم.",
            "النموذج الجديد: الكاش على الدالة كلها، مش على fetch بعينه، فبيشتغل مع الداتابيز كمان.",
            R`directive زي [[use client]]: نتيجة الدالة دي تتكاش.`,
            R`العمر بـ profile جاهز: [[seconds]] و [[minutes]] و [[hours]] و [[days]] و [[weeks]] و [[max]].`,
            "tag عشان تمسحه بالاسم.",
            R`query عادي. مفيش [[unstable_cache]] ولا مفاتيح بإيدك.`,
            "قفلة."
          ]
        },
        {
          cmd: "use cache",
          title: R`تكاش دالة أو كومبوننت كامل بـ "use cache"`,
          desc: R`[[use cache]] في أول دالة async (أو كومبوننت، أو ملف كامل) بيخلي Next يحفظ النتيجة ويرجّعها من غير ما يشغّل الدالة تاني. المفتاح بيتعمل لوحده من الـ arguments، فـ [[getProduct("a")]] و [[getProduct("b")]] كل واحد ليه كاش.

العمر بـ [[cacheLife("hours")]]، والاسم للمسح بـ [[cacheTag("products")]]. والقاعدة المهمة: جوه [[use cache]] مينفعش تقرا [[cookies()]] أو [[headers()]] أو [[searchParams]]، لأن النتيجة مشتركة بين كل الزوار. اقراهم برّه وابعت القيمة اللي محتاجها كـ argument.`,
          example: R`// next.config.ts
const nextConfig: NextConfig = { cacheComponents: true };
// lib/products.ts
import { cacheLife, cacheTag } from "next/cache";
export async function getProduct(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", $__btproduct-$__{slug}$__bt);
  return db.product.findUnique({ where: { slug } });
}
export async function getPrices(currency: "EGP" | "USD") {
  "use cache";
  cacheLife("minutes");
  return db.price.findMany({ where: { currency } });
}
// app/products/prices.tsx
export async function Prices() {
  const currency = (await cookies()).get("currency")?.value === "USD" ? "USD" : "EGP";
  const prices = await getPrices(currency);
  return <PriceTable prices={prices} />;
}`,
          try: R`فعّل [[cacheComponents]]، وخلي [[getProduct]] ترجع [[{ slug, at: Date.now() }]] مع [[use cache]]، واعرض [[getProduct("a")]] و [[getProduct("b")]] في صفحة. build و start، واعمل refresh كذا مرة: الـ [[at]] ثابت لكل واحد ومختلف بينهم. وبعدين حط [[await cookies()]] جوه الدالة واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`[[unstable_cache]] كان محتاج مفاتيح بإيدك، وكاش الـ fetch كان للـ fetch بس، و [[revalidate]] كان على الصفحة كلها. [[use cache]] بيوحّد ده: أي دالة أو كومبوننت، والمفتاح أوتوماتيك من الـ arguments، والعمر والـ tags جنب الكود نفسه.`,
            how: R`الـ compiler بيحوّل الدالة: المفتاح بيتعمل من الـ build id واسم الدالة والـ arguments (بعد serialize). لو فيه نتيجة صالحة في الكاش بترجع، ولو مفيش الدالة بتشتغل والنتيجة تتحفظ. عشان كده الـ arguments والناتج لازم يتحولوا (strings وأرقام و objects عادية و JSX)، مش class instances.

الـ profiles بتاعة [[cacheLife]] فيها ٣ أرقام: [[stale]] (قد إيه المتصفح يستخدمها من غير ما يسأل السيرفر)، و [[revalidate]] (بعد قد إيه تتجدد في الخلفية على السيرفر)، و [[expire]] (بعد قد إيه تبقى قديمة أوي ومتترجعش خالص). [[hours]] مثلًا: stale ٥ دقايق، و revalidate ساعة، و expire يوم. ومن غير [[cacheLife]] بيتستخدم [[default]]: stale ٥ دقايق و revalidate ربع ساعة. وتقدر تعرّف profiles بأسماء في next.config.

على كومبوننت: [[use cache]] في أول كومبوننت async بيكاش الناتج كله (الـ JSX). و [[children]] اللي بيتبعتله مش جزء من المفتاح، فممكن تحط جواه حاجة dynamic.

فيه نسختين تانيين: [[use cache: private]] لكاش خاص بكل مستخدم ومسموح فيه تقرا cookies (بيتخزن في المتصفح بس، مش على السيرفر)، و [[use cache: remote]] لكاش مشترك في مكان خارجي (Redis مثلًا) لو التطبيق على كذا نسخة. الاتنين أحدث ولسه بيتطوروا، فراجع الوثائق قبل ما تعتمد عليهم.`,
            when: "الـ queries اللي نتيجتها واحدة لكل الزوار أو لمجموعات قليلة: المنتجات، والأقسام، والمقالات، والإعدادات، والأسعار بالعملة. ومش لبيانات المستخدم (السلة، والطلبات): دي dynamic جوه Suspense.",
            mistakes: R`تكاش دالة بتقرا الـ user من الـ cookie جواها فيطلع خطأ، وأسوأ لو «صلّحتها» بإنك تشيل الـ cookie وتسيب الـ userId برّه المفتاح: داتا مستخدم تظهر لغيره. وتبعت object كبير كـ argument (الطلب كله) فكل طلب مفتاح جديد والكاش ملوش فايدة. وتنسى الفلاج فالـ build يقول إن [[use cache]] محتاج [[cacheComponents]].`
          },
          lines: [
            "الفلاج اللي بيشغّل Cache Components.",
            R`[[cacheLife]] و [[cacheTag]] بقوا stable في Next 16 (كانوا [[unstable_]] قبلها).`,
            "دالة عادية بتجيب منتج.",
            R`أول سطر في الدالة. الـ [[slug]] بقى جزء من مفتاح الكاش.`,
            R`profile [[hours]]: بتتجدد في الخلفية كل ساعة تقريبًا.`,
            "tagين: واحد لكل المنتجات، وواحد للمنتج ده بس، عشان تمسحهم بشكل منفصل.",
            "الناتج لازم serializable (Prisma بيرجّع objects عادية، فماشي).",
            "قفلة.",
            "دالة تانية الـ argument بتاعها العملة.",
            "متكاشة.",
            "الأسعار بتتغير أكتر، فعمر أقصر.",
            R`كاش لكل عملة لوحدها، لأن [[currency]] جزء من المفتاح.`,
            "قفلة.",
            "كومبوننت بيستخدمها.",
            "الـ cookie بتتقري برّه الدالة المتكاشة، والقيمة بتتحوّل لواحدة من اتنين بس (عشان متعملش كاش لكل قيمة غريبة).",
            "ابعت العملة كـ argument.",
            "اعرض.",
            "قفلة."
          ]
        },
        {
          cmd: "static shell و Suspense",
          title: "صفحة واحدة: shell جاهز من الـ build وحتت بتتحسب مع الطلب",
          desc: R`مع [[cacheComponents]]، Next بيرسم كل صفحة وقت الـ build لحد ما يقابل حاجة مش متكاشة: [[cookies()]]، أو [[params]] مش معروفة، أو query من غير [[use cache]]. الجزء اللي اترسم بيبقى static shell بيتبعت فورًا، والحاجات الـ dynamic بتكمّل streaming مع الطلب. ده Partial Prerendering، ورمزه [[◐]] في جدول الـ build.

الشرط: أي حاجة dynamic لازم تبقى جوه [[<Suspense>]] عشان Next يعرف يحط إيه مكانها في الـ shell. لو لأ، بيطلع خطأ «Uncached data was accessed outside of <Suspense>» في dev وفي الـ build. والحل يا تكاشها بـ [[use cache]]، يا تلفها في Suspense.`,
          example: R`// app/products/[slug]/page.tsx (cacheComponents: true)
import { Suspense } from "react";
import { cookies } from "next/headers";
export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<ProductSkeleton />}>
        <ProductInfo params={params} />
      </Suspense>
      <Suspense fallback={<span>السلة...</span>}>
        <CartBadge />
      </Suspense>
    </>
  );
}
async function ProductInfo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return <h1>{product?.name}</h1>;
}
async function CartBadge() {
  const cartId = (await cookies()).get("cart")?.value;
  const count = cartId ? await countCartItems(cartId) : 0;
  return <span>{count}</span>;
}`,
          try: R`فعّل [[cacheComponents]] واعمل الصفحة دي. بعدين انقل [[await cookies()]] لجسم [[ProductPage]] نفسها (واعملها async) واقرا الخطأ في dev. رجّعها، وضيف [[generateStaticParams]] بترجّع [[[{ slug: "a" }]]]، واعمل build وبص على الرمز جنب الـ route.`,
          flag: "script",
          deep: {
            why: R`في النموذج القديم، cookie واحدة للسلة في الـ header بتخلي الصفحة كلها dynamic، فصفحة المنتج اللي ٩٥٪ منها زي ما هو لكل الناس بتترسم من الأول مع كل زائر. Partial Prerendering بيخلي الـ ٩٥٪ ملف جاهز، والـ ٥٪ بس هي اللي بتتحسب.`,
            how: R`وقت الـ build، Next بيرسم الشجرة ويستنى الحاجات المتكاشة أو الـ sync. أول ما كومبوننت يستنى حاجة dynamic، Next بيوقف عنده وياخد الـ fallback بتاع أقرب Suspense فوقه ويحطه في الـ shell. النتيجة HTML فيه كل حاجة ثابتة، و «فتحات» مكان الـ dynamic.

مع الطلب، الـ shell بيتبعت فورًا، وفي نفس الـ response السيرفر بيرسم الفتحات بس ويبعتها streaming. فالـ TTFB بتاع صفحة static، والداتا الشخصية في نفس الطلب.

ليه الخطأ لو مفيش Suspense؟ لأن Next مش عارف يحط إيه مكان الجزء ده في الـ shell، فكان هيضطر يخلي الصفحة كلها تستنى، وده بالظبط اللي النموذج الجديد بيمنعه. فبيجبرك تختار: [[use cache]] (بقت static)، أو Suspense (بقت فتحة واضحة).

الحاجات اللي بتتعتبر dynamic: [[cookies()]] و [[headers()]] و [[searchParams]] و [[params]] اللي مش من [[generateStaticParams]] و [[connection()]] وأي I/O مش متكاش. وكمان [[Date.now()]] و [[Math.random()]] و [[crypto.randomUUID()]] في server component بيطلّعوا خطأ لو مش جوه [[use cache]] أو بعد [[await connection()]]، لأن Next مش عارف انت عايز القيمة وقت الـ build ولا مع كل طلب.`,
            when: "صفحات أغلبها ثابت وفيها حتة شخصية: صفحة منتج فيها السلة أو «اشتريته قبل كده»، ومقال فيه اسم المستخدم، ورئيسية فيها توصيات مخصصة.",
            mistakes: R`تعمل [[await params]] في أول الصفحة (زي النموذج القديم) فيطلع الخطأ، وتحلّه بـ Suspense حوالين الصفحة كلها فالـ shell يبقى فاضي. الأحسن تنزّل الـ await لتحت في الكومبوننت اللي محتاجه. وتلف الـ header كله في Suspense عشان فيه اسم المستخدم، بدل ما تلف الاسم بس.`
          },
          lines: [
            "Suspense.",
            R`[[cookies]] من [[next/headers]]، وهي async.`,
            R`الصفحة نفسها مش async ومش بتعمل await لحاجة، فتترسم كلها في الـ shell. والـ [[params]] بتتبعت Promise زي ما هي.`,
            "بداية الـ JSX.",
            "Fragment.",
            "header ثابت: جزء من الـ shell، بيتبعت فورًا.",
            "الـ fallback ده هو اللي هيبقى في الـ shell مكان المنتج.",
            R`الـ await على [[params]] جواه، فهو اللي dynamic مش الصفحة كلها.`,
            "قفلة.",
            "حد تاني للسلة: بتعتمد على cookie، فلازم تتحسب مع كل طلب.",
            "عدد حاجات السلة.",
            "قفلة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الصفحة.",
            "كومبوننت المنتج.",
            "هنا بيعمل await للـ params. لو ده كان في الصفحة نفسها برّه Suspense، كان هيطلع الخطأ.",
            R`[[getProduct]] عليها [[use cache]] (الدرس اللي فات)، فالـ query نفسه متكاش حتى لو الكومبوننت dynamic.`,
            "اعرض.",
            "قفلة.",
            "كومبوننت السلة.",
            "cookie: بيانات الطلب، مستحيل تتكاش للكل.",
            "لو فيه سلة هات العدد.",
            "اعرض.",
            "قفلة."
          ]
        },
        {
          cmd: "updateTag و revalidateTag",
          title: "تمسح الكاش بعد ما الداتا تتغير",
          desc: R`بعد ما تعدّل حاجة في الداتابيز، الكاش لسه فيه النسخة القديمة. فيه ٣ أدوات: [[updateTag(tag)]] بيمسح فورًا والطلب الجاي يستنى الداتا الجديدة، ودي للي المستخدم لازم يشوف تعديله على طول (Server Actions بس). و [[revalidateTag(tag, "max")]] بيعلّم الكاش إنه قديم ويجدده في الخلفية (stale-while-revalidate)، وده ينفع في Route Handler كمان، زي webhook من CMS. و [[revalidatePath("/blog")]] بيمسح صفحة بالمسار.

وفي Next 16 [[revalidateTag]] بقت محتاجة argument تاني (profile)، والشكل القديم بـ argument واحد deprecated.`,
          example: R`// app/actions/products.ts
"use server";
import { updateTag, revalidateTag, revalidatePath } from "next/cache";
export async function updatePrice(slug: string, formData: FormData) {
  await requireAdmin();
  const price = Number(formData.get("price"));
  await db.product.update({ where: { slug }, data: { priceCents: Math.round(price * 100) } });
  updateTag($__btproduct-$__{slug}$__bt);
  revalidateTag("products", "max");
  revalidatePath("/admin/products");
}
// app/api/cms-webhook/route.ts
export async function POST(request: Request) {
  if (request.headers.get("x-webhook-secret") !== process.env.CMS_WEBHOOK_SECRET) {
    return new Response("unauthorized", { status: 401 });
  }
  const { tag } = (await request.json()) as { tag: string };
  revalidateTag(tag, "max");
  return Response.json({ revalidated: tag });
}`,
          try: R`اعمل صفحة بتعرض منتج من [[getProduct]] المتكاشة، وفورم بيعدّل السعر بالـ action دي. جرّب مرة بـ [[updateTag]] ومرة بـ [[revalidateTag]] بس: في التانية هتلاقي السعر القديم لسه ظاهر بعد الحفظ، ويتغير في الـ refresh اللي بعده.`,
          flag: "script",
          deep: {
            why: "الكاش من غير طريقة تمسحه بيها bug مستني يحصل: الأدمن يغيّر السعر ويفضل القديم ظاهر لحد ما العمر يخلص. والمسح بالـ tag أدق من إنك تمسح كل حاجة: تعديل منتج واحد مش لازم يمسح كاش ٥٠٠٠ منتج.",
            how: R`كل حاجة متكاشة ليها tags (من [[cacheTag]] أو [[next.tags]] في fetch). المسح بيعلّم كل الحاجات اللي عليها الـ tag ده، وأي صفحة استخدمتها بتتجدد.

[[revalidateTag(tag, "max")]]: الـ entry بيبقى stale. الطلب الجاي بياخد القديم فورًا وبيشغّل تجديد في الخلفية. ده الأنسب لمحتوى عام (مقال اتعدّل، ومحدش مستني يشوف التعديل في نفس الثانية). والـ argument التاني profile من profiles الـ [[cacheLife]]، أو [[{ expire: 0 }]] لو محتاج انتهاء فوري من Route Handler.

[[updateTag(tag)]]: الـ entry بينتهي فورًا، والطلب الجاي بيستنى الداتا الجديدة. ده «read your own writes»: اللي عدّل لازم يشوف تعديله. ومتاح في Server Actions بس.

[[revalidatePath(path)]] بيمسح بالمسار: [[revalidatePath("/blog")]] الصفحة دي، و [[revalidatePath("/blog/[slug]", "page")]] كل صفحات المقالات. أبسط، بس أوسع من اللازم غالبًا.

و [[refresh()]] من [[next/cache]] (Next 16) جوه Server Action بيخلي المتصفح يجيب الصفحة الحالية تاني من غير ما يلمس الكاش، مفيد لما الداتا مش متكاشة أصلًا (عدد إشعارات مثلًا).`,
            when: R`[[updateTag]] بعد أي تعديل المستخدم نفسه مستني يشوفه (بروفايله، ومنتجه، وكومنته). [[revalidateTag]] مع [[max]] من webhooks و cron والتعديلات اللي مش لازم تبان في نفس الثانية. [[revalidatePath]] لما مش مستخدم tags.`,
            mistakes: R`تعدّل في الداتابيز وتنسى تمسح الكاش خالص. و [[revalidateTag("posts")]] بـ argument واحد في Next 16 (deprecated و TS بيعترض). و tag اسمه بيتكتب مختلف في مكانين ([[product-a]] و [[products-a]]) فالمسح مبيعملش حاجة ومفيش أي خطأ. والـ webhook route من غير secret، فأي حد يقدر يمسح كاشك كل ثانية.`
          },
          lines: [
            "Server Action (الفئة الجاية).",
            R`التلات أدوات من [[next/cache]].`,
            "تعديل سعر منتج.",
            "اتأكد إنه أدمن الأول (درس الأمان في Server Actions).",
            "السعر من الفورم.",
            "حدّث الداتابيز. الفلوس بتتخزن قروش صحيحة.",
            "امسح كاش المنتج ده فورًا: الأدمن هيشوف السعر الجديد في الطلب الجاي.",
            "ليستات المنتجات: تتجدد في الخلفية، والزوار ممكن يشوفوا القديم لحظة.",
            "وصفحة الأدمن نفسها بالمسار.",
            "قفلة.",
            "Route Handler بيستقبل webhook من الـ CMS لما مقال يتنشر.",
            "مفتاح سري مشترك مع الـ CMS، عشان مش أي حد يمسح الكاش.",
            "401.",
            "قفلة.",
            R`اسم الـ tag من جسم الطلب، زي [["posts"]].`,
            R`[[updateTag]] مينفعش هنا (Server Actions بس)، فبنستخدم revalidateTag.`,
            "رد.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "Server Actions",
      l: 2,
      n: "دالة على السيرفر بتناديها من فورم أو زرار، من غير ما تكتب API، وبتتحمي زي أي endpoint",
      items: [
        {
          cmd: "use server",
          title: "تبعت فورم للسيرفر من غير ما تكتب API",
          desc: R`Server Action دالة [[async]] عليها [[use server]]، بتتنفذ على السيرفر، وتقدر تناديها من المتصفح كأنها دالة عادية. أشهر استخدام: [[<form action={createPost}>]]، والدالة بتستلم [[FormData]] فيها كل الخانات بالـ [[name]].

حطهم في ملف لوحده عليه [[use server]] فوق (زي [[app/actions/posts.ts]])، فتقدر تستوردهم في server و client components. وبعد التعديل، [[revalidatePath]] أو [[updateTag]] عشان الصفحة تعرض الجديد.`,
          example: R`// app/actions/posts.ts
"use server";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
export async function createPost(formData: FormData) {
  const { userId } = await verifySession();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  await db.post.create({ data: { title, authorId: userId } });
  revalidatePath("/posts");
}
// app/posts/new/page.tsx (server component)
import { createPost } from "@/app/actions/posts";
export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required maxLength={120} />
      <button type="submit">انشر</button>
    </form>
  );
}`,
          try: R`اعمل الـ action والصفحة، واقفل JavaScript من DevTools (Settings > Debugger > Disable JavaScript) وابعت الفورم: هتلاقيه اشتغل برضه. وبعدين شغّل JS تاني وافتح Network وابعته: هتلاقي طلب POST على نفس الصفحة وفيه header اسمه [[Next-Action]].`,
          flag: "script",
          deep: {
            why: "عشان تحفظ فورم في SPA لازم: route في API، و fetch في الواجهة، و loading state، و error handling، وأنواع للطلب والرد في مكانين. الـ Server Action بيشيل كل ده: دالة واحدة، و TypeScript شايف الأنواع من الناحيتين.",
            how: R`وقت الـ build، Next بيدّي كل Server Action ID ويعمل endpoint مخفي. في الـ client، الدالة بتتحول لـ reference: لما تناديها، بيتبعت POST للصفحة الحالية فيه الـ ID في header [[Next-Action]] والـ arguments في الـ body. السيرفر بينفذ الدالة، ويرجّع النتيجة ومعاها الـ RSC payload الجديد لو فيه revalidate، فالصفحة بتتحدث في نفس الرحلة.

[[<form action={fn}>]] بيشتغل حتى قبل ما الـ JS يتحمّل (progressive enhancement): الفورم بيتبعت POST عادي، وبعد الـ hydration React بيمسكه ويبعته من غير reload. وبعد ما الـ action يخلص، React بيفضّي الفورم لوحده.

الـ actions بتتنفذ ورا بعض واحد واحد من نفس الصفحة، فمش مناسبة لجلب داتا بالتوازي. وحد حجم الـ body الافتراضي ١ ميجا ([[experimental.serverActions.bodySizeLimit]] في next.config لو رافع ملفات).

وتقدر تنادي الـ action من غير فورم: [[onClick={() => deletePost(id)}]] جوه client component (مع [[startTransition]] لو عايز pending state)، أو تعدّيها prop لـ client component، وده الاستثناء الوحيد للدوال في الـ props.`,
            when: R`أي mutation من الواجهة بتاعتك: فورمات، وأزرار حذف وإعجاب، وتغيير إعدادات. ومش للي بيناديه حد من برّه (تطبيق موبايل، أو webhook): ده Route Handler.`,
            mistakes: R`تثق في [[required]] و [[maxLength]] وتنسى الفحص على السيرفر. وتاخد [[authorId]] أو [[price]] من FormData. وتنسى [[revalidatePath]] فالحفظ نجح والصفحة لسه قديمة. وتكتب [[use server]] فوق ملف فيه دوال مساعدة مش المفروض تبقى endpoints، فكلهم بقوا قابلين للنداء من برّه.`
          },
          lines: [
            "كل الدوال المصدّرة من الملف ده بقت Server Actions.",
            "مسح كاش الصفحة بعد التعديل.",
            "دالة بتتأكد من المستخدم (درس DAL في فئة Auth).",
            R`بتستلم [[FormData]] لما تتحط في [[action]] بتاع فورم.`,
            "مين اللي بيبعت؟ لازم تسأل في كل action.",
            R`القيمة بالـ [[name]]. [[get]] بترجع [[FormDataEntryValue | null]]، فبنحوّلها string.`,
            "فاضي؟ متعملش حاجة (الدرس الجاي بيرجّع رسالة خطأ).",
            R`احفظ، والـ [[authorId]] من الـ session مش من الفورم.`,
            "خلي صفحة الليستة تتجدد.",
            "قفلة.",
            "استورد الـ action.",
            "صفحة server component عادية، مفيهاش use client.",
            "بداية الـ JSX.",
            R`[[action]] بياخد الدالة مباشرة، مش URL.`,
            R`[[name="title"]] هو المفتاح في FormData. و [[required]] حماية في المتصفح بس.`,
            "إرسال.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ]
        },
        {
          cmd: "useActionState",
          title: "ترجّع أخطاء الفورم وتعرض «جاري الحفظ»",
          desc: R`[[useActionState(action, initialState)]] من React 19 بيلف الـ action ويدّيك ٣ حاجات: آخر نتيجة رجعت منها ([[state]])، ونسخة من الـ action تحطها في الفورم، و [[pending]] وهي شغالة. الـ action هنا بياخد الـ state اللي فاتت كأول argument و FormData تاني.

الأخطاء المتوقعة (إيميل غلط، أو باسورد قصير، أو إيميل متسجل قبل كده) متترميش: رجّعها كقيمة، والفورم يعرضها جنب الخانة. والفحص بـ Zod على السيرفر ([[safeParse]] و [[z.flattenError]]، تفاصيلهم في تاب «TypeScript»).`,
          example: R`// app/actions/signup.ts
"use server";
import * as z from "zod";
const Signup = z.object({
  email: z.email({ error: "إيميل مش صحيح" }),
  password: z.string().min(8, { error: "٨ حروف على الأقل" }),
});
export type SignupState = { errors?: { email?: string[]; password?: string[] }; message?: string; email?: string };
export async function signup(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get("email") ?? "");
  const parsed = Signup.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { email, errors: z.flattenError(parsed.error).fieldErrors };
  if (await emailTaken(parsed.data.email)) return { email, errors: { email: ["الإيميل ده متسجل"] } };
  await createUser(parsed.data);
  return { message: "اتسجلت، شوف إيميلك" };
}
// app/signup/signup-form.tsx
"use client";
import { useActionState } from "react";
import { signup } from "@/app/actions/signup";
export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, {});
  return (
    <form action={formAction}>
      <input name="email" type="email" defaultValue={state.email} />
      {state.errors?.email && <p className="text-red-600">{state.errors.email[0]}</p>}
      <input name="password" type="password" />
      {state.errors?.password && <p className="text-red-600">{state.errors.password[0]}</p>}
      <button disabled={pending}>{pending ? "بنسجّل..." : "سجّل"}</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`,
          try: R`ابعت الفورم فاضي، وبعدين بإيميل غلط، وبعدين صح. وبعدين شيل [[defaultValue={state.email}]] وابعت باسورد قصير: الإيميل هيتمسح. وحط [[await new Promise((r) => setTimeout(r, 2000))]] في الـ action عشان تشوف الـ pending.`,
          flag: "script",
          deep: {
            why: "الفورم الحقيقي محتاج ٣ حاجات: يعرض الأخطاء جنب كل خانة، ويقفل الزرار وهو بيبعت، ويحتفظ باللي المستخدم كتبه. من غير useActionState بتكتب state لكل واحدة وتعمل try/catch وتنسى حالة.",
            how: R`[[useActionState]] بيعمل wrapper: لما الفورم يتبعت، بينادي الـ action بالـ state الحالية و FormData، ويحط [[pending]] بـ true، ولما النتيجة ترجع يحطها في [[state]] ويعمل render. وكل ده جوه transition، فالواجهة مبتتقفلش.

ليه الأخطاء ترجع قيمة مش throw؟ لأن اللي بيترمي من الـ action بيروح لأقرب [[error.tsx]]، والمستخدم يشوف «حصلت مشكلة» بدل «الإيميل مش صحيح». الـ throw للحاجات اللي مش متوقعة بس (الداتابيز وقعت).

[[useFormStatus()]] من [[react-dom]] بيدّي [[pending]] لأي كومبوننت جوه الفورم (زرار submit منفصل)، من غير ما تعدّيه props. لازم يبقى في كومبوننت ابن للـ [[<form>]]، مش في نفس الكومبوننت اللي فيه الفورم.

والفحص على السيرفر إجباري حتى لو فيه فحص في المتصفح (react-hook-form + zod في تاب «React»)، لأن الـ action endpoint وأي حد يقدر يبعتله أي حاجة. وتقدر تستخدم نفس الـ schema في الناحيتين.

والاسم القديم [[useFormState]] من react-dom بقى deprecated، وبداله [[useActionState]] من [[react]].`,
            when: "أي فورم بيبعت لـ Server Action ومحتاج يعرض نتيجة: تسجيل، ودخول، وإضافة منتج، وتعديل بروفايل.",
            mistakes: R`ترمي [[throw new Error("إيميل غلط")]] من الـ action. وتنسى إن React بيفضّي الفورم بعد الـ action. وتحط [[useFormStatus]] في نفس الكومبوننت اللي فيه [[<form>]] فـ [[pending]] دايمًا false. وترجّع الـ [[ZodError]] كله أو الـ user كله في الـ state: كل اللي بترجّعه بيتبعت للمتصفح.`
          },
          lines: [
            "ملف actions.",
            "Zod 4.",
            "الـ schema.",
            "إيميل برسالة بالعربي.",
            "باسورد ٨ حروف على الأقل.",
            "قفلة.",
            R`شكل النتيجة اللي بترجع للفورم. تصدير [[type]] مسموح في ملف [[use server]] لأنه بيتمسح.`,
            R`مع [[useActionState]] الـ action بياخد الـ state اللي فاتت الأول، و FormData تاني.`,
            "الإيميل اللي اتكتب، عشان نرجّعه للخانة لو فيه غلط.",
            R`افحص. [[safeParse]] مبيرميش.`,
            "فيه غلط؟ رجّع الأخطاء لكل خانة، ورجّع الإيميل عشان ميتمسحش.",
            "خطأ من الداتابيز بنفس الشكل.",
            "كل حاجة تمام.",
            "رسالة نجاح.",
            "قفلة.",
            "الـ hook ده في client component.",
            R`من [[react]] مش من Next.`,
            "الـ action.",
            "الفورم.",
            R`[[state]] آخر نتيجة، و [[formAction]] تحطها في الفورم، و [[pending]] وهي شغالة. و [[{}]] الحالة الأولى.`,
            "بداية الـ JSX.",
            R`[[formAction]] مش [[signup]] مباشرة.`,
            R`[[defaultValue]] من الـ state: React بيفضّي الفورم بعد كل action، فمن غير ده الإيميل يتمسح مع كل غلط.`,
            "أول خطأ للإيميل.",
            "الباسورد (مبنرجّعهوش أبدًا).",
            "أول خطأ للباسورد.",
            "الزرار مقفول وبيقول «بنسجّل» وهي شغالة، فمفيش ضغطتين.",
            "رسالة النجاح.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ]
        },
        {
          cmd: "redirect و useOptimistic",
          title: "بعد الحفظ: تحوّل لصفحة، أو تعرض النتيجة قبل ما السيرفر يرد",
          desc: R`بعد ما الـ action يخلص، يا إما تحوّل المستخدم ([[redirect("/posts/" + id)]] من [[next/navigation]])، يا إما تسيبه في مكانه والصفحة تتحدث بـ [[revalidatePath]] أو [[updateTag]]. و [[redirect]] بيرمي error خاص عشان يوقف التنفيذ، فمتحطهاش جوه [[try]]، ونادي الـ revalidate قبلها.

وللحاجات السريعة (like، أو checkbox في todo)، [[useOptimistic]] بيغيّر الشاشة فورًا كأن السيرفر رد، ولما الـ action يخلص الشاشة بترجع تعرض الداتا الحقيقية لوحدها.`,
          example: R`// app/actions/todos.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createTodo(formData: FormData) {
  const { userId } = await verifySession();
  let todo;
  try {
    todo = await db.todo.create({ data: { title: String(formData.get("title")), userId } });
  } catch {
    return;
  }
  revalidatePath("/todos");
  redirect($__bt/todos/$__{todo.id}$__bt);
}
export async function toggleTodo(id: string, done: boolean) {
  const { userId } = await verifySession();
  await db.todo.update({ where: { id, userId }, data: { done } });
  revalidatePath("/todos");
}
// app/todos/todo-list.tsx
"use client";
import { useOptimistic, startTransition } from "react";
export function TodoList({ todos }: { todos: Todo[] }) {
  const [shown, setOptimistic] = useOptimistic(todos, (state, id: string) =>
    state.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  );
  function toggle(t: Todo) {
    startTransition(async () => {
      setOptimistic(t.id);
      await toggleTodo(t.id, !t.done);
    });
  }
  return <ul>{shown.map((t) => <li key={t.id}><input type="checkbox" checked={t.done} onChange={() => toggle(t)} /> {t.title}</li>)}</ul>;
}`,
          try: R`حط [[await new Promise((r) => setTimeout(r, 1500))]] في [[toggleTodo]]: الـ checkbox بيتقلب فورًا. وبعدين امسح سطر الـ update من [[toggleTodo]] (يعني السيرفر مش هيغيّر حاجة) واضغط: هيتقلب، وبعد ثانية ونص يرجع زي ما كان لوحده. وجرّب [[redirect]] جوه الـ try وشوف إن التحويل مبيحصلش.`,
          flag: "script",
          deep: {
            why: "بعد «انشر» المستخدم مستني يروح لصفحة الحاجة الجديدة، مش يفضل على فورم فاضي. والـ like اللي بياخد نص ثانية عشان يبان بيخلي التطبيق يحس إنه تقيل، مع إن ٩٩٪ من المرات السيرفر هيقول أيوة.",
            how: R`[[redirect()]] بترمي error اسمه [[NEXT_REDIRECT]]. Next بيمسكه ويرد بتحويل: في Server Action بيقول للمتصفح يروح للصفحة الجديدة، ومعاه الـ RSC payload بتاعها في نفس الرد. لو الـ throw ده وقع في [[catch]] بتاعك، التحويل مات. عشان كده الترتيب: الشغل جوه try، والـ revalidate والـ redirect بعده. و [[permanentRedirect]] زيها بس 308.

[[useOptimistic(state, updateFn)]] بيرجّع نسخة من الـ state. وانت جوه transition، [[setOptimistic(x)]] بيطبّق [[updateFn]] على النسخة دي فورًا. أول ما الـ transition يخلص (الـ action رجع والـ props الجديدة وصلت من الـ revalidate)، React بيرمي النسخة المتفائلة ويعرض الـ props الحقيقية. فلو السيرفر محصلش عنده تغيير، الشاشة بترجع لوحدها من غير ما تكتب rollback.

ولو الـ action رمى error، الخطأ بيروح لأقرب error boundary. فالأحسن الـ action يرجّع [[{ ok: false }]] وانت تعرض toast.

الفرق عن optimistic update في React Query (تاب «React»): هنا مفيش cache تعدّله وترجّعه بإيدك. الحقيقة دايمًا الـ props اللي جاية من السيرفر.`,
            when: R`[[redirect]] بعد الإنشاء (روح للحاجة الجديدة) والدخول والخروج. [[useOptimistic]] للتفاعلات السريعة اللي غالبًا بتنجح: like، و checkbox، وترتيب، ورسالة في chat. ومش للدفع أو أي حاجة لو فشلت المستخدم لازم يعرف قبل ما يكمّل.`,
            mistakes: R`[[redirect]] جوه try/catch. و [[redirect]] قبل [[revalidatePath]] فالسطر اللي بعدها مبيتنفذش. و [[setOptimistic]] برّه [[startTransition]] أو برّه action فيطلع تحذير والقيمة ترجع على طول. وتعمل optimistic للدفع.`
          },
          lines: [
            "ملف actions.",
            R`[[revalidatePath]].`,
            R`[[redirect]] من [[next/navigation]].`,
            "إضافة todo من فورم.",
            "المستخدم.",
            R`[[todo]] برّه الـ try عشان نستخدمه بعدها.`,
            "جرّب...",
            "...تحفظ.",
            "لو فشل...",
            "...متحوّلش. (في فورم حقيقي رجّع رسالة بـ useActionState.)",
            "قفلة.",
            "حدّث الليستة قبل الـ redirect.",
            R`[[redirect]] برّه الـ try: هي بترمي error خاص، والـ catch كان هيبلعه.`,
            "قفلة.",
            "action بيتنادى من زرار مش من فورم، فبياخد arguments عادية.",
            "المستخدم.",
            R`[[userId]] في الـ where: متعدّلش todo مش بتاعك حتى لو الـ id صح.`,
            "حدّث الصفحة.",
            "قفلة.",
            "client component.",
            R`[[useOptimistic]] و [[startTransition]] من React 19.`,
            "الـ todos الحقيقية جاية props من server component.",
            R`[[shown]] نسخة للعرض. الدالة بتحسب الشكل المتفائل من الحالة الحالية والـ id.`,
            "اقلب done للعنصر ده بس.",
            "قفلة.",
            "لما يضغط...",
            R`...ابدأ transition. [[setOptimistic]] لازم جواه.`,
            "الشاشة تتغير فورًا.",
            R`نادي السيرفر. لما يخلص والـ props الجديدة توصل، [[shown]] بيرجع يساوي الحقيقة.`,
            "قفلة الـ transition.",
            "قفلة.",
            "اعرض النسخة المتفائلة.",
            "قفلة."
          ]
        },
        {
          cmd: "action = endpoint عام",
          title: "Server Action زي أي API: أي حد يقدر يناديه",
          desc: R`كل Server Action بيبقى endpoint على السيرفر، وأي حد عنده الـ ID يقدر يبعتله أي arguments، حتى لو الزرار مخفي عنده في الواجهة. عشان كده جوه كل action: اتأكد مين المستخدم (authentication)، ومسموحله بالحاجة دي بالذات ولا لأ (authorization)، وافحص كل input.

والحاجات اللي ليها علاقة بالأمان (السعر، و [[userId]]، والدور) متاخدهاش من الـ arguments أبدًا: السعر من الداتابيز، والمستخدم من الـ session.`,
          example: R`// app/actions/orders.ts
"use server";
import * as z from "zod";
import { verifySession } from "@/lib/dal";
const Input = z.object({ orderId: z.uuid() });
export async function cancelOrder(input: unknown) {
  const { orderId } = Input.parse(input);
  const { userId } = await verifySession();
  const result = await db.order.updateMany({
    where: { id: orderId, userId, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
  if (result.count === 0) return { ok: false as const, error: "الطلب مش موجود أو مينفعش يتلغي" };
  revalidatePath("/orders");
  return { ok: true as const };
}`,
          try: R`افتح Network في DevTools وانت بتلغي طلب، وخد الطلب (Copy as cURL). غيّر الـ orderId في الـ body لطلب مستخدم تاني وابعته من الترمنال: لازم يرجع ok: false. وبعدين امسح [[userId]] من الـ where وجرّب تاني: هتلغي طلب غيرك.`,
          flag: "script",
          deep: {
            why: "الـ Server Action بيتكتب كأنه دالة عادية جوه الكومبوننت، فسهل تنسى إنه endpoint على الإنترنت. «الزرار مش ظاهر غير للأدمن» مش حماية، والأنواع بتاعة TypeScript مش حماية. وأي action من غير فحص صلاحيات هو ثغرة IDOR جاهزة.",
            how: R`Next بيعمل حاجات بتحميك جزئيًا: الـ IDs بتاعة الـ actions مش متوقعة، والـ actions اللي مش مستخدمة في أي مكان بتتشال من الـ build، والـ POST لازم ييجي من نفس الـ origin (بيقارن [[Origin]] بـ [[Host]]، ولو ورا proxy بدومين تاني فيه [[experimental.serverActions.allowedOrigins]])، وده بيقفل CSRF. والـ closures (متغيرات من الكومبوننت بتستخدمها action معرّفة جواه) بتتشفر قبل ما تتبعت للمتصفح.

بس ده كله مش authorization. الـ ID بيظهر في الـ JS اللي أي حد بينزّله، وبعد كده يقدر يبعت أي arguments. فالقاعدة زي أي API: الـ action بيعامل الـ input كأنه جاي من عدو.

والرد كمان: اللي بترجّعه بيتبعت للمتصفح كله. مترجّعش الـ user object بالـ hash، ولا error الداتابيز بتفاصيله.

وافتكر إن [[use server]] على ملف معناها إن كل الدوال المصدّرة منه endpoints. الدوال المساعدة (queries و helpers) مكانها ملف تاني عليه [[server-only]].`,
            when: R`كل Server Action من غير استثناء. واعمل helpers زي [[verifySession()]] و [[requireAdmin()]] في الـ DAL عشان السطر يبقى قصير ومحدش يكسل يكتبه.`,
            mistakes: R`action بياخد [[{ orderId, userId }]] ويثق في الـ userId. و action بياخد [[price]] من الواجهة ويعمل order بيه. وفحص الصلاحية في الصفحة اللي فيها الزرار بس، والـ action نفسه مفتوح. وترجّع [[error.message]] بتاع Prisma للمستخدم. وفي ديسمبر ٢٠٢٥ ثغرة React2Shell (CVE-2025-55182) في بروتوكول الـ Server Components نفسه سمحت بتنفيذ كود على السيرفر من غير login، فالتحديث الأمني لـ Next و React جزء من الأمان هنا كمان (درس الترقية في المستوى التالت).`
          },
          lines: [
            "كل export هنا endpoint.",
            "Zod.",
            "الـ session.",
            R`الـ input المتوقع: id بشكل uuid بس.`,
            R`النوع [[unknown]] مش [[{ orderId: string }]]: TS مبيحميش حاجة جاية من الشبكة، فبنفحص.`,
            R`[[parse]] بيرمي لو الشكل غلط. ده مش متوقع من واجهتنا، فمقبول يروح لـ error.tsx.`,
            R`مين؟ لو مفيش session، [[verifySession]] بتحوّل للـ login.`,
            R`[[updateMany]] عشان نقدر نحط شروط زيادة في الـ where.`,
            "الملكية والحالة في نفس الـ query: الطلب بتاعه، ولسه pending. مفيش فحص منفصل ممكن يتسابق مع تعديل تاني.",
            "التغيير.",
            "قفلة.",
            "صفر صفوف؟ يا مش بتاعه يا اتشحن. رسالة واحدة للحالتين عشان ميعرفش الطلب موجود ولا لأ.",
            "حدّث الصفحة.",
            "نجاح.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "Route Handlers و proxy",
      l: 2,
      n: "API endpoints جوه Next، و webhooks، وكود بيشتغل قبل كل طلب (middleware اللي اسمه بقى proxy)",
      items: [
        {
          cmd: "route.ts",
          title: "تعمل API endpoint جوه مشروع Next",
          desc: R`ملف [[route.ts]] جوه [[app]] بيعمل endpoint: كل HTTP method دالة مصدّرة بنفس الاسم ([[GET]] و [[POST]] و [[PUT]] و [[PATCH]] و [[DELETE]])، بتاخد [[Request]] وترجّع [[Response]] (Web APIs العادية). [[app/api/products/route.ts]] يبقى [[/api/products]].

مينفعش [[route.ts]] و [[page.tsx]] في نفس الفولدر. والـ [[params]] في المسارات الـ dynamic بتيجي في الـ argument التاني وهي Promise. ومن Next 15 الـ GET مبيتكاشش افتراضيًا.`,
          example: R`// app/api/products/route.ts
import type { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const products = await db.product.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    take: 20,
  });
  return Response.json(products);
}
export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "forbidden" }, { status: 403 });
  const parsed = ProductInput.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "invalid input", issues: parsed.error.issues }, { status: 400 });
  const product = await db.product.create({ data: parsed.data });
  return Response.json(product, { status: 201 });
}
// app/api/products/[id]/route.ts
export async function DELETE(_request: Request, ctx: RouteContext<"/api/products/[id]">) {
  if (!(await isAdmin())) return Response.json({ error: "forbidden" }, { status: 403 });
  const { id } = await ctx.params;
  await db.product.delete({ where: { id } });
  return new Response(null, { status: 204 });
}`,
          try: R`اعمل الـ GET وافتح [[/api/products?q=كتاب]] في المتصفح، وجرّب الـ POST بـ [[curl -X POST localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":""}']] وشوف الـ 403 أو 400. وبعدين اعمل [[page.tsx]] في نفس فولدر [[route.ts]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: "Server Actions للواجهة بتاعتك بس. أي حد تاني محتاج يكلّم السيرفر: تطبيق موبايل، أو خدمة خارجية بتبعت webhook، أو ملف RSS، أو حد عايز JSON. ده محتاج URL ثابت و HTTP عادي، وده Route Handler.",
            how: R`Route Handlers مبنية على Web APIs: [[Request]] و [[Response]] و [[Headers]] و [[URL]]، نفس اللي في المتصفح و Cloudflare Workers و Deno. و [[NextResponse]] من [[next/server]] بيضيف حاجات زي [[NextResponse.redirect]] و [[cookies.set]] على الرد، بس [[Response]] العادي كفاية غالبًا.

الكاش: في Next 14 الـ GET اللي مبيقراش الطلب كان بيتكاش static. من 15 مبقاش. ولو عايزه يتكاش في النموذج القديم: [[export const dynamic = "force-static"]]. ومع Cache Components، الـ GET بيمشي زي الصفحات: بيتعمله prerender لو مبيقراش الطلب ولا داتا مش متكاشة، ولو بيقرا يبقى dynamic. والجزء اللي عايز تكاشه (query الداتابيز مثلًا) تحطه في دالة عليها [[use cache]].

جوه الـ handler تقدر تقرا [[cookies()]] و [[headers()]] من [[next/headers]] وتكتب cookies، وتنادي [[revalidateTag]]. وأي throw بيطلّع 500 (مفيش error.tsx هنا)، فرجّع الـ status الصح بإيدك.

الملفات الخاصة زي [[sitemap.ts]] و [[robots.ts]] و [[opengraph-image.tsx]] هي Route Handlers متظبطة جاهزة (المستوى التالت).

ولو التطبيق هيبقى API كبير فيه jobs و WebSockets و queues، Express أو Fastify منفصل غالبًا أنسب (تاب «Backend بـ Node»، والمقارنة في تاب «بناء مشروع كامل»).`,
            when: "APIs لتطبيق موبايل أو لحد برّه، و webhooks، و RSS و feeds، ورفع ملفات كبيرة أو streaming responses، و proxy لـ API خارجي عشان تخبي المفتاح.",
            mistakes: R`تعمل Route Handler وتناديه من server component بتاعك: نادي الدالة مباشرة. وتعمل route لكل فورم في الموقع بدل Server Actions. و [[request.json()]] على body مش JSON فيرمي والرد 500: لفّه في try أو رجّع 400. وتفتكر إن الـ GET متكاش زي Next 14. وتنسى إن الـ route ده عام زي الـ action بالظبط: auth جوه كل method.`
          },
          lines: [
            R`[[NextRequest]] هو [[Request]] العادي وفوقه [[nextUrl]] و [[cookies]].`,
            R`دالة اسمها [[GET]] = بتستقبل GET على [[/api/products]].`,
            R`الـ query string من [[nextUrl.searchParams]].`,
            "بحث في الداتابيز...",
            "...بالاسم من غير حساسية للحروف (PostgreSQL).",
            "أقصى ٢٠ نتيجة.",
            "قفلة.",
            R`[[Response.json]] بيحط الـ JSON والـ Content-Type.`,
            "قفلة.",
            R`POST على نفس المسار. [[Request]] العادي كفاية هنا.`,
            "مش أدمن؟ 403 بإيدك.",
            R`افحص الـ body بـ Zod ([[ProductInput]] schema معمولة في مكان تاني).`,
            "شكل غلط؟ 400 ومعاه المشاكل.",
            "احفظ.",
            "201 Created.",
            "قفلة.",
            R`ملف تاني لمسار فيه [[id]]. [[RouteContext]] نوع global زي [[PageProps]].`,
            "نفس الفحص.",
            R`[[params]] Promise هنا كمان.`,
            "امسح.",
            "204 من غير body.",
            "قفلة."
          ]
        },
        {
          cmd: "webhook",
          title: "تستقبل webhook من Stripe أو أي خدمة",
          desc: R`الـ webhook طلب POST بتبعته خدمة خارجية لما حاجة تحصل (الدفع نجح، أو الاشتراك اتلغى). مكانه Route Handler، لأنه URL ثابت بتسجله في لوحة الخدمة. أهم خطوة: تتأكد إن الطلب جاي من الخدمة فعلًا بالتوقيع (signature)، والتوقيع بيتحسب على الـ body الخام، فاقراه بـ [[request.text()]] مش [[json()]].

ورد بسرعة (2xx) واعمل الشغل التقيل بعد الرد بـ [[after()]] من [[next/server]]، أو في queue. والخدمات بتعيد الإرسال لو مردتش، فنفس الحدث ممكن يوصلك مرتين: خلي المعالجة idempotent.`,
          example: R`// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { after } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response("invalid signature", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const updated = await db.order.updateMany({
      where: { stripeSessionId: session.id, status: "PENDING" },
      data: { status: "PAID" },
    });
    if (updated.count > 0) after(() => sendReceiptEmail(session.id));
  }
  return new Response("ok");
}`,
          try: R`سطّب Stripe CLI، وشغّل [[stripe listen --forward-to localhost:3000/api/webhooks/stripe]] وحط الـ secret اللي بيطبعه في [[.env.local]]. وبعدين [[stripe trigger checkout.session.completed]] وشوف اللوج. وجرّب تبعت نفس الطلب بـ curl من غير التوقيع: لازم 400.`,
          flag: "script",
          deep: {
            why: R`الـ URL بتاع الـ webhook عام. لو مش بتتحقق من التوقيع، أي حد يبعت [[{"type":"checkout.session.completed"}]] ويعلّم طلبه إنه مدفوع من غير ما يدفع. والخدمات بتعتبر أي رد بطيء أو مش 2xx فشل وبتعيد، فلو بتبعت الإيميل قبل ما ترد، ممكن العميل ياخد ٣ إيميلات.`,
            how: R`التوقيع HMAC: الخدمة بتحسب hash للـ body الخام بسر مشترك، وتبعته في header. انت بتحسب نفس الـ hash وتقارن. أي تغيير في الـ body، حتى مسافة، بيبوّظ المقارنة. عشان كده [[request.text()]]. وفي Route Handlers الـ body مبيتقراش قبلك، فمش محتاج تقفل body parser زي Pages Router.

[[after(fn)]] (stable من Next 15.1) بيسجّل دالة تتنفذ بعد ما الرد يخلص، فالخدمة تاخد الـ 200 فورًا. بس لو الشغل طويل أو محتاج retry، مكانه queue أو worker (تاب «APIs متقدمة» وتاب «بناء مشروع كامل»)، مش جوه الـ request.

الـ idempotency: خزّن [[event.id]] في جدول بـ unique constraint، أو خلي التحديث مشروط بالحالة زي المثال، فالحدث المكرر ميعملش حاجة.

وعلى serverless (Vercel) الـ function ليها مهلة، ولو الـ webhook بيعمل شغل كتير هيتقطع في النص.`,
            when: "الدفع (Stripe و Paymob)، والـ auth providers، و GitHub، والـ CMS لما محتوى يتنشر، وأي خدمة بتقولك «حصل حاجة».",
            mistakes: R`[[await request.json()]] وبعدين تحاول تتحقق من التوقيع. وتحط الـ webhook secret هو هو الـ API key. وتبعت الإيميل وتعمل الشغل كله قبل الرد فالخدمة تعمل timeout وتعيد. وتفتكر إن الحدث بيوصل مرة واحدة وبالترتيب: مش مضمون لا ده ولا ده. وتحط الـ route ده ورا الـ proxy بتاع الـ auth فكل الـ webhooks ترجع redirect للـ login.`
          },
          lines: [
            "مكتبة Stripe.",
            R`[[after]]: شغل يتنفذ بعد ما الرد يتبعت.`,
            "الـ client بالمفتاح السري.",
            "Stripe بيبعت POST.",
            R`الـ body نص خام زي ما وصل بالظبط. لو عملت [[json()]] وبعدين [[JSON.stringify]]، التوقيع مش هيطابق.`,
            "التوقيع في header.",
            "النوع من المكتبة.",
            "جرّب...",
            "...تتحقق من التوقيع بالـ webhook secret (مختلف عن الـ API key)، ولو سليم ترجع الحدث.",
            "لو التوقيع غلط...",
            "...400، ومتعملش أي حاجة.",
            "قفلة.",
            "الدفع خلص.",
            R`الـ session بتاع الدفع. TS عارف نوعه من [[event.type]].`,
            "حدّث الطلب...",
            "...بس لو لسه PENDING. لو الحدث وصل مرتين، التانية مش هتلاقي حاجة (idempotent).",
            "بقى مدفوع.",
            "قفلة.",
            R`الإيميل بعد الرد، ومرة واحدة بس.`,
            "قفلة الـ if.",
            "رد سريع 200، عشان Stripe ميعيدش الإرسال.",
            "قفلة."
          ]
        },
        {
          cmd: "proxy.ts",
          title: "كود بيشتغل قبل كل طلب: proxy (اسمه كان middleware)",
          desc: R`[[proxy.ts]] في جذر المشروع (أو جوه [[src]]) بيتنفذ قبل ما الطلب يوصل للصفحة أو الـ route: تقدر تعمل redirect، أو rewrite لمسار تاني، أو تضيف headers و cookies، أو ترد على طول. و [[matcher]] بيحدد يشتغل على أنهي مسارات.

في Next 16 الملف اتغير اسمه من [[middleware.ts]] لـ [[proxy.ts]] والدالة من [[middleware]] لـ [[proxy]]، وبيشتغل على Node.js بس. [[middleware.ts]] لسه شغال بس deprecated، وهو الطريق الوحيد لو محتاج Edge runtime. والتحويل: [[npx @next/codemod@canary middleware-to-proxy .]].`,
          example: R`// proxy.ts (Next 16) = middleware.ts (Next 15)
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("session");
  if (pathname.startsWith("/dashboard") && !hasSession) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg|webp)$).*)"],
};`,
          try: R`اعمل الملف، وافتح [[/dashboard]] من غير cookie: هتتحول. من DevTools > Application > Cookies ضيف cookie اسمها [[session]] بأي قيمة وافتح تاني: هتدخل! ودي بالظبط الفكرة: الـ proxy مش هو الحماية، الصفحة لازم تتحقق بجد (الفئة الجاية).`,
          flag: "script",
          deep: {
            why: "فيه حاجات عايز تعملها قبل ما أي صفحة تترسم: تحوّل اللي مش داخل، أو تختار اللغة من الـ URL (next-intl)، أو تعمل A/B test، أو تختار الـ tenant من الـ subdomain. لو عملتها في كل صفحة لوحدها هتتكرر وتتنسي.",
            how: R`الـ proxy بيتنفذ قبل الراوتنج، مرة لكل طلب مطابق للـ matcher، بما فيهم طلبات الـ prefetch وطلبات الـ RSC في التنقل. عشان كده لازم يبقى سريع جدًا: مفيش queries تقيلة، ولا fetch بطيء.

[[NextResponse.next()]]: كمّل. [[redirect(url)]]: رد 307 للمتصفح. [[rewrite(url)]]: اعرض محتوى مسار تاني والـ URL في المتصفح زي ما هو. وتقدر تعدّل headers الطلب اللي رايح للصفحة: [[NextResponse.next({ request: { headers } })]].

الاسم اتغير في Next 16 لأن «middleware» كانت بتخلي الناس تفتكره زي middleware بتاع Express (بيتحط قبل route معيّن وبيحميه). هو في الحقيقة طبقة قدام التطبيق كله على الشبكة، زي reverse proxy صغير. وبقى Node.js runtime ثابت، فتقدر تستخدم مكتبات Node، بس [[runtime]] مينفعش يتكتب في الـ config بتاعه.

وفي Next 15: الملف [[middleware.ts]]، و Edge runtime افتراضي (و Node بقى stable من 15.5 بـ [[runtime: "nodejs"]] في الـ config).

ليه مش كفاية للحماية؟ أولًا الـ matcher ممكن يفوّت مسارات بطرق مش متوقعة. وثانيًا الثغرة CVE-2025-29927 (مارس ٢٠٢٥): header اسمه [[x-middleware-subrequest]] كان بيخلّي Next يتخطى الـ middleware خالص في النسخ المستضافة ذاتيًا، فأي موقع كانت حمايته في الـ middleware بس اتكشف. الحماية الحقيقية جنب الداتا (الفئة الجاية).`,
            when: R`redirects حسب حالة الدخول (فحص متفائل)، والـ i18n routing، والـ rewrites (A/B test، و multi-tenant بالـ subdomain)، و headers زي CSP nonce. والـ redirects الثابتة ([[/old]] لـ [[/new]]) مكانها [[redirects()]] في [[next.config.ts]] مش الـ proxy.`,
            mistakes: R`تعمل query للداتابيز في الـ proxy مع كل طلب. وتنسى الـ matcher فالـ proxy يشتغل على كل صورة و CSS. وتفتكر إن الـ proxy لوحده بيحمي الـ dashboard. وتغيّر اسم الملف لـ [[proxy.ts]] وتسيب الدالة اسمها [[middleware]]: الـ codemod بيغيّر الاتنين، فاستخدمه. وتحط [[runtime: "edge"]] في proxy.ts فيطلع خطأ.`
          },
          lines: [
            R`[[NextResponse]] فيه redirect و rewrite و next.`,
            R`الدالة لازم اسمها [[proxy]] (أو export default). في Next 15 كانت [[middleware]].`,
            "المسار المطلوب.",
            "مجرد وجود الـ cookie. مفيش فك تشفير ولا داتابيز هنا: ده فحص «متفائل» سريع بس.",
            "داخل على dashboard من غير session...",
            "...حوّله للـ login...",
            "...ومعاه المكان اللي كان رايحه، عشان يرجع له بعد الدخول.",
            "رد بالتحويل، والصفحة نفسها مش هتترسم.",
            "قفلة.",
            "داخل ومعاه session على صفحة الـ login؟",
            "ودّيه الـ dashboard على طول.",
            "قفلة.",
            "كمّل الطلب عادي.",
            "قفلة.",
            R`[[config]] لازم يبقى ثابت مكتوب (Next بيقراه وقت الـ build).`,
            "اشتغل على كل حاجة ما عدا الـ API والملفات الثابتة والصور. من غيره الـ proxy بيشتغل على كل طلب CSS و JS.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "Auth",
      l: 2,
      n: "session في cookie، والحماية جنب الداتا مش في الـ proxy، و Next كـ BFF قدام API منفصل",
      items: [
        {
          cmd: "session cookie",
          title: "تسجيل الدخول: session في cookie من السيرفر",
          desc: R`بعد ما تتأكد من الإيميل والباسورد في Server Action، اعمل session وحطها في cookie [[httpOnly]] (الـ JS في المتصفح ميقدرش يقراها) و [[secure]] و [[sameSite: "lax"]]. الـ session يا توكن موقّع (JWT بمكتبة [[jose]]) فيه الـ user id، يا id عشوائي لصف في جدول sessions.

[[cookies()]] من [[next/headers]] (async من Next 15) بتقرا في أي server component، بس الكتابة ([[set]] و [[delete]]) في Server Actions و Route Handlers و proxy بس. وفيه مكتبات بتعمل كل ده: Auth.js و Better Auth و Clerk و Supabase Auth، بس لازم تفهم اللي بيحصل تحت.`,
          example: R`// app/actions/auth.ts
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
const key = new TextEncoder().encode(process.env.SESSION_SECRET);
export async function login(_prev: { error?: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").toLowerCase();
  const user = await db.user.findUnique({ where: { email } });
  const ok = user && (await bcrypt.compare(String(formData.get("password") ?? ""), user.passwordHash));
  if (!user || !ok) return { error: "الإيميل أو الباسورد غلط" };
  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key);
  (await cookies()).set("session", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  redirect("/dashboard");
}
export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}`,
          try: R`اعمل الـ login بمستخدم ثابت (من غير داتابيز)، وادخل، وافتح DevTools > Application > Cookies: هتلاقي [[session]] وعليها HttpOnly. اكتب [[document.cookie]] في الـ console: مش هتلاقيها. وخد التوكن والصقه في jwt.io: هتقدر تقرا الـ payload (موقّع مش مشفّر، فمتحطش فيه أسرار).`,
          flag: "script",
          deep: {
            why: "التوكن في localStorage أي script في الصفحة يقدر يقراه (XSS، أو مكتبة npm مخترقة). والـ cookie الـ httpOnly المتصفح بيبعتها لوحده مع كل طلب، والـ JS ميقدرش يلمسها. وفي Next الـ server components بتقرا الـ cookie مباشرة، فالصفحة بتترسم وهي عارفة المستخدم من أول لحظة، من غير وميض «مش داخل» وبعدين «داخل».",
            how: R`فيه نوعين sessions. stateless: JWT موقّع فيه الـ user id والدور والمدة. مفيش داتابيز مع كل طلب، بس مينفعش تلغيه قبل ما يخلص (لو غيّرت الدور أو عملت logout من كل الأجهزة). و database sessions: الـ cookie فيها id عشوائي، والبيانات في جدول. كل طلب query، بس تقدر تمسح الـ session فورًا. وممكن تجمع: JWT قصير والـ DAL يراجع الداتابيز في العمليات المهمة.

الكتابة في الـ cookies مسموحة بس في Server Actions و Route Handlers و proxy، لأن الـ server component بيترسم وممكن يكون الـ response بدأ يتبعت (streaming) والـ headers خلاص اتبعتت. عشان كده refresh للتوكن مكانه proxy أو Route Handler، مش صفحة.

[[sameSite: "lax"]] بيمنع المتصفح يبعت الـ cookie في POST جاي من موقع تاني. ومع حماية Next للـ Server Actions (بيقارن الـ Origin)، ده بيقفل CSRF.

المكتبات: Auth.js (NextAuth v5) مشهورة ومرنة مع OAuth، و Better Auth أحدث و TypeScript-first وفيه plugins كتير، و Clerk و Supabase Auth خدمات جاهزة بواجهات. كلهم بيعملوا نفس الفكرة: cookie، وطريقة تقرا بيها الـ session على السيرفر. والـ hashing وقواعد الباسورد في تاب «الأمان».`,
            when: "أي تطبيق فيه login وواجهته Next. ولو فيه API منفصل بيعمل الـ auth، Next بيخزّن التوكن بتاعه في cookie httpOnly برضه (درس BFF).",
            mistakes: R`تحط التوكن في localStorage وتبعته من المتصفح. و cookie من غير [[httpOnly]]. و [[SESSION_SECRET]] قصير أو مكتوب في الكود. وتحط بيانات حساسة في الـ JWT payload (هو base64 مش تشفير). وتحاول [[cookies().set]] في server component فيطلع خطأ. وتنسى [[await]] قبل [[cookies()]] في Next 15 و 16.`
          },
          lines: [
            "Server Actions.",
            R`[[cookies]]: async من Next 15.`,
            "التحويل بعد الدخول.",
            R`[[jose]] بتشتغل في أي runtime (Node و Edge)، عكس [[jsonwebtoken]].`,
            "مقارنة الباسورد بالـ hash.",
            R`السر من البيئة كـ bytes. لازم ٣٢ حرف عشوائي على الأقل ([[openssl rand -base64 32]]).`,
            R`بيتنادى من [[useActionState]]، فبياخد الـ state اللي فاتت الأول.`,
            "الإيميل بحروف صغيرة زي ما اتخزن.",
            "هات المستخدم.",
            "قارن الباسورد لو المستخدم موجود.",
            "نفس الرسالة للحالتين: متقولش «الإيميل مش موجود» عشان محدش يعرف مين متسجل.",
            "اعمل توكن فيه الـ id والدور...",
            "...بخوارزمية HS256...",
            "...بيخلص بعد أسبوع...",
            "...وموقّع بالسر.",
            R`حط الـ cookie: [[httpOnly]] ضد XSS، و [[secure]] على HTTPS بس، و [[lax]] ضد أغلب CSRF، وعمرها أسبوع زي التوكن.`,
            R`روح للـ dashboard. [[redirect]] برّه أي try.`,
            "قفلة.",
            "الخروج.",
            "امسح الـ cookie.",
            "روح للـ login.",
            "قفلة."
          ]
        },
        {
          cmd: "DAL",
          title: "تحمي الصفحات والداتا فين بالظبط؟ (Data Access Layer)",
          desc: R`الـ proxy بيعمل فحص سريع ومتفائل، والـ layout ممكن ميترسمش تاني. الحماية الحقيقية تبقى جنب الداتا: ملف (أو فولدر) [[lib/dal.ts]] عليه [[server-only]]، فيه [[verifySession()]] بتتحقق من الـ cookie بجد، وكل query بتجيب داتا خاصة بتناديها الأول وتفلتر بالـ userId.

و [[verifySession]] ملفوفة في [[cache()]] من React، فلو الصفحة و ٣ كومبوننتات نادوها في نفس الطلب، بتتنفذ مرة واحدة.`,
          example: R`// lib/dal.ts
import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { jwtVerify } from "jose";
const key = new TextEncoder().encode(process.env.SESSION_SECRET);
export const verifySession = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) redirect("/login");
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return { userId: String(payload.userId), role: String(payload.role) };
  } catch {
    redirect("/login");
  }
});
export async function getMyOrders() {
  const { userId } = await verifySession();
  return db.order.findMany({ where: { userId }, select: { id: true, status: true, totalCents: true } });
}
export async function requireAdmin() {
  const session = await verifySession();
  if (session.role !== "ADMIN") notFound();
  return session;
}`,
          try: R`حط [[console.log("verify")]] جوه [[verifySession]]، ونادها من الصفحة ومن الـ layout ومن كومبوننت: هتطبع مرة واحدة في الطلب. وبعدين شيل [[cache]] وعدّ. وجرّب تفتح صفحة الـ dashboard بـ cookie مزوّرة (اللي عدّت من الـ proxy في درس [[proxy.ts]]): المرة دي هتتحول للـ login.`,
          flag: "script",
          deep: {
            why: "لو الحماية في مكان واحد بعيد عن الداتا (الـ proxy أو الـ layout)، أي مسار تاني للداتا بيعدّي من غيرها: Server Action، أو Route Handler، أو صفحة جديدة حد نسي يحطها تحت الـ layout. لما كل query خاص بيسأل «مين؟» بنفسه، مستحيل تنسى.",
            how: R`الفكرة من وثائق Next نفسها: طبقة واحدة هي اللي بتكلّم الداتابيز للداتا الخاصة، وكل دالة فيها بتعمل ٣ حاجات: تتحقق من الـ session، وتتحقق من الصلاحية على الحاجة دي بالذات، وترجّع DTO (الأعمدة اللي الواجهة محتاجاها بس، مش الـ row كله). والصفحات والـ actions والـ route handlers بينادوا الـ DAL، ومبيلمسوش [[db]] مباشرة.

[[cache()]] من React بيعمل memoization طول الطلب الواحد بس (per request). ده مش كاش بين المستخدمين، فآمن تمامًا لبيانات المستخدم. عكس [[use cache]] اللي مشترك.

ليه الـ layout مش كفاية؟ Next بيعمل partial rendering: في التنقل بين صفحتين تحت نفس الـ layout، الـ layout مبيتنفذش تاني. ولو الـ session انتهت، الصفحة الجديدة هتترسم من غير ما حد يتحقق. وكمان الصفحة ممكن تتطلب لوحدها (RSC request) من غير الـ layout.

الـ proxy مكمّل: redirect سريع قبل ما أي حاجة تترسم (تجربة أحسن)، وبيقرا الـ cookie بس من غير داتابيز. والـ DAL هو الحماية.

وفيه [[forbidden()]] و [[unauthorized()]] من [[next/navigation]] بيرجّعوا 403 و 401 بصفحات خاصة، بس لسه تجريبيين ومحتاجين [[experimental.authInterrupts]]. لحد ما يبقوا stable، [[notFound()]] أو [[redirect]] كفاية.`,
            when: "أي مشروع فيه داتا خاصة بالمستخدم. ابدأ بالـ DAL من أول يوم: نقله بعدين معناه تلف على كل query في المشروع.",
            mistakes: R`الـ auth في الـ layout بس، أو في الـ proxy بس. و [[db.order.findUnique({ where: { id } })]] من غير userId، فأي حد يغيّر الـ id في الـ URL يشوف طلبات غيره (IDOR). وترجّع الـ user row كله للكومبوننت بالـ passwordHash. و [[use cache]] على دالة بتقرا الـ session. وتنسى [[server-only]] فحد يعمل import للـ DAL من client component.`
          },
          lines: [
            "لو client component عمله import بالغلط، الـ build يقع.",
            R`[[cache]] من React: نفس النتيجة طول الطلب الواحد.`,
            "الـ cookies.",
            "redirect و notFound.",
            "التحقق من التوقيع.",
            "نفس السر اللي اتوقّع بيه.",
            R`الدالة كلها جوه [[cache]]، فأي عدد نداءات في نفس الطلب = تحقق واحد.`,
            "اقرا الـ cookie.",
            "مفيش؟ روح login.",
            "جرّب...",
            R`...تتحقق من التوقيع والمدة. [[algorithms]] بتقفل هجمات تغيير الخوارزمية.`,
            "رجّع المستخدم.",
            "توكن مزوّر أو خلص...",
            "...روح login.",
            "قفلة.",
            R`قفلة الـ [[cache]].`,
            "أي داتا خاصة بتعدّي من هنا.",
            "المستخدم الأول.",
            "الفلتر بالـ userId جوه الـ query، والأعمدة المطلوبة بس (DTO).",
            "قفلة.",
            "للصفحات والـ actions بتاعة الأدمن.",
            "المستخدم.",
            "مش أدمن؟ 404 كأن الصفحة مش موجودة أصلًا.",
            "رجّعه عشان تستخدم الـ id.",
            "قفلة."
          ]
        },
        {
          cmd: "BFF",
          title: "Next قدام API منفصل: التوكن يفضل على السيرفر (BFF)",
          desc: R`لو الـ backend منفصل (Express أو FastAPI)، ممكن تخلي Next «Backend For Frontend»: الـ server components والـ actions هما اللي بيكلّموا الـ API، والتوكن بتاع الـ API متخزن في cookie [[httpOnly]] عند Next، وعمره ما بيوصل للـ JavaScript في المتصفح.

الطلب بيبقى: المتصفح ← Next (معاه الـ cookie) ← الـ API (بـ [[Authorization: Bearer]]). والـ client components اللي محتاجة داتا بتكلّم Server Action أو Route Handler في Next، مش الـ API مباشرة.`,
          example: R`// lib/api.ts
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) redirect("/login");
  const res = await fetch($__bt$__{process.env.API_URL}$__{path}$__bt, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: $__btBearer $__{token}$__bt },
    cache: "no-store",
  });
  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error($__btAPI $__{res.status} $__{path}$__bt);
  return (await res.json()) as T;
}
// app/orders/page.tsx
const orders = await api<Order[]>("/orders");
// app/actions/orders.ts ("use server")
await api("/orders/" + id + "/cancel", { method: "POST" });`,
          try: R`لو عندك API من تاب «Backend بـ Node»، اعمل login action بيكلّمه ويحط الـ access token في cookie، وبعدين صفحة بتعرض الطلبات بـ [[api()]]. افتح DevTools > Network: مش هتلاقي أي طلب للـ API من المتصفح، ولا التوكن في أي مكان يقدر JS يوصله.`,
          flag: "script",
          deep: {
            why: "لما المتصفح بيكلّم الـ API مباشرة، التوكن لازم يبقى في JS (localStorage أو memory)، وده معرّض لـ XSS، ولازم CORS، والـ server components مش هتقدر تستخدمه. الـ BFF بيحل الاتنين: التوكن على السيرفر، والصفحات بتترسم بالداتا من أول لحظة.",
            how: R`الـ login: Server Action بيبعت الإيميل والباسورد للـ API، ياخد access و refresh tokens، ويحطهم في cookies [[httpOnly]]. من هنا المتصفح مش شايف غير cookie بتاعة Next.

المشكلة الصعبة: الـ refresh. الـ server component يقدر يقرا الـ cookie بس ميقدرش يكتبها. فلو الـ access token خلص وانت بترسم صفحة، مش هتقدر تحط الجديد. الحلول: الـ proxy يشيك على مدة التوكن (لو قربت تخلص يعمل refresh ويحط الـ cookie الجديدة في الرد) قبل ما الصفحة تترسم، أو Route Handler للـ refresh والـ client يناديه، أو access token عمره أطول شوية.

الـ client components: لو محتاجة داتا بتتغير (بحث live)، تنادي Server Action أو Route Handler في Next، وده بيعمل [[api()]]. متخليش الـ client يعرف URL الـ API.

والتكلفة: رحلة زيادة (المتصفح ← Next ← API)، فخلي Next والـ API في نفس الـ datacenter أو الشبكة. والـ API نفسه لسه لازم يتحقق من التوكن والصلاحيات: الـ BFF مش بديل عن الحماية في الـ API. وتفاصيل التصميم ده في تاب «بناء مشروع كامل».`,
            when: "Next واجهة لـ API منفصل (Express أو FastAPI أو Laravel) عندك أو عند فريق تاني، وعايز SSR وتوكن مش مكشوف. لو Next هو الـ backend نفسه، مش محتاج ده: الـ DAL كفاية.",
            mistakes: R`تحط الـ access token في [[NEXT_PUBLIC_]] أو في localStorage «عشان الـ client components». و [[cache: "force-cache"]] أو [[use cache]] على طلب فيه توكن مستخدم، فالداتا تتشارك. وتحاول تعمل refresh للتوكن جوه server component وتكتب cookie فيطلع خطأ. وتعمل proxy لكل الـ API بـ rewrites من غير ما تضيف التوكن، فمفيش فرق عن إن المتصفح يكلّمه مباشرة.`
          },
          lines: [
            "على السيرفر بس: فيه التوكن.",
            "الـ cookies.",
            "التحويل.",
            R`helper واحد لكل طلبات الـ API، و [[T]] نوع الرد.`,
            R`التوكن من cookie [[httpOnly]] اتحطت وقت الـ login.`,
            "مفيش؟ login.",
            R`عنوان الـ API من متغير بيئة سيرفر (من غير [[NEXT_PUBLIC_]]): المتصفح مش محتاج يعرفه أصلًا.`,
            "الخيارات اللي اتبعتت.",
            "التوكن في الـ header من السيرفر.",
            "داتا المستخدم متتكاشش.",
            "قفلة.",
            "التوكن خلص؟ login (أو refresh، في الشرح).",
            "أي خطأ تاني يروح لـ error.tsx.",
            R`الـ JSON. الـ [[as T]] وعد مش فحص: لو الـ API مش بتاعك افحصه بـ Zod.`,
            "قفلة.",
            "server component بيجيب الداتا مباشرة.",
            "Server Action بيعمل تعديل: المتصفح بينادي الـ action، والـ action بيكلّم الـ API."
          ]
        }
      ]
    },
    {
      t: "مكتبات الـ auth",
      l: 2,
      n: "Better Auth مع Prisma: تسجيل ودخول، و session في السيرفر، و Google و GitHub، وأدوار وصلاحيات",
      items: [
        {
          cmd: "better-auth",
          title: "تركّب Better Auth مع Prisma في مشروع Next",
          desc: R`الفئة اللي فاتت عملت الـ auth بإيدك عشان تفهمه. في الشغل الحقيقي أغلب مشاريع Next في ٢٠٢٦ بتستخدم مكتبة. التاب ده بيستخدم Better Auth: مكتبة TypeScript مفتوحة المصدر بتتخزن في داتابيزك انت، وفيها plugins لكل حاجة (أدوار، و 2FA، و organizations). وفريقها هو اللي ماسك Auth.js (NextAuth) من سبتمبر ٢٠٢٥، وهم نفسهم بينصحوا بـ Better Auth لأي مشروع جديد. و Auth.js v5 لسه beta على npm (النسخة المستقرة v4).

التركيب ٤ خطوات: [[npm i better-auth]]، ومتغيرين في [[.env]]: [[BETTER_AUTH_SECRET]] (من [[openssl rand -base64 32]]) و [[BETTER_AUTH_URL]] (عنوان الموقع). وبعدين [[lib/auth.ts]] فيه الإعدادات، و [[npx auth@latest generate]] بيضيف الجداول لـ [[schema.prisma]]، وبعده [[npx prisma migrate dev]]. وآخر حاجة route handler واحد بيستقبل كل طلبات الـ auth على [[/api/auth/*]].`,
          example: R`// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  plugins: [nextCookies()],
});
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
export const { GET, POST } = toNextJsHandler(auth);
// lib/auth-client.ts (للـ client components)
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();`,
          try: R`في مشروع الـ lab (مع Prisma من تاب «SQL و Prisma») ركّب المكتبة واعمل الملفات التلاتة، وشغّل [[npx auth@latest generate]] وبص على [[schema.prisma]]: إيه الـ models اللي اتضافت؟ وبعد الـ migrate اعمل حساب بـ curl: [[curl -X POST localhost:3000/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Sara","email":"sara@example.com","password":"long-password-1"}']]. وافتح [[npx prisma studio]] وشوف الباسورد اتخزن فين. وجرّب تاني بباسورد ٥ حروف.`,
          flag: "script",
          deep: {
            why: "الـ auth من الصفر فيه حاجات كتير لازم تتعمل صح: hashing، و sessions بتتلغي، و OAuth بـ state و PKCE، وربط الحسابات، وتأكيد الإيميل، وإعادة تعيين الباسورد، و rate limit على الدخول. أي غلطة في أي واحدة منهم ثغرة. المكتبة بتدّيك الحاجات دي متجرّبة على آلاف المشاريع، وانت بتركّز على الصلاحيات والداتا بتاعتك.",
            how: R`[[betterAuth()]] بيعمل object واحد فيه كل حاجة: [[auth.handler]] (اللي [[toNextJsHandler]] بيلفه لـ GET و POST) و [[auth.api]] (نفس الـ endpoints كدوال تناديها من السيرفر مباشرة).

الجداول: [[npx auth@latest generate]] بيقرا [[lib/auth.ts]] ويكتب ٤ models في الـ schema: [[User]] و [[Session]] و [[Account]] و [[Verification]]. الباسورد مش في جدول [[User]]: بيتخزن في [[Account]] على إنه حساب [[providerId: "credential"]]، و Google و GitHub حسابات تانية لنفس المستخدم. وده اللي بيخلي ربط الحسابات سهل. والـ hash افتراضيًا scrypt. ولو ضفت plugin بيحتاج أعمدة (زي admin)، شغّل generate تاني و migrate. (الـ CLI محتاج Prisma client متولّد، فلو بيقول module مش موجود اعمل [[npx prisma generate]] الأول.)

الـ session: database session في جدول [[Session]]، و cookie اسمها [[better-auth.session_token]] (و [[__Secure-]] قبلها على HTTPS) عليها HttpOnly و SameSite=Lax. بتعيش ٧ أيام افتراضيًا وبتتجدد مع الاستخدام. يعني نفس اللي عملته بإيدك في درس [[session cookie]]، بس بجدول تقدر تمسح منه.

[[nextCookies()]]: لما تنادي [[auth.api.signInEmail]] من Server Action، المكتبة بترجّع [[Set-Cookie]] في الرد الداخلي، والـ plugin ده بيحطها في [[cookies()]] بتاعة Next. من غيره الدخول بينجح والـ cookie متتحطش. ولازم يبقى آخر plugin في الـ array.

وفيه حماية CSRF لوحدها: أي POST معاه cookies لازم يبقى [[Origin]] بتاعه هو [[BETTER_AUTH_URL]] أو في [[trustedOrigins]]، وإلا [[INVALID_ORIGIN]].`,
            when: R`أي مشروع Next الـ backend بتاعه Next نفسه وعايز الداتا في داتابيزك. لو عايز واجهات جاهزة وإدارة مستخدمين من غير ما تشيل هم، خدمة زي Clerk (بتدفع مع عدد المستخدمين). ولو شغال على Supabase أصلًا، Supabase Auth. ولو الـ auth في API منفصل، درس [[BFF]] مش ده.`,
            mistakes: R`تنسى [[BETTER_AUTH_SECRET]] في الإنتاج أو تحطه قصير. و [[BETTER_AUTH_URL]] غلط (http بدل https، أو localhost على السيرفر) فكل الطلبات ترجع [[INVALID_ORIGIN]] و OAuth يرجع على عنوان غلط. وتعدّل جداول الـ auth بإيدك بدل generate. وتنسى [[nextCookies()]] أو تحطه قبل plugins تانية فالدخول من Server Action «بينجح» والمستخدم مش داخل. وتفتكر إن تركيب المكتبة كفاية: الصلاحيات والفلترة بالـ userId لسه شغلك (الدرسين الجايين). وفي الانترفيو: «ليه مكتبة؟» الإجابة الكويسة مش «أسهل»، هي «الحاجات الصعبة (OAuth و sessions بتتلغي وربط الحسابات) متجرّبة، وانا فاهم اللي تحت».`
          },
          lines: [
            R`[[betterAuth]] بيعمل الـ instance اللي فيه كل حاجة.`,
            "الـ adapter اللي بيخلي المكتبة تكتب وتقرا بـ Prisma.",
            R`plugin بيخلي الـ cookies تتحط لما تنادي المكتبة من Server Action.`,
            R`نفس Prisma client بتاع المشروع ([[lib/db.ts]]). Better Auth مش بيعمل اتصال لوحده.`,
            R`[[auth]] ده اللي هتستورده في كل مكان على السيرفر.`,
            "الداتابيز: Prisma على PostgreSQL.",
            "دخول بالإيميل والباسورد، وأقل طول ١٠ (الافتراضي ٨).",
            "آخر plugin في الليستة لازم يبقى ده.",
            "قفلة.",
            "الـ instance.",
            "بيحوّل الـ handler لـ route handler بتاع Next.",
            R`GET و POST لكل المسارات تحت [[/api/auth]]: sign-up و sign-in و get-session و callback بتاع OAuth وغيرهم.`,
            R`الـ client بتاع React (فيه [[useSession]] و [[signIn]] و [[signOut]]).`,
            "بيكلّم نفس الموقع افتراضيًا، فمش محتاج URL."
          ],
          sol: R`بعد generate هتلاقي ٤ models اتضافوا: [[User]] (الاسم والإيميل و [[emailVerified]])، و [[Session]] (فيها [[token]] و [[expiresAt]] و [[ipAddress]] و [[userAgent]])، و [[Account]]، و [[Verification]]، وكل واحد عليه [[@@map]] لاسم جدول صغير زي [[user]].

الـ curl الأول بيرجّع JSON فيه [[token]] و [[user]] ([[emailVerified: false]])، لأن التسجيل بيعمل دخول لوحده. وفي Prisma Studio: صف في [[user]]، وصف في [[session]]، والباسورد مش في [[user]] خالص: هتلاقيه في [[account]] في عمود [[password]] بشكل [[salt:hash]] طويل، والـ [[providerId]] بتاعه [[credential]].

الباسورد القصير بيرجّع [[{"message":"Password too short","code":"PASSWORD_TOO_SHORT"}]]. ولو نفس الإيميل تاني: [[USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL]].

لو generate قال [[Cannot find module]] لـ Prisma client: اعمل [[npx prisma generate]] الأول. ولو الـ curl رجّع [[INVALID_ORIGIN]] أو [[MISSING_OR_NULL_ORIGIN]]: انت باعت cookie أو Origin مش مطابق لـ [[BETTER_AUTH_URL]]، وده الحماية شغالة صح.`,
          solCode: R`npm i better-auth
echo "BETTER_AUTH_SECRET=$(openssl rand -base64 32)" >> .env
echo "BETTER_AUTH_URL=http://localhost:3000" >> .env
npx prisma generate
npx auth@latest generate
npx prisma migrate dev --name auth
curl -X POST localhost:3000/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Sara","email":"sara@example.com","password":"long-password-1"}'
# {"token":"...","user":{"name":"Sara","email":"sara@example.com","emailVerified":false,...}}
curl -X POST localhost:3000/api/auth/sign-up/email -H "Content-Type: application/json" -d '{"name":"Sara","email":"sara2@example.com","password":"short"}'
# {"message":"Password too short","code":"PASSWORD_TOO_SHORT"}`
        },
        {
          cmd: "signUpEmail و signInEmail",
          title: "تسجيل ودخول وخروج من Server Actions بالمكتبة",
          desc: R`[[auth.api]] فيه كل endpoint كدالة: [[signUpEmail]] و [[signInEmail]] و [[signOut]]. بتناديهم من Server Action وتبعتلهم [[headers: await headers()]] (عشان الـ IP والـ cookies)، و [[nextCookies()]] بيحط الـ cookie. ولو حصل خطأ (باسورد غلط، أو إيميل متسجل) بيرموا [[APIError]] من [[better-auth/api]] فيه [[status]] و [[body.code]].

والفورم نفسها زي فئة Server Actions بالظبط: [[useActionState]] والـ action بترجّع [[{ error }]]. وفيه طريق تاني من المتصفح: [[authClient.signIn.email()]]، بس الـ Server Action بيشتغل من غير JavaScript وبيخلي الـ redirect على السيرفر.`,
          example: R`// app/actions/auth.ts
"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";
type State = { error?: string };
export async function signUp(_prev: State, formData: FormData): Promise<State> {
  try {
    await auth.api.signUpEmail({
      body: { name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") },
      headers: await headers(),
    });
  } catch (e) {
    if (!(e instanceof APIError)) throw e;
    return { error: e.body?.code === "PASSWORD_TOO_SHORT" ? "الباسورد لازم ١٠ حروف على الأقل" : "مش قادرين نعمل الحساب ده" };
  }
  redirect("/dashboard");
}
export async function signIn(_prev: State, formData: FormData): Promise<State> {
  try {
    await auth.api.signInEmail({
      body: { email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") },
      headers: await headers(),
    });
  } catch (e) {
    if (e instanceof APIError) return { error: "الإيميل أو الباسورد غلط" };
    throw e;
  }
  redirect("/dashboard");
}
export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}`,
          try: R`اعمل صفحة [[/login]] فيها فورم بـ [[useActionState(signIn, {})]] وزرار خروج بيستخدم [[signOut]]. ادخل وافتح DevTools > Application > Cookies: إيه اسم الـ cookie وعليها إيه؟ وبعدين علّق [[nextCookies()]] في [[lib/auth.ts]] وجرّب تدخل تاني. وآخر حاجة: اعمل خروج وبص على جدول [[session]] في Prisma Studio.`,
          flag: "script",
          deep: {
            why: R`الـ Server Action بيخلي فورم الدخول تشتغل حتى قبل ما الـ JS يحمّل، والـ redirect بيحصل على السيرفر، والأخطاء بترجع بنفس شكل أي فورم تانية في التطبيق. والمكتبة بتعمل الجزء الحساس: مقارنة الـ hash في وقت ثابت، وإنشاء session في الداتابيز، و cookie بالخيارات الصح.`,
            how: R`[[auth.api.signInEmail({ body, headers })]] بيعمل نفس اللي بيعمله [[POST /api/auth/sign-in/email]]، بس من غير HTTP: بيدوّر على المستخدم، ويقارن الباسورد، ويعمل صف في [[session]]، ويرجّع [[Set-Cookie]]. و [[nextCookies()]] عبارة عن hook بعد كل endpoint: لو فيه [[Set-Cookie]] بيكتبها بـ [[cookies().set]] بتاع Next، وده مسموح لأننا جوه Server Action.

[[headers]]: المكتبة محتاجاها عشان تعرف الـ IP والـ User-Agent (بيتخزنوا في الـ session) وعشان الـ rate limit. وفي [[signOut]] إجباري، لأنه بيقرا الـ cookie من الـ headers عشان يعرف أنهي session يمسح.

الأخطاء: [[APIError]] فيه [[status]] كنص ([[UNAUTHORIZED]] أو [[UNPROCESSABLE_ENTITY]]) و [[body]] فيه [[message]] و [[code]]. المكتبة نفسها بترجّع رسالة واحدة للإيميل الغلط والباسورد الغلط ([[INVALID_EMAIL_OR_PASSWORD]])، فحافظ على ده في رسالتك.

[[redirect]] برّه الـ try، لأنه بيرمي exception خاص، ولو جوه try هيتمسك كأنه خطأ. نفس القاعدة من فئة Server Actions.

والتسجيل بيعمل دخول لوحده ([[autoSignIn]] افتراضيًا true). لو عايز تأكيد إيميل قبل الدخول: [[emailAndPassword.requireEmailVerification]] مع [[emailVerification.sendVerificationEmail]] (تاب «بناء مشروع كامل» فيه تصميم الإيميلات دي).`,
            when: R`فورم التسجيل والدخول في أي تطبيق Next. استخدم [[authClient.signIn.email]] لو الفورم جوه client component معقدة (خطوات أو modal) ومحتاج [[onSuccess]] و [[onError]] في المتصفح.`,
            mistakes: R`[[redirect("/dashboard")]] جوه الـ try فيتمسك وترجع «الإيميل أو الباسورد غلط» مع إن الدخول نجح. وتنسى [[headers]] في [[signOut]] فالخروج مبيعملش حاجة. وتطبع [[e.message]] للمستخدم كما هو. وتقول «الإيميل ده مش متسجل» في الدخول فحد يعرف مين عنده حساب. ونسيان [[nextCookies()]] (أشهر سؤال في الـ issues: «الدخول نجح بس الـ session فاضية»). وتعمل rate limit لوحدك وتنسى إن المكتبة عندها واحد شغال افتراضيًا في الإنتاج بس.`
          },
          lines: [
            "ملف Server Actions.",
            R`[[headers()]] عشان نبعت الطلب للمكتبة.`,
            "التحويل بعد النجاح.",
            R`نوع الخطأ اللي المكتبة بترميه.`,
            R`الـ instance من [[lib/auth.ts]].`,
            R`الـ state اللي بترجع لـ [[useActionState]].`,
            "التسجيل: بياخد الـ state اللي فاتت والفورم، وبيرجّع state جديدة.",
            "جرّب...",
            R`[[signUpEmail]]: نفس [[POST /api/auth/sign-up/email]] من غير HTTP.`,
            R`الاسم والإيميل والباسورد من الفورم، و [[?? ""]] عشان [[null]] ميبقاش "null".`,
            "الـ headers: الـ IP والـ User-Agent بيتخزنوا مع الـ session.",
            "قفلة الطلب.",
            "لو رمى...",
            "أي خطأ مش من المكتبة (الداتابيز وقعت مثلًا) يروح لـ error.tsx.",
            R`خطأ معروف: رسالة واضحة للباسورد القصير، ورسالة عامة لأي حاجة تانية.`,
            "قفلة.",
            R`نجح: الـ cookie اتحطت بـ [[nextCookies]]، فحوّل. برّه الـ try.`,
            "قفلة.",
            "الدخول بنفس الشكل.",
            "جرّب...",
            R`[[signInEmail]]: بيقارن الباسورد ويعمل session.`,
            "الإيميل والباسورد.",
            "الـ headers.",
            "قفلة.",
            "لو رمى...",
            "رسالة واحدة للإيميل الغلط والباسورد الغلط.",
            "غير كده ارمي.",
            "قفلة.",
            "داخل.",
            "قفلة.",
            "الخروج.",
            R`بيمسح الـ session من الداتابيز والـ cookie. الـ headers إجبارية عشان يعرف أنهي session.`,
            "روح الـ login.",
            "قفلة."
          ],
          sol: R`بعد الدخول هتلاقي cookie اسمها [[better-auth.session_token]] (على localhost من غير [[__Secure-]])، عليها HttpOnly و SameSite=Lax وعمرها ٧ أيام. قيمتها token ونقطة وتوقيع، مش JWT تقدر تقراه.

لما تعلّق [[nextCookies()]]: الـ action بيعدّي من غير خطأ، والـ redirect يحصل، بس الـ dashboard يرجّعك للـ login، لأن الـ Set-Cookie فضل جوه نتيجة الدالة ومحدش حطه في الرد. ودي بالظبط أشهر مشكلة.

بعد الخروج: الصف بتاع الـ session اتمسح من جدول [[session]] (أو قل عددهم واحد)، والـ cookie اختفت. ولو نسخت قيمة الـ cookie القديمة وحطيتها بإيدك، [[getSession]] هيرجّع [[null]]، لأن الـ session مش موجودة في الداتابيز. ده الفرق عن الـ JWT اللي في درس [[session cookie]]: هناك التوكن القديم كان هيفضل صالح لحد ما يخلص.

الغلط الشائع: تحط [[redirect]] جوه الـ try فتشوف «الإيميل أو الباسورد غلط» مع إن الـ cookie اتحطت.`,
          solCode: R`// app/login/page.tsx
"use client";
import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";
export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, {});
  return (
    <form action={action} className="grid max-w-sm gap-3">
      <input name="email" type="email" autoComplete="email" required />
      <input name="password" type="password" autoComplete="current-password" required />
      <button disabled={pending}>{pending ? "بيدخل..." : "دخول"}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}`
        },
        {
          cmd: "getSession",
          title: "تعرف المستخدم في server components والـ actions والـ proxy",
          desc: R`على السيرفر: [[auth.api.getSession({ headers: await headers() })]] بيرجّع [[{ user, session }]] أو [[null]]. ده بيعمل query للداتابيز، فلفّه في [[cache()]] جوه الـ DAL زي درس [[DAL]] بالظبط، والصفحات والـ actions بتنادي [[requireUser()]]. وفي client components: [[authClient.useSession()]].

وفي [[proxy.ts]]: [[getSessionCookie(request)]] من [[better-auth/cookies]] بيشوف الـ cookie موجودة ولا لأ بس، من غير داتابيز. ده الفحص المتفائل السريع، والحماية الحقيقية في الـ DAL.`,
          example: R`// lib/dal.ts
import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session.user;
}
export async function getMyOrders() {
  const user = await requireUser();
  return db.order.findMany({ where: { userId: user.id }, select: { id: true, status: true, totalCents: true } });
}
// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*", "/account/:path*"] };`,
          try: R`اعمل [[app/dashboard/page.tsx]] بيعرض [[user.name]] من [[requireUser()]] والطلبات من [[getMyOrders()]]. جرّب ٣ حالات: من غير cookie، و cookie اسمها [[better-auth.session_token]] بقيمة عشوائية (من DevTools)، و cookie حقيقية. في كل حالة: مين وقفك، الـ proxy ولا الـ DAL؟ وبعدين امسح صف الـ session من Prisma Studio وانت داخل واعمل refresh.`,
          flag: "script",
          deep: {
            why: R`نفس درس الـ DAL: الحماية جنب الداتا عشان مفيش طريق للداتا يعدّي من غيرها. الفرق إن المكتبة بقت هي اللي بتتحقق من الـ session، وانت بتبني فوقها. ولأن الـ session في الداتابيز، لو مسحتها (خروج من كل الأجهزة، أو حساب اتقفل) أول طلب بعدها بيتقفل، عكس JWT.`,
            how: R`[[getSession]] بيقرا الـ cookie من الـ headers، ويتحقق من التوقيع، ويجيب الـ session والمستخدم من الداتابيز، ولو الـ session عدّى عليها يوم ([[updateAge]]) بيمد مدتها. في server component مينفعش يكتب cookie، فالتجديد بيحصل في الداتابيز والـ cookie بتتحدث في أول action أو طلب لـ [[/api/auth]].

[[cache()]] بيخلي كل النداءات في نفس الطلب (layout وصفحة و ٣ كومبوننتات) query واحد. ولو عايز تقلل الـ queries أكتر: [[session.cookieCache]] بيحط نسخة موقّعة من الـ session في cookie تانية لدقايق، وده معناه إن إلغاء الـ session بياخد لحد ما الكاش يخلص. وللعمليات الحساسة (تغيير الباسورد) ابعت [[query: { disableCookieCache: true }]].

الـ proxy: في Next 16 بيشتغل على Node، فممكن تنادي [[auth.api.getSession]] جواه كمان، والوثائق بتقول كده. بس ده query مع كل طلب مطابق، بما فيهم الـ prefetch. [[getSessionCookie]] أسرع بكتير، وبيعرف اسم الـ cookie بـ [[__Secure-]] ومن غيرها. والـ [[matcher]] هنا على المسارات المحمية بس، عكس درس [[proxy.ts]].

والـ server actions: نفس [[requireUser()]] أول سطر. والـ route handlers كمان. ومتستخدمش [[use cache]] على أي حاجة بتنادي [[getSession]].`,
            when: R`[[requireUser]] في كل صفحة و action و route فيه داتا خاصة. [[useSession]] في الـ client بس للعرض (اسم في الـ navbar)، مش للحماية. و [[getSessionCookie]] في الـ proxy لتجربة أحسن (redirect قبل ما حاجة تترسم).`,
            mistakes: R`تعتمد على [[getSessionCookie]] في الـ proxy كحماية: أي cookie بالاسم ده بتعدّي (وجرّبتها في التجربة). وتنادي [[getSession]] من غير [[headers]] فيرجع [[null]] دايمًا. وتنادي [[getSession]] مباشرة في ١٠ أماكن من غير [[cache]] فالصفحة تعمل ١٠ queries. و [[useSession]] في client component تخبي بيه زرار الأدمن وتفتكر إن ده حماية. وتشغّل [[cookieCache]] وتستغرب إن الـ ban مأثّرش لخمس دقايق.`
          },
          lines: [
            "الملف ده عمره ما يروح للمتصفح.",
            R`[[cache]] من React: مرة واحدة في الطلب.`,
            "الـ headers فيها الـ cookie.",
            "التحويل.",
            "الـ instance.",
            R`الـ session أو [[null]]، ومتكاشة طول الطلب.`,
            "الدالة اللي أي حاجة محمية بتناديها.",
            "هات الـ session.",
            "مفيش؟ login.",
            R`رجّع المستخدم ([[id]] و [[name]] و [[email]] وأي عمود ضافه plugin).`,
            "قفلة.",
            "داتا خاصة بتعدّي من الـ DAL.",
            "مين؟",
            "الفلتر بالـ userId جوه الـ query، والأعمدة المطلوبة بس.",
            "قفلة.",
            "الـ proxy.",
            R`[[getSessionCookie]]: بيدوّر على الـ cookie بالاسم بس.`,
            "الدالة.",
            "مفيش cookie؟ login قبل ما أي حاجة تترسم.",
            "فيه؟ كمّل. والصفحة هتتحقق بجد.",
            "قفلة.",
            "المسارات المحمية بس."
          ],
          sol: R`من غير cookie: الـ proxy هو اللي بيحوّلك لـ [[/login]]، والصفحة متترسمش خالص.

cookie بقيمة عشوائية: الـ proxy بيعدّيها (هو بيشوف الاسم بس)، والصفحة بتنادي [[requireUser]]، و [[getSession]] بيرجّع [[null]] لأن التوقيع غلط، فالـ DAL هو اللي بيحوّلك. ده الدليل إن الـ proxy مش حماية.

cookie حقيقية: الصفحة بتعرض اسمك وطلباتك بس.

لما تمسح صف الـ session من Prisma Studio وتعمل refresh: بتتحوّل للـ login فورًا، حتى والـ cookie لسه في المتصفح. الـ session اتلغت من السيرفر. (لو شغّلت [[cookieCache]]، هتفضل داخل لحد ما الكاش يخلص، وده المتوقع.)

الغلط الشائع: تحط [[console.log]] في الـ proxy وتفتكر إن الحالة التانية اتقفلت هناك.`,
          solCode: R`// app/dashboard/page.tsx
import { requireUser, getMyOrders } from "@/lib/dal";
export default async function Dashboard() {
  const user = await requireUser();
  const orders = await getMyOrders();
  return (
    <main>
      <h1>أهلًا {user.name}</h1>
      <ul>{orders.map((o) => <li key={o.id}>{o.id}: {o.status}</li>)}</ul>
    </main>
  );
}`
        },
        {
          cmd: "social login",
          title: "دخول بـ Google و GitHub وربط الحسابات",
          desc: R`[[socialProviders]] في الإعدادات: لكل provider [[clientId]] و [[clientSecret]] من لوحة المطورين (Google Cloud Console و GitHub OAuth Apps)، وتسجّل عندهم الـ callback: [[http://localhost:3000/api/auth/callback/google]] للتطوير، ونفسه بالدومين الحقيقي للإنتاج. وفي المتصفح: [[authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" })]].

ربط الحسابات: المستخدم ممكن يبقى عنده باسورد و Google و GitHub، كلهم صفوف في [[Account]] لنفس [[User]]. وفيه طريقتين: ضمني (دخل بـ Google بنفس إيميل حساب موجود)، ودي المكتبة بتعملها بشروط أمان، وصريح: وهو داخل، يدوس «اربط GitHub» فيتنادي [[authClient.linkSocial]].`,
          example: R`// lib/auth.ts (نفس الـ imports بتاعة درس better-auth)
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
    github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! },
  },
  account: { accountLinking: { enabled: true } },
  plugins: [nextCookies()],
});
// app/login/social-buttons.tsx
"use client";
import { authClient } from "@/lib/auth-client";
export function SocialButtons() {
  return (
    <div className="flex gap-2">
      <button onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" })}>ادخل بـ Google</button>
      <button onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/dashboard", errorCallbackURL: "/login" })}>ادخل بـ GitHub</button>
    </div>
  );
}
// app/settings/link-github.tsx ("use client")
<button onClick={() => authClient.linkSocial({ provider: "github", callbackURL: "/settings" })}>اربط GitHub</button>`,
          try: R`اعمل GitHub OAuth App (Settings > Developer settings > OAuth Apps) و callback [[http://localhost:3000/api/auth/callback/github]]، وحط الـ id والـ secret في [[.env]]. ادخل بـ GitHub وبص على جدول [[account]]. وبعدين: اعمل حساب بالإيميل والباسورد بنفس إيميل GitHub بتاعك (من غير ما تأكده)، واخرج، وادخل بـ GitHub. حصل إيه؟ وآخر حاجة: وانت داخل بالباسورد، استخدم [[linkSocial]] واربط GitHub.`,
          flag: "script",
          deep: {
            why: "ناس كتير مش هتعمل حساب بباسورد جديد، لكن بتدوس «ادخل بـ Google» في ثانية. وكمان انت مش شايل باسورد لهم. بس الـ OAuth نفسه (state و PKCE وتبادل الـ code وقراية الإيميل) سهل تغلط فيه، والمكتبة بتعمله. والجزء اللي فعلًا محتاج تفهمه هو ربط الحسابات، لأن غلطه بيدّي حد تاني حسابك.",
            how: R`الرحلة: [[signIn.social]] بيطلب [[/api/auth/sign-in/social]] فيرجع URL بتاع Google فيه state، والمتصفح يروح هناك. المستخدم يوافق، و Google يرجّعه على [[/api/auth/callback/google?code=...]]. المكتبة تتحقق من الـ state، وتبدّل الـ code بتوكنات، وتقرا الإيميل، وتعمل أو تلاقي [[User]]، وتضيف صف [[Account]] بـ [[providerId: "google"]]، وتعمل session وتحوّل على [[callbackURL]]. تفاصيل OAuth نفسه في تاب «بناء مشروع كامل» (درس OAuth).

الربط الضمني: لو حد دخل بـ Google بإيميل موجود في [[User]] ومش مربوط بـ Google، Better Auth مبيربطش إلا لو: الـ provider قال الإيميل verified (أو الـ provider في [[trustedProviders]])، و الحساب المحلي نفسه [[emailVerified]] (الإعداد [[requireLocalEmailVerified]]، وافتراضيًا true). غير كده بيرجع خطأ [[account_not_linked]].

ليه الشرط التاني؟ هجمة اسمها pre-account takeover: المهاجم يعمل حساب بإيميلك انت وباسورد يعرفه، من غير تأكيد. بعدين انت تدخل بـ Google، فلو اتربط تلقائي، المهاجم لسه معاه الباسورد وداخل على حسابك. فلو التسجيل بالباسورد عندك، شغّل تأكيد الإيميل.

الربط الصريح: [[linkSocial]] من مستخدم داخل بيعمل نفس الرحلة، ويضيف الـ [[Account]] للمستخدم الحالي. [[listAccounts()]] بيرجّع الحسابات المربوطة، و [[unlinkAccount({ accountId })]] بيفكّ واحد (ومبيرضاش يفك آخر حساب، عشان المستخدم ميتقفلش برّه).

والإنتاج: كل provider محتاج الـ callback بالدومين الحقيقي، و [[BETTER_AUTH_URL]] صح، وإلا Google يرجع [[redirect_uri_mismatch]].`,
            when: "أي تطبيق للجمهور العام: Google تقريبًا دايمًا، و GitHub لأدوات المطورين. وسيب الإيميل والباسورد كاختيار لو فيه ناس معندهاش حساب Google أو مش عايزة تربطه.",
            mistakes: R`[[trustedProviders]] فيها provider مبيتحققش من الإيميل (أو [[allowDifferentEmails: true]]) فحد يربط حسابك بإيميل مش بتاعه. وتسجيل بالباسورد من غير تأكيد إيميل مع ربط ضمني. وتنسى callback الإنتاج في لوحة Google. و [[clientSecret]] في متغير [[NEXT_PUBLIC_]]. وتستخدم نفس OAuth App للتطوير والإنتاج. وفي الانترفيو: «ليه منربطش الحسابات بالإيميل على طول؟» الإجابة pre-account takeover، والحل إن الإيميل يبقى متأكد في الناحيتين.`
          },
          lines: [
            "الإعدادات بتاعة الدرس اللي فات، وفوقها حاجتين.",
            "نفس الداتابيز.",
            "الباسورد لسه موجود كاختيار.",
            "الـ providers.",
            "Google: الـ id والـ secret من Google Cloud Console.",
            "GitHub: من OAuth App في إعدادات GitHub.",
            "قفلة.",
            R`الربط مسموح بالشروط الافتراضية (إيميل متأكد في الناحيتين). وده الافتراضي أصلًا، مكتوب عشان يبان.`,
            R`[[nextCookies]] آخر واحد.`,
            "قفلة.",
            "الزراير لازم client component عشان onClick.",
            "الـ client.",
            "الكومبوننت.",
            "بداية الـ JSX.",
            "حاوية.",
            R`[[signIn.social]]: بيحوّل المتصفح لـ Google، وبعد الموافقة يرجع على [[callbackURL]].`,
            R`نفس الحاجة لـ GitHub، ولو حصل خطأ (رفض، أو [[account_not_linked]]) يرجع على [[errorCallbackURL]] ومعاه [[?error=]].`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`في صفحة الإعدادات لمستخدم داخل: [[linkSocial]] بيضيف GitHub لنفس المستخدم، بشرط إن إيميل GitHub هو نفس إيميله (إلا لو [[allowDifferentEmails]]).`
          ],
          sol: R`بعد أول دخول بـ GitHub: صف في [[user]] بإيميلك على GitHub، وصف في [[account]] فيه [[providerId: "github"]] و [[accountId]] هو رقم حسابك على GitHub، و [[accessToken]] بتاع GitHub، و [[password]] فاضي.

التجربة التانية (حساب بالباسورد بنفس الإيميل ومش متأكد، وبعدين دخول بـ GitHub): الدخول بيفشل وبترجع على [[/login?error=account_not_linked]]. ده مش bug: المكتبة رافضة تربط لأن الحساب المحلي [[emailVerified: false]]، فممكن يكون حد تاني عامله بإيميلك. لو غيّرت [[emailVerified]] لـ true في Prisma Studio وجرّبت تاني، هيتربط ويبقى عندك صفين في [[account]] لنفس الـ [[userId]].

الربط الصريح بـ [[linkSocial]] وانت داخل: بيرجعك على [[/settings]] وفيه صف [[account]] جديد لنفس المستخدم. ولو إيميل GitHub مختلف عن إيميل حسابك، الربط بيفشل بخطأ [[email_does_not_match]]، لأن افتراضيًا لازم نفس الإيميل، والمختلف محتاج [[allowDifferentEmails: true]]. وده قرار أمان مش ذوق.

الغلط الشائع: [[redirect_uri_mismatch]] من GitHub أو Google، لأن الـ callback في اللوحة مش [[/api/auth/callback/github]] بالظبط أو فيه [[/]] زيادة.`
        },
        {
          cmd: "أدوار وصلاحيات",
          title: "أدوار وصلاحيات فوق المكتبة (admin plugin و access control)",
          desc: R`الـ auth بيقولك «مين». الصلاحيات بتقولك «يقدر يعمل إيه». في Better Auth: [[createAccessControl]] بتعرّف الموارد والأفعال ([[order: ["read", "refund"]]])، و [[ac.newRole]] بيعمل دور من مجموعة أفعال، و plugin الـ [[admin]] بيضيف عمود [[role]] للمستخدم (ومعاه ban و impersonation). وعلى السيرفر: [[auth.api.userHasPermission]] بترجّع [[{ success }]].

والفحص يبقى في الـ DAL جنب [[requireUser]]: [[requirePermission({ order: ["refund"] })]]. والصلاحية مش بديل عن الملكية: «support يقدر يشوف الطلبات» غير «العميل يشوف طلباته هو بس».`,
          example: R`// lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
const statement = { ...defaultStatements, product: ["create", "update", "delete"], order: ["read", "refund"] } as const;
export type Permissions = { [K in keyof typeof statement]?: (typeof statement)[K][number][] };
export const ac = createAccessControl(statement);
export const customer = ac.newRole({ order: ["read"] });
export const support = ac.newRole({ order: ["read", "refund"] });
export const admin = ac.newRole({ ...adminAc.statements, product: ["create", "update", "delete"], order: ["read", "refund"] });
// lib/auth.ts: import { admin as adminPlugin } from "better-auth/plugins";
// plugins: [adminPlugin({ ac, roles: { admin, customer, support }, defaultRole: "customer" }), nextCookies()]
// lib/dal.ts (جنب requireUser)
export async function requirePermission(permissions: Permissions) {
  const user = await requireUser();
  const { success } = await auth.api.userHasPermission({ body: { userId: user.id, permissions } });
  if (!success) notFound();
  return user;
}
// app/actions/orders.ts ("use server")
export async function refundOrder(orderId: string) {
  await requirePermission({ order: ["refund"] });
  await db.order.update({ where: { id: orderId, status: "PAID" }, data: { status: "REFUNDED" } });
  updateTag("orders");
}`,
          try: R`ضيف الـ plugin، وشغّل [[npx auth@latest generate]] و migrate وبص على الأعمدة الجديدة في [[user]] و [[session]]. اعمل ٣ مستخدمين، وخلي واحد [[support]] وواحد [[admin]] من Prisma Studio (عمود [[role]]). جرّب [[refundOrder]] بكل واحد فيهم. وبعدين في سكربت: [[auth.api.userHasPermission({ body: { role: "support", permissions: { product: ["delete"] } } })]].`,
          flag: "script",
          deep: {
            why: R`[[if (user.role === "admin")]] متفرّق في ٣٠ مكان بيبوّظ أول ما يبقى عندك دور تالت: «support يقدر يرجّع فلوس بس ميقدرش يمسح منتجات». لما الأدوار معرّفة كصلاحيات في مكان واحد، والكود بيسأل عن الفعل مش عن اسم الدور، تغيير دور بيبقى سطر واحد، ومفيش action اتنسى.`,
            how: R`[[statement]] هو كل الموارد والأفعال اللي في التطبيق. [[defaultStatements]] فيها موارد الـ admin plugin نفسه ([[user]] و [[session]]: create و list و set-role و ban و impersonate...)، و [[adminAc.statements]] هي صلاحيات الأدمن الافتراضية عليهم. لازم تحطهم في دور الأدمن بتاعك، وإلا الأدمن مش هيقدر يستخدم endpoints زي [[setRole]] و [[banUser]].

[[userHasPermission]] بـ [[userId]] بيجيب دور المستخدم من الداتابيز ويشوفه في التعريف. وتقدر تبعت [[role]] بدل [[userId]] لو معاك الدور من الـ session. والدور بيتخزن في [[user.role]] كنص، وممكن أكتر من دور بفاصلة.

الـ plugin بيضيف: [[role]] و [[banned]] و [[banReason]] و [[banExpires]] في [[user]]، و [[impersonatedBy]] في [[session]]. والمستخدم الـ banned مبيقدرش يدخل، والـ sessions بتاعته بتتمسح. وأول أدمن تعمله بإيدك (Prisma Studio أو seed)، وبعده الأدمن يقدر يدّي أدوار بـ [[auth.api.setRole]].

في الواجهة: [[authClient.admin.checkRolePermission({ role, permissions })]] بيحسب محليًا من غير طلب، عشان تخبي زرار «استرجاع». ده UX بس، والسيرفر لسه بيفحص.

الملكية: [[customer]] عنده [[order: ["read"]]]، بس [[getMyOrders]] لسه بتفلتر بـ [[userId]]. والـ support عنده read على كل الطلبات، فدالة تانية في الـ DAL من غير فلتر وعليها [[requirePermission]]. ولو فيه «فرق» أو «متاجر» (كل مستخدم دوره مختلف في كل متجر)، ده plugin [[organization]] مش admin.`,
            when: R`أول ما يبقى فيه أكتر من نوعين مستخدمين (عميل وأدمن). لو دورين بس وعمرهم ما هيزيدوا، [[user.role === "ADMIN"]] في [[requireAdmin]] زي درس [[DAL]] كفاية. ولو صلاحيات لكل صف (المستخدم ده يعدّل المقال ده بس)، ده منطق ملكية في الـ query أو ABAC، مش أدوار.`,
            mistakes: R`تخبي الزرار في الواجهة وتنسى الفحص في الـ action. وتعرّف دور [[admin]] من غير [[adminAc.statements]] فالأدمن ميقدرش يغيّر أدوار. وتدّي [[customer]] صلاحية [[order: ["read"]]] وتفتكر إنها بتفلتر بالملكية. وتفحص [[role === "admin"]] في مكان و [[userHasPermission]] في مكان تاني فيتناقضوا. وتنسى generate و migrate بعد ما تضيف الـ plugin فالـ [[role]] يطلع [[undefined]]. وفي الانترفيو: الفرق بين authentication و authorization، و RBAC مقابل ABAC، وليه «deny by default».`
          },
          lines: [
            R`[[createAccessControl]] بتعرّف الموارد والأفعال.`,
            "صلاحيات الـ admin plugin الافتراضية.",
            R`كل حاجة في التطبيق: موارد الـ plugin، و [[product]] و [[order]] بأفعالهم. [[as const]] عشان الأنواع تبقى حرفية.`,
            R`نوع بيتولد من الـ statement: [[{ order?: ("read" | "refund")[] ... }]]، فالغلط في اسم فعل بيطلع وقت الكتابة.`,
            "الـ access controller.",
            "العميل: يقرا الطلبات بس (والملكية في الـ query).",
            "الدعم: يقرا ويرجّع فلوس.",
            R`الأدمن: صلاحيات إدارة المستخدمين الافتراضية، وكل حاجة على المنتجات والطلبات.`,
            "الدالة اللي الـ actions بتناديها.",
            "داخل؟",
            "دوره يقدر يعمل الفعل ده؟ (بيجيب الدور من الداتابيز).",
            "لأ؟ 404، كأن الحاجة مش موجودة.",
            "رجّع المستخدم.",
            "قفلة.",
            "action استرجاع الفلوس.",
            "أول سطر: الصلاحية. مش الدور بالاسم.",
            R`الحالة جوه الـ where: مينفعش ترجّع طلب مش مدفوع أو اترجع قبل كده.`,
            R`حدّث كاش الطلبات (فئة Cache Components).`,
            "قفلة."
          ],
          sol: R`بعد generate و migrate: [[user]] فيها [[role]] و [[banned]] و [[banReason]] و [[banExpires]]، و [[session]] فيها [[impersonatedBy]]. والمستخدمين الجداد [[role]] بتاعهم [[customer]].

[[refundOrder]] بالـ customer: 404 (أو صفحة not-found)، والطلب متغيرش. بالـ support: الطلب بقى [[REFUNDED]]. بالأدمن: نفس الحاجة. ولو ناديته تاني على نفس الطلب، Prisma بيرمي [[P2025]] لأن مفيش صف [[PAID]]، وده المطلوب (مفيش استرجاع مرتين).

السكربت بيرجّع [[{ error: null, success: false }]] لأن support مالوش [[product: ["delete"]]]. و [[{ role: "support", permissions: { order: ["refund"] } }]] بيرجّع [[success: true]].

لو غيّرت الدور في Prisma Studio والمستخدم داخل، أول طلب بعدها بياخد الدور الجديد (لأن [[userHasPermission]] بـ [[userId]] بيقرا من الداتابيز). الغلط الشائع: تعرّف [[admin]] من غير [[...adminAc.statements]] وتستغرب إن [[setRole]] بيرجّع ممنوع للأدمن.`,
          solCode: R`// scripts/check-roles.ts   (npx tsx scripts/check-roles.ts)
import { auth } from "@/lib/auth";
import type { Permissions } from "@/lib/permissions";
const cases: { role: "customer" | "support" | "admin"; permissions: Permissions }[] = [
  { role: "customer", permissions: { order: ["refund"] } },
  { role: "support", permissions: { order: ["refund"] } },
  { role: "support", permissions: { product: ["delete"] } },
  { role: "admin", permissions: { product: ["delete"] } },
];
for (const c of cases) {
  const { success } = await auth.api.userHasPermission({ body: { role: c.role, permissions: c.permissions } });
  console.log(c.role, JSON.stringify(c.permissions), success);
}
// customer {"order":["refund"]} false
// support {"order":["refund"]} true
// support {"product":["delete"]} false
// admin {"product":["delete"]} true`
        }
      ]
    },
    {
      t: "SEO و metadata",
      l: 3,
      n: "title و description لكل صفحة، وصور المشاركة، و sitemap و robots، كلهم من ملفات في app",
      items: [
        {
          cmd: "metadata",
          title: "title و description وصورة المشاركة لكل صفحة",
          desc: R`في App Router مش بتكتب [[<head>]]: بتعمل [[export const metadata]] في أي [[layout.tsx]] أو [[page.tsx]] (server components بس)، و Next بيحوّلها لـ tags. الـ layout بيحط الافتراضي، والصفحة بتكمّل عليه أو تغيّره.

أهم الحقول: [[title]] (ومعاه [[template]] عشان كل صفحة تبقى «اسمها | اسم الموقع»)، و [[description]]، و [[openGraph]] لشكل اللينك في واتساب وفيسبوك، و [[alternates.canonical]]، و [[metadataBase]] اللي بيخلي كل اللينكات النسبية كاملة. شرح الـ tags نفسها وليه مهمة في تاب «HTML و CSS».`,
          example: R`// app/layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://books.example.com"),
  title: { default: "متجر الكتب", template: "%s | متجر الكتب" },
  description: "كتب عربي وإنجليزي بتوصل لحد باب البيت.",
  openGraph: { siteName: "متجر الكتب", locale: "ar_EG", type: "website" },
  twitter: { card: "summary_large_image" },
};
// app/about/page.tsx
export const metadata: Metadata = {
  title: "مين إحنا",
  alternates: { canonical: "/about" },
};
// الناتج: <title>مين إحنا | متجر الكتب</title> و <link rel="canonical" href="https://books.example.com/about">`,
          try: R`حط الـ metadata دي، وافتح [[/about]] واعمل View Source ودوّر على [[<title>]] و [[og:]]. وبعدين امسح [[metadataBase]] واعمل build وافتح View Source: هتلاقي الـ canonical بقى [[/about]] نسبي مش URL كامل. (التحذير بيطلع بس لما يكون فيه صورة OG أو twitter بمسار نسبي أو ملف opengraph-image.) وجرّب تحط [[export const metadata]] في ملف عليه [[use client]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: "جوجل بيعرض الـ title والـ description في النتايج، وواتساب وفيسبوك بيعرضوا صورة وعنوان من الـ og tags. صفحة من غيرهم بتظهر «Create Next App» أو لينك أزرق عريان، والناس مبتضغطش.",
            how: R`Next بيجمع الـ metadata من الـ root layout لتحت لحد الصفحة، وكل مستوى بيعمل merge سطحي: لو الصفحة كتبت [[openGraph]]، بيبدّل الـ [[openGraph]] بتاع الـ layout كله، مش بيدمج جواه. فلو عايز تحتفظ بحاجات مشتركة، حطها في متغير واعمله spread.

[[title.template]] بيتطبق على الصفحات اللي تحت الـ layout ده بس، مش على الـ layout نفسه. و [[title.absolute]] بيتجاهل الـ template.

Next بيحط لوحده [[<meta charset>]] و [[<meta name="viewport">]]. ولو عايز تغيّر الـ viewport أو [[themeColor]]، ده في [[export const viewport]] منفصل.

وفيه ملفات بأسماء خاصة بتتحول metadata لوحدها: [[favicon.ico]] (في [[app]] بس)، و [[icon.png]] و [[apple-icon.png]] و [[opengraph-image.png]] جوه [[app]] أو أي فولدر تحته، و Next بيحط الـ tags الصح.`,
            when: "الـ layout: الافتراضي والـ template و metadataBase. كل صفحة ثابتة: title و description على الأقل. والصفحات الـ dynamic: الدرس الجاي.",
            mistakes: R`تكتب [[<head>]] و [[<title>]] بإيدك في layout.tsx فيطلع مكرر أو يتجاهل. وتنسى [[metadataBase]] فصور المشاركة تطلع بـ localhost. وتحط [[metadata]] في client component (مش مسموح). ونفس الـ description لكل الصفحات: جوجل بيتجاهله ويكتب من عنده.`
          },
          lines: [
            "النوع بيكمّلك الحقول ويمسك الغلط.",
            "الافتراضي لكل الموقع.",
            "الدومين. من غيره الـ canonical النسبي بيفضل نسبي، وصور الـ OG النسبية بتطلع بـ localhost (وده اللي بيطلّع تحذير في الـ build).",
            R`[[default]] للصفحات اللي ملهاش title، و [[template]] للي ليها: [[%s]] مكان اسم الصفحة.`,
            "وصف بيظهر تحت اللينك في جوجل.",
            "شكل المشاركة. الصورة ممكن تيجي من ملف (درس opengraph-image).",
            "كارت كبير في X.",
            "قفلة.",
            "صفحة بتكمّل على الـ layout.",
            "اسمها بس، والـ template بيكمّل.",
            R`الرابط الأصلي للصفحة، عشان النسخ بـ [[?utm=]] متتحسبش صفحات مكررة.`,
            "قفلة."
          ]
        },
        {
          cmd: "generateMetadata",
          title: "metadata من الداتابيز لكل منتج ومقال",
          desc: R`لما الـ title بيعتمد على الداتا (اسم المنتج)، بدل [[metadata]] بتعمل [[export async function generateMetadata({ params })]] وترجّع نفس الشكل. بتاخد نفس [[params]] و [[searchParams]] بتوع الصفحة.

والصفحة و [[generateMetadata]] الاتنين محتاجين المنتج: لف دالة الجلب في [[cache()]] من React عشان الـ query يتنفذ مرة واحدة (ولو عليها [[use cache]] أو fetch، الـ dedupe بيحصل لوحده).`,
          example: R`// app/products/[slug]/page.tsx
import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
const getProduct = cache((slug: string) => db.product.findUnique({ where: { slug } }));
export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "المنتج مش موجود" };
  return {
    title: product.name,
    description: product.summary.slice(0, 155),
    alternates: { canonical: $__bt/products/$__{slug}$__bt },
    openGraph: { images: [{ url: product.imageUrl, width: 1200, height: 630 }] },
  };
}
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}`,
          try: R`حط [[console.log("query")]] جوه [[getProduct]] وافتح الصفحة: هتطبع مرة واحدة. شيل [[cache]]: مرتين. وبعدين بعد ما ترفع الموقع، ابعت اللينك لنفسك على واتساب أو جرّبه في أي أداة OG preview.`,
          flag: "script",
          deep: {
            why: "صفحات المنتجات والمقالات هي اللي بتجيب زوار من جوجل ومن المشاركات. لو كلها title واحد («متجر الكتب»)، جوجل مش هيعرف يفرّق بينها، والمشاركة هتبان نفس الشكل لكل منتج.",
            how: R`Next بينادي [[generateMetadata]] قبل ما يرسم الصفحة أو معاها. ومن Next 15.2 الـ metadata بقت بتتبعت streaming: للمتصفحات العادية، الصفحة مبتستناش [[generateMetadata]] وتبدأ تترسم، والـ tags بتتحط لما تجهز. وللـ bots اللي مبتنفذش JS (واتساب وفيسبوك و X و Bing، بتتعرف من الـ User-Agent)، Next بيستنى الـ metadata الأول عشان تبقى في [[<head>]]. أما Googlebot فبينفذ JS، فبياخد الـ metadata streaming عادي وبيقراها.

[[cache()]] من React بيحفظ النتيجة لنفس الـ arguments طول الطلب الواحد. ولو الدالة عليها [[use cache]] (Cache Components)، ده كاش أقوى بين الطلبات، و [[cache()]] مش ضروري.

وللـ hreflang في موقع بلغتين: [[alternates.languages]] (فئة i18n).

ومع Cache Components، لو [[generateMetadata]] بتقرا حاجة dynamic (cookies)، لازم الصفحة يبقى فيها جزء dynamic جوه Suspense، وإلا Next بيطلّع خطأ. فخلي الـ metadata معتمدة على params وداتا متكاشة بس.`,
            when: "أي صفحة dynamic segment: منتج، ومقال، وبروفايل عام، وقسم.",
            mistakes: R`نفس الـ query مرتين من غير [[cache]]. وترمي error من [[generateMetadata]] لما المنتج مش موجود فالصفحة تقع بـ 500 بدل 404. وتقرا [[cookies]] في [[generateMetadata]] فالصفحة تبقى dynamic من غير لازمة. و description فاضي لما الداتا فيها [[null]].`
          },
          lines: [
            "النوع.",
            R`[[cache]] من React.`,
            "404.",
            "نفس الـ slug في نفس الطلب = query واحد، حتى لو اتنادت من الـ metadata والصفحة.",
            R`[[async]] وبترجّع [[Metadata]]، وبتاخد نفس props الصفحة.`,
            "الـ slug.",
            "المنتج (من الكاش لو اتجاب).",
            "مش موجود: title بسيط، والصفحة هي اللي هتنادي notFound.",
            "metadata المنتج.",
            "الاسم، والـ template بتاع الـ layout بيكمّل.",
            "أول ١٥٥ حرف تقريبًا، لأن جوجل بيقص الباقي.",
            "الرابط الأصلي.",
            "صورة المشاركة بالمقاس المناسب.",
            "قفلة.",
            "قفلة.",
            "الصفحة.",
            "الـ slug.",
            R`نفس النداء: [[cache]] بيرجّع نفس النتيجة.`,
            "404.",
            "اعرض.",
            "قفلة."
          ]
        },
        {
          cmd: "sitemap.ts و robots.ts",
          title: "sitemap.xml و robots.txt من الكود",
          desc: R`[[app/sitemap.ts]] بيرجّع array من الصفحات ([[url]] و [[lastModified]])، و Next بيطلّعها [[/sitemap.xml]]. ولأنه كود، بتجيب المنتجات والمقالات من الداتابيز، فالـ sitemap دايمًا محدّث. و [[app/robots.ts]] بيطلّع [[/robots.txt]]: مين مسموحله يأرشف إيه، وفين الـ sitemap.

الاتنين Route Handlers جاهزة: بيتكاشوا وبيتبنوا وقت الـ build زي أي route، إلا لو استخدموا حاجة dynamic.`,
          example: R`// app/sitemap.ts
import type { MetadataRoute } from "next";
const base = "https://books.example.com";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await db.product.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: $__bt$__{base}/about$__bt },
    ...products.map((p) => ({ url: $__bt$__{base}/products/$__{p.slug}$__bt, lastModified: p.updatedAt })),
  ];
}
// app/robots.ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api", "/checkout"] },
    sitemap: "https://books.example.com/sitemap.xml",
  };
}`,
          try: R`اعمل الملفين وافتح [[/sitemap.xml]] و [[/robots.txt]] في المتصفح. وبعد ما ترفع الموقع، ضيف الـ sitemap في Google Search Console وشوف كام صفحة اتقرت.`,
          flag: "script",
          deep: {
            why: "جوجل بيلاقي الصفحات من اللينكات، والصفحات اللي مفيش لينك ليها أو عميقة أوي ممكن ميوصلهاش. الـ sitemap بيديله القايمة كاملة ومعاها آخر تعديل. والـ robots بيمنعه يضيّع وقته على صفحات ملهاش لازمة زي الـ dashboard.",
            how: R`[[sitemap.ts]] و [[robots.ts]] ملفات خاصة (metadata routes). Next بيحوّلهم Route Handlers بترجّع XML ونص بالـ Content-Type الصح. وزي أي route، لو مفيهمش حاجة dynamic بيتبنوا وقت الـ build. فلو المنتجات بتتضاف كل يوم، ضيف revalidate (أو [[use cache]] مع [[cacheLife]] في Cache Components)، وإلا الـ sitemap هيفضل زي ما كان وقت الـ build.

جوجل بيقبل لحد ٥٠ ألف URL في الـ sitemap الواحد. لو أكتر، [[generateSitemaps]] بتقسّمه لكذا ملف بـ id.

والموقع اللي بلغتين: كل عنصر في الـ sitemap ممكن يبقى فيه [[alternates.languages]] بروابط اللغات التانية.

و [[robots.txt]] مش حماية: هو طلب مهذب للـ bots. الصفحات الخاصة لازم تبقى محمية بجد (auth)، و [[disallow]] مبيمنعش الأرشفة لو فيه لينكات من برّه، فللصفحات اللي متتأرشفش خالص استخدم [[robots: { index: false }]] في الـ metadata.`,
            when: "أي موقع عام عايز زوار من جوجل. اعمل الاتنين قبل الإطلاق، وضيف الـ sitemap في Search Console.",
            mistakes: R`sitemap static اتعمل مرة وقت الـ build ومبيتحدثش. و [[lastModified: new Date()]] لكل الصفحات فجوجل يبطّل يثق فيه. و [[disallow: "/"]] اتنسى من staging للإنتاج فالموقع كله يختفي من جوجل. وتحط صفحات private في الـ sitemap.`
          },
          lines: [
            "الأنواع الجاهزة.",
            "الدومين (أو من متغير بيئة).",
            R`الملف ده بيطلّع [[/sitemap.xml]].`,
            "كل المنتجات المنشورة، الـ slug وآخر تعديل بس.",
            "ليستة الصفحات.",
            R`الرئيسية. [[changeFrequency]] و [[priority]] اختياريين وجوجل غالبًا بيتجاهلهم.`,
            "صفحة ثابتة.",
            R`صفحة لكل منتج، و [[lastModified]] الحقيقي عشان جوجل يعرف يرجع لإيه.`,
            "قفلة.",
            "قفلة.",
            "الأنواع للملف التاني.",
            R`بيطلّع [[/robots.txt]].`,
            "رجّع...",
            "...كل الـ bots مسموحلها كل حاجة ما عدا الصفحات الخاصة.",
            "ومكان الـ sitemap.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "opengraph-image",
          title: "صورة مشاركة لكل منتج بتتولد بالكود",
          desc: R`ملف [[opengraph-image.tsx]] جنب الصفحة بيولّد صورة المشاركة بالكود: بترجّع [[ImageResponse]] من [[next/og]] وجواه JSX و CSS (flexbox)، و Next بيحوّله PNG ويحط [[og:image]] للصفحة لوحده. كده كل منتج ليه صورة فيها اسمه وسعره من غير ما حد يصممها.

ولو الصورة ثابتة، حط ملف [[opengraph-image.png]] (1200×630) في الفولدر وخلاص.`,
          example: R`// app/products/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "صورة المنتج";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const cairo = await readFile(join(process.cwd(), "assets/Cairo-Bold.ttf"));
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#0f172a", color: "white", fontFamily: "Cairo" }}>
        <div style={{ fontSize: 72 }}>{product?.name ?? "متجر الكتب"}</div>
        <div style={{ fontSize: 40, color: "#fbbf24" }}>{product ? $__bt$__{product.priceCents / 100} ج.م$__bt : ""}</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Cairo", data: cairo, weight: 700 }] },
  );
}`,
          try: R`اعمل الملف، ونزّل خط Cairo من Google Fonts وحطه في [[assets]]. افتح [[/products/x/opengraph-image]] مباشرة في المتصفح تشوف الصورة. وبعدين شيل [[fonts]] وشوف الحروف العربي بقت إيه. وجرّب جملة طويلة فيها عربي وإنجليزي وأرقام، واتأكد إن الترتيب طالع صح.`,
          flag: "script",
          deep: {
            why: "لينك من غير صورة في واتساب أو لينكدإن بيتشاف أقل بكتير. وتصميم صورة لكل منتج من ألف منتج بإيدك مستحيل. التوليد بالكود بيعمل صورة متسقة لكل صفحة، وبتتحدث لوحدها لما الاسم أو السعر يتغير.",
            how: R`[[ImageResponse]] مبنية على Satori (بيحوّل JSX و CSS لـ SVG) و Resvg (بيحوّل الـ SVG لـ PNG). مش متصفح كامل: flexbox وحاجات CSS أساسية بس، مفيش grid، وكل عنصر فيه أكتر من ابن لازم [[display: flex]]. والخطوط لازم تتبعت كـ bytes (TTF أو OTF أو WOFF، مش WOFF2).

العربي: محتاج خط فيه حروف عربي، ودعم RTL في Satori محدود، فالجمل اللي فيها عربي وإنجليزي وأرقام ممكن ترتيبها يطلع غريب. اختبر النصوص الحقيقية، ولو فيه مشكلة خلي النص قصير والتصميم بسيط.

Next بيعامل الملف كـ route: بيتبني وقت الـ build لو مفيهوش حاجة dynamic، أو مع الطلب. والـ URL اللي في [[og:image]] فيه hash، فلما المحتوى يتغير الـ URL يتغير (بس واتساب وفيسبوك نفسهم بيكاشوا الصور فترة).

وفيه [[twitter-image.tsx]] بنفس الشكل لو عايز صورة مختلفة لـ X، ولو مش موجود بيستخدم الـ OG.`,
            when: R`صفحات المنتجات والمقالات والبروفايلات العامة، وأي صفحة الناس بتشاركها. والصفحات الثابتة: ملف PNG واحد في [[app]] كفاية.`,
            mistakes: R`تستخدم grid أو CSS مش مدعوم وتستغرب إن الصورة فاضية أو فيها خطأ. وتنسى الخط العربي فتطلع مربعات. وتحمّل الخط من URL خارجي مع كل طلب بدل ملف محلي. وتنسى إن [[params]] هنا Promise في Next 16 زي الصفحة.`
          },
          lines: [
            R`[[ImageResponse]] بتحوّل JSX لصورة.`,
            "قراية ملف الخط.",
            "المسار.",
            R`المقاس القياسي لصور المشاركة. Next بيحطه في [[og:image:width]] و [[og:image:height]].`,
            "نوع الملف.",
            R`نص بديل للصورة ([[og:image:alt]]).`,
            R`بتاخد [[params]] زي الصفحة (Promise).`,
            "الـ slug.",
            "المنتج.",
            "خط عربي كـ bytes. الخط الافتراضي مفيهوش عربي، فالحروف هتطلع مربعات من غيره.",
            "رجّع صورة...",
            "قوس JSX.",
            R`حاوية بـ flexbox. [[display: "flex"]] إجباري على أي div فيه أكتر من ابن.`,
            "الاسم.",
            "السعر.",
            "قفلة.",
            "قفلة القوس.",
            "المقاس والخط.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "JSON-LD",
          title: "JSON-LD للمنتج والمقال عشان rich results في جوجل",
          desc: R`JSON-LD داتا منظمة بتوصف الصفحة بمفردات schema.org: «ده منتج، سعره كذا، ومتوفر، وتقييمه ٤.٦ من ٣٨ رأي». جوجل بيستخدمها في rich results: السعر والنجوم والتوفر تحت اللينك في النتايج، وتاريخ المقال وكاتبه. ومحركات الـ AI بتقراها كمان.

في Next مفيش API خاص: [[<script type="application/ld+json">]] عادي جوه الصفحة (مش [[next/script]]، لأنه مش كود بيتنفذ)، ومحتواه [[JSON.stringify]] مع استبدال [[<]] بـ [[<]]، لأن الداتا جاية من الداتابيز وممكن يبقى فيها [[</script>]]. والأنواع جاهزة في مكتبة [[schema-dts]].`,
          example: R`// app/products/[slug]/page.tsx
import type { Product, WithContext } from "schema-dts";
import { notFound } from "next/navigation";
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.imageUrl],
    description: product.summary,
    sku: product.isbn,
    offers: {
      "@type": "Offer",
      url: $__bthttps://books.example.com/products/$__{slug}$__bt,
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "EGP",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.reviewCount > 0 ? { "@type": "AggregateRating", ratingValue: product.ratingAvg, reviewCount: product.reviewCount } : undefined,
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductView product={product} />
    </main>
  );
}`,
          try: R`حط الـ JSON-LD في صفحة منتج، وخلّي اسم منتج في الداتابيز [[كتاب </script><script>alert(1)</script>]]. افتح الصفحة: فيه alert؟ اعمل View Source وشوف شكل الاسم جوه الـ JSON. وبعدين شيل [[.replace]] وجرّب تاني. وآخر حاجة: اعمل نسخة للمقالات بـ [[@type: "Article"]] ([[headline]] و [[datePublished]] و [[author]])، وبعد ما ترفع الموقع (أو بـ ngrok) جرّب اللينك في Rich Results Test بتاع جوجل.`,
          flag: "script",
          deep: {
            why: "نتيجة فيها السعر والنجوم و «متوفر» بتاخد ضغطات أكتر بكتير من لينك أزرق عادي، ودي حاجة بتاخدها مجانًا من داتا عندك أصلًا. ومن غيرها جوجل بيحاول يخمّن من الـ HTML، وغالبًا مبيخمّنش.",
            how: R`الـ [[<script type="application/ld+json">]] data block: المتصفح مبينفذوش، ومحدش بيقراه غير الـ crawlers. عشان كده مش محتاج [[next/script]]، ومش محتاج nonce حتى مع CSP صارم (الـ CSP بيطبّق على الـ scripts اللي بتتنفذ بس).

ليه [[.replace(/</g, "\\u003c")]]؟ [[JSON.stringify]] مبيعملش escape لـ [[</script>]]. لو اسم المنتج فيه [[</script><script>...]]، المتصفح بيقفل الـ tag عند أول [[</script>]] وينفذ اللي بعده: XSS من حقل اسم منتج. و [[<]] هو نفس الحرف جوه JSON، فالـ parser بتاع جوجل بيقراه [[<]] عادي، والمتصفح مش شايف tag.

الحاجات اللي جوجل بيطلبها للـ Product rich result: [[name]]، وواحد على الأقل من [[offers]] أو [[review]] أو [[aggregateRating]]. و [[price]] رقم كنص من غير عملة، و [[priceCurrency]] كود ISO ([[EGP]])، و [[availability]] URL من schema.org. وللمقالات: [[Article]] أو [[NewsArticle]] أو [[BlogPosting]] مع [[headline]] و [[image]] و [[datePublished]] و [[author]] ([[Person]] فيه [[name]] و [[url]]). ومفيش ضمان إن جوجل يعرض الـ rich result حتى لو الداتا صح.

القاعدة الأهم: الـ JSON-LD لازم يطابق اللي ظاهر في الصفحة. سعر في الـ JSON-LD غير اللي في الصفحة، أو تقييمات مش موجودة، ده مخالف لسياسات جوجل وممكن يعمل manual action على الموقع كله.

ومكانه: الصفحة نفسها (المنتج والمقال)، و [[Organization]] و [[WebSite]] ممكن في الـ root layout أو الصفحة الرئيسية. و [[BreadcrumbList]] لمسار الصفحة.`,
            when: "صفحات المنتجات، والمقالات، والوصفات، والفعاليات، والكورسات، والأسئلة الشائعة، وأي صفحة ليها نوع في schema.org وجوجل بيدعمه في rich results.",
            mistakes: R`[[JSON.stringify]] من غير escape لـ [[<]]. و [[next/script]] أو [[<Script>]] للـ JSON-LD. و [[aggregateRating]] بـ [[reviewCount: 0]] أو تقييمات مخترعة. وسعر بالعملة جوه [[price]] ([[250 ج.م]]). وداتا مش ظاهرة في الصفحة. و [[@context]] ناقص. وتحط Product schema على صفحة قايمة فيها ٢٠ منتج (ده [[ItemList]]).`
          },
          lines: [
            R`أنواع schema.org لـ TypeScript: بتكمّلك الحقول وتمسك الغلط.`,
            "404.",
            "الصفحة.",
            "الـ slug.",
            R`المنتج ([[getProduct]] متكاشة بـ [[cache]] زي درس generateMetadata).`,
            "مش موجود؟ 404.",
            R`[[WithContext<Product>]]: object من نوع Product وفيه [[@context]].`,
            "المفردات من schema.org.",
            "النوع.",
            "الاسم زي ما هو ظاهر في الصفحة.",
            "صورة أو أكتر (URLs كاملة).",
            "الوصف.",
            R`[[sku]]: الـ ISBN للكتب.`,
            "العرض: السعر والتوفر.",
            "نوعه.",
            "لينك الصفحة.",
            R`السعر كنص رقم بس: [[250.00]].`,
            "العملة بكود ISO.",
            "متوفر ولا لأ، كـ URL من schema.org.",
            "قفلة.",
            R`التقييم لو فيه آراء حقيقية بس، وإلا [[undefined]] و [[JSON.stringify]] بيشيله.`,
            "قفلة.",
            "الـ JSX.",
            "main.",
            R`data block. الـ [[replace]] بيحوّل كل [[<]] لـ [[<]] عشان محدش يقفل الـ tag من جوه الداتا.`,
            "الصفحة نفسها.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`مع [[.replace]]: مفيش alert. في View Source هتلاقي الاسم [[كتاب </script><script>alert(1)</script>]] جوه الـ JSON، والـ h1 في الصفحة بيعرضه نص عادي (React عمله escape).

من غير [[.replace]]: الـ alert بيظهر. المتصفح شاف [[</script>]] جوه الاسم فقفل الـ data block، واللي بعده بقى [[<script>]] حقيقي. ولو عندك CSP بـ nonce مقفول، السكربت المحقون مش هيتنفذ (مفيش عليه nonce)، وده بالظبط ليه الاتنين مع بعض.

نسخة المقال: [[{ "@context": "https://schema.org", "@type": "Article", headline, image: [cover], datePublished: post.publishedAt.toISOString(), dateModified: post.updatedAt.toISOString(), author: [{ "@type": "Person", name, url }] }]].

Rich Results Test بيطلّع «Product snippets» و «Merchant listings» صالحين، وممكن warnings زي [[shippingDetails]] أو [[hasMerchantReturnPolicy]] ناقصين: دول اختياريين للـ snippet ومحتاجهم لو عايز تظهر في Google Shopping. الخطأ الأحمر الشائع: [[price]] فيه عملة أو فاصلة.`,
          solCode: R`// app/blog/[slug]/page.tsx
import type { Article, WithContext } from "schema-dts";
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: [post.coverUrl],
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: [{ "@type": "Person", name: post.author.name, url: $__bthttps://books.example.com/authors/$__{post.author.slug}$__bt }],
  };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1>{post.title}</h1>
    </article>
  );
}`
        }
      ]
    },
    {
      t: "i18n بـ next-intl",
      l: 3,
      n: "عربي وإنجليزي في الـ URL، وترجمة في server و client components، وروابط بتحافظ على اللغة",
      items: [
        {
          cmd: "next-intl",
          title: "تجهّز next-intl: اللغات والـ proxy والرسايل",
          desc: R`next-intl هي المكتبة الأشهر للترجمة في App Router. الفكرة: اللغة جزء من الـ URL ([[/ar/products]] و [[/en/products]])، والصفحات كلها جوه [[app/[locale]]]، والنصوص في [[messages/ar.json]] و [[messages/en.json]].

التجهيز ٤ ملفات: [[i18n/routing.ts]] فيه اللغات والافتراضية، و [[proxy.ts]] بيحوّل اللي مفيش لغة في الـ URL بتاعه للغة المناسبة، و [[i18n/request.ts]] بيحمّل رسايل اللغة لكل طلب، و [[next.config.ts]] بيضيف الـ plugin. والـ layout نفسه في الدرس الجاي.`,
          example: R`// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({ locales: ["ar", "en"], defaultLocale: "ar" });
// src/proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
export default createMiddleware(routing);
export const config = { matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)" };
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: (await import($__bt../../messages/$__{locale}.json$__bt)).default };
});
// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
export default withNextIntl({});`,
          try: R`[[npm i next-intl]]، واعمل الملفات دي و [[messages/ar.json]] فيه [[{"Home": {"title": "أهلًا"}}]] و [[en.json]] بالإنجليزي، وانقل [[app/page.tsx]] لـ [[app/[locale]/page.tsx]]. افتح [[localhost:3000]]: هيتحول لـ [[/ar]]. وبعدين غيّر لغة المتصفح للإنجليزي، وامسح cookies الموقع، وافتح تاني.`,
          flag: "script",
          deep: {
            why: "الترجمة بـ state في المتصفح (زرار بيغيّر اللغة من غير ما الـ URL يتغير) معناها جوجل بيشوف لغة واحدة بس، واللينك اللي بتبعته بيفتح بلغة غير اللي شفتها، والصفحة بتترسم بلغة وبعدين تتقلب. اللغة في الـ URL بتحل التلاتة: كل لغة صفحات لوحدها، بتترسم على السيرفر، وبتتأرشف.",
            how: R`الطلب: [[/products]] بيوصل الـ proxy. next-intl بيشوف مفيش لغة، فيختار (من cookie زيارة قديمة، وبعدين [[Accept-Language]] بتاع المتصفح، وبعدين الافتراضية) ويعمل redirect لـ [[/ar/products]]. الطلب الجديد بيعدّي الـ proxy ويوصل لـ [[app/[locale]/products/page.tsx]] و [[locale]] قيمتها [["ar"]].

[[i18n/request.ts]] بيتنادى مرة لكل طلب، وأي [[getTranslations]] أو [[useTranslations]] في server component بياخد الرسايل منه. والـ client components بتاخدها من [[NextIntlClientProvider]] في الـ layout (من next-intl 4 بيورث الرسايل من السيرفر لوحده).

[[localePrefix]] في [[defineRouting]]: [["always"]] (الافتراضي، كل الـ URLs فيها اللغة)، أو [["as-needed"]] (الافتراضية من غير prefix: [[/products]] عربي و [[/en/products]] إنجليزي). و [[pathnames]] لو عايز الـ URL نفسه مترجم.

وفي Next 15 الملف كان [[middleware.ts]]، ونفس الكود بالظبط. والـ matcher ده مهم: من غيره الـ proxy هيحاول يضيف لغة لطلبات الصور والـ API.`,
            when: "أي موقع بلغتين أو أكتر. ولو التطبيق كله ورا login ومش محتاج SEO، ممكن اللغة تبقى في الـ cookie بس من غير routing (next-intl بيدعم ده كمان)، بس الـ URL أحسن غالبًا.",
            mistakes: R`تنسى تنقل الصفحات جوه [[app/[locale]]] فتلاقي 404. و matcher بيمسك [[/api]] فالـ API يتحول لـ [[/ar/api]]. وتحمّل كل اللغات في كل طلب بدل اللغة الحالية بس. وتفتكر إنك محتاج [[middleware.ts]] عشان next-intl في Next 16: [[proxy.ts]] شغال معاه عادي.`
          },
          lines: [
            "دالة تعريف الـ routing.",
            R`لغتين، والعربي الافتراضي. وفيه [[localePrefix]] لو عايز الافتراضية من غير [[/ar]] في الـ URL.`,
            R`الـ middleware بتاع next-intl. بيشتغل في [[proxy.ts]] في Next 16 عادي.`,
            "نفس الإعدادات.",
            R`الـ proxy كله: لو الـ URL من غير لغة، بيختار من الـ cookie أو [[Accept-Language]] ويحوّل.`,
            "كل المسارات ما عدا الـ API والملفات اللي فيها نقطة (صور و favicon).",
            "الإعدادات اللي بتتحمّل مع كل طلب على السيرفر.",
            "دالة بتتأكد إن اللغة مدعومة.",
            "اللغات.",
            R`[[requestLocale]] غالبًا جاية من [[[locale]]] في الـ URL.`,
            "استناها (Promise).",
            "لو مش مدعومة (أو مفيش)، الافتراضية.",
            R`رجّع اللغة ورسايلها بس ([[import]] dynamic، فكل لغة ملف لوحده).`,
            "قفلة.",
            "الـ plugin.",
            R`بيدوّر على [[i18n/request.ts]] لوحده.`,
            R`لف الـ config بتاعك (اللي فيه [[images]] أو [[cacheComponents]]) بيه.`
          ]
        },
        {
          cmd: "setRequestLocale",
          title: "الـ layout بتاع اللغة: lang و dir وصفحات static",
          desc: R`[[app/[locale]/layout.tsx]] هو الـ root layout: بيتأكد إن اللغة مدعومة، ويحط [[lang]] و [[dir]] على [[<html>]] من السيرفر، ويلف الصفحات بـ [[NextIntlClientProvider]]. نفس الـ layout ده مشروح من ناحية RTL والتصميم في تاب «بناء مشروع كامل».

الجديد هنا: [[generateStaticParams]] بترجّع اللغات، و [[setRequestLocale(locale)]] في الـ layout وفي كل صفحة. من غيرهم next-intl بيقرا اللغة من الـ headers، وده بيخلي كل الصفحات dynamic.`,
          example: R`// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
// src/app/[locale]/about/page.tsx
import { getTranslations, setRequestLocale } from "next-intl/server";
export default async function About({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  return <h1>{t("title")}</h1>;
}`,
          try: R`اعمل build واقرا الجدول: [[/[locale]/about]] المفروض ● وتحتها [[/ar/about]] و [[/en/about]]. امسح [[setRequestLocale]] من صفحة About واعمل build تاني وشوف الرمز اتغير لـ ƒ.`,
          flag: "script",
          deep: {
            why: R`صفحة «مين إحنا» مش بتتغير مع كل زائر، بس لو next-intl مش عارف اللغة غير من الـ headers، Next مضطر يرسمها مع كل طلب. [[setRequestLocale]] بتقول اللغة صراحة من الـ params، فالصفحة تتبني مرة لكل لغة.`,
            how: R`next-intl محتاج يعرف لغة الطلب الحالي من جوه أي كومبوننت. الطريقة الافتراضية إن الـ proxy بيحط header و [[getRequestConfig]] بيقراه، بس قراية الـ headers بتخلي الـ route dynamic. [[setRequestLocale]] بتخزن اللغة في كاش خاص بالطلب، فالـ [[requestLocale]] بياخدها من هناك.

لازم تتنادى في كل layout وكل page قبل أي [[useTranslations]] أو [[getTranslations]]، لأن Next ممكن يرسم الـ layout والصفحة بشكل منفصل، فمتعتمدش إن الـ layout سبق.

وفي [[generateMetadata]] ابعت اللغة صراحة: [[getTranslations({ locale, namespace: "Metadata" })]].

ومع Cache Components (Next 16)، [[generateStaticParams]] للغات مهمة عشان الـ [[params]] تبقى معروفة وقت الـ build، والصفحات اللي فيها أجزاء dynamic تانية تتعامل زي أي صفحة (Suspense).

وتفاصيل RTL: الـ CSS المنطقي ([[ms-4]] بدل [[ml-4]]) والأيقونات المقلوبة في تاب «HTML و CSS» وتاب «بناء مشروع كامل».`,
            when: "أي موقع مترجم فيه صفحات static (تسويق، ومقالات، ومنتجات). الصفحات اللي ورا login (dashboard) كده كده dynamic، بس برضه حطها عشان تمشي على نفس القاعدة.",
            mistakes: R`تحطها في الـ layout بس وتنسى الصفحات. وتسيب [[app/layout.tsx]] فيه [[<html lang="ar">]] وتضيف [[app/[locale]/layout.tsx]] تحته فيبقى فيه html جوه html. وتحط [[dir]] بـ JavaScript في effect فالصفحة تترعش.`
          },
          lines: [
            "الـ provider ودالة التحقق.",
            R`[[setRequestLocale]] من جزء السيرفر.`,
            "404.",
            "اللغات.",
            "ابني نسخة من كل صفحة لكل لغة وقت الـ build.",
            R`بترجّع [[[{ locale: "ar" }, { locale: "en" }]]].`,
            "قفلة.",
            R`الـ root layout (مفيش [[app/layout.tsx]] فوقه بـ html تاني).`,
            "اللغة من الـ URL.",
            R`لغة مش مدعومة ([[/fr]])؟ 404.`,
            "قول لـ next-intl اللغة كام، عشان ميقراش الـ headers والصفحة تفضل static.",
            "بداية الـ JSX.",
            "اللغة والاتجاه من السيرفر، فمفيش ترعيشة LTR وبعدين RTL.",
            "body.",
            "الرسايل للـ client components.",
            "قفلة body.",
            "قفلة html.",
            "قفلة.",
            "قفلة.",
            R`[[getTranslations]] للـ async server components، و [[setRequestLocale]].`,
            "صفحة About.",
            "اللغة.",
            "لازم في كل صفحة كمان، مش الـ layout بس.",
            R`نصوص الـ namespace [[About]] من ملف الرسايل.`,
            "اعرض.",
            "قفلة."
          ]
        },
        {
          cmd: "useTranslations",
          title: "تترجم نص في server و client components، والجمع بالعربي",
          desc: R`[[useTranslations("Cart")]] بيرجّع دالة [[t]]: [[t("title")]] بيجيب [[Cart.title]] من ملف اللغة الحالية. بتشتغل في client components وفي server components العادية (مش async). وفي server component [[async]] استخدم [[await getTranslations("Cart")]] من [[next-intl/server]].

الرسايل بصيغة ICU: متغيرات [[{name}]]، والجمع بـ [[plural]]، والعربي فيه ٦ حالات ([[zero]] و [[one]] و [[two]] و [[few]] و [[many]] و [[other]])، فمتلزقش كلام ببعض في الكود. ولتنسيق التواريخ والأرقام والفلوس فيه [[useFormatter]].`,
          example: R`// messages/ar.json
{
  "Cart": {
    "title": "السلة",
    "items": "{count, plural, =0 {السلة فاضية} one {منتج واحد} two {منتجين} few {# منتجات} many {# منتج} other {# منتج}}",
    "greeting": "أهلًا يا {name}"
  }
}
// app/[locale]/cart/page.tsx (server)
import { getTranslations } from "next-intl/server";
export default async function CartPage() {
  const t = await getTranslations("Cart");
  const items = await getCartItems();
  return <h1>{t("title")}: {t("items", { count: items.length })}</h1>;
}
// components/cart-total.tsx (client)
"use client";
import { useFormatter, useTranslations } from "next-intl";
export function CartTotal({ totalCents, name }: { totalCents: number; name: string }) {
  const t = useTranslations("Cart");
  const format = useFormatter();
  return <p>{t("greeting", { name })}: {format.number(totalCents / 100, { style: "currency", currency: "EGP" })}</p>;
}`,
          try: R`اعمل صفحة فيها [[t("items", { count })]] مع [[count]] بـ 0 و 1 و 2 و 5 و 11 و 100، وشوف كل واحدة طلعت إزاي. وبعدين امسح حالة [[many]] من الرسالة وشوف 11 طلعت إيه (هتروح لـ [[other]]).`,
          flag: "script",
          deep: {
            why: R`[[count + " منتجات"]] بتطلع «1 منتجات» و «11 منتجات»، والعربي فيه قواعد جمع مختلفة حسب الرقم. وكل نص مكتوب في الكومبوننت نفسه لازم يتلف عليه واحد واحد لو قررت تضيف لغة. ملفات الرسايل بـ ICU بتحل الاتنين.`,
            how: R`next-intl بيستخدم [[Intl.PluralRules]] المبني في JavaScript عشان يختار الحالة. في العربي: صفر zero، وواحد one، واتنين two، ومن ٣ لـ ١٠ few، ومن ١١ لـ ٩٩ many، و ١٠٠ و ١٠١ و ١٠٢ (وأي مية كاملة) other. والقاعدة بتتحسب على آخر رقمين، فـ ١٠٣ ترجع few و ١١١ ترجع many تاني. و [[=0]] بيطابق الرقم بالظبط قبل القواعد.

الـ namespaces بتقسّم الملف حسب الشاشة ([[Cart]] و [[Checkout]])، وتقدر تستخدم [[t.rich]] لنص فيه لينك أو bold: [[t.rich("terms", { link: (chunks) => <Link href="/terms">{chunks}</Link> })]].

الأنواع: لو عرّفت نوع الرسايل في [[AppConfig]] (next-intl 4)، TypeScript بيمسك [[t("titel")]] الغلط وبيكمّلك المفاتيح.

الـ client components بتاخد كل الرسايل من الـ provider. لو الملف كبير، ممكن تبعت namespaces معينة بس للـ client، وتسيب الباقي للسيرفر.

والتنسيق: [[useFormatter]] أو [[getFormatter]] للأرقام والفلوس والتواريخ والوقت النسبي («من ٥ دقايق») حسب اللغة، مبنية على [[Intl]].`,
            when: "أي نص بيظهر للمستخدم في موقع مترجم: عناوين، وأزرار، ورسايل أخطاء، وإيميلات. والنصوص اللي جاية من الداتابيز (اسم المنتج) مش مكانها ملفات الرسايل: دي أعمدة باللغتين (تاب «بناء مشروع كامل»).",
            mistakes: R`[[t("count") + " " + t("items")]]: لزق كلام ببعض بيبوّظ الترتيب والجمع. ونسيان حالة [[two]] أو [[few]] فتطلع «2 منتج». ومفتاح موجود في [[ar.json]] ومش في [[en.json]]: اعمل فحص في CI بيقارن المفاتيح. و [[useTranslations]] في server component [[async]] (استخدم [[getTranslations]]).`
          },
          lines: [
            "بداية ملف الرسايل العربي.",
            R`namespace اسمه [[Cart]]: نصوص الحتة دي مع بعض.`,
            "نص عادي.",
            R`الجمع: [[=0]] للصفر بالظبط، و [[#]] مكان الرقم، وكل حالة من حالات العربي بالنص المناسب.`,
            "متغير.",
            "قفلة.",
            "قفلة.",
            R`للـ async server components.`,
            "صفحة السلة (dynamic أصلًا، فمش محتاجة setRequestLocale).",
            "دالة الترجمة للـ namespace ده.",
            "الداتا.",
            R`[[count]] بيختار حالة الجمع: ١ «منتج واحد»، و ٢ «منتجين»، و ٥ «٥ منتجات»، و ١١ «١١ منتج».`,
            "قفلة.",
            "client component.",
            R`نفس الـ API في المتصفح، والرسايل جاية من [[NextIntlClientProvider]].`,
            "بياخد الإجمالي والاسم.",
            "الترجمة.",
            "أداة تنسيق الأرقام والتواريخ حسب اللغة الحالية.",
            "المتغير جوه الجملة، والفلوس بتتنسق بالأرقام والعملة حسب اللغة.",
            "قفلة."
          ]
        },
        {
          cmd: "createNavigation",
          title: "روابط بتحافظ على اللغة، وزرار تغيير اللغة",
          desc: R`[[Link]] العادي بتاع Next مش عارف حاجة عن اللغة: [[href="/cart"]] هيوديك [[/cart]] من غير [[/ar]]. [[createNavigation(routing)]] بيطلّع نسخ من [[Link]] و [[redirect]] و [[usePathname]] و [[useRouter]] بتضيف اللغة الحالية لوحدها، فتكتب [[href="/cart"]] وتروح [[/ar/cart]].

وزرار تغيير اللغة: [[router.replace(pathname, { locale: "en" })]] بيفتح نفس الصفحة باللغة التانية. ولجوجل، [[alternates.languages]] في الـ metadata بيقوله إن الصفحتين ترجمة لبعض (hreflang).`,
          example: R`// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
// src/components/locale-switcher.tsx
"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "ar" ? "en" : "ar";
  return <button onClick={() => router.replace(pathname, { locale: other })}>{other === "ar" ? "عربي" : "English"}</button>;
}
// src/app/[locale]/about/page.tsx
export const metadata = { alternates: { languages: { ar: "/ar/about", en: "/en/about", "x-default": "/ar/about" } } };`,
          try: R`حط [[LocaleSwitcher]] في الـ layout واضغطه من [[/ar/about]]: المفروض يروح [[/en/about]]. وبعدين اعمل لينك لـ [[/about]] بـ [[Link]] من [[next/link]] بدل النسخة المترجمة واضغطه من صفحة إنجليزي: هيروح من غير لغة، والـ proxy يحوّله بطلب زيادة، وممكن للغة غير اللي كنت فيها.`,
          flag: "script",
          deep: {
            why: R`في موقع مترجم، كل لينك في الكود لازم يفتكر يضيف اللغة: [[href={$__bt/$__{locale}/cart$__bt}]]. سهل تنساه في مكان، فالمستخدم الإنجليزي يدوس لينك يلاقي نفسه بالعربي. الـ navigation المترجم بيشيل الموضوع ده من دماغك.`,
            how: R`[[createNavigation]] بيعمل wrappers خفيفة: [[Link]] بياخد الـ href ويحط قبله اللغة الحالية (أو [[locale]] prop لو عايز لغة معينة: [[<Link href="/" locale="en">]]). و [[usePathname]] بيرجّع المسار من غير prefix اللغة، عشان تقارن بيه لينك active أو تغيّر اللغة. و [[redirect]] على السيرفر بياخد [[{ href, locale }]].

لو مستخدم [[pathnames]] (URLs مترجمة)، الـ href بيبقى الاسم الداخلي، و next-intl بيحوّله للـ URL باللغة المطلوبة، والصفحات الـ dynamic بتاخد [[{ pathname: "/products/[slug]", params: { slug } }]].

[[getPathname]] على السيرفر بيطلّع الـ URL لأي لغة، مفيد للـ sitemap و [[alternates.languages]] في [[generateMetadata]].

و hreflang: جوجل بيستخدمه عشان يعرض لكل مستخدم النسخة بلغته، ومبيعتبرش الصفحتين محتوى مكرر. و [[x-default]] للنسخة اللي تظهر لو لغة المستخدم مش من اللغات دي.`,
            when: "كل لينك داخلي في موقع مترجم، وزرار اللغة في الـ header، و alternates في كل صفحة عامة.",
            mistakes: R`[[import Link from "next/link"]] في نص المشروع وتنسى تغيّره. وزرار اللغة بيوديك الرئيسية بدل نفس الصفحة. واسم اللغة بلغة الصفحة («Arabic» في النسخة الإنجليزي): اللي مش فاهم اللغة الحالية لازم يلاقي لغته مكتوبة بلغتها. و hreflang بـ URLs نسبية من غير [[metadataBase]].`
          },
          lines: [
            "الدالة من next-intl.",
            "إعدادات اللغات.",
            R`نسخ بتفهم اللغة. في كل الموقع استورد [[Link]] من هنا مش من [[next/link]].`,
            "hooks، فـ client.",
            R`[[useLocale]] بيقولك اللغة الحالية.`,
            R`[[usePathname]] و [[useRouter]] بتوع next-intl مش بتوع Next.`,
            "زرار اللغة.",
            R`[["ar"]] أو [["en"]].`,
            R`المسار من غير اللغة: [[/about]] مش [[/ar/about]].`,
            "الراوتر.",
            "اللغة التانية.",
            R`نفس المسار باللغة التانية. [[replace]] عشان التبديل ميبقاش خطوة في الـ history. واسم اللغة مكتوب بلغتها هي.`,
            "قفلة.",
            R`hreflang: الصفحة بتقول لجوجل فين النسخة العربي وفين الإنجليزي. مع [[metadataBase]] بتبقى URLs كاملة.`
          ]
        }
      ]
    },
    {
      t: "الأداء",
      l: 3,
      n: "صور وخطوط من غير ما الصفحة تتنطط، و JavaScript أقل في المتصفح",
      items: [
        {
          cmd: "next/image",
          title: "صور سريعة ومقاسها صح بـ next/image",
          desc: R`[[<Image>]] من [[next/image]] بيحوّل الصورة لـ WebP أو AVIF بالمقاس اللي الشاشة محتاجاه، ويكتب [[srcset]]، ويعمل lazy loading، ويحجز مكانها عشان الصفحة متتنططش. محتاج [[width]] و [[height]] (أو [[fill]] جوه حاوية ليها مقاس)، و [[sizes]] بيقوله الصورة هتاخد قد إيه من الشاشة.

الصور من دومين تاني لازم تسمح بيها في [[images.remotePatterns]]. وفي Next 16 [[priority]] بقت deprecated: لصورة الـ LCP استخدم [[fetchPriority="high"]] (أو [[preload]]). وتفاصيل الصور في HTML نفسه في تاب «HTML و CSS».`,
          example: R`// next.config.ts
const nextConfig: NextConfig = {
  images: { remotePatterns: [new URL("https://cdn.example.com/products/**")], formats: ["image/avif", "image/webp"] },
};
// app/page.tsx
import Image from "next/image";
import hero from "@/assets/hero.jpg";
<Image src={hero} alt="كتب على رف" placeholder="blur" fetchPriority="high" loading="eager" sizes="100vw" className="h-auto w-full" />
<Image src={p.imageUrl} alt={p.name} width={400} height={400} sizes="(max-width: 768px) 50vw, 25vw" />
<div className="relative aspect-video">
  <Image src={cover} alt="" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
</div>`,
          try: R`حط صورة منتج بـ [[<img>]] عادي وجنبها [[<Image>]] بنفس المصدر، وافتح Network: قارن الحجم والصيغة. وبعدين شيل [[sizes]] من صورة المنتج وشوف أنهي مقاس اتحمّل على موبايل (من DevTools device mode). وشغّل Lighthouse وشوف الـ LCP قبل وبعد [[fetchPriority]].`,
          flag: "script",
          deep: {
            why: "الصور غالبًا أتقل حاجة في الصفحة، وأكبر سبب إن LCP وحش و CLS عالي. صورة 4000 بكسل بـ ٣ ميجا بتتعرض 300 بكسل على موبايل معناها ثواني ضايعة. next/image بيعمل الشغل ده (مقاسات وصيغ وأبعاد) من غير ما تجهّز كل صورة بإيدك.",
            how: R`[[<Image>]] بيطلّع [[<img>]] عادي فيه [[srcset]] بمقاسات من [[deviceSizes]] و [[imageSizes]]، وكل واحد URL لـ [[/_next/image?url=...&w=640&q=75]]. أول ما مقاس يتطلب، سيرفر Next بيحوّل الصورة (بمكتبة sharp) ويكاشها على الديسك.

[[sizes]] هو اللي بيخلي المتصفح يختار صح. من غيره مع [[fill]] أو صورة responsive، المتصفح بيفترض 100vw وينزّل أكبر مقاس. و [[width]] و [[height]] للنسبة والحجز مش للمقاس المعروض: الـ CSS هو اللي بيحدد العرض الفعلي.

Next 16 غيّر defaults: [[qualities]] بقت [[[75]]] بس (أي quality تانية بتتقرب ليها إلا لو ضفتها)، و [[minimumCacheTTL]] بقى ٤ ساعات، و 16 اتشالت من [[imageSizes]]، والصور المحلية اللي فيها query string محتاجة [[localPatterns]].

على VPS الـ optimization بياخد CPU ورام. لو الموقع فيه صور كتير، CDN للصور (Cloudinary أو Cloudflare Images) بـ [[loader]] مخصص، أو [[unoptimized]] للصور اللي متظبطة أصلًا. وفي [[output: "export"]] الـ optimization مش موجود.`,
            when: R`أي صورة محتوى: منتجات، وأغلفة، وصور بروفايل. الأيقونات SVG الصغيرة مش محتاجاه. وصورة الـ LCP اللي فوق الشاشة بس هي اللي تاخد [[fetchPriority]].`,
            mistakes: R`[[fetchPriority="high"]] أو [[preload]] على كل الصور فمبقاش فيه أولوية. و [[fill]] جوه div من غير [[relative]] أو ارتفاع فالصورة تختفي. ومن غير [[sizes]] فالموبايل ينزّل صورة الديسكتوب. و [[remotePatterns: [{ hostname: "**" }]]] عشان «الصور مش ظاهرة»: كده أي حد يستخدم سيرفرك يحوّل صور من أي مكان.`
          },
          lines: [
            "إعدادات Next.",
            "اسمح بالصور من الـ CDN ده والمسار ده بس، واطلب AVIF الأول (أصغر) وبعده WebP.",
            "قفلة.",
            "الكومبوننت.",
            R`صورة محلية بـ import: Next عارف مقاسها لوحده ويعمل منها blur صغير.`,
            R`صورة الـ hero (الـ LCP): [[fetchPriority="high"]] و [[eager]] عشان تحمّل على طول، و [[sizes="100vw"]] لأنها بعرض الشاشة.`,
            R`صورة منتج من الـ CDN: المقاس لازم يتكتب، و [[sizes]] بيقول «نص الشاشة على الموبايل، وربعها على الكبير»، فالموبايل مياخدش صورة الديسكتوب.`,
            R`حاوية ليها نسبة ثابتة و [[relative]].`,
            R`[[fill]]: الصورة تملا الحاوية، و [[object-cover]] تقص بدل ما تمط. و [[alt=""]] لأنها ديكور.`,
            "قفلة."
          ]
        },
        {
          cmd: "next/font",
          title: "خطوط من غير ما النص يتنطط ومن غير طلب لجوجل",
          desc: R`[[next/font/google]] بينزّل الخط وقت الـ build ويقدّمه من دومينك، فمفيش طلب لـ Google Fonts من متصفح الزائر. وبيعمل خط احتياطي بنفس المقاسات تقريبًا ([[size-adjust]])، فلما الخط الحقيقي يحمّل النص مبيتزقش (CLS).

للعربي: [[Cairo]] أو [[Tajawal]] أو [[IBM Plex Sans Arabic]] مع [[subsets: ["arabic"]]]. واستخدم [[variable]] عشان يبقى CSS variable تربطه بـ Tailwind.`,
          example: R`// app/layout.tsx
import { Cairo, Inter } from "next/font/google";
import localFont from "next/font/local";
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const brand = localFont({ src: "./fonts/Brand.woff2", variable: "--font-brand" });
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={$__bt$__{cairo.variable} $__{inter.variable} $__{brand.variable}$__bt}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
// app/globals.css (Tailwind v4):
// @theme inline { --font-sans: var(--font-cairo), var(--font-inter), sans-serif; }`,
          try: R`افتح الموقع و DevTools > Network > Font: هتلاقي الخطوط جاية من [[/_next/static/media]] مش من [[fonts.gstatic.com]]. وبعدين جرّب [[<link>]] لـ Google Fonts بالطريقة القديمة، وشغّل Network throttling على Slow 4G، وشوف النص بيتنطط لما الخط يحمّل.`,
          flag: "script",
          deep: {
            why: "الخط الخارجي معناه طلب لدومين تاني (DNS و TLS)، والنص بيظهر بخط وبعدين يتبدل بخط مقاساته مختلفة فالسطور تتزق. وجوجل فونتس بيعرف IP كل زائر، ودي مشكلة خصوصية في أوروبا (GDPR).",
            how: R`وقت الـ build، [[next/font/google]] بينزّل ملفات الخط للـ subsets المطلوبة بس ويحطها مع الـ static files، ويولّد [[@font-face]] وكلاس. والخط بيتعمله preload للصفحات اللي بتستخدمه. وكل ده من غير أي طلب لجوجل وقت التشغيل.

الخط الاحتياطي: Next بيحسب [[size-adjust]] و [[ascent-override]] لخط النظام (Arial مثلًا) عشان ياخد نفس مساحة الخط الحقيقي، فلما يتبدل مفيش قفزة.

[[subsets]] بتصغر الملف: خط كامل بكل اللغات ممكن يبقى أضعاف. والخطوط الـ variable (زي Cairo) ملف واحد لكل الأوزان، فمش محتاج [[weight]]، وغير الـ variable لازم تحدد الأوزان.

واعمل الخط مرة واحدة في ملف ([[app/fonts.ts]]) وصدّره، لأن كل استدعاء لـ [[Cairo()]] في مكان جديد بيعمل نسخة جديدة. وربطه بـ Tailwind v4 في تاب «HTML و CSS».`,
            when: "أي مشروع Next فيه خطوط مخصصة. وده الافتراضي في create-next-app (خط Geist).",
            mistakes: R`[[<link href="https://fonts.googleapis.com/...">]] في الـ layout. ونسيان [[subsets: ["arabic"]]] فالعربي يظهر بخط النظام. وتحميل ٦ أوزان مش variable ومش مستخدم غير اتنين. واستدعاء [[Cairo()]] جوه كومبوننت مش على مستوى الملف فيطلع خطأ (لازم const على مستوى الـ module).`
          },
          lines: [
            "خطين من Google Fonts. كل خط بيتعمله import باسمه.",
            "خط محلي (ملف عندك).",
            R`Cairo بالحروف العربي واللاتيني، و CSS variable اسمه [[--font-cairo]].`,
            "Inter للإنجليزي بس.",
            "خط الـ brand من ملف في المشروع.",
            "الـ root layout.",
            "بداية الـ JSX.",
            R`كل [[variable]] بيحط class بيعرّف الـ CSS variable على [[<html>]].`,
            R`[[font-sans]] في Tailwind متربوطة بالـ variables في globals.css (السطرين اللي تحت).`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "next/dynamic",
          title: "تقلل الـ JavaScript اللي بيروح للمتصفح",
          desc: R`كل client component ومكتباته بيتحمّلوا مع الصفحة. [[next/dynamic]] بيفصل كومبوننت تقيل (chart، أو محرر نصوص، أو خريطة) في ملف لوحده بيتحمّل لما يترسم فعلًا، مع loading. و [[ssr: false]] للمكتبات اللي بتلمس [[window]] أول ما تتعمل import (مسموح في client components بس).

وقبل ما تحسّن، قيس: [[npx next experimental-analyze]] (Next 16.1 وأحدث مع Turbopack) بيوريك كل route فيه إيه وحجمه، أو [[@next/bundle-analyzer]] مع webpack.`,
          example: R`// app/dashboard/sales-panel.tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const SalesChart = dynamic(() => import("./sales-chart"), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded bg-gray-100" />,
});
export function SalesPanel({ data }: { data: { day: string; total: number }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen(true)}>اعرض الرسم</button>
      {open && <SalesChart data={data} />}
    </section>
  );
}`,
          try: R`شغّل [[npx next experimental-analyze]] وافتح الصفحة اللي فيها الـ chart وشوف حجم المكتبة. وبعدين حوّل الـ import لـ [[import SalesChart from "./sales-chart"]] عادي وقارن حجم الـ JS بتاع الصفحة. وفي Network اتأكد إن ملف الـ chart بيتحمّل بس لما تضغط الزرار.`,
          flag: "script",
          deep: {
            why: "كل كيلوبايت JS بيتنزّل ويتحلل ويتنفذ على موبايل الزائر قبل ما الصفحة تبقى تفاعلية، وده اللي بيبوّظ INP. مكتبة charts ممكن تبقى ٢٠٠ كيلو، ولو في صفحة ٩٠٪ من الناس مبيفتحوش الرسم فيها، دول ٢٠٠ كيلو ضايعين على الكل.",
            how: R`أكبر مكسب في App Router جاي من Server Components: أي حاجة مش تفاعلية تفضل server، ومكتباتها متروحش للمتصفح أصلًا. بعد كده [[next/dynamic]] للحاجات التفاعلية التقيلة اللي مش ظاهرة أول ما الصفحة تفتح.

[[dynamic(() => import(...))]] بيعمل code splitting: ملف منفصل بيتحمّل أول ما الكومبوننت يترسم. في client component بيترسم على السيرفر عادي (SSR) إلا لو [[ssr: false]]. وفي server component، [[dynamic]] بيقسّم الـ client components اللي جواه بس، و [[ssr: false]] مش مسموح هناك.

المكتبات الكبيرة: [[optimizePackageImports]] في next.config بيخلي [[import { X } from "big-lib"]] يجيب X بس، و Next بيعمله لوحده لمكتبات مشهورة ([[lucide-react]] و [[date-fns]] وغيرهم). ولو مكتبة بتتقل الـ bundle، دوّر على بديل أصغر أو استخدمها في server component.

وفي Next 16 دعم React Compiler بقى stable ([[reactCompiler: true]])، وبيعمل memoization لوحده، بس ده بيقلل الـ re-renders مش حجم الـ JS. وقياس LCP و INP و CLS من زوار حقيقيين في تاب «بناء مشروع كامل».`,
            when: "مكونات تقيلة مش ظاهرة أول ما الصفحة تفتح: charts في تاب، ومحرر rich text، وخرايط، و modals كبيرة، ومكتبات PDF. وقيس قبل وبعد.",
            mistakes: R`[[dynamic]] لكل كومبوننت صغير فالصفحة تعمل ٣٠ طلب. و [[ssr: false]] في server component فيطلع خطأ. و [[ssr: false]] على محتوى مهم للـ SEO فجوجل ميشوفوش في الـ HTML. وتحسّن حجم JS وانت حاطط [[use client]] فوق الصفحة كلها: ابدأ من هنا.`
          },
          lines: [
            R`[[ssr: false]] مسموح بس في client component.`,
            R`[[dynamic]] زي [[React.lazy]] مع Suspense، وفوقهم خيارات Next.`,
            "state.",
            R`[[import()]] جوه دالة: الـ bundler بيعمل ملف JS لوحده للـ chart ومكتبته.`,
            R`متترسمش على السيرفر خالص (المكتبة بتستخدم [[window]] أو canvas).`,
            "مكان بنفس المقاس لحد ما يحمّل، فمفيش قفزة.",
            "قفلة.",
            "اللوحة.",
            "الرسم مقفول في الأول.",
            "بداية الـ JSX.",
            "section.",
            "زرار يفتحه.",
            R`أول مرة [[open]] تبقى true، ملف الـ chart يتحمّل. قبلها صفر bytes منه.`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "CSP والسكربتات الخارجية",
      l: 3,
      n: "CSP بـ nonce من proxy.ts، و next/script لسكربتات الطرف التالت، و analytics بعد موافقة الكوكيز",
      items: [
        {
          cmd: "CSP nonce",
          title: "CSP بـ nonce في proxy.ts: Report-Only الأول وبعدين تقفل",
          desc: R`Content-Security-Policy header بيقول للمتصفح «مفيش script يتنفذ غير اللي أنا سامح بيه». أقوى صيغة: [[script-src 'nonce-XYZ' 'strict-dynamic']]، والـ nonce قيمة عشوائية جديدة مع كل طلب. أي [[<script>]] من غير نفس الـ nonce مبيتنفذش، فحتى لو حد عرف يحقن [[<script>]] في الصفحة (XSS)، هيتقفل.

في Next: [[proxy.ts]] بيولّد الـ nonce، ويحط الـ CSP في الـ request headers (Next بيقراه من هناك) وفي الـ response. و Next بيطلّع الـ nonce من الـ header ويحطه لوحده على كل scripts الـ framework والـ bundles. وابدأ دايمًا بـ [[Content-Security-Policy-Report-Only]]: المتصفح بيبلّغ عن اللي كان هيتقفل من غير ما يقفله، ولما التقارير تنضف تغيّر اسم الـ header.`,
          example: R`// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    $__btscript-src 'self' 'nonce-$__{nonce}' 'strict-dynamic' https:$__{isDev ? " 'unsafe-eval'" : ""}$__bt,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://cdn.example.com",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
  ].join("; ");
  const header = process.env.CSP_ENFORCE === "1" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(header, csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(header, csp);
  return response;
}
export const config = {
  matcher: [{
    source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    missing: [{ type: "header", key: "next-router-prefetch" }, { type: "header", key: "purpose", value: "prefetch" }],
  }],
};`,
          try: R`حط الـ proxy ده، واعمل [[npm run build && npm start]]، وشوف [[curl -sI localhost:3000]]: فيه [[content-security-policy-report-only]]؟ اعمل View Source ودوّر على [[nonce=]]: مين عليه nonce؟ وبعدين حط في صفحة [[<script dangerouslySetInnerHTML={{ __html: "console.log('inline')" }} />]] وافتح الـ Console. وآخر حاجة: شغّل بـ [[CSP_ENFORCE=1]] وجرّب نفس الصفحة، وجرّب صفحة static (مفيهاش حاجة dynamic خالص).`,
          flag: "script",
          deep: {
            why: R`الـ CSP هو خط الدفاع التاني ضد XSS: تاب «الأمان» بيقول إن الـ escaping هو الأول، بس أي [[dangerouslySetInnerHTML]] أو مكتبة markdown فيها ثغرة أو سكربت طرف تالت مخترق كفاية. سياسة allowlist قديمة ([[script-src 'self' https://cdn.x.com]]) طلعت ضعيفة: أي JSONP أو ملف قديم على الدومين المسموح بيعدّيها. الـ nonce بيقلب الفكرة: مش «الدومينات دي مسموحة»، لكن «السكربتات اللي أنا حاطتها بإيدي في الطلب ده بس».`,
            how: R`الـ nonce لازم يبقى غير متوقع وجديد مع كل طلب، عشان كده في الـ proxy مش في [[next.config]]. Next وقت الـ SSR بيقرا [[Content-Security-Policy]] (أو [[-Report-Only]]) من الـ request headers، ويطلّع القيمة من [[script-src]] (أو [[default-src]])، ويحطها على scripts الـ framework والـ chunks والـ inline scripts بتاعته، وعلى أي [[<Script nonce>]]. و [[x-nonce]] عشان انت تقراه بـ [[headers()]] وتبعته لـ [[next/script]] أو [[GoogleAnalytics]].

[[strict-dynamic]]: أي script عليه nonce يقدر يحمّل scripts تانية (ده اللي بيعمله Next مع الـ chunks، و Google Tag Manager، و Stripe.js)، والمتصفح بيتجاهل الـ allowlists و [[self]] و [[https:]]. الاتنين دول موجودين بس fallback للمتصفحات القديمة اللي مبتفهمش strict-dynamic.

إيه اللي بيتكسر:
١- أي [[<script>]] inline من غير nonce: سكربت الـ dark mode اللي بيتحط في الـ layout، أو snippet الـ analytics المنسوخ. الحل: [[<Script nonce>]] أو تقرا [[x-nonce]] وتحطه على الـ tag.
٢- [[onclick="..."]] كـ HTML attribute و [[javascript:]] links (الـ onClick بتاع React مش مشكلة).
٣- سكربتات بتستخدم [[eval]] أو [[new Function]]، أو tag managers فيها «Custom HTML» بتحقن scripts من غير nonce.
٤- الطرف التالت محتاج أكتر من script-src: Stripe محتاج [[frame-src https://js.stripe.com https://hooks.stripe.com]] و [[connect-src https://api.stripe.com]]، و GA محتاج [[connect-src]] لدومينات google-analytics. التقارير هي اللي هتقولك.
٥- الـ style: [[style-src]] بـ nonce بيقفل [[style="..."]] attributes اللي بتطلع في الـ HTML (زي اللي next/image بيطلّعها مع fill)، والـ nonce مبيتطبقش على attributes. عشان كده [[unsafe-inline]] للـ style هو الحل العملي، وخطره أقل بكتير من الـ scripts.

التكلفة الكبيرة: الـ nonce بيتحط وقت الـ render، فكل الصفحات لازم dynamic. الصفحة الـ static اتعملت وقت الـ build من غير nonce، فأول ما تقفل، الـ scripts بتاعتها تتقفل والصفحة تبقى من غير تفاعل. وده معناه مفيش static ولا ISR ولا CDN caching للـ HTML، والوثائق بتقول صراحة إن Partial Prerendering (الـ static shell بتاع Cache Components) مش متوافق مع nonce. البديل لو محتاج static: CSP من غير nonce في [[headers()]] بتاع next.config، أو SRI التجريبي ([[experimental.sri]]).

وفي dev لازم [[unsafe-eval]] لأن React بيستخدم eval لرسايل الأخطاء، ومش محتاجه في الإنتاج.`,
            when: R`تطبيقات فيها بيانات حساسة (دفع، وحسابات، ولوحات أدمن) أو فيها محتوى من المستخدمين بيتعرض كـ HTML، أو compliance بيطلب CSP صارم. لموقع تسويقي static كله، CSP من next.config من غير nonce أنسب. وابدأ Report-Only أسبوع أو اتنين على الإنتاج قبل ما تقفل.`,
            mistakes: R`تقفل على طول من غير Report-Only فالـ checkout يقع يوم الإطلاق. وتحط الـ CSP على الـ response بس فـ Next ميعرفش الـ nonce ومفيش script عليه nonce. و nonce ثابت أو [[Math.random()]]. وتسيب صفحات static وتستغرب إنها بقت ميتة بعد ما قفلت. و [[unsafe-inline]] في [[script-src]] مع nonce (المتصفحات الحديثة بتتجاهله لما فيه nonce، بس ده معناه إنك مش فاهم السياسة). وتنسى [[frame-ancestors]] أو [[object-src 'none']]. وفي الانترفيو: «ليه nonce أحسن من allowlist؟» و «ليه الـ CSP مش بديل عن الـ escaping؟».`
          },
          lines: [
            R`[[NextResponse]] للرد و [[NextRequest]] نوع الطلب.`,
            R`الـ proxy (في Next 15 كان [[middleware]]).`,
            R`nonce جديد مع كل طلب: UUID عشوائي من [[crypto]] ومحوّل base64.`,
            R`dev؟ React محتاج [[unsafe-eval]] هناك بس.`,
            "السياسة كـ array عشان تبقى مقروءة...",
            "أي نوع مش متحدد: من نفس الدومين بس.",
            R`الـ scripts: اللي عليها الـ nonce، والسكربتات اللي هي بتحمّلها ([[strict-dynamic]]). و [[self]] و [[https:]] للمتصفحات القديمة بس.`,
            R`الـ style: [[unsafe-inline]] عشان [[style=""]] attributes (الـ nonce مبيغطيهاش).`,
            "الصور: الموقع و blob و data و الـ CDN.",
            R`fetch و WebSocket لنفس الدومين. هتزود عليه دومينات الـ analytics و Stripe.`,
            R`مفيش [[<object>]] ولا [[<embed>]] خالص.`,
            R`يمنع [[<base>]] المحقون من تغيير كل الـ URLs النسبية.`,
            "الفورمات تتبعت لنفس الموقع بس.",
            "محدش يحط الموقع في iframe (clickjacking).",
            R`فين تتبعت التقارير (route handler بيعمل log). الأحدث [[report-to]] مع [[Reporting-Endpoints]].`,
            "...ونجمعها بـ ; .",
            R`Report-Only افتراضيًا، والقفل بمتغير بيئة لما التقارير تنضف.`,
            "نسخة من headers الطلب.",
            R`[[x-nonce]] عشان server components تقراه بـ [[headers()]].`,
            R`الـ CSP في الطلب نفسه: من هنا Next بيعرف الـ nonce ويحطه على scripts بتاعته.`,
            "كمّل بالـ headers الجديدة.",
            "والـ CSP في الرد: ده اللي المتصفح بينفّذه.",
            "رجّع.",
            "قفلة.",
            "الـ matcher.",
            "مصفوفة.",
            "كل الصفحات ما عدا الـ API والملفات الثابتة.",
            R`ومش على طلبات الـ prefetch: مش محتاجة CSP ولا nonce.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[curl -sI]] بيطلّع [[content-security-policy-report-only: default-src 'self'; script-src 'self' 'nonce-...' 'strict-dynamic' https:; ...]]، والـ nonce بيتغير مع كل طلب.

في View Source: كل [[<script src="/_next/static/chunks/...">]] و الـ inline scripts بتاعة Next عليهم [[nonce="..."]] (القيمة نفسها اللي في الـ header). الـ script اللي كتبته بـ [[dangerouslySetInnerHTML]] هو الوحيد اللي مفيش عليه nonce. (وفي DevTools > Elements ممكن تلاقي الـ nonce فاضي: المتصفحات بتخبي قيمته من الـ DOM عمدًا لما يكون فيه CSP، عشان سكربت محقون ميقراهاش. استخدم View Source.)

في Report-Only: الـ console بيطبع [[inline]] عادي، وجنبه رسالة [[Report Only]] إنه كان هيتقفل، وطلب POST لـ [[/api/csp-report]] (404 لو لسه معملتش الـ route، ومش مشكلة).

بـ [[CSP_ENFORCE=1]]: الـ [[inline]] مبيطبعش، والرسالة بقت «Refused to execute inline script». وباقي الصفحة شغالة لأن scripts Next عليها nonce. والصفحة الـ static: لو [[npm run build]] علّمها ○ (Static)، الـ HTML بتاعها اتعمل من غير nonce، فكل الـ scripts اتقفلت والزراير مبتعملش حاجة. الحل: [[await connection()]] أو قراية [[headers()]] في الـ root layout عشان كل الصفحات تبقى ƒ.

الغلط الشائع: تحط الـ header على الـ response بس، فمتلاقيش [[nonce=]] في أي حتة والصفحة كلها تتقفل.`,
          solCode: R`// app/api/csp-report/route.ts
export async function POST(request: Request) {
  const body = await request.text();
  console.warn("[csp]", request.headers.get("content-type"), body.slice(0, 2000));
  return new Response(null, { status: 204 });
}
// app/layout.tsx: قراية x-nonce بتخلي كل الصفحات dynamic، والـ nonce متاح لأي Script
import { headers } from "next/headers";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body data-nonce-ready={nonce ? "yes" : "no"}>{children}</body>
    </html>
  );
}`
        },
        {
          cmd: "next/script",
          title: "سكربتات الطرف التالت بـ next/script: امتى تحمّل كل واحد",
          desc: R`[[<Script>]] من [[next/script]] بيحمّل سكربت خارجي مرة واحدة حتى لو الكومبوننت اترسم كذا مرة، ويحدد إمتى بـ [[strategy]]:
[[afterInteractive]] (الافتراضي): بعد ما جزء من الصفحة يعمل hydration. للـ analytics و tag managers.
[[lazyOnload]]: وقت فراغ المتصفح بعد ما كل حاجة تحمّل. للشات، وأزرار السوشيال، والـ widgets.
[[beforeInteractive]]: في الـ [[<head>]] قبل كود Next، ومكانه الـ root layout بس. لحاجات نادرة جدًا (bot detection أو consent manager).
[[worker]]: تجريبي و بـ Partytown، والوثائق بتقول إنه لسه مبيشتغلش مع App Router، فمتعتمدش عليه.

و [[onLoad]] و [[onReady]] و [[onError]] في client components بس. والـ inline script لازم [[id]].`,
          example: R`// app/layout.tsx
import Script from "next/script";
import { headers } from "next/headers";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Script src="https://plausible.io/js/script.js" data-domain="books.example.com" strategy="afterInteractive" nonce={nonce} />
        <Script src="https://widget.example-chat.com/loader.js" strategy="lazyOnload" nonce={nonce} />
      </body>
    </html>
  );
}
// app/stores/map.tsx
"use client";
import Script from "next/script";
export function StoresMap() {
  return (
    <>
      <div id="map" className="h-96" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" onReady={() => drawMap("map")} onError={() => console.error("الخريطة محمّلتش")} />
    </>
  );
}`,
          try: R`حط سكربت الشات بـ [[<script src>]] عادي في الـ layout وشغّل Lighthouse على موبايل وسجّل الـ Total Blocking Time. وبعدين غيّره لـ [[<Script strategy="lazyOnload">]] وقارن. وفي Network > JS اتفرج على ترتيب التحميل للاستراتيجيتين. وآخر حاجة: روح لصفحة الخريطة، ورجع للرئيسية، وارجع للخريطة: [[onReady]] اتنادى كام مرة؟ والسكربت اتحمّل كام مرة؟`,
          flag: "script",
          deep: {
            why: "سكربتات الطرف التالت (analytics و pixels و chat و A/B testing) من أكبر أسباب إن INP و LCP وحشين، وأغلب المواقع اللي «بطيئة من غير سبب» فيها ٨ سكربتات متحطة في الـ head. انت مش متحكم في الكود ده، بس متحكم إمتى يتحمّل وإنه ميتحمّلش مرتين.",
            how: R`[[afterInteractive]] و [[lazyOnload]] بيتحطوا من الـ client: Next بيضيف الـ [[<script>]] للـ DOM بعد الـ hydration أو في [[requestIdleCallback]] بعد الـ load، فمبيعطلوش رسم الصفحة. وبيتسجلوا بالـ src (أو الـ id)، فلو الكومبوننت اترسم تاني في تنقل، السكربت مبيتحمّلش تاني.

[[onLoad]] بيتنادى مرة واحدة لما السكربت يحمّل. [[onReady]] بيتنادى أول مرة وكل ما الكومبوننت يتركّب تاني (بعد تنقل)، وده المطلوب للخرايط والـ widgets اللي محتاجة تتعمل على div جديد. والاتنين محتاجين [[use client]] لأنهم دوال.

[[beforeInteractive]] بيتحط في الـ HTML من السيرفر في الـ head، ومبيتنفذش تاني في التنقل. واستخدامه تقريبًا دايمًا غلط: بيأخر كل حاجة.

CSP: مع nonce لازم تبعت [[nonce]] لكل [[<Script>]]، وبـ [[strict-dynamic]] أي سكربت يحمّله هو بيعدّي.

و [[@next/third-parties]] (لسه experimental) فيه [[GoogleAnalytics]] و [[GoogleTagManager]] و [[YouTubeEmbed]] و [[GoogleMapsEmbed]] جاهزين بالاستراتيجية الصح. و JSON-LD مش سكربت بيتنفذ، فمكانه [[<script type="application/ld+json">]] عادي (درس JSON-LD).`,
            when: R`[[afterInteractive]] للـ analytics اللي محتاج أول page view. [[lazyOnload]] لأي حاجة المستخدم مش محتاجها أول ثانيتين. وحط السكربت في الـ layout أو الصفحة اللي محتاجاه بس، مش في الـ root layout لكل الموقع: خريطة الفروع مالهاش لازمة في صفحة الـ checkout.`,
            mistakes: R`[[<script>]] عادي في الـ layout فيتحمّل ويتنفذ مع كل تنقل أو يعطل الـ render. و [[beforeInteractive]] للـ analytics. و [[onLoad]] في server component فيطلع خطأ. و [[onLoad]] لحاجة محتاجة تتعمل بعد كل تنقل (الصح [[onReady]]). و inline [[<Script>]] من غير [[id]]. و [[strategy="worker"]] في App Router. وتحط ١٠ tags في GTM وتقيس الأداء من غيرهم.`
          },
          lines: [
            "الكومبوننت.",
            "عشان الـ nonce.",
            "الـ root layout.",
            "الـ nonce من الـ proxy (لو مفيش CSP بيبقى undefined وده عادي).",
            "بداية الـ JSX.",
            "html.",
            "body.",
            "الصفحة.",
            R`analytics بعد الـ hydration، و [[data-domain]] بيتنقل للـ tag زي أي attribute.`,
            "الشات في وقت الفراغ بعد ما الصفحة كلها تحمّل.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`[[onReady]] دالة، فلازم client component.`,
            "الكومبوننت.",
            "الخريطة.",
            "بداية الـ JSX.",
            "Fragment.",
            "المكان اللي الخريطة هتترسم فيه.",
            R`[[onReady]]: أول مرة وكل ما الكومبوننت يتركّب تاني. [[onError]]: السكربت متحمّلش (adblock أو شبكة).`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بـ [[<script src>]] عادي في الـ head: الـ Total Blocking Time أعلى، والسكربت بيتحمّل بدري بيزاحم الـ JS بتاع الصفحة. بـ [[lazyOnload]]: في Network هتلاقيه آخر حاجة، بعد الـ chunks والصور وبعد حدث [[load]]، والـ TBT بيقل (الرقم نفسه بيختلف حسب السكربت والجهاز، المهم الاتجاه). و [[afterInteractive]] بيظهر بعد الـ chunks الأساسية وقبل الـ lazy.

الخريطة: السكربت اتحمّل مرة واحدة بس (هتلاقي طلب واحد لـ leaflet.js في Network طول الجلسة)، و [[onReady]] اتنادى مرتين: مرة أول ما حمّل، ومرة لما رجعت للصفحة، ودي اللحظة اللي محتاج ترسم فيها الخريطة على الـ div الجديد. لو كنت استخدمت [[onLoad]]، الخريطة كانت هتظهر أول مرة بس، وبعد الرجوع الـ div فاضي.

الغلط الشائع: تشوف leaflet.js مش بيتحمّل تاني وتفتكر إن فيه مشكلة كاش.`
        },
        {
          cmd: "analytics و consent",
          title: "analytics بعد موافقة الكوكيز: متحمّلش التتبع قبل ما المستخدم يوافق",
          desc: R`في أوروبا (GDPR و ePrivacy) وقوانين تانية كتير، كوكيز التتبع و pixels الإعلانات محتاجة موافقة قبل ما تتحط. «قبل» معناها السكربت نفسه ميتحمّلش، مش إنه يتحمّل وانت تخبي البانر.

الطريقة في Next: الموافقة في cookie ([[consent=granted]] أو [[denied]]). الـ root layout بيقراها بـ [[cookies()]]: لو موافق يرسم [[<GoogleAnalytics>]]، ولو لسه مردش يرسم البانر، ولو رفض ولا ده ولا ده. والبانر بينادي Server Action بتكتب الـ cookie، و Next بيعيد رسم الصفحة لوحده بعد أي تغيير في الـ cookies من action.`,
          example: R`// app/actions/consent.ts
"use server";
import { cookies } from "next/headers";
export async function setConsent(choice: "granted" | "denied") {
  (await cookies()).set("consent", choice, { maxAge: 60 * 60 * 24 * 180, sameSite: "lax", path: "/" });
}
// app/consent-banner.tsx
"use client";
import { setConsent } from "@/app/actions/consent";
export function ConsentBanner() {
  return (
    <div role="dialog" aria-label="الكوكيز" className="fixed inset-x-0 bottom-0 bg-white p-4 shadow">
      <p>بنستخدم Google Analytics عشان نعرف أنهي صفحات بتتقري. موافق؟</p>
      <button onClick={() => setConsent("granted")}>موافق</button>
      <button onClick={() => setConsent("denied")}>لأ، شكرًا</button>
    </div>
  );
}
// app/layout.tsx
import { cookies, headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ConsentBanner } from "./consent-banner";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const consent = (await cookies()).get("consent")?.value;
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        {consent === "granted" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} nonce={nonce} />}
        {consent === undefined && <ConsentBanner />}
      </body>
    </html>
  );
}`,
          try: R`[[npm i @next/third-parties]]، وحط الملفات، وافتح الموقع في نافذة Incognito ومعاك Network مفلتر على [[google]]: فيه أي طلب قبل ما تدوس؟ دوس «لأ، شكرًا» واعمل refresh. امسح الـ cookie من DevTools ودوس «موافق»: إيه اللي اتحمّل ومن غير refresh؟ وآخر حاجة: فين المستخدم يغيّر رأيه بعدين؟ ضيف لينك «إعدادات الكوكيز» في الـ footer.`,
          flag: "script",
          deep: {
            why: R`الـ analytics بيتطلب في كل مشروع تقريبًا، وأشهر غلطة إنه يتحمّل في الـ layout من أول ثانية والبانر مجرد ديكور. ده مخالف للقانون في أوروبا (وفيه غرامات حقيقية)، وكمان بيخسرك أداء على ناس رافضين أصلًا. ولما القرار على السيرفر، الـ HTML نفسه مفيهوش السكربت، فمفيش حتى طلب واحد يتبعت قبل الموافقة.`,
            how: R`الـ layout بيقرا [[cookies()]]، فكل الصفحات بقت dynamic (لو عندك CSP بـ nonce هي كده كده dynamic). والـ Server Action اللي بتعمل [[cookies().set]]: Next بيعيد رسم الـ route الحالي في نفس الرد، فالبانر بيختفي و [[<GoogleAnalytics>]] بيظهر ويحمّل السكربت من غير refresh.

[[GoogleAnalytics]] من [[@next/third-parties/google]] بيحمّل [[gtag.js]] بعد الـ hydration، وبياخد [[nonce]]، وفيه [[sendGAEvent]] للأحداث. والـ page views في التنقل بتتسجل لوحدها من history events (لازم «Enhanced measurement» شغال في لوحة GA).

Google Consent Mode v2: بديل إنك «متحمّلش خالص». بتحمّل gtag بـ [[gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" })]]، فمبيحطش كوكيز وبيبعت pings من غير هوية، وبعد الموافقة [[gtag("consent", "update", ...)]]. ده اللي جوجل بيطلبه للإعلانات في أوروبا، بس لسه بيبعت طلبات قبل الموافقة، فراجع مع اللي مسؤول عن الخصوصية. ولو المشروع كبير، CMP جاهز (Cookiebot أو OneTrust أو Klaro).

والبديل الأبسط: analytics من غير كوكيز (Plausible أو Umami أو Vercel Analytics)، وناس كتير بتعتبرها مش محتاجة بانر، بس ده قرار قانوني مش تقني.

الـ cookie نفسها: مش httpOnly مش مشكلة هنا، ومدتها ٦ شهور تقريبًا عشان تسأل تاني. ولازم طريقة يغيّر بيها رأيه (زرار في الـ footer بيمسح الـ cookie).`,
            when: R`أي موقع فيه analytics بكوكيز أو pixels إعلانات (Meta و TikTok و Google Ads) وزواره ممكن يكونوا من أوروبا أو أي مكان عنده قانون مشابه. لو الـ analytics من غير كوكيز ومن غير بيانات شخصية، البانر غالبًا مش ضروري، بس اتأكد.`,
            mistakes: R`السكربت في الـ layout والبانر بيخبي نفسه بس. و «رفض» بيخفي البانر ومبيحفظش الرفض فيطلع تاني كل صفحة. وزرار «موافق» كبير و «رفض» مستخبي في إعدادات (ده في حد ذاته مخالف في أوروبا). وتقرا الـ consent في client component بـ [[document.cookie]] جوه [[useEffect]] فالصفحة ترسم وبعدين تحمّل، ويطلع hydration mismatch. وتحط GA و GTM الاتنين فكل page view يتحسب مرتين. وتنسى الـ nonce لما يكون فيه CSP.`
          },
          lines: [
            "Server Action.",
            "الـ cookies.",
            R`بتاخد الاختيار بنوع محدد، فمحدش يبعت قيمة غريبة من الـ client.`,
            R`تكتب الـ cookie ٦ شهور. أي كتابة cookies من action بتعيد رسم الصفحة.`,
            "قفلة.",
            "البانر محتاج onClick.",
            "الـ action.",
            "الكومبوننت.",
            "بداية الـ JSX.",
            R`[[role="dialog"]] و [[aria-label]] عشان قارئ الشاشة يعرف ده إيه.`,
            "الرسالة: بتقول بالظبط إيه اللي بيتحمّل.",
            "موافق: الـ action يكتب الـ cookie والصفحة تتعاد.",
            "رفض بنفس الحجم والمكان.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "الـ cookies والـ headers.",
            R`الكومبوننت الجاهز من [[@next/third-parties]].`,
            "البانر.",
            "الـ root layout.",
            R`الموافقة: [[granted]] أو [[denied]] أو [[undefined]] (لسه مردش).`,
            "الـ nonce لو فيه CSP.",
            "بداية الـ JSX.",
            "html.",
            "body.",
            "الصفحة.",
            R`موافق بس؟ ارسم GA، فيتحمّل [[gtag.js]]. غير كده السكربت مش موجود في الـ HTML أصلًا.`,
            R`لسه مردش؟ البانر. ولو رفض، ولا ده ولا ده.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`في Incognito قبل ما تدوس: Network مفلتر على google فاضي خالص، و View Source مفيهوش [[googletagmanager]]. البانر ظاهر.

بعد «لأ، شكرًا»: البانر اختفى (الصفحة اتعاد رسمها من الـ action)، وفي Cookies هتلاقي [[consent=denied]]، وبعد refresh مفيش بانر ولا طلبات لجوجل.

بعد ما تمسح الـ cookie وتدوس «موافق»: من غير refresh هتلاقي طلب لـ [[googletagmanager.com/gtag/js?id=G-...]] وبعده طلبات [[collect]] لـ google-analytics، والبانر اختفى. ده لأن كتابة الـ cookie في الـ Server Action خلّت Next يرسم الـ layout تاني بـ [[consent === "granted"]].

إعدادات الكوكيز: زرار في الـ footer (client component) بينادي action بتعمل [[(await cookies()).delete("consent")]]، فالبانر يرجع. ولو المستخدم كان موافق وغيّر لرفض، [[gtag.js]] المحمّل مش هيختفي من الصفحة الحالية، فالأسلم [[window.location.reload()]] بعد الرفض. وكوكيز GA نفسها ([[_ga]]) بتتحط غالبًا على الدومين الأب ([[.example.com]])، فمسحها لازم يبقى بنفس الـ domain، وإلا بتفضل لحد ما تخلص.

الغلط الشائع: تختبر في نافذة عادية فيها consent قديمة وتفتكر إن GA بيتحمّل قبل الموافقة.`,
          solCode: R`// app/actions/consent.ts (زيادة)
export async function resetConsent() {
  (await cookies()).delete("consent");
}
// app/cookie-settings-link.tsx
"use client";
import { resetConsent } from "@/app/actions/consent";
export function CookieSettingsLink() {
  return <button onClick={async () => { await resetConsent(); window.location.reload(); }}>إعدادات الكوكيز</button>;
}`
        }
      ]
    },
    {
      t: "النشر",
      l: 3,
      n: "تختار تنشر فين، ومتغيرات البيئة وقت الـ build ووقت التشغيل، و Next على أكتر من نسخة، والترقية",
      items: [
        {
          cmd: "فين تنشر",
          title: "تنشر Next فين: Vercel ولا VPS ولا Docker ولا static؟",
          desc: R`٤ طرق: Vercel (أسهل حاجة، وكل ميزة شغالة من غير إعداد، والتفاصيل والحدود في تاب «Cloud و DevOps»). أو VPS بـ [[next build]] و [[next start]] ورا Nginx و PM2 (تاب «VPS» وتاب «Nginx»). أو Docker بـ [[output: "standalone"]] (تاب «Docker»). أو [[output: "export"]]: ملفات HTML static بتترفع على أي hosting، بس من غير سيرفر.

الـ static export بيمنع كل حاجة محتاجة سيرفر: Server Actions، و proxy، و Route Handlers غير الـ GET الثابتة، والصفحات الـ dynamic، و ISR، و image optimization الافتراضي.`,
          example: R`npm run build
npm start -- -p 3000
pm2 start npm --name shop -- start
npx vercel --prod
# Docker: output "standalone" في next.config (تاب Docker)
# static: output "export" والناتج في فولدر out
npx serve out`,
          try: R`اعمل build و start لمشروع الـ lab على جهازك. وبعدين جرّب [[output: "export"]] في next.config واعمل build: لو فيه Server Action أو صفحة بتقرا cookies هتلاقي خطأ بيقولك إيه اللي مش مدعوم. وافتح فولدر [[out]] وبص على الملفات.`,
          deep: {
            why: "Next مش ملفات static بس: فيه سيرفر Node بيرسم الصفحات وينفّذ الـ actions ويحوّل الصور ويخزّن الكاش. فالمكان اللي هتنشر فيه بيحدد إيه اللي هيشتغل وبكام، والاختيار الغلط بيبان بعد الإطلاق.",
            how: R`Vercel: الشركة اللي بتعمل Next، فكل ميزة جديدة شغالة يوم نزولها: CDN، و functions، و ISR موزّع، و preview لكل PR. العيب: السعر مع الترافيك العالي، وحدود الـ functions (المدة وحجم الطلب)، ومش مناسب لشغل طويل أو WebSockets.

VPS (أو أي سيرفر Node): [[next start]] سيرفر كامل، كل الميزات شغالة. انت مسؤول عن HTTPS و Nginx والـ restart والـ logs والـ scaling، ومناسب جدًا لمشروع متوسط بتكلفة ثابتة. و Next 16 محتاج Node 20.9 على الأقل.

Docker: نفس الـ VPS بس في image، و [[standalone]] بيصغّرها جدًا. ومناسب لـ Kubernetes و ECS و Fly و Railway.

Static export: [[next build]] بيطلّع [[out/]] فيه HTML لكل صفحة، بيترفع على S3 أو GitHub Pages أو أي CDN (تاب «Cloud و DevOps»). مناسب لمواقع محتوى أو docs أو landing من غير login. و [[next/image]] محتاج [[unoptimized: true]] أو loader خارجي.

وفيه adapters لمنصات تانية (Netlify و Cloudflare عن طريق OpenNext)، وفي Next 16 بدأ Build Adapters API (تجريبي) عشان المنصات تدعم Next رسميًا. بس دايمًا اختبر الميزات اللي بتستخدمها (ISR والـ proxy والصور) على المنصة دي بالذات.`,
            when: "Vercel لفريق صغير عايز يركز على المنتج أو MVP. VPS أو Docker لما التكلفة تفرق أو محتاج تحكم (نفس السيرفر فيه API وداتابيز). و static export لموقع ملوش أي حاجة dynamic.",
            mistakes: R`[[next dev]] على السيرفر «عشان الأخطاء تبان». و static export وبعدين تكتشف إن الفورم محتاج Server Action. و Next مكشوف على بورت 3000 للإنترنت من غير Nginx و HTTPS. و build على VPS فيه ١ جيجا رام فيقع (ابني في CI، أو زوّد swap، تاب «Node و npm»).`
          },
          lines: [
            R`ابني. نفس الأمر في كل الطرق (تفاصيل الجدول في تاب «Node و npm»).`,
            "شغّل على بورت 3000. على VPS بيبقى ورا Nginx مش مكشوف مباشرة.",
            R`خليه شغال بعد ما تقفل الـ SSH ويقوم لوحده لو وقع (PM2 في تاب «VPS»).`,
            "أو ارفع على Vercel من الترمنال (أو اربط الـ repo وكل push بيعمل deploy).",
            R`لو [[output: "export"]]: جرّب فولدر [[out]] محليًا بأي static server.`
          ]
        },
        {
          cmd: "env في Next",
          title: "متغيرات البيئة: وقت الـ build ولا وقت التشغيل؟",
          desc: R`Next بيقرا [[.env]] و [[.env.local]] و [[.env.production]] و [[.env.development]] لوحده من غير dotenv. [[.env.local]] للأسرار على جهازك ومبيترفعش على git، و [[.env]] للقيم الافتراضية اللي مش سرية.

المهم: [[NEXT_PUBLIC_*]] بتتكتب جوه الـ JS وقت الـ build، فتغييرها محتاج build جديد. والمتغيرات التانية بتتقري على السيرفر وقت التشغيل، بس لو صفحة static اتبنت وقت الـ build بتستخدم متغير، القيمة اللي كانت وقت الـ build هي اللي في الـ HTML.`,
          example: R`# .env.local (مبيترفعش)
DATABASE_URL="postgresql://app:secret@localhost:5432/shop"
SESSION_SECRET="change-me-32-random-bytes-base64"
# .env (بيترفع، قيم عامة)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
// lib/env.ts
import "server-only";
import * as z from "zod";
export const env = z.object({ DATABASE_URL: z.url(), SESSION_SECRET: z.string().min(32) }).parse(process.env);
// أي client component
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const bad = process.env["NEXT_PUBLIC_" + "SITE_URL"];`,
          try: R`حط [[NEXT_PUBLIC_SITE_URL]] واعمل build، وبعدين غيّرها في [[.env]] واعمل [[npm start]] من غير build: القيمة القديمة لسه في المتصفح. وبعدين اعمل صفحة static بتعرض [[process.env.GREETING]]، واعمل build، وغيّر GREETING وشغّل start: الصفحة لسه بالقديم لأنها اتبنت. خليها dynamic (بـ [[await connection()]] من [[next/server]] في أولها) وجرّب تاني.`,
          flag: "script",
          deep: {
            why: "«غيّرت المتغير على السيرفر وعملت restart والموقع لسه بالقيمة القديمة» من أشهر المشاكل في Next. السبب إن فيه وقتين مختلفين: الـ build والتشغيل، وكل متغير بيتقري في وقت منهم حسب هو فين وإزاي بيتستخدم.",
            how: R`ترتيب القراية (الأعلى بيكسب): [[process.env]] الحقيقي من النظام، وبعدين [[.env.$(NODE_ENV).local]]، وبعدين [[.env.local]] (مش بيتقري في test)، وبعدين [[.env.$(NODE_ENV)]]، وبعدين [[.env]]. و [[next dev]] بيبقى development، و [[next build]] و [[next start]] production.

[[NEXT_PUBLIC_]]: وقت الـ build بيتبدل نصيًا في كود المتصفح وكود السيرفر. فالـ Docker image اللي اتبنت بـ [[NEXT_PUBLIC_API_URL]] بتاع staging هتفضل staging في الإنتاج. لو محتاج نفس الـ image لكذا بيئة، اقرا القيمة على السيرفر وعدّيها للـ client (prop أو context)، أو اعمل route بيرجّع config.

المتغيرات العادية: بتتقري من [[process.env]] على السيرفر وقت تنفيذ الكود. في صفحة dynamic ده مع كل طلب. في صفحة static الكود اتنفذ وقت الـ build وخلاص.

والأسرار في Docker: وقت التشغيل من env_file أو secrets، مش [[ARG]] في الـ build (بتتحفظ في طبقات الـ image، تاب «Docker»). وفحص المتغيرات بـ Zod (أو t3-env اللي بيفصل server و client) في تاب «TypeScript».`,
            when: R`كل مشروع. واعمل [[.env.example]] فيه أسماء المتغيرات من غير قيم وارفعه، عشان اللي يعمل clone يعرف محتاج إيه.`,
            mistakes: R`ترفع [[.env.local]] على git. وتحط سر في [[NEXT_PUBLIC_]]. وتغيّر [[NEXT_PUBLIC_]] على السيرفر من غير build. وتعمل [[const { API_KEY } = process.env]] في client component وتستغرب إنه undefined. وتبعت كل المتغيرات كـ build args في Docker.`
          },
          lines: [
            "رابط الداتابيز: سر، على جهازك بس.",
            "سر الـ sessions.",
            "عام: بيتحط في الـ JS وقت الـ build، وأي حد يقدر يشوفه.",
            "الأسرار في ملف سيرفر بس.",
            "Zod.",
            "افحص المتغيرات مرة واحدة أول ما السيرفر يقوم: لو حاجة ناقصة يقع برسالة واضحة، مش بعد ساعة في نص طلب.",
            "في المتصفح: Next بدّل السطر ده بالقيمة الحرفية وقت الـ build.",
            R`مش هيشتغل: Next بيدوّر على [[process.env.NEXT_PUBLIC_X]] مكتوبة بالنص، فالاسم المركّب بيطلع undefined.`
          ]
        },
        {
          cmd: "أكتر من نسخة",
          title: "Next على أكتر من سيرفر: الكاش ومفتاح الـ actions والـ streaming",
          desc: R`على Vercel ده محلول. لما تنشر بنفسك أكتر من نسخة ورا load balancer (أو حتى نسخة واحدة ورا Nginx)، فيه ٣ حاجات لازم تظبطها. الكاش (ISR و [[use cache]]): كل نسخة ليها واحد في الذاكرة والديسك، فمحتاج cache handler مشترك (Redis). ومفتاح تشفير الـ Server Actions لازم يبقى واحد في كل النسخ والـ builds ([[NEXT_SERVER_ACTIONS_ENCRYPTION_KEY]]). و [[deploymentId]] عشان المتصفح اللي فاتح نسخة قديمة وقت الـ deploy يعرف إن فيه جديدة.

ولو Nginx قدام Next، الـ buffering بيبوّظ الـ streaming: header [[X-Accel-Buffering: no]] من Next بيحلها.`,
          example: R`// next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  deploymentId: process.env.GIT_SHA,
  async headers() {
    return [{ source: "/:path*{/}?", headers: [{ key: "X-Accel-Buffering", value: "no" }] }];
  },
};
export default nextConfig;
# في CI: المفتاح بيتعمل مرة واحدة ويتحفظ secret، وكل build بيستخدمه
openssl rand -base64 32
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$ACTIONS_KEY" GIT_SHA=$(git rev-parse --short HEAD) npm run build`,
          try: R`شغّل نسختين من نفس المشروع على بورتين ([[PORT=3001 node server.js]] و [[PORT=3002]]) واعمل صفحة ISR فيها وقت الرسم. اعمل [[revalidatePath]] من نسخة وافتح التانية: لسه قديمة، لأن كل نسخة ليها كاش. وبعدين جرّب صفحة فيها Suspense بطيء من ورا Nginx من غير الـ header وشوف الصفحة كلها بتستنى.`,
          flag: "script",
          deep: {
            why: "كل حاجة شغالة على نسخة واحدة على جهازك، وبعد ما تكبّر لنسختين: الأدمن يعدّل منتج والزوار يشوفوا القديم نص الوقت، ومستخدمين يلاقوا «Failed to find Server Action» بعد كل deploy، وصفحات الـ streaming بتستنى كلها مرة واحدة ورا Nginx.",
            how: R`الكاش: Next بيحفظ ISR والـ fetch cache في الذاكرة و [[.next/cache]]. في النموذج القديم [[cacheHandler]] (مفرد) في next.config بيشاور على ملف بيخزّن في Redis أو غيره، و [[cacheMaxMemorySize: 0]] بيقفل كاش الذاكرة المحلي. ومع Cache Components فيه [[cacheHandlers]] (جمع) لـ [[use cache]]. وفيه مكتبات جاهزة لـ Redis. والبديل الأبسط: نسخة واحدة أكبر، أو كاش أقل وداتابيز سريعة.

الـ Server Actions: الـ closures والـ arguments المشفرة بتتشفر بمفتاح بيتعمل عشوائي مع كل build. لو النسخ من builds مختلفة، أو بنيت كل نسخة لوحدها، نسخة مش هتفك تشفير التانية. المفتاح الثابت بيحل ده.

الـ version skew: بعد deploy، المستخدم اللي الصفحة مفتوحة عنده معاه JS قديم بيطلب chunks أو actions مبقتش موجودة. [[deploymentId]] بيخلي Next يكتشف ده ويعمل reload كامل. واحتفظ بملفات [[.next/static]] القديمة شوية على الـ CDN لو تقدر.

والـ streaming: Nginx بيعمل buffer للـ response قبل ما يبعته. [[X-Accel-Buffering: no]] بيقفله للردود دي بس. وإعدادات Nginx نفسها في تاب «Nginx» (ومعاها WebSocket لو محتاج HMR ورا Nginx في التطوير).`,
            when: "أول ما تشغّل أكتر من نسخة (PM2 cluster، أو ٢ containers، أو Kubernetes)، أو أول ما تحط Nginx أو CDN قدام Next.",
            mistakes: R`تشغّل [[pm2 start -i max]] وتفتكر إن الكاش مشترك. وتبني image لكل سيرفر لوحده بمفاتيح مختلفة. وتنسى الـ buffering فتفتكر إن Suspense مش شغال. ومن غير [[deploymentId]] تلاقي أخطاء JS غريبة في Sentry بعد كل deploy.`
          },
          lines: [
            "النوع.",
            "الإعدادات.",
            R`image صغيرة لـ Docker (تاب «Docker»).`,
            "id لكل deploy (هنا الـ git commit). المتصفح اللي معاه نسخة قديمة بيعمل reload كامل بدل ما يطلب ملفات مبقتش موجودة.",
            "headers لكل الردود.",
            R`قول لـ Nginx ميعملش buffer، فالـ streaming و Suspense يوصلوا على دفعات.`,
            "قفلة.",
            "قفلة.",
            "تصدير.",
            "اعمل مفتاح مرة واحدة واحفظه في secrets الـ CI. متعملش واحد جديد مع كل build.",
            "البناء بنفس المفتاح في كل مرة، فكل النسخ وكل الـ builds يفهموا الـ actions بتاعة بعض."
          ]
        },
        {
          cmd: "next upgrade",
          title: "ترقّي Next من غير ما تكسر المشروع، وليه التحديث الأمني مش اختياري",
          desc: R`[[npx @next/codemod@canary upgrade latest]] بيرقّي Next و React ويشغّل الـ codemods اللي بتعدّل الكود لوحدها (async params، و middleware لـ proxy، وغيرهم). بعدها [[npm run build]] واقرا كل تحذير، واختبر الصفحات المهمة.

وخليك على آخر patch من النسخة اللي انت عليها. في مارس ٢٠٢٥ ثغرة في الـ middleware (CVE-2025-29927) خلّت الحماية اللي فيه تتخطى بـ header، وفي ديسمبر ٢٠٢٥ ثغرة React2Shell (CVE-2025-55182) في Server Components سمحت بتنفيذ كود على السيرفر من غير login، وأثرت على Next 15 و 16. والحل في الاتنين كان تحديث.`,
          example: R`npx next info
npm outdated next react react-dom
npx @next/codemod@canary upgrade latest
npx @next/codemod@canary middleware-to-proxy .
npx next typegen
npm run build
npm audit --omit=dev`,
          try: R`على branch جديد، رقّي مشروع قديم (Next 14 أو 15) بالأمر التالت، واقرا الـ diff اللي الـ codemods عملته قبل ما تعمل commit. دوّر على [[@next-codemod-error]]: ده معناه إن الـ codemod ملقاش طريقة يحوّل الكود ومحتاج تعدّله بإيدك.`,
          deep: {
            why: R`كل major في Next بيغيّر حاجات أساسية: 15 خلّى params و cookies async وقفل الكاش الافتراضي، و 16 غيّر اسم الـ middleware وشال [[next lint]] و AMP والوصول الـ sync للـ params. لو فضلت متأخر نسختين، الترقية بتبقى مشروع لوحدها. والأسوأ: الثغرات بتتصلح في النسخ المدعومة بس.`,
            how: R`[[@next/codemod]] بيقرا الكود ويعدّله بالـ AST: يحط [[await]] قبل [[params]] و [[cookies()]]، ويغيّر imports اتنقلت، ويغيّر أسماء config. واللي مش قادر يحوّله أوتوماتيك بيعلّم عليه بتعليق [[@next-codemod-error]] أو نوع [[UnsafeUnwrapped...]] عشان تعدّله بإيدك.

أهم تغييرات Next 16: Turbopack افتراضي، و [[proxy.ts]]، و Cache Components (اختياري)، و [[revalidateTag]] بـ profile، و [[default.tsx]] إجباري للـ parallel routes، و [[next lint]] اتشال، وتغييرات في defaults الصور، و Node 20.9 على الأقل، و React 19.2.

الترتيب الآمن: branch، وترقية، وقراية الـ diff، و build، واختبار الـ flows المهمة (login، ودفع، وفورم)، ولو فيه E2E tests (Playwright) شغّلها، وبعدين staging، وبعدين الإنتاج.

والأمان: تابع الـ security advisories على GitHub بتاع Next و React، وفعّل Dependabot. ثغرة React2Shell كانت خطيرة لدرجة إن أي تطبيق App Router كان معرّض حتى لو مش كاتب Server Actions، والحل كان التحديث لآخر patch فورًا.`,
            when: "الـ patches (زي 16.2.x) فورًا وخصوصًا الأمنية. الـ minor (16.x) كل شهر أو اتنين. والـ major بعد ما يطلع بشهر أو اتنين والمكتبات اللي بتستخدمها (next-intl والـ auth) تدعمه.",
            mistakes: R`[[npm i next@latest]] بس من غير codemods ومن غير ما تقرا دليل الترقية. وتفضل على Next 13 سنتين «عشان شغال». وتعمل ترقية major يوم خميس قبل إطلاق. وتتجاهل التحذيرات في الـ build لحد ما تبقى أخطاء في النسخة الجاية.`
          },
          lines: [
            "نسخ Next و React و Node الحالية.",
            "النسخة الحالية، والأحدث المسموح بيها، والأحدث خالص.",
            "الترقية: بيحدّث الباكدجات ويسألك على الـ codemods اللي تشغّلها.",
            R`لو جاي من Next 15: [[middleware.ts]] لـ [[proxy.ts]] والدالة لـ [[proxy]].`,
            R`ولّد أنواع [[PageProps]] و [[LayoutProps]] و [[RouteContext]] من غير ما تشغّل dev.`,
            R`ابني. أخطاء TS في [[params]] أو [[cookies()]] من غير await هتطلع هنا.`,
            R`دوّر على ثغرات معروفة في باكدجات الإنتاج (تفاصيل npm audit في تاب «Node و npm»).`
          ]
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات Next.js، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "RSC مش SSR",
          title: "Server Components هي هي SSR؟ (RSC vs SSR)",
          desc: R`لأ. SSR إن الكومبوننت يترسم HTML على السيرفر في أول تحميل، وبعدين نفس الكود يتبعت للمتصفح ويعمل hydration، وده بيحصل للـ client components كمان. Server Components بتشتغل على السيرفر بس، ومبتتبعتش للمتصفح خالص: ملهاش JS ولا hydration، وتقدر تبقى async وتكلّم الداتابيز. في App Router الاتنين مع بعض: الـ server components بتطلّع RSC payload، و Next بيستخدمه مع SSR الـ client components عشان يطلّع HTML أول مرة. والتنقل بعد كده بيجيب RSC payload بس، مش HTML.`,
          example: R`// server component: HTML بس، وصفر JS
export default async function Page() { const posts = await db.post.findMany(); return <PostList posts={posts} />; }
// client component: HTML من SSR، والكود كمان بيتبعت ويعمل hydration
"use client";
export function LikeButton() { const [n, setN] = useState(0); return <button onClick={() => setN(n + 1)}>{n}</button>; }`,
          try: R`افتح صفحة فيها الاتنين، و View Source: الاتنين موجودين HTML. وبعدين DevTools > Sources: هتلاقي [[LikeButton]] ومش هتلاقي [[Page]].`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الفرق بين «فين الكود بيترسم» و «فين الكود بيشتغل»، وإنك مش بتقول مصطلحات وخلاص.",
            how: R`نقط لو اتسألت أكتر: الـ RSC payload تنسيق خاص (Flight) فيه ناتج الـ server components ومراجع للـ client components والـ props بتاعتها. والـ server components بتترسم وقت الـ build (static) أو مع الطلب (dynamic). والـ client component مينفعش يعمل import لـ server component، بس ينفع ياخده children. والـ props بين الاتنين لازم serializable.`,
            when: "«إزاي الـ server component بيوصل للمتصفح لو مفيش JS؟» (RSC payload)، و «إمتى تستخدم use client؟»، و «الـ client component بيترسم على السيرفر؟» (أيوة، SSR)، و «Server Components ينفع فيها useState؟» (لأ).",
            mistakes: R`«Server Components هي SSR باسم جديد». و «use client يعني مبيترسمش على السيرفر». و «server components أسرع دايمًا» من غير ما تقول ليه (JS أقل، وداتا جنب الداتابيز).`
          },
          lines: [
            "بيشتغل على السيرفر بس، والكود ده مش في الـ bundle بتاع المتصفح (بيتبني في bundle السيرفر بس).",
            "حد client.",
            "بيترسم على السيرفر (SSR) وبيشتغل في المتصفح كمان."
          ]
        },
        {
          cmd: "SSG و SSR و ISR و CSR",
          title: "الفرق بين SSG و SSR و ISR و CSR؟ وتعمل كل واحد إزاي في App Router؟",
          desc: R`الفرق في «إمتى وفين الـ HTML بيتعمل». SSG: وقت الـ build، مرة واحدة، أسرع حاجة (مقالات و landing). SSR: مع كل طلب على السيرفر، للداتا الشخصية أو اللي بتتغير كل ثانية. ISR: static بس بيتجدد كل فترة أو عند حدث، للمنتجات والأسعار. CSR: الـ HTML فاضي والمتصفح بيجيب الداتا ويرسم، للوحات تحكم ورا login. في App Router مفيش دوال منفصلة: الصفحة static افتراضيًا، وبتبقى dynamic لو قرت cookies أو searchParams، و ISR بـ [[revalidate]] أو [[cacheLife]]، و CSR بـ client component بيجيب داتا. ومع Cache Components الصفحة الواحدة ممكن تجمع الأنواع دي (Partial Prerendering).`,
          example: R`export const revalidate = 3600;
const posts = await fetch(url, { next: { revalidate: 60 } });
const session = (await cookies()).get("session");`,
          try: R`اعمل ٣ صفحات بالتلات طرق، و build، وقارن الرموز في الجدول، والـ TTFB بتاع كل واحدة بـ [[curl -o /dev/null -s -w "%{time_starttransfer}" URL]].`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار طريقة الرسم حسب الداتا مش بالعادة، وإنك عارف التمن: السرعة، وتكلفة السيرفر، وقدم الداتا.",
            how: R`قارن بـ ٣ أسئلة: الداتا بتتغير قد إيه؟ شخصية ولا للكل؟ محتاجة SEO؟ مقال: SSG أو ISR. صفحة منتج: ISR، والسلة جواها dynamic. الـ dashboard: SSR أو CSR. ومن Pages Router: [[getStaticProps]] = SSG، و [[getServerSideProps]] = SSR، و [[revalidate]] جوه getStaticProps = ISR. والـ streaming بيقلل عيب SSR: الـ shell بيوصل قبل الداتا البطيئة.`,
            when: "«ليه صفحتي dynamic مع إني مش عايز؟»، و «ISR بيشتغل إزاي على أكتر من سيرفر؟»، و «يعني إيه stale-while-revalidate؟»، و «Partial Prerendering يعني إيه؟».",
            mistakes: R`«SSR أحسن للـ SEO من SSG» (الاتنين HTML كامل). و «CSR مينفعش للـ SEO خالص» (جوجل بيشغّل JS، بس أبطأ وأقل ضمان). ونسيان إن [[next dev]] بيرسم كل حاجة مع كل طلب.`
          },
          lines: [
            "ISR على الصفحة كلها (النموذج القديم).",
            "ISR على طلب واحد.",
            "قراية cookie بتخلي الصفحة SSR (dynamic)."
          ]
        },
        {
          cmd: "action ولا route",
          title: "Server Action ولا Route Handler؟ (Server Actions vs Route Handlers)",
          desc: R`Server Action للـ mutations اللي جاية من الواجهة بتاعتي: فورم أو زرار. بيشتغل من غير JS (progressive enhancement)، والأنواع متشاركة، وبيعمل revalidate ويرجّع الصفحة الجديدة في نفس الرحلة. Route Handler لما حد تاني محتاج URL ثابت و HTTP عادي: تطبيق موبايل، و webhook، و API عام، و RSS، أو GET بيتكاش. والاتنين endpoints عامة، فالـ auth والـ validation جوه كل واحد. ومش بستخدم الاتنين لجلب داتا لـ server component: بنادي الدالة مباشرة.`,
          example: R`// app/actions.ts
"use server";
export async function like(postId: string) { const { userId } = await verifySession(); await db.like.create({ data: { postId, userId } }); revalidatePath("/posts"); }
// app/api/posts/route.ts
export async function GET() { return Response.json(await db.post.findMany({ take: 20 })); }`,
          try: R`اعمل like بالطريقتين، وقارن في Network: الـ action طلب POST على نفس الصفحة ورجع معاه الـ UI الجديد، والـ route رجّع JSON وانت اللي لازم تحدّث الشاشة.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الأدوات الجديدة ومش بتعمل API لكل حاجة بعادة الـ SPA، ولا بتستخدم Server Actions في مكان محتاج API حقيقي.",
            how: R`حاجات تقولها: الـ actions بتتنفذ واحد ورا التاني من نفس الـ client، فمش مناسبة لجلب داتا بالتوازي. والـ ID بتاعها بيتغير مع كل build (مشكلة لو client قديم). والـ route handlers بتدعم كل الـ methods و streaming responses و headers كاملة. ولو التطبيق هيبقى ليه تطبيق موبايل، API منفصل أو route handlers من الأول بيوفّر إعادة كتابة.`,
            when: "«إزاي Server Action بيتحمي من CSRF؟» (POST بس، ومقارنة Origin بـ Host)، و «ينفع تنادي Server Action من تطبيق موبايل؟» (تقنيًا آه بس مش API ثابت)، و «إيه مشكلة fetch لـ /api من server component؟».",
            mistakes: R`«Server Actions بديل كامل للـ API». و «Route Handlers قديمة». و fetch لـ [[/api/...]] من server component في نفس التطبيق.`
          },
          lines: [
            "ملف actions.",
            "mutation من الواجهة: session، وتعديل، وتحديث الصفحة.",
            "endpoint عام بـ URL ثابت لأي client."
          ]
        },
        {
          cmd: "hydration mismatch",
          title: "يعني إيه hydration، وإيه اللي بيطلّع hydration error؟",
          desc: R`الـ hydration إن React في المتصفح ياخد الـ HTML اللي جه من السيرفر، ويرسم نفس الكومبوننتات، ويربط الـ events بالـ DOM الموجود بدل ما يعمله من الأول. لو اللي اترسم في المتصفح أول مرة مختلف عن HTML السيرفر، يطلع hydration error. الأسباب المشهورة: قيم بتختلف بين الاتنين ([[Date.now()]] و [[Math.random()]] والتوقيت والـ locale)، و [[typeof window !== "undefined"]] جوه الـ render، و localStorage، و HTML مش صالح ([[<div>]] جوه [[<p>]])، و extensions في المتصفح بتعدّل الـ DOM. والحل: القيم اللي تخص المتصفح بس تتحط في [[useEffect]] بعد الـ hydration، أو الجزء ده ميترسمش على السيرفر ([[dynamic]] بـ [[ssr: false]])، و [[suppressHydrationWarning]] لحالات قليلة معروفة زي الثيم على [[<html>]].`,
          example: R`"use client";
export function Now() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => setTime(new Date().toLocaleTimeString("ar-EG")), []);
  return <span>{time ?? "--:--"}</span>;
}`,
          try: R`اكتب [[<span>{new Date().toLocaleTimeString()}</span>]] في client component مباشرة وافتح الصفحة واقرا الخطأ في الـ console. وبعدين حط [[<div>]] جوه [[<p>]] وشوف الخطأ التاني.`,
          flag: "script",
          deep: {
            why: "أكتر خطأ بيقابل الناس في Next، وبيختبر إنك فاهم إن الكومبوننت بيترسم مرتين في مكانين مختلفين.",
            how: R`React 19 بيطلّع رسالة فيها diff بالفرق. ولو حصل mismatch، React بيرمي الـ HTML بتاع الجزء ده ويرسمه من الأول في المتصفح، يعني خسرت فايدة SSR فيه وممكن يحصل وميض. والـ server components مبتعملش hydration أصلًا، فالمشكلة في الـ client components بس. والتواريخ: السيرفر غالبًا UTC والمستخدم في القاهرة، فحتى [[toLocaleDateString]] ممكن يختلف: ابعت التاريخ منسّق من السيرفر أو حدد [[timeZone]].`,
            when: "«ليه useEffect بيحل المشكلة؟» (بيشتغل بعد الـ hydration بس)، و «إمتى suppressHydrationWarning مقبول؟»، و «Server Components بتعمل hydration؟» (لأ).",
            mistakes: R`«بحط suppressHydrationWarning على كل حاجة». و [[if (typeof window !== "undefined")]] في الـ render نفسه (ده بيعمل الـ mismatch مش بيحله). وتجاهل التحذير لأن «الصفحة شغالة».`
          },
          lines: [
            "client component.",
            "ساعة.",
            R`القيمة الأولى [[null]] على السيرفر وفي المتصفح، فالاتنين يطلّعوا نفس HTML.`,
            "بعد الـ hydration بس، احسب الوقت الحقيقي بتوقيت الجهاز.",
            "placeholder لحد ما الوقت يتحسب.",
            "قفلة."
          ]
        },
        {
          cmd: "proxy مش حماية",
          title: "ليه الـ auth في الـ middleware (proxy) لوحده مش كفاية؟",
          desc: R`لأن الـ proxy طبقة واحدة قدام التطبيق، وأي مسار للداتا مش بيعدّي منها، أو بيعدّي بطريقة مش متوقعة، بيبقى مكشوف. Server Actions و Route Handlers و RSC requests كلها مسارات، والـ matcher ممكن يفوّت حاجة. والـ layout كمان مش كفاية لأنه مبيترسمش تاني في التنقل. وفيه مثال حقيقي: CVE-2025-29927 في مارس ٢٠٢٥، header واحد ([[x-middleware-subrequest]]) كان بيخلي Next يتخطى الـ middleware خالص في النسخ المستضافة ذاتيًا. فبستخدم الـ proxy لفحص متفائل سريع (redirect للي مفيش معاه cookie)، والحماية الحقيقية في Data Access Layer: كل query للداتا الخاصة بيتحقق من الـ session والملكية بنفسه.`,
          example: R`export async function getOrder(id: string) {
  const { userId } = await verifySession();
  return db.order.findFirst({ where: { id, userId } });
}`,
          try: R`في مشروعك، دوّر على كل [[db.]] في server actions و route handlers وشوف: كام واحد مبيتحققش من المستخدم بنفسه ومعتمد إن «الصفحة محمية»؟`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفكر في الحماية كـ defense in depth، ومتابع التغييرات والثغرات مش حافظ توتوريال قديم.",
            how: R`الاسم نفسه اتغير في Next 16 لـ proxy عشان يبعد الناس عن فكرة «middleware بيحمي route» بتاعة Express. والـ proxy بيشتغل مع كل طلب بما فيهم الـ prefetch، فعمل query للداتابيز فيه بيبطّأ كل حاجة. والـ DAL فيه [[server-only]] و [[cache()]] و DTOs. والصلاحيات (الدور) بتتقري من الداتابيز للعمليات الحساسة، مش من التوكن بس.`,
            when: "«إزاي تعمل role-based access في Next؟»، و «فين بتتحقق في Server Action؟»، و «إيه هو IDOR وإزاي تمنعه؟»، و «إيه اللي اتغير في middleware في Next 16؟».",
            mistakes: R`«الـ middleware بيحمي كل حاجة». و «الـ layout بيتحقق فالصفحات تحته آمنة». ونسيان الـ Server Actions تمامًا في الإجابة.`
          },
          lines: [
            "دالة في الـ DAL.",
            "التحقق جنب الداتا.",
            "والملكية جوه الـ query نفسه.",
            "قفلة."
          ]
        },
        {
          cmd: "صفحة بطيئة",
          title: "صفحة Next بطيئة: هتبدأ منين؟ (Debugging a slow Next.js page)",
          desc: R`أول حاجة أقيس وأعرف البطء فين: السيرفر (TTFB عالي) ولا المتصفح (LCP أو INP). لو السيرفر: أشوف الصفحة static ولا dynamic في جدول الـ build، ولو dynamic من غير سبب (cookies في الـ layout) أصلّحها، وأدوّر على waterfalls (await ورا await) وأحوّلها لـ [[Promise.all]]، وأكاش الـ queries اللي نتيجتها واحدة للكل، وأعزل الجزء البطيء في Suspense عشان الباقي يوصل. لو المتصفح: صورة الـ LCP بـ [[next/image]] و [[fetchPriority]]، والخطوط بـ [[next/font]]، وحجم الـ JS: [[use client]] في أصغر مكان و [[next/dynamic]] للتقيل، وأشوف الـ bundle بـ [[next experimental-analyze]]. وأقيس تاني بعد كل تغيير، ومن زوار حقيقيين مش Lighthouse بس.`,
          example: R`npm run build
curl -o /dev/null -s -w "TTFB %{time_starttransfer}s\n" https://shop.example.com/products
npx next experimental-analyze`,
          try: "خد أبطأ صفحة في مشروعك وامشي على الخطوات بالترتيب، واكتب الرقم قبل وبعد كل خطوة.",
          deep: {
            why: "بيختبر إن عندك منهج: بتقيس قبل ما تغيّر، وبتفرّق بين مشاكل السيرفر ومشاكل المتصفح، مش بتقول «هحط useMemo» وخلاص.",
            how: R`الأدوات: جدول [[next build]]، و Network tab (TTFB والـ waterfall)، و Lighthouse و Performance panel للمتصفح، و web-vitals أو Vercel Speed Insights من زوار حقيقيين، و OpenTelemetry ([[instrumentation.ts]]) أو Sentry لتتبع الـ queries على السيرفر. وأسباب شائعة: N+1 queries في الـ DAL، و index ناقص (تاب «SQL و Prisma»)، و fetch لـ API بطيء من غير كاش ولا timeout، و Nginx بيعمل buffer للـ streaming، وسيرفر في منطقة بعيدة عن الداتابيز.`,
            when: "«إزاي تعرف الصفحة static ولا dynamic؟»، و «إيه هو LCP و INP و CLS؟»، و «إزاي تمنع waterfall؟»، و «إمتى تستخدم Suspense؟».",
            mistakes: R`تبدأ بـ [[useMemo]] و [[memo]] في كل حتة من غير قياس. وتقيس على جهازك ونت البيت بس. وتحسّن رقم Lighthouse وتسيب TTFB بتاع السيرفر ثانيتين.`
          },
          lines: [
            "اقرا الجدول: الصفحة ○ ولا ƒ؟",
            "قيس TTFB من الترمنال: لو عالي، المشكلة على السيرفر.",
            "شوف إيه اللي تقيل في الـ JS."
          ]
        }
      ]
    }
  ]
});
