// تكملة تاب projects: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/projects/01.js (شرح حقول الدرس في أوله)
MORE("projects", [
    {
      t: "مشروع ٦: Next.js full-stack على دومين",
      l: 3,
      n: "حتة من myapp: كورسات عامة بـ SEO، ودخول واشتراك، واختبارات و CI، و Docker و Caddy بـ SSL على دومين، و Sentry",
      items: [
        {
          cmd: "مشروع ٦: الـ spec والهيكل الماشي",
          title: "تبدأ مشروع Next.js وترفعه قبل ما تكتب أي ميزة إزاي؟",
          desc: R`المشروع: حتة حقيقية من «myapp»، منصة الكورسات اللي تاب «بناء مشروع كامل» ماشي بيها من أوله لآخره. الحتة دي: صفحة كورسات عامة، وصفحة لكل كورس بـ SEO، وتسجيل ودخول، واشتراك في كورس مجاني، وصفحة «كورساتي». والمشروع الجاي (٧) بيضيف عليه الدفع أو الـ realtime أو AI.

الفرق عن تاب «بناء مشروع كامل»: هناك الـ stack هو Next للواجهة و API منفصل بـ Express. هنا Next.js لوحده (Server Components و Server Actions و Route Handlers و Prisma جوه نفس التطبيق)، وده الاختيار الأول في درس [[اختيار الـ stack]]: deploy واحد ولغة واحدة، ومناسب لـ MVP. ولما تحتاج API لتطبيق موبايل أو شغل طويل، بتفصل بعدين.

المحطة دي هي الـ «walking skeleton» من درس [[ترتيب البناء]]: خلصت يعني (١) [[create-next-app]] و Prisma 7 على Postgres، و [[prisma db seed]] بيحط ٣ كورسات (واحد مش منشور). (٢) [[GET /api/health]] بيعمل [[SELECT 1]] ويرجّع [[{ ok, version }]]، و 503 لو القاعدة واقعة. (٣) الصفحة الرئيسية بتعرض الكورسات المنشورة من القاعدة. (٤) [[npm run build]] بينجح من غير قاعدة بيانات (الصفحات dynamic).

الدروس: [[create-next-app]] و [[App Router]] و [[route.ts]] و [[Server Components]] في تاب «Next.js»، و [[إعداد Prisma 7]] في تاب «SQL و Prisma»، و [[prisma db seed و studio]] في تاب «Node و npm»، و [[user stories]] و [[MVP]] و [[health و uptime]] في تاب «بناء مشروع كامل».`,
          example: R`npx create-next-app@latest myapp-web --ts --app --eslint --no-tailwind --no-src-dir --import-alias "@/*"
cd myapp-web
npm i @prisma/client@7 @prisma/adapter-pg@7 pg better-auth zod server-only
npm i -D prisma@7 tsx dotenv vitest @playwright/test @types/node@24
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
curl -s localhost:3000/api/health`,
          try: R`اعمل المشروع، و [[prisma.config.ts]] (فيه [[seed: "tsx prisma/seed.ts"]])، و [[Course]] في الـ schema، و [[lib/db.ts]]، و [[prisma/seed.ts]]، و [[app/api/health/route.ts]]، والصفحة الرئيسية تعرض الكورسات المنشورة. وبعدين: وقّف Postgres ([[sudo service postgresql stop]]) واطلب [[/api/health]]، ورجّعه. واعمل [[DATABASE_URL=postgresql://x@127.0.0.1:1/x npm run build]]: لازم ينجح.`,
          deep: {
            why: R`أغلب مشاكل Next في الإنتاج مش في الميزات: build بيحاول يكلم القاعدة ويقع في Docker، أو env مش موجودة وقت الـ build، أو health check مش موجود فمحدش يعرف إن السيرفر واقع. الـ skeleton بيطلّع المشاكل دي وهي صغيرة، قبل ما يبقى فوقها ١٠ ميزات.`,
            how: R`[[lib/db.ts]]: [[PrismaClient]] واحد بـ [[PrismaPg]] adapter، ومحفوظ في [[globalThis]] في الـ dev، لأن الـ hot reload بيعيد تحميل الملف فيفتح اتصالات جديدة كل مرة لحد ما Postgres يقول «too many clients».

ليه الـ build مش محتاج القاعدة؟ الـ layout بينادي [[getSession()]] اللي بتقرا [[headers()]]، فكل الصفحات بقت dynamic (بتترسم مع كل طلب). و [[sitemap.ts]] فيه [[await connection()]] لنفس السبب. لو صفحة بتقرا القاعدة من غير أي API dynamic، Next هيحاول يعملها static وقت الـ build، والـ build في Docker هيقع لأن مفيش قاعدة. الحل التاني: ISR ([[revalidate]]) بس وقتها الـ build محتاج قاعدة فعلًا.

الـ seed بـ [[upsert]] على [[slug]]: تقدر تشغّله ١٠ مرات من غير تكرار. والكورس المش منشور موجود قصد: عشان تختبر إنه مبيظهرش.

و [[/api/health]] بيرجّع [[GIT_SHA]] كـ version: بعد كل deploy تقدر تتأكد إن النسخة الجديدة هي اللي شغالة. و [[Cache-Control: no-store]] عشان مفيش CDN يكاشه.

الـ seed في Prisma 7 بيتعرّف في [[prisma.config.ts]] ([[migrations.seed]])، وملف الـ seed فيه [[main()]] مش top-level await، لأن المشروع مش [[type: module]] وأي top-level await جوه tsx بيقع (مع tsx 4 و esbuild: [[Top-level await is currently not supported with the "cjs" output format]]، جرّبناها).`,
            when: R`أول يوم. ومتكتبش ولا ميزة قبل ما [[/api/health]] يشتغل على رابط حقيقي (محطة Docker والدومين). ممكن تقدّم المحطة الخامسة لهنا لو عندك سيرفر جاهز.`,
            mistakes: R`[[new PrismaClient()]] في كل ملف. أو صفحات بتتعمل static وقت الـ build وبتقرا القاعدة، فالـ build يقع في CI. أو health check بيرجّع 200 دايمًا من غير ما يلمس القاعدة. أو seed بـ [[create]] فبيتكرر. أو [[npm i -D vitest]] على قالب [[create-next-app]] زي ما هو: القالب فيه [[@types/node@^20]]، و Vitest 5 عايز [[^22]] أو [[24+]]، فـ npm بيقع بـ [[ERESOLVE]]؛ عشان كده [[@types/node@24]] في نفس السطر. أو [[.env]] فيه باسورد القاعدة الحقيقي وبيترفع (شوف [[.env لكل بيئة]] في تاب «بناء مشروع كامل»).`
          },
          teach: R`## الفكرة: هيكل ماشي من الأول للآخر

«walking skeleton» يعني أصغر نسخة من التطبيق فيها **كل الطبقات** متوصّلة: صفحة بتقرا من القاعدة، و endpoint بيقول «أنا عايش والقاعدة شغالة»، و build بينجح. مفيش ميزات لسه. اتبنى فعلًا على ويندوز 11 بـ Node 24.19: Next.js 16.4.0، و React 19.3، و Prisma 7.10، و better-auth 1.7.7، و Vitest 5.0.3، و Postgres 18 في Docker.

---

## ١. المثال سطر سطر

### [[create-next-app]]

~~~bash
npx create-next-app@latest myapp-web --ts --app --eslint --no-tailwind --no-src-dir --import-alias "@/*"
~~~

| الخيار | معناه |
|---|---|
| [[myapp-web]] | اسم الفولدر |
| [[--ts]] | TypeScript |
| [[--app]] | App Router (فولدر [[app/]]، وكل فولدر فيه [[page.tsx]] = صفحة) |
| [[--eslint]] | ملف إعداد ESLint و script [[lint]] |
| [[--no-tailwind]] | من غير Tailwind (CSS عادي في [[globals.css]]) |
| [[--no-src-dir]] | [[app/]] و [[lib/]] في جذر المشروع مش جوه [[src/]] |
| [[--import-alias "@/*"]] | [[@/lib/db]] بدل [[../../lib/db]] من أي مكان |

ممكن يسألك أسئلة تانية (React Compiler، وملف [[AGENTS.md]]). إحنا زودنا [[--yes]] (الافتراضي لأي حاجة متقالتش) و [[--disable-git]]:

~~~text الناتج (آخره)
added 344 packages, and audited 345 packages in 56s
Generating route types...
✓ Types generated successfully
Success! Created myapp-web at C:\Users\ali\...\myapp-web
~~~

### المكتبات

~~~bash
npm i @prisma/client@7 @prisma/adapter-pg@7 pg better-auth zod server-only
npm i -D prisma@7 tsx dotenv vitest @playwright/test @types/node@24
~~~

[[@7]] بعد اسم الباكدج = آخر نسخة من الإصدار 7. [[server-only]] باكدج فاضية تقريبًا: أي ملف بيستوردها، لو حد استورده في كومبوننت بيشتغل في المتصفح، الـ build بيقع. فبتحمي الكود اللي فيه أسرار.

ليه [[@types/node@24]]؟ القالب جاي بـ [[@types/node@^20]]، و Vitest 5 بيطلب [[^22]] أو [[24]] وأحدث. من غيرها السطر التاني وقع:

~~~text الناتج
npm error ERESOLVE could not resolve
npm error While resolving: vitest@5.0.3
npm error Found: @types/node@20.19.43
npm error Could not resolve dependency:
npm error peerOptional @types/node@"^22.0.0 || >=24.0.0" from vitest@5.0.3
~~~

[[peerOptional]] يعني «مش لازم تسطّبها، بس لو موجودة لازم تبقى من النسخ دي».

### الـ migration والـ generate والـ seed

~~~bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
~~~

نفس فكرة مشروع ٥: [[migrate dev]] بيكتب SQL وينفّذه، و [[generate]] بيعمل الـ client في [[lib/generated/prisma]] (Prisma 7 مبيعملوش مع الـ migrate). الجداول اللي اتعملت:

~~~text migration.sql (مختصر)
CREATE TABLE "Course" ( ... CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
CREATE TABLE "user" ( ...
CREATE TABLE "session" ( ...
CREATE TABLE "account" ( ...
CREATE TABLE "verification" ( ...
CREATE TABLE "Enrollment" ( ... CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("userId","courseId")
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
~~~

جداول better-auth بحروف صغيرة بسبب [[@@map("user")]] في الـ schema (better-auth متوقع الأسامي دي). و [[Enrollment]] الـ primary key بتاعه **مركّب** ([[@@id([userId, courseId])]]): نفس المستخدم ونفس الكورس مينفعش يتكرروا. والـ seed:

~~~text الناتج
Running seed command $__bttsx prisma/seed.ts$__bt ...
seeded 3 courses

The seed command has been executed.
~~~

### آخر سطر

~~~bash
curl -s localhost:3000/api/health
~~~

(إحنا شغّلنا على بورت 6045.)

~~~text الناتج
HTTP/1.1 200 OK
cache-control: no-store
{"ok":true,"version":"dev"}
~~~

---

## ٢. [[prisma.config.ts]] والـ seed

~~~text prisma.config.ts
migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
~~~

في Prisma 7 أمر الـ seed مكانه هنا. [[tsx]] بيشغّل TypeScript في Node من غير build.

~~~text prisma/seed.ts
const courses = [
  { slug: "bash-basics", title: "أساسيات الترمنال", summary: "...", published: true },
  { slug: "react-from-zero", title: "React من الصفر", summary: "...", published: true },
  { slug: "draft-course", title: "كورس لسه بيتكتب", summary: "مش منشور.", published: false },
];
async function main() {
  for (const c of courses) await db.course.upsert({ where: { slug: c.slug }, update: c, create: c });
  console.log($__btseeded $__{courses.length} courses$__bt);
}
main().finally(() => db.$disconnect());
~~~

- [[slug]]: الاسم اللي في الرابط ([[/courses/react-from-zero]]).
- الكورس التالت [[published: false]] بقصد: عشان نختبر إنه مبيظهرش.
- [[upsert]]: لو فيه كورس بالـ slug ده عدّله ([[update]])، لو لأ اعمله ([[create]]). تشغّل الـ seed ١٠ مرات يفضل ٣ كورسات.
- [[main()]] و [[.finally(...)]] بدل [[await]] برّه أي دالة: المشروع مش [[type: module]]، فـ tsx بيحوّل الملف CommonJS، و top-level await مينفعش فيه. جرّبنا ملف فيه [[await]] في أوله:

~~~text الناتج
Error: Transform failed with 1 error:
...seed2.ts:2:10: ERROR: Top-level await is currently not supported with the "cjs" output format
~~~

- [[.finally(...)]] بيقفل الاتصال سواء نجح أو فشل.

---

## ٣. [[lib/db.ts]]

~~~text lib/db.ts
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
~~~

- [[globalThis]]: الـ object العام اللي بيعيش طول عمر البرنامج. و [[as unknown as {...}]] بيقول لـ TypeScript «اعتبر فيه خانة [[prisma]]».
- [[??]]: لو فيه client محفوظ استخدمه، لو لأ اعمل واحد.
- في الـ dev، كل ما تحفظ ملف Next بيعيد تحميل الموديولات، فلو مفيش الحفظ ده كل مرة هيتعمل client جديد باتصالات جديدة لحد ما Postgres يقول [[too many clients]]. في الإنتاج الملف بيتحمّل مرة واحدة، فمش محتاجينه.
- [[!]] بعد [[DATABASE_URL]]: «مش [[undefined]]».

---

## ٤. [[app/api/health/route.ts]]

~~~text app/api/health/route.ts
export async function GET() {
  try {
    await db.$queryRaw$__btSELECT 1$__bt;
    return Response.json({ ok: true, version: process.env.GIT_SHA ?? "dev" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
~~~

- [[route.ts]] في App Router = endpoint. اسم الدالة هو الـ method: [[GET]].
- [[$queryRaw$__btSELECT 1$__bt]]: أبسط query ممكن. لو القاعدة واقعة بيرمي.
- [[Response.json(body, init)]]: رد JSON. و [[GIT_SHA]] هيتحط في الـ image لما نعمل Docker، فتعرف أنهي commit شغال.
- [[Cache-Control: no-store]]: محدش يكاش الرد ده.
- 503 (Service Unavailable) لو القاعدة مش بترد.

شغّلنا نسخة تانية من التطبيق برابط قاعدة غلط:

~~~text الناتج
HTTP/1.1 503 Service Unavailable
{"ok":false}
~~~

---

## ٥. الـ build من غير قاعدة

~~~bash
DATABASE_URL=postgresql://x@127.0.0.1:1/x npm run build
~~~

[[VAR=value command]] في bash بيحط المتغير للأمر ده بس. البورت 1 مفيش عليه حاجة، يعني «مفيش قاعدة»:

~~~text الناتج
▲ Next.js 16.4.0 (Turbopack)
✓ Compiled successfully in 8.3s
  Finished TypeScript in 3.5s ...
✓ Generating static pages using 12 workers (9/9) in 1000ms

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/auth/[...all]
├ ƒ /api/health
├ ƒ /courses/[slug]
├ ƒ /login
├ ƒ /my
├ ƒ /signup
└ ƒ /sitemap.xml

ƒ  (Dynamic)  server-rendered on demand
~~~

[[ƒ]] = dynamic: الصفحة بتترسم مع كل طلب، فالـ build مش محتاج يكلم القاعدة. ليه كلهم dynamic؟ الـ layout بيقرا الـ session من الـ cookies، وده بيخلي كل صفحة تحته dynamic. ولو صفحة كانت [[○ (Static)]] وبتقرا القاعدة، الـ build كان هيحاول يكلم القاعدة ويقع (وده اللي هيحصل في Docker، لأن القاعدة مش موجودة وقت الـ build).

> الـ build اتعمل بعد ما الصفحات كلها اتكتبت (المحطات الجاية)، عشان كده الـ routes كلها ظاهرة.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[@types/node@24]] | Vitest 5 بيرفض النسخة اللي في القالب |
| [[upsert]] في الـ seed | تشغيله أكتر من مرة مبيكررش |
| كورس مش منشور في الـ seed | عشان تختبر إنه مستخبي |
| [[globalThis]] في [[db.ts]] | الـ hot reload ميفتحش اتصالات لحد ما القاعدة تقفل |
| [[SELECT 1]] في الـ health | 200 بيعني إن القاعدة شغالة فعلًا، و 503 لو لأ |
| كل الصفحات [[ƒ]] | الـ build ينجح من غير قاعدة |`,
          lines: [
            R`مشروع Next بـ TypeScript و App Router و ESLint، من غير Tailwind ومن غير src.`,
            R`ادخل الفولدر.`,
            R`Prisma 7 و adapter الـ Postgres، و better-auth و zod، و [[server-only]].`,
            R`أدوات التطوير: Prisma CLI، و tsx للـ seed، و dotenv، والاختبارات، و [[@types/node@24]] (القالب بيحط 20، و Vitest 5 بيرفضها).`,
            R`أول migration، من [[prisma/schema.prisma]].`,
            R`ولّد الـ client في [[lib/generated/prisma]]. في Prisma 7 الـ migrate مبيعملوش لوحده.`,
            R`حط داتا تجربة من [[prisma/seed.ts]].`,
            R`اتأكد إن السيرفر شايف القاعدة.`
          ],
          sol: R`[[/api/health]] بيرجّع [[{"ok":true,"version":"dev"}]]، ولما Postgres يقف [[503 {"ok":false}]]. والـ build بـ رابط قاعدة غلط نجح وطلّع كل المسارات [[ƒ (Dynamic)]]: [[/]] و [[/courses/[slug]]] و [[/login]] و [[/my]] و [[/signup]] و [[/api/health]] و [[/sitemap.xml]].

الـ schema في الحل المرجعي هو الـ schema الكامل لمشروع ٦: [[Course]] و [[Enrollment]]، وجداول better-auth الأربعة ([[User]] و [[Session]] و [[Account]] و [[Verification]]) اللي [[npx auth@latest generate]] بيكتبها (المحطة التالتة). لو لسه في المحطة دي، [[Course]] لوحده كفاية.

ملحوظة من التجربة: [[npx auth@latest generate]] بيرفض يشتغل لو ملف الـ auth بيستورد حاجة فيها [[import "server-only"]]، وبيقولك شيلها مؤقتًا. عشان كده [[lib/db.ts]] في الحل من غير [[server-only]]، والحماية في [[lib/dal.ts]].`,
          solCode: R`// ── prisma.config.ts ──
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  datasource: { url: process.env["DATABASE_URL"] },
});

// ── prisma/schema.prisma ──
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Course {
  id          String       @id @default(cuid())
  slug        String       @unique
  title       String
  summary     String
  published   Boolean      @default(false)
  createdAt   DateTime     @default(now())
  enrollments Enrollment[]
}

model User {
  id            String       @id
  name          String
  email         String
  emailVerified Boolean      @default(false)
  image         String?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  sessions      Session[]
  accounts      Account[]
  enrollments   Enrollment[]

  @@unique([email])
  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@index([userId])
  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@index([userId])
  @@map("account")
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier])
  @@map("verification")
}

model Enrollment {
  userId    String
  courseId  String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@id([userId, courseId])
}

// ── lib/db.ts ──
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// ── prisma/seed.ts ──
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });
const courses = [
  { slug: "bash-basics", title: "أساسيات الترمنال", summary: "تتحرك بين الفولدرات وتتعامل مع الملفات بثقة.", published: true },
  { slug: "react-from-zero", title: "React من الصفر", summary: "components و state و effects بمشروع حقيقي.", published: true },
  { slug: "draft-course", title: "كورس لسه بيتكتب", summary: "مش منشور.", published: false },
];
async function main() {
  for (const c of courses) await db.course.upsert({ where: { slug: c.slug }, update: c, create: c });
  console.log($__btseeded $__{courses.length} courses$__bt);
}
main().finally(() => db.$disconnect());

// ── app/api/health/route.ts ──
import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.$queryRaw$__btSELECT 1$__bt;
    return Response.json({ ok: true, version: process.env.GIT_SHA ?? "dev" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}`
        },
        {
          cmd: "مشروع ٦: صفحات الكورسات و SEO",
          title: "تعمل صفحات عامة تظهر صح في جوجل وعلى السوشيال إزاي؟",
          desc: R`[[/]] بيعرض الكورسات المنشورة، و [[/courses/[slug]]] صفحة لكل كورس بعنوان ووصف و canonical، و [[/sitemap.xml]] فيه كل الكورسات، والكورس المش منشور أو الـ slug الغلط 404 حقيقي.

خلصت يعني: (١) [[view-source]] على صفحة كورس فيه الاسم والوصف في الـ HTML (مش بيتحمّل بـ JS بعدين). (٢) [[<title>]] بيبقى «اسم الكورس | myapp» و [[meta description]] من الوصف. (٣) [[/courses/draft-course]] بيرجّع status 404 (مش 200 بصفحة مكتوب فيها «مش موجود»). (٤) [[sitemap.xml]] فيه الرابط الكامل لكل كورس منشور. (٥) الصفحة بالعربي [[lang="ar" dir="rtl"]]، و Lighthouse موبايل ٩٠+.

الدروس: [[async component]] و [[[slug] و params]] و [[error.tsx و not-found.tsx]] و [[metadata]] و [[generateMetadata]] و [[sitemap.ts و robots.ts]] و [[static و dynamic]] في تاب «Next.js»، و [[CDN و Core Web Vitals]] في تاب «بناء مشروع كامل».`,
          example: R`export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const course = await getPublished((await params).slug);
  if (!course) return {};
  return { title: course.title, description: course.summary, alternates: { canonical: $__bt/courses/$__{course.slug}$__bt } };
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = await getPublished(slug);
  if (!course) notFound();
  const session = await getSession();
  const enrolled = session ? await isEnrolled(session.user.id, course.id) : false;`,
          try: R`اكتب [[lib/courses.ts]] ([[listPublished]] و [[getPublished(slug)]] بيرجّعوا الأعمدة اللي الصفحات محتاجاها بس)، والصفحة الرئيسية، وصفحة الكورس بـ [[generateMetadata]]، و [[app/sitemap.ts]]، و [[layout.tsx]] بـ [[metadataBase]] و title template. جرّب [[curl -s localhost:3000/courses/react-from-zero | grep -o "<title>[^<]*"]] و [[curl -s -o /dev/null -w "%{http_code}" localhost:3000/courses/draft-course]].`,
          flag: "script",
          deep: {
            why: R`صفحات الكورسات هي اللي بتجيب زوار من جوجل ومن اللينكات اللي بتتشارك على فيسبوك وواتساب. لو المحتوى بيتحمّل بـ JS، أو العنوان واحد لكل الصفحات، أو الكورس المحذوف بيرجّع 200، جوجل هيفهرس حاجات غلط. وده أهم سبب إن myapp اختار Next أصلًا بدل SPA.`,
            how: R`[[generateMetadata]] بتتنفذ على السيرفر قبل الصفحة، وبتجيب الكورس. والصفحة بتجيبه تاني. ده مش query مرتين؟ في الحل آه (استعلامين خفاف). لو عايز واحد: لف [[getPublished]] في [[cache()]] من React، زي [[getSession]] في الـ DAL.

[[notFound()]] بترمي حاجة Next بيمسكها ويرجّع 404 ويعرض [[not-found.tsx]] (أو الافتراضي). مهم إنها تتنادى قبل أي رسم.

[[params]] في Next 16 Promise: [[const { slug } = await params]]. و [[PageProps<"/courses/[slug]">]] نوع بيولّده Next ([[next typegen]] أو أثناء الـ build/dev)، فبيعرف إن فيه [[slug]].

[[metadataBase]] في الـ layout: أي رابط نسبي في الـ metadata (canonical، و Open Graph image) بيتحوّل لرابط كامل بيه. و [[title.template: "%s | myapp"]]: كل صفحة بتحط اسمها بس.

[[sitemap.ts]] بيرجّع array من [[{ url }]]، و Next بيحوّله XML على [[/sitemap.xml]]. [[await connection()]] بيخليه dynamic (من غيرها Next كان هيحاول يعمله وقت الـ build ويقع من غير قاعدة).

[[lib/courses.ts]] مفيهوش أي حاجة Next: دوال عادية بتستخدم Prisma. ده اللي بيخليها تتختبر بـ vitest (المحطة الرابعة) وتستخدم من صفحة، أو action، أو route.`,
            when: R`أي صفحة عامة عايزها تظهر في البحث. الصفحات الخاصة ([[/my]]) عليها [[robots: { index: false }]] ومش في الـ sitemap.`,
            mistakes: R`[["use client"]] على الصفحة كلها و [[useEffect]] للداتا، فالـ HTML فاضي. أو [[if (!course) return <p>مش موجود</p>]] فالـ status 200 (soft 404). أو عنوان ثابت في الـ layout لكل الصفحات. أو الـ sitemap فيه كورسات مش منشورة. أو [[findUnique({ where: { slug } })]] من غير [[published: true]] فالمسودة تتفتح لأي حد عارف الـ slug.`
          },
          teach: R`## الفكرة: كل حاجة جوجل محتاجها موجودة في الـ HTML

الصفحات دي Server Components: بتتنفذ على السيرفر، بتجيب الداتا من القاعدة، وبترجّع HTML كامل فيه الاسم والوصف والعنوان. مفيش [[useEffect]] ولا [[fetch]] من المتصفح. كل اللي تحت اتجرّب بـ curl على [[next start]] (build إنتاج) على بورت 6045.

---

## ١. [[lib/courses.ts]]: الداتا من غير Next

~~~text lib/courses.ts
const card = { id: true, slug: true, title: true, summary: true } as const;

export function listPublished() {
  return db.course.findMany({ where: { published: true }, select: card, orderBy: { createdAt: "asc" } });
}

export function getPublished(slug: string) {
  return db.course.findFirst({ where: { slug, published: true }, select: card });
}
~~~

- [[card]]: الأعمدة اللي الصفحات محتاجاها بس. [[as const]] عشان TypeScript يعرف إنها قيم ثابتة فيطلّع نوع الرد صح.
- [[where: { published: true }]] في الاتنين: المسودة مش بتطلع لا في القايمة ولا لو حد كتب الـ slug بإيده.
- [[findFirst]] مش [[findUnique]]: الـ [[where]] فيه [[published]] كمان، ومش unique.
- الملف ده مفيهوش أي import من Next، فـ Vitest بيختبره عادي (محطة الاختبارات).

---

## ٢. [[layout.tsx]]: الـ metadata العامة

~~~text app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.BETTER_AUTH_URL ?? "http://localhost:3000"),
  title: { default: "myapp: كورسات", template: "%s | myapp" },
  description: "كورسات برمجة بالعربي",
};
~~~

- [[export const metadata]]: Next بيقراه ويحوّله لـ [[<title>]] و [[<meta>]] في الـ [[<head>]].
- [[metadataBase]]: أي رابط نسبي في الـ metadata (زي الـ canonical) بيتكمّل بيه.
- [[title.template]]: [[%s]] مكان عنوان الصفحة. صفحة عنوانها «React من الصفر» تبقى «React من الصفر | myapp». و [[default]] للصفحات اللي مقالتش عنوان.

~~~text app/layout.tsx
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <html lang="ar" dir="rtl">
      ...
          <nav aria-label="الحساب">
            {session ? <Link href="/my">كورساتي ({session.user.name})</Link> : <Link href="/login">دخول</Link>}
          </nav>
      ...
~~~

الـ layout نفسه [[async]] وبيقرا الـ session، وده اللي بيخلي كل الصفحات dynamic (شفناه في المحطة اللي فاتت). و [[lang="ar" dir="rtl"]] على [[<html>]]: قارئ الشاشة بينطق عربي، والصفحة من اليمين.

---

## ٣. المثال سطر سطر: صفحة الكورس

~~~text app/courses/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
~~~

الفولدر اسمه [[[slug]]] بأقواس مربعة: حتة متغيرة في الرابط. و [[generateMetadata]] نسخة دالة من [[metadata]]، لأن العنوان هنا بيعتمد على الداتا. و [[PageProps<"/courses/[slug]">]] نوع Next بيولّده من الـ routes ([[next typegen]] أو وقت الـ build)، فبيعرف إن [[params]] فيه [[slug]].

~~~text app/courses/[slug]/page.tsx
  const course = await getPublished((await params).slug);
  if (!course) return {};
  return { title: course.title, description: course.summary, alternates: { canonical: $__bt/courses/$__{course.slug}$__bt } };
}
~~~

- [[params]] في Next 16 Promise، فـ [[await params]] الأول، وبعدين [[.slug]].
- مش موجود: metadata فاضية (الصفحة نفسها هترجّع 404).
- [[alternates.canonical]]: «الرابط الرسمي للصفحة دي». لو نفس الصفحة اتفتحت بـ [[?utm_source=...]]، جوجل يعرف إنها واحدة.

~~~text app/courses/[slug]/page.tsx
export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = await getPublished(slug);
  if (!course) notFound();
  const session = await getSession();
  const enrolled = session ? await isEnrolled(session.user.id, course.id) : false;
~~~

- [[notFound()]] بترمي حاجة خاصة، Next بيمسكها، يرجّع status 404 ويعرض صفحة [[not-found]]. لازم قبل أي رسم.
- بعد السطر ده TypeScript عارف إن [[course]] مش [[null]] (لأن [[notFound]] نوعها [[never]]: مبترجعش).
- [[session ? ... : false]]: زائر من غير دخول مفيش اشتراك.

وتحت، الجزء اللي بيتغير حسب الحالة:

~~~text app/courses/[slug]/page.tsx
{!session ? (
  <Link href={$__bt/login?next=/courses/$__{slug}$__bt}>سجّل دخول عشان تشترك</Link>
) : enrolled ? (
  <p role="status">انت مشترك في الكورس ده. <Link href="/my">كورساتي</Link></p>
) : (
  <form action={enrollAction.bind(null, slug)}>
    <button type="submit">اشترك ببلاش</button>
  </form>
)}
~~~

الـ [[form]] بـ Server Action، شرحه في المحطة الجاية.

### اللي رجع فعلًا

~~~bash
curl -s localhost:6045/courses/react-from-zero | grep -oE '<title>[^<]*|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>|<html[^>]*>'
~~~

[[grep -o]] بيطبع الحتة اللي طابقت بس، و [[-E]] regex موسّع. و [[[^<]*]] يعني «أي حروف لحد أول [[<]]».

~~~text الناتج
<html lang="ar" dir="rtl">
<title>React من الصفر | myapp
<meta name="description" content="components و state و effects بمشروع حقيقي."/>
<link rel="canonical" href="http://localhost:6045/courses/react-from-zero"/>
~~~

الـ canonical بقى رابط كامل بفضل [[metadataBase]] (اللي هو [[BETTER_AUTH_URL]]، وكان [[http://localhost:6045]] في التجربة).

~~~bash
curl -s -o /dev/null -w "%{http_code}" localhost:6045/courses/draft-course
~~~

[[-o /dev/null]] ارمي الـ body، و [[-w "%{http_code}"]] اطبع الـ status بس:

~~~text الناتج
draft: 404
nope: 404
~~~

المسودة والـ slug اللي مش موجود: 404 حقيقي، مش 200 بصفحة مكتوب فيها «مش موجود».

---

## ٤. الصفحة الرئيسية

~~~text app/page.tsx
export default async function HomePage() {
  const courses = await listPublished();
  return (
    <main>
      <h1>الكورسات</h1>
      {courses.length === 0 ? <p>مفيش كورسات منشورة لسه.</p> : (
        <ul className="cards">
          {courses.map(c => (
            <li key={c.id}>
              <h2><Link href={$__bt/courses/$__{c.slug}$__bt}>{c.title}</Link></h2>
              <p>{c.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
~~~

كومبوننت [[async]] بيستنى الداتا ويرسم. وفي الـ HTML اللي رجع:

~~~text الناتج
<h2><a href="/courses/bash-basics">أساسيات الترمنال</a></h2><p>تتحرك بين الفولدرات وتتعامل مع الملفات بثقة.</p>
<h2><a href="/courses/react-from-zero">React من الصفر</a></h2><p>components و state و effects بمشروع حقيقي.</p>
~~~

كورسين بس، والمسودة مش موجودة.

---

## ٥. [[sitemap.ts]]

~~~text app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const base = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const courses = await listPublished();
  return [{ url: base }, ...courses.map(c => ({ url: $__bt$__{base}/courses/$__{c.slug}$__bt }))];
}
~~~

- ملف اسمه [[sitemap.ts]] في [[app/]]: Next بيخدمه على [[/sitemap.xml]] ويحوّل الـ array لـ XML.
- [[await connection()]]: «الحتة دي محتاجة طلب حقيقي». بيخلي الملف dynamic. من غيره Next هيحاول يعمله وقت الـ build ويكلم القاعدة.
- [[...courses.map(...)]]: الصفحة الرئيسية وبعدها رابط لكل كورس منشور.

~~~text الناتج: /sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>http://localhost:6045</loc>
</url>
<url>
<loc>http://localhost:6045/courses/bash-basics</loc>
</url>
<url>
<loc>http://localhost:6045/courses/react-from-zero</loc>
</url>
</urlset>
~~~

> Lighthouse متشغّلش في التجربة دي؛ شغّله من DevTools > Lighthouse > Mobile على الـ build.

---

## الخلاصة

| المطلوب | فين |
|---|---|
| الاسم والوصف في الـ HTML | Server Component بيجيب الداتا قبل الرسم |
| [[<title>]] لكل صفحة | [[generateMetadata]] و [[title.template]] |
| canonical كامل | [[alternates.canonical]] و [[metadataBase]] |
| 404 حقيقي | [[notFound()]] قبل الرسم |
| المسودات مستخبية | [[published: true]] في كل query |
| sitemap من القاعدة | [[app/sitemap.ts]] و [[connection()]] |`,
          lines: [
            R`الـ metadata بتاعة الصفحة بتتحسب على السيرفر:`,
            R`هات الكورس المنشور بالـ slug (الـ [[params]] Promise في Next 16).`,
            R`مش موجود: metadata فاضية (الصفحة نفسها هترجّع 404).`,
            R`العنوان والوصف من الداتا، والـ canonical رابط نسبي بيكمله [[metadataBase]].`,
            R`قفلة الدالة.`,
            R`الصفحة نفسها، server component بـ async.`,
            R`الـ slug من الـ URL.`,
            R`هات الكورس.`,
            R`مش موجود أو مش منشور: 404 حقيقي.`,
            R`الجلسة (ممكن تبقى null لو زائر).`,
            R`مشترك ولا لأ، بس لو فيه جلسة.`
          ],
          sol: R`[[<title>React من الصفر | myapp]]، و [[draft-course]] بيرجّع [[404]]. و [[/sitemap.xml]] فيه ٣ روابط: الرئيسية والكورسين المنشورين. اختبار Playwright بيتأكد من الـ title ([[toHaveTitle("React من الصفر | myapp")]]) ومن الـ 404 ([[res.status()]]).

الحل المرجعي فيه [[lib/courses.ts]] و [[layout.tsx]] والصفحتين والـ sitemap. [[lib/courses.ts]] فيه كمان [[enroll]] و [[myCourses]] اللي هتستخدمهم في المحطة الجاية.

لو صفحة الكورس ظهرت في الـ build كـ [[○ (Static)]]: مفيش حاجة dynamic فيها، وهتقرا القاعدة وقت الـ build. في الحل ده مش هيحصل لأن الـ layout بيقرا الـ session، بس لو شلت الـ session من الـ layout خلي بالك.`,
          solCode: R`// ── lib/courses.ts ──
import { db } from "@/lib/db";

export class CourseNotFound extends Error {}

const card = { id: true, slug: true, title: true, summary: true } as const;

export function listPublished() {
  return db.course.findMany({ where: { published: true }, select: card, orderBy: { createdAt: "asc" } });
}

export function getPublished(slug: string) {
  return db.course.findFirst({ where: { slug, published: true }, select: card });
}

export async function enroll(userId: string, slug: string) {
  const course = await getPublished(slug);
  if (!course) throw new CourseNotFound(slug);
  await db.enrollment.upsert({
    where: { userId_courseId: { userId, courseId: course.id } },
    update: {},
    create: { userId, courseId: course.id },
  });
  return course;
}

export async function isEnrolled(userId: string, courseId: string) {
  return (await db.enrollment.count({ where: { userId, courseId } })) > 0;
}

export function myCourses(userId: string) {
  return db.course.findMany({ where: { enrollments: { some: { userId } } }, select: card, orderBy: { title: "asc" } });
}

// ── app/layout.tsx ──
import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/dal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BETTER_AUTH_URL ?? "http://localhost:3000"),
  title: { default: "myapp: كورسات", template: "%s | myapp" },
  description: "كورسات برمجة بالعربي",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header>
          <Link href="/">myapp</Link>
          <nav aria-label="الحساب">
            {session ? <Link href="/my">كورساتي ({session.user.name})</Link> : <Link href="/login">دخول</Link>}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

// ── app/page.tsx ──
import Link from "next/link";
import { listPublished } from "@/lib/courses";

export default async function HomePage() {
  const courses = await listPublished();
  return (
    <main>
      <h1>الكورسات</h1>
      {courses.length === 0 ? <p>مفيش كورسات منشورة لسه.</p> : (
        <ul className="cards">
          {courses.map(c => (
            <li key={c.id}>
              <h2><Link href={$__bt/courses/$__{c.slug}$__bt}>{c.title}</Link></h2>
              <p>{c.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// ── app/courses/[slug]/page.tsx ──
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { enrollAction } from "@/app/actions/enroll";
import { getPublished, isEnrolled } from "@/lib/courses";
import { getSession } from "@/lib/dal";

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const course = await getPublished((await params).slug);
  if (!course) return {};
  return { title: course.title, description: course.summary, alternates: { canonical: $__bt/courses/$__{course.slug}$__bt } };
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = await getPublished(slug);
  if (!course) notFound();
  const session = await getSession();
  const enrolled = session ? await isEnrolled(session.user.id, course.id) : false;

  return (
    <main>
      <h1>{course.title}</h1>
      <p>{course.summary}</p>
      {!session ? (
        <Link href={$__bt/login?next=/courses/$__{slug}$__bt}>سجّل دخول عشان تشترك</Link>
      ) : enrolled ? (
        <p role="status">انت مشترك في الكورس ده. <Link href="/my">كورساتي</Link></p>
      ) : (
        <form action={enrollAction.bind(null, slug)}>
          <button type="submit">اشترك ببلاش</button>
        </form>
      )}
    </main>
  );
}

// ── app/sitemap.ts ──
import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { listPublished } from "@/lib/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const base = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const courses = await listPublished();
  return [{ url: base }, ...courses.map(c => ({ url: $__bt$__{base}/courses/$__{c.slug}$__bt }))];
}`
        },
        {
          cmd: "مشروع ٦: الدخول والاشتراك",
          title: "تضيف تسجيل ودخول واشتراك في كورس بـ Server Actions بأمان إزاي؟",
          desc: R`better-auth بالإيميل والباسورد، وفورمات دخول وتسجيل بـ Server Actions و [[useActionState]]، وزرار «اشترك ببلاش» في صفحة الكورس (Server Action)، وصفحة [[/my]] محمية.

خلصت يعني: (١) زائر في صفحة كورس بيدوس «سجّل دخول عشان تشترك»، ويعمل حساب، ويرجع لنفس الكورس ([[?next=]]). (٢) [[?next=//evil.example]] مبيودّيش برّه الموقع. (٣) أخطاء الفورم بتظهر تحت الحقل ومربوطة بـ [[aria-describedby]]، والاسم والإيميل مبيتمسحوش بعد الخطأ. (٤) الاشتراك مرتين = صف واحد. (٥) كورس مش منشور مينفعش يتشترك فيه حتى لو حد نادى الـ action بإيده. (٦) [[/my]] من غير دخول بيحوّل لـ [[/login?next=%2Fmy]]، ومبيعرضش غير كورسات المستخدم. (٧) الـ cookie [[HttpOnly]]، ولما يبقى HTTPS [[__Secure-]].

الدروس: [[better-auth]] و [[signUpEmail و signInEmail]] و [[getSession]] و [[DAL]] و [[use server]] و [[useActionState]] و [[action = endpoint عام]] في تاب «Next.js»، و [[ownership]] في تاب «بناء مشروع كامل»، و [[CSRF]] في تاب «الأمان».`,
          example: R`export async function enrollAction(slug: string) {
  const user = await requireUser($__bt/courses/$__{slug}$__bt);
  try {
    await enroll(user.id, slug);
  } catch (err) {
    if (err instanceof CourseNotFound) notFound();
    throw err;
  }
  revalidatePath($__bt/courses/$__{slug}$__bt);
  revalidatePath("/my");
}`,
          try: R`ركّب better-auth ([[lib/auth.ts]] و route [[/api/auth/[...all]]] و [[npx auth@latest generate]] و migrate). اكتب [[lib/dal.ts]] و [[app/actions/auth.ts]] و [[AuthForm]] والصفحتين، و [[enrollAction]] و [[/my]]. جرّب: من صفحة كورس سجّل واشترك. وبعدين في Console على صفحة كورس منشور، ابعت الـ action بتاع كورس مش منشور (غيّر الـ slug في الفورم من Elements). وجرّب [[/login?next=//evil.example]].`,
          flag: "script",
          deep: {
            why: R`Server Action شكله دالة، بس هو endpoint عام: أي حد يقدر يناديه بـ POST ومعاه أي داتا. أغلب ثغرات مشاريع Next اللي بتتراجع إن الـ action بيثق في اللي جايله: userId من الفورم، أو slug من غير فحص، أو من غير ما يتأكد إن فيه session أصلًا. والـ redirect بعد الدخول بـ [[next]] من الـ URL هو ثغرة open redirect كلاسيكية لو متفحصش.`,
            how: R`[[requireUser()]] في الـ DAL أول سطر في أي action أو صفحة خاصة: بتقرا الـ session (من الـ cookie، والمكتبة بتتحقق منها في جدول [[Session]]) ولو مفيش بتعمل redirect لـ login ومعاه [[next]]. والـ userId دايمًا من الـ session، مش من الفورم.

[[enrollAction.bind(null, slug)]] في صفحة الكورس: الـ slug بيتبعت مع الـ action. اللي بيتبعت من المتصفح ممكن يتغير، عشان كده [[enroll()]] بتعيد الفحص: [[getPublished(slug)]] ولو null ترمي [[CourseNotFound]] فالـ action يعمل [[notFound()]]. و [[upsert]] على المفتاح المركّب [[userId_courseId]]: الاشتراك مرتين (ضغطتين، أو تابتين) صف واحد.

[[revalidatePath]] بعد الاشتراك: صفحة الكورس و [[/my]] بيترسموا من جديد في الطلب الجاي.

الفورم: [[useActionState(signUp, undefined)]] بيدّيك [[state]] (اللي الـ action رجّعه) و [[pending]]. الـ action بيعمل [[safeParse]] بـ Zod ويرجّع [[fields]] لو فيه أخطاء. React 19 بيعمل reset للفورم بعد أي action، فكل الحقول بتتمسح حتى لو فيه خطأ. الحل: الـ action يرجّع [[values]] والـ inputs عليها [[defaultValue={state?.values?.email}]]. ده اتمسك في اختبار Playwright: بعد باسورد قصير، المحاولة التانية بعتت اسم وإيميل فاضيين.

[[safeNext]]: لازم يبدأ بـ [[/]]، وبعدين بيتحلل بـ [[new URL(value, BASE)]] ولازم الـ origin يفضل [[BASE]]. [[//evil.example]] المتصفح بيعتبره رابط لدومين تاني، و [[/\evil.example]] كمان (الـ \ بيتقري /). وأول نسخة من الحل كانت بتفحص البدايات دي بالنص بس، فـ [[?next=/%09/evil.example]] عدّى: [[%09]] هو Tab، والمتصفح بيشيل الـ Tab من الروابط فبقى [[//evil.example]]، و Chrome راح على [[http://evil.example/]] بعد الدخول (جرّبناها). الـ URL parser بيعمل نفس التنضيف اللي المتصفح بيعمله، فبيمسك الحيل دي كلها.

الـ CSRF: better-auth بيرفض أي POST على [[/api/auth]] الـ [[Origin]] بتاعه مش [[BETTER_AUTH_URL]] (جرّبناه: 403). والـ Server Actions نفسها Next بيقارن فيها الـ Origin بالـ Host.`,
            when: R`أي مشروع Next الـ backend بتاعه Next نفسه. لو الـ auth في API منفصل (زي myapp في تاب «بناء مشروع كامل»)، درس [[BFF]] في تاب «Next.js».`,
            mistakes: R`[[<input type="hidden" name="userId">]] في الفورم. أو الحماية في الـ layout أو الـ proxy بس (درس [[proxy مش حماية]]). أو [[redirect(formData.get("next"))]] من غير فحص. أو [[try { redirect() } catch]] فالـ redirect ميحصلش (هو بيرمي عشان يشتغل، فلازم يبقى برّه الـ try). أو رسالة «الإيميل ده مسجّل» في التسجيل. أو تنسى [[nextCookies()]] في better-auth فالدخول من Server Action «ينجح» والـ cookie متتحطش. أو [[getSession]] من غير [[cache]] فالـ layout والصفحة يعملوا نفس الـ query.`
          },
          teach: R`## الفكرة: الـ action endpoint عام، فمتثقش في اللي جايله

better-auth بيعمل التسجيل والدخول والـ session cookie. وإحنا بنكتب حواليه: Server Actions للفورمات، و DAL (Data Access Layer) فيه [[getSession]] و [[requireUser]]، و action للاشتراك. القاعدة اللي بتحكم كل سطر: أي Server Action ممكن حد يناديه بـ POST بإيده ومعاه أي داتا، فالـ userId من الـ session بس، وأي slug بيتفحص من جديد. اتجرّب على build إنتاج (better-auth 1.7.7، Next 16.4) بـ curl و Playwright في Chrome.

---

## ١. better-auth

~~~text lib/auth.ts
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  plugins: [nextCookies()],
});
~~~

- [[prismaAdapter(db, ...)]]: better-auth بيخزّن المستخدمين والـ sessions في الجداول الأربعة اللي في الـ schema عن طريق Prisma. (الجداول دي بيكتبها [[npx auth@latest generate]] حسب الـ docs؛ في التجربة دي الـ schema كان جاهز من الحل.)
- [[minPasswordLength: 10]]: الـ API نفسه بيرفض أقل من ١٠.
- [[nextCookies()]]: من غيره، لما تنادي [[auth.api.signInEmail]] من Server Action، الـ cookie مش بتتحط في الرد.

~~~text app/api/auth/[...all]/route.ts
export const { GET, POST } = toNextJsHandler(auth);
~~~

[[[...all]]] (catch-all): أي مسار تحت [[/api/auth/]] بيوصل هنا، و better-auth بيوزّعه ([[/api/auth/sign-up/email]] و [[/api/auth/sign-in/email]] وغيرهم).

جرّبنا [[sign-up]] على الـ HTTP مباشرة:

~~~text الناتج
Origin: https://evil.example   {"message":"Invalid origin","code":"INVALID_ORIGIN"} 403
Origin: http://localhost:6045  HTTP/1.1 200 OK
                               set-cookie: better-auth.session_token=f0knIR…; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax
~~~

- [[INVALID_ORIGIN]]: الطلب جاي من صفحة على دومين تاني، فده CSRF محتمل.
- الـ cookie: [[HttpOnly]] (الـ JavaScript في الصفحة مش شايفها، فـ XSS ميسرقهاش)، و [[SameSite=Lax]] (مش بتتبعت مع POST من موقع تاني)، و [[Max-Age=604800]] ثانية = ٧ أيام.
- على HTTPS (محطة Docker) اسمها بقى [[__Secure-better-auth.session_token]] وعليها [[Secure]].

---

## ٢. [[lib/dal.ts]]

~~~text lib/dal.ts
import "server-only";
...
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export async function requireUser(next = "/my") {
  const session = await getSession();
  if (!session) redirect($__bt/login?next=$__{encodeURIComponent(next)}$__bt);
  return session.user;
}
~~~

- [[import "server-only"]]: لو حد استورد الملف ده في client component، الـ build يقع.
- [[headers()]] من Next: headers الطلب الحالي (فيها الـ cookie). better-auth بيقرا الـ token منها ويدوّر عليه في جدول [[session]].
- [[cache(fn)]] من React: في نفس الطلب، أي نداء تاني بيرجّع نفس النتيجة من غير query. الـ layout والصفحة الاتنين بينادوا [[getSession]].
- [[requireUser]]: مفيش session = [[redirect]] للدخول ومعاه المكان اللي كان رايحه. [[encodeURIComponent("/my")]] = [[%2Fmy]].

~~~text الناتج: curl على /my من غير دخول
307 -> http://localhost:6045/login?next=%2Fmy
~~~

[[307]] redirect مؤقت.

---

## ٣. المثال سطر سطر: [[enrollAction]]

~~~text app/actions/enroll.ts
"use server";
...
export async function enrollAction(slug: string) {
  const user = await requireUser($__bt/courses/$__{slug}$__bt);
~~~

[["use server"]] في أول الملف: كل دالة متصدّرة هنا Server Action، يعني Next بيعمل لها endpoint والمتصفح بيناديها بـ POST. أول سطر: مين؟ من الـ session. لو مفيش، للدخول وبعدها يرجع للكورس.

~~~text app/actions/enroll.ts
  try {
    await enroll(user.id, slug);
  } catch (err) {
    if (err instanceof CourseNotFound) notFound();
    throw err;
  }
~~~

[[enroll]] في [[lib/courses.ts]]:

~~~text lib/courses.ts
export async function enroll(userId: string, slug: string) {
  const course = await getPublished(slug);
  if (!course) throw new CourseNotFound(slug);
  await db.enrollment.upsert({
    where: { userId_courseId: { userId, courseId: course.id } },
    update: {},
    create: { userId, courseId: course.id },
  });
  return course;
}
~~~

- [[getPublished(slug)]] تاني: الـ slug جاي من المتصفح، فلازم يتفحص إنه منشور.
- [[CourseNotFound]] كلاس خطأ خاص، فالـ action يفرّقه عن أي خطأ تاني ويحوّله 404. وأي خطأ تاني [[throw err]] يطلع زي ما هو.
- [[userId_courseId]]: اسم Prisma للمفتاح المركّب. و [[update: {}]]: لو موجود متعملش حاجة. فالاشتراك مرتين = صف واحد. جرّبنا ١٠ نداءات لـ [[enroll]] في نفس اللحظة: العشرة نجحوا والجدول فيه **صف واحد**، لأن Prisma في الحالة دي بيستخدم الـ upsert بتاع Postgres نفسه ([[INSERT ... ON CONFLICT]]، حسب docs بتاعة Prisma)، فمفيش لحظة بين «اسأل» و «اعمل».

~~~text app/actions/enroll.ts
  revalidatePath($__bt/courses/$__{slug}$__bt);
  revalidatePath("/my");
}
~~~

الصفحتين يترسموا من جديد في الطلب الجاي، فتشوف «انت مشترك».

### [[bind]] والـ slug اللي جاي من المتصفح

~~~text app/courses/[slug]/page.tsx
<form action={enrollAction.bind(null, slug)}>
~~~

[[.bind(null, slug)]] بيعمل نسخة من الدالة الـ argument الأول فيها ثابت. بس الـ argument ده بيروح للمتصفح ويرجع. ده اللي في الـ HTML فعلًا:

~~~text الناتج: hidden inputs في الفورم
["$ACTION_REF_1",""]
["$ACTION_1:0","{\"id\":\"405f5af99eb1ed1e95c3b857ea6793385c89f68fef\",\"bound\":\"$@1\"}"]
["$ACTION_1:1","[\"react-from-zero\"]"]
~~~

الـ slug مكتوب عادي، مش متشفّر. بعتنا POST بنفس الحقول بعد ما غيّرناه (من Playwright، بـ cookie مستخدم داخل):

~~~text الناتج
POST with slug draft-course -> 404
POST with slug bash-basics -> 200
my: كورساتي أساسيات الترمنال
~~~

المسودة اترفضت بـ 404 لأن [[enroll]] بيفحص. والكورس المنشور التاني اتقبل، وده عادي: الكورس مجاني والمستخدم داخل.

---

## ٤. فورمات الدخول والتسجيل

### الـ action

~~~text app/actions/auth.ts
const SignUp = z.object({
  name: z.string().trim().min(2, "الاسم قصير"),
  email: z.string().trim().toLowerCase().pipe(z.email("الإيميل مش مظبوط")),
  password: z.string().min(10, "الباسورد ١٠ حروف على الأقل").max(128),
});

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = SignUp.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fields: z.flattenError(parsed.error).fieldErrors, values: keep(formData) };
~~~

- action بيشتغل مع [[useActionState]] بياخد باراميترين: الـ state اللي فات ([[_prev]]، مش مستخدم) والـ [[FormData]].
- [[Object.fromEntries(formData)]]: الفورم لـ object عادي.
- [[safeParse]] مش [[parse]]: مبيرميش، بيرجّع [[{ success, data }]] أو [[{ success: false, error }]]، فنرجّع الأخطاء للفورم.
- [[keep(formData)]]: الاسم والإيميل اللي اتكتبوا (مش الباسورد)، عشان نرجّعهم.

~~~text app/actions/auth.ts
  try {
    await auth.api.signUpEmail({ body: parsed.data });
  } catch (err) {
    if (err instanceof APIError) return { error: "مقدرناش نعمل الحساب. لو الإيميل ده عندك حساب بيه، سجّل دخول.", values: keep(formData) };
    throw err;
  }
  redirect(safeNext(formData.get("next")));
}
~~~

- [[APIError]]: خطأ متوقع من better-auth (إيميل موجود مثلًا). الرسالة مبتقولش «الإيميل ده مسجّل» صريحة.
- [[redirect]] **برّه** الـ [[try]]: [[redirect]] بيشتغل بإنه يرمي حاجة خاصة، فلو جوه [[try/catch]] الـ catch هيبلعها.

### الفورم

~~~text app/AuthForm.tsx
const [state, formAction, pending] = useActionState(action, undefined);
const err = (name: string) => state?.fields?.[name]?.[0];
...
<input id="email" name="email" type="email" dir="ltr" autoComplete="email" defaultValue={state?.values?.email} aria-invalid={!!err("email")} aria-describedby="email-error" />
<p id="email-error" className="error">{err("email")}</p>
~~~

- [[useActionState]]: [[state]] اللي الـ action رجّعه آخر مرة، و [[formAction]] تحطه في [[<form action>]]، و [[pending]] [[true]] وهو شغال (الزرار بيكتب «لحظة...» ويتقفل).
- [[aria-describedby="email-error"]]: قارئ الشاشة بيقرا الخطأ مع الحقل. و [[aria-invalid]]: «الحقل ده فيه غلط». [[!!]] بيحوّل أي قيمة لـ boolean.
- [[defaultValue={state?.values?.email}]]: React 19 بيعمل reset للفورم بعد أي action، فمن غير السطر ده الإيميل بيتمسح بعد أول خطأ. شلناه وشغّلنا الـ e2e:

~~~text الناتج
Error: expect(page).toHaveURL(expected) failed
Expected pattern: /\/courses\/react-from-zero$/
Received string:  "http://localhost:6046/signup?next=%2Fcourses%2Freact-from-zero"
~~~

المحاولة التانية اتبعتت باسم وإيميل فاضيين، فالتسجيل فشل والصفحة فضلت على [[/signup]].

---

## ٥. [[safeNext]]: الـ open redirect

~~~text lib/safe-next.ts
const BASE = "http://n.invalid";

export function safeNext(value: unknown, fallback = "/my") {
  if (typeof value !== "string" || !value.startsWith("/")) return fallback;
  try {
    const url = new URL(value, BASE);
    return url.origin === BASE ? url.pathname + url.search + url.hash : fallback;
  } catch {
    return fallback;
  }
}
~~~

- لازم نص بيبدأ بـ [[/]].
- [[new URL(value, BASE)]]: حلّل الرابط كأنه جوه موقع وهمي ([[.invalid]] دومين محجوز مبيشتغلش). لو بعد التحليل الـ origin لسه [[BASE]]، يبقى مسار جوه موقعنا، فنرجّع المسار بس.
- [[catch]]: أي رابط يرمي وهو بيتحلل = fallback.

### ليه مش فحص بالنص؟

أول نسخة كانت: «يبدأ بـ [[/]] ومش بـ [[//]] ومش بـ [[/\]]». جرّبنا في Chrome: دخول بـ [[?next=/%09/evil.example]]:

~~~text الناتج: النسخة القديمة
next=/%09/evil.example signup 200 hidden "/\t/evil.example" -> chrome-error://chromewebdata/ external requests: [ 'http://evil.example/' ]
~~~

[[%09]] هو حرف Tab. النص [["/\t/evil.example"]] بيعدّي الفحص (مبيبدأش بـ [[//]])، بس المتصفح بيشيل أي Tab أو سطر جديد من الروابط، فبقى [[//evil.example]] و Chrome راح على [[http://evil.example/]]. ([[chrome-error]] لأن الدومين مش موجود؛ لو كان موجود كان المستخدم هيبقى على موقع المهاجم بعد ما دخل بحسابه.) الـ [[URL]] parser بيعمل نفس التنضيف اللي المتصفح بيعمله:

~~~text الناتج: الحل الحالي
next=/%09/evil.example signup 200 hidden "/my" -> http://localhost:6046/my external requests: []
~~~

---

## الخلاصة

| الخطر | الحماية |
|---|---|
| حد ينادي الـ action من غير دخول | [[requireUser()]] أول سطر |
| userId من الفورم | الـ id من الـ session بس |
| slug متعدّل | [[enroll]] بيعيد [[getPublished]] |
| اشتراك مرتين | [[upsert]] على [[userId_courseId]] |
| CSRF على [[/api/auth]] | better-auth بيرفض Origin غريب (403) |
| سرقة الـ cookie بـ JS | [[HttpOnly]] |
| open redirect | [[safeNext]] بـ [[new URL]] ومقارنة الـ origin |
| الفورم يتمسح بعد الخطأ | [[values]] و [[defaultValue]] |`,
          lines: [
            R`الـ action بياخد الـ slug (من [[bind]]) بس، مش userId.`,
            R`مين؟ من الـ session. لو مفيش، redirect للدخول والرجوع للكورس.`,
            R`حاول تشترك:`,
            R`[[enroll]] بتفحص إن الكورس منشور، وبتعمل upsert.`,
            R`لو فيه خطأ:`,
            R`كورس مش موجود أو مش منشور: 404.`,
            R`أي خطأ تاني يطلع زي ما هو (Sentry هيمسكه).`,
            R`قفلة الـ catch.`,
            R`صفحة الكورس تترسم من جديد بـ «انت مشترك».`,
            R`و [[/my]] كمان.`,
            R`قفلة الـ action.`
          ],
          sol: R`اختبار Playwright «visitor signs up from a course page, enrolls, and sees it in my courses» بيعمل الرحلة كلها على build إنتاج: من الرئيسية لـ «React من الصفر»، و «سجّل دخول عشان تشترك»، و «اعمل حساب»، وباسورد قصير الأول (الحقل بيتوصف بـ «الباسورد ١٠ حروف على الأقل»)، وبعدين باسورد صح، والرجوع لنفس الكورس، و «اشترك ببلاش»، و «انت مشترك»، و «كورساتي» فيها الكورس ده بس. واختبار تاني: [[/my]] بيحوّل لـ [[/login?next=%2Fmy]]. وتالت: [[?next=//evil.example]] بعد الدخول بيودّي [[/my]].

والـ service: اختبار vitest «enrolling twice keeps one enrollment» و «cannot enroll in a draft or a missing course» و «my courses never shows another user's enrollments».

وعلى HTTPS (ورا Caddy في المحطة الخامسة): الـ cookie اسمها [[__Secure-better-auth.session_token]]، و POST على [[/api/auth/sign-up/email]] بـ [[Origin: https://evil.example]] رجع 403.`,
          solCode: R`// ── lib/auth.ts ──
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  plugins: [nextCookies()],
});

// ── app/api/auth/[...all]/route.ts ──
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);

// ── lib/dal.ts ──
import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export async function requireUser(next = "/my") {
  const session = await getSession();
  if (!session) redirect($__bt/login?next=$__{encodeURIComponent(next)}$__bt);
  return session.user;
}

// ── lib/safe-next.ts ──
const BASE = "http://n.invalid";

export function safeNext(value: unknown, fallback = "/my") {
  if (typeof value !== "string" || !value.startsWith("/")) return fallback;
  try {
    const url = new URL(value, BASE);
    return url.origin === BASE ? url.pathname + url.search + url.hash : fallback;
  } catch {
    return fallback;
  }
}

// ── app/actions/auth.ts ──
"use server";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { safeNext } from "@/lib/safe-next";

export type FormState = { error?: string; fields?: Record<string, string[] | undefined>; values?: { name?: string; email?: string } } | undefined;

const keep = (formData: FormData) => ({ name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? "") });

const SignUp = z.object({
  name: z.string().trim().min(2, "الاسم قصير"),
  email: z.string().trim().toLowerCase().pipe(z.email("الإيميل مش مظبوط")),
  password: z.string().min(10, "الباسورد ١٠ حروف على الأقل").max(128),
});
const SignIn = z.object({ email: z.string().trim().toLowerCase(), password: z.string().min(1) });

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = SignUp.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fields: z.flattenError(parsed.error).fieldErrors, values: keep(formData) };
  try {
    await auth.api.signUpEmail({ body: parsed.data });
  } catch (err) {
    if (err instanceof APIError) return { error: "مقدرناش نعمل الحساب. لو الإيميل ده عندك حساب بيه، سجّل دخول.", values: keep(formData) };
    throw err;
  }
  redirect(safeNext(formData.get("next")));
}

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = SignIn.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "اكتب الإيميل والباسورد", values: keep(formData) };
  try {
    await auth.api.signInEmail({ body: parsed.data });
  } catch (err) {
    if (err instanceof APIError) return { error: "الإيميل أو الباسورد غلط", values: keep(formData) };
    throw err;
  }
  redirect(safeNext(formData.get("next")));
}

// ── app/AuthForm.tsx ──
"use client";
import { useActionState } from "react";
import type { FormState } from "@/app/actions/auth";

type Props = { action: (prev: FormState, data: FormData) => Promise<FormState>; next: string; withName?: boolean; submit: string };

export function AuthForm({ action, next, withName, submit }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const err = (name: string) => state?.fields?.[name]?.[0];
  return (
    <form action={formAction} noValidate>
      <input type="hidden" name="next" value={next} />
      {state?.error && <p role="alert" className="error">{state.error}</p>}
      {withName && (
        <>
          <label htmlFor="name">الاسم</label>
          <input id="name" name="name" autoComplete="name" defaultValue={state?.values?.name} aria-invalid={!!err("name")} aria-describedby="name-error" />
          <p id="name-error" className="error">{err("name")}</p>
        </>
      )}
      <label htmlFor="email">الإيميل</label>
      <input id="email" name="email" type="email" dir="ltr" autoComplete="email" defaultValue={state?.values?.email} aria-invalid={!!err("email")} aria-describedby="email-error" />
      <p id="email-error" className="error">{err("email")}</p>
      <label htmlFor="password">الباسورد</label>
      <input id="password" name="password" type="password" dir="ltr" autoComplete={withName ? "new-password" : "current-password"} aria-invalid={!!err("password")} aria-describedby="password-error" />
      <p id="password-error" className="error">{err("password")}</p>
      <button type="submit" disabled={pending}>{pending ? "لحظة..." : submit}</button>
    </form>
  );
}

// ── app/login/page.tsx ──
import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { AuthForm } from "@/app/AuthForm";
import { safeNext } from "@/lib/safe-next";

export const metadata = { title: "دخول" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const next = safeNext((await searchParams).next);
  return (
    <main>
      <h1>دخول</h1>
      <AuthForm action={signIn} next={next} submit="ادخل" />
      <p>معندكش حساب؟ <Link href={$__bt/signup?next=$__{encodeURIComponent(next)}$__bt}>اعمل حساب</Link></p>
    </main>
  );
}

// ── app/signup/page.tsx ──
import { signUp } from "@/app/actions/auth";
import { AuthForm } from "@/app/AuthForm";
import { safeNext } from "@/lib/safe-next";

export const metadata = { title: "حساب جديد" };

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const next = safeNext((await searchParams).next);
  return (
    <main>
      <h1>حساب جديد</h1>
      <AuthForm action={signUp} next={next} withName submit="اعمل الحساب" />
    </main>
  );
}

// ── app/actions/enroll.ts ──
"use server";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { CourseNotFound, enroll } from "@/lib/courses";

export async function enrollAction(slug: string) {
  const user = await requireUser($__bt/courses/$__{slug}$__bt);
  try {
    await enroll(user.id, slug);
  } catch (err) {
    if (err instanceof CourseNotFound) notFound();
    throw err;
  }
  revalidatePath($__bt/courses/$__{slug}$__bt);
  revalidatePath("/my");
}

// ── app/my/page.tsx ──
import type { Metadata } from "next";
import Link from "next/link";
import { myCourses } from "@/lib/courses";
import { requireUser } from "@/lib/dal";

export const metadata: Metadata = { title: "كورساتي", robots: { index: false } };

export default async function MyCoursesPage() {
  const user = await requireUser("/my");
  const courses = await myCourses(user.id);
  return (
    <main>
      <h1>كورساتي</h1>
      {courses.length === 0 ? <p>لسه مشتركتش في حاجة. <Link href="/">شوف الكورسات</Link></p> : (
        <ul>{courses.map(c => <li key={c.id}><Link href={$__bt/courses/$__{c.slug}$__bt}>{c.title}</Link></li>)}</ul>
      )}
    </main>
  );
}`
        },
        {
          cmd: "مشروع ٦: الاختبارات و CI",
          title: "تختبر المنطق وأهم رحلة وتشغّلهم في كل PR إزاي؟",
          desc: R`نوعين: vitest لـ [[lib/courses.ts]] على قاعدة اختبار حقيقية، و Playwright للرحلة المهمة (تسجيل واشتراك) على build الإنتاج. و workflow بيشغّل الاتنين مع lint و typecheck على Postgres في CI.

خلصت يعني: (١) [[npm test]]: القايمة فيها المنشور بس، والاشتراك مرتين = صف، ومسودة أو slug غلط = [[CourseNotFound]]، ومستخدم مبيشوفش اشتراكات غيره. (٢) [[npm run e2e]]: الـ ٤ اختبارات (الرحلة، و redirect الـ login، و open redirect، و 404 و health). (٣) الـ e2e بيشتغل على [[next build && next start]] مش dev. (٤) CI: lint ثم typecheck ثم unit ثم e2e، ولو e2e وقع الـ trace بيترفع artifact.

الدروس: [[unit ولا e2e في Next]] في تاب «React»، و [[npm init playwright]] و [[playwright.config.ts]] و [[trace viewer و flaky]] و [[Playwright في GitHub Actions]] و [[ترتيب الفحص في CI]] في تاب «فحص الكود»، و [[services]] و [[cache و artifacts]] في تاب «GitHub Actions».`,
          example: R`test("visitor signs up from a course page, enrolls, and sees it in my courses", async ({ page }) => {
  const email = $__bte2e-$__{Date.now()}@test.com$__bt;
  await page.goto("/");
  await page.getByRole("link", { name: "React من الصفر" }).click();
  await expect(page).toHaveTitle("React من الصفر | myapp");
  await page.getByRole("link", { name: "سجّل دخول عشان تشترك" }).click();
  await page.getByRole("link", { name: "اعمل حساب" }).click();
  await page.getByLabel("الاسم").fill("سارة");
  await page.getByLabel("الإيميل").fill(email);
  await page.getByLabel("الباسورد").fill("short");
  await page.getByRole("button", { name: "اعمل الحساب" }).click();
  await expect(page.getByLabel("الباسورد")).toHaveAccessibleDescription("الباسورد ١٠ حروف على الأقل");
  await page.getByLabel("الباسورد").fill("long-password-1");
  await page.getByRole("button", { name: "اعمل الحساب" }).click();
  await expect(page).toHaveURL(/\/courses\/react-from-zero$/);
  await page.getByRole("button", { name: "اشترك ببلاش" }).click();
  await expect(page.getByRole("status")).toContainText("انت مشترك");
  await page.getByRole("link", { name: /كورساتي/ }).first().click();
  await expect(page.getByRole("listitem")).toHaveText(["React من الصفر"]);
});`,
          try: R`اعمل [[myapp_test]] و [[.env.test]]. [[vitest.config.mts]] بـ alias [[@]] و [[globalSetup]] بيعمل [[prisma migrate deploy]]، و [[tests/courses.test.ts]]. و [[playwright.config.ts]] بـ [[webServer]] بيعمل build و start على بورت 3100 بمتغيرات [[.env.test]]، و [[e2e/global-setup.ts]] بيعمل migrate و seed. اكتب الاختبارات، وبعدين [[.github/workflows/ci.yml]]. وجرّب تشيل [[defaultValue]] من [[AuthForm]] وشغّل الـ e2e.`,
          flag: "script",
          deep: {
            why: R`المشروع ده فيه طبقات كتير بتتكلم مع بعض: cookie من better-auth، و Server Action، و Prisma، و revalidate. الـ unit test مش هيمسك مشكلة بين الطبقات دي (زي الفورم اللي بيتمسح بعد الخطأ). والـ e2e على الـ dev server مش هيمسك مشاكل الـ build (صفحة بقت static بالغلط). عشان كده e2e واحد قوي على build الإنتاج، واختبارات منطق سريعة.`,
            how: R`الـ unit: [[lib/courses.ts]] مفيهوش Next، فـ vitest بيستورده عادي مع alias [[@]]. والقاعدة: [[migrate deploy]] مرة في [[globalSetup]] و [[TRUNCATE]] في [[beforeEach]]. والمستخدمين بـ [[db.user.create]] مباشرة (مش محتاجين better-auth في اختبار المنطق).

الـ e2e: [[webServer.command]] بيعمل [[npm run build && npm start -- -p 3100]]، و [[url]] هو [[/api/health]] فـ Playwright بيستنى لحد ما السيرفر يرد و القاعدة شغالة. و [[env]] من [[.env.test]]: متغيرات [[process.env]] بتكسب على [[.env]] اللي Next بيقراه. و [[globalSetup]] بيعمل [[migrate deploy]] و [[db seed]] على قاعدة الاختبار قبل أي حاجة. والإيميل فيه [[Date.now()]] عشان الاختبار يتعاد من غير «الإيميل مسجّل».

اختبار الـ open redirect بيعمل الحساب بـ [[request.post("/api/auth/sign-up/email")]] مباشرة، وبـ header [[Origin]] زي اللي المتصفح بيبعته. better-auth بيرفض الطلب لو الـ Origin موجود ومش [[BETTER_AUTH_URL]] (403 [[INVALID_ORIGIN]])؛ ولو مفيش Origin خالص بيعدّيه (جرّبناها في better-auth 1.7: 200)، لأن المتصفحات الحديثة بتبعت Origin مع أي POST من موقع تاني.

CI: [[services: postgres]] بنفس بيانات [[.env.test]]. [[npx playwright install --with-deps chromium]] بينزّل المتصفح. و [[upload-artifact]] بـ [[if: failure()]] بيرفع [[test-results/]] اللي فيه الـ trace، فتقدر تشوف الاختبار اللي وقع خطوة خطوة بـ [[npx playwright show-trace]].

و [[concurrency]] بيلغي أي run قديم لنفس الـ branch لما تعمل push جديد.`,
            when: R`e2e لأهم رحلة أو اتنين (اللي لو وقعت محدش يقدر يستخدم المنتج)، و unit لأي منطق فيه قواعد. ولو كل ميزة جديدة ليها e2e، الـ CI هياخد نص ساعة.`,
            mistakes: R`e2e على [[next dev]] (بطيء، وبيجمّع الصفحات أول مرة، وبيخبي مشاكل الـ build). أو الاختبارات على قاعدة الـ dev. أو إيميل ثابت فالتشغيل التاني يقع. أو [[reuseExistingServer: true]] في CI. أو [[waitForTimeout]] بعد الـ action بدل ما تستنى [[toHaveURL]]. أو [[prisma migrate reset]] في الـ setup (بطيء، وخطر لو الرابط غلط؛ وPrisma 7 بيرفضه لو حس إنه متشغّل من AI agent من غير موافقة).`
          },
          teach: R`## الفكرة: نوعين اختبارات، كل واحد بيمسك حاجة

- **Vitest** على [[lib/courses.ts]] و [[safeNext]]: دوال عادية، على قاعدة Postgres حقيقية للاختبار. سريعة، وبتمسك أخطاء المنطق (مسودة اتشتركت، اشتراك اتكرر).
- **Playwright** على الرحلة المهمة: متصفح حقيقي على **build إنتاج**، بيدوس ويكتب زي المستخدم. بطيء، بس بيمسك اللي بين الطبقات (الفورم اتمسح، الـ cookie متحطتش، صفحة بقت static).

اتشغّلوا الاتنين على ويندوز: Vitest 5.0.3، و Playwright 1.64 بـ Chrome المتسطب على الجهاز، و Postgres 18 في Docker.

---

## ١. الـ scripts

~~~text package.json
"build": "prisma generate && next build",
"typecheck": "tsc --noEmit",
"test": "vitest run",
"e2e": "playwright test"
~~~

[[build]] بيولّد Prisma client الأول، لأن [[lib/generated]] مش في git ولا في Docker (المحطة الجاية). والـ CI بينادي التلاتة التانيين بالاسم.

---

## ٢. Vitest

~~~text vitest.config.mts
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: {
    include: ["tests/**/*.test.ts"],
    env: config({ path: ".env.test", quiet: true }).parsed,
    globalSetup: "./tests/global-setup.ts",
    fileParallelism: false,
  },
});
~~~

- [[.mts]]: ملف ES module حتى لو المشروع مش [[type: module]].
- [[alias "@"]]: [[import.meta.url]] رابط الملف ده نفسه، و [[new URL(".", ...)]] الفولدر بتاعه، و [[fileURLToPath]] بيحوّله مسار عادي. كده [[@/lib/db]] بيشتغل في الاختبارات زي Next.
- [[include]]: ملفات [[tests/]] بس، عشان Vitest ميحاولش يشغّل ملفات Playwright اللي في [[e2e/]].
- الباقي نفس مشروع ٥: [[.env.test]] فيه [[myapp_test]]، و [[migrate deploy]] مرة، ومن غير توازي.

~~~text tests/courses.test.ts
beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE "Enrollment", "Course", "user" CASCADE');
  await db.course.createMany({ data: [
    { slug: "live", title: "منشور", summary: "x", published: true },
    { slug: "draft", title: "مسودة", summary: "x", published: false },
  ] });
});
~~~

قبل كل اختبار: فضّي الجداول، وحط كورسين، واحد منشور وواحد لأ. [[createMany]] بيعمل الصفين في query واحدة. و [[makeUser]] بيعمل مستخدم بـ [[db.user.create]] مباشرة، من غير better-auth (اختبار المنطق مش محتاج باسورد).

~~~text tests/courses.test.ts
it("cannot enroll in a draft or a missing course", async () => {
  await makeUser("u2");
  await expect(enroll("u2", "draft")).rejects.toBeInstanceOf(CourseNotFound);
  await expect(enroll("u2", "nope")).rejects.toBeInstanceOf(CourseNotFound);
});
~~~

[[expect(promise).rejects]]: «الـ promise ده لازم يترفض»، و [[toBeInstanceOf]] بيتأكد من نوع الخطأ.

### [[safe-next.test.ts]]

~~~text tests/safe-next.test.ts
it.each(["/courses/react-from-zero", "/my?tab=1"])("keeps the local path %s", next => {
  expect(safeNext(next)).toBe(next);
});

it.each(["//evil.example", "/\\evil.example", "/\t/evil.example", "https://evil.example", "javascript:alert(1)", undefined])("rejects %j", next => {
  expect(safeNext(next)).toBe("/my");
});
~~~

[[it.each(array)(name, fn)]]: نفس الاختبار لكل قيمة، و [[%s]] / [[%j]] في الاسم بيتبدل بالقيمة (j = JSON). [["/\t/evil.example"]] هي الحالة اللي النسخة القديمة من [[safeNext]] كانت بتعدّيها (محطة الدخول). شغّلنا الملف على النسخة القديمة:

~~~text الناتج: النسخة القديمة
× rejects "/\t/evil.example" 5ms
      Tests  1 failed | 7 passed (8)
~~~

وعلى الحل:

~~~text npx vitest run --reporter=verbose
 ✓ tests/safe-next.test.ts > safeNext > keeps the local path /courses/react-from-zero 1ms
 ✓ tests/safe-next.test.ts > safeNext > keeps the local path /my?tab=1 0ms
 ✓ tests/safe-next.test.ts > safeNext > rejects "//evil.example" 0ms
 ✓ ... (٥ حالات rejects تانية)
 ✓ tests/courses.test.ts > courses service > lists published courses only 120ms
 ✓ tests/courses.test.ts > courses service > enrolling twice keeps one enrollment 45ms
 ✓ tests/courses.test.ts > courses service > cannot enroll in a draft or a missing course 18ms
 ✓ tests/courses.test.ts > courses service > my courses never shows another user's enrollments 26ms
      Tests  12 passed (12)
~~~

---

## ٣. Playwright

~~~text playwright.config.ts
const env = config({ path: ".env.test", quiet: true }).parsed!;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  use: { baseURL: "http://localhost:3100", trace: "retain-on-failure" },
  projects: [{ name: "mobile", use: { ...devices["Pixel 7"] } }],
  webServer: { command: "npm run build && npm start -- -p 3100", url: "http://localhost:3100/api/health", env, timeout: 180_000, reuseExistingServer: !process.env.CI },
});
~~~

| الخانة | معناها |
|---|---|
| [[baseURL]] | [[page.goto("/")]] بيبقى [[http://localhost:3100/]] |
| [[trace: "retain-on-failure"]] | سجّل كل خطوة، واحتفظ بالتسجيل لو الاختبار وقع بس |
| [[devices["Pixel 7"]]] | شاشة موبايل و touch و user agent |
| [[webServer.command]] | build إنتاج وبعدين [[next start]]. [[--]] بيعدّي [[-p 3100]] لـ next |
| [[webServer.url]] | Playwright بيستنى لحد ما ده يرد 2xx، يعني السيرفر قام **والقاعدة شغالة** |
| [[env]] | متغيرات [[.env.test]] للسيرفر، وبتكسب على [[.env]] |
| [[reuseExistingServer: !process.env.CI]] | على جهازك، لو فيه سيرفر شغال على البورت استخدمه. في CI لأ |

> إحنا شغّلنا نسخة من الـ config بـ بورت 6046 بدل 3100 و [[launchOptions.executablePath]] لـ Chrome اللي على الجهاز (بدل [[npx playwright install chromium]])، والباقي زي ما هو.

و [[e2e/global-setup.ts]] بيعمل [[migrate deploy && db seed]] على قاعدة الاختبار، فالكورسات التلاتة موجودة قبل أي اختبار.

### المثال سطر سطر

~~~text e2e/enroll.spec.ts
const email = $__bte2e-$__{Date.now()}@test.com$__bt;
~~~

[[Date.now()]] الوقت بالـ millisecond: إيميل جديد كل تشغيل، فالتشغيل التاني ميقعش بـ «الإيميل موجود» (الـ e2e مش بيفضّي القاعدة).

~~~text e2e/enroll.spec.ts
await page.goto("/");
await page.getByRole("link", { name: "React من الصفر" }).click();
await expect(page).toHaveTitle("React من الصفر | myapp");
~~~

افتح الرئيسية، ودوس اللينك باسمه، واتأكد من الـ [[<title>]] (من [[generateMetadata]] والـ template).

~~~text e2e/enroll.spec.ts
await page.getByRole("link", { name: "سجّل دخول عشان تشترك" }).click();
await page.getByRole("link", { name: "اعمل حساب" }).click();
await page.getByLabel("الاسم").fill("سارة");
await page.getByLabel("الإيميل").fill(email);
await page.getByLabel("الباسورد").fill("short");
await page.getByRole("button", { name: "اعمل الحساب" }).click();
await expect(page.getByLabel("الباسورد")).toHaveAccessibleDescription("الباسورد ١٠ حروف على الأقل");
~~~

[[getByLabel]] بيلاقي الـ input من الـ [[<label>]] بتاعه. [[fill]] بيمسح ويكتب. وبعد الباسورد القصير: [[toHaveAccessibleDescription]] بيتأكد إن الحقل **موصوف** بالرسالة دي، يعني [[aria-describedby]] شغال، مش بس الرسالة ظاهرة في حتة.

~~~text e2e/enroll.spec.ts
await page.getByLabel("الباسورد").fill("long-password-1");
await page.getByRole("button", { name: "اعمل الحساب" }).click();
await expect(page).toHaveURL(/\/courses\/react-from-zero$/);
~~~

باسورد صح بس (الاسم والإيميل المفروض لسه مكتوبين). [[toHaveURL]] بيستنى لحد ما الـ URL يطابق الـ regex: [[\/]] شرطة عادية، و [[$]] آخر الرابط. يعني رجع لنفس الكورس بفضل [[next]].

~~~text e2e/enroll.spec.ts
await page.getByRole("button", { name: "اشترك ببلاش" }).click();
await expect(page.getByRole("status")).toContainText("انت مشترك");
await page.getByRole("link", { name: /كورساتي/ }).first().click();
await expect(page.getByRole("listitem")).toHaveText(["React من الصفر"]);
~~~

[[name: /كورساتي/]] regex لأن اللينك في الـ header «كورساتي (سارة)». و [[.first()]] لأن فيه لينكين بالاسم ده (الـ header وجوه رسالة «انت مشترك»). و [[toHaveText([...])]] بـ array: لازم يبقى فيه عنصر واحد بالظبط بالنص ده.

### التشغيل

~~~text npx playwright test --reporter=list
Running 4 tests using 1 worker
  ok 1 [mobile] › enroll.spec.ts:3:5 › visitor signs up from a course page, enrolls, and sees it in my courses (1.6s)
  ok 2 [mobile] › enroll.spec.ts:24:5 › my courses redirects to login and back (299ms)
  ok 3 [mobile] › enroll.spec.ts:29:5 › login ignores an external next URL (882ms)
  ok 4 [mobile] › enroll.spec.ts:39:5 › draft courses are 404 and health is ok (288ms)
  4 passed (19.9s)
~~~

الاختبارات نفسها أقل من ٣ ثواني، والباقي الـ build. وفي أول الناتج سطر من Next:

~~~text الناتج
[WebServer] ⚠ "next start" does not work with "output: standalone" configuration. Use "node .next/standalone/server.js" instead.
~~~

[[output: "standalone"]] (للـ Docker في المحطة الجاية) معمول لـ [[server.js]]. [[next start]] اشتغل عادي في الاختبارات، بس ده تحذير حقيقي: في الإنتاج الـ Dockerfile بيشغّل [[node server.js]].

### اختبار الـ open redirect

~~~text e2e/enroll.spec.ts
await request.post("/api/auth/sign-up/email", { data: { name: "x", email, password: "long-password-1" }, headers: { Origin: "http://localhost:3100" } });
~~~

[[request]] fixture بيبعت HTTP من غير متصفح: بيعمل الحساب بسرعة. والـ [[Origin]] زي اللي المتصفح بيبعته. (جرّبنا من غيره: better-auth 1.7 عدّاه بـ 200، لأنه بيرفض الـ Origin الغريب بس، مش الطلب اللي مفيهوش Origin.)

---

## ٤. الـ CI

~~~text .github/workflows/ci.yml
concurrency:
  group: ci-$__{{ github.ref }}
  cancel-in-progress: true
~~~

[[$__{{ github.ref }}]] اسم الـ branch. كل الـ runs على نفس الـ branch في مجموعة واحدة، و push جديد بيلغي القديم اللي لسه شغال.

~~~text .github/workflows/ci.yml
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npx playwright install --with-deps chromium
      - run: npm run e2e
        env:
          CI: "true"
      - uses: actions/upload-artifact@v7
        if: failure()
        with:
          name: playwright-report
          path: test-results/
~~~

- الترتيب من الأسرع للأبطأ: لو الـ lint وقع، مفيش داعي تستنى e2e.
- [[--with-deps]]: المتصفح ومكتبات لينكس اللي محتاجها.
- [[CI: "true"]]: [[reuseExistingServer]] يبقى [[false]].
- [[if: failure()]]: ارفع [[test-results/]] (فيه [[trace.zip]]) بس لو حاجة وقعت. وتفتحه بـ [[npx playwright show-trace]].

الـ YAML اتعمله parse ([[yaml]] في Node) والخطوات طلعت بالترتيب ده، وآخر إصدار لـ [[upload-artifact]] v7 (من GitHub API). الـ workflow نفسه متشغّلش على GitHub؛ نفس الأوامر اتشغّلت على الجهاز.

---

## الخلاصة

| الاختبار | بيمسك |
|---|---|
| Vitest على [[lib/courses.ts]] | قواعد المنتج: منشور بس، صف واحد، ملكية |
| Vitest على [[safeNext]] | حيل الـ open redirect |
| Playwright على build | الطبقات مع بعض: الفورم والـ cookie والـ redirect والـ revalidate |
| [[webServer.url]] = health | الاختبارات مبتبدأش قبل السيرفر والقاعدة |
| [[Date.now()]] في الإيميل | الـ e2e يتعاد من غير تنضيف |
| [[trace]] و artifact | تشوف الاختبار اللي وقع في CI خطوة خطوة |`,
          lines: [
            R`الرحلة الأهم في المنتج، كلها في اختبار واحد.`,
            R`إيميل جديد كل مرة.`,
            R`من الرئيسية.`,
            R`افتح الكورس من اسمه.`,
            R`الـ title من [[generateMetadata]] والـ template.`,
            R`زائر: لينك الدخول.`,
            R`من الدخول لإنشاء حساب (الـ next بيتنقل معاه).`,
            R`الاسم.`,
            R`الإيميل.`,
            R`باسورد قصير عمدًا.`,
            R`ابعت.`,
            R`الخطأ مربوط بالحقل ([[aria-describedby]]).`,
            R`باسورد صح. الاسم والإيميل لازم يكونوا لسه موجودين ([[defaultValue]]).`,
            R`ابعت تاني.`,
            R`رجع لنفس الكورس بفضل [[next]].`,
            R`اشترك.`,
            R`الـ [[role="status"]] بيقول «انت مشترك».`,
            R`«كورساتي» من الـ header.`,
            R`الكورس ده بس في القايمة.`,
            R`قفلة الاختبار.`
          ],
          sol: R`بالحل المرجعي: vitest [[Tests 12 passed]] (٤ للكورسات و ٨ لـ [[safeNext]])، و Playwright [[4 passed]] على build إنتاج (Chromium بـ viewport الـ Pixel 7) في حوالي ٢٥ ثانية مع الـ build. و [[npm run lint]] و [[tsc --noEmit]] نضاف.

لما شلنا [[defaultValue]]: الرحلة وقعت عند [[toHaveURL(/\/courses\/react-from-zero$/)]] والصفحة لسه على [[/signup]]، لأن المحاولة التانية اتبعتت من غير اسم وإيميل. ده بالظبط الـ bug اللي الاختبار مسكه وانا بكتب الحل.

الـ workflow اتعمله parse بس متشغّلش على GitHub فعلًا؛ نفس الأوامر اتشغّلت محليًا. الحل فيه الـ scripts في [[package.json]] والـ configs والاختبارات و job الاختبار من [[ci.yml]] (job الـ deploy في المحطة الجاية). و [[tests/safe-next.test.ts]] بيقفل الـ open redirect اللي اتكلمنا عنه في محطة الدخول: النسخة القديمة من [[safeNext]] بتوقع فيه في حالة [[/\t/evil.example]].`,
          solCode: R`// ── package.json (scripts) ──
"scripts": {
  "dev": "next dev",
  "build": "prisma generate && next build",
  "start": "next start",
  "lint": "eslint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "e2e": "playwright test"
}

// ── vitest.config.mts ──
import { defineConfig } from "vitest/config";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: {
    include: ["tests/**/*.test.ts"],
    env: config({ path: ".env.test", quiet: true }).parsed,
    globalSetup: "./tests/global-setup.ts",
    fileParallelism: false,
  },
});

// ── tests/global-setup.ts ──
import { execSync } from "node:child_process";
import { config } from "dotenv";

export default function setup() {
  const env = { ...process.env, ...config({ path: ".env.test", quiet: true }).parsed };
  execSync("npx prisma migrate deploy", { env, stdio: "inherit" });
}

// ── tests/courses.test.ts ──
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { CourseNotFound, enroll, listPublished, myCourses } from "@/lib/courses";

async function makeUser(id: string) {
  return db.user.create({ data: { id, name: id, email: $__bt$__{id}@test.com$__bt } });
}

beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE "Enrollment", "Course", "user" CASCADE');
  await db.course.createMany({ data: [
    { slug: "live", title: "منشور", summary: "x", published: true },
    { slug: "draft", title: "مسودة", summary: "x", published: false },
  ] });
});
afterAll(() => db.$disconnect());

describe("courses service", () => {
  it("lists published courses only", async () => {
    expect((await listPublished()).map(c => c.slug)).toEqual(["live"]);
  });

  it("enrolling twice keeps one enrollment", async () => {
    await makeUser("u1");
    await enroll("u1", "live");
    await enroll("u1", "live");
    expect(await db.enrollment.count()).toBe(1);
    expect((await myCourses("u1")).map(c => c.slug)).toEqual(["live"]);
  });

  it("cannot enroll in a draft or a missing course", async () => {
    await makeUser("u2");
    await expect(enroll("u2", "draft")).rejects.toBeInstanceOf(CourseNotFound);
    await expect(enroll("u2", "nope")).rejects.toBeInstanceOf(CourseNotFound);
  });

  it("my courses never shows another user's enrollments", async () => {
    await makeUser("a");
    await makeUser("b");
    await enroll("a", "live");
    expect(await myCourses("b")).toEqual([]);
  });
});

// ── tests/safe-next.test.ts ──
import { describe, expect, it } from "vitest";
import { safeNext } from "@/lib/safe-next";

describe("safeNext", () => {
  it.each(["/courses/react-from-zero", "/my?tab=1"])("keeps the local path %s", next => {
    expect(safeNext(next)).toBe(next);
  });

  it.each(["//evil.example", "/\\evil.example", "/\t/evil.example", "https://evil.example", "javascript:alert(1)", undefined])("rejects %j", next => {
    expect(safeNext(next)).toBe("/my");
  });
});

// ── playwright.config.ts ──
import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

const env = config({ path: ".env.test", quiet: true }).parsed!;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  use: { baseURL: "http://localhost:3100", trace: "retain-on-failure" },
  projects: [{ name: "mobile", use: { ...devices["Pixel 7"] } }],
  webServer: { command: "npm run build && npm start -- -p 3100", url: "http://localhost:3100/api/health", env, timeout: 180_000, reuseExistingServer: !process.env.CI },
});

// ── e2e/global-setup.ts ──
import { execSync } from "node:child_process";
import { config } from "dotenv";

export default function setup() {
  const env = { ...process.env, ...config({ path: ".env.test", quiet: true }).parsed };
  execSync("npx prisma migrate deploy && npx prisma db seed", { env, stdio: "inherit" });
}

// ── e2e/enroll.spec.ts ──
import { test, expect } from "@playwright/test";

test("visitor signs up from a course page, enrolls, and sees it in my courses", async ({ page }) => {
  const email = $__bte2e-$__{Date.now()}@test.com$__bt;
  await page.goto("/");
  await page.getByRole("link", { name: "React من الصفر" }).click();
  await expect(page).toHaveTitle("React من الصفر | myapp");
  await page.getByRole("link", { name: "سجّل دخول عشان تشترك" }).click();
  await page.getByRole("link", { name: "اعمل حساب" }).click();
  await page.getByLabel("الاسم").fill("سارة");
  await page.getByLabel("الإيميل").fill(email);
  await page.getByLabel("الباسورد").fill("short");
  await page.getByRole("button", { name: "اعمل الحساب" }).click();
  await expect(page.getByLabel("الباسورد")).toHaveAccessibleDescription("الباسورد ١٠ حروف على الأقل");
  await page.getByLabel("الباسورد").fill("long-password-1");
  await page.getByRole("button", { name: "اعمل الحساب" }).click();
  await expect(page).toHaveURL(/\/courses\/react-from-zero$/);
  await page.getByRole("button", { name: "اشترك ببلاش" }).click();
  await expect(page.getByRole("status")).toContainText("انت مشترك");
  await page.getByRole("link", { name: /كورساتي/ }).first().click();
  await expect(page.getByRole("listitem")).toHaveText(["React من الصفر"]);
});

test("my courses redirects to login and back", async ({ page }) => {
  await page.goto("/my");
  await expect(page).toHaveURL(/\/login\?next=%2Fmy$/);
});

test("login ignores an external next URL", async ({ page, request }) => {
  const email = $__bte2e-next-$__{Date.now()}@test.com$__bt;
  await request.post("/api/auth/sign-up/email", { data: { name: "x", email, password: "long-password-1" }, headers: { Origin: "http://localhost:3100" } });
  await page.goto("/login?next=//evil.example");
  await page.getByLabel("الإيميل").fill(email);
  await page.getByLabel("الباسورد").fill("long-password-1");
  await page.getByRole("button", { name: "ادخل" }).click();
  await expect(page).toHaveURL("http://localhost:3100/my");
});

test("draft courses are 404 and health is ok", async ({ page, request }) => {
  const res = await page.goto("/courses/draft-course");
  expect(res?.status()).toBe(404);
  expect(await (await request.get("/api/health")).json()).toMatchObject({ ok: true });
});

# ── .github/workflows/ci.yml (job الاختبار) ──
name: ci
on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: ci-$__{{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17-alpine
        env:
          POSTGRES_USER: projlab
          POSTGRES_PASSWORD: projlab
          POSTGRES_DB: myapp_test
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U projlab" --health-interval 5s --health-retries 10
    env:
      DATABASE_URL: postgresql://projlab:projlab@localhost:5432/myapp_test
      BETTER_AUTH_SECRET: test-only-secret-0123456789abcdef0123
      BETTER_AUTH_URL: http://localhost:3100
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx prisma generate
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npx playwright install --with-deps chromium
      - run: npm run e2e
        env:
          CI: "true"
      - uses: actions/upload-artifact@v7
        if: failure()
        with:
          name: playwright-report
          path: test-results/`
        },
        {
          cmd: "مشروع ٦: Docker والدومين و SSL",
          title: "ترفع التطبيق على سيرفر بدومين و HTTPS و deploy أوتوماتيك إزاي؟",
          desc: R`image لـ Next بـ standalone، و compose فيه Postgres و migration بتتعمل قبل التطبيق و Caddy قدامه بيطلّع شهادة Let's Encrypt لوحده. و job في الـ CI بيبني الـ images ويرفعها على GHCR ويعمل deploy على السيرفر بـ SSH.

خلصت يعني: (١) [[https://دومينك/api/health]] بيرجّع الـ version = رقم الـ commit. (٢) [[http://]] بيتحول لـ [[https://]]، و [[www.]] للدومين من غيرها. (٣) الـ migration بتخلص قبل ما التطبيق يقوم، ولو فشلت التطبيق مبيقومش. (٤) القاعدة مش مفتوحة على الإنترنت (مفيش [[ports]] لـ db). (٥) push على main بيعمل deploy لوحده بعد ما الاختبارات تعدّي. (٦) الأسرار في [[.env]] على السيرفر، مش في git ولا في الـ image.

الدروس: [[Next.js standalone]] و [[multi-stage]] و [[healthchecks جاهزة]] و [[compose.yml]] في تاب «Docker»، و [[Caddy]] في تاب «nginx»، و [[build و push image]] و [[deploy عبر SSH]] و [[environments و approval]] في تاب «GitHub Actions»، وفئة «التحدي الكبير: سيرفر من الصفر» في تاب «VPS»، و [[فين تنشر]] في تاب «Next.js».`,
          example: R`  migrate:
    image: $__{IMAGE:-myapp}:migrate-$__{TAG:-latest}
    build: { context: ., target: migrate }
    environment:
      DATABASE_URL: postgresql://myapp:$__{DB_PASSWORD}@db:5432/myapp
    depends_on: { db: { condition: service_healthy } }

  app:
    image: $__{IMAGE:-myapp}:$__{TAG:-latest}
    build: { context: ., target: runner, args: { GIT_SHA: "$__{TAG:-dev}" } }
    restart: unless-stopped
    env_file: .env.production
    environment:
      DATABASE_URL: postgresql://myapp:$__{DB_PASSWORD}@db:5432/myapp
    depends_on:
      migrate: { condition: service_completed_successfully }`,
          try: R`على جهازك الأول: [[DB_PASSWORD=x DOMAIN=localhost docker compose up -d --build]] مع override بيحط Caddy على 8080 و 8443، و [[curl -k https://localhost:8443/api/health]]. وبعدين على VPS (فئة التحدي الكبير في تاب «VPS» فيها تجهيزه): سجل [[A]] للدومين على IP السيرفر، و [[.env]] و [[.env.production]] على السيرفر، و [[docker compose up -d]]. وبعدين الـ deploy job والأسرار في GitHub ([[SSH_HOST]] و [[SSH_KEY]]).`,
          flag: "script",
          deep: {
            why: R`«شغال على جهازي» مش منتج. الرابط الحقيقي بـ HTTPS هو اللي بيطلّع المشاكل اللي ملهاش أثر محليًا: cookies [[Secure]]، و [[BETTER_AUTH_URL]] غلط، و Origin، و CORS. والـ deploy اليدوي بيتنسى أو بيتعمل غلط، والـ deploy الأوتوماتيك بعد الاختبارات بيخلي كل commit على main قابل يترفع.`,
            how: R`الـ Dockerfile ٣ مراحل: [[builder]] ([[npm ci]] و [[prisma generate && next build]])، و [[migrate]] (نفس الـ builder بكل الـ node_modules وأمره [[prisma migrate deploy]])، و [[runner]] صغير فيه [[.next/standalone]] و [[static]] و [[public]] بس، ويوزر [[node]] مش root. الـ runner طلع حوالي ٣٢٠MB والـ migrate حوالي ٢.٢GB (فيه كل حاجة)؛ الـ migrate مبيشتغلش غير ثواني مع كل deploy، بس لو المساحة مهمة اعمله stage أصغر فيه prisma CLI بس.

compose: [[migrate]] بيستنى [[db]] يبقى healthy، و [[app]] بيستنى [[migrate]] يخلص بنجاح ([[service_completed_successfully]]). لو الـ migration فشلت، التطبيق القديم فاضل شغال (مع [[up -d]] مش هيتبدل). و [[$__{DB_PASSWORD:?...}]] بيوقّف compose لو المتغير ناقص بدل ما يشغّل Postgres بباسورد فاضي. وكل حاجة على شبكة compose الداخلية: [[db:5432]] و [[app:3000]] مش مفتوحين برّه، و Caddy بس على 80 و 443.

Caddy: [[{$DOMAIN} { reverse_proxy app:3000 }]] وخلاص: بيطلّع شهادة Let's Encrypt أول ما طلب يوصل (لازم الـ DNS يكون شاور على السيرفر، والبورت 80 و 443 مفتوحين)، وبيجددها لوحده، وبيعمل redirect من http. وشهاداته في volume [[caddy_data]] عشان متتطلبش تاني مع كل restart (Let's Encrypt ليه rate limits). ولـ [[localhost]] بيعمل شهادة من CA داخلي (عشان كده [[curl -k]]).

الـ CI: [[docker/build-push-action]] بيبني الـ targets ويرفعهم على [[ghcr.io]] بـ tag = الـ commit. وعلى السيرفر [[docker compose pull]] و [[up -d --no-build --wait]] بيستنى الـ healthchecks، وبعدين [[curl -fsS]] على الـ health بتاع الدومين: لو فشل الـ job يقع وتعرف.

[[BETTER_AUTH_URL]] في [[.env.production]] لازم يبقى [[https://دومينك]] بالظبط، وإلا كل POST هيترفض [[INVALID_ORIGIN]].`,
            when: R`بدري، يفضل في أول أسبوع (مع الـ skeleton). لو معندكش VPS، منصة زي Railway أو Render أو Fly بتشغّل نفس الـ Dockerfile، أو Vercel لـ Next من غير Docker (درس [[فين تنشر]]).`,
            mistakes: R`[[ports: ["5432:5432"]]] على الـ db في الإنتاج. أو [[npm run build]] في الـ runner. أو [[prisma migrate deploy]] في [[CMD]] بتاع التطبيق فأكتر من نسخة يعملوها مع بعض. أو الـ DNS لسه مش متحدث فـ Caddy يحاول يطلّع شهادة ويفشل كذا مرة ويخبط في الـ rate limit. أو [[NEXT_PUBLIC_*]] في [[.env.production]] وقت التشغيل (لازم وقت الـ build). أو اسم الـ image على GHCR فيه حروف كبيرة ([[github.repository]] ممكن يبقى [[Ali/MyApp]]) فالـ push يقع: خليه lowercase. أو [[latest]] بس من غير tag بالـ commit فمتعرفش ترجع لنسخة قبلها.`
          },
          teach: R`## الفكرة: ٤ خدمات و ٣ أبواب مقفولة

على السيرفر بيشتغل ٤ كونتينرات بـ compose: [[db]] (Postgres)، و [[migrate]] (بيطبّق الـ migrations ويخرج)، و [[app]] (Next)، و [[caddy]] (الوحيد اللي مفتوح على الإنترنت، وبيعمل HTTPS). والترتيب مضمون: القاعدة جاهزة، ثم الـ migration نجحت، ثم التطبيق. اتجرّب على الجهاز بـ Docker Desktop: build حقيقي للـ images، و compose up، و Caddy بشهادة داخلية لـ [[localhost]] على بورت 6049 (بدل 443). اللي متجرّبش: Let's Encrypt على دومين حقيقي، و job الـ deploy على GitHub (محتاجين سيرفر ودومين)، فدول من الـ docs.

---

## ١. الـ Dockerfile: ٣ مراحل

### [[builder]]

~~~text Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ARG GIT_SHA=dev
RUN npm run build && test -d .next/standalone
~~~

- [[AS builder]]: اسم للمرحلة، المراحل اللي بعدها تاخد منها.
- [[COPY package*.json]] لوحدهم الأول، و [[npm ci]]، وبعدين باقي الكود: Docker بيكاش كل خطوة، فلو غيّرت كود بس من غير ما تغيّر الـ packages، [[npm ci]] مبيتعادش.
- [[npm run build]] = [[prisma generate && next build]]. الـ [[generate]] لازم هنا لأن [[lib/generated]] في [[.dockerignore]]. جرّبنا [[next build]] لوحده من غير الفولدر ده:

~~~text الناتج
Error: Turbopack build failed with 1 error:
Error: Module not found: Can't resolve '@/lib/generated/prisma/client'
~~~

- [[test -d .next/standalone]]: لو [[output: "standalone"]] اتنسى من [[next.config.ts]]، الـ build يقع هنا بدل ما يقع بعدين بخطأ مش مفهوم.

### [[migrate]]

~~~text Dockerfile
FROM builder AS migrate
CMD ["npx", "prisma", "migrate", "deploy"]
~~~

نفس الـ builder بكل حاجة فيه (prisma CLI والـ migrations)، بس أمره [[migrate deploy]].

### [[runner]]

~~~text Dockerfile
FROM node:22-alpine AS runner
WORKDIR /app
ARG GIT_SHA=dev
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 GIT_SHA=$GIT_SHA
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
~~~

- [[FROM node:22-alpine]] من جديد: image نضيفة، مفيهاش [[node_modules]] الكاملة ولا الكود.
- [[ARG GIT_SHA]] ثم [[ENV GIT_SHA=$GIT_SHA]]: الـ ARG موجود وقت الـ build بس، فبننسخه لـ ENV عشان [[/api/health]] يقراه وقت التشغيل.
- [[HOSTNAME=0.0.0.0]]: اسمع على كل الـ interfaces جوه الكونتينر، مش [[localhost]] بس، وإلا Caddy مش هيوصله.
- [[.next/standalone]]: Next بيحط فيه [[server.js]] والـ node_modules اللي محتاجها فعلًا بس. و [[static]] و [[public]] لازم يتنسخوا بإيدك.
- [[--chown=node:node]] و [[USER node]]: التطبيق مش root.
- [[HEALTHCHECK]]: Docker بيسأل الـ health كل ٣٠ ثانية. [[wget -qO-]] (quiet، والناتج على الشاشة) لأن alpine مفيهاش curl.

### الأحجام

~~~text docker images
teach-proj0407-myapp:abc123          315MB
teach-proj0407-myapp:migrate-abc123  2.17GB
~~~

الـ runner صغير. والـ migrate كبير لأنه الـ builder كله؛ بيشتغل ثواني مع كل deploy. ([[teach-proj0407-myapp]] اسم استخدمناه في التجربة بدل [[myapp]].)

---

## ٢. [[compose.yml]]: المثال سطر سطر

~~~text compose.yml
  migrate:
    image: $__{IMAGE:-myapp}:migrate-$__{TAG:-latest}
    build: { context: ., target: migrate }
~~~

- [[$__{IMAGE:-myapp}]]: متغير [[IMAGE]]، ولو مش موجود [[myapp]]. في الـ CI بيبقى [[ghcr.io/user/repo]] و [[TAG]] رقم الـ commit.
- [[target: migrate]]: ابني لحد المرحلة دي بس.

~~~text compose.yml
    environment:
      DATABASE_URL: postgresql://myapp:$__{DB_PASSWORD}@db:5432/myapp
    depends_on: { db: { condition: service_healthy } }
~~~

[[@db:5432]]: [[db]] اسم الخدمة، و compose بيعمل شبكة داخلية فيها كل خدمة بتلاقي التانية باسمها. و [[service_healthy]]: استنى الـ healthcheck بتاع Postgres ([[pg_isready]]) يبقى ناجح، مش بس الكونتينر قام.

~~~text compose.yml
  app:
    image: $__{IMAGE:-myapp}:$__{TAG:-latest}
    build: { context: ., target: runner, args: { GIT_SHA: "$__{TAG:-dev}" } }
    restart: unless-stopped
    env_file: .env.production
    environment:
      DATABASE_URL: postgresql://myapp:$__{DB_PASSWORD}@db:5432/myapp
    depends_on:
      migrate: { condition: service_completed_successfully }
~~~

- [[args]]: الـ [[GIT_SHA]] بيدخل الـ image.
- [[restart: unless-stopped]]: لو وقع، Docker يقوّمه، إلا لو انت وقفته.
- [[env_file]]: الأسرار ([[BETTER_AUTH_SECRET]] و [[BETTER_AUTH_URL]]) من ملف على السيرفر، مش في git ولا في الـ image.
- [[service_completed_successfully]]: الـ migrate لازم يخرج بـ 0. لو الـ migration فشلت، التطبيق الجديد مبيقومش.

وفي [[db]]:

~~~text compose.yml
      POSTGRES_PASSWORD: $__{DB_PASSWORD:?DB_PASSWORD is required}
~~~

[[:?]] بدل [[:-]]: لو المتغير ناقص، compose يقف برسالة. جرّبنا من غيره:

~~~text docker compose config
Error while interpolating services.db.environment.POSTGRES_PASSWORD: required variable DB_PASSWORD is missing a value: DB_PASSWORD is required
~~~

ومفيش [[ports]] على [[db]] ولا [[app]]: مش مفتوحين برّه. [[caddy]] بس عليه [[80]] و [[443]] (و [[443/udp]] لـ HTTP/3).

### الـ Caddyfile

~~~text Caddyfile
{$DOMAIN} {
	encode zstd gzip
	reverse_proxy app:3000
}

www.{$DOMAIN} {
	redir https://{$DOMAIN}{uri} permanent
}
~~~

- [[{$DOMAIN}]] متغير بيئة جوه Caddy.
- [[encode zstd gzip]]: ضغط الردود.
- [[reverse_proxy app:3000]]: أي طلب يروح للتطبيق.
- [[www.]] بيتحول للدومين من غيرها، و [[{uri}]] المسار كله.
- وCaddy لوحده بيطلّع شهادة Let's Encrypt للدومين أول ما يجيله طلب (لو الـ DNS شاور على السيرفر و 80/443 مفتوحين)، وبيجددها، وبيحوّل http لـ https. ده من الـ docs؛ لـ [[localhost]] بيعمل شهادة من CA داخلي بتاعه.

---

## ٣. اللي حصل فعلًا

~~~bash
export IMAGE=teach-proj0407-myapp TAG=abc123 DB_PASSWORD=... DOMAIN=localhost
docker compose -f compose.yml -f compose.local.yml build
docker compose -f compose.yml -f compose.local.yml up -d --no-build --wait
~~~

[[compose.local.yml]] ملف override صغير للتجربة: Caddy على 6048 و 6049 بدل 80 و 443، و Postgres 18 بدل 17. و [[--wait]]: استنى لحد ما كل حاجة تبقى healthy. الـ build خد حوالي دقيقتين ونص.

~~~text الناتج
 Container teach-proj0407-p6-migrate-1 Exited
 Container teach-proj0407-p6-db-1 Healthy
 Container teach-proj0407-p6-app-1 Healthy

app      Up 30 seconds (healthy)
caddy    Up 30 seconds
db       Up 38 seconds (healthy)
migrate  Exited (0) 31 seconds ago
~~~

ولوج الـ migrate:

~~~text docker compose logs migrate
migrate-1  | migrations/
migrate-1  |   └─ 20261008141603_init/
migrate-1  |     └─ migration.sql
migrate-1  | All migrations have been successfully applied.
~~~

وبعدين:

~~~text الناتج
curl -sk https://localhost:6049/api/health      {"ok":true,"version":"abc123"} 200
curl http://localhost:6048/                      308 -> https://localhost/
openssl ... -issuer                              issuer=CN=Caddy Local Authority - ECC Intermediate
docker exec ...app-1 id                          uid=1000(node) gid=1000(node) groups=1000(node)
ports:  app 3000/tcp   db 5432/tcp   caddy 0.0.0.0:6048->80/tcp, 0.0.0.0:6049->443/tcp
~~~

- [[-k]]: اقبل الشهادة الداخلية (مش من جهة معروفة للجهاز).
- [[version: abc123]]: الـ TAG وصل لحد [[/api/health]].
- [[308]]: redirect دايم لـ HTTPS (ورابطه من غير بورت لأن Caddy فاكر إنه على 443).
- [[app 3000/tcp]] و [[db 5432/tcp]] من غير [[0.0.0.0:]] = مش مفتوحين على الجهاز.

والتسجيل عبر HTTPS:

~~~text الناتج
Set-Cookie: __Secure-better-auth.session_token=ybHsNF…; Max-Age=604800; Path=/; HttpOnly; Secure; SameSite=Lax
Origin: https://evil.example  ->  {"message":"Invalid origin","code":"INVALID_ORIGIN"} 403
~~~

[[__Secure-]] و [[Secure]]: المتصفح مش هيبعت الـ cookie دي غير على HTTPS. وده بيحصل لوحده لما [[BETTER_AUTH_URL]] يبقى [[https://...]]، عشان كده لازم يبقى الدومين بالظبط.

---

## ٤. job الـ deploy (من الـ docs)

~~~text .github/workflows/ci.yml
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    environment: production
    permissions:
      contents: read
      packages: write
~~~

[[needs: test]]: بعد ما الاختبارات تعدّي بس. و [[if]]: على main بس، مش PRs. و [[environment: production]] بيخليك تحط موافقة يدوية وأسرار خاصة بالبيئة دي. و [[packages: write]] عشان يرفع على GHCR.

~~~text .github/workflows/ci.yml
      - name: image name (GHCR wants lowercase)
        run: echo "IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}" >> "$GITHUB_ENV"
~~~

[[$__{VAR,,}]] في bash = الحروف كلها صغيرة (GHCR بيرفض الكبيرة). و [[>> "$GITHUB_ENV"]] بيخلي [[IMAGE]] متاح للخطوات اللي بعده.

بعدها [[docker/login-action]] بـ [[GITHUB_TOKEN]]، و [[build-push-action]] مرتين (الـ migrate والـ runner) بـ tag = [[github.sha]]، وأخيرًا SSH للسيرفر:

~~~text .github/workflows/ci.yml
            export IMAGE=$__{{ env.IMAGE }} TAG=$__{{ github.sha }}
            docker compose pull migrate app
            docker compose up -d --no-build --wait
            curl -fsS https://myapp.example/api/health
~~~

[[pull]] الـ images الجديدة بس، و [[up --wait]] بيستنى الـ healthchecks، و [[curl -fsS]] ([[-f]] = اعتبر 4xx/5xx فشل) يوقّع الـ job لو الـ health مرجعش. اتعمل parse للـ YAML (الـ job ده تحت job الاختبار) وطلع فيه ٦ خطوات، وآخر إصدارات الـ actions اللي فيه موجودة (login v4، و build-push v7، و ssh-action v1). التشغيل نفسه محتاج سيرفر و [[SSH_HOST]] و [[SSH_KEY]] في GitHub.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| ٣ مراحل | runner صغير ومن غير root، و migrate منفصل |
| [[prisma generate]] في [[build]] | الـ client المتولّد مش في الـ image |
| [[service_healthy]] ثم [[service_completed_successfully]] | القاعدة، ثم الـ migration، ثم التطبيق |
| [[$__{DB_PASSWORD:?...}]] | compose يقف بدل باسورد فاضي |
| مفيش [[ports]] لـ db و app | Caddy بس اللي مفتوح |
| Caddy | HTTPS والتجديد والـ redirect لوحده |
| [[BETTER_AUTH_URL]] = [[https://دومينك]] | cookie [[__Secure-]] و Origin صح |
| tag = الـ commit | تعرف أنهي نسخة شغالة، وترجع لقبلها |`,
          lines: [
            R`خدمة الـ migration:`,
            R`نفس الـ image بتاعة الـ build بـ tag الـ commit.`,
            R`لو بتبني محليًا: من stage اسمه [[migrate]] في الـ Dockerfile.`,
            R`المتغيرات:`,
            R`القاعدة على اسم الخدمة [[db]] جوه شبكة compose.`,
            R`متبدأش غير لما Postgres يبقى جاهز فعلًا.`,
            R`التطبيق:`,
            R`الـ runner الصغير بـ tag الـ commit.`,
            R`البناء المحلي، و [[GIT_SHA]] بيتحط في الـ image.`,
            R`لو وقع، Docker يشغّله تاني.`,
            R`الأسرار ([[BETTER_AUTH_SECRET]] و [[BETTER_AUTH_URL]] و Sentry) من ملف على السيرفر.`,
            R`المتغيرات:`,
            R`نفس رابط القاعدة.`,
            R`يعتمد على:`,
            R`الـ migration لازم تخلص بنجاح الأول.`
          ],
          sol: R`اتجرّب محليًا بـ Docker: الـ images اتبنت (الـ runner ٣١٥MB والـ migrate ٢.١٧GB، بـ Next 16.4)، و [[docker compose up -d]]: [[db]] healthy، و [[migrate]] [[Exited (0)]] بعد [[All migrations have been successfully applied]]، و [[app]] بقى [[healthy]]، و Caddy على 8443 بشهادة داخلية لـ [[localhost]]. [[curl -k https://localhost:8443/api/health]] رجّع [[{"ok":true,"version":"abc123"}]] (الـ GIT_SHA اللي اتبنى بيه)، و [[http://localhost:8080/]] رجّع [[308]] لـ HTTPS. والتسجيل عبر HTTPS حط [[__Secure-better-auth.session_token]]، و Origin غريب اترفض بـ 403.

اللي متجرّبش: Let's Encrypt على دومين حقيقي، والـ deploy job على GitHub. ده محتاج سيرفر ودومين عندك. ولاحظ إن [[npm run build]] في الـ Dockerfile لازم يبقى [[prisma generate && next build]] (الـ scripts في محطة الاختبارات): [[lib/generated]] في [[.dockerignore]]، و [[next build]] لوحده بيقع بـ [[Can't resolve '@/lib/generated/prisma/client']].

[[next.config.ts]] في المحطة دي: [[output: "standalone"]] بس (في المحطة الجاية Sentry بيلفه). والحل فيه الـ Dockerfile و compose و Caddyfile و [[.dockerignore]] و job الـ deploy.`,
          solCode: R`# ── Dockerfile ──
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ARG GIT_SHA=dev
RUN npm run build && test -d .next/standalone

FROM builder AS migrate
CMD ["npx", "prisma", "migrate", "deploy"]

FROM node:22-alpine AS runner
WORKDIR /app
ARG GIT_SHA=dev
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 GIT_SHA=$GIT_SHA
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]

# ── .dockerignore ──
node_modules
.next
.git
.env*
lib/generated
test-results
playwright-report

# ── compose.yml ──
services:
  db:
    image: postgres:17-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: $__{DB_PASSWORD:?DB_PASSWORD is required}
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp -d myapp"]
      interval: 5s
      retries: 10

  migrate:
    image: $__{IMAGE:-myapp}:migrate-$__{TAG:-latest}
    build: { context: ., target: migrate }
    environment:
      DATABASE_URL: postgresql://myapp:$__{DB_PASSWORD}@db:5432/myapp
    depends_on: { db: { condition: service_healthy } }

  app:
    image: $__{IMAGE:-myapp}:$__{TAG:-latest}
    build: { context: ., target: runner, args: { GIT_SHA: "$__{TAG:-dev}" } }
    restart: unless-stopped
    env_file: .env.production
    environment:
      DATABASE_URL: postgresql://myapp:$__{DB_PASSWORD}@db:5432/myapp
    depends_on:
      migrate: { condition: service_completed_successfully }

  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports: ["80:80", "443:443", "443:443/udp"]
    environment:
      DOMAIN: $__{DOMAIN:?DOMAIN is required}
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
    depends_on: [app]

volumes:
  pgdata:
  caddy_data:

# ── Caddyfile ──
{$DOMAIN} {
	encode zstd gzip
	reverse_proxy app:3000
}

www.{$DOMAIN} {
	redir https://{$DOMAIN}{uri} permanent
}

# ── .github/workflows/ci.yml (job الـ deploy) ──
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    permissions:
      contents: read
      packages: write
    steps:
      - name: image name (GHCR wants lowercase)
        run: echo "IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}" >> "$GITHUB_ENV"
      - uses: actions/checkout@v7
      - uses: docker/login-action@v4
        with:
          registry: ghcr.io
          username: $__{{ github.actor }}
          password: $__{{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v7
        with:
          target: migrate
          push: true
          tags: $__{{ env.IMAGE }}:migrate-$__{{ github.sha }}
      - uses: docker/build-push-action@v7
        with:
          target: runner
          push: true
          build-args: GIT_SHA=$__{{ github.sha }}
          tags: $__{{ env.IMAGE }}:$__{{ github.sha }}
      - uses: appleboy/ssh-action@v1
        with:
          host: $__{{ secrets.SSH_HOST }}
          username: deploy
          key: $__{{ secrets.SSH_KEY }}
          script: |
            cd /srv/myapp
            export IMAGE=$__{{ env.IMAGE }} TAG=$__{{ github.sha }}
            docker compose pull migrate app
            docker compose up -d --no-build --wait
            curl -fsS https://myapp.example/api/health`
        },
        {
          cmd: "مشروع ٦: Sentry والإطلاق",
          title: "تعرف بالأخطاء في الإنتاج وتجهز للإطلاق إزاي؟",
          desc: R`Sentry على السيرفر وفي المتصفح، بـ environment و release = رقم الـ commit، ومن غير بيانات شخصية. وقبل ما تقول «اتطلق»: health check من برّه، وباك أب للقاعدة، و README.

خلصت يعني: (١) error في route أو server component بيوصل Sentry ومعاه [[environment]] و [[release]]. (٢) مفيش cookies ولا bodies في الأحداث. (٣) من غير DSN (dev) Sentry مبيعملش حاجة ومبيوقّعش حاجة. (٤) خدمة uptime (UptimeRobot أو Better Stack أو غيرهم) بتفحص [[/api/health]] كل دقيقة وبتبعتلك. (٥) [[pg_dump]] يومي برّه السيرفر، وجرّبت الـ restore مرة. (٦) README فيه الرابط والصور وإزاي تشغّل و «اللي اتعلمته»، و [[done-check]] أخضر.

الدروس: [[Sentry]] و [[health و uptime]] و [[backups و DR]] و [[structured logs]] و [[التوثيق والتسليم]] و [[security baseline]] في تاب «بناء مشروع كامل»، و [[pg_dump]] في تاب «VPS»، وفئة «تشيك ليست قبل ما ترفع» في تاب «الأمان».`,
          example: R`import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") await import("./sentry.server.config");
}

export const onRequestError = Sentry.captureRequestError;
// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV ?? "development",
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  dataCollection: { cookies: false, httpBodies: [] },
});`,
          try: R`[[npm i @sentry/nextjs]] (أو [[npx @sentry/wizard@latest -i nextjs]] وراجع اللي عمله). اعمل الملفات، وحط [[SENTRY_DSN]] في [[.env.production]]. اعمل route مؤقت بيرمي [[new Error("sentry-test")]]، واطلبه، وشوف الـ issue في Sentry ومعاه environment و release، وبعدين امسح الـ route. وظبّط alert على issue جديد في production. وبعدين: [[pg_dump]] من الـ container لملف، و restore في قاعدة تانية، وعدّ الصفوف.`,
          flag: "script",
          deep: {
            why: R`من غير تتبع أخطاء، أول مرة هتعرف إن الدخول واقع هي لما حد يبعتلك، وده لو بعت. وباك أب متجرّبش معناه إنك مش عارف إذا كان عندك باك أب أصلًا. الحاجتين دول من شروط إنك تفتح المنتج لناس حقيقية، مش ميزات تتأجل (درس [[MVP]]).`,
            how: R`Next بيستدعي [[register()]] من [[instrumentation.ts]] مرة لما السيرفر يقوم، فبنحمّل [[sentry.server.config]] على الـ nodejs runtime. و [[onRequestError = Sentry.captureRequestError]]: Next بينادي الـ hook ده مع أي خطأ في server component أو route handler أو server action، فبيوصل Sentry بتفاصيل الطلب. و [[instrumentation-client.ts]] للمتصفح (أخطاء JS والتنقل بين الصفحات).

[[release: process.env.GIT_SHA]]: نفس المتغير اللي الـ Dockerfile بيحطه من الـ CI. كده كل خطأ مربوط بالـ commit، و Sentry بيقولك «ظهر أول مرة في release كذا». و [[environment]] بيفصل staging عن production.

البيانات الشخصية: في [[@sentry/nextjs]] 11 الخيار القديم [[sendDefaultPii]] مبقاش موجود في الأنواع، وبدله [[dataCollection]] بتحكم أدق: [[cookies: false]] و [[httpBodies: []]] بيمنعوا الـ cookies (فيها الـ session!) وأجسام الطلبات (فيها الباسوردات) من إنها تتبعت. (درس [[Sentry]] في تاب «بناء مشروع كامل» مكتوب على [[@sentry/node]] بـ [[sendDefaultPii]]؛ لو نسختك قديمة ده اللي هتلاقيه.)

[[withSentryConfig]] في v11 بقى بيتستورد من [[@sentry/nextjs/config]] مش من [[@sentry/nextjs]]، ولو استوردته من الـ root الـ build بيقع بـ [[withSentryConfig is not a function]]. وهو اللي بيرفع الـ source maps وقت الـ build لو فيه [[SENTRY_AUTH_TOKEN]]، فالـ stack trace يبان بأسماء ملفاتك.

والـ DSN في المتصفح [[NEXT_PUBLIC_SENTRY_DSN]] لازم يبقى موجود وقت الـ build (ARG في الـ Dockerfile)، مش في [[.env.production]] بس. الـ DSN مش سر، أي حد يقدر يشوفه في الـ JS.

الباك أب: [[docker compose exec -T db pg_dump -U myapp -Fc myapp > backup.dump]] في cron، ويتنسخ برّه السيرفر (rclone لـ S3 أو Backblaze). والـ restore: [[pg_restore -d قاعدة_جديدة backup.dump]] وعدّ الصفوف.`,
            when: R`قبل أول مستخدم حقيقي. والـ alerts قليلة: issue جديد، و regression، و health واقع. لو كل حاجة بتبعت تنبيه، مش هتبص على ولا واحد.`,
            mistakes: R`route تجربة بيرمي error وبيفضل في الإنتاج (حصل في مشروع حقيقي، مذكور في درس [[Sentry]]). أو [[release]] مش متظبط فمتعرفش أنهي deploy كسر. أو بيانات شخصية في الأحداث. أو [[tracesSampleRate: 1]] فالكوتة تخلص في يوم. أو باك أب على نفس السيرفر (لو الديسك راح، راحوا الاتنين). أو باك أب عمره ما اتعمله restore. أو health check بيرجّع 200 والقاعدة واقعة.`
          },
          teach: R`## الفكرة: تعرف بالخطأ قبل ما المستخدم يبعتلك

Sentry SDK بيمسك أي خطأ في السيرفر أو المتصفح ويبعته لسيرفر Sentry، ومعاه اسم البيئة ورقم الـ commit. اتجرّب بـ [[@sentry/nextjs]] 11.5.0 على build إنتاج، **من غير حساب Sentry**: الـ DSN كان بيشاور على سيرفر صغير على الجهاز (بورت 6048) بيكتب أي حاجة توصله في ملف. الـ dashboard والـ alerts ورفع الـ source maps محتاجين حساب، فدول من الـ docs.

---

## ١. المثال سطر سطر

### [[instrumentation.ts]]

~~~text instrumentation.ts
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") await import("./sentry.server.config");
}

export const onRequestError = Sentry.captureRequestError;
~~~

- ملف اسمه [[instrumentation.ts]] في جذر المشروع: Next بينادي [[register()]] منه **مرة واحدة** لما السيرفر يقوم.
- [[NEXT_RUNTIME]]: Next عنده runtime اسمه [[nodejs]] وتاني اسمه [[edge]]. بنحمّل إعداد السيرفر على Node بس.
- [[await import(...)]]: الملف بيتحمّل وقتها، فالـ [[Sentry.init]] اللي فيه بيتنفذ.
- [[onRequestError]]: hook بيناديه Next مع أي خطأ في server component أو route handler أو server action. بنحط فيه دالة Sentry الجاهزة، فالخطأ بيتبعت ومعاه تفاصيل الطلب (المسار والـ method).

### [[sentry.server.config.ts]]

~~~text sentry.server.config.ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV ?? "development",
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  dataCollection: { cookies: false, httpBodies: [] },
});
~~~

| الخيار | معناه |
|---|---|
| [[dsn]] | العنوان اللي الأحداث بتتبعت عليه (من مشروعك في Sentry). مش موجود = Sentry مبيبعتش حاجة |
| [[environment]] | [[staging]] أو [[production]]، عشان الأخطاء متتخلطش |
| [[release]] | رقم الـ commit (نفس [[GIT_SHA]] اللي الـ Dockerfile بيحطه). Sentry بيقولك «ظهر أول مرة في release كذا» |
| [[tracesSampleRate: 0.1]] | قيس أداء ١٠٪ من الطلبات بس (الكوتة محدودة) |
| [[dataCollection]] | متبعتش الـ cookies (فيها الـ session) ولا أجسام الطلبات (فيها الباسوردات) |

[[dataCollection]] جديد في v11. الخيار القديم [[sendDefaultPii]] (PII = بيانات شخصية) مبقاش موجود في الأنواع:

~~~text npx tsc --noEmit
sentry.server.config.ts(8,3): error TS2353: Object literal may only specify known properties, and 'sendDefaultPii' does not exist in type 'CoreOptions<BaseTransportOptions> | BrowserOptions | NodeOptions | VercelEdgeOptions'.
~~~

### [[instrumentation-client.ts]]

نفس [[Sentry.init]] للمتصفح، بـ [[NEXT_PUBLIC_SENTRY_DSN]]. أي متغير بيبدأ بـ [[NEXT_PUBLIC_]] بيتكتب جوه الـ JavaScript **وقت الـ build**، فلازم يبقى موجود وقتها (ARG في الـ Dockerfile)، مش في [[.env.production]] بس. والـ DSN مش سر: أي حد يقدر يشوفه في الـ JS. و [[onRouterTransitionStart]] بيسجّل التنقل بين الصفحات.

### [[next.config.ts]]

~~~text next.config.ts
import { withSentryConfig } from "@sentry/nextjs/config";

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: { name: process.env.GIT_SHA },
  silent: !process.env.CI,
});
~~~

[[withSentryConfig]] بيلف إعداد Next: لو فيه [[SENTRY_AUTH_TOKEN]] بيرفع الـ source maps وقت الـ build، فالـ stack trace في Sentry يبان بأسماء ملفاتك بدل الكود المضغوط. في v11 بيتستورد من [[@sentry/nextjs/config]]. جرّبنا من [[@sentry/nextjs]]:

~~~text npx next build
⨯ Failed to load next.config.ts, see more info here https://nextjs.org/docs/messages/next-config-error
> Build error occurred
TypeError: (0 , _nextjs.withSentryConfig) is not a function
~~~

---

## ٢. التجربة

route مؤقت بيرمي:

~~~text app/api/boom/route.ts (اتمسح بعد التجربة)
export async function GET() {
  throw new Error("boom-from-test");
}
~~~

وشغّلنا الـ build بـ [[SENTRY_DSN=http://publickey123@localhost:6048/1]] و [[APP_ENV=staging]] و [[GIT_SHA=sha-777]]. شكل الـ DSN: [[http://المفتاح@السيرفر/رقم_المشروع]].

~~~text الناتج
curl localhost:6045/api/boom     500
curl localhost:6045/api/health   {"ok":true,"version":"sha-777"}
~~~

والسيرفر الصغير استقبل ٥ طلبات:

~~~text الناتج
=== POST /api/1/envelope/?sentry_version=7&sentry_key=publickey123&sentry_client=sentry.javascript.nextjs%2F11.5.0
(× 5: span، و client_report، و session، و event، و span)
~~~

[[envelope]] شكل Sentry للإرسال: سطر header وبعدين items. والـ event فيه:

~~~text الناتج: من الـ event
{"trace":{"environment":"staging","release":"sha-777",...,"transaction":"GET /api/boom","sample_rate":"0.1"}}
{"type":"event"}
{"exception":{"values":[{"type":"Error","value":"boom-from-test","stacktrace":{...
~~~

الخطأ، والبيئة، والـ release. وبعتنا الطلب تاني بـ [[Cookie: better-auth.session_token=SECRET-SESSION-abc]]:

~~~text الناتج
has boom: True
has session secret: False
has cookie key: False
"request":{"headers":{"host":"localhost:6045","user-agent":"curl/8.21.0","accept":"*/*",...},"method":"GET","url":"http://localhost:6045/api/boom?q=1","query_string":"q=1"},"user":{"ip_address":"::1"}
~~~

الـ cookie مش موجودة في الحدث. بس [[user.ip_address]] موجود؛ لو مش عايزه، شيله في [[beforeSend]] (خيار في [[Sentry.init]] بيعدّل أي حدث قبل ما يتبعت).

وأخيرًا نفس الـ build **من غير** [[SENTRY_DSN]] على بورت تاني: [[/api/boom]] رجّع 500 عادي، و [[/api/health]] شغال، والسيرفر الصغير موصلوش ولا طلب. يعني في الـ dev مفيش حاجة بتتبعت ولا بتقع.

> وامسح الـ route التجريبي. route بيرمي خطأ وفضل في الإنتاج حصلت في مشروع حقيقي (درس [[Sentry]] في تاب «بناء مشروع كامل»).

---

## ٣. الباك أب

~~~bash
docker exec teach-proj0407-pg pg_dump -U projlab -Fc myapp_dev > backup.dump
~~~

- [[pg_dump]]: بيطلّع القاعدة كلها. و [[-Fc]] (format custom): ملف مضغوط بيترجع بـ [[pg_restore]]، وتقدر ترجّع منه جدول واحد لو عايز.
- في المشروع: [[docker compose exec -T db pg_dump -U myapp -Fc myapp > backup.dump]]. و [[-T]] من غير terminal، عشان الناتج يروح للملف نضيف.

~~~text الناتج
13222 bytes، وأوله: P G D M P
~~~

[[PGDMP]] توقيع ملفات الـ custom format. والـ restore في قاعدة جديدة:

~~~bash
docker exec teach-proj0407-pg createdb -U projlab myapp_restore
docker exec -i teach-proj0407-pg pg_restore -U projlab -d myapp_restore < backup.dump
~~~

[[-i]] عشان الملف يدخل للكونتينر من [[<]]. وعدّينا الصفوف في الاتنين:

~~~text الناتج: Course | user | Enrollment
myapp_dev|3|2|0
myapp_restore|3|2|0
~~~

نفس الأرقام: الباك أب ده بيترجع فعلًا. في الإنتاج: cron يومي، والملف يتنسخ **برّه السيرفر** (لو الديسك راح، الباك أب اللي عليه راح معاه).

---

## الخلاصة

| البند | اتعمل إزاي |
|---|---|
| أخطاء السيرفر | [[register()]] و [[onRequestError]] |
| أخطاء المتصفح | [[instrumentation-client.ts]] و [[NEXT_PUBLIC_SENTRY_DSN]] وقت الـ build |
| أنهي deploy كسر | [[release: GIT_SHA]] |
| مفيش cookies ولا باسوردات | [[dataCollection]] (v11) |
| [[withSentryConfig]] | من [[@sentry/nextjs/config]] |
| uptime | خدمة برّه بتطلب [[/api/health]] كل دقيقة |
| باك أب | [[pg_dump -Fc]] برّه السيرفر، واتجرّب [[pg_restore]] |`,
          lines: [
            R`SDK بتاع Next.`,
            R`Next بينادي [[register]] مرة لما السيرفر يقوم.`,
            R`على Node runtime بس: حمّل إعداد Sentry للسيرفر.`,
            R`قفلة الدالة.`,
            R`أي خطأ في server component أو route أو action يروح لـ Sentry.`,
            R`نفس الـ SDK.`,
            R`الإعداد:`,
            R`الـ DSN من البيئة. لو مش موجود (dev)، Sentry مبيبعتش حاجة.`,
            R`staging ولا production.`,
            R`رقم الـ commit من الـ image.`,
            R`قيس أداء ١٠٪ من الطلبات بس.`,
            R`متبعتش cookies ولا أجسام الطلبات (v11: [[dataCollection]] بدل [[sendDefaultPii]]).`,
            R`قفلة الإعداد.`
          ],
          sol: R`اتجرّب من غير حساب Sentry: DSN بيشاور على سيرفر صغير على الجهاز بيطبع أي حاجة توصله. route بيرمي [[boom-from-test]] رجّع 500، ووصل للسيرفر الصغير ٥ طلبات على [[/api/1/envelope/]] (spans و session و client_report)، واحد فيهم event فيه الخطأ نفسه، ومعاهم [["release":"sha-777"]] و [["environment":"staging"]] (القيم اللي اتشغّل بيها). ومن غير DSN التطبيق اشتغل عادي.

الـ build نجح مع [[withSentryConfig]] من [[@sentry/nextjs/config]]، ووقع بـ [[withSentryConfig is not a function]] لما اتستورد من [[@sentry/nextjs]]. و [[sendDefaultPii]] طلّع خطأ TypeScript في v11.

اللي متجرّبش: الـ dashboard والـ alerts ورفع الـ source maps (محتاجين حساب Sentry و [[SENTRY_AUTH_TOKEN]]).

Checklist الإطلاق (حطها في آخر الـ README): الدومين و HTTPS، و [[/api/health]] عليه uptime، و Sentry بـ release، وباك أب يومي برّه السيرفر واتجرّب restore، و [[BETTER_AUTH_SECRET]] طويل وعشوائي، و [[ufw]] قافل كل حاجة غير 22 و 80 و 443، وكل البنود في [[DONE.md]].`,
          solCode: R`// ── instrumentation.ts ──
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") await import("./sentry.server.config");
}

export const onRequestError = Sentry.captureRequestError;

// ── sentry.server.config.ts ──
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV ?? "development",
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  dataCollection: { cookies: false, httpBodies: [] },
});

// ── instrumentation-client.ts ──
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
  tracesSampleRate: 0.1,
  dataCollection: { cookies: false, httpBodies: [] },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

// ── next.config.ts ──
import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: { name: process.env.GIT_SHA },
  silent: !process.env.CI,
});`
        }
      ]
    }
]);
