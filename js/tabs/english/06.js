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
          teach: R`## السطر بيتقري جملة لو الأسماء صح

الأمثلة دي حتت من كود TypeScript (مش ملف كامل بيشتغل لوحده)، والمهم فيها الأسماء. القاعدة كلها في جدول:

| الحاجة | نوع الكلمة | مثال |
|---|---|---|
| دالة | فعل + اسم | [[fetchUsers]] و [[calculateTotal]] و [[formatPrice]] |
| متغير بقيمة واحدة | اسم مفرد | [[totalPrice]] |
| array | اسم جمع | [[users]] و [[cartItems]] و [[categories]] |
| class أو type أو component | اسم بحرف كبير (PascalCase) | [[User]] و [[ProductCard]] |
| event handler | [[handle]] + حدث | [[handleSubmit]] |
| prop للحدث | [[on]] + حدث | [[onSelect]] |

---

## نقرا السطور كجمل

~~~ts
const users = await fetchUsers();
~~~

«المستخدمين = استنى هات المستخدمين». [[fetch]] لأن فيه network، و [[users]] جمع لأن الراجع ليستة.

~~~ts
const activeUsers = users.filter(isActive);
~~~

«المستخدمين النشطين = المستخدمين، فلتر اللي نشط». [[active]] صفة قبل الاسم ([[activeUsers]] مش [[usersActive]])، زي الإنجليزي العادي.

~~~ts
const children = node.children;
~~~

[[child]] جمعها [[children]]: جمع شاذ.

---

## الجمع

| القاعدة | مثال |
|---|---|
| أغلب الكلمات + s | [[user → users]] |
| حرف ساكن + y → ies | [[category → categories]] و [[entry → entries]] |
| آخرها s أو x → es | [[status → statuses]] و [[box → boxes]] |
| شاذ | [[child → children]] و [[person → people]] |

---

## الغلط في المثال

| غلط | ليه | صح |
|---|---|---|
| [[function userData()]] | الدالة اسم مش فعل | [[getUserData()]] |
| [[const user = await getUsers()]] | ليستة في اسم مفرد | [[users]] |
| [[categorys]] | إملاء | [[categories]] |

---

## الخلاصة

- الدالة فعل، والمتغير اسم، والـ array جمع.
- لو مش لاقي اسم كويس لدالة، غالبًا بتعمل حاجتين.
- [[data]] و [[info]] و [[temp]] أسماء مبتقولش حاجة.`,
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
          teach: R`## الـ boolean سؤال، واسمه بيتقري سؤال

شغّلت سطور المثال في Node 22 بقيم تجريبية (status = "pending"، والسلة فيها منتج، والخطأ 503، ومحاولة واحدة، والإيميل مش متأكد منه):

~~~text الناتج
{
  isLoading: true,
  hasItems: true,
  canCheckout: false,
  shouldRetry: true,
  isEmailVerified: false
}
~~~

---

## كل سطر جملة

| السطر | اقراه بالإنجليزي | البادئة |
|---|---|---|
| [[const isLoading = status === "pending";]] | is it loading? | [[is]] + حالة |
| [[const hasItems = cart.items.length > 0;]] | does it have items? | [[has]] + اسم |
| [[const canCheckout = hasItems && !isLoading;]] | can the user check out? | [[can]] + فعل |
| [[const shouldRetry = error.status >= 500 && attempts < 3;]] | should we retry? | [[should]] + فعل |
| [[const isEmailVerified = user.emailVerifiedAt !== null;]] | is the email verified? | [[is]] + صفة |
| [[if (!canCheckout) return;]] | if the user can't check out, return | |

[[canCheckout]] طلع [[false]] لأن [[isLoading]] كان [[true]]: [[&&]] = و، و [[!]] = مش.

---

## اختيار البادئة

| السؤال | البادئة |
|---|---|
| الحاجة «هي» كذا؟ | [[is]] |
| «عندها» كذا؟ | [[has]] |
| «تقدر» تعمل كذا؟ | [[can]] |
| «المفروض» تعمل كذا؟ | [[should]] |

---

## الغلط في المثال

| غلط | ليه | صح |
|---|---|---|
| [[loading]] | ممكن يبقى object أو رقم | [[isLoading]] |
| [[isNotVisible]] | نفي في الاسم، و [[!isNotVisible]] بيوجع الدماغ | [[isVisible]] |
| [[isHasAccess]] | بادئتين | [[hasAccess]] |
| [[isCanEdit]] | بادئتين | [[canEdit]] |

---

## الخلاصة

- اقرا الـ [[if]] بصوت عالي: لو طلعت جملة طبيعية، الاسم كويس.
- بادئة واحدة، والاسم إيجابي.
- props زي [[disabled]] و [[checked]] من غير بادئة مقبولة لأنها زي HTML.`,
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
          teach: R`## القايمة دي ٣ أنواع غلطات

| نوع الغلطة | الكلمات |
|---|---|
| ترتيب حروف | [[receive]] و [[retrieve]] و [[length]] و [[parameter]] |
| حرف ناقص أو زيادة | [[address]] و [[success]] و [[occurred]] و [[environment]] |
| حرف غلط | [[separate]] و [[response]] و [[dependency]] و [[existing]] |

---

## ليه بتتغلط: النطق مختلف عن الكتابة

| الكلمة | الحيلة |
|---|---|
| [[receive]] | «i قبل e، إلا بعد c»: بعد c بتبقى ei |
| [[retrieve]] | مفيش c، فـ ie |
| [[length]] | g قبل th |
| [[separate]] | فيها **a** في النص: sep-**a**-rate |
| [[occurred]] | cc و rr |
| [[environment]] | environ + ment، فالـ n قبل ment |
| [[dependency]] | ency مش ancy |
| [[response]] | se مش ce |
| [[existing]] | والاسم [[existence]]. مفيش [[existant]] |

---

## ليه الإملاء مش شكل بس

لو [[user.adress]] في ملف و [[user.address]] في ملف تاني، JavaScript مش هيطلّع خطأ: هيرجّع [[undefined]] بهدوء. يعني الغلطة الإملائية = bug. والمثال المشهور: الـ header اسمه [[Referer]] (غلط إملائي لـ referrer) واتقفل كده في المواصفة للأبد.

---

## الـ Arabizi

| غلط | صح |
|---|---|
| [[const mostakhdem = await getUser();]] | [[const user = await getUser();]] |
| [[function e7sebElSe3r() {}]] | [[function calculatePrice() {}]] |

[[e7seb]] = «احسب» و [[el se3r]] = «السعر». محدش مش مصري هيفهمها، ومفيش طريقة واحدة لكتابتها، فمستحيل تدوّر بيها.

---

## الخلاصة

- الكود إنجليزي، والعربي في النصوص اللي اليوزر بيشوفها.
- Code Spell Checker في VS Code، و F2 لتغيير الاسم في كل مكان.
- [[login]] اسم (الصفحة)، و [[log in]] فعل (الزرار).`,
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
          teach: R`## الـ README ده جمل قصيرة وأقسام معروفة

نفك كل قسم والـ grammar بتاعه:

~~~text
# ClinicBook
Online appointment booking for small clinics.
~~~

جملة الوصف من غير فعل: **إيه + لمين**. ده شكل مقبول جدًا في الوصف. والبديل الأطول: [[ClinicBook lets small clinics take bookings online.]]

~~~text
**Live demo:** https://clinicbook.example.com (login: demo@example.com / demo1234)
~~~

[[**...**]] تقيل في Markdown. وحساب demo بداتا وهمية بس.

~~~text
- Book, reschedule, and cancel appointments
- Prevent double booking with a database constraint
- Send email reminders 24 hours before each appointment
~~~

كل bullet بيبدأ بفعل، وكلهم نفس الشكل. و [[reschedule]] = تغيّر الميعاد، و [[before each appointment]] = قبل كل ميعاد. و [[,]] قبل [[and]] في ليستة ٣ حاجات (Oxford comma) شائعة في الإنجليزي الأمريكي.

~~~text
1. Copy .env.example to .env and set DATABASE_URL.
2. Run npm ci, then npx prisma migrate dev.
3. Run npm run dev and open http://localhost:3000.
~~~

خطوات imperative مرقمة. و [[then]] = وبعدين. وآخر خطوة فيها النتيجة ([[open http://localhost:3000]]).

~~~text
- Arabic UI only; no online payments yet.
~~~

[[;]] بتربط جملتين قصيرين. و [[yet]] في النفي = لسه.

---

## قوالب جمل

| القالب | معناه |
|---|---|
| [[<Name> lets you <do X>.]] | بيخليك تعمل كذا |
| [[It uses <tool> for <purpose>.]] | بيستخدم كذا عشان كذا |
| [[I chose <tool> because <reason>.]] | اخترت كذا عشان |
| [[The hardest part was <problem>. I solved it by <solution>.]] | أصعب حتة، واتحلت إزاي |

---

## الخلاصة

- جملة = فكرة، وأقل من ١٥ كلمة.
- فعل واضح بدل اسم معقد: [[It sends reminders]] مش [[It provides a reminder-sending functionality]].
- من غير [[very]] و [[easily]] و [[powerful]].`,
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
          teach: R`## الرسالة ٦ سطور، كل سطر ليه label

| السطر | الـ label | بيوفّر سؤال |
|---|---|---|
| [[Hi Omar, quick question about the payments webhook when you have a moment.]] | التحية + الموضوع | «عايز إيه؟» |
| [[Context: I'm working on #231 (order status after payment).]] | السياق | «ده عن إيه؟» |
| [[Problem: the webhook returns 400 "No signatures found ..."]] | المشكلة بالنص | «إيه الخطأ؟» |
| [[What I tried: I checked the secret in .env and logged the raw body; it looks correct.]] | جربت إيه | «جربت كذا؟» |
| [[Question: do we parse the body as JSON before the webhook route? ...]] | سؤال واحد + تخمين | |
| [[Not urgent: I'm working on the tests in the meantime.]] | الإلحاح | «مستعجل؟» |

---

## الخطأ نفسه

جرّبت مكتبة [[stripe]] في Node 22 (Docker): ناديت [[stripe.webhooks.constructEvent]] بتوقيع مش مطابق، وطلع:

~~~text الناتج
StripeSignatureVerificationError: No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe?
~~~

| الحتة | معناها |
|---|---|
| [[No signatures found matching]] | ملقيتش توقيع مطابق |
| [[the expected signature for payload]] | للتوقيع المتوقع للبيانات دي |
| [[Are you passing the raw request body ...?]] | المكتبة نفسها بتسأل: انت بتبعت الـ body الخام؟ |

وده بالظبط تخمين عمر في الرسالة: لو حد عمل [[JSON.parse]] للـ body قبل الـ route، الـ bytes اتغيرت والتوقيع مبقاش مطابق.

---

## الأزمنة والكلمات

- [[I'm working on]]: present continuous، شغال دلوقتي.
- [[I checked]] و [[logged]]: ماضي، حاجات خلصت.
- [[it looks correct]] = «شكله صح».
- [[I think the signature needs the raw body]]: التخمين بعد [[I think]].
- [[in the meantime]] = في الوقت ده.

---

## الخلاصة

- التحية والسؤال في رسالة واحدة: مفيش [[Hi]] لوحدها.
- السياق، والخطأ بالنص، وجربت إيه، وسؤال واحد، والإلحاح.
- [[Not urgent]] أو [[This is blocking me]]: قول قد إيه مستعجل.`,
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
          teach: R`## ٣ أسئلة، ولكل سؤال زمن

| السؤال | الزمن | مثال |
|---|---|---|
| [[Yesterday:]] عملت إيه | ماضي | [[I finished the signup form]] |
| [[Today:]] هتعمل إيه | [[I'll]] أو [[I'm ...ing]] | [[I'll address the review comments]] |
| [[Blockers:]] موقفك إيه | حاضر | [[I need access to ...]] |

---

## المثال الأول

~~~text
Yesterday: I finished the signup form and opened a PR (#140).
Today: I'll address the review comments and start on password reset.
Blockers: none.
~~~

- [[finished]] و [[opened]]: ماضي.
- [[I'll address]]: [[address]] هنا = «أتعامل مع» (مش عنوان). و [[start on]] = أبدأ في.
- [[none]] = مفيش. كفاية كده.

## المثال التاني

~~~text
Yesterday: I investigated the slow orders page. The query was missing an index.
Today: I'm adding the index and testing it on staging.
Blockers: I need access to the staging database. @Omar, could you add me?
~~~

- [[investigated]] = بحثت في مشكلة.
- [[was missing]] = كان ناقصه.
- [[I'm adding]]: present continuous، بيحصل دلوقتي.
- الـ blocker طلب محدد لشخص ([[@Omar, could you ...]])، مش شكوى.

## الـ update للعميل

~~~text
Weekly update (client): The booking flow is done and deployed to staging.
Next week: email reminders. Risk: the SMS provider hasn't replied yet, so SMS may slip to the following week.
~~~

| الكلمة | معناها |
|---|---|
| [[is done and deployed]] | خلص واتنشر |
| [[hasn't replied yet]] | present perfect: مردش لحد دلوقتي |
| [[may slip]] | ممكن يتأخر |
| [[the following week]] | الأسبوع اللي بعده |

---

## الخلاصة

- Yesterday ماضي، Today مستقبل أو continuous، Blockers طلب محدد.
- الخطر يتقال بدري: [[may slip]] أحسن من مفاجأة يوم التسليم.
- [[on track]] = في الميعاد، و [[behind schedule]] = متأخر.`,
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
          teach: R`## كل «لأ» فيها ٣ حتت: لأ، وسبب، وبديل

نفك أول جملة:

~~~text
I can't take this on this week; I'm fully booked with the checkout release. I could start on Monday. Would that work?
~~~

| الحتة | في الجملة |
|---|---|
| لأ واضحة | [[I can't take this on this week]] |
| السبب | [[I'm fully booked with the checkout release]] |
| البديل | [[I could start on Monday]] |
| سؤال يرجّع القرار | [[Would that work?]] |

[[take on]] = آخد مهمة. و [[fully booked]] = مليان. و [[could]] أنعم من [[can]] في العرض.

---

## باقي الجمل: نفس التركيبة بأدوات مختلفة

| الجملة | أداة التلطيف | البديل |
|---|---|---|
| [[I don't think we can ship all three features by Friday.]] | [[I don't think]] بدل [[We can't]] | جزء الجمعة وجزء التلات |
| [[That's outside the scope we agreed on, but ...]] | الرفض من الاتفاق مش منك | [[send a quote]] = عرض سعر |
| [[I'd rather not skip the tests ...]] | [[I'd rather not]] = أفضّل لأ | [[Can we cut the export feature instead?]] |
| [[I'm not the best person for this.]] | | شخص أنسب |
| [[Let me check and get back to you by 3pm.]] | وقت تفكير بميعاد | |

- [[ship]] = تنزّل للناس.
- [[last time that caused a production bug]]: السبب بحاجة حصلت فعلًا، مش برأي.
- [[cut]] هنا = نشيل.
- [[get back to you]] = أرد عليك.

---

## الجملة الذهبية

~~~text
I can do X by Thursday, or Y by Monday. Which is more important?
~~~

اللي طلب هو اللي يختار الأولوية، بدل ما انت تشيل الشيلة.

---

## الخلاصة

- «حاضر» اللي مبتتعملش أوحش من «لأ» مؤدبة بدري.
- لأ + سبب + بديل + سؤال.
- [[I will try]] على deadline مستحيل بتتسمع «آه».`,
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
          teach: R`## نوعين رسايل، ولكل نوع درجات

### الـ follow-up من الألطف للأقوى

| الجملة | الدرجة |
|---|---|
| [[just following up on this]] | ألطف حاجة |
| [[friendly reminder about ...]] | تذكير ودّي |
| [[Bumping this in case it got lost.]] | ترفع الرسالة |
| [[We need them by Tuesday to keep the launch date.]] | مستعجل، ومعاه السبب |

نفك أول رسالة:

~~~text
Hi Omar, just following up on this. Could you take a look at #140 when you get a chance? It's blocking the release.
~~~

- [[following up on]] = بتابع على.
- [[take a look at]] = تبص على.
- [[when you get a chance]] = لما تلاقي وقت (بتفترض إنه مشغول).
- [[It's blocking the release]]: السبب اللي بيخلّيها مهمة.

و [[bump]] في Slack = ترفع رسالة قديمة للانتباه. و [[in case it got lost]] = «لو ضاعت وسط الرسايل»: حسن نية.

### الاعتذار: جملة، وبعدها الجديد

| الجملة | الشكل |
|---|---|
| [[Sorry for the late reply! Yes, Thursday works for me.]] | بسيط + الرد على طول |
| [[Sorry for the delay on the report. It will be ready by 5pm today.]] | اعتذار + ميعاد جديد |
| [[Apologies, I missed the deadline for the login fix. It's in review now (#152) ...]] | اعتراف + الحالة + المتوقع |
| [[Thanks for your patience. The export is now live on staging.]] | شكر بدل اعتذار |

[[missed the deadline]] = فوّت الميعاد. و [[should be merged tomorrow]] = المتوقع يتدمج بكرة. و [[patience]] = صبر.

---

## الخلاصة

- الـ follow-up في نفس الـ thread، ومعاه الطلب في سطر.
- الاعتذار جملة واحدة، والمعلومة الجديدة بعدها على طول.
- [[As per my last email]] و [[Why didn't you reply?]] بيتقروا عصبية.`,
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
          teach: R`## الإيميل ٧ أجزاء بالترتيب

| الجزء | في المثال |
|---|---|
| Subject | [[Clinic website: staging ready for your review]] |
| تحية | [[Hi Dr. Ahmed,]] |
| الهدف | [[The booking flow is ready on staging: <link>]] |
| الطلب بميعاد | [[Could you try it and send me your feedback by Thursday?]] |
| أسئلة مرقمة | [[1. Are the working hours correct ...?]] و [[2. Is the confirmation message clear ...?]] |
| ملاحظات | [[Two notes:]] وتحتها نقطتين |
| الخطوة الجاية | [[Once I have your feedback, I'll make the changes and we can go live next week.]] |
| إغلاق واسم | [[Best regards,]] و [[Youssef]] |

---

## الجمل المهمة

~~~text
Subject: Clinic website: staging ready for your review
~~~

المشروع + الجديد + المطلوب. [[Update]] لوحدها مبتقولش حاجة.

~~~text
Could you try it and send me your feedback by Thursday? In particular:
~~~

[[Could you]] طلب مؤدب. و [[feedback]] من غير s. و [[by Thursday]] = قبل أو يوم الخميس. و [[In particular]] = خصوصًا.

~~~text
- Payments are not included in this phase, as agreed.
- Test bookings on staging will not notify real patients.
~~~

[[as agreed]] = زي ما اتفقنا: تذكير بالـ scope من غير ما يبان خناقة. و [[notify]] = يبعت إشعار: الجملة دي بتطمّنه.

~~~text
Once I have your feedback, I'll make the changes and we can go live next week.
~~~

[[Once]] + جملة = أول ما. و [[go live]] = ننزل للناس.

---

## الإغلاق

| الإغلاق | إمتى |
|---|---|
| [[Best regards,]] و [[Kind regards,]] | رسمي شوية |
| [[Best,]] و [[Thanks,]] | أخف |

واحد بس، مش [[Thanks and regards]] و [[Best regards]] مع بعض.

---

## الخلاصة

- Subject بيقول الخبر والمطلوب.
- الطلبات مرقمة وبميعاد.
- [[as agreed]] للتذكير بالاتفاق، و «الخطوة الجاية» في الآخر.`,
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
    }
]);
