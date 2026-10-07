// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
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
          teach: R`## دالة بترجّع middleware

[[requireAuth]] بيجاوب «انت مين؟». [[requireRole]] بييجي بعده ويجاوب «دورك مسموحله بده؟». الاتنين في نفس السطر بتاع الـ route، فالحماية باينة وانت بتقرا الـ route.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، على نفس سيرفر درس [[requireAuth]] (بورت 5845)، بتوكن ADMIN ليوزر 1 وتوكن USER ليوزر 7.

---

## ١. [[export const requireRole = (...roles) => (req, res, next) => { ... }]]

السطر ده فيه سهمين، يعني دالة جوه دالة:

| الحتة | معناها |
|---|---|
| [[(...roles) =>]] | الدالة الخارجية. [[...roles]] (rest parameter) بيلم كل الـ arguments في array: [[requireRole("ADMIN", "MANAGER")]] تبقى [[roles = ["ADMIN", "MANAGER"]]] |
| [[(req, res, next) => { ... }]] | الدالة اللي بترجع: ده الـ middleware الحقيقي اللي Express هيناديه |

ليه كده؟ لأن Express بينادي الـ middleware بـ [[(req, res, next)]] بس، ومفيش مكان نديله فيه الأدوار. فبنعمل «مصنع»: [[requireRole("ADMIN")]] بتتنفذ مرة وانت بتعرّف الـ route، وترجّع middleware فاكر [[roles]] (ده اسمه closure).

---

## ٢. جوه الـ middleware

~~~javascript
if (!req.user) throw new AppError(401, "Login required");
if (!roles.includes(req.user.role)) throw new AppError(403, "Forbidden");
next();
~~~

- السطر الأول حماية لو حد نسي [[requireAuth]] قبله: [[req.user]] مش موجود، فـ 401. جرّبت route عليه [[requireRole("ADMIN")]] لوحده من غير توكن: [[{"error":"Login required"}]].
- [[roles.includes(x)]]: [[true]] لو [[x]] جوه الـ array. لو الدور مش فيها: **403**.
- [[next()]]: مسموح، كمّل.

### 401 ولا 403؟

| | معناها | الواجهة تعمل إيه |
|---|---|---|
| 401 Unauthorized | مش عارف انت مين (مفيش توكن أو بايظ) | توديه صفحة login |
| 403 Forbidden | عارفك، بس مش مسموحلك | تعرض «مش مسموح»، **من غير** logout |

---

## ٣. [[router.delete("/users/:id", requireAuth, requireRole("ADMIN"), users.remove)]]

Express بينفّذهم بالترتيب من الشمال لليمين: requireAuth، وبعدين requireRole، وبعدين الـ handler. جرّبت التلات حالات:

~~~bash
curl -i -X DELETE localhost:5845/api/users/5 -H "Authorization: Bearer $ADMIN"
curl -i -X DELETE localhost:5845/api/users/5 -H "Authorization: Bearer $USER_T"
curl -i -X DELETE localhost:5845/api/users/5
~~~

~~~text الناتج (السطر الأول والـ body من كل رد)
HTTP/1.1 200 OK            {"deleted":"5"}
HTTP/1.1 403 Forbidden     {"error":"Forbidden"}
HTTP/1.1 401 Unauthorized  {"error":"Login required"}
~~~

التالت وقف عند [[requireAuth]] ومَوصلش لـ [[requireRole]] أصلًا.

وتوكن اتعمل بـ [[role: "admin"]] (حروف صغيرة) أخد [[403]]: [[includes]] بيقارن بالظبط، و [["admin"]] غير [["ADMIN"]].

---

## ٤. الصلاحيات بدل الأدوار: [[can(perm)]]

~~~javascript
const PERMISSIONS = {
  ADMIN: ["tasks:read", "tasks:delete-any", "users:manage"],
  USER: ["tasks:read"],
};
~~~

object مفاتيحه الأدوار، وكل دور قدامه قايمة صلاحيات. الاسم [["users:manage"]] مجرد string، والـ [[:]] جواه اتفاق للتنظيم (الحاجة : العملية)، مش syntax.

~~~javascript
if (!PERMISSIONS[req.user?.role]?.includes(perm)) throw new AppError(403, "Forbidden");
~~~

نفكها من جوه لبرة:

1. [[req.user?.role]]: [[?.]] (optional chaining) معناها «لو [[req.user]] موجود هات [[role]]، ولو مش موجود رجّع [[undefined]] من غير ما تقع».
2. [[PERMISSIONS["USER"]]]: الأقواس المربعة بتجيب المفتاح باسم جوه متغير، فترجع قايمة صلاحيات الدور.
3. [[?.includes(perm)]]: لو الدور مش في الجدول (القايمة [[undefined]]) رجّع [[undefined]] بدل ما يقع.
4. [[!]] قدام الكل: لو النتيجة مش [[true]] (يعني [[false]] أو [[undefined]]) ارمي 403.

ركّبت [[can("users:manage")]] على route تاني بنفس الشكل، والنتيجة نفس الجدول بالظبط: 200 للأدمن، و 403 لليوزر، و 401 من غير توكن. الفرق إن إضافة دور جديد ليه [[users:manage]] بقت سطر في [[PERMISSIONS]] بدل ما تلف على كل route.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[requireRole(...roles)]] | مصنع بيرجّع middleware فاكر الأدوار المسموحة |
| [[!req.user]] | نسيت requireAuth؟ 401 |
| [[!roles.includes(role)]] | الدور مش مسموح: 403 |
| [[can(perm)]] + [[PERMISSIONS]] | نفس الفكرة بالصلاحية بدل الدور |
| الترتيب في الـ route | auth ثم role ثم handler |

> الدور في الـ JWT بيفضل زي ما هو لحد ما التوكن ينتهي. والصلاحية على **نوع** العملية بس، أما «الحاجة دي بتاعتك؟» فده درس [[ownership (IDOR)]].`,
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
          teach: R`## الفرق كله في كلمة واحدة جوه الـ [[where]]

المثال ٣ queries بـ Prisma: واحدة غلط (بتدوّر بالـ id بس)، واتنين صح (الـ id **و** صاحب المهمة في نفس الشرط). اللي بيخلي الصح صح إن السؤال للداتابيز نفسه بقى «هات المهمة دي **لو بتاعتي**».

اتشغّل على ويندوز 11 بـ Node 24.19 و Prisma 7.10 على Postgres 16 في Docker، وسيرفر Express على بورت 5845 عليه [[requireAuth]]. يوزرين: سارة (id 1) وعمر (id 2)، وعمر عنده مهمة رقم 2 اسمها [["omar's secret"]]. كل الطلبات بتوكن سارة. وشغّلت الـ client بـ [[log: ["query"]]] فكل query بتطبع الـ SQL بتاعها.

---

## ١. الغلط: [[prisma.task.findUnique({ where: { id } })]]

- [[prisma.task]]: جدول المهام. [[findUnique]]: هات صف واحد بحقل unique (هنا الـ id).
- [[{ id }]] اختصار [[{ id: id }]]، والـ id جاي من العنوان ([[Number(req.params.id)]]).

حطيته في route تجربة وطلبت مهمة عمر بتوكن سارة:

~~~text الناتج
HTTP/1.1 200 OK
{"id":2,"title":"omar's secret","done":false,"createdAt":"2026-10-07T07:59:19.630Z","userId":2}
~~~

~~~text الـ SQL
SELECT ... FROM "public"."Task" WHERE ("public"."Task"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
~~~

الشرط فيه الـ id بس ([[1=1]] ده Prisma بيحطه وملوش معنى). ده الـ IDOR: سارة قرت مهمة مش بتاعتها بتغيير رقم.

---

## ٢. الصح: [[findFirst({ where: { id, userId: req.user.id } })]]

- [[findFirst]]: هات أول صف يطابق أي شرط (مش لازم unique).
- [[userId: req.user.id]]: الـ id من التوكن (درس [[requireAuth]])، مش من الطلب.

~~~text الـ SQL
SELECT ... WHERE ("public"."Task"."id" = $1 AND "public"."Task"."userId" = $2) LIMIT $3 OFFSET $4
~~~

الشرطين بقوا في نفس الـ SQL، فالداتابيز رجّعت [[null]]. وجرّبت [[findUnique({ where: { id, userId: req.user.id } })]]: طلّع **نفس الـ SQL** بالظبط ورجّع [[null]]. يعني [[findUnique]] بيقبل حقول زيادة جنب الـ unique (ده من Prisma 5).

## ٣. [[if (!task) throw new AppError(404, "Task not found")]]

[[null]] معناها «مش موجودة» أو «مش بتاعتك»، والرد واحد في الحالتين: **404**. لو رجّعت 403 للتانية، المهاجم يعرف إن الرقم ده موجود.

---

## ٤. التعديل والمسح: [[deleteMany]] و [[count]]

~~~javascript
const { count } = await prisma.task.deleteMany({ where: { id, userId: req.user.id } });
if (count === 0) throw new AppError(404, "Task not found");
~~~

ليه [[deleteMany]] مش [[delete]]؟ [[delete]] و [[update]] بيرموا خطأ لو ملقوش الصف:

~~~text الناتج: prisma.task.update({ where: { id: 99999 }, ... })
P2025 An operation failed because it depends on one or more records that were required but not found. No record was found for an update.
~~~

إنما [[deleteMany]] و [[updateMany]] بيرجّعوا [[{ count }]] (عدد الصفوف اللي اتأثرت) ومبيرموش. والـ [[const { count } =]] بياخد الخانة دي من الـ object (destructuring).

~~~text الناتج
del other: { count: 0 }      DELETE ... WHERE ("id" = $1 AND "userId" = $2)
upd other: { count: 0 }      UPDATE ... SET "title" = $1 WHERE ("id" = $2 AND "userId" = $3)
del own:   { count: 1 }
~~~

مهمة عمر: [[count: 0]] فـ 404 ومحصلش حاجة. مهمة سارة نفسها: [[count: 1]] واتمسحت.

---

## ٥. التجربة من بره بـ curl

~~~bash
curl -i -X GET    localhost:5845/api/tasks/2 -H "Authorization: Bearer $SARA"
curl -i -X PATCH  localhost:5845/api/tasks/2 -H "Authorization: Bearer $SARA" -H "Content-Type: application/json" -d '{"title":"hacked"}'
curl -i -X DELETE localhost:5845/api/tasks/2 -H "Authorization: Bearer $SARA"
~~~

~~~text الناتج (التلاتة)
HTTP/1.1 404 Not Found
{"error":"Task not found"}
~~~

وبتوكن عمر نفس [[GET]] رجّع [[200]] والعنوان لسه [["omar's secret"]]: محصلوش تعديل.

---

## الخلاصة

| | الشرط | مهمة حد تاني |
|---|---|---|
| غلط | [[where: { id }]] | 200 والبيانات |
| قراية | [[findFirst]] بـ [[{ id, userId: req.user.id }]] | [[null]] ثم 404 |
| تعديل / مسح | [[updateMany]] / [[deleteMany]] بنفس الشرط | [[count: 0]] ثم 404 |

> أي id جاي من الطلب لازم يمشي ومعاه [[userId: req.user.id]] في نفس الـ [[where]]. والرد 404 مش 403.`,
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
          teach: R`## سطر واحد بيغيّر الـ headers في كل رد

[[app.use(helmet(...))]] middleware بيشتغل قبل أي route، وبيحط على الرد مجموعة headers بتقول للمتصفح يتصرف بحذر. الكود نفسه بسيط، فالشغل الحقيقي إنك تعرف تقرا الـ headers اللي طلعت.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و helmet 8.3، ٣ نسخ من نفس السيرفر فيها route [[/health]] بيرجّع [[{"ok":true}]]: من غير helmet، و [[helmet()]] الافتراضي، والإعداد اللي في المثال.

---

## ١. الكود

- [[import helmet from "helmet"]]: المكتبة.
- [[app.use(helmet({ ... }))]]: ركّبه **أول** middleware، عشان الـ headers تتحط على كل رد، حتى ردود الأخطاء.
- [[crossOriginResourcePolicy: { policy: "cross-origin" }]]: غيّر إعداد واحد بس من الافتراضي، والباقي زي ما هو.

---

## ٢. من غير helmet

~~~bash
curl -I localhost:5845/health
~~~

[[-I]] (حرف I كبير): ابعت طلب HEAD، يعني «هات الـ headers بس من غير body».

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 11
ETag: W/"b-Ai2R8hgEarLmHKwesT1qcY913ys"
Date: Wed, 07 Oct 2026 08:04:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
~~~

[[X-Powered-By: Express]] بيقول لأي حد إن السيرفر Express، معلومة ملهاش لازمة تديها لمهاجم.

---

## ٣. مع المثال

~~~text الناتج
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: cross-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: application/json; charset=utf-8
...
~~~

[[X-Powered-By]] اختفى، وظهر ١٢ header. ومع [[helmet()]] من غير options الفرق الوحيد كان [[Cross-Origin-Resource-Policy: same-origin]].

### نقرا المهمين

| الـ header | معناه |
|---|---|
| [[Content-Security-Policy]] (CSP) | الصفحة تحمّل منين. [[default-src 'self']] = من نفس الموقع بس، و [[script-src 'self']] = مفيش scripts من مواقع تانية ولا inline، و [[frame-ancestors 'self']] = محدش يحطك في iframe. مهم لصفحات HTML، وأقل أهمية لـ JSON |
| [[Strict-Transport-Security]] (HSTS) | [[max-age=31536000]] ثانية = سنة: المتصفح يفتح الموقع HTTPS بس السنة دي، و [[includeSubDomains]] للـ subdomains كمان. المتصفح بيتجاهله على http عادي |
| [[X-Content-Type-Options: nosniff]] | متخمّنش نوع الملف، التزم بـ [[Content-Type]] |
| [[X-Frame-Options: SAMEORIGIN]] | نسخة أقدم من [[frame-ancestors]]: iframe من نفس الموقع بس (ضد clickjacking) |
| [[Referrer-Policy: no-referrer]] | متبعتش العنوان اللي اليوزر جاي منه لما يدوس لينك لبره |
| [[Cross-Origin-Resource-Policy]] (CORP) | مواقع تانية تقدر تعرض مواردك (صور، ملفات) ولا لأ |
| [[Cross-Origin-Opener-Policy]] | نافذة مفتوحة من موقع تاني متقدرش توصل لنافذتك |
| [[X-XSS-Protection: 0]] | بيقفل فلتر XSS قديم في المتصفحات كان هو نفسه بيعمل ثغرات |

---

## ٤. ليه [[cross-origin]]؟

[[same-origin]] (الافتراضي) معناها: صفحة على origin تاني متعرضش صورة من الـ API ده. والـ origin = البروتوكول والدومين والبورت، فـ [[localhost:5173]] (الواجهة في التطوير) و [[localhost:3000]] (الـ API) origins مختلفة. لو الواجهة بتعرض صور مرفوعة من الـ API، المتصفح هيمنعها، فبتفتح الإعداد ده بس بدل ما تشيل helmet كله.

اللي بيحصل في المتصفح (الصورة مبتظهرش، و Chrome بيكتب [[ERR_BLOCKED_BY_RESPONSE]]) سلوك متصفح من الـ docs، و curl مبيطبقهوش. اللي اتجرّب هنا هو الـ header نفسه: [[same-origin]] في الافتراضي، و [[cross-origin]] مع الإعداد.

---

## ٥. من ويندوز

~~~powershell
curl.exe -I http://localhost:5847/health
(Invoke-WebRequest -Method Head http://localhost:5847/health).Headers['X-Frame-Options']
~~~

[[.Headers['اسم']]] بيجيب header واحد. طلع [[SAMEORIGIN]] في PowerShell 7، و [[Cross-Origin-Resource-Policy]] طلع [[cross-origin]] في 5.1 (مع [[-UseBasicParsing]]).

---

## الخلاصة

| | |
|---|---|
| [[app.use(helmet())]] أول middleware | ١٢ header أمان، ومن غير [[X-Powered-By]] |
| عدّل واحد بس | [[helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } })]] |
| اقفل واحد | [[helmet({ contentSecurityPolicy: false })]] |
| افحص | [[curl -I]] قبل وبعد |

> helmet بيغيّر headers بس. مبيحميش من SQL injection ولا XSS في الكود بتاعك.`,
          lines: [
            "helmet.",
            "ركّبه أول middleware.",
            "الافتراضي [[same-origin]] بيمنع مواقع تانية تعرض صور أو ملفات من الـ API. لو الواجهة على دومين تاني وبتعرض صور مرفوعة، خليه cross-origin.",
            "قفلة."
          ],
          sol: R`قبل helmet: headers قليلة و [[X-Powered-By: Express]]. بعده: [[X-Powered-By]] اختفى، وظهر [[Content-Security-Policy: default-src 'self';...]] و [[Strict-Transport-Security: max-age=31536000; includeSubDomains]] و [[X-Content-Type-Options: nosniff]] و [[X-Frame-Options: SAMEORIGIN]] و [[Referrer-Policy: no-referrer]] و [[Cross-Origin-Opener-Policy: same-origin]] و [[Cross-Origin-Resource-Policy: same-origin]] وغيرهم (١٢ header في helmet 8).

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
          teach: R`## الـ middleware بيرد على سؤال واحد: «الـ origin ده مسموح؟»

المتصفح بيبعت مع الطلب header اسمه [[Origin]] فيه الموقع اللي الصفحة جاية منه. [[cors()]] بيقارنه بالقايمة: لو موجود يحط في الرد [[Access-Control-Allow-Origin]] بنفس القيمة، ولو مش موجود ميحطوش، والمتصفح هو اللي يمنع الصفحة تقرا الرد.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و cors 2.8.6، سيرفر على بورت 5848 و [[CORS_ORIGINS]] = [[["https://app.example.com", "https://example.com"]]]. curl مش متصفح، فبنبعت [[Origin]] بإيدنا بـ [[-H]] ونقرا الـ headers اللي رجعت. اللي المتصفح بيعمله بيها (يمنع أو يسمح) من مواصفات CORS.

---

## ١. إعدادات [[cors({ ... })]]

| الإعداد | معناه |
|---|---|
| [[origin: config.CORS_ORIGINS]] | array: مطابقة كاملة مع واحد منهم. القيمة من غير [[/]] في الآخر |
| [[credentials: true]] | يضيف [[Access-Control-Allow-Credentials: true]]، فالمتصفح يسمح بكوكيز مع الطلب ويقرا الرد |
| [[methods: [...]]] | الـ methods اللي هتتقال في رد الـ preflight |
| [[maxAge: 600]] | المتصفح يحفظ رد الـ preflight ٦٠٠ ثانية (١٠ دقايق) |

---

## ٢. طلب من origin مسموح

~~~bash
curl -i localhost:5848/api/tasks -H "Origin: https://example.com"
~~~

~~~text الناتج
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Vary: Origin
Access-Control-Allow-Credentials: true
~~~

- [[Access-Control-Allow-Origin]] رجّع نفس الـ origin بالظبط (مش [[*]]، لأن [[credentials]] شغال).
- [[Vary: Origin]]: بيقول لأي cache في النص إن الرد بيختلف حسب [[Origin]]، فميدّيش رد موقع لموقع تاني.

## ٣. طلب من origin مش في القايمة

~~~bash
curl -i localhost:5848/api/tasks -H "Origin: https://example.com.evil.io"
~~~

~~~text الناتج
HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true

[{"id":1}]
~~~

مفيش [[Access-Control-Allow-Origin]]، فالمتصفح هيرفض يدّي الرد للصفحة. بس لاحظ: الرد **رجع** و السيرفر طبع [[GET from https://example.com.evil.io]] في اللوج. الطلب اتنفذ. CORS بيمنع القراية في المتصفح، مش التنفيذ على السيرفر. والـ array بيقارن بالظبط، فـ [[example.com.evil.io]] معدّاش (عكس [[origin.includes("example.com")]] اللي في قسم الأخطاء).

---

## ٤. الـ preflight: [[OPTIONS]]

قبل [[POST]] بـ JSON، المتصفح بيسأل الأول. ده الطلب اللي بيبعته، كتبته بإيدي:

~~~bash
curl -i -X OPTIONS localhost:5848/api/tasks -H "Origin: https://example.com" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type"
~~~

- [[Access-Control-Request-Method: POST]]: «عايز أبعت POST».
- [[Access-Control-Request-Headers: content-type]]: «ومعاه الـ header ده».

~~~text الناتج
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://example.com
Vary: Origin, Access-Control-Request-Headers
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PATCH,DELETE
Access-Control-Allow-Headers: content-type
Access-Control-Max-Age: 600
Content-Length: 0
~~~

- [[204]]: تمام ومفيش body. [[app.use(cors())]] رد على الـ OPTIONS لوحده من غير route.
- [[Allow-Methods]] من [[methods]]، و [[Max-Age: 600]] من [[maxAge]].
- [[Allow-Headers]]: من غير [[allowedHeaders]]، cors بيرجّع نفس الـ headers اللي اتطلبت. لما طلبت [[content-type,authorization]] رجّع [[content-type,authorization]].

ونفس الـ preflight من [[https://evil.io]] رجّع [[204]] بس **من غير** [[Access-Control-Allow-Origin]]، فالمتصفح مش هيبعت الـ POST الحقيقي خالص.

### ليه POST بـ JSON محتاج preflight و GET لأ؟

الطلبات «البسيطة» (GET، أو POST بـ [[Content-Type]] من نوع فورم عادي) بتتبعت على طول. أي [[Content-Type: application/json]]، أو header زي [[Authorization]]، أو PATCH و DELETE، بيعدّوا على preflight الأول.

---

## ٥. [[fetch(..., { credentials: "include" })]] في الواجهة

من غيره المتصفح مبيبعتش الكوكيز لـ origin تاني أصلًا. ومعاه لازم الرد يبقى فيه origin محدد (مش [[*]]) و [[Allow-Credentials: true]]، وده اللي شفناه في ٢.

---

## ٦. [[app.options("*", cors())]] في Express 5

شغّلت السيرفر بالسطر ده زيادة، ووقع وهو بيقوم:

~~~text الناتج
PathError [TypeError]: Missing parameter name at index 1: *; visit https://git.new/pathToRegexpError for info
~~~

Express 5 مبقاش بيقبل [[*]] لوحدها كـ path. ومش محتاجها أصلًا: [[app.use(cors())]] بيرد على الـ preflight.

---

## ٧. من ويندوز

~~~powershell
curl.exe -i http://localhost:5848/api/tasks -H "Origin: https://example.com"
(Invoke-WebRequest http://localhost:5848/api/tasks -Headers @{ Origin = "https://example.com" }).Headers['Access-Control-Allow-Origin']
~~~

نفس الـ headers، و [[Invoke-WebRequest]] رجّع [[https://example.com]] في PowerShell 7 و 5.1 (مع [[-UseBasicParsing]]).

---

## الخلاصة

| الطلب | الرد | المتصفح |
|---|---|---|
| origin في القايمة | [[Allow-Origin: <نفسه>]] + [[Allow-Credentials]] | يدّي الرد للصفحة |
| origin مش في القايمة | من غير [[Allow-Origin]] | الطلب اتنفذ، والصفحة متقراش الرد |
| preflight مسموح | [[204]] + methods + headers + [[Max-Age]] | يبعت الطلب الحقيقي |
| preflight مش مسموح | [[204]] من غير [[Allow-Origin]] | الطلب الحقيقي ميتبعتش |

> CORS بيحمي اليوزر من مواقع تانية بتستخدم متصفحه. curl والسيرفرات مبيطبقوهوش، فحماية الـ API نفسه هي الـ auth.`,
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
          teach: R`## اتنين limiters: واحد واسع للـ API كله، وواحد ضيق للـ login

كل limiter عداد لكل IP جوه نافذة وقت. الطلب بيزوّد العداد، ولو عدّى الحد الـ limiter بيرد 429 بنفسه ومبيوصّلش الطلب للـ route.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و express-rate-limit 8.7، بالكود ده بالظبط بس [[limit]] بتاع الـ login [[3]] بدل [[10]] (زي الـ try)، و route login بيرجّع 401 لأي باسورد غير [["ok"]]، و route [[/api/ip]] بيرجّع [[req.ip]]. نسختين: على بورت 5845 من غير [[trust proxy]]، وعلى 5846 بيه.

---

## ١. [[import { rateLimit } from "express-rate-limit"]]

الأقواس [[{ }]]: import بالاسم (named import). ده الشكل اللي المكتبة بتنصح بيه في النسخ الجديدة.

## ٢. [[app.set("trust proxy", 1)]]

[[req.ip]] بيتقري من الاتصال نفسه. ورا Nginx، الاتصال جاي من Nginx، والـ IP الحقيقي في header [[X-Forwarded-For]] اللي Nginx بيحطه. [[1]] = «صدّق hop واحد قدامي». تحت في ٦ هنشوف ده بيعمل إيه بالظبط.

---

## ٣. [[apiLimiter]]

~~~javascript
rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false })
~~~

| الإعداد | معناه |
|---|---|
| [[windowMs]] | النافذة بالملّي ثانية: ١٥ × ٦٠ × ١٠٠٠ = ١٥ دقيقة |
| [[limit: 300]] | ٣٠٠ طلب لكل IP في النافذة |
| [[standardHeaders: "draft-8"]] | ابعت headers [[RateLimit]] و [[RateLimit-Policy]] بالشكل الجديد |
| [[legacyHeaders: false]] | متبعتش [[X-RateLimit-*]] القديمة |

~~~bash
curl -i localhost:5845/api/ip
~~~

~~~text الناتج
HTTP/1.1 200 OK
RateLimit: "300-in-15min"; r=299; t=900
RateLimit-Policy: "300-in-15min"; q=300; w=900; pk=:YmIwY2Q1MTM2YWU1:
{"ip":"::1"}
~~~

- [["300-in-15min"]] اسم السياسة.
- [[r=299]] (remaining): فاضل ٢٩٩. و [[t=900]]: العداد يتصفّر بعد ٩٠٠ ثانية.
- [[q=300]] (quota) الحد، و [[w=900]] (window) النافذة بالثواني، و [[pk]] بصمة مختصرة للـ key (الـ IP) مش الـ IP نفسه.
- [[::1]] هو localhost بـ IPv6، و curl على ويندوز اتصل بيه.

---

## ٤. [[loginLimiter]]

| الإعداد | معناه |
|---|---|
| [[limit: 10]] (٣ في التجربة) | محاولات قليلة |
| [[skipSuccessfulRequests: true]] | الطلب اللي رده أقل من 400 ميتعدّش، فاليوزر اللي بيدخل صح عمره ما يقرّب من الحد |
| [[message: { ... }]] | الـ body بتاع رد الـ 429. object، فبيترد JSON |

ومفيهوش [[standardHeaders]]، فبياخد الافتراضي: الـ headers القديمة [[X-RateLimit-*]].

## ٥. [[app.use("/api", apiLimiter)]] و [[app.use("/api/auth/login", loginLimiter)]]

الاتنين قبل الـ routes. وطلب login بيعدّي على الاتنين، لأن [[/api/auth/login]] تحت [[/api]].

### ٥ محاولات غلط ورا بعض

~~~bash
curl -i -X POST localhost:5845/api/auth/login -H "Content-Type: application/json" -d '{"password":"bad"}'
~~~

~~~text الناتج (المهم من كل رد)
401  RateLimit: ...; r=298  X-RateLimit-Limit: 3  X-RateLimit-Remaining: 2  X-RateLimit-Reset: 1791361265
401  RateLimit: ...; r=297  X-RateLimit-Remaining: 1
401  RateLimit: ...; r=296  X-RateLimit-Remaining: 0
429  RateLimit: ...; r=295  X-RateLimit-Remaining: 0  Retry-After: 900  {"error":"Too many login attempts, try again later"}
429  RateLimit: ...; r=294  ...
~~~

- [[RateLimit: ...; r=]] بتاع الـ [[apiLimiter]] بينزل مع كل طلب (حتى الـ 429، لأنه اتعد قبلها).
- [[X-RateLimit-*]] بتاعة الـ [[loginLimiter]]: الحد ٣، والباقي بينزل لصفر. و [[X-RateLimit-Reset]] وقت التصفير بالثواني من ١٩٧٠.
- الرابعة: [[429 Too Many Requests]] و [[Retry-After: 900]] (استنى ٩٠٠ ثانية) والرسالة بتاعتنا.

وبعدها بعتّ الباسورد الصح: برضه [[429]]. [[skipSuccessfulRequests]] بيمنع العد، بس لو الحد اتملى الـ limiter بيرد قبل ما الـ route يشتغل.

---

## ٦. [[trust proxy]] و [[X-Forwarded-For]]

~~~bash
curl localhost:5845/api/ip -H "X-Forwarded-For: 1.2.3.4"
curl localhost:5846/api/ip -H "X-Forwarded-For: 1.2.3.4"
curl localhost:5846/api/ip -H "X-Forwarded-For: 5.6.7.8"
~~~

~~~text الناتج
{"ip":"::1"}
{"ip":"1.2.3.4"}
{"ip":"5.6.7.8"}
~~~

- من غير trust proxy (5845): [[req.ip]] الاتصال الحقيقي، والـ header اتجاهل. والمكتبة طبعت في اللوج (مرة واحدة لكل limiter، مع أول طلب فيه الـ header):

~~~text الناتج
ValidationError: The 'X-Forwarded-For' header is set but the Express 'trust proxy' setting is false (default). This could indicate a misconfiguration which would prevent express-rate-limit from accurately identifying users. ...
  code: 'ERR_ERL_UNEXPECTED_X_FORWARDED_FOR',
~~~

- مع [[trust proxy 1]] (5846) **ومن غير proxy حقيقي**: [[req.ip]] بقى أي حاجة كتبتها. كل طلب بـ IP جديد = عداد جديد = عمره ما ياخد 429.

يعني [[1]] صح بس لما فيه فعلًا proxy واحد قدامك بيكتب الـ header ده بنفسه. السيرفر المكشوف مباشرة يفضل [[false]].

---

## ٧. من ويندوز

~~~powershell
1..4 | ForEach-Object { curl.exe -s -o NUL -w "%{http_code}" -X POST http://localhost:5846/api/auth/login }
~~~

- [[1..4]] أرقام من ١ لـ ٤، و [[ForEach-Object { }]] بيشغّل اللي بين القوسين لكل واحد.
- [[-o NUL]] ارمي الـ body (NUL في ويندوز زي [[/dev/null]])، و [[-w "%{http_code}"]] اطبع الـ status بس.

~~~text الناتج
401
401
401
429
~~~

و [[Invoke-RestMethod]] على الـ 429 رمى خطأ، و [[$_.Exception.Response.Headers.RetryAfter.Delta.TotalSeconds]] طلع [[900]] (PowerShell 7).

---

## الخلاصة

| | |
|---|---|
| [[windowMs]] + [[limit]] | كام طلب في كام وقت لكل IP |
| [[standardHeaders: "draft-8"]] | [[RateLimit: "...; r=باقي; t=ثواني"]] |
| من غيره | [[X-RateLimit-Limit]] / [[-Remaining]] / [[-Reset]] |
| عدّى الحد | [[429]] + [[Retry-After]] + الـ [[message]] |
| [[skipSuccessfulRequests]] | الناجح ميتعدّش |
| [[trust proxy]] | لازم يطابق الحقيقة، وإلا [[X-Forwarded-For]] مزيف يلف على الحد |

> العداد هنا في ذاكرة الـ process: كل نسخة من السيرفر ليها عداد، و restart بيصفّره. لأكتر من نسخة: Redis (درس [[rate-limit-redis]]).`,
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
          sol: R`أول ٣ محاولات غلط بيرجّعوا 401 عادي، والرابعة [[429 Too Many Requests]] و [[{"error":"Too many login attempts, try again later"}]]. والـ headers: [[loginLimiter]] مفيهوش [[standardHeaders]]، فبيبعت الشكل الافتراضي القديم [[X-RateLimit-Limit: 3]] و [[X-RateLimit-Remaining: 0]] و [[X-RateLimit-Reset]] (وقت التصفير بالثواني من ١٩٧٠)، ومع الـ 429 [[Retry-After: 900]]. وفي نفس الرد [[RateLimit: "300-in-15min"; r=295; t=900]] و [[RateLimit-Policy]] بتوع [[apiLimiter]]، لأن login تحت [[/api]] فبيتعد في الاتنين. عايز الشكل الجديد للـ login كمان؟ زوّد [[standardHeaders: "draft-8", legacyHeaders: false]] فيه. ولأن [[skipSuccessfulRequests]] شغال، الـ login الصح مبيتعدّش (بس لو الحد اتملى، حتى الباسورد الصح بياخد 429 لحد ما النافذة تخلص).

[[X-Forwarded-For: 1.2.3.4]] من غير trust proxy: [[req.ip]] فاضل [[::1]] (أو [[127.0.0.1]] لو اتصلت بـ IPv4)، والمكتبة بتطبع تحذير [[ERR_ERL_UNEXPECTED_X_FORWARDED_FOR]] (مرة واحدة لكل limiter). ومع [[trust proxy]] بـ 1 ومن غير proxy حقيقي: [[req.ip]] بقى [[1.2.3.4]]، يعني أي حد يقدر يغيّر الـ IP بتاعه بـ header، ولو بعت IP مختلف كل مرة عمره ما هياخد 429.

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
          teach: R`## ٣ أمثلة صغيرة، كل واحد بيقفل نوع هجوم في مكانه

المثال مش route واحد، ده ٣ حتت: schema لبروفايل فيها حقل HTML بيتنضّف، وبحث بـ Prisma، و query في Mongo. كل حتة بتوري إن الحماية بتحصل في مكان محدد، مش بـ «نضّف كل حاجة».

اتشغّل على ويندوز 11 بـ Node 24.19 و zod 4.6 و isomorphic-dompurify 4.5 و Prisma 7.10 (Postgres 16 في Docker) و Mongoose 9.11 (Mongo 8 في Docker).

---

## ١. [[import DOMPurify from "isomorphic-dompurify"]]

DOMPurify مكتبة بتشيل من HTML أي حاجة ممكن تشغّل JavaScript وتسيب التنسيق. أصلها للمتصفح، و [[isomorphic-dompurify]] نسخة بتشتغل في Node كمان (بتجيب DOM وهمي من [[jsdom]]).

---

## ٢. [[profileSchema]]

~~~javascript
const profileSchema = z.object({
  name: z.string().trim().max(80),
  bioHtml: z.string().max(5000).transform((html) => DOMPurify.sanitize(html)),
});
~~~

- [[name]]: نص عادي. [[trim()]] بيشيل المسافات من الأول والآخر، و [[max(80)]] طول. مفيش تنضيف: React هيهرّبه وقت العرض.
- [[bioHtml]]: الحقل ده HTML فعلًا (جاي من rich text editor). [[.transform(fn)]] بيشغّل الدالة على القيمة بعد ما تعدّي الـ validation، واللي ترجّعه هو اللي [[parse]] بيرجّعه.

بعتّ:

~~~text المدخل
name:    "  Sara  "
bioHtml: <p>Hi <b>there</b></p><img src=x onerror=alert(1)><script>alert(2)</script><a href="javascript:alert(3)">x</a> a < b <3
~~~

~~~text الناتج
{
  name: 'Sara',
  bioHtml: '<p>Hi <b>there</b></p><img src="x"><a>x</a> a &lt; b &lt;3'
}
~~~

| الحتة | اللي حصل |
|---|---|
| [[  Sara  ]] | اتشالت المسافات |
| [[<p>]] و [[<b>]] | فضلوا: تنسيق مفيهوش خطر |
| [[onerror=alert(1)]] | اتشال، والصورة فضلت |
| [[<script>...</script>]] | اتشال كله |
| [[href="javascript:..."]] | اتشال، و [[<a>]] فضل من غير لينك |
| [[a < b <3]] | بقى [[&lt;]]: DOMPurify بيهرّب [[<]] اللي في النص |

السطر الأخير هو ليه متعدّيش DOMPurify على **كل** الحقول: نص عادي زي «a < b» هيتحفظ [[a &lt; b]]، وباسورد فيه [[<]] هيتغيّر. نضّف الحقول اللي هي HTML بس.

---

## ٣. البحث بـ Prisma

~~~javascript
const search = String(req.query.q ?? "");
const found = await prisma.task.findMany({ where: { userId: req.user.id, title: { contains: search } } });
~~~

- [[req.query.q ?? ""]]: لو مش مبعوت خد نص فاضي.
- [[String(...)]]: [[?q=a&q=b]] بيوصل array [[["a","b"]]]، و [[String]] بيحوّله [["a,b"]]. كده مضمون إنه نص.
- [[contains: search]]: العنوان فيه النص ده.

جرّبت [[q]] = [[x'; DROP TABLE "Task"; --]]:

~~~text الـ SQL
... WHERE ("public"."Task"."userId" = $1 AND "public"."Task"."title"::text LIKE ('%' || $2 || '%')) OFFSET $3
~~~

~~~text الناتج
0 1000
~~~

الـ [[$2]] parameter: النص اتبعت كقيمة منفصلة، فـ Postgres دوّر على عنوان فيه الكلام ده حرفيًا، ملقاش (٠)، والجدول لسه فيه ١٠٠٠ صف. مفيش تنضيف محتاج.

---

## ٤. Mongo: [[z.email().parse(req.body.email)]]

[[express.json()]] بيحوّل الـ body لـ object، فاليوزر يقدر يبعت object مكان النص:

~~~bash
curl -X POST localhost:5849/raw -H "Content-Type: application/json" -d '{"email": {"$ne": null}}'
~~~

route [[/raw]] بيعمل [[User.findOne({ email: req.body.email })]] على طول:

~~~text الناتج
{"_id":"6ac5fe0a347edc1a9d38fc80","email":"admin@test.local","name":"Admin","__v":0}
~~~

[[$ne]] = «not equal»، فالـ query بقت «أول يوزر الإيميل بتاعه مش null»، ورجّع الأدمن (أول واحد اتعمل) من غير ما نعرف إيميله. نفس الطلب من PowerShell 7 بـ [[Invoke-RestMethod -Method Post ... -Body '{"email": {"$ne": null}}']] رجّع [[admin@test.local]].

route [[/safe]] بيعمل [[z.email().parse]] الأول:

~~~text الناتج
HTTP/1.1 400 Bad Request
{"error":"Invalid input","issues":{},"formErrors":["Invalid input: expected string, received object"]}
~~~

[[z.email()]] في zod 4 = نص وشكله إيميل. الـ object اترفض قبل ما يوصل للـ query، وإيميل حقيقي ([["sara@test.local"]]) رجّع سارة عادي. (الخطأ طلع في [[formErrors]] مش [[issues]] لأن الـ schema على القيمة نفسها مش على حقل جوه object.)

### [[sanitizeFilter]]

جرّبت الحل التاني: [[mongoose.set("sanitizeFilter", true)]] ونفس الـ query الخام:

~~~text الناتج
CastError: Cast to string failed for value "{ '$ne': null }" (type Object) at path "email" for model "User"
~~~

Mongoose لف الـ object في [[$eq]] (يعني «يساوي الـ object ده بالظبط»)، ولأن [[email]] في الـ schema [[String]] رمى [[CastError]]. يعني الـ query اترفضت، بس كـ 500 لو مش ماسكه. الـ validation بـ zod أوضح لأنها بترجّع 400.

---

## الخلاصة

| الخطر | بيتقفل فين | في المثال |
|---|---|---|
| XSS من HTML اليوزر | تنضيف الحقل اللي هو HTML بس | [[transform(DOMPurify.sanitize)]] |
| XSS من نص عادي | وقت العرض (React بيهرّب) | [[name]] من غير تنضيف |
| SQL injection | parameters | Prisma: [[$2]] |
| NoSQL injection | validation إن القيمة string | [[z.email().parse]] |

> اتحقق وانت داخل، وهرّب وانت خارج، ونضّف الـ HTML بس.`,
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
    }
]);
