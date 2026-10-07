// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
]);
