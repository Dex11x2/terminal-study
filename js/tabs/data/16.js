// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "Mongoose و Drizzle و seed",
      l: 3,
      n: "populate و N+1 في Mongoose، وبديل Prisma الأقرب لـ SQL، وإزاي تملا القاعدة بداتا شبه الحقيقية",
      items: [
        {
          cmd: "populate",
          title: "Mongoose: populate بدل JOIN، و N+1 بشكل تاني",
          desc: R`MongoDB مفيهاش JOIN زي SQL. في Mongoose بتخزن الـ ObjectId بتاع المستند المرتبط ([[user: { type: ObjectId, ref: "User" }]])، و [[populate("user")]] بيجيبه.

الـ populate مش JOIN في القاعدة: هو استعلام تاني. Mongoose بيجيب الأوردرات، ويجمع الـ user ids كلها، ويعمل [[User.find({ _id: { $in: ids } })]] واحد، ويحط كل يوزر مكانه. يعني ٢ استعلام، زي include في Prisma.

والـ N+1 بيرجع لو عملت populate أو findById جوه loop. وأساسيات Mongoose (الاتصال، والـ schema، و lean) في درس mongoose في تاب «Backend بـ Node»، وأوامر الشيل والباك أب في تاب «MongoDB».`,
          example: R`const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  items: [{ name: String, qty: Number, unitPrice: Number }],
  status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);

mongoose.set("debug", true);

const orders = await Order.find({ status: "paid" })
  .sort({ createdAt: -1 })
  .limit(20)
  .populate("user", "email name")
  .lean();

for (const o of await Order.find().limit(20)) {
  const user = await User.findById(o.user);
}

const stats = await Order.aggregate([
  { $match: { status: "paid" } },
  { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $group: { _id: "$user.email", orders: { $sum: 1 } } },
]);`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل ١٠ يوزرز و ١٠٠ أوردر، و [[mongoose.set("debug", true)]] شغال. شغّل الـ find بالـ populate وعدّ الأوامر اللي اتطبعت، وبعدين الـ loop اللي فيه findById. وجرّب populate على حقل مش عليه [[ref]].`,
          sol: R`الـ find بالـ populate هيطبع أمرين: [[orders.find({ status: 'paid' }, ...)]] و [[users.find({ _id: { '$in': [ ... ] } }, { projection: { email: 1, name: 1 } })]]. مهما كان عدد الأوردرات، ٢ بس. والـ user في النتيجة بقى object فيه email و name (والـ _id).

الـ loop هيطبع أمر واحد للأوردرات وبعده ٢٠ مرة [[users.findOne({ _id: ... })]]، يعني ٢١. ده N+1 بالظبط زي درس N+1 في Prisma.

والـ populate على حقل من غير ref: مفيش error خالص، الحقل بيفضل ObjectId زي ما هو، وده اللي بيلخبط. لازم الـ schema يقول الحقل بيشاور على أنهي model، أو تكتب [[populate({ path: "user", model: "User" })]]. ولو كتبت اسم model مش متسجّل، ساعتها بس هتاخد [[MissingSchemaError: Schema hasn't been registered for model "..."]].

(اتجرّب على [[mongo:8]] و Mongoose 9. شكل سطور الـ debug ممكن يختلف شوية بين النسخ، المهم عدد الأوامر.)`,
          solCode: R`mongoose.set("debug", true);

console.log("--- populate");
await Order.find({ status: "paid" }).limit(20).populate("user", "email name").lean();

console.log("--- loop (N+1)");
for (const o of await Order.find().limit(20)) {
  await User.findById(o.user);
}`,
          flag: "script",
          deep: {
            why: "مشاريع Node كتير (خصوصًا القديمة ولوحات الإدارة) على Mongo و Mongoose، ونفس أسئلة الأداء بتتسأل: «ليه الصفحة دي بطيئة؟». لو فاهم إن populate استعلام تاني مش JOIN، هتعرف تصمم الداتا صح وتلاقي الـ N+1.",
            how: R`[[populate]] بيجمع كل قيم الحقل من النتيجة، ويعمل find واحد بـ [[$in]]، ويبدّل الـ ids بالمستندات. التاني argument ([["email name"]]) projection: الحقول اللي عايزها بس، زي select في Prisma. و [[populate({ path: "items.product" })]] للحقول جوه arrays، والـ populate المتداخل بيزوّد استعلام لكل مستوى.

[[lean()]] بيرجّع objects عادية من غير دوال Mongoose، أسرع وأخف لو هتقرا بس.

[[$lookup]] في aggregation هو اللي أقرب لـ JOIN: بيتعمل جوه القاعدة في رحلة واحدة. مفيد للتقارير اللي فيها group و sum على داتا مرتبطة.

في Mongo التصميم بيبدأ من سؤال: الداتا دي بتتقري مع بعض؟ البنود جوه الأوردر (embedded) لأنها دايمًا بتتقري معاه ومبتتعدّلش لوحدها. واليوزر reference لأنه مستقل وليه أوردرات كتير. ومن غير كده بتلاقي نفسك بتعمل populate في كل حتة، وده علامة إن الداتا relational وكان Postgres أنسب.

و index على الحقل اللي بتدوّر بيه ([[index: true]] على user) زي index على FK في SQL.`,
            when: "populate لما محتاج بيانات مستند مرتبط في الرد (اسم اليوزر مع الأوردر). $lookup للتقارير. والـ embedding لداتا بتتقري دايمًا مع الأب ومش بتكبر من غير حد.",
            mistakes: R`findById أو populate جوه loop. populate من غير projection فتجيب اليوزر كامل ومعاه الـ hash. populate متداخل ٣ مستويات على كل request. embedding لحاجة بتكبر من غير حد (كل تعليقات البوست جوه البوست، والمستند ليه حد أقصى ١٦ ميجا). وتنسى index على حقل الـ ref.`
          },
          teach: R`## الفكرة: populate = استعلام تاني، مش JOIN

المثال بيعرّف أوردر بيشاور على يوزر، وبعدين بيجيب الأوردرات بـ ٣ طرق: [[populate]] (استعلامين)، و loop فيه [[findById]] (N+1)، و [[$lookup]] في aggregation (JOIN جوه القاعدة). وأهم أداة في الدرس [[mongoose.set("debug", true)]]: بتطبع كل أمر بيروح لـ MongoDB، فتعدّ بعينك.

**إزاي جرّبناه:** [[mongo:8]] في Docker، و Mongoose 9.11 في Node بـ [[tsx]]، و ١٠ يوزرز و ١٠٠ أوردر (تلتهم pending والباقي paid). الـ ObjectIds في الناتج من التشغيل ده، وعندك هتطلع غيرها.

---

## ١. الـ schema

~~~js
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  items: [{ name: String, qty: Number, unitPrice: Number }],
  status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
}, { timestamps: true });
~~~

### [[user]]: الـ reference

| الحتة | معناها |
|---|---|
| [[type: mongoose.Schema.Types.ObjectId]] | الحقل فيه **id** يوزر بس، مش اليوزر نفسه. ObjectId نوع الـ id في Mongo (١٢ byte، بيتكتب ٢٤ حرف hex) |
| [[ref: "User"]] | الـ id ده بتاع model اسمه User. ده اللي بيخلّي [[populate]] يعرف يدوّر فين |
| [[required: true]] | مينفعش أوردر من غير يوزر (Mongoose بيتحقق قبل الحفظ) |
| [[index: true]] | اعمل index على الحقل ده في Mongo |

والـ index اتعمل فعلًا. [[Order.collection.indexes()]] طلّع:

~~~text الناتج
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { user: 1 }, name: 'user_1' }
]
~~~

[[user_1]] يعني index على [[user]] تصاعدي ([[1]]).

### [[items]]: embedded

[[[{ name: String, qty: Number, unitPrice: Number }]]] الأقواس المربعة يعني array، وكل عنصر فيه ٣ حقول. البنود محفوظة **جوه** مستند الأوردر نفسه، مش في collection لوحدها، لأنها دايمًا بتتقري معاه.

### [[status]] و [[timestamps]]

[[enum]] القيم المسموحة بس، و [[default]] القيمة لو مبعتهاش. و [[{ timestamps: true }]] (التاني argument للـ Schema) بيضيف [[createdAt]] و [[updatedAt]] ويحدّثهم لوحده.

~~~js
const Order = mongoose.model("Order", orderSchema);
~~~

[[mongoose.model]] بيسجّل الـ model باسم [["Order"]]، والـ collection في Mongo اسمها بيبقى الاسم صغير وجمع: [[orders]] (وكذلك [["User"]] ← [[users]]).

---

## ٢. اطبع كل أمر: [[mongoose.set("debug", true)]]

من بعد السطر ده، كل أمر Mongoose بيبعته بيتطبع في الترمنال بالشكل ده: [[Mongoose: <collection>.<أمر>(<فلتر>, <options>)]]. ده اللي هنعدّ بيه تحت.

---

## ٣. populate: استعلامين وبس

~~~js
const orders = await Order.find({ status: "paid" })
  .sort({ createdAt: -1 })
  .limit(20)
  .populate("user", "email name")
  .lean();
~~~

| الحتة | معناها |
|---|---|
| [[find({ status: "paid" })]] | الأوردرات اللي status بتاعها paid |
| [[.sort({ createdAt: -1 })]] | رتّب بالتاريخ، و [[-1]] تنازلي (الأحدث الأول) |
| [[.limit(20)]] | ٢٠ بس |
| [[.populate("user", "email name")]] | بدّل الـ id في [[user]] باليوزر نفسه، وهات منه [[email]] و [[name]] بس |
| [[.lean()]] | رجّع objects عادية مش documents ليها دوال Mongoose (أخف وأسرع لو هتقرا بس) |

اللي اتطبع:

~~~text الناتج
Mongoose: orders.find({ status: 'paid' }, { sort: { createdAt: -1 }, limit: 20 })
Mongoose: users.find({ _id: { '$in': [ ObjectId("6ac6...c6a0"), ObjectId("6ac6...c6a6"), ... ١٠ ids ] }}, { projection: { email: 1, name: 1 } })
~~~

(قصّرنا الـ ids.) أمرين بالظبط:

1. الأوردرات.
2. Mongoose جمع كل قيم [[user]] من الـ ٢٠ أوردر، وشال المكرر (طلعوا ١٠ يوزرز مختلفين)، وعمل **find واحد** بـ [[$in]] (يعني «الـ _id واحد من دول»). و [[projection: { email: 1, name: 1 }]] هي [["email name"]] اللي كتبناها: [[1]] يعني «هات الحقل ده».

وبعدين حط كل يوزر مكان الـ id بتاعه في الذاكرة. أول أوردر بقى كده:

~~~text الناتج
{
 "_id": "6ac60a26ab47fd35c370c737",
 "user": {
  "_id": "6ac60a26ab47fd35c370c6a0",
  "email": "u1@example.com",
  "name": "User 1"
 },
 "items": [ { "name": "Hoodie", "qty": 1, "unitPrice": 450, "_id": "6ac6...c738" } ],
 "status": "paid",
 "__v": 0,
 "createdAt": "2026-10-07T09:00:22.774Z",
 "updatedAt": "2026-10-07T09:00:22.774Z"
}
~~~

لاحظ:
- [[user]] بقى object، ومفيهوش [[passwordHash]] لأن الـ projection منعه. و [[_id]] بييجي دايمًا إلا لو قلت [["-_id"]].
- كل بند جوه [[items]] ليه [[_id]] خاص بيه: Mongoose بيعمل كده لأي object جوه array.
- [[__v]] رقم نسخة Mongoose بيستخدمه مع الـ arrays.

ولو ٢٠ أوردر أو ٢٠٠٠، برضه **أمرين**.

---

## ٤. الـ loop: N+1

~~~js
for (const o of await Order.find().limit(20)) {
  const user = await User.findById(o.user);
}
~~~

[[for (const o of ...)]] بيلف على كل أوردر. وجوه كل لفة [[findById]] بيروح للقاعدة **ويستنى** ([[await]]) قبل اللفة اللي بعدها:

~~~text الناتج
Mongoose: orders.find({}, { limit: 20 })
Mongoose: users.findOne({ _id: ObjectId("6ac6...c69f") }, {})
Mongoose: users.findOne({ _id: ObjectId("6ac6...c6a0") }, {})
... (٢٠ سطر findOne)
Mongoose: users.findOne({ _id: ObjectId("6ac6...c69f") }, {})
~~~

أمر للأوردرات + ٢٠ أمر لليوزرز = **٢١**. ده N+1: N هنا ٢٠. ولاحظ إن نفس اليوزر اتجاب أكتر من مرة (أول وآخر سطر نفس الـ id)، لأن كل لفة مش عارفة حاجة عن اللي قبلها. و [[findById(id)]] اتحوّل لـ [[findOne({ _id: id })]]، يعني هو اختصار ليها.

---

## ٥. [[$lookup]]: JOIN جوه القاعدة

~~~js
const stats = await Order.aggregate([
  { $match: { status: "paid" } },
  { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $group: { _id: "$user.email", orders: { $sum: 1 } } },
]);
~~~

الـ aggregation pipeline: array من مراحل (stages)، والمستندات بتعدّي عليهم بالترتيب، وكل مرحلة بتدّي ناتجها للي بعدها.

| المرحلة | بتعمل إيه | زي إيه في SQL |
|---|---|---|
| [[$match]] | سيب المدفوع بس | [[WHERE]] |
| [[$lookup]] | لكل أوردر هات من [[users]] اللي [[_id]] بتاعه = [[user]] بتاع الأوردر، وحطهم في array اسمه [[user]] | [[JOIN]] |
| [[$unwind: "$user"]] | الـ array اللي فيه يوزر واحد يبقى object | |
| [[$group]] | جمّع بالإيميل، و [[$sum: 1]] زوّد واحد لكل أوردر | [[GROUP BY]] و [[count(*)]] |

و [["$user.email"]] بـ [[$]] في الأول معناها «قيمة الحقل ده»، مش النص نفسه.

اللي اتطبع: **أمر واحد** بس:

~~~text الناتج
Mongoose: orders.aggregate([ { '$match': { status: 'paid' } }, { '$lookup': { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } }, { '$unwind': '$user' }, { '$group': { _id: '$user.email', orders: { '$sum': 1 } } }], {})
[
  { _id: 'u3@example.com', orders: 6 },
  { _id: 'u0@example.com', orders: 6 },
  { _id: 'u2@example.com', orders: 7 }
] 10
~~~

(أول ٣ من ١٠ صفوف، يوزر لكل صف.) والترتيب عشوائي لأن [[$group]] مبيرتّبش، لو عايز ترتيب زوّد [[{ $sort: { orders: -1 } }]].

---

## ٦. populate على حقل من غير [[ref]]

جرّبنا model فيه [[user: mongoose.Schema.Types.ObjectId]] من غير [[ref]] وعملنا [[populate("user")]]:

~~~text الناتج
noref: { _id: new ObjectId('6ac6...c79d'), user: new ObjectId('6ac6...c69f'), __v: 0 }
~~~

**مفيش error**، والحقل فضل ObjectId. ولما قلنا له الـ model صراحة [[populate({ path: "user", model: "User", select: "email" })]] اشتغل. و error بييجي بس لو اسم الـ model نفسه مش متسجّل:

~~~text الناتج
MissingSchemaError Schema hasn't been registered for model "Nope".
~~~

---

## الخلاصة

| الطريقة | عدد الأوامر للـ ٢٠ أوردر | فين الربط |
|---|---|---|
| [[populate]] | ٢ | في Node (بعد [[$in]] واحد) |
| [[findById]] في loop | ٢١ | في Node، أمر لكل أوردر |
| [[$lookup]] | ١ | جوه MongoDB |

- [[ref]] على الحقل عشان populate يشتغل، و [[index: true]] عليه.
- التاني argument في populate projection: متجيبش اليوزر كامل.
- [[mongoose.set("debug", true)]] أسرع طريقة تكشف N+1.`,
          lines: [
            "schema الأوردر:",
            "reference ليوزر (ObjectId و ref)، وعليه index.",
            "البنود embedded جوه الأوردر.",
            "الحالة بقيم محددة.",
            "و createdAt و updatedAt لوحدهم.",
            "الـ model.",
            "اطبع كل أمر Mongoose بيبعته.",
            "الأوردرات المدفوعة:",
            "الأحدث الأول،",
            "٢٠،",
            "وهات اليوزر بتاع كل واحد (email و name بس) باستعلام تاني واحد بـ $in،",
            "كـ objects عادية.",
            "غلط: لكل أوردر،",
            "استعلام لليوزر بتاعه (N+1).",
            "قفلة.",
            "تقرير بـ aggregation:",
            "المدفوع،",
            "JOIN جوه القاعدة على users،",
            "فكّ الـ array لـ object،",
            "وعدد الأوردرات لكل إيميل.",
            "قفلة."
          ]
        },
        {
          cmd: "Drizzle",
          title: "schema بـ TypeScript و drizzle-kit، و Prisma ولا Drizzle",
          desc: R`Drizzle ORM بديل لـ Prisma، وأقرب لـ SQL: الـ schema ملف TypeScript عادي ([[pgTable]])، والاستعلامات شبه SQL بالظبط ([[db.select().from(users).where(eq(users.email, x))]])، ومفيش generate: الـ types بتطلع من الـ schema على طول.

[[drizzle-kit generate]] بيقارن الـ schema بآخر migration ويكتب ملف SQL جديد، و [[drizzle-kit migrate]] بيطبّقه. زي migrate dev و deploy في Prisma بس خطوتين منفصلين.

Prisma ولا Drizzle؟ Prisma: API عالي المستوى (include و nested writes)، وأسهل للمبتدئ، وليه أدوات (Studio و migrate). Drizzle: لو بتفكر بـ SQL وعايز تتحكم في الاستعلام بالظبط، وأخف (مفيش خطوة generate)، ومناسب للـ serverless والـ edge. معرفة Prisma و SQL بتنقل لـ Drizzle بسرعة.`,
          example: R`// src/schema.ts
import { pgTable, uuid, text, bigint, numeric, timestamp, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  name: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  status: text().notNull().default("pending"),
  total: numeric({ precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("orders_user_created_idx").on(t.userId, t.createdAt.desc())]);

// src/report.ts
const db = drizzle(process.env.DATABASE_URL!);
const top = await db
  .select({ email: users.email, spent: sql<string>$__btsum($__{orders.total})$__bt })
  .from(users)
  .innerJoin(orders, eq(orders.userId, users.id))
  .where(and(eq(orders.status, "paid"), gte(orders.createdAt, sql$__btnow() - interval '90 days'$__bt)))
  .groupBy(users.id)
  .orderBy(desc(sql$__btsum($__{orders.total})$__bt))
  .limit(3);`,
          try: R`اعمل مشروع فيه [[drizzle-orm]] و [[pg]] و [[drizzle-kit]]، وملف [[drizzle.config.ts]] فيه [[dialect: "postgresql"]] ومكان الـ schema و [[out: "./drizzle"]] ورابط القاعدة. شغّل [[npx drizzle-kit generate --name init]] واقرا الـ SQL، وبعدين [[npx drizzle-kit migrate]]. واطبع [[db.select().from(users).where(eq(users.email, "x")).toSQL()]].`,
          sol: R`[[generate]] هيكتب [[drizzle/0000_init.sql]] وفيه [[CREATE TABLE "orders"]] بـ [[GENERATED ALWAYS AS IDENTITY]]، و [[CREATE TABLE "users"]] بـ [[DEFAULT gen_random_uuid()]] و [[CONSTRAINT "users_email_unique" UNIQUE("email")]]، والـ FK بـ [[ON DELETE restrict]]، و [[CREATE INDEX "orders_user_created_idx" ON "orders" USING btree ("user_id","created_at" DESC NULLS LAST)]]. وبين الأوامر [[--> statement-breakpoint]]، ده فاصل Drizzle بيستخدمه وهو بيطبّق. و [[migrate]] هيطبع [[migrations applied successfully!]].

و [[toSQL()]] هيطبع [[{ sql: 'select "id", "email", "name", "created_at" from "users" where "users"."email" = $1', params: [ 'x' ] }]]. شايف: نفس الـ SQL اللي كنت هتكتبه، والقيمة parameter.

ولاحظ إن [[numeric]] بيرجع string في Drizzle (زي pg)، مش Decimal زي Prisma. فالفلوس بتفضل string لحد ما تقرر تعمل بيها إيه.

لو generate قال مفيش تغييرات، اتأكد إن مسار [[schema]] في الـ config صح. ولو migrate فشل في الاتصال، الـ config مش بيقرا .env لوحده، فمحتاج [[import "dotenv/config"]] زي Prisma.`,
          solCode: R`// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL! },
});

// في الترمنال:
// npx drizzle-kit generate --name init
// npx drizzle-kit migrate

// src/check.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { users } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);
console.log(db.select().from(users).where(eq(users.email, "x")).toSQL());`,
          flag: "script",
          deep: {
            why: "Drizzle انتشر جدًا في مشاريع Next.js والـ serverless، وهتقابله في مشاريع وفي انترفيوهات. ومقارنته بـ Prisma بتوضحلك الـ trade-offs في أي ORM: API مريح ولا تحكم في الـ SQL، وأدوات جاهزة ولا خفة.",
            how: R`الـ schema هو TypeScript حقيقي، فالـ types بتطلع منه على طول: [[typeof users.$inferSelect]] نوع الصف. مفيش كود متولّد ولا خطوة generate للـ client.

الـ query builder بيتبني SQL واحد: الـ select والـ join والـ where بالظبط زي ما كتبتهم، وده بيخلي الأداء متوقع. و [[sql$__bt...$__bt]] template للأجزاء اللي مش موجودة في الـ API، وبرضه بيبعت القيم parameters (زي $queryRaw).

وفيه كمان relational queries API ([[db.query.users.findMany({ with: { orders: true } })]]) شبه include في Prisma، بس محتاج تعرّف الـ relations. والـ API ده بيتغير في Drizzle 1.0 (كان beta وقت كتابة الدرس)، فارجع للـ docs بتاعة النسخة اللي عندك.

[[drizzle-kit generate]] بيحفظ snapshot للـ schema جنب كل migration، وبيقارن بيه. لو فيه rename بيسألك (rename ولا drop و create). [[drizzle-kit push]] بيطبّق الـ schema على القاعدة مباشرة من غير ملفات migrations، مفيد للتجربة بس مش للإنتاج. و [[drizzle-kit studio]] واجهة زي Prisma Studio.

الـ numeric بيرجع string، و [[bigint({ mode: "number" })]] بيرجّعه number (خد بالك من الأرقام الأكبر من 2^53)، و [[mode: "bigint"]] بيرجّعه BigInt.`,
            when: "Drizzle: فريق مرتاح مع SQL، وتطبيقات serverless أو edge، ولما عايز الاستعلام متوقع ومفيش خطوة build. Prisma: فريق فيه ناس جديدة على SQL، و CRUD كتير بعلاقات متداخلة، ولما Studio و nested writes هيوفروا وقت. والاتنين فيهم مخرج لـ SQL خام.",
            mistakes: R`[[drizzle-kit push]] على الإنتاج. تعدّل ملف migration اتطبق. تنسى [[import "dotenv/config"]] في الـ config. [[mode: "number"]] على IDs ممكن تعدّي 2^53. وتفتكر إن Drizzle بيمنع N+1 لوحده؛ الـ loop بـ await هو هو في أي ORM.`
          },
          teach: R`## الفكرة: الجداول ملف TypeScript، والاستعلام شبه SQL بالحرف

في Drizzle مفيش لغة schema خاصة زي [[schema.prisma]]. انت بتكتب الجداول كود TypeScript عادي، و [[drizzle-kit]] بيقرا الكود ده ويكتب منه migration بـ SQL، والـ query builder بيكتب SQL شبه اللي كنت هتكتبه بإيدك. فالمثال جزئين: ملف الـ schema، واستعلام تقرير.

**إزاي جرّبناه:** [[drizzle-orm]] 0.45 و [[drizzle-kit]] 0.31 و [[pg]] في Node بـ [[tsx]]، على [[postgres:18]] في Docker، بالـ schema اللي في المثال بالظبط وملف الـ config اللي في الـ solCode.

---

## ١. الـ import

~~~ts
import { pgTable, uuid, text, bigint, numeric, timestamp, index } from "drizzle-orm/pg-core";
~~~

[[drizzle-orm/pg-core]] الجزء الخاص بـ Postgres (فيه [[mysql-core]] و [[sqlite-core]] للتانيين). وكل اسم هنا دالة بتعرّف حاجة: [[pgTable]] جدول، و [[uuid]] و [[text]] و [[bigint]] و [[numeric]] و [[timestamp]] أنواع أعمدة بنفس أسامي Postgres، و [[index]] index.

---

## ٢. جدول users

~~~ts
export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  name: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
~~~

- [[export const users]]: متغير عادي بنصدّره عشان نستخدمه في الاستعلامات وعشان drizzle-kit يلاقيه.
- [[pgTable("users", { ... })]]: التاني argument object، كل مفتاح فيه عمود.
- كل عمود بيبدأ بنوعه وبعده سلسلة دوال (method chaining)، كل واحدة بتضيف صفة.

| في الكود | في SQL اللي اتولّد |
|---|---|
| [[uuid().primaryKey()]] | [["id" uuid PRIMARY KEY]] |
| [[.defaultRandom()]] | [[DEFAULT gen_random_uuid()]]: القاعدة بتولّد الـ uuid |
| [[text().notNull()]] | [[text NOT NULL]] |
| [[.unique()]] | [[CONSTRAINT "users_email_unique" UNIQUE("email")]] |
| [[timestamp("created_at", { withTimezone: true })]] | [["created_at" timestamp with time zone]] (يعني timestamptz) |
| [[.defaultNow()]] | [[DEFAULT now()]] |

### ليه [[createdAt]] ومعاه [["created_at"]]؟

لو الدالة من غير اسم ([[text()]])، اسم العمود في القاعدة بيبقى اسم المفتاح زي ما هو ([[email]]). لكن في JavaScript بنحب [[camelCase]] (createdAt) وفي SQL بنحب [[snake_case]] (created_at)، فبنكتب اسم العمود في القاعدة كأول argument. في الكود هتستخدم [[users.createdAt]]، والـ SQL هيكتب [["created_at"]].

---

## ٣. جدول orders

~~~ts
export const orders = pgTable("orders", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  status: text().notNull().default("pending"),
  total: numeric({ precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("orders_user_created_idx").on(t.userId, t.createdAt.desc())]);
~~~

### [[bigint({ mode: "number" })]]

[[bigint]] في Postgres بيوصل لـ 9,223,372,036,854,775,807، و number في JavaScript مظبوط لحد 2^53 بس (حوالي 9 مليون مليار). [[mode]] بيقول لـ Drizzle يرجّعه إزاي: [["number"]] رقم عادي (مريح، ومناسب لـ id عمره ما هيوصل للحد ده)، أو [["bigint"]] نوع BigInt. و [[generatedAlwaysAsIdentity()]] رقم بيزيد لوحده.

### [[references(() => users.id, ...)]]

FK على [[users.id]]. ليه [[() =>]] (دالة) مش [[users.id]] على طول؟ عشان لو جدولين بيشاوروا على بعض، واحد فيهم هيبقى لسه متعرّفش وقت ما التاني بيتقري. الدالة بتأجّل القراية لحد ما الملف كله يخلص. و [[onDelete: "restrict"]]: ممنوع تمسح يوزر عنده أوردرات. جرّبناها:

~~~text الناتج
update or delete on table "users" violates RESTRICT setting of foreign key constraint "orders_user_id_users_id_fk" on table "orders"
~~~

### [[numeric({ precision: 10, scale: 2 })]]

رقم عشري مظبوط (مش float): ١٠ أرقام في المجموع، منهم ٢ بعد العلامة. يعني أقصاه 99,999,999.99. و [[.default("0")]] بنص مش رقم، لأن Drizzle بيتعامل مع numeric كـ string (تحت).

### آخر argument: الـ indexes

[[(t) => [ ... ]]] دالة بتاخد الجدول ([[t]]) وبترجّع array فيه الـ indexes والـ constraints الزيادة. و [[index("الاسم").on(عمود، عمود)]] index مركّب، و [[.desc()]] العمود ده مترتب تنازلي جوه الـ index.

---

## ٤. [[drizzle-kit generate]]: من الكود لـ SQL

~~~bash
npx drizzle-kit generate --name init
~~~

[[npx]] بيشغّل أداة متسطبة في المشروع، و [[--name init]] اسم الملف (من غيره بيختار اسم عشوائي). بيقرا [[drizzle.config.ts]]: [[schema]] (فين الجداول)، و [[out]] (فين يكتب)، و [[dialect]] (أنهي قاعدة).

~~~text الناتج
2 tables
orders 5 columns 1 indexes 1 fks
users 4 columns 0 indexes 0 fks

[✓] Your SQL migration file ➜ drizzle\0000_init.sql 🚀
~~~

والملفات اللي اتعملت:

~~~text الفولدر drizzle
drizzle/0000_init.sql
drizzle/meta/0000_snapshot.json
drizzle/meta/_journal.json
~~~

- [[0000_init.sql]]: الـ migration. [[0000]] رقم ترتيبها.
- [[0000_snapshot.json]]: صورة الـ schema وقتها. المرة الجاية generate بيقارن الكود بآخر snapshot ويكتب الفرق بس.
- [[_journal.json]]: قايمة الـ migrations بالترتيب.

والـ SQL نفسه (أهم حتتين):

~~~text drizzle/0000_init.sql
CREATE TABLE "orders" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"user_id" uuid NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"total" numeric(10, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
...
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "orders_user_created_idx" ON "orders" USING btree ("user_id","created_at" DESC NULLS LAST);
~~~

- [[--> statement-breakpoint]] تعليق SQL (بيبدأ بـ [[--]])، و Drizzle بيقسم الملف عنده وينفّذ كل أمر لوحده.
- الـ FK اتعمل بـ [[ALTER TABLE]] في الآخر، عشان [[orders]] اتعمل قبل [[users]].
- اسم الـ FK اتولّد: [[orders_user_id_users_id_fk]] (الجدول_العمود_الجدول التاني_العمود_fk).
- [[DESC NULLS LAST]]: [[.desc()]] بتاعتنا، و Postgres بيحط الـ NULLs في الآخر.

ولو شغّلت generate تاني من غير ما تغيّر حاجة:

~~~text الناتج
No schema changes, nothing to migrate 😴
~~~

---

## ٥. [[drizzle-kit migrate]]: طبّق

~~~bash
npx drizzle-kit migrate
~~~

~~~text الناتج
Using 'pg' driver for database querying
[✓] migrations applied successfully!
~~~

وعشان يعرف اتطبّق إيه قبل كده، عمل schema اسمها [[drizzle]] فيها جدول [[__drizzle_migrations]]:

~~~text SELECT id, left(hash,12), created_at FROM drizzle.__drizzle_migrations
 id |     hash     |  created_at
----+--------------+---------------
  1 | 9498b17649bd | 1791363705034
~~~

[[hash]] بصمة محتوى الملف، و [[created_at]] نفس رقم [[when]] في [[_journal.json]] (ملّي ثانية من ١٩٧٠).

---

## ٦. الاستعلام: [[db.select()...]]

~~~ts
const db = drizzle(process.env.DATABASE_URL!);
~~~

[[drizzle(...)]] من [[drizzle-orm/node-postgres]] (شوف الـ imports في الـ solCode) بيعمل client بيستخدم [[pg]] من تحت. و [[!]] في الآخر بتاعة TypeScript: «أنا متأكد إن القيمة دي مش undefined»، لأن [[process.env.X]] نوعه [[string | undefined]].

### [[.toSQL()]]: شوف الـ SQL من غير ما تنفّذ

~~~ts
console.log(db.select().from(users).where(eq(users.email, "x")).toSQL());
~~~

~~~text الناتج
{
  sql: 'select "id", "email", "name", "created_at" from "users" where "users"."email" = $1',
  params: [ 'x' ]
}
~~~

[[select()]] فاضية = كل الأعمدة، بس Drizzle كتبهم بالاسم مش [[*]]. و [[eq(a, b)]] = [[a = b]]. والقيمة [['x']] متحطتش جوه الـ SQL: راحت [[$1]] والقيمة في [[params]]. ده parameterized query، فمفيش SQL injection.

### التقرير: أكتر ٣ صرفوا في ٩٠ يوم

~~~ts
const top = await db
  .select({ email: users.email, spent: sql<string>$__btsum($__{orders.total})$__bt })
  .from(users)
  .innerJoin(orders, eq(orders.userId, users.id))
  .where(and(eq(orders.status, "paid"), gte(orders.createdAt, sql$__btnow() - interval '90 days'$__bt)))
  .groupBy(users.id)
  .orderBy(desc(sql$__btsum($__{orders.total})$__bt))
  .limit(3);
~~~

حتة حتة:

| الحتة | معناها |
|---|---|
| [[.select({ email: ..., spent: ... })]] | الأعمدة اللي راجعة، وأسامي المفاتيح هي أسامي الحقول في النتيجة |
| [[sql<string>$__bt...$__bt]] | SQL خام للحاجات اللي ملهاش دالة جاهزة. [[<string>]] بتقول لـ TypeScript نوع النتيجة. و [[$__{orders.total}]] جوه الـ template بيتكتب [["orders"."total"]] |
| [[.innerJoin(orders, eq(...))]] | [[INNER JOIN orders ON ...]] |
| [[and(..., ...)]] | الشرطين مع بعض |
| [[gte(a, b)]] | [[a >= b]] (greater than or equal) |
| [[.groupBy(users.id)]] | تجميع لكل يوزر. يوزر بالـ id (الـ PK) يسمح نختار email من غير ما نجمّع بيه |
| [[desc(...)]] | ترتيب تنازلي |

و [[toSQL()]] على نفس الاستعلام:

~~~text الناتج
{
  sql: $__btselect "users"."email", sum("orders"."total") from "users" inner join "orders" on "orders"."user_id" = "users"."id" where ("orders"."status" = $1 and "orders"."created_at" >= now() - interval '90 days') group by "users"."id" order by sum("orders"."total") desc limit $2$__bt,
  params: [ 'paid', 3 ]
}
~~~

SQL واحد، شبه اللي كنت هتكتبه بالظبط. ضفنا يوزرين و ٤ أوردرات وشغّلناه:

~~~text الناتج
[
  { email: 'omar@example.com', spent: '999.99' },
  { email: 'sara@example.com', spent: '550.50' }
]
~~~

[[spent]] جه **string**: [['550.50']] مش [[550.5]]. لأن [[pg]] بيرجّع numeric كنص عشان ميخسرش دقة، و Drizzle مبيغيّرهوش. ونفس الحاجة لعمود [[total]] لو قريته مباشرة ([[total: '450.50']])، أما [[id]] رجع [[1]] رقم بسبب [[mode: "number"]].

---

## الخلاصة

| الخطوة | Drizzle | Prisma |
|---|---|---|
| الـ schema | ملف [[.ts]] بـ [[pgTable]] | [[schema.prisma]] |
| الـ types | من الـ schema على طول ([[typeof users.$inferSelect]]) | [[prisma generate]] |
| اكتب migration | [[drizzle-kit generate]] | [[migrate dev]] |
| طبّق | [[drizzle-kit migrate]] | [[migrate deploy]] |
| شوف الـ SQL | [[.toSQL()]] | الـ query log |
| numeric بيرجع | string | Decimal |

- اسم العمود في القاعدة أول argument لو مختلف عن اسم المفتاح.
- [[references(() => ...)]] بدالة، والـ indexes في آخر argument.
- القيم دايمًا parameters ([[$1]])، حتى جوه [[sql$__bt$__bt]].`,
          lines: [
            "الدوال اللي بتعرّف أعمدة Postgres.",
            "جدول users:",
            "uuid بيتولّد من القاعدة (gen_random_uuid).",
            "نص إجباري و unique.",
            "نص إجباري.",
            "timestamptz بعمود اسمه created_at في القاعدة.",
            "قفلة.",
            "جدول orders:",
            "bigint identity، وبيرجع JavaScript number.",
            "FK على users، ومسح يوزر عنده أوردرات مرفوض.",
            "نص وافتراضيًا pending.",
            "numeric(10,2) (بيرجع string).",
            "timestamptz.",
            "index مركّب (user_id, created_at DESC) في آخر argument.",
            "الـ client برابط القاعدة (بيستخدم pg من تحت).",
            "أكتر ٣ عملاء صرفوا في آخر ٩٠ يوم:",
            "الإيميل ومجموع الصرف (sql template للـ sum)،",
            "من users،",
            "JOIN مع orders،",
            "المدفوع في آخر ٩٠ يوم،",
            "مجمّع باليوزر،",
            "الأكتر الأول،",
            "٣ بس."
          ]
        },
        {
          cmd: "seed بـ faker",
          title: "املا القاعدة بآلاف الصفوف شبه الحقيقية، بالعربي",
          desc: R`دروس كتير بتقولك «جرّب على مليون صف» أو «قيس قبل وبعد الـ index». عشان كده محتاج seed: سكربت بيملا القاعدة بداتا شكلها حقيقي، بكميات كبيرة، وتقدر تعيده في أي وقت.

[[@faker-js/faker]] بيولّد أسماء وإيميلات وأسعار وتواريخ، وفيه locale عربي: [[fakerAR]] بيطلّع أسماء زي «نوف بن عبد السلام». و [[faker.seed(42)]] بيخلي نفس الداتا تطلع كل مرة، فالتجارب تبقى قابلة للتكرار.

والأهم في السرعة: متعملش INSERT لكل صف. ابعت الصفوف دفعات ([[createMany]] في Prisma، أو [[insert().values([...])]] في Drizzle، ألف صف في المرة). ولو محتاج ملايين: [[generate_series]] في SQL أو [[\copy]] من ملف أسرع من أي ORM.`,
          example: R`import { fakerAR as faker } from "@faker-js/faker";

faker.seed(42);

const fakeUsers = Array.from({ length: 1000 }, (_, i) => ({
  email: $__btuser$__{i}@example.com$__bt,
  name: faker.person.fullName(),
  createdAt: faker.date.past({ years: 1 }),
}));
const inserted = await db.insert(users).values(fakeUsers).returning({ id: users.id });

const fakeOrders = inserted.flatMap(({ id }) =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    userId: id,
    status: faker.helpers.weightedArrayElement([
      { value: "paid", weight: 7 }, { value: "pending", weight: 2 }, { value: "cancelled", weight: 1 },
    ]),
    total: faker.commerce.price({ min: 50, max: 3000 }),
    createdAt: faker.date.recent({ days: 180 }),
  })),
);
for (let i = 0; i < fakeOrders.length; i += 1000) {
  await db.insert(orders).values(fakeOrders.slice(i, i + 1000));
}`,
          try: R`شغّل السكربت ده (مع schema الـ Drizzle من الدرس اللي فات، أو حوّله لـ [[prisma.user.createMany]])، واطبع أول ٣ أسماء وعدد الأوردرات. شغّله مرتين بعد ما تفضّي الجداول: الأسماء اتغيرت؟ وبعدين شيل [[faker.seed(42)]] وشغّل تاني. وقيس الوقت لو خليت الـ loop يعمل insert لكل أوردر لوحده.`,
          sol: R`مع [[faker.seed(42)]] هتطلع نفس الأسماء ونفس عدد الأوردرات في كل مرة (عندي كانت [[نوف بن عبد السلام]] و [[دكتور فاطمه بوهاها]] و [[بتول النفير]]، و ٢٤٢٢ أوردر بالمثال مع faker 10، و ٢٥٣٢ بالـ solCode اللي الـ status فيه ثابت، لأن كل مناداة لـ faker بتحرّك السلسلة، والأرقام عندك ممكن تختلف لو نسخة faker مختلفة). التواريخ بس هي اللي بتتغير من يوم ليوم، لأن [[past]] و [[recent]] بيتحسبوا من النهارده. من غير seed كل تشغيلة بداتا مختلفة. ده مفيد للتجربة، بس وحش في test بيعتمد على رقم معين.

والإيميلات من [[user$__{i}]] مش من faker عشان عمود الإيميل unique، و faker ممكن يكرر مع آلاف الصفوف. و [[fakerAR]] أصلًا بيطلّع إيميلات بحروف لاتيني منقولة من الأسامي العربي (زي [[khlyl3@yahoo.com]])، فالرقم أضمن وأوضح.

الـ insert لكل صف لوحده هياخد وقت أكتر بمراحل: كل صف round trip. ألف صف في كل insert بيقسم الوقت على ألف تقريبًا. ومتكبّرش الدفعة أوي: Postgres ليه حد ٦٥٥٣٥ parameter في الأمر الواحد، فلو كل صف ٥ أعمدة يبقى أقصى حاجة حوالي ١٣ ألف صف في الدفعة.`,
          solCode: R`import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { fakerAR as faker } from "@faker-js/faker";
import { users, orders } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);
await db.delete(orders);
await db.delete(users);
faker.seed(42);

const fakeUsers = Array.from({ length: 1000 }, (_, i) => ({
  email: $__btuser$__{i}@example.com$__bt,
  name: faker.person.fullName(),
  createdAt: faker.date.past({ years: 1 }),
}));
console.time("seed");
const inserted = await db.insert(users).values(fakeUsers).returning({ id: users.id });
const fakeOrders = inserted.flatMap(({ id }) =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    userId: id,
    status: "paid",
    total: faker.commerce.price({ min: 50, max: 3000 }),
    createdAt: faker.date.recent({ days: 180 }),
  })),
);
for (let i = 0; i < fakeOrders.length; i += 1000) {
  await db.insert(orders).values(fakeOrders.slice(i, i + 1000));
}
console.timeEnd("seed");
console.log(fakeUsers.slice(0, 3).map((u) => u.name), fakeOrders.length);
process.exit(0);`,
          flag: "script",
          deep: {
            why: "مشاكل الأداء (N+1، و index ناقص، و OFFSET) مش بتبان على ١٠ صفوف. والواجهة بتبان مختلفة خالص مع أسماء عربي طويلة ونصوص حقيقية. والـ seed بيخلّي أي حد في الفريق يقوم بقاعدة فيها داتا في دقيقة، بدل ما كل واحد يضيف بإيده.",
            how: R`faker مولّد عشوائي بـ seed: نفس الـ seed ونفس ترتيب المناداة يطلّعوا نفس القيم. لو غيّرت ترتيب الأسطر، القيم هتتغير.

[[fakerAR]] instance جاهز بالـ locale العربي (أسماء وعناوين)، والحاجات اللي مش موجودة بالعربي بترجع للإنجليزي. و [[faker.helpers.weightedArrayElement]] بيختار بنسب (٧٠٪ مدفوع)، فالتوزيع يبقى شبه الحقيقة مش متساوي.

الداتا الواقعية مش بس أسماء: التوزيع مهم. أغلب اليوزرز عندهم أوردرات قليلة وشوية عندهم كتير، والتواريخ متوزعة على شهور. ده اللي بيطلّع مشاكل الـ indexes وخطط الاستعلام الحقيقية.

السرعة: batch insert بيبعت صفوف كتير في أمر واحد. [[createMany]] في Prisma بيعمل كده، و [[skipDuplicates: true]] بيتجاهل التكرار. ولملايين الصفوف، [[INSERT ... SELECT ... FROM generate_series(1, 1000000)]] جوه القاعدة (درس B-tree index) أسرع بكتير، لأن الداتا مش بتعدّي على الشبكة أصلًا.

وفي Prisma: [[migrations.seed]] في [[prisma.config.ts]] (زي [[seed: "tsx prisma/seed.ts"]]) و [[npx prisma db seed]] بيشغّله. ومن Prisma 7 مبيشتغلش لوحده بعد migrate dev أو reset، لازم تشغّله انت.`,
            when: "أول ما تعمل الـ schema: seed صغير للتطوير. قبل ما تقيس أداء: seed كبير. في الـ tests: داتا محددة بـ seed ثابت. وعمره ما يشتغل على الإنتاج.",
            mistakes: R`insert لكل صف في loop. faker للإيميلات في عمود unique فيقع بعد آلاف الصفوف. من غير seed ثابت فالـ test يعدّي مرة ويفشل مرة. سكربت seed بيمسح الجداول وبيقرا DATABASE_URL فحد يشغّله بالغلط على الإنتاج (حط check إن الرابط localhost). ودفعة أكبر من حد الـ parameters.`
          },
          teach: R`## الفكرة: داتا عشوائية بس بتتكرر، ومتبعتة دفعات

السكربت بيعمل ١٠٠٠ يوزر بأسماء عربي، ولكل واحد من ٠ لـ ٥ أوردرات، ويدخّلهم القاعدة بأقل عدد أوامر. فيه ٣ أفكار: **faker** بيولّد القيم، و **seed** بيخلّيها هي هي كل مرة، و **batch insert** بيخلّي الإدخال سريع.

**إزاي جرّبناه:** [[@faker-js/faker]] 10.6 و Drizzle على [[postgres:18]] في Docker، بالـ schema بتاع درس Drizzle، وسكربت الـ solCode بالظبط بـ [[npx tsx]] (نفس المثال بس الـ status فيه ثابت [["paid"]] ومعاه قياس وقت وطباعة).

---

## ١. [[import { fakerAR as faker }]]

~~~ts
import { fakerAR as faker } from "@faker-js/faker";
~~~

المكتبة بتصدّر instance جاهز لكل لغة: [[faker]] (إنجليزي)، و [[fakerAR]] (عربي)، و [[fakerDE]]... و [[as faker]] معناها «هاته وسمّيه [[faker]] عندي»، فباقي الكود يكتب [[faker.person...]] ولو حبيت ترجع للإنجليزي تغيّر سطر واحد.

---

## ٢. [[faker.seed(42)]]

~~~ts
faker.seed(42);
~~~

faker مش عشوائي بجد: هو مولّد أرقام بيبدأ من رقم اسمه seed، ومن نفس الـ seed بيطلّع نفس السلسلة بالظبط. [[42]] مجرد رقم، أي رقم ثابت ينفع.

شغّلنا السكربت مرتين ورا بعض:

~~~text التشغيل الأول
[ 'نوف بن عبد السلام', 'دكتور فاطمه بوهاها', 'بتول النفير' ] 2532
~~~

~~~text التشغيل التاني
[ 'نوف بن عبد السلام', 'دكتور فاطمه بوهاها', 'بتول النفير' ] 2532
~~~

نفس الأسماء ونفس عدد الأوردرات ([[2532]]). بشرط إن ترتيب المناداة ميتغيرش: لو زودت سطر faker في النص، كل اللي بعده هيتغير. ودي شفناها بعينا: كود المثال نفسه (اللي فيه [[weightedArrayElement]] للـ status) طلّع نفس أول ٣ أسماء، بس [[2422]] أوردر مش [[2532]]، لأن الاختيار ده بيسحب أرقام عشوائية زيادة من نفس السلسلة، فعدد الأوردرات لليوزرز اللي بعد كده اتغير.

---

## ٣. اليوزرز: [[Array.from]]

~~~ts
const fakeUsers = Array.from({ length: 1000 }, (_, i) => ({
  email: $__btuser$__{i}@example.com$__bt,
  name: faker.person.fullName(),
  createdAt: faker.date.past({ years: 1 }),
}));
~~~

### [[Array.from({ length: 1000 }, fn)]]

بيعمل array فيه ١٠٠٠ عنصر، وكل عنصر قيمته اللي الدالة [[fn]] بترجّعها. والدالة بتاخد حاجتين: العنصر نفسه (هنا فاضي، فسمّيناه [[_]] يعني «مش محتاجه») والرقم [[i]] من 0 لـ 999.

### [[=> ({ ... })]]

القوسين حوالين الـ object مهمين: [[=> { }]] من غير قوسين JavaScript هيفهمها جسم دالة مش object. [[({ })]] معناها «رجّع الـ object ده».

### الحقول

| الحقل | منين | مثال من التشغيل |
|---|---|---|
| [[email]] | [[$__btuser$__{i}@example.com$__bt]] | [[user0@example.com]] |
| [[name]] | [[faker.person.fullName()]] | [[نوف بن عبد السلام]] |
| [[createdAt]] | [[faker.date.past({ years: 1 })]] | [[2025-12-03T07:34:19.225Z]]: تاريخ في السنة اللي فاتت |

الإيميل من الرقم مش من faker لأن العمود [[unique]]: [[user0]] لحد [[user999]] مستحيل يتكرروا، و faker ممكن يكرر بعد آلاف. وكمان [[fakerAR]] بيطلّع إيميلات بحروف لاتيني منقولة من الأسامي (من التشغيل: [[khlyl3@yahoo.com]]).

والتاريخ ثابت مع الـ seed **بالنسبة للنهارده**: [[past]] بيحسب من دلوقتي، فلو شغّلت بكرة التواريخ هتتزحلق يوم.

---

## ٤. insert واحد لكل اليوزرز، و [[returning]]

~~~ts
const inserted = await db.insert(users).values(fakeUsers).returning({ id: users.id });
~~~

- [[.values(fakeUsers)]]: array كامل، فـ Drizzle بيعمل **أمر INSERT واحد** فيه ١٠٠٠ صف.
- [[.returning({ id: users.id })]]: [[RETURNING id]]، رجّعلي الـ id اللي القاعدة ولّدته لكل صف (الـ uuid بيتولّد في القاعدة، فمنعرفوش غير كده).

~~~text inserted[0]
{ id: 'f4acccb6-5987-4d64-96bc-92636023d450' }
~~~

---

## ٥. الأوردرات: [[flatMap]]

~~~ts
const fakeOrders = inserted.flatMap(({ id }) =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    userId: id,
    status: faker.helpers.weightedArrayElement([
      { value: "paid", weight: 7 }, { value: "pending", weight: 2 }, { value: "cancelled", weight: 1 },
    ]),
    total: faker.commerce.price({ min: 50, max: 3000 }),
    createdAt: faker.date.recent({ days: 180 }),
  })),
);
~~~

من جوه لبرة:

### [[faker.number.int({ min: 0, max: 5 })]]

رقم صحيح عشوائي من 0 لـ 5 (الاتنين داخلين). ده عدد أوردرات اليوزر ده، فيه يوزرز ملهمش أوردرات خالص، زي الحقيقة.

### [[weightedArrayElement]]

بيختار عنصر بنسب: الأوزان ٧ و ٢ و ١ من ١٠. عملنا ١٠٠٠ اختيار وعدّيناهم:

~~~text الناتج
{ paid: 712, cancelled: 100, pending: 188 }
~~~

قريب جدًا من ٧٠٪ و ١٠٪ و ٢٠٪، مش بالظبط لأنه عشوائي.

### [[faker.commerce.price({ min: 50, max: 3000 })]]

~~~text الناتج
596.10 string
~~~

**string** فيه رقمين بعد العلامة، ده مناسب بالظبط لعمود [[numeric(10, 2)]] اللي Drizzle بيتعامل معاه كـ string.

### [[faker.date.recent({ days: 180 })]]

تاريخ في آخر ١٨٠ يوم.

### [[flatMap]]

[[map]] على اليوزرز كانت هترجّع array **جواه arrays** (لكل يوزر array أوردراته). [[flatMap]] بيعمل map وبعدين يفرد مستوى واحد، فالنتيجة array واحد فيه كل الأوردرات. و [[({ id })]] destructuring: من كل عنصر في [[inserted]] خد [[id]].

~~~text fakeOrders[0]
{
  userId: 'f4acccb6-5987-4d64-96bc-92636023d450',
  status: 'paid',
  total: '1643.69',
  createdAt: 2026-05-14T02:23:53.353Z
}
~~~

---

## ٦. دفعات ألف ألف

~~~ts
for (let i = 0; i < fakeOrders.length; i += 1000) {
  await db.insert(orders).values(fakeOrders.slice(i, i + 1000));
}
~~~

[[i]] بيبدأ 0 ويزيد ١٠٠٠ كل لفة ([[i += 1000]]). و [[slice(i, i + 1000)]] بتقطع من [[i]] لحد قبل [[i + 1000]]. فالـ ٢٥٣٢ أوردر بقوا ٣ أوامر: ١٠٠٠ و ١٠٠٠ و ٥٣٢.

### ليه مش insert لكل أوردر؟

قسنا على ٢٠٠٠ أوردر (Postgres في Docker على نفس الجهاز):

~~~text الناتج
one-by-one: 3.513s
batches of 1000: 177.997ms
~~~

حوالي ٢٠ مرة أسرع. كل أمر رحلة رايح جاي للقاعدة (round trip)، والـ ٢٠٠٠ رحلة هم اللي واكلين الوقت مش الإدخال نفسه. ولو القاعدة على سيرفر بعيد، الفرق أكبر بكتير.

### وليه مش كله في أمر واحد؟

كل قيمة في الأمر parameter ([[$1]] و [[$2]]...)، والبروتوكول بتاع Postgres بيعدّ الـ parameters في رقم أقصاه 65535. جرّبنا ٢١٨٤٦ يوزر × ٣ أعمدة = ٦٥٥٣٨ parameter في أمر واحد:

~~~text الناتج
bind message has 2 parameter formats but 0 parameters
~~~

رسالة ملخبطة: العداد «لف» وبقى ٢. يعني لو شفت error غريب في seed كبير، قلّل الدفعة.

---

## ٧. [[console.time]] و [[process.exit]]

~~~ts
console.time("seed");
...
console.timeEnd("seed");
~~~

بيبدأ ساعة باسم، و [[timeEnd]] بيطبع الوقت من ساعتها:

~~~text الناتج
seed: 276.863ms
~~~

١٠٠٠ يوزر و ٢٥٣٢ أوردر في أقل من ثلث ثانية. و [[process.exit(0)]] في الآخر عشان الـ connection pool بتاع [[pg]] بيفضل مفتوح ويمنع Node يقفل لوحده.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[faker.seed(42)]] | نفس الداتا كل مرة (لنفس نسخة faker ونفس اليوم) |
| [[fakerAR]] | أسماء عربي حقيقية الشكل |
| إيميل من [[i]] | العمود unique |
| [[weightedArrayElement]] | توزيع شبه الحقيقة مش متساوي |
| [[returning]] | الـ ids اللي القاعدة ولّدتها |
| دفعات ١٠٠٠ | رحلات أقل، ومن غير ما تعدّي حد الـ 65535 parameter |`,
          lines: [
            "faker بالـ locale العربي.",
            "ثبّت الـ seed: نفس الداتا كل مرة.",
            "١٠٠٠ يوزر:",
            "إيميل فريد من الرقم (مش من faker عشان الـ unique)،",
            "اسم عربي،",
            "وتاريخ تسجيل في آخر سنة.",
            "قفلة.",
            "insert واحد بكل اليوزرز، ورجّع الـ ids.",
            "لكل يوزر من ٠ لـ ٥ أوردرات:",
            "عدد عشوائي.",
            "صاحب الأوردر،",
            "حالة بنسب:",
            "٧٠٪ مدفوع، و٢٠٪ pending، و١٠٪ ملغي.",
            "قفلة.",
            "سعر بين ٥٠ و ٣٠٠٠ (بيرجع string مناسب لـ numeric)،",
            "وتاريخ في آخر ٦ شهور.",
            "قفلة.",
            "قفلة الـ flatMap: array واحد فيه كل الأوردرات.",
            "دفعات ألف ألف:",
            "insert واحد لكل ألف أوردر.",
            "قفلة."
          ]
        }
      ]
    }
]);
