// تكملة تاب sweng: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sweng/01.js (شرح حقول الدرس في أوله)
MORE("sweng", [
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
          teach: R`## الفكرة

بدل class لكل تركيبة ([[RetryingEmailNotifier]] و [[LoggedRetryingSmsNotifier]] ...)، كل قناة دالة، والـ retry دالة بتلف أي قناة، و [[Notifier]] بيستلم القنوات اللي عايزها. هنفك القطع واحدة واحدة ونشوف الـ retry شغال بعينينا. اتشغّل بـ [[npx tsx]] على Node 24.19 (ويندوز).

---

## ١. نوع واحد لكل القنوات

~~~text main.ts
type Send = (to: string, text: string) => Promise<void>;
~~~

[[Send]] اسم لشكل دالة: بتاخد مين ([[to]]) والرسالة ([[text]])، وبترجّع [[Promise<void>]] يعني «هخلص بعدين ومش هرجّع قيمة». أي قناة (إيميل، SMS، push) لازم تبقى بالشكل ده. ده اللي بيخلي القطع تتركّب في بعض.

---

## ٢. القنوات

~~~text main.ts
const sendEmail: Send = async (to, text) => console.log("email →", to, text);
let smsCalls = 0;
const sendSms: Send = async (to, text) => {
  if (++smsCalls === 1) throw new Error("SMS gateway timeout");
  console.log("sms →", to, text);
};
~~~

- [[const sendEmail: Send = async (...) => ...]]: دالة [[async]] (بترجّع Promise لوحدها) نوعها [[Send]]. ولأن النوع مكتوب، TypeScript عارف إن [[to]] و [[text]] نصوص من غير ما نكتبها تاني.
- [[++smsCalls === 1]]: [[++]] قبل المتغير بتزوّده واحد **الأول** وبعدين تقارن. فأول نداء [[smsCalls]] بيبقى 1 والشرط يتحقق فترمي خطأ. ده بيمثّل gateway بيعمل timeout ساعات. من تاني نداء بتنجح.

---

## ٣. [[withRetry]]: دالة بتلف دالة

~~~text main.ts
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
~~~

- بتاخد [[Send]] وبترجّع [[Send]]: نفس النوع داخل وخارج. فاللي بيستخدم القناة الملفوفة مش حاسس بأي فرق. ده اسمه **decorator** (أو higher-order function: دالة بتاخد أو بترجّع دالة).
- [[times = 3]]: عدد المحاولات، وقيمته الافتراضية ٣.
- [[for (let attempt = 1; ; attempt++)]]: loop **من غير شرط** (الخانة اللي في النص فاضية)، يعني بيلف للأبد. والخروج منه بطريقتين بس:
  - [[return await send(...)]]: المحاولة نجحت، اخرج.
  - [[throw err]]: دي كانت آخر محاولة وفشلت، ارمي الخطأ الأصلي.
- لو فشلت ولسه مش آخر محاولة، الـ catch مبيعملش حاجة والـ loop يكمّل للمحاولة اللي بعدها. (ده مش بلع: الخطأ بيترمي في الآخر لو كل المحاولات فشلت.)

جرّبناها على قناة بتفشل دايمًا:

~~~text الناتج
rejected: down
~~~

٣ محاولات فشلوا، فالخطأ الأصلي طلع زي ما هو.

---

## ٤. [[Notifier]]: بيستلم مش بيورث

~~~text main.ts
class Notifier {
  constructor(private readonly channels: Send[]) {}
  notify(to: string, text: string) {
    return Promise.all(this.channels.map((send) => send(to, text)));
  }
}
~~~

- [[constructor(private readonly channels: Send[])]]: اختصار TypeScript: كلمة [[private]] قبل الـ parameter بتعمل خاصية في الـ object بنفس الاسم وتحط فيها القيمة. و [[readonly]] تمنع تغييرها بعد كده. و [[{}]] الفاضية جسم الـ constructor، مفيش حاجة تانية.
- [[this.channels.map((send) => send(to, text))]]: نادي كل قناة، فيطلع array من Promises.
- [[Promise.all(...)]]: استنى الكل يخلص.

---

## ٥. التركيب

~~~text main.ts
const notifier = new Notifier([sendEmail, withRetry(sendSms)]);
notifier.notify("ali", "Order #7 shipped").then(() => console.log("sms calls:", smsCalls));
~~~

الإيميل عادي، والـ SMS ملفوف بـ retry. ولا class جديدة.

~~~text الناتج: npx tsx main.ts
email → ali Order #7 shipped
sms → ali Order #7 shipped
sms calls: 2
~~~

[[sms calls: 2]]: أول محاولة رمت timeout، و [[withRetry]] جرّب تاني فنجح. والإيميل والـ SMS متأثروش ببعض.

---

## ٦. حل التمرين

### [[withLog]] بنفس شكل [[withRetry]]

بتاخد [[Send]] واسم القناة وترجّع [[Send]]. بتسجّل [[Date.now()]] قبل النداء، ولو نجح تطبع الوقت، ولو فشل تطبع الرسالة **وترمي الخطأ تاني** ([[throw err]]) عشان متبلعهوش.

ولأن الاتنين نفس النوع، الترتيب بيغيّر المعنى. جرّبناهم على قناة بتفشل مرتين وتنجح التالتة:

~~~text الناتج
-- withLog(withRetry(flaky))
sms ok
-- withRetry(withLog(flaky))
sms failed: timeout #1
sms failed: timeout #2
sms ok
~~~

| التركيب | بيسجّل إيه |
|---|---|
| [[withLog(withRetry(send))]] | مرة واحدة: النتيجة النهائية بعد كل المحاولات |
| [[withRetry(withLog(send))]] | كل محاولة لوحدها |

### [[Promise.allSettled]] بدل [[Promise.all]]

[[Promise.all]] بترفض أول ما أي واحدة ترفض:

~~~text الناتج: Promise.all([push, قناة واقعة])
push → ali hi
Promise.all rejected: down
~~~

الـ push وصل فعلًا، بس اللي نادى شاف «rejected» وبس. [[Promise.allSettled]] بتستنى الكل وترجّع حالة كل واحدة:

~~~text الناتج: npx tsx sol.ts
push → ali Order #7 shipped
push ok in 1ms
sms failed: SMS gateway timeout
[ 'fulfilled', 'rejected' ]
~~~

[[fulfilled]] يعني نجحت، و [[rejected]] يعني فشلت. والرقم [[1ms]] ممكن يطلع [[0ms]] عندك، حسب سرعة الجهاز.

---

## الخلاصة

- الوراثة: «ده نوع من ده»، والسلوك متربط بالنوع وقت الكتابة. الـ composition: «ده معاه ده»، وبتختار وقت الإنشاء.
- قطع بنفس النوع (دالة بتاخد [[Send]] وترجّع [[Send]]) بتتلف جوه بعض بأي عدد وأي ترتيب.
- الوراثة صح لما «نوع من» حقيقية ومستقرة، زي [[NotFoundError extends AppError]].
- [[Promise.all]] بتقع مع أول فشل، و [[Promise.allSettled]] بترجّع حالة الكل.`,
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

ولاحظ [[await expect(...).rejects.toThrow(...)]]: من غير [[await]] الاختبار بيخلص قبل ما الفحص يخلص. في Jest ده ممكن يخلي الاختبار يعدّي حتى لو مفيش خطأ، و Vitest الجديد (جرّبناه على 5.0) بيمسكها ويفشّل الاختبار برسالة [[was not awaited]]. في الحالتين اكتب [[await]].`,
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
          teach: R`## الفكرة

[[SignupService]] فيها قاعدة بيزنس واحدة: «سجّل اليوزر لو إيميله مش موجود، وابعتله ترحيب». مبتعرفش الداتا بتتخزن فين ولا الإيميل بيتبعت إزاي: بتستلم الاتنين في الـ constructor. هنفك ٣ أجزاء (الـ interfaces، والـ service، والتوصيل)، وبعدين نشغّل اختبارات الحل من غير أي mock. اتشغّل بـ [[npx tsx]] على Node 24.19 و Vitest 5.0 على ويندوز.

---

## ١. الـ interfaces: اللي الـ service محتاجاه بس

~~~text signup.ts
type User = { id: string; email: string };
interface UserRepo {
  findByEmail(email: string): Promise<User | null>;
  create(email: string): Promise<User>;
}
interface Mailer {
  send(to: string, subject: string): Promise<void>;
}
~~~

- [[interface]]: وصف لشكل object: «أي حاجة فيها الدوال دي بالأشكال دي». مفيهوش كود، وبيتمسح وقت التشغيل.
- [[UserRepo]] (repo اختصار repository: المكان اللي بيخزّن ويجيب الداتا): دالتين بس، [[findByEmail]] بترجّع user أو [[null]]، و [[create]] بتعمل user. مش كل اللي Prisma بيعرف يعمله: كل ما الـ interface أصغر، أي نسخة بديلة أسهل.
- [[Mailer]]: دالة واحدة.

---

## ٢. الـ service

~~~text signup.ts
class SignupService {
  constructor(private readonly users: UserRepo, private readonly mailer: Mailer) {}
~~~

ده سطر الـ dependency injection كله. الـ service **بتستلم** [[users]] و [[mailer]] بدل ما تعمل [[new PrismaClient()]] أو [[import]] لمكتبة إيميل جواها. و [[private readonly]] بتعمل الخاصيتين وتحط فيهم القيم ([[this.users]] و [[this.mailer]]).

~~~text signup.ts
  async signup(email: string): Promise<User> {
    if (await this.users.findByEmail(email)) throw new Error("Email already registered");
    const user = await this.users.create(email);
    await this.mailer.send(user.email, "Welcome!");
    return user;
  }
}
~~~

1. [[await this.users.findByEmail(email)]]: لو رجّع user (مش [[null]])، الشرط بيبقى true، فارفض قبل أي حاجة.
2. اعمل الـ user بالـ repo اللي استلمناه، أيًا كان هو.
3. ابعت الترحيب بالـ mailer اللي استلمناه.

مفيش ولا كلمة Prisma أو SMTP هنا.

---

## ٣. نسخ بديلة (fakes) والتوصيل

~~~text signup.ts
class InMemoryUserRepo implements UserRepo {
  private rows: User[] = [];
  async findByEmail(email: string) { return this.rows.find((u) => u.email === email) ?? null; }
  async create(email: string) { const u = { id: String(this.rows.length + 1), email }; this.rows.push(u); return u; }
}
~~~

- [[implements UserRepo]]: TypeScript بيتأكد إن الـ class فيها كل دوال [[UserRepo]] بنفس الأشكال.
- [[rows]]: array بدل جدول الداتابيز.
- [[find(...) ?? null]]: [[find]] بترجّع [[undefined]] لو ملقتش، والـ interface عايز [[null]]، فـ [[??]] بتحوّلها.

~~~text signup.ts
const sent: string[] = [];
const fakeMailer: Mailer = { send: async (to) => { sent.push(to); } };
const service = new SignupService(new InMemoryUserRepo(), fakeMailer);
~~~

الـ mailer المزيف object عادي فيه [[send]] بتسجّل الإيميل في array بدل ما تبعته. والسطر التالت هو **التوصيل**: نفس الـ service بالظبط، بس بـ fakes. في الإنتاج نفس السطر بيبقى [[new SignupService(new PrismaUserRepo(prisma), new ResendMailer(key))]].

~~~text signup.ts
service.signup("you@example.com")
  .then(() => service.signup("you@example.com"))
  .catch((e) => console.log(e.message, "| mails sent:", sent));
~~~

سجّلنا نفس الإيميل مرتين ورا بعض:

~~~text الناتج: npx tsx main.ts
Email already registered | mails sent: [ 'you@example.com' ]
~~~

التاني اترفض، و [[sent]] فيها إيميل واحد بس: التسجيل المرفوض مابعتش حاجة.

---

## ٤. حل التمرين: اختبارات من غير [[vi.mock]]

~~~text signup.test.ts
beforeEach(() => {
  repo = new InMemoryUserRepo();
  sent = [];
  const mailer: Mailer = { send: async (to) => { sent.push(to); } };
  service = new SignupService(repo, mailer);
});
~~~

[[beforeEach]] بتشتغل قبل **كل** اختبار، فكل اختبار بيبدأ بـ repo فاضي و [[sent]] فاضية، ومفيش اختبار بيأثر على التاني.

~~~text signup.test.ts
await service.signup("you@example.com");
await expect(service.signup("you@example.com")).rejects.toThrow("Email already registered");
expect(repo.rows).toHaveLength(1);
expect(sent).toHaveLength(1);
~~~

- [[expect(promise).rejects.toThrow(...)]]: الـ promise لازم ترفض بالخطأ ده. و [[await]] قبلها ضروري، عشان الاختبار يستنى الفحص.
- [[toHaveLength(1)]]: الـ array فيها عنصر واحد بالظبط. يعني مفيش user تاني اتعمل ومفيش إيميل تاني اتبعت.

~~~text الناتج: npx vitest run --reporter=verbose
 ✓ di/signup.test.ts > SignupService > creates the user and sends one welcome email 2ms
 ✓ di/signup.test.ts > SignupService > rejects a duplicate email and sends nothing new 2ms
      Tests  2 passed (2)
~~~

وجرّبنا نشيل [[await]] ونغيّر الرسالة المتوقعة لحاجة غلط: Vitest 5 فشّل الاختبار وقال [[Promise returned by $__btexpect(actual).rejects.toThrow(expected)$__bt was not awaited]]. أدوات تانية (زي Jest) ممكن تعدّيه في صمت، فاكتب [[await]] دايمًا.

---

## الخلاصة

| الجزء | فين | بيعمل إيه |
|---|---|---|
| interface | جنب الـ service | بيوصف اللي الـ service محتاجاه بس |
| الاستلام | الـ constructor | الـ service تاخد dependencies ومتعملهاش |
| التوصيل (composition root) | مكان واحد في التطبيق | يعمل الحاجات الحقيقية ويوصّلها |

- DI مش framework: parameter في الـ constructor.
- الفايدة الأولى الاختبار: fakes بسيطة تقدر تبص جواها بدل [[vi.mock]].
- احقن الحاجات اللي ليها side effects (داتابيز، إيميل، دفع، وقت)، مش كل import.`,
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

٢. اكتب اختبار وحط فيه قيمة متوقعة غلط عمدًا (مثلًا 0)، وشغّله: vitest هيقولك [[expected 230 to be +0]]. انقل الـ 230 للاختبار. انت مش بتحكم إيه الصح، انت بتسجّل. ولو المخرج كبير (HTML أو JSON)، [[toMatchSnapshot()]] بيسجّله كله مرة واحدة.

٣. غطّي كل فرع: كل [[if]] محتاجة حالة بتدخلها وحالة مبتدخلهاش، والحدود (٥٠٠ بالظبط، و ٢٠٠ بالظبط). [[npx vitest --coverage]] بيوريك السطور اللي محدش عدّى عليها (تاب «فحص الكود»).

٤. refactor بخطوات صغيرة، كل واحدة commit. ومع TypeScript، أول ما تحط type أو تغيّر signature، [[tsc]] بيوريك كل مكان بينادي الدالة، فمحتاجش تدوّر بنفسك.

٥. PR لوحده بعنوان [[refactor:]]، ووصفه بيقول «مفيش تغيير في السلوك، والاختبارات اتكتبت الأول». الـ reviewer يقدر يراجعه في دقايق لأنه عارف إن السلوك ثابت، ولو فيه feature في نفس الـ PR، مستحيل يعرف أنهي سطر غيّر السلوك وأنهي نضّف.`,
            when: "قبل ما تضيف feature في ملف قديم مفيهوش اختبارات، وقبل ما تصلّح bug في كود مش فاهمه، وقبل أي نقل كبير (JS لـ TS، أو framework جديد).",
            mistakes: R`تصلّح «الغلطات» وانت بتعمل refactor: كده الـ PR بقى تغيير سلوك متخبّي، ولو حد كان معتمد على السلوك القديم هيتكسر ومحدش هيعرف ليه. وتكتب الاختبار بعد الـ refactor، فبيسجّل السلوك الجديد مش القديم. و commit واحد اسمه «cleanup» فيه ٤٠ ملف. وتختبر الدوال الصغيرة الجديدة بس وتمسح الـ characterization tests: خليهم، دول اللي بيثبتوا إن السلوك من برا ماتغيرش. وفي الانترفيو لو اتسألت «هتتعامل إزاي مع كود legacy؟»: اختبارات بتسجّل السلوك الحالي، وبعدين خطوات صغيرة، والـ refactor منفصل عن الـ features.`
          },
          teach: R`## الفكرة

المثال فيه حاجتين: دالة [[calc]] قديمة محدش عارف تفاصيلها، و ٧ اختبارات بتسجّل اللي بتعمله النهارده بالظبط (characterization tests). هنفك الدالة القديمة سطر سطر ونحسب كل حالة في الجدول بإيدنا، وبعدين نعمل الـ refactor بتاع الحل بـ ٤ commits في repo تجريبي والاختبارات خضرا بعد كل واحد. اتشغّل بـ Vitest 5.0 و Git على ويندوز (Node 24.19).

---

## ١. الدالة القديمة

~~~text checkout.test.ts
function calc(o: any) {
  var t = 0;
  for (var i = 0; i < o.items.length; i++) t = t + o.items[i].p * o.items[i].q;
  if (o.c == "SAVE10") t = t - t * 0.1;
  if (o.c == "FLAT50" && t > 200) t = t - 50;
  if (t < 500) t = t + 30;
  return Math.round(t * 100) / 100;
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[o: any]] | [[any]] بيقفل فحص TypeScript، فـ [[o]] ممكن يبقى أي حاجة |
| [[var t = 0]] | [[t]] الإجمالي. [[var]] الطريقة القديمة قبل [[let]] و [[const]] |
| الـ [[for]] | لكل صنف: السعر ([[p]]) × الكمية ([[q]])، ويتجمع |
| [[o.c == "SAVE10"]] | [[c]] هو الكوبون. [[==]] مقارنة قديمة بتحوّل الأنواع. خصم ١٠٪ |
| [[o.c == "FLAT50" && t > 200]] | خصم ٥٠ لو الإجمالي **أكبر** من ٢٠٠ |
| [[if (t < 500) t = t + 30]] | تحت ٥٠٠ بعد الخصم؟ شحن ٣٠ |
| [[Math.round(t * 100) / 100]] | تقريب لرقمين عشريين: ضرب في ١٠٠، تقريب، قسمة على ١٠٠ |

---

## ٢. الاختبارات: جدول بـ [[it.each]]

~~~text checkout.test.ts
describe("calc: السلوك الحالي", () => {
  it.each([
    [{ items: [{ p: 100, q: 2 }] }, 230],
    ...
  ])("calc(%j) = %d", (order, expected) => {
    expect(calc(order)).toBe(expected);
  });
});
~~~

- [[it.each([...])]]: بياخد array كل صف فيها [[[طلب, النتيجة]]]، ويعمل اختبار لكل صف بنفس الكود.
- [[("calc(%j) = %d", ...)]]: اسم كل اختبار. [[%j]] بيتبدل بالطلب مكتوب JSON، و [[%d]] بالرقم.
- [[(order, expected) => ...]]: الدالة بتاخد خانات الصف بالترتيب.

إزاي جت الأرقام دي؟ مش من حد قرر «الصح». حطينا رقم غلط عمدًا وشغّلنا:

~~~text الناتج: npx vitest run (بـ 0 مكان 230)
× calc({"items":[{"p":100,"q":2}]}) = 0
AssertionError: expected 230 to be +0 // Object.is equality
~~~

Vitest قال القيمة الحقيقية ([[230]])، فنقلناها للجدول. ده معنى characterization: بتسجّل، مش بتحكم.

---

## ٣. نحسب الجدول بإيدنا

| الطلب | الحسبة | النتيجة |
|---|---|---|
| ١٠٠ × ٢ | ٢٠٠ تحت ٥٠٠، + شحن | [[230]] |
| ٦٠٠ | من غير شحن | [[600]] |
| ٥٢٠ بـ SAVE10 | ٥٢٠ - ٥٢ = ٤٦٨، **نزل تحت ٥٠٠** فـ + ٣٠ | [[498]] |
| ٢٥٠ بـ FLAT50 | ٢٥٠ - ٥٠ = ٢٠٠، + ٣٠ | [[230]] |
| ١٥٠ بـ FLAT50 | ١٥٠ مش أكبر من ٢٠٠، فمفيش خصم، + ٣٠ | [[180]] |
| ١٠٠ بـ [[save10]] | حروف صغيرة: [[==]] حساسة لحالة الحروف، فمفيش خصم | [[130]] |
| ٣٣.٣٣ × ٣ | ٩٩.٩٩ + ٣٠ | [[129.99]] |

الصف التالت والسادس «غريبين»: ممكن يكونوا bugs وممكن قاعدة بيزنس. الاختبار بيسجّلهم زي ما هم، والـ refactor ممنوع يغيّرهم.

~~~text الناتج: npx vitest run --reporter=verbose (من غير اسم الملف والوقت)
 ✓ calc: السلوك الحالي > calc({"items":[{"p":100,"q":2}]}) = 230
 ✓ calc: السلوك الحالي > calc({"items":[{"p":600,"q":1}]}) = 600
 ✓ calc: السلوك الحالي > calc({"items":[{"p":520,"q":1}],"c":"SAVE10"}) = 498
 ✓ calc: السلوك الحالي > calc({"items":[{"p":250,"q":1}],"c":"FLAT50"}) = 230
 ✓ calc: السلوك الحالي > calc({"items":[{"p":150,"q":1}],"c":"FLAT50"}) = 180
 ✓ calc: السلوك الحالي > calc({"items":[{"p":100,"q":1}],"c":"save10"}) = 130
 ✓ calc: السلوك الحالي > calc({"items":[{"p":33.33,"q":3}]}) = 129.99
      Tests  7 passed (7)
~~~

---

## ٤. حل التمرين: الـ refactor بخطوات

عملنا repo تجريبي ونقلنا [[calc]] لـ [[checkout.ts]] بـ [[export]]، والاختبار بقى أوله [[import { calc } from "./checkout"]]. وبعد كل خطوة: [[npx vitest run]] لازم يقول [[7 passed]]، وبعدين commit.

| الخطوة | اللي اتغير | الاختبارات |
|---|---|---|
| ١ | الاختبارات نفسها (قبل أي تعديل) | 7 passed |
| ٢ | [[Order]] و [[LineItem]] بدل [[any]]، و [[let]] بدل [[var]]، و [[===]] بدل [[==]] | 7 passed |
| ٣ | [[FREE_SHIPPING_FROM]] و [[SHIPPING_FEE]] وأسماء بدل [[t]] و [[o]] | 7 passed |
| ٤ | extract لـ [[subtotal]] و [[applyCoupon]] و [[withShipping]] و [[roundMoney]] | 7 passed |

~~~bash
git log --oneline
~~~

~~~text الناتج
5f71aec refactor(checkout): extract subtotal, applyCoupon, withShipping
95edf6b refactor(checkout): name shipping constants
a2fc8e9 refactor(checkout): add Order and LineItem types
bc354fd test(checkout): characterization tests for calc
~~~

الأرقام اللي على الشمال (hash) هتطلع مختلفة عندك. والأحدث فوق.

### الشكل النهائي

~~~text checkout.ts
export function calc(order: Order): number {
  return roundMoney(withShipping(applyCoupon(subtotal(order.items), order.c)));
}
~~~

بيتقري من جوه لبرة بنفس ترتيب الخطوات: اجمع الأصناف، طبّق الكوبون، زوّد الشحن، قرّب. وكل دالة صغيرة فيها سطر أو اتنين من الكود القديم:

- [[applyCoupon(amount, code?)]]: الـ [[?]] معناها الكوبون اختياري. وكل حالة [[return]] بدري (guard clauses).
- [[withShipping]] و [[roundMoney]]: arrow functions سطر واحد، والـ ternary [[شرط ? قيمة : قيمة]] بدل [[if]].

### ليه [[amount - amount * 0.1]] مش [[amount * 0.9]]؟

رياضيًا نفس الحاجة، بس في الـ floating point لأ:

~~~text الناتج: t - t * 0.1 مقابل t * 0.9
0.05 0.045 0.045000000000000005
0.07 0.063 0.06300000000000001
~~~

الـ refactor الآمن بيحافظ على نفس العمليات بالظبط. وأسماء الخانات ([[p]] و [[q]] و [[c]]) فضلت زي ما هي، لأنها شكل الداتا اللي كود تاني بيبعته، وتغييرها خطوة لوحدها.

---

## الخلاصة

- refactoring = تغيير الشكل من غير تغيير السلوك. والدليل اختبارات اتكتبت **قبل** أي تعديل.
- characterization test بيسجّل السلوك الحالي، حتى الغريب منه: حط رقم غلط، وانقل الرقم اللي Vitest قاله.
- خطوات صغيرة، والاختبارات خضرا، و commit بعد كل خطوة. لو اختبار احمرّ، ارجع الخطوة دي بس.
- متصلّحش «الغلطات» في نفس الـ refactor: سجّلها في ticket وصلّحها في PR لوحده.`,
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
          teach: R`## الفكرة

المثال بيحكي نفس الكود في ٣ مراحل: الـ strategy pattern الكامل لمزوّد دفع واحد (زيادة)، ودالة عادية لمزوّد واحد (كفاية)، وجدول بسيط لما بقوا ٣ مزوّدين (دلوقتي الـ pattern ليه لازمة). هنفك المرحلة التالتة سطر سطر، ونشوف إزاي TypeScript بيحميها. اتشغّل بـ [[npx tsx]] على Node 24.19، والأخطاء من [[tsc --strict]] (TypeScript 7.0) على ويندوز.

---

## ١. قبل: ٤ أنواع لمزوّد واحد

~~~text قبل
interface PaymentStrategy { pay(amount: number): Promise<string> }
class PaymobStrategy implements PaymentStrategy { ... }
class PaymentStrategyFactory { static create(name: string): PaymentStrategy { ... } }
~~~

- **strategy**: إنك تختار طريقة تنفيذ (خوارزمية) وقت التشغيل من بين كذا طريقة بنفس الشكل.
- **factory**: حاجة وظيفتها تعمل objects بدل ما تكتب [[new]] بنفسك.

الاتنين حلول لمشكلة «عندي كذا مزوّد». ومع مزوّد **واحد** المشكلة مش موجودة، فدول طبقات زيادة كل اللي بيصلّح bug لازم يعدّي عليها.

---

## ٢. مزوّد واحد: دالة

~~~text main.ts
async function payWithPaymob(amount: number) {
  return $__btpaymob:$__{amount}$__bt;
}
~~~

دالة [[async]] بترجّع نص (رقم عملية وهمي في المثال، وفي الحقيقة بتنادي API بتاعهم). ده كل اللي محتاجه النهارده.

---

## ٣. المزوّد التالت: جدول

~~~text main.ts
const providers = {
  paymob: payWithPaymob,
  fawry: async (amount: number) => $__btfawry:$__{amount}$__bt,
  stripe: async (amount: number) => $__btstripe:$__{amount}$__bt,
} satisfies Record<string, (amount: number) => Promise<string>>;
~~~

- object عادي: المفتاح اسم المزوّد، والقيمة دالته. الدالة القديمة دخلت زي ما هي.
- [[Record<string, ...>]]: نوع جاهز معناه «object مفاتيحه نصوص وقيمه من النوع ده».
- [[satisfies]]: بيتأكد إن الـ object ماشي على النوع، **من غير** ما يغيّر النوع اللي TypeScript فهمه منه. لو مزوّد رجّع حاجة غلط:

~~~text الناتج: npx tsc --noEmit --strict
oe.ts(10,15): error TS2322: Type '(a: number) => Promise<number>' is not assignable to type '(amount: number) => Promise<string>'.
~~~

ليه [[satisfies]] مش [[: Record<...>]] عادي؟ لو كتبت النوع على المتغير، TypeScript بينسى أسماء المفاتيح ويعتبرها أي [[string]]. جرّبنا: مع النوع المكتوب، [["vodafone"]] عدّت من غير خطأ.

~~~text main.ts
type Provider = keyof typeof providers;
~~~

- [[typeof providers]]: نوع الـ object.
- [[keyof]]: أسماء مفاتيحه، يعني [["paymob" | "fawry" | "stripe"]]. والنوع ده بيتولّد من الجدول نفسه: تضيف مزوّد، النوع يتحدث لوحده.

---

## ٤. [[pay]]: ده الـ strategy كله

~~~text main.ts
function pay(provider: Provider, amount: number) {
  return providers[provider](amount);
}
pay("fawry", 250).then(console.log); // fawry:250
~~~

- [[providers[provider]]]: هات الدالة اللي اسمها في المتغير.
- [[(amount)]]: ناديها.
- [[.then(console.log)]]: لما الـ Promise يخلص، اطبع النتيجة.

~~~text الناتج: npx tsx main.ts
fawry:250
~~~

ومزوّد مش موجود بيتمسك قبل التشغيل:

~~~text الناتج: pay("vodafone", 250)
oe.ts(9,5): error TS2345: Argument of type '"vodafone"' is not assignable to parameter of type '"fawry" | "paymob" | "stripe"'.
~~~

مفيش classes ولا factory ولا interface، ونفس الحماية.

---

## الخلاصة

| عندك كام حالة؟ | اكتب |
|---|---|
| واحدة | دالة عادية |
| اتنين | استحمل، وخد بالك إيه اللي بيتغير |
| تلاتة | abstraction على مقاس الحالات الحقيقية (هنا: جدول) |

- interface ليها implementation واحد ومفيش fake في الاختبار، أو factory بيعمل نوع واحد: علامات over-engineering.
- الـ pattern حل لمشكلة موجودة النهارده، مش لمشكلة متخيّلة.
- الاستثناء: حاجات صعب تتغير بعدين (API عام، شكل الداتابيز) تستاهل تفكير أكتر من الأول.`,
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
    }
]);
