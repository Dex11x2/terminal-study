// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "Hono: API واحدة على Node و Bun و Deno و Workers",
      l: 2,
      n: "framework صغير مبني على Request و Response، فنفس الكود بيشتغل على أي runtime، ومعاه middleware و validation بـ zod و client متأمّن بالأنواع",
      items: [
        {
          cmd: "Hono",
          title: "أول API بـ Hono: routes و c.json و app.request",
          desc: R`Hono framework صغير شبه Express، بس مبني على [[Request]] و [[Response]] القياسيين بدل [[req]]/[[res]] بتوع Node. كل handler بياخد [[c]] (الـ Context): [[c.req.param("id")]] و [[c.req.query("q")]] و [[c.req.json()]]، ويرجّع [[c.json(data, status)]] أو [[c.text(...)]].

و [[app.request("/path")]] بيجرّب الـ API من غير سيرفر ولا بورت: مثالي للاختبارات. اتجرّب بـ Hono 4.13.14.`,
          example: R`import { Hono } from "hono";
type User = { id: number; name: string };
const users: User[] = [{ id: 1, name: "Sara" }, { id: 2, name: "Ali" }];
const app = new Hono();
app.get("/", (c) => c.text("hello from Hono"));
app.get("/api/users", (c) => {
  const q = c.req.query("q")?.toLowerCase();
  return c.json(q ? users.filter((u) => u.name.toLowerCase().includes(q)) : users);
});
app.get("/api/users/:id", (c) => {
  const user = users.find((u) => u.id === Number(c.req.param("id")));
  if (!user) return c.json({ error: "not found" }, 404);
  return c.json(user);
});
app.post("/api/users", async (c) => {
  const body = await c.req.json<{ name: string }>();
  const user = { id: users.length + 1, name: body.name };
  users.push(user);
  return c.json(user, 201);
});
export default app;`,
          try: R`احفظ المثال [[src/app.ts]] (و [[npm i hono]]). اعمل [[src/app.test.ts]] بيستورد [[app]] ويعمل [[await app.request("/api/users/2")]] ويطبع الـ status والـ JSON، وبعدين [[POST]] بـ body، وبعدين [[/nope]]. شغّله بـ [[node src/app.test.ts]]: من غير ما تشغّل سيرفر.`,
          flag: "script",
          deep: {
            why: R`Express مربوط بـ [[http]] بتاع Node. Hono مبني على معايير الويب، فنفس الـ app يشتغل على Node و Bun و Deno و Cloudflare Workers و Vercel وغيرهم (درس [[Hono على كل runtime]]). وصغير، وفيه أنواع TypeScript كويسة لحد ما تعمل client من الأنواع (درس [[Hono + zod]]).`,
            how: R`[[new Hono()]] بيعمل app فيه router. [[app.get(path, handler)]] بيسجّل مسار. الـ handler بياخد [[c]] (Context): [[c.req]] غلاف حوالين [[Request]] فيه [[param]] و [[query]] و [[header]] و [[json()]]، و [[c.json(data, status)]] بيرجّع [[Response]] JSON.

[[app.fetch]] دالة [[(Request) => Response]]: ده كل اللي أي runtime محتاجه. و [[app.request(path, init)]] بيعمل [[Request]] وينادي [[app.fetch]] جوه نفس البرنامج، فالاختبار مش محتاج سيرفر.

[[c.req.json<{ name: string }>()]]: الـ [[<...>]] بيقول لـ TypeScript شكل الـ body، بس **مبيتحققش** منه وقت التشغيل. التحقق في درس [[Hono + zod]].`,
            when: R`API جديدة، خصوصًا لو ممكن تتنقل بين runtimes أو تتنشر على edge (Workers). ولو عندك Express كبير شغال ومستقر، مفيش سبب قوي تنقله.`,
            mistakes: R`تفتكر إن [[c.req.json<T>()]] بيتحقق من الداتا: ده نوع بس. وتنسى [[return]] قبل [[c.json]]، فالـ handler يرجّع undefined والرد يبقى 404. وتقارن [[c.req.param("id")]] بـ [[===]] مع رقم: نص.`
          },
          teach: R`## Hono في ملف واحد

اتجرّب على ويندوز 11 بـ Node 24.22 (اللي بيشغّل [[.ts]] على طول) و Hono 4.13.14.

---

## ١. التجهيز

~~~text src/app.ts (أول ٤ سطور)
import { Hono } from "hono";
type User = { id: number; name: string };
const users: User[] = [{ id: 1, name: "Sara" }, { id: 2, name: "Ali" }];
const app = new Hono();
~~~

- [[type User]]: شكل الـ user لـ TypeScript، و [[User[]]] = array من users.
- [[new Hono()]]: الـ app. كل المسارات بتتسجّل عليه.

---

## ٢. [[app.get("/", (c) => c.text("hello from Hono"))]]

- [[app.get(path, handler)]]: لما ييجي [[GET]] على المسار ده نادي الدالة.
- [[c]]: الـ Context. فيه الطلب ([[c.req]]) وأدوات الرد ([[c.text]] و [[c.json]] و [[c.header]]).
- [[c.text("...")]]: رد نصي بـ [[Content-Type: text/plain]].

---

## ٣. [[c.req.query("q")]]: فلترة

~~~text app.ts
app.get("/api/users", (c) => {
  const q = c.req.query("q")?.toLowerCase();
  return c.json(q ? users.filter((u) => u.name.toLowerCase().includes(q)) : users);
});
~~~

- [[c.req.query("q")]]: قيمة [[?q=...]] في الـ URL، أو [[undefined]].
- [[?.toLowerCase()]]: الـ [[?.]] = «لو مش undefined نادي الدالة، وإلا رجّع undefined» (من غيرها تقع).
- [[q ? A : B]]: لو فيه بحث فلتر، وإلا رجّع الكل.

---

## ٤. [[:id]] و [[c.req.param("id")]]

- [[/api/users/:id]]: [[:id]] جزء متغير.
- [[c.req.param("id")]]: قيمته كنص، و [[Number(...)]] يحوّله.
- [[c.json({ error: "not found" }, 404)]]: الرقم التاني هو الـ status.
- [[if (!user) return ...]]: الـ [[return]] مهمة: من غيرها الكود يكمّل.

---

## ٥. [[POST]] و [[c.req.json()]]

- [[async (c) =>]]: قراية الـ body بتستنى.
- [[c.req.json<{ name: string }>()]]: اقرا الـ body JSON. الـ [[<...>]] نوع لـ TypeScript بس، ومحدش بيتأكد إن [[name]] موجود فعلًا.
- [[c.json(user, 201)]]: [[201 Created]].

---

## ٦. [[export default app]] و [[app.request]]

~~~text src/app.test.ts
import app from "./app.ts";

const res = await app.request("/api/users/2");
console.log(res.status, await res.json());
const res2 = await app.request("/api/users", { method: "POST", body: JSON.stringify({ name: "Mona" }), headers: { "content-type": "application/json" } });
console.log(res2.status, await res2.json());
console.log((await app.request("/nope")).status);
~~~

~~~text node src/app.test.ts
200 { id: 2, name: 'Ali' }
201 { id: 3, name: 'Mona' }
404
~~~

- [[app.request(path, init)]]: بيعمل [[Request]] ويبعته للـ app جوه نفس البرنامج. مفيش بورت ولا شبكة.
- التاني زي [[fetch]] بالظبط: [[method]] و [[body]] و [[headers]].
- [[/nope]]: مسار مش موجود، فـ Hono رجّع [[404]] لوحده.

> [[./app.ts]] بالامتداد: Node وهو بيشغّل [[.ts]] على طول محتاج الامتداد كامل، و Deno كمان.

---

## الخلاصة

| Express | Hono |
|---|---|
| [[req.params.id]] | [[c.req.param("id")]]: الجزء المتغير من المسار، ودايمًا نص |
| [[req.query.q]] | [[c.req.query("q")]]: قيمة من الـ query string، أو [[undefined]] لو مش موجودة |
| [[req.body]] (بعد [[express.json()]]) | [[await c.req.json()]]: بيقرا الـ body وقت ما تطلبه، من غير middleware |
| [[res.status(404).json(x)]] | [[return c.json(x, 404)]]: بترجّع [[Response]]، والـ status الرقم التاني |
| [[supertest]] للاختبار | [[app.request(...)]] جاهز: بيبعت طلب للـ app من غير سيرفر ولا بورت |`,
          lines: [
            R`بيجيب الكلاس [[Hono]] من مكتبة [[hono]] (بعد [[npm i hono]]). منه بنعمل الـ app اللي هنسجّل عليه كل المسارات، وهو مبني على [[Request]] و [[Response]] القياسيين فنفس الكود يشتغل على أي runtime.`,
            R`نوع TypeScript بيوصف شكل الـ user: [[id]] رقم و [[name]] نص. ده للـ editor والـ type checker بس، وبيتشال وقت التشغيل، فمبيتحققش من أي داتا جاية من بره.`,
            R`داتا تجربة في array في الذاكرة بدل قاعدة بيانات، والنوع اللي بعد اسم المتغير بيقول إنها array كل عنصر فيها لازم يبقى [[User]]. أي حاجة تتضاف بتضيع مع الـ restart.`,
            R`بيعمل الـ app: object فيه router بتسجّل عليه المسارات بـ [[app.get]] و [[app.post]]، وفيه [[app.fetch]] اللي أي runtime بيناديها مع كل طلب.`,
            R`[[GET /]] بيرد بنص عادي. [[c]] هو الـ Context: فيه الطلب ([[c.req]]) وأدوات الرد، و [[c.text]] بيرجّع [[Response]] بـ [[Content-Type: text/plain]].`,
            R`[[GET /api/users]]: بيرجّع الليستة، ولو فيه بحث بيفلترها.`,
            R`[[c.req.query("q")]] بيقرا [[?q=]] من الـ URL، وبيرجّع [[undefined]] لو مش موجود، فـ [[?.]] بتمنع إن [[toLowerCase]] تتنادى على [[undefined]] وترمي error. والحروف الصغيرة عشان [[sa]] تلاقي [[Sara]].`,
            R`لو فيه بحث بيرجّع اللي اسمهم فيه الكلمة (بحروف صغيرة برضه)، وإلا الليستة كلها. [[c.json]] بيعمل [[JSON.stringify]] ويحط [[Content-Type: application/json]].`,
            R`قفلة handler الـ [[GET /api/users]].`,
            R`[[GET /api/users/:id]]: [[:id]] جزء متغير في المسار، فـ [[/api/users/2]] بيطابق والـ [[2]] بيتحفظ باسم [[id]].`,
            R`[[c.req.param("id")]] بيرجّع الجزء المتغير، بس دايمًا نص ([["2"]])، و [[===]] بين نص ورقم عمرها ما تطابق، عشان كده [[Number()]].`,
            R`لو ملقاهوش بيرجّع [[404]] بـ JSON فيه السبب. و [[return]] هنا ضرورية: من غيرها الكود يكمّل للسطر اللي بعده ويرجّع [[undefined]] كـ JSON.`,
            R`لقاه: بيرجّعه JSON بـ 200 (الافتراضي لو مكتبتش رقم).`,
            R`قفلة handler الـ [[:id]].`,
            R`[[POST /api/users]]، والـ handler [[async]] لأن قراية الـ body بتاخد وقت ومحتاجة [[await]].`,
            R`[[c.req.json()]] بيقرا الـ body ويحوّله object. و [[<{ name: string }>]] نوع بيقوله لـ TypeScript بس، **مش تحقق**: العميل يقدر يبعت أي حاجة، والتحقق الحقيقي بـ zod في درس [[Hono + zod]].`,
            R`بيعمل user جديد: الـ id من طول الليستة + 1، والاسم بس من الـ body عشان العميل ميضيفش حقول على كيفه.`,
            R`بيضيف الـ user للـ array، فالـ [[GET]] الجاي يرجّعه.`,
            R`بيرجّع الـ user الجديد، والرقم التاني في [[c.json]] هو الـ status: [[201]] = Created، المعنى الصح لـ «اتعمل حاجة جديدة».`,
            R`قفلة handler الـ [[POST]].`,
            R`بيصدّر الـ app من غير ما يشغّل سيرفر. الملفات اللي بتشغّل (Node أو Bun أو Deno) بتستورده وتدّي [[app.fetch]] للسيرفر بتاعها، والاختبارات تستورده وتعمل [[app.request()]] من غير بورت.`,
          ],
          sol: R`[[node src/app.test.ts]] طلّع:
[[200 { id: 2, name: 'Ali' }]]
[[201 { id: 3, name: 'Mona' }]]
[[404]]

من غير ولا سيرفر ولا بورت: [[app.request]] بيبعت الطلب للـ app جوه نفس البرنامج. نفس الملف ده تقدر تحوّله لاختبار vitest بـ [[expect(res.status).toBe(200)]].`
        },
        {
          cmd: "Hono على كل runtime",
          title: "نفس app.ts على Node و Bun و Deno و Cloudflare Workers",
          desc: R`الـ app نفسه ([[src/app.ts]] من الدرس اللي فات) ميعرفش هو شغال على إيه. اللي بيختلف ملف صغير لكل runtime، كل واحد بيدّي [[app.fetch]] للسيرفر بتاعه:
• Node: [[serve({ fetch: app.fetch, port })]] من [[@hono/node-server]].
• Bun: [[export default { port, fetch: app.fetch }]].
• Deno: [[Deno.serve({ port }, app.fetch)]].
• Cloudflare Workers: [[export default app]].`,
          example: R`node src/node.ts
bun src/bun.ts
deno run --allow-net=0.0.0.0:3000 src/deno.ts
npx wrangler dev src/worker.ts`,
          try: R`اعمل الـ ٤ ملفات اللي في الشرح جنب [[app.ts]]. شغّل كل واحد لوحده واطلب [[/api/users?q=sa]] و [[/api/users/9]]: الردود متطابقة؟ وبص على الـ headers: فيه فرق في حروف [[Content-Type]]؟`,
          deep: {
            why: R`ممكن تبدأ على Node وتنقل لـ Bun عشان السرعة، أو تحط جزء من الـ API على Cloudflare Workers قريب من اليوزر. لو الكود مربوط بـ runtime، النقل إعادة كتابة. مع Hono بيبقى ملف من ٤ سطور.`,
            how: R`كل runtime حديث بيفهم دالة [[(Request) => Response]]: Deno في [[Deno.serve]]، و Bun في [[fetch]] بتاع [[Bun.serve]] (أو [[export default]] فيه [[fetch]])، و Workers في [[export default { fetch }]] (والـ Hono app نفسه فيه [[fetch]] فينفع يتصدّر على طول). Node بس اللي [[http]] بتاعه بيستخدم [[req]]/[[res]] القديمين، فـ [[@hono/node-server]] بيحوّل بينهم.

اللي **مش** بيتنقل لوحده: الحاجات الخاصة بكل runtime جوه الـ handlers: [[process.env]] (في Workers المتغيرات بتيجي في [[c.env]])، و [[node:fs]] (مفيش ديسك في Workers)، و [[Bun.file]]، و [[Deno.readTextFile]]. خليها بره [[app.ts]] أو وراء interface.`,
            when: R`لما تكتب API جديدة ومش متأكد هتتنشر فين، أو عايز جزء منها على edge. ولو كل حاجة على Node وهتفضل، Hono لسه اختيار كويس بس الميزة دي مش هتفرق معاك.`,
            mistakes: R`تستخدم [[process.env.X]] جوه handler وتنشر على Workers: [[undefined]]، لأن الـ secrets هناك في [[c.env]]. وتفتكر إن [[bun src/node.ts]] غلط: بيشتغل (Bun بيفهم [[@hono/node-server]])، بس ملف [[bun.ts]] أخف. وتنسى [[--allow-net]] في Deno.`
          },
          teach: R`## ٤ ملفات صغيرة حوالين نفس الـ app

[[src/app.ts]] هو بتاع درس [[Hono]]. اتجرّب على ويندوز 11: Node 24.22، و Bun 1.4.4، و Deno 2.9.8 (نسخ portable). وكل مرة طلبت [[/api/users?q=sa]] و [[/api/users/9]] بـ [[curl.exe]].

---

## ١. Node: [[node src/node.ts]]

~~~text src/node.ts
import { serve } from "@hono/node-server";
import app from "./app.ts";

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log($__btNode $__{process.version} on http://localhost:$__{info.port}$__bt);
});
~~~

- [[@hono/node-server]] (نسخة 2.1.5): بيعمل سيرفر [[node:http]]، ومع كل طلب يحوّل [[req]] لـ [[Request]]، ينادي [[app.fetch]]، ويحوّل الـ [[Response]] لـ [[res]].
- [[(info) => ...]]: بيتنادى لما السيرفر يبدأ، و [[info.port]] البورت.

~~~text الناتج
Node v24.22.1 on http://localhost:3000
[{"id":1,"name":"Sara"}]
HTTP/1.1 404 Not Found
Content-Type: application/json
~~~

---

## ٢. Bun: [[bun src/bun.ts]]

~~~text src/bun.ts
import app from "./app.ts";

export default { port: 3000, fetch: app.fetch };
console.log($__btBun $__{Bun.version} on http://localhost:3000$__bt);
~~~

لو الملف الرئيسي عمل [[export default]] لـ object فيه [[fetch]]، Bun بيشغّل [[Bun.serve]] بيه لوحده.

~~~text الناتج
Bun 1.4.4 on http://localhost:3000
Started development server: http://localhost:3000
[{"id":1,"name":"Sara"}]
HTTP/1.1 404 Not Found
Content-Type: application/json
~~~

السطر التاني Bun اللي طبعه: لاحظ [[development]]. في الإنتاج شغّله بـ [[NODE_ENV=production]] (درس [[Bun.serve]] فيه الفرق في رسايل الـ error).

---

## ٣. Deno: [[deno run --allow-net=0.0.0.0:3000 src/deno.ts]]

~~~text src/deno.ts
import app from "./app.ts";

Deno.serve({ port: 3000 }, app.fetch);
~~~

[[app.fetch]] هو بالظبط نوع الـ handler اللي [[Deno.serve]] مستنيه. و [[import { Hono } from "hono"]] جوه [[app.ts]] اشتغل لأن Deno لقى [[hono]] في [[node_modules]] بتاع المشروع (فيه [[package.json]]).

~~~text الناتج
Listening on http://localhost:3000/
[{"id":1,"name":"Sara"}]
HTTP/1.1 404 Not Found
content-type: application/json
~~~

الفرق الوحيد: [[content-type]] بحروف صغيرة. أسامي الـ headers في HTTP مش حساسة لحالة الحروف، فده مش فرق حقيقي.

---

## ٤. Cloudflare Workers: [[npx wrangler dev src/worker.ts]]

~~~text src/worker.ts
import app from "./app.ts";

export default app;
~~~

Workers بيستنى [[export default]] فيه [[fetch]]، والـ Hono app فيه [[fetch]] أصلًا. ومعاه [[wrangler.jsonc]] فيه [["main": "src/worker.ts"]] و [["compatibility_date"]].

> سطّبت [[wrangler]] 4.153.0 جوه [[node:22-slim]] وشغّلت [[wrangler dev]]، بس الـ runtime المحلي ماقامش في البيئة دي (رسايل [[Unable to fetch the Request.cf object]] و timeout بسبب النت). فالجزء ده من docs بتاعة Hono و Cloudflare، والملف نفسه هو نفس شكل [[deno serve]] اللي اتجرّب.

---

## ٥. بونص: [[bun src/node.ts]] و [[deno run -A src/node.ts]]

شغّلت ملف **Node** نفسه على التانيين:

~~~text الناتج
deno → Node v26.5.1 on http://localhost:3000    {"id":1,"name":"Sara"}
bun  → Node v26.3.0 on http://localhost:3000    {"id":1,"name":"Sara"}
~~~

الاتنين اشتغلوا، وكل واحد قال [[process.version]] رقم Node اللي بيقلّده (درس [[توافق Bun مع Node]]).

---

## الخلاصة

| الـ runtime | الملف | السطر المهم |
|---|---|---|
| Node | [[src/node.ts]] | [[serve({ fetch: app.fetch, port })]] |
| Bun | [[src/bun.ts]] | [[export default { port, fetch: app.fetch }]] |
| Deno | [[src/deno.ts]] | [[Deno.serve({ port }, app.fetch)]] |
| Workers | [[src/worker.ts]] | [[export default app]] |

الـ handlers في [[app.ts]] لازم ميعتمدوش على [[node:fs]] أو [[process.env]] لو هتنشر على Workers.`,
          lines: [
            R`بيشغّل ملف Node: [[@hono/node-server]] بيعمل سيرفر [[node:http]]، ومع كل طلب يحوّل [[req]] بتاع Node لـ [[Request]] قياسي، ينادي [[app.fetch]]، ويرجّع الـ [[Response]] كـ [[res]]. Node 24 بيشغّل [[.ts]] على طول طالما الأنواع بسيطة.`,
            R`بيشغّل ملف Bun: الملف بيعمل [[export default]] لـ object فيه [[port]] و [[fetch: app.fetch]]، و Bun لما يلاقي ده في الملف الرئيسي بيشغّل [[Bun.serve]] بيه لوحده، من غير أي مكتبة وسيطة.`,
            R`بيشغّل ملف Deno اللي فيه [[Deno.serve({ port }, app.fetch)]]. و [[--allow-net=0.0.0.0:3000]] بيسمح بالسماع على البورت ده بس؛ من غيره Deno يقع بـ [[NotCapable]] قبل ما يفتح البورت.`,
            R`[[wrangler]] أداة Cloudflare، و [[dev]] بيشغّل الـ Worker على جهازك في بيئة شبه Workers الحقيقية. الملف بيعمل [[export default app]] بس، لأن الـ app نفسه فيه [[fetch]]. ومعاه ملف [[wrangler.jsonc]] فيه [[main]] و [[compatibility_date]] (الجزء ده من الـ docs، شوف الشرح).`,
          ],
          sol: R`الردود متطابقة في التلاتة (Node 24.22 و Bun 1.4.4 و Deno 2.9.8):
[[/api/users?q=sa]] ← [[[{"id":1,"name":"Sara"}]]]
[[/api/users/9]] ← [[404]] و JSON.

الفرق الوحيد في الـ headers: Node و Bun كتبوا [[Content-Type: application/json]] و Deno كتب [[content-type: application/json]]. ودي نفس الحاجة: أسامي الـ headers مش حساسة لحالة الحروف.`
        },
        {
          cmd: "Hono middleware",
          title: "middleware في Hono: logger و cors و auth و onError",
          desc: R`الـ middleware في Hono دالة [[async (c, next) => { ... await next(); ... }]]: اللي قبل [[await next()]] بيحصل قبل الـ handler، واللي بعده بيحصل بعد ما الرد اتعمل. و Hono جاي معاه جاهزين: [[logger()]] و [[cors()]] و [[secureHeaders()]] و [[bearerAuth()]].

و [[app.onError]] بيمسك أي exception، و [[app.notFound]] بيرد على أي مسار مش موجود، و [[HTTPException]] بيخليك ترمي status معين.`,
          example: R`import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { bearerAuth } from "hono/bearer-auth";
import { HTTPException } from "hono/http-exception";
const app = new Hono();
app.use(logger());
app.use("/api/*", cors({ origin: "http://localhost:5173" }));
app.use(secureHeaders());
app.use(async (c, next) => {
  const start = performance.now();
  await next();
  c.header("X-Response-Time", $__bt$__{(performance.now() - start).toFixed(1)}ms$__bt);
});
app.use("/api/admin/*", bearerAuth({ token: process.env.ADMIN_TOKEN! }));
app.get("/api/hello", (c) => c.json({ hello: "world" }));
app.get("/api/admin/stats", (c) => c.json({ users: 2 }));
app.get("/api/boom", () => {
  throw new Error("db is down");
});
app.get("/api/teapot", () => {
  throw new HTTPException(418, { message: "I'm a teapot" });
});
app.notFound((c) => c.json({ error: "not found" }, 404));
app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  console.error(err);
  return c.json({ error: "internal error" }, 500);
});
export default app;`,
          try: R`احفظ المثال [[src/mw.ts]]، واعمل سكربت بـ [[app.request]] يطلب: [[/api/hello]] بـ header [[Origin: http://localhost:5173]]، و [[/api/admin/stats]] من غير توكن ومعاه [[Authorization: Bearer ...]]، و [[/api/boom]] و [[/api/teapot]] و [[/nope]]. شغّله بـ [[ADMIN_TOKEN=dev-token]]. وبعدين غيّر [[onError]] يرجّع [[c.json({ error: err.message }, err.status)]] للـ HTTPException وشوف رد الـ 401 اتغير إزاي.`,
          flag: "script",
          deep: {
            why: R`حاجات كل API محتاجاها: لوج لكل طلب، و CORS للفرونت، و headers أمان، وحماية لمسارات الأدمن، ورد موحّد للأخطاء. لو اتكتبت في كل handler بتتنسي. الـ middleware بيكتبها مرة.`,
            how: R`الـ middleware بيتنفذ بالترتيب اللي اتسجّل بيه، زي البصلة: كل واحد بيعمل حاجته، وينادي [[await next()]] فالطلب يدخل للي بعده، ولما الـ handler يخلص بيرجع يطلع من نفس الطبقات بالعكس. عشان كده الـ timing بيقيس قبل وبعد [[next()]]، و [[logger]] بيطبع [[<--]] وهو داخل و [[-->]] وهو طالع.

[[app.use("/api/*", mw)]]: الـ middleware ده للمسارات اللي بتبدأ بـ [[/api/]] بس.

[[bearerAuth]] بيقارن [[Authorization: Bearer <token>]] بالتوكن، ولو غلط بيرمي [[HTTPException(401)]] جواه رد جاهز فيه [[WWW-Authenticate]]. عشان كده [[onError]] لازم يرجّع [[err.getResponse()]] للـ HTTPException: لو عملت [[c.json]] بنفسك بتضيّع الـ header ده والرسالة بتطلع فاضية.

[[process.env.ADMIN_TOKEN!]]: الـ [[!]] بتقول لـ TypeScript «متأكد إنها مش undefined». لو المتغير مش موجود، [[bearerAuth]] بيرمي error وقت التشغيل. الأحسن تتحقق من الـ env في أول البرنامج (درس [[env بـ Zod]] في تاب TypeScript).`,
            when: R`أي API بـ Hono: logger و secureHeaders و onError من أول يوم، و cors لو فيه فرونت على دومين تاني، و auth على المسارات اللي محتاجاها بس.`,
            mistakes: R`تنسى [[await]] قبل [[next()]]: الكود اللي بعدها يتنفذ قبل الـ handler. وتحط [[cors]] بعد المسارات: الترتيب مهم. و [[cors({ origin: "*" })]] مع cookies. وتحط توكن احتياطي في الكود ([[?? "dev-token"]]) فيتنشر في الإنتاج. وفي [[onError]] ترجّع [[err.message]] لأي error: رسالة الداتابيز توصل للعميل.`
          },
          teach: R`## الطلبات اللي بعتناها

اتجرّب بـ Hono 4.13.14 على Node 24.22، بسكربت بيعمل [[app.request]] (من غير سيرفر) ويطبع الـ status والـ body وكام header، والـ env فيه [[ADMIN_TOKEN=dev-token]].

---

## ١. الـ imports

كل middleware في مسار لوحده ([[hono/logger]] و [[hono/cors]] ...). فاللي مش بتستورده مش بيدخل الـ bundle، وده مهم في Workers.

---

## ٢. [[app.use(logger())]]

~~~text الناتج
<-- GET /api/hello
--> GET /api/hello 200 6ms
~~~

[[<--]] الطلب داخل، و [[-->]] الرد طالع ومعاه الـ status والوقت.

---

## ٣. [[cors]] و [[secureHeaders]]

~~~text الناتج: /api/hello مع Origin: http://localhost:5173
200 {"hello":"world"} | access-control-allow-origin: http://localhost:5173 | x-response-time: 3.4ms | x-content-type-options: nosniff | x-frame-options: SAMEORIGIN
~~~

- [[access-control-allow-origin]]: [[cors]] بيقول للمتصفح «الفرونت اللي على 5173 مسموحله يقرا الرد». وده على [[/api/*]] بس.
- [[x-content-type-options: nosniff]] و [[x-frame-options: SAMEORIGIN]]: من [[secureHeaders]]. الأول بيمنع المتصفح يخمّن نوع الملف، والتاني بيمنع موقع تاني يحط صفحتك في iframe (clickjacking). معناهم في تاب الأمان.

---

## ٤. middleware بإيدك: الـ timing

~~~text mw.ts
app.use(async (c, next) => {
  const start = performance.now();
  await next();
  c.header("X-Response-Time", $__bt$__{(performance.now() - start).toFixed(1)}ms$__bt);
});
~~~

1. [[performance.now()]]: الوقت بالـ millisecond وبكسور.
2. [[await next()]]: سيب الطلب يكمّل للـ handler واستنى لحد ما يخلص.
3. بعد ما رجع: احسب الفرق وحطه في header. [[toFixed(1)]] = رقم عشري واحد.

ولأنه متسجّل من غير مسار، بيشتغل على **كل** الطلبات، حتى الـ 404 والـ 500 ([[x-response-time]] موجود في كل الردود تحت).

---

## ٥. [[bearerAuth]] على [[/api/admin/*]]

~~~text الناتج
من غير توكن:          401 Unauthorized | ... | www-authenticate: Bearer realm=""
Bearer dev-token:      200 {"users":2}
~~~

من غير توكن الطلب ماوصلش للـ handler أصلًا. و [[www-authenticate]] header بيقول للعميل «محتاج Bearer token».

### ليه [[err.getResponse()]] في [[onError]]؟

في الأول كتبت [[onError]] بيرجّع [[c.json({ error: err.message }, err.status)]] للـ HTTPException:

~~~text الناتج بالطريقة دي
401 {"error":""} | x-response-time: 1.0ms | ...
~~~

الرسالة فاضية، و [[www-authenticate]] اختفى. [[bearerAuth]] بيرمي HTTPException جواه **رد جاهز**، و [[getResponse()]] بيرجّعه زي ما هو.

---

## ٦. الأخطاء: [[/api/boom]] و [[/api/teapot]] و [[/nope]]

~~~text الناتج
Error: db is down
    at file:///C:/Users/ali/lab/hono/src/mw.ts:25:9
    ...
500 {"error":"internal error"}
418 I'm a teapot
404 {"error":"not found"}
~~~

| الطلب | اللي حصل | مين رد |
|---|---|---|
| [[/api/boom]] | [[throw new Error]] عادي | [[onError]]: طبع الـ stack في اللوج، ورجّع رسالة عامة 500 |
| [[/api/teapot]] | [[throw new HTTPException(418, ...)]] | [[onError]] ← [[getResponse()]]: الـ status والرسالة اللي اترمت |
| [[/nope]] | مسار مش موجود | [[notFound]] |

- [[instanceof HTTPException]]: «الـ error ده من نوع HTTPException؟». لو آه احنا اللي رميناه وعارفين الـ status.
- [[db is down]] اتطبعت في اللوج بس، والعميل شاف [[internal error]]: رسايل الداتابيز مبتوصلش لبره.
- 418 = I'm a teapot: status حقيقي في HTTP كان نكتة، بنستخدمه هنا عشان يبان إن أي رقم بيعدّي.

---

## الخلاصة

| الحاجة | بتعمل إيه | خلي بالك |
|---|---|---|
| [[app.use(mw)]] | middleware لكل المسارات | الترتيب = ترتيب التنفيذ |
| [[app.use("/api/*", mw)]] | لمسارات معينة | |
| [[await next()]] | ادخل للي بعدي واستنى | من غير await الترتيب يبوظ |
| [[app.onError]] | أي exception | [[err.getResponse()]] للـ HTTPException |
| [[app.notFound]] | مسار مش موجود | |`,
          lines: [
            R`بيجيب [[Hono]] اللي هنعمل منه الـ app ونسجّل عليه الـ middleware والمسارات.`,
            R`بيجيب [[logger]] من [[hono/logger]]: middleware بيطبع سطر لكل طلب داخل ([[<-- GET /api/hello]]) وسطر للرد طالع بالـ status والوقت. كل middleware في مسار لوحده، فاللي مبتستوردوش مبيدخلش الـ bundle.`,
            R`بيجيب [[cors]]: middleware بيحط headers الـ CORS اللي بتقول للمتصفح أنهي فرونت (origin) مسموحله يقرا الردود. من غيره، فرونت على بورت تاني يبعت الطلب والمتصفح يمنعه يقرا الرد.`,
            R`بيجيب [[secureHeaders]]: بيضيف headers أمان جاهزة لكل رد، زي [[X-Content-Type-Options: nosniff]] (متخمّنش نوع الملف) و [[X-Frame-Options: SAMEORIGIN]] (موقع تاني ميحطش صفحتك في iframe).`,
            R`بيجيب [[bearerAuth]]: middleware بيقارن header [[Authorization: Bearer <token>]] بالتوكن اللي تديهوله، ولو غلط أو مش موجود بيرد [[401]] من غير ما الطلب يوصل للـ handler.`,
            R`بيجيب [[HTTPException]]: error بتحط فيه status ورسالة، فلما ترميه من أي حتة الرد يطلع بالرقم ده بدل 500.`,
            R`بيعمل الـ app اللي هنسجّل عليه كل حاجة. ترتيب [[app.use]] تحت هو ترتيب التنفيذ.`,
            R`[[app.use]] من غير مسار = على كل الطلبات. والـ logger أول واحد عشان يسجّل كل طلب، حتى اللي هيترفض من الـ auth أو يقع بـ error.`,
            R`CORS على المسارات اللي بتبدأ بـ [[/api/]] بس، و [[origin]] بيسمح للفرونت اللي على [[http://localhost:5173]] (Vite) بس. أي موقع تاني المتصفح هيمنعه يقرا الرد.`,
            R`headers الأمان على كل الردود، حتى صفحات الـ 404 والـ errors.`,
            R`middleware بإيدك: دالة بتاخد [[c]] و [[next]]. اللي قبل [[next()]] بيتنفّذ قبل الـ handler، واللي بعده بعد ما الرد اتعمل. هنا بيقيس الطلب خد قد إيه.`,
            R`[[performance.now()]] الوقت بالـ millisecond بكسور، بيتسجّل قبل ما الطلب يدخل للـ handler.`,
            R`[[next()]] بيعدّي الطلب للـ middleware اللي بعده أو للـ handler، و [[await]] بيستنى لحد ما يخلص. من غير [[await]] السطر اللي تحت يتنفّذ قبل الـ handler والوقت يطلع غلط.`,
            R`بعد ما الرد اتعمل: بيحسب الفرق ويحطه في header [[X-Response-Time]] على الرد، و [[toFixed(1)]] رقم عشري واحد.`,
            R`قفلة الـ middleware بتاع الوقت.`,
            R`أي مسار تحت [[/api/admin/]] محتاج [[Authorization: Bearer]] بالتوكن اللي في متغير البيئة [[ADMIN_TOKEN]]. الـ [[!]] بتقول لـ TypeScript «مش undefined»، بس لو المتغير ناقص فعلًا [[bearerAuth]] بيرمي error، فاتحقق من الـ env في أول البرنامج.`,
            R`مسار عادي مش محمي: CORS والـ headers والوقت بيتطبقوا عليه، بس مفيش auth.`,
            R`مسار تحت [[/api/admin/]]، فالـ [[bearerAuth]] اللي فوق بيشتغل قبله: من غير توكن صح الـ handler ده مبيتنفّذش خالص.`,
            R`مسار مقصود يقع، عشان نشوف [[onError]] بيتعامل إزاي مع error مش متوقع.`,
            R`error عادي زي اللي بيحصل لما الداتابيز تقع. رسالته داخلية، ومينفعش توصل للعميل.`,
            R`قفلة المسار [[/api/boom]].`,
            R`مسار تاني بيرمي error، بس المرة دي error عارف الـ status بتاعه.`,
            R`[[HTTPException]] بالـ status [[418]] والرسالة. ده اللي تستخدمه لما انت عارف الرد المفروض يبقى إيه (400 أو 403 أو 409 مثلًا) من جوه أي دالة.`,
            R`قفلة المسار [[/api/teapot]].`,
            R`[[notFound]] بيرد على أي مسار مش متسجّل بـ JSON موحّد، بدل النص الافتراضي [[404 Not Found]]، فالفرونت يقرا كل الأخطاء بنفس الشكل.`,
            R`[[onError]] بيمسك أي exception اترمى من أي handler أو middleware، فالسيرفر ميقعش والرد يبقى انت اللي محدده.`,
            R`لو الـ error [[HTTPException]] (احنا أو [[bearerAuth]] اللي رميناه)، [[getResponse()]] بيرجّع الرد اللي جواه زي ما هو بالـ status والـ headers. لو عملت [[c.json]] بداله، الـ 401 بتاع [[bearerAuth]] بيخسر header [[WWW-Authenticate]].`,
            R`أي error تاني مش متوقع: بيطبعه كامل بالـ stack في لوج السيرفر عشان انت تعرف السبب.`,
            R`وللعميل رسالة عامة بـ 500، من غير [[err.message]] اللي ممكن يكشف تفاصيل الداتابيز أو الكود.`,
            R`قفلة [[onError]].`,
            R`بيصدّر الـ app، وملف التشغيل بتاع كل runtime (أو الاختبار بـ [[app.request]]) بيستورده.`,
          ],
          sol: R`الردود الحقيقية (Hono 4.13.14 على Node 24.22، [[ADMIN_TOKEN=dev-token]]):
[[/api/hello]] مع Origin ← [[200]] و [[access-control-allow-origin: http://localhost:5173]] و [[x-content-type-options: nosniff]] و [[x-response-time]].
[[/api/admin/stats]] من غير توكن ← [[401 Unauthorized]] و [[www-authenticate: Bearer realm=""]].
ومع [[Authorization: Bearer dev-token]] ← [[200 {"users":2}]].
[[/api/boom]] ← [[500 {"error":"internal error"}]] و [[Error: db is down]] في اللوج.
[[/api/teapot]] ← [[418 I'm a teapot]].
[[/nope]] ← [[404 {"error":"not found"}]].

ولو [[onError]] رجّع [[c.json({ error: err.message }, err.status)]]: الـ 401 بقى [[{"error":""}]] من غير [[www-authenticate]].`
        },
        {
          cmd: "Hono + zod",
          title: "validation بـ zod في Hono، و client متأمّن بالأنواع (RPC)",
          desc: R`[[zValidator("json", schema)]] من [[@hono/zod-validator]] بيتحقق من الـ body قبل ما يوصل للـ handler: لو غلط بيرجّع 400، ولو صح [[c.req.valid("json")]] بيدّيك الداتا بنوعها الصح. ونفس الكلام لـ [["query"]] و [["param"]] و [["header"]].

ولما تعمل [[export type AppType = typeof app]]، تقدر تعمل client بـ [[hc<AppType>()]] يعرف كل المسارات وأشكال الـ body: لو نسيت خانة، TypeScript يطلّع خطأ قبل ما تشغّل.`,
          example: R`import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
const CreateUser = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  age: z.number().int().min(13).optional(),
});
const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
});
const app = new Hono()
  .get("/api/users", zValidator("query", ListQuery), (c) => {
    const { page } = c.req.valid("query");
    return c.json({ page, users: [] });
  })
  .post(
    "/api/users",
    zValidator("json", CreateUser, (result, c) => {
      if (!result.success) {
        return c.json({ errors: z.flattenError(result.error).fieldErrors }, 400);
      }
    }),
    (c) => {
      const user = c.req.valid("json");
      return c.json({ id: 3, ...user }, 201);
    },
  );
export type AppType = typeof app;
export default app;`,
          try: R`احفظ المثال [[src/zod.ts]] ([[npm i hono zod @hono/zod-validator]]). بـ [[app.request]] ابعت: body صح، و body فيه [[name: "S"]] و [[email: "nope"]] و [[age: 9.5]]، و body من غير [[content-type: application/json]]، و [[?page=3]] و [[?page=abc]]. وبعدين اعمل [[client.ts]] بـ [[hc<AppType>]] وانسَ [[email]] وشغّل [[npx tsc]].`,
          flag: "script",
          deep: {
            why: R`[[c.req.json<T>()]] نوع بس، والعميل يقدر يبعت أي حاجة. من غير تحقق، [[name]] ممكن يبقى object أو مش موجود، والغلط يظهر جوه الداتابيز. zod بيتحقق في الحدود (أول ما الطلب يدخل)، والـ handler يشتغل على داتا مضمونة. والـ RPC client بيخلي الفرونت يقع وقت الـ build لو الـ API اتغيرت.`,
            how: R`[[zValidator(target, schema, hook?)]] middleware: بياخد الجزء ده من الطلب ويعمل [[schema.safeParse]]. لو فشل ومفيش hook بيرجّع 400 بالـ ZodError كامل. الـ hook (التالت) بيخليك تشكّل الرد بنفسك: هنا [[z.flattenError(...).fieldErrors]] بيرجّع object كل خانة وأخطاءها.

[[c.req.valid("json")]]: الداتا بعد التحقق والتحويل ([[trim]] اتطبق مثلًا)، ونوعها TypeScript بيعرفه من الـ schema. [[z.coerce.number()]] بيحوّل النص [["3"]] لرقم (الـ query دايمًا نصوص)، و [[.default(1)]] لو مش موجود.

الـ RPC: لما المسارات تتكتب **متسلسلة** على نفس [[new Hono()]] ([[.get(...).post(...)]])، نوع [[app]] بيشيل كل المسارات وأشكالها. و [[hc<AppType>(baseUrl)]] بيعمل object زي [[client.api.users.$post({ json })]] بيعمل [[fetch]] حقيقي، وTypeScript بيعرف الـ body المطلوب والرد.`,
            when: R`أي endpoint بياخد داتا من بره. والـ RPC لما الفرونت والباك في نفس الـ repo (monorepo) وبـ TypeScript.`,
            mistakes: R`تسجّل المسارات كل واحد في سطر لوحده ([[app.get(...)]] ثم [[app.post(...)]])، فـ [[typeof app]] ميشوفهمش والـ client يبقى من غير أنواع. وتنسى إن الـ body من غير [[content-type: application/json]] بيتقري كـ [[{}]] فالرد 400 «expected string, received undefined» ومش واضح ليه. وترجّع [[result.error]] كامل للعميل: فيه تفاصيل ملهاش لازمة.`
          },
          teach: R`## الـ schemas الأول

اتجرّب بـ Hono 4.13.14 و zod 4.6.7 و [[@hono/zod-validator]] 0.9.1 على Node 24.22، بـ [[app.request]]، والـ client اتفحص بـ TypeScript 7.0.2.

~~~text zod.ts
const CreateUser = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  age: z.number().int().min(13).optional(),
});
~~~

- [[z.object({...})]]: object لازم فيه الخانات دي.
- [[z.string().trim().min(2)]]: نص، شيل المسافات من الأول والآخر، وبعدها لازم حرفين على الأقل.
- [[z.email()]]: نص شكله إيميل (zod 4 بيكتبها كده، zod 3 كان [[z.string().email()]]).
- [[z.number().int().min(13).optional()]]: رقم صحيح من 13 وطالع، والخانة مش لازمة.

~~~text zod.ts
const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
});
~~~

[[z.coerce.number()]]: الـ query دايمًا نص ([["3"]])، و [[coerce]] بيحوّله رقم الأول. و [[.default(1)]] لو [[page]] مش موجود.

---

## ١. [[zValidator("query", ListQuery)]]

~~~text الناتج
GET /api/users?page=3    → 200 {"page":3,"users":[]}
GET /api/users?page=abc  → 400 {"success":false,"error":{"name":"ZodError","message":"[\n  {\n    \"expected\": \"number\", ...
~~~

- [[c.req.valid("query")]]: [[page]] جه رقم [[3]] مش نص.
- [[abc]] بقى [[NaN]] بعد coerce فاترفض. ومن غير hook، الـ 400 فيه الـ ZodError كامل كنص: مش لطيف للعميل.

---

## ٢. [[zValidator("json", CreateUser, hook)]]

~~~text zod.ts
zValidator("json", CreateUser, (result, c) => {
  if (!result.success) {
    return c.json({ errors: z.flattenError(result.error).fieldErrors }, 400);
  }
}),
~~~

الـ hook بيتنادى بعد التحقق: لو فشل ورجّع [[Response]]، ده الرد. لو مرجّعش حاجة، الطلب يكمّل للـ handler.

[[z.flattenError(err).fieldErrors]]: بيحوّل الـ ZodError لـ [[{ خانة: [رسايل] }]]، وده سهل الفرونت يحطه تحت كل خانة.

~~~text الناتج
body صح  {"name":"  Sara ","email":"sara@example.com","age":28}
→ 201 {"id":3,"name":"Sara","email":"sara@example.com","age":28}

body غلط {"name":"S","email":"nope","age":9.5}
→ 400 {"errors":{"name":["Too small: expected string to have >=2 characters"],"email":["Invalid email address"],"age":["Invalid input: expected int, received number"]}}

من غير content-type: application/json
→ 400 {"errors":{"name":["Invalid input: expected string, received undefined"],"email":["Invalid input: expected string, received undefined"]}}
~~~

- الأول: [["  Sara "]] بقت [["Sara"]]: [[c.req.valid("json")]] بيدّيك الداتا **بعد** [[trim]].
- التاني: كل الأخطاء مرة واحدة، مش أول واحد بس. و [[9.5]] رقم بس مش [[int]]، وده سبب رسالة [[expected int, received number]].
- التالت: من غير الـ header، Hono مبيقراش الـ body كـ JSON، فالخانات كلها [[undefined]].

---

## ٣. [[c.req.valid("json")]] و [[...user]]

[[{ id: 3, ...user }]]: object جديد فيه [[id]] وكل خانات [[user]] (الـ spread). و TypeScript عارف إن [[user.email]] [[string]] و [[user.age]] [[number | undefined]] من الـ schema.

---

## ٤. RPC: [[export type AppType = typeof app]]

المسارات متسلسلة ([[new Hono().get(...).post(...)]]) عشان النوع يشيلها كلها.

~~~text client.ts
import { hc } from "hono/client";
import app, { type AppType } from "./zod.ts";

const client = hc<AppType>("http://localhost", { fetch: app.request });

const res = await client.api.users.$post({ json: { name: "Mona", email: "mona@example.com" } });
if (res.ok) {
  const user = await res.json();
  console.log(res.status, user.id, user.email);
}
const bad = await client.api.users.$post({ json: { name: "Mona" } });
console.log(bad.status);
~~~

- [[hc<AppType>(url)]]: client عارف المسارات من النوع. [[client.api.users.$post]] = [[POST /api/users]].
- [[{ fetch: app.request }]]: للتجربة بس، بدل الشبكة. في الفرونت بتشيلها ويستخدم [[fetch]] العادي.
- [[res.ok]]: الـ status بين 200 و 299، وجوه الـ if TypeScript عارف إن الرد هو الـ user.

~~~text node src/client.ts
201 3 mona@example.com
400
~~~

~~~text npx tsc -p .
src/client.ts(11,44): error TS2741: Property 'email' is missing in type '{ name: string; }' but required in type '{ name: string; email: string; age?: number | undefined; }'.
~~~

الطلب التاني ناقصه [[email]]: وقت التشغيل رجع 400، بس الأهم إن [[tsc]] مسكه **قبل** التشغيل، من الـ schema نفسها.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[zValidator("json" / "query" / "param", schema)]] | تحقق قبل الـ handler، و 400 لو غلط |
| الـ hook (التالت) | تشكّل رد الخطأ بنفسك |
| [[c.req.valid("json")]] | الداتا بعد التحقق والتحويل وبنوعها |
| [[z.coerce.number()]] | للـ query والـ params (نصوص) |
| [[typeof app]] + [[hc<AppType>]] | client بيقع في [[tsc]] لو الطلب غلط |`,
          lines: [
            R`بيجيب [[Hono]] اللي هنعمل منه الـ app.`,
            R`بيجيب [[zValidator]] من [[@hono/zod-validator]] (مكتبة منفصلة بتتسطّب جنب hono): middleware بياخد جزء من الطلب (body أو query) ويتحقق منه بـ schema قبل ما يوصل للـ handler.`,
            R`بيجيب [[z]] من zod: المكتبة اللي بتوصف شكل الداتا وتتحقق منها وقت التشغيل، مش بس في TypeScript.`,
            R`schema للـ body بتاع إضافة user: أي body مش بالشكل ده هيترفض قبل الـ handler.`,
            R`[[name]] لازم نص، و [[trim()]] بيشيل المسافات من الأول والآخر **قبل** الفحص، و [[min(2)]] حرفين على الأقل. فـ [[" S "]] بيترفض لأنه بعد الـ trim حرف واحد.`,
            R`[[email]] لازم إيميل شكله صحيح ([[z.email()]] في zod 4، وكانت [[z.string().email()]] في 3). [[nope]] مثلًا بيترفض برسالة على الخانة دي.`,
            R`[[age]] رقم صحيح ([[int()]] بيرفض [[9.5]]) من 13 وطالع، و [[optional()]] يعني لو مش موجود خالص عادي، بس لو موجود لازم يطابق.`,
            R`قفلة schema الـ [[CreateUser]].`,
            R`schema للـ query string بتاع ليستة اليوزرز.`,
            R`[[page]]: الـ query دايمًا نصوص، فـ [[z.coerce.number()]] بيحوّل [["3"]] لـ [[3]] قبل الفحص، و [[min(1)]] بيرفض الصفر والسالب، و [[default(1)]] لو مش موجود. و [[?page=abc]] بيطلع [[NaN]] فبيترفض بـ 400.`,
            R`قفلة schema الـ [[ListQuery]].`,
            R`بيعمل الـ app، والمسارات بتتكتب **متسلسلة** بعده ([[.get(...).post(...)]]) مش كل واحد في سطر لوحده. ده عشان نوع [[app]] يشيل كل المسارات وأشكالها، فالـ client بـ [[hc<AppType>]] يعرفها.`,
            R`[[GET /api/users]]: قبل الـ handler، [[zValidator("query", ListQuery)]] بيفحص الـ query؛ لو غلط بيرجّع 400 لوحده والـ handler مبيتنفّذش.`,
            R`[[c.req.valid("query")]] بيرجّع الـ query **بعد** التحقق والتحويل: [[page]] رقم فعلًا (مش نص) و [[1]] لو مكانش موجود، و TypeScript عارف نوعه من الـ schema.`,
            R`بيرجّع الـ page والليستة (فاضية هنا للتجربة).`,
            R`قفلة الـ handler بتاع [[GET]]، والسلسلة بتكمّل بـ [[.post]].`,
            R`[[POST]] على نفس الـ app، بياخد المسار والـ middleware والـ handler كـ arguments.`,
            R`أول argument لـ [[.post]] هو المسار [[/api/users]]، نفس مسار الـ [[GET]] بس بـ method تانية، فـ Hono بيفرّق بينهم بالـ method.`,
            R`بيتحقق من الـ body JSON بالـ schema [[CreateUser]]. التالت (الـ hook) اختياري وبيتنادى بالنتيجة، فبيخليك تشكّل رد الخطأ بنفسك بدل الـ ZodError الكامل الافتراضي.`,
            R`لو التحقق فشل ([[result.success]] بـ [[false]])...`,
            R`...بيرجّع 400 بأخطاء كل خانة لوحدها: [[z.flattenError(...).fieldErrors]] بيدّي object زي [[{ name: [...], email: [...] }]]، فالفرونت يحط كل رسالة تحت خانتها. لو الـ hook مرجّعش حاجة (نجح) الطلب بيكمّل للـ handler.`,
            R`قفلة شرط الفشل.`,
            R`قفلة الـ hook ونداء [[zValidator]].`,
            R`الـ handler: بيتنفّذ بس لو الـ body عدّى التحقق.`,
            R`[[c.req.valid("json")]] الداتا بعد التحقق (و [[trim]] اتطبق فعلًا على [[name]])، ونوعها جاي من الـ schema، فمش محتاج تكتب النوع بإيدك ولا تتحقق تاني.`,
            R`بيرجّع user بـ id ثابت للتجربة ومعاه الداتا، بـ [[201 Created]].`,
            R`قفلة الـ handler.`,
            R`قفلة [[.post]]، وده آخر السلسلة.`,
            R`بيصدّر **نوع** الـ app (مش قيمة). الفرونت بيستورده بـ [[import type]] ويعمل [[hc<AppType>(url)]]، فيعرف كل المسارات وأشكال الـ body والرد، ولو نسيت خانة TypeScript يطلّع خطأ قبل التشغيل.`,
            R`بيصدّر الـ app نفسه عشان ملف التشغيل أو الاختبار يستورده.`,
          ],
          sol: R`الردود الحقيقية:
• صح: [[201 {"id":3,"name":"Sara","email":"sara@example.com","age":28}]] (الاسم اتعمله trim).
• غلط: [[400]] و [[{"errors":{"name":["Too small: expected string to have >=2 characters"],"email":["Invalid email address"],"age":["Invalid input: expected int, received number"]}}]].
• من غير content-type: [[400]] والخانات كلها [[expected string, received undefined]].
• [[?page=3]] ← [[{"page":3,"users":[]}]]، و [[?page=abc]] ← [[400]] بالـ ZodError كامل (مفيش hook على الـ query).

والـ client من غير [[email]]: [[tsc]] طلّع [[error TS2741: Property 'email' is missing in type '{ name: string; }']].`
        },
        {
          cmd: "Node ولا Bun ولا Deno",
          title: "تختار أنهي runtime النهارده (بأرقام اتقاست، مش إعلانات)",
          desc: R`الإجابة الأمينة: **Node لأغلب المشاريع اللي هتتشغّل في الإنتاج**، لأن كل مكتبة وأداة مراقبة ومنصة استضافة متجرّبة عليه. Bun لو عايز سرعة في التسطيب والتطوير والسكربتات وقبلت تجرّب مشروعك عليه كويس. و Deno لو الأمان (الصلاحيات) والأدوات الجاهزة أهم حاجة، أو هتنشر على Deno Deploy.

المثال بيشغّل نفس Hono app على التلاتة ويقيس بـ autocannon. الفرق موجود، بس أصغر بكتير من اللي بتسمعه.`,
          example: R`node src/node.ts
bun src/bun.ts
deno run --allow-net=0.0.0.0:3000 src/deno.ts
npx autocannon -c 50 -d 8 http://localhost:3000/api/users`,
          try: R`شغّل نفس الـ app على التلاتة (واحد في كل مرة)، وقيس بـ [[autocannon]]، وسجّل [[Req/Sec]] المتوسط. وبعدين اختار مشروع حقيقي عندك وجاوب: بيستخدم أداة مراقبة (APM)؟ فيه native addons؟ هيتنشر فين؟ الإجابات دي بتقرر أكتر من الرقم.`,
          deep: {
            why: R`كل runtime جديد بيطلع بـ benchmark «أسرع ٣ مرات». الرقم ده غالبًا hello world على لينكس بأداة قياس مخصوصة. في الشغل الحقيقي الوقت بيروح في الداتابيز والشبكة، وأي توفير في الـ runtime صغير جنبهم، وأي مشكلة توافق ممكن تكلّفك أيام.`,
            how: R`اللي بيفرق فعلًا:
• التوافق: Node هو المرجع. Bun و Deno بيقلّدوه وفيه حاجات متقلّدة بس (درس [[توافق Bun مع Node]]).
• الاستضافة: كل حاجة بتدعم Node. Bun و Deno عن طريق Docker في أغلب الأماكن، و Deno Deploy لـ Deno، و Workers ليه runtime خاص بيه.
• الأدوات: Bun و Deno فيهم test و format و TypeScript جاهزين. Node محتاج أدوات (بس هي الأكتر نضجًا).
• الأمان: Deno بس فيه صلاحيات. Bun بيمنع سكربتات التسطيب افتراضيًا.
• السرعة: Bun أسرع في البداية والتسطيب على لينكس، و HTTP بفرق متوسط. وده بيفرق في الـ CLI والـ serverless أكتر من سيرفر شغال طول الوقت.`,
            when: R`مشروع إنتاج جديد لفريق: Node (24 LTS)، ومعاه pnpm و Vitest. سكربتات وأدوات وتجارب: Bun. أداة بتشغّل كود مش واثق فيه، أو API على Deno Deploy: Deno. ولو مش متأكد، اكتب الـ API بـ Hono: النقل بعدين ملف من ٤ سطور.`,
            mistakes: R`تختار من benchmark مش متجرّب على جهازك وشغلك. وتنقل مشروع شغال كويس عشان «الجديد أسرع» من غير ما تجرّب الاختبارات والمراقبة. وتخلط: تستخدم Bun كـ package manager و Node كـ runtime ده تمام، بس الفريق كله لازم يعرف.`
          },
          teach: R`## القياس

نفس [[src/app.ts]] بتاع Hono (درس [[Hono على كل runtime]]) على التلاتة، واحد في كل مرة، على لابتوب تجربة بويندوز 11. والقياس بـ [[autocannon]] 8.0.0 من نفس الجهاز.

~~~bash
npx autocannon -c 50 -d 8 http://localhost:3000/api/users
~~~

- [[autocannon]]: أداة بتضرب السيرفر طلبات كتير وتقيس.
- [[-c 50]]: ٥٠ اتصال في نفس الوقت.
- [[-d 8]]: لمدة ٨ ثواني.

~~~text الناتج (Node، جزء)
│ Latency │ 2 ms │ 2 ms │ 5 ms  │ 6 ms │ 2.56 ms │ 1.11 ms │ 38 ms │
│ Req/Sec   │ 12,263  │ 12,263  │ 16,263  │ 17,775  │ 16,260  │ 1,658.99 │ 12,256  │
130k requests in 8.05s, 26.1 MB read
~~~

الأعمدة في الجدولين: أقل قيمة، ثم percentiles (يعني «٥٠٪ من الطلبات أقل من كذا»)، ثم المتوسط ([[Avg]])، والانحراف ([[Stdev]])، وأعلى قيمة.

| | Node 24.22 | Bun 1.4.4 | Deno 2.9.8 |
|---|---|---|---|
| متوسط [[Req/Sec]] | 16,260 | **20,702** | 17,074 |
| متوسط الـ latency | 2.56ms | 1.9ms | 2.48ms |
| مجموع الطلبات | 130k | 166k | 137k |

Bun أسرع بحوالي **٢٧٪** هنا، و Deno قريب من Node. ومهم: [[autocannon]] نفسه شغال على Node على نفس الجهاز وبياخد CPU، فالأرقام دي نسبية مش مطلقة. والـ handler مفيهوش داتابيز: لو كل طلب بياخد 20ms في Postgres، الفرق ده يختفي تقريبًا.

---

## الأرقام التانية اللي قستها في الدروس اللي فاتت

| | Node | Bun | Deno |
|---|---|---|---|
| بداية ملف صغير (ويندوز، متوسط ١٠) | 82ms | **24ms** | (ماتقاستش) |
| تسطيب ٦٨ باكدج، كاش سخن (لينكس) | [[npm ci]] 7.4s | **0.11s** | ([[deno install]] على ويندوز 0.74s) |
| تسطيب نفس الحاجة (ويندوز) | 3.8 لـ 15s | حوالي 6.5s | 0.74s |
| [[createHook]] و heap stats | حقيقيين | متقلّدين (صفر) | جزئي |
| صلاحيات افتراضيًا | لأ (فيه [[--permission]] لو طلبته) | لأ | **آه** |
| TS و test و format جاهزين | جزئي (TS بسيط و [[node --test]]) | آه | آه |

---

## القرار

| الموقف | الاختيار | ليه |
|---|---|---|
| API إنتاج لفريق، APM و Sentry | Node | الأكتر توافقًا ومتجرّب |
| سكربتات، CLI، تجارب سريعة | Bun | بداية وتسطيب أسرع، TS من غير إعداد |
| CI بطيء في التسطيب (لينكس) | Bun كـ package manager بس | من غير ما تغيّر الـ runtime |
| كود مش واثق فيه، أدوات داخلية | Deno | الصلاحيات |
| Edge (قريب من اليوزر) | Hono على Workers أو Deno Deploy | نفس الكود |

---

## الخلاصة

- Node هو الافتراضي الآمن في الإنتاج.
- Bun أسرع فعلًا (٢٧٪ في HTTP هنا، وأكتر بكتير في البداية والتسطيب على لينكس)، بس جرّب التوافق قبل الإنتاج.
- Deno ميزته الصلاحيات والأدوات، مش السرعة.
- اكتب الـ API بـ Hono وانت مش هتبقى محبوس في واحد منهم.`,
          lines: [
            R`بيشغّل نفس الـ Hono app على Node عن طريق [[@hono/node-server]] (ملف [[src/node.ts]] من درس [[Hono على كل runtime]]) على بورت 3000. شغّل واحد بس في المرة عشان البورت.`,
            R`نفس الـ app على Bun: الملف بيعمل [[export default { port, fetch }]] و Bun بيشغّل [[Bun.serve]] بيه، على نفس البورت عشان القياس يبقى على نفس الطلب.`,
            R`نفس الـ app على Deno بـ [[Deno.serve]]، و [[--allow-net=0.0.0.0:3000]] صلاحية السماع على البورت ده بس، وإلا Deno يقع قبل ما يفتحه.`,
            R`من ترمنال تاني والسيرفر شغال: [[autocannon]] بيضرب السيرفر طلبات كتير ويقيس. [[-c 50]] = ٥٠ اتصال في نفس الوقت، و [[-d 8]] = لمدة ٨ ثواني، وفي الآخر بيطبع [[Req/Sec]] والـ latency. القياس من نفس الجهاز، فالأرقام للمقارنة بين التلاتة بس.`,
          ],
          sol: R`اللي طلع عندي على ويندوز 11 (متوسط [[Req/Sec]]): Node 16,260، و Bun 20,702، و Deno 17,074. يعني Bun أسرع بحوالي ٢٧٪ في hello world، مش ٣ أضعاف.

ولمشروع حقيقي: لو بيستخدم أداة مراقبة بتعتمد على [[async_hooks]] أو بيقرا [[v8.getHeapStatistics]]، أو فيه native addons، أو هيتنشر على منصة بتدعم Node بس، يبقى Node. لو سكربت أو أداة داخلية، Bun بيوفّر وقت. ولو بيشغّل كود من بره، Deno بصلاحيات محددة.`
        }
      ]
    }
]);
