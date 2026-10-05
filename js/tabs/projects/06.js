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
npm i -D prisma@7 tsx dotenv vitest @playwright/test
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

الـ seed في Prisma 7 بيتعرّف في [[prisma.config.ts]] ([[migrations.seed]])، وملف الـ seed فيه [[main()]] مش top-level await، لأن المشروع مش [[type: module]] وأي top-level await جوه tsx بيقع بـ [[ERR_REQUIRE_ASYNC_MODULE]] (حصل لنا).`,
            when: R`أول يوم. ومتكتبش ولا ميزة قبل ما [[/api/health]] يشتغل على رابط حقيقي (محطة Docker والدومين). ممكن تقدّم المحطة الخامسة لهنا لو عندك سيرفر جاهز.`,
            mistakes: R`[[new PrismaClient()]] في كل ملف. أو صفحات بتتعمل static وقت الـ build وبتقرا القاعدة، فالـ build يقع في CI. أو health check بيرجّع 200 دايمًا من غير ما يلمس القاعدة. أو seed بـ [[create]] فبيتكرر. أو [[.env]] فيه باسورد القاعدة الحقيقي وبيترفع (شوف [[.env لكل بيئة]] في تاب «بناء مشروع كامل»).`
          },
          lines: [
            R`مشروع Next بـ TypeScript و App Router و ESLint، من غير Tailwind ومن غير src.`,
            R`ادخل الفولدر.`,
            R`Prisma 7 و adapter الـ Postgres، و better-auth و zod، و [[server-only]].`,
            R`أدوات التطوير: Prisma CLI، و tsx للـ seed، و dotenv، والاختبارات.`,
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

[[safeNext]]: مسموح بس مسار بيبدأ بـ [[/]] ومش [[//]] ومش [[/\]]. [[//evil.example]] المتصفح بيعتبره رابط لدومين تاني.

الـ CSRF: better-auth بيرفض أي POST على [[/api/auth]] الـ [[Origin]] بتاعه مش [[BETTER_AUTH_URL]] (جرّبناه: 403). والـ Server Actions نفسها Next بيقارن فيها الـ Origin بالـ Host.`,
            when: R`أي مشروع Next الـ backend بتاعه Next نفسه. لو الـ auth في API منفصل (زي myapp في تاب «بناء مشروع كامل»)، درس [[BFF]] في تاب «Next.js».`,
            mistakes: R`[[<input type="hidden" name="userId">]] في الفورم. أو الحماية في الـ layout أو الـ proxy بس (درس [[proxy مش حماية]]). أو [[redirect(formData.get("next"))]] من غير فحص. أو [[try { redirect() } catch]] فالـ redirect ميحصلش (هو بيرمي عشان يشتغل، فلازم يبقى برّه الـ try). أو رسالة «الإيميل ده مسجّل» في التسجيل. أو تنسى [[nextCookies()]] في better-auth فالدخول من Server Action «ينجح» والـ cookie متتحطش. أو [[getSession]] من غير [[cache]] فالـ layout والصفحة يعملوا نفس الـ query.`
          },
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
export function safeNext(value: unknown, fallback = "/my") {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : fallback;
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

اختبار الـ open redirect بيعمل الحساب بـ [[request.post("/api/auth/sign-up/email")]] مباشرة، وبـ header [[Origin]]: من غيره better-auth بيرفض الطلب (CSRF).

CI: [[services: postgres]] بنفس بيانات [[.env.test]]. [[npx playwright install --with-deps chromium]] بينزّل المتصفح. و [[upload-artifact]] بـ [[if: failure()]] بيرفع [[test-results/]] اللي فيه الـ trace، فتقدر تشوف الاختبار اللي وقع خطوة خطوة بـ [[npx playwright show-trace]].

و [[concurrency]] بيلغي أي run قديم لنفس الـ branch لما تعمل push جديد.`,
            when: R`e2e لأهم رحلة أو اتنين (اللي لو وقعت محدش يقدر يستخدم المنتج)، و unit لأي منطق فيه قواعد. ولو كل ميزة جديدة ليها e2e، الـ CI هياخد نص ساعة.`,
            mistakes: R`e2e على [[next dev]] (بطيء، وبيجمّع الصفحات أول مرة، وبيخبي مشاكل الـ build). أو الاختبارات على قاعدة الـ dev. أو إيميل ثابت فالتشغيل التاني يقع. أو [[reuseExistingServer: true]] في CI. أو [[waitForTimeout]] بعد الـ action بدل ما تستنى [[toHaveURL]]. أو [[prisma migrate reset]] في الـ setup (بطيء، وخطر لو الرابط غلط؛ وPrisma 7 بيرفضه لو حس إنه متشغّل من AI agent من غير موافقة).`
          },
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
          sol: R`بالحل المرجعي: vitest [[Tests 4 passed]]، و Playwright [[4 passed]] على build إنتاج (Chromium بـ viewport الـ Pixel 7) في حوالي ٢٥ ثانية مع الـ build. و [[npm run lint]] و [[tsc --noEmit]] نضاف.

لما شلنا [[defaultValue]]: الرحلة وقعت عند [[toHaveURL(/\/courses\/react-from-zero$/)]] والصفحة لسه على [[/signup]]، لأن المحاولة التانية اتبعتت من غير اسم وإيميل. ده بالظبط الـ bug اللي الاختبار مسكه وانا بكتب الحل.

الـ workflow اتعمله parse بس متشغّلش على GitHub فعلًا؛ نفس الأوامر اتشغّلت محليًا. الحل فيه الـ configs والاختبارات و job الاختبار من [[ci.yml]] (job الـ deploy في المحطة الجاية).`,
          solCode: R`// ── vitest.config.mts ──
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
            how: R`الـ Dockerfile ٣ مراحل: [[builder]] ([[npm ci]] و [[prisma generate && next build]])، و [[migrate]] (نفس الـ builder بكل الـ node_modules وأمره [[prisma migrate deploy]])، و [[runner]] صغير فيه [[.next/standalone]] و [[static]] و [[public]] بس، ويوزر [[node]] مش root. الـ runner طلع ٣٤٣MB والـ migrate ٢.٥GB (فيه كل حاجة)؛ الـ migrate مبيشتغلش غير ثواني مع كل deploy، بس لو المساحة مهمة اعمله stage أصغر فيه prisma CLI بس.

compose: [[migrate]] بيستنى [[db]] يبقى healthy، و [[app]] بيستنى [[migrate]] يخلص بنجاح ([[service_completed_successfully]]). لو الـ migration فشلت، التطبيق القديم فاضل شغال (مع [[up -d]] مش هيتبدل). و [[$__{DB_PASSWORD:?...}]] بيوقّف compose لو المتغير ناقص بدل ما يشغّل Postgres بباسورد فاضي. وكل حاجة على شبكة compose الداخلية: [[db:5432]] و [[app:3000]] مش مفتوحين برّه، و Caddy بس على 80 و 443.

Caddy: [[{$DOMAIN} { reverse_proxy app:3000 }]] وخلاص: بيطلّع شهادة Let's Encrypt أول ما طلب يوصل (لازم الـ DNS يكون شاور على السيرفر، والبورت 80 و 443 مفتوحين)، وبيجددها لوحده، وبيعمل redirect من http. وشهاداته في volume [[caddy_data]] عشان متتطلبش تاني مع كل restart (Let's Encrypt ليه rate limits). ولـ [[localhost]] بيعمل شهادة من CA داخلي (عشان كده [[curl -k]]).

الـ CI: [[docker/build-push-action]] بيبني الـ targets ويرفعهم على [[ghcr.io]] بـ tag = الـ commit. وعلى السيرفر [[docker compose pull]] و [[up -d --no-build --wait]] بيستنى الـ healthchecks، وبعدين [[curl -fsS]] على الـ health بتاع الدومين: لو فشل الـ job يقع وتعرف.

[[BETTER_AUTH_URL]] في [[.env.production]] لازم يبقى [[https://دومينك]] بالظبط، وإلا كل POST هيترفض [[INVALID_ORIGIN]].`,
            when: R`بدري، يفضل في أول أسبوع (مع الـ skeleton). لو معندكش VPS، منصة زي Railway أو Render أو Fly بتشغّل نفس الـ Dockerfile، أو Vercel لـ Next من غير Docker (درس [[فين تنشر]]).`,
            mistakes: R`[[ports: ["5432:5432"]]] على الـ db في الإنتاج. أو [[npm run build]] في الـ runner. أو [[prisma migrate deploy]] في [[CMD]] بتاع التطبيق فأكتر من نسخة يعملوها مع بعض. أو الـ DNS لسه مش متحدث فـ Caddy يحاول يطلّع شهادة ويفشل كذا مرة ويخبط في الـ rate limit. أو [[NEXT_PUBLIC_*]] في [[.env.production]] وقت التشغيل (لازم وقت الـ build). أو اسم الـ image على GHCR فيه حروف كبيرة ([[github.repository]] ممكن يبقى [[Ali/MyApp]]) فالـ push يقع: خليه lowercase. أو [[latest]] بس من غير tag بالـ commit فمتعرفش ترجع لنسخة قبلها.`
          },
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
          sol: R`اتجرّب محليًا بـ Docker: الـ images اتبنت ([[myapp:latest]] ٣٤٣MB و [[myapp:migrate-latest]] ٢.٥GB)، و [[docker compose up -d]]: [[db]] healthy، و [[migrate]] [[Exited (0)]] بعد [[All migrations have been successfully applied]]، و [[app]] بقى [[healthy]]، و Caddy على 8443 بشهادة داخلية لـ [[localhost]]. [[curl -k https://localhost:8443/api/health]] رجّع [[{"ok":true,"version":"abc123"}]] (الـ GIT_SHA اللي اتبنى بيه)، و [[http://localhost:8080/]] رجّع [[308]] لـ HTTPS. والتسجيل عبر HTTPS حط [[__Secure-better-auth.session_token]]، و Origin غريب اترفض بـ 403.

اللي متجرّبش: Let's Encrypt على دومين حقيقي، والـ deploy job على GitHub. ده محتاج سيرفر ودومين عندك. (وملحوظة: البيئة اللي اتجرّب فيها الحل محتاجة proxy للنت، فالـ build اتعمل بنسخة من الـ Dockerfile فيها سطرين زيادة للـ proxy بس.)

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
          sol: R`اتجرّب من غير حساب Sentry: DSN بيشاور على سيرفر صغير على الجهاز بيطبع أي حاجة توصله. route بيرمي [[boom-from-test]] رجّع 500، ووصل للسيرفر الصغير ٤ طلبات على [[/api/1/envelope/]]، واحد فيهم فيه الخطأ نفسه، ومعاهم [["release":"sha-777"]] و [["environment":"staging"]] (القيم اللي اتشغّل بيها). ومن غير DSN التطبيق اشتغل عادي.

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
