// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
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
