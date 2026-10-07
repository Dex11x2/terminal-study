// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
          teach: R`## الفكرة: object في ملف، و Next بيكتب الـ tags

بدل ما تكتب [[<title>]] و [[<meta>]] بإيدك، بتعمل [[export const metadata]] في الـ layout (الافتراضي لكل الموقع) وفي الصفحة (اللي يخصها). اتشغّل في مشروع [[create-next-app]] جديد (Next.js 16.4.0) على ويندوز، والـ layout والصفحة زي المثال بالظبط، و [[next build]] و [[next start]] على بورت 5832، وقرينا الـ HTML بـ [[curl]].

---

## ١. [[import type { Metadata } from "next"]]

[[import type]] بيستورد **نوع** بس (مش كود بيتنفذ). و [[: Metadata]] بعد اسم المتغير بيخلي المحرر يكمّلك أسماء الحقول ويطلّع خطأ لو كتبت حقل غلط.

---

## ٢. الـ layout خانة خانة

| الحقل | معناه |
|---|---|
| [[metadataBase: new URL("https://books.example.com")]] | الدومين. أي رابط نسبي في الـ metadata ([[/about]]) بيتكمّل بيه |
| [[title.default]] | الـ title لأي صفحة مكتبتش title |
| [[title.template]] | شكل الـ title للصفحات اللي تحت. [[%s]] بيتبدّل باسم الصفحة |
| [[description]] | الوصف تحت اللينك في جوجل |
| [[openGraph]] | Open Graph: الـ tags اللي واتساب وفيسبوك ولينكدإن بيقروها. [[locale: "ar_EG"]] = عربي مصر |
| [[twitter.card]] | شكل الكارت في X. [[summary_large_image]] = صورة كبيرة |

---

## ٣. الصفحة

~~~text app/about/page.tsx
export const metadata: Metadata = {
  title: "مين إحنا",
  alternates: { canonical: "/about" },
};
~~~

- [[title]] نص عادي، فالـ template بتاع الـ layout بيلفه.
- [[alternates.canonical]]: «النسخة الأصلية من الصفحة دي هي الرابط ده». لو حد شارك [[/about?utm_source=x]]، جوجل يعرف إنها نفس الصفحة.

---

## ٤. الناتج: [[curl -s localhost:5832/about]]

~~~text الناتج (الـ tags بس)
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>مين إحنا | متجر الكتب</title>
<meta name="description" content="كتب عربي وإنجليزي بتوصل لحد باب البيت."/>
<link rel="canonical" href="https://books.example.com/about"/>
<meta property="og:title" content="مين إحنا | متجر الكتب"/>
<meta property="og:description" content="كتب عربي وإنجليزي بتوصل لحد باب البيت."/>
<meta property="og:site_name" content="متجر الكتب"/>
<meta property="og:locale" content="ar_EG"/>
<meta property="og:type" content="website"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="مين إحنا | متجر الكتب"/>
<meta name="twitter:description" content="كتب عربي وإنجليزي بتوصل لحد باب البيت."/>
~~~

نقرا الناتج:

- [[<title>]]: [[%s]] اتبدّل بـ «مين إحنا».
- [[description]]: الصفحة مكتبتش واحد، فجه من الـ layout.
- [[canonical]]: الصفحة كتبت [[/about]] نسبي، و [[metadataBase]] كمّله لـ URL كامل.
- [[og:title]] و [[twitter:title]] و [[twitter:description]]: احنا مكتبناهمش خالص. Next ملاهم من [[title]] و [[description]].
- [[viewport]]: Next بيحطه لوحده.

والصفحة الرئيسية (مفيهاش metadata): [[<title>متجر الكتب</title>]]، يعني [[default]]، والـ template مش بيتطبق على الـ layout نفسه.

---

## ٥. من غير [[metadataBase]]

شيلنا السطر وعملنا build تاني:

~~~text الناتج
<link rel="canonical" href="/about"/>
~~~

الـ canonical بقى نسبي، ومفيش أي تحذير في الـ build. التحذير بيظهر بس لما يبقى فيه صورة OG بتحتاج URL كامل. صفحة منتج فيها [[opengraph-image]] (درس جاي) طلّعت في لوج السيرفر:

~~~text الناتج
⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:5832".
~~~

و [[og:image]] بقى [[http://localhost:5832/...]]، يعني واتساب هيحاول يجيب الصورة من localhost: مش هتظهر.

---

## ٦. [[metadata]] في ملف [[use client]]

~~~text الناتج (next build)
Error: You are attempting to export "metadata" from a component marked with "use client", which is disallowed.
"metadata" must be resolved on the server before the page component is rendered. Keep your page as a Server Component
and move Client Component logic to a separate file.
~~~

الـ metadata لازم تتحسب على السيرفر قبل ما الصفحة تترسم. الحل: الصفحة تفضل server component، والجزء التفاعلي في ملف تاني عليه [[use client]].

---

## الخلاصة

| الحاجة | فين | ليه |
|---|---|---|
| [[metadataBase]] | root layout | الروابط النسبية تبقى كاملة، وصور المشاركة متطلعش localhost |
| [[title.template]] | layout | كل صفحة اسمها وبعده اسم الموقع |
| [[title]] و [[description]] | كل صفحة | جوجل والمشاركة |
| [[alternates.canonical]] | كل صفحة | النسخ بـ query string متتحسبش تكرار |
| [[og:title]] و [[twitter:*]] | Next بيملاهم | من [[title]] و [[description]] لو مكتبتهمش |
| [[metadata]] | server components بس | [[use client]] = خطأ build |`,
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
          ],
          sol: R`View Source على [[/about]]: [[<title>مين إحنا | متجر الكتب</title>]]، و [[<link rel="canonical" href="https://books.example.com/about"/>]]، و [[og:title]] بنفس الـ title، و [[og:description]] و [[og:site_name]] و [[og:locale]] بـ [[ar_EG]] جايين من الـ layout، و [[twitter:card]] بـ [[summary_large_image]].

من غير [[metadataBase]]: الـ canonical بقى [[href="/about"]] نسبي، ومفيش تحذير لأن مفيش صور. ولو الصفحة فيها صورة OG (زي درس opengraph-image) هتلاقي في اللوج [[metadataBase property in metadata export is not set]] ومعاه إنه هيستخدم localhost. و [[metadata]] في ملف عليه [[use client]]: الـ build بيقع بـ [[You are attempting to export "metadata" from a component marked with "use client", which is disallowed.]]`
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
          teach: R`## الفكرة: دالة بدل object، والاتنين بيجيبوا نفس المنتج

[[generateMetadata]] بتاخد الـ [[params]] زي الصفحة، وتجيب المنتج، وترجّع metadata فيها اسمه. والصفحة نفسها بتجيب نفس المنتج. و [[cache]] بيخلي الاتنين query واحد. اتشغّل في مشروع Next.js 16.4.0 ([[next start]] على بورت 5832) بنفس الـ layout بتاع الدرس اللي فات، ومكان [[db]] ملف وهمي فيه منتج [[clean-code]] اسمه «Clean Code بالعربي» ووصفه طويل، وبيطبع [[query <slug>]] مع كل نداء.

---

## ١. [[getProduct]]: [[cache]] حوالين arrow function

~~~text
const getProduct = cache((slug: string) => db.product.findUnique({ where: { slug } }));
~~~

- [[(slug: string) => ...]]: دالة بتاخد الـ slug وترجّع الـ query.
- [[cache(...)]] من React: أول نداء بـ [[clean-code]] في الطلب بينفذ، وأي نداء تاني بنفس القيمة في **نفس الطلب** بياخد نفس الـ Promise.

---

## ٢. توقيع [[generateMetadata]]

~~~text
export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
~~~

| الحتة | معناها |
|---|---|
| [[export async function generateMetadata]] | اسم ثابت: Next بيدوّر عليه في [[page.tsx]] و [[layout.tsx]] |
| [[{ params }]] | destructuring: من الـ props خد [[params]] بس |
| [[PageProps<"/products/[slug]">]] | نوع جاهز Next بيولّده من المسار: فيه [[params: Promise<{ slug: string }>]] |
| [[Promise<Metadata>]] | async، فبترجّع Promise فيها Metadata |

والجسم:

~~~text
const { slug } = await params;
const product = await getProduct(slug);
if (!product) return { title: "المنتج مش موجود" };
~~~

[[params]] في Next 15 و 16 Promise، فلازم [[await]]. ولو المنتج مش موجود، رجّع title بسيط ومترميش error (الصفحة هي اللي هتعمل [[notFound()]]).

---

## ٣. الـ metadata نفسها

~~~text
title: product.name,
description: product.summary.slice(0, 155),
alternates: { canonical: "/products/" + slug },
openGraph: { images: [{ url: product.imageUrl, width: 1200, height: 630 }] },
~~~

(في المثال الـ canonical مكتوب template string، نفس المعنى.)

- [[.slice(0, 155)]]: أول ١٥٥ حرف. جوجل بيقص الوصف الطويل في النتايج.
- [[openGraph.images]]: صورة المشاركة، و [[width]] و [[height]] بيتكتبوا tags عشان المنصة تعرف المقاس من غير ما تحمّل الصورة.

ده اللي طلع في [[curl localhost:5832/products/clean-code]]:

~~~text الناتج
<title>Clean Code بالعربي | متجر الكتب</title>
<meta name="description" content="كتاب عن كتابة كود نضيف. كتاب عن كتابة كود نضيف. ... كتاب عن كتا"/>
<link rel="canonical" href="https://books.example.com/products/clean-code"/>
<meta property="og:image" content="https://books.example.com/img/clean-code.jpg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
~~~

الـ template كمّل الـ title، والوصف اتقص عند الحرف ١٥٥ (حتى لو في نص كلمة)، و [[metadataBase]] كمّل الـ canonical.

> لو فيه ملف [[opengraph-image]] في نفس الفولدر (درس جاي) و [[generateMetadata]] رجّعت [[openGraph.images]] كمان، جرّبنا: اللي في [[generateMetadata]] هو اللي ظهر في [[og:image]]، والملف اتجاهل.

---

## ٤. الصفحة

~~~text
const { slug } = await params;
const product = await getProduct(slug);
if (!product) notFound();
~~~

نفس النداء بنفس الـ slug. [[notFound()]] بيرمي، فبيوقّف الرسم ويرجّع 404.

---

## ٥. [[cache]] بيوفّر query

لوج السيرفر لطلب واحد على الصفحة:

~~~text الناتج
مع cache        query clean-code
من غير cache    query clean-code
                query clean-code
~~~

من غير [[cache]]، [[generateMetadata]] و الصفحة كل واحد عمل query.

---

## ٦. منتج مش موجود: [[/products/nope]]

~~~text الناتج
HTTP 404
document.title = 404: This page could not be found.
~~~

الـ status صح. والـ title في المتصفح جه من صفحة الـ 404 الافتراضية، مش من [[generateMetadata]] («المنتج مش موجود | متجر الكتب» موجود في الصفحة بس بعده). مش مشكلة: الـ 404 هي اللي بتقول لجوجل ميأرشفش، وكمان Next حط [[<meta name="robots" content="noindex"/>]].

---

## ٧. الـ bots والـ streaming

من Next 15.2، لو [[generateMetadata]] بطيئة، Next بيبدأ يبعت الصفحة للمتصفحات من غير ما يستناها، والـ tags بتيجي بعدين. وللـ bots اللي مبتشغّلش JS (بيعرفهم من الـ User-Agent) بيستنى ويحطها في [[<head>]]. جرّبنا ٤ User-Agents (Chrome و [[facebookexternalhit]] و WhatsApp و Googlebot): الـ [[<title>]] كان جوه [[<head>]] في الأربعة، لأن الداتا الوهمية بترجع فورًا فمفيش حاجة تستناها. الفرق بيبان مع query بطيء، وده من الوثائق.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[generateMetadata({ params })]] | الـ title من الداتا، ونفس props الصفحة |
| [[await params]] | Promise في 15 و 16 |
| [[cache(getProduct)]] | الـ metadata والصفحة = query واحد |
| مش موجود؟ title بسيط | مترميش error من الـ metadata |
| [[.slice(0, 155)]] | جوجل بيقص الباقي |
| [[openGraph.images]] | بتكسب على ملف [[opengraph-image]] لو الاتنين موجودين |`,
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
          ],
          sol: R`مع [[cache]]: الـ log بيطلع مرة واحدة لكل فتحة صفحة، مع إن [[generateMetadata]] والصفحة الاتنين نادوا [[getProduct]]. من غير [[cache]]: مرتين. والـ title في View Source [[<title>اسم المنتج | متجر الكتب</title>]]، لأن الـ template بتاع الـ layout كمّل. والمنتج اللي مش موجود: 404، والتاب في المتصفح بيقول [[404: This page could not be found.]]: صفحة الـ 404 الافتراضية بتحط title بتاعها، وده اللي بيكسب على «المنتج مش موجود | متجر الكتب» (وفي الـ HTML الخام من غير JS الـ title بيبقى «متجر الكتب»). فالـ title بتاع الحالة دي مش مهم، المهم الـ 404.

وفي واتساب أو أي OG preview لازم يظهر الاسم والوصف والصورة. لو الصورة مش ظاهرة: غالبًا [[metadataBase]] مش متظبط فالـ URL طالع [[localhost]]، أو الصورة مش 1200×630، أو واتساب لسه مكاش شكل قديم للينك (جرّب اللينك وفي آخره [[?v=2]]).`
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
          teach: R`## الفكرة: دالتين بيرجّعوا داتا، و Next بيكتب الـ XML والنص

[[app/sitemap.ts]] بيرجّع array من الصفحات، و [[app/robots.ts]] بيرجّع object بالقواعد. Next بيحوّلهم [[/sitemap.xml]] و [[/robots.txt]]. اتشغّل في مشروع Next.js 16.4.0 ([[next build]] و [[next start]] على بورت 5832)، ومكان [[db]] ملف وهمي فيه ٣ منتجات: [[clean-code]] و [[xss]] منشورين، و [[draft]] مش منشور.

---

## ١. [[sitemap.ts]] سطر سطر

### الأنواع والدومين

- [[import type { MetadataRoute } from "next"]]: أنواع جاهزة. [[MetadataRoute.Sitemap]] = array من [[{ url, lastModified?, changeFrequency?, priority? }]].
- [[const base = "https://books.example.com"]]: الـ sitemap لازم URLs كاملة. في مشروع حقيقي خليها من متغير بيئة.

### الدالة

~~~text
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
~~~

لازم [[export default]] لأن Next بيدوّر على الـ default في الملف ده بالاسم ده. و [[async]] عشان بتكلّم الداتابيز.

### المنتجات

~~~text
const products = await db.product.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
~~~

المنشور بس، وعمودين بس: الـ slug للـ URL، و [[updatedAt]] لآخر تعديل.

### الـ array

~~~text
return [
  { url: base, changeFrequency: "daily", priority: 1 },
  { url: base + "/about" },
  ...products.map((p) => ({ url: base + "/products/" + p.slug, lastModified: p.updatedAt })),
];
~~~

(الـ URLs في المثال template strings، نفس المعنى.)

- أول عنصرين صفحات ثابتة.
- [[products.map(...)]] بيحوّل كل منتج لـ object. والقوسين حوالين [[({ ... })]] عشان arrow function ترجّع object (من غيرهم JS يفتكر [[{]] بداية جسم الدالة).
- [[...]] قبل الـ map: spread، يفرد العناصر جوه الـ array الكبيرة بدل ما يحط array جوه array.

---

## ٢. الناتج: [[/sitemap.xml]]

~~~text الناتج
HTTP/1.1 200 OK
x-nextjs-cache: HIT
content-type: application/xml

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://books.example.com</loc>
<changefreq>daily</changefreq>
<priority>1</priority>
</url>
<url>
<loc>https://books.example.com/about</loc>
</url>
<url>
<loc>https://books.example.com/products/clean-code</loc>
<lastmod>2026-09-30T10:00:00.000Z</lastmod>
</url>
<url>
<loc>https://books.example.com/products/xss</loc>
<lastmod>2026-10-01T08:30:00.000Z</lastmod>
</url>
</urlset>
~~~

| الـ tag | جاي منين |
|---|---|
| [[<urlset>]] | الغلاف الثابت، و [[xmlns]] بيقول إنه بروتوكول sitemaps |
| [[<loc>]] | [[url]] |
| [[<changefreq>]] و [[<priority>]] | للرئيسية بس، لأننا كتبناهم ليها بس (وجوجل غالبًا بيتجاهلهم) |
| [[<lastmod>]] | [[lastModified]]، الـ [[Date]] اتكتب بصيغة ISO |

و [[draft]] مش موجود لأن [[published: false]].

---

## ٣. [[robots.ts]]

~~~text
rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api", "/checkout"] },
sitemap: "https://books.example.com/sitemap.xml",
~~~

- [[userAgent: "*"]]: القاعدة دي لكل الـ bots. ولو عايز قواعد مختلفة لكل bot، [[rules]] تبقى array.
- [[allow]] و [[disallow]]: مسموح كله ما عدا التلات مسارات دول وأي حاجة تحتهم.
- [[sitemap]]: مكان الـ sitemap عشان أي bot يلاقيه.

~~~text الناتج: /robots.txt (content-type: text/plain)
User-Agent: *
Allow: /
Disallow: /dashboard
Disallow: /api
Disallow: /checkout

Sitemap: https://books.example.com/sitemap.xml
~~~

---

## ٤. اتبنوا إمتى؟ جدول الـ build

~~~text الناتج (جزء من next build)
├ ○ /robots.txt
└ ○ /sitemap.xml
○  (Static)   prerendered as static content
~~~

[[○]] = static: اتعملوا مرة واحدة وقت الـ build، و [[x-nextjs-cache: HIT]] في الرد معناها إنه جاي من النسخة المتخزنة. يعني منتج جديد يتضاف بعد الـ build **مش هيظهر** في الـ sitemap غير بـ build جديد، أو لو ضفت [[export const revalidate = 3600]] (يتحدّث كل ساعة) في [[sitemap.ts]]، أو [[use cache]] و [[cacheLife]] لو [[cacheComponents]] شغال. جرّبنا السطر ده، والجدول بقى:

~~~text الناتج
Route (app)                           Revalidate  Expire
└ ○ /sitemap.xml                              1h      1y
~~~

لسه static، بس Next هيعمله من جديد في الخلفية لو طلب جه بعد ما الساعة تعدّي.

---

## الخلاصة

| الملف | بيطلّع | فيه |
|---|---|---|
| [[app/sitemap.ts]] | [[/sitemap.xml]] ([[application/xml]]) | كل الصفحات العامة، و [[lastModified]] الحقيقي |
| [[app/robots.ts]] | [[/robots.txt]] ([[text/plain]]) | مين يأرشف إيه، ومكان الـ sitemap |
| [[○]] في الـ build | static | محتاج revalidate لو الداتا بتتغير |
| [[disallow]] | طلب مهذب | مش حماية: الصفحات الخاصة محتاجة auth |`,
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
          ],
          sol: R`[[/sitemap.xml]] بيرجّع XML ([[Content-Type: application/xml]]) فيه [[<urlset>]] وجواه [[<url>]] لكل صفحة: [[<loc>]] دايمًا، و [[<changefreq>]] و [[<priority>]] للرئيسية بس، و [[<lastmod>]] بتاريخ ISO لصفحات المنتجات. و [[/robots.txt]] شكله زي اللي تحت.

وفي جدول الـ build الاتنين [[○ /sitemap.xml]] و [[○ /robots.txt]]: static اتبنوا وقت الـ build، فمنتج جديد مش هيظهر في الـ sitemap غير بـ build أو revalidate. وفي Search Console بعد إضافة الـ sitemap هتلاقي حالته Success وعدد الـ URLs اللي اكتشفها. لو اللينكات جوه الـ XML فيها [[localhost]]: الـ base جاي من متغير بيئة مش متظبط في الإنتاج.`,
          solCode: R`User-Agent: *
Allow: /
Disallow: /dashboard
Disallow: /api
Disallow: /checkout

Sitemap: https://books.example.com/sitemap.xml`
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
            mistakes: R`تستخدم grid أو CSS مش مدعوم وتستغرب إن الصورة فاضية أو فيها خطأ. وتنسى الخط العربي فتطلع الحروف مقطّعة ومعكوسة، أو مربعات لو السيرفر مش واصل لـ Google Fonts. وتحمّل الخط من URL خارجي مع كل طلب بدل ملف محلي. وتنسى إن [[params]] هنا Promise في Next 16 زي الصفحة.`
          },
          teach: R`## الفكرة: ملف بيرجّع صورة، مكتوبة JSX

[[opengraph-image.tsx]] جنب [[page.tsx]] بيرجّع [[ImageResponse]]: div فيه اسم المنتج وسعره، و Next بيحوّله PNG ويحط رابطه في [[og:image]] لوحده. اتشغّل في مشروع Next.js 16.4.0 ([[next start]] على بورت 5832) على ويندوز، والمنتج [[clean-code]] اسمه «Clean Code بالعربي» وسعره 25000 قرش، وخط Cairo Bold (TTF) نزّلناه من Google Fonts في [[assets/Cairo-Bold.ttf]]، و [[getProduct]] متكاشة بـ [[cache]] زي الدرس اللي فات.

---

## ١. الـ imports

| السطر | ليه |
|---|---|
| [[ImageResponse]] من [[next/og]] | بيحوّل JSX لصورة |
| [[readFile]] من [[node:fs/promises]] | يقرا ملف الخط (async). [[node:]] قبل الاسم معناها module جاي مع Node |
| [[join]] من [[node:path]] | يركّب مسار بالفاصل الصح على أي نظام (الـ backslash على ويندوز و [[/]] على لينكس) |

---

## ٢. الـ exports التلاتة الثابتة

~~~text
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "صورة المنتج";
~~~

Next بيقراهم وبيكتبهم tags. [[1200×630]] هو المقاس اللي فيسبوك ولينكدإن وواتساب بيعرضوه كبير (نسبة 1.91 لـ 1).

---

## ٣. الدالة

~~~text
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const cairo = await readFile(join(process.cwd(), "assets/Cairo-Bold.ttf"));
~~~

- [[params]] Promise زي الصفحة.
- [[process.cwd()]]: الفولدر اللي السيرفر اشتغل منه (فولدر المشروع)، فالمسار [[<المشروع>/assets/Cairo-Bold.ttf]].
- [[cairo]]: الخط كـ bytes ([[Buffer]]). الحجم عندنا 91664 byte.

---

## ٤. الـ JSX

~~~text
<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#0f172a", color: "white", fontFamily: "Cairo" }}>
  <div style={{ fontSize: 72 }}>{product?.name ?? "متجر الكتب"}</div>
  <div style={{ fontSize: 40, color: "#fbbf24" }}>{product ? (product.priceCents / 100) + " ج.م" : ""}</div>
</div>
~~~

- [[style={{ ... }}]]: القوسين الخارجيين «ده JavaScript»، والداخليين object الـ CSS. والأسماء camelCase ([[flexDirection]] مش [[flex-direction]]).
- [[display: "flex"]]: إجباري في أي div فيه أكتر من ابن. ده مش متصفح، ده Satori: بيفهم flexbox وجزء من CSS بس.
- [[padding: 80]] من غير وحدة = 80px.
- [[product?.name ?? "متجر الكتب"]]: لو مفيش منتج، اسم المتجر.
- [[priceCents / 100]]: السعر متخزن قروش (رقم صحيح) عشان مفيش كسور في الحسابات، فـ 25000 = 250.

---

## ٥. [[new ImageResponse(jsx, options)]]

[[{ ...size, fonts: [{ name: "Cairo", data: cairo, weight: 700 }] }]]: المقاس، والخطوط المتاحة. [[name]] لازم يطابق [[fontFamily]] في الـ style.

---

## ٦. الناتج

~~~bash
curl -s -D - -o og.png localhost:5832/products/clean-code/opengraph-image
~~~

~~~text الناتج
content-type: image/png
og.png: PNG image data, 1200 x 630, 8-bit/color RGBA
~~~

والصورة: خلفية كحلي، و «Clean Code بالعربي» أبيض بحروف متوصلة، وتحتها «250 ج.م» أصفر.

ووسوم الصفحة نفسها (مع شيل [[openGraph.images]] من [[generateMetadata]]، لأنها لو موجودة بتكسب على الملف):

~~~text الناتج
<meta property="og:image" content="https://books.example.com/products/clean-code/opengraph-image?311007f04530720f"/>
<meta property="og:image:type" content="image/png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="صورة المنتج"/>
<meta name="twitter:image" content="https://books.example.com/products/clean-code/opengraph-image?311007f04530720f"/>
~~~

- [[?311007f04530720f]]: hash، لما الملف يتغير الرابط يتغير، فالمنصات متعرضش صورة قديمة من الكاش بتاعها.
- [[type]] و [[width]] و [[height]] و [[alt]] جايين من الـ exports التلاتة.
- [[twitter:image]]: مفيش [[twitter-image.tsx]]، فاستخدم نفس الصورة.
- الدومين من [[metadataBase]]. من غيره طلع [[http://localhost:5832/...]] ومعاه تحذير في اللوج.

وفي جدول الـ build: [[ƒ /products/[slug]/opengraph-image]]، يعني بتتعمل مع الطلب لأنها معتمدة على الـ slug.

---

## ٧. العربي: ٣ تجارب

عملنا route تجربة بيرسم ٤ سطور: «كتاب»، و «كتاب Next.js 16»، و «250 ج.م»، و «سعر الكتاب 250 جنيه».

| التجربة | النتيجة |
|---|---|
| مع Cairo في [[fonts]] | كل كلمة حروفها متوصلة وسليمة. بس ترتيب **الكلمات** من الشمال لليمين: «سعر» أول السطر على الشمال |
| من غير [[fonts]] (و [[fontFamily: "Cairo"]] موجود) | الصورة طلعت، بس الحروف منفصلة ومعكوسة: «كتاب» بقت «باتك». Next جاب خط احتياطي وقت الطلب |
| من غير [[fonts]] ومن غير [[fontFamily]] | الرد اتقطع من غير status ([[curl]] طبع [[000]])، واللوج: [[lookupType: 5 - substFormat: 3 is not yet supported]] |

يعني: الخط العربي بتاعك لازم، والنص يبقى قصير وكل جزء في div لوحده.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[opengraph-image.tsx]] جنب الصفحة | Next بيحط [[og:image]] و [[twitter:image]] لوحده |
| [[size]] و [[contentType]] و [[alt]] | بيتكتبوا tags |
| [[display: "flex"]] | Satori مش متصفح |
| [[fonts]] بخط عربي (TTF) | من غيره حروف مقطعة أو الصورة تقع |
| [[metadataBase]] | الرابط يبقى الدومين مش localhost |
| [[openGraph.images]] في الـ metadata | بيكسب على الملف لو الاتنين موجودين |`,
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
            "خط عربي كـ bytes. الخط الافتراضي مفيهوش عربي، فمن غيره Next بيجيب خط احتياطي من Google Fonts وقت الطلب والحروف بتطلع مقطّعة ومعكوسة (ولو السيرفر مش واصل للإنترنت، مربعات).",
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
          ],
          sol: R`[[/products/x/opengraph-image]] بيرجّع PNG مقاسه 1200×630، والصفحة نفسها فيها [[og:image]] بـ URL الملف ده وفي آخره hash، ومعاه [[og:image:width]] و [[og:image:height]] و [[og:image:alt]] لوحدهم.

من غير [[fonts]]: الصورة بتطلع برضه، بس العربي حروفه منفصلة ومعكوسة («كتاب» بتبان «باتك»)، لأن Next جاب خط احتياطي من Google Fonts وقت الطلب و Satori مبيوصّلش الحروف العربي. ولو السيرفر مش واصل للإنترنت هتطلع مربعات. ومع Cairo الحروف متوصلة صح.

والجملة المخلوطة: كل كلمة عربي سليمة، بس ترتيب الكلمات ماشي شمال لليمين زي الإنجليزي، فـ «كتاب Next.js 16» بتطلع «كتاب» على الشمال و «Next.js 16» على اليمين، و «سعر الكتاب 250 جنيه» بتتقري من الشمال. أما الكلمة الواحدة (حتى «ج.م» اللي فيها نقطة) بتطلع سليمة. الحل العملي: كل جزء (الاسم، والسعر، والعملة) في div لوحده وترتّبهم بـ flexbox، أو نص قصير من غير خلط. وخد بالك: لما شلنا [[fonts]] و [[fontFamily]] الاتنين، الصورة وقعت خالص: الرد اتقطع من غير status واللوج قال [[lookupType: 5 - substFormat: 3 is not yet supported]] (الخط الاحتياطي اللي اتجاب فيه حاجة Satori مبيدعمهاش). فالخط العربي بتاعك لازم دايمًا.`
        },
        {
          cmd: "JSON-LD",
          title: "JSON-LD للمنتج والمقال عشان rich results في جوجل",
          desc: R`JSON-LD داتا منظمة بتوصف الصفحة بمفردات schema.org: «ده منتج، سعره كذا، ومتوفر، وتقييمه ٤.٦ من ٣٨ رأي». جوجل بيستخدمها في rich results: السعر والنجوم والتوفر تحت اللينك في النتايج، وتاريخ المقال وكاتبه. ومحركات الـ AI بتقراها كمان.

في Next مفيش API خاص: [[<script type="application/ld+json">]] عادي جوه الصفحة (مش [[next/script]]، لأنه مش كود بيتنفذ)، ومحتواه [[JSON.stringify]] مع استبدال [[<]] بـ [[\u003c]]، لأن الداتا جاية من الداتابيز وممكن يبقى فيها [[</script>]]. والأنواع جاهزة في مكتبة [[schema-dts]].`,
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

ليه [[.replace(/</g, "\\u003c")]]؟ [[JSON.stringify]] مبيعملش escape لـ [[</script>]]. لو اسم المنتج فيه [[</script><script>...]]، المتصفح بيقفل الـ tag عند أول [[</script>]] وينفذ اللي بعده: XSS من حقل اسم منتج. و [[\u003c]] هو نفس الحرف جوه JSON، فالـ parser بتاع جوجل بيقراه [[<]] عادي، والمتصفح مش شايف tag.

الحاجات اللي جوجل بيطلبها للـ Product rich result: [[name]]، وواحد على الأقل من [[offers]] أو [[review]] أو [[aggregateRating]]. و [[price]] رقم كنص من غير عملة، و [[priceCurrency]] كود ISO ([[EGP]])، و [[availability]] URL من schema.org. وللمقالات: [[Article]] أو [[NewsArticle]] أو [[BlogPosting]] مع [[headline]] و [[image]] و [[datePublished]] و [[author]] ([[Person]] فيه [[name]] و [[url]]). ومفيش ضمان إن جوجل يعرض الـ rich result حتى لو الداتا صح.

القاعدة الأهم: الـ JSON-LD لازم يطابق اللي ظاهر في الصفحة. سعر في الـ JSON-LD غير اللي في الصفحة، أو تقييمات مش موجودة، ده مخالف لسياسات جوجل وممكن يعمل manual action على الموقع كله.

ومكانه: الصفحة نفسها (المنتج والمقال)، و [[Organization]] و [[WebSite]] ممكن في الـ root layout أو الصفحة الرئيسية. و [[BreadcrumbList]] لمسار الصفحة.`,
            when: "صفحات المنتجات، والمقالات، والوصفات، والفعاليات، والكورسات، والأسئلة الشائعة، وأي صفحة ليها نوع في schema.org وجوجل بيدعمه في rich results.",
            mistakes: R`[[JSON.stringify]] من غير escape لـ [[<]]. و [[next/script]] أو [[<Script>]] للـ JSON-LD. و [[aggregateRating]] بـ [[reviewCount: 0]] أو تقييمات مخترعة. وسعر بالعملة جوه [[price]] ([[250 ج.م]]). وداتا مش ظاهرة في الصفحة. و [[@context]] ناقص. وتحط Product schema على صفحة قايمة فيها ٢٠ منتج (ده [[ItemList]]).`
          },
          teach: R`## الفكرة: object بيوصف المنتج، مطبوع JSON جوه script

الصفحة بتبني object بمفردات schema.org ([[Product]] و [[Offer]] و [[AggregateRating]])، وتطبعه في [[<script type="application/ld+json">]]. المتصفح مبينفذوش، وجوجل بيقراه. اتشغّل في مشروع Next.js 16.4.0 ([[next start]] على بورت 5832)، ومكان [[db]] ملف وهمي فيه منتجين: [[clean-code]] (سعره 25000 قرش، متوفر، تقييمه 4.6 من 38)، و [[xss]] اسمه [[كتاب </script><script>alert(1)</script>]] ومفيش عليه تقييمات، والمتصفح Chrome headless.

---

## ١. [[import type { Product, WithContext } from "schema-dts"]]

[[schema-dts]] (اتسطبت بـ [[npm i schema-dts]]) فيها أنواع TypeScript لكل حاجة في schema.org. [[import type]] = أنواع بس، مفيش كود بيتبعت للمتصفح.

---

## ٢. [[const jsonLd: WithContext<Product> = {...}]]

[[WithContext<Product>]]: object من نوع [[Product]] ولازم فيه [[@context]]. لو كتبت حقل مش موجود في schema.org، أو نسيت [[@type]]، المحرر يعترض.

| الحقل | القيمة | معناها |
|---|---|---|
| [[@context]] | [[https://schema.org]] | «المفردات اللي بستخدمها من هنا» |
| [[@type]] | [[Product]] | نوع الحاجة |
| [[name]] و [[description]] | من الداتابيز | لازم يطابقوا اللي ظاهر في الصفحة |
| [[image]] | array فيها URLs كاملة | صور المنتج |
| [[sku]] | الـ ISBN | رقم المنتج عندك |
| [[offers]] | object نوعه [[Offer]] | العرض: السعر والتوفر |
| [[aggregateRating]] | [[AggregateRating]] أو [[undefined]] | التقييم |

والـ [[@]] في [[@context]] و [[@type]] جزء من الاسم في JSON-LD، عشان كده مكتوبين بين علامات تنصيص.

---

## ٣. [[offers]] من جوه

~~~text
price: (product.priceCents / 100).toFixed(2),
priceCurrency: "EGP",
availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
~~~

- [[priceCents / 100]] = 250، و [[.toFixed(2)]] بيحوّله نص برقمين عشريين: [["250.00"]]. رقم بس، من غير عملة ولا فاصلة.
- [[EGP]]: كود الجنيه المصري في ISO 4217.
- [[availability]]: مش «متوفر» كنص، URL من schema.org. و [[? :]] بيختار واحد منهم.

---

## ٤. [[aggregateRating]] بشرط

~~~text
aggregateRating: product.reviewCount > 0 ? { "@type": "AggregateRating", ratingValue: product.ratingAvg, reviewCount: product.reviewCount } : undefined,
~~~

لو مفيش آراء، القيمة [[undefined]]، و [[JSON.stringify]] بيشيل أي خانة قيمتها [[undefined]] خالص. تقييم بـ [[reviewCount: 0]] مخالف لقواعد جوجل.

---

## ٥. الطباعة: [[dangerouslySetInnerHTML]] و [[replace]]

~~~text
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
~~~

من جوه لبرة:

1. [[JSON.stringify(jsonLd)]]: الـ object بقى نص JSON.
2. [[.replace(/</g, "\\u003c")]]: [[/</g]] regex معناه «كل [[<]]» ([[g]] = global، مش أول واحد بس). وكل واحد بيتبدّل بالـ 6 حروف [[\u003c]]. في الكود مكتوبة بـ backslash اتنين، لأن جوه string في JS الـ backslash الواحد escape: [["\u003c"]] بـ backslash واحد هي نفسها [["<"]].
3. [[dangerouslySetInnerHTML={{ __html: ... }}]]: «حط النص ده جوه الـ tag زي ما هو». React عادة بيعمل escape لأي نص، فلازم الطريقة دي عشان الـ JSON يفضل JSON. والاسم الطويل مقصود: عشان تفتكر إن ده خطر.

---

## ٦. الناتج: منتج عادي

~~~text الناتج (curl localhost:5832/products/clean-code، الوصف مختصر)
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"Clean Code بالعربي","image":["https://books.example.com/img/clean-code.jpg"],"description":"كتاب عن كتابة كود نضيف. ...","sku":"9780132350884","offers":{"@type":"Offer","url":"https://books.example.com/products/clean-code","price":"250.00","priceCurrency":"EGP","availability":"https://schema.org/InStock"},"aggregateRating":{"@type":"AggregateRating","ratingValue":4.6,"reviewCount":38}}</script>
~~~

[[price]] نص [["250.00"]]، و [[ratingValue]] رقم. وفي منتج [[xss]] (من غير آراء) مفيش [[aggregateRating]] خالص.

---

## ٧. ليه الـ [[replace]]؟ جرّبنا الهجمة

### مع الـ replace الصح

~~~text View Source
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"كتاب \u003c/script>\u003cscript>alert(1)\u003c/...
~~~

~~~text الناتج في Chrome
alerts: 0 | h1: كتاب </script><script>alert(1)</script> | ld parsed name: كتاب </script><script>alert(1)</script>
~~~

مفيش [[<]] جوه الـ script، فالمتصفح مشافش [[</script>]]. و [[JSON.parse]] على محتوى الـ script رجّع الاسم الأصلي بالظبط: يعني جوجل هيقراه صح. والـ [[h1]] عرض الاسم نص عادي لأن React عمل له escape ([[&lt;]] في الـ HTML).

### بـ backslash واحد بالغلط

أول مرة كتبنا الملف، الـ backslash التاني ضاع وبقى [["\u003c"]]، وده في JS نفس [["<"]]، يعني الـ replace بيبدّل [[<]] بـ [[<]]: من غير أي حماية:

~~~text View Source
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"كتاب </script><script>alert(1)</script>",...
~~~

~~~text الناتج في Chrome
DIALOG: 1
alerts: 1
~~~

المتصفح قفل الـ data block عند أول [[</script>]] جوه الاسم، واللي بعده بقى [[<script>]] حقيقي واتنفذ. XSS من حقل اسم منتج. فلما تنسخ السطر ده، اتأكد إن الـ backslash اتنين.

---

## ٨. نسخة المقال (الحل)

نفس الفكرة بـ [[@type: "Article"]]. جرّبناها بمقال وهمي:

~~~text الناتج
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"أول مقال","image":["https://books.example.com/c.jpg"],"datePublished":"2026-10-01T09:00:00.000Z","dateModified":"2026-10-03T12:00:00.000Z","author":[{"@type":"Person","name":"Sara","url":"https://books.example.com/authors/sara"}]}</script>
~~~

[[.toISOString()]] بيكتب التاريخ بصيغة ISO 8601 ([[Z]] في الآخر = توقيت UTC)، وده اللي جوجل عايزه.

> Rich Results Test بتاع جوجل محتاج URL على الإنترنت، فمتجرّبش هنا. اللي في الحل عنه من وثائق جوجل.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[<script type="application/ld+json">]] | data block: مبيتنفذش، فمش [[next/script]] ومش محتاج nonce |
| [[WithContext<Product>]] من [[schema-dts]] | المحرر يمسك الحقول الغلط |
| [[price]] نص رقم + [[priceCurrency]] | [["250.00"]] و [[EGP]] |
| [[aggregateRating]] بشرط | مفيش آراء = مفيش تقييم |
| [[.replace(/</g, "\\u003c")]] | backslash اتنين، وإلا مفيش حماية |
| الداتا = اللي ظاهر | غير كده مخالف لقواعد جوجل |`,
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
            R`data block. الـ [[replace]] بيحوّل كل [[<]] لـ [[\u003c]] عشان محدش يقفل الـ tag من جوه الداتا.`,
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
    }
]);
