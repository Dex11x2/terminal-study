// تكملة تاب interview: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/interview/01.js (شرح حقول الدرس في أوله)
MORE("interview", [
    {
      t: "OOP والتصميم",
      l: 2,
      n: "التعريفات لوحدها مبتنجّحش: كل إجابة هنا لازم معاها مثال من كود حقيقي. التفاصيل في تاب «هندسة البرمجيات»",
      items: [
        {
          cmd: "encapsulation · abstraction · inheritance · polymorphism",
          title: "اشرح أعمدة الـ OOP الأربعة بمثال واحد",
          desc: R`الـ encapsulation: الـ object بيخبّي الداتا بتاعته وبيسمح بتعديلها من methods بس، فمحدش يحط رصيد سالب مثلًا. الـ abstraction: بتتعامل مع واجهة بسيطة ([[send(msg)]]) من غير ما تعرف التفاصيل. الـ inheritance: class بتاخد سلوك class تانية وتزوّد عليه. الـ polymorphism: نفس النداء بيعمل حاجة مختلفة حسب الـ object: [[notifier.send()]] مع الإيميل غير مع الـ SMS، والكود اللي بينادي مش فارق معاه.

وضيف إنك بتفضّل composition على inheritance: شجرة وراثة عميقة بتبقى هشة، وتجميع objects صغيرة أسهل في التغيير.`,
          example: R`class Account {
  #balance = 0;
  deposit(x) { if (x <= 0) throw new Error("invalid"); this.#balance += x; }
  get balance() { return this.#balance; }
}
class Notifier { send(msg) { throw new Error("not implemented"); } }
class EmailNotifier extends Notifier { send(msg) { return $__btemail: $__{msg}$__bt; } }
class SmsNotifier extends Notifier { send(msg) { return $__btsms: $__{msg}$__bt; } }
const a = new Account(); a.deposit(100); console.log(a.balance);
for (const n of [new EmailNotifier(), new SmsNotifier()]) console.log(n.send("paid"));
// 100  email: paid  sms: paid`,
          try: "جرّب [[a.#balance = -5]] من برا الـ class وشوف الـ SyntaxError. بعدين ضيف [[PushNotifier]] من غير ما تلمس اللوب الأخير: ده الـ polymorphism.",
          flag: "script",
          deep: {
            why: "سؤال كلاسيكي في كل انترفيو junior و mid. الإنترفيوير مش عايز التعريفات من الكتاب، عايز يشوف إنك بتستخدمها في كود حقيقي.",
            how: R`في JavaScript الـ class تجميل فوق الـ prototypes: [[extends]] بيربط الـ prototype بتاع الابن بالأب، والـ method بيتدوّر عليها في السلسلة دي. والـ [[#field]] private بجد على مستوى اللغة، مش مجرد اتفاق زي [[_field]].

الـ polymorphism في JS مش محتاج inheritance أصلًا (duck typing): أي object عنده [[send]] ينفع. و TypeScript بيخلي ده صريح بـ [[interface Notifier { send(msg: string): string }]]، وأي class بتطبّقها تنفع مكانها.

والـ composition: بدل شجرة وراثة زي [[AdminUser extends User]] و [[User extends Person]]، اليوزر عنده [[permissions]] و [[notifier]] كـ objects بتتحقن فيه. تغيير سلوك يبقى تبديل جزء، مش إعادة ترتيب شجرة. والـ React نفسها بتقول نفس الكلام: components بتتركب مش بتورث.`,
            when: "Follow-ups: «composition ولا inheritance؟». «JS فيها classes بجد؟». «abstract class ولا interface؟». «overloading ولا overriding؟». «encapsulation بتفرق إيه عن abstraction؟».",
            mistakes: R`تعرّف الـ encapsulation إنها «private variables» وبس. وتقول الـ inheritance هي طريقة إعادة الاستخدام الأساسية. وتخلط abstraction و encapsulation. وتحفظ تعريفات من غير مثال.`
          },
          teach: R`## الفكرة في جملة

المثال فيه class [[Account]] بتوريك الـ encapsulation، و ٣ classes للإشعارات بتوريك الـ abstraction والـ inheritance والـ polymorphism مع بعض. كل عمود ليه سطر في الكود تشاور عليه وانت بتجاوب. شغلناه (والـ solCode) بـ Node 24 على ويندوز.

---

## ١. encapsulation: [[Account]]

~~~js
class Account {
  #balance = 0;
  deposit(x) { if (x <= 0) throw new Error("invalid"); this.#balance += x; }
  get balance() { return this.#balance; }
}
~~~

- [[#balance = 0]]: field **private**. الـ [[#]] جزء من الاسم، واللغة نفسها بتمنع أي كود برا الـ class يوصله.
- [[deposit(x)]]: الطريق الوحيد لتغيير الرصيد، وفيه القاعدة: مفيش إيداع بصفر أو سالب. [[throw new Error]] بيوقف العملية.
- [[this.#balance += x]]: [[this]] هو الـ object الحالي.
- [[get balance()]]: getter: بيتقري كأنه property ([[a.balance]] من غير أقواس)، بس مفيش setter.

جربنا نكسر القواعد من برا:

~~~text الناتج
a.deposit(-5)      → Error: invalid
a.balance = 999    → TypeError: Cannot set property balance of #<Account> which has only a getter
a.#balance = -5    → SyntaxError: Private field '#balance' must be declared in an enclosing class
~~~

(الأخيرة جربناها في ملف لوحده، و Node رفض يشغّل الملف **كله**: دي SyntaxError وقت القراية مش وقت التشغيل.) يعني الـ object هو اللي بيحمي الداتا بتاعته، ومحدش يقدر يحط رصيد غلط. ده الـ encapsulation: الداتا + القواعد في مكان واحد.

---

## ٢. abstraction: [[Notifier]]

~~~js
class Notifier { send(msg) { throw new Error("not implemented"); } }
~~~

دي الواجهة: «أي notifier عنده [[send(msg)]]». مفيش فيها تنفيذ حقيقي (لو ناديتها: [[not implemented]]). الكود اللي بيستخدمها بيتعامل مع «حاجة بتبعت رسالة» من غير ما يعرف إيميل ولا SMS ولا الـ API بتاعهم.

---

## ٣. inheritance: [[extends]]

~~~js
class EmailNotifier extends Notifier { send(msg) { return $__btemail: $__{msg}$__bt; } }
class SmsNotifier extends Notifier { send(msg) { return $__btsms: $__{msg}$__bt; } }
~~~

- [[extends Notifier]]: [[EmailNotifier]] بيورث من [[Notifier]]. جربنا [[new EmailNotifier() instanceof Notifier]] طلعت [[true]].
- كل واحد بيكتب [[send]] بتاعته (override) مكان بتاعة الأب.
- الـ backticks مع [[$__{msg}]]: template string.

---

## ٤. polymorphism: نفس النداء، نتيجة مختلفة

~~~js
const a = new Account(); a.deposit(100); console.log(a.balance);
for (const n of [new EmailNotifier(), new SmsNotifier()]) console.log(n.send("paid"));
~~~

~~~text الناتج (الـ solCode بـ PushNotifier زيادة)
100
email: paid
sms: paid
push: paid
~~~

اللوب بينادي [[n.send("paid")]] ومش فارق معاه نوع [[n]]. ضفنا [[PushNotifier]] بسطر class واحد، واللوب نفسه متلمسش. ولو لقيت نفسك بتكتب [[if (n instanceof PushNotifier)]] جوه اللوب، تبقى ضيّعت الفكرة.

---

## ٥. ملاحظة: JavaScript تحت الـ class

[[Object.getPrototypeOf(EmailNotifier.prototype) === Notifier.prototype]] طلعت [[true]]: الـ class في JS تجميل فوق الـ prototypes، و [[extends]] بيربط السلسلة. والـ private fields مبتظهرش حتى في [[Object.keys(a)]] (طلعت [[[]]]) ولا [[JSON.stringify(a)]] (طلعت [[{}]]).

---

## الخلاصة

| العمود | معناه | في الكود |
|---|---|---|
| encapsulation | الـ object بيحمي داتاه | [[#balance]] و [[deposit]] بالقاعدة |
| abstraction | واجهة بسيطة من غير تفاصيل | [[Notifier.send(msg)]] |
| inheritance | class بتاخد من class | [[EmailNotifier extends Notifier]] |
| polymorphism | نفس النداء، سلوك حسب الـ object | [[n.send("paid")]] في اللوب |

> وقول إنك بتفضّل composition: الـ object «عنده» notifier بيتحقن فيه، بدل شجرة وراثة عميقة صعب تغيّرها.`,
          lines: [
            "حساب بنكي.",
            "الرصيد private: محدش يوصله من برا (encapsulation).",
            "التعديل من method بس، وهي اللي بتمنع القيم الغلط.",
            "قراية الرصيد من getter.",
            "قفلة.",
            "الواجهة العامة: أي notifier عنده send (abstraction).",
            "إيميل بيورث من Notifier ويطبّق send بطريقته (inheritance).",
            "SMS نفس الواجهة بتنفيذ مختلف.",
            "استخدم الحساب: 100.",
            "نفس النداء بيطلّع نتيجة مختلفة حسب الـ object (polymorphism)."
          ],
          sol: R`[[a.#balance = -5]] برا الـ class بيدي [[SyntaxError: Private field '#balance' must be declared in an enclosing class]]، وده قبل ما الكود يشتغل أصلًا (الملف كله مش هيتشغل). ده encapsulation حقيقي من اللغة، مش اتفاق زي [[_balance]]. وخلي بالك: لو جربتها في Console بتاع Chrome ممكن تعدّي، لأن الـ DevTools بتسمح بقراية الـ private fields عشان الـ debugging. جربها في ملف أو في [[node]].

و [[PushNotifier]] بيتضاف كـ class جديد بس، واللوب يبقى زي ما هو، والناتج بقى [[100]] ثم [[email: paid]] و [[sms: paid]] و [[push: paid]]. ده الـ polymorphism: اللوب بيكلم [[send]] ومش فارق معاه النوع. ولو حد لقى نفسه بيكتب [[if (n instanceof PushNotifier)]] جوه اللوب، يبقى ضيّع الفكرة.`,
          solCode: R`// oop.mjs
class Account {
  #balance = 0;
  deposit(x) { if (x <= 0) throw new Error("invalid"); this.#balance += x; }
  get balance() { return this.#balance; }
}
class Notifier { send(msg) { throw new Error("not implemented"); } }
class EmailNotifier extends Notifier { send(msg) { return $__btemail: $__{msg}$__bt; } }
class SmsNotifier extends Notifier { send(msg) { return $__btsms: $__{msg}$__bt; } }
class PushNotifier extends Notifier { send(msg) { return $__btpush: $__{msg}$__bt; } }
const a = new Account(); a.deposit(100); console.log(a.balance);
for (const n of [new EmailNotifier(), new SmsNotifier(), new PushNotifier()]) console.log(n.send("paid"));
// 100
// email: paid
// sms: paid
// push: paid`
        },
        {
          cmd: "SOLID",
          title: "قول مبادئ التصميم الخمسة المشهورة بحروفها، سطر لكل واحد",
          desc: R`S (Single Responsibility): كل module ليه سبب واحد يتغير عشانه، فالـ controller ميبعتش إيميلات بنفسه. O (Open/Closed): تضيف سلوك جديد بإضافة كود مش بتعديل كود شغال، زي مزود دفع جديد من غير ما تلمس الـ checkout. L (Liskov): أي class فرعية تتحط مكان الأصلية من غير مفاجآت. I (Interface Segregation): واجهات صغيرة محددة بدل واحدة ضخمة. D (Dependency Inversion): الكود المهم يعتمد على واجهة مش على تنفيذ معين، فتقدر تبدّل الداتابيز أو تحط fake في الاختبار.

وقولها بتواضع: دي إرشادات مش قوانين، وتطبيقها بزيادة بيطلّع abstractions ملهاش لازمة.`,
          example: R`// احفظه s.mjs: الـ service معتمد على repo و mailer من برا (D)
function makeOrderService({ repo, mailer }) {
  return {
    async place(order) {
      const saved = await repo.save(order);
      await mailer.send(order.email, "order confirmed");
      return saved;
    }
  };
}
const fakeRepo = { save: async o => ({ id: 1, ...o }) };
const fakeMailer = { send: async () => {} };
const svc = makeOrderService({ repo: fakeRepo, mailer: fakeMailer });
console.log(await svc.place({ email: "you@example.com", item: "book" }));`,
          try: "بدّل fakeMailer بواحد بيطبع الرسالة، من غير ما تلمس [[makeOrderService]]. بعدين فكّر: لو الـ service كان بيعمل [[import { sendEmail }]] بنفسه، كنت هتختبره إزاي من غير ما يبعت إيميل بجد؟",
          flag: "script",
          deep: {
            why: "بيبيّن إنك بتفكر في الكود على المدى الطويل: هيتغير إزاي، وهيتختبر إزاي. وبيفتح كلام عن مشاريعك: «فين خالفت S وصلّحتها؟».",
            how: R`S: «سبب التغيير» يعني مين اللي هيطلب التعديل. لو المحاسب والمصمم الاتنين هيطلبوا تعديل في نفس الملف، ده ملف فيه مسؤوليتين.

O: بتتحقق غالبًا بـ Strategy أو plugins: map من مزودين الدفع، وتضيف واحد جديد بسطر، والـ checkout مبيتلمسش.

L: المثال المشهور Square و Rectangle: المربع «هو» مستطيل رياضيًا، بس لو كود بيغيّر العرض ويتوقع الطول ثابت، المربع هيكسره. ومثال أقرب: [[ReadOnlyRepo]] بيورث من [[Repo]] ويرمي error في [[save]]: أي كود بيستخدم Repo هيتفاجئ.

I: كلاينت محتاج [[read]] بس ميتجبرش يعتمد على واجهة فيها ٢٠ method.

D: الـ Dependency Inversion مبدأ (المهم يعتمد على abstraction)، والـ Dependency Injection طريقة لتطبيقه (تمرر الـ dependencies من برا زي المثال). في JS و TS غالبًا مش محتاج framework لده: دوال بتاخد dependencies كفاية.`,
            when: "Follow-ups: «اديني مثال على مخالفة لـ S من كودك». «الفرق بين Dependency Inversion و Dependency Injection؟». «Liskov بمثال؟». «إمتى SOLID يبقى over-engineering؟».",
            mistakes: R`تحفظ الأسامي من غير مثال. وتقول S يعني «الدالة تعمل حاجة واحدة» (قريب، بس المبدأ عن سبب التغيير). و interface لكل class حتى لو ليها تنفيذ واحد وعمرها ما هتتبدل. وتقول مثال Square و Rectangle وانت مش فاهم ليه بيكسر.`
          },
          teach: R`## الفكرة في جملة

الإجابة خمس حروف، والمثال بيوريك أسهلهم تثبته بكود: الـ **D** (Dependency Inversion). الـ service مش بيعمل الداتابيز والإيميل بنفسه، بياخدهم من برا، فتقدر تجربه بـ fakes من غير داتابيز ولا إيميل حقيقي. شغلناه بـ Node 24 على ويندوز.

---

## ١. الحروف الخمسة في جدول

| الحرف | الاسم | في جملة | مثال |
|---|---|---|---|
| S | Single Responsibility | سبب واحد يتغير عشانه | الـ controller ميبعتش إيميلات بنفسه |
| O | Open/Closed | تضيف من غير ما تعدّل | مزود دفع جديد = سطر في map، والـ checkout متلمسش |
| L | Liskov Substitution | الابن يتحط مكان الأب من غير مفاجآت | [[ReadOnlyRepo]] يرمي في [[save]] = كسر |
| I | Interface Segregation | واجهات صغيرة | اللي محتاج [[read]] بس ميعتمدش على ٢٠ method |
| D | Dependency Inversion | المهم يعتمد على واجهة مش تنفيذ | المثال تحت |

---

## ٢. الـ factory

~~~js
function makeOrderService({ repo, mailer }) {
  return {
    async place(order) {
      const saved = await repo.save(order);
      await mailer.send(order.email, "order confirmed");
      return saved;
    }
  };
}
~~~

- [[({ repo, mailer })]]: الدالة بتاخد object واحد، والـ destructuring بيطلّع منه [[repo]] و [[mailer]]. دول الـ **dependencies**.
- [[return { async place(order) {...} }]]: بترجّع object فيه method واحدة. الـ method شايفة [[repo]] و [[mailer]] لأنها closure على الـ parameters.
- [[repo.save(order)]]: «احفظ بأي حاجة عندها [[save]]». مش [[prisma.order.create]] ولا [[pg.query]].
- [[mailer.send(to, subject)]]: «ابعت بأي حاجة عندها [[send]]».

الـ service بيعتمد على **شكل** (حاجة فيها [[save]]، وحاجة فيها [[send]])، مش على مكتبة بعينها. ده الـ D.

---

## ٣. الـ fakes

~~~js
const fakeRepo = { save: async o => ({ id: 1, ...o }) };
const fakeMailer = { send: async () => {} };
~~~

- [[async o => ({ id: 1, ...o })]]: بيرجّع الـ order زي ما هو ومعاه [[id: 1]]. الـ spread [[...o]] بينسخ كل خصايص [[o]] جوه الـ object الجديد.
- [[async () => {}]]: mailer مبيعملش حاجة.

~~~js
const svc = makeOrderService({ repo: fakeRepo, mailer: fakeMailer });
console.log(await svc.place({ email: "you@example.com", item: "book" }));
~~~

~~~text الناتج
{ id: 1, email: 'you@example.com', item: 'book' }
~~~

---

## ٤. التجربة: mailer بيطبع (الـ solCode)

~~~js
const consoleMailer = { send: async (to, subject) => console.log($__bt[mail] to=$__{to} subject="$__{subject}"$__bt) };
~~~

~~~text الناتج
[mail] to=you@example.com subject="order confirmed"
{ id: 1, email: 'you@example.com', item: 'book' }
~~~

بدلنا الـ mailer و [[makeOrderService]] متلمستش. وفي اختبار حقيقي بتعمل «spy» بيسجل اللي اتبعت عشان تتأكد منه:

~~~text الناتج
spy recorded: [ [ 'a@b.c', 'order confirmed' ] ]
~~~

ولو الـ service كان عامل [[import { sendEmail } from "./email.js"]] جواه، كنت هتحتاج [[vi.mock]] أو [[jest.mock]] على مسار الملف، والـ dependency تبقى مستخبية.

---

## ٥. Inversion و Injection

| | Dependency Inversion | Dependency Injection |
|---|---|---|
| إيه هو | مبدأ: الكود المهم يعتمد على abstraction | طريقة: تمرر الـ dependencies من برا |
| في المثال | الـ service عايز «حاجة فيها send» | [[makeOrderService({ repo, mailer })]] |

في JS و TS غالبًا مش محتاج framework: دالة بتاخد dependencies كفاية.

---

## الخلاصة

- اعرف الخمسة بجملة ومثال لكل واحد (الجدول فوق).
- الـ D أسهل حرف تثبته: fake كـ argument بدل mock لملف.
- دي إرشادات مش قوانين: interface لكل class ليها تنفيذ واحد عمره ما هيتبدل = over-engineering.`,
          lines: [
            "factory للـ service بياخد الـ dependencies كـ parameters.",
            "بيرجّع object فيه العمليات.",
            "عملية الطلب:",
            "احفظ بأي repo اتدّاله (داتابيز حقيقية أو fake).",
            "ابعت تأكيد بأي mailer اتدّاله.",
            "رجّع النتيجة.",
            "قفلة place.",
            "قفلة الـ object.",
            "قفلة الـ factory.",
            "repo مزيف للاختبار: بيرجّع الـ order ومعاه id.",
            "mailer مزيف مبيبعتش حاجة.",
            "ركّب الـ service بالمزيفين.",
            "جرّبه من غير داتابيز ولا إيميل."
          ],
          sol: R`الناتج بعد ما تبدّل الـ mailer: [[[mail] to=you@example.com subject="order confirmed"]] وبعدها [[{ id: 1, email: 'you@example.com', item: 'book' }]]، و [[makeOrderService]] متلمستش. ده الـ D (Dependency Inversion): الـ service بيعتمد على «حاجة فيها [[send]]» مش على مكتبة إيميل بعينها.

والإجابة على سؤال التفكير: لو الـ service عامل [[import { sendEmail }]] بنفسه، كنت هتضطر تعمل mock للـ module كله ([[vi.mock("./email.js")]] في Vitest أو [[jest.mock]])، وده بيشتغل بس بيربط الاختبار بمسار الملف، ويتكسر لو نقلته، ويخلّي dependencies الـ service مخفية. مع الـ injection الاختبار بيدّي fake كـ argument عادي، وفي production بتدّي الحقيقي. ده نفس السبب اللي بيخلي الـ D أسهل حرف تشرحه بمثال.`,
          solCode: R`// s.mjs: mailer بيطبع بدل ما يبعت
function makeOrderService({ repo, mailer }) {
  return {
    async place(order) {
      const saved = await repo.save(order);
      await mailer.send(order.email, "order confirmed");
      return saved;
    }
  };
}
const fakeRepo = { save: async o => ({ id: 1, ...o }) };
const consoleMailer = { send: async (to, subject) => console.log($__bt[mail] to=$__{to} subject="$__{subject}"$__bt) };
const svc = makeOrderService({ repo: fakeRepo, mailer: consoleMailer });
console.log(await svc.place({ email: "you@example.com", item: "book" }));
// [mail] to=you@example.com subject="order confirmed"
// { id: 1, email: 'you@example.com', item: 'book' }`
        },
        {
          cmd: "Singleton و Factory",
          title: "اشرح pattern بيضمن نسخة واحدة بس من حاجة، و pattern بيخبّي إزاي الـ objects بتتعمل",
          desc: R`الأول Singleton: نسخة واحدة بس من حاجة في التطبيق، زي الاتصال بالداتابيز أو الـ logger. في JS الـ module نفسه بيتحمّل مرة واحدة ويتكاش، فأي حاجة بتعملها فيه بتبقى نسخة واحدة لكل process. ومثال حقيقي: في Next.js وقت التطوير الـ hot reload بيعيد تحميل الملفات، فبتحفظ الـ pool أو Prisma client على [[globalThis]] عشان ميفتحش connections جديدة كل مرة. التاني Factory: دالة بتقرر تعمل أنهي object بدل ما الكود يعمل [[new]] بنفسه، زي [[createPaymentProvider(country)]] ترجّع المزود المناسب.

وعيوب الـ Singleton لازم تقولها: global state مستخبي، وصعب في الاختبار. عشان كده الأحسن تعمل النسخة الواحدة وتمررها (dependency injection) بدل ما كل ملف يجيبها بنفسه.`,
          example: R`// lib/db.js: نسخة واحدة تعيش حتى مع الـ hot reload
import pg from "pg";
const g = globalThis;
export const pool = g.pool ?? new pg.Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") g.pool = pool;
// Factory: الكود بيطلب «مزود دفع» ومش فارق معاه أنهي
export function createPaymentProvider(country) {
  if (country === "EG") return { name: "local", pay: amount => $__btlocal:$__{amount}$__bt };
  return { name: "stripe", pay: amount => $__btstripe:$__{amount}$__bt };
}`,
          try: "في مشروع Next.js عندك، دوّر على المكان اللي بيتعمل فيه client الداتابيز: هل محمي من الـ hot reload بـ globalThis؟ لو لأ، عدّل ملف كذا مرة وراقب عدد الـ connections في الداتابيز.",
          flag: "script",
          deep: {
            why: "«إيه الـ patterns اللي استخدمتها؟» سؤال شبه ثابت. وأحسن إجابة pattern استخدمته فعلًا في مشروع وتعرف ليه، مش قايمة محفوظة.",
            how: R`Node بيحفظ كل module اتحمّل في cache، فالمرة التانية اللي تعمل import بترجع نفس الـ exports. ده singleton لكل process بس: لو شغّال ٤ processes أو serverless فيه instances كتير، يبقى عندك ٤ نسخ أو أكتر، وكل واحدة ليها connection pool.

في Next.js وقت التطوير، الـ HMR بيعيد تقييم الملفات اللي اتغيرت، فالـ module بيتنفّذ تاني ويعمل pool جديد، والقديم لسه فاتح connections، لحد ما الداتابيز تقول «too many connections». الـ [[globalThis]] مبيتمسحش مع إعادة التحميل، فبنخزّن فيه. وفي الإنتاج مش محتاجه لأن الـ module بيتحمّل مرة.

الـ Factory أنواع: simple factory (دالة بـ if أو map)، و factory method (الـ subclass بتقرر)، و abstract factory (عيلة objects مع بعض). والأحسن من if/else طويلة map: [[{ EG: makeLocal, default: makeStripe }]]. وفيه Builder لما الـ object ليه إعدادات كتير اختيارية.`,
            when: "Follow-ups: «ليه الـ Singleton ساعات بيتقال عليه anti-pattern؟». «الـ module في Node singleton فعلًا؟». «Factory ولا constructor عادي؟». «Builder إمتى؟». «patterns تانية استخدمتها؟» (Middleware في Express هو Chain of Responsibility، و Adapter لما تلف مكتبة خارجية).",
            mistakes: R`تقول الـ Singleton «نسخة واحدة في السيرفر كله» وانت شغال بكذا process أو serverless. وتعمل Singleton لكل حاجة فالاختبارات تبقى معتمدة على بعض. و Factory فيه if/else بتكبر مع كل نوع جديد.`
          },
          teach: R`## الفكرة في جملة

الملف فيه pattern-ين: **Singleton** (pool داتابيز واحد بس حتى لو الملف اتحمّل تاني) و **Factory** (دالة بتختار مزود الدفع بدل ما الكود يعمل [[new]] بنفسه). جربناه بـ Node 24 على ويندوز ومكتبة [[pg]]: عملنا import للملف مرتين، ومرة كأنه hot reload، وقارنّا الـ pool.

---

## ١. الـ Singleton

~~~js
import pg from "pg";
const g = globalThis;
export const pool = g.pool ?? new pg.Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") g.pool = pool;
~~~

- [[pg]]: مكتبة PostgreSQL. و [[new pg.Pool(...)]] بيعمل pool: مجموعة connections مفتوحة بيعيد استخدامها. (الـ constructor نفسه مش بيتصل، الاتصال بيحصل مع أول query.)
- [[globalThis]]: الـ object الـ global في أي بيئة (Node أو متصفح). و [[g]] اسم قصير له.
- [[g.pool ?? new ...]]: لو فيه pool متخزن قبل كده استخدمه، غير كده اعمل جديد.
- [[process.env.DATABASE_URL]]: عنوان الداتابيز من متغيرات البيئة.
- السطر الأخير: في التطوير بس، خزّن الـ pool على [[globalThis]].

---

## ٢. التجربة: import مرتين، و «hot reload»

~~~js
const a = await import("./db.mjs");
const b = await import("./db.mjs");
console.log("same import twice -> same pool:", a.pool === b.pool);
const c = await import("./db.mjs?reload=1");
console.log("reloaded module -> same pool:", a.pool === c.pool);
~~~

[[?reload=1]] بيخلي Node يعتبره module مختلف ويقيّمه من جديد، وده اللي الـ hot reload بيعمله في Next.js لما تحفظ ملف. وحطينا [[console.log("module evaluated")]] أول الملف:

~~~text الناتج (التطوير)
module evaluated
same import twice -> same pool: true
module evaluated
reloaded module -> same pool: true
~~~

~~~text الناتج (NODE_ENV=production)
module evaluated
same import twice -> same pool: true
module evaluated
reloaded module -> same pool: false
~~~

اقرا الاتنين:

- **import مرتين**: [[module evaluated]] اتطبعت **مرة**. Node بيكاش الـ module، فالـ import التاني بيرجّع نفس الـ exports. ده singleton ببلاش.
- **reload في التطوير**: الملف اتقيّم تاني، بس [[g.pool]] كان موجود فرجّع **نفس** الـ pool.
- **reload في production**: السطر الأخير متنفذش، فالـ reload عمل pool **جديد** والقديم لسه فاتح connections. ده بالظبط اللي بيحصل في dev لو نسيت [[globalThis]]: كل حفظ ملف = pool جديد، لحد [[too many connections]]. وفي production الحقيقي مفيش reload أصلًا، فمش محتاجه.

> وخلي بالك: ده singleton **لكل process**. ٤ processes أو serverless بـ instances كتير = ٤ pools أو أكتر.

---

## ٣. الـ Factory

~~~js
export function createPaymentProvider(country) {
  if (country === "EG") return { name: "local", pay: amount => $__btlocal:$__{amount}$__bt };
  return { name: "stripe", pay: amount => $__btstripe:$__{amount}$__bt };
}
~~~

الاتنين ليهم **نفس الشكل** ([[name]] و [[pay(amount)]]). الكود اللي بينادي بيقول «هاتلي مزود للبلد دي» ويستخدمه من غير ما يعرف أنهي:

~~~text الناتج
EG local local:100
SA stripe stripe:100
~~~

ولما يزيد عدد المزودين، الـ if/else بتطول. الأنضف map: [[{ EG: makeLocal, default: makeStripe }]]، وده بيبقى Strategy كمان.

---

## ٤. الـ solCode: تتأكد بعينك

~~~text
SELECT count(*) FROM pg_stat_activity WHERE datname = current_database();
~~~

[[pg_stat_activity]] view في Postgres فيه صف لكل connection. لو الرقم بيزيد مع كل حفظ ملف في dev، يبقى الـ pool مش محمي.

---

## الخلاصة

| | Singleton | Factory |
|---|---|---|
| المشكلة | محتاج نسخة واحدة (pool، logger) | الكود ميعرفش يعمل أنهي object |
| في JS | الـ module cache + [[globalThis]] للـ hot reload | دالة بترجّع objects بنفس الشكل |
| العيب | global state مستخبي، وصعب في الاختبار | if/else بتكبر لو مش map |

> الأحسن: اعمل النسخة الواحدة واحقنها (dependency injection) بدل ما كل ملف يعمل import ليها.`,
          lines: [
            "مكتبة PostgreSQL لـ Node.",
            "اختصار للـ global object.",
            "لو فيه pool متخزن استخدمه، غير كده اعمل واحد جديد.",
            "في التطوير خزّنه على globalThis عشان الـ hot reload ميعملش واحد جديد كل مرة.",
            "الـ factory: بياخد البلد ويرجّع مزود.",
            "مصر: مزود محلي.",
            "غير كده: Stripe. الاتنين نفس الشكل، فالكود اللي بينادي مش فارق معاه.",
            "قفلة."
          ],
          sol: R`المفروض تلاقي في [[lib/db.ts]] أو [[lib/prisma.ts]] حاجة شبه [[globalThis.prisma ?? new PrismaClient()]] وبعدها [[if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma]]. لو موجودة يبقى تمام: عدد الـ connections هيفضل ثابت مهما عدّلت ملفات.

لو مش موجودة وبتعمل [[new PrismaClient()]] أو [[new Pool()]] على طول، كل hot reload بيعمل module جديد وبالتالي client جديد بـ pool جديد، والقديم مبيتقفلش. هتشوف رقم الـ query اللي تحت بيطلع كل ما تحفظ ملف، ولحد ما توصل لـ [[too many connections]] (أو في Prisma تحذير إن فيه نسخ كتير شغالة). وده بيحصل في الـ dev بس، فالناس بتفتكره bug في الداتابيز.

والإجابة في الانترفيو: «ده Singleton عملي: نسخة واحدة من الـ pool للـ process، وبنخزنها على globalThis عشان تعيش بعد الـ hot reload. والـ Singleton الكلاسيكي فيه عيب إنه global state بيصعّب الاختبار، فبفضّل أحقنه لما أقدر».`,
          solCode: R`-- في psql وانت بتعدّل ملفات في dev: الرقم لازم يفضل ثابت
SELECT count(*) FROM pg_stat_activity WHERE datname = current_database();
SELECT application_name, state, count(*)
FROM pg_stat_activity
WHERE datname = current_database()
GROUP BY 1, 2;`
        },
        {
          cmd: "Observer و Strategy",
          title: "اشرح pattern بيخلي أجزاء تسمع لحدث من غير ما تعرف بعض، و pattern بيخليك تبدّل الخوارزمية وقت التشغيل",
          desc: R`الأول Observer: حاجة بتعلن حدث، وأي عدد من المستمعين بيتسجلوا ويتبلغوا من غير ما المعلن يعرفهم. ده [[addEventListener]] في المتصفح، و [[EventEmitter]] في Node، والـ subscriptions في state management. التاني Strategy: عندك كذا طريقة لنفس المهمة (حساب شحن، أو مزود دفع، أو ترتيب)، فكل طريقة في دالة لوحدها بنفس الشكل، والكود بيختار واحدة وقت التشغيل بدل if/else طويلة.

مثال حقيقي: بعد ما الـ order يتدفع، الـ service بيعمل [[emit("order.paid")]]، والإيميل والفاتورة والإحصائيات كلهم listeners، فتضيف واحد جديد من غير ما تلمس كود الدفع.`,
          example: R`import { EventEmitter } from "node:events";
const bus = new EventEmitter();
bus.on("order.paid", o => console.log("email to", o.email));
bus.on("order.paid", o => console.log("invoice for", o.id));
const shipping = {
  standard: w => 30 + w * 5,
  express: w => 60 + w * 8,
  pickup: () => 0
};
const order = { id: 7, email: "you@example.com", weight: 2, method: "express" };
console.log("shipping:", shipping[order.method](order.weight));
bus.emit("order.paid", order);
// shipping: 76  email to you@example.com  invoice for 7`,
          try: "ضيف listener تالت بيرمي error، وشوف الـ emit بيعمل إيه في الباقي. بعدين ضيف طريقة شحن [[sameDay]] بسطر واحد من غير ما تلمس أي if.",
          flag: "script",
          deep: {
            why: "الاتنين موجودين في كل كود JavaScript حتى لو مش بتسميهم. لو عرفت تشاور عليهم في كودك، إجابتك بتبقى أقوى بكتير من التعريف.",
            how: R`Observer: الـ subject شايل لستة listeners، والـ emit بيلف عليهم. في [[EventEmitter]] الـ listeners بيتنفّذوا sync بترتيب التسجيل، ولو واحد رمى error من غير ما حد يمسكه، الـ emit نفسه بيرمي والباقي مبيتنفّذش. ولو سجلت listeners كتير على نفس الحدث من غير ما تشيلهم، Node بيطبع [[MaxListenersExceededWarning]] (الحد الافتراضي ١٠) لأنه غالبًا leak.

والفرق عن pub/sub: في Observer المستمع بيتسجل عند الـ subject مباشرة وفي نفس الـ process. في pub/sub فيه وسيط (Redis، أو queue) والطرفين ممكن يبقوا في سيرفرات مختلفة، وده اللي بتحتاجه لما يبقى عندك أكتر من instance.

Strategy في JS غالبًا مجرد object من دوال أو map زي المثال، وده تطبيق مباشر لـ Open/Closed: طريقة جديدة = إضافة مش تعديل. وفيه patterns تانية بتظهر في كودك كل يوم: الـ middleware في Express (Chain of Responsibility)، و Adapter لما تلف مكتبة خارجية بواجهة بتاعتك.`,
            when: "Follow-ups: «الفرق بين Observer و Pub/Sub؟». «EventEmitter sync ولا async؟». «listener رمى error يحصل إيه؟». «Strategy ولا if/else؟». «patterns تانية استخدمتها؟».",
            mistakes: R`تفتكر الـ emit بيشغّل الـ listeners async في الخلفية. وتنسى [[off]] أو [[removeListener]] فيحصل leak. و events لكل حاجة فتبقى مش عارف مين بينادي مين وأنهي ترتيب.`
          },
          teach: R`## الفكرة في جملة

المثال فيه pattern-ين في ١٢ سطر: **Observer** (bus بيعلن «order اتدفع» وأي حد مهتم يسمع) و **Strategy** (طرق الشحن دوال في object، وبتختار واحدة بالاسم). شغلناه (والـ solCode) بـ Node 24 على ويندوز، وضفنا طباعة قبل وبعد الـ [[emit]] عشان نشوف الترتيب.

---

## ١. Observer: [[EventEmitter]]

~~~js
import { EventEmitter } from "node:events";
const bus = new EventEmitter();
bus.on("order.paid", o => console.log("email to", o.email));
bus.on("order.paid", o => console.log("invoice for", o.id));
~~~

- [[EventEmitter]]: class جاهزة في Node، فيها لستة listeners لكل اسم حدث.
- [[bus.on(name, fn)]]: سجّل [[fn]] تتنادى كل ما الحدث ده يحصل. [[order.paid]] مجرد اسم نص، والنقطة اتفاق في التسمية.
- الـ listener التاني مش عارف الأول، والاتنين مش عارفين مين اللي هيعلن. ده الـ decoupling.

---

## ٢. Strategy: object من الدوال

~~~js
const shipping = {
  standard: w => 30 + w * 5,
  express: w => 60 + w * 8,
  pickup: () => 0
};
~~~

كل طريقة دالة **بنفس الشكل**: بتاخد الوزن [[w]] وترجّع السعر. [[pickup]] مش محتاجة الوزن فمفيش parameter.

~~~js
const order = { id: 7, email: "you@example.com", weight: 2, method: "express" };
console.log("shipping:", shipping[order.method](order.weight));
~~~

من جوه لبرا:

1. [[order.method]] = [["express"]].
2. [[shipping["express"]]]: الأقواس المربعة بتجيب property باسم من متغير. النتيجة الدالة [[w => 60 + w * 8]].
3. [[(order.weight)]]: نادي الدالة بـ 2: 60 + 2 × 8 = **76**.

مفيش if خالص: الاختيار حصل بالاسم.

---

## ٣. الـ emit

~~~js
bus.emit("order.paid", order);
~~~

~~~text الناتج (بطباعة قبل وبعد)
shipping: 76
before emit
email to you@example.com
invoice for 7
emit returned true
after emit
~~~

- الـ listeners اشتغلوا **جوه** الـ emit، بترتيب التسجيل، وقبل [[after emit]]. يعني [[emit]] **sync**: مش بيحطهم في الخلفية.
- [[emit]] رجّع [[true]] = كان فيه listeners. وجربنا [[bus.emit("nobody.listens")]] رجّع [[false]]، و [[bus.listenerCount("order.paid")]] رجّع 2.

---

## ٤. listener بيرمي error (الـ solCode)

ضفنا listener في النص بيرمي [[Error("invoice service down")]]، ولفينا الـ emit بـ [[try/catch]]:

~~~text الناتج
email to you@example.com
emit threw: invoice service down
~~~

الأول اشتغل، التاني رمى، والتالت ([[invoice for 7]]) **مطبعش خالص**، والـ error طلع من [[emit]] نفسه للي ناداه. من غير الـ [[try]] كان الـ process هيقع. يعني الـ listeners مش معزولين: كل واحد يمسك أخطاؤه، والشغل المهم يروح queue.

---

## ٥. طريقة شحن جديدة بسطر

~~~js
shipping.sameDay = w => 100 + w * 10;
~~~

~~~text الناتج
shipping: 120
~~~

ضفنا property للـ object، وولا if اتلمست. ده Open/Closed: إضافة مش تعديل.

---

## الخلاصة

| | Observer | Strategy |
|---|---|---|
| المشكلة | أجزاء كتير محتاجة تعرف إن حاجة حصلت | كذا طريقة لنفس المهمة |
| في JS | [[EventEmitter]]، [[addEventListener]] | object أو Map من دوال بنفس الشكل |
| إضافة جديد | [[bus.on(...)]] من غير ما تلمس اللي بيعلن | property جديدة من غير ما تلمس if |
| خلي بالك | sync، و error بيوقف الباقي، و [[off]] عشان الـ leak | كل الدوال لازم نفس الـ signature |

> Observer في نفس الـ process. لو عندك أكتر من instance محتاج pub/sub بوسيط (Redis، queue).`,
          lines: [
            "الـ EventEmitter من Node.",
            "«bus» للأحداث.",
            "listener: ابعت إيميل لما order يتدفع.",
            "listener تاني لنفس الحدث: اعمل فاتورة. الاتنين مش عارفين بعض.",
            "الـ strategies: كل طريقة شحن دالة بنفس الشكل (الوزن ← السعر).",
            "عادي.",
            "سريع.",
            "استلام من المكان.",
            "قفلة.",
            "order اليوزر اختار فيه express.",
            "اختار الـ strategy وقت التشغيل من غير أي if: 76.",
            "أعلن الحدث: الـ listeners الاتنين يشتغلوا بالترتيب."
          ],
          sol: R`الـ listener اللي بيرمي error بيوقف كل حاجة بعده: الـ listeners بتشتغل sync بالترتيب، فالأول يطبع [[email to you@example.com]]، والتاني يرمي، والتالت مبيشتغلش خالص، و [[emit]] نفسه بيرمي الـ error للي نادى عليه. ولو مفيش [[try/catch]] حوالين الـ emit، الـ process كله بيقع. ده عيب مهم في الـ EventEmitter تقوله: الـ listeners مش معزولين عن بعض، فكل listener لازم يمسك أخطاؤه، والشغل المهم (زي الفواتير) يتحط في queue.

و [[sameDay]] بسطر واحد: [[shipping.sameDay = w => 100 + w * 10]] (أو تضيفه جوه الـ object)، ومع [[method: "sameDay"]] ووزن 2 الناتج [[shipping: 120]]. مفيش أي if اتلمست، وده الـ Strategy: الخوارزمية بقت قيمة في object بتختارها بالاسم.`,
          solCode: R`// obs.mjs
import { EventEmitter } from "node:events";
const bus = new EventEmitter();
bus.on("order.paid", o => console.log("email to", o.email));
bus.on("order.paid", o => { throw new Error("invoice service down"); });
bus.on("order.paid", o => console.log("invoice for", o.id));
const shipping = {
  standard: w => 30 + w * 5,
  express: w => 60 + w * 8,
  pickup: () => 0
};
shipping.sameDay = w => 100 + w * 10;
const order = { id: 7, email: "you@example.com", weight: 2, method: "sameDay" };
console.log("shipping:", shipping[order.method](order.weight));
try { bus.emit("order.paid", order); } catch (e) { console.log("emit threw:", e.message); }
// shipping: 120
// email to you@example.com
// emit threw: invoice service down
// ("invoice for 7" مطبعتش)`
        }
      ]
    },
    {
      t: "الكود في الانترفيو",
      l: 2,
      n: "بتختبر إزاي، وبتكتب إزاي، وبتحل مسألة قدام حد إزاي",
      items: [
        {
          cmd: "unit · integration · e2e",
          title: "إيه أنواع الاختبارات؟ وبتختبر إيه في مشروعك بالظبط؟",
          desc: R`الـ unit بيختبر دالة أو وحدة لوحدها بسرعة ومن غير شبكة أو داتابيز. الـ integration بيختبر كذا جزء مع بعض، زي endpoint حقيقي مع داتابيز اختبار. والـ e2e بيشغّل التطبيق كله في متصفح زي اليوزر (Playwright مثلًا). الهرم: unit كتير لأنها رخيصة وسريعة، و integration أقل، و e2e قليل للمسارات الحرجة زي التسجيل والدفع.

وقول إزاي بتختار: بختبر الـ business logic اللي لو باظت هتكلّف فلوس (حساب السعر، والصلاحيات، والـ webhooks)، مش الـ getters. وفيه كمان smoke test بعد الـ deploy، و regression test لكل bug اتصلّح عشان ميرجعش. الأدوات في تاب «فحص الكود».`,
          example: R`import { describe, it, expect } from "vitest";
import { applyCoupon } from "./pricing.js";
describe("applyCoupon", () => {
  it("applies a percentage discount", () => {
    expect(applyCoupon(200, { type: "percent", value: 10 })).toBe(180);
  });
  it("never goes below zero", () => {
    expect(applyCoupon(50, { type: "fixed", value: 80 })).toBe(0);
  });
});`,
          try: "اكتب [[applyCoupon]] في [[pricing.js]] وشغّل [[npx vitest run]]. بعدين بوّظ الدالة عمدًا (شيل الـ Math.max) وشوف أنهي اختبار وقع ورسالته بتقول إيه.",
          flag: "script",
          deep: {
            why: "الشركات عايزة حد تقدر تثق إن تعديله مش هيكسر حاجة تانية. والسؤال بيكشف هل الاختبارات عندك عادة ولا كلمة في الـ CV.",
            how: R`الـ test doubles: الـ stub بيرجّع قيمة ثابتة، والـ mock بيتأكد إنه اتنادى بشكل معين، والـ fake تنفيذ بسيط شغال (repo في الذاكرة)، والـ spy بيراقب دالة حقيقية. القاعدة: اعمل mock للحدود الخارجية (بوابة الدفع، والإيميل، و APIs بره)، ومتعملش mock لكودك انت وإلا الاختبار بيختبر الـ mocks.

الـ integration مع داتابيز: داتابيز اختبار منفصلة (غالبًا في Docker)، وكل اختبار في transaction بتترجع في الآخر أو بيبدأ بداتا نضيفة. وفيه رأي مشهور (testing trophy) إن الـ integration بيدّي أكبر ثقة مقابل التكلفة في تطبيقات الويب.

الـ coverage بيقولك أنهي سطور اتنفذت، مش هل اتختبرت صح. و TDD: اكتب اختبار فاشل، وبعدين أقل كود يعدّيه، وبعدين حسّن (red، green، refactor). والـ flaky test (بينجح ويفشل من غير تغيير) أوحش من مفيش اختبار، لأنه بيعلّم الفريق يتجاهل الأحمر. ولما تلاقي واحد: شغّله لوحده كذا مرة، ودوّر على السبب المعتاد (وقت، أو ترتيب اختبارات، أو داتا مشتركة، أو انتظار ثابت بدل انتظار شرط)، وصلّحه أو اعزله بتذكرة، متسيبوش.

والكود نفسه: «تاب فحص الكود» المستوى التاني ([[vitest]] و [[--coverage]] وكتابة الاختبارات) والمستوى التالت (e2e بـ Playwright)، و «تاب Backend بـ Node» المستوى التالت (integration tests على endpoints حقيقية وداتابيز اختبار)، و «تاب React» المستوى التالت (اختبار الـ components).`,
            when: "Follow-ups: «بتعمل mock لإيه ومتعملوش لإيه؟». «coverage كام يبقى كويس؟». «بتعمل TDD؟». «اختبار flaky تعمل فيه إيه؟». «تختبر webhook الدفع إزاي؟».",
            mistakes: R`«مبكتبش tests» من غير أي خطة، أو العكس «coverage 100%» كهدف. و mock لكل حاجة. و e2e لكل حاجة فالـ CI ياخد ساعة. ولو مشاريعك مفيهاش اختبارات قول ده بصراحة، وقول هتبدأ بإيه وليه: ده أحسن من إنك تدّعي.`
          },
          teach: R`## الفكرة في جملة

المثال unit test بـ Vitest لدالة سعر: حالة عادية (خصم ١٠٪) وحالة حدّية (خصم أكبر من السعر). الـ unit test بيختبر الدالة **لوحدها**: مفيش شبكة ولا داتابيز، فبيخلص في ميلي ثواني. شغلناه بـ Vitest 5.0.3 على Node 24 على ويندوز، مرة بالدالة السليمة ومرة بعد ما بوّظناها.

---

## ١. الاستيراد

~~~js
import { describe, it, expect } from "vitest";
import { applyCoupon } from "./pricing.js";
~~~

| الاسم | معناه |
|---|---|
| [[describe(name, fn)]] | مجموعة اختبارات تحت عنوان واحد |
| [[it(name, fn)]] | اختبار واحد. الاسم بيوصف **السلوك**، فبيتقري جملة: «applyCoupon never goes below zero» |
| [[expect(x)]] | القيمة اللي طلعت، وبعدها matcher زي [[.toBe(y)]] |

---

## ٢. الحالتين

~~~js
  it("applies a percentage discount", () => {
    expect(applyCoupon(200, { type: "percent", value: 10 })).toBe(180);
  });
  it("never goes below zero", () => {
    expect(applyCoupon(50, { type: "fixed", value: 80 })).toBe(0);
  });
~~~

- الأولى: الطريق العادي. 200 − 10٪ = 180.
- التانية: **حالة حدّية** (edge case): كوبون ٨٠ على طلب بـ ٥٠. الإجابة الصح 0 مش −30. الحالات الحدّية هي اللي فيها الـ bugs، وهي اللي الإنترفيوير عايز يشوفك بتفكر فيها.
- [[.toBe]] بيقارن بـ [[Object.is]]: نفس القيمة بالظبط.

---

## ٣. الدالة (الـ solCode)

~~~js
export function applyCoupon(total, coupon) {
  const discount = coupon.type === "percent" ? total * coupon.value / 100 : coupon.value;
  return Math.max(0, total - discount);
}
~~~

- [[cond ? a : b]]: لو نسبة احسب [[total * value / 100]]، غير كده الخصم ثابت.
- [[Math.max(0, x)]]: الأكبر من 0 و x، يعني متنزلش تحت الصفر. ده السطر اللي الاختبار التاني بيحميه.

~~~text الناتج: npx vitest run
 Test Files  1 passed (1)
      Tests  2 passed (2)
   Duration  962ms
~~~

[[npx vitest run]]: شغّل مرة واحدة واخرج (من غير [[run]] بيفضل في watch mode). و Vitest بيحوّل ملفات الاختبار بنفسه، فالـ [[import]] اشتغل حتى من غير [["type": "module"]] في [[package.json]] (جربناها بالحالتين).

---

## ٤. بوّظناها: شلنا [[Math.max]]

~~~text الناتج
 ❯ pricing.test.js (2 tests | 1 failed) 8ms
     × never goes below zero 5ms

 FAIL  pricing.test.js > applyCoupon > never goes below zero
AssertionError: expected -30 to be +0 // Object.is equality
- Expected
+ Received
- 0
+ -30
 ❯ pricing.test.js:8:59
      8|     expect(applyCoupon(50, { type: "fixed", value: 80 })).toBe(0);
       |                                                           ^

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
~~~

اقرا الرسالة:

- [[×]] واسم الاختبار: عرفت المشكلة من الاسم قبل ما تقرا أي حاجة.
- [[expected -30 to be +0]]: طلع −30 وكان المفروض 0. ([[+0]] لأن [[Object.is]] بيفرّق بين 0 و −0.)
- [[pricing.test.js:8:59]]: الملف والسطر والعمود، والسهم تحته.
- الاختبار الأول لسه بيعدّي: التبويظ مأثرش على الخصم بالنسبة.

---

## ٥. الأنواع التلاتة

| | unit | integration | e2e |
|---|---|---|---|
| بيختبر | دالة أو وحدة لوحدها | كذا جزء مع بعض (endpoint + داتابيز اختبار) | التطبيق كله في متصفح |
| السرعة | ميلي ثواني | ثواني | دقايق |
| العدد | كتير | أقل | قليل: التسجيل والدفع |
| مثال | [[applyCoupon]] | [[POST /orders]] بيكتب في Postgres في Docker | Playwright بيعمل checkout |
| الأدوات | Vitest، Jest | Vitest + Supertest | Playwright |

---

## الخلاصة

- اختبر الـ business logic اللي لو باظت هتكلّف فلوس، والحالات الحدّية بالذات.
- اسم الاختبار = السلوك، فلما يقع تعرف المشكلة من اسمه.
- mock للحدود الخارجية بس (الدفع، الإيميل)، مش لكودك.
- كل bug اتصلّح = regression test عشان ميرجعش.`,
          lines: [
            "أدوات الاختبار من Vitest.",
            "الدالة اللي بنختبرها.",
            "مجموعة اختبارات للدالة دي.",
            "حالة: خصم نسبة.",
            "200 بخصم 10% لازم تبقى 180.",
            "قفلة الحالة.",
            "حالة حدّية: الخصم أكبر من السعر.",
            "النتيجة لازم تبقى صفر مش بالسالب.",
            "قفلة الحالة.",
            "قفلة المجموعة."
          ],
          sol: R`مع الدالة السليمة: [[Test Files  1 passed (1)]] و [[Tests  2 passed (2)]]. ولما تشيل الـ [[Math.max]]، اختبار الخصم بالنسبة بيعدّي، و [[never goes below zero]] بيقع برسالة [[AssertionError: expected -30 to be +0 // Object.is equality]]، ومعاها Expected 0 و Received -30 وسهم على السطر بالظبط.

لاحظ إن اسم الاختبار لوحده قالك المشكلة قبل ما تقرا الرسالة، وده سبب إن الاسم يوصف السلوك مش الدالة. والغلط الشائع: الاختبارين يعدّوا بعد ما بوّظت الدالة، ودي علامة إن الاختبار مش بيختبر الحالة دي أصلًا، أو إنك بتشغّل [[vitest]] في watch على ملف تاني. (جربته على Vitest 5.)`,
          solCode: R`// pricing.js
export function applyCoupon(total, coupon) {
  const discount = coupon.type === "percent" ? total * coupon.value / 100 : coupon.value;
  return Math.max(0, total - discount);
}
// npx vitest run
// ✓ pricing.test.js (2 tests)
// Test Files  1 passed (1)
//      Tests  2 passed (2)
// وبعد ما تشيل Math.max:
// × never goes below zero
// AssertionError: expected -30 to be +0 // Object.is equality`
        },
        {
          cmd: "readable قبل clever",
          title: "إيه اللي بيخلي الكود «نضيف»؟ واديني مثال عدّلته",
          desc: R`الكود بيتقري أكتر ما بيتكتب بكتير، فالنضافة يعني حد تاني (أو انت بعد ٦ شهور) يفهمه بسرعة ويعدّله من غير خوف. عمليًا: أسماء بتقول النية ([[isNewMember]] مش [[flag2]])، ودوال صغيرة بتعمل حاجة واحدة، و early return بدل if جوه if، ومفيش أرقام سحرية، والـ errors بتتعامل صح مش بتتبلع، وتكرار أقل (DRY) بس من غير abstraction بدري.

وقول KISS و YAGNI: أبسط حل شغال، ومتبنيش حاجة «يمكن نحتاجها». والأدوات بتساعد: prettier للشكل، و eslint للعادات، و TypeScript للأنواع.`,
          example: R`// قبل
function p(u, d) {
  if (u) { if (u.s === 1) { if (Date.now() - u.t < 2592000000) { return d * 0.9; } } }
  return d;
}
// بعد
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const ACTIVE = 1;
const NEW_MEMBER_DISCOUNT = 0.9;
function priceForUser(user, price) {
  if (!user || user.status !== ACTIVE) return price;
  const isNewMember = Date.now() - user.joinedAt < THIRTY_DAYS_MS;
  return isNewMember ? price * NEW_MEMBER_DISCOUNT : price;
}`,
          try: "خد دالة طويلة من مشروع قديم عندك وطبّق عليها: أسماء واضحة، و early return، و constants بدل الأرقام. اعرضها على حد واسأله «بتعمل إيه؟» قبل وبعد.",
          flag: "script",
          deep: {
            why: "الكود اللي هتكتبه في الـ live coding والـ take-home بيتقيّم بعين «هل أحب أراجع PRs الشخص ده؟». والسؤال بيشوف ذوقك في الكود.",
            how: R`الـ comment يشرح «ليه» مش «إيه»: [[// Paymob sends amounts in cents]] مفيد، و [[// increment i]] ضوضاء. ولو محتاج comment يشرح الكود بيعمل إيه، غالبًا الاسم هو اللي محتاج يتغير.

الـ code smells المشهورة: دالة طويلة، و parameters كتير (حوّلها object)، و primitive obsession (string لكل حاجة بدل أنواع واضحة)، و shotgun surgery (تعديل واحد محتاج تلمس ١٠ ملفات)، و feature envy (دالة بتستخدم داتا class تانية أكتر من بتاعتها).

والـ DRY ليه حد: تكرار مرتين أحسن من abstraction غلط، لأن abstraction غلط بتتقل مع كل حالة جديدة بـ if جوه. القاعدة المشهورة: ادمج في التالتة. والـ refactoring الآمن محتاج اختبارات قبله، وخطوات صغيرة، و commit لوحده من غير تغيير سلوك. التفاصيل في تاب «هندسة البرمجيات».`,
            when: "Follow-ups: «إمتى تكتب comment؟». «DRY ممكن يضر إمتى؟». «بتبص على إيه في code review؟». «اديني code smell شفته وصلّحته». «ملف فيه ٢٠٠٠ سطر، تبدأ منين؟».",
            mistakes: R`إن النضيف يعني قصير و clever (one-liner محدش فاهمه). وتقسيم كل سطرين في دالة. و abstraction بعد أول تكرار. و «الكود بتاعي بيوثّق نفسه» كمبرر لأي حاجة.`
          },
          teach: R`## الفكرة في جملة

المثال دالة واحدة مكتوبة مرتين: [[p]] (شغالة بس محدش يفهمها) و [[priceForUser]] (نفس السلوك بالظبط بس بتتقري زي جملة). النضافة هنا مش «أقصر»: هي إن حد تاني يفهم الدالة من أول قراية. وعشان نتأكد إن الـ refactor مغيّرش السلوك، شغلنا النسختين على نفس ٤ حالات بـ Node 24 على ويندوز.

---

## ١. «قبل»: اقراها وحاول تخمّن

~~~js
function p(u, d) {
  if (u) { if (u.s === 1) { if (Date.now() - u.t < 2592000000) { return d * 0.9; } } }
  return d;
}
~~~

| المشكلة | فين |
|---|---|
| أسماء مبتقولش حاجة | [[p]] و [[u]] و [[d]] و [[s]] و [[t]] |
| ifs جوه بعض (arrow code) | تلات مستويات عشان توصل للحالة المهمة |
| أرقام سحرية | [[1]] حالة إيه؟ [[2592000000]] إيه؟ [[0.9]] ليه؟ |

---

## ٢. «بعد»: الأرقام بقت أسماء

~~~js
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const ACTIVE = 1;
const NEW_MEMBER_DISCOUNT = 0.9;
~~~

- [[THIRTY_DAYS_MS]]: الرقم محسوب قدامك: ٣٠ يوم × ٢٤ ساعة × ٦٠ دقيقة × ٦٠ ثانية × ١٠٠٠ مللي. طبعناه: [[2592000000]]، نفس الرقم السحري بالظبط. الـ [[_MS]] في الاسم بيقول الوحدة.
- [[ACTIVE]] و [[NEW_MEMBER_DISCOUNT]]: كل رقم بقى ليه معنى، ولو اتغير بيتغير في مكان واحد.
- الأسماء كلها capital بـ [[_]]: اتفاق شائع للـ constants.

---

## ٣. الدالة نفسها

~~~js
function priceForUser(user, price) {
  if (!user || user.status !== ACTIVE) return price;
  const isNewMember = Date.now() - user.joinedAt < THIRTY_DAYS_MS;
  return isNewMember ? price * NEW_MEMBER_DISCOUNT : price;
}
~~~

- [[priceForUser(user, price)]]: الاسم بيقول الدالة بترجّع إيه.
- **early return**: [[if (!user || user.status !== ACTIVE) return price;]] الحالات اللي «ملهاش خصم» بتخرج من الأول. [[||]] = «أو»: مفيش يوزر أو مش نشط. كده الـ ifs التلاتة المتداخلة بقت سطر واحد مسطّح.
- [[const isNewMember = ...]]: الشرط المعقد بقى متغير اسمه بيشرحه. ده بيغني عن comment.
- [[cond ? a : b]]: النتيجة في سطر.

---

## ٤. اتأكدنا إن السلوك متغيرش

~~~text الناتج (سعر 200)
no user     before: 200  after: 200
inactive    before: 200  after: 200
new active  before: 180  after: 180
old active  before: 200  after: 200
~~~

(«new active» اشترك من ٥ أيام، و «old active» من ٤٠ يوم.) نفس النتايج في الأربع حالات. ده أهم قاعدة في الـ refactoring: **الشكل يتغير والسلوك لأ**، ويتثبت باختبارات قبل وبعد، وفي commit لوحده.

---

## الخلاصة

| قبل | بعد | المبدأ |
|---|---|---|
| [[p(u, d)]] | [[priceForUser(user, price)]] | أسماء بتقول النية |
| ٣ ifs متداخلة | early return | قلل التداخل |
| [[2592000000]] و [[0.9]] | [[THIRTY_DAYS_MS]] و [[NEW_MEMBER_DISCOUNT]] | مفيش أرقام سحرية |
| شرط طويل | [[isNewMember]] | متغير اسمه بيشرح |

> في الانترفيو احكيها: «كانت دالة X، عملت فيها Y، واتأكدت بـ tests إن السلوك متغيرش». والـ comment يشرح «ليه» مش «إيه».`,
          lines: [
            "اسم الدالة والـ parameters مبيقولوش حاجة.",
            "تلات ifs جوه بعض، و 1 و 2592000000 و 0.9 أرقام سحرية.",
            "الحالة العادية.",
            "قفلة.",
            "الرقم بقى اسم، ومحسوب قدامك: ٣٠ يوم بالمللي ثانية.",
            "حالة اليوزر النشط باسم.",
            "نسبة الخصم باسم.",
            "الدالة واسمها بيقول بتعمل إيه.",
            "early return: لو مفيش يوزر أو مش نشط، السعر زي ما هو.",
            "الشرط المعقد بقى متغير اسمه بيشرحه.",
            "النتيجة في سطر واضح.",
            "قفلة."
          ],
          sol: R`الـ refactor نجح لو الشخص فهم الدالة «بعد» من أول قراية وقال جملة زي «بتدي خصم ١٠٪ لليوزر الجديد النشط»، في حين إنه في «قبل» سأل أسئلة أو خمّن. وده الاختبار الحقيقي: مش إن الكود أقصر، إن حد تاني يفهمه من غير ما تشرحله.

الـ checklist اللي تطبقها: كل متغير ودالة بقى اسمه بيقول هو إيه ([[u]] ← [[user]])، والـ ifs المتداخلة بقت early returns، وكل رقم سحري بقى constant باسم، ومفيش تعليق بيشرح «إيه» (الاسم بيقوله)، والتعليقات الباقية بتشرح «ليه». والأهم إن السلوك متغيرش: لو الدالة مكانش ليها tests، اكتب اختبارين قبل ما تبدأ وشغّلهم بعد.

الغلط الشائع: إنك تغيّر السلوك وانت بتنضّف (تصلح bug في نفس الـ commit)، أو تبالغ وتقسّم دالة ٨ سطور لخمس دوال. وفي الانترفيو احكيها كده: «كانت دالة X، عملت فيها Y، والنتيجة Z» (مثلًا: الـ PR اللي بعده في نفس الملف خد نص الوقت).`
        },
        {
          cmd: "clarify → examples → brute → optimize → test",
          title: "في مسألة live coding: بتمشي إزاي من أول ما تسمع السؤال لحد ما تسلّم؟",
          desc: R`ست خطوات وأنا بتكلم بصوت عالي طول الوقت: ١) أوضّح المسألة: الـ input شكله إيه وحجمه قد إيه، وفيه سالب أو تكرار أو فاضي؟ ٢) أمثلة صغيرة بإيدي منها edge cases. ٣) الحل البسيط (brute force) وأقول الـ complexity بتاعه. ٤) أحسّن: فين الشغل المتكرر؟ hash map؟ sort؟ two pointers؟ ٥) أكتب الكود نضيف بأسماء واضحة. ٦) أختبره بالأمثلة وأمشي عليه بإيدي، وأقول الـ time والـ space.

الإنترفيوير بيقيّم طريقة التفكير والتواصل قد الحل نفسه أو أكتر. ولو اتزنقت أقول بفكر في إيه، والـ hint مش فشل. المسائل والأنماط في تاب «DSA».`,
          example: R`// المسألة: رجّع أول عنصر بيتكرر في array
// 1. Clarify: "Can it be empty? Numbers only? What if nothing repeats?"
// 2. Examples: [3,1,3,2] -> 3 | [1,2] -> null | [] -> null
// 3. Brute force: "For each element, scan the rest: O(n²) time, O(1) space."
// 4. Optimize: "Trade memory for time with a Set: one pass."
// 5. Code:
function firstRepeat(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return null;
}
// 6. Test by hand: [3,1,3,2] → 3, [] → null. "Time O(n), space O(n)."`,
          try: "اختار مسألة من تاب «DSA»، وشغّل تايمر ٣٠ دقيقة، وسجّل صوتك وانت بتحلها بالست خطوات. اسمع التسجيل: فيه فترات سكوت طويلة؟ قلت الـ complexity؟ اختبرت edge case؟",
          flag: "script",
          deep: {
            why: "ناس كتير بتعرف تحل وبتفشل عشان سكتت، أو بدأت تكتب على طول وحلّت مسألة غير المطلوبة، أو مختبرتش. الطريقة دي بتحوّل المسألة لحوار انت ماسكه.",
            how: R`الإنترفيوير عادة بيقيّم أربع حاجات: حل المشكلة (وصلت لحل وحسّنته؟)، والتواصل (فهّمتني انت بتعمل إيه؟)، وجودة الكود (أسماء، وتنظيم، و edge cases)، والتحقق (اختبرت ولقيت أخطاءك بنفسك؟).

الوقت في مقابلة ٤٥ دقيقة تقريبًا: ٥ للتوضيح والأمثلة، و ٥ إلى ١٠ للفكرة والاتفاق عليها قبل الكود، و ٢٠ للكود، و ٥ إلى ١٠ للاختبار والأسئلة الجاية.

وإشارات في نص السؤال بتقترح النمط: «مترتب» ← binary search أو two pointers. «subarray أو substring متصل» ← sliding window. «موجود قبل كده / عد / أزواج» ← hash map. «أكبر k» ← heap. «كل الاحتمالات» ← backtracking. «أقصر طريق / مستويات» ← BFS. ولاحظ إن التوضيح نفسه بيطلّع أسئلة مهمة: «أول عنصر بيتكرر» معناها أول واحد ظهر تاني، ولا أول واحد في الـ array ليه تكرار؟ في [[[2,1,1,2]]] الإجابتين مختلفتين (1 ضد 2).`,
            when: "Follow-ups بعد الحل: «ولو الـ array مش هتدخل في الرام؟». «ولو ممنوع ذاكرة إضافية؟». «ولو الداتا جاية stream؟». «اكتب tests». «إيه أسوأ input للحل ده؟».",
            mistakes: R`تبدأ تكتب على طول من غير توضيح. وتسكت ١٠ دقايق. وتتمسك بالحل الـ optimal ومتكتبش حاجة خالص (brute force شغال أحسن من ولا حاجة). ومتختبرش. وتتجاهل الـ hint. وتقول complexity غلط بثقة.`
          },
          teach: R`## الفكرة في جملة

المثال مسألة صغيرة («أول عنصر بيتكرر») محلولة بالست خطوات، وكل خطوة جملة بتقولها بصوت عالي قبل ما تكتب. الكود في الآخر ٧ سطور، بس الخطوات اللي قبله هي اللي بتتقيّم. شغلنا الحل والـ brute force بـ Node 24 على ويندوز.

---

## ١. Clarify: اسأل قبل ما تكتب

~~~text
"Can it be empty? Numbers only? What if nothing repeats?"
~~~

كل سؤال بيغيّر الكود: فاضي؟ (لازم ميقعش). مفيش تكرار؟ (نرجّع [[null]] ولا [[-1]]؟). وفيه سؤال أهم مش في المثال: «أول تكرار» معناها إيه؟ جربنا على [[[2,1,1,2]]]:

~~~text الناتج
firstRepeat (أول عنصر ظهر للمرة التانية): 1
brute (أول عنصر في الـ array ليه نسخة بعده): 2
~~~

إجابتين مختلفتين لنفس الجملة. لو مسألتش، ممكن تحل مسألة غير المطلوبة.

---

## ٢. Examples: بإيدك، ومنهم edge cases

~~~text
[3,1,3,2] -> 3 | [1,2] -> null | [] -> null
~~~

حالة عادية، وحالة من غير تكرار، والـ array الفاضية. دول اللي هتختبر بيهم في الآخر.

---

## ٣. Brute force: قوله بتمنه

~~~text
"For each element, scan the rest: O(n²) time, O(1) space."
~~~

مش لازم تكتبه. المهم إنك أثبتّ إن عندك حل، وعرفت تمنه، فبقى عندك حاجة تحسّنها.

---

## ٤. Optimize: فين الشغل المتكرر؟

~~~text
"Trade memory for time with a Set: one pass."
~~~

الـ brute بيدوّر في الباقي لكل عنصر من الأول. السؤال «شفت الرقم ده قبل كده؟» إجابته O(1) لو اللي شفته في Set. فبتدفع O(n) ذاكرة وتنزل لـ O(n) وقت.

---

## ٥. الكود

~~~js
function firstRepeat(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return null;
}
~~~

- [[seen]]: اللي عدّينا عليه. الاسم بيقول هو إيه.
- [[for (const n of nums)]]: لفة واحدة.
- [[seen.has(n)]]: شفناه؟ يبقى ده أول تكرار، [[return]] على طول.
- [[seen.add(n)]]: سجّله.
- [[return null]]: خلصنا من غير تكرار. وده بيغطي الـ array الفاضية كمان، لأن اللوب مش هيلف أصلًا.

---

## ٦. Test: امشي عليه بإيدك

ضفنا طباعة جوه اللوب على [[[3,1,3,2]]]:

~~~text الناتج
n = 3 seen = [ 3 ]
n = 1 seen = [ 3, 1 ]
3
~~~

في اللفة التالتة [[n = 3]] و [[seen.has(3)]] صح، فرجع 3 من غير ما يكمل. وباقي الأمثلة: [[[1,2]]] ← [[null]]، و [[[]]] ← [[null]]. وبعدها الجملة: «Time O(n), space O(n)».

---

## الخلاصة

| الخطوة | بتقول إيه | الوقت في مقابلة ٤٥ دقيقة |
|---|---|---|
| ١. clarify | أسئلة عن الـ input والحالات | ٥ دقايق مع الأمثلة |
| ٢. examples | ٢ أو ٣ منهم edge case | |
| ٣. brute force | الحل البسيط وتمنه | ٥ لـ ١٠ للفكرة |
| ٤. optimize | فين التكرار؟ وأنهي structure؟ | |
| ٥. code | أسماء واضحة | ٢٠ |
| ٦. test | تتبّع بالإيد + complexity | ٥ لـ ١٠ |

> اتكلم طول الوقت. brute force شغال أحسن من optimal مكتوبش، والـ hint مساعدة مش فشل.`,
          lines: [
            "الدالة باسم واضح.",
            "Set للي شفناه قبل كده.",
            "لف مرة واحدة.",
            "لو شفناه قبل كده: هو أول تكرار.",
            "غير كده سجّله.",
            "قفلة اللوب.",
            "مفيش تكرار.",
            "قفلة."
          ],
          sol: R`التسجيل الكويس فيه الست خطوات بالترتيب ومسموعين: أسئلة توضيح في أول دقيقة أو اتنين، ومثالين على الأقل منهم edge case (فاضي أو عنصر واحد)، وجملة بالـ brute force وتمنه قبل ما تكتب، والـ complexity مقولة بصوت عالي في الآخر، وتتبّع بالإيد لمثال قبل «done». والمفروض مفيش سكوت أطول من ٢٠ أو ٣٠ ثانية.

النتايج الغلط الشائعة: إنك بدأت تكتب كود في أول دقيقة من غير ولا سؤال، أو سكتّ ٣ دقايق وانت بتفكر (قول اللي في دماغك حتى لو ناقص: «I'm thinking a hash map could help here because...»)، أو خلصت وقلت «done» من غير ما تجرب حاجة. ولو التسجيل عدّى ٣٠ دقيقة، شوف ضاع الوقت فين: غالبًا في الـ optimize قبل ما يبقى عندك حل شغال. الـ brute force الشغال أحسن من optimal ناقص.`
        }
      ]
    }
]);
