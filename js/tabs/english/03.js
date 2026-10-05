// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
    {
      t: "تسمّي حاجات في الكود وتكتب README",
      l: 2,
      n: "الدوال أفعال والمتغيرات أسماء، و is/has/can للـ booleans، ومفيش Arabizi، والكلمات اللي بتتكتب غلط كتير، و README لمشروعك",
      items: [
        {
          cmd: "أسماء الدوال والمتغيرات",
          title: "الدالة فعل والمتغير اسم: getUser و orders و calculateTotal",
          desc: R`أسماء الكود إنجليزي، والإنجليزي هنا له قواعد بسيطة بتخلي الكود يتقري زي جملة. القاعدة الأساسية: الدوال بتعمل حاجة، فاسمها [[فعل]] (أو فعل + اسم): [[getUser]] و [[fetchOrders]] و [[calculateTotal]] و [[sendEmail]] و [[validateInput]] و [[formatPrice]]. والمتغيرات والـ properties حاجات، فاسمها [[اسم]]: [[user]] و [[total]] و [[orderCount]]. والـ arrays جمع: [[users]] و [[orderItems]]. والـ classes والـ types اسم مفرد بحرف كبير: [[User]] و [[OrderService]].

وفي React: الـ components أسماء ([[ProductCard]])، والـ hooks [[use]] + اسم ([[useCart]])، والـ event handlers [[handle]] + حدث ([[handleSubmit]]) والـ props بتاعتها [[on]] + حدث ([[onSubmit]]).

الجمع: أغلب الكلمات [[s]]، واللي آخرها [[y]] بعد حرف ساكن [[ies]] ([[category → categories]] و [[entry → entries]])، و [[box → boxes]] و [[status → statuses]]، وشواذ: [[child → children]] و [[person → people]] و [[index → indexes/indices]] و [[datum → data]] (بس بنقول data على طول).`,
          example: R`const users = await fetchUsers();
const activeUsers = users.filter(isActive);
const totalPrice = calculateTotal(cartItems);
function formatPrice(amount: number): string { /* ... */ }
function sendWelcomeEmail(user: User) { /* ... */ }
const categories = await getCategories();
const children = node.children;
function ProductCard({ product, onSelect }: Props) { /* ... */ }
const handleSubmit = (event: FormEvent) => { /* ... */ };
Wrong: function userData() {}      Right: function getUserData() {}
Wrong: const user = await getUsers();  Right: const users = await getUsers();
Wrong: const categorys = [];       Right: const categories = [];`,
          try: R`افتح ملف فيه منطق كتير في مشروع عندك، وعلّم كل اسم دالة مش فعل، وكل array اسمه مفرد، وكل اسم فيه [[data]] أو [[info]] أو [[temp]] أو [[x]] من غير داعي. اكتب الاسم الجديد لكل واحد (ومتغيّرش الكود دلوقتي لو مفيش اختبارات: ده تمرين).`,
          flag: "script",
          deep: {
            why: "الكود بيتقري أكتر ما بيتكتب بعشر مرات. لو الأسماء بتمشي على قواعد الإنجليزي، السطر بيتقري زي جملة: [[if (user.isActive) sendWelcomeEmail(user)]]. ولو لأ، كل سطر محتاج تفكير. وأسماء الكود جزء من إنجليزيتك اللي بيتشاف في الـ PRs والانترفيو.",
            how: R`أفعال شائعة وإمتى:
[[get]] من مكان قريب/سريع، و [[fetch]] من الشبكة، و [[load]] من ملف أو storage، و [[find]] دوّر وممكن مترجعش حاجة، و [[create]] / [[build]] / [[make]] تعمل جديد، و [[calculate]] / [[compute]] تحسب، و [[parse]] تحوّل نص لبيانات، و [[format]] تحوّل بيانات لنص، و [[validate]] تتأكد، و [[normalize]] توحّد الشكل، و [[map]] / [[convert]] / [[to...]] تحوّل ([[toCents]])، و [[handle]] تتعامل مع حدث، و [[render]] ترسم UI، و [[init]] / [[setup]] تجهّز.

الاسم يبقى بطول مجاله: متغير في loop من ٣ سطور [[i]] مقبول، ومتغير في ملف كله لازم اسم واضح.

قواعد الكتابة (camelCase و PascalCase و snake_case و UPPER_CASE) وفكرة الأسماء عمومًا في درس [[naming]] في «تاب هندسة البرمجيات».`,
            when: "كل اسم بتكتبه. ولما تراجع PR، الأسماء من أول حاجات تعلّق عليها.",
            mistakes: R`[[data]] و [[info]] و [[obj]] و [[temp]] و [[result]] في كل حتة. ودالة اسمها اسم ([[userData()]]). و array مفرد ([[const user = []]]). و [[categorys]] و [[statuss]]. واسم بيكذب: [[getUser]] بتعمل تعديل في الداتابيز كمان. و [[checkUser]] مش واضح: بتتأكد من إيه وبترجع إيه؟ [[isUserActive]] أو [[assertUserExists]] أوضح.`
          },
          lines: [
            R`array جمع، ودالة fetch لأنها network.`,
            R`صفة + جمع، و isActive دالة بترجع boolean.`,
            R`اسم للنتيجة، وفعل للدالة.`,
            R`format = تحوّل رقم لنص (زي "١٢٠ ج.م").`,
            R`فعل + اسم مفصّل.`,
            R`categories جمع category (y ← ies).`,
            R`child ← children جمع شاذ.`,
            R`Component اسم بحرف كبير، والـ prop on + حدث.`,
            R`handler = handle + حدث.`,
            R`دالة لازم فعل.`,
            R`اللي راجع ليستة، فالمتغير جمع.`,
            R`categorys غلط إملائي.`
          ],
          sol: R`أمثلة لتغييرات منطقية:
[[function data()]] ← [[function fetchDashboardStats()]]
[[const product = await getProducts()]] ← [[const products = ...]]
[[let temp = price * 0.14]] ← [[const vat = price * VAT_RATE]]
[[function check(u)]] ← [[function isAdmin(user)]] (لو بترجع boolean)
[[const info = res.json()]] ← [[const order = await res.json()]]
[[function userOrders()]] ← [[function getUserOrders()]]

لو لقيت اسم مش عارف تسميه كويس، غالبًا الدالة بتعمل حاجتين: قسّمها (وده «تاب هندسة البرمجيات»).`
        },
        {
          cmd: "is / has / can",
          title: "أسماء الـ booleans: isLoading و hasAccess و canEdit و shouldRetry",
          desc: R`الـ boolean = سؤال إجابته آه أو لأ. فاسمه لازم يتقري كسؤال لما تحطه في [[if]]: [[if (isLoading)]] = «لو بيحمّل». البادئات المشهورة:

[[is]] + صفة أو حالة: [[isLoading]] و [[isOpen]] و [[isValid]] و [[isAdmin]]. و [[has]] + اسم (عنده): [[hasAccess]] و [[hasError]] و [[hasChildren]]. و [[can]] + فعل (يقدر): [[canEdit]] و [[canDelete]]. و [[should]] + فعل (المفروض): [[shouldRetry]] و [[shouldRedirect]]. و [[was]] / [[did]] للماضي: [[wasSent]] و [[didFetch]]. و [[needs]] + اسم أو فعل: [[needsReview]].

وخلّي الاسم إيجابي: [[isEnabled]] أحسن من [[isNotDisabled]]، لأن [[!isNotDisabled]] بيوجع الدماغ.`,
          example: R`const isLoading = status === "pending";
const hasItems = cart.items.length > 0;
const canCheckout = hasItems && !isLoading;
const shouldRetry = error.status >= 500 && attempts < 3;
const isEmailVerified = user.emailVerifiedAt !== null;
if (!canCheckout) return;
Wrong: const loading = true;        Right: const isLoading = true;
Wrong: const isNotVisible = false;  Right: const isVisible = true;
Wrong: const isHasAccess = true;    Right: const hasAccess = true;
Wrong: const isCanEdit = true;      Right: const canEdit = true;`,
          try: R`دوّر في مشروعك على [[useState(false)]] و [[useState(true)]] وأي متغير قيمته true/false. غيّر اسم أي واحد مش ماشي على القاعدة (في ذهنك أو في branch). وبعدين اقرا كل [[if]] فيه boolean بصوت عالي بالإنجليزي: لو الجملة طبيعية، الاسم كويس.`,
          flag: "script",
          deep: {
            why: R`[[if (loading)]] ممكن تتقري «لو فيه loading» أو «لو الـ loading object موجود». [[if (isLoading)]] مفيهاش لبس. ودي من أكتر تعليقات الـ review تكرارًا على كود المبتدئين.`,
            how: R`اختار البادئة بسؤال: الحاجة «هي» كذا؟ [[is]]. «عندها» كذا؟ [[has]]. «تقدر» تعمل كذا؟ [[can]]. «المفروض» تعمل كذا؟ [[should]].

متجمعش بادئتين: [[isHasAccess]] غلط، و [[isCanEdit]] غلط. و [[is]] مع اسم ساعات مقبولة لو معناها «هو كذا»: [[isAdmin]] = هو أدمن.

في React الـ props الـ boolean ساعات من غير بادئة لو مفهومة زي attributes الـ HTML: [[disabled]] و [[open]] و [[checked]] و [[required]]. ده عرف مقبول لأنهم زي HTML.

وفي الداتابيز: أعمدة زي [[is_active]] أو [[email_verified_at]] (timestamp أحسن من boolean لأنه بيقولك إمتى كمان).`,
            when: "أي state أو متغير أو دالة بترجع true/false.",
            mistakes: R`[[flag]] و [[check]] و [[status]] لـ boolean: مش واضح. و [[isNotX]] نفي في الاسم. و [[isLoaded]] و [[isLoading]] الاتنين في نفس الـ component بمعاني متداخلة: استخدم [[status]] واحد بقيم ([['idle' | 'loading' | 'success' | 'error']]). و [[isUserHaveAccess]]: grammar غلط، الصح [[userHasAccess]] أو [[hasAccess]].`
          },
          lines: [
            R`is + حالة. «هو بيحمّل؟»`,
            R`has + اسم. «فيه منتجات؟»`,
            R`can + فعل. «يقدر يعمل checkout؟» والـ if هتتقري جملة.`,
            R`should + فعل. «المفروض نعيد؟» لو خطأ سيرفر وأقل من ٣ محاولات.`,
            R`is + صفة مركبة. «الإيميل متأكد منه؟»`,
            R`بيتقري: «لو مش يقدر يعمل checkout، ارجع».`,
            R`loading من غير بادئة: غامض.`,
            R`اسم منفي: اقلبه.`,
            R`بادئتين: has بس.`,
            R`بادئتين: can بس.`
          ],
          sol: R`أمثلة من مشاريع React بتتكرر:
[[const [loading, setLoading] = useState(false)]] ← [[const [isLoading, setIsLoading] = useState(false)]]
[[const [show, setShow] = useState(false)]] ← [[const [isModalOpen, setIsModalOpen] = useState(false)]]
[[const [error, setError] = useState(false)]] ← لو boolean: [[hasError]]؛ والأحسن تخزن الخطأ نفسه: [[useState<string | null>(null)]].
[[const admin = user.role === "admin"]] ← [[const isAdmin = ...]]

قراية بصوت عالي: [[if (isModalOpen && !isLoading)]] ← «if the modal is open and it is not loading». طبيعية؟ الاسم كويس.`
        },
        {
          cmd: "Arabizi والإملاء",
          title: "Arabizi في الكود وأشهر الكلمات اللي بتتكتب غلط (recieve و lenght و seperate)",
          desc: R`حاجتين بيبوّظوا أسماء الكود عند ناس كتير: أسماء عربي بحروف إنجليزي (Arabizi) زي [[mostakhdem]] و [[gam3]] و [[el_se3r]]، وكلمات إنجليزي مكتوبة غلط زي [[recieve]] و [[lenght]].

الـ Arabizi: محدش مش مصري هيفهمه، ومفيش طريقة واحدة لكتابته ([[mostakhdem]] ولا [[mustakhdim]]؟)، فمستحيل تدوّر بيه. القاعدة: الكود كله إنجليزي، والعربي مكانه النصوص اللي بتظهر لليوزر (وأحسن في ملفات ترجمة i18n). أسماء حاجات مصرية ملهاش مقابل (زي [[governorate]] للمحافظة، أو [[nationalId]] للرقم القومي) ترجمها.

الإملاء الغلط: بيعمل bugs حقيقية ([[user.adress]] في مكان و [[user.address]] في مكان تاني = undefined)، ومبيتلاقاش في البحث. ركّب extension زي Code Spell Checker في VS Code.`,
          example: R`receive      (not recieve)      i before e, except after c
length       (not lenght)
address      (not adress)
separate     (not seperate)
success      (not sucess)
response     (not responce)
occurred     (not occured)
environment  (not enviroment)
dependency   (not dependancy)
parameter    (not paramter)
retrieve     (not retreive)
existing     (not existant)
Wrong: const mostakhdem = await getUser();   Right: const user = await getUser();
Wrong: function e7sebElSe3r() {}             Right: function calculatePrice() {}`,
          try: R`سطّب extension اسمه Code Spell Checker في VS Code وافتح أكبر ٣ ملفات في مشروعك. عدّ الكلمات اللي عليها خط أزرق. صلّح اللي في أسماء متغيرات (بـ F2 عشان يتغير في كل مكان)، وضيف الكلمات التقنية الصح للقاموس.`,
          flag: "script",
          deep: {
            why: R`اسم زي [[recieveMessage]] بيفضل في الكود سنين لأن تغييره بيكسر حاجات. وفي API عام بيبقى مصيبة: مثال مشهور إن الـ HTTP header اسمه [[Referer]] (غلط إملائي في المواصفة الأصلية لـ referrer)، واتقفل كده للأبد. متعملش كده في الـ API بتاعك.`,
            how: R`ليه الكلمات دي بتتغلط: بتتنطق بطريقة مختلفة عن كتابتها. [[length]] بتتنطق «لينجث» بس الـ g قبل الـ th. و [[separate]] فيها [[a]] في النص («sep-A-rate»). و [[occurred]] حرفين r لأن الضغط على آخر مقطع. و [[environment]] فيها [[n]] قبل [[ment]] (environ + ment).

كلمات تانية بتتلخبط: [[its]] (بتاعه) و [[it's]] (it is)، و [[then]] (بعدين) و [[than]] (من، في المقارنة)، و [[lose]] (يضيّع) و [[loose]] (واسع)، و [[affect]] (فعل) و [[effect]] (اسم غالبًا)، و [[login]] (اسم: صفحة الـ login) و [[log in]] (فعل: [[Log in to continue]])، ونفس الكلام [[setup]] و [[set up]]، و [[checkout]] و [[check out]]، و [[backup]] و [[back up]].`,
            when: "كل اسم جديد، وكل نص بيظهر لليوزر. واعمل spell check في الـ CI لو المشروع كبير (فيه أدوات زي cspell).",
            mistakes: R`تغيّر اسم غلط يدوي في ملف واحد بس. استخدم Rename Symbol (F2). وتخلط [[login]] و [[log in]] في الـ UI: الزرار [[Log in]] (فعل)، والصفحة [[the login page]] (اسم). و [[Its not working]] ← [[It's not working]].`
          },
          lines: [
            R`receive: القاعدة القديمة «i قبل e إلا بعد c».`,
            R`length: الـ g قبل الـ th.`,
            R`address: حرفين d وحرفين s.`,
            R`separate: فيها a في النص.`,
            R`success: حرفين c وحرفين s.`,
            R`response: آخرها se مش ce.`,
            R`occurred: حرفين c وحرفين r.`,
            R`environment: n قبل ment.`,
            R`dependency: ency مش ancy.`,
            R`parameter: الـ e بعد الـ m.`,
            R`retrieve: ie بعد tr (مفيش c).`,
            R`existing (والاسم existence)، مفيش existant.`,
            R`Arabizi ← اسم إنجليزي.`,
            R`Arabizi ← فعل إنجليزي + اسم.`
          ],
          sol: R`اللي بيحصل عادة في مشروع حقيقي: بتلاقي من ٥ لـ ٢٠ كلمة. أغلبها:
أسماء مكتبات ومصطلحات صح بس مش في القاموس ([[prisma]] و [[zod]] و [[upsert]] و [[tsx]]) ← «Add to Workspace Dictionary» عشان تتحفظ في [[.vscode/settings.json]] ويشاركها الفريق.
غلط إملائي حقيقي ([[recieved]] و [[lenght]] و [[sucess]]) ← F2 وغيّره.
Arabizi ([[talabat]] و [[mowazafeen]]) ← [[orders]] و [[employees]].

لو لقيت الغلط في اسم عمود داتابيز أو field في API بيستخدمه حد تاني: متغيروش مباشرة. ده محتاج migration أو deprecation (اكتبه في issue).`
        },
        {
          cmd: "README لمشروعك",
          title: "تكتب README لمشروعك بإنجليزي بسيط: جملة الوصف و Features و Run locally",
          desc: R`الـ README بتاعك هو أول حاجة حد بيقراها عن مشروعك. ومش محتاج إنجليزي قوي: محتاج جمل قصيرة، ومسميات أقسام معروفة، وأوامر تتنسخ. درس [[README بيبيع]] في «تاب الشغل والكارير» بيشرح «إيه» يتحط وليه. هنا «إزاي تكتبه» بالإنجليزي.

جملة الوصف: [[<Name> is a <what> that helps <who> <do what>.]] أو أقصر: [[<What> for <who>.]]. مثال: [[Online booking for small clinics.]] أو [[ShopLite is a small e-commerce API that lets store owners manage products and orders.]]

الـ Features: كل bullet يبدأ بفعل (present simple من غير فاعل أو imperative-ish): [[Book appointments online]] أو [[Books ...]]. خلّيهم كلهم نفس الشكل.

Run locally: خطوات imperative مرقمة، وكل أمر في code block.`,
          example: R`# ClinicBook
Online appointment booking for small clinics.
**Live demo:** https://clinicbook.example.com (login: demo@example.com / demo1234)
## Features
- Book, reschedule, and cancel appointments
- Prevent double booking with a database constraint
- Send email reminders 24 hours before each appointment
## Tech stack
- Next.js, PostgreSQL, Prisma, Resend (email)
## Run locally
1. Copy .env.example to .env and set DATABASE_URL.
2. Run npm ci, then npx prisma migrate dev.
3. Run npm run dev and open http://localhost:3000.
## Known limitations
- Arabic UI only; no online payments yet.`,
          try: R`اكتب README لمشروع عندك بالشكل ده، من غير ولا جملة أطول من ١٥ كلمة. وبعدين اقراه بصوت عالي: أي جملة وقفت فيها، قسّمها جملتين. وجرّب «Run locally» في فولدر جديد بعد [[git clone]].`,
          flag: "script",
          deep: {
            why: "الـ README بيتقري من recruiters وناس من برا مصر. الإنجليزي البسيط الواضح أحسن مليون مرة من الإنجليزي «المعقد» المليان غلطات. والجمل القصيرة بتخبّي ضعف الـ grammar لأن مفيهاش مكان تغلط فيه.",
            how: R`قواعد الكتابة البسيطة: جملة واحدة = فكرة واحدة. فعل واضح بدل اسم معقد ([[It sends reminders]] مش [[It provides a reminder-sending functionality]]). ومن غير كلمات فاضية زي [[very]] و [[simply]] و [[just]] و [[easily]] و [[powerful]] و [[amazing]].

قوالب جمل:
[[<Name> lets you <do X>.]]
[[It uses <tool> for <purpose>.]]
[[I chose <tool> because <reason>.]]
[[The hardest part was <problem>. I solved it by <solution>.]]
[[To run the tests, run npm test.]]
[[Known limitations: <X>; <Y>.]]

وفي الـ Markdown: [[#]] للعنوان، و [[##]] للأقسام، و [[-]] للـ bullets، و [[**...**]] للـ bold، و code blocks بتلات backticks.`,
            when: "كل مشروع في الـ portfolio، وكل مكتبة أو أداة صغيرة بتعملها.",
            mistakes: R`[[This project is a web application which is made by using React and it is used for booking]]: طويلة ومكررة. الأحسن [[Online booking built with React.]] و [[This project is made for learn]] ← [[I built this project to learn ...]]. و [[Features: login, register, dashboard]]: أسماء صفحات مش مميزات؛ قول اليوزر يقدر يعمل إيه.`
          },
          lines: [
            R`جملة الوصف: ماذا + لمين. من غير فعل حتى، وده مقبول في الوصف.`,
            R`الـ live link وحساب demo.`,
            R`feature بأفعال: «احجز وغيّر ميعاد وألغي».`,
            R`«امنع الحجز المزدوج بـ constraint في الداتابيز». ده الجزء الصعب.`,
            R`«ابعت تذكير بالإيميل قبل كل ميعاد بـ ٢٤ ساعة».`,
            R`الأدوات في سطر.`,
            R`خطوة ١ imperative.`,
            R`خطوة ٢: then = وبعدين.`,
            R`خطوة ٣ مع النتيجة (open ...).`,
            R`«حدود معروفة»: بالصراحة. yet = لسه.`
          ],
          sol: R`اختبار الجمل: كل جملة في الـ README أقل من ١٥ كلمة، وأغلبها بتبدأ بفعل أو باسم المشروع. أمثلة لتقسيم جملة طويلة:
[[This app is a full-stack application that I built using Next.js and Prisma in order to help the users to track their expenses easily and see charts]]
← [[Track your expenses and see monthly charts. Built with Next.js and Prisma.]]

و [[Run locally]] نجح لو فولدر جديد بعد [[git clone]] اشتغل بالخطوات دي بس. لو احتجت خطوة مش مكتوبة (مثلًا [[createdb]] أو تشغيل Docker)، ضيفها.`
        }
      ]
    },
    {
      t: "رسايل الفريق والعميل (Slack و email)",
      l: 2,
      n: "تطلب مساعدة صح، وتدّي status update، وتقول لأ بأدب، وتتابع وتعتذر عن تأخير، وتكتب إيميل لعميل: كلها بقوالب جاهزة",
      items: [
        {
          cmd: "تطلب مساعدة",
          title: "تطلب مساعدة في Slack: context و tried و question في رسالة واحدة",
          desc: R`أسوأ رسالة في Slack: [[Hi]] وبس، وتستنى الرد عشان تكتب سؤالك. الشخص التاني بيشوف «Hi» ومش عارف عايز إيه، ويا يسيبها يا يرد وبعدين يستنى. العرف في الشغل (وفيه موقع مشهور اسمه nohello.net عن الفكرة دي): التحية والسؤال كله في رسالة واحدة.

والرسالة الكويسة فيها: ١) السياق: شغال على إيه. ٢) المشكلة: إيه اللي حصل (والخطأ بالنص). ٣) جربت إيه. ٤) السؤال بالظبط. ٥) قد إيه مستعجل. كده الشخص يقدر يرد في رسالة واحدة، أو يقولك «مش أنا، اسأل فلان».`,
          example: R`Hi Omar, quick question about the payments webhook when you have a moment.
Context: I'm working on #231 (order status after payment).
Problem: the webhook returns 400 "No signatures found matching the expected signature for payload".
What I tried: I checked the secret in .env and logged the raw body; it looks correct.
Question: do we parse the body as JSON before the webhook route? I think the signature needs the raw body.
Not urgent: I'm working on the tests in the meantime.`,
          try: R`فكّر في آخر مرة كنت «معلّق» في مشكلة. اكتب رسالة Slack واحدة بالقالب ده (سياق، مشكلة، جربت، سؤال، إلحاح)، أقل من ٨٠ كلمة. وبعدين اقراها كأنك الشخص التاني: تقدر ترد من غير ما تسأل حاجة؟`,
          flag: "script",
          deep: {
            why: "اللي بيطلب مساعدة بشكل كويس بياخد ردود أسرع وبيبان إنه بيحترم وقت الناس. وفي الشغل remote مع ناس من بلاد تانية، الرسالة المكتوبة هي كل اللي بيعرفوه عنك.",
            how: R`عبارات افتتاح: [[Quick question about X]]، [[Could you help me with X when you have a moment?]]، [[Do you have 10 minutes today to look at X?]].

الإلحاح: [[Not urgent]]، [[No rush]]، [[Whenever you have time]]، [[This is blocking me]] (موقفني)، [[This is blocking the release]] (مستعجل بجد).

الإغلاق: [[Thanks in advance!]] أو [[Thanks!]]. (مش [[Thanks in advance for your cooperation]]: رسمية زيادة.)

و [[I think ...]] بعد ما تقول جربت إيه = بيبيّن إنك فكرت، حتى لو تخمينك غلط.

ولو السؤال طويل، اكتبه في thread أو في issue وحط اللينك. وتفاصيل «إمتى تسأل وقد إيه تحاول لوحدك» في درس [[تسأل صح]] في «تاب الشغل والكارير».`,
            when: "أي مرة تحتاج حد، في Slack أو Teams أو Discord أو إيميل.",
            mistakes: R`[[Hi]] لوحدها. و [[Can I ask a question?]] (اسأل على طول). و [[It's not working, can you help?]] من غير أي تفاصيل. و [[Please help urgently!!!]] على حاجة مش مستعجلة. و screenshot للكود بدل نص (مينفعش يتنسخ). و [[I have a doubt]] (درس غلطات المصريين).`
          },
          lines: [
            R`تحية + السؤال في نفس الرسالة. when you have a moment = لما تفضى.`,
            R`السياق: شغال على إيه ورقم التاسك.`,
            R`المشكلة ورسالة الخطأ بالنص (دي رسالة Stripe المشهورة لما الـ body يتعمله parse).`,
            R`جربت إيه: «راجعت السر وطبعت الـ body الخام؛ شكله صح».`,
            R`السؤال بالظبط + تخمينك: «هل بنعمل parse للـ body قبل الـ route؟ أظن التوقيع محتاج الـ body الخام».`,
            R`الإلحاح: «مش مستعجل، شغال على الاختبارات في الوقت ده». in the meantime = في الأثناء.`
          ],
          sol: R`مثال صح (٦٥ كلمة تقريبًا):
[[Hi Sara, could you help me with a CORS error when you have a moment? I'm working on the new admin page (#88). The browser says "No 'Access-Control-Allow-Origin' header is present on the requested resource" when I call /api/stats from localhost:5173. I added the origin to the CORS config and restarted the server. Is there another place we set allowed origins? Not urgent. Thanks!]]

راجع: فيه السياق (#88)، والخطأ بالنص، واللي جربته، وسؤال واحد واضح (Is there another place...)، والإلحاح (Not urgent). لو رسالتك فيها [[It doesn't work]] من غير الخطأ بالنص، ضيفه. ولو مفيهاش سؤال (بس وصف)، الشخص مش هيعرف يرد بإيه.`
        },
        {
          cmd: "status update",
          title: "status update و standup: Yesterday و Today و Blockers",
          desc: R`الـ standup (اليومي، مكتوب أو في مكالمة) ليه شكل ثابت: [[Yesterday]] عملت إيه، و [[Today]] هتعمل إيه، و [[Blockers]] إيه اللي موقفك. والـ status update لمدير أو عميل نفس الفكرة بس بيركز على: خلص إيه، وفاضل إيه، وفيه خطر على الميعاد؟

الأزمنة هنا مهمة: الماضي للي خلص ([[I finished]] و [[I fixed]] و [[I merged]])، والـ present continuous للي شغال فيه دلوقتي ([[I'm working on]])، والمستقبل للخطة ([[I'll start]] و [[I'm going to]])، والـ present perfect لحاجة خلصت ولسه مهمة ([[I've opened a PR]] = فتحته وهو موجود دلوقتي).`,
          example: R`Yesterday: I finished the signup form and opened a PR (#140).
Today: I'll address the review comments and start on password reset.
Blockers: none.
---
Yesterday: I investigated the slow orders page. The query was missing an index.
Today: I'm adding the index and testing it on staging.
Blockers: I need access to the staging database. @Omar, could you add me?
---
Weekly update (client): The booking flow is done and deployed to staging.
Next week: email reminders. Risk: the SMS provider hasn't replied yet, so SMS may slip to the following week.`,
          try: R`اكتب standup لآخر ٣ أيام شغل أو مذاكرة بتاعتك (حتى لو لنفسك)، ٣ سطور لكل يوم. وبعدين اكتب weekly update لعميل خيالي عن مشروع من مشاريعك، فيه حاجة خلصت، وحاجة جاية، وخطر واحد.`,
          flag: "script",
          deep: {
            why: "في الشغل الـ remote الـ updates المكتوبة هي اللي بتقول إنك شغال. ولو كتبتها واضحة وقصيرة، المدير ميضطرش يسألك. والـ blockers لو اتقالت بدري بتتحل بدري.",
            how: R`أفعال الـ standup: [[finished]] و [[completed]] و [[fixed]] و [[merged]] و [[deployed]] و [[reviewed]] و [[investigated]] (بحثت في مشكلة) و [[paired with X on]] (اشتغلت مع حد) و [[started]] و [[continued]] و [[I'm still working on]].

للـ blockers: [[I'm blocked on X]] و [[waiting for X]] و [[I need X from Y]]. وخلّي الـ blocker طلب محدد لشخص ([[@Omar, could you ...]]) مش شكوى.

للمخاطر مع العميل: [[Risk:]] و [[may slip]] (ممكن يتأخر) و [[on track]] (ماشي في ميعاده) و [[behind schedule]] (متأخر) و [[ahead of schedule]] (قدام الميعاد) و [[ETA]] (الوقت المتوقع) و [[by Thursday]] (قبل أو يوم الخميس).

ولو مفيش حاجة تتقال في Blockers: [[None]] كفاية.`,
            when: "كل يوم في الـ standup، وكل أسبوع لمدير أو عميل.",
            mistakes: R`[[Yesterday I am working on ...]] ← [[I worked on]] أو [[I was working on]]. و [[I will finish it inshallah]] لعميل أجنبي: مفهوم بس الأوضح [[I expect to finish it by Thursday]]. و update كله «working on it» من غير نتيجة. وتخبّي إنك متأخر لحد يوم التسليم: [[may slip]] قبلها بأيام أحسن بكتير.`
          },
          lines: [
            R`ماضي للي خلص + present perfect ضمني (opened).`,
            R`future: address = اتعامل مع التعليقات. start on = ابدأ في.`,
            R`مفيش blockers.`,
            R`فاصل بين مثالين.`,
            R`investigated = بحثت في. «الـ query كان ناقصه index».`,
            R`present continuous للي شغال فيه دلوقتي.`,
            R`blocker بطلب محدد لشخص: «محتاج access، يا عمر ممكن تضيفني؟»`,
            "فاصل.",
            R`update لعميل: خلص إيه وفين (staging).`,
            R`الجاي + الخطر: «الـ SMS provider مردش لسه، فالـ SMS ممكن يتأخر أسبوع». slip = يتأخر.`
          ],
          sol: R`مثال صح:
[[Mon: Yesterday: I finished the product list page. Today: I'll add pagination. Blockers: none.]]
[[Tue: Yesterday: I added pagination and opened a PR (#12). Today: I'm writing tests for the cart. Blockers: none.]]
[[Wed: Yesterday: I wrote the cart tests; two are failing because of a rounding bug. Today: I'll fix the rounding and address review comments on #12. Blockers: waiting for review on #12.]]

Weekly update:
[[This week: the product pages and the cart are done and deployed to staging. Next week: checkout and payment. Risk: we still don't have the payment provider's API keys, so checkout may slip by 2–3 days if we don't get them by Tuesday.]]

راجع الأزمنة: الماضي في Yesterday، و [[I'll]] أو [[I'm ...ing]] في Today. ولو كتبت [[Yesterday I finish]] صلّحها لـ [[finished]].`
        },
        {
          cmd: "تقول لأ بأدب",
          title: "تقول لأ، أو «مش هلحق»، أو «محتاج وقت أكتر» من غير ما تبان رافض",
          desc: R`أصعب رسايل في الشغل: لما حد يطلب حاجة ومش هتقدر، أو الـ deadline مش واقعي، أو الطلب خارج الـ scope. في مصر ساعات بنقول «حاضر» وبعدين منعملش، وده بيخسّرك الثقة أكتر بكتير من «لأ» مؤدبة بدري.

التركيبة: ١) اعترف بالطلب ([[Thanks for thinking of me]] أو [[I understand this is important]]). ٢) قول لأ أو الحد بوضوح ومن غير لف. ٣) قول السبب في جملة. ٤) اعرض بديل (وقت تاني، أو جزء منه، أو شخص تاني، أو تضحية بحاجة تانية).

الجملة الذهبية في الشغل: [[I can do X by Thursday, or Y by Monday. Which is more important?]] = بتخلي اللي طلب يختار الأولوية بدل ما انت تشيل الشيلة.`,
          example: R`I can't take this on this week; I'm fully booked with the checkout release. I could start on Monday. Would that work?
I don't think we can ship all three features by Friday. I can finish login and signup by Friday, and password reset by Tuesday. Does that work for you?
That's outside the scope we agreed on, but I'm happy to send a quote for it as a separate task.
I'd rather not skip the tests to save time; last time that caused a production bug. Can we cut the export feature instead?
I'm not the best person for this. Mona worked on the payment module; she may be able to help.
Let me check and get back to you by 3pm.`,
          try: R`اكتب رد على الرسالة دي من مدير: [[Can you also add the admin dashboard before Thursday's demo?]] وانت عارف إن الـ dashboard محتاج ٣ أيام وانت عندك يومين. اكتب ٣ ردود مختلفة: واحد يعرض جزء، وواحد يعرض ميعاد تاني، وواحد يسأل عن الأولوية.`,
          flag: "script",
          deep: {
            why: R`«حاضر» اللي مبتتنفذش بتهد الثقة، ودي أغلى حاجة في الكارير. و «لأ» مع بديل بتبيّن إنك فاهم الـ trade-offs، ودي صفة الـ senior. وده ليه علاقة مباشرة بـ [[scope creep]] في «تاب الشغل والكارير».`,
            how: R`عبارات تلطيف «لأ»:
[[I'm afraid I can't ...]] (للأدب الزيادة)
[[I don't think I can ... by ...]]
[[Unfortunately, ...]]
[[I'd rather not ... because ...]] (أفضّل لأ)
[[That's outside the scope we agreed on]] (برا الـ scope، للعملاء)
[[I'm fully booked / at capacity this week]] (مليان)
[[I'm not the best person for this]] (فيه حد أنسب)

عبارات البديل:
[[I could ... instead.]]
[[What if we ...?]]
[[Would it work if ...?]]
[[Which is more important: X or Y?]]

ولو محتاج وقت تفكر قبل ما ترد: [[Let me check and get back to you by 3pm.]] (وارجع فعلًا الساعة ٣).`,
            when: "طلبات فوق طاقتك، و deadlines غير واقعية، وطلبات عملاء برا الاتفاق، وطلب «تتخطى الاختبارات عشان نلحق».",
            mistakes: R`[[Yes, no problem]] وانت عارف إنها مشكلة. و [[No.]] من غير أي حاجة (بتبان عدوانية بالإنجليزي). و [[It's impossible]]: درامية، قول [[It's not possible by Thursday]] مع السبب. و [[I will try]] كرد على deadline مستحيل: بيتسمع «آه». و [[I can't because I'm very very busy]] من غير بديل.`
          },
          lines: [
            R`«مش هقدر آخدها الأسبوع ده، مليان بالـ release. أقدر أبدأ الاتنين. ينفع؟» take on = تاخد مهمة.`,
            R`«مش شايف إننا نلحق التلاتة الجمعة. login و signup الجمعة، و reset التلات. ينفع كده؟» ship = تنزّل.`,
            R`للعميل: «ده برا الـ scope اللي اتفقنا عليه، بس مبسوط أبعتلك سعر ليه كتاسك منفصلة». quote = عرض سعر.`,
            R`«أفضّل منعديش الاختبارات؛ آخر مرة عملت bug في الإنتاج. نشيل الـ export بدلها؟» cut = نشيل.`,
            R`«مش أنسب واحد لده. منى اشتغلت على الدفع، ممكن تساعد».`,
            R`«هشوف وأرجعلك قبل الساعة ٣». get back to you = أرد عليك.`
          ],
          sol: R`٣ ردود صح:
عرض جزء: [[I don't think I can finish the full dashboard by Thursday; it needs about three days. I can have the orders chart and the KPIs ready for the demo, and the rest by next Tuesday. Would that work?]]
ميعاد تاني: [[The full dashboard will take about three days, so the earliest I can deliver it is Monday. Could we show a mockup in Thursday's demo instead?]]
الأولوية: [[I can do the dashboard by Thursday only if I pause the search bug fix. Which is more important for the demo?]]

راجع: كل رد فيه لأ أو حد واضح (مش «هحاول»)، وسبب (٣ أيام)، وبديل، وسؤال في الآخر بيرجّع القرار. لو كتبت [[I will try my best]] بس، ده مش رد: ده «آه» متأجلة.`
        },
        {
          cmd: "follow up و تأخير",
          title: "تتابع رسالة مردش عليها (follow up) وتعتذر عن تأخير من غير مبالغة",
          desc: R`موقفين بيتكرروا كل أسبوع: بعت رسالة أو PR ومحدش رد، أو انت اللي اتأخرت في حاجة.

الـ follow-up: ابعت بعد وقت معقول (يوم أو اتنين في الشغل، ٣–٥ أيام في إيميل لعميل)، وفي نفس الـ thread، وافترض حسن النية (الشخص مشغول)، ولخّص الطلب تاني في سطر عشان ميضطرش يدوّر.

الاعتذار عن التأخير: قصير، ومن غير أعذار طويلة، وفيه الجديد (امتى هتخلص). [[Sorry for the delay]] وبعدين المعلومة على طول. المبالغة ([[I'm deeply sorry for the inconvenience caused]]) بتلفت النظر للمشكلة أكتر.`,
          example: R`Hi Omar, just following up on this. Could you take a look at #140 when you get a chance? It's blocking the release.
Hi Sara, friendly reminder about the API keys. We need them by Tuesday to keep the launch date.
Bumping this in case it got lost. Any thoughts on the approach?
Sorry for the late reply! Yes, Thursday works for me.
Sorry for the delay on the report. It will be ready by 5pm today.
Apologies, I missed the deadline for the login fix. It's in review now (#152) and should be merged tomorrow.
Thanks for your patience. The export is now live on staging.`,
          try: R`اكتب ٣ رسايل: (١) follow-up على PR بتاعك محدش راجعه من يومين. (٢) follow-up لعميل مبعتش المحتوى اللي وعد بيه من ٥ أيام. (٣) اعتذار عن إنك اتأخرت يوم في تاسك، ومعاه الميعاد الجديد.`,
          flag: "script",
          deep: {
            why: R`الـ follow-up اللي بيتكتب غلط بيتقري «انت مقصّر». ولو متكتبش خالص، الشغل بيقف. ونفس الكلام في الاعتذار: الكتير منه أو القليل منه بيبان مش مهني.`,
            how: R`عبارات الـ follow-up من الألطف للأقوى:
[[Just following up on this.]] / [[Friendly reminder about ...]] / [[Bumping this in case it got lost.]] / [[Any update on this?]] / [[We need this by Tuesday to ...]] (مع السبب، للحاجات المستعجلة).

[[bump]] في Slack = ترفع الرسالة تاني للانتباه. و [[in case it got lost]] = لو ضاعت وسط الرسايل (بتفترض حسن النية).

الاعتذار:
بسيط: [[Sorry for the late reply!]] و [[Sorry for the delay.]]
أرسمي: [[Apologies for the delay.]]
لو غلطتك بوضوح: [[I missed the deadline for X. It's now ...]] (قول اللي حصل ببساطة).
شكر بدل اعتذار: [[Thanks for your patience.]] (لطيفة جدًا وبتقفل الموضوع بإيجابية).

و [[when you get a chance]] = لما تلاقي وقت. و [[keep the launch date]] = نحافظ على ميعاد الإطلاق.`,
            when: "أي طلب اتعلّق أكتر من يوم أو اتنين، وأي ميعاد فاتك (والأحسن تبعت قبله إنه هيفوت).",
            mistakes: R`[[Why didn't you reply?]] = هجوم. و [[As per my last email]] = بتتقري عصبية في ثقافة الشغل الإنجليزي. و [[Sorry for late]] ناقصة. واعتذار طويل بأعذار شخصية كتير. و follow-up في رسالة جديدة بدل الـ thread، فالشخص مش لاقي السياق.`
          },
          lines: [
            R`follow-up لطيف + الطلب في سطر + السبب (blocking). when you get a chance = لما تلاقي وقت.`,
            R`friendly reminder + الميعاد والسبب.`,
            R`bump = بترفع الرسالة. in case it got lost = لو ضاعت. Any thoughts = عندك رأي؟`,
            R`اعتذار بسيط عن رد متأخر + الرد على طول.`,
            R`اعتذار + الميعاد الجديد.`,
            R`اعتراف واضح + الحالة دلوقتي + المتوقع. missed = فوّت.`,
            R`شكر بدل اعتذار + الخبر الحلو.`
          ],
          sol: R`أمثلة صح:
(١) [[Hi team, just following up on #145 (search filters). Could someone take a look when you get a chance? It's a small PR, about 80 lines.]]
(٢) [[Hi Ahmed, I hope you're well. Friendly reminder about the product photos and descriptions. We need them by Sunday to launch on the 15th as planned. If it's easier, you can send the first 10 products now and the rest later.]]
(٣) [[Sorry for the delay on the cart task. I underestimated the coupon logic. It's in review now and should be merged by tomorrow noon.]]

راجع: الـ follow-up فيه الطلب ملخص وسبب/ميعاد. والاعتذار جملة واحدة وبعدها الجديد. ولو (٢) عرضت حل أسهل للعميل (يبعت جزء)، ده بيزود فرص الرد جدًا. و [[underestimated]] = قدّرت الوقت أقل من الحقيقي.`
        },
        {
          cmd: "إيميل لعميل",
          title: "إيميل لعميل: Subject واضح، وتحية، ونقط، وخطوة جاية، وتوقيع",
          desc: R`الإيميل أرسمي من Slack، وخصوصًا مع عميل. الشكل: [[Subject]] بيقول الموضوع والمطلوب، وتحية ([[Hi Ahmed,]] مع أغلب العملاء، و [[Dear Mr. Ahmed,]] لو رسمي جدًا أو أول مرة)، وجملة أولى فيها الهدف، ونقط مرقمة لو فيه أكتر من حاجة، وخطوة جاية واضحة (مين يعمل إيه وإمتى)، وإغلاق ([[Best regards,]] أو [[Best,]] أو [[Thanks,]])، واسمك.

العنوان مهم جدًا: [[Update]] وحدها وحشة. الأحسن [[Clinic website: staging ready for review]] أو [[Action needed: product photos by Sunday]].`,
          example: R`Subject: Clinic website: staging ready for your review
Hi Dr. Ahmed,
The booking flow is ready on staging: https://staging.clinicbook.example.com
Could you try it and send me your feedback by Thursday? In particular:
1. Are the working hours correct for each doctor?
2. Is the confirmation message clear for patients?
Two notes:
- Payments are not included in this phase, as agreed.
- Test bookings on staging will not notify real patients.
Once I have your feedback, I'll make the changes and we can go live next week.
Best regards,
Youssef`,
          try: R`اكتب إيميل لعميل (خيالي أو حقيقي) عن مشروع من مشاريعك: بتقوله إن مرحلة خلصت، وبتطلب منه حاجتين محددين بميعاد، وبتفكره بحاجة مش في الاتفاق. أقل من ١٢٠ كلمة. وبعدين اكتب ٣ subject lines مختلفة واختار أوضحهم.`,
          flag: "script",
          deep: {
            why: "العميل بيحكم على احترافيتك من إيميلاتك قبل ما يشوف الكود. إيميل واضح فيه طلبات مرقمة وميعاد = ردود أسرع وخناقات أقل على «احنا متفقناش على كده».",
            how: R`جمل افتتاح: [[I hope you're well.]] (اختيارية ولطيفة)، [[I'm writing to ...]] (أرسمي)، [[Quick update on ...]]، [[Following our call, ...]] (بعد مكالمة).

الطلب: [[Could you ... by Thursday?]] و [[Please let me know if ...]] و [[I'd appreciate it if you could ...]] (أرسمي).

التذكير بالاتفاق: [[as agreed]] و [[as discussed]] و [[per our agreement]] و [[This is not included in the current scope, but ...]].

الإغلاق: [[Let me know if you have any questions.]] و [[Looking forward to your feedback.]] و [[Best regards,]] / [[Kind regards,]] / [[Best,]] / [[Thanks,]].

و [[go live]] = ينزل للناس. و [[phase]] = مرحلة. و [[once]] = أول ما. و [[notify]] = يبعت إشعار.

ولو فيه اتفاق شفهي في مكالمة، ابعت إيميل بعدها يلخّصه ([[Just to confirm what we agreed on the call: ...]]). ده بيحميك (درس [[scope مكتوب]] في «تاب الشغل والكارير»).`,
            when: "أي تواصل مع عميل أو حد برا الفريق، وأي حاجة محتاجة تتوثق.",
            mistakes: R`Subject فاضي أو [[Hello]]. و [[Dear Sir/Madam]] لشخص عارف اسمه. و [[Waiting your reply]] و [[Kindly revert]] (درس الغلطات). وفقرة واحدة طويلة فيها ٥ طلبات: حد هيرد على أول واحد وينسى الباقي. و [[Thanks and regards]] + [[Best regards]] + [[Sincerely]] مع بعض: واحدة كفاية.`
          },
          lines: [
            R`العنوان: المشروع + إيه الجديد + المطلوب.`,
            R`تحية بالاسم (Dr. لأنه دكتور).`,
            R`أول جملة: الهدف واللينك.`,
            R`الطلب بميعاد: «ممكن تجرّبه وتبعتلي رأيك قبل الخميس؟ خصوصًا:»`,
            R`سؤال محدد ١: «مواعيد الشغل صح لكل دكتور؟»`,
            R`سؤال محدد ٢: «رسالة التأكيد واضحة للمرضى؟»`,
            R`«ملاحظتين:»`,
            R`تذكير بالاتفاق: «الدفع مش في المرحلة دي، زي ما اتفقنا».`,
            R`«الحجوزات التجريبية مش هتبعت إشعارات لمرضى حقيقيين». يطمّنه.`,
            R`الخطوة الجاية: «أول ما رأيك يوصل، هعمل التعديلات وننزل الأسبوع الجاي».`,
            R`إغلاق.`,
            R`اسمك.`
          ],
          sol: R`مثال صح (١٠٥ كلمة تقريبًا):
[[Subject: Online store: product pages ready + 2 items needed by Sunday]]
[[Hi Mariam,]]
[[Quick update: the product pages and the cart are ready on staging (link below).]]
[[To launch on the 15th, I need two things from you by Sunday:]]
[[1. The final prices for the 12 new products.]]
[[2. The shipping cost for each governorate.]]
[[A note: the discount codes you mentioned on Monday's call are not included in the current scope. I'm happy to send a quote for them as a separate task.]]
[[Let me know if you have any questions.]]
[[Best regards,]]
[[Youssef]]

Subject lines للمقارنة: [[Update]] (وحش)، [[Store progress]] (عام)، [[Online store: product pages ready + 2 items needed by Sunday]] (الأوضح: الخبر والمطلوب والميعاد). و [[governorate]] = محافظة.`
        }
      ]
    },
    {
      t: "تدوّر صح بالإنجليزي",
      l: 3,
      n: "تدوّر في Google بالكلمات الصح والـ operators، وفي GitHub issues، وتقرا إجابات Stack Overflow بعين ناقدة",
      items: [
        {
          cmd: "Google للمبرمجين",
          title: "تدوّر في Google صح: الجملة الأساسية من الخطأ و \"...\" و site: و -",
          desc: R`البحث بالإنجليزي مهارة لوحدها، وهي اللي بتفرق بين حد بيقعد ساعتين وحد بيلاقي الحل في ٥ دقايق. والخبر الحلو: البحث مش محتاج جمل صح، محتاج كلمات صح.

القواعد: ١) دوّر بالإنجليزي دايمًا، حتى لو الموضوع سهل: المحتوى الإنجليزي أكتر بمية مرة. ٢) انسخ الجملة الأساسية من الخطأ ومن غير الحاجات الخاصة بيك (أسماء ملفاتك، أرقام البورت، الـ IDs). ٣) ضيف اسم الأداة والإصدار ([[prisma 6]] أو [[next 15]]). ٤) اكتب كلمات مش أسئلة: [[react useEffect runs twice]] أحسن من [[why my useEffect is running two times in react]].

الـ operators: [["exact phrase"]] جملة بالظبط، و [[site:github.com]] في موقع معين، و [[-word]] من غير الكلمة دي، و [[OR]] يا ده يا ده، و [[after:2025-01-01]] بعد تاريخ (مفيد جدًا عشان تتجنب إجابات قديمة).`,
          example: R`"Cannot read properties of undefined (reading 'map')" react
"EADDRINUSE" node kill process port 3000
prisma "P2002" unique constraint upsert
next.js app router "cookies" server action -pages
site:github.com vite "Failed to resolve import"
tailwind v4 dark mode after:2025-01-01
eslint flat config typescript "parserOptions"
Wrong: why my code say cannot read properties of undefined when i use map in my component
Right: "Cannot read properties of undefined (reading 'map')" react useState initial value`,
          try: R`خد آخر ٣ أخطاء قابلتك (من [[errors.md]]). لكل واحد اكتب query بالقواعد: الجملة الأساسية بين علامات تنصيص، واسم الأداة، ومن غير حاجاتك الخاصة. دوّر، واكتب رقم النتيجة اللي لقيت فيها الحل (١؟ ٣؟ ١٠؟). وبعدين جرّب نفس الـ query من غير علامات التنصيص وقارن.`,
          flag: "script",
          deep: {
            why: "أغلب المشاكل اللي هتقابلها، حد قابلها قبلك وكتب عنها بالإنجليزي. مهارة البحث بتوصلك له. ومع الـ AI، البحث لسه مهم: الـ AI ممكن يألف، لكن issue على GitHub فيه نفس رسالتك بالظبط ورد من الـ maintainer مصدر أقوى.",
            how: R`إيه اللي تشيله من رسالة الخطأ: المسارات ([[/home/sara/app/src/...]])، وأسماء متغيراتك ([[reading 'products']] ← خليها بس لو مهمة)، والأرقام الخاصة (بورت، ID، timestamp). وإيه اللي تسيبه: كود الخطأ ([[P2002]] و [[TS2322]] و [[EADDRINUSE]])، والجملة الثابتة، واسم الأداة.

كلمات تضيفها للبحث حسب اللي عايزه: [[how to]] (طريقة)، و [[example]] (مثال)، و [[vs]] (مقارنة)، و [[best practice]]، و [[migration guide]] (نقل إصدار)، و [[breaking change]]، و [[workaround]]، و [[docs]] (توديك للمصدر الرسمي)، و [[github issue]].

وافتكر: إصدارات الأدوات بتتغير بسرعة. إجابة من ٢٠١٩ على React أو Next ممكن تكون غلط النهارده. بص على التاريخ دايمًا، واستخدم [[after:]] أو فلتر Tools في Google.`,
            when: "قبل ما تسأل حد، وبعد ما تقرا رسالة الخطأ وتفهمها.",
            mistakes: R`تدوّر بالعربي. وتلصق الـ stack trace كله. وتكتب سؤال طويل بـ grammar صح (مش لازم). وتاخد أول نتيجة من غير ما تبص على تاريخها وإصدارها. وتدوّر باسم متغير خاص بيك ([[reading 'myProducts']]) فمتلاقيش حاجة.`
          },
          lines: [
            R`الجملة الثابتة من خطأ Node بين علامات تنصيص + اسم المكتبة.`,
            R`كود الخطأ + اللي عايز تعمله (تقفل الـ process اللي ماسكة البورت).`,
            R`كود خطأ Prisma (unique constraint) + الـ method.`,
            R`[[-pages]] = من غير نتايج الـ Pages Router القديم.`,
            R`[[site:github.com]] = issues و discussions بس.`,
            R`[[after:]] = نتايج بعد التاريخ ده (الإصدار الجديد).`,
            R`أسماء الإعداد نفسها بين علامات تنصيص.`,
            "غلط: سؤال طويل فيه كلام خاص بيك.",
            "صح: الجملة الثابتة + الأداة + الكلمة اللي بتوصف السياق."
          ],
          sol: R`أمثلة لتحويل:
[[TypeError: Cannot read properties of undefined (reading 'price') at CartItem (/home/me/shop/src/CartItem.tsx:12:30)]]
← [["Cannot read properties of undefined (reading" react props]] أو بـ [['price']] لو عايز. غالبًا أول ٣ نتايج فيها السبب (الـ prop مش مبعوت أو الداتا لسه بتحمّل).

[[Error: P2002 Unique constraint failed on the fields: ($__btemail$__bt)]]
← [[prisma "P2002" unique constraint handle error]].

الفرق مع وبدون علامات التنصيص: من غيرها Google بيدوّر على الكلمات متفرقة، فبتطلعلك نتايج عامة. بيها بتطلعلك صفحات فيها نفس الرسالة بالظبط. لو لقيت الحل في النتيجة ١–٣، الـ query كويس. لو في ١٠ أو ملقتش، قلّل الكلمات أو غيّر اسم الأداة.`
        },
        {
          cmd: "GitHub issues search",
          title: "تدوّر في GitHub issues: is:issue و is:closed و label: و in:title",
          desc: R`لما المشكلة في مكتبة، أحسن مصدر هو الـ issues بتاعتها على GitHub: الـ maintainers بيردوا هناك، والحلول بتبقى للإصدار الحالي، وساعات بتلاقي «ده bug اتصلح في v5.2.1». ومش محتاج Google: خانة البحث في تاب Issues بتقبل qualifiers.

أشهرها: [[is:issue]] أو [[is:pr]]، و [[is:open]] أو [[is:closed]]، و [[label:bug]]، و [[in:title]] (الكلمات في العنوان بس)، و [[author:username]]، و [[sort:updated-desc]] أو [[sort:reactions-+1-desc]] (الأكتر تفاعل)، و [[repo:owner/name]] في البحث العام على github.com/search. وعلامات التنصيص للجملة بالظبط.

اقرا الـ issue صح: العنوان والوصف، وبعدين دوّر على تعليقات الـ maintainers (عليهم علامة Member أو Maintainer أو Collaborator)، وعلى أي PR مربوط ([[linked pull request]] أو [[fixed by #]])، وعلى آخر تعليقات (ممكن حد لاقى workaround).`,
          example: R`is:issue "Failed to resolve import" vite
is:issue is:closed "hydration mismatch" label:bug
is:issue is:open in:title "memory leak"
is:pr is:merged "fix" "useSearchParams"
repo:prisma/prisma is:issue "P2002" sort:reactions-+1-desc
Maintainer: "This is expected behavior. See the docs: ..."
Maintainer: "Fixed in #4521, released in 5.2.1."
User: "Same issue here on v5.2.0. Workaround: pin to 5.1.4 for now."
Bot: "This issue has been automatically marked as stale because it has not had recent activity."`,
          try: R`اختار مكتبة بتستخدمها وخطأ قابلته (أو خد [[Failed to resolve import]] مع vite). دوّر في الـ issues بتاعتها ٣ مرات: بـ [[is:issue is:closed]]، وبـ [[is:issue is:open]]، وبـ [[in:title]]. لكل بحث اكتب: فيه نتيجة مفيدة؟ اتقفل ليه (fixed؟ duplicate؟ stale؟ expected؟)؟`,
          flag: "script",
          deep: {
            why: "المكتبات بتتغير أسرع من Stack Overflow والـ tutorials. الـ issues هي المكان الوحيد اللي هتلاقي فيه «الـ bug ده اتصلح في الإصدار ده» أو «ده سلوك مقصود وده السبب». ومنها كمان بتتعلم إنجليزي الـ maintainers: مختصر ودقيق.",
            how: R`الكلمات اللي هتقابلها في الـ issues: [[repro]] / [[reproduction]]، و [[regression]] (كان شغال وباظ)، و [[expected behavior]] / [[by design]] (مقصود)، و [[duplicate of #]]، و [[stale]] (اتقفل لعدم النشاط)، و [[wontfix]]، و [[upstream]] (المشكلة في مكتبة تانية)، و [[pin to X]] (ثبّت الإصدار ده)، و [[bump]] (رفّع الإصدار)، و [[released in]]، و [[landed in]] (اتدمج في)، و [[canary]] / [[nightly]] / [[beta]] (إصدارات تجريبية)، و [[help wanted]]، و [[good first issue]].

و [[Same issue here]] أو [[+1]] تعليقات بتزعج الـ maintainers: استخدم reaction. ولو عندك معلومة جديدة (إصدار تاني، workaround، repro)، ده التعليق المفيد.

و [[in:title]] مفيد لما الكلمة عامة وبتظهر في تعليقات كتير. و [[sort:reactions-+1-desc]] بيطلعلك المشاكل اللي ناس كتير عندها.`,
            when: "أول ما تشك إن المشكلة من المكتبة مش من كودك، أو بعد ما ترقّي إصدار وحاجة تبوظ.",
            mistakes: R`تفتح issue جديد قبل ما تدوّر في المقفولة. وتقرا أول تعليق وتسيب الباقي (الحل ساعات في آخر تعليق). وتطبّق workaround من سنتين على إصدار جديد. وتفهم [[closed]] إنه «اتحل»: ممكن يكون اتقفل duplicate أو stale أو wontfix.`
          },
          lines: [
            R`issues بس + الجملة بالظبط + اسم الأداة.`,
            R`المقفولة + label bug: غالبًا فيها الحل أو الإصدار اللي صلحه.`,
            R`المفتوحة + الكلمات في العنوان بس.`,
            R`PRs اتدمجت فيها fix و useSearchParams: تعرف اتصلح إمتى.`,
            R`في repo معين + ترتيب بالأكتر تفاعل.`,
            R`رد maintainer: «ده سلوك متوقع، شوف الـ docs». يعني مش bug.`,
            R`رد maintainer: «اتصلح في PR رقم كذا، ونزل في 5.2.1». رقّي.`,
            R`يوزر: «نفس المشكلة على 5.2.0. حل مؤقت: ثبّت على 5.1.4 دلوقتي». pin = تثبّت.`,
            R`bot: «اتعلّم stale لأن مفيش نشاط قريب». يعني ممكن يتقفل من غير حل.`
          ],
          sol: R`النتايج بتختلف حسب المكتبة، بس المفروض تلاقي نمط زي كده:
[[is:issue is:closed]]: issues فيها [[Fixed in #...]] أو [[Closed as completed]] ← شوف الإصدار وقارن بإصدارك ([[npm ls vite]]).
[[is:issue is:open]]: مشاكل لسه مفتوحة، ساعات فيها workaround في التعليقات.
[[in:title]]: نتايج أقل وأدق.

وأسباب القفل اللي هتشوفها في GitHub: [[completed]] (اتحل)، و [[not planned]] (مش هيتعمل: غالبًا wontfix أو stale)، وساعات [[duplicate]]. والـ labels والتعليق الأخير بيوضحوا السبب.

لو ملقتش حاجة خالص، جرّب كلمات أقل، أو ابحث بكود الخطأ بس، أو ابحث في الـ Discussions. ولو متأكد إنه جديد: درس «issue لمشروع open source».`
        },
        {
          cmd: "Stack Overflow بعين ناقدة",
          title: "تقرا إجابة Stack Overflow بعين ناقدة: التاريخ والإصدار والتعليقات",
          desc: R`Stack Overflow لسه فيه إجابات ممتازة لمشاكل كتير، بس فيه كمان إجابات قديمة كانت صح في ٢٠١٥ وبقت غلط أو خطر النهارده. القراية الناقدة = تسأل ٥ أسئلة قبل ما تنسخ أي كود:

١) الإجابة تاريخها إيه، واتعدلت إمتى؟ ٢) الإصدار اللي بتتكلم عنه زي بتاعك؟ ٣) التعليقات تحتها بتقول إيه؟ (هنا بتلاقي «this is deprecated» أو «doesn't work anymore»). ٤) فيه إجابة تانية أحدث تحت؟ (الترتيب الافتراضي بالـ score، والإجابة الـ accepted مبقتش متثبتة فوق من ٢٠٢١، فالأحسن ممكن يبقى تاني أو تالت). ٥) أنا فاهم الكود ده بيعمل إيه؟ لو لأ، متنسخوش.`,
          example: R`Question: How do I make an HTTP request in Node.js?
Answer (2013, score 900): Use the request module: npm install request
Comment (2020): request has been deprecated. See https://github.com/request/request/issues/3142
Answer (2023, score 150): Node 18+ has fetch built in: const res = await fetch(url);
Comment: This works in Node 18+. For older versions, use node-fetch.
Red flags: "just use --force", "disable SSL verification", "chmod 777", "it works for me"
Good signs: explains why, links to docs, mentions the version, has a recent edit`,
          try: R`دوّر على Stack Overflow على سؤال عن [[how to deep clone an object in javascript]]. اقرا أعلى ٣ إجابات بالـ ٥ أسئلة. اكتب: أنهي إجابة هتستخدم النهارده، وليه (تلميح: دوّر على [[structuredClone]])، وأنهي إجابة كانت صح زمان ومبقتش الأحسن.`,
          flag: "script",
          deep: {
            why: "النسخ من غير فهم بيجيب bugs وثغرات أمان. وأخطر الإجابات هي اللي بتحل المشكلة بسرعة بطريقة غلط: تقفل SSL، أو تدّي صلاحيات 777، أو [[--force]]. القراية الناقدة بتحميك، وبتعلمك إنجليزي تقني حقيقي من التعليقات والنقاشات.",
            how: R`كلمات هتقابلها: [[deprecated]] و [[outdated]] (قديم)، و [[as of v18]] (من أول إصدار كذا)، و [[this no longer works]]، و [[edit:]] / [[update:]] (الكاتب زوّد حاجة بعدين)، و [[caveat]] (عيب لازم تعرفه)، و [[this is a hack]] (حل مش نضيف)، و [[this is an anti-pattern]] (أسلوب غلط)، و [[footgun]] (حاجة سهل تأذي بيها نفسك)، و [[TL;DR]]، و [[possible duplicate of]].

علامات الخطر: [[just use --force]]، و [[set rejectUnauthorized: false]] أو [[NODE_TLS_REJECT_UNAUTHORIZED=0]] (بيقفل التحقق من الشهادات)، و [[chmod 777]]، و [[sudo npm install]]، و [[eval]]، و [[it works for me]] من غير شرح.

والإجابة الكويسة بتشرح ليه، وبتلينك الـ docs، وبتقول الإصدار، وساعات بتقول «ده مش مناسب لو...».`,
            when: "كل مرة تفتح Stack Overflow أو أي blog أو إجابة AI.",
            mistakes: R`تنسخ الإجابة الـ accepted على طول. وتتجاهل التعليقات. وتطبّق حل jQuery من ٢٠١٢ في React. وتصدّق إن الـ score العالي = صح النهارده (الـ score اتجمع على سنين).`
          },
          lines: [
            R`السؤال: «أعمل HTTP request في Node إزاي؟»`,
            R`إجابة قديمة بـ score عالي: استخدم مكتبة request.`,
            R`تعليق: «request اتعملها deprecate». ده اللي شفناه في npm بنفسنا في المستوى ١.`,
            R`إجابة أحدث بـ score أقل: Node 18 فيه fetch مدمج. دي الأصح النهارده.`,
            R`تعليق بيحدد الإصدار: «شغال في 18 وفوق، وللأقدم استخدم node-fetch».`,
            R`علامات خطر: «استخدم --force بس»، «اقفل التحقق من SSL»، «chmod 777»، «شغالة عندي».`,
            R`علامات كويسة: بتشرح ليه، ولينك docs، والإصدار، وتعديل قريب.`
          ],
          sol: R`اللي هتلاقيه تقريبًا: إجابات قديمة بـ score عالي بتقترح [[JSON.parse(JSON.stringify(obj))]] (بيضيّع [[Date]] و [[undefined]] و [[Map]] والدوال)، أو [[_.cloneDeep]] من lodash، أو recursive function مكتوبة بإيد. وإجابة أحدث (أو تعديل) بتقول إن [[structuredClone(obj)]] مدمج في المتصفحات الحديثة و Node 17+.

الاختيار النهارده: [[structuredClone]]، لأنه مدمج ومبيحتاجش مكتبة وبيحافظ على Date و Map و Set. والـ caveat: مبينسخش الدوال ولا DOM nodes. [[JSON.parse(JSON.stringify())]] كانت الحل المشهور زمان، ولسه بتنفع لـ JSON بسيط بس.

لو اخترت الإجابة الأعلى score من غير ما تقرا التعليقات، غالبًا فاتك الـ caveat ده.`
        }
      ]
    },
    {
      t: "AI يساعدك متعتمدش عليه",
      l: 3,
      n: "تستخدم الـ AI يشرحلك ويصحّحلك ويعلّمك، مش يكتب بدالك ويترجم وخلاص",
      items: [
        {
          cmd: "AI يشرح مش يترجم",
          title: "تخلي الـ AI يشرح الإنجليزي مش يترجمه: prompts للتعلم",
          desc: R`لو كل مرة تشوف فقرة صعبة تقول للـ AI «ترجم»، هتفهم الفقرة دي وبس، وبعد سنة إنجليزيتك زي ما هي. الطريقة التانية: تخليه «مدرّس» يشرح الكلمات الصعبة، ويبسّط الإنجليزي بالإنجليزي، ويسألك أسئلة.

القاعدة: اطلب شرح الكلمة في سياقها (مش ترجمة قاموس)، واطلب نسخة إنجليزي أبسط بدل ترجمة عربي، واطلب منه يسألك يتأكد إنك فهمت. وفي الآخر، اكتب الكلمات الجديدة في [[words.md]] بنفسك. ده الجزء اللي بيخليك تتعلم.

وخلي بالك إن الـ AI ممكن يغلط في حقائق تقنية (إصدار أو API)، فالمعلومة التقنية تتأكد منها من الـ docs. التفاصيل في درس [[تتحقق من الناتج]] في «تاب الذكاء الاصطناعي».`,
          example: R`Explain the words "idempotent" and "side effect" as they are used in this paragraph. Use simple English, then one Arabic word for each.
Rewrite this paragraph in simple English (A2 level). Keep all technical terms in English.
Don't translate. Ask me 3 questions to check that I understood this paragraph.
List the 5 most useful words in this text for a junior developer, with an example sentence for each.
What does "take precedence over" mean here? Give me two more examples from real docs.
I think this sentence means: "..."  Am I right? If not, explain what I missed.`,
          try: R`خد فقرة من docs صعبة عليك (مثلًا أول فقرتين من صفحة [[Idempotent]] على MDN). استخدم ٣ prompts من المثال بالترتيب: بسّطها، وبعدين يسألك ٣ أسئلة، وبعدين اكتب فهمك وخليه يصححه. اكتب في [[words.md]] الكلمات اللي اتعلمتها ومعاها الجملة الأصلية.`,
          flag: "script",
          deep: {
            why: R`الترجمة بتحل مشكلة النهارده. الشرح والأسئلة بيحلوا مشكلة السنة الجاية. والـ AI أحسن مدرّس لغة متاح: صبور، ومتاح ٢٤ ساعة، وبيعرف السياق التقني. بس لازم انت اللي تقود.`,
            how: R`prompts بتنفع:
[[Rewrite this in simple English]] ← إنجليزي أبسط بدل عربي: بتفضل تقرا إنجليزي.
[[Explain X as it is used here]] ← المعنى في السياق ده (resolve في Promise غير resolve في DNS).
[[Ask me questions to check I understood]] ← بيقلب الدور: انت اللي بتجاوب.
[[I think this means ... Am I right?]] ← أقوى واحد: بتفكر الأول وبعدين تتأكد.
[[Give me more examples from real docs]] ← الكلمة بتثبت لما تشوفها في كذا جملة.
[[Don't give me the answer, give me a hint]] ← للمسائل والأكواد.

وبعد كل جلسة: اكتب ٣–٥ كلمات في [[words.md]] بإيدك. لو الـ AI كتبهم هو، مش هيتحفظوا.

وفي الشغل: متلصقش كود الشركة أو بيانات عملاء أو secrets في أي AI من غير ما تعرف سياسة الشركة (درس [[context من غير أسرار]] في «تاب الذكاء الاصطناعي»).`,
            when: "لما فقرة أو صفحة بتوقفك أكتر من ٥ دقايق. مش لكل جملة: خلي الـ skimming (المستوى ١) هو الأساس.",
            mistakes: R`[[Translate to Arabic]] لكل حاجة. وتقبل الشرح من غير ما تتأكد إنك فهمت (اطلب أسئلة). وتتعلم كلمة وتنساها لأنك مكتبتهاش. وتصدّق حقيقة تقنية من الـ AI من غير docs (خصوصًا الإصدارات والـ APIs الجديدة).`
          },
          lines: [
            R`«اشرح الكلمتين دول زي ما هما مستخدمين في الفقرة دي، بإنجليزي بسيط، وبعدين كلمة عربي لكل واحدة».`,
            R`«اكتب الفقرة دي بإنجليزي بسيط (مستوى A2). سيب المصطلحات التقنية زي ما هي».`,
            R`«متترجمش. اسألني ٣ أسئلة تتأكد إني فهمت».`,
            R`«طلّع أهم ٥ كلمات في النص لمطور junior، مع جملة لكل واحدة».`,
            R`«take precedence over معناها إيه هنا؟ اديني مثالين كمان من docs حقيقية».`,
            R`«أنا فاهم الجملة دي كده: ... صح؟ لو لأ، اشرحلي فاتني إيه». الأقوى.`
          ],
          sol: R`النتيجة المتوقعة: نسخة مبسّطة زي [[A method is idempotent if calling it many times has the same effect on the server as calling it once.]] وأسئلة زي [[Is POST idempotent? Why or why not?]] و [[Is DELETE idempotent even if the second call returns 404?]].

إجاباتك الصح: POST مش idempotent (كل طلب ممكن يعمل حاجة جديدة). و DELETE idempotent لأن التأثير على السيرفر واحد (الحاجة ممسوحة)، حتى لو الرد اتغير (200 بعدين 404). الفكرة إن idempotent عن التأثير (effect) مش عن الرد.

و [[words.md]] المفروض يبقى فيه حاجة زي: [[idempotent = same effect if you repeat it — "All safe methods are idempotent, as well as PUT and DELETE" (MDN)]]. لو الـ AI قالك حاجة عن HTTP مش متأكد منها، ارجع لـ MDN أو RFC 9110.`
        },
        {
          cmd: "تصحيح كتابتك",
          title: "تكتب انت الأول، وبعدين الـ AI يصحح ويشرح الغلط (مش يكتب بدالك)",
          desc: R`الغلطة الأشهر: تقول للـ AI «اكتبلي commit message» أو «اكتبلي إيميل للعميل»، وتنسخ. كده الرسالة حلوة، بس انت متعلمتش حاجة، وفي الانترفيو أو المكالمة مش هيبقى معاك.

الطريقة الصح (وهي نفس فكرة درس [[تكتب بإيدك الأول]] في «تاب الذكاء الاصطناعي»): اكتب انت المسودة بإنجليزيتك مهما كانت. وبعدين اطلب تصحيح مع شرح كل غلطة. وبعدين اكتب النسخة النهائية بإيدك (مش copy). وفي الآخر، حط الغلطات المتكررة في [[mistakes.md]].

بعد شهر هتلاحظ إن نفس الغلطات بتتكرر (الـ s، و a/an، و since/for). دي «قايمتك الشخصية»، وهي أهم من أي كتاب grammar.`,
          example: R`My draft: "Hi, I am working in the bug since yesterday, the problem is the API return 500 when user dont send the email."
Prompt: Correct my English. Show each mistake, the correction, and a one-line reason. Keep my style; don't make it longer.
AI: "working in" -> "working on" (we work ON a task)
AI: "since yesterday" -> OK, but use "I've been working on it since yesterday" (present perfect continuous)
AI: "the API return" -> "the API returns" (third person -s)
AI: "when user dont send" -> "when the user doesn't send" (article + doesn't)
Final (typed by me): "Hi, I've been working on the bug since yesterday. The API returns 500 when the user doesn't send the email."
mistakes.md: working in -> working on | API return -> API returns | dont -> doesn't`,
          try: R`اكتب ٣ حاجات بإنجليزيتك من غير أي مساعدة: commit message، ورسالة Slack بتطلب مساعدة، و standup. وبعدين استخدم الـ prompt اللي في المثال على كل واحدة. اكتب النسخة الصح بإيدك، وحط كل غلطة في [[mistakes.md]]. بعد أسبوع اعمل نفس الحاجة وشوف: فيه غلطات اتكررت؟`,
          flag: "script",
          deep: {
            why: "التعلم بيحصل لما تغلط وتشوف الصح جنب الغلط وتفهم ليه. لما الـ AI يكتب بدالك، مفيش غلط ومفيش تعلم. ولما يصحح مع السبب، كل رسالة بتبقى درس صغير عن غلطاتك انت بالظبط.",
            how: R`الـ prompt المهم: [[Correct my English. Show each mistake, the correction, and a one-line reason. Keep my style; don't make it longer.]]

ليه [[Keep my style; don't make it longer]]؟ لأن الـ AI بيحب يعيد الكتابة بأسلوبه الطويل الرسمي ([[I hope this message finds you well]])، فالرسالة متبقاش بتاعتك وبتبان «AI». عايز تصحيح، مش إعادة كتابة.

prompts تانية مفيدة:
[[Is this natural English for a Slack message to a teammate?]]
[[Make this more polite but keep it short.]]
[[What would a native speaker write instead of "..."?]]
[[Give me 3 ways to say "..." from casual to formal.]]

و [[mistakes.md]] بالشكل ده: [[غلط -> صح | سبب قصير]]. وكل أسبوع اقراه مرة، واختار غلطة واحدة تركز عليها الأسبوع ده.`,
            when: "كل رسالة مهمة في أول ٣ شهور. وبعدين للرسايل الرسمية بس (عميل، CV، انترفيو)، ومع الوقت هتلاقي نفسك مش محتاجه.",
            mistakes: R`تنسخ النسخة المصححة بـ Ctrl+C بدل ما تكتبها. وتطلب [[make it professional]] فيرجعلك إيميل ٣ أضعاف الطول. وتتجاهل الشرح وتاخد الناتج بس. وتصحح كل حاجة بما فيها Slack العادي مع زمايلك: الرسايل السريعة مش محتاجة كمال.`
          },
          lines: [
            R`المسودة بإنجليزيتك: فيها ٤ غلطات.`,
            R`الـ prompt: «صحح، ووريني كل غلطة والتصحيح وسبب في سطر، وخلّي أسلوبي ومتطوّلش».`,
            R`working in ← working on.`,
            R`since yesterday صح، بس مع present perfect continuous.`,
            R`the API return ← returns (الـ s).`,
            R`user dont ← the user doesn't.`,
            R`النسخة النهائية كتبتها بإيدك.`,
            R`اللي اتسجل في mistakes.md.`
          ],
          sol: R`مثال على ناتج أسبوع:
commit: [[fixed the login bug that make user cant enter]] ← [[fix(auth): allow login with uppercase emails]] | الغلطات: ماضي بدل imperative، و [[make]] ← [[makes]]، و [[cant enter]] ← [[can't log in]] (ومش محدد).
Slack: [[can you explain me how the deploy work]] ← [[Can you explain how the deploy works?]] | [[explain me]] و [[works]].
standup: [[yesterday I work on the cart]] ← [[Yesterday I worked on the cart]] | ماضي.

[[mistakes.md]] بعد أسبوع:
[[explain me -> explain to me | explain + something + to someone]]
[[the deploy work -> the deploy works | third person -s]]
[[yesterday I work -> worked | past tense]]

لو لاحظت إن الـ s اتكررت ٣ مرات: دي غلطة الأسبوع اللي جاي. ركّز عليها في كل رسالة.`
        }
      ]
    },
    {
      t: "نصوص أصعب: changelogs و specs وجمل طويلة",
      l: 3,
      n: "تقرا release notes و migration guide، وتفهم MUST و SHOULD في الـ RFCs والمواصفات، وتفك الجملة الطويلة لأجزاء",
      items: [
        {
          cmd: "changelog و release notes",
          title: "تقرا changelog و release notes: Breaking changes و Deprecated و Migration guide",
          desc: R`قبل ما ترقّي أي مكتبة لإصدار جديد، لازم تقرا الـ changelog أو الـ release notes. ده المكان اللي بيقولك إيه اتغير، وإيه اللي هيكسر كودك.

فيه شكل مشهور اسمه Keep a Changelog بيقسّم كل إصدار لأقسام ثابتة: [[Added]] حاجات جديدة، و [[Changed]] حاجات اتغيرت، و [[Deprecated]] هتتشال قريب، و [[Removed]] اتشالت، و [[Fixed]] bugs اتصلحت، و [[Security]] ثغرات اتقفلت. وأغلب المكتبات الكبيرة عندها صفحة [[Upgrade guide]] أو [[Migration guide]] للإصدارات الكبيرة (major).

والإصدار نفسه بيقولك حاجة (semver): [[MAJOR.MINOR.PATCH]]. الـ MAJOR (من 4 لـ 5) = فيه breaking changes. الـ MINOR (من 5.1 لـ 5.2) = features جديدة ومفيش كسر. الـ PATCH (من 5.2.0 لـ 5.2.1) = bug fixes بس.`,
          example: R`## [5.0.0] - 2026-08-12
### Breaking changes
- Dropped support for Node 18. Node 20 or later is now required.
- $__btcreateClient()$__bt no longer accepts a URL string; pass $__bt{ url }$__bt instead.
### Added
- Retry options for network errors.
### Deprecated
- $__btclient.query()$__bt is deprecated in favor of $__btclient.execute()$__bt and will be removed in 6.0.
### Fixed
- Connections are now closed correctly on shutdown (#812).
### Security
- Headers containing CRLF are rejected.`,
          try: R`افتح صفحة الـ Releases لمكتبة بتستخدمها على GitHub (أو ملف [[CHANGELOG.md]])، واختار آخر إصدار major. اقرا قسم الـ breaking changes، ولكل واحد اكتب: إيه اتغير، وهل يأثر على كودك، ولو آه هتغيّر إيه. استخدم [[npm ls <package>]] عشان تعرف إصدارك.`,
          flag: "script",
          deep: {
            why: R`أغلب مصايب «رقّيت المكتبة والمشروع باظ» سببها إن حد مقراش الـ breaking changes. وقراية changelog بتاخد ٥ دقايق وبتوفر يوم. وكمان لما تعرف [[semver]]، هتفهم ليه [[^5.2.0]] في package.json بيسمح بـ 5.9 بس مش 6.0.`,
            how: R`كلمات الـ changelogs: [[dropped support for]] = وقف دعم، و [[now required]] = بقى لازم، و [[no longer]] = مبقاش، و [[in favor of]] = لصالح (البديل)، و [[will be removed in]] = هيتشال في، و [[renamed X to Y]]، و [[moved to]]، و [[now defaults to]] = القيمة الافتراضية اتغيرت (خطيرة وساكتة!)، و [[opt-in]] = لازم تفعّلها بنفسك، و [[opt-out]] = شغالة وتقدر تقفلها، و [[behind a flag]] = محتاجة flag، و [[stable]] = بقت ثابتة بعد ما كانت تجريبية، و [[codemod]] = سكربت بيعدّل كودك أوتوماتيك للإصدار الجديد.

وفي release notes بتاعة Node مثلًا هتلاقي [[Notable changes]] (أهم التغييرات) و [[semver-major]] على التغييرات الكاسرة.

الترتيب الصح للترقية: اقرا الـ breaking changes → دوّر في كودك على الحاجات دي (Ctrl+Shift+F) → شوف فيه codemod → رقّي → شغّل الاختبارات.`,
            when: "قبل أي ترقية major، ولما Dependabot أو Renovate يفتحلك PR، ولما حاجة تبوظ بعد [[npm update]].",
            mistakes: R`ترقّي من 4 لـ 6 مرة واحدة من غير ما تقرا 5. وتعدّي [[now defaults to]] لأنها مش في Breaking. وتفهم [[Deprecated]] إنها اتشالت (لأ، لسه شغالة، بس ابدأ انقل). وتقرا الـ changelog بتاع main بدل بتاع الإصدار اللي هتنزله.`
          },
          lines: [
            R`«وقفنا دعم Node 18. لازم Node 20 أو أحدث».`,
            R`«createClient مبقتش بتقبل URL كـ string؛ ابعت object فيه url بدلها». لازم تعدّل كودك.`,
            R`«إعدادات retry لأخطاء الشبكة». جديد.`,
            R`«query هتتشال لصالح execute، وهتتشال فعلًا في 6.0». ابدأ انقل.`,
            R`«الاتصالات بتتقفل صح وقت الإيقاف». bug اتصلح ورقم الـ issue.`,
            R`«الـ headers اللي فيها CRLF بتترفض». ثغرة اتقفلت.`
          ],
          sol: R`شكل الإجابة الصح لكل breaking change:
[[Dropped support for Node 18]] ← إيه اتغير: لازم Node 20+. يأثر؟ [[node -v]] عندي 22، والسيرفر؟ لو 18 لازم يترقّى الأول.
[[createClient() no longer accepts a URL string]] ← دوّرت بـ Ctrl+Shift+F على [[createClient(]] ولقيت ٢ مكان بيبعتوا string ← هغيّرهم لـ [[createClient({ url })]].
[[client.query() is deprecated]] ← مش هيكسر دلوقتي، بس هعمل issue عشان ننقل لـ [[execute()]] قبل 6.0.

لو المكتبة عندها Migration guide، لازم تلاقي فيه أمثلة before/after للكود. ولو فيه [[codemod]]، ده بيوفر وقت (بس راجع الـ diff بتاعه).`
        },
        {
          cmd: "RFC و spec",
          title: "تقرا RFC أو spec: MUST و SHOULD و MAY بحروف كبيرة، و «when, and only when»",
          desc: R`المواصفات الرسمية (RFCs بتاعة الإنترنت زي HTTP، ومواصفات زي Conventional Commits و semver و OpenAPI) بتتكتب بإنجليزي دقيق جدًا، وبتستخدم كلمات بحروف كبيرة ليها معنى قانوني تقريبًا.

الكلمات دي متعرّفة في RFC 2119 و RFC 8174 (مع بعض اسمهم BCP 14): [[MUST]] / [[REQUIRED]] / [[SHALL]] = إجباري تمامًا، و [[MUST NOT]] / [[SHALL NOT]] = ممنوع تمامًا، و [[SHOULD]] / [[RECOMMENDED]] = المفروض، إلا لو عندك سبب قوي وفاهم العواقب، و [[SHOULD NOT]] / [[NOT RECOMMENDED]] = المفروض لأ بنفس المنطق، و [[MAY]] / [[OPTIONAL]] = اختياري فعلًا.

و RFC 8174 وضّح إن المعنى الخاص ده للكلمات لما تكون بحروف كبيرة بس. عشان كده المواصفات الحديثة بتبدأ بجملة ثابتة فيها [[when, and only when, they appear in all capitals]].`,
          example: R`The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all capitals, as shown here.
Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.
A request method is considered "idempotent" if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.`,
          try: R`اقرا الجملة التانية (من مواصفة Conventional Commits) وقسّمها: إيه الإجباري؟ إيه الاختياري؟ وبعدين اكتب ٣ commit messages: واحد بيحقق كل حاجة، وواحد بيكسر MUST، وواحد بيستخدم كل الحاجات الـ OPTIONAL. وبعدين اقرا الجملة التالتة (من RFC 9110 عن HTTP) وقول بجملتك: ليه PUT idempotent و POST لأ؟`,
          flag: "script",
          deep: {
            why: R`المواصفات هي «الحقيقة الأصلية» اللي الأدوات والمكتبات مبنية عليها. لما تختلف مع حد في الانترفيو أو الـ review على «هل PUT المفروض يبقى idempotent؟»، الإجابة في الـ RFC. ومعرفة MUST/SHOULD بتخليك تعرف أنهي قاعدة مرنة وأنهي لأ.`,
            how: R`طريقة قراية الجملة الطويلة في المواصفات: ١) دوّر على الكلمة الكبيرة (MUST أو SHOULD). ٢) اللي قبلها = مين (الفاعل: [[A server]]، [[The client]]، [[Commits]]). ٣) اللي بعدها = يعمل إيه. ٤) أي [[if]] أو [[unless]] أو [[when]] = الشرط.

الجملة المشهورة [[when, and only when, they appear in all capitals]] = «لما، ولما بس، تكون بحروف كبيرة». يعني [[should]] الصغيرة في نفس المستند مجرد كلمة عادية.

كلمات المواصفات: [[is considered]] = يُعتبر، و [[intended effect]] = التأثير المقصود، و [[identical]] = متطابق، و [[such]] = زي ده، و [[consists of]] = بيتكون من، و [[terminal]] هنا = في الآخر (مش terminal الأوامر!)، و [[prefixed with]] = قبله، و [[interpreted as]] = يتفهم على إنه.

و [[terminal colon and space]] = «نقطتين ومسافة في الآخر» (بعد النوع). مثال حلو إن نفس الكلمة (terminal) ليها معنى تاني خالص في سياق تاني.`,
            when: "لما تحتاج إجابة نهائية على سؤال تقني عن بروتوكول أو مواصفة، أو تبني حاجة لازم تتوافق معاها (API، أو parser، أو أداة).",
            mistakes: R`تعامل SHOULD زي MUST (فتعقّد حاجات من غير داعي)، أو زي MAY (فتكسر توقعات ناس تانية). وتقرا RFC قديم اتلغى: RFC 7231 مثلًا اتحل محله RFC 9110 لـ HTTP. أول الصفحة بيقولك [[Obsoletes]] و [[Obsoleted by]]. وتحاول تقرا الـ RFC كله: دوّر على القسم اللي محتاجه بس.`
          },
          lines: [
            R`الجملة الثابتة من RFC 8174: «الكلمات دي تتفهم زي ما BCP 14 بيقول، لما، ولما بس، تكون بحروف كبيرة زي هنا».`,
            R`من مواصفة Conventional Commits: «الـ commits لازم يبقى قبلها نوع (اسم زي feat و fix)، وبعده scope اختياري، و ! اختيارية، ونقطتين ومسافة إجباري».`,
            R`من RFC 9110: «الـ method بتتعتبر idempotent لو التأثير المقصود على السيرفر من طلبات كتير متطابقة زي تأثير طلب واحد».`
          ],
          sol: R`تقسيم جملة Conventional Commits: الإجباري ([[MUST]] و [[REQUIRED]]) = نوع (type) + [[: ]] (نقطتين ومسافة). الاختياري ([[OPTIONAL]]) = الـ scope و الـ [[!]].

٣ أمثلة:
بيحقق كل حاجة: [[fix: handle empty cart]]
بيكسر MUST: [[handle empty cart]] (مفيش نوع) أو [[fix:handle empty cart]] (مفيش مسافة بعد النقطتين).
كل الـ OPTIONAL: [[feat(api)!: remove v1 endpoints]]

و idempotent: [[PUT /users/5]] بنفس الـ body ١٠ مرات = المستخدم ٥ بنفس الداتا (نفس تأثير مرة واحدة)، فهو idempotent. و [[POST /orders]] ١٠ مرات = ١٠ أوردرات، فمش idempotent. والكلمة المهمة في الـ RFC [[intended effect]]: الكلام عن التأثير على السيرفر، مش إن الرد لازم يبقى نفسه.`
        },
        {
          cmd: "تفك جملة طويلة",
          title: "تفك جملة إنجليزي طويلة: الفعل الأساسي، و which و that، والأقواس",
          desc: R`الـ docs والـ specs فيها جمل ٤٠ كلمة، واللي إنجليزيته ضعيفة بيتوه في النص. الحل مش إنك تترجم كل كلمة، الحل إنك تلاقي «هيكل» الجملة الأول:

١) لاقي الفعل الأساسي والفاعل بتاعه (غالبًا في أول الجملة). ٢) شيل كل حاجة بين فواصل أو أقواس مؤقتًا (دي تفاصيل). ٣) شيل الـ [[which]] و [[that]] و [[who]] والكلام اللي بعدهم (دي وصف لكلمة قبلها). ٤) اقرا الهيكل: [[The server returns a 409]]. ٥) رجّع التفاصيل واحدة واحدة.

الكلمات اللي بتفصل أجزاء: [[which]] / [[that]] = اللي (وصف)، و [[where]] = بحيث/فين، و [[when]] = لما، و [[if]] / [[unless]] = شرط، و [[so that]] = عشان، و [[because]] / [[since]] = عشان/لأن، و [[although]] / [[while]] = مع إن، و [[however]] = بس/لكن، و [[such as]] = زي.`,
          example: R`Full: When a client sends a request with an If-Match header that does not match the current ETag of the resource, which usually means that another client has modified it in the meantime, the server returns 412 Precondition Failed instead of applying the update.
Step 1 (core): the server returns 412 Precondition Failed
Step 2 (condition): When a client sends a request with an If-Match header
Step 3 (describes the header): that does not match the current ETag of the resource
Step 4 (extra explanation): which usually means that another client has modified it in the meantime
Step 5 (alternative): instead of applying the update
Short version: If the ETag doesn't match, someone else changed it, so the server refuses the update with 412.`,
          try: R`فك الجملة دي بنفس الخطوات: [[By default, the build output, which is written to the dist directory unless you set outDir in the config file, is cleaned before each build so that stale files from previous builds are not deployed accidentally.]] واكتب النسخة القصيرة بإنجليزي بسيط وبالعربي.`,
          flag: "script",
          deep: {
            why: "الجمل الطويلة هي أكتر حاجة بتخلي الناس تقفل الصفحة وتفتح الترجمة. ولما تتعلم تفكها، بتكتشف إن أغلبها فكرة بسيطة جدًا متغطية بتفاصيل.",
            how: R`حيل للسرعة:
الفعل الأساسي غالبًا بعد أول اسم كبير ([[the server returns]]، [[the build output ... is cleaned]]). لو لقيت [[which]] أو فاصلة بعد الفاعل، الفعل الأساسي بعد الجزء ده.
الفواصل بتقسم، والأقواس = تفاصيل تقدر تعدّيها في أول قراية.
[[that]] بعد اسم = وصف ([[a header that does not match]])، بس [[that]] بعد فعل زي [[means]] أو [[ensure]] = «إن» ([[means that another client ...]]).
[[instead of]] و [[rather than]] = البديل اللي محصلش.
[[so that]] = الهدف. و [[unless]] = الاستثناء.

وبعد ما تفك الجملة، اكتب «short version» لنفسك. ده بيثبت الفهم، وبيعلمك إزاي تكتب انت بجمل قصيرة.`,
            when: "أي جملة قرأتها مرتين ومفهمتهاش. وخصوصًا في الـ specs، و docs الأمان، وشروط الخدمات (terms).",
            mistakes: R`تترجم من أول الجملة لآخرها بالترتيب: الإنجليزي ترتيبه غير العربي، فبتطلع ترجمة ملخبطة. وتتلخبط بين [[that]] الوصف و [[that]] بمعنى «إن». وتفوّت [[unless]] أو [[instead of]] في النص فالمعنى يتقلب.`
          },
          lines: [
            R`الجملة كاملة (٤٥ كلمة تقريبًا).`,
            R`الهيكل: «السيرفر بيرجّع 412». ده الأساس.`,
            R`الشرط: «لما client يبعت طلب فيه If-Match header».`,
            R`[[that]] بتوصف الـ header: «مش مطابق للـ ETag الحالي».`,
            R`[[which]] شرح إضافي: «وده غالبًا معناه إن client تاني عدّله في الوقت ده».`,
            R`[[instead of]]: البديل اللي محصلش: «بدل ما يطبّق التعديل».`,
            R`النسخة القصيرة: لو الـ ETag مش مطابق، حد غيّره، فالسيرفر يرفض بـ 412.`
          ],
          sol: R`التفكيك:
الهيكل: [[the build output is cleaned before each build]] ← «ناتج الـ build بيتمسح قبل كل build».
[[By default]] ← افتراضيًا.
[[which is written to the dist directory]] ← وصف: «اللي بيتكتب في فولدر dist».
[[unless you set outDir in the config file]] ← استثناء: «إلا لو حطيت outDir في ملف الإعدادات».
[[so that stale files from previous builds are not deployed accidentally]] ← الهدف: «عشان ملفات قديمة من builds قبل كده متتنشرش بالغلط».

Short version: [[By default, the output folder (dist) is emptied before every build, so old files don't get deployed by mistake.]]
بالعربي: «افتراضيًا فولدر الناتج (dist، أو اللي في outDir) بيتفضّى قبل كل build، عشان ملفات قديمة متتنشرش بالغلط».

لو فهمت إن الـ [[unless]] بتاعة الـ cleaning (يعني «مش هيتمسح لو حطيت outDir»)، ارجع للخطوة ٣: [[unless]] جوه جملة الـ [[which]] بتاعة dist، فهي بتوصف مكان الناتج بس.`
        }
      ]
    },
    {
      t: "خطة ٩٠ يوم: ٢٠ دقيقة في اليوم",
      l: 3,
      n: "روتين يومي صغير (قراية ومراجعة كلمات وكتابة)، ومراجعة متباعدة للكلمات، و «اختبرني» في الموقع ده، وتقيس تقدمك كل ٣٠ يوم",
      items: [
        {
          cmd: "٢٠ دقيقة في اليوم",
          title: "الخطة اليومية: صفحة docs و ١٠ كلمات ورسالة واحدة في ٢٠ دقيقة",
          desc: R`الإنجليزي بيتحسن بالتكرار اليومي الصغير، مش بكورس مكثف أسبوع وبعدين تبطّل. ٢٠ دقيقة كل يوم لمدة ٩٠ يوم = ٣٠ ساعة، وده كفاية تفرق جدًا في القراية والكتابة التقنية، لأنك بتتعلم الـ ٣٠٠ كلمة اللي بتتكرر، مش اللغة كلها.

الـ ٢٠ دقيقة متقسمة ٣ أجزاء: ١) [[8 دقايق قراية]]: صفحة docs واحدة (أو جزء منها) لأداة بتستخدمها فعلًا، بطريقة الـ skimming وبعدين تقرا الجزء المهم كويس. ٢) [[5 دقايق كلمات]]: مراجعة الكلمات القديمة اللي عليها الدور وإضافة كلمات جديدة من القراية (الدرس الجاي). ٣) [[7 دقايق كتابة]]: حاجة واحدة حقيقية بالإنجليزي: commit، أو وصف PR، أو رسالة، أو standup، أو ٣ جمل عن اللي قريته. وبعدين تصحيح (درس «تصحيح كتابتك»).

والمهم: نفس الميعاد كل يوم (مثلًا أول ما تفتح اللابتوب قبل الشغل)، ولو فوّت يوم متعوّضوش بساعة: كمّل عادي بكرة.`,
          example: R`Daily routine (20 min)
08:00-08:08  Read: one docs page for a tool I use (skim, then read the key part)
08:08-08:13  Words: review today's due cards in words.md + add up to 10 new words
08:13-08:20  Write: one real text in English (commit, PR, message, or 3-sentence summary)
Weekly (Friday, 15 min)
- Re-read mistakes.md and pick one mistake to focus on next week
- Count: pages read, words added, texts written
Month 1: docs of tools I use daily (npm, git, the framework)
Month 2: error messages + GitHub issues + one PR description a day
Month 3: RFC/spec sections, changelogs, and writing a README or blog post`,
          try: R`اعمل ملف [[plan.md]] في فولدر [[english]] وانسخ فيه الروتين ده بمواعيدك انت. حط تذكير يومي في موبايلك بنفس الميعاد. وسجّل النهارده أول يوم: الصفحة اللي قريتها، والكلمات، والنص اللي كتبته.`,
          flag: "script",
          deep: {
            why: "المشكلة مش إنك مش ذكي في اللغات، المشكلة إن محدش علّمك إنجليزي «المبرمج» بشكل مباشر. والطريقة دي بتركز على اللي هتستخدمه فعلًا بكرة الصبح في شغلك. والـ ٢٠ دقيقة صغيرة كفاية إنك متبطّلش.",
            how: R`اختيار صفحة القراية: حاجة محتاجها الأسبوع ده (مكتبة بتستخدمها، أو خطأ قابلك). القراية اللي ليها هدف بتتفهم وبتتفتكر أكتر بكتير من القراية العامة.

الكتابة: لازم تبقى حاجة حقيقية هتتبعت أو هتتحفظ، مش تمارين: commit فعلي، أو PR فعلي، أو رسالة فعلية. ولو مفيش شغل النهارده، اكتب ٣ جمل عن الصفحة اللي قريتها: [[Today I read about ... The key idea is ... I didn't know that ...]].

الشهور: الشهر الأول الأدوات اللي بتستخدمها كل يوم (المفردات الأساسية). التاني الأخطاء والـ issues والـ PRs (قراية سريعة وكتابة قصيرة). التالت الـ specs والـ changelogs والكتابة الطويلة (README أو blog).

ولو عندك وقت زيادة: اسمع talk تقني (YouTube أو podcast) بترجمة إنجليزي (مش عربي) ١٠ دقايق. ده بيجهزك للمكالمات والانترفيو (شوف درس [[English وانجليزيتك مش قوية]] في «تاب الانترفيو»).`,
            when: "ابدأ النهارده. أحسن وقت: قبل الشغل أو المذاكرة على طول، مش آخر اليوم وانت تعبان.",
            mistakes: R`تبدأ بساعتين في اليوم وتبطّل بعد أسبوع. وتقرا حاجات مش محتاجها (رواية أو أخبار) وتسيب الـ docs. وتكتب تمارين مش حاجات حقيقية. وتعوّض الأيام الفايتة بيوم طويل: الانتظام أهم من الكمية. وتقيس نفسك كل يوم: قيس كل ٣٠ يوم (آخر درس).`
          },
          lines: [
            "عنوان: الروتين اليومي.",
            R`٨ دقايق قراية: صفحة docs واحدة لأداة بستخدمها.`,
            R`٥ دقايق كلمات: مراجعة اللي عليها الدور + لحد ١٠ جديدة. due = عليها الدور.`,
            R`٧ دقايق كتابة: نص حقيقي واحد.`,
            "عنوان: الأسبوعي.",
            R`اقرا mistakes.md واختار غلطة واحدة للأسبوع الجاي.`,
            R`عدّ: صفحات، وكلمات، ونصوص.`,
            R`الشهر ١: docs أدوات يومية.`,
            R`الشهر ٢: رسايل أخطاء و issues ووصف PR كل يوم.`,
            R`الشهر ٣: specs و changelogs و README أو مقال.`
          ],
          sol: R`[[plan.md]] صح بيبقى فيه: ميعاد ثابت (مثلًا [[07:30]])، والتلات أجزاء بالدقايق، وسطر لكل يوم بالشكل ده:
[[Day 1 — Read: Vite "Getting Started" (Scaffolding section). Words: scaffold, template, preset. Wrote: commit "docs: add setup steps to README".]]
[[Day 2 — Read: MDN fetch() Exceptions. Words: abort, resolve, reject. Wrote: 3-sentence summary of when fetch rejects.]]

اختبار إن الخطة واقعية: لو اليوم الأول خد أكتر من ٢٥ دقيقة، قلّل القراية لنص صفحة. الهدف إن اليوم ٤٠ يبقى سهل زي اليوم ١. ولو فوّت يومين ورا بعض، مفيش مشكلة: الـ plan.md بيوريك إنك عملت كذا يوم قبلهم، وده بيشجع ترجع.`
        },
        {
          cmd: "مراجعة الكلمات",
          title: "١٠ كلمات في اليوم بمراجعة متباعدة (spaced repetition): بعد ١ و ٣ و ٧ و ٢١ يوم",
          desc: R`الكلمة اللي بتشوفها مرة بتتنسى في أيام. اللي بتراجعها في الوقت الصح بتفضل. الفكرة اسمها [[spaced repetition]] (المراجعة المتباعدة): تراجع الكلمة بعد يوم، وبعدين ٣ أيام، وبعدين أسبوع، وبعدين ٣ أسابيع. كل مرة تفتكرها صح، المسافة بتزيد. ولو نسيتها، ترجع للأول.

ملف [[words.md]] بسيط يكفي، أو تطبيق زي Anki لو بتحب. كل كلمة ليها: الكلمة، والمعنى بكلامك (عربي أو إنجليزي بسيط)، والجملة الحقيقية اللي شفتها فيها (ومنين)، وجملة من عندك، وتاريخ المراجعة الجاية.

القاعدة الذهبية: الكلمة من غير جملة متتحفظش. [[deprecated = مهمل]] هتتنسى. [[deprecated: "request has been deprecated" (npm warning) = still works but will be removed; use X instead]] هتفضل.`,
          example: R`| word          | meaning (my words)                    | real sentence (source)                               | my sentence                               | next review |
| deprecated    | still works, will be removed; move on | "request has been deprecated" (npm warn)             | "This method is deprecated; use fetch()." | Oct 3       |
| idempotent    | same effect if you repeat it          | "All safe methods are idempotent, as well as PUT and DELETE" (MDN) | "Our payment endpoint must be idempotent."| Oct 1       |
| take precedence over | wins when both are set         | "CLI flags take precedence over the config file"     | "Env vars take precedence over defaults." | Oct 7       |
| stale         | old, needs refresh                    | "by default consider cached data as stale" (TanStack Query docs) | "The cache was stale after the deploy."   | Oct 21      |
Review rule: correct -> next gap (1 -> 3 -> 7 -> 21 -> 60 days). Wrong -> back to 1 day.`,
          try: R`اعمل [[words.md]] بالجدول ده. ضيف ١٠ كلمات من أي درس في المستوى ١ من التاب ده، ولكل واحدة جملة حقيقية (انسخها من الـ docs أو من رسالة خطأ شفتها) وجملة من عندك عن مشروعك. حط مراجعة بكرة. وبكرة: غطّي عمود المعنى، وحاول تفتكر، وحدّث التاريخ.`,
          flag: "script",
          deep: {
            why: "الكلمات هي أكبر عائق في القراية: لو ٣ كلمات في كل جملة مش معروفة، الفقرة مستحيلة. ولو عارف الـ ٣٠٠ كلمة المتكررة، أغلب الـ docs بتبقى مفهومة. والمراجعة المتباعدة من أكتر طرق الحفظ المدروسة والفعالة.",
            how: R`إزاي تختار الكلمات: من القراية اليومية بس، واللي بتتكرر أو في عنوان أو وقفتك عن الفهم. متضيفش كل كلمة جديدة: ١٠ في اليوم كحد أقصى، وأقل عادي.

إزاي تراجع: بص على الكلمة، وقول معناها واعمل جملة بصوت عالي، وبعدين اكشف. صح؟ المسافة الجاية أكبر ([[1 → 3 → 7 → 21 → 60]] يوم). غلط؟ ارجع ليوم ١. المراجعة كلها ٥ دقايق لأن كل يوم عليه عدد محدود.

ولو بتستخدم Anki: الوجه الأمامي الجملة الحقيقية والكلمة متعلّم عليها، والخلفي المعنى وجملتك. Anki بيحسب المواعيد لوحده.

وبعد ٩٠ يوم بـ ٥ كلمات في المتوسط = حوالي ٤٥٠ كلمة. أغلبهم هيبقوا جزء منك، مش محفوظين بس.`,
            when: "كل يوم في الـ ٥ دقايق بتوع الكلمات. والكلمات الجديدة بتيجي من الـ ٨ دقايق بتوع القراية.",
            mistakes: R`تضيف ٥٠ كلمة في يوم وتبطّل. وتكتب الكلمة ومعناها من غير جملة. وتراجع كل الكلمات كل يوم (بيبقى ممل وطويل). وتحفظ كلمات عامة من قايمة «أشهر ١٠٠٠ كلمة إنجليزي» بدل الكلمات اللي في شغلك فعلًا.`
          },
          lines: [
            R`عناوين الأعمدة: الكلمة، المعنى بكلامك، جملة حقيقية ومصدرها، جملتك، المراجعة الجاية.`,
            R`deprecated: جملة من تحذير npm اللي شفناه في المستوى ١.`,
            R`idempotent: من MDN. وجملتك عن مشروعك.`,
            R`take precedence over: من README (درس README و Getting started).`,
            R`stale: من docs React Query. مراجعتها بعد ٣ أسابيع لأنك افتكرتها ٣ مرات.`,
            R`قاعدة المراجعة: صح ← المسافة الجاية. غلط ← ارجع ليوم واحد.`
          ],
          sol: R`[[words.md]] صح بعد اليوم الأول: ١٠ صفوف، كل صف فيه جملة حقيقية بين علامات تنصيص ومصدرها ([[(npm warn)]]، [[(MDN)]]، [[(git hint)]])، وجملة من عندك فيها اسم حاجة من مشروعك، وتاريخ بكرة.

مثال صف كويس:
[[| pending | still waiting, not done yet | "Your payment is still pending." (Stripe docs) | "The order stays pending until the webhook arrives." | Oct 1 |]]

مثال صف ضعيف:
[[| pending | معلق | - | - | - |]] ← مفيش جملة حقيقية ولا جملة ليك ولا ميعاد. هتتنسى.

وبكرة في المراجعة: لو افتكرت ٧ من ١٠، ممتاز. الـ ٣ اللي نسيتهم ميعادهم بعد يوم تاني، والـ ٧ بعد ٣ أيام.`
        },
        {
          cmd: "اختبرني للكلمات",
          title: "تستخدم «اختبرني» و «راجع اللي نسيته» و «اكتب ملاحظة» في الموقع ده للإنجليزي",
          desc: R`الموقع ده نفسه فيه أدوات مراجعة تنفع جدًا مع التاب ده:

«اختبرني» (الزرار جنب المستويات): بيطلعلك بطاقات عشوائية من التاب والمستوى اللي انت فيهم. البطاقة بتوريك عنوان الدرس كسؤال (زي «الفرق بين get و fetch و load و return و send»). قبل ما تكشف، قول بصوت عالي كل كلمة ومعناها وجملة إنجليزي بيها. وبعدين اكشف (مسافة) وقارن بالمثال، واختار «عرفتها» (1) أو «لسه» (2). البطاقات اللي بتقول عليها «لسه» بتطلعلك أكتر.

«راجع اللي نسيته» (فوق الصفحة): بيجمع البطاقات اللي نسيتها أكتر ما افتكرتها من كل التابات. ودي فعليًا مراجعة متباعدة جاهزة. والبطاقة بتخرج من الكومة لما تفتكرها أكتر ما نسيتها.

«اكتب ملاحظة» تحت كل درس: اكتب فيها كلماتك وجملك انت عن الدرس ده. والملاحظات بتدخل في البحث، فلو كتبت [[stale]] في ملاحظة، البحث عن stale هيلاقيها.`,
          example: R`Card: "الفرق بين get و fetch و load و return و send"
Say before you reveal:
  get = take a value that already exists: "Get the current user from the session."
  fetch = bring it from outside, takes time: "Fetch the orders from the API."
  load = bring and prepare: "Load the config file on startup."
  return = a function gives back a result: "This function returns the total."
  send = "Send a confirmation email to the user."
Reveal -> compare with the example -> press 1 (knew it) or 2 (not yet)
Daily: 5 cards from this tab + "راجع اللي نسيته" once
Note on the lesson: "My sentence: My app fetches products from Supabase and returns them sorted."`,
          try: R`افتح «اختبرني» على المستوى ١ من التاب ده، وجاوب ١٠ بطاقات بالطريقة دي (قول الكلمات وجملة لكل واحدة بصوت عالي قبل ما تكشف). لكل بطاقة قلت عليها «لسه»، افتح الدرس واكتب ملاحظة فيها جملة من عندك. وبكرة اعمل «راجع اللي نسيته».`,
          flag: "script",
          deep: {
            why: "انت هنا خلاص كل يوم عشان التابات التانية، فالمراجعة مش محتاجة أداة جديدة. و «اختبرني» مبني على نفس فكرة المراجعة المتباعدة: اللي بتنساه بيرجعلك أكتر.",
            how: R`ليه «قول بصوت عالي قبل ما تكشف»: التذكر الفعلي (active recall) هو اللي بيثبت، مش إنك تقرا الإجابة وتقول «آه عارفها». لو مقدرتش تقول جملة بالكلمة، اضغط «لسه» حتى لو فاكر معناها بالعربي.

قسّم المستويات: المستوى ١ (الكلمات ورسايل الأخطاء) بطاقاته أنسب للكلمات. المستوى ٢ بطاقاته أنسب لـ «اكتب commit/رسالة من دماغك قبل ما تكشف». المستوى ٣ للأفكار والخطة.

والبطاقات بتتحفظ في المتصفح بتاعك، فلو غيّرت جهاز، استخدم تصدير التقدم (backup) لو متاح في الصفحة عندك.

و «جربتها» (الـ checkbox): علّم عليه لما تعمل الـ try فعلًا، مش لما تقرا الدرس. و زرار «اللي فاضل بس» بيخبّي اللي علّمت عليه.`,
            when: "كل يوم ٥ دقايق (جزء الكلمات في الخطة اليومية)، ومرة في الأسبوع «راجع اللي نسيته» لكل التابات.",
            mistakes: R`تكشف على طول وتضغط «عرفتها» لأن الإجابة «شكلها مألوف». وتعمل ٥٠ بطاقة مرة واحدة في الأسبوع بدل ٥ كل يوم. وتسيب الملاحظات فاضية: جملة واحدة منك أحسن من قراية الدرس ٣ مرات.`
          },
          lines: [
            R`البطاقة: عنوان الدرس كسؤال.`,
            R`قبل ما تكشف، قول:`,
            R`get + جملة.`,
            R`fetch + جملة.`,
            R`load + جملة.`,
            R`return + جملة.`,
            R`send + جملة.`,
            R`اكشف وقارن واختار 1 أو 2.`,
            R`يوميًا: ٥ بطاقات من التاب + «راجع اللي نسيته» مرة.`,
            R`ملاحظة على الدرس فيها جملتك انت.`
          ],
          sol: R`اللي المفروض يحصل: من ١٠ بطاقات في المستوى ١، طبيعي في الأول تقول «لسه» على ٤–٦. البطاقات الصعبة غالبًا: «الكلمات الصغيرة اللي بتقلب المعنى» ([[unless]] و [[respectively]] و [[i.e.]])، و «valid و invalid و required ... deprecated و legacy»، ورسايل الأخطاء (لأن فيها كذا جملة).

ملاحظة كويسة على درس «if / unless / instead of»:
[[unless = if not. "The cache is used unless you pass --no-cache." My sentence: "The page is public unless the user is banned."]]

وبكرة في «راجع اللي نسيته» هتلاقي البطاقات دي. لو افتكرتها وضغطت 1، بتقرب تخرج من الكومة. ولو زرار «راجع اللي نسيته» مش ظاهر، ده معناه إن مفيش بطاقات منسية لسه (بيظهر لما تضغط «لسه» على بطاقة).`
        },
        {
          cmd: "تقيس تقدمك",
          title: "تقيس تقدمك كل ٣٠ يوم: نفس الصفحة ونفس الرسالة، وقارن",
          desc: R`من غير قياس، هتحس إنك مش بتتحسن (لأن التحسن اليومي صغير ومش باين)، وممكن تبطّل. الحل: اختبار بسيط تعمله يوم ١ ويوم ٣٠ ويوم ٦٠ ويوم ٩٠، بنفس الحاجات، وتقارن الأرقام.

الاختبار (٣٠ دقيقة): ١) [[Reading]]: صفحة docs ثابتة تختارها يوم ١ (متقراهاش في النص). عدّ الكلمات اللي مش فاهمها، واحسب الوقت اللي خدته عشان تكتب ملخص ٣ جمل. ٢) [[Errors]]: ٥ رسايل خطأ جديدة (من التاب ده أو من شغلك): كام واحدة فهمتها وعرفت حلها من غير بحث؟ ٣) [[Writing]]: نفس المهمة كل مرة (مثلًا: «اكتب وصف PR لميزة بحث في موقع»)، ١٠ دقايق، من غير مساعدة. وبعدين عدّ الغلطات بالتصحيح. ٤) [[Words]]: عدد الكلمات في [[words.md]] اللي بقت «٢١ يوم أو أكتر».`,
          example: R`| Check                         | Day 1   | Day 30  | Day 60  | Day 90  |
| Unknown words in test page    | 23      | 14      | 8       | 4       |
| Time to 3-sentence summary    | 25 min  | 15 min  | 10 min  | 7 min   |
| Error messages solved (of 5)  | 2       | 3       | 4       | 5       |
| Mistakes in PR description    | 9       | 6       | 4       | 2       |
| Words at 21+ days             | 0       | 60      | 150     | 260     |
Notes Day 30: still forgetting third-person -s; articles better.
Notes Day 60: reading faster; writing still slow. Focus: PR templates.`,
          try: R`اعمل الاختبار ده النهارده (يوم ١) وسجّل الأرقام في [[progress.md]]. اختار الصفحة الثابتة ومهمة الكتابة الثابتة واكتبهم في الملف عشان تستخدمهم يوم ٣٠. وحط تذكير بعد ٣٠ يوم.`,
          flag: "script",
          deep: {
            why: R`الأرقام بتحميك من إحساس «مفيش فايدة». لما تشوف إن الكلمات المش مفهومة نزلت من ٢٣ لـ ١٤ في شهر، ده دليل. وكمان بتوريك فين الضعف بالظبط (القراية اتحسنت والكتابة لأ؟ يبقى الشهر الجاي ركّز على الكتابة).`,
            how: R`الأرقام في المثال للتوضيح، أرقامك هتختلف، والمهم الاتجاه.

اختيار صفحة الاختبار: صفحة متوسطة الصعوبة لأداة بتستخدمها، مش سهلة جدًا (مش هتقيس حاجة) ولا صعبة جدًا (هتحبطك). مثلًا صفحة من react.dev أو Node docs عن حاجة بتستخدمها.

عدّ غلطات الكتابة: استخدم الـ prompt من درس «تصحيح كتابتك» وعدّ الغلطات اللي طلعت. وبص على نوعها: هل نفس النوع بيتكرر؟ ده «موضوع الشهر الجاي».

بعد ٩٠ يوم: كمّل بنفس الروتين بس غيّر المصادر (مكتبات جديدة، specs، مقالات تقنية طويلة)، وابدأ تكتب حاجة أطول (مقال تقني قصير، أو README كامل، أو رد على issue في open source). وده بيبني جزء الـ English اللي في الانترفيو والـ CV كمان.`,
            when: "يوم ١، ويوم ٣٠، ويوم ٦٠، ويوم ٩٠. ومش أكتر من كده: القياس اليومي بيخلي التقلبات الصغيرة تحبطك.",
            mistakes: R`تغيّر صفحة الاختبار أو مهمة الكتابة كل مرة (مبقتش بتقيس نفس الحاجة). وتقرا صفحة الاختبار في النص (بقت محفوظة). وتستخدم AI أو قاموس في الاختبار نفسه. وتقارن نفسك بحد تاني بدل نفسك من شهر.`
          },
          lines: [
            R`عناوين: الاختبار، ويوم ١ و ٣٠ و ٦٠ و ٩٠.`,
            R`عدد الكلمات المش مفهومة في صفحة الاختبار: المفروض ينزل.`,
            R`وقت كتابة ملخص ٣ جمل: المفروض ينزل.`,
            R`رسايل الأخطاء اللي فهمتها وحليتها من ٥: المفروض يطلع.`,
            R`غلطات وصف الـ PR: المفروض ينزل.`,
            R`الكلمات اللي وصلت لمراجعة ٢١ يوم أو أكتر: المفروض يطلع.`,
            R`ملاحظات يوم ٣٠: فين لسه ضعيف وفين اتحسنت.`,
            R`ملاحظات يوم ٦٠: وتحديد التركيز الجاي.`
          ],
          sol: R`[[progress.md]] يوم ١ صح فيه: اسم صفحة الاختبار ولينكها (مثلًا [[react.dev: "You Might Not Need an Effect"]])، ومهمة الكتابة الثابتة ([[Write a PR description for adding search to a product list]])، و ٥ رسايل أخطاء اخترتهم، والأرقام:
[[Unknown words: 19 | Summary time: 22 min | Errors solved: 2/5 | Writing mistakes: 11 | Words at 21+ days: 0]]
وتذكير على الموبايل بعد ٣٠ يوم.

الأرقام العالية يوم ١ مش مشكلة خالص: ده خط البداية. المهم إنها تبقى حقيقية (من غير قاموس ولا AI). ولو يوم ٣٠ رقم منهم متحسنش، ده مش فشل: ده تحديد لمكان التركيز في الشهر الجاي.

ولو خلصت الـ ٩٠ يوم: ارجع للتاب ده من الأول وعدّي على الـ try بتاع كل درس بسرعة. هتلاقي حاجات كانت صعبة بقت عادية، وده أحسن قياس.`
        }
      ]
    }
]);
