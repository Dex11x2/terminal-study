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
      n: "قايمة OWASP لأشهر الثغرات، آخر نسخة 2025. لكل واحدة: بتحصل إزاي، والكود الغلط، والصح. الأرقام هنا ترتيب الشرح مش ترتيب OWASP: Injection (فيها SQL و XSS) رقمها A05، و Security Misconfiguration A02، و Supply Chain A03، و Authentication Failures A07، و Rate limiting و CSRF مش بنود لوحدهم",
      items: [
        {
          cmd: "1. Broken Access Control",
          title: "أخطر واحدة: توصل لحاجة مش من حقك",
          desc: "اسمها IDOR لما تغيّر id في الـ URL فتشوف داتا حد تاني. الـ API لازم يتأكد إن الحاجة دي بتاعتك، مش بس إنك مسجّل دخول. الغلط الشائع: بتتأكد إن فيه توكن، بس مش بتتأكد إن المورد ده بتاع صاحب التوكن.",
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
          title: "لما مدخل المستخدم يتحط في استعلام",
          desc: "لو حطيت اللي المستخدم كتبه جوه نص الاستعلام مباشرة، هو يقدر يغيّر معنى الاستعلام. الحل الوحيد الكامل: parameterized queries، اللي بتبعت الاستعلام والقيم منفصلين، فالقيمة تفضل قيمة مهما كانت. متحاولش تنضّف المدخل بنفسك.",
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
          title: "لما تعرض مدخل المستخدم كـ HTML",
          desc: "لو عرضت كلام المستخدم في الصفحة كـ HTML، ممكن يحط فيه سكربت يشتغل عند أي زائر. React بيهرب النصوص لوحده، فأنت آمن طول ما مش بتستخدم [[dangerouslySetInnerHTML]]. لو محتاج تعرض HTML من المستخدم (محرر نصوص مثلًا)، نضّفه بـ [[DOMPurify]]. وكوكي الـ session HttpOnly عشان لو حصل XSS التوكن ميتسرقش.",
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
          cmd: "CSRF",
          title: "لما موقع تاني يبعت طلب باسمك",
          desc: "لو اليوزر عامل login عندك وفتح موقع مهاجم، الموقع ده ممكن يعمل form بيبعت POST لموقعك، والمتصفح بيبعت الكوكي بتاعتك معاه لوحده. الحماية: كوكي الـ session بـ [[SameSite=Lax]] أو [[Strict]]، وأي حاجة بتغيّر داتا تبقى POST/PUT/DELETE مش GET، وتتأكد من [[Origin]] على الطلبات دي. لو الـ auth بـ Authorization header مش كوكي، CSRF مش بتأثر عليك.",
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
          title: "الباسوردات والتوكنات",
          desc: "الباسورد لازم يتخزّن hashed بـ bcrypt أو argon2، أبدًا كنص. لو قاعدة بياناتك اتسربت، الـ hash ميرجّعش الباسورد. الـ JWT secret لازم يكون طويل وعشوائي وفي متغير بيئة. وحط rate limiting على login عشان تمنع تجربة باسوردات كتير.",
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
          title: "الافتراضيات الخطيرة",
          desc: "صفحات الـ error اللي بتطبع تفاصيل السيرفر، وصلاحيات مفتوحة، ولوحات تحكم بباسورد افتراضي. في Express: شيل [[X-Powered-By]] عشان متعلنش إنك Express، فعّل [[helmet]] للـ security headers، ومتبعتش تفاصيل الأخطاء للمستخدم في الإنتاج.",
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
          title: "الكود اللي مكتبتوش انت",
          desc: "معظم كودك مكتبات، وأي ثغرة فيها بتبقى ثغرة فيك. [[npm audit]] بيقولك أنهي مكتبة فيها ثغرة معروفة ودرجة خطورتها. راجع اللي بيقترح تحديثه قبل [[--force]] لأنه ممكن يكسر حاجة. و Dependabot على GitHub بيعملك pull request أوتوماتيك بالتحديثات الأمنية.",
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
          title: "لما السيرفر يجيب URL من المستخدم",
          desc: "في نسخة 2025 دمجوا SSRF جوه Broken Access Control، لأنها في الآخر وصول لحاجة مش من حقك. بتحصل لو عندك ميزة بتجيب صورة أو داتا من URL بيبعته المستخدم، فيحط عنوان داخلي زي [[169.254.169.254]] (اللي بيرجّع أسرار السيرفر على بعض المنصات) أو [[localhost]] فيوصل لخدمات جواك. الحل: اسمح بدومينات محددة بس، وامنع العناوين الداخلية.",
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
          title: "امنع الإغراق والتخمين",
          desc: "من غيره حد يقدر يجرّب آلاف الباسوردات، أو يغرق الـ API. حط حد على المحاولات، أشد على login و forgot-password. في الإنتاج ورا Nginx أو Cloudflare حط الـ limiting هناك كمان.",
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
          title: "متسيبش مكتبة تشغّل كود وقت التسطيب",
          desc: "هجمات 2025 على npm (مكتبات مشهورة اتسرق حساب صاحبها ونزلت نسخة ملغومة) كانت بتشتغل من [[postinstall]]: مجرد [[npm install]] بيشغّل الكود. [[--ignore-scripts]] بيمنع ده، و [[npm audit signatures]] بيتأكد إن المكتبات متوقّعة من الـ registry فعلًا. وقبل ما تسطّب مكتبة، بص نزلت إمتى: نسخة عمرها ساعات خليك بعيد عنها.",
          example: R`npm ci --ignore-scripts
npm audit signatures
npm config set ignore-scripts true
npm view express time.modified`,
          try: "شغّل [[npm audit signatures]] على مشروعك، وجرّب [[npm ci --ignore-scripts]] وشوف أنهي مكتبة كانت محتاجة scripts.",
          flag: "term",
          deep: {
            why: "المكتبة اللي بتثق فيها ممكن تتخترق هي نفسها، وده اللي OWASP 2025 حطته رقم 3.",
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
          desc: "نسخة 2025 (اتثبتت رسميًا يناير 2026) ضافت تصنيفين جداد كانوا بيسببوا اختراقات كتير: [[Software Supply Chain Failures]] (رقم 3)، يعني تعتمد على مكتبة أو أداة اتخترقت هي نفسها، وده أخطر من ثغرة في كودك لأنك مش شايفها، وعلاجه إنك تثبّت نسخ المكتبات وتفحصها. و [[Mishandling of Exceptional Conditions]] (رقم 10)، يعني كودك مبيتعاملش صح مع الحالات الغريبة فيقع أو يتصرف غلط. كمان Security Misconfiguration طلعت لرقم 2. المرجع الرسمي على owasp.org/Top10.",
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
