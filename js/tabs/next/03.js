// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
    }
]);
