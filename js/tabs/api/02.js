// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "Auth: انت مين؟",
      l: 2,
      n: "باسورد متخزن hash، وتوكن أو session تثبت إنك انت، وكوكيز بالإعدادات الصح",
      items: [
        {
          cmd: "bcrypt",
          title: "احفظ الباسورد بطريقة محدش يقدر يرجّعها",
          desc: R`الباسورد عمره ما يتحفظ زي ما هو ولا مشفّر بمفتاح: بيتحفظ hash بدالة اتجاه واحد، وعند الـ login بتقارن.

bcrypt معمول مخصوص للباسوردات: بطيء عن قصد (الـ cost)، وبيضيف salt عشوائي لكل باسورد. cost بين 10 و 12 شائع، واختار أعلى رقم السيرفر بتاعك يستحمله (حوالي ربع ثانية للـ hash الواحد).`,
          example: R`import bcrypt from "bcrypt";

const hash = await bcrypt.hash("MyS3cret!", 12);
console.log(hash);
// $2b$12$L1rSfyd2U5SuHcCfeeLVIu3pk8VYb8uJI3OmMcHt7J/RBXlUSq//.

console.log(await bcrypt.compare("MyS3cret!", hash));
console.log(await bcrypt.compare("wrong", hash));
// true
// false`,
          try: R`اعمل hash لنفس الباسورد مرتين واتأكد إنهم مختلفين، وإن compare بيرجّع true للاتنين. وبعدين قيس الوقت بـ [[console.time]] مع cost 10 و 12 و 14، وشوف كل زيادة ١ بتعمل إيه.`,
          flag: "script",
          deep: {
            why: "الداتابيز بتتسرّب: باك أب منسي، أو SQL injection، أو موظف. لو الباسوردات متخزنة نص، كل اليوزرز اتكشفوا، ومعظمهم بيستخدموا نفس الباسورد في الإيميل والبنك. الـ hash البطيء بيخلي الباسورد القوي شبه مستحيل يترجع، والضعيف ياخد وقت.",
            how: R`الـ hash السريع (زي SHA-256) معمول للسرعة: كارت شاشة يجرّب مليارات الباسوردات في الثانية. bcrypt بيعيد الحسبة [[2^cost]] مرة، فـ cost 12 يعني ٤٠٩٦ دورة، وكل زيادة ١ بتضاعف الوقت. انت بتدفع ربع ثانية مرة عند الـ login، والمهاجم بيدفعها مع كل تخمينة.

الـ salt: ١٦ بايت عشوائي بيتولد مع كل hash. فاتنين باسوردهم «123456» الـ hash بتاعهم مختلف، والمهاجم ميقدرش يستخدم جداول جاهزة (rainbow tables) ولا يكسر الكل مرة واحدة. والـ salt والـ cost محفوظين جوه النص نفسه: [[$2b$12$]] وبعدها ٢٢ حرف salt وبعدها الـ hash. عشان كده [[compare]] مش محتاج تديله salt.

[[bcrypt.hash]] الـ async بيشتغل في thread pool بتاع libuv، فالـ event loop فاضي يخدم طلبات تانية. [[hashSync]] بيوقف السيرفر كله الربع ثانية دي. و [[bcryptjs]] مكتوبة JavaScript فبتشتغل على الـ thread الرئيسي حتى الـ async بتاعها (بتقسّم الشغل بس)، فهي أبطأ وبتزاحم الطلبات.

حد bcrypt: أول ٧٢ بايت بس من الباسورد بيتحسبوا والباقي بيتجاهل. و OWASP بتفضّل Argon2id للمشاريع الجديدة، و bcrypt لسه مقبول ومنتشر.`,
            when: "أي تسجيل بباسورد. وراجع الـ cost كل كام سنة مع تطور الأجهزة: عند login ناجح، لو الـ hash القديم الـ cost بتاعه أقل، اعمله hash جديد.",
            mistakes: R`في مشروع حقيقي كان الـ User model فيه حقل [[plainPassword]] جنب الـ hash، عشان endpoint للأدمن «يعرض الباسوردات»، وباسورد افتراضي ثابت للموظفين. ده بيلغي فايدة الـ hash تمامًا: أي تسريب يبقى كل الباسوردات. الصح: الأدمن يعمل reset ويبعت لينك، وعمره ما يشوف الباسورد. وفي مشاريع تانية كان [[bcrypt]] و [[bcryptjs]] الاتنين متسطبين: اختار واحد. وتستخدم [[md5]] أو [[sha256]] للباسوردات: سريعين زيادة عن اللزوم. وترجّع «الإيميل مش موجود» و «الباسورد غلط» كرسالتين مختلفتين، فحد يعرف مين عنده حساب.`
          },
          lines: [
            "مكتبة bcrypt (native وسريعة). فيه كمان [[bcryptjs]] مكتوبة JavaScript بس، وأبطأ.",
            "اعمل hash بـ cost 12. async عشان الحسبة التقيلة متوقفش السيرفر.",
            "اطبعه: كل مرة هيطلع مختلف حتى لنفس الباسورد، بسبب الـ salt.",
            "قارن باسورد صح بالـ hash: true.",
            "باسورد غلط: false."
          ],
          sol: R`الـ hash بيطلع مختلف كل مرة، مثلًا [[$2b$12$FFrStIpK3ozn...]] و [[$2b$12$wsmQ3tQJrJyC...]]، و [[a === b]] بـ [[false]]، و [[compare]] بيرجّع [[true]] للاتنين. السبب: bcrypt بيولّد salt عشوائي جديد مع كل hash ويحطه جوه الـ hash نفسه (الـ 22 حرف اللي بعد [[$12$]])، فـ compare بيقراه من هناك. فمتقارنش hashes ببعض، ومتعملش [[WHERE password_hash = ?]] أبدًا.

والوقت: كل زيادة ١ في الـ cost بتضاعف الوقت تقريبًا. على جهاز عادي حاجة زي [[cost 10: 67ms]] و [[cost 12: 281ms]] و [[cost 14: 1.087s]] (الأرقام عندك هتختلف، النسبة ×٤ كل خطوتين هي المهمة). 12 بيدّي حوالي ربع ثانية: مش ملحوظ في login، ومكلّف جدًا لحد بيجرّب ملايين الباسوردات.

لو القيمتين طلعوا زي بعض، يبقى بتعمل hash مرة وبتطبعه مرتين. ولو compare رجّع [[Promise { <pending> }]]، نسيت [[await]].`,
          solCode: R`import bcrypt from "bcrypt";

const a = await bcrypt.hash("MyS3cret!", 12);
const b = await bcrypt.hash("MyS3cret!", 12);
console.log(a === b, await bcrypt.compare("MyS3cret!", a), await bcrypt.compare("MyS3cret!", b)); // false true true

for (const cost of [10, 12, 14]) {
  console.time($__btcost $__{cost}$__bt);
  await bcrypt.hash("MyS3cret!", cost);
  console.timeEnd($__btcost $__{cost}$__bt);
}`
        },
        {
          cmd: "jwt.sign و jwt.verify",
          title: "توكن موقّع يثبت إنك سجّلت دخول",
          desc: R`بعد login ناجح، السيرفر بيدّيك JWT: نص فيه بيانات (زي id اليوزر) وتوقيع بسر محدش يعرفه غير السيرفر، والواجهة بتبعته مع كل طلب في [[Authorization: Bearer ...]].

السيرفر بيتحقق من التوقيع من غير ما يسأل الداتابيز. والـ JWT موقّع مش مشفّر: أي حد يقدر يقرا اللي جواه، فمتحطش فيه باسورد ولا بيانات حساسة.`,
          example: R`import jwt from "jsonwebtoken";
import { config } from "./config.js";

export function signAccessToken(user) {
  return jwt.sign({ sub: String(user.id), role: user.role }, config.JWT_SECRET, { expiresIn: "15m" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] });
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3OTAwMDAwMDAsImV4cCI6MTc5MDAwMDkwMH0.<signature>
//               header                  .                         payload                                        . التوقيع`,
          try: R`اعمل توكن وخد الجزء التاني منه (بين النقطتين) وافكّه بـ [[node -e "console.log(Buffer.from(process.argv[1], 'base64url').toString())" PAYLOAD]]. هتقرا الـ id والدور من غير أي سر. غيّر الدور لـ ADMIN ورجّع شفّره بـ [[node -e "const p = JSON.parse(Buffer.from(process.argv[1], 'base64url')); p.role = 'ADMIN'; console.log(Buffer.from(JSON.stringify(p)).toString('base64url'))" PAYLOAD]]، وحط الناتج مكان الجزء التاني وجرّب verify: [[invalid signature]] (لو غيّرت حرف في النص المشفّر نفسه، غالبًا الـ JSON هيبوظ وهتاخد SyntaxError مش invalid signature). واعمل توكن بـ [[expiresIn: "5s"]] واستنى: [[jwt expired]].`,
          flag: "script",
          deep: {
            why: "HTTP مبيفتكرش: كل طلب لوحده، فلازم كل طلب يثبت صاحبه. الـ JWT بيحط الإثبات ده جوه الطلب نفسه، والسيرفر يتحقق منه بحسبة سريعة من غير lookup، وأي نسخة من السيرفر معاها السر تقدر تتحقق، فتقدر تشغّل كذا نسخة من غير session مشتركة.",
            how: R`JWT تلات أجزاء مفصولة بنقط، كل جزء base64url: الـ header (نوع الـ algorithm)، والـ payload (الـ claims)، والتوقيع. التوقيع = HMAC-SHA256 للجزئين الأولانيين بالسر. أي تغيير في الـ payload بيخلي التوقيع مش مطابق، ومن غير السر محدش يقدر يعمل توقيع جديد.

الـ claims المشهورة: [[sub]] (مين)، و [[exp]] (بينتهي إمتى، بالثواني)، و [[iat]] (اتعمل إمتى)، و [[iss]] و [[aud]] (مين أصدره ولمين). [[verify]] بيتأكد من التوقيع و [[exp]] تلقائي، ومن [[iss]] و [[aud]] لو طلبتهم.

[[algorithms: ["HS256"]]] بيقفل هجوم قديم: توكن بيقول في الـ header إن الـ algorithm [[none]] أو نوع تاني عشان يخدع المكتبة. النسخ الحديثة من jsonwebtoken بتحمي من ده، بس التحديد الصريح عادة كويسة.

المشكلة الأساسية: التوكن صالح لحد [[exp]] مهما حصل. اليوزر عمل logout؟ اتحظر؟ دوره اتغيّر؟ التوكن القديم لسه شغال. عشان كده الـ access token عمره قصير (١٠ لـ ١٥ دقيقة)، ومعاه refresh token (درس [[access و refresh]]).`,
            when: R`APIs لموبايل أو لأكتر من واجهة، أو أكتر من سيرفر. لموقع واحد على نفس الدومين، الـ session بكوكي ممكن تبقى أبسط وأأمن (درس [[express-session]]).`,
            mistakes: R`في مشروع حقيقي كان عمر الـ JWT [[3650d]]، يعني ١٠ سنين، و logout مبيلغيهوش: توكن اتسرق مرة يبقى دخول لـ ١٠ سنين. وفي مشروع تاني توكن تحميل الملفات (عمره ٣٠ يوم) كان موقّع بنفس سر الـ access token ونفس الـ issuer، فكان بيعدّي من [[verifyAccessToken]] كأنه توكن دخول. افصل بسر مختلف أو claim زي [[aud]] وتحقق منه. وتحط الدور في التوكن وتثق فيه: لو الأدمن اتشال، التوكن لسه بيقول ADMIN لحد ما ينتهي.`
          },
          lines: [
            "مكتبة jsonwebtoken.",
            "السر من config المتحقق منه.",
            "اعمل توكن لليوزر.",
            "[[sub]] (subject) هو id اليوزر كـ string، ومعاه الدور، وينتهي بعد ربع ساعة.",
            "قفلة.",
            "اتحقق من توكن جاي.",
            "بيتأكد من التوقيع وإنه مش منتهي، ومبيقبلش غير الـ algorithm ده. لو أي حاجة غلط بيرمي خطأ.",
            "قفلة."
          ],
          sol: R`فك الـ payload بيطبع حاجة زي [[{"sub":"7","role":"USER","iat":1790718907,"exp":1790719807]] من غير أي سر: الـ JWT مش مشفّر، ده base64url بس. فمتحطش فيه حاجة سرية (باسورد، رقم بطاقة).

بعد ما تغيّر الدور لـ ADMIN وتحط الـ payload الجديد مكان القديم، [[jwt.verify]] بيرمي [[JsonWebTokenError: invalid signature]]، لأن التوقيع اتحسب على الـ header والـ payload القديمين بالسر، ومحدش يقدر يعمل توقيع جديد من غير السر. ده كل الأمان في JWT.

والتوكن اللي [[expiresIn: "5s"]] بعد ما تستنى بيرمي [[TokenExpiredError: jwt expired]]. في requireAuth الاتنين بيتحولوا لـ 401. لو verify نجح على التوكن المعدّل، يبقى انت بتعمل [[jwt.decode]] بدل [[jwt.verify]]: decode بيقرا بس ومبيتحققش من حاجة.`
        },
        {
          cmd: "requireAuth",
          title: "middleware يعرف مين اللي باعت الطلب",
          desc: R`middleware بيقرا التوكن من [[Authorization: Bearer ...]] ويتحقق منه ويحط اليوزر في [[req.user]]، ولو مفيش توكن أو بايظ أو منتهي: 401.

أي route بعده يعرف مين اللي بيطلب من [[req.user]]، وعمره ما يثق في id جاي في الـ body أو الـ query.`,
          example: R`export async function requireAuth(req, res, next) {
  const header = req.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) throw new AppError(401, "Login required");
  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
  req.user = { id: Number(payload.sub), role: payload.role };
  next();
}`,
          try: R`ركّبه على router المهام، وجرّب من غير header، وبتوكن بايظ، وبتوكن صح. وفي الـ controller استخدم [[req.user.id]] بدل أي id جاي من الـ body.`,
          flag: "script",
          deep: {
            why: R`كل endpoint محمي محتاج نفس الخطوات. في middleware واحد بتضمن إنها بتتعمل بنفس الطريقة في كل مكان، وإن [[req.user]] دايمًا جاي من توكن متحقق مش من حاجة المستخدم بعتها.`,
            how: R`الـ middleware ده بيحوّل «توكن» لـ «هوية». كل اللي بعده يثق في [[req.user]] بس، عمره ما يثق في [[req.body.userId]].

فيه قرار: تكتفي بالـ payload، ولا تجيب اليوزر من الداتابيز مع كل طلب؟ الـ payload بس أسرع، بس لو اليوزر اتحظر أو دوره اتغيّر، التوكن لسه شغال لحد ما ينتهي. جلب اليوزر ([[prisma.user.findUnique]] بـ [[select]] على الحقول اللي محتاجها) بيضيف query لكل طلب بس بيدّيك حالة حقيقية: [[isActive]] والدور الحالي. مشاريع كتير بتعمل ده، ولو الحمل زاد تكاشه في Redis لدقيقة.

ولو التوكن في كوكي بدل header، نفس الفكرة بس من [[req.cookies]]، وساعتها لازم حماية CSRF (sameSite على الأقل، درس [[res.cookie]]).

و [[optionalAuth]] نسخة بتحط [[req.user]] لو فيه توكن سليم وتكمّل عادي لو مفيش، لصفحات بتتعرض للكل بس بتتغير شوية لو انت عامل login.`,
            when: R`على كل router محتاج login. وخليه على مستوى الـ router ([[router.use(requireAuth)]] أو في [[app.use]]) عشان متنساش route.`,
            mistakes: R`في [[optionalAuth]] تبلع أي خطأ وتكمّل كزائر، وده صح. بس تنسخ نفس الـ catch لـ [[requireAuth]] بالغلط، فأي توكن بايظ يعدّي. وتقرا [[req.user.id]] في route مش عليه requireAuth فيقع بـ 500. وتحط اليوزر كله من الداتابيز في [[req.user]] ومعاه الـ hash، وبعدين route يرجّع [[req.user]] في الرد.`
          },
          lines: [
            "async عشان أي throw يروح لـ error handler في Express 5.",
            "اقرا الـ header، ولو مش موجود خليه نص فاضي.",
            "افصله: كلمة Bearer والتوكن.",
            "مش Bearer أو مفيش توكن: 401.",
            "هنحط فيه الـ payload.",
            "جرّب.",
            "اتحقق من التوقيع والانتهاء.",
            "لو فشل لأي سبب...",
            "401 برسالة واحدة. متقولش للمهاجم السبب بالظبط.",
            "قفلة.",
            "حط اليوزر على الطلب. [[sub]] كان string فرجّعه رقم.",
            "كمّل.",
            "قفلة."
          ],
          sol: R`من غير header: [[401]] و [[{"error":"Login required"}]]. بتوكن بايظ ([[Authorization: Bearer abc]]) أو منتهي: [[401]] و [[{"error":"Invalid or expired token"}]]. بتوكن صح: الـ route بيشتغل عادي و [[req.user]] فيه [[{ id: 7, role: "USER" }]].

في الـ controller: [[tasksService.create(req.user.id, req.body)]]، مش [[req.body.userId]]. الـ id اللي في التوكن موقّع من السيرفر فمحدش يقدر يغيّره، إنما أي حاجة في الـ body اليوزر بيكتبها بإيده.

لو التوكن الصح رجّع 401: اتأكد إنك باعت [[Bearer ]] بالمسافة (مش [[Bearer:]])، وإن نفس [[JWT_SECRET]] اللي عمل sign هو اللي بيعمل verify (مثلًا سيرفر اتعمله restart بـ secret عشوائي). ولو الطلب اتعلّق أو وقع السيرفر على Express 4، يبقى الـ throw جوه middleware async محتاج [[asyncHandler]].`,
          solCode: R`import tasksRouter from "./routes/tasks.routes.js";
app.use("/api/tasks", requireAuth, tasksRouter);

// controllers/tasks.controller.js
export async function create(req, res) {
  res.status(201).json(await tasksService.create(req.user.id, req.body));
}

// curl -i localhost:3000/api/tasks                                => 401 Login required
// curl -i -H "Authorization: Bearer abc" localhost:3000/api/tasks => 401 Invalid or expired token`
        },
        {
          cmd: "res.cookie",
          title: "كوكي المتصفح بيبعتها لوحده و JavaScript ميقدرش يقراها",
          desc: R`[[res.cookie(name, value, options)]] بيبعت [[Set-Cookie]]، والمتصفح بيرجّعها لوحده مع كل طلب لنفس السيرفر، و [[cookie-parser]] بيقراها في [[req.cookies]].

التلات إعدادات اللي مينفعش تنساهم: [[httpOnly]] (الـ JavaScript في الصفحة ميقدرش يقراها، فـ XSS ميسرقهاش)، و [[secure]] (تتبعت على HTTPS بس)، و [[sameSite]] (تتبعت مع طلبات جاية من مواقع تانية ولا لأ).`,
          example: R`import cookieParser from "cookie-parser";

app.use(cookieParser(config.COOKIE_SECRET));

export const refreshCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

res.cookie("refresh", token, refreshCookieOptions);
res.clearCookie("refresh", { path: "/api/auth" });`,
          try: R`بعد login افتح DevTools، تاب Application، Cookies: شوف الأعمدة HttpOnly و Secure و SameSite. واكتب [[document.cookie]] في Console: الكوكي الـ httpOnly مش هتظهر. وجرّب [[clearCookie]] من غير الـ path وشوفها لسه موجودة.`,
          flag: "script",
          deep: {
            why: "التوكن لازم يتخزن في مكان. localStorage أي JavaScript في الصفحة يقراه، فأي XSS (أو مكتبة npm مخترقة) تاخده. الكوكي الـ httpOnly الصفحة نفسها متقدرش تقراها، والمتصفح بيبعتها لوحده. بس ده بيفتح باب CSRF، وده اللي sameSite بيقفله.",
            how: R`الرد بيبقى [[Set-Cookie: refresh=abc; Max-Age=2592000; Path=/api/auth; HttpOnly; Secure; SameSite=Lax]]. المتصفح بيحفظها ويبعتها في header الـ [[Cookie]] مع أي طلب لنفس الدومين والـ path.

sameSite ليها ٣ قيم: [[strict]] مبتتبعتش خالص مع أي طلب جاي من موقع تاني (حتى لما حد يدوس لينك ليك من جوجل، فيبان إنه مش عامل login). [[lax]] بتتبعت مع التنقل العادي (لينك GET) بس مش مع POST أو fetch من موقع تاني، وده بيقفل أغلب CSRF. و [[none]] بتتبعت مع كل حاجة، ولازم معاها [[secure]]، وبتستخدم لما الواجهة على دومين مختلف تمامًا.

«موقع تاني» معناها site مختلف مش origin مختلف: [[app.example.com]] و [[api.example.com]] نفس الـ site، فـ lax شغالة بينهم. بس [[myapp.vercel.app]] و [[api.myapp.com]] sites مختلفة، فمحتاج [[none]] و [[secure]]، والمتصفحات اللي بتقفل third-party cookies ممكن ترفضها. الحل الأنضف: الـ API تحت نفس الدومين ([[/api]] من ورا Nginx أو subdomain).

الكوكي الموقّعة ([[signed: true]]): cookie-parser بيضيف توقيع بالسر، ولو حد عدّل القيمة، قيمتها في [[req.signedCookies]] بتبقى [[false]]. ده بيمنع التعديل مش القراية.

و [[clearCookie]] لازم ياخد نفس الـ path والـ domain اللي الكوكي اتعملت بيهم، وإلا المتصفح يعتبرها كوكي تانية. وفي Express 5 بيتجاهل [[maxAge]] و [[expires]] لو بعتّهم.`,
            when: "refresh tokens و session ids، وأي حاجة الـ JavaScript مش محتاج يقراها. وتفضيلات UI (اللغة والثيم) ممكن كوكي عادية أو localStorage.",
            mistakes: R`في مشروع حقيقي كان الـ cookie secret ليه fallback: [[COOKIE_SECRET || "change-me"]] ومعاه warning في اللوج. لو المتغير اتنسي في الإنتاج، أي حد يقدر يوقّع كوكيز. خلي config يقع بدل الـ fallback. و [[secure: true]] على localhost بـ http في متصفح مش بيعتبر localhost آمن، فالكوكي متتحفظش وانت مش فاهم ليه. و [[sameSite: "none"]] من غير [[secure]] فالمتصفح يرفضها. والواجهة بتعمل fetch من غير [[credentials: "include"]] فالكوكي مبتتبعتش أصلًا.`
          },
          lines: [
            "cookie-parser بيقرا header الـ Cookie.",
            "[[req.cookies]] للعادية، والسر عشان [[req.signedCookies]] (الموقّعة).",
            "إعدادات كوكي الـ refresh في مكان واحد.",
            "الـ JavaScript في المتصفح مش شايفها.",
            "HTTPS بس في الإنتاج، وعلى localhost بـ http بتبقى false.",
            "متتبعتش مع POST أو fetch جاي من مواقع تانية.",
            "تتبعت لعناوين الـ auth بس، مش مع كل طلب.",
            "تعيش ٣٠ يوم، بالملّي ثانية.",
            "قفلة.",
            "ابعتها.",
            "امسحها، بنفس الـ path وإلا المتصفح مش هيمسحها."
          ],
          sol: R`في Application > Cookies هتلاقي [[refresh]] وعمود HttpOnly عليه علامة، و SameSite [[Lax]]، و Path [[/api/auth]]، و Secure فاضي على localhost (لأن [[secure]] بـ true في production بس). والـ header اللي رجع كان شكله [[Set-Cookie: refresh=...; Max-Age=2592000; Path=/api/auth; Expires=...; HttpOnly; SameSite=Lax]].

[[document.cookie]] في الـ Console مش هيظهر فيه [[refresh]] خالص، لأن HttpOnly معناه إن JavaScript مايقدرش يقراها. فلو حصل XSS، الكود الخبيث مش هيقدر يسرقها.

[[res.clearCookie("refresh")]] من غير path بيبعت [[Set-Cookie: refresh=; Path=/; Expires=Thu, 01 Jan 1970 ...]]. المتصفح بيعتبر [[refresh]] على [[/]] كوكي مختلفة عن [[refresh]] على [[/api/auth]]، فبيمسح حاجة مش موجودة والأصلية بتفضل. لازم نفس الـ path (والـ domain لو حاطه).`
        },
        {
          cmd: "access و refresh",
          title: "توكن قصير للطلبات وتوكن طويل يجدده",
          desc: R`الـ access token عمره قصير وبيتبعت مع كل طلب، والـ refresh token عمره طويل ومتخزن في كوكي httpOnly، ووظيفته الوحيدة إنه يجيب access جديد.

والـ refresh بيتسجّل في الداتابيز (كـ hash)، فتقدر تلغيه: logout، أو «اخرج من كل الأجهزة»، أو يوزر اتحظر. ومع كل تجديد القديم بيتلغي وييجي جديد (rotation).`,
          example: R`router.post("/refresh", async (req, res) => {
  const token = req.cookies.refresh;
  if (!token) throw new AppError(401, "No refresh token");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash }, include: { user: true } });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) throw new AppError(401, "Invalid refresh token");
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  const newToken = await issueRefreshToken(stored.user.id);
  res.cookie("refresh", newToken, refreshCookieOptions);
  res.json({ accessToken: signAccessToken(stored.user) });
});`,
          try: R`اعمل login وخد الـ refresh cookie، ونادي [[/refresh]] مرتين بنفس الكوكي القديمة (بـ curl و [[-b "refresh=..."]]). التانية لازم ترجع 401. وبعدين اعمل endpoint [[/logout-all]] يلغي كل refresh tokens اليوزر.`,
          flag: "script",
          deep: {
            why: "عايز حاجتين عكس بعض: توكن قصير عشان لو اتسرق ضرره يبقى محدود، ويوزر مش بيعمل login كل ربع ساعة. الحل توكنين: القصير للطلبات، والطويل محمي أكتر (httpOnly ومبيتبعتش غير لـ endpoint واحد) وممكن يتلغي من الداتابيز.",
            how: R`الرحلة: login بيرجّع access في الـ body (الواجهة تحفظه في الذاكرة، في state مش localStorage)، و refresh في كوكي httpOnly. الواجهة تبعت الـ access في [[Authorization]]. لما يرجع 401 بسبب الانتهاء، تنادي [[/refresh]] (المتصفح بيبعت الكوكي لوحده مع [[credentials: "include"]])، تاخد access جديد، وتعيد الطلب. ولو الصفحة اتعملها reload والـ access اللي في الذاكرة راح، أول حاجة تنادي [[/refresh]].

الـ refresh نفسه مش لازم يبقى JWT: نص عشوائي ([[crypto.randomBytes(32).toString("base64url")]]) كفاية لأنك بتدوّر عليه في الداتابيز أصلًا. و [[issueRefreshToken]] بيولّده، ويحفظ الـ hash بتاعه وتاريخ انتهاء، ويرجّعه.

الـ rotation: مع كل تجديد، القديم يتلغي وييجي جديد. لو حرامي سرق refresh واستخدمه، اليوزر الحقيقي لما يستخدم نفس التوكن هيلاقيه ملغي، ودي إشارة سرقة. التطبيقات الأدق بتلغي «العيلة» كلها ساعتها وتجبر login.

تخزين الـ hash بدل التوكن: لو الداتابيز اتسربت، التوكنات مش صالحة للاستخدام. SHA-256 كفاية هنا (مش bcrypt) لأن التوكن عشوائي وطويل، مش باسورد بشري ضعيف.

و [[path: "/api/auth"]] في إعدادات الكوكي بيخلي المتصفح يبعت الـ refresh للـ auth routes بس.`,
            when: "أي API بـ JWT لواجهة ويب أو موبايل. في الموبايل الـ refresh بيتخزن في secure storage (Keychain و Keystore) بدل الكوكي.",
            mistakes: R`في مشروع حقيقي كان الـ backend بيحط الـ refresh في كوكي httpOnly (صح)، وكمان بيرجّعه في الـ body، والواجهة بتحفظه في [[localStorage]]. كده الـ httpOnly ملهاش لازمة: أي XSS يقرا localStorage وياخد توكن عمره ٣٠ يوم. ابعته في الكوكي بس. وفي نفس المشروع endpoint الـ refresh كان بيقبل التوكن من الكوكي أو header الـ Authorization أو الـ body: كل مصدر زيادة باب زيادة. ومن غير rotation، refresh مسروق شغال لحد ما ينتهي.`
          },
          lines: [
            "endpoint التجديد. مش عليه requireAuth، لأن الـ access نفسه ممكن يكون انتهى.",
            "الـ refresh جاي في كوكي (محتاج cookie-parser).",
            "مفيش؟ 401، والواجهة توديه على login.",
            "اعمل hash للتوكن ([[crypto]] من [[node:crypto]]). في الداتابيز بنخزن الـ hash بس، زي الباسورد.",
            "دوّر عليه ومعاه اليوزر.",
            "مش موجود أو ملغي أو منتهي؟ 401.",
            "rotation: الغي القديم. كل refresh يتستخدم مرة واحدة بس.",
            "اعمل refresh جديد واحفظ الـ hash بتاعه.",
            "ابعته في الكوكي بنفس الإعدادات.",
            "ورجّع access جديد في الـ body.",
            "قفلة."
          ],
          sol: R`أول [[/refresh]] بالكوكي القديمة بيرجّع [[200]] و [[accessToken]] جديد و [[Set-Cookie: refresh=...]] جديدة. التاني بنفس الكوكي القديمة بيرجّع [[401]] و [[{"error":"Invalid refresh token"}]]، لأن التوكن القديم اتعلّم عليه [[revokedAt]] في أول مرة. ده الـ rotation: كل refresh token بيتستخدم مرة واحدة، فلو اتسرق واستخدمه الحرامي، اليوزر الحقيقي هياخد 401 (أو العكس) وتعرف إن فيه مشكلة.

عشان تجرّب بـ curl: خد القيمة من [[curl -c jar.txt]] بعد login، وابعتها بـ [[curl -X POST -b "refresh=VALUE" localhost:3000/api/auth/refresh]]. لو أول طلب نفسه رجع 401، اتأكد إن [[cookieParser()]] متسجّل، وإن الـ path بتاع الكوكي [[/api/auth]] بيطابق الـ route.

و [[/logout-all]] بيعمل [[updateMany]] على كل توكنات اليوزر اللي لسه مش ملغية، ويمسح الكوكي. بعده أي refresh من أي جهاز بيرجع 401. الـ access tokens الموجودة هتفضل شغالة لحد ما تنتهي (15 دقيقة)، ودي التمنّ بتاع JWT.`,
          solCode: R`router.post("/logout-all", requireAuth, async (req, res) => {
  const { count } = await prisma.refreshToken.updateMany({
    where: { userId: req.user.id, revokedAt: null },
    data: { revokedAt: new Date() },
  });
  res.clearCookie("refresh", { path: "/api/auth" });
  res.json({ revoked: count });
});
// {"revoked":3}   وبعدها أي /refresh => 401`
        },
        {
          cmd: "express-session",
          title: "بديل الـ JWT: السيرفر يفتكرك",
          desc: R`في الـ session السيرفر بيحفظ بياناتك عنده (في Redis أو الداتابيز)، ويدّيك رقم عشوائي بس (session id) في كوكي httpOnly يبعته المتصفح مع كل طلب.

الفرق عن JWT: logout حقيقي (امسح الـ session وخلاص)، والكوكي مفيهاش بيانات، بس كل طلب محتاج lookup في الـ store.`,
          example: R`import session from "express-session";

app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 },
}));

app.post("/api/auth/login", async (req, res) => {
  const user = await authService.checkPassword(req.body.email, req.body.password);
  await new Promise((resolve, reject) => req.session.regenerate((err) => (err ? reject(err) : resolve())));
  req.session.userId = user.id;
  res.json({ id: user.id });
});`,
          try: R`سجّل دخول وبص على الكوكي [[connect.sid]] في DevTools: رقم بس. اعمل route [[/me]] يرجّع [[req.session.userId]]، و route [[/logout]] فيه [[req.session.destroy]]. وأعد تشغيل السيرفر: الـ sessions كلها راحت، لأن الـ store الافتراضي في الذاكرة. (على localhost بـ http خلي [[secure]] false للتجربة.)`,
          flag: "script",
          deep: {
            why: "JWT مش دايمًا الإجابة. لموقع واحد على دومين واحد، الـ session أبسط: مفيش refresh flow، و logout وحظر اليوزر بيحصلوا فورًا، والكوكي فيها رقم بس.",
            how: R`أول مرة تحط حاجة في [[req.session]]، الـ middleware بيولّد id عشوائي طويل، ويحفظ [[{ userId: 7 }]] في الـ store تحت الـ id ده، ويبعت الـ id في كوكي موقّعة بالـ secret. مع كل طلب: يقرا الكوكي، ويتحقق من التوقيع، ويجيب الـ session من الـ store ويحطها في [[req.session]]. وفي آخر الطلب لو اتغيرت يحفظها.

الـ store الافتراضي [[MemoryStore]]: في ذاكرة العملية، بيضيع مع كل restart، ومبيتشاركش بين نسختين، وبيسرّب ذاكرة. للإنتاج Redis (باكدج [[connect-redis]]، والفكرة في درس [[stateless]] في تاب «Cloud و DevOps») أو الداتابيز.

[[regenerate]] بعد الـ login مهم: لو مهاجم قدر يزرع session id معروف في متصفح الضحية قبل الـ login (session fixation)، من غير regenerate الضحية هتعمل login على الـ id بتاع المهاجم. وحوّلناها لـ promise عشان أي خطأ فيها يوصل للـ error handler بدل ما يضيع جوه callback.

و [[secure: true]] ورا Nginx: Express شايف الطلب http (Nginx هو اللي عامل HTTPS)، فـ express-session مش هيبعت الكوكي. الحل [[app.set("trust proxy", 1)]] عشان يقرا [[X-Forwarded-Proto]].`,
            when: "موقع واحد (SSR أو SPA) على نفس الدومين، وخصوصًا لو محتاج logout فوري أو «اطرد اليوزر ده دلوقتي». JWT أنسب للموبايل، وللخدمات اللي بتكلّم بعض، ولأكتر من سيرفر من غير store مشترك.",
            mistakes: R`MemoryStore في الإنتاج: express-session نفسه بيطبع warning، والناس بتتجاهله. و [[saveUninitialized: true]] فكل bot بيعمل session في الـ store. وتنسى [[trust proxy]] ورا Nginx، فالكوكي الـ secure متتبعتش والـ login «مش شغال» على السيرفر بس.`
          },
          lines: [
            "express-session.",
            "ركّبه كـ middleware.",
            "سر لتوقيع الـ session id في الكوكي.",
            "متحفظش الـ session تاني لو متغيرتش.",
            "متعملش session لأي زائر، بس لما تحط فيها حاجة.",
            "إعدادات الكوكي زي أي كوكي auth.",
            "قفلة.",
            "login.",
            "اتأكد من الإيميل والباسورد (بترمي 401 لو غلط).",
            "اعمل session id جديد بعد الـ login (ضد session fixation)، ملفوف في promise عشان الخطأ يوصل للـ error handler.",
            "احفظ id اليوزر في الـ session. بيتخزن في الـ store، مش في الكوكي.",
            "رد.",
            "قفلة."
          ],
          sol: R`الكوكي [[connect.sid]] قيمتها حاجة زي [[s%3AuFsOrqRl9dKM...FrmadjhjIE...]]: الـ session id وبعده توقيع بالـ secret. مفيش فيها userId ولا أي بيانات؛ البيانات نفسها على السيرفر في الـ store.

[[/me]] بعد login بيرجّع [[{"userId":7}]]. بعد [[/logout]] ([[req.session.destroy]]) نفس الكوكي بترجّع 401، لأن الـ session اتمسحت من الـ store حتى لو المتصفح لسه باعت الـ id. ده الفرق الكبير عن JWT: الإلغاء فوري.

وبعد restart السيرفر [[/me]] بيرجع 401 برضه، لأن الـ MemoryStore في ذاكرة الـ process وراح معاها. في production لازم store زي Redis ([[connect-redis]]). ولو من الأول [[/me]] رجع 401 على localhost، غالبًا [[secure: true]] على http فالمتصفح رفض يحفظ الكوكي.`,
          solCode: R`app.get("/api/auth/me", (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Login required" });
  res.json({ userId: req.session.userId });
});

app.post("/api/auth/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.sendStatus(204);
  });
});`
        }
      ]
    },
    {
      t: "Authorization والأمان",
      l: 2,
      n: "إنك تعرف هو مين مش كفاية: لازم تتأكد إن ليه الحق، وتقفل الأبواب المعروفة",
      items: [
        {
          cmd: "requireRole",
          title: "الأدمن بس يقدر يعمل كده",
          desc: R`authentication (انت مين) غير authorization (مسموحلك بإيه): بعد [[requireAuth]]، middleware تاني بيتأكد من الدور، والدور الغلط 403 مش 401.

ولما الصلاحيات تكتر، بدل ما تسأل «انت أدمن؟» في كل مكان، اسأل «معاك صلاحية [[users:manage]]؟»، والدور يتحول لقايمة صلاحيات في مكان واحد.`,
          example: R`export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) throw new AppError(401, "Login required");
  if (!roles.includes(req.user.role)) throw new AppError(403, "Forbidden");
  next();
};

const PERMISSIONS = {
  ADMIN: ["tasks:read", "tasks:delete-any", "users:manage"],
  USER: ["tasks:read"],
};
export const can = (perm) => (req, res, next) => {
  if (!PERMISSIONS[req.user?.role]?.includes(perm)) throw new AppError(403, "Forbidden");
  next();
};

router.delete("/users/:id", requireAuth, requireRole("ADMIN"), users.remove);`,
          try: R`اعمل يوزرين بدورين مختلفين، وجرّب endpoint الأدمن بكل واحد: الأدمن 200، والعادي 403، ومن غير توكن 401. وبعدين بدّل [[requireRole("ADMIN")]] بـ [[can("users:manage")]] واتأكد إن النتيجة واحدة.`,
          flag: "script",
          deep: {
            why: "أغلب التطبيقات فيها أنواع يوزرز: زبون وأدمن، أو موظف ومدير. لو فحص الدور مكتوب جوه كل handler بـ if، أول endpoint جديد تنساه فيه هيبقى مفتوح للكل. في middleware، الحماية بتبان في تعريف الـ route نفسه.",
            how: R`RBAC (role-based access control): كل يوزر ليه دور، وكل دور ليه صلاحيات. الأدوار الثابتة في الكود أبسط حاجة. ولما الأدمن محتاج يعمل أدوار جديدة من لوحة التحكم، الأدوار والصلاحيات بتتخزن في جداول (Role و Permission وجدول بيربطهم). في مشروع حقيقي لنظام محاسبة كان ده الشكل: الصلاحيات بتتحسب من الدور وتتحط على [[req.user.permissions]] جوه الـ auth middleware.

فحص الدور بيجاوب «ينفع يعمل النوع ده من العمليات؟». بس مبيجاوبش «ينفع يعملها على الحاجة دي بالذات؟»: يوزر عادي معاه [[tasks:read]]، بس على مهامه هو بس. ده الـ ownership check، الدرس الجاي، وهو اللي بيتنسي أكتر.

والدور جاي منين؟ لو من الـ JWT، تغييره مبيسريش غير لما التوكن ينتهي. لو من الداتابيز في [[requireAuth]]، بيسري فورًا.`,
            when: "أي تطبيق فيه لوحة أدمن أو أنواع يوزرز. ابدأ بسيط (أدوار ثابتة)، وانقل لصلاحيات في الداتابيز لما العميل يطلب يعمل أدوار بنفسه.",
            mistakes: R`تخبي زرار «مسح» في الواجهة وتفتكر كده محمي: الـ endpoint لسه شغال لأي حد بـ curl. وترجّع 401 بدل 403 فالواجهة تعمل logout. وتقارن الدور بـ string مكتوب بإيدك في ٣٠ مكان ([["admin"]] مرة و [["ADMIN"]] مرة): اعمل constants.`
          },
          lines: [
            "دالة بتاخد الأدوار المسموحة وترجّع middleware.",
            "مفيش يوزر أصلًا (نسيت requireAuth قبله): 401.",
            "الدور مش في القايمة: 403.",
            "مسموح، كمّل.",
            "قفلة.",
            "خريطة الأدوار للصلاحيات في مكان واحد.",
            "الأدمن يقدر يمسح مهام أي حد ويدير اليوزرز.",
            "اليوزر العادي يقرا بس (ومهامه هو بس، ودا الدرس الجاي).",
            "قفلة.",
            "middleware بيسأل عن صلاحية مش عن دور.",
            "الدور مش معاه الصلاحية دي: 403.",
            "كمّل.",
            "قفلة.",
            "الترتيب: auth الأول (مين)، وبعدين الدور (مسموح؟)، وبعدين الـ handler."
          ],
          sol: R`بتوكن الأدمن: [[200]]. بتوكن اليوزر العادي: [[403]] و [[{"error":"Forbidden"}]]. من غير توكن: [[401]] و [[{"error":"Login required"}]] (من requireAuth، قبل ما requireRole يشتغل). الفرق مهم: 401 يعني «مش عارف انت مين، اعمل login»، و 403 يعني «عارفك، بس مش مسموحلك».

بعد التبديل لـ [[can("users:manage")]] النتيجة نفسها بالظبط، لأن [[users:manage]] موجودة في ADMIN بس. الفرق إن لو بعدين عملت دور MODERATOR وعايزه يدير اليوزرين، هتزوّد الصلاحية في جدول [[PERMISSIONS]] بس، من غير ما تلف على كل route.

لو الأدمن نفسه أخد 403، اتأكد إن الدور مكتوب في التوكن ([[role]] في الـ payload) وبنفس الحروف: [[ADMIN]] مش [[admin]]. ولو اتغيّر دوره في القاعدة، التوكن القديم لسه فيه الدور القديم لحد ما يعمل login أو refresh.`
        },
        {
          cmd: "ownership (IDOR)",
          title: "تغيير رقم في العنوان بيوريك بيانات حد تاني؟",
          desc: R`IDOR يعني الـ endpoint بياخد id من العنوان ويجيب الحاجة من غير ما يتأكد إنها بتاعتك، فتغيير الرقم في [[GET /api/tasks/42]] يوريك مهمة يوزر تاني.

ودي أشهر ثغرة في الـ APIs (Broken Access Control، رقم ١ في OWASP). الحل: كل query بتاخد [[userId: req.user.id]] في الـ where، فالسؤال للداتابيز نفسه يبقى «هات المهمة ٤٢ اللي بتاعتي».`,
          example: R`// غلط: أي حد عامل login يقرا أي مهمة
const task = await prisma.task.findUnique({ where: { id } });

// صح: المهمة لازم تبقى بتاعتك
const task = await prisma.task.findFirst({ where: { id, userId: req.user.id } });
if (!task) throw new AppError(404, "Task not found");

// التعديل والمسح بنفس الشرط
const { count } = await prisma.task.deleteMany({ where: { id, userId: req.user.id } });
if (count === 0) throw new AppError(404, "Task not found");`,
          try: R`اعمل يوزرين وكل واحد يعمل مهمة. بتوكن الأول، حاول تقرا وتعدّل وتمسح مهمة التاني بالـ id بتاعها: التلاتة لازم 404. وبعدين دوّر في مشروعك على كل [[findUnique]] و [[update]] بـ id جاي من الطلب، وشوف أنهي فيهم ناقصه شرط الملكية.`,
          flag: "script",
          deep: {
            why: R`auth بيأكد إنك يوزر، والدور بيأكد إنك من النوع اللي يعمل كده. بس ولا واحد فيهم بيسأل «المهمة ٤٢ دي بتاعتك؟». والأرقام متتالية وسهلة التخمين، فأي حد يكتب loop من ١ لـ ١٠٠٠٠ وياخد بيانات كل الناس: فواتير، وعناوين، وصور بطاقات.`,
            how: R`الفكرة إن الـ ownership يبقى جزء من الـ query مش خطوة بعدها. [[findUnique]] وبعدين [[if (task.userId !== req.user.id)]] شغال برضه، بس سهل تنساه في endpoint، وبيقول للمهاجم إن الرقم موجود (403 مقابل 404).

للأنظمة اللي فيها شركات أو فرق (multi-tenant) الشرط بيبقى [[companyId: req.user.companyId]]. في مشروع حقيقي لنظام محاسبة كان كل controller بيفلتر بـ companyId لأي حد مش super admin، وكان فيه اختبار بيتأكد من ده بالظبط. والأحسن كمان تخلي الشرط تلقائي: Prisma client extension بيضيفه لكل query، أو Row Level Security في Postgres (درس «Row Level Security» في تاب «PostgreSQL»)، فحتى لو نسيت، الداتابيز نفسها ترفض.

و UUID بدل الأرقام المتتالية بيصعّب التخمين، بس مش حماية: الـ id بيتسرّب في لينكات ولوجات. الحماية الحقيقية الشرط في الـ query.

والأدمن اللي مسموحله يشوف كله؟ route منفصل تحت [[/api/admin]] بـ [[requireRole]]، بدل if جوه نفس الـ endpoint.`,
            when: R`كل endpoint بياخد id من العنوان أو الـ body، من غير استثناء: القراية والتعديل والمسح والتحميل ([[/files/:id]]).`,
            mistakes: R`تتحقق في القراية وتنسى في PATCH و DELETE. وتاخد [[userId]] من الـ body بدل [[req.user.id]]. وفي مشروع حقيقي كان socket.io بيقبل [[userId]] من العميل عشان يدخّله غرفة الرسايل بتاعته، فأي حد يقدر يسمع رسايل أي حد (التفاصيل في درس [[socket.io]] في تاب «بناء مشروع كامل»). وتفتكر إن UUID كفاية.`
          },
          lines: [
            "بيدوّر بالـ id بس، فأي id يرجّع أي مهمة.",
            "الـ id ومعاه صاحبها في نفس الـ where. [[findFirst]] شغال، ومن Prisma 5 [[findUnique]] كمان بيقبل [[userId]] جنب الـ id.",
            "مش لاقيها (مش موجودة أو مش بتاعتك)؟ 404 في الحالتين، عشان متأكدش إن الرقم موجود.",
            "[[deleteMany]] بالشرطين: بيمسح لو بتاعتك بس، وبيرجّع عدد اللي اتمسح.",
            "صفر يعني مش بتاعتك أو مش موجودة."
          ],
          sol: R`بتوكن اليوزر الأول على مهمة التاني: [[GET]] و [[PATCH]] و [[DELETE]] التلاتة بيرجّعوا [[404]] و [[{"error":"Task not found"}]]، وصاحب المهمة لسه بيقراها عادي بـ 200 ومتغيرتش. ليه 404 مش 403؟ عشان متأكدش للمهاجم إن الـ id ده موجود أصلًا.

لو واحد منهم رجّع 200 أو 204، ده IDOR حقيقي: غالبًا [[findUnique({ where: { id } })]] أو [[update({ where: { id } })]] من غير [[userId]]. وخلي بالك إن [[update]] و [[delete]] العاديين في Prisma محتاجين unique، فبتستخدم [[updateMany]] و [[deleteMany]] بالشرطين وتبص على [[count]].

للتدوير: [[grep -rnE "findUnique|update\(|delete\(" src/services]]، وكل سطر بياخد id جاي من [[req.params]] لازم يبقى معاه [[userId: req.user.id]] (أو فحص دور الأدمن صريح).`
        },
        {
          cmd: "helmet",
          title: "headers أمان على كل رد في سطر",
          desc: R`[[helmet()]] بيضيف مجموعة headers بتقول للمتصفح يتصرف بحذر، وبيشيل [[X-Powered-By: Express]].

متخمّنش نوع الملف، ومتعرضش الصفحة في iframe من موقع تاني، واستخدم HTTPS بس، ومتبعتش الـ referrer لمواقع تانية. لـ API بيرجّع JSON بس أغلبها مش فارق كتير، بس رخيص ومفيش سبب تسيبه. والمهم تعرف تعدّل اللي بيبوّظ حاجة بدل ما تشيله كله.`,
          example: R`import helmet from "helmet";

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// curl -I http://localhost:3000/health
// Content-Security-Policy: default-src 'self';base-uri 'self';...
// Strict-Transport-Security: max-age=31536000; includeSubDomains
// X-Content-Type-Options: nosniff
// X-Frame-Options: SAMEORIGIN
// Cross-Origin-Resource-Policy: cross-origin`,
          try: R`شغّل [[curl -I localhost:3000/health]] قبل helmet وبعده وقارن الـ headers. وبعدين اعمل صفحة على بورت تاني فيها صورة بتشاور على [[http://localhost:3000/uploads/x.png]]: مع الإعداد الافتراضي الصورة هتتمنع، ومع [[cross-origin]] هتظهر.`,
          flag: "script",
          deep: {
            why: "فيه هجمات بتعتمد على إن المتصفح «متساهل»: يعرض موقعك في iframe شفاف فوق زرار (clickjacking)، أو يشغّل ملف مرفوع كأنه script لأنه خمّن نوعه، أو يفتح الموقع بـ http فحد في النص يغيّره. الـ headers دي بتقفل الأبواب دي بإعدادات جاهزة ومجرّبة.",
            how: R`helmet مجموعة middlewares صغيرة، كل واحد بيحط header:

[[Content-Security-Policy]]: الصفحة تحمّل scripts وصور وستايلات منين. أهم header ضد XSS في الصفحات، وأقل أهمية لـ JSON API. [[Strict-Transport-Security]]: المتصفح يفتكر إن الموقع HTTPS بس لمدة سنة. [[X-Content-Type-Options: nosniff]]: متخمّنش النوع، التزم بـ Content-Type. [[X-Frame-Options]]: ممنوع iframe من مواقع تانية. [[Referrer-Policy: no-referrer]]. و [[Cross-Origin-Resource-Policy]] و [[Cross-Origin-Opener-Policy]]: مين يقدر يحمّل مواردك أو يفتح نافذتك.

كل واحد تقدر تعدّله أو تقفله: [[helmet({ contentSecurityPolicy: false })]] لو الـ API بيرجّع JSON بس، أو [[directives]] لو بيخدم صفحات.

ولو ورا Nginx، ممكن الـ headers تتحط في Nginx بدل Express. المهم متتحطش في الاتنين بقيم مختلفة، وافحص النتيجة من بره (درس «فحص الـ headers» في تاب «الأمان»).`,
            when: "كل تطبيق Express، كأول middleware. ولو بيخدم HTML (SSR أو صفحات ثابتة) اشتغل على CSP بجد.",
            mistakes: R`تشيله كله عشان صورة مش ظاهرة، بدل ما تعدّل [[crossOriginResourcePolicy]] بس. في مشروع حقيقي كان فيه ٣ middlewares يدوي لفولدرات الـ uploads، كل واحد بيحط headers الـ CORS و CORP بإيده بنفس الكود المنسوخ، والأسهل إعداد helmet واحد و [[cors()]] واحد. وتفتكر إن helmet بيحمي من XSS و SQL injection في الكود: هو headers بس، والـ validation والـ escaping لسه شغلك.`
          },
          lines: [
            "helmet.",
            "ركّبه أول middleware.",
            "الافتراضي [[same-origin]] بيمنع مواقع تانية تعرض صور أو ملفات من الـ API. لو الواجهة على دومين تاني وبتعرض صور مرفوعة، خليه cross-origin.",
            "قفلة."
          ],
          sol: R`قبل helmet: headers قليلة و [[X-Powered-By: Express]]. بعده: [[X-Powered-By]] اختفى، وظهر [[Content-Security-Policy: default-src 'self';...]] و [[Strict-Transport-Security: max-age=31536000; includeSubDomains]] و [[X-Content-Type-Options: nosniff]] و [[X-Frame-Options: SAMEORIGIN]] و [[Referrer-Policy: no-referrer]] و [[Cross-Origin-Opener-Policy: same-origin]] و [[Cross-Origin-Resource-Policy: same-origin]] وغيرهم (حوالي ١٢ header).

الصورة: مع الافتراضي [[Cross-Origin-Resource-Policy: same-origin]]، صفحة على [[localhost:5173]] بتطلب صورة من [[localhost:3000]] (بورت مختلف = origin مختلف) والمتصفح بيرفض يعرضها، وفي Network بتشوف [[blocked:NotSameOrigin]] (أو ERR_BLOCKED_BY_RESPONSE في Chrome). مع [[{ policy: "cross-origin" }]] الـ header بيبقى [[cross-origin]] والصورة بتظهر.

لو الصورة ظهرت مع الإعداد الافتراضي، يبقى الصفحة والسيرفر على نفس الـ origin، أو المتصفح عنده الصورة في الكاش: اعمل hard reload.`
        },
        {
          cmd: "cors",
          title: "خلي الواجهة بتاعتك بس هي اللي تقرا ردود الـ API من المتصفح",
          desc: R`المتصفح بيمنع صفحة على origin تقرا رد من origin تاني إلا لو السيرفر قال صراحة إنه مسموح بـ [[Access-Control-Allow-Origin]]، ودي CORS.

مع الكوكيز ([[credentials]]) القواعد أشد: لازم origin محدد (مش [[*]]) و [[Access-Control-Allow-Credentials: true]]، والواجهة تبعت [[credentials: "include"]].`,
          example: R`import cors from "cors";

app.use(cors({
  origin: config.CORS_ORIGINS,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  maxAge: 600,
}));

// الواجهة
fetch("https://api.example.com/api/tasks", { credentials: "include" });`,
          try: R`من Console على موقع تاني (زي example.com) اعمل [[fetch("http://localhost:3000/api/tasks")]]: هتشوف CORS error. زوّد الـ origin ده في [[CORS_ORIGINS]] وجرّب تاني. وافتح تاب Network وشوف طلب الـ OPTIONS اللي بيحصل قبل POST بـ JSON.`,
          flag: "script",
          deep: {
            why: "من غير الـ same-origin policy، أي موقع تفتحه كان هيقدر يعمل fetch لـ API البنك بتاعك بكوكيزك ويقرا الرد. المتصفح بيمنع القراية دي افتراضيًا (same-origin policy)، و CORS هو الطريقة المنظمة إنك تفتح استثناء لمواقعك انت بس.",
            how: R`الـ origin هو protocol و domain و port مع بعض: [[http://localhost:5173]] و [[http://localhost:3000]] origins مختلفة.

الطلبات «البسيطة» (GET، أو POST بفورم عادي) المتصفح بيبعتها على طول ومعاها [[Origin]]، ويبص على [[Access-Control-Allow-Origin]] في الرد: لو مش مطابق، الطلب اتنفذ على السيرفر فعلًا، بس الصفحة ممنوعة تقرا الرد. أي طلب تاني (JSON، أو header زي Authorization، أو PATCH و DELETE) المتصفح بيبعت قبله preflight: [[OPTIONS]] بيسأل «مسموح؟»، ولو الرد مش تمام الطلب الحقيقي مبيتبعتش خالص.

[[cors()]] من غير options بيرد بـ [[*]] لأي origin، ودا مقبول لـ API عام من غير كوكيز. مع [[credentials: true]] الـ [[*]] مرفوضة من المتصفح، فلازم الـ origin بالظبط. والـ array في [[origin]] بيقارن بالظبط، ولو الـ origin في القايمة بيرجّعه في الـ header، ولو مش فيها مبيحطش الـ header خالص فالمتصفح يمنع.

CORS مش حماية للسيرفر: curl و Postman والسيرفرات التانية مبيطبقوهاش أصلًا. هي بتحمي اليوزر من مواقع تانية بتستخدم متصفحه. والحماية الحقيقية للـ API هي auth.

وفي Express 5، [[app.options("*", cors())]] بتاعة الـ tutorials القديمة بتوقع السيرفر وهو بيقوم. [[app.use(cors())]] بيرد على الـ preflight لوحده، فمش محتاجها.`,
            when: R`لما الواجهة والـ API على origins مختلفة (حتى لو بورت مختلف على localhost). لو الاتنين تحت نفس الدومين من ورا Nginx ([[/api]])، مش محتاج CORS خالص.`,
            mistakes: R`في مشروع حقيقي كان التحقق من الـ origin يدوي بـ [[origin.includes("myapp.com")]]، فـ [[https://myapp.com.evil.io]] بيعدّي، ومعاه [[Allow-Credentials: true]]، يعني موقع المهاجم يقرا بيانات اليوزر. وفي نفس الكود كان في التطوير بيرجّع [[*]] مع [[credentials: true]]، والمتصفح بيرفض الكومبينيشن ده أصلًا. استخدم array بمطابقة كاملة أو regex مقفول من الأول للآخر زي [[/^https:\/\/([a-z0-9-]+\.)?myapp\.com$/]]. و «CORS error» في الـ Console ساعات بيبقى 500 أو 404 طالع من غير headers، فبص على الـ status في Network الأول (درس «CORS» في تاب «المتصفح»).`
          },
          lines: [
            "باكدج cors.",
            "ركّبه قبل الـ routes.",
            "array من الـ origins المسموحة بالظبط (من config)، زي [[https://app.example.com]].",
            "اسمح بالكوكيز مع الطلب ([[Access-Control-Allow-Credentials: true]]). أما header الـ Authorization فمش محتاج ده: بيتسمح بـ [[allowedHeaders]]، و cors بيعكس الـ headers المطلوبة افتراضيًا.",
            "الـ methods المسموحة في رد الـ preflight.",
            "المتصفح يكاش رد الـ preflight ١٠ دقايق بدل ما يسأل كل مرة.",
            "قفلة.",
            R`في الواجهة: من غير [[credentials: "include"]] الكوكيز مبتتبعتش لـ origin تاني.`
          ],
          sol: R`من Console على example.com: [[fetch("http://localhost:3000/api/tasks")]] بيفشل بـ [[TypeError: Failed to fetch]]، وفي الـ Console رسالة حمرا زي [[has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present]]. والمهم: الطلب وصل السيرفر فعلًا واتنفّذ (هتشوفه في اللوج)؛ المتصفح هو اللي منع الصفحة تقرا الرد. (المتصفحات الجديدة ممكن تسألك الأول تسمح للموقع يوصل للـ local network، ودي حاجة منفصلة عن CORS.)

بعد ما تزوّد [[https://example.com]] في [[CORS_ORIGINS]] (من غير / في الآخر) وتعيد التشغيل، الرد بيرجع وفيه [[Access-Control-Allow-Origin: https://example.com]] و [[Access-Control-Allow-Credentials: true]].

والـ POST بـ JSON: في Network هتلاقي طلب [[OPTIONS]] قبله (preflight) رجع [[204]] وفيه [[Access-Control-Allow-Methods: GET,POST,PATCH,DELETE]] و [[Access-Control-Allow-Headers: content-type]] و [[Access-Control-Max-Age: 600]]، وبعدها الـ POST الحقيقي. الـ preflight بيحصل لأن [[Content-Type: application/json]] مش من الأنواع «البسيطة»، وبعد أول مرة المتصفح بيخزّنه ١٠ دقايق.`,
          solCode: R`// Console على https://example.com
await fetch("http://localhost:3000/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "from example.com" }),
});
// Network: OPTIONS /api/tasks 204  ثم  POST /api/tasks`
        },
        {
          cmd: "express-rate-limit",
          title: "حد لعدد الطلبات من نفس المصدر",
          desc: R`[[rateLimit]] بيعد طلبات كل IP في فترة، ولو عدّى الحد يرد 429.

حد عام معقول للـ API كله، وحد أشد بكتير لـ login و «نسيت الباسورد» و OTP، لأن دول اللي بيتعمل عليهم تخمين. وورا Nginx أو Cloudflare لازم [[app.set("trust proxy", 1)]]، وإلا كل الطلبات هتبان جاية من IP واحد (الـ proxy) والكل يتحظر مع بعض.

والعداد هنا في ذاكرة الـ process. أول ما يبقى عندك أكتر من نسخة، أو عايز حد لكل يوزر أو لكل API key حسب الباقة، العداد يروح Redis: درس [[rate-limit-redis]] في المستوى التالت.`,
          example: R`import { rateLimit } from "express-rate-limit";

app.set("trust proxy", 1);

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false });

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { error: "Too many login attempts, try again later" },
});

app.use("/api", apiLimiter);
app.use("/api/auth/login", loginLimiter);`,
          try: R`خلي limit الـ login 3، واعمل ٤ محاولات غلط بـ [[curl -i]] وشوف 429 و headers الـ RateLimit في الرد. وبعدين ابعت [[X-Forwarded-For: 1.2.3.4]] بإيدك، مع trust proxy ومن غيره، واطبع [[req.ip]].`,
          flag: "script",
          deep: {
            why: "من غير حد، أي حد يجرّب مليون باسورد على حساب واحد، أو يبعت ألف طلب OTP (وانت بتدفع تمن كل SMS)، أو يعمل scraping لكل البيانات، أو يضغط السيرفر لحد ما يقع. الـ rate limit مش حماية كاملة، بس بيحوّل الهجمات دي من دقايق لسنين.",
            how: R`الـ limiter بيعمل key لكل طلب (افتراضيًا الـ IP، ومع IPv6 بيجمع الـ subnet كله عشان حد عنده ملايين العناوين ميلفّش عليه)، ويزوّد عداد في الـ store. أول ما العداد يعدّي [[limit]] جوه [[windowMs]]، بيرد 429 من غير ما الطلب يوصل للـ route.

الـ store الافتراضي في الذاكرة: كل نسخة من السيرفر ليها عداد لوحدها، ومع restart بيتصفّر. لو شغّال نسختين (PM2 cluster أو كذا container)، الحد الفعلي بيتضاعف. الحل store مشترك في Redis: [[store: new RedisStore({ prefix: "rl:api:", sendCommand: (c, ...a) => redis.call(c, ...a) })]]، و store لكل limiter (المكتبة بتطبع ValidationError في اللوج لو نفس الـ store اتدّى لاتنين). الإعداد الكامل وقرار [[passOnStoreError]] (لو Redis وقع تسمح ولا ترفض) في درس [[rate-limit-redis]].

الـ headers: [[standardHeaders: "draft-8"]] بيبعت مع كل رد [[RateLimit-Policy: "300-in-15min"; q=300; w=900; pk=:...:]] (الحصة والنافذة بالثواني) و [[RateLimit: "300-in-15min"; r=299; t=900]] (الباقي والثواني لحد التصفير)، ومع الـ 429 [[Retry-After]] بالثواني. العميل الكويس (والموبايل بتاعك) يقرا دول ويستنى بدل ما يخبط. و [[legacyHeaders: false]] بيشيل [[X-RateLimit-*]] القديمة.

[[trust proxy]]: [[req.ip]] بيتقري من الاتصال نفسه، وورا Nginx الاتصال جاي من Nginx، فالـ IP الحقيقي في [[X-Forwarded-For]]. الرقم [[1]] معناه «ثق في hop واحد قدامي». و [[true]] معناها ثق في أي حاجة، وده خطير: أي حد يبعت [[X-Forwarded-For]] مزيف ويبقى IP جديد مع كل طلب. و express-rate-limit بيحذّرك في اللوج لو شاف الإعداد ده.

و [[keyGenerator]] بيخليك تعد بحاجة غير الـ IP: id اليوزر للـ endpoints المحمية ([[(req) => req.user ? $__btuser:$__{req.user.id}$__bt : ipKeyGenerator(req.ip)]])، أو الـ API key لعملاء الـ API، أو الإيميل في login عشان تحمي الحساب نفسه حتى لو الهجوم من IPs كتير. ولو رجّعت الـ IP بنفسك لازم يعدّي على [[ipKeyGenerator]] (بيجمع عناوين IPv6 في subnet)، وإلا express-rate-limit بيطبع ValidationError في اللوج (مع أول طلب، من غير ما يوقّع السيرفر). و [[limit]] ممكن يبقى دالة: [[(req) => (req.user?.plan === "pro" ? 1000 : 100)]].`,
            when: "كل API عام. والحد الأشد على: login، و register، و forgot password، و OTP، وأي endpoint بيبعت إيميل أو SMS أو بيكلّم AI (بتدفع عليه).",
            mistakes: R`في مشروع حقيقي كان [[ioredis]] و [[rate-limit-redis]] متسطبين، والـ limiter فعليًا بيعد في الذاكرة، ومع أكتر من نسخة كل واحدة بتعد لوحدها. وفي نفس المشروع limiter صفحات الـ CMS كان [[skip]] بتاعه بيعدّي كل GET، فبقى بيحمي الـ POST بس. و [[trust proxy: true]] بدل رقم. ونسيانه خالص ورا Nginx: أول مرة الموقع يتزحم، كل الزوار يتحظروا مع بعض لأنهم «IP واحد».`
          },
          lines: [
            "الـ import بالاسم، الشكل الحديث.",
            "ثق في proxy واحد قدامك (Nginx)، فـ [[req.ip]] يبقى IP الزبون الحقيقي من [[X-Forwarded-For]].",
            "٣٠٠ طلب لكل IP كل ربع ساعة للـ API كله، والـ headers بالشكل الموحد الجديد.",
            "limiter تاني لـ login.",
            "نفس النافذة.",
            "١٠ محاولات بس.",
            "المحاولات الناجحة متتحسبش، فاليوزر العادي عمره ما يتحظر.",
            "رسالة JSON بدل النص الافتراضي.",
            "قفلة.",
            "ركّب العام على كل [[/api]].",
            "والأشد على login بس. الاتنين قبل الـ routes."
          ],
          sol: R`أول ٣ محاولات غلط بيرجّعوا 401 عادي، والرابعة [[429 Too Many Requests]] و [[{"error":"Too many login attempts, try again later"}]]. والـ headers مع [[draft-8]] شكلها: [[RateLimit: "3-in-15min"; r=0; t=900]] (فاضل 0، والعداد يتصفّر بعد 900 ثانية) و [[RateLimit-Policy: "3-in-15min"; q=3; w=900; pk=:...:]] و [[Retry-After: 900]]. ولأن [[skipSuccessfulRequests]] شغال، الـ login الصح مبيتعدّش.

[[X-Forwarded-For: 1.2.3.4]] من غير trust proxy: [[req.ip]] فاضل [[127.0.0.1]]، والمكتبة بتطبع تحذير [[ERR_ERL_UNEXPECTED_X_FORWARDED_FOR]]. ومع [[trust proxy]] بـ 1 ومن غير proxy حقيقي: [[req.ip]] بقى [[1.2.3.4]]، يعني أي حد يقدر يغيّر الـ IP بتاعه بـ header، ولو بعت IP مختلف كل مرة عمره ما هياخد 429.

الخلاصة: [[trust proxy]] لازم يطابق الحقيقة: 1 لو ورا nginx واحد أو load balancer واحد، و false لو السيرفر مكشوف مباشرة. غير كده الـ rate limit كله ملوش لازمة.`
        },
        {
          cmd: "sanitization",
          title: "النص اللي جاي من اليوزر: تنضّفه ولا تهرّبه؟",
          desc: R`القاعدة: اتحقق وانت داخل (validation)، وهرّب وانت خارج (escaping)، ونضّف HTML بس في الحقول اللي هي أصلًا HTML.

فيه ٣ حاجات بتتخلط: validation (ارفض اللي شكله غلط)، و sanitization (غيّر المدخل، زي trim أو شيل HTML)، و escaping (هرّب القيمة وقت ما تحطها في HTML أو SQL). React بيعمل escape لوحده، و Prisma بيبعت القيم كـ parameters لوحده، فأغلب الحماية الحقيقية بتحصل تلقائي لو استخدمت الأدوات صح. والـ HTML اللي جاي من rich text editor بس هو اللي محتاج DOMPurify.`,
          example: R`import DOMPurify from "isomorphic-dompurify";

const profileSchema = z.object({
  name: z.string().trim().max(80),
  bioHtml: z.string().max(5000).transform((html) => DOMPurify.sanitize(html)),
});

const search = String(req.query.q ?? "");
const found = await prisma.task.findMany({ where: { userId: req.user.id, title: { contains: search } } });

const email = z.email().parse(req.body.email);
const user = await User.findOne({ email });`,
          try: R`ابعت bioHtml فيه [[<img src=x onerror=alert(1)>]] واطبع اللي اتحفظ. وفي endpoint بـ Mongoose من غير zod، ابعت [[{"email": {"$ne": null}}]] وشوف بيرجّع مين.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه middleware بيعدّي DOMPurify على كل حقل في كل body. النتيجة: أي نص فيه [[<]] (زي «a < b» أو «<3») بيتحفظ متغير ([[&lt;]])، والحماية الحقيقية (escape وقت العرض) كانت موجودة أصلًا في React. التنضيف العشوائي بيبوّظ بيانات ومبيحميش أكتر. لازم تعرف كل خطر بيتقفل فين.`,
            how: R`كل نوع injection ليه مكان بيتقفل فيه:

SQL injection: بيتقفل بالـ parameters. Prisma وأي query builder بيبعتوا القيم منفصلة عن الـ SQL. الخطر بس في [[$queryRawUnsafe]] أو تجميع strings بإيدك، و [[$queryRaw]] بالـ tagged template آمن لأنه بيحوّل القيم لـ parameters.

NoSQL injection في Mongo: لو [[req.body.email]] وصل object زي [[{ $ne: null }]] بدل string، [[findOne({ email })]] بيرجّع أول يوزر. الحل validation إن القيمة string (zod)، و Mongoose عنده option اسمه [[sanitizeFilter]] بيلف أي object فيه مفتاح بيبدأ بـ [[$]] في [[$eq]]، فالـ operator اللي جاي من برّه بيتعامل كقيمة عادية. ومكتبة [[express-mongo-sanitize]] القديمة مبتشتغلش مع Express 5 لأنها بتكتب على [[req.query]].

XSS: بيتقفل وقت العرض. React بيهرّب أي نص تلقائي، والخطر في [[dangerouslySetInnerHTML]]. لو لازم تحفظ HTML من اليوزر، نضّفه بـ DOMPurify.

Path traversal: اسم ملف جاي من اليوزر زي [[../../.env]]. متستخدمش أسماء اليوزر في المسارات خالص، اعمل اسم بـ UUID (درس [[sharp]]).

وأي مكتبة «بتنضّف كل حاجة» زي [[xss-clean]]: مهجورة، ومبتشتغلش على Express 5، وبتدّيك إحساس زايف بالأمان.`,
            when: "validation على كل حاجة داخلة، دايمًا. sanitize للـ HTML بس لما الحقل HTML فعلًا. والـ escape بيحصل تلقائي لو استخدمت الأدوات صح (React و Prisma)، وشغلك إنك متكسرش ده.",
            mistakes: R`تنضّف الـ body كله بـ DOMPurify فتبوّظ الباسوردات والتوكنات (في المشروع الحقيقي كانوا عاملين قايمة استثناءات للحقول الحساسة عشان كده بالظبط). وتعتمد على [[xss-clean]] وهو مش شغال. وتهرّب HTML وقت الحفظ وكمان وقت العرض، فاليوزر يشوف [[&lt;]] على الشاشة بدل [[<]].`
          },
          lines: [
            "DOMPurify بيشتغل في Node والمتصفح.",
            "schema لبروفايل.",
            "الاسم نص عادي: trim وطول. مش محتاج تنضيف، React هيهرّبه وقت العرض.",
            "الحقل ده HTML فعلًا (من rich editor)، فنضّفه: يشيل script و onerror ويسيب b و p.",
            "قفلة.",
            "البحث: اتأكد إنه نص...",
            "و Prisma بيبعته كـ parameter، فمفيش SQL injection مهما اتكتب. ومعاه شرط الملكية.",
            "في Mongo: اتأكد إنه إيميل، يعني string...",
            "فلو حد بعت object فيه [[$ne]] بدل إيميل، zod رفضه قبل ما يوصل للـ query."
          ],
          sol: R`اللي بيتحفظ من [[<p>Hi <b>there</b></p><img src=x onerror=alert(1)><script>alert(2)</script>]] هو [[<p>Hi <b>there</b></p><img src="x">]]: الـ [[onerror]] اتشال، و [[<script>]] اتشال كله، والتنسيق العادي فضل. ولو فيه [[<a href="javascript:alert(3)">]] بيبقى [[<a>]] من غير href. لو لقيت [[onerror]] لسه موجود، يبقى بتحفظ [[req.body.bioHtml]] الأصلي مش الناتج من الـ schema.

وفي Mongoose من غير zod: [[{"email": {"$ne": null}}]] بيتحول لـ [[User.findOne({ email: { $ne: null } })]]، يعني «أول يوزر الإيميل بتاعه مش null»، فبيرجّع أول يوزر في الـ collection (غالبًا الأدمن اللي اتعمل الأول) من غير ما تعرف إيميله. في login ده ممكن يبقى دخول بدون باسورد لو الكود بيقارن بطريقة غلط.

مع [[z.email().parse(req.body.email)]] نفس الطلب بيرمي [[ZodError]] و [[Invalid input: expected string, received object]] وبيبقى 400. (وحل تاني على مستوى Mongoose: [[mongoose.set("sanitizeFilter", true)]].)`
        }
      ]
    },
    {
      t: "قاعدة البيانات",
      l: 2,
      n: "Prisma من جوه الـ services، و transactions للعمليات اللي لازم تتم كلها أو ولا حاجة، و pagination لأي قايمة",
      items: [
        {
          cmd: "Prisma client",
          title: "كلّم الداتابيز من الـ service",
          desc: R`Prisma بيولّد client من الـ schema فيه دالة لكل جدول ([[prisma.task.findMany]] و [[create]] و [[update]])، وبتعمل منه instance واحد للتطبيق كله في [[db.js]].

إزاي تكتب الـ schema والـ migrations وإعداد Prisma 7 (الـ generator والـ driver adapter)، ده في تاب «SQL و Prisma». هنا بنستخدمه من Express.`,
          example: R`// services/tasks.service.js
import { prisma } from "../db.js";

export const list = (userId) =>
  prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true, title: true, done: true } });

export const create = (userId, data) => prisma.task.create({ data: { ...data, userId } });

export const update = async (userId, id, data) => {
  const { count } = await prisma.task.updateMany({ where: { id, userId }, data });
  if (count === 0) throw new AppError(404, "Task not found");
  return prisma.task.findUnique({ where: { id } });
};`,
          try: R`حوّل الـ array اللي في الذاكرة لجدول Task في Prisma، وخلي كل الـ services تستخدمه. شغّل السيرفر مرتين ورا بعض واتأكد إن البيانات لسه موجودة. وفعّل [[log: ["query"]]] في الـ client وشوف الـ SQL الحقيقي.`,
          flag: "script",
          deep: {
            why: "الـ array اللي في الذاكرة بيضيع مع كل restart ومبيتشاركش بين نسختين. الداتابيز هي المكان الحقيقي، و Prisma بيخليك تكلّمها بـ JavaScript فيه autocomplete وأنواع بدل SQL strings، ومن غير SQL injection.",
            how: R`الـ client بيفتح pool من الاتصالات بالداتابيز ويعيد استخدامها، وكل [[new PrismaClient()]] يعني pool جديد. عشان كده instance واحد في [[db.js]]، وكل الملفات بتستورد نفس الـ module (والـ module في Node بيتحمّل مرة واحدة). اتنين أو تلاتة instances في ملفات مختلفة معناها اتصالات مضاعفة، ومع كل restart في التطوير ممكن توصل لـ [[too many connections]].

في Prisma 7: الـ generator الجديد [[prisma-client]] بيطلّع الكود في فولدر انت بتحدده (مش جوه node_modules) وبتستورد منه، ومحتاج driver adapter زي [[@prisma/adapter-pg]]، ومتغيرات البيئة مبقتش بتتقري لوحدها. والكود المتولّد TypeScript، فلو الـ backend بتاعك JavaScript غالبًا هتكتبه TypeScript أو تشغّله بـ tsx. كل ده بالتفصيل في تاب «SQL و Prisma».

[[select]] بيرجّع الحقول اللي طلبتها بس، ودا مهم لحاجتين: الأداء، وإنك متسرّبش [[passwordHash]] في رد بالغلط. و [[include]] بيجيب العلاقات ([[include: { tags: true }]]).

والأخطاء ليها [[code]]: [[P2002]] قيمة unique اتكررت (الإيميل موجود)، و [[P2025]] السجل مش موجود في update أو delete. حوّلهم لـ 409 و 404 في الـ error handler.`,
            when: "أي backend بـ Postgres أو MySQL أو SQLite. البدائل: Drizzle (أقرب لـ SQL وأخف)، و Kysely، أو [[pg]] مباشرة لو عايز SQL صافي.",
            mistakes: R`في مشروع حقيقي كان [[db.js]] عامل singleton صح، بس فيه كمان [[setInterval]] كل دقيقتين يعمل [[SELECT 1]] ويعيد الاتصال بإيده. Prisma بيدير الـ pool لوحده، والكود ده زوّد تعقيد من غير فايدة. وترجّع نتيجة [[prisma.user.findUnique]] كلها في الرد ومعاها الـ hash. و [[await]] جوه loop على ١٠٠٠ عنصر بدل [[createMany]] أو شرط [[in]].`
          },
          lines: [
            "الـ client الوحيد من db.js.",
            "مهام يوزر معين...",
            "بشرط الملكية، والأحدث الأول، والحقول اللي محتاجها بس.",
            "إضافة: البيانات المتحققة ومعاها صاحبها من التوكن.",
            "تعديل.",
            "عدّل بشرط الملكية.",
            "متعدلش حاجة: 404.",
            "رجّع النسخة الجديدة.",
            "قفلة."
          ],
          sol: R`بعد ما تعمل مهام وتقفل السيرفر وتشغّله تاني، [[GET /api/tasks]] بيرجّع نفس المهام، لأنها في Postgres مش في array في الذاكرة. والـ ids بتكمّل من آخر رقم ومبترجعش لـ 1.

ومع تفعيل [[log]] على query، كل استدعاء بيطبع SQL حقيقي، مثلًا [[findMany]] بـ [[select]] و [[orderBy]]: [[prisma:query SELECT "public"."Task"."id", "public"."Task"."title", "public"."Task"."done" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC OFFSET $2]]. لاحظ [[$1]]: القيم بتتبعت كـ parameters، ده اللي بيمنع SQL injection. و [[create]] بيطلع [[INSERT INTO ... RETURNING ...]].

لو البيانات اختفت بعد restart، يبقى لسه فيه service بتستخدم الـ array القديمة. ولو شفت [[too many connections]] أو السيرفر بطيء في البداية، دوّر على [[new PrismaClient]] في أكتر من ملف.`,
          solCode: R`// db.js
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});`
        },
        {
          cmd: "$transaction",
          title: "عمليتين لازم يحصلوا مع بعض أو ميحصلوش خالص",
          desc: R`الـ transaction بتضمن إن كل الـ queries جواها تنجح مع بعض، أو لو واحدة فشلت كله يرجع زي ما كان.

الأوردر يتعمل، والمخزون يقل، والكوبون يتحسب: لو حاجة وقعت في النص، مفيش أوردر من غير خصم مخزون. في Prisma: [[prisma.$transaction(async (tx) => { ... })]]، وجواها بتستخدم [[tx]] بدل [[prisma]].`,
          example: R`export async function redeemCoupon(userId, code) {
  return prisma.$transaction(async (tx) => {
    const coupon = await tx.coupon.findUnique({ where: { code } });
    if (!coupon) throw new AppError(404, "Coupon not found");
    const updated = await tx.coupon.updateMany({
      where: { id: coupon.id, usedCount: { lt: coupon.maxUses } },
      data: { usedCount: { increment: 1 } },
    });
    if (updated.count === 0) throw new AppError(409, "Coupon fully used");
    return tx.redemption.create({ data: { userId, couponId: coupon.id } });
  });
}`,
          try: R`اعمل كوبون [[maxUses: 1]]، وابعت طلبين في نفس اللحظة (أمرين curl في نفس السطر بـ [[&]] بينهم). مع الكود ده واحد بس هينجح. وبعدين جرّب النسخة الغلط: [[count]] وبعدين [[create]] من غير الشرط، وشوف الاتنين بينجحوا.`,
          flag: "script",
          deep: {
            why: "أي عملية بتلمس أكتر من صف ممكن تقع في النص: السيرفر يقف، أو constraint يتكسر، أو خطأ في الكود. من غير transaction بتفضل بيانات نص-نص: فلوس اتخصمت ومفيش أوردر. ومع طلبين في نفس اللحظة، «اتأكد وبعدين اكتب» بيسمح للاتنين يعدّوا من نفس الشرط.",
            how: R`Prisma فيه شكلين: array ([[prisma.$transaction([q1, q2])]]) لـ queries مستقلة عن بعض، و interactive (الدالة) لما query محتاجة نتيجة اللي قبلها. في الـ interactive، Prisma بيفتح [[BEGIN]]، وينفّذ اللي جوه على نفس الاتصال، ولو الدالة خلصت يعمل [[COMMIT]]، ولو رمت خطأ يعمل [[ROLLBACK]] (درس «BEGIN و ROLLBACK» في تاب «PostgreSQL»).

الـ transaction لوحدها مش بتحل الـ race condition: في مستوى العزل الافتراضي في Postgres (Read Committed)، طلبين ممكن يقروا نفس [[usedCount]] مع بعض ويقرروا الاتنين إن لسه فيه مكان. عشان كده الشرط اتحط جوه الـ update نفسه، والداتابيز بتقفل الصف وقت الـ update، فالطلب التاني بيستنى ويشوف القيمة الجديدة ومبيلاقيش صف يطابق. البدائل: [[SELECT ... FOR UPDATE]] بـ [[$queryRaw]]، أو [[isolationLevel: "Serializable"]] مع إعادة المحاولة لو فشلت، أو unique constraint يمنع التكرار.

الـ interactive transaction بتمسك اتصال من الـ pool طول ما هي شغالة، وليها timeout افتراضي ٥ ثواني. عمرك ما تنادي API خارجي (دفع أو إيميل) جوه transaction: ابعت الإيميل بعد ما الـ transaction تخلص.`,
            when: "أي عملية بتكتب في أكتر من جدول ولازم تفضل متسقة: أوردر، وتحويل رصيد، وكوبون، وتسجيل مع إنشاء بروفايل. وأي «اتأكد وبعدين اكتب» على حاجة ليها حد.",
            mistakes: R`في مشروع حقيقي كان التحقق من حد استخدام الكوبون [[count]] وبعدين [[create]] كخطوتين منفصلتين من غير transaction ولا شرط ذرّي، فطلبين في نفس اللحظة ممكن يعدّوا الحد. وتستخدم [[prisma]] بدل [[tx]] جوه الـ transaction بالغلط، فالـ query دي بره الـ transaction ومبترجعش مع الـ rollback. وتحط fetch لبوابة دفع جوه transaction فتفضل ماسكة اتصال ١٠ ثواني وتقع بـ timeout.`
          },
          lines: [
            "استخدام كوبون ليه حد أقصى.",
            "كل اللي جوه transaction واحدة، و [[tx]] client مربوط بيها.",
            "هات الكوبون.",
            "مش موجود: throw، والـ transaction كلها ترجع.",
            "زوّد العداد، بس بشرط...",
            "إنه لسه أقل من الحد. الشرط والزيادة في query واحدة، فطلبين في نفس اللحظة ميعدّوش الاتنين.",
            "زوّد ١.",
            "قفلة.",
            "متعدلش حاجة؟ يبقى خلص. throw يلغي كل حاجة.",
            "سجّل الاستخدام. لو ده فشل، الزيادة اللي فوق بترجع.",
            "قفلة الـ transaction.",
            "قفلة."
          ],
          sol: R`مع الكود ده، واحد من الطلبين بينجح (رد الـ redemption) والتاني بياخد [[409]] و [[{"error":"Coupon fully used"}]]، وفي القاعدة redemption واحد بس و [[usedCount]] بـ 1. السبب: [[updateMany]] بالشرط [[usedCount < maxUses]] بيتنفّذ كـ UPDATE واحد، وPostgres بيقفل الصف، فالطلب التاني لما يوصل يلاقي الشرط مبقاش متحقق و [[count]] بـ 0.

النسخة الغلط (تعد الـ redemptions، ولو أقل من maxUses تعمل create) الاتنين بينجحوا وتلاقي redemptions 2 لكوبون مسموح مرة واحدة: الطلبين قروا العدد 0 في نفس الوقت قبل ما أي واحد يكتب. ولأن ده race، ممكن تحتاج تجرّب كذا مرة، أو تحط [[await new Promise((r) => setTimeout(r, 50))]] بين الـ count والـ create عشان تشوفه كل مرة.

ولو النسخة الصح نفسها نجح فيها الاتنين، اتأكد إن الشرط [[usedCount: { lt: coupon.maxUses } ]] جوه الـ [[where]] بتاع الـ update نفسه، مش [[if]] في JavaScript قبله.`,
          solCode: R`# كوبون maxUses: 1 وطلبين في نفس اللحظة
curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN" & curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN"; wait
# {"id":1,"userId":7,"couponId":1}{"error":"Coupon fully used"}`
        },
        {
          cmd: "mongoose",
          title: "لو الداتابيز MongoDB",
          desc: R`Mongoose بيدّيك schema و model لكل collection في Mongo ([[Task.find()]] و [[Task.create()]])، وبيقعد في نفس مكان Prisma في المعمارية: جوه الـ services.

أوامر الشيل (mongosh والباك أب) في تاب «MongoDB». هنا الاستخدام من Express باختصار.`,
          example: R`import mongoose from "mongoose";

await mongoose.connect(config.MONGO_URL);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  done: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);

const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20).lean();

const recent = await Task.find().sort({ createdAt: -1 }).limit(50).populate({ path: "userId", select: "name email" }).lean();`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل الـ model ده، وجرّب [[Task.create]] من غير title وشوف الـ ValidationError. وقارن سرعة [[find()]] بـ [[lean()]] ومن غيرها على ١٠٠٠٠ مستند. وبعدين فعّل [[mongoose.set("debug", true)]] وهات ٥٠ مهمة ومعاها اسم صاحبها بطريقتين: loop فيه [[User.findById]] لكل مهمة، و [[populate]]. عد الـ queries في اللوج.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير (خصوصًا لوحات الإدارة والمشاريع القديمة) مبنية على Mongo و Mongoose، وأي انترفيو Node ممكن يسألك عنه. Mongo نفسها مفيهاش schema، و Mongoose بيرجّعلك الشكل والتحقق على مستوى التطبيق.",
            how: R`[[mongoose.connect]] بيفتح pool، و Mongoose بيخزّن أي عمليات لحد ما الاتصال يجهز (buffering)، فالـ query قبل الاتصال مبتفشلش على طول: بتستنى ١٠ ثواني وبعدين تفشل. عشان كده [[await connect]] قبل [[listen]].

الـ schema بتعمل validation وقت [[save]] و [[create]]، بس مش افتراضيًا في [[updateOne]] و [[findOneAndUpdate]] إلا لو [[runValidators: true]]. والـ documents اللي بترجع من [[find]] objects تقيلة فيها دوال (save و populate)، و [[lean()]] بيرجّع objects عادية أسرع وأخف لو هتقرا بس.

[[populate("userId")]] بيجيب المستندات المرتبطة بـ query تانية (Mongo مفيهاش joins زي SQL): بيجمع كل الـ userIds من النتيجة ويعمل [[User.find({ _id: { $in: [...] } })]] واحدة، ويحط كل يوزر مكان الـ id بتاعه. يعني ٥٠ مهمة بيوزرهم = ٢ queries. أما الـ loop اللي بيعمل [[await User.findById(t.userId)]] لكل مهمة فده N+1: ٥٠ مهمة = ٥١ query، وكل واحدة رحلة للقاعدة. و [[select]] جوه populate بيجيب الحقول اللي محتاجها بس (ومتنساش إن من غيره الـ hash بتاع الباسورد ممكن يطلع في الرد). والـ populate المتداخل ([[populate({ path: "userId", populate: { path: "company" } })]]) كل مستوى query زيادة، ولو محتاج joins وتجميع تقيل، [[aggregate]] مع [[$lookup]] بيعملها في query واحدة على السيرفر.

الـ transactions: [[await mongoose.connection.transaction(async (session) => { await A.updateOne(..., { session }); await B.updateOne(..., { session }); })]]. لازم تعدّي [[session]] لكل عملية جواها، وأي عملية من غيره بتتنفّذ برّه الـ transaction ومش بترجع لو حصل rollback. والدالة دي بتعيد المحاولة لوحدها في أخطاء transient، فالكود جواها لازم يبقى آمن لو اتنفّذ مرتين (متبعتش إيميل جواها).

والـ transactions في Mongo محتاجة replica set حتى لو node واحدة. و ObjectId مش صحيح (زي [[abc]]) بيعمل [[CastError]]، فاتحقق منه قبل الـ query.`,
            when: "بيانات شكلها بيتغير كتير، أو مستندات متداخلة بتتقري مع بعض، أو مشروع قايم عليه. للبيانات المترابطة (فلوس وأوردرات وصلاحيات)، Postgres غالبًا اختيار أأمن.",
            mistakes: R`[[findOneAndUpdate]] من غير [[runValidators]] فبيانات غلط تتحفظ. و [[find()]] من غير [[limit]] على collection فيها مليون مستند. و [[findById]] جوه loop بدل populate أو [[$in]] (N+1). و transaction بتنسى [[session]] في عملية من عملياتها. وفي مشروع حقيقي كان [[pre("save")]] بيعمل hash للباسورد (صح)، بس الـ model نفسه كان فيه حقل للباسورد نص صريح جنبه (درس [[bcrypt]]).`
          },
          lines: [
            "Mongoose.",
            "اتصل مرة واحدة وانت بتقوم، قبل listen.",
            "شكل المستند.",
            "نص مطلوب، يتشال منه المسافات، وأقصاه ٢٠٠.",
            "boolean والافتراضي false.",
            "مرجع ليوزر، ومعاه index عشان البحث بيه يبقى سريع.",
            "[[timestamps]] بيضيف createdAt و updatedAt لوحده.",
            "الـ model اللي هتستخدمه في الـ services.",
            "مهام اليوزر، الأحدث، أول ٢٠. [[lean]] بيرجّع objects عادية أسرع.",
            "آخر ٥٠ مهمة ومعاها اسم وإيميل صاحبها: query للمهام وواحدة لكل اليوزرز مع بعض، مش واحدة لكل مهمة."
          ],
          sol: R`[[Task.create({ userId })]] من غير title بيرمي [[ValidationError]] ورسالته [[Task validation failed: title: Path $__bttitle$__bt is required.]]، وفي [[err.errors.title.kind]] هتلاقي [[required]]. حوّله في الـ error handler لـ 400.

[[find()]] من غير [[lean()]] بيرجّع Mongoose documents (فيها getters و [[save()]] و change tracking)، و [[lean()]] بيرجّع objects عادية. على ١٠٠٠٠ مستند lean بيبقى أسرع بشكل واضح وبيستهلك ذاكرة أقل (غالبًا مرتين لـ ٣ مرات، حسب الجهاز والحجم). للقراءة وإرجاع JSON استخدم lean دايمًا.

وفي اللوج بـ [[debug]]: الـ loop بيعمل 51 query ([[tasks.find]] مرة، و [[users.findOne]] ٥٠ مرة، واحدة لكل مهمة): ده N+1. و [[populate]] بيعمل 2 بس: find للمهام، وبعدين [[users.find({ _id: { $in: [...] } })]] واحدة لكل الـ ids. لو populate رجّع [[userId]] بـ null، يبقى الـ ref اسمه غلط أو اليوزر اتمسح.`
        },
        {
          cmd: "pagination",
          title: "متبعتش ١٠٠ ألف صف في رد واحد",
          desc: R`أي endpoint بيرجّع قايمة لازم يرجّع صفحة ([[?page=2&limit=20]])، والـ limit ليه حد أقصى من عندك مهما اليوزر طلب.

والرد فيه البيانات ومعاها معلومات الصفحة. والفلترة والترتيب من الـ query برضه، بس من قايمة مسموحة: الترتيب بـ [[createdAt]] أو [[title]] بس، مش بأي عمود اليوزر يكتبه.`,
          example: R`const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(["createdAt", "title"]).default("createdAt"),
  done: z.stringbool().optional(),
});

router.get("/", async (req, res) => {
  const { page, limit, sort, done } = ListQuery.parse(req.query);
  const where = { userId: req.user.id, ...(done !== undefined && { done }) };
  const [items, total] = await prisma.$transaction([
    prisma.task.findMany({ where, orderBy: [{ [sort]: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
    prisma.task.count({ where }),
  ]);
  res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
});`,
          try: R`اعمل ١٠٠٠ مهمة بسكربت seed، وجرّب [[?page=3&limit=10]] و [[?limit=5000]] و [[?sort=password]]. التانيين لازم 400: زوّد في الـ error handler إن [[ZodError]] يتحول لـ 400. وبعدين جرّب [[?page=90]] وقيس الوقت، وفكّر ليه بيبطأ مع الصفحات البعيدة.`,
          flag: "script",
          deep: {
            why: "القايمة بتكبر مع الوقت. endpoint بيرجّع كله بيبقى سريع أول شهر، وبعد سنة بيرجّع ٥٠ ميجا وياخد ١٠ ثواني ويوقّع الموبايل. والـ limit من غير حد أقصى بيخلي أي حد يطلب مليون صف في طلب واحد.",
            how: R`offset pagination ([[skip]] و [[take]]، يعني [[OFFSET]] و [[LIMIT]] في SQL) أبسط حاجة وبتدّيك أرقام صفحات. عيبين: الداتابيز لازم تعدّي على كل الصفوف اللي قبل الـ offset، فالصفحة ٥٠٠٠ بطيئة. ولو حاجة اتضافت وانت بتقلّب، بتشوف عنصر مرتين أو يفوتك.

cursor pagination: بدل «اقفز ٤٠»، «هات ٢٠ بعد العنصر ده». في Prisma: [[cursor: { id: lastId }, skip: 1, take: 20]]، أو شرط [[id: { lt: lastId }]]. سريع مهما بعدت لأنه بيستخدم الـ index، وثابت مع الإضافات. بس مفيش «روح لصفحة ٧». ده اللي بيستخدم في infinite scroll والـ feeds.

[[count]] على جدول كبير ممكن يبقى بطيء هو كمان. في الـ cursor pagination غالبًا مش محتاجه: بترجّع [[nextCursor]] بس، ولو null يبقى خلصت.

والترتيب لازم يبقى ثابت: لو اتنين ليهم نفس [[createdAt]]، رتّب بـ id كمان (زي المثال)، وإلا نفس العنصر ممكن يظهر في صفحتين. واعمل index على الأعمدة اللي بتفلتر وترتّب بيها. وتصميم الـ pagination في الـ API بالتفصيل في تاب «APIs متقدمة».`,
            when: "أي قايمة ممكن تعدّي ١٠٠ عنصر. offset للوحات الأدمن والجداول بأرقام صفحات، و cursor للـ feeds والموبايل والجداول الكبيرة.",
            mistakes: R`في مشروع حقيقي الـ schema المشتركة للـ pagination كانت بتسمح بـ [[pageSize]] لحد ١٠٠٠، يعني صفحة واحدة ممكن تبقى تقيلة جدًا. خلي الحد الأقصى صغير. وتعدّي [[req.query.sort]] مباشرة لـ [[orderBy]]. و [[skip: page * limit]] بدل [[(page - 1) * limit]] فالصفحة الأولى تضيع.`
          },
          lines: [
            "schema للـ query.",
            "رقم الصفحة من ١، والافتراضي ١.",
            "حجم الصفحة من ١ لـ ١٠٠ مهما طلب، والافتراضي ٢٠.",
            "الترتيب من قايمة مسموحة بس.",
            R`فلتر اختياري، و [[stringbool]] بيحوّل [["false"]] لـ false فعلًا.`,
            "قفلة.",
            "قايمة المهام.",
            "اتحقق من الـ query، ولو غلط بيرمي ZodError.",
            "الشرط: مهامي، ولو فيه فلتر done زوّده.",
            "الصفحة والعدد الكلي في transaction واحدة (الشكل الـ array).",
            "رتّب بالحقل المختار وبعده الـ id عشان الترتيب يبقى ثابت، واقفز على الصفحات اللي فاتت، وخد limit.",
            "العدد الكلي بنفس الشرط.",
            "قفلة.",
            "البيانات ومعلومات الصفحات عشان الواجهة تعمل الأزرار.",
            "قفلة."
          ],
          sol: R`[[?page=3&limit=10]] بيرجّع ١٠ مهام (من الـ 21 للـ 30 في الترتيب) ومعاهم [[{"page":3,"limit":10,"total":1000,"pages":100}]].

[[?limit=5000]] و [[?sort=password]] من غير تعديل بيرجّعوا 500، لأن [[ListQuery.parse]] بيرمي [[ZodError]] مالوش status. بعد التعديل في الـ error handler: [[400]] مع [[{"limit":["Too big: expected number to be <=100"]}]] و [[{"sort":["Invalid option: expected one of "createdAt"|"title""]}]]. و [[sort=password]] مهم: من غير enum حد يقدر يرتّب على أي عمود ويستنتج بيانات منه.

و [[?page=90]]: مع ١٠٠٠ صف الفرق صغير، بس الـ SQL فيه [[OFFSET 890]]، والقاعدة لازم تقرا الـ 890 صف وترميهم قبل ما ترجّع الـ 10. كل ما الصفحة تبعد كل ما الشغل يزيد، ومع ملايين الصفوف بيبان جدًا. الحل للقوايم الطويلة cursor pagination ([[where: { id: { lt: lastId } }]] مع index).`,
          solCode: R`import { z, ZodError } from "zod";

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Invalid input", issues: z.flattenError(err).fieldErrors });
  }
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`
        }
      ]
    }
]);
