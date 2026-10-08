// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "هيكل المشروع وخطة البناء",
      l: 1,
      n: "الفولدرات والبيئات، وتبني بأنهي ترتيب، وإمتى تقول الميزة خلصت",
      items: [
        {
          cmd: "monorepo",
          title: "كل التطبيقات في repo واحد",
          desc: R`الـ monorepo معناه إن الواجهة والـ API والكود المشترك كلهم في repo واحد. أي تغيير في شكل الداتا بيعدّي على الاتنين في commit واحد و PR واحد. مع pnpm workspaces كل فولدر بيبقى package لوحده. و [[packages/shared]] بيبقى فيه الـ types و Zod schemas اللي الاتنين بيستخدموها.

أوامر pnpm (filter و workspace:*) في تاب «Node و npm».`,
          example: R`myapp/
  apps/web/             Next.js: الصفحات والواجهة
  apps/api/             Express + Prisma: الـ API والـ webhooks
  apps/worker/          الـ jobs في الخلفية: إيميلات ومعالجة صور
  packages/shared/      Zod schemas و types مشتركة
  docs/                 requirements و erd و adr و runbook
  pnpm-workspace.yaml   بيعرّف apps/* و packages/*
  .github/workflows/    CI واحد بيفحص الكل`,
          try: R`اعمل الهيكل ده، وفي [[packages/shared]] حط [[export const CreateOrder = z.object({ courseId: z.string() })]]. استورده في الـ api عشان الـ validation، وفي الـ web عشان الفورم. بعدين غيّر اسم الحقل ولاحظ إن الاتنين بيقعوا في typecheck مع بعض.`,
          flag: "script",
          deep: {
            why: "لما كل تطبيق في repo لوحده، الـ API بتغيّر شكل الرد، والواجهة متعرفش غير لما تقع في الإنتاج. وكل ميزة بتحتاج PR في مكانين وتنسيق بينهم. الـ monorepo بيخلي العقد بين الاتنين كود مشترك، والـ typecheck بيمسك الاختلاف.",
            how: R`[[pnpm-workspace.yaml]] فيه [[packages: ["apps/*", "packages/*"]]]. كل فولدر فيه package.json باسم زي [[@myapp/shared]]. والـ api بيعتمد عليه بـ [[workspace:*]]، يعني دايمًا النسخة اللي في الـ repo.

الـ Zod schema المشترك بيستخدم في ٣ أماكن. السيرفر بيعمل بيه validation للطلب. والواجهة بتعمل بيه validation للفورم قبل ما تبعت. وكمان بتطلع منه الـ TypeScript types بـ [[z.infer]]. يعني تعريف واحد، ومفيش اختلاف.

كل تطبيق ليه Dockerfile و deploy لوحده. الـ monorepo بيوحّد الكود، مش الـ deploy. والـ worker ممكن يبقى نفس كود الـ api بس بيشغّل ملف تاني.

وفيه أدوات زي Turborepo و Nx بتعمل cache للـ builds والـ tests، ومفيدة لما المشروع يكبر. في الأول pnpm لوحده كفاية.

إمتى repos منفصلة أحسن؟ لما فرق مختلفة بتنشر في أوقات مختلفة، أو لما جزء منهم open source، أو SDK بيتنشر لعملا.`,
            when: "أول ما يبقى عندك أكتر من تطبيق بيتكلموا مع بعض: واجهة و API، أو API و worker، أو موقع ولوحة أدمن.",
            mistakes: R`إن [[packages/shared]] يستورد من [[apps/api]]، فتعمل دايرة. أو تحط فيه كود سيرفر (Prisma أو أسرار) فيتسحب لبندل المتصفح. أو يبقى فيه lockfile لكل تطبيق لوحده جوه الـ monorepo. وفي مشروع حقيقي كانت ملفات الـ build المضغوطة (zip و tar.gz) متعملها commit جنب الكود. دي مكانها الـ CI والـ releases، مش git.`
          },
          teach: R`## المثال شجرة فولدرات

المثال شكل الـ repo من برّه: ٣ تطبيقات في [[apps/]]، و package مشتركة في [[packages/]]، وملفات للمشروع كله. وتحت في الـ solCode الملفات اللي بتخلي ده يشتغل فعلًا. جرّبنا الـ solCode كامل بـ pnpm 10.33 و TypeScript 5.9 على ويندوز 11.

---

## ١. الشجرة سطر سطر

| المسار | فيه إيه | بيتعمله deploy؟ |
|---|---|---|
| [[apps/web/]] | Next.js: الصفحات | أيوه، لوحده |
| [[apps/api/]] | Express و Prisma والـ webhooks | أيوه، لوحده |
| [[apps/worker/]] | jobs في الخلفية: إيميلات وصور | أيوه، لوحده (أو نفس صورة الـ api بأمر تاني) |
| [[packages/shared/]] | Zod schemas و types | لأ، بيتسحب جوه اللي بيستخدمه |
| [[docs/]] | requirements و erd و adr | لأ |
| [[pnpm-workspace.yaml]] | بيقول لـ pnpm فين الـ packages | لأ |
| [[.github/workflows/]] | CI واحد للكل | لأ |

الفرق بين [[apps]] و [[packages]]: الـ apps حاجات بتشتغل، والـ packages مكتبات بتستخدمها الـ apps.

---

## ٢. [[pnpm-workspace.yaml]]

~~~text
packages:
  - "apps/*"
  - "packages/*"
~~~

ملف YAML: [[packages:]] مفتاح، وتحته قايمة (كل بند بـ [[- ]]). [[*]] معناها «أي فولدر جوه». كده pnpm بيعتبر كل فولدر في [[apps]] و [[packages]] فيه [[package.json]] مشروع لوحده في نفس الـ workspace.

---

## ٣. [[packages/shared/package.json]]

| الحقل | ليه |
|---|---|
| [["name": "@myapp/shared"]] | الاسم اللي التطبيقات هتعمل بيه import. [[@myapp/]] اسمه scope، بيجمّع packages المشروع |
| [["private": true]] | تمنع [[pnpm publish]] بالغلط على npm |
| [["type": "module"]] | الملفات ES Modules ([[import]] و [[export]]) |
| [["exports": { ".": "./src/index.ts" }]] | لما حد يكتب [[from "@myapp/shared"]] يوصل للملف ده. ملف TS مباشرة، من غير build |
| [["dependencies": { "zod": "^4" }]] | الـ shared نفسه محتاج Zod |

---

## ٤. [[packages/shared/src/index.ts]]

~~~text
import { z } from "zod";
export const CreateOrder = z.object({ courseId: z.string() });
export type CreateOrderInput = z.infer<typeof CreateOrder>;
~~~

- [[z.object({ courseId: z.string() })]] schema: object فيه [[courseId]] نص.
- [[typeof CreateOrder]] نوع الـ schema نفسه (مش القيمة).
- [[z.infer<...>]] بيطلّع من الـ schema نوع TypeScript: [[{ courseId: string }]]. تعريف واحد، وطالع منه الـ validation والـ type مع بعض.

---

## ٥. [["@myapp/shared": "workspace:*"]] في الـ api والـ web

[[workspace:]] معناها «متدوّرش على npm، خد اللي في الـ repo». و [[*]] أي نسخة. وجنبها [["typecheck": "tsc --noEmit"]]: [[tsc]] هو الـ TypeScript compiler، و [[--noEmit]] افحص بس ومتطلّعش ملفات JS. (كل app محتاج [[tsconfig.json]] صغير، احنا استخدمنا [[{ "compilerOptions": { "strict": true, "module": "nodenext", "noEmit": true }, "include": ["src"] }]].)

~~~powershell
pnpm install
~~~

بعدها بصّينا جوه [[apps/api/node_modules/@myapp/]]:

~~~text الناتج
lrwxrwxrwx ... shared -> .../mono/packages/shared
~~~

[[l]] في أول السطر و [[->]] معناهم symlink: مش نسخة، ده «شاور على» الفولدر الأصلي. فأي تعديل في الـ shared بيبان في الاتنين فورًا.

---

## ٦. [[apps/api/src/orders.ts]] و [[apps/web/src/order-form.ts]]

- الـ api بيستخدم **القيمة**: [[CreateOrder.parse(body)]] بيعمل validation ويرجّع الداتا بنوعها.
- الـ web بيستخدم **النوع** بس: [[import type]] معناها «النوع ده للفحص بس»، ومبيتسحبش أي كود في البندل.

---

## ٧. نكسر العقد ونشوف مين يقع

~~~powershell
pnpm -r typecheck
~~~

~~~text الناتج
Scope: 3 of 4 workspace projects
apps/api typecheck$ tsc --noEmit
apps/web typecheck$ tsc --noEmit
apps/api typecheck: Done
apps/web typecheck: Done
~~~

[[-r]] (recursive) شغّل السكربت في كل packages الـ workspace اللي فيها. و «3 of 4» لأن الـ root نفسه مش محسوب.

دلوقتي غيّرنا [[courseId]] لـ [[courseSlug]] في الـ shared بس:

~~~powershell
pnpm -r --no-bail typecheck
~~~

~~~text الناتج
apps/web typecheck: src/order-form.ts(2,44): error TS2353: Object literal may only specify known properties, and 'courseId' does not exist in type '{ courseSlug: string; }'.
apps/api typecheck: src/orders.ts(3,11): error TS2339: Property 'courseId' does not exist on type '{ courseSlug: string; }'.
apps/web typecheck: Failed
apps/api typecheck: Failed

Summary: 2 fails, 0 passes
~~~

- [[(2,44)]] السطر ٢ والعمود ٤٤ في الملف.
- [[--no-bail]] كمّل حتى لو واحد وقع، عشان تشوف كل الأخطاء. من غيرها pnpm بيوقف عند أول فشل ([[ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL]]).

تغيير واحد في مكان واحد، والاتنين وقعوا في نفس اللحظة. ده بالظبط اللي الـ monorepo بيشتريهولك.

---

## الخلاصة

| الحاجة | دورها |
|---|---|
| [[pnpm-workspace.yaml]] | بيعرّف الـ packages |
| [[@myapp/shared]] + [[exports]] | كود مشترك من غير build ولا publish |
| [[workspace:*]] | استخدم نسخة الـ repo (symlink) |
| [[z.infer]] | type من نفس الـ schema |
| [[pnpm -r --no-bail typecheck]] | افحص الكل، وشوف كل اللي وقع |

الـ shared مفيهوش كود سيرفر ولا أسرار، لأن الواجهة بتستورده.`,
          lines: [
            "جذر المشروع.",
            "الواجهة: تطبيق Next.js.",
            "الـ API: Express و Prisma والـ webhooks.",
            "الـ worker: بياخد الشغل التقيل من queue، ونفس الكود ممكن يتشغّل من الـ api.",
            "الكود المشترك: schemas و types من غير أي حاجة سيرفر.",
            "التوثيق جنب الكود، وبيتراجع في نفس الـ PR.",
            "ملف الـ workspace اللي بيخلي pnpm يعرف الـ packages.",
            "CI واحد بيعمل lint و test للكل، أو للي اتغير بس."
          ],
          sol: R`بعد [[pnpm install]] الـ package المشتركة بتتربط بـ symlink جوه [[node_modules/@myapp/shared]] في كل app، فمفيش build ولا publish. و [[pnpm -r typecheck]] يعدّي على الاتنين.

لما تغيّر [[courseId]] لـ [[courseSlug]] في الـ shared، شغّل [[pnpm -r --no-bail typecheck]] (من غير [[--no-bail]] pnpm بيقف عند أول واحد يقع). هتشوف غلطتين في نفس اللحظة: في الـ api [[Property 'courseId' does not exist on type '{ courseSlug: string; }']]، وفي الـ web [[Object literal may only specify known properties, and 'courseId' does not exist]]. ده الهدف كله: العقد بين الواجهة والـ API اتكسر، والـ CI مسكه قبل ما يوصل للمستخدم.

لو محدش وقع، غالبًا الـ web مستورد القيم بـ any، أو الـ package مش متعرّفة كـ [[workspace:*]] ومتسطبة نسخة قديمة من npm.`,
          solCode: R`// pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

// packages/shared/package.json
{
  "name": "@myapp/shared",
  "private": true,
  "type": "module",
  "exports": { ".": "./src/index.ts" },
  "dependencies": { "zod": "^4" }
}

// packages/shared/src/index.ts
import { z } from "zod";
export const CreateOrder = z.object({ courseId: z.string() });
export type CreateOrderInput = z.infer<typeof CreateOrder>;

// apps/api/package.json و apps/web/package.json (الجزء المهم)
"scripts": { "typecheck": "tsc --noEmit" },
"dependencies": { "@myapp/shared": "workspace:*" }

// apps/api/src/orders.ts
import { CreateOrder } from "@myapp/shared";
export function createOrder(body: unknown) {
  const { courseId } = CreateOrder.parse(body);
  return { courseId };
}

// apps/web/src/order-form.ts
import type { CreateOrderInput } from "@myapp/shared";
export const initial: CreateOrderInput = { courseId: "" };

// من الـ root
// pnpm install && pnpm -r --no-bail typecheck`
        },
        {
          cmd: "feature folders",
          title: "رتّب الكود حسب الميزة مش حسب النوع",
          desc: R`بدل ما يبقى عندك [[controllers/]] و [[services/]] و [[models/]]، والميزة الواحدة متفرقة في ٣ أماكن، خلي لكل ميزة فولدر فيه كل حاجتها: routes و service و schema. ده اسمه modular monolith: تطبيق واحد بـ deploy واحد، بس جواه modules حدودها واضحة.

القاعدة إن الـ module بيكلّم التاني عن طريق الـ service بتاعه بس، ومبيقراش جداوله مباشرة.`,
          example: R`apps/api/src/
  modules/auth/        auth.routes.ts  auth.service.ts  auth.schema.ts
  modules/courses/     courses.routes.ts  courses.service.ts  courses.schema.ts
  modules/orders/      orders.routes.ts  orders.service.ts  paymob.ts
  modules/uploads/     uploads.routes.ts  storage.ts
  lib/                 db.ts  logger.ts  errors.ts  config.ts
  middleware/          requireAuth.ts  requireRole.ts  rateLimit.ts
  app.ts               بيجمّع الـ routers والـ middleware
  server.ts            بيشغّل app.listen بس`,
          try: R`اعمل module الـ courses بالتلات ملفات. خلي الـ service ميستوردش حاجة من express خالص. وبعدين اكتب اختبار بينادي [[coursesService.list()]] مباشرة من غير سيرفر.`,
          flag: "script",
          deep: {
            why: "في التقسيم حسب النوع، أي تعديل في «الطلبات» بيلف على ٣ فولدرات. ومسح ميزة مستحيل تعرف هتلمس إيه. ومع الوقت كل حاجة بتكلّم كل حاجة. أما لما الميزة في فولدر واحد، بتفهمها وتعدّلها وتمسحها وحدها. ولو احتجت تفصلها service لوحدها بعدين، حدودها أصلًا جاهزة.",
            how: R`جوه الـ module فيه ٣ طبقات. الـ routes هي HTTP بس: بتقرا الـ input وتعمله parse بـ Zod، وتنادي الـ service، وترد. والـ service فيها القواعد (business rules)، ومتعرفش حاجة عن [[req]] و [[res]]. ودي أهم نقطة: نفس الدالة بيناديها route، أو webhook، أو job، أو اختبار. والوصول للقاعدة من جوه الـ service بـ Prisma. ولو المنطق كبر، ممكن تعمل repository لوحده، بس في الأول مش لازم.

فصل [[app.ts]] عن [[server.ts]] بيخلي الاختبارات تستورد الـ app وتضربه بـ supertest من غير ما تفتح بورت.

والكلام بين الـ modules بيبقى من الـ service. مثلًا الـ orders service لما الدفع ينجح بتنادي [[enrollments.grant(userId, courseId)]]، ومبتكتبش في جدول enrollment بنفسها. كده لو قاعدة الاشتراك اتغيرت، بتتغير في مكان واحد.

الطبقات والـ SOLID والـ patterns بالتفصيل في تاب «هندسة البرمجيات».`,
            when: "من أول module. ولو عندك مشروع قديم مترتب حسب النوع، انقل ميزة ميزة وانت بتعدّل فيها، مش كله مرة واحدة.",
            mistakes: R`إنك تحط الـ business logic جوه الـ route handler، فلما الـ webhook يحتاج نفس المنطق تنسخه، والنسختين يختلفوا بعد شهر. أو service بتاخد [[req]] كـ parameter. أو فولدر [[utils/]] يبقى مخزن لكل حاجة ملهاش مكان. وفي مشروع حقيقي كان controller الدفع لوحده ٢٠٠٠ سطر، وفيه ٣ بوابات. الأحسن ملف لكل بوابة، وواجهة واحدة يناديها الـ orders service.`
          },
          teach: R`## المثال شجرة، والـ solCode module كامل

المثال شكل [[apps/api/src/]] متقسم حسب الميزة. والـ solCode module الكورسات بملفاته التلاتة واختبار. جرّبنا الـ solCode على PostgreSQL 18 في Docker بـ Prisma 7.10 و Vitest 5 و Express 5 (ويندوز 11، Node 24)، بـ ٣ كورسات تجربة: [[SQL Basics]] و [[React Basics]] منشورين، و [[Advanced SQL (draft)]] مش منشور.

---

## ١. الشجرة

| الفولدر | نوعه | فيه |
|---|---|---|
| [[modules/auth/]] و [[modules/courses/]] و [[modules/orders/]] و [[modules/uploads/]] | ميزات | كل ميزة فيها routes و service و schema |
| [[lib/]] | حاجات مشتركة مش ميزات | القاعدة، واللوج، والأخطاء، والإعدادات |
| [[middleware/]] | بيتحط قدام الـ routes | requireAuth و requireRole و rateLimit |
| [[app.ts]] | بيبني الـ app | بيجمّع الـ routers والـ middleware ويرجّع [[app]] |
| [[server.ts]] | نقطة التشغيل | [[app.listen]] بس |

أسامي الملفات فيها اسم الميزة ([[courses.service.ts]] مش [[service.ts]])، عشان لما تفتح ٥ تابات في الـ editor تعرف مين مين.

---

## ٢. [[courses.schema.ts]]: شكل الـ input

~~~text
export const ListCourses = z.object({
  q: z.string().trim().max(100).optional(),
  take: z.coerce.number().int().min(1).max(50).default(20),
});
export type ListCoursesInput = z.infer<typeof ListCourses>;
~~~

- [[q]]: نص، [[trim()]] بيشيل المسافات من الأطراف، و [[max(100)]] حد أقصى، و [[optional()]] ممكن ميتبعتش.
- [[take]]: كام كورس يرجع. [[z.coerce.number()]] بيحوّل النص لرقم الأول، لأن أي حاجة في الـ query string بتوصل نص ([[?take=5]] يعني [["5"]]). و [[int()]] صحيح، و [[min(1).max(50)]] حدود، و [[default(20)]] لو مبعتوش.

جرّبناه:

~~~text الناتج
ListCourses.parse({ q: "  sql ", take: "5" })   =>  { q: 'sql', take: 5 }
ListCourses.parse({ take: "500" })              =>  Too big: expected number to be <=50
~~~

---

## ٣. [[courses.service.ts]]: القواعد، من غير HTTP

~~~text
import { db } from "../../lib/db";
import type { ListCoursesInput } from "./courses.schema";
~~~

[[../../]] يعني اطلع فولدرين ([[courses]] وبعده [[modules]]) لحد [[src/]]. و [[import type]] بيجيب النوع بس. ومفيش ولا import من express: [[grep -rn express src/modules/courses/courses.service.ts]] رجع فاضي (exit 1).

~~~text
list({ q, take = 20 }: Partial<ListCoursesInput> = {}) {
~~~

- [[{ q, take = 20 }]] destructuring: بيطلّع الحقلين من الـ object، و [[take]] ليه قيمة افتراضية.
- [[Partial<ListCoursesInput>]] نفس النوع بس كل الحقول اختيارية، عشان الاختبار ينادي [[list()]] من غير حاجة.
- [[= {}]] لو اتنادت من غير أي argument خالص.

~~~text
where: { published: true, ...(q && { title: { contains: q, mode: "insensitive" } }) },
~~~

ده أصعب سطر، من جوه لبرة:

1. [[{ title: { contains: q, mode: "insensitive" } }]] شرط Prisma: العنوان فيه الكلمة، و [[insensitive]] من غير فرق بين كبير وصغير (Postgres بيعمله [[ILIKE]]).
2. [[q && {...}]] لو [[q]] فاضي أو [[undefined]] النتيجة [[undefined]]، ولو فيه قيمة النتيجة الـ object.
3. [[...( )]] (spread) بيفرد الـ object جوه الـ where. وفرد [[undefined]] مبيضيفش حاجة. فالشرط بيتضاف بس لو فيه بحث.

~~~text
select: { id: true, slug: true, title: true, priceCents: true },
orderBy: { title: "asc" },
take,
~~~

[[select]] بيرجّع الأعمدة دي بس، فـ [[instructorId]] مبيطلعش. و [[orderBy]] ترتيب أبجدي. و [[take]] لوحدها اختصار [[take: take]].

جرّبنا [[coursesService.list({ q: "sql" })]]:

~~~text الناتج
[
  {
    id: 'cmuzcoqw000020siee7iwyh2k',
    slug: 'sql-basics',
    title: 'SQL Basics',
    priceCents: 49900
  }
]
~~~

[[Advanced SQL (draft)]] فيه «SQL» بس مطلعش، لأن [[published: true]].

---

## ٤. [[courses.routes.ts]]: HTTP بس

~~~text
coursesRouter.get("/courses", async (req, res) => {
  res.json({ data: await coursesService.list(ListCourses.parse(req.query)) });
});
~~~

من جوه لبرة: [[req.query]] (نصوص من الـ URL)، و [[ListCourses.parse]] بيعمل validation ويحوّل، و [[coursesService.list]] بيجيب، و [[res.json({ data: ... })]] بيرد. ولو الـ parse فشل، الـ ZodError بتوصل للـ error handler (400) من غير try/catch في Express 5. شغّلناه على سيرفر صغير فيه الـ router ده والـ errorHandler بتاع درس «شكل الأخطاء»:

~~~bash
curl -s "localhost:6018/courses?q=react&take=5"
curl -s "localhost:6018/courses?take=500"
~~~

~~~text الناتج
{"data":[{"id":"cmuzcoqw000030siej9cp8q04","slug":"react-basics","title":"React Basics","priceCents":59900}]}
{"error":{"code":"VALIDATION","message":"البيانات مش مظبوطة","details":[{"origin":"number","code":"too_big",...
~~~

---

## ٥. الاختبار: الـ service من غير سيرفر

- [[afterAll(() => db.$disconnect())]] بعد كل الاختبارات اقفل الاتصال بالقاعدة، وإلا Vitest يفضل مستني.
- الاختبار الأول: فيه نتايج، وأول واحد مفيهوش [[instructorId]] ([[not.toHaveProperty]]).
- التاني: كل عنوان فيه «sql» بعد [[toLowerCase()]]، و [[every]] بترجّع [[true]] لو الشرط صح للكل.

~~~powershell
npx vitest run src/modules
~~~

~~~text الناتج
 Test Files  1 passed (1)
      Tests  2 passed (2)
   Duration  1.06s
~~~

مفيش [[app.listen]] ولا supertest: الـ service دالة عادية.

---

## الخلاصة

| الطبقة | تعرف HTTP؟ | بتعمل إيه |
|---|---|---|
| schema | لأ | شكل الـ input وتحويله |
| service | لأ | القواعد والقاعدة. بيناديها route أو webhook أو job أو اختبار |
| routes | أيوه | تقرا، تعمل parse، تنادي الـ service، ترد |

الـ module بيكلّم module تاني من الـ service بتاعه، ومبيقراش جداوله.`,
          lines: [
            "كود الـ API.",
            "module الدخول: الـ routes، والمنطق، وschemas الـ validation.",
            "module الكورسات بنفس الشكل.",
            "module الطلبات، ومعاه التكامل مع البوابة في ملف لوحده.",
            "module الرفع، وجواه طبقة storage تقدر تبدّلها (local أو S3).",
            "حاجات مشتركة مش ميزات: القاعدة، واللوج، والأخطاء، والإعدادات.",
            "الـ middleware اللي بيتحط قدام الـ routes.",
            "بيبني الـ app ويرجّعه. الاختبارات بتستورده من هنا.",
            "بيشغّل السيرفر بس. ده الملف اللي بيتشغّل في الإنتاج."
          ],
          sol: R`الاختبار لازم يعدّي من غير ما تعمل [[app.listen]] ولا supertest: [[coursesService.list()]] دالة عادية بترجّع array. وعشان تتأكد إن الـ service نضيف، [[grep -rn express src/modules/courses/courses.service.ts]] لازم يرجع فاضي. الناتج المتوقع من Vitest: [[Test Files 1 passed]] و [[Tests 2 passed]].

الـ routes هي الوحيدة اللي تعرف HTTP: بتاخد [[req.query]]، وتعمله parse بالـ schema، وتنادي الـ service، وترجّع JSON. لو لقيت نفسك بتعدّي [[req]] أو [[res]] للـ service، أو بترمي [[res.status(404)]] من جواها، يبقى الحدود باظت. الـ service ترمي [[AppError]]، والـ handler هو اللي يحوّل.`,
          solCode: R`// modules/courses/courses.schema.ts
import { z } from "zod";
export const ListCourses = z.object({
  q: z.string().trim().max(100).optional(),
  take: z.coerce.number().int().min(1).max(50).default(20),
});
export type ListCoursesInput = z.infer<typeof ListCourses>;

// modules/courses/courses.service.ts
import { db } from "../../lib/db";
import type { ListCoursesInput } from "./courses.schema";

export const coursesService = {
  list({ q, take = 20 }: Partial<ListCoursesInput> = {}) {
    return db.course.findMany({
      where: { published: true, ...(q && { title: { contains: q, mode: "insensitive" } }) },
      select: { id: true, slug: true, title: true, priceCents: true },
      orderBy: { title: "asc" },
      take,
    });
  },
};

// modules/courses/courses.routes.ts
import { Router } from "express";
import { ListCourses } from "./courses.schema";
import { coursesService } from "./courses.service";

export const coursesRouter = Router();
coursesRouter.get("/courses", async (req, res) => {
  res.json({ data: await coursesService.list(ListCourses.parse(req.query)) });
});

// modules/courses/courses.service.test.ts
import { afterAll, expect, test } from "vitest";
import { db } from "../../lib/db";
import { coursesService } from "./courses.service";

afterAll(() => db.$disconnect());

test("بيرجّع الكورسات المنشورة بس، ومن غير أعمدة داخلية", async () => {
  const list = await coursesService.list();
  expect(list.length).toBeGreaterThan(0);
  expect(list[0]).not.toHaveProperty("instructorId");
});

test("البحث مش حساس لحالة الحروف", async () => {
  const list = await coursesService.list({ q: "sql" });
  expect(list.every((c) => c.title.toLowerCase().includes("sql"))).toBe(true);
});`
        },
        {
          cmd: ".env لكل بيئة",
          title: "dev و staging و prod وكل واحدة بإعداداتها",
          desc: R`نفس الكود بيشتغل في ٣ أماكن. dev على جهازك. و staging نسخة طبق الأصل من الإنتاج، بداتا تجربة ومفاتيح test من البوابة. و prod للناس الحقيقية. الفرق بينهم متغيرات بيئة بس، مش if جوه الكود.

واتأكد من المتغيرات كلها أول ما السيرفر يقوم. لو فيه متغير ناقص، السيرفر يقع فورًا برسالة واضحة، بدل ما يقع بعد ساعة في نص عملية دفع.`,
          example: R`import { z } from "zod";

const Env = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  WEB_ORIGIN: z.url(),
  PAYMOB_SECRET_KEY: z.string().min(1),
  PAYMOB_HMAC_SECRET: z.string().min(1),
  REDIS_URL: z.url().optional(),
});

export const config = Env.parse(process.env);`,
          try: R`حط الملف ده في [[lib/config.ts]]، وامسح [[JWT_SECRET]] من الـ .env وشغّل السيرفر. لازم يقع في أول ثانية برسالة فيها اسم المتغير. بعدين اعمل [[.env.example]] بنفس الأسماء ومن غير قيم.`,
          flag: "script",
          deep: {
            why: "المتغير الناقص من غير فحص بيطلع undefined، والمشكلة مبتبانش غير لما الكود يوصله: أول دفعة، أو أول إيميل. وفي staging بتكتشف المشاكل دي قبل الإنتاج. وفصل البيئات بيمنع أسوأ غلطة: مفاتيح Paymob الحقيقية في بيئة تجربة، أو قاعدة الإنتاج في جهاز التطوير.",
            how: R`كل تطبيق عنده [[.env.example]] متعمله commit، فيه أسماء المتغيرات ومن غير قيم. وعنده [[.env]] على الجهاز في [[.gitignore]]. وفي الإنتاج القيم بتيجي من المنصة، أو من [[env_file]] في compose على السيرفر.

[[Env.parse(process.env)]] بيشتغل مرة واحدة وقت الـ import. لو فيه حاجة غلط، بيرمي error فيه كل الحقول الغلط مرة واحدة، والسيرفر مبيقومش. ده اسمه fail fast. وكمان [[config]] بيبقى typed، فـ [[config.JWT_SECRET]] نوعه string مش [[string | undefined]].

خلي بالك إن NODE_ENV مش APP_ENV. [[NODE_ENV=production]] لازم يبقى في staging والإنتاج الاتنين، عشان المكتبات تشتغل بالوضع السريع. وعشان تفرّق بينهم استخدم APP_ENV.

وفي الواجهة، أي متغير بيبدأ بـ [[NEXT_PUBLIC_]] بيتحط في الـ JavaScript وقت الـ build، وأي حد يقدر يقراه. عشان كده مفيش أي سر يبدأ بيه. وكمان build الـ staging غير build الإنتاج لو القيم مختلفة.

وكل بيئة ليها حاجتها لوحدها: قاعدة بيانات، و bucket للملفات، و integration في Paymob بوضع test، وإيميلات staging تروح sandbox مش لناس حقيقيين. تفاصيل .env نفسه في تاب «Node و npm»، ولو اترفع على git شوف تاب «الأمان».`,
            when: "أول ملف تكتبه في أي API. وكل ما تضيف متغير: في config.ts، وفي .env.example، وفي إعدادات staging والإنتاج، في نفس الـ PR.",
            mistakes: R`staging بيستخدم قاعدة الإنتاج «مؤقتًا». أو [[NODE_ENV=staging]]، فمكتبات كتير تشتغل بوضع التطوير البطيء. وفي مشاريع حقيقية لقينا ٣ غلطات. الأولى مفاتيح Paymob و Bunny السرية كانت بتبدأ بـ [[NEXT_PUBLIC_]]، يعني كانت في الـ JavaScript عند كل زائر. التانية [[AUTH_SECRET]] كان ليه قيمة افتراضية في الكود، فلو المتغير ناقص السيرفر يشتغل عادي بسر معروف. والتالتة [[.env.example]] كان فيه [[JWT_SECRET]] والكود بيقرا [[JWT_ACCESS_SECRET]]، ومكانش فيه ولا متغير لـ Paymob، مع إنها البوابة الأساسية.`
          },
          teach: R`## ملف بيفحص الإعدادات قبل ما السيرفر يقوم

المثال ملف [[lib/config.ts]]: بيوصف كل متغير بيئة التطبيق محتاجه بـ Zod، ويفحص [[process.env]] مرة واحدة أول ما الملف يتعمل له import. لو فيه حاجة ناقصة أو غلط، بيرمي error والسيرفر ميقومش. جرّبناه بـ Zod 4.6 و Node 24 على ويندوز 11، بملف [[.env]] فيه كل حاجة ما عدا [[JWT_SECRET]]، وسيرفر من سطرين بيطبع [[listening]].

---

## ١. [[const Env = z.object({ ... })]]

[[z.object]] بيوصف object وكل حقل فيه. و [[process.env]] نفسه object: كل متغير بيئة مفتاح، وقيمته **نص دايمًا** (أو [[undefined]] لو مش موجود).

| السطر | الشرط | ليه |
|---|---|---|
| [[APP_ENV: z.enum([...])]] | واحدة من ٣ قيم بالظبط | [[dev]] أو [[prod]] بالغلط يقع بدل ما يعدّي |
| [[DATABASE_URL: z.url()]] | URL سليم | رابط ناقص يقع دلوقتي، مش أول query |
| [[JWT_SECRET: z.string().min(32)]] | ٣٢ حرف على الأقل | سر قصير بيتخمّن |
| [[WEB_ORIGIN: z.url()]] | URL | بيتستخدم في CORS وفي لينكات الإيميلات |
| [[PAYMOB_SECRET_KEY]] و [[PAYMOB_HMAC_SECRET]] | [[min(1)]] | مش فاضيين |
| [[REDIS_URL: z.url().optional()]] | URL أو مش موجود خالص | اختياري في dev |

[[z.url()]] في Zod 4 بقت دالة على [[z]] مباشرة (في Zod 3 كانت [[z.string().url()]]).

---

## ٢. [[export const config = Env.parse(process.env);]]

- [[Env.parse(...)]] بيفحص. لو تمام بيرجّع object فيه الحقول المتعرّفة بس، وبأنواعها. لو لأ بيرمي [[ZodError]].
- السطر ده برّه أي دالة، فبيشتغل **وقت الـ import**. يعني أول ما [[server.ts]] يعمل [[import { config } from "./lib/config"]]، الفحص بيحصل قبل أي سطر تاني.
- [[config.JWT_SECRET]] نوعه [[string]] مش [[string | undefined]]، فمش محتاج تكتب [[!]] أو تتأكد في كل مكان.

---

## ٣. التجربة: [[JWT_SECRET]] ناقص

[[node --env-file=.env]] بيخلي Node نفسه يقرا الملف ويحطه في [[process.env]] (من Node 20.6، من غير dotenv):

~~~powershell
node --env-file=.env server.mjs
~~~

~~~text الناتج
.../config.mjs:13
export const config = Env.parse(process.env);
                          ^

ZodError: [
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [
      "JWT_SECRET"
    ],
    "message": "Invalid input: expected string, received undefined"
  }
]
~~~

و [[listening]] متطبعتش، وخرج بكود 1. ده الـ fail fast.

- [[path]] اسم المتغير.
- [[received undefined]]: مش موجود خالص.

---

## ٤. أكتر من غلطة مرة واحدة

جرّبنا [[JWT_SECRET=short]] و [[APP_ENV=dev]] مع بعض:

~~~text الناتج (مختصر)
ZodError: [
  { "code": "invalid_value", "path": ["APP_ENV"],
    "message": "Invalid option: expected one of \"development\"|\"staging\"|\"production\"" },
  { "code": "too_small", "minimum": 32, "path": ["JWT_SECRET"],
    "message": "Too small: expected string to have >=32 characters" }
]
~~~

الاتنين ظهروا في نفس الرسالة، فبتصلّحهم مرة واحدة.

> خلي بالك: احنا حطينا القيم دي في الـ shell، والـ [[.env]] كان فيه [[APP_ENV=development]]. [[--env-file]] **مبيغيّرش** متغير موجود بالفعل في البيئة، فقيمة الـ shell هي اللي كسبت. ونفس الكلام في dotenv افتراضيًا.

ولما حطينا سر عشوائي طويل:

~~~powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
~~~

[[randomBytes(32)]] ٣٢ byte عشوائي، و [[base64url]] بيكتبهم ٤٣ حرف. السيرفر قام:

~~~text الناتج
listening development
~~~

---

## ٥. فخ في [[.env.example]]

الـ solCode فيه [[.env.example]]: نفس الأسامي من غير قيم، ويترفع على git عشان أي حد ينسخه لـ [[.env]]. جرّبنا سطر [[REDIS_URL=]] فاضي:

~~~text الناتج
"path": ["REDIS_URL"],
"message": "Invalid URL"
~~~

السطر الفاضي بيدّي [[""]] (نص فاضي)، مش [[undefined]]، و [[optional()]] بيقبل [[undefined]] بس. عشان كده المتغير الاختياري في الـ example بيتكتب تعليق: [[# REDIS_URL=redis://localhost:6379]].

---

## ٦. [[.gitignore]]

~~~text
.env
.env.*
!.env.example
~~~

- [[.env]] و [[.env.*]] (زي [[.env.production]]) ميترفعوش.
- [[!]] في الأول معناها استثناء: [[.env.example]] يترفع حتى لو طابق اللي فوقه.

---

## الخلاصة

| الحاجة | الفايدة |
|---|---|
| [[Env.parse(process.env)]] وقت الـ import | السيرفر يقع في أول ثانية، مش في نص دفعة |
| كل الأخطاء مع بعض | تصلّح مرة واحدة |
| [[config]] typed | مفيش [[undefined]] مفاجئ |
| [[.env.example]] في git | الأسامي معروفة لكل اللي في الفريق |
| [[APP_ENV]] مش [[NODE_ENV]] | [[NODE_ENV=production]] في staging والإنتاج الاتنين |

متغير جديد = سطر في [[config.ts]] وسطر في [[.env.example]] وقيمة في كل بيئة، في نفس الـ PR.`,
          lines: [
            "Zod هو اللي هيفحص المتغيرات.",
            "شكل الإعدادات المطلوبة.",
            "البيئة، ومسموح ٣ قيم بس.",
            "رابط القاعدة لازم يبقى URL سليم.",
            "سر التوكنات ٣٢ حرف على الأقل. السر القصير بيتكسر.",
            "رابط الواجهة، وبيتستخدم في CORS وفي روابط الإيميلات.",
            "مفتاح Paymob السري، وده مكانه السيرفر بس.",
            "سر الـ HMAC عشان نتحقق من الـ webhook.",
            "Redis اختياري في dev، بس في الإنتاج هتحتاجه للـ queues.",
            "قفلة الـ schema.",
            "افحص مرة واحدة وقت التشغيل، ولو فيه غلط السيرفر ميقومش خالص."
          ],
          sol: R`السيرفر لازم يقع قبل ما يطبع «listening»، بـ [[ZodError]] فيها [[path: ["JWT_SECRET"]]] و [[message: "Invalid input: expected string, received undefined"]] (ده شكل رسايل Zod 4). ولو حطيت قيمة قصيرة زي [[JWT_SECRET=short]] هتشوف [[Too small: expected string to have >=32 characters]]. ولو [[APP_ENV=dev]] هتشوف [[Invalid option: expected one of "development"|"staging"|"production"]]. وكل المتغيرات الغلط بتظهر مع بعض في نفس الرسالة، مش واحد واحد.

لو السيرفر اشتغل عادي، يبقى في الغالب الـ .env مش بيتقري أصلًا (ناقص [[import "dotenv/config"]] أو [[node --env-file=.env]])، والمتغير جاي من الـ shell. أو [[config]] بيتعمل import بعد ما السيرفر اشتغل. لازم يبقى أول حاجة في [[server.ts]].`,
          solCode: R`# .env.example: الأسماء بس، ويترفع على git
APP_ENV=development
DATABASE_URL=
JWT_SECRET=
WEB_ORIGIN=http://localhost:3000
PAYMOB_SECRET_KEY=
PAYMOB_HMAC_SECRET=
# اختياري: سيبه تعليق. REDIS_URL= فاضي بيوصل "" مش undefined، و z.url() بيرفضه
# REDIS_URL=redis://localhost:6379

# .gitignore
.env
.env.*
!.env.example`
        },
        {
          cmd: "ترتيب البناء",
          title: "تبدأ بإيه وتخلّص بإيه",
          desc: R`الترتيب اللي بيقلل الرجوع لورا: schema، وبعدين API، وبعدين UI، وبعدين auth، وبعدين الدفع، وفي الآخر الإطلاق. بس قبل ده كله اعمل «walking skeleton»: صفحة واحدة بتنادي endpoint واحد بيقرا من القاعدة، ومرفوعة على staging من أول أسبوع. كده مشاكل الـ deploy والـ CORS والمتغيرات بتظهر وهي لسه صغيرة.

وبعدين ابني ميزة ميزة بالعرض (vertical slice). كل ميزة من القاعدة للشاشة وتخلص. متعملش كل الجداول الأول، وبعدين كل الـ APIs، وبعدين كل الشاشات.`,
          example: R`أسبوع 1: skeleton: GET /health وصفحة بتعرضه، و CI، و deploy على staging
أسبوع 1: schema أولي و seed بكورسات تجربة
أسبوع 2: الكورسات: API القايمة والتفاصيل، وبعدين الصفحات بتاعتهم
أسبوع 3: auth: signup و login و refresh، وبعدين فورم الدخول وصفحة «حسابي»
أسبوع 4: الدفع: order، وبعدين Paymob، وبعدين webhook، وبعدين صفحة النتيجة
أسبوع 5: المشاهدة: الدروس للمشتركين بس، ورفع الفيديو للمدرّب
أسبوع 6: لوحة الأدمن، ومراقبة الأخطاء، والباك أب، والإطلاق`,
          try: R`اعمل الـ skeleton بتاع مشروعك النهارده: [[GET /health]] بيرجّع [[{ ok: true }]] من القاعدة، وصفحة Next بتعرضه، ومرفوعين على سيرفر أو منصة. متكتبش ولا ميزة قبل ما ده يشتغل على رابط حقيقي.`,
          flag: "script",
          deep: {
            why: "لو بنيت كل طبقة لوحدها، مفيش حاجة هتشتغل من أولها لآخرها لحد الأسبوع الخامس، وكل المفاجآت هتطلع في الآخر. والـ deploy تحديدًا مليان مفاجآت: الـ cookies مش شغالة على الدومين الحقيقي، والـ webhook مش واصل، والـ build بيقع على السيرفر.",
            how: R`الترتيب ده ليه منطق. القراية العامة (الكورسات) بتيجي الأول لأنها مش محتاجة auth، وبيبقى عندك حاجة تتشاف بسرعة. الـ auth قبل الطلبات لأن كل طلب محتاج صاحب. والدفع بعد الاتنين لأنه محتاج مستخدم وطلب. والمشاهدة بعد الدفع لأنها محتاجة اشتراك.

والـ vertical slice معناها إن الميزة «خلصت» فعلًا بكل طبقاتها واختباراتها. لو وقفت في أي أسبوع، اللي خلص شغال وتقدر توريه لحد.

الـ seed من أول أسبوع ([[prisma db seed]] في تاب «Node و npm»). من غير داتا تجربة، الواجهة بتتبني على بيانات فاضية، والمشاكل مبتبانش.

وابدأ في الحاجات اللي بتاخد وقت برّه الكود بدري. حساب التاجر في بوابة الدفع مثلًا محتاج أوراق ومراجعة ممكن تاخد أسابيع. والدومين وإعداد الإيميل (DNS) نفس الكلام. قدّمهم من أول يوم، عشان لما توصل للدفع متلاقيش نفسك مستني.

والحاجة اللي مش خلصانة تقدر ترفعها مخفية ورا feature flag، بدل ما تفضل في branch طويل بيبعد كل يوم عن main.`,
            when: "في أول المشروع كخطة، ومع كل ميزة كبيرة: قسّمها slices، وكل slice تخلص لوحدها.",
            mistakes: "إنك تأجّل الـ deploy لآخر أسبوع. أو تبني لوحة أدمن كاملة قبل ما الطالب يقدر يشتري. أو تبدأ الدفع في آخر أسبوع وتكتشف إن حساب التاجر لسه متفعّلش. أو تشتغل branch واحد ٣ أسابيع وتعمل merge مرة واحدة."
          },
          teach: R`## المثال خطة، والـ solCode أول حاجة فيها

المثال خطة ٦ أسابيع، كل سطر أسبوع والحاجة اللي بتخلص فيه. والـ solCode هو الـ walking skeleton: endpoint واحد في الـ API بيكلّم القاعدة، وصفحة واحدة في Next بتعرضه. جرّبنا جزء الـ API بـ Express 5 و Prisma 7.10 و PostgreSQL 18 في Docker (ويندوز 11). وجزء صفحة Next مشغّلناهوش هنا، وشرحه من توثيق Next.js.

---

## ١. الخطة: ليه الترتيب ده

| الأسبوع | اللي بيخلص | ليه في المكان ده |
|---|---|---|
| 1 | skeleton و CI و deploy على staging | مشاكل الـ deploy والـ CORS والمتغيرات تظهر وهي صغيرة |
| 1 | schema أولي و seed | الشاشات تتبني على داتا حقيقية مش فاضية |
| 2 | الكورسات (API وبعدين صفحات) | قراية عامة من غير auth، فبتتشاف بسرعة |
| 3 | auth | كل اللي بعد كده محتاج صاحب |
| 4 | الدفع | محتاج مستخدم وطلب. أخطر ميزة، فليها أسبوع لوحدها |
| 5 | المشاهدة ورفع الفيديو | محتاجة اشتراك، والاشتراك بييجي من الدفع |
| 6 | الأدمن والمراقبة والباك أب والإطلاق | قبل ما ناس حقيقية تدخل |

كل سطر **vertical slice**: الميزة من القاعدة للشاشة. «الكورسات: API القايمة والتفاصيل، وبعدين الصفحات بتاعتهم» يعني في آخر الأسبوع التاني فيه حاجة شغالة تتوري لحد، مش «كل الجداول خلصت».

---

## ٢. الـ API: [[GET /health]]

~~~text
app.get("/health", async (req, res) => {
  await db.$queryRaw$__btSELECT 1$__bt;
  res.json({ ok: true });
});
~~~

### [[db.$queryRaw$__btSELECT 1$__bt]]

- [[$queryRaw]] بيبعت SQL خام للقاعدة. وبيتكتب كـ **tagged template**: الـ SQL بين علامتين backtick بعد اسم الدالة على طول من غير أقواس، و Prisma بيحوّل أي [[$__{x}]] جواه لـ parameter آمن مش نص ملزوق.
- [[SELECT 1]] أبسط استعلام: مبيقراش أي جدول، بيرجّع رقم ١. الهدف مش النتيجة، الهدف إن القاعدة ردّت.
- [[await]] بيستنى. لو القاعدة واقعة، الـ promise بتترفض والسطر اللي بعده ميتنفذش.

### [[res.json({ ok: true })]]

لو وصلنا هنا يبقى القاعدة شغالة.

جرّبنا سيرفرين: واحد على القاعدة الحقيقية، وواحد [[DATABASE_URL]] بتاعه على بورت مفيهوش حاجة:

~~~bash
curl -si localhost:6018/health
curl -si localhost:6019/health
~~~

~~~text الناتج
HTTP/1.1 200 OK
{"ok":true}

HTTP/1.1 500 Internal Server Error
~~~

والتاني كتب في الترمنال بتاعه:

~~~text ترمنال السيرفر
PrismaClientKnownRequestError:
Invalid $__btprisma.$queryRaw()$__bt invocation:
~~~

وده المطلوب: لو القاعدة واقعة الصفحة لازم تعرض «down»، مش [[ok]] ثابتة. (السيرفر ده مفيهوش الـ errorHandler، عشان كده الـ 500 جت من Express نفسه. في مشروعك هيبقى [[INTERNAL]] JSON.)

---

## ٣. الصفحة: [[apps/web/app/page.tsx]] (من توثيق Next.js)

### [[export const dynamic = "force-dynamic";]]

Next.js بيحاول يبني الصفحات وقت الـ build لو يقدر (static). السطر ده بيقوله «ارسم الصفحة دي مع كل طلب»، عشان الـ health يتسأل كل مرة مش مرة وقت الـ build.

### [[export default async function Home()]]

في مجلد [[app/]]، ملف [[page.tsx]] هو الصفحة، والـ [[default export]] هو الـ component. و [[async]] مسموحة في server components: الدالة بتشتغل على السيرفر، فتقدر [[await]] جواها.

### [[await fetch(process.env.API_URL + "/health", { cache: "no-store" })]]

- [[process.env.API_URL]] متغير بيئة على سيرفر الواجهة، من غير [[NEXT_PUBLIC_]] لأنه مش محتاج يوصل للمتصفح.
- [[cache: "no-store"]] متخزنش الرد، اسأل كل مرة.

### [[res.ok ? await res.json() : { ok: false }]]

[[res.ok]] بـ [[true]] لو الـ status من 200 لـ 299. لو الـ API رجّع 500، بنعتبره [[{ ok: false }]] بدل ما نقرا JSON مش متوقع.

### [[<main>API: {data.ok ? "ok" : "down"}</main>]]

JSX: الـ [[{ }]] جوه الـ HTML بيحط قيمة JavaScript. فالصفحة بتعرض [[API: ok]] أو [[API: down]].

---

## ٤. إمتى الـ skeleton يبقى خلص

| الفحص | بيتأكد من |
|---|---|
| الرابط الحقيقي (مش localhost) بيفتح | DNS و HTTPS والـ deploy |
| بيعرض [[API: ok]] | الواجهة بتوصل للـ API ([[API_URL]] صح، CORS لو الطلب من المتصفح) |
| وقّف القاعدة، يعرض [[down]] | الـ API بيسأل القاعدة فعلًا، والـ migrations اتعملت |

---

## الخلاصة

- أول أسبوع: طلب واحد بيعدّي على كل الطبقات لحد سيرفر حقيقي.
- بعدها ميزة ميزة بالعرض، وكل ميزة تخلص بكل طبقاتها.
- [[SELECT 1]] في الـ health بيتأكد إن القاعدة بترد، و [[force-dynamic]] و [[no-store]] بيمنعوا نتيجة قديمة متخزنة.
- ابدأ في حساب التاجر والدومين من أول يوم، لأنهم بياخدوا وقت برّه الكود.`,
          lines: [
            "الهيكل الماشي: طلب واحد بيعدّي على كل الطبقات لحد الإنتاج.",
            "القاعدة وداتا تجربة، عشان الشاشات تتبني على حاجة حقيقية.",
            "أول ميزة كاملة. قراية عامة من غير auth.",
            "المستخدمين، لأن كل اللي بعد كده محتاج صاحب.",
            "أخطر ميزة. خلي قبلها وبعدها وقت.",
            "المحتوى المحمي: معتمد على الاشتراك اللي بيجي من الدفع.",
            "التشغيل: مراقبة وباك أب قبل ما الناس الحقيقية تدخل."
          ],
          sol: R`الـ skeleton خلص لما تفتح الرابط الحقيقي (مش localhost) وتلاقي الصفحة بتعرض [[ok: true]] جاية من API على سيرفر، والـ API سأل القاعدة فعلًا. ولو وقّفت القاعدة، الصفحة المفروض تعرض خطأ مش [[ok: true]] ثابتة. كده انت اتأكدت من الـ DNS والـ HTTPS والـ CORS ومتغيرات البيئة والـ migrations على السيرفر، وكل دول حاجات بتاخد يوم لوحدها لو سيبتها للآخر.

أشهر حاجة هتقابلك: الصفحة بتشتغل على جهازك ومش على السيرفر عشان [[NEXT_PUBLIC_API_URL]] لسه بـ localhost، أو الـ API بيرفض الطلب بـ CORS لأن [[WEB_ORIGIN]] مش متظبط على الدومين الحقيقي. ده بالظبط سبب إنك تعمله أول يوم.`,
          solCode: R`// apps/api/src/app.ts
app.get("/health", async (req, res) => {
  await db.$queryRaw$__btSELECT 1$__bt;
  res.json({ ok: true });
});

// apps/web/app/page.tsx (server component)
export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(process.env.API_URL + "/health", { cache: "no-store" });
  const data = res.ok ? await res.json() : { ok: false };
  return <main>API: {data.ok ? "ok" : "down"}</main>;
}`
        },
        {
          cmd: "definition of done",
          title: "إمتى الميزة تبقى خلصت فعلًا",
          desc: R`«خلصت» مش معناها «شغالة على جهازي». اتفق على قايمة ثابتة، وأي ميزة لازم تعدّيها قبل ما تتقفل. وحطها في PR template عشان تظهر لوحدها مع كل PR. القايمة دي هي الفرق بين مشروع بيكبر بهدوء، ومشروع كل ميزة فيه بتكسر اللي قبلها.`,
          example: R`- [ ] كل الـ acceptance criteria بتاعة الـ story متحققة
- [ ] validation بـ Zod على كل input في السيرفر
- [ ] الصلاحيات: جرّبت بيوزر مش صاحب الداتا، ورجع 403 أو 404
- [ ] الحالات الوحشة: فاضي، وخطأ، وبطيء (loading)، ونت قاطع
- [ ] فيه اختبار للـ service على الأقل، و npm run check عدّى
- [ ] الـ migration اتجرّبت على staging، ومفيش عمود فيه داتا اتمسح
- [ ] عربي وإنجليزي و RTL، وعلى موبايل
- [ ] الأخطاء بتوصل Sentry، ومفيش أسرار في اللوج
- [ ] .env.example والـ docs اتحدّثوا لو فيه متغير أو قرار جديد`,
          try: R`حط القايمة في [[.github/pull_request_template.md]]، وافتح PR لآخر ميزة عملتها وعلّم على اللي اتعمل بجد. اللي معرفتش تعلّم عليه هو شغلك الجاي.`,
          flag: "script",
          deep: {
            why: "من غير تعريف ثابت، كل ميزة بتخلص بمستوى مختلف. واحدة فيها validation والتانية لأ، وواحدة شغالة بالعربي والتانية بتتقلب في RTL. والحاجات دي بتتراكم لحد ما يبقى عندك «تنضيف» بياخد شهر.",
            how: R`القايمة دي معمولة من الغلطات اللي بتتكرر، مش من كتاب. كل بند فيها ورا مشكلة حصلت قبل كده.

بند الصلاحيات هو أهم واحد: افتح الطلب بيوزر تاني فعلًا، متفترضش. أشهر ثغرة في أي API هي إن endpoint بيتأكد إنك داخل ومبيتأكدش إن الحاجة بتاعتك.

بند الـ migration مهم لأن مسح عمود أو تغيير نوعه على قاعدة فيها داتا مبيرجعش. والطريقة الآمنة (expand ثم contract) في أسئلة الانترفيو في آخر التاب.

والـ PR template بيظهر لوحده في GitHub كل ما تفتح PR، فالقايمة متتنسيش. والبنود اللي تقدر تتأتمت (lint و typecheck و test) بتروح في CI، فالقايمة اليدوية تفضل صغيرة. التفاصيل في تاب «فحص الكود» وتاب «GitHub Actions».`,
            when: "مع كل PR، حتى لو بتشتغل لوحدك. انت بعد شهر هتبقى شخص تاني مش فاكر حاجة.",
            mistakes: "قايمة طويلة لدرجة إن محدش بيقراها، فالكل يعلّم عليها وخلاص. أو بنود مش بتتقاس زي «الكود نضيف». أو إنك تعتبر الميزة خلصت قبل ما تتجرّب على staging."
          },
          teach: R`## المثال: checklist بتظهر مع كل PR

المثال ٩ بنود Markdown. كل بند بيبدأ بـ [[- [ ] ]]: الـ [[- ]] بند في قايمة، و [[[ ] ]] مربع فاضي. GitHub بيعرضه checkbox تقدر تضغط عليه، ولما تعلّم بيتحوّل لـ [[- [x] ]] جوه نص الـ PR. والملف مكانه [[.github/pull_request_template.md]]، و GitHub بيحطه لوحده في وصف أي PR جديد (ده من توثيق GitHub، والـ sol فيه التفاصيل).

---

## ١. البنود: كل واحد بيمنع مشكلة

| البند | المشكلة اللي بيمنعها | إزاي تتأكد |
|---|---|---|
| الـ acceptance criteria متحققة | الميزة «خلصت» وهي نص شغل | امشي على شروط الـ story واحد واحد |
| validation بـ Zod على كل input | داتا بايظة في القاعدة | كل route بيعمل [[parse]] قبل أي حاجة |
| الصلاحيات: يوزر مش صاحب الداتا ياخد 403 أو 404 | IDOR | افتح الطلب بحساب تاني فعلًا |
| الحالات الوحشة: فاضي، وخطأ، و loading، ونت قاطع | شاشة بيضا أو spinner للأبد | جرّب الـ Offline في DevTools |
| اختبار للـ service و [[npm run check]] عدّى | bug يرجع تاني | الـ CI أخضر |
| الـ migration اتجرّبت على staging | عمود فيه داتا يتمسح | شغّلها على نسخة شبه الإنتاج |
| عربي وإنجليزي و RTL وموبايل | الواجهة تتقلب | افتح الصفحة بالـ ar على شاشة صغيرة |
| الأخطاء بتوصل Sentry ومفيش أسرار في اللوج | وقعة محدش عارف بيها، أو باسورد في اللوج | ارمي error متعمد وشوفه وصل |
| [[.env.example]] والـ docs اتحدّثوا | اللي بعدك ميعرفش يشغّل المشروع | أي متغير جديد ليه سطر |

---

## ٢. أهم بند: الصلاحيات

ليه 403 **أو** 404؟ 403 بتقول «الحاجة موجودة بس مش بتاعتك». 404 بتقول «مفيش حاجة هنا». لما الـ query نفسها فيها [[userId: req.user.id]] (درس ownership)، الطلب بتاع حد تاني مبيتلقاش أصلًا، فبيطلع 404، وده كمان مبيكشفش إن الـ id ده موجود.

والمهم في الجملة «جرّبت بيوزر مش صاحب الداتا»: متفترضش إن الكود صح، افتحه بحساب تاني.

---

## ٣. البنود اللي تروح CI

| البند | يتأتمت؟ |
|---|---|
| lint و typecheck و test | أيوه، في GitHub Actions |
| [[npm run check]] | أيوه |
| الصلاحيات | جزء منه: اختبار بيوزر تاني |
| RTL والموبايل والحالات الوحشة | لأ، بعينك |

كل اللي يتأتمت بيطلع من القايمة اليدوية للـ CI، فالقايمة تفضل قصيرة ويتقري كل بند فيها.

---

## الخلاصة

- «خلصت» = عدّت القايمة، مش «شغالة على جهازي».
- القايمة في [[.github/pull_request_template.md]] عشان تظهر لوحدها.
- كل بند لازم يتقاس. «الكود نضيف» مش بند.
- علّم بس على اللي عملته فعلًا، واللي فاضل اعمله issue.`,
          lines: [
            "الميزة بتعمل اللي الـ story طالباه، بكل شروطها.",
            "السيرفر مبيثقش في أي حاجة جاية من برّه.",
            "أهم بند. افتح الطلب بيوزر تاني فعلًا، متفترضش.",
            "الشاشة ليها ٤ حالات مش حالة واحدة.",
            "المنطق متغطي باختبار، وكل الفحوصات عدّت.",
            "القاعدة اتغيرت بأمان، واتجرّبت على داتا شبه الحقيقية.",
            "اتجرّبت باللغتين وعلى شاشة صغيرة.",
            "لو وقعت في الإنتاج هتعرف، ومفيش باسورد أو توكن في اللوج.",
            "اللي جاي بعدك يلاقي الإعدادات والقرارات مكتوبة."
          ],
          sol: R`GitHub بيقرا الملف ده من [[.github/pull_request_template.md]] على الـ default branch، فأول PR بعد ما يتعمل merge هيفتح والقايمة جواه لوحدها، والـ checkboxes بتتعلّم بالضغط عليها. ولو القايمة مظهرتش، غالبًا الملف لسه في branch تانية، أو اسمه أو مكانه غلط.

النتيجة الطبيعية لأول مرة إنك متعلّمش على كله. أشهر ٣ بيفضلوا فاضيين: الحالات الوحشة (مفيش loading ولا رسالة لما النت يقطع)، واختبار الصلاحيات بيوزر تاني، والموبايل و RTL. ومتعلّمش على حاجة معملتهاش «عشان هي بسيطة»، القايمة دي قيمتها في إنها صادقة. واللي فاضل اعمله issues ليها أصحاب.`
        }
      ]
    }
]);
