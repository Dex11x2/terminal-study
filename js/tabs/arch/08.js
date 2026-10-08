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
const like = (s) => s.replace(/[\\%_]/g, "\\$&");
router.get("/courses", async (req, res) => {
  const f = CourseQuery.parse(req.query);
  const where = {
    published: true,
    ...(f.q && { OR: [{ title: { contains: like(f.q), mode: "insensitive" } }, { summary: { contains: like(f.q), mode: "insensitive" } }] }),
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

### [[const like = (s) => s.replace(/[\\%_]/g, "\\$&");]]

[[contains]] بيتحوّل في SQL لـ [[ILIKE '%كلمة%']]، وجوه LIKE فيه حرفين ليهم معنى: [[%]] = «أي عدد حروف»، و [[_]] = «أي حرف واحد». و Prisma مبيهربهمش. فلو المستخدم كتب [[%]] هيلاقي كل حاجة، ولو كتب [[e_c]] هيلاقي «React» (e ثم أي حرف ثم c). جربناها على ٤ كورسات: «React من الصفر» و «SQL» و «خصم 50% على Python» و «snake_case في Python»:

~~~text الناتج
"%"     من غير like():  React من الصفر | SQL | خصم 50% على Python | snake_case في Python
"%"     بـ like():      خصم 50% على Python
"_"     من غير like():  الأربعة
"_"     بـ like():      snake_case في Python
"e_c"   من غير like():  React من الصفر | snake_case في Python
"e_c"   بـ like():      snake_case في Python
~~~

السطر من جوه لبرة:

- [[/[\\%_]/g]]: regex. الأقواس المربعة [[[ ]]] معناها «أي حرف من دول»: [[\\]] (الـ backslash نفسه، مكتوب مرتين لأنه حرف خاص في الـ regex)، و [[%]]، و [[_]]. و [[g]] = كل المرات مش أول مرة بس.
- [[s.replace(regex, "\\$&")]]: [[$&]] في نص الاستبدال معناها «الحرف اللي اتلقى»، و [[\\]] في نص JavaScript = backslash واحد. يعني كل حرف من التلاتة بيبقى قبله [[\]]: [[50%]] ← [[50\%]].
- ليه backslash؟ لأنه حرف الـ escape الافتراضي في LIKE بتاع PostgreSQL: [[\%]] معناها «علامة % عادية». والـ backslash نفسه بيتهرب عشان المستخدم ميكتبش [[\]] ويبوّظ الـ pattern.

---

## ٣. بناء الـ where

### [[published: true]]

دايمًا: المنشور بس.

### [[...(f.q && { OR: [{ title: { contains: like(f.q), mode: "insensitive" } }, { summary: { ... } }] })]]

نفس حيلة درس «ownership»: لو [[f.q]] موجود ومش فاضي، [[&&]] بترجع الـ object ويتفرد. ولو فاضي ([[""]] قيمة falsy) أو [[undefined]] مفيش حاجة تتضاف. و [[contains]] + [[mode: "insensitive"]] = «فيه الكلمة دي في أي مكان، من غير فرق بين capital و small»، و [[like(f.q)]] عشان [[%]] و [[_]] يتدوّر عليهم كحروف.

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

> النسخة الأولى من الدرس كانت بتبعت [[f.q]] زي ما هو، و [[?q=%]] و [[?q=_]] رجّعوا كل الكورسات المنشورة. هنا مكانتش بتسرّب حاجة (المنشور بس وبحد ٢٠)، بس نفس الكود على جدول خاص (طلبات، أو مستخدمين في لوحة) بيخلي حرف واحد يرجّع كل حاجة، وبيخلي البحث عن «50%» يلاقي حاجات غلط. عشان كده [[like()]].

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
| [[%]] و [[_]] حروف عادية | [[like()]] بيحط [[\]] قبلهم |
| سرعة مع الحجم | GIN + pg_trgm على كل عمود في الـ OR |`,
          lines: [
            "شكل الفلاتر المسموحة.",
            "كلمة البحث: من غير مسافات على الأطراف، و ١٠٠ حرف بالكتير.",
            "المستوى من قايمة ثابتة.",
            "الترتيب من ٣ اختيارات، والافتراضي الأحدث.",
            "قفلة.",
            "كل اختيار ترتيب وتحويله، والـ client عمره ما بيبعت اسم عمود.",
            "حط [[\\]] قبل [[%]] و [[_]] و [[\\]] نفسها، عشان الكلمة تتدوّر بحروفها مش كـ wildcards.",
            "مسار القايمة العامة.",
            "اتأكد من الفلاتر. أي قيمة غريبة ترجع 400.",
            "ابني الشرط:",
            "المنشور بس.",
            "لو فيه بحث: في العنوان أو الملخص (بعد الـ escape)، من غير فرق بين الحروف الكبيرة والصغيرة.",
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
    }
]);
