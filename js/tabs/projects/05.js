// تكملة تاب projects: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/projects/01.js (شرح حقول الدرس في أوله)
MORE("projects", [
    {
      t: "مشروع ٥: REST API بـ Express و Postgres",
      l: 2,
      n: "API مهام: Prisma 7 على Postgres، و auth بـ JWT وأدوار، و Zod على كل input، واختبارات supertest على قاعدة حقيقية، وتوثيق OpenAPI",
      items: [
        {
          cmd: "مشروع ٥: الـ spec والـ schema",
          title: "تصمم الجداول وقايمة الـ endpoints قبل الكود إزاي؟",
          desc: R`المشروع: API لإدارة المهام. أي حد يعمل حساب ويدخل، وكل مستخدم يشوف ويعدّل ويمسح مهامه هو بس، والأدمن يشوف كل المستخدمين. ده «backend» مشروع ٤ الحقيقي، وأي frontend تعمله بعد كده يقدر يكلمه.

المحطة دي: [[docs/api.md]] فيه كل endpoint (method، ومسار، ومين مسموحله، والـ status codes)، و [[prisma/schema.prisma]] و أول migration.

خلصت يعني: (١) ٩ endpoints مكتوبين: register، و login، وقايمة المهام بفلتر وصفحات، وإنشاء، وقراية، وتعديل، ومسح، و [[/admin/users]]، و [[/health]]. (٢) لكل واحد: 2xx و 400 و 401 و 403 و 404 و 409 المتوقعين. (٣) [[npx prisma migrate dev --name init]] نجح على Postgres محلي. (٤) الباسورد hash، والإيميل unique، والمهمة بتتمسح لو صاحبها اتمسح، وفيه index على [[(userId, createdAt)]].

الدروس: [[ERD]] و [[schema.prisma]] و [[قايمة الـ endpoints]] في تاب «بناء مشروع كامل»، و [[إعداد Prisma 7]] و [[schema.prisma]] في تاب «SQL و Prisma»، و [[resources و URLs]] و [[4xx صح]] في تاب «APIs متقدمة».`,
          example: R`model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  role         Role     @default(USER)
  createdAt    DateTime @default(now())
  tasks        Task[]
}

model Task {
  id        String    @id @default(uuid())
  title     String
  done      Boolean   @default(false)
  dueDate   DateTime?
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([userId, createdAt])
}`,
          try: R`اعمل Postgres DB محلي ([[createdb tasks_dev]]) ومشروع Node بـ [[type=module]]، وركّب Prisma 7 زي درس [[إعداد Prisma 7]]. اكتب [[docs/api.md]] (جدول: Method، Path، Auth، Body، Responses)، وبعدين الـ schema، وبعدين [[npx prisma migrate dev --name init]] و [[npx prisma generate]]. افتح [[prisma/migrations/*/migration.sql]] واقرا الـ SQL: فين الـ UNIQUE؟ وفين الـ ON DELETE CASCADE؟`,
          flag: "script",
          deep: {
            why: R`قايمة الـ endpoints هي العقد بينك وبين أي frontend. لو كتبتها الأول، هتلاقي المشاكل وهي على الورق: «الأدمن يشوف مهام الناس ولا لأ؟»، «المهمة اللي مش بتاعتي 403 ولا 404؟». ولو كتبت الكود الأول، القرارات دي بتتاخد بالصدفة وبتختلف من endpoint للتاني.`,
            how: R`[[id String @id @default(uuid())]]: UUID مش رقم متسلسل، عشان محدش يخمّن [[/tasks/2]] و [[/tasks/3]]. ده مش حماية لوحده (الحماية هي فحص الملكية)، بس بيقلل المعلومات اللي بتتسرب (عدد المهام عندك).

[[passwordHash]] مش [[password]]: الاسم نفسه بيفكرك إن الباسورد عمره ما يتخزن زي ما هو.

[[role Role @default(USER)]] مع [[enum Role { USER ADMIN }]]: القيم محددة في القاعدة، ومحدش يقدر يحط [["SUPERADMIN"]].

[[onDelete: Cascade]] على العلاقة: مسح المستخدم بيمسح مهامه. البديل ([[Restrict]]) كان هيمنع مسح أي مستخدم عنده مهام.

[[@@index([userId, createdAt])]]: أكتر query هيتعمل «مهام المستخدم ده، الأحدث الأول». الـ index المركّب ده بيخدمه بالظبط (درس [[composite index]] في تاب «SQL و Prisma»).

و [[@updatedAt]] Prisma بيحدّثه لوحده في كل update.

قرار «مهمة واحد تاني = 404 مش 403» اتاخد هنا: 403 بيقول «موجودة بس مش بتاعتك»، وده معلومة. 404 مبيقولش حاجة. اكتبه في [[docs/api.md]] عشان ميتنسيش.`,
            when: R`قبل أول route. ولو المشروع فيه أكتر من ٤ أو ٥ جداول، ارسم ERD الأول (درس [[ERD]]).`,
            mistakes: R`id رقم متسلسل في الـ URL من غير فحص ملكية. أو [[password]] كعمود. أو [[role String]] حر. أو تنسى الـ index فأول ١٠٠ ألف مهمة الـ API يبطأ. أو تعدّل في ملف migration اتعمل apply قبل كده بدل ما تعمل migration جديد. أو تنسى [[prisma generate]] بعد الـ migrate (في Prisma 7 الـ migrate مبيعملش generate لوحده).`
          },
          lines: [
            R`جدول المستخدمين.`,
            R`UUID بيتولّد لوحده.`,
            R`الإيميل unique: القاعدة نفسها بتمنع التكرار.`,
            R`الـ hash بس، عمر الباسورد ما يتخزن.`,
            R`الدور، وافتراضيًا [[USER]].`,
            R`وقت الإنشاء.`,
            R`العلاقة العكسية: مهام المستخدم (مش عمود في القاعدة).`,
            R`قفلة الجدول.`,
            R`جدول المهام.`,
            R`UUID.`,
            R`العنوان.`,
            R`خلصت ولا لأ، وافتراضيًا لأ.`,
            R`ميعاد اختياري، فـ [[?]].`,
            R`صاحب المهمة.`,
            R`العلاقة: لو المستخدم اتمسح، مهامه تتمسح.`,
            R`وقت الإنشاء.`,
            R`Prisma بيحدّثه مع كل تعديل.`,
            R`index للـ query الأشهر: مهام مستخدم مرتبة بالوقت.`,
            R`قفلة الجدول.`
          ],
          sol: R`بعد [[migrate dev]]: [[Your database is now in sync with your schema.]] وفولدر [[prisma/migrations/التاريخ_init/migration.sql]] فيه [[CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN')]] و [[CREATE UNIQUE INDEX "User_email_key"]] و [[ON DELETE CASCADE]] على الـ foreign key، و [[CREATE INDEX "Task_userId_createdAt_idx"]].

[[docs/api.md]] المتوقع (مختصر):
[[POST /auth/register]]: public، 201 أو 400 أو 409. [[POST /auth/login]]: public، 200 أو 401 (نفس الرد للإيميل الغلط والباسورد الغلط). [[GET /tasks?done=&page=&pageSize=]]: user، 200 أو 401 أو 400 (pageSize أكبر من ١٠٠). [[POST /tasks]]: user، 201 أو 400. [[GET و PATCH و DELETE /tasks/:id]]: user صاحبها أو admin، 200/204 أو 404 (حتى لو موجودة ومش بتاعته) أو 400 (id مش UUID). [[GET /admin/users]]: admin، 200 أو 401 أو 403. [[GET /health]].

الحل المرجعي فيه [[prisma.config.ts]] والـ schema كامل. لاحظ [[output = "../src/generated/prisma"]]: الـ client بيتولّد جوه [[src]] وبيتحط في [[.gitignore]].`,
          solCode: R`// ── prisma.config.ts ──
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
});

// ── prisma/schema.prisma ──
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum Role {
  USER
  ADMIN
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  role         Role     @default(USER)
  createdAt    DateTime @default(now())
  tasks        Task[]
}

model Task {
  id        String    @id @default(uuid())
  title     String
  done      Boolean   @default(false)
  dueDate   DateTime?
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([userId, createdAt])
}`
        },
        {
          cmd: "مشروع ٥: الهيكل والأخطاء",
          title: "ترتب الـ API ويبقى لكل خطأ رد بنفس الشكل إزاي؟",
          desc: R`ابني الهيكل قبل أي ميزة: [[config.ts]] بيتحقق من المتغيرات، و [[db.ts]]، و [[validate()]] middleware بـ Zod، و [[AppError]] و error handler واحد، و [[app.ts]] منفصل عن [[server.ts]]، و modules لكل ميزة.

خلصت يعني: (١) متغير ناقص في [[.env]] بيوقّف السيرفر أول ما يقوم برسالة فيها اسمه. (٢) أي خطأ (validation، أو مش موجود، أو JSON بايظ، أو إيميل متكرر، أو 404 على مسار مش موجود، أو crash) بيرجع [[{ error: { code, message } }]] بالـ status الصح. (٣) الـ 500 مبيطلّعش تفاصيل للعميل، وبيتكتب في اللوج. (٤) [[app.ts]] مبيعملش [[listen]]، فالاختبارات تستورده. (٥) Express 5، فالـ async errors بتوصل للـ handler لوحدها.

الدروس: [[express()]] و [[error middleware]] و [[async errors في Express 5]] و [[config.js بـ zod]] و [[routes / controllers / services]] و [[helmet]] و [[app و server]] في تاب «Backend بـ Node»، و [[feature folders]] و [[شكل الأخطاء]] في تاب «بناء مشروع كامل».`,
          example: R`export const app = express();
app.use(helmet());
app.use(express.json({ limit: "20kb" }));

app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/openapi.json", (req, res) => res.json(openapi));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => next(new AppError(404, "NOT_FOUND", "المسار ده مش موجود")));
app.use(errorHandler);`,
          try: R`اعمل الملفات دي بالهيكل: [[src/config.ts]]، و [[src/db.ts]]، و [[src/lib/errors.ts]]، و [[src/middleware/validate.ts]]، و [[src/app.ts]]، و [[src/server.ts]]، و [[src/modules/]] فاضي. شغّل بـ [[npx tsx watch src/server.ts]]. جرّب بـ curl: [[/health]]، ومسار مش موجود، و POST بـ JSON بايظ ([[-d '{bad']]). وبعدين امسح [[JWT_SECRET]] من الـ .env وشغّل.`,
          flag: "script",
          deep: {
            why: R`من غير error handler واحد، كل route بيرجّع الخطأ بشكل: واحد [[{ error: "..." }]]، وواحد [[{ message }]]، وواحد HTML بتاع Express الافتراضي فيه stack trace. الـ frontend بيبقى مليان if. والأخطر إن الـ 500 الافتراضي بيطلّع رسايل داخلية (أسماء جداول، ومسارات ملفات).`,
            how: R`[[errorHandler]] هو آخر middleware (٤ باراميترز: [[err, req, res, next]]). بيترجم كل نوع خطأ: [[ZodError]] لـ 400 بالحقول ([[z.flattenError(err).fieldErrors]])، و [[AppError]] بالـ status والكود بتاعه، و [[entity.parse.failed]] (JSON بايظ من [[express.json()]]) لـ 400، و [[P2002]] من Prisma (unique اتكسر) لـ 409، وأي حاجة تانية 500 برسالة عامة و [[console.error]].

الـ 404 للمسارات: middleware قبل الـ error handler بيعمل [[next(new AppError(404, ...))]]، فحتى الـ 404 بنفس الشكل.

[[validate({ body, query, params })]]: بيعمل [[parse]]، ولو فشل بيرمي [[ZodError]] والـ handler بيمسكه. الـ body النضيف بيتحط مكان [[req.body]]. والـ query والـ params في [[res.locals]]: في Express 5 [[req.query]] بقى getter ومينفعش تكتب فيه، وأنواع [[req.params]] في [[@types/express]] بتبقى [[string | string[]]] فالـ TypeScript بيشتكي (حصل لنا وانا بكتب الحل).

Express 5: أي [[async]] handler بيرمي أو promise بترفض، الخطأ بيروح للـ error handler لوحده. في Express 4 كنت محتاج [[try/catch]] أو [[express-async-errors]].

[[helmet()]] بيحط security headers، و [[express.json({ limit: "20kb" })]] بيرفض أي body أكبر (مفيش سبب مهمة تبقى ميجا).

و [[server.ts]] بيعمل [[listen]] وبيقفل بنضافة مع [[SIGTERM]] (Docker و systemd بيبعتوه).`,
            when: R`أول يوم في أي API، قبل أول ميزة. نقل كل الـ routes لـ error handler واحد بعدين مملّ ومليان bugs.`,
            mistakes: R`[[res.status(500).json({ error: err.message })]] في كل catch، فرسايل Prisma تطلع للعميل. أو error handler بـ ٣ باراميترز فـ Express ميعتبروش error handler. أو [[app.listen]] جوه [[app.ts]] فالاختبارات تفتح بورت وتقع لما تتشغّل بالتوازي. أو [[z.object(...).parse(req.body)]] جوه كل route بدل middleware. أو الـ 404 middleware بعد الـ error handler.`
          },
          lines: [
            R`الـ app متصدّر من غير [[listen]]، عشان الاختبارات.`,
            R`security headers.`,
            R`JSON body، وأقصى حجم ٢٠ كيلو.`,
            R`health check من غير auth، للـ load balancer والمراقبة.`,
            R`مستند OpenAPI كـ JSON.`,
            R`Swagger UI على /docs من نفس المستند.`,
            R`routes الدخول.`,
            R`routes المهام (جواها [[requireAuth]]).`,
            R`routes الأدمن (جواها [[requireRole("ADMIN")]]).`,
            R`أي مسار ملوش route: 404 بنفس شكل الأخطاء.`,
            R`آخر حاجة: الـ handler اللي بيحوّل أي خطأ لرد.`
          ],
          sol: R`[[curl localhost:4000/health]] بيرجّع [[{"ok":true}]]. مسار مش موجود: [[404 {"error":{"code":"NOT_FOUND","message":"المسار ده مش موجود"}}]]. JSON بايظ: [[400]] و [[BAD_JSON]]. ومن غير [[JWT_SECRET]] السيرفر بيقع فورًا بـ [[ZodError]] فيه [[path: ["JWT_SECRET"]]] ورسالة إن القيمة ناقصة.

الاختبارات في المحطة الخامسة بتتأكد من [[NOT_FOUND]] و [[BAD_JSON]] و [[VALIDATION]] و [[CONFLICT]].

الحل المرجعي فيه الستة ملفات. لاحظ إن [[db.ts]] بياخد الرابط من [[config]] مش من [[process.env]] مباشرة، فالنوع string مش [[string | undefined]].`,
          solCode: R`// ── src/config.ts ──
import "dotenv/config";
import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().int().default(4000),
});

export const config = Env.parse(process.env);

// ── src/db.ts ──
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { config } from "./config";

export const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_URL }) });

// ── src/lib/errors.ts ──
import type { ErrorRequestHandler } from "express";
import { z, ZodError } from "zod";

export class AppError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: { code: "VALIDATION", message: "البيانات مش مظبوطة", details: z.flattenError(err).fieldErrors } });
  }
  if (err instanceof AppError) return res.status(err.status).json({ error: { code: err.code, message: err.message } });
  if (err?.type === "entity.parse.failed") return res.status(400).json({ error: { code: "BAD_JSON", message: "الـ JSON مش سليم" } });
  if (err?.code === "P2002") return res.status(409).json({ error: { code: "CONFLICT", message: "موجود قبل كده" } });
  console.error(err);
  res.status(500).json({ error: { code: "INTERNAL", message: "حصلت مشكلة، جرّب تاني" } });
};

// ── src/middleware/validate.ts ──
import type { RequestHandler } from "express";
import type { z } from "zod";

type Schemas = { body?: z.ZodType; query?: z.ZodType; params?: z.ZodType };

export const validate = (schemas: Schemas): RequestHandler => (req, res, next) => {
  if (schemas.body) req.body = schemas.body.parse(req.body);
  if (schemas.params) res.locals.params = schemas.params.parse(req.params);
  if (schemas.query) res.locals.query = schemas.query.parse(req.query);
  next();
};

// ── src/app.ts ──
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { errorHandler, AppError } from "./lib/errors";
import { authRouter } from "./modules/auth/auth.routes";
import { tasksRouter } from "./modules/tasks/tasks.routes";
import { adminRouter } from "./modules/admin/admin.routes";
import { openapi } from "./openapi";

export const app = express();
app.use(helmet());
app.use(express.json({ limit: "20kb" }));

app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/openapi.json", (req, res) => res.json(openapi));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => next(new AppError(404, "NOT_FOUND", "المسار ده مش موجود")));
app.use(errorHandler);

// ── src/server.ts ──
import { app } from "./app";
import { config } from "./config";
import { prisma } from "./db";

const server = app.listen(config.PORT, () => console.log($__btAPI على http://localhost:$__{config.PORT} والتوثيق على /docs$__bt));

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => prisma.$disconnect().then(() => process.exit(0))));
}`
        },
        {
          cmd: "مشروع ٥: auth والأدوار",
          title: "تعمل تسجيل ودخول بـ JWT وأدوار من غير ثغرات شائعة إزاي؟",
          desc: R`[[POST /auth/register]] و [[POST /auth/login]] بيرجّعوا [[{ token, user }]]. و [[requireAuth]] بيقرا الـ token من [[Authorization: Bearer]] ويحط المستخدم في [[res.locals.user]]، و [[requireRole("ADMIN")]] للأدمن.

خلصت يعني: (١) الباسورد بيتخزن bcrypt بـ cost ١٢، والرد عمره ما فيه [[passwordHash]]. (٢) الإيميل بيتعمله trim و lowercase قبل الفحص والحفظ. (٣) إيميل متكرر: 409. (٤) إيميل مش موجود وباسورد غلط: نفس الـ 401 ونفس الرسالة، وتقريبًا نفس الوقت. (٥) حد يبعت [[role: "ADMIN"]] في التسجيل يفضل USER. (٦) token من غير توقيع صح، أو منتهي، أو بـ algorithm تاني: 401. (٧) [[/admin/users]]: 401 من غير token، و 403 لـ USER، و 200 لـ ADMIN.

الدروس: [[bcrypt]] و [[jwt.sign و jwt.verify]] و [[requireAuth]] و [[requireRole]] و [[access و refresh]] في تاب «Backend بـ Node»، و [[4. مصادقة سليمة]] في تاب «الأمان»، و [[JWT ولا session]] في أسئلة انترفيو Backend.`,
          example: R`type Input = z.infer<typeof Credentials>;
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

function issue(user: { id: string; email: string; role: "USER" | "ADMIN" }) {
  const token = jwt.sign({ role: user.role }, config.JWT_SECRET, { subject: user.id, expiresIn: "15m", algorithm: "HS256" });
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

export async function register({ email, password }: Input) {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, passwordHash } });
  return issue(user);
}

export async function login({ email, password }: Input) {
  const user = await prisma.user.findUnique({ where: { email } });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) throw new AppError(401, "BAD_CREDENTIALS", "الإيميل أو الباسورد غلط");
  return issue(user);
}`,
          try: R`اكتب [[auth.schema.ts]] و [[auth.service.ts]] و [[auth.routes.ts]] و [[middleware/auth.ts]] و [[admin.routes.ts]]. جرّب بـ curl: سجّل بـ [[  Mona@Test.com ]]، وادخل بـ [[mona@test.com]]. ادخل بإيميل مش موجود وبباسورد غلط وقارن الردين. خد الـ token وحطه في jwt.io: إيه اللي جواه؟ وبعدين غيّر [[role]] فيه لـ ADMIN من jwt.io واستخدمه على [[/admin/users]].`,
          flag: "script",
          deep: {
            why: R`الـ auth هو أكتر حتة بتتعمل غلط في مشاريع المبتدئين، والغلطات هنا ثغرات حقيقية: باسورد في اللوج، أو رد بيقول «الإيميل ده مش مسجّل» (فحد يعرف مين عنده حساب)، أو [[jwt.decode]] بدل [[verify]]، أو [[role]] من الـ body. كل واحدة منهم اتلقت في مشاريع حقيقية.`,
            how: R`التسجيل: Zod بيعمل [[trim().toLowerCase()]] وبعدين [[.pipe(z.email())]]. الترتيب مهم: في Zod 4 لو كتبت [[z.email().trim()]]، فحص الإيميل بيحصل على النص قبل الـ trim، فـ [[" Mona@Test.com "]] بيترفض (اختبار التسجيل مسك ده في أول نسخة من الحل). و [[z.object]] بيشيل أي حقل مش متعرّف، فـ [[role]] من الـ body بيختفي قبل ما يوصل للـ service. والإيميل المتكرر بيوصل لـ [[P2002]] من القاعدة والـ error handler بيحوّله 409: مش بنعمل [[findUnique]] الأول لأن بين الفحص والإنشاء ممكن طلب تاني يعدّي (race).

الدخول: [[bcrypt.compare]] بيتعمل حتى لو المستخدم مش موجود، على [[DUMMY_HASH]]. كده وقت الرد تقريبًا واحد في الحالتين، فمحدش يعرف من التوقيت إن الإيميل موجود. والرسالة واحدة: «الإيميل أو الباسورد غلط».

الـ token: [[jwt.sign({ role }, secret, { subject: user.id, expiresIn: "15m", algorithm: "HS256" })]]. قصير (١٥ دقيقة) لأن مفيش طريقة تلغيه قبل ما يخلص. والمشروع ده مفيهوش refresh token عشان يفضل صغير؛ في مشروع حقيقي شوف [[access + refresh]] و [[refresh rotation]] في تاب «بناء مشروع كامل».

[[jwt.verify(token, secret, { algorithms: ["HS256"] })]]: تحديد الـ algorithm بيقفل ثغرة [[alg: none]] وتبديل الأنواع. وأي error في الـ verify (توقيع غلط، أو منتهي) = 401.

[[requireRole]] بيقرا الدور من الـ token. ده معناه إن تغيير دور حد مبيأثرش غير لما الـ token بتاعه يخلص (١٥ دقيقة). لو ده مش مقبول، اقرا الدور من القاعدة في [[requireAuth]].`,
            when: R`أي API فيه مستخدمين. ولو الـ frontend على نفس الدومين (Next.js)، cookie بـ session أبسط وأأمن من JWT في localStorage (مشروع ٦ بيعمل كده).`,
            mistakes: R`[[jwt.decode]] بدل [[verify]]. أو secret قصير أو مكتوب في الكود. أو [[expiresIn]] سنة. أو رسالة «الإيميل مش مسجّل». أو [[findUnique]] ثم [[create]] بدل الاعتماد على الـ unique. أو [[res.json(user)]] بالـ hash. أو [[role]] من [[req.body]]. أو bcrypt بـ cost ١٠ على باسوردات طولها ٢٠٠ حرف (bcrypt بيقرا أول ٧٢ بايت بس، عشان كده [[max(72)]]). وفي الانترفيو: «ليه JWT قصير؟» لأنه stateless، ومفيش طريقة تلغيه غير إنه يخلص.`
          },
          lines: [
            R`نوع الـ input من الـ Zod schema نفسه.`,
            R`hash وهمي للمقارنة لما المستخدم مش موجود، بيتحسب مرة واحدة.`,
            R`بتعمل الـ token والرد لمستخدم:`,
            R`التوقيع: الدور جوه، والـ id في [[sub]]، ١٥ دقيقة، و HS256.`,
            R`الرد: الـ token والمستخدم من غير الـ hash.`,
            R`قفلة الدالة.`,
            R`التسجيل:`,
            R`hash بـ cost ١٢ (حوالي ربع ثانية).`,
            R`إنشاء. لو الإيميل موجود، القاعدة ترمي P2002 ويبقى 409.`,
            R`رجّع token على طول، فالمستخدم داخل بعد التسجيل.`,
            R`قفلة الدالة.`,
            R`الدخول:`,
            R`دوّر على المستخدم.`,
            R`قارن دايمًا، حتى لو مش موجود، عشان الوقت يبقى واحد.`,
            R`أي حالة من الاتنين: نفس الـ 401 ونفس الرسالة.`,
            R`رجّع token.`,
            R`قفلة الدالة.`
          ],
          sol: R`[[  Mona@Test.com ]] بيتسجّل [[mona@test.com]]، والدخول بيه ينجح (اختبار «registers, never returns the hash, and logs in with a normalized email»). إيميل مش موجود وباسورد غلط: نفس الـ JSON بالظبط (اختبار «wrong password and unknown email give the same 401» بيقارن الـ body). و [[role: "ADMIN"]] في التسجيل: المستخدم [[USER]].

في jwt.io هتلاقي [[{ "role": "USER", "sub": "...", "iat": ..., "exp": ... }]]. الـ payload مش متشفّر، أي حد يقراه، عشان كده مفيش فيه إيميل ولا أي حاجة حساسة. ولو غيّرت [[role]] لـ ADMIN، التوقيع مبقاش مطابق، و [[requireAuth]] بيرجّع 401 «الجلسة انتهت».

واختبار الأدوار: [[/admin/users]] 401 من غير token، و 403 لـ USER، و 200 لـ ADMIN وفيه مستخدمين من غير [[passwordHash]].`,
          solCode: R`// ── src/modules/auth/auth.schema.ts ──
import { z } from "zod";

export const Credentials = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()).meta({ format: "email", example: "mona@example.com" }),
  password: z.string().min(8).max(72),
}).meta({ id: "Credentials" });

export const AuthResponse = z.object({
  token: z.string(),
  user: z.object({ id: z.uuid(), email: z.email(), role: z.enum(["USER", "ADMIN"]) }),
}).meta({ id: "AuthResponse" });

// ── src/modules/auth/auth.service.ts ──
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { z } from "zod";
import { config } from "../../config";
import { prisma } from "../../db";
import { AppError } from "../../lib/errors";
import type { Credentials } from "./auth.schema";

type Input = z.infer<typeof Credentials>;
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

function issue(user: { id: string; email: string; role: "USER" | "ADMIN" }) {
  const token = jwt.sign({ role: user.role }, config.JWT_SECRET, { subject: user.id, expiresIn: "15m", algorithm: "HS256" });
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

export async function register({ email, password }: Input) {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, passwordHash } });
  return issue(user);
}

export async function login({ email, password }: Input) {
  const user = await prisma.user.findUnique({ where: { email } });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) throw new AppError(401, "BAD_CREDENTIALS", "الإيميل أو الباسورد غلط");
  return issue(user);
}

// ── src/modules/auth/auth.routes.ts ──
import { Router } from "express";
import { validate } from "../../middleware/validate";
import { Credentials } from "./auth.schema";
import * as auth from "./auth.service";

export const authRouter = Router();

authRouter.post("/register", validate({ body: Credentials }), async (req, res) => {
  res.status(201).json(await auth.register(req.body));
});

authRouter.post("/login", validate({ body: Credentials }), async (req, res) => {
  res.json(await auth.login(req.body));
});

// ── src/middleware/auth.ts ──
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { AppError } from "../lib/errors";

export type AuthUser = { id: string; role: "USER" | "ADMIN" };

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new AppError(401, "UNAUTHENTICATED", "لازم تسجّل دخول");
  try {
    const payload = jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] }) as jwt.JwtPayload;
    res.locals.user = { id: payload.sub!, role: payload.role } satisfies AuthUser;
  } catch {
    throw new AppError(401, "UNAUTHENTICATED", "الجلسة انتهت، سجّل دخول تاني");
  }
  next();
};

export const requireRole = (...roles: AuthUser["role"][]): RequestHandler => (req, res, next) => {
  if (!roles.includes((res.locals.user as AuthUser).role)) throw new AppError(403, "FORBIDDEN", "مش مسموحلك");
  next();
};

// ── src/modules/admin/admin.routes.ts ──
import { Router } from "express";
import { prisma } from "../../db";
import { requireAuth, requireRole } from "../../middleware/auth";

export const adminRouter = Router();
adminRouter.use(requireAuth, requireRole("ADMIN"));

adminRouter.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true, _count: { select: { tasks: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json(users);
});`
        },
        {
          cmd: "مشروع ٥: CRUD والملكية",
          title: "تمنع مستخدم يقرا أو يعدّل مهام غيره إزاي؟",
          desc: R`endpoints المهام الخمسة. كل واحد بيعدّي على [[requireAuth]] و [[validate]]، والـ service بتفلتر بصاحب المهمة في نفس الـ query، مش بعدها.

خلصت يعني: (١) [[GET /tasks]] بيرجّع [[{ items, total, page, pageSize }]] مرتبة من الأحدث، وبيقبل [[done=true|false]]. (٢) [[pageSize]] أكبر من ١٠٠: 400. (٣) مهمة واحد تاني: 404 في القراية والتعديل والمسح. (٤) الأدمن بيوصل لكل المهام. (٥) [[PATCH]] جسم فاضي: 400. (٦) id مش UUID: 400 مش 500. (٧) [[DELETE]] بيرجّع 204 من غير body. (٨) الـ title بيتعمله trim، وفاضي أو أطول من ٢٠٠: 400.

الدروس: [[ownership (IDOR)]] و [[pagination]] و [[Prisma client]] في تاب «Backend بـ Node»، و [[1. Broken Access Control]] في تاب «الأمان»، و [[ownership]] في تاب «بناء مشروع كامل»، و [[PUT و PATCH]] و [[201 و 204 و 202]] في تاب «APIs متقدمة».`,
          example: R`const scope = (user: AuthUser) => (user.role === "ADMIN" ? {} : { userId: user.id });
export async function get(user: AuthUser, id: string) {
  const task = await prisma.task.findFirst({ where: { id, ...scope(user) }, select });
  if (!task) throw new AppError(404, "NOT_FOUND", "المهمة مش موجودة");
  return task;
}

export function create(user: AuthUser, data: z.infer<typeof CreateTask>) {
  return prisma.task.create({ data: { ...data, userId: user.id }, select });
}

export async function update(user: AuthUser, id: string, data: z.infer<typeof UpdateTask>) {
  const { count } = await prisma.task.updateMany({ where: { id, ...scope(user) }, data });
  if (count === 0) throw new AppError(404, "NOT_FOUND", "المهمة مش موجودة");
  return get(user, id);
}`,
          try: R`اكتب [[tasks.schema.ts]] و [[tasks.service.ts]] و [[tasks.routes.ts]]. جرّب بـ curl بمستخدمين: (١) المستخدم أ يعمل مهمة. (٢) المستخدم ب يعمل GET و PATCH و DELETE على الـ id بتاعها. (٣) ب يعمل [[GET /tasks]]: لازم total صفر. (٤) [[GET /tasks/abc]]. (٥) [[PATCH]] بـ [[{}]]. (٦) [[GET /tasks?pageSize=1000]].`,
          flag: "script",
          deep: {
            why: R`IDOR (Insecure Direct Object Reference) هو أشهر ثغرة في APIs حقيقية: الـ endpoint بيتأكد إنك داخل، ومبيتأكدش إن الحاجة بتاعتك. غيّر الرقم في الـ URL وشوف فواتير الناس. OWASP حاطط Broken Access Control رقم ١. والحل مش صعب، بس لازم يبقى في كل query من غير استثناء.`,
            how: R`[[scope(user)]] بيرجّع [[{}]] للأدمن و [[{ userId: user.id }]] لأي حد تاني، وبيتحط في [[where]] كل query. [[findFirst({ where: { id, ...scope(user) } })]]: لو المهمة موجودة بس مش بتاعتك، الـ query بيرجّع null زي ما تكون مش موجودة، فبيبقى 404.

التعديل والمسح بـ [[updateMany]] و [[deleteMany]] بنفس الـ where، والنتيجة [[count]]. لو صفر يبقى 404. ليه مش [[findFirst]] وبعدين [[update]]؟ عشان دي query واحدة ذرّية: مفيش فرصة إن حاجة تتغير بين الفحص والتعديل، وأقل رحلة للقاعدة.

القايمة: [[findMany]] و [[count]] في [[$transaction]]، فالاتنين بيشوفوا نفس الداتا. الترتيب [[createdAt desc]] وبعده [[id desc]]، عشان مهمتين في نفس الـ millisecond ميتبدلوش بين الصفحات. و [[select]] ثابت: الـ API مبيرجّعش [[userId]] ولا [[updatedAt]] غير لو محتاجهم.

الـ schemas: [[ListQuery]] بـ [[z.coerce.number()]] (الـ query دايمًا strings) و [[max(100)]] و [[default]]، و [[done]] من [["true"|"false"]] لـ boolean. [[UpdateTask]] كل حقوله optional و [[refine]] بيمنع الجسم الفاضي. [[IdParams]] بـ [[z.uuid()]] عشان id غلط ميوصلش للقاعدة ويرجّع 500 (Postgres بيرمي على UUID مش سليم).

الحذف 204: [[res.status(204).end()]] من غير JSON.`,
            when: R`في كل endpoint بيقرا أو يكتب داتا ليها صاحب. ولو الداتا ليها أكتر من مستوى (شركة ثم مستخدم)، نفس الفكرة بـ [[tenantId]] (فئة [[multi-tenant SaaS]] في تاب «بناء مشروع كامل»).`,
            mistakes: R`[[findUnique({ where: { id } })]] وبعدين [[if (task.userId !== user.id) 403]]: شغال، بس بيسرّب إن المهمة موجودة، وسهل حد ينساه في endpoint جديد. أو الملكية في الـ route بدل الـ service، فالـ job أو الـ webhook اللي بينادي الـ service مباشرة يعدّي. أو [[pageSize]] من غير حد. أو ترتيب من غير tie-breaker فالصفحات يتكرر فيها عنصر. أو [[req.params.id]] يوصل للقاعدة من غير فحص فالـ UUID البايظ يبقى 500.`
          },
          lines: [
            R`الأدمن من غير فلتر، وأي حد تاني مهامه بس. بيتحط في كل query.`,
            R`قراية مهمة:`,
            R`الـ id والملكية في نفس الـ where، و [[select]] بالأعمدة المسموحة بس.`,
            R`مش موجودة أو مش بتاعتك: نفس الـ 404.`,
            R`رجّعها.`,
            R`قفلة الدالة.`,
            R`إنشاء:`,
            R`صاحبها هو اللي عامل الطلب، من الـ token مش من الـ body.`,
            R`قفلة الدالة.`,
            R`تعديل:`,
            R`تعديل ذرّي بنفس الفلتر، والنتيجة عدد الصفوف اللي اتعدلت.`,
            R`صفر يعني مش موجودة أو مش بتاعتك.`,
            R`رجّع النسخة الجديدة.`,
            R`قفلة الدالة.`
          ],
          sol: R`المستخدم ب على مهمة أ: GET و PATCH و DELETE كلهم [[404 {"error":{"code":"NOT_FOUND","message":"المهمة مش موجودة"}}]]، و [[GET /tasks]] بيرجّع [[total: 0]] (اختبار «another user's task is 404 for read, update and delete (no IDOR)»). [[/tasks/abc]] و [[PATCH {}]]: 400 [[VALIDATION]]. [[pageSize=1000]]: 400.

والقايمة: ٥ مهام بـ [[pageSize=2]]: الصفحة الأولى [[t5, t4]] و [[total: 5]]، والتالتة فيها واحدة (اختبار «pagination returns pages in a stable order»). والتاريخ [["2026-10-01"]] بيرجع [["2026-10-01T00:00:00.000Z"]] (بـ [[z.coerce.date()]]).

الحل المرجعي: الـ schemas والـ service والـ routes.`,
          solCode: R`// ── src/modules/tasks/tasks.schema.ts ──
import { z } from "zod";

export const Task = z.object({
  id: z.uuid(),
  title: z.string(),
  done: z.boolean(),
  dueDate: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
}).meta({ id: "Task" });

export const CreateTask = z.object({
  title: z.string().trim().min(1).max(200),
  dueDate: z.coerce.date().optional(),
}).meta({ id: "CreateTask" });

export const UpdateTask = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  done: z.boolean().optional(),
  dueDate: z.coerce.date().nullable().optional(),
}).refine(v => Object.keys(v).length > 0, "ابعت حقل واحد على الأقل").meta({ id: "UpdateTask" });

export const ListQuery = z.object({
  done: z.enum(["true", "false"]).transform(v => v === "true").optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const IdParams = z.object({ id: z.uuid() });

export const TaskPage = z.object({ items: z.array(Task), total: z.number().int(), page: z.number().int(), pageSize: z.number().int() }).meta({ id: "TaskPage" });

// ── src/modules/tasks/tasks.service.ts ──
import type { z } from "zod";
import { prisma } from "../../db";
import { AppError } from "../../lib/errors";
import type { AuthUser } from "../../middleware/auth";
import type { CreateTask, ListQuery, UpdateTask } from "./tasks.schema";

const select = { id: true, title: true, done: true, dueDate: true, createdAt: true } as const;
const scope = (user: AuthUser) => (user.role === "ADMIN" ? {} : { userId: user.id });

export async function list(user: AuthUser, { done, page, pageSize }: z.infer<typeof ListQuery>) {
  const where = { ...scope(user), ...(done === undefined ? {} : { done }) };
  const [items, total] = await prisma.$transaction([
    prisma.task.findMany({ where, select, orderBy: [{ createdAt: "desc" }, { id: "desc" }], skip: (page - 1) * pageSize, take: pageSize }),
    prisma.task.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function get(user: AuthUser, id: string) {
  const task = await prisma.task.findFirst({ where: { id, ...scope(user) }, select });
  if (!task) throw new AppError(404, "NOT_FOUND", "المهمة مش موجودة");
  return task;
}

export function create(user: AuthUser, data: z.infer<typeof CreateTask>) {
  return prisma.task.create({ data: { ...data, userId: user.id }, select });
}

export async function update(user: AuthUser, id: string, data: z.infer<typeof UpdateTask>) {
  const { count } = await prisma.task.updateMany({ where: { id, ...scope(user) }, data });
  if (count === 0) throw new AppError(404, "NOT_FOUND", "المهمة مش موجودة");
  return get(user, id);
}

export async function remove(user: AuthUser, id: string) {
  const { count } = await prisma.task.deleteMany({ where: { id, ...scope(user) } });
  if (count === 0) throw new AppError(404, "NOT_FOUND", "المهمة مش موجودة");
}

// ── src/modules/tasks/tasks.routes.ts ──
import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { CreateTask, IdParams, ListQuery, UpdateTask } from "./tasks.schema";
import * as tasks from "./tasks.service";

export const tasksRouter = Router();
tasksRouter.use(requireAuth);

tasksRouter.get("/", validate({ query: ListQuery }), async (req, res) => {
  res.json(await tasks.list(res.locals.user, res.locals.query));
});
tasksRouter.post("/", validate({ body: CreateTask }), async (req, res) => {
  res.status(201).json(await tasks.create(res.locals.user, req.body));
});
tasksRouter.get("/:id", validate({ params: IdParams }), async (req, res) => {
  res.json(await tasks.get(res.locals.user, res.locals.params.id));
});
tasksRouter.patch("/:id", validate({ params: IdParams, body: UpdateTask }), async (req, res) => {
  res.json(await tasks.update(res.locals.user, res.locals.params.id, req.body));
});
tasksRouter.delete("/:id", validate({ params: IdParams }), async (req, res) => {
  await tasks.remove(res.locals.user, res.locals.params.id);
  res.status(204).end();
});`
        },
        {
          cmd: "مشروع ٥: الاختبارات بـ supertest",
          title: "تختبر الـ API على قاعدة بيانات حقيقية من غير ما الاختبارات تبوّظ بعض إزاي؟",
          desc: R`اختبارات integration بتضرب الـ app بـ supertest (من غير بورت)، على قاعدة Postgres منفصلة للاختبار، وكل اختبار بيبدأ بقاعدة فاضية.

خلصت يعني: (١) [[npm test]] أخضر: auth (تسجيل وتطبيع وتكرار ونفس الـ 401 و role)، ومهام (401، و CRUD، و IDOR، و pagination، و 400)، وأدوار (401 و 403 و 200)، وتوثيق (openapi.json و /docs)، وأخطاء (404 و JSON بايظ). (٢) القاعدة [[tasks_test]] مش [[tasks_dev]]، والـ migrations بتتعمل لها أوتوماتيك قبل الاختبارات. (٣) مفيش اختبار بيعتمد على داتا اختبار تاني. (٤) helper [[signup()]] بيعمل مستخدم ويرجّع token.

الدروس: [[app و server]] و [[supertest]] و [[قاعدة الاختبار]] و [[factories]] و [[401 و 403 و 404]] في تاب «Backend بـ Node»، و [[vitest]] و [[test.each و beforeEach]] في تاب «فحص الكود».`,
          example: R`  it("another user's task is 404 for read, update and delete (no IDOR)", async () => {
    const owner = await signup();
    const other = await signup();
    const { body } = await api().post("/tasks").set("Authorization", $__btBearer $__{owner.token}$__bt).send({ title: "سر" }).expect(201);
    const as = { Authorization: $__btBearer $__{other.token}$__bt };
    await api().get($__bt/tasks/$__{body.id}$__bt).set(as).expect(404);
    await api().patch($__bt/tasks/$__{body.id}$__bt).set(as).send({ done: true }).expect(404);
    await api().delete($__bt/tasks/$__{body.id}$__bt).set(as).expect(404);
    await api().get("/tasks").set(as).expect(r => expect(r.body.total).toBe(0));
  });`,
          try: R`[[createdb tasks_test]] و [[.env.test]] فيه الرابط. اعمل [[vitest.config.ts]] بيقرا [[.env.test]] وفيه [[globalSetup]] بيعمل [[prisma migrate deploy]] و [[fileParallelism: false]]، و [[tests/setup.ts]] بيعمل [[TRUNCATE]] قبل كل اختبار. اكتب ١٣ اختبار على الأقل. وبعدين اكسر الملكية عمدًا (شيل [[...scope(user)]] من [[get]]) وشوف أنهي اختبار بيقع.`,
          flag: "script",
          deep: {
            why: R`الـ mocks بتكدب في API: لو عملت mock لـ Prisma، الاختبار مش هيمسك إن الـ unique constraint بيرمي P2002، ولا إن UUID بايظ بيوقّع Postgres. الاختبار على قاعدة حقيقية بيمسك الحاجات دي، وبيفضل سريع (١٣ اختبار في حوالي ٩ ثواني، أغلبها bcrypt). وده النوع اللي بيدّيك ثقة تعمل refactor.`,
            how: R`supertest بياخد الـ [[app]] (من غير [[listen]]) وبيفتح له بورت عشوائي لكل طلب وبيقفله. [[request(app).post(...).send(...).expect(201)]]، و [[.expect(r => ...)]] لفحوصات أعقد.

القاعدة: [[vitest.config.ts]] بيقرا [[.env.test]] بـ [[dotenv]] ويحطه في [[test.env]]، فـ [[DATABASE_URL]] جوه الاختبارات بيشاور على [[tasks_test]]. و [[config.ts]] بيعمل [[import "dotenv/config"]] اللي بيقرا [[.env]]، بس dotenv مبيكتبش فوق متغير موجود، فقيمة الاختبار بتكسب.

[[globalSetup]] بيتنفذ مرة قبل كل الاختبارات: [[npx prisma migrate deploy]] على قاعدة الاختبار. [[deploy]] مش [[dev]] و مش [[reset]]: بيطبّق الـ migrations الموجودة بس، ومبيسألش أسئلة، ومبيمسحش حاجة. (ملحوظة: Prisma 7 بقى بيرفض [[migrate reset]] لو حس إن اللي بيشغّله AI agent من غير موافقة صريحة، ودي حاجة كويسة.)

[[TRUNCATE "Task", "User" CASCADE]] في [[beforeEach]]: كل اختبار بيبدأ نضيف. و [[fileParallelism: false]] لأن الملفات كلها على نفس القاعدة، ولو اتنفذوا بالتوازي واحد هيمسح داتا التاني.

[[signup()]] بإيميل عشوائي: مفيش اتنين بيتخانقوا على نفس الإيميل. وللأدمن: بيعمل المستخدم، ويغيّر دوره في القاعدة، ويعمل login تاني عشان الـ token الجديد فيه الدور.`,
            when: R`لكل endpoint: الحالة السعيدة، وكل status code في [[docs/api.md]]. والـ services المعقدة ليها unit tests لوحدها كمان.`,
            mistakes: R`الاختبارات على قاعدة الـ dev فتمسح شغلك. أو [[migrate reset]] في كل تشغيل (بطيء وخطر لو الرابط غلط). أو بالتوازي على نفس القاعدة فتلاقي اختبارات flaky «ساعات بتقع». أو اختبار بيعتمد على مستخدم عمله اختبار قبله. أو [[expect(res.status).toBe(200)]] بس من غير ما تبص على الـ body. أو mock لـ bcrypt عشان السرعة وتنسى إن الـ hash نفسه بقى مش متختبر.`
          },
          lines: [
            R`اسم الاختبار بيقول الثغرة اللي بيقفلها.`,
            R`مستخدم صاحب المهمة.`,
            R`ومستخدم تاني.`,
            R`صاحبها يعمل مهمة.`,
            R`الـ header بتاع المستخدم التاني.`,
            R`القراية: 404 مش 403 ومش 200.`,
            R`التعديل: 404.`,
            R`المسح: 404.`,
            R`والقايمة بتاعته فاضية.`,
            R`قفلة الاختبار.`
          ],
          sol: R`بالحل المرجعي: [[Test Files 2 passed]] و [[Tests 13 passed]] في حوالي ٩ ثواني على Postgres 16 محلي، و [[tsc --noEmit]] نضيف.

لما شلنا [[...scope(user)]] من [[get]]: اختبار الـ IDOR وقع عند سطر القراية ([[expected 404 "Not Found", got 200 "OK"]])، و PATCH و DELETE فضلوا 404 لأنهم ليهم فلتر لوحدهم. عشان كده الاختبار بيجرّب التلاتة، مش واحد بس.

الاختبار اللي مسك مشكلة حقيقية وانا بكتب الحل: «registers ... normalized email» وقع بـ [[expected 201, got 400]] لأن [[z.email().trim()]] بيفحص قبل الـ trim. وده اتصلح بـ [[z.string().trim().toLowerCase().pipe(z.email())]].

الحل المرجعي فيه الـ config والـ setup والـ helpers والملفين.`,
          solCode: R`// ── vitest.config.ts ──
import { defineConfig } from "vitest/config";
import { config } from "dotenv";

export default defineConfig({
  test: {
    env: config({ path: ".env.test", quiet: true }).parsed,
    globalSetup: "./tests/global-setup.ts",
    setupFiles: ["./tests/setup.ts"],
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

// ── tests/setup.ts ──
import { afterAll, beforeEach } from "vitest";
import { prisma } from "../src/db";

beforeEach(async () => {
  await prisma.$executeRawUnsafe('TRUNCATE "Task", "User" CASCADE');
});
afterAll(() => prisma.$disconnect());

// ── tests/helpers.ts ──
import request from "supertest";
import { app } from "../src/app";
import { prisma } from "../src/db";

export const api = () => request(app);

export async function signup(email = $__btu$__{Math.random().toString(36).slice(2)}@test.com$__bt, role: "USER" | "ADMIN" = "USER") {
  const res = await api().post("/auth/register").send({ email, password: "password123" }).expect(201);
  if (role === "ADMIN") {
    await prisma.user.update({ where: { email }, data: { role } });
    const login = await api().post("/auth/login").send({ email, password: "password123" }).expect(200);
    return { token: login.body.token as string, id: res.body.user.id as string };
  }
  return { token: res.body.token as string, id: res.body.user.id as string };
}

// ── tests/auth.test.ts ──
import { describe, expect, it } from "vitest";
import { api, signup } from "./helpers";

describe("auth", () => {
  it("registers, never returns the hash, and logs in with a normalized email", async () => {
    const res = await api().post("/auth/register").send({ email: "  Mona@Test.com ", password: "password123" }).expect(201);
    expect(res.body.user).toEqual({ id: expect.any(String), email: "mona@test.com", role: "USER" });
    expect(JSON.stringify(res.body)).not.toContain("passwordHash");
    await api().post("/auth/login").send({ email: "mona@test.com", password: "password123" }).expect(200);
  });

  it("rejects bad input with field errors", async () => {
    const res = await api().post("/auth/register").send({ email: "nope", password: "123" }).expect(400);
    expect(res.body.error.code).toBe("VALIDATION");
    expect(Object.keys(res.body.error.details)).toEqual(["email", "password"]);
  });

  it("duplicate email is 409", async () => {
    await signup("dup@test.com");
    const res = await api().post("/auth/register").send({ email: "dup@test.com", password: "password123" }).expect(409);
    expect(res.body.error.code).toBe("CONFLICT");
  });

  it("wrong password and unknown email give the same 401", async () => {
    await signup("a@test.com");
    const a = await api().post("/auth/login").send({ email: "a@test.com", password: "wrongpass1" }).expect(401);
    const b = await api().post("/auth/login").send({ email: "ghost@test.com", password: "wrongpass1" }).expect(401);
    expect(a.body).toEqual(b.body);
  });

  it("a user sending role: ADMIN on register stays USER", async () => {
    const res = await api().post("/auth/register").send({ email: "sneaky@test.com", password: "password123", role: "ADMIN" }).expect(201);
    expect(res.body.user.role).toBe("USER");
  });
});

// ── tests/tasks.test.ts ──
import { describe, expect, it } from "vitest";
import { api, signup } from "./helpers";

describe("tasks", () => {
  it("401 without a token, 401 with a garbage token", async () => {
    await api().get("/tasks").expect(401);
    await api().get("/tasks").set("Authorization", "Bearer abc").expect(401);
  });

  it("CRUD on my own task", async () => {
    const { token } = await signup();
    const auth = { Authorization: $__btBearer $__{token}$__bt };
    const created = await api().post("/tasks").set(auth).send({ title: "  اكتب الـ README  ", dueDate: "2026-10-01" }).expect(201);
    expect(created.body).toMatchObject({ title: "اكتب الـ README", done: false, dueDate: "2026-10-01T00:00:00.000Z" });
    const id = created.body.id;
    await api().patch($__bt/tasks/$__{id}$__bt).set(auth).send({ done: true }).expect(200).expect(r => expect(r.body.done).toBe(true));
    await api().get("/tasks?done=true").set(auth).expect(200).expect(r => expect(r.body.total).toBe(1));
    await api().delete($__bt/tasks/$__{id}$__bt).set(auth).expect(204);
    await api().get($__bt/tasks/$__{id}$__bt).set(auth).expect(404);
  });

  it("another user's task is 404 for read, update and delete (no IDOR)", async () => {
    const owner = await signup();
    const other = await signup();
    const { body } = await api().post("/tasks").set("Authorization", $__btBearer $__{owner.token}$__bt).send({ title: "سر" }).expect(201);
    const as = { Authorization: $__btBearer $__{other.token}$__bt };
    await api().get($__bt/tasks/$__{body.id}$__bt).set(as).expect(404);
    await api().patch($__bt/tasks/$__{body.id}$__bt).set(as).send({ done: true }).expect(404);
    await api().delete($__bt/tasks/$__{body.id}$__bt).set(as).expect(404);
    await api().get("/tasks").set(as).expect(r => expect(r.body.total).toBe(0));
  });

  it("pagination returns pages in a stable order", async () => {
    const { token } = await signup();
    const auth = { Authorization: $__btBearer $__{token}$__bt };
    for (let i = 1; i <= 5; i++) await api().post("/tasks").set(auth).send({ title: $__btt$__{i}$__bt }).expect(201);
    const p1 = await api().get("/tasks?page=1&pageSize=2").set(auth).expect(200);
    const p3 = await api().get("/tasks?page=3&pageSize=2").set(auth).expect(200);
    expect(p1.body).toMatchObject({ total: 5, page: 1, pageSize: 2 });
    expect(p1.body.items.map((t: { title: string }) => t.title)).toEqual(["t5", "t4"]);
    expect(p3.body.items).toHaveLength(1);
    await api().get("/tasks?pageSize=1000").set(auth).expect(400);
  });

  it("bad id and empty patch are 400", async () => {
    const { token } = await signup();
    const auth = { Authorization: $__btBearer $__{token}$__bt };
    await api().get("/tasks/not-a-uuid").set(auth).expect(400);
    const { body } = await api().post("/tasks").set(auth).send({ title: "x" });
    await api().patch($__bt/tasks/$__{body.id}$__bt).set(auth).send({}).expect(400);
  });
});

describe("roles", () => {
  it("admin routes: 401 without token, 403 for USER, 200 for ADMIN", async () => {
    const user = await signup();
    const admin = await signup("admin@test.com", "ADMIN");
    await api().get("/admin/users").expect(401);
    await api().get("/admin/users").set("Authorization", $__btBearer $__{user.token}$__bt).expect(403);
    const res = await api().get("/admin/users").set("Authorization", $__btBearer $__{admin.token}$__bt).expect(200);
    expect(res.body).toHaveLength(2);
    expect(JSON.stringify(res.body)).not.toContain("passwordHash");
  });
});

describe("docs", () => {
  it("serves the OpenAPI document and Swagger UI", async () => {
    const spec = await api().get("/openapi.json").expect(200);
    expect(spec.body.openapi).toBe("3.1.0");
    expect(Object.keys(spec.body.paths)).toContain("/tasks/{id}");
    await api().get("/docs/").expect(200).expect("content-type", /html/);
  });

  it("unknown route and broken JSON use the same error shape", async () => {
    const a = await api().get("/nope").expect(404);
    expect(a.body.error.code).toBe("NOT_FOUND");
    const b = await api().post("/auth/login").set("Content-Type", "application/json").send("{bad").expect(400);
    expect(b.body.error.code).toBe("BAD_JSON");
  });
});`
        },
        {
          cmd: "مشروع ٥: OpenAPI والـ CI",
          title: "توثّق الـ API من نفس الـ schemas وتشغّل الاختبارات في كل PR إزاي؟",
          desc: R`مستند OpenAPI 3.1 على [[/openapi.json]] و Swagger UI على [[/docs]]، والـ schemas فيه متولّدة من نفس Zod schemas اللي بتعمل validation، فالتوثيق ميبعدش عن الكود. و workflow في GitHub Actions بيشغّل Postgres ويعمل typecheck والاختبارات.

خلصت يعني: (١) [[/docs]] بيعرض الـ ٨ endpoints مقسمين (auth و tasks و admin)، وتقدر تجرّب منه بعد ما تحط الـ token في «Authorize». (٢) تغيير حقل في Zod schema بيظهر في التوثيق من غير ما تلمسه. (٣) كل PR بيشغّل الاختبارات على Postgres حقيقي في CI. (٤) README فيه: إزاي تشغّله محليًا، والـ env المطلوبة، ولينك للتوثيق.

الدروس: [[OpenAPI]] و [[Swagger UI و openapi-typescript]] و [[problem+json]] في تاب «APIs متقدمة»، و [[services]] و [[ci.yml]] في تاب «GitHub Actions»، و [[z.object و z.infer]] في تاب «TypeScript».`,
          example: R`const { schemas: raw } = z.toJSONSchema(z.globalRegistry, {
  io: "input",
  unrepresentable: "any",
  uri: id => $__bt#/components/schemas/$__{id}$__bt,
  override: ({ zodSchema, jsonSchema }) => {
    if (zodSchema._zod.def.type === "date") Object.assign(jsonSchema, { type: "string", format: "date-time" });
  },
});

const schemas = Object.fromEntries(Object.entries(raw).map(([id, { $schema, $id, ...s }]) => [id, s]));`,
          try: R`اكتب [[src/openapi.ts]]: أضف [[.meta({ id: "..." })]] على الـ schemas اللي هتتوثق، وحوّلهم بـ [[z.toJSONSchema(z.globalRegistry, ...)]]، واكتب الـ paths بإيدك. ركّب [[swagger-ui-express]]. افتح [[/docs]] وجرّب register ثم Authorize ثم GET /tasks. وبعدين اعمل [[.github/workflows/ci.yml]] بـ [[services: postgres]] واعمل push.`,
          flag: "script",
          deep: {
            why: R`API من غير توثيق معناه إن اللي هيبني الـ frontend (أو انت بعد شهرين) هيقرا الكود عشان يعرف الـ body شكله إيه. والتوثيق اللي بيتكتب بإيد لوحده بيبعد عن الكود من أول تعديل. لما الـ schema واحدة للـ validation والتوثيق، الاتنين مبيختلفوش. وفي CI، اختبارات API من غير قاعدة حقيقية كانت هتبقى نص اختبارات.`,
            how: R`Zod 4 فيه [[z.toJSONSchema]] مدمج. [[.meta({ id: "Task" })]] بيسجّل الـ schema في [[z.globalRegistry]] باسم. وتحويل الـ registry كله مرة واحدة بيطلّع [[{ schemas: { Task, CreateTask, ... } }]]، و [[uri]] بيخلي أي reference بين schemas تبقى [[#/components/schemas/Task]].

[[io: "input"]]: الـ schemas دي بتوصف الـ input (اللي العميل بيبعته). [[z.coerce.date()]] مالوش شكل JSON Schema، فـ [[unrepresentable: "any"]] بيعدّيه، و [[override]] بيحوّله لـ [[string]] بـ [[format: date-time]]. والإيميل: [[.pipe(z.email())]] الـ input بتاعه string عادي، فبنضيف [[.meta({ format: "email" })]] على الـ schema نفسها.

الـ JSON Schema اللي Zod بيطلّعه فيه [[$schema]] و [[$id]]؛ بنشيلهم قبل ما نحطهم في [[components]] عشان المستند يبقى نضيف.

الـ paths مكتوبة بإيد في object عادي: قصيرة، وبتستخدم helpers ([[json("Task")]] و [[error]]). فيه مكتبات بتعمل الـ paths كمان من الـ routes (زي [[zod-openapi]] أو [[@asteasolutions/zod-to-openapi]])، بس لـ ٨ endpoints الإيد أوضح.

CI: [[services: postgres]] بيشغّل Postgres جنب الـ job على [[localhost:5432]]، و [[options]] فيها health check عشان الـ steps تستنى لحد ما القاعدة تبقى جاهزة. نفس بيانات [[.env.test]]. و [[npx prisma generate]] قبل الـ typecheck لأن الـ client المتولّد مش في git.`,
            when: R`أي API هيستخدمه حد غيرك (frontend، أو موبايل، أو عميل). و CI من أول PR.`,
            mistakes: R`توثيق في Postman collection بعيد عن الكود. أو [[/docs]] مفتوح في الإنتاج لـ API داخلي. أو schemas التوثيق منفصلة عن schemas الـ validation. أو CI بيعمل mock للقاعدة. أو CI من غير [[prisma generate]] فالـ typecheck يقع بـ [[Cannot find module './generated/prisma/client']].`
          },
          lines: [
            R`حوّل كل الـ schemas المسجّلة في الـ registry مرة واحدة.`,
            R`بشكل الـ input (اللي العميل بيبعته).`,
            R`الأنواع اللي ملهاش JSON Schema متوقعش التحويل.`,
            R`أي reference بين schemas يبقى [[#/components/schemas/الاسم]].`,
            R`تعديل يدوي لأنواع معينة:`,
            R`التاريخ ([[z.coerce.date]]) يتوثق string بـ date-time.`,
            R`قفلة الـ override.`,
            R`قفلة الخيارات.`,
            R`شيل [[$schema]] و [[$id]] من كل schema قبل ما تتحط في المستند.`
          ],
          sol: R`[[/docs]] بيفتح Swagger UI فيه ٣ مجموعات، والـ schemas تحت: [[Credentials]] و [[AuthResponse]] و [[Task]] و [[CreateTask]] و [[UpdateTask]] و [[TaskPage]] و [[Error]]. [[CreateTask]] مثلًا بيطلع: [[title]] string بـ minLength 1 و maxLength 200 و required، و [[dueDate]] string بـ date-time. والاختبار «serves the OpenAPI document and Swagger UI» بيتأكد إن [[openapi]] هو [["3.1.0"]] وإن [[/tasks/{id}]] موجود وإن [[/docs/]] بيرجّع HTML.

الـ workflow اتعمله parse وهو سليم، بس متشغّلش على GitHub فعلًا وقت كتابة الحل؛ نفس الخطوات اتشغّلت محليًا على Postgres 16. ولاحظ [[env]] على مستوى الـ job: [[.env.test]] مش في git (زي أي ملف [[.env]])، فمن غيره [[prisma migrate deploy]] بيقع بـ [[datasource.url property is required]] و [[config.ts]] بيقع على [[JWT_SECRET]]. اتجرّب محليًا: من غير [[.env]] و [[.env.test]] وبالمتغيرين دول بس، الـ ١٣ اختبار عدّوا.

الحل المرجعي فيه [[openapi.ts]] كامل و [[ci.yml]] و [[package.json]]. ملحوظة: [[npm start]] بيشغّل بـ tsx عشان المشروع يفضل بسيط؛ في الإنتاج يا إما tsx في dependencies، يا إما build بـ [[tsc]] أو esbuild ل JS.`,
          solCode: R`// ── src/openapi.ts ──
import { z } from "zod";
import "./modules/auth/auth.schema";
import "./modules/tasks/tasks.schema";

const { schemas: raw } = z.toJSONSchema(z.globalRegistry, {
  io: "input",
  unrepresentable: "any",
  uri: id => $__bt#/components/schemas/$__{id}$__bt,
  override: ({ zodSchema, jsonSchema }) => {
    if (zodSchema._zod.def.type === "date") Object.assign(jsonSchema, { type: "string", format: "date-time" });
  },
});

const schemas = Object.fromEntries(Object.entries(raw).map(([id, { $schema, $id, ...s }]) => [id, s]));

const ref = (id: string) => ({ $ref: $__bt#/components/schemas/$__{id}$__bt });
const json = (id: string) => ({ content: { "application/json": { schema: ref(id) } } });
const error = { description: "خطأ", ...json("Error") };
const auth = [{ bearer: [] }];
const idParam = [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }];

export const openapi = {
  openapi: "3.1.0",
  info: { title: "Tasks API", version: "1.0.0" },
  components: {
    securitySchemes: { bearer: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
    schemas: {
      ...schemas,
      Error: { type: "object", properties: { error: { type: "object", properties: { code: { type: "string" }, message: { type: "string" }, details: { type: "object" } }, required: ["code", "message"] } } },
    },
  },
  paths: {
    "/auth/register": { post: { tags: ["auth"], requestBody: json("Credentials"), responses: { 201: { description: "اتعمل", ...json("AuthResponse") }, 400: error, 409: error } } },
    "/auth/login": { post: { tags: ["auth"], requestBody: json("Credentials"), responses: { 200: { description: "تمام", ...json("AuthResponse") }, 401: error } } },
    "/tasks": {
      get: {
        tags: ["tasks"], security: auth,
        parameters: [
          { name: "done", in: "query", schema: { type: "boolean" } },
          { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", minimum: 1, maximum: 100, default: 20 } },
        ],
        responses: { 200: { description: "صفحة مهام", ...json("TaskPage") }, 401: error },
      },
      post: { tags: ["tasks"], security: auth, requestBody: json("CreateTask"), responses: { 201: { description: "اتعملت", ...json("Task") }, 400: error, 401: error } },
    },
    "/tasks/{id}": {
      parameters: idParam,
      get: { tags: ["tasks"], security: auth, responses: { 200: { description: "المهمة", ...json("Task") }, 404: error } },
      patch: { tags: ["tasks"], security: auth, requestBody: json("UpdateTask"), responses: { 200: { description: "اتعدلت", ...json("Task") }, 400: error, 404: error } },
      delete: { tags: ["tasks"], security: auth, responses: { 204: { description: "اتمسحت" }, 404: error } },
    },
    "/admin/users": { get: { tags: ["admin"], security: auth, responses: { 200: { description: "اليوزرز" }, 401: error, 403: error } } },
  },
};

# ── .github/workflows/ci.yml ──
name: ci
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17-alpine
        env:
          POSTGRES_USER: projlab
          POSTGRES_PASSWORD: projlab
          POSTGRES_DB: tasks_test
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U projlab" --health-interval 5s --health-retries 10
    env:
      DATABASE_URL: postgresql://projlab:projlab@localhost:5432/tasks_test
      JWT_SECRET: test-secret-test-secret-test-secret
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx prisma generate
      - run: npm run typecheck
      - run: npm test

// ── package.json ──
{
  "name": "p5",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "vitest run",
    "dev": "tsx watch src/server.ts",
    "start": "node --import tsx src/server.ts",
    "typecheck": "tsc --noEmit"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@prisma/adapter-pg": "^7.10.0",
    "@prisma/client": "^7.10.0",
    "bcryptjs": "^3.0.3",
    "dotenv": "^18.0.4",
    "express": "^5.2.1",
    "helmet": "^8.3.0",
    "jsonwebtoken": "^9.0.3",
    "pg": "^8.23.0",
    "swagger-ui-express": "^5.0.1",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^26.6.3",
    "@types/pg": "^8.23.1",
    "@types/supertest": "^7.2.1",
    "@types/swagger-ui-express": "^4.1.8",
    "prisma": "^7.10.0",
    "supertest": "^7.3.0",
    "tsx": "^4.23.15",
    "typescript": "^7.0.2",
    "vitest": "^5.0.2"
  }
}`
        }
      ]
    }
]);
