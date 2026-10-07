// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
    }
]);
