// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
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
          ],
          sol: R`بعد [[docker run -d -p 3000:3000 bkimminich/juice-shop]] افتح [[http://localhost:3000]]: هتلاقي متجر عصاير شكله عادي. [[docker ps]] لازم يوريك الـ container شغال والبورت [[0.0.0.0:3000->3000/tcp]]. جوه الموقع فيه صفحة Score Board مخفية، ولقيانها هو أول تحدي، وكل تحدي بتحله بيظهرلك إشعار أخضر فوق.

القاعدة اللي بتتعلمها هنا: التجارب دي على حاجة انت اللي مشغّلها على جهازك أو على موقع معمول للتدريب (زي PortSwigger Academy). نفس التجربة على موقع حد تاني من غير إذن مكتوب جريمة حتى لو "بتتفرج بس". لو الصفحة مفتحتش: يا الـ container لسه بيقوم (استنى ثواني و [[docker logs]])، يا البورت 3000 مستخدم عندك من مشروع تاني، غيّره لـ [[-p 3001:3000]].`
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
          ],
          sol: R`المطلوب إنك تكلّم الـ API بتاعك من الترمنال مباشرة، زي [[curl -i http://localhost:3000/api/orders]]، من غير المتصفح ومن غير الواجهة. النتيجة الصح: السيرفر يرد [[401]] لو مفيش توكن، و [[400]] لو بعت داتا ناقصة أو غلط، بالظبط زي ما لو جيت من الواجهة.

لو رد بـ [[200]] وداتا، يبقى الحماية كانت في الواجهة بس (زرار مخفي أو validation في الفورم)، وده مش حماية: أي حد يقدر يبعت الطلب بنفسه. الدرس هنا إن كل فحص صلاحية وكل validation لازم يتعمل على السيرفر، والواجهة بس بتسهّل على المستخدم.`,
          solCode: R`# من غير توكن: المفروض 401
curl -i http://localhost:3000/api/orders
# داتا ناقصة: المفروض 400 مش 500
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" -d '{}'`
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
          lines: ["سر في .env: مسار قاعدة البيانات بالباسورد.", "سر تاني: مفتاح توقيع الـ JWT، طويل وعشوائي."],
          sol: R`في كل مشروع: [[git check-ignore -v .env]] لازم يطبع السطر من [[.gitignore]] اللي بيتجاهله، ولو مطبعش حاجة يبقى .env مش متجاهَل. و [[git ls-files | grep -i env]] المفروض يطلع فاضي أو [[.env.example]] بس. وللمفاتيح في الكود: [[grep -rnE "(sk_live|sk_test|AKIA|api[_-]?key\s*[:=])" --exclude-dir=node_modules .]] المفروض ميطلعش حاجة.

لو .env طالع في [[git ls-files]] يبقى اتعمله commit قبل كده، وإضافته لـ .gitignore دلوقتي مش هتشيله من التاريخ: روح لدرس «.env اترفع على Git» في نفس التاب. ولو لقيت مفتاح مكتوب في الكود: انقله لـ .env واقراه بـ [[process.env]]، وغيّر المفتاح نفسه عند مقدم الخدمة لأنه اتشاف.`
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
          ],
          sol: R`على repo نضيف gitleaks بيخلص بسطر زي [[no leaks found]] و exit code صفر. لو لقى حاجة بيطبع لكل واحدة: نوع القاعدة (مثلًا [[RuleID: generic-api-key]])، الملف، السطر، الـ commit، واسم اللي عمله، وفي الآخر [[leaks found: 3]] و exit code 1، وده اللي بيخليه يوقّف الـ CI.

أهم حاجة تفهمها: الـ [[git]] في الأمر معناه إنه بيفحص تاريخ الـ commits كله، مش الملفات الحالية بس، فممكن يلاقي مفتاح انت مسحته من شهور. ولو لقى مفتاح حقيقي، مسحه من الكود مش كفاية: غيّره (rotate) عند مقدم الخدمة الأول، لأن أي حد عمل clone قبل كده عنده نسخة. أحيانًا بيطلع إنذار كاذب (زي مفتاح تجربة في test)، وده بتحطه في [[.gitleaksignore]] بالـ fingerprint بتاعه.`
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
          ],
          sol: R`اعمل يوزرين A و B، وخد توكن A، واطلب بيه أوردر بتاع B: [[curl -H "Authorization: Bearer $TOKEN_A" http://localhost:3000/api/orders/42]] حيث 42 أوردر B. الرد الصح [[404]] (أو [[403]])، مش داتا B. الـ 404 أحسن غالبًا لأنه مبيأكدش إن الأوردر موجود أصلًا.

لو رجعلك داتا B يبقى عندك IDOR: الكود بيتأكد إنك داخل، بس مش بيتأكد إن الحاجة دي بتاعتك. الحل إن الاستعلام نفسه يشمل صاحب الداتا: [[WHERE id = $1 AND user_id = $2]] بالـ user id اللي جاي من التوكن، مش من الـ body أو الـ URL. وجرّب نفس الكلام على التعديل والمسح (PUT/DELETE)، لأنهم غالبًا اللي بيتنسوا.`,
          solCode: R`# التوكن بتاع A، والأوردر 42 بتاع B
curl -i -H "Authorization: Bearer $TOKEN_A" http://localhost:3000/api/orders/42
# المتوقع: HTTP/1.1 404 Not Found

// الإصلاح: صاحب الداتا جزء من الاستعلام
const { rows } = await db.query(
  "SELECT * FROM orders WHERE id = $1 AND user_id = $2",
  [req.params.id, req.user.id]
);
if (!rows.length) return res.status(404).json({ error: "Not found" });`
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
          ],
          sol: R`الأمر اللي بيدوّر: [[grep -rnE "(query|execute|raw)\(.*(\+|\$__{)" --include=*.js --include=*.ts --exclude-dir=node_modules .]]. كل سطر بيطلع معناه إن فيه استعلام بيتبني بلزق نص، زي [[db.query("SELECT * FROM users WHERE email = '" + email + "'")]] أو template string فيها [[$__{email}]]. المشروع السليم المفروض ميطلعش فيه ولا سطر.

كل واحد تلاقيه حوّله لـ parameters: [[db.query("SELECT * FROM users WHERE email = $1", [email])]]، أو استخدم الـ ORM (Prisma مثلًا). خد بالك من حاجتين: Prisma نفسها فيها [[$queryRawUnsafe]] وده بيلزق النص زي الأول بالظبط، أما [[$queryRaw]] بالـ tagged template فأمان. وأسماء الأعمدة والجداول مينفعش تبقى parameters، فلو المستخدم بيختار عمود الترتيب، قارن باللي جاي بقايمة مسموحة (allowlist).`
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
          ],
          sol: R`[[grep -rn "dangerouslySetInnerHTML" src/]]: لو مطلعش حاجة، React بيعمل escape لكل نص بتعرضه بـ [[{value}]]، وانت في أمان من ناحية دي. لو طلع، شوف الـ HTML ده جاي منين: لو من ملف انت كاتبه أو من محتوى ثابت، مفيش مشكلة. لو من المستخدم أو من API خارجي (كومنت، وصف منتج، رد AI)، لازم يعدّي على [[DOMPurify.sanitize()]] قبل ما يتعرض.

الغلطة الشائعة إنك تفكر إن الـ validation على الفورم كفاية: الـ HTML ممكن يوصل قاعدة البيانات من API مباشرة. وفيه مكان تاني بيتنسي: [[href={user.website}]]، لأن React مش بيمنع [[javascript:]] في اللينكات بشكل كامل، فاتأكد إن اللينك بيبدأ بـ [[https://]].`
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
          ],
          sol: R`اعمل ملف [[attack.html]] فيه form بيعمل POST على [[http://localhost:3000/api/transfer]]، وشغّله من بورت تاني بـ [[npx serve -l 5000]]. اعمل login على الـ API الأول عشان الكوكي يتحط، وبعدين افتح الصفحة من البورت التاني. خد بالك إن localhost:3000 و localhost:5000 نفس الـ site بالنسبة لـ SameSite (البورت مش بيفرق)، فالكوكي هيتبعت في الحالتين، وهنا الـ [[checkOrigin]] هو اللي هيرد [[403]] لأن الـ Origin بقى [[http://localhost:5000]].

عشان تشوف SameSite نفسه شغال، لازم site مختلف فعلًا: افتح الصفحة من [[http://127.0.0.1:5000]] والـ API على [[localhost]]. مع [[sameSite: "lax"]] الكوكي مش هيتبعت مع POST جاي من site تاني، فالـ API يرد 401. مع [[sameSite: "none"]] (ولازم معاها secure) هيتبعت. شوف ده في DevTools ← Network ← الطلب ← Cookies. الدرس: SameSite=Lax مع فحص Origin على كل POST هو الدفاع الأساسي، وعمره ما تعمل تغيير بـ GET.`,
          solCode: R`<!-- attack.html: شغّله بـ npx serve -l 5000 -->
<form action="http://localhost:3000/api/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>`
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
          ],
          sol: R`[[SELECT id, email, left(password, 7) FROM users LIMIT 5;]]: كل الباسوردات المفروض تبدأ بـ [[$2b$10$]] أو [[$2b$12$]] (bcrypt) أو [[$argon2id$]] (argon2)، وطولها ثابت (60 حرف لـ bcrypt) مهما كان الباسورد. تقدر تتأكد بـ [[SELECT count(*) FROM users WHERE password NOT LIKE '$2b$%' AND password NOT LIKE '$argon2%';]] والمفروض يطلع صفر.

لو شفت باسورد مقروء، أو hash طوله 32 أو 64 حرف hex (يعني MD5 أو SHA-256 من غير salt)، يبقى لازم تصلّح: مينفعش تحوّل القديم لـ bcrypt من غير الباسورد الأصلي، فالحل إنك تعمل hash للباسورد بـ bcrypt أول ما اليوزر يعمل login صح، أو تجبر الكل يعمل reset. وخد بالك الـ select نفسه متسيبهوش في كود الـ API: عمود الباسورد عمره ما يرجع في أي response.`
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
          ],
          sol: R`DevTools ← Network ← اختار أول طلب (الصفحة أو أي API) ← Headers ← Response Headers. في Express من غير أي إعداد هتلاقي [[X-Powered-By: Express]]، وفي Nginx من غير إعداد [[Server: nginx/1.24.0]] بالنسخة. نفس الكلام من الترمنال: [[curl -sI http://localhost:3000 | grep -iE "x-powered-by|server"]].

الحل: في Express [[app.disable("x-powered-by")]] أو [[helmet()]] اللي بيشيله لوحده، وفي Nginx [[server_tokens off;]] فيبقى [[Server: nginx]] من غير نسخة. شيله مش لأنه بيحميك لوحده، لكن لأنه بيسهّل على أي سكانر يعرف إنت على نسخة فيها ثغرة معروفة. ولو شفت [[X-Powered-By: Next.js]] فده بيتقفل بـ [[poweredByHeader: false]] في [[next.config]].`
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
          ],
          sol: R`[[npm audit]] بيطبع لكل ثغرة اسم المكتبة، الخطورة (low/moderate/high/critical)، ولينك الـ advisory، وسلسلة الاعتماد (مين جابها)، وفي الآخر سطر زي [[5 vulnerabilities (3 moderate, 2 high)]] وتحته [[To address all issues, run: npm audit fix]]. على مشروع نضيف [[found 0 vulnerabilities]].

الترتيب الصح: [[npm audit fix]] الأول (بيحدّث في حدود الـ semver ومش بيكسر)، وبعدين شوف الباقي بنفسك. متعملش [[npm audit fix --force]] من غير ما تقرا، لأنه ممكن ينقلك لنسخة major جديدة وتكسر المشروع. وافهم إن مش كل ثغرة بتأثر عليك: ثغرة في أداة build بتشتغل على جهازك بس أقل خطورة بكتير من واحدة في مكتبة بتستقبل داتا المستخدمين في الإنتاج، وعشان كده [[npm audit --omit=dev]] بيوريك اللي في الإنتاج بس.`
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
          ],
          sol: R`المطلوب تتأكد إن الميزة (preview للينك، رفع صورة من URL، webhook) بترفض أي URL مش في قايمة مسموحة. اختبرها بـ: [[http://127.0.0.1:5432]]، [[http://localhost/admin]]، [[http://169.254.169.254/latest/meta-data/]] (عنوان الميتاداتا في السحابة)، و [[file:///etc/passwd]]. المفروض كلهم يترفضوا بـ [[400]] قبل ما السيرفر يحاول يوصلهم.

لو الفلتر بيقارن النص بس (زي [[url.includes("mysite.com")]]) هيعدّي [[http://mysite.com.evil.net]]، فقارن بـ [[new URL(u).hostname]] على قايمة ثابتة. ولو لازم تسمح بأي دومين، حل الدومين لـ IP وارفض أي IP خاص (127.x، 10.x، 192.168.x، 169.254.x)، واقفل الـ redirects ([[redirect: "manual"]]) لأن موقع مسموح ممكن يحوّلك على عنوان داخلي.`,
          solCode: R`const ALLOWED = new Set(["images.example.com", "cdn.example.com"]);

function checkUrl(input) {
  let u;
  try { u = new URL(input); } catch { return false; }
  return u.protocol === "https:" && ALLOWED.has(u.hostname);
}

// checkUrl("https://images.example.com/a.png")      -> true
// checkUrl("http://169.254.169.254/latest/")        -> false
// checkUrl("https://images.example.com.evil.net/")  -> false`
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
          ],
          sol: R`بالـ limiter اللي في المثال (5 محاولات كل 15 دقيقة) لوب الـ 10 طلبات لازم يطبع [[401]] خمس مرات (باسورد غلط) وبعدين [[429]] خمس مرات. لو اتطبع 401 عشر مرات، يبقى الـ limiter مش متركّب على الـ route ده، أو متركّب بعد الـ handler.

لو السيرفر ورا Nginx أو Cloudflare وكل الطلبات جاية من نفس الـ IP (IP البروكسي)، هيتقفل على الناس كلها مع بعض: لازم [[app.set("trust proxy", 1)]] عشان Express يقرا IP العميل الحقيقي. وفي الإنتاج بأكتر من instance، الذاكرة مش مشتركة بينهم، فالعداد يتخزن في Redis.`,
          solCode: R`for i in $(seq 1 10); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/login \
    -H "Content-Type: application/json" -d '{"email":"a@a.com","password":"wrong"}'
done
# المتوقع: 401 خمس مرات، وبعدين 429 خمس مرات`
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
          ],
          sol: R`[[npm audit signatures]] بيطبع حاجة زي [[audited 312 packages in 2s]] و [[312 packages have verified registry signatures]]، ولو فيه مكتبات عليها attestations هيقولك [[N packages have verified attestations]]. ده معناه إن اللي نزل عندك هو نفسه اللي اتنشر على الـ registry. لو طلعلك [[invalid]] أو [[missing]] فيه حاجة غلط وتستاهل تبص عليها.

[[npm ci --ignore-scripts]] بيسطب من غير ما يشغّل أي [[postinstall]]. معظم المكتبات هتشتغل عادي. اللي بيبوظ غالبًا المكتبات اللي بتنزّل أو بتبني حاجة native وقت التسطيب، زي [[esbuild]] و [[sharp]] و [[bcrypt]] و [[prisma]]: هتلاقي خطأ وقت التشغيل مش وقت التسطيب. عشان تعرف مين عنده scripts قبل ما تشغّل: [[npm query ":attr(scripts, [postinstall])"]]. بعدها سيب ignore-scripts وشغّل الـ scripts للمكتبات دي بس (في pnpm ده [[allowBuilds]]).`
        },
        {
          cmd: "باقي القايمة",
          title: "A04 و A06 و A08 و A09 في سطر",
          desc: R`قايمة OWASP Top 10 هي أشهر 10 أنواع ثغرات في تطبيقات الويب، والبنود دي من القايمة ملهاش مثال كود في الصفحة، فهنا معنى كل واحد وعلاجه في سطر.

A04 أخطاء التشفير: البيانات بتتنقل من غير HTTPS، أو باسوردات بـ MD5 أو SHA1 (سريعين ومكسورين)، أو أسرار مكتوبة في الكود، أو توكنات معمولة بـ [[Math.random]] اللي ممكن تتوقّع. A06 تصميم مش آمن: الثغرة في فكرة الميزة نفسها، زي كوبون ينفع يتستخدم مالانهاية، فاسأل «لو حد استغلها؟» قبل ما تكتب. A08 سلامة الكود والبيانات: إنك تشغّل كود أو تحديث من غير ما تتأكد إنه نفس اللي اتنشر، زي GitHub Action متثبتة بتاج ممكن يتغير بدل الـ SHA. A09 اللوج والتنبيه: محاولات اختراق بتحصل ومحدش بيعرف لأن مفيش لوج أو مفيش حد بيبص.

المرجع الكامل في owasp.org/Top10.`,
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
          ],
          sol: R`مثال لإجابة كويسة على A09 (Logging): على آخر مشروع، جرّب login بباسورد غلط وشوف اللوج. المفروض تلاقي سطر فيه الوقت، والـ IP، والإيميل، وإنه فشل، ومتلاقيش الباسورد نفسه ولا التوكن. لو ملقيتش حاجة خالص، يبقى لو حد جرّب ألف باسورد مش هتعرف.

أي بند تختاره، الإجابة الكويسة فيها تلات حاجات: البند اتطبّق ولا لأ، الدليل (أمر جربته أو سطر في الكود)، والإصلاح لو ناقص. مثلًا A04 (Insecure Design): هل ممكن تعمل أوردر بكمية سالبة أو سعر جاي من الواجهة؟ A08 (Integrity): هل الـ webhook بيتأكد من التوقيع قبل ما يصدّق الداتا؟ الغلط الشائع إنك تقرا البند وتقول "أنا عامل كده" من غير ما تجرّب فعلًا.`
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
          ],
          sol: R`[[npm ci]] بيقرا [[package-lock.json]] بس ويسطب النسخ اللي فيه بالظبط، وبيمسح [[node_modules]] الأول، ولو الـ lock مش متوافق مع [[package.json]] بيقف بخطأ زي [[npm ci can only install packages when your package.json and package-lock.json are in sync]]. أما [[npm install]] فممكن يحدّث نسخ جوه الحدود ([[^1.2.0]] ممكن تبقى [[1.9.0]]) ويعدّل الـ lock.

الفرق ده مهم للأمان: في الإنتاج عايز نفس الكود اللي جربته بالظبط. لو مكتبة اتخطفت ونزلت نسخة خبيثة بكرة، [[npm install]] ممكن يجيبها، و [[npm ci]] لأ. ولازم الـ lock file يبقى في Git، من غيره [[npm ci]] مش هيشتغل أصلًا ويقولك إنه محتاج lock file.`
        }
      ]
    }
  ]
});
