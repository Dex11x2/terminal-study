// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "اللغات والأدمن والبحث والـ jobs",
      l: 2,
      n: "عربي وإنجليزي بجد، ولوحة تحكم متسجّل فيها كل حاجة، وقوايم كبيرة بسرعة، وشغل تقيل في الخلفية",
      items: [
        {
          cmd: "i18n و RTL",
          title: "عربي وإنجليزي من القاعدة للشاشة",
          desc: R`الترجمة مش ملفين JSON وخلاص. اللغة بتبدأ من الـ URL ([[/ar/courses]])، والسيرفر هو اللي بيحط [[lang]] و [[dir]] على [[<html>]] عشان الاتجاه ميترعشش وقت التحميل. والنصوص بتيجي من [[messages/ar.json]] و [[en.json]]، والـ CSS بيبقى logical ([[ms-4]] بدل [[ml-4]]). ومحتوى القاعدة نفسه (اسم الكورس ووصفه) بيتخزن باللغتين.

في Next.js 16 مع next-intl، الـ routing بيتعمل في [[proxy.ts]] بـ [[createMiddleware(routing)]]. التفاصيل في تاب «Next.js»، والـ CSS في تاب «HTML و CSS».`,
          example: R`import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}`,
          try: R`اعمل الـ layout ده، وحط في صفحة كارت فيه صورة على الشمال ونص وسهم. اكتبه مرة بـ [[ml-4]] و [[text-left]] وبص عليه بالعربي، وبعدين بـ [[ms-4]] و [[text-start]] و [[rtl:rotate-180]] للسهم. بعدين اعمل reload للصفحة العربي، ولاحظ إنها بتفتح RTL من أول frame.`,
          flag: "script",
          deep: {
            why: "المنتج العربي اللي معمول إنجليزي وبعدين «اتقلب» بيبان على طول: أسهم بالعكس، ومسافات في المكان الغلط، وأرقام مقلوبة، وصفحة بتترعش من LTR لـ RTL كل مرة تفتح. واللغة لو مش في الـ URL، جوجل مبيشوفش غير لغة واحدة.",
            how: R`الاتجاه من السيرفر: الـ layout بيطلع HTML فيه [[dir="rtl"]] جاهز، فالمتصفح بيرسم صح من أول مرة. لو بتحطه بـ JavaScript بعد التحميل، الصفحة بتظهر LTR لحظة وبعدين تتقلب.

الـ CSS الـ logical هو اللي بيخلي نفس الكلاسات تشتغل في الاتجاهين. [[ms-4]] يعني margin في بداية السطر، وده شمال في الإنجليزي ويمين في العربي. وبنفس الطريقة [[ps-]] و [[pe-]] و [[text-start]] و [[start-0]]. وفي Tailwind v4 فيه [[rtl:]] للحالات الخاصة زي لف الأسهم.

محتوى القاعدة: لو لغتين بس، عمودين ([[titleAr]] و [[titleEn]]) أبسط حاجة. لو لغات أكتر، عمود JSON أو جدول [[CourseTranslation]]. والـ API بيرجّع اللغة المطلوبة حسب [[?locale=]] أو [[Accept-Language]]. والأسعار والتواريخ بـ Intl: [[new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" })]]. وخد بالك إن [[ar-EG]] بيطلع أرقام عربية (١٢٣)، فقرر عايز أنهي.

الجمع في العربي فيه صيغ كتير (صفر، وواحد، واتنين، وقليل، وكتير). عشان كده متلزقش نصوص ببعض، استخدم رسايل ICU: [[t("courses", { count })]]، وفي الملف [[{count, plural, one {كورس واحد} two {كورسين} few {# كورسات} other {# كورس}}]].

والنص اللي بيكتبه المستخدم ممكن يبقى أي لغة، فاستخدم [[dir="auto"]] عليه. والأرقام والإيميلات جوه نص عربي حطها في [[<bdi>]] أو [[dir="ltr"]]. والإيميلات وأكواد الأخطاء كمان بتتترجم حسب [[user.locale]].`,
            when: "من أول يوم لو المنتج هيبقى بلغتين. إضافة RTL لمشروع فيه ٢٠٠ component مكتوبين بـ ml و mr بتاخد أسابيع.",
            mistakes: R`في مشروع حقيقي، الاتجاه كان بيتحط بـ [[document.documentElement.dir]] من جوه الـ App بعد التحميل، فالصفحة بتترعش. وكان فيه حوالي ٤٣٠ كلاس physical ([[pl-]] و [[mr-]]) قصاد ١١ logical، ومعاهم CSS بـ [[[dir="rtl"]]] بيحاول يصلّح. وفي مشروع تاني حاجة كانت معمولة صح: اختبار في CI بيفشل لو فيه مفتاح في ar.json مش موجود في en.json، أو العكس. اعمله.`
          },
          lines: [
            "الـ provider بتاع next-intl، ودالة بتتأكد إن اللغة مدعومة.",
            "صفحة 404.",
            "اللغات المتاحة واللغة الافتراضية، من routing.ts.",
            "الـ layout اللي في [[app/[locale]/layout.tsx]].",
            "في Next 15 و 16 الـ params بقت Promise، فلازم await.",
            "لغة مش مدعومة؟ 404.",
            "رجّع...",
            "...اللغة والاتجاه على html من السيرفر، فالصفحة بتفتح بالاتجاه الصح من أول لحظة.",
            "الـ body.",
            "الـ provider بيوصّل الرسايل للـ client components.",
            "قفلة body.",
            "قفلة html.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`بـ [[ml-4]] و [[text-left]] الكارت بالعربي بيبوظ: المسافة بتفضل على الشمال بتاع النص بدل ما تبقى بينه وبين الصورة، والنص لازق في الشمال مع إن الصفحة RTL، والسهم بيشاور للناحية الغلط. بـ [[ms-4]] (margin-inline-start) و [[text-start]] كل حاجة بتتقلب لوحدها مع [[dir]]، والسهم بيلف بـ [[rtl:rotate-180]]. والإنجليزي بيفضل زي ما هو في الحالتين.

الـ reload بيفتح RTL من أول frame لأن [[dir="rtl"]] جوه الـ HTML اللي جاي من السيرفر، مش بيتحط بـ JavaScript بعد التحميل. اتأكد بـ [[curl -s localhost:3000/ar | head -c 300]]: هتلاقي [[<html lang="ar" dir="rtl">]] في أول الرد.

لو شفت الصفحة بتتقلب من LTR لـ RTL بعد ثانية، يبقى انت بتحط الـ dir في [[useEffect]] أو في client component. ولو لغة مش مدعومة فتحت صفحة بدل 404، يبقى [[hasLocale]] مش متنادي في الـ layout.`,
          solCode: R`import { useTranslations } from "next-intl";

export function CourseCard({ course }) {
  const t = useTranslations("courses");
  return (
    <a href={"/courses/" + course.slug} className="flex items-center rounded-lg border p-3">
      <img src={course.coverUrl} alt="" className="h-16 w-16 rounded object-cover" />
      <div className="ms-4 flex-1 text-start">
        <h3 className="font-bold">{course.title}</h3>
        <p className="text-sm text-gray-500">{t("lessons", { count: course.lessonsCount })}</p>
      </div>
      <span aria-hidden className="rtl:rotate-180">→</span>
    </a>
  );
}`
        },
        {
          cmd: "لوحة الأدمن",
          title: "لوحة تحكم آمنة، وكل حاجة فيها متسجّلة",
          desc: R`لوحة الأدمن هي أقوى باب في النظام، فبتتحمى على مستوى الـ router كله مرة واحدة، مش route بـ route. وكل فعل مهم فيها (استرداد، أو تغيير دور، أو مسح) بيتسجّل في audit log: مين عمل إيه، وإمتى، وليه.

والمثال استرداد طلب: البوابة، وبعدين تحديث الطلب، وشيل الاشتراك، وتسجيل الفعل، والتلاتة الأخيرين في transaction واحدة.`,
          example: R`const admin = express.Router();
admin.use(requireAuth, requireFreshRole("ADMIN"));
admin.post("/orders/:id/refund", async (req, res) => {
  const { reason } = Refund.parse(req.body);
  const order = await db.order.findUniqueOrThrow({ where: { id: req.params.id } });
  if (order.status !== "PAID") throw new AppError(409, "NOT_PAID", "الطلب ده مش مدفوع");
  await paymob.refund(order.gatewayTxId, order.amountCents);
  await db.$transaction([
    db.order.update({ where: { id: order.id }, data: { status: "REFUNDED" } }),
    db.enrollment.delete({ where: { userId_courseId: { userId: order.userId, courseId: order.courseId } } }),
    db.auditLog.create({ data: { actorId: req.user.id, action: "order.refund", targetId: order.id, meta: { reason } } }),
  ]);
  res.status(204).end();
});
app.use("/admin", admin);`,
          try: R`اعمل صفحة في اللوحة بتعرض آخر ٥٠ سطر من الـ audit log: مين، وعمل إيه، وعلى إيه، وإمتى. اعمل استرداد تجربة وشوفه ظهر. بعدين شيل دور الأدمن من مستخدم وهو داخل، وجرّب طلب تاني منه، ولازم يترفض فورًا.`,
          flag: "script",
          deep: {
            why: "أي حد يوصل لحساب أدمن يقدر يعمل أي حاجة. ولما فلوس تتحرك أو داتا تتمسح، أول سؤال بيبقى «مين عمل كده؟». من غير audit log، مفيش إجابة.",
            how: R`[[admin.use]] على الـ router بيخلي كل route تحته محمي، فمفيش route هيتنسي. و [[requireFreshRole]] بتقرا الدور من القاعدة مع كل طلب بدل ما تثق في التوكن. طلب زيادة للقاعدة، بس أدمن اتشالت صلاحيته بيتقفل فورًا مش بعد ربع ساعة. وفي مشروع حقيقي كان فيه guard بيعمل كده بالظبط، وبيتأكد كمان إن الحساب لسه active.

[[findUniqueOrThrow]] بترمي P2025 لو مش موجود، والـ error handler بيحوّلها 404. والاسترداد عند البوابة بيحصل الأول، لأن لو فشل مفيش حاجة تتغير عندنا. ولهذا كنا بنخزن [[gatewayTxId]]: البوابة محتاجاه عشان تعمل الاسترداد.

الـ audit log جدول بتضيف فيه بس، محدش بيعدّل أو يمسح منه. فيه: الفاعل، والفعل، والهدف، وتفاصيل (JSON)، والـ IP، والوقت. ويتعرض في اللوحة نفسها.

ولوحة الأدمن محتاجة حماية زيادة عن باقي الموقع: 2FA (TOTP) لحسابات الأدمن، وسبب إجباري للأفعال الخطيرة، وتأكيد قبل المسح. ولو تقدر، subdomain لوحده زي [[admin.example.com]]، وممكن تقفله على IPs معينة. وأي ميزة «ادخل كأنك المستخدم ده» (impersonation) لازم تتسجّل.

الواجهة ممكن تتبني بجداول جاهزة (TanStack Table مع shadcn). وفي الـ MVP، صفحتين بسيطين للكورسات والطلبات كفاية.`,
            when: "من الـ MVP. الأدمن محتاج يشوف الطلبات ويحل مشاكل الدفع من أول يوم.",
            mistakes: R`في مشروع حقيقي، الدخول للوحة كان بباسورد أدمن واحد مشترك في متغير بيئة. ونفس الباسورد ده كان المفتاح اللي بيوقّع توكنات الأدمن. يعني مفيش logout حقيقي، ومفيش طريقة تعرف مين من الفريق عمل إيه، ولو الباسورد اتغير كل التوكنات بتبوظ مع بعض. الصح إن كل أدمن يبقى ليه حساب، والسر يبقى حاجة منفصلة. ومن الغلطات كمان: جداول الأدمن من غير pagination، وفي مشروع كان فيه [[take: 200]] من غير صفحات، فالمستخدم رقم ٢٠١ مكانش بيظهر خالص ومحدش واخد باله.`
          },
          lines: [
            "router للأدمن لوحده.",
            "حماية على الـ router كله: داخل، ودوره أدمن من القاعدة دلوقتي مش من التوكن.",
            "استرداد طلب.",
            "السبب إجباري.",
            "هات الطلب، ولو مش موجود 404.",
            "لازم يكون مدفوع أصلًا.",
            "الاسترداد عند البوابة الأول. لو فشل، ولا حاجة عندنا بتتغير.",
            "التلاتة مع بعض أو ولا واحد:",
            "الطلب بقى REFUNDED.",
            "الاشتراك اتشال.",
            "وسجل: مين، وعمل إيه، وعلى إيه، وليه.",
            "قفلة الـ transaction.",
            "رد 204.",
            "قفلة.",
            "ركّب الـ router على /admin."
          ],
          sol: R`الصفحة لازم تعرض آخر ٥٠ سطر الأحدث فوق، وبعد الاسترداد التجريبي يظهر في الأول سطر زي: «admin@myapp.com — order.refund — cmun8kedf… — من دقيقة»، والسبب ظاهر من [[meta.reason]]. ولو اتنين حاولوا يستردوا نفس الطلب، التاني هيرجع [[409 NOT_PAID]] لأن الـ status بقى REFUNDED.

لما تشيل دور الأدمن من مستخدم وهو داخل، أول طلب بعدها يرجع [[403]] على طول، حتى لو الـ access token بتاعه لسه فاضله ١٤ دقيقة وجواه [[role: "ADMIN"]]. ده شغل [[requireFreshRole]]: بتقرا الدور من القاعدة مع كل طلب. لو استخدمت [[requireRole]] العادي، هيفضل أدمن لحد ما التوكن يخلص، وده بالظبط اللي التجربة بتكشفه.

ومتنساش إن endpoint قراية الـ audit log نفسه تحت [[/admin]]، فهو محمي بنفس الـ guard. وخليه قراية بس: مفيش endpoint يعدّل أو يمسح سطر في الـ audit log.`,
          solCode: R`export function requireFreshRole(role) {
  return async (req, res, next) => {
    const u = await db.user.findUnique({ where: { id: req.user.id }, select: { role: true } });
    if (u?.role !== role) return next(new AppError(403, "FORBIDDEN", "مش مسموحلك"));
    next();
  };
}

admin.get("/audit-logs", async (req, res) => {
  const rows = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { id: true, action: true, targetId: true, meta: true, createdAt: true, actor: { select: { email: true } } },
  });
  res.json({ data: rows });
});`
        },
        {
          cmd: "بحث وفلترة",
          title: "من خانة البحث في الـ URL لـ where في القاعدة",
          desc: R`الفلاتر بتيجي في الـ query string ([[?q=react&level=BEGINNER&sort=newest]]). Zod بيتأكد منها ويحوّلها لأنواع صح، وبعدين بتتبني منها [[where]] قطعة قطعة. والترتيب بيبقى من قايمة ثابتة، مش اسم عمود جاي من برّه.

وفي الواجهة، الفلاتر تفضل في الـ URL، عشان اللينك يتبعت لحد ويفتح بنفس النتيجة، وزرار back يشتغل.`,
          example: R`const CourseQuery = z.object({
  q: z.string().trim().max(100).optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  sort: z.enum(["newest", "price_asc", "popular"]).default("newest"),
});
const SORTS = { newest: { createdAt: "desc" }, price_asc: { priceCents: "asc" }, popular: { enrollCount: "desc" } };
router.get("/courses", async (req, res) => {
  const f = CourseQuery.parse(req.query);
  const where = {
    published: true,
    ...(f.q && { OR: [{ title: { contains: f.q, mode: "insensitive" } }, { summary: { contains: f.q, mode: "insensitive" } }] }),
    ...(f.level && { level: f.level }),
  };
  res.json({ data: await db.course.findMany({ where, orderBy: [SORTS[f.sort], { id: "desc" }], take: 20 }) });
});`,
          try: R`جرّب [[?sort=passwordHash]] و [[?level=HACKER]]. الاتنين لازم يرجعوا 400. بعدين اعمل ١٠٠ ألف كورس بـ seed، وقيس وقت [[?q=react]] قبل وبعد index الـ trigram (الـ deep بيشرحه).`,
          flag: "script",
          deep: {
            why: "البحث والفلترة أكتر حاجة بتاخد input حر من المستخدم وبتحطه في query. لو اتعمل غلط، يا إما ثغرة (injection أو ترتيب بعمود سري)، يا إما صفحة بطيئة أول ما الداتا تكبر.",
            how: R`[[z.enum]] للمستوى والترتيب معناها إن أي قيمة مش في القايمة بترجع 400. وفي الترتيب، الـ client بيختار اسم («newest»)، والسيرفر بيحوّله لـ orderBy من القايمة. عمره ما اسم العمود نفسه بييجي من برّه. و [[{ id: "desc" }]] في الآخر بيخلي الترتيب ثابت لما قيمتين يتساووا، ودي مهمة جدًا للـ pagination.

[[contains]] مع [[mode: "insensitive"]] بتتحوّل [[ILIKE '%react%']]، والـ index العادي (btree) مش بيقدر يساعد فيها لأن فيه % في الأول. أول ما الجدول يكبر، في PostgreSQL فيه extension اسمه pg_trgm: [[CREATE INDEX ... USING gin (title gin_trgm_ops)]]، ونفسه على [[summary]]، لأن الـ OR محتاج index على العمودين عشان القاعدة تستخدمهم مع بعض (BitmapOr). وبعدها ILIKE بيستخدم الـ indexes.

ولو محتاج بحث حقيقي، بترتيب حسب الأهمية ومرادفات، فيه full-text search في Postgres ([[tsvector]] و GIN). والعربي هنا محتاج تطبيع الهمزات والتاء المربوطة قبل الحفظ. وخطوة أكبر من كده: Meilisearch أو Typesense، بيستحملوا الأخطاء الإملائية وبيدعموا العربي كويس، وبيتحدّثوا من القاعدة عن طريق job.

و [[enrollCount]] عمود محسوب مسبقًا، بيزيد مع كل اشتراك، بدل ما تعد الاشتراكات مع كل بحث.

وفي الواجهة: debounce حوالي ٣٠٠ ملّي ثانية على خانة البحث، والفلاتر بتتقري من [[searchParams]]. وفي Next 16 الـ searchParams بقت Promise في props الصفحة. التفاصيل في «Next.js»، والـ indexes في «SQL و Prisma» و «PostgreSQL».`,
            when: "أي قايمة المستخدم بيفلترها. ابدأ بـ ILIKE، ولما الجدول يعدّي عشرات الآلاف ضيف trigram، ولما تحتاج بحث ذكي خش على full-text أو Meilisearch.",
            mistakes: R`في مشروع حقيقي، البحث كان بيبني فلتر PostgREST بنص فيه كلام المستخدم مباشرة: [[.or($__btfull_name.ilike.%$__{query}%,email.ilike.%$__{query}%$__bt)]]. المستخدم ممكن يكتب فاصلة وفلتر من عنده، ويغيّر معنى الـ query. ده injection بشكل تاني. الصح إنك تهرب القيمة، أو تستخدم دوال المكتبة المنفصلة لكل عمود، أو RPC. ومن الغلطات كمان: [[orderBy: { [req.query.sort]: "asc" }]]. أو [[take]] من غير حد أقصى. أو بحث case-sensitive فـ «React» ميلاقيش «react».`
          },
          lines: [
            "شكل الفلاتر المسموحة.",
            "كلمة البحث: من غير مسافات على الأطراف، و ١٠٠ حرف بالكتير.",
            "المستوى من قايمة ثابتة.",
            "الترتيب من ٣ اختيارات، والافتراضي الأحدث.",
            "قفلة.",
            "كل اختيار ترتيب وتحويله، والـ client عمره ما بيبعت اسم عمود.",
            "مسار القايمة العامة.",
            "اتأكد من الفلاتر. أي قيمة غريبة ترجع 400.",
            "ابني الشرط:",
            "المنشور بس.",
            "لو فيه بحث: في العنوان أو الملخص، من غير فرق بين الحروف الكبيرة والصغيرة.",
            "لو فيه مستوى: فلتر بيه.",
            "قفلة الشرط.",
            "رجّع ٢٠، بالترتيب المختار، و id في الآخر عشان الترتيب يبقى ثابت.",
            "قفلة."
          ],
          sol: R`[[?sort=passwordHash]] بيرجع [[400]] و [[{"error":{"code":"VALIDATION",...,"details":[{"code":"invalid_value","path":["sort"],...}]}}]]، ونفس الكلام لـ [[?level=HACKER]] بس الـ path [[level]]. الـ enum هو اللي منع إن أي حد يرتّب بعمود مش مسموح أو يبعت قيمة القاعدة متعرفهاش.

الـ trigram: جربنا على ١٠٠ ألف كورس. من غير index الـ plan كان [[Seq Scan on courses]] والوقت حوالي [[158 ms]]. بعد الـ indexes على [[title]] و [[summary]] بقى [[BitmapOr]] فوقه [[Bitmap Index Scan]] على كل index، والوقت أقل من [[1 ms]]. الأرقام بتختلف حسب جهازك، بس الفرق لازم يبقى عشرات أو مئات المرات.

لو الـ plan لسه Seq Scan بعد الـ index: اتأكد إنك عملت [[CREATE EXTENSION pg_trgm]]، وإن الـ index على العمودين مش واحد بس (الـ OR محتاج الاتنين)، وشغّل [[ANALYZE]]. وعلى جدول صغير أوي القاعدة ممكن تختار Seq Scan عن قصد لأنه أسرع فعلًا.`,
          solCode: R`-- seed: ١٠٠ ألف كورس
INSERT INTO "Course" (id, slug, title, summary, "priceCents", published, level, "instructorId", "createdAt")
SELECT 'c' || g, 'course-' || g, 'Course ' || g || ' ' || (ARRAY['Python','Go','React','SQL'])[1 + g % 4],
       'Learn ' || md5(g::text), 50000, true, 'BEGINNER', 'INSTRUCTOR_ID', now()
FROM generate_series(1, 100000) g;
ANALYZE "Course";

EXPLAIN ANALYZE SELECT * FROM "Course"
WHERE published AND (title ILIKE '%react%' OR summary ILIKE '%react%')
ORDER BY "createdAt" DESC, id DESC LIMIT 20;

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX course_title_trgm ON "Course" USING gin (title gin_trgm_ops);
CREATE INDEX course_summary_trgm ON "Course" USING gin (summary gin_trgm_ops);
ANALYZE "Course";
-- وشغّل نفس الـ EXPLAIN ANALYZE تاني`
        },
        {
          cmd: "pagination",
          title: "صفحة ورا صفحة من غير ما القاعدة تتعب",
          desc: R`فيه طريقتين. offset ([[?page=37]]) بيقول للقاعدة «فوّت ٧٢٠ صف وهات ٢٠». وcursor ([[?cursor=abc]]) بيقول «هات ٢٠ بعد الصف ده». الـ cursor سرعته ثابتة مهما عمقت، ومبيكررش ولا بيفوّت عناصر لو فيه حاجات جديدة اتضافت. وده المناسب للـ infinite scroll والـ APIs. أما الـ offset فمناسب لجداول الأدمن اللي فيها أرقام صفحات.`,
          example: R`router.get("/me/orders", requireAuth, async (req, res) => {
  const { cursor, limit } = Page.parse(req.query);
  const rows = await db.order.findMany({
    where: { userId: req.user.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });
  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  res.json({ data: items, nextCursor: hasMore ? items.at(-1).id : null });
});`,
          try: R`اعمل ١٠٠ طلب بـ seed، واجيب أول صفحة. اعمل طلب جديد، وبعدين اجيب الصفحة التانية بالـ cursor: مفيش ولا عنصر اتكرر. اعمل نفس التجربة بـ offset ([[skip: 20]]) ولاحظ إن آخر عنصر في الصفحة الأولى طلع تاني في أول الصفحة التانية.`,
          flag: "script",
          deep: {
            why: "القايمة اللي بترجع كل حاجة مرة واحدة شغالة كويس بـ ٥٠ صف، وبتقع بـ ٥٠ ألف. والـ offset بيبطأ كل ما تعمق، لأن القاعدة لازم تقرا كل الصفوف اللي قبل وترميها.",
            how: R`[[OFFSET 10000 LIMIT 20]] معناها إن القاعدة بتقرا ١٠٠٢٠ صف وترمي ١٠٠٠٠. والـ cursor (اسمه كمان keyset) بيتحوّل لشرط زي [[WHERE (createdAt, id) < (آخر وقت, آخر id)]]، والـ index على [[(userId, createdAt)]] بيوصل للمكان ده على طول. يعني الصفحة رقم ١٠٠٠ بنفس سرعة الأولى.

Prisma بتعمل ده بـ [[cursor]] و [[skip: 1]]. الـ skip هنا عشان تفوّت صف الـ cursor نفسه، لأنه كان آخر صف في الصفحة اللي قبل.

[[take: limit + 1]] حيلة صغيرة: بتطلب صف زيادة. لو جه، يبقى فيه صفحة بعد كده، وبترجّع [[nextCursor]]. من غير ما تعمل count، والـ count على جدول كبير غالي.

الـ Page schema: [[z.object({ cursor: z.string().optional(), limit: z.coerce.number().int().min(1).max(50).default(20) })]]. الحد الأقصى ٥٠ بيمنع حد يطلب مليون صف.

عيب الـ cursor إنك متقدرش تنط لصفحة ٣٧، ومفيش «من ١٢٠٠٠». في جداول الأدمن، offset مع count مقبول طول ما الداتا مش ضخمة. وفي الواجهة، [[useInfiniteQuery]] من TanStack Query بيتعامل مع [[nextCursor]] لوحده (تاب «React»).`,
            when: "أي قايمة ممكن تكبر: طلبات، وإشعارات، ورسايل، وكورسات. من أول يوم، لأن تغيير شكل الـ API بعدين بيكسر الواجهة.",
            mistakes: R`في المشاريع الحقيقية اللي راجعناها كان فيه offset بس، ومفيش cursor خالص. وفيه قوايم أدمن بـ [[take: 200]] من غير أي صفحات، فالنتايج بتتقص من غير ما حد يلاحظ. ومن الغلطات كمان: ترتيب بعمود مش unique لوحده (createdAt بس)، فصفين بنفس الوقت ممكن واحد فيهم يتكرر أو يتفوّت. أو [[limit]] من غير حد أقصى.`
          },
          lines: [
            "طلباتي، صفحة صفحة.",
            "الـ cursor (اختياري) والعدد (من ١ لـ ٥٠).",
            "هات...",
            "...طلبات المستخدم ده بس...",
            "...بالأحدث، و id عشان الترتيب يبقى ثابت...",
            "...وصف زيادة عشان نعرف فيه صفحة بعد كده ولا لأ...",
            "...ولو فيه cursor، ابدأ بعده وفوّته هو نفسه.",
            "قفلة.",
            "الصف الزيادة جه؟ يبقى فيه كمان.",
            "رجّع العدد المطلوب بس.",
            "الـ cursor الجاي هو آخر id، أو null لو خلصت.",
            "قفلة."
          ],
          sol: R`بالـ cursor: جربناها بـ ١٠٠ طلب، وأخدنا الصفحة الأولى (٢٠)، وضفنا طلب جديد، وبعدين الصفحة التانية. أول عنصر في التانية كان اللي بعد آخر عنصر في الأولى على طول، وعدد العناصر المكررة [[0]]. الطلب الجديد مظهرش، لأنه أحدث من الصفحة الأولى، وهيظهر لما المستخدم يعمل refresh من الأول.

بالـ offset ([[skip: 20]]): الطلب الجديد زق كل حاجة خطوة لتحت، فأول عنصر في الصفحة التانية طلع هو نفسه آخر عنصر في الأولى، والمكرر [[1]]. ولو كان اتمسح طلب بدل ما يتضاف، كان هيحصل العكس: عنصر يقع بين الصفحتين ومحدش يشوفه.

لو لقيت تكرار بالـ cursor كمان، غالبًا نسيت [[skip: 1]] (فالـ cursor نفسه بيرجع أول عنصر)، أو الترتيب [[createdAt]] بس من غير [[id]]، فطلبين بنفس الوقت بالظبط ترتيبهم بيتغير من استعلام للتاني.`,
          solCode: R`// src/page-test.ts: npx tsx src/page-test.ts
const u = await db.user.findFirstOrThrow();
const c = await db.course.findFirstOrThrow();
const t0 = Date.now() - 1e6;
await db.order.createMany({ data: Array.from({ length: 100 }, (_, i) => ({ userId: u.id, courseId: c.id, amountCents: 100 + i, createdAt: new Date(t0 + i * 1000) })) });

const orderBy = [{ createdAt: "desc" }, { id: "desc" }];
const page1 = (await db.order.findMany({ where: { userId: u.id }, orderBy, take: 21 })).slice(0, 20);
await db.order.create({ data: { userId: u.id, courseId: c.id, amountCents: 999 } });

const byCursor = (await db.order.findMany({ where: { userId: u.id }, orderBy, take: 21, cursor: { id: page1.at(-1).id }, skip: 1 })).slice(0, 20);
const byOffset = await db.order.findMany({ where: { userId: u.id }, orderBy, take: 20, skip: 20 });

const seen = new Set(page1.map((o) => o.id));
console.log("cursor dupes:", byCursor.filter((o) => seen.has(o.id)).length); // 0
console.log("offset dupes:", byOffset.filter((o) => seen.has(o.id)).length); // 1`
        },
        {
          cmd: "background jobs",
          title: "الشغل التقيل يتعمل بعد ما ترد على المستخدم",
          desc: R`أي حاجة بطيئة، أو ممكن تفشل وتتعاد، أو مش لازم تحصل قبل الرد، بتروح queue: إيميلات، ومعالجة صور، وتقارير. الـ API بيضيف job ويرد على طول، والـ worker (process لوحده) بياخدها ويشتغل. BullMQ بيخزن الـ queue في Redis، وبيعيدها لو فشلت، بس لو حددت [[attempts]] (على الـ job أو في [[defaultJobOptions]] بتاعة الـ Queue). من غيرها محاولة واحدة بس.

والشغل اللي بيتكرر كل فترة بيتعمل job scheduler في نفس الـ queue، مش setInterval ولا node-cron جوه السيرفر.`,
          example: R`import { Queue } from "bullmq";
import { connection } from "../lib/redis.js";

export const emailQueue = new Queue("emails", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } });
export const maintenance = new Queue("maintenance", { connection });
await emailQueue.add("receipt", { to: user.email, orderId: order.id }, {
  attempts: 5,
  backoff: { type: "exponential", delay: 10_000 },
  removeOnComplete: 1000,
});
await maintenance.upsertJobScheduler("reconcile-payments", { every: 15 * 60_000 }, { name: "reconcile" });`,
          try: R`شغّل Redis بـ Docker، وضيف job بتعمل throw أول مرتين وبعدين تنجح. شوف في اللوج إنها اتعادت بعد ١٠ ثواني، وبعدين ٢٠. بعدين شغّل نسختين من الـ worker، وتأكد إن الـ scheduler بيعمل job واحدة كل مرة، مش اتنين.`,
          flag: "script",
          deep: {
            why: "لو التسجيل بيستنى الإيميل، والإيميل بياخد ٣ ثواني، التسجيل كله بقى بطيء. ولو المزوّد وقع، التسجيل بيفشل. وأي شغل جوه الـ request بيضيع لو السيرفر عمل restart في النص. الـ queue بتفصل «حصل» عن «اتعالج».",
            how: R`الـ API بيكتب الـ job في Redis في ملّي ثواني ويرد. الـ worker في process منفصلة، أو على سيرفر لوحده، بياخد الـ jobs ويشغّلها. ولو الإيميلات اتراكمت، تشغّل worker زيادة من غير ما تلمس الـ API.

[[attempts]] و [[backoff]] الأسّي: لو فشلت، تستنى ١٠ ثواني، وبعدين ٢٠، وبعدين ٤٠. كده لو خدمة واقعة، مش هتضربها بطلبات. والـ jobs اللي فشلت خالص بتفضل محفوظة عشان تشوفها وتعيدها. Bull Board واجهة جاهزة للكلام ده.

الـ queue بتضمن «على الأقل مرة» (at-least-once)، مش «مرة بالظبط». الـ worker ممكن يقع بعد ما يبعت الإيميل وقبل ما يعلّم إنه خلص، فالـ job تتعاد. عشان كده كل job لازم تبقى idempotent: مفتاح idempotency للإيميل، أو تتأكد من الحالة قبل ما تعمل حاجة.

[[upsertJobScheduler]] بيتخزن في Redis. فمهما شغّلت نسخ من الـ worker، كل ميعاد بيطلع job واحدة. و [[every]] بالملّي ثانية، أو [[pattern]] بصيغة cron. والـ job اسمها reconcile بتسأل البوابة عن الطلبات المعلقة (درس الـ webhook).

وحاجات مهمة كمان: ابعت ids في الداتا مش objects كاملة، لأن الداتا ممكن تتغير قبل ما الـ job تشتغل. وخلي queue لكل نوع شغل، عشان ألف صورة متأخرش إيميل استعادة باسورد. ولما السيرفر يقفل، [[await worker.close()]] على SIGTERM عشان الـ job اللي شغالة تخلص.

وفيه بدايل: pg-boss بيشتغل على PostgreSQL من غير Redis، و Inngest و Trigger.dev خدمات جاهزة. والـ queues بتعمق في تاب «APIs متقدمة».`,
            when: "إيميلات، وصور، وفيديو، وتقارير، ومزامنة مع خدمات برّه، وأي حاجة بتتكرر كل فترة.",
            mistakes: R`في مشروعين حقيقيين، الـ cron كان [[node-cron]] جوه process السيرفر. طول ما فيه نسخة واحدة، كله تمام. أول ما تبقى نسختين، كل job بتشتغل مرتين: إيميلات مكررة، ومزامنة مكررة. وفي واحد منهم، مكتبات Redis كانت متسطبة في package.json ومحدش بيستخدمها. ومن الغلطات كمان: إنك تبعت الإيميل جوه الـ request. أو retry فوري من غير backoff. أو job مش idempotent فالإعادة تعمل الحاجة مرتين.`
          },
          lines: [
            "الـ Queue بتاعة BullMQ.",
            "اتصال Redis مشترك من lib/redis.ts.",
            "queue للإيميلات. أي job فيها (زي reset) بتتعاد لحد ٥ مرات افتراضيًا، حتى لو اتضافت من غير options.",
            "queue للشغل الدوري والصيانة.",
            "ضيف job إيصال، بالـ ids مش بالداتا كلها...",
            "...لو فشلت تتعاد لحد ٥ مرات...",
            "...وتستنى ١٠ ثواني، وبعدين ٢٠، وبعدين ٤٠...",
            "...واحتفظ بآخر ١٠٠٠ ناجحة بس.",
            "قفلة.",
            "كل ربع ساعة: راجع الطلبات المعلقة مع البوابة. بيتعمل مرة واحدة مهما كان عدد الـ workers."
          ],
          sol: R`الـ job اللي بتقع أول مرتين: هتشوف في اللوج المحاولة الأولى على طول، والتانية بعد حوالي ١٠ ثواني، والتالتة بعد حوالي ٢٠ ثانية من التانية وتنجح، وبعدها [[completed]]. المعادلة [[delay × 2^(attempt-1)]]. جربناها بـ delay نص ثانية عشان منستناش، والمحاولات جت على [[0s]] و [[0.6s]] و [[1.6s]].

مع نسختين من الـ worker، كل ما الـ scheduler ييجي ميعاده بتتعمل job واحدة بس، وبتشتغل على worker واحد (مرة ده ومرة ده). حتى لو الكود اللي بينادي [[upsertJobScheduler]] اتشغّل مرتين، لأن الـ id ثابت ([[reconcile-payments]])، فالتانية بتحدّث نفس الـ scheduler مش بتعمل واحد جديد.

لو شفت الـ job بتفشل مرة ومتتعادش، يبقى [[attempts]] مش واصل (حطيته في مكان غلط). ولو شفت الـ reconcile بيشتغل مرتين في نفس الميعاد، يبقى عندك [[setInterval]] أو node-cron في مكان تاني، مش الـ scheduler.`,
          solCode: R`import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL, { maxRetriesPerRequest: null });
const q = new Queue("test", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } });
const t0 = Date.now();

new Worker("test", async (job) => {
  console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", job.name, "attempt", job.attemptsMade + 1, "pid", process.pid);
  if (job.name === "flaky" && job.attemptsMade < 2) throw new Error("boom");
}, { connection });

if (process.argv[2] === "seed") {
  await q.add("flaky", {});
  await q.upsertJobScheduler("reconcile-payments", { every: 15_000 }, { name: "reconcile" });
}
// ترمنال ١: node jobs.mjs seed
// ترمنال ٢: node jobs.mjs`
        }
      ]
    },
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
enum Role { OWNER ADMIN MEMBER }`,
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
            "الأدوار جوه الـ workspace."
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

export function forTenant(tenantId) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (!SCOPED.has(model)) return query(args);
          if (operation === "create") args.data = { ...args.data, tenantId };
          else if (operation.startsWith("createMany")) args.data = [args.data].flat().map((d) => ({ ...d, tenantId }));
          else if (operation === "upsert") { args.where = { ...args.where, tenantId }; args.create = { ...args.create, tenantId }; }
          else args.where = { ...args.where, tenantId };
          return query(args);
        },
      },
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

حدود الـ extension اللي لازم تعرفها: الـ nested writes ([[create]] جوه [[project.create({ data: { tasks: { create: [...] } } })]]) مش بتعدّي على الـ extension للـ model الابن، فلازم تحط tenantId بإيدك أو تتجنبها. و [[include]] للعلاقات مش بيتفلتر (بس لو الأب متفلتر والأولاد تبعه، مفيش مشكلة عادة). و [[$queryRaw]] مش بيتلمس خالص. عشان كده RLS في الدرس الجاي كشبكة أمان.

و [[forTenant]] بترجّع client جديد خفيف (مش connection جديد)، فعادي تعمله مع كل طلب.`,
            when: "من أول endpoint في منتج multi-tenant. وخلي الـ lint أو الـ code review يمنع استخدام [[prisma]] العادي في routes الـ tenant، واسمح بيه بس في مكان واضح (زي الأدمن العام والـ jobs).",
            mistakes: R`نسيان model جديد في SCOPED. أو [[{ tenantId, ...args.data }]] بالعكس، فالـ body يكسب. أو استخدام [[prisma]] العادي «مرة واحدة بس» في route. أو الاعتماد على الـ extension مع nested writes. أو إنك تاخد الـ tenantId من الـ body أو الـ query بدل من العضوية المتحقق منها. أو 403 بدل 404 للي مش عضو.`
          },
          lines: [
            "الـ models اللي فيها tenantId وبتتقفل على الـ tenant.",
            "دالة بتعمل client خاص بـ tenant واحد.",
            "extension على الـ client الأساسي...",
            "...بيلف الـ queries...",
            "...على كل الـ models...",
            "...وكل العمليات.",
            "model مش tenant؟ عدّيه زي ما هو.",
            "إنشاء: الـ tenantId بتاعنا فوق أي حاجة في الـ data.",
            "إنشاء كتير: نفس الكلام لكل صف.",
            "upsert: في الـ where وفي الـ create.",
            "أي حاجة تانية (find و update و delete و count...): في الـ where.",
            "نفّذ الـ query بعد التعديل.",
            "قفلة.",
            "قفلة.",
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

الحذف (الـ solCode): MEMBER يحاول يشيل حد → [[403]]. شيل OWNER لما هو الوحيد → [[409 LAST_OWNER]]. شيل عضو من workspace تاني → [[404]] لأن [[req.db]] مش هيلاقيه. والـ ADMIN ميقدرش يشيل OWNER.

الغلطة الشائعة: [[prisma.member.delete]] العادي بدل [[req.db]]، فأدمن workspace يقدر يشيل عضو من workspace تاني لو عرف الـ userId.`,
          solCode: R`router.delete("/members/:userId", tenantScope, requireTenantRole("OWNER", "ADMIN"), async (req, res) => {
  const target = await req.db.member.findFirst({ where: { userId: req.params.userId } });
  if (!target) throw new AppError(404, "NOT_FOUND", "مش موجود");
  if (target.role === "OWNER" && req.member.role !== "OWNER") throw new AppError(403, "FORBIDDEN", "مش مسموح لدورك");
  if (target.role === "OWNER") {
    const owners = await req.db.member.count({ where: { role: "OWNER" } });
    if (owners <= 1) throw new AppError(409, "LAST_OWNER", "لازم يفضل owner واحد على الأقل");
  }
  await req.db.member.deleteMany({ where: { userId: target.userId } });
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
export async function resolveTenant(req, res, next) {
  const host = req.hostname.toLowerCase();
  const slug = host.endsWith("." + config.ROOT_DOMAIN) ? host.slice(0, -(config.ROOT_DOMAIN.length + 1)) : null;
  req.tenant = slug ? await tenantCache.bySlug(slug) : await tenantCache.byDomain(host);
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
            "middleware بيحدد الـ tenant من الدومين.",
            "الدومين من الطلب، small.",
            "لو تحت الدومين الرئيسي، خد الجزء اللي قبله (الـ slug).",
            "بالـ slug أو بالدومين الخاص، من كاش.",
            "مش موجود؟ 404.",
            "كمّل.",
            "قفلة."
          ],
          sol: R`مع [[/etc/hosts]]: [[http://acme.myapp.test:4000]] بيطلّع [[slug = "acme"]] ويجيب الـ workspace بالـ slug، و [[http://learn.acme.test:4000]] مش تحت [[myapp.test]] فبيتدوّر عليه كدومين خاص. أي دومين تالت يرجع [[404 UNKNOWN_TENANT]].

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
  secret = await forTenant(a.id).project.create({ data: { name: "سر A" } });
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
          lines: [
            "أدوات Vitest.",
            "الـ client العادي، والـ client المقفول على tenant.",
            "workspaceين ومشروع سري.",
            "قبل كل الاختبارات:",
            "workspace A.",
            "workspace B.",
            "مشروع في A.",
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
          sol: R`النتيجة المتوقعة مع الـ extension سليم: [[8 passed]]. لما تشيل Project من SCOPED: [[list]] و [[get by id]] و [[count]] و [[update]] و [[updateMany]] و [[delete]] يفشلوا، وكمان [[A's row is untouched]] يفشل (لأن update عدّل الاسم أو delete مسحه، حسب الترتيب). ده بالظبط اللي عايزه: الاختبار بيمسك الغلطة.

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
    },
    {
      t: "الأمان والأداء",
      l: 3,
      n: "قبل الإطلاق: الحماية على مستوى التطبيق كله، والكاش، والاستعلامات البطيئة، وسرعة الصفحة عند الزائر",
      items: [
        {
          cmd: "security baseline",
          title: "طبقات حماية بتتحط مرة واحدة في app.ts",
          desc: R`فيه حماية بتتحط مرة واحدة على التطبيق كله، بالترتيب الصح. headers أمان، و CORS لدومين الواجهة بس، وحد لحجم الـ body، و rate limit على الـ auth، و trust proxy عشان الـ IP الحقيقي يوصل من ورا Nginx. وبعد كده كل ميزة ليها أسئلة أمان خاصة بيها، والـ deep فيه قايمة لميزات المنتج ده.

OWASP والتشيك ليست العامة في تاب «الأمان».`,
          example: R`import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use("/webhooks", webhooksRouter);
app.use(cors({ origin: [config.WEB_ORIGIN], credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use("/auth", rateLimit({ windowMs: 15 * 60e3, limit: 20, standardHeaders: "draft-8", legacyHeaders: false }));
app.use(routes);
app.use(errorHandler);`,
          try: R`ابعت ٢١ طلب login ورا بعض، والأخير لازم يرجع 429. بعدين ابعت طلب من origin تاني بـ [[curl -H "Origin: https://evil.example"]] وبص على الـ headers اللي رجعت. وابعت JSON حجمه ميجا، ولازم يرجع 413.`,
          flag: "script",
          deep: {
            why: "الحماية اللي بتتعمل في كل route لوحده لازم هتتنسي في route. أما اللي على مستوى التطبيق فبتتحط مرة واحدة، وبتحمي أي route جديد لوحدها. وكل ميزة في المنتج بتفتح باب مختلف، ولازم تسأل عليه وانت بتبنيها، مش بعد الإطلاق.",
            how: R`الترتيب مقصود. [[trust proxy]] بـ 1 معناها إن فيه proxy واحد قدامنا (Nginx)، فـ [[req.ip]] بيبقى IP الزائر الحقيقي من X-Forwarded-For. من غيرها، كل الناس هيبقى ليهم IP الـ Nginx، والـ rate limit هيقفل الموقع كله بسبب شخص واحد. والـ webhooks قبل CORS والـ json لأن البوابة سيرفر مش متصفح، ولأن كل بوابة ليها parser خاص (Stripe محتاجة [[express.raw]]).

[[helmet]] بيحط headers زي HSTS، و nosniff، و frame-ancestors. و CORS بقايمة origins محددة مع credentials، ومينفعش [[*]]. و [[limit: "100kb"]] بيمنع حد يبعت JSON بـ ١٠٠ ميجا يملّي الرام. والـ rate limit هنا في الذاكرة، ولما يبقى عندك أكتر من نسخة لازم store في Redis.

وأسئلة الأمان لكل ميزة في المنتج ده:
الـ auth: rate limit، ورسالة واحدة للغلط، والتوكنات فين، والـ reset مرة واحدة.
الدفع: السعر من السيرفر، والـ HMAC، والمبلغ، والحالة الذرية.
الرفع: قايمة أنواع، وحجم حقيقي، و bucket مش public، وممنوع SVG و HTML من المستخدمين.
الـ realtime: التحقق في الـ handshake، والتأكد من العضوية قبل join.
الأدمن: الدور من القاعدة، و 2FA، و audit log.
البحث: validation، وترتيب من قايمة، ومفيش نصوص بتتلزق في query.
المحتوى اللي بيكتبه المستخدم: React بيعمل escape لوحده، والخطر في [[dangerouslySetInnerHTML]] وفي أي داتا بتتحط جوه [[<script>]].`,
            when: "أول ما تعمل app.ts. وراجع قايمة الميزات دي مع كل ميزة جديدة، وقبل الإطلاق مع التشيك ليست في تاب «الأمان».",
            mistakes: R`في مشاريع حقيقية لقينا ٤ غلطات. rate limiter بيثق في أول قيمة في X-Forwarded-For، والقيمة دي أي حد يقدر يكتبها بنفسه ويعدّي الحد. و routes تطوير فضلت في الإنتاج، واحدة بترمي error عن قصد عشان تجرب Sentry (أي حد يقدر يستهلك الكوتة بيها)، وواحدة بتعرض المستخدمين. واسم المستخدم بيتكتب جوه [[<script>]] في الصفحة من غير escape، فأي حد يكتب اسمه كود JavaScript يشتغل عند كل اللي يشوفوه (stored XSS). وتوكن «افتكرني» متخزن في القاعدة زي ما هو، في cookie من غير secure.`
          },
          lines: [
            "headers الأمان.",
            "CORS.",
            "قراية الـ cookies (الـ refresh token).",
            "الـ rate limiter.",
            "التطبيق.",
            "فيه proxy واحد قدامنا (Nginx)، فخد IP الزائر الحقيقي منه.",
            "headers الأمان على كل الردود.",
            "الـ webhooks قبل CORS والـ json، لأن كل بوابة ليها parser خاص.",
            "CORS لدومين الواجهة بس، ومعاه cookies.",
            "JSON لحد ١٠٠ كيلو بس.",
            "اقرا الـ cookies.",
            "٢٠ طلب كل ربع ساعة لكل IP على مسارات الـ auth.",
            "كل الـ routes.",
            "الـ error handler في الآخر خالص."
          ],
          sol: R`الـ login: أول ٢٠ طلب بيرجعوا الرد العادي (401 لو الباسورد غلط)، والـ ٢١ بيرجع [[429]] ومعاه headers زي [[RateLimit: "20-in-15min"; r=0; t=900]] و [[Retry-After: 900]] (ده شكل draft-8). لو كل الطلبات عدّت، اتأكد إن الـ rateLimit متسجّل قبل الـ routes، وإن [[trust proxy]] مظبوط لو ورا Nginx، وإلا كل الناس ليهم نفس الـ IP.

الـ origin الغريب: الطلب بيرجع [[200]] عادي! بس مفيش [[Access-Control-Allow-Origin]] في الرد، فالمتصفح هو اللي بيمنع الصفحة الغريبة إنها تقرا الرد. يعني CORS مش حماية للسيرفر، ده قرار المتصفح. هتلاقي كمان headers الـ helmet زي [[Content-Security-Policy]] و [[Strict-Transport-Security]]، ومفيش [[X-Powered-By]]. ومن [[http://localhost:3000]] هتلاقي [[Access-Control-Allow-Origin: http://localhost:3000]] و [[Access-Control-Allow-Credentials: true]].

الـ JSON الـ ١ ميجا بيرجع [[413]] و [[TOO_LARGE]]. لو رجع 500، يبقى الـ errorHandler بتاعك مش بيتعامل مع [[err.type === "entity.too.large"]] (السطر ده موجود في درس «شكل الأخطاء»)، والـ body parser رمى خطأ الـ handler مش فاهمه.`,
          solCode: R`for i in $(seq 1 21); do
  curl -s -o /dev/null -w '%{http_code} ' -H "Content-Type: application/json" -d '{"email":"a@b.c","password":"x"}' localhost:4000/auth/login
done; echo
# 401 401 ... 401 429

curl -s -D - -o /dev/null -H "Origin: https://evil.example" localhost:4000/courses

node -e 'process.stdout.write(JSON.stringify({ x: "a".repeat(1e6) }))' > big.json
curl -s -w ' %{http_code}\n' -H "Content-Type: application/json" --data-binary @big.json localhost:4000/courses
# {"error":{"code":"TOO_LARGE",...}} 413`
        },
        {
          cmd: "طبقات الكاش",
          title: "كل طلب يتخدم من أقرب مكان ممكن",
          desc: R`الكاش ليه طبقات. المتصفح والـ CDN بيحفظوا الردود العامة بـ [[Cache-Control]]. والتطبيق بيحفظ نتايج الاستعلامات في Redis. والقاعدة عندها كاش خاص بيها في الرام. أشهر نمط في التطبيق اسمه cache-aside: دوّر في الكاش الأول، ولو مش موجود هات من القاعدة واحفظ بـ TTL. ولما الداتا تتغير، امسح الـ key.`,
          example: R`export async function getCourse(slug) {
  const key = $__btcourse:$__{slug}:v1$__bt;
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);
  const course = await db.course.findUnique({ where: { slug }, include: { lessons: { select: { id: true, title: true, isPreview: true } } } });
  if (course) await redis.set(key, JSON.stringify(course), "EX", 300);
  return course;
}
export async function updateCourse(id, data) {
  const course = await db.course.update({ where: { id }, data });
  await redis.del($__btcourse:$__{course.slug}:v1$__bt);
  return course;
}`,
          try: R`قيس زمن [[GET /courses/:slug]] ١٠٠ مرة من غير كاش ومع كاش. بعدين عدّل عنوان الكورس من الأدمن، وتأكد إن الصفحة جابت الجديد على طول. بعدين علّق سطر الـ del وكرر، ولاحظ إن القديم فضل ٥ دقايق.`,
          flag: "script",
          deep: {
            why: "صفحة الكورس بتتفتح آلاف المرات وبتتغير مرة في الأسبوع. لو كل فتحة بتسأل القاعدة بـ join، القاعدة هتتعب على داتا مبتتغيرش. الكاش بيشيل الحمل ده عنها.",
            how: R`ابدأ من أقرب طبقة للزائر:

١. المتصفح والـ CDN: الـ API العام يرد بـ [[Cache-Control: public, max-age=60, stale-while-revalidate=300]]، يعني الـ CDN يخدم النسخة دقيقة، وبعدها يخدم القديمة وهو بيجيب الجديدة في الخلفية. وأي حاجة خاصة بمستخدم ([[/me/...]]) بترد بـ [[private, no-store]]. والملفات اللي في اسمها hash ([[app.3f9a.js]]) بتتكاش سنة بـ [[immutable]].

٢. Next.js عنده الكاش بتاعه لنتايج الـ fetch والصفحات. التفاصيل في تاب «Next.js».

٣. Redis في التطبيق: المثال. الـ TTL شبكة أمان لو نسيت تمسح في مكان. و [[:v1]] في الـ key بيخليك تلغي كل الكاش القديم مرة واحدة لو شكل الداتا اتغير. و [[redis]] هنا عميل ioredis تاني في [[lib/redis.ts]] بالإعدادات العادية، مش اتصال BullMQ اللي فيه [[maxRetriesPerRequest: null]] (ده بيخلي أي أمر يستنى للأبد لو Redis وقع). وخلي [[enableOfflineQueue: false]] ولفّ الـ get والـ set في try/catch، عشان لو Redis وقع تكمّل من القاعدة.

٤. القاعدة: الـ indexes وكاش الصفحات بتاعها في الرام. ده الدرس الجاي.

مشاكل لازم تعرفها. الـ stampede: الـ key يخلص، وألف طلب يلاقوه فاضي مع بعض، فيروحوا كلهم للقاعدة في نفس اللحظة. الحل lock، أو stale-while-revalidate، أو TTL فيه عشوائية بسيطة. ولو Redis وقع، التطبيق لازم يكمّل من القاعدة، أبطأ بس شغال. وأي حاجة فيها فلوس، زي السعر وقت إنشاء الطلب، بتتقري من القاعدة دايمًا، مش من الكاش.`,
            when: "بعد ما تقيس وتلاقي حاجة بتتقري كتير وبتتغير قليل. متحطش كاش على كل حاجة من أول يوم.",
            mistakes: R`إنك تكاش داتا مستخدم تحت key مشترك، فمستخدم يشوف داتا غيره، ودي أخطر غلطة كاش. أو كاش من غير TTL ومن غير مسح. أو الـ CDN يكاش رد فيه [[Set-Cookie]]. وفي مشروع حقيقي، الـ service worker كان cache-first باسم نسخة ثابت في الكود، فالزوار فضلوا يشوفوا المحتوى القديم لحد ما حد يفتكر يغيّر الرقم يدوي. وفي مشاريع Next.js اللي راجعناها مكانش فيه أي كاش للداتا خالص، فكل زيارة بتسأل القاعدة.`
          },
          lines: [
            "هات كورس بالـ slug.",
            "الـ key، ومعاه رقم نسخة.",
            "دوّر في Redis.",
            "لقيته؟ رجّعه من غير ما تلمس القاعدة.",
            "ملقيتوش؟ هاته من القاعدة بالدروس (من غير روابط الفيديو).",
            "احفظه ٥ دقايق (EX بالثواني).",
            "رجّعه.",
            "قفلة.",
            "تعديل كورس.",
            "عدّل في القاعدة.",
            "امسح الكاش بتاعه، عشان الطلب الجاي يجيب الجديد.",
            "رجّعه.",
            "قفلة."
          ],
          sol: R`من غير كاش كل طلب بيعمل استعلامين (الكورس ودروسه)، ومع كاش بيبقى [[GET]] واحد من Redis. جربناها ١٠٠ مرة على نفس الجهاز: حوالي [[1.6 ms]] للطلب من القاعدة، و [[0.12 ms]] من Redis. على جهازك القاعدة وRedis قريبين، فالفرق هنا صغير بالأرقام. في الإنتاج، والقاعدة عليها ضغط والاستعلام أتقل، الفرق بيكبر، والأهم إن القاعدة مبتشوفش الطلبات دي أصلًا.

بعد التعديل مع [[redis.del]]: أول طلب بيجيب العنوان الجديد على طول. ولما تعلّق الـ del: الصفحة بتفضل تعرض القديم، و [[TTL course:SLUG:v1]] في redis-cli بيقولك فاضل كام ثانية (لحد 300). بعد ما يخلص، الجديد يظهر لوحده. ده بالظبط دور الـ TTL: شبكة أمان، مش طريقة التحديث.

لو الجديد ظهر على طول حتى من غير del، يبقى الطلب مش بيعدّي على [[getCourse]] أصلًا (مثلًا Next.js بيجيب من القاعدة مباشرة)، أو الـ key بيتكتب بشكل مختلف في المكانين.`,
          solCode: R`// قياس بسيط
const slug = "sql-basics";
await getCourse(slug); // سخّن الكاش
let t = performance.now();
for (let i = 0; i < 100; i++) await getCourse(slug);
console.log("مع كاش", ((performance.now() - t) / 100).toFixed(2), "ms");

await redis.del("course:" + slug + ":v1");
t = performance.now();
for (let i = 0; i < 100; i++) { await redis.del("course:" + slug + ":v1"); await getCourse(slug); }
console.log("من غير كاش", ((performance.now() - t) / 100).toFixed(2), "ms");

// redis-cli TTL course:sql-basics:v1`
        },
        {
          cmd: "indexes و N+1",
          title: "الاستعلام البطيء: لاقيه وصلّحه",
          desc: R`أشهر سببين للبطء: عمود بتفلتر بيه من غير index، فالقاعدة بتقرا الجدول كله (Seq Scan). و N+1، يعني query للقايمة وبعدين query لكل عنصر فيها جوه loop. [[EXPLAIN ANALYZE]] بيوريك القاعدة عملت إيه، و [[pg_stat_statements]] بيوريك أتقل الاستعلامات في الإنتاج.

مثال N+1: [[for (const c of courses) await db.lesson.count({ where: { courseId: c.id } })]]، ده ٢١ query لـ ٢٠ كورس. والحل: [[findMany({ include: { _count: { select: { lessons: true } } } })]]، وده query واحد.`,
          example: R`EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;
CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);
EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;
SELECT query, calls, round(mean_exec_time) AS ms FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;`,
          try: R`اعمل مليون طلب بسكربت seed. شغّل أول سطر وشوف Seq Scan والوقت. اعمل الـ index وشغّله تاني، وشوف Index Scan والفرق. بعدين شغّل Prisma بـ [[log: ["query"]]] وافتح صفحة فيها loop، وعدّ الاستعلامات في الترمنال.`,
          flag: "script",
          deep: {
            why: "الصفحة اللي كانت بتفتح في ٥٠ ملّي ثانية وفيها ١٠٠ صف، بتاخد ٥ ثواني بمليون صف. والسبب تقريبًا دايمًا index ناقص أو N+1. ومفيش كاش ولا سيرفر أكبر هيحل ده بجد.",
            how: R`اقرا [[EXPLAIN ANALYZE]] من جوه لبرّه. [[Seq Scan]] معناها قرا الجدول كله. و [[Index Scan]] أو [[Index Only Scan]] معناها راح على طول بالـ index. وقارن [[rows]] المتوقعة بالفعلية، و [[actual time]] لكل خطوة. ولو فيه [[Sort]] بعد الـ scan، الـ index مش مغطي الترتيب.

الـ index المركّب ترتيب أعمدته مهم. أعمدة المساواة الأول ([[userId]])، وبعدين عمود الترتيب أو المدى ([[createdAt]]). و [[("userId", "createdAt" DESC)]] بيخدم الـ WHERE والـ ORDER BY والـ LIMIT مع بعض، فالقاعدة بتقرا ٢٠ صف بس.

وكل index ليه تمن: كل insert أو update بيحدّثه. متعملش index على كل عمود.

[[CONCURRENTLY]] بيعمل الـ index من غير ما يقفل الكتابة على الجدول، ودي مهمة في الإنتاج. بس مينفعش جوه transaction، فلو بتعمله بـ Prisma migration، عدّل الـ SQL بإيدك في ملف لوحده. وفي الـ schema نفسها بتكتب [[@@index([userId, createdAt(sort: Desc)])]].

[[pg_stat_statements]] extension محتاج يتفعّل على السيرفر، والقواعد المُدارة (managed) غالبًا بتفعّله. وبيجمع كل query بشكل عام من غير القيم، وعدد مرات تشغيله، ومتوسط وقته. رتّب بـ [[total_exec_time]]: query سريعة بتتنادى مليون مرة ممكن تبقى أتقل من واحدة بطيئة بتتنادى مرة.

التفاصيل في تاب «PostgreSQL» وتاب «SQL و Prisma».`,
            when: "لما صفحة تبطأ، أو Sentry يوريك endpoint بطيء. وراجع أتقل ١٠ استعلامات مرة في الشهر.",
            mistakes: R`إنك تحط كاش على استعلام بطيء بدل ما تصلّحه. أو index على كل عمود. أو [[CREATE INDEX]] من غير CONCURRENTLY على جدول كبير في الإنتاج، فتقف الكتابة دقايق. أو [[WHERE lower(email) = ...]] من غير expression index على [[lower(email)]]. وفي مشروع حقيقي، أعمدة عليها [[@unique]] كان عليها [[@@index]] كمان، والـ unique أصلًا بيعمل index، فبقوا اتنين بيتحدّثوا مع كل كتابة.`
          },
          lines: [
            "خطة التنفيذ الفعلية ووقتها. قبل الـ index هتلاقي Seq Scan وبعدين Sort.",
            "index مركّب على المستخدم والتاريخ، من غير ما يقفل الكتابة.",
            "نفس الاستعلام تاني. هتلاقي Index Scan ومفيش Sort، والوقت أقل بكتير.",
            "أتقل ١٠ استعلامات في القاعدة: عدد مرات التشغيل ومتوسط الوقت بالملّي ثانية."
          ],
          sol: R`على مليون طلب ومستخدم عنده ١٠٠ طلب: قبل الـ index الـ plan كان [[Parallel Seq Scan on "Order"]] ومعاه [[Workers Launched: 2]]، والوقت حوالي [[34 ms]]. بعد الـ index بقى [[Index Scan using order_user_created_idx]]، والوقت حوالي [[0.07 ms]]، ومفيش [[Sort]] خالص، لأن الـ index متخزن بالترتيب اللي الاستعلام عايزه. الأرقام بتختلف حسب جهازك، بس الفرق بالمئات.

آخر سطر (pg_stat_statements) هيرجع [[relation "pg_stat_statements" does not exist]] لو الـ extension مش شغال: محتاج [[shared_preload_libraries = 'pg_stat_statements']] في الإعدادات، و restart، و [[CREATE EXTENSION pg_stat_statements]]. في القواعد المُدارة غالبًا بيبقى شغال من الأول.

الـ N+1: صفحة بتلف على ٣ كورسات وتجيب دروس كل واحد لوحده بتطلّع [[4]] استعلامات في الترمنال (١ + ٣)، ومع ١٠٠ كورس بتبقى ١٠١. بعد [[include: { lessons: true }]] بقوا [[2]] مهما كان العدد. ولو [[CREATE INDEX CONCURRENTLY]] وقع بـ [[cannot run inside a transaction block]]، يبقى انت شغّله جوه migration أو BEGIN، شغّله لوحده.`,
          solCode: R`-- seed: مليون طلب على ١٠ آلاف مستخدم
INSERT INTO "Order" (id, "userId", "courseId", "amountCents", currency, status, "createdAt")
SELECT 'o' || g, 'u_' || (g % 10000), 'COURSE_ID', 50000, 'EGP', 'PAID', now() - (g || ' seconds')::interval
FROM generate_series(1, 1000000) g;
ANALYZE "Order";

// N+1 وعدّ الاستعلامات
const db = new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] });
let n = 0;
db.$on("query", () => n++);
const courses = await db.course.findMany();
for (const c of courses) await db.lesson.findMany({ where: { courseId: c.id } });
console.log("loop:", n);            // 1 + عدد الكورسات
n = 0;
await db.course.findMany({ include: { lessons: true } });
console.log("include:", n);         // 2`
        },
        {
          cmd: "CDN و Core Web Vitals",
          title: "الموقع يبان سريع عند الزائر، مش عند جهازك بس",
          desc: R`جوجل بتقيس السرعة بـ ٣ أرقام من زوار حقيقيين، عند الـ 75th percentile. LCP أكبر عنصر ظهر في قد إيه، والمطلوب ٢.٥ ثانية أو أقل. و INP الصفحة بترد على الضغطة في قد إيه، والمطلوب ٢٠٠ ملّي ثانية أو أقل. و CLS الحاجات بتتنطط وهي بتحمّل قد إيه، والمطلوب 0.1 أو أقل.

أكبر فرق بييجي من ٣ حاجات: الصور والملفات من CDN بحجم وصيغة صح، و JavaScript أقل في المتصفح، ومقاسات محجوزة للصور والإعلانات.`,
          example: R`import Image from "next/image";
<Image src={course.coverUrl} alt={course.title} width={1200} height={675} sizes="(max-width: 768px) 100vw, 800px" fetchPriority="high" />

import { onLCP, onINP, onCLS } from "web-vitals";
const send = (m) => navigator.sendBeacon("/api/vitals", JSON.stringify({ name: m.name, value: m.value, rating: m.rating, page: location.pathname }));
onLCP(send); onINP(send); onCLS(send);`,
          try: R`افتح صفحة كورس على موبايل حقيقي بـ 4G، وشغّل Lighthouse بـ throttling. شوف أنهي عنصر هو الـ LCP. ضيف [[fetchPriority="high"]] للغلاف وقيس تاني. بعدين ركّب web-vitals واجمع الأرقام من زوار حقيقيين أسبوع.`,
          flag: "script",
          deep: {
            why: "جهازك سريع ونتك سريع، والطالب على موبايل متوسط و 4G بتقطع. الصفحة اللي بتفتح عندك في ثانية ممكن تاخد ٦ عنده، ونص الناس بيقفلوا قبل ما تفتح. والأرقام دي بتأثر على ترتيبك في جوجل كمان.",
            how: R`LCP غالبًا صورة الغلاف أو العنوان الكبير. عشان يبقى سريع: السيرفر يرد بسرعة (كاش أو SSR)، والصورة من CDN بصيغة AVIF أو WebP بالمقاس المناسب، ومتبقاش lazy. و [[fetchPriority="high"]] بيقول للمتصفح «دي أولوية». وفي Next 16، الـ [[priority]] القديمة بقت deprecated، والبديل [[preload]]، أو [[fetchPriority]]، أو [[loading="eager"]]. والصور من دومين تاني محتاجة [[images.remotePatterns]] في next.config.

INP بيتأثر بالـ JavaScript. أي task طويلة على الـ main thread بتأخر رد الضغطة. قلل الـ JS: Server Components للحاجات اللي مش تفاعلية، وحمّل المكونات التقيلة ([[dynamic import]]) لما تتطلب، ومتستوردش مكتبة كاملة عشان دالة واحدة.

CLS: [[width]] و [[height]] على كل صورة، عشان المتصفح يحجز مكانها قبل ما تحمّل. ومكان محجوز للبانرات. والخطوط بـ next/font، اللي بيظبط مقاسات الخط البديل عشان النص ميتنططش لما الخط الحقيقي يحمّل.

والـ CDN (زي Cloudflare قدام الـ VPS) بيخدم الملفات من أقرب مدينة للزائر. الملفات اللي في اسمها hash بتتكاش سنة، والـ HTML لفترة قصيرة أو مبيتكاشش خالص. والفيديو مكانه خدمة فيديو بـ HLS، مش mp4 من السيرفر.

Lighthouse قياس معمل. الحقيقة من زوار حقيقيين: مكتبة web-vitals في كودك، أو تقرير CrUX بتاع جوجل. وقياس INP لازم يبقى من زوار حقيقيين، لأنه محتاج تفاعل.`,
            when: "قبل الإطلاق على الصفحات العامة (الرئيسية، والكورسات، وصفحة الكورس)، وبعد أي تغيير كبير في الواجهة.",
            mistakes: "إنك تحسّن رقم Lighthouse على اللابتوب بتاعك وبس. أو تعمل lazy لصورة الـ LCP نفسها. أو تنسى width و height فالصفحة تتنطط. أو تستورد مكتبة تواريخ أو أيقونات كاملة. أو تعرض الفيديو mp4 مباشرة من السيرفر."
          },
          lines: [
            "component الصور بتاع Next.js.",
            "صورة الغلاف: مقاسات محجوزة (CLS)، و sizes عشان يختار المقاس الصح، وأولوية عالية لأنها الـ LCP.",
            "مكتبة القياس من زوار حقيقيين.",
            "ابعت كل رقم للسيرفر بـ sendBeacon، وده بيوصل حتى لو الزائر قفل الصفحة.",
            "اسمع على التلات مقاييس."
          ],
          sol: R`في Lighthouse (وضع Mobile، وهو بيعمل throttling لوحده) هتلاقي في قسم Diagnostics بند [[Largest Contentful Paint element]] بيقولك مين الـ LCP. في صفحة كورس غالبًا هو صورة الغلاف. قبل [[fetchPriority="high"]] هتلاقي الصورة بتبدأ تحمل متأخر في الـ waterfall بعد الـ CSS والـ JS. بعده بتبدأ بدري مع أول الطلبات، والـ LCP بيقل. الرقم نفسه بيختلف كل تشغيلة، فشغّل ٣ مرات وخد المتوسط. المقاييس الرسمية: LCP كويس تحت 2.5 ثانية، و INP تحت 200ms، و CLS تحت 0.1.

الـ web-vitals من الزوار الحقيقيين هتلاقيها أوحش من Lighthouse على جهازك غالبًا، وده الطبيعي: أجهزة أضعف ونت أبطأ. بص على الـ p75 مش المتوسط، لأن ده اللي جوجل بيقيس بيه.

لو الـ LCP طلع نص مش صورة، يبقى [[fetchPriority]] على الصورة مش هيفرق، ركّز على الفونت والـ CSS. ولو CLS عالي، دوّر على صورة من غير [[width]] و [[height]] أو banner بيظهر فوق المحتوى بعد التحميل.`,
          solCode: R`// app/api/vitals/route.ts: استقبل الأرقام (وابعتها لـ PostHog أو خزّنها)
export async function POST(req: Request) {
  const m = await req.json(); // { name: "LCP", value: 2310.5, rating: "good", page: "/courses/sql" }
  console.log(JSON.stringify({ msg: "web-vital", ...m }));
  return new Response(null, { status: 204 });
}`
        }
      ]
    }
]);
