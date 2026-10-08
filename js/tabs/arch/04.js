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
    }
]);
