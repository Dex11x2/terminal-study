// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("sec", {
  label: "security",
  prompt: "$ ",
  lab: R`# بيئة تدريب قانونية على جهازك
docker run -d -p 3000:3000 bkimminich/juice-shop`,
  labText: "اختبر مشاريعك انت، أو مواقع معاك إذن كتابي صريح، أو بيئات تدريب زي OWASP Juice Shop. أي scan على موقع مش بتاعك من غير إذن مخالف للقانون. الهدف هنا تأمين كودك، مش الهجوم.",
  levels: {
    "1": ["البداية", "القواعد القانونية وطريقة تفكير اللي بيأمّن"],
    "2": ["المتوسط", "أشهر الثغرات، وإزاي تقفلها في كودك"],
    "3": ["المتقدم", "أدوات الفحص، وأسرار وبورتات السيرفر، والتشيك ليست قبل ما ترفع"]
  },
  categories: [
    {
      t: "القواعد قبل أي حاجة",
      l: 1,
      n: "اختبار الاختراق أداة لتأمين مشاريعك انت، مش لعب على مواقع الناس",
      items: [
        {
          cmd: "القاعدة القانونية",
          title: "تختبر مين، ومين لأ",
          desc: "مسموح تختبر: مواقعك ومشاريعك، وأي موقع معاك منه إذن مكتوب صريح، والمواقع المخصصة للتدريب. ممنوع تمامًا: أي موقع تاني، حتى لو «بس scan» وحتى لو نيتك تبلّغه. في مصر ده تحت قانون مكافحة جرائم تقنية المعلومات ٢٠١٨، والعقوبة حبس وغرامة. كمان أي scan بيتسجّل في لوجات السيرفر بالـ IP بتاعك.",
          example: R`# للتدريب القانوني: بيئات معمولة عشان تخترقها
# OWASP Juice Shop (تشغّلها على جهازك)
docker run -d -p 3000:3000 bkimminich/juice-shop
# DVWA (على جهازك بـ Docker)، و PortSwigger Web Security Academy (مجاني وأونلاين)`,
          try: "شغّل Juice Shop على جهازك، وده موقع فيه ثغرات بالتصميم عشان تتمرن عليه بأمان.",
          flag: "term",
          deep: {
            why: "قبل ما تتعلم أي أداة أمان، محتاج تعرف الخط الفاصل بين «تأمين مشروعي» و«اختبار مواقع الناس».",
            how: R`اختبار الاختراق مسموح بس على: مواقعك ومشاريعك انت، أو مواقع معاك إذن كتابي صريح من صاحبها، أو بيئات تدريب مخصوصة زي OWASP Juice Shop و HackTheBox وPortSwigger.

في مصر، قانون مكافحة جرائم تقنية المعلومات ١٧٥/٢٠١٨ بيجرّم الدخول غير المصرّح. حتى scan بسيط بدون إذن ممكن يبقى مخالفة.

OWASP Juice Shop موقع Node.js مبني بثغرات عشان تتعلم. شغّله على جهازك بـ Docker وهو بيقولك إيه الثغرات لما تلاقيها.`,
            when: "دايمًا قبل ما تبدأ أي فحص.",
            mistakes: "«السيرفر عام على النت يبقى مسموح». لأ. الوصول العام مش إذن للاختبار."
          },
          lines: [
            "شغّل Juice Shop على جهازك: موقع معمول بثغرات عشان تتعلم عليه بشكل قانوني. افتح localhost:3000."
          ]
        },
        {
          cmd: "إزاي تفكّر",
          title: "اللي بيأمّن الكود بيفكّر زي المهاجم",
          desc: "القاعدة الذهبية: أي حاجة جاية من المستخدم كذّابة لحد ما تتأكد منها، البودي والـ query والـ headers والكوكيز وأسامي الملفات المرفوعة، كلها. الـ frontend بيحسّن تجربة المستخدم بس، وأي validation فيه المهاجم بيتخطاه لأنه بيبعت للـ API مباشرة. عشان كده كل تأمين حقيقي لازم يكون على السيرفر. المهاجم مش هيفتح موقعك، هيبعت للـ API بـ curl على طول.",
          example: R`# المتصفح بيبعت كده (JavaScript):  fetch("/api/users/123")
# والمهاجم بيبعت للـ API مباشرة، بيتخطى الـ frontend خالص:
curl https://example.com/api/users/124 -H "cookie: session=..."`,
          try: "في أي API عندك، جرّب توصله بـ curl مباشرة من غير ما تفتح الموقع.",
          flag: "term",
          deep: {
            why: "المطوّر اللي بيأمّن بيفكّر بطريقة مختلفة: بيفترض إن المدخلات ممكن تكون خبيثة.",
            how: R`القاعدة الذهبية: «Never trust user input». أي حاجة جاية من اليوزر خارج تحكّمك: الـ form data، والـ query parameters، والـ headers، والـ cookies، وأسامي الملفات المرفوعة.

الـ frontend validation زينة وتجربة مستخدم، مش أمان. أي validation في JavaScript بيتخطاه المهاجم في ثانية بـ curl. الـ validation الحقيقي على السيرفر.

الـ API مش «داخلي» لأن المستخدمين مش عارفين بيه. أي endpoint موجود ممكن حد يوصله.`,
            when: "وانت بتصمم أي feature جديدة: أنهي مدخلات المستخدم يتحكم فيها؟",
            mistakes: "الاعتماد على الـ frontend validation. والافتراض إن بعض الـ endpoints «مش مهمة» لأن مش معروفة."
          },
          lines: [
            "الاختبار الأساسي لـ IDOR: انت يوزر 123، غيّر الرقم لـ 124 بنفس الكوكي. لو رجعت بيانات، فيه ثغرة."
          ]
        },
        {
          cmd: "الطبقات",
          title: "الأمان مش خطوة واحدة",
          desc: "محدش بيعتمد على حماية واحدة. الطبقات: HTTPS، وvalidation على كل مدخل، ومصادقة سليمة (مين انت)، وصلاحيات سليمة (مسموحلك تعمل إيه)، وrate limiting، وأسرار في متغيرات بيئة مش في الكود، وتحديث المكتبات، وأقل صلاحيات ممكنة لكل حاجة. لو طبقة وقعت، اللي بعدها بتمسك.",
          example: R`# ملف .env بره Git، والمفاتيح فيه
DATABASE_URL=postgres://...
JWT_SECRET=long-random-string
# .gitignore لازم يكون فيه .env`,
          try: "اتأكد إن كل مشاريعك فيها .env في .gitignore، وإن مفيش أي مفتاح مكتوب جوه الكود.",
          deep: {
            why: "محدش بيأمّن بحاجة واحدة. لو طبقة واحدة وقعت، الطبقة اللي بعدها هي اللي تحمي.",
            how: R`الطبقات: HTTPS يتأكد إن البيانات مش بتتقرا في الطريق. Authentication (مصادقة) مين انت. Authorization (صلاحيات) إيه اللي مسموحلك. Validation البيانات الجاية صح. Rate limiting يمنع الإغراق. Secrets management يحمي المفاتيح. Updates يقفل الثغرات.

المتغيرات في [[.env]] أسلم لأنها مش بتتشاركش في Git، وسهلة التغيير، ومختلفة بين البيئات.

أقل صلاحيات ممكنة: اليوزر بتاع قاعدة البيانات ميشيلهوش أكتر مما يحتاج. الكونتينر ميشتغلش كـ root.`,
            when: "وانت بتبني أي تطبيق جديد: ارسم الطبقات من الأول.",
            mistakes: "الاعتماد على طبقة واحدة. والخلط بين Authentication (مين انت) وAuthorization (مسموحلك بإيه)."
          },
          lines: ["سر في .env: مسار قاعدة البيانات بالباسورد.", "سر تاني: مفتاح توقيع الـ JWT، طويل وعشوائي."]
        },
        {
          cmd: "أسرار مكشوفة",
          title: "أشهر وأخطر غلطة",
          desc: "مفتاح API أو باسورد قاعدة بيانات اترفع على GitHub بالغلط، دي من أكتر أسباب الاختراق. حتى لو مسحته بـ commit جديد، هو لسه في تاريخ Git، والبوتات بتفضل تفحص GitHub على طول. الحل الوحيد: غيّر المفتاح فورًا. [[gitleaks]] و [[trufflehog]] بيفحصوا الـ repo (أمر [[gitleaks git]] للتاريخ كله، و [[gitleaks dir]] للملفات الحالية). و GitHub Secret Scanning بيشتغل لوحده على الـ repos العامة.",
          example: R`# فحص الـ repo على أسرار متسربة (أداة دفاعية)
docker run -v $(pwd):/repo zricethezav/gitleaks:latest git /repo -v
# لو لقيت مفتاح متسرب: غيّره فورًا، مش بس تمسحه`,
          try: "شغّل gitleaks على أكبر repo عندك.",
          flag: "term",
          deep: {
            why: "أشهر وأسهل طريقة اختراق: مفتاح API أو باسورد مكتوب في GitHub.",
            how: R`البوتات بتفحص كل repo جديد على GitHub في ثوان. لو رفعت [[.env]] بالغلط، في دقيقة ممكن حد يكون شغال بمفتاحك.

حتى لو مسحت المفتاح بـ commit تاني، هو لسه في تاريخ Git. الحل الوحيد: تغيير المفتاح فورًا (revoke وregenerate).

gitleaks بتفحص الـ repo كله بتاريخه ودوّر على patterns الأسرار. شغّلها على أي repo قبل ما ترفعه أو تعمله public.

قاعدة: [[.env]] دايمًا في [[.gitignore]] قبل أول [[git init]].`,
            when: "قبل ما تعمل أي repo public. وعلى repos الشغل بانتظام.",
            mistakes: "تغيّر المفتاح في الـ commit الأخير وتفتكر إنه أمان. التاريخ القديم لسه موجود."
          },
          lines: [
            "شغّل gitleaks من Docker على المشروع الحالي ([[-v $(pwd):/repo]] بيربط الفولدر)، وافحص تاريخ Git كله ([[git /repo]])، بتفاصيل ([[-v]])."
          ]
        }
      ]
    },
    {
      t: "OWASP Top 10: افهمها في كودك",
      l: 2,
      n: "قايمة OWASP لأشهر الثغرات، آخر نسخة 2025. لكل واحدة: بتحصل إزاي، والكود الغلط، والصح. الرقم اللي في اسم الدرس ترتيب الشرح بس، ورقم OWASP الحقيقي (A01 لـ A10) مكتوب في عنوان كل درس: SQL و XSS و Command Injection تحت A05 Injection، و CSRF و SSRF و Path Traversal و Zip Slip تحت A01، و Rate limiting مش بند لوحده، ده دفاع تحت A07 و A06",
      items: [
        {
          cmd: "1. Broken Access Control",
          title: "A01 أخطر واحدة: توصل لحاجة مش من حقك",
          desc: "A01:2025 Broken Access Control، رقم 1 في القايمة. أشهر صورها اسمها IDOR: لما تغيّر id في الـ URL فتشوف داتا حد تاني. الـ API لازم يتأكد إن الحاجة دي بتاعتك، مش بس إنك مسجّل دخول. الغلط الشائع: بتتأكد إن فيه توكن، بس مش بتتأكد إن المورد ده بتاع صاحب التوكن.",
          example: R`// غلط: أي مستخدم مسجّل يشوف أي طلب
app.get("/api/orders/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// صح: لازم يكون بتاعه هو
app.get("/api/orders/:id", auth, async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user.id   // الفلتر ده هو الحماية
  });
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});`,
          try: "في أي API عندك بيرجّع داتا بـ id: سجّل بيوزرين، وجرّب توصل لداتا اليوزر التاني بالـ id بتاعه. لو نجحت، عندك الثغرة دي.",
          flag: "script",
          deep: {
            why: "الأخطر في OWASP Top 10. مش بس تتأكد إن اليوزر logged in، لازم تتأكد إن المورد اللي بيطلبه بتاعه هو.",
            how: R`IDOR: اليوزر يغيّر ID في الـ URL ويوصل لبيانات يوزر تاني.

الكود الغلط: بيتأكد إن فيه session بس ومش بيتأكد إن الـ order بتاع اليوزر ده.

الكود الصح: الـ query بيفلتر على userId مع _id، فمهما غيّر الـ id مش هيلاقي غير الأوامر بتاعته.

مبدأ: أي resource بياخد identifier من اليوزر، لازم يبقى في الـ query شرط إنه بتاعه هو.`,
            when: "في كل route بياخد id من الطلب.",
            mistakes: "الاعتماد على إن الـ id صعب يتخمّن. المشكلة مش التخمين، المشكلة إن مفيش validation."
          },
          lines: [
            "الكود الغلط: route بياخد id، ومحمي بـ auth (يعني لازم تكون logged in).",
            "بيجيب الطلب بالـ id زي ما هو، من غير ما يسأل بتاع مين.",
            "ويرجعه. أي يوزر يقدر يشوف طلبات أي يوزر.",
            "قفلة.",
            "الكود الصح: نفس الـ route.",
            "بيدوّر بشرطين.",
            "الـ id المطلوب...",
            "...وإنه بتاع اليوزر اللي عامل الطلب. ده الفلتر اللي بيحمي.",
            "قفلة الشرط.",
            "لو ملقاش (الطلب مش بتاعه)، 404 من غير ما يقول إنه موجود أصلًا.",
            "رجّعه.",
            "قفلة."
          ]
        },
        {
          cmd: "2. SQL Injection",
          title: "A05 Injection: لما مدخل المستخدم يتحط في استعلام",
          desc: "SQL Injection نوع من A05:2025 Injection. لو حطيت اللي المستخدم كتبه جوه نص الاستعلام مباشرة، هو يقدر يغيّر معنى الاستعلام. الحل الوحيد الكامل: parameterized queries، اللي بتبعت الاستعلام والقيم منفصلين، فالقيمة تفضل قيمة مهما كانت. متحاولش تنضّف المدخل بنفسك.",
          example: R`// خطر: القيمة بتتلزق في الاستعلام
const q = "SELECT * FROM users WHERE email = '" + email + "'";
db.query(q);

// أمان: القيمة منفصلة ($1)
db.query("SELECT * FROM users WHERE email = $1", [email]);

// مع ORM (Prisma) آمن افتراضيًا
await prisma.user.findUnique({ where: { email } });`,
          try: "دوّر في كودك بـ grep على استعلامات فيها [[+]] أو backticks جواها متغيرات، ده أول مكان تبص فيه.",
          flag: "script",
          deep: {
            why: "المهاجم يكتب SQL في الـ input وتطبيقك ينفّذه. ممكن يمسح قاعدة البيانات أو يسحب كل البيانات.",
            how: R`الكود الغلط: بيبني الاستعلام بـ string concatenation. لو اليوزر كتب [[' OR '1'='1]] كإيميل، الاستعلام بيبقى يرجع كل الصفوف.

Parameterized queries: الاستعلام والبيانات بيتبعتوا منفصلين. قاعدة البيانات نفسها بتعرف إن [[email]] داتا ومش SQL.

ORMs زي Prisma بيعملوا parameterized queries تلقائيًا. الخطر بييجي لو لجأت لـ raw queries.`,
            when: "في أي مكان بتحط فيه بيانات من اليوزر في استعلام.",
            mistakes: "الاعتماد على تنضيف المدخل يدويًا. استخدم parameterized queries وبس."
          },
          lines: [
            "الغلط: لزق الإيميل جوه الاستعلام كنص. لو الإيميل فيه علامة تنصيص، بيبقى جزء من الـ SQL.",
            "وتنفيذه.",
            "الصح: الاستعلام فيه [[$1]] كمكان فاضي، والقيمة بتتبعت لوحدها في array. قاعدة البيانات عمرها ما هتعتبرها SQL.",
            "أو ORM زي Prisma، وده بيعمل نفس الحاجة لوحده."
          ]
        },
        {
          cmd: "3. XSS",
          title: "A05 Injection: لما تعرض مدخل المستخدم كـ HTML",
          desc: "XSS في نسخة 2025 جوه A05 Injection، زي SQL Injection بالظبط: مدخل المستخدم بيتفسّر ككود. لو عرضت كلام المستخدم في الصفحة كـ HTML، ممكن يحط فيه سكربت يشتغل عند أي زائر. React بيهرب النصوص لوحده، فأنت آمن طول ما مش بتستخدم [[dangerouslySetInnerHTML]]. لو محتاج تعرض HTML من المستخدم (محرر نصوص مثلًا)، نضّفه بـ [[DOMPurify]]. وكوكي الـ session HttpOnly عشان لو حصل XSS التوكن ميتسرقش.",
          example: R`// خطر: HTML من المستخدم زي ما هو
element.innerHTML = comment.text;
<div dangerouslySetInnerHTML={{ __html: comment.text }} />

// أمان: نص عادي
element.textContent = comment.text;
<div>{comment.text}</div>   // React يهرب ده لوحده

// لو لازم HTML: نضّفه
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />`,
          try: "دوّر في مشروع React بتاعك على [[dangerouslySetInnerHTML]]، وشوف مصدر الـ HTML موثوق ولا لأ.",
          flag: "script",
          deep: {
            why: "لو بتعرض محتوى كتبه يوزر في صفحة HTML من غير تنضيف، المهاجم يحط script بيشتغل عند أي حد يفتح الصفحة.",
            how: R`[[element.innerHTML = comment.text]]: لو comment.text فيه [[<img src=x onerror=alert(1)>]] الكود هيشتغل. (وسم script نفسه مش بيشتغل مع innerHTML، بس الـ event handlers زي onerror بتشتغل).

[[element.textContent]] بيحطه كنص حرفي مش HTML. المتصفح مش هيفسّره.

React آمن افتراضيًا. الخطر الوحيد [[dangerouslySetInnerHTML]].

لو محتاج تعرض HTML حقيقي من اليوزر: استخدم DOMPurify لتنضيفه.`,
            when: "في كل مكان بتعرض فيه محتوى كتبه يوزر.",
            mistakes: "الاعتماد على regex أو blacklist. سهل تتجاوزها."
          },
          lines: [
            "الغلط: حط نص اليوزر كـ HTML. لو فيه وسم زي img بـ onerror، الكود اللي فيه هيشتغل.",
            "نفس الغلط في React (الاسم نفسه بيحذّرك).",
            "الصح: حطه كنص. أي وسوم بتظهر ككلام عادي.",
            "الصح في React: الـ JSX بيهرب النص لوحده.",
            "لو لازم تعرض HTML من اليوزر: استورد DOMPurify.",
            "نضّفه الأول، وبعدين اعرضه."
          ]
        },
        {
          cmd: "Command Injection",
          title: "A05 Injection: لما مدخل المستخدم يوصل للـ shell",
          desc: R`نفس فكرة SQL Injection، بس المرة دي اللي بيتنفّذ أوامر على السيرفر نفسه. لو بتشغّل برنامج خارجي (ffmpeg، ImageMagick، git، ping) وبتبني الأمر كـ string فيه حاجة جاية من المستخدم، [[exec]] بيدّي الـ string كله لـ [[/bin/sh]]. ساعتها [[;]] و [[|]] و [[&&]] و [[$(...)]] بيشتغلوا، واليوزر يقدر يشغّل أي أمر بصلاحيات الـ process بتاعك: يقرا [[.env]]، أو ينزّل backdoor.

الحل: [[execFile]] أو [[spawn]] باسم البرنامج لوحده، والـ arguments في array، ومن غير shell. كل عنصر في الـ array بيوصل للبرنامج كـ argument واحد حرفيًا مهما كان فيه، لأن مفيش shell يفسّر الرموز. وفي Python نفس الكلام: [[subprocess.run(["prog", arg])]] بـ list و [[shell=False]] (ودا الافتراضي)، مش string مع [[shell=True]].

والأحسن من الاتنين: لو فيه مكتبة بتعمل نفس الشغل جوه اللغة ([[sharp]] بدل ImageMagick، و [[fs.rm]] بدل [[rm -rf]])، استخدمها ومتشغّلش برنامج خارجي أصلًا.`,
          example: R`import { exec, execFile } from "node:child_process";
import { promisify } from "node:util";
const execP = promisify(exec);
const execFileP = promisify(execFile);
const host = process.argv[2] ?? "example.com";

// خطر: الـ string كله بيروح لـ /bin/sh
const bad = await execP("echo pinging " + host);
console.log("exec:", bad.stdout.trim());

// أمان: البرنامج لوحده والـ args في array، ومفيش shell
const good = await execFileP("echo", ["pinging", host]);
console.log("execFile:", good.stdout.trim());`,
          try: R`احفظ المثال في [[cmd.mjs]] (هو بيستخدم [[echo]] بدل [[ping]] عشان التجربة تبقى آمنة وسريعة). شغّله بـ [[node cmd.mjs 'x; echo HACKED; id -un']] وبعدين [[node cmd.mjs '$(whoami)']]، وقارن سطر [[exec]] بسطر [[execFile]]. بعدين اكتب نفس التجربة في Python بـ [[subprocess.run]] مرة بـ [[shell=True]] ومرة بـ list.`,
          flag: "script",
          deep: {
            why: R`أي feature بتلف على أداة command line (تحويل فيديو، ضغط صور، عمل PDF، ping لسيرفر، git clone لريبو اليوزر) ممكن تتحول لـ Remote Code Execution، وده أخطر حاجة ممكن تحصل: المهاجم بيبقى جوه السيرفر بصلاحياتك. وفي نسخة 2025 دي جزء من A05 Injection زي SQL و XSS بالظبط: مدخل المستخدم بيتفسّر ككود.`,
            how: R`[[exec(cmd)]] بيشغّل [[/bin/sh -c cmd]] (أو [[cmd.exe]] على Windows). الـ shell هو اللي بيفهم [[;]] كـ «أمر جديد» و [[$(...)]] كـ «شغّل ده وحط الناتج هنا». فلو [[host]] فيه [[x; echo HACKED]]، الـ shell بيشوف أمرين.

[[execFile(file, args)]] و [[spawn(file, args)]] بيعملوا [[execve]] مباشرة: البرنامج بياخد الـ array زي ما هو، كل عنصر argument. مفيش حد يفسّر [[;]]، فهي مجرد حرف في النص.

بس خلي بالك: [[spawn(cmd, { shell: true })]] و [[execFile]] مع [[shell: true]] بيرجّعوا الـ shell تاني، يعني نفس خطر [[exec]].

وفي Python: [[subprocess.run("echo " + x, shell=True)]] خطر، و [[subprocess.run(["echo", x])]] آمن. و [[os.system]] دايمًا بيستخدم shell، فمتستخدمهوش مع مدخل مستخدم.`,
            when: R`في أي مكان فيه [[child_process]] أو [[subprocess]] أو [[os.system]] أو backticks في Ruby/PHP ([[shell_exec]] و [[system]]). دوّر عليهم بـ grep في كودك، ولكل واحد اسأل: فيه حاجة هنا جاية من المستخدم؟ حتى اسم ملف رفعه اليوزر يعتبر مدخل مستخدم.`,
            mistakes: R`تحاول تهرّب المدخل بنفسك بإنك تحطه بين علامات تنصيص: [[exec('convert "' + name + '"')]]، واسم الملف فيه [["]] أو [[$(...)]] فيعدّي. استخدم args array وخلاص.

Argument injection: حتى مع [[execFile]]، لو المدخل بيبدأ بـ [[-]] البرنامج هيفهمه option مش قيمة. مثلًا [[execFile("git", ["log", userInput])]] واليوزر بعت [[--output=/some/path]]، و git هيكتب ملف في المكان ده (جرّبناها وحصلت). الحل: حط [[--]] قبل مدخلات اليوزر ([[execFile("git", ["log", "--", userInput])]]) عشان البرنامج يعرف إن اللي بعدها قيم مش options، واعمل validation (مثلًا hostname بـ regex أو [[new URL]]).

في الانترفيو: «ليه execFile أأمن من exec؟» الإجابة اللي بيدوروا عليها: مش عشان بتفلتر حاجة، عشان مفيش shell خالص بيفسّر المدخل، وكل عنصر في الـ array argument واحد. وضيف حكاية الـ [[--]] كـ bonus.`
          },
          lines: [
            R`[[exec]] (بيستخدم shell) و [[execFile]] (من غير shell).`,
            R`[[promisify]] عشان نستخدمهم بـ [[await]].`,
            R`نسخة [[exec]] بترجّع Promise فيها [[stdout]] و [[stderr]].`,
            R`نفس الكلام لـ [[execFile]].`,
            R`المدخل: أول argument للسكربت، وده بيمثّل حاجة جاية من المستخدم.`,
            R`الغلط: بيلزق المدخل في string، و [[/bin/sh]] بيفسّر أي [[;]] أو [[$(...)]] فيه.`,
            R`اطبع الناتج: هتلاقي أوامر زيادة اتنفّذت.`,
            R`الصح: اسم البرنامج لوحده، والمدخل عنصر في array. بيوصل لـ echo كـ argument واحد حرفيًا.`,
            R`اطبع الناتج: المدخل ظاهر زي ما هو، ومحصلش حاجة تانية.`
          ],
          sol: R`مع [[node cmd.mjs 'x; echo HACKED; id -un']] هتشوف:

[[exec: pinging x]] وبعده سطر [[HACKED]] وبعده اسم اليوزر اللي شغّال بيه (زي [[root]] أو اسمك). يعني الـ shell نفّذ 3 أوامر. وسطر [[execFile: pinging x; echo HACKED; id -un]] سطر واحد، والمدخل مطبوع كنص.

ومع [[node cmd.mjs '$(whoami)']]: سطر exec هيبقى [[exec: pinging root]] (الـ shell شغّل whoami وحط الناتج)، و execFile هيطبع [[$(whoami)]] حرفيًا.

لو شغّلت الأمر من غير علامات تنصيص مفردة، الـ shell بتاعك انت هو اللي هيفسّر [[;]] قبل ما node يشوف حاجة، والتجربة مش هتبيّن الفرق. لازم [['...']] حوالين المدخل.

في Python نفس النتيجة بالظبط: [[shell=True]] بيطبع [[HACKED]] في سطر لوحده، والـ list بتطبع المدخل كنص.`,
          solCode: R`# cmd.py  ->  python3 cmd.py 'x; echo HACKED'
import subprocess, sys

host = sys.argv[1]

bad = subprocess.run("echo pinging " + host, shell=True, capture_output=True, text=True)
print("shell=True:", bad.stdout.strip())

good = subprocess.run(["echo", "pinging", host], capture_output=True, text=True, check=True)
print("list:", good.stdout.strip())`
        },
        {
          cmd: "Path Traversal",
          title: "A01 لما اسم الملف يطلّعك بره الفولدر",
          desc: R`عندك route بيقرا ملف باسم جاي من المستخدم ([[/files/:name]] أو [[?file=]]). المهاجم يبعت [[../../.env]] فيطلع من فولدر الـ uploads ويقرا أسرارك، أو [[../../../etc/passwd]]. و Express بيفك الـ encoding في الـ params، فـ [[..%2F.env]] بتوصل للكود بتاعك [[../.env]] حتى لو المتصفح أو curl بينضّفوا [[../]] العادية.

[[path.join]] مش حماية: هو بيرتّب المسار بس، و [[path.join("uploads", "../.env")]] بيرجّع [[.env]] بكل أدب. الحماية: [[path.resolve(BASE, name)]] يديك المسار الكامل النهائي، وبعدين اتأكد إنه بيبدأ بـ [[BASE + path.sep]]. لو مش كده ارفض.

والأحسن من الفحص: متستخدمش اسم المستخدم في المسار أصلًا. خزّن الملف باسم [[randomUUID()]] واحفظ الاسم الأصلي في الداتابيز، زي ما في درس [[multer]] في «تاب Backend بـ Node». ودي في OWASP 2025 تحت A01 Broken Access Control، زي SSRF (شوف درس «7. SSRF (بقت جزء من رقم 1)» فوق، مش هنكررها هنا).`,
          example: R`import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
const app = express();
const BASE = path.resolve("uploads");

// غلط: ..%2F.env بتتفك لـ ../.env وتطلع بره الفولدر
app.get("/bad/:name", async (req, res) => {
  res.send(await fs.readFile(path.join(BASE, req.params.name), "utf8"));
});

// صح: حل المسار الكامل، واتأكد إنه لسه جوه الفولدر
app.get("/files/:name", (req, res) => {
  const full = path.resolve(BASE, req.params.name);
  if (!full.startsWith(BASE + path.sep)) return res.status(400).end();
  res.sendFile(full);
});

app.listen(3000);`,
          try: R`في فولدر فاضي: [[npm i express]]، واعمل [[uploads/a.txt]] فيه أي كلام، و [[.env]] جنب فولدر uploads فيه [[SECRET=1]]. احفظ المثال في [[server.mjs]] وشغّله. جرّب: [[curl localhost:3000/bad/..%2F.env]]، و [[curl localhost:3000/files/..%2F.env]]، و [[curl localhost:3000/files/a.txt]]، و [[curl --path-as-is localhost:3000/bad/../.env]]. وبعدين غيّر الشرط لـ [[full.startsWith(BASE)]] من غير [[path.sep]] وفكّر إيه اللي ممكن يعدّي.`,
          flag: "script",
          deep: {
            why: R`أي ميزة تحميل أو عرض ملفات، أو تصدير تقارير، أو قوالب بالاسم، ممكن تبقى باب لقراية أي ملف على السيرفر: [[.env]] فيه مفتاح الداتابيز و JWT secret، والكود نفسه، ومفاتيح SSH. ولو الـ route بيكتب (رفع بالاسم الأصلي)، المهاجم يقدر يكتب على ملفات الكود نفسها.`,
            how: R`[[path.resolve(BASE, name)]] بيبني المسار الكامل ويحل كل [[..]] و [[.]]، ولو [[name]] مسار مطلق زي [[/etc/passwd]] بيتجاهل BASE خالص. فبعده المسار اللي في إيدك هو اللي هيتقري فعلًا، وتقدر تسأل عليه سؤال واحد بسيط: بيبدأ بفولدري ولا لأ؟

ليه [[BASE + path.sep]] مش [[BASE]] بس؟ لأن [[/app/uploads-old/secret]] بيبدأ بـ [[/app/uploads]] برضه. الـ separator بيقفل الثغرة دي.

[[res.sendFile(name, { root: BASE })]] في Express بيعمل الفحص ده لوحده وبيرد 403 لو فيه [[..]] بيطلع بره، وكمان بيرفض الـ dotfiles افتراضيًا. بس [[fs.readFile]] و [[fs.createReadStream]] ملهمش أي حماية.

لو جوه الفولدر فيه symlinks ممكن يعملها حد، استخدم [[await fs.realpath(full)]] قبل الفحص، عشان الـ symlink ممكن يشاور بره.`,
            when: R`أي مكان فيه [[fs.*]] أو [[sendFile]] أو [[open()]] في Python أو [[include]] و [[readfile]] في PHP والمسار فيه حاجة من الطلب: params، و query، واسم ملف مرفوع، وحتى حاجة متخزنة في الداتابيز لو اليوزر هو اللي كتبها. ونفس الفكرة في PHP موجودة في درس [[readfile]] في «تاب PHP و MySQL».`,
            mistakes: R`تمسح [[../]] بـ replace: [[name.replace("../", "")]] بيمسح أول واحدة بس، و [[....//]] بتبقى [[../]] بعد المسح. أي blacklist كده بيتكسر.

تفحص قبل الـ decode: لو بتفحص الـ URL الخام [[..%2F]] مش هتلاقي [[../]]، والكود بعدين بيفك الـ encoding. افحص المسار النهائي اللي هيتفتح فعلًا.

تنسى Windows: هناك [[..\]] بتشتغل كمان. [[path.resolve]] بيتعامل معاها صح، الـ regex بتاعك غالبًا لأ.

في الانترفيو لو اتسألت «إزاي تمنع path traversal؟»: متقولش «بفلتر النقط». قول: resolve للمسار النهائي، وتأكد إنه جوه الـ base بـ separator، والأحسن إن اليوزر ميتحكمش في المسار أصلًا (IDs بدل أسماء).`
          },
          lines: [
            "استورد Express.",
            "و path عشان نبني المسارات.",
            R`و [[fs/promises]] عشان نقرا الملفات بـ await.`,
            "السيرفر.",
            R`المسار الكامل لفولدر الملفات المسموح، مرة واحدة وقت التشغيل.`,
            R`الغلط: route بياخد اسم الملف من الـ URL...`,
            R`...ويلزقه بـ [[path.join]] ويقراه. [[../.env]] هتطلع بره uploads وتقرا الأسرار.`,
            "قفلة.",
            "الصح: نفس الفكرة...",
            R`...بس [[path.resolve]] بيدّينا المسار النهائي بعد حل أي [[..]].`,
            R`لو مش بيبدأ بـ [[uploads/]] بالظبط (بالـ separator)، ارفض بـ 400.`,
            R`دلوقتي بس ابعت الملف.`,
            "قفلة.",
            R`شغّل السيرفر على 3000.`
          ],
          sol: R`[[/bad/..%2F.env]] بيرجّع [[SECRET=1]]: Express فك [[%2F]] لـ [[/]]، و [[path.join]] حل [[..]] وطلع بره uploads.

[[/files/..%2F.env]] بيرجّع 400 وجسم فاضي، و [[/files/a.txt]] بيرجّع محتوى الملف عادي.

[[--path-as-is /bad/../.env]] بيرجّع 404: الـ router شايف [[..]] و [[.env]] كـ segments منفصلة، فالـ route مش بيطابق أصلًا. ومن غير [[--path-as-is]]، curl نفسه بيحل [[../]] قبل ما يبعت فبيطلب [[/.env]]. عشان كده المهاجمين بيستخدموا [[%2F]]، واللي بيختبر بـ [[../]] عادية بس بيفتكر إنه آمن وهو مش آمن.

لو شلت [[path.sep]] من الشرط: [[..%2Fuploads-old%2Fx]] هيعدّي الفحص، لأن [[/.../uploads-old/x]] بيبدأ بـ [[/.../uploads]]. السكربت ده بيوريك كل الحالات من غير سيرفر.`,
          solCode: R`import path from "node:path";

const BASE = path.resolve("uploads");

function safePath(name) {
  const full = path.resolve(BASE, name);
  if (!full.startsWith(BASE + path.sep)) throw new Error("bad path");
  return full;
}

for (const name of ["a.txt", "../.env", "/etc/passwd", "sub/../a.txt", "../uploads-old/x"]) {
  let result;
  try { result = safePath(name); } catch (e) { result = e.message; }
  console.log(name.padEnd(18), "join ->", path.join("uploads", name).padEnd(20), "| safe ->", result);
}`
        },
        {
          cmd: "Zip Slip",
          title: "A01 ملف مضغوط بيكتب بره الفولدر",
          desc: R`Path traversal بس في الكتابة. أسماء الملفات جوه zip أو tar بيختارها اللي عمل الملف، وممكن تبقى [[../../app/server.js]] أو [[../../../root/.ssh/authorized_keys]]. لو بتفك ملف مرفوع وبتكتب كل entry في [[path.join(dest, entry.name)]]، الملف ده هيتكتب بره فولدر الفك، على كودك أو إعداداتك. ودي بتوصل لـ Remote Code Execution بسهولة.

العلاج نفس درس «Path Traversal»: لكل entry اعمل [[path.resolve(DEST, name)]] واتأكد إنه جوه [[DEST + path.sep]]. وافحص كل الأسماء الأول قبل ما تكتب ولا ملف، عشان متسيبش نص أرشيف مفكوك لو لقيت واحد وحش في النص.

المكتبات الحديثة بتحمي نفسها في دالة «فك كله»: [[adm-zip]] 0.6 في [[extractAllTo]] بيشيل الـ [[..]]، و [[zipfile.extractall]] في Python كمان. بس لو بتكتب الـ entries بإيدك (streaming بـ [[yauzl]] أو [[unzipper]] أو [[getEntries()]])، الحماية عليك انت. و [[tarfile]] في Python قبل 3.14 بيفك بره الفولدر افتراضيًا إلا لو قلتله [[filter="data"]].`,
          example: R`import AdmZip from "adm-zip";
import path from "node:path";
import fs from "node:fs";
const DEST = path.resolve("out");
const entries = new AdmZip("upload.zip").getEntries();

// افحص كل الأسماء الأول، قبل ما تكتب ولا ملف
for (const e of entries) {
  const target = path.resolve(DEST, e.entryName);
  if (!target.startsWith(DEST + path.sep)) throw new Error("zip slip: " + e.entryName);
}
for (const e of entries) {
  if (e.isDirectory) continue;
  const target = path.resolve(DEST, e.entryName);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, e.getData());
}`,
          try: R`في فولدر تجربة ([[npm i adm-zip]])، اعمل zip خبيث بـ Python: [[python3 -c "import zipfile; z=zipfile.ZipFile('upload.zip','w'); z.writestr('ok.txt','fine'); z.writestr('../../evil.txt','pwned'); z.close()"]] وشوفه بـ [[unzip -l upload.zip]]. شغّل نسخة غلط من المثال (من غير الـ loop الأولانية، وبـ [[path.join]]) وشوف [[evil.txt]] اتكتب فين. امسحه، وبعدين شغّل المثال زي ما هو. وآخر حاجة جرّب [[tarfile]] في Python بـ [[filter="data"]] ومن غيره.`,
          flag: "script",
          deep: {
            why: R`أي ميزة «ارفع zip» (استيراد مشروع، رفع ثيم، رفع صور بالجملة، ملف Excel اللي هو zip من جوه، أو حتى backup بترجّعه) بتدّي المستخدم إنه يختار مسارات كتابة على السيرفر. الثغرة دي لاقوها في مكتبات فك كتير في لغات مختلفة لما اتنشرت سنة 2018، وده سبب إن المكتبات المشهورة ضافت حماية.`,
            how: R`الـ zip بيخزّن اسم كل ملف كـ string، ومفيش حاجة في الـ format تمنع [[..]] أو مسار مطلق. الأداة اللي بتفك هي المسؤولة. [[unzip]] في لينكس بيشيل [[../]] وبيطبع تحذير، و adm-zip و zipfile برضه، بس ده سلوك أداة معينة مش ضمان.

في tar الموضوع أوسع: فيه symlinks و hardlinks. أرشيف ممكن يحط symlink اسمه [[out/link]] بيشاور على [[/etc]]، وبعدين ملف اسمه [[link/cron.d/x]]. عشان كده Python ضافت [[filter="data"]] (في 3.12، واتعمل backport لنسخ أقدم زي 3.11.4)، وبيرفض الـ symlinks اللي بتطلع بره والمسارات المطلقة والـ device files، وبقى الافتراضي في 3.14.

وحط حد لحجم الفك وعدد الملفات: zip صغير ممكن يتفك لجيجات (zip bomb).`,
            when: R`أي فك لأرشيف جاي من بره: رفع من المستخدم، أو تنزيل من URL، أو أرشيف من سيرفر تاني. حتى لو بتفكه في فولدر مؤقت، فولدر مؤقت بـ [[../../]] بيوصل لأي مكان.`,
            mistakes: R`تفحص وانت بتكتب بدل قبلها: أول entry سليمة بتتكتب، والتالتة وحشة بترمي error، والفولدر فيه نص أرشيف. افحص الكل الأول، أو فك في فولدر مؤقت وانقله بعد ما يخلص.

تعتمد على إن «المكتبة بتحمي»: الحماية في [[extractAllTo]] مش في الـ loop اللي كتبتها انت بـ [[getEntries]]. ونسخ adm-zip القديمة (من أيام 2018) كان فيها الثغرة دي نفسها، فحدّث.

تستخدم [[tarfile.extractall()]] من غير filter في Python أقدم من 3.14. وتشغّل عملية الفك بيوزر عنده صلاحية كتابة على الكود: الأحسن الـ process يبقى بيوزر مالوش صلاحية غير على فولدر الفك.`
          },
          lines: [
            R`[[adm-zip]]: مكتبة بتقرا الـ zip وتدّيك الـ entries.`,
            "path للمسارات.",
            R`و [[fs]] للكتابة.`,
            R`المسار الكامل لفولدر الفك.`,
            R`اقرا الأرشيف وهات لستة الملفات اللي جواه (من غير ما تكتب حاجة).`,
            R`أول لفّة: فحص بس.`,
            R`المسار النهائي اللي الـ entry دي هتتكتب فيه.`,
            R`لو طالع بره [[out/]]، وقّف كل حاجة قبل ما يتكتب ولا ملف.`,
            "قفلة.",
            R`تاني لفّة: الكتابة، وكل الأسماء اتفحصت خلاص.`,
            R`الفولدرات بتتعمل مع الملفات، فاعديها.`,
            "نفس المسار النهائي.",
            R`اعمل الفولدرات اللي فوق الملف.`,
            R`واكتب محتوى الملف.`,
            "قفلة."
          ],
          sol: R`[[unzip -l upload.zip]] بيوريك entry اسمها [[../../evil.txt]] جنب [[ok.txt]]، يعني الاسم متخزن كده فعلًا جوه الملف.

النسخة الغلط (بـ [[path.join("out", e.entryName)]] ومن غير فحص) بتكتب [[ok.txt]] في [[out/]] و [[evil.txt]] في الفولدر اللي فوق فولدر التجربة ([[out/../../]])، يعني بره المكان اللي قلت عليه خالص. ده بالظبط الـ zip slip.

المثال زي ما هو بيقف بـ [[Error: zip slip: ../../evil.txt]] ومبيكتبش ولا ملف، حتى [[ok.txt]] مش هتلاقيه، لأن الفحص كله قبل الكتابة.

في Python: [[extractall("tar-out", filter="data")]] بيرمي [[OutsideDestinationError]] (نوع من [[FilterError]]) وبيقولك الملف كان هيتكتب فين. ومن غير filter في Python 3.11، الملف بيتكتب بره فعلًا. وخلي بالك إن tarfile بيفك اللي قبل الملف الوحش، فـ [[ok.txt]] هتلاقيه في [[tar-out]].`,
          solCode: R`# zipdemo.py: يعمل zip و tar خبيثين، ويفك الـ tar بأمان
import io, tarfile, zipfile

with zipfile.ZipFile("upload.zip", "w") as z:
    z.writestr("ok.txt", "fine")
    z.writestr("../../evil.txt", "pwned")

with tarfile.open("evil.tar", "w") as t:
    for name, data in [("ok.txt", b"fine"), ("../evil-tar.txt", b"pwned")]:
        info = tarfile.TarInfo(name)
        info.size = len(data)
        t.addfile(info, io.BytesIO(data))

with tarfile.open("evil.tar") as t:
    try:
        t.extractall("tar-out", filter="data")
    except tarfile.FilterError as e:
        print("blocked:", e)`
        },
        {
          cmd: "CSRF",
          title: "A01: لما موقع تاني يبعت طلب باسمك",
          desc: "CSRF مش بند لوحده في نسخة 2025، هو جوه A01 Broken Access Control. لو اليوزر عامل login عندك وفتح موقع مهاجم، الموقع ده ممكن يعمل form بيبعت POST لموقعك، والمتصفح بيبعت الكوكي بتاعتك معاه لوحده. الحماية: كوكي الـ session بـ [[SameSite=Lax]] أو [[Strict]]، وأي حاجة بتغيّر داتا تبقى POST/PUT/DELETE مش GET، وتتأكد من [[Origin]] على الطلبات دي. لو الـ auth بـ Authorization header مش كوكي، CSRF مش بتأثر عليك.",
          example: R`// الكوكي: SameSite=Lax أقل حاجة
res.cookie("session", token, { httpOnly: true, secure: true, sameSite: "lax" });
// أي تغيير بـ POST، مش GET
app.post("/api/transfer", auth, checkOrigin, transferHandler);
function checkOrigin(req, res, next) {
  if (req.get("origin") !== "https://example.com") return res.status(403).end();
  next();
}`,
          try: "اعمل صفحة HTML على بورت تاني فيها form بيعمل POST لـ API بتاعك، وشوف الكوكي بتتبعت ولا لأ مع SameSite مختلفة.",
          flag: "script",
          deep: {
            why: "الطلب جاي من متصفح اليوزر الحقيقي وبكوكيه الحقيقية، فالسيرفر مش هيفرّق بينه وبين طلب اليوزر نفسه.",
            how: "المتصفح بيضيف الكوكيز لأي طلب رايح لدومينك، مهما كان مين اللي بدأه. [[SameSite=Lax]] (الافتراضي في Chrome) بيمنعها في POST الجاي من موقع تاني، و Strict بيمنعها حتى في اللينكات. التحقق من Origin طبقة تانية، و CSRF token طبقة تالتة للأنظمة القديمة.",
            when: "أي تطبيق بيعتمد على كوكي session.",
            mistakes: "عملية بتغيّر داتا على GET (زي /logout أو /delete?id=). و SameSite=None من غير سبب."
          },
          lines: [
            "كوكي session: JavaScript مش بيقراها، HTTPS بس، ومش بتتبعت مع POST من موقع تاني.",
            "العملية الحساسة POST، ومحمية بـ auth وبفحص الـ Origin.",
            "middleware بيفحص الطلب جاي منين.",
            "لو الـ Origin مش دومينك، ارفض بـ 403.",
            "كمّل للـ handler.",
            "قفلة."
          ]
        },
        {
          cmd: "4. مصادقة سليمة",
          title: "A07 الباسوردات والتوكنات",
          desc: "ده A07:2025 Authentication Failures. الباسورد لازم يتخزّن hashed بـ bcrypt أو argon2، أبدًا كنص. لو قاعدة بياناتك اتسربت، الـ hash ميرجّعش الباسورد. الـ JWT secret لازم يكون طويل وعشوائي وفي متغير بيئة. وحط rate limiting على login عشان تمنع تجربة باسوردات كتير.",
          example: R`import bcrypt from "bcrypt";

// عند التسجيل
const hash = await bcrypt.hash(password, 12);

// عند الدخول: مقارنة، مش فك تشفير
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: "Invalid credentials" });
// رسالة واحدة للاتنين: متقولش "الإيميل غلط" أو "الباسورد غلط"`,
          try: "اتأكد إن قاعدة بياناتك مفيهاش ولا باسورد واحد مكتوب صريح.",
          flag: "script",
          deep: {
            why: "الباسورد لو اتخزّن زي ما هو وقاعدة البيانات اتسرقت، كل الأكاونتات في خطر.",
            how: R`bcrypt بيعمل hash للباسورد: رقم طويل مش ممكن ترجّعه للباسورد الأصلي.

[[cost factor 12]]: قد إيه الحساب بطيء. أبطأ = أصعب للمهاجم يجرّب ملايين الباسوردات.

[[bcrypt.compare]] مش بيفك الـ hash. بيعمل hash للجديد بنفس الطريقة ويقارن.

رسالة خطأ واحدة مهمة: قول «Invalid credentials» للاتنين من غير تفريق بين «الإيميل غلط» و«الباسورد غلط».`,
            when: "في كل نقطة تسجيل دخول أو إنشاء أكاونت.",
            mistakes: "MD5 أو SHA256 للباسوردات. دي سريعة جدًا. استخدم bcrypt أو argon2."
          },
          lines: [
            "استورد bcrypt.",
            "اعمل hash للباسورد بتكلفة 12 (كل ما تزيد، أبطأ وأصعب على المهاجم). ده اللي بيتخزن.",
            "عند الدخول: قارن الباسورد المكتوب بالـ hash المتخزن. مفيش فك، bcrypt بيعمل hash ويقارن.",
            "لو غلط: 401 برسالة واحدة عامة، متقولش «الإيميل مش موجود» ولا «الباسورد غلط»."
          ]
        },
        {
          cmd: "5. إعدادات غلط",
          title: "A02 الافتراضيات الخطيرة",
          desc: "ده A02:2025 Security Misconfiguration، وطلع لرقم 2 في نسخة 2025. صفحات الـ error اللي بتطبع تفاصيل السيرفر، وصلاحيات مفتوحة، ولوحات تحكم بباسورد افتراضي. في Express: شيل [[X-Powered-By]] عشان متعلنش إنك Express، فعّل [[helmet]] للـ security headers، ومتبعتش تفاصيل الأخطاء للمستخدم في الإنتاج.",
          example: R`import helmet from "helmet";
app.use(helmet());
app.disable("x-powered-by");

// في الإنتاج: رسالة عامة، والتفاصيل في اللوج بس
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});`,
          try: "افتح Network على موقعك ودوّر على header اسمه [[X-Powered-By]] أو [[Server]] بيفشي إيه اللي شغال.",
          flag: "script",
          deep: {
            why: "frameworks وبرامج بتيجي بإعدادات للتطوير مش للإنتاج. تغيير حاجات صغيرة يحسّن الأمان بشكل كبير.",
            how: R`[[helmet]] مكتبة Express بتضيف أهم security headers في سطر واحد: CSP، وX-Frame-Options، وغيرهم.

[[app.disable("x-powered-by")]]: شيل الـ header اللي يقول للمهاجم انت شغال بـ Express.

Stack traces في الإنتاج: لو error handler بيرجع التفاصيل للمستخدم، المهاجم بيعرف أكتر. في الإنتاج: رسالة عامة، والتفاصيل في اللوج بس.`,
            when: "قبل كل deploy للإنتاج.",
            mistakes: "نسيان إن [[DEBUG=true]] أو [[NODE_ENV=development]] بيغيّر سلوك مكتبات كتير."
          },
          lines: [
            "استورد helmet.",
            "فعّله: بيضيف security headers الأساسية كلها.",
            "شيل الـ header اللي بيقول إنك شغال بـ Express.",
            "error handler عام (الـ ٤ parameters هي اللي بتخلي Express يعرف إنه للأخطاء).",
            "سجّل التفاصيل الكاملة في اللوج بتاعك.",
            "ورجّع للمستخدم رسالة عامة بس، من غير stack trace.",
            "قفلة."
          ]
        },
        {
          cmd: "6. مكتبات فيها ثغرات",
          title: "A03 الكود اللي مكتبتوش انت",
          desc: "في نسخة 2025 المكتبات القديمة أو اللي فيها ثغرات معروفة بقت جزء من A03 Software Supply Chain Failures. معظم كودك مكتبات، وأي ثغرة فيها بتبقى ثغرة فيك. [[npm audit]] بيقولك أنهي مكتبة فيها ثغرة معروفة ودرجة خطورتها. راجع اللي بيقترح تحديثه قبل [[--force]] لأنه ممكن يكسر حاجة. و Dependabot على GitHub بيعملك pull request أوتوماتيك بالتحديثات الأمنية.",
          example: R`npm audit
npm audit --omit=dev
npm audit fix
npm outdated`,
          try: "شغّل [[npm audit]] على أكبر مشروع عندك وشوف كام ثغرة فيه.",
          flag: "term",
          deep: {
            why: "معظم كودك مش بتكتبه انت. أي مكتبة فيها ثغرة هي ثغرة فيك.",
            how: R`[[npm audit]] بيقارن مكتباتك بقاعدة GitHub Advisory Database. لو لاقى ثغرة بيقولك اسمها والمكتبة والخطورة والإصدار اللي بيصلّحها.

[[npm audit fix]] بيحاول يحدّث تلقائيًا. إياك [[--force]] من غير ما تقرا.

[[npm ci]] أحسن من [[npm install]] في الإنتاج: بيسطّب بالظبط الـ versions في package-lock.json من غير ما يحدّث حاجة.`,
            when: "في CI: [[npm audit --audit-level=high]] يفشل الـ build لو ثغرة high. وفعّل Dependabot.",
            mistakes: "تتجاهل [[npm audit]] لأن «الموقع شغال»."
          },
          lines: [
            "افحص كل المكتبات ضد قاعدة الثغرات المعروفة.",
            "مكتبات الإنتاج بس (من غير devDependencies).",
            "صلّح اللي ينفع يتصلّح بتحديث آمن.",
            "إيه المكتبات اللي ليها نسخ أحدث."
          ]
        },
        {
          cmd: "7. SSRF (بقت جزء من رقم 1)",
          title: "A01 SSRF: لما السيرفر يجيب URL من المستخدم",
          desc: "في نسخة 2025 دمجوا SSRF جوه A01 Broken Access Control، لأنها في الآخر وصول لحاجة مش من حقك. بتحصل لو عندك ميزة بتجيب صورة أو داتا من URL بيبعته المستخدم، فيحط عنوان داخلي زي [[169.254.169.254]] (اللي بيرجّع أسرار السيرفر على بعض المنصات) أو [[localhost]] فيوصل لخدمات جواك. الحل: اسمح بدومينات محددة بس، وامنع العناوين الداخلية.",
          example: R`// خطر: بيجيب أي URL
const data = await fetch(req.body.url);

// أمان: قائمة بيضاء
const allowed = ["images.example.com", "cdn.example.com"];
const host = new URL(req.body.url).hostname;
if (!allowed.includes(host)) {
  return res.status(400).json({ error: "URL not allowed" });
}
const safe = await fetch(req.body.url, { redirect: "error" });`,
          try: "لو عندك ميزة بتجيب من URL خارجي، اتأكد إنها بتفلتر الدومينات.",
          flag: "script",
          deep: {
            why: "التطبيق بينفّذ طلبات لـ URLs من اليوزر. المهاجم يبعت URL داخلي يوصل لخدمات على نفس السيرفر.",
            how: R`في OWASP 2025 دمجوا SSRF في Broken Access Control لأنها نفس المشكلة: اليوزر بيوصل لموارد مش مفروض.

الكود الغلط: fetch لأي URL من اليوزر. المهاجم يبعت [[http://169.254.169.254/latest/meta-data/]] ويجيب credentials للـ cloud instance.

الكود الصح: whitelist للـ domains المسموحة. أي URL مش فيها يترفض.`,
            when: "أي feature بتعمل fetch لـ URL من اليوزر: upload by URL، وwebhook.",
            mistakes: R`تستخدم regex للفلترة. سهل تتجاوزها. الأحسن whitelist، ومعاها [[redirect: "error"]] عشان الدومين المسموح ميحوّلكش لعنوان داخلي.`
          },
          lines: [
            "الغلط: اطلب أي URL اليوزر يبعته. ممكن يبعت عنوان داخلي زي metadata بتاع الـ cloud.",
            "الصح: لستة الدومينات المسموحة بس.",
            "طلّع الدومين من الـ URL.",
            "لو مش في اللستة...",
            "...ارفض.",
            "قفلة.",
            "دلوقتي بس اطلب، ومن غير ما تتبع redirects، وإلا الدومين المسموح يحوّلك لعنوان داخلي."
          ]
        },
        {
          cmd: "8. Rate limiting",
          title: "دفاع لـ A07 و A06: امنع الإغراق والتخمين",
          desc: "Rate limiting مش بند في OWASP Top 10، ده دفاع: A07 Authentication Failures بتعدّ brute force و credential stuffing اللي مبيتقفلوش بسرعة ثغرة، و A06 Insecure Design فيها «مفيش حد لعدد مرات التفاعل» (CWE-799). من غيره حد يقدر يجرّب آلاف الباسوردات، أو يغرق الـ API. حط حد على المحاولات، أشد على login و forgot-password. في الإنتاج ورا Nginx أو Cloudflare حط الـ limiting هناك كمان.",
          example: R`import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 دقيقة
  limit: 5,                      // 5 محاولات للـ IP
  message: { error: "Too many attempts, try later" }
});
app.post("/api/login", loginLimiter, loginHandler);`,
          try: "جرّب تبعت لـ login بتاعك 10 طلبات ورا بعض بـ curl في لوب، وشوف بيرد بـ 429 ولا لأ.",
          flag: "script",
          deep: {
            why: "بدون rate limiting، المهاجم يجرّب ملايين الباسوردات، أو يغرق السيرفر.",
            how: R`Rate limiting بيحدد كام طلب مسموح من نفس الـ IP في وقت معين.

في المثال: 5 محاولات login في 15 دقيقة. بعدها 429. وده بيخلي brute force مستحيل عمليًا.

الحدود بتختلف: login و forgot-password أشد (5-10 محاولات). APIs العادية 100-500 في الدقيقة.

في الإنتاج ورا Nginx أو Cloudflare: Nginx عنده [[limit_req_zone]]، وCloudflare عنده rate limiting rules.`,
            when: "على كل login endpoint ومن الأول.",
            mistakes: "Rate limiting على الـ IP بس. اليوزرز ورا NAT (شركات وجامعات) كلهم على نفس الـ IP."
          },
          lines: [
            "استورد المكتبة.",
            "اعمل limiter.",
            "النافذة الزمنية: ١٥ دقيقة بالمللي ثانية.",
            "أقصى عدد محاولات من نفس الـ IP في النافذة دي.",
            "الرسالة اللي بترجع مع 429.",
            "قفلة.",
            "حط الـ limiter على route الـ login بس، قبل الـ handler."
          ]
        },
        {
          cmd: "npm و Supply Chain",
          title: "A03 متسيبش مكتبة تشغّل كود وقت التسطيب",
          desc: "هجمات 2025 على npm (مكتبات مشهورة اتسرق حساب صاحبها ونزلت نسخة ملغومة) كانت بتشتغل من [[postinstall]]: مجرد [[npm install]] بيشغّل الكود. [[--ignore-scripts]] بيمنع ده، و [[npm audit signatures]] بيتأكد إن المكتبات متوقّعة من الـ registry فعلًا. وقبل ما تسطّب مكتبة، بص نزلت إمتى: نسخة عمرها ساعات خليك بعيد عنها.",
          example: R`npm ci --ignore-scripts
npm audit signatures
npm config set ignore-scripts true
npm view express time.modified`,
          try: "شغّل [[npm audit signatures]] على مشروعك، وجرّب [[npm ci --ignore-scripts]] وشوف أنهي مكتبة كانت محتاجة scripts.",
          flag: "term",
          deep: {
            why: "المكتبة اللي بتثق فيها ممكن تتخترق هي نفسها، وده اللي OWASP 2025 حطته A03.",
            how: "install scripts بتشتغل بصلاحياتك وتقدر تقرا .env و ~/.npmrc وتسرق التوكنات. ignore-scripts بيقفلها. المكتبات اللي محتاجة build (bcrypt، sharp) هتحتاج تشغّل scripts بتاعتها بإيدك ([[npm rebuild bcrypt]]). والـ lock و npm ci بيضمنوا إن محدش يغيّر النسخ من تحتك.",
            when: "في CI وعلى السيرفر دايمًا، وعلى جهازك لو بتجرّب مكتبات جديدة.",
            mistakes: "تسطيب مكتبة من اسم شبه المشهورة (typosquatting). وتحديث كل حاجة لـ latest أول ما تنزل."
          },
          lines: [
            "سطّب من الـ lock من غير ما تشغّل أي install scripts.",
            "اتأكد من توقيعات المكتبات من الـ registry.",
            "خلّيها الافتراضي على جهازك.",
            "آخر مرة المكتبة اتنشر فيها حاجة."
          ]
        },
        {
          cmd: "باقي القايمة",
          title: "A04 و A06 و A08 و A09 في سطر",
          desc: "البنود اللي ملهاش كود في الصفحة، وعلاج كل واحد باختصار. المرجع owasp.org/Top10.",
          example: R`A04 Cryptographic Failures       HTTPS everywhere, no MD5/SHA1, secrets from env, strong random
A06 Insecure Design              Think about abuse cases before coding: limits, business rules
A08 Software/Data Integrity      Verify signatures, pin CI actions by SHA, no unsigned auto-updates
A09 Logging & Alerting Failures  Log logins, failed auth, admin actions; alert on spikes`,
          try: "اختار بند واحد وراجعه على آخر مشروع عملته.",
          flag: "script",
          deep: {
            why: "الثغرات الكبيرة مش كلها SQL و XSS: بيانات متشفّرة غلط، أو تصميم مفيهوش حدود، أو اختراق محدش خد باله منه شهور.",
            how: "A04: [[crypto.randomBytes]] مش Math.random للتوكنات، و HTTPS على كل حاجة. A06: اسأل «لو حد استخدم الميزة دي ١٠٠٠ مرة؟» قبل ما تكتبها. A08: ثبّت GitHub Actions بالـ SHA مش بالتاج. A09: سجّل كل login فاشل وكل تغيير صلاحيات، وحط تنبيه لو زادوا فجأة.",
            when: "مراجعة أمان قبل الإنتاج.",
            mistakes: "لوج فيه باسوردات أو توكنات. أو لوج محدش بيبص عليه."
          },
          lines: [
            "التشفير: HTTPS وخوارزميات قوية وأسرار بره الكود.",
            "التصميم: فكّر في إساءة الاستخدام قبل الكود.",
            "سلامة الكود والداتا: تحقق من التوقيعات وثبّت الـ actions.",
            "اللوج والتنبيه: سجّل الأحداث الحساسة ونبّه عليها."
          ]
        },
        {
          cmd: "الجديد في 2025",
          title: "تحديثان مهمان في القايمة",
          desc: "نسخة 2025 (اتثبتت رسميًا يناير 2026) ضافت تصنيفين جداد كانوا بيسببوا اختراقات كتير: [[Software Supply Chain Failures]] (A03)، يعني تعتمد على مكتبة أو أداة اتخترقت هي نفسها، وده أخطر من ثغرة في كودك لأنك مش شايفها، وعلاجه إنك تثبّت نسخ المكتبات وتفحصها. و [[Mishandling of Exceptional Conditions]] (A10)، يعني كودك مبيتعاملش صح مع الحالات الغريبة فيقع أو يتصرف غلط. كمان Security Misconfiguration طلعت لـ A02، و Injection (فيها SQL و XSS) نزلت لـ A05، و SSRF و CSRF بقوا جوه A01. المرجع الرسمي على owasp.org/Top10.",
          example: R`# ثبّت نسخ المكتبات عشان متتغيرش تحتك
npm ci        # بيستخدم package-lock.json بالظبط، مش بيحدّث
# افحص إن مفيش مكتبة متعرفش مصدرها
npm ls --all | head`,
          try: "شغّل [[npm ci]] بدل [[npm install]] في سيرفر الإنتاج، وافهم الفرق.",
          flag: "term",
          deep: {
            why: "OWASP بتحدّث القايمة على أساس بيانات اختراقات حقيقية. النسخة 2025 ضافت تصنيفين جداد.",
            how: R`Software Supply Chain Failures (A03): هجمات بتاخد شكل مكتبات أو نسخ ملغومة. [[npm ci]] بدل [[npm install]] يمنع التحديثات غير المتوقعة.

Mishandling of Exceptional Conditions (A10): كود بيقع أو بيتصرف غلط في حالات مش متوقعة. زي API بيرجع 500 مع stack trace لو الـ input غريب. الحماية: error handling شامل وtesting لـ edge cases.

المرجع الرسمي: owasp.org/Top10`,
            when: "وانت بتراجع أمان أي مشروع.",
            mistakes: "الافتراض إن OWASP 2021 لسه الـ standard. النسخة 2025 هي الرسمية دلوقتي."
          },
          lines: [
            "سطّب بالظبط النسخ اللي في package-lock (للإنتاج و CI)، من غير أي تحديث مفاجئ.",
            "شجرة كل المكتبات بما فيها مكتبات المكتبات، عشان تعرف إيه اللي داخل مشروعك فعلًا."
          ]
        }
      ]
    },
    {
      t: "البيانات الشخصية",
      l: 2,
      n: "أي موقع فيه تسجيل بيخزن بيانات ناس: تخزن أقل، وتحذف وتصدّر لما يطلبوا، وتشفّر الحساس، ومتسرّبهاش لـ staging ولا اللوج",
      items: [
        {
          cmd: "PII: متخزنهاش أصلًا",
          title: "أأمن داتا هي اللي معندكش",
          desc: R`PII (Personally Identifiable Information) هي أي حاجة تعرّف شخص لوحدها أو مع حاجة تانية: الاسم، والإيميل، والتليفون، والعنوان، والرقم القومي، والـ IP، والموقع، والصور. وفيه نوع أخطر اسمه «بيانات حساسة»: الصحة، والبيانات البيومترية، والدين، والبيانات المالية، وبيانات الأطفال. القوانين بتشدد عليها أكتر.

أول قاعدة قبل أي تشفير: خزّن أقل (data minimization). لكل عمود اسأل: الميزة دي محتاجاه فعلًا؟ لو محتاج تتأكد إن السن فوق 18، خزّن [[birth_year]] أو حتى [[is_adult]] مش تاريخ الميلاد كامل. لو بتدفع أونلاين، الكارت يفضل عند بوابة الدفع (Paymob، Stripe) وانت معاك reference وآخر 4 أرقام بس. و CVV ممنوع يتخزن خالص بعد الدفع، حتى متشفّر (قواعد PCI DSS).

اللي مش عندك مش ممكن يتسرّب، ومش محتاج تشفّره، ولا تحذفه، ولا تصدّره.`,
          example: R`CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  birth_year smallint,                 -- مش تاريخ الميلاد كامل لو محتاج السن بس
  city text,                           -- مش العنوان بالتفصيل لو مش بتشحن
  payment_customer_id text,            -- الكارت عند بوابة الدفع، وانت معاك reference بس
  card_last4 char(4),                  -- للعرض بس: «Visa تنتهي بـ 4242»
  national_id_enc text,                -- لو لازم قانونًا: متشفّر في التطبيق
  national_id_idx text UNIQUE,         -- HMAC عشان تدوّر بيه من غير ما تفك
  marketing_consent_at timestamptz,    -- الموافقة ليها وقت، مش checkbox متعلّم لوحده
  created_at timestamptz NOT NULL DEFAULT now()
);`,
          try: R`افتح جدول الـ users (أو أي جدول فيه بيانات ناس) في آخر مشروع عملته. لكل عمود اكتب: محتاجه لإيه بالظبط؟ ينفع يتخزن أقل؟ لو اتسرّب يضر قد إيه؟ وبعدين اكتب migration واحد يقلل أخطر عمود عندك (مثلًا [[birth_date]] يبقى [[birth_year]]، أو تشيل عمود كارت أو CVV لو موجود).`,
          flag: "script",
          deep: {
            why: R`كل عمود PII بتخزنه بيزود 4 حاجات: خطر التسريب، وشغل الحذف والتصدير لما اليوزر يطلب، والتزامات قانونية (القانون المصري و GDPR بيطلبوا إنك تجمع اللي محتاجه لغرض محدد بس)، وقيمة الداتا عند اللي هيسرقها. أغلب التسريبات الكبيرة كانت داتا الشركة مكانتش محتاجاها أصلًا.`,
            how: R`اعمل «data map»: جدول صغير فيه كل نوع داتا، ومحتاجينه لإيه، ومتخزن فين (الداتابيز، و S3، واللوج، و Sentry، وخدمة الإيميل، و analytics)، وبيتمسح إمتى، ومين بيوصله. من غيره مش هتعرف تحذف حساب ولا ترد على طلب تصدير.

البدائل الشائعة: السن بدل تاريخ الميلاد، والمدينة بدل العنوان، و token من بوابة الدفع بدل الكارت، وآخر 4 أرقام للعرض. والرقم القومي لو القانون بيلزمك بيه (زي KYC في شغل مالي)، يتشفّر في التطبيق (درس «تشفير عمود حساس» تحت) ومعاه HMAC للبحث.

والموافقة على التسويق ليها عمود بوقت ([[marketing_consent_at]])، عشان تقدر تثبت إمتى وافق، ولما يرجع فيها تبقى NULL.`,
            when: R`وانت بتصمم الـ schema، قبل ما يبقى فيه داتا. تقليل عمود بعد ما فيه ملايين صفوف واللوجات والباك أبات والـ exports كلها فيها نفس الداتا أصعب بكتير.`,
            mistakes: R`«نخزنه يمكن نحتاجه بعدين»: ده بالظبط اللي القوانين بتمنعه، وبيحوّل أي تسريب لكارثة. تخزين CVV أو رقم الكارت كامل «متشفّر»: ممنوع خالص في CVV، والكارت كامل بيدخّلك في PCI DSS كله. وتفتكر إن الـ IP مش PII: في GDPR ممكن يبقى PII.

في الانترفيو لو اتسألت «إزاي بتحمي بيانات المستخدمين؟»: ابدأ بـ minimization قبل التشفير. ده اللي بيبيّن إنك فاهم، مش حافظ أسماء خوارزميات.`
          },
          lines: [
            "جدول العملاء.",
            "id رقم بيزيد لوحده.",
            "الإيميل: محتاجينه للدخول والفواتير، فبيتخزن.",
            "الاسم: محتاجينه للفواتير والشحن.",
            "سنة الميلاد بس، كفاية تعرف السن.",
            "المدينة بس، لو مش محتاج عنوان شحن كامل.",
            "reference من بوابة الدفع (زي customer id)، والكارت نفسه عندهم.",
            "آخر 4 أرقام للعرض، ومفيش CVV ولا رقم كامل.",
            "الرقم القومي لو القانون بيلزمك: نص متشفّر من التطبيق، مش الرقم نفسه.",
            "بصمة HMAC للرقم عشان تدوّر بيه وتمنع التكرار من غير ما تفك التشفير.",
            "وقت الموافقة على التسويق، و NULL يعني مش موافق.",
            "وقت إنشاء الحساب.",
            "قفلة."
          ],
          sol: R`مثال لنتيجة المراجعة على جدول users عادي: [[email]] و [[name]] و [[password_hash]] محتاجينهم. [[birth_date]] كان عشان «فوق 18» بس، فيبقى [[birth_year]]. [[address]] بيستخدم في الشحن بس، فيتنقل لجدول الطلب نفسه ويتمسح بعد مدة. [[ip]] على كل صف: مالوش لازمة، يروح جدول login_events بمدة حفظ 90 يوم. و [[card_number]] أو [[cvv]] لو لقيتهم: دي أولوية قصوى، يتمسحوا فورًا ويتنقل الدفع لـ tokens من البوابة.

الـ migration تحت بيعمل ده في transaction واحدة. بعد ما تشغّله، [[SELECT * FROM people]] يوريك [[birth_year]] بـ 1990 ومفيش [[birth_date]] ولا [[card_number]] ولا [[cvv]].

خلي بالك إن DROP COLUMN مش بيمسح الداتا من الباك أبات القديمة ولا من اللوج ولا من أي export اتعمل قبل كده. عشان كده الـ data map مهم: الداتا في أماكن أكتر من الجدول.`,
          solCode: R`CREATE TABLE people (id int PRIMARY KEY, birth_date date, national_id text, card_number text, cvv text);
INSERT INTO people VALUES (1, '1990-05-01', '29005011234567', '4242424242424242', '123');

BEGIN;
ALTER TABLE people ADD COLUMN birth_year smallint;
UPDATE people SET birth_year = extract(year FROM birth_date);
ALTER TABLE people DROP COLUMN birth_date, DROP COLUMN cvv, DROP COLUMN card_number;
COMMIT;

SELECT * FROM people;`
        },
        {
          cmd: "القانون المصري و GDPR",
          title: "إيه اللي القانون عايزه من كودك",
          desc: R`مش محتاج تبقى محامي، بس محتاج تعرف القوانين بتطلب إيه من الكود. وأي تفاصيل قانونية هنا (أرقام، مدد، غرامات) راجعها مع محامي ومع النص الرسمي، لأنها بتتغير وبتتفسر.

في مصر: قانون حماية البيانات الشخصية رقم 151 لسنة 2020. اللائحة التنفيذية اتأخرت سنين، واتصدرت في نوفمبر 2025 (قرار وزير الاتصالات وتكنولوجيا المعلومات رقم 816 لسنة 2025) ومعاها فترة توفيق أوضاع سنة تقريبًا، يعني الالتزام الفعلي بيبدأ حوالي آخر 2026. الجهة المسؤولة «مركز حماية البيانات الشخصية». بيطلب: غرض محدد وموافقة، وموافقة صريحة ومكتوبة للبيانات الحساسة وبيانات الأطفال، وحقوق لصاحب البيانات (يعرف، ويصحح، ويمسح، ويعترض)، وإبلاغ المركز عن أي تسريب خلال 72 ساعة، وشروط لنقل البيانات بره مصر، وتراخيص أو تصاريح من المركز لكتير من الشركات.

GDPR (الاتحاد الأوروبي): بيطبق عليك حتى لو انت في مصر، لو بتقدم خدمة لناس في أوروبا أو بتتابع سلوكهم. أهم حقوقه اللي محتاجة كود: الوصول (Art. 15)، والمسح (Art. 17)، ونقل البيانات بصيغة يقراها جهاز (Art. 20). والرد على الطلب خلال شهر، وإبلاغ الجهة الرقابية عن التسريب خلال 72 ساعة.`,
          example: R`Egypt Law 151/2020   exec. regulations Nov 2025, ~1 year to comply; regulator: PDPC
Purpose & consent    collect for a stated purpose; explicit written consent for sensitive data
Data subject rights  access, correction, erasure, objection: build a way to do each one
Breach               notify the regulator within 72 hours (both laws), then affected users
Transfers abroad     hosting outside Egypt has conditions: check before picking a cloud region
GDPR scope           applies if you offer services to people in the EU, even from Egypt
GDPR in code         access (15), erasure (17), portability (20); answer within one month
Fines                Egypt up to EGP 5M; GDPR up to EUR 20M or 4% of global turnover`,
          try: R`اعمل «data map» لمشروعك في جدول: نوع الداتا، ومحتاجينها لإيه، ومتخزنة فين (بما فيها Sentry وخدمة الإيميل و analytics والباك أب)، والسيرفر في أنهي بلد، وبتتمسح إمتى. وبعدين جاوب: لو يوزر بعتلك النهارده «امسح بياناتي» أو «ابعتلي بياناتي»، هتعمل إيه بالظبط وتاخد قد إيه؟`,
          flag: "script",
          deep: {
            why: R`القوانين دي بتحوّل حاجات «كويس لو عملناها» لالتزامات: لازم يبقى فيه طريقة للحذف والتصدير، ولازم تعرف تبلّغ عن تسريب في 3 أيام، يعني لازم يبقى عندك لوج يقولك إيه اللي اتسرّب ولمين. والشغل مع عملاء أوروبيين أو شركات كبيرة غالبًا بيطلب منك تثبت إنك ملتزم (DPA وأسئلة أمان) قبل ما يمضوا.`,
            how: R`ترجمة القانون لكود:

الغرض والموافقة: عمود وقت الموافقة لكل نوع (تسويق، مشاركة مع طرف تالت)، وسياسة خصوصية بتقول الحقيقة عن اللي بتعمله.

الحقوق: endpoint للتصدير، ومسار حذف حقيقي (الدروس الجاية)، وطريقة لتصحيح البيانات من الإعدادات.

التسريب: لوجات دخول وتغييرات صلاحيات (A09 في «باقي القايمة»)، وخطة مين بيبلّغ مين، ومعاك قايمة بالـ processors (Sentry، و Resend، و S3) عشان تعرف الداتا راحت فين.

النقل للخارج: اختيار region السيرفر قرار قانوني مش تقني بس. أي خدمة SaaS بتبعتلها داتا يوزرز (Sentry، analytics) تعتبر نقل.

الغرامات: القانون المصري بيوصل لـ 5 مليون جنيه وفيه حبس في حالات البيانات الحساسة، و GDPR لـ 20 مليون يورو أو 4% من الإيراد العالمي، أيهما أكبر.`,
            when: R`قبل ما تطلق أي منتج فيه تسجيل، وقبل ما تختار سيرفرات بره مصر أو تضيف خدمة طرف تالت بتشوف داتا اليوزرز، وأول ما تبدأ تبيع لعملاء في أوروبا.`,
            mistakes: R`تنسخ privacy policy من موقع تاني وهي بتوصف حاجات مش بتعملها، أو مش بتذكر حاجات بتعملها. تفتكر إن القانون المصري «لسه مطبقش»: اللائحة صدرت وفترة التوفيق قربت تخلص. تفتكر إن GDPR مالوش علاقة بيك عشان انت في مصر. وتعتمد على كلامنا هنا في قرار قانوني: ده ملخص للمطور، مش استشارة.

في الانترفيو: «إيه اللي GDPR بيأثر بيه على تصميمك؟» جاوب بالحاجات اللي بتتبني: حذف حقيقي بيشمل الملفات والخدمات التانية، وتصدير JSON، ومدد حفظ بـ job، وداتا متشفرة، ولوج من غير PII.`
          },
          lines: [
            R`القانون المصري: اللائحة التنفيذية صدرت نوفمبر 2025، وفيه حوالي سنة توفيق أوضاع، والجهة الرقابية مركز حماية البيانات.`,
            "اجمع لغرض محدد، وموافقة صريحة مكتوبة للبيانات الحساسة.",
            "حقوق صاحب البيانات: يعرف، ويصحح، ويمسح، ويعترض. لازم يبقى فيه طريقة لكل واحدة.",
            "التسريب: بلّغ الجهة الرقابية خلال 72 ساعة في القانونين، وبعدها اليوزرز المتأثرين.",
            "النقل بره مصر ليه شروط، فاسأل قبل ما تختار region السيرفر.",
            "GDPR بيطبق عليك لو بتخدم ناس في أوروبا، حتى لو انت في مصر.",
            "حقوق GDPR اللي محتاجة كود: الوصول والمسح والنقل، والرد خلال شهر.",
            "الغرامات: لحد 5 مليون جنيه في مصر، ولحد 20 مليون يورو أو 4% من الإيراد العالمي في GDPR."
          ],
          sol: R`مثال data map لمشروع متجر صغير: الإيميل والاسم (حساب وفواتير، في Postgres، لحد ما يمسح الحساب)، وعنوان الشحن (للطلب بس، يتمسح من الطلب بعد 90 يوم من التسليم)، والتليفون (للمندوب، نفس المدة)، و IP الدخول (أمان، login_events، 90 يوم بـ job)، والصور (S3، مع الحساب)، والأخطاء (Sentry، فيها user id بس، الاحتفاظ حسب إعداد الخدمة)، والإيميلات (Resend، اسم وإيميل)، والباك أب (30 يوم وبيتمسح لوحده).

الإجابة على «امسح بياناتي»: زرار في الإعدادات بيشغّل transaction الحذف (الدرس الجاي)، و job بيمسح الملفات ويشيل الإيميل من خدمة الإيميل، والباك أب بيخلص في 30 يوم. وعلى «ابعتلي بياناتي»: job بيعمل ملف JSON ويبعت لينك (درس «تصدير الداتا و retention»).

لو إجابتك كانت «هفتح الداتابيز وأمسح بإيدي» أو «مش عارف الداتا دي فين كمان»، ده بالظبط اللي الـ data map بيكشفه.`
        },
        {
          cmd: "حذف الحساب",
          title: "زرار «امسح حسابي»: تمسح إيه، وتسيب إيه",
          desc: R`App Store بيطلب من يونيو 2022 (Guideline 5.1.1(v)) إن أي app فيه إنشاء حساب يبقى فيه حذف حساب من جوه الـ app، سهل تلاقيه، ويمسح الحساب والبيانات فعلًا. «تعطيل» أو «تجميد» الحساب مش كفاية، ومش مسموح تطلب منه يتصل أو يبعت إيميل إلا في مجالات منظّمة زي البنوك والصحة. ولو فيه Sign in with Apple لازم تلغي التوكن بتاعه من Apple كمان. و Google Play بيطلب من 2024 مسار حذف جوه الـ app، ولينك ويب يطلب منه الحذف من غير ما يسطّب الـ app تاني، وتحطه في Data safety form. راجع الإرشادات الحالية للمتجرين قبل ما تسلّم، لأنها بتتحدث.

الحذف الحقيقي مش [[DELETE FROM users]] بس. فيه داتا لازم تفضل (فواتير عشان الضرايب والمحاسبة)، فدي بتتعمل anonymize: تفضل الأرقام وتتشال أي حاجة تعرّف الشخص. والباقي يتمسح: الجلسات والتوكنات واللوجات المرتبطة. والملفات على S3 بتتحط في queue يمسحها worker. وتسجّل الـ id في جدول [[deleted_accounts]] عشان لو رجّعت باك أب قديم تعيد الحذف.`,
          example: R`\set uid 1
BEGIN;
UPDATE orders SET ship_name = NULL, ship_address = NULL WHERE user_id = :uid;
INSERT INTO files_to_delete (key)
  SELECT avatar_key FROM users WHERE id = :uid AND avatar_key IS NOT NULL;
INSERT INTO deleted_accounts (user_id) VALUES (:uid);
DELETE FROM users WHERE id = :uid;
COMMIT;`,
          try: R`اعمل database تجربة فيها: [[users]]، و [[orders]] بـ [[user_id]] عليه [[ON DELETE SET NULL]]، و [[sessions]] و [[login_events]] بـ [[ON DELETE CASCADE]]، و [[files_to_delete]] و [[deleted_accounts]] (أو خد الـ schema من الحل). حط يوزر عنده طلبات وجلسات وصورة، وشغّل المثال بـ [[psql -d test -f delete.sql]]. وبعدين اتأكد بـ queries إن مفيش أي أثر لليوزر غير أرقام الطلبات.`,
          flag: "script",
          deep: {
            why: R`المتاجر بترفض الـ app من غيره، والقوانين (القانون المصري و GDPR Art. 17) بتدّي اليوزر حق المسح. وحذف ناقص أخطر من مفيش حذف: اليوزر فاكر إن بياناته راحت، وهي لسه في S3 وخدمة الإيميل واللوج.`,
            how: R`كل جدول فيه reference لليوزر لازم تقرر فيه: يتمسح معاه ([[ON DELETE CASCADE]] للجلسات والتوكنات والـ events)، ولا يفضل من غير صاحبه ([[ON DELETE SET NULL]] للطلبات والفواتير، مع مسح الاسم والعنوان منها). ده في «تاب SQL و Prisma» في درس [[ON DELETE]].

كله في transaction واحدة (درس [[transaction]] هناك): لو خطوة فشلت مفيش حساب نص ممسوح.

الملفات مش جوه الداتابيز، ومينفعش تمسحها جوه الـ transaction (لو الـ transaction فشلت بعد ما مسحت الصورة، ضاعت). فبتكتب مفاتيحها في [[files_to_delete]] جوه نفس الـ transaction، و worker بياخدها بعد الـ commit ويمسحها ويعيد لو فشل. نفس الطريقة لخدمات بره: شيل الإيميل من قايمة الإيميلات، واحذف الـ customer من Stripe لو مش محتاجه، وامسح اليوزر من analytics.

الباك أب: مبتعدلش ملفات الباك أب. بتحدد مدة حفظ (مثلًا 30 يوم) وبتكتبها في سياسة الخصوصية، والداتا بتختفي لما الباك أب ينتهي. ولو رجّعت باك أب، شغّل الحذف تاني لكل id في [[deleted_accounts]].

وفي الـ app: اطلب تأكيد (باسورد أو OTP) قبل الحذف، ووضّح إيه اللي هيتمسح وإيه اللي هيفضل (الفواتير) وليه.`,
            when: R`من أول نسخة فيها تسجيل، خصوصًا لو هترفع على App Store أو Google Play. ولو فيه grace period (مثلًا 14 يوم يقدر يرجع فيها)، خليها واضحة، وبعدها الحذف يحصل أوتوماتيك بـ job.`,
            mistakes: R`soft delete ([[deleted_at]]) وتسميه حذف: ده تعطيل، والداتا كلها موجودة. الـ soft delete مفيد للطلبات (درس [[DELETE]] في «تاب SQL و Prisma»)، مش لحذف حساب. تمسح الصف وتنسى S3 و Sentry وخدمة الإيميل والـ cache. تمسح الفواتير كمان والمحاسب يحتاجها. تخلي الحذف عن طريق «ابعتلنا إيميل» والـ app يترفض. وتمسح الملفات جوه الـ request قبل الـ commit.

في الانترفيو «إزاي تعمل delete account؟»: قسّم الداتا لـ مسح / anonymize / حفظ قانوني، و transaction، و outbox للملفات والخدمات، والباك أب بمدة حفظ، وجدول deleted_accounts للاسترجاع.`
          },
          lines: [
            R`متغير في psql فيه id اليوزر. في التطبيق ده [[$1]] جوه transaction من الكود.`,
            "ابدأ transaction: يا كله يحصل يا ولا حاجة.",
            "الطلبات تفضل عشان المحاسبة، بس من غير اسم ولا عنوان.",
            "سجّل مفتاح الصورة في قايمة الملفات اللي worker هيمسحها بعد الـ commit...",
            "...لو اليوزر عنده صورة أصلًا.",
            "سجّل إن الحساب ده اتمسح، عشان لو رجّعت باك أب قديم.",
            R`امسح اليوزر: الجلسات والـ events بتتمسح بـ CASCADE، و [[orders.user_id]] بيبقى NULL.`,
            "ثبّت كل التغييرات مرة واحدة."
          ],
          sol: R`بعد التشغيل: الطلبات موجودة بالـ total بتاعها، بس [[user_id]] و [[ship_name]] و [[ship_address]] كلهم NULL. [[sessions]] و [[login_events]] مفيهمش ولا صف لليوزر (الـ CASCADE مسحهم)، و [[files_to_delete]] فيه [[avatars/1.png]]، و [[deleted_accounts]] فيه الـ id.

الغلط الشائع: لو [[orders.user_id]] من غير [[ON DELETE SET NULL]]، الـ DELETE هيفشل بـ foreign key violation والـ transaction كلها ترجع، ودي حاجة كويسة (أحسن من حذف نص). ولو عامل الـ FK بـ CASCADE على الطلبات، هتمسح الفواتير وده غالبًا ضد القانون المحاسبي.

الـ schema والـ checks تحت، شغّلهم في database فاضية، وبعدين شغّل المثال، وبعدين الـ checks.`,
          solCode: R`CREATE TABLE users (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, email text UNIQUE NOT NULL, name text NOT NULL, phone text, avatar_key text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE sessions (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE);
CREATE TABLE login_events (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint REFERENCES users ON DELETE CASCADE, ip inet, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE password_resets (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE orders (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint REFERENCES users ON DELETE SET NULL, ship_name text, ship_address text, total numeric(12,2) NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE files_to_delete (key text PRIMARY KEY, queued_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE deleted_accounts (user_id bigint PRIMARY KEY, deleted_at timestamptz NOT NULL DEFAULT now());

INSERT INTO users (email, name, avatar_key) VALUES ('mona@example.com', 'Mona Ali', 'avatars/1.png');
INSERT INTO sessions (user_id) VALUES (1), (1);
INSERT INTO login_events (user_id, ip) VALUES (1, '41.33.1.10');
INSERT INTO orders (user_id, ship_name, ship_address, total) VALUES (1, 'Mona Ali', '12 Tahrir St, Cairo', 350);

-- بعد ما تشغّل delete.sql:
SELECT id, user_id, ship_name, ship_address, total FROM orders;
SELECT (SELECT count(*) FROM users WHERE id = 1) AS users,
       (SELECT count(*) FROM sessions WHERE user_id = 1) AS sessions,
       (SELECT count(*) FROM login_events WHERE user_id = 1) AS events;
SELECT * FROM files_to_delete;
SELECT * FROM deleted_accounts;`
        },
        {
          cmd: "تصدير الداتا و retention",
          title: "ابعتله بياناته، وامسح القديم لوحده",
          desc: R`حق الوصول ونقل البيانات (GDPR Art. 15 و 20، وحق العلم في القانون المصري) معناه عمليًا زرار «نزّل بياناتي» بيدّي اليوزر ملف JSON فيه كل حاجة عنه. Postgres يقدر يبني الـ JSON ده في query واحدة بـ [[json_build_object]] و [[json_agg]]. ولو الداتا كبيرة، اعمله job في الخلفية يطلّع الملف ويبعت لينك بيخلص بعد وقت قصير.

والـ retention: كل نوع داتا ليه مدة، وبعدها يتمسح أوتوماتيك. لوجات الدخول 90 يوم، وتوكنات reset الباسورد يوم، والحسابات اللي متفعّلتش أسبوع. ده بيتعمل بـ job مجدول (زي job scheduler في BullMQ، في درس «background jobs» في «تاب بناء مشروع كامل»)، بيمسح على دفعات صغيرة عشان ميقفلش الجدول.`,
          example: R`\set uid 1
SELECT json_build_object(
  'profile', (SELECT row_to_json(u) FROM (SELECT email, name, phone, created_at FROM users WHERE id = :uid) u),
  'orders', (SELECT coalesce(json_agg(o ORDER BY o.created_at), '[]') FROM (SELECT id, total, ship_address, created_at FROM orders WHERE user_id = :uid) o),
  'exported_at', now()
) AS export;
WITH old AS (
  SELECT id FROM login_events
  WHERE created_at < now() - interval '90 days'
  ORDER BY id LIMIT 5000
)
DELETE FROM login_events e USING old WHERE e.id = old.id;`,
          try: R`على نفس الـ database بتاعة درس «حذف الحساب»: حط يوزر وطلبين، وشغّل الـ export بـ [[psql -qAt -f export.sql | python3 -m json.tool]]. بعدين املى [[login_events]] بـ 200 صف بتواريخ قديمة ([[generate_series]])، وشغّل الـ DELETE أكتر من مرة وعدّ الصفوف كل مرة. وآخر حاجة اكتب job في Node بيلف على كذا جدول ويمسح لحد ما يخلص.`,
          flag: "script",
          deep: {
            why: R`التصدير حق قانوني، والرد عليه يدوي كل مرة مش هيكمل. والـ retention بيقلل حجم أي تسريب: داتا اتمسحت من سنة مش ممكن تتسرق النهارده. وكمان بيصغّر الجداول والباك أبات.`,
            how: R`[[row_to_json]] بيحوّل صف لـ object، و [[json_agg]] بيجمّع صفوف في array، و [[coalesce(..., '[]')]] عشان اليوزر اللي ملوش طلبات ياخد array فاضية مش null. صدّر الداتا اللي تخص اليوزر هو بس، مش الـ internal IDs والـ hashes (مفيش [[password_hash]] في الملف).

الـ retention: الـ CTE بياخد أقدم 5000 id بس، والـ DELETE بيمسحهم. الـ job بيكرر لحد ما دفعة ترجع أقل من 5000. الدفعات بتخلي كل transaction قصيرة، فالـ locks والـ WAL ميتقلوش والتطبيق يفضل شغال. محتاج index على [[created_at]] عشان الـ WHERE يبقى سريع.

التصدير الكبير: job بيكتب الملف لـ S3 ويبعت لليوزر لينك موقّع صلاحيته ساعات قليلة، والملف نفسه يتمسح بعد أيام. واطلب إعادة تسجيل دخول قبل التصدير، وحط rate limit عليه.

وللجداول الضخمة جدًا (logs بالملايين يوميًا) الأسرع partitioning بالشهر: بتعمل [[DROP]] للـ partition القديم بدل DELETE.`,
            when: R`التصدير: أول ما يبقى عندك يوزرز حقيقيين. والـ retention: لكل جدول بيكبر مع الوقت وفيه PII (events، و audit logs، و tokens، و notifications)، ومعاه المدة مكتوبة في سياسة الخصوصية.`,
            mistakes: R`[[DELETE ... WHERE created_at < ...]] مرة واحدة على ملايين صفوف: transaction طويلة جدًا، وlocks، و replication lag. تحط الـ retention بـ setInterval جوه سيرفر الـ API فيشتغل مرتين لو عندك instanceتين. التصدير فيه password_hash أو داتا يوزرز تانيين (مثلًا رسايل فيها اسم الطرف التاني بالكامل). ولينك التصدير من غير صلاحية وقت أو من غير auth.`
          },
          lines: [
            R`id اليوزر (في التطبيق [[$1]]).`,
            "ابني object واحد فيه كل حاجة.",
            "بيانات الحساب: صف واحد يتحول لـ object.",
            R`الطلبات كـ array مرتّبة، و array فاضية لو مفيش.`,
            "وقت التصدير.",
            "قفلة، والناتج عمود اسمه export.",
            "الـ retention: هات دفعة من الصفوف القديمة...",
            "...من جدول لوجات الدخول...",
            "...اللي عدّى عليها 90 يوم...",
            "...أقدم 5000 بس عشان الـ transaction تفضل قصيرة.",
            "قفلة الـ CTE.",
            "امسح الصفوف دي بس. الـ job بيكرر لحد ما يخلص."
          ],
          sol: R`الـ export بيطلع object فيه [[profile]] (الإيميل والاسم والتليفون ووقت التسجيل) و [[orders]] كـ array و [[exported_at]]. ويوزر من غير طلبات بياخد [[orders]] كـ array فاضية مش null، بفضل الـ coalesce.

مع 200 صف من 1 لـ 200 يوم: أول DELETE بيقول [[DELETE 110]] تقريبًا (كل اللي أقدم من 90 يوم، لأنهم أقل من 5000)، والتاني [[DELETE 0]]، والباقي حوالي 90. لو غيّرت الـ LIMIT لـ 50 هتشوف 50 ثم 50 ثم 10، وده اللي الـ job بيعمله.

الـ job تحت اتجرب على Postgres 16: أول تشغيل بيطبع عدد الممسوح لكل جدول، والتاني بيطبع 0. اسم الجدول متحط في الـ SQL من لستة ثابتة في الكود، مش من مدخل مستخدم، والمدة بتتبعت كـ parameter. شغّله من job scheduler مرة في اليوم (BullMQ أو cron على السيرفر)، مش من جوه كل instance.`,
          solCode: R`// retention.mjs
import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const RULES = [
  { table: "login_events", keep: "90 days" },
  { table: "password_resets", keep: "1 day" },
];

export async function runRetention() {
  for (const { table, keep } of RULES) {
    let total = 0, n;
    do {
      ({ rowCount: n } = await pool.query(
        $__btWITH old AS (SELECT id FROM $__{table} WHERE created_at < now() - $1::interval ORDER BY id LIMIT 5000)
         DELETE FROM $__{table} t USING old WHERE t.id = old.id$__bt, [keep]));
      total += n;
    } while (n === 5000);
    console.log(JSON.stringify({ job: "retention", table, deleted: total }));
  }
}`
        },
        {
          cmd: "تشفير عمود حساس",
          title: "الرقم القومي متشفّر في التطبيق، والمفتاح بره الداتابيز",
          desc: R`تشفير الديسك اللي بتعمله الـ managed databases بيحميك لو حد سرق الهارد بس. أي حد معاه SQL (ثغرة injection، أو dump اتسرّب، أو نسخة staging، أو موظف) بيشوف الداتا واضحة. التشفير في التطبيق (application-level) معناه إن العمود متخزن نص مش مفهوم، والمفتاح عند التطبيق بس، فالـ dump لوحده مالوش قيمة.

استخدم [[aes-256-gcm]] من [[node:crypto]]: بيشفّر وبيتأكد إن محدش عدّل النص (auth tag). و IV عشوائي جديد لكل قيمة. وحط رقم نسخة المفتاح ([[v1:]]) في أول النص عشان تقدر تغيّر المفتاح بعدين.

المشكلة: مش هتعرف تعمل [[WHERE national_id = ...]] على نص متشفّر، لأن نفس الرقم بيطلع مختلف كل مرة. الحل «blind index»: عمود تاني فيه [[HMAC]] للرقم بمفتاح سري تاني، فتدوّر بيه (مطابقة كاملة بس، مش LIKE).

المفتاح: من KMS (AWS KMS، أو Google Cloud KMS، أو Vault) أو secret manager، وأقل حاجة متغير بيئة مش في Git. و [[pgcrypto]] بديل جوه Postgres، بس المفتاح بيتبعت مع كل query للداتابيز، فممكن يظهر في لوجات الاستعلامات، وأي حد معاه SQL والمفتاح يفك.`,
          example: R`import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";
const KEY = Buffer.from(process.env.PII_KEY, "base64");
const INDEX_KEY = Buffer.from(process.env.PII_INDEX_KEY, "base64");

export function encrypt(text) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.concat([c.update(text, "utf8"), c.final()]);
  return ["v1", iv.toString("base64"), c.getAuthTag().toString("base64"), data.toString("base64")].join(":");
}

export function decrypt(stored) {
  const [ver, iv, tag, data] = stored.split(":");
  if (ver !== "v1") throw new Error("unknown key version");
  const d = createDecipheriv("aes-256-gcm", KEY, Buffer.from(iv, "base64"));
  d.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([d.update(Buffer.from(data, "base64")), d.final()]).toString("utf8");
}

export const blindIndex = (text) => createHmac("sha256", INDEX_KEY).update(text).digest("hex");`,
          try: R`احفظ المثال في [[pii-crypto.mjs]]، واعمل مفتاحين بـ [[openssl rand -base64 32]]، وشغّل سكربت اختبار بـ [[PII_KEY=... PII_INDEX_KEY=... node test.mjs]]: شفّر نفس الرقم مرتين وقارن الناتجين، وفك واحد منهم، وقارن الـ blind index للرقم مرتين. وبعدين غيّر byte واحد في الجزء الأخير من النص المتشفّر وحاول تفكه. وآخر حاجة شغّله من غير [[PII_KEY]] خالص.`,
          flag: "script",
          deep: {
            why: R`في أي تسريب، الفرق بين «اتسرّب عمود متشفّر» و «اتسرّبت 100 ألف رقم قومي» هو الفرق بين حادثة صغيرة وكارثة قانونية. والتشفير في التطبيق بيحمي الـ dumps والباك أبات والـ replicas ونسخ staging، اللي هي أكتر أماكن الداتا بتتسرّب منها.`,
            how: R`GCM بيطلّع 3 حاجات: النص المتشفّر، والـ IV (12 byte عشوائي، مش سر بس لازم ميتكررش مع نفس المفتاح)، والـ auth tag (16 byte). بنخزنهم مع بعض في string واحد. وقت الفك، [[setAuthTag]] بيخلي [[final()]] يرمي error لو أي byte اتغير، فمحدش يقدر يعدّل القيمة من غير المفتاح.

الـ blind index: [[HMAC-SHA256]] بمفتاح منفصل. لو استخدمت [[sha256]] من غير مفتاح، الرقم القومي 14 رقم وجزء كبير منه متوقع (تاريخ الميلاد والمحافظة)، فممكن تجرّب كل الاحتمالات وترجّع الأرقام من الـ hash. الـ HMAC من غير مفتاحه مالوش قيمة.

KMS و envelope encryption: الـ KMS بيحتفظ بـ master key عمره ما بيطلع منه. التطبيق عنده data key متشفّر بالـ master key، وبيطلب من الـ KMS يفكه مرة وقت التشغيل ويحتفظ بيه في الذاكرة. لو حد سرق الكود والـ config من غير صلاحية الـ KMS، مش هيعرف يفك.

تغيير المفتاح: اعمل [[v2]] بمفتاح جديد، والكتابة الجديدة بـ v2، و [[decrypt]] يقرا الاتنين، و job يعيد تشفير القديم تدريجيًا.`,
            when: R`للأعمدة اللي تسريبها يضر بجد: الرقم القومي، وأرقام الحسابات، والبيانات الصحية، وتوكنات الـ OAuth لخدمات تانية. مش لكل عمود: الإيميل غالبًا محتاج تبحث بيه وتبعتله، فتشفيره تكلفته عالية وفايدته أقل.`,
            mistakes: R`IV ثابت أو متكرر مع GCM: بيكسر التشفير بالكامل. المفتاح في نفس الـ repo أو نفس الداتابيز. [[sha256]] من غير مفتاح كـ «تشفير» للرقم القومي. تستخدم [[aes-256-cbc]] من غير MAC فحد يعدّل النص من غير ما تاخد بالك. تنسى إن التشفير بيمنع [[LIKE]] والترتيب والـ indexes العادية. وتطبع القيمة بعد الفك في اللوج.

في الانترفيو «encryption at rest كفاية؟»: لأ، بيحمي من سرقة الديسك بس. application-level encryption بيحمي من الـ dump و SQL injection وأي حد عنده صلاحية قراية بس.`
          },
          lines: [
            R`دوال التشفير والـ HMAC والأرقام العشوائية من Node نفسه، مفيش مكتبة.`,
            R`مفتاح التشفير: 32 byte من متغير بيئة (أو من KMS وقت التشغيل). لو مش موجود السكربت بيقع على طول.`,
            R`مفتاح تاني منفصل للـ blind index.`,
            "دالة التشفير.",
            "IV عشوائي جديد لكل قيمة، 12 byte المقاس المعتاد لـ GCM.",
            R`اعمل cipher بـ [[aes-256-gcm]].`,
            "شفّر النص.",
            R`خزّن النسخة والـ IV والـ tag والنص في string واحد مفصول بـ [[:]].`,
            "قفلة.",
            "دالة الفك.",
            "فصّل الأجزاء الأربعة.",
            "لو نسخة مفتاح مش معروفة، وقّف.",
            "اعمل decipher بنفس المفتاح والـ IV.",
            R`حط الـ tag عشان [[final()]] يتأكد إن محدش عدّل حاجة.`,
            R`فك وارجع النص. لو اتعدّل، [[final()]] بيرمي error.`,
            "قفلة.",
            R`blind index: [[HMAC]] بالمفتاح التاني، نفس المدخل بيدّي نفس الناتج دايمًا فتقدر تدوّر بيه.`
          ],
          sol: R`هتشوف حاجة زي [[v1:uuOQ...:6Yje...==:xvWB...]]، و [[same ciphertext? false]] لأن كل مرة IV جديد، و [[decrypt: 29001011234567]]، و [[same index? true]]، و [[tampered: Unsupported state or unable to authenticate data]]: الـ auth tag كشف التعديل.

ومن غير [[PII_KEY]]: السكربت بيقع أول ما يتحمّل بـ TypeError من [[Buffer.from(undefined)]]. ده سلوك كويس: التطبيق ميشتغلش من غير مفتاح بدل ما يخزّن داتا مش متشفّرة. ولو المفتاح مش 32 byte هتاخد [[Invalid key length]].

لو [[same ciphertext]] طلعت true، يبقى الـ IV ثابت، ودي أخطر غلطة في GCM.

في الداتابيز: بتخزّن [[encrypt(id)]] في [[national_id_enc]] و [[blindIndex(id)]] في [[national_id_idx]] (عليه UNIQUE)، وتدوّر بـ [[WHERE national_id_idx = $1]] وتبعت [[blindIndex(input)]].`,
          solCode: R`// test.mjs
import { encrypt, decrypt, blindIndex } from "./pii-crypto.mjs";

const a = encrypt("29001011234567");
const b = encrypt("29001011234567");
console.log(a);
console.log("same ciphertext?", a === b);
console.log("decrypt:", decrypt(a));
console.log("same index?", blindIndex("29001011234567") === blindIndex("29001011234567"));

const parts = a.split(":");
const data = Buffer.from(parts[3], "base64");
data[0] ^= 1;
parts[3] = data.toString("base64");
try {
  decrypt(parts.join(":"));
} catch (e) {
  console.log("tampered:", e.message);
}`
        },
        {
          cmd: "mask قبل staging",
          title: "نسخة الإنتاج لـ staging، من غير بيانات الناس",
          desc: R`«خلينا ناخد نسخة من الإنتاج على staging عشان نجرّب على داتا حقيقية» طلب منطقي، بس staging غالبًا أضعف في الحماية، وعليه ناس أكتر، وأحيانًا بيبعت إيميلات حقيقية. الحل: mask. تاخد نسخة في database مؤقتة، وتغيّر كل PII لقيم مزيفة ثابتة الشكل، وبعدين تعمل dump من النسخة الممسوحة وتحطها على staging.

استخدم [[example.test]] للإيميلات: [[.test]] دومين محجوز مش هيوصل لحد حقيقي، فحتى لو staging بعت إيميل مش هيوصل. وسيب الأعمدة اللي مش PII (الأسعار، والتواريخ، والحالات) زي ما هي، عشان الداتا تفضل واقعية للتجربة. وفيه أدوات بتعمل ده بقواعد زي extension اسمه PostgreSQL Anonymizer، بس الفكرة واحدة.`,
          example: R`BEGIN;
UPDATE users SET
  email = 'user' || id || '@example.test',
  name = 'User ' || id,
  phone = CASE WHEN phone IS NULL THEN NULL ELSE '0100000' || lpad((id % 10000)::text, 4, '0') END,
  avatar_key = NULL;
UPDATE orders SET ship_name = 'Test User', ship_address = 'Test address';
TRUNCATE sessions, login_events;
SELECT count(*) AS leftover FROM users WHERE email NOT LIKE '%@example.test';
COMMIT;`,
          try: R`خد database فيها يوزرز وطلبات (زي بتاعة درس «حذف الحساب»)، واعتبرها الإنتاج. اعمل database مؤقتة وانسخ فيها بـ [[pg_dump | psql]]، وشغّل الـ mask عليها، وبعدين انسخها لـ database تالتة اسمها staging وامسح المؤقتة. في الآخر دوّر في dump الـ staging على أي اسم أو إيميل حقيقي بـ [[grep]].`,
          flag: "script",
          deep: {
            why: R`تسريبات كتير جت من نسخ staging أو dev أو من لابتوب مطوّر عليه dump الإنتاج، مش من الإنتاج نفسه. والقانون مش بيفرّق: داتا الناس اتسرّبت من عندك. وكمان staging بإيميلات حقيقية ممكن يبعت لعملاء حقيقيين إيميلات تجربة.`,
            how: R`ليه database مؤقتة ومش نعمل mask على staging على طول؟ لأن الـ UPDATE في Postgres بيعمل نسخة جديدة من الصف والقديمة بتفضل في الملفات لحد الـ VACUUM، وكمان في الـ WAL. لما تعمل dump من المؤقتة (logical)، الـ dump فيه القيم الجديدة بس، والمؤقتة بتتمسح بالكامل.

القيم المزيفة ثابتة ومبنية على الـ id: نفس اليوزر بياخد نفس الإيميل المزيف كل مرة، فالـ UNIQUE على الإيميل ميتكسرش، والـ bug اللي بتدور عليه في يوزر 1234 يفضل في يوزر 1234.

الـ [[SELECT count(*) AS leftover]] check جوه الـ transaction: لو طلع أكبر من 0 عارف إن فيه حاجة فاتت. و [[ON_ERROR_STOP=1]] في psql بيوقف السكربت عند أول خطأ بدل ما يكمل ويعمل dump نص ممسوح.

الـ TRUNCATE للجداول اللي مالهاش لازمة في staging أصلًا (الجلسات، واللوجات، والتوكنات). والجداول الجديدة: كل migration بيضيف عمود PII لازم يضيف سطره في سكربت الـ mask، فخليه جنب الـ migrations وراجعه في الـ PR.`,
            when: R`قبل أي نسخ من الإنتاج لأي مكان تاني: staging، و dev، و preview branches (خدمات زي Neon و Supabase بتعمل branches من الإنتاج بسهولة)، أو dump لمطوّر عشان يحل bug. ولو ينفع، الأحسن seed data مزيفة من الأول، والـ mask للحالات اللي محتاجة شكل الداتا الحقيقي.`,
            mistakes: R`تعمل mask على staging بعد الـ restore، والقيم القديمة تفضل في الـ WAL والباك أبات بتاعة staging. تنسى أعمدة زي [[notes]] أو [[metadata jsonb]] اللي فيها PII مستخبي، أو جداول زي audit_logs. تستخدم دومين حقيقي زي [[@test.com]] (ده دومين موجود!). وتنزّل dump الإنتاج على لابتوبك عشان تعمل له mask هناك: اعمله على سيرفر جوه نفس الشبكة.`
          },
          lines: [
            "كله في transaction: لو حاجة فشلت، مفيش نسخة نص ممسوحة.",
            "غيّر بيانات كل اليوزرز:",
            R`إيميل مزيف ثابت مبني على الـ id، على دومين [[.test]] اللي مش هيوصل لحد.`,
            "اسم مزيف.",
            "تليفون مزيف بنفس الشكل، واللي كان NULL يفضل NULL.",
            "امسح مفتاح الصورة (الصور الحقيقية على S3 الإنتاج مش هتتنسخ أصلًا).",
            "بيانات الشحن في الطلبات، والأسعار والتواريخ زي ما هي.",
            "الجلسات واللوجات مالهاش لازمة في staging: فضّيها.",
            "check: عدد الإيميلات اللي لسه حقيقية، لازم 0.",
            "ثبّت."
          ],
          sol: R`الـ mask بيطبع [[UPDATE]] بعدد الصفوف، و [[TRUNCATE TABLE]]، و [[leftover]] بـ 0. بعدها [[SELECT email, name, phone FROM users]] على staging بيطلع [[user1@example.test]] و [[User 1]] و [[01000000001]].

و [[pg_dump seclab_staging | grep -c "Mona"]] بيطلع 0. لو طلع أكتر، فيه عمود أو جدول نسيته في السكربت (دوّر في النتيجة تلاقيه فين).

الغلط الشائع: تشغّل الـ mask على staging بعد ما تعمل restore عليه مباشرة. النتيجة في الـ SELECT هتبان سليمة، بس القيم القديمة لسه في ملفات الداتابيز والـ WAL لحد ما تتمسح. الـ pipeline تحت بيعمل mask في database مؤقتة وينسخ الناتج بس.`,
          solCode: R`set -e
createdb app_mask_tmp
pg_dump --no-owner "$PROD_URL" | psql -q app_mask_tmp
psql -v ON_ERROR_STOP=1 -q -d app_mask_tmp -f mask.sql
pg_dump --no-owner app_mask_tmp | psql -q "$STAGING_URL"
dropdb app_mask_tmp
pg_dump "$STAGING_URL" | grep -c "Mona" || echo "no real names left"`
        },
        {
          cmd: "PII بره اللوج",
          title: "اللوج و Sentry ميبقوش نسخة تانية من الداتابيز",
          desc: R`اللوج بيتبعت لخدمات بره (Datadog، و Loki، و Sentry)، وبيتحفظ مدة طويلة، ومحدش بيعمله حذف لما اليوزر يمسح حسابه، وناس كتير بتشوفه. فأي إيميل أو تليفون أو توكن اتكتب فيه بقى متسرّب لكل دول، وخارج أي طلب حذف أو تصدير.

القاعدة: سجّل IDs مش بيانات. وحتى الـ id ممكن تبدّله بـ [[HMAC]] ثابت، فتقدر تتبع يوزر واحد في اللوج من غير ما يبقى مربوط بالداتابيز مباشرة. وكطبقة أمان تانية، [[redact]] في pino (شوف درس [[pino]] في «تاب Backend بـ Node») بيخفي الحقول اللي بالأسامي دي لو حد سجّلها بالغلط. وفي Sentry: [[dataCollection: { userInfo: false, cookies: false }]] (SDK 11) وفلتر [[beforeSend]] (درس «Sentry» في «تاب بناء مشروع كامل»).`,
          example: R`import pino from "pino";
import { createHmac } from "node:crypto";

const log = pino({
  redact: {
    paths: ["*.password", "*.token", "*.email", "*.phone", "*.nationalId", "req.headers.authorization", "req.headers.cookie"],
    censor: "[redacted]",
  },
});
const userRef = (id) => createHmac("sha256", process.env.LOG_SALT).update(String(id)).digest("hex").slice(0, 12);

log.info({ user: { id: userRef(42), email: "mona@example.com", phone: "01012345678" } }, "signup");
log.warn({ body: { email: "mona@example.com", password: "hunter2" } }, "login failed");`,
          try: R`[[npm i pino]] واحفظ المثال في [[logs.mjs]] وشغّله بـ [[LOG_SALT=abc node logs.mjs]]. بعدين زوّد سطر: [[log.info({ user: { profile: { email: "deep@example.com" } } }, "nested")]]، وشوف الإيميل ده اتخفى ولا لأ. صلّحها. وبعدين دوّر في كودك بـ grep على [[console.log(req.body]] و [[console.log(user]].`,
          flag: "script",
          deep: {
            why: R`اللوج أكتر مكان PII بيتسرّب منه من غير ما حد ياخد باله، لأن محدش بيعتبره «داتابيز». ولما اليوزر يطلب مسح بياناته، مش هتعرف تمسحها من 6 شهور لوج في 3 خدمات. فالحل الوحيد العملي إنها متدخلش أصلًا.`,
            how: R`[[redact]] في pino (بيستخدم مكتبة fast-redact) بيحوّل كل path لكود سريع بيغيّر القيمة قبل ما السطر يتكتب. [[*.email]] معناها «أي key في المستوى الأول جواه email»، يعني [[user.email]] و [[body.email]]، بس مش [[user.profile.email]]. كل مستوى أعمق محتاج path بتاعه ([[*.*.email]]). عشان كده الـ redact شبكة أمان، مش الحل الأساسي.

[[userRef]]: HMAC بمفتاح ([[LOG_SALT]]) بيدّي نفس الـ 12 حرف لنفس اليوزر دايمًا. تقدر تجمّع كل لوجات يوزر واحد، ولما تحتاج تعرف هو مين فعلًا تحسبه من الـ id في الداتابيز وتقارن. ولو اليوزر اتمسح، الـ ref في اللوج مبقاش بيشاور على حد.

في Sentry SDK 11: [[dataCollection: { userInfo: false, cookies: false }]] بيمنع الـ IP والكوكيز وبيانات اليوزر، ولازم تكتبه بنفسك لأن 11 بيجمعهم افتراضيًا. الخيار القديم [[sendDefaultPii]] (نسخة 10 وقبلها، وكان false افتراضيًا) نسخة 11 بتتجاهله من غير أي تحذير. و [[beforeSend(event)]] بيدّيك الـ event قبل ما يتبعت: امسح [[event.user.email]] و [[event.request.data]] لو فيه form بيانات شخصية، وارجع الـ event. وافتكر إن رسالة الـ error نفسها ممكن يبقى فيها PII لو كتبتها كده: [[new Error("User " + email + " not found")]].`,
            when: R`من أول سطر لوج في المشروع. وراجع أي لوج بيطبع object كامل (req.body، و user، و الـ response) لأن الـ object ده هيكبر بحقول جديدة ومحدش هيفتكر اللوج.`,
            mistakes: R`[[console.log(req.body)]] في login أو signup، فالباسوردات في اللوج. تسجيل الـ query string كامل وفيه [[?token=]] أو [[?email=]]. [[logger.info(user)]] للـ object كله. الاعتماد على redact بس وهو مبيغطيش المستويات الأعمق. و Sentry من غير [[dataCollection]] في نسخة 11 (بيبعت الـ IP والكوكيز افتراضيًا)، أو تفتكر إن [[sendDefaultPii: false]] لسه شغال فيها.

في الانترفيو: «إزاي تتعامل مع PII في اللوج؟» IDs مش بيانات، و pseudonymous refs، و redact كطبقة تانية، ومدة حفظ للوج، وسؤال: اللوج بيتبعت لأنهي خدمة وفي أنهي بلد.`
          },
          lines: [
            "استورد pino.",
            R`و [[createHmac]] عشان نعمل ref ثابت لليوزر.`,
            "اعمل الـ logger.",
            R`[[redact]]: خطوط دفاع للحقول الحساسة.`,
            R`الحقول دي في أي object في المستوى الأول، وهيدرز الـ auth والكوكيز.`,
            R`بدل القيمة اكتب «[redacted]».`,
            "قفلة الـ redact.",
            "قفلة الـ logger.",
            R`ref ثابت لليوزر: HMAC للـ id بمفتاح، أول 12 حرف كفاية للتجميع.`,
            "لوج تسجيل: الـ ref بيظهر، والإيميل والتليفون بيتخفوا.",
            "لوج دخول فاشل: الإيميل والباسورد بيتخفوا حتى لو حد سجّل الـ body كله بالغلط."
          ],
          sol: R`أول سطرين بيطلعوا زي: [[{"user":{"id":"7e00ac929d73","email":"[redacted]","phone":"[redacted]"},"msg":"signup"}]] و [[{"body":{"email":"[redacted]","password":"[redacted]"},"msg":"login failed"}]]. والـ id نفسه (42) مش ظاهر، الـ ref بس، وبيطلع نفس القيمة كل تشغيل طالما [[LOG_SALT]] ثابت.

السطر الـ nested بيطلع الإيميل واضح: [[{"user":{"profile":{"email":"deep@example.com"}}}]]، لأن [[*.email]] بيطابق مستوى واحد بس. التصليح تحت: تولّد الـ paths لمستويين من لستة واحدة. وبعدين بتشوف «[redacted]» في المستوى التاني كمان. الأحسن من كده إنك متسجلش object فيه profile أصلًا.

الـ grep في كودك: كل [[console.log(req.body)]] أو [[log.info(user)]] بيطبع object كامل، غيّره لـ IDs وحقول محددة.`,
          solCode: R`import pino from "pino";
import { createHmac } from "node:crypto";

const SENSITIVE = ["password", "token", "email", "phone", "nationalId"];
const log = pino({
  redact: {
    paths: [
      ...SENSITIVE.map((k) => $__bt*.$__{k}$__bt),
      ...SENSITIVE.map((k) => $__bt*.*.$__{k}$__bt),
      "req.headers.authorization",
      "req.headers.cookie",
    ],
    censor: "[redacted]",
  },
});
const userRef = (id) => createHmac("sha256", process.env.LOG_SALT).update(String(id)).digest("hex").slice(0, 12);

log.info({ user: { profile: { email: "deep@example.com" } } }, "nested");
log.info({ user: { id: userRef(42) } }, "profile updated");`
        }
      ]
    },
    {
      t: "أدوات الفحص",
      l: 3,
      n: "أدوات مشروعة تشغّلها على مشاريعك انت لتكتشف الثغرات قبل غيرك",
      items: [
        {
          cmd: "فحص الـ headers",
          title: "أول وأسرع فحص",
          desc: "الأمر بيطبع headers الحماية الموجودة. لتقرير بدرجة: securityheaders.com. الناقص منهم تضيفه في Nginx بـ [[add_header]] أو بـ helmet في Express. أهمهم HSTS (يجبر HTTPS) و CSP (يحدد السكربتات المسموحة، وده أقوى حماية ضد XSS).",
          example: R`curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy"`,
          try: "افحص موقعك على securityheaders.com واستهدف درجة A.",
          flag: "term",
          deep: {
            why: "أسرع فحص تعمله من غير أي أداة: هل سيرفري بيبعت الـ security headers المهمة؟",
            how: R`الأمر بياخد ثانية ويوريك كل header مهم موجود. اللي مش موجود يبقى ناقص.

أهمهم: [[Strict-Transport-Security]] بيجبر HTTPS. [[Content-Security-Policy]] بيمنع XSS. [[X-Frame-Options: DENY]] بيمنع clickjacking. [[X-Content-Type-Options: nosniff]] بيمنع MIME confusion.

لو عايز درجة شاملة: securityheaders.com. تضيف headers ناقصة في Nginx بـ [[add_header]] في الـ server block.`,
            when: "بعد كل deploy. واجعله جزء من checklist الرفع.",
            mistakes: "CSP بتحتاج تعرف كل مصدر بيحمّل منه. ابدأ بـ [[Content-Security-Policy-Report-Only]]."
          },
          lines: ["الـ headers بس، وفلتر على headers الأمان الستة. اللي ناقص ضيفه في Nginx أو helmet."]
        },
        {
          cmd: "SSL Labs",
          title: "فحص الـ HTTPS",
          desc: "ssllabs.com/ssltest بيدّي درجة لإعدادات الـ SSL بتاعتك، ويقولك لو بتدعم بروتوكولات قديمة ضعيفة. استهدف A. certbot بيظبط أغلب ده لوحده، بس الفحص بيطمّنك.",
          example: R`# تاريخ انتهاء الشهادة من الترمنال
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -dates`,
          try: "افحص موقعك على SSL Labs واعرف درجتك.",
          flag: "term",
          deep: {
            why: "HTTPS مش كل حاجة. إعدادات الـ TLS نفسها ممكن تكون ضعيفة.",
            how: R`SSL Labs بيجرّب كل cipher suites وprotocols وcertificate chain، وبيدّيك درجة من A+ لـ F.

أشهر المشاكل: دعم TLS 1.0 أو 1.1 (قديمين). شهادة منتهية. Cipher suites ضعيفة.

certbot مع Nginx بيحط إعدادات معقولة، بس ممكن تحتاج تظبط [[ssl_protocols]] في Nginx.`,
            when: "بعد تجهيز HTTPS لأول مرة. وكل ٣ شهور تتأكد إن certbot جدّد.",
            mistakes: "تكتفي بـ certbot وتفتكر كل حاجة تمام. إعدادات TLS الافتراضية في Nginx القديمة ممكن ضعيفة."
          },
          lines: ["نفس أمر bash: اتصل HTTPS، خد الشهادة، واطبع تاريخ بدايتها ونهايتها."]
        },
        {
          cmd: "OWASP ZAP",
          title: "سكانر ثغرات مجاني",
          desc: "أشهر سكانر مجاني (بديل Burp Suite المدفوع). الـ Automated Scan بيزحف على موقعك ويجرّب ثغرات شائعة ويطلعلك تقرير. شغّله على مواقعك بس. ابدأ بالـ Passive scan (بيراقب من غير ما يهاجم) قبل الـ Active. متشغّلش Active scan على موقع إنتاج فيه مستخدمين، لأنه بيبعت طلبات كتير وممكن يعمل بيانات وهمية.",
          example: R`docker run -t ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t https://your-own-site.com`,
          try: "شغّل ZAP baseline على موقع تجربة بتاعك (مش إنتاج) واقرا التقرير.",
          flag: "term",
          deep: {
            why: "بعد ما تأمّن الكود، محتاج تختبر من بره: ZAP بيجرّب هجمات معروفة ويقولك إيه اللي نجح.",
            how: R`ZAP أداة مجانية من OWASP. بتشغّله وتوجّهه لموقعك، وهو بيزحف ويجرّب ثغرات شائعة. بعدين تقرير مع الأولويات.

Passive Scan بيراقب فقط (بدون هجوم)، مناسب على الإنتاج. Active Scan بيبعت طلبات فعلية، لازم على بيئة تجربة بس. الـ Docker command baseline scan بيعمل passive فقط.`,
            when: "قبل كل إطلاق كبير، على بيئة staging. مش على الإنتاج.",
            mistakes: "تشغّله على الإنتاج بـ Active Scan. ممكن يكتب داتا وهمية ويبعت طلبات كتير."
          },
          lines: [
            "شغّل ZAP من Docker (الشرطة المايلة في الآخر: الأمر مكمّل في السطر اللي بعده).",
            "فحص baseline (passive، مش بيهاجم) على موقعك انت."
          ]
        },
        {
          cmd: "nmap",
          title: "إيه المفتوح على سيرفرك",
          desc: "بيوريك البورتات المفتوحة زي ما العالم شايفها. المفروض تلاقي 22 و 80 و 443 بس. لو لقيت بورت قاعدة بيانات (5432 أو 27017) مفتوح للعالم، دي مشكلة كبيرة: اقفله في الفايروول وخلّي التطبيق يوصله على 127.0.0.1. على سيرفراتك انت بس.",
          example: R`nmap -sV 203.0.113.10
nmap -p- 203.0.113.10`,
          try: "اعمل scan لسيرفرك، واتأكد إن مفيش بورت قاعدة بيانات مفتوح.",
          flag: "term",
          deep: {
            why: "بعد كل تغيير في الفايروول أو Docker، تتأكد إن مفيش بورت مفتوح بالغلط. شرحناه في bash المستوى ٣.",
            how: R`[[-sV]] بيحاول يعرف البرنامج ونسخته على كل بورت، وده بيوريك الـ attack surface من وجهة نظر المهاجم.

على سيرفراتك انت بس، ومن جهازك مش من السيرفر، عشان تشوف الصورة الحقيقية من بره.`,
            when: "بعد أي تغيير في ufw أو إضافة خدمة جديدة.",
            mistakes: "تشغيله على أي حاجة مش ملكك."
          },
          lines: ["افحص البورتات المشهورة واعرف البرنامج ونسخته على كل واحد.", "افحص كل الـ 65535 بورت."]
        },
        {
          cmd: "السكانرات في CI",
          title: "افحص مع كل push",
          desc: "تحط الفحص في الـ pipeline فيتشغّل لوحده. [[npm audit]] يفشل الـ build لو فيه ثغرة عالية، [[gitleaks]] يفشّل الـ build لو فيه سر (ولمنعه قبل الـ commit حطه pre-commit hook)، و [[Semgrep]] بيفحص الكود نفسه على أنماط خطيرة. Trivy بيفحص Docker images.",
          example: R`# في GitHub Actions
npm audit --audit-level=high
docker run -v $(pwd):/src semgrep/semgrep semgrep --config auto
trivy image myapp:latest`,
          try: "ضيف [[npm audit --audit-level=high]] كخطوة في GitHub Actions لمشروع عندك.",
          flag: "term",
          deep: {
            why: "الأمان مش بتعمله مرة وتنسى. لما تضيفه في الـ pipeline، كل push بيتفحص أوتوماتيك.",
            how: R`[[npm audit --audit-level=high]] يفشل الـ build لو ثغرة high أو critical. فمحدش يرفع كود بمكتبات خطيرة.

Semgrep بيحلل الكود نفسه ويدوّر على patterns خطيرة. [[--config auto]] بيختار rules حسب اللغة.

Trivy بيفحص Docker images. كل package في الـ image بيقارنها بـ CVE database.`,
            when: "في GitHub Actions. خليهم يشتغلوا على كل PR.",
            mistakes: "تحط السكانرات وتـignore كل الـ warnings. خصص وقت أسبوعي لمراجعة الـ findings."
          },
          lines: [
            "فشّل الـ build لو فيه ثغرة high أو critical.",
            "Semgrep بيفحص الكود نفسه على أنماط خطيرة، والقواعد بتتختار حسب اللغة.",
            "Trivy بيفحص الـ Docker image: كل package في النظام جواها."
          ]
        }
      ]
    },
    {
      t: "أسرار وبورتات على السيرفر",
      l: 3,
      n: "اللي بيتسرّب من غير ما تاخد بالك: build args، و .env في Git، وبورتات Docker، والباك أب",
      items: [
        {
          cmd: "أسرار في build args",
          title: "السر اللي اتبعت وقت البناء بيفضل جوه الـ image",
          desc: "أي قيمة بتبعتها بـ [[--build-arg]] وبيستخدمها [[RUN]] بتتسجل في تاريخ الـ image، وأي حد معاه الـ image يقراها بـ [[docker history]]. متغيرات [[NEXT_PUBLIC_]] و [[VITE_]] عادي، لأنها أصلًا بتتحط في ملفات JavaScript اللي بتروح للمتصفح. أسرار السيرفر مكانها وقت التشغيل بس. ولو محتاج سر وقت البناء (توكن npm خاص)، استخدم [[--secret]].",
          example: R`docker history --no-trunc myapp:latest | grep -iE "key|secret|password|token"
docker image inspect myapp:latest --format '{{json .Config.Env}}'
docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t myapp .
docker build --secret id=npmrc,src=$HOME/.npmrc -t myapp .
# وجوه الـ Dockerfile:
# RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci`,
          try: "ابني image تجربة فيها [[ARG TOKEN]] و [[RUN echo done]] بعده، بـ [[--build-arg TOKEN=abc123]]، وبعدين [[docker history --no-trunc]]: هتلاقي abc123.",
          deep: {
            why: "الـ image بتتنقل: على registry، أو لجهاز تاني، أو لزميل. لو فيها مفتاح بوابة الدفع أو باسورد قاعدة البيانات، كل اللي يوصلها وصل للمفاتيح. ومحدش بيفكر يفتح تاريخ الـ image غير اللي بيدوّر على كده.",
            how: R`[[ARG]] قيمة وقت البناء. بس أي [[RUN]] بعدها بيتسجل في الـ history ومعاه قيم الـ ARGs اللي كانت متاحة. و [[ENV]] أسوأ: بتفضل في إعدادات الـ image ([[inspect]] بيطلّعها) وفي كل container.

الفرق المهم في Next.js و Vite: [[NEXT_PUBLIC_*]] و [[VITE_*]] لازم تتبعت وقت البناء لأنها بتتكتب جوه ملفات الـ JS، وأي زائر يقدر يشوفها في DevTools. فهي مش أسرار أصلًا (زي anon key بتاع Supabase). إنما [[SERVICE_ROLE_KEY]] أو [[DATABASE_URL]] أو مفتاح الدفع: [[env_file]] في compose أو [[--env-file]] وقت التشغيل، والتطبيق يقراهم من process.env على السيرفر.

[[--secret id=npmrc,src=...]] مع [[RUN --mount=type=secret]] (BuildKit): الملف بيبقى متاح للأمر ده بس وقت البناء، ومبيتسجلش في أي طبقة ولا في الـ history.

وحتى في multi-stage: السر في مرحلة الـ builder مش هيبان في الـ image النهائية، بس بيفضل في كاش البناء على الجهاز اللي بنى.

لو لقيت سر في image اتنشرت: غيّره (امسح الـ image مش كفاية، ممكن حد نزّلها).`,
            when: "مراجعة أي Dockerfile أو سكربت deploy فيه [[--build-arg]]، وقبل ما ترفع image على registry.",
            mistakes: "في مشروع حقيقي سكربت الـ deploy كان بيبعت أسرار السيرفر (مفاتيح بوابة الدفع و service role) كـ [[--build-arg]]، وكمان بيطبع قيمها في اللوج عشان «يتأكد». وفي مشروع تاني [[DATABASE_URL]] كان build ARG فاتحفظ في الـ image بالباسورد. الصح: اطبع أسامي المتغيرات بس ([[docker exec app env | cut -d= -f1]])."
          },
          lines: [
            "دوّر في تاريخ الـ image كامل على أي حاجة شكلها سر.",
            "متغيرات ENV المحفوظة في الـ image.",
            "متغير عام (بيروح للمتصفح أصلًا): عادي كـ build-arg.",
            "سر وقت البناء: يتركّب كملف مؤقت ومبيتسجلش."
          ]
        },
        {
          cmd: ".env اترفع على Git",
          title: "ملف الأسرار اتعمله commit: تعمل إيه بالترتيب",
          desc: "أول خطوة مش في Git: غيّر كل مفتاح كان في الملف، لأنه خلاص اتسرب. بعدها [[git rm --cached]] يوقف التتبع والملف يفضل عندك، و [[.gitignore]] يمنعه يرجع. والتاريخ القديم لسه فيه الملف، فمسحه من التاريخ خطوة إضافية، مش بديل عن تغيير المفاتيح.",
          example: R`git log --all --oneline -- .env
git show a1b2c3d:.env | cut -d= -f1
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore && git commit -m "stop tracking .env"
git push`,
          try: "في repo تجربة: اعمل commit لـ .env فيه [[API_KEY=test]]، ونفّذ الخطوات، وبعدين [[git log --all -- .env]]: لسه ظاهر في التاريخ. ده اللي لازم تفهمه.",
          deep: {
            why: "الغلطة الشائعة: تعمل [[git rm --cached]] وتفتكر إن الموضوع اتقفل. الملف لسه في كل commit قديم، ولو الريبو اترفع على GitHub فالبوتات ممكن تكون نسخته في دقايق. المفاتيح هي اللي لازم تتغير.",
            how: R`[[git log --all --oneline -- .env]]: كل commit لمس الملف، في كل الـ branches. أقدم واحد هو إمتى بدأ التسريب.

[[git show a1b2c3d:.env | cut -d= -f1]]: أسامي المتغيرات بس في النسخة دي من غير القيم، دي قايمة المفاتيح اللي لازم تتغير. غيّرها كلها: باسورد قاعدة البيانات، ومفاتيح الـ APIs، و JWT secret (كل اليوزرز هيعملوا login تاني)، ومفاتيح الدفع. وحدّث [[.env]] على السيرفر بالجديد.

[[git rm --cached .env]]: شيله من Git والملف يفضل على جهازك. و [[.gitignore]] عشان [[git add .]] ميرجعوش.

مسح التاريخ (اختياري، وبعد تغيير المفاتيح): [[git filter-repo --path .env --invert-paths]] بيعيد كتابة كل الـ commits من غيره، وبعدين [[git push --force]]. ده بيكسر أي نسخة عند حد تاني، ومش بيوصل للـ forks ولا لنسخ حد نزّلها قبل كده. عشان كده تغيير المفاتيح هو الحل، والمسح نضافة بس.

وبعدين [[gitleaks git .]] (الدرس الأول في التاب) يتأكد إن مفيش حاجة تانية.`,
            when: "أول ما تكتشف إن .env أو أي ملف فيه أسرار اتعمله commit، حتى لو الريبو private.",
            mistakes: "تغيّر مفتاح واحد وتنسى الباقي. و [[.env.example]] فيه القيم الحقيقية لأنه اتنسخ من [[.env]]. وتعمل force push بتاريخ جديد وتسيب المفاتيح القديمة شغالة."
          },
          lines: [
            "كل commit لمس .env في كل الـ branches.",
            "أسامي المتغيرات في نسخة قديمة (من غير القيم): دي اللي هتغيّرها.",
            "شيله من Git وسيبه على جهازك.",
            "امنعه يرجع.",
            "احفظ التغيير.",
            "ارفع."
          ]
        },
        {
          cmd: "ss -tlnp بعد compose",
          title: "مين من الـ containers مفتوح للنت فعلًا",
          desc: "Docker بيفتح أي بورت في [[ports:]] على كل العناوين وبيعدّي من ufw. فبعد أي [[compose up]]، شوف مين بيسمع على [[0.0.0.0]]: المفروض 80 و 443 (و 22) بس. أي قاعدة بيانات أو API هناك مكشوفة. الحل [[127.0.0.1:5000:5000]] أو تشيل [[ports]] خالص.",
          example: R`docker compose up -d
sudo ss -tlnp | grep -E "0\.0\.0\.0|\[::\]"
docker compose ps --format "table {{.Service}}\t{{.Ports}}"
nmap -Pn -p 22,80,443,3000,5000,5432,6379,27017 203.0.113.10`,
          try: "على سيرفر التجربة شغّل Redis منشور على [[6379:6379]] و ufw مفعّل، واعمل nmap من جهازك: هتلاقيه open. غيّرها لـ 127.0.0.1:6379:6379 وجرّب تاني.",
          deep: {
            why: "ufw بيديك إحساس إن كل حاجة مقفولة غير اللي فتحته، و Docker بيكسر الإحساس ده بصمت. Redis من غير باسورد أو Mongo مكشوف بيتلاقوا ويتخترقوا في ساعات، لأن فيه بوتات بتعمل scan للنت كله على البورتات دي.",
            how: R`[[ss -tlnp]]: كل بورت TCP بيسمع، ومين البرنامج. مع Docker هتلاقي [[docker-proxy]] على البورتات المنشورة. العنوان [[0.0.0.0]] أو [[::]] يعني كل الشبكات، و [[127.0.0.1]] يعني السيرفر نفسه بس.

[[compose ps]] بالـ Ports بيوريك كل service ومنشورة إزاي: [[0.0.0.0:5432->5432/tcp]] مكشوفة، و [[127.0.0.1:5432->5432/tcp]] محلية.

[[nmap]] من جهازك انت (مش من السيرفر) هو الاختبار الحقيقي: ده اللي الناس شايفاه. [[-Pn]] متعملش ping الأول.

الحل: service محتاجة Nginx يوصلها بس؟ متنشرهاش خالص، Nginx يوصلها بالاسم جوه شبكة compose. محتاج توصلها من السيرفر نفسه (أو SSH tunnel)؟ [[127.0.0.1:5432:5432]].`,
            when: "بعد أول compose up على أي سيرفر، وبعد أي تعديل في ports، وكجزء من preflight (تاب VPS).",
            mistakes: "في مشروع حقيقي الباك إند كان ناشر [[5000:5000]] فالـ API متاح مباشرة من غير Nginx، يعني من غير rate limit ولا HTTPS. وفي مشروع تاني ملف الإنتاج كان فاتح Postgres على 5433 و Redis على 6379 للنت، و Redis من غير باسورد، و ufw شغال فالكل فاكر إنهم مقفولين."
          },
          lines: [
            "شغّل الـ stack.",
            "مين بيسمع على كل العناوين؟",
            "كل service ومنشورة على أنهي عنوان.",
            "من جهازك: البورتات دي مفتوحة للنت فعلًا؟"
          ]
        },
        {
          cmd: "openssl enc",
          title: "تشفير الباك أب قبل ما يطلع من السيرفر",
          desc: "الباك أب فيه قاعدة البيانات كلها، فلما يتخزن بره السيرفر (Google Drive، أو S3) لازم يبقى متشفر. [[openssl enc]] بيضغط ويشفّر في pipe واحد، والباسورد جاي من متغير بيئة ([[env:]]) مش من سطر الأوامر. وجرّب الفك قبل ما تحتاجه.",
          example: R`export BACKUP_PASSPHRASE="$(cat /root/.backup-pass)"
tar -czf - app.dump config.tar.gz | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -pass env:BACKUP_PASSPHRASE -out backup.tar.gz.enc
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE -in backup.tar.gz.enc | tar -tzf -
rclone copy backup.tar.gz.enc remote:backups/ && rclone check backup.tar.gz.enc remote:backups/ --one-way`,
          try: "شفّر أي فولدر، وفكه في فولدر تاني بـ [[tar -xzf -]] بدل [[-tzf]]، وقارن بـ [[diff -r]].",
          deep: {
            why: "باك أب مش متشفر على خدمة تخزين هو نسخة كاملة من بيانات عملائك مستنية أي حد يوصل للحساب ده. والتشفير بيخلي تسريب الملف مش مهم طالما الباسورد في أمان.",
            how: R`[[tar -czf -]]: اضغط الملفات واكتب الناتج على stdout ([[-]]) بدل ملف، فمفيش نسخة مش متشفرة بتتكتب على الديسك.

[[openssl enc -aes-256-cbc]]: تشفير AES بمفتاح ٢٥٦ بت. [[-pbkdf2 -iter 200000]]: المفتاح بيتولّد من الباسورد بعد ٢٠٠ ألف دورة، فتخمين الباسورد بطيء جدًا. من غيرهم openssl بيستخدم طريقة قديمة ضعيفة وبيطلع تحذير. [[-salt]]: ملح عشوائي، فنفس الباسورد بيدّي ناتج مختلف كل مرة.

[[-pass env:BACKUP_PASSPHRASE]]: الباسورد من متغير بيئة. لو كتبته [[-pass pass:xxx]]، أي يوزر على السيرفر يشوفه في [[ps aux]] وقت التشفير. وفيه كمان [[file:/path]].

الفك: نفس الإعدادات بالظبط مع [[-d]]. أي اختلاف في [[-iter]] أو الـ cipher = [[bad decrypt]]. [[tar -tzf -]] بيعرض المحتوى من غير ما يفك، اختبار سريع إن الملف سليم.

[[rclone check --one-way]]: يتأكد إن النسخة اللي اترفعت مطابقة فعلًا.

الباسورد نفسه لازم يتحفظ بره السيرفر (password manager). لو السيرفر مات والباسورد كان عليه بس، الباك أب ملوش لازمة. وبدائل أحدث: [[age]] أو [[gpg -c]]، بيكشفوا لو الملف اتعدّل (CBC لوحده مبيكشفش).`,
            when: "أي باك أب بيطلع من السيرفر. شغّله من cron بعد pg_dump (تاب VPS، باك أب قاعدة البيانات).",
            mistakes: "في مشروع حقيقي السكربت كان بيستخدم [[-pass pass:$PASS]] فالباسورد بيبان في [[ps]]، ومكنش بيتأكد إن الرفع نجح ولا بينبّه لو فشل من cron، ومفيش اختبار فك أبدًا. باك أب عمرك ما جربت ترجّعه مش باك أب."
          },
          lines: [
            "الباسورد في متغير بيئة من ملف root بس.",
            "اضغط وشفّر في pipe واحد، ومفيش نسخة مكشوفة على الديسك.",
            "اختبار: فك واعرض المحتوى من غير ما تفك فعلًا.",
            "ارفع بره السيرفر واتأكد إن النسخة مطابقة."
          ]
        }
      ]
    },
    {
      t: "تشيك ليست قبل ما ترفع",
      l: 3,
      n: "راجعها قبل أي مشروع يروح إنتاج",
      items: [
        {
          cmd: "الأساسيات",
          title: "المصادقة والداتا",
          desc: "راجع كل نقطة على مشروعك. أي واحدة مش متعملة هي ثغرة محتملة.",
          example: R`[ ] كل الباسوردات hashed بـ bcrypt/argon2
[ ] JWT secret طويل وعشوائي وفي .env
[ ] كل route محمي بيتأكد من الصلاحية مش بس الدخول (IDOR)
[ ] كل الاستعلامات parameterized أو ORM
[ ] كل مدخلات المستخدم عليها validation على السيرفر
[ ] rate limiting على login و APIs الحساسة`,
          try: "طبّق التشيك ليست دي على آخر مشروع رفعته.",
          flag: "script",
          deep: {
            why: "قبل ما ترفع أي موقع على الإنتاج، فيه حاجات أساسية لازم تتأكد منها. دي الـ checklist اللي لو عملتها بتحمي من أشهر طرق الاختراق.",
            how: R`الباسوردات: bcrypt أو argon2 فقط، مش MD5 أو SHA256. لو بتعمل migration لقاعدة بيانات قديمة، الـ hashing قبل ما أي حاجة تانية.

JWT secret: طويل (٣٢ بايت على الأقل)، عشوائي، ومش في الكود. [[openssl rand -base64 32]] بيولّد واحد. ولو غيّرت الـ secret (مثلًا بعد تسريب)، كل الـ tokens القديمة بتبقى invalid وكل اليوزرز يعملوا login تاني.

كل route محمي: الفرق بين authenticated (logged in) وauthorized (مسموحلك). لو route بيتأكد بس إن في token بس مش بيتأكد من الصلاحيات، ده IDOR.

كل input بيتعمله validation على السيرفر: حتى لو الـ frontend بيعمل validation كمان.

HTTPS على كل environments إلا localhost.`,
            when: "قبل أي deploy للإنتاج. وبعد أي feature جديدة بتضيف authentication أو routes.",
            mistakes: "تعتمد على الـ frontend validation لأي من دول. والـ JWT secret في الكود أو في GitHub."
          }
        },
        {
          cmd: "البنية",
          title: "السيرفر والنقل",
          desc: "النقط اللي بتحمي السيرفر نفسه والطريق بينه وبين الزائر، حتى لو الكود سليم.",
          example: R`[ ] HTTPS مفعّل و HTTP بيحوّل له
[ ] security headers (helmet أو Nginx)، درجة A على securityheaders.com
[ ] .env بره Git، ومفيش أسرار في الكود ولا في تاريخ Git
[ ] قاعدة البيانات على 127.0.0.1 مش مكشوفة للنت
[ ] الفايروول: 22 و 80 و 443 بس
[ ] رسائل الأخطاء عامة في الإنتاج (مفيش stack traces للمستخدم)
[ ] npm audit نضيف، والمكتبات محدّثة
[ ] باك أب شغال ومتجرّب إنه بيرجع`,
          try: "اعمل scan بـ nmap لسيرفرك وتأكد من نقطة البورتات.",
          flag: "script",
          deep: {
            why: "الأساسيات في الكود مش كافية. البنية نفسها (HTTPS، والـ headers، والـ secrets) لازم تبقى مظبوطة من الأول.",
            how: R`HTTPS وHTTP redirect: certbot مع Nginx بيعمل الاتنين. أي طلب HTTP بيتحوّل لـ HTTPS أوتوماتيك.

Security headers بـ helmet أو Nginx: [[Strict-Transport-Security]] و[[Content-Security-Policy]] وغيرهم. درجة A على securityheaders.com الهدف.

[[.env]] بره Git وأكيد مفيش أسرار في الكود أو تاريخه. أي secret في GitHub حتى لو في commit قديم يتعامل معاه كمكشوف.

CORS مضبوط: فقط domains مسموح بيها، مش [[*]] مع credentials.

Rate limiting على login وregistration وأي endpoint بياخد وقت.

Database: يوزر بصلاحيات أقل ما ممكن، ومش root أو superuser.`,
            when: "وانت بتجهّز السيرفر لأول مرة، مش بعد الرفع.",
            mistakes: "CORS بـ [[*]] مع cookies. والـ database user بصلاحيات admin من الأصل."
          }
        },
        {
          cmd: "المتابعة",
          title: "بعد ما ترفع",
          desc: "الأمان مش مرة واحدة.",
          example: R`[ ] fail2ban شغال ضد محاولات SSH
[ ] تحديثات الأمان أوتوماتيك (unattended-upgrades)
[ ] لوجات بتتراقب، وتنبيه لو حصل حاجة غريبة
[ ] Dependabot أو npm audit في CI
[ ] خطة لو حصل اختراق: تغيّر المفاتيح إزاي وترجع باك أب إزاي`,
          try: "فعّل Dependabot على أهم repo عندك من إعدادات GitHub.",
          flag: "script",
          deep: {
            why: "الأمان مش حاجة بتعملها مرة واحدة. التهديدات بتتطور، وثغرات جديدة بتتكتشف، ومحتاج تظل متابع.",
            how: R`fail2ban: يحظر أي IP بيجرّب كتير على SSH أو login. اتأكد إنه شغال: [[sudo fail2ban-client status sshd]].

unattended-upgrades: تحديثات الأمان بتيجي لوحدها. اتأكد إنه مفعّل وبيشتغل. [[cat /var/log/unattended-upgrades/unattended-upgrades.log]].

لوجات: بتتراقب وعندك تنبيه لو حصل حاجة غريبة. حتى لو مش automated، بص على لوجات Nginx وتطبيقك مرة في الأسبوع. كتير من الاختراقات بتتكشف بعد فترة لو حد بص على اللوجات.

npm audit وDependabot: بانتظام وفي CI.

Backups: بيتعملوا ومتحفظين بره السيرفر، ومجرّبة الاستعادة منهم. باك أب مش بيتجرّب مش باك أب فعلي.`,
            when: "ضيف فيهم كل أسبوع أو كل ٢ أسبوع وقت ثابت.",
            mistakes: "إنك تعمل كل ده مرة في الأول وتنسى. الأمان maintenance مستمر مش project له نهاية."
          }
        }
      ]
    }
  ]
});
