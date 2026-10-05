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
    const sub = event.data.object;
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

الـ webhook: [[express.raw]] لازم لأن التوقيع محسوب على الـ body زي ما وصل حرف بحرف، ولازم يتسجّل قبل [[express.json()]] العام أو يبقى route لوحده. و [[constructEvent]] بترمي لو التوقيع غلط أو قديم (أكتر من ٥ دقايق افتراضيًا)، فبنرجّع 400. وبنستخدم أحداث [[customer.subscription.*]] (created و updated و deleted) عشان نعكس الحالة كلها بـ upsert، فالترتيب والتكرار ميبوظوش حاجة. وللدقة الأعلى، ممكن تتجاهل الـ object اللي في الحدث وتجيب الاشتراك من Stripe بـ [[subscriptions.retrieve]]، فتاخد آخر حالة دايمًا.

[[current_period_end]] بقى على مستوى الـ subscription item (أول عنصر في [[items.data]]) من API سنة 2025، مش على الاشتراك نفسه. لو بتقرا كود قديم أو tutorial قديم، دي أول حاجة هتلاقيها مختلفة.

الـ customer: اعمل Stripe customer لكل tenant مرة واحدة ([[stripe.customers.create]]) وخزن الـ id. ولو الاشتراك للشخص مش للـ workspace، يبقى لكل user.`,
            when: "منتج بخطط شهرية أو سنوية لعملاء برّه مصر أو شركة ليها كيان في دولة مدعومة. ولو السوق مصر بس، الاشتراكات بتتعمل بـ Paymob (فيه subscriptions) أو بفواتير شهرية بتتدفع كل مرة.",
            mistakes: R`تفتح الميزات من صفحة [[success_url]] بدل الـ webhook. أو [[express.json]] قبل الـ webhook فالتوقيع يفشل دايمًا. أو تقفل الميزات أول ما [[past_due]] تيجي والعميل لسه Stripe بيحاول. أو تنسى [[cancel_at_period_end]] فتقفل على واحد لسه دافع للشهر. أو تحط السعر من الواجهة بدل price id من config. أو تسيب الـ webhook من غير تسجيل الـ event id، فتتلخبط لو حصل مشكلة. وفي الانترفيو: «الـ webhook وصل قبل ما الـ redirect يرجع، أو العكس؟» الواجهة تعرض «جاري التفعيل» وتسأل السيرفر، نفس «صفحة ما بعد الدفع».`
          },
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
            "الاشتراك من الحدث.",
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
    },
    {
      t: "الملفات والـ realtime والإشعارات",
      l: 2,
      n: "الملفات مبتعدّيش على سيرفرك، والمستخدم يعرف اللي حصل لحظتها أو على إيميله أو موبايله",
      items: [
        {
          cmd: "signed upload URL",
          title: "رفع الملفات من غير ما تعدّي على سيرفرك",
          desc: R`الرفع على ٣ خطوات. الأول، الواجهة بتسأل السيرفر «عايز أرفع صورة نوعها كذا وحجمها كذا»، والسيرفر يتأكد من الصلاحية والنوع والحجم، ويرجّع رابط موقّع (presigned URL) عمره ٥ دقايق. التاني، المتصفح بيرفع الملف مباشرة على S3 أو R2 بـ PUT. التالت، الواجهة بتبلّغ السيرفر بالـ key، والسيرفر يربطه بالكورس.

الملف نفسه عمره ما بيعدّي على الـ API.`,
          example: R`import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: config.S3_REGION, requestChecksumCalculation: "WHEN_REQUIRED" });
const Upload = z.object({ type: z.enum(["image/jpeg", "image/png", "image/webp"]), size: z.number().int().max(5_000_000) });

router.post("/uploads/cover", requireAuth, requireRole("INSTRUCTOR", "ADMIN"), async (req, res) => {
  const { type } = Upload.parse(req.body);
  const key = $__btcovers/$__{req.user.id}/$__{crypto.randomUUID()}.$__{type.split("/")[1]}$__bt;
  const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket: config.S3_BUCKET, Key: key, ContentType: type }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
  res.json({ data: { url, key } });
});`,
          try: R`اطلب رابط، وارفع عليه صورة من المتصفح: [[fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } })]]. بعدين جرّب ترفع بنفس الرابط بعد ٦ دقايق (هيرفض)، وبـ Content-Type مختلف عن اللي اتوقّع (هيرفض برضه). وقبل كل ده لازم تظبط CORS على الـ bucket.`,
          flag: "script",
          deep: {
            why: "لو الملف بيعدّي على Express، كل رفع بياكل رام وCPU وباندويث من السيرفر اللي بيرد على كل الناس. فيديو ٥٠٠ ميجا ممكن يخلي السيرفر يقع، أو يوصل لحد Nginx ([[client_max_body_size]]) أو الـ timeout.",
            how: R`الرابط الموقّع جواه توقيع بمفاتيحك على حاجات محددة: الـ bucket، والـ key، والـ method، والـ Content-Type، ومدة الصلاحية. أي تغيير في أي واحدة منهم، التوقيع بيبقى غلط وS3 بترفض. يعني انت بتدّي إذن لملف واحد، في مكان واحد، لمدة ٥ دقايق. بس الـ SDK مبيوقّعش الـ Content-Type افتراضيًا، عشان كده بنضيف [[signableHeaders]] في المثال.

الـ key بيتعمل على السيرفر: فولدر المستخدم، واسم عشوائي، والامتداد من النوع المسموح. متستخدمش اسم الملف الأصلي، عشان متتعرضش لـ path traversal أو لملف يكتب فوق ملف تاني.

بس خلي بالك: الـ presigned PUT مبيقفلش الحجم. الـ [[size]] اللي الواجهة بتبعته مجرد كلام. عشان تفرض حد حقيقي، إما تستخدم presigned POST ([[createPresignedPost]] من [[@aws-sdk/s3-presigned-post]]) بشرط [[content-length-range]]، أو تعمل [[HeadObject]] في خطوة التأكيد وتمسح الملف لو كبير. وفي خطوة التأكيد كمان، اتأكد إن الـ key بيبدأ بـ [[covers/<userId>/]]، عشان محدش يربط ملف حد تاني.

والـ bucket يبقى private افتراضيًا. القراية تبقى بروابط GET موقّعة قصيرة، أو من CDN. والصور العامة بس (زي أغلفة الكورسات) ممكن تبقى public.

وفي Supabase Storage، نفس الفكرة: [[createSignedUploadUrl(path)]] على السيرفر، وبعدين [[uploadToSignedUrl(path, token, file)]] من الواجهة. والرابط صالح ساعتين. والفيديو قصة لوحده: استخدم خدمة فيديو (Bunny Stream، أو Cloudflare Stream، أو Mux)، بتحوّله HLS وبتحميه بتوكنات. والملفات الكبيرة جدًا بتترفع multipart أو resumable. والملفات اللي اترفعت ومحدش ربطها بحاجة، امسحها بـ lifecycle rule بعد يوم.`,
            when: "أي رفع أكبر من صورة بروفايل صغيرة، وأي منتج فيه فيديو أو PDF.",
            mistakes: R`في مشروع حقيقي، الرفع كان بـ multer و [[memoryStorage]]، وحد أقصى ١٠٠ ميجا للصور و ٥٠٠ للـ PDF. يعني الملف كله بيتحمّل في الرام، وكام رفع مع بعض كفاية يوقّعوا السيرفر. وفي مشروع تاني، route رفع الأدمن مكانش فيه قايمة أنواع مسموحة، والـ bucket كان public. ملف HTML أو SVG هناك ممكن يشغّل JavaScript على الدومين بتاعك. ومن الغلطات كمان: إنك تصدّق الـ Content-Type أو الامتداد اللي جاي من الـ client. أو تسيب bucket public فيه ملفات مدفوعة.`
          },
          lines: [
            "عميل S3 وأمر رفع ملف.",
            "دالة بتعمل رابط موقّع لأي أمر.",
            "العميل بيقرا المفاتيح من البيئة (أو IAM role على السيرفر)، و WHEN_REQUIRED عشان الـ SDK ميحطش checksum لملف فاضي جوه الرابط الموقّع.",
            "مسموح ٣ أنواع صور بس، ولحد ٥ ميجا.",
            "مسار طلب الرابط، للمدرّب والأدمن بس.",
            "اتأكد من النوع والحجم.",
            "الـ key: فولدر المستخدم، واسم عشوائي، وامتداد من النوع. مش اسم الملف الأصلي.",
            "رابط PUT موقّع للـ key ده وبالنوع ده بس، عمره ٥ دقايق.",
            "رجّع الرابط والـ key. الـ key هيتبعت تاني في خطوة التأكيد.",
            "قفلة."
          ],
          sol: R`الرابط اللي بيرجع شكله كده: [[https://BUCKET.s3.REGION.amazonaws.com/covers/USER/UUID.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...&X-Amz-Expires=300&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Signature=...]]. [[X-Amz-Expires=300]] هي الـ ٥ دقايق، و [[SignedHeaders=content-type;host]] معناها إن الـ Content-Type داخل في التوقيع. الرفع الصح بيرجع [[200]] وجسم فاضي.

بعد ٦ دقايق S3 بيرجع [[403]] و XML فيه [[AccessDenied]] و [[Request has expired]]. وبـ Content-Type مختلف (مثلًا image/png على رابط اتعمل لـ webp) بيرجع [[403 SignatureDoesNotMatch]]. ولو شفت في الـ Console [[blocked by CORS policy]] قبل ما الطلب يوصل أصلًا، يبقى CORS الـ bucket مش متظبط: لازم [[AllowedOrigins]] فيه origin الموقع، و [[AllowedMethods]] فيه PUT، و [[AllowedHeaders]] فيه content-type.

لو الرفع الصح نفسه رجع [[SignatureDoesNotMatch]]، اتأكد إنك باعت نفس الـ type بالظبط اللي طلبت بيه الرابط، ومن غير headers زيادة. و [[requestChecksumCalculation: "WHEN_REQUIRED"]] موجودة عشان النسخ الجديدة من SDK متضيفش checksum الـ متصفح مش بيبعته.`,
          solCode: R`// في الواجهة
const file = input.files[0];
const res = await apiFetch("/uploads/cover", { method: "POST", body: JSON.stringify({ type: file.type, size: file.size }) });
const { data: { url, key } } = await res.json();
const put = await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
console.log(put.status, key); // 200

// CORS على الـ bucket (S3 أو R2)
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://myapp.com"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["content-type"],
    "MaxAgeSeconds": 3000
  }
]`
        },
        {
          cmd: "معالجة الصور",
          title: "صورة ١٢ ميجا من الموبايل لازم تصغر قبل ما تتعرض",
          desc: R`الصورة اللي المدرّب بيرفعها من موبايله ممكن تبقى ٤٠٠٠ بكسل و ١٢ ميجا. بعد الرفع، job في الخلفية بيقراها، ويتأكد إنها صورة فعلًا، ويعمل منها مقاسين بصيغة WebP، ويعلّم على الكورس إن الغلاف جاهز. والصفحة بتعرض المقاس المناسب للشاشة.`,
          example: R`import sharp from "sharp";

export async function processCover({ key }) {
  const original = await storage.read(key);
  const meta = await sharp(original).metadata();
  if (!["jpeg", "png", "webp"].includes(meta.format)) throw new Error($__btnot an image: $__{key}$__bt);
  for (const width of [400, 1200]) {
    const out = await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    await storage.write(key.replace(/\.\w+$/, $__bt-$__{width}.webp$__bt), out, "image/webp");
  }
  await db.course.updateMany({ where: { coverKey: key }, data: { coverReady: true } });
}`,
          try: R`صوّر صورة بموبايلك بالطول، وشغّل الدالة عليها مرة بـ [[.rotate()]] ومرة من غيرها. قارن الاتنين، وقارن حجم الأصل بحجم نسخة الـ 400.`,
          flag: "script",
          deep: {
            why: "صورة ١٢ ميجا في صفحة الكورسات معناها تحميل بطيء على الموبايل، و LCP وحش، وباندويث بتدفع تمنها. وكمان الصورة من الموبايل ممكن يبقى فيها مكان التصوير (GPS) في الـ EXIF، وده بيكشف بيت المدرّب.",
            how: R`sharp مبني على libvips، وده سريع وموفّر في الرام. [[metadata()]] بيقرا الـ header بتاع الملف، وده بيكشف ملف عامل نفسه صورة بامتداد مزيف.

[[rotate()]] من غير أرقام بيلف الصورة حسب الـ EXIF، لأن الموبايل بيصوّر بالعرض ويكتب «لفّها» في الـ metadata. والناتج من sharp بيطلع من غير الـ metadata دي افتراضيًا، فالـ GPS بيروح. و [[withoutEnlargement]] بيمنع إنه يكبّر صورة صغيرة فتبوظ.

ومقاسين كفاية لأغلب الحالات: 400 للكروت، و 1200 لصفحة الكورس. والواجهة بتختار بـ [[srcset]] أو [[sizes]]، أو بتسيب next/image يعمل ده.

ده job مش جوه الـ request. المعالجة بتاخد ثانية أو اتنين وبتاكل CPU، والـ worker ممكن يشتغل على سيرفر لوحده. ولو فشل بيتعاد (درس «background jobs» في القسم الجاي). ولحد ما يخلص، الواجهة بتعرض placeholder بسبب [[coverReady: false]].

وsharp عنده حد افتراضي لعدد البكسلات ([[limitInputPixels]])، بيحميك من صورة صغيرة في الحجم لكنها لما تتفك تبقى مليارات البكسلات (decompression bomb).

وبديل الشغل ده كله: خدمة صور زي Cloudflare Images أو imgproxy، أو next/image على سيرفرك. التفاصيل في درس الـ CDN في المستوى التالت.`,
            when: "أي صور جاية من المستخدمين: أغلفة، وصور بروفايل، وإيصالات تحويل.",
            mistakes: "إنك تعرض الأصل زي ما هو. أو تعالج جوه الـ request فالرفع ياخد ١٠ ثواني. أو تنسى rotate فتطلع الصور مقلوبة. أو تسيب الـ EXIF بالـ GPS. أو تثق في الامتداد بدل ما تقرا الـ header."
          },
          lines: [
            "sharp: مكتبة الصور الأسرع في Node.",
            "job بياخد الـ key بتاع الملف اللي اترفع.",
            "اقرا الملف من الـ storage.",
            "اقرا الـ header بتاع الصورة الحقيقي.",
            "مش صورة فعلًا؟ ارمي error، والـ job يتسجّل فاشل.",
            "لكل مقاس من الاتنين...",
            "...لف حسب الـ EXIF، وصغّر من غير تكبير، وحوّل WebP بجودة 80.",
            "...واحفظه جنب الأصل باسم فيه المقاس.",
            "قفلة الـ loop.",
            "علّم إن الغلاف جاهز، عشان الواجهة تعرضه بدل الـ placeholder.",
            "قفلة."
          ],
          sol: R`صورة الموبايل بالطول غالبًا متخزنة بالعرض وجواها EXIF بيقول «لفّها 90 درجة» ([[orientation: 6]]). جربناها على صورة 4000×3000 عليها orientation 6: مع [[.rotate()]] نسخة الـ 400 طلعت [[400 x 533]] (بالطول، صح)، ومن غيرها طلعت [[400 x 300]] (نايمة على جنبها). ده لأن [[.rotate()]] من غير رقم بيلف حسب الـ EXIF، والـ webp الناتج مفيهوش EXIF أصلًا، فمفيش حد تاني هيلفها.

الحجم: الأصل من موبايل حديث بيبقى من ٣ لـ ١٢ ميجا، ونسخة الـ 400 webp بـ quality 80 بتبقى عشرات الكيلو بس (الرقم بيختلف حسب الصورة). يعني تقريبًا ١٠٠ مرة أصغر، وده الفرق بين صفحة كورسات بتحمّل في ثانية وصفحة بتحمّل في ٣٠.

لو النسختين طلعوا نفس الاتجاه، يبقى صورتك مفيهاش EXIF orientation (بعض التطبيقات بتلف البيكسلات نفسها قبل ما تحفظ). جرب صورة طالعة من الكاميرا مباشرة، أو اعمل واحدة بالسكربت اللي تحت.`,
          solCode: R`import sharp from "sharp";

// لو معندكش صورة فيها EXIF، اعمل واحدة: بيكسلات بالعرض و orientation 6
const photo = await sharp({ create: { width: 4000, height: 3000, channels: 3, background: "#4a7" } })
  .jpeg().withMetadata({ orientation: 6 }).toBuffer();

const m = await sharp(photo).metadata();
console.log("original", m.width, "x", m.height, "orientation", m.orientation, photo.length, "bytes");

for (const rotate of [true, false]) {
  let p = sharp(photo);
  if (rotate) p = p.rotate();
  const out = await p.resize({ width: 400, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  const o = await sharp(out).metadata();
  console.log(rotate ? "with rotate" : "no rotate", o.width, "x", o.height, out.length, "bytes");
}
// with rotate 400 x 533
// no rotate 400 x 300`
        },
        {
          cmd: "socket.io",
          title: "إشعار يوصل للمستخدم لحظة ما يحصل",
          desc: R`socket.io بيفتح اتصال دايم بين المتصفح والسيرفر، فالسيرفر يقدر يبعت من غير ما حد يسأله. الاتصال بيتأكد من التوكن أول ما يتفتح، وكل مستخدم بيدخل room باسمه، وأي service عايزة تبلّغه بتنادي [[notify(userId, ...)]].

في الواجهة: [[const socket = io(API_URL, { auth: { token } })]]، وبعدها [[socket.on("notification", show)]].`,
          example: R`import { Server } from "socket.io";

export const io = new Server(httpServer, { cors: { origin: config.WEB_ORIGIN, credentials: true } });
io.use((socket, next) => {
  try {
    const payload = jwt.verify(socket.handshake.auth.token, config.JWT_SECRET);
    socket.data.userId = payload.sub;
    next();
  } catch {
    next(new Error("UNAUTHENTICATED"));
  }
});
io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt));
export async function notify(userId, n) {
  const saved = await db.notification.create({ data: { userId, type: n.type, payload: n.payload } });
  io.to($__btuser:$__{userId}$__bt).emit("notification", saved);
}`,
          try: R`افتح الموقع في تابين بنفس المستخدم، وتاب تالت بمستخدم تاني. نادي [[notify]] للأول من endpoint تجربة. التابين بتوعه يوصلهم، والتالت لأ. بعدين جرّب تتصل بتوكن غلط من الـ Console، ولازم يرفض.`,
          flag: "script",
          deep: {
            why: "من غيره، الواجهة بتسأل كل شوية «فيه جديد؟» (polling)، وده آلاف الطلبات من غير فايدة، والإشعار بيتأخر لحد السؤال الجاي. الاتصال الدايم بيخلي السيرفر يبعت أول ما الحاجة تحصل.",
            how: R`[[io.use]] بيشتغل مرة واحدة لكل اتصال، قبل ما يتفتح. التوكن بيتبعت في [[auth]] مش في الـ query string، لأن الـ query بيتسجّل في لوجات Nginx. ولو التحقق فشل، الاتصال مبيتفتحش خالص. والـ [[userId]] جاي من التوكن اللي السيرفر اتحقق منه، مش من كلام الـ client.

الـ room باسم المستخدم بتخلي [[io.to("user:ID")]] توصل لكل أجهزته وتاباته مع بعض. وفي شات أو كورس، بتعمل rooms للمحادثة أو الكورس، بس لازم تتأكد من العضوية قبل ما تعمل join.

الإشعار بيتحفظ في القاعدة الأول، وبعدين يتبعت. لو المستخدم مش متصل، هيشوفه لما يفتح ([[GET /me/notifications]]). يعني الـ socket للسرعة بس، مش المصدر.

والتوكن بيخلص بعد ربع ساعة، بس الاتصال اللي اتفتح بيفضل مفتوح. لو ده مهم (زي logout)، اقفل الاتصالات بنفسك: [[io.in("user:ID").disconnectSockets()]].

ولو عندك أكتر من سيرفر، المستخدم ممكن يكون متصل بسيرفر والـ notify بيحصل على سيرفر تاني. الحل Redis adapter، ومعاه sticky sessions في الـ load balancer. ده في درس الـ scaling. والـ WebSocket ورا Nginx محتاج headers الـ Upgrade (تاب «Nginx»).

وفيه بدايل. SSE أبسط لو الكلام في اتجاه واحد (من السيرفر للمتصفح بس)، وشغال على HTTP عادي. و Supabase Realtime لو شغال على Supabase. أو خدمة مدفوعة زي Pusher أو Ably لو مش عايز تشغّل حاجة بنفسك.`,
            when: "إشعارات، وشات، وحالة طلب بتتغير، ولوحة أدمن بتتحدث لوحدها. ولو التحديث كل دقيقة كفاية، الـ polling أبسط.",
            mistakes: R`في مشروع حقيقي، سيرفر الـ socket مكانش فيه أي تحقق. الـ client بيبعت [[join]] بالـ userId بتاعه هو، و [[send-message]] ومعاها senderId و senderName. يعني أي حد يقدر يسمع إشعارات أي حد، ويبعت رسايل باسمه. وكمان محتوى الرسايل كان بيتطبع في اللوج. ومن الغلطات كمان: إنك تبعت قبل ما القاعدة تحفظ، فلو الـ transaction فشلت المستخدم يشوف إشعار لحاجة محصلتش.`
          },
          lines: [
            "سيرفر socket.io.",
            "ركّبه على نفس سيرفر HTTP، و CORS للواجهة بس.",
            "middleware بيشتغل قبل ما أي اتصال يتفتح.",
            "جرّب...",
            "...تتحقق من التوكن اللي في auth.",
            "خزّن id المستخدم على الاتصال. ده من التوكن، مش من كلام الـ client.",
            "اسمح بالاتصال.",
            "لو التحقق فشل...",
            "...ارفض الاتصال.",
            "قفلة.",
            "قفلة.",
            "كل اتصال جديد يدخل room المستخدم بتاعه.",
            "دالة بتناديها أي service.",
            "احفظ الإشعار الأول، عشان لو مش متصل يلاقيه بعدين.",
            "ابعته لكل أجهزة المستخدم المتصلة.",
            "قفلة."
          ],
          sol: R`التابين بتوع المستخدم الأول يوصلهم نفس الـ event في نفس اللحظة، بالشكل [[{"id":...,"userId":"u1","type":"order.paid","payload":{...}}]]، والتاب التالت مبيوصلوش حاجة. ده لأن كل socket بيدخل room اسمها [[user:ID]]، و [[io.to(room)]] بيبعت لكل الـ sockets اللي في الـ room، مهما كانوا كام تاب أو جهاز.

الاتصال بتوكن غلط بيطلّع [[connect_error]] ورسالته [[UNAUTHENTICATED]]، ومفيش [[connect]] خالص. وخلي بالك إن socket.io client بيحاول يتصل تاني لوحده بعد الـ connect_error في حالات كتير، فلو التوكن انتهى، حدّث [[socket.auth.token]] قبل [[socket.connect()]].

لو التالت وصله الإشعار، يبقى انت عامل [[io.emit]] بدل [[io.to(...)]]. ولو ولا تاب وصله، اتأكد إن الـ userId اللي بتبعته لـ notify هو نفس الـ [[sub]] اللي في التوكن (string مش number).`,
          solCode: R`// في Console تاب مفتوح (أو ملف client.mjs مع socket.io-client)
import { io } from "socket.io-client";

const good = io("http://localhost:4000", { auth: { token: ACCESS_TOKEN } });
good.on("connect", () => console.log("connected", good.id));
good.on("notification", (n) => console.log("got", n));

const bad = io("http://localhost:4000", { auth: { token: "abc.def.ghi" }, reconnection: false });
bad.on("connect_error", (e) => console.log("rejected:", e.message)); // rejected: UNAUTHENTICATED

// endpoint تجربة في السيرفر
router.post("/dev/notify/:userId", async (req, res) => {
  await notify(req.params.userId, { type: "test", payload: { at: Date.now() } });
  res.status(204).end();
});`
        },
        {
          cmd: "transactional email",
          title: "إيميلات النظام: تأكيد، واستعادة باسورد، وإيصال",
          desc: R`الإيميلات اللي النظام بيبعتها لوحده (استعادة باسورد، وإيصال دفع، وترحيب) بتتبعت من worker مش من الـ request. الـ route بيحط job في queue ويرد، والـ worker بيبعت عن طريق مزوّد زي Resend. ولو فشل، الـ queue بتعيده، بشرط تحدد [[attempts]] (ومعاه [[backoff]] عشان الإعادة تستنى شوية)، لأن الافتراضي في BullMQ محاولة واحدة من غير إعادة. حطهم مرة واحدة في [[defaultJobOptions]] على الـ Queue: [[new Queue("emails", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } })]]، عشان كل الإيميلات (زي reset) تتعاد.`,
          example: R`import { Resend } from "resend";
import { Worker } from "bullmq";

const resend = new Resend(config.RESEND_API_KEY);
const templates = { reset: resetEmail, receipt: receiptEmail, welcome: welcomeEmail };

new Worker("emails", async (job) => {
  const { subject, html } = templates[job.name](job.data);
  const { error } = await resend.emails.send(
    { from: "myapp <no-reply@example.com>", to: job.data.to, subject, html },
    { idempotencyKey: $__bt$__{job.name}/$__{job.id}$__bt },
  );
  if (error) throw new Error(error.message);
}, { connection });`,
          try: R`خلي مفتاح Resend غلط عن قصد، واطلب استعادة باسورد. الـ API لازم يرد عادي، والـ job يفشل ويتعاد أكتر من مرة (شوفه في Bull Board أو في اللوج). رجّع المفتاح الصح، والـ job يعدّي في المحاولة الجاية.`,
          flag: "script",
          deep: {
            why: "مزوّد الإيميل ممكن يبطأ أو يقع. لو الإرسال جوه الـ request، التسجيل كله يبقى بطيء، أو يفشل عشان الإيميل. ولو من غير retry، الإيميل اللي فشل بيروح خالص، والطالب مستني لينك مش هييجي.",
            how: R`الـ worker بيستلم الـ job باسمه ([[reset]] أو [[receipt]]) والداتا بتاعته، ويختار القالب. القالب دالة بترجّع subject و html بلغة المستخدم. خزّن [[locale]] للمستخدم في القاعدة عشان كده، وخلي الإيميل العربي فيه [[dir="rtl"]].

[[idempotencyKey]] بيتبعت كـ argument تاني. لو الإرسال نجح بس الرد اتأخر، والـ job اتعاد، Resend بتعرف إنه نفس الإيميل ومبتبعتوش تاني. والمفتاح ده صالح ٢٤ ساعة عندهم. والـ [[throw]] لو فيه error هو اللي بيخلي BullMQ يعيد.

و [[connection]] جاي من [[lib/redis.ts]]: [[new IORedis(config.REDIS_URL, { maxRetriesPerRequest: null })]]، والـ worker محتاج الإعداد ده.

وعشان الإيميل يوصل للـ inbox مش الـ spam، لازم تأكد الدومين عند المزوّد، وتضيف في الـ DNS سجلات SPF و DKIM اللي بيدّيهالك، وسجل DMARC. وابعت من subdomain زي [[mail.example.com]]، عشان سمعة الإرسال متأثرش على الدومين الأساسي. والإيميلات التسويقية تروح من stream أو subdomain تاني غير إيميلات النظام، عشان الـ spam في التسويق ميوقّعش إيصالات الدفع.

وفي staging، الإيميلات تروح sandbox أو قايمة إيميلات بتاعة الفريق بس. والقوالب ممكن تتكتب بـ React Email أو MJML.`,
            when: "أي إيميل بيطلع نتيجة لفعل المستخدم. والإيميلات التسويقية (newsletter) ليها أداة لوحدها وقواعد إلغاء اشتراك.",
            mistakes: R`إنك تبعت من جوه الـ request. أو تبعت من Gmail شخصي. أو تنسى SPF و DKIM فكل حاجة تروح spam. أو تعيد الإرسال من غير idempotency فالطالب يوصله ٣ إيصالات. وفي مشروع حقيقي، لو مفتاح الإيميل مش موجود، الكود كان بيطبع الإيميل كله في اللوج بدل ما يقع. ده مريح في التطوير، بس في الإنتاج معناه إن لينكات الاستعادة والـ OTP بتتكتب في اللوجات. الصح إن [[config.ts]] يرفض يقوم من غير المفتاح في الإنتاج.`
          },
          lines: [
            "SDK بتاع Resend.",
            "الـ Worker بتاع BullMQ.",
            "العميل بالمفتاح من الـ config.",
            "قالب لكل نوع إيميل. كل قالب دالة بترجّع subject و html.",
            "worker بيسمع على queue الإيميلات.",
            "اختار القالب باسم الـ job، واملاه بالداتا.",
            "ابعت...",
            "...من دومينك المتأكد، للمستخدم، بالقالب.",
            "...ومفتاح idempotency، عشان الإعادة متبعتش مرتين.",
            "قفلة الإرسال.",
            "فشل؟ ارمي error، و BullMQ هيعيد بعدين.",
            "اتصال Redis من lib/redis.ts."
          ],
          sol: R`بالمفتاح الغلط، [[POST /auth/forgot]] بيرجع 200 في ملّي ثواني عادي (جربناها: الـ API رد في حوالي 20ms)، لأنه بيحط job بس. في اللوج هتلاقي الـ job فشل: [[failed attempt 1 of 5]]، وبعدين 2، وهكذا، والوقت بينهم بيزيد (10 ثواني، 20، 40...). رسالة الخطأ هي رسالة Resend عن المفتاح (حاجة زي [[API key is invalid]])، لأن [[resend.emails.send]] مبترميش، بترجّع [[{ data: null, error }]]، وسطر [[if (error) throw]] هو اللي بيحوّلها فشل.

لو رجّعت المفتاح الصح قبل ما المحاولات تخلص، المحاولة الجاية تعدّي والإيميل يوصل مرة واحدة بس، لأن الـ [[idempotencyKey]] ثابت لنفس الـ job. ولو المحاولات خلصت، الـ job بيقعد في الـ failed، وتقدر تعيده من Bull Board.

لو الـ job فشل مرة واحدة ومتعادش، يبقى مفيش [[attempts]] (الافتراضي في BullMQ محاولة واحدة). ولو الـ API نفسه رجع 500، يبقى بتبعت الإيميل جوه الـ request. وفي BullMQ الجديد مكتبة ioredis بقت optional، فلو ظهرلك [[could not load the optional 'ioredis' package]]، سطّبها ([[npm i ioredis]]) واعمل [[connection]] من [[new IORedis(url, { maxRetriesPerRequest: null })]].`
        },
        {
          cmd: "web push",
          title: "إشعار على الموبايل والموقع مقفول",
          desc: R`الـ Web Push بيوصل إشعار للمستخدم حتى لو الموقع مقفول، طول ما المتصفح بيدعمه. المتصفح بيعمل subscription (عنوان وشوية مفاتيح) ويبعته للسيرفر يخزنه. ولما يحصل حاجة، السيرفر بيبعت على العنوان ده بمكتبة [[web-push]] ومفاتيح VAPID بتاعتك.

والـ subscription اللي بترجع 404 أو 410 معناها إن المستخدم لغى الإذن، أو مسح الموقع، وبتتمسح.`,
          example: R`import webpush from "web-push";

webpush.setVapidDetails("mailto:you@example.com", config.VAPID_PUBLIC_KEY, config.VAPID_PRIVATE_KEY);
router.post("/me/push-subscriptions", requireAuth, async (req, res) => {
  const sub = PushSub.parse(req.body);
  await db.pushSubscription.upsert({ where: { endpoint: sub.endpoint }, create: { userId: req.user.id, ...sub }, update: { userId: req.user.id } });
  res.status(204).end();
});
export async function pushTo(userId, payload) {
  for (const s of await db.pushSubscription.findMany({ where: { userId } })) {
    await webpush.sendNotification({ endpoint: s.endpoint, keys: s.keys }, JSON.stringify(payload))
      .catch((e) => [404, 410].includes(e.statusCode) && db.pushSubscription.delete({ where: { id: s.id } }));
  }
}`,
          try: R`اعمل مفاتيح بـ [[npx web-push generate-vapid-keys]]. في الواجهة سجّل service worker، واطلب الإذن من زرار، وابعت الـ subscription. نادي [[pushTo]] واقفل التاب، والإشعار لازم يوصل. بعدين الغي الإذن من إعدادات الموقع ونادي تاني، ولاحظ إن الصف اتمسح.`,
          flag: "script",
          deep: {
            why: "الإيميل بيتقري متأخر، والـ socket محتاج الموقع مفتوح. الـ push بيوصل على شاشة الموبايل: «الدرس الجديد نزل»، أو «الحصة كمان ساعة». وده بيفرق في رجوع المستخدمين.",
            how: R`مفاتيح VAPID بتتعمل مرة واحدة. الـ public key بيروح للواجهة، والـ private بيفضل على السيرفر. وفي الواجهة: [[registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })]] بيرجّع subscription، فيها endpoint (عنوان عند Google أو Mozilla أو Apple) ومفتاحين [[p256dh]] و [[auth]].

المكتبة بتشفّر الـ payload بالمفاتيح دي، وبتبعته للـ endpoint، وخدمة المتصفح هي اللي بتوصّله للجهاز. والـ service worker بيستقبله في event اسمه [[push]] ويعرضه بـ [[showNotification]]. والـ payload صغير (حوالي ٤ كيلو)، فابعت عنوان ورابط، مش الداتا كلها.

الإذن اطلبه من زرار واضح بعد ما المستخدم يفهم هيستفيد إيه. متطلبوش أول ما الصفحة تفتح، لأن لو رفض مش هتقدر تسأله تاني. وعلى iOS، الـ web push بيشتغل بس لو الموقع متضاف على الشاشة الرئيسية كـ PWA. وخلي في جدول تفضيلات: المستخدم يختار أنواع الإشعارات اللي عايزها.

وفي تطبيق موبايل حقيقي (Capacitor مثلًا)، الإشعارات بتبقى عن طريق FCM و APNs. نفس الفكرة: token للجهاز بيتخزن، وبيتمسح لما يرجع «مش متسجّل». التفاصيل في تاب «Desktop و Mobile».`,
            when: "تذكيرات بمواعيد، وتحديثات مهمة. ومش لكل حاجة، لأن الإزعاج بيخلي المستخدم يقفل الإذن خالص.",
            mistakes: R`إنك تطلب الإذن أول ما الصفحة تفتح. أو متمسحش الـ subscriptions الميتة، فالإرسال يبطأ مع الوقت. أو تحط بيانات حساسة في نص الإشعار، وهو بيظهر على شاشة القفل. ودي حاجة كانت معمولة صح في مشروعين حقيقيين: واحد بيمسح الـ subscriptions اللي بترجع 404 و 410، والتاني بيمسح توكنات FCM اللي بترجع «not registered».`
          },
          lines: [
            "مكتبة web-push.",
            "مفاتيح VAPID بتاعتك، وإيميل تواصل لخدمات الـ push.",
            "مسار تسجيل subscription للمستخدم الداخل.",
            "اتأكد من الشكل: endpoint ومفتاحين.",
            "خزّنها، ولو الـ endpoint موجود حدّث صاحبه (جهاز مشترك).",
            "رد 204.",
            "قفلة.",
            "ابعت لكل أجهزة المستخدم.",
            "لكل subscription عنده...",
            "...ابعت الـ payload متشفّر...",
            "...ولو رجع 404 أو 410، الـ subscription ماتت، امسحها.",
            "قفلة الـ loop.",
            "قفلة."
          ],
          sol: R`[[npx web-push generate-vapid-keys]] بيطبع [[Public Key:]] (حوالي 87 حرف base64url بيبدأ غالبًا بـ B) و [[Private Key:]] (43 حرف). العام بيروح للواجهة، والخاص في .env السيرفر بس.

بعد الإذن، الـ subscription اللي بتتبعت شكلها [[{"endpoint":"https://fcm.googleapis.com/fcm/send/...","expirationTime":null,"keys":{"p256dh":"...","auth":"..."}}]] (في Firefox الـ endpoint على mozilla.com). [[pushTo]] وانت قافل التاب لازم يطلّع إشعار من النظام، لأن الـ service worker بيصحى لوحده. ولو المتصفح نفسه مقفول خالص، الإشعار بيوصل أول ما يفتح (على الموبايل بيوصل عادي).

بعد ما تلغي الإذن، خدمة الـ push بترجع [[410 Gone]] (أو 404) للـ endpoint ده، والـ catch بيمسح الصف. ممكن تاخد شوية وقت قبل ما الخدمة تعرف. ولو مفيش إشعار خالص: اتأكد إن الـ SW عنده [[push]] listener بيعمل [[showNotification]] جوه [[event.waitUntil]]، وإن الصفحة على HTTPS أو localhost، وإن إشعارات النظام نفسها مش مقفولة للمتصفح.`,
          solCode: R`// public/sw.js
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title ?? "myapp", { body: data.body, data: { url: data.url ?? "/" } }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// زرار «فعّل الإشعارات» في الواجهة
async function enablePush() {
  const reg = await navigator.serviceWorker.register("/sw.js");
  if ((await Notification.requestPermission()) !== "granted") return;
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY });
  await apiFetch("/me/push-subscriptions", { method: "POST", body: JSON.stringify(sub) });
}

// السيرفر
const PushSub = z.object({
  endpoint: z.url(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});
// await pushTo(userId, { title: "كورس جديد", body: "SQL من الصفر", url: "/courses/sql" });`
        }
      ]
    }
]);
