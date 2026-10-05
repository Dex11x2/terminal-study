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

الأخطاء الشائعة: لو نسيت [[import "dotenv/config"]] في ملف الـ config، الـ CLI مش هيلاقي الرابط. ولو كتبت [[npm i -D prisma]] من غير [[@7]]، ممكن تنزل نسخة 8 (وقت كتابة الدرس الـ tag [[latest]] بتاع الـ CLI كان بيشاور على 8.0.0-rc)، و 8 ليها API مختلف تمامًا. ولو استوردت [[PrismaClient]] من [[@prisma/client]] بدل الفولدر المتولّد هيقولك إن الـ client مش متولّد. ولو السكربت فيه top-level await واشتكى من [[cjs]]، يبقى ناقصك [[type=module]] في package.json.`,
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

والخلط بين الشكلين في نفس الـ array هيطلع validation error زي [[Argument product is missing]]. Prisma عنده شكلين للـ input: «checked» بالعلاقات ([[product: { connect }]]) و «unchecked» بالـ ids الخام ([[productId]]). الشكل بيتحدد للـ create كله، فاختار واحد والتزم بيه. والـ unchecked ([[productId]]) مش متاح لما تكون جوه nested create للأب، لأن [[orderId]] لسه مش معروف.`,
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
