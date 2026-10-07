// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
          teach: R`## الفكرة: الاتنين بيطلعوا HTML، بس واحد بس بيتبعت كوده للمتصفح

المثال كومبوننتين في سطرين: server component بيجيب داتا، و client component فيه عداد. اتشغّلوا في Next 16.4 بـ [[next build]] و [[next start]]، و [[db]] عملناه array في الذاكرة، وحطينا نص مميز في داتا السيرفر ([[SECRET_SERVER_MARKER]]) ونص مميز في الزرار ([[CLIENT_MARKER_LIKE]]) عشان ندوّر عليهم.

---

## ١. السطر الأول: server component

~~~text app/rsc/page.tsx
export default async function Page() { const posts = await db.post.findMany(); return <PostList posts={posts} />; }
~~~

- مفيش [["use client"]]، فده server component (الافتراضي في App Router).
- [[async]] و [[await db.post.findMany()]]: بيكلّم الداتابيز مباشرة، من غير API في النص. ده مسموح بس في server components.
- [[<PostList posts={posts} />]]: بيرسم كومبوننت تاني وبيبعتله الداتا.

## ٢. السطر التاني: client component

~~~text app/rsc/like-button.tsx
"use client";
export function LikeButton() { const [n, setN] = useState(0); return <button onClick={() => setN(n + 1)}>{n}</button>; }
~~~

- [["use client"]]: الملف ده وكل اللي بيستورده بيتبعت للمتصفح.
- [[useState]] و [[onClick]]: state وأحداث، ودول محتاجين JavaScript شغال في المتصفح.

---

## ٣. اللي حصل فعلًا

### الـ HTML (View Source)

~~~text الناتج (curl /rsc)
<main><ul><li>SECRET_SERVER_MARKER أول مقال</li><li>تاني مقال</li></ul><button data-m="CLIENT_MARKER_LIKE">0</button></main>
~~~

الاتنين موجودين كـ HTML، حتى الزرار بالرقم [[0]]. يعني الـ client component **اترسم على السيرفر** كمان، وده الـ SSR.

### ملفات الـ JS

دوّرنا في الـ ٨ ملفات JS اللي الصفحة بتحمّلها:

~~~text الناتج
CLIENT_MARKER_LIKE found in /_next/static/chunks/32-x51ewy7prl.js
~~~

ومفيش [[findMany]] ولا [[PostList]] في أي ملف. كود الزرار راح للمتصفح عشان يشتغل (hydration)، وكود الـ server component مراحش خالص.

### الـ RSC payload

طب المتصفح عارف شكل [[PostList]] منين لما يتنقل للصفحة دي من غير reload؟ طلبنا نفس الصفحة بـ header [[RSC: 1]] (اللي [[<Link>]] بيبعته):

~~~text الناتج (Content-Type: text/x-component، مختصر)
14:I[65576,["$2","$13"],"LikeButton"]
8:["$","main",null,{"children":[["$","ul",null,{"children":[["$","li","1",{"children":"SECRET_SERVER_MARKER أول مقال"}], ...]}],["$","$L14",null,{}]]}]
~~~

- السطر [[14:I[...]]] مرجع لـ client component: اسمه [[LikeButton]] وفي أنهي ملف JS.
- السطر [[8:]] ناتج الـ server component جاهز: [[main]] جواه [[ul]] جواه [[li]] بالنص. ومكان الزرار [[$L14]]، يعني «حط هنا الكومبوننت رقم 14».

ده الـ RSC payload: الناتج مش الكود.

---

## الخلاصة

| | Server Component | Client Component |
|---|---|---|
| بيترسم على السيرفر؟ | أيوة، وبس | أيوة (SSR) وفي المتصفح كمان |
| كوده بيتبعت للمتصفح؟ | لأ | أيوة |
| hydration؟ | لأ | أيوة |
| [[async]] وداتابيز؟ | أيوة | لأ |
| [[useState]] و [[onClick]]؟ | لأ | أيوة |

الجملة اللي تتقال: «الاتنين بيطلعوا HTML. الـ server component بيوصل للمتصفح كناتج في الـ RSC payload بس، والـ client component كوده بيتبعت ويعمل hydration».`,
          lines: [
            "بيشتغل على السيرفر بس، والكود ده مش في الـ bundle بتاع المتصفح (بيتبني في bundle السيرفر بس).",
            "حد client.",
            "بيترسم على السيرفر (SSR) وبيشتغل في المتصفح كمان."
          ],
          sol: R`View Source: الليستة ونص الزرار ([[0]]) الاتنين في الـ HTML، لأن الاتنين اترسموا على السيرفر: الـ server component عشان ده مكانه، والـ client component بالـ SSR. وفي Sources (بعد build و start) [[LikeButton]] موجود في ملف تحت [[_next/static/chunks]]، و [[Page]] ومكتبة الداتابيز مش موجودين.

الإجابة لو اتسألت: «الاتنين بيطلعوا HTML. الفرق إن كود الـ client component بيتبعت للمتصفح ويعمل hydration فالزرار يشتغل، وكود الـ server component مبيتبعتش أصلًا، والمتصفح بياخد ناتجه بس جوه الـ RSC payload». لو لقيت [[Page]] في Sources: انت على dev (source maps للـ debugging)، أو الصفحة عليها [[use client]].`
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
          teach: R`## الفكرة: ٣ سطور، كل واحد بيغيّر «إمتى الـ HTML بيتعمل»

في App Router مفيش دالة اسمها SSG أو SSR. الصفحة static لوحدها، وسطر واحد بيغيّرها. المثال ٣ سطور منفصلين، وعملنا لكل نوع صفحة في مشروع Next 16.4 وعملنا [[next build]] و [[next start]].

---

## ١. [[export const revalidate = 3600;]]

[[revalidate]] اسم محجوز لو اتصدّر من [[page.tsx]] أو [[layout.tsx]]. معناه: الصفحة static، بس بعد ٣٦٠٠ ثانية (ساعة) أول طلب ييجي ياخد النسخة القديمة، و Next يعيد بناءها في الخلفية للطلب اللي بعده. ده ISR (Incremental Static Regeneration).

## ٢. [[const posts = await fetch(url, { next: { revalidate: 60 } });]]

نفس الفكرة على طلب [[fetch]] واحد: [[next]] خيار زيادة Next ضافه على [[fetch]]، و [[revalidate: 60]] يعني «نتيجة الطلب ده صالحة دقيقة». والصفحة بتاخد أقل رقم فيها. جربناه بـ [[fetch("https://example.com/")]].

## ٣. [[const session = (await cookies()).get("session");]]

الـ cookies مختلفة لكل زائر، فمينفعش الصفحة تتعمل مرة واحدة للكل. أول ما الصفحة تقراها بتبقى dynamic: بتترسم مع كل طلب (SSR).

---

## الجدول

عملنا ٥ صفحات: SSG عادية، و ISR بالسطر الأول، و ISR بالسطر التاني، و SSR بالسطر التالت، و CSR (client component بيجيب الداتا من [[/api/posts]] في [[useEffect]]):

~~~text الناتج (next build، مختصر)
Route (app)      Revalidate  Expire
├ ○ /csr
├ ○ /isr                 1h      1y
├ ○ /isr-fetch           1m      1y
├ ○ /ssg
└ ƒ /ssr

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
~~~

- SSG: [[○]] من غير أرقام.
- ISR: [[○]] برضه، بس في عمود [[Revalidate]] كل قد إيه تتجدد ([[1h]] و [[1m]])، و [[Expire]] أقصى مدة تفضل فيها النسخة القديمة لو محدش طلبها ([[1y]] سنة).
- SSR: [[ƒ]].
- CSR: [[○]]! لأن الـ HTML بتاعها ثابت: فيه [[loading...]] بس، والداتا بتيجي بعدين في المتصفح:

~~~text الناتج (curl /csr)
<ul id="csr"><li>loading...</li></ul>
~~~

والـ headers بتقول نفس الكلام: ISR رجّعت [[Cache-Control: s-maxage=3600, stale-while-revalidate=31532400]] (الـ CDN يخزنها ساعة، ويقدر يقدّم القديم وهو بيجدد)، و SSR رجّعت [[Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate]] (متتخزنش خالص).

---

## الـ TTFB

TTFB = Time To First Byte: الوقت لحد ما أول byte من الرد يوصل. أمر الـ try:

~~~bash
curl -o /dev/null -s -w "%{time_starttransfer}" localhost:3000/ssr
~~~

[[-w]] بيطبع معلومة بعد الطلب، و [[%{time_starttransfer}]] هو الـ TTFB بالثواني. ٣ مرات لكل صفحة، والوسط:

~~~text الناتج (على نفس الجهاز)
/ssg  0.003706
/isr  0.004035
/ssr  0.023678
/csr  0.005124
~~~

الـ static (ومعاها CSR) ٤ ملّي ثانية تقريبًا: ملف جاهز. الـ SSR ٢٤ ملّي ثانية لأنها بترسم مع كل طلب، ومع query حقيقي هتبقى أكتر. والـ CSR سريعة هنا بس الداتا لسه موجتش، والـ curl مبيقيسش ده.

---

## الخلاصة

| النوع | الـ HTML بيتعمل إمتى | في App Router | الرمز |
|---|---|---|---|
| SSG | مرة وقت الـ build | الافتراضي | [[○]] |
| ISR | وقت الـ build، ويتجدد كل فترة | [[revalidate]] أو [[fetch]] بـ [[next.revalidate]] | [[○]] ورقم في Revalidate |
| SSR | مع كل طلب | قراية [[cookies()]] أو [[headers()]] أو [[searchParams]] | [[ƒ]] |
| CSR | HTML فاضي، والداتا في المتصفح | client component بيعمل fetch | [[○]] |`,
          lines: [
            "ISR على الصفحة كلها (النموذج القديم).",
            "ISR على طلب واحد.",
            "قراية cookie بتخلي الصفحة SSR (dynamic)."
          ],
          sol: R`الجدول: صفحة الـ SSG [[○]]، والـ ISR [[○]] برضه بس جنبها رقم في عمود Revalidate (زي [[1h]])، والـ SSR [[ƒ]]. ولو عملت صفحة CSR (client component بيجيب الداتا في useEffect) هتلاقيها ○ هي كمان، لأن الـ HTML الفاضي بتاعها static والداتا بتيجي بعدين في المتصفح.

والـ TTFB على جهازك: ○ بتاخد ملّي ثواني قليلة (ملف جاهز)، و ƒ أكتر حسب شغلها، وممكن مئات الملّي ثواني لو فيها query بطيء. و CSR الـ TTFB بتاعها صغير زي SSG، بس الداتا بتظهر متأخر، والـ curl مش بيقيس ده. الإجابة: «SSG و ISR أسرع وأرخص، و SSR بيدفع مع كل طلب، و CSR الـ TTFB صغير بس المحتوى متأخر ومش في الـ HTML».`
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
          teach: R`## الفكرة: نفس الشغلانة بطريقتين، والفرق في اللي بيرجع

المثال ملفين: Server Action بتعمل like، و Route Handler بيرجّع المقالات JSON. جربنا الـ like بالطريقتين في Next 16.4 ([[next build]] و [[next start]])، والـ [[db]] و [[verifySession]] عملناهم وهميين في الذاكرة، وضغطنا الزراير في Chrome headless.

---

## ١. الـ action

~~~text app/actions.ts
"use server";
export async function like(postId: string) { const { userId } = await verifySession(); await db.like.create({ data: { postId, userId } }); revalidatePath("/posts"); }
~~~

- [["use server"]] فوق الملف: كل دالة بيصدّرها تبقى Server Action، والـ client component يقدر يستوردها ويناديها زي دالة عادية.
- [[await verifySession()]]: مين اللي بيعمل like. لازم جوه الـ action نفسها، لأنها endpoint عام أي حد يقدر يبعتله.
- [[db.like.create(...)]]: التعديل.
- [[revalidatePath("/posts")]]: «صفحة [[/posts]] اتغيرت، ارسمها تاني». ولأن النداء جاي من الصفحة دي، Next بيرجّع شكلها الجديد في نفس الرد.

## ٢. الـ route

~~~text app/api/posts/route.ts
export async function GET() { return Response.json(await db.post.findMany({ take: 20 })); }
~~~

- [[route.ts]] في [[app/api/posts/]] يعني URL ثابت: [[/api/posts]].
- اسم الدالة هو الـ HTTP method: [[GET]]، و [[POST]] لو عايز.
- [[Response.json(...)]]: رد JSON عادي، أي حد يفهمه: موبايل، أو سكربت، أو سيرفر تاني.

---

## ٣. اللي شفناه في الـ Network

### الـ like بالـ action

~~~text الناتج (Chrome)
before: count= 0
POST /posts next-action=407ac07d8f03... -> 200 text/x-component
2:"$Sreact.fragment"
4:I[39756,["$3"],"default"]
...
after action: count= 1
~~~

- [[POST /posts]]: الطلب راح على **نفس URL الصفحة**، مش endpoint منفصل.
- [[next-action]]: header فيه ID الـ action، كده السيرفر بيعرف ينفّذ أنهي دالة.
- [[text/x-component]]: الرد RSC payload، يعني الصفحة بعد [[revalidatePath]].
- العداد في الصفحة بقى 1 من غير ما نكتب سطر تحديث واحد.

### الـ like بالـ route

عملنا [[POST /api/like]] بنفس الشغل ورد بـ JSON:

~~~text الناتج (Chrome)
POST /api/like next-action=- -> 200 application/json {"likes":1}
after route: count span= 1 | button: like (route) 1
~~~

- رد [[application/json]] فيه الرقم، والصفحة متغيرتش لوحدها: العداد اللي في الصفحة فضل زي ما هو، واحنا اللي حطينا الرقم في state الزرار بإيدنا. (الرقم 1 مش 2 لأن الـ db الوهمي array في الذاكرة، ونسخة الـ route منفصلة عن نسخة الـ action. مع داتابيز حقيقية هيبقى 2.)

---

## الخلاصة

| | Server Action | Route Handler |
|---|---|---|
| بيتنادى إزاي | دالة من الفورم أو الزرار | [[fetch]] لـ URL |
| الطلب | POST على URL الصفحة و header [[next-action]] | أي method على URL ثابت |
| الرد | [[text/x-component]]: الصفحة الجديدة | اللي انت ترجّعه (JSON غالبًا) |
| تحديث الشاشة | لوحده بعد [[revalidatePath]] | انت (state أو [[router.refresh()]]) |
| مين يستخدمه | الواجهة بتاعتك بس | أي client: موبايل، webhook، API عام |
| الحماية | جواه ([[verifySession]]) | جواه برضه |`,
          lines: [
            "ملف actions.",
            "mutation من الواجهة: session، وتعديل، وتحديث الصفحة.",
            "endpoint عام بـ URL ثابت لأي client."
          ],
          sol: R`الـ like بالـ action: طلب [[POST]] على URL الصفحة نفسها، فيه header [[Next-Action]]، والرد [[text/x-component]] (RSC payload) فيه الصفحة بعد [[revalidatePath]]، فالعدد اتحدث من غير ما تكتب أي كود تحديث. والـ route: طلب لـ [[/api/posts]] ورده [[application/json]]، ولازم انت تعمل fetch وتحط النتيجة في state (أو [[router.refresh()]]).

الإجابة: «الـ action أقل كود للواجهة بتاعتي والصفحة بتتحدث في نفس الرحلة، والـ route هو اللي ينفع لأي client تاني». لو الـ action رجع ومفيش تحديث: نسيت [[revalidatePath]].`
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
          teach: R`## الفكرة: أول رسمة في المتصفح لازم تطابق السيرفر، والوقت الحقيقي ييجي بعدها

الكومبوننت بيترسم مرتين: مرة على السيرفر (HTML)، ومرة في المتصفح (hydration) واللي بيطلع لازم يبقى نفس الـ HTML بالظبط. المثال ساعة بتعرض «--:--» في الرسمتين، وبعدين تحط الوقت الحقيقي. اتشغّل في Next 16.4 بـ [[next dev]]، والسيرفر بتوقيت UTC (متغير [[TZ=UTC]])، والمتصفح Chrome headless بتوقيت القاهرة.

---

## ١. المثال سطر سطر

### [["use client"]]

client component: بيترسم على السيرفر (SSR) وفي المتصفح. (الـ server components مبتعملش hydration أصلًا، فالمشكلة دي مش عندها.)

### [[const [time, setTime] = useState<string | null>(null);]]

- [[useState]] بيرجّع حاجتين: القيمة ودالة تغيّرها.
- [[<string | null>]]: النوع، يا نص يا [[null]].
- [[(null)]]: القيمة الأولى. ودي اللي بتتستخدم في الرسمتين: على السيرفر، وأول رسمة في المتصفح. فالاتنين بيطلّعوا نفس الحاجة.

### [[useEffect(() => setTime(new Date().toLocaleTimeString("ar-EG")), []);]]

- [[useEffect]] بيشتغل في المتصفح بس، وبعد الـ hydration. على السيرفر مبيتنفذش خالص.
- [[new Date().toLocaleTimeString("ar-EG")]]: الوقت الحالي بتنسيق مصري.
- [[[]]] في الآخر: مرة واحدة بعد أول رسمة.

### [[return <span>{time ?? "--:--"}</span>;]]

[[??]] معناها «لو اللي على الشمال [[null]] أو [[undefined]]، خد اليمين». فطول ما [[time]] بـ [[null]] بيبان [[--:--]].

### اللي حصل

~~~text الناتج
HTML من السيرفر:     <span id="t">--:--</span>
بعد الـ hydration:   ١١:١٩:٠٩ ص
~~~

ومفيش ولا error في الـ console.

---

## ٢. الغلط: الوقت في الـ render على طول

~~~text app/hyd/page.tsx
"use client";
export default function Hyd() { return <span id="t">{new Date().toLocaleTimeString()}</span>; }
~~~

~~~text الناتج (Chrome console، مختصر)
Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch $__btif (typeof window !== 'undefined')$__bt.
- Variable input such as $__btDate.now()$__bt or $__btMath.random()$__bt which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
...
  <span id="t">
+   11:18:50 AM
-   8:18:50 AM
~~~

- الرسالة بتعدّ الأسباب المشهورة بنفسها.
- والـ diff في الآخر: [[+]] اللي المتصفح رسمه، و [[-]] اللي جه من السيرفر. السيرفر UTC والمتصفح القاهرة (UTC+3)، فالفرق ٣ ساعات بالظبط.
- [[regenerated on the client]]: React رمى الـ HTML بتاع الجزء ده ورسمه من الأول في المتصفح، يعني خسرت فايدة الـ SSR فيه.

ونفس الصفحة والمتصفح بتوقيت UTC زي السيرفر: الصفحة اشتغلت من غير error ([[8:18:54 AM]])، لأن الاتنين رسموا في نفس الثانية. عشان كده الـ bug ده بيبان عند المستخدمين ومش عندك. (أول تجربة عندنا بـ UTC طلعت error برضه، لأن dev كان لسه بيعمل compile فالثانية اتغيرت بين الرسمتين.)

---

## ٣. الغلط التاني: [[<div>]] جوه [[<p>]]

~~~text app/hyd2/page.tsx
export default function Hyd2() { return <p>قبل <div>جوه</div> بعد</p>; }
~~~

~~~text الناتج (Chrome console)
In HTML, <div> cannot be a descendant of <p>.
This will cause a hydration error.
  > <p>
  >   <div>
Hydration failed because the server rendered HTML didn't match the client.
~~~

السيرفر بعت [[<p>قبل <div>جوه</div> بعد</p>]] زي ما هو (شفناه بـ curl). بس المتصفح وهو بيقرا الـ HTML بيقفل الـ [[<p>]] أول ما يقابل [[<div>]]، لأن ده ممنوع في HTML، فالـ DOM اللي اتبنى مختلف عن اللي React متوقعه. الحل: [[<div>]] بدل [[<p>]].

---

## الخلاصة

| السبب | الحل |
|---|---|
| وقت، أو [[Math.random()]]، أو timezone، أو locale | [[useState(null)]] و [[useEffect]] يحط القيمة بعد الـ hydration |
| [[typeof window]] أو [[localStorage]] في الـ render | نفس الحل، أو [[dynamic]] بـ [[ssr: false]] |
| HTML مش صالح ([[<div>]] جوه [[<p>]]) | صلّح الـ tags |
| حالة معروفة ومقصودة (الثيم على [[<html>]]) | [[suppressHydrationWarning]] على العنصر ده بس |

والقاعدة: أول رسمة في المتصفح لازم تطلّع نفس اللي طلّعه السيرفر.`,
          lines: [
            "client component.",
            "ساعة.",
            R`القيمة الأولى [[null]] على السيرفر وفي المتصفح، فالاتنين يطلّعوا نفس HTML.`,
            "بعد الـ hydration بس، احسب الوقت الحقيقي بتوقيت الجهاز.",
            "placeholder لحد ما الوقت يتحسب.",
            "قفلة."
          ],
          sol: R`الوقت: في dev الـ console فيها [[Hydration failed because the server rendered text didn't match the client]] ومعاها ليستة بالأسباب ([[typeof window]]، و [[Date.now()]]، والـ locale) و diff. بس ممكن متشوفوش خالص: لو السيرفر والمتصفح في نفس الـ timezone ورسموا في نفس الثانية، النص بيطابق بالصدفة. جربتها والمتصفح على [[Africa/Cairo]] والسيرفر UTC: الخطأ طلع على طول. وده بالظبط ليه الـ bug ده بيظهر عند المستخدمين ومش عندك.

و [[<div>]] جوه [[<p>]]: [[In HTML, <div> cannot be a descendant of <p>. This will cause a hydration error.]] وبعدها [[Hydration failed because the server rendered HTML didn't match the client]]، لأن المتصفح بيقفل الـ [[<p>]] قبل الـ [[<div>]] وهو بيقرا الـ HTML، فالـ DOM بقى مختلف عن اللي React متوقعه. الحل: [[<div>]] بدل [[<p>]]، والوقت في [[useEffect]] زي المثال.`
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
          teach: R`## الفكرة: الفحص جنب الداتا، مش على الباب بس

المثال دالة واحدة في الـ DAL (Data Access Layer: الملفات اللي هي بس اللي بتكلّم الداتابيز). أي حد عايز طلب، لازم ييجي من هنا، وهنا بيتفحص مين هو وإنه صاحب الطلب. ده درس مفهوم، فالجزء اللي اتشغّل هو أوامر الـ solCode على مشروع صغير فيه ٣ ملفات (في Git Bash).

---

## ١. المثال سطر سطر

### [[export async function getOrder(id: string) {]]

دالة بتجيب طلب برقمه. [[async]] لأن جواها [[await]].

### [[const { userId } = await verifySession();]]

- [[verifySession()]] (من درس DAL): بتقرا الـ session cookie وتتأكد منها، ولو مفيش session صالحة بتعمل redirect لصفحة الدخول ومبترجعش.
- [[{ userId }]]: destructuring، هات رقم المستخدم.

الفحص هنا **جوه** الدالة. فمهما كان مين نادى [[getOrder]] (صفحة، أو Server Action، أو Route Handler، أو صفحة جديدة نسيت تحميها)، الفحص بيحصل.

### [[return db.order.findFirst({ where: { id, userId } });]]

- [[findFirst]]: هات أول صف بيطابق.
- [[where: { id, userId }]]: الشرطين مع بعض: الطلب ده **و** صاحبه المستخدم ده. و [[{ id, userId }]] اختصار [[{ id: id, userId: userId }]].

لو حد مسجّل دخول وبعت رقم طلب حد تاني، النتيجة [[null]]. الثغرة اللي ده بيمنعها اسمها IDOR (Insecure Direct Object Reference): «أنا مسجّل، فبجيب أي حاجة بالـ id بتاعها».

---

## ٢. ليه الـ proxy لوحده مش كفاية؟

| المسار | بيعدّي على الـ proxy؟ |
|---|---|
| صفحة في الـ matcher | أيوة |
| صفحة جديدة برا الـ matcher | لأ |
| Server Action | طلب POST على صفحة، يعتمد على الـ matcher |
| Route Handler تحت [[/api]] | غالبًا لأ، أغلب الـ matchers بتستثني [[api]] |
| CVE-2025-29927 | header واحد كان بيخلي Next يتخطى الـ middleware كله |

يعني الـ proxy فحص سريع مفيد (يحوّل اللي معندوش cookie لصفحة الدخول)، بس مش المكان اللي الحماية بتعتمد عليه.

---

## ٣. الـ solCode: دوّر على الأماكن المكشوفة

عملنا ٣ ملفات: action بتلغي طلب من غير أي فحص، و action بتغيّر الاسم وفيها [[verifySession]]، و route بيرجّع طلب بالـ id.

### [[grep -rl '"use server"' src app | xargs grep -Hn "db\."]]

من الشمال لليمين:

- [[grep -rl '"use server"' src app]]: دوّر جوه الفولدرين ([[-r]]) واطبع **أسماء الملفات** بس ([[-l]]) اللي فيها [["use server"]]. العلامات المفردة [['...']] عشان العلامات المزدوجة تفضل جزء من النص.
- [[|]]: ابعت الناتج للأمر اللي بعده.
- [[xargs]]: خد الأسماء اللي جاتلك وحطها arguments للأمر.
- [[grep -Hn "db\."]]: في الملفات دي، اطبع السطور اللي فيها [[db.]]، و [[-n]] رقم السطر، و [[-H]] اسم الملف. و [[\.]] لأن النقطة لوحدها في grep معناها «أي حرف».

~~~text الناتج
src/app/actions/orders.ts:4:  await db.order.update({ where: { id }, data: { status: "cancelled" } });
src/app/actions/profile.ts:6:  await db.user.update({ where: { id: userId }, data: { name } });
~~~

اقراهم: التاني بيستخدم [[userId]] من الـ session، والأول بيلغي **أي** طلب بالـ id بتاعه.

### [[find src app -name "route.ts" | xargs grep -Hn "db\."]]

[[find ... -name "route.ts"]] بيطلّع مسارات كل ملفات [[route.ts]]، والباقي زي فوق:

~~~text الناتج
src/app/api/orders/[id]/route.ts:4:  return Response.json(await db.order.findUnique({ where: { id } }));
~~~

ليه [[-H]]؟ جربناه الأول من غيرها (زي ما كان مكتوب في الدرس): لما [[find]] لقى ملف واحد بس، grep طبع [[4:  return Response.json(...)]] من غير اسم الملف، لأن grep مع ملف واحد مبيكتبش اسمه. [[-H]] بيجبره.

### [[grep -rl '"use server"' src app | xargs grep -L "verifySession\|requireAdmin"]]

[[-L]] عكس [[-l]]: اطبع الملفات اللي **مفيهاش** ولا كلمة من دول. و [[\|]] يعني «أو».

~~~text الناتج
src/app/actions/orders.ts
~~~

ده الملف اللي محتاج تبص عليه الأول.

---

## الخلاصة

| الطبقة | دورها |
|---|---|
| [[proxy.ts]] | فحص متفائل سريع: مفيش cookie؟ روح صفحة الدخول |
| الـ layout | مش حماية: مبيترسمش تاني في التنقل |
| الـ DAL ([[verifySession]] و [[where: { id, userId }]]) | الحماية الحقيقية، جنب كل query |

والجملة اللي تتقال: «الـ actions والـ route handlers endpoints عامة، والـ matcher ممكن يفوّت مسار، والطبقة نفسها اتخطت قبل كده في CVE-2025-29927، فالفحص جنب الداتا».`,
          lines: [
            "دالة في الـ DAL.",
            "التحقق جنب الداتا.",
            "والملكية جوه الـ query نفسه.",
            "قفلة."
          ],
          sol: R`الناتج المتوقع: ليستة بكل مكان فيه [[db.]] جوه ملف عليه [[use server]] أو في [[route.ts]]، وجنب كل واحد سؤالين: فيه [[verifySession()]] (أو [[requireAdmin()]]) قبله؟ والـ where فيه [[userId]] أو فحص ملكية؟ أي واحد ناقصه حاجة من دول وبيلمس داتا خاصة ده ثغرة، حتى لو «الصفحة محمية بالـ proxy».

الأوامر اللي تحت بتبدأك: التالت بيطلّع ملفات الـ actions اللي مفيهاش [[verifySession]] ولا [[requireAdmin]] خالص. والإجابة في الانترفيو: «الـ proxy فحص متفائل للـ UX، والحماية في الـ DAL جنب الداتا، لأن الـ actions والـ route handlers endpoints عامة، والـ matcher ممكن يفوّت مسار، و CVE-2025-29927 وراني إن الطبقة دي نفسها ممكن تتخطى».`,
          solCode: R`grep -rl '"use server"' src app | xargs grep -Hn "db\."
find src app -name "route.ts" | xargs grep -Hn "db\."
grep -rl '"use server"' src app | xargs grep -L "verifySession\|requireAdmin"`
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
          teach: R`## الفكرة: ٣ أوامر بيقولولك البطء فين قبل ما تغيّر حاجة

المثال ٣ أوامر قياس: جدول الـ build، و TTFB من الترمنال، وحجم الـ JS. اتشغّلوا في مشروع Next 16.4 (Git Bash)، والـ URL بقى [[localhost]] بدل [[shop.example.com]]. وعشان نشوف الأرقام بتتحرك، عملنا صفحتين بيجيبوا ٣ حاجات كل واحدة بتاخد ٣٠٠ ملّي ثانية: واحدة بـ [[await]] ورا [[await]]، وواحدة بـ [[Promise.all]].

---

## ١. [[npm run build]]: الصفحة ○ ولا ƒ؟

~~~text الناتج (مختصر)
Route (app)      Revalidate  Expire
├ ○ /isr                 1h      1y
├ ƒ /parallel
├ ○ /ssg
├ ƒ /ssr
└ ƒ /waterfall
~~~

أول سؤال: الصفحة العامة دي المفروض تبقى [[○]] (جاهزة)؟ لو طالعة [[ƒ]] من غير سبب، دوّر على اللي خلاها dynamic: [[cookies()]] أو [[headers()]] في الـ layout، أو [[searchParams]]. صلّح ده الأول، لأن صفحة [[○]] بتتقدّم ملف جاهز.

---

## ٢. [[curl -o /dev/null -s -w "TTFB %{time_starttransfer}s\n" URL]]

| الحتة | معناها |
|---|---|
| [[-o /dev/null]] | ارمي الـ body |
| [[-s]] | من غير شريط التقدم |
| [[-w "..."]] | بعد ما تخلص اطبع النص ده |
| [[%{time_starttransfer}]] | الثواني لحد أول byte من الرد = TTFB (Time To First Byte) |
| [[\n]] | سطر جديد في الآخر |

TTFB هو الوقت اللي السيرفر قعده بيفكر قبل ما يبدأ يرد. لو عالي، المشكلة على السيرفر (داتا بطيئة، أو صفحة dynamic من غير لازمة). لو كويس والصفحة لسه بطيئة، المشكلة في المتصفح (صور، أو خطوط، أو JS).

جربناه ٣ مرات على كل صفحة:

~~~text الناتج
/waterfall TTFB 0.992407s
/waterfall TTFB 0.932756s
/waterfall TTFB 0.938099s
/parallel TTFB 0.321287s
/parallel TTFB 0.309513s
/parallel TTFB 0.321264s
/ssg TTFB 0.027884s
/ssg TTFB 0.003790s
/ssg TTFB 0.004718s
~~~

اقرا الأرقام:

- [[/waterfall]]: حوالي ٠.٩٤ ثانية = ٣ × ٣٠٠ ملّي، لأن كل [[await]] بيستنى اللي قبله يخلص:

~~~text الكود البطيء
const user = await getUser();
const orders = await getOrders();
const recs = await getRecs();
~~~

- [[/parallel]]: حوالي ٠.٣٢ ثانية = قد أبطأ واحد بس، لأن التلاتة بدأوا مع بعض:

~~~text نفس الكود بـ Promise.all
const [user, orders, recs] = await Promise.all([getUser(), getOrders(), getRecs()]);
~~~

[[Promise.all]] بياخد array من Promises، ويستناهم كلهم مع بعض، ويرجّع النتايج بنفس الترتيب. ده ينفع لما الطلبات مش معتمدة على بعض.

- [[/ssg]]: ٤ ملّي ثانية: ملف جاهز. وأول طلب ٢٨ ملّي لأنه كان أول مرة يتقري. عشان كده بتقيس أكتر من مرة.

---

## ٣. [[npx next experimental-analyze]]

بيعمل build للتحليل ويفتح واجهة (بورت 4000) فيها كل route وملفات الـ JS بتاعته وأحجامها (درس next/dynamic). لو الـ TTFB كويس والصفحة تقيلة على الموبايل، هنا هتلاقي المكتبة الكبيرة اللي داخلة في الصفحة.

---

## الترتيب

| الخطوة | الأداة | لو لقيت |
|---|---|---|
| ١ | جدول الـ build | [[ƒ]] من غير سبب: شيل [[cookies()]] من الـ layout |
| ٢ | TTFB بـ curl | عالي: waterfall؟ [[Promise.all]]. query بطيء؟ index أو كاش. جزء بطيء؟ [[Suspense]] |
| ٣ | Lighthouse و Performance panel | LCP: [[next/image]] و [[fetchPriority]]. CLS: [[next/font]] ومقاسات الصور |
| ٤ | [[experimental-analyze]] | JS كتير: [[use client]] أصغر، و [[next/dynamic]] |

## الخلاصة

- قيس الأول، وفرّق: السيرفر (TTFB) ولا المتصفح (LCP و INP و CLS).
- غيّر حاجة واحدة، وقيس تاني، ٣ مرات، على [[build]] و [[start]] مش dev.
- [[await]] ورا [[await]] من غير ما يكونوا معتمدين على بعض = الوقت بيتجمع. [[Promise.all]] = قد أبطأ واحد.`,
          lines: [
            "اقرا الجدول: الصفحة ○ ولا ƒ؟",
            "قيس TTFB من الترمنال: لو عالي، المشكلة على السيرفر.",
            "شوف إيه اللي تقيل في الـ JS."
          ],
          sol: R`مفيش ناتج واحد صح، بس الورقة اللي المفروض تطلع بيها شكلها كده: الرقم قبل (TTFB من curl، و LCP و INP من Lighthouse على موبايل)، وبعدين كل خطوة ورقمها. أمثلة لسلسلة منطقية: الجدول قال ƒ والصفحة عامة، لقيت [[cookies()]] في الـ layout عشان الثيم، نقلتها لـ client component، الصفحة بقت ○ والـ TTFB نزل. أو TTFB عالي، لقيت ٣ await ورا بعض، حوّلتهم [[Promise.all]]، الـ TTFB بقى قد أبطأ واحد بس. أو TTFB كويس و LCP وحش، صورة الـ hero [[<img>]] كبيرة، حوّلتها [[next/image]] بـ [[fetchPriority]].

المهم تغيّر حاجة واحدة وتقيس، عشان تعرف أنهي تغيير عمل الفرق، وتقيس على [[build]] و [[start]] مش dev. ولو الأرقام بتتنطط بين القياسات: قيس ٣ مرات وخد الوسط، واقفل الـ extensions في المتصفح.`
        }
      ]
    }
]);
