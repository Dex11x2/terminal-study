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
          teach: R`## الفكرة: ملف بيوصف الـ API من غير ما يشغّله

المثال مش كود بيتنفّذ. ده ملف YAML بيقول: فيه endpoint اسمه [[GET /orders/{id}]]، بياخد id في المسار، وبيرجّع واحد من ردّين: Order لو لقاه، أو Problem لو ملقاهوش. أي أداة بتفهم OpenAPI تقدر تقرا الملف ده وتعمل منه docs أو types أو SDK.

اتجرّب على ويندوز 11: Node 24.19، و [[@redocly/cli]] 2.60 متسطبة local في فولدر تجربة، ومكتبة [[yaml]] 2.9 عشان نشوف الملف بعد ما يتقري.

---

## ١. شكل YAML المضغوط: [[{ }]] و [[[ ]]]

المثال مكتوب بشكل مضغوط عشان يبقى قصير. في YAML فيه طريقتين تكتب بيهم نفس الحاجة:

~~~text نفس المعنى بطريقتين
info: { title: Orders API, version: 1.4.0 }

info:
  title: Orders API
  version: 1.4.0
~~~

- [[{ a: 1, b: 2 }]] = object (في YAML اسمه mapping).
- [[[ x, y ]]] = array (في YAML اسمه sequence).
- والمسافات في أول السطر (الـ indentation) هي اللي بتقول مين جوه مين. لازم مسافات، مش Tab.

ولما مكتبة [[yaml]] بتقرا السطر التاني في المثال، بيطلع JSON عادي:

~~~text الناتج (JSON.stringify للـ info)
{"title":"Orders API","version":"1.4.0"}
~~~

لاحظ إن [["1.4.0"]] طلعت نص. لو كتبت [[version: 1.4]] هتطلع **رقم** [[1.4]]، والـ lint بيرفضها:

~~~text الناتج (redocly lint)
2:37  error    struct    Expected type $__btstring$__bt but got $__btnumber$__bt.
~~~

---

## ٢. أول ٣ سطور: مين وفين

~~~yaml
openapi: 3.1.1
info: { title: Orders API, version: 1.4.0 }
servers: [{ url: "https://api.example.com/v1" }]
~~~

| السطر | معناه |
|---|---|
| [[openapi: 3.1.1]] | نسخة **المواصفة** نفسها. الأدوات بتشوفها عشان تعرف تقرا الملف إزاي |
| [[info.title]] | اسم الـ API اللي هيظهر فوق في صفحة الـ docs |
| [[info.version]] | نسخة **العقد بتاعك** انت. بتزوّدها لما تغيّر في الـ API، ومالهاش علاقة بـ 3.1.1 |
| [[servers]] | array بالعناوين الأساسية. كل مسار تحت بيتلزق في آخرها: [[https://api.example.com/v1/orders/9001]] |

---

## ٣. [[paths]]: المسار والـ method

~~~yaml
paths:
  /orders/{id}:
    get:
      operationId: getOrder
~~~

- [[paths]] object كل key فيه مسار.
- [[{id}]] بين أقواس معناها «حتة متغيرة في المسار» (path parameter). [[/orders/9001]] و [[/orders/abc]] الاتنين بيطابقوا.
- تحت المسار، كل key هو HTTP method بحروف صغيرة: [[get]] و [[post]] و [[patch]]...
- [[operationId]] اسم فريد للعملية في الملف كله. مولّدات الـ SDK بتعمل منه اسم الدالة: [[api.getOrder("9001")]].

### الـ parameters

~~~yaml
      parameters: [{ name: id, in: path, required: true, schema: { type: string } }]
~~~

array فيها parameter واحد. بعد القراية:

~~~text الناتج
[{"name":"id","in":"path","required":true,"schema":{"type":"string"}}]
~~~

| الحقل | معناه |
|---|---|
| [[name: id]] | لازم يطابق الاسم اللي بين [[{ }]] في المسار |
| [[in: path]] | جاي منين: [[path]] أو [[query]] (بعد [[?]]) أو [[header]] أو [[cookie]] |
| [[required: true]] | إجباري. ومع [[in: path]] المواصفة بتطلبه [[true]] دايمًا |
| [[schema: { type: string }]] | نوعه، بلغة JSON Schema |

---

## ٤. [[responses]]: كل رد ممكن

~~~yaml
      responses:
        "200": { description: OK, content: { application/json: { schema: { $ref: "#/components/schemas/Order" } } } }
~~~

السطر ده متداخل ٥ مرات. نفكّه من برا لجوه:

1. [["200"]]: الـ status. بين علامات تنصيص لأن المواصفة طالبة كده، عشان الـ key يفضل نص في YAML و JSON. (redocly قبله من غير تنصيص في التجربة، بس متعتمدش على ده.)
2. [[description: OK]]: وصف إجباري لكل رد.
3. [[content]]: الـ body، متقسم حسب الـ Content-Type.
4. [[application/json]]: لما الرد JSON...
5. [[schema: { $ref: ... }]]: ...شكله هو اللي متعرّف في المكان ده.

### [[$ref]] والـ [[#]]

[[$ref]] يعني reference، «الشكل موجود في حتة تانية». و [["#/components/schemas/Order"]] عنوان جوه نفس الملف: [[#]] = أول الملف، وبعدها المسار key ورا key.

علامات التنصيص هنا **لازمة**: في YAML الـ [[#]] بعد مسافة بيبدأ تعليق. جرّبنا نشيلها، والملف بقى مش YAML صحيح أصلًا:

~~~text الناتج (redocly lint)
- deficient indentation in "...\w.yaml" (11:9)
~~~

### رد الـ 404

~~~yaml
        "404": { description: Not found, content: { application/problem+json: { schema: { $ref: "#/components/schemas/Problem" } } } }
~~~

نفس الشكل، بس الـ Content-Type [[application/problem+json]]: شكل الأخطاء الموحّد بتاع RFC 9457 (درس [[problem+json]]). كده العميل عارف شكل الخطأ قبل ما يحصل.

---

## ٥. [[components]]: الأشكال المشتركة

~~~yaml
components:
  schemas:
    Order: { type: object, required: [id, status], properties: { id: { type: string }, status: { type: string, enum: [pending, paid, shipped] } } }
    Problem: { type: object, properties: { title: { type: string }, status: { type: integer }, detail: { type: string } } }
~~~

- [[type: object]]: الـ JSON ده object.
- [[required: [id, status]]]: الحقلين دول لازم يبقوا موجودين في الرد.
- [[properties]]: الحقول وأنواعها.
- [[enum: [pending, paid, shipped]]]: الـ status واحدة من التلاتة دول بس. مولّد الـ types بيعملها [[ "pending" | "paid" | "shipped" ]].
- [[Problem]] مفيهوش [[required]]، فكل حقوله اختيارية.

ده JSON Schema عادي. من 3.1 OpenAPI بقت متوافقة معاه بالكامل، فنفس الـ schema ينفع لـ validation في أي حتة.

---

## ٦. الفحص: [[redocly lint]]

~~~bash
npx redocly lint openapi.yaml --format=stylish
~~~

- [[npx]]: شغّل أداة من [[node_modules]] (أو نزّلها مؤقتًا لو مش موجودة).
- [[lint]]: افحص الملف بقواعد. من غير ملف config بيستخدم مجموعة [[recommended]].
- [[--format=stylish]]: سطر لكل مشكلة بدل الشكل الطويل اللي بيعرض الكود حوالين كل مشكلة.

~~~text الناتج على المثال زي ما هو
openapi.yaml:
  6:5   error    operation-summary      Operation object should contain $__btsummary$__bt field.
  6:5   error    security-defined       Every operation should have security defined on it or on the root level.
  2:1   warning  info-license           Info object should contain $__btlicense$__bt field.
  3:18  warning  no-server-example.com  Server $__bturl$__bt should not point to example.com or localhost.

❌ Validation failed with 2 errors and 2 warnings.
~~~

اقرا كل سطر كده: [[6:5]] السطر والعمود، وبعدين درجة المشكلة، وبعدين اسم القاعدة، وبعدين الشرح. الملف **صحيح** كـ OpenAPI، بس القواعد دي بتفحص الجودة: عملية من غير [[summary]]، ومفيش أي [[security]].

وبعد ما ظبطناه (الحل اللي تحت: [[summary]] لكل عملية، و [[securitySchemes]] و [[security]]، و [[license]]):

~~~text الناتج
sol.yaml:
  6:18  warning  no-server-example.com  Server $__bturl$__bt should not point to example.com or localhost.

Woohoo! Your API description is valid. 🎉
You have 1 warning.
~~~

ولما غلطنا في اسم [[$ref]] ([[NewOrdr]] بدل [[NewOrder]]):

~~~text الناتج
  15:48  error    no-unresolved-refs     Can't resolve $ref
  35:5   warning  no-unused-components   Component: "NewOrder" is never used.
~~~

خطأين بيكمّلوا بعض: الـ ref بيشاور على حاجة مش موجودة، والحاجة الموجودة محدش بيشاور عليها.

---

## الخلاصة

| الجزء | بيعمل إيه |
|---|---|
| [[openapi]] / [[info]] / [[servers]] | نسخة المواصفة، واسم ونسخة الـ API بتاعك، والعنوان الأساسي |
| [[paths]] → method → [[operationId]] | كل endpoint واسم العملية |
| [[parameters]] | منين ([[in]]) وإجباري ولا لأ ونوعه |
| [[responses]] → status → [[content]] → Content-Type → [[schema]] | شكل كل رد، والأخطاء كمان |
| [[components.schemas]] + [[$ref]] | الأشكال المشتركة بتتكتب مرة وتتشاور عليها |

- [[{ }]] = object و [[[ ]]] = array في YAML المضغوط.
- [[$ref]] لازم بين علامات تنصيص بسبب الـ [[#]].
- [[info.version]] نسختك انت، ونص مش رقم.
- [[redocly lint]] في CI بيمسك الـ refs المكسورة والحاجات الناقصة قبل الـ merge.`,
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
          sol: R`لو فحصت المثال زي ما هو بـ [[@redocly/cli]] (جربناها على 2.60)، هتاخد [[Validation failed with 2 errors and 2 warnings]] من الـ config الافتراضي (recommended): الـ errors هما [[operation-summary]] (العملية ناقصها [[summary]]) و [[security-defined]] (مفيش security على العملية ولا على مستوى الملف). والـ warnings: [[info-license]] و [[no-server-example.com]]. ده طبيعي: الـ lint بيفحص جودة، مش بس إن الملف صحيح.

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
          teach: R`## الفكرة: ملف واحد، وحاجتين بيتولّدوا منه

المثال نصّين: نص السيرفر (أول ٦ سطور) بيقرا [[openapi.yaml]] من الدرس اللي فات ويعرضه كصفحة docs تفاعلية. ونص الفرونت (آخر ٦ سطور) بيستخدم types متولّدة من نفس الملف، فأي غلطة في المسار أو الـ params بتطلع وقت الكتابة.

اتجرّب على ويندوز 11: Node 24.19، و Express 5.2.1، و swagger-ui-express 5.0.1، و yaml 2.9.1، و openapi-typescript 7.13.0 مع TypeScript 5.9.3، و openapi-fetch 0.17.0. السيرفر على بورت ٦٠٠٥ (المثال مكتوب بـ 3000، والفرق في الرقم بس)، وفيه route حقيقي [[GET /v1/orders/:id]] بيرجّع order رقم 9001 أو Problem بـ 404. وصفحة الـ docs اتفتحت في Chrome headless عن طريق playwright-core.

---

## ١. السيرفر: الـ imports

~~~ts
import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import { readFileSync } from "node:fs";
~~~

- [[swagger-ui-express]]: بيقدّم صفحة Swagger UI (HTML و JS و CSS جاهزين) جوه Express.
- [[{ parse }]] من [[yaml]]: الأقواس دي معناها «هات الدالة اللي اسمها parse بس من المكتبة». بتحوّل نص YAML لـ object.
- [[node:fs]]: مكتبة الملفات اللي جاية مع Node. البادئة [[node:]] بتأكد إنها الـ built-in مش package بنفس الاسم.

## ٢. اقرا العقد مرة واحدة

~~~ts
const spec = parse(readFileSync("openapi.yaml", "utf8"));
~~~

من جوه لبرة: [[readFileSync("openapi.yaml", "utf8")]] بيقرا الملف كنص ([[utf8]] بيقول «رجّعه string مش bytes»)، وبعدين [[parse]] بيحوّله object. ده بيحصل مرة وقت تشغيل السيرفر، مش مع كل طلب. والمسار نسبي للفولدر اللي شغّلت منه السيرفر.

## ٣. اعرضه JSON

~~~ts
app.get("/openapi.json", (_req, res) => res.json(spec));
~~~

الـ [[_]] قبل [[req]] اتفاق معناه «البارامتر ده مش مستخدم». والـ route ده عشان الأدوات (زي openapi-typescript) تسحب العقد من URL.

~~~bash
curl -s localhost:6005/openapi.json
~~~

~~~text الناتج (أول الرد)
{"openapi":"3.1.1","info":{"title":"Orders API","version":"1.4.0"},"servers":[{"url":"http://localhost:6005/v1","description":"Local"},...
~~~

## ٤. صفحة الـ docs

~~~ts
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
~~~

[[app.use]] بياخد مسار وبعده كذا middleware بيتنفّذوا بالترتيب:

| الحتة | بتعمل إيه |
|---|---|
| [[swaggerUi.serve]] | array من middlewares بتقدّم ملفات Swagger UI الثابتة (JS و CSS) |
| [[swaggerUi.setup(spec)]] | بيرجّع middleware بيبني صفحة HTML فيها العقد بتاعك |

~~~bash
curl -si localhost:6005/docs | grep -i location
~~~

~~~text الناتج
Location: /docs/
~~~

[[/docs]] بيعمل redirect (301) لـ [[/docs/]] بالشرطة، عشان الملفات النسبية في الصفحة تتحمّل صح. وفي Chrome الصفحة طلعت فيها:

~~~text اللي اتقري من الصفحة
url: http://localhost:6005/docs/
ops: [ 'GET /orders/{id}' ]
servers: [ 'http://localhost:6005/v1 - Local', 'https://api.example.com/v1 - Production' ]
~~~

### «Try it out» بيبعت لفين؟

للعنوان المختار في قايمة [[servers]] فوق. لما السيرفر المحلي أول واحد (زي الحل)، الطلب راح له ورجع:

~~~text الناتج (Try it out بـ id = 9001)
request url: http://localhost:6005/v1/orders/9001
200
{
  "id": "9001",
  "status": "paid"
}
~~~

ولما اخترنا Production من القايمة:

~~~text الناتج
request url: https://api.example.com/v1/orders/9001
Failed to fetch.
Possible Reasons:
CORS
Network Failure
~~~

الصفحة مش بتكلم السيرفر اللي فاتحها. بتكلم اللي مكتوب في العقد.

---

## ٥. الفرونت: ولّد الأنواع

~~~bash
npx openapi-typescript http://localhost:6005/openapi.json -o src/api.d.ts
~~~

~~~text الناتج
✨ openapi-typescript 7.13.0
🚀 http://localhost:6005/openapi.json → src/api.d.ts [94.7ms]
~~~

- الـ argument الأول مصدر العقد: URL أو ملف [[openapi.yaml]].
- [[-o]] (output): اكتب الناتج فين.
- [[.d.ts]]: ملف declarations. أنواع بس، مفيهوش ولا سطر بيتنفّذ.

جزء من الملف اللي اتولّد:

~~~ts
export interface paths {
    "/orders/{id}": {
        get: operations["getOrder"];
        put?: never;
        ...
    };
}
export interface components {
    schemas: {
        Order: {
            id: string;
            /** @enum {string} */
            status: "pending" | "paid" | "shipped";
        };
        Problem: {
            title?: string;
            status?: number;
            detail?: string;
        };
    };
}
~~~

- [[paths]]: لكل مسار، لكل method، النوع بتاعه. والـ methods اللي مش في العقد [[never]] (مستحيل تتنادى).
- الـ [[enum]] اتحوّل union: [[|]] يعني «واحدة من دول».
- [[?]] بعد اسم الحقل = اختياري، لأن Problem مكانش فيه [[required]].

> openapi-typescript 7.13 طالبة [[typescript@^5]] في الـ peerDependencies، والـ latest على npm دلوقتي 7.0.2. عشان كده التجربة كانت على 5.9.3.

## ٦. العميل سطر سطر

~~~ts
import createClient from "openapi-fetch";
import type { paths } from "./api";
~~~

[[import type]] بيجيب نوع بس، وبيتمسح خالص من الـ JavaScript النهائي. و [[./api]] من غير [[.d.ts]]: TypeScript بيدوّر لوحده.

~~~ts
const api = createClient<paths>({ baseUrl: "http://localhost:6005/v1" });
~~~

[[<paths>]] اسمه generic: بتدّي الدالة نوع، فكل اللي بترجّعه يبقى عارف المسارات. و [[baseUrl]] بيتلزق قبل كل مسار.

~~~ts
const { data, error } = await api.GET("/orders/{id}", { params: { path: { id: "9001" } } });
~~~

- [[api.GET]]: بحروف كبيرة، زي الـ HTTP method.
- [["/orders/{id}"]]: المسار **زي ما هو مكتوب في العقد**، بالـ [[{id}]]. المكتبة بتبدّله بالقيمة.
- [[params.path.id]]: قيمة الـ [[{id}]]. ولو فيه query params بتتحط في [[params.query]].
- [[const { data, error } =]]: destructuring، يعني «خد الخانتين دول من الـ object اللي رجع في متغيرين بنفس الاسم».
- [[await]]: استنى الطلب يخلص.

~~~ts
if (error) console.error(error.title);
else console.log(data.status);
~~~

لو الرد 2xx: [[data]] فيه الـ Order و [[error]] undefined. غير كده العكس. وبعد [[if (error)]]، TypeScript عارف إن [[data]] في الـ else مش undefined، فمش محتاج [[!]] ولا [[as]].

~~~text الناتج (tsx src/client.ts)
paid
~~~

ولما طلبنا id مش موجود (42):

~~~text الناتج
Not found 404
~~~

[[error.title]] جه من الـ Problem، و [[response.status]] من الـ Response الحقيقي.

---

## ٧. الفايدة: الغلط بيطلع قبل التشغيل

جرّبنا ٣ غلطات وشغّلنا [[npx tsc --noEmit -p .]] ([[--noEmit]]: افحص الأنواع بس من غير ما تكتب ملفات JS، و [[-p .]]: استخدم [[tsconfig.json]] اللي هنا):

~~~text الناتج
src/client.ts(4,39): error TS2345: Argument of type '"/order/{id}"' is not assignable to parameter of type '"/orders/{id}"'.
src/client.ts(4,75): error TS2561: Object literal may only specify known properties, but 'ID' does not exist in type '{ id: string; }'. Did you mean to write 'id'?
src/client.ts(6,23): error TS2551: Property 'statuss' does not exist on type '{ id: string; status: "pending" | "paid" | "shipped"; }'. Did you mean 'status'?
~~~

مسار غلط، واسم param غلط، وحقل غلط في الرد: التلاتة اتمسكوا. و [[(4,39)]] السطر والعمود.

> الـ tsconfig كان [[module: ESNext]] و [[moduleResolution: Bundler]] (زي مشاريع الفرونت). مع [[NodeNext]] هتاخد [[TS2834]] وتحتاج تكتب [[./api.js]].

---

## الخلاصة

| الخطوة | الأمر / الكود | الناتج |
|---|---|---|
| اقرا العقد | [[parse(readFileSync(...))]] | object في الذاكرة |
| اعرضه | [[/openapi.json]] | JSON للأدوات |
| docs | [[swaggerUi.serve, swaggerUi.setup(spec)]] | صفحة على [[/docs/]] |
| أنواع | [[openapi-typescript ... -o src/api.d.ts]] | [[paths]] و [[components]] |
| عميل | [[createClient<paths>]] ثم [[api.GET(...)]] | [[{ data, error }]] متحقق منهم |

- «Try it out» بيبعت للـ [[servers]] اللي في العقد، مش للسيرفر اللي فاتح الصفحة.
- المسار في [[api.GET]] بالشكل اللي في العقد ([[{id}]])، والقيمة في [[params.path]].
- ولّد الأنواع في script وفي CI، وإلا هتبقى قديمة زي الأنواع اليدوية.`,
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
          teach: R`## الفكرة: ٣ ثغرات بتتقفل في الكود نفسه، مش في الفرونت

المثال route تعديل و route قايمة. كل سطر فيهم بيقفل ثغرة من قايمة OWASP API Top 10: [[strictObject]] بتقفل BOPLA (كتابة حقول ممنوعة)، وشرط [[userId]] جوه الاستعلام بيقفل BOLA (طلب حد تاني)، و [[take]] و [[select]] بيقفلوا الاستهلاك المفتوح وكشف الحقول.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6.5 على Node 24.19 (بورت ٦٠٠٦). مكان [[db.order]] حطينا object في الذاكرة بنفس شكل دوال Prisma ([[updateMany]] و [[findMany]] و [[findFirst]]) وفيه طلبين: [[o1]] بتاع ahmed و [[o2]] بتاع sara. و [[requireAuth]] بيقرا توكن تجربة ويحط [[req.user]]. ومعاهم الـ error handler بتاع درس [[problem+json]] (بيحوّل [[ZodError]] لـ 422). اللي بيخص Prisma نفسها (زي [[take]] السالب) من الـ docs بتاعتها.

---

## ١. الـ schema: الحقول المسموحة بس

~~~ts
const OrderPatch = z.strictObject({ note: z.string().max(500), giftWrap: z.boolean() }).partial();
~~~

نفكّها من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[z.string().max(500)]] | نص، وأقصاه ٥٠٠ حرف |
| [[z.boolean()]] | [[true]] أو [[false]] بس |
| [[z.strictObject({...})]] | object فيه الحقلين دول، **وأي key تاني = خطأ** |
| [[.partial()]] | كل الحقول تبقى اختيارية (PATCH بيبعت اللي اتغير بس) |

الحقول اللي **مش** في القايمة ([[status]] و [[userId]] و [[total]]) هي بالظبط اللي مينفعش المستخدم يلمسها. الفكرة إنك بتكتب allowlist (المسموح)، مش blocklist (الممنوع).

---

## ٢. route التعديل سطر سطر

~~~ts
app.patch("/orders/:id", requireAuth, async (req, res) => {
~~~

- [[:id]]: حتة متغيرة في المسار، بتوصل في [[req.params.id]].
- [[requireAuth]]: middleware بيشتغل الأول. لو مفيش توكن صح بيرد 401 والـ handler مبيشتغلش. من غير توكن:

~~~text الناتج
401
~~~

~~~ts
  const data = OrderPatch.parse(req.body);
~~~

[[.parse]] يا يرجّع الـ body بعد الفحص، يا يرمي [[ZodError]]. و Express 5 بيودّي أي error من async handler للـ error handler لوحده. ابعت حقل ممنوع:

~~~bash
curl -si -X PATCH localhost:6006/orders/o1 -H "Authorization: Bearer tok-ahmed" -H "Content-Type: application/json" -d '{"status":"paid"}'
~~~

~~~text الناتج
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Validation failed","errors":[{"code":"unrecognized_keys","keys":["status"],"path":[],"message":"Unrecognized key: \"status\""}],"instance":"/orders/o1"}
~~~

- [[unrecognized_keys]]: نوع الخطأ، و [[keys]] الحقول الزيادة.
- [[path: []]] فاضي لأن الغلطة في الـ object نفسه مش في حقل جواه.
- سطر الـ status بيقول [[Unprocessable Entity]] (الاسم القديم اللي Node لسه بيستخدمه)، والـ [[title]] بيقول [[Unprocessable Content]] (الاسم في RFC 9110). نفس الـ 422.

وأخطاء تانية من نفس الـ schema:

~~~text الناتج (errors بس)
note فيها 501 حرف:  {"origin":"string","code":"too_big","maximum":500,"inclusive":true,"path":["note"],...}
giftWrap: "yes":    {"expected":"boolean","code":"invalid_type","path":["giftWrap"],"message":"Invalid input: expected boolean, received string"}
~~~

### ولو كانت [[z.object]] العادية؟

~~~text الناتج (node: z.object(...).partial().parse({status:"paid",note:"x"}))
{"note":"x"}
~~~

مفيش خطأ: الـ [[status]] اتشال بهدوء. لسه محمي (لأننا بنبعت [[data]] مش [[req.body]])، بس العميل مش هيعرف إن طلبه اتجاهل. [[strictObject]] بتقوله صراحة.

~~~ts
  const { count } = await db.order.updateMany({ where: { id: req.params.id, userId: req.user.id }, data });
~~~

ده أهم سطر في الدرس:

- [[where: { id, userId }]]: عدّل الطلب اللي الـ id بتاعه كذا **و** صاحبه هو اللي عامل login. الشرطين في نفس الاستعلام.
- [[data]]: الناتج بتاع Zod، مش [[req.body]].
- [[updateMany]] مش [[update]]: في Prisma، [[update]] محتاج [[where]] بحقل unique بس، ولو ملقاش صف بيرمي error. [[updateMany]] بيقبل أي شروط وبيرجّع [[{ count }]]: عدد الصفوف اللي اتعدّلت.

~~~ts
  if (count === 0) return res.status(404).end();
  res.status(204).end();
~~~

[[count === 0]] معناها واحد من اتنين: الطلب مش موجود، أو موجود بس مش بتاعك. والرد **واحد** في الحالتين، فمحدش يقدر يعرف إن الطلب موجود. و [[204 No Content]] نجاح من غير body. و [[.end()]] بيقفل الرد من غير ما يبعت حاجة.

بتوكن sara على طلب ahmed:

~~~text الناتج
GET   /orders/o1   → 404
PATCH /orders/o1   → 404
GET   /orders/zzz  → 404   (id مش موجود أصلًا: نفس الرد)
~~~

وبتوكن ahmed نفسه:

~~~text الناتج
PATCH {"note":"leave at door"}  → HTTP/1.1 204 No Content
GET /orders/o1                  → {"id":"o1","status":"pending","total":300,"note":"leave at door","giftWrap":false}
~~~

لاحظ إن [[internalCost]] (موجود في البيانات) مظهرش، لأن الـ GET بتاع الحل فيه [[select]].

---

## ٣. route القايمة

~~~ts
  const take = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 20, 1), 100);
~~~

سطر طويل، نفكّه من جوه لبرة:

1. [[req.query.limit]]: اللي بعد [[?limit=]] في الـ URL، دايمًا نص (أو undefined).
2. [[Number(...)]]: حوّله رقم. أي حاجة مش رقم بتبقى [[NaN]] (Not a Number).
3. [[Math.trunc(...)]]: شيل الكسر ([[1.9]] تبقى [[1]]).
4. [[|| 20]]: لو الناتج «falsy» ([[NaN]] أو [[0]])، خد ٢٠.
5. [[Math.max(..., 1)]]: مينزلش عن ١ (السالب بيبقى ١).
6. [[Math.min(..., 100)]]: ميطلعش عن ١٠٠.

جرّبناه على قيم مختلفة:

~~~text الناتج
undefined  Number: NaN   trunc: NaN   take: 20
-5         Number: -5    trunc: -5    take: 1
1000       Number: 1000  trunc: 1000  take: 100
abc        Number: NaN   trunc: NaN   take: 20
1.9        Number: 1.9   trunc: 1     take: 1
0          Number: 0     trunc: 0     take: 20
50         Number: 50    trunc: 50    take: 50
~~~

ليه الحد مهم؟ من غيره [[?limit=1000000]] بيطلب القاعدة كلها في رد واحد (API4: Unrestricted Resource Consumption). وفي Prisma، [[take]] السالب معناه «هات من الآخر»، فـ [[-1000000]] كان هيعدّي أي حد بتحطه بـ [[Math.min]] لوحده. و [[take]] لازم integer، عشان كده [[trunc]].

~~~ts
  res.json({ items: await db.order.findMany({ where: { userId: req.user.id }, take, select: { id: true, status: true, total: true, createdAt: true } }) });
~~~

- [[where: { userId }]]: طلباته هو بس.
- [[take]]: لوحده كده معناه [[take: take]] (اختصار لما اسم المتغير زي اسم الحقل).
- [[select]]: الحقول اللي الواجهة محتاجاها بس. أي عمود جديد يتضاف للجدول بكرة (زي [[internalCost]]) مش هيتسرب لوحده.

~~~text الناتج (GET /orders بتوكن ahmed)
{"items":[{"id":"o1","status":"pending","total":300,"createdAt":"2026-10-01"}]}
~~~

طلب sara ([[o2]]) مش في القايمة، و [[note]] و [[internalCost]] مش في الرد.

---

## الخلاصة

| السطر | الثغرة اللي بيقفلها |
|---|---|
| [[z.strictObject({...}).partial()]] + [[data]] مش [[req.body]] | API3 BOPLA (كتابة): mass assignment |
| [[where: { id, userId }]] + 404 واحد | API1 BOLA |
| حساب [[take]] بين ١ و ١٠٠ | API4 Unrestricted Resource Consumption |
| [[select: {...}]] | API3 BOPLA (قراية): حقول زيادة في الرد |

- شرط الملكية **جوه** الاستعلام، مش فحص بعد ما تجيب.
- «مش موجود» و «مش بتاعك» نفس الرد.
- الاختبار الحقيقي: مستخدمين وتوكنين، وكل route فيه [[:id]] يتجرّب بالتوكن الغلط.`,
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
    }
]);
