// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "الاختبارات",
      l: 3,
      n: "اختبارات للـ API كله: supertest على الـ app من غير بورت، وقاعدة اختبار حقيقية، و factories، ومصفوفة الصلاحيات، والخدمات الخارجية، والـ webhooks",
      items: [
        {
          cmd: "app و server",
          title: "افصل الـ app عن listen عشان تختبره",
          desc: R`[[app.ts]] بيبني الـ app ويرجّعه: middleware و routes و error handler. و [[server.ts]] بس اللي بيعمل [[listen]] ويسمع للـ signals. الاختبارات بتستورد [[createApp()]] وتدّيه لـ supertest مباشرة، فمفيش بورت ثابت يتفتح، ومفيش «البورت مشغول» لما تشغّل ملفين اختبار مع بعض.

القاعدة: مفيش أي side effect وقت الـ import. لا [[listen]]، ولا اتصال بـ Redis أو queue في أول الملف من غير ما حد يطلبه.`,
          example: R`// src/app.ts
import express from "express";
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (req, res) => res.json({ ok: true }));
  app.use("/api/orders", ordersRouter);
  app.use(errorHandler);
  return app;
}

// src/server.ts
import { createApp } from "./app.js";
const server = createApp().listen(config.PORT, (err) => { if (err) throw err; logger.info({ port: config.PORT }, "listening"); });
process.on("SIGTERM", () => server.close(() => process.exit(0)));`,
          try: R`لو السيرفر بتاعك ملف واحد فيه [[app.listen]] في الآخر: قسّمه لملفين زي المثال، وخلي [[npm run dev]] يشغّل server.ts. وبعدين اكتب سكربت صغير يعمل [[import { createApp } from "./src/app.js"]] ويطبع [[typeof createApp()]]، واتأكد إن مفيش سطر «listening» اتطبع.`,
          flag: "script",
          deep: {
            why: R`لو [[app.js]] بيعمل listen وهو بيتعمله import، كل ملف اختبار هيفتح البورت 3000. أول ملف يمسكه، والتاني ياخد [[EADDRINUSE]] (في Express 5 الخطأ ده بيوصل للـ callback بتاع [[listen]]، فلو الـ callback مش بتبص عليه بيطبع «listening» ويخرج بهدوء)، والـ process مبتقفلش في الآخر لأن فيه سيرفر لسه سامع. ونفس الفصل بيفيد برّه الاختبارات: سكربت أو worker عايز يستخدم نفس الـ routes أو الإعدادات من غير ما يفتح سيرفر.`,
            how: R`supertest لما تدّيله app (مش URL) بيعمل [[http.createServer(app)]] ويـ listen على بورت 0، يعني النظام يختار بورت فاضي عشوائي، ويبعت الطلب، ويقفل السيرفر بعد الرد. فكل اختبار بيكلّم الـ app الحقيقي بكل الـ middleware بتاعه عبر HTTP حقيقي، بس على بورت مؤقت محدش شايفه.

[[createApp()]] كدالة (مش object جاهز) بيدّيك ميزة تانية: تقدر تبني app جديد لكل ملف اختبار، أو تبعتله dependencies مختلفة ([[createApp({ mailer: fakeMailer })]]) لو عايز. وده نفس اللي «تاب بناء مشروع كامل» بيعمله في هيكل المشروع.

و [[server.ts]] هو المكان الوحيد اللي فيه الحاجات اللي ليها علاقة بالـ process: البورت، و SIGTERM، والإغلاق النضيف (درس «الإغلاق النضيف» في تاب «Node و npm»).`,
            when: "من أول يوم في أي API هتكتبله اختبارات. التكلفة سطرين، ولو أجّلتها هتلاقي imports بتفتح اتصالات في كل حتة.",
            mistakes: R`[[export default app.listen(3000)]]: كده اللي بيتصدّر هو الـ server مش الـ app، والبورت بيتفتح مع أي import. وملف [[db.js]] بيعمل [[await prisma.$connect()]] أو [[redis.connect()]] في أول سطر، فأي اختبار حتى لو مش محتاج الداتابيز بيستنى اتصال. وفي الانترفيو: «إزاي بتختبر الـ API بتاعك؟» الإجابة الكويسة بتبدأ بالفصل ده، وبعدين supertest على الـ app، وبعدين قاعدة اختبار حقيقية.`
          },
          teach: R`## ملفين: واحد «يبني» والتاني «يشغّل»

[[app.ts]] فيه دالة [[createApp()]] بتبني app Express كامل وترجّعه، من غير ما تفتح أي بورت. و [[server.ts]] بيستورد الدالة دي، ويعمل [[listen]]، ويسمع لإشارة الإغلاق. الاختبارات بتستورد [[app.ts]] بس.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و tsx 4.23 (عشان الملفات [[.ts]])، وجزء الـ SIGTERM على لينكس في Docker ([[node:22-slim]]، Node 22.23) لأن ويندوز مفيهوش signals بنفس الشكل. البورت 5853.

---

## ١. [[src/app.ts]]

~~~javascript
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (req, res) => res.json({ ok: true }));
  app.use("/api/orders", ordersRouter);
  app.use(errorHandler);
  return app;
}
~~~

- [[export function createApp()]]: دالة، مش [[export const app = express()]]. كل نداء بيعمل app جديد. ومفيش حاجة بتحصل وقت الـ import غير إن الدالة اتعرّفت.
- [[express()]]: app فاضي.
- [[express.json()]] ثم الـ routes ثم [[errorHandler]] في الآخر: نفس الترتيب اللي اتعلمناه في درس [[ترتيب الـ middleware]].
- [[return app]]: اللي نادى ياخده ويعمل بيه اللي هو عايزه: [[server.ts]] يعمله [[listen]]، والاختبار يديه لـ supertest.

---

## ٢. [[src/server.ts]]

### [[import { createApp } from "./app.js"]]

لاحظ [[.js]] مع إن الملف [[app.ts]]: ده عرف TypeScript في مشاريع ESM. المسار بيتكتب زي ما هيبقى بعد الـ build، و tsx و vitest بيفهموا إن المقصود [[app.ts]].

### [[const server = createApp().listen(config.PORT, (err) => { ... })]]

1. [[createApp()]]: ابني الـ app.
2. [[.listen(config.PORT, callback)]]: افتح البورت. بترجّع [[http.Server]] بنحفظه في [[server]] عشان نقفله بعدين.
3. الـ callback: في Express 5 بتتنادى في الحالتين، لما السيرفر يبدأ يسمع **أو** لما يفشل، والخطأ بيوصل في [[err]].

ليه [[if (err) throw err]]؟ جربت النسخة القديمة من غير الشرط ([[() => logger.info(...)]]) وشغّلت السيرفر مرتين على نفس البورت. التانية طبعت «listening» وخرجت بـ exit code صفر، كأن كل حاجة تمام:

~~~text الناتج (callback بتطبع err.code)
callback pid 24856 err: EADDRINUSE
second exit=0
~~~

ومع [[if (err) throw err]] نفس التجربة:

~~~text الناتج
Error: listen EADDRINUSE: address already in use :::5853
  code: 'EADDRINUSE',
  syscall: 'listen',
  address: '::',
  port: 5853
second exit=1
~~~

[[EADDRINUSE]] = Error ADDRess IN USE، يعني البورت مع برنامج تاني. و [[:::5853]] هو [[::]] (كل العناوين في IPv6) وبعده [[:5853]]. ولما السيرفر الأول اشتغل كويس طبع:

~~~text الناتج
{"port":5853,"msg":"listening"}
~~~

(في التجربة [[logger]] كان دالة صغيرة بتطبع JSON مكان pino.)

### [[process.on("SIGTERM", () => server.close(() => process.exit(0)))]]

- [[SIGTERM]]: الإشارة اللي Docker و Kubernetes و PM2 بيبعتوها لما عايزين البرنامج يقفل بأدب.
- [[process.on(...)]]: لما الإشارة توصل، شغّل الدالة دي بدل ما تقفل فورًا.
- [[server.close(cb)]]: بطّل تستقبل اتصالات جديدة، واستنى الطلبات اللي شغالة تخلص، وبعدين نادي [[cb]].
- [[process.exit(0)]]: اخرج، و [[0]] معناها «خلصت من غير مشاكل».

على لينكس في Docker: شغّلت [[server.js]] (نفس الكود بـ JavaScript)، وبعت طلب، وبعدين [[kill -TERM]]:

~~~text الناتج
{"port":5853,"msg":"listening"}
{"ok":true}
exit code after SIGTERM: 0
~~~

ولما بعت الإشارة قبل ما السطر ده يتسجّل، الـ process اتقفل على طول بـ [[143]]: ده 128 + 15، و 15 رقم SIGTERM. يعني «اتقتل بالإشارة» مش «خلص».

---

## ٣. الـ solCode: اتأكد إن الـ import مبيفتحش حاجة

~~~javascript
import { createApp } from "./src/app.js";
const app = createApp();
console.log(typeof app); // function
~~~

شغّلته بـ [[npx tsx check-app.mjs]] (لأن [[app.ts]] TypeScript، و [[node]] لوحده مش هيلاقي [[app.js]]):

~~~text الناتج
function
exit=0
~~~

- [[typeof app]] = [[function]]: الـ app في Express دالة [[(req, res, next)]] نفسها، و [[http.createServer(app)]] بيناديها مع كل طلب.
- السكربت **خلص لوحده**. ده الاختبار الحقيقي: لو كان فيه [[listen]] أو اتصال Redis أو [[setInterval]] وقت الـ import، الـ process كانت هتفضل مفتوحة.

وعشان أتأكد من الفرق، عملت النسخة الغلط: ملف بيعمل [[export default app.listen(5853)]]، وسكربت بيستورده بس:

~~~text الناتج
object Server
listening on 5853
exit=124
~~~

- [[object Server]]: اللي اتصدّر الـ server مش الـ app، فمش هينفع تديه لـ supertest زي ما هو.
- [[exit=124]]: ده [[timeout 5]] هو اللي قتله بعد ٥ ثواني. السكربت مكانش هيخلص أبدًا.

ولو السكربت بتاعك فضل مفتوح ومش عارف ليه، اطبع اللي لسه شغال قبل ما تخرج:

~~~javascript
setTimeout(() => { console.log(process.getActiveResourcesInfo()); process.exit(0); }, 1000);
~~~

على النسخة الغلط طلع:

~~~text الناتج
[ 'TCPServerWrap', 'Timeout' ]
~~~

[[TCPServerWrap]] = سيرفر TCP سامع (ده الـ [[listen]])، و [[Timeout]] = الـ [[setTimeout]] بتاعنا نفسه.

---

## الخلاصة

| الملف | فيه | مفيهوش |
|---|---|---|
| [[app.ts]] | [[createApp()]]: middleware و routes و error handler | [[listen]]، اتصالات، timers |
| [[server.ts]] | [[listen]] + [[if (err) throw err]] + SIGTERM | أي route |
| الاختبار | [[createApp()]] ويديه لـ supertest | بورت ثابت |

وفي Express 5: الـ callback بتاعة [[listen]] بتاخد الخطأ، فبص عليه.`,
          lines: [
            "express.",
            "دالة بتبني app جديد وترجّعه، من غير listen.",
            "app جديد.",
            "الـ middleware العادي.",
            "route للـ health check.",
            "الـ routers.",
            "الـ error handler في الآخر.",
            "رجّعه للي نادى: server.ts أو الاختبار.",
            "قفلة.",
            "server.ts بيستورد نفس الدالة.",
            "هو بس اللي بيعمل listen. في Express 5 لو البورت مشغول الخطأ بيوصل للـ callback نفسها، فـ [[if (err) throw err]] عشان السيرفر يقع بـ [[EADDRINUSE]] بدل ما يطبع «listening» ويخرج من غير ما يقول حاجة.",
            "ولما الـ process يتطلب منها تقفل، يقفل السيرفر الأول وبعدين يخرج."
          ],
          sol: R`الناتج الصح: [[typeof createApp()]] بيطبع [[function]] (الـ app في Express دالة [[(req, res, next)]])، ومفيش سطر «listening» ولا البورت اتفتح، والسكربت بيخلص ويقفل لوحده.

لو السكربت فضل مفتوح ومقفلش، يبقى فيه حاجة بتتفتح وقت الـ import: listen، أو اتصال Redis، أو setInterval. اطبع [[process.getActiveResourcesInfo()]] في آخر السكربت: بيقولك إيه اللي لسه مفتوح ([[TCPServerWrap]] يعني سيرفر سامع، و [[Timeout]] يعني timer)، أو علّق الـ imports واحد واحد.

ولو ظهر «listening»، يبقى [[listen]] لسه في app.ts أو في ملف بيتعمله import منه.`,
          solCode: R`// check-app.mjs
import { createApp } from "./src/app.js";
const app = createApp();
console.log(typeof app); // function
// مفيش listen: السكربت يخلص ويقفل لوحده`
        },
        {
          cmd: "supertest",
          title: "اختبر كل endpoint: الـ status والـ body",
          desc: R`[[request(app).post(url).set(header).send(body)]] بيبعت طلب حقيقي للـ app ويرجّعلك الرد، وانت بتتأكد من [[res.status]] و [[res.body]] بـ vitest.

لكل endpoint اختبر الحالة الناجحة، وكل رفض ليه كود مختلف: 400 للـ body الغلط، و 401 من غير توكن، و 404 لحاجة مش موجودة، و 502 لو خدمة برّه وقعت. أساسيات vitest نفسها (describe و it و watch) في درس [[vitest]] في تاب «فحص الكود».`,
          example: R`import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../src/app.js";
import { createUser } from "./factories.js";

const app = createApp();

describe("POST /api/orders", () => {
  it("creates an order", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ status: "PENDING", checkoutUrl: expect.stringContaining(res.body.id) });
  });

  it("rejects a bad amount with 400", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: -1 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("INVALID_AMOUNT");
  });
});`,
          try: R`[[npm i -D vitest supertest]]، واكتب ملف [[tests/health.test.ts]] يتأكد إن [[GET /health]] بيرجّع 200 و [[{ ok: true }]]، وإن [[GET /nope]] بيرجّع 404. شغّل [[npx vitest run]]. وبعدين غيّر الـ status في الـ route لـ 201 وشوف الاختبار بيقع بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`الـ API هو العقد بينك وبين الواجهة والموبايل. اختبار الـ service لوحده مش كفاية: الـ validation والـ auth والـ error handler وشكل الـ JSON كلها بتحصل في الطبقات اللي فوقه. اختبار supertest بيعدّي على كل ده مرة واحدة، فبيمسك الغلطات اللي بتبوّظ الواجهة فعلًا: 500 بدل 400، أو حقل اتشال من الرد، أو route اتنقل.`,
            how: R`[[request(app)]] بيرجّع object تبني عليه الطلب بـ chaining، وأول ما تعمل [[await]] بيتبعت. [[.send(obj)]] بيعمل JSON ويحط [[Content-Type: application/json]] لوحده. و [[.set()]] للـ headers، و [[.query({ page: 2 })]] للـ query string.

الرد فيه [[status]] و [[headers]] و [[body]] (متحوّل من JSON) و [[text]] (النص الخام). و [[toMatchObject]] بيتأكد من الحقول اللي كتبتها بس ويتجاهل الباقي، فالاختبار ميقعش لو ضفت حقل جديد. و [[expect.any(String)]] و [[expect.stringContaining]] للقيم اللي بتتغير كل مرة زي الـ id والتاريخ.

supertest عنده [[.expect(201)]] كمان، بس [[expect(res.status).toBe(201)]] بيطلّع رسالة أوضح في vitest ويخليك تشوف الـ body لما يقع (حط [[console.log(res.body)]] مؤقتًا).

ولو عايز كوكيز تفضل بين الطلبات (login وبعده [[/me]])، استخدم [[request.agent(app)]]: بيحفظ الكوكيز زي المتصفح.`,
            when: "لكل endpoint: الحالة الناجحة، وكل كود خطأ ليه معنى مختلف. الحسابات المعقدة (سعر وخصم وضريبة) اختبرها كمان unit على الدالة نفسها، أسرع وأوضح.",
            mistakes: R`إنك تختبر [[res.status]] بس ومتبصش على الـ body، فـ endpoint بيرجّع [[{}]] بـ 200 يعدّي. أو العكس: [[toEqual]] على الرد كله بالـ id والتاريخ، فالاختبار يقع كل مرة. ونسيان [[await]] قبل [[request(app)]]: الاختبار «ينجح» من غير ما الطلب يتبعت أصلًا. واختبارات بتعتمد على ترتيبها (الأول بيعمل يوزر والتاني بيستخدمه): كل اختبار لازم يجهّز الداتا بتاعته بنفسه (درس [[factories]]).`
          },
          teach: R`## ملف اختبار: طلب حقيقي، وبعدين [[expect]] على الرد

كل [[it]] في المثال بيعمل ٣ حاجات: يجهّز يوزر، ويبعت طلب HTTP للـ app بـ supertest، ويتأكد من الـ status والـ body. مفيش سيرفر شغال ولا بورت ثابت: supertest بيشغّل الـ app على بورت مؤقت لكل طلب.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1 و Express 5.2.1، و Prisma 7.10 على Postgres 16 في Docker (قاعدة [[myapp_test]]، الدرس الجاي). الـ app فيه [[POST /api/orders]] بيعمل الطلب وبيكلّم بوابة دفع وهمية بـ [[fetch]]، فملف الاختبار كان فيه زيادة على المثال handler بتاع msw بيرد مكان البوابة (درس [[msw و nock]]).

---

## ١. الـ imports

| السطر | ليه |
|---|---|
| [[import request from "supertest"]] | دالة [[request(app)]] اللي بتبعت الطلبات |
| [[import { describe, it, expect } from "vitest"]] | أدوات الاختبار: مجموعة، واختبار، وتأكيد |
| [[import { createApp } from "../src/app.js"]] | الـ app من غير listen (درس [[app و server]]) |
| [[import { createUser } from "./factories.js"]] | بتعمل يوزر في القاعدة وترجّعه ومعاه توكن (درس [[factories]]) |

و [[const app = createApp()]] مرة واحدة برّه الاختبارات: كل الاختبارات في الملف بتكلّم نفس الـ app.

---

## ٢. [[describe("POST /api/orders", () => { ... })]]

[[describe]] بيجمّع اختبارات تحت اسم واحد، والاسم بيظهر قبل اسم كل اختبار في الناتج. ملوش أي أثر غير التنظيم.

---

## ٣. السطر المهم: نفكّه من الشمال لليمين

~~~javascript
const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[request(app)]] | جهّز طلب للـ app ده |
| [[.post("/api/orders")]] | الـ method والعنوان (من غير host ولا بورت) |
| [[.set("Authorization", ...)]] | header. و [[$__btBearer $__{user.token}$__bt]] template literal بيحط التوكن بعد كلمة Bearer |
| [[.send({ amountCents: 5000 })]] | الـ body: بيعمله JSON ويحط [[Content-Type: application/json]] لوحده |
| [[await]] | **هنا بس** الطلب بيتبعت، و [[res]] بيبقى الرد |

لو نسيت [[await]]: جربت اختبار فيه [[request(app).get("/nope").expect(200)]] من غير await، و vitest قال عليه [[passed]] رغم إن الرد 404. الطلب متبعتش أصلًا قبل ما الاختبار يخلص.

### الرد اللي رجع

طبعته مرة بـ [[console.log(res.status, res.body)]]:

~~~text الناتج
201 application/json; charset=utf-8 {
  id: 'cmuxu9gjs0000fsienw01flmr',
  userId: 1,
  amountCents: 5000,
  status: 'PENDING',
  checkoutUrl: 'https://pay.example.com/c/cmuxu9gjs0000fsienw01flmr',
  gatewayTxId: null
}
~~~

[[res.body]] object جاهز (supertest عمل [[JSON.parse]] لوحده)، و [[res.text]] فيه نفس الكلام كنص خام.

(في vitest 5، [[console.log]] جوه اختبار **ناجح** مبيظهرش. بيظهر لو الاختبار وقع، أو لو شغّلت بـ [[--silent=false]].)

---

## ٤. التأكيدات

### [[expect(res.status).toBe(201)]]

[[toBe]] مقارنة بالظبط ([[Object.is]]). 201 = Created.

### [[expect(res.body).toMatchObject({ ... })]]

~~~javascript
expect(res.body).toMatchObject({ status: "PENDING", checkoutUrl: expect.stringContaining(res.body.id) });
~~~

- [[toMatchObject]]: الحقول اللي كتبتها بس لازم تطابق، والباقي ([[id]] و [[userId]] و [[amountCents]]) متجاهل. لو ضفت حقل جديد للرد بكرة، الاختبار مش هيقع.
- [[expect.stringContaining(res.body.id)]]: أي نص فيه الـ id ده. الـ id بيتغير كل مرة، فمنقدرش نكتبه ثابت، بس نقدر نتأكد إن اللينك مربوط بالطلب ده بالذات.

### اختبار الرفض

~~~javascript
const res = await request(app).post("/api/orders").set(...).send({ amountCents: -1 });
expect(res.status).toBe(400);
expect(res.body.error).toBe("INVALID_AMOUNT");
~~~

الرد الحقيقي:

~~~text الناتج
400 { error: 'INVALID_AMOUNT' }
~~~

ليه نتأكد من [[error]] كمان؟ لأن الواجهة بتعتمد على الكود ده عشان تعرض رسالة. 400 بكود تاني (مثلًا من الـ validation) معناها رسالة غلط قدام اليوزر.

---

## ٥. التشغيل

~~~bash
npx vitest run --reporter=verbose
~~~

[[run]] يعني شغّل مرة واخرج (من غيرها vitest بيفضل يراقب الملفات)، و [[--reporter=verbose]] بيكتب كل اختبار في سطر:

~~~text الناتج
 ✓ tests/orders.test.ts > POST /api/orders > creates an order 239ms
 ✓ tests/orders.test.ts > POST /api/orders > rejects a bad amount with 400 62ms
 ✓ tests/health.test.ts > GET /health 127ms
 ✓ tests/health.test.ts > unknown route is 404 38ms
 Test Files  2 passed (2)
      Tests  4 passed (4)
~~~

[[POST /api/orders > creates an order]] هو اسم الـ [[describe]] وبعده اسم الـ [[it]].

---

## ٦. الـ solCode وتجربة الـ «try»

[[tests/health.test.ts]] زي الـ solCode بالظبط نجح (الاتنين التحت في الناتج فوق). وعلى [[/nope]] الـ 404 جاي من Express نفسه، وده شكله:

~~~text الناتج
404 text/html; charset=utf-8 "<!DOCTYPE html>...<pre>Cannot GET /nope</pre>..." {}
~~~

HTML مش JSON، فـ [[res.body]] بقى [[{}]] فاضي. عشان كده الاختبار بيبص على [[res.status]] بس هنا.

ولما غيّرت [[/health]] يرجّع 201:

~~~text الناتج
 FAIL  tests/health.test.ts > GET /health
AssertionError: expected 201 to be 200 // Object.is equality

- Expected
+ Received

- 200
+ 201

 ❯ tests/health.test.ts:9:22
      9|   expect(res.status).toBe(200);
       |                      ^

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
~~~

[[- Expected]] اللي انت كاتبه في الاختبار، و [[+ Received]] اللي رجع فعلًا، و [[9:22]] السطر والعمود.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[request(app)]] | طلب HTTP حقيقي على بورت مؤقت |
| [[.post()]] [[.set()]] [[.send()]] | الـ method والـ headers والـ body (JSON لوحده) |
| [[await]] | من غيره الطلب مبيتبعتش والاختبار «ينجح» |
| [[res.status]] و [[res.body]] | اتأكد من الاتنين |
| [[toMatchObject]] + [[expect.stringContaining]] | الحقول المهمة بس، والقيم المتغيرة بشكلها |`,
          lines: [
            "supertest.",
            "دوال vitest.",
            "الـ app من غير listen.",
            "factory بتعمل يوزر وتوكن (درس [[factories]]).",
            "app واحد للملف كله.",
            "مجموعة اختبارات لـ endpoint واحد.",
            "الحالة الناجحة.",
            "يوزر جديد للاختبار ده بس.",
            "ابعت POST بالتوكن والـ body.",
            "201 Created.",
            "الحقول المهمة بس، والـ checkoutUrl فيه id الطلب.",
            "قفلة.",
            "حالة الرفض.",
            "يوزر.",
            "مبلغ سالب.",
            "400 مش 500.",
            "وكود الخطأ اللي الواجهة بتعتمد عليه.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الناتج: [[Test Files 1 passed]] و [[Tests 2 passed]]. ولما تغيّر الـ status لـ 201، vitest بيطبع [[expected 201 to be 200]] ومعاها السطر اللي وقع.

ولو [[GET /nope]] رجع 200 بـ HTML، يبقى عندك route [[*]] بيرجّع الواجهة (SPA fallback) قبل الـ 404 بتاع الـ API: خلي الـ fallback ده بعد كل routes الـ API، أو ميشتغلش على [[/api]].

ولو الأمر فضل شغال ومقفلش، يبقى فيه اتصال مفتوح (Redis أو الداتابيز): اقفله في [[afterAll]].`,
          solCode: R`import request from "supertest";
import { it, expect } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

it("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

it("unknown route is 404", async () => {
  const res = await request(app).get("/nope");
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "قاعدة الاختبار",
          title: "قاعدة بيانات للاختبار لوحدها، وتتنضف بين الاختبارات",
          desc: R`الاختبارات بتكلّم Postgres حقيقي، بس قاعدة تانية خالص ([[myapp_test]]) عمرها ما تبقى قاعدة التطوير. قبل الاختبارات [[prisma migrate deploy]] عليها، وقبل كل اختبار بتفضّيها.

طريقتين للتنضيف: [[TRUNCATE]] لكل الجداول قبل كل اختبار (بسيطة وشغالة مع أي حاجة)، أو كل اختبار جوه transaction وتعمل ROLLBACK في الآخر (أسرع، بس صعبة لما الطلب بيعدّي على HTTP والكود بيفتح transactions بنفسه).`,
          example: R`// vitest.config.ts
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});

// tests/setup.ts
import { afterAll, beforeEach } from "vitest";
import { db } from "../src/db.js";
beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" RESTART IDENTITY CASCADE');
});
afterAll(() => db.$disconnect());

# package.json: "test": "dotenv run -f .env.test -- prisma migrate deploy && vitest run"`,
          try: R`اعمل قاعدة [[myapp_test]] (بـ [[createdb]] أو [[CREATE DATABASE]] في psql)، وشغّل عليها [[DATABASE_URL=... npx prisma migrate deploy]]. اكتب اختبارين: الأول يعمل يوزر بإيميل ثابت، والتاني يعمل يوزر بنفس الإيميل. من غير الـ TRUNCATE التاني هيقع بـ unique constraint لو اتشغّلوا ورا بعض، ومعاه الاتنين ينجحوا.`,
          flag: "script",
          deep: {
            why: R`الـ mock للداتابيز بيخبّي أهم الغلطات: unique constraint، و foreign key، و query غلط، و migration ناقصة، و transaction مش شغالة. الاختبار اللي بيكلّم Postgres حقيقي بيمسك ده كله. والقاعدة المنفصلة لأن الاختبارات بتمسح كل حاجة، وأول مرة حد يشغّلها على قاعدة التطوير هيخسر الداتا بتاعته.`,
            how: R`[[migrate deploy]] مش [[migrate dev]]: الـ deploy بيطبّق الـ migrations الموجودة زي الإنتاج بالظبط، ومبيولّدش migration جديدة ولا بيسألك أسئلة. فلو فيه migration ناقصة من الـ repo، الاختبارات هتقع هنا قبل ما الإنتاج يقع.

[[TRUNCATE ... RESTART IDENTITY CASCADE]] بيفضّي الجداول في أمر واحد، ويرجّع الـ sequences من الأول، و CASCADE بيعدّي على الجداول المرتبطة بـ foreign keys. أسرع بكتير من [[deleteMany]] على كل جدول بالترتيب. والأسماء بين [[""]] لأن Prisma بيعمل الجداول بحروف كبيرة. ومتفضّيش [[_prisma_migrations]]!

الـ rollback: تفتح transaction، وتشغّل الاختبار جواها، وفي الآخر ROLLBACK فكأن مفيش حاجة حصلت. سريع جدًا، بس شرطه إن كل الكود يستخدم نفس الاتصال اللي فيه الـ transaction. مع Prisma والطلب اللي بيعدّي على HTTP ده صعب: الـ client عنده pool، والـ [[$transaction]] اللي جوه الكود بيفتح transaction تانية. عشان كده TRUNCATE هي الاختيار العملي مع Prisma و supertest، و rollback تنفع أكتر في اختبارات الـ repository اللي بتدّيها الـ client بإيدك.

[[fileParallelism: false]] بيشغّل ملفات الاختبار ورا بعض، لأنهم بيشاركوا نفس القاعدة. لو عايز parallel، اعمل قاعدة أو schema لكل worker (مثلًا [[myapp_test_$__{process.env.VITEST_POOL_ID}]]).

وفي CI نفس الفكرة بـ service container لـ Postgres: درس [[services]] في تاب «GitHub Actions»، ومثال كامل في درس «ci.yml: Postgres + Prisma» في تاب «من مشاريعي».`,
            when: "أي اختبار بيعدّي على الداتابيز. والمنطق الصافي (حسابات وتحويلات) اختبره unit من غير قاعدة خالص.",
            mistakes: R`[[DATABASE_URL]] في الاختبار بييجي من [[.env]] العادي لأن حد نسي يغيّره، فالـ TRUNCATE يمسح قاعدة التطوير. حط حارس في setup: [[if (!process.env.DATABASE_URL.includes("_test")) throw ...]]. واستخدام SQLite في الاختبار و Postgres في الإنتاج: أنواع وسلوك مختلف، وهتعدّي اختبارات على حاجات بتقع في الإنتاج. وتشغيل [[migrate dev]] في CI. وملفات اختبار parallel على قاعدة واحدة: اختبارات بتقع مرة وتنجح مرة (flaky) ومحدش فاهم ليه.`
          },
          teach: R`## ٣ ملفات: إعداد vitest، وملف setup، وسطر في package.json

[[vitest.config.ts]] بيقول لـ vitest يشغّل الاختبارات على قاعدة [[myapp_test]] وبيحدد ملف setup. و [[tests/setup.ts]] بيفضّي الجداول قبل كل اختبار. وسكربت [[test]] في package.json بيطبّق الـ migrations على قاعدة الاختبار الأول، وبعدين يشغّل vitest.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و Prisma 7.10 ([[@prisma/adapter-pg]])، على Postgres 16 في Docker: container اسمه [[teach-api03-pg]] على بورت 54873 بدل 5432 (لأن 5432 مشغول بقاعدة تانية على الجهاز ده). فالـ URL في التجربة كان [[postgresql://app:app@localhost:54873/myapp_test]].

---

## ١. [[vitest.config.ts]]

~~~javascript
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});
~~~

### [[defineConfig({ test: { ... } })]]

[[defineConfig]] جاية من [[vitest/config]] (أول سطر بعد التعليق). مبتعملش حاجة غير إنها بترجّع الـ object زي ما هو، بس بتدّي الـ editor أنواع و autocomplete. وكل إعدادات الاختبار جوه [[test]].

### [[env: { DATABASE_URL: ..., JWT_SECRET: ... }]]

متغيرات بيئة بتتحط في [[process.env]] قبل ما أي ملف اختبار يتحمّل. فـ [[src/db.ts]] لما يقرا [[process.env.DATABASE_URL]] بياخد قاعدة الاختبار. وفك الـ URL:

~~~text postgresql://app:app@localhost:5432/myapp_test
postgresql://   نوع القاعدة
app:app         اليوزر : الباسورد
@localhost:5432 الجهاز : البورت
/myapp_test     اسم القاعدة، وده الفرق الوحيد عن قاعدة التطوير
~~~

طبعت [[process.env.DATABASE_URL]] من جوه اختبار وطلع [[postgresql://app:app@localhost:54873/myapp_test]].

### [[setupFiles]]

ملف بيتشغّل قبل **كل** ملف اختبار، فالـ hooks اللي فيه بتسري على كل الاختبارات.

### [[fileParallelism: false]]

vitest افتراضيًا بيشغّل كذا ملف في نفس الوقت. هنا كلهم بيكلّموا نفس القاعدة، فملف ممكن يعمل TRUNCATE وملف تاني في نص اختبار. [[false]] = ملف ورا ملف.

---

## ٢. [[tests/setup.ts]]

~~~javascript
beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" RESTART IDENTITY CASCADE');
});
afterAll(() => db.$disconnect());
~~~

### [[beforeEach(fn)]]

شغّل [[fn]] قبل كل [[it]]. يعني كل اختبار بيبدأ بقاعدة فاضية.

### [[db.$executeRawUnsafe('...')]]

بيبعت SQL خام زي ما هو. [[Unsafe]] لأنه مش بيحمي من SQL injection لو حطيت فيه قيم من برّه، وهنا النص ثابت فمفيش مشكلة. والـ single quotes برّه عشان الـ double quotes جوه تفضل جزء من الـ SQL.

### الـ SQL نفسه

| الحتة | معناها |
|---|---|
| [[TRUNCATE TABLE]] | فضّي الجداول دي مرة واحدة (أسرع من DELETE لأنه مبيعدّيش صف صف) |
| [["Order", "User"]] | أسماء الجداول بين [[""]]: Prisma عملها بحرف كبير، و Postgres من غير quotes بيحوّل الاسم لحروف صغيرة. و [[order]] كمان كلمة محجوزة في SQL |
| [[RESTART IDENTITY]] | رجّع عدّادات الـ ids لـ 1 |
| [[CASCADE]] | لو جدول تاني مربوط بيهم بـ foreign key، فضّيه كمان |

### [[afterAll(() => db.$disconnect())]]

بعد آخر اختبار في الملف اقفل اتصالات Prisma، وإلا الـ pool بيفضل مفتوح.

---

## ٣. نجرّب الـ «try»

اختبارين بيعملوا يوزر بنفس الإيميل، والاتنين بيتوقعوا [[id]] بـ 1:

~~~javascript
it("first user", async () => {
  const u = await db.user.create({ data: { email: "sara@test.local" } });
  expect(u.id).toBe(1);
});
it("same email again", async () => { ...نفس الكلام... });
~~~

### مع الـ [[beforeEach]]

~~~text الناتج
 ✓ dbg/users.test.ts > first user 176ms
 ✓ dbg/users.test.ts > same email again 50ms
      Tests  2 passed (2)
~~~

الاتنين نجحوا، والاتنين [[id]] بتاعهم 1: ده [[RESTART IDENTITY]].

### من غيره (setup فيه [[afterAll]] بس)

~~~text الناتج
CODE P2002 ... "originalCode":"23505","originalMessage":"duplicate key value violates unique constraint \"User_email_key\"" ...
   × same email again 15ms
Unique constraint failed on the constraint: $__btUser_email_key$__bt
      Tests  1 failed | 1 passed (2)
~~~

- [[P2002]]: كود Prisma للـ unique constraint.
- [[23505]]: نفس الخطأ بكود Postgres نفسه.
- [[User_email_key]]: اسم الـ index اللي Prisma عمله لـ [[@unique]] على [[email]].

وتشغيلة تانية من غير تنضيف وقّعت **الاتنين**، لأن [[sara@test.local]] كان لسه موجود من المرة اللي قبلها. ده بالظبط معنى «الاختبار بيعتمد على اللي حصل قبله».

---

## ٤. سكربت [[test]]

~~~text package.json
"test": "dotenv run -f .env.test -- prisma migrate deploy && vitest run"
~~~

نفكّه بالترتيب:

1. [[dotenv run -f .env.test --]]: اقرا [[.env.test]] (فيه [[DATABASE_URL]] بتاع قاعدة الاختبار) وحطه في البيئة، وشغّل الأمر اللي بعد [[--]].
2. [[prisma migrate deploy]]: طبّق أي migration لسه متطبقتش، من غير ما يولّد جديدة ولا يسأل.
3. [[&&]]: لو اللي قبلها نجحت بس.
4. [[vitest run]]: الاختبارات. ([[DATABASE_URL]] بتاعها جاي من [[vitest.config.ts]].)

أول تشغيل على قاعدة فاضية:

~~~text الناتج
◇ injected env (1) from .env.test
Loaded Prisma config from prisma.config.ts.
Datasource "db": PostgreSQL database "myapp_test", schema "public" at "localhost:54873"

1 migration found in prisma/migrations
Applying migration $__bt20261007081549_init$__bt
...
All migrations have been successfully applied.

 Test Files  2 passed (2)
      Tests  4 passed (4)
~~~

### ليه [[dotenv run -f]] مش [[dotenv -e]]؟

مكتبة [[dotenv]] (اللي [[prisma.config.ts]] في Prisma 7 بيستوردها) بقى ليها أمر اسمه [[dotenv]] من نسخة 18، وصيغته [[dotenv run -f <file> -- <cmd>]]. والصيغة القديمة [[dotenv -e .env.test -- ...]] بتاعة مكتبة تانية اسمها [[dotenv-cli]]. لما الاتنين يبقوا متسطّبين، الاسم واحد، وفي تجربتي [[node_modules/.bin/dotenv]] كان بتاع [[dotenv]] 18، فالصيغة القديمة طبعت الـ usage ووقفت:

~~~text الناتج
Usage: dotenv run [--help] [-q|--quiet] [--debug] [--override] [--fast] [-f|--file <paths>] [--] <command> [args...]
~~~

لو مشروعك فيه [[dotenv-cli]] بس (ومفيش [[dotenv]] 18)، الصيغة القديمة شغالة. المهم تعرف انت بتنادي أنهي واحد.

---

## ٥. الـ solCode: أول مرة على جهاز جديد

~~~bash
createdb -h localhost -U app myapp_test
DATABASE_URL=postgresql://app:app@localhost:5432/myapp_test npx prisma migrate deploy
npx vitest run tests/users.test.ts
~~~

- [[createdb]]: برنامج بييجي مع Postgres بيعمل قاعدة. [[-h]] الـ host، و [[-U]] اليوزر. على ويندوز من غير Postgres متسطّب شغّلته جوه الـ container: [[docker exec teach-api03-pg createdb -h localhost -U app myapp_test2]] ورجع بصفر. ومرة تانية بنفس الاسم: [[createdb: error: database creation failed: ERROR:  database "myapp_test2" already exists]].
- [[DATABASE_URL=... npx ...]] (bash بس): متغير للأمر ده لوحده. في PowerShell: [[$env:DATABASE_URL="..."; npx prisma migrate deploy]] (جربتها في PowerShell 7.6 على قاعدة متطبّق عليها قبل كده وقالت [[No pending migrations to apply.]]).

ولو نسيت [[migrate deploy]] وشغّلت على القاعدة الفاضية:

~~~text الناتج
P2021 | The table $__btpublic.User$__bt does not exist in the current database.
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[env.DATABASE_URL]] | الاختبارات على [[myapp_test]]، عمرها ما تلمس قاعدة التطوير |
| [[setupFiles]] | [[beforeEach]] و [[afterAll]] لكل الملفات |
| [[TRUNCATE ... RESTART IDENTITY CASCADE]] | كل اختبار يبدأ فاضي والـ ids من 1 |
| [[fileParallelism: false]] | ملف ورا ملف عشان القاعدة واحدة |
| [[migrate deploy]] قبل [[vitest run]] | الـ schema زي الإنتاج، و P2021 لو نسيته |`,
          lines: [
            "[[defineConfig]] من vitest، بيدّي الإعدادات أنواع و autocomplete.",
            "إعداد vitest.",
            "قسم الاختبارات.",
            "متغيرات البيئة للاختبار: قاعدة الاختبار وسر JWT ثابت.",
            "ملف بيتشغّل قبل كل ملف اختبار.",
            "ملفات الاختبار ورا بعض عشان بيشاركوا نفس القاعدة.",
            "قفلة.",
            "قفلة.",
            "hooks بتاعة vitest.",
            "نفس الـ Prisma client بتاع التطبيق.",
            "قبل كل اختبار...",
            "...فضّي الجداول وصفّر العدادات، و CASCADE للجداول المرتبطة.",
            "قفلة.",
            "في الآخر اقفل الاتصال عشان الـ process تخلص."
          ],
          sol: R`المتوقع: من غير [[beforeEach]] اللي فيه TRUNCATE، الاختبار التاني بيقع بخطأ Prisma كوده [[P2002]] ورسالته [[Unique constraint failed on the constraint: User_email_key]] (اسم الـ unique index اللي Prisma عمله على [[email]]). ومعاه الاتنين بينجحوا مهما شغّلتهم كام مرة.

لو الاتنين نجحوا من غير TRUNCATE، يبقى غالبًا الـ email مش [[@unique]] في الـ schema، أو الاختبارات مش بتكلّم نفس القاعدة اللي انت فاكرها: اطبع [[process.env.DATABASE_URL]] في الـ setup.

ولو ظهر خطأ [[P2021]] ورسالته [[The table public.User does not exist in the current database]]، يبقى نسيت [[migrate deploy]] على قاعدة الاختبار.`,
          solCode: R`createdb -h localhost -U app myapp_test
DATABASE_URL=postgresql://app:app@localhost:5432/myapp_test npx prisma migrate deploy
npx vitest run tests/users.test.ts`
        },
        {
          cmd: "factories",
          title: "داتا الاختبار: factory صغيرة بدل ملف fixtures ضخم",
          desc: R`factory دالة بتعمل صف واحد بقيم افتراضية معقولة وبترجّعه، وتقدر تغيّر أي حقل: [[createUser({ role: "ADMIN" })]]. كل اختبار بيعمل الداتا اللي محتاجها بس، فتقرا الاختبار وتفهم هو بيختبر إيه.

و [[createUser]] بترجّع كمان التوكن بتاع اليوزر، عشان مفيش اختبار محتاج يعدّي على login.`,
          example: R`// tests/factories.ts
import jwt from "jsonwebtoken";
import { db } from "../src/db.js";

let n = 0;
export async function createUser(overrides = {}) {
  n++;
  const user = await db.user.create({ data: { email: $__btuser$__{n}@test.local$__bt, ...overrides } });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5m" });
  return { ...user, token };
}

export function createOrder(user, overrides = {}) {
  return db.order.create({ data: { userId: user.id, amountCents: 5000, ...overrides } });
}`,
          try: R`اعمل [[createUser]] و [[createOrder]] زي المثال، واكتب اختبار «الأدمن يقدر يمسح طلب أي حد»: يوزر عادي عنده طلب، وأدمن بـ [[createUser({ role: "ADMIN" })]] بيعمل DELETE. لازم الاختبار كله يبقى ٦ سطور أو أقل.`,
          flag: "script",
          deep: {
            why: R`ملف fixtures كبير (٢٠ يوزر و ١٠٠ طلب في JSON) بيبدأ صغير ويكبر لحد ما محدش يعرف أنهي اختبار معتمد على أنهي صف. تعدّل حقل عشان اختبار، يقع ٥ اختبارات تانيين. والاختبار نفسه بيبقى [[expect(orders).toHaveLength(7)]] ومحدش فاهم ليه ٧. الـ factory بتخلي السبب مكتوب قدامك: عملت طلبين ليوزر A وطلب ليوزر B، فـ A يشوف ٢.`,
            how: R`القيم الافتراضية لازم تبقى صالحة وتعدّي كل الـ constraints: إيميل فريد (عشان كده العداد [[n]])، وأي حقل مطلوب ليه قيمة. و [[...overrides]] في الآخر عشان أي حاجة تكتبها تغلب الافتراضي.

العلاقات: [[createOrder(user)]] بتاخد اليوزر بدل ما تعمل واحد من عندها. كده انت اللي بتقرر مين صاحب الطلب، ودا بالظبط اللي محتاجه في اختبارات الصلاحيات (الدرس الجاي). ولو عايز الاختصار، ممكن تخلي [[user]] اختياري وتعمل واحد لو مش موجود.

التوكن: بنعمله بـ [[jwt.sign]] بنفس السر اللي الـ app شايفه في الاختبار ([[JWT_SECRET]] من vitest.config). ده أسرع من login حقيقي في كل اختبار، و login نفسه ليه اختبار لوحده. ولو الـ auth عندك session، الـ factory تعمل login بـ [[request.agent(app)]] وترجّع الـ agent.

والـ seed بتاع التطوير (درس «prisma db seed و studio» في تاب «Node و npm») حاجة تانية: داتا شكلها حلو عشان تتفرج على التطبيق. متستخدمهوش في الاختبارات.`,
            when: "من أول ما يبقى عندك أكتر من ٣ اختبارات بتعمل نفس النوع من الداتا. وفيه مكتبات (زي fishery أو @faker-js/faker للقيم العشوائية)، بس دالة صغيرة زي دي كفاية لأغلب المشاريع.",
            mistakes: R`قيم عشوائية في كل حاجة (faker لكل حقل) فالاختبار يقع مرة كل ١٠٠ مرة لأن الاسم العشوائي طلع أطول من الحد: خلي القيم ثابتة إلا لو محتاجها فريدة. و factory بتعمل ١٠ حاجات مرتبطة لوحدها (يوزر وطلبات ومدفوعات) فكل اختبار بطيء ومحدش عارف إيه اللي اتعمل. وإنك تعدّل الـ object اللي راجع من factory في اختبار وتستخدمه في اختبار تاني.`
          },
          teach: R`## دالتين بيعملوا صفوف حقيقية في قاعدة الاختبار

[[createUser]] بتعمل يوزر في القاعدة وترجّعه ومعاه توكن جاهز، و [[createOrder]] بتعمل طلب ليوزر انت بتديهولها. الاتنين ليهم قيم افتراضية، وأي حقل تبعته في [[overrides]] بيغلبها.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و Prisma 7.10 و jsonwebtoken 9.0.3، على قاعدة [[myapp_test]] (Postgres 16 في Docker) ومعاها الـ [[setup.ts]] اللي بيعمل TRUNCATE قبل كل اختبار (الدرس اللي فات).

---

## ١. [[let n = 0]]

عداد على مستوى الملف (برّه أي دالة)، فبيفضل عايش طول ما ملف الاختبار شغال. بيزيد مع كل [[createUser]] عشان كل إيميل يبقى مختلف، لأن [[email]] عليه [[@unique]].

---

## ٢. [[export async function createUser(overrides = {})]]

- [[overrides = {}]]: قيمة افتراضية للـ parameter. لو ناديت [[createUser()]] من غير حاجة، [[overrides]] بيبقى object فاضي بدل [[undefined]]، فالـ [[...overrides]] تحت ميقعش.
- [[async]]: لأن جواها [[await]] على القاعدة.

### [[n++]]

زوّد العداد 1.

### [[db.user.create({ data: { email: $__btuser$__{n}@test.local$__bt, ...overrides } })]]

- [[$__btuser$__{n}@test.local$__bt]]: template literal، فبيطلع [[user1@test.local]] ثم [[user2@test.local]]... و [[.local]] دومين محجوز مش حقيقي، فلو حاجة بعتت إيميل بالغلط مش هيوصل لحد.
- [[...overrides]] (spread): انسخ كل مفاتيح [[overrides]] هنا. ولأنه **بعد** [[email]]، لو [[overrides]] فيه [[email]] هو اللي بيكسب. ولو اتكتب قبله، الافتراضي كان هيغلب اللي انت باعته.
- [[role]] مش مكتوب: القاعدة بتحط الافتراضي اللي في الـ schema ([[@default(USER)]]).

### [[jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5m" })]]

- الـ payload: [[sub]] (subject، يعني صاحب التوكن) و [[role]]. بيتعمل **بعد** [[create]]، فبياخد [[user.role]] الحقيقي اللي في القاعدة، سواء الافتراضي أو اللي جه من [[overrides]].
- [[process.env.JWT_SECRET]]: نفس السر اللي الـ app بيتحقق بيه، جاي من [[vitest.config.ts]] ([["test-secret"]]).
- [[expiresIn: "5m"]]: ٥ دقايق، كفاية لأي اختبار.

فكّيت توكن الأدمن بـ [[jwt.decode]]:

~~~text الناتج
{ sub: 2, role: 'ADMIN', iat: 1791361501, exp: 1791361801 }
~~~

[[iat]] (issued at) و [[exp]] (expires) بالثواني من ١٩٧٠، والفرق بينهم 300 ثانية = ٥ دقايق.

### [[return { ...user, token }]]

object جديد فيه كل حقول اليوزر، وزيادة عليهم [[token]]. فالاختبار بيكتب [[user.id]] و [[user.token]] من نفس المتغير.

---

## ٣. [[createOrder(user, overrides = {})]]

~~~javascript
return db.order.create({ data: { userId: user.id, amountCents: 5000, ...overrides } });
~~~

- بتاخد [[user]] صريح: انت اللي بتقرر الطلب بتاع مين.
- مفيش [[async]]: بترجّع الـ Promise بتاع Prisma على طول، واللي نادى يعمل [[await]]. نفس النتيجة.

---

## ٤. اللي رجع فعلًا

في اختبار واحد ناديت:

~~~javascript
const u = await createUser();
const admin = await createUser({ role: "ADMIN", email: "boss@test.local" });
const o = await createOrder(u);
const o2 = await createOrder(u, { amountCents: 100 });
~~~

~~~text الناتج
{ id: 1, email: 'user3@test.local', role: 'USER', token: 'eyJhbGciOiJIUzI1...' }
{ id: 2, email: 'boss@test.local', role: 'ADMIN', token: '...' }
{ id: 'cmuxudwrl0001nkie14fya9x5', userId: 1, amountCents: 5000, status: 'PENDING', checkoutUrl: null, gatewayTxId: null }
{ id: 'cmuxudwrr0002nkiexz6k32b2', userId: 1, amountCents: 100, status: 'PENDING', checkoutUrl: null, gatewayTxId: null }
~~~

لاحظ ٣ حاجات:

1. [[id: 1]] بس الإيميل [[user3]]: الـ TRUNCATE رجّع عداد القاعدة لـ 1، بس [[n]] في الـ JavaScript مبيرجعش (كان فيه اختبار قبله في نفس الملف عمل يوزرين). ومش مشكلة: المهم الإيميل ميتكررش.
2. [[boss@test.local]] و [[ADMIN]]: الـ overrides غلبت الافتراضي.
3. [[amountCents: 100]] في الطلب التاني، و [[status: 'PENDING']] من [[@default]] في الـ schema.

---

## ٥. الـ solCode: «الأدمن يقدر يمسح طلب أي حد»

~~~javascript
it("admin can delete anyone's order", async () => {
  const order = await createOrder(await createUser());
  const admin = await createUser({ role: "ADMIN" });
  const res = await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{admin.token}$__bt);
  expect(res.status).toBe(204);
  expect(await db.order.findUnique({ where: { id: order.id } })).toBeNull();
});
~~~

- [[createOrder(await createUser())]]: من جوه لبرة: اعمل يوزر، وبعدين طلب ليه. سطر واحد وواضح مين صاحب الطلب.
- [[204]]: No Content، تم ومفيش body.
- [[findUnique(...)]] + [[toBeNull()]]: اتأكد من القاعدة إن المسح حصل فعلًا، مش بس إن الرد قال كده.

~~~text الناتج
 ✓ tests/admin.test.ts > admin can delete anyone's order
~~~

وبنفس الـ factories، يوزر عادي بيحاول يمسح طلبه هو:

~~~text الناتج
normal user DELETE: 403 { error: 'Forbidden' }
~~~

الفرق بين الاختبارين كلمة واحدة في [[overrides]]، وده اللي بيخلي الـ factory مفيدة في اختبارات الصلاحيات (الدرس الجاي).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[n]] | إيميل مختلف كل مرة عشان [[@unique]] |
| [[overrides = {}]] + [[...overrides]] في الآخر | غيّر أي حقل، واللي تبعته يكسب |
| [[jwt.sign]] بعد [[create]] | التوكن فيه الـ role الحقيقي، ومن غير login |
| [[createOrder(user)]] | صاحب الطلب مكتوب في الاختبار |
| [[return { ...user, token }]] | كل حاجة في متغير واحد |`,
          lines: [
            "jsonwebtoken عشان نعمل توكن من غير login.",
            "نفس الـ Prisma client.",
            "عداد عشان كل إيميل يبقى فريد.",
            "factory لليوزر، وأي حقل ممكن يتغيّر.",
            "زوّد العداد.",
            "اعمل اليوزر بإيميل فريد، و overrides تغلب الافتراضي.",
            "توكن بنفس السر اللي الـ app شايفه في الاختبار، عمره قصير.",
            "رجّع اليوزر ومعاه التوكن.",
            "قفلة.",
            "factory للطلب، بتاخد صاحبه صريح.",
            "طلب بمبلغ افتراضي، وأي حقل ممكن يتغيّر.",
            "قفلة."
          ],
          sol: R`الاختبار بيعمل صاحب الطلب، والطلب، والأدمن، والـ DELETE، ويتأكد إن الرد 204 وإن الطلب مبقاش موجود في القاعدة. مش كفاية تبص على الـ status: لازم تتأكد إن المسح حصل فعلًا.

لو رجع 403، يبقى الـ role مش في التوكن: الـ factory لازم تعمل [[jwt.sign]] بعد ما تعمل اليوزر بالـ role اللي اتبعت، مش قبله. ولو رجع 404، يبقى الـ route بيدوّر على الطلب بـ [[userId]] الأدمن (ownership) حتى في مسار الأدمن.`,
          solCode: R`it("admin can delete anyone's order", async () => {
  const order = await createOrder(await createUser());
  const admin = await createUser({ role: "ADMIN" });
  const res = await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{admin.token}$__bt);
  expect(res.status).toBe(204);
  expect(await db.order.findUnique({ where: { id: order.id } })).toBeNull();
});`
        },
        {
          cmd: "401 و 403 و 404",
          title: "مصفوفة الصلاحيات: كل route فيه :id يتختبر بيوزرين",
          desc: R`أي route فيه [[:id]] ليه على الأقل ٤ اختبارات: من غير توكن 401، وصاحب الحاجة 200، ويوزر تاني 404 (مش 200 ولا 403)، ويوزر معندوش الـ role المطلوب 403.

أخطر bug في أي API إن يوزر B يشوف أو يعدّل حاجة يوزر A بمجرد ما يغيّر الرقم في الـ URL (IDOR، درس [[ownership (IDOR)]]). الاختبار ده بيمسكه قبل ما حد تاني يمسكه.`,
          example: R`describe("GET /api/orders/:id", () => {
  it("401 without a token", async () => {
    expect((await request(app).get("/api/orders/anything")).status).toBe(401);
  });
  it("200 for the owner", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt);
    expect(res.status).toBe(200);
  });
  it("404 for another user", async () => {
    const [a, b] = [await createUser(), await createUser()];
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{b.token}$__bt);
    expect(res.status).toBe(404);
  });
  it("403 for a non-admin on DELETE", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    expect((await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt)).status).toBe(403);
  });
});`,
          try: R`اختار route عندك فيه [[:id]] بيعدّل حاجة (PATCH أو DELETE)، واكتبله الأربع حالات. وبعدين «اكسر» الـ service: شيل [[userId]] من الـ where، وشغّل الاختبارات. لازم اختبار «يوزر تاني» يقع. لو ماوقعش، الاختبار نفسه غلط.`,
          flag: "script",
          deep: {
            why: R`الـ auth middleware بيتأكد انت مين، بس مبيعرفش الحاجة دي بتاعة مين. كل route لازم يعمل الفحص ده بنفسه، وسهل جدًا واحد منهم ينسى. واختبار «يوزر تاني» هو الطريقة الوحيدة اللي تتأكد بيها إن كل route فاكر، ومش بتعتمد على مراجعة الكود بعينك.`,
            how: R`[[401 Unauthorized]]: مش عارفين انت مين (مفيش توكن، أو غلط، أو خلص). [[403 Forbidden]]: عارفينك، بس الـ role بتاعك مش مسموحله بالعملية دي خالص (يوزر عادي على route أدمن). [[404 Not Found]]: الحاجة دي مش موجودة بالنسبة لك.

ليه 404 مش 403 ليوزر تاني؟ لأن 403 معناها «موجود بس مش بتاعك»، وده بيسرّب معلومة: المهاجم يعرف إن الـ id ده موجود، ويقدر يعد الطلبات أو اليوزرز. لو الـ query نفسها فيها [[userId]] ([[findFirst({ where: { id, userId } })]])، الـ 404 بتطلع لوحدها من غير if زيادة.

و GET مش كفاية: كرر نفس المصفوفة على PATCH و DELETE، لأن غلطة مشهورة إن الـ GET محمي والـ update بيعمل [[update({ where: { id } })]] من غير userId. ولو فيه routes كتير، اعمل الاختبارات بـ [[it.each]] على قايمة من [method, path] عشان متكتبش نفس الكود ٢٠ مرة.

وفي Nest نفس الفكرة بالظبط، والاختبار نفسه بـ supertest (درس «Nest: الاختبارات»).`,
            when: "كل route فيه :id أو بيرجّع داتا خاصة بيوزر. ده من أهم الاختبارات في المشروع كله، وأولى من اختبارات كتير تانية.",
            mistakes: R`اختبار الصلاحيات بيوزر واحد بس (صاحب الحاجة)، فالاختبار ينجح والـ IDOR موجود. أو ترجّع 403 ليوزر تاني فتسرّب إن الحاجة موجودة. أو 403 للتوكن الغلط بدل 401، فالواجهة متعرفش إنها لازم تعمل refresh أو تودّي على login. وفي الانترفيو: «الفرق بين 401 و 403؟» قول الفرق، وقول ليه بترجّع 404 لحاجة يوزر تاني.`
          },
          teach: R`## ٤ اختبارات = ٤ أسئلة عن نفس الـ route

المثال [[describe]] واحد لـ [[GET /api/orders/:id]] جواه ٤ حالات: مين انت؟ (401)، صاحب الحاجة (200)، حد تاني (404)، و role مش كفاية (403). كل حالة بتعمل اليوزرين والطلب بتوعها بالـ factories، وبتبعت طلب، وبتتأكد من الـ status.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1، على Postgres 16 في Docker. الـ routes بتاعة الطلبات في التجربة: [[GET]] بيعمل [[findFirst({ where: { id, userId } })]]، و [[PATCH]] بيعمل [[updateMany]] بنفس الشرط، و [[DELETE]] عليه [[requireRole("ADMIN")]]. والأخطاء بترجع [[{ error: "..." }]] من الـ error handler.

---

## ١. [[401 without a token]]

~~~javascript
expect((await request(app).get("/api/orders/anything")).status).toBe(401);
~~~

من جوه لبرة: [[request(app).get(...)]] طلب من غير [[Authorization]]، و [[await]] يبعته، والأقواس حوالين الاتنين عشان ناخد [[.status]] من الرد، و [[expect(...).toBe(401)]].

الـ id هنا [["anything"]] مش id حقيقي: [[requireAuth]] بيوقف الطلب قبل ما حد يدوّر في القاعدة، فمش فارق. الرد كان [[{"error":"Login required"}]].

---

## ٢. [[200 for the owner]]

~~~javascript
const a = await createUser();
const order = await createOrder(a);
const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt);
expect(res.status).toBe(200);
~~~

يوزر [[a]] عنده طلب، وبيطلبه بتوكنه. ده «الطريق السعيد»، ولازم يبقى موجود: من غيره ممكن الـ route يرجّع 404 لكل الناس وكل اختبارات الرفض تنجح.

---

## ٣. [[404 for another user]]: أهم واحد

~~~javascript
const [a, b] = [await createUser(), await createUser()];
const order = await createOrder(a);
const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{b.token}$__bt);
expect(res.status).toBe(404);
~~~

- [[const [a, b] = ...]]: على اليمين array فيه يوزرين، والـ destructuring بيحطهم في [[a]] و [[b]]. الـ [[await]] جوه الـ array بيتنفذوا بالترتيب.
- الطلب بتاع [[a]]، والتوكن بتاع [[b]].

الـ query فيها [[userId: req.user.id]]، فبالنسبة لـ [[b]] مفيش طلب بالـ id ده، و [[findFirst]] بيرجّع [[null]]، والـ route يرمي 404. الرد: [[{"error":"Not found"}]].

---

## ٤. [[403 for a non-admin on DELETE]]

~~~javascript
expect((await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt)).status).toBe(403);
~~~

[[a]] بيحاول يمسح طلبه **هو**. مفيش مشكلة ملكية، بس [[requireRole("ADMIN")]] بيوقفه: انت معروف، بس مش مسموحلك بالعملية دي. الرد: [[{"error":"Forbidden"}]].

---

## ٥. الناتج

~~~bash
npx vitest run tests/perms.test.ts --reporter=verbose
~~~

~~~text الناتج
 ✓ tests/perms.test.ts > GET /api/orders/:id > 401 without a token 119ms
 ✓ tests/perms.test.ts > GET /api/orders/:id > 200 for the owner 91ms
 ✓ tests/perms.test.ts > GET /api/orders/:id > 404 for another user 49ms
 ✓ tests/perms.test.ts > GET /api/orders/:id > 403 for a non-admin on DELETE 42ms
 ✓ tests/perms.test.ts > get by another user is 404 58ms
 ✓ tests/perms.test.ts > patch by another user is 404 54ms
      Tests  6 passed (6)
~~~

آخر سطرين من الـ solCode (تحت).

---

## ٦. «اكسر» الـ route: الـ try

شلت [[userId]] من الـ where في [[GET]] بس، وشغّلت تاني:

~~~text الناتج
 ✓ ... > 401 without a token
 ✓ ... > 200 for the owner
 × ... > 404 for another user
   → expected 200 to be 404 // Object.is equality
 ✓ ... > 403 for a non-admin on DELETE
 × tests/perms.test.ts > get by another user is 404
   → expected 200 to be 404 // Object.is equality
 ✓ tests/perms.test.ts > patch by another user is 404
      Tests  2 failed | 4 passed (6)
~~~

- [[expected 200 to be 404]]: يوزر [[b]] أخد طلب [[a]] بـ 200. ده الـ IDOR بالظبط.
- باقي الاختبارات **نجحت**، حتى الـ 200 والـ 401. يعني لو كان عندك اختبار صاحب الحاجة بس، الثغرة كانت هتعدّي.
- [[patch]] نجح لأني مكسرتهوش: كل route ليه شرطه، فكل route محتاج اختباره.

---

## ٧. الـ solCode: [[it.each]]

~~~javascript
it.each([
  ["get", (id) => $__bt/api/orders/$__{id}$__bt],
  ["patch", (id) => $__bt/api/orders/$__{id}$__bt],
])("%s by another user is 404", async (method, path) => { ... });
~~~

- [[it.each(table)]]: نفس الاختبار مرة لكل صف. كل صف array، وعناصره بتتبعت كـ parameters للدالة: [[method]] و [[path]].
- [[(id) => $__bt/api/orders/$__{id}$__bt]]: دالة بتبني العنوان، لأن الـ id مش معروف غير لما الطلب يتعمل جوه الاختبار.
- [["%s by another user is 404"]]: [[%s]] بتتبدل بأول عنصر في الصف، فالأسماء بقت [[get by another user is 404]] و [[patch by another user is 404]] زي ما شفنا.
- [[request(app)[method](...)]]: الأقواس المربعة بتنادي الدالة اللي اسمها في المتغير، فـ [[request(app)["get"](url)]] هي نفسها [[request(app).get(url)]].
- [[.send({})]]: body فاضي. الـ GET بيتجاهله، والـ PATCH محتاج body.

---

## الخلاصة

| الحالة | مين | المتوقع | بيمسك إيه |
|---|---|---|---|
| من غير توكن | محدش | 401 | route نسي [[requireAuth]] |
| صاحب الحاجة | [[a]] | 200 | الـ route شغال أصلًا |
| يوزر تاني | [[b]] على حاجة [[a]] | 404 | IDOR: ناقص [[userId]] في الـ where |
| role ناقص | [[a]] على DELETE | 403 | route نسي [[requireRole]] |

401 = مش عارفينك، 403 = عارفينك ومش مسموحلك، 404 = الحاجة دي مش موجودة بالنسبة لك.`,
          lines: [
            "مجموعة لـ route واحد.",
            "من غير توكن.",
            "لازم 401.",
            "قفلة.",
            "صاحب الطلب.",
            "يوزر A.",
            "طلب بتاع A.",
            "A بيطلب طلبه.",
            "200.",
            "قفلة.",
            "يوزر تاني.",
            "يوزرين.",
            "الطلب بتاع A.",
            "B بيطلب طلب A بالـ id بتاعه.",
            "404: بالنسبة لـ B الطلب مش موجود.",
            "قفلة.",
            "الـ role.",
            "يوزر عادي.",
            "طلبه هو.",
            "حتى على طلبه، المسح للأدمن بس: 403.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تشيل [[userId]] من الـ where، اختبار «404 for another user» لازم يقع ويقول [[expected 200 to be 404]]: يعني B قدر يوصل لطلب A. ده بالظبط الـ bug اللي الاختبار معمول عشانه. رجّع الشرط والاختبار ينجح تاني.

لو الاختبار فضل ناجح وانت شايل الشرط، يبقى الاختبار بيستخدم نفس اليوزر للاتنين، أو بيبعت توكن A في الطلبين. اطبع [[a.id]] و [[b.id]] واتأكد إنهم مختلفين.

وممكن تجمع كل الـ routes اللي فيها ownership في اختبار واحد بـ [[it.each]]، زي الكود. الـ DELETE مش في القايمة لأنه للأدمن بس: يوزر B هيوقف عند [[requireRole]] ويرجع 403 قبل ما نوصل لسؤال «الطلب بتاع مين».`,
          solCode: R`it.each([
  ["get", (id) => $__bt/api/orders/$__{id}$__bt],
  ["patch", (id) => $__bt/api/orders/$__{id}$__bt],
])("%s by another user is 404", async (method, path) => {
  const [a, b] = [await createUser(), await createUser()];
  const order = await createOrder(a);
  const res = await request(app)[method](path(order.id)).set("Authorization", $__btBearer $__{b.token}$__bt).send({});
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "msw و nock",
          title: "الاختبار ميكلّمش بوابة الدفع ولا خدمة الإيميل الحقيقية",
          desc: R`أي خدمة برّه (الدفع، والإيميل، والـ SMS، و AI) بتعملها mock على مستوى الشبكة: الكود بتاعك بيعمل [[fetch]] عادي، و msw (أو nock) بيمسك الطلب قبل ما يخرج ويرجّع رد انت كاتبه. كده بتختبر الحالة الناجحة، والخدمة واقعة (503)، والرد البطيء، من غير نت ولا فلوس.

وأي طلب لبرّه ملوش handler لازم يفشل الاختبار، عشان محدش يبعت إيميل حقيقي من CI بالغلط.`,
          example: R`import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const pay = setupServer(
  http.post("https://pay.example.com/intentions", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ checkoutUrl: $__bthttps://pay.example.com/c/$__{body.ref}$__bt });
  }),
);
beforeAll(() => pay.listen({
  onUnhandledRequest(req) {
    if (new URL(req.url).hostname !== "127.0.0.1") throw new Error($__btunmocked: $__{req.method} $__{req.url}$__bt);
  },
}));
afterEach(() => pay.resetHandlers());
afterAll(() => pay.close());

it("returns 502 when the payment provider is down", async () => {
  pay.use(http.post("https://pay.example.com/intentions", () => new HttpResponse(null, { status: 503 })));
  const user = await createUser();
  const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
  expect(res.status).toBe(502);
});`,
          try: R`[[npm i -D msw@2]] (الكود هنا على msw 2)، واعمل handler لخدمة الإيميل اللي بتستخدمها (مثلًا [[POST https://api.resend.com/emails]]) بيحفظ الـ body في array. اختبر إن «نسيت الباسورد» بتبعت إيميل واحد للعنوان الصح وفيه لينك. وبعدين شيل الـ handler وشوف الاختبار بيقع بـ «unmocked».`,
          flag: "script",
          deep: {
            why: R`اختبار بيكلّم Paymob أو Resend الحقيقيين بطيء، ومحتاج مفاتيح في CI، وبيفشل لما خدمتهم تهنّج، وممكن يبعت إيميلات لناس حقيقيين. والأهم: مش هتقدر تجرّب «البوابة رجّعت 503» أو «الرد اتأخر ١٠ ثواني»، ودي بالظبط الحالات اللي الكود بتاعك لازم يتعامل معاها صح.`,
            how: R`msw بيركّب interceptor على [[fetch]] و [[http]] في Node. أي طلب بيطلع بيتقارن بالـ handlers: [[http.post(url, resolver)]]. لو فيه match، الـ resolver بيرجّع [[HttpResponse.json(...)]] والطلب عمره ما بيخرج. و [[pay.use(...)]] جوه اختبار واحد بيضيف handler مؤقت يغلب الأساسي (زي «البوابة واقعة»)، و [[resetHandlers()]] بعد كل اختبار بيشيله.

تفصيلة مهمة جربناها: supertest نفسه بيبعت طلب HTTP للـ app على [[127.0.0.1]]، و msw بيشوف الطلب ده كمان. لو كتبت [[onUnhandledRequest: "error"]] كل اختبارات supertest هتقع. عشان كده الدالة: سيب الـ localhost يعدّي، وأي حاجة تانية [[throw]]. ولاحظ إن [[print.error()]] جوه الدالة في msw 2 بيطبع رسالة بس ومبيوقفش الطلب، فالـ throw هو اللي بيضمن إن الطلب ميخرجش (msw بيرجّعله 500 فيه الرسالة). وخد بالك: msw 3 (نزل آخر سبتمبر 2026) غيّر اسم الخيار لـ [[onUnhandledFrame]] بشكل callback مختلف، والخيار القديم بيتجاهله من غير أي خطأ، فالطلبات بتخرج للنت عادي. عشان كده الدرس مثبّت على msw 2، ولو رقّيت راجع الـ migration guide.

nock بيعمل نفس الفكرة بأسلوب تاني: [[nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" })]]، و [[nock.disableNetConnect()]] مع [[nock.enableNetConnect("127.0.0.1")]] بيقفل أي طلب تاني. من nock 14 بقى بيمسك [[fetch]] كمان. و [[scope.isDone()]] بيقولك الطلب المتوقع اتبعت ولا لأ.

والبديل التالت: الكود ياخد الـ client كـ dependency ([[createApp({ mailer })]]) وتدّيله fake في الاختبار. أبسط للحاجات اللي انت عاملها wrapper، بس مش بيختبر شكل الطلب الحقيقي اللي بيطلع.`,
            when: "أي كود بيكلّم خدمة برّه. الـ msw نفسه بيتستخدم في الواجهة (React) لنفس الغرض، فلو فريقك بيستخدمه هناك خليه نفس الأداة.",
            mistakes: R`[[vi.mock("node-fetch")]] أو mock لدالة داخلية بدل الشبكة: الاختبار بيختبر الـ mock مش الكود. ونسيان [[resetHandlers]] فالـ handler الـ «واقع» يعدّي على الاختبار اللي بعده. و [[onUnhandledRequest: "bypass"]] فطلب ملوش handler يخرج للنت الحقيقي من غير ما حد ياخد باله. وmock بيرجّع شكل رد مختلف عن الخدمة الحقيقية: خد شكل الرد من الـ docs أو من لوج طلب حقيقي، مش من خيالك.`
          },
          teach: R`## سيرفر «وهمي» جوه نفس الـ process بيرد مكان بوابة الدفع

الكود بتاعك بيعمل [[fetch("https://pay.example.com/intentions")]] عادي جدًا. msw بيركّب نفسه على [[fetch]] و [[http]] في Node، فالطلب قبل ما يخرج بيتقارن بقايمة handlers. لو فيه handler للعنوان ده، الـ handler بيرد والطلب عمره ما بيخرج للنت.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1 و msw 2.15.0 و nock 15.0.1، على Postgres 16 في Docker. الـ app فيه [[POST /api/orders]] بيعمل الطلب في القاعدة، وبعدين بيبعت [[{ ref: order.id, amountCents }]] للبوابة، ولو ردها مش [[ok]] بيرمي 502، ولو تمام بيحفظ [[checkoutUrl]] ويرد 201.

---

## ١. الـ imports

- [[setupServer]] من [[msw/node]]: نسخة Node (في المتصفح فيه [[setupWorker]] من [[msw/browser]]).
- [[http]] من [[msw]]: بيعمل handlers: [[http.get]] و [[http.post]]...
- [[HttpResponse]]: بيعمل الرد. [[HttpResponse.json(obj)]] رد JSON بـ 200.

---

## ٢. [[const pay = setupServer(handler)]]

~~~javascript
const pay = setupServer(
  http.post("https://pay.example.com/intentions", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ checkoutUrl: $__bthttps://pay.example.com/c/$__{body.ref}$__bt });
  }),
);
~~~

- [[http.post(url, resolver)]]: أي POST للعنوان ده بالظبط يروح للدالة دي (الـ resolver).
- [[async ({ request }) =>]]: msw بيبعت object، والأقواس [[{ request }]] بتطلّع منه الطلب نفسه. [[request]] هنا [[Request]] عادي زي بتاع [[fetch]].
- [[await request.json()]]: اقرا الـ body اللي الكود بتاعك بعته.
- [[return HttpResponse.json({...})]]: رد شكله زي رد البوابة، والـ [[checkoutUrl]] فيه [[body.ref]]، فالاختبار يقدر يتأكد إن الكود بعت الـ id الصح.

[[setupServer]] لسه مش شغال. السطر ده بيجهّز بس.

---

## ٣. الـ hooks

~~~javascript
beforeAll(() => pay.listen({ onUnhandledRequest(req) { ... } }));
afterEach(() => pay.resetHandlers());
afterAll(() => pay.close());
~~~

| الـ hook | بيعمل إيه |
|---|---|
| [[pay.listen(...)]] قبل كل الاختبارات | ركّب الـ interception على [[fetch]] و [[http]] |
| [[pay.resetHandlers()]] بعد كل اختبار | شيل أي handler اتضاف بـ [[pay.use]] جوه اختبار، وارجع للأساسي |
| [[pay.close()]] في الآخر | فك الـ interception |

### [[onUnhandledRequest(req)]]: لو مفيش handler

~~~javascript
onUnhandledRequest(req) {
  if (new URL(req.url).hostname !== "127.0.0.1") throw new Error($__btunmocked: $__{req.method} $__{req.url}$__bt);
}
~~~

- [[new URL(req.url).hostname]]: الـ host من غير بورت ولا مسار.
- ليه [[127.0.0.1]] بيعدّي؟ لأن supertest نفسه بيبعت طلب HTTP للـ app، و msw بيشوفه كمان. طبعت عنوان طلب supertest: [[http://127.0.0.1:50463/health]]، يعني بورت مؤقت على [[127.0.0.1]].
- أي host تاني: [[throw]].

جربت [[fetch("https://api.github.com/zen")]] جوه اختبار من غير handler:

~~~text الناتج
STATUS 500 application/json unmocked: GET https://api.github.com/zen
~~~

الطلب مخرجش. msw رجّع للكود رد 500 فيه رسالة الخطأ. وده اللي هيخلي الاختبار يقع.

وليه مش [[onUnhandledRequest: "error"]] على طول؟ جربتها وطلب supertest لـ [[/health]] نفسه وقع:

~~~text الناتج
[MSW] Error: intercepted a request without a matching request handler:
InternalError: [MSW] Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.
~~~

---

## ٤. الاختبار: [[pay.use(...)]] للحالة دي بس

~~~javascript
pay.use(http.post("https://pay.example.com/intentions", () => new HttpResponse(null, { status: 503 })));
~~~

- [[pay.use(handler)]]: handler مؤقت **قبل** الأساسي، فهو اللي بيرد.
- [[new HttpResponse(null, { status: 503 })]]: رد من غير body، بـ 503 Service Unavailable (الخدمة واقعة).

وبعدين طلب عادي بـ supertest، و [[expect(res.status).toBe(502)]]. 502 Bad Gateway: «السيرفر اللي ورايا رد غلط»، وده المعنى الصح هنا، مش 500 (غلطة عندي) ولا 503.

~~~text الناتج
 ✓ tests/pay.test.ts > returns 502 when the payment provider is down 199ms
 ✓ tests/pay.test.ts > happy path after resetHandlers 73ms
~~~

الاختبار التاني (زوّدته) بيبعت نفس الطلب ورجع 201: [[resetHandlers()]] شال الـ 503 فرجع الـ handler الأساسي.

---

## ٥. الـ solCode: «نسيت الباسورد» بتبعت إيميل واحد

~~~javascript
const sent = [];
const mail = setupServer(
  http.post("https://api.resend.com/emails", async ({ request }) => {
    sent.push(await request.json());
    return HttpResponse.json({ id: "em_1" });
  }),
);
~~~

الـ handler بيحفظ كل body في [[sent]] ويرد زي Resend. والـ route بتاع [[/api/auth/forgot]] في التجربة بيبعت لـ Resend بـ [[fetch]]. اللي اتحفظ:

~~~text الناتج
SENT [
  {
    from: 'MyApp <hello@example.com>',
    to: [ 'user1@test.local' ],
    subject: 'Reset your password',
    html: '<a href="https://myapp.example.com/reset?token=28fe26fac430d40e7bdb83857274f634">Reset</a>'
  }
]
      Tests  1 passed (1)
~~~

والتأكيدات: [[toHaveLength(1)]] إيميل واحد بس، و [[sent[0].to]] فيه إيميل اليوزر ([[toContain]] لأن [[to]] array)، و [[toMatch(/reset\?token=/)]] regex: [[\?]] لأن [[?]] لوحدها ليها معنى في الـ regex.

ولما غيّرت عنوان الـ handler (كأنه مش موجود):

~~~text الناتج
stderr | dbg/forgot2.test.ts > forgot password sends one email
email failed 500
 FAIL  dbg/forgot2.test.ts > forgot password sends one email
AssertionError: expected [] to have a length of 1 but got +0
~~~

الطلب رجعله الـ 500 بتاع [[unmocked]]، والـ route سجّل [[email failed 500]]، والإيميل مخرجش.

---

## ٦. نفس الفكرة بـ nock

~~~javascript
nock.disableNetConnect(); nock.enableNetConnect("127.0.0.1");
const scope = nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" });
// ... الطلب ...
expect(scope.isDone()).toBe(true);
~~~

- [[disableNetConnect()]]: أي طلب لبرّه يفشل، و [[enableNetConnect("127.0.0.1")]] استثناء لـ supertest.
- [[nock(host).post(path).reply(status, body)]]: رد على طلب واحد بالشكل ده.
- [[scope.isDone()]]: [[true]] لو الطلب المتوقع اتبعت فعلًا.

الاختبار نجح بـ nock 15 (يعني بيمسك [[fetch]])، وطلب لـ GitHub من غير رد اتقفل:

~~~text الناتج
TypeError: fetch failed NetConnectNotAllowedError: Nock: Disallowed net connect for "api.github.com:443/zen"
~~~

الفرق: msw رجّع 500 للكود، و nock خلّى [[fetch]] نفسها ترمي.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[setupServer(http.post(url, fn))]] | رد جاهز لعنوان معين |
| [[listen]] / [[resetHandlers]] / [[close]] | ركّب، ونضّف بعد كل اختبار، وفك |
| [[onUnhandledRequest(req)]] + [[throw]] | سيب [[127.0.0.1]] لـ supertest، وامنع أي حاجة تانية |
| [[pay.use(...)]] | سيناريو لاختبار واحد (الخدمة واقعة) |
| [[sent.push(...)]] | احفظ اللي اتبعت واتأكد منه |

والمثال مكتوب لـ msw 2 ([[npm i -D msw@2]]). آخر نسخة على npm دلوقتي 3.0.2، وجربت عليها نفس [[onUnhandledRequest(req) { throw ... }]] في سكربت لوحده: الدالة اتجاهلت، و msw طبع تحذير بس، والطلب **خرج فعلًا** لـ GitHub ورجع [[200 text/plain]]. ده بالظبط الكلام اللي في الـ deep: من غير ما تغيّر للخيار الجديد، الحماية بتختفي من غير أي خطأ.`,
          lines: [
            "سيرفر msw للـ Node.",
            "أدوات تعريف الـ handlers والردود.",
            "سيرفر وهمي لبوابة الدفع.",
            "أي POST للعنوان ده...",
            "...اقرا الـ body اللي الكود بعته...",
            "...ورجّع رد شكله زي رد البوابة، فيه رقم الطلب.",
            "قفلة الـ handler.",
            "قفلة.",
            "قبل الاختبارات شغّل الـ interception...",
            "...ولأي طلب ملوش handler:",
            "لو مش طلب supertest للـ app على localhost، ارمي خطأ فالطلب ميخرجش.",
            "قفلة.",
            "قفلة.",
            "بعد كل اختبار شيل أي handler مؤقت.",
            "في الآخر اقفل.",
            "اختبار «البوابة واقعة».",
            "handler مؤقت للاختبار ده بس: 503.",
            "يوزر.",
            "اعمل طلب.",
            "الـ API لازم يرد 502 واضح، مش 500 ولا يعلّق.",
            "قفلة."
          ],
          sol: R`المتوقع: الاختبار ينجح، والـ array فيها عنصر واحد، الـ [[to]] بتاعه إيميل اليوزر، والـ [[html]] فيه اللينك. ولما تشيل الـ handler، الاختبار بيقع لأن الطلب رجعله 500 فيه [[unmocked: POST https://api.resend.com/emails]]، والإيميل عمره ما خرج.

لو الاختبار نجح والـ array فاضية، يبقى الإيميل بيتبعت بعد ما الرد يرجع (fire and forget) والاختبار خلص قبله: اعمل await للإرسال في الكود، أو استنى في الاختبار بـ [[vi.waitFor]].

ولو شغلك بـ nock بدل msw، نفس الفكرة في الكود التاني.`,
          solCode: R`const sent = [];
const mail = setupServer(
  http.post("https://api.resend.com/emails", async ({ request }) => {
    sent.push(await request.json());
    return HttpResponse.json({ id: "em_1" });
  }),
);
beforeAll(() => mail.listen({ onUnhandledRequest(req) { if (new URL(req.url).hostname !== "127.0.0.1") throw new Error("unmocked: " + req.url); } }));
afterAll(() => mail.close());

it("forgot password sends one email", async () => {
  const user = await createUser();
  const res = await request(app).post("/api/auth/forgot").send({ email: user.email });
  expect(res.status).toBe(200);
  expect(sent).toHaveLength(1);
  expect(sent[0].to).toContain(user.email);
  expect(sent[0].html).toMatch(/reset\?token=/);
});

// نفس الفكرة بـ nock:
// nock.disableNetConnect(); nock.enableNetConnect("127.0.0.1");
// const scope = nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" });
// ... expect(scope.isDone()).toBe(true);`
        },
        {
          cmd: "اختبار الـ webhook",
          title: "webhook: توقيع صح، وتوقيع غلط، ونفس الحدث مرتين",
          desc: R`الـ webhook ليه ٣ اختبارات لازم تبقى موجودة: توقيع صح فالطلب يتفعّل، وتوقيع غلط فيرجع 401 ومفيش حاجة تتغير في القاعدة، ونفس الحدث يوصل مرتين فالرد 200 في المرتين والأثر يحصل مرة واحدة.

الاختبار بيحسب التوقيع بنفس السر ونفس الطريقة اللي البوابة بتستخدمها، وبيبعت الـ body كنص خام بالظبط زي ما اتوقّع.`,
          example: R`import crypto from "node:crypto";

const sign = (raw) => crypto.createHmac("sha256", "test-whsec").update(raw).digest("hex");
const send = (raw, sig) => request(app).post("/webhooks/pay").set("Content-Type", "application/json").set("X-Signature", sig).send(raw);

it("rejects a bad signature and changes nothing", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_2" });
  expect((await send(raw, sign(raw + "x"))).status).toBe(401);
  expect((await db.order.findUnique({ where: { id: order.id } })).status).toBe("PENDING");
});

it("same event twice = one effect", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_3" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect(await db.order.count({ where: { gatewayTxId: "tx_3" } })).toBe(1);
});`,
          try: R`اكتب الاختبار التالت الناقص: توقيع صح فالطلب يبقى PAID. وبعدين جرّب تبعت نفس الـ JSON بس بمسافة زيادة ([[JSON.stringify(obj, null, 1)]]) مع التوقيع بتاع النسخة من غير مسافات. المفروض يرجع 401. فكّر ليه، وليه ده معناه إن الـ route لازم يقرا الـ raw body.`,
          flag: "script",
          deep: {
            why: R`الـ webhook هو الـ endpoint اللي بيحوّل «طلب» لـ «مدفوع» (درس [[webhook الدفع]] في «تاب بناء مشروع كامل»). أي غلطة فيه معناها فلوس: يا طلبات بتتفعّل من غير دفع، يا ناس دفعت ومخدتش حاجة، يا اشتراك اتضاف مرتين. والبوابات بتعيد الإرسال لو ماردّتش بسرعة، فالتكرار مش احتمال نظري، ده بيحصل كل يوم.`,
            how: R`التوقيع بيتحسب على البايتات بالظبط. لو الـ route بيعمل [[express.json()]] الأول وبعدين [[JSON.stringify(req.body)]] عشان يحسب، أي فرق في المسافات أو ترتيب المفاتيح هيبوّظ المقارنة. عشان كده الـ route ده بياخد [[express.raw({ type: "application/json" })]] قبل الـ [[express.json()]] العام، ويحسب HMAC على الـ Buffer، ويقارن بـ [[timingSafeEqual]] (بعد ما يتأكد إن الطولين زي بعض، وإلا بيرمي). وفي الاختبار [[.send(raw)]] بنص جاهز عشان supertest ميعيدش التنسيق. (بعض البوابات زي Paymob بتوقّع حقول معينة بترتيب معين مش الـ body كله: شوف درس «التحقق من التوقيع» في تاب «Node و npm».)

التوقيع الغلط: مش كفاية الـ 401، لازم تقرا من القاعدة وتتأكد إن الطلب لسه PENDING. أوقات الكود بيحدّث الأول وبعدين يتحقق.

التكرار: اختبرت الـ idempotency بإنك بعت نفس الحدث مرتين وعدّيت الأثر. الكود بيعملها بـ [[updateMany]] بشرط [[status: { not: "PAID" }]]، و [[gatewayTxId]] عليه [[@unique]] كحارس أخير. والرد 200 في المرة التانية كمان: لو رجّعت 409 أو 500، البوابة هتفتكر إنه فشل وتفضل تعيد.

وحالات تانية تستاهل اختبار لو البوابة بتبعتها: دفعة فاشلة بعد نجاح (لازم يفضل PAID)، ومبلغ مختلف عن مبلغ الطلب (يتسجّل ومفيش تفعيل)، وطلب مش موجود (200 ومفيش crash).`,
            when: "أي webhook: دفع، أو اشتراكات، أو GitHub، أو تيليجرام. ولو بتستقبل الحدث وتحطه في queue، اختبر الـ route (توقيع و 200 سريعة) والـ worker (idempotent) كل واحد لوحده.",
            mistakes: R`اختبار التوقيع الصح بس، فمحدش اكتشف إن الكود بيقبل أي توقيع طوله صح. أو حساب التوقيع على [[JSON.stringify(req.body)]] بعد الـ parse. أو اختبار التكرار بإنك تبعت حدثين مختلفين. ونسيان إن الـ webhook route لازم يبقى قبل [[express.json()]] العام وإلا [[req.body]] يوصله object مش Buffer. وفي الانترفيو: «إزاي تتأكد إن الـ webhook مش بيتعالج مرتين؟» الإجابة: شرط على الحالة، و unique على id المعاملة، ورد 200 للتكرار.`
          },
          teach: R`## دالتين مساعدين، واختبارين بيقروا من القاعدة

[[sign(raw)]] بتحسب التوقيع زي ما البوابة بتحسبه، و [[send(raw, sig)]] بتبعت الحدث للـ webhook كنص خام ومعاه التوقيع. وبعدين كل اختبار بيبعت، ويتأكد من الـ status، **ويقرا من القاعدة** يشوف إيه اللي اتغير فعلًا.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1، على Postgres 16 في Docker. الـ route في التجربة [[POST /webhooks/pay]] متركّب قبل [[express.json()]] العام، وبياخد [[express.raw({ type: "application/json" })]]، ويحسب HMAC على الـ Buffer بالسر [[WEBHOOK_SECRET]] ([["test-whsec"]] في vitest.config)، ويقارن بـ [[timingSafeEqual]]، وبعدين [[updateMany]] بشرط [[status: { not: "PAID" }]]، و [[gatewayTxId]] عليه [[@unique]].

---

## ١. [[const sign = (raw) => crypto.createHmac("sha256", "test-whsec").update(raw).digest("hex")]]

من الشمال لليمين:

| الحتة | بتعمل إيه |
|---|---|
| [[crypto.createHmac("sha256", "test-whsec")]] | جهّز HMAC بخوارزمية SHA-256 والسر ده |
| [[.update(raw)]] | ده النص اللي هيتوقّع |
| [[.digest("hex")]] | خلّص واطلع النتيجة hex (أرقام وحروف من 0 لـ f) |

HMAC = Hash-based Message Authentication Code: بصمة للنص محدش يقدر يعملها غير اللي معاه السر. والسر هنا لازم يبقى **نفس** السر اللي الـ app شايفه في الاختبار، وإلا كل التوقيعات هتطلع غلط.

طبعت التوقيع لنص واحد وتعديلات صغيرة عليه:

~~~text الناتج
raw: {"orderId":"ord_1","txId":"tx_1"}
sign(raw):     5c664fe0b95351ea926e4646129e0b50f92b028516ccd4f50529d23ce2999d30
sign(raw+x):   91078c6f3d6ff91a3077f8d1fe998e1527ada18c09688933f5096845608fde16
sign(pretty):  2f99927bf27dc3a92844abda215dd112f040190ff8a4d39ee90c2415bf5f9f42
~~~

٦٤ حرف hex = 32 بايت = 256 بت (عشان كده SHA-256). وحرف [[x]] زيادة، أو مسافات زيادة، بيطلّعوا بصمة مختلفة خالص.

---

## ٢. [[const send = (raw, sig) => request(app).post("/webhooks/pay").set(...).set(...).send(raw)]]

- [[.set("Content-Type", "application/json")]]: لازم نقولها بنفسنا. جربت: [[.send(object)]] بيحط [[application/json]]، لكن [[.send(string)]] من غير [[.set]] بيحط [[application/x-www-form-urlencoded]] (نوع الفورم العادي). ومن غير النوع الصح [[express.raw({ type: "application/json" })]] مش هيقرا الـ body.
- [[.set("X-Signature", sig)]]: التوقيع في header، زي ما البوابة بتبعته.
- [[.send(raw)]]: النص زي ما هو. لو بعتنا object، supertest هيعمله [[JSON.stringify]] بطريقته، والتوقيع لازم يتحسب على نفس البايتات بالظبط.
- مفيش [[await]] هنا: الدالة بترجّع الطلب، والاختبار هو اللي يعمل [[await send(...)]].

---

## ٣. [[rejects a bad signature and changes nothing]]

~~~javascript
const order = await createOrder(await createUser());
const raw = JSON.stringify({ orderId: order.id, txId: "tx_2" });
expect((await send(raw, sign(raw + "x"))).status).toBe(401);
expect((await db.order.findUnique({ where: { id: order.id } })).status).toBe("PENDING");
~~~

- [[sign(raw + "x")]]: توقيع صح لنص **تاني**. يعني توقيع شكله سليم وطوله صح، بس مش بتاع الحدث ده.
- الرد كان [[401 { error: 'Bad signature' }]].
- السطر الأخير بيقرا الطلب من القاعدة: لسه [[PENDING]]. الـ 401 لوحده مش كفاية لو الكود حدّث الأول وبعدين رفض.

وتوقيع طوله غلط ([["abc"]]) رجع نفس الـ 401. ده مهم لأن [[crypto.timingSafeEqual]] بيرمي لو الطولين مختلفين:

~~~text الناتج
ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH Input buffers must have the same byte length
~~~

فالـ route لازم يقارن الطول الأول، وإلا التوقيع القصير يبقى 500 بدل 401.

---

## ٤. [[same event twice = one effect]]

~~~javascript
expect((await send(raw, sign(raw))).status).toBe(200);
expect((await send(raw, sign(raw))).status).toBe(200);
expect(await db.order.count({ where: { gatewayTxId: "tx_3" } })).toBe(1);
~~~

نفس الحدث بالحرف مرتين، زي ما البوابة بتعمل لو ردك اتأخر:

~~~text الناتج
1st: 200 { received: true } 2nd: 200 { received: true }
{ id: 'cmuxujttf0004i4ieqfnjjis4', userId: 1, amountCents: 5000, status: 'PAID', checkoutUrl: null, gatewayTxId: 'tx_5' }
~~~

- المرة التانية 200 كمان: لو رجّعت خطأ، البوابة هتفضل تعيد.
- [[db.order.count({ where: { gatewayTxId } })]] = 1: الأثر حصل مرة واحدة. في المرة التانية الشرط [[status: { not: "PAID" }]] مطابقش أي صف، فـ [[updateMany]] عدّل صفر.

---

## ٥. الـ solCode

### [[marks the order PAID with a valid signature]]

توقيع صح، و 200، و [[toMatchObject({ status: "PAID", gatewayTxId: "tx_1" })]] على الصف اللي في القاعدة.

### [[pretty JSON with the compact signature is rejected]]

~~~javascript
const obj = { orderId: order.id, txId: "tx_9" };
expect((await send(JSON.stringify(obj, null, 1), sign(JSON.stringify(obj)))).status).toBe(401);
~~~

[[JSON.stringify(obj, null, 1)]]: التالت هو عدد مسافات الإزاحة، فبيطلع:

~~~text الناتج
{
 "orderId": "ord_1",
 "txId": "tx_1"
}
~~~

نفس الداتا، بايتات مختلفة. التوقيع اتحسب على النسخة المضغوطة، والـ route حسب على اللي وصل فعلًا (المفرودة)، فـ 401. ولو الـ route كان بيحسب على [[JSON.stringify(req.body)]] بعد الـ parse، كان هيرجّع النسخة المضغوطة ويقبل. جربت الحسبة دي لوحدها: [[sign(JSON.stringify(JSON.parse(pretty))) === sign(compact)]] طلعت [[true]]. يعني الـ route الغلط بيوافق على بايتات البوابة مبعتتهاش، وبيرفض بوابة بتبعت JSON مفرود حقيقي.

~~~text الناتج
 ✓ tests/webhook.test.ts > rejects a bad signature and changes nothing 195ms
 ✓ tests/webhook.test.ts > same event twice = one effect 73ms
 ✓ tests/webhook.test.ts > marks the order PAID with a valid signature 56ms
 ✓ tests/webhook.test.ts > pretty JSON with the compact signature is rejected 48ms
~~~

---

## الخلاصة

| الاختبار | بيبعت | المتوقع | ومن القاعدة |
|---|---|---|---|
| توقيع صح | [[sign(raw)]] | 200 | [[PAID]] و [[gatewayTxId]] |
| توقيع غلط | [[sign(raw + "x")]] | 401 | لسه [[PENDING]] |
| نفس الحدث مرتين | [[sign(raw)]] × 2 | 200 و 200 | صف واحد بالـ [[txId]] ده |
| JSON مفرود بتوقيع المضغوط | بايتات مختلفة | 401 | الـ route بيحسب على الـ raw body |

والقاعدة: [[.send(raw)]] نص جاهز و [[Content-Type]] بإيدك، والسر نفس سر الـ app.`,
          lines: [
            "crypto من Node.",
            "دالة بتحسب التوقيع بنفس سر الاختبار ونفس الخوارزمية اللي الـ route بيستخدمها.",
            "دالة بتبعت نص خام بالتوقيع في header.",
            "توقيع غلط.",
            "طلب لسه PENDING.",
            "الحدث كنص.",
            "توقيع لنص تاني: لازم 401.",
            "واقرا من القاعدة: الطلب متغيّرش.",
            "قفلة.",
            "نفس الحدث مرتين.",
            "طلب.",
            "حدث واحد.",
            "المرة الأولى 200.",
            "والتانية 200 برضه، عشان البوابة تبطّل تعيد.",
            "والأثر حصل مرة واحدة بس.",
            "قفلة."
          ],
          sol: R`الاختبار الناقص: توقيع صح، والرد 200، والطلب في القاعدة بقى [[PAID]] و [[gatewayTxId]] بتاعه [[tx_1]].

ونسخة الـ JSON بالمسافات بترجع 401 لأن التوقيع اتحسب على نص تاني، والـ HMAC بيتغير لو اتغيّر بايت واحد. البوابة بتوقّع البايتات اللي بعتتها بالظبط، فانت لازم تحسب على نفس البايتات اللي وصلت (الـ raw body)، مش على object عملتله parse وبعدين stringify.

لو النسخة بالمسافات عدّت، يبقى الـ route بيحسب على [[JSON.stringify(req.body)]]، وده هيقع مع أول بوابة بتبعت JSON بتنسيق مختلف عن بتاع Node.`,
          solCode: R`it("marks the order PAID with a valid signature", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_1" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  const saved = await db.order.findUnique({ where: { id: order.id } });
  expect(saved).toMatchObject({ status: "PAID", gatewayTxId: "tx_1" });
});

it("pretty JSON with the compact signature is rejected", async () => {
  const order = await createOrder(await createUser());
  const obj = { orderId: order.id, txId: "tx_9" };
  expect((await send(JSON.stringify(obj, null, 1), sign(JSON.stringify(obj)))).status).toBe(401);
});`
        }
      ]
    }
]);
