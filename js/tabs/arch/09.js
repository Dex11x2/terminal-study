// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "multi-tenant SaaS",
      l: 2,
      n: "منتج واحد لشركات كتير: فين الـ tenant في الداتا، وإزاي كل query يتقفل عليه، والأعضاء والدعوات، والدومينات، واختبار التسريب",
      items: [
        {
          cmd: "tenant_id ولا schema",
          title: "tenant_id في كل جدول، ولا schema لكل عميل، ولا قاعدة لكل عميل؟",
          desc: R`الـ multi-tenant SaaS منتج واحد بيخدم شركات كتير (عيادات، أو مدارس، أو فرق شغل)، وكل شركة اسمها tenant أو workspace. وداتا كل واحدة لازم متظهرش للتانية أبدًا.

فيه ٣ طرق تفصل بيها الداتا. الأولى: جداول مشتركة وعمود [[tenantId]] في كل جدول. التانية: schema لكل tenant في نفس القاعدة. والتالتة: قاعدة لكل tenant. لأغلب المنتجات الجديدة ابدأ بالأولى، وهي اللي هنكمل بيها.`,
          example: R`model Workspace {
  id        String    @id @default(uuid())
  name      String
  slug      String    @unique
  domain    String?   @unique
  members   Member[]
  projects  Project[]
}
model Member {
  tenantId String
  userId   String
  role     Role      @default(MEMBER)
  tenant   Workspace @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@id([tenantId, userId])
  @@index([userId])
}
model Project {
  id       String    @id @default(uuid())
  tenantId String
  name     String
  tenant   Workspace @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  @@index([tenantId, id])
}
enum Role {
  OWNER
  ADMIN
  MEMBER
}`,
          try: "خد منصة الكورسات وحوّلها لـ SaaS: كل أكاديمية ليها workspace، ومدرّبينها، وطلابها، وكورساتها. اكتب قايمة بكل جدول وقرر: فيه tenantId ولا لأ؟ (users؟ الكورسات؟ الطلبات؟ جدول الخطط والأسعار؟). وبعدين قرر: طالب واحد ينفع يبقى في أكاديميتين؟",
          flag: "script",
          deep: {
            why: "القرار ده بيتاخد مرة واحدة وبيبقى صعب جدًا يتغير بعدين، لأنه بيلمس كل جدول وكل query. وغلطة واحدة فيه (query ناقصه الفلتر) معناها إن عميل بيشوف داتا عميل تاني، ودي أسوأ حاجة تحصل لـ B2B SaaS: بتخسر ثقة كل العملاء، مش العميل ده بس.",
            how: R`الطريقة الأولى (tenantId في كل جدول، shared schema): أرخص وأبسط. migration واحدة لكل العملاء، و connection pool واحد، وتقارير على كل العملاء بـ query واحدة. العيب إن العزل كله معتمد على إن كل query فيه [[WHERE tenantId = ...]]. والحل في الدرسين الجايين: Prisma extension بيحطه أوتوماتيك، و RLS في القاعدة كشبكة أمان.

الطريقة التانية (schema لكل tenant): جداول منفصلة فعلًا، والـ query بيختار الـ schema بـ [[search_path]]. العزل أقوى، بس كل migration لازم تتعمل على مئات أو آلاف الـ schemas، والـ connection pooling بيتعقد، و Prisma مش مصمم لده (محتاج client لكل schema أو [[SET search_path]] جوه transaction).

الطريقة التالتة (قاعدة لكل tenant): أقوى عزل، وكل عميل ممكن يبقى في region مختلف، وتقدر تعمل restore لعميل واحد. بس تكلفة وتشغيل كل قاعدة لوحدها. بتتعمل للعملاء الكبار (enterprise) اللي بيطلبوها في العقد، أو ليها أدوات زي Turso اللي مبنية على قاعدة لكل عميل.

والمنتجات الكبيرة بتخلط: كل الناس في shared، والعميل الكبير في قاعدة لوحده (نفس الكود، connection string مختلف).

تفاصيل في الـ schema: users مش فيها tenantId، لأن نفس الشخص ممكن يبقى في أكتر من workspace (زي Slack). والعلاقة في جدول Member بالدور. والـ index على [[(tenantId, id)]] أو [[(tenantId, createdAt)]] لأن كل query هيبدأ بـ tenantId. وجداول النظام زي الخطط والعملات مشتركة ومن غير tenantId.

والـ tenantId يتنسخ لكل جدول، حتى لو ممكن يتعرف من الأب (task جوه project جوه workspace). ليه؟ عشان الفلتر والـ RLS يبقوا بسطاء، من غير joins.`,
            when: "من أول يوم في أي منتج بيتباع لشركات. حتى لو أول عميل واحد، ضيف tenantId من البداية. إضافته بعدين لجداول فيها داتا أصعب بكتير.",
            mistakes: R`tenantId في الجداول الرئيسية بس، وجداول الأولاد (comments، و attachments) من غيره. أو user فيه tenantId واحد، وبعدين العملاء يطلبوا حد في أكتر من workspace. أو schema لكل عميل من أول يوم عشان «أأمن»، والـ migrations تبقى كابوس بعد ٢٠٠ عميل. وفي الانترفيو: «صمم SaaS متعدد العملاء» — قول الـ ٣ طرق، واختار واحدة بسبب، واذكر إزاي تضمن العزل.`
          },
          teach: R`## الـ schema بتاعة الطريقة الأولى: tenantId في كل جدول

المثال ٣ models و enum: [[Workspace]] (الـ tenant)، و [[Member]] (مين في أنهي workspace وبأنهي دور)، و [[Project]] (مثال لأي جدول داتا). جربناه بـ Prisma 7.10: [[prisma validate]] عليه مع model [[User]] صغير، وبعدين [[prisma migrate diff --from-empty --to-schema ... --script]] عشان نشوف الـ SQL اللي هيتعمل.

> النسخة القديمة من المثال كانت كاتبة [[enum Role { OWNER ADMIN MEMBER }]] في سطر واحد، و [[prisma validate]] رفضها: [[This line is invalid. It does not start with any known Prisma schema keyword.]]. Prisma بيطلب كل قيمة في سطر لوحدها، فصلّحناها.

---

## ١. [[model Workspace { ... }]]

| الحقل | معناه |
|---|---|
| [[id String @id @default(uuid())]] | المفتاح، UUID بيتعمل لوحده |
| [[name String]] | اسم الشركة أو الأكاديمية |
| [[slug String @unique]] | الاسم القصير في [[acme.myapp.com]]، ومينفعش يتكرر |
| [[domain String? @unique]] | [[?]] يعني اختياري (NULL). الدومين الخاص |
| [[members Member[]]] و [[projects Project[]]] | علاقات عكسية: مش أعمدة، Prisma بيستخدمها في [[include]] |

---

## ٢. [[model Member { ... }]]

### [[role Role @default(MEMBER)]]

الدور **جوه** العضوية، مش على الـ User: نفس الشخص OWNER هنا و MEMBER هناك.

### [[tenant Workspace @relation(fields: [tenantId], references: [id], onDelete: Cascade)]]

[[fields: [tenantId]]] العمود اللي هنا، و [[references: [id]]] العمود اللي في Workspace. و [[onDelete: Cascade]]: لو الـ workspace اتمسح، صفوف Member بتاعته تتمسح لوحدها.

### [[@@id([tenantId, userId])]]

[[@@]] يعني على مستوى الـ model كله. مفتاح من عمودين: الشخص مرة واحدة في كل workspace.

### [[@@index([userId])]]

الـ primary key بيبدأ بـ [[tenantId]]، فبيخدم «أعضاء الـ workspace ده». بس «الـ workspaces بتاعتي» بتدوّر بـ [[userId]] لوحده، فمحتاجة index تاني.

---

## ٣. [[model Project { ... }]]

[[tenantId String]] في الصف نفسه، و [[@@index([tenantId, id])]] لأن كل query هيبدأ بـ [[WHERE "tenantId" = ...]].

---

## ٤. [[enum Role]]

قايمة قيم ثابتة. في PostgreSQL بتبقى type لوحدها.

---

## ٥. الـ SQL الناتج

~~~text الناتج (مختصر)
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');
CREATE TABLE "Member" (
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    CONSTRAINT "Member_pkey" PRIMARY KEY ("tenantId","userId")
);
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");
CREATE UNIQUE INDEX "Workspace_domain_key" ON "Workspace"("domain");
CREATE INDEX "Member_userId_idx" ON "Member"("userId");
CREATE INDEX "Project_tenantId_id_idx" ON "Project"("tenantId", "id");
ALTER TABLE "Project" ADD CONSTRAINT "Project_tenantId_fkey" FOREIGN KEY ("tenantId")
  REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
~~~

- [[String]] بقى [[TEXT]]، و [[uuid()]] مبيظهرش في الـ SQL لأن Prisma بيولّده في الكود.
- [[domain]] من غير [[NOT NULL]] (اختياري)، والـ unique بيسمح بأكتر من NULL.
- كل علاقة بقت [[FOREIGN KEY]] بـ [[ON DELETE CASCADE]].

---

## ٦. الطرق التلاتة (من الـ deep)

| | tenantId في كل جدول | schema لكل tenant | قاعدة لكل tenant |
|---|---|---|---|
| العزل | بالكود ([[WHERE]]) + RLS | جداول منفصلة | قواعد منفصلة |
| الـ migration | مرة واحدة | مرة لكل schema | مرة لكل قاعدة |
| التكلفة | الأقل | متوسطة | الأعلى |
| Prisma | طبيعي | صعب | connection string لكل عميل |
| إمتى | أغلب المنتجات | نادر | enterprise بالعقد |

---

## الخلاصة

- [[tenantId]] في كل جدول داتا، حتى الأولاد، وكل index بيبدأ بيه.
- [[User]] من غيره، والعلاقة والدور في [[Member]] بمفتاح [[(tenantId, userId)]].
- جداول النظام (الخطط والعملات) مشتركة.
- الـ enum في Prisma: قيمة في كل سطر.`,
          lines: [
            "الـ tenant نفسه: شركة أو أكاديمية.",
            "رقمه.",
            "اسمه.",
            "اسم قصير للـ subdomain ([[acme.myapp.com]]).",
            "دومين خاص اختياري ([[learn.acme.com]]).",
            "أعضاؤه.",
            "مشاريعه.",
            "قفلة.",
            "العضوية: مين في أنهي workspace وبأنهي دور.",
            "الـ workspace.",
            "المستخدم.",
            "دوره جوه الـ workspace ده بالذات.",
            "العلاقة، ولو الـ workspace اتمسح الأعضاء يتمسحوا.",
            "العلاقة بالمستخدم.",
            "الشخص مرة واحدة في كل workspace.",
            "index عشان «الـ workspaces بتاعتي».",
            "قفلة.",
            "مثال لجدول بيانات عادي.",
            "رقمه.",
            "tenantId في كل صف، حتى لو ممكن يتعرف من علاقة.",
            "الاسم.",
            "العلاقة.",
            "كل query بيبدأ بالـ tenant، فالـ index بيبدأ بيه.",
            "قفلة.",
            "الأدوار جوه الـ workspace. Prisma بيطلب كل قيمة في سطر لوحدها.",
            "صاحب الـ workspace.",
            "بيدير الأعضاء.",
            "عضو عادي.",
            "قفلة."
          ],
          sol: R`الإجابة المتوقعة: users من غير tenantId (الشخص بيتنقل بين أكاديميات)، والعضوية في Member بدور (OWNER أو ADMIN للأكاديمية، و INSTRUCTOR، و STUDENT). الكورسات، والدروس، والطلبات، والـ enrollments، والكوبونات: كلهم فيهم tenantId، حتى الدروس رغم إنها تحت الكورس. جدول الخطط (plans) بتاع اشتراك الأكاديمية فيك مشترك ومن غير tenantId، أما اشتراك الأكاديمية نفسه (subscription) فيه tenantId.

طالب في أكاديميتين: أيوه، صفين في Member بنفس userId. وفي الواجهة بيختار الأكاديمية (أو يدخل من الـ subdomain بتاعها).

الغلطة الشائعة: تحط tenantId في users، فالطالب يعمل حسابين بنفس الإيميل، والقيد unique على الإيميل يمنعه.`
        },
        {
          cmd: "Prisma tenant extension",
          title: "Prisma extension: الـ tenant بيتحط في كل query لوحده",
          desc: R`بدل ما تكتب [[where: { tenantId }]] في كل query وتتمنى محدش ينساها، بتعمل client خاص بالـ tenant بـ Prisma client extension. أي query عليه بيتحط فيه الـ tenantId أوتوماتيك: في الـ where للقراية والتعديل والمسح، وفي الـ data للإنشاء.

الـ middleware بيطلّع الـ tenant من الطلب (من الـ subdomain أو header)، ويتأكد إن المستخدم عضو فيه، ويحط [[req.db = forTenant(tenantId)]]. والـ routes بتستخدم [[req.db]] بس.`,
          example: R`const SCOPED = new Set(["Project", "Member", "Invite"]);
const noRaw = () => { throw new Error("raw SQL مش مسموح على client الـ tenant"); };

export function forTenant(tenantId) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (model === "Workspace") { args.where = { ...args.where, AND: [{ id: tenantId }] }; return query(args); }
          if (!SCOPED.has(model)) return query(args);
          if (operation === "create") args.data = { ...args.data, tenantId };
          else if (operation.startsWith("createMany")) args.data = [args.data].flat().map((d) => ({ ...d, tenantId }));
          else if (operation === "upsert") { args.where = { ...args.where, tenantId }; args.create = { ...args.create, tenantId }; }
          else args.where = { ...args.where, tenantId };
          return query(args);
        },
      },
      $queryRaw: noRaw, $executeRaw: noRaw, $queryRawUnsafe: noRaw, $executeRawUnsafe: noRaw,
    },
  });
}

export async function tenantScope(req, res, next) {
  const member = await prisma.member.findUnique({ where: { tenantId_userId: { tenantId: req.tenant.id, userId: req.user.id } } });
  if (!member) throw new AppError(404, "NOT_FOUND", "مش موجود");
  req.member = member;
  req.db = forTenant(req.tenant.id);
  next();
}`,
          try: R`اعمل workspaces اتنين A و B، وأنشئ مشروع في A بـ [[forTenant(a.id)]]. بعدين من [[forTenant(b.id)]] جرّب: [[findMany]]، و [[findUnique]] بـ id مشروع A، و [[update]] عليه، و [[deleteMany({})]]. وآخر حاجة: [[create]] من B وفي الـ data [[tenantId: a.id]] صريحة. المشروع اتعمل في أنهي workspace؟`,
          flag: "script",
          deep: {
            why: "مع ١٠٠ endpoint، الفلتر اليدوي هيتنسي في واحد. مش احتمال، مؤكد. والـ extension بيحوّل العزل من «كل مطوّر لازم يفتكر» لـ «الافتراضي آمن، واللي عايز يعدّي لازم يكتب ده صراحة».",
            how: R`[[$extends]] بـ [[query.$allModels.$allOperations]] بيلف كل عملية على كل model. بياخد اسم الـ model والعملية والـ args، وبينادي [[query(args)]] بعد التعديل. والـ extension ده بديل الـ middleware القديم ([[$use]]) اللي اتشال من Prisma.

ترتيب الـ spread مهم: [[{ ...args.data, tenantId }]] يعني الـ tenantId بتاعنا بيكسب على أي حاجة جاية من الكود. فلو حد بعت [[tenantId]] في الـ body وعدّاه الـ validation، مش هيقدر يكتب في tenant تاني.

[[findUnique]] و [[update]] و [[delete]] بيقبلوا فلاتر زيادة جنب الـ unique field (من Prisma 5)، فـ [[where: { id, tenantId }]] شغالة. ولو المشروع في tenant تاني: findUnique بترجّع null، و update و delete بيرموا [[P2025]] (مش موجود)، والـ handler يحوّلها 404. والـ 404 أحسن من 403، لأن 403 بتأكد إن الـ id موجود عند حد.

[[SCOPED]] قايمة صريحة بالـ models اللي فيها tenantId. أي model جديد فيه tenantId لازم يتضاف هنا، والاختبار في درس «اختبار تسريب tenants» بيمسك لو اتنسى.

حدود الـ extension اللي لازم تعرفها: الـ nested writes ([[create]] جوه [[project.create({ data: { tasks: { create: [...] } } })]]) مش بتعدّي على الـ extension للـ model الابن، فلازم تحط tenantId بإيدك أو تتجنبها. و [[include]] للعلاقات مش بيتفلتر (بس لو الأب متفلتر والأولاد تبعه، مفيش مشكلة عادة). و [[$queryRaw]] مش model، فـ [[$allModels]] مبيشوفوش، عشان كده المثال بيقفله على client الـ tenant خالص ([[noRaw]]). و [[Workspace]] نفسه مالوش tenantId، فمن غير السطر بتاعه، [[req.db.workspace.update]] بـ id workspace تاني كان بيعمل nested create جوه الـ workspace ده. عشان كل ده RLS في الدرس الجاي كشبكة أمان.

و [[forTenant]] بترجّع client جديد خفيف (مش connection جديد)، فعادي تعمله مع كل طلب.`,
            when: "من أول endpoint في منتج multi-tenant. وخلي الـ lint أو الـ code review يمنع استخدام [[prisma]] العادي في routes الـ tenant، واسمح بيه بس في مكان واضح (زي الأدمن العام والـ jobs).",
            mistakes: R`نسيان model جديد في SCOPED. أو [[{ tenantId, ...args.data }]] بالعكس، فالـ body يكسب. أو استخدام [[prisma]] العادي «مرة واحدة بس» في route. أو الاعتماد على الـ extension مع nested writes. أو إنك تاخد الـ tenantId من الـ body أو الـ query بدل من العضوية المتحقق منها. أو 403 بدل 404 للي مش عضو.`
          },
          teach: R`## client بيحط الـ tenant في كل query لوحده

[[forTenant(id)]] بترجع نسخة من Prisma client كل query عليها بيتعدل قبل ما يتنفذ: الـ tenantId بيتحط في الـ where أو الـ data حسب نوع العملية. و [[tenantScope]] middleware بيتأكد من العضوية ويحط النسخة دي في [[req.db]]. جربناه بـ Prisma 7.10 على PostgreSQL 18 (Docker، ويندوز 11، Node 24): workspaceين A و B، ومشروع «سر A»، ومشروعين في B، وبعدين حاولنا من B بكل طريقة.

---

## ١. [[const SCOPED = new Set(["Project", "Member", "Invite"]);]]

[[Set]] مجموعة أسامي بـ [[has()]] سريعة. دي الـ models اللي فيها عمود [[tenantId]]. أي model برّاها بيعدّي زي ما هو.

### [[const noRaw = () => { throw new Error("raw SQL مش مسموح على client الـ tenant"); };]]

دالة مبتعملش حاجة غير إنها ترمي error. هنحطها في الآخر مكان دوال الـ SQL الخام (القسم ٤).

---

## ٢. [[prisma.$extends({ query: { $allModels: { async $allOperations({ model, operation, args, query }) { ... } } } })]]

من برّه لجوه:

- [[$extends]]: بيرجّع client جديد مبني على القديم (نفس الاتصال، مش connection جديد).
- [[query]]: الامتداد ده بيلف الـ queries.
- [[$allModels]]: على كل الـ models.
- [[$allOperations]]: على كل العمليات. والدالة بتاخد:

| الاسم | مثال |
|---|---|
| [[model]] | [["Project"]] |
| [[operation]] | [["findMany"]] أو [["update"]] أو [["createMany"]] |
| [[args]] | الـ object اللي اتبعت: [[{ where, data, ... }]] |
| [[query]] | دالة: نفّذ الـ query الأصلي بالـ args دي |

---

## ٣. جوه الدالة: سطر لكل نوع عملية

### [[if (model === "Workspace") { args.where = { ...args.where, AND: [{ id: tenantId }] }; return query(args); }]]

[[Workspace]] هو الـ tenant نفسه، فمفيهوش [[tenantId]]، والـ id بتاعه هو الـ tenantId. بنزوّد على أي where شرط [[AND: [{ id: tenantId }]]]: «ومعاه كمان الـ id يبقى بتاعنا». [[AND]] بيتقبل جنب الحقل الـ unique في [[findUnique]] و [[update]]، فـ [[where: { id: a.id, AND: [{ id: b.id }] }]] معناها صف واحد لازم يحقق الاتنين، ومفيش. (لو كتبنا [[id: tenantId]] على طول، كان هيكتب فوق [[id: a.id]]، و [[findUnique]] بـ id بتاع A يرجّع workspace B من غير ما حد ياخد باله.)

~~~text الناتج (من client B)
workspace.findUnique(A id)   null
workspace.findMany           ["B"]
workspace.update(own)        "B!"
workspace.create             throws Unknown argument $__btwhere$__bt.
~~~

و [[create]] مفيهوش where أصلًا، فـ Prisma رفضه: client الـ tenant مبيعملش workspaces.

### [[if (!SCOPED.has(model)) return query(args);]]

مش tenant؟ نفّذ زي ما هو.

### [[if (operation === "create") args.data = { ...args.data, tenantId };]]

الـ spread الأول وبعده [[tenantId]]: لو [[args.data]] فيها [[tenantId]] أصلًا، اللي بعده بيكتب فوقه.

~~~text الناتج
create tenantId:a            "in B"
~~~

بعتنا [[{ name: "y", tenantId: a.id }]] من B، واتعمل في B.

### [[else if (operation.startsWith("createMany")) args.data = [args.data].flat().map((d) => ({ ...d, tenantId }));]]

[[startsWith]] بيلقط [[createMany]] و [[createManyAndReturn]]. و [[[args.data].flat()]] حيلة: لو [[data]] object واحد بقى array فيه عنصر، ولو array فضل array. وبعدين [[map]] بيحط الـ tenantId في كل صف.

### [[else if (operation === "upsert") { args.where = {...}; args.create = {...}; }]]

الـ upsert ليه where (يدوّر) و create (لو ملقاش). الاتنين محتاجين الـ tenant:

~~~text الناتج
upsert(A id)                 "created in B"
~~~

دوّر على مشروع A بالـ id من B، ملقاهوش (لأنه مش في B)، فعمل واحد جديد في B. مشروع A متلمسش.

### [[else args.where = { ...args.where, tenantId };]]

أي حاجة تانية: [[findMany]] و [[findUnique]] و [[count]] و [[update]] و [[delete]] و [[deleteMany]]...

~~~text الناتج
findMany                     ["B1","B2"]
findUnique(A id)             null
count                        2
update(A id)                 throws P2025 - ... No record was found for an update.
delete(A id)                 throws P2025 - ... No record was found for a delete.
deleteMany({})               {"count":4}
A still there                "سر A"
~~~

- [[findUnique({ where: { id, tenantId } })]] شغالة لأن Prisma (من نسخة 5) بيقبل فلاتر زيادة جنب الحقل الـ unique.
- [[P2025]] = «الصف مش موجود»، والـ error handler بيحوّلها 404.
- [[deleteMany({})]] من غير شرط مسح ٤ صفوف: كلهم في B (B1 و B2 واللي اتعملوا بالـ upsert والـ create). و «سر A» لسه موجود.

### [[return query(args);]]

نفّذ بعد التعديل.

---

## ٤. [[$queryRaw: noRaw, $executeRaw: noRaw, $queryRawUnsafe: noRaw, $executeRawUnsafe: noRaw]]

دول جنب [[$allModels]] جوه [[query]]، مش جواه: الـ SQL الخام مش تبع أي model، فـ [[$allOperations]] بتاع الـ models مبيشوفوش. الـ ٤ دول بيبدّلوا دوال الـ SQL الخام على client الـ tenant بـ [[noRaw]]، فأي نداء بيرمي.

ليه؟ النسخة الأولى من الدرس مكانش فيها السطر ده ولا سطر الـ [[Workspace]]، وجربناها:

~~~text الناتج (النسخة القديمة، من client B)
$queryRaw from B             [{"name":"سر A"}]
nested via workspace         ["سر A","nested"]
~~~

- [[B.$queryRaw$__btSELECT name FROM "Project" WHERE "tenantId" = $__{a.id}$__bt]] قرا مشروع A: الامتداد مكانش بيلمسه.
- [[B.workspace.update({ where: { id: a.id }, data: { projects: { create: { name: "nested" } } } })]] عمل مشروع **جوه A**: [[Workspace]] مش في [[SCOPED]]، والـ nested create مبيعدّيش على الامتداد بتاع [[Project]].

وبعد السطرين:

~~~text الناتج (النسخة دي)
$queryRaw from B             throws raw SQL مش مسموح على client الـ tenant
$executeRawUnsafe from B     throws raw SQL مش مسموح على client الـ tenant
nested via workspace         throws P2025 - No 'Workspace' record ... was found for a nested create
A projects                   ["سر A"]
~~~

[[P2025]] لأن [[where: { id: a.id, AND: [{ id: b.id }] }]] ملقاش صف، فمفيش workspace يتعمل جواه مشروع. ولو محتاج SQL خام فعلًا (تقرير مثلًا)، اكتبه بالـ [[prisma]] العادي في مكان واضح، والـ tenantId في الـ WHERE بإيدك، والـ RLS في الدرس الجاي يحميه.

اللي لسه مش متغطي: nested write من model مقفول لـ model ابن ([[project.create({ data: { tasks: { create: [...] } } })]]): الـ extension بيلف عملية [[Project]] بس، فالـ tasks محتاجة tenantId بإيدك. وده سبب طبقة الـ RLS برضه.

---

## ٥. [[tenantScope]]

1. [[prisma.member.findUnique({ where: { tenantId_userId: { tenantId: req.tenant.id, userId: req.user.id } } })]]: [[tenantId_userId]] الاسم اللي Prisma بيعمله للمفتاح المركّب [[@@id([tenantId, userId])]]. والـ client العادي هنا لأن لسه معندناش [[req.db]].
2. مش عضو؟ 404، كأن الـ workspace مش موجود.
3. [[req.member = member]]: فيه الدور، و [[requireTenantRole]] بيقراه.
4. [[req.db = forTenant(req.tenant.id)]]: كل الـ routes بعد كده تستخدم ده.

---

## الخلاصة

| العملية من B على مشروع A | النتيجة |
|---|---|
| [[findMany]] / [[count]] | مشاريع B بس |
| [[findUnique]] | [[null]] |
| [[update]] / [[delete]] | [[P2025]] → 404 |
| [[deleteMany({})]] | مشاريع B بس |
| [[create]] بـ [[tenantId: a.id]] | اتعمل في B |
| [[workspace.findUnique]] / [[update]] بـ id بتاع A | [[null]] / [[P2025]] |
| [[$queryRaw]] وإخواته | بيرمي error |
| nested من model مقفول لابن | **بيعدّي**: tenantId بإيدك، والـ RLS شبكة أمان |`,
          lines: [
            "الـ models اللي فيها tenantId وبتتقفل على الـ tenant.",
            "دالة بترمي error: هنحطها مكان أي SQL خام.",
            "دالة بتعمل client خاص بـ tenant واحد.",
            "extension على الـ client الأساسي...",
            "...بيلف الـ queries...",
            "...على كل الـ models...",
            "...وكل العمليات.",
            "الـ Workspace نفسه: أي where بيتقفل على الـ workspace بتاعنا بس، فمحدش يوصل لـ workspace تاني (ولا يعمل فيه nested write).",
            "model مش tenant؟ عدّيه زي ما هو.",
            "إنشاء: الـ tenantId بتاعنا فوق أي حاجة في الـ data.",
            "إنشاء كتير: نفس الكلام لكل صف.",
            "upsert: في الـ where وفي الـ create.",
            "أي حاجة تانية (find و update و delete و count...): في الـ where.",
            "نفّذ الـ query بعد التعديل.",
            "قفلة.",
            "قفلة.",
            "الـ SQL الخام مش بيعدّي على الـ models، فبنقفله على الـ client ده خالص.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "middleware بعد ما [[req.tenant]] اتحدد من الـ subdomain.",
            "المستخدم عضو في الـ workspace ده؟",
            "لأ؟ 404 كأنه مش موجود.",
            "احفظ العضوية (فيها الدور).",
            "والـ client المقفول على الـ tenant.",
            "كمّل.",
            "قفلة."
          ],
          sol: R`النتايج المتوقعة من B: [[findMany]] يرجّع مشاريع B بس، و [[findUnique]] بـ id مشروع A يرجّع null، و [[update]] يرمي [[P2025]]، و [[deleteMany({})]] يمسح مشاريع B بس ([[count]] بعددهم)، ومشروع A لسه موجود. و [[create]] بـ [[tenantId: a.id]] صريحة بيتعمل في B، لأن الـ spread بيحط tenantId بتاعنا في الآخر.

لو المشروع اتعمل في A، يبقى كاتب [[{ tenantId, ...args.data }]]. ولو [[findUnique]] رمى validation error، يبقى نسخة Prisma قديمة جدًا (قبل 5) مبتقبلش فلاتر زيادة في الـ unique where.`
        },
        {
          cmd: "RLS و app.tenant_id",
          title: "Row Level Security: القاعدة نفسها بترفض صفوف الـ tenant التاني",
          desc: R`الـ extension بيحمي الكود اللي بيعدّي عليه. أما RLS (Row Level Security) في PostgreSQL فبيحمي القاعدة نفسها: policy على كل جدول بتقول «الصف ده يظهر بس لو [[tenantId]] بتاعه زي [[app.tenant_id]] في الـ session». أي query، حتى [[$queryRaw]] أو query ناقص الفلتر، مش هيشوف غير صفوف الـ tenant ده.

في Prisma: extension بيعمل transaction فيها [[set_config('app.tenant_id', ..., true)]] وبعدها الـ query. والتطبيق لازم يتصل بـ role عادي، مش owner الجداول ومش superuser، لأن الاتنين بيعدّوا RLS.`,
          example: R`CREATE ROLE app_user LOGIN PASSWORD 'change-me';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "Project"
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

export function withTenant(tenantId) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const [, result] = await prisma.$transaction([
            prisma.$executeRaw$__btSELECT set_config('app.tenant_id', $__{tenantId}, true)$__bt,
            query(args),
          ]);
          return result;
        },
      },
    },
  });
}`,
          try: R`نفّذ الـ SQL على قاعدة تجربة، واتصل بـ [[app_user]]. جرّب [[SELECT * FROM "Project"]] من غير أي setting، وبعدين [[SELECT set_config('app.tenant_id', '<id>', false)]] وكرر. وجرّب [[INSERT]] بـ tenantId مختلف عن الـ setting. وبعدين اتصل بالـ owner وكرر أول query.`,
          flag: "script",
          deep: {
            why: "الـ extension بيغطي ٩٥٪، والـ ٥٪ الباقيين هما اللي بيعملوا التسريب: تقرير بـ SQL خام، أو script في job، أو مطوّر جديد استخدم الـ client العادي. الـ RLS بيخلي الغلطة دي ترجّع صفر صفوف بدل داتا عميل تاني. يعني بتتحول من تسريب لـ bug.",
            how: R`[[USING]] بيفلتر اللي يتقري (SELECT) واللي يتعدّل ويتمسح (UPDATE و DELETE). و [[WITH CHECK]] بيمنع كتابة صف tenantId بتاعه غلط (INSERT و UPDATE). والاتنين بيقارنوا بـ [[current_setting('app.tenant_id', true)]]. الـ [[true]] التانية معناها «لو مش متحدد رجّع NULL بدل error»، و NULL مبيساويش أي حاجة، فمن غير setting مفيش صفوف خالص. الافتراضي آمن.

[[set_config(..., true)]]: الـ true الأخيرة معناها local، يعني الـ setting بيعيش لحد آخر الـ transaction بس. ده مهم جدًا مع الـ connection pool: الاتصال ده هيروح لطلب تاني بعد شوية، ولو الـ setting فضل عليه، الطلب الجاي هيشوف داتا الـ tenant اللي قبله. عشان كده الـ extension بيحط الـ set_config والـ query في نفس الـ [[$transaction]].

و [[$executeRaw]] بالـ tagged template بيعمل parameter مش string concatenation، فمفيش SQL injection من الـ tenantId.

الـ role: صاحب الجدول (اللي عمل الـ migration) بيعدّي RLS إلا لو [[FORCE ROW LEVEL SECURITY]]، والـ superuser بيعدّيها دايمًا. فالتطبيق بيتصل بـ [[app_user]]، والـ migrations بتشتغل بـ role تاني. وده معناه متغيرين بيئة: [[DATABASE_URL]] للتطبيق و [[MIGRATE_DATABASE_URL]] للـ migrations.

التمن: كل query بقى transaction فيها ٢ statements، يعني round trip زيادة. في أغلب المنتجات مش ملحوظ. ولو بقى مشكلة، تقدر تعمل الـ set_config مرة واحدة في [[$transaction(async (tx) => ...)]] جوه الطلب وتعمل كل الـ queries فيه. والـ index على tenantId لازم يبقى موجود، لأن الـ policy بتتحط كـ WHERE.

والأدمن العام والـ jobs اللي بتلف على كل العملاء: role تالت عليه [[BYPASSRLS]]، أو policy زيادة بـ setting زي [[app.bypass_rls]]، ويبقى استخدامه صريح ومتسجّل.

Supabase مبني على نفس الفكرة: الـ policies بتستخدم [[auth.uid()]] من الـ JWT. تفاصيل RLS في تاب «PostgreSQL».`,
            when: "بعد الـ extension، كطبقة تانية، لأي SaaS فيه داتا حساسة (طبية، أو مالية، أو داتا عملاء شركات). وأي عميل enterprise هيسألك عليها في استبيان الأمان.",
            mistakes: R`الاتصال بالـ superuser أو owner الجدول، فالـ policies متشتغلش والاختبارات تعدّي. أو [[set_config(..., false)]] فالـ setting يفضل على الاتصال ويتسرب لطلب تاني. أو set_config والـ query في statements منفصلين برّه transaction، فكل واحد ممكن يروح على اتصال مختلف. أو PgBouncer بوضع transaction مع [[SET]] العادي (session level). أو إنك تنسى [[WITH CHECK]] فالقراية مقفولة والكتابة لأي tenant مفتوحة.`
          },
          teach: R`## القاعدة نفسها بتفلتر، مش الكود

الجزء الأول SQL: role عادي للتطبيق، و RLS على الجدول، و policy بتقارن [[tenantId]] بقيمة في الـ session. والجزء التاني extension في Prisma بيحط القيمة دي قبل كل query في نفس الـ transaction. جربنا الـ SQL بـ [[psql]] على PostgreSQL 18 (Docker)، والـ extension بـ Prisma 7.10 متصل بـ [[app_user]] (ويندوز 11، Node 24). الداتا: workspace [[ws-a]] فيه «سر A»، و [[ws-b]] فيه «B1».

---

## ١. [[CREATE ROLE app_user LOGIN PASSWORD 'change-me';]]

role = مستخدم قاعدة. [[LOGIN]] يقدر يتصل. ده **مش** superuser ومش صاحب الجداول، ودي النقطة كلها: الاتنين دول بيعدّوا RLS.

## ٢. [[GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;]]

صلاحيات الداتا بس، من غير [[DROP]] ولا [[ALTER]]. و [[ALL TABLES]] بتشمل الجداول الموجودة **دلوقتي** بس، فالجداول الجديدة محتاجة GRANT تاني (أو [[ALTER DEFAULT PRIVILEGES]]).

## ٣. [[ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;]]

من دلوقتي أي role عادي مبيشوفش ولا صف إلا اللي policy تسمح بيه.

## ٤. [[CREATE POLICY tenant_isolation ON "Project" USING (...) WITH CHECK (...);]]

- [[current_setting('app.tenant_id', true)]]: اقرا متغير session اسمه [[app.tenant_id]]. الـ [[true]] معناها «لو مش متحدد رجّع NULL بدل error».
- [[USING]]: شرط الصفوف اللي تتقري أو تتعدل أو تتمسح.
- [[WITH CHECK]]: شرط الصفوف اللي تتكتب (الجديدة أو بعد التعديل).

---

## ٥. التجربة بـ psql

~~~text الناتج
SET ROLE app_user;
SELECT current_user;           → app_user
SELECT * FROM "Project";       → (0 rows)
SELECT current_setting('app.tenant_id', true) IS NULL AS unset;   → t
~~~

من غير setting: صفر صفوف، مش error. [[NULL = 'ws-a']] نتيجتها NULL مش true، فولا صف عدّى.

~~~text الناتج
SELECT set_config('app.tenant_id', 'ws-a', false);   → ws-a
SELECT * FROM "Project";
 id | tenantId | name
 p1 | ws-a     | سر A
(1 row)
~~~

~~~text الناتج
INSERT INTO "Project"(id,"tenantId",name) VALUES ('p3','ws-b','حقن');
ERROR:  42501: new row violates row-level security policy for table "Project"
UPDATE "Project" SET name='x' WHERE id='p2';
UPDATE 0
~~~

- الـ INSERT لـ tenant تاني: [[WITH CHECK]] رفضه بكود [[42501]] (insufficient privilege).
- الـ UPDATE على صف B: [[USING]] خبّاه، فـ ٠ صفوف من غير error.

~~~text الناتج
RESET ROLE;
SELECT current_user, count(*) FROM "Project";   → postgres | 2
~~~

الـ superuser شاف الاتنين. لو التطبيق متصل بيه، الـ RLS ملهاش أي لازمة.

---

## ٦. [[export function withTenant(tenantId)]]: الـ extension

نفس شكل [[forTenant]] في الدرس اللي فات، بس بدل ما يعدّل الـ args:

### [[const [, result] = await prisma.$transaction([ ... ]);]]

[[$transaction]] بـ array بتنفّذهم بالترتيب على **اتصال واحد** وجوه transaction واحدة، وبترجّع array بالنتايج. [[[, result]]] بتتجاهل الأولى وتاخد التانية.

### [[prisma.$executeRaw$__btSELECT set_config('app.tenant_id', $__{tenantId}, true)$__bt]]

- [[$executeRaw]] بـ tagged template: [[$__{tenantId}]] بيتبعت parameter ([[$1]])، مش بيتلزق في النص، فمفيش SQL injection.
- آخر [[true]] = local: القيمة بتعيش لحد آخر الـ transaction بس.

### [[query(args)]]

الـ query الأصلي، في نفس الـ transaction بعد الـ set_config.

~~~text الناتج
withTenant(A).findMany: [ 'سر A' ]
withTenant(B).findMany: [ 'B1' ]
plain prisma.findMany:  []
create in A from B: ... Code: $__bt42501$__bt. Message: $__btnew row violates row-level security policy for table "Project"$__bt
B.updateMany on A id: { count: 0 }
raw from B: []
~~~

- الـ client العادي من غير extension: [[[]]]، الافتراضي آمن.
- [[$queryRaw]] مش model فالـ extension مبيلفوش، ومن غير setting رجع فاضي (في النسخة الأولى من الدرس اللي فات نفس الـ query كان بيسرّب مشروع A، والنسخة الحالية بتقفل الـ SQL الخام على client الـ tenant خالص).

---

## ٧. ليه [[true]] (local) مهمة؟

عملنا pool فيه اتصال واحد، ونادينا [[set_config('app.tenant_id', 'ws-a', false)]] **برّه** transaction، وبعدين طلب عادي:

~~~text الناتج
next plain request after session-level set_config: [ 'سر A' ]
~~~

الـ setting فضل على الاتصال، والطلب اللي بعده (اللي ممكن يبقى من tenant تاني) شاف داتا A. بالـ [[true]] جوه الـ transaction ده مستحيل.

---

## الخلاصة

| الحاجة | الكود | لو اتنسى |
|---|---|---|
| role عادي | [[app_user]] | superuser و owner بيعدّوا كل حاجة |
| القراية والتعديل | [[USING]] | بيشوف ويعدّل الكل |
| الكتابة | [[WITH CHECK]] | يكتب في أي tenant |
| من غير setting | [[current_setting(..., true)]] → NULL | صفر صفوف (آمن) |
| الـ pool | [[set_config(..., true)]] جوه [[$transaction]] | الـ tenant يتسرب للطلب الجاي |`,
          lines: [
            "role التطبيق: عادي، مش superuser ولا صاحب الجداول.",
            "صلاحيات القراية والكتابة بس.",
            "شغّل RLS على الجدول.",
            "الـ policy:",
            "الصفوف اللي تتقري أو تتعدل: الـ tenant بتاع الـ session بس...",
            "...والصفوف اللي تتكتب: نفس الشرط.",
            "الـ extension اللي بيحط الـ tenant في الـ session.",
            "extension على الـ client...",
            "...بيلف الـ queries...",
            "...على كل الـ models...",
            "...وكل العمليات.",
            "transaction فيها خطوتين على نفس الاتصال:",
            "حط [[app.tenant_id]] لحد آخر الـ transaction بس...",
            "...ونفّذ الـ query.",
            "قفلة.",
            "رجّع نتيجة الـ query.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بـ [[app_user]] ومن غير setting: [[SELECT]] يرجّع صفر صفوف (مش error). بعد [[set_config]] بـ id الـ tenant: صفوفه هو بس. الـ [[INSERT]] بـ tenantId مختلف يرمي [[new row violates row-level security policy for table "Project"]] (كود 42501). ومن الـ owner: كل الصفوف ترجع، وده السبب إن التطبيق لازم ميتصلش بيه.

من Prisma: [[withTenant(a.id).project.findMany()]] يرجع مشاريع A بس، و [[prisma.project.findMany()]] العادي بـ app_user يرجّع مصفوفة فاضية.

لو الـ SELECT من غير setting رجّع كل الصفوف، اتأكد إنك متصل بـ app_user فعلًا ([[SELECT current_user]]).`
        },
        {
          cmd: "أعضاء ودعوات",
          title: "أعضاء workspace وأدوارهم، والدعوة بالإيميل",
          desc: R`كل workspace ليه أعضاء بأدوار: OWNER (واحد أو أكتر، يقدر يمسح الـ workspace ويدير الفلوس)، و ADMIN (يدير الأعضاء)، و MEMBER (شغل عادي). الدور جوه جدول Member، فنفس الشخص ممكن يبقى OWNER في workspace و MEMBER في تاني.

الدعوة: الأدمن بيكتب إيميل ودور، والسيرفر بيعمل صف Invite فيه token hash ومدة (٧ أيام)، ويبعت لينك. اللي بيفتح اللينك بيسجّل دخول أو حساب جديد بنفس الإيميل، ويقبل، فيتعمل Member.`,
          example: R`export const requireTenantRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.member.role)) throw new AppError(403, "FORBIDDEN", "مش مسموح لدورك");
  next();
};
router.post("/invites", tenantScope, requireTenantRole("OWNER", "ADMIN"), async (req, res) => {
  const { email, role } = z.object({ email: z.email().transform((e) => e.toLowerCase()), role: z.enum(["ADMIN", "MEMBER"]) }).parse(req.body);
  if (role === "ADMIN" && req.member.role !== "OWNER") throw new AppError(403, "FORBIDDEN", "الـ owner بس يعيّن admin");
  const token = crypto.randomBytes(32).toString("base64url");
  await req.db.invite.upsert({ where: { tenantId_email: { tenantId: req.tenant.id, email } }, create: { email, role, tokenHash: sha256(token), invitedById: req.user.id, expiresAt: new Date(Date.now() + 7 * 864e5) }, update: { role, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 7 * 864e5) } });
  await emailQueue.add("invite", { to: email, workspace: req.tenant.name, link: $__bt$__{config.WEB_ORIGIN}/invite?token=$__{token}$__bt });
  res.status(202).end();
});
router.post("/invites/accept", requireAuth, async (req, res) => {
  const invite = await prisma.invite.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } });
  const user = await prisma.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) throw new AppError(400, "BAD_INVITE", "الدعوة انتهت، اطلب واحدة جديدة");
  if (invite.email !== user.email || !user.emailVerifiedAt) throw new AppError(403, "INVITE_EMAIL_MISMATCH", "الدعوة دي لإيميل تاني");
  await prisma.$transaction([
    prisma.member.upsert({ where: { tenantId_userId: { tenantId: invite.tenantId, userId: user.id } }, create: { tenantId: invite.tenantId, userId: user.id, role: invite.role }, update: {} }),
    prisma.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } }),
  ]);
  res.json({ data: { tenantId: invite.tenantId } });
});`,
          try: R`اكتب الـ model بتاع [[Invite]] (id، و tenantId، و email، و role، و tokenHash unique، و invitedById، و expiresAt، و acceptedAt، و [[@@unique([tenantId, email])]]) وضيفه لـ SCOPED. بعدين اكتب [[DELETE /members/:userId]] بقاعدتين: MEMBER ميقدرش يشيل حد، وآخر OWNER ميتشالش ولا يشيل نفسه.`,
          flag: "script",
          deep: {
            why: "الأدوار جوه الـ workspace هي الفرق بين «أداة شخصية» و «منتج الشركات تشتريه». وأغلب ثغرات الـ SaaS الحقيقية مش في الـ login، بتبقى في الدعوات: دعوة اتقبلت بإيميل تاني، أو MEMBER رقّى نفسه ADMIN، أو آخر OWNER شال نفسه والـ workspace بقى من غير صاحب.",
            how: R`[[requireTenantRole]] بيشتغل بعد [[tenantScope]]، لأنه بيقرا [[req.member.role]] اللي اتجاب من القاعدة، مش من الـ JWT. ليه مش JWT؟ الدور بيتغير (الأدمن شال حد)، والـ JWT بيعيش ربع ساعة، وكمان الشخص عنده دور مختلف في كل workspace.

الـ ADMIN مينفعش يعيّن ADMIN (الـ OWNER بس). من غير القاعدة دي، أي ADMIN يقدر يعمل حساب تاني ليه ويرقّيه، وتبقى صعب تشيله. وبنفس المنطق، محدش يقدر يدّي دور أعلى من دوره.

الـ [[upsert]] على [[(tenantId, email)]]: دعوة تانية لنفس الإيميل بتحدّث القديمة (توكن جديد ومدة جديدة) بدل ما تعمل اتنين. والـ extension بيحط tenantId في الـ create والـ where لوحده.

القبول بيتم بـ [[prisma]] العادي مش [[req.db]]، لأن المستخدم لسه مش عضو، والـ workspace بيتعرف من الدعوة نفسها. وده مكان مقصود وواضح.

التحقق من الإيميل: الدعوة لـ [[mona@acme.com]] لازم تتقبل من حساب إيميله [[mona@acme.com]] ومتأكد. من غير الشرط ده، أي حد وصله اللينك (اتعمل له forward، أو اتسرب في تذكرة دعم) يدخل الـ workspace. وبعض المنتجات بتسمح بقبول الدعوة بأي إيميل، وده قرار منتج، بس لازم يبقى مقصود.

المستخدم الجديد: صفحة [[/invite?token=]] بتقوله يسجّل. والإيميل بتاعه اتأكد فعليًا لأنه فتح اللينك من إيميله، فتقدر تأكده في نفس الخطوة. أو تبعته لتأكيد عادي.

الدومين: «أي حد إيميله [[@acme.com]] يدخل لوحده» ميزة شائعة (domain capture). بس لازم تتأكد إن acme فعلًا صاحبة الدومين (سجل TXT في الـ DNS)، وإلا أي حد يسجّل workspace ويقول الدومين ده بتاعي.`,
            when: "أول ما الـ workspace يبقى فيه أكتر من شخص. والدعوات بالإيميل قبل أي SSO أو SCIM. دول بييجوا لما العملاء الكبار يطلبوهم.",
            mistakes: R`الدور في الـ JWT. أو ADMIN يعيّن OWNER أو ADMIN. أو قبول الدعوة بأي حساب. أو الدعوة من غير انتهاء. أو شيل آخر OWNER. أو إن العضو المشال يفضل شايف الداتا لحد ما التوكن يخلص، لأن الصلاحية مش بتتقري من القاعدة. أو إرسال الدعوات من غير حد، فالـ workspace بقى أداة spam.`
          },
          teach: R`## الدور جوه العضوية، والدعوة توكن بيتقبل بنفس الإيميل بس

٣ حاجات: middleware بيتأكد من دورك جوه الـ workspace، و route بيعمل دعوة ويبعت لينك، و route بيقبلها. والـ solCode بيشيل عضو. جربنا كله بـ Express 5 و Zod 4 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24) بـ supertest، و [[forTenant]] من درس الـ extension. workspace «Acme» فيه Ali (OWNER) و Mona (ADMIN) و Sara (MEMBER). والـ [[emailQueue]] وهمية بتحفظ اللي اتبعت.

---

## ١. [[export const requireTenantRole = (...roles) => (req, res, next) => { ... }]]

نفس شكل [[requireRole]] بالظبط، بس بيقرا [[req.member.role]]: العضوية اللي [[tenantScope]] جابها من القاعدة للـ workspace ده. لازم ييجي **بعد** [[tenantScope]].

~~~text الناتج
MEMBER invites                     403 {"error":{"code":"FORBIDDEN","message":"مش مسموح لدورك"}}
~~~

---

## ٢. [[router.post("/invites", tenantScope, requireTenantRole("OWNER", "ADMIN"), ...)]]

### [[z.object({ email: z.email().transform((e) => e.toLowerCase()), role: z.enum(["ADMIN", "MEMBER"]) })]]

- [[z.email()]] بيتأكد من شكل الإيميل، و [[transform]] بيحوّله small بعد الفحص.
- [[role]] من غير [[OWNER]] خالص:

~~~text الناتج
ADMIN invites OWNER                400 {... "values":["ADMIN","MEMBER"],"path":["role"] ...}
~~~

### [[if (role === "ADMIN" && req.member.role !== "OWNER") throw ...]]

~~~text الناتج
ADMIN invites ADMIN                403 {"error":{"code":"FORBIDDEN","message":"الـ owner بس يعيّن admin"}}
~~~

### [[const token = crypto.randomBytes(32).toString("base64url");]]

٣٢ byte عشوائي = ٤٣ حرف. ده اللي هيروح في اللينك، وفي القاعدة الـ [[sha256]] بتاعه بس.

### [[req.db.invite.upsert({ where: { tenantId_email: { ... } }, create: {...}, update: {...} })]]

- [[tenantId_email]] اسم القيد [[@@unique([tenantId, email])]]: دعوة واحدة لكل إيميل في الـ workspace.
- [[create]] من غير [[tenantId]]: الـ extension بيحطه.
- [[update]]: توكن جديد ومدة جديدة. يعني اللينك القديم بيموت.
- [[7 * 864e5]]: [[864e5]] = 86,400,000 ملّي = يوم، يعني ٧ أيام.

بعتنا دعوتين لـ [[Sara@Example.com]] وبعدين [[sara@example.com]]:

~~~text الناتج
ADMIN invites Sara@Example.com     202
again (upsert)                     202
invites rows: 1 mails: 2 http://localhost:3000/invite?token=CWuAPc…
~~~

صف واحد (الإيميل اتحوّل small فبقوا نفس الحاجة)، وإيميلين. و 202 = Accepted: الطلب اتقبل والإيميل لسه هيتبعت.

---

## ٣. [[router.post("/invites/accept", requireAuth, ...)]]

### [[prisma.invite.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } })]]

بالـ [[prisma]] العادي، لأن المستخدم لسه مش عضو ومعندوش [[req.db]]. و [[String(...)]] عشان لو حد بعت object أو رقم ميقعش.

### [[if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) throw ... 400]]

مش موجودة، أو اتقبلت، أو خلصت:

~~~text الناتج
old token                          400 {"error":{"code":"BAD_INVITE","message":"الدعوة انتهت، اطلب واحدة جديدة"}}
accept again                       400 {"error":{"code":"BAD_INVITE",...}}
~~~

الأولى بتوكن الإيميل الأول (اتبدل بالـ upsert)، والتانية بعد ما اتقبلت.

### [[if (invite.email !== user.email || !user.emailVerifiedAt) throw ... 403]]

~~~text الناتج
accept as ali (other email)        403 {"error":{"code":"INVITE_EMAIL_MISMATCH",...}}
accept as inst (unverified)        403 {"error":{"code":"INVITE_EMAIL_MISMATCH",...}}
accept as inst (verified)          200 {"data":{"tenantId":"88bd3f57-2833-493a-acdb-dc2b8c56e674"}}
~~~

Ali معاه اللينك بس إيميله مختلف. وصاحبة الإيميل نفسها اترفضت لحد ما إيميلها اتأكد.

### [[prisma.$transaction([ member.upsert(...), invite.update(...) ])]]

العضوية وعلامة القبول مع بعض. و [[update: {}]] في الـ upsert: لو عضو أصلًا متغيرش دوره.

---

## ٤. الـ solCode: [[DELETE /members/:userId]]

### [[req.db.$transaction(async (tx) => { ... })]]

transaction من الـ client المقفول على الـ tenant، والـ [[tx]] جواها بيفضل مقفول (جربنا: [[tx.member.findMany()]] رجّع أعضاء الـ workspace ده بس).

### [[tx.$executeRaw$__btSELECT 1 FROM "Workspace" WHERE id = $__{req.tenant.id} FOR UPDATE$__bt]]

[[FOR UPDATE]] بيقفل صف الـ workspace لحد آخر الـ transaction. أي طلب حذف تاني في نفس الـ workspace بيستنى عند السطر ده.

ليه؟ النسخة القديمة كانت بتعد الـ owners وتمسح من غير قفل. عملنا ownerين وكل واحد شال التاني في نفس اللحظة:

~~~text الناتج (من غير القفل)
parallel 0                         204
parallel 1                         204
owners left: 0
~~~

الاتنين عدّوا ٢ owners، والـ workspace بقى من غير صاحب. بالقفل:

~~~text الناتج (بالقفل)
parallel 0                         204
parallel 1                         404 {"error":{"code":"NOT_FOUND","message":"مش موجود"}}
owners left: 1
~~~

التاني استنى، ولما كمّل لقى إن [[me]] نفسه اتشال، فـ 404.

### [[me]] و [[target]] جوه القفل

بنقرا عضويتي من تاني جوه الـ transaction (مش [[req.member]] اللي اتقرت قبل القفل)، عشان لو اتشلت في النص.

### باقي القواعد

~~~text الناتج
MEMBER removes                     403
ADMIN removes OWNER                403 {"error":{"code":"FORBIDDEN","message":"مش مسموح لدورك"}}
OWNER removes self (last)          409 {"error":{"code":"LAST_OWNER","message":"لازم يفضل owner واحد على الأقل"}}
other-ws member id                 404
ADMIN removes MEMBER               204
~~~

---

## الخلاصة

| القاعدة | الكود |
|---|---|
| الدور من القاعدة، لكل workspace | [[requireTenantRole]] بعد [[tenantScope]] |
| مفيش دعوة OWNER، والـ ADMIN مبيعيّنش ADMIN | [[z.enum]] + شرط |
| دعوة واحدة لكل إيميل، والقديمة تموت | [[upsert]] على [[(tenantId, email)]] |
| القبول بنفس الإيميل ومتأكد | [[invite.email !== user.email]] |
| آخر OWNER ميتشالش حتى مع طلبين مع بعض | [[FOR UPDATE]] + count جوه transaction |`,
          lines: [
            "middleware للأدوار جوه الـ workspace.",
            "الدور من العضوية اللي اتجابت من القاعدة، مش من الـ JWT.",
            "مسموح؟ كمّل.",
            "قفلة.",
            "إنشاء دعوة: عضو، و OWNER أو ADMIN.",
            "الإيميل والدور. مينفعش تدعي حد OWNER.",
            "الـ ADMIN مبيعيّنش ADMIN.",
            "توكن عشوائي.",
            "دعوة واحدة لكل إيميل في الـ workspace: جديدة أو تحديث للقديمة. والـ tenantId من الـ extension.",
            "ابعت اللينك.",
            "تمام.",
            "قفلة.",
            "قبول الدعوة: لازم يكون داخل.",
            "دوّر على الدعوة بالـ hash، بالـ client العادي لأنه لسه مش عضو.",
            "والمستخدم.",
            "مش موجودة، أو اتقبلت، أو خلصت؟ ارفض.",
            "إيميل الحساب لازم يطابق الدعوة ويكون متأكد.",
            "في transaction:",
            "اعمله عضو بالدور اللي في الدعوة، ولو عضو بالفعل سيبه.",
            "وعلّم الدعوة إنها اتقبلت.",
            "قفلة الـ transaction.",
            "رجّع الـ workspace عشان الواجهة تفتحه.",
            "قفلة."
          ],
          sol: R`الـ model: [[model Invite { id String @id @default(uuid()) tenantId String email String role Role tokenHash String @unique invitedById String expiresAt DateTime acceptedAt DateTime? @@unique([tenantId, email]) }]]، و [[SCOPED]] فيها [[Invite]].

الحذف (الـ solCode): MEMBER يحاول يشيل حد → [[403]]. وكل الفحص جوه transaction بعد [[FOR UPDATE]] على صف الـ workspace: من غيره، لو فيه ownerين وكل واحد شال التاني في نفس اللحظة، الاتنين بيعدّوا [[count]] (كل واحد شايف ٢) والـ workspace يفضل من غير owner خالص. جربناها: من غير القفل الطلبين رجعوا 204 و [[owners left: 0]]، وبالقفل التاني رجع 404 لأن صاحبه نفسه اتشال. شيل OWNER لما هو الوحيد → [[409 LAST_OWNER]]. شيل عضو من workspace تاني → [[404]] لأن [[req.db]] مش هيلاقيه. والـ ADMIN ميقدرش يشيل OWNER.

الغلطة الشائعة: [[prisma.member.delete]] العادي بدل [[req.db]]، فأدمن workspace يقدر يشيل عضو من workspace تاني لو عرف الـ userId.`,
          solCode: R`router.delete("/members/:userId", tenantScope, requireTenantRole("OWNER", "ADMIN"), async (req, res) => {
  await req.db.$transaction(async (tx) => {
    // اقفل الـ workspace: أي حذف تاني في نفس الـ workspace يستنى لحد ما ده يخلص
    await tx.$executeRaw$__btSELECT 1 FROM "Workspace" WHERE id = $__{req.tenant.id} FOR UPDATE$__bt;
    const me = await tx.member.findFirst({ where: { userId: req.user.id } });
    const target = await tx.member.findFirst({ where: { userId: req.params.userId } });
    if (!me || !target) throw new AppError(404, "NOT_FOUND", "مش موجود");
    if (target.role === "OWNER" && me.role !== "OWNER") throw new AppError(403, "FORBIDDEN", "مش مسموح لدورك");
    if (target.role === "OWNER") {
      const owners = await tx.member.count({ where: { role: "OWNER" } });
      if (owners <= 1) throw new AppError(409, "LAST_OWNER", "لازم يفضل owner واحد على الأقل");
    }
    await tx.member.deleteMany({ where: { userId: target.userId } });
  });
  res.status(204).end();
});`
        },
        {
          cmd: "subdomain و custom domain",
          title: "acme.myapp.com و learn.acme.com: الـ tenant من الدومين",
          desc: R`كل عميل بياخد subdomain ([[acme.myapp.com]]) أوتوماتيك، والعملاء اللي عايزين يقدروا يربطوا دومين خاص بيهم ([[learn.acme.com]]). الـ API بيعرف الـ tenant من الـ [[Host]] header.

الـ subdomains سهلة: سجل DNS واحد wildcard ([[*.myapp.com]]) بيشاور على السيرفر، وشهادة TLS wildcard (محتاجة DNS challenge). أما الدومينات الخاصة فكل واحد محتاج شهادة لوحده، وده اللي on-demand TLS في Caddy بيعمله: أول ما طلب يوصل لدومين جديد، Caddy بيسأل التطبيق «الدومين ده مسموح؟»، ولو أيوه يطلّع شهادة من Let's Encrypt.`,
          example: R`{
	on_demand_tls {
		ask http://localhost:4000/internal/domain-check
	}
}
https:// {
	tls {
		on_demand
	}
	reverse_proxy localhost:3000
}

app.get("/internal/domain-check", async (req, res) => {
  const ok = await prisma.workspace.findFirst({ where: { domain: String(req.query.domain), domainVerifiedAt: { not: null } }, select: { id: true } });
  res.status(ok ? 200 : 404).end();
});
export const tenantLookup = {
  bySlug: (slug) => prisma.workspace.findUnique({ where: { slug } }),
  byDomain: (domain) => prisma.workspace.findFirst({ where: { domain, domainVerifiedAt: { not: null } } }),
};
export async function resolveTenant(req, res, next) {
  const host = req.hostname.toLowerCase();
  const slug = host.endsWith("." + config.ROOT_DOMAIN) ? host.slice(0, -(config.ROOT_DOMAIN.length + 1)) : null;
  req.tenant = slug ? await tenantLookup.bySlug(slug) : await tenantLookup.byDomain(host);
  if (!req.tenant) throw new AppError(404, "UNKNOWN_TENANT", "الموقع ده مش موجود");
  next();
}`,
          try: R`من غير DNS حقيقي: ضيف في [[/etc/hosts]] سطرين [[127.0.0.1 acme.myapp.test]] و [[127.0.0.1 learn.acme.test]]، وخلي [[ROOT_DOMAIN=myapp.test]]، وافتح الاتنين. اتأكد إن كل واحد بيطلّع الـ workspace الصح. وبعدين صمّم خطوات «اربط دومينك» اللي هتظهر للعميل: هيحط أنهي سجلات DNS، وإزاي هتتأكد إنه صاحب الدومين؟`,
          flag: "script",
          deep: {
            why: "الدومين الخاص بيخلي المنتج بتاعك يبان كأنه بتاع العميل (white-label)، وده بيتباع بفلوس زيادة في الخطط الأعلى. والـ subdomain بيدّي كل عميل عنوان واضح، وبيخلي الـ cookies والـ tenant منفصلين من غير ما المستخدم يختار.",
            how: R`الـ subdomains: سجل [[A]] أو [[CNAME]] لـ [[*.myapp.com]]. والشهادة wildcard لازم تتطلع بـ DNS-01 challenge (Let's Encrypt بتطلب إثبات إنك تملك الـ DNS). في Caddy محتاج plugin لمزوّد الـ DNS بتاعك، أو خلي Cloudflare يعمل الـ TLS قدام السيرفر.

الدومين الخاص: العميل بيحط [[CNAME learn.acme.com → custom.myapp.com]]. قبل ما تفعّله، اتأكد إنه صاحب الدومين: اطلب منه سجل [[TXT _myapp.learn.acme.com]] فيه token عشوائي، والسيرفر يتأكد منه ([[dns.promises.resolveTxt]]) ويحط [[domainVerifiedAt]]. من غير التحقق ده، أي حد يربط دومين حد تاني بـ workspace بتاعه.

Caddy on-demand TLS: [[https://]] من غير اسم معناها «أي دومين يوصلني». وأول TLS handshake لدومين جديد، Caddy بيعمل GET على [[ask]] ومعاه [[?domain=learn.acme.com]]. لو التطبيق رجّع 2xx، Caddy بيطلّع شهادة ويخزنها ويجددها لوحده. والـ ask لازم يكون سريع (lookup بـ index)، وإلا أول زيارة هتستنى. ومن غير ask، أي حد يشاور دومينات عشوائية على السيرفر بتاعك، و Caddy يطلب شهادات لحد ما Let's Encrypt يعملك rate limit. عشان كده Caddy بيشترط ask أو permission module في الإنتاج.

[[/internal/domain-check]] لازم ميبقاش مكشوف للإنترنت: على port داخلي أو localhost بس.

[[resolveTenant]]: [[req.hostname]] بيحترم [[trust proxy]] (بياخد [[X-Forwarded-Host]] لو السيرفر ورا proxy موثوق). والـ tenant بيتكاش (Redis أو ذاكرة لدقيقة)، لأنه بيتسأل عليه مع كل طلب.

الـ cookies: cookie اتعملت على [[acme.myapp.com]] مش بتتبعت لـ [[globex.myapp.com]]، وده كويس. متحطش [[Domain=.myapp.com]] على cookie الـ session، وإلا كل الـ subdomains يشوفوها. والدخول على دومين خاص محتاج session لوحده على الدومين ده (الـ cookies مش بتعدّي بين دومينات مختلفة)، فالدخول بيحصل على الدومين نفسه، أو بلينك مرة واحدة من الدومين الرئيسي.

البدائل المُدارة: Vercel و Cloudflare for SaaS بيعملوا نفس الفكرة كخدمة (API تضيف بيه دومين العميل والشهادة بتطلع لوحدها).`,
            when: "الـ subdomain من أول نسخة لو الـ tenants عندهم زوار من برّه (صفحات أكاديمية، أو متجر). والدومين الخاص لما عميل يطلبه، وغالبًا في خطة مدفوعة أعلى.",
            mistakes: R`ask endpoint بيرد 200 لأي دومين. أو ربط الدومين من غير TXT verification. أو cookie الـ session على [[.myapp.com]]. أو الاعتماد على [[Host]] من غير trust proxy صح (أو العكس: trust proxy مفتوح فأي حد يبعت X-Forwarded-Host). أو تسيب [[/internal/domain-check]] مكشوف. أو subdomains محجوزة زي [[www]] و [[api]] و [[admin]] متاحة كـ slug لعميل.`
          },
          teach: R`## الدومين اللي في الطلب هو اللي بيحدد الـ tenant

جزء Caddy بيطلّع شهادة HTTPS لأي دومين وقت أول زيارة، بس بعد ما يسأل التطبيق «مسموح؟». و [[/internal/domain-check]] هو اللي بيجاوب. و [[resolveTenant]] بيقرا الـ Host ويجيب الـ workspace بالـ slug أو بالدومين الخاص. جربنا جزء Express بـ Express 5 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24)، وبدل [[/etc/hosts]] بعتنا الـ [[Host]] header بإيدنا بـ [[curl -H "Host: ..."]]: السيرفر بيشوف نفس الحاجة. workspace «Acme» بـ slug [[acme]] ودومين [[learn.acme.test]] متأكد، و «Globex» بدومين [[learn.globex.test]] **مش** متأكد، و [[ROOT_DOMAIN=myapp.test]]. Caddy مش متسطب هنا، فجزؤه من وثائق Caddy.

---

## ١. Caddyfile (من الـ docs)

### البلوك العام: [[{ on_demand_tls { ask http://localhost:4000/internal/domain-check } }]]

البلوك اللي من غير اسم في أول الملف = إعدادات عامة. [[on_demand_tls]] بيقول: قبل ما تطلب شهادة لأي دومين، ابعت GET لـ [[ask]] ومعاه [[?domain=الدومين]]. 2xx = اطلب الشهادة، غير كده ارفض.

### [[https:// { tls { on_demand } reverse_proxy localhost:3000 }]]

- [[https://]] من غير اسم دومين = أي دومين يوصل على HTTPS.
- [[tls { on_demand }]]: الشهادة بتتطلب وقت أول handshake مش وقت التشغيل.
- [[reverse_proxy localhost:3000]]: ابعت الطلب للتطبيق (الواجهة).

---

## ٢. [[app.get("/internal/domain-check", ...)]]

[[findFirst({ where: { domain: String(req.query.domain), domainVerifiedAt: { not: null } }, select: { id: true } })]]:

- [[String(...)]]: [[req.query.domain]] ممكن يبقى array لو اتبعت مرتين، فبنحوّله نص.
- [[domainVerifiedAt: { not: null }]]: الدومين اتأكد بسجل TXT.
- [[select: { id: true }]]: مش محتاجين غير «موجود ولا لأ».

~~~text الناتج
ask learn.acme.test      200
ask learn.globex.test    404
ask random.example       404
~~~

Globex ربط الدومين بس لسه متأكدش، فمفيش شهادة.

---

## ٣. [[export async function resolveTenant(req, res, next) {]]

### [[const host = req.hostname.toLowerCase();]]

[[req.hostname]] الـ Host من غير البورت. والدومينات مبتفرّقش بين capital و small، فبنوحّدها.

### [[host.endsWith("." + config.ROOT_DOMAIN) ? host.slice(0, -(config.ROOT_DOMAIN.length + 1)) : null]]

- [[endsWith(".myapp.test")]]: subdomain عندنا؟ النقطة مهمة: من غيرها [[evilmyapp.test]] كان هيعدّي.
- [[slice(0, -(10 + 1))]]: [[myapp.test]] ١٠ حروف + النقطة = ١١، فالرقم السالب بيشيل آخر ١١ حرف: [[acme.myapp.test]] → [[acme]].
- مش تحتنا؟ [[null]]، ويبقى دومين خاص.

### [[req.tenant = slug ? await tenantLookup.bySlug(slug) : await tenantLookup.byDomain(host);]]

فيه slug؟ دوّر بيه. مفيش؟ يبقى دومين خاص. والدالتين متعرّفين فوق في [[tenantLookup]]:

- [[bySlug]]: [[findUnique({ where: { slug } })]]، والـ slug عليه [[@unique]].
- [[byDomain]]: [[findFirst({ where: { domain, domainVerifiedAt: { not: null } } })]]. نفس شرط الـ ask بالظبط: الدومين لازم يكون متأكد.

ده بيتسأل مع **كل** طلب، فبيتكاش في الإنتاج (Redis أو ذاكرة لدقيقة). في التجربة الدالتين بيسألوا Prisma مباشرة.

~~~text الناتج
acme.myapp.test:6020     {"host":"acme.myapp.test","workspace":"Acme"} 200
ACME.MyApp.test          {"host":"ACME.MyApp.test","workspace":"Acme"} 200
learn.acme.test:6020     {"host":"learn.acme.test","workspace":"Acme"} 200
learn.globex.test        {"error":{"code":"UNKNOWN_TENANT","message":"الموقع ده مش موجود"}} 404
nope.myapp.test          {"error":{"code":"UNKNOWN_TENANT","message":"الموقع ده مش موجود"}} 404
evil.example             {"error":{"code":"UNKNOWN_TENANT",...}} 404
myapp.test               {"error":{"code":"UNKNOWN_TENANT",...}} 404
~~~

- البورت [[:6020]] اتشال من [[hostname]]، و [[ACME.MyApp.test]] لقت Acme بعد الـ [[toLowerCase]] (رغم إن [[hostname]] نفسه رجع بالحروف الكبيرة).
- [[myapp.test]] نفسه مش [[.myapp.test]]، فاتدوّر عليه كدومين خاص ومتلقاش. الصفحة الرئيسية للمنتج ليها route لوحدها قبل الـ middleware ده.
- **[[learn.globex.test]] رجع 404**: Globex ربط الدومين بس لسه متأكدش. النسخة الأولى من الدرس كانت بتدوّر بالدومين بس من غير شرط التأكيد، وجربناها: نفس الطلب رجّع [[{"workspace":"Globex"}]] و 200. Caddy مكانش هيطلّع شهادة، بس لو فيه حاجة تانية قدام التطبيق (HTTP عادي أو Cloudflare)، أي حد كان يقدر يربط دومين حد تاني بالـ workspace بتاعه. عشان كده الشرط في [[byDomain]] زي الـ ask بالظبط.

### [[if (!req.tenant) throw new AppError(404, "UNKNOWN_TENANT", ...)]]

---

## ٤. [[trust proxy]] و [[X-Forwarded-Host]]

ورا proxy، الـ Host اللي بيوصل ممكن يبقى بتاع الـ proxy، والأصلي في [[X-Forwarded-Host]]. Express بيقرا الـ header ده بس لو [[app.set("trust proxy", ...)]]:

~~~text الناتج
XFH no trust:   {"error":{"code":"UNKNOWN_TENANT",...}}       ← Host: evil.example
XFH with trust: {"host":"acme.myapp.test","workspace":"Acme"}
~~~

نفس الطلب ([[Host: evil.example]] و [[X-Forwarded-Host: acme.myapp.test]]). من غير trust استخدم الـ Host، ومعاه استخدم الـ header. فالـ trust proxy يتفتح بس لو فيه proxy موثوق فعلًا قدام التطبيق، وإلا أي حد يختار الـ tenant بـ header.

---

## الخلاصة

| الحاجة | الكود | ليه |
|---|---|---|
| شهادة لدومين العميل | Caddy [[on_demand]] + [[ask]] | من غير ask أي حد يخلّص الـ rate limit بتاعك |
| مين يتسمح له | [[domainVerifiedAt: { not: null }]] | ملكية الدومين بسجل TXT |
| الـ tenant من الـ subdomain | [[endsWith("." + ROOT)]] + [[slice]] | النقطة بتمنع [[evilmyapp.test]] |
| الـ tenant من دومين خاص | [[tenantLookup.byDomain]] بالمتأكد بس | نفس شرط الـ ask |
| ورا proxy | [[trust proxy]] بحذر | [[X-Forwarded-Host]] بيتكتب من برّه |`,
          lines: [
            "الإعدادات العامة لـ Caddy:",
            "on-demand TLS...",
            "...يسأل التطبيق قبل ما يطلّع أي شهادة.",
            "قفلة.",
            "قفلة.",
            "أي دومين يوصل على HTTPS:",
            "إعدادات TLS:",
            "شهادة وقت الطلب.",
            "قفلة.",
            "ابعت للتطبيق.",
            "قفلة.",
            "الـ endpoint اللي Caddy بيسأله (داخلي بس).",
            "الدومين مربوط بـ workspace ومتأكد؟",
            "200 يطلّع شهادة، و 404 يرفض.",
            "قفلة.",
            "دالتين بيجيبوا الـ workspace (في الإنتاج بيتلفّوا بكاش لدقيقة):",
            "بالـ slug.",
            "بالدومين الخاص، والمتأكد بس (domainVerifiedAt مش null)، نفس شرط الـ ask بالظبط.",
            "قفلة.",
            "middleware بيحدد الـ tenant من الدومين.",
            "الدومين من الطلب، small.",
            "لو تحت الدومين الرئيسي، خد الجزء اللي قبله (الـ slug).",
            "بالـ slug أو بالدومين الخاص.",
            "مش موجود؟ 404.",
            "كمّل.",
            "قفلة."
          ],
          sol: R`مع [[/etc/hosts]]: [[http://acme.myapp.test:4000]] بيطلّع [[slug = "acme"]] ويجيب الـ workspace بالـ slug، و [[http://learn.acme.test:4000]] مش تحت [[myapp.test]] فبيتدوّر عليه كدومين خاص. أي دومين تالت يرجع [[404 UNKNOWN_TENANT]]، وكمان دومين مربوط بس لسه متأكدش (زي [[learn.globex.test]] في الشرح)، لأن [[byDomain]] بيدوّر على المتأكد بس.

خطوات «اربط دومينك» المتوقعة: (١) العميل يكتب [[learn.acme.com]]، وانت تحفظه من غير verified وتدّيه token. (٢) يحط سجلين: [[CNAME learn → custom.myapp.com]] و [[TXT _myapp.learn → myapp-verify=<token>]]. (٣) زرار «تحقق» (أو job كل ساعة) يعمل [[resolveTxt]] ويقارن، ولو صح يحط [[domainVerifiedAt]]. (٤) من دلوقتي الـ ask يرد 200، وأول زيارة بتطلّع الشهادة. (٥) لو الـ TXT اتشال بعدين، الـ job يلغي التفعيل.

الغلطة الشائعة: الاعتماد على الـ CNAME بس كإثبات ملكية.`
        },
        {
          cmd: "اختبار تسريب tenants",
          title: "اختبار يثبت إن tenant مش شايف التاني",
          desc: R`الاختبار ده بيعمل tenantين A و B، ويحط داتا في A، ويحاول من B بكل طريقة: list، و get بالـ id، و count، و update، و delete، و create بـ tenantId بتاع A. كل محاولة لازم تفشل أو ترجع فاضي، وداتا A لازم تفضل زي ما هي.

اكتبه مرة للـ data layer (الـ extension)، ومرة على مستوى الـ HTTP لكل route فيه [[:id]]. وخليه في الـ CI، عشان أي model أو route جديد يتختبر أوتوماتيك. أساسيات Vitest في تاب «فحص الكود».`,
          example: R`import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma, forTenant } from "../src/db.js";

let a, b, secret;
beforeAll(async () => {
  a = await prisma.workspace.create({ data: { name: "A", slug: "a-" + Date.now() } });
  b = await prisma.workspace.create({ data: { name: "B", slug: "b-" + Date.now() } });
  secret = await prisma.project.create({ data: { name: "سر A", tenantId: a.id } });
});
afterAll(() => prisma.$disconnect());

describe("tenant B can't touch tenant A", () => {
  const asB = () => forTenant(b.id).project;
  it("list", async () => expect((await asB().findMany()).map((p) => p.id)).not.toContain(secret.id));
  it("get by id", async () => expect(await asB().findUnique({ where: { id: secret.id } })).toBeNull());
  it("count", async () => expect(await asB().count({ where: { id: secret.id } })).toBe(0));
  it("update", async () => expect(asB().update({ where: { id: secret.id }, data: { name: "x" } })).rejects.toThrow());
  it("updateMany", async () => expect((await asB().updateMany({ where: { id: secret.id }, data: { name: "x" } })).count).toBe(0));
  it("delete", async () => expect(asB().delete({ where: { id: secret.id } })).rejects.toThrow());
  it("create can't pick another tenant", async () => {
    const p = await asB().create({ data: { name: "y", tenantId: a.id } });
    expect(p.tenantId).toBe(b.id);
  });
  it("A's row is untouched", async () => expect((await prisma.project.findUnique({ where: { id: secret.id } }))?.name).toBe("سر A"));
});`,
          try: R`شغّل الاختبار، وبعدين اكسر الـ extension عمدًا: شيل [[Project]] من [[SCOPED]]، وشغّله تاني. لازم يفشل في أكتر من test. بعدين اكتب نسخة HTTP بـ supertest: يوزر في A ويوزر في B، وكل واحد يحاول [[GET]] و [[PATCH]] و [[DELETE]] على [[/projects/:id]] بتاع التاني، والمتوقع 404 في كل حالة.`,
          flag: "script",
          deep: {
            why: "التسريب بين الـ tenants مش بيبان في الاستخدام العادي: كل عميل بيشوف داتاه وبس، لحد ما حد يغيّر رقم في الـ URL. والاختبار ده بيعمل الحاجة دي قبل ما عميل يعملها. ولأنه في الـ CI، أي تعديل بيكسر العزل بيتوقف قبل الـ merge، مش بعد ما يوصل للإنتاج.",
            how: R`الاختبار بيضرب القاعدة الحقيقية (قاعدة اختبار منفصلة)، مش mock، لأن اللي بنختبره هو السلوك الحقيقي لـ Prisma والـ extension. والـ slugs فيها [[Date.now()]] عشان الاختبارات متتخبطش في بعض لو اتشغلت كذا مرة من غير تنضيف.

كل عملية ليها توقع مختلف. القراية: null أو قايمة من غيره. التعديل والمسح بالـ unique: error (P2025)، والـ route بيحوّله 404. والـ many: count بـ 0. والإنشاء: الـ tenantId بتاعنا بيكسب. وآخر test بيتأكد إن محدش عدّل حاجة في A فعلًا، لأن ممكن العملية ترمي error بعد ما تكتب.

عشان الاختبار يغطي كل model لوحده، ممكن تلف على [[SCOPED]] وتعمل نفس الـ tests لكل واحد بـ [[describe.each]]. وفيه test يقارن SCOPED بكل الـ models اللي فيها عمود [[tenantId]] (من [[Prisma.dmmf]] أو من information_schema)، فلو حد ضاف model ونسي يضيفه، الاختبار يفشل.

نسخة الـ HTTP بتمسك نوع تاني من الغلط: route بيستخدم [[prisma]] العادي بدل [[req.db]]، أو الـ tenant جاي من الـ body. المصفوفة: لكل route فيه [[:id]]، اعمل الطلب بيوزر من الـ tenant التاني، وتوقع 404. نفس فكرة اختبارات الـ ownership في درس «ownership» بس على مستوى الـ workspace.

ومع RLS: شغّل نفس الاختبار باتصال [[app_user]] وبـ [[prisma]] العادي، والمتوقع صفر صفوف في كل حاجة.`,
            when: "من أول ما تعمل الـ extension، وقبل أول عميل حقيقي. ومع كل model أو route جديد، الاختبار ده بيبقى جزء من definition of done.",
            mistakes: R`اختبار بـ tenant واحد بس (كل حاجة تعدّي). أو mock لـ Prisma فالاختبار بيختبر الـ mock. أو اختبار الـ list بس ونسيان get و update و delete. أو إن الاختبار يتحقق إن العملية فشلت ومش بيتحقق إن الداتا متغيرتش. أو الاختبار يشتغل بالـ superuser فالـ RLS متتختبرش. وفي الانترفيو: «إزاي تتأكد إن مفيش tenant بيشوف داتا التاني؟» — طبقتين (extension و RLS)، واختبار تسريب في الـ CI، و 404 مش 403.`
          },
          teach: R`## اختبار بيعمل اللي المهاجم هيعمله، قبله

الاختبار بيعمل workspaceين ومشروع سري في A، وبعدين من client B بيحاول يقرا ويعدّ ويعدّل ويمسح وينشئ في A، ويتأكد إن كل محاولة فشلت وإن المشروع زي ما هو. جربناه بـ Vitest 5 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24) بـ [[forTenant]] من درس الـ extension، وجربنا نسخة الـ HTTP (الـ solCode) بـ supertest على app صغير فيه routes [[/projects/:id]].

> التجهيز في النسخة القديمة كان بيعمل المشروع السري بـ [[forTenant(a.id)]] نفسه. لما كسرنا الـ extension زي ما الـ [[try]] بيقول، الـ [[beforeAll]] هو اللي وقع ([[Argument tenant is missing]]) والـ ٨ اختبارات اتعملهم skip، فمش باين أنهي حماية اتكسرت. غيّرناه لـ [[prisma.project.create({ data: { name, tenantId: a.id } })]]: التجهيز ميعتمدش على الحاجة اللي بنختبرها.

---

## ١. [[import { describe, it, expect, beforeAll, afterAll } from "vitest";]]

- [[describe(اسم, fn)]]: مجموعة اختبارات.
- [[it(اسم, fn)]]: اختبار واحد، بيفشل لو حاجة جواه رمت.
- [[expect(قيمة).toBe(...)]]: مقارنة.
- [[beforeAll]] / [[afterAll]]: بيشتغلوا مرة قبل وبعد كل الاختبارات.

---

## ٢. التجهيز

### [[a = await prisma.workspace.create({ data: { name: "A", slug: "a-" + Date.now() } });]]

[[Date.now()]] في الـ slug (عليه [[@unique]]) عشان تشغّل الاختبار كذا مرة على نفس القاعدة من غير تصادم.

### [[afterAll(() => prisma.$disconnect());]]

يقفل الاتصالات، وإلا Vitest ممكن يفضل مستني.

---

## ٣. [[const asB = () => forTenant(b.id).project;]]

دالة بترجع الـ model من client B. كل اختبار بيبدأ بيها.

## ٤. الاختبارات واحد واحد

| الاختبار | الكود | المتوقع |
|---|---|---|
| list | [[(await asB().findMany()).map((p) => p.id)]] + [[.not.toContain(secret.id)]] | قايمة B مفيهاش id السر |
| get by id | [[findUnique({ where: { id: secret.id } })]] + [[.toBeNull()]] | [[null]] |
| count | [[count({ where: { id: secret.id } })]] + [[.toBe(0)]] | صفر |
| update | [[expect(promise).rejects.toThrow()]] | يرمي ([[P2025]]) |
| updateMany | [[(...).count]] + [[.toBe(0)]] | مفيش صفوف اتعدلت |
| delete | [[rejects.toThrow()]] | يرمي |
| create | [[create({ data: { name: "y", tenantId: a.id } })]] ثم [[p.tenantId]] = [[b.id]] | اتعمل في B |
| A's row | [[prisma.project.findUnique(...)?.name]] = [["سر A"]] | محدش لمسه |

[[rejects]] بتستنى الـ promise وتتأكد إنه **فشل**. ولاحظ إن [[expect(asB().update(...))]] من غير [[await]] جوه، عشان الـ promise نفسه يوصل لـ [[expect]].

وآخر اختبار بالـ client العادي، لأن عملية ممكن ترمي error **بعد** ما كتبت.

---

## ٥. النتيجة

~~~text الناتج (الـ extension سليم)
Test Files  1 passed (1)
     Tests  8 passed (8)
  Duration  1.10s
~~~

وشلنا [[Project]] من [[SCOPED]]:

~~~text الناتج
× list
× get by id
× count
× update
× updateMany
× delete
× create can't pick another tenant
× A's row is untouched
AssertionError: expected [ …(5) ] to not include '406488d9-...'
AssertionError: expected { …(3) } to be null
AssertionError: expected 1 to be +0 // Object.is equality
AssertionError: promise resolved "{ …(3) }" instead of rejecting
AssertionError: expected 1 to be +0 // Object.is equality
AssertionError: promise resolved "{ …(3) }" instead of rejecting
AssertionError: expected 'b766...' to be 'c44d...' // Object.is equality
AssertionError: expected undefined to be 'سر A' // Object.is equality
     Tests  8 failed (8)
~~~

كل حماية ليها رسالة: [[promise resolved instead of rejecting]] يعني الـ update عدّى على مشروع A، و [[expected undefined to be 'سر A']] يعني الـ delete مسحه فعلًا.

---

## ٦. الـ solCode: نسخة HTTP

### [[describe.each(["get", "patch", "delete"])("%s /projects/:id across tenants", (method) => { ... })]]

[[describe.each(array)]] بيكرر نفس المجموعة لكل قيمة، و [[%s]] في الاسم بيتبدل بيها. يعني ٣ اختبارات من كود واحد.

### [[request(app)[method](...)]]

[[request(app)]] من supertest بيبعت للـ app من غير بورت. و [[[method]]] بيختار الدالة بالاسم: [[request(app)["delete"]]] = [[request(app).delete]].

- [[.set("Host", b.slug + ".myapp.test")]]: الطلب كأنه جاي من subdomain بتاع B (درس الدومينات).
- [[.set("Authorization", "Bearer " + tokenOfUserInB)]]: يوزر عضو في B بس.
- [[.send({ name: "x" })]]: الـ body (للـ patch).

~~~text الناتج
Tests  3 passed (3)
~~~

وكسرنا route الـ delete يستخدم [[prisma]] العادي بدل [[req.db]]:

~~~text الناتج
FAIL  test/http.test.ts > delete /projects/:id across tenants > returns 404 for a project in another workspace
AssertionError: expected 204 to be 404 // Object.is equality
Tests  1 failed | 2 passed (3)
~~~

مستخدم من B مسح مشروع A، والاختبار مسك الـ route بالاسم.

---

## الخلاصة

- tenantين على الأقل، وقاعدة حقيقية مش mock.
- التجهيز بالـ client العادي، والاختبار بالمقفول.
- كل نوع عملية ليه توقع: null أو صفر أو throw أو الـ tenant بتاعنا.
- آخر اختبار بيتأكد إن الداتا متغيرتش، مش بس إن العملية فشلت.
- نسخة HTTP لكل route فيه [[:id]]، و 404 مش 403.`,
          lines: [
            "أدوات Vitest.",
            "الـ client العادي، والـ client المقفول على tenant.",
            "workspaceين ومشروع سري.",
            "قبل كل الاختبارات:",
            "workspace A.",
            "workspace B.",
            "مشروع في A بالـ client العادي: التجهيز ميعتمدش على الـ extension اللي بنختبره، عشان لو اتكسر الاختبارات تفشل واحد واحد مش التجهيز.",
            "قفلة.",
            "في الآخر اقفل الاتصال.",
            "مجموعة الاختبارات:",
            "client مقفول على B.",
            "قايمة B مفيهاش مشروع A.",
            "get بالـ id من B يرجع null.",
            "count يرجع صفر.",
            "update بالـ id يرمي (P2025).",
            "updateMany ميعدّلش حاجة.",
            "delete بالـ id يرمي.",
            "create من B...",
            "...وفي الـ data الـ tenantId بتاع A صريح...",
            "...يتعمل في B برضه.",
            "قفلة.",
            "ومشروع A زي ما هو، بالـ client العادي.",
            "قفلة."
          ],
          sol: R`النتيجة المتوقعة مع الـ extension سليم: [[8 passed]]. لما تشيل Project من SCOPED: الـ ٨ كلهم يفشلوا ([[8 failed]])، حتى [[create can't pick another tenant]] (المشروع اتعمل في A) و [[A's row is untouched]] (الـ delete مسحه). ده بالظبط اللي عايزه: الاختبار بيمسك الغلطة.

نسخة الـ HTTP (الـ solCode): كل الطلبات ترجع 404. لو واحد رجع 200 أو 204، يبقى الـ route ده بيستخدم [[prisma]] العادي. ولو رجع 403، يبقى بيقول للمهاجم إن الـ id موجود.`,
          solCode: R`import request from "supertest";
import { app } from "../src/app.js";

describe.each(["get", "patch", "delete"])("%s /projects/:id across tenants", (method) => {
  it("returns 404 for a project in another workspace", async () => {
    const res = await request(app)[method]($__bt/projects/$__{secret.id}$__bt)
      .set("Host", $__bt$__{b.slug}.myapp.test$__bt)
      .set("Authorization", $__btBearer $__{tokenOfUserInB}$__bt)
      .send({ name: "x" });
    expect(res.status).toBe(404);
  });
});`
        }
      ]
    }
]);
