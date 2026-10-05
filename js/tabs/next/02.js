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
          sol: R`الجدول: تحت [[/blog/[slug]]] هتلاقي [[● /blog/a]] و [[● /blog/b]] و [[● /blog/c]]، وفي [[.next/server/app/blog/[slug]]] ملفات زي [[a.html]] و [[a.rsc]]: اتبنوا وقت الـ build.

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
          ],
          sol: R`من غير خيارات: الـ uuid بيتغير مع كل refresh (Next 15 و 16 مبيكاشوش fetch لوحده). ومع [[cache: "force-cache"]]: نفس الـ uuid مع كل refresh، لأنه اتحفظ في الـ Data Cache. ولو httpbin مقفول أو بطيء عندك، أي API بيرجّع قيمة عشوائية ينفع، حتى سيرفر Node صغير على جهازك.

بعد [[cacheComponents: true]] هتقابل ٣ أنواع أخطاء: [[Route segment config "revalidate" is not compatible with nextConfig.cacheComponents. Please remove it.]] على أي [[export const revalidate]]، و [[Next.js encountered uncached data during prerendering]] لأي fetch برّه [[<Suspense>]] ومن غير [[use cache]]، و [[Next.js encountered the unstable value new Date() while prerendering]] لـ [[new Date()]] و [[Math.random()]]. وكل رسالة بتقترح الحلول: [[<Suspense>]]، أو [[use cache]]، أو [[connection()]]، وفي النسخ الأحدث كمان [[export const instant = false]].`
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
          ],
          sol: R`الجدول بيقول [[○ /cc]] وجنبها [[1h]] و [[1d]] (الـ profile [[hours]]: revalidate ساعة و expire يوم). وكل refresh نفس الأرقام، زي [[a=1790719450515 b=1790719450521]]: ثابتة لكل slug ومختلفة بينهم، لأن الـ argument جزء من مفتاح الكاش.

ولما تحط [[await cookies()]] جوه الدالة، الـ build بيقع: [[Route /cc used cookies() inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported.]] والرسالة نفسها بتقول الحل: اقرا الـ cookie برّه الدالة وابعت القيمة كـ argument، زي [[Prices]] في المثال. ولو الـ build قال إن [[use cache]] محتاج [[cacheComponents]]: الفلاج مش في [[next.config.ts]].`,
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
          sol: R`الشكل الأصلي بيعدّي. ولما تنقل [[await cookies()]] لجسم الصفحة، الخطأ بيبدأ بـ [[Route "/products/[slug]": Next.js encountered uncached or runtime data during prerendering]]، وبيقول إن [[cookies()]] أو [[params]] أو غيرهم اتقروا برّه [[<Suspense>]] فالصفحة مش هتتبني، وبيقترح ٣ حلول: Suspense، أو [[use cache]]، أو [[export const instant = false]] اللي بيسمح للصفحة تستنى (وده عكس الفكرة، فمش ده الحل هنا).

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
          solCode: R`// test-webhook.mjs (شغّله بـ node والسيرفر شغال)
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
