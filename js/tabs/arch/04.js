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
          teach: R`## الـ layout بيقرر اللغة والاتجاه على السيرفر

ده ملف [[app/[locale]/layout.tsx]]: بياخد اللغة من الـ URL، ويرفض اللغات المش مدعومة، ويطلّع [[<html lang dir>]] جاهز من السيرفر. جربناه في Next.js 16.4 و next-intl 4.14 و Tailwind 4.3 (React 19، Node 24، ويندوز 11) بـ [[next build]] و [[next start]]، مع ملفات next-intl العادية: [[i18n/routing]] فيه [[locales: ["ar", "en"]]] و [[defaultLocale: "ar"]]، و [[proxy.js]] فيه [[createMiddleware(routing)]]، و [[messages/ar.json]] و [[en.json]]. وفتحنا الصفحات في Chrome headless بـ playwright.

---

## ١. الـ imports

- [[NextIntlClientProvider]]: بيوصّل الرسايل للـ client components.
- [[hasLocale(locales, locale)]]: [[true]] لو اللغة في القايمة.
- [[notFound]]: بيوقف الرسم ويطلّع صفحة 404.
- [[routing]]: إعدادات اللغات من [[routing.ts]]. و [[@/]] اختصار لفولدر [[src]] (من [[jsconfig]] أو [[tsconfig]]).

---

## ٢. [[export default async function LocaleLayout({ children, params }) {]]

- [[children]]: الصفحة اللي جوه الـ layout.
- [[params]]: الأجزاء المتغيرة في الـ URL. الفولدر اسمه [[[locale]]]، فـ [[/ar/courses]] بيدّي [[{ locale: "ar" }]].
- [[async]] لأن...

### [[const { locale } = await params;]]

...في Next 15 و 16 [[params]] بقت Promise، فلازم [[await]] قبل ما تقراها.

### [[if (!hasLocale(routing.locales, locale)) notFound();]]

~~~text الناتج (curl)
/ar  → 200
/en  → 200
/fr  → 404
/    → 307 Temporary Redirect, location: /ar, set-cookie: NEXT_LOCALE=ar
~~~

[[/]] من غير لغة: الـ proxy (مش الـ layout) حوّل على اللغة الافتراضية وحفظها في cookie.

---

## ٣. [[<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>]]

- [[lang]]: لغة الصفحة، للقارئ الآلي وجوجل والخطوط.
- [[dir]]: اتجاه الكتابة. ternary: عربي → [[rtl]]، غير كده [[ltr]].

أول الرد اللي راجع من السيرفر:

~~~bash
curl -s localhost:6021/ar | head -c 60
~~~

~~~text الناتج
<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charSet=
~~~

الاتجاه جوه الـ HTML نفسه. عشان نتأكد إنه مش محتاج JavaScript، فتحنا الصفحة في Chrome **والـ JavaScript مقفول**:

~~~text الناتج
no-JS dir: [ 'rtl', 'rtl' ]
~~~

[[document.documentElement.dir]] و [[direction]] المحسوب على الـ body الاتنين [[rtl]]: يعني أول frame بيترسم صح.

### [[<NextIntlClientProvider>{children}</NextIntlClientProvider>]]

من غير props: في next-intl 4 بياخد اللغة والرسايل لوحده من إعدادات السيرفر ([[i18n/request]]).

---

## ٤. الـ solCode: الكارت بالـ CSS الـ logical

### [[const t = useTranslations("courses");]] و [[t("lessons", { count })]]

[[useTranslations("courses")]] بيرجع دالة بتقرا من جزء [[courses]] في ملف الرسايل. حطينا في [[ar.json]] رسالة ICU:

~~~text messages/ar.json
{count, plural, =0 {مفيش دروس} one {درس واحد} two {درسين} few {# دروس} many {# درس} other {# درس}}
~~~

و [[#]] بيتبدل بالرقم. جربنا ٦ كروت:

~~~text الناتج
0   → مفيش دروس
1   → درس واحد
2   → درسين
3   → 3 دروس
11  → 11 درس
100 → 100 درس
~~~

قواعد الجمع العربي (Intl.PluralRules بتاع [[ar]]): [[few]] من ٣ لـ ١٠، و [[many]] من ١١ لـ ٩٩، و [[other]] للـ ١٠٠. و [[=0]] حالة خاصة للصفر بالظبط.

### [[ml-4 text-left]] ضد [[ms-4 text-start]]

حطينا الكارتين جنب بعض (الكارت الغلط بـ [[ml-4]] و [[text-left]]، والصح من الـ solCode) وقسنا في Chrome:

~~~text الناتج (عربي)
#bad   imgX 1203  textRight 1203  marginLeft 16px  marginRight 0px   textAlign left
#good  imgX 1203  textRight 1187  marginLeft 0px   marginRight 16px  textAlign start
~~~

في العربي الصورة على اليمين. الكارت الغلط: النص لازق في الصورة (نهايته 1203 = بداية الصورة) والـ 16px راحت على الشمال. الصح: [[ms-4]] = [[margin-inline-start]]، و «بداية السطر» في RTL هي اليمين، فالمسافة بقت بين النص والصورة.

~~~text الناتج (إنجليزي)
#bad   imgX 13  textLeft 93  marginLeft 16px  textAlign left
#good  imgX 13  textLeft 93  marginLeft 16px  textAlign start
~~~

في الإنجليزي الاتنين نفس الشكل، وده سبب إن الغلط مش بيبان غير لما تفتح العربي.

### [[className="rtl:rotate-180"]]

~~~text الناتج (rotate المحسوب للسهم)
ar ['180deg', 'none']     ← الكارت الصح، الكارت الغلط
en ['none', 'none']
~~~

[[rtl:]] في Tailwind 4 بيطبّق الكلاس بس جوه [[dir="rtl"]]، فالسهم [[→]] بقى [[←]] في العربي بس. ولاحظ إن Tailwind 4 بيستخدم خاصية [[rotate]] مش [[transform]].

---

## الخلاصة

| الحاجة | فين | اتأكدنا إزاي |
|---|---|---|
| اللغة | الـ URL ([[/ar]]) | [[/fr]] → 404 |
| الاتجاه | [[<html dir>]] من السيرفر | [[rtl]] حتى والـ JS مقفول |
| الجمع | رسايل ICU + [[t(key, { count })]] | ٠ و ١ و ٢ و ٣ و ١١ و ١٠٠ |
| المسافات | [[ms-]] و [[text-start]] | قياس في Chrome |
| الأسهم | [[rtl:rotate-180]] | [[180deg]] في العربي بس |`,
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

والمثال استرداد طلب: نحجز الطلب بتحديث ذري (PAID → REFUNDED)، وبعدين البوابة، وبعدين شيل الاشتراك وتسجيل الفعل في transaction واحدة.`,
          example: R`const admin = express.Router();
admin.use(requireAuth, requireFreshRole("ADMIN"));
admin.post("/orders/:id/refund", async (req, res) => {
  const { reason } = Refund.parse(req.body);
  const order = await db.order.findUniqueOrThrow({ where: { id: req.params.id } });
  const { count } = await db.order.updateMany({ where: { id: order.id, status: "PAID" }, data: { status: "REFUNDED" } });
  if (count === 0) throw new AppError(409, "NOT_PAID", "الطلب ده مش مدفوع");
  try {
    await paymob.refund(order.gatewayTxId, order.amountCents);
  } catch (err) {
    await db.order.update({ where: { id: order.id }, data: { status: "PAID" } });
    throw err;
  }
  await db.$transaction([
    db.enrollment.deleteMany({ where: { userId: order.userId, courseId: order.courseId } }),
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

[[findUniqueOrThrow]] بترمي P2025 لو مش موجود، والـ error handler بيحوّلها 404. وقبل البوابة بنحجز الطلب بـ [[updateMany]] بشرط [[status: "PAID"]]: لو أدمنين ضغطوا مع بعض (أو دبل كليك)، واحد بس بياخد count بـ 1، والتاني 409. من غير الحجز ده الاتنين بيقروا PAID ويبعتوا استرداد للبوابة، فالفلوس ترجع مرتين. ولو البوابة فشلت، بنرجّع الطلب PAID ونرمي الخطأ. ولهذا كنا بنخزن [[gatewayTxId]]: البوابة محتاجاه عشان تعمل الاسترداد.

الـ audit log جدول بتضيف فيه بس، محدش بيعدّل أو يمسح منه. فيه: الفاعل، والفعل، والهدف، وتفاصيل (JSON)، والـ IP، والوقت. ويتعرض في اللوحة نفسها.

ولوحة الأدمن محتاجة حماية زيادة عن باقي الموقع: 2FA (TOTP) لحسابات الأدمن، وسبب إجباري للأفعال الخطيرة، وتأكيد قبل المسح. ولو تقدر، subdomain لوحده زي [[admin.example.com]]، وممكن تقفله على IPs معينة. وأي ميزة «ادخل كأنك المستخدم ده» (impersonation) لازم تتسجّل.

الواجهة ممكن تتبني بجداول جاهزة (TanStack Table مع shadcn). وفي الـ MVP، صفحتين بسيطين للكورسات والطلبات كفاية.`,
            when: "من الـ MVP. الأدمن محتاج يشوف الطلبات ويحل مشاكل الدفع من أول يوم.",
            mistakes: R`في مشروع حقيقي، الدخول للوحة كان بباسورد أدمن واحد مشترك في متغير بيئة. ونفس الباسورد ده كان المفتاح اللي بيوقّع توكنات الأدمن. يعني مفيش logout حقيقي، ومفيش طريقة تعرف مين من الفريق عمل إيه، ولو الباسورد اتغير كل التوكنات بتبوظ مع بعض. الصح إن كل أدمن يبقى ليه حساب، والسر يبقى حاجة منفصلة. ومن الغلطات كمان: جداول الأدمن من غير pagination، وفي مشروع كان فيه [[take: 200]] من غير صفحات، فالمستخدم رقم ٢٠١ مكانش بيظهر خالص ومحدش واخد باله.`
          },
          teach: R`## router محمي كله، واسترداد بيحصل مرة واحدة ومتسجّل

router للأدمن عليه حماية واحدة لكل الـ routes، وتحته استرداد طلب: يحجز الطلب، ويكلّم البوابة، ويشيل الاشتراك ويكتب في الـ audit log. جربناه بـ Express 5 و Zod 4 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24) بـ supertest (بيبعت طلبات للـ app من غير ما يفتح بورت). و [[paymob.refund]] دالة وهمية بتستنى ٢٠٠ ملّي وتسجّل الاسترداد، وتقدر تخليها تفشل.

> النسخة القديمة من المثال كانت بتقرا [[status]] وتكلّم البوابة وبعدين تحدّث. بعتنا طلبين استرداد لنفس الطلب مع بعض (زي دبل كليك): الاتنين قروا PAID، والبوابة رجّعت الفلوس **مرتين** ([[gateway refunds: [ '9002:50000', '9002:50000' ]]])، والطلب التاني رجع 404 غريبة. صلّحناها بحجز ذري قبل البوابة.

---

## ١. [[const admin = express.Router();]] و [[admin.use(requireAuth, requireFreshRole("ADMIN"));]]

[[Router]] تطبيق صغير ليه middleware و routes بتوعه. و [[admin.use(...)]] بيحط الاتنين قدام **كل** route تحته، فمفيش route يتنسي.

### [[requireFreshRole]] (الـ solCode)

بدل الدور اللي في التوكن، بيقرا الدور من القاعدة مع كل طلب: [[db.user.findUnique({ where: { id }, select: { role: true } })]]، ولو [[u?.role !== role]] يبقى 403.

~~~text الناتج
student                403 {"error":{"code":"FORBIDDEN","message":"مش مسموحلك"}}
demoted, old token     403 {"error":{"code":"FORBIDDEN","message":"مش مسموحلك"}}
~~~

التانية: غيّرنا دور الأدمن في القاعدة لـ STUDENT، وبعتنا بنفس توكنه القديم (اللي جواه [[role: "ADMIN"]]). اترفض فورًا.

---

## ٢. [[const { reason } = Refund.parse(req.body);]]

[[Refund]] schema فيها [[reason]] نص إجباري. من غيره:

~~~text الناتج
no reason              400 {"error":{"code":"VALIDATION",...,"path":["reason"],...}}
~~~

## ٣. [[db.order.findUniqueOrThrow({ where: { id: req.params.id } })]]

مش موجود؟ بترمي [[P2025]] والـ error handler بيحوّلها 404:

~~~text الناتج
unknown id             404 {"error":{"code":"NOT_FOUND","message":"مش موجود"}}
~~~

---

## ٤. الحجز: [[updateMany({ where: { id: order.id, status: "PAID" }, data: { status: "REFUNDED" } })]]

الشرط [[status: "PAID"]] جوه الـ UPDATE نفسه، فالقاعدة بتقرا وتكتب في خطوة واحدة، وبترجّع [[count]] بعدد الصفوف اللي اتغيرت.

### [[if (count === 0) throw new AppError(409, "NOT_PAID", ...)]]

0 يعني الطلب مش مدفوع، أو حد تاني لسه حاجزه. نفس التجربة بتاعة الدبل كليك بعد التصليح:

~~~text الناتج
parallel 1             204
parallel 2             409 {"error":{"code":"NOT_PAID","message":"الطلب ده مش مدفوع"}}
gateway refunds: [ '9002:50000' ] audit rows: 1
~~~

استرداد واحد بس عند البوابة.

---

## ٥. البوابة: [[try { await paymob.refund(...) } catch (err) { ...status: "PAID"...; throw err; }]]

[[gatewayTxId]] اللي خزناه في الـ webhook هو اللي البوابة محتاجاه. ولو فشلت، الطلب بيرجع PAID زي ما كان، والخطأ بيكمّل للـ error handler. خلينا البوابة الوهمية ترمي:

~~~text الناتج
UNHANDLED Error: gateway 503
gateway down           500 {"error":{"code":"INTERNAL","message":"حصلت مشكلة"}}
o3: PAID enrollment: 1
~~~

مفيش حاجة اتغيرت، والأدمن يقدر يجرّب تاني.

---

## ٦. [[db.$transaction([ ... ])]]

[[$transaction]] بـ array: كل العمليات تتنفذ مع بعض أو ولا واحدة.

- [[db.enrollment.deleteMany({ where: { userId, courseId } })]]: شيل الاشتراك. [[deleteMany]] مش [[delete]] عشان لو مش موجود (اتشال بإيد) ميرميش.
- [[db.auditLog.create({ data: { actorId, action: "order.refund", targetId, meta: { reason } } })]]: مين ([[req.user.id]])، عمل إيه، على إيه، وليه ([[meta]] عمود Json).

### [[res.status(204).end();]]

204 = No Content: نجح ومفيش جسم.

~~~text الناتج
refund                 204
refund again           409 {"error":{"code":"NOT_PAID","message":"الطلب ده مش مدفوع"}}
order: REFUNDED enrollments: 0 gateway refunds: [ '9001:50000' ]
~~~

---

## ٧. [[admin.get("/audit-logs", ...)]] (الـ solCode)

[[orderBy: { createdAt: "desc" }]] الأحدث الأول، و [[take: 50]] آخر ٥٠، و [[actor: { select: { email: true } }]] إيميل الفاعل من العلاقة:

~~~text الناتج
{"data":[{"id":"cmuzfanr50002d8iex8k8g8xz","action":"order.refund","targetId":"cmuzfanhk0000d8ie5fh6hb4k","meta":{"reason":"طلب العميل"},"createdAt":"2026-10-08T10:58:07.937Z","actor":{"email":"admin@example.com"}}]}
~~~

وهو تحت [[admin]]، فمحمي بنفس الحماية من غير ما تكتب حاجة.

---

## ٨. [[app.use("/admin", admin);]]

بيركّب الـ router على [[/admin]]، فـ [[/orders/:id/refund]] بقت [[/admin/orders/:id/refund]].

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[admin.use(requireAuth, requireFreshRole)]] | حماية واحدة لكل الـ routes، والدور من القاعدة |
| [[updateMany]] بشرط PAID قبل البوابة | استرداد واحد حتى مع دبل كليك |
| [[catch]] يرجّع PAID | فشل البوابة ميسيبش الطلب في حالة غلط |
| [[$transaction]] للاشتراك والـ audit | الاتنين أو ولا واحد |
| الـ audit log قراية بس | «مين عمل كده؟» ليها إجابة |`,
          lines: [
            "router للأدمن لوحده.",
            "حماية على الـ router كله: داخل، ودوره أدمن من القاعدة دلوقتي مش من التوكن.",
            "استرداد طلب.",
            "السبب إجباري.",
            "هات الطلب، ولو مش موجود 404.",
            "احجز الطلب: حوّله REFUNDED بشرط إنه لسه PAID، قراية وكتابة في خطوة واحدة.",
            "0 يعني مش مدفوع، أو أدمن تاني سبقنا عليه (دبل كليك): 409 ومفيش استرداد تاني عند البوابة.",
            "جرّب...",
            "...الاسترداد عند البوابة.",
            "لو فشل...",
            "...رجّع الطلب PAID زي ما كان...",
            "...وارمي الخطأ.",
            "قفلة.",
            "الاتنين مع بعض أو ولا واحد:",
            "الاشتراك اتشال (deleteMany عشان لو مش موجود ميرميش).",
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
          teach: R`## من الـ query string لـ where آمن

Zod بيتأكد من الفلاتر ويدّيها قيم افتراضية، والـ where بيتبني قطعة قطعة، والترتيب بيتختار من قايمة ثابتة. جربناه بـ Express 5 و Zod 4 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24) بـ supertest، وشغّلنا Prisma بـ log للـ queries عشان نشوف الـ SQL. وجزء الـ trigram (الـ solCode) شغّلناه بـ [[psql]] جوه نفس الـ container.

---

## ١. [[const CourseQuery = z.object({ ... })]]

كل حاجة في [[req.query]] بتيجي نصوص. الـ schema بتقول إيه المسموح:

- [[q: z.string().trim().max(100).optional()]]: [[trim]] بيشيل المسافات من الأطراف، و ١٠٠ حرف بالكتير، و [[optional]] يعني ممكن ميبقاش موجود.
- [[level: z.enum([...]).optional()]]: ٣ قيم بس.
- [[sort: z.enum([...]).default("newest")]]: لو مش موجود خد [[newest]].

~~~text الناتج
CourseQuery.parse({ q: "  react  " })  →  { q: 'react', sort: 'newest' }
CourseQuery.parse({ q: "" })           →  { q: '', sort: 'newest' }
~~~

---

## ٢. [[const SORTS = { newest: { createdAt: "desc" }, price_asc: { priceCents: "asc" }, popular: { enrollCount: "desc" } };]]

خريطة من اسم للـ orderBy بتاع Prisma. الـ client بيبعت [[price_asc]]، والسيرفر بيترجمها لـ [[{ priceCents: "asc" }]]. اسم العمود نفسه عمره ما بييجي من برّه:

~~~text الناتج
?sort=passwordHash   400 {"error":{"code":"VALIDATION",...,"details":[{"code":"invalid_value","values":["newest","price_asc","popular"],"path":["sort"],...}]}}
?level=HACKER        400 {... "values":["BEGINNER","INTERMEDIATE","ADVANCED"],"path":["level"] ...}
?q=xxx...(101 حرف)   400 {... "code":"too_big","maximum":100,"path":["q"] ...}
~~~

---

## ٣. بناء الـ where

### [[published: true]]

دايمًا: المنشور بس.

### [[...(f.q && { OR: [{ title: { contains: f.q, mode: "insensitive" } }, { summary: { ... } }] })]]

نفس حيلة درس «ownership»: لو [[f.q]] موجود ومش فاضي، [[&&]] بترجع الـ object ويتفرد. ولو فاضي ([[""]] قيمة falsy) أو [[undefined]] مفيش حاجة تتضاف. و [[contains]] + [[mode: "insensitive"]] = «فيه الكلمة دي في أي مكان، من غير فرق بين capital و small».

### [[...(f.level && { level: f.level })]]

نفس الفكرة للمستوى.

---

## ٤. [[db.course.findMany({ where, orderBy: [SORTS[f.sort], { id: "desc" }], take: 20 })]]

- [[orderBy]] array: رتّب بالأول، ولو اتساووا رتّب بالتاني. [[id]] unique، فالترتيب بقى ثابت دايمًا.
- [[take: 20]]: حد ثابت.

الـ SQL اللي Prisma بعته لـ [[?q=react&sort=price_asc]]:

~~~text الناتج
SELECT ... FROM "Course" WHERE ("Course"."published" = $1 AND ("Course"."title" ILIKE ('%' || $2 || '%')
  OR "Course"."summary" ILIKE ('%' || $3 || '%'))) ORDER BY "Course"."priceCents" ASC, "Course"."id" DESC LIMIT $4 OFFSET $5
params=[true,"react","react","20","0"]
~~~

- [[ILIKE]] هو LIKE من غير فرق حروف، و [[||]] لزق نصوص في SQL.
- الكلمة راحت parameter ([[$2]]) مش ملزوقة في النص، فمفيش SQL injection.
- كورس [[Next.js]] اللي الـ summary بتاعه «مبني على REACT» طلع في النتيجة، والـ draft لأ.

> حاجة لاحظناها: Prisma مبيهربش [[%]] و [[_]] اللي جوه الكلمة. [[?q=%]] و [[?q=_]] رجّعوا كل الكورسات المنشورة. مش ثغرة هنا (المنشور بس وبحد ٢٠)، بس لو عايز بحث حرفي هرّبهم بنفسك ([[q.replace(/[%_\]/g, "\$&")]]).

---

## ٥. الـ solCode: الـ trigram على ١٠٠ ألف كورس

### الـ seed

[[generate_series(1, 100000) g]] بيطلّع الأرقام من ١ لـ ١٠٠٠٠٠، وكل رقم بيبقى صف. [[(ARRAY['Python','Go','React','SQL'])[1 + g % 4]]] بيلف على الأسامي الأربعة ([[%]] في SQL باقي القسمة)، و [[md5(g::text)]] نص عشوائي للملخص. و [[ANALYZE]] بيحدّث إحصائيات الجدول عشان القاعدة تختار plan صح.

### [[EXPLAIN ANALYZE]] قبل الـ index

~~~text الناتج (مختصر)
Limit (actual time=82.066..82.070 rows=20)
  ->  Sort  Sort Key: "createdAt" DESC, id DESC  Sort Method: top-N heapsort
        ->  Seq Scan on "Course" (actual time=0.013..77.294 rows=25000)
              Filter: (published AND ((title ~~* '%react%') OR (summary ~~* '%react%')))
              Rows Removed by Filter: 75000
Execution Time: 82.102 ms
~~~

[[~~*]] هو ILIKE بالرموز. [[Seq Scan]] قرا الـ ١٠٠ ألف صف ورمى ٧٥ ألف. الـ index العادي (btree) ميقدرش يساعد لأن الكلمة بتبدأ بـ [[%]].

### [[CREATE EXTENSION pg_trgm]] والـ indexes

pg_trgm بيقطّع النص لحتت من ٣ حروف (trigrams)، و [[USING gin (title gin_trgm_ops)]] بيعمل index من النوع GIN عليهم، فـ ILIKE يقدر يدوّر فيه.

~~~text الناتج (مختصر)
Bitmap Heap Scan on "Course" (actual time=3.352..23.123 rows=25000)
  ->  BitmapOr
        ->  Bitmap Index Scan on course_title_trgm   (rows=25000)
        ->  Bitmap Index Scan on course_summary_trgm (rows=0)
Execution Time: 29.609 ms
~~~

[[BitmapOr]] جمع نتيجة الـ indexين. الفرق هنا ٣ مرات بس، لأن ربع الجدول فيه React والقاعدة لسه بتقرا ٢٥ ألف صف وترتّبهم. بكلمة نادرة ([[%e 4242 G%]]):

| | الوقت |
|---|---|
| من غير indexes ([[Seq Scan]]) | [[90.9 ms]] |
| بالـ indexين ([[BitmapOr]]) | [[0.65 ms]] |
| بـ index على [[title]] بس | [[118.6 ms]] و [[Seq Scan]] |

الأخيرة بتأكد كلام الـ [[deep]]: الـ [[OR]] محتاج index على العمودين، وإلا القاعدة بترجع للـ Seq Scan.

---

## الخلاصة

| الحماية | الكود |
|---|---|
| قيم غريبة → 400 | [[z.enum]] و [[max(100)]] |
| ترتيب من غير اسم عمود من برّه | [[SORTS[f.sort]]] |
| ترتيب ثابت | [[{ id: "desc" }]] في الآخر |
| مفيش injection | Prisma بيبعت الكلمة parameter |
| سرعة مع الحجم | GIN + pg_trgm على كل عمود في الـ OR |`,
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

الـ trigram: جربناها على ١٠٠ ألف كورس (PostgreSQL 18). من غير index الـ plan كان [[Seq Scan on "Course"]] وبعده [[Sort]]. بعد الـ indexes على [[title]] و [[summary]] بقى [[BitmapOr]] فوقه [[Bitmap Index Scan]] على كل index. بس خلي بالك من الـ seed ده: كل رابع كورس اسمه فيه React، يعني [[react]] بتطابق ٢٥ ألف صف، فالفرق كان صغير ([[82 ms]] → [[30 ms]])، لأن القاعدة لسه بتقرا ٢٥ ألف صف وترتّبهم. الـ index بيلمع مع كلمة نادرة: [[%e 4242 G%]] أخدت [[91 ms]] بـ Seq Scan و [[0.65 ms]] بالـ indexes. الأرقام بتختلف حسب جهازك.

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
          teach: R`## «هات ٢٠ بعد الصف ده» بدل «فوّت ٧٢٠»

الـ route بيرجّع طلبات المستخدم صفحة صفحة بالـ cursor: بيطلب صف زيادة عشان يعرف فيه صفحة بعد كده ولا لأ، ويرجّع id آخر صف كـ [[nextCursor]]. جربنا الـ route والـ solCode بـ Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24): ١٠٠ طلب لـ Ali بمبالغ من ١٠٠ لـ ١٩٩ عشان نعرف كل طلب برقمه، وكل واحد بعد اللي قبله بثانية.

---

## ١. [[const { cursor, limit } = Page.parse(req.query);]]

[[Page]] من الـ deep: [[z.object({ cursor: z.string().optional(), limit: z.coerce.number().int().min(1).max(50).default(20) })]].

[[z.coerce.number()]] بيحوّل النص لرقم ([[Number("7")]]) قبل الفحص، لأن الـ query string كلها نصوص:

~~~text الناتج
Page.parse({ limit: "7" })  →  { limit: 7 }
Page.parse({})              →  { limit: 20 }
?limit=0     400 Too small: expected number to be >=1
?limit=1000  400 Too big: expected number to be <=50
?limit=abc   400 Invalid input: expected number, received NaN
~~~

---

## ٢. [[db.order.findMany({ ... })]]

### [[where: { userId: req.user.id }]]

طلباتي بس (درس الملكية).

### [[orderBy: [{ createdAt: "desc" }, { id: "desc" }]]]

الأحدث الأول، ولو طلبين ليهم نفس الوقت بالظبط، الـ [[id]] بيحسم. من غيره ترتيبهم ممكن يتغير بين استعلام والتاني، فطلب يتكرر أو يتفوّت.

### [[take: limit + 1]]

بنطلب ٢١ بدل ٢٠. لو رجعوا ٢١، يبقى فيه صفحة كمان، من غير ما نعمل [[count]] على الجدول كله.

### [[...(cursor && { cursor: { id: cursor }, skip: 1 })]]

لو فيه cursor: [[cursor: { id }]] معناها «ابدأ من الصف ده»، و [[skip: 1]] «وفوّته هو نفسه» لأنه كان آخر صف في الصفحة اللي فاتت. ولو مفيش cursor (أول صفحة) مفيش حاجة تتضاف.

---

## ٣. [[const hasMore = rows.length > limit;]] و [[rows.slice(0, limit)]]

- [[hasMore]]: الصف الزيادة جه؟
- [[slice(0, limit)]]: رجّع أول [[limit]] بس، والزيادة اترمت.

### [[nextCursor: hasMore ? items.at(-1).id : null]]

[[at(-1)]] آخر عنصر في الـ array (الرقم السالب بيعد من الآخر). لفينا على كل الصفحات بـ [[limit=40]]:

~~~text الناتج
page 1 items 40 first 999 nextCursor cmuzfeihi001ppgie2752g7g9
page 2 items 40 first 160 nextCursor cmuzfeihi000lpgie4e0m275o
page 3 items 21 first 120 nextCursor null
total 101
~~~

١٠١ طلب (الـ ١٠٠ + طلب ٩٩٩ اللي الـ solCode ضافه)، كل واحد مرة واحدة، والصفحة الأخيرة [[nextCursor: null]] فالواجهة تبطّل تطلب.

---

## ٤. الـ solCode: cursor ضد offset وفيه طلب جديد في النص

1. [[createMany]] ١٠٠ طلب، و [[createdAt: new Date(t0 + i * 1000)]] كل واحد بعد اللي قبله بثانية.
2. الصفحة الأولى (٢٠): المبالغ من ١٩٩ لـ ١٨٠.
3. [[db.order.create]] طلب جديد (٩٩٩) بقى الأحدث، يعني أول القايمة.
4. الصفحة التانية بالطريقتين:

~~~text الناتج
page1 amounts: 199 … 180
cursor page2: 179 … 160 | offset page2: 180 … 161
cursor dupes: 0
offset dupes: 1
~~~

- الـ cursor بدأ بعد ١٨٠ على طول، مش فارق معاه اللي اتضاف فوق.
- الـ offset ([[skip: 20]]) عدّ ٢٠ من الأول **بعد** ما الجديد اتضاف، فالكل اتزق خطوة، و ١٨٠ ظهر تاني.
- [[new Set(page1.map((o) => o.id))]]: مجموعة ids الصفحة الأولى، و [[filter((o) => seen.has(o.id)).length]] بيعد المكرر.

---

## ٥. ليه الـ offset بيبطأ؟ (من الـ deep)

[[OFFSET 10000 LIMIT 20]] القاعدة بتقرا ١٠٠٢٠ صف وترمي ١٠٠٠٠. الـ cursor بيتحول شرط بيوصل له الـ index على [[(userId, createdAt)]] على طول، فالصفحة الألف بسرعة الأولى. (قياس الـ index ده في درس «indexes و N+1».)

---

## الخلاصة

| | offset ([[skip: n]]) | cursor |
|---|---|---|
| السرعة في العمق | بتقل | ثابتة |
| حاجة اتضافت في النص | تكرار (جربناه: ١) | مفيش (٠) |
| تنط لصفحة ٣٧ | أيوه | لأ |
| مناسب لـ | جداول الأدمن | infinite scroll والـ APIs |

[[take: limit + 1]] بيعرّفك إن فيه كمان، و [[skip: 1]] بيفوّت صف الـ cursor، و [[id]] في الترتيب بيخليه ثابت.`,
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
          teach: R`## queue في Redis، و worker لوحده، وميعاد دوري واحد مهما كان عدد النسخ

المثال بيعمل queueين: [[emails]] بإعادة افتراضية، و [[maintenance]] للشغل الدوري، وبيضيف job إيصال، وبيسجّل scheduler كل ربع ساعة. جربنا الـ solCode بـ BullMQ 6.3 و ioredis 6 على Redis 8 (Docker، ويندوز 11، Node 24) بنسختين من الـ worker في process مختلفين، وصغّرنا الأوقات عشان منستناش: [[delay]] ثانية بدل ١٠، والـ scheduler كل ٣ ثواني بدل ١٥.

---

## ١. [[import { Queue } from "bullmq";]] و [[import { connection } from "../lib/redis.js";]]

[[Queue]] للي **بيضيف** jobs (الـ API)، و [[Worker]] للي **بيشغّلها**. والاتصال واحد مشترك: [[new IORedis(REDIS_URL, { maxRetriesPerRequest: null })]] (BullMQ بيطلب [[null]] عشان أوامر الانتظار متتقفلش بعد ٢٠ محاولة).

---

## ٢. [[new Queue("emails", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } })]]

- [["emails"]] الاسم: الـ worker لازم يسمع على نفس الاسم.
- [[defaultJobOptions]]: إعدادات بتتحط على **أي** job تتضاف للـ queue دي، حتى لو اللي ضافها نسي.
- [[attempts: 5]]: لحد ٥ محاولات (الأولى + ٤ إعادات).
- [[backoff: { type: "exponential", delay }]]: الانتظار قبل المحاولة رقم n+1 = [[delay × 2^(n-1)]].

## ٣. [[new Queue("maintenance", { connection })]]

queue تانية للشغل الدوري، عشان ألف job صيانة متأخرش إيميل.

---

## ٤. [[emailQueue.add("receipt", { to, orderId }, { attempts, backoff, removeOnComplete: 1000 })]]

- [["receipt"]] اسم الـ job (الـ worker بيختار القالب بيه).
- الداتا ids ونصوص صغيرة، مش الطلب كله: الداتا ممكن تتغير قبل ما الـ job تشتغل، والـ worker يجيب الأحدث من القاعدة.
- options الـ job بتكسب على الـ defaults (هنا نفس القيم، مكتوبة صريحة).
- [[removeOnComplete: 1000]]: احتفظ بآخر ١٠٠٠ ناجحة بس، عشان Redis ميتملاش.

### التجربة: job بتفشل مرتين وبعدين تنجح

الـ worker في الـ solCode: [[if (job.name === "flaky" && job.attemptsMade < 2) throw new Error("boom")]]. [[attemptsMade]] عدد المحاولات اللي خلصت قبل دي.

~~~text الناتج
0.4s flaky attempt 1 pid 25184
1.4s flaky attempt 2 pid 25184
3.4s flaky attempt 3 pid 25184
3.4s flaky completed
~~~

ثانية، وبعدين ٢: [[1000 × 2^0]] و [[1000 × 2^1]]. بالـ ١٠ ثواني بتوع المثال: ١٠ وبعدين ٢٠ وبعدين ٤٠.

---

## ٥. [[maintenance.upsertJobScheduler("reconcile-payments", { every: 15 * 60_000 }, { name: "reconcile" })]]

- [["reconcile-payments"]] id ثابت للـ scheduler. [[upsert]] يعني: لو موجود حدّثه، ولو لأ اعمله.
- [[every: 15 * 60_000]] بالملّي = ٩٠٠٠٠٠ = ربع ساعة. (أو [[pattern: "*/15 * * * *"]] بصيغة cron.)
- [[{ name: "reconcile" }]] شكل الـ job اللي هتطلع كل مرة.

الـ scheduler متخزن في Redis، مش timer جوه الـ process. نادينا [[upsertJobScheduler]] **مرتين** وشغّلنا نسختين من الـ worker:

~~~text الناتج
schedulers: [ 'reconcile-payments every 3000' ]
0.4s reconcile attempt 1 pid 25184
3.4s reconcile attempt 1 pid 36152
6.4s reconcile attempt 1 pid 36152
9.5s reconcile attempt 1 pid 36152
~~~

- scheduler واحد بس رغم النداءين (نفس الـ id).
- كل ٣ ثواني job واحدة، مرة على process [[25184]] ومرة على [[36152]]، عمرها ما اشتغلت على الاتنين في نفس الميعاد. ([[setInterval]] أو node-cron في كل نسخة كان هيشغّلها مرتين.)

---

## ٦. الـ solCode: إزاي تشغّلها

- [[process.argv[2] === "seed"]]: الترمنال الأول بيضيف الـ job والـ scheduler ويشتغل worker كمان، والتاني worker بس.
- [[((Date.now() - t0) / 1000).toFixed(1) + "s"]]: الوقت من البداية بالثواني، برقم عشري واحد.
- [[process.pid]]: رقم الـ process، عشان تعرف أنهي نسخة اشتغلت.

---

## الخلاصة

| الحاجة | الكود | اللي شفناه |
|---|---|---|
| إعادة لأي job في الـ queue | [[defaultJobOptions.attempts]] | ٣ محاولات ونجحت |
| الإعادة تستنى أكتر كل مرة | [[backoff: exponential]] | ١ ث، ٢ ث |
| Redis ميتملاش | [[removeOnComplete]] | |
| شغل دوري مرة واحدة | [[upsertJobScheduler]] بـ id ثابت | job واحدة لكل ميعاد مع نسختين |

والـ queue «على الأقل مرة»، فكل job لازم تبقى idempotent.`,
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
          teach: R`## client بيحط الـ tenant في كل query لوحده

[[forTenant(id)]] بترجع نسخة من Prisma client كل query عليها بيتعدل قبل ما يتنفذ: الـ tenantId بيتحط في الـ where أو الـ data حسب نوع العملية. و [[tenantScope]] middleware بيتأكد من العضوية ويحط النسخة دي في [[req.db]]. جربناه بـ Prisma 7.10 على PostgreSQL 18 (Docker، ويندوز 11، Node 24): workspaceين A و B، ومشروع «سر A»، ومشروعين في B، وبعدين حاولنا من B بكل طريقة.

---

## ١. [[const SCOPED = new Set(["Project", "Member", "Invite"]);]]

[[Set]] مجموعة أسامي بـ [[has()]] سريعة. دي الـ models اللي فيها عمود [[tenantId]]. أي model برّاها بيعدّي زي ما هو.

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

## ٤. الحدود (من الـ deep، وجربناها)

~~~text الناتج
$queryRaw from B             [{"name":"سر A"}]
nested via workspace         ["سر A","nested"]
~~~

- [[$queryRaw]] مش model، فالامتداد مبيلمسوش: من client B قرا مشروع A.
- [[Workspace]] مش في [[SCOPED]] (هو نفسه الـ tenant)، فـ [[forTenant(b.id).workspace.update({ where: { id: a.id }, data: { projects: { create: ... } } })]] عدّت، وعملت مشروع **في A** كـ nested write. يعني [[req.db.workspace]] بـ id جاي من برّه خطر: استخدم [[req.tenant.id]] دايمًا.

ده سبب طبقة الـ RLS في الدرس الجاي.

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
| [[$queryRaw]] / nested من model مش scoped | **بيعدّي**: محتاج RLS |`,
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
- [[$queryRaw]] مش model فالـ extension مبيلفوش، ومن غير setting رجع فاضي (بدل ما يسرّب زي الدرس اللي فات).

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

### [[req.tenant = slug ? await tenantCache.bySlug(slug) : await tenantCache.byDomain(host);]]

بيتسأل مع **كل** طلب، فبيتكاش (Redis أو ذاكرة لدقيقة). في التجربة الكاش دالتين بيسألوا Prisma مباشرة.

~~~text الناتج
acme.myapp.test:6020     {"host":"acme.myapp.test","workspace":"Acme"} 200
ACME.MyApp.test          {"host":"ACME.MyApp.test","workspace":"Acme"} 200
learn.acme.test:6020     {"host":"learn.acme.test","workspace":"Acme"} 200
learn.globex.test        {"host":"learn.globex.test","workspace":"Globex"} 200
nope.myapp.test          {"error":{"code":"UNKNOWN_TENANT","message":"الموقع ده مش موجود"}} 404
evil.example             {"error":{"code":"UNKNOWN_TENANT",...}} 404
myapp.test               {"error":{"code":"UNKNOWN_TENANT",...}} 404
~~~

- البورت [[:6020]] اتشال من [[hostname]]، و [[ACME.MyApp.test]] لقت Acme بعد الـ [[toLowerCase]] (رغم إن [[hostname]] نفسه رجع بالحروف الكبيرة).
- [[myapp.test]] نفسه مش [[.myapp.test]]، فاتدوّر عليه كدومين خاص ومتلقاش. الصفحة الرئيسية للمنتج ليها route لوحدها قبل الـ middleware ده.
- **خلي بالك من [[learn.globex.test]]**: الدومين مش متأكد، ومع كده [[byDomain]] جاب Globex. Caddy مش هيطلّعله شهادة، بس لو فيه حاجة تانية قدام التطبيق (HTTP عادي أو Cloudflare)، أي حد يقدر يربط دومين حد تاني. عشان كده [[byDomain]] لازم تدوّر بـ [[domainVerifiedAt: { not: null }]] زي الـ ask بالظبط.

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
| الـ tenant من دومين خاص | [[byDomain]] بالمتأكد بس | نفس شرط الـ ask |
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
            "middleware بيحدد الـ tenant من الدومين.",
            "الدومين من الطلب، small.",
            "لو تحت الدومين الرئيسي، خد الجزء اللي قبله (الـ slug).",
            "بالـ slug أو بالدومين الخاص، من كاش. والـ byDomain لازم يدوّر على الدومينات المتأكدة بس (domainVerifiedAt مش null).",
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
          teach: R`## ترتيب الـ middleware في app.ts هو الحماية

كل [[app.use]] بيتنفذ بالترتيب لكل طلب، فالترتيب نفسه جزء من الأمان. جربنا الملف ده بـ Express 5 و helmet 8 و cors 2.8 و express-rate-limit 8.7 و cookie-parser (ويندوز 11، Node 24) على [[localhost:6020]]، وأوامر الـ solCode بـ curl من Git Bash. الـ routes في التجربة: [[/auth/login]] بيرجع 401 دايمًا، و [[/courses]]، و webhook وهمي.

---

## ١. الـ imports

[[helmet]] (headers أمان)، و [[cors]]، و [[cookieParser]] (بيقرا الـ cookies في [[req.cookies]])، و [[{ rateLimit }]] (named export من express-rate-limit).

---

## ٢. [[app.set("trust proxy", 1);]]

بتقول لـ Express: «فيه proxy واحد قدامي، صدّق آخر IP هو حطه في [[X-Forwarded-For]]». بعدها [[req.ip]] بيبقى IP الزائر مش IP الـ Nginx.

وده سلاح بحدين: في التجربة مكانش فيه Nginx، وبعتنا الطلب رقم ٢٣ بـ [[X-Forwarded-For: 1.2.3.4]]:

~~~text الناتج
--- spoofed XFF:
401
~~~

عدّى الـ rate limit (401 مش 429)، لأن Express صدّق الـ header واعتبره زائر جديد. ورا Nginx ده مش بيحصل لأن Nginx بيضيف الـ IP الحقيقي في الآخر، والـ [[1]] بتاخد الأخير. فالرقم لازم يساوي عدد الـ proxies اللي قدامك بالظبط.

---

## ٣. [[app.use(helmet());]]

بيحط حوالي ١٣ header على كل رد:

~~~text الناتج (من رد /courses)
Content-Security-Policy: default-src 'self';base-uri 'self';...;frame-ancestors 'self';object-src 'none';script-src 'self';...
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: no-referrer
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
~~~

| الـ header | بيمنع إيه |
|---|---|
| [[Content-Security-Policy]] | سكربتات من دومينات تانية، و [[frame-ancestors]] بيمنع حد يحطك في iframe |
| [[Strict-Transport-Security]] | المتصفح يكلّمك HTTP عادي سنة كاملة ([[31536000]] ثانية) |
| [[X-Content-Type-Options: nosniff]] | المتصفح يخمّن نوع الملف (ملف نصي يتشغّل JS) |
| [[X-Frame-Options]] | نفس فكرة frame-ancestors للمتصفحات القديمة |

ومفيش [[X-Powered-By: Express]]: helmet شاله، فمش بتعلن إنت شغال على إيه.

---

## ٤. [[app.use("/webhooks", webhooksRouter);]]

قبل CORS والـ JSON العام، لأن البوابة سيرفر مش متصفح، وكل بوابة ليها parser (Stripe عايزة [[express.raw]]). في التجربة الـ webhook عنده [[express.json()]] بتاعه، وحده الافتراضي ١٠٠ كيلو برضه:

~~~text الناتج
{"error":{"code":"TOO_LARGE","message":"الطلب كبير"}} 413   ← /webhooks/paymob
~~~

---

## ٥. [[app.use(cors({ origin: [config.WEB_ORIGIN], credentials: true }));]]

- [[origin]]: array فيها دومين الواجهة بس ([[http://localhost:3000]] في التجربة).
- [[credentials: true]]: المتصفح يقدر يبعت cookies ويقرا الرد. ومعاها مينفعش [[*]].

~~~text الناتج
--- evil origin:
HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true
(مفيش Access-Control-Allow-Origin)
--- good origin:
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
~~~

الطلب من [[evil.example]] رجع **200** والسيرفر نفّذه عادي. الفرق إن [[Access-Control-Allow-Origin]] مش موجود، فالمتصفح مش هيدّي الصفحة الغريبة الرد. CORS قرار المتصفح، مش حماية للسيرفر من curl. و [[Vary: Origin]] بيقول للـ CDN إن الرد بيختلف حسب الـ Origin فميخلطش بينهم.

---

## ٦. [[app.use(express.json({ limit: "100kb" }));]]

~~~text الناتج
1000008                                          ← حجم big.json بالـ byte
{"error":{"code":"TOO_LARGE","message":"الطلب كبير"}} 413
~~~

[[node -e '...JSON.stringify({ x: "a".repeat(1e6) })' > big.json]] عمل ملف ميجا تقريبًا (مليون [[a]] + ٨ حروف الـ JSON). الـ parser رمى خطأ [[type: "entity.too.large"]]، والـ error handler بتاعنا حوّله 413 (Payload Too Large).

## ٧. [[app.use(cookieParser());]]

بيقرا header الـ [[Cookie]] ويحطه object في [[req.cookies]] (منه بيتقري الـ refresh token).

---

## ٨. [[app.use("/auth", rateLimit({ windowMs: 15 * 60e3, limit: 20, standardHeaders: "draft-8", legacyHeaders: false }));]]

- [["/auth"]]: على مسارات الـ auth بس.
- [[windowMs: 15 * 60e3]]: [[60e3]] = ٦٠٠٠٠ ملّي = دقيقة، يعني ربع ساعة.
- [[limit: 20]]: ٢٠ طلب لكل IP في الربع ساعة.
- [[standardHeaders: "draft-8"]]: headers بالشكل الجديد [[RateLimit]] و [[RateLimit-Policy]]، و [[legacyHeaders: false]] يلغي القديمة ([[X-RateLimit-*]]).

~~~text الناتج
401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 429
HTTP/1.1 429 Too Many Requests
RateLimit: "20-in-15min"; r=0; t=899
RateLimit-Policy: "20-in-15min"; q=20; w=900; pk=:YmIwY2Q1MTM2YWU1:
Retry-After: 899
~~~

- [[r=0]] فاضل صفر طلبات، و [[t=899]] ثانية لحد ما النافذة تتصفّر.
- [[q=20]] الحد، و [[w=900]] النافذة بالثواني.
- [[Retry-After]] نفس الرقم بالثواني.

والرد نفسه نص مش JSON: [[Too many requests, please try again later.]]. لو الواجهة بتتوقع شكل الأخطاء بتاعك، ضيف [[handler]] أو [[message]] بالـ JSON في الإعدادات.

---

## ٩. [[app.use(routes);]] و [[app.use(errorHandler);]]

الـ routes بعد كل الحمايات، والـ error handler **آخر** حاجة: Express بيعرفه لأنه دالة بـ ٤ arguments، وبيوصله أي خطأ من أي حاجة قبله.

---

## الخلاصة

| السطر | اللي شفناه |
|---|---|
| [[trust proxy, 1]] | IP صح ورا Nginx، و XFF مزيّف يعدّي لو مفيش proxy |
| [[helmet()]] | CSP و HSTS و nosniff، ومفيش X-Powered-By |
| webhooks الأول | parser خاص لكل بوابة |
| [[cors]] | الرد بيرجع 200، بس من غير Allow-Origin للغريب |
| [[limit: "100kb"]] | ميجا → 413 |
| [[rateLimit]] | الطلب ٢١ → 429 و [[Retry-After: 899]] |
| [[errorHandler]] آخر | بيلقط كل حاجة |`,
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
          teach: R`## cache-aside: دوّر في Redis، ولو مش موجود هات من القاعدة واحفظ

[[getCourse]] بتسأل Redis الأول، ولو ملقتش بتجيب الكورس بدروسه من القاعدة وتحفظه ٥ دقايق. و [[updateCourse]] بتعدّل في القاعدة وتمسح الـ key. جربناهم بـ ioredis 6 على Redis 8 و Prisma 7 على PostgreSQL 18 (الاتنين Docker، ويندوز 11، Node 24)، على كورس فيه ٢٢ درس، وشغّلنا قياس الـ solCode.

---

## ١. [[const key = $__btcourse:$__{slug}:v1$__bt;]]

اسم الـ key: نوع الحاجة، والـ slug، ورقم نسخة. لو شكل الداتا المتخزنة اتغير (ضفت حقل)، بتغيّر [[v1]] لـ [[v2]] في الكود، فكل القديم بيتجاهل لوحده ويموت بالـ TTL.

## ٢. [[const hit = await redis.get(key);]] و [[if (hit) return JSON.parse(hit);]]

Redis بيخزن نصوص، فبنحفظ JSON ونفكه. لو [[hit]] بـ [[null]] (مش موجود) نكمّل للقاعدة.

> خلي بالك: الـ JSON مفيهوش نوع Date. [[createdAt]] من القاعدة بيبقى [[Date]]، ومن الكاش بيرجع نص:
>
> ~~~text الناتج
> createdAt type from cache: string
> ~~~
>
> فأي كود بيعمل [[course.createdAt.getTime()]] هيقع لما الرد ييجي من الكاش بس. حوّله بـ [[new Date(...)]] أو ابعته للواجهة زي ما هو.

## ٣. [[db.course.findUnique({ where: { slug }, include: { lessons: { select: { id: true, title: true, isPreview: true } } } })]]

[[include]] بيجيب العلاقة مع الكورس، و [[select]] جواها بيحدد خانات الدروس: من غير [[videoKey]]، عشان الكاش ده عام ومحدش يطلع منه مكان الفيديو.

~~~text الناتج (خانات اللي اتخزن)
id,slug,title,summary,priceCents,published,level,enrollCount,coverKey,coverReady,instructorId,createdAt,lessons | lessons: 22
~~~

## ٤. [[if (course) await redis.set(key, JSON.stringify(course), "EX", 300);]]

- [[if (course)]]: منكاشش [[null]] (slug مش موجود)، وإلا كورس يتعمل بعدها يفضل «مش موجود» ٥ دقايق.
- [["EX", 300]]: ينتهي بعد ٣٠٠ ثانية.

~~~text الناتج
TTL: 300
~~~

[[redis.ttl(key)]] فاضل كام ثانية (-1 لو من غير مدة، و -2 لو مش موجود).

---

## ٥. [[updateCourse]]: عدّل وبعدين امسح

[[db.course.update]] الأول، وبعدين [[redis.del]] بالـ slug اللي رجع من التعديل. الطلب الجاي هيلاقي الكاش فاضي فيجيب الجديد.

~~~text الناتج
with del -> title: SQL 2026 TTL: 300
without del -> title: SQL TTL: 300
~~~

من غير الـ [[del]] (التجربة بتاعة الـ [[try]])، العنوان فضل القديم لحد ما الـ ٣٠٠ ثانية يخلصوا. ده دور الـ TTL: شبكة أمان، مش طريقة التحديث.

---

## ٦. القياس (الـ solCode)

1. [[await getCourse(slug)]] مرة عشان الكاش يتملي.
2. [[performance.now()]] وقت بالملّي بكسور، و ١٠٠ نداء، والمتوسط [[/ 100]].
3. وبعدين ١٠٠ نداء وقبل كل واحد [[redis.del]]، يعني كل مرة من القاعدة.

~~~text الناتج
مع كاش 0.49 ms
من غير كاش 4.28 ms
~~~

حوالي ٩ مرات. والقاعدة هنا على نفس الجهاز ومش عليها ضغط، والرقم التاني فيه كمان أمر [[del]]. في الإنتاج الفرق الأهم إن القاعدة مبتشوفش الطلبات دي أصلًا.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اسم فيه نسخة | [[course:$__{slug}:v1]] |
| موجود؟ رجّعه | [[redis.get]] + [[JSON.parse]] |
| مش موجود؟ القاعدة واحفظ ٥ دقايق | [[redis.set(key, json, "EX", 300)]] |
| اتعدل؟ امسح | [[redis.del(key)]] بعد الـ update |
| نسيت المسح؟ | الـ TTL بيصلّحها بعد ٥ دقايق |

والتواريخ بترجع من الكاش نصوص، والداتا الخاصة بمستخدم متتحطش تحت key عام.`,
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
          teach: R`## ٤ أوامر SQL: شوف الخطة، اعمل index، شوف تاني، ودوّر على الأتقل

جربنا الأربع سطور على PostgreSQL 18 في Docker بـ [[psql]]، على مليون طلب لـ ١٠ آلاف مستخدم (seed الـ solCode)، والـ container متشغّل بـ [[-c shared_preload_libraries=pg_stat_statements]]. وجزء الـ N+1 جربناه بـ Prisma 7 (ويندوز 11، Node 24).

> الـ seed القديم في الـ solCode كان بيعمل طلبات لـ [[u_0]] لحد [[u_9999]] من غير ما المستخدمين يبقوا موجودين، وجدول [[Order]] عليه foreign key لـ [[User]]، فوقع: [[ERROR: insert or update on table "Order" violates foreign key constraint "Order_userId_fkey"]]. ضفنا [[INSERT INTO "User"]] قبله. والـ INSERT بتاع المليون خد حوالي ١٥ ثانية.
>
> ولو عامل الـ schema بتاعة درس «schema.prisma»، فيها أصلًا [[@@index([userId, createdAt])]] على Order، فاحذفه الأول عشان تشوف الفرق.

---

## ١. [[EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;]]

[[EXPLAIN]] بيوريك الخطة اللي القاعدة اختارتها، و [[ANALYZE]] بينفّذ الاستعلام فعلًا ويكتب الأوقات الحقيقية.

~~~text الناتج (مختصر)
Limit (actual time=36.386..48.993 rows=20)
  ->  Gather Merge (rows=20)
        Workers Planned: 2
        Workers Launched: 2
        ->  Sort (actual time=28.226..28.228 rows=17.33 loops=3)
              Sort Key: "createdAt" DESC
              Sort Method: quicksort  Memory: 27kB
              ->  Parallel Seq Scan on "Order" (cost=0.00..23900.33 rows=42) (actual time=8.090..28.131 rows=33.33 loops=3)
                    Filter: ("userId" = 'u_1'::text)
                    Rows Removed by Filter: 333300
Execution Time: 49.021 ms
~~~

اقراها من تحت لفوق (من جوه لبرّه):

1. [[Parallel Seq Scan]]: قرا الجدول كله، مقسوم على ٣ processes ([[loops=3]]: الأساسي + [[Workers Launched: 2]]). كل واحد رمى حوالي ٣٣٣ ألف صف ([[Rows Removed by Filter]]) ولقى حوالي ٣٣.
2. [[rows=42]] في الـ cost تقدير القاعدة لكل worker، و [[rows=33.33]] الفعلي. قريبين، فالإحصائيات كويسة.
3. [[Sort]]: رتّب اللي لقاهم بـ [[createdAt DESC]].
4. [[Gather Merge]]: جمع نتايج الـ workers مرتبة.
5. [[Limit]]: خد ٢٠.

[[actual time=أول..آخر]] بالملّي: إمتى طلع أول صف وإمتى آخر واحد.

---

## ٢. [[CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);]]

- [[("userId", "createdAt" DESC)]]: index مركّب. الصفوف فيه متجمعة بالمستخدم، وجوه كل مستخدم مرتبة بالأحدث. عمود المساواة الأول، وعمود الترتيب بعده.
- [[CONCURRENTLY]]: يتبني من غير ما يقفل الكتابة على الجدول (أبطأ شوية: خد حوالي ١.٤ ثانية هنا). ومينفعش جوه transaction:

~~~text الناتج
BEGIN;
CREATE INDEX CONCURRENTLY x_idx ON "Order"(status);
ERROR:  CREATE INDEX CONCURRENTLY cannot run inside a transaction block
~~~

---

## ٣. نفس الاستعلام تاني

~~~text الناتج
Limit (actual time=0.035..0.068 rows=20)
  ->  Index Scan using order_user_created_idx on "Order" (actual time=0.034..0.064 rows=20)
        Index Cond: ("userId" = 'u_1'::text)
        Index Searches: 1
Execution Time: 0.085 ms
~~~

- [[Index Scan]]: راح للـ index على طول، وقرا ٢٠ صف بس ووقف.
- مفيش [[Sort]] خالص: الـ index متخزن بالترتيب المطلوب.
- [[49.021]] → [[0.085]] ملّي: حوالي ٥٧٠ مرة.

---

## ٤. [[SELECT query, calls, round(mean_exec_time) AS ms FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;]]

[[pg_stat_statements]] view بيجمّع كل استعلام اتنفذ: النص بعد ما القيم تتحول [[$1]] و [[$2]]، وعدد المرات ([[calls]])، ومتوسط الوقت ([[mean_exec_time]] بالملّي). محتاج [[CREATE EXTENSION pg_stat_statements]] في القاعدة، ومن غير [[shared_preload_libraries]] هيقولك إنه مش متحمّل.

~~~text الناتج (أول ٣)
 query                                                                  | calls |  ms
 INSERT INTO "Order" (...) SELECT $1 || g, $2 || (g % $3), ...          |     1 | 14808
 CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" (...)      |     1 |  1407
 INSERT INTO "Course" (...) SELECT $1 || g, ...                         |     1 |   868
~~~

الـ seed نفسه طلع الأتقل. و [[ORDER BY total_exec_time]] (الوقت الكلي = المتوسط × عدد المرات) عشان استعلام ٢ ملّي بيتنادى مليون مرة يظهر فوق.

---

## ٥. N+1 (الـ solCode)

[[new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] })]] بيطلّع event مع كل استعلام، و [[db.$on("query", () => n++)]] بيعدّهم.

~~~text الناتج
3 courses -> loop: 4
    SELECT "Course"."id", "Course"."slug", ... FROM "Course" ...
    SELECT "Lesson"."id", ... FROM "Lesson" WHERE ...
    SELECT "Lesson"."id", ... FROM "Lesson" WHERE ...
    SELECT "Lesson"."id", ... FROM "Lesson" WHERE ...
3 courses -> include: 2
100 courses -> loop: 101
100 courses -> include: 2
100 courses -> _count: 1
~~~

- الـ loop: استعلام للقايمة + واحد لكل كورس = N+1.
- [[include: { lessons: true }]]: ٢ مهما كان العدد (الكورسات، وبعدين كل الدروس بـ [[IN (...)]]).
- [[include: { _count: { select: { lessons: true } } }]] (اللي في الـ desc): استعلام واحد لو محتاج العدد بس.

---

## الخلاصة

| الأداة | بتقولك إيه |
|---|---|
| [[EXPLAIN ANALYZE]] | الخطة الفعلية: [[Seq Scan]] ولا [[Index Scan]]، وفيه [[Sort]] ولا لأ |
| index [[(userId, createdAt DESC)]] | ٤٩ ملّي → ٠.٠٨٥ ملّي، ومن غير Sort |
| [[CONCURRENTLY]] | من غير قفل، وبرّه أي transaction |
| [[pg_stat_statements]] | أتقل استعلامات بالوقت الكلي |
| log الـ queries | N+1: ١٠١ استعلام بقوا ٢ |`,
          lines: [
            "خطة التنفيذ الفعلية ووقتها. قبل الـ index هتلاقي Seq Scan وبعدين Sort.",
            "index مركّب على المستخدم والتاريخ، من غير ما يقفل الكتابة.",
            "نفس الاستعلام تاني. هتلاقي Index Scan ومفيش Sort، والوقت أقل بكتير.",
            "أتقل ١٠ استعلامات في القاعدة: عدد مرات التشغيل ومتوسط الوقت بالملّي ثانية."
          ],
          sol: R`على مليون طلب ومستخدم عنده ١٠٠ طلب: قبل الـ index الـ plan كان [[Parallel Seq Scan on "Order"]] ومعاه [[Workers Launched: 2]]، والوقت حوالي [[34 ms]]. بعد الـ index بقى [[Index Scan using order_user_created_idx]]، والوقت حوالي [[0.07 ms]]، ومفيش [[Sort]] خالص، لأن الـ index متخزن بالترتيب اللي الاستعلام عايزه. الأرقام بتختلف حسب جهازك، بس الفرق بالمئات.

آخر سطر (pg_stat_statements) هيرجع [[relation "pg_stat_statements" does not exist]] لو الـ extension مش شغال: محتاج [[shared_preload_libraries = 'pg_stat_statements']] في الإعدادات، و restart، و [[CREATE EXTENSION pg_stat_statements]]. في القواعد المُدارة غالبًا بيبقى شغال من الأول.

الـ N+1: صفحة بتلف على ٣ كورسات وتجيب دروس كل واحد لوحده بتطلّع [[4]] استعلامات في الترمنال (١ + ٣)، ومع ١٠٠ كورس بتبقى ١٠١. بعد [[include: { lessons: true }]] بقوا [[2]] مهما كان العدد. ولو [[CREATE INDEX CONCURRENTLY]] وقع بـ [[cannot run inside a transaction block]]، يبقى انت شغّله جوه migration أو BEGIN، شغّله لوحده.`,
          solCode: R`-- seed: مليون طلب على ١٠ آلاف مستخدم (المستخدمين الأول، عشان الـ foreign key)
INSERT INTO "User" (id, name, email)
SELECT 'u_' || g, 'User ' || g, 'u' || g || '@example.com' FROM generate_series(0, 9999) g;
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
<Image src={course.coverUrl} alt={course.title} width={1200} height={675} sizes="(max-width: 768px) 100vw, 800px" fetchPriority="high" loading="eager" />

import { onLCP, onINP, onCLS } from "web-vitals";
const send = (m) => navigator.sendBeacon("/api/vitals", JSON.stringify({ name: m.name, value: m.value, rating: m.rating, page: location.pathname }));
onLCP(send); onINP(send); onCLS(send);`,
          try: R`افتح صفحة كورس على موبايل حقيقي بـ 4G، وشغّل Lighthouse بـ throttling. شوف أنهي عنصر هو الـ LCP. ضيف [[fetchPriority="high"]] و [[loading="eager"]] للغلاف وقيس تاني. بعدين ركّب web-vitals واجمع الأرقام من زوار حقيقيين أسبوع.`,
          flag: "script",
          deep: {
            why: "جهازك سريع ونتك سريع، والطالب على موبايل متوسط و 4G بتقطع. الصفحة اللي بتفتح عندك في ثانية ممكن تاخد ٦ عنده، ونص الناس بيقفلوا قبل ما تفتح. والأرقام دي بتأثر على ترتيبك في جوجل كمان.",
            how: R`LCP غالبًا صورة الغلاف أو العنوان الكبير. عشان يبقى سريع: السيرفر يرد بسرعة (كاش أو SSR)، والصورة من CDN بصيغة AVIF أو WebP بالمقاس المناسب، ومتبقاش lazy. و [[fetchPriority="high"]] بيقول للمتصفح «دي أولوية». بس next/image بيحط [[loading="lazy"]] افتراضيًا حتى لو حطيت [[fetchPriority]] (جربناها في Next 16.4)، فلازم معاه [[loading="eager"]] أو تستخدم [[preload]] لوحده. وفي Next 16، الـ [[priority]] القديمة بقت deprecated، والبديل [[preload]]، أو [[fetchPriority]]، أو [[loading="eager"]]. والصور من دومين تاني محتاجة [[images.remotePatterns]] في next.config.

INP بيتأثر بالـ JavaScript. أي task طويلة على الـ main thread بتأخر رد الضغطة. قلل الـ JS: Server Components للحاجات اللي مش تفاعلية، وحمّل المكونات التقيلة ([[dynamic import]]) لما تتطلب، ومتستوردش مكتبة كاملة عشان دالة واحدة.

CLS: [[width]] و [[height]] على كل صورة، عشان المتصفح يحجز مكانها قبل ما تحمّل. ومكان محجوز للبانرات. والخطوط بـ next/font، اللي بيظبط مقاسات الخط البديل عشان النص ميتنططش لما الخط الحقيقي يحمّل.

والـ CDN (زي Cloudflare قدام الـ VPS) بيخدم الملفات من أقرب مدينة للزائر. الملفات اللي في اسمها hash بتتكاش سنة، والـ HTML لفترة قصيرة أو مبيتكاشش خالص. والفيديو مكانه خدمة فيديو بـ HLS، مش mp4 من السيرفر.

Lighthouse قياس معمل. الحقيقة من زوار حقيقيين: مكتبة web-vitals في كودك، أو تقرير CrUX بتاع جوجل. وقياس INP لازم يبقى من زوار حقيقيين، لأنه محتاج تفاعل.`,
            when: "قبل الإطلاق على الصفحات العامة (الرئيسية، والكورسات، وصفحة الكورس)، وبعد أي تغيير كبير في الواجهة.",
            mistakes: "إنك تحسّن رقم Lighthouse على اللابتوب بتاعك وبس. أو تعمل lazy لصورة الـ LCP نفسها. أو تنسى width و height فالصفحة تتنطط. أو تستورد مكتبة تواريخ أو أيقونات كاملة. أو تعرض الفيديو mp4 مباشرة من السيرفر."
          },
          teach: R`## صورة الـ LCP بأولوية ومقاسات محجوزة، والأرقام من زوار حقيقيين

السطرين الأولانيين صورة الغلاف بـ [[next/image]]، والتلاتة اللي بعدهم بيقيسوا LCP و INP و CLS في متصفح الزائر ويبعتوهم للسيرفر. جربناهم في Next.js 16.4 (React 19) و web-vitals 6.2 بـ [[next build]] و [[next start]] (ويندوز 11، Node 24)، وفتحنا الصفحة في Chrome headless بـ playwright بشاشة موبايل (٤١٢×٨٢٣) و throttling (نت 1.6 ميجابت و latency ١٥٠ ملّي، و CPU أبطأ ٤ مرات). الصورة ٤٠٠٠×٢٢٥٠ JPEG حجمها ٦.٨ ميجا. Lighthouse مش متسطب هنا، فجزؤه من وثائق جوجل.

> اكتشفنا إن [[fetchPriority="high"]] لوحده مش كفاية في Next 16: الـ HTML اللي طلع كان [[<img fetchPriority="high" loading="lazy" ...>]]. يعني صورة الـ LCP نفسها lazy، ودي بالظبط الغلطة اللي الـ [[mistakes]] بيحذر منها. ضفنا [[loading="eager"]] للمثال.

---

## ١. [[import Image from "next/image";]]

component بيطلّع [[<img>]] عادي، بس بيعمل [[srcset]] بمقاسات كتير، والصور بتعدّي على [[/_next/image]] اللي بيصغّرها ويحوّلها WebP أو AVIF حسب المتصفح.

## ٢. [[<Image src alt width={1200} height={675} sizes="..." fetchPriority="high" loading="eager" />]]

### [[width={1200} height={675}]]

مش مقاس العرض، دي **النسبة** (١٦:٩). المتصفح بيحجز مكان الصورة قبل ما تحمّل، فالمحتوى اللي تحتها ميتنططش. وقسناها:

~~~text الناتج (من web-vitals)
{"msg":"web-vital","name":"CLS","value":0,"rating":"good","page":"/ar/courses/sql"}
~~~

### [[sizes="(max-width: 768px) 100vw, 800px"]]

بيقول للمتصفح الصورة هتتعرض بأنهي عرض: على شاشة ٧٦٨ أو أقل عرض الشاشة كله ([[100vw]])، وغير كده ٨٠٠ بكسل. المتصفح بيضرب ده في كثافة الشاشة ويختار من الـ [[srcSet]]:

~~~text الناتج (الـ srcSet اللي Next طلّعه، مختصر)
/_next/image?url=%2Fcover-big.jpg&w=640&q=75 640w, ...&w=750 750w, ...&w=828 828w, ...&w=1080 1080w,
...&w=1200 1200w, ...&w=1920 1920w, ...&w=2048 2048w, ...&w=3840 3840w
~~~

الموبايل (٤١٢ × كثافة 2.625 = ١٠٨٢) طلب [[w=1200]]، والسيرفر رد [[image/webp]] حجمها ٢٠١٧٩٨ byte بدل ٦.٨ ميجا. و [[q=75]] الجودة الافتراضية.

### [[fetchPriority="high"]] و [[loading="eager"]]

| اللي كتبناه | اللي طلع في الـ HTML | preload؟ |
|---|---|---|
| ولا حاجة | [[loading="lazy"]] | لأ |
| [[fetchPriority="high"]] | [[fetchPriority="high" loading="lazy"]] | لأ |
| + [[loading="eager"]] | [[fetchPriority="high" loading="eager"]] | أيوه [[<link rel="preload" as="image" imageSrcSet=...>]] |
| [[preload]] لوحده | من غير lazy | أيوه |

وقسنا ٣ مرات لكل واحدة:

~~~text الناتج
prio  LCP 2228ms (IMG) img request started at 424ms | LCP 2204ms ... at 446ms | LCP 2232ms ... at 439ms
eager LCP 2260ms (IMG) img request started at 218ms | LCP 2240ms ... at 201ms | LCP 2220ms ... at 193ms
~~~

- عنصر الـ LCP هو الـ [[IMG]] زي ما الدرس بيقول.
- مع [[eager]] الطلب بدأ بعد حوالي ٢٠٠ ملّي بدل ٤٤٠: المتصفح عرفه من الـ preload في الـ [[<head>]] من غير ما يستنى الـ layout.
- الـ LCP نفسه طلع قريب في الحالتين هنا (حوالي ٢.٢ ثانية)، لأن الصفحة دي مفيهاش حاجة تانية بتتحمّل، والوقت كله في تنزيل الصورة على نت بطيء. في صفحة حقيقية فيها CSS و JS بيتنافسوا على النت، البداية المبكرة هي اللي بتفرق.

---

## ٣. [[import { onLCP, onINP, onCLS } from "web-vitals";]]

مكتبة جوجل الصغيرة اللي بتحسب المقاييس بنفس طريقة Chrome. كل دالة بتاخد callback بيتنادى لما الرقم يبقى جاهز (غالبًا لما الزائر يسيب الصفحة أو يخفيها).

## ٤. [[const send = (m) => navigator.sendBeacon("/api/vitals", JSON.stringify({ name, value, rating, page }));]]

- [[m.name]] اسم المقياس، و [[m.value]] الرقم (ملّي للـ LCP و INP، ومن غير وحدة للـ CLS)، و [[m.rating]] [[good]] أو [[needs-improvement]] أو [[poor]].
- [[navigator.sendBeacon]]: POST صغير المتصفح بيضمن إرساله حتى والصفحة بتتقفل، عكس [[fetch]] اللي ممكن يتلغي.

## ٥. [[onLCP(send); onINP(send); onCLS(send);]]

في التجربة حطيناهم جوه [[useEffect]] في client component. والسيرفر (الـ solCode: [[app/api/vitals/route.ts]]) طبع اللي وصله:

~~~text الناتج (next.log)
{"msg":"web-vital","name":"LCP","value":2228,"rating":"good","page":"/ar/courses/sql"}
{"msg":"web-vital","name":"INP","value":0,"rating":"good","page":"/ar/courses/sql"}
{"msg":"web-vital","name":"CLS","value":0,"rating":"good","page":"/ar/courses/sql"}
~~~

الـ LCP ٢٢٢٨ ملّي ([[good]] لأنه تحت ٢٥٠٠). و INP صفر لأن الضغطة كانت على عنوان مفيش عليه JavaScript. و [[new Response(null, { status: 204 })]] رد فاضي.

---

## الخلاصة

| المقياس | الحد الكويس (p75) | اللي بيحسّنه في المثال |
|---|---|---|
| LCP | ≤ ٢.٥ ثانية | [[sizes]] + WebP من [[/_next/image]] + [[fetchPriority]] و [[loading="eager"]] |
| INP | ≤ ٢٠٠ ملّي | JS أقل (مش في السطور دي) |
| CLS | ≤ 0.1 | [[width]] و [[height]] |

والقياس الحقيقي من الزوار بـ web-vitals و [[sendBeacon]]، مش من Lighthouse على جهازك.`,
          lines: [
            "component الصور بتاع Next.js.",
            "صورة الغلاف: مقاسات محجوزة (CLS)، و sizes عشان يختار المقاس الصح، وأولوية عالية و eager لأنها الـ LCP (next/image بيحط lazy افتراضيًا حتى مع fetchPriority).",
            "مكتبة القياس من زوار حقيقيين.",
            "ابعت كل رقم للسيرفر بـ sendBeacon، وده بيوصل حتى لو الزائر قفل الصفحة.",
            "اسمع على التلات مقاييس."
          ],
          sol: R`في Lighthouse (وضع Mobile، وهو بيعمل throttling لوحده) هتلاقي في قسم Diagnostics بند [[Largest Contentful Paint element]] بيقولك مين الـ LCP. في صفحة كورس غالبًا هو صورة الغلاف. قبل [[fetchPriority="high"]] و [[loading="eager"]] هتلاقي الصورة بتبدأ تحمل متأخر في الـ waterfall بعد الـ CSS والـ JS. بعدهم بتبدأ بدري مع أول الطلبات (جربناها في Chrome بـ throttling: الطلب بدأ عند حوالي ٢٠٠ ملّي بدل ٤٤٠)، والـ LCP بيقل بقد ما الصورة كانت مستنية ورا ملفات تانية. في صفحة صغيرة مفيهاش حاجة تانية بتتحمّل، الفرق في الـ LCP نفسه ممكن ميبانش. الرقم نفسه بيختلف كل تشغيلة، فشغّل ٣ مرات وخد المتوسط. المقاييس الرسمية: LCP كويس تحت 2.5 ثانية، و INP تحت 200ms، و CLS تحت 0.1.

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
