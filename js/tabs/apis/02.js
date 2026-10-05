// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "التوثيق والأمان",
      l: 1,
      n: "عقد مكتوب (OpenAPI) بيتولّد منه docs وأنواع، وقايمة OWASP الخاصة بالـ APIs",
      items: [
        {
          cmd: "OpenAPI",
          title: "اكتب عقد الـ API في ملف واحد",
          desc: R`OpenAPI ملف YAML أو JSON بيوصف كل endpoint: المسار، والـ parameters، وشكل الطلب، وكل رد ممكن بالـ status بتاعه. الملف ده هو العقد بين الـ backend والفرونت والموبايل والعملاء.

ومنه بيتولّد: صفحة docs تفاعلية، و types لـ TypeScript، و SDKs، و mock servers، واختبارات. النسخة الأشهر 3.1، و 3.2 نزلت في سبتمبر 2025.`,
          example: R`openapi: 3.1.1
info: { title: Orders API, version: 1.4.0 }
servers: [{ url: "https://api.example.com/v1" }]
paths:
  /orders/{id}:
    get:
      operationId: getOrder
      parameters: [{ name: id, in: path, required: true, schema: { type: string } }]
      responses:
        "200": { description: OK, content: { application/json: { schema: { $ref: "#/components/schemas/Order" } } } }
        "404": { description: Not found, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
components:
  schemas:
    Order: { type: object, required: [id, status], properties: { id: { type: string }, status: { type: string, enum: [pending, paid, shipped] } } }
    Problem: { type: object, properties: { title: { type: string }, status: { type: integer }, detail: { type: string } } }`,
          try: R`اكتب الملف ده لـ endpointين من مشروعك، وافحصه بـ [[npx @redocly/cli lint openapi.yaml]]. الأداة هتقولك لو فيه [[$ref]] بيشاور على حاجة مش موجودة، أو رد ناقصه وصف.`,
          flag: "script",
          deep: {
            why: "من غير عقد، الفرونت بيعرف شكل الرد من الـ Network tab أو من سؤال الـ backend. وكل تغيير بيكسر حاجة محدش لاحظها. العقد المكتوب بيخلي الشكل متفق عليه قبل الكود، وبيتولّد منه كل حاجة تانية.",
            how: R`الملف أجزاء: [[info]] و [[servers]]، و [[paths]] (كل مسار وتحته الـ methods)، و [[components]] للحاجات المشتركة (schemas، و responses، و parameters، و securitySchemes) اللي بتتشاور عليها بـ [[$ref]].

3.1 بقت متوافقة بالكامل مع JSON Schema، فنفس الـ schema ينفع لـ validation في أي مكان. و 3.2 (سبتمبر 2025) زودت دعم رسمي للـ streaming زي SSE و JSON Lines، و method اسمها [[QUERY]]، و tags متداخلة. الأدوات بتاخد وقت عشان تدعم الجديد، فـ 3.1 الاختيار الآمن دلوقتي.

فيه طريقتين تكتب بيها:

spec-first: تكتب الـ YAML الأول، وتولّد منه types للسيرفر والعميل. مناسب لما فرق كتير بتشتغل على نفس الـ API.

code-first: الملف بيتولّد من الكود. FastAPI بيعمله لوحده من الـ type hints (تاب «Python و FastAPI»)، و NestJS بالـ decorators، وفي Express فيه مكتبات بتولّده من schemas بتاعة Zod. و Zod 4 فيها [[z.toJSONSchema()]] جاهزة.

الأهم من الطريقة: الملف يتفحص في CI (lint)، ويتقارن بالنسخة اللي فاتت عشان أي breaking change يتمسك قبل الـ merge (فيه أدوات diff للـ OpenAPI بتعمل كده).`,
            when: "أي API هيستخدمه حد غيرك: فرونت في repo تاني، أو موبايل، أو عميل B2B. وحتى لو لوحدك، الـ types المتولّدة لوحدها تستاهل.",
            mistakes: R`الملف مكتوب بالإيد ومحدش بيحدّثه، فبيبقى كذاب بعد شهرين. ومفيش ردود الأخطاء (4xx) فيه، فالعميل ميعرفش شكلها. و [[operationId]] مكرر أو ناقص، فالـ SDK يطلع بأسماء دوال غريبة زي [[getOrdersId1]].`
          },
          lines: [
            "نسخة المواصفة.",
            "اسم الـ API ونسخته (نسخة العقد بتاعك، مش نسخة OpenAPI).",
            "العنوان الأساسي.",
            "المسارات.",
            "مسار فيه parameter اسمه id.",
            "GET عليه.",
            "اسم فريد للعملية، والأدوات بتعمل منه اسم الدالة (getOrder).",
            "الـ id جاي من الـ path، ومطلوب، ونص.",
            "الردود الممكنة:",
            "200: بيرجّع Order بالشكل المتعرّف تحت.",
            "404: بيرجّع Problem بالـ Content-Type بتاع RFC 9457.",
            "الأجزاء المشتركة.",
            "الأشكال (JSON Schema).",
            "شكل الطلب: id و status مطلوبين، والحالة من ٣ قيم.",
            "شكل الخطأ."
          ],
          sol: R`لو فحصت المثال زي ما هو بـ [[@redocly/cli]] (جربناها على 2.55)، هتاخد [[Validation failed with 2 errors and 2 warnings]] من الـ config الافتراضي (recommended): الـ errors هما [[operation-summary]] (العملية ناقصها [[summary]]) و [[security-defined]] (مفيش security على العملية ولا على مستوى الملف). والـ warnings: [[info-license]] و [[no-server-example.com]]. ده طبيعي: الـ lint بيفحص جودة، مش بس إن الملف صحيح.

الحل: [[summary]] لكل operation، و [[securitySchemes]] بـ bearer و [[security]] على مستوى الملف، و [[license]] في [[info]]. في الحل endpointين ([[POST /orders]] و [[GET /orders/{id}]])، ومعاهم ردود 401 و 422 من نوع Problem، والنتيجة [[Your API description is valid]]. التحذير الوحيد اللي بيفضل هو example.com، وده بيختفي لما تحط الدومين الحقيقي بتاعك.

وجرّب تغلط في [[$ref]] (اكتب [[NewOrdr]] مثلًا): هتاخد error اسمه [[no-unresolved-refs]] و [[Can't resolve $ref]]، ومعاه السطر والعمود بالظبط، وكمان warning إن [[NewOrder]] مش مستخدم ([[no-unused-components]]). ولو مش عايز قاعدة معينة، اعمل ملف [[redocly.yaml]] وقفّلها بوعي، متتجاهلش الـ output.`,
          solCode: R`openapi: 3.1.1
info:
  title: Orders API
  version: 1.4.0
  license: { name: Proprietary, identifier: LicenseRef-Proprietary }
servers: [{ url: "https://api.example.com/v1" }]
security: [{ bearerAuth: [] }]
paths:
  /orders:
    post:
      operationId: createOrder
      summary: Create an order
      requestBody:
        required: true
        content: { application/json: { schema: { $ref: "#/components/schemas/NewOrder" } } }
      responses:
        "201": { description: Created, content: { application/json: { schema: { $ref: "#/components/schemas/Order" } } } }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "422": { description: Validation failed, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
  /orders/{id}:
    get:
      operationId: getOrder
      summary: Get one order
      parameters: [{ name: id, in: path, required: true, schema: { type: string } }]
      responses:
        "200": { description: OK, content: { application/json: { schema: { $ref: "#/components/schemas/Order" } } } }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "404": { description: Not found, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
components:
  securitySchemes:
    bearerAuth: { type: http, scheme: bearer, bearerFormat: JWT }
  responses:
    Unauthorized: { description: Missing or invalid token, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
  schemas:
    NewOrder: { type: object, required: [productId, qty], properties: { productId: { type: string }, qty: { type: integer, minimum: 1 } } }
    Order: { type: object, required: [id, status], properties: { id: { type: string }, status: { type: string, enum: [pending, paid, shipped] } } }
    Problem: { type: object, properties: { title: { type: string }, status: { type: integer }, detail: { type: string } } }`
        },
        {
          cmd: "Swagger UI و openapi-typescript",
          title: "docs تفاعلية وأنواع TypeScript من نفس العقد",
          desc: R`[[swagger-ui-express]] بيعرض الـ OpenAPI كصفحة تجرّب منها كل endpoint من المتصفح. و [[openapi-typescript]] بيولّد ملف types من نفس العقد، و [[openapi-fetch]] بيستخدمه، فكل طلب من الفرونت متحقق منه وقت الكتابة: المسار، والـ params، وشكل الرد.

لو الـ backend غيّر اسم حقل، الفرونت ميعدّيش الـ typecheck، بدل ما يقع عند المستخدم.`,
          example: R`import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import { readFileSync } from "node:fs";
const spec = parse(readFileSync("openapi.yaml", "utf8"));
app.get("/openapi.json", (_req, res) => res.json(spec));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
// الفرونت: npx openapi-typescript http://localhost:3000/openapi.json -o src/api.d.ts
import createClient from "openapi-fetch";
import type { paths } from "./api";
const api = createClient<paths>({ baseUrl: "http://localhost:3000/v1" });
const { data, error } = await api.GET("/orders/{id}", { params: { path: { id: "9001" } } });
if (error) console.error(error.title);
else console.log(data.status);`,
          try: R`شغّل الـ docs وافتح [[/docs]] وجرّب «Try it out». وبعدين ولّد الأنواع، وغيّر في الكود [["/orders/{id}"]] لـ [["/order/{id}"]] وشغّل [[tsc --noEmit]] (تاب «فحص الكود»)، وشوف الخطأ قبل ما تشغّل حاجة.`,
          flag: "script",
          deep: {
            why: "الـ docs اللي في Notion بتبقى قديمة. والأنواع اللي بتكتبها بإيدك في الفرونت بتبعد عن الحقيقة بهدوء. لما الاتنين بيتولّدوا من ملف واحد، مفيش مكان للكذب.",
            how: R`[[swagger-ui-express]] بيقدّم ملفات Swagger UI الثابتة ([[swaggerUi.serve]]) وبيعمل صفحة HTML فيها العقد بتاعك ([[setup(spec)]]). وفيه بدايل أشيك زي Scalar و Redoc، ونفس الفكرة: بياخدوا نفس الـ JSON.

[[openapi-typescript]] بيقرا العقد (ملف أو URL) ويطلّع ملف [[.d.ts]] فيه type اسمه [[paths]]: لكل مسار، ولكل method، الـ parameters والـ body والردود بالـ status. مفيش كود runtime، أنواع بس.

[[openapi-fetch]] wrapper صغير جدًا فوق [[fetch]] بياخد [[paths]] كـ generic. في [[api.GET("/orders/{id}", ...)]] الـ TypeScript بيكمّلك المسارات الموجودة بس، وبيطلب الـ params المطلوبة، وبيرجّع [[{ data, error, response }]]: [[data]] لو 2xx ونوعه من الرد الناجح، و [[error]] لو غير كده ونوعه من ردود الأخطاء. فمش محتاج [[as Order]] في أي حتة.

التوليد يتعمل script في package.json ويتشغّل في CI، ولو الملف المتولّد اتغيّر ومحدش عمله commit، الـ CI يقع. كده أي تغيير في العقد بيبان في الـ PR.

وفي monorepo كله TypeScript فيه بديل من غير عقد خالص: tRPC (المستوى ٣).`,
            when: "أول ما يبقى فيه عقد OpenAPI. وفي أي فرونت بيكلم API مش بتاعك وموفّر OpenAPI (Stripe و GitHub موفّرينه، وتقدر تولّد منه).",
            mistakes: R`[[/docs]] مفتوحة في الإنتاج على API داخلي، فأي حد يشوف كل الـ endpoints (ومنها endpoints الأدمن). اقفلها بـ auth أو اعرضها في dev بس. وتولّد الأنواع مرة وتنسى، فتبقى قديمة زي الأنواع اليدوية. وتعمل [[as]] على [[data]] بدل ما تصلّح العقد.`
          },
          lines: [
            "مكتبة صفحة الـ docs.",
            "parser للـ YAML.",
            "قراية ملفات.",
            "اقرا العقد مرة واحدة وقت التشغيل.",
            "اعرضه JSON عشان الأدوات تسحبه.",
            "صفحة docs تفاعلية على /docs.",
            "(ناحية الفرونت) عميل fetch بيفهم الأنواع.",
            "الأنواع المتولّدة من العقد.",
            "اعمل عميل بالعنوان الأساسي.",
            "المسار لازم يبقى موجود في العقد، والـ id مطلوب ونص. أي غلط هنا = TypeScript error.",
            "error نوعه Problem (من رد 404 في العقد).",
            "data نوعه Order، فـ [[data.status]] معروف إنه pending أو paid أو shipped."
          ],
          sol: R`[[/docs]] بيعمل redirect لـ [[/docs/]] وبيفتح صفحة Swagger UI فيها كل الـ endpoints. بس «Try it out» بيبعت الطلب للـ URL اللي في [[servers]] في العقد، يعني [[https://api.example.com/v1]] مش السيرفر بتاعك، فهتاخد [[Failed to fetch]]. الحل: ضيف [[http://localhost:3000/v1]] أول واحد في [[servers]] (أو اختاره من القايمة اللي فوق)، واتأكد إن الـ routes بتاعتك فعلًا تحت [[/v1]].

بعد التوليد، غيّر المسار لـ [["/order/{id}"]] وشغّل [[tsc --noEmit]]: هتاخد خطأ زي [[Argument of type '"/order/{id}"' is not assignable to parameter of type '"/orders/{id}"']]، قبل ما تشغّل أي حاجة. رجّعه صح والخطأ يختفي، و [[data.status]] نوعه [[pending | paid | shipped]] و [[error.title]] من شكل Problem.

لو [[openapi-typescript]] وقع بـ [[Cannot read properties of undefined (reading 'createKeywordTypeNode')]]: ده لأن المشروع فيه TypeScript 7 (الـ latest على npm دلوقتي)، والنسخة 7.13 من openapi-typescript محتاجة JS API بتاعة TypeScript 5. شغّله بـ [[npx]] من برا المشروع، أو ثبّت [[typescript@5]] له. ولو [[api.GET]] مش بيطلّع أي خطأ مع المسار الغلط، يبقى الـ import بتاع [[paths]] مش لاقي الملف، ونوعه بقى any.`,
          solCode: R`# openapi.yaml: ضيف السيرفر المحلي أول واحد، عشان «Try it out» يبعت له مش لـ api.example.com
servers:
  - { url: "http://localhost:3000/v1", description: Local }
  - { url: "https://api.example.com/v1", description: Production }

# package.json
"scripts": { "gen:api": "openapi-typescript http://localhost:3000/openapi.json -o src/api.d.ts" }

$ npm run gen:api
✨ openapi-typescript 7.13.0
🚀 http://localhost:3000/openapi.json → src/api.d.ts

# بعد ما تغيّر "/orders/{id}" لـ "/order/{id}":
$ npx tsc --noEmit
src/client.ts(4,39): error TS2345: Argument of type '"/order/{id}"' is not assignable to parameter of type '"/orders/{id}"'.`
        },
        {
          cmd: "OWASP API Top 10",
          title: "أشهر ثغرات الـ APIs واللي بيقفلها",
          desc: R`OWASP عندها قايمة خاصة بالـ APIs (آخر نسخة 2023) غير قايمة الويب العامة (تاب «الأمان»). أول ٣ فيها كلهم صلاحيات ودخول: BOLA (تطلب order غيرك بتغيير الـ id)، و Broken Authentication، و BOPLA (تشوف أو تعدّل حقول مش المفروض توصلها، زي [[role]] أو [[passwordHash]]).

المثال بيقفل ٣ منهم في كام سطر: شرط الملكية جوه كل query، و schema صارمة للتعديل، وحد أقصى للقوايم، و [[select]] بالحقول المسموحة بس.`,
          example: R`const OrderPatch = z.strictObject({ note: z.string().max(500), giftWrap: z.boolean() }).partial();
app.patch("/orders/:id", requireAuth, async (req, res) => {
  const data = OrderPatch.parse(req.body);
  const { count } = await db.order.updateMany({ where: { id: req.params.id, userId: req.user.id }, data });
  if (count === 0) return res.status(404).end();
  res.status(204).end();
});
app.get("/orders", requireAuth, async (req, res) => {
  const take = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 20, 1), 100);
  res.json({ items: await db.order.findMany({ where: { userId: req.user.id }, take, select: { id: true, status: true, total: true, createdAt: true } }) });
});`,
          try: R`سجّل دخول بمستخدمين. خد id طلب من الأول، واطلبه وعدّله بتوكن التاني: لازم 404. وابعت PATCH فيه [[{"status":"paid"}]]: لازم 422. ده أهم اختبار أمان في أي API، واعمله لكل endpoint فيه id.`,
          flag: "script",
          deep: {
            why: "أغلب اختراقات الـ APIs مش تشفير مكسور ولا SQL injection. هي حد غيّر رقم في الـ URL وشاف بيانات حد تاني، أو بعت حقل زيادة وبقى admin. الـ API بيعمل بالظبط اللي اتقاله، والسؤال «مين مسموحله؟» مبيتسألش.",
            how: R`القايمة (OWASP API Security Top 10، نسخة 2023) باختصار:

API1 BOLA (Broken Object Level Authorization): [[GET /orders/9001]] من غير فحص إن الطلب ده بتاع اللي بيسأل. الحل: شرط الملكية جوه الاستعلام نفسه، مش فحص بعد ما تجيب.

API2 Broken Authentication: login من غير rate limit، وتوكنات مبتنتهيش، و JWT من غير فحص توقيع أو [[alg]].

API3 BOPLA (Broken Object Property Level Authorization): اتنين في واحد. قراية: الرد فيه حقول سرية (passwordHash و resetToken وبيانات داخلية). كتابة: mass assignment ([[data: req.body]]).

API4 Unrestricted Resource Consumption: مفيش حد للـ limit، ولا لحجم الرفع، ولا لعدد رسايل SMS اللي بتتبعت (وكل SMS بفلوس).

API5 Broken Function Level Authorization: endpoints الأدمن محمية في الواجهة بس ([[/admin/users]] بيشتغل لأي مستخدم مسجّل).

API6 Unrestricted Access to Sensitive Business Flows: bots بتشتري كل التذاكر، أو بتعمل حسابات بالآلاف عشان الكوبونات.

API7 SSRF: الـ API بيعمل fetch لـ URL جاي من المستخدم (webhook URL، أو صورة من لينك) فيوصل لشبكتك الداخلية.

API8 Security Misconfiguration: CORS مفتوح، و stack traces في الردود، و debug endpoints في الإنتاج.

API9 Improper Inventory Management: [[/v1]] قديم لسه شغال من غير الحماية الجديدة، أو staging مفتوح على قاعدة الإنتاج.

API10 Unsafe Consumption of APIs: بتثق في رد API تالت (أو webhook) من غير validation، وهو داخل سيستمك زي أي مدخل من مستخدم.

[[z.strictObject]] في Zod 4 بترفض أي key مش متعرّف، و [[z.object]] العادية بتشيله بهدوء. الاتنين بيحموا من mass assignment طالما بتبعت الناتج مش [[req.body]].`,
            when: "اعمل الـ checklist دي على كل endpoint جديد في الـ code review. و BOLA بالذات: أي route فيه [[:id]] لازم الاستعلام بتاعه فيه شرط ملكية أو صلاحية.",
            mistakes: R`تفحص الملكية في الفرونت بس (بتخفي الزرار). وتفحص [[order.userId === user.id]] في GET وتنسى تعمل ده في endpoint التعديل أو المسح. و [[findMany()]] من غير select فالرد فيه كل الأعمدة. وتفتكر إن UUID في الـ URL حماية: هو بيصعّب التخمين بس، واللينكات بتتسرب.`
          },
          lines: [
            "الحقول اللي المستخدم يقدر يعدّلها بس. [[strictObject]] بترفض أي حقل زيادة زي status أو userId أو total.",
            "تعديل طلب.",
            "اتحقق: أي حقل مش في القايمة = 422 (BOPLA: mass assignment).",
            "عدّل بشرط الـ id والملكية مع بعض في نفس الاستعلام (BOLA).",
            "مش بتاعه أو مش موجود: 404 في الحالتين.",
            "204.",
            "قفلة.",
            "قايمة الطلبات.",
            "بين ١ و ١٠٠ بس، ورقم صحيح، عشان [[take]] السالب في Prisma بيجيب من آخر القايمة ويعدّي الحد (Unrestricted Resource Consumption).",
            "طلباته بس، وبالحقول اللي الواجهة محتاجاها بس (BOPLA: كشف بيانات زيادة).",
            "قفلة."
          ],
          sol: R`بتوكن المستخدم التاني: الـ GET بيرجّع [[404]]، والـ PATCH بيرجّع [[404]]، ونفس الـ 404 لـ id مش موجود أصلًا، فمفيش طريقة يعرف بيها إن الطلب موجود. و PATCH فيه [[{"status":"paid"}]] بتوكن صاحب الطلب نفسه بيرجّع [[422]] و [[unrecognized_keys]] و [[keys: ["status"]]]. و [[{"note":"leave at door"}]] بيرجّع 204 والـ GET يوريك التعديل، ومن غير أي حقل داخلي زي [[internalCost]] لأن الـ [[select]] محدد.

لو المستخدم التاني أخد 200، يبقى الاستعلام بيدوّر بالـ id بس. ولو أخد 403، يبقى بتجيب الطلب الأول وبعدين تقارن [[userId]]: شغال، بس بيأكد وجود الطلب، وأسهل تنساه في endpoint تاني. ولو [[{"status":"paid"}]] رجّع 204، يبقى انت عامل [[z.object]] مش [[z.strictObject]]: الـ status بيتشال بهدوء ومبيتكتبش، فانت محمي، بس العميل مش هيعرف إن طلبه اتجاهل. ولو الطلب اتدفع فعلًا، يبقى بتبعت [[req.body]] للقاعدة بدل الناتج بتاع Zod.

واعمل الاختبار ده اختبار integration ثابت (بمستخدمين واختبار لكل route فيه [[:id]])، عشان أي endpoint جديد ينسى شرط الملكية يقع في CI مش عند العميل.`,
          solCode: R`// الـ GET اللي هتختبر بيه: نفس شرط الملكية جوه الاستعلام، و select بالحقول المسموحة
app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    select: { id: true, status: true, total: true, note: true, giftWrap: true },
  });
  if (!order) return res.status(404).end();
  res.json(order);
});

// الاختبار (ORDER_ID بتاع أحمد، و TOKEN_B توكن مستخدم تاني):
// curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/orders/$ORDER_ID -H "Authorization: Bearer $TOKEN_B"                  → 404
// curl -s -o /dev/null -w "%{http_code}\n" -X PATCH localhost:3000/orders/$ORDER_ID -H "Authorization: Bearer $TOKEN_B" \
//   -H 'Content-Type: application/json' -d '{"note":"hacked"}'                                                                → 404
// curl -s -X PATCH localhost:3000/orders/$ORDER_ID -H "Authorization: Bearer $TOKEN_A" -H 'Content-Type: application/json' -d '{"status":"paid"}'
//   → 422: {"code":"unrecognized_keys","keys":["status"],"path":[],"message":"Unrecognized key: \"status\""}`
        }
      ]
    },
    {
      t: "SSE و streaming",
      l: 2,
      n: "السيرفر يبعت للمتصفح أول بأول على HTTP عادي: حالة طلب، وإشعارات، ورد AI كلمة كلمة، مع الإلغاء",
      items: [
        {
          cmd: "SSE في Express",
          title: "ابعت أحداث من السيرفر للمتصفح من غير WebSocket",
          desc: R`SSE (Server-Sent Events) رد HTTP عادي مبيخلصش: الـ Content-Type بتاعه [[text/event-stream]]، والسيرفر بيكتب فيه أحداث نص كل ما يحصل جديد. كل حدث سطور زي [[id: 7]] و [[event: status]] و [[data: {...}]]، وبعدهم سطر فاضي.

في المتصفح: [[new EventSource("/orders/9001/events")]] وبعدين [[es.addEventListener("status", ...)]]. ولو الاتصال قطع، المتصفح بيعيد الاتصال لوحده، وبيبعت آخر id شافه في header اسمه [[Last-Event-ID]]، فالسيرفر يبعتله اللي فاته بس.

اتجاه واحد بس (السيرفر للمتصفح). ولو محتاج الاتجاهين، ده WebSocket (درس [[socket.io]] في تاب «بناء مشروع كامل»).`,
          example: R`const clients = new Set<{ orderId: string; res: Response }>();
const sse = (e: { id: number; type: string; data: unknown }) => $__btid: $__{e.id}\nevent: $__{e.type}\ndata: $__{JSON.stringify(e.data)}\n\n$__bt;
export async function publishStatus(orderId: string, status: string) {
  const ev = await db.orderEvent.create({ data: { orderId, type: "status", data: { status } } });
  for (const c of clients) if (c.orderId === orderId) c.res.write(sse(ev));
}
app.get("/orders/:id/events", requireAuth, requireOrderOwner, async (req, res) => {
  res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" });
  res.flushHeaders();
  res.write("retry: 3000\n\n");
  const lastId = Number(req.get("last-event-id")) || 0;
  const missed = await db.orderEvent.findMany({ where: { orderId: req.params.id, id: { gt: lastId } }, orderBy: { id: "asc" } });
  for (const e of missed) res.write(sse(e));
  const client = { orderId: req.params.id, res };
  clients.add(client);
  const ping = setInterval(() => res.write(": ping\n\n"), 15_000);
  req.on("close", () => { clearInterval(ping); clients.delete(client); });
});`,
          try: R`شغّل الـ endpoint، وافتح [[curl -N localhost:3000/orders/9001/events]] في terminal (الـ [[-N]] بيوقف الـ buffering في curl). من terminal تاني نادي [[publishStatus]] (من route تجربة) وشوف الحدث بيظهر في الأول على طول. وبعدين اقفل الـ curl وافتحه تاني ومعاه [[-H 'Last-Event-ID: 1']]: لازم يوصلك كل اللي بعد ١ بس.`,
          flag: "script",
          deep: {
            why: "حالة الطلب، وتقدّم رفع ملف، وإشعار «فيه رسالة جديدة»، ولوحة أرقام بتتحدث: كلها السيرفر بيتكلم والمتصفح بيسمع. الـ polling كل ثانيتين بيعمل آلاف طلبات فاضية وبيأخر التحديث. و WebSocket بروتوكول تاني محتاج إعداد في الـ proxy ومكتبة. SSE بيحل الحالة دي بـ HTTP عادي: نفس الـ cookies ونفس الـ auth middleware ونفس الـ logs.",
            how: R`شكل الحدث: سطور [[field: value]]، والحدث بيخلص بسطر فاضي. [[data]] هو المحتوى (ولو اتكرر في نفس الحدث، السطور بتتجمع بـ newline). [[event]] اسم الحدث، ومن غيره المتصفح بيعتبره [[message]]. [[id]] بيتحفظ في المتصفح كـ «آخر حاجة شفتها». [[retry]] بيقول للمتصفح يستنى كام ملّي ثانية قبل ما يعيد الاتصال. وأي سطر بيبدأ بـ [[:]] تعليق والمتصفح بيتجاهله، وده اللي بنستخدمه كـ heartbeat.

الـ heartbeat ليه؟ الـ proxies والـ load balancers بيقفلوا أي اتصال ساكت فترة (Nginx افتراضيًا [[proxy_read_timeout 60s]]، وفيه load balancers أقل). سطر تعليق كل ١٥ ثانية بيخلي الاتصال «شغال» في نظرهم، وكمان بيكشف إن العميل مشي: الكتابة على اتصال مقفول بتطلّع [[close]].

الـ reconnect: [[EventSource]] بيعيد الاتصال لوحده لو الشبكة قطعت أو السيرفر عمل restart، وبيبعت [[Last-Event-ID]]. عشان ده يشتغل صح، الأحداث لازم تبقى متخزنة بـ id متسلسل في مكان بيعيش أكتر من الـ process (جدول، أو Redis Stream). لو خزنتها في array في الذاكرة، أول restart والـ ids بتبدأ من الأول، والعميل اللي كان عند ٥٠ هيستنى أحداث عمرها ما هتيجي.

الـ buffering: أي طبقة بتجمّع الرد قبل ما تبعته بتبوّظ SSE. [[X-Accel-Buffering: no]] بيقول لـ Nginx ميعملش buffer للرد ده بالذات (أو [[proxy_buffering off]] في الـ location). ومكتبة [[compression]] في Express بتعمل buffer برضه، فاستثني المسار ده منها أو نادي [[res.flush()]] بعد كل كتابة. و [[res.flushHeaders()]] بيبعت الـ headers فورًا، عشان المتصفح يعرف إن الاتصال اتفتح قبل أول حدث.

الحدود: SSE نص بس (UTF-8)، واتجاه واحد. وعلى HTTP/1.1 المتصفح بيسمح بـ ٦ اتصالات بس لنفس الدومين، فـ ٧ تابات مفتوحة على نفس الصفحة = التابة السابعة واقفة. على HTTP/2 المشكلة دي مش موجودة لأن كله على اتصال واحد (تاب «Nginx»، درس [[HTTP/2 و HTTP/3]]). و [[EventSource]] مبيقدرش يبعت headers زي Authorization، فالـ auth بالـ cookie، أو بـ fetch وقراية الـ stream بإيدك (درس «ستريم في React»).

ولو عندك أكتر من سيرفر: الـ [[clients]] Set في ذاكرة كل process، فالحدث اللي اتنشر على سيرفر ١ مش هيوصل للمتصل بسيرفر ٢. نفس الحل بتاع WebSocket: Redis pub/sub بين السيرفرات (درس [[Redis adapter]] في الكاتيجوري الجاية).`,
            when: "أي تحديث من السيرفر للمتصفح في اتجاه واحد: حالة طلب أو job (بعد رد 202)، وإشعارات، ولوحات أرقام، و logs بتتكتب live، وردود AI. ولو الشات محتاج الاتجاهين بسرعة عالية، أو محتاج binary، WebSocket.",
            mistakes: R`تنسى السطر الفاضي في آخر الحدث، فالمتصفح ميعرضش حاجة لحد ما الحدث اللي بعده ييجي. وتنسى الـ heartbeat، فالاتصال يتقفل كل دقيقة من الـ proxy والعميل يعيد ويعيد. وتسيب الـ interval شغال بعد [[close]] (memory leak بيكبر مع كل زائر). و [[compression]] أو Nginx بيجمّعوا الرد فالأحداث توصل كلها مرة واحدة في الآخر. وسؤال انترفيو مشهور: «SSE ولا WebSocket ولا polling؟»، والإجابة بتبدأ بالاتجاه: من السيرفر بس = SSE، الاتجاهين = WebSocket، تحديث كل دقيقة كفاية = polling.`
          },
          lines: [
            "كل المتصلين دلوقتي: كل واحد متابع أنهي طلب، والـ response بتاعه عشان نكتب فيه.",
            "بيحوّل حدث لشكل SSE: id و event و data (JSON في سطر واحد)، وسطر فاضي في الآخر يقفل الحدث.",
            "دالة بتناديها أي service لما حالة الطلب تتغير.",
            "خزّن الحدث الأول في القاعدة. الـ id المتسلسل هو اللي الـ reconnect هيعتمد عليه.",
            "ابعته لكل اللي متابعين الطلب ده.",
            "قفلة.",
            "الـ endpoint. محمي زي أي endpoint، وصاحب الطلب بس يتابعه (BOLA).",
            "نوع الرد SSE، ومتتكاشش، و Nginx ميعملش buffer للرد ده.",
            "ابعت الـ headers فورًا، من غير ما تستنى أول حدث.",
            "قول للمتصفح: لو الاتصال قطع، استنى ٣ ثواني وعيد.",
            "آخر حدث العميل شافه (المتصفح بيبعته لوحده في الـ reconnect). لو مفيش يبقى صفر.",
            "هات الأحداث اللي فاتته من القاعدة، بالترتيب.",
            "وابعتهاله قبل أي حاجة جديدة.",
            "سجّل الاتصال ده عشان publishStatus يوصله.",
            "ضيفه للقايمة.",
            "heartbeat: سطر تعليق كل ١٥ ثانية، عشان الـ proxy ميقفلش الاتصال الساكت.",
            "لما العميل يقفل: وقّف الـ heartbeat وشيله من القايمة. من غير ده الذاكرة بتتملي.",
            "قفلة."
          ],
          sol: R`في الـ terminal الأول هتشوف [[retry: 3000]] وبعدين الأحداث القديمة (لو فيه)، وبعدين الاتصال واقف مستني. أول ما تنادي publishStatus يظهر حدث زي [[id: 3]] و [[event: status]] و [[data: {"status":"shipped"}]] فورًا. وكل ١٥ ثانية سطر [[: ping]].

لما تفتحه تاني بـ [[Last-Event-ID: 1]] لازم يوصلك الحدث ٢ و ٣ بس، مش ١. لو وصلك كله، يبقى الشرط [[id: { gt: lastId }]] مش شغال، أو الـ header مش بيتقري (اسمه case-insensitive و [[req.get]] بيتعامل مع ده).

لو الحدث مش بيظهر غير لما تقفل الـ curl: فيه buffering. شيل [[-N]] وهتلاقي نفس المشكلة، أو فيه [[compression]] middleware قبل الـ route. ولو بتجرب ورا Nginx وناسي [[X-Accel-Buffering]]، الأحداث بتوصل دفعة واحدة.`
        },
        {
          cmd: "SSE في Route Handler",
          title: "نفس الـ SSE جوه Next بـ ReadableStream",
          desc: R`في Next مفيش [[res.write]]. الـ Route Handler بيرجّع [[Response]]، والـ body بتاعه ممكن يبقى [[ReadableStream]]: بتعمل stream، وجواه كل ما يحصل حدث بتعمل [[controller.enqueue]] بالبايتات، و Next بيبعتها للمتصفح أول بأول.

ولما العميل يقفل التابة، [[request.signal]] بيعمل abort، فتوقف الـ heartbeat وتقفل أي اشتراك.`,
          example: R`// app/api/orders/[id]/events/route.ts
const enc = new TextEncoder();
export async function GET(request: Request, ctx: RouteContext<"/api/orders/[id]/events">) {
  const { id } = await ctx.params;
  if (!(await canViewOrder(id))) return new Response(null, { status: 404 });
  const since = Number(request.headers.get("last-event-id")) || 0;
  const stream = new ReadableStream({
    async start(controller) {
      const send = (s: string) => controller.enqueue(enc.encode(s));
      const ping = setInterval(() => send(": ping\n\n"), 15_000);
      request.signal.addEventListener("abort", () => clearInterval(ping));
      send("retry: 3000\n\n");
      try {
        for await (const e of orderEvents(id, since, request.signal)) {
          send($__btid: $__{e.id}\nevent: status\ndata: $__{JSON.stringify(e.data)}\n\n$__bt);
        }
      } finally {
        clearInterval(ping);
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", "X-Accel-Buffering": "no" } });
}`,
          try: R`اكتب [[orderEvents]] كـ async generator بيطلّع حدث كل ثانية لحد ما الـ signal يعمل abort (خلي أول id يبقى [[since + 1]]). افتح المسار بـ [[curl -N]] وشوف الأحداث، وبعدين [[Ctrl+C]] وحط [[console.log]] في الـ abort listener وتأكد إنه اتنادى.`,
          flag: "script",
          deep: {
            why: "مشاريع Next كتير مفيهاش سيرفر Express منفصل، وعايزة تحديثات live: حالة دفع، أو تقدّم job، أو إشعارات. Route Handler بـ ReadableStream بيدّيك SSE من غير ما تضيف سيرفر أو خدمة.",
            how: R`[[ReadableStream]] من Web Streams (نفس اللي في المتصفح). بتدّيله object فيه [[start(controller)]]: بيتنادى مرة لما الـ stream يبدأ، وانت تفضل تعمل [[enqueue]] براحتك، ولما تخلص [[close()]]. الـ [[enqueue]] بياخد بايتات، عشان كده [[TextEncoder]].

[[request.signal]]: الـ Request في Next بيدّيك AbortSignal بيتعمل abort لما العميل يقطع الاتصال. لو مسمعتلوش، الـ loop هيفضل شغال ويكتب في stream محدش بيقراه. وفيه كمان [[cancel()]] في الـ ReadableStream نفسه بيتنادى لما القارئ يلغي، والاتنين ينفعوا.

[[orderEvents]] هنا async generator: [[for await]] بيستنى كل حدث. ممكن يبقى polling للقاعدة كل ثانية ([[WHERE id > last]])، أو اشتراك في Redis pub/sub، أو LISTEN/NOTIFY في Postgres. المهم إنه يوقف لما الـ signal يعمل abort.

الـ [[no-transform]] في Cache-Control بيقول لأي proxy أو CDN ميعدّلش الرد (ضغط أو تجميع).

الاستضافة بتفرق هنا: على سيرفر Node بتاعك (Docker أو VPS) الاتصال يعيش براحته. على serverless (زي Vercel)، الـ function ليها أقصى مدة تشتغلها، والاتصال بيتقفل بعدها، فالمتصفح يعيد بـ Last-Event-ID. ده شغال طالما الأحداث متخزنة، بس كل اتصال مفتوح بيتحسب وقت function. راجع حدود المنصة بتاعتك قبل ما تعتمد على اتصالات طويلة (تاب «Next.js»، درس [[فين تنشر]]).`,
            when: "مشروع Next محتاج تحديثات live في اتجاه واحد. ولو هتحتاج آلاف الاتصالات المفتوحة طول الوقت على serverless، فكّر في خدمة realtime جاهزة أو سيرفر منفصل.",
            mistakes: R`ترجّع الـ Response بعد ما الـ loop يخلص (يعني [[await]] الـ loop قبل [[return]])، فالمتصفح مش هيشوف أي حاجة لحد الآخر. و [[enqueue]] بعد [[close()]] بيرمي error. وتنسى الـ abort فالـ generator يفضل يسأل القاعدة كل ثانية لعميل مشي من ساعة. وتفتكر إن SSE على serverless هيفضل مفتوح للأبد.`
          },
          lines: [
            "نفس الـ encoder لكل الأحداث: بيحوّل النص لبايتات.",
            R`GET على المسار ده. [[RouteContext]] نوع global في Next زي ما في درس [[route.ts]].`,
            R`الـ [[params]] Promise.`,
            "مش من حقه يشوف الطلب ده؟ 404 (الـ auth جوه كل Route Handler).",
            "آخر حدث العميل شافه، لو ده reconnect.",
            "اعمل stream.",
            "الدالة دي بتشتغل مرة لما الرد يبدأ يتبعت.",
            "helper بيكتب نص في الـ stream.",
            "heartbeat كل ١٥ ثانية.",
            "العميل قفل؟ وقّف الـ heartbeat.",
            "قول للمتصفح يستنى ٣ ثواني قبل الـ reconnect.",
            "جرّب...",
            "...لكل حدث جديد (الـ generator بيوقف لما الـ signal يعمل abort)...",
            "...ابعته بشكل SSE.",
            "قفلة الـ loop.",
            "في كل الأحوال (خلص أو حصل error):",
            "وقّف الـ heartbeat...",
            "...واقفل الـ stream.",
            "قفلة.",
            "قفلة start.",
            "قفلة الـ stream.",
            "رجّع الـ stream فورًا كـ body، بنفس headers الـ SSE، و no-transform عشان محدش في النص يعدّل الرد.",
            "قفلة."
          ],
          sol: R`الـ generator ممكن يبقى كده (ده تجربة، في الحقيقة هتقرا من القاعدة أو Redis). مع [[curl -N localhost:3000/api/orders/9/events]] هتشوف [[retry: 3000]] وبعدين [[id: 1]] و [[id: 2]] كل ثانية. ولو بعت [[-H 'Last-Event-ID: 4']] يبدأ من ٥.

أول ما تعمل [[Ctrl+C]] لازم تشوف الـ log بتاع الـ abort في terminal الـ Next، والأحداث توقف. لو الـ log مظهرش والـ generator فضل يطبع، يبقى الـ loop مش بيبص على [[signal.aborted]].

ولو مفيش ولا حدث بيوصل لحد ما الـ stream يخلص: انت عامل [[await]] على الـ loop قبل ما ترجّع الـ Response، أو فيه proxy بيعمل buffer.`,
          solCode: R`async function* orderEvents(id: string, since: number, signal: AbortSignal) {
  let n = since;
  while (!signal.aborted) {
    await new Promise((r) => setTimeout(r, 1000));
    if (signal.aborted) break;
    n++;
    yield { id: n, data: { orderId: id, status: "step " + n } };
  }
}
// وفي الـ route:
request.signal.addEventListener("abort", () => { console.log("client left"); clearInterval(ping); });`
        },
        {
          cmd: "ستريم رد LLM",
          title: "ابعت رد الموديل للمتصفح وهو بيتكتب",
          desc: R`الموديل بيطلّع الرد token ورا token، والرد الكامل ممكن ياخد ٢٠ ثانية. بدل ما المستخدم يبص على spinner، بتعمل stream: السيرفر بيطلب من الـ API بـ streaming، وكل حتة نص توصله بيبعتها للمتصفح على طول.

السيرفر هنا proxy (المفتاح مايروحش للمتصفح، تاب «الذكاء الاصطناعي» درس [[backend proxy]]). والأهم: لو المستخدم قفل الصفحة أو داس «وقّف»، الطلب للموديل نفسه لازم يتلغي، وإلا بتدفع tokens محدش هيقراها.`,
          example: R`// app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return Response.json({ title: "Unauthorized", status: 401 }, { status: 401 });
  const { question } = Question.parse(await request.json());
  const stream = client.messages.stream(
    { model: "claude-opus-5-5", max_tokens: 4096, messages: [{ role: "user", content: question }] },
    { signal: request.signal },
  );
  const enc = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const e of stream) {
          if (e.type === "content_block_delta" && e.delta.type === "text_delta") controller.enqueue(enc.encode(e.delta.text));
        }
        controller.close();
      } catch (err) {
        if (!request.signal.aborted) controller.error(err);
      }
    },
    cancel() { stream.abort(); },
  });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" } });
}`,
          try: R`شغّل الـ route واطلبه بـ [[curl -N -X POST localhost:3000/api/chat -H 'Content-Type: application/json' -d '{"question":"اشرح REST في ١٠ سطور"}']] (ومعاه الكوكي بتاعة الـ login). شوف النص بيطلع حتة حتة. وبعدين اعمل [[Ctrl+C]] في النص، وافتح لوحة الـ usage عند المزوّد (أو اطبع في [[cancel]]) وتأكد إن الطلب اتقطع فعلًا.`,
          flag: "script",
          deep: {
            why: "أول كلمة بعد نص ثانية بتحسّس المستخدم إن الأب سريع، حتى لو الرد كله خد ١٥ ثانية. ومن غير الإلغاء، كل مستخدم بيدوس «وقّف» أو بيقفل التابة بيسيب الطلب شغال عند المزوّد للآخر، وده فلوس على الفاضي، وبيستهلك الـ rate limit بتاعك.",
            how: R`[[client.messages.stream(...)]] بيرجّع object تقدر تلف عليه بـ [[for await]]. كل event ليه [[type]]: [[message_start]]، وبعدين [[content_block_start]]، وبعدين [[content_block_delta]] كتير (النص في [[delta.text]] لما [[delta.type === "text_delta"]])، وفي الآخر [[message_delta]] (فيه [[stop_reason]] و usage) و [[message_stop]]. احنا بنبعت النص بس.

التاني في [[stream(...)]] هو request options، و [[signal]] فيها بيربط الطلب للمزوّد بالـ signal بتاع طلب المستخدم: لما المستخدم يقطع، Next بيعمل abort للـ request.signal، والـ SDK بيقفل الاتصال بالمزوّد. و [[cancel()]] في الـ ReadableStream طبقة أمان تانية: لو القارئ لغى، [[stream.abort()]].

ليه نص عادي ([[text/plain]]) مش SSE؟ لأن كل اللي بتبعته حتت نص، والعميل بيلزقها ورا بعض. ده أبسط شكل وبيتقري بـ [[fetch]] مباشرة. لو محتاج تبعت أنواع مختلفة (نص، ونتيجة tool، و usage، ورسالة خطأ في النص)، ابعت SSE أو NDJSON (سطر JSON لكل حدث)، أو استخدم مكتبة زي Vercel AI SDK اللي بتعرّف بروتوكول جاهز للسيرفر والعميل.

الأخطاء في النص: الـ status (200) بيتبعت مع أول بايت، فلو المزوّد وقع بعد ٣٠٠ كلمة مينفعش ترجع 500. [[controller.error(err)]] بيقطع الـ stream، والعميل بيشوف قراية فشلت، ويعرض «حصل خطأ». لو حصل abort من المستخدم، ده مش خطأ، فمتعملش error.

والموديلات اللي بتفكّر قبل ما ترد (thinking): أول نص ممكن يتأخر لحد ما التفكير يخلص، والـ events الأولى مبيبقاش فيها [[text_delta]]. اعرض «بيفكّر...» لحد أول حتة نص.

وده لسه endpoint عام: auth، و rate limit لكل مستخدم (المستوى ٣: token bucket و quota)، وحد لطول السؤال في الـ schema، وانت اللي بتختار الموديل و [[max_tokens]]. وسجّل الـ usage من [[await stream.finalMessage()]] لو محتاج تحاسب كل مستخدم.`,
            when: "أي رد من موديل هيتعرض لمستخدم وهو مستني: شات، وتلخيص، وكتابة. ولو الرد قصير (تصنيف، أو استخراج JSON)، الطلب العادي أبسط.",
            mistakes: R`تعمل [[await]] للرد كله وبعدين تبعته (فمفيش stream خالص). ومتربطش الـ signal، فالإلغاء بيقفل المتصفح بس والمزوّد مكمّل. و [[controller.error]] على الـ abort فالـ logs تتملي errors وهمية. وتبعت [[JSON.stringify(event)]] كله للمتصفح (فيه ids وتفاصيل داخلية مالهاش لازمة). وتحط الـ API key في الفرونت عشان «الـ streaming أسهل من هناك».`
          },
          lines: [
            "الـ SDK الرسمي.",
            R`بيقرا [[ANTHROPIC_API_KEY]] من البيئة على السيرفر، ومبيروحش للمتصفح.`,
            "POST، لأن السؤال في الـ body.",
            "مين بيسأل؟",
            "مش مسجّل؟ 401 قبل ما تصرف أي token.",
            R`تحقق من الـ body بـ Zod ([[Question]] فيها حد أقصى للطول).`,
            "اطلب الرد بـ streaming...",
            "...انت اللي بتحدد الموديل والحد الأقصى، مش العميل...",
            R`...و [[signal]]: لو المستخدم قطع، الطلب للمزوّد بيتقطع معاه.`,
            "قفلة.",
            "encoder للنص.",
            "الـ stream اللي هيروح للمتصفح.",
            "بيبدأ أول ما الرد يتبعت.",
            "جرّب...",
            "...لكل event من المزوّد...",
            "...لو حتة نص، ابعتها على طول.",
            "قفلة الـ loop.",
            "الموديل خلص: اقفل الـ stream.",
            "لو حصل خطأ...",
            "...ومش بسبب إن المستخدم لغى، اقطع الـ stream بـ error عشان العميل يعرف.",
            "قفلة.",
            "قفلة start.",
            "لو القارئ لغى الـ stream، الغي الطلب للمزوّد.",
            "قفلة.",
            "رجّع الـ stream نص عادي، من غير كاش ولا buffering.",
            "قفلة."
          ],
          sol: R`مع [[curl -N]] الكلام بيطلع حتت، كل حتة كلمة أو كلمتين، مش مرة واحدة. لو طلع كله في الآخر: يا انت ناسي [[-N]]، يا فيه buffering في Nginx أو في middleware ضغط.

لما تعمل [[Ctrl+C]] في النص: الـ curl بيقفل، و Next بيعمل abort لـ [[request.signal]]، والـ SDK بيقطع الاتصال بالمزوّد. لو حطيت [[console.log("cancelled")]] في [[cancel()]] هتلاقيه اتطبع. وفي لوحة المزوّد، الـ output tokens للطلب ده هتبقى أقل بكتير من طلب كامل لنفس السؤال.

الغلط الشائع: الإلغاء بيقفل الـ curl بس، والـ log بتاع الـ loop فاضل يطبع لحد الآخر. ده معناه إن [[signal]] مش متباصي للـ SDK.`
        },
        {
          cmd: "ستريم في React",
          title: "اعرض الرد كلمة كلمة ووقّفه بزرار",
          desc: R`في المتصفح [[fetch]] بيرجّع الـ response أول ما الـ headers توصل، و [[res.body]] نفسه stream. بتقراه بـ [[getReader()]] حتة حتة، وكل حتة تضيفها للـ state، فـ React يعرض الرد وهو بيكبر.

والإلغاء بـ [[AbortController]]: بتدّي الـ [[signal]] بتاعه لـ fetch، ولما المستخدم يدوس «وقّف» تنادي [[abort()]]. الـ fetch بيقطع، والسيرفر بيعرف (الدرس اللي فات) ويقطع الطلب للموديل.`,
          example: R`"use client";
import { useEffect, useRef, useState } from "react";
export function AskBox() {
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const ctrl = useRef<AbortController | null>(null);
  useEffect(() => () => ctrl.current?.abort(), []);
  async function ask(question: string) {
    ctrl.current?.abort();
    const ac = (ctrl.current = new AbortController());
    setAnswer("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }), signal: ac.signal });
      if (!res.ok || !res.body) throw new Error($__btHTTP $__{res.status}$__bt);
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer((a) => a + value);
      }
    } catch {
      if (!ac.signal.aborted) setAnswer((a) => a + "\n[حصل خطأ، جرّب تاني]");
    } finally {
      if (ctrl.current === ac) setBusy(false);
    }
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); ask(String(new FormData(e.currentTarget).get("q"))); }}>
      <input name="q" required maxLength={2000} />
      {busy ? <button type="button" onClick={() => ctrl.current?.abort()}>وقّف</button> : <button>اسأل</button>}
      <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
    </form>
  );
}`,
          try: R`حط الـ component في صفحة واسأل سؤال طويل. دوس «وقّف» في النص: الرد يقف عند آخر كلمة وصلت، والزرار يرجع «اسأل». وبعدين اسأل سؤالين ورا بعض بسرعة: الأول لازم يتلغي والتاني بس هو اللي يظهر، من غير ما الردين يتلخبطوا في بعض.`,
          flag: "script",
          deep: {
            why: "الـ streaming من السيرفر مالوش لازمة لو الفرونت بيستنى الرد كله. وزرار «وقّف» مش رفاهية: المستخدم بيكتشف من أول سطرين إن السؤال غلط، ومن غير إلغاء حقيقي، الرد بيكمّل في الخلفية وبيدفع تمنه.",
            how: R`[[res.body]] من نوع [[ReadableStream<Uint8Array>]]: بايتات. [[pipeThrough(new TextDecoderStream())]] بيحوّلها نص UTF-8 صح. ودي مهمة جدًا مع العربي: الحرف العربي بايتين، والحتة ممكن تتقطع في نص الحرف. لو عملت [[new TextDecoder().decode(chunk)]] لكل حتة لوحدها، هتطلع علامات غريبة. الـ stream decoder فاكر البايت الناقص ويكمّله مع الحتة اللي بعدها.

[[reader.read()]] بيرجّع [[{ value, done }]]. لما [[done]] يبقى true، السيرفر قفل الـ stream. و [[setAnswer((a) => a + value)]] بالشكل الـ function عشان كل تحديث يبني على آخر قيمة، مش على القيمة اللي كانت وقت ما الدالة بدأت.

الإلغاء: [[ac.abort()]] بيخلي الـ fetch أو الـ [[read()]] اللي مستني يرمي [[AbortError]]. عشان كده في الـ catch بنسأل [[ac.signal.aborted]]: لو المستخدم هو اللي لغى، ده مش خطأ نعرضه.

الـ ref بيشيل الـ controller الحالي. لو سأل تاني قبل ما الأول يخلص، [[ctrl.current?.abort()]] بيلغي القديم. والـ finally بيتأكد إن الطلب ده لسه هو الحالي قبل ما يقفل الـ busy، عشان الطلب القديم لما يتلغي ميقفلش الـ busy بتاع الجديد. والـ useEffect بيلغي أي طلب شغال لو الـ component اتشال من الصفحة.

لو بتستخدم EventSource (SSE عادي): [[es.close()]] هو الإلغاء. بس EventSource مبيعملش POST ولا بيبعت body أو headers، عشان كده ردود AI غالبًا [[fetch]] زي هنا.

وفيه مكتبات بتعمل كل ده (زي [[useChat]] في Vercel AI SDK)، بس فهم الـ loop ده هو اللي بيخليك تصلّح لما حاجة تبوظ.`,
            when: "أي واجهة بتعرض رد طويل بيتولّد: شات، وتلخيص، وكتابة. ونفس الطريقة لأي download كبير عايز تعرض تقدّمه.",
            mistakes: R`[[TextDecoder]] لكل حتة لوحدها فالعربي يطلع مكسور في حدود الحتت. و [[setAnswer(answer + value)]] بالقيمة القديمة فالرد يطلع آخر حتة بس. ومفيش إلغاء للطلب القديم لما يسأل تاني، فالردين يتكتبوا فوق بعض. وتعرض «حصل خطأ» لما المستخدم نفسه داس وقّف. وتنسى الإلغاء عند الـ unmount، فالـ state بيتحدث في component مش موجود والطلب مكمّل.`
          },
          lines: [
            "component في المتصفح (فيه state و events).",
            "الـ hooks.",
            "صندوق السؤال.",
            "الرد اللي بيكبر.",
            "فيه طلب شغال؟",
            "الـ AbortController الحالي، في ref عشان ميتعملش render لما يتغير.",
            "لو الـ component اتشال، الغي أي طلب شغال.",
            "بتتنادى مع كل سؤال.",
            "لو فيه سؤال قديم لسه شغال، الغيه.",
            "controller جديد للطلب ده، واحفظه كـ «الحالي».",
            "امسح الرد القديم.",
            "وعلّم إن فيه طلب شغال.",
            "جرّب...",
            "...ابعت السؤال، ومعاه الـ signal عشان الإلغاء.",
            "السيرفر رفض (401 أو 429 مثلًا)؟ اعتبره خطأ.",
            "حوّل البايتات لنص UTF-8 صح (حتى لو الحرف العربي اتقسم بين حتتين)، وخد reader.",
            "لف...",
            "...استنى الحتة الجاية.",
            "السيرفر قفل: خلصنا.",
            "ضيف الحتة للرد (بالشكل الـ function عشان تبني على آخر قيمة).",
            "قفلة الـ loop.",
            "لو حصل أي خطأ...",
            "...ومش المستخدم اللي لغى، قوله.",
            "في الآخر...",
            "...لو الطلب ده لسه الحالي (مش واحد اتلغى عشان جه سؤال جديد)، اقفل الـ busy.",
            "قفلة.",
            "قفلة ask.",
            "الواجهة:",
            "form: خد السؤال من الـ input وابعته.",
            "مكان السؤال بحد أقصى للطول (والسيرفر بيتحقق تاني).",
            "وقت الشغل الزرار «وقّف» بينادي abort، وغير كده «اسأل».",
            "الرد، و pre-wrap عشان السطور الجديدة تبان.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تدوس «وقّف»: الـ [[read()]] بيرمي AbortError، الـ catch بيشوف [[ac.signal.aborted]] true فمش بيعرض خطأ، والـ finally بيقفل الـ busy فالزرار يرجع «اسأل». الرد بيفضل عند آخر كلمة وصلت. وفي الـ Network tab الطلب هيبان «(canceled)».

لما تسأل سؤالين ورا بعض بسرعة: الطلب الأول بيتلغي أول ما التاني يبدأ، و [[setAnswer("")]] بيمسح، فمش هتشوف غير رد التاني. لو شفت كلام الردين متلخبط، يبقى الإلغاء مش شغال (غالبًا الـ signal مش متباصي لـ fetch).

ولو الزرار فضل «وقّف» بعد ما الرد التاني خلص: الشرط [[ctrl.current === ac]] ناقص، والطلب الأول لما اتلغى قفل الـ busy بدري، أو العكس.`
        }
      ]
    },
    {
      t: "WebSockets على أكتر من سيرفر",
      l: 2,
      n: "socket.io شغال على سيرفر واحد. مع اتنين محتاج Redis بينهم، و load balancer بيودّي العميل لنفس السيرفر، وطريقة تكشف الاتصالات الميتة",
      items: [
        {
          cmd: "Redis adapter",
          title: "إشعار يوصل حتى لو المستخدم متصل بسيرفر تاني",
          desc: R`كل سيرفر socket.io عارف الاتصالات اللي عنده بس. لو المستخدم متصل بسيرفر ١، والطلب اللي عمل الإشعار راح لسيرفر ٢، [[io.to("user:42").emit()]] على سيرفر ٢ مش هيلاقي حد.

الـ Redis adapter بيحل ده: كل [[emit]] لـ room بيتنشر في Redis (pub/sub)، وكل السيرفرات مشتركة، وكل واحد بيوصّله للاتصالات اللي عنده. الكود بتاعك نفسه مبيتغيرش.`,
          example: R`import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
const pubClient = createClient({ url: config.REDIS_URL });
const subClient = pubClient.duplicate();
await Promise.all([pubClient.connect(), subClient.connect()]);
export const io = new Server(httpServer, {
  adapter: createAdapter(pubClient, subClient),
  cors: { origin: config.WEB_ORIGIN, credentials: true },
});
io.use(verifySocketToken);
io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt));
export const notify = (userId: string, n: unknown) => io.to($__btuser:$__{userId}$__bt).emit("notification", n);`,
          try: R`شغّل نسختين من السيرفر على بورتين (3001 و 3002) بنفس Redis. وصّل عميل على 3001، ونادي [[notify]] من endpoint تجربة على 3002: لازم الإشعار يوصل. وبعدين شيل الـ adapter وكرر: مش هيوصل. وجرّب [[(await io.in("user:42").fetchSockets()).length]] من 3002.`,
          flag: "script",
          deep: {
            why: "أول ما تشغّل نسختين من الـ API (عشان الضغط، أو عشان deploy من غير downtime)، نص الإشعارات بتضيع بهدوء: بتوصل للي حظه إنه على نفس السيرفر. ومفيش error في أي حتة. الـ adapter بيخلي الـ rooms «موجودة» على مستوى الـ cluster كله.",
            how: R`الـ adapter محتاج اتصالين بـ Redis: واحد بينشر ([[pub]]) وواحد مشترك ([[sub]])، لأن الاتصال اللي بيعمل SUBSCRIBE في Redis مبيقدرش يعمل أوامر تانية. [[duplicate()]] بيعمل اتصال تاني بنفس الإعدادات.

لما تعمل [[io.to(room).emit()]]: السيرفر بيبعت لاتصالاته المحلية في الـ room، وبينشر الرسالة في Redis. السيرفرات التانية بتستقبلها وتبعتها لاتصالاتها في نفس الـ room. [[socket.join]] نفسه محلي (كل سيرفر عارف مين عنده في أنهي room)، والـ adapter بيوزّع الـ broadcasts بس.

وفيه عمليات بتسأل كل السيرفرات: [[io.in(room).fetchSockets()]] بترجع الاتصالات من كل الـ cluster، و [[io.in(room).disconnectSockets()]] بيقفلهم (مفيد في logout)، و [[serverSideEmit]] لرسالة بين السيرفرات نفسها. دي بتستنى رد من كل سيرفر، فمتستخدمهاش في كل request.

Redis pub/sub مبيخزّنش: لو سيرفر كان بيعمل restart لحظة الـ emit، الرسالة دي ضاعت عليه. عشان كده الإشعار بيتحفظ في القاعدة الأول، والـ socket للسرعة بس (زي درس [[socket.io]] في تاب «بناء مشروع كامل»). وفيه adapter تاني مبني على Redis Streams بيقدر يكمّل بعد انقطاع قصير، ومعاه ميزة [[connectionStateRecovery]] في socket.io اللي بترجّع الرسايل اللي فاتت العميل لو فصل ثواني. الـ pub/sub adapter العادي مبيدعمهاش.

ونفس الفكرة لـ SSE أو WebSocket من غير socket.io: كل سيرفر بيعمل SUBSCRIBE على قناة في Redis، وأي publish بيوصل للكل.`,
            when: "أول ما يبقى عندك أكتر من process بيخدم الـ sockets: أكتر من container، أو PM2 cluster mode، أو deploy بيشغّل الجديد جنب القديم.",
            mistakes: R`تستخدم نفس اتصال Redis للـ pub والـ sub. وتفتكر إن الـ adapter لوحده كفاية من غير sticky sessions (الدرس الجاي). وتعتمد على الـ emit كأنه مضمون وتنسى تحفظ في القاعدة. وتنادي [[fetchSockets()]] في كل request فتعمل ضغط على كل السيرفرات. وسؤال انترفيو: «عندك chat app على ٣ سيرفرات، رسالة من يوزر على الأول لازم توصل ليوزر على التالت، إزاي؟»، والإجابة pub/sub مشترك (Redis adapter) و sticky sessions.`
          },
          lines: [
            "سيرفر socket.io.",
            "الـ adapter الرسمي لـ Redis.",
            "عميل Redis الرسمي (node-redis).",
            "اتصال للنشر.",
            "اتصال تاني للاشتراك (الاتصال اللي بيعمل SUBSCRIBE مبيعملش أوامر تانية).",
            "افتح الاتنين قبل ما السيرفر يبدأ.",
            "السيرفر...",
            "...بالـ adapter: أي emit لـ room بيعدّي على Redis لكل السيرفرات.",
            "CORS للواجهة بس.",
            "قفلة.",
            "تحقق من التوكن قبل أي اتصال (زي درس socket.io في «بناء مشروع كامل»).",
            "كل اتصال يدخل room المستخدم بتاعه، على السيرفر اللي هو عليه.",
            "notify من أي سيرفر بتوصل لكل أجهزة المستخدم، على أي سيرفر."
          ],
          sol: R`مع الـ adapter: العميل المتصل على 3001 بيستقبل الإشعار اللي اتبعت من 3002، و [[fetchSockets()]] على 3002 بترجع 1 (الاتصال موجود على السيرفر التاني بس الـ adapter سأله).

من غير الـ adapter: الإشعار مش بيوصل خالص، و [[fetchSockets()]] على 3002 بترجع 0. ومفيش أي error، وده بالظبط اللي بيحصل في الإنتاج لما حد ينسى الـ adapter.

لو العميل مش بيعرف يتصل أصلًا وانت ورا load balancer، دي مشكلة sticky sessions، الدرس الجاي. وعشان تتأكد إن الاتنين شايفين نفس Redis: [[redis-cli PUBSUB CHANNELS]] لازم يطلّع قنوات بتبدأ بـ [[socket.io]].`
        },
        {
          cmd: "sticky sessions",
          title: "خلّي نفس العميل يروح لنفس السيرفر",
          desc: R`socket.io بيبدأ الاتصال بـ HTTP long-polling (كذا طلب ورا بعض) وبعدين يرقّيه لـ WebSocket. الطلبات دي كلها لازم تروح لنفس السيرفر، لأن الـ session بتاعة الاتصال متخزنة في ذاكرته. لو الـ load balancer وزّعها round-robin، التاني هيقول «مين انت؟» ويرد 400.

الحل: sticky sessions، يعني الـ load balancer يودّي نفس العميل لنفس السيرفر (بالـ IP أو بكوكي). والبديل إن العميل يبدأ WebSocket على طول من غير polling.`,
          example: R`upstream api {
    hash $remote_addr consistent;
    server 10.0.0.11:3000;
    server 10.0.0.12:3000;
}
map $http_upgrade $connection_upgrade { default upgrade; "" close; }
server {
    listen 443 ssl;
    server_name api.example.com;
    location /socket.io/ {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_read_timeout 60s;
    }
}`,
          try: R`حط سيرفرين socket.io (بالـ Redis adapter) ورا Nginx مرة بـ [[hash $remote_addr]] ومرة من غيره (round-robin). وصّل عميل بالإعدادات الافتراضية في الحالتين، وشوف الـ transport اللي وصل له ([[socket.io.engine.transport.name]]) أو الـ error.`,
          flag: "script",
          deep: {
            why: "ده أشهر سبب لـ «الـ sockets شغالة على جهازي ووقعت في الإنتاج». على جهازك سيرفر واحد، وفي الإنتاج اتنين ورا load balancer، والـ handshake بيتقسم بينهم.",
            how: R`الـ handshake بتاع socket.io (Engine.IO): أول طلب GET بيرجّع [[sid]] (session id)، وبعدين العميل بيعمل طلبات polling بالـ sid ده، وبيجرّب يفتح WebSocket بيه. السيرفر اللي عمل الـ sid بس هو اللي يعرفه. لو طلب راح لسيرفر تاني: 400 ورسالة [[Session ID unknown]]، وفي العميل [[xhr post error]].

[[hash $remote_addr consistent]] في Nginx بيوزّع حسب IP العميل، و [[consistent]] (ketama) بيخلي إضافة أو شيل سيرفر يحرّك جزء صغير بس من العملاء. [[ip_hash]] قديم وبيشتغل برضه. العيب: كل الناس اللي ورا نفس الـ NAT (شركة أو شبكة موبايل) بيروحوا لنفس السيرفر، والتوزيع بيبقى مش متساوي. ولو فيه Cloudflare أو load balancer قدام Nginx، [[$remote_addr]] هيبقى الـ IP بتاعهم، فلازم الـ IP الحقيقي (تاب «Nginx»، درس [[IP الزائر ورا Cloudflare]]).

في load balancers السحابة (زي AWS ALB) فيه sticky بكوكي، وده أدق من الـ IP.

البديل من غير sticky: [[io(url, { transports: ["websocket"] })]] في العميل. الاتصال طلب واحد بيترقى على طول، فمفيش طلبات تتوزع. العيب إنك خسرت الـ fallback لـ polling لو شبكة ما بتمنع WebSocket (نادر دلوقتي بس بيحصل في شبكات شركات).

الـ Upgrade و Connection headers: Nginx بيشيلهم افتراضيًا، فلازم تمررهم عشان الترقية لـ WebSocket تحصل (تاب «Nginx»، درس [[WebSockets]]). و [[proxy_read_timeout]] لازم يبقى أكبر من الـ ping interval (socket.io بيبعت ping كل ٢٥ ثانية افتراضيًا)، وإلا Nginx يقفل الاتصال الساكت.

sticky sessions مش بديل للـ Redis adapter: الـ sticky بيخلي اتصال عميل واحد يفضل على سيرفر واحد، والـ adapter بيخلي السيرفرات توصّل لبعض. محتاج الاتنين.`,
            when: "أي socket.io ورا أكتر من سيرفر، أو PM2 cluster mode (اللي عنده مكتبة [[@socket.io/sticky]] للحالة دي)، أو أي حاجة بتعمل handshake على كذا طلب.",
            mistakes: R`round-robin عادي وتلوم socket.io. و hash بالـ IP ورا Cloudflare فكل الناس على سيرفر واحد. و [[proxy_read_timeout]] أقل من الـ ping interval فالاتصال يقطع كل شوية. ونسيان headers الـ Upgrade فكل الاتصالات تفضل polling (شغالة بس تقيلة جدًا على السيرفر).`
          },
          lines: [
            "مجموعة السيرفرات اللي بتشغّل الـ API.",
            "sticky: وزّع حسب IP العميل، فنفس العميل دايمًا لنفس السيرفر. و consistent بيقلل اللخبطة لما تضيف سيرفر.",
            "السيرفر الأول.",
            "السيرفر التاني.",
            "قفلة.",
            "لو الطلب فيه Upgrade خلي Connection = upgrade، ولو مفيش = close.",
            "السيرفر.",
            "HTTPS.",
            "الدومين.",
            "مسار socket.io الافتراضي.",
            "ودّيه للمجموعة (بالـ hash).",
            "HTTP/1.1: لازم عشان الترقية لـ WebSocket.",
            "مرر طلب الترقية.",
            "ومعاه Connection.",
            "الـ Host الأصلي.",
            "أكبر من ping socket.io (٢٥ ثانية)، عشان Nginx ميقفلش الاتصال الساكت.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بالـ hash: العميل بيتصل ويترقى، و [[transport.name]] بيطلع [[websocket]].

بالـ round-robin: العميل بيفشل بـ [[connect_error]] ورسالة زي [[xhr post error 400]] (أو [[xhr poll error]])، ولو بصيت على رد السيرفر هتلاقي [[Session ID unknown]]. السبب إن أول طلب polling راح لسيرفر، والتاني راح للتاني اللي مايعرفش الـ sid.

ولو ضفت [[transports: ["websocket"]]] في العميل، هيشتغل حتى مع round-robin، لأن مفيش غير طلب واحد بيتوزع. ده بيأكد إن المشكلة في توزيع طلبات الـ handshake، مش في socket.io نفسه.`
        },
        {
          cmd: "heartbeat و ping",
          title: "اكتشف الاتصال الميت قبل ما يتراكم",
          desc: R`لما موبايل يدخل نفق أو اللابتوب يقفل، الاتصال بيموت من غير ما يبعت «باي». السيرفر شايفه مفتوح، وبيفضل ماسك ذاكرة و file descriptor ليه، وأي رسالة ليه بتروح في الفاضي.

الحل heartbeat: السيرفر يبعت ping كل فترة، ولو مجاش pong قبل الـ ping اللي بعده، يقفل الاتصال بإيده. socket.io بيعمل ده لوحده ([[pingInterval]] و [[pingTimeout]])، ومع مكتبة [[ws]] الخام بتكتبه انت زي المثال.`,
          example: R`import { WebSocketServer, type WebSocket } from "ws";
const wss = new WebSocketServer({ server: httpServer, maxPayload: 64 * 1024 });
const alive = new WeakMap<WebSocket, boolean>();
wss.on("connection", (ws) => {
  alive.set(ws, true);
  ws.on("pong", () => alive.set(ws, true));
  ws.on("error", (err) => log.warn({ err }, "ws error"));
});
const interval = setInterval(() => {
  for (const ws of wss.clients) {
    if (!alive.get(ws)) { ws.terminate(); continue; }
    alive.set(ws, false);
    ws.ping();
  }
}, 30_000);
wss.on("close", () => clearInterval(interval));`,
          try: R`خلي الـ interval ثانية للتجربة. وصّل عميلين بمكتبة [[ws]]: واحد عادي، والتاني بـ [[new WebSocket(url, { autoPong: false })]] (مبيردش على الـ ping، كأنه اتصال ميت). بعد ٣ ثواني اطبع [[wss.clients.size]].`,
          flag: "script",
          deep: {
            why: "TCP لوحده ممكن يفضل «مفتوح» ساعات على اتصال طرفه التاني اختفى، لأن مفيش حد بيبعت حاجة. في سيرفر عليه آلاف المستخدمين على موبايل، الاتصالات الميتة دي بتتراكم لحد ما الذاكرة أو حد الـ file descriptors يخلص.",
            how: R`بروتوكول WebSocket نفسه فيه frames اسمها ping و pong، والمتصفح والمكتبات بيردوا على الـ ping تلقائيًا من غير كود منك. فالسيرفر: كل ٣٠ ثانية بيبعت ping لكل اتصال، وبيعلّمه «مستني رد». لو المرة الجاية لقاه لسه مستني، يبقى ميت، و [[terminate()]] بيقفل الـ socket فورًا من غير ما يستنى handshake الإغلاق (اللي مش هييجي).

الـ WeakMap: بتربط الحالة بالـ socket من غير ما تمنع الـ garbage collector يشيله بعد ما يتقفل. وفيه ناس بيحطوا [[ws.isAlive]] على الـ object نفسه، ودي الطريقة اللي في README مكتبة ws، والاتنين شغالين.

ناحية العميل: المتصفح مش بيقدر يبعت ping frames من JavaScript. فلو العميل محتاج يعرف إن السيرفر مات (مش العكس)، بتبعت رسالة عادية زي [[{"type":"ping"}]] والسيرفر يرد، ولو مجاش رد في وقت معين يقفل ويعيد الاتصال. socket.io بيعمل ده في الاتجاهين، وبيعيد الاتصال لوحده بـ backoff (بيزيد وقت الانتظار بين المحاولات، ومعاه عشوائية عشان آلاف العملاء ميرجعوش في نفس اللحظة بعد restart).

socket.io: [[pingInterval]] (افتراضي ٢٥ ثانية) و [[pingTimeout]] (افتراضي ٢٠ ثانية). اللي بيحدد إمتى الاتصال يعتبر ميت هو مجموعهم تقريبًا. ولازم يبقوا أقل من الـ idle timeout في أي proxy أو load balancer في النص، وإلا الـ proxy هو اللي هيقفل.

[[maxPayload]] حاجة تانية بس مهمة: أقصى حجم رسالة. من غيره أي حد يبعت رسالة ضخمة تاكل الذاكرة.

وبعد الـ reconnect: العميل رجع، بس فاتته رسايل. يا تبعتله اللي فاته من القاعدة (زي Last-Event-ID في SSE)، يا يعمل refetch للبيانات. الـ socket نفسه مش مخزن.`,
            when: "أي سيرفر WebSocket بمكتبة ws أو uWebSockets. ومع socket.io تظبط الأرقام بس بما يناسب الـ proxy اللي قدامك.",
            mistakes: R`مفيش heartbeat خالص، والذاكرة بتكبر ببطء لحد ما السيرفر يقع بعد أسبوع. و [[ws.close()]] بدل [[terminate()]] مع اتصال ميت (بيستنى رد مش هييجي). والـ interval أكبر من timeout الـ proxy. وتنسى [[clearInterval]] لما السيرفر يقفل (في الاختبارات بيعلّق الـ process). وتعيد الاتصال من العميل فورًا من غير backoff، فبعد كل deploy آلاف العملاء بيضربوا السيرفر في نفس الثانية.`
          },
          lines: [
            "مكتبة ws الخام (من غير socket.io).",
            "سيرفر WebSocket على نفس سيرفر HTTP، وأقصى رسالة 64KB.",
            "حالة كل اتصال: رد على آخر ping ولا لأ.",
            "اتصال جديد:",
            "اعتبره حي.",
            "لما يرد pong، علّمه حي تاني.",
            "سجّل أي error بدل ما يوقّع الـ process.",
            "قفلة.",
            "كل ٣٠ ثانية:",
            "لكل اتصال...",
            "...لو مردش على الـ ping اللي فات: ميت، اقفله فورًا وكمّل.",
            "علّمه «مستني رد».",
            "وابعتله ping (المتصفح بيرد pong لوحده).",
            "قفلة.",
            "قفلة.",
            "لو السيرفر اتقفل، وقّف الـ interval."
          ],
          sol: R`بعد ٣ ثواني [[wss.clients.size]] بيطلع 1. العميل اللي بـ [[autoPong: false]] اتقفل عند تاني دورة (الأولى علّمته «مستني»، والتانية لقته لسه مستني فعمل terminate)، وكود الإغلاق عنده 1006 (اتقفل من غير handshake).

لو لقيت الاتنين لسه موجودين: يا الـ pong listener بيعلّم الاتصال حي حتى من غير رد (مثلًا بتعمل [[alive.set(ws, true)]] قبل الـ ping)، يا الـ interval مبيشتغلش. ولو الاتنين اتقفلوا: غالبًا بتعلّم «مستني» بعد الـ ping بدل قبله، أو ناسي الـ pong listener.`,
          solCode: R`const wss = new WebSocketServer({ port: 8080 });
// ... نفس الكود بـ interval ثانية واحدة
const good = new WebSocket("ws://localhost:8080");
const dead = new WebSocket("ws://localhost:8080", { autoPong: false });
setTimeout(() => console.log("clients left:", wss.clients.size), 3500);
// clients left: 1`
        }
      ]
    },
    {
      t: "GraphQL",
      l: 2,
      n: "endpoint واحد والعميل بيطلب الحقول اللي عايزها بالظبط. قوي، بس ليه مشاكل مش موجودة في REST: N+1، والصلاحيات على مستوى الحقل، والاستعلامات العميقة",
      items: [
        {
          cmd: "GraphQL ولا REST",
          title: "إمتى GraphQL يستاهل وإمتى REST أبسط",
          desc: R`في GraphQL فيه endpoint واحد ([[POST /graphql]])، والعميل بيبعت query بيوصف شكل الرد اللي عايزه بالظبط: المنشورات، ومع كل منشور اسم الكاتب، ومن غير أي حقل تاني. والسيرفر عنده schema فيها كل الأنواع والعلاقات.

في REST نفس الشاشة ممكن تحتاج ٣ طلبات ([[/posts]] وبعدين [[/users/:id]] لكل كاتب)، أو endpoint مخصوص للشاشة. GraphQL بيحل ده، بس بياخد منك حاجات REST بيدّيهالك ببلاش: كاش HTTP، و status codes واضحة، وبساطة.`,
          example: R`query FeedPage($first: Int!) {
  posts(first: $first) {
    id
    title
    author {
      name
      avatarUrl
    }
  }
  me {
    name
    unreadCount
  }
}`,
          try: R`خد شاشة من مشروعك بتعمل أكتر من طلب REST، واكتبلها query واحد بالشكل ده. وبعدين عدّ: كام طلب في REST، وكام حقل بيرجع ومش بيتعرض (over-fetching).`,
          flag: "script",
          deep: {
            why: "الموبايل على شبكة بطيئة بيدفع تمن كل طلب زيادة وكل حقل مش محتاجه. ولما عندك عملاء كتير (ويب، وموبايل، وشركاء) كل واحد عايز شكل مختلف من نفس البيانات، إما تعمل endpoint لكل واحد، أو تديهم لغة يطلبوا بيها. GraphQL هو اللغة دي.",
            how: R`الـ query بيتبعت كـ JSON: [[{"query": "...", "variables": {"first": 10}}]]. السيرفر بيتحقق منه مقابل الـ schema قبل ما ينفّذ (حقل مش موجود = error فورًا)، وبعدين ينفّذ resolver لكل حقل. والرد JSON بنفس شكل الـ query بالظبط، جوه [[data]]، ومعاه [[errors]] لو فيه.

الأنواع التلاتة: [[query]] للقراية، و [[mutation]] للكتابة، و [[subscription]] للتحديثات live (غالبًا على WebSocket أو SSE).

اللي بتكسبه: طلب واحد للشاشة، ومفيش over-fetching، و schema typed بيتولّد منها types للعميل (GraphQL Codegen)، وأدوات بتكمّلك الحقول وانت بتكتب، وإضافة حقول من غير versions.

اللي بتخسره: كاش HTTP. كله POST على نفس الـ URL، فالـ CDN والمتصفح مش فاهمين حاجة. الحل كاش في العميل (Apollo Client و urql بيعملوا normalized cache)، أو persisted queries بـ GET. والـ status codes: GraphQL غالبًا بيرجّع 200 حتى مع أخطاء في [[errors]]، والمراقبة لازم تبص جوه الـ body. والأمان والأداء بقوا أصعب: العميل يقدر يطلب query عميق جدًا أو كبير جدًا، وكل حقل ممكن يعمل استعلام للقاعدة (N+1)، والصلاحيات لازم تبقى لكل حقل مش لكل endpoint. الدروس الجاية في الكاتيجوري دي بتحل التلاتة.

فيه بدايل وسط: REST بـ [[?fields=id,title]] و [[?include=author]] (زي JSON:API)، أو BFF لكل عميل (تاب «Next.js»، درس [[BFF]])، أو tRPC لو الفرونت والباك TypeScript في نفس الـ repo (المستوى ٣).`,
            when: "عملاء كتير بأشكال مختلفة، وبيانات فيها علاقات كتير (graph فعلًا)، وفريق فرونت كبير عايز يتحرك من غير ما يستنى الباك. و REST لـ API عام بسيط، أو CRUD، أو لما الكاش على CDN مهم، أو فريق صغير.",
            mistakes: R`تختار GraphQL عشان «أحدث» لمشروع CRUD فيه عميل واحد، فتدفع التعقيد من غير المكسب. وتسيب الـ introspection والـ playground مفتوحين في الإنتاج على API داخلي. وتفتكر إن مفيش versioning خالص: شيل حقل لسه حد بيستخدمه بيكسره برضه، والحل [[@deprecated]] وتتابع مين لسه بيطلبه. وفخ انترفيو: «GraphQL أسرع من REST؟»، مش بالضرورة. بيقلل عدد الطلبات والحجم، بس ممكن يبقى أبطأ على السيرفر من غير DataLoader وكاش.`
          },
          lines: [
            "query ليه اسم (مفيد في الـ logs) وبياخد متغير first نوعه Int إجباري.",
            "هات المنشورات بالعدد ده...",
            "...الـ id...",
            "...والعنوان...",
            "...والكاتب (علاقة: resolver تاني)...",
            "...اسمه...",
            "...وصورته. ومفيش إيميل ولا أي حقل تاني، مطلبتهوش.",
            "قفلة الكاتب.",
            "قفلة المنشورات.",
            "وفي نفس الطلب: المستخدم الحالي...",
            "...اسمه...",
            "...وعدد الإشعارات.",
            "قفلة.",
            "قفلة: ده كله طلب HTTP واحد."
          ],
          sol: R`مثال شائع: صفحة الـ feed في REST بتعمل [[GET /posts]] و [[GET /me]]، وبعدين [[GET /users/:id]] لكل كاتب مش معروف. يعني ١٢ طلب لـ ١٠ منشورات بكتّاب مختلفين، والـ user object فيه ١٥ حقل والشاشة بتعرض ٢. نفس الشاشة بـ GraphQL طلب واحد، والرد فيه الحقول الـ ٧ بالظبط.

بس لاحظ إن الطلبات دي لسه موجودة، بس اتنقلت للسيرفر: الـ resolver بتاع [[author]] هيتنادى ١٠ مرات. ده الـ N+1، ودرس [[DataLoader و N+1]] بيحله. ولو لقيت إن الشاشة أصلًا بتعمل طلب أو اتنين، فـ GraphQL مش هيكسبك كتير هنا.`
        },
        {
          cmd: "schema و resolvers",
          title: "اعمل سيرفر GraphQL بـ Yoga جوه Express",
          desc: R`الـ schema بتكتبها بلغة SDL: الأنواع وحقولها، و [[Query]] و [[Mutation]] كنقط دخول. والـ resolvers دوال: لكل حقل محتاج منطق، دالة بترجّع قيمته. كل resolver بياخد ٤ حاجات: الـ parent (الـ object اللي فوقه)، والـ args، والـ context (مشترك للطلب كله: المستخدم، والقاعدة)، و info.

GraphQL Yoga سيرفر خفيف مبني على Web APIs، ويتركّب جوه Express أو Next أو لوحده. و Apollo Server بديل مشهور بنفس الفكرة.`,
          example: R`import { createYoga, createSchema } from "graphql-yoga";
const typeDefs = /* GraphQL */ $__bt
  type User { id: ID! name: String! email: String posts: [Post!]! }
  type Post { id: ID! title: String! author: User! }
  type Query { posts(first: Int = 10): [Post!]! me: User }
  type Mutation { createPost(title: String!): Post! }
$__bt;
const resolvers = {
  Query: {
    posts: (_parent, args: { first: number }) => db.post.findMany({ take: Math.min(args.first, 50), orderBy: { id: "desc" } }),
    me: (_parent, _args, ctx: Ctx) => ctx.user,
  },
  Post: { author: (post, _args, ctx: Ctx) => ctx.loaders.user.load(post.authorId) },
  User: { posts: (user) => db.post.findMany({ where: { authorId: user.id }, take: 20 }) },
  Mutation: { createPost: (_p, args: { title: string }, ctx: Ctx) => db.post.create({ data: { title: args.title, authorId: requireUser(ctx).id } }) },
};
export const yoga = createYoga<{ req: express.Request }>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/graphql",
  graphiql: process.env.NODE_ENV !== "production",
  context: async ({ req }) => ({ user: await userFromRequest(req), loaders: makeLoaders() }),
});
app.use(yoga.graphqlEndpoint, yoga);`,
          try: R`سطّب [[npm i graphql@16 graphql-yoga]]، واعمل السيرفر ده بـ array في الذاكرة بدل db. افتح [[localhost:3000/graphql]] (GraphiQL) واكتب query للمنشورات مع اسم الكاتب. وبعدين اطلب حقل مش موجود زي [[posts { price }]] وشوف الخطأ، وابعت نفس الـ query بـ [[curl -X POST localhost:3000/graphql -H 'content-type: application/json' -d '{"query":"{ posts { title } }"}']].`,
          flag: "script",
          deep: {
            why: "الـ schema هي العقد بين الفرونت والباك، زي OpenAPI بالظبط بس جوه السيرفر نفسه. والـ resolvers بتخليك تفكّر في كل حقل لوحده: مين بيجيبه، ومين مسموحله يشوفه، وبيكلّف كام.",
            how: R`SDL: [[!]] يعني مش null. [[[Post!]!]] يعني list مش null، وكل عنصر فيها مش null. [[ID]] نص بيمثل id. والـ args بقيم افتراضية زي [[first: Int = 10]].

إزاي التنفيذ بيمشي: GraphQL بيبدأ من [[Query.posts]]، وياخد النتيجة (array منشورات)، ولكل منشور ولكل حقل مطلوب يدوّر على resolver. لو مفيش resolver للحقل (زي [[title]])، بياخد [[post.title]] من الـ object على طول (default resolver). عشان كده بتكتب resolvers بس للحقول اللي محتاجة منطق: علاقات، أو حقول محسوبة، أو صلاحيات.

الـ context: بيتعمل مرة لكل طلب. فيه المستخدم (من الكوكي أو التوكن) والـ loaders (الدرس الجاي). ولازم يتعمل جديد لكل طلب، مش global، وإلا بيانات مستخدم تتسرب لطلب تاني.

[[createYoga]] بيرجّع handler بيفهم Express و Node و Fetch API. [[graphqlEndpoint]] لازم يبقى نفس المسار اللي ركّبته عليه. و [[graphiql]] صفحة تجرّب منها الـ queries، مقفولة في الإنتاج هنا.

نسخة graphql: مكتبة [[graphql]] نزلت منها 17، بس plugins كتير (منها اللي في درس الـ auth) لسه بتطلب 16، واتنين نسخ من graphql في نفس المشروع بيعملوا أخطاء غريبة. عشان كده [[graphql@16]] دلوقتي، وراجع الـ peerDependencies قبل ما ترقّي.

Apollo Server: نفس الـ typeDefs والـ resolvers بالظبط، والفرق في طريقة التركيب ([[expressMiddleware]]) والـ plugins. والـ resolvers مش مربوطة بالسيرفر، فالنقل بينهم سهل.

وفيه طريقة تانية: code-first (زي Pothos) بتكتب الـ schema بـ TypeScript والـ SDL بيتولّد منها، فالأنواع في الـ resolvers مضبوطة لوحدها.`,
            when: "لما قررت GraphQL (الدرس اللي فات). وخلّي الـ resolvers رفيعة: بتنادي services، زي الـ controllers في REST.",
            mistakes: R`context واحد global لكل الطلبات. و [[take]] من غير حد في resolvers القوايم (العميل يطلب [[first: 100000]]). ومنطق الـ business كله جوه الـ resolvers فمتقدرش تستخدمه من REST أو job. وترجّع أخطاء القاعدة كما هي في [[errors]] (Yoga بيخفيها افتراضيًا في الإنتاج ويبعت «Unexpected error»، إلا لو رميت [[GraphQLError]] بنفسك).`
          },
          lines: [
            "السيرفر ودالة بناء الـ schema.",
            "الـ schema بـ SDL (التعليق بيخلي المحرر يلوّنها).",
            "المستخدم: الإيميل ممكن يبقى null (هنخفيه عن الغريب في درس الـ auth).",
            "المنشور وكاتبه.",
            "نقط الدخول للقراية: المنشورات (افتراضي ١٠)، والمستخدم الحالي.",
            "نقطة دخول للكتابة.",
            "قفلة الـ SDL.",
            "الـ resolvers بنفس شكل الـ schema.",
            "القراية:",
            "المنشورات بحد أقصى ٥٠ مهما طلب العميل.",
            "المستخدم الحالي من الـ context.",
            "قفلة.",
            "كاتب المنشور: من الـ loader مش استعلام لكل منشور (الدرس الجاي).",
            "منشورات المستخدم بحد.",
            "إنشاء منشور: لازم يكون مسجّل، والكاتب هو المستخدم الحالي مش حاجة جاية من الـ args.",
            "قفلة.",
            "اعمل السيرفر.",
            "الـ schema من الأنواع والـ resolvers.",
            "المسار.",
            "GraphiQL في التطوير بس.",
            "context جديد لكل طلب: المستخدم و loaders جديدة.",
            "قفلة.",
            "ركّبه في Express."
          ],
          sol: R`الـ query [[{ posts(first: 2) { title author { name } } }]] بيرجّع [[{"data":{"posts":[{"title":"...","author":{"name":"..."}}, ...]}}]]: نفس شكل الـ query بالظبط.

طلب حقل مش موجود بيرجّع قبل أي تنفيذ، ومن غير ما أي resolver يشتغل: [[{"errors":[{"message":"Cannot query field \"price\" on type \"Post\".","extensions":{"code":"GRAPHQL_VALIDATION_FAILED"}}]}]]. ولاحظ إن الـ status بيفضل 200 مع curl العادي: GraphQL over HTTP بيرجّع 200 مع [[application/json]]، و 4xx بس لو العميل طلب [[Accept: application/graphql-response+json]]. عشان كده المراقبة لازم تبص على [[errors]] جوه الـ body.

لو شفت [[Unexpected error]] أو خطأ فيه [[Cannot use GraphQLSchema from another module or realm]]، غالبًا عندك نسختين من [[graphql]] (شغّل [[npm ls graphql]]). ولو [[author]] رجع null مع [[!]]، الخطأ بيطلع في [[errors]] والمنشور كله بيبقى null: GraphQL بيطلّع الـ null لأقرب حقل يقبل null.`
        },
        {
          cmd: "DataLoader و N+1",
          title: "اجمع استعلامات الـ resolvers في استعلام واحد",
          desc: R`لو طلبت ٥٠ منشور ومع كل واحد الكاتب، resolver الـ [[author]] بيتنادى ٥٠ مرة، وكل مرة استعلام: ٥١ استعلام لطلب واحد. ده الـ N+1.

DataLoader بيحل ده: كل [[load(id)]] في نفس الـ tick بيتجمّع، وفي الآخر بيتنادى batch function واحدة بكل الـ ids، يعني استعلام واحد [[WHERE id IN (...)]]. وكمان بيعمل كاش للطلب: نفس الـ id مرتين = مرة واحدة.`,
          example: R`import DataLoader from "dataloader";
export function makeLoaders() {
  return {
    user: new DataLoader<string, User>(async (ids) => {
      const rows = await db.user.findMany({ where: { id: { in: [...ids] } } });
      const byId = new Map(rows.map((u) => [u.id, u]));
      return ids.map((id) => byId.get(id) ?? new Error($__btUser $__{id} not found$__bt));
    }),
    postsByAuthor: new DataLoader<string, Post[]>(async (authorIds) => {
      const rows = await db.post.findMany({ where: { authorId: { in: [...authorIds] } }, orderBy: { id: "desc" } });
      return authorIds.map((id) => rows.filter((p) => p.authorId === id));
    }),
  };
}`,
          try: R`عدّ الاستعلامات: زوّد عداد في كل نداء للقاعدة (أو شغّل Prisma بـ [[log: ["query"]]]). اطلب [[{ posts(first: 50) { title author { name } } }]] مرة والـ author resolver بيعمل [[db.user.findUnique]] مباشرة، ومرة بالـ loader. قارن العددين.`,
          flag: "script",
          deep: {
            why: "الـ N+1 هو أشهر مشكلة أداء في GraphQL، ومبيبانش في التطوير: ١٠ منشورات = ١١ استعلام سريعين على جهازك. في الإنتاج ١٠٠ منشور وكل واحد فيه تعليقات وكل تعليق ليه كاتب، والطلب الواحد بقى آلاف الاستعلامات.",
            how: R`DataLoader بيستغل طريقة شغل الـ event loop. الـ resolvers بتاعة الـ ٥٠ منشور بتتنادى ورا بعض في نفس الدورة، وكل واحد بيعمل [[load(id)]] ويرجّع Promise. DataLoader بيستنى لآخر الدورة الحالية، وبعدين ينادي الـ batch function مرة واحدة بكل الـ ids.

قاعدتين للـ batch function: ترجّع array بنفس طول الـ ids، وبنفس ترتيبهم. القاعدة مش بترجّع الصفوف بترتيب [[IN]]، وممكن متلاقيش بعضها. عشان كده الـ Map والـ [[ids.map]]. ولو id مش موجود، رجّع Error في مكانه (أو null لو الحقل بيقبل null)، مش تشيله من الـ array، وإلا كل النتايج اللي بعده هتتزحلق لـ ids غلط.

الكاش: DataLoader بيحفظ كل Promise بالـ id، فنفس الكاتب لـ ٢٠ منشور = id واحد في الاستعلام. والكاش ده لازم يعيش طول الطلب بس. عشان كده [[makeLoaders()]] بتتنادى في الـ context لكل طلب. لو عملته global، مستخدم هيشوف بيانات قديمة، أو بيانات اتجابت بصلاحيات مستخدم تاني.

علاقة one-to-many ([[postsByAuthor]]): الـ batch بيجيب كل منشورات كل الكتّاب في استعلام، ويقسّمها. خلي بالك: [[take]] هنا بيبقى على المجموع مش لكل كاتب، فلو محتاج «آخر ٥ لكل كاتب» محتاج SQL أذكى (window function أو LATERAL).

إزاي تعرف إن عندك N+1؟ شغّل log الاستعلامات وعدّها لكل طلب GraphQL، أو tracing (OpenTelemetry) بيوريك الاستعلامات تحت كل طلب. وفيه أدوات بتعمل تحذير لو عدد الاستعلامات عدّى حد.

ونفس المشكلة موجودة في REST برضه: loop بيعمل استعلام لكل عنصر (تاب «بناء مشروع كامل»، درس [[indexes و N+1]]). بس GraphQL بيخليها الوضع الافتراضي لو مخدتش بالك.`,
            when: "أي resolver لعلاقة (كاتب، أو تعليقات، أو منتج في طلب) بيتنادى جوه قايمة. عمليًا: أي resolver بيعمل [[findUnique]] بـ id جاي من الـ parent.",
            mistakes: R`loader global بكاش بيعيش للأبد. والـ batch function بترجّع الصفوف بترتيب القاعدة مش بترتيب الـ ids (bug بيطلّع كاتب غلط لمنشور، ومبيبانش غير لما الترتيب يختلف). وتشيل الـ ids اللي ملهاش صفوف فالطول يختلف و DataLoader يرمي error. و [[await]] جوه loop في resolver واحد ([[for (const id of ids) await loader.load(id)]]) فكل load في دورة لوحدها ومفيش تجميع: استخدم [[loader.loadMany(ids)]] أو [[Promise.all]].`
          },
          lines: [
            "المكتبة.",
            "بتتنادى لكل طلب في الـ context، فالكاش بيعيش طول الطلب ده بس.",
            "الـ loaders:",
            "loader للمستخدمين بالـ id. الدالة دي بتتنادى مرة واحدة بكل الـ ids اللي اتطلبت في نفس الدورة.",
            "استعلام واحد: WHERE id IN (...).",
            "Map بالـ id عشان نرتّب.",
            "رجّع بنفس ترتيب وطول الـ ids، و Error مكان أي id ملوش صف.",
            "قفلة.",
            "loader لعلاقة one-to-many: منشورات كل كاتب.",
            "استعلام واحد لكل الكتّاب.",
            "قسّمهم: لكل كاتب array بمنشوراته (ممكن تبقى فاضية).",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لـ ٥٠ منشور بين ١٠ كتّاب: من غير loader العداد بيطلع ٥١ (استعلام للمنشورات و ٥٠ للكتّاب، حتى لو الكاتب متكرر). بالـ loader بيطلع ٢: المنشورات، واستعلام [[IN]] واحد فيه ١٠ ids بس (الكاش شال التكرار).

لو لقيته لسه كبير بالـ loader: يا الـ loader بيتعمل جوه الـ resolver نفسه (كل نداء loader جديد، فمفيش تجميع)، يا فيه [[await]] جوه loop. ولو ظهر كاتب غلط على منشور: الـ batch function بترجّع [[rows]] بترتيب القاعدة بدل [[ids.map]].`
        },
        {
          cmd: "auth في resolvers",
          title: "مين يشوف أنهي حقل، وحد للاستعلامات العميقة",
          desc: R`في REST بتحمي endpoint. في GraphQL فيه endpoint واحد، والبيانات نفسها بتتوصل من طرق كتير: الإيميل ممكن يوصله من [[me]] أو من [[post.author]] أو من [[comment.author]]. فالصلاحية لازم تبقى على الحقل أو النوع نفسه، مش على الـ query.

وكمان العميل ممكن يكتب query متداخل ١٠ مستويات (منشور، كاتبه، منشوراته، كاتبها...) يوقّع السيرفر. الحل حد أقصى للعمق والحجم.`,
          example: R`import { createYoga, createGraphQLError } from "graphql-yoga";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";
export function requireUser(ctx: Ctx) {
  if (!ctx.user) throw createGraphQLError("Login required", { extensions: { code: "UNAUTHENTICATED", http: { status: 401 } } });
  return ctx.user;
}
const resolvers = {
  User: {
    email: (user: User, _a: unknown, ctx: Ctx) => (ctx.user?.id === user.id || ctx.user?.role === "admin" ? user.email : null),
  },
  Mutation: {
    deletePost: async (_p: unknown, args: { id: string }, ctx: Ctx) => {
      const me = requireUser(ctx);
      const { count } = await db.post.deleteMany({ where: { id: args.id, ...(me.role === "admin" ? {} : { authorId: me.id }) } });
      if (count === 0) throw createGraphQLError("Post not found", { extensions: { code: "NOT_FOUND" } });
      return true;
    },
  },
};
export const yoga = createYoga({ schema, context, plugins: [maxDepthPlugin({ n: 6 })], graphiql: false });`,
          try: R`اطلب [[{ posts { author { name email } } }]] من غير توكن، وبتوكن الكاتب نفسه، وبتوكن admin: الإيميل يظهر في الحالتين الأخيرتين بس. وبعدين ابعت query عمقه ٧ ([[posts { author { posts { author { posts { author { name } } } } } }]]) وشوف الرد.`,
          flag: "script",
          deep: {
            why: "BOPLA (تاب APIs المستوى ١، درس [[OWASP API Top 10]]) أسهل بكتير في GraphQL: حد يكتشف إن [[author]] بيرجّع [[email]] و [[phone]]، ويلف على كل المنشورات ويجمع بيانات كل الكتّاب. والـ introspection بيوريله كل الحقول الموجودة. والاستعلام العميق هجوم DoS بسطر واحد.",
            how: R`المستخدم بيتعرف مرة في الـ context (من الكوكي أو التوكن)، وكل resolver يقرر بنفسه. [[requireUser]] helper بيرمي لو مش مسجّل. [[createGraphQLError]] بيعمل خطأ بـ [[extensions.code]] العميل يقدر يتعامل معاه (UNAUTHENTICATED يروح لـ login، و FORBIDDEN يعرض رسالة). و [[http.status]] في الـ extensions بيخلي Yoga يرجّع 401 بدل 200.

صلاحية على الحقل ([[User.email]]): الـ resolver بيرجّع null للغريب. ده ليه الحقل في الـ schema [[String]] مش [[String!]]، عشان null مسموح. البديل إنك ترمي error، بس ده بيبوّظ باقي الرد لو الحقل مش بيقبل null.

صلاحية في الـ mutation: شرط الملكية جوه الاستعلام نفسه، زي REST بالظبط (BOLA). والـ admin استثناء واضح.

لو القواعد كترت، فيه مكتبات بتحطها في مكان واحد (graphql-shield)، أو directives في الـ schema زي [[@auth(requires: ADMIN)]]. المهم إنها تبقى على مستوى الحقل والنوع.

حدود الاستعلام: [[maxDepthPlugin]] بيرفض أي query أعمق من الحد قبل التنفيذ. وفيه plugins تانية من نفس المجموعة (GraphQL Armor): حد لعدد الحقول، وحد لعدد الـ aliases (العميل ممكن يطلب نفس الحقل ١٠٠٠ مرة بأسماء مختلفة في طلب واحد)، و cost limit بيدّي كل حقل «تكلفة» ويرفض لو المجموع عدّى. ومع الحدود دي: حد لـ [[first]] في كل قايمة، و rate limit على الـ endpoint، و timeout.

الـ introspection: بيوري الـ schema كلها لأي حد. في API داخلي (الفرونت بتاعك بس) اقفله في الإنتاج. وأقوى حماية هنا persisted queries: السيرفر بيقبل بس queries اتسجلت وقت الـ build، فمحدش يقدر يبعت query مكتوب بإيده.`,
            when: "من أول resolver بيرجّع بيانات مستخدم. والحدود من أول ما الـ endpoint يبقى على الإنترنت.",
            mistakes: R`تحمي [[Query.me]] وتنسى إن نفس الـ User بيوصل من [[post.author]] من غير حماية. والصلاحية في directive على الـ Query بس، والحقول المتداخلة مكشوفة. ورسايل خطأ بتفرّق بين «مش موجود» و «مش بتاعك». و introspection و GraphiQL مفتوحين في الإنتاج. ومفيش أي حد للعمق أو الحجم، أو حد للعمق بس والـ aliases مفتوحة.`
          },
          lines: [
            "السيرفر، و helper لأخطاء GraphQL بكود ومعلومات زيادة.",
            "plugin بيرفض الـ queries العميقة (من GraphQL Armor).",
            "helper: لازم يكون مسجّل.",
            "مش مسجّل؟ خطأ بكود UNAUTHENTICATED و HTTP 401.",
            "رجّع المستخدم.",
            "قفلة.",
            "الـ resolvers:",
            "على نوع User، في أي مكان يظهر فيه:",
            "الإيميل لصاحبه أو للأدمن بس، وغير كده null. الحماية على الحقل مش على الـ query.",
            "قفلة.",
            "الكتابة:",
            "مسح منشور:",
            "لازم مسجّل.",
            "امسح بشرط الملكية جوه الاستعلام (الأدمن يمسح أي حاجة).",
            "مش موجود أو مش بتاعه: نفس الرد في الحالتين.",
            "تم.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "السيرفر: حد أقصى للعمق ٦، ومن غير GraphiQL في الإنتاج."
          ],
          sol: R`من غير توكن: كل [[email]] بـ [[null]]. بتوكن الكاتب: الإيميل بتاعه بس اللي يظهر، والباقي null. بتوكن admin: كلهم يظهروا.

الـ query العميق بيرجّع من غير أي تنفيذ: [[{"errors":[{"message":"Syntax Error: Query depth limit of 6 exceeded, found 7."}]}]]. لو شفت [[Unexpected error]] بدل الرسالة دي، غالبًا الـ plugin شغال بنسخة graphql مختلفة عن Yoga ([[npm ls graphql]] هيوريك نسختين)، وده اللي حصل معانا مع graphql 17: الـ plugin لسه بيطلب 16.

وجرّب [[deletePost]] على منشور حد تاني بتوكن مستخدم عادي: لازم [[NOT_FOUND]]، مش [[FORBIDDEN]].`
        }
      ]
    }
]);
