// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "قاعدة البيانات",
      l: 2,
      n: "Prisma من جوه الـ services، و transactions للعمليات اللي لازم تتم كلها أو ولا حاجة، و pagination لأي قايمة",
      items: [
        {
          cmd: "Prisma client",
          title: "كلّم الداتابيز من الـ service",
          desc: R`Prisma بيولّد client من الـ schema فيه دالة لكل جدول ([[prisma.task.findMany]] و [[create]] و [[update]])، وبتعمل منه instance واحد للتطبيق كله في [[db.js]].

إزاي تكتب الـ schema والـ migrations وإعداد Prisma 7 (الـ generator والـ driver adapter)، ده في تاب «SQL و Prisma». هنا بنستخدمه من Express.`,
          example: R`// services/tasks.service.js
import { prisma } from "../db.js";

export const list = (userId) =>
  prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true, title: true, done: true } });

export const create = (userId, data) => prisma.task.create({ data: { ...data, userId } });

export const update = async (userId, id, data) => {
  const { count } = await prisma.task.updateMany({ where: { id, userId }, data });
  if (count === 0) throw new AppError(404, "Task not found");
  return prisma.task.findUnique({ where: { id } });
};`,
          try: R`حوّل الـ array اللي في الذاكرة لجدول Task في Prisma، وخلي كل الـ services تستخدمه. شغّل السيرفر مرتين ورا بعض واتأكد إن البيانات لسه موجودة. وفعّل [[log: ["query"]]] في الـ client وشوف الـ SQL الحقيقي.`,
          flag: "script",
          deep: {
            why: "الـ array اللي في الذاكرة بيضيع مع كل restart ومبيتشاركش بين نسختين. الداتابيز هي المكان الحقيقي، و Prisma بيخليك تكلّمها بـ JavaScript فيه autocomplete وأنواع بدل SQL strings، ومن غير SQL injection.",
            how: R`الـ client بيفتح pool من الاتصالات بالداتابيز ويعيد استخدامها، وكل [[new PrismaClient()]] يعني pool جديد. عشان كده instance واحد في [[db.js]]، وكل الملفات بتستورد نفس الـ module (والـ module في Node بيتحمّل مرة واحدة). اتنين أو تلاتة instances في ملفات مختلفة معناها اتصالات مضاعفة، ومع كل restart في التطوير ممكن توصل لـ [[too many connections]].

في Prisma 7: الـ generator الجديد [[prisma-client]] بيطلّع الكود في فولدر انت بتحدده (مش جوه node_modules) وبتستورد منه، ومحتاج driver adapter زي [[@prisma/adapter-pg]]، ومتغيرات البيئة مبقتش بتتقري لوحدها. والكود المتولّد TypeScript، فلو الـ backend بتاعك JavaScript غالبًا هتكتبه TypeScript أو تشغّله بـ tsx. كل ده بالتفصيل في تاب «SQL و Prisma».

[[select]] بيرجّع الحقول اللي طلبتها بس، ودا مهم لحاجتين: الأداء، وإنك متسرّبش [[passwordHash]] في رد بالغلط. و [[include]] بيجيب العلاقات ([[include: { tags: true }]]).

والأخطاء ليها [[code]]: [[P2002]] قيمة unique اتكررت (الإيميل موجود)، و [[P2025]] السجل مش موجود في update أو delete. حوّلهم لـ 409 و 404 في الـ error handler.`,
            when: "أي backend بـ Postgres أو MySQL أو SQLite. البدائل: Drizzle (أقرب لـ SQL وأخف)، و Kysely، أو [[pg]] مباشرة لو عايز SQL صافي.",
            mistakes: R`في مشروع حقيقي كان [[db.js]] عامل singleton صح، بس فيه كمان [[setInterval]] كل دقيقتين يعمل [[SELECT 1]] ويعيد الاتصال بإيده. Prisma بيدير الـ pool لوحده، والكود ده زوّد تعقيد من غير فايدة. وترجّع نتيجة [[prisma.user.findUnique]] كلها في الرد ومعاها الـ hash. و [[await]] جوه loop على ١٠٠٠ عنصر بدل [[createMany]] أو شرط [[in]].`
          },
          teach: R`## ملف service فيه ٣ دوال، كل واحدة query

المثال [[services/tasks.service.js]]: دوال بتاخد [[userId]] وبيانات عادية، وتكلّم الداتابيز بـ [[prisma]]، وترجّع النتيجة. الـ controller يناديها ويرجّع اللي رجع كـ JSON. والـ solCode هو [[db.js]] اللي بيعمل الـ client.

اتشغّل على ويندوز 11 بـ Node 24.19 و Prisma 7.10 و [[@prisma/adapter-pg]]، على Postgres 16 في Docker (container باسم [[teach-api02-pg]] على بورت 54872)، وسيرفر Express على 5845 عليه [[requireAuth]] والـ routes بتنادي الـ service دي. الـ schema فيها [[model Task]] بـ [[id]] و [[title]] و [[done]] و [[createdAt]] و [[userId]].

---

## ١. الـ solCode الأول: [[db.js]]

~~~javascript
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});
~~~

| الحتة | معناها |
|---|---|
| [[./generated/prisma/client.js]] | الكود اللي [[npx prisma generate]] ولّده من الـ schema، في الفولدر اللي حددته في [[output]] |
| [[PrismaPg]] | الـ driver adapter: Prisma 7 بيكلّم Postgres من خلال مكتبة [[pg]] |
| [[connectionString: process.env.DATABASE_URL]] | عنوان الداتابيز من متغير بيئة، زي [[postgresql://user:pass@localhost:54872/app]] |
| [[log: [...]]] | في التطوير اطبع كل query، وفي غيره الأخطاء بس |
| [[export const prisma]] | instance واحد، وأي ملف يعمل [[import { prisma } from "./db.js"]] بياخد نفسه |

الكود المتولّد ملفات [[.ts]] مش [[.js]]. فلما شغّلت بـ [[node]] عادي:

~~~text الناتج
ERR_MODULE_NOT_FOUND Cannot find module '...\generated\prisma\client.js' imported from ...\db.js
~~~

وبـ [[npx tsx server.js]] اشتغل، لأن tsx بيفهم TypeScript وبيلاقي [[client.ts]] لما تكتب [[client.js]].

---

## ٢. [[list]]

~~~javascript
export const list = (userId) =>
  prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true, title: true, done: true } });
~~~

- [[(userId) => ...]] من غير [[{ }]]: الدالة بترجّع اللي بعد السهم على طول (Promise من Prisma).
- [[findMany]]: هات كل الصفوف اللي تطابق.
- [[where: { userId }]]: مهام اليوزر ده بس.
- [[orderBy: { createdAt: "desc" }]]: الأحدث الأول (desc = descending، تنازلي).
- [[select: { id: true, ... }]]: الحقول دي بس.

~~~text الناتج: GET /api/tasks
[{"id":4,"title":"learn prisma","done":false}]
~~~

~~~text الـ SQL في اللوج
prisma:query SELECT "public"."Task"."id", "public"."Task"."title", "public"."Task"."done" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC OFFSET $2
~~~

[[select]] اتحول لأعمدة محددة بدل [[*]]، فـ [[createdAt]] و [[userId]] مطلعوش في الرد. و [[$1]] و [[$2]] **parameters**: القيم بتتبعت منفصلة عن نص الـ SQL، فمهما اليوزر كتب مش هيتنفذ كـ SQL.

---

## ٣. [[create]]

~~~javascript
export const create = (userId, data) => prisma.task.create({ data: { ...data, userId } });
~~~

[[...data]] (spread) بينسخ كل الحقول اللي في [[data]]، وبعدها [[userId]]. ولأن [[userId]] جاي **بعد**، لو [[data]] فيها [[userId]] من اليوزر بيتكتب عليه. (وفي الأصل [[data]] جاية من validation فمش هيبقى فيها.)

~~~text الناتج: POST /api/tasks {"title":"learn prisma"}
HTTP/1.1 201 Created
{"id":4,"title":"learn prisma","done":false,"createdAt":"2026-10-07T07:59:47.133Z","userId":1}
~~~

~~~text الـ SQL
INSERT INTO "public"."Task" ("title","done","createdAt","userId") VALUES ($1,$2,$3,$4) RETURNING "public"."Task"."id", ...
~~~

[[create]] من غير [[select]] بيرجّع الصف كله، و [[RETURNING]] هو اللي بيجيبه في نفس الـ query. [[done]] و [[createdAt]] من الـ defaults اللي في الـ schema.

---

## ٤. [[update]]

~~~javascript
export const update = async (userId, id, data) => {
  const { count } = await prisma.task.updateMany({ where: { id, userId }, data });
  if (count === 0) throw new AppError(404, "Task not found");
  return prisma.task.findUnique({ where: { id } });
};
~~~

1. [[updateMany]] بالشرطين (درس [[ownership (IDOR)]]) ويرجّع [[{ count }]].
2. [[count === 0]]: مش موجودة أو مش بتاعتك، فـ 404.
3. [[updateMany]] مبيرجّعش الصف، فـ [[findUnique]] بيجيب النسخة الجديدة. هنا آمن بالـ id بس، لأننا لسه متأكدين إنها بتاعتك.

~~~text الـ SQL
UPDATE "public"."Task" SET "title" = $1 WHERE ("public"."Task"."id" = $2 AND "public"."Task"."userId" = $3)
SELECT ... FROM "public"."Task" WHERE ("public"."Task"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
~~~

---

## ٥. البيانات بتفضل بعد الـ restart

قفلت السيرفر وشغّلته تاني، و [[GET /api/tasks]] رجّع [[[{"id":4,"title":"learn prisma 7","done":false}]]]، والمهمة الجديدة اللي بعدها أخدت [[id 5]]: العداد بيكمّل من الداتابيز مش من الصفر.

---

## ٦. الأخطاء ليها [[code]]

عملت يوزر بإيميل موجود:

~~~text الناتج
Unique constraint failed on the constraint: $__btUser_email_key$__bt
P2002
~~~

[[e.code]] بـ [[P2002]] = قيمة unique اتكررت، فحوّلها 409. و [[P2025]] (شفناه في درس الـ IDOR) = الصف مش موجود في update أو delete، فـ 404.

---

## الخلاصة

| الدالة | Prisma | SQL |
|---|---|---|
| [[list]] | [[findMany]] + [[where]] + [[orderBy]] + [[select]] | [[SELECT cols ... WHERE ... ORDER BY]] |
| [[create]] | [[create({ data })]] | [[INSERT ... RETURNING]] |
| [[update]] | [[updateMany]] بشرط الملكية ثم [[findUnique]] | [[UPDATE ... WHERE id AND userId]] |

> [[new PrismaClient]] في [[db.js]] بس، وكل الملفات تستورده. و [[select]] دايمًا لما ترجّع بيانات يوزر، عشان [[passwordHash]] ميطلعش في الرد.`,
          lines: [
            "الـ client الوحيد من db.js.",
            "مهام يوزر معين...",
            "بشرط الملكية، والأحدث الأول، والحقول اللي محتاجها بس.",
            "إضافة: البيانات المتحققة ومعاها صاحبها من التوكن.",
            "تعديل.",
            "عدّل بشرط الملكية.",
            "متعدلش حاجة: 404.",
            "رجّع النسخة الجديدة.",
            "قفلة."
          ],
          sol: R`بعد ما تعمل مهام وتقفل السيرفر وتشغّله تاني، [[GET /api/tasks]] بيرجّع نفس المهام، لأنها في Postgres مش في array في الذاكرة. والـ ids بتكمّل من آخر رقم ومبترجعش لـ 1.

ومع تفعيل [[log]] على query، كل استدعاء بيطبع SQL حقيقي، مثلًا [[findMany]] بـ [[select]] و [[orderBy]]: [[prisma:query SELECT "public"."Task"."id", "public"."Task"."title", "public"."Task"."done" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC OFFSET $2]]. لاحظ [[$1]]: القيم بتتبعت كـ parameters، ده اللي بيمنع SQL injection. و [[create]] بيطلع [[INSERT INTO ... RETURNING ...]].

لو البيانات اختفت بعد restart، يبقى لسه فيه service بتستخدم الـ array القديمة. ولو شفت [[too many connections]] أو السيرفر بطيء في البداية، دوّر على [[new PrismaClient]] في أكتر من ملف.`,
          solCode: R`// db.js
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});`
        },
        {
          cmd: "$transaction",
          title: "عمليتين لازم يحصلوا مع بعض أو ميحصلوش خالص",
          desc: R`الـ transaction بتضمن إن كل الـ queries جواها تنجح مع بعض، أو لو واحدة فشلت كله يرجع زي ما كان.

الأوردر يتعمل، والمخزون يقل، والكوبون يتحسب: لو حاجة وقعت في النص، مفيش أوردر من غير خصم مخزون. في Prisma: [[prisma.$transaction(async (tx) => { ... })]]، وجواها بتستخدم [[tx]] بدل [[prisma]].`,
          example: R`export async function redeemCoupon(userId, code) {
  return prisma.$transaction(async (tx) => {
    const coupon = await tx.coupon.findUnique({ where: { code } });
    if (!coupon) throw new AppError(404, "Coupon not found");
    const updated = await tx.coupon.updateMany({
      where: { id: coupon.id, usedCount: { lt: coupon.maxUses } },
      data: { usedCount: { increment: 1 } },
    });
    if (updated.count === 0) throw new AppError(409, "Coupon fully used");
    return tx.redemption.create({ data: { userId, couponId: coupon.id } });
  });
}`,
          try: R`اعمل كوبون [[maxUses: 1]]، وابعت طلبين في نفس اللحظة (أمرين curl في نفس السطر بـ [[&]] بينهم). مع الكود ده واحد بس هينجح. وبعدين جرّب النسخة الغلط: [[count]] وبعدين [[create]] من غير الشرط، وشوف الاتنين بينجحوا.`,
          flag: "script",
          deep: {
            why: "أي عملية بتلمس أكتر من صف ممكن تقع في النص: السيرفر يقف، أو constraint يتكسر، أو خطأ في الكود. من غير transaction بتفضل بيانات نص-نص: فلوس اتخصمت ومفيش أوردر. ومع طلبين في نفس اللحظة، «اتأكد وبعدين اكتب» بيسمح للاتنين يعدّوا من نفس الشرط.",
            how: R`Prisma فيه شكلين: array ([[prisma.$transaction([q1, q2])]]) لـ queries مستقلة عن بعض، و interactive (الدالة) لما query محتاجة نتيجة اللي قبلها. في الـ interactive، Prisma بيفتح [[BEGIN]]، وينفّذ اللي جوه على نفس الاتصال، ولو الدالة خلصت يعمل [[COMMIT]]، ولو رمت خطأ يعمل [[ROLLBACK]] (درس «BEGIN و ROLLBACK» في تاب «PostgreSQL»).

الـ transaction لوحدها مش بتحل الـ race condition: في مستوى العزل الافتراضي في Postgres (Read Committed)، طلبين ممكن يقروا نفس [[usedCount]] مع بعض ويقرروا الاتنين إن لسه فيه مكان. عشان كده الشرط اتحط جوه الـ update نفسه، والداتابيز بتقفل الصف وقت الـ update، فالطلب التاني بيستنى ويشوف القيمة الجديدة ومبيلاقيش صف يطابق. البدائل: [[SELECT ... FOR UPDATE]] بـ [[$queryRaw]]، أو [[isolationLevel: "Serializable"]] مع إعادة المحاولة لو فشلت، أو unique constraint يمنع التكرار.

الـ interactive transaction بتمسك اتصال من الـ pool طول ما هي شغالة، وليها timeout افتراضي ٥ ثواني. عمرك ما تنادي API خارجي (دفع أو إيميل) جوه transaction: ابعت الإيميل بعد ما الـ transaction تخلص.`,
            when: "أي عملية بتكتب في أكتر من جدول ولازم تفضل متسقة: أوردر، وتحويل رصيد، وكوبون، وتسجيل مع إنشاء بروفايل. وأي «اتأكد وبعدين اكتب» على حاجة ليها حد.",
            mistakes: R`في مشروع حقيقي كان التحقق من حد استخدام الكوبون [[count]] وبعدين [[create]] كخطوتين منفصلتين من غير transaction ولا شرط ذرّي، فطلبين في نفس اللحظة ممكن يعدّوا الحد. وتستخدم [[prisma]] بدل [[tx]] جوه الـ transaction بالغلط، فالـ query دي بره الـ transaction ومبترجعش مع الـ rollback. وتحط fetch لبوابة دفع جوه transaction فتفضل ماسكة اتصال ١٠ ثواني وتقع بـ timeout.`
          },
          teach: R`## دالة بتلف ٣ queries في transaction واحدة

[[redeemCoupon]] بتجيب الكوبون، وتزوّد عداد استخدامه بشرط إنه لسه مخلصش، وتسجّل إن اليوزر استخدمه. لو أي خطوة رمت خطأ، كل اللي اتعمل قبلها بيرجع.

اتشغّل على ويندوز 11 بـ Node 24.19 و Prisma 7.10 على Postgres 16 في Docker، والدالة جوه route [[POST /api/coupons/:code/redeem]] على بورت 5846 عليه [[requireAuth]]، و [[log: ["query"]]] شغال. الجدولين:

~~~text prisma/schema.prisma
model Coupon {
  id          Int          @id @default(autoincrement())
  code        String       @unique
  maxUses     Int
  usedCount   Int          @default(0)
  redemptions Redemption[]
}

model Redemption {
  id       Int    @id @default(autoincrement())
  userId   Int
  couponId Int
  user     User   @relation(fields: [userId], references: [id])
  coupon   Coupon @relation(fields: [couponId], references: [id])
}
~~~

---

## ١. [[return prisma.$transaction(async (tx) => { ... })]]

- [[$transaction]]: الـ [[$]] في أول الاسم علامة Prisma لدوال الـ client نفسه (مش جدول).
- بتديله دالة async، و Prisma بيناديها بـ [[tx]]: client زي [[prisma]] بالظبط، بس كل query عليه بتمشي في نفس الـ transaction.
- لو الدالة خلصت: **COMMIT** (احفظ كله)، واللي رجّعته بيرجع من [[$transaction]]. لو رمت: **ROLLBACK** (الغي كله) والخطأ بيترمي لبرّه.
- [[return]] قدامها عشان [[redeemCoupon]] ترجّع نتيجة الـ transaction.

---

## ٢. [[const coupon = await tx.coupon.findUnique({ where: { code } })]]

هات الكوبون بالكود، ولو مش موجود [[throw new AppError(404, "Coupon not found")]]:

~~~text الناتج: POST /api/coupons/NOPE/redeem
HTTP/1.1 404 Not Found
{"error":"Coupon not found"}
~~~

---

## ٣. [[updateMany]] بشرط: قلب الدرس

~~~javascript
const updated = await tx.coupon.updateMany({
  where: { id: coupon.id, usedCount: { lt: coupon.maxUses } },
  data: { usedCount: { increment: 1 } },
});
~~~

| الحتة | معناها |
|---|---|
| [[usedCount: { lt: coupon.maxUses }]] | [[lt]] = less than: عدّل بس لو [[usedCount < maxUses]] |
| [[usedCount: { increment: 1 }]] | زوّد ١ على القيمة **اللي في الداتابيز**، مش على رقم قريناه |

~~~text الـ SQL
UPDATE "public"."Coupon" SET "usedCount" = ("public"."Coupon"."usedCount" + $1) WHERE ("public"."Coupon"."id" = $2 AND "public"."Coupon"."usedCount" < $3)
~~~

الشرط والزيادة في جملة SQL واحدة. Postgres بيقفل الصف وهو بيعدّله، فطلب تاني جاي في نفس اللحظة بيستنى، ولما يكمّل بيشوف القيمة الجديدة، والشرط مبقاش متحقق. و [[updateMany]] (مش [[update]]) عشان يرجّع [[{ count }]] بدل ما يرمي لو الشرط فشل.

## ٤. [[if (updated.count === 0) throw new AppError(409, "Coupon fully used")]]

صفر يعني الكوبون خلص. **409 Conflict**: الطلب سليم بس بيتعارض مع حالة البيانات دلوقتي.

## ٥. [[return tx.redemption.create({ data: { userId, couponId: coupon.id } })]]

سجّل الاستخدام. وده آخر سطر، فلو نجح الدالة خلصت والـ transaction تعمل COMMIT.

---

## ٦. التجربة: طلبين في نفس اللحظة (الـ solCode)

~~~bash
curl -s -X POST localhost:5846/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN" & curl -s -X POST localhost:5846/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN"; wait
~~~

- [[&]] في bash: شغّل الأمر اللي قبلها في الخلفية وكمّل على طول، فالطلبين بيطلعوا مع بعض.
- [[wait]]: استنى لحد ما اللي في الخلفية يخلص.

~~~text الناتج (كوبون maxUses: 1)
{"id":1,"userId":1,"couponId":1}{"error":"Coupon fully used"}
~~~

وفي لوج Prisma:

~~~text الناتج
prisma:query UPDATE "public"."Coupon" SET "usedCount" = ... WHERE (... AND "public"."Coupon"."usedCount" < $3)
prisma:query INSERT INTO "public"."Redemption" ("userId","couponId") VALUES ($1,$2) RETURNING ...
prisma:query COMMIT
prisma:query UPDATE "public"."Coupon" SET "usedCount" = ... WHERE (... AND "public"."Coupon"."usedCount" < $3)
prisma:query ROLLBACK
~~~

الأول عمل COMMIT، والتاني الـ UPDATE بتاعه ملقاش صف ([[count]] صفر)، فرمى 409 وحصل ROLLBACK.

في PowerShell 7 نفس التجربة بـ [[1..2 | ForEach-Object -Parallel { curl.exe -s -X POST http://localhost:5846/api/coupons/PS1/redeem -H "Authorization: Bearer $env:TOKEN" }]] ([[-Parallel]] بيشغّل الاتنين مع بعض، وموجود في 7 بس): واحد رجّع redemption والتاني [[Coupon fully used]].

### النسخة الغلط

نفس الخطوات من غير transaction ولا شرط ذرّي: [[prisma.redemption.count]]، ولو أقل من [[maxUses]] اعمل [[create]] (وحطيت ٥٠ms بينهم عشان السباق يبان كل مرة):

~~~text الناتج
{"id":2,"userId":1,"couponId":2}{"id":3,"userId":1,"couponId":2}
~~~

الاتنين نجحوا. الطلبين عملوا [[SELECT COUNT(*)]] وشافوا صفر قبل ما أي واحد يعمل [[INSERT]].

~~~text الناتج: الجدول بعد التجربتين
  code  | usedCount | redemptions
--------+-----------+-------------
 SAVE10 |         1 |           1
 WRONG1 |         0 |           2
~~~

---

## ٧. الـ rollback بيرجّع اللي اتعمل فعلًا

بعتّ توكن ليوزر رقم 999 (مش موجود) على كوبون [[maxUses: 5]]. الـ UPDATE نجح، والـ INSERT وقع لأن الـ [[userId]] مش موجود في جدول User:

~~~text الناتج
Foreign key constraint violated on the constraint: $__btRedemption_userId_fkey$__bt
prisma:query ROLLBACK
~~~

والرد 500، و [[usedCount]] في الجدول فضل [[0]]: الزيادة اللي حصلت في الـ UPDATE اترجعت.

---

## الخلاصة

| السطر | الدور |
|---|---|
| [[prisma.$transaction(async (tx) => ...)]] | كله أو ولا حاجة: COMMIT لو خلصت، ROLLBACK لو رمت |
| [[tx]] جوه، مش [[prisma]] | أي query بـ [[prisma]] بتبقى برّه الـ transaction |
| [[updateMany]] + [[lt]] + [[increment]] | الشرط والكتابة في UPDATE واحد، فطلبين ميعدّوش مع بعض |
| [[count === 0]] | الشرط فشل: 409 |

> الـ transaction لوحدها مش بتمنع السباق. اللي منعه إن الشرط جوه الـ UPDATE. ومتكلمش API خارجي جوه transaction.`,
          lines: [
            "استخدام كوبون ليه حد أقصى.",
            "كل اللي جوه transaction واحدة، و [[tx]] client مربوط بيها.",
            "هات الكوبون.",
            "مش موجود: throw، والـ transaction كلها ترجع.",
            "زوّد العداد، بس بشرط...",
            "إنه لسه أقل من الحد. الشرط والزيادة في query واحدة، فطلبين في نفس اللحظة ميعدّوش الاتنين.",
            "زوّد ١.",
            "قفلة.",
            "متعدلش حاجة؟ يبقى خلص. throw يلغي كل حاجة.",
            "سجّل الاستخدام. لو ده فشل، الزيادة اللي فوق بترجع.",
            "قفلة الـ transaction.",
            "قفلة."
          ],
          sol: R`مع الكود ده، واحد من الطلبين بينجح (رد الـ redemption) والتاني بياخد [[409]] و [[{"error":"Coupon fully used"}]]، وفي القاعدة redemption واحد بس و [[usedCount]] بـ 1. السبب: [[updateMany]] بالشرط [[usedCount < maxUses]] بيتنفّذ كـ UPDATE واحد، وPostgres بيقفل الصف، فالطلب التاني لما يوصل يلاقي الشرط مبقاش متحقق و [[count]] بـ 0.

النسخة الغلط (تعد الـ redemptions، ولو أقل من maxUses تعمل create) الاتنين بينجحوا وتلاقي redemptions 2 لكوبون مسموح مرة واحدة: الطلبين قروا العدد 0 في نفس الوقت قبل ما أي واحد يكتب. ولأن ده race، ممكن تحتاج تجرّب كذا مرة، أو تحط [[await new Promise((r) => setTimeout(r, 50))]] بين الـ count والـ create عشان تشوفه كل مرة.

ولو النسخة الصح نفسها نجح فيها الاتنين، اتأكد إن الشرط [[usedCount: { lt: coupon.maxUses } ]] جوه الـ [[where]] بتاع الـ update نفسه، مش [[if]] في JavaScript قبله.`,
          solCode: R`# كوبون maxUses: 1 وطلبين في نفس اللحظة
curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN" & curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN"; wait
# {"id":1,"userId":7,"couponId":1}{"error":"Coupon fully used"}`
        },
        {
          cmd: "mongoose",
          title: "لو الداتابيز MongoDB",
          desc: R`Mongoose بيدّيك schema و model لكل collection في Mongo ([[Task.find()]] و [[Task.create()]])، وبيقعد في نفس مكان Prisma في المعمارية: جوه الـ services.

أوامر الشيل (mongosh والباك أب) في تاب «MongoDB». هنا الاستخدام من Express باختصار.`,
          example: R`import mongoose from "mongoose";

await mongoose.connect(config.MONGO_URL);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  done: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);

const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20).lean();

const recent = await Task.find().sort({ createdAt: -1 }).limit(50).populate({ path: "userId", select: "name email" }).lean();`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل الـ model ده، وجرّب [[Task.create]] من غير title وشوف الـ ValidationError. وقارن سرعة [[find()]] بـ [[lean()]] ومن غيرها على ١٠٠٠٠ مستند. وبعدين فعّل [[mongoose.set("debug", true)]] وهات ٥٠ مهمة ومعاها اسم صاحبها بطريقتين: loop فيه [[User.findById]] لكل مهمة، و [[populate]]. عد الـ queries في اللوج.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير (خصوصًا لوحات الإدارة والمشاريع القديمة) مبنية على Mongo و Mongoose، وأي انترفيو Node ممكن يسألك عنه. Mongo نفسها مفيهاش schema، و Mongoose بيرجّعلك الشكل والتحقق على مستوى التطبيق.",
            how: R`[[mongoose.connect]] بيفتح pool، و Mongoose بيخزّن أي عمليات لحد ما الاتصال يجهز (buffering)، فالـ query قبل الاتصال مبتفشلش على طول: بتستنى ١٠ ثواني وبعدين تفشل. عشان كده [[await connect]] قبل [[listen]].

الـ schema بتعمل validation وقت [[save]] و [[create]]، بس مش افتراضيًا في [[updateOne]] و [[findOneAndUpdate]] إلا لو [[runValidators: true]]. والـ documents اللي بترجع من [[find]] objects تقيلة فيها دوال (save و populate)، و [[lean()]] بيرجّع objects عادية أسرع وأخف لو هتقرا بس.

[[populate("userId")]] بيجيب المستندات المرتبطة بـ query تانية (Mongo مفيهاش joins زي SQL): بيجمع كل الـ userIds من النتيجة ويعمل [[User.find({ _id: { $in: [...] } })]] واحدة، ويحط كل يوزر مكان الـ id بتاعه. يعني ٥٠ مهمة بيوزرهم = ٢ queries. أما الـ loop اللي بيعمل [[await User.findById(t.userId)]] لكل مهمة فده N+1: ٥٠ مهمة = ٥١ query، وكل واحدة رحلة للقاعدة. و [[select]] جوه populate بيجيب الحقول اللي محتاجها بس (ومتنساش إن من غيره الـ hash بتاع الباسورد ممكن يطلع في الرد). والـ populate المتداخل ([[populate({ path: "userId", populate: { path: "company" } })]]) كل مستوى query زيادة، ولو محتاج joins وتجميع تقيل، [[aggregate]] مع [[$lookup]] بيعملها في query واحدة على السيرفر.

الـ transactions: [[await mongoose.connection.transaction(async (session) => { await A.updateOne(..., { session }); await B.updateOne(..., { session }); })]]. لازم تعدّي [[session]] لكل عملية جواها، وأي عملية من غيره بتتنفّذ برّه الـ transaction ومش بترجع لو حصل rollback. والدالة دي بتعيد المحاولة لوحدها في أخطاء transient، فالكود جواها لازم يبقى آمن لو اتنفّذ مرتين (متبعتش إيميل جواها).

والـ transactions في Mongo محتاجة replica set حتى لو node واحدة. و ObjectId مش صحيح (زي [[abc]]) بيعمل [[CastError]]، فاتحقق منه قبل الـ query.`,
            when: "بيانات شكلها بيتغير كتير، أو مستندات متداخلة بتتقري مع بعض، أو مشروع قايم عليه. للبيانات المترابطة (فلوس وأوردرات وصلاحيات)، Postgres غالبًا اختيار أأمن.",
            mistakes: R`[[findOneAndUpdate]] من غير [[runValidators]] فبيانات غلط تتحفظ. و [[find()]] من غير [[limit]] على collection فيها مليون مستند. و [[findById]] جوه loop بدل populate أو [[$in]] (N+1). و transaction بتنسى [[session]] في عملية من عملياتها. وفي مشروع حقيقي كان [[pre("save")]] بيعمل hash للباسورد (صح)، بس الـ model نفسه كان فيه حقل للباسورد نص صريح جنبه (درس [[bcrypt]]).`
          },
          teach: R`## ٣ خطوات: اتصل، وعرّف الشكل، واسأل

[[mongoose.connect]] مرة واحدة. [[new mongoose.Schema]] بتقول المستند شكله إيه. [[mongoose.model]] بيطلّع منها [[Task]] اللي فيه [[find]] و [[create]]. وبعدين سطرين queries: مهام يوزر، وآخر ٥٠ مهمة ومعاها أصحابها.

اتشغّل على ويندوز 11 بـ Node 24.19 و Mongoose 9.11، على Mongo 8 في Docker (container باسم [[teach-api02-mongo]] على بورت 27845، و [[MONGO_URL]] = [[mongodb://localhost:27845/teach_api02_mg]])، ومعاه model [[User]] فيه [[name]] و [[email]] و [[passwordHash]] و ٥٠ يوزر تجربة.

---

## ١. [[await mongoose.connect(config.MONGO_URL)]]

بيفتح pool اتصالات. الـ [[await]] قبل أي query وقبل [[app.listen]]، لأن Mongoose بيحوش (buffering) أي query قبل الاتصال ويستنى. جرّبت query من غير connect خالص:

~~~text الناتج
MongooseError: Operation $__bttasks.find()$__bt buffering timed out after 10000ms
~~~

استنى ١٠ ثواني وبعدين فشل، بدل ما يقولك على طول.

---

## ٢. [[taskSchema]]

| الحقل | الإعداد | معناه |
|---|---|---|
| [[title]] | [[type: String, required: true]] | نص ولازم يبقى موجود |
| | [[trim: true]] | يشيل المسافات قبل الحفظ |
| | [[maxlength: 200]] | أقصى طول |
| [[done]] | [[type: Boolean, default: false]] | لو مش مبعوت يبقى [[false]] |
| [[userId]] | [[type: mongoose.Schema.Types.ObjectId]] | id مستند تاني (ObjectId: الـ id بتاع Mongo، ٢٤ حرف hex) |
| | [[ref: "User"]] | المستند ده في model اسمه User، ودا اللي [[populate]] بيستخدمه |
| | [[index: true]] | اعمل index على الحقل ده |

و [[{ timestamps: true }]] (الـ argument التاني) بيضيف [[createdAt]] و [[updatedAt]] لوحده.

## ٣. [[export const Task = mongoose.model("Task", taskSchema)]]

[[model("Task", ...)]] بيربط الـ schema بـ collection اسمها [[tasks]] (Mongoose بيعمل الاسم صغير وجمع).

~~~text الناتج: Task.create({ title: "  buy milk  ", userId })
{
  title: 'buy milk',
  done: false,
  userId: new ObjectId('6ac5fe463c3accb1b14687c7'),
  _id: new ObjectId('6ac5fe463c3accb1b14687f9'),
  createdAt: 2026-10-07T08:09:42.302Z,
  updatedAt: 2026-10-07T08:09:42.302Z,
  __v: 0
}
~~~

[[trim]] شال المسافات، و [[done]] من الـ default، و [[_id]] Mongo عمله، و [[createdAt]] و [[updatedAt]] من [[timestamps]]، و [[__v]] رقم نسخة Mongoose بيستخدمه داخليًا.

والـ index اتعمل فعلًا:

~~~text الناتج: Task.collection.indexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { userId: 1 }, name: 'userId_1' }
]
~~~

### الـ validation

~~~text الناتج: Task.create({ userId }) من غير title
ValidationError | Task validation failed: title: Path $__bttitle$__bt is required. | required
~~~

~~~text الناتج: title طوله 201
Task validation failed: title: Path $__bttitle$__bt ($__btxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...$__bt, length 201) is longer than the maximum allowed length (200).
~~~

و [[err.errors.title.kind]] = [[required]]: كل حقل غلط ليه مكان في [[err.errors]].

---

## ٤. [[Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20).lean()]]

سلسلة، كل دالة بتضيف حاجة على الـ query، ومحدش بيتنفذ لحد الـ [[await]]:

| الحتة | معناها |
|---|---|
| [[find({ userId: req.user.id })]] | المستندات اللي [[userId]] بتاعها ده |
| [[sort({ createdAt: -1 })]] | [[-1]] تنازلي (الأحدث الأول)، و [[1]] تصاعدي |
| [[limit(20)]] | أول ٢٠ بس |
| [[lean()]] | رجّع objects عادية |

النتيجة ٢٠ مستند. بس خلي بالك من نوع الـ id: درس [[requireAuth]] بيعمل [[Number(payload.sub)]] لأن Postgres بيستخدم أرقام. في Mongo الـ id ObjectId، ولما جرّبت [[Task.find({ userId: 7 })]]:

~~~text الناتج
CastError Cast to ObjectId failed for value "7" (type number) at path "userId" for model "Task"
~~~

فمع Mongo خلي [[req.user.id]] النص زي ما هو ([[payload.sub]]) من غير [[Number]]. ونفس الـ CastError مع [[Task.findById("abc")]].

### [[lean()]] بيفرق قد إيه؟

على ١٠٠٠٠ مستند، مرتين:

~~~text الناتج
find(): 131.921ms
find().lean(): 51.637ms
find(): 118.022ms
find().lean(): 44.419ms
~~~

حوالي مرتين ونص أسرع. من غير [[lean]] كل مستند object من نوع [[model]] فيه [[save]] ومتابعة للتغييرات، ومعاه object عادي ([[Object]]) و [[save]] بـ [[undefined]]. لو هترجّعه JSON بس، [[lean]].

---

## ٥. [[populate({ path: "userId", select: "name email" })]]

بعدّ الـ queries بـ [[mongoose.set("debug", fn)]] (الدالة بتتنادى مع كل query):

~~~text الناتج
loop queries: 51
populate queries: 2
~~~

- الـ loop ([[for]] على ٥٠ مهمة وجواه [[await User.findById(t.userId)]]): query للمهام و ٥٠ لليوزرز = ٥١. ده N+1.
- [[populate]]: ٢ بس. ولما شغّلت [[mongoose.set("debug", true)]] على ٣ مهام، اللوج طبع:

~~~text الناتج
Mongoose: tasks.find({}, { sort: { createdAt: -1 }, limit: 3 })
Mongoose: users.find({ _id: { '$in': [ ObjectId("6ac5..d1"), ObjectId("6ac5..d0"), ObjectId("6ac5..cf") ] }}, { projection: { name: 1, email: 1 } })
~~~

جمع كل الـ ids وجابهم في query واحدة بـ [[$in]] («واحد من دول»)، و [[select]] بقى [[projection]]: [[name]] و [[email]] بس. والنتيجة:

~~~text الناتج: أول مهمة
userId: {
  _id: new ObjectId('6ac5fe463c3accb1b14687ea'),
  name: 'user 35',
  email: 'u35@test.local'
}
~~~

[[userId]] بقى object اليوزر مكان الـ id، ومن غير [[passwordHash]] عشان الـ [[select]].

---

## الخلاصة

| | |
|---|---|
| [[await connect]] قبل [[listen]] | وإلا الـ queries تستنى ١٠ ثواني وتفشل |
| [[Schema]] | النوع و [[required]] و [[trim]] و [[maxlength]] و [[default]] و [[ref]] و [[index]] |
| [[timestamps: true]] | [[createdAt]] و [[updatedAt]] لوحدهم |
| [[find().sort().limit().lean()]] | الأحدث، عدد محدود، objects خفيفة |
| [[populate]] + [[select]] | ٢ queries بدل N+1، والحقول اللي محتاجها بس |
| الـ id | ObjectId string، مش [[Number]] |

> الـ validation بتشتغل في [[create]] و [[save]]، ومش في [[updateOne]] و [[findOneAndUpdate]] إلا بـ [[runValidators: true]].`,
          lines: [
            "Mongoose.",
            "اتصل مرة واحدة وانت بتقوم، قبل listen.",
            "شكل المستند.",
            "نص مطلوب، يتشال منه المسافات، وأقصاه ٢٠٠.",
            "boolean والافتراضي false.",
            "مرجع ليوزر، ومعاه index عشان البحث بيه يبقى سريع.",
            "[[timestamps]] بيضيف createdAt و updatedAt لوحده.",
            "الـ model اللي هتستخدمه في الـ services.",
            "مهام اليوزر، الأحدث، أول ٢٠. [[lean]] بيرجّع objects عادية أسرع.",
            "آخر ٥٠ مهمة ومعاها اسم وإيميل صاحبها: query للمهام وواحدة لكل اليوزرز مع بعض، مش واحدة لكل مهمة."
          ],
          sol: R`[[Task.create({ userId })]] من غير title بيرمي [[ValidationError]] ورسالته [[Task validation failed: title: Path $__bttitle$__bt is required.]]، وفي [[err.errors.title.kind]] هتلاقي [[required]]. حوّله في الـ error handler لـ 400.

[[find()]] من غير [[lean()]] بيرجّع Mongoose documents (فيها getters و [[save()]] و change tracking)، و [[lean()]] بيرجّع objects عادية. على ١٠٠٠٠ مستند lean بيبقى أسرع بشكل واضح وبيستهلك ذاكرة أقل (غالبًا مرتين لـ ٣ مرات، حسب الجهاز والحجم). للقراءة وإرجاع JSON استخدم lean دايمًا.

وفي اللوج بـ [[debug]]: الـ loop بيعمل 51 query ([[tasks.find]] مرة، و [[users.findOne]] ٥٠ مرة، واحدة لكل مهمة): ده N+1. و [[populate]] بيعمل 2 بس: find للمهام، وبعدين [[users.find({ _id: { $in: [...] } })]] واحدة لكل الـ ids. لو populate رجّع [[userId]] بـ null، يبقى الـ ref اسمه غلط أو اليوزر اتمسح.`
        },
        {
          cmd: "pagination",
          title: "متبعتش ١٠٠ ألف صف في رد واحد",
          desc: R`أي endpoint بيرجّع قايمة لازم يرجّع صفحة ([[?page=2&limit=20]])، والـ limit ليه حد أقصى من عندك مهما اليوزر طلب.

والرد فيه البيانات ومعاها معلومات الصفحة. والفلترة والترتيب من الـ query برضه، بس من قايمة مسموحة: الترتيب بـ [[createdAt]] أو [[title]] بس، مش بأي عمود اليوزر يكتبه.`,
          example: R`const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(["createdAt", "title"]).default("createdAt"),
  done: z.stringbool().optional(),
});

router.get("/", async (req, res) => {
  const { page, limit, sort, done } = ListQuery.parse(req.query);
  const where = { userId: req.user.id, ...(done !== undefined && { done }) };
  const [items, total] = await prisma.$transaction([
    prisma.task.findMany({ where, orderBy: [{ [sort]: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
    prisma.task.count({ where }),
  ]);
  res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
});`,
          try: R`اعمل ١٠٠٠ مهمة بسكربت seed، وجرّب [[?page=3&limit=10]] و [[?limit=5000]] و [[?sort=password]]. التانيين لازم 400: زوّد في الـ error handler إن [[ZodError]] يتحول لـ 400. وبعدين جرّب [[?page=90]] وقيس الوقت، وفكّر ليه بيبطأ مع الصفحات البعيدة.`,
          flag: "script",
          deep: {
            why: "القايمة بتكبر مع الوقت. endpoint بيرجّع كله بيبقى سريع أول شهر، وبعد سنة بيرجّع ٥٠ ميجا وياخد ١٠ ثواني ويوقّع الموبايل. والـ limit من غير حد أقصى بيخلي أي حد يطلب مليون صف في طلب واحد.",
            how: R`offset pagination ([[skip]] و [[take]]، يعني [[OFFSET]] و [[LIMIT]] في SQL) أبسط حاجة وبتدّيك أرقام صفحات. عيبين: الداتابيز لازم تعدّي على كل الصفوف اللي قبل الـ offset، فالصفحة ٥٠٠٠ بطيئة. ولو حاجة اتضافت وانت بتقلّب، بتشوف عنصر مرتين أو يفوتك.

cursor pagination: بدل «اقفز ٤٠»، «هات ٢٠ بعد العنصر ده». في Prisma: [[cursor: { id: lastId }, skip: 1, take: 20]]، أو شرط [[id: { lt: lastId }]]. سريع مهما بعدت لأنه بيستخدم الـ index، وثابت مع الإضافات. بس مفيش «روح لصفحة ٧». ده اللي بيستخدم في infinite scroll والـ feeds.

[[count]] على جدول كبير ممكن يبقى بطيء هو كمان. في الـ cursor pagination غالبًا مش محتاجه: بترجّع [[nextCursor]] بس، ولو null يبقى خلصت.

والترتيب لازم يبقى ثابت: لو اتنين ليهم نفس [[createdAt]]، رتّب بـ id كمان (زي المثال)، وإلا نفس العنصر ممكن يظهر في صفحتين. واعمل index على الأعمدة اللي بتفلتر وترتّب بيها. وتصميم الـ pagination في الـ API بالتفصيل في تاب «APIs متقدمة».`,
            when: "أي قايمة ممكن تعدّي ١٠٠ عنصر. offset للوحات الأدمن والجداول بأرقام صفحات، و cursor للـ feeds والموبايل والجداول الكبيرة.",
            mistakes: R`في مشروع حقيقي الـ schema المشتركة للـ pagination كانت بتسمح بـ [[pageSize]] لحد ١٠٠٠، يعني صفحة واحدة ممكن تبقى تقيلة جدًا. خلي الحد الأقصى صغير. وتعدّي [[req.query.sort]] مباشرة لـ [[orderBy]]. و [[skip: page * limit]] بدل [[(page - 1) * limit]] فالصفحة الأولى تضيع.`
          },
          teach: R`## جزئين: schema بتنضّف الـ query، و route بيجيب صفحة واحدة

[[ListQuery]] بتاخد [[req.query]] (كله نصوص) وتطلّع أرقام وقيم مسموحة بس، أو ترمي خطأ. والـ route بيستخدم الأرقام دي يجيب ١٠ أو ٢٠ صف بدل كله، ومعاهم العدد الكلي عشان الواجهة ترسم أزرار الصفحات.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و zod 4.6 و Prisma 7.10 على Postgres 16 في Docker، سيرفر على بورت 5847 عليه [[requireAuth]] والـ errorHandler بتاع الـ solCode. حطيت ١٠٠٠ مهمة ليوزر واحد بـ SQL: [[task 1]] الأحدث و [[task 1000]] الأقدم، وكل تالت واحدة [[done]].

---

## ١. [[ListQuery]] سطر سطر

كل اللي في الـ query string بيوصل نص: [[?page=3]] يبقى [[req.query.page === "3"]]. عشان كده:

| السطر | بيعمل إيه |
|---|---|
| [[z.coerce.number()]] | حوّل النص لرقم ([[Number("3")]])، ولو مش رقم يبقى خطأ |
| [[.int().min(1)]] | رقم صحيح، ١ أو أكتر |
| [[.max(100)]] | حجم الصفحة ميعدّيش ١٠٠ مهما اليوزر طلب |
| [[.default(1)]] / [[.default(20)]] | لو مش مبعوت خالص خد القيمة دي |
| [[z.enum(["createdAt", "title"])]] | القيمة لازم تبقى واحدة من دول بالظبط |
| [[z.stringbool().optional()]] | حوّل [["true"]] و [["false"]] (وأخواتهم) لـ boolean حقيقي، و [[optional]] يعني ممكن ميتبعتش |

ليه [[stringbool]] مش [[z.coerce.boolean()]]؟ لأن [[Boolean("false")]] بـ [[true]] (أي نص مش فاضي truthy). جرّبت:

~~~text الناتج
?done=false&limit=1  =>  total 667   (المهام اللي مش خلصانة)
?done=yes&limit=1    =>  total 333   ("yes" اتفهمت true)
?done=maybe          =>  400  "Invalid option: expected one of "true"|"1"|"yes"|"on"|"y"|"enabled"|"false"|"0"|"no"|"off"|"n"|"disabled""
~~~

---

## ٢. [[const { page, limit, sort, done } = ListQuery.parse(req.query)]]

[[parse]] يا يرجّع object نضيف بالأنواع الصح، يا يرمي [[ZodError]]. والـ [[{ }]] بتاخد الأربع قيم في متغيرات.

## ٣. [[const where = { userId: req.user.id, ...(done !== undefined && { done }) }]]

الحتة الغريبة [[...(cond && { done })]]:

- لو [[done]] اتبعت: [[cond && { done }]] بترجّع [[{ done: false }]] مثلًا، و [[...]] بيفردها جوه [[where]].
- لو مش مبعوت: بترجّع [[false]]، و [[...false]] جوه object مبيعملش حاجة.

فالنتيجة [[{ userId: 1 }]] أو [[{ userId: 1, done: false }]]. وشرط الملكية موجود دايمًا.

---

## ٤. [[prisma.$transaction([ findMany, count ])]]

الشكل الـ array من [[$transaction]] (درس [[$transaction]] فيه الشكل التاني): queries مستقلة بتتنفذ مع بعض، والنتيجة array بنفس الترتيب، فـ [[const [items, total] =]] بياخدهم.

### [[findMany({ where, orderBy, skip, take })]]

| الحتة | معناها |
|---|---|
| [[[{ [sort]: "desc" }, { id: "desc" }]]] | رتّب بالحقل المختار، ولو اتنين متساويين رتّب بالـ id. [[[sort]]] في الأقواس المربعة معناها «اسم المفتاح هو قيمة المتغير» |
| [[skip: (page - 1) * limit]] | فوّت الصفحات اللي فاتت. صفحة ٣ و limit ١٠ = فوّت ٢٠ |
| [[take: limit]] | خد ١٠ |

~~~text الـ SQL
SELECT ... FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC, "public"."Task"."id" DESC LIMIT $2 OFFSET $3
SELECT COUNT(*) AS "_count$_all" FROM (SELECT "public"."Task"."id" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 OFFSET $2) AS "sub"
~~~

[[take]] بقى [[LIMIT]] و [[skip]] بقى [[OFFSET]].

## ٥. [[res.json({ items, page, limit, total, pages: Math.ceil(total / limit) })]]

[[Math.ceil]] بيقرّب لفوق: ١٠٠٠ ÷ ٣ = ٣٣٣.٣ فـ [[334]] صفحة (الأخيرة فيها مهمة واحدة).

~~~text الناتج: ?page=3&limit=10 (العناوين بس)
{"first":"task 21","last":"task 30","page":3,"limit":10,"total":1000,"pages":100}
~~~

الصفحة التالتة = العناصر من ٢١ لـ ٣٠ بالظبط.

---

## ٦. القيم الممنوعة والـ solCode

من غير فرع [[ZodError]] في الـ errorHandler، [[parse]] بيرمي خطأ مالوش [[status]] فيبقى 500. الـ solCode بيضيف في أوله:

~~~javascript
if (err instanceof ZodError) {
  return res.status(400).json({ error: "Invalid input", issues: z.flattenError(err).fieldErrors });
}
~~~

- [[instanceof ZodError]]: الخطأ جاي من zod؟
- [[z.flattenError(err).fieldErrors]]: بيحوّل قايمة الأخطاء لـ object، كل حقل قدامه رسايله.

~~~text الناتج
?limit=5000      HTTP/1.1 400 Bad Request
                 {"error":"Invalid input","issues":{"limit":["Too big: expected number to be <=100"]}}
?sort=password   HTTP/1.1 400 Bad Request
                 {"error":"Invalid input","issues":{"sort":["Invalid option: expected one of \"createdAt\"|\"title\""]}}
~~~

---

## ٧. [[sort=title]]: ترتيب نصوص

~~~text الناتج: ?sort=title&limit=3
task 999, task 998, task 997
~~~

مش [[task 1000]] الأول، لأن الترتيب هنا حرف بحرف مش بالرقم: [["task 9..."]] أكبر من [["task 1..."]].

---

## ٨. من ويندوز

~~~powershell
Invoke-RestMethod "http://localhost:5847/api/tasks?page=3&limit=10" -Headers @{ Authorization = "Bearer $T" }
~~~

العنوان **لازم** بين علامتين تنصيص: [[&]] في PowerShell ليها معنى (في 5.1 «ممنوع هنا»، وفي 7 «شغّل في الخلفية»). في 7 و 5.1 رجّع [[page 3]] و [[limit 10]] و [[total 1000]] و [[pages 100]].

---

## الخلاصة

| | |
|---|---|
| [[z.coerce.number()]] | الـ query نص، حوّله رقم |
| [[.max(100)]] | الحد الأقصى من عندك |
| [[z.enum]] للترتيب | مش أي عمود اليوزر يكتبه |
| [[skip: (page - 1) * limit]] و [[take: limit]] | [[OFFSET]] و [[LIMIT]] |
| [[{ id: "desc" }]] بعد الترتيب | ترتيب ثابت لو فيه تساوي |
| [[ZodError]] في الـ errorHandler | 400 بدل 500 |

> الصفحة ٩٠ بتطلب [[OFFSET 890]]: الداتابيز بتقرا ٨٩٠ صف وترميهم. للقوايم الطويلة جدًا استخدم cursor ([[where: { id: { lt: lastId } }]]).`,
          lines: [
            "schema للـ query.",
            "رقم الصفحة من ١، والافتراضي ١.",
            "حجم الصفحة من ١ لـ ١٠٠ مهما طلب، والافتراضي ٢٠.",
            "الترتيب من قايمة مسموحة بس.",
            R`فلتر اختياري، و [[stringbool]] بيحوّل [["false"]] لـ false فعلًا.`,
            "قفلة.",
            "قايمة المهام.",
            "اتحقق من الـ query، ولو غلط بيرمي ZodError.",
            "الشرط: مهامي، ولو فيه فلتر done زوّده.",
            "الصفحة والعدد الكلي في transaction واحدة (الشكل الـ array).",
            "رتّب بالحقل المختار وبعده الـ id عشان الترتيب يبقى ثابت، واقفز على الصفحات اللي فاتت، وخد limit.",
            "العدد الكلي بنفس الشرط.",
            "قفلة.",
            "البيانات ومعلومات الصفحات عشان الواجهة تعمل الأزرار.",
            "قفلة."
          ],
          sol: R`[[?page=3&limit=10]] بيرجّع ١٠ مهام (من الـ 21 للـ 30 في الترتيب) ومعاهم [[{"page":3,"limit":10,"total":1000,"pages":100}]].

[[?limit=5000]] و [[?sort=password]] من غير تعديل بيرجّعوا 500، لأن [[ListQuery.parse]] بيرمي [[ZodError]] مالوش status. بعد التعديل في الـ error handler: [[400]] مع [[{"limit":["Too big: expected number to be <=100"]}]] و [[{"sort":["Invalid option: expected one of "createdAt"|"title""]}]]. و [[sort=password]] مهم: من غير enum حد يقدر يرتّب على أي عمود ويستنتج بيانات منه.

و [[?page=90]]: مع ١٠٠٠ صف الفرق صغير، بس الـ SQL فيه [[OFFSET 890]]، والقاعدة لازم تقرا الـ 890 صف وترميهم قبل ما ترجّع الـ 10. كل ما الصفحة تبعد كل ما الشغل يزيد، ومع ملايين الصفوف بيبان جدًا. الحل للقوايم الطويلة cursor pagination ([[where: { id: { lt: lastId } }]] مع index).`,
          solCode: R`import { z, ZodError } from "zod";

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Invalid input", issues: z.flattenError(err).fieldErrors });
  }
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`
        }
      ]
    }
]);
