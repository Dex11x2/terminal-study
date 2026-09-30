// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("sweng", {
  label: "هندسة البرمجيات",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/sweng && cd ~/lab/sweng
npm init -y && npm i -D typescript tsx vitest
npx tsx main.ts`,
  labText: "الأمثلة هنا TypeScript. خد كود قديم من مشروع عندك وطبّق عليه كل درس: refactor صغير، واختبار قبله وبعده.",
  levels: {"1":["كود نضيف","naming، و functions صغيرة، و DRY و KISS و YAGNI، والتعامل مع الأخطاء"],"2":["التصميم","composition ولا inheritance، و dependency injection و SOLID في كود حقيقي، و refactoring بأمان، وإمتى الـ pattern يبقى زيادة"],"3":["الفريق والجودة","TDD وأنواع الاختبارات، و debugging و git bisect، وقراية codebase جديد، و PRs و code review، والتقدير، و Scrum و Kanban والـ tickets والـ tech debt والـ ADRs والـ docs"]},
  categories: [
    {
      t: "الأسماء والدوال",
      l: 1,
      n: "الكود بيتقري أكتر بكتير ما بيتكتب، فاكتبه للي هيقراه بعدك (وغالبًا ده انت بعد ٦ شهور)",
      items: [
        {
          cmd: "naming",
          title: "اسم يقول الحاجة دي إيه من غير ما تفتح الكود",
          desc: R`الاسم الكويس بيقول الحاجة دي إيه أو بتعمل إيه، من غير تعليق ومن غير ما تدخل تقرا الدالة. متغير [[d]] مش بيقول حاجة، و [[daysSinceLastLogin]] بيقول كل حاجة.

القواعد العملية: المتغير اسم ([[user]] و [[totalPrice]])، والدالة فعل ([[getUser]] و [[calculateTotal]])، والـ boolean سؤال جوابه آه أو لأ ([[isActive]] و [[hasAccess]] و [[canEdit]])، والـ array جمع ([[users]] مش [[data]]).`,
          example: R`// قبل: لازم تخمّن كل حرف
function check(u: { r: string; e: boolean }) {
  return u.r === "admin" || u.e;
}

// بعد: الأسماء بتحكي
type Member = { role: "admin" | "editor" | "viewer"; isOwner: boolean };
function canEditPost(member: Member): boolean {
  return member.role === "admin" || member.isOwner;
}
const members: Member[] = [
  { role: "viewer", isOwner: true },
  { role: "viewer", isOwner: false },
];
const editors = members.filter(canEditPost);
console.log(editors.length); // 1`,
          try: R`افتح ملف قديم عندك ودوّر على ٥ أسماء زي [[data]] و [[res]] و [[temp]] و [[flag]] و [[handle2]]. غيّر كل واحد بـ F2 في VS Code (Rename Symbol) لاسم بيقول الحقيقة، وشوف الكود بقى محتاج تعليقات أقل ولا لأ.`,
          flag: "script",
          deep: {
            why: "الكود بيتقري أكتر ما بيتكتب بكتير: وانت بتصلّح bug، ووانت بتراجع PR، ووانت راجع للمشروع بعد ٦ شهور. الاسم الغلط بيخليك تفتح الدالة وتقراها سطر سطر عشان تعرف بتعمل إيه، والاسم الصح بيوفّر ده كله.",
            how: R`فيه كام قاعدة بتغطي أغلب الحالات:

الدوال أفعال بتقول النتيجة: [[getUser]] بترجع user، و [[createOrder]] بتعمل order، و [[isExpired]] بترجع boolean. ولو الاسم فيه And ([[validateAndSave]]) فالاسم نفسه بيقولك قسّمها.

الـ booleans بـ [[is]] و [[has]] و [[can]] و [[should]]، وبالإيجاب: [[isEnabled]] مش [[isNotDisabled]]، عشان [[!isNotDisabled]] بتلف الدماغ.

الوحدة جوه الاسم لما الرقم ممكن يتفهم غلط: [[timeoutMs]] و [[priceCents]] و [[durationSeconds]]. bugs كتير في الوقت سببها حد افتكر الرقم ثواني وهو ميلي ثانية.

كلمة واحدة لكل فكرة في المشروع كله: لو بتقول [[fetch]] في مكان، متقولش [[get]] و [[load]] و [[retrieve]] لنفس الحاجة في أماكن تانية.

ومتحطش النوع في الاسم ([[userArray]] و [[strName]]): TypeScript عارف النوع، والاسم يقول المعنى. والاسم طوله على قد عمره: [[i]] جوه loop من ٣ سطور تمام، بس متغير عايش في ملف كامل محتاج اسم كامل.

وفي VS Code غيّر الاسم بـ F2 (Rename Symbol) مش find/replace، عشان يغيّره في كل الملفات صح ومن غير ما يلمس كلمة شبهه (تاب VS Code).`,
            when: "كل مرة تكتب اسم. وكل مرة تلاقي نفسك بتكتب تعليق يشرح متغير ده إيه، ده غالبًا معناه إن الاسم محتاج يتغير.",
            mistakes: R`أسماء عامة زي [[data]] و [[info]] و [[result]] و [[handleClick2]]. واختصارات مش مشهورة ([[usrCnt]]). واسم بقى كدب بعد تعديل: [[getActiveUsers]] اللي بقت ترجع كل الـ users بعد ما حد شال الفلتر، ودي أسوأ من اسم وحش لأنها بتضلّلك. وفي انترفيو live coding، الأسماء الواضحة من أول سطر بتفرق مع اللي بيقيّمك أكتر ما تتخيل.`
          },
          lines: [
            "الاسم [[check]] مبيقولش بيشيك على إيه، و [[u]] و [[r]] و [[e]] حروف لازم تخمّنها.",
            "[[e]] ممكن تبقى email أو enabled أو editor. محدش يعرف من غير ما يدوّر.",
            "قفلة.",
            "النوع باسم واضح، و [[role]] قيم محددة بدل string مفتوح، و [[isOwner]] boolean اسمه سؤال.",
            "اسم الدالة هو السؤال بالظبط: العضو ده يقدر يعدّل البوست؟ ورجوعها boolean مكتوب.",
            "نفس المنطق، بس بيتقري زي جملة.",
            "قفلة.",
            "array اسمها جمع.",
            "عضو owner.",
            "عضو مش owner.",
            "قفلة الـ array.",
            "[[members.filter(canEditPost)]] بتتقري إنجليزي: هات اللي يقدروا يعدّلوا.",
            "بيطبع 1."
          ],
          sol: R`مفيش ناتج واحد صح هنا، بس فيه اختبار سريع: اقرا اسم كل متغير لوحده من غير ما تبص على السطر اللي حواليه. لو عرفت هو إيه (user؟ فلوس؟ بالقرش ولا بالجنيه؟) يبقى الاسم نجح. مثال من كود حقيقي في الحل: [[handle2(data)]] بقت [[hasPlacedOrders(userId)]]، و [[temp]] بقت [[user]]، و [[flag]] اتشال خالص لأن الـ boolean بقى هو الـ return نفسه ([[user.orders.length > 0]]). والناتج [[true]].

بعد الـ F2 هتلاقي تعليقات زي [[// check if user has orders]] بقت بتعيد الاسم بالحرف، فامسحها. ده المقياس اللي التمرين بيسأل عنه: كل اسم كويس بيوفّر تعليق.

الغلط الشائع إنك تستخدم Find/Replace بدل F2: هيغيّر [[data]] جوه strings وفي ملفات ملهاش علاقة، و [[res.data]] بتاعة axios هتبوظ. و F2 نفسه مش بيغيّر خانات جاية من برا (body أو عمود في الداتابيز أو response من API): لو الاسم جزء من شكل الداتا، ده تغيير interface مش rename، وبيتعمل لوحده بعد ما تعرف مين بيبعت ومين بيستقبل.`,
          solCode: R`// قبل:
// async function handle2(data: any) {
//   const res = await fetch($__bt/api/users/$__{data}$__bt);
//   const temp = await res.json();
//   let flag = false;
//   if (temp.orders.length > 0) flag = true;
//   return flag;
// }

type User = { id: string; orders: { id: string }[] };

async function hasPlacedOrders(userId: string, loadUser: (id: string) => Promise<User>): Promise<boolean> {
  const user = await loadUser(userId);
  return user.orders.length > 0;
}

const fakeLoadUser = async (id: string): Promise<User> => ({ id, orders: [{ id: "o1" }] });
hasPlacedOrders("42", fakeLoadUser).then((hasOrders) => console.log(hasOrders)); // true`
        },
        {
          cmd: "small functions",
          title: "كل دالة تعمل حاجة واحدة بس",
          desc: R`الدالة الكويسة بتعمل حاجة واحدة، واسمها بيقولها، وتقدر تشرحها في جملة من غير «و». لو محتاج «و» (بتتحقق من الداتا وبتحسب السعر وبتبعت إيميل)، يبقى دي تلات دوال.

المقياس مش عدد السطور، المقياس مستوى تفاصيل واحد: الدالة الكبيرة بتحكي الخطوات بأسماء، وكل خطوة في دالة لوحدها فيها التفاصيل.`,
          example: R`type Item = { price: number; qty: number };
type Order = { email: string; items: Item[] };

function validate(order: Order): void {
  if (!order.email.includes("@")) throw new Error("invalid email");
  if (order.items.length === 0) throw new Error("empty order");
}
function subtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
function placeOrder(order: Order): number {
  validate(order);
  const total = subtotal(order.items);
  // sendReceipt(order.email, total) هنا في المشروع الحقيقي
  return total;
}
console.log(placeOrder({ email: "you@example.com", items: [{ price: 50, qty: 2 }] })); // 100`,
          try: R`خد أطول دالة في مشروع عندك. اكتب فوق كل حتة فيها تعليق من كلمتين بيقول بتعمل إيه، وبعدين حوّل كل تعليق لدالة بنفس الاسم (في VS Code: حدد الكود و Ctrl+. واختار Extract to function). في الآخر الدالة الأصلية لازم تتقري زي قايمة خطوات.`,
          flag: "script",
          deep: {
            why: R`الدالة الطويلة صعب تفهمها، وصعب تختبرها (لازم تجهّز كل حاجة عشان توصل لسطر واحد جواها)، وصعب تعيد استخدام جزء منها. والـ bugs بتستخبى في النص، لأن المتغيرات بتعيش ٢٠٠ سطر وأي حد ممكن يغيّرها. وفي مشروع حقيقي كان فيه handler واحد للـ checkout أطول من ٧٠٠ سطر: validation وحساب وكلام مع بوابة الدفع وكتابة في الداتابيز في نفس المكان، فأي تعديل صغير كان محتاج تقرا الكل.`,
            how: R`الفكرة اسمها Extract Function، وهي أشهر refactoring: تاخد حتة كود ليها معنى، وتحطها في دالة باسم المعنى ده، وتنادي الدالة مكانها.

علامات إن الدالة محتاجة تتقسم: فيها تعليقات بتقسّمها لأجزاء ([[// validate]] و [[// calculate]])، أو فيها indent عميق، أو اسمها فيه And، أو بتاخد أكتر من ٣ أو ٤ parameters، أو عشان تختبرها محتاج mocks كتير.

والمهم مستوى التفاصيل: [[placeOrder]] بتقول «اتأكد، احسب، رجّع»، ومبتقولش الـ reduce شغال إزاي. اللي عايز التفاصيل ينزل للدالة الصغيرة، واللي عايز الصورة الكبيرة يقرا الكبيرة وبس.

والدوال الصغيرة اللي بتاخد input وترجع output زي [[subtotal]] أسهل حاجة تختبرها: من غير داتابيز ومن غير mocks.`,
            when: "وانت بتكتب: لما تحس إنك محتاج تعليق يفصل جزء عن جزء. ووانت بتصلّح bug: قبل ما تعدّل في دالة ضخمة، اطلّع الجزء اللي هتعدّله في دالة لوحده واختبره.",
            mistakes: R`تقسّم لدرجة إن كل دالة سطر واحد ملوش معنى لوحده، فتلف بين ٢٠ دالة عشان تفهم حاجة بسيطة: التقسيم على المعنى مش على عدد السطور. وتعمل دوال صغيرة بس بتكلم بعض عن طريق متغيرات global بدل parameters و return، فالتقسيم بقى شكلي. وفي انترفيو لو اتسألت «إيه اللي يخلي الدالة كويسة؟» متقولش «قصيرة» وبس، قول «بتعمل حاجة واحدة، على مستوى تفاصيل واحد، واسمها بيوصفها».`
          },
          lines: [
            "شكل الصنف: سعر وكمية.",
            "شكل الطلب.",
            "دالة شغلتها واحدة: تتأكد إن الطلب سليم، ومبترجعش حاجة.",
            "إيميل من غير @: وقّف.",
            "طلب فاضي: وقّف.",
            "قفلة.",
            "دالة شغلتها واحدة: تجمع الأسعار.",
            "سعر × كمية لكل صنف، ومجموعهم.",
            "قفلة.",
            "الدالة الكبيرة بتحكي الخطوات بس، من غير تفاصيل.",
            "خطوة ١: اتأكد.",
            "خطوة ٢: احسب.",
            "رجّع الإجمالي.",
            "قفلة.",
            "بيطبع 100."
          ],
          sol: R`الدالة الأصلية في الآخر المفروض تبقى ٤ لـ ٦ سطور، كل سطر نداء باسم الخطوة، زي [[registerUser]] في الحل: validate، وبعدين hash، وبعدين save، وبعدين welcome. لو قريتها بصوت عالي تبقى جملة، والتعليقات اللي كتبتها في الأول اختفت لأنها بقت أسامي دوال.

شغّل قبل وبعد وقارن: الحل بيطبع [[Welcome you@example.com]] وبعدين [[email taken]] للتسجيل التاني. السلوك ماتغيرش، ودا أهم شرط في أي extract.

علامة إنك قطّعت في المكان الغلط: دالة مستخرجة بتاخد ٥ أو ٦ parameters، أو VS Code طلّعلك دالة بترجع object فيه ٣ متغيرات عشان الأصلية تكمّل بيهم. معناه إن الحتة دي مش خطوة مستقلة، أو إنها بتعدّل متغيرات برا منها (side effect). جرّب تقطع في حدود تانية، أو افصل التعديل ده الأول.`,
          solCode: R`// قبل: registerUser كانت ٤٠ سطر، وفيها تعليقات: "check input" و "hash password" و "save" و "welcome mail"
type Input = { email: string; password: string };
type User = { id: number; email: string; passwordHash: string };
const users: User[] = [];

function validateSignup({ email, password }: Input): void {
  if (!email.includes("@")) throw new Error("invalid email");
  if (password.length < 8) throw new Error("password too short");
  if (users.some((u) => u.email === email)) throw new Error("email taken");
}
function hashPassword(password: string): string {
  return $__bthashed:$__{password.length}$__bt; // في الحقيقي: bcrypt أو argon2
}
function saveUser(email: string, passwordHash: string): User {
  const user = { id: users.length + 1, email, passwordHash };
  users.push(user);
  return user;
}
function welcomeMessage(user: User): string {
  return $__btWelcome $__{user.email}$__bt;
}

function registerUser(input: Input): string {
  validateSignup(input);
  const user = saveUser(input.email, hashPassword(input.password));
  return welcomeMessage(user);
}

console.log(registerUser({ email: "you@example.com", password: "12345678" })); // Welcome you@example.com
try { registerUser({ email: "you@example.com", password: "12345678" }); } catch (e) { console.log((e as Error).message); } // email taken`
        },
        {
          cmd: "guard clauses",
          title: "اخرج من الدالة بدري بدل if جوه if",
          desc: R`بدل ما تحط الشغل الحقيقي جوه تلات أو أربع if متداخلين، اعكس الشروط: اتأكد من كل حالة غلط في الأول واخرج منها على طول ([[return]] أو [[throw]]). اللي فاضل تحت هو الحالة السليمة، على الشمال من غير indent.

ده اسمه early return أو guard clause، وبيحوّل «سهم» الـ if المتداخلة لقايمة شروط مسطّحة بتتقري من فوق لتحت.`,
          example: R`type Account = { isActive: boolean; balance: number };

// قبل: الشغل الحقيقي مدفون في ٣ مستويات، وكل الأخطاء بقت "failed"
// if (acc) {
//   if (acc.isActive) {
//     if (amount <= acc.balance) { acc.balance -= amount; return "ok"; }
//   }
// }
// return "failed";

function withdraw(acc: Account | null, amount: number): string {
  if (!acc) return "no account";
  if (!acc.isActive) return "account inactive";
  if (amount > acc.balance) return "insufficient balance";
  acc.balance -= amount;
  return "ok";
}
console.log(withdraw({ isActive: true, balance: 100 }, 150)); // insufficient balance`,
          try: R`دوّر في مشروعك على if جواها if جواها if (بتبان من الـ indent اللي بيزق الكود لليمين). اعكس أول شرط وخلّيه [[return]] بدري، وكرّر لحد ما الكود يبقى مسطّح. واتأكد إن كل حالة غلط بقى ليها رسالة خاصة بيها.`,
          flag: "script",
          deep: {
            why: "الـ if المتداخلة بتخليك تشيل في دماغك كل الشروط اللي فوق عشان تفهم السطر اللي انت فيه، والـ else بتاعة أول if بتبقى بعيدة عنها ٤٠ سطر فمتعرفش هي تبع مين. وغالبًا الحالات الغلط بتتجمع في رسالة واحدة زي failed، فمتعرفش إيه اللي حصل.",
            how: R`الفكرة: اعكس الشرط واخرج. [[if (user) { ...كل الشغل... }]] تبقى [[if (!user) return;]] والشغل تحت.

كل guard بيشيل حالة من دماغك. وبعد [[if (!acc) return]]، TypeScript نفسه بيعرف إن [[acc]] مش null في باقي الدالة (narrowing)، فمش محتاج [[?.]] ولا [[!]] بعد كده. يعني الـ guard clauses بتساعد الـ type checker كمان.

ونفس الفكرة في React: [[if (isLoading) return <Spinner />]] و [[if (error) return <ErrorBox />]] في أول الـ component، والـ JSX الأساسي تحت. وفي Express: [[if (!req.user) return res.status(401).json(...)]] في أول الـ handler.

والقاعدة إن الـ guards في أول الدالة. لو فيه [[return]] مستخبي في نص ١٠٠ سطر، ده مش guard، ده مخرج مفاجئ، وحله إنك تقسّم الدالة.`,
            when: "أي دالة بتتحقق من حاجات قبل ما تشتغل: validation، وصلاحيات، وحالات loading و error في الـ components، وحالات فاضية (array فاضية، أو قيمة null).",
            mistakes: R`تنسى [[return]] بعد [[res.status(401).json()]] في Express، فالكود يكمّل ويحاول يرد تاني، ويطلع [[Cannot set headers after they are sent]]. وتعكس الشرط غلط ([[!a && b]] بدل [[!(a && b)]])، فجرّب كل الحالات الغلط بعد التعديل. وفي React، الـ hooks لازم تبقى قبل أي early return، لأن عدد الـ hooks لازم يفضل ثابت في كل render (قاعدة الـ hooks في تاب React).`
          },
          lines: [
            "شكل الحساب.",
            "بداية الدالة.",
            "مفيش حساب؟ اخرج على طول بسبب واضح.",
            "الحساب موقوف؟ اخرج.",
            "الرصيد مش مكفّي؟ اخرج.",
            "هنا كل الشروط اتحققت، فالشغل الحقيقي على الشمال من غير أي indent.",
            "رجّع النجاح.",
            "قفلة.",
            "بيطبع [[insufficient balance]]، والنسخة القديمة كانت هتقول failed وبس."
          ],
          sol: R`الشكل النهائي: كل الحالات الغلط فوق، كل واحدة سطر [[if (...) return ...]] أو [[throw]]، والشغل الحقيقي في الآخر على أول مستوى indent. في الحل ٦ حالات غلط كل واحدة برسالتها، والناتج [[login required]] ثم [[comments are locked]] ثم [[ok]].

وانت بتعكس الشرط خلي بالك من De Morgan: عكس [[if (user && user.isActive)]] هو [[if (!user || !user.isActive)]]، مش [[!user && !user.isActive]]. ده أشهر غلط في التمرين، وبيخلّي حالة غلط تعدّي من غير ما حد ياخد باله. عشان كده جرّب كل حالة قبل وبعد (اختبار أو [[console.log]] زي آخر ٣ سطور في الحل).

والتمرين مخلّص لما الـ [[return "failed"]] العام اللي كان في آخر الكود القديم يختفي تمامًا: كل return بقى بيقول السبب، وسطر الشغل الحقيقي مابقاش جوه أي if.`,
          solCode: R`type User = { isBanned: boolean; emailVerified: boolean } | null;
type Post = { authorId: string; locked: boolean } | null;

// قبل: if (user) { if (!user.isBanned) { if (post) { if (!post.locked) { ...save; return "ok" } } } } return "error";

function addComment(user: User, post: Post, text: string): string {
  if (!user) return "login required";
  if (user.isBanned) return "user banned";
  if (!user.emailVerified) return "verify your email first";
  if (!post) return "post not found";
  if (post.locked) return "comments are locked";
  if (text.trim() === "") return "empty comment";
  return "ok";
}

const user = { isBanned: false, emailVerified: true };
console.log(addComment(null, null, "hi")); // login required
console.log(addComment(user, { authorId: "1", locked: true }, "hi")); // comments are locked
console.log(addComment(user, { authorId: "1", locked: false }, "hi")); // ok`
        },
        {
          cmd: "magic numbers",
          title: "رقم في نص الكود محدش عارف جه منين",
          desc: R`الـ magic number رقم (أو string) مكتوب في نص الكود من غير اسم: [[if (status === 3)]] أو [[price * 0.14]]. اللي بيقرا مش عارف 3 يعني إيه، ولو الرقم اتغير لازم تدوّر عليه في كل الملفات. الحل constant باسم بيقول المعنى، في مكان واحد.

ومش كل رقم magic: [[0]] و [[1]] في loop، و [[/ 2]] للنص، واضحين لوحدهم.`,
          example: R`// قبل: 0.14 إيه؟ و 3 إيه؟ و 259200000 جه منين؟
// const total = price + price * 0.14;
// if (order.status === 3) deliverAt = Date.now() + 259200000;

const VAT_RATE = 0.14;
const DELIVERY_DAYS = 3;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const OrderStatus = { Pending: "pending", Paid: "paid", Shipped: "shipped" } as const;
type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

function withVat(priceCents: number): number {
  return priceCents + Math.round(priceCents * VAT_RATE);
}
function deliveryDate(status: OrderStatus, now = Date.now()): Date | null {
  return status === OrderStatus.Shipped ? new Date(now + DELIVERY_DAYS * MS_PER_DAY) : null;
}
console.log(withVat(10000), deliveryDate(OrderStatus.Pending)); // 11400 null`,
          try: R`دوّر في مشروعك بـ Ctrl+Shift+F على [[* 0.]] و [[=== 1]] و [[=== 2]] و [[1000 *]]. كل رقم مش واضح لوحده اديله اسم، واتأكد إنه متعرّف في مكان واحد بس.`,
          flag: "script",
          deep: {
            why: R`الرقم من غير اسم بيخبّي المعنى، وبيتكرر. في مشروع حقيقي كانت حسبة الخصم [[(total * percent) / 100]] مكتوبة في أكتر من ٥ أماكن في نفس الملف، و [[3 * 24 * 60 * 60 * 1000]] لتاريخ التوصيل في نص الكود. يوم ما مدة التوصيل تتغير، لازم تفتكر كل الأماكن، وهتنسى واحد.`,
            how: R`الـ constant بيعمل ٣ حاجات: بيدّي الرقم معنى، وبيحطه في مكان واحد (single source of truth)، وبيخلي البحث عنه سهل (دوّر على [[VAT_RATE]] بدل ما تدوّر على [[0.14]] وتلاقي خصم ١٤٪ كمان).

الاسم بـ UPPER_SNAKE_CASE للقيم الثابتة على مستوى الملف، ودي عادة مش قاعدة من اللغة.

للحالات (status و role) استخدم object بـ [[as const]] ونوع طالع منه زي المثال، أو union type على طول ([[type Status = "pending" | "paid"]]). ده بديل [[enum]] بتاع TypeScript، وأحسن النهارده لأن الـ enum بيطلّع كود JavaScript حقيقي، و Node لما بيشغّل [[.ts]] لوحده (type stripping) بيشيل الأنواع بس ومبيفهمش enum. (التفاصيل في تاب TypeScript.)

والإعدادات اللي بتختلف بين بيئة وبيئة (مدة الـ token، والـ URLs، والمفاتيح) مش constants في الكود، دي environment variables.`,
            when: "أي رقم أو string ليه معنى في البيزنس: نسب، ومدد، وحدود (أقصى حجم ملف، وعدد المحاولات)، وحالات، وأدوار.",
            mistakes: R`constant اسمه زي قيمته: [[const FOURTEEN = 0.14]] ملوش أي فايدة، الاسم لازم يقول المعنى مش الرقم. والفلوس بـ float: [[0.1 + 0.2]] بتطلع [[0.30000000000000004]]، فخزّن الفلوس بالقروش كـ integer زي [[priceCents]] في المثال، أو Decimal في الداتابيز. وكل constants المشروع في ملف واحد عملاق: الأحسن كل constant جنب الـ feature اللي بتستخدمه، والمشترك بس في ملف عام.`
          },
          lines: [
            "نسبة الضريبة باسم. لو اتغيرت، بتتغير هنا بس.",
            "أيام التوصيل باسم.",
            "الحسبة مكتوبة بدل رقم غريب: ساعات × دقايق × ثواني × ميلي.",
            "الحالات قيم ثابتة بأسماء. [[as const]] بيخلي كل قيمة نوعها نفسها مش string عام.",
            R`نوع طالع من القيم: [["pending" | "paid" | "shipped"]].`,
            "السعر بالقروش (cents)، عشان الفلوس متتحسبش بكسور.",
            "الضريبة مقرّبة لأقرب قرش.",
            "قفلة.",
            "[[now]] parameter بقيمة افتراضية، فتقدر تختبرها بوقت ثابت.",
            "لو اتشحن: بعد ٣ أيام. غير كده null.",
            "قفلة.",
            "بيطبع [[11400 null]]."
          ],
          sol: R`البحث هيطلّعلك حاجات زي [[* 0.14]] و [[role === 1]] و [[1000 * 60 * 30]] و [[attempts < 5]]. الحل: ملف [[constants.ts]] (أو جنب الـ feature نفسها) فيه [[VAT_RATE]] و [[SESSION_TTL_MS]] و [[MAX_LOGIN_ATTEMPTS]] و [[Role]]، وكل الأماكن تعمل import. ناتج الحل: [[false 1800000 28]].

اختبار «مكان واحد بس»: ابحث تاني بـ Ctrl+Shift+F عن الرقم نفسه ([[0.14]]). المفروض يطلع مرة واحدة، في سطر التعريف. لو لسه طالع في ٣ ملفات، يبقى لسه فيه نسخ هتتنسي أول ما الضريبة تتغير.

متسمّيش كل رقم: [[0]] في [[items.length === 0]] و [[1]] في [[i + 1]] واضحين لوحدهم، و [[const ONE = 1]] مش بيقول حاجة. والغلط التاني إن الاسم يوصف القيمة مش المعنى: [[FOURTEEN_PERCENT]] هتبقى كذبة أول ما النسبة تتغير، إنما [[VAT_RATE]] بيفضل صح. ولاحظ الوحدة في الاسم ([[_MS]])، عشان محدش يحط ثواني مكان ملي ثانية.`,
          solCode: R`// constants.ts: كل رقم ليه معنى متعرّف هنا مرة واحدة، والباقي بيعمل import
export const VAT_RATE = 0.14;
export const SESSION_TTL_MS = 30 * 60 * 1000; // 30 دقيقة
export const MAX_LOGIN_ATTEMPTS = 5;
export const Role = { Admin: "admin", Member: "member" } as const;

// قبل: if (user.role === 1 && attempts < 5) ... expiresAt = now + 1800000
type User = { role: (typeof Role)[keyof typeof Role]; failedAttempts: number };

function canTryLogin(user: User): boolean {
  return user.failedAttempts < MAX_LOGIN_ATTEMPTS;
}
function sessionExpiry(now = Date.now()): number {
  return now + SESSION_TTL_MS;
}

console.log(canTryLogin({ role: Role.Member, failedAttempts: 5 }), sessionExpiry(0), Math.round(200 * VAT_RATE)); // false 1800000 28`
        },
        {
          cmd: "why comments",
          title: "التعليق اللي يستاهل يتكتب",
          desc: R`الكود نفسه بيقول بيعمل إيه. التعليق الكويس بيقول ليه: ليه اخترت الطريقة دي، وليه الرقم ده، وإيه اللي مش باين من الكود (bug في مكتبة، أو شرط من البيزنس، أو حاجة جربتها وفشلت).

والتعليق اللي بيعيد اللي الكود بيقوله ([[i++ // زوّد i]]) زيادة، وبيكدب مع الوقت لأن حد هيغيّر الكود وينسى التعليق.`,
          example: R`// سيئ: بيعيد اللي الكود قايله بالحرف
// حوّل النص لرقم ورجّعه
// return Number(input);

function parseAmount(input: string): number {
  // ليه: العملاء بيكتبوا أرقام عربي زي ١٢٠، و Number("١٢٠") بترجع NaN
  const western = input.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660));
  return Number(western);
}

// تحذير: المزوّد بيحظرك بعد ٥ طلبات في الثانية، فمتصغّرش الرقم ده
const DELAY_BETWEEN_CALLS_MS = 250;

// TODO(#142): شيل الـ workaround ده لما المكتبة تصلّح الـ timezone bug
console.log(parseAmount("١٢٠"), parseAmount("45"), DELAY_BETWEEN_CALLS_MS); // 120 45 250`,
          try: R`اقرا كل التعليقات في ملف عندك. امسح أي تعليق بيعيد اللي الكود قايله، وكل تعليق بيشرح «إيه» حاول تستبدله باسم أوضح أو دالة. وبعدين دوّر على حتة كود غريبة عملتها لسبب (bug، أو طلب من العميل)، واكتب فوقها سطر «ليه».`,
          flag: "script",
          deep: {
            why: R`بعد ٦ شهور، انت نفسك مش هتفتكر ليه كتبت [[setTimeout(fn, 0)]] أو ليه الـ retry ٣ مرات بالظبط. من غير تعليق، اللي بعدك (أو انت) هيشيل الكود «الغريب» ده ويرجّع الـ bug اللي كان بيحله. الكود بيحكي إيه، والتعليق بيحكي ليه، ومحدش تاني هيحكيه.`,
            how: R`أنواع التعليقات اللي تستاهل:

الـ why: سبب اختيار مش واضح. «بنستخدم polling بدل websocket عشان الـ proxy عند العميل بيقفل الاتصالات الطويلة».

التحذير: «الترتيب ده مهم»، أو «الدالة دي بتتنادى من cron كل دقيقة، فخليها سريعة».

الـ TODO برقم ticket أو اسم: [[// TODO(#142): ...]]. من غير رقم بيفضل للأبد.

التوثيق للـ API العام (JSDoc فوق دالة في مكتبة): بيظهر في VS Code لما تحط الماوس على الدالة، ومفيد للكود اللي ناس تانية هتستخدمه.

أما «إيه» فالكود يقوله: لو محتاج تعليق يشرح سطر بيعمل إيه، جرّب الأول اسم أوضح، أو دالة صغيرة اسمها هو التعليق. والقرارات الكبيرة (ليه Postgres مش Mongo) مكانها ADR مش تعليق (المستوى ٣، درس «codebase مش بتاعك»).`,
            when: "كل ما تكتب كود هيستغرب منه حد: workaround، أو رقم ليه سبب، أو ترتيب مهم، أو شرط من العميل. والكود الطبيعي الواضح مش محتاج تعليق.",
            mistakes: R`تعليقات قديمة بتكدب: الكود اتغير والتعليق لأ، ودي أسوأ من مفيش تعليق. وكود متعلّق (commented-out) قاعد شهور «احتياطي»: امسحه، Git فاكره. وتعليق بيعيد الاسم ([[// get user]] فوق [[getUser()]]). وشرح «ليه عملت التغيير ده» مكانه رسالة الـ commit ووصف الـ PR، مش تعليق في الكود.`
          },
          lines: [
            "دالة بتحوّل النص لرقم.",
            "بتبدّل كل رقم عربي (٠ لـ ٩) بالرقم الإنجليزي بتاعه: كود الحرف ناقص كود الصفر العربي.",
            "دلوقتي Number تفهمه.",
            "قفلة.",
            "الرقم ده عليه تحذير، لأن اللي جاي بعدك هيشوفه «بطيء» ويحاول يصغّره.",
            "بيطبع [[120 45 250]]."
          ],
          sol: R`هتلاقي التعليقات بتتقسم ٣ أنواع: (١) بتعيد الكود ([[// increment i]] و [[// get the user]]): تتمسح على طول. (٢) بتشرح «إيه» لكود صعب ([[// check if the user can edit]] فوق شرط طويل): تتحول لاسم، [[const canEdit = ...]] أو دالة [[canEditPost(user)]]، والتعليق يتمسح. (٣) بتشرح «ليه»: تفضل، ودا النوع الوحيد اللي الكود مايقدرش يقوله.

تعليق «ليه» الكويس بيجاوب على سؤال اللي جاي بعدك: «أشيل ده؟». بيقول سبب من برا الكود: bug في مكتبة (ومعاه رابط الـ issue)، أو طلب من العميل (ومعاه رقم الـ ticket)، أو قيد خارجي زي rate limit. مثال: [[// ليه: بوابة الدفع بترفض أكتر من رقمين عشريين، فبنقرّب هنا مش في الواجهة (#231)]].

الغلط الشائع إن التعليق يبقى «ليه» مزيف: [[// ليه: عشان نحسب الضريبة]] ده «إيه» متنكر. ولو مش لاقي سبب تكتبه للحتة الغريبة، اعمل [[git blame]] على السطر واقرا الـ commit اللي دخّلها (تاب git). ولو ملقيتش سبب هناك كمان، غالبًا الحتة دي ممكن تتشال: شيلها في commit لوحده والاختبارات تحكم.`
        }
      ]
    },
    {
      t: "البساطة",
      l: 1,
      n: "متكررش نفسك، بس متجرّدش بدري، ومتبنيش حاجة محدش طلبها",
      items: [
        {
          cmd: "DRY",
          title: "نفس المنطق مكتوب في كذا مكان",
          desc: R`DRY (Don't Repeat Yourself) معناها إن كل قاعدة في البيزنس ليها مكان واحد بس في الكود. لو قاعدة الخصم مكتوبة في ٤ أماكن، يوم ما تتغير هتعدّل ٣ وتنسى الرابع. بس مش «أي سطرين شبه بعض ادمجهم»: القاعدة العملية rule of three، تالت مرة تشوف التكرار اطلّع دالة.

والسؤال الصح: الحتتين دول بيتغيروا مع بعض لنفس السبب؟ لو آه، دي معلومة واحدة ادمجها. لو شبه بعض بالصدفة، سيبهم.`,
          example: R`type Coupon = { type: "percent"; percent: number } | { type: "fixed"; amount: number };

// قبل: نفس الحسبة متنسخة في ٣ أماكن في service الطلبات
// if (coupon.type === "percent") discount = (total * coupon.percent) / 100;
// else discount = Math.min(coupon.amount, total);

function couponDiscount(coupon: Coupon, total: number): number {
  const raw = coupon.type === "percent" ? (total * coupon.percent) / 100 : coupon.amount;
  return Math.min(Math.max(raw, 0), total);
}

console.log(couponDiscount({ type: "percent", percent: 10 }, 500)); // 50
console.log(couponDiscount({ type: "fixed", amount: 800 }, 500)); // 500
console.log(couponDiscount({ type: "percent", percent: 150 }, 500)); // 500`,
          try: R`دوّر في مشروع عندك على حسبة متكررة (خصم، أو تنسيق تاريخ، أو تنسيق سعر بالعملة). اطلّعها في دالة واحدة، واكتب لها ٣ اختبارات vitest (حالة عادية، وحالة حدّية زي الصفر، وحالة غلط)، واستبدل كل النسخ بالنداء عليها.`,
          flag: "script",
          deep: {
            why: R`التكرار مش مشكلة شكل. المشكلة إن القاعدة الواحدة بقى ليها أكتر من نسخة، والنسخ بتختلف مع الوقت. في مشروع حقيقي كانت حسبة خصم الكوبون متنسخة في أكتر من مكان في service الطلبات، وكل نسخة فيها نفس الـ bugs: خصم النسبة مش متقفّل على الإجمالي، والشرط بيعتبر الكوبون نسبة لو خانة النسبة فيها أي قيمة حتى لو نوعه ثابت. تصليح الـ bug محتاج تلاقي كل النسخ الأول.`,
            how: R`DRY عن المعرفة مش عن النص. اتنين validation لـ email في الـ signup وفي الـ profile: دي نفس القاعدة، فتبقى schema واحدة (zod مثلًا) تستخدمها في الاتنين وفي الفرونت كمان. أما [[price * 0.14]] في الضريبة و [[score * 0.14]] في ترتيب المنتجات: نفس الرقم بالصدفة، ولو دمجتهم، يوم ما الضريبة تتغير ترتيب المنتجات هيبوظ.

الـ rule of three (مشهورة من كتاب Refactoring لـ Martin Fowler): أول مرة اكتب، تاني مرة استحمل التكرار وخد بالك، تالت مرة اطلّع دالة. لأن بعد ٣ أمثلة بتعرف إيه الثابت وإيه اللي بيتغير، فالدالة هتطلع صح. لو طلّعتها من أول نسختين، بتخمّن.

والـ abstraction الغلط أسوأ من التكرار. Sandi Metz قالتها: «duplication is far cheaper than the wrong abstraction». الدالة المشتركة اللي بدأت بسيطة، وكل مكان محتاج حاجة مختلفة فبيضيفلها parameter و if، لحد ما تبقى [[formatPrice(value, true, false, 'short', null)]] ومحدش فاهمها. الحل ساعتها إنك ترجّع التكرار (inline) وتعيد التقسيم صح.

وDRY مش في الدوال بس: الأنواع اطلّعها من الـ schema (Prisma بيولّد types، و zod بـ [[z.infer]]) بدل ما تكتبها مرتين، والإعدادات في مكان واحد مش hardcoded في ٣ ملفات.`,
            when: "لما قاعدة بيزنس (خصم، أو صلاحية، أو validation، أو حسبة) تتكتب مرتين. ولما تصلّح bug وتكتشف إنه موجود في نسخة تانية.",
            mistakes: R`تدمج حاجتين شبه بعض بالصدفة فتربطهم ببعض من غير داعي. وتعمل abstraction من أول نسختين، فتبقى دالة فيها flags لكل حالة. ونسخ نفس الـ service بين مشاريع كاملة وكل نسخة بتتعدّل لوحدها: لو ده بيتكرر، الكود المشترك يستاهل package أو monorepo (تاب «فحص الكود»). وفي انترفيو لو اتسألت عن DRY، اذكر الوش التاني (الـ wrong abstraction)، ده اللي بيفرّقك عن اللي حافظ التعريف.`
          },
          lines: [
            "الكوبون يا نسبة يا مبلغ ثابت. [[type]] بيحدد الشكل (discriminated union).",
            "الدالة الوحيدة في المشروع اللي تعرف تحسب خصم كوبون.",
            "النسبة تتحسب من الإجمالي، والثابت زي ما هو.",
            "الخصم عمره ما يبقى سالب ولا أكبر من الإجمالي. القاعدة دي بقت في مكان واحد.",
            "قفلة.",
            "١٠٪ من ٥٠٠: 50.",
            "كوبون ٨٠٠ على طلب ٥٠٠: الخصم 500 مش 800.",
            "كوبون غلط ١٥٠٪: برضه 500. النسخ القديمة كانت هتطلّع خصم أكبر من الطلب."
          ],
          sol: R`الـ ٣ اختبارات خضرا، والنسخ القديمة كلها بقت [[formatPrice(...)]]. وأهم خطوة بعد الاستبدال: ابحث تاني عن شكل النسخ القديمة (مثلًا [[toFixed(2)]] أو [[ج.م]]) واتأكد إن مفيش ولا واحدة فاضلة، وإلا هتصلّح bug في مكان وينفضل في التاني.

الفخ اللي هتقع فيه غالبًا في أول اختبار: [[expected 'EGP 1,250.50' to be 'EGP 1,250.50']]، والاتنين شكلهم واحد بالظبط! [[Intl.NumberFormat]] بيحط non-breaking space ([[ ]]) بعد العملة مش مسافة عادية. الحل إنك تكتبها في الـ expected زي الحل، أو تقارن بـ [[toMatch(/1,250\.50/)]].

وحالة الغلط (سالب أو [[NaN]]) مهمة: من غيرها الفاتورة هتطبع [[EGPNaN]] وانت مش واخد بالك. ولو لقيت إن النسختين «شبه بعض» بس بيختلفوا في قاعدة بيزنس (سعر للعميل بالضريبة وسعر للمورد من غير)، متجمّعهمش بـ boolean parameter: دول حاجتين مختلفتين بالصدفة شبه بعض، والتكرار هنا أرخص من abstraction غلط.`,
          solCode: R`// price.ts
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });

export function formatPrice(cents: number): string {
  if (!Number.isFinite(cents) || cents < 0) throw new RangeError($__btinvalid price: $__{cents}$__bt);
  return egp.format(cents / 100);
}

// price.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./price";

describe("formatPrice", () => {
  it("formats a normal price", () => {
    expect(formatPrice(125050)).toBe("EGP\u00a01,250.50");
  });
  it("handles zero", () => {
    expect(formatPrice(0)).toBe("EGP\u00a00.00");
  });
  it("rejects negative and NaN", () => {
    expect(() => formatPrice(-1)).toThrow(RangeError);
    expect(() => formatPrice(NaN)).toThrow("invalid price");
  });
});`
        },
        {
          cmd: "KISS و YAGNI",
          title: "أبسط حل يشتغل، ومتبنيش حاجة محدش طلبها",
          desc: R`KISS (Keep It Simple): اختار أبسط حل يحل المشكلة اللي قدامك، والكود «الذكي» اللي محتاج ١٠ دقايق تفهمه أسوأ من ٥ سطور عادية. و YAGNI (You Aren't Gonna Need It): متبنيش حاجة عشان «يمكن نحتاجها بعدين»، لأن أغلب «بعدين» ده مبيجيش، واللي بيجي بيجي بشكل مختلف عن اللي خمّنته.

الاتنين مع بعض: ابني المطلوب النهارده بأبسط شكل، واكتبه نضيف كفاية إنه يتغير بسهولة لما الطلب الجديد يوصل.`,
          example: R`// KISS، قبل: "ذكي" ومحدش يفهمه من غير ورقة وقلم
const isWeekendClever = (d: Date) => ((0b1100000 >> d.getDay()) & 1) === 1;

// KISS، بعد: الجمعة والسبت (getDay: الأحد 0 ... السبت 6)
const WEEKEND_DAYS = [5, 6];
const isWeekend = (d: Date) => WEEKEND_DAYS.includes(d.getDay());

// YAGNI: عملة واحدة في التطبيق؟ يبقى formatter واحد، مش نظام عملات "للمستقبل"
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
const formatPrice = (amount: number) => egp.format(amount);

const friday = new Date(2026, 8, 25);
console.log(isWeekendClever(friday), isWeekend(friday), formatPrice(1250.5)); // true true EGP 1,250.50`,
          try: R`دوّر في مشروعك على حاجة اتبنت «للمستقبل»: interface ليها implementation واحد، أو parameter كل اللي بينادوه بيبعتوله نفس القيمة، أو إعداد محدش غيّره. شيلها وبسّط، وشوف كام سطر راح من غير ما أي حاجة تبوظ.`,
          flag: "script",
          deep: {
            why: "كل سطر بتكتبه لازم حد يقراه ويختبره ويصونه ويفهمه قبل ما يعدّل جنبه. الحاجات اللي اتبنت «احتياطي» بتتكلف دلوقتي (وقت، وتعقيد، و bugs) عشان فايدة ممكن متجيش. والكود المعقد بيبطّأ كل تعديل بعد كده، مش التعديل الأول بس.",
            how: R`YAGNI (من Extreme Programming) مش ضد التصميم الكويس. الفرق بين «قرار بيسهّل التغيير» و «ميزة لسه محدش طلبها»: إنك تفصل حسبة الضريبة في دالة لوحدها ده تصميم كويس ومش مكلّف. إنك تبني نظام ضرايب بيدعم ٣٠ دولة وعميلك في دولة واحدة ده YAGNI.

علامات إنك بتبني للمستقبل: interface ليها implementation واحد ومفيش خطة لتاني، أو parameter كل اللي بينادوه بيبعتوا نفس القيمة، أو config لحاجة محدش بيغيّرها، أو «framework» داخلي لحاجة بتتعمل مرتين.

و KISS معناها كمان: استخدم اللي موجود في اللغة بدل ما تكتبه. [[Intl.NumberFormat]] بدل دالة تنسيق أرقام بتكتبها بإيدك، و [[structuredClone]] بدل deep copy يدوي. والكود الواضح اللي أطول بسطرين أحسن من السطر «الذكي»: الـ bitmask في المثال شغال، بس اللي هيقراه لازم يحوّل الرقم لـ binary في دماغه.

والفكرة مش إنك متفكرش في المستقبل. فكّر فيه، واكتب الكود بحيث يبقى سهل تغيّره (دوال صغيرة واختبارات)، بس متبنيهوش قبل ما ييجي.`,
            when: "مع كل قرار تصميم. اسأل: مين طلب ده؟ وإيه اللي هيحصل لو ما عملتوش النهارده؟ لو الإجابة «مفيش حاجة، هنعمله لما نحتاجه»، يبقى استنى.",
            mistakes: R`تفهم YAGNI إنها «متكتبش اختبارات» أو «متفصلش الكود»: دي حاجات بتسهّل التغيير، مش ميزات زيادة. وتعمل microservices لمشروع فيه مطوّر واحد و ١٠٠ مستخدم، و monolith مترتب أبسط بكتير (تاب «بناء مشروع كامل»). وفي الناحية التانية: تتجاهل قرارات صعب تغيّرها بعدين، زي إن الفلوس تتخزن بالقروش، أو إن الـ IDs تبقى UUID لو هتعمل sync بين أجهزة. دي قرارات أول يوم مش YAGNI.`
          },
          lines: [
            "بيشتغل، بس لازم تحوّل الرقم لـ binary في دماغك عشان تعرف إنه الجمعة والسبت.",
            "الأيام بأسماء واضحة في array.",
            "نفس النتيجة، ويتقري من أول نظرة.",
            "formatter جاهز في اللغة نفسها ([[Intl]])، بدل دالة تنسيق مكتوبة باليد.",
            "دالة صغيرة للتطبيق كله. لو يوم ما اتضافت عملة، تبقى parameter ساعتها.",
            "يوم جمعة للتجربة (الشهور في Date بتبدأ من 0، فـ 8 يعني سبتمبر).",
            "بيطبع [[true true]] والسعر متنسّق بالعملة."
          ],
          sol: R`اللي بيتلاقي كتير: [[interface PriceFormatter]] ليها class واحد بس، أو parameter [[currency]] كل الـ ٢٣ نداء بيبعتوا فيه [[EGP]]، أو [[options]] object محدش بيبعت فيه غير القيم الافتراضية. في الحل التلاتة بقوا دالة واحدة سطر واحد، و [[formatPrice(99.5)]] بترجع [[EGP 99.50]].

بعد الحذف شغّل [[tsc --noEmit]] والاختبارات: لو كله أخضر يبقى الحاجة دي ماكانتش بتعمل حاجة. و [[git diff --stat]] هيوريك كام سطر راح، وعادةً بيبقى أكتر من المتوقع.

متشيلش interface عليها اتنين implementations حقيقيين (in-memory للاختبارات و Prisma للإنتاج مثلًا): دي مستخدمة فعلًا ومش YAGNI. والسؤال اللي تسأله لنفسك (وتقوله في الانترفيو): «لو احتجتها بعدين، إضافتها هتبقى صعبة؟». لو الإجابة refactor ساعة، شيلها دلوقتي. الاستثناء: الحاجات الغالية تتغير بعدين، زي شكل الـ public API أو الـ database schema.`,
          solCode: R`// قبل: interface ليها implementation واحد، و parameter كل الناس بتبعتله "EGP"
// interface PriceFormatter { format(amount: number, currency: string): string }
// class DefaultPriceFormatter implements PriceFormatter { format(a, c) { ... } }
// const formatter: PriceFormatter = new DefaultPriceFormatter();
// formatter.format(total, "EGP");  // 23 نداء، كلهم "EGP"

// بعد: دالة واحدة، ولما عملة تانية تيجي فعلًا نضيف الـ parameter وقتها
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
export const formatPrice = (amount: number) => egp.format(amount);

console.log(formatPrice(99.5)); // EGP 99.50`
        }
      ]
    },
    {
      t: "الأخطاء",
      l: 1,
      n: "اقع بدري وبصوت عالي، وسمّي كل نوع خطأ، ومتبلعش خطأ أبدًا",
      items: [
        {
          cmd: "fail fast",
          title: "ارفض الداتا الغلط أول ما تدخل",
          desc: R`fail fast معناها: أول ما تكتشف إن فيه حاجة غلط، وقّف وقول بوضوح. متكمّلش بداتا غلط على أمل إنها تعدّي، لأنها هتقع بعدين في مكان بعيد وبرسالة ملهاش علاقة بالسبب.

وأهم مكان ليه هو الحدود (boundaries): الـ request اللي جاي من برا، والـ env variables وقت التشغيل، والرد من API خارجي. افحصهم عند الباب، وجوه الكود ثق في الأنواع.`,
          example: R`function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error($__btMissing env var $__{name}$__bt);
  return value;
}

type Transfer = { from: string; to: string; amount: number };
function parseTransfer(body: unknown): Transfer {
  const b = (body ?? {}) as Partial<Transfer>;
  if (typeof b.from !== "string" || typeof b.to !== "string") throw new TypeError("from/to required");
  if (typeof b.amount !== "number" || b.amount <= 0) throw new RangeError("amount must be > 0");
  return { from: b.from, to: b.to, amount: b.amount };
}

process.env.PAYMENT_KEY = "YOUR_KEY";
console.log(requireEnv("PAYMENT_KEY")); // YOUR_KEY
console.log(parseTransfer({ from: "a", to: "b", amount: -5 })); // RangeError: amount must be > 0`,
          try: R`في مشروع Express أو Next عندك، اعمل ملف [[env.ts]] بيقرا كل الـ env variables المطلوبة بـ [[requireEnv]] ويصدّرهم. امسح متغير من [[.env]] وشغّل: لازم التطبيق يقع وهو بيقوم برسالة فيها الاسم، مش بعد ساعة في أول request.`,
          flag: "script",
          deep: {
            why: R`الغلط اللي بيتكتشف متأخر غالي. [[undefined]] دخل من الـ request، وعدّى على ٣ دوال، واتخزن في الداتابيز، وبعد أسبوع صفحة التقارير وقعت بـ [[Cannot read properties of undefined]]. دلوقتي انت بتدوّر على السبب في كود ملوش ذنب. لو كان اترفض عند الباب، كنت هتعرف في نفس اللحظة ومن الرسالة نفسها.`,
            how: R`الفكرة: التحقق عند الحدود، والثقة جوه. الـ body في Express نوعه الحقيقي [[unknown]] مهما كتبت type، لأن TypeScript مبيشتغلش وقت التشغيل ومش هيمنع حد يبعت أي JSON. عشان كده الدالة اللي بتستقبله لازم تفحصه وتطلّع نوع مضمون.

عمليًا بتستخدم مكتبة schema زي zod بدل الـ if اليدوية: [[z.object({ amount: z.number().positive() })]] و [[schema.parse(body)]] بترمي خطأ فيه كل الخانات الغلط، وبتطلّعلك النوع من الـ schema نفسها بـ [[z.infer]] (التفاصيل في تاب «Backend بـ Node»). المثال هنا يدوي عشان تشوف اللي بيحصل جوه.

الـ env variables: اقراهم مرة وقت التشغيل وافحصهم كلهم، فالتطبيق يرفض يقوم لو ناقصه حاجة. أحسن ما يقوم «سليم» ويقع أول ما حد يدفع.

والـ assertions جوه الكود ([[if (!order) throw new Error('order must exist here')]]) للحالات اللي «مستحيل» تحصل: لو حصلت يبقى فيه bug، والأحسن تعرف فورًا بدل ما الكود يكمّل بحالة غلط.

وfail fast مش معناها إن السيرفر كله يقع مع أي خطأ: الـ request الغلط بيترفض بـ 400 والسيرفر يفضل شغال. اللي بيقع بدري هو العملية الغلط، مش السيستم.`,
            when: "أي داتا جاية من برا الكود بتاعك: request body و query، و env، ورد من API خارجي، وملفات بيرفعها المستخدم، وداتا من localStorage.",
            mistakes: R`تستخدم [[as Transfer]] على الـ body وتفتكره فحص: [[as]] بيقول لـ TypeScript «صدّقني» ومبيفحصش حاجة. وقيم افتراضية بتخبّي المشكلة: [[process.env.JWT_SECRET || 'dev-secret']] في الإنتاج معناها إن السيرفر شغال بسر معروف لأي حد قرا الكود، ودي ثغرة. و [[try/catch]] حوالين كل حاجة بيرجّع null، فالخطأ يتحوّل لـ null ماشي في الكود ويقع بعدين برضه.`
          },
          lines: [
            "دالة بتجيب env variable ولازم تلاقيه.",
            "اقرا القيمة.",
            "مش موجودة؟ اقع حالًا واكتب اسم المتغير الناقص.",
            "رجّعها string مضمون، مش [[string | undefined]].",
            "قفلة.",
            "شكل التحويل اللي جوه الكود هيثق فيه.",
            "الـ body جاي من برا فنوعه [[unknown]]: مفيش أي حاجة مضمونة.",
            "بنقراه كـ Partial عشان نفحص كل خانة، ولو null نبدأ بـ object فاضي.",
            "من أو لـ مش string؟ ارفض.",
            "المبلغ مش رقم، أو صفر، أو سالب؟ ارفض.",
            "من هنا ورايح الداتا مضمونة، ونوعها [[Transfer]].",
            "قفلة.",
            "للتجربة بس: حط قيمة في الـ env.",
            "بيطبع [[YOUR_KEY]].",
            "بيقع بـ [[RangeError]] قبل ما أي فلوس تتحرك."
          ],
          sol: R`لما كل المتغيرات موجودة هتشوف [[listening on 3000]]. ولما تمسح [[JWT_SECRET]] من [[.env]]، التطبيق يقع وهو بيقوم، قبل ما يسمع على أي port، بـ [[Error: Missing env var JWT_SECRET]] و exit code 1. ده المطلوب: الـ deploy يفشل فورًا والرسالة فيها اسم المتغير.

الشرط إن [[env.ts]] يتعمله import في أول الـ server، وإن باقي الكود يقرا [[env.JWT_SECRET]] مش [[process.env.JWT_SECRET]]. ابحث عن [[process.env]] في المشروع: أي مكان فاضل برا [[env.ts]] هو متغير مش متفحوص. ولو بتقرا [[.env]] بـ dotenv لازم [[import "dotenv/config"]] يبقى قبل [[env.ts]]، أو شغّل بـ [[node --env-file=.env]].

الغلط الشائع: تنادي [[requireEnv]] جوه دالة بتشتغل وقت الـ request (جوه [[signToken()]] مثلًا)، فالتطبيق يقوم عادي ويقع في أول login. وكمان [[process.env.PORT]] دايمًا string، فلو محتاج رقم حوّله وافحص إنه مش [[NaN]]. ولو المشروع فيه Zod، [[z.object({...}).parse(process.env)]] بيعمل نفس الفكرة لكل المتغيرات مرة واحدة وبيطلّع كل الناقص في رسالة واحدة.`,
          solCode: R`// env.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error($__btMissing env var $__{name}$__bt);
  return value;
}

export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  PORT: Number(process.env.PORT ?? 3000),
};

// server.ts
import { env } from "./env"; // أول import: لو ناقص حاجة، التطبيق يقع هنا قبل ما يسمع على أي port
console.log($__btlistening on $__{env.PORT}$__bt);`
        },
        {
          cmd: "custom errors",
          title: "كل نوع خطأ ليه اسم ومعاملة",
          desc: R`بدل [[throw new Error('not found')]] وبعدين تقارن نص الرسالة، اعمل class لكل نوع خطأ مهم ([[NotFoundError]] و [[ValidationError]] و [[PaymentDeclinedError]])، وفرّق بينهم بـ [[instanceof]]. وفي مكان واحد (error handler) بتحوّل كل نوع لـ status code، والـ services متعرفش حاجة عن HTTP.`,
          example: R`class AppError extends Error {
  status = 500;
}
class NotFoundError extends AppError {
  override status = 404;
  override name = "NotFoundError";
}

function toHttp(err: unknown): { status: number; body: string } {
  if (err instanceof AppError) return { status: err.status, body: err.message };
  console.error(err);
  return { status: 500, body: "Internal error" };
}
console.log(toHttp(new NotFoundError("Order 7 not found"))); // { status: 404, body: 'Order 7 not found' }
console.log(toHttp(new TypeError("x is undefined")).status); // 500`,
          try: R`في مشروع Express عندك، اعمل [[AppError]] و [[NotFoundError]] و [[ValidationError]]، واكتب error middleware واحد بـ ٤ parameters [[(err, req, res, next)]] بيعمل زي [[toHttp]] ويتحط آخر حاجة. امسح كل [[res.status(404)]] المتفرقة في الـ controllers وخلّي الـ service ترمي [[NotFoundError]].`,
          flag: "script",
          deep: {
            why: R`لو كل الأخطاء [[Error]] عادي، مفيش طريقة تفرّق بينهم غير إنك تقرا الرسالة: [[if (e.message.includes('not found'))]]، ويوم ما حد يغيّر الرسالة أو يترجمها، الكود ده يبوظ من غير ما حد ياخد باله. وكمان الـ service بتبقى مضطرة ترد HTTP بنفسها، فمينفعش تناديها من cron job أو script.`,
            how: R`في JavaScript تقدر ترمي أي حاجة ([[throw 'oops']])، بس ارمي دايمًا Error أو class وارث منه، عشان يبقى معاه [[stack]] يقولك الخطأ حصل فين.

[[instanceof]] بيمشي على سلسلة الـ prototype: [[NotFoundError]] هو [[AppError]] وهو [[Error]]. فالـ catch يقدر يمسك نوع معين، أو كل أخطاء التطبيق مرة واحدة زي [[toHttp]].

التقسيم المهم نوعين: أخطاء متوقعة (operational) زي مش موجود، أو داتا غلط، أو الدفع اترفض، أو API خارجي واقع. دي جزء من البيزنس، ليها status ورسالة للمستخدم. وأخطاء مش متوقعة (bugs) زي [[TypeError]] من [[undefined]]: دي 500 برسالة عامة، والتفاصيل في اللوج بس، لأن الـ stack فيه مسارات ملفات وممكن أسرار.

في Express، الـ error middleware بياخد ٤ parameters وبيتحط بعد كل الـ routes، وفي Express 5 أي promise بترفض في handler بتوصله لوحدها من غير [[next(err)]] يدوي (التفاصيل في تاب «Backend بـ Node»). وعلى الفرونت، Next فيه [[error.tsx]] و React فيه error boundaries لنفس الفكرة.

وفيه أسلوب تاني للأخطاء المتوقعة: متعملش throw خالص، ورجّعها كقيمة ([[Result]]): نوع يا نجاح يا فشل، والـ TypeScript يجبر اللي بينادي يفحص الاتنين (تاب TypeScript، درس «generic types و defaults»).`,
            when: "أول ما يبقى عندك أكتر من نوع خطأ ليه معاملة مختلفة: 404 و 400 و 409 و 402. وفي أي مكتبة أو SDK بتكتبه، عشان اللي بيستخدمه يمسك أخطاءك بالنوع.",
            mistakes: R`ترجّع [[err.message]] أو [[err.stack]] للمستخدم في كل الأخطاء، فتسرّب تفاصيل السيرفر. وتعمل [[catch (e) { throw new Error('failed') }]] فتضيّع النوع والـ stack الأصلي (الحل [[cause]]، في الدرس الجاي). و [[instanceof]] بيفشل لو فيه نسختين من نفس المكتبة في [[node_modules]]، لأن كل نسخة ليها class مختلف. ومع [[strict]] في tsconfig، الـ [[e]] في الـ catch نوعها [[unknown]]، فافحصها بـ [[instanceof]] قبل ما تقرا [[e.message]].`
          },
          lines: [
            "أساس كل أخطاء التطبيق اللي احنا عارفينها.",
            "كل خطأ معروف معاه status، والافتراضي 500.",
            "قفلة.",
            "خطأ «مش موجود» بيورث من الأساس.",
            "الـ status بتاعه 404. [[override]] بتقول إننا قاصدين نغيّر قيمة موجودة في الأب.",
            "الاسم بيظهر في اللوج والـ stack بدل Error عادي.",
            "قفلة.",
            "المكان الوحيد اللي بيحوّل الأخطاء لـ HTTP. النوع [[unknown]] لأن أي حاجة ممكن تترمي في JavaScript.",
            "خطأ من أخطاءنا؟ رجّع الـ status والرسالة بتاعته.",
            "أي حاجة تانية bug مش متوقع: التفاصيل تتسجل في اللوج...",
            "...والمستخدم ياخد 500 برسالة عامة.",
            "قفلة.",
            "بيطبع 404 والرسالة.",
            "خطأ مش بتاعنا: 500، وتفاصيله في اللوج بس."
          ],
          sol: R`بـ curl هتشوف: [[/orders/7]] بـ 200، و [[/orders/99]] بـ 404 و [[Order 99 not found]]، و [[/orders/abc]] بـ 422، و [[/boom]] بـ 500 ورسالة عامة [[Internal error]] (والتفاصيل الحقيقية في console السيرفر بس). والـ route نفسه سطر واحد ومفيهوش ولا [[res.status]].

لو الـ middleware مش بيتنادى و Express بيرد بصفحة HTML فيها stack trace، يبقى واحد من ٣: الـ middleware متسجّل قبل الـ routes مش بعدها، أو ليه ٣ parameters بس (Express بيعرف الـ error middleware من إن ليه ٤، حتى لو [[_next]] مش مستخدم)، أو الخطأ اترمى من callback برا الـ handler (زي [[setTimeout]]) فمحدش مسكه.

في Express 5 الـ async handler اللي بيرمي بيوصل للـ middleware لوحده. في Express 4 لازم [[next(err)]] أو try/catch، وإلا الطلب بيفضل معلّق. ومتنساش [[name]] في كل class: من غيره [[err.name]] بيبقى [[Error]] في الـ logs وفي الرد.`,
          solCode: R`import express, { type Request, type Response, type NextFunction } from "express";

class AppError extends Error {
  status = 500;
}
class NotFoundError extends AppError {
  override status = 404;
  override name = "NotFoundError";
}
class ValidationError extends AppError {
  override status = 422;
  override name = "ValidationError";
}

// الـ service بترمي، ومتعرفش حاجة عن HTTP
const orders = new Map([["7", { id: "7", total: 250 }]]);
function getOrder(id: string) {
  if (!/^\d+$/.test(id)) throw new ValidationError($__btInvalid order id: $__{id}$__bt);
  const order = orders.get(id);
  if (!order) throw new NotFoundError($__btOrder $__{id} not found$__bt);
  return order;
}

const app = express();
app.get("/orders/:id", (req, res) => {
  res.json(getOrder(req.params.id)); // مفيش res.status(404) هنا خالص
});
app.get("/boom", () => {
  throw new TypeError("x is undefined");
});

// آخر حاجة، و ٤ parameters عشان Express يعرف إنه error middleware
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) return res.status(err.status).json({ error: err.name, message: err.message });
  console.error(err);
  res.status(500).json({ error: "InternalError", message: "Internal error" });
});

app.listen(3000, () => console.log("http://localhost:3000"));`
        },
        {
          cmd: "catch {}",
          title: "خطأ اتبلع ومحدش عرف إنه حصل",
          desc: R`[[catch {}]] الفاضي بيقول «لو حصل أي خطأ، اعمل نفسك مشفتش». الكود يكمّل كأن كل حاجة تمام، والنتيجة داتا ناقصة أو عملية متعملتش ومحدش يعرف ليه. في الـ catch يا تعالج الخطأ فعلًا، يا تضيف معلومة وترميه تاني بـ [[cause]]، يا متعملش catch خالص وسيبه يطلع للي فوق.`,
          example: R`// قبل: لو الـ JSON بايظ، الإعدادات بتبقى undefined ومحدش يعرف ليه
// let config; try { config = JSON.parse(text); } catch {}

function parseConfig(text: string): { port: number } {
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("config.json is not valid JSON", { cause: err });
  }
}

try {
  parseConfig("{ port: 3000 }");
} catch (err) {
  const e = err as Error;
  console.log(e.message, "| cause:", (e.cause as Error).message);
}`,
          try: R`دوّر في مشروعك على [[catch {}]] و [[catch (e) {}]] و [[.catch(() => {})]]. لكل واحد قرّر: أعالجه، ولا أسجّله وأكمّل بقيمة بديلة، ولا أشيل الـ catch خالص. واكتب في كل catch فضل سطر «ليه».`,
          flag: "script",
          deep: {
            why: R`الخطأ اللي اتبلع أصعب bug ممكن تدوّر عليه، لأن مفيش أي أثر: لا لوج، ولا رسالة، ولا exit code. الـ feature ببساطة مش شغالة. وفي مشروع حقيقي (تطبيق desktop) كان إنشاء فولدر اللوجات وكتابة لوج الجلسة جوه [[catch {}]] فاضية، فلو الصلاحيات غلط، التطبيق بيشتغل عادي واللوجات مبتتكتبش خالص، ومحدش هيكتشف ده غير يوم ما يحتاجها.`,
            how: R`عندك ٤ اختيارات بس، واختار واحد بوعي:

١. متعملش catch. سيب الخطأ يطلع لحد مكان عارف يعمل حاجة (الـ error handler في Express، أو error boundary في React). ده الصح في أغلب الحالات.

٢. ضيف سياق وارمي تاني: [[throw new Error('failed to load user 42', { cause: err })]]. الـ [[cause]] (من ES2022) بيحفظ الخطأ الأصلي بالـ stack بتاعه، و Node بيطبع الاتنين لما الخطأ يوصل للآخر من غير ما حد يمسكه.

٣. عالج فعلًا: retry لطلب شبكة فشل، أو قيمة بديلة مقصودة («الـ theme في localStorage بايظة؟ استخدم الافتراضي»)، بس سجّلها بـ [[console.warn]].

٤. تجاهل مقصود ومكتوب: حالات قليلة التجاهل فيها صح (تقفل اتصال مقفول أصلًا، أو [[localStorage]] بيرمي في private browsing). اكتب تعليق بيقول ليه، عشان اللي بعدك يعرف إنه قرار مش كسل.

والـ promises نفس الكلام: [[.catch(() => {})]] بلع، و promise من غير [[await]] ولا catch ممكن ترفض وتقفل Node كله ([[unhandledRejection]]). وقاعدة [[no-floating-promises]] في typescript-eslint بتمسك ده (تاب «فحص الكود»).`,
            when: "كل مرة تكتب catch، اسأل: أنهي اختيار من الأربعة؟ ولو مش عارف، سيبه يطلع.",
            mistakes: R`[[catch (e) { console.log(e) }]] وتكمّل عادي: ده بلع بشياكة، السطر بيتوه في اللوج والكود بيكمّل بحالة غلط. و [[catch (e) { throw new Error('something went wrong') }]] من غير cause، فالـ stack الأصلي ضاع. و [[return null]] في الـ catch، فاللي نادى مش عارف null معناها «مش موجود» ولا «حصل خطأ». وفي انترفيو لو اتسألت «بتتعامل مع الأخطاء إزاي؟»، قول: الأخطاء المتوقعة ليها أنواع ومعاملة، والمش متوقعة بتطلع لـ handler واحد بيسجّلها ويرد رد عام، ومفيش catch فاضي.`
          },
          lines: [
            "دالة بتقرا الإعدادات من نص.",
            "جرّب.",
            "لو الـ JSON سليم، رجّعه.",
            "لو باظ، امسك الخطأ...",
            "...وارمي خطأ جديد بيقول إيه اللي فشل من وجهة نظرنا، والأصلي جواه في [[cause]]، فمفيش حاجة ضاعت.",
            "قفلة الـ catch.",
            "قفلة الدالة.",
            "هنا بنجرّب JSON غلط (المفتاح من غير علامات تنصيص).",
            "النداء.",
            "هنا المكان اللي فعلًا عارف يعمل إيه بالخطأ.",
            "[[err]] نوعها [[unknown]]، فبنقول إنها Error.",
            "الرسالة بتاعتنا، وبعدها السبب الأصلي من [[JSON.parse]].",
            "قفلة."
          ],
          sol: R`كل catch فاضي هيطلع واحد من ٣ قرارات، وده شكلهم في الحل: (١) قيمة بديلة: cache أو localStorage بايظ، تسجّل [[console.warn]] وترجّع default، والناتج [[bad theme cache, using default: ...]] ثم [[light]]. (٢) تعالجه: خطأ متوقع ليه معنى (كوبون مش موجود يعني [[null]])، بس بتفحص نوعه وترمي أي حاجة تانية، فالناتج [[discount: null]] للـ 404 و [[rethrown: ECONNRESET]] لقطع الشبكة. (٣) تشيله: الـ catch كان بيخبّي فشل لازم يوقف العملية، زي فشل الدفع.

المقياس: بعد التمرين مفيش catch في المشروع من غير قرار من التلاتة، وكل واحد فوقه سطر «ليه».

الغلط الشائع: تحوّل [[catch {}]] لـ [[catch (e) { console.log(e) }]] وتعتبره خلص. ده لسه بلع: الكود بيكمّل كأن كل حاجة تمام، بس بقى فيه سطر في log محدش بيقراه. والغلط التاني إن الـ catch في (٢) يلقط كل حاجة من غير ما يفحص، فانقطاع النت يظهر للمستخدم «الكوبون غلط».`,
          solCode: R`// ١) أسجّل وأكمّل بقيمة بديلة: الـ cache مش ضروري، لو باظ نجيب من المصدر
function readCachedTheme(raw: string | null): string {
  try {
    return JSON.parse(raw ?? "null")?.theme ?? "light";
  } catch (err) {
    // ليه: localStorage ممكن يبقى فيه نسخة قديمة بايظة، والـ default كفاية
    console.warn("bad theme cache, using default:", (err as Error).message);
    return "light";
  }
}

// ٢) أعالجه: خطأ متوقع ليه معنى في البيزنس
async function findCoupon(code: string, load: (c: string) => Promise<number>): Promise<number | null> {
  try {
    return await load(code);
  } catch (err) {
    // ليه: الـ API بترجع 404 للكوبون الغلط، ودي مش مشكلة، ده «مفيش خصم»
    if (err instanceof Error && err.message === "404") return null;
    throw err; // أي حاجة تانية (شبكة، 500) مش شغلتي هنا
  }
}

// ٣) أشيل الـ catch خالص: كان بيبلع خطأ لازم يوقف العملية
// قبل: try { await chargeCard(order) } catch {}  ← الطلب بيتشحن من غير فلوس
// بعد: await chargeCard(order);  والـ error middleware هو اللي يرد

console.log(readCachedTheme("{broken"));
findCoupon("NOPE", async () => { throw new Error("404"); }).then((d) => console.log("discount:", d));
findCoupon("X", async () => { throw new Error("ECONNRESET"); }).catch((e) => console.log("rethrown:", e.message));`
        }
      ]
    },
    {
      t: "الـ state والـ side effects",
      l: 1,
      n: "الداتا متتغيرش من تحت إيدك، والحسبة بعيدة عن الداتابيز والشبكة",
      items: [
        {
          cmd: "immutability",
          title: "متعدّلش الداتا، اعمل نسخة جديدة",
          desc: R`immutability معناها إنك متعدّلش object أو array موجود، وبدل كده تعمل نسخة جديدة فيها التغيير: [[{ ...user, name: 'Ali' }]] بدل [[user.name = 'Ali']]، و [[[...items, newItem]]] بدل [[items.push(newItem)]]. لأن الـ object ممكن يكون متشارك في أكتر من مكان، والتعديل في مكان بيغيّره في الكل من غير ما حد يعرف.

و React أصلًا مبيشوفش التغيير لو عدّلت نفس الـ object، لأنه بيقارن بالمرجع (reference).`,
          example: R`type Cart = { readonly items: readonly string[]; readonly coupon?: string };

const cart: Cart = { items: ["book"] };

// قبل: بيعدّل الأصل، وأي حد ماسك cart اتغير عنده من غير ما يعرف
// cart.items.push("pen");

const withPen: Cart = { ...cart, items: [...cart.items, "pen"] };
const withCoupon: Cart = { ...withPen, coupon: "SAVE10" };
const sorted = withPen.items.toSorted();

console.log(cart.items, withPen.items, withCoupon.coupon, sorted);
// [ 'book' ] [ 'book', 'pen' ] SAVE10 [ 'book', 'pen' ]

const settings = Object.freeze({ theme: "dark" });
// settings.theme = "light";  خطأ في TypeScript، ووقت التشغيل مبيتغيرش`,
          try: R`في component React عندك فيه [[useState]] لـ array أو object، دوّر على [[push]] أو [[splice]] أو تعديل خانة مباشر قبل الـ setter. جرّب التعديل المباشر وشوف الشاشة مش بتتحدث، وبعدين النسخة الجديدة بالـ spread وشوفها بتتحدث.`,
          flag: "script",
          deep: {
            why: R`لما الداتا بتتعدّل من أكتر من مكان، مبقاش فيه حد يقدر يقولك قيمتها إيه في لحظة معينة من غير ما يتتبع كل اللي لمسها. bugs زي «الكارت اتغير لوحده» سببها غالبًا array متشاركة: حد اتعمل له نسخة من المرجع مش من الداتا، وعدّل فيها. ومع immutability، عشان تعرف الداتا اتغيرت، بتقارن المرجع بس ([[prev !== next]])، وده اللي React و Zustand و Redux مبنيين عليه.`,
            how: R`الـ objects والـ arrays في JavaScript بتتنقل بالمرجع: [[const b = a]] مش نسخة، ده اسم تاني لنفس الحاجة في الذاكرة، وأي تعديل من [[b]] بيبان في [[a]].

الـ spread ([[...]]) بيعمل shallow copy: المستوى الأول بس جديد. لو جوه الـ object فيه object تاني، النسخة والأصل لسه متشاركين فيه. عشان كده لما تعدّل حاجة عميقة، تنسخ كل مستوى في الطريق: [[{ ...user, address: { ...user.address, city: 'Cairo' } }]]. ولو عايز نسخة عميقة كاملة: [[structuredClone(obj)]] (موجودة في Node والمتصفحات).

الدوال اللي بتعدّل الأصل ([[push]] و [[pop]] و [[splice]] و [[sort]] و [[reverse]]) ليها بدايل بترجع array جديدة: spread، و [[filter]]، و [[toSorted]] و [[toReversed]] و [[toSpliced]] و [[with(index, value)]] (من ES2023).

و [[const]] مش immutability: بيمنع إنك تربط الاسم بقيمة تانية، بس المحتوى يتعدّل عادي. اللي بيمنع التعديل: [[readonly]] و [[Readonly<T>]] و [[as const]] في TypeScript (وقت الكتابة بس)، و [[Object.freeze]] وقت التشغيل (وبرضه shallow). وفي ملفات ES modules (أو strict mode) الكتابة على object متجمّد بترمي [[TypeError]]، وفي غيرها بتتجاهل بسكوت.`,
            when: "الـ state في React أو أي store. الداتا اللي بتتشارك بين دوال أو modules. الإعدادات. وأي دالة بتاخد array أو object: متعدّلش الـ input بتاعها.",
            mistakes: R`[[items.sort()]] على array جاية من props أو state: بتعدّل الأصل، والـ UI يا مبيتحدثش يا بيتحدث غلط. و [[const]] وتفتكر الـ object بقى ثابت. و spread مستوى واحد وانت بتعدّل حاجة عميقة، فتعدّل في الأصل من غير ما تاخد بالك. ومش لازم كل حاجة immutable: متغير محلي جوه دالة بتبني فيه array بـ [[push]] وترجّعه في الآخر ده تمام، محدش تاني شايفه.`
          },
          lines: [
            "[[readonly]] بيخلي TypeScript يمنع أي تعديل على الخانات والـ array نفسها ([[push]] مش موجودة على array متعلّم readonly).",
            "الكارت الأصلي.",
            "نسخة جديدة: كل الخانات زي ما هي ([[...cart]])، والـ items array جديدة فيها القديم و pen.",
            "نسخة من النسخة بكوبون. الأصل والنسخة اللي قبلها زي ما هم.",
            "[[toSorted]] بترجع array جديدة مترتبة، عكس [[sort]] اللي بترتّب الأصل نفسه.",
            "الأصل لسه فيه book بس.",
            "[[Object.freeze]] بيقفل الـ object وقت التشغيل كمان، مش بس في TypeScript."
          ],
          sol: R`شغّلت الحل في jsdom، وده اللي حصل بالظبط: البداية [[1 todos]]، وبعد زرار [[add (wrong)]] فضلت [[1 todos]]. الـ push عدّل الـ array، بس [[setTodos(todos)]] بعت نفس المرجع، و React بيقارن بـ [[Object.is]] فشاف إن مفيش تغيير ومرسمش. وبعد زرار [[add]] الصح الشاشة بقت [[3 todos]] مش ٢! لأن العنصر اللي اتعمله push كان موجود فعلًا في الـ array، وظهر مع أول render جه بعده.

ده اللي بيخلي الـ bug ده مرعب في مشروع حقيقي: الداتا بتظهر «متأخرة» مع ضغطة زرار ملهاش علاقة، فتدوّر على المشكلة في المكان الغلط. والحل نسخة جديدة دايمًا: [[setTodos(prev => [...prev, item])]] للإضافة، و [[map]] مع [[{ ...t, done: !t.done }]] للتعديل، و [[filter]] للمسح، و [[toSorted]] بدل [[sort]].

وخد بالك إن الـ spread بينسخ أول مستوى بس: لو عدّلت [[t.address.city]] مباشرة لسه بتعدّل الأصل. ولو عملت [[prev.push]] جوه [[setTodos(prev => ...)]]، الـ StrictMode في التطوير بيشغّل الـ updater مرتين فالعنصر يتضاف مرتين: دي علامة إنك بتعدّل مش بتنسخ.`,
          solCode: R`import { useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export function Todos() {
  const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "buy milk", done: false }]);

  // غلط: بيعدّل نفس الـ array، و React بيقارن بـ Object.is فبيلاقيه هو هو ومش بيرسم
  function addWrong(text: string) {
    todos.push({ id: Date.now(), text, done: false });
    setTodos(todos);
  }

  // صح: array جديدة، ولو بتعدّل عنصر: object جديد للعنصر ده بس
  function add(text: string) {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
  }
  function toggle(id: number) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function remove(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <p>{todos.length} todos</p>
      <button id="wrong" onClick={() => addWrong("pen")}>add (wrong)</button>
      <button id="right" onClick={() => add("pen")}>add</button>
      <button id="toggle" onClick={() => toggle(1)}>toggle</button>
      <button id="remove" onClick={() => remove(1)}>remove</button>
    </>
  );
}`
        },
        {
          cmd: "pure functions",
          title: "الحسبة لوحدها، والداتابيز والشبكة على الأطراف",
          desc: R`الـ pure function بترجع نفس النتيجة لنفس المدخلات، ومبتعملش أي side effect: مبتقراش داتابيز، ولا بتكتب ملف، ولا بتعدّل متغير برّاها، ولا بتعتمد على [[Date.now()]] أو [[Math.random()]].

الفكرة العملية اسمها functional core, imperative shell: قواعد البيزنس في دوال pure سهل تفهمها وتختبرها، والـ I/O في طبقة رفيعة برّا بتجيب الداتا، وتنادي الدوال الـ pure، وتحفظ أو تبعت النتيجة.`,
          example: R`type Sale = { amount: number; refunded: boolean };

// core: pure. مفيش I/O ولا وقت ولا random، ومبتعدّلش المدخلات
const netRevenue = (sales: readonly Sale[]): number =>
  sales.filter((s) => !s.refunded).map((s) => s.amount).reduce((sum, a) => sum + a, 0);

// shell: بيجيب ويبعت بس، ومفيهوش أي قرار
async function dailyReport(load: () => Promise<Sale[]>, send: (msg: string) => void) {
  const sales = await load();
  send($__btRevenue today: $__{netRevenue(sales)}$__bt);
}

const fakeLoad = async () => [
  { amount: 10, refunded: false },
  { amount: 5, refunded: true },
];
dailyReport(fakeLoad, console.log); // Revenue today: 10`,
          try: R`اختار دالة في مشروعك فيها حسبة و [[await prisma...]] أو [[fetch]] في نفس المكان. اطلّع الحسبة لدالة pure بتاخد الداتا كـ parameter، واكتب لها اختبار vitest من غير أي mock. قارن بصعوبة اختبار الدالة الأصلية.`,
          flag: "script",
          deep: {
            why: R`الدالة اللي بتحسب وبتكلم الداتابيز في نفس الوقت مينفعش تختبرها غير لو عندك داتابيز أو mocks كتير. ولو فيها [[new Date()]]، نتيجتها بتتغير كل يوم، فالاختبار ينجح النهارده ويقع بكرة. الـ pure function بتختبرها بسطر: مدخلات ونتيجة متوقعة. ولما يحصل bug، بتكرره بنفس المدخلات بالظبط.`,
            how: R`الـ side effect أي حاجة الدالة بتعملها غير إنها ترجع قيمة: تكتب في داتابيز أو ملف، أو تبعت request، أو تطبع، أو تعدّل parameter أو متغير global، أو تقرا حاجة بتتغير لوحدها (الوقت، و random، و env).

الـ pure function ليها صفتين: deterministic (نفس المدخلات نفس النتيجة دايمًا)، ومفيش side effects. والنتيجة إنك تقدر تناديها أي عدد مرات، أو تحفظ نتيجتها (memoization)، أو تشغّلها بالتوازي من غير قلق.

البرنامج من غير side effects ملوش لازمة، فالهدف مش إنك تلغيها، الهدف إنك تزقها للأطراف. الترتيب: هات الداتا (I/O)، احسب (pure)، احفظ أو ابعت (I/O). والقرارات كلها في الجزء الـ pure.

الوقت و random: خدهم كـ parameter ([[now = Date.now()]]) بدل ما تقراهم جوه الدالة. في الإنتاج بياخد القيمة الافتراضية، وفي الاختبار بتبعت وقت ثابت.

والـ pipeline ([[filter]] ثم [[map]] ثم [[reduce]]) أسلوب functional: كل خطوة دالة صغيرة بترجع نسخة جديدة، والسلسلة بتتقري زي وصف للي عايزه. بس لو الـ array ضخمة جدًا، كل خطوة بتعمل array مؤقتة، فساعتها loop واحد أسرع (قيس الأول، تاب DSA).`,
            when: "حسابات الأسعار والخصومات والضرايب، والتحقق من الصلاحيات، وتحويل الداتا (من شكل الداتابيز لشكل الـ API)، و reducers في React. أي منطق بيزنس.",
            mistakes: R`دالة شكلها pure بس بتعدّل الـ input ([[items.sort()]] جوه دالة حسبة)، فاللي نادى عليها اتغيرت الداتا عنده. و [[Date.now()]] مستخبية جوه حسبة، فالاختبارات بتقع في آخر الشهر بس. وفي React، الـ render نفسه لازم يبقى pure (مفيش fetch ولا تعديل state جواه)، والـ side effects مكانها event handlers و [[useEffect]]، و StrictMode بيعمل render مرتين في التطوير عشان يكشف ده.`
          },
          lines: [
            "شكل البيعة.",
            "دالة pure: بتاخد array وترجع رقم. [[readonly]] بيضمن إنها مش هتعدّل فيها.",
            "pipeline: شيل المرتجع، وخد المبالغ، واجمعهم. filter و map كل واحدة بترجع array جديدة، و reduce بترجع الرقم النهائي.",
            "الـ shell: الدالة اللي بتكلم العالم. الـ load والـ send جايين من برا، فتقدر تبدّلهم.",
            "I/O: هات الداتا.",
            "نادِ الحسبة الـ pure، وابعت النتيجة (I/O تاني).",
            "قفلة.",
            "بدل الداتابيز في التجربة: دالة بترجع داتا ثابتة.",
            "بيعة عادية.",
            "بيعة اترجعت.",
            "قفلة.",
            "شغّل التقرير، و [[console.log]] مكان الإيميل. بيطبع [[Revenue today: 10]]."
          ],
          sol: R`الـ ٣ اختبارات خضرا، ومن غير [[vi.mock]] ولا داتابيز ولا [[await]]: بتبعت array و object وتقارن رقم. قارن ده باختبار الدالة الأصلية: كنت محتاج mock لـ [[prisma.order.findUnique]] يرجّع شكل الـ include بالظبط، ولو حد غيّر الـ query (زوّد [[select]] مثلًا) الاختبار يقع مع إن الحسبة سليمة.

والـ shell اللي فضل ([[invoiceForOrder]]) سطرين: يجيب ويبعت للدالة. ده مش محتاج unit test، بيتغطى باختبار integration واحد على داتابيز حقيقية (درس «هرم الاختبارات»).

علامة إن الفصل ناقص: الدالة الـ pure لسه بتنادي [[new Date()]] أو [[Math.random()]] أو بتعدّل الـ array اللي داخلالها. الوقت يدخل parameter ([[now: Date]]) وكذلك الـ random. والغلط التاني إنك تبعت الـ order كله زي ما Prisma رجّعه: ابعت اللي الدالة محتاجاه بس ([[lines]] و [[customer]])، فالأنواع تبقى صغيرة والاختبار يبني الداتا في سطر.`,
          solCode: R`// invoice.ts
export type Line = { price: number; qty: number };
export type Customer = { isVip: boolean };

// قبل: async function invoiceTotal(orderId) { const order = await prisma.order.findUnique(...); ...حسبة...; }
// بعد: الحسبة pure، والـ I/O برا
export function invoiceTotal(lines: readonly Line[], customer: Customer): number {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const discount = customer.isVip && subtotal >= 1000 ? subtotal * 0.1 : 0;
  return subtotal - discount;
}

// الـ shell: سطرين، ومفيهوش قرار
// export async function invoiceForOrder(id: string) {
//   const order = await prisma.order.findUniqueOrThrow({ where: { id }, include: { lines: true, customer: true } });
//   return invoiceTotal(order.lines, order.customer);
// }

// invoice.test.ts
import { it, expect } from "vitest";
import { invoiceTotal } from "./invoice";

it("no discount for normal customers", () => {
  expect(invoiceTotal([{ price: 600, qty: 2 }], { isVip: false })).toBe(1200);
});
it("10% for VIP from 1000", () => {
  expect(invoiceTotal([{ price: 500, qty: 2 }], { isVip: true })).toBe(900);
});
it("no VIP discount under 1000", () => {
  expect(invoiceTotal([{ price: 999, qty: 1 }], { isVip: true })).toBe(999);
});`
        }
      ]
    },
    {
      t: "Code smells",
      l: 1,
      n: "علامات إن الكود محتاج refactoring، وأمثلة حقيقية من مشاريع اتبنت بسرعة",
      items: [
        {
          cmd: "code smells",
          title: "علامات إن الكود محتاج يتصلّح",
          desc: R`الـ code smell علامة مش bug: الكود شغال، بس شكله بيقول إن تعديله هيبقى صعب. أشهرهم: دالة طويلة، وكود متكرر، و parameters كتير، و boolean بيقلب سلوك الدالة، و god object، وأرقام من غير أسماء، وكود ميت محدش بيناديه.

المثال بيصلّح اتنين مع بعض: ٥ parameters ورا بعض (سهل تبدّل اتنين من نفس النوع ومحدش ياخد باله) بقوا object بأسماء، والـ boolean اللي كان بيقلب الدالة بقى دالة تانية باسمها.`,
          example: R`// قبل: 5 parameters ورا بعض، وآخرهم boolean محدش فاهمه من برا
// createUser("you@example.com", "Ali", "0100", 30, true);  الاسم والإيميل متبدّلين، و true دي إيه؟

type NewUser = { name: string; email: string; phone?: string };

function createUser({ name, email, phone = "" }: NewUser) {
  return { id: crypto.randomUUID(), name, email, phone, role: "member" as const };
}
function createAdmin(user: NewUser) {
  return { ...createUser(user), role: "admin" as const };
}

const admin = createAdmin({ email: "you@example.com", name: "Ali" });
console.log(admin.name, admin.role); // Ali admin`,
          try: R`دوّر في مشروعك على دالة بتاخد ٤ parameters أو أكتر، أو نداء فيه [[true]] أو [[false]] أو [[undefined, undefined]]. حوّلها لـ object parameter (أو لدالتين لو الـ boolean بيقسمها نصين)، وسيب TypeScript يدلّك على كل الأماكن اللي محتاجة تتغير.`,
          flag: "script",
          deep: {
            why: R`الـ smells بتدّيك لغة ومقياس. بدل «الكود ده وحش»، تقول «الدالة دي بتاخد ٦ parameters وفيها flag»، ودي حاجة محددة ليها علاج معروف. ومهمة في الـ code review، وفي الانترفيو لما يدّيك كود ويقولك «إيه رأيك فيه؟».`,
            how: R`أشهر الـ smells وعلاجها (من كتاب Refactoring):

دالة طويلة: Extract Function (درس «small functions»).
كود متكرر: دالة واحدة من تالت مرة (درس DRY).
parameters كتير: Parameter Object زي المثال. ولو نفس المجموعة بتتنقل مع بعض في كل مكان ([[lat, lng]] أو [[startDate, endDate]])، دي data clump، اعملها نوع لوحدها.
flag argument ([[render(true)]]): لو بيختار بين سلوكين مختلفين، دالتين بأسماء. ولو بيعدّل تفصيلة، options بأسماء ([[listUsers({ includeDeleted: true })]]). ولو الاختيار بيتحدد وقت التشغيل، union ([[format: 'csv' | 'json']]) وجدول من القيمة للدالة، وده strategy في أبسط شكل (المستوى ٢، درس «over-engineering»).
booleans متعارضة ([[isLoading]] و [[isError]] و [[isSuccess]] مع بعض): حالة واحدة [[status: 'loading' | 'error' | 'success']]، فالتركيبات المستحيلة تبقى مستحيلة في النوع نفسه.
god object: قسّمه على المسؤولية (الدرس الجاي).
primitive obsession: كل حاجة string و number، فـ [[userId]] و [[orderId]] ممكن يتبدّلوا. العلاج أنواع أدق (تاب TypeScript).
feature envy: دالة بتقرا من object تاني أكتر من نفسها: انقلها جنب الداتا.
shotgun surgery: تغيير صغير محتاج تعدّل ١٠ ملفات: المعلومة متفرقة، لمّها.
dead code: دوال و exports محدش بيناديها: امسحها (Git فاكرها)، وأداة زي knip بتلاقيها.

ولما تفك الـ object في الـ parameters ([[{ name, email }: NewUser]])، TypeScript بيتأكد إن الخانات المطلوبة موجودة، وإن مفيش خانة غلط لو بتبعت object literal مباشرة.`,
            when: "في الـ code review، وقبل ما تضيف ميزة في كود قديم (نضّف الحتة اللي هتشتغل فيها الأول)، ولما حاجة بسيطة تاخد وقت أطول من المتوقع لأن «الكود معقد».",
            mistakes: R`تعامل الـ smell كقانون: مش كل دالة ٣٠ سطر محتاجة تتقسم، ومش كل boolean parameter غلط ([[force = false]] بقيمة افتراضية في job مقبول لحد ما يتضاف تاني وتالت). الـ smell سؤال: «ده بيصعّب التغيير هنا؟». وتقسّم لدالتين وتنسخ الكود المشترك فيهم، والصح إن واحدة تبني على التانية زي [[createAdmin]]. وrefactoring ضخم لكل الـ smells في نفس PR فيه ميزة جديدة، فالمراجعة تبقى مستحيلة: الـ refactoring في PR لوحده ومعاه اختبارات.`
          },
          lines: [
            "الـ parameters بقت نوع واحد بأسماء، والتليفون اختياري ([[?]]) بدل ما تبعت [[undefined]] في النص.",
            "الدالة بتاخد object وتفكّه، والاختياري ليه قيمة افتراضية.",
            R`بترجّع user عادي. [[as const]] بيخلي النوع [["member"]] بالظبط مش أي string.`,
            "قفلة.",
            "الأدمن دالة لوحده بدل [[createUser(..., true)]]، والنداء نفسه بيقول بيعمل إيه.",
            "بتبني على العادية وبتغيّر الـ role بس، فمفيش كود متكرر.",
            "قفلة.",
            "النداء بالأسماء: الترتيب مبقاش يفرق، ومستحيل تبدّل الاسم بالإيميل.",
            "بيطبع [[Ali admin]]."
          ],
          sol: R`بعد ما تغيّر التوقيع لـ object، شغّل [[tsc --noEmit]]: TypeScript هيطلّع خطأ في كل نداء قديم لسه بيبعت parameters ورا بعض، ودي بالظبط قايمة الأماكن اللي محتاجة تتغير. خلّصها لحد ما تبقى صفر. ولو فيه boolean زي [[isHtml]] بيقسم الدالة نصين، الحل دالتين ([[sendHtml]] و [[sendText]]) زي الحل. الناتج [[text/html undefined]] ثم [[support@example.com]]: الخانات الاختيارية ([[cc]] و [[replyTo]]) بقت بالاسم، ومفيش [[undefined, undefined]].

الغلط الشائع إنك تعمل object parameter بـ type [[any]] أو [[Record<string, unknown>]]: كده خسرت الـ checklist، ونداء فيه [[{ emial: ... }]] بغلطة إملائية هيعدّي. استخدم type مسمّى زي [[Email]]، و TypeScript هيطلّع خطأ على الخانة الغلط.

وفي الانترفيو: «ليه object parameter؟» الإجابة: النداء بيتقري من غير ما تفتح الدالة، والترتيب مبقاش مهم فمينفعش تبدّل الاسم والإيميل، وتقدر تضيف خانة اختيارية من غير ما تكسر ولا نداء قديم.`,
          solCode: R`// قبل: sendEmail("you@example.com", "Welcome", "<h1>Hi</h1>", undefined, undefined, true);
// آخر true دي «html»؟ ولا «urgent»؟ والـ undefined دي إيه؟

type Email = { to: string; subject: string; body: string; cc?: string[]; replyTo?: string };

function sendText(email: Email) {
  return { ...email, contentType: "text/plain" };
}
function sendHtml(email: Email) {
  return { ...email, contentType: "text/html" };
}

const sent = sendHtml({ to: "you@example.com", subject: "Welcome", body: "<h1>Hi</h1>" });
console.log(sent.contentType, sent.cc); // text/html undefined
console.log(sendText({ to: "you@example.com", subject: "Hi", body: "x", replyTo: "support@example.com" }).replyTo);`
        },
        {
          cmd: "god object",
          title: "ملف واحد شايل كل حاجة",
          desc: R`الـ god object (أو god component في React) حاجة واحدة شايلة مسؤوليات كتير ملهاش علاقة ببعض. أي تعديل في أي feature بيعدّي عليها، وكل الناس بتتخانق عليها في الـ merge conflicts، ومحدش فاهمها كلها. العلاج: قسّم على المسؤولية مش على الحجم، فكل feature في hook أو component أو module لوحده، والأب بيجمّعهم.`,
          example: R`import { useState } from "react";

// قبل: الـ checkout فيه 44 useState، منهم 6 للكوبون لوحده
// const [couponCode, setCouponCode] = useState(""); const [couponLoading, ...] ...

type CouponState = { status: "idle" | "loading" | "valid" | "invalid"; discount: number };

export function useCoupon(validate: (code: string) => Promise<number | null>) {
  const [state, setState] = useState<CouponState>({ status: "idle", discount: 0 });
  async function apply(code: string) {
    setState({ status: "loading", discount: 0 });
    const discount = await validate(code);
    setState(discount === null ? { status: "invalid", discount: 0 } : { status: "valid", discount });
  }
  return { ...state, apply };
}

// الأب بقى بيجمّع بس: const coupon = useCoupon(api.validateCoupon); const shipping = useShipping();`,
          try: R`افتح أكبر component عندك واعدّ الـ [[useState]] والـ [[useEffect]]. جمّع اللي بيتغيروا مع بعض (كل حاجة ليها علاقة بالكوبون مثلًا)، واطلّعهم في custom hook لوحده، وشوف الـ component الأصلي خسر كام سطر.`,
          flag: "script",
          deep: {
            why: R`الملف الضخم بيتكوّن تدريجيًا: كل feature جديدة «هنحطها هنا بسرعة». في مشروع حقيقي كانت صفحة الـ checkout component واحد أكتر من ٦٠٠٠ سطر فيه ٤٤ [[useState]] و ٢٦ [[useEffect]]: كوبونات، ومدة اشتراك، وإضافات، وطرق دفع، ورفع إيصال. وفي الـ backend ملف admin service واحد فيه أكتر من ٨٠ دالة لكل جداول المشروع، والاتنين اتنسخوا زي ما هم لمشاريع تانية. أي تعديل بسيط محتاج تفهم آلاف السطور، وأي state ممكن يبوّظ feature تانية، واستحالة تكتب اختبار لحتة واحدة.`,
            how: R`الـ god object عكس Single Responsibility (أول مبدأ في SOLID): كل module يبقى ليه سبب واحد يتغير.

إزاي تقسّم component ضخم: جمّع الـ state اللي بيتغير مع بعض في custom hook زي [[useCoupon]]. واطلّع كل جزء UI بيعرض حاجة واحدة في component لوحده ([[CouponBox]] و [[PaymentMethods]] و [[OrderSummary]]). والحسابات (الإجمالي بعد الخصم) دوال pure برّا الـ component خالص. والأب بيبقى «مايسترو»: بينادي الـ hooks ويوزّع على الأطفال.

ولاحظ في المثال إن ٤ booleans للكوبون (loading و valid و error و ...) بقوا [[status]] واحد، فمستحيل الكوبون يبقى «بيحمّل» و «مرفوض» في نفس الوقت.

وإزاي تقسّم service ضخم: كل feature ليها module ([[users.service]] و [[orders.service]] و [[coupons.service]])، والـ admin routes تنادي الـ services دي بدل ما يبقى ليها service خاص فيه نسخة تانية من كل حاجة.

ومتقسّمش مرة واحدة. كل مرة تلمس الملف عشان feature، اطلّع الحتة اللي بتشتغل فيها بس، ودي اسمها boy scout rule: سيب الكود أنضف شوية من ما لقيته. وقبل ما تقسّم كود حساس زي الـ checkout، اكتب اختبار e2e بيغطي الحالة الأساسية (المستوى ٣، درس «هرم الاختبارات»).`,
            when: "لما الملف يعدّي كام مية سطر وفيه أكتر من feature، أو لما كل PR بيلمس نفس الملف، أو لما تعمل scroll كتير عشان تلاقي الـ state اللي بتدوّر عليها.",
            mistakes: R`تقسّم على الشكل مش المعنى: [[Checkout1.tsx]] و [[Checkout2.tsx]] كل واحد ٣٠٠٠ سطر. وتطلّع hooks بس تسيبها تعتمد على بعض بـ ١٠ parameters. و prop drilling لعمق ٥ مستويات بعد التقسيم، وساعتها context أو store صغير لحالة الـ checkout أحسن (تاب React). وفي الناحية التانية: متعملش ٥٠ ملف لـ feature بسيطة، التقسيم لما يبقى فيه سبب.`
          },
          lines: [
            "من React.",
            "حالة الكوبون كلها في نوع واحد، والـ status قيمة واحدة بدل كذا boolean.",
            "custom hook مسؤول عن الكوبون بس. الـ validate جاية من برا (API حقيقي، أو fake في الاختبار).",
            "state واحدة بدل ٦.",
            "الفعل الوحيد اللي الـ hook بيعرضه.",
            "ابدأ التحميل.",
            "اسأل السيرفر: الكوبون ده بيخصم كام؟",
            "null يعني مرفوض، غير كده مقبول بالخصم.",
            "قفلة apply.",
            "الـ component ياخد الحالة والفعل بس، ومش شايف التفاصيل.",
            "قفلة."
          ],
          sol: R`الـ component الكبير هتلاقي فيه عادةً ٣ أو ٤ مجموعات state بتتغير مع بعض: الكوبون (الكود، والتحميل، والخطأ، والخصم)، والشحن، والدفع. كل مجموعة تبقى custom hook زي [[useCoupon]] في الحل، والـ component يبقى [[const coupon = useCoupon(api.validateCoupon)]] ويعرض بس. جرّبت الـ hook لوحده: [[save50]] بمسافات بترجع [[valid 50]]، و [[nope]] بترجع [[invalid 0]].

التقسيم صح لو الـ hook مش محتاج state من الأب غير اللي بيتبعتله، والـ component مابقاش فيه ولا [[useState]] ليه علاقة بالكوبون. ولو الـ hook محتاج [[setShipping]] من الأب عشان يشتغل، يبقى المجموعتين مش مستقلين فعلًا: يا تدمجهم، يا الـ hook ياخد callback.

الغلط الشائع: hook واحد [[useCheckout]] فيه كل الـ state. ده نقل الـ god object لملف تاني من غير ما يقسمه. ولو الـ hook بيرجّع ١٥ حاجة، يبقى لسه شايل أكتر من مسؤولية.`,
          solCode: R`import { useState } from "react";

type CouponState = { status: "idle" | "loading" | "valid" | "invalid"; discount: number };

// hooks/useCoupon.ts: كل حاجة الكوبون في مكان واحد
export function useCoupon(validate: (code: string) => Promise<number | null>) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<CouponState>({ status: "idle", discount: 0 });
  async function apply() {
    setState({ status: "loading", discount: 0 });
    const discount = await validate(code.trim().toUpperCase());
    setState(discount === null ? { status: "invalid", discount: 0 } : { status: "valid", discount });
  }
  return { code, setCode, ...state, apply };
}

// Checkout.tsx: بيجمّع بس، ومبقاش فيه ولا useState للكوبون
export function Checkout({ subtotal, validateCoupon }: { subtotal: number; validateCoupon: (c: string) => Promise<number | null> }) {
  const coupon = useCoupon(validateCoupon);
  return (
    <form onSubmit={(e) => { e.preventDefault(); coupon.apply(); }}>
      <input value={coupon.code} onChange={(e) => coupon.setCode(e.target.value)} />
      <button disabled={coupon.status === "loading"}>Apply</button>
      {coupon.status === "invalid" && <p role="alert">Invalid coupon</p>}
      <output>Total: {subtotal - coupon.discount}</output>
    </form>
  );
}`
        }
      ]
    },
    {
      t: "التصميم في كود حقيقي",
      l: 2,
      n: "composition و dependency injection من غير framework، و refactoring من غير ما تكسر حاجة، وإمتى الـ pattern يبقى زيادة",
      items: [
        {
          cmd: "composition ولا inheritance",
          title: "تركّب قطع صغيرة بدل شجرة وراثة",
          desc: R`الوراثة ([[extends]]) بتقول «ده نوع من ده»، والـ composition بتقول «ده معاه ده». في الكود الحقيقي أغلب اللي محتاجه «معاه»: الـ notifier معاه قنوات، والقناة معاها retry، مش «SMS notifier بـ retry هو نوع من SMS notifier».

المشكلة في الوراثة إنها بتتضاعف: قناتين (email و SMS) وسلوكين (retry و log) يبقوا ٤ classes، وتالت قناة تبقى ٦. ومع الـ composition كل حاجة قطعة لوحدها، وبتركّبهم وقت الإنشاء: [[withRetry(sendSms)]].`,
          example: R`// قبل: class لكل تركيبة، وكل قناة جديدة بتضاعف العدد
// class RetryingEmailNotifier extends EmailNotifier {}  class LoggedRetryingSmsNotifier extends RetryingSmsNotifier {}

type Send = (to: string, text: string) => Promise<void>;

const sendEmail: Send = async (to, text) => console.log("email →", to, text);
let smsCalls = 0;
const sendSms: Send = async (to, text) => {
  if (++smsCalls === 1) throw new Error("SMS gateway timeout");
  console.log("sms →", to, text);
};

function withRetry(send: Send, times = 3): Send {
  return async (to, text) => {
    for (let attempt = 1; ; attempt++) {
      try {
        return await send(to, text);
      } catch (err) {
        if (attempt === times) throw err;
      }
    }
  };
}

class Notifier {
  constructor(private readonly channels: Send[]) {}
  notify(to: string, text: string) {
    return Promise.all(this.channels.map((send) => send(to, text)));
  }
}

const notifier = new Notifier([sendEmail, withRetry(sendSms)]);
notifier.notify("ali", "Order #7 shipped").then(() => console.log("sms calls:", smsCalls));`,
          try: R`كمّل على المثال: اعمل [[withLog(send, channel)]] بتطبع اسم القناة ونجحت ولا فشلت والوقت اللي أخدته، وضيف قناة [[sendPush]] جديدة من غير ما تعمل ولا class. وبعدين خلّي قناة SMS تفشل دايمًا، وغيّر [[Notifier]] بحيث فشل قناة ميمنعش الباقي.`,
          sol: R`[[withLog]] نفس شكل [[withRetry]] بالظبط: دالة بتاخد [[Send]] وترجع [[Send]]. بتسجّل الوقت قبل النداء، وتطبع [[push ok in 0ms]] لو نجح، ولو فشل تطبع [[sms failed: SMS gateway timeout]] وترمي الخطأ تاني (متبلعهوش، درس «catch {}»). وعشان هي والـ retry نفس النوع، بتركّبهم بأي ترتيب: [[withLog(withRetry(sendSms), 'sms')]] بيسجّل مرة واحدة بعد كل المحاولات، و [[withRetry(withLog(sendSms, 'sms'))]] بيسجّل كل محاولة.

والقناة الجديدة سطر واحد، ومفيش أي class جديدة. وعشان فشل قناة ميوقفش الباقي، [[Promise.all]] بتتغير لـ [[Promise.allSettled]]، فالناتج يبقى [[fulfilled]] للـ push و [[rejected]] للـ SMS، والـ push وصل. الغلط المشهور إنك تسيب [[Promise.all]]: أول قناة تفشل بترفض الـ promise كلها، والـ caller يفتكر إن ولا إشعار وصل مع إن الـ push وصل فعلًا.`,
          solCode: R`type Send = (to: string, text: string) => Promise<void>;

function withLog(send: Send, channel: string): Send {
  return async (to, text) => {
    const started = Date.now();
    try {
      await send(to, text);
      console.log($__bt$__{channel} ok in $__{Date.now() - started}ms$__bt);
    } catch (err) {
      console.log($__bt$__{channel} failed: $__{(err as Error).message}$__bt);
      throw err;
    }
  };
}

const sendPush: Send = async (to, text) => console.log("push →", to, text);
const sendSms: Send = async () => { throw new Error("SMS gateway timeout"); };

const channels = [withLog(sendPush, "push"), withLog(sendSms, "sms")];
Promise.allSettled(channels.map((send) => send("ali", "Order #7 shipped"))).then((results) =>
  console.log(results.map((r) => r.status)), // [ 'fulfilled', 'rejected' ]
);`,
          flag: "script",
          deep: {
            why: R`شجرة الوراثة بتقفل قرارات بدري: لما تعمل [[RetryingEmailNotifier extends EmailNotifier]]، الـ retry بقى متربط بالـ email للأبد، ولو عايزه للـ SMS هتنسخه أو تعمل class تالتة. وأي تعديل في الأب بيوصل لكل الأبناء، حتى اللي مكانوش عايزينه (fragile base class). والـ composition بتخلي كل سلوك قطعة لوحده، تختبره لوحده وتركّبه في أي مكان.`,
            how: R`القطع هنا دوال بنفس الشكل ([[Send]])، والـ «decorator» دالة بتاخد [[Send]] وترجع [[Send]] بسلوك زيادة. وعشان المدخل والمخرج نفس النوع، بتلفّهم جوه بعض بأي عدد وأي ترتيب. ده نفس اللي بتعمله middleware في Express، و higher-order functions عمومًا.

و [[Notifier]] هنا class عادية بس مبتورثش من حد: بتاخد قنواتها في الـ constructor (ودي dependency injection، الدرس الجاي). يعني السؤال مش «classes ولا functions»، السؤال «بتورث سلوك ولا بتستلمه».

إمتى الوراثة صح: لما العلاقة «نوع من» حقيقية ومستقرة، والأب صغير، وكل ابن ينفع يتحط مكان الأب من غير ما حاجة تبوظ (ودي L في SOLID: Liskov). أمثلة: [[NotFoundError extends AppError]] (درس «custom errors»)، أو class بتورث من حاجة الـ framework طالبها. غير كده، ابدأ بالـ composition.

وفي React نفس الفكرة: مفيش حد بيعمل [[class AdminButton extends Button]]. بتعمل [[Button]] بياخد props و children، وبتركّب.`,
            when: "أول ما تلاقي نفسك بتعمل class جديدة عشان «نفس القديمة + سلوك واحد»، أو أول ما شجرة الوراثة تعدّي مستويين. والسلوكيات اللي بتتحط حوالين أي حاجة (retry و cache و log و timeout) مكانها decorators مش أبناء.",
            mistakes: R`تورث عشان تاخد دالتين helper من الأب («كل الـ services بتورث من BaseService عشان فيها logger»): ده بيربط كل حاجة بكل حاجة، والصح تمرر الـ logger. وتعمل override لـ method بتغيّر معناها (ابن [[ReadOnlyList]] بيرمي خطأ في [[add]])، فأي كود شغال مع الأب يقع مع الابن. وفي الانترفيو لو اتسألت «composition over inheritance يعني إيه؟»: قول إن الوراثة بتربط السلوك بالنوع وقت الكتابة، والـ composition بتخليك تختار السلوك وقت الإنشاء، ومعاك مثال زي الـ retry ده.`
          },
          lines: [
            "نوع واحد لكل القنوات: دالة بتاخد مين والرسالة وبترجع promise.",
            "قناة الإيميل (هنا بتطبع بس بدل ما تبعت).",
            "عدّاد عشان نشوف الـ retry اشتغل كام مرة.",
            "قناة SMS مزيفة...",
            "...بتفشل أول مرة بس، زي gateway بيعمل timeout ساعات.",
            "وتنجح من تاني مرة.",
            "قفلة.",
            "decorator: بياخد أي قناة ويرجّع قناة بنفس الشكل بس بتعيد المحاولة.",
            "القناة الجديدة.",
            "loop من غير شرط، والخروج بالـ return أو الـ throw.",
            "جرّب.",
            "نجحت؟ رجّع وخلاص.",
            "فشلت؟",
            "لو دي آخر محاولة، ارمي الخطأ الأصلي. غير كده الـ loop يكمّل.",
            "قفلة الـ catch.",
            "قفلة الـ loop.",
            "قفلة الدالة الراجعة.",
            "قفلة withRetry.",
            "الـ Notifier مبيورثش من حد، بيستلم قنواته.",
            "القنوات بتيجي من برا، و [[private readonly]] بيعمل الخاصية ويمنع تغييرها.",
            "الفعل الوحيد: ابعت على كل القنوات.",
            "كل القنوات مع بعض، واستنى الكل.",
            "قفلة.",
            "قفلة الـ class.",
            "التركيب وقت الإنشاء: email عادي، و SMS ملفوف بـ retry. ولا class جديدة.",
            "بيطبع الإيميل والـ SMS، وبعدين [[sms calls: 2]]: أول مرة فشلت والتانية نجحت."
          ]
        },
        {
          cmd: "dependency injection",
          title: "الـ service تستلم الـ repo والـ mailer بدل ما تعملهم",
          desc: R`dependency injection معناها إن الحاجة متعملش الحاجات اللي بتعتمد عليها بنفسها ([[new PrismaClient()]] أو [[import mailer]] جوه الدالة)، وبدل كده تستلمهم من برا، غالبًا في الـ constructor. ومش محتاج framework ولا decorators: parameter عادي.

والفايدة الأولى الاختبار: في الإنتاج بتبعت repo حقيقي بـ Prisma و mailer حقيقي، وفي الاختبار repo في الذاكرة و mailer بيسجّل بس، والـ service نفسها ماتغيرتش ولا حرف.`,
          example: R`type User = { id: string; email: string };
interface UserRepo {
  findByEmail(email: string): Promise<User | null>;
  create(email: string): Promise<User>;
}
interface Mailer {
  send(to: string, subject: string): Promise<void>;
}

class SignupService {
  constructor(private readonly users: UserRepo, private readonly mailer: Mailer) {}

  async signup(email: string): Promise<User> {
    if (await this.users.findByEmail(email)) throw new Error("Email already registered");
    const user = await this.users.create(email);
    await this.mailer.send(user.email, "Welcome!");
    return user;
  }
}

// fakes للتجربة (وفي الإنتاج: PrismaUserRepo و ResendMailer مثلًا)
class InMemoryUserRepo implements UserRepo {
  private rows: User[] = [];
  async findByEmail(email: string) { return this.rows.find((u) => u.email === email) ?? null; }
  async create(email: string) { const u = { id: String(this.rows.length + 1), email }; this.rows.push(u); return u; }
}
const sent: string[] = [];
const fakeMailer: Mailer = { send: async (to) => { sent.push(to); } };

const service = new SignupService(new InMemoryUserRepo(), fakeMailer);
service.signup("you@example.com")
  .then(() => service.signup("you@example.com"))
  .catch((e) => console.log(e.message, "| mails sent:", sent));`,
          try: R`حط [[SignupService]] والـ interfaces في [[signup.ts]] واعملهم export، واكتب [[signup.test.ts]] بـ vitest فيه حالتين: تسجيل جديد بيعمل user وبيبعت إيميل واحد، وإيميل متكرر بيرمي خطأ ومبيعملش user تاني ولا بيبعت إيميل تاني. من غير [[vi.mock]] خالص.`,
          sol: R`الاختبارين بيعدّوا، وكل اختبار بيبدأ بـ repo و mailer جداد في [[beforeEach]] عشان الاختبارات متأثرش في بعض. والنقطة المهمة إنك مااحتجتش [[vi.mock]] ولا داتابيز: الـ service بتستلم اللي بتعتمد عليه، فبعتّلها نسخ بسيطة بتقدر تبص جواها ([[repo.rows]] و [[sent]]).

الحالة التانية فيها ٣ assertions: الخطأ اترمى، و [[repo.rows]] فيها user واحد بس، و [[sent]] فيها إيميل واحد (من التسجيل الأول). الغلط الشائع إنك تختبر الخطأ بس، ومتتأكدش إن مفيش side effect حصل قبله. ولو لقيت نفسك بتكتب [[vi.mock('../lib/prisma')]] عشان تختبر service، يبقى الـ service دي بتعمل الـ dependency بنفسها ومحتاجة تستلمها.

ولاحظ [[await expect(...).rejects.toThrow(...)]]: من غير [[await]] الاختبار بيخلص قبل ما الـ promise ترفض، ويعدّي حتى لو مفيش خطأ.`,
          solCode: R`import { describe, it, expect, beforeEach } from "vitest";
import { SignupService, type UserRepo, type Mailer, type User } from "./signup";

class InMemoryUserRepo implements UserRepo {
  rows: User[] = [];
  async findByEmail(email: string) { return this.rows.find((u) => u.email === email) ?? null; }
  async create(email: string) { const u = { id: String(this.rows.length + 1), email }; this.rows.push(u); return u; }
}

describe("SignupService", () => {
  let repo: InMemoryUserRepo;
  let sent: string[];
  let service: SignupService;

  beforeEach(() => {
    repo = new InMemoryUserRepo();
    sent = [];
    const mailer: Mailer = { send: async (to) => { sent.push(to); } };
    service = new SignupService(repo, mailer);
  });

  it("creates the user and sends one welcome email", async () => {
    const user = await service.signup("you@example.com");
    expect(user.email).toBe("you@example.com");
    expect(sent).toEqual(["you@example.com"]);
  });

  it("rejects a duplicate email and sends nothing new", async () => {
    await service.signup("you@example.com");
    await expect(service.signup("you@example.com")).rejects.toThrow("Email already registered");
    expect(repo.rows).toHaveLength(1);
    expect(sent).toHaveLength(1);
  });
});`,
          flag: "script",
          deep: {
            why: R`الـ service اللي جواها [[prisma.user.create]] و [[resend.emails.send]] مباشرة مينفعش تختبرها غير بداتابيز حقيقية وإيميلات حقيقية، أو بـ [[vi.mock]] لـ modules كاملة، وده اختبار هش بيعرف أسماء الملفات. وكمان مينفعش تغيّر مزوّد الإيميل من غير ما تفتح كل service بتبعت إيميل. لما الـ service تستلم dependencies، بتبقى بتعتمد على «حاجة بتبعت إيميل» مش على Resend بالذات.`,
            how: R`فيه ٣ أجزاء:

١. الـ interface: بتوصف اللي الـ service محتاجاه بس ([[findByEmail]] و [[create]])، مش كل اللي Prisma بيعرف يعمله. كل ما الـ interface أصغر، الـ fake أسهل. ودي D في SOLID (Dependency Inversion): الـ business logic تعتمد على abstraction هي اللي بتحددها، والتفاصيل (Prisma) هي اللي تتكيف معاها. والـ S (Single Responsibility) باينة كمان: الـ service فيها قاعدة البيزنس بس، والتخزين والإرسال مسؤولية حد تاني.

٢. الاستلام: في الـ constructor ([[constructor(private readonly users: UserRepo)]]). وفي كود functional نفس الفكرة بـ parameters أو factory: [[makeSignup({ users, mailer })]] بترجع الدالة.

٣. الـ composition root: مكان واحد في التطبيق (زي [[src/container.ts]] أو أول [[server.ts]]) بيعمل الحاجات الحقيقية ويوصّلها ببعض: [[new SignupService(new PrismaUserRepo(prisma), new ResendMailer(key))]]. ده المكان الوحيد اللي يعرف مين الـ implementation. والـ routes بتستورد الـ service الجاهزة منه.

الـ frameworks زي NestJS و InversifyJS بتعمل الخطوة التالتة أوتوماتيك بـ decorators، ومفيدة لما عندك مية service. لكن الفكرة نفسها هي الـ constructor parameter، ومشروع عادي يقدر يعيش بيها للأبد.`,
            when: "أي كود فيه business logic وبيكلّم حاجة برا: داتابيز، أو إيميل، أو payment gateway، أو الوقت، أو API خارجي. والـ utils الـ pure (زي formatPrice) مش محتاجة DI، مفيش حاجة تحقنها.",
            mistakes: R`تحقن كل حاجة حتى [[formatDate]] و lodash: الـ DI للحاجات اللي ليها side effects أو اللي عايز تبدّلها، مش لكل import. وتعمل interface بنفس شكل Prisma كله (٤٠ method) عشان «ينفع نبدّل»: كده الـ fake بقى مستحيل. وتعمل [[new PrismaUserRepo()]] جوه الـ service «بس كـ default»، فرجعت لنفس المشكلة. و service locator ([[container.get('mailer')]] جوه الدالة) بيخبّي الاعتماد: من الـ constructor مش باين الـ service محتاجة إيه. وفي الانترفيو: DI مش framework، هو «الحاجة تستلم dependencies بدل ما تعملها»، والفايدة الأهم الاختبار وتبديل الـ implementation.`
          },
          lines: [
            "شكل الـ user.",
            "اللي الـ service محتاجاه من التخزين، ومش أكتر.",
            "تدوّر بالإيميل.",
            "تعمل user.",
            "قفلة.",
            "واللي محتاجاه من الإيميل: دالة واحدة.",
            "تبعت.",
            "قفلة.",
            "الـ service نفسها.",
            "بتستلم الاتنين في الـ constructor. مفيش [[new]] ولا [[import]] لـ Prisma هنا.",
            "قاعدة البيزنس: التسجيل.",
            "الإيميل موجود؟ ارفض قبل أي حاجة.",
            "اعمل الـ user بالـ repo اللي استلمناه، أيًا كان هو.",
            "ابعت الترحيب بالـ mailer اللي استلمناه.",
            "رجّع الـ user.",
            "قفلة الدالة.",
            "قفلة الـ class.",
            "repo في الذاكرة، بيطبّق نفس الـ interface.",
            "array بدل الجدول.",
            "بيدوّر في الـ array.",
            "بيضيف للـ array ويرجّع الـ user.",
            "قفلة.",
            "هنسجّل فيها الإيميلات اللي «اتبعتت».",
            "mailer مزيف بيسجّل بس.",
            "التوصيل: نفس الـ service بالظبط، بس بـ fakes.",
            "أول تسجيل بينجح...",
            "...والتاني بنفس الإيميل...",
            "...بيرمي، فبيطبع [[Email already registered]]، و [[mails sent]] فيها إيميل واحد بس: التسجيل التاني مابعتش حاجة."
          ]
        },
        {
          cmd: "refactor بأمان",
          title: "تنضّف ملف قديم من غير اختبارات ومن غير ما تكسره",
          desc: R`الـ refactoring معناه تغيّر شكل الكود من غير ما تغيّر سلوكه. والسؤال الصعب: إزاي تعرف إن السلوك ماتغيرش في ملف مفيهوش ولا اختبار؟ الإجابة: characterization test. قبل ما تلمس حاجة، اكتب اختبارات بتسجّل اللي الكود بيعمله النهارده بالظبط، حتى الحاجات اللي شكلها غلط. دي شبكة الأمان.

وبعدها خطوات صغيرة: كل خطوة (rename، أو extract function، أو types) commit لوحده والاختبارات خضرا. والـ refactor في PR لوحده، منفصل عن أي feature أو bug fix.

المثال ملف legacy حقيقي الشكل، والاختبارات اللي اتكتبت قبل ما حد يلمسه. التمرين في «جرّب» إنك تنضّفه.`,
          example: R`import { describe, it, expect } from "vitest";

// legacy: محدش عارف مين كتبه، ومفيش اختبارات، وشغال في الإنتاج
function calc(o: any) {
  var t = 0;
  for (var i = 0; i < o.items.length; i++) t = t + o.items[i].p * o.items[i].q;
  if (o.c == "SAVE10") t = t - t * 0.1;
  if (o.c == "FLAT50" && t > 200) t = t - 50;
  if (t < 500) t = t + 30;
  return Math.round(t * 100) / 100;
}

// characterization test: بيسجّل اللي الكود بيعمله النهارده، مش اللي «المفروض» يعمله
describe("calc: السلوك الحالي", () => {
  it.each([
    [{ items: [{ p: 100, q: 2 }] }, 230],
    [{ items: [{ p: 600, q: 1 }] }, 600],
    [{ items: [{ p: 520, q: 1 }], c: "SAVE10" }, 498],
    [{ items: [{ p: 250, q: 1 }], c: "FLAT50" }, 230],
    [{ items: [{ p: 150, q: 1 }], c: "FLAT50" }, 180],
    [{ items: [{ p: 100, q: 1 }], c: "save10" }, 130],
    [{ items: [{ p: 33.33, q: 3 }] }, 129.99],
  ])("calc(%j) = %d", (order, expected) => {
    expect(calc(order)).toBe(expected);
  });
});`,
          try: R`التمرين: حط المثال في [[checkout.test.ts]] وشغّل [[npx vitest]] (الـ ٧ خضرا). وبعدين انقل [[calc]] لملف [[checkout.ts]] واعمله export، وابدأ تنضّف بخطوات، وبعد كل خطوة الاختبارات لازم تفضل خضرا وتعمل commit: (١) types بدل [[any]] ([[Order]] و [[LineItem]])، (٢) أسماء بدل [[t]] و [[o.c]] وأرقام بأسماء ([[500]] و [[30]])، (٣) extract لـ [[subtotal]] و [[applyCoupon]] و [[withShipping]]. ممنوع تصلّح أي «غلطة» تلاقيها في نفس الخطوات. في الآخر [[git log --oneline]] لازم يوريك ٤ commits صغيرة أو أكتر.`,
          sol: R`النتيجة: [[calc]] بقت سطر واحد بيقرا زي الوصف: [[roundMoney(withShipping(applyCoupon(subtotal(items), code)))]]، والـ ٧ اختبارات خضرا من غير ما تغيّر فيهم غير سطر الـ import. ولو اختبار احمرّ في أي خطوة، ارجع الخطوة دي بس ([[git restore .]]) وخد خطوة أصغر، ودي فايدة الـ commits الصغيرة.

لاحظ ٣ حاجات «غريبة» سجّلها الاختبار ولازم تفضل زي ما هي في الـ refactor: طلب ٥٢٠ بـ SAVE10 بيبقى ٤٦٨ فينزل تحت حد الشحن المجاني ويدفع شحن (٤٩٨)، و [[save10]] بحروف صغيرة مش بيشتغل، و FLAT50 على ٢٠٠ بالظبط مش بيشتغل ([[> 200]]). ممكن يكونوا bugs، وممكن يكونوا قاعدة بيزنس محدش كتبها. تسجّلهم في ticket وتسأل، وتصلّحهم في PR تاني بعد الـ refactor، ومع كل تصليح يتغير اختبار واحد بوعي.

والفخ اللي بيوقع ناس كتير: تكتب [[amount * 0.9]] بدل [[t - t * 0.1]] لأنه «نفس الحاجة». في الـ floating point مش دايمًا نفس النتيجة في آخر رقم، فالـ refactor الآمن بيحافظ على نفس العمليات، ولو عايز تغيّرها يبقى خطوة لوحدها وتزوّد حالات في الاختبار. وكمان [[==]] بقت [[===]]: آمنة هنا لأن [[c]] يا string يا [[undefined]]. وأسماء الخانات نفسها ([[p]] و [[q]] و [[c]]) فضلت زي ما هي، لأنها شكل الداتا اللي الكود التاني بيبعته، وتغييرها تغيير في الـ interface: خطوة لوحدها بعد ما TypeScript يوريك كل اللي بينادي.`,
          solCode: R`// checkout.ts بعد الـ refactor، والاختبار بقى أوله: import { calc } from "./checkout";
export type LineItem = { p: number; q: number };
export type Order = { items: LineItem[]; c?: string };

const FREE_SHIPPING_FROM = 500;
const SHIPPING_FEE = 30;

const subtotal = (items: LineItem[]) => items.reduce((sum, item) => sum + item.p * item.q, 0);

function applyCoupon(amount: number, code?: string): number {
  if (code === "SAVE10") return amount - amount * 0.1;
  if (code === "FLAT50" && amount > 200) return amount - 50;
  return amount;
}

const withShipping = (amount: number) => (amount < FREE_SHIPPING_FROM ? amount + SHIPPING_FEE : amount);
const roundMoney = (amount: number) => Math.round(amount * 100) / 100;

export function calc(order: Order): number {
  return roundMoney(withShipping(applyCoupon(subtotal(order.items), order.c)));
}

// git log --oneline
// 5e1c2d4 refactor(checkout): extract subtotal, applyCoupon, withShipping
// 9b0a7f1 refactor(checkout): name shipping constants
// 3c8d2e6 refactor(checkout): add Order and LineItem types
// a41f0b9 test(checkout): characterization tests for calc`,
          flag: "script",
          deep: {
            why: R`الكود القديم اللي مفيهوش اختبارات بيخوّف، فالناس يا مبتلمسهوش خالص فيعفّن أكتر، يا بتعيد كتابته مرة واحدة فتكسر حالات محدش كان عارف إنها موجودة. والحالات الغريبة دي غالبًا فيه عميل أو تقرير معتمد عليها. الـ characterization test بيحوّل «مش عارف الكود ده بيعمل إيه» لـ جدول واضح، ويخليك تغيّر بثقة.`,
            how: R`الخطوات (من كتاب Working Effectively with Legacy Code لـ Michael Feathers):

١. لاقي الـ seam: المكان اللي تقدر تنادي منه الكود وتشوف نتيجته. هنا الدالة سهلة لأنها pure. لو جواها داتابيز أو [[Date.now()]]، أول خطوة تطلّعهم parameters (درس «pure functions» و «dependency injection»)، وده أصغر تعديل ممكن.

٢. اكتب اختبار وحط فيه قيمة متوقعة غلط عمدًا (مثلًا 0)، وشغّله: vitest هيقولك [[expected 230 to be 0]]. انقل الـ 230 للاختبار. انت مش بتحكم إيه الصح، انت بتسجّل. ولو المخرج كبير (HTML أو JSON)، [[toMatchSnapshot()]] بيسجّله كله مرة واحدة.

٣. غطّي كل فرع: كل [[if]] محتاجة حالة بتدخلها وحالة مبتدخلهاش، والحدود (٥٠٠ بالظبط، و ٢٠٠ بالظبط). [[npx vitest --coverage]] بيوريك السطور اللي محدش عدّى عليها (تاب «فحص الكود»).

٤. refactor بخطوات صغيرة، كل واحدة commit. ومع TypeScript، أول ما تحط type أو تغيّر signature، [[tsc]] بيوريك كل مكان بينادي الدالة، فمحتاجش تدوّر بنفسك.

٥. PR لوحده بعنوان [[refactor:]]، ووصفه بيقول «مفيش تغيير في السلوك، والاختبارات اتكتبت الأول». الـ reviewer يقدر يراجعه في دقايق لأنه عارف إن السلوك ثابت، ولو فيه feature في نفس الـ PR، مستحيل يعرف أنهي سطر غيّر السلوك وأنهي نضّف.`,
            when: "قبل ما تضيف feature في ملف قديم مفيهوش اختبارات، وقبل ما تصلّح bug في كود مش فاهمه، وقبل أي نقل كبير (JS لـ TS، أو framework جديد).",
            mistakes: R`تصلّح «الغلطات» وانت بتعمل refactor: كده الـ PR بقى تغيير سلوك متخبّي، ولو حد كان معتمد على السلوك القديم هيتكسر ومحدش هيعرف ليه. وتكتب الاختبار بعد الـ refactor، فبيسجّل السلوك الجديد مش القديم. و commit واحد اسمه «cleanup» فيه ٤٠ ملف. وتختبر الدوال الصغيرة الجديدة بس وتمسح الـ characterization tests: خليهم، دول اللي بيثبتوا إن السلوك من برا ماتغيرش. وفي الانترفيو لو اتسألت «هتتعامل إزاي مع كود legacy؟»: اختبارات بتسجّل السلوك الحالي، وبعدين خطوات صغيرة، والـ refactor منفصل عن الـ features.`
          },
          lines: [
            "vitest.",
            "الدالة القديمة زي ما لقيتها: [[any]] وأسماء حرف واحد.",
            "إجمالي بيبدأ من صفر.",
            "بيجمع السعر في الكمية لكل صنف.",
            "كوبون SAVE10: خصم ١٠٪. والمقارنة بـ [[==]] وحساسة لحالة الحروف.",
            "FLAT50: خصم ٥٠ لو الإجمالي أكبر من ٢٠٠ (أكبر، مش أكبر أو يساوي).",
            "تحت ٥٠٠ بعد الخصم؟ شحن ٣٠.",
            "تقريب لقرشين.",
            "قفلة.",
            "الاختبارات: كل صف طلب والنتيجة اللي الكود بيطلّعها النهارده.",
            "[[it.each]] بياخد جدول ويعمل اختبار لكل صف.",
            "طلب عادي تحت ٥٠٠: ٢٠٠ + شحن.",
            "من ٥٠٠ وطالع: من غير شحن.",
            "غريبة: الخصم نزّله تحت ٥٠٠، فدفع شحن. متسجّلة زي ما هي.",
            "FLAT50 على ٢٥٠.",
            "FLAT50 على ١٥٠: مش بيشتغل، بس فيه شحن.",
            "غريبة تانية: الحروف الصغيرة مش بتشتغل.",
            "التقريب: ٩٩.٩٩ + ٣٠.",
            "اسم كل اختبار بيطلع فيه الطلب والنتيجة.",
            "المقارنة.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "over-engineering",
          title: "الـ pattern اللي جه قبل المشكلة بتاعته",
          desc: R`الـ design patterns (strategy و factory و repository و observer) حلول لمشاكل معروفة. لما المشكلة موجودة، الـ pattern بيوفّر. ولما مش موجودة، بيبقى طبقات زيادة كل اللي بيقرا الكود لازم يعدّي عليها. والعلامة الأشهر: interface ليها implementation واحد، و factory بيعمل نوع واحد.

القاعدة العملية اسمها rule of three: أول مرة اكتب الحل المباشر. تاني مرة استحمل التكرار وخد بالك. تالت مرة بقى عندك ٣ أمثلة حقيقية، وتقدر تشوف إيه اللي بيتغير فعلًا، فاعمل الـ abstraction على مقاسه.`,
          example: R`// قبل: 4 أنواع و factory عشان مزوّد دفع واحد
// interface PaymentStrategy { pay(amount: number): Promise<string> }
// class PaymobStrategy implements PaymentStrategy { ... }
// class PaymentStrategyFactory { static create(name: string): PaymentStrategy { ... } }

// بعد، مزوّد واحد: دالة
async function payWithPaymob(amount: number) {
  return $__btpaymob:$__{amount}$__bt;
}

// بعد، المزوّد التالت: دلوقتي الـ pattern ليه لازمة، وبأبسط شكل (جدول)
const providers = {
  paymob: payWithPaymob,
  fawry: async (amount: number) => $__btfawry:$__{amount}$__bt,
  stripe: async (amount: number) => $__btstripe:$__{amount}$__bt,
} satisfies Record<string, (amount: number) => Promise<string>>;
type Provider = keyof typeof providers;

function pay(provider: Provider, amount: number) {
  return providers[provider](amount);
}
pay("fawry", 250).then(console.log); // fawry:250`,
          try: R`دوّر في مشروعك (أو مشروع open source Node أو Next) على ٣ حاجات: interface أو abstract class ليها implementation واحد بس، و factory أو «Manager» بيرجّع نوع واحد، و generic repository ملفوف على Prisma ومبيضيفش حاجة. لكل واحدة اكتب سطر: «هتتشال ويحل مكانها إيه؟» أو «فيها لازمة لأن كذا». وشيل واحدة فعلًا لو ينفع.`,
          sol: R`اللي هتلاقيه غالبًا: [[IUserService]] ليها [[UserService]] بس، ومحدش بيعمل منها fake لأن الاختبارات أصلًا بتستخدم الـ service الحقيقية. دي تتشال ويبقى الـ class هو النوع. و [[BaseRepository<T>]] فيه [[findById]] و [[findAll]] و [[create]] كل واحدة سطر بينادي Prisma: ده غلاف مبيضيفش حاجة وبيخبّي الـ features (include و select و transactions)، يتشال ويتنادى Prisma مباشرة، أو يتحول لـ repo صغير بدوال بأسماء البيزنس ([[findActiveByEmail]]).

والحاجات اللي ليها لازمة: interface عشان في الاختبار بتبعت fake فعلًا (زي [[Mailer]] في درس DI)، أو لأن فيه فعلًا اتنين implementation (S3 في الإنتاج وملفات محلية في التطوير). يعني السؤال مش «فيه interface ولا لأ»، السؤال «فيه أكتر من implementation موجود النهارده، أو fake في الاختبار؟».

الغلط اللي بيحصل: تشيل abstraction وتلاقي ٣٠ ملف بيستخدموها. متعملهاش في نفس PR الـ feature، اعملها PR لوحده بالطريقة بتاعة درس «refactor بأمان».`,
          flag: "script",
          deep: {
            why: R`كل طبقة abstraction بتتكلف: ملف زيادة، واسم زيادة، ومكان زيادة لازم اللي بيصلّح bug يعدّي عليه. ولما تتعمل قبل المشكلة، غالبًا بتيجي على المقاس الغلط: عملت [[PaymentStrategy.pay(amount)]]، وتاني مزوّد طلع محتاج redirect و webhook، فالـ interface مبتنفعش وبتتلوي. ونفس الكلام في درس DRY: تكرار مرتين أرخص من abstraction غلط.`,
            how: R`في المثال، الـ strategy pattern (تختار خوارزمية وقت التشغيل) اتعمل في أبسط شكل ليه في TypeScript: object من الاسم للدالة. مفيش classes ولا factory. و [[satisfies]] بيتأكد إن كل مزوّد نفس الشكل، و [[keyof typeof providers]] بيطلّع [[paymob | fawry | stripe]] أوتوماتيك، فلو حد بعت [[pay('vodafone', ...)]] الـ TypeScript يرفض (تاب TypeScript، درس «satisfies»).

علامات الـ over-engineering:
interface ليها implementation واحد ومفيش fake في الاختبارات.
factory أو builder لـ object فيه ٣ خانات.
generic repository فوق ORM هو أصلًا repository.
event bus جوه تطبيق واحد عشان دالة تنادي دالة.
microservices لفريق من ٣ أشخاص.
config لحاجة محدش غيّرها من سنة.

والـ patterns اللي بتدفع تمنها بدري: dependency injection عند الحدود (الداتابيز والإيميل والدفع) لأنها بتسهّل الاختبار من أول يوم، والـ decorators الصغيرة (retry و cache) لأنها دوال مش طبقات. والفرق دايمًا: فيه مشكلة موجودة النهارده ولا لأ.`,
            when: "كل مرة تكتب interface أو abstract class أو كلمة Factory أو Manager أو Base. اسأل: كام implementation موجود النهارده؟ لو واحد، استنى التاني. ولو بتصمم حاجة صعب تتغير بعدين (API عام، أو شكل الداتا في الداتابيز)، فكّر أكتر، لأن دي مش YAGNI.",
            mistakes: R`تفهم الكلام ده إنه «متعملش أي تصميم»: الـ rule of three عن الـ abstraction، مش عن الأسماء الكويسة والدوال الصغيرة والاختبارات. وتستنى لحد عاشر تكرار عشان «لسه مش تالت مرة بالظبط»: هي قاعدة تقريبية. وتتعلم الـ patterns من كتاب GoF وتحاول تطبّقهم كلهم في مشروع واحد. وفي الانترفيو لو اتسألت «امتى متستخدمش design pattern؟»: قول لما مفيش غير حالة واحدة، واحكي مثال حقيقي شيلت فيه abstraction والكود بقى أبسط.`
          },
          lines: [
            "مزوّد واحد؟ دالة عادية بتدفع وترجّع رقم العملية.",
            "(هنا بترجع نص للتجربة، وفي الحقيقة بتنادي الـ API بتاعهم.)",
            "قفلة.",
            "المزوّدين في جدول: الاسم والدالة.",
            "الدالة اللي كانت موجودة، زي ما هي.",
            "مزوّد تاني.",
            "والتالت.",
            "[[satisfies]] بيتأكد إن كل القيم دوال بنفس الشكل، من غير ما يضيّع أسماء المفاتيح.",
            "النوع [[paymob | fawry | stripe]] متولّد من الجدول نفسه، فمحدش يقدر يبعت مزوّد مش موجود.",
            "الدالة اللي باقي الكود بيناديها.",
            "تختار الدالة من الجدول وتناديها. ده الـ strategy كله.",
            "قفلة.",
            "بيطبع [[fawry:250]]."
          ]
        }
      ]
    },
    {
      t: "الاختبارات بالـ TDD",
      l: 3,
      n: "red ثم green ثم refactor، واختبار لكل bug، وتختبر السلوك مش التفاصيل، وتوزّع الاختبارات صح",
      items: [
        {
          cmd: "red green refactor",
          title: "تكتب الاختبار الأول، وتشوفه بيفشل، وبعدين الكود",
          desc: R`TDD (Test-Driven Development) دورة صغيرة بتتكرر كل كام دقيقة: red: اكتب اختبار واحد لسلوك لسه مش موجود، وشغّله وشوفه بيفشل. green: اكتب أقل كود يخليه يعدّي، حتى لو شكله وحش. refactor: نضّف الكود والاختبارات خضرا. وبعدين الاختبار اللي بعده.

المثال ميزة الكوبون بعد ٤ دورات، والاختبارات بالترتيب اللي اتكتبت بيه. كل اختبار زوّد سلوك واحد، والكود كبر خطوة خطوة معاه. والخطوات نفسها مكتوبة في «إزاي».`,
          example: R`import { describe, it, expect } from "vitest";

type Coupon = { kind: "percent" | "fixed"; value: number; minOrder?: number };

export function applyCoupon(subtotal: number, coupon: Coupon): number {
  if (coupon.minOrder !== undefined && subtotal < coupon.minOrder) throw new Error("MIN_ORDER_NOT_MET");
  const discount = coupon.kind === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.max(0, subtotal - discount);
}

describe("applyCoupon", () => {
  it("percent coupon takes a percentage off", () => {
    expect(applyCoupon(200, { kind: "percent", value: 10 })).toBe(180);
  });
  it("fixed coupon takes a fixed amount off", () => {
    expect(applyCoupon(200, { kind: "fixed", value: 50 })).toBe(150);
  });
  it("never goes below zero", () => {
    expect(applyCoupon(30, { kind: "fixed", value: 50 })).toBe(0);
  });
  it("rejects orders under the minimum", () => {
    expect(() => applyCoupon(99, { kind: "fixed", value: 20, minOrder: 100 })).toThrow("MIN_ORDER_NOT_MET");
  });
});`,
          try: R`كمّل الميزة بالـ TDD: الكوبون ليه تاريخ انتهاء [[expiresAt]]. شغّل [[npx vitest]] (بيفضل شغال ويعيد مع كل حفظ). اكتب الاختبار الأول بس ([[rejects an expired coupon]]) وشوفه أحمر، وبعدين أقل كود يخضّره، وبعدين اختبار «قبل الانتهاء بثانية شغال»، وبعدين «كوبون من غير تاريخ مبينتهيش». ممنوع تكتب سطر في [[applyCoupon]] من غير اختبار أحمر بيطلبه. وخلّي الوقت parameter عشان الاختبار ميعتمدش على النهارده.`,
          sol: R`أول اختبار أحمر، والرسالة غالبًا [[expected [Function] to throw an error]] لأن الدالة لسه مبترميش. أقل كود يخضّره: [[if (coupon.expiresAt && now >= coupon.expiresAt) throw new Error('COUPON_EXPIRED')]]، و [[now]] parameter تالت قيمته الافتراضية [[new Date()]]، فالكود اللي بينادي الدالة ماتغيرش والاختبار بيبعت وقت ثابت.

الاختبار التاني («قبل الانتهاء بثانية») غالبًا هيطلع أخضر من أول مرة. ده عادي ومعناه إن الكود اللي فات غطّاه، بس اتأكد إنه فعلًا بيختبر حاجة: غيّر [[>=]] لـ [[>]] مؤقتًا وشوف مين يحمرّ. لو ولا اختبار احمرّ، يبقى الحد نفسه (لحظة الانتهاء بالظبط) مش متغطي، وده اللي الاختبار التاني في الحل بيغطيه.

والترتيب مهم: الانتهاء قبل الحد الأدنى، عشان الكوبون المنتهي يقول «منتهي» حتى لو الطلب صغير. ده قرار بيزنس، والاختبار بقى بيوثّقه. الغلط الشائع إنك تستخدم [[new Date()]] جوه الدالة وتختبر بكوبون [[expiresAt: new Date('2020-01-01')]]، فالاختبار بيعدّي النهارده بس «الكوبون الصالح» في الاختبار هيبقى منتهي يوم ما تاريخه يعدّي.`,
          solCode: R`import { it, expect } from "vitest";

type Coupon = { kind: "percent" | "fixed"; value: number; minOrder?: number; expiresAt?: Date };

export function applyCoupon(subtotal: number, coupon: Coupon, now = new Date()): number {
  if (coupon.expiresAt && now >= coupon.expiresAt) throw new Error("COUPON_EXPIRED");
  if (coupon.minOrder !== undefined && subtotal < coupon.minOrder) throw new Error("MIN_ORDER_NOT_MET");
  const discount = coupon.kind === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.max(0, subtotal - discount);
}

const endOfSept = new Date("2026-09-30T21:00:00Z");
const coupon: Coupon = { kind: "fixed", value: 50, expiresAt: endOfSept };

it("accepts the coupon before it expires", () => {
  expect(applyCoupon(200, coupon, new Date("2026-09-30T20:59:59Z"))).toBe(150);
});
it("rejects the coupon at the expiry moment and after", () => {
  expect(() => applyCoupon(200, coupon, endOfSept)).toThrow("COUPON_EXPIRED");
});
it("coupons without expiresAt never expire", () => {
  expect(applyCoupon(200, { kind: "fixed", value: 50 }, new Date("2099-01-01"))).toBe(150);
});`,
          flag: "script",
          deep: {
            why: R`لما تكتب الاختبار الأول، بتضطر تقرر شكل الدالة من ناحية اللي هيستخدمها (الاسم، والـ parameters، وبترجع إيه وبترمي إيه) قبل ما تغرق في التفاصيل. والاختبار اللي شفته أحمر قبل ما يخضر اختبار انت متأكد إنه بيختبر حاجة. أما الاختبار اللي اتكتب بعد الكود وعدّى من أول مرة، ممكن يكون بيعدّي مهما حصل (نسيت [[await]]، أو بتقارن الحاجة بنفسها). وفي الآخر بيطلعلك كود كل سطر فيه وراه اختبار.`,
            how: R`الدورات اللي طلّعت المثال:

١. red: اختبار الـ percent. الدالة مش موجودة، فالملف مش بيشتغل. green: [[return subtotal * 0.9]]. أيوه، hardcoded. ده بيأكد إن الاختبار والتوصيل شغالين.

٢. red: اختبار الـ fixed ([[expected 180 to be 150]]). دلوقتي الكود مضطر يفرّق بين النوعين ويستخدم [[coupon.value]] بجد. green: الـ ternary. refactor: اسم [[discount]] للنتيجة.

٣. red: ٣٠ بكوبون ٥٠ طلّع [[-20]]. green: [[Math.max(0, ...)]].

٤. red: الحد الأدنى ([[expected [Function] to throw an error]]). green: الـ if في الأول.

الفكرة في خطوة ١ اسمها «fake it till you make it»: الاختبار التاني هو اللي بيجبرك تعمم (triangulation). وده بيمنعك تكتب كود لحالات محدش طلبها.

عمليًا: [[npx vitest]] من غير [[run]] بيشتغل في وضع watch، فكل حفظ بيعيد الاختبارات المتأثرة في أقل من ثانية، ودي اللي بتخلي الدورة كل دقيقتين ممكنة. وكتابة الاختبارات نفسها ([[describe]] و [[expect]] و mocks) في تاب «فحص الكود»، درس «vitest».`,
            when: "أحسن حاجة للمنطق اللي ليه قواعد واضحة: الأسعار والخصومات والصلاحيات والتحقق والـ parsing، وأي bug fix (الدرس الجاي). وأقل فايدة في UI لسه بتجرّب شكله، أو لما بتستكشف API جديد ومش عارف هيرجّع إيه: جرّب الأول، وبعدين اكتب الاختبارات، أو ارمي التجربة وابدأ بـ TDD.",
            mistakes: R`تكتب ١٠ اختبارات مرة واحدة وبعدين الكود: دي مش TDD، ده مجرد اختبارات الأول، وبتضيّع الدورة الصغيرة. وتنط الـ refactor لأن «الاختبارات خضرا خلاص»، فالكود بيفضل بحالة الـ green الأولى الوحشة. ومتشوفش الاختبار أحمر، فمش عارف إنه ممكن يفشل أصلًا. وفي الانترفيو لو اتسألت «بتعمل TDD؟»: الإجابة الصادقة أحسن من «دايمًا». قول إنك بتستخدمها للمنطق وللـ bug fixes، واشرح red ثم green ثم refactor بمثال زي ده.`
          },
          lines: [
            "vitest.",
            "شكل الكوبون: نسبة أو مبلغ، وحد أدنى اختياري.",
            "الدالة بعد ٤ دورات.",
            "الدورة ٤: الطلب أقل من الحد الأدنى؟ ارمي.",
            "الدورة ٢: الخصم نسبة ولا مبلغ ثابت.",
            "الدورة ٣: الإجمالي مينزلش تحت صفر.",
            "قفلة.",
            "الاختبارات بالترتيب اللي اتكتبت بيه.",
            "الدورة ١: أول سلوك.",
            "٢٠٠ بخصم ١٠٪ = ١٨٠.",
            "قفلة.",
            "الدورة ٢: ده اللي أجبر الكود يفرّق بين النوعين.",
            "٢٠٠ ناقص ٥٠.",
            "قفلة.",
            "الدورة ٣: حالة حدّية.",
            "كوبون ٥٠ على طلب ٣٠: صفر، مش سالب.",
            "قفلة.",
            "الدورة ٤: قاعدة بيزنس جديدة.",
            "[[toThrow]] محتاج دالة ([[() =>]]) عشان vitest هو اللي يناديها ويمسك الخطأ.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "regression test",
          title: "كل bug بيتصلّح معاه اختبار يمنعه يرجع",
          desc: R`الـ regression test اختبار بيعيد الـ bug بالظبط، واتكتب قبل التصليح. الترتيب: اكتب الاختبار، وشوفه أحمر (يعني فعلًا مسك الـ bug)، وبعدين صلّح، وشوفه أخضر. واسمه فيه رقم الـ issue، فاللي يقراه بعد سنة يعرف جه منين.

والفكرة إن كل bug اتصلّح يفضل متصلّح: لو حد رجّع نفس الغلطة بعد ٦ شهور وهو بيعمل refactor، الـ CI هيقوله قبل ما يوصل للعميل.`,
          example: R`import { it, expect } from "vitest";

// الـ bug #142: «كوبون FLAT50 مش بيشتغل على طلب 200 بالظبط، والإعلان بيقول من 200»
export function applyFlat50(subtotal: number): number {
  return subtotal >= 200 ? subtotal - 50 : subtotal;
}

it("FLAT50 applies at exactly 200 (bug #142)", () => {
  expect(applyFlat50(200)).toBe(150);
});
it("FLAT50 does not apply under 200", () => {
  expect(applyFlat50(199.99)).toBe(199.99);
});`,
          try: R`خد آخر bug صلّحته في مشروعك (أو اعمل واحد: غيّر [[>=]] لـ [[>]] في المثال). اكتب اختبار بيعيده، وتأكد إنه أحمر على الكود القديم: [[git stash]] للتصليح، شغّل الاختبار، وبعدين [[git stash pop]] وشغّله تاني. واعمل commit فيه الاتنين بعنوان زي [[fix(coupon): FLAT50 applies at 200 (#142)]].`,
          sol: R`على الكود القديم ([[>]]) الاختبار الأول يقع بـ [[expected 200 to be 150]]، وبعد التصليح الاتنين خضر. الاختبار التاني مهم زي الأول: بيثبّت الحد من الناحية التانية، عشان محدش «يصلّح» الـ bug بإنه يشيل الشرط خالص.

لو الاختبار بتاعك كان أخضر على الكود القديم، يبقى مش بيعيد الـ bug، ولازم تغيّره. وده بالظبط سبب إنك تشوفه أحمر الأول. ولو الـ bug كان في مكان صعب يتختبر (الدالة جواها داتابيز أو وقت)، أول خطوة إنك تطلّع الحتة دي لدالة تتختبر (دروس «pure functions» و «dependency injection»).

والـ commit الواحد اللي فيه الاختبار والتصليح بيخلي أي حد يعمل revert للتصليح يلاقي الاختبار بيقع قدامه.`,
          flag: "script",
          deep: {
            why: R`الـ bugs مش بتتوزع بالعدل: الأماكن اللي فيها bug مرة غالبًا فيها منطق صعب أو حدود ملخبطة، فبترجع تبوظ تاني. والـ bug اللي رجع بعد ما اتقفل أسوأ من الأول، لأن العميل بيفقد الثقة، والفريق بيدوّر على حاجة كانوا فاكرينها اتحلت. والاختبار بيحوّل التصليح من «افتكروا متعملوش كده تاني» لحاجة الـ CI بيفرضها.`,
            how: R`الخطوات:

١. اعيد الـ bug يدويًا، وافهم المدخل بالظبط اللي بيعمله (هنا ٢٠٠ بالظبط).

٢. اكتب الاختبار بأصغر مدخل بيعيده، والاسم فيه الـ issue: [[(bug #142)]].

٣. شغّله وشوفه أحمر. الرسالة لازم تبقى نفس المشكلة اللي العميل شافها (١٥٠ متوقع، ٢٠٠ طلع)، مش خطأ تاني زي import غلط.

٤. صلّح أقل حاجة، وشوفه أخضر، وشغّل كل الاختبارات عشان التصليح ميكسرش حاجة تانية.

٥. اسأل: فيه حالات شبهها؟ ٢٠٠ بالظبط بتقول إن الحدود عمومًا ممكن تكون غلط، فبص على باقي الحدود في نفس الملف (الشحن المجاني من ٥٠٠؟).

ومستوى الاختبار يبقى على قد الـ bug: bug في حسبة يبقى unit test. bug في شكل الـ response يبقى integration test على الـ API. bug إن الزرار مبيظهرش على الموبايل يبقى e2e (تاب «فحص الكود»). والدرس الجاي بيشرح إزاي تختار.`,
            when: "كل bug fix، من غير استثناء تقريبًا. الاستثناء الوحيد اللي ممكن تقبله: bug في config أو نص، والتصليح نفسه أوضح من أي اختبار. وحتى دي، فكّر: ينفع lint rule أو فحص في CI يمسكها؟",
            mistakes: R`تكتب الاختبار بعد التصليح ومتشغّلوش على القديم، فمش عارف إذا كان بيمسك الـ bug أصلًا. وتسمّيه [[test 142]] أو [[fix works]]: الاسم لازم يقول السلوك الصح، والرقم معلومة زيادة. وتختبر الحالة اللي حصلت بس (٢٠٠) وتنسى الناحية التانية (١٩٩.٩٩). وفي الانترفيو لو اتسألت «بتعمل إيه لما تصلّح bug؟»: اعيده، واكتب اختبار أحمر، وصلّح، وتأكد إن الاختبار أخضر والباقي سليم، وشوف لو فيه حالات شبهه.`
          },
          lines: [
            "vitest.",
            "الدالة بعد التصليح: [[>=]] بدل [[>]].",
            "٢٠٠ أو أكتر؟ اخصم ٥٠.",
            "قفلة.",
            "الـ regression test: الاسم بيقول السلوك الصح، ورقم الـ issue.",
            "٢٠٠ بالظبط لازم تبقى ١٥٠. على الكود القديم كانت بتطلع ٢٠٠.",
            "قفلة.",
            "الحد من الناحية التانية، عشان التصليح ميعدّيش الشرط خالص.",
            "أقل من ٢٠٠ بقرش: مفيش خصم.",
            "قفلة."
          ]
        },
        {
          cmd: "اختبر السلوك",
          title: "اختبار بيقع لما تغيّر الكود مع إن مفيش حاجة باظت",
          desc: R`الاختبار الكويس بيقع لما السلوك يبوظ، ومبيقعش لما تغيّر التفاصيل. عشان كده بيختبر اللي حد من برا شايفه: الـ return، والخطأ اللي اترمى، واللي اتبعت برا (إيميل أو request أو صف في الداتابيز). ومش بيختبر الخانات الـ private، ولا إن دالة داخلية اتنادت، ولا ترتيب الخطوات جوه.

والـ mocks نفس القاعدة: mock للحدود (الإيميل، والدفع، والـ API الخارجي)، مش للدوال بتاعتك. ولما تعمل mock، اتأكد من اللي راح للحد ده (اتبعت لمين وفيه إيه)، مش من إن حاجة جوه اتنادت.`,
          example: R`import { it, expect, vi } from "vitest";

class Cart {
  private lines = new Map<string, { price: number; qty: number }>();
  add(sku: string, price: number) {
    const qty = (this.lines.get(sku)?.qty ?? 0) + 1;
    this.lines.set(sku, { price, qty });
  }
  total() {
    return [...this.lines.values()].reduce((sum, l) => sum + l.price * l.qty, 0);
  }
}
async function checkout(cart: Cart, email: string, send: (to: string, text: string) => Promise<void>) {
  await send(email, $__btYour total is $__{cart.total()} EGP$__bt);
}

// هش: expect((cart as any).lines).toHaveLength(2)
// كان بيعدّي لما lines كانت array، ووقع لما بقت Map، مع إن السلوك مااتغيرش

it("adding the same item twice doubles the total", () => {
  const cart = new Cart();
  cart.add("book", 100);
  cart.add("book", 100);
  expect(cart.total()).toBe(200);
});

it("emails the total on checkout", async () => {
  const cart = new Cart();
  cart.add("book", 100);
  const send = vi.fn(async () => {});
  await checkout(cart, "you@example.com", send);
  expect(send).toHaveBeenCalledWith("you@example.com", "Your total is 100 EGP");
});`,
          try: R`افتح اختبارات مشروعك ودوّر على ٣ علامات: [[as any]] أو أقواس زي [[obj['secret'].size]] عشان توصل لحاجة private، و [[vi.spyOn]] على method من نفس الـ class اللي بتختبرها، و [[toHaveBeenCalledTimes]] على دالة داخلية. لكل واحد اكتب: السلوك اللي المستخدم شايفه هنا إيه؟ وأعد كتابة واحد بحيث يختبره. وبعدين اعمل refactor صغير جوه الكود (غيّر array لـ Map مثلًا) وشوف الاختبار الجديد لسه أخضر.`,
          sol: R`اللي هتلاقيه غالبًا اختبار زي [[expect(service['cache'].size).toBe(1)]] أو [[expect(taxSpy).toHaveBeenCalled()]]. السؤال لكل واحد: «ليه ده مهم للي بيستخدم الكود؟». الـ cache مهم لأن النداء التاني ميروحش للـ API تاني، فالاختبار الصح: نادِ مرتين، واتأكد إن الـ fetch الـ mock (الحد) اتنادى مرة واحدة. و [[calculateTax]] مهمة لأن الإجمالي فيه ضريبة، فالاختبار الصح: [[expect(total).toBe(114)]].

بعد الـ refactor الجوّاني، الاختبار الجديد لازم يفضل أخضر من غير ما تلمسه. لو احتجت تعدّله، يبقى لسه بيعرف تفاصيل. والعكس برضه: اكسر السلوك عمدًا (اشيل الضريبة) وتأكد إنه احمرّ.

الغلط اللي بيحصل في الاتجاه التاني: تبطّل تستخدم mocks خالص وتبعت إيميلات حقيقية من الاختبارات. الـ mock للحدود صح ومطلوب، و [[toHaveBeenCalledWith]] على الـ mailer بيختبر سلوك فعلًا: «العميل وصله إيميل فيه الإجمالي».`,
          flag: "script",
          deep: {
            why: R`الاختبارات المفروض تخليك تغيّر الكود بثقة. الاختبار اللي بيعرف التفاصيل بيعمل العكس: كل refactor بيحمّر ٢٠ اختبار مع إن مفيش حاجة باظت، فالفريق بيتعلم يعدّل الاختبارات أوتوماتيك لحد ما تخضر، ويوم ما يبقى فيه bug حقيقي بيعدّلوه برضه. ده أسوأ من إن مفيش اختبارات، لأنه بيدّيك ثقة مزيفة وبيبطّأك.`,
            how: R`اسأل: «لو حد بيستخدم الـ module ده من برا، إيه اللي يفرق معاه؟». دي الحاجات اللي بتختبرها:

الـ return أو الخطأ اللي اترمى، زي [[cart.total()]].

الـ state اللي باينة من برا عن طريق الـ API العام، مش عن طريق خانات private.

الـ side effects عند الحدود: الإيميل اتبعت لمين وفيه إيه، والـ request راح لأنهي URL، والصف اتكتب في الداتابيز. هنا الـ mock ([[vi.fn()]]) مكانه، و [[toHaveBeenCalledWith]] بيتأكد من اللي عدّى الحد.

وفي React نفس الفكرة بالظبط: Testing Library بتخليك تدوّر بالنص والـ role ([[getByRole('button', { name: 'Apply' })]]) زي المستخدم، مش بالـ state ولا بأسماء الـ components (تاب React، في الاختبارات).

والـ snapshots اللي بتسجّل HTML كامل من التفاصيل برضه: أي تغيير في class بيحمّرها. استخدمها لمخرج صغير مستقر، مش كبديل عن assertions.`,
            when: "مع كل اختبار بتكتبه. وأهم ما يكون لما بتكتب اختبارات لكود هيتعمله refactor قريب، زي درس «refactor بأمان»: هناك الاختبار لازم يعدّي من غير تعديل.",
            mistakes: R`تعمل mock لكل dependency حتى الدوال الـ pure بتاعتك، فالاختبار بيختبر إن الـ mocks بتكلم بعض. وتعمل [[export]] لدالة داخلية أو تخلي خانة public «عشان الاختبار». و ١٠ assertions على كل خطوة جوه بدل assertion واحد على النتيجة. وفي الانترفيو، سؤال «إيه الفرق بين mock و stub و fake؟» بيتسأل كتير: الـ stub بيرجّع قيمة ثابتة، والـ fake implementation حقيقي بس بسيط (الـ repo في الذاكرة)، والـ mock بيسجّل النداءات عشان تتأكد منها. والإجابة الأقوى إنك تزوّد: «وبستخدم الـ mock عند الحدود بس».`
          },
          lines: [
            "vitest، و [[vi]] للـ mock.",
            "الكارت.",
            "التفاصيل الداخلية: Map. كانت array، واتغيرت في refactor.",
            "إضافة صنف.",
            "لو موجود زوّد الكمية، لو لأ ابدأ من ١.",
            "احفظ.",
            "قفلة.",
            "الإجمالي: ده السلوك اللي حد من برا شايفه.",
            "اجمع السعر في الكمية.",
            "قفلة.",
            "قفلة الـ class.",
            "الـ checkout بيستلم دالة الإرسال (الحد) من برا.",
            "بيبعت الإجمالي للعميل.",
            "قفلة.",
            "اختبار سلوك: الاسم نفسه جملة بيفهمها أي حد في الفريق.",
            "كارت جديد.",
            "نفس الكتاب...",
            "...مرتين.",
            "بنختبر الإجمالي، مش شكل الـ Map. الاختبار ده عدّى قبل الـ refactor وبعده من غير تعديل.",
            "قفلة.",
            "اختبار الحد: الإيميل.",
            "كارت.",
            "صنف واحد.",
            "mock للإرسال بس، مش لحاجة جوه الكارت.",
            "نفّذ.",
            "اتأكد من اللي عدّى الحد: لمين، وفيه إيه بالظبط.",
            "قفلة."
          ]
        },
        {
          cmd: "هرم الاختبارات",
          title: "كام اختبار unit وكام integration وكام e2e",
          desc: R`فيه ٣ مستويات: unit بيختبر دالة أو module لوحده في جزء من الثانية، و integration بيختبر أكتر من حتة مع بعض (الـ route والـ service وداتابيز حقيقية)، و e2e بيفتح متصفح ويعمل اللي المستخدم بيعمله. كل ما تطلع لفوق، الاختبار بيثبت أكتر إن الحاجة شغالة، بس أبطأ وأصعب يتصلّح لما يقع.

الهرم (pyramid) بيقول: unit كتير، و integration أقل، و e2e قليل. والـ trophy (من Kent C. Dodds) بيقول: التقل في الـ integration، لأنه أقرب لاستخدام حقيقي ولسه سريع. الاتنين متفقين إن e2e للمسارات المهمة بس.

الدرس ده عن التوزيع. إزاي تكتب كل نوع في تاب «فحص الكود» (vitest و coverage و Playwright).`,
          example: R`# unit: كتير وسريع، للمنطق (الخصم والتحقق والتحويل)
npx vitest run src/lib
# integration: الـ API مع داتابيز اختبار حقيقية
npx vitest run tests/api
# e2e: قليل، للمسارات اللي لو وقعت الشركة بتخسر فلوس
npx playwright test tests/e2e/checkout.spec.ts
# كله في CI على كل PR
npm test`,
          try: R`عِد الاختبارات في مشروعك بكل نوع ([[npx vitest list]] بيطبع أسماء الاختبارات من غير ما يشغّلها، أو عِد الملفات في كل فولدر). وبعدين اكتب أهم ٣ مسارات في التطبيق (مثلًا: تسجيل، وإضافة للكارت، ودفع). لكل مسار: فيه اختبار بيغطيه؟ في أنهي مستوى؟ ولو اتكسر النهارده، أنهي اختبار هيقع؟`,
          sol: R`النتيجة الشائعة في مشاريع الجونيورز واحدة من اتنين: صفر اختبارات، أو unit tests كتير على utils ومفيش ولا اختبار على المسار اللي بيجيب فلوس. التوزيع المعقول لتطبيق ويب عادي: unit للمنطق اللي فيه قواعد (الأسعار، والصلاحيات)، و integration لكل endpoint مهم (بيرد صح، وبيرفض الغلط، وبيكتب في الداتابيز)، و e2e واحد أو اتنين للمسار الأساسي من أوله لآخره.

لو لقيت مسار مهم ولا اختبار بيغطيه، ابدأ بـ integration test عليه (مش e2e)، لأنه أسرع في الكتابة والتشغيل وبيمسك أغلب المشاكل. وضيف e2e لو الـ bug اللي خايف منه في الـ UI نفسه أو في التوصيل بين الفرونت والباك.

والغلط الشائع إنك تحكم بالـ coverage: ٩٠٪ coverage ممكن تبقى كلها في utils، والـ checkout صفر. الـ coverage بيقول السطر اتنفذ، مش إنه اتختبر صح.`,
          deep: {
            why: R`كل اختبار ليه تكلفة (وقت كتابة، ووقت تشغيل في كل PR، وصيانة) وليه قيمة (ثقة إن الحاجة شغالة). الـ e2e قيمته عالية بس تكلفته أعلى: بطيء، ولو وقع ممكن السبب في أي حتة، وأحيانًا بيقع من غير سبب (flaky). الـ unit رخيص جدًا بس ممكن كل الـ units تعدّي والتطبيق مش شغال لأن التوصيل بينهم غلط. التوزيع الصح بيدّيك أكبر ثقة بأقل تكلفة.`,
            how: R`الفرق بين المستويات هو «إيه الحقيقي وإيه المزيف»:

unit: كل الحدود مزيفة (fakes و mocks)، والكود بتاعك بس هو الحقيقي. بيقولك: المنطق صح. مكانه: الدوال الـ pure، والـ services بـ fakes زي درس «dependency injection».

integration: الكود بتاعك والداتابيز حقيقيين، والحاجات الخارجية (الإيميل والدفع) مزيفة. بيقولك: الـ route والـ validation والـ query شغالين مع بعض. الداتابيز غالبًا Postgres في Docker، أو schema منفصلة، وبتتنضف قبل كل اختبار. وللـ Express فيه supertest، ولـ Next بتنادي الـ route handler مباشرة.

e2e: كل حاجة حقيقية ما عدا الخدمات الخارجية (sandbox للدفع). بيقولك: المستخدم يقدر يخلّص المسار. Playwright بيفتح متصفح حقيقي.

والـ trophy بيضيف تحت الكل static analysis: TypeScript و ESLint بيمسكوا كمية bugs من غير ولا اختبار (تاب «فحص الكود»).

وسؤال «أكتب اختبار في أنهي مستوى؟» إجابته: أقل مستوى يقدر يمسك الـ bug اللي خايف منه. حسبة خصم: unit. الـ endpoint بيرجع 400 للداتا الغلط: integration. الزرار مستخبي ورا الـ keyboard على الموبايل: e2e.`,
            when: "لما تبدأ مشروع (قرر الأدوات والفولدرات بدري)، ولما الـ CI يبقى بطيء (غالبًا e2e كتير بيختبر حاجات unit يقدر يختبرها)، ولما bugs بتعدّي من الاختبارات للإنتاج (غالبًا مفيش integration).",
            mistakes: R`e2e لكل حالة validation (١٠ اختبارات بتفتح متصفح عشان تجرّب ١٠ إيميلات غلط)، والصح integration أو unit، و e2e واحد للحالة السعيدة. و integration tests بتشارك داتابيز من غير ما تنضفها، فبتعدّي لوحدها وتقع مع بعض. وتتجاهل الاختبار الـ flaky بـ retry لحد ما يعدّي: ده بيخبّي race condition حقيقي ساعات. وفي الانترفيو لو اتسألت «unit ولا integration ولا e2e؟»: متختارش واحد، اشرح التكلفة والثقة، وإنك بتختار أقل مستوى يمسك الـ bug.`
          },
          lines: [
            "الـ unit tests للدوال والـ services: بتخلص في ثواني حتى لو مئات.",
            "الـ integration tests: بتبعت requests للـ API وبتكتب في داتابيز اختبار.",
            "الـ e2e بـ Playwright: متصفح حقيقي، للـ checkout بس هنا.",
            "الـ CI بيشغّل الكل. و [[test]] في [[package.json]] بيجمعهم."
          ]
        }
      ]
    },
    {
      t: "الـ debugging والـ codebase",
      l: 3,
      n: "طريقة ثابتة تلاقي بيها أي bug، و git bisect بالاختبار، وإزاي تفهم مشروع مش بتاعك في أول أسبوع",
      items: [
        {
          cmd: "debugging method",
          title: "تلاقي الـ bug بخطوات مش بتخمين",
          desc: R`الـ debugging مش إنك تغيّر حاجات عشوائي لحد ما الـ bug يختفي. هو طريقة بـ ٦ خطوات: reproduce (اعيده بإيدك كل مرة)، و minimal repro (شيل كل حاجة ملهاش علاقة لحد ما يفضل أصغر حاجة بتعيده)، و hypothesis (فرضية واحدة تقدر تثبتها أو تنفيها)، و bisect (لو كان شغال قبل كده، لاقي أنهي تغيير كسره)، و fix، و regression test.

المثال bug حقيقي الشكل: فاتورة طلعت NaN، والطريقة بتوصلك للسبب في دقايق.`,
          example: R`// ١ reproduce: طلب #812 إجماليه في الفاتورة NaN، والطلبات التانية سليمة
const order812 = { items: [{ price: "1,200", qty: 1 }, { price: "50", qty: 2 }] };
const total = (items: { price: string; qty: number }[]) => items.reduce((t, i) => t + Number(i.price) * i.qty, 0);
console.log(total(order812.items)); // NaN

// ٢ minimal repro: شيل حاجة حاجة لحد ما يفضل أصغر سطر بيطلّع الـ bug
console.log(Number("50"), Number("1,200")); // 50 NaN

// ٣ hypothesis: الأسعار جاية من ملف CSV فيه فاصلة الآلاف، و Number مبيفهمهاش
// ٤ fix عند الحدود (وقت الـ import)، وبعدها regression test
const parsePrice = (raw: string) => Number(raw.replaceAll(",", ""));
console.log(parsePrice("1,200")); // 1200`,
          try: R`خد bug مفتوح عندك (أو اعمل واحد: في مشروع React، خلّي API يرجّع [[price]] كـ string في منتج واحد). قبل ما تلمس الكود، اكتب في ملف ٤ سطور: خطوات الإعادة، وأصغر repro، وفرضيتك، والتجربة اللي هتثبتها أو تنفيها. نفّذ التجربة، ولو الفرضية طلعت غلط، اكتب اللي عرفته وفرضية جديدة. وفي الآخر صلّح واكتب regression test.`,
          sol: R`الملف الكويس شكله كده: «١. افتح الطلب #812، الإجمالي NaN (بيحصل كل مرة). ٢. [[Number('1,200')]] بيطلّع NaN لوحده. ٣. الفرضية: الأسعار اللي فوق الألف جاية من الـ CSV بفاصلة. التجربة: عِد الطلبات اللي فيها NaN، هل كلها فيها منتج فوق ١٠٠٠؟ ٤. آه، ٣٧ من ٣٧».

لاحظ إن التجربة بتقدر تنفي الفرضية: لو لقيت طلب NaN مفيهوش منتج فوق ١٠٠٠، الفرضية غلط أو ناقصة. الفرضية اللي مينفعش تنفيها («حاجة غلط في الداتا») مش فرضية.

والتصليح مكانه الحدود: وقت ما الـ CSV بيدخل، مش في [[total]]. لو صلّحت في [[total]]، كل مكان تاني بيقرا السعر هيبقى فيه نفس الـ bug. والـ regression test على [[parsePrice]]: [[expect(parsePrice('1,200')).toBe(1200)]]، ومعاه حالة لنص مش رقم خالص ([['abc']]) عشان تقرر يرمي ولا يرجّع NaN (درس «fail fast»).

الغلط الشائع: تحط [[|| 0]] بعد [[Number(...)]] والـ NaN يختفي. كده الفاتورة بقت غلط بسكوت بدل ما تبقى غلط باين.`,
          flag: "script",
          deep: {
            why: R`من غير طريقة، الـ debugging بيبقى تخمين: تغيّر حاجة، وتجرّب، وتغيّر حاجة تانية، وبعد ساعتين الـ bug اختفى ومش عارف ليه، ومعاك ٥ تعديلات مش عارف أنهي فيهم المهم. والطريقة بتخلي كل خطوة تقلّل المساحة اللي بتدوّر فيها، زي البحث الثنائي. وكمان بتخليك تشرح لحد تاني انت فين («أعدته، وصغّرته لسطر واحد، وفرضيتي كذا»)، وده اللي الـ senior بيسأل عنه لما تطلب مساعدة.`,
            how: R`١. reproduce: لو مش قادر تعيده، مش هتعرف إنك صلّحته. اجمع: الخطوات، والداتا (الطلب #812 بالظبط)، والبيئة (متصفح، وإنتاج ولا local). ولو بيحصل ساعات بس، ده في حد ذاته معلومة (race condition، أو كاش، أو وقت).

٢. minimal repro: شيل نص الحاجات وشوف لسه بيحصل ولا لأ. هنا من طلب كامل لـ [[Number('1,200')]]. في الفرونت: component لوحده، أو sandbox صغير. وده غالبًا بيحل الـ bug لوحده، ولو محلّهوش، ده اللي تحطه في issue أو سؤال.

٣. hypothesis: جملة فيها «لأن»، وتجربة نتيجتها ممكن تنفيها. والأدوات: [[console.log]] في النقط المهمة، أو breakpoint في VS Code أو DevTools (تاب VS Code)، و Network tab للـ requests، واللوجات.

٤. bisect: لو كان شغال الأسبوع اللي فات، متقراش الكود، لاقي الـ commit (الدرس الجاي).

٥. fix: أصغر تعديل في المكان الصح (غالبًا الحدود).

٦. regression test (درس «regression test»).

ولو علقت أكتر من ساعة: اشرح المشكلة بصوت عالي لحد أو لبطة مطاطية (rubber duck debugging). غالبًا وانت بتشرح «المفروض ده يرجّع كذا...» بتلاقي الافتراض الغلط.`,
            when: "أي bug مش واضح من أول نظرة. ولو الـ bug في الإنتاج والمستخدمين متأثرين، الأولوية: وقّف الضرر الأول (revert أو feature flag)، وبعدين الطريقة دي بهدوء.",
            mistakes: R`تصلّح قبل ما تعيده، فمش عارف إذا كان التصليح عمل حاجة. وتغيّر ٣ حاجات مرة واحدة. وتفترض إن المكتبة أو الـ framework فيه bug: ممكن، بس غالبًا لأ، وقبل ما تفتح issue عندهم اعمل minimal repro. وتسيب [[console.log]] في الـ commit. وفي الانترفيو، سؤال «احكيلي عن أصعب bug صلّحته» بيدوّر على الطريقة دي بالظبط: إزاي أعدته، وإزاي صغّرته، والفرضيات اللي طلعت غلط، وإيه اللي عملته عشان ميرجعش.`
          },
          lines: [
            "الطلب بالظبط اللي فيه المشكلة، بالداتا الحقيقية.",
            "نفس حسبة الإنتاج.",
            "بيطبع NaN: أعدنا الـ bug.",
            "أصغر repro: الرقم العادي شغال، واللي فيه فاصلة NaN.",
            "التصليح: شيل الفواصل قبل التحويل، ومكانه وقت قراية الـ CSV.",
            "بيطبع [[1200]]."
          ]
        },
        {
          cmd: "bisect بالاختبار",
          title: "تخلّي Git يلاقي الـ commit اللي كسر الحاجة لوحده",
          desc: R`لو الحاجة كانت شغالة في نسخة قديمة، مش محتاج تفهم الكود عشان تلاقي السبب. اكتب اختبار صغير بيعيد الـ bug، وسيبه untracked (متعملوش commit)، و [[git bisect run]] بيعدّي على الـ commits بالبحث الثنائي ويشغّل الاختبار في كل واحد، ويقولك أول commit وقع فيه.

أوامر bisect الأساسية في تاب Git، درس «git bisect». هنا بنوصّله باختبار vitest.`,
          example: R`git bisect start HEAD v1.4.0
git bisect run npx vitest run tests/repro-812.test.ts
git show refs/bisect/bad --stat
git bisect log
git bisect reset`,
          try: R`في repo تجربة: commit فيه [[price.js]] بـ [[exports.total = (items) => items.reduce((t, i) => t + i.price * i.qty, 0)]] واعمله tag [[v1]]. بعدين اعمل ٧ commits صغيرة، وفي الخامس غيّر [[*]] لـ [[+]]. اكتب [[tests/repro-812.test.ts]] بيتأكد إن [[total([{ price: 100, qty: 2 }])]] بـ 200، ومتعملوش commit. وبعدين شغّل أوامر المثال مع [[v1]].`,
          sol: R`bisect بياخد حوالي ٣ خطوات لـ ٧ commits، وفي الآخر بيطبع [[<hash> is the first bad commit]] ومعاه رسالة الـ commit الخامس والملفات اللي اتغيرت. [[git show refs/bisect/bad]] بيوريك الـ diff بتاعه قبل الـ reset، وهتلاقي فيه [[i.price + i.qty]].

الاختبار لازم يفضل untracked: Git بيسيب الملفات untracked مكانها وهو بيتنقل بين الـ commits، فالاختبار موجود في كل خطوة حتى في commits أقدم منه. ولو عملته commit، هيختفي في الـ commits القديمة. و [[node_modules]] نفس الكلام (ignored)، بس لو الـ dependencies اتغيرت بين الـ commits، ممكن تحتاج [[npm ci]] في script.

والفخ: لو الاختبار بيقع لسبب تاني في commit قديم (import لدالة لسه متعملتش مثلًا)، bisect هيعتبره bad ويوصلك لـ commit غلط. الحل script بيرجع [[125]] في الحالة دي، و bisect بيفهمها «skip الـ commit ده». وبعد ما تخلص، ماتنساش [[git bisect reset]]، وإلا هتفضل على detached HEAD.`,
          deep: {
            why: R`في مشروع فيه ١٠٠٠ commit بين آخر نسخة شغالة ودلوقتي، bisect بيلاقي الـ commit في حوالي ١٠ خطوات (log2 1000). ولما الخطوات أوتوماتيك باختبار، ده دقيقة بدل يوم. والـ commit اللي لقيته بيقولك مين غيّر إيه وليه (الرسالة والـ PR)، وده غالبًا بيوضّح السبب أسرع من قراية الكود كله.`,
            how: R`[[git bisect start HEAD v1.4.0]]: الأول bad والتاني good. و bisect بيعمل checkout لـ commit في النص.

[[git bisect run <command>]]: بيشغّل الأمر في كل خطوة. exit code 0 يبقى good، و 125 skip، وأي حاجة تانية من 1 لـ 127 bad. و vitest بيرجع 1 لو اختبار وقع، فبيتوصّل مباشرة.

[[refs/bisect/bad]] بيشاور على أول commit وحش بعد ما bisect يخلص، و [[git bisect log]] بيطبع كل الخطوات (تقدر تحطها في الـ issue).

ولأن bisect بيفترض إن الـ bug ظهر مرة واحدة وفضل، commits صغيرة كل واحد فيها شغال لوحده بتخلي bisect دقيق. commit فيه ٤٠ ملف بيقولك «السبب في الـ ٤٠ دول». ده سبب تاني للـ commits الصغيرة في درس «refactor بأمان».

ولو بتستخدم squash merge، كل PR بيبقى commit واحد على main، فـ bisect بيوصلك للـ PR، وده غالبًا كفاية.`,
            when: "الـ regressions: حاجة كانت شغالة في نسخة معروفة وبقت مش شغالة، ومش واضح ليه. ومش مفيد لـ bug موجود من الأول.",
            mistakes: R`تعمل commit للاختبار قبل الـ bisect. وتنسى [[git bisect reset]]. وتختار good commit مش متأكد إنه سليم فعلًا (جرّبه الأول). واختبار flaky بيدّي نتيجة مختلفة كل مرة، فـ bisect بيوصلك لأي commit. وفي الانترفيو، إنك تذكر [[git bisect run]] مع اختبار لما تتسأل عن debugging regression بيفرّقك عن اللي بيقول «هقرا الكود».`
          },
          lines: [
            "ابدأ: HEAD فيه الـ bug، و v1.4.0 كانت سليمة.",
            "في كل خطوة شغّل الاختبار ده. أخضر = good، أحمر = bad. الملف untracked فموجود في كل commit.",
            "بعد ما يخلص: وريني أول commit وحش والملفات اللي غيّرها.",
            "الخطوات اللي bisect عملها، تنسخها في الـ issue.",
            "ارجع للـ branch بتاعك."
          ]
        },
        {
          cmd: "codebase مش بتاعك",
          title: "أول أسبوع في مشروع ضخم محدش شرحهولك",
          desc: R`متحاولش تقرا المشروع كله من فوق لتحت. اختار حاجة واحدة المستخدم بيعملها (مثلًا «يطبّق كوبون») وتتبعها من الزرار في الـ UI لحد الصف في الداتابيز وراجع. بعد مسار واحد كامل، هتبقى فاهم الطبقات والأسماء والـ conventions أكتر من يومين قراية.

وقبلها ١٥ دقيقة على الحاجات اللي بتقول «المشروع ده بيشتغل إزاي»: README، و [[package.json]] (الـ scripts)، والـ CI، و ADRs لو فيه.`,
          example: R`cat README.md
npm run
ls docs/adr
git log --oneline -15
git grep -n "Apply coupon" -- src
git grep -n "/api/coupons" -- src
git grep -n "applyCoupon(" -- src
git log --oneline -5 -- src/server/coupons.ts
git blame -L 40,60 src/server/coupons.ts`,
          try: R`في مشروع open source Next أو Express (أو مشروع الشغل)، اختار زرار واحد، وتتبعه لحد الداتابيز بأوامر المثال، واكتب المسار في ملف [[notes.md]]: كل خطوة فيها الملف والدالة. وحط breakpoint (أو [[console.log]]) في كل محطة وشغّل التطبيق واتأكد إن الـ request فعلًا عدّى من هناك. وفي الآخر اكتب ٣ أسئلة مش عارف إجابتها.`,
          sol: R`[[notes.md]] الكويس شكله كده:

«زرار Apply في [[CouponBox.tsx:18]] بينادي [[useCoupon().apply]]. ده بيعمل [[POST /api/coupons/apply]] ([[lib/api.ts]]). الـ route في [[app/api/coupons/apply/route.ts]]، بتعمل validate بـ zod وبتنادي [[couponService.apply]] ([[server/coupons.ts:42]]). الـ service بتقرا من [[prisma.coupon.findUnique]]، وبتحسب بـ [[applyCoupon]] (pure، في [[lib/pricing.ts]])، وبتكتب في [[order.discount]]. الـ response بيرجع [[{ total, discount }]]، والـ hook بيحدّث الـ state.»

والأسئلة: «ليه الكوبون بيتحسب في السيرفر والفرونت الاتنين؟»، «مين بيعمل الكوبونات؟ مفيش admin UI»، «[[order.discount]] بيتحسب تاني وقت الدفع ولا بيتصدّق؟». الأسئلة دي بتوديها لحد في الفريق مرة واحدة ومكتوبة، أحسن من ١٠ رسايل متفرقة.

لو محطة من المحطات مااتنفذتش في الـ breakpoint، يبقى فيه طريق تاني انت مشفتوش (feature flag، أو route قديمة). وده من أهم الاكتشافات. والغلط الشائع إنك تفضل تقرا أسبوع من غير ما تشغّل حاجة، أو تبدأ تعمل refactor في أول يوم.`,
          deep: {
            why: R`في أول شغلانة، الكود غالبًا أكبر من اللي شفته قبل كده بـ ١٠٠ مرة، ومحدش عنده وقت يشرحهولك سطر سطر. اللي بيقرا المشروع ملف ملف بيغرق، لأن مفيش سياق يربط الحاجات. وتتبع مسار واحد بيدّيك الهيكل كله في مثال حقيقي: فين الـ routes، وإزاي الـ validation، وفين البيزنس، وإزاي الوصول للداتابيز. وكل feature بعد كده غالبًا نفس الشكل.`,
            how: R`الترتيب:

١. الصورة الكبيرة (ربع ساعة): README بيقول إزاي تشغّله. و [[npm run]] من غير اسم بيطبع كل الـ scripts (dev و test و migrate و seed). والـ CI ([[.github/workflows]]) بيقولك إيه اللي لازم يعدّي. و [[docs/adr]] (Architecture Decision Records) لو موجود: ملفات قصيرة كل واحد بيقول قرار كبير وليه اتاخد («ليه Postgres مش Mongo»). و [[git log]] بيوريك المشروع ماشي في أنهي اتجاه.

٢. مسار واحد: ابدأ من نص ظاهر في الـ UI ([[git grep "Apply coupon"]])، ومنه للـ handler، ومنه للـ URL، ومنه للـ route على السيرفر، وللـ service، وللداتابيز. [[git grep]] بيدوّر في الملفات المتتبعة بس، فمش هيغرق في [[node_modules]]. وفي VS Code، F12 (Go to Definition) و Shift+F12 (Find All References) أسرع (تاب VS Code).

٣. التاريخ: [[git log -- file]] بيقولك مين بيشتغل على الملف ده، و [[git blame -L]] بيقولك مين كتب السطور دي وفي أنهي commit، ومنه للـ PR اللي فيه النقاش. «ليه الكود ده غريب كده؟» إجابته غالبًا في الـ PR.

٤. الاختبارات: الاختبارات أحسن توثيق للسلوك المتوقع. اقرا اختبارات الـ module قبل الكود.

٥. أول مهمة: غالبًا bug صغير أو تعديل. متعملش refactor للي مش عاجبك في أول أسبوعين: ممكن فيه سبب مش شايفه، واسأل الأول.`,
            when: "أول أسبوع في أي شغلانة أو مشروع open source، وكل مرة تمسك جزء من المشروع مالمستوش قبل كده.",
            mistakes: R`تقرا من غير ما تشغّل: شغّل التطبيق يوم ١، والـ breakpoint بيقولك الحقيقة، مش القراية. وتستنى أسبوع عشان تسأل «عشان مايبانش إني مش فاهم»: الفريق متوقع أسئلة، والسؤال المكتوب بعد ما جرّبت («عملت كذا ولقيت كذا، ومش فاهم ليه كذا») بيبان كويس جدًا. وتحكم على الكود بسرعة («ده مكتوب وحش»). وتنسى تكتب اللي فهمته: الـ notes دي ممكن تبقى أول PR ليك في README. وفي الانترفيو لو اتسألت «هتعمل إيه أول أسبوع؟»: شغّل المشروع، واقرا الـ README والـ CI، وتتبع مسار واحد، واسأل أسئلة مكتوبة، وخد مهمة صغيرة.`
          },
          lines: [
            "إزاي بيشتغل، وإزاي بيتشغّل.",
            "من غير اسم script: بيطبع كل الـ scripts المتاحة.",
            "قرارات المعمارية وأسبابها، لو موجودة.",
            "آخر ١٥ commit: الفريق شغال على إيه دلوقتي.",
            "ابدأ من نص ظاهر في الـ UI: فين الزرار.",
            "من الـ component للـ URL اللي بيبعتله، وتلاقي الاتنين: الفرونت والـ route.",
            "من الـ route للـ service: مين بينادي الدالة دي.",
            "مين غيّر الملف ده مؤخرًا وليه.",
            "مين كتب السطور دي وفي أنهي commit، ومنه للـ PR."
          ]
        }
      ]
    },
    {
      t: "الفريق",
      l: 3,
      n: "PR بيتراجع بسرعة، وقواعد الـ repo، وتراجع وتتراجع من غير خناق، وتقسّم الشغل، وتقدّر الوقت بصدق",
      items: [
        {
          cmd: "PR يتراجع",
          title: "PR صغير الـ reviewer يخلّصه في ربع ساعة",
          desc: R`الـ PR اللي بيتراجع بسرعة ليه ٣ صفات: صغير (غالبًا أقل من ٤٠٠ سطر، وبيعمل حاجة واحدة)، ووصفه بيقول إيه وليه وإزاي تجرّبه (ومعاه صور لو فيه UI)، وصاحبه راجعه بنفسه قبل ما يطلب من حد.

الـ self-review أهم خطوة ومحدش بيعملها: اقرا الـ diff كله كأنك الـ reviewer، قبل ما تعمل الـ PR. هتلاقي [[console.log]] منسي، وملف اتغير بالغلط، وتعليق TODO. كل حاجة تلاقيها انت هي تعليق الـ reviewer مش هيحتاج يكتبه.`,
          example: R`git diff main...HEAD --stat
git diff main...HEAD
npm run lint && npm test
git push -u origin feat/coupon-expiry
gh pr create --title "feat(coupon): reject expired coupons" --body-file pr.md --reviewer sara`,
          try: R`خد آخر تغيير عملته (أو ميزة انتهاء الكوبون من درس «red green refactor»)، واعمل self-review بـ [[git diff main...HEAD]] وصلّح كل حاجة تلاقيها. وبعدين اكتب [[pr.md]] فيه ٤ أجزاء: إيه اللي اتغير، وليه (والـ issue)، وإزاي أجرّبه (خطوات بالأرقام)، وأي حاجة عايز رأي فيها. وحط صورة قبل وبعد لو فيه UI.`,
          sol: R`الـ self-review غالبًا هيطلّع ٢ لـ ٥ حاجات في أول مرة: log منسي، وتغيير formatting في ملف مالكش دعوة بيه (رجّعه بـ [[git restore -s main -- file]])، واسم مؤقت. و [[--stat]] بيوريك لو فيه ملف مكانش المفروض يتغير خالص.

والوصف الكويس زي اللي تحت: الـ reviewer يعرف من أول سطرين هو بيراجع إيه، ويقدر يجرّب من غير ما يسألك. أهم جزء «إزاي تجرّب»، لأنه بيخلي المراجعة تجربة مش قراية بس. وجزء «عايز رأيك في» بيوجّه المراجعة للحتة اللي انت مش متأكد منها بدل ما تتوه في الأسماء.

الغلط الشائع: الوصف «fixed coupon bug» أو فاضي، أو قايمة commits منسوخة ([[--fill]] مفيد للبداية بس). ولو الـ PR عدّى ٤٠٠ سطر، فكّر تقسّمه (درس «draft PR و التقسيم») قبل ما تبعته.`,
          solCode: R`## What
Coupons with an expiry date are rejected at checkout with a clear message.

## Why
Closes #151. Expired SUMMER26 codes were still applied after the campaign ended.

## How to test
1. npm run db:seed (adds EXPIRED10, which expired yesterday)
2. Add any product to the cart and apply EXPIRED10
3. You should see "This coupon has expired" and the total unchanged
4. Apply SAVE10: it still works

## Notes for the reviewer
- applyCoupon now takes "now" as a third argument (defaults to new Date()) so tests can pass a fixed time.
- Not sure about the error message wording. Product didn't specify.

## Screenshots
| Before | After |
| --- | --- |
| ![before](before.png) | ![after](after.png) |`,
          deep: {
            why: R`الـ reviewer بيراجع PR بـ ٥٠ سطر بتركيز ويلاقي المشاكل. وبيراجع PR بـ ٢٠٠٠ سطر في نفس الوقت تقريبًا، بس بيعمل scroll ويكتب «LGTM»، لأن مفيش حد عنده ٣ ساعات تركيز. يعني الـ PR الكبير مش بيتراجع فعلًا، بياخد وقت أطول بس. والـ PR الصغير كمان بيتدمج أسرع، فبيقل الـ merge conflicts، ولو فيه bug، الـ revert بيشيل حاجة صغيرة.`,
            how: R`[[git diff main...HEAD]] (٣ نقط) بيوريك اللي اتغير في الـ branch بتاعك من ساعة ما خرجت من main، من غير التغييرات اللي حصلت في main بعدها. ده بالظبط اللي الـ PR هيعرضه. و [[--stat]] ملخص بعدد السطور في كل ملف.

وقبل الـ push: الـ lint والاختبارات عندك. متخليش الـ CI يلاقي حاجة كنت تقدر تلاقيها في ٣٠ ثانية (تاب «فحص الكود»).

وعنوان الـ PR بشكل Conventional Commits ([[feat(coupon): ...]]) لو الفريق بيستخدم squash merge: العنوان بيبقى رسالة الـ commit على main. و [[--reviewer]] بيطلب المراجعة من حد معين، ولو فيه CODEOWNERS الطلب بيروح أوتوماتيك (الدرس الجاي).

والحاجة الواحدة: refactor في PR، و feature في PR، و formatting لكل المشروع في PR. لو عملت rename لدالة بتستخدم في ٣٠ ملف وانت شغال على الميزة، ده PR لوحده قبلها.`,
            when: "كل PR، من أول يوم في الشغل. والوصف بيطول مع حجم التغيير: typo fix سطر، وميزة فيها UI فيها خطوات وصور.",
            mistakes: R`تفتح الـ PR وتروح تعمل self-review في GitHub بعد ما الـ reviewer اتبعتله إشعار. وتحط «WIP» في العنوان بدل draft. وتطلب review والـ CI أحمر. وتخلط تغيير formatting (prettier على الملف كله) مع تغيير حقيقي، فالـ diff بيبقى ٥٠٠ سطر والتغيير الحقيقي ٥ مستخبيين فيهم. وفي الانترفيو لو اتسألت «إيه اللي بيخلي PR كويس؟»: صغير وبيعمل حاجة واحدة، ووصف فيه ليه وإزاي تجرّب، و self-review قبل ما يوصل لحد.`
          },
          lines: [
            "ملخص: أنهي ملفات اتغيرت وبكام سطر. لو فيه ملف مستغربه، شيله.",
            "الـ self-review: اقرا كل سطر زي ما الـ reviewer هيشوفه.",
            "الفحص عندك الأول، مش في الـ CI.",
            "ارفع الـ branch.",
            "اعمل الـ PR بعنوان واضح ووصف من ملف، واطلب review من حد معين."
          ]
        },
        {
          cmd: "CODEOWNERS و rulesets",
          title: "مين يراجع إيه، ومحدش يدمج من غير مراجعة",
          desc: R`٣ ملفات وإعدادات بتنظّم الـ PRs في أي repo جدي:

[[.github/pull_request_template.md]]: الوصف اللي بيظهر أوتوماتيك في كل PR جديد، فمحدش ينسى «إزاي تجرّب».

[[.github/CODEOWNERS]]: كل مسار ومين المسؤول عنه. لما PR يلمس الملفات دي، GitHub بيطلب مراجعتهم أوتوماتيك.

والـ rulesets (أو branch protection القديمة) في Settings: قواعد على main زي «لازم PR»، و «لازم approval واحد على الأقل»، و «لازم الـ CI يعدّي»، و «ممنوع force push».`,
          example: R`# .github/CODEOWNERS
# آخر سطر بيطابق الملف هو اللي بيكسب، فالعام الأول والخاص بعده
*                      @acme/web
/src/payments/         @acme/payments @sara
/prisma/migrations/    @acme/backend
/.github/workflows/    @acme/devops
*.md                   @acme/web @mona`,
          try: R`في repo تجربة عندك على GitHub: اعمل [[.github/pull_request_template.md]] و [[.github/CODEOWNERS]] (باسم حسابك بدل الفرق)، واعمل ruleset على main من Settings ثم Rules ثم Rulesets: Require a pull request before merging، و Require status checks to pass (اختار الـ CI بتاعك)، و Block force pushes. وبعدين جرّب [[git push origin main]] مباشرة، واعمل PR وشوف الـ template والـ checks. ولو معاك [[gh]]، [[gh ruleset check main]] بيطبع القواعد.`,
          sol: R`الـ push المباشر على main بيترفض برسالة فيها إن الـ branch محمية بـ ruleset وإن التغيير لازم ييجي من PR. والـ PR الجديد بيفتح والوصف فيه الـ template، وزرار الـ merge مقفول لحد ما الـ checks تخلص وتبقى خضرا. و [[gh ruleset check main]] بيطبع القواعد اللي بتنطبق على main.

لو انت لوحدك في الـ repo، «Required approvals» هتقفل عليك، لأن GitHub مبيسمحش إنك تعمل approve للـ PR بتاعك. في repo شخصي خليها صفر وسيب الـ status checks، أو ضيف نفسك في bypass list. وفي repo private على خطة مجانية، الـ rulesets ممكن متكونش متاحة، والكلام ده بيتغير، فشوف صفحة الـ Settings عندك.

والـ template الكويس قصير: ٤ عناوين و checklist صغيرة. الـ template الطويل (٢٠ checkbox) الناس بتعلّم عليه كله من غير ما تقرا.`,
          solCode: R`<!-- .github/pull_request_template.md -->
## What

## Why
Closes #

## How to test
1.

## Screenshots (UI changes)

- [ ] Tests added or updated
- [ ] Self-reviewed the diff`,
          flag: "script",
          deep: {
            why: R`من غير قواعد، أي حد (حتى انت الساعة ٢ بالليل) يقدر يعمل push على main، والـ CI بيبقى «اقتراح». والـ reviewers بيتختاروا بالصدفة: الـ migration بتتدمج من غير ما حد من الباك إند يشوفها. الـ CODEOWNERS والـ rulesets بيخلوا الإجراءات دي أوتوماتيك، فمحدش محتاج يفتكرها، ومحدش يقدر يتخطاها بالغلط.`,
            how: R`CODEOWNERS: ينفع يبقى في [[.github/]] أو الـ root أو [[docs/]]. كل سطر pattern (بنفس شكل [[.gitignore]] تقريبًا) وبعده users أو teams. ولو أكتر من سطر بيطابق نفس الملف، آخر واحد هو اللي بيكسب: ملف [[README.md]] جوه [[src/payments/]] هيروح لـ [[@acme/web @mona]] مش لفريق الـ payments، لأن [[*.md]] بعده. وده لوحده مش بيمنع الدمج: بيطلب المراجعة بس، إلا لو فعّلت «Require review from Code Owners» في الـ ruleset. والـ draft PRs مبيتطلبلهاش code owners غير لما تبقى ready.

الـ rulesets الأحدث من branch protection، وأهم القواعد لـ main:
Require a pull request before merging، ومعاها عدد الـ approvals.
Dismiss stale approvals: أي commit جديد بعد الـ approval بيلغيه، فمحدش يزوّد حاجة بعد الموافقة.
Require conversation resolution: كل التعليقات لازم تتقفل.
Require status checks to pass: الـ lint والاختبارات والـ build (من GitHub Actions، تاب GitHub Actions).
Block force pushes و Restrict deletions.

وتقدر تعمل bypass لناس معينين (زي bot الـ releases). وفيه برضه merge queue للـ repos الزحمة، بيتأكد إن الـ checks بتعدّي على main بعد الدمج مش على الـ branch لوحدها.`,
            when: "أي repo عليه أكتر من شخص، أو عليه deploy أوتوماتيك من main. وفي المشاريع الشخصية على الأقل «Require status checks» و «Block force pushes» عشان تحمي نفسك من نفسك.",
            mistakes: R`CODEOWNERS فيه شخص واحد لكل حاجة، فبيبقى bottleneck وكل PR مستنيه. استخدم teams. وترتيب غلط: [[*]] في الآخر بيلغي كل اللي قبله. و required checks بأسماء jobs اتغيرت، فالـ PR بيفضل مستني check عمره ما هيجي. وتدّي كل الفريق bypass «عشان الطوارئ»، فالقواعد بقت ديكور. وفي الانترفيو، إنك تعرف الفرق بين إن CODEOWNERS «بيطلب» المراجعة وإن الـ ruleset «بيفرضها» بيبيّن إنك اشتغلت في فريق فعلًا.`
          },
          lines: [
            "الافتراضي: أي ملف مالوش سطر أخص، فريق الويب بيراجعه.",
            "كود الدفع: فريق الـ payments وسارة.",
            "الـ migrations: الباك إند لازم يشوف أي تغيير في الداتابيز.",
            "الـ CI نفسه: فريق الـ devops، عشان محدش يشيل الاختبارات من الـ workflow بهدوء.",
            "ملفات التوثيق في أي مكان. ولأنه آخر سطر، بيكسب حتى جوه payments."
          ]
        },
        {
          cmd: "ترتيب المراجعة",
          title: "تراجع PR بالترتيب مش من أول سطر",
          desc: R`متبدأش من أول سطر في الـ diff وتعلّق على الأسماء. الترتيب:

١. الهدف: اقرا الوصف والـ issue. التغيير ده بيحل المشكلة الصح؟ ولا المفروض يتعمل بطريقة تانية خالص؟
٢. الصحة: بيعمل اللي بيقوله؟ الحالات الحدّية والأخطاء وحالة الفشل؟ جرّبه.
٣. الأمان: input من المستخدم، والصلاحيات، والأسرار، والـ SQL.
٤. الاختبارات: فيه؟ بتختبر السلوك؟ هتقع لو الكود باظ؟
٥. الأسماء والشكل: آخر حاجة، وأغلبها nit.

لو لقيت مشكلة في الخطوة ١، وقّف واكتبها. مفيش فايدة من ٢٠ تعليق على أسماء في كود هيتكتب تاني.`,
          example: R`gh pr view 42
gh pr checks 42
gh pr diff 42 --name-only
gh pr checkout 42
npm ci && npm test
gh pr diff 42`,
          try: R`راجع PR حقيقي: لزميل، أو PR مفتوح في مشروع open source صغير بتستخدمه. امشي بالخطوات الخمسة بالترتيب، واكتب لكل خطوة سطر واحد (حتى لو «مفيش مشاكل»)، وبعدين التعليقات. قبل ما تبعت، رتّب التعليقات: الـ blockers الأول.`,
          sol: R`الناتج الكويس شكله كده: «١. الهدف: بيحل #151 (الكوبونات المنتهية)، والطريقة منطقية. ٢. الصحة: جرّبته، المنتهي بيترفض. بس لو الكوبون انتهى وهو في الكارت، الـ checkout بيعيد الحساب؟ ٣. الأمان: الكود مش بيتقري من المستخدم غير الـ code نفسه، وبيتحقق بـ zod. تمام. ٤. الاختبارات: فيه ٣، بس مفيش حالة لحظة الانتهاء بالظبط. ٥. الأسماء: [[couponData]] ممكن تبقى [[coupon]]».

ومن الخطوات دي طلع تعليق blocking واحد (إعادة الحساب في الـ checkout)، وواحد suggestion (اختبار الحد)، وواحد nit. ده review مفيد في ١٥ دقيقة.

الغلط الشائع: ١٥ تعليق على الأسماء والفواصل، ومحدش لاحظ إن الكوبون ممكن يتطبق مرتين على نفس الطلب. الـ formatting والـ lint مكانهم الأدوات (prettier و ESLint في الـ CI)، مش البني آدمين.`,
          deep: {
            why: R`الـ review ليه ٣ أهداف: يمسك bugs قبل الإنتاج، ويخلي أكتر من شخص فاهم كل جزء (فلو صاحب الكود في إجازة الشغل ميقفش)، ويخلي الكود على نفس الأسلوب. والترتيب بيضمن إن وقتك المحدود بيروح للحاجات الغالية: bug في الأمان بيتكلف أكتر بكتير من اسم متغير.`,
            how: R`[[gh pr view]] بيطبع العنوان والوصف والحالة. و [[gh pr checks]] بيقولك الـ CI عدّى ولا لأ، ولو أحمر ممكن تستنى صاحبه يصلّحه قبل ما تبدأ.

[[--name-only]] بيوريك شكل التغيير: ملفات في الـ migrations؟ في الـ auth؟ دي أماكن تبص فيها بتركيز أكتر.

[[gh pr checkout]] بينزّل الـ branch عندك (حتى من fork)، فتشغّل الاختبارات وتجرّب «إزاي تجرّب» اللي في الوصف. كتير من الـ bugs مش باينة في الـ diff وباينة في دقيقة تجربة.

وأسئلة الأمان السريعة: فيه input من المستخدم بيوصل لـ SQL أو HTML أو shell أو مسار ملف؟ فيه endpoint جديد، وبيتحقق من الصلاحية (مش بس إن المستخدم عامل login، إنه صاحب الـ order ده)؟ فيه سر في الكود أو في اللوج؟ (تاب «الأمان»).

وحاجات تبص عليها في كل PR: error handling (فيه [[catch {}]] فاضي؟)، و N+1 query جوه loop، و migration بتقفل جدول كبير، وحاجة بتتغير في API عام ممكن تكسر clients.

والوقت: حاول ترد في نفس اليوم. الـ review المتأخر بيوقف زميلك. ولو الـ PR كبير ومش هتلحق، قول كده.`,
            when: "كل PR اتطلب منك. وحتى لو انت جونيور، مراجعتك لـ PR زميل senior مفيدة: هتتعلم الكود، وأسئلتك («ليه عملت كذا؟») بتكشف حاجات كتير.",
            mistakes: R`LGTM من غير ما تشغّله أو تفهمه. وتراجع الأسماء بس لأنها أسهل. وتعيد كتابة الـ PR في دماغك بطريقتك وتطلب تغييرات «ذوق» كـ blockers. وتتأخر ٣ أيام. وفي الانترفيو سؤال «بتبص على إيه في code review؟» بيتسأل كتير: الإجابة القوية هي الترتيب ده بالظبط، مع مثال لـ bug مسكته أو اتمسك عليك.`
          },
          lines: [
            "الوصف والـ issue: الهدف الأول.",
            "الـ CI عدّى؟ لو أحمر، غالبًا صاحبه لسه شغال.",
            "شكل التغيير: أنهي ملفات، وفيها حاجات حساسة؟",
            "نزّل الـ branch عندك.",
            "ثبّت وشغّل الاختبارات، وبعدين جرّب خطوات الوصف بإيدك.",
            "دلوقتي اقرا الـ diff، وانت عارف الهدف وشايف السلوك."
          ]
        },
        {
          cmd: "تعليق review",
          title: "تعليق بيتفهم صح وبيقول قد إيه مهم",
          desc: R`تعليق الـ review الكويس بيقول ٣ حاجات: المشكلة، وليه مهمة، وقد إيه مهمة (لازم تتصلّح قبل الدمج، ولا رأي). وبيتكتب سؤال أو اقتراح مش أمر: «إيه رأيك نعمل كذا؟» أو «إيه اللي يحصل لو كذا؟» بدل «غيّر ده». لأن ممكن صاحب الـ PR عنده سبب انت مش شايفه.

أسلوب منتشر اسمه Conventional Comments: كل تعليق يبدأ بنوعه ([[question]] و [[issue]] و [[suggestion]] و [[nitpick]] و [[praise]]) وبعده [[(blocking)]] أو [[(non-blocking)]]. كده صاحب الـ PR يعرف فورًا أنهي تعليق يوقّف الدمج.`,
          example: R`question: لو الـ gateway رد بـ timeout، الطلب بيفضل pending للأبد؟ مش شايف مين بيرجّعه.
issue (blocking): الـ code داخل الـ query كنص، ده SQL injection. ينفع نستخدم parameter زي باقي الملف؟
suggestion (non-blocking): الحسبة دي نفس اللي في cart.ts، ممكن تبقى applyCoupon واحدة في lib/pricing؟
nitpick (non-blocking): couponData ممكن تبقى coupon، الـ Data مش بتضيف معلومة.
praise: اختبار الـ 200 بالظبط ممتاز، ده كان هيفوتني.`,
          try: R`خد ٥ تعليقات review كتبتها أو اتكتبت عليك (أو التعليقات دي: «غلط»، «ليه عملت كده؟؟»، «استخدم map»، «مش هيشتغل»، «rename»). أعد كتابة كل واحد بالشكل ده: النوع، و blocking ولا لأ، والمشكلة، وليه، واقتراح.`,
          sol: R`مثال لإعادة الكتابة:

«غلط» تبقى: [[issue (blocking): لو items فاضية، reduce من غير قيمة ابتدائية بترمي TypeError. ينفع نضيف 0؟]]

«ليه عملت كده؟؟» تبقى: [[question: ليه الـ retry هنا جوه الـ loop؟ خايف لو الـ API واقع نبعت 30 request.]] نفس السؤال، من غير اتهام، ومعاه السبب اللي مقلقك.

«استخدم map» تبقى: [[nitpick (non-blocking): map هنا ممكن تشيل الـ push والمتغير المؤقت.]]

«مش هيشتغل» تبقى: [[issue (blocking): جرّبته محليًا بكوبون منتهي وعدّى. خطوات: ...]] الـ blocking لازم معاه دليل أو سيناريو.

«rename» تبقى: [[nitpick: data ممكن تبقى orders؟]]

لاحظ إن كل blocker فيه سيناريو بيبوظ، وكل ذوق بقى nitpick. الغلط الشائع إنك تعلّم كل حاجة blocking، فصاحب الـ PR ميعرفش إيه المهم بجد، أو متعلّمش أي حاجة فيضطر يصلّح الـ ٢٠ تعليق عشان مش عارف.`,
          flag: "script",
          deep: {
            why: R`الكلام المكتوب بيتقري أقسى من ما اتقال. «غيّر ده» ممكن تبقى في دماغك عادية، وصاحب الـ PR يقراها إنك شايفه مش فاهم. ومع الوقت الـ reviews بتتحول لخناق، والناس بتعمل PRs أكبر عشان «يخلصوا من المراجعة مرة واحدة». والتصنيف (blocking ولا لأ) بيوفّر رايح جاي كتير: الـ PR بيتدمج بعد الـ blockers، والـ nits تتصلّح أو تتأجل.`,
            how: R`نصايح بتفرق:

علّق على الكود مش الشخص: «الدالة دي بترجّع null» مش «انت نسيت».

اسأل لما مش متأكد: «فاتني حاجة؟ ده مش بيعمل كذا؟» ساعات انت اللي غلطان، والسؤال بيخلي ده سهل.

اقترح الحل: GitHub بيخليك تكتب [[suggestion]] block في التعليق (بتكتب ٣ backticks وبعدها كلمة suggestion وتحط الكود الجديد)، وصاحب الـ PR يطبّقه بزرار «Commit suggestion».

اعمل review واحد مش ٢٠ إشعار: في GitHub «Start a review» بيجمّع التعليقات وبتتبعت مرة واحدة مع قرار: Comment أو Approve أو Request changes. ومن الترمنال: [[gh pr review 42 --request-changes --body "..."]].

الـ Approve مع nits مقبول: «Approve، والـ nits براحتك». ده بيوفّر يوم.

والمدح حقيقي مش مجاملة: لو حاجة عجبتك قولها بتحديد. بيعلّم الفريق إيه اللي عايزين منه أكتر.

ولو النقاش عدّى ٣ ردود في نفس التعليق، كلّم الشخص صوت أو في مكالمة ٥ دقايق، واكتب القرار في الـ thread.`,
            when: "كل تعليق review. وأهم ما يكون مع ناس جديدة في الفريق، ومع الـ PRs من contributors في open source، لأنهم ممكن ميرجعوش لو التعليق كان جاف.",
            mistakes: R`«?» لوحدها أو «no». وتعلّق على الـ formatting اللي المفروض prettier يعمله. و Request changes على nits بس. وتكتب «ليه مش عملت كذا؟» وانت قصدك «اعمل كذا»: قول اللي عايزه بوضوح ومعاه السبب. وفي الانترفيو لو اتسألت «لو مش موافق على كود زميل senior؟»: بتسأل بسؤال ومعاك سبب أو سيناريو، ولو فضل الخلاف، النقاش بيتنقل لمكالمة أو لحد تالت، والقرار بيتكتب.`
          },
          lines: [
            "سؤال: مش متأكد، ومعاه سيناريو محدد، ومش بيتهم.",
            "مشكلة بتوقّف الدمج: ليه خطيرة، ومعاها الحل على شكل سؤال.",
            "اقتراح مش ضروري للدمج، ومعاه السبب (تكرار).",
            "ذوق: صاحب الـ PR يقرر.",
            "مدح محدد: بيقول إيه بالظبط اللي كويس."
          ]
        },
        {
          cmd: "تستقبل review",
          title: "تعليقات كتير على الـ PR بتاعك، وبعدين؟",
          desc: R`التعليقات على الكود مش عليك. اقراها كلها الأول قبل ما ترد على أي واحد، واشكر، وبعدين لكل تعليق: يا تصلّح وتقول صلّحت فين، يا تشرح ليه لأ بهدوء ومعاك سبب، يا تسأل لو مش فاهم. ومتقفلش thread بنفسك من غير رد.

والتصليحات تبقى commits صغيرة من نوع fixup: [[git commit --fixup=<hash>]] بيعمل commit مربوط بالـ commit اللي بيصلّحه. الـ reviewer يشوف التغيير الجديد بس، وقبل الدمج [[--autosquash]] بيدمج كل fixup في الـ commit بتاعه.`,
          example: R`gh pr view 42 --comments
git commit --fixup=a1b2c3d
git push
gh pr comment 42 --body "Fixed in 9f8e7d6. Kept 3 retries, reason in the thread."
gh pr edit 42 --add-reviewer sara
git rebase -i --autosquash main
git push --force-with-lease
gh pr review 42 --approve`,
          try: R`في repo تجربة: branch فيها commitين ([[feat: add b]] و [[feat: add c]]). اعمل تعديل على ملف الأول وعمله [[git commit --fixup=<hash الأول>]]، وشوف [[git log --oneline]]. وبعدين [[git rebase -i --autosquash main]] (احفظ واقفل الـ editor من غير ما تغيّر حاجة) وشوف الـ log تاني.`,
          sol: R`قبل الـ rebase الـ log شكله: [[fixup! feat: add b]] فوق، وتحته [[feat: add c]] و [[feat: add b]]. والـ editor بيفتح والـ fixup متنقل لوحده تحت [[pick ... feat: add b]] ومكتوب قبله [[fixup]]. بعد ما تحفظ، الـ log بيرجع commitين بس، و [[git show HEAD~1]] بيوريك إن التعديل بقى جوه [[feat: add b]]. وهاشات الـ commits اتغيرت، فعشان كده الـ push بعدها لازم [[--force-with-lease]].

إمتى تعمل الـ autosquash: بعد ما الـ reviewer يوافق، مش قبلها، عشان يفضل شايف التغييرات الجديدة بس. ولو الفريق بيعمل squash merge، مش محتاجه خالص: GitHub هيدمج كل حاجة commit واحد.

الغلط الشائع: [[git push --force]] من غير lease، فتمسح commit زميلك زقّه على نفس الـ branch (ولو حد عمل «Commit suggestion» من GitHub، ده commit على الـ branch بتاعك مش عندك). و [[--force-with-lease]] بيرفض لو الـ branch على GitHub اتغير من آخر مرة شفته.`,
          deep: {
            why: R`أول review كبير على الـ PR بتاعك بيحسّسك إنك بتتحاكم، وده طبيعي. بس الـ reviewer اللي كتب ١٥ تعليق صرف ساعة يقرا كودك بتركيز، وده أحسن من إن الـ bugs دي تطلع في الإنتاج. واللي بيستقبل الـ review كويس (بيصلّح بسرعة، وبيشرح من غير ما يدافع، وبيتعلم) بيتراجعله أسرع وبيتثق فيه أسرع. وده من أسرع الطرق إنك تكبر كـ جونيور.`,
            how: R`[[gh pr view --comments]] بيطبع الوصف والتعليقات في الترمنال.

الـ fixup: [[git commit --fixup=a1b2c3d]] بيعمل commit رسالته [[fixup! <رسالة a1b2c3d>]]. وهاش الـ commit بتجيبه من [[git log --oneline]]. والـ reviewer في GitHub يقدر يشوف «changes since your last review» بس.

الرد على كل تعليق: «صلّحت في 9f8e7d6» فيها الهاش، فالـ reviewer يضغط عليه ويشوف التصليح لوحده. ولو مش موافق: «فكرت في كده، بس X لأن Y. لو لسه شايف إنه أحسن، أغيّره». وسيب الـ reviewer هو اللي يقفل الـ thread لو ده عرف الفريق.

طلب المراجعة تاني: [[gh pr edit --add-reviewer]] أو زرار re-request جنب اسمه في GitHub.

[[git rebase -i --autosquash main]] بيفتح قايمة الـ rebase وكل fixup متحط تحت الـ commit بتاعه، فبتحفظ وتقفل. وفي نسخ Git الجديدة [[--autosquash]] بيشتغل من غير [[-i]] كمان.

وده دور الـ reviewer لما يخلص: [[gh pr review 42 --approve]]، أو [[--request-changes]] أو [[--comment]] ومعاهم [[--body]]. (أساسيات [[gh pr]] و [[git rebase]] في تاب Git.)`,
            when: "كل مرة حد يراجعلك. وقاعدة معقولة: رد على الـ review في نفس اليوم، حتى لو «هصلّحهم بكرة الصبح».",
            mistakes: R`ترد على كل تعليق بدفاع («بس ده شغال»)، أو توافق على كل حاجة من غير ما تفكر، حتى الغلط. وتعمل commit واحد اسمه «address comments» فيه ٢٠ تغيير ملهمش علاقة ببعض. وتعمل force push بـ rebase في نص الـ review، فالـ reviewer يفقد مكانه ومش عارف إيه الجديد. وتقفل threads من غير رد. وفي الانترفيو لو اتسألت «احكيلي عن review اختلفت فيه مع حد»: احكي إزاي فهمت وجهة نظره، والسبب اللي شرحته، والقرار اللي وصلتوا له، ومش مهم مين كان صح.`
          },
          lines: [
            "اقرا كل التعليقات الأول، في الترمنال.",
            "التصليح commit مربوط بالـ commit اللي بيصلّحه.",
            "ارفعه عادي. الـ reviewer يشوف التغيير الجديد بس.",
            "رد على التعليق: صلّحت فين، أو ليه لأ.",
            "اطلب المراجعة تاني.",
            "بعد الموافقة: ادمج كل fixup في الـ commit بتاعه (احفظ واقفل الـ editor).",
            "الـ rebase غيّر الهاشات، فلازم force، والـ lease بيحمي شغل حد تاني على نفس الـ branch.",
            "وده اللي الـ reviewer بيعمله في الآخر: الموافقة من الترمنال."
          ]
        },
        {
          cmd: "draft PR و التقسيم",
          title: "ميزة أسبوعين من غير PR بـ ٣٠٠٠ سطر",
          desc: R`الـ draft PR بيقول «ده لسه مش جاهز للمراجعة، بس شوفوه». بتفتحه بدري (من أول يوم) عشان الـ CI يشتغل، ولو عايز رأي في الاتجاه قبل ما تكمّل. ولما يخلص، [[gh pr ready]].

والميزة الكبيرة بتتقسم لـ PRs صغيرة، كل واحد بيتدمج لوحده في main: الـ schema، وبعدين الـ API، وبعدين الـ UI. والجزء اللي لسه مش جاهز للمستخدمين يتخبّى ورا feature flag. كده مفيش branch عايشة أسبوعين بتبعد عن main كل يوم.`,
          example: R`git switch -c coupon/1-schema main
gh pr create --draft --fill
gh pr ready
git switch -c coupon/2-api
gh pr create --base coupon/1-schema --fill
gh pr list --author @me`,
          try: R`خد ميزة كبيرة عندك (أو «الكوبونات»: جدول، و API للتطبيق، و UI، وصفحة admin تعمل كوبونات). قسّمها على الورق لـ ٤ PRs أو أكتر. لكل PR اكتب: العنوان، وبيعتمد على أنهي PR، وهل ينفع يتدمج في main من غير ما المستخدم يشوف حاجة ناقصة (ولو لأ، إيه الـ flag).`,
          sol: R`تقسيم معقول:

١. [[feat(db): coupons table]]: migration وموديل Prisma بس. مش مربوط بحاجة، فآمن يتدمج.
٢. [[feat(pricing): applyCoupon]]: الدالة الـ pure واختباراتها. ولا حد بيناديها لسه.
٣. [[feat(api): POST /api/coupons/apply]]: بيعتمد على ١ و ٢. الـ endpoint موجود بس مفيش UI بيناديه.
٤. [[feat(checkout): coupon box]]: الـ UI، ورا flag [[COUPONS_ENABLED]]، فبيتدمج ومحدش بيشوفه غير فريق الـ QA.
٥. [[feat(admin): create coupons]]: ممكن يمشي بالتوازي مع ٤.
٦. [[chore: enable coupons]]: تشيل الـ flag (أو تقلبه) بعد ما الكل اتجرّب.

كل PR من دول بيتراجع في ربع ساعة، و ١ و ٢ ممكن يتدمجوا يوم ٢. الغلط الشائع إنك تقسّم على الطبقات بس من غير ما كل PR يبقى سليم لوحده: PR فيه UI بينادي endpoint لسه متدمجش هيكسر main. والتاني: flag بيفضل في الكود ٦ شهور بعد الإطلاق. الـ flag ليه PR شيل زي ما ليه PR إضافة.`,
          deep: {
            why: R`الـ branch اللي عايشة أسبوعين بتبعد عن main، فالـ merge في الآخر بيبقى conflicts كتير، والـ PR بيبقى ضخم ومحدش بيراجعه بجد. والتقسيم بيخلي كل حتة تتراجع صح، وبيكشف مشاكل التصميم بدري (الـ reviewer شاف الـ schema يوم ٢ مش يوم ١٤)، ولو حاجة باظت في الإنتاج بتعرف أنهي PR.`,
            how: R`[[--draft]]: الـ PR بيظهر رمادي، ومينفعش يتدمج، والـ code owners مبيتطلبلهمش مراجعة لحد ما يبقى ready. والـ CI بيشتغل عادي (لو الـ workflow مش مستثني الـ drafts). و [[gh pr ready]] بيقلبه، و [[gh pr ready --undo]] بيرجّعه draft.

الـ stacked PRs: PR ٢ متفرع من PR ١ مش من main، و [[--base coupon/1-schema]] بيخلي الـ diff يعرض الفرق عن PR ١ بس. لما PR ١ يتدمج والـ branch بتاعته تتمسح، GitHub غالبًا بيحوّل base الـ PR التاني لـ main لوحده. ولو استخدمتوا squash merge، ممكن تحتاج rebase للتاني على main ([[git rebase --onto main coupon/1-schema]]). فيه أدوات بتسهّل الـ stacks، بس الأسهل تخلي الـ stack قصير (٢ أو ٣).

الـ feature flag في أبسط شكل: env variable أو صف في جدول إعدادات، و [[if (flags.coupons)]] حوالين نقطة الدخول (الزرار) مش في كل مكان. وفيه خدمات flags جاهزة للـ rollout التدريجي (١٠٪ من المستخدمين)، بس ابدأ بالبسيط.

وده اللي بيخلي trunk-based development ممكن: كل الفريق بيدمج في main كل يوم أو اتنين، بدل branches طويلة و release branches.`,
            when: "أي ميزة هتاخد أكتر من ٢ أو ٣ أيام، أو هتعدّي ٤٠٠ سطر. والـ draft من أول ما تعمل push لو عايز الـ CI أو رأي بدري.",
            mistakes: R`draft بيفضل draft أسبوعين وبعدين بيتحول ready وهو ٣٠٠٠ سطر: ده نفس المشكلة بلون رمادي. و PRs مقسّمة بس كل واحد بيكسر main لوحده. و stack بـ ٧ PRs، فأي تعديل في الأول بيتطلب rebase للستة اللي بعده. وتنسى الـ flags في الكود. وفي الانترفيو لو اتسألت «هتسلّم ميزة كبيرة إزاي؟»: قسّمها لـ PRs كل واحد سليم لوحده، والـ UI الناقص ورا flag، والـ draft بدري للرأي في الاتجاه.`
          },
          lines: [
            "branch لأول جزء، من main.",
            "PR كـ draft من أول push: الـ CI يشتغل والفريق يشوف الاتجاه.",
            "خلص؟ حوّله ready، ودلوقتي الـ reviewers بيتطلبوا.",
            "الجزء التاني متفرع من الأول، مش من main.",
            "الـ PR التاني base بتاعه الأول، فالـ diff بيعرض الـ API بس.",
            "كل الـ PRs المفتوحة بتاعتك، وحالة كل واحد."
          ]
        },
        {
          cmd: "التقدير",
          title: "«هتخلص إمتى؟» وانت مش عارف لسه",
          desc: R`أول أسبوع في الشغل حد هيسألك «دي هتاخد قد إيه؟». الإجابة الغلط رقم من دماغك عشان تبان واثق. الإجابة الصح: قسّم المهمة لحاجات كل واحدة أقل من يوم، وقدّر كل واحدة، واكتب المجهول لوحده، واتكلم بمدى مش بوعد: «من ٣ لـ ٥ أيام».

و «مش عارف لسه» إجابة محترمة لو معاها خطة: «مش عارف لسه، هبص في الكود ساعتين وأقولك النهارده قبل الساعة ٤».`,
          example: R`Ticket: الكوبونات في الـ checkout
جدول coupons + migration ...................... نص يوم
POST /api/coupons/apply + validation + اختبارات .. يوم
UI: خانة الكوبون وحالاتها (تحميل، مرفوض، مقبول) .. يوم
e2e للمسار الأساسي ............................ نص يوم
مجهول: Paymob بياخد المبلغ بعد الخصم إزاي؟ ...... spike نص يوم
التقدير: من ٣ لـ ٥ أيام، وهأكد بكرة الضهر بعد الـ spike`,
          try: R`خد ticket حقيقي (أو «المستخدم يقدر يغيّر الإيميل بتاعه بعد ما يأكده») واكتب تقدير بنفس الشكل: كل سطر أقل من يوم، والمجهول لوحده، والإجمالي مدى، ومتى هتأكد. وبعد ما تخلص المهمة، قارن كل سطر باللي حصل فعلًا واكتب أكبر فرق وسببه.`,
          sol: R`تقدير معقول لتغيير الإيميل: endpoint بيبعت كود للإيميل الجديد (نص يوم)، وتأكيد الكود وتغيير الإيميل في transaction (نص يوم)، وإيميل تنبيه للإيميل القديم (ساعتين)، و UI للخطوتين (يوم)، واختبارات (نص يوم). المجهول: «الإيميل مستخدم في الـ login بتاع OAuth؟ لو آه، التغيير بيأثر على ربط الحساب». الإجمالي: ٣ لـ ٤ أيام، وأكد بعد ما أعرف موضوع OAuth.

لاحظ إن التقسيم نفسه طلّع حاجات كانت هتتنسي (إيميل التنبيه للقديم، ودي حاجة أمان). ده نص فايدة التقدير.

وفي المقارنة بعد الشغل، غالبًا أكبر فرق هيبقى في حاجة مكانتش في القايمة خالص (مراجعة، أو bug لقيته في الطريق، أو اجتماع)، مش في سطر اتقدّر غلط. عشان كده المدى لازم يسيب مساحة، ومع الوقت بتعرف معامل التصحيح بتاعك (ناس كتير بتضرب في ١.٥). الغلط الشائع: تقدّر وقت الكتابة بس، وتنسى الاختبارات والمراجعة والتعديلات والـ deploy.`,
          flag: "script",
          deep: {
            why: R`التقدير مش امتحان إنك سريع. الفريق محتاجه عشان يخطط: الـ PM بيوعد عميل، وحد تاني مستني الـ API بتاعك. والتقدير المتفائل اللي بيطلع غلط أسوأ بكتير من التقدير الأطول: لأن كل اللي بنوا عليه اتلخبطوا. والجونيور اللي بيقول «مش عارف، هعرف بكرة» وبيبلّغ بدري لما حاجة تتأخر، بيتثق فيه أكتر من اللي بيقول «يومين» كل مرة وبياخد أسبوع.`,
            how: R`القسمة: أي سطر أكبر من يوم، معناه إنك لسه مش فاهمه. قسّمه تاني. والسطور بتيجي من الطبقات (داتا، و API، و UI، واختبارات) ومن «إيه اللي ممكن يبوظ».

الـ acceptance criteria: قبل ما تقدّر، اتأكد إن الـ ticket فيه «إمتى نقول خلص» (زي: الكوبون المنتهي بيترفض برسالة، والمبلغ في الفاتورة بعد الخصم). لو مش موجودة، اسأل: التقدير لحاجة مش متعرّفة مالوش معنى. والـ definition of done بتاع الفريق (اختبارات، ومراجعة، و deploy على staging) جزء من الوقت.

الـ spike: وقت محدد (نص يوم مثلًا) تستكشف فيه المجهول بس، والنتيجة معلومة مش كود للإنتاج. بعده بتقدّر الجزء ده بجد.

المدى مش رقم: «٣ لـ ٥» بتقول قد إيه انت متأكد. والفرق بين الرقمين بيصغر كل ما المجهول يتحل.

التأخير: أول ما تعرف إنك هتتأخر، قول، ومعاك السبب والتقدير الجديد: «الـ Paymob طلع محتاج webhook، ده يوم زيادة، التقدير الجديد الخميس». مش آخر يوم.

وفي Scrum فيه story points (حجم نسبي مش أيام) و planning poker، والفكرة نفسها: قسّم، وقارن بحاجات عملتها قبل كده، واتكلم عن المجهول.`,
            when: "كل ما حد يسألك «قد إيه؟»، وفي الـ planning، وقبل ما تبدأ أي حاجة أكبر من يوم حتى لو محدش سأل، عشان انت تعرف انت فين.",
            mistakes: R`ترد فورًا برقم تحت الضغط. وتقدّر وقت الكتابة بس. وتسكت لما تتأخر على أمل إنك تلحق. وتعمل padding سري (تقول ١٠ وانت شايفها ٣) بدل ما تقول المجهول بصراحة. وتعامل تقديرك كوعد، أو تعامل تقدير غيرك كوعد. وفي الانترفيو لو اتسألت «لو اتسألت عن مهمة مش عارف تقدّرها؟»: هقسّمها، وهحدد المجهول، وهعمل spike قصير بوقت محدد، وهرجع بمدى وبموعد أأكد فيه، وهبلّغ بدري لو اتغير.`
          },
          lines: [
            "الـ ticket والهدف.",
            "كل سطر حاجة واحدة وأقل من يوم.",
            "الـ API، والاختبارات جزء من التقدير مش حاجة بعده.",
            "الـ UI بحالاته، لأن الحالات هي اللي بتاخد الوقت.",
            "اختبار المسار من أوله لآخره.",
            "المجهول لوحده، ومعاه وقت محدد تستكشفه (spike).",
            "مدى مش رقم، ومعاه إمتى هتأكد."
          ]
        }
      ]
    },
    {
      t: "إزاي الفرق بتشتغل",
      l: 3,
      n: "Scrum و Kanban من جوه، و ticket واضح، والـ tech debt بيتسمّى وبيتدفع، والقرارات مكتوبة في ADR، و docs حد بيقراها",
      items: [
        {
          cmd: "Scrum و Kanban",
          title: "السبرنت والـ standup والـ board: انت بتعمل إيه فيهم فعلًا",
          desc: R`Scrum: الشغل بيتقسم لـ sprints (غالبًا أسبوعين)، وفي كل sprint فيه ٤ اجتماعات ليك دور في كل واحد. الـ planning: الفريق بيختار من الـ backlog اللي هيتعمل في السبرنت ده ويقسّمه لـ tickets. والـ daily standup: ربع ساعة كل يوم، كل واحد يقول عمل إيه وهيعمل إيه وإيه اللي موقفه. والـ review: بتعرض اللي خلص وهو شغال قدام اللي طالبينه. والـ retro: الفريق بيتكلم عن طريقة الشغل نفسها، إيه اللي نكمّله وإيه اللي نغيّره.

Kanban: مفيش sprints، الشغل بيمشي على طول. فيه board بأعمدة (To do و In progress و Review و Done)، وكل عمود ليه WIP limit: أقصى عدد كروت فيه في نفس الوقت. لو العمود اتملى، محدش يسحب كارت جديد، والكل يساعد يخلّص اللي فيه. والقاعدة المشهورة: «بطّل تبدأ حاجات جديدة، وابدأ تخلّص».

وأغلب الفرق اللي هتشتغل معاها بتعمل خليط: sprints و standup و retro من Scrum، و board بـ WIP limits من Kanban. المهم تعرف كل حاجة معمولة ليه، عشان تستفيد منها بدل ما تحضرها وخلاص.`,
          example: R`امبارح: خلصت #151 (جدول الكوبونات)، والـ PR #58 مستني review
النهارده: هراجع PR سارة #57 الأول، وبعدين أبدأ #152 (POST /api/coupons/apply)
عائق: مش عارف Paymob بياخد المبلغ بعد الخصم ولا قبله. محتاج ١٠ دقايق مع محمد بعد الـ standup
Board: In progress (WIP 3) | Review (WIP 2)
عمود Review فيه كارتين = مليان، فهراجع قبل ما أسحب حاجة جديدة`,
          try: R`لمدة أسبوع: اكتب standup بالشكل ده كل يوم الصبح (في ملف أو في قناة، حتى لو شغال لوحدك). واعمل GitHub Project بـ Board view فيه ٤ أعمدة، وحط limit على عمود In progress (٢) وعلى Review (٢)، وحط فيه شغلك الحقيقي. وفي آخر الأسبوع اعمل retro لنفسك في ٣ أسطر: حاجة مشيت كويس، وحاجة لأ، و action item واحد بتاريخ.`,
          sol: R`الـ standup الكويس بيتقري في ١٥ ثانية: فيه أرقام tickets، وفيه عائق محدد ومعاه مين هيحلّه وإمتى. لو لقيت نفسك كاتب فقرة عن تفاصيل الكود، ده مكانه الـ ticket أو كلام بعد الـ standup مع الشخص المعني، مش قدام الفريق كله.

والـ board: في GitHub Projects الـ limit بيظهر جنب اسم العمود كعدد (زي ٣/٢) وبيتلوّن لما يعدّي، بس مبيمنعكش تحط كارت زيادة. الـ WIP limit اتفاق بين الناس مش قفل. غالبًا هتلاحظ في الأسبوع ده إن عمود Review هو اللي بيتملي، وإن الحل مش إنك تبدأ حاجة جديدة وانت مستني، الحل إنك تراجع لغيرك أو تطلب مراجعة بصوت عالي.

والـ retro الكويس بيطلع action item واحد تقدر تتأكد منه: «هفتح PR كل يوم قبل الساعة ٣ عشان يتراجع في نفس اليوم». الغلط الشائع: action items زي «نتواصل أحسن» أو «نركّز أكتر»، دي مش حاجة حد يقدر يعملها أو يعرف إنها اتعملت. والغلط التاني: ٧ action items محدش بيفتكرها السبرنت الجاي.`,
          flag: "script",
          deep: {
            why: R`الاجتماعات دي موجودة عشان تحل مشاكل محددة، ولو فهمتها هتلاقيها مفيدة. الـ standup موجود عشان العائق يبان بعد يوم مش بعد أسبوع. والـ planning عشان الفريق يتفق على هدف واحد بدل ما كل واحد يشتغل في اللي شايفه مهم. والـ retro عشان نفس المشكلة متتكررش كل سبرنت. والـ WIP limit موجود لأن ١٠ حاجات نص مخلّصة قيمتها صفر للمستخدم، وحاجتين مخلّصين قيمتهم حقيقية. وكمان لأن الـ context switching بياكل وقت أكتر ما بتتخيل.`,
            how: R`الـ planning: قبله اقرا الـ tickets اللي هتتناقش، وعلى كل واحد اسأل عن الـ acceptance criteria (الدرس الجاي) وقول التقدير بتاعك بمدى وبالمجهول (درس «التقدير»). ولو ticket مش واضح، قول كده: «مش هقدر أقدّره قبل ما نعرف كذا». وفرق كتير بتقدّر بـ story points: حجم نسبي مقارنة بحاجات اتعملت قبل كده، مش أيام.

الـ standup: ٣ جمل. العائق أهم جملة: قوله بدري ومعاه طلب محدد («محتاج ١٠ دقايق مع محمد»). ومش تقرير للمدير، ده تنسيق بين الفريق. والتفاصيل بعده مع اللي يهمه الأمر. وفرق كتير بتعمله مكتوب (async) في قناة، ونفس القواعد.

الـ review (sprint review أو demo): اعرض الحاجة شغالة، على staging، من ناحية المستخدم. مش slides ومش كود.

الـ retro: قول المشكلة الحقيقية بهدوء ومن غير أسماء: «الـ PRs قعدت يومين مستنية review». والناتج action item واحد أو اتنين، ليه صاحب، ويتراجع أول retro جاي.

الـ board: حرّك الكارت بتاعك بنفسك أول ما حالته تتغير. الـ board اللي مش محدّث بيخلي الناس تسألك في الشات، وده اللي كان المفروض يمنعه. ولو الكارت واقف يومين في نفس العمود، ده في حد ذاته معلومة: قولها في الـ standup.

والـ WIP limit بيغيّر سلوكك اليومي: قبل ما تسحب ticket جديد، بص على Review. لو فيه PR لزميل مستني، راجعه الأول. ده اللي بيخلي الشغل «يخلص» بدل ما «يبدأ».`,
            when: "Scrum مناسب لفريق بيبني منتج بأولويات بتتحدد كل أسبوعين. و Kanban مناسب للشغل اللي بييجي على طول ومش متوقع: support، و ops، وفريق صغير بيصلّح ويضيف باستمرار. وانت كمطوّر هتشتغل بالاتنين، وفي الغالب بخليط منهم.",
            mistakes: R`الـ standup يبقى ٤٥ دقيقة لأن كل واحد بيشرح الكود بتاعه. وتقول «مفيش عوائق» كل يوم وانت واقف من يومين عشان مكسوف تسأل. وتسحب ticket جديد وعندك ٣ PRs مستنية تصليح بعد review. والـ retro يتحول لشكوى من غير action items، أو يتلغي «عشان مفيش وقت». وتتعامل مع story points كأيام أو كمقياس لشطارتك. وفي الانترفيو سؤال «إيه الفرق بين Scrum و Kanban؟» بيتسأل كتير: Scrum بـ sprints ثابتة وأدوار واجتماعات محددة والـ commitment على هدف السبرنت، و Kanban بـ flow مستمر و WIP limits وبيقيس الـ cycle time (الكارت بياخد قد إيه من ما يبدأ لحد ما يخلص). والإجابة الأقوى إنك تحكي إنتو كنتو بتعملوا إيه فعلًا وليه.`
          },
          lines: [
            "اللي خلص، بأرقام الـ tickets والـ PR، مش «كنت شغال على الكوبونات».",
            "اللي هتعمله النهارده، وأوله مراجعة لزميلك عشان الشغل اللي قرّب يخلص يخلص.",
            "العائق محدد، ومعاه مين يحلّه وإمتى. التفاصيل بعد الـ standup مش جواه.",
            "الـ board بالـ WIP limits: أقصى عدد كروت في كل عمود.",
            "الـ limit هو اللي بيقرر تعمل إيه: العمود المليان أولى من كارت جديد."
          ]
        },
        {
          cmd: "ticket و acceptance criteria",
          title: "ticket تقدر تبدأ فيه من غير ما تسأل ١٠ أسئلة",
          desc: R`الـ ticket الكويس فيه ٥ حاجات: عنوان بيقول النتيجة (مش «مشكلة الكوبونات»)، وليه (المشكلة أو الطلب ولينك ليه)، و acceptance criteria، وإيه اللي برّه النطاق، ولينكات (التصميم، والـ tickets المرتبطة).

الـ acceptance criteria (AC) شروط تقدر تتأكد منها بعينك أو باختبار: «إمتى نقول الـ ticket ده خلص». وشكل مشهور ليها Given / When / Then: الحالة قبل، والفعل، والنتيجة المتوقعة. وكل AC بالشكل ده تقريبًا اختبار جاهز.

والفرق بين الـ AC والـ definition of done: الـ AC خاصة بالـ ticket ده («الكوبون المنتهي يترفض»). والـ DoD قايمة ثابتة لكل tickets الفريق (اختبارات، ومراجعة، و deploy على staging). الـ ticket مش خلصان غير لما الاتنين يتحققوا. والـ DoD نفسها مشروحة في تاب «بناء مشروع كامل» في درس «definition of done»، و الـ user stories في درس «user stories».`,
          example: R`Title: الكوبون المنتهي يترفض في الـ checkout
Why: كوبونات SUMMER26 فضلت شغالة بعد ما الحملة خلصت (#149)
AC1: Given كوبون expiresAt بتاعه امبارح، When العميل يطبّقه، Then تظهر "This coupon has expired" والإجمالي ميتغيرش
AC2: Given كوبون بينتهي النهارده ١١:٥٩ مساءً بتوقيت القاهرة، When يتطبّق ١١:٥٠، Then يتقبل
AC3: Given كوبون اتطبّق وهو صالح وانتهى والعميل لسه في الكارت، When يدوس Pay، Then السيرفر يرفضه بـ 422
Out of scope: صفحة الأدمن لإنشاء الكوبونات (#160)، وترجمة الرسالة للعربي (#161)
Links: Figma > Checkout > Coupon states`,
          try: R`خد الـ ticket ده زي ما بييجي في الحقيقة: «المستخدم يقدر يغيّر الإيميل». أعد كتابته بالشكل اللي فوق: عنوان بنتيجة، وليه، و ٣ AC على الأقل بـ Given / When / Then (منهم حالة فشل وحالة أمان)، و Out of scope. وبعدين حوّل كل AC لـ [[it.todo]] في ملف اختبار Vitest وشغّل [[npx vitest run]].`,
          sol: R`لما تكتب الـ AC هتلاقي نفسك بتسأل أسئلة كان لازم حد يجاوبها قبل الكود: الإيميل الجديد لازم يتأكد قبل ما يتغير؟ الإيميل القديم يعرف؟ لو الإيميل مستخدم عند حد تاني؟ ولو الحساب داخل بـ Google؟ ده بالظبط الهدف: الأسئلة دي تطلع في الـ planning مش في نص الـ PR.

الـ AC المهمة هنا: الإيميل مبيتغيرش غير بعد تأكيد من الإيميل الجديد، والقديم بيوصله تنبيه (دي حماية لو حد سرق الجلسة)، والإيميل المستخدم بيترفض برسالة مبتكشفش مين صاحبه، والكود بينتهي. و Out of scope بيمنع الـ ticket يكبر: الحسابات المربوطة بـ OAuth ممكن تبقى ticket تاني بعد ما نقرر.

و [[npx vitest run]] على ملف الـ todos هيعدّي، وهيعرض الاختبارات كـ todo (مش passed ولا failed)، فتشوف عدد الـ AC اللي لسه متعملتش. لما تبدأ الكود، كل todo بيبقى اختبار حقيقي بالـ TDD (درس «red green refactor»).

الغلط الشائع: AC بتوصف الكود مش السلوك («نضيف عمود pendingEmail»)، دي تفاصيل تنفيذ مكانها الـ PR. أو AC مش ممكن تتأكد منها («التجربة تبقى سلسة»). أو مفيش ولا حالة فشل، وهي دايمًا أغلب الشغل.`,
          solCode: R`Title: المستخدم يغيّر الإيميل بعد تأكيد الإيميل الجديد
Why: طلبات support كتير لتغيير الإيميل يدوي (#203)
AC1: Given مستخدم داخل، When يطلب تغيير لإيميل جديد، Then يتبعت كود للإيميل الجديد والإيميل الحالي ميتغيرش
AC2: Given كود صحيح وصالح، When يدخله، Then الإيميل يتغير ويتبعت تنبيه للإيميل القديم
AC3: Given إيميل مستخدم في حساب تاني، When يطلبه، Then نفس رسالة النجاح (ومفيش كود بيتبعت) عشان منكشفش إن الإيميل موجود
AC4: Given كود عدّى عليه ١٥ دقيقة، When يدخله، Then يترفض ويقدر يطلب كود جديد
Out of scope: الحسابات اللي داخلة بـ Google فقط (#204)

// change-email.test.ts
import { describe, it } from "vitest";

describe("change email", () => {
  it.todo("sends a code to the new email and keeps the current one");
  it.todo("changes the email with a valid code and notifies the old email");
  it.todo("gives the same response for an email that belongs to another account");
  it.todo("rejects a code older than 15 minutes");
});`,
          flag: "script",
          deep: {
            why: R`أغلب التأخير في الشغل مش من الكود، من إن حد بنى حاجة غير اللي كان مطلوب، واكتشفنا ده في الـ review أو في الـ demo. الـ AC بتنقل الأسئلة لأول الشغل، وبتخلي «خلص» كلمة ليها معنى واحد عند المطوّر والـ QA والـ PM. وبتخلي الـ ticket تقدر تتقدّر (درس «التقدير»)، وبتخلي الـ reviewer يعرف يراجع على إيه.`,
            how: R`العنوان: فعل ونتيجة من ناحية المستخدم أو السيستم: «الكوبون المنتهي يترفض» أحسن من «Coupon bug».

Given / When / Then: الـ Given فيها البيانات والحالة بأرقام حقيقية (امبارح، ١١:٥٩، ١٥ دقيقة)، لأن الأرقام بتكشف الحالات الحدّية. ولاحظ AC2 في المثال: الكتابة نفسها طلّعت سؤال المنطقة الزمنية.

حالات الفشل والأمان: لكل مسار سعيد اسأل «ولو البيانات غلط؟ ولو مش صاحب الحاجة؟ ولو اتعملت مرتين؟».

Out of scope: بيحمي الـ ticket من إنه يكبر وانت شغال، وبيقول إن الحاجة دي اتفكر فيها ومش منسية، ومعاها رقم الـ ticket بتاعها.

وإمتى الـ ticket كبير؟ لو الـ AC عدّت ٥ أو ٦، أو تقديره أكتر من ٣ أيام، قسّمه (درس «draft PR و التقسيم»). ومش لازم كل ticket يبقى user story؛ bug report ليه شكل تاني: خطوات إعادة الحدوث، والمتوقع، واللي حصل، والبيئة.

وفي GitHub تقدر تعمل issue forms في [[.github/ISSUE_TEMPLATE/]] (ملفات YAML) فيها خانات إجبارية للـ AC أو لخطوات الـ bug، فكل issue جديد يبدأ بالشكل ده.

ومين بيكتب الـ ticket؟ غالبًا الـ PM أو الـ lead، بس انت كمطوّر مسؤول تسأل قبل ما تبدأ لو الـ AC ناقصة، وتضيف اللي اتفقتوا عليه في الـ ticket نفسه مش في شات هيضيع.`,
            when: "قبل ما تبدأ أي ticket: اقرا الـ AC، ولو مش موجودة اكتبها بنفسك وابعتها للـ PM «أنا فاهم إن المطلوب كذا، صح؟». ودي ٥ دقايق بتوفّر يومين.",
            mistakes: R`تبدأ من العنوان بس. و AC بتوصف التنفيذ بدل السلوك. و AC كلها مسارات سعيدة. وتتفقوا على تغيير في مكالمة ومحدش يحدّث الـ ticket، فالـ QA بيختبر على القديم. وتضيف حاجات مش في الـ AC «عشان هتلزم» (درس «KISS و YAGNI»). وفي الانترفيو لو اتسألت «لو المتطلبات مش واضحة بتعمل إيه؟»: بكتب فهمي على شكل acceptance criteria، وبأكدها مع صاحب الطلب قبل ما أبدأ، واللي مش متفق عليه بيبقى out of scope أو سؤال مفتوح مكتوب.`
          },
          lines: [
            "العنوان بيقول النتيجة اللي هتحصل، مش اسم المشكلة.",
            "ليه، ولينك للمشكلة الأصلية. من غيره محدش يعرف يقرر في الحالات اللي مش مكتوبة.",
            "المسار الأساسي: حالة قبل، وفعل، ونتيجة تقدر تشوفها بعينك أو باختبار.",
            "حالة حدّية بأرقام حقيقية، وكتابتها كشفت سؤال المنطقة الزمنية.",
            "حالة السيرفر: الـ UI مش كفاية، لأن الوقت ممكن يعدّي والعميل لسه في الصفحة.",
            "اللي مش هيتعمل هنا، ورقم الـ ticket بتاعه، عشان الـ ticket ميكبرش.",
            "التصميم والـ tickets المرتبطة."
          ]
        },
        {
          cmd: "technical debt",
          title: "الـ shortcut اللي أخدته، مين هيدفع تمنه وإمتى",
          desc: R`الـ technical debt هو كل حاجة في الكود بتخلي التغيير الجاي أبطأ أو أخطر من المفروض: منطق متكرر في ٣ أماكن، وملف ماحدش بيقرب له من غير ما حاجة تقع، ومكتبة قديمة، واختبارات ناقصة في جزء حساس. زي الدين بالظبط: أخدت سرعة النهارده، وبتدفع «فايدة» في كل تغيير لحد ما تسدّه.

والدين مش دايمًا غلط: shortcut واعي عشان تلحق إطلاق، ومكتوب ومعاه خطة، قرار مقبول. المشكلة في الدين اللي محدش سمّاه، فمحدش عارف تمنه ولا بيخطط يسدّه.

وشغلك كمطوّر ٣ حاجات: تسمّيه (ticket فيه التمن بالأرقام)، وتسدّه مع الـ features (مش «سبرنت تنضيف» عمره ما هييجي)، وترفض الـ shortcut اللي مينفعش يترجع فيه.`,
          example: R`grep -rnE "TODO|FIXME|HACK" src --include=*.ts | wc -l
grep -rnE "TODO|FIXME|HACK" src --include=*.ts | grep -vE "#[0-9]+"
git log --since="6 months ago" --format= --name-only -- src | sort | uniq -c | sort -rn | head
gh issue create --title "debt: coupon pricing duplicated in cart and checkout" --label tech-debt --body-file debt.md
gh issue list --label tech-debt`,
          try: R`في مشروع عندك: شغّل أول ٣ أوامر. خد أكتر ٣ ملفات اتغيرت في آخر ٦ شهور (أمر الـ git log)، وافتح كل واحد واسأل: هو بيتغير كتير عشان المنتج بيتغير هنا، ولا عشان كل تغيير بيحتاج ٣ تعديلات؟ واختار دين واحد حقيقي واكتبله [[debt.md]] فيه: إيه الدين، وتمنه النهارده بمثال حقيقي، وإيه الخطر، والحل، والتقدير، وإمتى نسدّه.`,
          sol: R`الأمر الأول بيطبع رقم واحد: عدد الـ TODO والـ FIXME والـ HACK. والتاني بيطبع اللي مالوش رقم ticket، ودي الأخطر لأن محدش هيفتكرها. قاعدة سهلة: أي TODO لازم يبقى معاه رقم ([[// TODO(#212): ...]])، واللي مالوش يا يتعمله ticket يا يتمسح.

والتالت بيطبع قايمة زي [[23 src/checkout/pricing.ts]] ثم [[17 src/cart/cart.ts]]: كل ملف وعدد الـ commits اللي غيّرته. الملفات اللي فوق وفي نفس الوقت طويلة ومعقدة هي الـ hotspots: هنا الدين بيتكلّف فعلًا، لأنكم بتلمسوها كل أسبوع. ملف قديم وحش محدش بيلمسه دينه مش مستعجل.

والـ ticket الكويس زي اللي تحت: التمن مكتوب بأرقام ومثال («آخر تغيير خد ٣ أيام بدل يوم، وطلع bug في الإنتاج»)، مش «الكود وحش». ده اللي بيخلي الـ PM يقدر يقارنه بـ feature ويقرر.

الغلط الشائع: ticket اسمه «refactor pricing» من غير سبب ولا تمن، فبيفضل في الـ backlog للأبد. أو قايمة بـ ٥٠ دين بنفس الأولوية.`,
          solCode: R`## الدين
حسبة الكوبون مكتوبة مرتين: src/cart/cart.ts و src/checkout/pricing.ts، واتفرقوا (الكارت بيقرّب لأقرب جنيه والـ checkout لأ).

## التمن النهارده
- #149: الكوبون المنتهي اتصلّح في الـ checkout بس، واتصلّح في الكارت بعد أسبوع بـ bug تاني.
- أي نوع خصم جديد = نفس التعديل مرتين + اختبارات مرتين. آخر مرة خدت ٣ أيام بدل يوم.

## الخطر لو سيبناه
العميل يشوف في الكارت رقم وفي الدفع رقم تاني. فلوس + ثقة.

## الحل
دالة واحدة applyCoupon في src/lib/pricing.ts، والاتنين يستخدموها. اختبارات characterization الأول على السلوك الحالي.

## التقدير
يوم ونص.

## إمتى
مع #165 (خصم الشحن المجاني)، لأنه هيلمس نفس الملفين.`,
          deep: {
            why: R`الدين اللي محدش بيسمّيه بيبان في حاجة واحدة: الفريق بقى أبطأ ومحدش عارف ليه. «الميزة دي هتاخد أسبوع» والـ PM شايفها بسيطة، والسبب الحقيقي ٣ shortcuts اتاخدوا من سنة. لما الدين يبقى tickets بتمن مكتوب، بيتحول من شكوى المطوّرين لقرار بيزنس: ندفع يوم ونص النهارده، ولا ندفع يوم زيادة في كل تغيير. والـ PM يقدر يقرر بأرقام.`,
            how: R`أنواعه: دين واعي («هنعمل الدفع بـ provider واحد دلوقتي، ونفصلها لما ييجي التاني»)، ودين من قلة معرفة (اكتشفت بعدين إن فيه طريقة أحسن)، ودين بيتراكم لوحده (مكتبات قديمة، و Node قديم). والأخطر هو الدين المتهور: shortcut من غير ما حد يعرف إنه shortcut.

التسمية: ticket بـ label [[tech-debt]]، فيه التمن بمثال حقيقي. والـ TODO في الكود معاه رقم الـ ticket، فالكود بيشاور على الشرح والشرح بيشاور على الكود.

الأولوية: التمن × عدد المرات. الـ hotspots (ملفات بتتغير كتير وصعبة) الأول. وأمر الـ git log في المثال بيعد مرات ظهور كل ملف في الـ commits: [[--format=]] بيشيل رسالة الـ commit ويسيب أسماء الملفات بس، و [[uniq -c]] بيعد، و [[sort -rn]] بيرتّب من الأكتر.

السداد: أحسن طريقة إنك تسدّه وانت أصلًا في المكان ده لـ feature: قاعدة الـ boy scout «سيب الكود أنضف شوية من ما لقيته». بس في PR لوحده قبل الـ feature (درس «refactor بأمان»)، مش مخلوط معاها. وفرق كتير بتحجز نسبة ثابتة من كل سبرنت (١٠ لـ ٢٠٪ رقم منتشر) للدين، بدل ما يتفاوض عليه كل مرة.

إمتى ترفض الـ shortcut: لما مبيترجعش فيه أو تمنه بيكبر بسرعة. أمثلة: أي حاجة في الأمان والصلاحيات (endpoint من غير ownership check)، وأي حاجة بتلمس الفلوس، و migration بتمسح داتا، و API عام هيعتمد عليه clients تانيين، ومفيش validation على input جاي من برّه. هنا قول «لأ» ومعاك بديل: «مش هينفع نطلع من غير ownership check، بس ممكن نطلّع الـ feature من غير صفحة الأدمن ونضيفها الأسبوع الجاي». الـ shortcut المقبول هو اللي محصور في مكان واحد، وسهل ترجع فيه، ومكتوب ومعاه ميعاد.`,
            when: "كل ما تاخد shortcut: الـ ticket يتكتب في نفس اليوم. وكل ما تلمس hotspot لـ feature: فكّر في refactor صغير قبلها. وفي الـ planning: الـ debt tickets بتتناقش جنب الـ features بنفس الطريقة (تمن وقيمة).",
            mistakes: R`«سبرنت تنضيف» الفريق بيستناه سنة. و refactor ضخم من غير اختبارات «عشان نسدّ الدين كله مرة واحدة»، وده بيعمل bugs جديدة. وتسمّي أي كود مش على ذوقك دين: الدين ليه تمن حقيقي، والذوق لأ. وتوافق على shortcut في الأمان تحت ضغط الإطلاق من غير ما تقول الخطر بصوت عالي ومكتوب. وفي الانترفيو لو اتسألت «إزاي بتتعامل مع technical debt؟»: بسمّيه في ticket بتمنه، وبرتّب بالـ hotspots، وبسدّه مع الـ features اللي بتلمس نفس المكان، وبرفض الـ shortcuts اللي مبيترجعش فيها، ومعايا مثال حقيقي.`
          },
          lines: [
            "عدد الـ TODO والـ FIXME والـ HACK في الكود: مقياس سريع مش أكتر.",
            "اللي مالوش رقم ticket: دين محدش هيفتكره، يا يتعمله ticket يا يتمسح.",
            "أكتر الملفات اللي اتغيرت في ٦ شهور: الـ hotspots، والدين فيها هو اللي بيتكلّف.",
            "الدين بقى ticket بعنوان واضح و label، والتفاصيل والتمن في debt.md.",
            "كل الدين المتسمّي في مكان واحد، يتناقش في الـ planning."
          ]
        },
        {
          cmd: "ADR",
          title: "قرار Prisma ولا Drizzle مكتوب وسببه معاه",
          desc: R`الـ ADR (Architecture Decision Record) ملف Markdown صغير بيسجّل قرار واحد مهم: إيه الظروف، وقررنا إيه، والتمن. الفكرة الأساسية اتشرحت في تاب «بناء مشروع كامل» في درس «اختيار الـ stack». هنا هتشوف إزاي بيتعمل في فريق.

مكانه جوه الـ repo، في [[docs/adr/]]، وكل ملف برقم: [[0007-orm.md]]. بيتكتب كـ PR ويتراجع زي الكود، والنقاش بيحصل في الـ PR. ولما يتقبل، مبيتعدّلش: لو القرار اتغير بعدين، بتكتب ADR جديد وتكتب في القديم «superseded by 0012». كده التاريخ بيفضل موجود.

إمتى تكتب واحد: قرار صعب ترجع فيه (ORM، و auth، و قاعدة البيانات، و monorepo)، أو بيأثر على أكتر من شخص، أو اتناقش أكتر من مرة. مش لكل اختيار مكتبة صغيرة.`,
          example: R`# 0007. اختيار الـ ORM للـ API
Date: 2026-09-20
Status: proposed | accepted | superseded by 0012
Deciders: @sara @ali
## Context
المشكلة، واللي بيفرض القرار: الفريق، والوقت، والقيود، والأرقام
## Options
كل بديل في سطرين: ميزته وعيبه في حالتنا إحنا مش بشكل عام
## Decision
هنستخدم X. جملة واحدة بصيغة قرار
## Consequences
اللي هيسهل، واللي هيصعب، واللي لازم نعمله بسبب القرار، وإمتى نراجعه`,
          try: R`اكتب [[docs/adr/0007-orm.md]] بالـ template ده للحالة دي: API بـ Express و PostgreSQL، على VPS (Node شغال على طول، مش serverless)، وفريق من ٤ منهم ٢ جونيور لسه جداد على SQL، وأغلب الشغل CRUD بعلاقات (طلبات، وعناصر، ومنتجات)، وفيه تقارير شهرية فيها GROUP BY و joins. قارن Prisma و Drizzle (تاب «SQL و Prisma»، درس «Drizzle» ودرس «إعداد Prisma 7»)، واختار، واكتب الـ Consequences بصراحة بما فيها العيوب. وبعدين افتحه كـ PR.`,
          sol: R`مفيش إجابة واحدة صح، بس فيه ADR صح: القرار طالع من الـ Context، مش من ذوق الكاتب. لو الـ Context بيقول «جونيورز جداد على SQL و CRUD بعلاقات كتير»، واخترت Drizzle من غير ما تقول إزاي هتتعامل مع ده، يبقى الـ ADR فيه تناقض. والعكس: لو الفريق كله مرتاح في SQL والتقارير هي أغلب الشغل، Drizzle منطقي جدًا.

اللي تحت ADR لاختيار Prisma. لاحظ ٣ حاجات: الـ Options فيها ميزة وعيب لكل واحد في حالتنا بالظبط. والـ Consequences فيها العيوب اللي هندفعها (خطوة [[prisma generate]] في الـ build، والتقارير بـ SQL خام)، مش مميزات بس. وفيه «إمتى نراجع»: شرط واضح لو حصل نفتح القرار تاني.

وحاجة مهمة في Prisma 7 لازم تتكتب: [[migrate dev]] مبقاش بيعمل [[generate]] لوحده، ومفيش postinstall بيعمله، فلازم يبقى خطوة صريحة في السكربتات والـ CI.

الغلط الشائع: ADR بيعدد مميزات الأداة اللي اخترتها من الـ docs بتاعتها، ومفيش بديل حقيقي اترفض. أو Consequences فاضية. أو ADR طويل ٥ صفحات محدش هيقراه: صفحة واحدة كفاية.`,
          solCode: R`# 0007. اختيار الـ ORM للـ API

Date: 2026-09-20
Status: accepted
Deciders: @sara @ali @mona @omar

## Context
- API بـ Express و PostgreSQL، على VPS (Node process شغال على طول).
- الفريق ٤، منهم ٢ جونيور لسه بيتعلموا SQL.
- حوالي ٨٠٪ من الشغل CRUD بعلاقات: orders و order_items و products و users.
- تقرير شهري واحد فيه GROUP BY و joins على ٣ جداول.
- محتاجين migrations متراجعة في PRs، وتتطبق في الـ CI على staging ثم الإنتاج.

## Options
Prisma 7: schema واحد مقروء، و include و nested writes بتسهّل الـ CRUD بالعلاقات، و Prisma Studio للـ debugging. عيبه: خطوة prisma generate، والـ API بعيد عن SQL فالجونيور ممكن يكتب N+1 من غير ما ياخد باله، والتقارير المعقدة محتاجة SQL خام.
Drizzle: الاستعلام شبه SQL بالظبط ومتوقع، ومفيش خطوة generate للـ client، والـ types من الـ schema على طول. عيبه: الجونيورز هيتعلموا SQL والأداة في نفس الوقت، والـ relational queries API بيتغير مع Drizzle 1.0.
SQL خام بـ pg: أقصى تحكم، بس هنكتب الـ mapping والـ types بإيدينا، و migrations بأداة تانية.

## Decision
هنستخدم Prisma 7 مع @prisma/adapter-pg للـ API كله، والتقارير بـ $queryRaw.

## Consequences
- أسهل: الـ CRUD بالعلاقات، و onboarding الجونيورز، و migrate dev و migrate deploy في الـ CI.
- لازم: prisma generate خطوة صريحة في npm run build وفي الـ CI (Prisma 7 مش بيعملها لوحده بعد install ولا بعد migrate dev).
- لازم: كل query بـ $queryRaw في src/reports بس، وليها اختبار integration على قاعدة حقيقية.
- لازم: الـ review يبص على include داخل loops (N+1). الـ query logging شغال في dev.
- الأصعب: التقارير بتتكتب SQL خام من غير types أوتوماتيك.
- نراجع القرار لو: نقلنا جزء لـ serverless أو edge، أو التقارير بقت أكتر من ثلث الشغل.`,
          flag: "script",
          deep: {
            why: R`بعد سنة حد جديد هيسأل «ليه Prisma مش Drizzle؟»، والإجابة يا «مش عارف، كان كده لما جيت» يا ADR بيقول الظروف ساعتها. ومن غير الـ ADR، النقاش نفسه بيتعاد كل ٦ شهور بنفس الحجج. ومعاه، السؤال بيبقى «الظروف اللي في الـ Context لسه صح؟»، ولو لأ، ADR جديد. وكتابة الـ ADR نفسها بتكشف لو القرار ضعيف: لو مش عارف تكتب بديل حقيقي أو عيب واحد، يبقى انت لسه مقررتش، انت اخترت اللي متعود عليه.`,
            how: R`الـ template ده (Context و Decision و Consequences و Status) هو الشكل الأصلي اللي Michael Nygard اقترحه، ومعظم الفرق بتضيف Options زي ما عملنا. وفيه templates أكبر زي MADR لو احتجتوا. الأهم إن الفريق كله يستخدم نفس الشكل.

الترقيم: رقم متسلسل بأربع خانات واسم قصير: [[0001-stack.md]] و [[0007-orm.md]]. واعمل [[docs/adr/README.md]] فيه قايمة بكل الـ ADRs وحالة كل واحد، عشان اللي داخل جديد يقراهم بالترتيب.

الـ Status: proposed وهو في الـ PR، و accepted لما يتدمج، و superseded by NNNN لما قرار جديد يلغيه (وفي الجديد تكتب supersedes NNNN). ومفيش ADR بيتمسح.

الـ PR: الـ ADR بيتراجع زي الكود، والـ CODEOWNERS ممكن يطلب مراجعة الـ leads على [[docs/adr/]] (درس «CODEOWNERS و rulesets»). والنقاش في الـ PR نفسه جزء من التوثيق.

الـ Consequences أهم جزء: العيوب اللي قبلناها، والحاجات اللي لازم تتعمل بسبب القرار (زي خطوة الـ generate في الـ CI)، وشرط المراجعة. ده اللي بيخلي الـ ADR مفيد بعد سنة.

وفيه أداة CLI قديمة اسمها adr-tools بتعمل الملفات والترقيم، بس [[cp]] من template كفاية جدًا.`,
            when: "قبل قرار صعب ترجع فيه، أو اتناقش أكتر من مرة، أو هيأثر على ناس مش في الاجتماع. ولو اكتشفت قرار مهم اتاخد قبل كده ومحدش كتبه، اكتبله ADR بأثر رجعي بالظروف اللي تعرفها. ده من أحسن حاجات تعملها أول شهر في شغل جديد.",
            mistakes: R`ADR بيتكتب بعد القرار بشهور عشان «نوثّق»، فبيبقى تبرير مش قرار. وتعدّل ADR قديم لما القرار يتغير، فالتاريخ يضيع. و ADR لكل مكتبة صغيرة، فالمهم يتدفن. و ADRs في Notion أو Confluence بعيد عن الكود، فمحدش بيحدّثها ومحدش بيلاقيها. وفي الانترفيو لو اتسألت «احكيلي عن قرار تقني أخدته»: احكيه بشكل ADR: الظروف، والبدايل اللي رفضتها وليه، والتمن اللي قبلته، وحصل إيه بعدها. ده بالظبط اللي بيدوروا عليه.`
          },
          lines: [
            "التاريخ: القرار بيتقري بظروف وقته.",
            "الحالة: proposed في الـ PR، و accepted بعد الدمج، و superseded لما قرار جديد يلغيه.",
            "مين قرر: عشان تعرف تسأل مين بعد سنة.",
            "Context: اللي بيفرض القرار. القرار الصح لفريق من ٤ ممكن يبقى غلط لفريق من ٤٠.",
            "Options: البدايل الحقيقية، بمميزاتها وعيوبها في حالتكم بالظبط.",
            "Decision: جملة واحدة واضحة.",
            "Consequences: التمن، واللي لازم يتعمل، وشرط المراجعة. أهم جزء في الملف."
          ]
        },
        {
          cmd: "README و runbook",
          title: "docs حد بيفتحها ساعة المشكلة وتنفعه",
          desc: R`الـ docs اللي بتتقري ليها ٣ صفات: موجودة في المكان اللي حد هيدوّر فيه ساعة ما يحتاجها، ومكتوبة كخطوات وأوامر تتنسخ مش كلام عام، ومتجرّبة وعليها تاريخ آخر مرة حد اتأكد إنها شغالة.

الـ README: أول ملف أي حد بيفتحه. بيجاوب ٣ أسئلة بس: المشروع ده إيه، وأشغّله على جهازي إزاي، وألاقي الباقي فين. وتقيسه بحاجة واحدة: حد جديد يشغّل المشروع من الـ README لوحده من غير ما يسألك.

الـ runbook: خطوات حل مشكلة معروفة في الإنتاج، مكتوبة لواحد صاحي الساعة ٣ الفجر ومتوتر. لكل مشكلة: بتعرفها إزاي، وأثرها، وأوامر التشخيص، وخطوات الحل، وإمتى توقف وتكلّم مين. وأحسن مكان للينك بتاعه: جوه الـ alert نفسه.

وحزمة التوثيق الكاملة للتسليم (architecture و ADRs و .env.example) في تاب «بناء مشروع كامل» في درس «التوثيق والتسليم».`,
          example: R`## الديسك مليان على الـ VPS
Alert: disk usage > 90% من المراقبة، أو الـ API بيرجّع 500 واللوج فيه ENOSPC
Impact: الـ uploads وكتابة القاعدة بتفشل. أولوية عالية
Last verified: 2026-09-10 (@ali)
df -h /
sudo du -xh / --max-depth=2 2>/dev/null | sort -h | tail -15
docker system df
sudo journalctl --vacuum-size=500M
docker builder prune -f
docker image prune -a -f --filter "until=168h"
لو لسه فوق ٩٠٪: متمسحش أي حاجة من volume القاعدة. كلّم @sara`,
          try: R`اعمل clone جديد لمشروعك في فولدر فاضي ([[git clone <repo> /tmp/fresh]])، وامشي على الـ README بتاعك حرفيًا، كأنك أول يوم: متعملش أي خطوة مش مكتوبة. كل مرة تقف أو تعمل حاجة من دماغك، صلّح الـ README. وبعدين اكتب runbook entry واحد لأكتر مشكلة حصلت عندك في الإنتاج (أو «الديسك مليان» لو مفيش) بنفس الشكل فوق، وجرّب أوامر التشخيص فعلًا.`,
          sol: R`الـ clone الجديد تقريبًا دايمًا بيطلّع ٣ لـ ٥ حاجات ناقصة: متغير مش في [[.env.example]]، أو نسخة Node مش مكتوبة، أو خطوة [[prisma generate]] أو migrations، أو خدمة (Postgres أو Redis) لازم تشتغل الأول، أو seed. كل واحدة منهم هي اللي هتضيّع أول يوم لأي حد جديد.

والـ README الكويس قصير زي اللي تحت: أوامر تتنسخ بالترتيب، ولينكات للباقي. ولو أول قسم فيه فقرة عن رؤية المشروع و ١٠ badges، الأوامر اتدفنت.

وفي الـ runbook: [[df -h /]] بيوريك الـ Use% للـ root. و [[du -x]] بيفضل في نفس الـ filesystem ([[--max-depth=2]] بيوريك أكبر فولدرات على مستويين، و [[sort -h]] بيرتّب 1.2G بعد 900M صح). و [[docker system df]] بيقسّم مساحة Docker لـ images و containers و volumes و build cache، وعمود RECLAIMABLE بيقولك قد إيه ممكن يتمسح. غالبًا الـ build cache والـ images القديمة هم السبب على سيرفر بيعمل deploy بـ Docker.

الغلط الشائع: [[docker system prune -a --volumes]] وقت المشكلة، وده ممكن يمسح volume القاعدة لو الـ container بتاعها كان واقف. عشان كده السطر الأخير في الـ runbook: الخط الأحمر مكتوب قبل ما حد يحتاجه.`,
          solCode: R`# shop-api
API المتجر: الطلبات والكوبونات والدفع بـ Paymob. Express + Prisma 7 + PostgreSQL.

## Getting started
Requirements: Node 22 (see .nvmrc)، و Docker.

    cp .env.example .env
    docker compose up -d db
    npm ci
    npx prisma generate
    npx prisma migrate dev
    npx prisma db seed
    npm run dev          # http://localhost:4000/health => {"ok":true}

## Common tasks
- Tests: npm test (محتاج db شغالة)
- New migration: npx prisma migrate dev --name <name> ثم npx prisma generate

## More
- Architecture: docs/architecture.md
- Decisions: docs/adr/
- Production issues: docs/runbook.md
- Owners: #team-shop على Slack`,
          flag: "script",
          deep: {
            why: R`الـ docs اللي مش بتتقري أسوأ من مفيش: بتاخد وقت تتكتب، وبتدّي إحساس غلط إن المعرفة متوثقة، وبعد ٦ شهور بتبقى غلط فبتضيّع وقت اللي صدّقها. والـ runbook بالذات قيمته بتبان في أسوأ لحظة: الموقع واقع، واللي فاهم السيستم في إجازة. ساعتها خطوات مكتوبة ومتجرّبة بتفرق بين ١٠ دقايق وساعتين، وبين حل وبين أمر غلط بيمسح داتا.`,
            how: R`اكتب للمهمة مش للموضوع: «إزاي تضيف migration» أحسن من «عن قاعدة البيانات». فيه إطار مشهور اسمه Diátaxis بيقسّم الـ docs لـ ٤ أنواع: tutorial (تتعلم)، و how-to (تعمل مهمة)، و reference (تدوّر على معلومة)، و explanation (تفهم ليه). الـ README تقريبًا how-to، والـ runbook how-to، والـ ADR explanation. ومتخلطهمش في ملف واحد.

المكان: الـ docs جنب الكود في الـ repo، وبتتغير في نفس الـ PR اللي بيغيّر السلوك. ولو الـ DoD بتاعتكم فيها «الـ docs اتحدّثت» (تاب «بناء مشروع كامل»)، الـ reviewer يسأل عليها.

الاختبار: الـ README بيتختبر بـ clone جديد، أو بأول يوم لحد جديد في الفريق (اطلب منه يصلّح اللي وقف فيه في أول PR ليه). والـ runbook بيتختبر بإنك تجرّب الأوامر على staging، وتكتب «Last verified» بالتاريخ واسمك. entry عدّى عليه سنة من غير ما حد يتأكد منه اعتبره مشكوك فيه.

الـ runbook entry: العنوان بالعَرَض اللي هيشوفه الشخص («الديسك مليان»، «الدفع اتخصم والطلب pending») مش بالسبب. وبعده: الـ alert اللي بيدل عليه، والأثر والأولوية، وأوامر التشخيص من الأقل خطورة للأكتر، وخطوات الحل، وخط أحمر («متعملش كذا»)، ومين تكلّم لو مفيش حاجة نفعت. وبعد كل incident (تاب «بناء مشروع كامل»، سؤال «mitigate ثم postmortem») حدّث الـ entry أو اكتب واحد جديد.

والأوامر في المثال: [[journalctl --vacuum-size=500M]] بيمسح لوجات systemd القديمة لحد ما الإجمالي ينزل لـ 500M. و [[docker builder prune -f]] بيمسح الـ build cache. و [[docker image prune -a -f --filter "until=168h"]] بيمسح الـ images اللي مش مستخدمة في أي container واتعملت من أكتر من أسبوع. ولا واحد فيهم بيلمس volumes.`,
            when: "الـ README من أول commit، وبيتحدّث مع كل تغيير في طريقة التشغيل. والـ runbook entry بعد أول مرة مشكلة تحصل في الإنتاج، أو قبل الإطلاق للمشاكل المتوقعة (الدفع، والديسك، والإيميلات، والرجوع لنسخة قديمة).",
            mistakes: R`README بيشرح المشروع بفقرات ومفيهوش أمر واحد يتنسخ. و docs في wiki بعيد عن الكود، فبتبقى قديمة من غير ما حد ياخد باله. و runbook مكتوب ومحدش جرّبه، فأول مرة حد يستخدمه يكتشف إن الأوامر غلط. وخطوات فيها «اعمل restart للحاجة» من غير الأمر بالظبط. وأسرار أو باسوردات جوه الـ README. وفي الانترفيو لو اتسألت «إزاي بتسهّل onboarding لحد جديد؟»: README مجرّب بـ clone جديد، و ADRs للقرارات، و runbook للإنتاج، وأول PR للشخص الجديد تصليح في الـ docs اللي وقف فيها.`
          },
          lines: [
            "الـ alert اللي بيدل على المشكلة، عشان اللي فاتح اللينك من الـ alert يتأكد إنه في المكان الصح.",
            "الأثر والأولوية: هل ده يصحّي حد ولا يستنى الصبح.",
            "آخر مرة حد جرّب الخطوات دي، ومين.",
            "التشخيص الأول: الديسك مليان فعلًا؟ عمود Use%.",
            "أكبر الفولدرات في نفس الـ filesystem، مترتبة بالحجم.",
            "Docker واخد قد إيه، ومنه قد إيه ينفع يتمسح (RECLAIMABLE).",
            "الحل الآمن الأول: لوجات systemd القديمة لحد 500M.",
            "الـ build cache بتاع Docker، وده غالبًا أكبر حاجة على سيرفر بيعمل build.",
            "الـ images اللي مش مستخدمة وأقدم من أسبوع. مبيلمسش volumes.",
            "الخط الأحمر ومين تكلّم. مكتوب قبل ما حد يحتاجه."
          ]
        }
      ]
    }
  ]
});
