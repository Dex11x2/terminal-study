// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "الصلاحيات والدفع",
      l: 2,
      n: "مين يقدر يعمل إيه، وبعدين أهم ميزة في المنتج: الفلوس من الزرار لحد التفعيل",
      items: [
        {
          cmd: "requireAuth و requireRole",
          title: "مين داخل، ومسموحله يعمل إيه",
          desc: R`[[requireAuth]] بيتأكد من الـ access token، ويحط المستخدم في [[req.user]]. و [[requireRole]] بيتأكد إن دوره مسموح. وبيتحطوا قدام الـ route: [[router.post("/admin/courses", requireAuth, requireRole("ADMIN"), handler)]].

401 معناها «مش عارفين انت مين». و 403 معناها «عارفينك، بس مش مسموحلك».`,
          example: R`export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) throw new AppError(401, "UNAUTHENTICATED", "سجّل دخول الأول");
  try {
    const payload = jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] });
    req.user = { id: payload.sub, role: payload.role };
  } catch {
    throw new AppError(401, "TOKEN_EXPIRED", "التوكن انتهى");
  }
  next();
}

export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role) ? next() : next(new AppError(403, "FORBIDDEN", "مش مسموحلك"));`,
          try: R`اعمل route للأدمن بس، واطلبه ٣ مرات: من غير توكن (المفروض 401)، وبتوكن طالب (403)، وبتوكن أدمن (200). بعدين عدّل حرف في التوكن وابعته، ولازم يرجع 401.`,
          flag: "script",
          deep: {
            why: "إخفاء زرار الأدمن في الواجهة مش حماية، ده شكل بس. أي حد يقدر يبعت الطلب بـ curl. الحماية الحقيقية بتبقى على السيرفر، على كل route، من غير استثناء.",
            how: R`[[jwt.verify]] بيتأكد من التوقيع والمدة. و [[algorithms]] بتحدد الخوارزمية المقبولة، ودي بتقفل هجمات قديمة زي توكن بـ [[alg: none]]. وفي Express، الـ throw جوه middleware عادي (مش async) بيوصل للـ error handler لوحده.

الدور متخزن جوه التوكن، فمش محتاج تسأل القاعدة مع كل طلب. بس ده ليه تمن: لو شلت صلاحية أدمن، التوكن اللي معاه هيفضل شغال لحد ما يخلص، يعني لحد ١٥ دقيقة. في أغلب الـ routes ده مقبول. بس في لوحة الأدمن والعمليات الخطيرة، اقرا الدور من القاعدة مع كل طلب. طلب واحد زيادة، في مقابل إن الصلاحية تتشال فورًا.

ولما المنتج يكبر، الأدوار لوحدها مبتكفيش. بتعمل permissions زي [[course:publish]] و [[order:refund]]، وكل دور بيبقى مجموعة permissions. وساعتها الـ middleware بيبقى [[requirePermission("order:refund")]]، وتقدر تعمل دور جديد من غير ما تلمس الكود.

وفي Next.js، الـ proxy (اسمه كان middleware قبل Next 16) مش مكان الحماية الوحيد. الوثائق نفسها بتقول اتحقق جوه كل Server Function و Route Handler. التفاصيل في تاب «Next.js».`,
            when: "على كل route مش public. والأسهل تحطهم على الـ router كله مرة واحدة: [[admin.use(requireAuth, requireRole(\"ADMIN\"))]].",
            mistakes: R`إنك تحمي في الواجهة بس. أو [[jwt.decode]] بدل verify. أو تنسى route واحد في النص. وفي مشروع حقيقي كان الدور بييجي من التوكن في لوحة الأدمن، فأدمن اتشالت صلاحيته فضل شغال لحد ما التوكن خلص. وفي مشروع تاني كانت الواجهة كاتبة قوايم الأدوار بإيدها في كذا مكان ([[role === "dev" || role === ...]])، مكررة من السيرفر، ومع أول تعديل بقوا مختلفين.`
          },
          teach: R`## اتنين middleware بيقفوا قدام الـ route

[[requireAuth]] بيجاوب على «انت مين؟» من التوكن، و [[requireRole]] بيجاوب على «مسموحلك؟» من الدور اللي جوه التوكن. جربنا الكود ده بـ Express 5 و jsonwebtoken 9 على Node 24 (ويندوز 11)، بتوكنات متوقّعة بسر تجربة، على route [[/admin/stats]] اللي في الـ solCode.

---

## ١. [[export function requireAuth(req, res, next) {]]

middleware في Express دالة بتاخد ٣ حاجات: [[req]] (الطلب)، و [[res]] (الرد)، و [[next]] (دالة لما تناديها Express بيروح للي بعدك). و [[export]] عشان ملف الـ routes يستوردها.

---

## ٢. هات التوكن من الـ header

### [[const header = req.headers.authorization ?? "";]]

الواجهة بتبعت التوكن في header اسمه [[Authorization]] بالشكل ده:

~~~text
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi...
~~~

Node بيخلّي أسامي الـ headers small، فبنقرا [[req.headers.authorization]]. و [[??]] (nullish coalescing) معناها «لو اللي قبلي [[undefined]] أو [[null]]، خد اللي بعدي»، فلو الـ header مش موجود [[header]] بيبقى نص فاضي بدل [[undefined]]، والسطر الجاي ميقعش.

### [[header.startsWith("Bearer ") ? header.slice(7) : null]]

- [[startsWith("Bearer ")]]: النص بيبدأ بكلمة Bearer ومسافة؟
- [[? ... : ...]] (ternary): لو أيوه خد اللي قبل [[:]]، لو لأ خد اللي بعدها.
- [[slice(7)]]: شيل أول ٧ حروف. [[Bearer ]] بالمسافة ٧ حروف بالظبط، فاللي فاضل هو التوكن.

### [[if (!token) throw new AppError(401, ...)]]

مفيش توكن؟ ارمي خطأ. [[AppError]] الكلاس اللي عملناه في درس «شكل الأخطاء»: status و code ورسالة، والـ error handler بيحوّله JSON.

---

## ٣. [[jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] })]]

[[jwt.verify]] بيعمل ٣ حاجات: يحسب التوقيع تاني بالسر ويقارنه، ويشوف [[exp]] (وقت الانتهاء)، ولو كله تمام يرجّع الـ payload. ولو أي حاجة غلط بيرمي.

[[algorithms: ["HS256"]]] بتقول «اقبل التوقيع ده بس». جربنا توكن معمول بإيدنا بـ [[alg: none]] (من غير توقيع خالص):

~~~text الناتج
JsonWebTokenError jwt signature is required
~~~

يعني اترفض. والتوكن المنتهي:

~~~text الناتج
TokenExpiredError jwt expired
~~~

### [[req.user = { id: payload.sub, role: payload.role };]]

[[sub]] (subject) هو id المستخدم اللي حطيناه وقت الـ login. بنحطه على [[req]] عشان أي middleware أو handler بعدنا يقراه، من غير ما يفك التوكن تاني.

### [[catch { throw new AppError(401, "TOKEN_EXPIRED", ...) }]]

[[catch]] من غير [[(err)]] صيغة جديدة في JavaScript لما مش محتاج الخطأ نفسه. وأي فشل (توقيع غلط أو انتهى) بيبقى 401.

### [[next();]]

كله تمام، روح للي بعدي. ولاحظ إن الـ middleware ده مش [[async]]: الـ [[throw]] فيه بيوصل للـ error handler لوحده. وفي Express 5 حتى الـ [[async]] بيوصل (في Express 4 كان لازم [[next(err)]]).

---

## ٤. [[export const requireRole = (...roles) => (req, res, next) => ...]]

ده سطر فيه دالتين جوه بعض:

1. [[(...roles) =>]] دالة بتاخد أي عدد أدوار ([[...]] اسمها rest، بتجمعهم في array). بتنادي عليها وقت تسجيل الـ route: [[requireRole("ADMIN")]] أو [[requireRole("INSTRUCTOR", "ADMIN")]].
2. وهي بترجّع **middleware** تاني [[(req, res, next) =>]]، ده اللي Express بينادي عليه مع كل طلب.

### [[roles.includes(req.user?.role) ? next() : next(new AppError(403, ...))]]

- [[req.user?.role]]: [[?.]] (optional chaining) لو [[req.user]] مش موجود (حد نسي [[requireAuth]] قبله)، النتيجة [[undefined]] بدل ما الكود يقع، و [[includes(undefined)]] بترجع [[false]]، فالرد 403. يعني النسيان بيقفل مش بيفتح.
- [[next(err)]]: لما تدّي [[next]] خطأ، Express بيفوّت كل اللي بعده ويروح للـ error handler.

---

## ٥. التجربة: كل الحالات

الـ route من الـ solCode: [[router.get("/admin/stats", requireAuth, requireRole("ADMIN"), handler)]]. Express بيشغّلهم بالترتيب من الشمال لليمين.

~~~text الناتج
no token         401 {"error":{"code":"UNAUTHENTICATED","message":"سجّل دخول الأول"}}
student          403 {"error":{"code":"FORBIDDEN","message":"مش مسموحلك"}}
admin            200 {"data":{"users":0}}
student->ADMIN   401 {"error":{"code":"TOKEN_EXPIRED","message":"التوكن انتهى"}}
lowercase bearer 401 {"error":{"code":"UNAUTHENTICATED","message":"سجّل دخول الأول"}}
alg none         401 {"error":{"code":"TOKEN_EXPIRED","message":"التوكن انتهى"}}
expired          401 {"error":{"code":"TOKEN_EXPIRED","message":"التوكن انتهى"}}
~~~

- [[student->ADMIN]]: خدنا توكن الطالب، فكّينا الـ payload وغيّرنا [[role]] لـ [[ADMIN]] ورجّعناه من غير ما نلمس التوقيع. اترفض، لأن التوقيع اتحسب على الـ payload القديم.
- [[lowercase bearer]]: [[startsWith("Bearer ")]] حساسة لحالة الحروف، فـ [[bearer]] اترفضت كأن مفيش توكن.
- [[users: 0]] لأن القاعدة كانت فاضية وقت التجربة.

| الطلب | مين وقّفه | الكود |
|---|---|---|
| من غير توكن | [[requireAuth]] | 401 |
| توكن متعدل أو منتهي أو [[alg: none]] | [[jwt.verify]] جوه [[requireAuth]] | 401 |
| طالب | [[requireRole("ADMIN")]] | 403 |
| أدمن | ولا حد، وصل للـ handler | 200 |

---

## الخلاصة

- 401 = مش عارفين انت مين (مفيش توكن أو التوكن بايظ). 403 = عارفينك بس مش مسموحلك.
- [[jwt.verify]] مش [[jwt.decode]]: الـ decode بيقرا من غير ما يتحقق من التوقيع.
- [[algorithms]] بتقفل [[alg: none]]، و [[?.]] في [[requireRole]] بتخلي النسيان يقفل الباب مش يفتحه.
- الدور من التوكن ممكن يفضل قديم لحد ١٥ دقيقة، فالأدمن والعمليات الخطيرة تقرا الدور من القاعدة.`,
          lines: [
            "middleware بيتأكد إن فيه مستخدم داخل.",
            "الـ header، أو نص فاضي لو مش موجود.",
            "خد التوكن بعد كلمة Bearer.",
            "مفيش توكن؟ 401.",
            "جرّب تتحقق...",
            "...من التوقيع والمدة، وبالخوارزمية دي بس.",
            "حط المستخدم في الطلب عشان اللي بعده يستخدمه.",
            "لو التحقق فشل...",
            "...401، والواجهة هتعمل refresh.",
            "قفلة.",
            "كمّل للي بعده.",
            "قفلة.",
            "middleware بياخد الأدوار المسموحة ويرجّع middleware...",
            "...لو الدور في القايمة كمّل، ولو لأ 403."
          ],
          sol: R`النتايج: من غير توكن [[401 UNAUTHENTICATED]]، وبتوكن طالب [[403 FORBIDDEN]]، وبتوكن أدمن [[200]]، وبتوكن متعدل [[401]]. لاحظ إن الكود بيرجّع [[TOKEN_EXPIRED]] لأي فشل في [[jwt.verify]]، سواء التوكن انتهى أو التوقيع غلط. ده كويس للواجهة (في الحالتين هتعمل refresh)، بس في اللوج فرّق بينهم: [[TokenExpiredError]] عادي، و [[JsonWebTokenError: invalid signature]] ممكن يبقى حد بيجرب.

خلي بالك وانت بتعدّل: لو غيرت آخر حرف في التوكن، ممكن يعدّي! آخر حرف في base64url فيه bits زيادة مش مستخدمة، فساعات حرفين مختلفين بيطلّعوا نفس البايتات. غيّر حرف في نص الـ payload (الجزء اللي في النص) عشان تتأكد. وكمان [[bearer]] بحرف صغير هترجع 401 [[UNAUTHENTICATED]] لأن الكود بيدوّر على [[Bearer ]] بالظبط.

لو الطالب رجع 200، يبقى [[requireRole]] مش متسجّل على الـ route، أو الدور بيتقري من الـ body بدل التوكن.`,
          solCode: R`router.get("/admin/stats", requireAuth, requireRole("ADMIN"), async (req, res) => {
  res.json({ data: { users: await db.user.count() } });
});

# curl -s -w ' %{http_code}\n' localhost:4000/admin/stats                                   # 401
# curl -s -w ' %{http_code}\n' -H "Authorization: Bearer $STUDENT" localhost:4000/admin/stats   # 403
# curl -s -w ' %{http_code}\n' -H "Authorization: Bearer $ADMIN" localhost:4000/admin/stats     # 200`
        },
        {
          cmd: "ownership",
          title: "مسموحلك بالنوع ده، بس الحاجة دي بتاعتك؟",
          desc: R`الدور مش كفاية. الطالب مسموحله يشوف الطلبات، بس طلباته هو بس. عشان كده كل query لازم يبقى فيه شرط الملكية جوه الـ [[where]] نفسه: [[{ id, userId: req.user.id }]]. ولو الحاجة مش بتاعته، رد 404 مش 403، عشان ميعرفش إنها موجودة أصلًا.

ولو شغال بـ Supabase والواجهة بتكلّم القاعدة مباشرة، نفس القاعدة بتتكتب في القاعدة نفسها بـ RLS.`,
          example: R`router.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findFirst({
    where: { id: req.params.id, ...(req.user.role !== "ADMIN" && { userId: req.user.id }) },
    select: { id: true, status: true, amountCents: true, course: { select: { slug: true, title: true } } },
  });
  if (!order) throw new AppError(404, "NOT_FOUND", "الطلب مش موجود");
  res.json({ data: order });
});
router.get("/lessons/:id/video", requireAuth, async (req, res) => {
  const lesson = await db.lesson.findFirst({
    where: { id: req.params.id, OR: [{ isPreview: true }, { course: { enrollments: { some: { userId: req.user.id } } } }] },
  });
  if (!lesson) throw new AppError(403, "NOT_ENROLLED", "اشترك في الكورس الأول");
  res.json({ data: { url: await storage.signedUrl(lesson.videoKey, 3600) } });
});`,
          try: R`اعمل مستخدمين، وكل واحد يعمل طلب. بتوكن الأول اطلب طلب التاني بالـ id بتاعه. لازم يرجع 404. بعدين جرّب تجيب فيديو درس في كورس مش مشترك فيه.`,
          flag: "script",
          deep: {
            why: "دي أشهر ثغرة في الـ APIs، واسمها IDOR أو Broken Access Control، ورقم ١ في OWASP. الـ endpoint بيتأكد إنك داخل، ويجيب أي id تبعته. فتغيّر رقم في الـ URL تشوف طلبات غيرك، أو فواتيرهم، أو فيديوهاتهم المدفوعة.",
            how: R`الشرط جوه الـ where مش بعد ما تجيب الداتا. لو جبت الطلب وبعدين عملت [[if (order.userId !== req.user.id)]]، ده صح برضه، بس سهل تنساه. أما لما الشرط جزء من الـ query، مفيش طريقة الداتا تطلع غلط.

الفيديو مثال على الملكية عن طريق علاقة: الدرس مسموح لو معمول preview، أو لو الكورس بتاعه فيه enrollment للمستخدم ده. Prisma بتحوّل [[some]] لـ EXISTS في SQL. والرابط اللي بيرجع موقّع وعمره ساعة، يعني الفيديو نفسه مش public.

وفي Supabase، الواجهة بتكلّم القاعدة مباشرة، فالـ RLS هو الـ backend بتاعك. سياسة القراية بتبقى كده: [[create policy "own orders" on orders for select using (user_id = auth.uid());]]. وفيه ٣ حاجات لازم تاخد بالك منها:

١. سياسة UPDATE بتسمح بتعديل الصف كله، بكل أعمدته. [[using (auth.uid() = id)]] على profiles معناها إن المستخدم يقدر يغيّر أي عمود في صفّه، ومنهم role. الحل إنك تمنع الأعمدة الحساسة: [[revoke update on profiles from authenticated]] وبعدين [[grant update (name, avatar_url) on profiles to authenticated]] للأعمدة المسموحة بس. الـ revoke على عمود واحد ملوش أي تأثير طول ما فيه grant على الجدول كله، وده الافتراضي في Supabase. أو تخلي التعديل عن طريق function.

٢. الـ RLS بيحمي الصفوف مش الأعمدة. [[using (true)]] على جدول الأسئلة معناها إن الإجابات الصح بتطلع مع الأسئلة. الحل إنك تحط الإجابات في جدول تاني محدش يقراه غير السيرفر.

٣. سياسة الأدمن اللي بتقرا من نفس الجدول ([[exists (select 1 from profiles where ...)]] على جدول profiles نفسه) بتعمل دايرة. الحل function بـ [[security definer]] زي [[is_admin()]].

التفاصيل في تاب «SQL و Prisma»، و OWASP في تاب «أمان الموقع».`,
            when: "كل endpoint بياخد id من برّه. من غير استثناء، حتى لو «محدش هيعرف الـ id».",
            mistakes: R`في مشاريع حقيقية لقينا كل واحدة من دول. سياسة تعديل الـ profile من غير تحديد أعمدة، فأي مستخدم يقدر يخلّي نفسه admin. وطالب يقدر يعدّل نتيجة امتحانه ([[score]] و [[is_passed]]) في صفّه. ولاعب يعدّل الـ xp والـ level بتوعه. وأسئلة الامتحان بإجاباتها الصح مقروءة لأي حد عن طريق [[using (true)]]. وكتب مدفوعة PDF متخزنة بروابط public دايمة، فأي حد معاه اللينك ينزّلها على طول. والصح هنا رابط موقّع عمره ساعة. وكمان في مشروع منهم، ملف «تصليح» الـ RLS كان بيعمل نفس السياسات الغلط تاني.`
          },
          teach: R`## شرط الملكية جوه الـ query نفسه

الـ route الأول بيرجّع طلب بالـ id بشرط إنه بتاعك (إلا لو أدمن)، والتاني بيرجّع رابط فيديو درس بشرط إنه preview أو انت مشترك في الكورس. جربنا الاتنين بـ Express 5 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24): مستخدمين Ali و Mona، وكورس SQL فيه درس preview ودرس مدفوع، وطلب واحد لـ Ali. والـ [[storage.signedUrl]] في التجربة دالة وهمية بترجع رابط شكله زي الحقيقي.

---

## ١. [[router.get("/orders/:id", requireAuth, async (req, res) => {]]

- [[:id]] اسمه route parameter: أي حاجة في المكان ده في الـ URL بتتحط في [[req.params.id]].
- [[requireAuth]] من الدرس اللي فات: بيحط [[req.user]] بـ [[id]] و [[role]].

---

## ٢. [[db.order.findFirst({ where: ..., select: ... })]]

[[findFirst]] بيرجّع أول صف يطابق الشرط أو [[null]]. ليه مش [[findUnique]]؟ الاتنين شغالين هنا، بس [[findFirst]] بتقبل أي شرط من غير ما تفكر هل الحقول دي unique ولا لأ.

### الشرط: [[{ id: req.params.id, ...(req.user.role !== "ADMIN" && { userId: req.user.id }) }]]

من جوه لبرة:

1. [[req.user.role !== "ADMIN"]]: [[true]] لو مش أدمن.
2. [[true && { userId: ... }]]: [[&&]] بترجع آخر قيمة لو الاتنين صح، يعني الـ object [[{ userId }]]. ولو الأولى [[false]] بترجع [[false]] على طول.
3. [[...]] (spread): بيفرد خانات الـ object جوه الـ where. و [[...false]] جوه object مبيعملش حاجة.

طبعنا الشرط الناتج للحالتين:

~~~text الناتج
{"where":{"id":"X","userId":"u_ali"}}     ← طالب
{"where":{"id":"X"}}                      ← أدمن
~~~

يعني الطالب بيدوّر على «طلب رقمه X **وصاحبه أنا**». لو الطلب بتاع حد تاني، القاعدة مبترجعش حاجة أصلًا.

### [[select: { id: true, status: true, amountCents: true, course: { select: { slug: true, title: true } } }]]

[[select]] بيحدد الأعمدة اللي ترجع. [[true]] يعني هات العمود ده، و [[course: { select: ... }]] بيجيب من الجدول المرتبط (العلاقة) العمودين دول بس. كده [[userId]] و [[gatewayTxId]] مش بيطلعوا للواجهة.

---

## ٣. [[if (!order) throw new AppError(404, "NOT_FOUND", ...)]]

مش موجود ومش بتاعك نفس الرد بالظبط:

~~~text الناتج
ali -> his order       200 {"data":{"id":"cmuzek3ta0000q8ie9238l7ja","status":"PENDING","amountCents":50000,"course":{"slug":"sql-basics","title":"SQL"}}}
mona -> ali order      404 {"error":{"code":"NOT_FOUND","message":"الطلب مش موجود"}}
mona -> fake id        404 {"error":{"code":"NOT_FOUND","message":"الطلب مش موجود"}}
admin -> ali order     200 {"data":{"id":"cmuzek3ta0000q8ie9238l7ja",...}}
~~~

Mona متقدرش تفرّق بين «الطلب ده مش موجود» و «موجود بس مش بتاعي»، فمتقدرش تعرف أي ids حقيقية. ولو كان الرد 403، كانت هتعرف إن [[cmuzek3...]] طلب موجود عند حد.

---

## ٤. رابط الفيديو: الملكية عن طريق علاقة

### [[OR: [{ isPreview: true }, { course: { enrollments: { some: { userId: req.user.id } } } }]]]

[[OR]] array من شروط، يكفي واحد منهم يتحقق:

- [[{ isPreview: true }]]: الدرس مجاني للعرض.
- [[{ course: { enrollments: { some: { userId } } } }]]: اقراها كده: «الكورس بتاع الدرس ده، عنده enrollments، **فيه واحد على الأقل** ([[some]]) الـ userId بتاعه أنا».

شغّلنا Prisma بـ log للـ queries عشان نشوف الـ SQL (مختصر):

~~~text الناتج
SELECT ... FROM "Lesson" LEFT JOIN "Course" AS "j0" ON "j0"."id" = "Lesson"."courseId"
WHERE ("Lesson"."id" = $1 AND ("Lesson"."isPreview" = $2
  OR (EXISTS(SELECT "t1"."courseId" FROM "Enrollment" AS "t1"
             WHERE ("t1"."userId" = $3 AND "j0"."id" = "t1"."courseId")) ...)))
LIMIT $4
~~~

[[some]] اتحولت [[EXISTS(...)]]: القاعدة بتدوّر على صف واحد بس وتقف. و [[$1]] و [[$3]] parameters، يعني القيم مش ملزوقة في النص، فمفيش SQL injection.

### [[if (!lesson) throw new AppError(403, "NOT_ENROLLED", ...)]]

هنا 403 مش 404، لأن الدرس نفسه ظاهر في صفحة الكورس، ومفيش سر في وجوده. والرسالة بتقول للمستخدم يعمل إيه.

### [[res.json({ data: { url: await storage.signedUrl(lesson.videoKey, 3600) } })]]

[[videoKey]] مكان الملف في الـ storage (زي [[videos/sql/join.mp4]])، و [[3600]] ثانية = ساعة. الرابط بيخلص بعدها، فلو اتنشر مش هيفضل شغال.

~~~text الناتج
mona preview           200 {"data":{"url":"https://cdn.example.com/videos/sql/intro.mp4?expires=3600&sig=…"}}
mona paid              403 {"error":{"code":"NOT_ENROLLED","message":"اشترك في الكورس الأول"}}
mona paid enrolled     200 {"data":{"url":"https://cdn.example.com/videos/sql/join.mp4?expires=3600&sig=…"}}
~~~

التالتة بعد ما عملنا لـ Mona enrollment في الكورس.

---

## ٥. Supabase: نفس الفكرة في القاعدة

الـ [[deep]] بيشرح الـ RLS: لما الواجهة بتكلّم القاعدة مباشرة، الشرط [[user_id = auth.uid()]] بيبقى policy بدل [[where]]. الجزء ده من وثائق Supabase، متجربش هنا (التجربة الكاملة لـ RLS في درس «RLS و app.tenant_id»).

---

## الخلاصة

| | طلب بالـ id | فيديو درس |
|---|---|---|
| الشرط | [[id]] + [[userId]] (إلا الأدمن) | [[id]] + (preview أو enrollment) |
| مش مسموح | 404 (ميعرفش إنه موجود) | 403 (الدرس معروف أصلًا) |
| بيرجع | حقول محددة بـ [[select]] | رابط موقّع عمره ساعة |

الشرط جوه الـ [[where]] مش [[if]] بعد ما تجيب الصف: كده مفيش طريقة الداتا تطلع غلط حتى لو حد نسي.`,
          lines: [
            "طلب واحد بالـ id.",
            "دوّر...",
            "...بالـ id، ولو مش أدمن لازم يكون صاحبه. الشرط جوه الـ query نفسه.",
            "رجّع الحقول اللي الصفحة محتاجاها بس.",
            "قفلة.",
            "مش موجود أو مش بتاعه؟ نفس الرد 404.",
            "رجّعه.",
            "قفلة.",
            "رابط فيديو درس.",
            "دوّر على الدرس...",
            "...لو preview مجاني، أو الكورس بتاعه فيه اشتراك للمستخدم ده.",
            "قفلة.",
            "مش مشترك؟ 403 ومعاها سبب واضح.",
            "رابط موقّع عمره ساعة، مش رابط public.",
            "قفلة."
          ],
          sol: R`بتوكن صاحب الطلب: [[200]] و [[{"data":{"id":"...","status":"PENDING","amountCents":50000,"course":{"slug":"...","title":"SQL"}}}]]. وبتوكن المستخدم التاني على نفس الـ id: [[404]] و [[{"error":{"code":"NOT_FOUND","message":"الطلب مش موجود"}}]]، مش 403. كده مبيعرفش إن الطلب ده موجود أصلًا. والأدمن بياخد 200 على أي طلب.

الفيديو: درس [[isPreview: true]] بيرجع الرابط لأي حد مسجّل دخول. ودرس عادي في كورس مش مشترك فيه بيرجع [[403 NOT_ENROLLED]]. هنا 403 مقبولة، لأن الدرس نفسه ظاهر في صفحة الكورس ومفيش سر في وجوده.

لو المستخدم التاني شاف الطلب، يبقى انت عامل [[findUnique({ where: { id } })]] وبعدين بتقارن [[userId]]، ونسيت المقارنة في route من الـ routes. الشرط جوه الـ where نفسه أضمن، لأنه ميتنسيش.`
        },
        {
          cmd: "POST /orders",
          title: "من زرار «اشتري» لطلب مستني الدفع",
          desc: R`الواجهة بتبعت [[courseId]] بس. السعر، والكورس منشور ولا لأ، والطالب مشترك قبل كده ولا لأ، كل ده السيرفر بيقرره من القاعدة. بعدين بيعمل Order بحالة PENDING، ويطلب من البوابة رابط دفع، ويرجّعه. والواجهة بتعمل [[window.location.href = checkoutUrl]].`,
          example: R`router.post("/orders", requireAuth, async (req, res) => {
  const { courseId } = CreateOrder.parse(req.body);
  const course = await db.course.findFirst({ where: { id: courseId, published: true } });
  if (!course) throw new AppError(404, "NOT_FOUND", "الكورس مش موجود");
  const owned = await db.enrollment.findUnique({ where: { userId_courseId: { userId: req.user.id, courseId } } });
  if (owned) throw new AppError(409, "ALREADY_ENROLLED", "الكورس ده عندك أصلًا");
  const order = await db.order.create({ data: { userId: req.user.id, courseId, amountCents: course.priceCents } });
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  const checkoutUrl = await paymob.createCheckout({ order, course, user });
  res.status(201).json({ data: { orderId: order.id, checkoutUrl } });
});`,
          try: R`ابعت الطلب بـ curl ومعاه [[amountCents: 1]] في الـ body. لازم الطلب يتعمل بالسعر الحقيقي، والحقل الزيادة يتجاهل. بعدين اشترك في كورس وحاول تطلبه تاني، ولازم ترجع 409.`,
          flag: "script",
          deep: {
            why: "أي حاجة جاية من المتصفح المستخدم يقدر يغيّرها: الـ DevTools، أو curl، أو إضافة. لو السعر أو الحالة جايين من الواجهة، أي حد يقدر يشتري بجنيه، أو يسجّل طلب مدفوع من غير ما يدفع.",
            how: R`الطلب بيتعمل قبل ما نكلّم البوابة. كده عندنا id نبعته للبوابة كمرجع (special_reference)، والبوابة هترجّعه في الـ webhook، فنعرف أنهي طلب اتدفع. ولو البوابة وقعت، الطلب بيفضل PENDING، ومفيش حاجة باظت.

والسعر بيتنسخ في الطلب ([[amountCents]]). الـ webhook بعدين بيقارن المبلغ اللي اتدفع بالرقم ده، مش بسعر الكورس الحالي اللي ممكن يكون اتغير في النص.

والكوبونات بتتحسب هنا على السيرفر: تتأكد إن الكوبون صالح، وتحسب السعر النهائي، وتنسخه في الطلب. وعدد استخدامات الكوبون بيزيد لما الدفع ينجح، مش هنا، وبـ update ذري: [[updateMany({ where: { code, uses: { lt: maxUses } }, data: { uses: { increment: 1 } } })]].

والكورس المجاني (السعر صفر) السيرفر بيعمله enrollment على طول من غير بوابة. بس ده قرار السيرفر من السعر اللي في القاعدة، مش حقل جاي من الواجهة.

وممكن تعيد استخدام طلب PENDING قديم لنفس الطالب ونفس الكورس بدل ما تعمل واحد جديد مع كل ضغطة. ده بيقلل الطلبات اليتيمة في القاعدة.`,
            when: "أي عملية فيها فلوس أو صلاحيات. الواجهة بتبعت «عايز إيه»، والسيرفر بيقرر «بكام» و «مسموح ولا لأ».",
            mistakes: R`في مشروع حقيقي، صفحة الدفع كانت بتعمل insert للطلب من المتصفح مباشرة في Supabase، ومعاه المبلغ والخصم والحالة. وسياسة RLS كانت بتسمح بطلب حالته [[completed]] لو طريقة الدفع [[free]]. وtrigger في القاعدة بيدّي الكورس لأي طلب completed. النتيجة إن أي عضو يقدر ياخد أي كورس مدفوع ببلاش، أو يدفع المبلغ اللي هو كتبه. وفي مشروع تاني، عداد استخدام الكوبون كان بيزيد قبل الدفع، وبطريقة «اقرا الرقم وضيف واحد واكتبه»، فطلبين مع بعض بيستخدموا نفس آخر كوبون.`
          },
          teach: R`## الواجهة بتقول «عايز إيه»، والسيرفر بيقرر الباقي

الـ route ده بياخد [[courseId]] بس، ويتأكد من الكورس والاشتراك من القاعدة، ويعمل طلب بالسعر اللي في القاعدة، ويرجّع رابط دفع. جربناه بـ Express 5 و Zod 4 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24). و [[paymob.createCheckout]] في التجربة دالة وهمية بترجّع رابط بنفس الشكل (الحقيقية في الدرس الجاي).

---

## ١. [[const { courseId } = CreateOrder.parse(req.body);]]

[[CreateOrder]] schema في Zod: [[z.object({ courseId: z.string().min(1) })]]. [[parse]] بيتأكد من الشكل، ولو غلط بيرمي [[ZodError]] والـ error handler بيحوّله 400.

والأهم: [[z.object]] بيشيل أي خانة مش متعرّفة. جربنا:

~~~text الناتج
CreateOrder.parse({ courseId: "c_sql", amountCents: 1, status: "PAID" })
→ { courseId: 'c_sql' }
~~~

[[amountCents]] و [[status]] اختفوا. وفوق كده بنعمل destructuring لـ [[courseId]] بس، فحتى لو الـ schema اتغيرت، الكود مش هيشوف غيره.

ومن غير [[courseId]]:

~~~text الناتج
no courseId    400 {"error":{"code":"VALIDATION",...,"details":[{"expected":"string","code":"invalid_type","path":["courseId"],...}]}}
~~~

---

## ٢. الكورس: [[db.course.findFirst({ where: { id: courseId, published: true } })]]

شرطين: الـ id ده، **و** منشور. كورس لسه draft بيرجع [[null]]، فـ 404 زي الكورس اللي مش موجود:

~~~text الناتج
draft course   404 {"error":{"code":"NOT_FOUND","message":"الكورس مش موجود"}}
~~~

---

## ٣. مشترك قبل كده؟ [[findUnique({ where: { userId_courseId: { userId, courseId } } })]]

جدول [[Enrollment]] عليه [[@@unique([userId, courseId])]]: الطالب مرة واحدة في كل كورس. Prisma بتعمل من القيد ده اسم واحد بيجمع الحقلين بـ [[_]]: [[userId_courseId]]، وبيه تقدر تعمل [[findUnique]] على الاتنين مع بعض.

لو لقاه: [[409]] (Conflict يعني الطلب بيتعارض مع حالة موجودة):

~~~text الناتج
enrolled       409 {"error":{"code":"ALREADY_ENROLLED","message":"الكورس ده عندك أصلًا"}}
~~~

---

## ٤. الطلب: [[db.order.create({ data: { userId: req.user.id, courseId, amountCents: course.priceCents } })]]

ركّز على مصدر كل خانة:

| الخانة | جاية منين |
|---|---|
| [[userId]] | التوكن ([[req.user.id]]) |
| [[courseId]] | الـ body، بس اتأكدنا إنه كورس منشور |
| [[amountCents]] | القاعدة ([[course.priceCents]]) |
| [[status]] | الـ schema: [[@default(PENDING)]] |

ولاحظ [[courseId]] لوحدها من غير [[: courseId]]: اختصار في JavaScript لما اسم الخانة واسم المتغير واحد.

التجربة اللي في الـ [[try]]، بعتنا [[amountCents: 1]]:

~~~text الناتج
amountCents:1  201 {"data":{"orderId":"cmuzelmlx0000iwiedvgitwip","checkoutUrl":"https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_…&clientSecret=egy_csk_test_…"}}
[ { amountCents: 50000, status: 'PENDING' } ]
~~~

الطلب اتعمل بـ 50000 قرش (٥٠٠ جنيه) زي ما الكورس في القاعدة. الفلوس دايمًا بالقرش كرقم صحيح ([[Int]])، عشان الكسور العشرية في الأرقام بتعمل أخطاء تقريب.

---

## ٥. [[db.user.findUniqueOrThrow({ where: { id: req.user.id } })]]

البوابة محتاجة الاسم والإيميل، والتوكن فيه id ودور بس. [[OrThrow]] معناها لو مش موجود ارمي (P2025 → 404) بدل ما ترجع [[null]].

---

## ٦. [[paymob.createCheckout({ order, course, user })]] و [[res.status(201)]]

الطلب اتحفظ **قبل** ما نكلّم البوابة، عشان [[order.id]] يتبعت لها كمرجع. ولو البوابة وقعت، الطلب بيفضل PENDING ومفيش حاجة باظت.

[[201]] = Created: اتعمل حاجة جديدة. والرد فيه [[orderId]] و [[checkoutUrl]]، والواجهة بتعمل [[window.location.href = checkoutUrl]].

---

## الخلاصة

| الحالة | الرد |
|---|---|
| مفيش [[courseId]] | 400 VALIDATION |
| كورس مش موجود أو draft | 404 NOT_FOUND |
| مشترك قبل كده | 409 ALREADY_ENROLLED |
| تمام (حتى لو بعت [[amountCents]]) | 201 والسعر من القاعدة |

أي حقل فيه فلوس أو حالة أو صلاحية بييجي من القاعدة أو التوكن، عمره ما بييجي من الـ body.`,
          lines: [
            "إنشاء طلب، ولازم يكون داخل.",
            "الواجهة بتبعت id الكورس بس. أي حقل تاني بيتجاهل.",
            "الكورس لازم يكون موجود ومنشور.",
            "مش موجود؟ 404.",
            "مشترك قبل كده؟",
            "لو أيوه، 409، ومفيش طلب جديد.",
            "الطلب بالسعر اللي في القاعدة وحالته PENDING (الافتراضي من الـ schema).",
            "بيانات المستخدم الكاملة، للبوابة (الاسم والإيميل).",
            "اطلب من البوابة رابط دفع للطلب ده (الدرس الجاي).",
            "رجّع رقم الطلب والرابط، والواجهة تحوّل عليه.",
            "قفلة."
          ],
          sol: R`الطلب بـ [[amountCents: 1]] بيرجع [[201]] و [[{"data":{"orderId":"...","checkoutUrl":"..."}}]]، وفي القاعدة [[amountCents]] بتاع الطلب هو [[priceCents]] بتاع الكورس (50000 مثلًا) والـ status [[PENDING]]. الحقل الزيادة اتشال لأن [[z.object]] في Zod بيشيل أي key مش متعرّف (strip)، والكود أصلًا بياخد السعر من القاعدة.

بعد ما الكورس يبقى عندك (enrollment موجود)، نفس الطلب يرجّع [[409]] و [[{"error":{"code":"ALREADY_ENROLLED","message":"الكورس ده عندك أصلًا"}}]]. ولو بعت [[courseId]] لكورس مش منشور، [[404 NOT_FOUND]].

لو الـ amountCents اللي في القاعدة طلع 1، يبقى انت عامل [[data: { ...req.body, userId }]] أو [[data: input]]. ده بالظبط الـ mass assignment، ومعناه إن أي حد يقدر يشتري أي كورس بقرش.`,
          solCode: R`curl -s -w ' %{http_code}\n' -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"courseId":"COURSE_ID","amountCents":1}' localhost:4000/orders

psql "$DATABASE_URL" -c 'SELECT "amountCents", status FROM "Order" ORDER BY "createdAt" DESC LIMIT 1;'`
        },
        {
          cmd: "Paymob intention",
          title: "اطلب من البوابة صفحة دفع للطلب ده",
          desc: R`Paymob عندها Intention API. السيرفر بيبعت المبلغ، ورقم الـ integration، وبيانات العميل، و [[special_reference]] بيبقى رقم الطلب بتاعنا، ومعاهم رابط الـ webhook ورابط الرجوع. الرد فيه [[client_secret]]، والسيرفر بيركّب منه رابط الـ Unified Checkout.

الكارت بيتكتب في صفحة Paymob، ومبيعدّيش على سيرفرك أبدًا. وتفاصيل الـ webhook والـ tunnel على جهازك في تاب «Node و npm».`,
          example: R`export async function createCheckout({ order, course, user }) {
  let r;
  try {
    r = await fetch("https://accept.paymob.com/v1/intention/", {
      method: "POST", signal: AbortSignal.timeout(10_000),
      headers: { Authorization: $__btToken $__{config.PAYMOB_SECRET_KEY}$__bt, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: order.amountCents, currency: "EGP", payment_methods: [config.PAYMOB_CARD_INTEGRATION_ID],
        items: [{ name: course.title, amount: order.amountCents, quantity: 1 }],
        billing_data: { first_name: user.name, last_name: "-", email: user.email, phone_number: user.phone ?? "NA" },
        special_reference: order.id, notification_url: $__bt$__{config.API_ORIGIN}/webhooks/paymob$__bt,
        redirection_url: $__bt$__{config.WEB_ORIGIN}/orders/$__{order.id}$__bt,
      }),
    });
  } catch (err) {
    logger.warn({ err, orderId: order.id }, "paymob unreachable");
  }
  if (!r?.ok) throw new AppError(502, "GATEWAY_DOWN", "بوابة الدفع مش متاحة دلوقتي، جرّب كمان شوية");
  const { client_secret } = await r.json();
  return $__bthttps://accept.paymob.com/unifiedcheckout/?publicKey=$__{config.PAYMOB_PUBLIC_KEY}&clientSecret=$__{client_secret}$__bt;
}`,
          try: R`اعمل حساب test في Paymob، وخد المفتاح السري والـ public key ورقم integration الكروت. اعمل طلب وافتح الرابط اللي رجع، وادفع بكارت الاختبار اللي في وثائقهم. شوف اللي وصل للـ webhook من لوحة ngrok.`,
          flag: "script",
          deep: {
            why: "ده الجزء اللي بيحوّل الطلب لصفحة دفع حقيقية. وفيه ٣ حاجات لازم تبقى صح: المبلغ جاي من الطلب، والمفتاح السري على السيرفر بس، والمرجع اللي هيربط الدفعة بالطلب.",
            how: R`الفلو فيه ٣ أطراف. سيرفرك بيعمل intention بالمفتاح السري. Paymob بترجّع [[client_secret]] خاص بالعملية دي. والمتصفح بيتحوّل لصفحة Paymob ومعاه الـ public key والـ client_secret، ودول الاتنين مش أسرار.

بعد ما العميل يدفع، Paymob بتعمل حاجتين منفصلتين. أولًا بتبعت POST لـ [[notification_url]] من سيرفرها لسيرفرك، وده الـ webhook، ودي الحقيقة. وتانيًا بتحوّل المتصفح لـ [[redirection_url]]، وده للعرض بس، ومش دليل على أي حاجة.

[[special_reference]] بيرجع في الـ webhook جوه [[obj.order.merchant_order_id]]، وبيه بنعرف أنهي طلب اتدفع. والمبلغ بالقرش، ومجموع الـ items لازم يساوي الـ amount. ورقم الـ integration بيحدد طريقة الدفع (كارت، أو محفظة، أو تقسيط)، ومن الـ config بيتحوّل رقم بـ [[z.coerce.number()]]. والمهلة ١٠ ثواني، عشان لو البوابة بطيئة طلب المستخدم ميفضلش معلّق.

وكون صفحة الكارت عند Paymob معناه إن بيانات الكارت عمرها ما بتلمس سيرفرك، فانت تقريبًا بره نطاق PCI DSS. ده سبب كفاية إنك متعملش فورم كارت بنفسك.

وفي staging استخدم integration بوضع test ومفاتيح test. وفي Stripe نفس الفكرة بالظبط: Checkout Session بـ [[metadata.orderId]]، والتأكيد من event اسمه [[checkout.session.completed]] في الـ webhook. وفلو Paymob القديم (auth token، وبعدين order، وبعدين payment key، وبعدين iframe) لسه موجود في مشاريع قديمة، بس الـ intention هو الطريقة الحالية.`,
            when: "مرة لكل محاولة دفع. ولو المستخدم رجع من غير ما يدفع وضغط «ادفع» تاني، ممكن تعمل intention جديد لنفس الطلب.",
            mistakes: "إنك تعمل الـ intention من الواجهة، فالمفتاح السري يبقى في الـ JavaScript. أو تبعت المبلغ من الـ request body. أو fetch من غير timeout، فطلب المستخدم يعلق دقايق. أو timeout من غير try/catch: الـ fetch بيرمي قبل سطر [[!r.ok]]، فالمستخدم ياخد 500 عام بدل «بوابة الدفع مش متاحة». أو مفاتيح الإنتاج في staging. أو تعتمد على رابط الرجوع كتأكيد للدفع، ودي الدرس الجاي والتاني بعده."
          },
          teach: R`## السيرفر بيطلب صفحة دفع، والكارت عمره ما بيلمسه

الدالة دي بتبعت POST لـ Intention API بتاعة Paymob بالمفتاح السري، وبتاخد [[client_secret]] من الرد، وبتركّب منه رابط صفحة الدفع. معندناش حساب Paymob، فجربناها على Node 24 (ويندوز 11) قصاد سيرفر وهمي على [[localhost:6021]] بيرد بنفس شكل رد Paymob، وغيّرنا أول الـ URL بس. أسماء الحقول ومسار [[/v1/intention/]] وشكل رابط الـ Unified Checkout من وثائق Paymob.

---

## ١. [[let r;]] و [[try {]]

[[r]] متعرّف **برا** الـ [[try]] لأن [[let]] بيعيش جوه الأقواس [[{}]] اللي اتعرّف فيها بس. لو اتعرّف جوه، السطر [[if (!r?.ok)]] اللي تحت مش هيشوفه.

والـ [[try]] ليه؟ لأن [[fetch]] نفسه **بيرمي** (مش بيرجّع رد) في حالتين: المهلة خلصت، أو مفيش اتصال خالص (DNS أو السيرفر مقفول).

---

## ٢. [[fetch("https://accept.paymob.com/v1/intention/", { ... })]]

### [[method: "POST", signal: AbortSignal.timeout(10_000)]]

- [[AbortSignal.timeout(ms)]] بيعمل signal بيلغي الطلب بعد المدة دي. و [[10_000]] هي 10000 (الـ [[_]] للقراية بس، JavaScript بيتجاهلها) = ١٠ ثواني.
- من غيره، [[fetch]] ممكن يستنى دقايق لو البوابة معلّقة، والمستخدم واقف قدام زرار بيلف.

### [[headers: { Authorization: $__btToken $__{config.PAYMOB_SECRET_KEY}$__bt, "Content-Type": "application/json" }]]

Paymob بتطلب المفتاح السري بكلمة [[Token]] ومسافة قبله (مش Bearer). والقيمة مكتوبة template literal: النص بين backticks، و [[$__{...}]] بيحط قيمة متغير جوه النص. [[Content-Type]] بيقول للبوابة إن الجسم JSON.

### الـ body: [[JSON.stringify({ ... })]]

السيرفر الوهمي طبع اللي وصله بالظبط:

~~~text الناتج (اللي وصل للبوابة)
{
  "method": "POST",
  "url": "/v1/intention/",
  "auth": "Token egy_sk_test_xxx",
  "body": {
    "amount": 50000,
    "currency": "EGP",
    "payment_methods": [4512345],
    "items": [{ "name": "SQL", "amount": 50000, "quantity": 1 }],
    "billing_data": { "first_name": "Ali", "last_name": "-", "email": "ali@example.com", "phone_number": "NA" },
    "special_reference": "cmuzelmlx0000iwiedvgitwip",
    "notification_url": "https://abcd.ngrok-free.app/webhooks/paymob",
    "redirection_url": "http://localhost:3000/orders/cmuzelmlx0000iwiedvgitwip"
  }
}
~~~

(المفاتيح ورقم الـ integration وهميين للتجربة.)

| الحقل | معناه |
|---|---|
| [[amount]] | المبلغ بالقرش، من الطلب (50000 = ٥٠٠ جنيه) |
| [[payment_methods]] | array فيها رقم الـ integration: بيحدد طريقة الدفع (كارت هنا) |
| [[items]] | اللي بيتباع، ومجموع [[amount × quantity]] لازم يساوي [[amount]] |
| [[billing_data]] | بيانات العميل. [[last_name]] و [[phone_number]] مطلوبين عندهم، فبنحط [[-]] و [[NA]] لو مش معانا |
| [[special_reference]] | id الطلب بتاعنا، بيرجع في الـ webhook |
| [[notification_url]] | الـ webhook: Paymob هتبعت عليه من سيرفرها |
| [[redirection_url]] | المتصفح هيرجع عليه بعد الدفع (للعرض بس) |

و [[user.phone ?? "NA"]]: لو [[phone]] بـ [[null]] (زي Ali في التجربة) خد [[NA]].

---

## ٣. [[catch (err) { logger.warn({ err, orderId: order.id }, "paymob unreachable"); }]]

الخطأ بيتسجّل ومش بيترمي تاني، و [[r]] بيفضل [[undefined]]. جربنا الحالتين:

~~~text الناتج
WARN paymob unreachable {"err":"TimeoutError","orderId":"cmuzelmlx0000iwiedvgitwip"}
hang -> AppError 502 GATEWAY_DOWN 10.0s
WARN paymob unreachable {"err":"TypeError","orderId":"cmuzelmlx0000iwiedvgitwip"}
closed port -> AppError 502 GATEWAY_DOWN 0.0s
~~~

- [[hang]]: السيرفر الوهمي استلم ومردّش خالص. بعد ١٠.٠ ثانية بالظبط الـ fetch رمى [[TimeoutError]] ([[The operation was aborted due to timeout]]).
- [[closed port]]: مفيش حد على البورت. الـ fetch رمى [[TypeError: fetch failed]] وسببه [[ECONNREFUSED]] (الاتصال اترفض).

---

## ٤. [[if (!r?.ok) throw new AppError(502, "GATEWAY_DOWN", ...)]]

- [[r?.ok]]: لو [[r]] بـ [[undefined]] (الـ catch اشتغل) النتيجة [[undefined]]، و [[!undefined]] = [[true]].
- [[r.ok]] بـ [[true]] لو الـ status من 200 لـ 299 بس. فلو البوابة ردت 401 (مفتاح غلط) [[ok]] بـ [[false]].

~~~text الناتج
401 -> AppError 502 GATEWAY_DOWN 0.0s
~~~

كل حالات الفشل التلاتة بقت نفس الـ [[502]] (Bad Gateway: سيرفر ورايا رد غلط أو مردّش) برسالة مفهومة. لاحظ إن حالة الـ 401 مش بتتسجّل في اللوج زي التانيين، فلو عايز تعرف إن المفتاح غلط ضيف [[logger.warn({ status: r.status }, ...)]] قبل الـ throw.

---

## ٥. [[const { client_secret } = await r.json();]] والرابط

الرد الناجح فيه [[client_secret]] خاص بالعملية دي. والرابط:

~~~text الناتج
ok -> https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_yyy&clientSecret=egy_csk_test_abc123
~~~

[[?]] بتبدأ الـ query string، و [[&]] بتفصل بين الخانات. [[publicKey]] و [[clientSecret]] الاتنين **مش أسرار**: هيبانوا في شريط العنوان. السر الوحيد هو [[PAYMOB_SECRET_KEY]] وده فضل على السيرفر.

---

## الخلاصة

| اللي حصل | [[fetch]] عمل إيه | النتيجة |
|---|---|---|
| البوابة ردت 2xx | رجّع رد [[ok]] | رابط الدفع |
| البوابة ردت 4xx/5xx | رجّع رد مش [[ok]] | 502 |
| البوابة معلّقة | رمى [[TimeoutError]] بعد ١٠ ثواني | لوج + 502 |
| مفيش اتصال | رمى [[TypeError: fetch failed]] | لوج + 502 |

المبلغ من الطلب، والمفتاح السري على السيرفر، و [[special_reference]] هو اللي هيربط الدفعة بالطلب في الـ webhook.`,
          lines: [
            "دالة في [[paymob.ts]] بتاخد الطلب والكورس والمستخدم وبترجّع رابط دفع.",
            "الرد هيتحط هنا. معرّف برا الـ try عشان نقراه بعده.",
            "try: لأن الـ fetch نفسه بيرمي لو المهلة خلصت أو النت/الـ DNS وقع، قبل ما يبقى فيه response أصلًا.",
            "POST لـ Intention API بتاعة Paymob...",
            "...ومهلة ١٠ ثواني. لو البوابة بطيئة، منعلقش المستخدم.",
            "المفتاح السري بكلمة Token قبله. ده مكانه السيرفر بس.",
            "جسم الطلب:",
            "المبلغ بالقرش من الطلب، والعملة، ورقم integration الكروت.",
            "الـ items، ومجموعها لازم يساوي المبلغ.",
            "بيانات الفاتورة. رقم التليفون مطلوب عندهم.",
            "رقم طلبنا كمرجع، هيرجع في الـ webhook. ورابط الـ webhook بتاعنا.",
            "المكان اللي المتصفح هيرجع له بعد الدفع. للعرض بس.",
            "قفلة الـ body.",
            "قفلة الـ fetch.",
            "timeout ([[TimeoutError]]) أو خطأ شبكة: منرميش الخطأ الخام (كان هيطلع 500 عام)...",
            "...بنسجّله في اللوج عشان نعرف البوابة بتقع إمتى، و [[r]] بيفضل undefined.",
            "قفلة الـ catch.",
            "مفيش رد خالص ([[?.]]) أو البوابة رجّعت error؟ الحالتين نفس الـ 502 برسالة مفهومة.",
            "خد الـ client_secret.",
            "رابط صفحة الدفع الموحدة، بالـ public key والـ client_secret.",
            "قفلة."
          ],
          sol: R`اللي المفروض تشوفه: [[createCheckout]] يرجّع رابط بالشكل [[https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_...&clientSecret=egy_csk_test_...]]، ولما تفتحه تلاقي صفحة Paymob فيها اسم الكورس والمبلغ بالجنيه (المبلغ اللي انت بعته بالقروش مقسوم على 100). وبعد الدفع بكارت الاختبار، البوابة بترجّعك على [[redirection_url]] (صفحة الطلب عندك)، وبتبعت POST على [[notification_url]].

في لوحة ngrok ([[http://127.0.0.1:4040]]) هتلاقي POST على [[/webhooks/paymob?hmac=...]]، وجسمه JSON فيه [["type": "TRANSACTION"]] و [[obj]] فيه [[success]] و [[pending]] و [[amount_cents]] و [[order.merchant_order_id]]. الأخير هو الـ id بتاع الطلب عندك (اللي بعته في [[special_reference]])، ومنه الـ webhook بيعرف أنهي طلب.

أشهر مشاكل: 401 من [[/v1/intention/]] يبقى المفتاح السري غلط أو فيه مسافة، أو بتستخدم مفتاح live مع integration test. ولو الصفحة فتحت من غير الكارت، يبقى [[PAYMOB_CARD_INTEGRATION_ID]] مش رقم integration الكروت. ولو مفيش webhook خالص، يبقى [[API_ORIGIN]] لسه localhost بدل رابط ngrok. الأرقام وأسماء الحقول الدقيقة ممكن تتغير، فراجعها في وثائق Paymob الحالية.`
        },
        {
          cmd: "webhook الدفع",
          title: "البوابة بتأكد: فعّل مرة واحدة بس",
          desc: R`الـ webhook هو المكان الوحيد اللي بيحوّل الطلب لـ PAID. قبل ما يعمل أي حاجة، بيتأكد من ٣ حاجات. التوقيع (HMAC) صح. والدفعة نجحت ومش معلّقة. والمبلغ هو مبلغ الطلب. وبعدين بيحدّث الطلب بشرط إنه لسه مش PAID، ويدّي الاشتراك، والاتنين جوه transaction واحدة.

كود [[verifyPaymob]] وتجربته على جهازك في تاب «Node و npm» في قسم الـ Webhooks.`,
          example: R`router.post("/webhooks/paymob", async (req, res) => {
  if (req.body.type !== "TRANSACTION") return res.status(200).end();
  const tx = req.body.obj;
  if (!verifyPaymob(tx, req.query.hmac, config.PAYMOB_HMAC_SECRET)) return res.status(401).end();
  if (tx.success === true && tx.pending === false) await orders.markPaid(tx.order.merchant_order_id, tx);
  res.status(200).end();
});
export async function markPaid(orderId, tx) {
  await db.$transaction(async (t) => {
    const order = await t.order.findUnique({ where: { id: orderId } });
    if (!order || tx.amount_cents !== order.amountCents) return logger.error({ orderId, txId: tx.id }, "payment mismatch");
    const { count } = await t.order.updateMany({ where: { id: orderId, status: { not: "PAID" } }, data: { status: "PAID", gatewayTxId: String(tx.id) } });
    if (count === 0) return;
    await t.enrollment.upsert({ where: { userId_courseId: { userId: order.userId, courseId: order.courseId } }, create: { userId: order.userId, courseId: order.courseId }, update: {} });
  });
}`,
          try: R`من لوحة ngrok اعمل Replay لنفس الـ webhook الناجح ٣ مرات، وتأكد إن فيه enrollment واحد بس. بعدين ابعت webhook فاشل لنفس الطلب بعد النجاح، ولازم يفضل PAID. وبعدين غيّر حرف في الـ hmac، ولازم ترجع 401 ومفيش حاجة تتغير.`,
          flag: "script",
          deep: {
            why: "ده أخطر endpoint في المشروع. هو عام، وأي حد يقدر يبعتله، وهو اللي بيدّي حاجات بفلوس. أي غلطة فيه معناها واحدة من الاتنين: كورسات ببلاش، أو ناس دفعت ومخدتش حاجة.",
            how: R`الحارس الأول التوقيع. Paymob بتحسب HMAC-SHA512 على حقول معينة بترتيب معين، وبتبعته في [[?hmac=]] في الـ query string. انت بتحسب نفس الحاجة بالسر بتاعك وبتقارن بـ [[timingSafeEqual]]. ولو التوقيع مش موجود، ده رفض. مش «عدّيه وخلاص».

الحارس التاني المبلغ. حتى لو التوقيع سليم، قارن [[amount_cents]] بمبلغ الطلب اللي في القاعدة. أي اختلاف معناه bug أو تلاعب، يتسجّل في اللوج ومفيش تفعيل.

الحارس التالت الحالة. [[updateMany]] بشرط [[status: { not: "PAID" }]] قراية وكتابة في خطوة ذرية. أول webhook بياخد count بـ 1 ويكمّل. وأي تكرار بعده، حتى لو في نفس الملّي ثانية، بياخد 0 ويطلع. والـ upsert على الاشتراك حماية زيادة.

الـ transaction بتضمن إن الطلب والاشتراك يتكتبوا الاتنين أو ولا واحد. ولو القاعدة وقعت في النص، الـ handler بيرمي error، ويرد 500، و Paymob بتعيد بعدين. وده اللي احنا عايزينه: الدفعة متضيعش.

وليه المحاولات الفاشلة مبتغيّرش الحالة لـ FAILED؟ لأن المستخدم ممكن يجرّب كارت تاني في نفس صفحة الدفع وينجح. ولو الطلب بقى FAILED، النجاح اللي بعده ممكن يتعامل غلط. المحاولات الفاشلة بتتسجّل في لوج الـ webhooks بس.

والـ handler هنا سريع، transaction واحدة. أي شغل تقيل بعد الدفع (إيميل الإيصال، والـ analytics) يروح queue بعد الـ commit. وفيه طبقة أمان أخيرة: job كل ربع ساعة بيسأل Paymob عن الطلبات اللي فضلت PENDING أكتر من نص ساعة. لو الـ webhook ضاع، الـ job ده بيلحقه (reconciliation).

وفيه بديل تاني شفناه في مشروع حقيقي وكان كويس: trigger في القاعدة بيدّي الاشتراك لما حالة الطلب تبقى completed، بـ [[on conflict do update]]، والـ function بتاعته محدش يقدر يناديها من برّه.`,
            when: "كل webhook بيأثر على فلوس أو صلاحيات. ونفس الحراس التلاتة بتنطبق على Stripe و Tabby و Tamara، بس شكل التوقيع مختلف.",
            mistakes: R`في مشروع حقيقي، الـ webhook كان بيعدّي من غير تحقق لو الـ header مش موجود أو السر مش متظبط. وكان مكتوب في الكود إن ده «عشان منكسرش الـ setup الحالي». وكمان الـ HMAC كان بيتحسب على الـ body الخام، وبيدوّر عليه في الـ headers، مع إن Paymob بتبعته في الـ query على حقول معينة. يعني عمليًا مفيش أي webhook كان بيتحقق منه. وفي مشروع تاني، مكانش فيه شرط على الحالة، فـ webhook فشل وصل متأخر قلب طلب مدفوع لـ failed. وفي تالت كان منع التكرار «اقرا الحالة، وبعدين اكتب» في خطوتين. وغلطة تانية: إنك تعالج كل حاجة بتوصل، وPaymob بتبعت أنواع تانية زي [[TOKEN]] للكروت المحفوظة. اتأكد إن [[req.body.type]] بيساوي [[TRANSACTION]].`
          },
          teach: R`## ٣ حراس قبل ما الطلب يبقى PAID

الـ route بيتأكد إن الحدث معاملة وإن التوقيع سليم، و [[markPaid]] بتتأكد من المبلغ وبتقلب الحالة مرة واحدة بس، وبتدّي الاشتراك في نفس الـ transaction. معندناش حساب Paymob، فجربنا بالـ solCode: سكربت بيعمل [[obj]] بنفس شكل Paymob ويوقّعه بسر تجربة، ويبعته للـ route الحقيقي (Express 5 و Prisma 7 على PostgreSQL 18 في Docker، ويندوز 11، Node 24). و [[verifyPaymob]] نفس الدالة اللي في تاب «Node و npm».

---

## ١. [[router.post("/webhooks/paymob", async (req, res) => {]]

مفيش [[requireAuth]]: اللي بيبعت هو سيرفر Paymob مش مستخدم معاه توكن. الحماية الوحيدة هي التوقيع.

### [[if (req.body.type !== "TRANSACTION") return res.status(200).end();]]

Paymob بتبعت أنواع تانية زي [[TOKEN]] (كارت اتحفظ). بنرد 200 عشان البوابة متعيدش، ومبنعملش حاجة. [[.end()]] بيقفل الرد من غير جسم.

~~~text الناتج
TOKEN type 200
~~~

### [[const tx = req.body.obj;]]

بيانات المعاملة نفسها: المبلغ، والنجاح، ورقم الطلب، والكارت...

---

## ٢. الحارس الأول: [[if (!verifyPaymob(tx, req.query.hmac, config.PAYMOB_HMAC_SECRET)) return res.status(401).end();]]

Paymob بتبعت التوقيع في الـ URL: [[/webhooks/paymob?hmac=...]]، فبنقراه من [[req.query.hmac]]. [[verifyPaymob]] بتلزق ٢٠ حقل من [[tx]] بترتيب ثابت وتحسب HMAC-SHA512 بالسر، وتقارن بـ [[timingSafeEqual]]. HMAC يعني hash بمفتاح: من غير السر محدش يقدر يطلّع نفس الرقم.

~~~text الناتج
tampered 401
  => {"status":"PENDING","gatewayTxId":null} enrollments: 0
no hmac 401
  => {"status":"PENDING","gatewayTxId":null} enrollments: 0
~~~

[[tampered]]: غيّرنا آخر حرف في التوقيع. [[no hmac]]: من غير [[?hmac=]] خالص. الاتنين 401 ومفيش حاجة اتغيرت. التوقيع الصح طوله ١٢٨ حرف hex (٥١٢ bit ÷ ٤).

---

## ٣. [[if (tx.success === true && tx.pending === false) await orders.markPaid(...)]]

[[===]] مقارنة صارمة: [[true]] الـ boolean بالظبط، مش [["true"]] النص. والشرطين مع بعض: نجحت **ومش** معلّقة (التحويلات البنكية مثلًا بتيجي [[pending: true]] الأول).

[[tx.order.merchant_order_id]] هو [[special_reference]] اللي بعتناه في الـ intention، يعني id الطلب عندنا.

~~~text الناتج
failed after 200
  => {"status":"PAID","gatewayTxId":"9001"} enrollments: 1
~~~

webhook فاشل بعد النجاح: رد 200 ومنادتش [[markPaid]] أصلًا، والطلب فضل PAID.

### [[res.status(200).end();]]

بعد ما الشغل اتحفظ. لو [[markPaid]] رمت (القاعدة وقعت)، Express 5 بيوصّل الخطأ للـ error handler، فالرد 500، و Paymob بتعيد بعدين.

---

## ٤. [[markPaid]]: جوه [[db.$transaction(async (t) => { ... })]]

[[$transaction]] بـ دالة (interactive transaction): كل اللي بيتعمل بـ [[t]] بيتنفذ على اتصال واحد، ولو الدالة رمت كله بيترجع (rollback). لازم تستخدم [[t]] جوه مش [[db]]، وإلا الـ query هيبقى برا الـ transaction.

### الحارس التاني: [[if (!order || tx.amount_cents !== order.amountCents) return logger.error(...)]]

حتى لو التوقيع سليم، المبلغ لازم يساوي مبلغ الطلب. بعتنا webhook موقّع صح بـ [[amount_cents: 100]]:

~~~text الناتج
ERROR payment mismatch {"orderId":"cmuzeoczb00005cieccukkeqc","txId":9001}
wrong amount 200
  => {"status":"PENDING","gatewayTxId":null} enrollments: 0
~~~

سجّل ورجع من غير تفعيل. والرد 200 لأن الإعادة مش هتصلّح حاجة: ده محتاج إنسان يبص.

### الحارس التالت: [[updateMany({ where: { id: orderId, status: { not: "PAID" } }, data: { status: "PAID", gatewayTxId: String(tx.id) } })]]

[[updateMany]] بترجع [[{ count }]]: عدد الصفوف اللي اتعدلت فعلًا. والشرط [[status: { not: "PAID" }]] جوه نفس الـ UPDATE، فالقاعدة بتقرا وتكتب في خطوة واحدة. و [[String(tx.id)]] لأن [[tx.id]] رقم والعمود [[gatewayTxId]] نص.

~~~text الناتج
  updateMany count: 1
first 200
  => {"status":"PAID","gatewayTxId":"9001"} enrollments: 1
  updateMany count: 0
replay 200
  updateMany count: 0
replay 200
  => {"status":"PAID","gatewayTxId":"9001"} enrollments: 1
~~~

### [[if (count === 0) return;]]

0 يعني حد فعّله قبلنا: تكرار، اطلع من غير ما تلمس الاشتراك.

### وفي نفس اللحظة؟

بعتنا ٥ webhooks لطلب جديد **مع بعض** ([[Promise.all]]):

~~~text الناتج
  updateMany count: 1
  updateMany count: 0
  updateMany count: 0
  updateMany count: 0
  updateMany count: 0
  o2 => PAID enrollments: 1
~~~

واحد بس خد 1. التانيين وقفوا على قفل الصف لحد ما الأول عمل commit، وبعدها PostgreSQL أعاد فحص الشرط فلقى الحالة PAID. لو كان الكود «اقرا الحالة، ولو مش PAID اكتب» في خطوتين، الخمسة كانوا هيقروا PENDING مع بعض.

### [[t.enrollment.upsert({ where: { userId_courseId: ... }, create: { ... }, update: {} })]]

[[upsert]]: لو موجود اعمل [[update]] (هنا [[{}]] يعني ولا حاجة)، ولو مش موجود اعمل [[create]]. حماية زيادة لو الطالب عنده اشتراك من طريق تاني.

---

## ٥. الـ solCode: إزاي وقّعنا الـ webhook بإيدنا

- [[process.argv.slice(2)]]: الـ arguments بعد [[node hook.mjs]]، فـ [[ORDER_ID true]] بيبقوا [[orderId]] و [[success]].
- [[obj]]: نفس شكل معاملة Paymob، و [[merchant_order_id: orderId]].
- [[get(o, "order.id")]]: بتمشي جوه الـ object نقطة نقطة بـ [[reduce]]، و [[a == null ? a : a[k]]] بتقف لو حاجة ناقصة بدل ما تقع.
- [[crypto.createHmac("sha512", secret).update(...).digest("hex")]]: نفس حسبة [[verifyPaymob]] بالظبط، فالتوقيع بيطلع صح.
- [[r.status]]: بيطبع رد السيرفر.

---

## الخلاصة

| الحارس | فين | لو فشل |
|---|---|---|
| النوع [[TRANSACTION]] | الـ route | 200 ومفيش شغل |
| التوقيع HMAC | الـ route | 401 |
| نجحت ومش معلّقة | الـ route | 200 ومفيش تفعيل |
| المبلغ | [[markPaid]] | لوج ومفيش تفعيل |
| لسه مش PAID (ذري) | [[updateMany]] | count 0 ومفيش تكرار |

والـ transaction بتضمن إن الطلب والاشتراك يتكتبوا مع بعض أو ولا واحد.`,
          lines: [
            "مسار الـ webhook. مفيش requireAuth، الحماية هي التوقيع.",
            "مش معاملة (زي TOKEN للكروت المحفوظة)؟ رد 200 ومتعملش حاجة.",
            "بيانات المعاملة.",
            "التوقيع غلط أو مش موجود؟ 401 ومفيش أي شغل.",
            "نجحت ومش معلّقة بس؟ فعّل الطلب اللي رقمه رجع في merchant_order_id.",
            "200 بعد ما الشغل اتحفظ. لو حصل error قبلها، البوابة هتعيد.",
            "قفلة.",
            "تفعيل الطلب، في الـ orders service عشان الـ job كمان يناديها.",
            "كله جوه transaction: الاتنين يحصلوا أو ولا واحد.",
            "هات الطلب.",
            "مش موجود أو المبلغ مختلف؟ سجّل وماتفعّلش.",
            "حوّله PAID بشرط إنه لسه مش PAID. قراية وكتابة في خطوة واحدة.",
            "0 يعني حد فعّله قبلنا. ده تكرار، اطلع.",
            "ادّي الاشتراك، وupsert عشان لو موجود ميقعش.",
            "قفلة الـ transaction.",
            "قفلة."
          ],
          sol: R`الـ Replay التلاتة كلهم بيرجعوا [[200]]، وفي القاعدة الطلب [[PAID]] و [[gatewayTxId]] فيه رقم المعاملة، وعدد الـ enrollments للطالب ده والكورس ده [[1]]. أول مرة [[updateMany]] رجّعت [[count: 1]]، والمرتين اللي بعدها [[count: 0]] فرجعت قبل الـ upsert.

الـ webhook الفاشل بعد النجاح برضه بيرجع 200، والطلب بيفضل [[PAID]]، لأن الـ route مبينادي [[markPaid]] غير لو [[success === true && pending === false]]. والـ hmac المتعدل بيرجع [[401]] من غير ما حاجة في القاعدة تتلمس.

لو لقيت enrollment مكرر، يبقى نسيت الشرط [[status: { not: "PAID" }]] أو معندكش [[@@unique([userId, courseId])]]. ولو الـ Replay رجع 500 مرة من المرات، ابص على اللوج: غالبًا [[P2002]] على [[gatewayTxId]]، وده معناه إن نفس المعاملة اتسجلت على طلب تاني.`,
          solCode: R`// تجربة من غير ngrok: ابعت webhook موقّع بإيدك
import crypto from "node:crypto";

const [orderId, success = "true"] = process.argv.slice(2);
const obj = { id: 9001, amount_cents: 50000, created_at: "2026-09-29T20:00:00", currency: "EGP", error_occured: false,
  has_parent_transaction: false, integration_id: 111, is_3d_secure: true, is_auth: false, is_capture: false,
  is_refunded: false, is_standalone_payment: true, is_voided: false, order: { id: 555, merchant_order_id: orderId },
  owner: 1, pending: false, source_data: { pan: "2346", sub_type: "MasterCard", type: "card" }, success: success === "true" };
const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
const hmac = crypto.createHmac("sha512", process.env.PAYMOB_HMAC_SECRET).update(fields.map((f) => String(get(obj, f))).join("")).digest("hex");
const r = await fetch("http://localhost:4000/webhooks/paymob?hmac=" + hmac, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "TRANSACTION", obj }),
});
console.log(r.status);

// node hook.mjs ORDER_ID true   (٣ مرات)
// node hook.mjs ORDER_ID false`
        },
        {
          cmd: "صفحة ما بعد الدفع",
          title: "الـ redirect مش دليل إن الفلوس وصلت",
          desc: R`بعد الدفع، Paymob بتحوّل المتصفح لـ [[/orders/:id]]، ومعاه query فيها [[success=true]] وحاجات تانية. أي حد يقدر يكتب الـ URL ده بإيده. عشان كده الصفحة مبتصدقش الـ query، بتسأل الـ API عن حالة الطلب، والحالة دي الـ webhook بس اللي بيغيّرها.

والـ webhook ممكن يوصل بعد الـ redirect بثواني، فالصفحة بتسأل كل ثانيتين لمدة دقيقة.`,
          example: R`"use client";
import { useEffect, useState } from "react";

export default function OrderResult({ orderId }) {
  const [status, setStatus] = useState("PENDING");
  useEffect(() => {
    const id = setInterval(async () => {
      const res = await apiFetch($__bt/orders/$__{orderId}$__bt);
      const s = res.ok ? (await res.json()).data.status : "PENDING";
      if (s !== "PENDING") { setStatus(s); clearInterval(id); }
    }, 2000);
    const stop = setTimeout(() => clearInterval(id), 60_000);
    return () => { clearInterval(id); clearTimeout(stop); };
  }, [orderId]);
  return status === "PAID" ? <a href="/me/courses">الدفع تم. ادخل على كورساتك</a> : <p>بنأكد الدفع مع البنك… لو اتأخر هيوصلك إيميل.</p>;
}`,
          try: R`افتح [[/orders/ID?success=true]] لطلب لسه PENDING، من غير ما تدفع. الصفحة لازم تفضل «بنأكد». بعدين ابعت الـ webhook من لوحة ngrok، وشوف الصفحة بتتغير لوحدها في خلال ثانيتين.`,
          flag: "script",
          deep: {
            why: "صفحة الرجوع هي أول مكان المطوّر بيفكر يفعّل فيه، لأنها «باينة»: المستخدم رجع و success=true. بس المستخدم ممكن يقفل الصفحة قبل ما ترجع، فالـ redirect ميحصلش أصلًا. وممكن كمان يكتب الـ URL بإيده. الـ webhook بيوصل من سيرفر لسيرفر، مهما المستخدم عمل.",
            how: R`الصفحة بتعمل polling: كل ثانيتين تسأل [[GET /orders/:id]]، واللي بيتأكد إن الطلب ده بتاع المستخدم (درس الملكية). أول ما الحالة تتغير بتوقف. وبعد دقيقة بتوقف برضه، وتقول للمستخدم إن الإيميل هيوصله. الـ cleanup في الـ return بيوقف الـ interval لو المستخدم خرج من الصفحة.

الـ query بتاعة الـ redirect ممكن تتستخدم للعرض «السلبي» بس. لو [[success=false]]، اعرض على طول «الدفع مكملش» وزرار «جرّب تاني». الغلط هنا نتيجته زرار زيادة، مش كورس ببلاش. وفي المقابل، النجاح لازم ييجي من الـ API.

وبدل الـ polling ممكن تستخدم socket.io: الـ webhook بعد التفعيل يبعت event للمستخدم. بس الـ polling أبسط، وبيشتغل حتى لو الـ socket مقطوع، ولدقيقة واحدة تمنه تافه. والـ polling والـ state في React في تاب «React».

وفيه حاجة لازم متنساهاش: الإيميل. لو المستخدم قفل الصفحة، إيميل «الكورس اتفعّل» هو اللي بيطمنه. وده بيتبعت من الـ queue بعد الـ webhook.`,
            when: "أي تكامل فيه redirect بعد عملية بتحصل عند طرف تاني: دفع، أو OAuth، أو توقيع مستندات.",
            mistakes: R`في مشروع حقيقي، endpoint التحقق من الدفع كان بيرجّع SUCCESS لطلب لسه PENDING، لمجرد إن المستخدم وصل صفحة الرجوع. وكان مكتوب في الكود «غالبًا نجح بما إن Paymob رجّعته هنا». أي حد يفتح الرابط ده يشوف «تم الدفع». ومن الغلطات كمان: polling من غير حد أقصى، فالصفحة المفتوحة تفضل تضرب الـ API طول اليوم. أو تنسى تعمل cleanup للـ interval، فيفضل شغال بعد ما المستخدم يخرج من الصفحة.`
          },
          teach: R`## الصفحة بتسأل السيرفر، مش بتصدّق الـ URL

الـ component ده بيعرض «بنأكد الدفع» ويسأل [[GET /orders/:id]] كل ثانيتين لحد ما الحالة تتغير أو تعدّي دقيقة. جربناه في Next.js 16 (React 19) على Node 24 (ويندوز 11)، وفتحناه في Chrome headless بـ playwright. والـ API في التجربة route بسيط في نفس الـ Next app بيرجّع PENDING لحد ما نبعتله POST (بدل الـ webhook)، و [[apiFetch]] بقت [[fetch("/api" + path)]].

---

## ١. [["use client"]] والـ imports

[["use client"]] في أول الملف بيقول لـ Next إن الـ component ده بيشتغل في المتصفح، لأنه محتاج hooks ([[useState]] و [[useEffect]]) و timers. من غيرها Next بيعتبره Server Component وبيرفض الـ hooks.

---

## ٢. [[export default function OrderResult({ orderId }) {]]

[[{ orderId }]] destructuring للـ props: الصفحة الأب بتنادي [[<OrderResult orderId={id} />]] بالـ id اللي في الـ URL.

### [[const [status, setStatus] = useState("PENDING");]]

[[useState]] بترجع array فيها حاجتين: القيمة الحالية، ودالة تغيّرها. كل ما تنادي [[setStatus]] React بيرسم الـ component تاني بالقيمة الجديدة. والبداية [["PENDING"]] دايمًا، مهما الـ URL قال.

---

## ٣. [[useEffect(() => { ... }, [orderId]);]]

[[useEffect]] بيشغّل الكود بعد ما الـ component يظهر. و [[[orderId]]] في الآخر (dependency array) معناها «شغّله تاني لو [[orderId]] اتغير بس»، مش مع كل رسمة.

### [[const id = setInterval(async () => { ... }, 2000);]]

[[setInterval]] بينادي الدالة كل ٢٠٠٠ ملّي (ثانيتين)، وبيرجّع رقم [[id]] بنوقفه بيه بعدين.

جوه:

- [[const res = await apiFetch(...)]]: اسأل السيرفر.
- [[res.ok ? (await res.json()).data.status : "PENDING"]]: لو الرد 2xx خد [[data.status]] من الـ JSON، ولو لأ (401 أو 500) اعتبرها لسه PENDING ومتعرضش حاجة غلط.
- [[if (s !== "PENDING") { setStatus(s); clearInterval(id); }]]: أول ما تتغير، اعرضها ووقّف السؤال.

### [[const stop = setTimeout(() => clearInterval(id), 60_000);]]

[[setTimeout]] بينادي مرة واحدة بعد ٦٠ ثانية: يوقّف الـ interval مهما حصل. ده الحد الأقصى.

### [[return () => { clearInterval(id); clearTimeout(stop); };]]

الدالة اللي [[useEffect]] بترجعها اسمها cleanup: React بينادي عليها لما المستخدم يخرج من الصفحة (أو [[orderId]] يتغير). من غيرها الـ interval يفضل شغال في الخلفية.

---

## ٤. التجربة: [[?success=true]] من غير دفع

فتحنا [[/ar/orders/o_123?success=true&id=999]] وراقبنا الطلبات:

~~~text الناتج
0.2s text: بنأكد الدفع مع البنك… لو اتأخر هيوصلك إيميل.
2.2s GET /api/orders/o_123 200 {"data":{"id":"o_123","status":"PENDING"}}
4.2s GET /api/orders/o_123 200 {"data":{"id":"o_123","status":"PENDING"}}
5.2s -- webhook marks PAID
6.2s GET /api/orders/o_123 200 {"data":{"id":"o_123","status":"PAID"}}
6.6s text: الدفع تم. ادخل على كورساتك
11.6s calls before/after 5s: 3 3
~~~

- [[success=true]] في الـ URL ملهاش أي تأثير: الصفحة فضلت «بنأكد».
- أول سؤال بعد ثانيتين مش على طول، لأن [[setInterval]] بيستنى المدة الأول.
- بعد الـ «webhook» أول سؤال جاب PAID، والصفحة اتغيرت.
- عدد الطلبات فضل [[3]] بعد ٥ ثواني: الـ [[clearInterval]] وقّف السؤال.

### ولو الـ webhook مجاش خالص؟

استخدمنا ساعة وهمية في playwright ([[page.clock]]) وقدّمنا الوقت ٧٠ ثانية، وبعدين ٢٠ كمان:

~~~text الناتج
o_never calls after 70s: 30 after 90s: 30 | بنأكد الدفع مع البنك… لو اتأخر هيوصلك إيميل.
~~~

٣٠ سؤال في الدقيقة (٦٠ ÷ ٢)، وبعدها وقف خالص، والرسالة فضلت. الإيميل هو اللي هيبلّغ المستخدم.

---

## ٥. [[return status === "PAID" ? <a ...>...</a> : <p>...</p>;]]

ternary في JSX: لو PAID اعرض لينك الكورسات، غير كده رسالة الانتظار. ولاحظ إن أي حالة تانية غير PENDING (زي FAILED) هتوقف السؤال وتعرض رسالة الانتظار، فلو عايز تعرض «الدفع مكملش» ضيف فرع ليها.

---

## الخلاصة

| الحاجة | الكود | ليه |
|---|---|---|
| الحالة الأولى | [[useState("PENDING")]] | الـ URL مش دليل |
| السؤال | [[setInterval(..., 2000)]] | الـ webhook ممكن يتأخر ثواني |
| الوقف عند التغيير | [[clearInterval(id)]] | مفيش طلبات زيادة |
| الحد الأقصى | [[setTimeout(..., 60_000)]] | الصفحة المفتوحة متضربش الـ API طول اليوم |
| الخروج | الـ cleanup | مفيش interval يتيم |

النجاح بييجي من الـ API اللي الـ webhook بس اللي بيغيّره.`,
          lines: [
            "component بيشتغل في المتصفح (hooks).",
            "الـ hooks اللي هنستخدمها.",
            "الصفحة بتاخد رقم الطلب.",
            "الحالة بتبدأ PENDING.",
            "لما الصفحة تفتح...",
            "...كل ثانيتين...",
            "...اسأل الـ API عن الطلب...",
            "...وخد الحالة. لو فيه خطأ، اعتبرها لسه PENDING.",
            "لو اتغيرت، اعرضها ووقّف السؤال.",
            "قفلة الـ interval.",
            "بعد دقيقة وقّف في كل الأحوال.",
            "لما يخرج من الصفحة، وقّف الاتنين.",
            "قفلة الـ effect.",
            "مدفوع؟ لينك للكورسات. غير كده رسالة انتظار.",
            "قفلة."
          ],
          sol: R`وانت فاتح [[/orders/ID?success=true]] لطلب PENDING، الصفحة بتفضل «بنأكد الدفع مع البنك…»، وفي Network هتلاقي [[GET /orders/ID]] كل ثانيتين وكلهم راجعين [[{"data":{"status":"PENDING",...}}]]. الـ [[success=true]] في الـ URL ملهاش أي تأثير، وده المطلوب: أي حد يقدر يكتبها بإيده.

أول ما تبعت الـ webhook، أول polling بعده يرجع [[PAID]]، والصفحة تتحول للينك «الدفع تم» في خلال ثانيتين، والطلبات تقف. ولو استنيت أكتر من دقيقة من غير webhook، الـ polling بيقف لوحده والصفحة بتفضل على الرسالة، وده المقصود (الإيميل هو اللي هيبلّغه).

لو الصفحة قالت «تم» من غير webhook، يبقى انت بتقرا [[searchParams.success]] في مكان ما. ولو الطلبات مبتقفش بعد PAID، يبقى الـ [[clearInterval]] مش شغال. ولو رجعت 401 كل مرة، يبقى [[apiFetch]] مش بيبعت التوكن، والصفحة هتفضل PENDING للأبد.`
        },
        {
          cmd: "اشتراكات Stripe",
          title: "اشتراك شهري بـ Stripe Billing: الخطط والتجربة والتجديد والفشل",
          desc: R`دفع الكورس مرة واحدة اتعمل بـ Paymob في الدروس اللي فاتت. الاشتراك الشهري (خطة Pro للأكاديمية مثلًا) مختلف: التجديد كل شهر، والكارت ممكن يفشل في شهر، والعميل يرقّي أو ينزّل الخطة في النص. Stripe Billing بيدير ده كله: Product و Price شهري في الـ dashboard، و Checkout بـ [[mode: "subscription"]] للاشتراك، و Customer Portal لتغيير الكارت والخطة والإلغاء.

الـ webhook هو مصدر الحقيقة زي Paymob: جدول [[subscriptions]] عندك بيتحدث من الأحداث، والصلاحيات بتتقري منه. Stripe مش متاح كحساب تاجر لكل الدول (راجع قايمة الدول المدعومة)، فلو شغلك في مصر غالبًا هتستخدم Paymob أو شركة ليها كيان برّه.`,
          example: R`router.post("/billing/checkout", tenantScope, requireTenantRole("OWNER"), async (req, res) => {
  const { plan } = z.object({ plan: z.enum(["pro_monthly", "pro_yearly"]) }).parse(req.body);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: req.tenant.stripeCustomerId,
    line_items: [{ price: config.PRICES[plan], quantity: 1 }],
    subscription_data: { trial_period_days: 14, metadata: { tenantId: req.tenant.id } },
    success_url: $__bt$__{config.WEB_ORIGIN}/billing?done=1$__bt,
    cancel_url: $__bt$__{config.WEB_ORIGIN}/billing$__bt,
  });
  res.json({ data: { url: session.url } });
});
router.post("/billing/portal", tenantScope, requireTenantRole("OWNER"), async (req, res) => {
  const portal = await stripe.billingPortal.sessions.create({ customer: req.tenant.stripeCustomerId, return_url: $__bt$__{config.WEB_ORIGIN}/billing$__bt });
  res.json({ data: { url: portal.url } });
});
app.post("/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  let event;
  try { event = stripe.webhooks.constructEvent(req.body, req.get("stripe-signature"), config.STRIPE_WEBHOOK_SECRET); } catch { return res.status(400).send("bad signature"); }
  if (event.type.startsWith("customer.subscription.")) {
    const sub = await stripe.subscriptions.retrieve(event.data.object.id);
    const item = sub.items.data[0];
    await db.subscription.upsert({
      where: { stripeSubscriptionId: sub.id },
      create: { tenantId: sub.metadata.tenantId, stripeSubscriptionId: sub.id, status: sub.status, priceId: item.price.id, currentPeriodEnd: new Date(item.current_period_end * 1000), cancelAtPeriodEnd: sub.cancel_at_period_end },
      update: { status: sub.status, priceId: item.price.id, currentPeriodEnd: new Date(item.current_period_end * 1000), cancelAtPeriodEnd: sub.cancel_at_period_end },
    });
  }
  if (event.type === "invoice.payment_failed") await emailQueue.add("payment-failed", { invoiceId: event.data.object.id });
  res.json({ received: true });
});`,
          try: R`اعمل حساب Stripe في test mode، و Product بـ Price شهري وسنوي. ثبّت Stripe CLI واعمل [[stripe listen --forward-to localhost:4000/webhooks/stripe]]، واشترك بالكارت [[4242 4242 4242 4242]]. بعدين من الـ Portal غيّر الخطة من شهري لسنوي، وبعدين الغي. وبعدين جرّب [[stripe trigger invoice.payment_failed]]. بعد كل خطوة بص على جدول subscriptions.`,
          flag: "script",
          deep: {
            why: "الاشتراكات فيها حالات أكتر بكتير من الدفع مرة واحدة: تجربة بتخلص، وتجديد بيفشل، وإعادة محاولات، وترقية في نص الشهر، وإلغاء في آخر الفترة. لو بنيت ده بنفسك فوق دفع عادي، هتقضي شهور في حالات حدية. Stripe Billing بيعمله، ودورك إنك تعكس الحالة عندك صح وتفتح وتقفل الميزات على أساسها.",
            how: R`[[status]] بتاع الاشتراك هو اللي بيقرر: [[trialing]] و [[active]] يعني الميزات مفتوحة. و [[past_due]] يعني التجديد فشل و Stripe بيحاول تاني (سيب الميزات مفتوحة فترة سماح وبان banner «حدّث الكارت»). و [[canceled]] و [[unpaid]] يعني اقفل. و [[incomplete]] أول دفعة لسه مكملتش. و [[cancelAtPeriodEnd]] معناها المستخدم لغى بس الفترة المدفوعة لسه شغالة.

التجربة: [[trial_period_days: 14]]، والكارت بيتطلب في الـ Checkout افتراضيًا، فبعد ١٤ يوم بيتحاسب لوحده. وحدث [[customer.subscription.trial_will_end]] بييجي قبلها بـ ٣ أيام، وده وقت إيميل «تجربتك هتخلص».

الـ proration: لما العميل يرقّي من شهري لسنوي أو من Basic لـ Pro في نص الفترة، Stripe بيحسب الفرق للأيام الباقية ويحطه في الفاتورة الجاية (أو يحاسب فورًا حسب الإعداد). من الـ Portal ده بيحصل لوحده. ومن الكود: [[stripe.subscriptions.update(id, { items: [{ id: itemId, price: newPrice }], proration_behavior: "create_prorations" })]].

الـ dunning: لما التجديد يفشل، Stripe بيعمل Smart Retries على كذا يوم، وبيبعت إيميلات للعميل لو فعّلتها من الـ dashboard، وفي الآخر بيلغي أو بيسيبه unpaid حسب إعداداتك. وانت بتاخد [[invoice.payment_failed]] مع كل محاولة، وتبعت إيميلك أو تحط banner.

الـ webhook: [[express.raw]] لازم لأن التوقيع محسوب على الـ body زي ما وصل حرف بحرف، ولازم يتسجّل قبل [[express.json()]] العام أو يبقى route لوحده. و [[constructEvent]] بترمي لو التوقيع غلط أو قديم (أكتر من ٥ دقايق افتراضيًا)، فبنرجّع 400. وبنستخدم أحداث [[customer.subscription.*]] (created و updated و deleted) عشان نعكس الحالة كلها بـ upsert، فالتكرار ميبوظش حاجة. بس Stripe مبتضمنش ترتيب الأحداث: لو حدث [[updated]] قديم (فيه trialing) وصل بعد [[deleted]]، والكود بيكتب الـ object اللي جوه الحدث، الاشتراك الملغي يرجع شغال. عشان كده المثال بيتجاهل الـ object اللي في الحدث ويجيب الاشتراك من Stripe بـ [[subscriptions.retrieve]]، فياخد آخر حالة دايمًا مهما كان ترتيب الوصول.

[[current_period_end]] بقى على مستوى الـ subscription item (أول عنصر في [[items.data]]) من API سنة 2025، مش على الاشتراك نفسه. لو بتقرا كود قديم أو tutorial قديم، دي أول حاجة هتلاقيها مختلفة.

الـ customer: اعمل Stripe customer لكل tenant مرة واحدة ([[stripe.customers.create]]) وخزن الـ id. ولو الاشتراك للشخص مش للـ workspace، يبقى لكل user.`,
            when: "منتج بخطط شهرية أو سنوية لعملاء برّه مصر أو شركة ليها كيان في دولة مدعومة. ولو السوق مصر بس، الاشتراكات بتتعمل بـ Paymob (فيه subscriptions) أو بفواتير شهرية بتتدفع كل مرة.",
            mistakes: R`تفتح الميزات من صفحة [[success_url]] بدل الـ webhook. أو [[express.json]] قبل الـ webhook فالتوقيع يفشل دايمًا. أو تقفل الميزات أول ما [[past_due]] تيجي والعميل لسه Stripe بيحاول. أو تنسى [[cancel_at_period_end]] فتقفل على واحد لسه دافع للشهر. أو تحط السعر من الواجهة بدل price id من config. أو تسيب الـ webhook من غير تسجيل الـ event id، فتتلخبط لو حصل مشكلة. وفي الانترفيو: «الـ webhook وصل قبل ما الـ redirect يرجع، أو العكس؟» الواجهة تعرض «جاري التفعيل» وتسأل السيرفر، نفس «صفحة ما بعد الدفع».`
          },
          teach: R`## ٣ routes: ابدأ اشتراك، وادير اشتراكك، واسمع من Stripe

الأول بيعمل Checkout Session لاشتراك، والتاني بيفتح Customer Portal، والتالت webhook بيعكس حالة الاشتراك في جدول [[subscriptions]]. معندناش حساب Stripe، فالـ Checkout والـ Portal هنا من وثائق Stripe (محتاجين API حقيقي). أما الـ webhook فجربناه كامل على جهازنا: SDK بتاع Stripe 23 بيقدر يعمل توقيع تجربة بـ [[generateTestHeaderString]] من غير نت، فبعتنا أحداث موقّعة للـ route الحقيقي (Express 5 و Prisma 7 على PostgreSQL 18 في Docker، ويندوز 11، Node 24).

---

## ١. [[router.post("/billing/checkout", tenantScope, requireTenantRole("OWNER"), ...)]]

[[tenantScope]] و [[requireTenantRole]] من قسم «multi-tenant SaaS» في المستوى الجاي: الاشتراك بتاع الـ workspace كله، ومالكه بس اللي يدفع.

### [[z.object({ plan: z.enum(["pro_monthly", "pro_yearly"]) })]]

الواجهة بتبعت **اسم** خطة من قايمة، مش سعر ولا price id. أي اسم تاني → 400.

### [[stripe.checkout.sessions.create({ ... })]] (من الـ docs)

| الخيار | معناه |
|---|---|
| [[mode: "subscription"]] | اشتراك متكرر، مش دفعة واحدة ([[payment]]) |
| [[customer]] | عميل Stripe بتاع الـ workspace، اتعمل مرة واحدة واتخزن |
| [[line_items: [{ price: config.PRICES[plan], quantity: 1 }]]] | الـ price id ([[price_...]]) من الإعدادات حسب اسم الخطة |
| [[subscription_data.trial_period_days: 14]] | تجربة ١٤ يوم |
| [[subscription_data.metadata.tenantId]] | بيتنسخ على الاشتراك، فيرجعلنا في كل حدث عنه |
| [[success_url]] / [[cancel_url]] | المتصفح يرجع فين. للعرض بس |

والرد فيه [[session.url]]: صفحة Stripe، والواجهة بتحوّل عليها.

### [[stripe.billingPortal.sessions.create({ customer, return_url })]] (من الـ docs)

بوابة جاهزة عند Stripe: تغيير الكارت والخطة والإلغاء والفواتير. انت بس بتعمل session قصيرة وتدّي الرابط.

---

## ٢. الـ webhook: [[app.post("/webhooks/stripe", express.raw({ type: "application/json" }), ...)]]

[[express.raw]] بيسيب الـ body [[Buffer]] (bytes زي ما وصلت) من غير ما يحوّله object، لأن التوقيع محسوب على النص حرف بحرف. و [[app.post]] مش [[router]] عشان يتسجّل قبل [[express.json()]] العام.

### [[stripe.webhooks.constructEvent(req.body, req.get("stripe-signature"), config.STRIPE_WEBHOOK_SECRET)]]

Stripe بتبعت header شكله كده:

~~~text الـ header اللي اتبعت في التجربة
Stripe-Signature: t=1791456351,v1=dcfa2a1bf3dd…
~~~

[[t]] وقت الإرسال (ثواني من ١٩٧٠)، و [[v1]] HMAC-SHA256 لـ [[t.body]] بالسر [[whsec_...]]. [[constructEvent]] بتحسبه تاني وتقارن، وتتأكد إن [[t]] مش أقدم من ٥ دقايق، وترجّع الحدث كـ object. جربنا ٣ حالات فشل:

~~~text الناتج
constructEvent threw: StripeSignatureVerificationError - No signatures found matching the expected signature for payload. Are you passing the raw request body you rece…
customer.subscription.updated          400 bad signature
constructEvent threw: StripeSignatureVerificationError - Timestamp outside the tolerance zone
customer.subscription.updated          400 bad signature
constructEvent threw: StripeSignatureVerificationError - Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance represe…
customer.subscription.updated          400 bad signature
~~~

1. غيّرنا حرف في [[v1]]: التوقيع مش مطابق.
2. توقيع صح بس [[t]] من ١٠ دقايق: replay قديم، اترفض.
3. نفس الحدث السليم، بس على تطبيق فيه [[app.use(express.json())]] **قبل** الـ webhook: الـ body بقى object، و [[constructEvent]] رفضت. دي أشهر غلطة.

والـ [[try { ... } catch { return res.status(400)... }]] على سطر واحد: أي فشل في التحقق = 400 ومفيش شغل.

---

## ٣. [[if (event.type.startsWith("customer.subscription."))]]

بيلقط [[created]] و [[updated]] و [[deleted]] (وكمان [[trial_will_end]]) بشرط واحد.

### [[const sub = await stripe.subscriptions.retrieve(event.data.object.id);]]

بنجيب الاشتراك من Stripe بالـ id، مش بنصدّق الـ object اللي جوه الحدث. ليه؟ Stripe مبتضمنش ترتيب الأحداث. جربنا بالنسخة اللي بتكتب [[event.data.object]] مباشرة: بعتنا [[deleted]]، وبعدها حدث [[updated]] أقدم وصل متأخر:

~~~text الناتج (بـ event.data.object)
customer.subscription.deleted          200 {"received":true}
   row: [{"status":"canceled",...}]
-- late, older event arrives after deleted:
customer.subscription.updated          200 {"received":true}
   row: [{"status":"trialing",...}]
~~~

الاشتراك الملغي رجع trialing، يعني الميزات اتفتحت تاني لعميل لغى. وبـ [[retrieve]] (عملناها في التجربة دالة وهمية بترجّع آخر حالة عند «Stripe»، والحقيقية API call):

~~~text الناتج (بـ retrieve)
-- late, older event arrives after deleted:
customer.subscription.updated          200 {"received":true}
   row: [{"status":"canceled",...}]
~~~

### [[const item = sub.items.data[0];]]

الاشتراك فيه array من items (كل خطة item). عندنا خطة واحدة فبناخد الأول. ومن API سنة 2025 [[current_period_end]] بقى على الـ item مش على الاشتراك (الـ CHANGELOG بتاع stripe-node بيقول اتشال من [[Subscription]] واتضاف على [[SubscriptionItem]]).

### [[db.subscription.upsert({ where: { stripeSubscriptionId: sub.id }, create: {...}, update: {...} })]]

- [[where]] بالـ id بتاع Stripe ([[sub_...]])، وعليه [[@unique]].
- [[new Date(item.current_period_end * 1000)]]: Stripe بتبعت الوقت بالثواني، و [[Date]] في JavaScript بالملّي، فبنضرب في ١٠٠٠.
- [[tenantId: sub.metadata.tenantId]] في الـ create بس: اللي حطيناه في [[subscription_data.metadata]].

التجربة خطوة خطوة (نفس الاشتراك):

~~~text الناتج
customer.subscription.created   200  row: status trialing,  priceId price_pro_monthly, cancelAtPeriodEnd false
customer.subscription.created   200  row: نفس الصف (التكرار ملوش أثر)
customer.subscription.updated   200  row: status trialing,  priceId price_pro_yearly,  cancelAtPeriodEnd false
customer.subscription.updated   200  row: status trialing,  priceId price_pro_yearly,  cancelAtPeriodEnd true
customer.subscription.deleted   200  row: status canceled,  priceId price_pro_yearly,  cancelAtPeriodEnd true
~~~

ودايمًا صف واحد، و [[currentPeriodEnd]] بعد ١٤ يوم ([[2026-10-22T10:45:51.000Z]]).

### اشتراك من غير [[tenantId]]

زي اللي [[stripe trigger]] بيعمله:

~~~text الناتج
UNHANDLED PrismaClientValidationError: Invalid $__btdb.subscription.upsert()$__bt invocation ... Argument $__bttenant$__bt is missing.
customer.subscription.created          500 {"error":{"code":"INTERNAL","message":"حصلت مشكلة"}}
~~~

500 معناها Stripe هتفضل تعيد الحدث. اتعامل معاه: لو [[!sub.metadata.tenantId]] سجّل في اللوج ورد 200.

---

## ٤. [[if (event.type === "invoice.payment_failed") await emailQueue.add(...)]]

~~~text الناتج
invoice.payment_failed                 200 {"received":true}
   queue: [["payment-failed",{"invoiceId":"in_TEST1"}]]
~~~

الـ handler بيحط job بالـ id بس ويرد، والإيميل بيتبعت من الـ worker (درس «background jobs»). و [[res.json({ received: true })]] رد سريع، لأن Stripe بتعتبر الحدث فشل لو الرد اتأخر.

---

## الخلاصة

| الجزء | بيعمل إيه | اتجرب؟ |
|---|---|---|
| [[/billing/checkout]] | صفحة اشتراك عند Stripe بتجربة ١٤ يوم | من الـ docs |
| [[/billing/portal]] | بوابة العميل | من الـ docs |
| [[express.raw]] + [[constructEvent]] | التوقيع والوقت | اتجرب (٣ حالات رفض) |
| [[retrieve]] + [[upsert]] | آخر حالة، صف واحد | اتجرب (retrieve وهمية) |
| [[invoice.payment_failed]] | إيميل «حدّث الكارت» | اتجرب (queue وهمية) |

الصلاحيات بتتقري من جدول [[subscriptions]] اللي الـ webhook بيحدّثه، مش من [[success_url]].`,
          lines: [
            "بدء الاشتراك: الـ OWNER بس، جوه الـ workspace.",
            "الخطة من قايمة ثابتة، مش سعر من الواجهة.",
            "Checkout من Stripe:",
            "وضع الاشتراك.",
            "عميل Stripe بتاع الـ workspace.",
            "الـ price id من الإعدادات.",
            "تجربة ١٤ يوم، والـ tenant في الـ metadata عشان الـ webhook يعرف ده لمين.",
            "يرجع هنا بعد الدفع...",
            "...أو لو لغى.",
            "قفلة.",
            "الواجهة تعمل redirect للـ URL ده.",
            "قفلة.",
            "Customer Portal: تغيير الكارت والخطة والإلغاء والفواتير.",
            "session قصيرة للبوابة بتاعة العميل ده.",
            "رجّع الـ URL.",
            "قفلة.",
            "الـ webhook: الـ body خام عشان التوقيع.",
            "الحدث.",
            "اتحقق من التوقيع. لو غلط أو قديم، 400 ومتكملش.",
            "أي تغيير في الاشتراك (إنشاء، أو تحديث، أو إلغاء):",
            "هات آخر حالة للاشتراك من Stripe نفسه، مش الـ object اللي في الحدث، لأن الأحداث ممكن توصل بترتيب غلط.",
            "أول item (الخطة).",
            "اعكس الحالة عندك:",
            "بالـ id بتاع Stripe.",
            "لو جديد: الـ tenant، والحالة، والخطة، ونهاية الفترة، والإلغاء في الآخر.",
            "لو موجود: حدّث نفس الحقول.",
            "قفلة.",
            "قفلة.",
            "تجديد فشل؟ ابعت إيميل «حدّث الكارت».",
            "رد سريع إن الحدث اتستلم.",
            "قفلة."
          ],
          sol: R`بعد الاشتراك: صف في subscriptions بـ [[status: "trialing"]] و [[currentPeriodEnd]] بعد ١٤ يوم. بعد التغيير لسنوي من الـ Portal: نفس الصف بـ [[priceId]] الجديد، و Stripe عامل proration في الفاتورة الجاية. بعد الإلغاء من الـ Portal (الافتراضي في آخر الفترة): [[cancelAtPeriodEnd: true]] والحالة لسه trialing أو active، وبعد ما الفترة تخلص بييجي [[customer.subscription.deleted]] والحالة [[canceled]].

[[stripe trigger invoice.payment_failed]] بيعمل عميل واشتراك تجريبيين من عنده، فهتلاقي إيميل payment-failed في الـ queue. وممكن الـ upsert يرمي لأن [[metadata.tenantId]] فاضي في الاشتراك التجريبي: ده متوقع، واتعامل معاه (تجاهل الاشتراكات من غير tenant، وسجّلها في اللوج).

لو كل الـ webhooks بترجع 400: غالبًا [[express.json()]] اشتغل قبل [[express.raw]]، أو بتستخدم secret الـ dashboard بدل اللي [[stripe listen]] طبعه ([[whsec_...]]).`
        }
      ]
    }
]);
