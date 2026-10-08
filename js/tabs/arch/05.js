// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
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
