// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
# ├   /blog/[slug]
# │ ├ ● /blog/a
# │ └ ● /blog/b
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
          teach: R`## الفكرة: ٣ أوامر بتجاوب سؤال واحد

السؤال: كل صفحة في مشروعي بتتبني **مرة واحدة** وقت الـ build، ولا **مع كل طلب**؟ أول أمر بيبني المشروع ويطبع الإجابة في جدول، والتاني بيشغّل النسخة المبنية، والتالت والرابع بيتأكدوا من الإجابة من الـ headers اللي السيرفر بيبعتها.

كل الناتج تحت حقيقي من مشروع [[create-next-app]] جديد (Next.js 16.4.0، من غير [[cacheComponents]]) على ويندوز، وفيه صفحات بنفس أسامي المثال. السيرفر اشتغل على بورت 5825 بدل 3000، فالـ URLs عندك هتبقى [[localhost:3000]].

---

## ١. [[npm run build]]

[[npm run build]] بيشغّل السكربت اللي اسمه [[build]] في [[package.json]]، وده في مشروع Next هو [[next build]]. بيعمل ٣ حاجات بالترتيب:

1. **Compile**: يحوّل الـ TypeScript والـ JSX لـ JavaScript.
2. **Type check**: يشغّل TypeScript على المشروع كله، ولو فيه خطأ نوع الـ build بيقع.
3. **Generate static pages**: يحاول **يرسم كل صفحة** دلوقتي، ويحفظ اللي ينفع يتحفظ.

~~~text الناتج (آخره)
▲ Next.js 16.4.0 (Turbopack)
✓ Compiled successfully in 2.5s
  Finished TypeScript in 1745ms ...
✓ Generating static pages using 11 workers (12/12) in 879ms

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├   /blog/[slug]
│ ├ ● /blog/a
│ ├ ● /blog/b
│ └ ● /blog/c
├ ƒ /dashboard
├ ƒ /products
├ ○ /time
└ ƒ /time2

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
~~~

- **Turbopack**: الأداة اللي بتعمل الـ compile، وهي الافتراضية في Next 16.
- **11 workers**: Next بيرسم الصفحات بالتوازي على أكتر من process (الرقم حسب عدد الـ cores عندك).
- **(12/12)**: عدد الحاجات اللي اترسمت، ومنها صفحات داخلية زي [[/_not-found]] (صفحة 404 الجاهزة).

### نقرا الجدول

| الرمز | اسمه | معناه |
|---|---|---|
| [[○]] | Static | اترسمت وقت الـ build لأنها مبتقراش أي حاجة من الطلب |
| [[●]] | SSG | static برضه، بس من صفحة فيها [[[slug]]] والـ slugs جت من [[generateStaticParams]] (الدرس الجاي) |
| [[ƒ]] | Dynamic | مش هتترسم غير لما طلب ييجي، ومع **كل** طلب |

SSG اختصار Static Site Generation. والسطر [[/blog/[slug]]] من غير رمز: ده القالب نفسه، وتحته الصفحات اللي اتبنت منه فعلًا.

### ليه [[/dashboard]] بقت [[ƒ]]؟

~~~text app/dashboard/page.tsx
import { cookies } from "next/headers";
export default async function Dashboard() {
  const theme = (await cookies()).get("theme")?.value ?? "light";
  return <h1>dashboard {theme}</h1>;
}
~~~

[[cookies()]] الـ cookies اللي المتصفح بعتها مع الطلب. وقت الـ build مفيش طلب ولا متصفح، فـ Next ميقدرش يرسمها. فبيعلّم الـ route كله [[ƒ]]. ونفس الكلام في [[/products]] لأنها بتقرا [[searchParams]] (الـ [[?q=...]] في الـ URL، ودي برضه مش معروفة غير مع الطلب).

---

## ٢. [[npm start]]

[[npm start]] = [[next start]]: بيشغّل السيرفر على الملفات اللي الـ build عملها في فولدر [[.next]]. ولازم يتعمل بعد [[build]]، ومش بيعمل build لوحده.

~~~text الناتج
▲ Next.js 16.4.0
- Local:         http://localhost:5825
✓ Ready in 264ms
~~~

السيرفر فاضل شغال، فالترمنال ده مشغول. الأوامر الجاية في ترمنال تاني.

---

## ٣. [[curl -sI localhost:3000/about | grep -i cache-control]]

هنفكه من الشمال لليمين، بنفس ترتيب التنفيذ.

### [[curl]]

برنامج بيبعت طلب HTTP ويطبع الرد في الترمنال، زي متصفح من غير شاشة.

### [[-s]] و [[-I]]

- [[-s]] = silent: متطبعش شريط التقدم.
- [[-I]] = head: ابعت طلب [[HEAD]] بدل [[GET]]، والسيرفر بيرد بالـ **headers بس** من غير الصفحة نفسها.

~~~bash
curl -sI localhost:5825/about
~~~

~~~text الناتج
HTTP/1.1 200 OK
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
X-Powered-By: Next.js
Cache-Control: s-maxage=31536000
ETag: "ggh41dmefe3yq"
Content-Type: text/html; charset=utf-8
Content-Length: 5138
~~~

السطور اللي تهمنا:

| الـ header | معناه |
|---|---|
| [[x-nextjs-cache: HIT]] | الصفحة اترجعت من الكاش (الملف اللي اتبنى)، محدش رسمها دلوقتي |
| [[x-nextjs-prerender: 1]] | الصفحة دي متبنية مقدمًا (prerender) |
| [[Cache-Control: s-maxage=31536000]] | تعليمات لأي cache في النص |

### [[| grep -i cache-control]]

[[|]] (pipe) بيدّي ناتج [[curl]] لـ [[grep]]، و [[grep]] بيطبع السطور اللي فيها الكلمة بس، و [[-i]] = ignore case (السيرفر كاتبها [[Cache-Control]] بحروف كبيرة):

~~~text الناتج
Cache-Control: s-maxage=31536000
~~~

### الرقم ده إيه؟

[[s-maxage]] = shared max age: «أي cache **مشترك** (CDN أو proxy) يقدر يحتفظ بالصفحة دي الوقت ده بالثواني». و 31536000 ثانية = 365 × 24 × 60 × 60 = **سنة**. يعني: الصفحة دي مش هتتغير لحد الـ build الجاي، فكاشها براحتك. والمتصفح نفسه مش بيتأثر بـ [[s-maxage]] (ده للـ caches المشتركة بس).

---

## ٤. نفس الأمر على [[/dashboard]]

~~~bash
curl -sI localhost:5825/dashboard | grep -i cache-control
~~~

~~~text الناتج
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
~~~

| الكلمة | معناها |
|---|---|
| [[private]] | الرد ده لشخص واحد، ممنوع على أي CDN يحفظه |
| [[no-store]] | متحفظوش خالص في أي مكان |
| [[no-cache]] و [[max-age=0]] و [[must-revalidate]] | ولو اتحفظ، اسأل السيرفر قبل أي استخدام |

ومفيش [[x-nextjs-cache]] هنا: مفيش نسخة محفوظة أصلًا، الصفحة اترسمت للطلب ده.

---

## ٥. التجربة: الوقت ثابت ولا بيتغير؟

صفحتين، الفرق بينهم سطر واحد:

~~~text app/time/page.tsx
export default async function TimePage() {
  return <p>{new Date().toISOString()}</p>;
}
~~~

~~~text app/time2/page.tsx
import { cookies } from "next/headers";
export default async function TimePage() {
  await cookies();
  return <p>{new Date().toISOString()}</p>;
}
~~~

[[new Date().toISOString()]] الوقت دلوقتي كنص بصيغة ISO (الـ Z في الآخر = توقيت UTC). طلبنا كل صفحة مرتين ورا بعض:

~~~text الناتج
/time   <p>2026-10-07T07:11:40.043Z</p>
/time   <p>2026-10-07T07:11:40.043Z</p>
/time2  <p>2026-10-07T07:11:56.607Z</p>
/time2  <p>2026-10-07T07:11:57.752Z</p>
~~~

[[/time]] نفس الرقم بالملّي ثانية: ده وقت الـ build، والسيرفر بيرجّع نفس الملف. و [[/time2]] اتغير بين الطلبين: [[await cookies()]] لوحده (حتى من غير ما نستخدم القيمة) خلّى الصفحة [[ƒ]].

> في [[npm run dev]] الاتنين بيتغيروا مع كل refresh، لأن الـ dev بيرسم كل حاجة مع كل طلب. جربناها: [[/time]] طلّعت [[07:14:45.822Z]] وبعد ثانية [[07:14:47.038Z]]، والـ header كان [[Cache-Control: no-store]]. السلوك الحقيقي بتشوفه بـ [[build]] و [[start]] بس.

---

## ٦. على ويندوز

[[npm run build]] و [[npm start]] زي ما هم. الفرق في الـ curl:

| | الأمر |
|---|---|
| bash (لينكس والماك و Git Bash) | [[curl -sI localhost:3000/about | grep -i cache-control]] |
| PowerShell 7 و 5.1 | [[curl.exe -sI localhost:3000/about | Select-String cache-control]] |

- اكتب [[curl.exe]] مش [[curl]]: في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم تاني لـ [[Invoke-WebRequest]]، وده أمر مختلف مبيفهمش [[-sI]].
- [[grep]] مش موجود في PowerShell، وبداله [[Select-String]]، وهو مش حساس لحالة الحروف من الأول.

اتجرّب في [[pwsh]] و [[powershell]] وطلّع نفس سطر [[Cache-Control]] بالظبط.

---

## الخلاصة

| | static ([[○]] و [[●]]) | dynamic ([[ƒ]]) |
|---|---|---|
| بتترسم إمتى | مرة وقت [[next build]] | مع كل طلب |
| [[Cache-Control]] | [[s-maxage=31536000]] | [[private, no-cache, no-store, ...]] |
| [[x-nextjs-cache]] | [[HIT]] | مش موجود |
| إيه اللي بيخليها كده | مفيش حاجة من الطلب | [[cookies()]] أو [[headers()]] أو [[searchParams]] أو [[connection()]] أو fetch بـ [[no-store]] |

> سطر واحد بيقرا الطلب كفاية يخلي الـ route كله dynamic. اقرا الجدول بعد كل build، واختبر بـ [[start]] مش [[dev]].`,
          lines: [
            "ابني للإنتاج، واقرا جدول الـ routes اللي بيطلع في الآخر.",
            R`شغّل الناتج (في ترمنال لوحده). تفاصيل الأوامر في تاب «Node و npm».`,
            R`صفحة static: الـ header فيه [[s-maxage]]، يعني CDN يقدر يكاشها.`,
            R`صفحة dynamic: [[private, no-cache, no-store]]، يعني كل طلب بيترسم من جديد ومحدش يكاشه.`
          ],
          sol: R`الصفحة اللي فيها [[new Date()]] بس: الجدول بيقول [[○]]، والوقت نفس الرقم مع كل refresh، وهو وقت الـ build مش وقت الطلب. و [[curl -sI]] عليها بيرجّع [[Cache-Control: s-maxage=31536000]].

بعد [[await cookies()]]: الجدول بيقول [[ƒ]]، والوقت بيتغير مع كل refresh، والـ header بقى [[Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate]]. لو الوقت بيتغير من الأول من غير cookies: انت فاتح [[npm run dev]]، ودي بترسم كل حاجة مع كل طلب. ولو الصفحة لسه ○ بعد cookies: نسيت [[await]] أو الـ import مش من [[next/headers]].`,
          solCode: R`// app/time/page.tsx
import { cookies } from "next/headers";
export default async function TimePage() {
  await cookies();
  return <p>{new Date().toISOString()}</p>;
}`
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
          try: R`اعمل الصفحة بـ ٣ slugs ثابتين من غير داتابيز: [[return [{ slug: "a" }, { slug: "b" }, { slug: "c" }]]]. اعمل build وبص على الجدول: تحت [[/blog/[slug]]] هتلاقي الـ slugs التلاتة وجنب كل واحد ●. وبعدين افتح [[/blog/d]] بعد [[npm start]]: هتترسم أول مرة وتتحفظ.`,
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
          teach: R`## الفكرة: دالتين في ملف واحد

الملف [[app/blog/[slug]/page.tsx]] فيه دالتين: [[generateStaticParams]] بتشتغل **مرة واحدة وقت الـ build** وبترجّع قايمة المقالات اللي تتبني مقدمًا، والصفحة نفسها ([[PostPage]]) بتترسم مرة لكل مقال في القايمة دي.

اتشغّل في مشروع Next.js 16.4.0 (من غير [[cacheComponents]]) على ويندوز. ومكان [[db]] الحقيقي (Prisma) حطينا ملف [[lib/db.ts]] صغير فيه ٤ مقالات في الذاكرة ([[a]] و [[b]] و [[c]] منشورين، و [[draft]] مش منشور) بنفس شكل دوال Prisma، وبيطبع سطر مع كل نداء عشان نشوف إمتى اتنادى.

---

## ١. الـ imports

~~~text app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
~~~

- [[notFound]] من [[next/navigation]]: دالة لما تناديها الصفحة بتوقف وترجع 404.
- [[@/lib/db]]: [[@/]] اختصار لجذر المشروع، متعرّف في [[tsconfig.json]] ([["@/*": ["./*"]]])، فمش محتاج [[../../../lib/db]].

---

## ٢. [[generateStaticParams]]

~~~text app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 200,
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}
~~~

- [[export]]: لازم تتصدّر بالاسم ده بالظبط، Next بيدوّر عليها بالاسم.
- [[async]]: عشان تقدر تعمل [[await]] للداتابيز جواها.

### الـ query حتة حتة (Prisma)

| الحتة | معناها |
|---|---|
| [[findMany]] | هات كذا صف |
| [[where: { published: true }]] | المنشور بس |
| [[orderBy: { views: "desc" }]] | رتّب بعدد القراءات من الأكبر (desc = descending، تنازلي) |
| [[take: 200]] | أول ٢٠٠ بس |
| [[select: { slug: true }]] | هات عمود [[slug]] بس، مش المقال كله |

ليه ٢٠٠ مش الكل؟ كل slug يعني صفحة هتترسم في الـ build. ١٠ آلاف مقال = build طويل وضغط على الداتابيز. الباقي بيتبني أول ما حد يطلبه (تحت).

### الـ return

[[posts]] شكلها [[[{ slug: "a" }, { slug: "b" }, ...]]]. و [[.map((p) => ({ slug: p.slug }))]] بيحوّل كل صف لـ object مفتاحه **بنفس اسم الفولدر** ([[[slug]]] = [[slug]]). الأقواس [[({ ... })]] حوالين الـ object عشان الـ arrow function ترجّعه، من غيرهم JavaScript هيفهم [[{]] بداية جسم دالة.

> القيم لازم strings. جربنا [[return [{ slug: 5 }]]] والـ build وقع:

~~~text الناتج
Error: A required parameter (slug) was not provided as a string received number in generateStaticParams for /blog4/[slug]
> Build error occurred
~~~

---

## ٣. الصفحة نفسها

~~~text app/blog/[slug]/page.tsx
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post?.published) notFound();
  return <article><h1>{post.title}</h1><div>{post.body}</div></article>;
}
~~~

- [[PageProps<"/blog/[slug]">]]: نوع جاهز (global، من غير import) بيعمله Next من أسامي الفولدرات. بيعرف إن [[params]] فيها [[slug]] نوعه string. (Next بيكتبه في [[.next/types/routes.d.ts]] وقت [[dev]] و [[build]].)
- [[await params]]: [[params]] Promise من Next 15، فلازم [[await]]. و [[{ slug }]] destructuring: طلّع [[slug]] من الـ object.
- [[findUnique({ where: { slug } })]]: هات المقال ده بس. و [[{ slug }]] اختصار [[{ slug: slug }]].
- [[post?.published]]: [[?.]] (optional chaining) لو [[post]] بـ null ميرميش error، يرجّع undefined. فالشرط بيمسك الحالتين: مش موجود، أو موجود ومش منشور.
- بعد [[notFound()]] TypeScript عارف إن [[post]] مش null، لأن [[notFound]] نوعها [[never]] (مبترجعش أبدًا).

---

## ٤. الـ build

~~~bash
npm run build
~~~

~~~text الناتج
  Collecting page data using 11 workers ...
db.post.findMany {"where":{"published":true},"orderBy":{"views":"desc"},"take":200,"select":{"slug":true}}
  Generating static pages using 11 workers (0/12) ...
db.post.findUnique b
db.post.findUnique c
db.post.findUnique a
...
Route (app)
├   /blog/[slug]
│ ├ ● /blog/a
│ ├ ● /blog/b
│ └ ● /blog/c

●  (SSG)      prerendered as static HTML (uses generateStaticParams)
~~~

اقرا الترتيب:

1. [[findMany]] اتنادت **مرة واحدة** في مرحلة Collecting page data: دي [[generateStaticParams]].
2. [[findUnique]] ٣ مرات، واحدة لكل slug: دي الصفحة بتترسم. الترتيب [[b c a]] لأنهم بيترسموا بالتوازي على أكتر من worker.
3. [[draft]] مش في الجدول: الـ query جاب المنشور بس.

والملفات اتحفظت في [[.next/server/app/blog]]:

~~~text الناتج
a.html  a.meta  a.rsc  a.segments
b.html  b.meta  b.rsc  b.segments
c.html  c.meta  c.rsc  c.segments
~~~

[[.html]] للزيارة الأولى، و [[.rsc]] (React Server Components payload) للتنقل من جوه الموقع بـ [[<Link>]]، و [[.meta]] فيه الـ headers اللي هتترجع معاها.

---

## ٥. بعد [[npm start]]: اللي في القايمة واللي برّاها

جربنا نسخة الـ solCode (من غير داتابيز، أي slug بيترسم):

~~~bash
curl -sI localhost:5825/blog2/a
curl -sI localhost:5825/blog2/d
curl -sI localhost:5825/blog2/d
~~~

~~~text الناتج (السطور المهمة)
/blog2/a   200  x-nextjs-cache: HIT
/blog2/d   200  x-nextjs-cache: MISS
/blog2/d   200  x-nextjs-cache: HIT
~~~

- [[a]] في القايمة: [[HIT]] من أول طلب، لأنها متبنية.
- [[d]] مش في القايمة: أول طلب [[MISS]] (اترسمت دلوقتي)، والتاني [[HIT]]: اتحفظت للي بعدك. ده [[dynamicParams = true]]، الافتراضي.

وفي المثال الأصلي [[/blog/draft]] رجعت [[404]]: الصفحة اترسمت وقت الطلب، [[notFound()]] اشتغلت لأنه مش منشور.

### [[dynamicParams = false]]

~~~text app/blog3/[slug]/page.tsx
export const dynamicParams = false;
export async function generateStaticParams() {
  return [{ slug: "a" }];
}
~~~

~~~text الناتج
/blog3/a   200 OK
/blog3/z   404 Not Found
~~~

أي slug برّه القايمة 404 من غير ما الصفحة تترسم أصلًا.

---

## الخلاصة

| | بيحصل إمتى | الناتج |
|---|---|---|
| [[generateStaticParams]] | مرة في [[next build]] | قايمة [[{ slug }]] |
| الصفحة لكل slug في القايمة | في [[next build]] | [[●]] و HTML جاهز ([[HIT]]) |
| slug برّه القايمة | أول طلب ليه | [[MISS]] وبعدين [[HIT]] |
| برّه القايمة مع [[dynamicParams = false]] | | 404 |

> الصفحات المبنية مبتتحدثش لوحدها لما المقال يتعدّل: محتاج revalidate (الدرس الجاي).`,
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
          ],
          sol: R`الجدول: تحت [[/blog/[slug]]] هتلاقي [[● /blog/a]] و [[● /blog/b]] و [[● /blog/c]]، وفي [[.next/server/app/blog]] ملفات زي [[a.html]] و [[a.rsc]]: اتبنوا وقت الـ build.

بعد [[npm start]]: [[/blog/a]] بترجع header [[x-nextjs-cache: HIT]] من أول مرة. و [[/blog/d]] أول مرة [[MISS]] (اترسمت ساعتها)، والمرة التانية [[HIT]]: اتحفظت للي بعدك. ولو [[/blog/d]] رجعت 404: انت كاتب [[dynamicParams = false]]. ولو الجدول قال ƒ: الصفحة بتقرا حاجة dynamic زي [[cookies()]] أو [[searchParams]].`,
          solCode: R`// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  return [{ slug: "a" }, { slug: "b" }, { slug: "c" }];
}
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return <h1>مقال {slug}</h1>;
}`
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
          teach: R`## الفكرة: صفحة static ليها تاريخ صلاحية

المثال فيه ٣ طرق تحط «عمر» للكاش: على الصفحة كلها ([[export const revalidate]])، وعلى fetch واحد ([[next: { revalidate }]])، وعلى دالة داتابيز ([[unstable_cache]]). الصفحة بتفضل [[○]] static، بس بعد ما العمر يخلص بتتبني تاني لوحدها.

اتشغّل في مشروع Next.js 16.4.0 (من غير [[cacheComponents]]) على ويندوز. ومكان الـ CMS عملنا سيرفر Node صغير على [[localhost:5829/api/posts]] بيرجّع [[[{ "title": "post N" }]]] وبيعدّ الطلبات اللي جاتله، ومكان [[db]] ملف وهمي بيطبع سطر مع كل query.

---

## ١. [[export const revalidate = 3600]]

~~~text app/blog/page.tsx
export const revalidate = 3600;
~~~

ده route segment config: متغير بإسم محجوز، Next بيقراه من الملف وقت الـ build. [[3600]] ثانية = ساعة، وده **أقصى** عمر للصفحة.

لازم رقم مكتوب، مش حساب. جربنا [[export const revalidate = 60 * 60]] والـ build وقع:

~~~text الناتج
  Collecting page data using 15 workers ...
⨯ Invalid segment configuration export detected. This can cause unexpected behavior from the configs not being applied. You should see the relevant failures in the logs above. Please fix them to continue.
~~~

السبب: Next بيقرا القيمة من الكود من غير ما يشغّله، فبيفهم [[3600]] بس مش [[60 * 60]].

---

## ٢. fetch بعمر و tag

~~~text app/blog/page.tsx
const posts = await fetch("https://cms.example.com/api/posts", {
  next: { revalidate: 600, tags: ["posts"] },
}).then((r) => r.json());
~~~

- [[fetch(url, options)]]: الـ fetch العادي، و Next زوّد عليه خانة [[next]].
- [[revalidate: 600]]: نتيجة الطلب ده تتحفظ ١٠ دقايق (600 ثانية) في الـ Data Cache على السيرفر.
- [[tags: ["posts"]]]: اسم للنتيجة دي، عشان تمسحها بعدين بـ [[revalidateTag("posts", "max")]] (فئة الكاش).
- [[.then((r) => r.json())]]: الرد بيوصل [[Response]]، و [[.json()]] بيحوّل جسمه لـ object.

### مين بيكسب: ساعة ولا ١٠ دقايق؟

جدول الـ build بقى فيه عمودين جداد:

~~~text الناتج
Route (app)        Revalidate  Expire
├ ○ /blogisr              10m      1y
├ ○ /isr                  10s      1y
~~~

[[/blogisr]] (صفحة المثال) [[10m]] مش ساعة: **أقصر عمر في الصفحة هو اللي بيكسب**، لأن الصفحة مينفعش تفضل أكتر من عمر أي داتا جواها. و [[Expire 1y]]: بعد سنة من غير أي طلب، النسخة دي متترجعش خالص.

وسيرفر الـ CMS سجّل طلب واحد بس ([[cms hit 1 /api/posts]]) طول الـ build وكل الطلبات بعده: الـ fetch اتنفذ وقت الـ build والنتيجة اتحفظت.

---

## ٣. [[unstable_cache]] للداتابيز

[[next: { revalidate }]] خاص بـ fetch. الـ query بتاع Prisma مش fetch، فمحتاج تلفه:

~~~text lib/queries.ts
import { unstable_cache } from "next/cache";
export const getCategories = unstable_cache(
  async () => db.category.findMany({ orderBy: { name: "asc" } }),
  ["categories"],
  { revalidate: 86400, tags: ["categories"] },
);
~~~

[[unstable_cache]] بتاخد ٣ حاجات وبترجّع **دالة جديدة** بنفس الشغل بس متكاشة:

| الـ argument | هنا | معناه |
|---|---|---|
| ١. الدالة | [[async () => db.category.findMany(...)]] | الشغل الحقيقي. [[orderBy: { name: "asc" }]] ترتيب أبجدي (asc = ascending) |
| ٢. المفتاح | [[["categories"]]] | اسم الكاش. ولو الدالة بتاخد arguments بتتضاف للمفتاح لوحدها |
| ٣. الخيارات | [[{ revalidate: 86400, tags: [...] }]] | 86400 ثانية = 24 × 60 × 60 = يوم |

وفي الصفحة بتناديها عادي: [[await getCategories()]].

> اسمها فيه unstable بقاله سنين، والـ docs بتاعة Next 16.4 مكتوب فيها إن [[use cache]] حل محلها (مع Cache Components). لسه شغالة في النموذج القديم.

---

## ٤. التجربة: [[revalidate = 10]] بالثواني

~~~text app/isr/page.tsx
export const revalidate = 10;
export default function Page() {
  return <p>{new Date().toISOString()}</p>;
}
~~~

بعد [[npm run build]] و [[npm start]]، الـ header بقى:

~~~bash
curl -sI localhost:5825/isr | grep -i cache-control
~~~

~~~text الناتج
Cache-Control: s-maxage=10, stale-while-revalidate=31535990
~~~

- [[s-maxage=10]]: الـ CDN يعتبرها جديدة ١٠ ثواني.
- [[stale-while-revalidate=31535990]]: وبعدها يقدر يرجّع القديمة وهو بيجيب الجديدة في الخلفية، لحد سنة. الرقم = 31536000 (سنة) − 10.

وطلبنا الصفحة كذا مرة (الـ build كان الساعة [[07:12:35]]):

~~~text الناتج
الطلب               x-nextjs-cache   الوقت في الصفحة
الأول  (07:12:49)    STALE            07:12:35.450Z
بعد ١٢ ثانية         STALE            07:12:49.222Z
على طول بعده         HIT              07:13:01.431Z
على طول بعده         HIT              07:13:01.431Z
~~~

نقراها سطر سطر:

1. **الأول**: النسخة عمرها ١٤ ثانية (أكتر من ١٠)، فبقت [[STALE]] (قديمة). Next رجّعها **فورًا** زي ما هي، وفي نفس اللحظة بنى نسخة جديدة في الخلفية (وقتها [[07:12:49]]).
2. **بعد ١٢ ثانية**: النسخة اللي اتبنت في الخلفية عمرها ١٢ ثانية، يعني قديمة هي كمان، فنفس الحكاية: رجعت [[STALE]] واتبنت واحدة جديدة ([[07:13:01]]).
3. **على طول بعده**: النسخة لسه جديدة (أقل من ١٠ ثواني)، فـ [[HIT]] ونفس الوقت.

ده stale-while-revalidate: **محدش بيستنى البناء أبدًا**، بس اللي بييجي بعد ما العمر يخلص بياخد النسخة القديمة مرة.

---

## الخلاصة

| فين | الشكل | يتمسح بإيه |
|---|---|---|
| الصفحة كلها | [[export const revalidate = 3600]] (رقم مكتوب) | [[revalidatePath]] |
| fetch واحد | [[fetch(url, { next: { revalidate: 600, tags: ["posts"] } })]] | [[revalidateTag("posts", "max")]] |
| دالة داتابيز | [[unstable_cache(fn, ["key"], { revalidate, tags })]] | [[revalidateTag]] |

| [[x-nextjs-cache]] | معناه |
|---|---|
| [[HIT]] | جديدة، من الكاش |
| [[STALE]] | قديمة واترجعت، وفيه بناء جديد في الخلفية |
| [[MISS]] | مكانتش موجودة، اترسمت دلوقتي |

> أقصر عمر في الصفحة بيكسب، والتجديد بيحصل بس لما طلب ييجي بعد العمر.`,
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
          ],
          sol: R`الجدول بيقول [[○ /isr]] وجنبها عمودين: Revalidate [[10s]] و Expire [[1y]]. والوقت ثابت في الأول. بعد ما الـ ١٠ ثواني تعدي، أول refresh بيرجّع الوقت القديم ومعاه header [[x-nextjs-cache: STALE]]، وفي نفس اللحظة Next بيبني نسخة جديدة في الخلفية. والـ refresh اللي بعده بيجيب وقت جديد ومعاه [[HIT]].

لو الوقت بيتغير مع كل refresh: انت على dev، أو الصفحة dynamic لسبب تاني (cookies مثلًا) فالـ revalidate ملوش معنى. ولو مبيتغيرش خالص: اتأكد إن [[revalidate]] رقم مكتوب مش حساب، وإنك عملت refresh بعد ما العمر خلص، لأن الطلب ده هو اللي بيشغّل التجديد.`
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
          teach: R`## الفكرة: دالة على السيرفر، والفورم بيناديها

ملفين: ملف [[actions]] فيه دالة [[createPost]] بتشتغل على السيرفر بس، وصفحة فيها [[<form action={createPost}>]]. مفيش [[fetch]] ولا [[/api/...]]: React و Next بيعملوا الطلب لوحدهم.

اتشغّل في مشروع Next.js 16.4.0 على ويندوز. [[verifySession]] نسخة صغيرة بتقرا cookie اسمها [[uid]] (ولو مش موجودة تحوّل لـ [[/login]])، و [[db]] جدول في الذاكرة بيطبع سطر مع كل حفظ. ومتصفح Chrome headless (playwright-core) بعت الفورم مرة والـ JavaScript مقفول ومرة مفتوح، وسجّل الطلبات.

---

## ١. ملف الـ actions

~~~text app/actions/posts.ts
"use server";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
~~~

- [["use server"]] **أول سطر في الملف**: كل دالة [[async]] مصدّرة من الملف ده بقت Server Action. يعني الكود بتاعها مش هيتبعت للمتصفح أبدًا، والمتصفح ياخد «رقم» يناديها بيه.
- [[revalidatePath]]: عشان صفحة الليستة تتحدث بعد الحفظ.
- [[verifySession]]: من الـ DAL بتاعك (فئة Auth): بترجّع المستخدم أو تحوّله للـ login.

## ٢. الدالة سطر سطر

~~~text app/actions/posts.ts
export async function createPost(formData: FormData) {
  const { userId } = await verifySession();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  await db.post.create({ data: { title, authorId: userId } });
  revalidatePath("/posts");
}
~~~

| السطر | ليه |
|---|---|
| [[formData: FormData]] | لما الدالة تتحط في [[action]] بتاع فورم، React بيبعتلها كل الخانات في object من نوع [[FormData]] (Web API عادي) |
| [[await verifySession()]] | الدالة دي URL عام زي أي API: لازم تعرف مين بيبعت **جواها**، مش في الصفحة |
| [[formData.get("title")]] | قيمة الخانة اللي [[name]] بتاعها [[title]]. بترجع string أو File أو null |
| [[?? ""]] | لو null خليها نص فاضي ([[??]] = لو اللي قبلي null أو undefined خد اللي بعدي) |
| [[String(...).trim()]] | حوّلها نص وشيل المسافات من الأول والآخر |
| [[if (!title) return]] | فاضي؟ اخرج ومتحفظش (الدرس الجاي بيرجّع رسالة) |
| [[authorId: userId]] | صاحب البوست من الـ session، **مش** من الفورم. أي حاجة في الفورم المستخدم يقدر يغيّرها |
| [[revalidatePath("/posts")]] | امسح كاش صفحة [[/posts]]، فلما حد يفتحها يلاقي الجديد |

---

## ٣. الصفحة

~~~text app/posts/new/page.tsx
import { createPost } from "@/app/actions/posts";
export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required maxLength={120} />
      <button type="submit">انشر</button>
    </form>
  );
}
~~~

- الصفحة server component عادية، مفيهاش [["use client"]].
- [[action={createPost}]]: الدالة نفسها، مش URL. ده المكان الوحيد اللي React بيقبل فيه دالة في [[action]].
- [[name="title"]]: ده المفتاح اللي [[formData.get("title")]] بيدوّر عليه.
- [[required]] و [[maxLength={120}]]: المتصفح بيمنع الإرسال لو فاضي أو أطول من ١٢٠. ده للراحة بس: أي حد يقدر يبعت طلب من غير المتصفح، فالفحص الحقيقي في الـ action.

---

## ٤. التجربة: من غير JavaScript

الصفحة اتبنت [[○ /posts/new]] (static). بصينا على الفورم في الـ HTML:

~~~text الناتج
[noJS] hidden inputs: [ '$ACTION_ID_40a32b723f3a2c3277dbacad087cd1e1c3a048165e' ]
~~~

Next حط جوه الفورم **hidden input** اسمه فيه ID الـ action. فالفورم ده فورم HTML حقيقي، بيشتغل من غير أي JavaScript:

~~~text الناتج
[noJS] POST http://localhost:5825/posts/new content-type: multipart/form-data next-action: (none)
[noJS] response 200 text/html; charset=utf-8
[noJS] url after: http://localhost:5825/posts/new
~~~

- الطلب [[POST]] على **نفس URL الصفحة**، مش endpoint منفصل.
- [[multipart/form-data]]: الشكل اللي المتصفح بيبعت بيه الفورمات.
- الرد [[text/html]]: صفحة كاملة، يعني الصفحة عملت reload.

ده اسمه progressive enhancement: الفورم شغال قبل ما الـ JS يتحمّل، أو لو مقفول.

## ٥. التجربة: مع JavaScript

~~~text الناتج
[JS] POST http://localhost:5825/posts/new content-type: multipart/form-data next-action: 40a32b723f3a2c3277dbacad087cd1e1c3a048165e
[JS] response 200 text/x-component
~~~

- نفس الـ POST ونفس الـ URL، بس دلوقتي فيه header اسمه [[Next-Action]] قيمته نفس الـ ID. ده اللي السيرفر بيعرف بيه أنهي دالة ينفّذ.
- الرد [[text/x-component]]: ده الـ RSC payload (React Server Components)، مش HTML. React بيستخدمه يحدّث الشاشة من غير reload.

اتأكدنا إن مفيش reload: حطينا متغير في الصفحة قبل الإرسال ([[window.__marker = 42]]) ولقيناه لسه [[42]] بعده. والخانة رجعت فاضية ([[""]]): React بيعمل reset للفورم لوحده بعد ما الـ action يخلص.

وبعدين [[/posts]]:

~~~text الناتج
/posts: بوست من غير JS (u1)بوست بـ JS (u1)
~~~

~~~text الناتج (لوج السيرفر)
post.create {"id":1,"title":"بوست من غير JS","authorId":"u1"}
post.create {"id":2,"title":"بوست بـ JS","authorId":"u1"}
~~~

الاتنين اتحفظوا، و [[authorId]] جه من الـ cookie مش من الفورم.

---

## الخلاصة

| | من غير JS | مع JS |
|---|---|---|
| الطلب | [[POST]] على URL الصفحة | [[POST]] على URL الصفحة |
| الـ ID بتاع الـ action | hidden input [[$ACTION_ID_...]] | header [[Next-Action]] |
| الرد | [[text/html]] (reload) | [[text/x-component]] (من غير reload) |
| بعد ما يخلص | صفحة جديدة | React بيفضّي الفورم |

> [["use server"]] = endpoint عام. فيه: مين المستخدم، وافحص الـ input، و [[revalidatePath]] في الآخر.`,
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
          ],
          sol: R`من غير JS: الفورم بيتبعت POST عادي ([[multipart/form-data]]) والصفحة بتعمل reload وترجع بالداتا الجديدة. الـ action اشتغل، لأن [[<form action={fn}>]] بيطلّع فورم HTML حقيقي جواه hidden input فيه ID الـ action.

ومع JS: مفيش reload، وفي Network طلب [[POST]] على نفس URL الصفحة (مش [[/api/...]])، وفي الـ request headers [[Next-Action]] قيمته ID طويل، والرد RSC payload فيه الصفحة بعد [[revalidatePath]]. لو مفيش [[Next-Action]]: الـ JS لسه متحمّلش أو مقفول. ولو الحفظ نجح والليستة قديمة: نسيت [[revalidatePath]].`
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
          teach: R`## الفكرة: الـ action بيرجّع رد، والفورم بيعرضه

نفس فكرة الدرس اللي فات، بس دلوقتي الـ action بيرجّع **نتيجة** (أخطاء لكل خانة، أو رسالة نجاح)، والفورم client component بيستخدم [[useActionState]] عشان يمسك النتيجة دي ويعرف إمتى الـ action شغال.

اتشغّل في مشروع Next.js 16.4.0 (React 19.3) مع Zod 4.6 على ويندوز. [[emailTaken]] و [[createUser]] نسخ صغيرة: [[taken@example.com]] بس متسجل. وزوّدنا في نسخة التجربة checkbox بيأخر الـ action ثانيتين (عشان الـ pending)، و Chrome headless (playwright-core) ملا الفورم وقرا الشاشة بعد كل إرسال.

---

## ١. الـ schema

~~~text app/actions/signup.ts
"use server";
import * as z from "zod";
const Signup = z.object({
  email: z.email({ error: "إيميل مش صحيح" }),
  password: z.string().min(8, { error: "٨ حروف على الأقل" }),
});
~~~

- [[import * as z]]: هات كل اللي في المكتبة تحت اسم [[z]].
- [[z.object({...})]]: الشكل المتوقع: object فيه خانتين.
- [[z.email()]]: نص بشكل إيميل (في Zod 4 بقت على [[z]] مباشرة، مش [[z.string().email()]]). و [[{ error: "..." }]] الرسالة لو غلط.
- [[z.string().min(8)]]: نص ٨ حروف على الأقل.

## ٢. شكل النتيجة

~~~text app/actions/signup.ts
export type SignupState = { errors?: { email?: string[]; password?: string[] }; message?: string; email?: string };
~~~

ده النوع اللي الـ action هيرجّعه. كل خانة فيها [[?]] يعني اختيارية: ممكن يرجّع أخطاء بس، أو رسالة بس. و [[string[]]] array نصوص، لأن الخانة الواحدة ممكن يبقى ليها أكتر من خطأ. وتصدير [[type]] مسموح في ملف [[use server]] لأنه بيتمسح وقت الـ compile.

## ٣. الـ action

~~~text app/actions/signup.ts
export async function signup(_prev: SignupState, formData: FormData): Promise<SignupState> {
~~~

**أول argument** هو الـ state اللي فاتت، و FormData **تاني**. ده الشكل اللي [[useActionState]] بيناديه بيه. و [[_]] في أول [[_prev]] اتفاق معناه «مش هستخدمه». و [[Promise<SignupState>]]: دالة async بترجّع النوع ده.

~~~text app/actions/signup.ts
  const email = String(formData.get("email") ?? "");
  const parsed = Signup.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { email, errors: z.flattenError(parsed.error).fieldErrors };
~~~

- [[safeParse]]: افحص من غير ما ترمي error. بيرجّع [[{ success: true, data }]] أو [[{ success: false, error }]].
- [[z.flattenError(parsed.error)]]: بيحوّل الخطأ لشكل بسيط. جربناه على خانتين فاضيين في Node:

~~~text الناتج
{"formErrors":[],"fieldErrors":{"email":["إيميل مش صحيح"],"password":["٨ حروف على الأقل"]}}
~~~

[[.fieldErrors]] بالظبط شكل [[errors]] في [[SignupState]]. ورجّعنا [[email]] كمان عشان الخانة متتمسحش (تحت).

> لو حد بعت الطلب من غير خانة password خالص، [[formData.get]] بترجع [[null]] والرسالة بتبقى رسالة Zod الإنجليزي: [[Invalid input: expected string, received null]]. من المتصفح الخانة الفاضية بتتبعت [[""]] فبتطلع رسالتك.

~~~text app/actions/signup.ts
  if (await emailTaken(parsed.data.email)) return { email, errors: { email: ["الإيميل ده متسجل"] } };
  await createUser(parsed.data);
  return { message: "اتسجلت، شوف إيميلك" };
}
~~~

- خطأ من الداتابيز بنفس الشكل، فالفورم بيعرضه في نفس المكان.
- [[parsed.data]]: الداتا بعد الفحص، ونوعها معروف ([[{ email: string; password: string }]]).
- النجاح: رسالة بس، ومن غير [[email]]، فالخانة تفضى.

> الأخطاء المتوقعة **بتترجع** مش بتترمي. أي [[throw]] من الـ action بيروح لأقرب [[error.tsx]]، والمستخدم يشوف صفحة خطأ بدل «الإيميل مش صحيح».

---

## ٤. الفورم

~~~text app/signup/signup-form.tsx
"use client";
import { useActionState } from "react";
import { signup } from "@/app/actions/signup";
export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, {});
~~~

- [["use client"]]: الـ hooks بتشتغل في client components بس.
- [[useActionState]] من [[react]] (مش من Next). بياخد الـ action والحالة الأولى ([[{}]] = مفيش أخطاء ولا رسالة)، وبيرجّع ٣ حاجات:

| اللي راجع | معناه |
|---|---|
| [[state]] | آخر حاجة الـ action رجّعها (في الأول [[{}]]) |
| [[formAction]] | نسخة من الـ action تحطها في الفورم |
| [[pending]] | [[true]] وهو شغال |

~~~text app/signup/signup-form.tsx
    <form action={formAction}>
      <input name="email" type="email" defaultValue={state.email} />
      {state.errors?.email && <p className="text-red-600">{state.errors.email[0]}</p>}
~~~

- [[action={formAction}]] **مش** [[signup]]: لو حطيت [[signup]] مباشرة، [[state]] و [[pending]] مش هيتحدثوا.
- [[defaultValue={state.email}]]: القيمة الأولى للخانة. React بيفضّي الفورم بعد كل action، فمن غيرها الإيميل يتمسح مع كل غلط.
- [[state.errors?.email && <p>...</p>]]: لو فيه خطأ للإيميل اعرض أول واحد ([[[0]]]). و [[&&]] في JSX: لو الشمال false مفيش حاجة تترسم.

~~~text app/signup/signup-form.tsx
      <button disabled={pending}>{pending ? "بنسجّل..." : "سجّل"}</button>
      {state.message && <p>{state.message}</p>}
~~~

وهو شغال: الزرار مقفول ومكتوب عليه «بنسجّل...»، فمفيش ضغطتين ورا بعض.

---

## ٥. التجربة

~~~text الناتج (Chrome headless)
empty                     | email error: إيميل مش صحيح   | pass error: ٨ حروف على الأقل | email box: ""
sara@example + 8 chars    | email error: إيميل مش صحيح   | pass error: -               | email box: "sara@example"
taken email               | email error: الإيميل ده متسجل | pass error: -               | email box: "taken@example.com"
short password            | email error: -               | pass error: ٨ حروف على الأقل | email box: "sara@example.com"
valid                     | msg: اتسجلت، شوف إيميلك                                     | email box: ""
~~~

- **فاضي**: الخطأين من Zod.
- **[[sara@example]]**: المتصفح بيقبله (فيه [[@]])، بس [[z.email()]] عايز دومين كامل.
- **متسجل**: عدّى Zod، ووقف عند [[emailTaken]].
- **باسورد قصير**: الإيميل **فضل في الخانة**: ده [[defaultValue={state.email}]].
- **صح**: الرسالة، والخانة فضيت لأن النجاح مبيرجّعش [[email]].

### الـ input نوعه [[email]]

جربنا نكتب [[sara]] من غير [[@]]: المتصفح بيرفض قبل ما الطلب يتبعت أصلًا:

~~~text الناتج
browser validity for 'sara': false Please include an '@' in the email address. 'sara' is missing an '@'.
~~~

### من غير [[defaultValue]]

~~~text الناتج
short pw, no defaultValue | pass error: ٨ حروف على الأقل | email box: ""
~~~

الإيميل اتمسح مع الغلط.

### الـ pending

~~~text الناتج
during slow action: button text: بنسجّل... disabled: true
after: button text: سجّل disabled: false
~~~

---

## الخلاصة

| الحاجة | فين |
|---|---|
| الفحص | السيرفر، بـ [[safeParse]] |
| الأخطاء المتوقعة | [[return]] بشكل [[{ errors }]]، مش [[throw]] |
| الـ action ياخد | [[(prevState, formData)]] |
| الفورم يستخدم | [[formAction]] من [[useActionState]] |
| اللي المستخدم كتبه | يرجع في الـ state ويتحط في [[defaultValue]] |
| منع الضغط مرتين | [[disabled={pending}]] |

> كل اللي الـ action بيرجّعه بيتبعت للمتصفح: رجّع رسايل بس، مش الـ user ولا الـ error كله.`,
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
          ],
          sol: R`فاضي: رسالتين تحت الخانتين، «إيميل مش صحيح» و «٨ حروف على الأقل». وخد بالك: الـ input نوعه [[email]]، فالمتصفح نفسه بيمنع الإرسال لـ [[sara]] أو [[sara@]] قبل ما يوصل للسيرفر. عشان تشوف رسالة Zod جرّب [[sara@example]]: المتصفح بيقبله و [[z.email()]] بيرفضه. والإيميل الصح مع باسورد ٨ حروف: «اتسجلت، شوف إيميلك» والخانات فضيت.

من غير [[defaultValue={state.email}]]: مع أي غلط الإيميل بيتمسح، لأن React بيعمل reset للفورم بعد كل action. ومع الـ delay: الزرار مقفول ومكتوب «بنسجّل...» ثانيتين. لو الـ pending مش ظاهر: انت حاطط [[signup]] مباشرة في [[action]] بدل [[formAction]].`
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
          teach: R`## الفكرة: حاجتين بعد الحفظ

المثال ٣ حتت: [[createTodo]] بيحفظ ويحوّل المستخدم لصفحة الحاجة الجديدة بـ [[redirect]]، و [[toggleTodo]] بيقلب done، و [[TodoList]] client component بيقلب الـ checkbox **قبل** ما السيرفر يرد بـ [[useOptimistic]].

اتشغّل في مشروع Next.js 16.4.0 (React 19.3) على ويندوز. الجدول في الذاكرة فيه todo واحدة ([[اشتري لبن]])، و [[toggleTodo]] فيها تأخير ثانية ونص (زي الـ try)، و Chrome headless (playwright-core) ضغط وقرا حالة الـ checkbox كل شوية.

---

## ١. [[createTodo]]

~~~text app/actions/todos.ts
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
~~~

- [[redirect]] من [[next/navigation]] (مش [[next/cache]]).
- [[let todo;]] **برّه** الـ try: لو اتعرّف جواه بـ [[const]] مش هيبقى موجود بعد ما الـ try يقفل.
- [[try { ... } catch { return; }]]: لو الحفظ فشل اخرج من غير تحويل. و [[catch]] من غير [[(e)]] مسموح لو مش هتستخدم الخطأ.
- [[revalidatePath("/todos")]] **قبل** [[redirect]].
- [[redirect(...)]] برّه الـ try، والـ URL template literal فيه الـ id.

### ليه [[redirect]] برّه الـ try؟

[[redirect]] مبترجعش: بترمي error خاص اسمه [[NEXT_REDIRECT]]، و Next بيمسكه ويحوّل. ولو اترمى جوه try، الـ [[catch]] بتاعك هو اللي هيمسكه ويبلعه. وعشان كده كمان [[revalidatePath]] قبلها: أي سطر بعد [[redirect]] مش هيتنفذ.

---

## ٢. [[toggleTodo]]

~~~text app/actions/todos.ts
export async function toggleTodo(id: string, done: boolean) {
  const { userId } = await verifySession();
  await db.todo.update({ where: { id, userId }, data: { done } });
  revalidatePath("/todos");
}
~~~

- بياخد arguments عادية ([[id]] و [[done]]) مش FormData، لأنه هيتنادى من كود مش من فورم.
- [[where: { id, userId }]]: الـ todo دي **وبتاعتك**. لو حد بعت id بتاع حد تاني، مفيش صف يطابق.

---

## ٣. [[TodoList]] و [[useOptimistic]]

~~~text app/todos/todo-list.tsx
"use client";
import { useOptimistic, startTransition } from "react";
export function TodoList({ todos }: { todos: Todo[] }) {
  const [shown, setOptimistic] = useOptimistic(todos, (state, id: string) =>
    state.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  );
~~~

[[useOptimistic(القيمة الحقيقية, دالة)]] بيرجّع حاجتين:

| اللي راجع | معناه |
|---|---|
| [[shown]] | اللي هيتعرض: نفس [[todos]]، إلا وانت جوه transition وعامل تغيير متفائل |
| [[setOptimistic(id)]] | «اعرض كأن ده حصل». بينادي الدالة بالحالة الحالية والـ [[id]] |

والدالة: [[state.map(...)]] بتلف على الـ todos، واللي الـ id بتاعها هو المطلوب ترجع نسخة منها [[{ ...t, done: !t.done }]] ([[...t]] انسخ كل الخانات، و [[!t.done]] اقلب)، والباقي زي ما هو.

~~~text app/todos/todo-list.tsx
  function toggle(t: Todo) {
    startTransition(async () => {
      setOptimistic(t.id);
      await toggleTodo(t.id, !t.done);
    });
  }
~~~

1. [[startTransition(async () => {...})]]: الـ optimistic بيعيش جوه transition بس. و React 19 بيقبل دالة async هنا.
2. [[setOptimistic(t.id)]]: الشاشة تتغير **دلوقتي**.
3. [[await toggleTodo(...)]]: نادي السيرفر (Server Action، بيتبعت POST زي ما شفنا في درس use server).
4. لما الـ transition يخلص (الـ action رجع، والـ props الجديدة وصلت من [[revalidatePath]])، React بيرمي النسخة المتفائلة ويعرض [[todos]] الحقيقية.

~~~text app/todos/todo-list.tsx
  return <ul>{shown.map((t) => <li key={t.id}><input type="checkbox" checked={t.done} onChange={() => toggle(t)} /> {t.title}</li>)}</ul>;
~~~

بتعرض [[shown]] مش [[todos]].

---

## ٤. التجربة: الـ checkbox

~~~text الناتج (السيرفر بيحفظ عادي)
+0ms     before click           checked: false
+924ms   100ms after click      checked: true
+1734ms  900ms                  checked: true
+2947ms  2100ms (action done)   checked: true
~~~

الأرقام في الشمال من أول السكربت، والضغطة نفسها بتاخد مئات الملّي ثانية في playwright، فالمهم السطر التاني: بعد الضغطة بـ ١٠٠ ملّي ثانية. اتقلب على طول وهو الطلب لسه شغال (الـ action بياخد ١.٥ ثانية)، وفضل كده بعد ما رجع لأن السيرفر حفظ ([[todo.update t1 true]] في اللوج).

### لو السيرفر محفظش

شغّلنا السيرفر تاني بنسخة من [[toggleTodo]] مبتعملش update (زي الـ try):

~~~text الناتج
+0ms     before click           checked: false
click returned after 594 ms
+702ms   100ms after click      checked: true
+1511ms  900ms                  checked: true
+2728ms  2100ms (action done)   checked: false
~~~

اتقلب، وبعد ما الـ action خلص **رجع لوحده** [[false]]. مكتبناش أي rollback: الـ props الحقيقية لسه false، و React رجع ليها.

---

## ٥. التجربة: [[redirect]]

~~~text الناتج
createTodo -> url: /todos/25977ab0 | h1: todo مهمة جديدة
~~~

اتحفظت والمتصفح راح لصفحتها.

ونسخة تانية فيها [[redirect]] **جوه** الـ try:

~~~text app/actions/todos.ts (النسخة الغلط)
  try {
    const todo = await db.todo.create({ data: { title: String(formData.get("title")), userId } });
    redirect($__bt/todos/$__{todo.id}$__bt);
  } catch {
    return;
  }
~~~

~~~text الناتج
createTodoBad -> url: /todos
~~~

~~~text الناتج (لوج السيرفر)
todo.create b4cba5b1
~~~

الـ todo اتحفظت، بس الـ URL فضل [[/todos]]: الـ [[catch]] بلع [[NEXT_REDIRECT]].

---

## الخلاصة

| الحاجة | القاعدة |
|---|---|
| [[redirect]] | برّه try، وآخر سطر (اللي بعدها مبيتنفذش) |
| [[revalidatePath]] | قبل [[redirect]] |
| [[setOptimistic]] | جوه [[startTransition]] أو action |
| الرجوع لو فشل | لوحده: الحقيقة هي الـ props من السيرفر |
| متستخدمش optimistic لـ | الدفع، وأي حاجة لازم المستخدم يعرف إنها فشلت قبل ما يكمّل |`,
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
          ],
          sol: R`مع الـ delay: الـ checkbox بيتقلب لحظة الضغط، والطلب لسه شغال ثانية ونص في Network، ولما يرجع الحالة بتفضل زي ما هي لأن السيرفر رجّع نفس القيمة.

من غير سطر الـ update: الـ checkbox بيتقلب، وبعد ثانية ونص بيرجع لوحده للحالة الأصلية من غير ما تكتب أي rollback. الـ transition خلص، و React رمى النسخة المتفائلة ورجع للـ props الحقيقية اللي لسه زي ما هي.

و [[redirect]] جوه [[try]] مع [[catch { return; }]]: الـ todo بيتحفظ بس مفيش تحويل، لأن [[redirect]] بترمي [[NEXT_REDIRECT]] والـ catch بلعه. لو التحويل حصل رغم كده: الـ catch بتاعك بيرمي الخطأ تاني.`
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
          teach: R`## الفكرة: نادينا الـ action من الترمنال

[[cancelOrder]] بيلغي طلب (order). المثال مكتوب على افتراض إن **أي حد** هيبعتله أي حاجة: بيفحص شكل الـ input، وبعدين مين المستخدم، وبعدين بيحط شرط الملكية جوه الـ query نفسه. وعشان نثبت إن ده لازم، نسخنا الطلب اللي المتصفح بعته وبعتناه تاني من [[curl]] بـ id طلب مستخدم تاني.

اتشغّل في مشروع Next.js 16.4.0 مع Zod 4.6 على ويندوز. جدول الطلبات في الذاكرة فيه طلبين [[PENDING]]: [[1111...]] بتاع [[u1]]، و [[2222...]] بتاع [[u2]]. و [[verifySession]] بتقرا المستخدم من cookie اسمها [[uid]]. وزرار «cancel» في صفحة [[/orders]] بينادي [[cancelOrder({ orderId })]] من client component.

---

## ١. الـ imports والـ schema

~~~text app/actions/orders.ts
"use server";
import * as z from "zod";
import { verifySession } from "@/lib/dal";
const Input = z.object({ orderId: z.uuid() });
~~~

[[z.uuid()]]: نص بشكل UUID (زي [[11111111-1111-4111-8111-111111111111]]: ٣٢ حرف hex في ٥ مجموعات). أي حاجة تانية مرفوضة قبل ما نلمس الداتابيز.

## ٢. الـ action

~~~text app/actions/orders.ts
export async function cancelOrder(input: unknown) {
  const { orderId } = Input.parse(input);
  const { userId } = await verifySession();
~~~

- [[input: unknown]] مش [[{ orderId: string }]]: TypeScript بيفحص وقت الكتابة بس. الطلب جاي من الشبكة، والنوع ملوش أي تأثير عليه. [[unknown]] بيجبرك تفحص قبل ما تستخدم.
- [[Input.parse(input)]]: [[parse]] (مش [[safeParse]]) بيرمي لو الشكل غلط. ده مقبول هنا: واجهتنا عمرها ما هتبعت شكل غلط، فلو حصل يبقى حد بيلعب، و 500 كفاية.
- [[verifySession()]]: المستخدم من الـ cookie. مش من الـ input أبدًا.

~~~text app/actions/orders.ts
  const result = await db.order.updateMany({
    where: { id: orderId, userId, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
~~~

- [[updateMany]] مش [[update]]: في Prisma [[update]] بيقبل where على حاجة unique بس (الـ id)، و [[updateMany]] بيقبل أي شروط، وبيرجّع **عدد** الصفوف اللي اتغيرت ([[{ count }]]).
- الشروط التلاتة مع بعض: الطلب ده، **وبتاعك**، **ولسه** pending. كلهم في query واحد، فمفيش لحظة بين «اتأكدت» و «عدّلت» حد يغيّر فيها حاجة.

~~~text app/actions/orders.ts
  if (result.count === 0) return { ok: false as const, error: "الطلب مش موجود أو مينفعش يتلغي" };
  revalidatePath("/orders");
  return { ok: true as const };
}
~~~

- [[count === 0]]: يا الطلب مش موجود، يا مش بتاعك، يا اتشحن. **رسالة واحدة** للتلاتة، عشان اللي بيجرّب ids ميعرفش إن الطلب ده موجود عند حد تاني.
- [[as const]]: بيخلي نوع [[ok]] هو [[false]] بالظبط مش [[boolean]]، فالكود اللي بينادي يقدر يفرّق بين النجاح والفشل بـ [[if (res.ok)]].

---

## ٣. الطلب اللي المتصفح بعته

دوسنا cancel على طلب [[u1]] من Chrome headless وسجّلنا الطلب:

~~~text الناتج
button: cancel {"ok":true}
"url": "http://localhost:5825/orders",
"next-action": "401a0c57b869e449ecd00fc83ab0b007554ab8b6e3",
"accept": "text/x-component",
"content-type": "text/plain;charset=UTF-8"
"body": "[{\"orderId\":\"11111111-1111-4111-8111-111111111111\"}]"
~~~

- POST على URL الصفحة، والـ ID في [[Next-Action]] (درس use server).
- الـ body **array** فيه الـ arguments بالترتيب: [[[{ "orderId": "..." }]]].

الـ ID ده موجود في ملفات الـ JS اللي أي زائر بينزّلها، فهو مش سر.

## ٤. نبعته من الترمنال بطلب حد تاني

~~~bash
curl -s -i -X POST http://localhost:5825/orders \
  -H "Next-Action: 401a0c57b869e449ecd00fc83ab0b007554ab8b6e3" \
  -H "Accept: text/x-component" \
  -H "Content-Type: text/plain;charset=UTF-8" \
  -H "Origin: http://localhost:5825" \
  -b "uid=u1" \
  --data '[{"orderId":"22222222-2222-4222-8222-222222222222"}]'
~~~

- [[-H]] header، و [[-b "uid=u1"]] cookie (انت داخل كـ u1)، و [[--data]] الـ body. و [[\]] في آخر السطر معناه «الأمر مكمّل في السطر اللي جاي».
- [[Origin]]: زي ما المتصفح بيبعته. Next بيقارنه بالـ Host.

> على ويندوز: اكتبه سطر واحد بـ [[curl.exe]] (من غير [[\]]). في PowerShell 7 الـ JSON بين [[' ']] زي ما هو اشتغل، وفي Windows PowerShell 5.1 علامات التنصيص اللي جوه الـ JSON بتضيع، فلازم تتكتب [[\"]]: [[--data '[{\"orderId\":\"2222...\"}]']]. جربنا الاتنين ورجعوا نفس سطر [[ok:false]].

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/x-component

0:{"a":"$@1","q":"","i":false,"b":"CZ5QngpAQKQD8_HqeQNiI"}
1:{"ok":false,"error":"الطلب مش موجود أو مينفعش يتلغي"}
~~~

~~~text الناتج (لوج السيرفر)
order.updateMany {"id":"22222222-2222-4222-8222-222222222222","userId":"u1","status":"PENDING"} count 0
~~~

الـ action **اتنفذ** (مفيش حاجة منعت الطلب)، بس الـ query مالقاش طلب [[2222]] بتاع [[u1]]، فـ [[count 0]] و [[ok:false]]. والرد مش JSON نضيف: ده RSC payload، والقيمة اللي الدالة رجعتها في السطر [[1:]].

### لو شلنا [[userId]] من الـ where

شغّلنا نسخة من غير شرط الملكية، ونفس الـ curl بالظبط:

~~~text الناتج
1:{"ok":true}
~~~

~~~text الناتج (لوج السيرفر)
order.updateMany {"id":"22222222-2222-4222-8222-222222222222","status":"PENDING"} count 1
~~~

[[u1]] لغى طلب [[u2]]. ده IDOR (Insecure Direct Object Reference): المستخدم داخل فعلًا (authentication سليم)، بس محدش سأل «مسموحلك بالطلب **ده**؟» (authorization).

---

## ٥. اللي Next بيحميه لوحده

نفس الطلب بحاجتين مختلفين:

~~~text الناتج (orderId = "abc")
HTTP/1.1 500 Internal Server Error
1:E{"digest":"2490580099"}
~~~

~~~text الناتج (لوج السيرفر)
Error [ZodError]: ... "format": "uuid" ... "message": "Invalid UUID"
~~~

[[Input.parse]] رمى، والمستخدم شاف 500 من غير تفاصيل (الـ [[digest]] رقم تدوّر بيه في اللوج)، والتفاصيل في لوج السيرفر بس.

~~~text الناتج (Origin: https://evil.example)
HTTP/1.1 500 Internal Server Error
~~~

~~~text الناتج (لوج السيرفر)
x-forwarded-host header with value localhost:5825 does not match origin header with value evil.example from a forwarded Server Actions request. Aborting the action.
Error: Invalid Server Actions request.
~~~

الطلب من موقع تاني اترفض قبل ما الـ action يشتغل: دي حماية CSRF. بس لاحظ: الـ curl بتاعنا حط Origin صح بسهولة. الحماية دي بتمنع موقع تاني يستخدم **متصفحك**، مش بتمنع حد يبعت طلب بنفسه.

---

## الخلاصة

| الحماية | مين بيعملها | بتمنع إيه |
|---|---|---|
| مقارنة [[Origin]] بالـ Host | Next لوحده | موقع تاني يبعت باسمك (CSRF) |
| [[Input.parse]] | انت | input بشكل غلط |
| [[verifySession()]] | انت | حد مش داخل (authentication) |
| [[userId]] في الـ where | انت | حد داخل يلمس حاجة مش بتاعته (authorization) |

> الـ action بيتعامل مع الـ input كأنه جاي من عدو، والسعر والمستخدم والدور من السيرفر، مش من الـ arguments.`,
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
          ],
          sol: R`الطلب المنسوخ هيبقى [[POST]] على URL الصفحة، وفيه header [[Next-Action]] (الـ ID) و [[Cookie]] بتاعتك و [[Origin]] بتاع الموقع (فحماية الـ Origin بتعدّيه عادي)، والـ body فيه الـ arguments. لما تغيّر الـ orderId لطلب مستخدم تاني وتبعته: الـ action بيتنفذ، بس [[updateMany]] مش بيلاقي صف فيه الـ id ده ومعاه [[userId]] بتاعك، فـ [[count]] بـ 0، والرد (RSC payload مش JSON نضيف) جواه [[ok:false]] ورسالة «الطلب مش موجود أو مينفعش يتلغي».

بعد ما تشيل [[userId]] من الـ where: نفس الطلب بيلغي طلب المستخدم التاني ويرجّع [[ok:true]]. دي IDOR: الـ authentication سليم (انت داخل فعلًا)، والـ authorization هي اللي اختفت. والدرس: شرط الملكية جوه الـ query نفسه، مش في إن الزرار مش ظاهر.`
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
          teach: R`## الفكرة: ملف = URL، ودالة = method

[[app/api/products/route.ts]] بيعمل URL اسمه [[/api/products]]، وكل دالة مصدّرة منه باسم HTTP method بترد على الـ method دي: [[GET]] تقرا، و [[POST]] تضيف. وملف تاني في [[[id]]] فيه [[DELETE]] لمنتج واحد. مفيش Express ولا router: اسم الفولدر هو المسار، واسم الدالة هو الـ method.

اتشغّل في مشروع Next.js 16.4.0 على ويندوز. مكان Prisma جدول في الذاكرة فيه ٣ منتجات ([[كتاب JavaScript]] و [[كتاب Go]] و [[قلم]])، و [[isAdmin()]] بترجع true لو فيه cookie [[role=admin]]، و [[ProductInput]] schema بـ Zod: [[z.object({ name: z.string().min(1) })]].

---

## ١. [[GET]]

~~~text app/api/products/route.ts
import type { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const products = await db.product.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    take: 20,
  });
  return Response.json(products);
}
~~~

- [[import type]]: هات النوع بس، مفيش كود بيتحمّل.
- [[NextRequest]]: الـ [[Request]] العادي بتاع الويب وفوقه [[nextUrl]] (الـ URL متفكك جاهز) و [[cookies]].
- [[request.nextUrl.searchParams.get("q")]]: قيمة [[?q=...]] من الـ URL، أو null. و [[?? ""]]: لو مفيش خليها نص فاضي (فيرجع كل حاجة).
- [[contains: q, mode: "insensitive"]]: في Prisma: الاسم **فيه** الكلمة، من غير فرق بين حروف كبيرة وصغيرة (حسب docs بتاعة Prisma، [[mode: "insensitive"]] موجود مع PostgreSQL و MongoDB بس).
- [[take: 20]]: أقصى ٢٠، عشان محدش يطلب الجدول كله.
- [[Response.json(products)]]: [[Response]] من الويب العادي. [[.json()]] بيحوّل الـ array لـ JSON ويحط [[content-type: application/json]].

~~~bash
curl -s -i -G "localhost:5825/api/products" --data-urlencode "q=كتاب"
~~~

[[-G]] مع [[--data-urlencode]]: حط [[q=كتاب]] في الـ URL بعد ما تحوّل الحروف العربي لشكل URL ([[%D9%83...]]).

~~~text الناتج
HTTP/1.1 200 OK
content-type: application/json
[{"id":"p1","name":"كتاب JavaScript"},{"id":"p2","name":"كتاب Go"}]
~~~

ومن غير [[q]] رجع التلاتة. ومفيش [[Cache-Control]] في الرد ولا الـ route اتبنى static: في الـ build اتعلّم [[ƒ /api/products]]، لأن من Next 15 الـ GET مبيتكاشش لوحده.

---

## ٢. [[POST]]

~~~text app/api/products/route.ts
export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "forbidden" }, { status: 403 });
  const parsed = ProductInput.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "invalid input", issues: parsed.error.issues }, { status: 400 });
  const product = await db.product.create({ data: parsed.data });
  return Response.json(product, { status: 201 });
}
~~~

بالترتيب، وكل خطوة بترجع بدري لو فشلت:

1. **مين؟** مش أدمن: [[403]] (Forbidden). قبل ما نقرا الـ body أصلًا.
2. **الـ body**: [[await request.json()]] بيقرا الجسم ويحوّله object. و [[safeParse]] بيفحصه من غير ما يرمي.
3. **شكل غلط**: [[400]] (Bad Request) ومعاه [[issues]] من Zod عشان اللي بيبعت يعرف الغلط فين.
4. **تمام**: احفظ، ورد بـ [[201]] (Created). التاني في [[Response.json]] خيارات الرد، ومنها [[status]].

~~~bash
curl -s -i -X POST localhost:5825/api/products -H "Content-Type: application/json" -d '{"name":""}'
~~~

~~~text الناتج (من غير cookie)
HTTP/1.1 403 Forbidden
{"error":"forbidden"}
~~~

نفس الأمر ومعاه [[-b "role=admin"]]:

~~~text الناتج
HTTP/1.1 400 Bad Request
{"error":"invalid input","issues":[{"origin":"string","code":"too_small","minimum":1,"inclusive":true,"path":["name"],"message":"Too small: expected string to have >=1 characters"}]}
~~~

و [[{"name":"مسطرة"}]]:

~~~text الناتج
HTTP/1.1 201 Created
{"id":"p4","name":"مسطرة"}
~~~

و body مش JSON ([[-d 'hello']]):

~~~text الناتج
HTTP/1.1 500 Internal Server Error
~~~

[[request.json()]] رمت، ومفيش حد مسكها، فـ Next رد 500. مفيش [[error.tsx]] للـ routes: لو عايز 400 لفّها في [[try]].

---

## ٣. [[DELETE]] في مسار dynamic

~~~text app/api/products/[id]/route.ts
export async function DELETE(_request: Request, ctx: RouteContext<"/api/products/[id]">) {
  if (!(await isAdmin())) return Response.json({ error: "forbidden" }, { status: 403 });
  const { id } = await ctx.params;
  await db.product.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
~~~

- الفولدر [[[id]]]: [[/api/products/p3]] بيوصل هنا و [[id]] = [[p3]].
- [[_request]]: الـ argument الأول لازم يبقى موجود عشان نوصل للتاني، و [[_]] بتقول «مش هستخدمه».
- [[ctx: RouteContext<"/api/products/[id]">]]: نوع global زي [[PageProps]]، فيه [[params]] كـ **Promise**، فـ [[await ctx.params]].
- [[new Response(null, { status: 204 })]]: [[204]] (No Content) يعني «تم ومفيش body».

~~~text الناتج
DELETE /api/products/p3           HTTP/1.1 204 No Content
DELETE /api/products/p3 (تاني)    HTTP/1.1 500 Internal Server Error
~~~

المرة التانية المنتج مش موجود، و [[delete]] رمى، فـ 500. وفي Prisma الحقيقي نفس الكلام (الـ docs بتاعته بتسمي الخطأ ده [[P2025]])، فالأحسن تمسكه وترد [[404]].

### method مش موجودة

~~~text الناتج (PUT /api/products)
HTTP/1.1 405 Method Not Allowed
~~~

مفيش دالة [[PUT]] في الملف، فـ Next بيرد [[405]] لوحده.

---

## ٤. [[route.ts]] و [[page.tsx]] في نفس الفولدر

حطينا [[page.tsx]] جنب [[app/api/products/route.ts]]:

~~~text الناتج (npm run build)
Error: An issue occurred while preparing your Next.js app
Conflicting route and page at /api/products: route at /api/products/route and page at /api/products/page
~~~

الاتنين عايزين نفس الـ URL، فواحد بس.

---

## الخلاصة

| اللي بترجّعه | معناه |
|---|---|
| [[Response.json(data)]] | 200 و JSON |
| [[Response.json(data, { status: 201 })]] | اتعمل |
| [[Response.json({ error }, { status: 400 })]] | الـ input غلط |
| [[Response.json({ error }, { status: 403 })]] | مش مسموحلك |
| [[new Response(null, { status: 204 })]] | تم، من غير body |
| أي throw | 500 (لوحده) |
| method مش متعرّفة | 405 (لوحده) |

> الـ route عام زي الـ Server Action بالظبط: افحص المستخدم والـ input جوه كل method.`,
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
          ],
          sol: R`[[/api/products?q=كتاب]] بيرجع JSON بالمنتجات اللي اسمها فيه «كتاب»، والـ Content-Type [[application/json]]. والـ POST من غير صلاحية أدمن: [[{"error":"forbidden"}]] بـ 403، لأن الفحص قبل قراية الـ body. ولو أدمن: 400 ومعاه [[issues]] من Zod فيها [[too_small]] على [[name]]. ولو بعت body مش JSON: 500، لأن [[request.json()]] رمت (لفّها في try ورجّع 400).

و [[page.tsx]] جنب [[route.ts]]: الـ build بيقع بـ [[Conflicting route and page at /api/products: route at /api/products/route and page at /api/products/page]].`
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
          teach: R`## الفكرة: ٣ أسئلة قبل ما تصدّق الـ webhook

الـ route ده بيستقبل POST من Stripe لما الدفع يخلص. قبل ما يعلّم الطلب «مدفوع» بيجاوب ٣ أسئلة: الطلب ده جاي من Stripe فعلًا؟ (التوقيع). الحدث ده اتعالج قبل كده؟ (idempotency). والشغل التقيل يتعمل إمتى؟ (بعد الرد بـ [[after]]).

اتشغّل في مشروع Next.js 16.4.0 مع مكتبة [[stripe]] 23.0 على ويندوز، من غير Stripe CLI ومن غير حساب: سكربت الـ solCode بيعمل توقيع صحيح بنفس السر اللي في [[.env.local]] ([[STRIPE_WEBHOOK_SECRET=whsec_labsecret123]])، وجدول الطلبات في الذاكرة فيه طلب [[cs_test_1]] حالته [[PENDING]]، و [[sendReceiptEmail]] بتستنى نص ثانية وتطبع سطر.

---

## ١. التجهيز

~~~text app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { after } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
~~~

- [[Stripe]]: المكتبة الرسمية. [[new Stripe(key)]] بيعمل client بالمفتاح السري.
- [[process.env.STRIPE_SECRET_KEY]]: من [[.env.local]]. و [[!]] في الآخر بتقول لـ TypeScript «متأكد إنها مش undefined» (non-null assertion)، ومبتعملش أي فحص وقت التشغيل.
- [[after]] من [[next/server]]: تسجّل شغل يتنفذ **بعد** ما الرد يتبعت.

## ٢. اقرا الطلب خام

~~~text app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";
~~~

- [[request.text()]] مش [[request.json()]]: التوقيع اتحسب على **النص بالظبط** زي ما Stripe بعته. لو حوّلته object ورجّعته نص، أي مسافة أو ترتيب مختلف يبوّظ المقارنة.
- [[stripe-signature]]: header شكله كده (من تشغيلنا):

~~~text الناتج
t=1791358618,v1=4d70af4cc710bd5ab8e2a31b476fabfb2b68ebb7ef295132b5006e34f98c67f3
~~~

[[t]] وقت الإرسال (ثواني من ١٩٧٠)، و [[v1]] الـ HMAC: hash للـ [[t]] والـ body مع بعض، محسوب بالسر اللي بينك وبين Stripe. ومن غير السر مستحيل تطلّع نفس الرقم.

## ٣. اتأكد من التوقيع

~~~text app/api/webhooks/stripe/route.ts
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response("invalid signature", { status: 400 });
  }
~~~

- [[let event: Stripe.Event]]: متعرّف برّه الـ try عشان نستخدمه بعده. و [[Stripe.Event]] نوع من المكتبة.
- [[constructEvent(body, signature, secret)]]: بيحسب الـ HMAC بنفسه ويقارن. لو مطابق يرجّع الحدث كـ object، لو لأ (أو الوقت قديم أوي) يرمي.
- [[STRIPE_WEBHOOK_SECRET]] بيبدأ بـ [[whsec_]]، وده **غير** الـ API key.
- [[400]] ومتعملش أي حاجة.

## ٤. عالج الحدث مرة واحدة

~~~text app/api/webhooks/stripe/route.ts
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const updated = await db.order.updateMany({
      where: { stripeSessionId: session.id, status: "PENDING" },
      data: { status: "PAID" },
    });
    if (updated.count > 0) after(() => sendReceiptEmail(session.id));
  }
  return new Response("ok");
}
~~~

- [[event.type]]: نوع الحدث. [[checkout.session.completed]] = صفحة الدفع خلصت.
- [[event.data.object]]: الـ checkout session. TypeScript عارف نوعه من [[event.type]] اللي فوق.
- [[status: "PENDING"]] في الـ where: لو الحدث وصل مرتين، التانية مش هتلاقي صف [[PENDING]]، فـ [[count]] بـ 0.
- [[if (updated.count > 0)]]: الإيميل بس لو احنا اللي غيّرنا الحالة دلوقتي.
- [[after(() => ...)]]: الإيميل بعد الرد.
- [[new Response("ok")]]: 200 بسرعة، عشان Stripe ميعتبرهاش فشل ويعيد.

---

## ٥. التجربة

السكربت (الـ solCode) بيعمل payload شكله حدث Stripe، ويوقّعه بـ [[generateTestHeaderString]]، ويبعته ٣ مرات:

~~~bash
node --env-file=.env.local test-webhook.mjs
~~~

[[--env-file]] (Node 20.6 وأحدث) بيقرا [[.env.local]] في [[process.env]]، فالسكربت ياخد نفس السر اللي السيرفر شايفه. ومن غيره السكربت وقع: [[The "key" argument must be of type string ... Received undefined]]. واشتغل بنفس الشكل في PowerShell.

~~~text الناتج
200 ok
same event again: 200 ok
tampered body: 400 invalid signature
~~~

~~~text الناتج (لوج السيرفر)
order.updateMany cs_test_1 count 1
webhook responding 2026-10-07T07:36:58.646Z
order.updateMany cs_test_1 count 0
webhook responding 2026-10-07T07:36:58.662Z
receipt email sent for cs_test_1 2026-10-07T07:36:59.160Z
~~~

نقراها:

1. **أول مرة**: [[count 1]]، الطلب بقى PAID، والرد اتبعت ([[58.646]]).
2. **نفس الحدث تاني**: 200 برضه (عشان Stripe يبطّل يعيد)، بس [[count 0]]: مفيش حاجة اتغيرت ومفيش إيميل تاني.
3. **الإيميل**: اتبعت [[59.160]]، يعني **بعد** الرد بحوالي نص ثانية. ده [[after]].
4. **body متغير** (غيّرنا [[cs_test_1]] لـ [[cs_test_2]] وسيبنا نفس التوقيع): [[400]]. حرف واحد كفاية.

وطلب من غير توقيع خالص:

~~~bash
curl -s -i -X POST localhost:5825/api/webhooks/stripe -d '{"type":"checkout.session.completed"}'
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
invalid signature
~~~

ده بالظبط اللي كان هيعلّم أي طلب «مدفوع» لو مفيش فحص.

> مع Stripe الحقيقي: [[stripe listen --forward-to localhost:3000/api/webhooks/stripe]] بيطبع secret بيبدأ بـ [[whsec_]]، و [[stripe trigger checkout.session.completed]] بيبعت حدث حقيقي (من docs بتاعة Stripe CLI، ومش متسطب هنا).

---

## الخلاصة

| الخطوة | السطر | لو اتنسيت |
|---|---|---|
| اقرا خام | [[request.text()]] | التوقيع مبيطابقش أبدًا |
| اتحقق | [[constructEvent(body, signature, secret)]] | أي حد يعلّم طلبه مدفوع |
| مرة واحدة | [[status: "PENDING"]] في الـ where | إيميلات وشحنات مكررة |
| بعد الرد | [[after(() => ...)]] | timeout وإعادة إرسال |
| رد سريع | [[new Response("ok")]] | Stripe يعيد |

> الـ webhook route لازم يبقى برّه الـ proxy بتاع الـ auth (الـ matcher في درس proxy.ts بيستثني [[api]]).`,
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
          ],
          sol: R`[[stripe listen]] بيطبع secret بيبدأ بـ [[whsec_]]: ده اللي يروح [[STRIPE_WEBHOOK_SECRET]] (مش الـ API key). بعد [[stripe trigger checkout.session.completed]] هتلاقي في ترمنال الـ listen سطر لكل حدث فيه [[[200] POST http://localhost:3000/api/webhooks/stripe]] (وممكن أحداث تانية معاه زي payment_intent)، وفي لوج Next الحدث وبعده شغل الـ [[after()]].

والـ curl من غير توقيع: [[invalid signature]] بـ 400. وجربتها من غير Stripe CLI بالـ script اللي تحت: توقيع صح بـ [[generateTestHeaderString]] رجّع [[200 ok]] والـ [[after]] اشتغل بعد الرد، وحرف واحد متغير في الـ body بنفس التوقيع رجّع 400. لو كل الطلبات الحقيقية بترجع 400: غالبًا بتقرا [[request.json()]] الأول، أو الـ secret غلط (من listen قديم، أو حاطط الـ API key).`,
          solCode: R`// test-webhook.mjs (والسيرفر شغال: node --env-file=.env.local test-webhook.mjs عشان الـ secret يتقري)
import Stripe from "stripe";
const stripe = new Stripe("sk_test_dummy");
const payload = JSON.stringify({ id: "evt_1", object: "event", type: "checkout.session.completed", data: { object: { id: "cs_test_1", object: "checkout.session" } } });
const header = stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET });
const res = await fetch("http://localhost:3000/api/webhooks/stripe", { method: "POST", body: payload, headers: { "stripe-signature": header } });
console.log(res.status, await res.text());
// 200 ok`
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
          teach: R`## الفكرة: دالة واحدة قبل كل طلب

[[proxy.ts]] جنب فولدر [[app]] فيه دالة اسمها [[proxy]]، و Next بيناديها **قبل** ما أي صفحة تترسم. هنا بتعمل حاجتين: اللي داخل على [[/dashboard]] من غير cookie اسمها [[session]] يتحوّل للـ login، واللي معاه cookie وداخل على [[/login]] يتحوّل للـ dashboard. و [[config.matcher]] بيحدد أنهي طلبات تعدّي على الدالة دي أصلًا.

اتشغّل في مشروع Next.js 16.4.0 على ويندوز، فيه صفحة [[/dashboard]] و [[/login]] عاديين، والطلبات بـ curl.

---

## ١. الـ import والدالة

~~~text proxy.ts
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
~~~

- [[NextResponse]]: [[Response]] العادي وفوقه [[redirect]] و [[rewrite]] و [[next]].
- [[type NextRequest]]: [[type]] جوه الأقواس يعني النوع ده بس، مش كود.
- [[export function proxy]]: الاسم لازم [[proxy]] (أو [[export default]]). في Next 15 كان الملف [[middleware.ts]] والدالة [[middleware]]، ولسه شغالين بس deprecated.

## ٢. المسار والـ cookie

~~~text proxy.ts
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("session");
~~~

- [[pathname]]: المسار من غير الدومين ولا [[?...]]، زي [[/dashboard/settings]].
- [[request.cookies.has("session")]]: true لو الـ cookie موجودة، **أيًا كانت قيمتها**. مفيش فك تشفير ولا داتابيز: الكود ده بيشتغل مع كل طلب، فلازم يبقى سريع.

## ٣. التحويل للـ login

~~~text proxy.ts
  if (pathname.startsWith("/dashboard") && !hasSession) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
~~~

- [[startsWith("/dashboard")]]: [[/dashboard]] وأي حاجة تحتها.
- [[new URL("/login", request.url)]]: URL كامل. التاني هو الأساس: من [[http://localhost:3000/dashboard]] بيطلع [[http://localhost:3000/login]]. ([[redirect]] لازمه URL كامل مش [["/login"]] بس.)
- [[searchParams.set("next", pathname)]]: بيزوّد [[?next=/dashboard]]، عشان صفحة الـ login ترجّعه مكانه بعد الدخول. و [[/]] بتتكتب [[%2F]] في الـ URL.
- [[return NextResponse.redirect(login)]]: رد [[307]] للمتصفح، والصفحة نفسها **مش بتترسم**.

## ٤. داخل وراجع للـ login

~~~text proxy.ts
  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
~~~

[[NextResponse.next()]]: «كمّل عادي»، والطلب يروح للصفحة.

## ٥. الـ matcher

~~~text proxy.ts
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg|webp)$).*)"],
};
~~~

[[config]] لازم يبقى قيمة ثابتة مكتوبة، لأن Next بيقراه وقت الـ build. والـ regex من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[/]] | المسار بيبدأ بـ / |
| [[(?! ... )]] | negative lookahead: «اللي بعد كده **ميبدأش** بأي حاجة من دول» |
| [[api]] | الـ Route Handlers (الـ webhooks محتاجة توصل من غير login) |
| [[_next/static]] و [[_next/image]] | ملفات الـ JS والـ CSS والصور المتظبطة |
| [[favicon.ico]] | الأيقونة |
| [[.*\\.(?:png|jpg|svg|webp)$]] | أي ملف آخره امتداد صورة. [[\\.]] نقطة حرفية (الـ backslash متكرر لأنه جوه string)، و [[(?:...)]] مجموعة من غير ما تتحفظ |
| [[.*]] في الآخر | وبعد كده أي حاجة |

الخلاصة: كل المسارات، **ما عدا** دول. من غيره الدالة كانت هتشتغل على كل ملف JS و CSS وصورة.

---

## ٦. الـ build

~~~text الناتج (آخر جدول الـ routes)
├ ƒ /dashboard
├ ○ /login

ƒ Proxy (Middleware)
~~~

السطر [[ƒ Proxy (Middleware)]] معناه إن Next لقى الملف وقراه. لو مش ظاهر: الملف مش في المكان الصح (جنب [[app]]، أو جوه [[src]] لو مشروعك فيه [[src]]).

---

## ٧. التجربة

~~~bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" localhost:5825/dashboard
~~~

- [[-o /dev/null]]: ارمي الـ body (مش محتاجينه).
- [[-w "..."]]: اطبع بعد الطلب. [[%{http_code}]] الـ status، و [[%{redirect_url}]] رايح فين.
- و [[-b "session=anything"]]: ابعت cookie.

~~~text الناتج
/dashboard                          307 http://localhost:5825/login?next=%2Fdashboard
/dashboard  + session=anything      200
/login      + session=anything      307 http://localhost:5825/dashboard
/login                              200
/dashboard/settings                 307 http://localhost:5825/login?next=%2Fdashboard%2Fsettings
/api/products                       200
~~~

- [[307]] (Temporary Redirect): تحويل مؤقت، والمتصفح بيعيد نفس الـ method.
- cookie اسمها [[session]] **بأي قيمة** ([[anything]]) دخّلتنا. ده المقصود في الـ try: الـ proxy بيشوف إن فيه cookie، مش إنها سليمة. التحقق الحقيقي في الـ DAL جنب الداتا (فئة Auth).
- [[/api/products]] مش متأثر: الـ matcher استثناه.

### على ويندوز

~~~powershell
curl.exe -s -o NUL -w "%{http_code} %{redirect_url}\n" localhost:5825/dashboard
~~~

[[NUL]] هو [[/dev/null]] بتاع ويندوز، و [[curl.exe]] عشان في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم لـ [[Invoke-WebRequest]]. اتجرّب في [[pwsh]] و [[powershell]] وطلّع نفس السطر: [[307 http://localhost:5825/login?next=%2Fdashboard]].

---

## الخلاصة

| الحاجة | التفاصيل |
|---|---|
| الملف | [[proxy.ts]] جنب [[app]] (Next 16)، كان [[middleware.ts]] |
| الدالة | [[proxy]]، كانت [[middleware]] |
| الـ runtime | Node.js بس، و [[runtime]] ممنوع في الـ config بتاعه (الـ docs: بيرمي error) |
| [[NextResponse.next()]] | كمّل |
| [[NextResponse.redirect(url)]] | 307 لمكان تاني |
| [[NextResponse.rewrite(url)]] | اعرض مسار تاني والـ URL زي ما هو |
| [[matcher]] | يشتغل على مين، واستثني الـ api والملفات الثابتة |

> الـ proxy فحص سريع «متفائل»، مش حماية: cookie مزوّرة بتعدّيه.`,
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
          ],
          sol: R`من غير cookie: [[/dashboard]] بترجع [[307]] و [[location: /login?next=%2Fdashboard]]. بعد ما تضيف cookie اسمها [[session]] بأي قيمة: الـ proxy بيعدّيك والصفحة بتفتح 200. وكمان [[/login]] ومعاك الـ cookie بتحوّلك للـ dashboard.

ده المقصود: الـ proxy بيشوف «فيه cookie» بس، مش بيتحقق إنها سليمة. الحماية الحقيقية في الـ DAL (درس [[DAL]])، وهناك نفس الـ cookie المزوّرة هترجّعك للـ login. لو التحويل محصلش خالص: الملف مش جنب فولدر [[app]] (يعني [[src/proxy.ts]] لو مشروعك فيه [[src]])، أو الدالة اسمها مش [[proxy]]، أو الـ matcher مش ماسك المسار. ولو الملف اتقرا، هتلاقي تحت جدول الـ build سطر [[ƒ Proxy (Middleware)]].`,
          solCode: R`curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" localhost:3000/dashboard
# 307 http://localhost:3000/login?next=%2Fdashboard
curl -s -o /dev/null -w "%{http_code}\n" -b "session=anything" localhost:3000/dashboard
# 200`
        }
      ]
    }
]);
