// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "auth من الأول للآخر",
      l: 2,
      n: "من فورم التسجيل لحد logout: القاعدة والـ API والواجهة، والتوكنات بتتخزن فين وليه",
      items: [
        {
          cmd: "signup",
          title: "حساب جديد: validation و hash ورد نضيف",
          desc: R`التسجيل ٣ خطوات: validation للإيميل والباسورد بـ Zod، وبعدين hash للباسورد بـ argon2، وبعدين إنشاء المستخدم. والرد عمره ما يرجّع الـ hash.

ولو الإيميل متسجّل قبل كده، القيد [[@unique]] في القاعدة هو اللي بيمسكها، والـ error handler بيحوّلها 409. أساسيات الباسوردات والـ hashing في تاب «أمان الموقع».`,
          example: R`import argon2 from "argon2";
import { z } from "zod";

const Signup = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().transform((e) => e.toLowerCase()),
  password: z.string().min(8).max(128),
});

router.post("/auth/signup", async (req, res) => {
  const input = Signup.parse(req.body);
  const passwordHash = await argon2.hash(input.password);
  const user = await db.user.create({ data: { name: input.name, email: input.email, passwordHash } });
  res.status(201).json({ data: { id: user.id, name: user.name, email: user.email } });
});`,
          try: R`سجّل بنفس الإيميل مرتين، مرة [[Ali@Example.com]] ومرة [[ali@example.com]]. التانية لازم ترجع 409. بعدين افتح جدول المستخدمين وبص على شكل الـ hash: هتلاقيه بيبدأ بـ [[$argon2id$]] وجواه الإعدادات والـ salt.`,
          flag: "script",
          deep: {
            why: "التسجيل أول مكان المهاجم بيجرّبه، وأول مكان الداتا الوحشة بتدخل منه. وأي غلطة فيه بتفضل في القاعدة للأبد: باسورد متخزن نص عادي، أو حسابين لنفس الشخص عشان مرة كتب الإيميل بحروف كبيرة ومرة صغيرة.",
            how: R`argon2id هو الموصى بيه حاليًا. هو بطيء عن قصد، وبياكل رام، فتجربة مليارات الباسوردات على GPU بتبقى غالية جدًا. والنص اللي بيطلع منه فيه كل حاجة: نوع الخوارزمية، والإعدادات، والـ salt العشوائي، والـ hash. عشان كده [[argon2.verify]] مش محتاج أي حاجة غير النص ده والباسورد.

الإيميل بيتحوّل small قبل الحفظ، وقبل البحث في الـ login كمان. ولو طلبين تسجيل بنفس الإيميل وصلوا في نفس اللحظة، القيد unique بيرفض واحد منهم، ومفيش حاجة في الكود تقدر تضمن ده غير القيد.

فيه قرار صغير هنا: الـ 409 بتقول للمهاجم إن الإيميل ده عنده حساب. في أغلب المنتجات ده مقبول. بس لو المنتج حساس، رد بنفس الرسالة في الحالتين («بعتنالك إيميل»)، وابعت للإيميل الموجود رسالة «عندك حساب بالفعل».

وتأكيد الإيميل نفس فكرة استعادة الباسورد اللي هتيجي: token عشوائي، ومتخزن hash منه، وليه مدة. في الـ MVP ممكن تسمح بالدخول وتمنع الشراء لحد ما الإيميل يتأكد.`,
            when: "أول ميزة في الـ auth. وحط rate limit على المسار ده زي الـ login بالظبط.",
            mistakes: R`إنك تخزّن الباسورد نص، أو MD5، أو SHA256 من غير salt. ودول كلهم سريعين، والسرعة هنا عيب. وفي مشروع حقيقي كان فيه عمود للباسورد كنص عادي، والدخول بيقارن بيه الأول قبل الـ hash، وحسابات الموظفين بتتعمل بباسورد افتراضي واحد للكل. وكمان كان فيه route للتطوير بيعرض المستخدمين بباسورداتهم، ولسه موجود. كفاية تسريب واحد عشان كل الحسابات تتكشف. وغلطة تانية شائعة: إنك ترجّع [[user]] كله من create، فيطلع [[passwordHash]] في الرد.`
          },
          teach: R`## ٣ خطوات في route واحد

الـ route بيستلم [[{ name, email, password }]]، ويفحصهم بـ Zod، ويعمل hash للباسورد بـ argon2، ويحفظ المستخدم، ويرد بالحقول الآمنة بس. جرّبناه بـ Express 5.2 و Zod 4.6 و argon2 0.45 و Prisma 7.10 على PostgreSQL 18 في Docker (ويندوز 11، Node 24)، ومعاه الـ errorHandler بتاع درس «شكل الأخطاء». الطلبات بـ curl على بورت 6017.

---

## ١. الـ imports

- [[import argon2 from "argon2";]] مكتبة الـ hash. فيها كود C++ متجمّع جاهز (prebuilt)، فمش محتاج compiler على جهازك في أغلب الأحوال.
- [[import { z } from "zod";]] للـ validation.

---

## ٢. [[const Signup = z.object({ ... })]]

| الحقل | الشرط | ليه |
|---|---|---|
| [[name: z.string().trim().min(2).max(80)]] | نص، من غير مسافات أطراف، من ٢ لـ ٨٠ | [[trim]] بيشتغل الأول، فـ [[" A "]] بيبقى [["A"]] ويقع في [[min(2)]] |
| [[email: z.email().transform((e) => e.toLowerCase())]] | إيميل سليم، وبعدين small | [[Ali@Example.com]] و [[ali@example.com]] يبقوا حساب واحد |
| [[password: z.string().min(8).max(128)]] | من ٨ لـ ١٢٨ | الحد الأقصى عشان محدش يبعت ميجا يتعمله hash |

- [[z.email()]] في Zod 4 دالة على [[z]] مباشرة (Zod 3 كان [[z.string().email()]]).
- [[.transform(fn)]] بيغيّر القيمة **بعد** ما الفحص ينجح. و [[(e) => e.toLowerCase()]] arrow function بتاخد الإيميل وترجّعه small.

بعتنا داتا كلها غلط مرة واحدة:

~~~bash
curl -s -H "Content-Type: application/json" -d '{"name":" A ","email":"nope","password":"123"}' localhost:6017/auth/signup
~~~

~~~text الناتج (الـ details مختصرة)
VALIDATION
name: Too small: expected string to have >=2 characters
email: Invalid email address
password: Too small: expected string to have >=8 characters
~~~

التلاتة رجعوا في رد واحد (400)، فالفورم يعرض كل غلطة جنب حقلها.

---

## ٣. [[router.post("/auth/signup", async (req, res) => { ... })]]

[[router]] هو [[express.Router()]]. والدالة [[async]] عشان جواها [[await]]. ومفيش try/catch: في Express 5 أي error جوه دالة async بيوصل للـ errorHandler لوحده.

### [[const input = Signup.parse(req.body);]]

[[req.body]] جاي من [[express.json()]]. لو الشكل غلط [[parse]] بيرمي [[ZodError]] والطلب بيقف هنا. لو سليم، [[input]] فيه القيم **بعد** الـ trim والـ transform. ومن هنا ورايح بنستخدم [[input]] بس، مش [[req.body]].

### [[const passwordHash = await argon2.hash(input.password);]]

- [[argon2.hash]] بيرجّع promise، فـ [[await]].
- بطيء عن قصد: قسناه على الجهاز ده **٤٦ ملّي ثانية** لـ hash واحد، ونفس الجهاز بيعمل ١٠٠٠ sha256 في ٢.٧ ملّي ثانية. يعني اللي سرق القاعدة وعايز يجرّب باسوردات هيبقى أبطأ آلاف المرات.

### [[db.user.create({ data: { name, email, passwordHash } })]]

بنكتب الـ hash بس، والباسورد نفسه مبيتخزنش في أي مكان. ولو الإيميل موجود، القيد [[@unique]] بيرفض، و Prisma بيرمي [[P2002]]، والـ errorHandler بيرد 409.

### [[res.status(201).json({ data: { id, name, email } })]]

[[201 Created]] يعني «اتعمل حاجة جديدة». وبنختار الحقول بإيدنا، مش [[user]] كله، لأن [[user]] فيه [[passwordHash]].

---

## ٤. التجربة: نفس الإيميل بحروف مختلفة

~~~bash
curl -si -H "Content-Type: application/json" -d '{"name":"Ali","email":"Ali@Example.com","password":"secret123"}' localhost:6017/auth/signup
curl -si -H "Content-Type: application/json" -d '{"name":"Ali","email":"ali@example.com","password":"secret123"}' localhost:6017/auth/signup
~~~

~~~text الناتج
HTTP/1.1 201 Created
{"data":{"id":"cmuzdfpd30000z4iekkhfr3uy","name":"Ali","email":"ali@example.com"}}

HTTP/1.1 409 Conflict
{"error":{"code":"CONFLICT","message":"موجود قبل كده"}}
~~~

الإيميل رجع small في الأول، والتاني اترفض لأن القيمتين بقوا واحد.

---

## ٥. شكل الـ hash في القاعدة

~~~text الناتج من psql
$argon2id$v=19$m=65536,p=4,t=3$CoZHPisc4hAnuMwu/6vojQ$P5qn/7j4gFyp2crsGOKBFy3D6LuQivsB0t1tk2/RAok
~~~

الـ [[$]] بتفصل حتت:

| الحتة | معناها |
|---|---|
| [[argon2id]] | النوع: id بيجمع مقاومة الـ GPU (من argon2d) ومقاومة الـ side-channel (من argon2i) |
| [[v=19]] | نسخة الخوارزمية (0x13) |
| [[m=65536]] | الذاكرة بالـ KiB، يعني ٦٤ ميجا لكل hash |
| [[t=3]] | عدد اللفات على الذاكرة |
| [[p=4]] | التوازي (threads) |
| [[CoZHPisc4hAnuMwu/6vojQ]] | الـ salt: ١٦ byte عشوائي بـ base64. مختلف لكل مستخدم، فنفس الباسورد بيطلع hash مختلف |
| آخر حتة | الـ hash نفسه |

كل الإعدادات جوه النص، فـ [[argon2.verify(hash, password)]] (في الـ login) مش محتاج حاجة تانية. ولو زوّدت الإعدادات بعدين، الـ hashes القديمة لسه بتتحقق.

---

## الخلاصة

| الخطوة | السطر | لو اتنسيت |
|---|---|---|
| validation + small | [[Signup.parse]] | حسابين لنفس الشخص، أو داتا بايظة |
| hash | [[argon2.hash]] | الباسوردات مكشوفة لو القاعدة اتسربت |
| unique | [[@unique]] في الـ schema | تكرار لو طلبين وصلوا مع بعض |
| رد نضيف | اختيار الحقول | [[passwordHash]] يطلع في الـ JSON |`,
          lines: [
            "argon2 عشان الـ hash. ده الموصى بيه حاليًا، و bcrypt مقبول برضه.",
            "Zod للـ validation.",
            "شكل الداتا المطلوبة للتسجيل.",
            "الاسم: من غير مسافات على الأطراف، ومن ٢ لـ ٨٠ حرف.",
            "إيميل سليم، ويتحوّل small عشان الكبير والصغير ميبقوش حسابين.",
            "الباسورد ٨ حروف على الأقل، و ١٢٨ كحد أقصى عشان محدش يبعت ميجا يتعمله hash.",
            "قفلة.",
            "الـ route. مفيش try/catch، لأن Express 5 بيوصّل الأخطاء للـ handler لوحده.",
            "لو الداتا غلط، Zod بيرمي error والـ handler بيرد 400.",
            "الـ hash. بياخد جزء من الثانية، وده مقصود.",
            "إنشاء المستخدم. لو الإيميل موجود، القيد unique بيرفض والرد يبقى 409.",
            "رد 201 بالحقول الآمنة بس. الـ hash مبيطلعش أبدًا.",
            "قفلة."
          ],
          sol: R`الأول يرجّع [[201]] وجسمه [[{"data":{"id":"...","name":"Ali","email":"ali@example.com"}}]]. لاحظ إن الإيميل رجع small letters، لأن الـ [[transform]] في Zod شغّال قبل ما يوصل للقاعدة. التاني يرجّع [[409]] و [[{"error":{"code":"CONFLICT","message":"موجود قبل كده"}}]]: الإيميلين بقوا نفس القيمة، والـ [[@unique]] رمى P2002، والـ error handler حوّله.

في الجدول هتلاقي حاجة شكلها كده: [[$argon2id$v=19$m=65536,p=4,t=3$le7pL+uK...$39opv3ec...]]. [[v=19]] نسخة الخوارزمية، و [[m=65536]] يعني ٦٤ ميجا رام لكل hash، و [[t=3]] عدد اللفات، و [[p=4]] التوازي، وبعدها الـ salt وبعدها الناتج. عشان كل الإعدادات جوه النص، [[argon2.verify]] مش محتاج تديله أي حاجة غير الـ hash والباسورد.

لو التانية رجعت 201، يبقى الـ transform مش شغال (مثلًا بتعمل [[req.body.email]] بدل [[input.email]])، وعندك دلوقتي حسابين لنفس الشخص. ولو رجعت 500، يبقى الـ error handler مش بيحوّل P2002.`
        },
        {
          cmd: "access + refresh",
          title: "الدخول: توكن قصير وتوكن طويل",
          desc: R`لما الباسورد يطلع صح، السيرفر بيطلّع حاجتين. الأول access token (JWT) عمره ١٥ دقيقة، وبيتبعت في header مع كل طلب. والتاني refresh token عشوائي عمره ٣٠ يوم، بيتحط في cookie [[httpOnly]] الـ JavaScript مش شايفها، وبيتخزن hash منه في القاعدة.

القصير لو اتسرق بيموت بسرعة. والطويل مبيتسرقش بـ XSS، وتقدر تلغيه من القاعدة في أي وقت.`,
          example: R`const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");

router.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password } = Login.parse(req.body);
  const user = await db.user.findUnique({ where: { email } });
  const ok = await argon2.verify(user?.passwordHash ?? DUMMY_HASH, password);
  if (!user || !ok) throw new AppError(401, "BAD_CREDENTIALS", "الإيميل أو الباسورد غلط");
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: "15m" });
  const refresh = crypto.randomBytes(32).toString("base64url");
  await db.session.create({ data: { userId: user.id, tokenHash: sha256(refresh), expiresAt: new Date(Date.now() + 30 * 864e5) } });
  res.cookie("rt", refresh, { httpOnly: true, secure: true, sameSite: "lax", path: "/auth", maxAge: 30 * 864e5 });
  res.json({ data: { accessToken, user: { id: user.id, name: user.name, role: user.role } } });
});`,
          try: R`سجّل دخول من المتصفح وافتح DevTools. في Application ثم Cookies هتلاقي [[rt]] وقدامها HttpOnly. بعدين اكتب [[document.cookie]] في الـ Console، ولاحظ إنها مش ظاهرة. خد الـ access token والصقه في jwt.io، هتلاقي الـ payload مقروء، يعني مفيش أي سر يتحط فيه.`,
          flag: "script",
          deep: {
            why: "لو عندك توكن واحد عمره طويل، سرقته معناها حساب مسروق لأسابيع، ومفيش طريقة تلغيه. ولو توكن واحد قصير، المستخدم هيسجّل دخول كل ربع ساعة. الاتنين مع بعض بيدّوك الأمان والراحة في نفس الوقت.",
            how: R`الـ JWT موقّع بالـ secret. السيرفر بيتحقق منه من غير ما يسأل القاعدة، وده أسرع. بس معنى كده إنك مينفعش تلغيه قبل ما يخلص، عشان كده عمره قصير. الـ refresh token العكس: نص عشوائي ملوش معنى، ومتخزن في جدول sessions، فتقدر تلغيه، وتعرض للمستخدم أجهزته، وتعمل «اخرج من كل الأجهزة».

والقاعدة بتخزن sha256 للـ refresh مش التوكن نفسه. لو القاعدة اتسربت، الـ hashes دي ملهاش أي فايدة للمهاجم.

إعدادات الـ cookie كل واحد فيهم ليه سبب. [[httpOnly]] معناها إن JavaScript مش شايفها، فالـ XSS ميقدرش يسرقها. و [[secure]] معناها HTTPS بس. و [[sameSite: "lax"]] معناها إن المتصفح مش هيبعتها مع POST جاي من موقع تاني، ودي حماية من CSRF. و [[path: "/auth"]] معناها إنها بتتبعت لمسارات الـ auth بس، مش مع كل طلب.

والـ access token مكانه الذاكرة، يعني متغير في JavaScript. مش localStorage، لأن أي XSS يقدر يقرا localStorage.

خلي بالك من [[DUMMY_HASH]]. لو المستخدم مش موجود وانت تجاهلت الـ verify، الرد هيطلع أسرع، والمهاجم يقدر يعرف الإيميلات المتسجّلة من الوقت. فبنعمل verify على hash وهمي عشان الوقت يبقى واحد في الحالتين.

وموضوع الدومين: لو الواجهة على [[app.example.com]] والـ API على [[api.example.com]]، الاتنين same-site و lax شغالة. لكن لو على دومينين مختلفين خالص، هتحتاج [[SameSite=None]]، والأحسن تحطهم تحت نفس الدومين.

وفيه بديل أبسط: session id عادي في cookie والبيانات في القاعدة أو Redis. ده مناسب لو التطبيق ويب بس، ومكتبات زي Auth.js و Better Auth بتعمله. أما الـ JWT مع refresh فبيبان فايدته لما نفس الـ API بيخدم ويب وموبايل.`,
            when: "أي API بيخدم أكتر من client، أو عايز دخول طويل من غير ما تخاطر.",
            mistakes: R`في مشروع حقيقي، الـ refresh token كان بيتحط في cookie httpOnly، وبرضه بيرجع في الـ JSON. والواجهة كانت بتحفظه في localStorage، فالـ httpOnly بقت ملهاش لازمة. وفي مشروع تاني، التوكن الوحيد كان في localStorage وعمره أيام. ومن الغلطات الشائعة كمان: بيانات حساسة في الـ payload (ده base64 مش تشفير). أو [[jwt.decode]] بدل [[jwt.verify]]. أو رسالتين مختلفتين للإيميل الغلط والباسورد الغلط. أو login من غير rate limit.`
          },
          teach: R`## الـ login بيطلّع توكنين

الـ route بيتأكد من الإيميل والباسورد، وبعدين بيطلّع **access token** (JWT عمره ربع ساعة) في الـ JSON، و **refresh token** (نص عشوائي عمره ٣٠ يوم) في cookie، ويحفظ hash الـ refresh في جدول sessions. جرّبناه بـ jsonwebtoken 9 و argon2 و cookie-parser و Prisma 7 على PostgreSQL 18 (ويندوز 11، Node 24)، بعد ما سجّلنا [[ali@example.com]] بباسورد [[secret123]] في درس signup. وفي التجربة الـ JWT اتوقّع بسر تجربة، مش سر حقيقي.

---

## ١. [[const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");]]

من جوه لبرة:

1. [[crypto.createHash("sha256")]] جهّز hash من نوع SHA-256 (من موديول [[node:crypto]]).
2. [[.update(s)]] دخّل النص.
3. [[.digest("hex")]] طلّع الناتج نص hex: ٦٤ حرف.

sha256 سريع جدًا، وده مناسب هنا: التوكن عشوائي ٣٢ byte مستحيل يتخمّن، فمش محتاجين بطء argon2.

---

## ٢. [[router.post("/auth/login", loginLimiter, async (req, res) => {]]

[[loginLimiter]] middleware قبل الـ handler: بيحدد عدد المحاولات لكل IP (درس rate limit في تاب «Backend بـ Node»). Express بينادي الاتنين بالترتيب. (في تجربتنا خليناه middleware فاضي بيعدّي.)

---

## ٣. [[const { email, password } = Login.parse(req.body);]]

[[Login]] schema بنفس فكرة [[Signup]]: إيميل small وباسورد. و [[{ email, password }]] destructuring بيطلّع الحقلين في متغيرين.

---

## ٤. التحقق: ٣ سطور

### [[const user = await db.user.findUnique({ where: { email } });]]

[[findUnique]] بيدوّر بعمود unique، وبيرجّع المستخدم أو [[null]]. و [[{ email }]] اختصار [[{ email: email }]].

### [[await argon2.verify(user?.passwordHash ?? DUMMY_HASH, password)]]

من جوه لبرة:

- [[user?.passwordHash]]: [[?.]] (optional chaining) لو [[user]] بـ [[null]] النتيجة [[undefined]] بدل ما يرمي error.
- [[?? DUMMY_HASH]]: لو اللي قبلها [[null]] أو [[undefined]]، خد [[DUMMY_HASH]]: hash عملناه مرة واحدة لباسورد وهمي.
- [[argon2.verify(hash, password)]] بيعمل hash للباسورد بنفس الـ salt والإعدادات اللي جوه النص، ويقارن. بيرجّع [[true]] أو [[false]].

ليه الوهمي؟ عشان الوقت. قسنا ٣ مرات باسورد غلط لإيميل موجود، و ٣ لإيميل مش موجود:

~~~text الناتج (curl -w "%{time_total}")
wrong-pass 401 0.058441
no-user    401 0.056488
wrong-pass 401 0.056185
no-user    401 0.055151
wrong-pass 401 0.062010
no-user    401 0.065868
~~~

نفس الوقت تقريبًا (حوالي ٥٦ ملّي). لو شلت الـ verify للإيميل المش موجود، الرد هيرجع أسرع بحوالي ٤٦ ملّي (وقت hash واحد على الجهاز ده)، والمهاجم يعرف مين متسجّل من الساعة.

### [[if (!user || !ok) throw new AppError(401, "BAD_CREDENTIALS", ...)]]

رسالة واحدة للحالتين:

~~~text الناتج
{"error":{"code":"BAD_CREDENTIALS","message":"الإيميل أو الباسورد غلط"}}
~~~

---

## ٥. الـ access token: [[jwt.sign({ sub, role }, config.JWT_SECRET, { expiresIn: "15m" })]]

- الـ payload: [[sub]] (subject: مين صاحب التوكن) و [[role]].
- [[config.JWT_SECRET]] السر اللي بيتوقّع بيه.
- [[expiresIn: "15m"]] المكتبة بتحط [[exp]] = دلوقتي + ٩٠٠ ثانية.

فكّينا توكن معمول بنفس السطر ده بالأمر اللي في الـ solCode:

~~~bash
node -e 'const t = process.argv[1]; console.log(JSON.parse(Buffer.from(t.split(".")[1], "base64url")))' "eyJhbGciOi..."
~~~

~~~text الناتج
{
  sub: 'cmuzdfpd30000z4iekkhfr3uy',
  role: 'STUDENT',
  iat: 1791454027,
  exp: 1791454927
}
~~~

- [[t.split(".")]] الـ JWT ٣ حتت بينهم نقط: header و payload و signature. والعنصر رقم [[1]] هو التاني (العد من صفر).
- [[Buffer.from(..., "base64url")]] فك الـ base64url لـ bytes، و [[JSON.parse]] حوّلها object.
- [[iat]] (issued at) وقت الإصدار بالثواني من ١٩٧٠، و [[exp - iat = 900]] يعني ١٥ دقيقة.

والـ header: [[{ alg: 'HS256', typ: 'JWT' }]]: [[HS256]] يعني HMAC بـ SHA-256 بسر واحد للتوقيع والتحقق.

يعني أي حد يقرا التوكن من غير مفتاح. التوقيع بيمنع **التعديل** بس: غيّرنا [[role]] لـ [[ADMIN]] في الـ payload وعملنا [[jwt.verify]]:

~~~text الناتج
JsonWebTokenError invalid signature
~~~

---

## ٦. الـ refresh token

### [[crypto.randomBytes(32).toString("base64url")]]

٣٢ byte عشوائي (٢٥٦ bit) مكتوبين base64url: ٤٣ حرف. نص ملوش معنى، مش JWT.

### [[db.session.create({ data: { userId, tokenHash: sha256(refresh), expiresAt } })]]

بنخزن الـ hash بس. و [[30 * 864e5]]: [[864e5]] يعني 86,400,000 ملّي = يوم، يعني ٣٠ يوم بالملّي (2,592,000,000).

### [[res.cookie("rt", refresh, { ... })]]

جربنا الـ login الحقيقي:

~~~text الناتج
HTTP/1.1 200 OK
Set-Cookie: rt=<43 حرف>; Max-Age=2592000; Path=/auth; Expires=Sat, 07 Nov 2026 10:06:55 GMT; HttpOnly; Secure; SameSite=Lax
~~~

| الخيار | في الـ header | معناه |
|---|---|---|
| [[maxAge: 30 * 864e5]] | [[Max-Age=2592000]] و [[Expires=...]] | Express بياخدها بالملّي ويكتبها بالثواني، وبيحسب التاريخ كمان |
| [[path: "/auth"]] | [[Path=/auth]] | بتتبعت لمسارات [[/auth/...]] بس |
| [[httpOnly: true]] | [[HttpOnly]] | [[document.cookie]] مش شايفها، فالـ XSS ميسرقهاش |
| [[secure: true]] | [[Secure]] | HTTPS بس (المتصفحات بتستثني localhost) |
| [[sameSite: "lax"]] | [[SameSite=Lax]] | متتبعتش مع POST جاي من موقع تاني (CSRF) |

---

## ٧. [[res.json({ data: { accessToken, user: { id, name, role } } })]]

~~~text الناتج (التوكن مختصر)
{"data":{"accessToken":"eyJhbGciOiJIUzI1NiIs...","user":{"id":"cmuzdfpd30000z4iekkhfr3uy","name":"Ali","role":"STUDENT"}}}
~~~

الواجهة بتحط [[accessToken]] في متغير في الذاكرة (درس apiFetch)، والـ refresh مش في الـ JSON خالص: هو في الـ cookie بس.

---

## الخلاصة

| | access token | refresh token |
|---|---|---|
| شكله | JWT موقّع | نص عشوائي ٤٣ حرف |
| عمره | ١٥ دقيقة | ٣٠ يوم |
| مكانه في المتصفح | متغير في الذاكرة | cookie [[HttpOnly]] |
| بيتبعت إزاي | [[Authorization: Bearer ...]] | لوحده مع [[/auth/...]] |
| السيرفر بيتحقق إزاي | التوقيع، من غير قاعدة | hash في جدول sessions |
| يتلغي قبل ما يخلص؟ | لأ | أيوه (revokedAt) |

الـ payload مقروء لأي حد، ورسالة الخطأ واحدة، والوقت واحد بالـ DUMMY_HASH.`,
          lines: [
            "دالة صغيرة بتعمل sha256. بنخزن بيها الـ refresh token في القاعدة.",
            "مسار الدخول، وقدامه rate limit عشان تخمين الباسوردات.",
            "Zod بيتأكد من الشكل، وبيحوّل الإيميل small.",
            "دوّر على المستخدم.",
            "اتحقق من الباسورد. ولو مفيش مستخدم، اتحقق على hash وهمي عشان الوقت يبقى واحد.",
            "رسالة واحدة للحالتين، متقولش أنهي فيهم الغلط.",
            "توكن قصير فيه id المستخدم ودوره، عمره ربع ساعة.",
            "توكن طويل عشوائي، ٣٢ بايت.",
            "سجّل الـ session بالـ hash بتاعه بس، وعمرها ٣٠ يوم.",
            "حطه في cookie محدش يقراها غير المتصفح، ومبتتبعتش غير لمسارات الـ auth.",
            "رجّع التوكن القصير وبيانات المستخدم الأساسية.",
            "قفلة."
          ],
          sol: R`في DevTools هتلاقي [[rt]] وقدامها علامة في HttpOnly و Secure، و SameSite بـ Lax، و Path بـ [[/auth]]. نفس الكلام ظاهر في الـ header: [[Set-Cookie: rt=...; Max-Age=2592000; Path=/auth; HttpOnly; Secure; SameSite=Lax]]. و [[document.cookie]] في الـ Console هترجع نص فاضي أو cookies تانية، بس [[rt]] مش فيها. ده اللي بيحميها من أي XSS.

في jwt.io الـ header هيبقى [[{"alg":"HS256","typ":"JWT"}]]، والـ payload [[{"sub":"cmun8...","role":"STUDENT","iat":1790720120,"exp":1790721020}]]. الفرق بين exp و iat هو 900 ثانية، يعني الـ 15 دقيقة. وأي حد معاه التوكن يقرا الكلام ده من غير المفتاح، التوقيع بس بيمنع التعديل.

لو [[rt]] مظهرتش خالص: على [[http://]] غير localhost المتصفح بيرفض أي cookie عليها Secure. ولو الواجهة على port تاني، لازم [[credentials: "include"]] في الـ fetch، وإلا المتصفح بيتجاهل الـ Set-Cookie.`,
          solCode: R`# نفس الكلام من الترمنال
curl -si -H "Content-Type: application/json" \
  -d '{"email":"ali@example.com","password":"secret123"}' \
  localhost:4000/auth/login | grep -i set-cookie

# فك الـ payload من غير أي مفتاح
node -e 'const t = process.argv[1]; console.log(JSON.parse(Buffer.from(t.split(".")[1], "base64url")))' "ACCESS_TOKEN_HERE"`
        },
        {
          cmd: "refresh rotation",
          title: "تجديد التوكن وتسجيل الخروج",
          desc: R`لما الـ access token يخلص، الواجهة بتنادي [[/auth/refresh]]، والـ cookie بتتبعت لوحدها. السيرفر بيلغي الـ refresh القديم ويطلّع واحد جديد، وده اسمه rotation.

ولو حد استخدم refresh ملغي، يبقى في احتمال كبير إنه اتسرق واتستخدم قبل كده. فالسيرفر بيلغي كل sessions المستخدم ده، وده اسمه reuse detection.`,
          example: R`router.post("/auth/refresh", async (req, res) => {
  const token = req.cookies.rt;
  const session = token && (await db.session.findUnique({ where: { tokenHash: sha256(token) }, include: { user: true } }));
  if (!session || session.expiresAt < new Date()) throw new AppError(401, "NO_SESSION", "سجّل دخول تاني");
  const { count } = await db.session.updateMany({ where: { id: session.id, revokedAt: null }, data: { revokedAt: new Date() } });
  if (count === 0) {
    await db.session.updateMany({ where: { userId: session.userId, revokedAt: null }, data: { revokedAt: new Date() } });
    throw new AppError(401, "TOKEN_REUSED", "سجّل دخول تاني");
  }
  return issueTokens(res, session.user);
});
router.post("/auth/logout", async (req, res) => {
  if (req.cookies.rt) await db.session.updateMany({ where: { tokenHash: sha256(req.cookies.rt) }, data: { revokedAt: new Date() } });
  res.clearCookie("rt", { path: "/auth" }).status(204).end();
});`,
          try: R`سجّل دخول، وانسخ قيمة الـ cookie [[rt]]. اعمل refresh من الواجهة مرة. بعدين ابعت الـ cookie القديمة بإيدك بـ curl ([[-b "rt=..."]]). المفروض ترجع TOKEN_REUSED، وكمان الـ session الجديدة تتلغي.`,
          flag: "script",
          deep: {
            why: "من غير rotation، الـ refresh token المسروق بيفضل شغال ٣٠ يوم، وصاحبه الحقيقي مش حاسس بحاجة. مع الـ rotation والـ reuse detection، أول ما الاتنين (المهاجم وصاحب الحساب) يستخدموا نفس التوكن، السيرفر بيكتشف ويقفل كل حاجة.",
            how: R`[[updateMany]] بشرط [[revokedAt: null]] هو قلب الموضوع. هو قراية وكتابة في خطوة واحدة ذرية. لو رجّع count بـ 1، يبقى احنا اللي لغينا التوكن ده دلوقتي، والاستخدام سليم. ولو رجّع 0، يبقى التوكن كان ملغي قبل كده، يعني حد استخدمه قبلنا.

[[issueTokens]] هي نفس الجزء الأخير من الـ login بعد ما اتنقل لدالة: session جديدة، و cookie جديدة، و access token جديد.

الـ logout مبيمسحش الـ session، بيعلّم عليها إنها ملغية. كده السجل بيفضل موجود، ولو التوكن ده رجع تاني هنعرف إنه reuse. وجدول sessions محتاج job ينضّف المنتهي من زمان.

و [[req.cookies]] محتاجة [[cookie-parser]] في Express.

فيه مشكلة حقيقية هنا: لو المستخدم فاتح تابين، والاتنين عملوا refresh في نفس اللحظة بنفس الـ cookie، التاني هيتعامل كأنه reuse، والمستخدم هيتطرد. الحلول: فترة سماح صغيرة (١٠ ثواني مثلًا) التوكن القديم يفضل مقبول فيها، أو إن الواجهة تنسّق بين التابات بـ [[navigator.locks]] عشان واحد بس يعمل refresh.`,
            when: "مع أي نظام refresh tokens. من غير rotation، التوكن الطويل بيبقى أضعف نقطة عندك.",
            mistakes: R`إنك تلغي الـ access token في الـ logout وتنسى الـ refresh، فيفضل شغال ٣٠ يوم. أو [[clearCookie]] من غير نفس الـ path اللي اتعملت بيه، فالمتصفح ميمسحهاش. أو إنك تتحقق بـ [[findUnique]] وبعدين [[update]] في خطوتين، فطلبين في نفس اللحظة الاتنين يعدّوا. أو reuse detection من غير فترة سماح، فالتابات تطرد بعض.`
          },
          teach: R`## route للتجديد و route للخروج

[[/auth/refresh]] بياخد الـ refresh من الـ cookie، يلغي الـ session بتاعته، ويطلّع session جديدة وتوكنات جديدة. ولو الـ session كانت ملغية أصلًا، يلغي كل sessions المستخدم. و [[/auth/logout]] بيلغي الـ session ويمسح الـ cookie. جرّبناهم بنفس سيرفر درس «access + refresh» (Express 5 و cookie-parser و Prisma 7 و PostgreSQL 18، ويندوز 11)، والـ cookie بنبعتها بإيدنا بـ [[curl -b]].

---

## ١. [[const token = req.cookies.rt;]]

[[req.cookies]] object فيه كل الـ cookies اللي المتصفح بعتها، و [[cookie-parser]] هو اللي بيملاه من الـ header [[Cookie: rt=...]]. من غيره [[req.cookies]] بيبقى [[undefined]] والسطر ده يرمي error.

---

## ٢. [[const session = token && (await db.session.findUnique({ ... }))]]

- [[token && (...)]]: لو مفيش cookie، [[session]] بياخد قيمة [[token]] نفسها ([[undefined]]) ومنكلّمش القاعدة خالص.
- [[where: { tokenHash: sha256(token) }]] بندوّر بالـ hash، لأن ده اللي متخزن.
- [[include: { user: true }]] هات المستخدم مع الـ session في نفس الـ query، عشان [[issueTokens]] محتاجاه.

### [[if (!session || session.expiresAt < new Date()) throw ... NO_SESSION]]

مفيش session، أو [[expiresAt]] (تاريخ) أصغر من دلوقتي يعني خلصت. جرّبنا من غير cookie:

~~~text الناتج
HTTP/1.1 401 Unauthorized
{"error":{"code":"NO_SESSION","message":"سجّل دخول تاني"}}
~~~

---

## ٣. قلب الدرس: [[updateMany]] بشرط

~~~text
const { count } = await db.session.updateMany({ where: { id: session.id, revokedAt: null }, data: { revokedAt: new Date() } });
~~~

القاعدة بتنفذ ده كـ SQL واحد: [[UPDATE "Session" SET "revokedAt" = now WHERE id = ... AND "revokedAt" IS NULL]]. و [[updateMany]] بيرجّع [[{ count }]]: كام صف اتغير.

| [[count]] | معناه |
|---|---|
| 1 | الـ session كانت شغالة، واحنا اللي لغيناها دلوقتي. استخدام سليم |
| 0 | كانت ملغية قبل كده. يعني حد استخدم التوكن ده قبلنا |

ليه مش [[if (session.revokedAt)]] وبعدين [[update]]؟ لأن طلبين في نفس اللحظة الاتنين هيلاقوا [[revokedAt]] فاضي ويعدّوا. الشرط جوه الـ UPDATE بيخلي القاعدة نفسها تختار واحد بس.

---

## ٤. [[if (count === 0) { ... }]]: الـ reuse detection

~~~text
await db.session.updateMany({ where: { userId: session.userId, revokedAt: null }, data: { revokedAt: new Date() } });
throw new AppError(401, "TOKEN_REUSED", "سجّل دخول تاني");
~~~

الغي **كل** الـ sessions المفتوحة للمستخدم ده، على كل الأجهزة. التجربة كاملة:

1. login، وحفظنا الـ cookie في [[RT1]].
2. refresh بـ [[RT1]]: رجع [[200]] و cookie جديدة [[RT2]] مختلفة.
3. refresh بـ [[RT1]] تاني (كأن حد سرقها):

~~~text الناتج
HTTP/1.1 401 Unauthorized
{"error":{"code":"TOKEN_REUSED","message":"سجّل دخول تاني"}}
~~~

4. refresh بـ [[RT2]] (اللي مع صاحب الحساب):

~~~text الناتج
HTTP/1.1 401 Unauthorized
{"error":{"code":"TOKEN_REUSED","message":"سجّل دخول تاني"}}
~~~

[[RT2]] اتلغت في الخطوة ٣، فهي كمان بقت reuse. الاتنين برّه، وصاحب الحساب يدخل تاني بالباسورد، والمهاجم معهوش.

---

## ٥. [[return issueTokens(res, session.user);]]

[[issueTokens]] هي آخر جزء من الـ login بعد ما اتنقل لدالة: session جديدة، و cookie جديدة، و access token في الـ JSON. و [[return]] عشان مفيش كود بعدها يحاول يرد تاني.

---

## ٦. [[/auth/logout]]

~~~text
if (req.cookies.rt) await db.session.updateMany({ where: { tokenHash: sha256(req.cookies.rt) }, data: { revokedAt: new Date() } });
res.clearCookie("rt", { path: "/auth" }).status(204).end();
~~~

- بيعلّم على الـ session [[revokedAt]] مش بيمسحها، عشان لو التوكن رجع تاني نعرف إنه reuse.
- [[res.clearCookie("rt", { path: "/auth" })]] لازم نفس الـ [[path]] اللي اتعملت بيه. المتصفح بيعرّف الـ cookie بالاسم والـ path والدومين مع بعض.
- [[.status(204).end()]] تمام ومفيش body. والدوال دي بترجّع [[res]] نفسه، فبتتكتب ورا بعض (chaining).

~~~text الناتج
HTTP/1.1 204 No Content
Set-Cookie: rt=; Path=/auth; Expires=Thu, 01 Jan 1970 00:00:00 GMT
~~~

مسح الـ cookie = نفس الاسم، قيمة فاضية، وتاريخ انتهاء في ١٩٧٠ (فات من زمان)، فالمتصفح بيشيلها.

وبصّينا في الجدول بعد التجربة: كل الصفوف [[revoked = t]]، ومفيش صف اتمسح.

---

## ٧. مشكلة التابين

بعتنا نفس الـ cookie في طلبين refresh في نفس اللحظة (زي تابين مفتوحين):

~~~text الناتج
tab1 200
{"error":{"code":"TOKEN_REUSED", ...  tab2 401
~~~

واحد كسب، والتاني اتعامل كأنه سرقة، والمستخدم اتطرد من التابين. الحل في الواجهة: refresh واحد مشترك (درس apiFetch، أو [[navigator.locks]] بين التابات)، أو فترة سماح صغيرة في السيرفر.

---

## الخلاصة

| الحالة | الرد |
|---|---|
| مفيش cookie أو session خلصت | 401 NO_SESSION |
| session شغالة | 200 وتوكنات جديدة، والقديمة اتلغت |
| session ملغية قبل كده | 401 TOKEN_REUSED، وكل sessions المستخدم تتلغي |
| logout | 204 و cookie فاضية بنفس الـ path |

الإلغاء والفحص في خطوة واحدة ([[updateMany]] بشرط [[revokedAt: null]])، والـ session بتتعلّم مش بتتمسح.`,
          lines: [
            "مسار التجديد. مفيش requireAuth هنا، لأن الـ access token أصلًا خلص.",
            "الـ refresh token من الـ cookie.",
            "دوّر على الـ session بالـ hash، وهات المستخدم معاها.",
            "مفيش session أو خلصت؟ يبقى لازم دخول من الأول.",
            "الغيها بشرط إنها مش ملغية. قراية وكتابة في خطوة واحدة.",
            "لو count بـ 0، يبقى التوكن كان ملغي، وحد استخدمه قبلنا...",
            "...فالغي كل sessions المستخدم ده على كل الأجهزة...",
            "...واطلب دخول من الأول.",
            "قفلة.",
            "اطلّع توكنات جديدة، بنفس كود الـ login.",
            "قفلة.",
            "الخروج.",
            "لو فيه cookie، علّم الـ session بتاعتها إنها ملغية.",
            "امسح الـ cookie بنفس الـ path بالظبط، ورد 204.",
            "قفلة."
          ],
          sol: R`أول refresh من الواجهة بيرجع 200 و cookie [[rt]] جديدة. لما تبعت القديمة بـ curl ترجع [[401]] و [[{"error":{"code":"TOKEN_REUSED","message":"سجّل دخول تاني"}}]]. ولو جربت بعدها الـ cookie الجديدة (اللي في المتصفح)، هترجع هي كمان [[TOKEN_REUSED]]، لأن الكود لغى كل sessions المستخدم ده. يعني المتصفح نفسه اتعمله logout، وده المقصود: لو الـ token القديم اتسرق، الاتنين يخرجوا والمستخدم الحقيقي يدخل تاني.

في جدول الـ sessions هتلاقي كل الصفوف بتاعة المستخدم فيها [[revokedAt]]. ولو بعت من غير cookie خالص، الرد [[401 NO_SESSION]]. و logout بيرجع [[204]] ومعاه [[Set-Cookie: rt=; Path=/auth; Expires=Thu, 01 Jan 1970]].

لو القديمة رجعت 200، يبقى انت مش بتلغي الـ session القديمة في الـ refresh. ولو الواجهة بتعمل ٣ refresh في نفس اللحظة وبتطلع TOKEN_REUSED لوحدها، دي مش مشكلة في السيرفر، دي الواجهة محتاجة الـ [[refreshing]] المشترك اللي في درس «apiFetch».`,
          solCode: R`OLD='rt=...'   # انسخها من DevTools قبل الـ refresh
curl -si -X POST -b "$OLD" localhost:4000/auth/refresh | head -1
# HTTP/1.1 401 Unauthorized  +  {"error":{"code":"TOKEN_REUSED",...}}

psql "$DATABASE_URL" -c 'SELECT id, "revokedAt" FROM "Session" ORDER BY "expiresAt" DESC LIMIT 5;'`
        },
        {
          cmd: "apiFetch",
          title: "الواجهة: التوكن فين، وإزاي يتجدد من غير ما المستخدم يحس",
          desc: R`في الواجهة، كل الطلبات بتعدّي على دالة واحدة. الدالة دي بتحط الـ access token في الـ header، ولو الرد رجع 401 بتعمل refresh مرة واحدة وتعيد الطلب. المستخدم مبيحسش بأي حاجة.

والـ access token متخزن في متغير في الذاكرة. لما الصفحة تعمل reload المتغير بيضيع، وأول طلب بعدها بيرجع 401، فالدالة بتعمل refresh من الـ cookie وتكمّل.`,
          example: R`let accessToken = null;
let refreshing = null;

export async function apiFetch(path, options = {}) {
  const send = () => fetch(API_URL + path, { ...options, credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers, ...(accessToken && { Authorization: $__btBearer $__{accessToken}$__bt }) } });
  let res = await send();
  if (res.status === 401 && !path.startsWith("/auth/")) {
    refreshing ??= fetch(API_URL + "/auth/refresh", { method: "POST", credentials: "include" })
      .then(async (r) => { accessToken = r.ok ? (await r.json()).data.accessToken : null; })
      .finally(() => { refreshing = null; });
    await refreshing;
    if (accessToken) res = await send();
  }
  return res;
}`,
          try: R`خلي عمر الـ access token في السيرفر 20 ثانية للتجربة. افتح صفحة بتعمل ٣ طلبات مع بعض واستنى 30 ثانية واعمل refresh للداتا. في Network لازم تلاقي طلب [[/auth/refresh]] واحد بس، مش ٣.`,
          flag: "script",
          deep: {
            why: "من غير دالة مركزية، كل component بيتعامل مع التوكن بطريقته، واللي ينسى منهم يطلّع للمستخدم «سجّل دخول تاني» في نص الشغل. ومن غير تنسيق، ٥ طلبات بيرجعوا 401 مع بعض فيعملوا ٥ refresh. ومع الـ rotation، الـ ٤ الزيادة هيتعاملوا كأنهم reuse، والمستخدم يتطرد.",
            how: R`[[refreshing]] هو السر. أول طلب يرجع 401 بيبدأ الـ refresh ويحفظ الـ promise. أي طلب تاني يرجع 401 في نفس الوقت بيلاقي الـ promise موجودة ([[??=]] مش هتعمل واحدة جديدة)، فبيستنى نفس الـ refresh. ولما يخلص، [[finally]] بترجّعه null.

[[credentials: "include"]] لازمة عشان المتصفح يبعت الـ cookie للـ API لو على origin مختلف. والـ API لازم يرد بـ CORS فيه origin محدد و [[credentials: true]]. مينفعش [[*]] مع cookies.

الطلبات اللي على [[/auth/]] مستثناة، عشان لو الـ login نفسه رجع 401 (باسورد غلط) ميعملش refresh.

ولو الـ refresh فشل، [[accessToken]] بيبقى null والدالة بترجّع الـ 401 الأصلي. ساعتها الواجهة (hook أو layout) بتوديه لصفحة الدخول. وبعد الـ login بتحتاج دالة صغيرة زي [[setAccessToken(t)]] تحط التوكن في المتغير.

في Next.js فيه طريق تاني: الـ server components بتقرا الـ cookie وتكلّم الـ API من السيرفر (BFF). ساعتها التوكن مبيوصلش للمتصفح أصلًا. التفاصيل في تاب «Next.js»، وجلب الداتا بـ TanStack Query في تاب «React».`,
            when: "في أي واجهة بتكلّم API بتوكنات. اكتبها مرة في [[lib/api.ts]]، وممنوع أي fetch مباشر للـ API في أي مكان تاني.",
            mistakes: "إنك تحفظ التوكن في localStorage عشان «ميضيعش مع الـ reload». الـ refresh cookie هي اللي بتحل المشكلة دي. أو refresh من غير تنسيق، فطلبات كتير تعمل refresh مع بعض. أو إعادة الطلب في loop لا نهائي لو الـ refresh رجع 401. أو تنسى credentials فالـ cookie متتبعتش، وتفضل تدوّر على المشكلة في السيرفر."
          },
          teach: R`## دالة واحدة لكل طلبات الواجهة

[[apiFetch]] بدل [[fetch]] في كل مكان: بتحط التوكن في الـ header، ولو الرد رجع 401 بتعمل refresh **واحد** حتى لو ١٠ طلبات رجعوا 401 مع بعض، وبعدين تعيد الطلب. جرّبناها في Chromium (Playwright) على صفحة متقدّمة من نفس سيرفر الـ API (بورت 6017، فمفيش CORS)، والـ access token عمره **ثانيتين** بدل ١٥ دقيقة عشان يخلص بسرعة. ضفنا للتجربة بس array اسمها [[log]] بتسجّل كل طلب بيتبعت، وسطر [[setAccessToken]] بعد الـ login.

---

## ١. المتغيرين اللي برّه الدالة

~~~text
let accessToken = null;
let refreshing = null;
~~~

متغيرات على مستوى الموديول: كل استدعاءات [[apiFetch]] شايفة نفس النسخة.

- [[accessToken]] التوكن في الذاكرة بس. أي XSS يقدر يقرا localStorage، لكن متغير جوه موديول أصعب بكتير.
- [[refreshing]] الـ promise بتاعة الـ refresh اللي شغال دلوقتي، أو [[null]].

---

## ٢. [[const send = () => fetch(API_URL + path, { ... })]]

دالة صغيرة بتبعت الطلب، عشان نناديها مرتين (الأولى، والإعادة بعد الـ refresh) والمرة التانية تاخد التوكن **الجديد**.

### [[{ ...options, credentials: "include", headers: {...} }]]

- [[...options]] (spread) انسخ كل اللي المستدعي بعته ([[method]] و [[body]]...).
- [[credentials: "include"]] ابعت الـ cookies حتى لو الـ API على origin تاني. من غيرها الـ [[rt]] متتبعتش، و [[Set-Cookie]] في الرد بيتجاهل.

### الـ headers من جوه لبرة

~~~text
headers: { "Content-Type": "application/json", ...options.headers, ...(accessToken && { Authorization: $__btBearer $__{accessToken}$__bt }) }
~~~

1. [[$__btBearer $__{accessToken}$__bt]] template string: كلمة [[Bearer]] ومسافة والتوكن.
2. [[accessToken && { Authorization: ... }]] لو مفيش توكن النتيجة [[null]]، ولو فيه النتيجة object.
3. [[...( )]] فرد [[null]] مبيضيفش حاجة، ففي الحالة دي مفيش [[Authorization]] خالص.
4. [[...options.headers]] بعد الـ Content-Type، فالمستدعي يقدر يغيّره.

---

## ٣. [[let res = await send();]]

أول محاولة. [[let]] مش [[const]] لأننا ممكن نبدّله برد الإعادة.

---

## ٤. [[if (res.status === 401 && !path.startsWith("/auth/"))]]

- [[401]] بس. الـ 403 معناها «مش مسموحلك»، والـ refresh مش هيغيّر ده.
- [[!path.startsWith("/auth/")]] لو الطلب نفسه login أو refresh ورجع 401 (باسورد غلط مثلًا)، متعملش refresh. وإلا يبقى loop.

---

## ٥. [[refreshing ??= fetch(...).then(...).finally(...)]]

### [[??=]]

«لو [[refreshing]] بـ [[null]] أو [[undefined]]، حط فيه القيمة دي. غير كده سيبه». يعني أول طلب يرجع 401 هو اللي بيبدأ الـ refresh، والباقيين يلاقوه موجود.

### [[fetch(API_URL + "/auth/refresh", { method: "POST", credentials: "include" })]]

الـ refresh نفسه. التوكن هنا مش في الـ header، هو الـ cookie اللي المتصفح بيبعتها لوحده.

### [[.then(async (r) => { accessToken = r.ok ? (await r.json()).data.accessToken : null; })]]

لو نجح ([[r.ok]] يعني 200 لـ 299)، خد التوكن الجديد من [[data.accessToken]]. لو فشل، [[null]].

### [[.finally(() => { refreshing = null; })]]

[[finally]] بتشتغل نجح أو فشل: فضّي المكان عشان الـ 401 الجاية (بعد ربع ساعة) تبدأ refresh جديد.

---

## ٦. [[await refreshing;]] و [[if (accessToken) res = await send();]]

كل الطلبات اللي رجعت 401 بتستنى **نفس** الـ promise. لما تخلص، لو فيه توكن نعيد الطلب، ولو لأ بنرجّع الـ 401 الأصلي والواجهة توديه صفحة الدخول.

---

## ٧. التجربة

### ٣ طلبات مع بعض بعد ما التوكن خلص

استنينا ٣ ثواني بعد الـ login، وبعدين [[Promise.all]] على [[/me/data]] و [[/me/data]] و [[/admin/stats]]:

~~~text الناتج
statuses: [200, 200, 200]
order: ["/me/data", "/me/data", "/admin/stats", "/auth/refresh", "/admin/stats", "/me/data", "/me/data"]
~~~

٣ طلبات رجعت 401، وبعدها refresh **واحد**، وبعدها الـ ٣ اتعادوا ونجحوا. المستخدم شاف 200 في الآخر وبس.

### من غير التنسيق

بعتنا ٣ refresh مباشرة في نفس اللحظة بنفس الـ cookie (اللي كان هيحصل لو كل طلب عمل refresh لوحده):

~~~text الناتج
["200 ok", "401 TOKEN_REUSED", "401 TOKEN_REUSED"]
~~~

واحد نجح، والاتنين التانيين اتعاملوا كسرقة (درس refresh rotation) فلغوا كل الـ sessions. ده سبب [[refreshing]].

### بعد reload

حطينا [[accessToken = null]] (زي ما الـ reload بيمسح الذاكرة):

~~~text الناتج
afterReload: 200
order: ["/me/data", "/auth/refresh", "/me/data"]
~~~

الـ cookie لسه موجودة، فالدالة كمّلت لوحدها.

### بعد logout

~~~text الناتج
afterLogout: 401
order: ["/me/data", "/auth/refresh"]
~~~

الـ refresh فشل، فمفيش إعادة، والـ 401 رجع للواجهة. ومفيش loop.

### الـ cookie من JavaScript

[[document.cookie.includes("rt=")]] رجعت [[false]]: الـ [[HttpOnly]] شغالة.

---

## الخلاصة

| الحالة | اللي بيحصل |
|---|---|
| توكن سليم | طلب واحد |
| توكن خلص | 401، refresh، إعادة |
| ١٠ طلبات بتوكن خلصان | refresh واحد مشترك، و ١٠ إعادات |
| reload | أول طلب يعمل refresh من الـ cookie |
| الـ refresh فشل | الـ 401 يرجع للواجهة، تروح صفحة الدخول |
| 403 | يرجع زي ما هو، من غير refresh |

ممنوع أي [[fetch]] مباشر للـ API برّه الدالة دي.`,
          lines: [
            "الـ access token في الذاكرة بس، مش localStorage.",
            "الـ refresh اللي شغال دلوقتي، لو فيه.",
            "الدالة الوحيدة اللي الواجهة بتكلّم بيها الـ API.",
            "دالة بتبعت الطلب، ومعاه الـ cookies (credentials)...",
            "...وبتحط التوكن في Authorization لو موجود.",
            "ابعت الطلب.",
            "لو رجع 401، ومش طلب auth أصلًا...",
            "...ابدأ refresh، إلا لو فيه واحد شغال ([[??=]] بتسيب القديم)...",
            "...ولو نجح خد التوكن الجديد، ولو فشل خليه null...",
            "...ولما يخلص فضّي المكان للمرة الجاية.",
            "استنى الـ refresh، سواء انت اللي بدأته أو طلب تاني.",
            "لو فيه توكن جديد، ابعت الطلب الأصلي تاني.",
            "قفلة.",
            "رجّع الرد. لو لسه 401، الواجهة هتوديه صفحة الدخول.",
            "قفلة."
          ],
          sol: R`في Network بعد الـ 30 ثانية هتشوف الترتيب ده: ٣ طلبات راجعة 401، وبعدين طلب [[/auth/refresh]] واحد بـ 200، وبعدين نفس الـ ٣ طلبات تاني بـ 200. جربناها بـ access عمره ثانيتين و ٣ طلبات مع بعض، والطلبات اللي اتبعتت بالترتيب كانت: [[/me/data, /me/data, /admin/stats, /auth/refresh, /me/data, /me/data, /admin/stats]]. refresh واحد بس.

السر في [[refreshing ??=]]: أول طلب يلاقيه null فيبدأ الـ refresh ويحط الـ promise فيه، والاتنين التانيين يلاقوه موجود فيستنوا نفس الـ promise. لو شلت السطر ده وخليت كل واحد يعمل refresh لوحده، هتشوف ٣ refresh، وأول واحد بس ينجح، والاتنين التانيين يبعتوا الـ cookie القديمة فيرجعوا [[TOKEN_REUSED]] ويعملوا logout للمستخدم كله.

ولو طلب رجع 403 (مش مسموحله)، مفيش refresh ولا إعادة، والـ 403 بترجع زي ما هي. الـ refresh للـ 401 بس.`
        },
        {
          cmd: "password reset",
          title: "نسيت الباسورد: لينك بيشتغل مرة واحدة وبينتهي",
          desc: R`الطالب بيكتب إيميله، والسيرفر بيعمل token عشوائي، ويخزن الـ hash بتاعه بمدة ٣٠ دقيقة، ويبعت لينك فيه التوكن. والرد واحد دايمًا، سواء الإيميل موجود أو لأ.

ولما الطالب يفتح اللينك ويكتب باسورد جديد، السيرفر بيتأكد إن التوكن موجود ومستخدمش ولسه مخلصش. بعدين بيغيّر الباسورد، ويعلّم على التوكن إنه اتستخدم، ويلغي كل الـ sessions.`,
          example: R`router.post("/auth/forgot", forgotLimiter, async (req, res) => {
  const user = await db.user.findUnique({ where: { email: Forgot.parse(req.body).email } });
  if (user) {
    const token = crypto.randomBytes(32).toString("base64url");
    await db.passwordReset.create({ data: { userId: user.id, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 30 * 60e3) } });
    await emailQueue.add("reset", { to: user.email, link: $__bt$__{config.WEB_ORIGIN}/reset?token=$__{token}$__bt });
  }
  res.json({ data: { message: "لو الإيميل مسجّل، هيوصلك لينك خلال دقايق" } });
});
router.post("/auth/reset", async (req, res) => {
  const { token, password } = Reset.parse(req.body);
  const row = await db.passwordReset.findUnique({ where: { tokenHash: sha256(token) } });
  if (!row || row.usedAt || row.expiresAt < new Date()) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى، اطلب واحد جديد");
  await authService.resetPassword(row, password);
  res.status(204).end();
});`,
          try: R`اطلب لينك، واستخدمه مرة، وبعدين جرّب تستخدمه تاني. لازم يرجع BAD_TOKEN. وبعدين اطلب لينك لإيميل مش موجود، وقارن الرد بالأول: لازم يبقوا نفس الشكل بالظبط.`,
          flag: "script",
          deep: {
            why: "استعادة الباسورد باب خلفي للحساب. لو التوكن قابل للتخمين، أو شغال على طول، أو بيتخزن زي ما هو، فأي حد يوصل للقاعدة أو يخمّن يقدر ياخد أي حساب من غير ما يعرف الباسورد.",
            how: R`[[randomBytes(32)]] يعني ٢٥٦ bit عشوائية، وده مستحيل يتخمّن. والقاعدة بتخزن sha256 بتاعه بس، زي الـ refresh token، فلو القاعدة اتسربت اللينكات المفتوحة متتستخدمش. وهنا sha256 كفاية ومش محتاجين argon2، لأن التوكن عشوائي وطويل، مش باسورد ضعيف كتبه إنسان.

الرد الموحد بيمنع المهاجم يعرف الإيميلات المتسجّلة. وخلي بالك إن الوقت نفسه ممكن يفضح: لو الإيميل موجود السيرفر بيكتب في القاعدة ويبعت إيميل، فبياخد وقت أطول. عشان كده الإيميل بيروح queue، والفرق بيبقى صغير.

[[resetPassword]] بتعمل ٣ حاجات جوه transaction واحدة: الـ hash الجديد للمستخدم، و [[usedAt]] للتوكن بـ [[updateMany]] بشرط [[usedAt: null]] (ولو رجع count بـ 0 ترمي BAD_TOKEN، نفس فكرة الـ refresh)، و [[revokedAt]] لكل الـ sessions. لو حد كان داخل على الحساب بباسورد مسروق، بيطلع فورًا. وبعدها ابعت إيميل «الباسورد اتغير، لو مش انت كلّمنا».

التوكن في الـ URL ممكن يتسرب عن طريق الـ Referer، لو الصفحة بتحمّل سكربتات من برّه، أو في لوجات أدوات الـ analytics. فصفحة [[/reset]] تبقى نضيفة من أي سكربت خارجي، وحط عليها [[Referrer-Policy: no-referrer]].`,
            when: "في أي نظام فيه باسوردات. وبنفس الشكل تأكيد الإيميل وتغيير الإيميل: token مرة واحدة، ومتخزن hash، وليه مدة.",
            mistakes: R`إنك تخزن التوكن زي ما هو. أو تعمله من [[Math.random]] أو من الوقت. أو تسيبه شغال أيام. أو تسمح يتستخدم أكتر من مرة. أو ترد «الإيميل ده مش مسجّل». أو تنسى تلغي الـ sessions القديمة. وحاجة مهمة: لو مزوّد الإيميل مش متظبط، متخليش الكود «يطبع الإيميل في اللوج» كبديل في الإنتاج. في مشروع حقيقي كان ده الـ fallback، فلو المفتاح ناقص، لينكات الاستعادة وأكواد الـ OTP كانت هتتكتب في اللوجات.`
          },
          teach: R`## route يبعت اللينك، و route يستخدمه

[[/auth/forgot]] بيعمل توكن عشوائي، ويخزن الـ hash بتاعه بمدة ٣٠ دقيقة، ويحط إيميل في الـ queue، ويرد نفس الرد دايمًا. و [[/auth/reset]] بيتأكد من التوكن ويغيّر الباسورد ويلغي كل الـ sessions. جرّبناهم بنفس سيرفر دروس الـ auth (Express 5 و Prisma 7 و PostgreSQL 18، ويندوز 11). الـ [[emailQueue]] في التجربة دالة بتطبع الإيميل في ترمنال السيرفر بدل ما تبعته، و [[forgotLimiter]] middleware فاضي. و [[Forgot]] و [[Reset]] schemas Zod: [[Forgot]] فيه [[email]] (small)، و [[Reset]] فيه [[token]] و [[password]] بنفس شروط التسجيل.

---

## ١. [[/auth/forgot]] سطر سطر

### [[const user = await db.user.findUnique({ where: { email: Forgot.parse(req.body).email } });]]

من جوه لبرة: [[Forgot.parse(req.body)]] بيفحص ويرجّع object، و [[.email]] بياخد الإيميل منه، و [[findUnique]] بيدوّر.

### [[if (user) { ... }]]

لو موجود بس بنعمل التوكن. ولو مش موجود، بنكمّل لنفس الرد من غير ما نعمل حاجة.

### [[crypto.randomBytes(32).toString("base64url")]]

٢٥٦ bit عشوائي، ٤٣ حرف. بيتولّد من مصدر عشوائي آمن (CSPRNG) في نظام التشغيل، مش [[Math.random]] اللي ممكن يتوقّع.

### [[db.passwordReset.create({ data: { userId, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 30 * 60e3) } })]]

- [[sha256(token)]] الـ hash بس في القاعدة.
- [[60e3]] يعني 60000 ملّي = دقيقة، و [[30 * 60e3]] نص ساعة. [[Date.now()]] الوقت دلوقتي بالملّي.

### [[emailQueue.add("reset", { to, link: $__bt$__{config.WEB_ORIGIN}/reset?token=$__{token}$__bt })]]

اللينك بيروح لصفحة في **الواجهة** ([[WEB_ORIGIN]])، والتوكن الأصلي في الـ URL. ده الإيميل اللي اتطبع عندنا:

~~~text ترمنال السيرفر
EMAIL reset {"to":"ali@example.com","link":"http://localhost:5173/reset?token=<43 حرف>"}
~~~

والـ [[queue]] معناها إن الرد ميستناش مزوّد الإيميل.

### [[res.json({ data: { message: "لو الإيميل مسجّل، هيوصلك لينك خلال دقايق" } })]]

قارنّا إيميل موجود بإيميل مش موجود:

~~~text الناتج
HTTP/1.1 200 OK
Content-Length: 97
{"data":{"message":"لو الإيميل مسجّل، هيوصلك لينك خلال دقايق"}}

HTTP/1.1 200 OK
Content-Length: 97
{"data":{"message":"لو الإيميل مسجّل، هيوصلك لينك خلال دقايق"}}
~~~

نفس الـ status، ونفس الجسم، ونفس الطول. والوقت؟

~~~text الناتج (curl -w "%{time_total}")
exists 0.006787
nobody 0.003355
exists 0.006585
nobody 0.003163
~~~

الموجود أبطأ بحوالي ٣ ملّي، لأنه بيكتب صف في القاعدة. الفرق صغير وبيتوه في تذبذب الشبكة الحقيقية، بس موجود. لو كنا بنبعت الإيميل نفسه جوه الطلب (مئات الملّي لمزوّد خارجي)، الفرق كان هيبقى واضح جدًا. عشان كده الـ queue.

---

## ٢. [[/auth/reset]] سطر سطر

### [[const { token, password } = Reset.parse(req.body);]]

باسورد قصير بيقف هنا بـ 400 VALIDATION، قبل ما نلمس القاعدة.

### [[db.passwordReset.findUnique({ where: { tokenHash: sha256(token) } })]]

بندوّر بالـ hash بتاع التوكن اللي جه. نفس التوكن دايمًا بيطلع نفس الـ hash.

### [[if (!row || row.usedAt || row.expiresAt < new Date()) throw ... BAD_TOKEN]]

٣ أسباب للرفض، ونفس الرسالة للتلاتة: مش موجود، أو اتستخدم ([[usedAt]] فيه تاريخ)، أو خلص.

### [[await authService.resetPassword(row, password);]] (الـ solCode)

~~~text
const passwordHash = await argon2.hash(password);
await db.$transaction(async (t) => {
  const { count } = await t.passwordReset.updateMany({ where: { id: row.id, usedAt: null }, data: { usedAt: new Date() } });
  if (count === 0) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى، اطلب واحد جديد");
  await t.passwordReset.updateMany({ where: { userId: row.userId, usedAt: null }, data: { usedAt: new Date() } });
  await t.user.update({ where: { id: row.userId }, data: { passwordHash } });
  await t.session.updateMany({ where: { userId: row.userId, revokedAt: null }, data: { revokedAt: new Date() } });
});
~~~

- الـ hash **قبل** الـ transaction، عشان الـ transaction تفضل قصيرة (argon2 بياخد عشرات الملّي).
- [[db.$transaction(async (t) => { ... })]] transaction تفاعلية: [[t]] نسخة من الـ client كل اللي بيتعمل بيها جوه نفس الـ transaction. لو أي سطر رمى error، كله بيترجع (rollback).
- أول سطر بيحرق اللينك ده بشرط إنه لسه مش مستخدم. ليه؟ الـ [[findUnique]] في الـ route والكتابة هنا خطوتين، وطلبين بنفس اللينك ممكن يعدّوا الفحص الأول مع بعض. جرّبنا من غير السطر ده: طلبين في نفس اللحظة الاتنين رجعوا [[204]]، يعني باسوردين اتكتبوا ورا بعض. ومعاه (٣ محاولات):

~~~text الناتج
r1 204
{"error":{"code":"BAD_TOKEN",...}} r2 400
~~~

- بعده: باقي لينكات المستخدم المفتوحة تتعلّم مستخدمة، والـ hash الجديد، وإلغاء كل الـ sessions، فلو حد كان داخل بالباسورد القديم يطلع.

### [[res.status(204).end();]]

تمام ومفيش body.

---

## ٣. التجربة

~~~text الناتج
أول مرة باللينك:       HTTP/1.1 204 No Content
تاني مرة بنفس اللينك:  HTTP/1.1 400 Bad Request
{"error":{"code":"BAD_TOKEN","message":"اللينك انتهى، اطلب واحد جديد"}}
login بالباسورد الجديد: 200
~~~

وفي القاعدة بعدها:

~~~text الناتج من psql
 total | used
     4 |    4

 open_sessions | count
             1 |    10
~~~

كل اللينكات الأربعة اللي طلبناها في التجربة بقت مستخدمة، والـ session المفتوحة الوحيدة هي login الباسورد الجديد. وجرّبنا لينك عدّى عليه الوقت (غيّرنا [[expiresAt]] لدقيقة فاتت): [[BAD_TOKEN]] برضه.

---

## الخلاصة

| الحماية | فين |
|---|---|
| توكن مستحيل يتخمّن | [[randomBytes(32)]] |
| القاعدة لو اتسربت متنفعش | [[sha256(token)]] بس متخزن |
| بينتهي | [[expiresAt]] بعد ٣٠ دقيقة |
| مرة واحدة | [[usedAt]]، وكل لينكات المستخدم تتقفل مع بعض |
| محدش يعرف مين متسجّل | نفس الرد، والإيميل في queue |
| اللي كان داخل يطلع | إلغاء كل الـ sessions في نفس الـ transaction |`,
          lines: [
            "طلب لينك الاستعادة، وعليه rate limit عشان محدش يغرق إيميل حد برسايل.",
            "دوّر بالإيميل بعد الـ validation. الـ schema بيحوّله small.",
            "لو موجود بس...",
            "...اعمل توكن عشوائي، ٣٢ بايت...",
            "...وخزّن الـ hash بتاعه بس، وعمره ٣٠ دقيقة...",
            "...وحط إيميل فيه اللينك في الـ queue، عشان الرد ميستناش مزوّد الإيميل.",
            "قفلة.",
            "نفس الرد في الحالتين، عشان محدش يعرف مين متسجّل.",
            "قفلة.",
            "تغيير الباسورد باللينك.",
            "التوكن والباسورد الجديد، بعد validation.",
            "دوّر على التوكن بالـ hash.",
            "مش موجود، أو اتستخدم، أو خلص؟ ارفض.",
            "في transaction: الباسورد الجديد، وعلّم التوكن إنه اتستخدم، والغي كل الـ sessions.",
            "رد 204. والواجهة توديه صفحة الدخول.",
            "قفلة."
          ],
          sol: R`أول استخدام للينك يرجّع [[204]]، والباسورد الجديد يشتغل في الـ login. التاني بنفس اللينك يرجّع [[400]] و [[{"error":{"code":"BAD_TOKEN","message":"اللينك انتهى، اطلب واحد جديد"}}]]، لأن [[usedAt]] اتملى.

الطلب لإيميل موجود ولإيميل مش موجود لازم يرجعوا نفس الـ status (200)، ونفس الجسم حرف بحرف، ونفس الـ Content-Length: [[{"data":{"message":"لو الإيميل مسجّل، هيوصلك لينك خلال دقايق"}}]]. قارنهم بـ [[curl -si]] مش بعينك. ولو الإيميل الموجود أبطأ بشكل واضح، يبقى انت بتبعت الإيميل جوه الـ request بدل الـ queue، والوقت نفسه بيكشف مين متسجل.

والصح إن [[resetPassword]] يعمل كل حاجة في transaction واحدة: يحرق اللينك ده بـ [[updateMany]] بشرط [[usedAt: null]] (ولو count بـ 0 يرمي BAD_TOKEN)، ويعلّم على باقي لينكات المستخدم إنها اتستخدمت، ويحدّث الـ hash، ويلغي كل الـ sessions، عشان لو حد كان داخل بالباسورد القديم يخرج. من غير شرط الـ count، جرّبنا طلبين بنفس اللينك في نفس اللحظة والاتنين رجعوا 204.`,
          solCode: R`const authService = {
  async resetPassword(row, password) {
    const passwordHash = await argon2.hash(password);
    await db.$transaction(async (t) => {
      // احرق اللينك ده بشرط إنه لسه مش مستخدم: لو طلبين بنفس اللينك وصلوا مع بعض، واحد بس ياخد count بـ 1
      const { count } = await t.passwordReset.updateMany({ where: { id: row.id, usedAt: null }, data: { usedAt: new Date() } });
      if (count === 0) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى، اطلب واحد جديد");
      await t.passwordReset.updateMany({ where: { userId: row.userId, usedAt: null }, data: { usedAt: new Date() } });
      await t.user.update({ where: { id: row.userId }, data: { passwordHash } });
      await t.session.updateMany({ where: { userId: row.userId, revokedAt: null }, data: { revokedAt: new Date() } });
    });
  },
};

// المقارنة
// curl -si -H "Content-Type: application/json" -d '{"email":"ali@example.com"}' localhost:4000/auth/forgot
// curl -si -H "Content-Type: application/json" -d '{"email":"nobody@example.com"}' localhost:4000/auth/forgot`
        },
        {
          cmd: "OAuth",
          title: "الدخول بجوجل: أول خطوة (التحويل لجوجل)",
          desc: R`OAuth بيخلي جوجل هي اللي تتأكد من الشخص، وترجّعلك بـ code تبدّله بمعلوماته. اسم الفلو Authorization Code مع PKCE، ومعاه OpenID Connect (OIDC) اللي بيضيف [[id_token]]: توكن موقّع من جوجل فيه مين الشخص وإيميله.

الفلو كله خطوتين. الأولى هنا: بتودي المستخدم لجوجل ومعاه ٣ قيم عشوائية ([[state]] و [[nonce]] و PKCE verifier) محفوظين عندك في cookie. والتانية في الدرس اللي بعده (OAuth callback): جوجل بترجّعه لك بـ code، والسيرفر يبدّله بـ tokens، ويتحقق من الـ id_token، ويدخّله.

في الإنتاج ممكن تستخدم مكتبة (Auth.js، أو Better Auth، أو Supabase Auth، أو Arctic). بس الدرسين دول بيوروك الفلو كامل بالكود، فتقدر تشحن «ادخل بجوجل» شغال، وتفهم إيه اللي بيحصل ورا أي مكتبة.`,
          example: R`router.get("/auth/google", (req, res) => {
  const state = crypto.randomBytes(16).toString("base64url");
  const nonce = crypto.randomBytes(16).toString("base64url");
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
  res.cookie("oauth", JSON.stringify({ state, nonce, verifier }), { httpOnly: true, secure: true, sameSite: "lax", path: "/auth/google", maxAge: 600e3 });
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: config.GOOGLE_CLIENT_ID, redirect_uri: $__bt$__{config.API_ORIGIN}/auth/google/callback$__bt,
    response_type: "code", scope: "openid email profile", state, nonce,
    code_challenge: challenge, code_challenge_method: "S256",
  }).toString();
  res.redirect(url.toString());
});`,
          try: R`اعمل OAuth client في Google Cloud Console بنوع Web، وحط الـ redirect URI بتاع جهازك ([[http://localhost:4000/auth/google/callback]]). افتح [[/auth/google]] ووافق، وشوف الـ URL اللي رجعت عليه: هتلاقي فيه [[code]] و [[state]]. قارن الـ state باللي في الـ cookie [[oauth]] في DevTools. وبعدين افتح [[/auth/google]] مرتين في تابين، ووافق في التاب الأول بس: إيه اللي بيحصل للـ state؟`,
          flag: "script",
          deep: {
            why: "الدخول بجوجل بيشيل من المستخدم باسورد جديد، وبيشيل منك مسؤولية تخزينه. بس لو اتعمل غلط، أي حد يقدر يدخل على حساب حد تاني. ومعظم الثغرات بتبقى في الـ callback والربط بين الحسابات، مش في جوجل.",
            how: R`الـ [[state]] بيحمي من CSRF على الـ callback. من غيره، مهاجم يقدر يخلّيك تفتح callback بـ code بتاعه، فتلاقي نفسك داخل على حسابه، وأي حاجة تعملها (تحط كارت، ترفع ملف) تروح عنده. عشان كده بيتحط في cookie، ولما المستخدم يرجع لازم يبقى هو هو.

الـ [[nonce]] بيتحط جوه الـ id_token نفسه. جوجل بتاخده منك وترجّعه في الـ claims. في الـ callback بتقارنه باللي في الـ cookie، فلو حد حاول يعيد استخدام id_token قديم (replay) أو يحقن واحد من جلسة تانية، الـ nonce مش هيطابق.

الـ PKCE: السيرفر بيعمل [[verifier]] سري، ويبعت لجوجل الـ hash بتاعه بس (challenge). لما ييجي يبدّل الـ code بيبعت الـ verifier، وجوجل تتأكد إن الـ hash بتاعه هو هو. كده لو الـ code اتسرب في النص (لوج، أو extension، أو Referer)، ميتستخدمش من غير الـ verifier.

الـ cookie عليها [[path: "/auth/google"]] فمبتتبعتش غير للمسارين دول، وعمرها ١٠ دقايق بس. و [[sameSite: "lax"]] مهمة هنا: الرجوع من جوجل هو GET top-level navigation، و lax بتسمح للـ cookie تتبعت فيه. لو خليتها [[strict]] الـ cookie مش هتوصل للـ callback.

الـ [[scope]]: [[openid]] هو اللي بيخلي جوجل ترجّع id_token، و [[email profile]] بيضيفوا الإيميل والاسم والصورة. متطلبش صلاحيات زيادة (Drive، أو Calendar) غير لو الميزة محتاجاها فعلًا، لأن كل scope حساس بيحتاج مراجعة من جوجل وبيخوّف المستخدم في شاشة الموافقة.`,
            when: "لما يبقى الدخول السهل فارق في التسجيل. وغالبًا بيبقى Could في الـ MVP، مش Must. ولو بتضيفه، اضيف معاه الـ callback والربط كاملين من أول يوم.",
            mistakes: "إنك تتجاهل الـ state أو تقارنه بقيمة ثابتة. أو تحط الـ verifier في الـ URL بدل cookie. أو تنسى الـ nonce وتقبل أي id_token سليم التوقيع. أو تاخد الإيميل من الـ client وتصدّقه. أو تحط الـ client secret في تطبيق موبايل أو في الواجهة. أو redirect_uri مفتوح بياخد أي URL. وسؤال انترفيو مشهور: «state و nonce و PKCE كلهم عشوائي، ليه التلاتة؟» الإجابة: state ضد CSRF على الـ callback، و nonce بيربط الـ id_token بالجلسة دي، و PKCE بيحمي الـ code لو اتسرب."
          },
          teach: R`## الـ route ده بيعمل redirect بس

[[GET /auth/google]] مبيكلّمش جوجل. بيعمل ٣ قيم عشوائية، ويحطهم في cookie، ويبني URL صفحة الموافقة بتاعة جوجل، ويحوّل المتصفح عليها (302). جرّبناه على سيرفر Express 5 محلي (بورت 6017، ويندوز 11) بـ client id تجريبي، وفكّينا الـ redirect والـ cookie بسكربت Node. صفحة جوجل نفسها والموافقة محتاجين OAuth client حقيقي من Google Cloud Console، فالجزء ده من توثيق Google.

---

## ١. القيم العشوائية

~~~text
const state = crypto.randomBytes(16).toString("base64url");
const nonce = crypto.randomBytes(16).toString("base64url");
const verifier = crypto.randomBytes(32).toString("base64url");
~~~

١٦ byte بيبقوا ٢٢ حرف base64url، و ٣٢ byte بيبقوا ٤٣ حرف. ده اللي طلع عندنا:

~~~text الناتج
cookie keys: [ 'state', 'nonce', 'verifier' ] lens 22 22 43
~~~

| القيمة | بتروح لجوجل؟ | بتحمي من إيه |
|---|---|---|
| [[state]] | أيوه، وبترجع في الـ callback | CSRF: حد يخلّيك تفتح callback بـ code بتاعه |
| [[nonce]] | أيوه، وبترجع **جوه** الـ id_token | id_token قديم أو من جلسة تانية |
| [[verifier]] | لأ، الـ hash بتاعه بس | حد سرق الـ code في السكة |

والـ verifier لازم يبقى من ٤٣ لـ ١٢٨ حرف حسب RFC 7636 (معيار PKCE)، و ٣٢ byte بيدّوا ٤٣ بالظبط.

---

## ٢. [[const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");]]

ده PKCE (Proof Key for Code Exchange، بتتنطق «pixy»): بنبعت لجوجل [[sha256(verifier)]] بس. ولما نيجي نبدّل الـ code في الـ callback بنبعت الـ verifier نفسه، وجوجل تحسب الـ hash وتقارن. اللي سرق الـ code ومعهوش الـ verifier ميقدرش يبدّله، ومن الـ hash مينفعش يرجع للـ verifier.

اتأكدنا:

~~~text الناتج
challenge == sha256(verifier): true 43
verifier in URL? false
~~~

---

## ٣. [[res.cookie("oauth", JSON.stringify({ state, nonce, verifier }), { ... })]]

- [[JSON.stringify]] التلاتة في نص واحد، والـ callback يرجّعهم بـ [[JSON.parse]].
- [[path: "/auth/google"]] الـ cookie بتتبعت لـ [[/auth/google]] و [[/auth/google/callback]] بس.
- [[maxAge: 600e3]] يعني 600,000 ملّي = ١٠ دقايق.
- [[sameSite: "lax"]] لازم: الرجوع من جوجل GET عادي (top-level navigation)، و lax بتسمح بالـ cookie فيه. [[strict]] كانت هتمنعها.

~~~text الناتج
Set-Cookie: oauth=<..>; Max-Age=600; Path=/auth/google; Expires=...; HttpOnly; Secure; SameSite=Lax
~~~

---

## ٤. بناء الـ URL

~~~text
const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
url.search = new URLSearchParams({ ... }).toString();
~~~

- [[new URL(...)]] object للعنوان.
- [[new URLSearchParams({...})]] بيحوّل الـ object لـ [[key=value&key=value]]، وبيعمل encoding لأي رمز خاص لوحده ([[:]] بتبقى [[%3A]] والمسافة [[+]]).
- [[url.search = ...]] بيحط الكلام ده بعد [[?]].

ده الـ [[Location]] اللي رجع:

~~~text الناتج
HTTP/1.1 302 Found
Location: https://accounts.google.com/o/oauth2/v2/auth?client_id=test-client.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A6017%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=openid+email+profile&state=<..>&nonce=<..>&code_challenge=<..>&code_challenge_method=S256
~~~

| الـ parameter | القيمة | معناه |
|---|---|---|
| [[client_id]] | رقم التطبيق | من Google Cloud Console |
| [[redirect_uri]] | [[http://localhost:6017/auth/google/callback]] | لازم يطابق اللي متسجّل هناك حرف بحرف، وإلا [[redirect_uri_mismatch]] |
| [[response_type]] | [[code]] | عايزين code نبدّله من السيرفر (Authorization Code flow) |
| [[scope]] | [[openid email profile]] | [[openid]] = عايزين id_token، والباقي الإيميل والاسم والصورة |
| [[state]] و [[nonce]] | العشوائيين | طابقوا اللي في الـ cookie: [[state match: true  nonce match: true]] |
| [[code_challenge]] | الـ hash | PKCE |
| [[code_challenge_method]] | [[S256]] | الـ hash نوعه SHA-256 (البديل [[plain]] ضعيف) |

---

## ٥. [[res.redirect(url.toString());]]

[[302 Found]] ومعاه [[Location]]، فالمتصفح يروح لجوجل لوحده. هناك المستخدم يختار حسابه ويوافق، وجوجل ترجّعه على الـ [[redirect_uri]] ومعاه [[?code=...&state=...]] (الدرس الجاي).

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| ٣ قيم عشوائية | [[randomBytes]] |
| PKCE | [[challenge = sha256(verifier)]]، والـ verifier ميطلعش من السيرفر |
| حفظهم ١٠ دقايق | cookie [[HttpOnly]] و [[SameSite=Lax]] و [[Path=/auth/google]] |
| صفحة جوجل | [[URLSearchParams]] و [[res.redirect]] |

state ضد CSRF، و nonce بيربط الـ id_token بالجلسة، و PKCE بيحمي الـ code.`,
          lines: [
            "المسار اللي زرار «ادخل بجوجل» بيودّي عليه.",
            "state عشوائي ضد CSRF.",
            "nonce عشوائي، جوجل هترجّعه جوه الـ id_token.",
            "verifier سري، مبيروحش لجوجل غير وقت التبديل. ولحد وقتها بيستنى في cookie httpOnly، مش في الـ URL.",
            "الـ challenge هو sha256 للـ verifier. ده اللي بيروح لجوجل.",
            "خزّن التلاتة في cookie عمرها ١٠ دقايق، ومبتتبعتش غير لمسارات جوجل.",
            "عنوان صفحة الموافقة بتاعة جوجل.",
            "الـ parameters:",
            "رقم التطبيق عند جوجل، والمكان اللي هيرجع عليه (لازم يبقى متسجّل عندهم بالظبط).",
            "عايزين code، وصلاحيات الهوية والإيميل والاسم بس، والـ state والـ nonce.",
            "الـ challenge ونوعه.",
            "قفلة الـ parameters.",
            "ودّي المستخدم لجوجل.",
            "قفلة."
          ],
          sol: R`بعد الموافقة هترجع على [[/auth/google/callback?state=...&code=4/0A...&scope=email+profile+openid...]]. الـ [[state]] في الـ URL لازم يطابق حرف بحرف اللي جوه الـ cookie [[oauth]]. لو الـ callback لسه مش معمول هتشوف 404، وده طبيعي، المهم الـ URL.

لو فتحت [[/auth/google]] في تابين: التاب التاني بيكتب cookie جديدة فوق الأولى. فلو وافقت في التاب الأول، الـ state اللي راجع مش هيطابق الـ cookie، والـ callback الصح لازم يرفض (OAUTH_STATE). ده سلوك مقبول: المستخدم يضغط «ادخل بجوجل» تاني.

لو جوجل رجّعت [[redirect_uri_mismatch]] يبقى الـ URI في الكود مش مطابق حرف بحرف للي متسجل في الـ Console (http مقابل https، أو slash في الآخر، أو port مختلف).`
        },
        {
          cmd: "OAuth callback",
          title: "الدخول بجوجل: الـ callback والتحقق من الـ id_token",
          desc: R`الـ callback هو أهم جزء في «ادخل بجوجل». بيعمل ٥ حاجات بالترتيب: يقارن الـ state بالـ cookie، ويبدّل الـ code بـ tokens من [[https://oauth2.googleapis.com/token]]، ويتحقق من الـ [[id_token]] (توقيعه بمفاتيح جوجل العامة JWKS، و [[iss]] و [[aud]] و [[exp]])، ويقارن الـ [[nonce]]، ويتأكد إن [[email_verified]] بـ true. وبعدين بيدوّر على المستخدم أو يعمله، ويفتح session عادية زي الـ login.

التحقق بمكتبة [[jose]]: [[createRemoteJWKSet]] بتجيب مفاتيح جوجل وتكاشها، و [[jwtVerify]] بتتحقق من التوقيع والـ claims في سطر واحد.`,
          example: R`import { createRemoteJWKSet, jwtVerify } from "jose";

const GOOGLE_JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

router.get("/auth/google/callback", async (req, res) => {
  const saved = JSON.parse(req.cookies.oauth ?? "{}");
  res.clearCookie("oauth", { path: "/auth/google" });
  if (!req.query.code || !saved.state || req.query.state !== saved.state) throw new AppError(400, "OAUTH_STATE", "ابدأ الدخول بجوجل من الأول");
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams({
    grant_type: "authorization_code", code: String(req.query.code), code_verifier: saved.verifier,
    client_id: config.GOOGLE_CLIENT_ID, client_secret: config.GOOGLE_CLIENT_SECRET, redirect_uri: $__bt$__{config.API_ORIGIN}/auth/google/callback$__bt,
  }) });
  if (!r.ok) throw new AppError(401, "OAUTH_EXCHANGE", "جوجل رفضت الكود، جرّب تاني");
  const { id_token } = await r.json();
  const { payload } = await jwtVerify(id_token, GOOGLE_JWKS, { issuer: ["https://accounts.google.com", "accounts.google.com"], audience: config.GOOGLE_CLIENT_ID })
    .catch(() => { throw new AppError(401, "OAUTH_TOKEN", "مش قادرين نتأكد من جوجل"); });
  if (payload.nonce !== saved.nonce) throw new AppError(401, "OAUTH_NONCE", "ابدأ الدخول بجوجل من الأول");
  if (payload.email_verified !== true) throw new AppError(403, "EMAIL_NOT_VERIFIED", "أكّد إيميلك عند جوجل الأول");
  const user = await linkOrCreate("google", payload);
  await createSession(res, user);
  res.redirect($__bt$__{config.WEB_ORIGIN}/courses$__bt);
});`,
          try: R`كمّل الدرس اللي فات: ادخل بجوجل لحد ما توصل لـ [[/courses]] وتلاقي cookie [[rt]]. بعدين اختبر الرفض من غير جوجل: اعمل مفتاح RSA بـ [[generateKeyPair("RS256")]] من jose، وسيرفر صغير بيقدّم JWKS، ووقّع id_tokens بـ [[SignJWT]]: واحد aud بتاعه غلط، وواحد منتهي، وواحد متوقّع بمفتاح تاني، وواحد nonce بتاعه غلط، وواحد [[email_verified: false]]. لكل واحد اكتب الكود اللي المفروض يرجع.`,
          flag: "script",
          deep: {
            why: "الـ id_token هو الدليل الوحيد إن جوجل هي اللي قالت «ده فلان». لو قريته من غير ما تتحقق (jwt.decode)، أي حد يقدر يكتب JSON فيه إيميلك ويدخل على حسابك. ولو اتحققت من التوقيع بس من غير aud، أي id_token طالع لتطبيق تاني خالص (موقع مهاجم عامل «ادخل بجوجل») يدخل عندك.",
            how: R`[[createRemoteJWKSet]] بتعمل resolver: أول مرة بتجيب مفاتيح جوجل العامة من الـ URL، وبتكاشها (١٠ دقايق افتراضيًا). كل id_token فيه [[kid]] في الـ header بيقول اتوقّع بأنهي مفتاح. جوجل بتغيّر مفاتيحها كل فترة (key rotation)، فلو جه kid مش في الكاش، المكتبة بتجيب المفاتيح تاني لوحدها، مع cooldown ٣٠ ثانية عشان محدش يغرقك بطلبات. عشان كده الـ resolver بيتعمل مرة واحدة برّه الـ route، مش مع كل طلب.

[[jwtVerify]] بتعمل ٤ فحوصات: التوقيع (RS256) بالمفتاح الصح، و [[iss]] (جوجل بتستخدم الشكلين، بـ https ومن غيرها، فبنقبل الاتنين)، و [[aud]] لازم يبقى الـ client id بتاعك بالظبط، و [[exp]] مخلصش. أي فحص يفشل بيرمي error، واحنا بنحوّله 401 من غير ما نفضح السبب للمستخدم.

الـ nonce: قيمته في الـ id_token لازم تساوي اللي في الـ cookie. كده الـ id_token ده اتعمل للجلسة دي بالذات.

[[email_verified]]: جوجل بترجّعه true لحسابات Gmail، ولحسابات Workspace. بس لو حد عمل حساب جوجل بإيميل Yahoo مثلًا ومأكدوش، هيبقى false. لو قبلته، حد يقدر يعمل حساب جوجل بإيميلك انت ويدخل على حسابك عندك.

الـ [[sub]] هو رقم الشخص عند جوجل، وده اللي بتربط بيه، مش الإيميل. الإيميل ممكن يتغيّر، والـ sub ثابت للأبد.

[[createSession]] هي نفس جزء الـ session والـ cookie من الـ login، من غير الـ JSON. بعد الـ redirect، الواجهة بتعمل أول طلب، ترجع 401، و [[apiFetch]] بتعمل refresh من الـ cookie وتاخد access token. يعني مفيش أي توكن بيعدّي في الـ URL.

والـ refresh_token بتاع جوجل: مش محتاجه طالما انت بتستخدم جوجل للدخول بس. محتاجه لو هتكلّم Google APIs نيابة عن المستخدم، وساعتها بيتطلب بـ [[access_type=offline]] ويتخزن مشفّر.`,
            when: "مع أي «ادخل بـ ...» (جوجل، أو Apple، أو Microsoft، أو GitHub). الخطوات هي هي في كل مزوّد OIDC، اللي بيتغير الـ URLs والـ issuer. GitHub مش OIDC للدخول العادي، فمفيش id_token، وبتجيب الإيميل من [[/user/emails]] وتبص على [[verified]].",
            mistakes: R`[[jwt.decode]] بدل verify. أو verify من غير [[audience]]. أو تثق في [[email]] من غير [[email_verified]]. أو تربط بالإيميل بدل الـ sub. أو تعمل [[createRemoteJWKSet]] جوه الـ route فتجيب المفاتيح مع كل دخول. أو تحط الـ access token بتاعك في الـ redirect URL ([[/courses?token=...]])، فيتسجل في التاريخ واللوجات. أو تنسى [[clearCookie]] بنفس الـ path فالـ cookie القديمة تفضل. وفي الانترفيو: «إيه الفرق بين access_token و id_token بتوع جوجل؟» الـ id_token ليك انت (مين الشخص)، والـ access_token لـ Google APIs (يعمل إيه)، ومتستخدمش الـ access_token كإثبات هوية.`
          },
          teach: R`## ٥ فحوصات بالترتيب، وبعدين session

جوجل بترجّع المستخدم على [[/auth/google/callback?code=...&state=...]]. الـ route بيقارن الـ state، ويبدّل الـ code بـ tokens من سيرفر لسيرفر، ويتحقق من الـ id_token، ويقارن الـ nonce، ويتأكد من [[email_verified]]. وبعدين يلاقي المستخدم أو يعمله، ويفتح session.

جرّبناه من غير جوجل، بالظبط زي ما الـ solCode بيقول: سيرفر محلي (بورت 6018) بيقدّم [[/certs]] (مفتاح RSA عام عملناه بـ jose) و [[/token]] (بيرجّع id_token إحنا موقّعينه)، وغيّرنا في الـ config رابط الـ token والـ JWKS بس يشاوروا عليه بدل جوجل. الباقي هو كود الدرس زي ما هو، على Express 5 و jose 6 و Prisma 7 و PostgreSQL 18 (ويندوز 11، Node 24). الاتصال بجوجل الحقيقي من توثيق Google.

---

## ١. [[createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"))]]

JWKS اختصار JSON Web Key Set: ملف JSON فيه المفاتيح **العامة** اللي جوجل بتتحقق بيها من توقيعها. [[createRemoteJWKSet]] بترجّع دالة (resolver) بتجيب الملف أول مرة وتكاشه، وتختار المفتاح بالـ [[kid]] اللي في header التوكن. بتتعمل مرة واحدة برّه الـ route.

---

## ٢. الـ state

~~~text
const saved = JSON.parse(req.cookies.oauth ?? "{}");
res.clearCookie("oauth", { path: "/auth/google" });
if (!req.query.code || !saved.state || req.query.state !== saved.state) throw new AppError(400, "OAUTH_STATE", ...);
~~~

- [[req.cookies.oauth ?? "{}"]] لو مفيش cookie، [[JSON.parse("{}")]] بيدّي object فاضي بدل ما يرمي.
- [[clearCookie]] على طول، بنفس الـ path: الـ cookie تنفع مرة واحدة. في الرد الناجح ظهرت [[oauth=]] فاضية في الـ Set-Cookie.
- [[!saved.state]] مهمة: من غيرها، لو الاتنين [[undefined]] ([[undefined !== undefined]] بـ false) الفحص يعدّي.

بعتنا state غلط:

~~~text الناتج
state wrong          400 OAUTH_STATE
~~~

---

## ٣. تبديل الـ code: [[fetch("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams({...}) })]]

طلب من سيرفرنا لسيرفر جوجل مباشرة، المتصفح مش فيه. [[URLSearchParams]] كـ body بيتبعت [[application/x-www-form-urlencoded]]، وده الشكل اللي جوجل مستنياه. السيرفر المزيف طبع اللي وصله:

~~~text ترمنال السيرفر المزيف
TOKEN REQ grant_type=authorization_code&code=4%2F0Afake&code_verifier=<..>&client_id=test-client.apps.googleusercontent.com&client_secret=test-secret&redirect_uri=http%3A%2F%2Flocalhost%3A6017%2Fauth%2Fgoogle%2Fcallback
~~~

| الحقل | ليه |
|---|---|
| [[grant_type=authorization_code]] | نوع التبديل: code مقابل tokens |
| [[code]] | اللي جه في الـ URL |
| [[code_verifier]] | PKCE: الأصل اللي الـ challenge اتعمل منه |
| [[client_id]] و [[client_secret]] | إثبات إن ده تطبيقنا. الـ secret على السيرفر بس |
| [[redirect_uri]] | لازم نفس اللي في الخطوة الأولى بالظبط |

و [[if (!r.ok) throw ... OAUTH_EXCHANGE]]: جوجل بترفض لو الـ code استُخدم قبل كده، أو خلص (دقايق)، أو الـ verifier غلط.

---

## ٤. [[jwtVerify(id_token, GOOGLE_JWKS, { issuer: [...], audience })]]

بتعمل ٤ فحوصات مرة واحدة، وأي واحد يفشل بيرمي error بكود. [[.catch]] بيحوّل أي فشل لـ 401 [[OAUTH_TOKEN]] من غير ما نقول السبب للمستخدم. طبعنا الكود الداخلي في اللوج:

| التوكن المزيف | الرد | كود jose في اللوج |
|---|---|---|
| [[aud]] تطبيق تاني | 401 OAUTH_TOKEN | [[ERR_JWT_CLAIM_VALIDATION_FAILED]] |
| [[exp]] من دقيقة | 401 OAUTH_TOKEN | [[ERR_JWT_EXPIRED]] |
| متوقّع بمفتاح RSA تاني | 401 OAUTH_TOKEN | [[ERR_JWS_SIGNATURE_VERIFICATION_FAILED]] |

- [[issuer]] array لأن جوجل بتكتب [[iss]] بشكلين: [[https://accounts.google.com]] و [[accounts.google.com]].
- [[audience]] لازم يساوي الـ client id بتاعنا. من غيره، id_token معمول لأي تطبيق تاني فيه «ادخل بجوجل» (حتى موقع مهاجم) يعدّي عندنا.
- [[{ payload }]] destructuring: الـ claims بعد التحقق.

---

## ٥. [[payload.nonce !== saved.nonce]] و [[payload.email_verified !== true]]

~~~text الناتج
nonce wrong          401 OAUTH_NONCE
email not verified   403 EMAIL_NOT_VERIFIED
~~~

- الـ nonce اللي جوه التوكن لازم يساوي اللي في الـ cookie: التوكن ده اتعمل للجلسة دي.
- [[!== true]] مش [[!payload.email_verified]]: أي قيمة غير [[true]] بالظبط (حتى النص [["true"]]) بترفض.

---

## ٦. النجاح

~~~text
const user = await linkOrCreate("google", payload);
await createSession(res, user);
res.redirect($__bt$__{config.WEB_ORIGIN}/courses$__bt);
~~~

~~~text الناتج
valid                302 http://localhost:5173/courses | oauth=, rt=<..>
same user again      302 http://localhost:5173/courses | oauth=, rt=<..>
~~~

- [[linkOrCreate]] (الدرس الجاي) بيدوّر بالـ [[sub]]. أول مرة عمل مستخدم [[mona@gmail.com]] من غير باسورد وإيميله متأكد، والمرة التانية لقاه.
- [[createSession]] نفس session الـ login: صف في القاعدة و cookie [[rt]].
- الـ redirect للواجهة **من غير** أي توكن في الـ URL. أول طلب هناك هيرجع 401، و [[apiFetch]] تعمل refresh من الـ cookie.

---

## الخلاصة

| الفحص | الكود لو فشل |
|---|---|
| state + code موجودين ومتطابقين | 400 OAUTH_STATE |
| جوجل قبلت الـ code | 401 OAUTH_EXCHANGE |
| التوقيع و iss و aud و exp | 401 OAUTH_TOKEN |
| nonce | 401 OAUTH_NONCE |
| [[email_verified === true]] | 403 EMAIL_NOT_VERIFIED |
| كله تمام | 302 للواجهة + cookie [[rt]] |

[[jwtVerify]] مش [[decodeJwt]]، ومعاها [[audience]] دايمًا.`,
          lines: [
            "مكتبة jose للتحقق من الـ JWT.",
            "مفاتيح جوجل العامة. الـ resolver بيكاشها ويجيبها تاني لو جوجل غيّرتها.",
            "الـ callback اللي جوجل بترجّع عليه.",
            "اقرا الـ state والـ nonce والـ verifier من الـ cookie.",
            "امسحها على طول بنفس الـ path. هي تنفع مرة واحدة.",
            "مفيش code، أو الـ state مش هو؟ ارفض. ده الـ CSRF.",
            "بدّل الـ code بـ tokens من سيرفر لسيرفر:",
            "الـ code، والـ verifier بتاع PKCE...",
            "...والـ client secret (على السيرفر بس)، ونفس الـ redirect_uri بالظبط.",
            "قفلة الطلب.",
            "جوجل رفضت (الـ code مستخدم قبل كده أو خلص)؟ ارفض.",
            "خد الـ id_token من الرد.",
            "اتحقق من التوقيع والـ issuer والـ audience والانتهاء مرة واحدة...",
            "...وأي فشل يبقى 401 بكود ثابت.",
            "الـ nonce لازم يطابق اللي بعتناه.",
            "الإيميل لازم يكون متأكد عند جوجل.",
            "دوّر على المستخدم بالـ sub أو اعمله (الدرس الجاي).",
            "افتح session: refresh token في cookie، زي الـ login.",
            "رجّعه للواجهة. أول طلب هناك هيعمل refresh وياخد access token.",
            "قفلة."
          ],
          sol: R`النتايج المتوقعة لكل id_token مزيف: aud غلط، أو منتهي، أو متوقّع بمفتاح تاني، التلاتة بيرجعوا [[401 OAUTH_TOKEN]]. الـ nonce الغلط بيرجع [[401 OAUTH_NONCE]]. و [[email_verified: false]] بيرجع [[403 EMAIL_NOT_VERIFIED]]. والسليم بيرجع 302 على [[/courses]] ومعاه [[Set-Cookie: rt=...]].

عشان تختبر من غير جوجل، خلي عنوان الـ token والـ JWKS في config، وفي الاختبار شاورهم على سيرفر محلي. الـ solCode تحت هو السيرفر المزيف وتوقيع التوكن.

الغلطة الشائعة: تلاقي المزيف بمفتاح تاني بيعدّي. ده معناه إنك بتستخدم [[decodeJwt]] أو [[jwt.decode]] مش [[jwtVerify]]. ولو الـ aud الغلط عدّى، يبقى نسيت [[audience]] في الـ options.`,
          solCode: R`import http from "node:http";
import { generateKeyPair, exportJWK, SignJWT } from "jose";

const { publicKey, privateKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "k1", alg: "RS256", use: "sig" };
let nextIdToken = "";
http.createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  if (req.url === "/certs") return res.end(JSON.stringify({ keys: [jwk] }));
  if (req.url === "/token") return res.end(JSON.stringify({ id_token: nextIdToken }));
  res.statusCode = 404; res.end();
}).listen(9999);

export async function fakeIdToken(claims = {}, key = privateKey) {
  nextIdToken = await new SignJWT({ email: "mona@gmail.com", email_verified: true, nonce: claims.nonce, ...claims })
    .setProtectedHeader({ alg: "RS256", kid: "k1" })
    .setIssuer("https://accounts.google.com")
    .setAudience(claims.aud ?? config.GOOGLE_CLIENT_ID)
    .setSubject(claims.sub ?? "g-111")
    .setIssuedAt()
    .setExpirationTime(claims.exp ?? "1h")
    .sign(key);
}`
        },
        {
          cmd: "ربط الحسابات",
          title: "جدول accounts: نفس الشخص بباسورد وبجوجل",
          desc: R`المستخدم ممكن يدخل بأكتر من طريقة: باسورد، وجوجل، و Apple. عشان كده طرق الدخول بتتخزن في جدول [[accounts]] لوحده، مش في جدول users. كل صف فيه [[(provider, providerAccountId)]] و [[userId]]، والمفتاح الأساسي هو الاتنين الأولانيين مع بعض.

[[linkOrCreate]] بتدوّر بالـ [[sub]] الأول. لو لقته، يبقى نفس المستخدم. لو ملقتهوش، بتدوّر بالإيميل: لو فيه مستخدم بالإيميل ده وإيميله متأكد، بتربط جوجل بيه. ولو مش متأكد، بترفض وتطلب منه يدخل بالباسورد ويربط من الإعدادات. ولو مفيش، بتعمل مستخدم جديد إيميله متأكد، ومن غير باسورد.`,
          example: R`model Account {
  provider          String
  providerAccountId String
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt         DateTime @default(now())
  @@id([provider, providerAccountId])
  @@index([userId])
}

export async function linkOrCreate(provider, p) {
  return db.$transaction(async (t) => {
    const acc = await t.account.findUnique({ where: { provider_providerAccountId: { provider, providerAccountId: p.sub } }, include: { user: true } });
    if (acc) return acc.user;
    const email = p.email.toLowerCase();
    const existing = await t.user.findUnique({ where: { email } });
    if (existing && !existing.emailVerifiedAt) throw new AppError(409, "LINK_NEEDS_LOGIN", "فيه حساب بالإيميل ده. ادخل بالباسورد واربط جوجل من الإعدادات");
    const user = existing ?? (await t.user.create({ data: { email, name: p.name ?? email, emailVerifiedAt: new Date() } }));
    await t.account.create({ data: { provider, providerAccountId: p.sub, userId: user.id } });
    return user;
  });
}`,
          try: R`جرّب ٤ سيناريوهات: (١) أول دخول بجوجل بإيميل جديد، (٢) نفس الشخص تاني، (٣) مستخدم عمل حساب بباسورد بنفس إيميل جوجل ومأكدش إيميله، (٤) نفس الحالة بعد ما أكّد. بعد كل واحد عد الصفوف في users و accounts. وبعدين اكتب endpoint [[POST /me/accounts/google]] للربط من الإعدادات: المستخدم داخل بالفعل، ويعدّي على نفس فلو جوجل.`,
          flag: "script",
          deep: {
            why: "من غير جدول accounts، الناس بتعمل حسابين لنفس الشخص (واحد بالباسورد وواحد بجوجل)، وكورساته تتقسم بينهم. ومن غير قواعد ربط صح، الربط نفسه بيبقى ثغرة استيلاء على حسابات (account takeover).",
            how: R`الفخ اللي الكود ده بيقفله اسمه pre-account takeover. مهاجم بيعمل حساب بباسورد بإيميلك قبل ما انت تسجّل، ومبيأكدوش (معندوش إيميلك). بعدين انت بتيجي تدخل بجوجل بنفس الإيميل. لو السيستم ربط جوجل بالحساب الموجود أوتوماتيك، انت بقيت بتستخدم حساب المهاجم عارف الباسورد بتاعه، وكل حاجة تشتريها أو ترفعها هو شايفها. عشان كده الربط بالإيميل بيحصل بس لو الحساب الموجود إيميله متأكد، وإلا الرد 409 ويدخل بالباسورد الأول.

والعكس: مستخدم دخل بجوجل ومعندوش باسورد ([[passwordHash]] بـ null)، وبعدين عايز يدخل بالإيميل والباسورد. هنا «نسيت الباسورد» هي اللي بتعمله باسورد، لأنها بتثبت إنه صاحب الإيميل. والـ login لازم يتعامل مع [[passwordHash]] بـ null (الـ DUMMY_HASH بيغطيها).

الـ transaction بتمنع سباق: لو طلبين callback لنفس الشخص وصلوا مع بعض، التاني هيخبط في الـ primary key ([[P2002]]) بدل ما يعمل مستخدمين. وال error handler بيحوّلها 409، والمستخدم يعيد.

فك الربط ([[DELETE /me/accounts/google]]): ممنوع لو دي آخر طريقة دخول عنده (مفيش باسورد ولا provider تاني)، وإلا الحساب يتقفل عليه. واعمله بـ step-up auth، واتبعت إيميل.

الإيميل في users هو إيميل التواصل، والـ sub في accounts هو الهوية. لو المستخدم غيّر إيميله عند جوجل، الدخول لسه شغال بالـ sub، ومش لازم تغيّر إيميله عندك.`,
            when: "أول ما يبقى عندك أكتر من طريقة دخول. حتى لو جوجل بس دلوقتي، اعمل الجدول من الأول، عشان Apple مطلوبة في iOS لو فيه دخول بطرف تالت.",
            mistakes: R`عمود [[googleId]] في جدول users، وبعدين [[appleId]] و [[githubId]]. أو ربط أوتوماتيك بالإيميل من غير ما تتأكد إنه متأكد في الناحيتين. أو [[provider]] بحروف مختلفة ([[Google]] و [[google]]) فيتعمل حسابين. أو تسمح بفك آخر طريقة دخول. وفي الانترفيو: «إيه هو pre-account takeover وإزاي تمنعه؟» بالظبط الحالة اللي فوق.`
          },
          teach: R`## جدول لطرق الدخول، ودالة بتقرر

المثال حتتين: model [[Account]] (كل صف = طريقة دخول لمستخدم)، ودالة [[linkOrCreate]] اللي الـ callback بيناديها بعد ما يتحقق من الـ id_token. جرّبنا الـ model بـ migration على PostgreSQL 18، والدالة بسكربت [[tsx]] بينادي عليها بـ ٤ سيناريوهات وبعدين سباق (Prisma 7.10، ويندوز 11). قبل التجربة كان فيه مستخدمين اتنين وحساب جوجل واحد من درس الـ callback.

---

## ١. [[model Account]]

| السطر | معناه |
|---|---|
| [[provider String]] | [["google"]] أو [["apple"]]... دايمًا small، وإلا [[Google]] و [[google]] يبقوا اتنين |
| [[providerAccountId String]] | الـ [[sub]] من المزوّد: ثابت حتى لو الإيميل اتغيّر |
| [[userId String]] | صاحبه عندنا |
| [[@relation(..., onDelete: Cascade)]] | لو المستخدم اتمسح، طرق دخوله تتمسح معاه |
| [[@@id([provider, providerAccountId])]] | primary key من عمودين: نفس الـ sub عند نفس المزوّد مرة واحدة بس |
| [[@@index([userId])]] | «هات طرق دخول المستخدم ده» بسرعة (صفحة الإعدادات) |

مفيش [[id]] منفصل: الاتنين مع بعض هما الهوية. Prisma بيسمّي المفتاح ده [[provider_providerAccountId]] (الاسمين بـ [[_]] بينهم)، وده اللي بتستخدمه في [[findUnique]].

---

## ٢. [[db.$transaction(async (t) => { ... })]]

كل القراية والكتابة جوه transaction واحدة، و [[t]] هو الـ client بتاعها. لو أي سطر رمى، مفيش حاجة بتتكتب.

---

## ٣. خطوة خطوة جوه الدالة

### [[t.account.findUnique({ where: { provider_providerAccountId: { provider, providerAccountId: p.sub } }, include: { user: true } })]]

دوّر بالـ sub الأول. ولو لقيته ([[if (acc) return acc.user;]]) خلاص، ده هو، حتى لو إيميله عند جوجل اتغيّر.

### [[const email = p.email.toLowerCase();]] و [[t.user.findUnique({ where: { email } })]]

مفيش حساب جوجل بالـ sub ده. هل فيه مستخدم عندنا بنفس الإيميل؟

### [[if (existing && !existing.emailVerifiedAt) throw ... LINK_NEEDS_LOGIN]]

فيه مستخدم، بس إيميله **مش متأكد**. ممكن يكون مهاجم عمل الحساب بإيميلك قبلك (pre-account takeover). فمنربطش.

### [[const user = existing ?? (await t.user.create({ ... }))]]

[[??]]: لو فيه [[existing]] (ومتأكد، لأننا عدّينا السطر اللي فوق) استخدمه. لو لأ، اعمل مستخدم جديد: [[emailVerifiedAt: new Date()]] لأن جوجل أكدت الإيميل، ومفيش [[passwordHash]] (العمود بقى [[String?]] اختياري). و [[p.name ?? email]] لو جوجل مبعتتش اسم، استخدم الإيميل.

### [[t.account.create({ data: { provider, providerAccountId: p.sub, userId: user.id } })]]

سجّل طريقة الدخول دي للمستخدم ده.

---

## ٤. التجربة: ٤ سيناريوهات

~~~text الناتج
start                        users=2 accounts=1
(1) first google login       ok new@gmail.com | users=3 accounts=2
(2) same person again        ok new@gmail.com | users=3 accounts=2
(3) unverified password acc  409 LINK_NEEDS_LOGIN | users=4 accounts=2
(4) after verifying          ok sara@example.com | users=4 accounts=3
~~~

1. sub جديد وإيميل جديد ([[New@Gmail.com]] اتخزن small): مستخدم جديد وحساب جديد.
2. نفس الـ sub: لقاه في أول خطوة، ومفيش ولا صف جديد.
3. قبلها عملنا [[sara@example.com]] بباسورد من غير تأكيد (users بقوا ٤)، وجه دخول جوجل بنفس الإيميل: رفض 409، ومفيش account اتعمل.
4. علّمنا إيميل سارة متأكد، ونفس الدخول: account جديد مربوط بسارة القديمة، ومفيش user جديد.

---

## ٥. السباق

٥ callbacks لنفس الشخص الجديد في نفس اللحظة (كررناها ٣ مرات):

~~~text الناتج
race 0 ok, P2002, P2002, P2002, P2002 | users with that email: 1
race 1 ok, P2002, P2002, P2002, P2002 | users with that email: 1
race 2 ok, P2002, P2002, P2002, P2002 | users with that email: 1
~~~

الخمسة عدّوا الـ [[findUnique]] مع بعض (لسه محدش كتب)، وكلهم حاولوا [[user.create]]. القيد [[@unique]] على الإيميل سمح لواحد بس، والباقيين خدوا [[P2002]] واترجعت الـ transaction بتاعتهم كلها. والـ errorHandler بيحوّل [[P2002]] لـ 409، والمستخدم يضغط تاني فيلاقيه. مستخدم واحد في الآخر، مش خمسة. (لما جربنا اتنين بس، مرة اتنفذوا ورا بعض والاتنين رجعوا ok لنفس المستخدم، وده سليم برضه.)

---

## الخلاصة

| الحالة | النتيجة |
|---|---|
| الـ sub معروف | نفس المستخدم |
| sub جديد، ومفيش حد بالإيميل | مستخدم جديد إيميله متأكد ومن غير باسورد |
| sub جديد، والإيميل لحساب متأكد | ربط بالحساب ده |
| sub جديد، والإيميل لحساب مش متأكد | 409 LINK_NEEDS_LOGIN |
| طلبات متزامنة | واحد ينجح، والباقي P2002 = 409 |

الهوية هي [[(provider, sub)]]، والإيميل للتواصل بس. والربط بالإيميل بس لو متأكد في الناحيتين.`,
          lines: [
            "جدول طرق الدخول.",
            "اسم المزوّد: google أو apple...",
            "رقم الشخص عند المزوّد (الـ sub). ثابت حتى لو إيميله اتغيّر.",
            "صاحب الحساب عندنا.",
            "العلاقة، ولو المستخدم اتمسح طرق دخوله تتمسح.",
            "إمتى اتربط.",
            "المفتاح الأساسي: نفس الـ sub عند نفس المزوّد مرة واحدة بس.",
            "index عشان تجيب طرق دخول مستخدم بسرعة.",
            "قفلة.",
            "الدالة اللي الـ callback بيناديها بعد التحقق.",
            "كله في transaction واحدة.",
            "دوّر بالـ sub الأول.",
            "لقيته؟ ده هو.",
            "مفيش؟ خد الإيميل small.",
            "فيه حساب بالإيميل ده؟",
            "لو إيميله مش متأكد، متربطش. ده بيمنع الاستيلاء على الحساب.",
            "استخدم الموجود (متأكد)، أو اعمل جديد إيميله متأكد (جوجل أكدته) ومن غير باسورد.",
            "سجّل طريقة الدخول دي.",
            "رجّع المستخدم.",
            "قفلة الـ transaction.",
            "قفلة."
          ],
          sol: R`العدد المتوقع بعد كل سيناريو: (١) user واحد جديد و account واحد، و [[emailVerifiedAt]] متعبي و [[passwordHash]] بـ null. (٢) مفيش أي صف جديد، ونفس الـ user. (٣) الرد [[409 LINK_NEEDS_LOGIN]] ومفيش account جديد. (٤) account جديد مربوط بالـ user القديم، ومفيش user جديد.

endpoint الربط من الإعدادات: بيحط [[linkUserId]] في الـ cookie بتاعة OAuth مع الـ state، والـ callback لو لقى [[linkUserId]] بيعمل [[account.create]] للمستخدم ده مباشرة بدل [[linkOrCreate]]. ولو الـ sub مربوط بمستخدم تاني، يرجع 409 ومينقلوش. وده لازم يعدّي على step-up auth.

الغلطة الشائعة في (٣): الكود يربط ويكمّل، فالمهاجم اللي عمل الحساب الأول يفضل عارف الباسورد.`
        }
      ]
    },
    {
      t: "أمان الحساب",
      l: 2,
      n: "تأكيد الإيميل، و 2FA بـ TOTP و recovery codes، و step-up auth، وتغيير الإيميل والباسورد، و CAPTCHA و lockout، و passkeys",
      items: [
        {
          cmd: "تأكيد الإيميل",
          title: "لينك تأكيد الإيميل: بينتهي، ويتبعت تاني بحد",
          desc: R`تأكيد الإيميل نفس فكرة «نسيت الباسورد»: token عشوائي، ومتخزن الـ hash بتاعه بس، وليه مدة (٢٤ ساعة هنا). الفرق في ٣ حاجات: الصف بيحفظ الإيميل اللي اتبعت له اللينك، وإعادة الإرسال ليها حد (٣ في الساعة)، والتأكيد بيحصل بـ POST مش بمجرد فتح اللينك.

جدول واحد [[EmailToken]] بعمود [[purpose]] بيخدم التأكيد وتغيير الإيميل. والمستخدم يقدر يدخل قبل ما يأكد، بس الحاجات المهمة (الشراء، أو دعوة ناس، أو ربط حساب) بتستنى [[emailVerifiedAt]].`,
          example: R`router.post("/auth/verify-email/send", requireAuth, async (req, res) => {
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (user.emailVerifiedAt) return res.status(204).end();
  const recent = await db.emailToken.count({ where: { userId: user.id, purpose: "VERIFY", createdAt: { gt: new Date(Date.now() - 3600e3) } } });
  if (recent >= 3) throw new AppError(429, "TOO_MANY_EMAILS", "بعتنالك كذا إيميل. استنى ساعة وجرّب تاني");
  const token = crypto.randomBytes(32).toString("base64url");
  await db.emailToken.create({ data: { userId: user.id, purpose: "VERIFY", email: user.email, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 24 * 3600e3) } });
  await emailQueue.add("verify-email", { to: user.email, link: $__bt$__{config.WEB_ORIGIN}/verify-email?token=$__{token}$__bt });
  res.status(202).end();
});
router.post("/auth/verify-email", async (req, res) => {
  const row = await db.emailToken.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } });
  if (!row || row.purpose !== "VERIFY" || row.usedAt || row.expiresAt < new Date()) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى، اطلب واحد جديد");
  const [, { count }] = await db.$transaction([
    db.emailToken.updateMany({ where: { userId: row.userId, purpose: "VERIFY", usedAt: null }, data: { usedAt: new Date() } }),
    db.user.updateMany({ where: { id: row.userId, email: row.email }, data: { emailVerifiedAt: new Date() } }),
  ]);
  if (count === 0) throw new AppError(400, "EMAIL_CHANGED", "الإيميل اتغير بعد اللينك ده");
  res.status(204).end();
});`,
          try: R`اطلب لينك التأكيد ٤ مرات ورا بعض: الرابع لازم يرجع 429. بعدين أكّد بأول لينك، وجرّب تاني لينك بعده. وآخر تجربة: اطلب لينك، وغيّر إيميل المستخدم في القاعدة بإيدك، وافتح اللينك القديم.`,
          flag: "script",
          deep: {
            why: "من غير تأكيد، أي حد يسجّل بإيميل مش بتاعه: يبعت منه دعوات، أو يربطه بحساب جوجل (الدرس «ربط الحسابات»)، أو إيميلاتك تروح لحد تاني وتبوظ سمعة الدومين عند مزوّد الإيميل. ومن غير حد لإعادة الإرسال، زرار «ابعت تاني» بيبقى أداة spam مجانية بإسمك.",
            how: R`عمود [[email]] في صف التوكن هو أهم تفصيلة. تخيل: المستخدم سجّل بإيميل غلط، وطلب لينك، وبعدين غيّر إيميله. لو اللينك القديم اتفتح، مش المفروض يأكد الإيميل الجديد. عشان كده التأكيد بيحصل بـ [[updateMany]] بشرط [[email: row.email]]، ولو count بـ 0 يبقى الإيميل اتغيّر.

الـ [[updateMany]] على كل توكنات VERIFY المفتوحة بيقفل كل اللينكات القديمة مرة واحدة، فمفيش لينك تاني يشتغل بعد التأكيد.

ليه POST مش GET؟ برامج فحص الإيميل في الشركات (Outlook Safe Links مثلًا) بتفتح كل لينك في الرسالة أوتوماتيك. لو الـ GET بيأكد، الإيميل بيتأكد من غير ما البني آدم يشوفه، وأسوأ من كده في لينكات الدخول: التوكن بيتحرق قبل ما المستخدم يضغط. فاللينك بيفتح صفحة في الواجهة، والصفحة بتبعت التوكن بـ POST (أوتوماتيك أو بزرار «أكّد»).

الحد: ٣ في الساعة لكل مستخدم، محسوبين من الجدول نفسه، من غير Redis. وفوقه rate limit بالـ IP على المسار. والـ 202 معناها «استلمنا وهيتبعت»، لأن الإيميل بيروح queue.

المدة: ٢٤ ساعة معقولة للتأكيد، لأن الناس بتسجّل وتفتح الإيميل بعدين. أما لينكات الدخول أو الاستعادة فأقصر بكتير.`,
            when: "في أي منتج فيه تسجيل بإيميل. وفي الـ MVP ممكن تسيبه يدخل ويتفرج، وتقفل الشراء والدعوات لحد ما يأكد.",
            mistakes: R`التأكيد بـ GET. أو لينك من غير انتهاء. أو التوكن متخزن زي ما هو. أو «ابعت تاني» من غير حد. أو تأكيد الإيميل الجديد بلينك اتبعت للقديم. أو إنك تمنع الدخول خالص قبل التأكيد، والإيميل واقع في spam، فالمستخدم مش قادر يعمل حاجة ولا يغيّر إيميله الغلط.`
          },
          teach: R`## route يبعت اللينك بحد، و route يأكد

[[/auth/verify-email/send]] (لازم يكون داخل) بيعد اللينكات اللي اتبعتت في آخر ساعة، ولو أقل من ٣ يعمل توكن ويحطه في الـ queue. و [[/auth/verify-email]] بياخد التوكن بـ POST، ويقفل كل لينكات التأكيد، ويأكد الإيميل بشرط إنه متغيّرش. جرّبناهم على سيرفر دروس الـ auth (Express 5 و Prisma 7 و PostgreSQL 18، ويندوز 11)، و [[emailQueue]] بيطبع الإيميل في الترمنال بدل ما يبعته، و [[requireAuth]] بيتحقق من الـ access token ويحط [[req.user]].

جدول [[EmailToken]] في التجربة: [[userId]] و [[purpose]] (enum فيه [[VERIFY]] و [[CHANGE_EMAIL]]) و [[email]] و [[tokenHash]] (unique) و [[expiresAt]] و [[usedAt]] و [[createdAt]].

---

## ١. [[/auth/verify-email/send]]

### [[router.post("/auth/verify-email/send", requireAuth, async (req, res) => {]]

[[requireAuth]] قبل الـ handler: من غير access token سليم الطلب بيقف بـ 401.

### [[db.user.findUniqueOrThrow({ where: { id: req.user.id } })]]

[[OrThrow]]: لو المستخدم اتمسح والتوكن لسه شغال، بيرمي [[P2025]] (404) بدل ما يرجّع [[null]].

### [[if (user.emailVerifiedAt) return res.status(204).end();]]

متأكد بالفعل؟ مفيش إيميل. جرّبناها بعد التأكيد ورجعت [[204]].

### [[db.emailToken.count({ where: { userId, purpose: "VERIFY", createdAt: { gt: new Date(Date.now() - 3600e3) } } })]]

- [[count]] بيرجّع رقم بس، مش الصفوف.
- [[gt]] (greater than) أكبر من: اللي اتعمل بعد «من ساعة» ([[3600e3]] = 3,600,000 ملّي).

يعني الحد محسوب من نفس الجدول، من غير Redis.

### [[if (recent >= 3) throw new AppError(429, "TOO_MANY_EMAILS", ...)]]

~~~text الناتج (٤ طلبات ورا بعض)
send1 202
send2 202
send3 202
{"error":{"code":"TOO_MANY_EMAILS","message":"بعتنالك كذا إيميل. استنى ساعة وجرّب تاني"}}send4 429
~~~

### [[db.emailToken.create({ data: { userId, purpose: "VERIFY", email: user.email, tokenHash: sha256(token), expiresAt: ... 24 * 3600e3 } })]]

الجديد هنا عمود [[email]]: الإيميل اللي اللينك ده بيأكده **بالظبط**. و ٢٤ ساعة لأن الناس بتفتح الإيميل بعدين.

### [[emailQueue.add(...)]] و [[res.status(202).end()]]

~~~text ترمنال السيرفر
EMAIL verify-email {"to":"omar@example.com","link":"http://localhost:5173/verify-email?token=<..>"}
~~~

اللينك لصفحة في الواجهة، مش للـ API. و [[202 Accepted]] = «استلمنا، وهيتعمل بعدين».

---

## ٢. [[/auth/verify-email]]

### [[db.emailToken.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } })]]

[[String(...)]] بيضمن إن اللي داخل لـ [[sha256]] نص، حتى لو حد بعت رقم أو object (ولو بعت [[undefined]] بيبقى النص [["undefined"]] وملوش صف).

### [[if (!row || row.purpose !== "VERIFY" || row.usedAt || row.expiresAt < new Date()) throw ... BAD_TOKEN]]

٤ أسباب للرفض. [[purpose]] مهم: توكن تغيير إيميل ميتقبلش هنا.

### الـ transaction

~~~text
const [, { count }] = await db.$transaction([
  db.emailToken.updateMany({ where: { userId: row.userId, purpose: "VERIFY", usedAt: null }, data: { usedAt: new Date() } }),
  db.user.updateMany({ where: { id: row.userId, email: row.email }, data: { emailVerifiedAt: new Date() } }),
]);
~~~

- [[$transaction([...])]] بيرجّع array فيها نتيجة كل عملية بالترتيب.
- [[const [, { count }] = ...]] destructuring لـ array: الفاصلة الأولى معناها «سيب العنصر الأول»، والتاني ناخد منه [[count]].
- العملية الأولى: كل لينكات التأكيد المفتوحة للمستخدم تتقفل، مش اللي اتفتح بس.
- التانية: [[updateMany]] مش [[update]]، عشان نقدر نحط شرط [[email: row.email]]. لو الإيميل في users اتغيّر، مفيش صف يطابق و [[count]] بـ 0.

### [[if (count === 0) throw ... EMAIL_CHANGED]]

---

## ٣. التجربة

أكّدنا بأول لينك من التلاتة، وجرّبنا التاني:

~~~text الناتج
verify1 204
{"error":{"code":"BAD_TOKEN","message":"اللينك انتهى، اطلب واحد جديد"}} verify2 400
~~~

والجدول بعدها: ٣ توكنات، و ٣ مستخدمين ([[used]])، و [[verified = t]].

وتجربة الإيميل المتغيّر: مستخدم تاني طلب لينك لـ [[hana@example.com]]، وغيّرنا إيميله في القاعدة لـ [[hana2@example.com]]، وفتحنا اللينك:

~~~text الناتج
{"error":{"code":"EMAIL_CHANGED","message":"الإيميل اتغير بعد اللينك ده"}} 400
{"error":{"code":"BAD_TOKEN","message":"اللينك انتهى، اطلب واحد جديد"}} 400
~~~

~~~text الناتج من psql
       email       | verified |   token_email    | used
 hana2@example.com | f        | hana@example.com | t
~~~

الإيميل الجديد مش متأكد، والتوكن اتحرق (الـ transaction خلصت، والرمي بعدها). المرة التانية بقت BAD_TOKEN.

---

## الخلاصة

| الحماية | فين |
|---|---|
| ٣ إيميلات في الساعة | [[count]] على نفس الجدول، و 429 |
| اللينك بيأكد إيميل معيّن | عمود [[email]] وشرط [[email: row.email]] |
| مرة واحدة، وكل اللينكات تتقفل | [[updateMany]] على كل توكنات VERIFY |
| برامج فحص الإيميل متأكدش لوحدها | التأكيد POST من صفحة الواجهة، مش GET |
| نوع التوكن | [[purpose !== "VERIFY"]] |`,
          lines: [
            "ابعت لينك تأكيد. لازم يكون داخل.",
            "هات المستخدم.",
            "متأكد بالفعل؟ مفيش حاجة تتعمل.",
            "عد الإيميلات اللي اتبعتت له في آخر ساعة، من نفس الجدول.",
            "٣ أو أكتر؟ ارفض بـ 429.",
            "توكن عشوائي ٣٢ بايت.",
            "خزّن الـ hash، والإيميل اللي بنأكده، ومدة ٢٤ ساعة.",
            "حط الإيميل في الـ queue. اللينك بيفتح صفحة في الواجهة، مش الـ API.",
            "202: اتقبل وهيتبعت.",
            "قفلة.",
            "التأكيد نفسه، بـ POST من صفحة الواجهة.",
            "دوّر على التوكن بالـ hash.",
            "مش موجود، أو نوعه غلط، أو اتستخدم، أو خلص؟ ارفض.",
            "في transaction واحدة:",
            "اقفل كل لينكات التأكيد المفتوحة للمستخدم ده...",
            "...وأكّد، بشرط إن الإيميل لسه هو نفس اللي في اللينك.",
            "قفلة الـ transaction.",
            "لو محدش اتأكد، يبقى الإيميل اتغيّر.",
            "تمام.",
            "قفلة."
          ],
          sol: R`الطلبات الـ ٣ الأولى ترجع 202، والرابع يرجع [[429 TOO_MANY_EMAILS]]. أول لينك يرجع 204، و [[emailVerifiedAt]] يتملى. أي لينك تاني بعده يرجع [[400 BAD_TOKEN]]، لأن [[updateMany]] علّمت عليهم كلهم [[usedAt]].

لو غيّرت الإيميل في القاعدة وفتحت لينك قديم: الرد [[400 EMAIL_CHANGED]]، وفي نفس الوقت التوكن اتعلّم إنه مستخدم (لأن الـ transaction خلصت). ده مقبول: المستخدم يطلب لينك للإيميل الجديد.

لو التأكيد عدّى في الحالة دي، يبقى بتحدّث بـ [[update({ where: { id } })]] من غير شرط الإيميل.`
        },
        {
          cmd: "2FA: التفعيل",
          title: "2FA بـ TOTP: السر والـ QR والتفعيل",
          desc: R`الـ TOTP هو الأرقام الـ ٦ اللي بتتغيّر كل ٣٠ ثانية في Google Authenticator أو 1Password أو Authy. السيرفر والموبايل عندهم نفس السر، وكل واحد بيحسب الكود من السر والوقت الحالي، فمش محتاجين يكلموا بعض.

التفعيل خطوتين. الأولى: السيرفر بيعمل سر عشوائي، ويخزنه مشفّر، ويرجّع QR فيه [[otpauth://]] URI. والتانية: المستخدم بيمسح الـ QR ويكتب الكود، والسيرفر بيتأكد إنه صح قبل ما يشغّل الـ 2FA، ويرجّع recovery codes مرة واحدة. المكتبة [[otplib]] (نسخة 13 وما بعدها، الـ API فيها functions و async).`,
          example: R`import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";

router.post("/me/2fa/setup", requireAuth, requireRecentAuth(), async (req, res) => {
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (user.totpEnabledAt) throw new AppError(409, "MFA_ALREADY_ON", "الـ 2FA شغالة بالفعل");
  const secret = generateSecret();
  await db.user.update({ where: { id: user.id }, data: { totpSecretEnc: encrypt(secret) } });
  const uri = generateURI({ issuer: "myapp", label: user.email, secret });
  res.json({ data: { qr: await QRCode.toDataURL(uri), secret } });
});
router.post("/me/2fa/enable", requireAuth, async (req, res) => {
  const { code } = z.object({ code: z.string().regex(/^\d{6}$/) }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (!user.totpSecretEnc || user.totpEnabledAt) throw new AppError(409, "NO_PENDING_SETUP", "ابدأ التفعيل من الأول");
  const r = await verify({ secret: decrypt(user.totpSecretEnc), token: code, epochTolerance: 30 });
  if (!r.valid) throw new AppError(400, "BAD_CODE", "الكود غلط. اتأكد إن ساعة الموبايل مظبوطة");
  const codes = Array.from({ length: 10 }, () => crypto.randomBytes(5).toString("hex"));
  await db.$transaction([
    db.user.update({ where: { id: user.id }, data: { totpEnabledAt: new Date(), totpLastStep: r.timeStep } }),
    db.recoveryCode.deleteMany({ where: { userId: user.id } }),
    db.recoveryCode.createMany({ data: codes.map((c) => ({ userId: user.id, codeHash: sha256(c) })) }),
  ]);
  res.json({ data: { recoveryCodes: codes } });
});`,
          try: R`اكتب [[lib/crypto.js]] فيه [[encrypt(text)]] و [[decrypt(box)]] بـ AES-256-GCM ومفتاح ٣٢ بايت من [[config.TOTP_ENC_KEY]] (base64). اتأكد إن نفس النص بيتشفّر لنتيجتين مختلفتين، وإن تغيير حرف واحد في الناتج بيخلي decrypt ترمي error. بعدين فعّل الـ 2FA لحسابك وامسح الـ QR بتطبيق حقيقي.`,
          flag: "script",
          deep: {
            why: "الباسوردات بتتسرق كل يوم: تسريبات مواقع تانية، و phishing، وناس بتكرر نفس الباسورد. الـ 2FA بيخلي الباسورد لوحده مش كفاية. ولوحة الأدمن بالذات لازم يبقى عليها 2FA إجباري، لأن حساب أدمن واحد مسروق يكشف كل حاجة.",
            how: R`الـ TOTP (RFC 6238): الكود = HMAC للسر مع رقم الفترة الحالية ([[floor(unixTime / 30)]])، ومنه ٦ أرقام. عشان كده ساعة الموبايل لازم تبقى مظبوطة.

الـ [[epochTolerance: 30]] هي الـ drift window: بتقبل كود الفترة اللي فاتت واللي جاية (٣٠ ثانية في كل ناحية). ليه؟ المستخدم كتب الكود في آخر ثانية وقبل ما يوصل خلص، أو ساعة الموبايل متأخرة شوية. أكبر من كده بيوسّع فرصة التخمين من غير فايدة كبيرة.

[[verify]] في otplib 13 بترجّع object مش boolean: [[valid]]، و [[delta]] (بعيد كام فترة)، و [[timeStep]] (رقم الفترة اللي الكود طابقها). الـ timeStep بنخزنه في [[totpLastStep]] عشان الدرس الجاي يمنع إعادة استخدام نفس الكود.

السر متخزن مشفّر (encryption at rest)، مش hash، لأن السيرفر محتاج السر نفسه عشان يحسب الكود. لو القاعدة اتسربت والسر نص عادي، المهاجم يقدر يطلّع أكواد لكل الحسابات. AES-256-GCM بيشفّر وبيضيف tag بيكشف أي تعديل. والمفتاح في متغير بيئة أو secret manager، مش في القاعدة. وكده تسريب القاعدة لوحدها مش كفاية.

الـ QR: [[generateURI]] بتطلّع [[otpauth://totp/myapp:ali%40x.com?secret=...&issuer=myapp]]. و [[QRCode.toDataURL]] بتحوّله صورة base64 الواجهة تعرضها في [[<img>]]. وبنرجّع السر كنص كمان للي مش قادر يمسح (بيكتبه بإيده).

التفعيل مش بيحصل غير بعد كود صح. لو شغّلته بعد الـ setup على طول والمستخدم ممسحش الـ QR صح، الحساب يتقفل عليه.

الـ recovery codes: ١٠ أكواد عشوائية، بتتعرض مرة واحدة بس ([[5 bytes hex]] يعني ١٠ حروف)، ومتخزنين sha256. كفاية لأنهم عشوائيين وطوال، زي توكنات الاستعادة. والتفعيل بيعدّي على [[requireRecentAuth]] (درس step-up auth)، عشان حد لقى لابتوبك مفتوح ميقدرش يشغّل 2FA بموبايله ويقفل عليك.`,
            when: "للأدمن والمدرّبين إجباري. وللطلاب اختياري في الإعدادات. ولو المنتج فيه فلوس (رصيد، أو محفظة، أو payouts للمدرّبين)، اطلبه قبل أي سحب.",
            mistakes: R`السر نص عادي في القاعدة. أو تفعيل من غير كود تأكيد. أو [[epochTolerance]] كبيرة جدًا (دقايق). أو تنسى إن [[verify]] بترجّع object فتكتب [[if (await verify(...))]]، وده دايمًا true لأن الـ object مش falsy. أو تعرض الـ recovery codes تاني من الإعدادات، يعني متخزنين بشكل يترجع. أو تبعت الأكواد بـ SMS كبديل وحيد، والـ SIM swap بيسرقها.`
          },
          teach: R`## خطوتين: سر و QR، وبعدين تأكيد بكود

[[/me/2fa/setup]] بيعمل سر عشوائي، ويخزنه مشفّر، ويرجّع صورة QR. و [[/me/2fa/enable]] بياخد أول كود من تطبيق الموبايل، ولو صح بيشغّل الـ 2FA ويرجّع ١٠ recovery codes. جرّبناهم بـ otplib 13.5 و qrcode 1.5 على سيرفر دروس الـ auth (Express 5 و Prisma 7 و PostgreSQL 18، ويندوز 11). بدل الموبايل، ولّدنا الكود بـ [[generate({ secret })]] من otplib نفسها، وهي نفس الحسبة اللي Google Authenticator بيعملها. ورجّعنا الـ [[uri]] كمان في الرد للتجربة بس.

---

## ١. [[import { generateSecret, generateURI, verify } from "otplib";]]

otplib من نسخة 13 بقت functions منفصلة (مش [[authenticator.xxx]] زي القديم)، و [[verify]] بقت async.

---

## ٢. [[/me/2fa/setup]]

### [[router.post("/me/2fa/setup", requireAuth, requireRecentAuth(), ...)]]

داخل، و [[authAt]] بتاعه من أقل من ١٠ دقايق (درس step-up). احنا كنا لسه عاملين login، فعدّى.

### [[if (user.totpEnabledAt) throw new AppError(409, "MFA_ALREADY_ON", ...)]]

بعد التفعيل جرّبنا setup تاني:

~~~text الناتج
setup again: 409 MFA_ALREADY_ON
~~~

### [[const secret = generateSecret();]]

~~~text الناتج
secret: 32 chars base32
~~~

base32 حروف [[A-Z]] وأرقام [[2-7]] بس (من غير ٠ و ١ عشان ميتلخبطوش مع O و I)، لأن الناس ممكن تكتبه بإيدها. ٣٢ حرف = ٢٠ byte عشوائي.

### [[totpSecretEnc: encrypt(secret)]]

بيتخزن مشفّر، ولسه [[totpEnabledAt]] فاضي: الـ 2FA مش شغالة لحد ما يأكد بكود. في القاعدة شكله:

~~~text الناتج من psql (أول ٤٠ حرف)
mKR3gE9XSz0iFxF7.BU56M23_lstoLhGSQ4RZJg.
~~~

### [[generateURI({ issuer: "myapp", label: user.email, secret })]]

~~~text الناتج
otpauth://totp/myapp:omar%40example.com?secret=<SECRET>&issuer=myapp
~~~

ده الـ URI اللي التطبيقات بتفهمه: [[totp]] النوع، و [[myapp:omar%40example.com]] اللي هيظهر في التطبيق ([[%40]] هي [[@]] بعد الـ encoding)، و [[secret]] السر، و [[issuer]] اسم التطبيق.

### [[await QRCode.toDataURL(uri)]]

~~~text الناتج
qr: data:image/png;base64,iVBORw0K... 3190 chars
~~~

صورة PNG مكتوبة نص (data URL). الواجهة بتحطها في [[<img src="...">]] على طول. والسر بيرجع كنص كمان للي هيكتبه بإيده.

---

## ٣. [[/me/2fa/enable]]

### [[z.object({ code: z.string().regex(/^\d{6}$/) })]]

[[/^\d{6}$/]] regex: [[^]] البداية، و [[\d]] رقم، و [[{6}]] ٦ مرات، و [[$]] النهاية. يعني ٦ أرقام بالظبط ومفيش غيرهم:

~~~text الناتج
5 digits: 400 VALIDATION
~~~

### [[if (!user.totpSecretEnc || user.totpEnabledAt) throw ... NO_PENDING_SETUP]]

مفيش setup، أو شغالة بالفعل.

### [[await verify({ secret: decrypt(user.totpSecretEnc), token: code, epochTolerance: 30 })]]

من جوه لبرة: [[decrypt]] يرجّع السر، و [[verify]] تحسب الكود المتوقع وتقارن. و [[epochTolerance: 30]] تقبل ٣٠ ثانية قبل وبعد (الفترة اللي فاتت واللي جاية). الكود نفسه: HMAC للسر مع رقم الفترة [[floor(unixTime / 30)]]، ومنه ٦ أرقام.

~~~text الناتج
verify() returns: {"valid":true,"delta":0,"epoch":1791454560,"timeStep":"number"} | floor(now/30) = true
~~~

بترجّع **object**: [[valid]] صح ولا لأ، و [[delta]] الكود من أنهي فترة (0 = الحالية، -1 = اللي فاتت)، و [[epoch]] وقت الفترة، و [[timeStep]] رقمها (طلع بالظبط [[floor(now/30)]]). وده الفخ:

~~~text الناتج
if(await verify(bad)) -> true but .valid = false
~~~

أي object في JavaScript بيعتبر [[true]] في الـ if، حتى لو الكود غلط. عشان كده الكود بيكتب [[if (!r.valid)]].

كود غلط:

~~~text الناتج
wrong code: 400 BAD_CODE
~~~

### الـ recovery codes

~~~text
const codes = Array.from({ length: 10 }, () => crypto.randomBytes(5).toString("hex"));
~~~

[[Array.from({ length: 10 }, fn)]] array من ١٠ عناصر، كل عنصر من الدالة. و [[randomBytes(5)]] ٥ bytes = ١٠ حروف hex.

### الـ transaction

- [[totpEnabledAt: new Date()]] الـ 2FA بقت شغالة.
- [[totpLastStep: r.timeStep]] الفترة اللي الكود ده اتقبل فيها، عشان نفس الكود ميتقبلش تاني في الدخول. في القاعدة: [[59715152]].
- امسح الأكواد القديمة، وخزّن sha256 للجديدة بس.

~~~text الناتج
enable: 200 10 codes, e.g. 1e4******* len 10
~~~

والأكواد بترجع **مرة واحدة**: القاعدة فيها hashes بس، فمفيش طريقة نعرضهم تاني.

---

## ٤. التشفير (الـ solCode): AES-256-GCM

### [[const KEY = Buffer.from(config.TOTP_ENC_KEY, "base64");]]

المفتاح ٣٢ byte (= 256 bit، ومن هنا [[256]] في الاسم)، مكتوب base64 في متغير البيئة (٤٤ حرف).

### [[encrypt]]

1. [[crypto.randomBytes(12)]] الـ IV (initialization vector): ١٢ byte عشوائي جديد مع **كل** تشفير. ١٢ هو الطول المعتاد لـ GCM.
2. [[createCipheriv("aes-256-gcm", KEY, iv)]] جهّز التشفير.
3. [[cipher.update(plain, "utf8")]] و [[cipher.final()]] النص المشفّر، و [[Buffer.concat]] بيلزقهم.
4. [[cipher.getAuthTag()]] الـ tag: ١٦ byte زي «ختم» على الناتج.
5. التلاتة بـ base64url ومتلزقين بـ [[.]].

~~~text الناتج (نفس النص مرتين)
qvXHN2iOj26AOVwB.G1GyxZEpQfg_0AfPWfVggQ.tUXUv7i20p0
ENgw07rwj6CrGdNh.W8S5c1xQJo9-c___XsNgZA.erXYeJLkqJo
same? false | parts: [ 16, 22, 11 ]
~~~

مختلفين لأن الـ IV مختلف. الأطوال: IV ١٢ byte = ١٦ حرف، و tag ١٦ byte = ٢٢ حرف، والداتا ٨ byte = ١١ حرف.

### [[decrypt]]

بيفك التلاتة، و [[decipher.setAuthTag(tag)]] بيقول «ده الختم المتوقع»، و [[final()]] بيتأكد منه:

~~~text الناتج
decrypt: JBSWY3DP
tampered: Unsupported state or unable to authenticate data
~~~

غيّرنا حرف واحد في الداتا، فالختم مطابقش و [[final()]] رمت. GCM مش بيشفّر بس، بيكشف أي تعديل.

---

## الخلاصة

| الخطوة | الحاجة المهمة |
|---|---|
| setup | سر base32 عشوائي، مشفّر AES-GCM، و QR من [[otpauth://]] |
| enable | ٦ أرقام، و [[r.valid]] مش [[r]]، وسماحية فترة واحدة قبل وبعد |
| بعد التفعيل | [[totpLastStep]] و ١٠ recovery codes تتعرض مرة واحدة |
| التشفير | IV جديد كل مرة، والـ tag بيكشف التعديل، والمفتاح برّه القاعدة |`,
          lines: [
            "otplib للـ TOTP: سر، و URI للـ QR، وتحقق.",
            "مكتبة بتحوّل الـ URI لصورة QR.",
            "الخطوة الأولى. لازم يكون داخل، ومن قريب.",
            "هات المستخدم.",
            "شغالة بالفعل؟ ارفض.",
            "سر عشوائي بصيغة base32 اللي التطبيقات بتفهمها.",
            "خزّنه مشفّر، ولسه الـ 2FA مش شغالة.",
            "الـ otpauth URI: اسم التطبيق والإيميل والسر.",
            "رجّع صورة QR، والسر كنص للي هيكتبه بإيده.",
            "قفلة.",
            "الخطوة التانية: التأكيد بكود.",
            "٦ أرقام بالظبط.",
            "هات المستخدم.",
            "مفيش setup أو شغالة بالفعل؟ ارفض.",
            "فك تشفير السر، واتحقق من الكود، مع سماحية فترة قبل وبعد.",
            "غلط؟ غالبًا ساعة الموبايل أو QR اتمسح غلط.",
            "١٠ recovery codes عشوائية.",
            "في transaction واحدة:",
            "شغّل الـ 2FA، وخزّن الفترة اللي اتستخدمت عشان متتعادش.",
            "امسح أي recovery codes قديمة...",
            "...وخزّن الجديدة hash بس.",
            "قفلة الـ transaction.",
            "رجّع الأكواد مرة واحدة. الواجهة تقوله يحفظهم.",
            "قفلة."
          ],
          sol: R`[[encrypt("JBSWY3DP")]] مرتين لازم يطلّع نصين مختلفين، لأن الـ IV عشوائي كل مرة. والشكل [[iv.tag.data]] بـ base64url. و [[decrypt]] بترجّع النص الأصلي. ولو غيّرت أي حرف في أي جزء، [[decipher.final()]] بترمي [[Unsupported state or unable to authenticate data]]، وده الـ tag بيكشف التعديل.

بعد مسح الـ QR، التطبيق هيعرض [[myapp (ali@x.com)]]، والكود اللي فيه لازم يعدّي في [[/me/2fa/enable]] ويرجّع ١٠ أكواد. لو رجع BAD_CODE، اتأكد من ساعة الموبايل (خليها أوتوماتيك).

الغلطة الشائعة: IV ثابت أو مشتق من السر. مع GCM ده كارثي، لأن تكرار الـ IV بنفس المفتاح بيكشف الداتا.`,
          solCode: R`import crypto from "node:crypto";

const KEY = Buffer.from(config.TOTP_ENC_KEY, "base64");

export function encrypt(plain) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString("base64url")).join(".");
}

export function decrypt(box) {
  const [iv, tag, data] = box.split(".").map((s) => Buffer.from(s, "base64url"));
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}`
        },
        {
          cmd: "2FA: الدخول",
          title: "الدخول بـ 2FA: خطوة تانية بعد الباسورد، و recovery codes",
          desc: R`لما الـ 2FA شغالة، الـ login مبيطلّعش توكنات بعد الباسورد. بيطلّع [[mfaToken]] قصير (٥ دقايق) موقّع بسر مختلف، معناه «الباسورد صح، ناقص الكود». والواجهة بتعرض خانة الكود وتبعته مع الـ mfaToken على [[/auth/2fa]].

الكود ممكن يكون TOTP (٦ أرقام) أو recovery code. الـ TOTP بيتقبل مرة واحدة بس في نفس الفترة (replay protection بـ [[afterTimeStep]])، والـ recovery code بيتحرق بعد استخدامه ويتبعت إيميل.`,
          example: R`// في آخر /auth/login، بعد ما الباسورد يطلع صح:
if (user.totpEnabledAt) {
  const mfaToken = jwt.sign({ sub: user.id }, config.MFA_JWT_SECRET, { expiresIn: "5m" });
  return res.json({ data: { mfaRequired: true, mfaToken } });
}

async function checkTotp(user, code) {
  const r = await verify({ secret: decrypt(user.totpSecretEnc), token: code, epochTolerance: 30, afterTimeStep: user.totpLastStep ?? undefined });
  if (!r.valid) return false;
  const { count } = await db.user.updateMany({ where: { id: user.id, OR: [{ totpLastStep: null }, { totpLastStep: { lt: r.timeStep } }] }, data: { totpLastStep: r.timeStep } });
  return count === 1;
}
router.post("/auth/2fa", mfaLimiter, async (req, res) => {
  const { mfaToken, code } = z.object({ mfaToken: z.string(), code: z.string().trim().max(20) }).parse(req.body);
  let sub;
  try { sub = jwt.verify(mfaToken, config.MFA_JWT_SECRET).sub; } catch { throw new AppError(401, "MFA_EXPIRED", "ابدأ الدخول من الأول"); }
  const user = await db.user.findUniqueOrThrow({ where: { id: sub } });
  let ok;
  if (/^\d{6}$/.test(code)) ok = await checkTotp(user, code);
  else {
    const { count } = await db.recoveryCode.updateMany({ where: { userId: user.id, codeHash: sha256(code.toLowerCase().replace(/[^0-9a-f]/g, "")), usedAt: null }, data: { usedAt: new Date() } });
    ok = count === 1;
    if (ok) await emailQueue.add("recovery-code-used", { to: user.email });
  }
  if (!ok) throw new AppError(401, "BAD_CODE", "الكود غلط");
  return issueTokens(res, user);
});`,
          try: R`ادخل بحساب عليه 2FA، وابعت نفس الكود الصح مرتين ورا بعض في نفس الـ ٣٠ ثانية. بعدين جرّب recovery code بحروف كبيرة وبشَرطة في النص ([[ABCDE-12345]])، وبعدين نفس الكود تاني. وآخر حاجة: خد الـ mfaToken وابعته كـ [[Authorization: Bearer]] لأي endpoint عليه requireAuth.`,
          flag: "script",
          deep: {
            why: "الخطوة التانية لو اتعملت غلط بتلغي فايدة الـ 2FA كلها. لو الـ mfaToken ينفع كـ access token، الباسورد لوحده بقى كفاية. ولو الكود ينفع أكتر من مرة، اللي شاف شاشتك أو عمل phishing proxy يستخدمه بعدك. ولو مفيش recovery، أول موبايل يضيع يبقى تذكرة دعم ومستخدم زعلان.",
            how: R`السر المختلف ([[MFA_JWT_SECRET]]) هو اللي بيفصل النوعين. [[requireAuth]] بيتحقق بـ [[JWT_SECRET]]، فالـ mfaToken مش هيعدّي عليه أبدًا، والعكس. ممكن بدل كده [[audience]] مختلف، بس ساعتها لازم requireAuth يتحقق من الـ audience بتاعه هو كمان، وده بيتنسي.

الـ replay protection: كل كود صح ليه [[timeStep]]. بنخزن آخر واحد اتقبل في [[totpLastStep]]، و [[afterTimeStep]] بيرفض أي كود فترته أقدم أو زي آخر واحد. والـ [[updateMany]] المشروط بيقفل السباق: لو طلبين بنفس الكود وصلوا مع بعض، واحد بس ياخد count بـ 1. نفس فكرة الـ refresh rotation.

الـ recovery code: بنطبّعه الأول (small، ومن غير شَرط ولا مسافات)، لأن الناس بتكتبه بأي شكل. و [[updateMany]] بشرط [[usedAt: null]] بيحرقه في خطوة واحدة. وإيميل «استخدمت recovery code» بينبّه صاحب الحساب لو مش هو. ولما يفضل له ٢ أو أقل، الواجهة تقوله يولّد جداد.

[[mfaLimiter]]: الكود ٦ أرقام يعني مليون احتمال، ومع سماحية ٣ فترات تبقى ٣ في المليون لكل محاولة. من غير حد، سكربت يخمّن في ساعات. حد زي ٥ محاولات لكل mfaToken و ٢٠ في الساعة للحساب كفاية.

«افتكر الجهاز ده ٣٠ يوم»: cookie موقّعة فيها userId وتاريخ، ولو موجودة وسليمة الـ login يعدّي الخطوة التانية. وأي تغيير باسورد يلغيها.`,
            when: "مع أي 2FA. والـ recovery codes جزء من الـ 2FA نفسه، مش ميزة إضافية.",
            mistakes: R`نفس السر للـ mfaToken والـ access token. أو مفيش rate limit على الكود. أو الكود يتقبل أكتر من مرة. أو recovery codes متخزنة نص، أو بتتقارن بـ [[findFirst]] وبعدين [[update]] في خطوتين. أو «ابعتلي الكود بالإيميل» كبديل من غير أي حد، فبقى الإيميل هو الـ factor التاني بس. وفي الانترفيو: «TOTP بيحمي من phishing؟» لأ مش تمامًا: موقع مزيف ممكن ياخد الكود ويستخدمه في نفس الثانية. اللي بيحمي فعلًا الـ passkeys، لأنها مربوطة بالدومين.`
          },
          teach: R`## الـ login بقى خطوتين

لو الـ 2FA شغالة، الباسورد الصح بيرجّع [[mfaToken]] بس (مش توكنات دخول). والواجهة بتبعته مع الكود لـ [[/auth/2fa]]: كود TOTP ٦ أرقام، أو recovery code. جرّبناه على سيرفر دروس الـ auth (Express 5 و otplib 13 و jsonwebtoken و Prisma 7 و PostgreSQL 18، ويندوز 11) بحساب فعّلنا عليه الـ 2FA في الدرس اللي فات. الكود ولّدناه بـ [[generate({ secret })]] من otplib بعد ما فكينا السر من القاعدة (زي ما التطبيق بيحسبه)، واستنينا فترة ٣٠ ثانية جديدة الأول، وضفنا recovery code معروف ([[abcde12345]]) للتجربة.

---

## ١. آخر الـ login

~~~text
if (user.totpEnabledAt) {
  const mfaToken = jwt.sign({ sub: user.id }, config.MFA_JWT_SECRET, { expiresIn: "5m" });
  return res.json({ data: { mfaRequired: true, mfaToken } });
}
~~~

- [[sub]] بس، من غير [[role]]: التوكن ده مش بيدّي أي صلاحية.
- [[MFA_JWT_SECRET]] سر **تاني** غير [[JWT_SECRET]].
- [[expiresIn: "5m"]] خمس دقايق يكتب فيهم الكود.

~~~text الناتج
login  200 {"data":{"mfaRequired":true,"mfaToken":"eyJhbGciOiJIUzI1NiIs...
mfaToken payload: {"sub":"cmuzdrjin00038cieaxx4sn48","iat":1791454680,"exp":1791454980}
~~~

[[exp - iat = 300]] ثانية. وجربناه كـ [[Authorization: Bearer]] على endpoint عليه [[requireAuth]]:

~~~text الناتج
mfaToken as Bearer  401 {"error":{"code":"UNAUTHENTICATED","message":"سجّل دخول"}}
~~~

[[requireAuth]] بيتحقق بـ [[JWT_SECRET]]، والتوقيع اتعمل بسر تاني، فرفض. لو السرين واحد، الباسورد لوحده كان هيكفي.

---

## ٢. [[checkTotp(user, code)]]

~~~text
const r = await verify({ secret: decrypt(user.totpSecretEnc), token: code, epochTolerance: 30, afterTimeStep: user.totpLastStep ?? undefined });
if (!r.valid) return false;
~~~

[[afterTimeStep]] بيرفض أي كود فترته أقدم من آخر فترة اتقبلت **أو تساويها**. و [[?? undefined]] لأن القاعدة بترجّع [[null]] لو مفيش، والمكتبة مستنية [[undefined]] أو رقم.

~~~text
const { count } = await db.user.updateMany({ where: { id: user.id, OR: [{ totpLastStep: null }, { totpLastStep: { lt: r.timeStep } }] }, data: { totpLastStep: r.timeStep } });
return count === 1;
~~~

نفس فكرة الـ refresh rotation: خزّن الفترة دي **بشرط** إنها أحدث من المتخزنة ([[lt]] = less than). [[OR]] بيقبل الحالتين: لسه مفيش فترة، أو المتخزنة أقدم. لو طلبين بنفس الكود وصلوا مع بعض، الاتنين يعدّوا [[verify]]، بس واحد بس ياخد [[count === 1]].

---

## ٣. [[/auth/2fa]]

### [[z.object({ mfaToken: z.string(), code: z.string().trim().max(20) })]]

[[trim]] عشان المسافات اللي بتيجي مع النسخ واللصق، و [[max(20)]] حد معقول.

### [[try { sub = jwt.verify(mfaToken, config.MFA_JWT_SECRET).sub; } catch { throw ... MFA_EXPIRED }]]

[[jwt.verify]] بيرمي لو التوقيع غلط أو خلص. [[catch]] من غير [[(e)]] مسموحة في JavaScript الحديث. بوّظنا آخر التوكن:

~~~text الناتج
bad mfaToken  401 {"error":{"code":"MFA_EXPIRED","message":"ابدأ الدخول من الأول"}}
~~~

### [[if (/^\d{6}$/.test(code)) ok = await checkTotp(user, code);]]

[[regex.test(text)]] بترجّع [[true]] لو النص ٦ أرقام بالظبط: يبقى TOTP.

~~~text الناتج
totp 1st       200 {"data":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
same totp 2nd  401 {"error":{"code":"BAD_CODE","message":"الكود غلط"}}
~~~

نفس الكود، في نفس الـ ٣٠ ثانية، اترفض المرة التانية: [[totpLastStep]] بقى فترته.

### الـ recovery code

~~~text
const { count } = await db.recoveryCode.updateMany({ where: { userId: user.id, codeHash: sha256(code.toLowerCase().replace(/[^0-9a-f]/g, "")), usedAt: null }, data: { usedAt: new Date() } });
~~~

من جوه لبرة:

1. [[code.toLowerCase()]]: [[ABCDE-12345]] بقى [[abcde-12345]].
2. [[.replace(/[^0-9a-f]/g, "")]]: [[[^...]]] أي حرف **مش** من 0-9 و a-f، و [[g]] كله مش أول واحد بس. الشَرطة والمسافات بتتشال، فبقى [[abcde12345]].
3. [[sha256(...)]] ونقارن بالـ hash المتخزن.
4. [[updateMany]] بشرط [[usedAt: null]]: يلاقيه ويحرقه في خطوة واحدة.

~~~text الناتج
recovery ABCDE-12345  200 {"data":{"accessToken":...
recovery again        401 {"error":{"code":"BAD_CODE","message":"الكود غلط"}}
~~~

~~~text ترمنال السيرفر
EMAIL recovery-code-used {"to":"omar@example.com"}
~~~

### [[return issueTokens(res, user);]]

بعد الكود الصح بس، نفس توكنات أي login.

---

## الخلاصة

| الحالة | الرد |
|---|---|
| باسورد صح و 2FA شغالة | 200 [[mfaRequired]] و [[mfaToken]] (٥ دقايق) |
| [[mfaToken]] على API عادي | 401، سر مختلف |
| [[mfaToken]] بايظ أو خلص | 401 MFA_EXPIRED |
| TOTP صح، أول مرة في الفترة | 200 توكنات |
| نفس الـ TOTP تاني | 401 BAD_CODE |
| recovery code بأي شكل كتابة | 200 أول مرة وإيميل تنبيه، وبعدها 401 |

وفي الإنتاج لازم [[mfaLimiter]] حقيقي: ٦ أرقام يعني مليون احتمال بس.`,
          lines: [
            "الباسورد صح، والـ 2FA شغالة؟",
            "توكن ٥ دقايق بسر مختلف، معناه «ناقص الكود» بس.",
            "رجّعه للواجهة من غير أي توكنات دخول.",
            "قفلة.",
            "دالة التحقق من TOTP، هنستخدمها هنا وفي الـ step-up.",
            "اتحقق، وارفض أي فترة اتستخدمت قبل كده.",
            "غلط؟ ارجع.",
            "خزّن الفترة دي بشرط إنها أحدث من آخر واحدة. خطوة ذرية ضد الطلبات المتزامنة.",
            "صح لو احنا اللي حدّثنا.",
            "قفلة.",
            "الخطوة التانية، وعليها rate limit.",
            "الـ mfaToken والكود.",
            "المتغير اللي هيشيل id المستخدم.",
            "فك الـ mfaToken بسره هو. منتهي أو مزيف؟ ابدأ من الأول.",
            "هات المستخدم.",
            "النتيجة.",
            "٦ أرقام؟ يبقى TOTP.",
            "غير كده؟ recovery code:",
            "طبّعه، واحرقه لو موجود ومش مستخدم، في خطوة واحدة.",
            "صح لو صف واحد اتحدّث.",
            "ونبّه صاحب الحساب.",
            "قفلة.",
            "غلط؟ 401.",
            "طلّع التوكنات العادية زي أي login.",
            "قفلة."
          ],
          sol: R`نفس الكود مرتين: الأولى ترجع 200 بتوكنات، والتانية [[401 BAD_CODE]]، لأن [[totpLastStep]] بقى نفس فترة الكود و [[afterTimeStep]] بيرفضه. استنى الـ ٣٠ ثانية الجاية والكود الجديد يعدّي.

الـ recovery code بـ [[ABCDE-12345]] (small أو كبير، بشَرطة أو من غيرها) يعدّي أول مرة، ويوصل إيميل [[recovery-code-used]]. والمرة التانية [[401]].

الـ mfaToken على endpoint عليه requireAuth: لازم 401. لو عدّى، يبقى الاتنين موقّعين بنفس السر، والـ 2FA ملهاش لازمة.

لو الكود الصح اترفض أول مرة: غالبًا نفس الكود اللي فعّلت بيه في نفس الفترة، لأن التفعيل خزّن الـ timeStep بتاعه. ده سلوك صح.`
        },
        {
          cmd: "step-up auth",
          title: "العمليات الحساسة: اكتب الباسورد تاني",
          desc: R`الـ session بتعيش ٣٠ يوم، بس مش كل حاجة تتعمل بـ session عمرها أسبوعين. تغيير الإيميل أو الباسورد، وتشغيل أو قفل الـ 2FA، ومسح الحساب، وتغيير بيانات السحب: دي محتاجة إثبات جديد إن صاحب الحساب هو اللي قاعد دلوقتي. ده اسمه step-up auth (أو re-authentication).

الفكرة: الـ session فيها [[authAt]] (إمتى آخر مرة كتب الباسورد أو الكود). الـ access token بيشيله، و [[requireRecentAuth]] بترفض لو عدى أكتر من ١٠ دقايق. والواجهة لما تشوف [[REAUTH_REQUIRED]] بتفتح نافذة «اكتب الباسورد»، وتبعته لـ [[/auth/reauth]]، وتعيد الطلب.`,
          example: R`export function requireRecentAuth(maxAgeSec = 600) {
  return (req, res, next) => {
    if (Date.now() / 1000 - (req.user.authAt ?? 0) > maxAgeSec) throw new AppError(401, "REAUTH_REQUIRED", "اكتب الباسورد تاني عشان تكمّل");
    next();
  };
}
router.post("/auth/reauth", requireAuth, reauthLimiter, async (req, res) => {
  const { password, code } = z.object({ password: z.string().max(128), code: z.string().optional() }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (!user.passwordHash || !(await argon2.verify(user.passwordHash, password))) throw new AppError(401, "BAD_PASSWORD", "الباسورد غلط");
  if (user.totpEnabledAt && !(code && (await checkTotp(user, code)))) throw new AppError(401, "BAD_CODE", "كود الـ 2FA غلط");
  const session = await db.session.update({ where: { id: req.user.sid }, data: { authAt: new Date() } });
  res.json({ data: { accessToken: signAccess(user, session.id, session.authAt) } });
});
router.delete("/me", requireAuth, requireRecentAuth(), deleteAccount);`,
          try: R`ضيف [[sid]] و [[authAt]] للـ access token ([[signAccess]])، وعمود [[authAt]] لجدول sessions. بعدين اعمل access token بإيدك [[authAt]] بتاعه من ساعة، وجرّب [[DELETE /me]]. وبعدين اعمل reauth وجرّب تاني. وفكّر: الـ refresh بعد ٢٠ دقيقة المفروض يحط [[authAt]] إيه في التوكن الجديد؟`,
          flag: "script",
          deep: {
            why: "أغلب الاستيلاء على الحسابات مش بيحصل بالباسورد. بيحصل بـ session مسروقة: cookie من جهاز مشترك، أو لابتوب مفتوح في كافيه، أو XSS. لو الـ session لوحدها تقدر تغيّر الإيميل، المهاجم بيغيّره، ويعمل «نسيت الباسورد» على إيميله هو، والحساب راح للأبد. الـ step-up بيخلي السرقة دي تعمل أضرار محدودة.",
            how: R`[[authAt]] بيتخزن في صف الـ session، مش في الـ JWT بس. الـ login بيحطه [[now()]] (الـ default في الجدول)، والـ reauth بيحدّثه. والـ refresh بيطلّع access token جديد بنفس [[authAt]] اللي في الـ session، مش الوقت الحالي. لو الـ refresh حطّ الوقت الحالي، يبقى أي session شغالة بتعمل step-up لوحدها كل ربع ساعة، والفكرة كلها راحت.

الـ access token بقى فيه [[sid]] (رقم الـ session) كمان، عشان الـ reauth يحدّث الـ session دي بالذات، وعشان «اخرج من الأجهزة التانية» يعرف أنهي session هي الحالية.

الـ 2FA جزء من الـ reauth: لو شغالة، الباسورد لوحده مش كفاية. وإلا اللي سرق الباسورد والـ session يقدر يقفل الـ 2FA.

المستخدم اللي داخل بجوجل ومعندوش باسورد: الـ reauth بتاعه إنه يعدّي على جوجل تاني مع [[prompt=login]] (جوجل تطلب الباسورد عندها)، وتتأكد من [[auth_time]] في الـ id_token إنه قريب. أو passkey لو عنده.

الـ throw جوه middleware عادي (مش async) بيوصل للـ error handler في Express 4 و 5. و ١٠ دقايق رقم شائع: كفاية يعمل كذا تغيير ورا بعض من غير ما يكتب الباسورد كل شوية.

GitHub بيعمل كده بالظبط («sudo mode»)، وجوجل بتطلب الباسورد قبل صفحة الأمان.`,
            when: "على كل endpoint بيغيّر طريقة الدخول أو التواصل (إيميل، باسورد، 2FA، ربط أو فك provider، passkeys)، أو بيطلّع فلوس، أو بيمسح حاجة مبترجعش.",
            mistakes: R`الـ refresh بيحدّث [[authAt]]. أو الـ step-up بالباسورد بس والـ 2FA شغالة. أو [[/auth/reauth]] من غير rate limit، فبقى endpoint تخمين باسورد تاني. أو إنك تعتمد على «الواجهة بتطلب الباسورد» والسيرفر مبيتحققش، يعني أي طلب مباشر يعدّي. أو إنك تطلب الباسورد القديم في فورم تغيير الباسورد بس، وتنسى الإيميل والـ 2FA.`
          },
          teach: R`## middleware بيسأل «إمتى آخر مرة أثبت إنه هو؟»

[[requireRecentAuth]] بيقرا [[authAt]] من الـ access token، ولو عدى أكتر من ١٠ دقايق بيرفض بـ [[REAUTH_REQUIRED]]. و [[/auth/reauth]] بياخد الباسورد (والكود لو فيه 2FA)، ويحدّث [[authAt]] في الـ session، ويرجّع access token جديد. جرّبناه على سيرفر دروس الـ auth (Express 5 و jsonwebtoken و argon2 و Prisma 7 و PostgreSQL 18، ويندوز 11). الـ access token فيه [[sid]] (رقم الـ session) و [[authAt]] (بالثواني من ١٩٧٠)، وجدول sessions فيه عمود [[authAt DateTime @default(now())]]، وعشان نجرّب «توكن من ساعة» وقّعنا توكن بإيدنا بنفس السر بتاع التجربة و [[authAt]] أقدم بـ ٣٦٠٠ ثانية.

~~~text الناتج: payload توكن بعد login
{"sub":"..","role":"STUDENT","sid":"..","authAt":1791454740,"iat":1791454740,...}
~~~

---

## ١. [[requireRecentAuth(maxAgeSec = 600)]]

~~~text
export function requireRecentAuth(maxAgeSec = 600) {
  return (req, res, next) => {
    if (Date.now() / 1000 - (req.user.authAt ?? 0) > maxAgeSec) throw new AppError(401, "REAUTH_REQUIRED", ...);
    next();
  };
}
~~~

- دالة **بترجّع** middleware. عشان كده بتتكتب [[requireRecentAuth()]] بأقواس في الـ route، وتقدر تدّيها مدة تانية: [[requireRecentAuth(300)]].
- [[= 600]] قيمة افتراضية: ١٠ دقايق بالثواني.
- [[Date.now() / 1000]] الوقت بالثواني (عشان [[authAt]] بالثواني).
- [[req.user.authAt ?? 0]] لو التوكن مفيهوش [[authAt]] (توكن قديم)، اعتبره من ١٩٧٠، يعني يترفض.
- الـ [[throw]] جوه middleware عادي بيوصل للـ errorHandler.

~~~text الناتج
DELETE /me (authAt -1h)   401 {"error":{"code":"REAUTH_REQUIRED","message":"اكتب الباسورد تاني عشان تكمّل"}}
~~~

---

## ٢. [[/auth/reauth]]

### [[router.post("/auth/reauth", requireAuth, reauthLimiter, ...)]]

لازم داخل (أي توكن سليم حتى لو قديم)، وعليه rate limit لأنه بيقبل باسوردات.

### [[z.object({ password: z.string().max(128), code: z.string().optional() })]]

[[code]] اختياري، للي عنده 2FA.

### [[if (!user.passwordHash || !(await argon2.verify(user.passwordHash, password))) throw ... BAD_PASSWORD]]

[[!user.passwordHash]] الأول: المستخدم اللي داخل بجوجل بس مفيش عنده باسورد، ومن غير الفحص ده [[argon2.verify(null, ...)]] كانت هترمي. (هو محتاج reauth من جوجل أو passkey، والـ deep بيشرحها.)

~~~text الناتج
reauth wrong password  401 {"error":{"code":"BAD_PASSWORD","message":"الباسورد غلط"}}
~~~

### [[if (user.totpEnabledAt && !(code && (await checkTotp(user, code)))) throw ... BAD_CODE]]

من جوه لبرة: [[checkTotp]] نفس دالة درس «2FA: الدخول». [[code && ...]] لو مفيش كود خالص النتيجة [[undefined]] (يعني false). و [[!( )]] قلبها. فالشرط: «الـ 2FA شغالة **و** الكود ناقص أو غلط». جرّبنا مستخدم عليه 2FA بالباسورد بس:

~~~text الناتج
2FA user, password only  401 {"error":{"code":"BAD_CODE","message":"كود الـ 2FA غلط"}}
~~~

### [[db.session.update({ where: { id: req.user.sid }, data: { authAt: new Date() } })]]

بنحدّث الـ session **الحالية** بس ([[sid]] من التوكن). باقي أجهزة المستخدم مبيتعملهاش step-up.

### [[res.json({ data: { accessToken: signAccess(user, session.id, session.authAt) } })]]

توكن جديد [[authAt]] بتاعه دلوقتي:

~~~text الناتج
reauth right password   200 {"data":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cC...
new authAt - now: 0
DELETE /me (new token)  204
~~~

---

## ٣. [[router.delete("/me", requireAuth, requireRecentAuth(), deleteAccount);]]

الترتيب مهم: [[requireAuth]] الأول عشان يحط [[req.user]]، وبعدين [[requireRecentAuth()]] يقرا منه. لو قلبتهم، [[req.user]] هيبقى [[undefined]] والسطر يرمي TypeError (500).

---

## ٤. السؤال: الـ refresh يحط [[authAt]] إيه؟

رجّعنا [[authAt]] الـ session ٢٠ دقيقة لورا، وعملنا refresh:

~~~text الناتج
after refresh, authAt age (s): 1200
DELETE /me (refreshed)  401 {"error":{"code":"REAUTH_REQUIRED",...}}
~~~

التوكن الجديد شايل [[authAt]] القديم (١٢٠٠ ثانية = ٢٠ دقيقة)، فالـ step-up اتطلب تاني. وده المطلوب. بس خلي بالك: الـ refresh في درس «refresh rotation» بيعمل **session جديدة**، و [[authAt]] فيها [[default(now())]]. عشان التجربة تطلع كده، [[issueTokens]] عندنا بتاخد [[session.authAt]] كـ parameter تالت وتكتبه في الـ session الجديدة. لو نسيت، كل refresh بيعمل step-up لوحده.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| وقت آخر إثبات | [[authAt]] في الـ session وفي الـ access token |
| الرفض | [[requireRecentAuth()]] بعد [[requireAuth]]، و 401 REAUTH_REQUIRED |
| الإثبات | [[/auth/reauth]]: باسورد، وكود لو فيه 2FA، و rate limit |
| بيحدّث مين | الـ session الحالية بس ([[sid]]) |
| الـ refresh | ينقل [[authAt]] القديم، مش الوقت الحالي |

وفي الواجهة: [[REAUTH_REQUIRED]] = افتح نافذة الباسورد، وابعت reauth، وعيد الطلب بالتوكن الجديد.`,
          lines: [
            "middleware بيتأكد إن آخر إثبات هوية حصل من قريب (١٠ دقايق افتراضي).",
            "دالة الـ middleware.",
            "عدى وقت أكتر من المسموح من [[authAt]] اللي في التوكن؟ اطلب reauth.",
            "غير كده كمّل.",
            "قفلة الدالة.",
            "قفلة.",
            "إثبات الهوية من جديد. داخل بالفعل، وعليه rate limit.",
            "الباسورد، والكود لو فيه 2FA.",
            "هات المستخدم.",
            "مفيش باسورد أو غلط؟ ارفض.",
            "الـ 2FA شغالة؟ الكود لازم يكون صح كمان.",
            "حدّث [[authAt]] في الـ session الحالية بس.",
            "رجّع access token جديد فيه [[authAt]] الجديد.",
            "قفلة.",
            "مثال: مسح الحساب محتاج دخول ومن قريب."
          ],
          sol: R`بالتوكن القديم: [[DELETE /me]] يرجع [[401 REAUTH_REQUIRED]]. بعد [[/auth/reauth]] بالباسورد (والكود لو فيه 2FA) بتاخد access token جديد، و [[DELETE /me]] بيه يعدّي.

إجابة السؤال: الـ refresh بعد ٢٠ دقيقة لازم يحط [[authAt]] بتاع الـ session نفسها (وقت الـ login أو آخر reauth)، يعني قديم، فالـ step-up يتطلب تاني. وخلي بالك إن الـ refresh بيعمل session **جديدة** (rotation)، وعمود [[authAt]] فيها default [[now()]]. فلازم تنقل القيمة القديمة: [[issueTokens(res, session.user, session.authAt)]]، و [[issueTokens]] تعمل الـ session الجديدة بنفس [[authAt]] وتحطه في التوكن. لو نادتها من غير التالت زي كود درس «refresh rotation»، كل refresh هيصفّر [[authAt]] والـ step-up يبقى ملوش لازمة.

لو جرّبت الـ reauth بالباسورد بس والـ 2FA شغالة، المفروض [[401 BAD_CODE]]. ولو عدّى، يبقى نسيت الشرط التاني.`
        },
        {
          cmd: "تغيير الإيميل والباسورد",
          title: "تغيير الإيميل والباسورد من غير ما تفتح باب للسرقة",
          desc: R`تغيير الباسورد: step-up الأول، وبعدين الـ hash الجديد، وإلغاء كل الـ sessions التانية (الجهاز الحالي يفضل داخل)، وإيميل «الباسورد اتغيّر، لو مش انت كلّمنا».

تغيير الإيميل ٣ خطوات: step-up، وبعدين لينك تأكيد للإيميل الجديد (الإيميل مبيتغيّرش غير لما يتأكد)، وفي نفس الوقت إيميل للعنوان القديم «فيه طلب تغيير». ولما التغيير يتم، إيميل تاني للقديم، وكل الـ sessions تتلغي.`,
          example: R`router.post("/me/password", requireAuth, requireRecentAuth(), async (req, res) => {
  const { newPassword } = z.object({ newPassword: z.string().min(8).max(128) }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  await db.$transaction([
    db.user.update({ where: { id: user.id }, data: { passwordHash: await argon2.hash(newPassword) } }),
    db.session.deleteMany({ where: { userId: user.id, id: { not: req.user.sid } } }),
  ]);
  await emailQueue.add("password-changed", { to: user.email });
  res.status(204).end();
});
router.post("/me/email", requireAuth, requireRecentAuth(), async (req, res) => {
  const { email } = z.object({ email: z.email().transform((e) => e.toLowerCase()) }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  const token = crypto.randomBytes(32).toString("base64url");
  await db.emailToken.create({ data: { userId: user.id, purpose: "CHANGE_EMAIL", email, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 3600e3) } });
  await emailQueue.add("confirm-new-email", { to: email, link: $__bt$__{config.WEB_ORIGIN}/confirm-email?token=$__{token}$__bt });
  await emailQueue.add("email-change-requested", { to: user.email, newEmail: email });
  res.status(202).end();
});`,
          try: R`اكتب [[POST /auth/confirm-email-change]] اللي اللينك بيوصله: يتحقق من التوكن (النوع [[CHANGE_EMAIL]]، مش مستخدم، مخلصش)، ويغيّر الإيميل ويأكده، ويلغي كل الـ sessions، ويبعت إيميل للعنوان القديم. بعدين جرّب: سجّل دخول من متصفحين، وغيّر الباسورد من واحد، وشوف التاني بيحصله إيه.`,
          flag: "script",
          deep: {
            why: "الإيميل هو مفتاح الحساب، لأن «نسيت الباسورد» بتروح عليه. اللي يغيّر الإيميل يملك الحساب. عشان كده ده أول حاجة المهاجم بيعملها بعد ما يدخل، وعشان كده التغيير لازم يعدّي على step-up، ويتأكد من الإيميل الجديد، وصاحب الإيميل القديم يعرف.",
            how: R`الإيميل الجديد مش بيتحفظ في جدول users غير بعد التأكيد. لو حفظته على طول، أي غلطة كتابة تقفل الحساب، ومهاجم معاه session يحط إيميله ويعمل استعادة في نفس الدقيقة. فالإيميل الجديد بيستنى في صف التوكن ([[email]])، والمدة ساعة بس.

إيميل العنوان القديم هو إنذار مبكر: «فيه طلب تغيير إيميلك لـ n***@x.com. لو مش انت، غيّر الباسورد». بعض المنتجات بتحط فيه لينك «مش أنا» بيلغي الطلب ويقفل الـ sessions.

التأكيد (الـ solCode) بيعمل transaction: التوكن مستخدم، والإيميل الجديد و [[emailVerifiedAt]]، وإلغاء كل الـ sessions (حتى الحالية، لأن التأكيد ممكن يتفتح من جهاز تاني). ولو الإيميل الجديد اتسجّل بيه حد تاني في النص، القيد unique بيرفض والـ handler بيرجّع 409.

تغيير الباسورد: الـ sessions التانية بتتلغي لأن سبب التغيير غالبًا «حاسس إن حد عرف الباسورد». والحالية بتفضل عشان المستخدم ميطلعش. والـ access tokens بتاعة الأجهزة التانية بتفضل شغالة لحد ما تخلص (١٥ دقيقة)، ودي الحدود المعروفة للـ JWT. لو محتاج قفل فوري، خلي requireAuth يتأكد إن الـ [[sid]] مش ملغي (من Redis مثلًا).

الـ step-up هنا بيغني عن «اكتب الباسورد القديم» في الفورم. وفي الحالتين، الإيميلات بتروح queue.`,
            when: "في صفحة الإعدادات لأي منتج فيه حسابات. ولو المنتج فيه فلوس، ممكن تضيف فترة انتظار (٢٤ ساعة مثلًا) قبل ما الإيميل الجديد يقدر يعمل سحب.",
            mistakes: R`تغيير الإيميل فورًا من غير تأكيد. أو لينك التأكيد يروح للإيميل القديم. أو متبعتش أي حاجة للقديم. أو تغيير الباسورد من غير إلغاء الـ sessions. أو إلغاء الـ session الحالية كمان فالمستخدم يطلع ويستغرب. أو إنك تنسى تحدّث إيميل Stripe أو مزوّد الإيميلات بعد التغيير.`
          },
          teach: R`## ٣ routes: الباسورد، وطلب تغيير الإيميل، وتأكيده

[[/me/password]] بيغيّر الباسورد ويطلّع كل الأجهزة التانية. [[/me/email]] مبيغيّرش الإيميل، بيبعت لينك للإيميل الجديد وتنبيه للقديم. و [[/auth/confirm-email-change]] (الـ solCode) هو اللي بيغيّره فعلًا لما اللينك يتفتح. جرّبناهم على سيرفر دروس الـ auth (Express 5 و argon2 و Prisma 7 و PostgreSQL 18، ويندوز 11)، بمستخدم داخل من «متصفحين» (login مرتين: A و B)، و [[emailQueue]] بيطبع الإيميلات.

---

## ١. [[/me/password]]

### [[router.post("/me/password", requireAuth, requireRecentAuth(), ...)]]

داخل، ومن قريب (درس step-up). ده اللي بيغني عن «اكتب الباسورد القديم» في الفورم.

### [[z.object({ newPassword: z.string().min(8).max(128) })]]

نفس قواعد التسجيل.

### الـ transaction

~~~text
db.user.update({ where: { id: user.id }, data: { passwordHash: await argon2.hash(newPassword) } }),
db.session.deleteMany({ where: { userId: user.id, id: { not: req.user.sid } } }),
~~~

- [[await argon2.hash(newPassword)]] بيتحسب قبل ما الـ array يتبني، فالـ transaction نفسها بتستلم hash جاهز.
- [[id: { not: req.user.sid }]] كل الـ sessions **ما عدا** الحالية ([[sid]] من التوكن).
- [[deleteMany]] مش [[updateMany]] بـ [[revokedAt]]. المثال الأصلي كان بيعلّم [[revokedAt]]، وجرّبناه كده الأول:

~~~text الناتج (النسخة القديمة)
A: change password      204
B: refresh              401 {"error":{"code":"TOKEN_REUSED",...}}
A: refresh              401 {"error":{"code":"TOKEN_REUSED",...}}
~~~

الـ refresh (درس rotation) بيعتبر أي session ملغية «توكن مسروق» وبيلغي **كل** الـ sessions، فـ A اللي غيّر الباسورد طلع هو كمان. بعد ما خليناها مسح:

~~~text الناتج
A: change password      204
B: access token still   200 {"data":{"me":"cmuzdyb0s0000lsiel4b59l2e"}}
B: refresh              401 {"error":{"code":"NO_SESSION","message":"سجّل دخول تاني"}}
A: refresh              200 {"data":{"accessToken":...
~~~

- B لسه شغال بالـ access token لحد ما يخلص (لحد ١٥ دقيقة): ده حد الـ JWT المعروف.
- أول refresh لـ B مبيلاقيش session: يدخل من الأول.
- A فضل داخل.

### [[emailQueue.add("password-changed", { to: user.email })]] و [[res.status(204).end()]]

~~~text ترمنال السيرفر
EMAIL password-changed {"to":"chg@example.com"}
~~~

---

## ٢. [[/me/email]]

### [[z.object({ email: z.email().transform((e) => e.toLowerCase()) })]]

بعتنا [[Chg.New@Example.com]] واتخزن [[chg.new@example.com]].

### [[db.emailToken.create({ data: { userId, purpose: "CHANGE_EMAIL", email, tokenHash: sha256(token), expiresAt: ... 3600e3 } })]]

الإيميل الجديد مستني في صف التوكن، و [[purpose: "CHANGE_EMAIL"]]، والمدة ساعة. وجدول users لسه زي ما هو:

~~~text الناتج
A: change email      202
users.email still: chg@example.com
~~~

### الإيميلين

~~~text ترمنال السيرفر
EMAIL confirm-new-email {"to":"chg.new@example.com","link":"http://localhost:5173/confirm-email?token=<..>"}
EMAIL email-change-requested {"to":"chg@example.com","newEmail":"chg.new@example.com"}
~~~

اللينك للجديد (يثبت إنه بتاعه)، والتنبيه للقديم (لو مش هو يتحرك بدري).

---

## ٣. [[/auth/confirm-email-change]] (الـ solCode)

### الفحص

[[!row || row.purpose !== "CHANGE_EMAIL" || row.usedAt || row.expiresAt < new Date()]]: جرّبنا توكن تأكيد إيميل عادي (VERIFY) على الـ route ده:

~~~text الناتج
{"error":{"code":"BAD_TOKEN","message":"اللينك انتهى"}} 400
~~~

### [[const old = await db.user.findUniqueOrThrow(...)]]

بنقرا الإيميل القديم **قبل** التغيير، عشان نبعتله التنبيه الأخير.

### الـ transaction

~~~text
await db.$transaction(async (t) => {
  const { count } = await t.emailToken.updateMany({ where: { id: row.id, usedAt: null }, data: { usedAt: new Date() } });
  if (count === 0) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى");
  await t.user.update({ where: { id: row.userId }, data: { email: row.email, emailVerifiedAt: new Date() } });
  await t.session.updateMany({ where: { userId: row.userId, revokedAt: null }, data: { revokedAt: new Date() } });
});
~~~

- السطر الأول بيحرق التوكن **بشرط** إنه لسه مش مستخدم. النسخة الأولى كانت [[update({ where: { id: row.id } })]] من غير شرط، وجربنا فتح اللينك مرتين في نفس اللحظة: الاتنين رجعوا [[204]] واتبعت إيميل [[email-changed]] مرتين. بالشرط:

~~~text الناتج
c1 204
{"error":{"code":"BAD_TOKEN","message":"اللينك انتهى"}} c2 400
~~~

- [[email: row.email, emailVerifiedAt: new Date()]] الإيميل الجديد، ومتأكد لأنه فتح اللينك.
- كل الـ sessions تتلغي، حتى الحالية (اللينك ممكن يتفتح من جهاز تاني). هنا مفيش حد هيفضل داخل، فالـ reuse detection مش مشكلة.

ولو الإيميل الجديد اتسجّل بيه حد في النص: طلبنا تغيير لإيميل مستخدم موجود وأكدنا:

~~~text الناتج
{"error":{"code":"CONFLICT","message":"موجود قبل كده"}} 409
~~~

[[@unique]] رمى P2002، والـ transaction كلها اترجعت (التوكن ماتحرقش).

---

## الخلاصة

| | تغيير الباسورد | تغيير الإيميل |
|---|---|---|
| قبلها | step-up | step-up |
| بيحصل إمتى | فورًا | بعد ما اللينك يتفتح |
| الـ sessions | التانية تتمسح، والحالية تفضل | كلها تتلغي بعد التأكيد |
| الإيميلات | تنبيه للإيميل | لينك للجديد، وتنبيه للقديم مرتين (طلب، وتم) |
| التوكن | مفيش | [[CHANGE_EMAIL]]، ساعة، مرة واحدة بشرط [[usedAt: null]] |`,
          lines: [
            "تغيير الباسورد: داخل، ومن قريب.",
            "الباسورد الجديد بنفس قواعد التسجيل.",
            "هات المستخدم.",
            "في transaction واحدة:",
            "الـ hash الجديد...",
            "...وامسح كل الـ sessions ما عدا الحالية. مسح مش [[revokedAt]]: الـ refresh بيعتبر أي session ملغية سرقة (reuse) وبيلغي كل الأجهزة، فالجهاز الحالي كان هيطلع هو كمان.",
            "قفلة الـ transaction.",
            "إيميل تنبيه لصاحب الحساب.",
            "تمام.",
            "قفلة.",
            "تغيير الإيميل: داخل، ومن قريب.",
            "الإيميل الجديد small.",
            "هات المستخدم.",
            "توكن عشوائي.",
            "خزّنه ومعاه الإيميل الجديد، وعمره ساعة. الإيميل في users لسه زي ما هو.",
            "لينك التأكيد يروح للإيميل الجديد.",
            "وتنبيه للإيميل القديم.",
            "202: مستنيين التأكيد.",
            "قفلة."
          ],
          sol: R`بعد ما تفتح لينك التأكيد: الرد 204، والإيميل في users بقى الجديد و [[emailVerifiedAt]] اتملى، وعدد الـ sessions المفتوحة بقى صفر، وفي الـ queue إيميل [[email-changed]] للعنوان القديم. لو فتحت نفس اللينك تاني: [[400 BAD_TOKEN]].

تغيير الباسورد من متصفح: التاني بيفضل شغال لحد ما الـ access token بتاعه يخلص (لحد ١٥ دقيقة)، وبعدين الـ refresh بيرجع [[401 NO_SESSION]] وبيطلع لصفحة الدخول. المتصفح اللي غيّرت منه بيفضل داخل. ولو الـ sessions التانية اتعلّمت [[revokedAt]] بدل ما تتمسح، الـ refresh بتاع التاني هيرجع [[TOKEN_REUSED]] ويلغي كل الـ sessions، والمتصفح اللي غيّرت منه يطلع هو كمان. جرّبناها كده الأول وده اللي حصل.

الغلطة الشائعة: تستخدم [[update]] بدل التحقق من [[purpose]]، فلينك تأكيد إيميل عادي (VERIFY) يتقبل كتغيير إيميل.`,
          solCode: R`router.post("/auth/confirm-email-change", async (req, res) => {
  const row = await db.emailToken.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } });
  if (!row || row.purpose !== "CHANGE_EMAIL" || row.usedAt || row.expiresAt < new Date()) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى");
  const old = await db.user.findUniqueOrThrow({ where: { id: row.userId } });
  await db.$transaction(async (t) => {
    const { count } = await t.emailToken.updateMany({ where: { id: row.id, usedAt: null }, data: { usedAt: new Date() } });
    if (count === 0) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى");
    await t.user.update({ where: { id: row.userId }, data: { email: row.email, emailVerifiedAt: new Date() } });
    await t.session.updateMany({ where: { userId: row.userId, revokedAt: null }, data: { revokedAt: new Date() } });
  });
  await emailQueue.add("email-changed", { to: old.email, newEmail: row.email });
  res.status(204).end();
});`
        },
        {
          cmd: "CAPTCHA و lockout",
          title: "Turnstile و lockout: وقف تخمين الباسوردات من غير ما تقفل على الناس",
          desc: R`الـ rate limit بالـ IP (اللي في درس الـ login) مش كفاية: المهاجم عنده آلاف الـ IPs (botnet أو proxies). فبنضيف عداد لكل إيميل في Redis: بعد ٥ محاولات غلط، الـ login بيطلب CAPTCHA. وبعد ٢٠، الإيميل ده بيتقفل ربع ساعة، وصاحبه بياخد إيميل.

الـ CAPTCHA هنا Cloudflare Turnstile: widget في الواجهة بيطلّع token، والسيرفر بيتحقق منه بـ POST لـ [[siteverify]]. والتوكن بيعيش ٥ دقايق وينفع مرة واحدة.`,
          example: R`export async function turnstileOk(token, ip) {
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body: new URLSearchParams({ secret: config.TURNSTILE_SECRET, response: token, remoteip: ip }),
  });
  const out = await r.json();
  return out.success === true && (out.action === "login" || out.metadata?.result_with_testing_key === true);
}
router.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password, captcha } = Login.parse(req.body);
  const failKey = $__btlogin:fail:$__{sha256(email)}$__bt;
  const fails = Number(await redis.get(failKey)) || 0;
  if (fails >= 20) throw new AppError(429, "LOCKED", "محاولات كتير. جرّب بعد ربع ساعة أو غيّر الباسورد");
  if (fails >= 5 && !(await turnstileOk(captcha, req.ip))) throw new AppError(400, "CAPTCHA_REQUIRED", "أكّد إنك مش روبوت");
  const user = await db.user.findUnique({ where: { email } });
  const ok = await argon2.verify(user?.passwordHash ?? DUMMY_HASH, password);
  if (!user || !ok) {
    const n = await redis.incr(failKey);
    if (n === 1) await redis.expire(failKey, 15 * 60);
    if (n === 20 && user) await emailQueue.add("login-locked", { to: user.email });
    throw new AppError(401, "BAD_CREDENTIALS", "الإيميل أو الباسورد غلط");
  }
  await redis.del(failKey);
  // ... بعد كده الـ 2FA أو issueTokens زي ما هو
});`,
          try: R`استخدم مفاتيح Turnstile التجريبية: الـ site key [[1x00000000000000000000AA]] في الواجهة بيعدّي دايمًا، والـ secret [[1x0000000000000000000000000000000AA]] بيقبل، و [[2x0000000000000000000000000000000AA]] بيرفض. اكتب باسورد غلط ٥ مرات، وشوف الواجهة بتعرض الـ widget. بعدين كرر نفس الكلام بإيميل مش متسجّل خالص، وقارن الردود.`,
          flag: "script",
          deep: {
            why: "هجمات credential stuffing بتجرّب ملايين (إيميل، باسورد) من تسريبات مواقع تانية، من IPs كتير، ومحاولة أو اتنين لكل حساب. الـ rate limit بالـ IP مش بيشوفها. والعداد لكل حساب بيشوف التخمين المركّز على حساب واحد. والاتنين مع بعض بيغطوا أغلب الهجمات.",
            how: R`العداد بالإيميل مش بالمستخدم. الـ key هو [[sha256(email)]] سواء الإيميل متسجّل أو لأ. ليه؟ لو الـ CAPTCHA بيظهر للإيميلات المتسجّلة بس، المهاجم يعرف مين عنده حساب من مجرد ظهور الـ CAPTCHA. كده الاتنين بيتعاملوا نفس المعاملة. والـ hash عشان الإيميلات متتخزنش في Redis نص.

[[INCR]] ذري، و [[EXPIRE]] أول مرة بس، فالنافذة ١٥ دقيقة من أول غلطة. ولما الدخول ينجح العداد بيتمسح.

ليه CAPTCHA قبل الـ lockout؟ الـ lockout الصريح ليه عيب كبير: أي حد يعرف إيميلك يقدر يقفل حسابك بـ ٥ محاولات غلط، وده DoS على مستخدم بعينه. الـ CAPTCHA بتوقف السكربتات، والبني آدم يعدّي عادي. والقفل بعد ٢٠ بس، ومؤقت، ومعاه إيميل لصاحب الحساب (وفيه لينك استعادة الباسورد).

Turnstile: الواجهة بتحط [[<div class="cf-turnstile" data-sitekey="..." data-action="login">]]، والـ widget بيحط التوكن في حقل مخفي اسمه [[cf-turnstile-response]]. والسيرفر لازم يتحقق، لأن التوكن من الواجهة لوحده ممكن يتزوّر. و [[action]] بيتأكد إن التوكن اتعمل لفورم الـ login مش لفورم تاني. وخلي بالك: [[siteverify]] ممكن يفشل (شبكة)، فقرر هتعمل إيه: الأمان إنك ترفض.

و [[req.ip]] صح بس لو [[trust proxy]] متظبط ورا Nginx أو Cloudflare، وإلا كل الناس ليهم IP الـ proxy (الدرس «security baseline»).

ومفيش CAPTCHA يوقف بني آدم مدفوعله يحلها. ده خط دفاع مش حل كامل. الأقوى: باسوردات مش في تسريبات (API زي Have I Been Pwned بـ k-anonymity وقت التسجيل)، و 2FA، و passkeys.`,
            when: "على الـ login، والتسجيل، و «نسيت الباسورد»، وأي فورم عام بيبعت إيميلات. وابدأ بالـ CAPTCHA بعد عدد محاولات، مش من أول مرة، عشان متضايقش كل الناس.",
            mistakes: R`CAPTCHA من غير تحقق على السيرفر. أو lockout دايم بعد ٥ محاولات (DoS على أي حد). أو عداد بالـ user id فقط، فالإيميلات المش متسجّلة بتتعامل مختلف. أو رسالة «الحساب اتقفل» للإيميلات المتسجّلة بس. أو تنسى تمسح العداد بعد الدخول الصح. أو [[trust proxy]] مش متظبط، فالـ rate limit بالـ IP بيقفل كل الناس مرة واحدة.`
          },
          teach: R`## عداد لكل إيميل في Redis

الـ login بقى بيعد المحاولات الغلط لكل إيميل في Redis، لمدة ربع ساعة من أول غلطة. من ٥ لفوق لازم توكن CAPTCHA سليم، ومن ٢٠ لفوق الإيميل مقفول لحد ما العداد يخلص. جرّبناه على سيرفر دروس الـ auth (Express 5 و ioredis 6 مع Redis 8 في Docker، و Prisma 7 و PostgreSQL 18، ويندوز 11). والتحقق من Turnstile اتعمل فعلًا مع سيرفر Cloudflare، بمفاتيح الاختبار العامة اللي في توثيقهم، والتوكن التجريبي [[XXXX.DUMMY.TOKEN.XXXX]] (اللي الـ widget بيطلّعه مع الـ site key التجريبي). الـ widget نفسه في المتصفح من توثيق Cloudflare.

---

## ١. [[turnstileOk(token, ip)]]

### [[if (!token) return false;]]

مفيش توكن؟ متكلّمش Cloudflare أصلًا.

### [[fetch(".../turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret, response: token, remoteip: ip }) })]]

- [[secret]] المفتاح السري (على السيرفر بس).
- [[response]] التوكن اللي الـ widget حطه في الفورم.
- [[remoteip]] اختياري: Cloudflare بتقارنه بالـ IP اللي حل الـ challenge.

ده الرد الحقيقي اللي رجع:

~~~text الناتج (secret 1x...AA)
{"challenge_ts":"2026-10-08T10:22:15.187Z","error-codes":[],"hostname":"example.com","metadata":{"result_with_testing_key":true},"success":true}
~~~

~~~text الناتج (secret 2x...AA)
{"error-codes":["invalid-input-response"],"success":false,"messages":[],"metadata":{"result_with_testing_key":true}}
~~~

### [[return out.success === true && (out.action === "login" || out.metadata?.result_with_testing_key === true);]]

- [[success === true]] بالظبط.
- [[action === "login"]]: الـ widget اتعمل بـ [[data-action="login"]]، فالتوكن ده مينفعش يتاخد من فورم التسجيل مثلًا.
- بص على الرد التجريبي فوق: **مفيهوش [[action]] خالص**. لو الشرط [[action === "login"]] لوحده، التوكن التجريبي كان هيترفض دايمًا والتجربة مش هتعدّي. عشان كده الشرط بيقبل [[result_with_testing_key]] كمان. و [[?.]] لو [[metadata]] مش موجود.

---

## ٢. أول الـ login

### [[const failKey = $__btlogin:fail:$__{sha256(email)}$__bt;]]

اسم المفتاح في Redis: [[login:fail:]] وبعده hash الإيميل. الـ [[:]] عادة في Redis لتقسيم الأسامي (زي فولدرات). والـ hash عشان الإيميلات متتخزنش نص، ولأنه بيتحسب لأي إيميل، متسجّل أو لأ.

### [[const fails = Number(await redis.get(failKey)) || 0;]]

[[redis.get]] بترجّع نص ([["7"]]) أو [[null]]. [[Number(null)]] = 0، و [[Number("7")]] = 7. و [[|| 0]] احتياطي لو طلع [[NaN]].

### [[if (fails >= 20) throw ... LOCKED]] و [[if (fails >= 5 && !(await turnstileOk(...))) throw ... CAPTCHA_REQUIRED]]

الترتيب مهم: القفل الأول (من غير ما نكلّم Cloudflare)، وبعدين الـ CAPTCHA. ومن ٥ لـ ١٩ كل محاولة محتاجة توكن جديد.

---

## ٣. لما الباسورد غلط

~~~text
const n = await redis.incr(failKey);
if (n === 1) await redis.expire(failKey, 15 * 60);
if (n === 20 && user) await emailQueue.add("login-locked", { to: user.email });
~~~

- [[INCR]] بيزوّد ١ ويرجّع القيمة الجديدة، في خطوة واحدة (atomic)، ولو المفتاح مش موجود بيبدأه من 0. فطلبين مع بعض مبيضيعوش زيادة.
- [[EXPIRE]] أول مرة بس: المفتاح يتمسح بعد ٩٠٠ ثانية من **أول** غلطة.
- الإيميل لصاحب الحساب عند ٢٠ بالظبط، ولو الحساب موجود.

### [[await redis.del(failKey);]]

دخل صح؟ العداد يتمسح.

---

## ٤. التجربة

### إيميل متسجّل

~~~text الناتج
 1 401 BAD_CREDENTIALS
 2 401 BAD_CREDENTIALS
 3 401 BAD_CREDENTIALS
 4 401 BAD_CREDENTIALS
 5 401 BAD_CREDENTIALS
 6 400 CAPTCHA_REQUIRED     <- الباسورد الصح، من غير captcha
 7 200 OK                   <- الباسورد الصح + التوكن التجريبي
~~~

### إيميل مش متسجّل خالص

~~~text الناتج
 1-5   401 BAD_CREDENTIALS
 6     400 CAPTCHA_REQUIRED
 7-21  401 BAD_CREDENTIALS   (مع توكن، والعداد بيكمّل لحد 20)
 22    429 LOCKED
 23    429 LOCKED            <- حتى بالباسورد الصح، القفل قبل أي فحص
~~~

نفس الطريق بالظبط، فمحدش يعرف مين متسجّل من شكل الردود. ومفيش إيميل [[login-locked]] اتبعت (مفيش [[user]]).

### العداد في Redis

~~~bash
docker exec teach-arch0102-redis redis-cli GET login:fail:79783106d8827...
docker exec teach-arch0102-redis redis-cli TTL login:fail:79783106d8827...
~~~

~~~text الناتج
20
897
~~~

[[TTL]] (time to live): فاضل ٨٩٧ ثانية ويتمسح. لو رجع [[-1]] يبقى [[EXPIRE]] متعملش والعداد عايش للأبد.

### secret بيرفض

مع [[TURNSTILE_SECRET=2x...]] و ٥ غلطات قبلها، الباسورد الصح ومعاه التوكن:

~~~text الناتج
400 CAPTCHA_REQUIRED
~~~

---

## الخلاصة

| العداد | اللي بيحصل |
|---|---|
| 0 لـ 4 | login عادي |
| 5 لـ 19 | لازم توكن Turnstile سليم (السيرفر يتحقق) |
| 20 | 429 LOCKED، وإيميل لصاحب الحساب لو موجود |
| بعد ١٥ دقيقة من أول غلطة | العداد بيتمسح لوحده (TTL) |
| login صح | العداد بيتمسح |

العداد بالإيميل (hash) مش بالـ user id، والـ rate limit بالـ IP فوقه.`,
          lines: [
            "دالة التحقق من توكن Turnstile.",
            "مفيش توكن؟ فشل.",
            "ابعته لـ Cloudflare...",
            "...مع الـ secret والتوكن والـ IP.",
            "قفلة الطلب.",
            "اقرا الرد.",
            "لازم ينجح، ويكون معمول لفورم الـ login. مفاتيح الاختبار مبترجّعش [[action]] خالص، بس بترجّع [[metadata.result_with_testing_key]]، فبنقبلها عشان التجربة المحلية تشتغل.",
            "قفلة.",
            "الـ login، وعليه rate limit بالـ IP زي الأول.",
            "الإيميل والباسورد، وتوكن الـ CAPTCHA لو موجود.",
            "مفتاح العداد: hash للإيميل، متسجّل أو لأ.",
            "عدد المحاولات الغلط في آخر ربع ساعة.",
            "٢٠ أو أكتر؟ مقفول مؤقتًا.",
            "٥ أو أكتر؟ لازم CAPTCHA سليم.",
            "كمّل الـ login العادي.",
            "نفس التحقق بوقت ثابت.",
            "غلط؟",
            "زوّد العداد.",
            "أول غلطة؟ النافذة ١٥ دقيقة.",
            "وصل ٢٠ والحساب موجود؟ نبّه صاحبه.",
            "نفس الرسالة الموحدة.",
            "قفلة.",
            "دخل صح؟ صفّر العداد.",
            "قفلة."
          ],
          sol: R`الـ ٥ محاولات الأولى ترجع [[401 BAD_CREDENTIALS]]. السادسة بالباسورد الصح ومن غير captcha ترجع [[400 CAPTCHA_REQUIRED]]، ومع توكن الـ widget التجريبي تعدّي. والإيميل المش متسجّل بيمشي نفس الطريق بالظبط: ٥ مرات 401، وبعدين CAPTCHA_REQUIRED، وبعد ٢٠ [[429 LOCKED]]. ده المقصود، عشان محدش يعرف مين متسجّل.

مع الـ secret [[2x...]] أي توكن بيترفض وبيرجع [[success: false]] و [[error-codes: ["invalid-input-response"]]]، فالـ login بيفضل CAPTCHA_REQUIRED. وخلي بالك: رد مفاتيح الاختبار مفيهوش [[action]] (جرّبناه: [[{"success":true,"hostname":"example.com","metadata":{"result_with_testing_key":true},...}]])، فلو الفحص [[out.action === "login"]] بس، التوكن التجريبي عمره ما هيعدّي. عشان كده السطر بيقبل [[result_with_testing_key]] كمان، والـ secret التجريبي ده عمره ما يتحط في الإنتاج.

لو حاسس إن CAPTCHA_REQUIRED بيظهر من غير سبب، اتأكد إن الـ TTL اتحط ([[redis-cli TTL login:fail:...]])، ولو رجع [[-1]] يبقى العداد عايش للأبد.`
        },
        {
          cmd: "passkeys",
          title: "passkeys باختصار: دخول من غير باسورد ومن غير phishing",
          desc: R`الـ passkey (معيار WebAuthn) مفتاح خاص بيتعمل على جهاز المستخدم (بصمة، أو Face ID، أو PIN الجهاز)، ومتزامن غالبًا في iCloud Keychain أو Google Password Manager. السيرفر بيخزن المفتاح العام بس. وفي الدخول، السيرفر بيبعت challenge عشوائي، والجهاز بيوقّعه، والسيرفر بيتحقق بالمفتاح العام.

المكتبة المشهورة في Node هي SimpleWebAuthn: [[@simplewebauthn/server]] على السيرفر و [[@simplewebauthn/browser]] في الواجهة. الفلو: options من السيرفر، و [[startRegistration]] في المتصفح، و verify على السيرفر.`,
          example: R`import { generateRegistrationOptions, verifyRegistrationResponse } from "@simplewebauthn/server";

router.post("/me/passkeys/options", requireAuth, requireRecentAuth(), async (req, res) => {
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id }, include: { passkeys: true } });
  const options = await generateRegistrationOptions({
    rpName: "myapp", rpID: config.RP_ID, userName: user.email, attestationType: "none",
    excludeCredentials: user.passkeys.map((p) => ({ id: p.credentialId })),
    authenticatorSelection: { residentKey: "preferred", userVerification: "preferred" },
  });
  await redis.set($__btwebauthn:$__{user.id}$__bt, options.challenge, "EX", 300);
  res.json({ data: options });
});
router.post("/me/passkeys", requireAuth, async (req, res) => {
  const expectedChallenge = await redis.getdel($__btwebauthn:$__{req.user.id}$__bt);
  const { verified, registrationInfo } = await verifyRegistrationResponse({ response: req.body, expectedChallenge, expectedOrigin: config.WEB_ORIGIN, expectedRPID: config.RP_ID }).catch(() => ({ verified: false }));
  if (!verified) throw new AppError(400, "PASSKEY_FAILED", "مقدرناش نسجّل المفتاح");
  const { credential } = registrationInfo;
  await db.passkey.create({ data: { userId: req.user.id, credentialId: credential.id, publicKey: Buffer.from(credential.publicKey), counter: credential.counter, transports: credential.transports ?? [] } });
  res.status(201).end();
});`,
          try: R`اعمل جدول [[Passkey]] (credentialId unique، و publicKey Bytes، و counter، و transports، و createdAt، و lastUsedAt). سجّل passkey من Chrome على localhost ([[rpID: "localhost"]] و [[expectedOrigin: "http://localhost:5173"]])، وجرّب في DevTools من More tools ثم WebAuthn تعمل virtual authenticator. بعدين اكتب نص الدخول: [[generateAuthenticationOptions]] و [[verifyAuthenticationResponse]].`,
          flag: "script",
          deep: {
            why: "الـ passkey هو الحاجة الوحيدة اللي بتقفل phishing فعلًا: المتصفح بيربط المفتاح بالدومين ([[rpID]])، فموقع مزيف على [[myapp-login.com]] مش هيقدر يطلب توقيع لـ [[myapp.com]] أصلًا. ومفيش سر على السيرفر يتسرب، لأن المفتاح العام ملوش قيمة لوحده. والمستخدم مش محتاج يفتكر حاجة.",
            how: R`الـ challenge: عشوائي من السيرفر، بيتخزن ٥ دقايق ([[getdel]] بيقراه ويمسحه في خطوة واحدة، فمينفعش يتستخدم مرتين). الجهاز بيوقّعه مع الـ origin، و [[verifyRegistrationResponse]] بتتأكد من الـ challenge والـ origin والـ rpID والتوقيع.

[[rpID]] هو الدومين ([[myapp.com]])، ولازم الصفحة تبقى عليه أو على subdomain منه. و [[attestationType: "none"]] معناها مش مهتمين نعرف نوع الجهاز، وده المناسب لأغلب المنتجات. و [[excludeCredentials]] بيمنع نفس الجهاز يتسجّل مرتين.

[[userName]] هو اللي بيظهر في قايمة الـ passkeys عند المستخدم. و [[userID]] لو مبعتتوش، المكتبة بتعمل واحد عشوائي. ولو هتستخدم discoverable login (المستخدم يضغط «ادخل بـ passkey» من غير ما يكتب إيميل)، خزّن [[options.user.id]] عشان تعرف صاحب المفتاح وقت الدخول.

الـ [[counter]] بيتخزن ويتحدث مع كل دخول. الـ passkeys المتزامنة غالبًا بترجّعه صفر دايمًا، وده طبيعي.

الدخول: [[generateAuthenticationOptions({ rpID })]]، والواجهة [[startAuthentication]]، والسيرفر [[verifyAuthenticationResponse]] مع [[credential]] المتخزن. والنتيجة session عادية، زي الـ login بالظبط.

إمتى تضيفه؟ بعد ما الـ auth الأساسي والـ 2FA يبقوا ثابتين. ابدأ بيه كطريقة إضافية في الإعدادات («ضيف passkey»)، مش بديل للباسورد. وبعدين زرار «ادخل بـ passkey» في صفحة الدخول. والمكتبة بتتحدث كتير (نسخة 13 و 14 غيّروا أسماء حقول)، فارجع لتوثيقها وقت التنفيذ.`,
            when: "منتج فيه حسابات قيّمة (فلوس، أو داتا شركات)، أو جمهور بيستخدم موبايلات حديثة. وللأدمن أحسن من TOTP. ولو المستخدمين عندهم passkey، ممكن يعتبر عامل واحد كفاية بدل باسورد + 2FA.",
            mistakes: R`challenge ثابت أو متخزن في الواجهة. أو rpID مختلف بين التسجيل والدخول (www وبدونها). أو إنك تجرب على IP بدل دومين (WebAuthn محتاج HTTPS أو localhost). أو [[publicKey]] يتخزن كنص من غير encoding صح. أو إنك تشيل الباسورد والإيميل خالص من أول يوم، والمستخدم غيّر موبايله ومعهوش مزامنة.`
          },
          teach: R`## تسجيل passkey: options، وبعدين verify

[[/me/passkeys/options]] بيطلّع إعدادات التسجيل وفيها challenge عشوائي، ويحفظ الـ challenge في Redis ٥ دقايق. المتصفح بيعمل المفتاح ([[startRegistration]])، ويبعت النتيجة لـ [[/me/passkeys]]، والسيرفر يتحقق ويخزن المفتاح العام. جرّبناه بـ @simplewebauthn/server 14 على سيرفر دروس الـ auth (Express 5 و ioredis و Prisma 7 و PostgreSQL 18، ويندوز 11)، والمتصفح Chromium (Playwright) بـ **virtual authenticator** من بروتوكول DevTools (نفس اللي في DevTools من More tools ثم WebAuthn)، و @simplewebauthn/browser 14 من jsdelivr. الصفحة كانت على [[http://localhost:6017]]، فخلّينا [[WEB_ORIGIN]] بنفس القيمة.

---

## ١. [[/me/passkeys/options]]

### [[requireAuth, requireRecentAuth()]]

إضافة طريقة دخول = عملية حساسة (درس step-up).

### [[include: { passkeys: true }]]

هات المفاتيح الموجودة عشان [[excludeCredentials]].

### [[generateRegistrationOptions({ ... })]]

| الخيار | القيمة | معناه |
|---|---|---|
| [[rpName]] | [["myapp"]] | الاسم اللي بيظهر للمستخدم. rp = relying party = موقعك |
| [[rpID]] | [["localhost"]] | الدومين اللي المفتاح مربوط بيه. موقع تاني مش هيقدر يستخدمه |
| [[userName]] | الإيميل | بيظهر في قايمة الـ passkeys |
| [[attestationType: "none"]] | | مش عايزين إثبات نوع الجهاز |
| [[excludeCredentials]] | المفاتيح المتسجّلة | نفس الجهاز ميتسجّلش مرتين |
| [[residentKey: "preferred"]] | | مفتاح discoverable لو ينفع (دخول من غير ما يكتب إيميل) |
| [[userVerification: "preferred"]] | | بصمة أو PIN لو ينفع |

اللي رجع فعلًا (مختصر):

~~~text الناتج
rp: {"name":"myapp","id":"localhost"}
user: {"name":"four@example.com","displayName":"", id: 43 حرف}
challenge: 43 حرف
pubKeyCredParams algs: [-48, -8, -7, -257]
timeout: 60000, attestation: "none"
authenticatorSelection: {"residentKey":"preferred","userVerification":"preferred","requireResidentKey":false}
excludeCredentials: []
~~~

- [[user.id]] مبعتناهوش، فالمكتبة عملت واحد عشوائي.
- [[pubKeyCredParams]] أنواع المفاتيح المقبولة بأرقام COSE بالترتيب المفضّل: [[-8]] Ed25519، و [[-7]] ES256، و [[-257]] RS256 (و [[-48]] نوع أحدث).

### [[redis.set($__btwebauthn:$__{user.id}$__bt, options.challenge, "EX", 300)]]

[[EX 300]] يتمسح لوحده بعد ٥ دقايق.

---

## ٢. في المتصفح: [[startRegistration({ optionsJSON })]]

بتحوّل الـ options لشكل [[navigator.credentials.create]]، والجهاز (البصمة) بيعمل زوج مفاتيح: الخاص بيفضل على الجهاز، والعام بيرجع. الرد:

~~~text الناتج
keys: ["id","rawId","response","type","clientExtensionResults","authenticatorAttachment"]
response: ["attestationObject","clientDataJSON","transports","publicKeyAlgorithm","publicKey","authenticatorData"]
type: "public-key", transports: ["internal"]
~~~

[[clientDataJSON]] فيه الـ challenge والـ origin اللي المتصفح نفسه كتبهم، والـ JavaScript مش بيقدر يزوّرهم.

---

## ٣. [[/me/passkeys]]

### [[const expectedChallenge = await redis.getdel(...)]]

[[GETDEL]] بيقرا ويمسح في خطوة واحدة: الـ challenge ينفع مرة.

### [[verifyRegistrationResponse({ response: req.body, expectedChallenge, expectedOrigin, expectedRPID }).catch(() => ({ verified: false }))]]

بتتأكد إن الـ challenge هو هو، والـ origin هو الواجهة، والـ rpID صح، والتوقيع سليم. والمكتبة **بترمي** error لو أي حاجة مش مطابقة (مش بترجّع [[verified: false]]). المثال الأصلي مكانش فيه [[.catch]]، وبعتنا نفس الرد مرتين:

~~~text الناتج (من غير catch)
500 {"error":{"code":"INTERNAL","message":"حصلت مشكلة، جرّب تاني"}}
~~~

~~~text ترمنال السيرفر
Error: Unexpected registration response challenge "KJ4l3gnA...", expected "null"
~~~

الـ challenge اتمسح بالـ [[getdel]] الأولاني، فالتاني جاب [[null]]، والمكتبة رمت، فطلع 500. بعد ما ضفنا [[.catch]]:

~~~text الناتج
register 201
replay   400 {"error":{"code":"PASSKEY_FAILED","message":"مقدرناش نسجّل المفتاح"}}
~~~

وجرّبنا origin غلط (السيرفر مستني [[5173]] والصفحة على [[6017]]): 400، وفي اللوج [[Unexpected registration response origin "http://localhost:6017", expected "http://localhost:5173"]].

### [[db.passkey.create({ data: { credentialId, publicKey: Buffer.from(credential.publicKey), counter, transports } })]]

- [[credential.publicKey]] [[Uint8Array]]، و [[Buffer.from]] بيحوّله للنوع اللي Prisma بيخزنه في عمود [[Bytes]].
- في الجدول: [[pk_bytes = 42]] (مفتاح Ed25519 بصيغة COSE)، و [[counter = 1]]، و [[transports = {internal}]].

---

## ٤. التجربة: excludeCredentials

بعد التسجيل طلبنا options تاني: [[excludeCredentials]] بقى فيه المفتاح، والمتصفح رفض يعمل واحد تاني على نفس الجهاز:

~~~text الناتج
InvalidStateError: The authenticator was previously registered
~~~

---

## ٥. الدخول (الـ sol، اتجرّب برضه)

[[generateAuthenticationOptions({ rpID, allowCredentials: [] })]]: [[allowCredentials]] فاضية = «أي مفتاح discoverable للدومين ده». والمتصفح [[startAuthentication({ optionsJSON })]] بيرجّع [[authenticatorData]] و [[clientDataJSON]] و [[signature]] و [[userHandle]]. السيرفر بيدوّر على الـ passkey بـ [[response.id]] ويتحقق بالمفتاح العام المتخزن:

~~~text الناتج
login        200 {"data":{"accessToken":...
login replay 400 PASSKEY_FAILED
~~~

~~~text ترمنال السيرفر
PASSKEY LOGIN four@example.com newCounter 2
~~~

---

## الخلاصة

| الخطوة | فين | الحماية |
|---|---|---|
| options | السيرفر | challenge عشوائي ٥ دقايق، و excludeCredentials |
| create | المتصفح والجهاز | المفتاح الخاص مبيطلعش، ومربوط بالـ rpID |
| verify | السيرفر | challenge مرة واحدة (getdel)، و origin و rpID وتوقيع |
| تخزين | القاعدة | المفتاح العام والعداد بس، ملهمش قيمة لوحدهم |

أي فشل في التحقق بيترمي، فاعمله [[catch]] وارجع 400. والصفحة لازم على HTTPS أو localhost.`,
          lines: [
            "المكتبة: options و verify للتسجيل.",
            "طلب options لتسجيل passkey. داخل ومن قريب.",
            "هات المستخدم ومفاتيحه الموجودة.",
            "اعمل options:",
            "اسم التطبيق، والدومين، والاسم اللي هيظهر، ومش محتاجين attestation.",
            "متسجلش نفس الجهاز مرتين.",
            "مفتاح discoverable لو ينفع، والبصمة أو الـ PIN لو ينفع.",
            "قفلة.",
            "خزّن الـ challenge ٥ دقايق.",
            "رجّع الـ options للواجهة، وهي تنادي [[startRegistration]].",
            "قفلة.",
            "استلام رد الجهاز.",
            "هات الـ challenge وامسحه في خطوة واحدة.",
            "اتحقق من الـ challenge والـ origin والـ rpID والتوقيع. المكتبة بترمي error لو أي حاجة مش مطابقة (حتى لو الـ challenge اتمسح)، والـ [[catch]] بيحوّلها [[verified: false]]، فالرد 400 مش 500.",
            "فشل؟ ارفض.",
            "المفتاح اللي اتعمل.",
            "خزّن الـ id والمفتاح العام والعداد والـ transports.",
            "تمام.",
            "قفلة."
          ],
          sol: R`مع الـ virtual authenticator في DevTools، [[startRegistration]] بيرجع JSON فيه [[id]] و [[response.attestationObject]]، و [[/me/passkeys]] ترجع 201، وجدول Passkey فيه صف. وفي تاب WebAuthn هتشوف الـ credential اتضاف.

الدخول: [[generateAuthenticationOptions({ rpID, allowCredentials: [] })]] (فاضية عشان discoverable)، والواجهة [[startAuthentication({ optionsJSON })]]، والسيرفر يدوّر على الـ passkey بـ [[response.id]] وينادي [[verifyAuthenticationResponse({ response, expectedChallenge, expectedOrigin, expectedRPID, credential: { id, publicKey, counter, transports } })]]، ولو [[verified]] يحدّث الـ counter و lastUsedAt ويعمل session.

لو ظهر [[Unexpected authentication response origin]]: الـ origin فيه port مختلف أو http بدل https. ولو [[The operation is insecure]] في المتصفح: الصفحة مش على HTTPS أو localhost.`
        }
      ]
    }
]);
