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
    }
]);
