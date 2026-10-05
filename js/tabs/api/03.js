// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "ملفات وإيميلات ولوجات",
      l: 2,
      n: "multer و sharp للصور، و nodemailer و Resend للإيميلات، و morgan و pino للوجات",
      items: [
        {
          cmd: "multer",
          title: "استقبل ملف من فورم بحدود واضحة",
          desc: R`رفع الملفات بييجي [[multipart/form-data]] و [[express.json()]] مبيقراهوش، و [[multer]] بيقراه ويحط الملف في [[req.file]] والحقول النصية في [[req.body]].

أهم حاجة الحدود: أقصى حجم، وعدد الملفات، والأنواع المسموحة. من غيرها أي حد يرفعلك ملف ٥ جيجا.`,
          example: R`import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
    cb(ok ? null : new AppError(400, "Only JPEG, PNG or WebP"), ok);
  },
});

router.post("/avatar", requireAuth, upload.single("avatar"), users.uploadAvatar);
// curl -F "avatar=@me.jpg" -H "Authorization: Bearer ..." localhost:3000/api/users/avatar`,
          try: R`ارفع صورة بـ [[curl -F]]، وبعدين ملف ٦ ميجا، وبعدين PDF غيّرت اسمه لـ [[x.jpg]]. شوف كل واحد بيرجّع إيه، وزوّد في الـ error handler إن [[MulterError]] بكود [[LIMIT_FILE_SIZE]] يتحول لـ 413.`,
          flag: "script",
          deep: {
            why: "صور البروفايل، وإيصالات الدفع، والمستندات: كل تطبيق تقريبًا بيستقبل ملفات. والرفع أخطر input عندك: كبير، و binary، واسمه ونوعه جايين من العميل، وممكن يتنفّذ لو اتحط في مكان غلط.",
            how: R`multer بيقرا الـ stream بتاع الطلب ويفصل الأجزاء. [[memoryStorage]] بيجمع الملف كله في Buffer في الرام ([[req.file.buffer]])، و [[diskStorage]] بيكتبه على الديسك وانت بتحدد الفولدر والاسم. و [[limits.fileSize]] بيقطع الرفع أول ما يعدّي الحد ويرمي [[MulterError]] بكود [[LIMIT_FILE_SIZE]]، والخطأ بيروح لـ error middleware.

[[file.mimetype]] و [[file.originalname]] جايين من العميل كما هم، فأي حد يسمّي ملف [[shell.php.jpg]] ويقول إنه [[image/jpeg]]. عشان كده الفلتر هنا أول خط بس، والتحقق الحقيقي إنك تقرا محتوى الملف (sharp بيفشل لو مش صورة، الدرس الجاي)، وعمرك ما تستخدم [[originalname]] كاسم للحفظ.

[[single]] لملف واحد، و [[array("photos", 5)]] لكذا ملف في نفس الحقل، و [[fields]] لحقول مختلفة. والحقول النصية في نفس الفورم بتوصل في [[req.body]] بعد multer بس، فالـ validation بتاعها لازم يبقى بعده.

وللملفات الكبيرة (فيديوهات)، الأحسن الواجهة ترفع مباشرة على S3 أو R2 بـ presigned URL، والـ API يدّيها اللينك بس، فالملف مبيعدّيش على السيرفر خالص.`,
            when: "أي رفع ملفات لـ Express. memoryStorage للصور الصغيرة اللي هتعالجها، و diskStorage للملفات الأكبر، و presigned URL للفيديوهات والملفات الضخمة.",
            mistakes: R`في مشروع حقيقي كان فيه [[memoryStorage]] مع حد ١٠٠ ميجا للفيديو و ٥٠٠ ميجا للـ PDF. كل رفع بيتحط كله في الرام، فكام رفعة في نفس الوقت ممكن يوقّعوا السيرفر (out of memory). للملفات الكبيرة: disk أو رفع مباشر. وفي نفس المشروع رسالة الخطأ كانت بتقول «10MB» والحد الفعلي 100MB، فخلي الرسالة تتبني من نفس الرقم. وتحفظ بـ [[originalname]] مع diskStorage، فحد يرفع ملف بنفس اسم ملف موجود في الفولدر (زي صورة يوزر تاني) ويكتب عليه، ولو [[preservePath: true]] متفعّل كمان اسم زي [[../../app.js]] يطلع بره الفولدر.`
          },
          lines: [
            "multer.",
            "إعدادات الرفع.",
            "خلي الملف في الذاكرة كـ Buffer عشان sharp يعالجه بعدين. مناسب للصور الصغيرة بس.",
            "أقصى حجم ٥ ميجا، وملف واحد.",
            "فلتر بيشتغل قبل ما الملف يتقري.",
            "النوع من قايمة مسموحة. خلي بالك: الـ mimetype جاي من العميل ويتزوّر، والتحقق الحقيقي بعدين بـ sharp.",
            "ارفض بـ 400 أو اقبل.",
            "قفلة الفلتر.",
            "قفلة.",
            R`[[single("avatar")]]: ملف واحد في الحقل ده، وبعد requireAuth عشان محدش يرفع من غير login.`
          ],
          sol: R`الصورة العادية بتعدّي و [[req.file]] فيه [[buffer]] و [[mimetype: "image/jpeg"]] و [[size]]. الملف الـ ٦ ميجا من غير تعديل بيرجّع 500، لأن multer بيرمي [[MulterError]] كوده [[LIMIT_FILE_SIZE]] ورسالته [[File too large]] ومالوش status. بعد التعديل: [[413]] و [[{"error":"File too large"}]].

والـ PDF اللي اسمه [[x.jpg]]: بيعدّي من الـ [[fileFilter]]! لأن [[file.mimetype]] جاي من الكلاينت، و curl بيخمّنه من الامتداد فبيبعت [[image/jpeg]]. فالفلتر ده بيحمي من الغلط العادي بس (PDF بامتداده الحقيقي بيرجع 400 و [[Only JPEG, PNG or WebP]])، والتحقق الحقيقي لازم يبقى على محتوى الملف نفسه، وده اللي sharp بيعمله في الدرس الجاي ([[Not a valid image]]).

لو الصورة الصح رجعت [[Unexpected field]]، يبقى اسم الحقل في [[-F "avatar=@..."]] مش زي [[upload.single("avatar")]].`,
          solCode: R`import multer from "multer";

export function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ error: err.message, code: err.code });
  }
  const status = err.status ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`
        },
        {
          cmd: "sharp",
          title: "صغّر الصورة واتأكد إنها صورة فعلًا",
          desc: R`[[sharp]] بيقرا الصورة ويصغّرها ويحوّلها لـ WebP، ولأنه لازم يفكها عشان يشتغل عليها، لو الملف مش صورة حقيقية بيفشل.

ودي أحسن طريقة تتأكد من النوع بعد multer. وإعادة الترميز بتشيل الـ metadata (زي مكان التصوير من الـ GPS) افتراضيًا، ودا مهم لخصوصية اليوزرز.`,
          example: R`import sharp from "sharp";
import { randomUUID } from "node:crypto";

export async function saveAvatar(buffer) {
  const meta = await sharp(buffer).metadata().catch(() => null);
  if (!meta || !["jpeg", "png", "webp"].includes(meta.format)) throw new AppError(400, "Not a valid image");
  const name = $__bt$__{randomUUID()}.webp$__bt;
  await sharp(buffer).rotate().resize(512, 512, { fit: "cover" }).webp({ quality: 80 }).toFile($__btuploads/avatars/$__{name}$__bt);
  return $__bt/uploads/avatars/$__{name}$__bt;
}`,
          try: R`اعمل فولدر [[uploads/avatars]]، وارفع صورة موبايل فيها GPS، وقارن الـ EXIF قبل وبعد بأي EXIF viewer. وارفع ملف نصي اسمه منتهي بـ [[.jpg]] واتأكد إنه 400. وقارن الحجم قبل وبعد.`,
          flag: "script",
          deep: {
            why: "صورة الموبايل ٤ لـ ٨ ميجا، والبروفايل بيتعرض ٦٤ بكسل. من غير resize، كل صفحة فيها ١٠ يوزرز بتحمّل ٥٠ ميجا. ومن غير تحقق من المحتوى، أي ملف متسمّي صورة بيعدّي. وصور الموبايل فيها GPS بيقول اليوزر ساكن فين.",
            how: R`sharp مبني على مكتبة libvips (مكتوبة C)، فسريع جدًا وبيستهلك ذاكرة قليلة، والشغل التقيل بيحصل في thread pool مش على الـ event loop. و [[metadata()]] بيقرا الـ header بس من غير ما يفك الصورة كلها، فسريع.

[[rotate()]] من غير رقم بيقرا اتجاه EXIF ويلف الصورة فعلًا، لأن بعد ما الـ metadata تتشال الصورة هتظهر مقلوبة لو ملفتهاش. [[fit: "cover"]] بيقص ويملّا المقاس، و [[inside]] بيصغّر من غير قص، و [[withoutEnlargement]] بيمنع تكبير صورة صغيرة.

الاسم: [[randomUUID()]] بدل اسم اليوزر، فمفيش path traversal ولا ملف يكتب على ملف تاني.

التخزين على الديسك ([[uploads/]]) أبسط، بس بيضيع لو الـ container اتمسح من غير volume، ومبيتشاركش بين سيرفرين. للإنتاج الأحسن object storage زي S3 أو Cloudflare R2 أو Supabase Storage: [[toBuffer()]] بدل [[toFile()]]، وترفع الـ Buffer بالـ SDK بتاعهم ([[PutObjectCommand]] في [[@aws-sdk/client-s3]] مثلًا)، وتحفظ الـ key في الداتابيز. في مشروع حقيقي كان الشكل ده بالظبط: multer في الذاكرة، ثم sharp، ثم رفع لـ Supabase Storage.

والملفات الخاصة (إيصالات، ومستندات) متتخدمش static خالص: route محمي بيتأكد من الملكية وبعدين [[res.sendFile]]، أو signed URL بعمر قصير.`,
            when: "أي صورة جاية من يوزر. ولو هتعرضها بأكتر من مقاس، اعمل أكتر من نسخة (thumb و medium) وقت الرفع، أو استخدم CDN بيعمل resize.",
            mistakes: R`تحط [[uploads]] كلها على [[express.static]] ومعاها ملفات خاصة، فأي حد يخمّن الاسم ياخدها. في مشروع حقيقي إيصالات الدفع كانت جوه نفس الفولدر، واتحلّت بـ if بيمنع المسار ده بالذات من الـ static. الأنضف فولدر خاص بره الـ static خالص. وتنسى [[rotate()]] فصور الموبايل تظهر نايمة.`
          },
          lines: [
            "sharp.",
            "UUID عشوائي من Node.",
            "بتاخد الـ Buffer اللي multer جابه.",
            "اقرا معلومات الصورة. لو الملف مش صورة، sharp يرمي ونخليها null.",
            "مش صورة، أو نوع مش مسموح: 400. ده التحقق الحقيقي، مش الـ mimetype.",
            "اسم جديد عشوائي. اسم اليوزر عمره ما يدخل المسار.",
            "لف الصورة حسب EXIF، وقص ٥١٢ في ٥١٢، وحوّل لـ WebP بجودة ٨٠، واكتبها. الـ metadata بتتشال.",
            "رجّع المسار عشان يتحفظ في الداتابيز.",
            "قفلة."
          ],
          sol: R`الصورة الناتجة [[.webp]] مقاسها [[512x512]] وحجمها أصغر بكتير من الأصل (صورة موبايل ٣-٤ ميجا بتبقى عشرات الكيلوبايت). وفي الـ EXIF viewer الأصل فيه GPS وموديل الموبايل والتاريخ، والناتج مفيهوش أي EXIF: sharp مبينقلش الـ metadata إلا لو طلبت [[withMetadata()]]. و [[rotate()]] من غير أرقام بيلف الصورة حسب الـ Orientation اللي في الـ EXIF قبل ما يشيله، فالصورة متطلعش نايمة.

والملف النصي اللي اسمه [[.jpg]]: multer بيعدّيه (الـ mimetype من الامتداد)، بس [[sharp(buffer).metadata()]] بيرمي، فالـ [[catch]] بيرجّع null والرد [[400]] و [[{"error":"Not a valid image"}]].

لو طلع [[ENOENT: no such file or directory]]، يبقى فولدر [[uploads/avatars]] مش موجود أو السيرفر شغال من فولدر تاني (المسار نسبي للـ cwd). ولو الصورة طلعت مقلوبة، اتأكد إن [[rotate()]] قبل [[resize]].`
        },
        {
          cmd: "nodemailer",
          title: "ابعت إيميل من السيرفر عن طريق SMTP",
          desc: R`[[nodemailer]] بيبعت إيميلات عن طريق أي سيرفر SMTP (Gmail، أو خدمة زي Resend و Brevo و SES): transporter مرة واحدة بإعدادات من config، وبعدين [[sendMail]].

الإيميل مش مضمون ولا سريع: ممكن ياخد ثواني أو يفشل. فمتخليش الطلب يستنى عليه لو مش لازم، ومتخليش فشله يوقّع العملية الأساسية.`,
          example: R`import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: 587, secure: false,
  auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
});

export async function sendResetEmail(to, link) {
  await transporter.sendMail({
    from: '"MyApp" <no-reply@example.com>',
    to,
    subject: "Reset your password",
    text: $__btOpen this link within 30 minutes: $__{link}$__bt,
    html: $__bt<p>Open <a href="$__{link}">this link</a> within 30 minutes.</p>$__bt,
  });
}`,
          try: R`اعمل حساب تجربة على Ethereal بـ [[nodemailer.createTestAccount()]]، وحط بياناته في .env، وابعت إيميل وافتح لينك المعاينة من [[nodemailer.getTestMessageUrl(info)]]. وبعدين نادي [[transporter.verify()]] وانت بتقوم عشان تكتشف إعدادات SMTP الغلط بدري.`,
          flag: "script",
          deep: {
            why: "تأكيد الإيميل، ونسيت الباسورد، وإيصال الطلب، وتنبيهات الأدمن: كلها إيميلات السيرفر لازم يبعتها. و SMTP هو البروتوكول العام اللي أي خدمة إيميل بتفهمه، فالكود بتاعك مش مربوط بمزوّد.",
            how: R`الـ transporter بيفتح اتصال TCP بسيرفر الـ SMTP، ويعمل TLS، ويسجّل دخول، ويبعت الرسالة. [[pool: true]] بيخلي الاتصال مفتوح لإيميلات كتير ورا بعض بدل اتصال لكل واحد.

الـ deliverability (يوصل للـ inbox مش السبام) مش في الكود: الدومين بتاع [[from]] لازم عليه SPF و DKIM و DMARC في الـ DNS، ودا بيتعمل من لوحة الخدمة. و Gmail الشخصي بيقفلك بعد كام إيميل في اليوم ومش معمول لكده.

والسرعة: [[sendMail]] ممكن ياخد ثانية أو اتنين. في «نسيت الباسورد» ينفع ترد على اليوزر الأول وتبعت في الخلفية، بس لو السيرفر وقع قبل ما يبعت، الإيميل بيضيع. الحل الأصح queue (درس [[background jobs]] في «تاب بناء مشروع كامل»، وتاب «APIs متقدمة»).

ولينك الـ reset نفسه: توكن عشوائي، والـ hash بتاعه في الداتابيز، وعمره قصير (٣٠ دقيقة)، ويتستخدم مرة واحدة. ودايمًا رد «لو الإيميل موجود هيوصلك لينك» عشان محدش يعرف مين مسجّل.`,
            when: "لو معاك SMTP من أي مزوّد وعايز مرونة تغيّره. ولو المزوّد عنده API (زي Resend)، الـ API غالبًا أسهل (الدرس الجاي).",
            mistakes: R`في مشروع حقيقي كانت دالة الإرسال بتعمل [[attachments.push(logo)]] على الـ array اللي جاية من اللي نادى، فلو نفس الـ array اتستخدمت مرتين اللوجو يتكرر. متعدّلش في الـ arguments. وتعمل transporter جديد مع كل إيميل. وتبعت الإيميل جوه transaction أو قبل ما الداتا تتحفظ، فيوصل لينك لحاجة مش موجودة.`
          },
          lines: [
            "nodemailer.",
            "transporter واحد للتطبيق كله بإعدادات ثابتة. (من غير [[pool: true]] بيفتح اتصال جديد مع كل إيميل.)",
            "سيرفر الـ SMTP من config.",
            "587 مع STARTTLS: بيبدأ عادي وبعدين يتشفّر. (465 يعني [[secure: true]] من الأول.)",
            "اليوزر والباسورد (أو API key في خدمات زي Resend).",
            "قفلة.",
            "دالة لإيميل معين.",
            "ابعت.",
            "المرسل: الاسم والإيميل. الدومين لازم يبقى متوثّق عند الخدمة.",
            "المستلم.",
            "العنوان.",
            "نسخة نص عادي، لبرامج الإيميل اللي مبتعرضش HTML ولفلاتر السبام.",
            "نسخة HTML.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[createTestAccount()]] بيرجّع [[user]] و [[pass]] و [[smtp.host]] ([[smtp.ethereal.email]])، حطهم في .env. بعد [[sendMail]] الـ [[info.messageId]] فيه id، و [[getTestMessageUrl(info)]] بيرجّع لينك [[https://ethereal.email/message/...]] تفتحه تشوف الإيميل زي ما هيوصل: الـ subject والـ html واللينك. الإيميل مبيوصلش لحد فعلًا، وده المطلوب في التطوير.

[[transporter.verify()]] بيرجّع [[true]] لو الإعدادات صح. ولو غلط بيرمي، والكود بيقولك السبب: [[EDNS]] و [[getaddrinfo ENOTFOUND]] للـ host الغلط، و [[ESOCKET]] و [[ECONNREFUSED]] للبورت الغلط، و [[EAUTH]] (Invalid login) لليوزر أو الباسورد الغلط. عشان كده بتناديه وانت بتقوم: تعرف المشكلة من اللوج بدل ما تعرفها من يوزر بيقول «مجاليش إيميل».

لو [[getTestMessageUrl]] رجّع [[false]]، يبقى انت مش باعت على Ethereal (الـ host أو الحساب غلط).`,
          solCode: R`import nodemailer from "nodemailer";

const account = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: account.smtp.host, port: 587, secure: false,
  auth: { user: account.user, pass: account.pass },
});

await transporter.verify(); // بيرمي لو الإعدادات غلط
const info = await transporter.sendMail({ from: '"MyApp" <no-reply@example.com>', to: "me@example.com", subject: "Test", text: "Hello" });
console.log(nodemailer.getTestMessageUrl(info)); // https://ethereal.email/message/...`
        },
        {
          cmd: "Resend",
          title: "ابعت إيميل بـ API بدل SMTP",
          desc: R`خدمات الإيميل الحديثة بتدّيك HTTP API: بتبعت JSON بالمستلم والعنوان والمحتوى، وبترجّعلك id أو خطأ واضح. Resend مثال مشهور، و SDK بتاعه في Node سطرين.

نفس القواعد: الدومين لازم يتوثّق عندهم، والمفتاح في .env، والإرسال ميوقّعش العملية الأساسية لو فشل.`,
          example: R`import { Resend } from "resend";

const resend = new Resend(config.RESEND_API_KEY);

export async function sendWelcome(user) {
  const { data, error } = await resend.emails.send({
    from: "MyApp <hello@example.com>",
    to: [user.email],
    subject: "Welcome to MyApp",
    html: "<p>Your account is ready.</p>",
  });
  if (error) console.error("welcome email failed", { userId: user.id, error });
  return data?.id;
}`,
          try: R`اعمل حساب Resend وجرّب الإرسال من [[onboarding@resend.dev]] لإيميل حسابك (ده بيشتغل من غير توثيق دومين، للتجربة بس). وبعدين حط مفتاح غلط وشوف شكل [[error]].`,
          flag: "script",
          deep: {
            why: "SMTP بروتوكول قديم: اتصال وتسجيل دخول وبورتات ممكن تبقى مقفولة عند مزوّد السيرفر (VPS كتير بيقفلوا بورت 25 وأحيانًا غيره). الـ API مجرد HTTPS، وبيرجّع أخطاء واضحة، وفيه مميزات زي الجدولة و idempotency و webhooks لـ «اتفتح» و «ارتد».",
            how: R`[[resend.emails.send]] بيعمل POST للـ API بتاعهم والمفتاح في [[Authorization]]. ولو الطلب فشل (مفتاح غلط، أو دومين مش متوثّق، أو rate limit) بيرجّع [[error]] فيه [[name]] و [[message]] بدل ما يرمي، فلازم تبص عليه بنفسك. لو نسيت، الفشل بيعدّي بصمت.

Resend بيدعم كمان SMTP، فممكن تستخدمه من nodemailer بالـ host بتاعهم. في مشروع حقيقي كان ده الشكل: nodemailer على SMTP بتاع Resend، والـ SDK كمان متسطّب ومش مستخدم. اختار طريقة واحدة.

الإيميلات المهمة (فواتير، و reset) لو هتعيد محاولة إرسالها، Resend بيدعم [[idempotencyKey]] عشان متوصلش مرتين. وقوالب الإيميل ممكن تتكتب بـ React Email بدل HTML strings.`,
            when: "مشروع جديد: API غالبًا أسهل. SMTP لو المزوّد مش عنده API، أو عايز تبدّل مزوّدين من غير تغيير كود.",
            mistakes: R`تفتكر إن [[await resend.emails.send]] بيرمي لو فشل، فمتبصش على [[error]]. وتحط قيمة من اليوزر (زي الاسم) في الـ HTML من غير escape، فحد يسمّي نفسه HTML ويبعت لينكات تصيد في إيميلات رسمية طالعة من دومينك: هرّب أي قيمة، أو استخدم React Email اللي بيهرّب لوحده. والمفتاح في كود الواجهة بدل السيرفر.`
          },
          lines: [
            "SDK بتاع Resend.",
            "client بالمفتاح من config.",
            "إيميل ترحيب.",
            "ابعت. المكتبة مبترميش، بترجّع [[data]] أو [[error]].",
            "المرسل من دومين متوثّق.",
            "المستلم (ممكن أكتر من واحد).",
            "العنوان.",
            "المحتوى HTML، من غير قيم جاية من اليوزر.",
            "قفلة.",
            "لو فشل سجّله، ومتوقفش التسجيل كله عشان إيميل ترحيب.",
            "رجّع الـ id لو محتاجه.",
            "قفلة."
          ],
          sol: R`بالمفتاح الصح و [[from: "MyApp <onboarding@resend.dev>"]] و [[to]] إيميل حسابك: [[data]] فيه [[{ id: "..." }]] و [[error]] بـ null، والإيميل بيوصل خلال ثواني (بص في spam لو مش لاقيه). ولو بعت لإيميل غير إيميل حسابك من الدومين التجريبي، هتاخد error بيقولك إنك تقدر تبعت لنفسك بس لحد ما توثّق دومين.

بمفتاح غلط: الـ SDK مبيرميش exception؛ بيرجّع [[data]] بـ null و [[error]] object فيه [[statusCode]] (4xx) و [[name]] و [[message]] بيقول إن المفتاح مش صالح. عشان كده الكود بيبص على [[error]] بنفسه، ولو كتبت [[await resend.emails.send(...)]] واستخدمت [[data.id]] على طول هتاخد TypeError.

الفكرة للانترفيو: فشل إيميل الترحيب مايوقّعش التسجيل، بيتسجّل في اللوج بس (ويتعاد بـ background job في الإنتاج).`
        },
        {
          cmd: "morgan",
          title: "سطر لوج لكل طلب",
          desc: R`[[morgan]] middleware بيطبع سطر لكل طلب فيه الـ method والعنوان والـ status: [[dev]] ملوّن ومختصر ومعاه المدة للتطوير، و [[combined]] بصيغة لوجات Apache و Nginx المعروفة (فيها الـ IP والتاريخ والـ user-agent، من غير المدة).

بسيط ومفيد، بس نص عادي: صعب تدوّر فيه أو تربطه بباقي اللوجات. للإنتاج، اللوجات المنظمة (JSON) أحسن، الدرس الجاي.`,
          example: R`import morgan from "morgan";

app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev", { skip: (req) => req.path === "/health" }));
// أو صيغة مخصصة من tokens بدلها (مش جنبها): morgan(":method :url :status :response-time ms")

// GET /api/tasks 200 4.123 ms - 512
// ::ffff:10.0.0.5 - - [29/Sep/2026:10:00:00 +0000] "GET /api/tasks HTTP/1.1" 200 512 "-" "curl/8.5.0"`,
          try: R`جرّب الصيغتين، وبعدين خلي morgan يكتب في ملف بـ [[stream: fs.createWriteStream("access.log", { flags: "a" })]]. وفكّر: لو عايز تعرف كل الطلبات اللي رجعت 500 امبارح، هتدوّر إزاي؟`,
          flag: "script",
          deep: {
            why: "أول سؤال لما حاجة تبوظ: «إيه الطلبات اللي جت؟». من غير لوج للطلبات بتبقى أعمى، و morgan بيدّيك ده في سطر.",
            how: R`morgan بيسجّل وقت البداية، ويستنى الرد يخلص، ويطبع السطر بالـ tokens: [[:method]] و [[:url]] و [[:status]] و [[:response-time]] و [[:remote-addr]] و [[:user-agent]]. وتقدر تعمل token بنفسك بـ [[morgan.token("user", (req) => req.user?.id)]].

بيكتب على stdout افتراضيًا، ودا الصح في Docker و PM2: هما اللي بيجمعوا اللوج ويدوّروه (درس «docker logs» في تاب «Docker»). الكتابة في ملفات من جوه التطبيق معناها انت اللي لازم تعمل rotation.

و [[:remote-addr]] ورا proxy بيطلع IP الـ proxy إلا لو [[trust proxy]] متظبط.`,
            when: "التطوير أو المشاريع الصغيرة. ولو عندك pino، [[pino-http]] بيعمل نفس الشغل بـ JSON، فمتشغّلش الاتنين.",
            mistakes: R`في مشروع حقيقي كان فيه morgan، وكمان [[requestLogger]] يدوي، وكمان middleware بيسجّل كل رد 4xx، والتلاتة بيكتبوا على نفس الطلب، فكل طلب ٣ سطور بأشكال مختلفة. لوجر واحد للطلبات يكفي. وتسجّل [[:url]] وفيه توكنات في الـ query ([[?token=...]])، فاللوج بقى فيه أسرار.`
          },
          lines: [
            "morgan.",
            "ملوّن في التطوير، والصيغة المعروفة في الإنتاج، ومن غير طلبات الـ health check اللي بتملّى اللوج. لوجر واحد بس، عشان كل طلب ميتكتبش مرتين."
          ],
          sol: R`[[dev]] بيطبع سطر قصير ملوّن زي [[POST /api/tasks 201 0.408 ms - 8]] (الـ status أخضر للنجاح وأحمر للـ 500). و [[combined]] بيطبع صيغة Apache: [[127.0.0.1 - - [29/Sep/2026:22:00:07 +0000] "GET /fail HTTP/1.1" 500 33 "-" "curl/8.5.0"]]. وفي الاتنين [[/health]] مش ظاهر بسبب [[skip]].

مع [[stream]]، السطور بتتكتب في [[access.log]] وبتتزوّد عليه مع كل تشغيل (بسبب [[flags: "a"]]) بدل ما تطلع في الترمنال.

عشان تلاقي كل الـ 500 امبارح: في combined الـ status هو العمود التاسع، فـ [[grep "29/Sep/2026" access.log | awk '$9 == 500']]. شغال، بس هش: أي تغيير في الصيغة يبوّظه، ومفيش user id ولا request id. وده السبب اللي بيخلي الإنتاج يستخدم لوجات JSON (درس [[pino]]) تتفلتر بالحقول.`,
          solCode: R`import fs from "node:fs";
app.use(morgan("combined", { stream: fs.createWriteStream("access.log", { flags: "a" }) }));

// كل الـ 500 في يوم معيّن
// grep "29/Sep/2026" access.log | awk '$9 == 500'`
        },
        {
          cmd: "pino",
          title: "لوجات JSON تقدر تدوّر فيها",
          desc: R`[[pino]] بيطبع كل لوج كسطر JSON فيه المستوى والوقت والرسالة وأي بيانات تحطها، و [[pino-http]] بيسجّل كل طلب ويدّيك [[req.log]] مربوط بـ id الطلب.

فكل لوجات الطلب الواحد بتتجمع مع بعض. و [[redact]] بيخفي الحقول الحساسة (التوكن والكوكيز والباسورد) قبل ما تتكتب.`,
          example: R`import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: config.LOG_LEVEL ?? "info",
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password"],
});

app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === "/health" } }));

router.post("/", async (req, res) => {
  req.log.info({ title: req.body.title }, "creating task");
  res.status(201).json(await tasksService.create(req.user.id, req.body));
});`,
          try: R`ابعت طلب فيه [[Authorization]] وشوف السطر الـ JSON والتوكن مكتوب مكانه [Redacted]. وشغّل السيرفر بـ [[node server.js | npx pino-pretty]] في التطوير عشان تقراه بسهولة. وجرّب [[req.log.error({ err }, "failed")]] وشوف الـ stack بيتحط إزاي.`,
          flag: "script",
          deep: {
            why: R`في الإنتاج اللوجات بتتقري بأدوات مش بعينك: «هات كل الأخطاء لليوزر ٧ امبارح» أو «كل الطلبات اللي أخدت أكتر من ثانية». ده مستحيل مع نص حر زي [[console.log("user", id, "failed")]]، وسهل جدًا مع JSON فيه [[userId: 7]] و [[level: 50]].`,
            how: R`pino سريع لأنه بيعمل أقل حاجة ممكنة في العملية الرئيسية: يعمل JSON ويكتبه على stdout. التنسيق الحلو ([[pino-pretty]]) والإرسال لخدمة لوجات بيحصل بره (transport في worker thread أو برنامج تاني).

المستويات: trace و debug و info و warn و error و fatal. [[level]] بيحدد أقل واحد يتطبع، فـ debug بتاعة التطوير مبتظهرش في الإنتاج من غير ما تمسحها من الكود.

[[pino-http]] بيعمل child logger لكل طلب فيه [[req.id]] والـ method والعنوان. أي [[req.log.info]] في أي مكان جوه الطلب بيطلع ومعاه نفس الـ id، فتقدر تجمع قصة الطلب كلها. ولو فيه [[X-Request-Id]] جاي من Nginx، استخدمه في option الـ [[genReqId]] عشان الـ id يبقى واحد من أول ما الطلب دخل.

[[redact]] بيشتغل على المسارات دي قبل الكتابة، و [[*]] في أول المسار يعني «في أي object في المستوى ده». وده خط دفاع أخير، مش بديل إنك متسجّلش الـ body كله أصلًا.`,
            when: "أي API هيتشغّل في الإنتاج. ومع pino-http، شيل morgan.",
            mistakes: R`في مشروع حقيقي كان login بيعمل [[console.log(JSON.stringify(req.body))]] و [[JSON.stringify(req.headers)]] في الإنتاج «عشان نفهم مشكلة». يعني كل باسورد اتكتب في login اتسجّل في اللوج نص صريح، ومعاه التوكنات والكوكيز. اللوجات بتتنسخ وتتبعت وتتحفظ شهور، فعاملها كأنها عامة. وتستخدم [[console.log]] بنصوص حرة في كل مكان فمفيش طريقة تفلتر. وتسجّل [[err.message]] بس من غير الـ stack.`
          },
          lines: [
            "pino: لوجر سريع بيطبع JSON.",
            "middleware بيسجّل الطلبات.",
            "لوجر واحد للتطبيق كله.",
            "أقل مستوى يتطبع: info في الإنتاج، و debug في التطوير.",
            "المسارات دي تتكتب [Redacted] بدل قيمتها، و [[*.password]] يعني password جوه أي object في المستوى الأول (زي [[body.password]])، مش [[password]] لوحده ولا أعمق من كده.",
            "قفلة.",
            "سجّل كل طلب (method و url و status ومدة و id) من غير الـ health check.",
            "route عادي.",
            "[[req.log]] لوجر معاه id الطلب تلقائي. البيانات object الأول، والرسالة بعدها.",
            "رد.",
            "قفلة."
          ],
          sol: R`كل سطر JSON واحد. طلب فيه Authorization بيطلع فيه [[req.headers.authorization]] قيمته النص [Redacted] بدل التوكن، ومعاه سطر [[creating task]] فيه [[req.id]] نفس رقم سطر [[request completed]]، فتقدر تجمع كل لوجات الطلب الواحد. ومعاه [[res.statusCode]] و [[responseTime]]. و [[/health]] مالوش سطر بسبب [[ignore]].

[[node server.js | npx pino-pretty]] بيحوّل نفس السطور لشكل مقروء: الوقت وبعده [[INFO (4796): creating task]] وتحته الحقول متنسّقة. في الإنتاج متستخدمهوش: سيب الـ JSON لأداة اللوجات.

و [[req.log.error({ err }, "failed")]] بيطلع سطر [[level: 50]] وفيه [[err]] object فيه [[type]] و [[message]] و [[stack]] كـ string واحد، لأن pino عنده serializer مخصوص للمفتاح [[err]]. و [[req.log.error(err)]] لوحده بيشتغل صح برضه (pino بيحط الـ Error تحت [[err]]). بس لو حطيته تحت اسم تاني زي [[{ error: err }]]، هتاخد [[{}]] فاضي من غير message ولا stack.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "اختبارات للـ API كله: supertest على الـ app من غير بورت، وقاعدة اختبار حقيقية، و factories، ومصفوفة الصلاحيات، والخدمات الخارجية، والـ webhooks",
      items: [
        {
          cmd: "app و server",
          title: "افصل الـ app عن listen عشان تختبره",
          desc: R`[[app.ts]] بيبني الـ app ويرجّعه: middleware و routes و error handler. و [[server.ts]] بس اللي بيعمل [[listen]] ويسمع للـ signals. الاختبارات بتستورد [[createApp()]] وتدّيه لـ supertest مباشرة، فمفيش بورت ثابت يتفتح، ومفيش «البورت مشغول» لما تشغّل ملفين اختبار مع بعض.

القاعدة: مفيش أي side effect وقت الـ import. لا [[listen]]، ولا اتصال بـ Redis أو queue في أول الملف من غير ما حد يطلبه.`,
          example: R`// src/app.ts
import express from "express";
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (req, res) => res.json({ ok: true }));
  app.use("/api/orders", ordersRouter);
  app.use(errorHandler);
  return app;
}

// src/server.ts
import { createApp } from "./app.js";
const server = createApp().listen(config.PORT, () => logger.info({ port: config.PORT }, "listening"));
process.on("SIGTERM", () => server.close(() => process.exit(0)));`,
          try: R`لو السيرفر بتاعك ملف واحد فيه [[app.listen]] في الآخر: قسّمه لملفين زي المثال، وخلي [[npm run dev]] يشغّل server.ts. وبعدين اكتب سكربت صغير يعمل [[import { createApp } from "./src/app.js"]] ويطبع [[typeof createApp()]]، واتأكد إن مفيش سطر «listening» اتطبع.`,
          flag: "script",
          deep: {
            why: R`لو [[app.js]] بيعمل listen وهو بيتعمله import، كل ملف اختبار هيفتح البورت 3000. أول ملف يمسكه، والتاني يقع بـ [[EADDRINUSE]]، والـ process مبتقفلش في الآخر لأن فيه سيرفر لسه سامع. ونفس الفصل بيفيد برّه الاختبارات: سكربت أو worker عايز يستخدم نفس الـ routes أو الإعدادات من غير ما يفتح سيرفر.`,
            how: R`supertest لما تدّيله app (مش URL) بيعمل [[http.createServer(app)]] ويـ listen على بورت 0، يعني النظام يختار بورت فاضي عشوائي، ويبعت الطلب، ويقفل السيرفر بعد الرد. فكل اختبار بيكلّم الـ app الحقيقي بكل الـ middleware بتاعه عبر HTTP حقيقي، بس على بورت مؤقت محدش شايفه.

[[createApp()]] كدالة (مش object جاهز) بيدّيك ميزة تانية: تقدر تبني app جديد لكل ملف اختبار، أو تبعتله dependencies مختلفة ([[createApp({ mailer: fakeMailer })]]) لو عايز. وده نفس اللي «تاب بناء مشروع كامل» بيعمله في هيكل المشروع.

و [[server.ts]] هو المكان الوحيد اللي فيه الحاجات اللي ليها علاقة بالـ process: البورت، و SIGTERM، والإغلاق النضيف (درس «الإغلاق النضيف» في تاب «Node و npm»).`,
            when: "من أول يوم في أي API هتكتبله اختبارات. التكلفة سطرين، ولو أجّلتها هتلاقي imports بتفتح اتصالات في كل حتة.",
            mistakes: R`[[export default app.listen(3000)]]: كده اللي بيتصدّر هو الـ server مش الـ app، والبورت بيتفتح مع أي import. وملف [[db.js]] بيعمل [[await prisma.$connect()]] أو [[redis.connect()]] في أول سطر، فأي اختبار حتى لو مش محتاج الداتابيز بيستنى اتصال. وفي الانترفيو: «إزاي بتختبر الـ API بتاعك؟» الإجابة الكويسة بتبدأ بالفصل ده، وبعدين supertest على الـ app، وبعدين قاعدة اختبار حقيقية.`
          },
          lines: [
            "express.",
            "دالة بتبني app جديد وترجّعه، من غير listen.",
            "app جديد.",
            "الـ middleware العادي.",
            "route للـ health check.",
            "الـ routers.",
            "الـ error handler في الآخر.",
            "رجّعه للي نادى: server.ts أو الاختبار.",
            "قفلة.",
            "server.ts بيستورد نفس الدالة.",
            "هو بس اللي بيعمل listen ويطبع البورت.",
            "ولما الـ process يتطلب منها تقفل، يقفل السيرفر الأول وبعدين يخرج."
          ],
          sol: R`الناتج الصح: [[typeof createApp()]] بيطبع [[function]] (الـ app في Express دالة [[(req, res, next)]])، ومفيش سطر «listening» ولا البورت اتفتح، والسكربت بيخلص ويقفل لوحده.

لو السكربت فضل مفتوح ومقفلش، يبقى فيه حاجة بتتفتح وقت الـ import: listen، أو اتصال Redis، أو setInterval. دوّر عليها بـ [[node --trace-exit]] أو علّق الـ imports واحد واحد.

ولو ظهر «listening»، يبقى [[listen]] لسه في app.ts أو في ملف بيتعمله import منه.`,
          solCode: R`// check-app.mjs
import { createApp } from "./src/app.js";
const app = createApp();
console.log(typeof app); // function
// مفيش listen: السكربت يخلص ويقفل لوحده`
        },
        {
          cmd: "supertest",
          title: "اختبر كل endpoint: الـ status والـ body",
          desc: R`[[request(app).post(url).set(header).send(body)]] بيبعت طلب حقيقي للـ app ويرجّعلك الرد، وانت بتتأكد من [[res.status]] و [[res.body]] بـ vitest.

لكل endpoint اختبر الحالة الناجحة، وكل رفض ليه كود مختلف: 400 للـ body الغلط، و 401 من غير توكن، و 404 لحاجة مش موجودة، و 502 لو خدمة برّه وقعت. أساسيات vitest نفسها (describe و it و watch) في درس [[vitest]] في تاب «فحص الكود».`,
          example: R`import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../src/app.js";
import { createUser } from "./factories.js";

const app = createApp();

describe("POST /api/orders", () => {
  it("creates an order", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ status: "PENDING", checkoutUrl: expect.stringContaining(res.body.id) });
  });

  it("rejects a bad amount with 400", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: -1 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("INVALID_AMOUNT");
  });
});`,
          try: R`[[npm i -D vitest supertest]]، واكتب ملف [[tests/health.test.ts]] يتأكد إن [[GET /health]] بيرجّع 200 و [[{ ok: true }]]، وإن [[GET /nope]] بيرجّع 404. شغّل [[npx vitest run]]. وبعدين غيّر الـ status في الـ route لـ 201 وشوف الاختبار بيقع بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`الـ API هو العقد بينك وبين الواجهة والموبايل. اختبار الـ service لوحده مش كفاية: الـ validation والـ auth والـ error handler وشكل الـ JSON كلها بتحصل في الطبقات اللي فوقه. اختبار supertest بيعدّي على كل ده مرة واحدة، فبيمسك الغلطات اللي بتبوّظ الواجهة فعلًا: 500 بدل 400، أو حقل اتشال من الرد، أو route اتنقل.`,
            how: R`[[request(app)]] بيرجّع object تبني عليه الطلب بـ chaining، وأول ما تعمل [[await]] بيتبعت. [[.send(obj)]] بيعمل JSON ويحط [[Content-Type: application/json]] لوحده. و [[.set()]] للـ headers، و [[.query({ page: 2 })]] للـ query string.

الرد فيه [[status]] و [[headers]] و [[body]] (متحوّل من JSON) و [[text]] (النص الخام). و [[toMatchObject]] بيتأكد من الحقول اللي كتبتها بس ويتجاهل الباقي، فالاختبار ميقعش لو ضفت حقل جديد. و [[expect.any(String)]] و [[expect.stringContaining]] للقيم اللي بتتغير كل مرة زي الـ id والتاريخ.

supertest عنده [[.expect(201)]] كمان، بس [[expect(res.status).toBe(201)]] بيطلّع رسالة أوضح في vitest ويخليك تشوف الـ body لما يقع (حط [[console.log(res.body)]] مؤقتًا).

ولو عايز كوكيز تفضل بين الطلبات (login وبعده [[/me]])، استخدم [[request.agent(app)]]: بيحفظ الكوكيز زي المتصفح.`,
            when: "لكل endpoint: الحالة الناجحة، وكل كود خطأ ليه معنى مختلف. الحسابات المعقدة (سعر وخصم وضريبة) اختبرها كمان unit على الدالة نفسها، أسرع وأوضح.",
            mistakes: R`إنك تختبر [[res.status]] بس ومتبصش على الـ body، فـ endpoint بيرجّع [[{}]] بـ 200 يعدّي. أو العكس: [[toEqual]] على الرد كله بالـ id والتاريخ، فالاختبار يقع كل مرة. ونسيان [[await]] قبل [[request(app)]]: الاختبار «ينجح» من غير ما الطلب يتبعت أصلًا. واختبارات بتعتمد على ترتيبها (الأول بيعمل يوزر والتاني بيستخدمه): كل اختبار لازم يجهّز الداتا بتاعته بنفسه (درس [[factories]]).`
          },
          lines: [
            "supertest.",
            "دوال vitest.",
            "الـ app من غير listen.",
            "factory بتعمل يوزر وتوكن (درس [[factories]]).",
            "app واحد للملف كله.",
            "مجموعة اختبارات لـ endpoint واحد.",
            "الحالة الناجحة.",
            "يوزر جديد للاختبار ده بس.",
            "ابعت POST بالتوكن والـ body.",
            "201 Created.",
            "الحقول المهمة بس، والـ checkoutUrl فيه id الطلب.",
            "قفلة.",
            "حالة الرفض.",
            "يوزر.",
            "مبلغ سالب.",
            "400 مش 500.",
            "وكود الخطأ اللي الواجهة بتعتمد عليه.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الناتج: [[Test Files 1 passed]] و [[Tests 2 passed]]. ولما تغيّر الـ status لـ 201، vitest بيطبع [[expected 201 to be 200]] ومعاها السطر اللي وقع.

ولو [[GET /nope]] رجع 200 بـ HTML، يبقى عندك route [[*]] بيرجّع الواجهة (SPA fallback) قبل الـ 404 بتاع الـ API: خلي الـ fallback ده بعد كل routes الـ API، أو ميشتغلش على [[/api]].

ولو الأمر فضل شغال ومقفلش، يبقى فيه اتصال مفتوح (Redis أو الداتابيز): اقفله في [[afterAll]].`,
          solCode: R`import request from "supertest";
import { it, expect } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

it("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

it("unknown route is 404", async () => {
  const res = await request(app).get("/nope");
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "قاعدة الاختبار",
          title: "قاعدة بيانات للاختبار لوحدها، وتتنضف بين الاختبارات",
          desc: R`الاختبارات بتكلّم Postgres حقيقي، بس قاعدة تانية خالص ([[myapp_test]]) عمرها ما تبقى قاعدة التطوير. قبل الاختبارات [[prisma migrate deploy]] عليها، وقبل كل اختبار بتفضّيها.

طريقتين للتنضيف: [[TRUNCATE]] لكل الجداول قبل كل اختبار (بسيطة وشغالة مع أي حاجة)، أو كل اختبار جوه transaction وتعمل ROLLBACK في الآخر (أسرع، بس صعبة لما الطلب بيعدّي على HTTP والكود بيفتح transactions بنفسه).`,
          example: R`// vitest.config.ts
export default defineConfig({
  test: {
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});

// tests/setup.ts
import { afterAll, beforeEach } from "vitest";
import { db } from "../src/db.js";
beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" RESTART IDENTITY CASCADE');
});
afterAll(() => db.$disconnect());

# package.json: "test": "dotenv -e .env.test -- prisma migrate deploy && vitest run"`,
          try: R`اعمل قاعدة [[myapp_test]] (بـ [[createdb]] أو [[CREATE DATABASE]] في psql)، وشغّل عليها [[DATABASE_URL=... npx prisma migrate deploy]]. اكتب اختبارين: الأول يعمل يوزر بإيميل ثابت، والتاني يعمل يوزر بنفس الإيميل. من غير الـ TRUNCATE التاني هيقع بـ unique constraint لو اتشغّلوا ورا بعض، ومعاه الاتنين ينجحوا.`,
          flag: "script",
          deep: {
            why: R`الـ mock للداتابيز بيخبّي أهم الغلطات: unique constraint، و foreign key، و query غلط، و migration ناقصة، و transaction مش شغالة. الاختبار اللي بيكلّم Postgres حقيقي بيمسك ده كله. والقاعدة المنفصلة لأن الاختبارات بتمسح كل حاجة، وأول مرة حد يشغّلها على قاعدة التطوير هيخسر الداتا بتاعته.`,
            how: R`[[migrate deploy]] مش [[migrate dev]]: الـ deploy بيطبّق الـ migrations الموجودة زي الإنتاج بالظبط، ومبيولّدش migration جديدة ولا بيسألك أسئلة. فلو فيه migration ناقصة من الـ repo، الاختبارات هتقع هنا قبل ما الإنتاج يقع.

[[TRUNCATE ... RESTART IDENTITY CASCADE]] بيفضّي الجداول في أمر واحد، ويرجّع الـ sequences من الأول، و CASCADE بيعدّي على الجداول المرتبطة بـ foreign keys. أسرع بكتير من [[deleteMany]] على كل جدول بالترتيب. والأسماء بين [[""]] لأن Prisma بيعمل الجداول بحروف كبيرة. ومتفضّيش [[_prisma_migrations]]!

الـ rollback: تفتح transaction، وتشغّل الاختبار جواها، وفي الآخر ROLLBACK فكأن مفيش حاجة حصلت. سريع جدًا، بس شرطه إن كل الكود يستخدم نفس الاتصال اللي فيه الـ transaction. مع Prisma والطلب اللي بيعدّي على HTTP ده صعب: الـ client عنده pool، والـ [[$transaction]] اللي جوه الكود بيفتح transaction تانية. عشان كده TRUNCATE هي الاختيار العملي مع Prisma و supertest، و rollback تنفع أكتر في اختبارات الـ repository اللي بتدّيها الـ client بإيدك.

[[fileParallelism: false]] بيشغّل ملفات الاختبار ورا بعض، لأنهم بيشاركوا نفس القاعدة. لو عايز parallel، اعمل قاعدة أو schema لكل worker (مثلًا [[myapp_test_$__{process.env.VITEST_POOL_ID}]]).

وفي CI نفس الفكرة بـ service container لـ Postgres: درس [[services]] في تاب «GitHub Actions»، ومثال كامل في درس «ci.yml: Postgres + Prisma» في تاب «من مشاريعي».`,
            when: "أي اختبار بيعدّي على الداتابيز. والمنطق الصافي (حسابات وتحويلات) اختبره unit من غير قاعدة خالص.",
            mistakes: R`[[DATABASE_URL]] في الاختبار بييجي من [[.env]] العادي لأن حد نسي يغيّره، فالـ TRUNCATE يمسح قاعدة التطوير. حط حارس في setup: [[if (!process.env.DATABASE_URL.includes("_test")) throw ...]]. واستخدام SQLite في الاختبار و Postgres في الإنتاج: أنواع وسلوك مختلف، وهتعدّي اختبارات على حاجات بتقع في الإنتاج. وتشغيل [[migrate dev]] في CI. وملفات اختبار parallel على قاعدة واحدة: اختبارات بتقع مرة وتنجح مرة (flaky) ومحدش فاهم ليه.`
          },
          lines: [
            "إعداد vitest.",
            "قسم الاختبارات.",
            "متغيرات البيئة للاختبار: قاعدة الاختبار وسر JWT ثابت.",
            "ملف بيتشغّل قبل كل ملف اختبار.",
            "ملفات الاختبار ورا بعض عشان بيشاركوا نفس القاعدة.",
            "قفلة.",
            "قفلة.",
            "hooks بتاعة vitest.",
            "نفس الـ Prisma client بتاع التطبيق.",
            "قبل كل اختبار...",
            "...فضّي الجداول وصفّر العدادات، و CASCADE للجداول المرتبطة.",
            "قفلة.",
            "في الآخر اقفل الاتصال عشان الـ process تخلص."
          ],
          sol: R`المتوقع: من غير [[beforeEach]] اللي فيه TRUNCATE، الاختبار التاني بيقع بخطأ Prisma كوده [[P2002]] (Unique constraint failed on the fields: (email)). ومعاه الاتنين بينجحوا مهما شغّلتهم كام مرة.

لو الاتنين نجحوا من غير TRUNCATE، يبقى غالبًا الـ email مش [[@unique]] في الـ schema، أو الاختبارات مش بتكلّم نفس القاعدة اللي انت فاكرها: اطبع [[process.env.DATABASE_URL]] في الـ setup.

ولو ظهر [[relation "User" does not exist]]، يبقى نسيت [[migrate deploy]] على قاعدة الاختبار.`,
          solCode: R`createdb -h localhost -U app myapp_test
DATABASE_URL=postgresql://app:app@localhost:5432/myapp_test npx prisma migrate deploy
npx vitest run tests/users.test.ts`
        },
        {
          cmd: "factories",
          title: "داتا الاختبار: factory صغيرة بدل ملف fixtures ضخم",
          desc: R`factory دالة بتعمل صف واحد بقيم افتراضية معقولة وبترجّعه، وتقدر تغيّر أي حقل: [[createUser({ role: "ADMIN" })]]. كل اختبار بيعمل الداتا اللي محتاجها بس، فتقرا الاختبار وتفهم هو بيختبر إيه.

و [[createUser]] بترجّع كمان التوكن بتاع اليوزر، عشان مفيش اختبار محتاج يعدّي على login.`,
          example: R`// tests/factories.ts
import jwt from "jsonwebtoken";
import { db } from "../src/db.js";

let n = 0;
export async function createUser(overrides = {}) {
  n++;
  const user = await db.user.create({ data: { email: $__btuser$__{n}@test.local$__bt, ...overrides } });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5m" });
  return { ...user, token };
}

export function createOrder(user, overrides = {}) {
  return db.order.create({ data: { userId: user.id, amountCents: 5000, ...overrides } });
}`,
          try: R`اعمل [[createUser]] و [[createOrder]] زي المثال، واكتب اختبار «الأدمن يقدر يمسح طلب أي حد»: يوزر عادي عنده طلب، وأدمن بـ [[createUser({ role: "ADMIN" })]] بيعمل DELETE. لازم الاختبار كله يبقى ٦ سطور أو أقل.`,
          flag: "script",
          deep: {
            why: R`ملف fixtures كبير (٢٠ يوزر و ١٠٠ طلب في JSON) بيبدأ صغير ويكبر لحد ما محدش يعرف أنهي اختبار معتمد على أنهي صف. تعدّل حقل عشان اختبار، يقع ٥ اختبارات تانيين. والاختبار نفسه بيبقى [[expect(orders).toHaveLength(7)]] ومحدش فاهم ليه ٧. الـ factory بتخلي السبب مكتوب قدامك: عملت طلبين ليوزر A وطلب ليوزر B، فـ A يشوف ٢.`,
            how: R`القيم الافتراضية لازم تبقى صالحة وتعدّي كل الـ constraints: إيميل فريد (عشان كده العداد [[n]])، وأي حقل مطلوب ليه قيمة. و [[...overrides]] في الآخر عشان أي حاجة تكتبها تغلب الافتراضي.

العلاقات: [[createOrder(user)]] بتاخد اليوزر بدل ما تعمل واحد من عندها. كده انت اللي بتقرر مين صاحب الطلب، ودا بالظبط اللي محتاجه في اختبارات الصلاحيات (الدرس الجاي). ولو عايز الاختصار، ممكن تخلي [[user]] اختياري وتعمل واحد لو مش موجود.

التوكن: بنعمله بـ [[jwt.sign]] بنفس السر اللي الـ app شايفه في الاختبار ([[JWT_SECRET]] من vitest.config). ده أسرع من login حقيقي في كل اختبار، و login نفسه ليه اختبار لوحده. ولو الـ auth عندك session، الـ factory تعمل login بـ [[request.agent(app)]] وترجّع الـ agent.

والـ seed بتاع التطوير (درس «prisma db seed و studio» في تاب «Node و npm») حاجة تانية: داتا شكلها حلو عشان تتفرج على التطبيق. متستخدمهوش في الاختبارات.`,
            when: "من أول ما يبقى عندك أكتر من ٣ اختبارات بتعمل نفس النوع من الداتا. وفيه مكتبات (زي fishery أو @faker-js/faker للقيم العشوائية)، بس دالة صغيرة زي دي كفاية لأغلب المشاريع.",
            mistakes: R`قيم عشوائية في كل حاجة (faker لكل حقل) فالاختبار يقع مرة كل ١٠٠ مرة لأن الاسم العشوائي طلع أطول من الحد: خلي القيم ثابتة إلا لو محتاجها فريدة. و factory بتعمل ١٠ حاجات مرتبطة لوحدها (يوزر وطلبات ومدفوعات) فكل اختبار بطيء ومحدش عارف إيه اللي اتعمل. وإنك تعدّل الـ object اللي راجع من factory في اختبار وتستخدمه في اختبار تاني.`
          },
          lines: [
            "jsonwebtoken عشان نعمل توكن من غير login.",
            "نفس الـ Prisma client.",
            "عداد عشان كل إيميل يبقى فريد.",
            "factory لليوزر، وأي حقل ممكن يتغيّر.",
            "زوّد العداد.",
            "اعمل اليوزر بإيميل فريد، و overrides تغلب الافتراضي.",
            "توكن بنفس السر اللي الـ app شايفه في الاختبار، عمره قصير.",
            "رجّع اليوزر ومعاه التوكن.",
            "قفلة.",
            "factory للطلب، بتاخد صاحبه صريح.",
            "طلب بمبلغ افتراضي، وأي حقل ممكن يتغيّر.",
            "قفلة."
          ],
          sol: R`الاختبار بيعمل صاحب الطلب، والطلب، والأدمن، والـ DELETE، ويتأكد إن الرد 204 وإن الطلب مبقاش موجود في القاعدة. مش كفاية تبص على الـ status: لازم تتأكد إن المسح حصل فعلًا.

لو رجع 403، يبقى الـ role مش في التوكن: الـ factory لازم تعمل [[jwt.sign]] بعد ما تعمل اليوزر بالـ role اللي اتبعت، مش قبله. ولو رجع 404، يبقى الـ route بيدوّر على الطلب بـ [[userId]] الأدمن (ownership) حتى في مسار الأدمن.`,
          solCode: R`it("admin can delete anyone's order", async () => {
  const order = await createOrder(await createUser());
  const admin = await createUser({ role: "ADMIN" });
  const res = await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{admin.token}$__bt);
  expect(res.status).toBe(204);
  expect(await db.order.findUnique({ where: { id: order.id } })).toBeNull();
});`
        },
        {
          cmd: "401 و 403 و 404",
          title: "مصفوفة الصلاحيات: كل route فيه :id يتختبر بيوزرين",
          desc: R`أي route فيه [[:id]] ليه على الأقل ٤ اختبارات: من غير توكن 401، وصاحب الحاجة 200، ويوزر تاني 404 (مش 200 ولا 403)، ويوزر معندوش الـ role المطلوب 403.

أخطر bug في أي API إن يوزر B يشوف أو يعدّل حاجة يوزر A بمجرد ما يغيّر الرقم في الـ URL (IDOR، درس [[ownership (IDOR)]]). الاختبار ده بيمسكه قبل ما حد تاني يمسكه.`,
          example: R`describe("GET /api/orders/:id", () => {
  it("401 without a token", async () => {
    expect((await request(app).get("/api/orders/anything")).status).toBe(401);
  });
  it("200 for the owner", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt);
    expect(res.status).toBe(200);
  });
  it("404 for another user", async () => {
    const [a, b] = [await createUser(), await createUser()];
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{b.token}$__bt);
    expect(res.status).toBe(404);
  });
  it("403 for a non-admin on DELETE", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    expect((await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt)).status).toBe(403);
  });
});`,
          try: R`اختار route عندك فيه [[:id]] بيعدّل حاجة (PATCH أو DELETE)، واكتبله الأربع حالات. وبعدين «اكسر» الـ service: شيل [[userId]] من الـ where، وشغّل الاختبارات. لازم اختبار «يوزر تاني» يقع. لو ماوقعش، الاختبار نفسه غلط.`,
          flag: "script",
          deep: {
            why: R`الـ auth middleware بيتأكد انت مين، بس مبيعرفش الحاجة دي بتاعة مين. كل route لازم يعمل الفحص ده بنفسه، وسهل جدًا واحد منهم ينسى. واختبار «يوزر تاني» هو الطريقة الوحيدة اللي تتأكد بيها إن كل route فاكر، ومش بتعتمد على مراجعة الكود بعينك.`,
            how: R`[[401 Unauthorized]]: مش عارفين انت مين (مفيش توكن، أو غلط، أو خلص). [[403 Forbidden]]: عارفينك، بس الـ role بتاعك مش مسموحله بالعملية دي خالص (يوزر عادي على route أدمن). [[404 Not Found]]: الحاجة دي مش موجودة بالنسبة لك.

ليه 404 مش 403 ليوزر تاني؟ لأن 403 معناها «موجود بس مش بتاعك»، وده بيسرّب معلومة: المهاجم يعرف إن الـ id ده موجود، ويقدر يعد الطلبات أو اليوزرز. لو الـ query نفسها فيها [[userId]] ([[findFirst({ where: { id, userId } })]])، الـ 404 بتطلع لوحدها من غير if زيادة.

و GET مش كفاية: كرر نفس المصفوفة على PATCH و DELETE، لأن غلطة مشهورة إن الـ GET محمي والـ update بيعمل [[update({ where: { id } })]] من غير userId. ولو فيه routes كتير، اعمل الاختبارات بـ [[it.each]] على قايمة من [method, path] عشان متكتبش نفس الكود ٢٠ مرة.

وفي Nest نفس الفكرة بالظبط، والاختبار نفسه بـ supertest (درس «Nest: الاختبارات»).`,
            when: "كل route فيه :id أو بيرجّع داتا خاصة بيوزر. ده من أهم الاختبارات في المشروع كله، وأولى من اختبارات كتير تانية.",
            mistakes: R`اختبار الصلاحيات بيوزر واحد بس (صاحب الحاجة)، فالاختبار ينجح والـ IDOR موجود. أو ترجّع 403 ليوزر تاني فتسرّب إن الحاجة موجودة. أو 403 للتوكن الغلط بدل 401، فالواجهة متعرفش إنها لازم تعمل refresh أو تودّي على login. وفي الانترفيو: «الفرق بين 401 و 403؟» قول الفرق، وقول ليه بترجّع 404 لحاجة يوزر تاني.`
          },
          lines: [
            "مجموعة لـ route واحد.",
            "من غير توكن.",
            "لازم 401.",
            "قفلة.",
            "صاحب الطلب.",
            "يوزر A.",
            "طلب بتاع A.",
            "A بيطلب طلبه.",
            "200.",
            "قفلة.",
            "يوزر تاني.",
            "يوزرين.",
            "الطلب بتاع A.",
            "B بيطلب طلب A بالـ id بتاعه.",
            "404: بالنسبة لـ B الطلب مش موجود.",
            "قفلة.",
            "الـ role.",
            "يوزر عادي.",
            "طلبه هو.",
            "حتى على طلبه، المسح للأدمن بس: 403.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تشيل [[userId]] من الـ where، اختبار «404 for another user» لازم يقع ويقول [[expected 200 to be 404]]: يعني B قدر يوصل لطلب A. ده بالظبط الـ bug اللي الاختبار معمول عشانه. رجّع الشرط والاختبار ينجح تاني.

لو الاختبار فضل ناجح وانت شايل الشرط، يبقى الاختبار بيستخدم نفس اليوزر للاتنين، أو بيبعت توكن A في الطلبين. اطبع [[a.id]] و [[b.id]] واتأكد إنهم مختلفين.

وممكن تجمع كل الـ routes اللي فيها ownership في اختبار واحد بـ [[it.each]]، زي الكود. الـ DELETE مش في القايمة لأنه للأدمن بس: يوزر B هيوقف عند [[requireRole]] ويرجع 403 قبل ما نوصل لسؤال «الطلب بتاع مين».`,
          solCode: R`it.each([
  ["get", (id) => $__bt/api/orders/$__{id}$__bt],
  ["patch", (id) => $__bt/api/orders/$__{id}$__bt],
])("%s by another user is 404", async (method, path) => {
  const [a, b] = [await createUser(), await createUser()];
  const order = await createOrder(a);
  const res = await request(app)[method](path(order.id)).set("Authorization", $__btBearer $__{b.token}$__bt).send({});
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "msw و nock",
          title: "الاختبار ميكلّمش بوابة الدفع ولا خدمة الإيميل الحقيقية",
          desc: R`أي خدمة برّه (الدفع، والإيميل، والـ SMS، و AI) بتعملها mock على مستوى الشبكة: الكود بتاعك بيعمل [[fetch]] عادي، و msw (أو nock) بيمسك الطلب قبل ما يخرج ويرجّع رد انت كاتبه. كده بتختبر الحالة الناجحة، والخدمة واقعة (503)، والرد البطيء، من غير نت ولا فلوس.

وأي طلب لبرّه ملوش handler لازم يفشل الاختبار، عشان محدش يبعت إيميل حقيقي من CI بالغلط.`,
          example: R`import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const pay = setupServer(
  http.post("https://pay.example.com/intentions", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ checkoutUrl: $__bthttps://pay.example.com/c/$__{body.ref}$__bt });
  }),
);
beforeAll(() => pay.listen({
  onUnhandledRequest(req) {
    if (new URL(req.url).hostname !== "127.0.0.1") throw new Error($__btunmocked: $__{req.method} $__{req.url}$__bt);
  },
}));
afterEach(() => pay.resetHandlers());
afterAll(() => pay.close());

it("returns 502 when the payment provider is down", async () => {
  pay.use(http.post("https://pay.example.com/intentions", () => new HttpResponse(null, { status: 503 })));
  const user = await createUser();
  const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
  expect(res.status).toBe(502);
});`,
          try: R`[[npm i -D msw@2]] (الكود هنا على msw 2)، واعمل handler لخدمة الإيميل اللي بتستخدمها (مثلًا [[POST https://api.resend.com/emails]]) بيحفظ الـ body في array. اختبر إن «نسيت الباسورد» بتبعت إيميل واحد للعنوان الصح وفيه لينك. وبعدين شيل الـ handler وشوف الاختبار بيقع بـ «unmocked».`,
          flag: "script",
          deep: {
            why: R`اختبار بيكلّم Paymob أو Resend الحقيقيين بطيء، ومحتاج مفاتيح في CI، وبيفشل لما خدمتهم تهنّج، وممكن يبعت إيميلات لناس حقيقيين. والأهم: مش هتقدر تجرّب «البوابة رجّعت 503» أو «الرد اتأخر ١٠ ثواني»، ودي بالظبط الحالات اللي الكود بتاعك لازم يتعامل معاها صح.`,
            how: R`msw بيركّب interceptor على [[fetch]] و [[http]] في Node. أي طلب بيطلع بيتقارن بالـ handlers: [[http.post(url, resolver)]]. لو فيه match، الـ resolver بيرجّع [[HttpResponse.json(...)]] والطلب عمره ما بيخرج. و [[pay.use(...)]] جوه اختبار واحد بيضيف handler مؤقت يغلب الأساسي (زي «البوابة واقعة»)، و [[resetHandlers()]] بعد كل اختبار بيشيله.

تفصيلة مهمة جربناها: supertest نفسه بيبعت طلب HTTP للـ app على [[127.0.0.1]]، و msw بيشوف الطلب ده كمان. لو كتبت [[onUnhandledRequest: "error"]] كل اختبارات supertest هتقع. عشان كده الدالة: سيب الـ localhost يعدّي، وأي حاجة تانية [[throw]]. ولاحظ إن [[print.error()]] جوه الدالة في msw 2 بيطبع رسالة بس ومبيوقفش الطلب، فالـ throw هو اللي بيضمن إن الطلب ميخرجش (msw بيرجّعله 500 فيه الرسالة). وخد بالك: msw 3 (نزل آخر سبتمبر 2026) غيّر اسم الخيار لـ [[onUnhandledFrame]] بشكل callback مختلف، والخيار القديم بيتجاهله من غير أي خطأ، فالطلبات بتخرج للنت عادي. عشان كده الدرس مثبّت على msw 2، ولو رقّيت راجع الـ migration guide.

nock بيعمل نفس الفكرة بأسلوب تاني: [[nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" })]]، و [[nock.disableNetConnect()]] مع [[nock.enableNetConnect("127.0.0.1")]] بيقفل أي طلب تاني. من nock 14 بقى بيمسك [[fetch]] كمان. و [[scope.isDone()]] بيقولك الطلب المتوقع اتبعت ولا لأ.

والبديل التالت: الكود ياخد الـ client كـ dependency ([[createApp({ mailer })]]) وتدّيله fake في الاختبار. أبسط للحاجات اللي انت عاملها wrapper، بس مش بيختبر شكل الطلب الحقيقي اللي بيطلع.`,
            when: "أي كود بيكلّم خدمة برّه. الـ msw نفسه بيتستخدم في الواجهة (React) لنفس الغرض، فلو فريقك بيستخدمه هناك خليه نفس الأداة.",
            mistakes: R`[[vi.mock("node-fetch")]] أو mock لدالة داخلية بدل الشبكة: الاختبار بيختبر الـ mock مش الكود. ونسيان [[resetHandlers]] فالـ handler الـ «واقع» يعدّي على الاختبار اللي بعده. و [[onUnhandledRequest: "bypass"]] فطلب ملوش handler يخرج للنت الحقيقي من غير ما حد ياخد باله. وmock بيرجّع شكل رد مختلف عن الخدمة الحقيقية: خد شكل الرد من الـ docs أو من لوج طلب حقيقي، مش من خيالك.`
          },
          lines: [
            "سيرفر msw للـ Node.",
            "أدوات تعريف الـ handlers والردود.",
            "سيرفر وهمي لبوابة الدفع.",
            "أي POST للعنوان ده...",
            "...اقرا الـ body اللي الكود بعته...",
            "...ورجّع رد شكله زي رد البوابة، فيه رقم الطلب.",
            "قفلة الـ handler.",
            "قفلة.",
            "قبل الاختبارات شغّل الـ interception...",
            "...ولأي طلب ملوش handler:",
            "لو مش طلب supertest للـ app على localhost، ارمي خطأ فالطلب ميخرجش.",
            "قفلة.",
            "قفلة.",
            "بعد كل اختبار شيل أي handler مؤقت.",
            "في الآخر اقفل.",
            "اختبار «البوابة واقعة».",
            "handler مؤقت للاختبار ده بس: 503.",
            "يوزر.",
            "اعمل طلب.",
            "الـ API لازم يرد 502 واضح، مش 500 ولا يعلّق.",
            "قفلة."
          ],
          sol: R`المتوقع: الاختبار ينجح، والـ array فيها عنصر واحد، الـ [[to]] بتاعه إيميل اليوزر، والـ [[html]] فيه اللينك. ولما تشيل الـ handler، الاختبار بيقع لأن الطلب رجعله 500 فيه [[unmocked: POST https://api.resend.com/emails]]، والإيميل عمره ما خرج.

لو الاختبار نجح والـ array فاضية، يبقى الإيميل بيتبعت بعد ما الرد يرجع (fire and forget) والاختبار خلص قبله: اعمل await للإرسال في الكود، أو استنى في الاختبار بـ [[vi.waitFor]].

ولو شغلك بـ nock بدل msw، نفس الفكرة في الكود التاني.`,
          solCode: R`const sent = [];
const mail = setupServer(
  http.post("https://api.resend.com/emails", async ({ request }) => {
    sent.push(await request.json());
    return HttpResponse.json({ id: "em_1" });
  }),
);
beforeAll(() => mail.listen({ onUnhandledRequest(req) { if (new URL(req.url).hostname !== "127.0.0.1") throw new Error("unmocked: " + req.url); } }));
afterAll(() => mail.close());

it("forgot password sends one email", async () => {
  const user = await createUser();
  const res = await request(app).post("/api/auth/forgot").send({ email: user.email });
  expect(res.status).toBe(200);
  expect(sent).toHaveLength(1);
  expect(sent[0].to).toContain(user.email);
  expect(sent[0].html).toMatch(/reset\?token=/);
});

// نفس الفكرة بـ nock:
// nock.disableNetConnect(); nock.enableNetConnect("127.0.0.1");
// const scope = nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" });
// ... expect(scope.isDone()).toBe(true);`
        },
        {
          cmd: "اختبار الـ webhook",
          title: "webhook: توقيع صح، وتوقيع غلط، ونفس الحدث مرتين",
          desc: R`الـ webhook ليه ٣ اختبارات لازم تبقى موجودة: توقيع صح فالطلب يتفعّل، وتوقيع غلط فيرجع 401 ومفيش حاجة تتغير في القاعدة، ونفس الحدث يوصل مرتين فالرد 200 في المرتين والأثر يحصل مرة واحدة.

الاختبار بيحسب التوقيع بنفس السر ونفس الطريقة اللي البوابة بتستخدمها، وبيبعت الـ body كنص خام بالظبط زي ما اتوقّع.`,
          example: R`import crypto from "node:crypto";

const sign = (raw) => crypto.createHmac("sha256", "test-whsec").update(raw).digest("hex");
const send = (raw, sig) => request(app).post("/webhooks/pay").set("Content-Type", "application/json").set("X-Signature", sig).send(raw);

it("rejects a bad signature and changes nothing", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_2" });
  expect((await send(raw, sign(raw + "x"))).status).toBe(401);
  expect((await db.order.findUnique({ where: { id: order.id } })).status).toBe("PENDING");
});

it("same event twice = one effect", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_3" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect(await db.order.count({ where: { gatewayTxId: "tx_3" } })).toBe(1);
});`,
          try: R`اكتب الاختبار التالت الناقص: توقيع صح فالطلب يبقى PAID. وبعدين جرّب تبعت نفس الـ JSON بس بمسافة زيادة ([[JSON.stringify(obj, null, 1)]]) مع التوقيع بتاع النسخة من غير مسافات. المفروض يرجع 401. فكّر ليه، وليه ده معناه إن الـ route لازم يقرا الـ raw body.`,
          flag: "script",
          deep: {
            why: R`الـ webhook هو الـ endpoint اللي بيحوّل «طلب» لـ «مدفوع» (درس [[webhook الدفع]] في «تاب بناء مشروع كامل»). أي غلطة فيه معناها فلوس: يا طلبات بتتفعّل من غير دفع، يا ناس دفعت ومخدتش حاجة، يا اشتراك اتضاف مرتين. والبوابات بتعيد الإرسال لو ماردّتش بسرعة، فالتكرار مش احتمال نظري، ده بيحصل كل يوم.`,
            how: R`التوقيع بيتحسب على البايتات بالظبط. لو الـ route بيعمل [[express.json()]] الأول وبعدين [[JSON.stringify(req.body)]] عشان يحسب، أي فرق في المسافات أو ترتيب المفاتيح هيبوّظ المقارنة. عشان كده الـ route ده بياخد [[express.raw({ type: "application/json" })]] قبل الـ [[express.json()]] العام، ويحسب HMAC على الـ Buffer، ويقارن بـ [[timingSafeEqual]] (بعد ما يتأكد إن الطولين زي بعض، وإلا بيرمي). وفي الاختبار [[.send(raw)]] بنص جاهز عشان supertest ميعيدش التنسيق. (بعض البوابات زي Paymob بتوقّع حقول معينة بترتيب معين مش الـ body كله: شوف درس «التحقق من التوقيع» في تاب «Node و npm».)

التوقيع الغلط: مش كفاية الـ 401، لازم تقرا من القاعدة وتتأكد إن الطلب لسه PENDING. أوقات الكود بيحدّث الأول وبعدين يتحقق.

التكرار: اختبرت الـ idempotency بإنك بعت نفس الحدث مرتين وعدّيت الأثر. الكود بيعملها بـ [[updateMany]] بشرط [[status: { not: "PAID" }]]، و [[gatewayTxId]] عليه [[@unique]] كحارس أخير. والرد 200 في المرة التانية كمان: لو رجّعت 409 أو 500، البوابة هتفتكر إنه فشل وتفضل تعيد.

وحالات تانية تستاهل اختبار لو البوابة بتبعتها: دفعة فاشلة بعد نجاح (لازم يفضل PAID)، ومبلغ مختلف عن مبلغ الطلب (يتسجّل ومفيش تفعيل)، وطلب مش موجود (200 ومفيش crash).`,
            when: "أي webhook: دفع، أو اشتراكات، أو GitHub، أو تيليجرام. ولو بتستقبل الحدث وتحطه في queue، اختبر الـ route (توقيع و 200 سريعة) والـ worker (idempotent) كل واحد لوحده.",
            mistakes: R`اختبار التوقيع الصح بس، فمحدش اكتشف إن الكود بيقبل أي توقيع طوله صح. أو حساب التوقيع على [[JSON.stringify(req.body)]] بعد الـ parse. أو اختبار التكرار بإنك تبعت حدثين مختلفين. ونسيان إن الـ webhook route لازم يبقى قبل [[express.json()]] العام وإلا [[req.body]] يوصله object مش Buffer. وفي الانترفيو: «إزاي تتأكد إن الـ webhook مش بيتعالج مرتين؟» الإجابة: شرط على الحالة، و unique على id المعاملة، ورد 200 للتكرار.`
          },
          lines: [
            "crypto من Node.",
            "دالة بتحسب التوقيع بنفس سر الاختبار ونفس الخوارزمية اللي الـ route بيستخدمها.",
            "دالة بتبعت نص خام بالتوقيع في header.",
            "توقيع غلط.",
            "طلب لسه PENDING.",
            "الحدث كنص.",
            "توقيع لنص تاني: لازم 401.",
            "واقرا من القاعدة: الطلب متغيّرش.",
            "قفلة.",
            "نفس الحدث مرتين.",
            "طلب.",
            "حدث واحد.",
            "المرة الأولى 200.",
            "والتانية 200 برضه، عشان البوابة تبطّل تعيد.",
            "والأثر حصل مرة واحدة بس.",
            "قفلة."
          ],
          sol: R`الاختبار الناقص: توقيع صح، والرد 200، والطلب في القاعدة بقى [[PAID]] و [[gatewayTxId]] بتاعه [[tx_1]].

ونسخة الـ JSON بالمسافات بترجع 401 لأن التوقيع اتحسب على نص تاني، والـ HMAC بيتغير لو اتغيّر بايت واحد. البوابة بتوقّع البايتات اللي بعتتها بالظبط، فانت لازم تحسب على نفس البايتات اللي وصلت (الـ raw body)، مش على object عملتله parse وبعدين stringify.

لو النسخة بالمسافات عدّت، يبقى الـ route بيحسب على [[JSON.stringify(req.body)]]، وده هيقع مع أول بوابة بتبعت JSON بتنسيق مختلف عن بتاع Node.`,
          solCode: R`it("marks the order PAID with a valid signature", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_1" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  const saved = await db.order.findUnique({ where: { id: order.id } });
  expect(saved).toMatchObject({ status: "PAID", gatewayTxId: "tx_1" });
});

it("pretty JSON with the compact signature is rejected", async () => {
  const order = await createOrder(await createUser());
  const obj = { orderId: order.id, txId: "tx_9" };
  expect((await send(JSON.stringify(obj, null, 1), sign(JSON.stringify(obj)))).status).toBe(401);
});`
        }
      ]
    }
]);
