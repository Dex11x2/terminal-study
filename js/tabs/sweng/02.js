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
    }
]);
