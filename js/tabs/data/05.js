// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "Prisma من الكود",
      l: 3,
      n: "نفس المتجر بس من TypeScript: إعداد Prisma 7، والـ schema والعلاقات، وتجيب وتكتب علاقات في query واحد، و SQL خام بأمان، و N+1",
      items: [
        {
          cmd: "إعداد Prisma 7",
          title: "prisma.config.ts و driver adapter والـ client المتولّد",
          desc: R`Prisma 7 غيّر طريقة الإعداد عن 5 و 6. تلات حاجات لازم تعرفها:

رابط القاعدة مبقاش في [[schema.prisma]]. بقى في ملف [[prisma.config.ts]] جنب package.json، وده اللي الـ CLI (migrate و generate) بيقراه. والملف ده مش بيقرا [[.env]] لوحده: لازم [[import "dotenv/config"]] في أوله.

الـ client مبقاش بيتولّد جوه node_modules. الـ generator الجديد [[prisma-client]] بيكتب كود TypeScript في فولدر انت بتحدده بـ [[output]]، وبتستورد منه: [[./generated/prisma/client]].

والـ client محتاج driver adapter: لـ Postgres هو [[@prisma/adapter-pg]]، وده بيستخدم مكتبة [[pg]] من تحت. بتعمل adapter برابط القاعدة وتدّيه لـ [[new PrismaClient({ adapter })]].

والمثال هنا نفس متجر التاب ده (users و orders و products و order_items)، بس جداول جديدة بتعملها Prisma في قاعدة فاضية.`,
          example: R`// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
});

// prisma/schema.prisma (أول الملف)
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
datasource db {
  provider = "postgresql"
}

// src/db.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter, log: ["query", "warn", "error"] });`,
          try: R`اعمل مشروع جديد في فولدر فاضي: [[npm init -y]]، و [[npm pkg set type=module]]، وسطّب [[prisma@7]] و [[tsx]] و [[dotenv]] كـ dev dependencies، و [[@prisma/client@7]] و [[@prisma/adapter-pg@7]] و [[pg]]. شغّل [[npx prisma init --datasource-provider postgresql --output ../src/generated/prisma]] وشوف اسم ملف الـ config اللي اتعمل. عدّل [[DATABASE_URL]] في .env يشاور على قاعدة فاضية في الـ lab (مثلًا [[createdb shop]])، وضيف model بسيط، وشغّل [[npx prisma migrate dev --name init]]. فيه فولدر [[src/generated]] اتعمل؟`,
          sol: R`بعد [[prisma init]] هتلاقي [[prisma/schema.prisma]] و [[.env]] وملف config. في آخر نسخ Prisma 7 (7.10 وقت كتابة الدرس) الملف بيتسمّى [[prisma7.config.ts]] مش [[prisma.config.ts]]، عشان الاسم ده هيبقى لـ Prisma 8. الاتنين بيتقروا في Prisma 7 وجواهم نفس الكلام، فلو المشروع أو الدروس بتقول prisma.config.ts متقلقش.

بعد [[migrate dev]] هتشوف [[Your database is now in sync with your schema]] وفولدر [[prisma/migrations/التاريخ_init/migration.sql]]. بس فولدر [[src/generated]] مش هيبقى موجود. من Prisma 7 الـ migrate مبقاش بيعمل generate لوحده، فلازم [[npx prisma generate]] وبعدها هتلاقي [[src/generated/prisma/client.ts]].

الأخطاء الشائعة: لو نسيت [[import "dotenv/config"]] في ملف الـ config، الـ CLI مش هيلاقي الرابط. ولو كتبت [[npm i -D prisma]] من غير [[@7]]، ممكن تنزل نسخة 8 (وقت كتابة الدرس الـ tag [[latest]] بتاع الـ CLI كان بيشاور على 8.0.0-rc)، و 8 ليها API مختلف تمامًا. ولو استوردت [[PrismaClient]] من [[@prisma/client]] بدل الفولدر المتولّد هيقع على طول بـ [[does not provide an export named 'PrismaClient']]، لأن الـ package ده مبقاش فيه client متولّد. ولو السكربت فيه top-level await واشتكى من [[cjs]]، يبقى ناقصك [[type=module]] في package.json.`,
          solCode: R`mkdir shop-prisma && cd shop-prisma
npm init -y && npm pkg set type=module
npm i -D prisma@7 tsx dotenv
npm i @prisma/client@7 @prisma/adapter-pg@7 pg
npx prisma init --datasource-provider postgresql --output ../src/generated/prisma
# عدّل DATABASE_URL في .env، وضيف model في prisma/schema.prisma
npx prisma migrate dev --name init
npx prisma generate
ls src/generated/prisma
npx tsx src/main.ts`,
          flag: "script",
          deep: {
            why: "Prisma هو الـ ORM الأشهر في مشاريع Node و Next.js، وتقريبًا كل tutorial قديم على النت بيوريك إعداد 5 أو 6 (url جوه الـ schema، و import من @prisma/client). لو مشيت وراه على Prisma 7 هتقع في errors مش مفهومة. وفهم الأجزاء (CLI بيقرا config، و client بيتولّد، و adapter بيكلّم القاعدة) بيخليك تعرف المشكلة فين لما حاجة تقع.",
            how: R`في Prisma 7 الـ client اتكتب من غير الـ query engine القديم (binary مكتوب بـ Rust كان بيتحط جنب التطبيق). دلوقتي الـ client TypeScript بيبني SQL ويبعته عن طريق الـ driver adapter، و [[@prisma/adapter-pg]] بيستخدم pool من مكتبة [[pg]]. عشان كده الـ adapter إجباري، والـ bundle أصغر، ومفيش binary يختلف بين الماك والسيرفر.

[[prisma.config.ts]] للـ CLI بس: [[migrate]] و [[db pull]] و [[studio]] بيقروا منه رابط القاعدة ومكان الـ schema والـ migrations. التطبيق نفسه مش بيقراه. التطبيق بياخد الرابط من [[process.env.DATABASE_URL]] ويدّيه للـ adapter. يعني ممكن الاتنين يبقوا مختلفين: الـ CLI على رابط مباشر (direct) عشان الـ migrations، والتطبيق على رابط الـ pooler (زي Supabase، درس connection pooling في تاب «PostgreSQL»).

الـ generator [[prisma-client]] بيكتب ملفات [[.ts]] في الـ output. عشان كده التطبيق لازم يكون TypeScript أو يتشغّل بـ [[tsx]]، أو تبنيه بـ [[tsc]]. و [[src/generated]] حطه في [[.gitignore]] وولّده في الـ CI والـ Docker build بـ [[prisma generate]].

[[log: ["query"]]] بيطبع كل SQL الـ client بيبعته. ده أهم أداة عندك عشان تفهم Prisma بيعمل إيه، وهتستخدمه في درس N+1. خليه في التطوير بس.

وعمل instance واحد من PrismaClient للتطبيق كله (singleton) اتشرح في درس Prisma client في تاب «Backend بـ Node». والـ migrations (migrate dev على جهازك و migrate deploy على السيرفر) في درس Prisma migrate في تاب «PostgreSQL».`,
            when: "أي مشروع Node أو Next.js جديد بـ Postgres أو MySQL أو SQLite. في مشروع قديم على Prisma 6 خد النقل خطوة خطوة بدليل الـ upgrade الرسمي. و Prisma 8 وقت كتابة الدرس لسه RC و API بتاعه مختلف تمامًا، فمتبدأش بيه مشروع حقيقي لحد ما يبقى stable ويكون فيه دليل واضح.",
            mistakes: R`[[npm i prisma]] من غير version فتنزل major مش هي اللي انت متوقعها. ناسي [[dotenv/config]]. [[prisma generate]] مش في الـ build، فالسيرفر يقوم من غير client. الـ generated في git فيحصل conflicts. [[migrate dev]] على الإنتاج (بيقترح reset ويمسح الداتا). وتعدّل ملف migration اتطبق قبل كده: Prisma بيحسب checksum لكل ملف، فهيقولك إن الـ migration اتغيرت ويطلب reset. أي تصليح بيبقى migration جديدة.`
          },
          teach: R`## الفكرة: ٣ ملفات، وكل واحد ليه قاري مختلف

المثال فيه ٣ ملفات، ومفتاح فهم Prisma 7 إنك تعرف مين بيقرا كل واحد:

| الملف | مين بيقراه | فيه إيه |
|---|---|---|
| [[prisma.config.ts]] | الـ CLI بس ([[npx prisma ...]]) | رابط القاعدة، ومكان الـ schema والـ migrations |
| [[prisma/schema.prisma]] | الـ CLI ([[migrate]] و [[generate]]) | الـ generator ونوع القاعدة والـ models |
| [[src/db.ts]] | التطبيق بتاعك | الـ client اللي بتكتب بيه الـ queries |

كل اللي تحت اتشغّل فعلًا على ويندوز بـ Node 24 و Prisma 7.10.0، على PostgreSQL 18 في container Docker على البورت 55905، في فولدر فاضي.

---

## ١. التسطيب: ليه ٦ packages؟

~~~bash
npm init -y && npm pkg set type=module
npm i -D prisma@7 tsx dotenv
npm i @prisma/client@7 @prisma/adapter-pg@7 pg
~~~

- [[npm init -y]]: يعمل [[package.json]] بالقيم الافتراضية من غير أسئلة ([[-y]] = yes لكل حاجة).
- [[npm pkg set type=module]]: يكتب [[type: module]] في package.json، يعني ملفات [[.js]] و [[.ts]] تتعامل كـ ES modules ([[import]] مش [[require]]). ومن غيره الـ top-level [[await]] (await برّه أي function) مش هيشتغل.
- [[-D]] = devDependencies، حاجات للتطوير بس:
  - [[prisma@7]]: الـ CLI ([[init]] و [[migrate]] و [[generate]]). و [[@7]] معناها «آخر نسخة من 7». من غيرها، يوم التجربة كان الـ tag اللي اسمه [[latest]] بيشاور على [[8.0.0-rc.20]].
  - [[tsx]]: بيشغّل ملف TypeScript على طول ([[npx tsx src/main.ts]]) من غير ما تبنيه.
  - [[dotenv]]: بيقرا ملف [[.env]] ويحط اللي فيه في [[process.env]].
- والتلاتة التانيين dependencies عادية لأن التطبيق محتاجهم وهو شغال:
  - [[@prisma/client@7]]: الـ runtime اللي الكود المتولّد بيستخدمه.
  - [[@prisma/adapter-pg@7]]: الـ driver adapter بتاع Postgres.
  - [[pg]]: مكتبة Postgres العادية لـ Node، والـ adapter بيكلّم القاعدة بيها.

~~~bash
npx prisma --version
~~~

~~~text الناتج (جزء منه)
prisma               : 7.10.0
@prisma/client       : 7.10.0
Node.js              : v24.19.0
Query Compiler       : enabled
~~~

[[Query Compiler : enabled]] يعني الـ client بيبني الـ SQL بنفسه في TypeScript، مش الـ query engine القديم المكتوب بـ Rust. وده السبب إن الـ adapter بقى إجباري.

---

## ٢. [[prisma init]]

~~~bash
npx prisma init --datasource-provider postgresql --output ../src/generated/prisma
~~~

- [[--datasource-provider postgresql]]: نوع القاعدة اللي هيتكتب في الـ schema.
- [[--output ../src/generated/prisma]]: مكان الكود المتولّد. المسار ده **نسبةً لملف الـ schema** (اللي في [[prisma/]])، فـ [[..]] بتطلع لفولدر المشروع وبعدين [[src/generated/prisma]].

~~~text الناتج (جزء منه)
Initialized Prisma in your project

  prisma/
    schema.prisma
  prisma7.config.ts
  .env
  .gitignore
~~~

خد بالك: الملف اتسمّى [[prisma7.config.ts]] مش [[prisma.config.ts]] (ده اللي الـ sol بيشرح سببه). احنا غيّرنا اسمه لـ [[prisma.config.ts]] زي المثال، والـ CLI قراه عادي وكتب [[Loaded Prisma config from prisma.config.ts.]] في أول كل أمر. ونسخة 7.10 كمان بتعمل فولدرات [[.claude/skills]] و [[.agents/skills]] و [[.windsurf/skills]] (تعليمات لأدوات الـ AI)، ودول مالهمش دعوة بتشغيل Prisma.

---

## ٣. [[prisma.config.ts]] سطر سطر

~~~ts
import "dotenv/config";
~~~

[[import]] من غير أسماء بعده معناه «شغّل الملف ده وبس». و [[dotenv/config]] لما يشتغل بيقرا [[.env]] ويملا [[process.env]]. Prisma 7 مبقاش بيقرا [[.env]] لوحده، والملف اللي [[init]] عمله بيقولها صريحة في أوله: [[Environment variables declared in this file are NOT automatically loaded by Prisma.]]

~~~ts
import { defineConfig } from "prisma/config";
~~~

[[defineConfig]] دالة بترجّع الـ object زي ما هو. فايدتها الوحيدة الـ types: المحرر بيكمّلك أسماء الخانات وبيعلّم على الغلط.

~~~ts
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
});
~~~

- [[export default]]: الـ CLI بيعمل import للملف وياخد الـ default export.
- [[schema]]: مكان ملف الـ schema.
- [[migrations.path]]: الفولدر اللي هتتكتب فيه ملفات الـ SQL.
- [[datasource.url]]: رابط القاعدة اللي الـ CLI هيتوصّل بيه. و [[process.env["DATABASE_URL"]]] هو نفس [[process.env.DATABASE_URL]]، بالأقواس بس.

والـ [[.env]] عندنا سطر واحد:

~~~text .env
DATABASE_URL="postgresql://postgres:pass@localhost:55905/shop"
~~~

يعني: بروتوكول postgresql، يوزر [[postgres]] وباسورد [[pass]]، على [[localhost]] بورت [[55905]]، قاعدة اسمها [[shop]].

---

## ٤. أول [[schema.prisma]]

~~~text prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
datasource db {
  provider = "postgresql"
}
~~~

- [[generator client]]: بلوك بيقول «ولّد كود من الـ schema ده». و [[client]] مجرد اسم.
- [[provider = "prisma-client"]]: الـ generator الجديد اللي بيكتب ملفات [[.ts]] في الـ [[output]]. القديم كان [[prisma-client-js]] وكان بيكتب جوه [[node_modules/.prisma]].
- [[datasource db]]: نوع القاعدة. ومفيش [[url]] هنا خلاص: لو كتبته Prisma 7 هيرفض الـ schema.

---

## ٥. [[migrate dev]] وبعده [[generate]]

ضفنا موديلين (درس schema.prisma الجاي) وشغّلنا:

~~~bash
npx prisma migrate dev --name init
~~~

~~~text الناتج
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
Datasource "db": PostgreSQL database "shop", schema "public" at "localhost:55905"

Applying migration $__bt20261007085135_init$__bt

The following migration(s) have been created and applied from new schema changes:

prisma\migrations/
  └─ 20261007085135_init/
    └─ migration.sql

Your database is now in sync with your schema.
~~~

السطر التالت بيأكد إن الرابط اتقرا صح من الـ config: قاعدة [[shop]] على [[localhost:55905]]. والفولدر اسمه التاريخ والوقت ([[20261007085135]] = 2026-10-07 08:51:35) وبعده الاسم اللي ادّيته بـ [[--name]].

بس [[ls src]] بعدها طلّع [[No such file or directory]]: مفيش client اتولّد. لازم:

~~~bash
npx prisma generate
~~~

~~~text الناتج
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
✔ Generated Prisma Client (7.10.0) to .\src\generated\prisma in 35ms
~~~

(وقبلها طلّع صندوق «Update available 7.10.0 -> 8.0.0-rc.20». متسمعش كلامه في مشروع شغال: 8 major جديدة وليها API مختلف.)

~~~text اللي اتعمل في src/generated/prisma
browser.ts  client.ts  commonInputTypes.ts  enums.ts  internal/  models/  models.ts
models/:  Order.ts  User.ts
~~~

[[client.ts]] هو اللي هتعمل منه import، و [[models/]] فيها ملف types لكل model.

---

## ٦. [[src/db.ts]] سطر سطر

~~~ts
import "dotenv/config";
~~~

نفس السطر تاني، بس المرة دي للتطبيق. [[prisma.config.ts]] الـ CLI بس اللي بيقراه، فالتطبيق محتاج يحمّل [[.env]] بنفسه.

~~~ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
~~~

[[PrismaPg]] class الـ adapter. و [[PrismaClient]] جاي من الفولدر المتولّد ([[./]] = نسبةً لملف db.ts نفسه)، مش من [[@prisma/client]].

~~~ts
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
~~~

- [[new PrismaPg({...})]]: اعمل adapter. ومن جوه بيعمل [[Pool]] من مكتبة [[pg]] (مجموعة connections بتتعاد).
- [[connectionString]]: نفس الرابط اللي في [[.env]].
- [[!]] في الآخر: علامة TypeScript اسمها non-null assertion. [[process.env.X]] نوعه [[string | undefined]]، والـ [[!]] معناها «أنا متأكد إنها مش undefined». مش بتعمل أي حاجة وقت التشغيل.

~~~ts
export const prisma = new PrismaClient({ adapter, log: ["query", "warn", "error"] });
~~~

- [[export const prisma]]: instance واحد، وأي ملف تاني يعمل [[import { prisma } from "./db"]].
- [[{ adapter }]]: اختصار لـ [[{ adapter: adapter }]].
- [[log]]: أنواع الرسايل اللي تتطبع. [[query]] = كل SQL بيتبعت، و [[warn]] و [[error]] = التحذيرات والأخطاء. وفيه كمان [[info]].

جرّبناه بملف صغير:

~~~ts
// src/main.ts
import { prisma } from "./db";
console.log(await prisma.user.count());
await prisma.$disconnect();
~~~

~~~bash
npx tsx src/main.ts
~~~

~~~text الناتج
prisma:query SELECT COUNT(*) AS "_count$_all" FROM (SELECT "public"."users"."id" FROM "public"."users" WHERE 1=1 OFFSET $1) AS "sub"
0
~~~

السطر الأول هو [[log: ["query"]]] شغال: ده الـ SQL اللي [[count()]] اتحوّل له. [[$1]] parameter (قيمته 0 هنا)، و [[WHERE 1=1]] شرط دايمًا صح Prisma بيحطه لما مفيش فلتر. والسطر التاني النتيجة: صفر يوزرز. و [[$disconnect()]] بيقفل الـ pool عشان السكربت يخلص ويرجّعك للترمنال.

---

## ٧. الأخطاء اللي جربناها بإيدينا

| الغلطة | اللي طلع |
|---|---|
| شيلنا [[import "dotenv/config"]] من الـ config وشغّلنا [[migrate status]] | [[Error: The datasource.url property is required in your Prisma config file when using prisma migrate status.]] |
| [[import { PrismaClient } from "@prisma/client"]] في مشروع [[type=module]] | [[SyntaxError: The requested module '@prisma/client' does not provide an export named 'PrismaClient']] |
| [[new PrismaClient()]] من غير adapter | [[PrismaClientInitializationError: PrismaClient was instantiated without any options. A driver adapter is required to connect to your database.]] |
| [[migrate dev]] من غير [[generate]] | مفيش فولدر [[src/generated]]، فأي import منه هيقع |

---

## الخلاصة

- [[prisma.config.ts]] للـ CLI بس، وأوله [[import "dotenv/config"]]. والتطبيق بيحمّل [[.env]] لوحده برضه.
- الـ client بيتولّد في الـ [[output]] اللي حددته، وبتعمل import منه، مش من [[@prisma/client]].
- [[new PrismaClient({ adapter })]] والـ adapter إجباري.
- [[migrate dev]] وبعده [[generate]]، لأن 7 مبقاش بيولّد لوحده.
- ثبّت [[@7]] في كل package من Prisma.`,
          lines: [
            "حمّل .env في process.env، لأن الـ config مش بيعملها لوحده.",
            "دالة الإعداد من Prisma.",
            "الإعداد:",
            "مكان الـ schema،",
            "ومكان فولدر الـ migrations،",
            "ورابط القاعدة اللي الـ CLI هيستخدمه.",
            "قفلة.",
            "الـ generator الجديد:",
            "prisma-client بدل prisma-client-js القديم،",
            "والكود المتولّد يتكتب هنا (المسار نسبةً لملف الـ schema).",
            "قفلة.",
            "نوع القاعدة، ومفيش url هنا خلاص.",
            "postgresql.",
            "قفلة.",
            "في التطبيق: حمّل .env برضه.",
            "الـ driver adapter بتاع Postgres.",
            "الـ client من الفولدر المتولّد، مش من @prisma/client.",
            "adapter برابط القاعدة (بيعمل pool من pg).",
            "client واحد للتطبيق كله، وبيطبع كل SQL بيتبعت."
          ]
        },
        {
          cmd: "schema.prisma",
          title: "models و @relation و onDelete و @@index",
          desc: R`كل [[model]] في [[schema.prisma]] بيبقى جدول، وكل سطر جواه عمود: الاسم، والنوع، وبعدين attributes بـ [[@]]. ومن الملف ده Prisma بيعمل حاجتين: الـ migrations (الـ SQL)، والـ types في الـ client.

العلاقة ليها ناحيتين: في [[Order]] عمود حقيقي [[userId]] ومعاه [[user User @relation(fields: [userId], references: [id])]] (ده FK)، وفي [[User]] سطر [[orders Order[]]] مالوش عمود في القاعدة: موجود بس عشان تقدر تكتب [[include: { orders: true }]].

و [[@map]] و [[@@map]] بيخلّوا الأسماء في TypeScript زي [[createdAt]] وفي القاعدة [[created_at]]، فالـ SQL الخام يفضل snake_case زي باقي التاب.`,
          example: R`model User {
  id        String   @id @default(uuid()) @db.Uuid
  email     String   @unique
  name      String
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz
  orders    Order[]

  @@map("users")
}

model Order {
  id        Int      @id @default(autoincrement())
  userId    String   @map("user_id") @db.Uuid
  user      User     @relation(fields: [userId], references: [id], onDelete: Restrict)
  status    String   @default("pending")
  total     Decimal  @default(0) @db.Decimal(10, 2)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz

  @@index([userId, createdAt(sort: Desc)])
  @@map("orders")
}`,
          try: R`حط الموديلين في الـ schema وشغّل [[migrate dev]]، وافتح [[migration.sql]] ودوّر على: الـ FOREIGN KEY وفيه ON DELETE إيه، والـ index المركّب، ونوع عمود total. وبعدين غيّر [[onDelete: Restrict]] لـ [[Cascade]] واعمل migration تانية واقرا الـ SQL بتاعها. وآخر حاجة: اعمل يوزر وأوردر ليه من الكود، وجرّب [[prisma.user.delete]] مع Restrict، واطبع [[e.code]].`,
          sol: R`في الـ migration الأولى هتلاقي [[CREATE TABLE "users"]] و [[CREATE TABLE "orders"]] بأسماء snake_case (بسبب [[@map]])، و [[CREATE INDEX "orders_user_id_created_at_idx" ON "orders"("user_id", "created_at" DESC)]]، و [[ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE]]، و total نوعه [[DECIMAL(10,2)]].

الـ migration التانية هتبقى [[DROP CONSTRAINT]] وبعده [[ADD CONSTRAINT]] بنفس الاسم بس [[ON DELETE CASCADE]]. وده بيوريك إن تغيير سطر في الـ schema ممكن يبقى أكتر من أمر SQL، فاقرا الملف قبل ما تعمله commit.

والمسح مع Restrict هيفشل، و [[e.code]] هيبقى [[P2003]] (Foreign key constraint violated on the constraint orders_user_id_fkey). في الـ error handler حوّله لـ 409 برسالة زي «اليوزر ده عنده أوردرات». ولو قريت الرسالة وملقيتش P2003، اتأكد إن الـ migration الأولى هي اللي متطبقة مش التانية.`,
          solCode: R`// src/try-delete.ts
import { prisma } from "./db";

const user = await prisma.user.create({
  data: { email: "ali@example.com", name: "Ali", orders: { create: { total: 250 } } },
});
try {
  await prisma.user.delete({ where: { id: user.id } });
} catch (e: any) {
  console.log(e.code);
}
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "الـ schema هو المصدر الوحيد للحقيقة: منه بتطلع الجداول في القاعدة، والـ types اللي بتحميك في الكود. أي غلطة فيه (FK من غير index، أو onDelete غلط، أو Float للفلوس) بتتحول لجدول غلط في الإنتاج، وتصليحها بعد ما يبقى فيه داتا أصعب بكتير.",
            how: R`الأنواع: [[String]] بيبقى [[text]]، و [[Int]] بيبقى [[integer]]، و [[BigInt]] بيبقى [[bigint]] (وبيرجع JavaScript bigint، ودي مبتتحولش JSON لوحدها)، و [[Decimal]] بيبقى [[numeric]] (وبيرجع object من نوع Decimal مش number، درس numeric للفلوس)، و [[DateTime]] بيبقى timestamp. و [[@db.Timestamptz]] و [[@db.Uuid]] و [[@db.Decimal(10, 2)]] بيحددوا النوع الـ native بالظبط. من غيرهم DateTime بيبقى [[timestamp(3)]] من غير tz، ودي المشكلة اللي في درس أنواع الأعمدة.

[[@id]] الـ primary key، و [[@@id([a, b])]] مفتاح مركّب. [[@default(uuid())]] الـ id بيتولّد من الـ client، و [[@default(dbgenerated("gen_random_uuid()"))]] بيخلي القاعدة هي اللي تولّده. [[@unique]] و [[@@unique([a, b])]] بيعملوا unique constraint.

[[@relation(fields: [userId], references: [id])]] بيتكتب في الناحية اللي فيها العمود. [[onDelete]]: [[Cascade]] و [[Restrict]] و [[SetNull]] (العمود لازم يبقى optional بـ [[?]]) و [[NoAction]]. الافتراضي لو العلاقة إجبارية [[Restrict]]، ولو optional [[SetNull]]. نفس معاني درس ON DELETE في المستوى التاني.

مهم: Prisma على Postgres مش بيعمل index لوحده على عمود الـ FK. [[@@index([userId])]] انت اللي بتكتبه. والـ index المركّب [[(userId, createdAt DESC)]] بيخدم «أوردرات يوزر مترتبة بالأحدث» زي درس composite index.

[[status String]] ولا [[enum]]؟ الـ enum في Prisma بيبقى [[CREATE TYPE ... AS ENUM]] في Postgres، وده صعب تشيل منه قيمة بعدين. كتير من الفرق بتفضّل String ومعاه CHECK في migration بإيدها، أو validation في الكود.`,
            when: "مع كل تغيير في الداتا: عدّل الـ schema، وشغّل migrate dev، واقرا الـ SQL، وبعدين commit للاتنين مع بعض. ولو القاعدة موجودة قبل Prisma: [[prisma db pull]] بيكتب الـ schema منها.",
            mistakes: R`[[Float]] للفلوس. [[DateTime]] من غير [[@db.Timestamptz]]. FK من غير [[@@index]]. [[onDelete: Cascade]] على علاقة فيها فلوس (مسح يوزر يمسح أوردراته وفواتيره). أسماء PascalCase من غير [[@@map]]، وبعدين تكتب SQL خام فتحتاج [["User"]] بتنصيص في كل حتة. [[@updatedAt]] وتفتكر إنه trigger في القاعدة: ده الـ client بيحطه، فالتعديل من psql مش بيحدّثه (درس CREATE TRIGGER). وفي الانترفيو: «ليه onDelete Restrict للأوردرات؟» عشان مسح يوزر بالغلط ميضيّعش تاريخ المبيعات، والأحسن soft delete.`
          },
          teach: R`## الفكرة: كل سطر في الـ model بيبقى سطر في [[CREATE TABLE]]

أسهل طريقة تفهم بيها الـ schema إنك تحطه جنب الـ SQL اللي Prisma طلّعه منه. حطينا الموديلين زي ما هما في المثال، وشغّلنا [[npx prisma migrate dev --name init]] (Prisma 7.10.0 على ويندوز، و PostgreSQL 18 في Docker)، وده الـ [[migration.sql]] اللي اتولّد:

~~~sql migration.sql
-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "total" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "orders_user_id_created_at_idx" ON "orders"("user_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
~~~

دلوقتي نمشي على الـ schema سطر سطر ونشاور على اللي طلع منه.

---

## ١. شكل السطر: اسم، نوع، attributes

~~~text
  email     String   @unique
  ───┬───   ──┬───   ───┬───
   الاسم    النوع    attributes (صفر أو أكتر، كل واحد أوله @)
~~~

- **الاسم** هو اللي هتكتبه في الكود: [[user.email]].
- **النوع** نوع Prisma ([[String]] و [[Int]] و [[DateTime]] ...)، ولو بعده [[?]] يبقى العمود يقبل NULL. من غير [[?]] يبقى [[NOT NULL]]، وده سبب إن كل الأعمدة في الـ SQL فوق [[NOT NULL]].
- **الـ attributes** بـ [[@]] بتخص العمود ده بس، وبـ [[@@]] (اتنين) بتخص الجدول كله وبتتكتب تحت.

---

## ٢. [[model User]]

~~~text
model User {
~~~

[[model]] = جدول. واسم الـ model بيبقى اسم الـ property في الـ client بحرف صغير: [[prisma.user]].

~~~text
  id        String   @id @default(uuid()) @db.Uuid
~~~

- [[@id]]: الـ primary key، وطلع [[CONSTRAINT "users_pkey" PRIMARY KEY ("id")]].
- [[@default(uuid())]]: لو مكتبتش id، يتعمل uuid جديد. خد بالك إن الـ SQL ملوش DEFAULT للعمود ده: الـ uuid **الـ client هو اللي بيولّده** ويبعته في الـ INSERT. وده باين في الـ log: [[INSERT INTO "public"."users" ("id","email","name","created_at") VALUES ($1,$2,$3,$4)]].
- [[@db.Uuid]]: نوع العمود في Postgres يبقى [[UUID]] مش [[TEXT]]. [[@db.]] معناها «النوع الـ native بتاع القاعدة بالظبط».

~~~text
  email     String   @unique
  name      String
~~~

[[@unique]] طلّع index منفصل: [[CREATE UNIQUE INDEX "users_email_key"]]. والاسم بيتكوّن من الجدول والعمود و [[key]]. و [[name]] مفيهوش attributes، فبقى [[TEXT NOT NULL]] وبس.

~~~text
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz
~~~

- [[@default(now())]]: طلع [[DEFAULT CURRENT_TIMESTAMP]] في القاعدة نفسها.
- [[@map("created_at")]]: اسم العمود في القاعدة [[created_at]]، وفي الكود [[createdAt]].
- [[@db.Timestamptz]]: [[TIMESTAMPTZ]]. من غيرها كان هيبقى [[TIMESTAMP(3)]] من غير timezone.

~~~text
  orders    Order[]
~~~

السطر ده ملوش أي أثر في [[CREATE TABLE "users"]]: دوّر عليه في الـ SQL مش هتلاقيه. [[Order[]]] يعني «list من Order»، وده الناحية التانية من العلاقة، موجود عشان تقدر تكتب [[include: { orders: true }]].

~~~text
  @@map("users")
}
~~~

[[@@map]] (على الجدول كله): اسم الجدول في القاعدة [[users]] بدل [[User]].

---

## ٣. [[model Order]]

~~~text
  id        Int      @id @default(autoincrement())
~~~

[[autoincrement()]] على [[Int]] طلع [[SERIAL]]: عمود integer وراه sequence بتدّي ١ و ٢ و ٣. هنا القاعدة هي اللي بتولّد الرقم، عكس الـ uuid.

~~~text
  userId    String   @map("user_id") @db.Uuid
  user      User     @relation(fields: [userId], references: [id], onDelete: Restrict)
~~~

السطرين دول هما العلاقة، وكل واحد ليه دور:

- [[userId]] العمود الحقيقي: [[user_id UUID NOT NULL]]. ونوعه لازم يطابق [[User.id]] بالظبط (الاتنين [[@db.Uuid]]).
- [[user User]] مش عمود. ده الـ relation field اللي بيخليك تكتب [[include: { user: true }]].
- [[@relation(fields: [userId], references: [id])]]: العمود [[userId]] هنا بيشاور على [[id]] هناك. ومنه طلع [[FOREIGN KEY ("user_id") REFERENCES "users"("id")]].
- [[onDelete: Restrict]]: طلع [[ON DELETE RESTRICT]]. يعني مسح يوزر عنده أوردرات مرفوض.
- و [[ON UPDATE CASCADE]] ده الافتراضي بتاع Prisma: لو الـ id بتاع اليوزر اتغيّر، الـ user_id في أوردراته يتغيّر معاه.

~~~text
  status    String   @default("pending")
  total     Decimal  @default(0) @db.Decimal(10, 2)
~~~

- [[status]]: [[TEXT NOT NULL DEFAULT 'pending']].
- [[total]]: [[DECIMAL(10,2)]]، يعني ١٠ أرقام إجمالًا منهم ٢ بعد العلامة (أكبر قيمة 99999999.99). و [[Decimal]] بيحسب بالظبط من غير أخطاء الـ float.

~~~text
  @@index([userId, createdAt(sort: Desc)])
  @@map("orders")
~~~

[[@@index]] على عمودين، والتاني مترتب تنازلي: طلع [[CREATE INDEX "orders_user_id_created_at_idx" ON "orders"("user_id", "created_at" DESC)]]. خد بالك إن Prisma بيكتب أسماء القاعدة ([[user_id]]) مع إنك كتبت أسماء الكود ([[userId]])، لأنه عارف الـ [[@map]].

### ملخص التحويل

| في الـ schema | في Postgres |
|---|---|
| [[String]] | [[TEXT]] |
| [[String @db.Uuid]] | [[UUID]] |
| [[Int @default(autoincrement())]] | [[SERIAL]] |
| [[Decimal @db.Decimal(10, 2)]] | [[DECIMAL(10,2)]] |
| [[DateTime @db.Timestamptz]] | [[TIMESTAMPTZ]] |
| من غير [[?]] | [[NOT NULL]] |
| [[@unique]] | [[CREATE UNIQUE INDEX ..._key]] |
| [[@relation(...)]] | [[FOREIGN KEY ... _fkey]] |
| [[Order[]]] | ولا حاجة (للكود بس) |

---

## ٤. الـ solCode: نجرّب الـ Restrict

~~~ts
const user = await prisma.user.create({
  data: { email: "ali@example.com", name: "Ali", orders: { create: { total: 250 } } },
});
~~~

[[create]] بيعمل صف، و [[data]] فيه القيم. و [[orders: { create: {...} }]] بيعمل أوردر مربوط باليوزر ده في نفس الأمر (درس nested writes). مكتبناش [[id]] ولا [[createdAt]] ولا [[status]] لأن ليهم defaults، ولا [[userId]] لأن Prisma بيحطه من اليوزر.

~~~ts
try {
  await prisma.user.delete({ where: { id: user.id } });
} catch (e: any) {
  console.log(e.code);
}
~~~

- [[delete({ where })]]: امسح صف واحد، و [[where]] لازم يكون على حقل unique.
- [[try / catch]]: لو الأمر رمى error نمسكه بدل ما السكربت يقع.
- [[e: any]]: بنقول لـ TypeScript «متدققش في نوع الـ error»، عشان نقدر نقرا [[e.code]].

~~~text الناتج (اتشغّل بـ npx tsx src/try-delete.ts)
prisma:query INSERT INTO "public"."users" ("id","email","name","created_at") VALUES ($1,$2,$3,$4) RETURNING "public"."users"."id"
prisma:query INSERT INTO "public"."orders" ("user_id","status","total","created_at") VALUES ($1,$2,$3,$4) RETURNING "public"."orders"."id"
prisma:query SELECT "public"."users"."id", "public"."users"."email", "public"."users"."name", "public"."users"."created_at" FROM "public"."users" WHERE "public"."users"."id" = $1 LIMIT $2 OFFSET $3
prisma:query COMMIT
prisma:error
Invalid $__btprisma.user.delete()$__bt invocation in
...
Foreign key constraint violated on the constraint: $__btorders_user_id_fkey$__bt
P2003
~~~

- أول ٤ سطور هي الـ [[create]]: INSERT لليوزر، و INSERT للأوردر، و SELECT يرجّع اليوزر، و [[COMMIT]] (الاتنين في transaction واحدة).
- [[prisma:error]] طلع لأن الـ client معمول بـ [[log: [..., "error"]]].
- [[P2003]] كود Prisma لـ «foreign key constraint violated». وأشهر أكواد هتقابلها: [[P2002]] (unique اتكسر) و [[P2003]] (FK) و [[P2025]] (الصف مش موجود).

---

## ٥. نغيّر لـ [[Cascade]] ونقرا الـ migration

غيّرنا [[onDelete: Restrict]] لـ [[onDelete: Cascade]] وشغّلنا [[npx prisma migrate dev --name cascade]]:

~~~sql 20261007085214_cascade/migration.sql
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
~~~

كلمة واحدة في الـ schema بقت أمرين: Postgres مفيهوش «عدّل الـ ON DELETE بتاع FK موجود»، فلازم يتشال ويتعمل تاني. ولو الجدول كبير، الـ ADD CONSTRAINT بيعدّي على كل الصفوف يتأكد منها، فاقرا الملف قبل ما تعمله commit.

---

## الخلاصة

- كل field = عمود، إلا الـ relation fields ([[user User]] و [[orders Order[]]]): دول للكود بس.
- الـ FK بيتكتب في الناحية اللي فيها العمود الحقيقي، بـ [[@relation(fields, references)]].
- [[@map]] و [[@@map]] = أسماء snake_case في القاعدة، و [[@db.*]] = النوع الـ native بالظبط.
- [[@default(uuid())]] بيتولّد في الـ client، و [[autoincrement()]] و [[now()]] في القاعدة.
- Restrict بيرمي [[P2003]]، واقرا [[migration.sql]] بعد أي تغيير.`,
          lines: [
            "model User = جدول.",
            "id نص بيتخزن uuid، وبيتولّد لوحده.",
            "الإيميل unique.",
            "الاسم إجباري (من غير ? يعني NOT NULL).",
            "createdAt في الكود، و created_at في القاعدة، ونوعه timestamptz.",
            "الناحية التانية من العلاقة: مالهاش عمود، بس بتخليك تعمل include للأوردرات.",
            "اسم الجدول في القاعدة users.",
            "قفلة.",
            "model Order.",
            "id رقم متسلسل.",
            "العمود الحقيقي للـ FK: user_id في القاعدة.",
            "العلاقة: userId بيشاور على User.id، ومسح يوزر عنده أوردرات مرفوض.",
            "الحالة نص، وافتراضيًا pending.",
            "الفلوس Decimal(10,2)، مش Float.",
            "وقت الإنشاء timestamptz.",
            "index مركّب: أوردرات اليوزر بالأحدث.",
            "اسم الجدول orders.",
            "قفلة."
          ]
        },
        {
          cmd: "علاقات Prisma",
          title: "one-to-many و many-to-many: implicit ولا explicit join table",
          desc: R`one-to-many اتشرحت في الدرس اللي فات: FK في ناحية، و [[Model[]]] في الناحية التانية.

many-to-many في Prisma ليها طريقتين:

implicit: بتكتب [[tags Tag[]]] في Product و [[products Product[]]] في Tag، و Prisma بيعمل جدول ربط لوحده اسمه [[_ProductToTag]] بعمودين [[A]] و [[B]]، ومبتشوفوش في الكود خالص.

explicit: بتعمل انت model للربط، زي [[OrderItem]] بين Order و Product. ده لازم لما الربط نفسه ليه داتا: الكمية وسعر الوحدة وقت الشرا. وده نفس جدول order_items في درس many-to-many في المستوى التاني.

القاعدة: لو الربط ممكن يحتاج أي عمود في يوم من الأيام (وقت الإضافة، مين ضافه، ترتيب)، ابدأ explicit. التحويل من implicit لـ explicit بعدين migration مش لطيفة.`,
          example: R`model Product {
  id    Int         @id @default(autoincrement())
  name  String
  price Decimal     @db.Decimal(10, 2)
  stock Int         @default(0)
  items OrderItem[]
  tags  Tag[]

  @@map("products")
}

model OrderItem {
  orderId   Int     @map("order_id")
  productId Int     @map("product_id")
  quantity  Int
  unitPrice Decimal @map("unit_price") @db.Decimal(10, 2)
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])

  @@id([orderId, productId])
  @@index([productId])
  @@map("order_items")
}

model Tag {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  products Product[]

  @@map("tags")
}`,
          try: R`ضيف الموديلات دي، وضيف في Order السطر [[items OrderItem[]]]. شغّل migrate dev واقرا الـ SQL: الجدول الـ implicit اسمه إيه وأعمدته إيه وعليه إيه؟ وبعدين من الكود: اعمل منتج بتاجين، وشيل تاج منه بـ [[disconnect]]، وهات المنتجات اللي فيها تاج معين.`,
          sol: R`في الـ SQL هتلاقي [[CREATE TABLE "_ProductToTag" ("A" INTEGER NOT NULL, "B" INTEGER NOT NULL, CONSTRAINT "_ProductToTag_AB_pkey" PRIMARY KEY ("A","B"))]] و [[CREATE INDEX "_ProductToTag_B_index"]]، واتنين FOREIGN KEY بـ [[ON DELETE CASCADE]]. [[A]] بيشاور على الموديل اللي اسمه أول أبجديًا (Product) و [[B]] على التاني (Tag). يعني الأسماء مش واضحة لو كتبت SQL خام عليه، وده من أسباب إن ناس كتير بتفضّل explicit.

ومن الكود: [[tags: { connectOrCreate: [...] }]] وقت الإنشاء، و [[tags: { disconnect: { name: "kitchen" } }]] في update بيمسح صف الربط بس (التاج نفسه بيفضل موجود)، و [[where: { tags: { some: { name: "kitchen" } } }]] بيجيب المنتجات اللي فيها التاج.

لو الـ migrate اشتكى إن Order ناقصه العلاقة التانية ([[The relation field order on model OrderItem is missing an opposite relation field]])، يبقى نسيت [[items OrderItem[]]] في Order. كل علاقة في Prisma لازم يكون ليها الناحيتين.`,
          solCode: R`import { prisma } from "./db";

const tag = (name: string) => ({ where: { name }, create: { name } });
const mug = await prisma.product.create({
  data: { name: "Mug", price: 120, stock: 15, tags: { connectOrCreate: [tag("kitchen"), tag("gift")] } },
  include: { tags: true },
});
console.log(mug.tags.map((t) => t.name));

await prisma.product.update({ where: { id: mug.id }, data: { tags: { disconnect: { name: "gift" } } } });

const kitchen = await prisma.product.findMany({
  where: { tags: { some: { name: "kitchen" } } },
  select: { name: true },
});
console.log(kitchen);
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "تقريبًا كل مشروع فيه many-to-many: منتجات وتاجات، وطلاب وكورسات، ويوزرز وأدوار. والاختيار بين implicit و explicit بيتعمل في أول يوم، وبيفرق جدًا بعد سنة لما حد يطلب «امتى الطالب اشترك في الكورس؟» ومفيش مكان تخزن فيه التاريخ.",
            how: R`الـ implicit: Prisma بيدير جدول [[_AToB]] بالكامل. [[connect]] بيضيف صف فيه، و [[disconnect]] بيمسحه، و [[set: [...]]] بيستبدل كل الروابط. والـ include بيعدّي عليه لوحده: [[include: { tags: true }]] بيرجّع التاجات على طول.

الـ explicit: جدول عادي وليه model، والمفتاح غالبًا مركّب [[@@id([orderId, productId])]] (فمينفعش نفس المنتج يتكرر في نفس الأوردر). والـ include بيبقى مستويين: [[include: { items: { include: { product: true } } }]]. وبتضيف وتشيل بـ [[create]] و [[delete]] على الـ OrderItem نفسه.

الـ [[@@index([productId])]]: الـ primary key [[(orderId, productId)]] بيخدم البحث بـ orderId (أول عمود)، بس البحث بـ productId لوحده («المنتج ده اتباع في أنهي أوردرات») محتاج index تاني. نفس فكرة درس composite index. في الـ implicit، Prisma بيعمل index على B لوحده.

[[onDelete: Cascade]] من OrderItem لـ Order: مسح الأوردر بيمسح بنوده. ومن غير onDelete لـ Product، يعني Restrict: مينفعش تمسح منتج اتباع قبل كده. ودي نفس قرارات درس ON DELETE.

وفيه كمان self-relation (يوزر بيتابع يوزر، أو موظف ومديره): العلاقة على نفس الـ model، ومحتاجة اسم [[@relation("Manager")]] على الناحيتين عشان Prisma يفرّق بينهم.`,
            when: "implicit: ربط بسيط مش هيحتاج أي بيانات إضافية ومش هتكتب عليه SQL خام كتير (تاجات، وفئات). explicit: أي حاجة فيها كمية، أو سعر، أو تاريخ، أو دور، أو ترتيب (بنود أوردر، واشتراك في كورس، وعضوية في فريق بدور).",
            mistakes: R`implicit لبنود الأوردر فمفيش مكان للكمية. تنسى الناحية التانية من العلاقة فالـ schema ميتعملوش validate. explicit من غير unique على الزوج، فنفس المنتج يتضاف مرتين. تكتب SQL خام على [[_ProductToTag]] وتنسى إن A و B بيتحددوا بالترتيب الأبجدي. وفي الانترفيو: «إزاي بتعمل many-to-many في قاعدة relational؟» جدول وسيط فيه FK للطرفين ومفتاح مركّب، والـ ORM بيخفيه بس هو موجود.`
          },
          teach: R`## الفكرة: علاقتين many-to-many في نفس الـ schema، واحدة بإيدك وواحدة Prisma بيعملها

في المثال فيه نوعين ربط:

- **Order ⇄ Product** عن طريق [[OrderItem]]: جدول ربط انت كاتبه (explicit) لأن فيه كمية وسعر.
- **Product ⇄ Tag**: مفيش model للربط خالص (implicit)، و Prisma بيعمل الجدول لوحده.

كل اللي تحت اتشغّل بـ Prisma 7.10.0 على ويندوز، و PostgreSQL 18 في Docker، فوق موديلات User و Order من الدرس اللي فات.

---

## ١. [[model Product]]

~~~text
model Product {
  id    Int         @id @default(autoincrement())
  name  String
  price Decimal     @db.Decimal(10, 2)
  stock Int         @default(0)
~~~

نفس الحاجات اللي في الدرس اللي فات: id متسلسل ([[SERIAL]])، واسم، وسعر [[DECIMAL(10,2)]]، ومخزون [[INTEGER]] افتراضيًا صفر.

~~~text
  items OrderItem[]
  tags  Tag[]
~~~

السطرين دول relation fields، مالهمش أعمدة في [[products]]:

- [[items OrderItem[]]]: كل بنود الأوردرات اللي فيها المنتج ده. الناحية التانية من [[OrderItem.product]].
- [[tags Tag[]]]: list من Tag. ولما Prisma يلاقي [[Tag[]]] هنا و [[Product[]]] في Tag، ومفيش [[@relation(fields...)]] في أي ناحية، بيفهم إنها many-to-many implicit.

---

## ٢. [[model OrderItem]]: جدول الربط الـ explicit

~~~text
model OrderItem {
  orderId   Int     @map("order_id")
  productId Int     @map("product_id")
~~~

عمودين FK: واحد للأوردر وواحد للمنتج. ونوعهم [[Int]] لأن [[Order.id]] و [[Product.id]] أرقام.

~~~text
  quantity  Int
  unitPrice Decimal @map("unit_price") @db.Decimal(10, 2)
~~~

ودي «داتا الربط نفسه»، السبب اللي خلانا نكتب الجدول بإيدنا. [[unitPrice]] سعر الوحدة **وقت الشرا**: لو سعر المنتج اتغيّر بكرة، الأوردرات القديمة تفضل بسعرها.

~~~text
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
~~~

علاقتين one-to-many عاديتين زي [[Order.user]] بالظبط:

- [[order]]: [[orderId]] بيشاور على [[Order.id]]، و [[onDelete: Cascade]] = مسح أوردر يمسح بنوده.
- [[product]]: من غير [[onDelete]]، فالافتراضي للعلاقة الإجبارية [[Restrict]] (هتشوفه في الـ SQL).

~~~text
  @@id([orderId, productId])
  @@index([productId])
  @@map("order_items")
}
~~~

- [[@@id([orderId, productId])]]: مفيش [[@id]] على عمود لوحده، المفتاح هو الاتنين مع بعض. يعني نفس المنتج مرة واحدة بس في نفس الأوردر.
- [[@@index([productId])]]: الـ primary key بيبدأ بـ [[order_id]]، فبيخدم «بنود أوردر ٥» بس مش «المنتج ٣ اتباع فين». ده index للسؤال التاني.

---

## ٣. [[model Tag]]

~~~text
model Tag {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  products Product[]

  @@map("tags")
}
~~~

[[name @unique]] مهم هنا: عشان تقدر تعمل [[connect]] و [[disconnect]] و [[connectOrCreate]] بالاسم ([[{ name: "kitchen" }]])، لازم يكون حقل unique. و [[products Product[]]] الناحية التانية من [[Product.tags]].

---

## ٤. لو نسيت الناحية التانية

قبل ما نضيف [[items OrderItem[]]] في Order، شغّلنا [[npx prisma migrate dev --name products]]:

~~~text الناتج
Error: Prisma schema validation - (validate wasm)
Error code: P1012
error: Error validating field $__btorder$__bt in model $__btOrderItem$__bt: The relation field $__btorder$__bt on model $__btOrderItem$__bt is missing an opposite relation field on the model $__btOrder$__bt. Either run $__btprisma format$__bt or add it manually.
  -->  prisma\schema.prisma:53
~~~

يعني: [[OrderItem.order]] بيشاور على Order، بس Order مفيهوش field من نوع [[OrderItem[]]]. Prisma بيطلب الناحيتين دايمًا. والرسالة بتقترح [[prisma format]]: الأمر ده بيرتّب الملف وبيضيف الناحية الناقصة لوحده.

ضفنا في Order:

~~~text
  items     OrderItem[]
~~~

وشغّلنا تاني، فاتعمل [[20261007085453_products/migration.sql]].

---

## ٥. الـ SQL اللي طلع (المهم منه)

~~~sql جدول الربط الـ explicit
CREATE TABLE "order_items" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_id","product_id")
);
CREATE INDEX "order_items_product_id_idx" ON "order_items"("product_id");
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
~~~

كل سطر في الـ model ليه مقابل: المفتاح المركّب، والـ index، و CASCADE للأوردر، و RESTRICT للمنتج (الافتراضي).

~~~sql جدول الربط الـ implicit (محدش كتبه)
CREATE TABLE "_ProductToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductToTag_AB_pkey" PRIMARY KEY ("A","B")
);
CREATE INDEX "_ProductToTag_B_index" ON "_ProductToTag"("B");
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
~~~

- الاسم [[_ProductToTag]]: شرطة تحتية، والموديلين بالترتيب الأبجدي. ومش متأثر بـ [[@@map]].
- [[A]] = أول موديل أبجديًا (Product)، و [[B]] = التاني (Tag).
- نفس فكرة الـ explicit: مفتاح مركّب [[(A, B)]] و index على التاني [[B]]. بس الـ FKs الاتنين [[CASCADE]]: مسح منتج أو تاج بيمسح صفوف الربط بتاعته بس.

---

## ٦. الـ solCode سطر سطر

~~~ts
const tag = (name: string) => ({ where: { name }, create: { name } });
~~~

دالة صغيرة بترجّع الشكل اللي [[connectOrCreate]] عايزه: [[where]] يدوّر بيه، و [[create]] يعمل بيه لو ملقاش. و [[{ name }]] اختصار لـ [[{ name: name }]].

~~~ts
const mug = await prisma.product.create({
  data: { name: "Mug", price: 120, stock: 15, tags: { connectOrCreate: [tag("kitchen"), tag("gift")] } },
  include: { tags: true },
});
console.log(mug.tags.map((t) => t.name));
~~~

اعمل منتج، واربطه بتاجين (يتعملوا لو مش موجودين)، ورجّعه ومعاه التاجات. والـ log:

~~~text الناتج
prisma:query INSERT INTO "public"."products" ("name","price","stock") VALUES ($1,$2,$3) RETURNING "public"."products"."id"
prisma:query SELECT "public"."tags"."id" FROM "public"."tags" WHERE ("public"."tags"."name" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query INSERT INTO "public"."tags" ("name") VALUES ($1) RETURNING "public"."tags"."id"
prisma:query INSERT INTO "public"."_ProductToTag" ("A","B") VALUES ($1,$2) ON CONFLICT DO NOTHING
prisma:query SELECT "public"."tags"."id" FROM "public"."tags" WHERE ("public"."tags"."name" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query INSERT INTO "public"."tags" ("name") VALUES ($1) RETURNING "public"."tags"."id"
prisma:query INSERT INTO "public"."_ProductToTag" ("A","B") VALUES ($1,$2) ON CONFLICT DO NOTHING
prisma:query SELECT ... FROM "public"."products" WHERE "public"."products"."id" = $1 LIMIT $2 OFFSET $3
prisma:query SELECT "public"."tags"."id", "public"."tags"."name", "t0"."A" AS "ProductToTag@Product" FROM "public"."tags" INNER JOIN "public"."_ProductToTag" AS "t0" ON "t0"."B" = "public"."tags"."id" WHERE (1=1 AND "t0"."A" = $1) OFFSET $2
prisma:query COMMIT
[ 'kitchen', 'gift' ]
~~~

اقراه كده: INSERT للمنتج. وبعدين لكل تاج: SELECT يدوّر عليه بالاسم، ملقاهوش فـ INSERT، وبعدين صف في [[_ProductToTag]] بـ [[ON CONFLICT DO NOTHING]] (لو الربط موجود متعملش error). وفي الآخر الـ include: SELECT للتاجات بـ JOIN على جدول الربط. وكله في transaction واحدة خلصت بـ [[COMMIT]].

~~~ts
await prisma.product.update({ where: { id: mug.id }, data: { tags: { disconnect: { name: "gift" } } } });
~~~

[[disconnect]] بيفك الربط بس:

~~~text الناتج (السطر المهم)
prisma:query DELETE FROM "public"."_ProductToTag" WHERE ("public"."_ProductToTag"."A" = ($1) AND "public"."_ProductToTag"."B" IN ($2))
~~~

DELETE من جدول الربط، مش من [[tags]]. وبعد السكربت، في psql:

~~~text الناتج
 A | B
---+---
 1 | 1

 id |  name
----+---------
  1 | kitchen
  2 | gift
~~~

التاج [[gift]] لسه موجود في [[tags]]، بس مبقاش مربوط بالمنتج.

~~~ts
const kitchen = await prisma.product.findMany({
  where: { tags: { some: { name: "kitchen" } } },
  select: { name: true },
});
~~~

«المنتجات اللي ليها تاج واحد على الأقل اسمه kitchen» ([[some]] متشرحة في درس relation filters):

~~~text الناتج
prisma:query SELECT "public"."products"."id", "public"."products"."name" FROM "public"."products" WHERE EXISTS(SELECT "t0"."A" FROM "public"."_ProductToTag" AS "t0" INNER JOIN "public"."tags" AS "j0" ON ("j0"."id") = ("t0"."B") WHERE ("j0"."name" = $1 AND ("public"."products"."id") = ("t0"."A") AND "t0"."A" IS NOT NULL)) OFFSET $2
[ { name: 'Mug' } ]
~~~

استعلام واحد بـ [[EXISTS]]، و [[_ProductToTag]] مستخبي جواه.

---

## الخلاصة

| | implicit | explicit |
|---|---|---|
| بتكتب | [[Tag[]]] و [[Product[]]] بس | model كامل بـ 2 FK |
| الجدول | [[_ProductToTag]] بعمودين [[A]] و [[B]] | اسمك انت ([[order_items]]) |
| داتا زيادة على الربط | مستحيل | أي عمود |
| الربط والفك | [[connect]] / [[disconnect]] / [[set]] | [[create]] / [[delete]] على الـ model |

- كل علاقة لازم ليها الناحيتين، وإلا [[P1012]].
- الـ explicit بمفتاح مركّب و index على العمود التاني.
- لو شاكك إن الربط هيحتاج عمود في يوم، ابدأ explicit.`,
          lines: [
            "model Product.",
            "id متسلسل.",
            "الاسم.",
            "السعر Decimal.",
            "المخزون.",
            "بنود الأوردرات اللي فيها المنتج (ناحية الـ explicit).",
            "التاجات: many-to-many implicit، Prisma بيعمل جدول الربط لوحده.",
            "الجدول products.",
            "قفلة.",
            "جدول الربط explicit: بند في أوردر.",
            "عمود الأوردر.",
            "عمود المنتج.",
            "الكمية: داتا خاصة بالربط نفسه.",
            "سعر الوحدة وقت الشرا.",
            "العلاقة بالأوردر، ومسح الأوردر يمسح بنوده.",
            "العلاقة بالمنتج، ومسح منتج اتباع مرفوض (Restrict).",
            "مفتاح مركّب: المنتج مرة واحدة في كل أوردر.",
            "index للبحث بالمنتج لوحده.",
            "الجدول order_items.",
            "قفلة.",
            "model Tag.",
            "id.",
            "اسم التاج unique (عشان connectOrCreate بالاسم).",
            "الناحية التانية من الـ many-to-many.",
            "الجدول tags.",
            "قفلة."
          ]
        },
        {
          cmd: "include و select",
          title: "هات العلاقات والحقول اللي محتاجها بس",
          desc: R`[[findMany]] من غير حاجة بيرجّع كل أعمدة الجدول ومن غير أي علاقات.

[[include]] بيضيف علاقات فوق كل الأعمدة: [[include: { user: true }]] يرجّع الأوردر كامل ومعاه اليوزر كامل.

[[select]] بيحدد بالظبط إيه اللي يرجع، أعمدة وعلاقات، ولأي عمق: [[select: { id: true, user: { select: { email: true } } }]]. والـ type اللي بيرجع بيتغير على حسب اللي اخترته، فلو حاولت تقرا حاجة مطلبتهاش، TypeScript هيقولك قبل ما تشغّل.

القاعدة: في الـ API استخدم select. الأسرع (أعمدة أقل)، والأأمن (مفيش [[passwordHash]] بيتسرّب في رد)، والرد شكله ثابت. ومينفعش select و include في نفس المستوى، بس ينفع include جوه select أو العكس في مستوى أعمق.`,
          example: R`const orders = await prisma.order.findMany({
  where: { status: "pending" },
  orderBy: { createdAt: "desc" },
  take: 20,
  select: {
    id: true,
    total: true,
    user: { select: { email: true } },
    items: { select: { quantity: true, product: { select: { name: true } } } },
  },
});

const order = await prisma.order.findUnique({
  where: { id: 1 },
  include: { user: true, items: { include: { product: true } } },
});

const user = await prisma.user.findUnique({
  where: { email: "ali@example.com" },
  include: { orders: { where: { status: "paid" }, orderBy: { createdAt: "desc" }, take: 3 } },
});`,
          try: R`شغّل الاستعلام الأول والتاني و [[log: ["query"]]] شغال، وعدّ كام SQL اتبعت لكل واحد وإيه الأعمدة اللي اتطلبت. وبعدين حاول في الاستعلام الأول تقرا [[orders[0].status]] وشوف TypeScript قال إيه. وجرّب تحط select و include مع بعض في نفس المستوى.`,
          sol: R`الاستعلام الأول هيطلّع كذا SQL (واحد للأوردرات، وواحد لليوزرز، وواحد للبنود، وواحد للمنتجات)، وكل واحد فيه [[WHERE ... IN ($1, $2, ...)]] بالـ ids اللي جات من اللي قبله، مش استعلام لكل أوردر. وفي SELECT هتلاقي الأعمدة اللي طلبتها بس، ومعاها الـ ids اللي Prisma محتاجها عشان يربط النتايج ببعض.

التاني نفس عدد الاستعلامات بس بـ [[SELECT]] لكل الأعمدة في كل جدول.

[[orders[0].status]]: TypeScript هيطلّع [[Property 'status' does not exist on type]]، لأن الـ type اتبنى من الـ select. ده بيمنعك تعتمد على حقل مش جاي. ولو بتكتب JavaScript من غير types، القيمة هتبقى [[undefined]] من غير أي error، وده بيبقى bug صعب تلاقيه.

و select مع include في نفس المستوى: [[Please either use include or select, but not both at the same time]]. لو محتاج أعمدة معينة وعلاقة: select للأعمدة، وجواه [[user: { select: {...} }]] أو [[user: true]].`,
          solCode: R`// نفس الـ client بـ log: ["query"]
const orders = await prisma.order.findMany({
  where: { status: "pending" },
  select: { id: true, total: true, user: { select: { email: true } } },
});
console.log(orders[0]?.total.toString());

await prisma.order.findMany({ select: { id: true }, include: { user: true } } as any)
  .catch((e) => console.log(e.message.split("\n").at(-1)));`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل الأداء مع ORM بتيجي من إنه بيجيب أكتر من اللازم: كل الأعمدة (ومنها jsonb تقيل أو نص طويل) وعلاقات مش محتاجها. وأغلب تسريبات البيانات في APIs بتيجي من [[res.json(user)]] على object فيه hash الباسورد أو توكن. select بيحل الاتنين من نفس المكان.",
            how: R`Prisma 7 بيطلّع لكل مستوى من العلاقات استعلام منفصل بـ [[IN]] (زي اللي بتشوفه في الـ log). يعني include بـ ٣ مستويات = ٤ استعلامات، مهما كان عدد الصفوف. ده مش N+1: عدد الاستعلامات ثابت. بس لو المستوى الأول رجّع ١٠ آلاف صف، الـ [[IN]] بتاع المستوى التاني هيبقى فيه ١٠ آلاف قيمة، فخلي [[take]] دايمًا موجود.

جوه include أو select لعلاقة many، تقدر تكتب [[where]] و [[orderBy]] و [[take]] و [[skip]] للأولاد بس: «آخر ٣ أوردرات مدفوعة». وده بيطبّق الـ take على كل أب لوحده في النتيجة.

والأنواع: [[Decimal]] بيرجع object ([[Prisma.Decimal]])، فـ [[JSON.stringify]] بيحوّله string زي [["250"]]، و [[BigInt]] بيوقّع JSON.stringify خالص. و [[DateTime]] بيرجع Date.

ولو نفس الـ select بيتكرر، اعمله ثابت واحد: [[const orderListSelect = { id: true, total: true } satisfies Prisma.OrderSelect]]، واستخدم [[Prisma.OrderGetPayload<{ select: typeof orderListSelect }>]] عشان تجيب الـ type بتاع النتيجة.

وفيه [[omit]] (موجود في Prisma من 6.2): [[omit: { passwordHash: true }]] على الـ query، أو على مستوى الـ client كله، بيرجّع كل الأعمدة ماعدا دي. مفيد لما الأعمدة كتير والممنوع حاجة واحدة.`,
            when: "select في كل endpoint بيرجّع داتا للعميل. include في الكود الداخلي (سكربتات، و jobs، و tests) لما محتاج الـ object كامل. و omit لما فيه عمود حساس لازم ميطلعش أبدًا من غير ما تعدّ باقي الأعمدة.",
            mistakes: R`[[include: { user: true }]] في رد API فالـ hash يطلع. include متداخل ٤ مستويات من غير take فيرجع ميجات. [[findMany]] من غير take على جدول بيكبر. [[JSON.stringify]] على نتيجة فيها BigInt. وتفتكر إن include بيعمل JOIN واحد، وهو في الحقيقة استعلام لكل مستوى. وفي الانترفيو: «إيه الفرق بين include و select في Prisma؟» include بيضيف علاقات فوق كل الأعمدة، و select بيحدد كل حاجة بالظبط وبيغيّر الـ type.`
          },
          teach: R`## الفكرة: انت بتوصف شكل الـ object اللي عايزه، و Prisma بيحوّله SQL

في الـ 3 استعلامات اللي في المثال، انت مش بتكتب JOIN ولا أسماء أعمدة. بتكتب object شكله زي شكل النتيجة اللي عايزها، و Prisma بيطلّع منه كام SELECT.

اتشغّلوا بـ Prisma 7.10.0 على ويندوز، و PostgreSQL 18 في Docker، على داتا تجربة: ٥ يوزرز، و ١٠ أوردرات (منهم ٢ [[pending]])، و ٣ منتجات (Mug و Cap و Pan). والـ client معمول بـ [[log: ["query"]]] عشان نشوف الـ SQL.

---

## ١. الاستعلام الأول: [[findMany]] بـ [[select]]

نفكّه حتة حتة:

~~~ts
const orders = await prisma.order.findMany({
~~~

[[prisma.order]] = جدول [[orders]]، و [[findMany]] = هات صفوف كتير (array). ومن غير أي حاجة جواه بيرجّع كل الصفوف بكل الأعمدة.

~~~ts
  where: { status: "pending" },
  orderBy: { createdAt: "desc" },
  take: 20,
~~~

- [[where]]: الفلتر. [[{ status: "pending" }]] = [[WHERE status = 'pending']].
- [[orderBy]]: الترتيب، و [[desc]] = تنازلي (الأحدث الأول).
- [[take: 20]]: أول ٢٠ بس، وبيبقى [[LIMIT]].

~~~ts
  select: {
    id: true,
    total: true,
~~~

[[select]] = «رجّع دول بس». كل عمود عايزه تكتبه [[: true]]. اللي مكتبتوش مش هيرجع.

~~~ts
    user: { select: { email: true } },
~~~

[[user]] هنا مش عمود، دي العلاقة. وبدل [[true]] (اللي معناها هات اليوزر كله) كتبنا select تاني جواها: من اليوزر هات الإيميل بس.

~~~ts
    items: { select: { quantity: true, product: { select: { name: true } } } },
~~~

نفس الفكرة مستويين: البنود، ومن كل بند الكمية، ومن منتج البند الاسم.

### الـ SQL اللي اتبعت

~~~text الناتج
prisma:query SELECT "public"."orders"."id", "public"."orders"."total", "public"."orders"."user_id" FROM "public"."orders" WHERE "public"."orders"."status" = $1 ORDER BY "public"."orders"."created_at" DESC LIMIT $2 OFFSET $3
prisma:query SELECT "public"."users"."id", "public"."users"."email" FROM "public"."users" WHERE "public"."users"."id" IN ($1,$2) OFFSET $3
prisma:query SELECT "public"."order_items"."order_id", "public"."order_items"."product_id", "public"."order_items"."quantity" FROM "public"."order_items" WHERE "public"."order_items"."order_id" IN ($1,$2) OFFSET $3
prisma:query SELECT "public"."products"."id", "public"."products"."name" FROM "public"."products" WHERE "public"."products"."id" IN ($1) OFFSET $2
~~~

٤ استعلامات، واحد لكل مستوى:

1. الأوردرات: [[id]] و [[total]] اللي طلبناهم، ومعاهم [[user_id]] اللي مطلبناهوش. Prisma محتاجه عشان يعرف كل أوردر يوزره مين.
2. اليوزرز: [[WHERE id IN ($1,$2)]]، يعني الـ ids اللي رجعت في الخطوة ١، كلهم في استعلام واحد.
3. البنود: [[WHERE order_id IN ($1,$2)]] لنفس الأوردرين.
4. المنتجات: [[IN ($1)]]، منتج واحد بس لأن البنود كلها كانت لنفس المنتج.

وبعدين Prisma بيركّب النتايج في JavaScript:

~~~text النتيجة (JSON.stringify)
[
 { "id": 8, "total": "80",  "user": { "email": "mona@example.com" }, "items": [] },
 { "id": 5, "total": "120", "user": { "email": "ali@example.com" },
   "items": [ { "quantity": 1, "product": { "name": "Mug" } } ] }
]
~~~

- شكل النتيجة نفس شكل الـ select بالظبط.
- أوردر ٨ ملوش بنود فرجع [[items: []]] (array فاضية مش null).
- [[total]] طلع [["80"]] نص. ده [[Decimal]]، و [[JSON.stringify]] بيحوّله string عشان ميضيعش دقة.

---

## ٢. الاستعلام التاني: [[findUnique]] بـ [[include]]

~~~ts
const order = await prisma.order.findUnique({
  where: { id: 1 },
  include: { user: true, items: { include: { product: true } } },
});
~~~

- [[findUnique]]: صف واحد أو [[null]]، و [[where]] لازم يكون على حقل unique ([[id]] هنا).
- [[include]]: «كل الأعمدة، **وكمان** العلاقات دي». [[user: true]] = اليوزر كله، و [[items: { include: { product: true } }]] = البنود، وجوا كل بند المنتج كامل.

~~~text الناتج
prisma:query SELECT "public"."orders"."id", "public"."orders"."user_id", "public"."orders"."status", "public"."orders"."total", "public"."orders"."created_at" FROM "public"."orders" WHERE ("public"."orders"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query SELECT ... "public"."order_items"."unit_price" FROM "public"."order_items" WHERE "public"."order_items"."order_id" = $1 OFFSET $2
prisma:query SELECT "public"."users"."id", "public"."users"."email", "public"."users"."name", "public"."users"."created_at" FROM "public"."users" WHERE "public"."users"."id" = $1 OFFSET $2
prisma:query SELECT "public"."products"."id", "public"."products"."name", "public"."products"."price", "public"."products"."stock" FROM "public"."products" WHERE "public"."products"."id" IN ($1) OFFSET $2
~~~

نفس الـ ٤ استعلامات، بس كل واحد بيجيب كل الأعمدة. والنتيجة:

~~~text النتيجة
{
 "id": 1, "userId": "10e33f58-...", "status": "paid", "total": "450", "createdAt": "2026-07-03T10:00:00.000Z",
 "user": { "id": "10e33f58-...", "email": "sara@example.com", "name": "Sara", "createdAt": "2026-01-05T10:00:00.000Z" },
 "items": [ { "orderId": 1, "productId": 3, "quantity": 1, "unitPrice": "450",
              "product": { "id": 3, "name": "Pan", "price": "450", "stock": 5 } } ]
}
~~~

لو جدول users فيه [[passwordHash]]، كان هيبقى هنا. وده سبب القاعدة: include للكود الداخلي، select للرد على العميل.

---

## ٣. الاستعلام التالت: فلتر وترتيب و [[take]] على الأولاد

~~~ts
const user = await prisma.user.findUnique({
  where: { email: "ali@example.com" },
  include: { orders: { where: { status: "paid" }, orderBy: { createdAt: "desc" }, take: 3 } },
});
~~~

[[orders]] هنا بدل [[true]] أخد object فيه [[where]] و [[orderBy]] و [[take]]: دول بيتطبّقوا على أوردرات اليوزر ده بس، مش على اليوزرز.

~~~text الناتج
prisma:query SELECT ... FROM "public"."users" WHERE ("public"."users"."email" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query SELECT ... FROM "public"."orders" WHERE ("public"."orders"."status" = $1 AND "public"."orders"."user_id" = $2) ORDER BY "public"."orders"."created_at" DESC LIMIT $3 OFFSET $4
~~~

الشروط بتاعتنا ([[status]] و [[ORDER BY]] و [[LIMIT]]) راحت في استعلام الأوردرات بالظبط، ومعاها [[user_id = $2]]. وعلي عنده أوردرين (واحد pending وواحد paid)، فرجع المدفوع بس:

~~~text النتيجة (جزء)
"email": "ali@example.com",
"orders": [ { "id": 6, "status": "paid", "total": "1200", ... } ]
~~~

---

## ٤. الـ solCode: الـ types والـ error

~~~ts
console.log(orders[0]?.total.toString());
~~~

- [[?.]] (optional chaining): لو [[orders[0]]] مش موجود (array فاضية) رجّع [[undefined]] بدل ما يقع.
- [[total.toString()]]: [[total]] نوعه [[Decimal]]، و [[toString()]] بيرجّع الرقم كنص.

~~~text الناتج
120 object Decimal2
~~~

(ضفنا للتجربة [[typeof]] واسم الـ class عشان نتأكد: object من class اسمه [[Decimal2]] جوه Prisma، مش number.)

ولو حاولت تقرا عمود مطلبتهوش. جربنا ملف فيه:

~~~ts
const orders = await prisma.order.findMany({ select: { id: true, total: true } });
console.log(orders[0].status);
~~~

و [[npx tsc --noEmit]] (فحص types من غير ما يطلّع ملفات) قال:

~~~text الناتج
src/tserr.ts(3,23): error TS2339: Property 'status' does not exist on type '{ id: number; total: Decimal; }'.
~~~

الـ type اللي راجع اتبنى من الـ select نفسه: [[{ id: number; total: Decimal }]] وبس.

~~~ts
await prisma.order.findMany({ select: { id: true }, include: { user: true } } as any)
  .catch((e) => console.log(e.message.split("\n").at(-1)));
~~~

- [[as any]]: من غيرها TypeScript هيرفض الكود أصلًا. احنا عايزين نشوف رد Prisma نفسه وقت التشغيل.
- [[.catch(...)]]: نفس try/catch بس على الـ Promise.
- [[split("\n").at(-1)]]: الرسالة طويلة، قسّمها سطور وهات آخر سطر ([[at(-1)]] = آخر عنصر).

~~~text الناتج
Please either use $__btinclude$__bt or $__btselect$__bt, but not both at the same time.
~~~

---

## الخلاصة

| | من غير حاجة | [[include]] | [[select]] |
|---|---|---|---|
| الأعمدة | كلها | كلها | اللي كتبتها بس |
| العلاقات | ولا واحدة | اللي كتبتها | اللي كتبتها |
| الـ type | كل الأعمدة | الأعمدة + العلاقات | اللي كتبته بالظبط |

- كل مستوى علاقة = استعلام زيادة بـ [[IN (...)]]، مش استعلام لكل صف.
- جوه العلاقة تقدر تحط [[where]] و [[orderBy]] و [[take]] للأولاد.
- select في الـ API، و [[Decimal]] بيرجع object وبيتحوّل string في JSON.`,
          lines: [
            "قايمة أوردرات لصفحة الأدمن:",
            "الـ pending بس،",
            "الأحدث الأول،",
            "٢٠ بس.",
            "والحقول دي بالظبط:",
            "رقم الأوردر،",
            "والإجمالي،",
            "وإيميل صاحبه بس (مش كل بيانات اليوزر)،",
            "والبنود: الكمية واسم المنتج.",
            "قفلة الـ select.",
            "قفلة.",
            "صفحة أوردر واحد في الكود الداخلي:",
            "بالـ id،",
            "كل الأعمدة، ومعاها اليوزر كامل، والبنود وجوا كل بند المنتج كامل.",
            "قفلة.",
            "يوزر ومعاه:",
            "بالإيميل،",
            "آخر ٣ أوردرات مدفوعة ليه بس (فلتر وترتيب وحد على الأولاد).",
            "قفلة."
          ]
        },
        {
          cmd: "nested writes",
          title: "اعمل أوردر ببنوده في أمر واحد: create و connect و connectOrCreate",
          desc: R`بدل ما تعمل الأوردر وتاخد الـ id وبعدين تعمل البنود واحد واحد، Prisma بيخليك تكتب الأب والأولاد في أمر واحد، وبيحطهم في transaction واحدة: يا كلهم يتكتبوا، يا ولا حاجة.

جوه علاقة في [[data]] عندك:

[[create]] اعمل صف جديد مربوط (الأوردر ومعاه بنوده).

[[connect]] اربط بصف موجود بمفتاح unique ([[product: { connect: { id: 5 } }]]).

[[connectOrCreate]] اربط لو موجود، واعمله لو مش موجود (التاج بالاسم).

وفي update كمان: [[disconnect]] و [[set]] و [[update]] و [[delete]] و [[deleteMany]] على الأولاد.`,
          example: R`const user = await prisma.user.create({
  data: {
    email: "ali@example.com",
    name: "Ali",
    orders: {
      create: {
        total: 300,
        items: {
          create: [
            { product: { connect: { id: mugId } }, quantity: 1, unitPrice: 120 },
            { product: { connect: { id: capId } }, quantity: 1, unitPrice: 180 },
          ],
        },
      },
    },
  },
  include: { orders: { include: { items: true } } },
});

await prisma.product.update({
  where: { id: mugId },
  data: { tags: { connectOrCreate: [{ where: { name: "gift" }, create: { name: "gift" } }] } },
});

await prisma.order.update({
  where: { id: orderId },
  data: { items: { deleteMany: {}, create: [{ product: { connect: { id: mugId } }, quantity: 2, unitPrice: 120 }] } },
});`,
          try: R`اعمل يوزر بأوردر فيه بندين زي المثال و [[log: ["query"]]] شغال، وشوف الـ SQL: الكتابة كلها بتخلص بـ COMMIT واحد؟ وبعدين اعمله تاني بس خلّي بند منهم يشاور على [[id: 999999]] (منتج مش موجود): اليوزر اتعمل ولا لأ؟ وجرّب تكتب بند بـ [[productId: mugId]] والتاني بـ [[product: { connect: ... }]] في نفس الـ array.`,
          sol: R`في الـ log هتلاقي INSERT في users، و INSERT في orders، وقبل كل بند SELECT صغير بيتأكد إن المنتج موجود (ده الـ connect)، و INSERT في order_items، وبعدين الـ SELECTs بتاعة الـ include، وفي الآخر [[COMMIT]] واحد. يعني الكتابة كلها transaction واحدة (الـ BEGIN نفسه مش بيظهر في الـ log، بس الـ COMMIT والـ ROLLBACK بيظهروا).

مع المنتج اللي مش موجود هتاخد [[P2025]] (فيه سجل مطلوب للـ connect ملقاهوش)، وهتلاقي [[ROLLBACK]] في الـ log. و [[prisma.user.count()]] مش هيزيد: اليوزر والأوردر اترجعوا مع البند.

والخلط بين الشكلين في نفس الـ array هيطلع validation error زي [[Argument product is missing]]. Prisma عنده شكلين للـ input: «checked» بالعلاقات ([[product: { connect }]]) و «unchecked» بالـ ids الخام ([[productId]]). الشكل بيتحدد للـ create كله، فاختار واحد والتزم بيه. و [[productId]] لوحده (من غير connect) شغال عادي جوه الـ nested create، بس اللي مينفعش تكتبه هناك هو [[orderId]]: هيطلع [[Unknown argument orderId]]، لأن Prisma هو اللي بيحطه من الأوردر الأب.`,
          solCode: R`import { prisma } from "./db";

const before = await prisma.user.count();
try {
  await prisma.user.create({
    data: {
      email: "fail@example.com",
      name: "Fail",
      orders: { create: { total: 100, items: { create: [{ product: { connect: { id: 999999 } }, quantity: 1, unitPrice: 100 }] } } },
    },
  });
} catch (e: any) {
  console.log(e.code);
}
console.log(before === (await prisma.user.count()));
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "«اعمل أوردر ببنوده» هي أهم عملية في أي متجر، ولو اتكتبت خطوات منفصلة من غير transaction، أي error في النص بيسيب أوردر من غير بنود أو بنود من غير أوردر. الـ nested write بيدّيك الـ transaction ببلاش، والكود بيبان زي شكل الداتا.",
            how: R`Prisma بيحوّل الـ nested write لسلسلة INSERTs جوه transaction: الأب الأول عشان ياخد الـ id، وبعدين الأولاد بالـ id ده. عشان كده في nested create مبتكتبش [[orderId]] أبدًا.

[[connect]] محتاج حقل unique ([[id]] أو [[email]] أو [[@unique]] تاني). لو الصف مش موجود: P2025 والكل يترجع.

[[connectOrCreate]] بيعمل SELECT وبعدين INSERT لو ملقاش. لو طلبين في نفس اللحظة عملوا نفس التاج، واحد منهم ممكن ياخد P2002 (unique). لو ده متوقع كتير (زي تاجات بيكتبها اليوزرز)، اعمل [[upsert]] على التاج الأول أو اعمل retry.

[[createMany]] أسرع بكتير للكميات الكبيرة (INSERT واحد بكل الصفوف)، بس مبيعملش nested للأولاد. ومن Prisma 5.14 فيه [[createManyAndReturn]] بيرجّع الصفوف.

الـ nested write مش بيحل مشكلة المخزون. «اخصم المخزون بشرط يكون كفاية» لسه محتاج [[updateMany]] بـ [[where: { stock: { gte: qty } }]] و [[data: { stock: { decrement: qty } }]] جوه [[$transaction]] التفاعلية، وتتأكد إن [[count]] مش صفر (درس atomic UPDATE، ودرس $transaction في تاب «Backend بـ Node»).

وفي update: [[deleteMany: {}]] جوه علاقة بيمسح كل أولاد الأب ده بس (مش الجدول كله)، وبعده [[create]] بيضيف الجداد. ده أبسط طريقة «استبدل البنود» في transaction واحدة.`,
            when: "أي إنشاء لأب وأولاده مع بعض (أوردر وبنوده، وبوست وتاجاته، ويوزر وبروفايله)، وربط بحاجات موجودة وقت الإنشاء. أما آلاف الصفوف مرة واحدة (import أو seed) فـ createMany.",
            mistakes: R`[[await]] في loop على البنود بعد ما الأوردر يتعمل من غير transaction. خلط [[productId]] مع [[product: { connect }]]. [[connectOrCreate]] على قيمة مش unique. تفتكر إن [[deleteMany: {}]] جوه nested update بيمسح الجدول كله (لأ، أولاد الأب ده بس)، والعكس: [[prisma.orderItem.deleteMany({})]] من برّه بيمسح الجدول كله فعلًا. وتثق في السعر اللي جاي من العميل في [[unitPrice]] بدل ما تقراه من المنتج في السيرفر.`
          },
          teach: R`## الفكرة: الـ [[data]] شكله شكل الشجرة اللي عايز تكتبها

بدل ٤ أوامر ورا بعض (يوزر، وبعدين أوردر بالـ id بتاعه، وبعدين بند، وبند)، بتكتب object واحد متداخل: يوزر، جواه أوردرات، جواها بنود. و Prisma بيحوّله INSERTs بالترتيب الصح جوه transaction واحدة.

اتشغّل بـ Prisma 7.10.0 على ويندوز، و PostgreSQL 18 في Docker. قبل المثال كان عندنا منتجين: Mug ([[mugId = 1]]) و Cap ([[capId = 2]]).

---

## ١. يوزر وأوردر وبنود في أمر واحد

نفكّه من برّه لجوه:

~~~ts
const user = await prisma.user.create({
  data: {
    email: "ali@example.com",
    name: "Ali",
~~~

[[create]] على اليوزر، و [[data]] أعمدته العادية.

~~~ts
    orders: {
      create: {
        total: 300,
~~~

[[orders]] هي الـ relation field ([[Order[]]] في الـ schema). وجواها مش قيمة، جواها **أمر**: [[create]] = اعمل أوردر جديد مربوط باليوزر ده. ومش بنكتب [[userId]]: Prisma هيحطه من اليوزر اللي لسه هيتعمل.

~~~ts
        items: {
          create: [
            { product: { connect: { id: mugId } }, quantity: 1, unitPrice: 120 },
            { product: { connect: { id: capId } }, quantity: 1, unitPrice: 180 },
          ],
        },
~~~

مستوى تالت: بنود الأوردر. [[create]] هنا أخد **array** = اعمل كذا بند. وفي كل بند:

- [[product: { connect: { id: mugId } }]]: البند لازم يشاور على منتج. [[connect]] = اربطه بمنتج **موجود** بالـ id بتاعه (حقل unique).
- [[quantity]] و [[unitPrice]]: أعمدة البند العادية.
- ومش بنكتب [[orderId]]: Prisma بياخده من الأوردر الأب.

~~~ts
  include: { orders: { include: { items: true } } },
});
~~~

بعد الكتابة رجّع اليوزر ومعاه أوردراته، ومع كل أوردر بنوده.

### الـ SQL بالترتيب

~~~text الناتج
prisma:query INSERT INTO "public"."users" ("id","email","name","created_at") VALUES ($1,$2,$3,$4) RETURNING "public"."users"."id"
prisma:query INSERT INTO "public"."orders" ("user_id","status","total","created_at") VALUES ($1,$2,$3,$4) RETURNING "public"."orders"."id"
prisma:query SELECT "public"."products"."id" FROM "public"."products" WHERE ("public"."products"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query INSERT INTO "public"."order_items" ("order_id","product_id","quantity","unit_price") VALUES ($1,$2,$3,$4) RETURNING "public"."order_items"."order_id", "public"."order_items"."product_id"
prisma:query SELECT "public"."products"."id" FROM "public"."products" WHERE ("public"."products"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query INSERT INTO "public"."order_items" ("order_id","product_id","quantity","unit_price") VALUES ($1,$2,$3,$4) RETURNING "public"."order_items"."order_id", "public"."order_items"."product_id"
prisma:query SELECT ... FROM "public"."users" WHERE "public"."users"."id" = $1 LIMIT $2 OFFSET $3
prisma:query SELECT ... FROM "public"."orders" WHERE "public"."orders"."user_id" = $1 OFFSET $2
prisma:query SELECT ... FROM "public"."order_items" WHERE "public"."order_items"."order_id" IN ($1) OFFSET $2
prisma:query COMMIT
~~~

| السطر | بيعمل إيه |
|---|---|
| INSERT users ... [[RETURNING id]] | اليوزر الأول، و [[RETURNING]] بيرجّع الـ id |
| INSERT orders | الأوردر، و [[user_id]] = الـ id اللي لسه راجع |
| SELECT products ... id = $1 | ده الـ [[connect]]: يتأكد إن المنتج موجود |
| INSERT order_items | البند الأول بـ [[order_id]] من الأوردر |
| SELECT + INSERT تاني | البند التاني |
| ٣ SELECTs | الـ [[include]]: يوزر، وأوردراته، وبنودها |
| [[COMMIT]] | كل ده transaction واحدة. الـ BEGIN مش بيظهر في الـ log، بس الـ COMMIT بيظهر |

والنتيجة (مختصرة):

~~~text النتيجة
{ id: '69c9f08f-...', email: 'ali@example.com', name: 'Ali',
  orders: [ { id: 1, status: 'pending', total: 300,
              items: [ { orderId: 1, productId: 2, quantity: 1, unitPrice: 180 },
                       { orderId: 1, productId: 1, quantity: 1, unitPrice: 120 } ] } ] }
~~~

([[console.dir]] على Decimal بيطبع الـ object كله بكل دواله، فاختصرناه هنا للقيمة. و [[status]] طلع [['pending']] من الـ default.)

---

## ٢. [[connectOrCreate]] في update

~~~ts
await prisma.product.update({
  where: { id: mugId },
  data: { tags: { connectOrCreate: [{ where: { name: "gift" }, create: { name: "gift" } }] } },
});
~~~

- [[update]]: عدّل صف واحد، و [[where]] بيحدده.
- [[tags: { connectOrCreate: [...] }]]: لكل عنصر في الـ array: دوّر بـ [[where]]، لو لقيته اربطه، لو ملقيتوش اعمله بـ [[create]] واربطه.

~~~text الناتج
prisma:query SELECT ... FROM "public"."products" WHERE ("public"."products"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query SELECT "public"."tags"."id" FROM "public"."tags" WHERE ("public"."tags"."name" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query INSERT INTO "public"."_ProductToTag" ("A","B") VALUES ($1,$2) ON CONFLICT DO NOTHING
prisma:query SELECT ... FROM "public"."products" WHERE "public"."products"."id" = $1 LIMIT $2 OFFSET $3
prisma:query COMMIT
~~~

التاج [[gift]] كان موجود (من الدرس اللي فات)، فمفيش [[INSERT INTO tags]]: لقاه وربطه على طول. ولو مكانش موجود كنت هتشوف INSERT في tags قبل جدول الربط.

---

## ٣. «استبدل البنود»: [[deleteMany: {}]] وبعده [[create]]

~~~ts
await prisma.order.update({
  where: { id: orderId },
  data: { items: { deleteMany: {}, create: [{ product: { connect: { id: mugId } }, quantity: 2, unitPrice: 120 }] } },
});
~~~

- [[deleteMany: {}]] جوه [[items]]: امسح بنود **الأوردر ده** اللي بتحقق الشرط. و [[{}]] = من غير شرط، يعني كل بنوده.
- [[create: [...]]]: وبعدين ضيف البند الجديد.

~~~text الناتج
prisma:query SELECT ... FROM "public"."orders" WHERE ("public"."orders"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query SELECT "public"."order_items"."order_id", "public"."order_items"."product_id" FROM "public"."order_items" WHERE (1=1 AND "public"."order_items"."order_id" IN ($1)) OFFSET $2
prisma:query DELETE FROM "public"."order_items" WHERE ("public"."order_items"."order_id" IN ($1,$2) AND "public"."order_items"."product_id" IN ($3,$4) AND 1=1)
prisma:query SELECT "public"."products"."id" FROM "public"."products" WHERE ("public"."products"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query INSERT INTO "public"."order_items" ("order_id","product_id","quantity","unit_price") VALUES ($1,$2,$3,$4) RETURNING ...
prisma:query COMMIT
[ { orderId: 1, productId: 1, quantity: 2, unitPrice: 120 } ]
~~~

شوف الـ DELETE: Prisma جاب مفاتيح بنود الأوردر ده الأول، ومسح بيها هي بس. يعني مستحيل يمسح بنود أوردر تاني. وفي الآخر البند الوحيد الباقي: Mug بكمية ٢.

---

## ٤. الـ solCode: لو حاجة وقعت في النص

~~~ts
const before = await prisma.user.count();
~~~

عدد اليوزرز قبل التجربة.

~~~ts
try {
  await prisma.user.create({
    data: {
      email: "fail@example.com",
      name: "Fail",
      orders: { create: { total: 100, items: { create: [{ product: { connect: { id: 999999 } }, quantity: 1, unitPrice: 100 }] } } },
    },
  });
} catch (e: any) {
  console.log(e.code);
}
~~~

نفس شكل المثال، بس البند بيعمل [[connect]] لمنتج [[999999]] مش موجود.

~~~text الناتج
prisma:query SELECT COUNT(*) AS "_count$_all" FROM (SELECT "public"."users"."id" FROM "public"."users" WHERE 1=1 OFFSET $1) AS "sub"
prisma:query INSERT INTO "public"."users" ("id","email","name","created_at") VALUES ($1,$2,$3,$4) RETURNING "public"."users"."id"
prisma:query INSERT INTO "public"."orders" ("user_id","status","total","created_at") VALUES ($1,$2,$3,$4) RETURNING "public"."orders"."id"
prisma:query SELECT "public"."products"."id" FROM "public"."products" WHERE ("public"."products"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
prisma:query ROLLBACK
...
An operation failed because it depends on one or more records that were required but not found. No 'Product' record (needed to inline the relation on 'OrderItem' record(s)) was found for a nested connect on one-to-many relation 'OrderItemToProduct'.
P2025
~~~

اليوزر **اتكتب** والأوردر **اتكتب**، وبعدين الـ SELECT بتاع الـ connect ملقاش المنتج، فـ Prisma عمل [[ROLLBACK]] ورمى [[P2025]] (record مطلوب ومش موجود).

~~~ts
console.log(before === (await prisma.user.count()));
~~~

~~~text الناتج
true
~~~

العدد زي ما هو: الـ ROLLBACK رجّع اليوزر والأوردر كأنهم متعملوش.

---

## ٥. الشكلين: checked و unchecked

جربنا بندين في نفس الـ array، واحد بـ [[productId: 2]] والتاني بـ [[product: { connect: { id: 1 } }]]:

~~~text الناتج
PrismaClientValidationError ...
Argument $__btproduct$__bt is missing.
~~~

Prisma اختار للـ array كلها الشكل الـ checked (اللي فيه [[product]])، فالبند الأول اللي مكتوب بـ [[productId]] اتقال عليه إن [[product]] ناقص. ولما خلّينا البند بـ [[productId]] لوحده شغال عادي. أما [[orderId]] جوه الـ nested create:

~~~text الناتج
Unknown argument $__btorderId$__bt. Available options are marked with ?.
~~~

لأن ده Prisma اللي بيحطه من الأب.

---

## الخلاصة

| جوه علاقة في [[data]] | معناه |
|---|---|
| [[create]] | صف جديد مربوط (object أو array) |
| [[connect]] | اربط بصف موجود بحقل unique، ولو مش موجود [[P2025]] |
| [[connectOrCreate]] | دوّر، واربط أو اعمل |
| [[disconnect]] / [[set]] | فك ربط / استبدل كل الروابط |
| [[deleteMany: {}]] | امسح أولاد الأب ده بس |

- كله في transaction واحدة: يا كله يتكتب يا [[ROLLBACK]].
- مبتكتبش الـ FK بتاع الأب أبدًا في nested create.
- متخلطش [[productId]] و [[product: { connect }]] في نفس الـ create.`,
          lines: [
            "اعمل يوزر، وكل اللي تحت في transaction واحدة:",
            "البيانات:",
            "الإيميل،",
            "والاسم،",
            "والأوردرات:",
            "اعمل أوردر جديد مربوط بيه:",
            "بإجمالي ٣٠٠،",
            "والبنود:",
            "اعمل بنود جديدة مربوطة بالأوردر:",
            "بند مربوط بمنتج موجود (connect بالـ id)،",
            "وبند تاني.",
            "قفلة الـ array.",
            "قفلة items.",
            "قفلة الأوردر.",
            "قفلة orders.",
            "قفلة data.",
            "ورجّع اليوزر ومعاه أوردراته وبنودها.",
            "قفلة.",
            "في update:",
            "على المنتج ده،",
            "اربط تاج gift لو موجود، واعمله لو مش موجود.",
            "قفلة.",
            "استبدل بنود أوردر:",
            "الأوردر ده،",
            "امسح بنوده كلها، وضيف بند جديد، في transaction واحدة.",
            "قفلة."
          ]
        },
        {
          cmd: "relation filters",
          title: "فلتر بالعلاقات: some و every و none و _count",
          desc: R`عايز «اليوزرز اللي عملوا أوردر مدفوع»؟ ده فلتر على اليوزر بشرط في جدول تاني. في SQL ده [[EXISTS]] (درس EXISTS)، وفي Prisma:

[[some]] فيه ولد واحد على الأقل بيحقق الشرط. [[none]] مفيش ولا ولد بيحققه. [[every]] كل الأولاد بيحققوه. وللعلاقة الـ one (زي [[order.user]]) بتستخدم [[is]] و [[isNot]].

و [[_count]] بيرجّع عدد الأولاد من غير ما يجيبهم: [[select: { _count: { select: { orders: true } } }]]. وتقدر ترتب بيه: [[orderBy: { orders: { _count: "desc" } }]].`,
          example: R`const buyers = await prisma.user.findMany({
  where: { orders: { some: { status: "paid", total: { gte: 100 } } } },
  select: { email: true },
});

const neverOrdered = await prisma.user.findMany({ where: { orders: { none: {} } } });

const allPaid = await prisma.user.findMany({
  where: { orders: { some: {}, every: { status: "paid" } } },
});

const kitchen = await prisma.product.findMany({ where: { tags: { some: { name: "kitchen" } } } });

const topCustomers = await prisma.user.findMany({
  select: { email: true, _count: { select: { orders: true } } },
  orderBy: { orders: { _count: "desc" } },
  take: 10,
});`,
          try: R`اعمل يوزر جديد معملش ولا أوردر، وشغّل [[where: { orders: { every: { status: "paid" } } }]] من غير [[some: {}]]. اليوزر الجديد طلع؟ ليه؟ وبعدين هات لكل يوزر عدد أوردراته المدفوعة بس في [[_count]]، وشوف الـ SQL اللي اتولّد لـ [[none]] في الـ log. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: اكتب بـ SQL اللي Prisma بيعمله لـ [[{ some: {}, every: { status: "paid" } }]]: إيميلات اليوزرز اللي عندهم أوردر واحد على الأقل وكل أوردراتهم [[paid]]. اليوزر اللي ملوش أوردرات مينفعش يطلع.`,
          sol: R`أيوه، اليوزر اللي ملوش أوردرات هيطلع في نتيجة [[every]]. في المنطق، «كل أوردراته مدفوعة» صح لما ميكونش عنده أوردرات أصلًا (vacuous truth)، و Prisma بيترجمها لـ [[NOT EXISTS (أوردر مش مدفوع)]]، واليوزر ده مفيش عنده أوردر مش مدفوع. عشان كده في المثال فيه [[some: {}]] مع every: «عنده أوردر واحد على الأقل، وكلهم مدفوعين».

عدد المدفوع بس: [[_count: { select: { orders: { where: { status: "paid" } } } }]]. اليوزر اللي ملوش هيطلع [[0]] مش null.

والـ SQL بتاع none هتلاقي فيه [[NOT EXISTS]] أو [[NOT IN]] على subquery من orders، نفس اللي كتبته بإيدك في درس EXISTS. الشكل بالظبط ممكن يختلف بين النسخ، المهم إنه استعلام واحد مش استعلام لكل يوزر.`,
          solCode: R`await prisma.user.create({ data: { email: "new@example.com", name: "New" } });

const everyOnly = await prisma.user.findMany({
  where: { orders: { every: { status: "paid" } } },
  select: { email: true },
});
console.log(everyOnly);

const paidCounts = await prisma.user.findMany({
  select: { email: true, _count: { select: { orders: { where: { status: "paid" } } } } },
});
console.log(paidCounts);`,
          flag: "script",
          deep: {
            why: "الشاشات والتقارير مليانة الأسئلة دي: «العملاء اللي اشتروا المنتج ده»، «اليوزرز اللي سجلوا ومعملوش ولا أوردر» (عشان تبعتلهم خصم)، «الكورسات اللي فيها طلاب». من غير relation filters بتجيب كل اليوزرز وأوردراتهم وتفلتر في JavaScript، وده بيبقى أبطأ مع كل يوزر جديد.",
            how: R`كل relation filter بيتحول subquery في نفس الـ SQL ([[EXISTS]] أو [[IN]])، فالقاعدة هي اللي بتفلتر، ومع index على الـ FK بيبقى سريع.

[[some: {}]] من غير شرط = «عنده أي ولد». [[none: {}]] = «ملوش ولا ولد». وتقدر تتداخل: [[orders: { some: { items: { some: { productId: 5 } } } }]] = «اشترى المنتج ٥ في أي أوردر».

[[every]] بيرجّع الأب اللي ملوش أولاد خالص، وده بيفاجئ ناس كتير. لو ده مش قصدك، ضيف [[some: {}]] جنبه.

[[_count]] بيتحسب جوه نفس الاستعلام (JOIN على subquery فيها [[COUNT(*)]] مجمّعة بالـ FK) من غير ما يجيب الصفوف. و [[_count]] ينفع في [[include]] كمان، وفيه [[where]] من Prisma 4.16.

لتجميعات أكتر (مجموع ومتوسط): [[prisma.order.aggregate]] و [[prisma.order.groupBy({ by: ["status"], _sum: { total: true } })]]. ولو التقرير فيه JOIN و CASE و date_trunc مع بعض، اكتبه SQL بـ $queryRaw (الدرس الجاي) بدل ما تحاول تلوي الـ API.`,
            when: "فلترة بوجود أو عدم وجود أولاد، وعرض عدادات («٣ أوردرات»، «١٢ طالب») جنب كل صف، وترتيب بالأكتر نشاط.",
            mistakes: R`every من غير some فتطلع يوزرز ملهمش أوردرات. تجيب الأولاد كلهم عشان تعرف [[.length]] بدل [[_count]]. [[include: { orders: true }]] وبعدين [[filter]] في JavaScript. شرط على علاقة one بـ some (هي [[is]]). ومن غير index على الـ FK، كل subquery بتقرا جدول الأوردرات كله.`
          },
          teach: R`## الفكرة: شرط على الأب، بس الشرط نفسه في جدول الأولاد

«هات اليوزرز» سهلة. «هات اليوزرز **اللي عندهم** أوردر مدفوع» شرطها مش في جدول users، في جدول orders. في SQL بتكتبها subquery بـ [[EXISTS]]، وفي Prisma بتكتب [[where]] على الـ relation field، وجواه كلمة من التلاتة: [[some]] و [[none]] و [[every]].

اتشغّل بـ Prisma 7.10.0 على ويندوز، و PostgreSQL 18 في Docker، والـ client بـ [[log: ["query"]]]. الداتا:

| اليوزر | أوردراته |
|---|---|
| sara | paid 450، paid 360، cancelled 300، paid 60 |
| ali | pending 120، paid 1200 |
| mona | paid 250، pending 80 |
| omar | ولا أوردر |
| nour | paid 99، paid 10 |

---

## ١. [[some]]: «ولد واحد على الأقل»

~~~ts
const buyers = await prisma.user.findMany({
  where: { orders: { some: { status: "paid", total: { gte: 100 } } } },
  select: { email: true },
});
~~~

نقراها من برّه لجوه:

- [[where: { orders: ... }]]: الشرط على علاقة [[orders]] بتاعة اليوزر.
- [[some: {...}]]: فيه أوردر واحد على الأقل بيحقق اللي جوه.
- [[status: "paid"]]: الأوردر مدفوع.
- [[total: { gte: 100 }]]: [[gte]] = greater than or equal، يعني [[>= 100]]. وأخواتها [[gt]] و [[lt]] و [[lte]].
- والشرطين في نفس الـ object يعني AND: **نفس الأوردر** لازم يبقى مدفوع و ١٠٠ أو أكتر.

~~~text الناتج
prisma:query SELECT "public"."users"."id", "public"."users"."email" FROM "public"."users" WHERE EXISTS(SELECT "t0"."user_id" FROM "public"."orders" AS "t0" WHERE ("t0"."status" = $1 AND "t0"."total" >= $2 AND ("public"."users"."id") = ("t0"."user_id") AND "t0"."user_id" IS NOT NULL)) OFFSET $3
["sara@example.com","mona@example.com","ali@example.com"]
~~~

- استعلام واحد، والفلترة جوه القاعدة.
- [[EXISTS(SELECT ...)]] = صح لو الـ subquery رجّعت صف واحد على الأقل.
- [[("public"."users"."id") = ("t0"."user_id")]] ده اللي بيربط الـ subquery باليوزر الحالي (correlated subquery). و [[t0]] اسم مستعار للجدول.
- nour مطلعتش: أوردراتها مدفوعة بس أكبر واحد ٩٩. و omar ملوش أوردرات.

---

## ٢. [[none]]: «ولا ولد»

~~~ts
const neverOrdered = await prisma.user.findMany({ where: { orders: { none: {} } } });
~~~

[[none: {}]]: مفيش ولا أوردر بيحقق [[{}]]. و [[{}]] شرط فاضي = أي أوردر. يعني «ملوش أوردرات خالص».

~~~text الناتج
prisma:query SELECT ... FROM "public"."users" WHERE NOT EXISTS(SELECT "t0"."user_id" FROM "public"."orders" AS "t0" WHERE (1=1 AND ("public"."users"."id") = ("t0"."user_id") AND "t0"."user_id" IS NOT NULL)) OFFSET $1
["omar@gmail.com"]
~~~

نفس الشكل بس [[NOT EXISTS]]، و [[1=1]] مكان الشرط الفاضي.

---

## ٣. [[every]]: «كل الأولاد»، والفخ بتاعها

~~~ts
const allPaid = await prisma.user.findMany({
  where: { orders: { some: {}, every: { status: "paid" } } },
});
~~~

~~~text الناتج
["nour@example.com"]
~~~

nour بس: sara عندها cancelled، و ali و mona عندهم pending.

ليه [[some: {}]] جنب [[every]]؟ شغّلنا الـ solCode اللي بيعمل يوزر جديد [[new@example.com]] من غير أوردرات، وبعدين [[every]] لوحدها:

~~~ts
const everyOnly = await prisma.user.findMany({
  where: { orders: { every: { status: "paid" } } },
  select: { email: true },
});
~~~

~~~text الناتج
prisma:query SELECT "public"."users"."id", "public"."users"."email" FROM "public"."users" WHERE NOT EXISTS(SELECT "t0"."user_id" FROM "public"."orders" AS "t0" WHERE ((NOT "t0"."status" = $1) AND ("public"."users"."id") = ("t0"."user_id") AND "t0"."user_id" IS NOT NULL)) OFFSET $2
[
  { email: 'omar@gmail.com' },
  { email: 'nour@example.com' },
  { email: 'new@example.com' }
]
~~~

اقرا الـ SQL: Prisma مش بيسأل «كل أوردراته paid؟»، بيسأل «مفيش ولا أوردر **مش** paid؟» ([[NOT EXISTS]] على [[NOT status = 'paid']]). الجملتين نفس المعنى، بس اللي ملوش أوردرات خالص أكيد «مفيش عنده أوردر مش paid»، فبيطلع. ده اسمه vacuous truth. عشان كده omar و new طلعوا. و [[some: {}]] بيضيف شرط تاني: «وعنده أوردر واحد على الأقل».

---

## ٤. many-to-many: نفس الكلام

~~~ts
const kitchen = await prisma.product.findMany({ where: { tags: { some: { name: "kitchen" } } } });
~~~

~~~text الناتج
["Mug","Pan"]
~~~

في الـ log هتلاقي [[EXISTS]] بس جواه [[INNER JOIN]] بين [[_ProductToTag]] و [[tags]]، لأن الربط بيعدّي على جدول وسيط (درس علاقات Prisma).

---

## ٥. [[_count]]: العدد من غير الصفوف

~~~ts
const topCustomers = await prisma.user.findMany({
  select: { email: true, _count: { select: { orders: true } } },
  orderBy: { orders: { _count: "desc" } },
  take: 10,
});
~~~

- [[_count]] field خاص بيرجّع أعداد. و [[select: { orders: true }]] جواه = عدّ الأوردرات.
- [[orderBy: { orders: { _count: "desc" } }]] = رتّب اليوزرز بعدد أوردراتهم، الأكتر الأول.

~~~text الناتج
prisma:query SELECT "public"."users"."id", "public"."users"."email", COALESCE("aggr_selection_0_Order"."_aggr_count_orders", 0) AS "_aggr_count_orders" FROM "public"."users" LEFT JOIN (SELECT "public"."orders"."user_id", COUNT(*) AS "orderby_aggregator" FROM "public"."orders" WHERE 1=1 GROUP BY "public"."orders"."user_id") AS "orderby_1_Order" ON (...) LEFT JOIN (SELECT "public"."orders"."user_id", COUNT(*) AS "_aggr_count_orders" FROM "public"."orders" WHERE 1=1 GROUP BY "public"."orders"."user_id") AS "aggr_selection_0_Order" ON (...) WHERE 1=1 ORDER BY COALESCE("orderby_1_Order"."orderby_aggregator", $1) DESC LIMIT $2 OFFSET $3
[{"email":"sara@example.com","_count":{"orders":4}},{"email":"mona@example.com","_count":{"orders":2}},{"email":"nour@example.com","_count":{"orders":2}},{"email":"ali@example.com","_count":{"orders":2}},{"email":"omar@gmail.com","_count":{"orders":0}}]
~~~

نفكّ الـ SQL:

- [[(SELECT user_id, COUNT(*) ... GROUP BY user_id)]]: جدول مؤقت فيه لكل يوزر عدد أوردراته.
- [[LEFT JOIN]]: اربطه باليوزرز، و LEFT عشان اليوزر اللي ملوش أوردرات يفضل موجود (بـ NULL).
- [[COALESCE(..., 0)]]: لو NULL خليه 0. عشان كده omar طلع [[0]] مش null.
- الـ subquery متكررة مرتين: مرة للـ select ومرة للـ orderBy. ده شكل Prisma 7.10، والمهم إنه استعلام واحد مهما كان عدد اليوزرز.

---

## ٦. [[_count]] بشرط

من الـ solCode:

~~~ts
const paidCounts = await prisma.user.findMany({
  select: { email: true, _count: { select: { orders: { where: { status: "paid" } } } } },
});
~~~

بدل [[orders: true]] كتبنا [[orders: { where: {...} }]] = عدّ المدفوع بس:

~~~text الناتج
prisma:query ... LEFT JOIN (SELECT "public"."orders"."user_id", COUNT(*) AS "_aggr_count_orders" FROM "public"."orders" WHERE "public"."orders"."status" = $1 GROUP BY "public"."orders"."user_id") ...
[
  { email: 'sara@example.com', _count: { orders: 3 } },
  { email: 'mona@example.com', _count: { orders: 1 } },
  { email: 'omar@gmail.com', _count: { orders: 0 } },
  { email: 'nour@example.com', _count: { orders: 2 } },
  { email: 'ali@example.com', _count: { orders: 1 } },
  { email: 'new@example.com', _count: { orders: 0 } }
]
~~~

الشرط راح جوه الـ subquery ([[WHERE status = $1]]). و sara ٣ مش ٤ لأن واحد cancelled.

---

## الخلاصة

| في Prisma | المعنى | في SQL |
|---|---|---|
| [[some: {...}]] | ولد واحد على الأقل بيحقق | [[EXISTS]] |
| [[none: {...}]] | ولا ولد بيحقق | [[NOT EXISTS]] |
| [[every: {...}]] | مفيش ولد **مش** بيحقق | [[NOT EXISTS]] على عكس الشرط |
| [[is]] / [[isNot]] | لعلاقة one ([[order.user]]) | |
| [[_count]] | عدد الأولاد | [[LEFT JOIN]] على [[COUNT(*) GROUP BY]] |

- [[every]] لوحدها بتطلّع الأب اللي ملوش أولاد، فحط [[some: {}]] جنبها لو ده مش قصدك.
- كله استعلام واحد، والقاعدة هي اللي بتفلتر وبتعدّ.`,
          lines: [
            "اليوزرز اللي عندهم:",
            "أوردر واحد على الأقل مدفوع وقيمته ١٠٠ أو أكتر،",
            "الإيميل بس.",
            "قفلة.",
            "اللي ملهمش ولا أوردر خالص.",
            "اللي كل أوردراتهم مدفوعة:",
            "و some: {} عشان اللي ملوش أوردرات ميطلعش (every لوحدها بتطلّعه).",
            "قفلة.",
            "المنتجات اللي عليها تاج kitchen (many-to-many).",
            "أكتر ١٠ عملاء:",
            "الإيميل وعدد الأوردرات من غير ما تجيبها،",
            "مترتبين بالعدد،",
            "أول ١٠.",
            "قفلة."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
INSERT INTO users VALUES (5, 'Nour', 'nour@example.com', NULL, '2026-04-01 10:00+00');
INSERT INTO orders VALUES (9, 5, 'paid', 99.00, '2026-09-20 10:00+00'), (10, 5, 'paid', 10.00, '2026-09-21 10:00+00');`,
            starter: R`SELECT email FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status <> 'paid'
);`,
            expect: [["nour@example.com"]],
            solution: R`SELECT email FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)
  AND NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status <> 'paid'
  );`
          }
        },
        {
          cmd: "$queryRaw",
          title: "SQL خام من Prisma بأمان: tagged template ولا Unsafe",
          desc: R`لما Prisma ميكفيش (تقرير فيه date_trunc و CASE، أو [[FOR UPDATE]]، أو LATERAL، أو full-text)، بتكتب SQL بإيدك:

[[prisma.$queryRaw]] لاستعلام بيرجّع صفوف، و [[prisma.$executeRaw]] لأمر بيعدّل وبيرجّع عدد الصفوف.

الاتنين tagged templates: بتكتبهم بعلامة الـ backtick من غير أقواس، وأي [[$__{قيمة}]] جواهم مش بتتلزق في النص. بتتبعت parameter منفصل ([[$1]] و [[$2]])، فمفيش SQL injection. ده نفس اللي [[pool.query(sql, [params])]] بيعمله في درس WHERE.

أما [[$queryRawUnsafe]] و [[$executeRawUnsafe]] بياخدوا string عادي. لو ركّبته بـ template literal عادي فيه قيمة من اليوزر، ده SQL injection. لو لازم تستخدمهم، القيم بتتبعت parameters بعد الـ string: [[$queryRawUnsafe("... WHERE email = $1", email)]].`,
          example: R`const email = req.query.email;
const users = await prisma.$queryRaw$__bt
  SELECT id, email FROM users WHERE email = $__{email}
$__bt;

const revenue = await prisma.$queryRaw<{ month: Date; revenue: string; orders: number }[]>$__bt
  SELECT date_trunc('month', created_at) AS month, sum(total)::text AS revenue, count(*)::int AS orders
  FROM orders WHERE status = 'paid' AND created_at >= $__{from}
  GROUP BY 1 ORDER BY 1
$__bt;

const changed = await prisma.$executeRaw$__bt
  UPDATE products SET stock = stock - $__{qty} WHERE id = $__{productId} AND stock >= $__{qty}
$__bt;

const ids = [1, 2, 3];
const some = await prisma.$queryRaw$__btSELECT name FROM products WHERE id = ANY($__{ids})$__bt;

await prisma.$transaction(async (tx) => {
  await tx.$queryRaw$__btSELECT id FROM orders WHERE id = $__{orderId} FOR UPDATE$__bt;
});`,
          try: R`اعمل يوزر، وبعدين خلي [[email]] يساوي [["ali@example.com' OR '1'='1"]]، وشغّل الاستعلام مرة بـ [[$queryRaw]] (tagged) ومرة بـ [[$queryRawUnsafe]] وانت راكب الـ string بـ template literal عادي. كام صف رجع في كل مرة؟ وبعدين شغّل تقرير الإيراد من غير [[::int]] و [[::text]] وجرّب [[JSON.stringify]] على النتيجة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: تقرير الإيراد اللي بيتبعت لـ [[$queryRaw]]: من أول أغسطس 2026، الشهر، والإيراد [[::text]]، وعدد الأوردرات [[::int]]، للأوردرات [[paid]]، مترتب بالشهر.`,
          sol: R`الـ tagged هيرجّع [[[]]]: الإيميل اتبعت parameter واحد كنص كامل، ومفيش يوزر إيميله كده. الـ Unsafe بالـ template literal هيرجّع كل اليوزرز، لأن النص بقى [[WHERE email = 'ali@example.com' OR '1'='1']]، والشرط التاني دايمًا صح. ده SQL injection بالظبط. ولو كتبت [[$queryRawUnsafe("... WHERE email = $1", email)]] هيرجّع [[[]]] برضه، لأن القيمة اتبعتت parameter.

ومن غير الـ casts: [[count(*)]] نوعه bigint في Postgres، فبيرجع JavaScript [[BigInt]] ([[1n]])، و [[JSON.stringify]] هيقع بـ [[Do not know how to serialize a BigInt]]. و [[sum(total)]] بيرجع [[Decimal]] object. الحل الأسهل تحوّل جوه SQL: [[count(*)::int]] (لو العدد مش هيعدّي ٢ مليار) و [[sum(total)::text]] للفلوس عشان متضيعش دقة.

وخد بالك: الـ type اللي بتكتبه في [[$queryRaw<...>]] مجرد وعد منك، Prisma مش بيتأكد منه. لو كتبت [[orders: number]] والقاعدة رجّعت bigint، TypeScript هيصدقك والـ bug هيطلع في الـ runtime.`,
          solCode: R`import { prisma } from "./db";

const email = "ali@example.com' OR '1'='1";
const safe = await prisma.$queryRaw$__btSELECT id, email FROM users WHERE email = $__{email}$__bt;
const unsafe = await prisma.$queryRawUnsafe($__btSELECT id, email FROM users WHERE email = '$__{email}'$__bt);
const unsafeButParam = await prisma.$queryRawUnsafe("SELECT id, email FROM users WHERE email = $1", email);
console.log((safe as any[]).length, (unsafe as any[]).length, (unsafeButParam as any[]).length);

const rows: any[] = await prisma.$queryRaw$__btSELECT count(*) AS n FROM orders$__bt;
try { JSON.stringify(rows); } catch (e: any) { console.log(e.message); }
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "مهما الـ ORM كان كويس، فيه استعلامات بيعملها غلط أو مبيعرفهاش خالص: تقارير بالتواريخ، و window functions، و LATERAL، والأقفال. SQL الخام هو الحل، والخطر الوحيد إنك تفتح SQL injection. والإجابة على سؤال انترفيو «إزاي بتمنع SQL injection؟» هي parameterized queries، و $queryRaw بالـ backtick هو ده.",
            how: R`الـ tagged template: JavaScript بيدّي الدالة الأجزاء الثابتة من النص لوحدها والقيم لوحدها، و Prisma بيبني [[... WHERE email = $1]] ويبعت القيم منفصلة. القاعدة بتعامل القيمة كـ data، مستحيل تبقى جزء من الأمر.

عشان كده مينفعش تحط اسم عمود أو جدول أو اتجاه ترتيب كـ [[$__{}]]: هيتبعت كقيمة نصية مش اسم. للحاجات دي فيه [[Prisma.raw("name")]] بيلزق النص زي ما هو، ودي Unsafe فعليًا، فاستخدمها مع whitelist بس: [[const col = ["name", "price"].includes(x) ? x : "name"]].

[[Prisma.sql]] بيبني جزء من استعلام بنفس الأمان عشان تركّب شروط اختيارية، و [[Prisma.join(ids)]] بيطلّع [[$1, $2, $3]] لـ [[IN (...)]]. أو ابعت array واستخدم [[= ANY($__{ids})]]، وده أبسط.

أسماء الجداول والأعمدة في SQL الخام هي أسماء القاعدة، مش أسماء الـ models. لو عامل [[@@map("orders")]] يبقى [[orders]] و [[created_at]]، ولو مش عامل يبقى [["Order"]] و [["createdAt"]] بتنصيص.

الأنواع اللي بترجع: [[bigint]] بيرجع BigInt، و [[numeric]] بيرجع Decimal، و [[timestamptz]] بيرجع Date. و Prisma فيه كمان [[TypedSQL]]: بتكتب الاستعلام في ملف [[.sql]] جوه [[prisma/sql]] و [[prisma generate --sql]] بيولّد function ليها types حقيقية من القاعدة. مفيد للتقارير اللي بتتكرر.

و [[FOR UPDATE]]: مفيش في API بتاع Prisma. بتكتبه بـ [[tx.$queryRaw]] جوه [[$transaction]] التفاعلية، والقفل بيفضل لحد آخر الـ callback (درس SELECT FOR UPDATE).`,
            when: "تقارير وتجميعات معقدة، و window functions و LATERAL و CTE، والأقفال، و full-text و pg_trgm، وأي استعلام الـ log بيوريك إن Prisma عامله أبطأ بكتير من اللي تكتبه بإيدك. وللـ CRUD العادي، الـ API العادي أوضح وأأمن في الـ types.",
            mistakes: R`[[$queryRawUnsafe]] بـ template literal فيه قيمة من اليوزر. [[$queryRaw("SELECT ...")]] بأقواس: دي بقت دالة عادية مش tagged template، و Prisma هيرفضها أو يعاملها غلط. [[$__{column}]] لاسم عمود فالترتيب ميشتغلش. أسماء الـ models بدل أسماء الجداول. [[JSON.stringify]] على BigInt. تثق في الـ generic type من غير ما تتأكد. و [[Prisma.raw]] على قيمة من اليوزر.`
          },
          teach: R`## الفكرة: انت بتكتب الـ SQL، و Prisma بيفصل القيم عن النص

[[$queryRaw]] بيبعت SQL انت كاتبه بإيدك. الحتة المهمة في الدرس كله هي إن القيم اللي جوه [[$__{...}]] مش بتتلزق في النص: بتتحوّل [[$1]] و [[$2]] وتتبعت لوحدها.

اتشغّل بـ Prisma 7.10.0 على ويندوز، و PostgreSQL 18 في Docker، والـ client بـ [[log: ["query"]]]. وفي المثال بدّلنا [[req.query.email]] بقيمة ثابتة، و [[from]] = أول أغسطس 2026، و [[qty = 2]] و [[productId = 1]] و [[orderId = 1]].

---

## ١. يعني إيه tagged template؟

~~~ts
const users = await prisma.$queryRaw$__bt
  SELECT id, email FROM users WHERE email = $__{email}
$__bt;
~~~

- [[$queryRaw]]: الـ [[$]] في أول اسم الدالة معناه إنها مش تبع model معين (زي [[$transaction]] و [[$disconnect]]).
- بعدها على طول backtick **من غير أقواس**. ده اسمه tagged template: JavaScript مبيركّبش النص، بيدّي الدالة حاجتين منفصلين: الأجزاء الثابتة [[["SELECT ... WHERE email = ", ""]]]، والقيم [[[email]]].
- و Prisma بيحط مكان كل قيمة [[$1]] و [[$2]] بالترتيب، ويبعت القيم parameters.

~~~text الناتج
prisma:query
  SELECT id, email FROM users WHERE email = $1

[
  {
    id: '10e33f58-135f-4551-9b7a-3cf8c598ebcf',
    email: 'sara@example.com'
  }
]
~~~

الـ SQL اللي وصل القاعدة فيه [[$1]] مش الإيميل. والنتيجة array من objects عادية، أسماء الخانات هي أسماء الأعمدة بالظبط. وخد بالك: هنا بنكتب [[users]] و [[email]] (أسماء القاعدة)، مش [[User]] (اسم الـ model).

ولو كتبتها بأقواس [[prisma.$queryRaw("SELECT 1")]]:

~~~text الناتج
$__bt$queryRaw$__bt is a tag function, please use it like the following:
...
~~~

---

## ٢. تقرير الإيراد

~~~ts
const revenue = await prisma.$queryRaw<{ month: Date; revenue: string; orders: number }[]>$__bt
~~~

[[<...>]] بعد اسم الدالة ده generic: بتقول لـ TypeScript شكل الصفوف اللي راجعة. هو **وعد منك**، Prisma مش بيتأكد منه.

~~~sql
  SELECT date_trunc('month', created_at) AS month, sum(total)::text AS revenue, count(*)::int AS orders
  FROM orders WHERE status = 'paid' AND created_at >= $__{from}
  GROUP BY 1 ORDER BY 1
~~~

- [[date_trunc('month', created_at)]]: يقصّ التاريخ لأول الشهر (15 أغسطس يبقى 1 أغسطس 00:00).
- [[sum(total)::text]]: مجموع الإجمالي، و [[::text]] تحويل لنص في Postgres.
- [[count(*)::int]]: عدد الصفوف، متحوّل [[int]].
- [[created_at >= $__{from}]]: [[from]] كائن Date بيتبعت parameter.
- [[GROUP BY 1 ORDER BY 1]]: الـ 1 = أول عمود في الـ SELECT (الشهر).

~~~text الناتج
[
  { month: 2026-08-01T00:00:00.000Z, revenue: '360.00', orders: 1 },
  { month: 2026-09-01T00:00:00.000Z, revenue: '1619.00', orders: 5 }
]
~~~

### ليه الـ casts؟

نفس الاستعلام من غير [[::text]] و [[::int]]:

~~~text الناتج
[
  { month: 2026-08-01T00:00:00.000Z, revenue: 360, orders: 1n },
  { month: 2026-09-01T00:00:00.000Z, revenue: 1619, orders: 5n }
]
Do not know how to serialize a BigInt
~~~

- [[1n]]: الـ [[n]] في الآخر معناها JavaScript [[BigInt]]. لأن [[count(*)]] نوعه [[bigint]] في Postgres (ممكن يعدّي ٢ مليار)، و Prisma بيرجّعه BigInt عشان ميضيعش دقة.
- و [[JSON.stringify]] مبيعرفش يحوّل BigInt، فوقع. يعني [[res.json(revenue)]] في Express هيقع بنفس الشكل.
- [[revenue: 360]] شكله رقم، بس هو [[Decimal]] object ([[sum]] على [[numeric]] بيرجع [[numeric]]). اتأكدنا: [[r[0].revenue.constructor.name]] طلع [[Decimal2]].
- الحل: حوّل جوه SQL. [[::int]] للعدد، و [[::text]] للفلوس عشان الرقم يوصل زي ما هو ([['360.00']]).

---

## ٣. [[$executeRaw]]: أمر بيعدّل

~~~ts
const changed = await prisma.$executeRaw$__bt
  UPDATE products SET stock = stock - $__{qty} WHERE id = $__{productId} AND stock >= $__{qty}
$__bt;
~~~

[[$executeRaw]] نفس الفكرة بس بيرجّع **رقم**: عدد الصفوف اللي اتأثرت. و [[$__{qty}]] متكررة مرتين، فاتبعتت مرتين:

~~~text الناتج
prisma:query
  UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $3

changed 1
~~~

وجربنا نفس الأمر بكمية 1000 (أكبر من المخزون):

~~~text الناتج
changed2 0
~~~

صفر = الشرط [[stock >= 1000]] منفعش، فمفيش صف اتعدّل. كده بتعرف إن المخزون مش كفاية من غير ما تقرا الأول (درس atomic UPDATE).

---

## ٤. array كـ parameter

~~~ts
const ids = [1, 2, 3];
const some = await prisma.$queryRaw$__btSELECT name FROM products WHERE id = ANY($__{ids})$__bt;
~~~

~~~text الناتج
prisma:query SELECT name FROM products WHERE id = ANY($1)
[ { name: 'Mug' }, { name: 'Cap' }, { name: 'Pan' } ]
~~~

الـ array كلها اتبعتت parameter واحد [[$1]] (array في Postgres)، و [[= ANY(...)]] = «يساوي أي عنصر فيها». أبسط من [[IN]] اللي محتاج [[$1, $2, $3]].

---

## ٥. [[FOR UPDATE]] جوه transaction

~~~ts
await prisma.$transaction(async (tx) => {
  await tx.$queryRaw$__btSELECT id FROM orders WHERE id = $__{orderId} FOR UPDATE$__bt;
});
~~~

- [[$transaction(async (tx) => {...})]]: transaction تفاعلية. كل اللي بيتعمل بـ [[tx]] (مش [[prisma]]) جوه نفس الـ transaction.
- [[FOR UPDATE]]: اقفل الصف ده لحد ما الـ transaction تخلص.

~~~text الناتج
prisma:query SELECT id FROM orders WHERE id = $1 FOR UPDATE
[ { id: 1 } ]
prisma:query COMMIT
~~~

الـ [[COMMIT]] جه لما الـ callback خلص، وساعتها القفل اتفك.

---

## ٦. الـ solCode: SQL injection بعينك

~~~ts
const email = "sara@example.com' OR '1'='1";
~~~

قيمة «خبيثة»: علامة [[']] تقفل النص، وبعدها [[OR '1'='1']] شرط دايمًا صح.

~~~ts
const safe = await prisma.$queryRaw$__btSELECT id, email FROM users WHERE email = $__{email}$__bt;
const unsafe = await prisma.$queryRawUnsafe($__btSELECT id, email FROM users WHERE email = '$__{email}'$__bt);
const unsafeButParam = await prisma.$queryRawUnsafe("SELECT id, email FROM users WHERE email = $1", email);
console.log((safe as any[]).length, (unsafe as any[]).length, (unsafeButParam as any[]).length);
~~~

- [[safe]]: tagged template.
- [[unsafe]]: [[$queryRawUnsafe]] **بأقواس**، وجواها template literal عادي. هنا JavaScript هو اللي ركّب النص قبل ما Prisma يشوفه.
- [[unsafeButParam]]: [[$queryRawUnsafe]] برضه، بس النص فيه [[$1]] والقيمة بعده argument منفصل.
- [[as any[]]]: النتيجة نوعها [[unknown]]، فبنقول لـ TypeScript «اعتبرها array» عشان نقرا [[length]].

~~~text الناتج
prisma:query SELECT id, email FROM users WHERE email = $1
prisma:query SELECT id, email FROM users WHERE email = 'sara@example.com' OR '1'='1'
prisma:query SELECT id, email FROM users WHERE email = $1
0 6 0
~~~

السطر التاني في الـ log هو المشكلة كلها: القيمة بقت **جزء من الأمر**، والشرط بقى «الإيميل كذا **أو** 1=1»، فرجّع الـ ٦ يوزرز اللي في القاعدة. والاتنين التانيين رجّعوا 0، لأن القاعدة دوّرت على إيميل نصه حرفيًا [[sara@example.com' OR '1'='1]].

~~~ts
const rows: any[] = await prisma.$queryRaw$__btSELECT count(*) AS n FROM orders$__bt;
try { JSON.stringify(rows); } catch (e: any) { console.log(e.message); }
~~~

~~~text الناتج
Do not know how to serialize a BigInt
~~~

نفس مشكلة الـ count من غير cast.

---

## ٧. اللي مينفعش يبقى parameter

جربنا اسم عمود كـ [[$__{}]]:

~~~ts
const col = "email";
await prisma.$queryRaw$__btSELECT email FROM users ORDER BY $__{col} DESC LIMIT 2$__bt;
~~~

~~~text الناتج
prisma:query SELECT email FROM users ORDER BY $1 DESC LIMIT 2
[ { email: 'sara@example.com' }, { email: 'mona@example.com' } ]
~~~

مفيش error، بس الترتيب **مش** بالإيميل تنازلي (كان المفروض sara وبعدها omar). [[$1]] قيمة نصية ثابتة [['email']]، والترتيب بقيمة ثابتة مش بيرتّب حاجة. أسماء الأعمدة والجداول و ASC/DESC محتاجة [[Prisma.raw]] مع whitelist (في «إزاي بيشتغل»).

---

## الخلاصة

| | القيم | آمن؟ | بيرجّع |
|---|---|---|---|
| [[$queryRaw]] + backtick | parameters لوحدها | أيوه | صفوف |
| [[$executeRaw]] + backtick | parameters لوحدها | أيوه | عدد الصفوف |
| [[$queryRawUnsafe(str, ...values)]] بـ [[$1]] | parameters | أيوه | صفوف |
| [[$queryRawUnsafe]] بـ template literal فيه قيمة | ملزوقة في النص | **لأ**: SQL injection | صفوف |

- tagged template = backtick من غير أقواس.
- أسماء القاعدة ([[users]] و [[created_at]])، مش أسماء الـ models.
- [[count(*)]] بيرجع BigInt و [[numeric]] بيرجع Decimal: حوّلهم بـ [[::int]] و [[::text]].
- الـ generic [[<...>]] وعد منك، مش فحص.`,
          lines: [
            "قيمة جاية من اليوزر.",
            "SQL خام كـ tagged template (backtick من غير أقواس):",
            "الإيميل بيتبعت parameter ($1)، مش بيتلزق في النص.",
            "قفلة.",
            "تقرير الإيراد الشهري، والـ type اللي متوقعه (وعد منك، مش متأكد منه):",
            "count متحوّل int و sum متحوّل text، عشان ميرجعوش BigInt و Decimal.",
            "المدفوع من تاريخ معين، والتاريخ parameter.",
            "مجمّع ومترتب بالشهر.",
            "قفلة.",
            "أمر بيعدّل: بيرجّع عدد الصفوف اللي اتغيرت.",
            "خصم المخزون بشرط، وكل القيم parameters.",
            "قفلة. لو changed = 0 يبقى المخزون مش كفاية.",
            "array ids.",
            "ANY بياخد الـ array كـ parameter واحد.",
            "transaction تفاعلية:",
            "اقفل صف الأوردر لحد آخر الـ callback (مفيش FOR UPDATE في API بتاع Prisma).",
            "قفلة."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue, count(*) AS orders
FROM orders
WHERE status = 'paid'
GROUP BY 1
ORDER BY 1;`,
            expectSql: R`SELECT date_trunc('month', created_at), sum(total), count(*) FROM orders WHERE status = 'paid' AND created_at >= '2026-08-01' GROUP BY 1 ORDER BY 1;`,
            solution: R`SELECT date_trunc('month', created_at) AS month, sum(total)::text AS revenue, count(*)::int AS orders
FROM orders
WHERE status = 'paid' AND created_at >= '2026-08-01'
GROUP BY 1
ORDER BY 1;`,
            ordered: true
          }
        },
        {
          cmd: "N+1",
          title: "query جوه loop: ليه الصفحة بتبطأ مع كل يوزر جديد",
          desc: R`N+1 يعني: استعلام واحد يجيب قايمة (N صف)، وبعدين استعلام لكل صف يجيب حاجة مرتبطة بيه. ١٠٠ يوزر = ١٠١ استعلام. كل واحد سريع لوحده، بس الـ round trips بتتجمع، والصفحة اللي كانت سريعة وفيها ١٠ يوزرز بتبقى بطيئة لما يبقوا ١٠٠٠.

المشكلة إن الكود شكله بريء: [[for (const u of users) { await prisma.order.findMany({ where: { userId: u.id } }) }]]. ومش هتلاقيها غير لما تشغّل [[log: ["query"]]] وتشوف نفس الـ SELECT بيتكرر.

الحل: اطلب العلاقة مع القايمة ([[include]] أو [[select]] للعلاقة)، و Prisma هيجيب الكل باستعلامين: واحد لليوزرز، وواحد للأوردرات بـ [[WHERE user_id IN (...)]]. أو اجمع الـ ids بنفسك واعمل استعلام واحد بـ [[in]]، أو اكتب JOIN أو json_agg بـ $queryRaw.`,
          example: R`const users = await prisma.user.findMany({ take: 100 });
for (const u of users) {
  const orders = await prisma.order.findMany({ where: { userId: u.id } });
  console.log(u.email, orders.length);
}

const withOrders = await prisma.user.findMany({
  take: 100,
  include: { orders: { select: { id: true, total: true } } },
});

const counts = await prisma.user.findMany({
  take: 100,
  select: { email: true, _count: { select: { orders: true } } },
});

const userIds = users.map((u) => u.id);
const orders = await prisma.order.findMany({ where: { userId: { in: userIds } } });
const byUser = Map.groupBy(orders, (o) => o.userId);`,
          try: R`اعمل ٢٠٠ يوزر بأوردرات (بـ createMany، أو بسكربت الـ seed في درس faker)، و [[log: ["query"]]] شغال. شغّل الـ loop الأول وعدّ سطور [[prisma:query]]، وقيس الوقت بـ [[console.time]]. وبعدين نفس الحاجة للـ include، وللـ _count. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: استعلام واحد بدل الـ loop: لكل يوزر الإيميل، وعدد أوردراته، ووقت آخر أوردر (NULL لو ملوش)، واليوزر اللي ملوش أوردرات يطلع بـ 0.`,
          sol: R`الـ loop هيطبع ٢٠١ سطر [[prisma:query]]: واحد [[SELECT ... FROM "public"."users"]] وبعده ٢٠٠ مرة [[SELECT ... FROM "public"."orders" WHERE "public"."orders"."user_id" = $1]]. الـ include هيطبع سطرين بس: اليوزرز، وبعدهم [[... WHERE "public"."orders"."user_id" IN ($1,$2,...)]]. والـ _count سطر واحد: الـ count بيتحسب بـ LEFT JOIN على subquery فيها [[COUNT(*)]] و GROUP BY، جوه نفس الاستعلام.

الوقت على القاعدة اللي على جهازك ممكن يبان قريب (كل استعلام أقل من ملّي ثانية)، لأن مفيش network. الفرق الحقيقي بيبان لما القاعدة على سيرفر تاني: لو كل round trip بياخد ٢٠ ملّي ثانية (Supabase من منطقة بعيدة مثلًا)، الـ loop هياخد حوالي ٤ ثواني والـ include حوالي ٤٠ ملّي ثانية. عشان كده N+1 بيعدّي في التطوير ويبان في الإنتاج.

ولو عدد السطور في الـ include طلع أكتر من ٢، اتأكد إنك مش عامل include جوه include، كل مستوى بيزوّد استعلام واحد (مش N).`,
          solCode: R`import { prisma } from "./db";

console.time("loop");
const users = await prisma.user.findMany({ take: 200 });
for (const u of users) {
  await prisma.order.findMany({ where: { userId: u.id } });
}
console.timeEnd("loop");

console.time("include");
await prisma.user.findMany({ take: 200, include: { orders: true } });
console.timeEnd("include");

console.time("count");
await prisma.user.findMany({ take: 200, select: { email: true, _count: { select: { orders: true } } } });
console.timeEnd("count");
await prisma.$disconnect();`,
          flag: "script",
          deep: {
            why: "N+1 أشهر مشكلة أداء في أي تطبيق بيستخدم ORM، وسؤال شبه ثابت في انترفيوهات الـ backend. ومش بتبان في التطوير (داتا قليلة وقاعدة على نفس الجهاز)، وتظهر فجأة في الإنتاج لما الداتا تكبر.",
            how: R`التكلفة مش في الاستعلام نفسه، في الـ round trip: الكود بيبعت، ويستنى الشبكة، والقاعدة تعمل parse و plan وتنفّذ، والرد يرجع. ١٠٠ مرة ورا بعض بـ await يعني ١٠٠ مرة الانتظار ده. و [[Promise.all]] على الـ loop بيوازي الانتظار، بس بيبعت ١٠٠ استعلام في نفس اللحظة ويقفل الـ connection pool (الافتراضي في pg ١٠ اتصالات). فده مش حل.

أشكاله المستخبية:

في الـ serializer أو الـ mapper: دالة [[toDTO(order)]] جواها [[await prisma.user.findUnique]].

في GraphQL: resolver لكل حقل علاقة بيتنادي لكل أب (والحل DataLoader: بيجمع الـ ids في نفس الـ tick ويعمل استعلام واحد).

في React Server Components: component لكل صف بيعمل fetch لوحده.

الـ polymorphic relations (زي [[paymentableId]] و [[paymentableType]] في درس one-to-many): مفيش FK، فمفيش include، فالكود بيجيب كل واحدة لوحدها.

الحلول بالترتيب: include أو select للعلاقة. [[_count]] لو محتاج العدد بس. [[in]] بالـ ids وتجمّع في الكود ([[Map.groupBy]] موجودة من Node 21). SQL واحد بـ JOIN أو json_agg أو LATERAL عن طريق $queryRaw لو الشكل معقد.

وإزاي تكتشفه: [[log: ["query"]]] في التطوير، و test بيعدّ الاستعلامات (event [[query]] من الـ client)، و [[pg_stat_statements]] في الإنتاج (نفس الاستعلام بـ [[calls]] رقم ضخم)، أو APM زي Sentry بيوريك نفس الـ span متكرر.`,
            when: "راجع أي loop فيه await على القاعدة، وأي دالة بتتنادي لكل عنصر في list وجواها query. والقاعدة: عدد الاستعلامات في الصفحة لازم يبقى ثابت، مش بيكبر مع عدد الصفوف.",
            mistakes: R`[[Promise.all]] على الـ loop وتفتكر إنك حليتها. include متداخل كتير من غير take فبدل N+1 عندك استعلام بيرجّع ميجات. [[findUnique]] جوه map في الـ serializer. تقيس في التطوير على ١٠ صفوف وتقول «سريع». وفي الانترفيو: «إيه هي مشكلة N+1 وإزاي بتحلها؟» عرّفها بالأرقام (استعلام للقايمة و N للتفاصيل)، وقول إزاي بتكتشفها (query log أو APM)، والحل (eager loading بـ include أو JOIN أو batching بـ IN أو DataLoader).`
          },
          teach: R`## الفكرة: عدّ سطور [[prisma:query]]

المثال فيه ٤ طرق تجيب «اليوزرز وأوردراتهم». كلهم بيرجّعوا نفس الداتا تقريبًا، والفرق الوحيد **عدد الاستعلامات**. وأسهل طريقة تشوف الفرق: [[log: ["query"]]] شغال، وتعدّ.

اتشغّل بـ Prisma 7.10.0 على ويندوز، و PostgreSQL 18 في Docker على نفس الجهاز. ضفنا ٢٠٠ يوزر بـ [[createMany]] (عندهم من ٠ لـ ٣ أوردرات)، فبقى في القاعدة ٢٠٦ يوزر و ٣١٠ أوردر.

---

## ١. الـ loop: ده الـ N+1

~~~ts
const users = await prisma.user.findMany({ take: 100 });
~~~

الـ **1**: استعلام واحد يجيب ١٠٠ يوزر.

~~~ts
for (const u of users) {
  const orders = await prisma.order.findMany({ where: { userId: u.id } });
  console.log(u.email, orders.length);
}
~~~

- [[for (const u of users)]]: لف على اليوزرز واحد واحد.
- [[await prisma.order.findMany(...)]] جوه الـ loop: استعلام لكل يوزر. و [[await]] معناها استنى الرد قبل اللفة الجاية، فالـ ١٠٠ استعلام ورا بعض مش مع بعض.
- ده الـ **N** (N = ١٠٠).

~~~text الناتج (أول ٣ سطور طباعة)
u40@example.com 0
u25@example.com 1
u62@example.com 2
~~~

والـ log:

~~~text الناتج
prisma:query SELECT "public"."users"."id", "public"."users"."email", "public"."users"."name", "public"."users"."created_at" FROM "public"."users" WHERE 1=1 ORDER BY "public"."users"."id" ASC LIMIT $1 OFFSET $2
prisma:query SELECT ... FROM "public"."orders" WHERE "public"."orders"."user_id" = $1 OFFSET $2
prisma:query SELECT ... FROM "public"."orders" WHERE "public"."orders"."user_id" = $1 OFFSET $2
prisma:query SELECT ... FROM "public"."orders" WHERE "public"."orders"."user_id" = $1 OFFSET $2
... (نفس السطر ١٠٠ مرة)
~~~

نفس الـ SELECT بالظبط بيتكرر، والفرق بس في قيمة [[$1]]. ده شكل N+1 في أي log.

وحاجة جانبية: [[take]] من غير [[orderBy]] خلّى Prisma يحط [[ORDER BY id ASC]] لوحده. والـ id هنا uuid عشوائي، فده سبب إن أول يوزر طلع u40 مش u0.

---

## ٢. الحل الأول: [[include]]

~~~ts
const withOrders = await prisma.user.findMany({
  take: 100,
  include: { orders: { select: { id: true, total: true } } },
});
~~~

نفس الـ ١٠٠ يوزر، و [[include]] بيضيف أوردرات كل واحد، ومن الأوردر [[id]] و [[total]] بس.

~~~text الناتج
prisma:query SELECT ... FROM "public"."users" WHERE 1=1 ORDER BY "public"."users"."id" ASC LIMIT $1 OFFSET $2
prisma:query SELECT "public"."orders"."id", "public"."orders"."total", "public"."orders"."user_id" FROM "public"."orders" WHERE "public"."orders"."user_id" IN ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,...)
~~~

استعلامين بس: اليوزرز، وبعدين أوردرات الـ ١٠٠ كلهم بـ [[IN (...)]] فيها ١٠٠ id. و [[user_id]] اتطلب مع إنه مش في الـ select، عشان Prisma يوزّع الأوردرات على أصحابها. ونتيجة يوزر عنده أوردرين:

~~~text الناتج
[{"id":102,"total":"100"},{"id":103,"total":"100"}]
~~~

---

## ٣. لو محتاج العدد بس: [[_count]]

~~~ts
const counts = await prisma.user.findMany({
  take: 100,
  select: { email: true, _count: { select: { orders: true } } },
});
~~~

~~~text الناتج
[{"email":"u40@example.com","_count":{"orders":0}},{"email":"u25@example.com","_count":{"orders":1}}, ...]
~~~

استعلام **واحد**: الـ count بيتحسب جوه القاعدة بـ [[LEFT JOIN]] على subquery فيها [[COUNT(*)]] و [[GROUP BY]] (اتفكّ في درس relation filters). والأوردرات نفسها مبتتنقلش خالص.

---

## ٤. الحل اليدوي: [[in]] و [[Map.groupBy]]

~~~ts
const userIds = users.map((u) => u.id);
~~~

[[map]] بتعمل array جديدة: من كل يوزر خد الـ id. النتيجة ١٠٠ id.

~~~ts
const orders = await prisma.order.findMany({ where: { userId: { in: userIds } } });
~~~

[[{ in: userIds }]] = [[WHERE user_id IN (...)]]: كل أوردرات الـ ١٠٠ في استعلام واحد.

~~~ts
const byUser = Map.groupBy(orders, (o) => o.userId);
~~~

[[Map.groupBy]] (موجودة من Node 21): بتقسّم الـ array لمجموعات، والمفتاح اللي الدالة بترجّعه ([[o.userId]]). النتيجة [[Map]]: لكل userId الـ array بتاعة أوردراته.

~~~text الناتج (اطبعنا الأعداد)
143 73 0 u40@example.com
~~~

يعني: ١٤٣ أوردر رجعوا، متوزعين على ٧٣ يوزر (الـ ٢٧ الباقيين ملهمش أوردرات، فمش في الـ Map). و [[byUser.get(u40)]] رجّع [[undefined]]، فلازم [[?? []]] أو [[?.length ?? 0]] لما تقرا منه.

عدد سطور [[prisma:query]] في السكربت كله كان **105**: ١٠١ للـ loop، و ٢ للـ include، و ١ للـ _count، و ١ للـ in.

---

## ٥. الـ solCode: نقيس الوقت

~~~ts
console.time("loop");
...
console.timeEnd("loop");
~~~

[[console.time("اسم")]] بيبدأ ساعة، و [[console.timeEnd("نفس الاسم")]] بيوقّفها ويطبع الوقت. على ٢٠٠ يوزر:

~~~text الناتج
loop: 464.767ms
include: 12.987ms
count: 6.281ms
~~~

وعدد سطور [[prisma:query]]: **204** = ٢٠١ للـ loop + ٢ للـ include + ١ للـ count.

اقرا الأرقام: الـ loop أبطأ ٣٥ مرة من الـ include، والقاعدة **على نفس الجهاز**، يعني كل round trip حوالي ٢ ملّي ثانية. لو القاعدة على سيرفر بعيد والـ round trip ٢٠ ملّي، الـ ٢٠١ استعلام لوحدهم يبقوا حوالي ٤ ثواني، والـ include يفضل في حدود ٤٠ ملّي.

---

## الخلاصة

| الطريقة | عدد الاستعلامات لـ N يوزر | امتى |
|---|---|---|
| loop بـ [[await]] | N + 1 | أبدًا |
| [[include]] / [[select]] للعلاقة | 2 (واحد لكل مستوى) | محتاج الأولاد نفسهم |
| [[_count]] | 1 | محتاج العدد بس |
| [[in]] + [[Map.groupBy]] | 2 | الداتا جاية من حتة تانية أو شكل مش مدعوم |
| SQL بـ JOIN في [[$queryRaw]] | 1 | تقرير بشكل معقد |

- علامة N+1 في الـ log: نفس الـ SELECT متكرر وبيتغيّر فيه [[$1]] بس.
- عدد الاستعلامات في الصفحة لازم يبقى ثابت مهما زاد عدد الصفوف.`,
          lines: [
            "استعلام واحد: ١٠٠ يوزر (الـ 1).",
            "لكل يوزر:",
            "استعلام لأوردراته (الـ N): ١٠٠ استعلام ورا بعض.",
            "اطبع.",
            "قفلة الـ loop. الإجمالي ١٠١ استعلام.",
            "الحل: نفس القايمة،",
            "١٠٠ يوزر،",
            "ومعاهم أوردراتهم: Prisma بيجيبهم باستعلام تاني واحد بـ IN.",
            "قفلة. الإجمالي ٢ استعلام.",
            "لو محتاج العدد بس:",
            "١٠٠ يوزر،",
            "والعدد من غير ما تجيب الأوردرات.",
            "قفلة.",
            "أو يدوي: اجمع الـ ids،",
            "استعلام واحد بـ IN،",
            "وقسّم النتيجة على اليوزرز في الكود."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');`,
            starter: R`SELECT u.email, count(*) AS orders, max(o.created_at) AS last_order
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`,
            expectSql: R`SELECT u.email, (SELECT count(*) FROM orders o WHERE o.user_id = u.id), (SELECT max(created_at) FROM orders o WHERE o.user_id = u.id) FROM users u;`,
            solution: R`SELECT u.email, count(o.id) AS orders, max(o.created_at) AS last_order
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`
          }
        }
      ]
    }
]);
