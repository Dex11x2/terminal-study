// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
          try: R`في مشروع الـ lab من غير الفلاج (create-next-app من 16.4 بيسأل «Would you like to use Cache Components?» والافتراضي Yes، فاختار No، أو امسح [[cacheComponents]] و [[partialPrefetching]] من [[next.config.ts]]) اعمل صفحة فيها [[fetch("https://httpbin.org/uuid")]] واعرض الـ uuid. في [[npm run dev]] اعمل refresh: بيتغير. ضيف [[cache: "force-cache"]]: بقى ثابت. وبعدين ضيف [[cacheComponents: true]] في [[next.config.ts]] واقرا الأخطاء اللي هتطلع: دي الفئة دي كلها.`,
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
          teach: R`## الفكرة: نفس الـ fetch، ٣ نسخ من Next، ٣ تصرفات

المثال ٤ حتت كود، كل حتة بتوري «إزاي تقول لـ Next كاش ده» في نسخة. السطر الأول من Next 14 (من الـ docs، مفيش Next 14 هنا). والباقي اتشغّل في مشروعين Next.js 16.4.0 على ويندوز: واحد من غير [[cacheComponents]] (النموذج القديم، زي Next 15) وواحد بيه. ومكان [[api.example.com]] سيرفر Node صغير على [[localhost:5829/uuid]] بيرجّع [[{ "uuid": "..." }]] جديد مع كل طلب، فلو الرقم اتكرر يبقى الرد جه من الكاش.

> [[create-next-app]] من 16.4 بيسألك [[Would you like to use Cache Components?]] والافتراضي Yes، فالمشروع الجديد بيبدأ بالنموذج الجديد. ولو عايز القديم: اختار No، أو [[--no-cache-components]].

---

## ١. Next 14: [[const a = await fetch(url)]]

~~~text page.tsx
const a = await fetch("https://api.example.com/products");
~~~

[[fetch]] عادي من غير أي خيارات، و [[await]] عشان يستنى الرد. في Next 14 الطلب ده كان بيتحفظ في الـ **Data Cache** على السيرفر **للأبد** من غير ما تطلب، فالداتا مبتتحدثش لحد ما تمسح الكاش. ده اللي اتغير في 15.

### نفس السطر في Next 16 (النموذج القديم)

حطيناه في صفحة مع [[npm run dev]] وعملنا refresh مرتين:

~~~text الناتج
/u1  943d1ca9-d2ed-4aae-af64-61583bd69c1b
/u1  37aba4f3-5999-4150-8138-84b0fe5e1793
~~~

رقم جديد كل مرة: الـ fetch **مبيتكاشش** لوحده. بس خد بالك من الـ build:

~~~text الناتج (npm run build)
├ ○ /u1
├ ○ /u2
└ ƒ /u3
~~~

[[/u1]] لسه [[○]] static: الصفحة مفيهاش حاجة من الطلب، فاترسمت مرة وقت الـ build والـ uuid اتجمد جوه الـ HTML. يعني «الـ fetch مش متكاش» مش معناه «الصفحة dynamic».

---

## ٢. [[cache: "force-cache"]]

~~~text page.tsx
const b = await fetch("https://api.example.com/products", { cache: "force-cache" });
~~~

[[cache]] خيار من الـ fetch العادي في المتصفح، و Next بيستخدمه للـ Data Cache بتاعه:

| القيمة | معناها في Next |
|---|---|
| [[force-cache]] | لو النتيجة في الكاش رجّعها، ولو مش موجودة هاتها واحفظها |
| [[no-store]] | هات من الـ API كل مرة، والصفحة تبقى dynamic |

~~~text الناتج (npm run dev، refresh مرتين)
/u2  4c36cb57-d837-4478-baf5-b04194b08191
/u2  4c36cb57-d837-4478-baf5-b04194b08191
~~~

نفس الرقم: الطلب التاني مراحش للسيرفر.

---

## ٣. [[next: { revalidate: 3600, tags: ["products"] }]]

~~~text page.tsx
const c = await fetch("https://api.example.com/products", { next: { revalidate: 3600, tags: ["products"] } });
~~~

- [[next]]: خانة زوّدها Next على الـ fetch.
- [[revalidate: 3600]]: كاش لمدة ساعة (بالثواني)، وبعدها يتجدد في الخلفية (درس ISR).
- [[tags]]: اسم تمسح بيه بعدين.

جربناه في صفحة dynamic (فيها [[await cookies()]]) عشان الصفحة نفسها تترسم كل مرة، وجنبه fetch من غير خيارات:

~~~text الناتج (refresh مرتين)
a=7a3c9d51-f37c-4080-82c7-0bd41292f4da  c=91ef7f58-cc98-4c1e-a6fa-0d5c072b5cf8
a=27a053a8-d746-49e4-9637-9e6e97c538a7  c=91ef7f58-cc98-4c1e-a6fa-0d5c072b5cf8
~~~

الصفحة اترسمت من جديد ([[a]] اتغير)، بس [[c]] جه من الكاش. ده الفرق بين كاش **الصفحة** وكاش **الداتا**.

---

## ٤. Next 16 مع [[cacheComponents: true]]

~~~text next.config.ts
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};
~~~

(السطر التاني [[partialPrefetching]] الـ docs بتاعة 16.4 بتطلب تكتبه جنبه، ومن غيره بيطلع تحذير.)

~~~text lib/products.ts
async function getProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  return db.product.findMany();
}
~~~

| السطر | معناه |
|---|---|
| [[async function getProducts()]] | دالة عادية |
| [["use cache";]] | directive (زي [["use client"]]): «نتيجة الدالة دي تتكاش» |
| [[cacheLife("hours")]] | العمر بـ profile جاهز من [[next/cache]] |
| [[cacheTag("products")]] | اسم للمسح |
| [[return db.product.findMany()]] | الشغل نفسه، query داتابيز مش fetch |

الفرق الكبير: الكاش على **الدالة**، فبيشتغل مع أي حاجة جواها (Prisma، أو fetch، أو حساب تقيل). الـ build:

~~~text الناتج
db.product.findMany 2026-10-07T07:20:07.874Z
Route (app)      Revalidate  Expire
├ ○ /p4                  1h      1d
~~~

الـ query اتنفذ مرة وقت الـ build. و [[1h]] و [[1d]] جايين من profile [[hours]]:

| profile | stale (المتصفح) | revalidate | expire |
|---|---|---|---|
| [[default]] (لو مكتبتش cacheLife) | ٥ دقايق | ١٥ دقيقة | مبينتهيش |
| [[minutes]] | ٥ دقايق | دقيقة | ساعة |
| [[hours]] | ٥ دقايق | ساعة | يوم |
| [[days]] | ٥ دقايق | يوم | أسبوع |

(الجدول من الـ docs اللي جاية مع Next 16.4، وفيه كمان [[seconds]] و [[weeks]] و [[max]].)

---

## ٥. لما تشغّل الفلاج على كود قديم

ده اللي الـ try بيطلبه. كل غلطة جربناها لوحدها في مشروع الفلاج:

### [[export const revalidate]]

~~~text الناتج
Error: Route segment config "revalidate" is not compatible with nextConfig.cacheComponents. Please remove it.
> 1 | export const revalidate = 3600;
~~~

### fetch من غير كاش ومن غير Suspense

~~~text الناتج
Error: Route "/e2": Next.js encountered uncached or runtime data during prerendering.

Ways to fix this:
  - [stream] Provide a placeholder with <Suspense fallback={...}> around the data access
  - [cache] For uncached data (fetch, database calls): cache the access with "use cache" (does not apply to connection())
  - [block] Set export const instant = false to allow a blocking route
~~~

### [[new Date()]]

~~~text الناتج
Error: Route "/e3": Next.js encountered the unstable value new Date() while prerendering.

Ways to fix this:
  - [dynamic] Render at request time by adding a dynamic data access (e.g. await connection()) before this call
  - [cache] Prerender and cache the value with "use cache"
  - [client] Render the value on the client with "use client"
~~~

### [[use cache]] من غير الفلاج

والعكس: في المشروع القديم:

~~~text الناتج
Error: To use "use cache", please enable the feature flag cacheComponents in your Next.js config.
~~~

---

## الخلاصة

| | Next 14 | Next 15 (و 16 من غير الفلاج) | Next 16 مع [[cacheComponents]] |
|---|---|---|---|
| [[fetch(url)]] | متكاش للأبد | مش متكاش | مش متكاش، ولازم Suspense أو [[use cache]] |
| تطلب كاش بـ | (افتراضي) | [[force-cache]] أو [[next.revalidate]] أو [[unstable_cache]] | [[use cache]] + [[cacheLife]] + [[cacheTag]] |
| عمر الصفحة | [[export const revalidate]] | [[export const revalidate]] | ممنوع: [[cacheLife]] |
| static ولا dynamic | الـ route كله | الـ route كله | كل كومبوننت ([[◐]]) |

> قبل ما تلمس الكاش في أي مشروع، بص على [[next.config.ts]]: فيه [[cacheComponents]] ولا لأ؟`,
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
          ],
          sol: R`من غير خيارات: الـ uuid بيتغير مع كل refresh (Next 15 و 16 مبيكاشوش fetch لوحده). ومع [[cache: "force-cache"]]: نفس الـ uuid مع كل refresh، لأنه اتحفظ في الـ Data Cache. ولو httpbin مقفول أو بطيء عندك، أي API بيرجّع قيمة عشوائية ينفع، حتى سيرفر Node صغير على جهازك.

بعد [[cacheComponents: true]] هتقابل ٣ أنواع أخطاء: [[Route segment config "revalidate" is not compatible with nextConfig.cacheComponents. Please remove it.]] على أي [[export const revalidate]]، و [[Next.js encountered uncached or runtime data during prerendering]] لأي fetch برّه [[<Suspense>]] ومن غير [[use cache]]، و [[Next.js encountered the unstable value new Date() while prerendering]] لـ [[new Date()]] و [[Math.random()]]. وكل رسالة بتقترح الحلول: [[<Suspense>]]، أو [[use cache]]، أو [[connection()]]، وفي النسخ الأحدث كمان [[export const instant = false]].`
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
          teach: R`## الفكرة: دالة بتفتكر نتيجتها

المثال ٣ ملفات: سطر الفلاج، ودالتين عليهم [[use cache]] (منتج، وأسعار بعملة)، وكومبوننت بيقرا الـ cookie **برّه** الكاش ويبعت القيمة جوه. اتشغّل في مشروع Next.js 16.4.0 بـ [[cacheComponents: true]] على ويندوز، ومكان Prisma ملف [[lib/db.ts]] وهمي بيطبع سطر مع كل query، عشان نعرف إمتى الدالة اشتغلت فعلًا وإمتى النتيجة جت من الكاش.

---

## ١. الفلاج

~~~text next.config.ts
const nextConfig: NextConfig = { cacheComponents: true };
~~~

[[NextConfig]] نوع الإعدادات من [[next]]. من غير السطر ده [[use cache]] بيوقّع الـ build ([[To use "use cache", please enable the feature flag cacheComponents]]). وفي 16.4 الـ docs بتقول تكتب جنبه [[partialPrefetching: true]]، ومن غيره بيطلع تحذير بس.

---

## ٢. [[getProduct(slug)]]

~~~text lib/products.ts
import { cacheLife, cacheTag } from "next/cache";
export async function getProduct(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", $__btproduct-$__{slug}$__bt);
  return db.product.findUnique({ where: { slug } });
}
~~~

### [["use cache";]]

لازم يبقى **أول سطر** في الدالة، ونص بين علامتين تنصيص مش import (زي [["use client"]]). الـ compiler بتاع Next بيشوفه ويلف الدالة: قبل ما تشتغل، يدوّر على نتيجة محفوظة بنفس **المفتاح**. والمفتاح بيتعمل لوحده من:

1. الـ build id (كل build جديد كاش جديد).
2. هوية الدالة نفسها.
3. الـ arguments: هنا [[slug]]. فـ [[getProduct("a")]] و [[getProduct("b")]] مفتاحين مختلفين.

### [[cacheLife("hours")]]

العمر. profile [[hours]] = يتجدد في الخلفية بعد ساعة، ومينفعش يترجع خالص بعد يوم من غير طلبات، والمتصفح يستخدمه ٥ دقايق من غير ما يسأل.

### [[cacheTag("products", $__btproduct-$__{slug}$__bt)]]

tagين على نفس النتيجة. التاني template literal: [[$__bt...$__bt]] نص فيه [[$__{slug}]] بيتبدل بالقيمة، فلـ [[a]] بيبقى [[product-a]]. كده تقدر تمسح منتج واحد ([[product-a]]) أو كل المنتجات ([[products]]) (درس updateTag).

### [[return db.product.findUnique(...)]]

الـ query نفسه. والنتيجة لازم تبقى **serializable** (تتحوّل لبيانات وترجع): أرقام ونصوص و objects عادية و arrays و JSX. مش class instance، ومش دالة.

---

## ٣. التجربة: [[getProduct("a")]] و [[getProduct("b")]]

نسخة الـ solCode بترجّع [[Date.now()]] (الوقت بالملّي ثانية من ١٩٧٠) بدل الداتابيز، عشان نشوف إمتى اتحسبت:

~~~text app/cc/page.tsx
export default async function Page() {
  const a = await getProduct("a");
  const b = await getProduct("b");
  return <p>a={a.at} b={b.at}</p>;
}
~~~

~~~text الناتج (npm run build)
Route (app)      Revalidate  Expire
├ ○ /cc                  1h      1d
~~~

وبعد [[npm start]] طلبناها مرتين:

~~~text الناتج
a=1791357607863 b=1791357607869
a=1791357607863 b=1791357607869
~~~

- الأرقام **ثابتة** بين الطلبين: اتحسبت مرة وقت الـ build.
- [[a]] و [[b]] **مختلفين** (بفرق ٦ ملّي ثانية): كل slug ليه entry لوحده.

والـ header:

~~~text الناتج
x-nextjs-cache: HIT
Cache-Control: s-maxage=3600, stale-while-revalidate=82800
~~~

[[3600]] ثانية = ساعة (revalidate)، و [[82800]] = 86400 − 3600، يعني باقي اليوم (expire).

---

## ٤. [[getPrices(currency)]]

~~~text lib/products.ts
export async function getPrices(currency: "EGP" | "USD") {
  "use cache";
  cacheLife("minutes");
  return db.price.findMany({ where: { currency } });
}
~~~

- [["EGP" | "USD"]]: نوع TypeScript معناه «واحدة من القيمتين دول بس» (union). فمفيش غير مفتاحين ممكنين.
- [[cacheLife("minutes")]]: الأسعار بتتغير أكتر: يتجدد بعد دقيقة، وينتهي بعد ساعة.

---

## ٥. الكومبوننت اللي بيقرا الـ cookie

~~~text app/products/prices.tsx
export async function Prices() {
  const currency = (await cookies()).get("currency")?.value === "USD" ? "USD" : "EGP";
  const prices = await getPrices(currency);
  return <PriceTable prices={prices} />;
}
~~~

السطر الطويل من جوه لبرة:

1. [[await cookies()]]: الـ cookies بتاعة الطلب ده (من [[next/headers]]).
2. [[.get("currency")]]: الـ cookie اللي اسمها currency، أو undefined.
3. [[?.value]]: قيمتها، و [[?.]] عشان لو مش موجودة ميرميش error.
4. [[=== "USD" ? "USD" : "EGP"]]: لو بالظبط [[USD]] خليها USD، وأي حاجة تانية (أو مفيش) EGP. كده لو حد بعت cookie غريبة مش هيعمل entry كاش جديد.

وبعدين [[getPrices(currency)]]: القيمة رايحة **argument**، فبقت جزء من المفتاح. الـ cookie نفسها اتقرت برّه الدالة المتكاشة.

> الكومبوننت ده بيقرا cookies، فلازم يبقى جوه [[<Suspense>]] في الصفحة (الدرس الجاي). حطيناه كده وطلع في الجدول [[◐ /prices]].

طلبنا الصفحة ٣ مرات بـ cookies مختلفة ([[curl -b "currency=USD"]] بيبعت cookie):

~~~text الناتج (الصفحة)
currency=EGP   EGP@1791357622469
currency=USD   USD@1791357622633
currency=USD   USD@1791357622633
~~~

~~~text الناتج (لوج السيرفر)
db.price.findMany EGP 2026-10-07T07:20:22.466Z
db.price.findMany USD 2026-10-07T07:20:22.631Z
~~~

query واحد لكل عملة: طلب USD التاني جه من الكاش.

---

## ٦. لو قريت الـ cookie **جوه** [[use cache]]

~~~text page.tsx
async function getX(slug: string) {
  "use cache";
  await cookies();
  return { slug, at: Date.now() };
}
~~~

~~~text الناتج (npm run build)
Error: Route "/ce": cookies() can't be read inside "use cache". Read it outside the cached function and pass what you need as an argument.
> 4 |   await cookies();
~~~

ليه ممنوع؟ النتيجة المتكاشة **مشتركة بين كل الزوار**. لو اتحسبت من cookie زائر، الزائر اللي بعده هياخد داتا الأول. والرسالة نفسها بتقول الحل اللي في [[Prices]]: اقرا برّه، وابعت القيمة.

---

## الخلاصة

| الحاجة | التفاصيل |
|---|---|
| المكان | أول سطر في دالة async أو كومبوننت async (أو أول الملف) |
| المفتاح | الـ build + الدالة + الـ arguments (لوحده) |
| العمر | [[cacheLife("hours")]]، ومن غيره [[default]]: ربع ساعة |
| المسح | [[cacheTag("x")]] ثم [[updateTag]] أو [[revalidateTag]] |
| ممنوع جواه | [[cookies()]] و [[headers()]] و [[searchParams]] |
| الـ arguments والناتج | serializable |

> أي حاجة بتفرق بين زائر وزائر لازم تبقى argument، وإلا يا الـ build يقع يا داتا تتسرب.`,
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
          ],
          sol: R`الجدول بيقول [[○ /cc]] وجنبها [[1h]] و [[1d]] (الـ profile [[hours]]: revalidate ساعة و expire يوم). وكل refresh نفس الأرقام، زي [[a=1790719450515 b=1790719450521]]: ثابتة لكل slug ومختلفة بينهم، لأن الـ argument جزء من مفتاح الكاش.

ولما تحط [[await cookies()]] جوه الدالة، الـ build بيقع (Next 16.4): [[Route "/cc": cookies() can't be read inside "use cache". Read it outside the cached function and pass what you need as an argument.]] والرسالة نفسها بتقول الحل: اقرا الـ cookie برّه الدالة وابعت القيمة كـ argument، زي [[Prices]] في المثال. ولو الـ build قال إن [[use cache]] محتاج [[cacheComponents]]: الفلاج مش في [[next.config.ts]].`,
          solCode: R`// lib/products.ts
import { cacheLife, cacheTag } from "next/cache";
export async function getProduct(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", "product-" + slug);
  return { slug, at: Date.now() };
}
// app/cc/page.tsx
import { getProduct } from "@/lib/products";
export default async function Page() {
  const a = await getProduct("a");
  const b = await getProduct("b");
  return <p>a={a.at} b={b.at}</p>;
}`
        },
        {
          cmd: "static shell و Suspense",
          title: "صفحة واحدة: shell جاهز من الـ build وحتت بتتحسب مع الطلب",
          desc: R`مع [[cacheComponents]]، Next بيرسم كل صفحة وقت الـ build لحد ما يقابل حاجة مش متكاشة: [[cookies()]]، أو [[params]] مش معروفة، أو query من غير [[use cache]]. الجزء اللي اترسم بيبقى static shell بيتبعت فورًا، والحاجات الـ dynamic بتكمّل streaming مع الطلب. ده Partial Prerendering، ورمزه [[◐]] في جدول الـ build.

الشرط: أي حاجة dynamic لازم تبقى جوه [[<Suspense>]] عشان Next يعرف يحط إيه مكانها في الـ shell. لو لأ، بيطلع خطأ في dev وفي الـ build (في 16.0 كان «Uncached data was accessed outside of <Suspense>»، وفي النسخ الأحدث «Next.js encountered uncached or runtime data during prerendering»). والحل يا تكاشها بـ [[use cache]]، يا تلفها في Suspense.`,
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
          teach: R`## الفكرة: الصفحة ٣ حتت، وكل حتة تيجي في وقتها

صفحة منتج فيها: header ثابت لكل الناس، وبيانات المنتج (متكاشة بـ [[use cache]])، وعدد حاجات السلة (من cookie، يعني لكل زائر رقم). الصفحة نفسها مش بتستنى حاجة، وكل جزء بيستنى حاجة ملفوف في [[<Suspense>]]. النتيجة: Next بيبني shell جاهز وقت الـ build، والسلة بس هي اللي بتتحسب مع الطلب.

اتشغّل في مشروع Next.js 16.4.0 بـ [[cacheComponents: true]] على ويندوز. [[getProduct]] هي اللي في الدرس اللي فات، و [[SiteHeader]] بيطبع [[SITE HEADER]]، و [[ProductSkeleton]] بيطبع [[LOADING PRODUCT]]، و [[countCartItems]] بتستنى ثانية وترجّع طول الـ cartId (عشان نشوف الـ streaming بعينينا).

---

## ١. الـ imports

~~~text app/products/[slug]/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";
~~~

[[Suspense]] كومبوننت من React: بيعرض [[fallback]] لحد ما اللي جواه يخلص. و [[cookies]] من Next، وبترجّع Promise.

---

## ٢. الصفحة نفسها

~~~text app/products/[slug]/page.tsx
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
~~~

- **مش [[async]] ومفيهاش [[await]]**: ده أهم سطر في الدرس. الصفحة بترجّع JSX على طول، فـ Next يقدر يرسمها كلها وقت الـ build.
- [[params]] بتتبعت لـ [[ProductInfo]] زي ما هي: **Promise** لسه متفكتش. اللي هيعمل [[await]] هو [[ProductInfo]] جوه الـ Suspense بتاعه.
- [[<>...</>]]: Fragment، أكتر من عنصر من غير div زيادة.
- [[<SiteHeader />]]: برّه أي Suspense، فهو جزء من الـ shell دايمًا.
- كل [[<Suspense fallback={...}>]] «فتحة»: الـ fallback يتحط في الـ shell مكانها، والمحتوى الحقيقي ييجي بعدين.

---

## ٣. [[ProductInfo]]

~~~text app/products/[slug]/page.tsx
async function ProductInfo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return <h1>{product?.name}</h1>;
}
~~~

- النوع [[Promise<{ slug: string }>]]: [[params]] وعد بـ object فيه [[slug]].
- [[await params]] هنا، جوه الـ Suspense. لو الـ slug مش معروف وقت الـ build، الكومبوننت ده بس اللي يستنى.
- [[getProduct(slug)]] عليها [[use cache]]، فلو الـ slug معروف وقت الـ build المنتج نفسه بيدخل في الـ shell.
- [[product?.name]]: لو المنتج مش موجود ([[null]]) مفيش error.

## ٤. [[CartBadge]]

~~~text app/products/[slug]/page.tsx
async function CartBadge() {
  const cartId = (await cookies()).get("cart")?.value;
  const count = cartId ? await countCartItems(cartId) : 0;
  return <span>{count}</span>;
}
~~~

- [[(await cookies()).get("cart")?.value]]: قيمة cookie اسمها [[cart]]، أو undefined.
- [[cartId ? ... : 0]]: لو فيه سلة هات العدد، لو مفيش 0 من غير ما تكلّم الداتابيز.
- ده لا ينفع يتكاش ولا يتبني مقدمًا: كل زائر وسلته.

---

## ٥. الـ build: [[◐]]

من غير [[generateStaticParams]]:

~~~text الناتج
└   /products/[slug]
  └ ◐ /products/[slug]

◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content
~~~

shell واحد لكل المنتجات: header و [[LOADING PRODUCT]] و [[السلة...]].

وبعد ما زوّدنا (زي الـ try):

~~~text app/products/[slug]/page.tsx
export async function generateStaticParams() {
  return [{ slug: "a" }];
}
~~~

~~~text الناتج
db.product.findUnique a 2026-10-07T07:23:22.858Z
Route (app)             Revalidate  Expire
└   /products/[slug]
  ├ ◐ /products/[slug]
  └ ◐ /products/a               1h      1d
~~~

[[/products/a]] بقى ليه shell لوحده **فيه المنتج نفسه** (الـ query اتنفذ وقت الـ build)، و [[1h]] و [[1d]] جايين من [[cacheLife("hours")]] جوه [[getProduct]]. ولسه [[◐]] مش [[○]]، عشان السلة.

---

## ٦. الطلب: الـ shell الأول، والسلة بعده

سكربت Node صغير طلب [[/products/a]] ومعاه [[cart=abc]]، وطبع كل حتة وصلت ووقتها:

~~~text الناتج
200 headers after 202 ms  x-nextjs-postponed=1
+274ms   1319 bytes  ["SITE HEADER","السلة...","Product A"]
+336ms   4953 bytes
+1287ms  85 bytes
+1289ms  903 bytes   ["<span>"]
~~~

- [[x-nextjs-postponed: 1]]: الصفحة دي shell وفيه أجزاء «اتأجلت» للطلب.
- **أول حتة** (+274ms): الـ header والمنتج و [[السلة...]] كلهم مرة واحدة: ده الـ shell.
- **بعد ثانية** (+1289ms): وصلت السلة. الثانية دي هي [[setTimeout]] بتاع [[countCartItems]]، والـ response فضل مفتوح لحد ما خلصت.

والـ HTML نفسه:

~~~text الناتج (أوله)
<header>SITE HEADER</header><!--$--><h1>Product A</h1><!--/$--><!--$?--><template id="B:0"></template><span>السلة...</span><!--/$-->
~~~

~~~text الناتج (آخره، الحتة اللي جت متأخر)
<div hidden id="S:0"><span>3</span></div><script>$RB=[];$RV=function(a){...
~~~

[[<template id="B:0">]] علامة مكان الفتحة، والحتة المتأخرة [[<div hidden id="S:0">]] فيها [[<span>3</span>]] (طول [[abc]])، والـ script اللي بعدها بيشيل [[السلة...]] ويحط الـ 3 مكانها. كل ده في **نفس** الـ response.

---

## ٧. لو عملت [[await cookies()]] في الصفحة نفسها

~~~text app/products/[slug]/page.tsx
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  await cookies();
  return (
~~~

في [[npm run dev]] الصفحة فتحت (200)، بس الترمنال طبع:

~~~text الناتج (next dev)
Error: Route "/products/[slug]": Next.js encountered runtime data during prerendering.

cookies(), headers(), params, or searchParams accessed outside of <Suspense> prevents the route from being prerendered, blocking the page load and leading to a slower user experience.

Ways to fix this:
  - [stream] Provide a placeholder with <Suspense fallback={...}> around the data access
  - [block] Set export const instant = false to allow a blocking route
    at ProductPage (app\products\[slug]\page.tsx:9:16)
~~~

وفي [[npm run build]] الـ build وقع:

~~~text الناتج (next build)
Error: Route "/products/[slug]": Next.js encountered uncached or runtime data during prerendering.
...
Export encountered an error on /products/[slug]/page: /products/a, exiting the build.
~~~

السبب: الـ cookie برّه أي Suspense، فـ Next مش عارف يحط إيه مكان الصفحة كلها في الـ shell. الحل مش Suspense حوالين الصفحة كلها (الـ shell هيبقى فاضي)، الحل تنزّل الـ await للكومبوننت اللي محتاجه، زي [[CartBadge]].

---

## الخلاصة

| الحتة | بتتحسب إمتى | في الـ shell إيه |
|---|---|---|
| [[SiteHeader]] | وقت الـ build | نفسه |
| [[ProductInfo]] لـ slug من [[generateStaticParams]] | وقت الـ build ([[use cache]]) | المنتج نفسه |
| [[ProductInfo]] لـ slug تاني | مع الطلب (والـ query متكاش) | [[ProductSkeleton]] |
| [[CartBadge]] | مع كل طلب | [[السلة...]] |

> القاعدة: الصفحة متعملش await. كل await لحاجة من الطلب يتحط في كومبوننت صغير جوه Suspense.`,
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
          ],
          sol: R`الشكل الأصلي بيعدّي. ولما تنقل [[await cookies()]] لجسم الصفحة، الخطأ في dev (Next 16.4) بيبدأ بـ [[Route "/products/[slug]": Next.js encountered runtime data during prerendering]]، وفي الـ build بـ [[encountered uncached or runtime data during prerendering]]، وبيقول إن [[cookies()]] أو [[params]] أو غيرهم اتقروا برّه [[<Suspense>]] فالصفحة مش هتتبني، وبيقترح حلول: Suspense، أو [[export const instant = false]]، والـ build بيزوّد [[use cache]] للداتا اللي مش متكاشة. و [[instant = false]] بيسمح للصفحة تستنى (وده عكس الفكرة، فمش ده الحل هنا).

بعد ما ترجّعها وتضيف [[generateStaticParams]]: الجدول فيه [[◐ /products/[slug]]] و [[◐ /products/a]]، وجنب [[a]] [[1h]] و [[1d]] جايين من [[cacheLife]] بتاع [[getProduct]]، وتحت الجدول شرح الرمز: Partial Prerender، يعني HTML static وجواه حتت dynamic بتيجي streaming. الـ header والـ skeleton في الـ shell، والسلة مع الطلب.`
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
          teach: R`## الفكرة: الداتا اتغيرت، فقول للكاش

المثال ملفين: Server Action بيغيّر سعر منتج ويمسح ٣ أنواع كاش، و Route Handler بيستقبل webhook من CMS ويمسح tag بالاسم. الأدوات التلاتة من [[next/cache]]، والفرق بينهم: **إمتى** الزائر يشوف الجديد.

اتشغّل في مشروع Next.js 16.4.0 بـ [[cacheComponents: true]] على ويندوز. صفحة [[/admin/price]] بتعرض سعر المنتج [[a]] من [[getProduct]] (المتكاشة بـ [[cacheTag("products", "product-a")]] من درس use cache)، وتحتها فورمين: واحد بالـ action بتاع المثال، وواحد نسخة فيها [[revalidateTag]] بس. ومتصفح Chrome headless (عن طريق playwright-core) ضغط الأزرار وقرا السعر.

---

## ١. أول الملف

~~~text app/actions/products.ts
"use server";
import { updateTag, revalidateTag, revalidatePath } from "next/cache";
~~~

[["use server"]] فوق الملف: كل دالة مصدّرة منه Server Action (الفئة الجاية). ومن [[next/cache]] التلات أدوات.

## ٢. الـ action

~~~text app/actions/products.ts
export async function updatePrice(slug: string, formData: FormData) {
  await requireAdmin();
  const price = Number(formData.get("price"));
  await db.product.update({ where: { slug }, data: { priceCents: Math.round(price * 100) } });
~~~

- [[slug: string]] الأول و [[formData]] تاني: في الفورم بنكتب [[action={updatePrice.bind(null, "a")}]]. [[.bind(null, "a")]] بيعمل نسخة من الدالة أول argument فيها متثبت على [["a"]]، و React بيحط الـ FormData بعده.
- [[requireAdmin()]]: دالة بتاعتك بترمي أو تحوّل لو المستخدم مش أدمن (درس الأمان).
- [[Number(formData.get("price"))]]: القيمة من الفورم دايمًا نص، فبنحوّلها رقم.
- [[Math.round(price * 100)]]: الفلوس بتتخزن **قروش صحيحة** (250 جنيه = 25000). [[Math.round]] عشان [[0.1 * 100]] في JavaScript ممكن يطلع رقم فيه كسور صغيرة.

## ٣. التلات سطور

~~~text app/actions/products.ts
  updateTag($__btproduct-$__{slug}$__bt);
  revalidateTag("products", "max");
  revalidatePath("/admin/products");
}
~~~

| السطر | بيعمل إيه | الطلب الجاي بياخد إيه |
|---|---|---|
| [[updateTag("product-a")]] | الكاش ده **انتهى** دلوقتي | بيستنى الداتا الجديدة |
| [[revalidateTag("products", "max")]] | الكاش ده **قديم** (stale) | القديم فورًا، والجديد بيتبني في الخلفية |
| [[revalidatePath("/admin/products")]] | امسح الصفحة دي بالمسار | الصفحة تتبني من جديد |

- [[updateTag]] بياخد argument واحد، ومتاح **في Server Actions بس** (الـ docs: [[It cannot be used in Route Handlers]]).
- [[revalidateTag]] في Next 16 بياخد اتنين. التاني profile: [["max"]] من profiles الـ [[cacheLife]]. في Next 16.4 النوع نفسه [[revalidateTag(tag: string, profile: string | CacheLifeConfig)]]، فلو كتبت argument واحد TypeScript بيعترض.

---

## ٤. التجربة: [[updateTag]] ضد [[revalidateTag]] بس

السعر في الأول 200. كتبنا 250 في الفورم الأول (المثال كامل)، وبعدين 300 في الفورم التاني (فيه [[revalidateTag("product-a", "max")]] بس):

~~~text الناتج (Chrome headless)
start: 200
after updateTag action (no reload): 250
reload 1: 250
after revalidateTag action (no reload): 250
reload 1: 250
reload 2: 300
~~~

### مع [[updateTag]]

بعد الضغط على طول (من غير refresh) السعر **250**. الـ action خلص، و Next رجّع في نفس الرد الصفحة متحسبة من جديد، والـ query اتنفذ تاني لأن الكاش انتهى. ده «read your own writes»: اللي عدّل يشوف تعديله.

### مع [[revalidateTag]] بس

1. بعد الضغط: **250** لسه. الكاش اتعلّم قديم بس، فاللي رجع هو القديم.
2. أول refresh: **250** برضه. الطلب ده خد النسخة الـ stale وشغّل التجديد في الخلفية.
3. التاني: **300**.

ولوج السيرفر بيأكد: [[db.product.update a 30000]] وبعده [[db.product.findUnique a]] (التجديد في الخلفية).

---

## ٥. الـ webhook

~~~text app/api/cms-webhook/route.ts
export async function POST(request: Request) {
  if (request.headers.get("x-webhook-secret") !== process.env.CMS_WEBHOOK_SECRET) {
    return new Response("unauthorized", { status: 401 });
  }
  const { tag } = (await request.json()) as { tag: string };
  revalidateTag(tag, "max");
  return Response.json({ revalidated: tag });
}
~~~

- [[export async function POST]]: Route Handler بيرد على POST بس (درس route.ts).
- [[request.headers.get("x-webhook-secret")]]: header بيبعته الـ CMS. و [[process.env.CMS_WEBHOOK_SECRET]] نفس السر محطوط في [[.env.local]]. لو مختلفين: [[401]] (مش مسموح) ومتمسحش حاجة.
- [[(await request.json()) as { tag: string }]]: جسم الطلب JSON، و [[as]] بيقول لـ TypeScript شكله (من غير فحص حقيقي).
- [[revalidateTag(tag, "max")]]: هنا لازم [[revalidateTag]]، لأن [[updateTag]] مينفعش برّه Server Action.

جربناه بـ curl (السر في [[.env.local]] كان [[s3cret-lab]]):

~~~bash
curl -s -i -X POST localhost:5827/api/cms-webhook -d '{"tag":"products"}'
curl -s -i -X POST localhost:5827/api/cms-webhook -H "x-webhook-secret: s3cret-lab" -H "Content-Type: application/json" -d '{"tag":"products"}'
~~~

- [[-X POST]]: نوع الطلب. [[-H]]: header. [[-d]]: الـ body. [[-i]]: اطبع الـ headers مع الرد.

~~~text الناتج
HTTP/1.1 401 Unauthorized
unauthorized

HTTP/1.1 200 OK
content-type: application/json
{"revalidated":"products"}
~~~

وبعدها طلبنا الصفحة مرتين:

~~~text الناتج
x-nextjs-cache: STALE
x-nextjs-cache: HIT
~~~

أول طلب خد القديم ([[STALE]]) وشغّل التجديد، والتاني جديد ([[HIT]]).

> على PowerShell: [[curl.exe]] بنفس الخيارات، بس علامات التنصيص حوالين الـ JSON بتختلف، فالأسهل [[Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/cms-webhook -Headers @{ "x-webhook-secret" = "..." } -ContentType "application/json" -Body '{"tag":"products"}']]. جربناه في [[pwsh]] و [[powershell]] 5.1 ورجّع جدول فيه عمود [[revalidated]] وتحته [[products]] (PowerShell بيحوّل الـ JSON لـ object ويعرضه).

---

## الخلاصة

| | [[updateTag(tag)]] | [[revalidateTag(tag, "max")]] | [[revalidatePath(path)]] |
|---|---|---|---|
| فين | Server Actions بس | Actions و Route Handlers | Actions و Route Handlers |
| الطلب الجاي | بيستنى الجديد | بياخد القديم، والجديد في الخلفية | الصفحة تتبني تاني |
| لإمتى | المستخدم عدّل ومستني يشوف | webhook أو محتوى عام | لو مش مستخدم tags |

> اسم الـ tag لازم يبقى نفسه بالحرف في [[cacheTag]] وفي المسح. لو غلط، مفيش error، والكاش مبيتمسحش.`,
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
          ],
          sol: R`مع [[updateTag]]: بعد الحفظ على طول السعر الجديد ظاهر، لأن الـ entry اتمسح والـ action رجّع الصفحة بالداتا الجديدة في نفس الرد.

مع [[revalidateTag(tag, "max")]] بس: بعد الحفظ السعر القديم لسه ظاهر، وأول refresh ممكن كمان يجيب القديم (stale) وهو بيشغّل التجديد في الخلفية، والـ refresh اللي بعده فيه الجديد. في تجربتي: غيّرت السعر لـ 300 بـ revalidateTag، فبعد الحفظ 200، وأول refresh 200، والتاني 300.

ولو السعر مبيتغيرش خالص حتى بعد كذا refresh: اسم الـ tag في [[cacheTag]] مش هو اللي بتمسحه (حرف مختلف ومفيش أي خطأ)، أو الـ action مبيحدّثش الداتا أصلًا.`
        }
      ]
    }
]);
