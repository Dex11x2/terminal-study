// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`الـ Symbols والـ iteration: Symbol و Iterator والـ generators`,
      l: 3,
      n: "الـ Symbol كمفتاح فريد و Symbol.for، وجدول كل الـ well-known symbols، و matcher بتاعك لـ replace و split، وبروتوكول الـ iteration كامل بـ return و throw، والـ generator في الاتجاهين، و Iterator helpers و Iterator.from، والـ async generators و for await على API وملف، وعيلة AsyncFunction و GeneratorFunction، والـ function و class expressions، و void، ومشاريع: enum و glob و wizard وعميل API بصفحات وتقرير من CSV مليون سطر",
      pre: [
        { to: "js/iterators و generators", why: R`[[Symbol.iterator]] و [[function*]] و [[yield]] في أبسط صورهم: الوحدة دي بتكمّل كل اللي فاضل` },
        { to: "js/for...of و for...in", why: R`[[for...of]] من برّه قبل ما نشوفه من جوه` },
        { to: "js/async و await", why: R`الـ Promises و [[await]]، أساس الـ async generators` },
        { to: "js/valueOf و toString و Symbol.toPrimitive", why: R`أول well-known symbol اتشرح، والوحدة دي بتكمّل الجدول` },
        { to: "js/test و match و matchAll و replace", why: R`الـ string methods اللي بنعمل لها matcher بتاعنا` },
        { to: "js/function و arrow", why: R`function declaration و expression في أبسط صورهم` },
      ],
      goal: [
        R`تستخدم [[Symbol()]] كمفتاح ميخبطش في حاجة، و [[Symbol.for]] و [[Symbol.keyFor]] لما كذا نسخة لازم تتفق، وتعرف إن الـ Symbol مستخبي مش private.`,
        R`تعرف الـ ١٣ well-known symbol ومين بيسأل كل واحد، وتعمل class بـ [[Symbol.toStringTag]] و matcher بيشتغل مع [[str.replace]] و [[split]] و [[search]].`,
        R`تكتب iterator بإيدك بالبروتوكول كامل ([[next]] و [[return]])، وتعرف بالظبط إمتى الـ resource بيتقفل لوحده وإمتى لأ.`,
        R`تستخدم الـ generator كـ coroutine: [[next(value)]] و [[return]] و [[throw]] و [[yield*]] بقيمة الـ return.`,
        R`تكتب سلاسل lazy بـ [[map]] و [[filter]] و [[take]] و [[reduce]] على أي iterator، وتعرف بالأرقام إمتى بتكسب وإمتى الـ array أسرع.`,
        R`تكتب async generators للـ pagination والملفات، و [[for await]] بقفل صح، وتعرف [[AsyncFunction]] و [[GeneratorFunction]] وأخواتهم، وتكتب أي نوع دالة أو class كـ expression، وتستخدم [[void]] صح.`,
      ],
      use: {
        prog: R`كل مكتبة بتتعامل مع داتا على دفعات مبنية على الحاجات دي: drivers قواعد البيانات بترجّع cursors كـ async iterators، و Node streams و [[readline]] و [[events.on]] async iterables، و SDKs بتاعة APIs كتير بترجّع pagination كـ [[for await]]، و React بيعلّم عناصره بـ [[Symbol.for]]، والـ testing libraries بتعرض objects بـ [[Symbol.toStringTag]]. ولما تفهم البروتوكول هتعرف ليه ملف فضل مفتوح بعد [[break]]، وليه [[includes(/x/)]] بيرمي.`,
        work: R`تقارير من ملفات CSV ولوجات أكبر من الذاكرة، وعملاء API بيلفوا على آلاف الصفحات وبيتلغوا، وفورم بخطوات كـ state machine، وأنواع قيم (حالات طلب، عملات) مينفعش تتلخبط مع نصوص، وأدوات بحث واستبدال بقواعد مش regex.`,
        cs: R`lazy evaluation و streams (معالجة داتا لانهائية بذاكرة ثابتة)، و coroutines (دالة بتقف وتكمّل)، والفرق بين الـ protocol (عقد زي [[next]] و [[return]]) والـ implementation، و resource management (مين مسؤول يقفل)، والـ grammar (statement مقابل expression) في أي لغة.`,
      },
      projects: [
        { lvl: 'صغير', t: R`enum حالات الطلب بـ Symbols`, what: R`[[order-status.mjs]] فيه [[Status]] متجمّد فيه ٥ حالات قيمهم Symbols ([[PENDING]] و [[PAID]] و [[SHIPPED]] و [[DELIVERED]] و [[CANCELLED]])، وجدول انتقالات مسموحة في [[Map]] مفاتيحه Symbols، و [[createOrder(id)]] بـ [[moveTo(status)]] بيرفض الانتقال الغلط وبيرفض النص ([['delivered']]) بدل الـ Symbol، و [[toJSON]] بيكتب الحالة نص بـ [[description]]، و [[parseStatus(name)]] بترجّعها Symbol. من دروس «Symbol: description و Symbol.for و Symbol.keyFor» و «well-known symbols».`, done: R`الطلب بيمشي pending ثم paid ثم shipped والـ JSON فيه [[history]] نصوص، و shipped لـ cancelled بيترفض برسالة، و [[moveTo('delivered')]] بيترفض بـ TypeError بتقول إنه نص، و [[order.status === Symbol('delivered')]] بـ [[false]]، و [[parseStatus]] بعد JSON بيرجّع نفس الـ Symbol، و [[Status.PAID = ...]] بيرمي.`, sol: R`**هتشوف إيه:** سطر لكل حالة: الطلب بعد خطوتين كـ JSON، ورفضين برسالتهم، والمقارنات، والرجوع من JSON:

~~~text الناتج: node order-status.mjs
{"id":"A-17","status":"shipped","history":["pending","paid","shipped"]}
رفض: ممنوع من shipped لـ cancelled
رفض: moveTo محتاجة حالة من Status، مش string: "delivered"
true false Symbol(delivered)
true
TypeError: حالة مش معروفة: "lost" (المسموح: pending, paid, shipped, delivered, cancelled)
TypeError: Cannot assign to read only property 'PAID' of object '#<Object>'
~~~

~~~js order-status.mjs
// node order-status.mjs: حالات الطلب كـ Symbols، والانتقالات المسموحة، والتحويل من وإلى JSON
const Status = Object.freeze({
  PENDING: Symbol('pending'),
  PAID: Symbol('paid'),
  SHIPPED: Symbol('shipped'),
  DELIVERED: Symbol('delivered'),
  CANCELLED: Symbol('cancelled'),
});

const byName = new Map(Object.values(Status).map((s) => [s.description, s]));

const transitions = new Map([
  [Status.PENDING, [Status.PAID, Status.CANCELLED] ],
  [Status.PAID, [Status.SHIPPED, Status.CANCELLED] ],
  [Status.SHIPPED, [Status.DELIVERED] ],
  [Status.DELIVERED, [] ],
  [Status.CANCELLED, [] ],
]);

function parseStatus(name) {
  const s = byName.get(name);
  if (!s) throw new TypeError('حالة مش معروفة: ' + JSON.stringify(name) + ' (المسموح: ' + [...byName.keys()].join(', ') + ')');
  return s;
}

function createOrder(id) {
  let status = Status.PENDING;
  const history = [status];
  return {
    id,
    get status() { return status; },
    moveTo(next) {
      if (typeof next !== 'symbol') throw new TypeError('moveTo محتاجة حالة من Status، مش ' + typeof next + ': ' + JSON.stringify(next));
      if (!(transitions.get(status) ?? []).includes(next)) {
        throw new Error('ممنوع من ' + status.description + ' لـ ' + next.description);
      }
      status = next;
      history.push(next);
      return this;
    },
    toJSON() { return { id, status: status.description, history: history.map((s) => s.description) }; },
  };
}

const order = createOrder('A-17');
order.moveTo(Status.PAID).moveTo(Status.SHIPPED);
console.log(JSON.stringify(order));
try { order.moveTo(Status.CANCELLED); } catch (e) { console.log('رفض:', e.message); }
try { order.moveTo('delivered'); } catch (e) { console.log('رفض:', e.message); }
order.moveTo(Status.DELIVERED);
console.log(order.status === Status.DELIVERED, order.status === Symbol('delivered'), String(order.status));
const saved = JSON.parse(JSON.stringify(order));
console.log(parseStatus(saved.status) === Status.DELIVERED);
try { parseStatus('lost'); } catch (e) { console.log(e.name + ':', e.message); }
try { Status.PAID = Symbol('hacked'); console.log('اتغيّر؟', Status.PAID.description); } catch (e) { console.log(e.name + ':', e.message); }

export { Status, parseStatus, createOrder };
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- [[Object.freeze({ PENDING: Symbol('pending'), ... })]]: كل قيمة Symbol فريد، والوصف ([['pending']]) هو اللي هيتكتب في الـ JSON. والـ freeze بيمنع حد يغيّر [[Status.PAID]] (آخر سطر في الناتج: [[Cannot assign to read only property]] لأن ملفات [[.mjs]] strict).
- [[byName]]: [[Map]] من الوصف للـ Symbol، عشان نرجع من الـ JSON. اتبنت من [[Object.values(Status)]] فمفيش اسم بيتكتب مرتين.
- [[transitions]]: [[Map]] مفاتيحه Symbols (ده اللي [[Map]] بيقدر عليه و object عادي برضه، بس [[Map]] أوضح ومش بيخلط مع خصايص موروثة).
- [[moveTo]]: أول فحص [[typeof next !== 'symbol']]، وبعدين [[includes]] على الانتقالات المسموحة (الـ [[===]] على Symbols = نفس الهوية).
- [[toJSON]]: [[JSON.stringify]] بيرمي الـ Symbols (درس Symbol)، فلازم نحوّلها نص بإيدنا بـ [[description]].
- [[order.status === Symbol('delivered')]] بـ [[false]]: ده الهدف كله. محدش يقدر «يألّف» حالة صح من برّه الـ module، لازم ياخدها من [[Status]].

**الغلطات اللي حصلت وأنا ببنيه:**

1. أول نسخة مكنش فيها فحص [[typeof]]، و [[moveTo('delivered')]] طلّعت [[رفض: ممنوع من shipped لـ delivered]]: رسالة بتقول إن الانتقال ممنوع، والحقيقة إن الحالة نفسها **نص** مش من [[Status]]، وكانت هتترفض حتى من [[PAID]]. الفحص بقى أول سطر برسالة واضحة.
2. آخر سطر كان [[console.log(e.name)]] بس فطبع [[TypeError]] من غير سبب؛ زوّدت [[e.message]] عشان الناتج يشرح نفسه.

**وليه مش نصوص عادية ([['paid']])؟** النص بيتكتب غلط ([['payed']]) ويعدّي، وبيتقارن مع أي نص تاني جاي من يوزر. الـ Symbol بيجبرك تمشي من [[Status]]، والنص بيفضل على حدود البرنامج بس (JSON و قاعدة البيانات) بـ [[parseStatus]] اللي بترفض أي حاجة مش معروفة.` },
        { lvl: 'صغير', t: R`glob matcher بيشتغل مع replace و split`, what: R`[[glob.mjs]] فيه [[class Glob]]: [[new Glob('*.js')]] أو [[new Glob('report-??.csv')]] ([[*]] = أي حروف في الاسم، و [[?]] = حرف واحد، والباقي حرفي حتى [[.]] و [[+]]). عنده [[test(name)]]، وبيتبعت لـ [[str.search]] و [[str.replace]] (بنص أو بدالة) و [[str.split]] زي الـ regex بالظبط، وليه [[Symbol.toStringTag]]. من دروس «RegExp و Symbol.match و Symbol.replace: matcher بتاعك» و «well-known symbols».`, done: R`[[*.js]] بيطابق [[app.js]] و [[app.test.js]] ومش [[src/app.js]]، و [[report-??.csv]] بيطابق [[report-01.csv]] ومش [[report-2026.csv]]، و [[replace]] بيغيّر الـ ٣ ملفات js في السطر، و [[split]] بيطلّع اللي مش js، و [[new Glob('a+b.js')]] بيطابق [[a+b.js]] حرفيًا ومش [[aab.js]]، و [[String(js)]] بـ [[[object Glob *.js]]].`, sol: R`**هتشوف إيه:** الفلترة على أسامي ملفات، وبعدين الـ string methods على سطر فيه ملفات:

~~~text الناتج: node glob.mjs
[ 'app.js', 'app.test.js' ]
[ 'report-01.csv' ]
0 -1
[js] style.css [js] notes.txt [js]
APP.JS style.css APP.TEST.JS notes.txt OLD.JS
[ 'style.css', 'notes.txt' ]
[object Glob *.js] ok aab.js
includes: false
TypeError: Glob محتاج pattern نصي مش فاضي
~~~

~~~js glob.mjs
// node glob.mjs: glob زي *.js و report-??.csv بيشتغل مع test و search و replace و split
export class Glob {
  #source;
  constructor(pattern) {
    if (typeof pattern !== 'string' || pattern === '') throw new TypeError('Glob محتاج pattern نصي مش فاضي');
    this.pattern = pattern;
    const body = [...pattern].map((ch) => (ch === '*' ? '[^\\s/]*' : ch === '?' ? '[^\\s/]' : RegExp.escape(ch))).join('');
    this.#source = '(?<!\\S)' + body + '(?!\\S)';
  }
  #regex() { return new RegExp(this.#source, 'g'); }
  test(name) { return new RegExp('^' + this.#source + '$').test(name); }
  [Symbol.search](str) { return str.search(this.#regex()); }
  [Symbol.replace](str, rep) { return str.replace(this.#regex(), rep); }
  [Symbol.split](str, limit) { return str.split(this.#regex(), limit).map((s) => s.trim()).filter(Boolean); }
  get [Symbol.toStringTag]() { return 'Glob ' + this.pattern; }
}

const files = ['app.js', 'app.test.js', 'style.css', 'report-01.csv', 'report-2026.csv', 'src/app.js', 'notes.txt'];
const js = new Glob('*.js');
const report = new Glob('report-??.csv');
console.log(files.filter((f) => js.test(f)));
console.log(files.filter((f) => report.test(f)));
const listing = 'app.js style.css app.test.js notes.txt old.js';
console.log(listing.search(js), listing.search(new Glob('*.md')));
console.log(listing.replace(js, '[js]'));
console.log(listing.replace(js, (name) => name.toUpperCase()));
console.log(listing.split(js));
console.log(String(js), 'a+b.js'.replace(new Glob('a+b.js'), 'ok'), 'aab.js'.replace(new Glob('a+b.js'), 'ok'));
try { console.log('includes:', listing.includes(js)); } catch (e) { console.log(e.message); }
try { new Glob(''); } catch (e) { console.log(e.name + ':', e.message); }
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- الـ constructor بيحوّل الـ glob لـ regex **من جوه**: [[*]] بقت [[[^\s/]*]] (أي حروف ماعدا المسافة و [[/]])، و [[?]] بقت [[[^\s/]]]، وأي حرف تاني بيعدّي على [[RegExp.escape]] فـ [[.]] و [[+]] بيبقوا حرفيين.
- [[(?<!\S)]] و [[(?!\S)]]: lookbehind و lookahead معناهم «قبلي وبعدي مسافة أو أول وآخر النص»، عشان [[*.js]] متمسكش حتة من كلمة. و [[\S]] الكبيرة = أي حاجة مش مسافة.
- [[#regex()]] بيعمل regex جديد كل نداء: الـ regex بـ [[g]] ليه [[lastIndex]] بيتغيّر، ولو استخدمنا واحد مشترك هيبوظ بين النداءات.
- [[ [Symbol.search] ]] و [[ [Symbol.replace] ]] و [[ [Symbol.split] ]]: بيسلّموا للـ regex الداخلي. ومفيش [[Symbol.match]] بقصد: عشان كده [[listing.includes(js)]] **مرماش** error ورجّع [[false]] (حوّل الـ Glob لنص [['[object Glob *.js]']] ودوّر عليه). لو كنا زوّدنا [[Symbol.match]] كان هيرمي.
- [[split]] بيعمل [[trim]] ويشيل الفاضي، لأن الـ regex بياكل الاسم بس ويسيب المسافات حواليه.

**الغلطات اللي حصلت وأنا ببنيه:**

أول نسخة كان فيها [['[^\s/]*']] بـ backslash **واحدة** جوه string عادي. في JavaScript [['\s']] جوه string = [['s']] (escape ملوش معنى بيتشال)، فالـ regex بقى [[[^s/]*]] يعني «أي حرف غير s»:

~~~text الناتج من النسخة الأولى
[ 'app.js' ]
[ 'report-01.csv' ]
34 -1
app.js style.css app.test.js notes[js]
~~~

[[app.test.js]] مطابقش (فيه [[s]] في test)، و [[replace]] مسك [[.txt old.js]] كأنها اسم واحد لأن المسافة بقت مسموحة. الحل: [['[^\\s/]*']] (backslash مضاعفة جوه الـ string) أو [[String.raw]]. وطبعت [[body]] قبل [[new RegExp]] عشان أشوف الـ regex الحقيقي، وده أسرع طريقة تلاقي الغلط ده.` },
        { lvl: 'متوسط', t: R`فورم تسجيل بخطوات كـ generator`, what: R`[[wizard.mjs]] فيه [[function* signupWizard()]]: كل [[yield]] سؤال ([[{ field, question, error }]])، و [[next(answer)]] الإجابة، وكل سؤال بيتسأل تاني برسالة لو الإجابة غلط، ولو الباقة [[pro]] بيسأل عن آخر ٤ أرقام من الكارت. [[throw(new CancelError())]] = اليوزر لغى (بيرجّع الحقول اللي اتملت)، و [[return]] لو الإدخال خلص. و [[demo.mjs]] بيجرّبه بإجابات مكتوبة، و [[cli.mjs]] بياخد الإجابات من الكيبورد أو pipe بـ [[for await]] على [[readline]]. من دروس «Generator: next و return و throw و yield*» و «AsyncIterator و async generators».`, done: R`التسجيل بـ ٤ إجابات غلط بيطلّع الرسالة الصح لكل واحدة ويكمّل، والنتيجة فيها [[card: '****1234']]، و free مبيسألش عن الكارت، والإلغاء عند الإيميل بيرجّع [[filled: [ 'name' ] ]]، و [[[wizard closed]]] بيتطبع في الـ ٤ حالات، و [[printf 'Sara\ncancel\n' | node cli.mjs]] بيلغي.`, sol: R`**هتشوف إيه:** كل سؤال وإجابته، والإجابة الغلط بتظهر قبلها ✗ والسبب، وفي الآخر النتيجة:

~~~text الناتج: node demo.mjs
== تسجيل كامل بـ pro وغلطتين
اسمك؟ "S"
  ✗ الاسم حرفين على الأقل ← اسمك؟ "Sara"
إيميلك؟ "sara@"
  ✗ إيميل مش صح ← إيميلك؟ "sara@example.com"
الباقة (free أو pro)؟ "gold"
  ✗ اختار free أو pro ← الباقة (free أو pro)؟ "pro"
آخر ٤ أرقام من الكارت؟ "12a4"
  ✗ لازم ٤ أرقام ← آخر ٤ أرقام من الكارت؟ "1234"
  [wizard closed]
{
  ok: true,
  account: {
    name: 'Sara',
    email: 'sara@example.com',
    plan: 'pro',
    card: '****1234'
  }
}
== free من غير كارت
اسمك؟ "Omar"
إيميلك؟ "omar@example.org"
الباقة (free أو pro)؟ "free"
  [wizard closed]
{
  ok: true,
  account: { name: 'Omar', email: 'omar@example.org', plan: 'free' }
}
== إلغاء عند الإيميل
اسمك؟ "Mona"
إيميلك؟ [إلغاء]
  [wizard closed]
{ ok: false, reason: 'اليوزر داس إلغاء عند email', filled: [ 'name' ] }
== الإجابات خلصت
اسمك؟ "Ali"
  [wizard closed]
{ ok: false, reason: 'الإجابات خلصت قبل الأسئلة' }
~~~

~~~js wizard.mjs
// wizard.mjs: فورم تسجيل خطوة خطوة كـ generator: كل yield سؤال، و next(answer) إجابة
export class CancelError extends Error { name = 'CancelError'; }

const ask = (field, question, validate) => ({ field, question, validate });

const steps = [
  ask('name', 'اسمك؟', (v) => (v.trim().length >= 2 ? null : 'الاسم حرفين على الأقل')),
  ask('email', 'إيميلك؟', (v) => (/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v) ? null : 'إيميل مش صح')),
  ask('plan', 'الباقة (free أو pro)؟', (v) => (['free', 'pro'].includes(v) ? null : 'اختار free أو pro')),
];

export function* signupWizard() {
  const answers = {};
  try {
    for (const step of steps) {
      let error = null;
      while (true) {
        const raw = yield { field: step.field, question: step.question, error };
        const value = String(raw ?? '');
        error = step.validate(value);
        if (!error) { answers[step.field] = value.trim(); break; }
      }
      if (step.field === 'plan' && answers.plan === 'pro') {
        let error = null;
        while (true) {
          const card = yield { field: 'card', question: 'آخر ٤ أرقام من الكارت؟', error };
          if (/^\d{4}$/.test(String(card))) { answers.card = '****' + card; break; }
          error = 'لازم ٤ أرقام';
        }
      }
    }
    return { ok: true, account: answers };
  } catch (e) {
    if (e instanceof CancelError) return { ok: false, reason: e.message, filled: Object.keys(answers) };
    throw e;
  } finally {
    console.log('  [wizard closed]');
  }
}

export function runScripted(answers, { cancelAt } = {}) {
  const wizard = signupWizard();
  let step = wizard.next();
  for (const answer of answers) {
    if (step.done) break;
    const { field, question, error } = step.value;
    const shown = field === cancelAt ? '[إلغاء]' : JSON.stringify(answer);
    console.log((error ? '  ✗ ' + error + ' ← ' : '') + question + ' ' + shown);
    step = field === cancelAt ? wizard.throw(new CancelError('اليوزر داس إلغاء عند ' + field)) : wizard.next(answer);
  }
  if (!step.done) step = wizard.return({ ok: false, reason: 'الإجابات خلصت قبل الأسئلة' });
  return step.value;
}
~~~

~~~js demo.mjs
// node demo.mjs: بيجرّب الـ wizard بإجابات مكتوبة
import { runScripted } from './wizard.mjs';
console.log('== تسجيل كامل بـ pro وغلطتين');
console.log(runScripted(['S', 'Sara', 'sara@', 'sara@example.com', 'gold', 'pro', '12a4', '1234']));
console.log('== free من غير كارت');
console.log(runScripted(['Omar', 'omar@example.org', 'free']));
console.log('== إلغاء عند الإيميل');
console.log(runScripted(['Mona', 'x'], { cancelAt: 'email' }));
console.log('== الإجابات خلصت');
console.log(runScripted(['Ali']));
~~~

~~~js cli.mjs
// node cli.mjs: نفس الـ wizard بس الإجابات سطر سطر من الكيبورد أو من pipe، و "cancel" بتلغي
import { createInterface } from 'node:readline';
import { signupWizard, CancelError } from './wizard.mjs';
const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
const wizard = signupWizard();
let step = wizard.next();
const prompt = ({ question, error }) => process.stdout.write((error ? '✗ ' + error + '\n' : '') + question + ' ');
prompt(step.value);
for await (const line of rl) {
  step = line === 'cancel' ? wizard.throw(new CancelError('cancel')) : wizard.next(line);
  if (step.done) break;
  prompt(step.value);
}
if (!step.done) step = wizard.return({ ok: false, reason: 'الإدخال خلص' });
console.log('\n' + JSON.stringify(step.value));
~~~

~~~json package.json
{ "type": "module" }
~~~

~~~text الناتج: الـ CLI بإدخال من pipe (Git Bash)
$ printf 'Sara\nsara@example.com\npro\n9876\n' | node cli.mjs
اسمك؟ إيميلك؟ الباقة (free أو pro)؟ آخر ٤ أرقام من الكارت؟   [wizard closed]

{"ok":true,"account":{"name":"Sara","email":"sara@example.com","plan":"pro","card":"****9876"}}
$ printf 'Sara\nnope\ncancel\n' | node cli.mjs
اسمك؟ إيميلك؟ ✗ إيميل مش صح
إيميلك؟   [wizard closed]

{"ok":false,"reason":"cancel","filled":["name"]}
$ printf 'Sara\n' | node cli.mjs
اسمك؟ إيميلك؟   [wizard closed]

{"ok":false,"reason":"الإدخال خلص"}
~~~

**كل حتة بتعمل إيه:**

- [[const raw = yield { field, question, error }]]: السطر ده هو الفورم كله. بيطلّع السؤال (ومعاه رسالة الغلط اللي فاتت لو فيه)، ويستنى، والإجابة بترجع في [[raw]]. والـ [[while (true)]] بيعيد نفس السؤال لحد ما [[validate]] ترجّع [[null]].
- السؤال الإضافي للكارت جوه الـ [[for]] بعد خطوة [[plan]]: الـ flow متفرّع وهو مكتوب كود عادي، من غير [[state]] و [[switch]].
- [[catch (e)]] بيفرّق: [[CancelError]] = إلغاء مقصود فبيرجّع نتيجة، وأي error تاني بيترمي تاني ([[throw e]]) عشان الغلطات الحقيقية متتبلعش.
- [[finally]]: بتطبع [[[wizard closed]]] في الخلاص والإلغاء و [[return]] من برّه.
- [[runScripted]]: هو اللي «بيلف»: أول [[next()]] من غير قيمة (priming)، وبعدين [[next(answer)]] أو [[throw]]، ولو الإجابات خلصت [[return]] بنتيجة.
- [[cli.mjs]]: نفس الـ generator، بس الإجابات من [[for await (const line of rl)]]. الـ generator مش فارق معاه الإجابة جت منين.

**الغلطات اللي حصلت وأنا ببنيه:**

أول [[cli.mjs]] كان بـ [[readline/promises]] و [[await rl.question(...)]] في loop. بالكيبورد شغال، بس بـ pipe:

~~~text الناتج من النسخة الأولى: printf 'Sara\nsara@example.com\npro\n9876\n' | node cli.mjs
اسمك؟ إيميلك؟ Warning: Detected unsettled top-level await at file:///.../cli.mjs:10
    const answer = await rl.question((error ? '✗ ' + error + '\n' : '') + question + ' ');
                   ^

exit 13
~~~

الـ pipe بيبعت السطور كلها مرة واحدة، و [[question]] بياخد السطر اللي بييجي **بعد** ما يتنادى، فالسطور اللي وصلت وهو مش سائل ضاعت، والـ input خلص والـ [[await]] فضل مستني للأبد، فـ Node خرج بـ 13 (unsettled top-level await). الحل: [[for await (const line of rl)]] بيستلم كل سطر في طابور، ونحركه للـ generator واحد واحد. ده اللي في الكود فوق، والتلات تجارب بالـ pipe عدّت.` },
        { lvl: 'متوسط', t: R`عميل API بصفحات: async generator بيعيد ويتلغي`, what: R`[[paginate.mjs]] فيه [[async function* paginate(url, { signal, retries, log })]]: بيجيب صفحة بـ [[fetch]]، ويطلّع منتجاتها واحد واحد، ويكمّل بالـ cursor اللي في الرد لحد ما يبقى [[null]]. لو السيرفر رد 5xx بيستنى ([[20ms]] ثم [[40ms]]) ويعيد لحد [[retries]]، ولو 4xx بيرمي [[HttpError]] فيها الـ status، ولو الـ [[signal]] اتلغى بيقف في النص. و [[server.mjs]] سيرفر Node على [[127.0.0.1]] فيه ٢٣ منتج وصفحة بتفشل 503 مرة واحدة، و [[demo.mjs]] بيجرّب ٤ حالات. من دروس «AsyncIterator و async generators: for await بعمق» و «Generator: next و return و throw و yield*».`, done: R`الـ ٢٣ منتج بيوصلوا رغم الـ 503 (٦ requests: ٥ صفحات وإعادة)، و [[break]] بعد ٧ منتجات بيعمل requestين بس، و [[AbortSignal.timeout(100)]] بيوقف القراية بـ [[TimeoutError]]، و URL غلط بيرمي [[HttpError]] بـ status 404، وسطر [[[paginate: ...]]] بيتطبع في الأربعة.`, sol: R`**هتشوف إيه:** ٤ حالات، وفي كل واحدة سطر الـ [[finally]] بعدد الصفحات وإذا كان اتقفل ولا اتلغى، وعدد الـ requests اللي السيرفر شافها:

~~~text الناتج: node demo.mjs
== الكل (والصفحة p10 بتفشل مرة)
  ↻ 503، محاولة 2 بعد 20ms
  [paginate: 5 صفحة، اتقفل]
23 منتج، أول وآخر: item-1 item-23 | requests: 6
== أول 7 بس
  [paginate: 2 صفحة، اتقفل]
1,2,3,4,5,6,7 | requests: 2
== إلغاء بعد 100ms (كل صفحة 40ms)
  [paginate: 1 صفحة، اتلغى]
TimeoutError: The operation was aborted due to timeout | وصل 5 منتج | requests: 2
== URL غلط
  [paginate: 0 صفحة، اتقفل]
HttpError: HTTP 404 من http://127.0.0.1:PORT/nope | status 404
~~~

~~~js paginate.mjs
// paginate.mjs: async generator بيلف على API بصفحات (cursor)، بيعيد المحاولة في 5xx، وبيتلغي بـ AbortSignal
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});

export class HttpError extends Error {
  constructor(status, url) { super('HTTP ' + status + ' من ' + url); this.name = 'HttpError'; this.status = status; }
}

async function getJson(url, { signal, retries, log }) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, { signal });
    if (res.ok) return res.json();
    if (res.status >= 500 && attempt < retries) {
      const wait = 20 * 2 ** attempt;
      log('  ↻ ' + res.status + '، محاولة ' + (attempt + 2) + ' بعد ' + wait + 'ms');
      await sleep(wait, signal);
      continue;
    }
    throw new HttpError(res.status, url);
  }
}

export async function* paginate(baseUrl, { signal, retries = 2, log = () => {} } = {}) {
  let cursor = '';
  let pages = 0;
  try {
    do {
      signal?.throwIfAborted();
      const url = baseUrl + (cursor ? '?cursor=' + encodeURIComponent(cursor) : '');
      const page = await getJson(url, { signal, retries, log });
      pages++;
      yield* page.items;
      cursor = page.next;
    } while (cursor);
  } finally {
    log('  [paginate: ' + pages + ' صفحة، ' + (signal?.aborted ? 'اتلغى' : 'اتقفل') + ']');
  }
}
~~~

~~~js server.mjs
// server.mjs: API وهمي على localhost: 23 منتج، 5 في الصفحة، و cursor، وصفحة بتفشل 503 مرة واحدة
import { createServer } from 'node:http';

export function startServer({ delay = 0, failOnce = 'p10' } = {}) {
  const products = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, name: 'item-' + (i + 1) }));
  let requests = 0;
  let failed = false;
  const server = createServer(async (req, res) => {
    requests++;
    const url = new URL(req.url, 'http://x');
    if (url.pathname !== '/products') { res.writeHead(404).end(); return; }
    const cursor = url.searchParams.get('cursor') ?? 'p0';
    if (!/^p\d+$/.test(cursor)) { res.writeHead(400).end(); return; }
    if (cursor === failOnce && !failed) { failed = true; res.writeHead(503).end(); return; }
    if (delay) await new Promise((r) => setTimeout(r, delay));
    const start = Number(cursor.slice(1));
    const items = products.slice(start, start + 5);
    const next = start + 5 < products.length ? 'p' + (start + 5) : null;
    res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ items, next }));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => {
    resolve({ url: 'http://127.0.0.1:' + server.address().port + '/products', get requests() { return requests; }, close: () => server.close() });
  }));
}
~~~

~~~js demo.mjs
// node demo.mjs: ٤ حالات: الكل، و break بدري، و إلغاء بالوقت، و 404
import { startServer } from './server.mjs';
import { paginate } from './paginate.mjs';
const log = (m) => console.log(m);

let api = await startServer();
console.log('== الكل (والصفحة p10 بتفشل مرة)');
const all = await Array.fromAsync(paginate(api.url, { log }));
console.log(all.length, 'منتج، أول وآخر:', all[0].name, all.at(-1).name, '| requests:', api.requests);
api.close();

api = await startServer();
console.log('== أول 7 بس');
const first7 = [];
for await (const p of paginate(api.url, { log })) { first7.push(p.id); if (first7.length === 7) break; }
console.log(first7.join(','), '| requests:', api.requests);
api.close();

api = await startServer({ delay: 40, failOnce: null });
console.log('== إلغاء بعد 100ms (كل صفحة 40ms)');
const got = [];
try {
  for await (const p of paginate(api.url, { signal: AbortSignal.timeout(100), log })) got.push(p.id);
} catch (e) {
  console.log(e.name + ':', e.message, '| وصل', got.length, 'منتج | requests:', api.requests);
}
api.close();

api = await startServer();
console.log('== URL غلط');
try { await Array.fromAsync(paginate(api.url.replace('products', 'nope'), { log })); }
catch (e) { console.log(e.name + ':', e.message.replace(/:\d+/, ':PORT'), '| status', e.status); }
api.close();
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- [[paginate]] **lazy**: الصفحة الجاية مبتتطلبش غير لما اللي بيلف يخلّص منتجات الصفحة الحالية ([[yield* page.items]]). عشان كده [[break]] بعد ٧ منتجات = requestين بس.
- [[getJson]]: الـ retry في دالة لوحدها. [[res.ok]] الأول، وبعدين 5xx بس بيتعاد (4xx غلطة عندك، الإعادة مش هتصلّحها)، والانتظار بيتضاعف: [[20 * 2 ** attempt]].
- [[sleep(ms, signal)]]: الانتظار نفسه بيتلغي لو الـ signal اتلغى، وإلا الإلغاء كان هيستنى الـ backoff يخلص.
- [[signal?.throwIfAborted()]] قبل كل صفحة، و [[fetch(url, { signal })]] بيلغي الـ request اللي شغال. والـ error اللي بيطلع اسمه [[TimeoutError]] لأن [[AbortSignal.timeout]] بيلغي بيه.
- [[finally]]: سطر واحد بيقول اتقفل ولا اتلغى. في عميل حقيقي هنا تقفل connections أو تسجّل metrics.
- السيرفر بـ [[listen(0)]]: Node بيختار port فاضي، فالـ demo مبيخبطش في حاجة شغالة على جهازك. و [[failOnce]] بيخلي صفحة [[p10]] ترد 503 مرة واحدة بس.

**الغلطات اللي حصلت وأنا ببنيه:**

- في حالة الإلغاء كنت متوقّع صفحتين (كل صفحة 40ms والمهلة 100ms)، والناتج قال صفحة واحدة و requestين: أول [[fetch]] على connection جديدة بياخد وقت زيادة (فتح الاتصال)، فالصفحة التانية كانت لسه في السكة لما الـ 100ms خلصت واتلغت. الأرقام دي بتختلف من جهاز للتاني، فالـ demo بيطبع اللي حصل فعلًا بدل ما يفترض.
- رسالة الـ 404 فيها port عشوائي كل تشغيل، فاستبدلته بـ [[PORT]] في الطباعة بس ([[replace(/:\d+/, ':PORT')]]) عشان الناتج يتقارن.` },
        { lvl: 'كبير', t: R`csv-report: تقرير مبيعات من CSV مليون سطر بذاكرة ثابتة`, what: R`أداة سطر أوامر [[node cli.mjs sales.csv --city X --limit N --top N]] (الـ options اختيارية) بتقرا ملف CSV كبير **سطر سطر** بـ async generators وبتطلّع: عدد الصفوف، والإيراد، والإيراد لكل مدينة، وأكتر منتجات، وعدد السطور البايظة وأول ٣ بأرقام سطورها، والوقت وأقصى ذاكرة. الـ parser بيفهم [[","]] جوه علامات التنصيص و [[""]] كـ [["]]، والسطور البايظة بتتسجّل ومبتوقفش القراية، و [[--limit]] بيقف بدري **ويقفل الملف**. ومعاها [[gen-data.mjs]] بيعمل الملف، و [[csv.test.mjs]] بـ [[node --test]]، و [[eager.mjs]] للمقارنة. من الوحدة كلها، ودرس «AsyncIterator و async generators» بالذات.`, done: R`[[node --test]] بيعدّي الـ ٨ اختبارات. على مليون سطر (35.2 MB): ٩٩٩٦٧٤ صف محسوب و ٣٢٦ سطر بايظ، والذاكرة حوالي 160 MB، و [[--limit 5]] بيقرا 0.1 MB بس. و [[--max-old-space-size=64]] الأداة بتشتغل والنسخة اللي بتقرا الملف كله بتقع بـ heap out of memory. والملف المش موجود والـ options الغلط والملف الفاضي بيطلّعوا رسالة و exit code 1.`, ext: R`زوّد [[--group-by product]] بدل المدينة، وخلّي الأداة تقرا من stdin لو اسم الملف [[-]] ([[cat sales.csv | node cli.mjs -]])، واكتب التقرير JSON بـ [[--json]]، وجرّبها على ملف ١٠ مليون سطر وقيس الذاكرة.`, sol: R`**هتشوف إيه:** تقرير المليون سطر في أقل من ٢ ثانية، والمدن مترتبة بالإيراد، والسطور البايظة متسجّلة بأرقامها:

~~~text الناتج: node cli.mjs sales.csv (Node 24.22، ويندوز 11)
صفوف محسوبة: 999674
الإيراد: 174,967,253.50
  Mansoura             36,995,552.00
  Cairo, Nasr City     35,995,678.50
  Alex                 34,995,362.50
  Giza                 33,995,934.50
  Cairo                32,984,726.00
أكتر منتجات بالكمية: rice 999881 | pasta "large" 999877 | oil 999873
سطور بايظة: 326 (أول ٣: سطر 5001: qty أو price مش رقم؛ سطر 7920: متوقع 5 خانات ولقيت 1؛ سطر 10001: qty أو price مش رقم)
اتقرا 35.2 MB في 1678ms، وأقصى ذاكرة 160 MB
~~~

~~~text شجرة الملفات
csv-report/
├── package.json      { "type": "module" }
├── gen-data.mjs      بيعمل sales.csv (مليون سطر فيهم سطور بايظة بقصد)
├── csv.mjs           parseLine و readLines و rows: القراية سطر سطر
├── report.mjs        summarize: لفة واحدة بتجمّع، وبتقف عند الـ limit
├── cli.mjs           الـ arguments والطباعة والأخطاء والقياس
├── csv.test.mjs      8 اختبارات بـ node --test
└── eager.mjs         نفس التقرير بالملف كله في الذاكرة، للمقارنة بس
~~~

**ترتيب البناء:** [[parseLine]] الأول بالاختبارات بتاعته (أصعب حتة وأسهل حاجة تختبرها)، وبعدين [[rows]] على array سطور عادية (من غير ملفات)، وبعدين [[readLines]] على ملف، وبعدين [[summarize]]، وفي الآخر [[cli.mjs]] و [[gen-data.mjs]] والقياس.

~~~js gen-data.mjs
// node gen-data.mjs [rows] [file]: بيعمل CSV مبيعات وهمي فيه سطور بايظة بقصد
import { createWriteStream } from 'node:fs';
import { once } from 'node:events';

const rows = Number(process.argv[2] ?? 200000);
const file = process.argv[3] ?? 'sales.csv';
const cities = ['Cairo', 'Giza', 'Alex', '"Cairo, Nasr City"', 'Mansoura'];
const products = ['tea', 'rice', 'oil', 'sugar', '"pasta ""large"""'];

const out = createWriteStream(file);
out.write('date,city,product,qty,price\n');
for (let i = 1; i <= rows; i++) {
  const day = String((i % 28) + 1).padStart(2, '0');
  let line = '2026-11-' + day + ',' + cities[i % 5] + ',' + products[(i * 7) % 5] + ',' + ((i % 9) + 1) + ',' + (10 + (i % 50)) + '.50';
  if (i % 5000 === 0) line = '2026-11-' + day + ',Cairo,tea,x,12.50';
  if (i % 7919 === 0) line = 'broken line without columns';
  if (!out.write(line + '\n')) await once(out, 'drain');
}
out.end();
await once(out, 'finish');
console.log('اتكتب', rows, 'سطر في', file);
~~~

~~~js csv.mjs
// csv.mjs: قراية CSV سطر سطر كـ async generators، من غير ما الملف يدخل الذاكرة
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

export class CsvError extends Error {
  constructor(message, lineNo, line) { super(message); this.name = 'CsvError'; this.lineNo = lineNo; this.line = line; }
}

// سطر CSV لخانات: الخانة اللي بين "..." فيها , عادي، و "" جواها = " واحدة
export function parseLine(line) {
  const cells = [];
  let cell = '', quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { cells.push(cell); cell = ''; }
    else cell += ch;
  }
  if (quoted) throw new SyntaxError('علامة " مفتوحة ومتقفلتش');
  cells.push(cell);
  return cells;
}

// السطور واحد واحد، والـ finally بتقفل الملف حتى لو اللي بيلف عمل break
export async function* readLines(file, stats = {}) {
  const input = createReadStream(file, { encoding: 'utf8' });
  const rl = createInterface({ input, crlfDelay: Infinity });
  try {
    yield* rl;
  } finally {
    rl.close();
    input.destroy();
    stats.bytes = input.bytesRead;
    stats.destroyed = input.destroyed;
  }
}

// كل سطر بقى object بأسامي الأعمدة ونوعها، والسطر البايظ بيروح لـ onError ويتعدّى
export async function* rows(lines, { onError = () => {} } = {}) {
  let header = null, lineNo = 0;
  for await (const line of lines) {
    lineNo++;
    if (line.trim() === '') continue;
    let cells;
    try { cells = parseLine(line); } catch (e) { onError(new CsvError(e.message, lineNo, line)); continue; }
    if (!header) { header = cells.map((h) => h.trim()); continue; }
    if (cells.length !== header.length) { onError(new CsvError('متوقع ' + header.length + ' خانات ولقيت ' + cells.length, lineNo, line)); continue; }
    const row = Object.fromEntries(header.map((h, i) => [h, cells.at(i)]));
    row.qty = Number(row.qty);
    row.price = Number(row.price);
    if (!Number.isInteger(row.qty) || !Number.isFinite(row.price)) { onError(new CsvError('qty أو price مش رقم', lineNo, line)); continue; }
    row.lineNo = lineNo;
    yield row;
  }
  if (!header) throw new CsvError('الملف فاضي: مفيش header', 0, '');
}
~~~

~~~js report.mjs
// report.mjs: بيلف على الصفوف مرة واحدة ويجمّع، ويقف بدري لو فيه limit
export async function summarize(source, { city = null, limit = Infinity, top = 3 } = {}) {
  const byCity = new Map();
  const byProduct = new Map();
  let count = 0, revenue = 0;
  for await (const row of source) {
    if (city && row.city !== city) continue;
    const amount = Math.round(row.qty * row.price * 100);
    count++;
    revenue += amount;
    byCity.set(row.city, (byCity.get(row.city) ?? 0) + amount);
    byProduct.set(row.product, (byProduct.get(row.product) ?? 0) + row.qty);
    if (count >= limit) break;
  }
  const topProducts = byProduct.entries().toArray().sort((a, b) => b[1] - a[1]).slice(0, top);
  const cities = byCity.entries().map(([name, cents]) => [name, cents / 100]).toArray().sort((a, b) => b[1] - a[1]);
  return { count, revenue: revenue / 100, cities, topProducts };
}
~~~

~~~js cli.mjs
// node cli.mjs <file.csv> [--city X] [--limit N] [--top N]: تقرير مبيعات من CSV كبير سطر سطر
import { parseArgs } from 'node:util';
import { access } from 'node:fs/promises';
import { readLines, rows } from './csv.mjs';
import { summarize } from './report.mjs';

const usage = 'الاستخدام: node cli.mjs <file.csv> [--city Cairo] [--limit 1000] [--top 3]';
let args;
try {
  args = parseArgs({ allowPositionals: true, options: { city: { type: 'string' }, limit: { type: 'string' }, top: { type: 'string', default: '3' } } });
} catch (e) { console.error(e.message + '\n' + usage); process.exit(1); }
const [file] = args.positionals;
const limit = args.values.limit === undefined ? Infinity : Number(args.values.limit);
const top = Number(args.values.top);
if (!file || !(limit > 0) || !Number.isInteger(top) || top < 1) { console.error(usage); process.exit(1); }
try { await access(file); } catch (e) { console.error('مش لاقي الملف: ' + file + ' (' + e.code + ')'); process.exit(1); }

const started = performance.now();
const stats = {};
const errors = [];
let peakRss = 0;
const sampler = setInterval(() => { peakRss = Math.max(peakRss, process.memoryUsage().rss); }, 20);
let report;
try {
  report = await summarize(rows(readLines(file, stats), { onError: (e) => errors.push(e) }), { city: args.values.city ?? null, limit, top });
} catch (e) {
  console.error(e.name + ': ' + e.message);
  process.exit(1);
} finally {
  clearInterval(sampler);
}
peakRss = Math.max(peakRss, process.memoryUsage().rss);

const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
console.log('صفوف محسوبة: ' + report.count + (args.values.city ? ' (مدينة ' + args.values.city + ')' : ''));
console.log('الإيراد: ' + fmt.format(report.revenue));
for (const [name, total] of report.cities) console.log('  ' + name.padEnd(18) + fmt.format(total).padStart(16));
console.log('أكتر منتجات بالكمية: ' + report.topProducts.map(([p, q]) => p + ' ' + q).join(' | '));
console.log('سطور بايظة: ' + errors.length + (errors.length ? ' (أول ٣: ' + errors.slice(0, 3).map((e) => 'سطر ' + e.lineNo + ': ' + e.message).join('؛ ') + ')' : ''));
console.log('اتقرا ' + (stats.bytes / 1e6).toFixed(1) + ' MB في ' + Math.round(performance.now() - started) + 'ms، وأقصى ذاكرة ' + Math.round(peakRss / 1e6) + ' MB');
~~~

~~~js csv.test.mjs
// node --test: اختبارات الـ parser والصفوف والتقرير والقفل البدري
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseLine, readLines, rows, CsvError } from './csv.mjs';
import { summarize } from './report.mjs';

const dir = mkdtempSync(join(tmpdir(), 'csv-test-'));
const fileWith = (name, text) => { const f = join(dir, name); writeFileSync(f, text); return f; };
test.after(() => rmSync(dir, { recursive: true, force: true }));

test('parseLine: فاصلة جوه علامات تنصيص، و "" جواها', () => {
  assert.deepEqual(parseLine('a,"b, c","say ""hi""",'), ['a', 'b, c', 'say "hi"', '']);
});

test('parseLine: علامة مفتوحة بترمي', () => {
  assert.throws(() => parseLine('a,"b'), SyntaxError);
});

test('rows: header و أنواع و رقم السطر، والسطر الفاضي بيتعدّى', async () => {
  const lines = ['date,city,product,qty,price', '', '2026-11-01,Cairo,tea,2,10.50'];
  const out = await Array.fromAsync(rows(lines));
  assert.deepEqual(out, [{ date: '2026-11-01', city: 'Cairo', product: 'tea', qty: 2, price: 10.5, lineNo: 3 }]);
});

test('rows: السطور البايظة بتروح لـ onError ومبتوقفش القراية', async () => {
  const errors = [];
  const lines = ['a,b,qty,price,x', '1,2,x,3,4', 'only one', '1,2,3,4.5,5', '1,"open,3,4,5'];
  const header = ['a', 'b', 'qty', 'price', 'x'];
  const out = await Array.fromAsync(rows(lines, { onError: (e) => errors.push(e) }));
  assert.equal(out.length, 1);
  assert.deepEqual(Object.keys(out[0]).slice(0, 5), header);
  assert.deepEqual(errors.map((e) => [e.lineNo, e instanceof CsvError]), [ [2, true], [3, true], [5, true] ]);
});

test('rows: ملف فاضي بيرمي CsvError', async () => {
  await assert.rejects(Array.fromAsync(rows([])), { name: 'CsvError', message: /فاضي/ });
});

test('readLines + rows من ملف حقيقي فيه \\r\\n (ويندوز)', async () => {
  const f = fileWith('win.csv', 'date,city,product,qty,price\r\n2026-11-01,Giza,rice,3,20\r\n');
  const out = await Array.fromAsync(rows(readLines(f)));
  assert.equal(out[0].price, 20);
  assert.equal(out[0].city, 'Giza');
});

test('limit: بيقف بدري ويقفل الـ stream قبل آخر الملف', async () => {
  const body = Array.from({ length: 50000 }, (_, i) => '2026-11-01,Cairo,tea,1,' + i).join('\n');
  const f = fileWith('big.csv', 'date,city,product,qty,price\n' + body);
  const stats = {};
  const report = await summarize(rows(readLines(f, stats)), { limit: 10 });
  assert.equal(report.count, 10);
  assert.equal(stats.destroyed, true, 'الملف لسه مفتوح بعد ما التقرير وقف');
  assert.ok(stats.bytes < 200000, 'اتقرا ' + stats.bytes + ' بايت من ' + (body.length + 28));
});

test('summarize: فلتر المدينة والإيراد بالقروش من غير كسور', async () => {
  const data = [
    { city: 'Cairo', product: 'tea', qty: 3, price: 0.1 },
    { city: 'Giza', product: 'tea', qty: 1, price: 5 },
    { city: 'Cairo', product: 'oil', qty: 1, price: 0.2 },
  ];
  const r = await summarize(data, { city: 'Cairo' });
  assert.deepEqual([r.count, r.revenue, r.cities], [2, 0.5, [ ['Cairo', 0.5] ] ]);
  assert.deepEqual(r.topProducts, [ ['tea', 3], ['oil', 1] ]);
});
~~~

~~~js eager.mjs
// node eager.mjs sales.csv: نفس التقرير بس الملف كله في الذاكرة، عشان نقارن
import { readFileSync } from 'node:fs';
import { rows } from './csv.mjs';
import { summarize } from './report.mjs';
const started = performance.now();
const lines = readFileSync(process.argv[2], 'utf8').split('\n');
const all = await Array.fromAsync(rows(lines));
const report = await summarize(all);
console.log('صفوف: ' + report.count + ' | ' + Math.round(performance.now() - started) + 'ms | ذاكرة ' + Math.round(process.memoryUsage().rss / 1e6) + ' MB');
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- **[[parseLine]]:** state machine صغيرة بحرف حرف: جوه علامات التنصيص الفاصلة حرف عادي و [[""]] بتبقى [["]]، وبرّاها الفاصلة بتقفل الخانة. ولو السطر خلص والعلامة مفتوحة بترمي، و [[rows]] بتحوّلها [[CsvError]] برقم السطر.
- **[[readLines]]:** [[yield* rl]] بيسلّم لـ readline، والـ [[finally]] بتقفل الـ readline **والملف**. ده أهم سطرين في المشروع (الغلطة الأولى تحت).
- **[[rows(lines)]]:** بتاخد **أي** iterable سطور، sync أو async ([[for await]] بيقبل الاتنين). عشان كده الاختبارات بتبعت array، والـ CLI بيبعت [[readLines]]، و [[eager.mjs]] بيبعت [[split('\n')]]. السطر البايظ بيروح لـ [[onError]] و [[continue]]: القراية مبتقفش عشان سطر واحد.
- **[[summarize]]:** لفة واحدة بـ [[for await]]، والفلوس بالقروش ([[Math.round(qty * price * 100)]]) عشان مفيش [[0.30000000000000004]] (الاختبار الأخير بيتأكد: ٣ × 0.1 + 0.2 = 0.5 بالظبط). و [[break]] عند الـ limit بيقفل السلسلة كلها لحد الملف. والترتيب في الآخر بـ [[entries().toArray()]] و [[entries().map(...).toArray()]] (iterator helpers) لأن عدد المدن صغير.
- **[[cli.mjs]]:** [[parseArgs]] من [[node:util]] بيرفض أي option مش معروفة لوحده، و [[access]] بيتأكد إن الملف موجود قبل ما نبدأ، و [[setInterval]] كل 20ms بيسجّل أقصى [[rss]] (ذاكرة البرنامج كلها)، و [[process.exit(1)]] في كل خطأ عشان أي script بيستخدم الأداة يعرف إنها فشلت.

### الاختبارات والحالات الطرفية

~~~text الناتج: node --test
✔ parseLine: فاصلة جوه علامات تنصيص، و "" جواها (1.7401ms)
✔ parseLine: علامة مفتوحة بترمي (0.4309ms)
✔ rows: header و أنواع و رقم السطر، والسطر الفاضي بيتعدّى (0.3814ms)
✔ rows: السطور البايظة بتروح لـ onError ومبتوقفش القراية (0.6124ms)
✔ rows: ملف فاضي بيرمي CsvError (0.4645ms)
✔ readLines + rows من ملف حقيقي فيه \r\n (ويندوز) (11.2974ms)
✔ limit: بيقف بدري ويقفل الـ stream قبل آخر الملف (20.2131ms)
✔ summarize: فلتر المدينة والإيراد بالقروش من غير كسور (0.6082ms)
ℹ tests 8
ℹ pass 8
ℹ fail 0
~~~

~~~text الناتج: الحالات الطرفية (exit code بعد كل واحدة)
$ node cli.mjs nope.csv
مش لاقي الملف: nope.csv (ENOENT)
(exit 1)
$ node cli.mjs
الاستخدام: node cli.mjs <file.csv> [--city Cairo] [--limit 1000] [--top 3]
(exit 1)
$ node cli.mjs sales.csv --limit -5
Option '--limit' argument is ambiguous.
Did you forget to specify the option argument for '--limit'?
To specify an option argument starting with a dash use '--limit=-XYZ'.
الاستخدام: node cli.mjs <file.csv> [--city Cairo] [--limit 1000] [--top 3]
(exit 1)
$ node cli.mjs sales.csv --limit=-5
الاستخدام: node cli.mjs <file.csv> [--city Cairo] [--limit 1000] [--top 3]
(exit 1)
$ node cli.mjs sales.csv --colour red
Unknown option '--colour'. To specify a positional argument starting with a '-', place it at the end of the command after '--', as in '-- "--colour"
الاستخدام: node cli.mjs <file.csv> [--city Cairo] [--limit 1000] [--top 3]
(exit 1)
$ node cli.mjs empty.csv
CsvError: الملف فاضي: مفيش header
(exit 1)
$ node cli.mjs sales.csv --city Giza --limit 5 --top 2
صفوف محسوبة: 5 (مدينة Giza)
الإيراد: 541.00
  Giza                        541.00
أكتر منتجات بالكمية: oil 24
سطور بايظة: 0
اتقرا 0.1 MB في 20ms، وأقصى ذاكرة 65 MB
(exit 0)
~~~

- [[--limit -5]]: [[parseArgs]] نفسه رفضه لأن [[-5]] شكلها option تانية، ورسالته بتقترح [[--limit=-5]]. ولما اتكتبت كده عدّت من [[parseArgs]] ووقفت عند فحصنا [[limit > 0]].
- الملف الفاضي: [[rows]] بترمي [[CsvError]] بعد الـ loop لو مفيش header، والـ CLI بيطبع اسمه ورسالته بس من غير stack trace.
- [[--city Giza --limit 5]]: قرا 0.1 MB بس من 35.2 MB، لأن الـ [[break]] قفل الملف.

### المقارنة: سطر سطر ولا الملف كله

~~~text الناتج: نفس التقرير بالطريقتين، وبعدين بـ heap مقفول على 64 MB
$ node eager.mjs sales.csv
صفوف: 999674 | 2074ms | ذاكرة 574 MB
$ node cli.mjs sales.csv  (آخر سطر)
اتقرا 35.2 MB في 1742ms، وأقصى ذاكرة 159 MB
$ node --max-old-space-size=64 eager.mjs sales.csv
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
$ node --max-old-space-size=64 cli.mjs sales.csv  (آخر سطر)
اتقرا 35.2 MB في 2621ms، وأقصى ذاكرة 137 MB
~~~

- الملف كله ([[readFileSync]] و [[split]] و [[Array.fromAsync]]): 574 MB ذاكرة عشان ملف 35 MB (النص نفسه، ومليون string للسطور، ومليون object للصفوف).
- سطر سطر: 160 MB، وأغلبها garbage لسه الـ GC ملمّهوش. ولما قفلنا الـ heap على 64 MB، الـ GC اشتغل أكتر (الوقت زاد من 1.7 لـ 2.6 ثانية) والأداة خلصت، والنسخة التانية وقعت. ده الفرق الحقيقي: الذاكرة بتاعة سطر سطر **ثابتة** مهما كبر الملف.

**الغلطات اللي حصلت وأنا ببنيه (حقيقية، واتصلحت):**

1. **الملف فضل مفتوح بعد [[--limit]].** أول [[readLines]] كان [[yield* rl]] و [[rl.close()]] بس. الاختبار اللي بيتأكد إن الـ stream اتقفل وقع:

~~~text الناتج من النسخة الأولى: node --test
✖ limit: بيقف بدري ويقفل الـ stream قبل آخر الملف (12.2218ms)
ℹ pass 7
ℹ fail 1
  AssertionError [ERR_ASSERTION]: الملف لسه مفتوح بعد ما التقرير وقف
    actual: false,
    expected: true,
~~~

الـ [[break]] في [[summarize]] قفل الـ generators والـ readline، بس الـ file stream وقف وفضل مفتوح (درس «AsyncIterator و async generators»، القسم ٧). الحل [[input.destroy()]] في الـ [[finally]].

2. **عدّاد البايتات كان بيغيّر اللي بيقيسه.** أول نسخة كانت بتعدّ البايتات بـ [[input.on('data', ...)]]. ده بيحط الـ stream في flowing mode، فلما جرّبت من غير [[destroy]] على ملف 35 MB بـ [[highWaterMark]] صغير، العدّاد وصل للملف كله بعد الـ [[break]]. القياس نفسه كان بيقرا الملف! بدّلته بـ [[input.bytesRead]] اللي بيتقري في الـ [[finally]] من غير ما يأثّر على القراية.

3. **[[--limit]] كان بيقرا صف زيادة.** أول نسخة من [[summarize]] كان فيها [[if (count >= limit) break]] **أول** الـ loop، فبعد ما توصل للـ limit بيطلب صف كمان عشان يكتشف إنه خلص. نقلته بعد الجمع، فالـ loop بيقف أول ما العدد يكمل.` },
        { lvl: 'فكرة', t: R`collection بتاعتك بتتكلم لغة JavaScript كلها`, what: R`اختار data structure بتحتاجه (قايمة مترتبة، أو ring buffer للوجات، أو range أرقام أو تواريخ، أو tree)، واعمله class بتشتغل مع كل حاجة في اللغة: [[for...of]] و spread و destructuring ([[Symbol.iterator]])، و [[for await]] ([[Symbol.asyncIterator]])، و iterator helpers، واسم واضح في [[console.log]] ([[Symbol.toStringTag]])، و [[String()]] و [[+]] ([[Symbol.toPrimitive]])، و [[instanceof]] حتى لو فيه نسختين من الكود ([[Symbol.hasInstance]] بـ [[Symbol.for]]). من الوحدة كلها.`, done: R`الـ class بتاعتك بتعدّي على: [[[...x]]] و [[const [a, b] = x]] و [[Math.max(...x)]] و [[await Array.fromAsync(x)]] و [[x.values().filter(...).toArray()]] و [[String(x)]] و [[console.log(x)]] باسم مفهوم، و [[instanceof]] بيقول [[true]] لنسخة من نفس الـ class و [[false]] لـ [[structuredClone]] منها. وكتبت جملة لكل Symbol استخدمته: ليه.`, ext: R`خلّي [[Symbol.hasInstance]] يشتغل بين نسختين من الـ module فعلًا (اعمل نسخة من الملف باسم تاني واستورد الاتنين)، وزوّد [[Symbol.dispose]] لما Node يدعم [[using]] من غير flags، واكتب اختبارات بـ [[node --test]] لكل بروتوكول.`, sol: R`**نسخة نموذجية:** [[SortedList]]: قايمة بتفضل مترتبة وانت بتضيف (binary search على مكان كل عنصر جديد)، وبتاخد دالة مقارنة لأي نوع. اخترتها لأنها حاجة بتتحتاج فعلًا (أسعار، مواعيد، ترتيب أبجدي عربي) و الـ array العادية بتتطلب [[sort]] بعد كل إضافة.

~~~text الناتج: node sorted-list.mjs
[ 12, 12, 30, 45, 50, 99 ] 6 12, 12, 30, 45, 50, 99 6 12, 12, 30, 45, 50, 99
[object SortedList(6)] SortedList [SortedList(6)] {}
[ '34.20', '51.30', '57.00', '112.86' ]
[ 30, 45, 50 ] [ 12, 12 ]
12 12 99
[ 12, 12, 30, 45, 50, 99 ]
برتقال ، تفاح ، موز
[ 1, 2 ]
true false true
~~~

~~~js sorted-list.mjs
// sorted-list.mjs: collection بتفضل مترتبة، وبتتكلم لغة JavaScript كلها بالـ well-known symbols
const BRAND = Symbol.for('shop.SortedList');

export class SortedList {
  #items = [];
  #compare;
  constructor(iterable = [], compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
    this.#compare = compare;
    Object.defineProperty(this, BRAND, { value: true });
    for (const x of iterable) this.add(x);
  }
  add(x) {
    let lo = 0, hi = this.#items.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (this.#compare(this.#items[mid], x) <= 0) lo = mid + 1; else hi = mid; }
    this.#items.splice(lo, 0, x);
    return this;
  }
  get size() { return this.#items.length; }
  *[Symbol.iterator]() { yield* this.#items; }
  values() { return this[Symbol.iterator](); }
  *between(min, max) {
    for (const x of this.#items) {
      if (this.#compare(x, max) > 0) return;
      if (this.#compare(x, min) >= 0) yield x;
    }
  }
  async *[Symbol.asyncIterator]() { for (const x of this.#items) yield x; }
  get [Symbol.toStringTag]() { return 'SortedList(' + this.size + ')'; }
  [Symbol.toPrimitive](hint) { return hint === 'number' ? this.size : this.#items.join(', '); }
  static [Symbol.hasInstance](x) { return x !== null && typeof x === 'object' && x[BRAND] === true; }
}

const prices = new SortedList([45, 12, 99, 30]);
prices.add(50).add(12);
console.log([...prices], prices.size, String(prices), +prices, $__bt$__{prices}$__bt);
console.log(Object.prototype.toString.call(prices), prices);
console.log(prices.values().filter((p) => p > 20).map((p) => p * 1.14).toArray().map((p) => p.toFixed(2)));
console.log([...prices.between(20, 50)], prices.between(0, 1e9).take(2).toArray());
const [cheapest, second] = prices;
console.log(cheapest, second, Math.max(...prices));
console.log(await Array.fromAsync(prices));
const words = new SortedList(['موز', 'تفاح', 'برتقال'], (a, b) => a.localeCompare(b, 'ar'));
console.log([...words].join(' ، '));
const byDate = new SortedList([{ id: 2, at: '2026-11-21' }, { id: 1, at: '2026-11-01' }], (a, b) => a.at.localeCompare(b.at));
console.log([...byDate].map((o) => o.id));
console.log(prices instanceof SortedList, structuredClone(prices) instanceof SortedList, { [Symbol.for('shop.SortedList')]: true } instanceof SortedList);
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل Symbol وليه:**

| الحتة | بتخلّي إيه يشتغل | ليه بالشكل ده |
|---|---|---|
| [[ *[Symbol.iterator]() ]] | spread و [[for...of]] و destructuring و [[Math.max(...)]] | generator بـ [[yield*]] على الـ array الداخلية: كل لفة iterator جديد، ومحدش يقدر يعدّل [[#items]] من برّه |
| [[values()]] | [[filter]] و [[map]] و [[take]] (iterator helpers) | بترجّع generator object، وده بيورث من [[Iterator.prototype]] فالـ helpers موجودة ببلاش |
| [[ *between(min, max) ]] | تاخد نطاق من غير ما تلف على الكل | generator بيقف بـ [[return]] أول ما يعدّي [[max]]، لأن القايمة مترتبة |
| [[ async *[Symbol.asyncIterator]() ]] | [[for await]] و [[Array.fromAsync]] | عشان تتحط في أي pipeline async (زي [[summarize]] في المشروع الكبير) |
| [[ get [Symbol.toStringTag]() ]] | [[[object SortedList(6)]]] و [[console.log]] | getter عشان الحجم يبان في اللوج |
| [[ [Symbol.toPrimitive](hint) ]] | [[+list]] = الحجم، و [[String(list)]] = العناصر | رقم في الحساب ونص في العرض (درس «valueOf و toString و Symbol.toPrimitive») |
| [[ static [Symbol.hasInstance] ]] | [[instanceof]] بيفحص علامة مش السلسلة | العلامة [[Symbol.for('shop.SortedList')]]: لو المكتبة اتحمّلت مرتين في نفس البرنامج، القايمة من نسخة بتبقى [[instanceof]] النسخة التانية |

**القرارات والغلطات:**

- **العلامة ظهرت في [[console.log]].** أول نسخة كانت [[this[BRAND] = true]]، والناتج كان [[SortedList [SortedList(6)] { Symbol(shop.SortedList): true }]]: الـ Symbol مستخبي من [[keys]] و JSON بس مش من [[console.log]] (درس Symbol). بقت [[Object.defineProperty(this, BRAND, { value: true })]] (non-enumerable) فالعرض بقى [[SortedList [SortedList(6)] {}]].
- **التمن بتاع [[hasInstance]]:** آخر سطر في الناتج: object عادي فيه العلامة طلع [[true]]. ده مقبول لأن العلامة متسجّلة باسم بـ namespace ومحدش هيكتبها بالصدفة، بس مش حماية. لو محتاج تأكيد حقيقي إنها class بتاعتك، [[#items in x]] (brand check بالـ private field) أدق، بس مبيعدّيش بين نسختين من الـ module.
- **[[structuredClone(prices)]] طلع [[false]]:** الـ clone بينسخ الخصايص العادية بس (لا [[#items]] ولا العلامة non-enumerable ولا الـ prototype)، فالنتيجة object فاضي. لو محتاج تبعت القايمة لـ worker، ابعت [[[...list]]] واعمل واحدة جديدة هناك.
- **شلت [[Symbol.isConcatSpreadable]]:** كان في الخطة، بس [[concat]] بيقرا [[length]] والعناصر بأرقام ([[ list[0] ]])، والـ class دي معندهاش indices. إنك تزوّدهم عشان [[concat]] بس مش مستاهل: [[[...a, ...list]]] بيعمل نفس الشغل.` },
      ],
      items: [
        {
          cmd: "Symbol: description و Symbol.for و Symbol.keyFor",
          title: "Symbol يعني إيه، وليه مفتاح Symbol عمره ما يخبط في مفتاح تاني؟",
          desc: R`[[Symbol('id')]] بيعمل قيمة primitive جديدة **فريدة**: مفيش اتنين Symbols متساويين أبدًا حتى لو ليهم نفس الوصف. فلما تستخدمه كمفتاح في object ([[ obj[id] = 101 ]]) مفيش كود تاني يقدر يكتب فوقه بالغلط، وهو مش بيظهر في [[Object.keys]] ولا [[for...in]] ولا [[JSON.stringify]].

• [[sym.description]]: الوصف اللي اديته ([['id']]) كنص، للّوج والـ debugging بس.
• [[Symbol.for('app.cache')]]: بيدوّر في registry عام للبرنامج كله: لو فيه Symbol بالمفتاح ده بيرجّعه، وإلا بيعمله ويسجّله. فكل الملفات (وحتى الـ iframes) بتاخد **نفس** الـ Symbol.
• [[Symbol.keyFor(sym)]]: العكس: بيرجّع المفتاح لو الـ Symbol متسجّل، و [[undefined]] لو اتعمل بـ [[Symbol()]].

والـ Symbol مش بيتحوّل لنص لوحده: [['key: ' + sym]] بترمي [[TypeError: Cannot convert a Symbol value to a string]]، فاستخدم [[String(sym)]] أو [[sym.description]].`,
          example: R`// Symbol: مفتاح محدش يقدر يكتب فوقه بالغلط
const id = Symbol('id');
const id2 = Symbol('id');
console.log(id === id2, typeof id, id.description, String(id));
const user = { name: 'Sara', [id]: 101 };
console.log(user[id], Object.keys(user), JSON.stringify(user));
for (const key in user) console.log('for...in شاف:', key);
console.log(Object.getOwnPropertySymbols(user), Reflect.ownKeys(user));
const k1 = Symbol.for('app.cache');
const k2 = Symbol.for('app.cache');
console.log(k1 === k2, Symbol.keyFor(k1), Symbol.keyFor(id));
try { console.log('key: ' + id); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
console.log('key: ' + id.description, $__btkey: $__{String(id)}$__bt);`,
          try: R`اعمل object [[order]] فيه [[cache]] عادي، وخلّي «مكتبتين» يكتبوا عليه [[order.cache = ...]] واحدة ورا التانية، واطبع: التانية مسحت الأولى. وبعدين كرّر بـ [[const cacheA = Symbol('cache')]] و [[const cacheB = Symbol('cache')]] (نفس الوصف)، واطبع [[order]] كله و [[{ ...order }]] و [[structuredClone(order)]].`,
          sol: R`~~~js collide.mjs
const order = { id: 7, total: 250 };
order.cache = 'من مكتبة أ';
order.cache = 'من مكتبة ب';
console.log(order.cache);
const cacheA = Symbol('cache');
const cacheB = Symbol('cache');
order[cacheA] = 'أ'; order[cacheB] = 'ب';
console.log(order[cacheA], order[cacheB]);
console.log(order);
console.log({ ...order }, Object.assign({}, order)[cacheA]);
console.log(structuredClone(order));
~~~

~~~text الناتج (Node 24.22)
من مكتبة ب
أ ب
{
  id: 7,
  total: 250,
  cache: 'من مكتبة ب',
  Symbol(cache): 'أ',
  Symbol(cache): 'ب'
}
{
  id: 7,
  total: 250,
  cache: 'من مكتبة ب',
  Symbol(cache): 'أ',
  Symbol(cache): 'ب'
} أ
{ id: 7, total: 250, cache: 'من مكتبة ب' }
~~~

- المفتاح النصي [[cache]] واحد، فالمكتبة التانية كتبت فوق الأولى من غير أي تحذير.
- الـ Symbols الاتنين ليهم نفس الوصف بس هما **مفتاحين مختلفين**، فالقيمتين عايشين مع بعض. و [[console.log]] بيعرضهم الاتنين [[Symbol(cache)]] لأنه بيطبع الوصف بس.
- الـ spread و [[Object.assign]] **بينسخوا** مفاتيح الـ Symbol (بينسخوا كل own enumerable، نص أو Symbol).
- [[structuredClone]] **بيرميهم**: النسخة فيها المفاتيح النصية بس. وده نفس [[JSON.stringify]]. يعني الـ Symbol مكان كويس لداتا مؤقتة (كاش، metadata) متتبعتش للسيرفر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الـ ٣ سطور اللي هيطلعوا قبل ما تشغّل:

~~~js
const a = Symbol('x');
const b = Symbol.for('x');
console.log(a === Symbol('x'), b === Symbol.for('x'), a === b);
console.log(a.description, b.description, Symbol.keyFor(a), Symbol.keyFor(b));
console.log(Symbol().description, Symbol.for().description, Symbol.keyFor(Symbol.for()));
~~~`, done: R`كتبت السطور التلاتة وطلعوا زي ما كتبت، وتقدر تقول ليه [[Symbol.for()]] من غير مفتاح وصفه مش [[undefined]] الحقيقية.`, sol: R`~~~text الناتج (Node 24.22)
false true false
x x undefined x
undefined undefined undefined
~~~

- [[Symbol('x')]] كل مرة جديد، فـ [[a === Symbol('x')]] بـ [[false]]. و [[Symbol.for('x')]] بيرجّع نفس الـ Symbol من الـ registry، فـ [[true]]. و [[a]] مش متسجّل، فـ [[a === b]] بـ [[false]] مع إن الوصف واحد.
- [[description]] موجود في الاتنين ([[x]])، بس [[Symbol.keyFor(a)]] بـ [[undefined]] لأن [[a]] مش في الـ registry.
- السطر التالت شكله ٣ [[undefined]] بس **مش نفس الحاجة**: [[Symbol().description]] هي [[undefined]] فعلًا (اتعمل من غير وصف)، أما [[Symbol.for()]] فبيحوّل الـ argument الناقص لنص، فالمفتاح بقى النص [['undefined']]. اتجرّب: [[typeof Symbol.for().description]] بـ [['string']]، و [[Symbol.for() === Symbol.for('undefined')]] بـ [[true]]. ده سبب كفاية إنك متناديش [[Symbol.for]] من غير مفتاح.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[tag(obj, info)]] بتلزق metadata على أي object تحت مفتاح Symbol واحد [[META]] (بتدمج مع الموجود)، و [[getMeta(obj)]] بترجّعها أو [[{}]]. لازم الـ metadata متظهرش في الـ JSON ولا في [[Object.keys]].`, done: R`بعد [[tag]] مرتين على نفس المنتج، [[JSON.stringify(product)]] فيه [[sku]] و [[price]] بس، و [[getMeta(product)]] فيه القيمتين بآخر [[source]]، و [[getMeta({})]] بـ [[{}]].`, sol: R`~~~js meta.mjs
const META = Symbol('meta');
function tag(obj, info) {
  obj[META] = { ...obj[META], ...info };
  return obj;
}
const getMeta = (obj) => obj[META] ?? {};
const product = tag({ sku: 'TEA-1', price: 45 }, { fetchedAt: '2026-11-21', source: 'cache' });
tag(product, { source: 'api' });
console.log(JSON.stringify(product));
console.log(Object.keys(product), getMeta(product));
console.log(getMeta({ sku: 'X' }));
~~~

~~~text الناتج (Node 24.22)
{"sku":"TEA-1","price":45}
[ 'sku', 'price' ] { fetchedAt: '2026-11-21', source: 'api' }
{}
~~~

**الشرح:** [[META]] متعرّف مرة واحدة في الـ module، فأي كود معندوش المتغير ده مش هيوصل للمفتاح بالغلط. و [[{ ...obj[META], ...info }]]: لو مفيش metadata قبل كده [[ obj[META] ]] بـ [[undefined]]، والـ spread على [[undefined]] جوه object literal مبيرميش error، فبيشتغل من أول مرة. و [[??]] بيرجّع [[{}]] لو مفيش. **الغلطة الشائعة:** [[Symbol('meta')]] جوه [[tag]] نفسها: كل نداء يعمل Symbol جديد، فـ [[getMeta]] عمرها ما تلاقي حاجة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيقع في سطرين. اقرا الرسالتين وصلّح:

~~~js
const ORDER_STATUS = Symbol('status');
console.log('Log: ' + ORDER_STATUS);
const seen = new WeakMap();
seen.set(Symbol.for('session'), Date.now());
~~~`, done: R`الكود بيطبع [[Log: status]] من غير error، والـ WeakMap بقى مفتاحها Symbol بيتقبل، وتقدر تقول ليه [[Symbol.for]] اترفض.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
TypeError: Cannot convert a Symbol value to a string
TypeError: Invalid value used as weak map key
~~~

~~~js fixed.mjs
const ORDER_STATUS = Symbol('status');
console.log('Log: ' + ORDER_STATUS.description, 'Log: ' + String(ORDER_STATUS));
const seen = new WeakMap();
const sessionKey = Symbol('session');
seen.set(sessionKey, 1);
console.log(seen.has(sessionKey), seen.has(Symbol('session')));
~~~

~~~text الناتج (Node 24.22)
Log: status Log: Symbol(status)
true false
~~~

- **الأولى:** [[+]] مع نص بيحاول يحوّل الـ Symbol لنص لوحده، والـ Symbol بيرفض ده بقصد (عشان متعملش مفتاح نصي [["Symbol(status)"]] بالغلط وتفتكره هو). التحويل **الصريح** مسموح: [[String(sym)]] أو [[sym.description]].
- **التانية:** الـ WeakMap بيقبل Symbol كمفتاح (من ES2023) **بشرط** ميكونش متسجّل. اللي من [[Symbol.for]] عايش طول عمر البرنامج في الـ registry، فمينفعش «يضعف» ويتمسح، فبيترفض. استخدم [[Symbol()]] عادي.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[describeSymbol(sym)]] بترجّع [['registered:<key>']] لو متسجّل، و [['well-known:<name>']] لو من الـ well-known ([[Symbol.iterator]] مثلًا)، و [['local:<description>']] لغير كده (والوصف الفاضي يبقى [['local:']])، و [[null]] لو مش Symbol أصلًا.`, done: R`[[describeSymbol(Symbol.for('app.user'))]] بـ [['registered:app.user']]، و [[Symbol.iterator]] بـ [['well-known:iterator']]، و [[Symbol()]] بـ [['local:']]، و [['x']] بـ [[null]]، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js describe-symbol.mjs
function describeSymbol(sym) {
  if (typeof sym !== 'symbol') return null;
  const key = Symbol.keyFor(sym);
  if (key !== undefined) return 'registered:' + key;
  const wellKnown = Object.getOwnPropertyNames(Symbol).find((name) => Symbol[name] === sym);
  if (wellKnown) return 'well-known:' + wellKnown;
  return 'local:' + (sym.description ?? '');
}
console.log(describeSymbol(Symbol.for('app.user')), describeSymbol(Symbol.iterator), describeSymbol(Symbol('tmp')), describeSymbol(Symbol()), describeSymbol('x'));
console.log(describeSymbol(Symbol.for('')), describeSymbol(Symbol.asyncIterator));
~~~

~~~text الناتج (Node 24.22)
registered:app.user well-known:iterator local:tmp local: null
registered: well-known:asyncIterator
~~~

**الشرح:** الترتيب مهم: [[Symbol.keyFor]] الأول، لأن [[Symbol.for('')]] مفتاحه نص فاضي، فلازم نقارن بـ [[!== undefined]] مش بـ truthy (وإلا كان هيطلع [['local:']] غلط). والـ well-known مش متسجّلين في الـ registry ([[Symbol.keyFor(Symbol.iterator)]] بـ [[undefined]])، فبنلاقيهم بالمقارنة مع كل خاصية على [[Symbol]] نفسه بـ [[Object.getOwnPropertyNames]]. و [[sym.description ?? '']] عشان [[Symbol()]] وصفه [[undefined]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** الـ Symbol «مخفي» ولا «private»؟ اعمل class فيها [[#pin]] و [[ [secret] ]] (Symbol)، وحاول توصل للاتنين من برّه الـ class بـ [[Object.keys]] و [[JSON.stringify]] و [[Object.getOwnPropertySymbols]] و [[Reflect.ownKeys]].`, done: R`عرفت إن الـ Symbol اتقرا من برّه بـ [[getOwnPropertySymbols]]، والـ [[#pin]] مفيش أي طريقة توصله من برّه، وكتبت جملة: إمتى تختار ده وإمتى ده.`, sol: R`~~~js hidden-vs-private.mjs
const secret = Symbol('secret');
class Account {
  #pin = 1234;
  [secret] = 'S-99';
  checkPin(p) { return p === this.#pin; }
}
const acc = new Account();
console.log(Object.keys(acc), JSON.stringify(acc));
const found = Object.getOwnPropertySymbols(acc)[0];
console.log(found, acc[found]);
console.log(Reflect.ownKeys(acc));
try { console.log(eval('acc.#pin')); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
~~~

~~~text الناتج (Node 24.22)
[] {}
Symbol(secret) S-99
[ Symbol(secret) ]
SyntaxError: Private field '#pin' must be declared in an enclosing class
~~~

**الإجابة:** الـ Symbol **مستخبي من اللف العادي** (keys و JSON و for...in) بس **مش private**: أي حد يقدر يجيبه بـ [[Object.getOwnPropertySymbols]] أو [[Reflect.ownKeys]] ويقرا القيمة. أما [[#pin]] فمحمي من اللغة نفسها: حتى [[Reflect.ownKeys]] مبيشوفوش، والكود برّه الـ class مش بيتكمبايل أصلًا. فـ: [[#]] للأسرار والحالة الداخلية لـ class، والـ Symbol لـ «بروتوكول» أو metadata عايز كود تاني **يقدر** يستخدمها لو معاه المفتاح (زي [[Symbol.iterator]] بالظبط).` },
          ],
          check: { lang: "js", starter: R`function describeSymbol(sym) {
  // registered:<key> أو well-known:<name> أو local:<description> أو null
}`, tests: R`test("متسجّل", () => expect(describeSymbol(Symbol.for('app.user'))).toBe('registered:app.user'));
test("متسجّل بمفتاح فاضي", () => expect(describeSymbol(Symbol.for(''))).toBe('registered:'));
test("well-known", () => expect(describeSymbol(Symbol.iterator)).toBe('well-known:iterator'));
test("well-known تاني", () => expect(describeSymbol(Symbol.toStringTag)).toBe('well-known:toStringTag'));
test("local بوصف", () => expect(describeSymbol(Symbol('tmp'))).toBe('local:tmp'));
test("local من غير وصف", () => expect(describeSymbol(Symbol())).toBe('local:'));
test("مش Symbol", () => expect(describeSymbol('x')).toBe(null));`, solution: R`function describeSymbol(sym) {
  if (typeof sym !== 'symbol') return null;
  const key = Symbol.keyFor(sym);
  if (key !== undefined) return 'registered:' + key;
  const wellKnown = Object.getOwnPropertyNames(Symbol).find((name) => Symbol[name] === sym);
  if (wellKnown) return 'well-known:' + wellKnown;
  return 'local:' + (sym.description ?? '');
}` },
          flag: "script",
          deep: {
            why: R`أي كود بيلزق حاجة على object مش بتاعه (مكتبة كاش، framework بيعلّم الـ objects اللي عملها، أداة debugging) معرّض إنه يخبط في مفتاح موجود أو يتخبط فيه. الـ Symbol بيحل ده من غير اتفاق على أسامي: المفتاح فريد بطبيعته. وده نفس السبب اللي خلّى اللغة نفسها تضيف [[Symbol.iterator]] و [[Symbol.toPrimitive]] من غير ما تكسر كود قديم كان عنده خاصية اسمها [[iterator]].`,
            how: R`[[Symbol(desc)]] بيعمل قيمة primitive سابع (بعد string و number و bigint و boolean و undefined و null) جديدة كل مرة، والوصف بيتحفظ جواها للعرض بس ومبيدخلش في المقارنة. والمفاتيح في الـ object نوعين بس: string و Symbol، وأي حاجة تانية بتتحوّل لـ string. فالـ object بيخزّن مفاتيح الـ Symbol في نفس جدول الخصايص، بس الـ operations اللي «بتعدّ» المفاتيح ([[Object.keys]] و [[for...in]] و [[JSON.stringify]] و [[Object.entries]]) بتتخطاها بقصد، واللي بتنسخ ([[Object.assign]] و spread) بتاخدها.

[[Symbol.for(key)]] بيحوّل [[key]] لنص ويدوّر في جدول واحد للـ agent كله (حسب المواصفة الجدول ده مشترك بين كل الـ realms، زي الصفحة والـ iframes بتاعتها)، و [[Symbol.keyFor]] بيدوّر بالعكس. و [[new Symbol()]] ممنوع ([[TypeError: Symbol is not a constructor]]) عشان محدش يعمل wrapper object بالغلط، ولو محتاجه فعلًا: [[Object(sym)]].`,
            when: R`Symbol عادي ([[Symbol()]]): مفتاح داخلي لـ module أو مكتبة، metadata على objects مش بتاعتك، قيم enum مينفعش تتلخبط مع نص (مشروع «enum حالات الطلب» في الوحدة). [[Symbol.for]]: لما كذا نسخة من نفس المكتبة (أو كذا bundle أو iframe) لازم تتفق على نفس المفتاح، وده بيحصل فعلًا: React بيعلّم الـ objects اللي بيعملها بـ Symbol من [[Symbol.for]]، عشان نسختين من React في نفس الصفحة يعرفوا عناصر بعض. والمفتاح بيتكتب بـ namespace ([['myapp.cache']]) عشان الجدول عام لكل الكود. [[description]]: للّوج والرسايل بس، متبنيش عليه منطق.`,
            mistakes: R`- [[Symbol('x') === Symbol('x')]] مستنيها [[true]]: كل نداء جديد.
- تعمل الـ Symbol جوه الدالة اللي بتستخدمه، فكل مرة مفتاح جديد ومش لاقي القديم. اعمله مرة واحدة برّه.
- [[obj.sym]] بدل [[ obj[sym] ]]: النقطة معناها المفتاح النصي [['sym']].
- [['x' + sym]] أو template literal: [[TypeError: Cannot convert a Symbol value to a string]]. استخدم [[String(sym)]] أو [[description]].
- [[+sym]]: [[TypeError: Cannot convert a Symbol value to a number]].
- تفتكر الـ Symbol private: [[Object.getOwnPropertySymbols]] بيجيبه. الـ private الحقيقي [[#field]].
- تبعت object فيه Symbols في JSON أو [[structuredClone]] أو [[postMessage]] ومستني توصل: بتتشال. والـ Symbol نفسه كقيمة: [[JSON.stringify(sym)]] بـ [[undefined]]، وجوه array بيبقى [[null]]، و [[structuredClone(sym)]] بيرمي [[DataCloneError]] (اتجرّب: [[DOMException: Symbol(id) could not be cloned.]]).
- [[Symbol.for]] كمفتاح WeakMap: [[TypeError: Invalid value used as weak map key]].`,
          },
          teach: R`## الفكرة في سطر

الـ Symbol قيمة فريدة بتستخدمها كـ «اسم» لخاصية: مفيش حد يقدر يكتب نفس الاسم بالصدفة، فمفيش تصادم. كل الناتج من Node 24.22 على ويندوز 11 (ملف [[.mjs]]).

---

## ١. [[Symbol()]]: كل نداء قيمة جديدة

~~~js
const id = Symbol('id');
const id2 = Symbol('id');
console.log(id === id2, typeof id, id.description, String(id));
~~~

~~~text الناتج
false symbol id Symbol(id)
~~~

| الحتة | معناها |
|---|---|
| [[Symbol('id')]] | بيعمل Symbol جديد. الـ [[('id')]] **وصف** للعرض بس، مش اسم ومش مفتاح، ونفس الوصف مرتين = اتنين مختلفين |
| [[id === id2]] | [[false]]: كل Symbol ليه هوية لوحده، زي الـ objects، مع إنه primitive |
| [[typeof id]] | [['symbol']]: نوع primitive لوحده (السابع) |
| [[String(id)]] | التحويل الصريح لنص بيدّي [['Symbol(id)']] |

ومن غير [[new]]: [[new Symbol('x')]] بيرمي [[TypeError: Symbol is not a constructor]].

---

## ٢. [[Symbol.prototype.description]]: الوصف كنص

[[id.description]] بيرجّع [['id']] من غير كلمة [[Symbol(...)]] حواليه. فيه ٣ حالات اتجرّبت:

| الـ Symbol | [[description]] |
|---|---|
| [[Symbol('id')]] | [['id']]: الوصف زي ما كتبته |
| [[Symbol('')]] | [['']]: نص فاضي، بس موجود |
| [[Symbol()]] | [[undefined]]: مفيش وصف خالص |

وهو **للقراية بس**: مينفعش تغيّره، ومتبنيش عليه أي مقارنة، لأن ألف Symbol ممكن يبقى ليهم نفس الوصف.

---

## ٣. Symbol كمفتاح: مستخبي من اللف

~~~js
const user = { name: 'Sara', [id]: 101 };
console.log(user[id], Object.keys(user), JSON.stringify(user));
for (const key in user) console.log('for...in شاف:', key);
console.log(Object.getOwnPropertySymbols(user), Reflect.ownKeys(user));
~~~

~~~text الناتج
101 [ 'name' ] {"name":"Sara"}
for...in شاف: name
[ Symbol(id) ] [ 'name', Symbol(id) ]
~~~

- [[ [id]: 101 ]] جوه الـ literal: الأقواس المربعة = computed key، يعني «المفتاح هو قيمة [[id]]» مش النص [['id']].
- [[ user[id] ]] بيقرا القيمة. ([[user.id]] بالنقطة كانت هتدوّر على مفتاح نصي اسمه [['id']] وترجّع [[undefined]].)
- [[Object.keys]] و [[JSON.stringify]] و [[for...in]]: مش شايفينه خالص.
- [[Object.getOwnPropertySymbols]]: مفاتيح الـ Symbol بس. و [[Reflect.ownKeys]]: الكل، نصوص الأول وبعدين Symbols (درس «enumerability و ownership»).

| الأداة | بتشوف مفاتيح الـ Symbol؟ |
|---|---|
| [[Object.keys]] و [[values]] و [[entries]] و [[for...in]] | لأ، بتتخطاها بقصد |
| [[JSON.stringify]] و [[structuredClone]] | لأ، بتتشال من النسخة |
| spread [[{ ...obj }]] و [[Object.assign]] | أيوه، بتتنسخ مع المفاتيح النصية |
| [[Object.getOwnPropertySymbols]] و [[Reflect.ownKeys]] | أيوه، ودول الطريقة الوحيدة تعدّها |
| [[in]] و [[Object.hasOwn]] | أيوه ([[id in user]] بـ [[true]]) |

---

## ٤. [[Symbol.for]] و [[Symbol.keyFor]]: الـ registry العام

~~~js
const k1 = Symbol.for('app.cache');
const k2 = Symbol.for('app.cache');
console.log(k1 === k2, Symbol.keyFor(k1), Symbol.keyFor(id));
~~~

~~~text الناتج
true app.cache undefined
~~~

- [[Symbol.for('app.cache')]]: «دوّر في الجدول العام على المفتاح [['app.cache']]: لو موجود رجّعه، لو لأ اعمله وسجّله». فالنداء التاني رجّع **نفس** الـ Symbol، و [[k1 === k2]] بـ [[true]].
- [[Symbol.keyFor(k1)]]: بيرجّع المفتاح [['app.cache']]. و [[Symbol.keyFor(id)]] بـ [[undefined]] لأن [[id]] اتعمل بـ [[Symbol()]] ومش في الجدول.
- الجدول ده واحد للبرنامج كله، فاكتب المفتاح بـ namespace ([['myapp.cache']] مش [['cache']]) عشان متتلاقيش مع مكتبة تانية.

| | [[Symbol('x')]] | [[Symbol.for('x')]] |
|---|---|---|
| نداءين بنفس النص | اتنين مختلفين | نفس الواحد |
| [[Symbol.keyFor]] | [[undefined]] | [['x']] |
| ينفع مفتاح WeakMap | أيوه | لأ: [[TypeError: Invalid value used as weak map key]] |
| بيتشاف من ملف تاني من غير import | لأ، لازم المتغير نفسه | أيوه، بنفس النص |

---

## ٥. مبيتحوّلش لنص لوحده

~~~js
try { console.log('key: ' + id); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
console.log('key: ' + id.description, $__btkey: $__{String(id)}$__bt);
~~~

~~~text الناتج
TypeError: Cannot convert a Symbol value to a string
key: id key: Symbol(id)
~~~

ده بقصد: لو [['key: ' + id]] كانت بتشتغل، كان سهل تعمل مفتاح نصي [['Symbol(id)']] وتفتكره الـ Symbol. فالتحويل **الضمني** ممنوع (نص و template literal و رقم: [[+id]] بيرمي [[Cannot convert a Symbol value to a number]])، والصريح مسموح: [[String(id)]] و [[id.toString()]] و [[id.description]]. والـ boolean عادي: أي Symbol truthy.

---

## الخلاصة

- [[Symbol()]] قيمة فريدة، والوصف للعرض بس، و [[description]] بيقراه.
- مفتاح Symbol مستخبي من [[keys]] و [[for...in]] و JSON، بس **مش private**: [[getOwnPropertySymbols]] بيجيبه.
- [[Symbol.for]] = نفس الـ Symbol لنفس النص في البرنامج كله، و [[Symbol.keyFor]] العكس.
- التحويل لنص بإيدك بس: [[String(sym)]] أو [[sym.description]].
- الدرس الجاي: الـ Symbols اللي اللغة نفسها عاملاها (well-known) وبتسأل عنها الـ objects بتاعتك.`,
          lines: [
            R`بيعمل Symbol جديد بوصف [['id']]. الوصف للعرض بس، القيمة نفسها فريدة.`,
            R`Symbol تاني بنفس الوصف بالظبط، عشان نثبت إنهم مش متساويين.`,
            R`بيطبع [[false]] (مختلفين)، و [[symbol]] نوعه، و [[id]] الوصف، و [[Symbol(id)]] لما حوّلناه لنص بإيدنا.`,
            R`object فيه مفتاح نصي [[name]] ومفتاح Symbol [[ [id] ]]: الأقواس المربعة معناها «المفتاح هو قيمة المتغير».`,
            R`[[ user[id] ]] بيرجّع 101، بس [[Object.keys]] شايف [['name']] بس، والـ JSON فيه [[name]] بس.`,
            R`[[for...in]] بيلف على المفاتيح النصية enumerable بس، فطبع سطر واحد: [[name]].`,
            R`[[getOwnPropertySymbols]] جاب مفتاح الـ Symbol، و [[Reflect.ownKeys]] جاب الاتنين: النص الأول وبعدين الـ Symbol.`,
            R`[[Symbol.for]] بيدوّر في الـ registry العام على [['app.cache']]: مش موجود، فبيعمله ويسجّله.`,
            R`نفس المفتاح تاني: المرة دي لقاه، فرجّع نفس الـ Symbol.`,
            R`[[true]] لأنهم نفس القيمة، و [[keyFor]] رجّع المفتاح [[app.cache]]، و [[undefined]] لـ [[id]] لأنه مش متسجّل.`,
            R`لزق Symbol في نص بـ [[+]] بيرمي TypeError، والـ [[catch]] بيطبع اسم الخطأ ورسالته.`,
            R`الطريقة الصح: [[description]] بيدّي [[id]]، و [[String(id)]] جوه الـ template بيدّي [[Symbol(id)]] من غير error.`,
          ],
          ref: [
            { t: "MDN: Symbol", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol" },
            { t: "MDN: Symbol.prototype.description", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description" },
            { t: "MDN: Symbol.for()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for" },
            { t: "MDN: Symbol.keyFor()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor" },
            { t: "ECMAScript: Symbol Objects", url: "https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-symbol-objects" },
          ],
          pre: [{ to: "js/primitives و objects", why: R`الـ primitives السبعة، والـ Symbol واحد منهم` }, { to: "js/enumerability و ownership", why: R`[[Reflect.ownKeys]] و [[getOwnPropertySymbols]] ومين بيشوف أنهي مفتاح` }, { to: "js/WeakMap و WeakSet", why: R`مفاتيح الـ WeakMap وليه [[Symbol.for]] بيترفض` }],
        },
        {
          cmd: "well-known symbols: Symbol.toStringTag و isConcatSpreadable",
          title: "الـ Symbols اللي اللغة نفسها بتدوّر عليها في الـ object بتاعك: جدول كلهم، و toStringTag و isConcatSpreadable",
          desc: R`الـ **well-known symbols** هما ١٣ Symbol جاهزين على [[Symbol]] نفسه ([[Symbol.iterator]] و [[Symbol.toStringTag]] و [[Symbol.match]]...). كل واحد فيهم «سؤال» اللغة بتسأله للـ object بتاعك في لحظة معيّنة: [[for...of]] بيسأل [[ obj[Symbol.iterator] ]]، و [[Object.prototype.toString]] بيسأل [[ obj[Symbol.toStringTag] ]]، و [[concat]] بيسأل [[ obj[Symbol.isConcatSpreadable] ]]. لو عرّفت الـ method أو الخاصية دي، سلوك اللغة مع الـ object بتاعك بيتغيّر.

الدرس ده فيه جدول بكل الـ ١٣ ومين بيسأل كل واحد وفين اتشرح، وبعدين التلاتة اللي ملهمش درس تاني: [[Symbol.toStringTag]] (اسم النوع في [[[object X]]])، و [[Symbol.isConcatSpreadable]] (هل [[concat]] يفرد الـ object)، و [[Symbol.species]] على [[Promise]] و [[RegExp]].`,
          example: R`// الـ well-known symbols: أسئلة اللغة بتسألها للـ object بتاعك
const tag = (x) => Object.prototype.toString.call(x);
console.log(tag([]), tag(new Map()), tag(Promise.resolve()), tag(null));
class Cart {
  items = ['tea', 'rice'];
  get [Symbol.toStringTag]() { return 'Cart'; }
  [Symbol.iterator]() { return this.items.values(); }
}
const cart = new Cart();
console.log(tag(cart), String(cart), [...cart]);
const pair = { length: 2, 0: 'a', 1: 'b', [Symbol.isConcatSpreadable]: true };
console.log([1].concat(pair), [1].concat([2, 3]));
const keep = [2, 3];
keep[Symbol.isConcatSpreadable] = false;
console.log([1].concat(keep).length);
class Tracked extends Promise {}
console.log(Tracked.resolve(1).then((x) => x) instanceof Tracked, Promise[Symbol.species] === Promise);`,
          try: R`اعمل class اسمها [[Cart]] فيها getter [[ [Symbol.toStringTag] ]] بيرجّع [['ShoppingCart']] (اسم **مختلف** عن اسم الـ class)، واطبع [[new Cart()]] بـ [[console.log]] و [[String(new Cart())]]. وبعدين اعمل object عادي فيه [[ [Symbol.toStringTag]: 'Array' ]] وقارن [[Object.prototype.toString.call]] عليه بـ [[Array.isArray]].`,
          sol: R`~~~js tag-try.mjs
class Cart { get [Symbol.toStringTag]() { return 'ShoppingCart'; } }
console.log(new Cart());
console.log(String(new Cart()));
const fake = { [Symbol.toStringTag]: 'Array' };
console.log(Object.prototype.toString.call(fake), Array.isArray(fake));
~~~

~~~text الناتج (Node 24.22)
Cart [ShoppingCart] {}
[object ShoppingCart]
[object Array] false
~~~

- Node بيكتب اسم الـ class ([[Cart]]) وجنبه الـ tag بين أقواس مربعة لما يختلفوا. ولما يبقوا زي بعض (المثال فوق) بيكتب [[Cart {}]] بس.
- الـ tag **بيتزوّر بسهولة**: object عادي قال إنه [['Array']] و [[toString]] صدّقه. فـ [[Object.prototype.toString]] ينفع للعرض واللوج، **مش** لفحص النوع: استخدم [[Array.isArray]] و [[instanceof]] والـ brand checks (زي [[#field in obj]]).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب السطرين قبل التشغيل:

~~~js
const t = (x) => Object.prototype.toString.call(x);
class User {}
class Order { get [Symbol.toStringTag]() { return 'Order'; } }
console.log(t(new User()), t(new Order()), t(undefined), t(function* () {}), t(1n));
console.log(t({ [Symbol.toStringTag]: 'Array' }), Array.isArray({ [Symbol.toStringTag]: 'Array' }));
~~~`, done: R`كتبت السطرين صح، وتقدر تقول ليه [[User]] طلعت [[Object]] مع إن ليها اسم.`, sol: R`~~~text الناتج (Node 24.22)
[object Object] [object Order] [object Undefined] [object GeneratorFunction] [object BigInt]
[object Array] false
~~~

- [[class User {}]] من غير tag: [[toString]] **مش** بيستخدم اسم الـ class (ده [[constructor.name]])، فبيقول [[Object]].
- [[Order]] عرّفت الـ tag فظهر.
- [[undefined]] و [[null]] ليهم حالة خاصة في [[toString]]: [[Undefined]] و [[Null]].
- الـ generator function و BigInt عندهم tag جاهز على الـ prototype ([[ GeneratorFunction.prototype[Symbol.toStringTag] ]] و [[ BigInt.prototype[Symbol.toStringTag] ]]).
- آخر سطر: الـ tag اتزوّر، و [[Array.isArray]] (اللي بيفحص النوع الحقيقي جوه المحرك) قال [[false]].` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[typeName(x)]] بترجّع اسم النوع زي ما [[Object.prototype.toString]] شايفه، من غير الكلمة [[[object ]]] والقوس اللي في الآخر: [['Null']] و [['Array']] و [['Map']] و [['AsyncFunction']]، والـ classes اللي ليها tag باسمها.`, done: R`[[typeName(null)]] بـ [['Null']]، و [[typeName([])]] بـ [['Array']]، و [[typeName(new Map())]] بـ [['Map']]، و [[typeName(new Invoice())]] بـ [['Invoice']] لو فيها tag، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js type-name.mjs
function typeName(x) {
  return Object.prototype.toString.call(x).slice(8, -1);
}
class Invoice { get [Symbol.toStringTag]() { return 'Invoice'; } }
console.log([null, undefined, [], {}, new Map(), new Date(0), /x/, 5, 'a', Symbol(), 1n, async () => {}, new Invoice()].map(typeName).join(' '));
console.log(typeof null, typeof [], typeof new Map());
~~~

~~~text الناتج (Node 24.22)
Null Undefined Array Object Map Date RegExp Number String Symbol BigInt AsyncFunction Invoice
object object object
~~~

**الشرح:** [[[object ]]] طولها ٨ حروف، فـ [[slice(8, -1)]] بيشيلها ويشيل القوس المربع الأخير. و [[.call(x)]] لازم: لو كتبت [[x.toString()]] هتنادي [[toString]] بتاعة النوع نفسه (الـ array بترجّع العناصر مفصولة بـ [[,]]، و [[null.toString()]] بترمي TypeError). والسطر التاني بيوضح ليه الدالة دي أدق من [[typeof]] اللي بيقول [[object]] للتلاتة. بس افتكر: للعرض واللوج، مش للأمان.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class RowList extends Array]] بتمثّل صفوف جدول (كل صف array). عايز [[[header].concat(rows)]] يحط الـ [[RowList]] كلها كعنصر **واحد** (مش يفرد الصفوف)، بـ [[Symbol.isConcatSpreadable]].`, done: R`[[[header].concat(rows)]] طوله 2 والعنصر التاني هو [[rows]] نفسها (بـ [[===]])، و [[concat]] على array صفوف عادية طوله 3.`, sol: R`~~~js row-list.mjs
class RowList extends Array {
  get [Symbol.isConcatSpreadable]() { return false; }
}
const header = ['name', 'qty'];
const rows = RowList.from([['tea', 3], ['rice', 7]]);
const table = [header].concat(rows);
console.log(table.length, table[1] === rows, table[1].length);
const flat = [header].concat([['tea', 3], ['rice', 7]]);
console.log(flat.length);
~~~

~~~text الناتج (Node 24.22)
2 true 2
3
~~~

**الشرح:** [[concat]] بيسأل كل argument: [[ arg[Symbol.isConcatSpreadable] ]]. لو [[undefined]] (الافتراضي) بيفرد الـ arrays بس، ولو [[false]] مبيفردش حتى لو array، ولو [[true]] بيفرد أي object عنده [[length]]. الـ getter على الـ prototype بيطبّق القاعدة على كل [[RowList]] من غير ما تحطها على كل واحدة بإيدك. والـ spread ([[[...rows]]]) **مش** بيسأل الـ Symbol ده خالص: بيستخدم [[Symbol.iterator]]، فبيفرد عادي.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[TimedPromise]] بتعدّ كل مرة بتتعمل فيها. الكود ده المفروض يعمل واحدة بس، بس العدّاد بيقول رقم أكبر بكتير. لاقي الرقم الحقيقي، وليه، وصلّحه بـ [[Symbol.species]]:

~~~js
let created = 0;
class TimedPromise extends Promise {
  constructor(executor) { super(executor); created++; }
}
const p = TimedPromise.resolve(5).then((x) => x + 1).then((x) => x * 2).finally(() => {});
await p;
console.log('created', created, p instanceof TimedPromise);
~~~`, done: R`قبل التصليح العدّاد بـ 8، وبعده بـ 1 والناتج 12، وتقدر تقول [[then]] و [[finally]] بيعملوا Promise جديدة من أنهي class.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
created 8 true
~~~

كل [[then]] بترجّع Promise **جديدة**، وبتعملها بـ [[ this.constructor[Symbol.species] ]]، واللي افتراضيًا هو الـ class نفسها. فكل [[then]] و [[finally]] بيعملوا [[TimedPromise]] (و [[finally]] بتنادي [[then]] من جوه وبتعمل كمان). النتيجة ٨ مع إنك كتبت سطر واحد.

~~~js timed-fixed.mjs
let created = 0;
class TimedPromise2 extends Promise {
  static get [Symbol.species]() { return Promise; }
  constructor(executor) { super(executor); created++; }
}
const p2 = TimedPromise2.resolve(5).then((x) => x + 1).then((x) => x * 2).finally(() => {});
console.log(await p2, 'created', created, p2 instanceof TimedPromise2);
~~~

~~~text الناتج (Node 24.22)
12 created 1 false
~~~

**الشرح:** [[ static get [Symbol.species]() { return Promise; } ]] بيقول «النتايج المشتقة مني تبقى Promise عادية». فالعدّاد 1 (الـ [[resolve]] بس، لأن الـ static methods زي [[resolve]] و [[all]] بتستخدم [[this]] مش الـ species). والتمن: [[p2]] بقت Promise عادية، فأي method زوّدتها في الـ class مش هتبقى موجودة بعد أول [[then]]. اختار حسب اللي محتاجه.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من غير ما تبص في الدرس، اكتب سكربت بيلف على كل الـ constructors الـ global وعلى الـ [[prototype]] بتاعهم، ويطبع لكل well-known symbol: مين عنده الخاصية دي **own**. مين الوحيد اللي عنده [[Symbol.hasInstance]]؟ وكام واحد عنده [[Symbol.toStringTag]]؟`, done: R`السكربت بيطبع ١٥ سطر (الـ ١٣ ومعاهم [[dispose]] و [[asyncDispose]])، ولقيت إن [[hasInstance]] على [[Function.prototype]] بس، والـ string methods الأربعة على [[RegExp.prototype]] بس، و [[isConcatSpreadable]] محدش عنده.`, sol: R`~~~js who-has.mjs
const wellKnown = Object.getOwnPropertyNames(Symbol).filter((n) => typeof Symbol[n] === 'symbol');
const globals = Object.getOwnPropertyNames(globalThis).filter((n) => /^[A-Z]/.test(n) && typeof globalThis[n] === 'function' || ['Math', 'JSON', 'Atomics', 'Reflect'].includes(n));
const where = {};
for (const name of wellKnown) where[name] = [];
for (const g of globals) {
  const C = globalThis[g];
  for (const [label, obj] of [[g, C], [g + '.prototype', C.prototype]]) {
    if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) continue;
    for (const name of wellKnown) if (Object.hasOwn(obj, Symbol[name])) where[name].push(label);
  }
}
for (const [name, list] of Object.entries(where)) console.log(name.padEnd(18), list.length, list.slice(0, 6).join(' '));
~~~

~~~text الناتج (Node 24.22)
asyncIterator      1 ReadableStream.prototype
hasInstance        1 Function.prototype
isConcatSpreadable 0
iterator           8 Array.prototype String.prototype Map.prototype Set.prototype Iterator.prototype URLSearchParams.prototype
match              1 RegExp.prototype
matchAll           1 RegExp.prototype
replace            1 RegExp.prototype
search             1 RegExp.prototype
species            8 Array Promise RegExp ArrayBuffer Map Set
split              1 RegExp.prototype
toPrimitive        2 Symbol.prototype Date.prototype
toStringTag        63 Symbol.prototype Promise.prototype JSON Math ArrayBuffer.prototype Atomics
unscopables        1 Array.prototype
dispose            2 Iterator.prototype DisposableStack.prototype
asyncDispose       1 AsyncDisposableStack.prototype
~~~

**اللي يتقري من الجدول:** [[isConcatSpreadable]] صفر: مفيش built-in بيعرّفه، كله بيعتمد على [[Array.isArray]] الافتراضي. و [[asyncIterator]] ظهر مرة واحدة بس لأن الـ prototype اللي عليه ([[AsyncIterator.prototype]]) مش global (درس «AsyncIterator و async generators»)، و [[ReadableStream]] عنده نسخته. والسكربت بيشوف الـ globals بس: الـ generators والـ iterators بتوع [[Map]] مثلًا عندهم tags ([[Map Iterator]]) على prototypes مالهاش اسم global.` },
          ],
          check: { lang: "js", starter: R`function typeName(x) {
  // اسم النوع من Object.prototype.toString من غير [object و ]
}`, tests: R`test("null", () => expect(typeName(null)).toBe('Null'));
test("undefined", () => expect(typeName(undefined)).toBe('Undefined'));
test("array", () => expect(typeName([1])).toBe('Array'));
test("Map", () => expect(typeName(new Map())).toBe('Map'));
test("async function", () => expect(typeName(async () => {})).toBe('AsyncFunction'));
test("class بـ tag", () => { class Invoice { get [Symbol.toStringTag]() { return 'Invoice'; } } expect(typeName(new Invoice())).toBe('Invoice'); });
test("class من غير tag", () => { class User {} expect(typeName(new User())).toBe('Object'); });`, solution: R`function typeName(x) {
  return Object.prototype.toString.call(x).slice(8, -1);
}` },
          flag: "script",
          deep: {
            why: R`الـ well-known symbols هما الطريقة اللي اللغة بتفتح بيها «أبواب» في سلوكها لكودك من غير ما تكسر كود قديم. من غيرهم مكنش ينفع class بتاعتك تشتغل مع [[for...of]] أو [[instanceof]] أو [[str.replace]] أو تتحوّل لرقم بطريقتها. ولما تعرف الجدول، أي سلوك «غريب» في built-in ([[concat]] بيفرد ده ومبيفردش ده، [[then]] بيرجّع class غريبة) بيبقى ليه تفسير واحد: فيه Symbol اتسأل.`,
            how: R`كل well-known symbol قيمة ثابتة على [[Symbol]] (مش في الـ registry: [[Symbol.keyFor(Symbol.iterator)]] بـ [[undefined]])، ومشتركة بين كل الـ realms. والمواصفة بتكتب الخطوات بالظبط: [[Object.prototype.toString]] بيعمل [[Get(O, @@toStringTag)]] ولو الناتج نص بيستخدمه بدل الاسم الافتراضي، وإلا بيستخدم builtinTag ([[Array]] و [[Function]] و [[Error]] و [[Boolean]] و [[Number]] و [[String]] و [[Date]] و [[RegExp]] و [[Arguments]] أو [[Object]]). و [[Array.prototype.concat]] بيعمل IsConcatSpreadable: لو [[ O[@@isConcatSpreadable] ]] مش [[undefined]] بياخد قيمته كـ boolean، وإلا بيرجع لـ [[IsArray(O)]]. و [[Promise.prototype.then]] بيعمل SpeciesConstructor: بيقرا [[this.constructor]] وبعدين [[ [@@species] ]] منه، ولو [[undefined]] بيستخدم [[Promise]].

ولأن السؤال بيتعمل بـ [[Get]] عادي، الإجابة ممكن تبقى خاصية عادية، أو getter، أو موروثة من الـ prototype، أو حتى Proxy بيرد عليها.`,
            when: R`[[Symbol.toStringTag]]: لأي class بتاعتك هتظهر في لوج أو error أو debugger، عشان [[[object Object]]] متبقاش مكتوبة في كل حتة. [[Symbol.isConcatSpreadable]]: نادر، لـ array-like بتاعتك عايزها تتفرد في [[concat]]، أو subclass من Array عايزها تفضل عنصر واحد. [[Symbol.species]]: لما تعمل subclass من [[Promise]] أو [[Array]] أو [[RegExp]] وعايز تقرر النتايج المشتقة تبقى من الـ class بتاعتك ولا الأصلية. والباقيين ليهم دروس (الجدول).`,
            mistakes: R`- تستخدم [[Object.prototype.toString]] لفحص النوع في كود أمان: الـ tag بيتزوّر بسطر.
- تكتب [[obj.toStringTag = 'X']] (مفتاح نصي) بدل [[ obj[Symbol.toStringTag] ]].
- تفتكر الـ tag بيغيّر [[typeof]] أو [[instanceof]]: لأ خالص، ده للنص بس.
- تفتكر [[Symbol.species]] بيأثّر على [[TimedPromise.resolve]] و [[Promise.all]]: الـ static methods بتستخدم [[this]] (اتجرّب: [[Job.all([1]) instanceof Job]] بـ [[true]] حتى مع species = [[Promise]]).
- تفتكر [[Symbol.isConcatSpreadable]] بيأثّر على الـ spread أو [[flat]]: الاتنين مبيسألوهوش. ([[flat]] بيفحص [[Array.isArray]].)
- تنسى إن الـ getter على الـ prototype موروث لكل الـ subclasses: subclass ممكن تحتاج tag باسمها.`,
          },
          teach: R`## الفكرة في سطر

اللغة في لحظات معيّنة بتبص على الـ object بتاعك وتسأله سؤال بمفتاح Symbol ثابت. لو جاوبت، سلوكها بيتغيّر. الناتج من Node 24.22.

---

## ١. كل الـ well-known symbols في جدول واحد

| الـ Symbol | مين بيسأله | اتشرح فين |
|---|---|---|
| [[Symbol.iterator]] | [[for...of]] و spread و destructuring و [[Array.from]] و [[new Map(it)]] و [[Promise.all]] | «iteration protocols» في الوحدة دي، و «iterators و generators» |
| [[Symbol.asyncIterator]] | [[for await...of]] و [[Array.fromAsync]] | «AsyncIterator و async generators» في الوحدة دي |
| [[Symbol.hasInstance]] | [[x instanceof C]] بيسأل [[ C[Symbol.hasInstance] ]] | «Function: length و name و toString و new.target» |
| [[Symbol.toPrimitive]] | أي تحويل لرقم أو نص ([[+]] و [[String()]] و template) | «valueOf و toString و Symbol.toPrimitive» |
| [[Symbol.toStringTag]] | [[Object.prototype.toString]] واللي بيستخدمه، و [[console.log]] في Node | الدرس ده، القسم ٢ |
| [[Symbol.isConcatSpreadable]] | [[Array.prototype.concat]] | الدرس ده، القسم ٣ |
| [[Symbol.species]] | [[map]] و [[filter]] و [[slice]] في الـ arrays، و [[then]] في الـ Promise، و [[split]] و [[matchAll]] في الـ RegExp | «Array[Symbol.species] و Symbol.unscopables»، والقسم ٤ هنا |
| [[Symbol.unscopables]] | [[with]] بيسأل عن أسامي يخبّيها | «Array[Symbol.species] و Symbol.unscopables» |
| [[Symbol.match]] | [[str.match(x)]]، وكمان [[startsWith]] و [[includes]] و [[endsWith]] عشان يعرفوا لو x regex | «RegExp و Symbol.match و Symbol.replace» في الوحدة دي |
| [[Symbol.matchAll]] | [[str.matchAll(x)]] | نفس الدرس |
| [[Symbol.replace]] | [[str.replace(x, ...)]] و [[replaceAll]] | نفس الدرس |
| [[Symbol.search]] | [[str.search(x)]] | نفس الدرس |
| [[Symbol.split]] | [[str.split(x)]] | نفس الدرس |

وفيه اتنين أحدث: [[Symbol.dispose]] و [[Symbol.asyncDispose]] لجملة [[using]] (explicit resource management)، موجودين في Node 24 بس لسه مش في كل المتصفحات، فمش في المنهج دلوقتي.

كلهم بيتقروا بـ [[Object.getOwnPropertyNames(Symbol)]] وفلتر على النوع، وده اتشغّل وطلّع الـ ١٥:

~~~text الناتج
asyncIterator hasInstance isConcatSpreadable iterator match matchAll replace search species split toPrimitive toStringTag unscopables dispose asyncDispose
~~~

---

## ٢. [[Symbol.toStringTag]]: اسم النوع في [[[object X]]]

~~~js
const tag = (x) => Object.prototype.toString.call(x);
console.log(tag([]), tag(new Map()), tag(Promise.resolve()), tag(null));
~~~

~~~text الناتج
[object Array] [object Map] [object Promise] [object Null]
~~~

- [[Object.prototype.toString]]: الـ [[toString]] الأصلية بتاعة كل object. بنناديها بـ [[.call(x)]] عشان نتخطى أي [[toString]] تانية الـ x عنده (الـ array مثلًا عنده واحدة بترجّع العناصر).
- [[Map]] و [[Promise]] عندهم [[ [Symbol.toStringTag] ]] على الـ prototype بقيمة [['Map']] و [['Promise']]، وده اللي ظهر.
- [[Array]] و [[null]] حالات خاصة جوه [[toString]] نفسها.

### تعرّفه في class بتاعتك

~~~js
class Cart {
  items = ['tea', 'rice'];
  get [Symbol.toStringTag]() { return 'Cart'; }
  [Symbol.iterator]() { return this.items.values(); }
}
const cart = new Cart();
console.log(tag(cart), String(cart), [...cart]);
~~~

~~~text الناتج
[object Cart] [object Cart] [ 'tea', 'rice' ]
~~~

- [[ get [Symbol.toStringTag]() ]]: getter على الـ prototype، فكل [[Cart]] بتورثه ومش بيظهر كخاصية في كل instance.
- [[String(cart)]] طلّع نفس الحاجة لأن [[String]] بينادي [[toString]] الموروثة من [[Object.prototype]].
- [[ [Symbol.iterator]() ]] جاوب سؤال تاني من الجدول: الـ spread اشتغل.

### الأشكال التلاتة اتجرّبت

| مكان الـ tag | [[toString]] على الـ instance | [[console.log]] في Node |
|---|---|---|
| getter على الـ prototype بنفس اسم الـ class | [[[object Cart]]] | [[Cart {}]] |
| getter باسم مختلف ([['ShoppingCart']]) | [[[object ShoppingCart]]] | [[Cart [ShoppingCart] {}]] |
| خاصية عادية على object ([[ { [Symbol.toStringTag]: 'Config', port: 80 } ]]) | [[[object Config]]] | [[{ port: 80, Symbol(Symbol.toStringTag): 'Config' }]] |
| [[static [Symbol.toStringTag] = 'BoxClass']] | الـ class نفسها [[BoxClass]]، والـ instance [[Object]] | الـ static على الـ class مش على الـ instances |

---

## ٣. [[Symbol.isConcatSpreadable]]: [[concat]] يفرد ولا لأ

~~~js
const pair = { length: 2, 0: 'a', 1: 'b', [Symbol.isConcatSpreadable]: true };
console.log([1].concat(pair), [1].concat([2, 3]));
const keep = [2, 3];
keep[Symbol.isConcatSpreadable] = false;
console.log([1].concat(keep).length);
~~~

~~~text الناتج
[ 1, 'a', 'b' ] [ 1, 2, 3 ]
2
~~~

[[concat]] بيسأل كل argument: [[ arg[Symbol.isConcatSpreadable] ]].

| الإجابة | [[concat]] بيعمل إيه |
|---|---|
| [[undefined]] (الافتراضي) | بيفرد لو [[Array.isArray]]، وإلا بيحطه عنصر واحد |
| [[true]] | بيفرد أي object عنده [[length]]، زي [[pair]] (array-like) |
| [[false]] | بيحطه عنصر واحد حتى لو array، زي [[keep]] فالطول بقى 2 مش 3 |

---

## ٤. [[ Promise[Symbol.species] ]] و [[ RegExp[Symbol.species] ]]

درس «Array[Symbol.species]» شرح الفكرة على الـ arrays. نفس السؤال بيتسأل في [[Promise]] و [[RegExp]]:

~~~js
class Tracked extends Promise {}
console.log(Tracked.resolve(1).then((x) => x) instanceof Tracked, Promise[Symbol.species] === Promise);
~~~

~~~text الناتج
true true
~~~

- [[then]] بترجّع Promise جديدة، من [[ this.constructor[Symbol.species] ]]. والافتراضي getter بيرجّع [[this]]، يعني الـ subclass نفسها، فـ [[Tracked]] فضلت [[Tracked]] بعد [[then]].
- لو عايز النتايج Promise عادية: [[ static get [Symbol.species]() { return Promise; } ]] (تمرين «صلّح» تحت فيه الفرق في عدد الـ objects اللي بتتعمل: ٨ مقابل ١).

وفي الـ RegExp: [[str.split(re)]] و [[str.matchAll(re)]] بيعملوا **نسخة** من الـ regex بالـ species قبل ما يشتغلوا (عشان ميبوظوش [[lastIndex]] بتاعتك). اتجرّب بـ getter بيطبع:

| النداء | سأل عن [[ [Symbol.species] ]]؟ |
|---|---|
| [[ 'a-b-c'.split(r) ]] | أيوه، وعمل نسخة |
| [[ [...'a-b'.matchAll(r)] ]] | أيوه، وعمل نسخة |
| [[ 'a-b-c'.replace(r, '+') ]] | لأ، شغال على [[r]] نفسها |

---

## الخلاصة

- ١٣ well-known symbol، كل واحد سؤال من حتة معيّنة في اللغة (الجدول في القسم ١).
- [[Symbol.toStringTag]] بيغيّر [[[object X]]] وعرض Node، ومبيغيّرش النوع: متفحصش بيه.
- [[Symbol.isConcatSpreadable]] لـ [[concat]] بس، لا spread ولا [[flat]].
- [[Symbol.species]] بيقرر class النتايج المشتقة في [[then]] و [[map]] و [[split]].`,
          lines: [
            R`دالة صغيرة بتنادي [[Object.prototype.toString]] الأصلية على أي قيمة بـ [[.call]]، عشان نشوف الـ tag.`,
            R`بيطبع [[[object Array]]] و [[[object Map]]] و [[[object Promise]]] و [[[object Null]]]: كل واحد من الـ tag بتاعه أو حالة خاصة.`,
            R`class هنعلّمها بـ Symbols جاهزة من اللغة.`,
            R`حقل عادي فيه المنتجات، هنلف عليه بعد شوية.`,
            R`getter بالـ Symbol [[toStringTag]]: أي حد يسأل «انت نوعك إيه» كنص هياخد [['Cart']].`,
            R`[[Symbol.iterator]] بيرجّع iterator على الـ array الداخلية، فالـ [[Cart]] بقت تتلف بـ spread و [[for...of]].`,
            R`قفلة الـ class: الاتنين على الـ prototype، فكل instance بتورثهم.`,
            R`instance من الـ class.`,
            R`[[[object Cart]]] مرتين (من الـ tag)، والـ spread طلّع [[[ 'tea', 'rice' ]]] من الـ iterator.`,
            R`array-like (فيه [[length]] وأرقام) وقال لـ [[concat]] «افردني» بـ [[isConcatSpreadable: true]].`,
            R`الأول اتفرد [[[ 1, 'a', 'b' ]]]، والتاني array عادية اتفردت بالافتراضي [[[ 1, 2, 3 ]]].`,
            R`array عادية هنقولها متتفردش.`,
            R`[[false]] على الـ array نفسها: [[concat]] هيحطها كعنصر واحد.`,
            R`الطول 2: الـ [[1]] والـ array كلها كعنصر.`,
            R`subclass فاضية من [[Promise]] من غير أي species.`,
            R`[[true]] لأن [[then]] عملت النتيجة من الـ species اللي هو الـ class نفسها، و [[ Promise[Symbol.species] ]] بيرجّع [[Promise]] نفسها.`,
          ],
          ref: [
            { t: "MDN: Symbol (well-known symbols)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols" },
            { t: "MDN: Symbol.toStringTag", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag" },
            { t: "MDN: Symbol.isConcatSpreadable", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable" },
            { t: "MDN: Symbol.species", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species" },
            { t: "MDN: Promise[Symbol.species]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Symbol.species" },
            { t: "MDN: RegExp[Symbol.species]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.species" },
            { t: "ECMAScript: Well-Known Symbols", url: "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-well-known-symbols" },
          ],
          pre: ["js/Symbol: description و Symbol.for و Symbol.keyFor", { to: "js/Array[Symbol.species] و Symbol.unscopables", why: R`الـ species على الـ arrays و [[unscopables]]` }, { to: "js/class", why: R`الـ getters والـ static في الـ class` }],
        },
        {
          cmd: "RegExp و Symbol.match و Symbol.replace: matcher بتاعك",
          title: "str.replace و split و search و match بيسلّموا الشغل لمين؟ وتعمل matcher بتاعك من غير regex",
          desc: R`[[str.replace(x, ...)]] و [[str.split(x)]] و [[str.search(x)]] و [[str.match(x)]] و [[str.matchAll(x)]] مش بيعرفوا regex أصلًا: بيسألوا الـ argument [[x]] «عندك method بالـ Symbol ده؟» ([[Symbol.replace]] و [[Symbol.split]] و [[Symbol.search]] و [[Symbol.match]] و [[Symbol.matchAll]]). لو عنده، بينادوها ويرجّعوا نتيجتها. والـ [[RegExp]] هو بس أشهر object عنده الخمسة: [[ RegExp.prototype[Symbol.replace] ]] وأخواتها.

فتقدر تعمل object أو class بتاعتك تتبعت لـ [[replace]] و [[split]] زي الـ regex بالظبط (قايمة كلمات ممنوعة، glob زي [[*.js]]، تاريخ)، أو subclass من [[RegExp]] تغيّر سلوك [[split]] بس.

و [[Symbol.match]] ليه شغلانة تانية: [[startsWith]] و [[includes]] و [[endsWith]] بيسألوه عشان يعرفوا لو الـ argument «regex» فيرفضوه. ولو حطيته [[false]] على regex، بيتعامل كنص.`,
          example: R`// str.search و replace و split بيسلّموا الشغل للـ argument لو عنده الـ Symbol
const dash = {
  [Symbol.search](s) { return s.indexOf('-'); },
  [Symbol.replace](s, rep) { return s.split('-').join(rep); },
  [Symbol.split](s, limit) { return s.split('-', limit); },
};
const sku = 'TEA-500-EG';
console.log(sku.search(dash), sku.replace(dash, '/'), sku.split(dash, 2));
const re = /(\d+)/g;
console.log(re[Symbol.replace](sku, '[$1]'), RegExp.prototype[Symbol.split].call(/-/, sku));
console.log(/\d+/[Symbol.search](sku), [...re[Symbol.matchAll](sku)].map((m) => m[1]), re[Symbol.match](sku));
try { sku.startsWith(/TEA/); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
const literal = /TEA/;
literal[Symbol.match] = false;
console.log('/TEA/x'.startsWith(literal), String(literal));`,
          try: R`اعمل [[class CleanSplit extends RegExp]] فيها [[ [Symbol.split](str, limit) ]] بتنادي النسخة الأصلية ([[RegExp.prototype[Symbol.split].call(this, str, limit)]]) وبعدين تعمل [[trim]] لكل جزء وتشيل الفاضي. جرّبها على [[' tea , rice,, milk '.split(new CleanSplit(','))]] وقارن بـ [[split(/,/)]].`,
          sol: R`~~~js clean-split.mjs
class CleanSplit extends RegExp {
  [Symbol.split](str, limit) {
    return RegExp.prototype[Symbol.split].call(this, str, limit).map((s) => s.trim()).filter(Boolean);
  }
}
console.log(' tea , rice,, milk '.split(new CleanSplit(',')));
console.log(' tea , rice,, milk '.split(/,/));
~~~

~~~text الناتج (Node 24.22)
[ 'tea', 'rice', 'milk' ]
[ ' tea ', ' rice', '', ' milk ' ]
~~~

- [[str.split(x)]] لقى [[ x[Symbol.split] ]] على الـ prototype بتاع [[CleanSplit]] فنادى نسختنا.
- جوه، [[RegExp.prototype[Symbol.split].call(this, ...)]] بينادي الأصلية على نفس الـ regex. ليه مش [[str.split(this)]]؟ لأنها هتنادي نسختنا تاني، وتفضل تنادي نفسها لحد [[RangeError: Maximum call stack size exceeded]].
- الـ subclass لسه regex كامل: [[test]] و [[exec]] و [[replace]] شغالين عادي، اتغيّر [[split]] بس.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** object فيه الأربعة بيرجّعوا اسمهم. إيه اللي هيتطبع في كل سطر؟

~~~js
const spy = {
  [Symbol.match]() { return ['match']; },
  [Symbol.replace]() { return 'replace'; },
  [Symbol.search]() { return 'search'; },
  [Symbol.split]() { return ['split']; },
};
console.log('abc'.match(spy), 'abc'.replace(spy, 'x'), 'abc'.search(spy), 'abc'.split(spy));
try { console.log('abc'.replaceAll(spy, 'x')); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
try { console.log('abc'.includes(spy)); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
~~~`, done: R`توقّعت السطر الأول، وعرفت ليه [[replaceAll]] و [[includes]] وقعوا مع إن الـ object مش regex.`, sol: R`~~~text الناتج (Node 24.22)
[ 'match' ] replace search [ 'split' ]
TypeError: String.prototype.replaceAll called on null or undefined
TypeError: First argument to String.prototype.includes must not be a regular expression
~~~

- السطر الأول: كل string method نادت الـ method بتاعتها ورجّعت نتيجتها زي ما هي، حتى لو مش منطقية ([[search]] رجّعت نص مش رقم).
- [[replaceAll]] و [[matchAll]] قبل ما ينادوا الـ Symbol بيسألوا: «الـ argument ده regex؟» والإجابة بتيجي من [[Symbol.match]]: الـ [[spy]] عنده [[Symbol.match]]، فاتعامل كـ regex، فقرا [[spy.flags]] عشان يتأكد إن فيه [[g]]، لقاه [[undefined]] فرمى. والرسالة نفسها مضللة ([[called on null or undefined]]): في V8 دي رسالة فحص الـ flags.
- [[includes]] نفس السؤال: «regex؟ ارفض». فوجود [[Symbol.match]] على object بيغيّر سلوك ٥ methods مش واحدة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class Words]] بتاخد كلمات ([[new Words('spam', 'free money')]]) وبتشتغل مع [[str.search]] و [[str.replace]] (بنص أو بدالة) و [[str.split]]، والمقارنة **case-insensitive**، ومن غير ما تبني regex (عشان الكلمات ممكن يبقى فيها [[.]] أو [[*]]).`, done: R`[[msg.replace(banned, '***')]] بيخفي [[FREE MONEY]] و [[Spam]] و [[spam]]، و [[replace]] بدالة بتاخد النص الأصلي بحروفه، و [[split]] بيقسم عندهم، و [['a.b*c'.replace(new Words('.', '*'), '_')]] بـ [['a_b_c']]، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js words.mjs
export class Words {
  constructor(...words) { this.words = words.map((w) => w.toLowerCase()); }
  #hits(str) {
    const lower = str.toLowerCase(), hits = [];
    for (let pos = 0; pos < lower.length; ) {
      const word = this.words.find((w) => lower.startsWith(w, pos));
      if (word) { hits.push({ index: pos, text: str.slice(pos, pos + word.length) }); pos += word.length; }
      else pos++;
    }
    return hits;
  }
  [Symbol.search](str) { return this.#hits(str)[0]?.index ?? -1; }
  [Symbol.replace](str, rep) {
    let out = '', last = 0;
    for (const { index, text } of this.#hits(str)) {
      out += str.slice(last, index) + (typeof rep === 'function' ? rep(text, index) : rep);
      last = index + text.length;
    }
    return out + str.slice(last);
  }
  [Symbol.split](str) {
    const parts = [];
    let last = 0;
    for (const { index, text } of this.#hits(str)) { parts.push(str.slice(last, index)); last = index + text.length; }
    parts.push(str.slice(last));
    return parts;
  }
}
const banned = new Words('spam', 'free money');
const msg = 'Get FREE MONEY now, no Spam (a.k.a. spam).';
console.log(msg.search(banned));
console.log(msg.replace(banned, '***'));
console.log(msg.replace(banned, (t) => '[' + t.length + ']'));
console.log(msg.split(banned));
console.log('a.b*c'.replace(new Words('.', '*'), '_'), 'clean text'.search(banned));
~~~

~~~text الناتج (Node 24.22)
4
Get *** now, no *** (a.k.a. ***).
Get [10] now, no [4] (a.k.a. [4]).
[ 'Get ', ' now, no ', ' (a.k.a. ', ').' ]
a_b_c -1
~~~

**الشرح:** كل الشغل في [[#hits]]: بيلف على النص مرة واحدة، وعند كل مكان بيسأل «فيه كلمة بتبدأ هنا؟» بـ [[startsWith(w, pos)]] على النسخة الصغيرة، ويرجّع المكان والنص **الأصلي** بحروفه (عشان الدالة في [[replace]] تاخد [['FREE MONEY']] زي ما هي). والـ methods التلاتة مبنية عليها. ومفيش [[Symbol.match]] بقصد: لو حطيناها، [[includes]] و [[replaceAll]] هيعتبروا الـ object regex (التمرين اللي فات). **الغلطة الشائعة:** تبني [[new RegExp(words.join('|'), 'gi')]] على طول، فـ [['.']] تبقى «أي حرف» وتمسح النص كله.` },
            { lvl: 'تطبيق', t: R`**ابني:** استخدم [[ RegExp.prototype[Symbol.replace] ]] و [[ [Symbol.split] ]] و [[ [Symbol.search] ]] **مباشرة** (من غير [[str.replace]]) على [[/(\d+)/g]] و [[/-/]] و [[/\d+/]] و [[ 'TEA-500-EG' ]]، وقارن الناتج بالـ string methods العادية.`, done: R`طلع [[TEA-[500]-EG]] و [[[ 'TEA', '500', 'EG' ]]] و [[4]] بالطريقتين، وتعرف إن [[str.replace(re, ...)]] هو نفسه [[ re[Symbol.replace](str, ...) ]].`, sol: R`~~~js direct.mjs
const sku = 'TEA-500-EG';
const re = /(\d+)/g;
console.log(re[Symbol.replace](sku, '[$1]'), sku.replace(re, '[$1]'));
console.log(/-/[Symbol.split](sku), sku.split(/-/));
console.log(/\d+/[Symbol.search](sku), sku.search(/\d+/));
~~~

~~~text الناتج (Node 24.22)
TEA-[500]-EG TEA-[500]-EG
[ 'TEA', '500', 'EG' ] [ 'TEA', '500', 'EG' ]
4 4
~~~

**الشرح:** المواصفة بتقول [[String.prototype.replace]] أول خطوة فيها: لو الـ argument مش [[null]] ولا [[undefined]]، هات [[ arg[Symbol.replace] ]] ولو موجودة ناديها بـ [[(string, replaceValue)]]. فالنتيجتين واحد بالظبط. الفايدة العملية: لما تعمل subclass وعايز تنادي السلوك الأصلي من جوه (زي [[CleanSplit]] في «جرّب»).` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** الـ matcher ده عنده [[Symbol.match]] و [[Symbol.matchAll]]، و [[match]] شغال بس [[matchAll]] بيقع. اقرا الرسالة وصلّح بطريقتين:

~~~js
const words = { [Symbol.match](s) { return s.match(/\w+/g); }, [Symbol.matchAll](s) { return s.matchAll(/\w+/g); } };
console.log('hi there'.match(words));
console.log([...'hi there'.matchAll(words)].map((m) => m[0]));
~~~`, done: R`[[matchAll]] بيطبع [[[ 'hi', 'there' ]]]، وتقدر تشرح ليه وجود [[Symbol.match]] هو السبب.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
[ 'hi', 'there' ]
TypeError: The .flags property of the argument to String.prototype.matchAll cannot be null or undefined
~~~

[[matchAll]] قبل ما ينادي [[Symbol.matchAll]] بيعمل IsRegExp: «الـ argument عنده [[Symbol.match]] truthy؟». أيوه، فبيعتبره regex، وبعدين لازم يتأكد إن فيه [[g]] في [[flags]] (عشان [[matchAll]] من غير [[g]] ممنوع). ملقاش [[flags]] خالص فرمى.

~~~js fixed.mjs
const words = { [Symbol.match](s) { return s.match(/\w+/g); }, [Symbol.matchAll](s) { return s.matchAll(/\w+/g); } };
words.flags = 'g';
console.log([...'hi there'.matchAll(words)].map((m) => m[0]));
~~~

~~~text الناتج (Node 24.22)
[ 'hi', 'there' ]
~~~

**الطريقتين:** (١) زوّد [[flags: 'g']] زي ما اتعمل فوق، يعني «أنا regex global». (٢) لو الـ object مش محتاج [[str.match]] أصلًا، شيل [[Symbol.match]]: من غيره IsRegExp بيقول لأ، و [[matchAll]] بينادي [[Symbol.matchAll]] على طول (اتجرّب: object فيه [[Symbol.matchAll]] بس اشتغل من غير [[flags]]). وبالمرة [[includes]] و [[startsWith]] مش هيرفضوه.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس قايمة الكلمات الممنوعة بطريقتين: [[Words]] من التمرين فوق، و regex مبني بـ [[RegExp.escape]] و [[gi]]. شغّلهم على نص ١.٤ مليون حرف وقيس الوقت، وتأكد إن الناتج واحد.`, done: R`الناتجين متساويين ([[true]])، وعندك رقمين بالـ ms، وتقدر تقول إمتى تختار كل واحد.`, sol: R`~~~js compare.mjs
import { Words } from './words.mjs';
const list = ['spam', 'free money', 'click here', 'winner', '$$$'];
const text = 'Hello friend, you are a WINNER of free money. Click here! $$$ no spam. '.repeat(20000);
const asRegex = new RegExp(list.map(RegExp.escape).join('|'), 'gi');
let t = performance.now();
const a = text.replace(new Words(...list), '***');
const tw = performance.now() - t;
t = performance.now();
const b = text.replace(asRegex, '***');
const tr = performance.now() - t;
console.log('same result:', a === b, 'length', text.length);
console.log('Words matcher', tw.toFixed(1) + 'ms', '| RegExp.escape + gi', tr.toFixed(1) + 'ms');
console.log(asRegex.source);
~~~

~~~text الناتج (Node 24.22، والمرات التانية: 63.3 و 65.8 و 67.3 مقابل 4.1 و 4.5 و 3.8)
4
Get *** now, no *** (a.k.a. ***).
Get [10] now, no [4] (a.k.a. [4]).
[ 'Get ', ' now, no ', ' (a.k.a. ', ').' ]
a_b_c -1
same result: true length 1420000
Words matcher 58.0ms | RegExp.escape + gi 3.6ms
\x73pam|\x66ree\x20money|\x63lick\x20here|\x77inner|\$\$\$
~~~

أول ٥ سطور جايين من [[words.mjs]] نفسه: الـ [[import]] بيشغّل الملف كله، ومعاه سطور التجربة اللي في آخره (شيلها لو هتستخدمه كـ module بجد). **القراءة:** الـ regex أسرع حوالي ١٥ مرة، لأن محرك الـ regex مكتوب C++ ومتحسّن للبحث، و [[Words]] بتعمل [[find]] على كل الكلمات عند كل حرف. فلو الكلمات نصوص ثابتة، [[RegExp.escape]] (لاحظ إنه بيحوّل أول حرف و المسافة لـ [[\x..]] عشان الأمان) هو الاختيار. الـ matcher بتاعك يكسب لما المنطق **مش** regex أصلًا: مطابقة بالتشكيل أو من غيره، أو مرادفات من قاعدة بيانات، أو glob، أو تحب [[replace]] تاخد object غني. وساعتها تقدر تحسّن جواه (trie مثلًا) من غير ما الكود اللي بيستخدمه يتغيّر.` },
          ],
          check: { lang: "js", starter: R`class Words {
  constructor(...words) { this.words = words.map((w) => w.toLowerCase()); }
  // [Symbol.search] و [Symbol.replace] و [Symbol.split]، من غير RegExp
}`, tests: R`const banned = new Words('spam', 'free money');
const msg = 'Get FREE MONEY now, no Spam (a.k.a. spam).';
test("search", () => expect(msg.search(banned)).toBe(4));
test("search مش لاقي", () => expect('clean'.search(banned)).toBe(-1));
test("replace بنص", () => expect(msg.replace(banned, '***')).toBe('Get *** now, no *** (a.k.a. ***).'));
test("replace بدالة بتاخد النص الأصلي", () => expect(msg.replace(banned, (t) => '<' + t + '>')).toBe('Get <FREE MONEY> now, no <Spam> (a.k.a. <spam>).'));
test("split", () => expect(msg.split(banned)).toEqual(['Get ', ' now, no ', ' (a.k.a. ', ').']));
test("رموز من غير regex", () => expect('a.b*c'.replace(new Words('.', '*'), '_')).toBe('a_b_c'));`, solution: R`class Words {
  constructor(...words) { this.words = words.map((w) => w.toLowerCase()); }
  #hits(str) {
    const lower = str.toLowerCase(), hits = [];
    for (let pos = 0; pos < lower.length; ) {
      const word = this.words.find((w) => lower.startsWith(w, pos));
      if (word) { hits.push({ index: pos, text: str.slice(pos, pos + word.length) }); pos += word.length; }
      else pos++;
    }
    return hits;
  }
  [Symbol.search](str) { return this.#hits(str)[0]?.index ?? -1; }
  [Symbol.replace](str, rep) {
    let out = '', last = 0;
    for (const { index, text } of this.#hits(str)) {
      out += str.slice(last, index) + (typeof rep === 'function' ? rep(text, index) : rep);
      last = index + text.length;
    }
    return out + str.slice(last);
  }
  [Symbol.split](str) {
    const parts = [];
    let last = 0;
    for (const { index, text } of this.#hits(str)) { parts.push(str.slice(last, index)); last = index + text.length; }
    parts.push(str.slice(last));
    return parts;
  }
}` },
          flag: "script",
          deep: {
            why: R`ده بيفسّر حاجات كانت شكلها سحر: ليه [[str.split(/,/)]] و [[str.split(',')]] الاتنين شغالين، وليه [[includes(/x/)]] بيرمي، وليه [[matchAll]] بيرمي من غير [[g]]. وبيفتح باب تصميم مهم: API بتاخد «أي حاجة تعرف تـ match»، فاللي بيستخدمها يبعت regex أو matcher بتاعه من غير ما الـ API تتغيّر. وده نفس اللي بتعمله مكتبات الـ glob والـ routing.`,
            how: R`[[String.prototype.replace(searchValue, replaceValue)]] حسب المواصفة: لو [[searchValue]] مش [[undefined]] ولا [[null]]، بيعمل [[GetMethod(searchValue, @@replace)]]، ولو لقاها بيرجّع [[Call(replacer, searchValue, [O, replaceValue])]] من غير أي شغل تاني. لو ملقاش، بيحوّل [[searchValue]] لنص ويدوّر عليه كنص. ونفس الشكل في [[split]] (بـ [[limit]]) و [[search]] و [[match]] و [[matchAll]].

و [[RegExp.prototype]] هو اللي عنده التنفيذ الحقيقي للخمسة، وكلهم مبنيين على [[exec]] (يعني لو عملت override لـ [[exec]] في subclass، الخمسة بيستخدموها). و [[split]] و [[matchAll]] بيعملوا نسخة من الـ regex بالـ [[Symbol.species]] (درس «well-known symbols»).

و IsRegExp(arg) = لو مش object يبقى لأ، ولو [[ arg[@@match] ]] مش [[undefined]] خد قيمته كـ boolean، وإلا شوف لو هو RegExp حقيقي. بيستخدمه [[startsWith]] و [[endsWith]] و [[includes]] (عشان يرفضوا)، و [[matchAll]] و [[replaceAll]] (عشان يفحصوا [[g]])، و [[new RegExp(x)]] و [[RegExp(x)]].`,
            when: R`matcher بتاعك: لما المنطق مش regex بطبيعته (قايمة كلمات ثابتة من اليوزر، glob، مطابقة عربي من غير تشكيل، أرقام تليفونات بكذا شكل) وعايز الكود اللي بيستخدمه يفضل [[str.replace(m, ...)]] العادي. subclass من [[RegExp]] بـ [[ [Symbol.split] ]] أو [[ [Symbol.replace] ]]: لما الـ regex صح بس عايز تعديل ثابت على النتيجة (trim، فلترة، log). [[ re[Symbol.match] = false ]]: نادر، لما regex محتاج يتبعت لكود بيعامله كنص. ولو بتدوّر على نص ثابت من اليوزر جوه نص، [[RegExp.escape]] أسرع (اتقاس في التمرين الأخير).`,
            mistakes: R`- تنادي [[str.split(this)]] جوه [[ [Symbol.split] ]] بتاع subclass: recursion لحد [[Maximum call stack size exceeded]]. نادي [[RegExp.prototype[Symbol.split].call(this, ...)]].
- تحط [[Symbol.match]] على matcher مش محتاجه: [[includes]] و [[startsWith]] بيبتدوا يرفضوه، و [[matchAll]] و [[replaceAll]] بيدوّروا على [[flags]].
- تفتكر [[includes(/x/)]] بيدوّر بالـ regex: بيرمي [[First argument to String.prototype.includes must not be a regular expression]]. استخدم [[test]].
- [[matchAll]] و [[replaceAll]] بـ regex من غير [[g]]: [[TypeError: String.prototype.matchAll called with a non-global RegExp argument]].
- تفتكر [[Symbol.replace]] بتاخد الـ [[$1]] متحلّلة: بتاخد [[replaceValue]] زي ما اتبعت (نص فيه [[$1]] أو دالة)، والتعامل معاه شغلك.
- [[str.replace(null, 'X')]] مبيدوّرش على Symbol: بيحوّل [[null]] لنص [['null']] (اتجرّب: [['nullnull'.replace(null, 'X')]] بـ [['Xnull']]).`,
          },
          teach: R`## الفكرة في سطر

[[str.replace(x, ...)]] أول حاجة بتعملها: «يا [[x]]، عندك [[ [Symbol.replace] ]]؟ لو أيوه، اتفضل اعمل انت الشغل». والـ regex مجرد object عنده الإجابة. الناتج من Node 24.22.

---

## ١. مين بينادي مين

| الـ method في الـ RegExp | بيتنادى من | بيرجّع |
|---|---|---|
| [[ RegExp.prototype[Symbol.match] ]] | [[str.match(re)]] | array الـ match (من غير [[g]]) أو كل النصوص (بـ [[g]]) أو [[null]] |
| [[ RegExp.prototype[Symbol.matchAll] ]] | [[str.matchAll(re)]] | iterator على كل الـ matches بتفاصيلها، ولازم [[g]] |
| [[ RegExp.prototype[Symbol.replace] ]] | [[str.replace(re, rep)]] و [[str.replaceAll(re, rep)]] | النص الجديد، و [[rep]] نص فيه [[$1]] أو دالة |
| [[ RegExp.prototype[Symbol.search] ]] | [[str.search(re)]] | مكان أول match أو [[-1]]، ومبيلمسش [[lastIndex]] |
| [[ RegExp.prototype[Symbol.split] ]] | [[str.split(re, limit)]] | array الأجزاء، والـ groups بتتحط بينها |

والـ Symbols نفسهم ([[Symbol.match]] و [[Symbol.matchAll]] و [[Symbol.replace]] و [[Symbol.search]] و [[Symbol.split]]) قيم ثابتة على [[Symbol]] زي ما شفنا في الدرس اللي فات.

---

## ٢. [[Symbol.search]] و [[Symbol.replace]] و [[Symbol.split]] على object بتاعك

~~~js
const dash = {
  [Symbol.search](s) { return s.indexOf('-'); },
  [Symbol.replace](s, rep) { return s.split('-').join(rep); },
  [Symbol.split](s, limit) { return s.split('-', limit); },
};
const sku = 'TEA-500-EG';
console.log(sku.search(dash), sku.replace(dash, '/'), sku.split(dash, 2));
~~~

~~~text الناتج
3 TEA/500/EG [ 'TEA', '500' ]
~~~

- [[ [Symbol.search](s) ]]: method بالـ Symbol كاسم (computed key). [[s]] هو النص اللي اتنادى عليه [[search]]، فبنرجّع مكان أول [[-]]: 3.
- [[ [Symbol.replace](s, rep) ]]: بتاخد النص و الـ [[rep]] زي ما اتبعت ([['/']] هنا). قسمنا عند [[-]] ولزقنا بـ [[rep]]: الـ replace بقت «replace all» لأننا قررنا كده.
- [[ [Symbol.split](s, limit) ]]: [[limit]] هو الـ argument التاني بتاع [[split]] (2)، فرجع أول جزئين بس.
- جوه، [[s.split('-')]] بيتنادى بنص مش بـ [[dash]]، فمفيش recursion.

---

## ٣. النسخ الأصلية تتنادى مباشرة

~~~js
const re = /(\d+)/g;
console.log(re[Symbol.replace](sku, '[$1]'), RegExp.prototype[Symbol.split].call(/-/, sku));
console.log(/\d+/[Symbol.search](sku), [...re[Symbol.matchAll](sku)].map((m) => m[1]), re[Symbol.match](sku));
~~~

~~~text الناتج
TEA-[500]-EG [ 'TEA', '500', 'EG' ]
4 [ '500' ] [ '500' ]
~~~

- [[ re[Symbol.replace](sku, '[$1]') ]] = [[sku.replace(re, '[$1]')]] بالظبط، و [[$1]] هي أول group (درس «test و match و matchAll و replace»).
- [[RegExp.prototype[Symbol.split].call(/-/, sku)]]: نفس الكلام بـ [[.call]]، وده الشكل اللي بتستخدمه جوه subclass عشان تنادي الأصلية.
- [[search]] رجّعت 4 (مكان [[500]])، و [[matchAll]] رجّع iterator خدنا منه الـ group الأولى، و [[match]] بـ [[g]] رجّع النصوص بس.

### subclass بتغيّر واحدة بس

~~~js
class CleanSplit extends RegExp {
  [Symbol.split](str, limit) {
    return RegExp.prototype[Symbol.split].call(this, str, limit).map((s) => s.trim()).filter(Boolean);
  }
}
console.log(' tea , rice,, milk '.split(new CleanSplit(',')));
~~~

~~~text الناتج
[ 'tea', 'rice', 'milk' ]
~~~

---

## ٤. [[Symbol.match]]: «انت regex؟»

~~~js
try { sku.startsWith(/TEA/); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
const literal = /TEA/;
literal[Symbol.match] = false;
console.log('/TEA/x'.startsWith(literal), String(literal));
~~~

~~~text الناتج
TypeError: First argument to String.prototype.startsWith must not be a regular expression
true /TEA/
~~~

- [[startsWith]] و [[endsWith]] و [[includes]] بيرفضوا الـ regex بقصد (عشان محدش يفتكر إنهم بيدوّروا بيه). وبيعرفوا إنه regex بسؤال [[Symbol.match]].
- لما خليناه [[false]]، اتعامل كنص: [[String(literal)]] بـ [['/TEA/']]، و [['/TEA/x']] بيبدأ بالنص ده فعلًا، فـ [[true]].

وده بيشتغل في الاتجاه التاني: أي object عنده [[Symbol.match]] truthy بيتعامل كـ regex في ٥ أماكن:

| الـ method | بتعمل إيه لو شافت «regex» |
|---|---|
| [[startsWith]] و [[endsWith]] و [[includes]] | ترمي [[TypeError]] وترفض تكمّل |
| [[matchAll]] و [[replaceAll]] | تقرا [[flags]] ولازم فيها [[g]]، وإلا ترمي |
| [[new RegExp(x)]] | تاخد [[source]] و [[flags]] منه |

---

## الخلاصة

- الـ string methods الخمسة بيسلّموا الشغل لأي argument عنده الـ Symbol بتاعهم.
- [[RegExp.prototype]] عنده الخمسة، وتقدر تناديهم مباشرة أو بـ [[.call]] من subclass.
- matcher بتاعك = object فيه [[ [Symbol.replace] ]] و [[ [Symbol.split] ]] و [[ [Symbol.search] ]]، ومن غير [[Symbol.match]] إلا لو عايز يتعامل كـ regex.
- مشروع «glob matcher» في الوحدة دي بيبني واحد كامل.`,
          lines: [
            R`object عادي هنخليه «يتصرف» زي regex بيدوّر على [[-]].`,
            R`لما حد ينادي [[str.search(dash)]]، اللغة بتنادي دي بالنص، وبترجّع مكان أول [[-]].`,
            R`لما حد ينادي [[str.replace(dash, rep)]]: بنقسم عند [[-]] ونلزق بـ [[rep]]، فكل الشرط بتتبدّل.`,
            R`لما حد ينادي [[str.split(dash, limit)]]: بنقسم بنص [['-']] ونحترم الـ [[limit]].`,
            R`قفلة الـ object: فيه ٣ methods أساميهم Symbols ومفيهوش [[Symbol.match]].`,
            R`نص كود منتج فيه شرطتين.`,
            R`[[3]] مكان أول شرطة، و [[TEA/500/EG]]، و [[[ 'TEA', '500' ]]] لأن الـ limit 2. التلاتة نادوا الـ methods بتاعتنا.`,
            R`regex بـ [[g]] وفيه group بيمسك الأرقام.`,
            R`نداء مباشر لـ [[ [Symbol.replace] ]] على الـ regex بيدّي [[TEA-[500]-EG]] زي [[replace]] بالظبط، و [[split]] الأصلية بـ [[.call]] على [[/-/]] بتدّي التلات أجزاء.`,
            R`[[search]] المباشرة بـ [[4]]، و [[matchAll]] رجّعت iterator خدنا منه [[ m[1] ]] يعني [['500']]، و [[match]] بـ [[g]] رجّعت [[[ '500' ]]].`,
            R`[[startsWith]] بيرفض أي regex برسالة TypeError، والـ [[catch]] بيطبعها.`,
            R`regex عادي هنغيّر سؤال «انت regex؟» بتاعه.`,
            R`[[Symbol.match]] بـ [[false]]: من دلوقتي الـ string methods مش هتعتبره regex.`,
            R`[[startsWith]] حوّله لنص [['/TEA/']] وقارن: [[true]]، وطبعنا النص نفسه.`,
          ],
          ref: [
            { t: "MDN: Symbol.match", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/match" },
            { t: "MDN: Symbol.matchAll", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/matchAll" },
            { t: "MDN: Symbol.replace", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/replace" },
            { t: "MDN: Symbol.search", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/search" },
            { t: "MDN: Symbol.split", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/split" },
            { t: "MDN: RegExp.prototype[Symbol.match]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match" },
            { t: "MDN: RegExp.prototype[Symbol.matchAll]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.matchAll" },
            { t: "MDN: RegExp.prototype[Symbol.replace]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.replace" },
            { t: "MDN: RegExp.prototype[Symbol.search]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.search" },
            { t: "MDN: RegExp.prototype[Symbol.split]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.split" },
            { t: "ECMAScript: String.prototype.replace", url: "https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.replace" },
          ],
          pre: [{ to: "js/test و match و matchAll و replace", why: R`الـ string methods نفسهم و [[$1]] و [[RegExp.escape]]` }, "js/well-known symbols: Symbol.toStringTag و isConcatSpreadable", { to: "js/extends و super", why: R`الـ subclass و [[super]] و [[.call]] على الـ prototype` }],
        },
        {
          cmd: "iteration protocols: next و return و throw",
          title: "البروتوكول كامل: iterable ولا iterator، و next و return و throw، ومين بيقفل الـ iterator لما تخرج بدري",
          desc: R`**iterable** = أي object عنده [[ [Symbol.iterator]() ]] بترجّع **iterator**. و **iterator** = object عنده [[next()]] بترجّع [[{ value, done }]]. ده البروتوكول اللي [[for...of]] والـ spread والـ destructuring و [[Array.from]] و [[new Map(...)]] و [[Promise.all]] كلهم بيستخدموه.

وفيه two methods اختياريين في الـ iterator:
• [[return(value)]]: اللي بيلف بيناديها لما **يخرج بدري** ([[break]]، [[return]] من الدالة، error جوه الـ loop، destructuring خد أول عنصرين بس). فرصتك تقفل ملف أو connection. ومش بتتنادى لو اللفة خلصت لآخرها.
• [[throw(error)]]: محدش من الحاجات دي بيناديها. بتستخدمها الـ generators و [[yield*]] (الدرس الجاي).

وكل الـ iterators الجاهزة (array و Map و Set و string و generators) بيورثوا من [[Iterator.prototype]]، اللي عليه [[ [Symbol.iterator]() { return this } ]] والـ helpers ([[map]] و [[filter]]...)، وتقدر تورث منه بـ [[class extends Iterator]].`,
          example: R`// iterator بإيدك: next و return، ومين بينادي return
function countdown(from) {
  let n = from;
  return {
    [Symbol.iterator]() { return this; },
    next() { return n > 0 ? { value: n--, done: false } : { value: undefined, done: true }; },
    return(value) { console.log('  return اتنادت'); n = 0; return { value, done: true }; },
  };
}
for (const x of countdown(2)) console.log('for', x);
for (const x of countdown(5)) { console.log('break بعد', x); break; }
const [first, second] = countdown(5);
console.log('destructuring', first, second, [...countdown(3)]);
try { for (const x of countdown(5)) throw new Error('boom'); } catch (e) { console.log('caught', e.message); }
const it = [10, 20][Symbol.iterator]();
console.log(it[Symbol.iterator]() === it, it instanceof Iterator, it.next(), [...it]);`,
          try: R`اعمل [[cursor(rows)]] بيمثّل cursor على قاعدة بيانات: بيزوّد عدّاد [[open]] لما يتعمل، وبيقلّله **مرة واحدة بس** لما يتقفل (لما يخلص لآخره أو لما [[return]] تتنادى). جرّبه في ٥ حالات: لفة كاملة، و [[break]]، و error جوه الـ loop، و [[const [firstRow] = cursor(rows)]]، و [[next()]] بإيدك من غير ما تقفل. اطبع [[open]] بعد كل واحدة.`,
          sol: R`~~~js cursor.mjs
let open = 0;
function cursor(rows) {
  open++;
  let i = 0, closed = false;
  const close = () => { if (!closed) { closed = true; open--; } };
  return {
    [Symbol.iterator]() { return this; },
    next() {
      if (i < rows.length) return { value: rows[i++], done: false };
      close();
      return { value: undefined, done: true };
    },
    return() { close(); return { value: undefined, done: true }; },
  };
}
const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
for (const r of cursor(rows)) {}
console.log('بعد لفة كاملة', open);
for (const r of cursor(rows)) if (r.id === 2) break;
console.log('بعد break', open);
try { for (const r of cursor(rows)) if (r.id === 1) throw new Error('bad row'); } catch {}
console.log('بعد error', open);
const [firstRow] = cursor(rows);
console.log('بعد destructuring', open, firstRow);
const leaked = cursor(rows); leaked.next();
console.log('next بإيدك ومقفلتهوش', open);
leaked.return();
console.log('بعد return بإيدك', open);
~~~

~~~text الناتج (Node 24.22)
بعد لفة كاملة 0
بعد break 0
بعد error 0
بعد destructuring 0 { id: 1 }
next بإيدك ومقفلتهوش 1
بعد return بإيدك 0
~~~

- **القفل في مكانين:** آخر [[next]] (اللفة خلصت لوحدها، و [[return]] مش هتتنادى) و [[return]] (خروج بدري). و [[closed]] بيمنع العدّاد ينزل مرتين لو الاتنين حصلوا.
- [[for...of]] و الـ destructuring قفلوا لوحدهم في كل الحالات.
- **الفخ:** لما بتنادي [[next()]] بإيدك، مفيش حد هيقفل غيرك. [[open]] فضل 1 لحد ما ناديت [[return()]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[letters(log)]] iterator على [['a', 'b', 'c']] بيكتب [['R']] في [[log]] كل ما [[return]] تتنادى. اكتب الـ [[log]] النهائي قبل التشغيل:

~~~js
const log = [];
const [x] = letters(log); log.push('|');
const [y, ...rest] = letters(log); log.push('|');
const all = [...letters(log)]; log.push('|');
for (const l of letters(log)) if (l === 'b') break;
console.log(log.join(' '));
~~~`, done: R`كتبت [[R | | | R]] قبل التشغيل وطلع كده، وتقدر تقول ليه السطرين التاني والتالت مفيهمش [[R]].`, sol: R`~~~js letters.mjs
function letters(log) {
  const items = ['a', 'b', 'c'];
  let i = 0;
  return {
    [Symbol.iterator]() { return this; },
    next() { return i < items.length ? { value: items[i++], done: false } : { value: undefined, done: true }; },
    return() { log.push('R'); return { done: true }; },
  };
}
const log = [];
const [x] = letters(log); log.push('|');
const [y, ...rest] = letters(log); log.push('|');
const all = [...letters(log)]; log.push('|');
for (const l of letters(log)) if (l === 'b') break;
console.log(log.join(' '));
~~~

~~~text الناتج (Node 24.22)
R | | | R
~~~

- [[const [x] = ...]]: الـ destructuring خد عنصر واحد وفيه لسه، فقفل: [[R]].
- [[const [y, ...rest] = ...]]: الـ rest لف لحد [[done: true]]، والـ iterator خلص لوحده، فمفيش حاجة تتقفل: من غير [[R]].
- [[[...letters(log)]]]: نفس الكلام، الـ spread بيلف لآخره.
- [[break]] عند [['b']]: خروج بدري، فـ [[R]].

القاعدة: [[return]] = «أنا مش محتاج الباقي وانت لسه مخلصتش».` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ [[playlist]] ده iterable، بس أول [[[...playlist]]] شغال والتاني فاضي، ولو لفيت عليه loop جوه loop بيبوظ. صلّحه من غير ما تغيّر شكل الـ [[songs]].

~~~js
const playlist = {
  songs: ['intro', 'main', 'outro'],
  i: 0,
  [Symbol.iterator]() { return this; },
  next() { return this.i < this.songs.length ? { value: this.songs[this.i++], done: false } : { value: undefined, done: true }; },
};
console.log([...playlist], [...playlist]);
~~~`, done: R`المرتين بيطبعوا التلات أغاني، و loop جوه loop على نفس الـ playlist بيطبع ٣ أزواج متطابقين.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
[ 'intro', 'main', 'outro' ] []
~~~

المشكلة إن [[ [Symbol.iterator]() ]] بترجّع [[this]]، والعدّاد [[i]] على الـ playlist نفسها، فكل اللفّات بيتشاركوا عدّاد واحد واتستهلك.

~~~js playlist-fixed.mjs
const fixed = {
  songs: ['intro', 'main', 'outro'],
  [Symbol.iterator]() {
    let i = 0;
    const songs = this.songs;
    return { next: () => (i < songs.length ? { value: songs[i++], done: false } : { value: undefined, done: true }) };
  },
};
console.log([...fixed], [...fixed]);
for (const a of fixed) for (const b of fixed) if (a === b) console.log('pair', a);
~~~

~~~text الناتج (Node 24.22)
[ 'intro', 'main', 'outro' ] [ 'intro', 'main', 'outro' ]
pair intro
pair main
pair outro
~~~

**الشرح:** الـ **iterable** (اللي بتلف عليه) و الـ **iterator** (اللي بيمسك مكانك) حاجتين مختلفتين. كل نداء لـ [[ [Symbol.iterator]() ]] لازم يرجّع iterator **جديد** بعدّاد جديد ([[let i = 0]] جوه الـ method). [[return this]] صح بس في الـ iterator نفسه (عشان ينفع تلف عليه بـ [[for...of]])، وده معناه «اتستهلك مرة واحدة»، زي الـ generators بالظبط. والـ arrow function في [[next]] عشان تشوف [[i]] و [[songs]] من الـ closure.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** [[countdown(from, onReturn)]] بتنادي [[onReturn]] جوه [[return]]. اكتب ملف اختبارات بـ [[node:test]] بيثبت: اللفة الكاملة مبتناديش [[return]]، و [[break]] بيناديها مرة، و error جوه الـ loop بيناديها والـ error بيعدّي، و [[[a]]] بيقفل و [[[b, ...rest]]] لأ، وبعد [[return]] مفيش قيم.`, done: R`[[node --test]] بيطبع ٥ اختبارات ✔ و [[fail 0]]، ولو شلت سطر [[onReturn()]] من الـ [[return]] ٣ اختبارات بيقعوا.`, sol: R`~~~js countdown.mjs
export function countdown(from, onReturn = () => {}) {
  let n = from;
  return {
    [Symbol.iterator]() { return this; },
    next() { return n > 0 ? { value: n--, done: false } : { value: undefined, done: true }; },
    return(value) { onReturn(); n = 0; return { value, done: true }; },
  };
}
~~~

~~~js countdown.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countdown } from './countdown.mjs';

test('لفة كاملة بتطلّع الأرقام ومبتناديش return', () => {
  let calls = 0;
  assert.deepEqual([...countdown(3, () => calls++)], [3, 2, 1]);
  assert.equal(calls, 0);
});

test('break بينادي return مرة واحدة', () => {
  let calls = 0;
  for (const x of countdown(5, () => calls++)) if (x === 4) break;
  assert.equal(calls, 1);
});

test('error جوه الـ loop بينادي return والـ error بيعدّي', () => {
  let calls = 0;
  assert.throws(() => { for (const x of countdown(5, () => calls++)) throw new Error('boom'); }, /boom/);
  assert.equal(calls, 1);
});

test('destructuring جزئي بيقفل، و rest لأ', () => {
  let calls = 0;
  const [a] = countdown(5, () => calls++);
  const [b, ...rest] = countdown(3, () => calls++);
  assert.deepEqual([a, b, rest], [5, 3, [2, 1] ]);
  assert.equal(calls, 1);
});

test('بعد return مفيش قيم تاني', () => {
  const it = countdown(5);
  it.next();
  assert.deepEqual(it.return('x'), { value: 'x', done: true });
  assert.deepEqual(it.next(), { value: undefined, done: true });
});
~~~

~~~text الناتج: node --test (Node 24.22)
✔ لفة كاملة بتطلّع الأرقام ومبتناديش return (8.5639ms)
✔ break بينادي return مرة واحدة (1.7937ms)
✔ error جوه الـ loop بينادي return والـ error بيعدّي (0.9982ms)
✔ destructuring جزئي بيقفل، و rest لأ (0.3809ms)
✔ بعد return مفيش قيم تاني (0.3884ms)
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

**الشرح:** [[node --test]] من غير أسامي ملفات بيدوّر على أي ملف اسمه [[*.test.mjs]] (أو [[.js]] و [[.cjs]]) ويشغّله. [[assert/strict]] بيخلي [[deepEqual]] يقارن بـ [[===]]. والاختبار التالت بيتأكد من حاجتين مع بعض: الـ error **مش** بيتبلع (البروتوكول بيقفل وبعدين يكمّل رمي الـ error الأصلي) و [[return]] اتنادت. وأهم اختبار هو الأول: بيمنع حد «يصلّح» حاجة وينادي [[return]] في الآخر دايمًا.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class DateRange extends Iterator]]: [[new DateRange('2026-02-26', '2026-03-02')]] بيطلّع التواريخ يوم يوم كنصوص [['YYYY-MM-DD']] لحد اليوم الأخير (داخل). اكتب [[next]] و [[return]] بس، واستخدم الـ helpers اللي جاية من [[Iterator]] عشان تجيب أول ٣ أيام جمعة في نوفمبر وديسمبر 2026.`, done: R`الـ spread بيطلّع ٥ تواريخ ومعدّي على ٢٨ فبراير لـ ١ مارس صح، و [[filter(...).take(3).toArray()]] بيرجّع [[2026-11-06]] و [[13]] و [[20]] وبيطبع إن الـ range اتقفل، والـ range المقلوب بيرجّع [[[]]].`, sol: R`~~~js date-range.mjs
class DateRange extends Iterator {
  #current; #end; #closed = false;
  constructor(from, to) { super(); this.#current = new Date(from + 'T00:00:00Z'); this.#end = new Date(to + 'T00:00:00Z'); }
  next() {
    if (this.#closed || this.#current > this.#end) return { value: undefined, done: true };
    const value = this.#current.toISOString().slice(0, 10);
    this.#current = new Date(this.#current.getTime() + 86400000);
    return { value, done: false };
  }
  return() { this.#closed = true; console.log('  DateRange اتقفل'); return { value: undefined, done: true }; }
}
console.log([...new DateRange('2026-02-26', '2026-03-02')]);
const fridays = new DateRange('2026-11-01', '2026-12-31').filter((d) => new Date(d + 'T00:00:00Z').getUTCDay() === 5).take(3).toArray();
console.log(fridays);
console.log(new DateRange('2026-11-21', '2026-11-20').toArray(), Object.prototype.toString.call(new DateRange('2026-01-01', '2026-01-01')));
~~~

~~~text الناتج (Node 24.22)
[
  '2026-02-26',
  '2026-02-27',
  '2026-02-28',
  '2026-03-01',
  '2026-03-02'
]
  DateRange اتقفل
[ '2026-11-06', '2026-11-13', '2026-11-20' ]
[] [object Iterator]
~~~

**الشرح:**
- [[extends Iterator]] و [[super()]]: الـ class بقت iterator «رسمي»، فعندها [[ [Symbol.iterator]() ]] (بترجّع [[this]]) و [[filter]] و [[take]] و [[toArray]] من غير ما تكتبهم.
- كل التواريخ بـ UTC ([[T00:00:00Z]] و [[getUTCDay]] و [[toISOString]]) عشان التوقيت الصيفي وتوقيت الجهاز ميزوّدوش أو ينقّصوا يوم (درس «Date: الحساب الصح»). و [[86400000]] = ٢٤ × ٦٠ × ٦٠ × ١٠٠٠، مضمونة في UTC بس.
- [[take(3)]] بعد ما خد التالت نادى [[return]] على الـ [[filter]]، اللي ناداها على الـ [[DateRange]]: اتطبع «اتقفل» مرة. والـ spread في السطر الأول لف لآخره فمفيش «اتقفل».
- الـ tag [[[object Iterator]]] لأن [[Iterator.prototype]] عليه [[Symbol.toStringTag]] بـ [['Iterator']]. لو عايزه [['DateRange']] ضيف getter زي درس «well-known symbols».` },
            { lvl: 'تحدي', t: R`**مسألة:** [[zip(a, b)]] بتاخد اتنين iterables وبترجّع iterator (بإيدك، من غير [[function*]]) بيطلّع أزواج [[[x, y]]] ويقف عند الأقصر. والمهم: لما واحد يخلص لازم **يقفل التاني** ([[return]] لو موجودة)، ولو اللي بيلف عمل [[break]] يقفل الاتنين.`, done: R`[[[...zip([1, 2, 3], ['x', 'y'])]]] بـ [[[[1, 'x'], [2, 'y']]]] والـ generator بتاع [[[1, 2, 3]]] اتقفل، و [[break]] بعد أول زوج قفل الاتنين، و [[zip('ab', [true])]] شغال على string، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js zip.mjs
function zip(a, b) {
  const ia = a[Symbol.iterator](), ib = b[Symbol.iterator]();
  let done = false;
  const closeBoth = () => { done = true; ia.return?.(); ib.return?.(); };
  return {
    [Symbol.iterator]() { return this; },
    next() {
      if (done) return { value: undefined, done: true };
      const x = ia.next();
      if (x.done) { done = true; ib.return?.(); return { value: undefined, done: true }; }
      const y = ib.next();
      if (y.done) { done = true; ia.return?.(); return { value: undefined, done: true }; }
      return { value: [x.value, y.value], done: false };
    },
    return() { if (!done) closeBoth(); return { value: undefined, done: true }; },
  };
}
function* tracked(name, items, log) { try { yield* items; } finally { log.push(name + ' closed'); } }
const log = [];
console.log([...zip(tracked('A', [1, 2, 3], log), tracked('B', ['x', 'y'], log))], log);
const log2 = [];
for (const p of zip(tracked('A', [1, 2, 3], log2), tracked('B', ['x', 'y', 'z'], log2))) break;
console.log(log2, [...zip('ab', [true])]);
~~~

~~~text الناتج (Node 24.22)
[ [ 1, 'x' ], [ 2, 'y' ] ] [ 'B closed', 'A closed' ]
[ 'A closed', 'B closed' ] [ [ 'a', true ] ]
~~~

**الشرح:**
- [[ia.return?.()]]: [[?.]] قبل الأقواس = «نادي لو موجودة»، لأن [[return]] اختيارية في البروتوكول (الـ iterator بتاع الـ array مثلًا معندوش).
- لما [[B]] خلص لوحده (آخر [[next]] رجّع [[done]])، الـ [[finally]] بتاعه اشتغل لوحده، وإحنا قفلنا [[A]] اللي كان لسه فيه [[3]]. من غير السطر ده، [[A]] كان هيفضل مفتوح (لو ملف، الملف مش هيتقفل).
- [[done]] بيضمن إن مفيش [[next]] بيتنادى على iterator اتقفل، وإن [[return]] متقفلش مرتين.
- [[tracked]] generator صغير بـ [[try...finally]] عشان نشوف القفل في الـ [[log]] (الدرس الجاي بيشرح ليه [[finally]] بتشتغل مع [[return]]).

و [[Iterator.zip]] جاي في المواصفة (Stage 3 دلوقتي، مش في Node 24 ولا في المنهج)، وبيعمل نفس القفل ده.` },
          ],
          check: { lang: "js", starter: R`function zip(a, b) {
  // iterator بإيدك: next بيرجّع [x, y]، ويقفل التاني لما واحد يخلص، و return تقفل الاتنين
}`, tests: R`function* tracked(name, items, log) { try { yield* items; } finally { log.push(name + ' closed'); } }
test("أزواج لحد الأقصر", () => expect([...zip([1, 2, 3], ['x', 'y'])]).toEqual([[1, 'x'], [2, 'y']]));
test("الأقصر في الأول", () => expect([...zip([1], 'abc')]).toEqual([[1, 'a']]));
test("لما B يخلص، A يتقفل", () => { const log = []; [...zip(tracked('A', [1, 2, 3], log), tracked('B', ['x'], log))]; expect(log.includes('A closed')).toBe(true); });
test("لما A يخلص، B يتقفل", () => { const log = []; [...zip(tracked('A', [1], log), tracked('B', ['x', 'y'], log))]; expect(log.includes('B closed')).toBe(true); });
test("break بيقفل الاتنين", () => { const log = []; for (const p of zip(tracked('A', [1, 2], log), tracked('B', [3, 4], log))) break; expect(log.sort()).toEqual(['A closed', 'B closed']); });
test("بعد الخلاص done على طول", () => { const z = zip([1], [2]); z.next(); z.next(); expect(z.next()).toEqual({ value: undefined, done: true }); });`, solution: R`function zip(a, b) {
  const ia = a[Symbol.iterator](), ib = b[Symbol.iterator]();
  let done = false;
  const closeBoth = () => { done = true; ia.return?.(); ib.return?.(); };
  return {
    [Symbol.iterator]() { return this; },
    next() {
      if (done) return { value: undefined, done: true };
      const x = ia.next();
      if (x.done) { done = true; ib.return?.(); return { value: undefined, done: true }; }
      const y = ib.next();
      if (y.done) { done = true; ia.return?.(); return { value: undefined, done: true }; }
      return { value: [x.value, y.value], done: false };
    },
    return() { if (!done) closeBoth(); return { value: undefined, done: true }; },
  };
}` },
          flag: "script",
          deep: {
            why: R`أي حاجة بتتلف عليها وماسكة resource (ملف، connection، cursor، timer، listener) لازم تتقفل حتى لو اللي بيلف خرج بدري. البروتوكول حل ده مرة واحدة: [[return]] بتتنادى لوحدها في كل خروج بدري، فاللي بيلف مش محتاج يفتكر. ولو فهمت الفرق بين iterable و iterator هتفهم ليه الـ generator «بيخلص» بعد لفة، وليه array بتتلف ألف مرة.`,
            how: R`[[for (const x of obj)]] من جوه (GetIterator ثم IteratorStep):
1. [[const it = obj[Symbol.iterator]()]]. لو مش function: [[TypeError: obj is not iterable]]. لو رجّعت حاجة مش object: [[Result of the Symbol.iterator method is not an object]].
2. كل لفة: [[const r = it.next()]]. لو [[r]] مش object: [[TypeError: Iterator result 5 is not an object]]. لو [[r.done]] truthy: خلاص، **من غير** [[return]].
3. لو الـ body عمل [[break]] أو [[return]] أو [[continue]] لـ loop برّه أو رمى error: IteratorClose = لو [[it.return]] موجودة ناديها. لو الخروج كان بـ error، الـ error الأصلي هو اللي بيكمّل حتى لو [[return]] رمت هي كمان.

الـ destructuring بيعمل نفس الحاجة: بياخد العناصر اللي محتاجها، ولو الـ iterator لسه مخلصش بيقفله. و [[new Map(it)]] و [[Array.from(it, fn)]] بيقفلوا لو حصل error في النص ([[Iterator value 3 is not an entry object]] أو الـ [[fn]] رمت). و [[throw]] مش جزء من أي حاجة من دول: [[yield*]] بس اللي بيبعتها.

و [[Iterator.prototype]] هو أبو كل الـ iterators الجاهزة، وعليه [[ [Symbol.iterator]() ]] بترجّع [[this]] (عشان الـ iterator نفسه يتلف بـ [[for...of]]) والـ helpers. و [[Iterator]] نفسه abstract: [[new Iterator()]] بيرمي [[TypeError: Abstract class Iterator not directly constructable]]، بس [[class X extends Iterator]] مسموح.`,
            when: R`iterator بإيدك (object بـ [[next]]): لما محتاج تحكّم كامل وأداء (من غير generator)، أو مكتبة بتلف على data structure بتاعتها. [[return]]: في أي iterator ماسك resource. iterable بيرجّع iterator جديد كل مرة: لأي collection (زي [[Map]] و [[Set]]). iterator بيرجّع [[this]]: لأي «تيار» بيتستهلك مرة (ملف، network، generator). [[extends Iterator]]: لما عايز iterator بتاعك ياخد [[map]] و [[filter]] و [[take]] ببلاش (درس «Iterator helpers»). وفي الغالب generator ([[function*]]) أسهل من ده كله، وبيعمل [[return]] لوحده (الدرس الجاي).`,
            mistakes: R`- [[ [Symbol.iterator]() { return this } ]] على collection بدل iterator جديد: تاني لفة فاضية.
- تنسى [[done: true]] فالـ loop متخلصش، أو ترجّع [[undefined]] بدل object: [[Iterator result undefined is not an object]].
- تحط القفل في [[return]] بس: اللفة الكاملة مبتناديهاش، فاقفل في آخر [[next]] كمان.
- تفتكر [[for...of]] بينادي [[throw]] لما يحصل error: بينادي [[return]].
- تنادي [[next()]] بإيدك وتسيب الـ iterator: محدش هيقفله غيرك.
- [[return]] نفسها ترجّع حاجة مش object: [[TypeError: Iterator result 5 is not an object]] (اتجرّب).
- تلف بـ [[for...in]] على iterable: [[for...in]] بيلف على مفاتيح الـ object مش على البروتوكول (درس «for...of و for...in»).`,
          },
          teach: R`## الفكرة في سطر

[[for...of]] بيطلب iterator من الحاجة، ويفضل يقول له «اللي بعده» لحد ما يقول «خلصت»، ولو خرج بدري بيقول له «اقفل». الناتج من Node 24.22.

---

## ١. iterable ولا iterator

| | **iterable** | **iterator** |
|---|---|---|
| عنده إيه | [[ [Symbol.iterator]() ]] | [[next()]]، واختياري [[return()]] و [[throw()]] |
| بيعمل إيه | بيدّيك iterator جديد | بيمسك مكانك ويدّيك القيمة اللي بعدها |
| أمثلة | array و string و Map و Set و arguments و NodeList | [[arr.values()]] و [[map.entries()]] وأي generator object |
| تلف عليه كام مرة | كل ما تحب، كل مرة iterator جديد | مرة واحدة، بيتستهلك |

والـ iterators الجاهزة **كمان** iterables: عندهم [[ [Symbol.iterator]() ]] بترجّع [[this]]، عشان تقدر تكتب [[for (const v of map.values())]].

---

## ٢. [[next()]] و [[{ value, done }]]

~~~js
function countdown(from) {
  let n = from;
  return {
    [Symbol.iterator]() { return this; },
    next() { return n > 0 ? { value: n--, done: false } : { value: undefined, done: true }; },
    return(value) { console.log('  return اتنادت'); n = 0; return { value, done: true }; },
  };
}
for (const x of countdown(2)) console.log('for', x);
~~~

~~~text الناتج
for 2
for 1
~~~

- [[countdown(2)]] بترجّع object هو iterator و iterable في نفس الوقت ([[return this]]).
- [[next()]]: لو لسه فيه رجّع [[{ value: n--, done: false }]] ([[n--]] بترجّع القيمة الحالية وبعدين تنقص)، وإلا [[{ value: undefined, done: true }]].
- اللفة خلصت لوحدها، و**مفيش** «return اتنادت»: الـ iterator خلص بنفسه ومفيش حاجة تتقفل.

---

## ٣. [[return()]]: مين بيناديها

~~~js
for (const x of countdown(5)) { console.log('break بعد', x); break; }
const [first, second] = countdown(5);
console.log('destructuring', first, second, [...countdown(3)]);
try { for (const x of countdown(5)) throw new Error('boom'); } catch (e) { console.log('caught', e.message); }
~~~

~~~text الناتج
break بعد 5
  return اتنادت
  return اتنادت
destructuring 5 4 [ 3, 2, 1 ]
  return اتنادت
caught boom
~~~

- [[break]]: خرج بعد أول قيمة، فـ [[return]] اتنادت.
- [[const [first, second] = countdown(5)]]: خد اتنين والـ iterator لسه فيه ٣، فقفله. أما [[[...countdown(3)]]] لف لآخره فمفيش [[return]].
- error جوه الـ loop: [[return]] اتنادت **الأول**، وبعدين الـ error كمّل لحد الـ [[catch]].

اتجرّبت كل الحالات (عدد الـ [[next]] اللي اتنادت وبعدها هل [[return]] اتنادت):

| اللي حصل | [[return]] اتنادت؟ |
|---|---|
| [[for...of]] لحد الآخر | لأ، الـ iterator خلص بنفسه |
| [[break]] أو [[return]] من الدالة أو [[continue outer]] | أيوه، ده الخروج البدري الأساسي |
| error جوه الـ body | أيوه، والـ error بيكمّل |
| [[const [a, b] = it]] والـ iterator لسه فيه | أيوه، خد اللي محتاجه وقفل |
| [[const [a, ...rest] = it]] أو spread أو [[Array.from(it)]] | لأ، لفّوا لآخره |
| [[new Map(it)]] وعنصر مش [[[key, value]]] | أيوه، وبعدين بيرمي [[TypeError: Iterator value 3 is not an entry object]] |
| [[Array.from(it, fn)]] و [[fn]] رمت | أيوه، وبعدين الـ error بيكمّل |
| iterator معندوش [[return]] خالص | محدش بيقفل، ولو لفّيت عليه تاني بيكمّل من مكانه |

---

## ٤. [[throw()]]: مش للـ loops

حطيت [[throw()]] و [[return()]] على iterator، ورميت error جوه [[for...of]]: اتطبع [[return called]] بس. [[throw]] بتبعت error **جوه** الـ iterator عشان هو يتعامل معاه، وده منطقي بس مع الـ generator (فيه [[try...catch]] حوالين [[yield]]) و [[yield*]] اللي بيوصّلها للـ generator الداخلي. ده كله الدرس الجاي.

---

## ٥. [[Iterator]]: الأب المشترك

~~~js
const it = [10, 20][Symbol.iterator]();
console.log(it[Symbol.iterator]() === it, it instanceof Iterator, it.next(), [...it]);
~~~

~~~text الناتج
true true { value: 10, done: false } [ 20 ]
~~~

- [[ it[Symbol.iterator]() === it ]]: الـ iterator بيرجّع نفسه (من [[Iterator.prototype]]).
- [[it instanceof Iterator]]: كل iterators اللغة (array و Map و Set و string و [[matchAll]] و generators) بيورثوا من [[Iterator.prototype]]، فعليهم كلهم [[map]] و [[filter]] و [[take]].
- [[it.next()]] خد 10، والـ spread كمّل من مكانه: [[[ 20 ]]] بس.

وأنواعهم بالـ [[Symbol.toStringTag]] (الدرس اللي فات): [[[object Array Iterator]]] و [[[object Map Iterator]]] و [[[object String Iterator]]] و [[[object RegExp String Iterator]]].

### iterator بتاعك يورث منه

~~~js
class Counter extends Iterator { #n = 0; next() { return this.#n < 3 ? { value: this.#n++, done: false } : { value: undefined, done: true }; } }
console.log([...new Counter()], new Counter().map((x) => x * 10).toArray(), Object.prototype.toString.call(new Counter()));
~~~

~~~text الناتج
[ 0, 1, 2 ] [ 0, 10, 20 ] [object Iterator]
~~~

كتبنا [[next]] بس، وخدنا [[ [Symbol.iterator] ]] و [[map]] و [[toArray]] من [[Iterator.prototype]]. و [[new Iterator()]] لوحده ممنوع: [[TypeError: Abstract class Iterator not directly constructable]].

---

## ٦. رسايل الأخطاء

| الكود | الرسالة (Node 24.22) |
|---|---|
| [[const obj = { a: 1 }]] وبعدين [[for (const x of obj)]] | [[TypeError: obj is not iterable]]: الرسالة فيها اسم المتغير |
| [[const [z] = 5]] | [[TypeError: 5 is not iterable]]: الرقم ملوش [[Symbol.iterator]] |
| [[ [Symbol.iterator]() { return 5 } ]] | [[TypeError: Result of the Symbol.iterator method is not an object]]: لازم ترجّع object فيه [[next]] |
| [[next() { return 5 }]] | [[TypeError: Iterator result 5 is not an object]]: لازم ترجّع [[{ value, done }]] كل مرة |

---

## الخلاصة

- iterable بيدّي iterator، والـ iterator بيدّي [[{ value, done }]].
- [[return()]] بتتنادى في الخروج البدري بس (break و error و destructuring جزئي)، مش في اللفة الكاملة، فاقفل في المكانين.
- [[throw()]] للـ generators و [[yield*]]، مش للـ loops.
- [[Iterator.prototype]] أبو كل الـ iterators، و [[extends Iterator]] بيدّيك الـ helpers.`,
          lines: [
            R`دالة بترجّع iterator بإيدنا، من غير generator، عشان نشوف البروتوكول كله.`,
            R`العدّاد اللي الـ iterator ماسكه: هو «المكان» اللي واقف عنده.`,
            R`بنرجّع object هيبقى iterable و iterator في نفس الوقت.`,
            R`[[ [Symbol.iterator] ]] بترجّع [[this]]: الـ iterator نفسه، فينفع [[for...of]] يلف عليه، بس مرة واحدة.`,
            R`[[next]]: لو [[n]] لسه أكبر من صفر بيرجّع القيمة الحالية وينقصها، وإلا [[done: true]].`,
            R`[[return]]: اللي بيلف بيناديها لما يخرج بدري. بتطبع، وتصفّر العدّاد (فأي [[next]] بعدها [[done]])، وترجّع [[done: true]].`,
            R`قفلة الـ object.`,
            R`قفلة [[countdown]].`,
            R`لفة كاملة: [[for 2]] و [[for 1]]، ومن غير [[return]] لأن الـ iterator خلص بنفسه.`,
            R`[[break]] بعد أول قيمة، فـ [[for...of]] نادى [[return]] لوحده.`,
            R`الـ destructuring خد أول قيمتين (5 و 4) والـ iterator لسه فيه، فقفله بـ [[return]].`,
            R`بيطبع القيمتين، والـ spread لف [[countdown(3)]] لآخره فطلّع [[[ 3, 2, 1 ]]] من غير [[return]].`,
            R`error جوه الـ loop: [[return]] بتتنادى الأول، وبعدين الـ error بيكمّل للـ [[catch]] اللي طبع [[caught boom]].`,
            R`iterator جاهز من array، عشان نقارنه باللي عملناه.`,
            R`[[true]] (بيرجّع نفسه) و [[true]] (بيورث من [[Iterator]])، و [[next]] خد 10، والـ spread كمّل من مكانه: [[[ 20 ]]].`,
          ],
          ref: [
            { t: "MDN: Iteration protocols", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols" },
            { t: "MDN: Iterator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator" },
            { t: "MDN: Iterator.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/Symbol.iterator" },
            { t: "MDN: Symbol.iterator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator" },
            { t: "ECMAScript: Iteration (IteratorClose)", url: "https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iteration" },
          ],
          pre: [{ to: "js/iterators و generators", why: R`[[Symbol.iterator]] و [[next]] و [[function*]] في أبسط صورهم` }, { to: "js/for...of و for...in", why: R`[[for...of]] من برّه` }, { to: "js/array destructuring و spread", why: R`الـ destructuring والـ spread اللي بيستخدموا البروتوكول` }],
        },
        {
          cmd: "Generator: next و return و throw و yield*",
          title: "الـ generator بيتكلم في الاتجاهين: تبعت له قيمة بـ next، وتقفله بـ return، وترمي جواه بـ throw، وتسلّم لغيره بـ yield*",
          desc: R`الـ generator object (اللي بيرجع من نداء [[function*]]) عنده ٣ methods، وكلهم بيكمّلوا الدالة من عند آخر [[yield]] واقفة عنده:
• [[gen.next(value)]]: كمّل، و [[value]] تبقى **نتيجة** الـ [[yield]] اللي كانت واقفة ([[const name = yield '...']]). أول [[next]] بيتجاهل قيمته، لأن لسه مفيش [[yield]] مستنية.
• [[gen.return(value)]]: كمّل كأن الـ [[yield]] بقت [[return value]]: الـ [[finally]] بيشتغل، والنتيجة [[{ value, done: true }]].
• [[gen.throw(error)]]: كمّل كأن الـ [[yield]] رمت [[error]]: لو فيه [[try...catch]] حواليها بيمسكه ويكمّل، وإلا بيطلع برّه لحد اللي نادى [[throw]].

و [[yield* other]] بيسلّم الشغل لـ generator أو iterable تاني لحد ما يخلص: كل [[next]] و [[return]] و [[throw]] بيوصلوا للداخلي، وقيمة [[yield*]] نفسها هي الـ [[return]] بتاع الداخلي.`,
          example: R`// generator بيتكلم في الاتجاهين: next(value) و return و throw
function* checkout() {
  try {
    const name = yield 'اسمك إيه؟';
    const qty = yield $__bt$__{name}، كام قطعة؟$__bt;
    if (!(qty > 0)) throw new Error('الكمية لازم تبقى أكبر من صفر');
    return { name, qty };
  } finally {
    console.log('  اتقفل');
  }
}
const c = checkout();
console.log(c.next('هيتجاهل'));
console.log(c.next('Sara'));
console.log(c.next(3));
const c2 = checkout();
c2.next();
console.log(c2.return('ألغى'));
const c3 = checkout();
c3.next();
try { c3.throw(new Error('timeout')); } catch (e) { console.log('برّه:', e.message); }`,
          try: R`اعمل [[function* ids(prefix)]] لانهائي بيطلّع [['INV-1']] و [['INV-2']]...، ولو حد بعت [[true]] في [[next(true)]] العدّاد يرجع لـ 1. وبعدين [[function* roundRobin(...workers)]] بيلف على العمّال للأبد، وخد منه ٥ بـ [[take(5).toArray()]].`,
          sol: R`~~~js ids.mjs
function* ids(prefix) { let n = 1; while (true) { const reset = yield prefix + '-' + n++; if (reset) n = 1; } }
const g = ids('INV');
console.log(g.next().value, g.next().value, g.next(true).value, g.next().value);
function* roundRobin(...workers) { for (let i = 0; ; i = (i + 1) % workers.length) yield workers[i]; }
console.log(roundRobin('a', 'b', 'c').take(5).toArray());
~~~

~~~text الناتج (Node 24.22)
INV-1 INV-2 INV-1 INV-2
[ 'a', 'b', 'c', 'a', 'b' ]
~~~

- [[g.next(true)]]: الـ [[yield]] اللي كانت طلّعت [['INV-2']] رجّعت [[true]]، فـ [[n = 1]]، والـ loop لفت وطلّعت [['INV-1']].
- الـ [[while (true)]] والـ [[for]] من غير شرط مش بيعلّقوا البرنامج: كل [[yield]] بيوقف الدالة لحد الطلب الجاي.
- [[i = (i + 1) % workers.length]]: باقي القسمة بيرجّع [[i]] لصفر بعد آخر عامل.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الـ [[finally]] هنا فيها [[yield]]. اكتب الـ ٤ سطور (والسطر اللي جوه الـ [[finally]]) بالترتيب:

~~~js
function* stubborn() {
  try { yield 1; yield 2; }
  finally { yield 'cleanup'; console.log('  finally خلص'); }
}
const s = stubborn();
console.log(s.next());
console.log(s.return('stop'));
console.log(s.next());
console.log(s.next());
~~~`, done: R`توقّعت إن [[return('stop')]] **مرجّعتش** [[done: true]] على طول، وكتبت الترتيب صح.`, sol: R`~~~text الناتج (Node 24.22)
{ value: 1, done: false }
{ value: 'cleanup', done: false }
  finally خلص
{ value: 'stop', done: true }
{ value: undefined, done: true }
~~~

- [[return('stop')]] كمّل الدالة كأن الـ [[yield 1]] بقت [[return 'stop']]، فدخل الـ [[finally]]... ولقى [[yield]] فوقف عندها. فالنتيجة [[{ value: 'cleanup', done: false }]].
- [[next()]] اللي بعدها كمّلت الـ [[finally]] للآخر، وساعتها الـ [[return]] المؤجّلة كمّلت: [[{ value: 'stop', done: true }]].
- **الدرس:** [[finally]] للتنضيف بس (قفل ملف، مسح timer)، متحطش فيها [[yield]]: هتخلي [[break]] في [[for...of]] «ميقفلش» زي ما اللي بيلف فاكر.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[function* runningAverage()]]: كل ما تبعت رقم بـ [[next(x)]] بيرجّع المتوسط لحد دلوقتي. أي حاجة مش رقم (أو [[NaN]]) بتتجاهل ويرجع نفس المتوسط. أول [[next()]] بيرجّع [[null]] (لسه مفيش أرقام).`, done: R`بعد [[next()]] الأولى: [[next(10)]] بـ 10، و [[next(20)]] بـ 15، و [[next('x')]] بـ 15، و [[next(60)]] بـ 30، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js running-average.mjs
function* runningAverage() {
  let sum = 0, count = 0, avg = null;
  while (true) {
    const x = yield avg;
    if (typeof x !== 'number' || Number.isNaN(x)) continue;
    sum += x; count++;
    avg = sum / count;
  }
}
const avg = runningAverage();
avg.next();
console.log(avg.next(10).value, avg.next(20).value, avg.next('x').value, avg.next(60).value);
~~~

~~~text الناتج (Node 24.22)
10 15 15 30
~~~

**الشرح:** [[const x = yield avg]] بتعمل حاجتين: تطلّع [[avg]] الحالي لبرّه، وتستنى، ولما [[next(x)]] ييجي تبقى قيمتها [[x]]. فالحالة ([[sum]] و [[count]]) عايشة جوه الدالة من غير class ولا closure. أول [[next()]] لازم: بيشغّل الدالة لحد أول [[yield]] (اللي بتطلّع [[null]])، ومن غيره أول رقم هيضيع. و [[continue]] بيرجع لأول الـ loop فيطلّع نفس [[avg]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ logger ده بيضيّع أول سطر. ليه؟ واكتب [[primed(genFn)]] بترجّع دالة بتعمل الـ generator وتنادي أول [[next()]] لوحدها.

~~~js
function* logger() {
  while (true) { const line = yield; console.log('LOG:', line); }
}
const bad = logger();
bad.next('server started');
bad.next('request /home');
~~~`, done: R`النسخة المصلّحة بتطبع السطرين، وتقدر تقول القيمة الأولى راحت فين.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
LOG: request /home
~~~

أول [[next('server started')]] شغّل الدالة من أولها لحد أول [[yield]] ووقف. القيمة اللي اتبعتت ملهاش [[yield]] مستنياها، فاتجاهلت (حسب المواصفة). ده اسمه إن الـ generator لازم يتعمله **priming**.

~~~js logger-fixed.mjs
function* logger() {
  while (true) { const line = yield; console.log('LOG:', line); }
}
function primed(genFn) {
  return (...args) => { const g = genFn(...args); g.next(); return g; };
}
const log = primed(logger)();
log.next('server started');
log.next('request /home');
~~~

~~~text الناتج (Node 24.22)
LOG: server started
LOG: request /home
~~~

**الشرح:** [[primed]] higher-order function: بتاخد generator function وبترجّع دالة بنفس الـ arguments ([[...args]])، بتعمل الـ generator وتوصّله لأول [[yield]] قبل ما تسلّمه. ده نمط «coroutine» قديم (من Python)، ومفيد لأي generator بيستقبل أكتر ما بيطلّع.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[function* walk(node, path)]] بيلف على شجرة ملفات ([[{ name, children }]]، والملف ملوش [[children]]) ويطلّع مسار كل ملف ([['/src/lib/a.js']]). وكمان **بيرجّع** ([[return]]) عدد الملفات، وكل فولدر بيعرف عدد ملفاته من [[yield*]] على ولاده.`, done: R`المسارات التلاتة طالعين بالترتيب، و [[return]] النهائي 3، والفولدر الفاضي بيقول 0، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js walk.mjs
function* walk(node, path = '') {
  const here = path + '/' + node.name;
  if (!node.children) { yield here; return 1; }
  let files = 0;
  for (const child of node.children) files += yield* walk(child, here);
  console.log('  ' + here + ': ' + files + ' ملف');
  return files;
}
const tree = { name: 'src', children: [{ name: 'app.js' }, { name: 'lib', children: [{ name: 'a.js' }, { name: 'b.js' }] }, { name: 'empty', children: [] }] };
const it = walk(tree);
const paths = [];
let r;
while (!(r = it.next()).done) paths.push(r.value);
console.log(paths, 'المجموع', r.value);
~~~

~~~text الناتج (Node 24.22)
  /src/lib: 2 ملف
  /src/empty: 0 ملف
  /src: 3 ملف
[ '/src/app.js', '/src/lib/a.js', '/src/lib/b.js' ] المجموع 3
~~~

**الشرح:** [[yield* walk(child, here)]] ليها شغلانتين: كل [[yield]] جوه الـ child بتطلع برّه على طول (فالمسارات بتوصل للي بيلف)، ولما الـ child يخلص، قيمة الـ expression **هي الـ [[return]] بتاعه**، فبنجمعها في [[files]]. ليه [[while]] بـ [[next()]] بإيدنا مش [[for...of]]؟ لأن [[for...of]] و spread **بيرموا** قيمة الـ [[return]] (الـ [[value]] اللي مع [[done: true]])، وإحنا عايزين المجموع.` },
            { lvl: 'تحدي', t: R`**محاكاة:** مكنة مشروبات سعرها 12: [[function* vendingMachine(price)]]. كل [[next(coin)]] بيدخّل عملة (1 أو 5 أو 10 بس، الباقي مرفوض)، وبيطلّع [[{ state: 'waiting', paid, need }]]، ولما الفلوس تكفي [[{ state: 'drink', change }]] ويرجع للأول. و [[throw(new Error(...))]] = زرار الإلغاء: يرجّع الفلوس اللي اتدفعت ويبدأ من الأول **من غير** ما المكنة تقف.`, done: R`10 ثم 3 (مرفوضة) ثم 5 بيطلّعوا مشروب والباقي 3، وبعد 5 و [[throw]] بتطبع «رجّعنا 5» والمكنة بتقول [[paid: 0]] ولسه شغالة، و [[return()]] بيقفلها.`, sol: R`~~~js vending.mjs
function* vendingMachine(price) {
  let paid = 0;
  while (true) {
    try {
      while (paid < price) {
        const coin = yield { state: 'waiting', paid, need: price - paid };
        if (![1, 5, 10].includes(coin)) { console.log('  عملة مرفوضة:', coin); continue; }
        paid += coin;
      }
      yield { state: 'drink', change: paid - price };
      paid = 0;
    } catch (e) {
      console.log('  إلغاء (' + e.message + '): رجّعنا', paid);
      paid = 0;
    }
  }
}
const m = vendingMachine(12);
console.log(m.next().value);
console.log(m.next(10).value);
console.log(m.next(3).value);
console.log(m.next(5).value);
console.log(m.next().value);
console.log(m.next(5).value);
console.log(m.throw(new Error('زرار الإلغاء')).value);
console.log(m.return().done);
~~~

~~~text الناتج (Node 24.22)
{ state: 'waiting', paid: 0, need: 12 }
{ state: 'waiting', paid: 10, need: 2 }
  عملة مرفوضة: 3
{ state: 'waiting', paid: 10, need: 2 }
{ state: 'drink', change: 3 }
{ state: 'waiting', paid: 0, need: 12 }
{ state: 'waiting', paid: 5, need: 7 }
  إلغاء (زرار الإلغاء): رجّعنا 5
{ state: 'waiting', paid: 0, need: 12 }
true
~~~

**الشرح:** الـ state machine كلها في مكان الـ [[yield]]: «مستني عملة» = واقف عند الـ [[yield]] اللي جوه. [[m.throw(...)]] بيرمي الـ error **في مكان الـ [[yield]] الواقفة**، فالـ [[catch]] مسكه، ورجّع الفلوس، والـ [[while (true)]] الخارجية لفت للـ [[yield]] الجاية: فـ [[throw]] رجّعت القيمة دي مباشرة. لو مكنش فيه [[try...catch]]، الـ error كان هيطلع للي نادى [[throw]] والمكنة تتقفل للأبد. و [[return()]] مش محتاجة [[finally]]: بتقفل وخلاص.` },
          ],
          check: { lang: "js", starter: R`function* walk(node, path = '') {
  // yield مسار كل ملف، و return عدد الملفات (yield* بيرجّع return بتاع الولد)
}`, tests: R`const tree = { name: 'src', children: [{ name: 'app.js' }, { name: 'lib', children: [{ name: 'a.js' }, { name: 'b.js' }] }, { name: 'empty', children: [] }] };
const drain = (it) => { const out = []; let r; while (!(r = it.next()).done) out.push(r.value); return [out, r.value]; };
test("المسارات بالترتيب", () => expect(drain(walk(tree))[0]).toEqual(['/src/app.js', '/src/lib/a.js', '/src/lib/b.js']));
test("return = عدد الملفات", () => expect(drain(walk(tree))[1]).toBe(3));
test("ملف لوحده", () => expect(drain(walk({ name: 'x.txt' }))).toEqual([ ['/x.txt'], 1]));
test("فولدر فاضي", () => expect(drain(walk({ name: 'empty', children: [] }))).toEqual([ [], 0]));
test("for...of بيشتغل كمان", () => expect([...walk(tree)].length).toBe(3));`, solution: R`function* walk(node, path = '') {
  const here = path + '/' + node.name;
  if (!node.children) { yield here; return 1; }
  let files = 0;
  for (const child of node.children) files += yield* walk(child, here);
  return files;
}` },
          flag: "script",
          deep: {
            why: R`الـ generator مش بس «iterator أسهل»: هو دالة تقدر توقفها وتكمّلها وتبعت لها قيم وترمي جواها. ده بيخلي state machines (wizard، مكنة، parser، protocol) تتكتب كأنها كود متسلسل عادي بدل [[switch]] على [[state]]. وده بالظبط اللي async/await اتبنى عليه: [[await]] هي [[yield]] لـ Promise، والـ runtime بينادي [[next(result)]] لما تخلص و [[throw(error)]] لو فشلت.`,
            how: R`الـ generator object عنده حالة داخلية: suspendedStart (لسه متشغّلش) أو suspendedYield (واقف عند [[yield]]) أو executing أو completed. كل method بتكمّل التنفيذ بـ «completion» مختلف في مكان الـ [[yield]] الواقفة:
- [[next(v)]]: normal completion، فالـ [[yield]] قيمتها [[v]].
- [[return(v)]]: return completion، فبيعدّي على كل [[finally]] اللي حواليه وبعدين يخلص بـ [[v]]. ولو الـ [[finally]] عملت [[yield]]، بيقف هناك والـ return مستنية.
- [[throw(e)]]: throw completion، فبيدوّر على [[catch]] حوالين الـ [[yield]].

ولو الـ generator لسه في suspendedStart: [[return(v)]] بيخلّصه على طول من غير ما يشغّل ولا سطر (ولا الـ [[finally]] لأنه مدخلش الـ [[try]] أصلًا)، و [[throw(e)]] بيرمي برّه على طول ويخلّصه. ولو حد نادى [[next]] والـ generator في executing (نادى نفسه من جوه): [[TypeError: Generator is already running]].

و [[yield* inner]] بيعمل loop: بياخد iterator من [[inner]] ويفضل يمرّر له كل [[next]] و [[throw]] و [[return]] من برّه (لو الداخلي معندوش [[throw]]، بيقفله بـ [[return]] ويرمي [[TypeError: The iterator does not provide a 'throw' method.]])، ولما الداخلي يقول [[done: true]] قيمة الـ [[yield*]] هي [[value]] بتاعته.`,
            when: R`[[next(value)]]: wizards وأسئلة متتالية، و coroutines بتستقبل داتا (logger، تجميع، parser بيتغذى chunk chunk). [[return()]]: لما انت اللي بتلف بإيدك وعايز تقفل بدري (و [[for...of]] بيعملها لوحده). [[throw()]]: تبلّغ الـ generator بفشل حصل برّه (timeout، إلغاء، رد غلط من السيرفر) عشان يقرر هو يعمل retry ولا يقفل. [[yield*]]: recursion على شجر، وتقسيم generator كبير لأجزاء، وتسلسل iterables ورا بعض.`,
            mistakes: R`- تبعت قيمة في أول [[next]] ومستنيها توصل: بتضيع. اعمل priming.
- [[yield]] جوه [[finally]]: [[return]] و [[break]] مبيقفلوش زي ما انت فاكر.
- [[for...of]] أو spread وعايز قيمة الـ [[return]]: بيرموها، استخدم [[next()]] بإيدك أو [[yield*]].
- تفتكر [[throw]] على generator متشغّلش بيدخل الـ [[catch]]: لأ، بيطلع برّه على طول (اتجرّب: [[outside: before start]]) والـ generator بيخلص.
- generator بينادي [[next]] على نفسه: [[TypeError: Generator is already running]].
- [[yield]] جوه callback ([[arr.forEach(x => yield x)]]): الملف مش بيتكمبايل أصلًا، والرسالة مضللة: [[SyntaxError: missing ) after argument list]] (Node 24.22)، لأن الـ [[yield]] لازم تبقى في الـ generator نفسه، مش دالة جواه. استخدم [[for...of]] أو [[yield*]].
- [[new]] على generator function: [[TypeError: talk is not a constructor]].`,
          },
          teach: R`## الفكرة في سطر

[[yield]] مش بس بتطلّع قيمة: هي **نقطة وقوف** بيدخل منها ٣ حاجات: قيمة ([[next]])، أو أمر بالخروج ([[return]])، أو error ([[throw]]). الناتج من Node 24.22.

---

## ١. [[next(value)]]: تبعت قيمة جوه

~~~js
function* checkout() {
  try {
    const name = yield 'اسمك إيه؟';
    const qty = yield $__bt$__{name}، كام قطعة؟$__bt;
    if (!(qty > 0)) throw new Error('الكمية لازم تبقى أكبر من صفر');
    return { name, qty };
  } finally {
    console.log('  اتقفل');
  }
}
const c = checkout();
console.log(c.next('هيتجاهل'));
console.log(c.next('Sara'));
console.log(c.next(3));
~~~

~~~text الناتج
{ value: 'اسمك إيه؟', done: false }
{ value: 'Sara، كام قطعة؟', done: false }
  اتقفل
{ value: { name: 'Sara', qty: 3 }, done: true }
~~~

تابع الـ [[next]] التلاتة:

| النداء | الدالة كمّلت من فين لفين | الـ [[yield]] رجّعت | النتيجة |
|---|---|---|---|
| [[c.next('هيتجاهل')]] | من الأول لأول [[yield]] | مفيش [[yield]] مستنية، فالقيمة ضاعت | السؤال الأول |
| [[c.next('Sara')]] | من أول [[yield]] لتاني واحدة | [[name = 'Sara']] | السؤال التاني فيه الاسم |
| [[c.next(3)]] | من تاني [[yield]] للآخر | [[qty = 3]] | [[return]] بالـ object و [[done: true]]، والـ [[finally]] اشتغلت قبلها |

---

## ٢. [[return(value)]]: اقفل دلوقتي

~~~js
const c2 = checkout();
c2.next();
console.log(c2.return('ألغى'));
~~~

~~~text الناتج
  اتقفل
{ value: 'ألغى', done: true }
~~~

- الـ generator كان واقف عند السؤال الأول. [[return('ألغى')]] خلّى الـ [[yield]] دي تتصرف كأنها [[return 'ألغى']]، فخرج من الـ [[try]] والـ [[finally]] اشتغلت.
- ده بالظبط اللي [[for...of]] بيعمله لما تعمل [[break]] (درس «iteration protocols»)، فالـ [[finally]] في generator = مكان التنضيف المضمون.
- لو الـ generator لسه متشغّلش خالص: [[return('early')]] بترجّع [[{ value: 'early', done: true }]] **من غير** ما الـ [[finally]] تشتغل (اتجرّب)، لأنه مدخلش الـ [[try]] أصلًا.

---

## ٣. [[throw(error)]]: ارمي جوه

~~~js
const c3 = checkout();
c3.next();
try { c3.throw(new Error('timeout')); } catch (e) { console.log('برّه:', e.message); }
~~~

~~~text الناتج
  اتقفل
برّه: timeout
~~~

الـ error اترمى **في مكان الـ [[yield]]**. مفيش [[catch]] جوه [[checkout]]، فالـ [[finally]] اشتغلت والـ error طلع لحد اللي نادى [[throw]]، والـ generator خلص.

### لو فيه [[catch]] جوه

~~~js
function* safe() {
  while (true) {
    try { const v = yield; console.log('  value', v); }
    catch (e) { console.log('  caught inside:', e.message); }
  }
}
const sf = safe(); sf.next();
sf.next('a'); console.log(sf.throw(new Error('bad input'))); sf.next('b');
~~~

~~~text الناتج
  value a
  caught inside: bad input
{ value: undefined, done: false }
  value b
~~~

الـ [[catch]] مسكه، والـ loop كمّلت للـ [[yield]] الجاية، فـ [[throw]] **رجّعت** القيمة اللي اتطلّعت هناك والـ generator لسه شغال.

| حالة الـ generator | [[gen.throw(e)]] بيعمل إيه |
|---|---|
| واقف عند [[yield]] جوه [[try...catch]] | الـ [[catch]] بيمسك، وبيرجّع الـ [[yield]] الجاية |
| واقف عند [[yield]] من غير [[catch]] | [[finally]] لو فيه، وبعدين الـ error يطلع برّه والـ generator يخلص |
| لسه متشغّلش | الـ error يطلع برّه على طول والـ generator يخلص |
| خلص | الـ error يطلع برّه على طول |

---

## ٤. [[yield*]]: سلّم لغيرك

~~~js
function* inner() { try { const x = yield 'i1'; console.log('  inner got', x); yield 'i2'; return 'inner-done'; } finally { console.log('  inner finally'); } }
function* outer() { const r = yield* inner(); console.log('  yield* returned', r); yield 'o1'; }
const o = outer();
console.log(o.next(), o.next('hello'), o.next(), o.next());
~~~

~~~text الناتج
  inner got hello
  inner finally
  yield* returned inner-done
{ value: 'i1', done: false } { value: 'i2', done: false } { value: 'o1', done: false } { value: undefined, done: true }
~~~

(السطور اللي بتبدأ بمسافة اتطبعت الأول لأن [[console.log]] بيحسب الـ arguments الأربعة قبل ما يطبع.)

- [[next('hello')]] وصلت للـ [[inner]] مباشرة: [[inner got hello]]. الـ [[outer]] مشافهاش.
- لما [[inner]] عمل [[return 'inner-done']]، القيمة دي **مطلعتش** كـ [[value]] برّه: بقت قيمة الـ [[yield*]] نفسها ([[r]]).
- و [[return]] برّه بتوصل جوه: [[o2.next()]] وبعدين [[o2.return('cut')]] طبعت [[inner finally]] ورجّعت [[{ value: 'cut', done: true }]].
- [[yield*]] على أي iterable: [[ yield* [1, 2] ]] و [[yield* 'ab']] و [[yield* map.keys()]].

---

## ٥. [[Generator]] من جوه

كل generator object بيورث من [[talk.prototype]] (كل generator function ليها [[prototype]] خاص بيها)، وده بيورث من [[Generator.prototype]] اللي عليه التلاتة:

~~~text الناتج: Object.getOwnPropertyNames(Object.getPrototypeOf(talk.prototype))
[ 'constructor', 'next', 'return', 'throw' ]
~~~

و [[Object.prototype.toString.call(g)]] بـ [[[object Generator]]]، و [[ g[Symbol.iterator]() === g ]] بـ [[true]] (iterator و iterable). و [[Generator]] مش global: بتوصله من [[Object.getPrototypeOf]] (درس «AsyncFunction و GeneratorFunction و AsyncGeneratorFunction» في الوحدة دي).

---

## الخلاصة

| الـ method | الـ [[yield]] الواقفة بتبقى | النتيجة |
|---|---|---|
| [[next(v)]] | قيمتها [[v]] (أول مرة: بتتجاهل) | لحد الـ [[yield]] الجاية أو الآخر |
| [[return(v)]] | [[return v]]، والـ [[finally]] بتشتغل | [[{ value: v, done: true }]] غالبًا |
| [[throw(e)]] | [[throw e]] | الـ [[catch]] جوه أو الـ error برّه |
| [[yield* x]] | بتمرّر التلاتة لـ [[x]] | قيمتها الـ [[return]] بتاع [[x]] |`,
          lines: [
            R`generator function بتسأل سؤالين وتستنى الإجابات من برّه.`,
            R`[[try]] عشان الـ [[finally]] تشتغل في كل طرق الخروج.`,
            R`[[yield]] بتطلّع السؤال لبرّه وتوقف، ولما [[next(x)]] ييجي، [[x]] بيبقى قيمة [[name]].`,
            R`نفس الفكرة: السؤال التاني فيه الاسم اللي وصل، والإجابة بتتحط في [[qty]].`,
            R`تحقق: لو الكمية مش رقم أكبر من صفر بنرمي error جوه الـ generator.`,
            R`[[return]] بيخلّص الـ generator: الـ object ده بيبقى [[value]] مع [[done: true]].`,
            R`[[finally]]: بتشتغل في الخلاص العادي، وفي [[return()]]، وفي [[throw()]].`,
            R`بتطبع إنه اتقفل عشان نشوف إمتى بالظبط.`,
            R`قفلة الـ [[finally]].`,
            R`قفلة [[checkout]].`,
            R`generator object جديد. ولا سطر جوه اشتغل لسه.`,
            R`أول [[next]]: القيمة اللي اتبعتت ملهاش [[yield]] مستنياها فبتتجاهل، والناتج السؤال الأول.`,
            R`[[name]] بقى [['Sara']]، والناتج السؤال التاني والاسم جواه.`,
            R`[[qty]] بقى 3، الـ [[return]] اشتغل، والـ [[finally]] طبعت [[اتقفل]] قبل ما النتيجة توصل.`,
            R`generator تاني عشان نجرّب الإلغاء.`,
            R`أول [[next]] بيشغّله لحد السؤال الأول ويوقف هناك، عشان يبقى فيه [[yield]] واقفة نلغيها.`,
            R`[[return('ألغى')]]: الـ [[yield]] الواقفة بقت [[return]]، فالـ [[finally]] اشتغلت والنتيجة [[{ value: 'ألغى', done: true }]].`,
            R`generator تالت عشان نجرّب [[throw]].`,
            R`برضه نوصّله لأول [[yield]]، عشان الـ error يترمي جوه الـ [[try]].`,
            R`[[throw]] رمى الـ error مكان الـ [[yield]]: مفيش [[catch]] جوه، فالـ [[finally]] اشتغلت والـ error طلع للـ [[catch]] اللي برّه.`,
          ],
          ref: [
            { t: "MDN: Generator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator" },
            { t: "MDN: Generator.prototype.next()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next" },
            { t: "MDN: Generator.prototype.return()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return" },
            { t: "MDN: Generator.prototype.throw()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw" },
            { t: "MDN: yield*", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*" },
            { t: "ECMAScript: Generator Objects", url: "https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-generator-objects" },
          ],
          pre: ["js/iteration protocols: next و return و throw", { to: "js/try و catch و finally", why: R`[[finally]] وإمتى بتشتغل` }, { to: "js/iterators و generators", why: R`[[function*]] و [[yield]] و lazy في أبسط صورهم` }],
        },
        {
          cmd: "Iterator helpers: Iterator.from و Iterator.concat",
          title: "map و filter و take و reduce على أي iterator من غير ما تعمل array: كل الـ helpers، و Iterator.from و Iterator.concat، وإمتى lazy بيكسب فعلًا",
          desc: R`من ES2025 كل iterator بيورث من [[Iterator.prototype]] عليه **helpers** شبه بتوع الـ array: [[map]] و [[filter]] و [[take]] و [[drop]] و [[flatMap]] بيرجّعوا iterator جديد **lazy** (مبيعملوش حاجة لحد ما حد يطلب)، و [[reduce]] و [[toArray]] و [[forEach]] و [[some]] و [[every]] و [[find]] بيلفوا فعلًا ويرجّعوا نتيجة. فتقدر تكتب [[map.entries().filter(...).map(...)]] أو تشتغل على generator لانهائي أو على ٢ مليون صف من غير ما تحطهم في array.

• [[Iterator.from(x)]]: بيحوّل أي iterable أو أي object عنده [[next]] بس لـ iterator عليه الـ helpers.
• [[Iterator.concat(a, b, ...)]]: iterator واحد بيلف على كذا iterable ورا بعض (موجود في Chrome 157، ومش موجود في Node 24.22، والبديل generator من سطرين).

والـ lazy مش «أسرع دايمًا»: لو الداتا أصلًا array في الذاكرة، سلسلة الـ array أسرع. الـ helpers بتكسب لما المصدر generator أو ملف أو لانهائي، أو لما محتاج أول كام نتيجة بس.`,
          example: R`// helpers على أي iterator: lazy، قيمة قيمة
function* naturals() { for (let n = 1; ; n++) yield n; }
let calls = 0;
const oddSquares = naturals().map((n) => { calls++; return n * n; }).filter((n) => n % 2).take(3).toArray();
console.log(oddSquares, 'calls', calls);
const stock = new Map([['tea', 3], ['milk', 0], ['rice', 7]]);
console.log(stock.entries().filter(([, q]) => q > 0).map(([k]) => k).toArray());
const nums = () => [5, 12, 8, 130, 44].values();
console.log(nums().drop(1).take(3).toArray(), nums().reduce((a, b) => a + b, 0));
console.log(nums().some((x) => x > 100), nums().every((x) => x > 1), nums().find((x) => x > 10));
console.log([ ['a', [1, 2] ], ['b', [3] ] ].values().flatMap(([, v]) => v).toArray());
let n = 0;
const legacy = { next: () => (n < 3 ? { value: ++n, done: false } : { value: undefined, done: true }) };
console.log(Iterator.from(legacy).map((x) => x * 10).toArray(), typeof Iterator.concat);`,
          try: R`سلسلة صغيرة بـ [[map]] و [[filter]] بيكتبوا في [[log]] كل ما يتنادوا، مرة على [[[1, 2, 3].values()]] ومرة على [[[1, 2, 3]]] نفسها (array methods). اطبع [[log]] في الحالتين، وفي حالة الـ iterator اكتب [[log.push('built')]] بعد ما تبني السلسلة وقبل [[toArray()]].`,
          sol: R`~~~js order.mjs
const log = [];
const pipeline = [1, 2, 3].values().map((x) => { log.push('map ' + x); return x; }).filter((x) => { log.push('filter ' + x); return x !== 2; });
log.push('built');
pipeline.toArray();
console.log(log.join(' | '));
const log2 = [];
[1, 2, 3].map((x) => { log2.push('map ' + x); return x; }).filter((x) => { log2.push('filter ' + x); return x !== 2; });
console.log(log2.join(' | '));
~~~

~~~text الناتج (Node 24.22)
built | map 1 | filter 1 | map 2 | filter 2 | map 3 | filter 3
map 1 | map 2 | map 3 | filter 1 | filter 2 | filter 3
~~~

- **الـ iterator:** بناء السلسلة معملش أي حاجة ([[built]] الأول). ولما [[toArray]] طلبت، كل قيمة عدّت على [[map]] وبعدين [[filter]] قبل ما اللي بعدها تبدأ: «عمودي».
- **الـ array:** [[map]] خلّص على الكل وعمل array جديدة، وبعدين [[filter]] على الكل: «أفقي»، و array وسطانية في الذاكرة.
- ده سبب إن [[take(3)]] على iterator بيوقف الشغل كله بدري، وعلى array الشغل بيكون اتعمل خلاص.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الـ [[firstSquares]] فوق في المثال: [[calls]] طلع 5. ليه 5 بالظبط مش 3 ومش 6؟ اكتب الأرقام اللي دخلت [[map]] واحد واحد، وإيه اللي عدّى من [[filter]].`, done: R`كتبت ١ و ٢ و ٣ و ٤ و ٥، وإن [[filter]] عدّى ١ و ٩ و ٢٥ ووقف [[take]] بعد التالت، فـ [[naturals]] موصلش لـ 6.`, sol: R`| الرقم من [[naturals]] | [[map]] طلّع | [[filter]] (فردي؟) | [[take(3)]] عنده |
|---|---|---|---|
| 1 | 1 | أيوه | 1 من 3 |
| 2 | 4 | لأ، بيطلب اللي بعده | لسه 1 |
| 3 | 9 | أيوه | 2 من 3 |
| 4 | 16 | لأ | لسه 2 |
| 5 | 25 | أيوه | 3 من 3: خلاص، بيقول [[done]] |

~~~text الناتج (Node 24.22)
[ 1, 9, 25 ] calls 5
~~~

**الشرح:** [[toArray]] بتطلب من [[take]]، و [[take]] من [[filter]]، و [[filter]] بتفضل تطلب من [[map]] لحد ما تلاقي واحد يعدّي، و [[map]] بتطلب من [[naturals]]. بعد التالت، [[take]] بيرد [[done]] وكمان **بيقفل** اللي قبله ([[return]] بتوصل لحد الـ generator). فالـ generator اللانهائي اتحسب منه ٥ قيم بس. ولو قلبت الترتيب ([[take(3)]] قبل [[filter]]) هياخد ١ و ٢ و ٣ ويفلتر منهم: [[[ 1, 9 ]]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** لوج سيرفر (تحت) فيه سطر فاضي وسطر بايظ. من غير ما تعمل arrays وسطانية: هات **أول اتنين** طلبات status بتاعهم 500 أو أكتر (المسار والـ status والوقت)، وأبطأ طلب في اللوج كله.

~~~text access.log
2026-11-21T10:00:01Z GET /home 200 12ms
2026-11-21T10:00:02Z GET /api/cart 500 340ms
2026-11-21T10:00:03Z POST /api/order 201 88ms

2026-11-21T10:00:04Z GET /api/cart 500 410ms
2026-11-21T10:00:05Z GET /img/logo.png 404 3ms
2026-11-21T10:00:06Z POST /api/pay 502 1200ms
broken line here
2026-11-21T10:00:07Z GET /home 200 9ms
~~~`, done: R`بيطبع [[/api/cart 500 340ms]] و [[/api/cart 500 410ms]] بس (مش الـ 502 لأن [[take(2)]])، وأبطأ طلب [[/api/pay 1200ms]]، والسطر الفاضي والبايظ مش عاملين error.`, sol: R`~~~js errors.mjs
const log = $__bt2026-11-21T10:00:01Z GET /home 200 12ms
2026-11-21T10:00:02Z GET /api/cart 500 340ms
2026-11-21T10:00:03Z POST /api/order 201 88ms

2026-11-21T10:00:04Z GET /api/cart 500 410ms
2026-11-21T10:00:05Z GET /img/logo.png 404 3ms
2026-11-21T10:00:06Z POST /api/pay 502 1200ms
broken line here
2026-11-21T10:00:07Z GET /home 200 9ms$__bt;
const parsed = log.split('\n').values()
  .filter((line) => line.trim() !== '')
  .map((line) => line.split(' '))
  .filter((parts) => parts.length === 5)
  .map(([time, method, path, status, ms]) => ({ time, method, path, status: Number(status), ms: parseInt(ms) }));
const firstServerErrors = parsed.filter((r) => r.status >= 500).take(2).toArray();
console.log(firstServerErrors.map((r) => r.path + ' ' + r.status + ' ' + r.ms + 'ms'));
const slowest = log.split('\n').values().filter((l) => l.split(' ').length === 5).map((l) => l.split(' ')).reduce((best, p) => (parseInt(p[4]) > parseInt(best[4]) ? p : best));
console.log('أبطأ طلب:', slowest[2], slowest[4]);
~~~

~~~text الناتج (Node 24.22)
[ '/api/cart 500 340ms', '/api/cart 500 410ms' ]
أبطأ طلب: /api/pay 1200ms
~~~

**الشرح:** [[split('\n')]] بيعمل array السطور (ده مقبول هنا: النص كله في الذاكرة أصلًا)، و [[.values()]] بيحوّلها iterator عشان باقي السلسلة تبقى lazy. الـ [[filter]] الأولى بتشيل السطر الفاضي، والتانية ([[parts.length === 5]]) بتشيل البايظ قبل ما الـ destructuring يحاول يقراه. و [[parseInt('340ms')]] بتقرا الأرقام وتقف عند [[m]]. و [[reduce]] من غير قيمة بداية بياخد أول عنصر بداية، وده آمن هنا لأن فيه سطور؛ على لوج فاضي كان هيرمي [[TypeError: Reduce of a done iterator with no initial value]]. في ملف حقيقي كبير، [[log.split]] تتبدّل بقراية سطر سطر (درس «AsyncIterator و async generators» ومشروع الوحدة الكبير).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فيه غلطتين. اقرا الناتج وصلّح:

~~~js
const words = ['tea', 'rice'].values().map((w) => w.toUpperCase());
console.log(words.toArray(), words.toArray());
console.log(['ab', 'cd'].values().flatMap((w) => w).toArray());
~~~`, done: R`المرتين بيطبعوا [[[ 'TEA', 'RICE' ]]]، و [[flatMap]] بيطبع الحروف الأربعة.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
[ 'TEA', 'RICE' ] []
TypeError: Iterator.prototype.flatMap called on non-object
~~~

~~~js fixed.mjs
const upper = () => ['tea', 'rice'].values().map((w) => w.toUpperCase());
console.log(upper().toArray(), upper().toArray());
console.log(['ab', 'cd'].values().flatMap((w) => w[Symbol.iterator]()).toArray(), ['ab', 'cd'].values().flatMap((w) => [...w]).toArray());
~~~

~~~text الناتج (Node 24.22)
[ 'TEA', 'RICE' ] [ 'TEA', 'RICE' ]
[ 'a', 'b', 'c', 'd' ] [ 'a', 'b', 'c', 'd' ]
~~~

- **الأولى:** [[words]] iterator مش array: [[toArray]] الأولى استهلكته، والتانية لقته فاضي. الحل: دالة بتبني السلسلة كل مرة، أو [[toArray()]] مرة واحدة وخزّن الـ array.
- **التانية:** [[flatMap]] بتاع الـ iterators بيرفض الـ string كنتيجة بقصد (عشان [[flatMap(x => x)]] على كلمات ميفردهاش حروف بالغلط زي ما بيحصل في حاجات تانية)، والرسالة مضللة ([[called on non-object]]). لو عايز الحروف فعلًا، رجّع iterator ([[w[Symbol.iterator]()]]) أو array ([[[...w]]]). وده فرق عن [[Array.prototype.flatMap]] اللي مبيفردش الـ strings أصلًا (بيحطها زي ما هي).` },
            { lvl: 'تحدي', t: R`**مسألة:** [[firstDuplicate(iterable)]] بترجّع أول قيمة اتكررت (أول ما تظهر للمرة التانية)، أو [[undefined]]. لازم تشتغل على generator لانهائي (وتقفله)، وعلى string، بـ [[Iterator.from]] و [[find]] و [[Set]].`, done: R`[[firstDuplicate([3, 1, 4, 1, 5])]] بـ 1، و [['abcb']] بـ [['b']]، و [[[1, 2, 3]]] بـ [[undefined]]، والـ generator اللانهائي بيرجّع 0 والـ [[finally]] بتاعه اشتغلت، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js first-duplicate.mjs
function firstDuplicate(iterable) {
  const seen = new Set();
  return Iterator.from(iterable).find((x) => (seen.has(x) ? true : (seen.add(x), false)));
}
function* forever(log) { try { for (let i = 0; ; i++) { yield i % 7; } } finally { log.push('closed'); } }
const log = [];
console.log(firstDuplicate([3, 1, 4, 1, 5]), firstDuplicate('abcb'), firstDuplicate([1, 2, 3]), firstDuplicate(forever(log)), log);
console.log(firstDuplicate([NaN, 0, NaN]), firstDuplicate([0, -0]));
~~~

~~~text الناتج (Node 24.22)
1 b undefined 0 [ 'closed' ]
NaN -0
~~~

**الشرح:** [[Iterator.from]] بيقبل أي iterable (array و string و generator) ويدّيك iterator عليه [[find]]. و [[find]] بيقف أول ما الدالة ترجّع [[true]] و **بيقفل** المصدر (فالـ [[finally]] بتاعة [[forever]] اشتغلت عند 0 في اللفة التامنة). و [[(seen.add(x), false)]] بـ comma operator: ضيف وارجع [[false]] في سطر. والـ [[Set]] بيقارن بـ SameValueZero، فـ [[NaN]] بيتعرف إنه متكرر، و [[0]] و [[-0]] واحد (ورجّع [[-0]] لأنه التاني).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** مليون رقم في array **جاهزة في الذاكرة**. احسب مجموع [[x * 2]] للي بيقبل القسمة على 3 بـ ٣ طرق: سلسلة array ([[map]] و [[filter]] و [[reduce]])، وسلسلة iterator على [[big.values()]]، و [[for...of]] عادي. شغّل ٣ مرات وقارن.`, done: R`عندك ٣ أرقام لكل طريقة، ولقيت إن الـ iterator **مش** الأسرع هنا، وتقدر تقول إمتى بيكسب.`, sol: R`~~~js speed.mjs
const big = Array.from({ length: 1_000_000 }, (_, i) => i);
let t = performance.now(); let s1 = big.map((x) => x * 2).filter((x) => x % 3 === 0).reduce((a, b) => a + b, 0); const ta = performance.now() - t;
t = performance.now(); let s2 = big.values().map((x) => x * 2).filter((x) => x % 3 === 0).reduce((a, b) => a + b, 0); const tb = performance.now() - t;
t = performance.now(); let s3 = 0; for (const x of big) { const y = x * 2; if (y % 3 === 0) s3 += y; } const tc = performance.now() - t;
console.log('array', ta.toFixed(1), 'iterator', tb.toFixed(1), 'for-of', tc.toFixed(1));
~~~

~~~text الناتج (Node 24.22، ٣ مرات)
array 30.9 iterator 40.4 for-of 12.9
array 29.5 iterator 40.2 for-of 12.6
array 28.2 iterator 37.4 for-of 12.6
~~~

**القراءة:** لما الداتا array جاهزة ومحتاج **كل** العناصر، الـ helpers أبطأ من الـ array methods (كل قيمة بتعدّي على [[next()]] و object [[{ value, done }]] في كل مرحلة)، و [[for...of]] العادي أسرع الكل بمرتين. الـ helpers بتكسب في حالتين اتقاسوا في الدرس: (١) محتاج أول كام نتيجة بس ([[take(5)]] عمل ١٣ نداء بدل مليون)، (٢) المصدر مش array أصلًا (generator أو ملف)، فالـ array محتاجة تتعمل الأول: ٢ مليون object من generator خدوا ١٦٤ms و 244 MB كـ array، و 89ms و 64 MB كـ iterator.` },
          ],
          check: { lang: "js", starter: R`function firstDuplicate(iterable) {
  // Iterator.from و find و Set
}`, tests: R`function* forever(log) { try { for (let i = 0; ; i++) yield i % 7; } finally { log.push('closed'); } }
test("array", () => expect(firstDuplicate([3, 1, 4, 1, 5])).toBe(1));
test("string", () => expect(firstDuplicate('abcb')).toBe('b'));
test("مفيش تكرار", () => expect(firstDuplicate([1, 2, 3])).toBe(undefined));
test("فاضي", () => expect(firstDuplicate([])).toBe(undefined));
test("generator لانهائي وبيتقفل", () => { const log = []; const r = firstDuplicate(forever(log)); expect([r, log]).toEqual([0, ['closed'] ]); });
test("أول تكرار مش أول قيمة متكررة", () => expect(firstDuplicate([1, 2, 2, 1])).toBe(2));`, solution: R`function firstDuplicate(iterable) {
  const seen = new Set();
  return Iterator.from(iterable).find((x) => (seen.has(x) ? true : (seen.add(x), false)));
}` },
          flag: "script",
          deep: {
            why: R`قبل الـ helpers كان عندك اختيارين وحشين: تحوّل الـ iterator لـ array ([[[...it]]]) وتخسر الـ lazy والذاكرة، أو تكتب [[for...of]] بـ [[if]] و [[break]] وعدّادات. الـ helpers بيدّوك نفس شكل [[arr.map().filter()]] اللي متعوّد عليه، على Map و Set و generators و streams، ومن غير arrays وسطانية. وبيبقى سهل تشتغل على مصدر لانهائي أو ضخم وتاخد منه اللي محتاجه بس.`,
            how: R`[[map]] و [[filter]] و [[take]] و [[drop]] و [[flatMap]] بيرجّعوا «Iterator Helper» object ([[[object Iterator Helper]]]) ماسك الـ iterator اللي قبله والدالة. كل [[next()]] عليه بينادي [[next()]] على اللي قبله **مرة أو أكتر** (الـ [[filter]] بيكرّر لحد ما يلاقي واحد يعدّي)، فالقيم بتمشي واحدة واحدة في السلسلة كلها. و [[return()]] على أي helper بيقفل اللي قبله لحد المصدر.

[[reduce]] و [[toArray]] و [[forEach]] و [[some]] و [[every]] و [[find]] بيلفوا بنفسهم. التلاتة الأخيرين بيقفوا بدري وبيقفلوا المصدر بـ [[return]]. والدوال بتاخد [[(value, index)]] (counter بيبدأ من 0)، من غير الـ argument التالت اللي في الـ arrays (مفيش array).

[[Iterator.from(x)]]: لو [[x]] string أو عنده [[Symbol.iterator]] بياخد الـ iterator بتاعه، ولو الـ iterator ده بيورث من [[Iterator.prototype]] بيرجّعه زي ما هو، وإلا بيلفّه في wrapper. ولو [[x]] object من غير [[Symbol.iterator]] بيعامله كـ iterator ويلفّه (حتى لو معندوش [[next]]: [[Iterator.from({})]] بيعدّي والـ error بييجي عند أول [[next]]: [[TypeError: undefined is not a function]]، اتجرّب).`,
            when: R`استخدم الـ helpers لما: المصدر iterator أصلًا (Map و Set و generators و [[matchAll]] و [[readline]] بعد ما تجمعه، و [[str.split]] الكبير بعد [[values()]])، أو محتاج أول N، أو المصدر لانهائي، أو الذاكرة مهمة. استخدم array methods لما: الداتا array صغيرة أو متوسطة وجاهزة في الذاكرة ومحتاج كلها، أو محتاج [[sort]] أو index عشوائي أو تلف مرتين. واستخدم [[for...of]] لما الأداء الخام مهم أو المنطق فيه حالات كتير. و [[Iterator.concat]] لما عايز تلف على كذا مصدر كأنهم واحد من غير ما تلزقهم في array (الملفات الشهرية مثلًا).`,
            mistakes: R`- تستخدم نفس الـ helper iterator مرتين: التانية فاضية.
- [[take]] و [[drop]] بأرقام سالبة أو [[NaN]]: [[RangeError: -1 must be positive]] و [[RangeError: NaN must be positive]].
- [[map(5)]] أو أي حاجة مش function: [[TypeError: number 5 is not a function]].
- [[reduce]] من غير قيمة بداية على iterator فاضي: [[TypeError: Reduce of a done iterator with no initial value]].
- [[flatMap]] يرجّع string: [[TypeError: Iterator.prototype.flatMap called on non-object]].
- تستنى [[forEach]] ترجّع حاجة: بترجّع [[undefined]]، وبتلف على طول (مش lazy).
- [[Iterator.from(5)]]: [[TypeError: Iterator.from called on non-object]].
- تفتكر [[naturals().toArray()]] هتخلص: لانهائي = البرنامج يعلّق. [[take]] الأول.
- تستخدم [[Iterator.concat]] في Node 24: [[undefined]]. استخدم الـ fallback لحد ما Node يضيفه.
- تفتكر الـ helpers موجودة على الـ async iterators: لأ ([[AsyncIterator.prototype]] معندوش [[map]]). اجمع بـ [[Array.fromAsync]] أو اكتب async generator.`,
          },
          teach: R`## الفكرة في سطر

نفس [[map]] و [[filter]] اللي تعرفها، بس على iterator: مبتعملش array، وبتشتغل قيمة قيمة لما حد يطلب. الناتج من Node 24.22 إلا [[Iterator.concat]] (Chrome 157).

---

## ١. السلسلة على generator لانهائي

~~~js
function* naturals() { for (let n = 1; ; n++) yield n; }
let calls = 0;
const oddSquares = naturals().map((n) => { calls++; return n * n; }).filter((n) => n % 2).take(3).toArray();
console.log(oddSquares, 'calls', calls);
~~~

~~~text الناتج
[ 1, 9, 25 ] calls 5
~~~

- [[naturals()]] لانهائي. لو كانت array methods، [[map]] كانت هتحاول تخلّص الكل وتعلّق.
- [[map]] اتنادت ٥ مرات بس: [[take(3)]] وقّف السلسلة بعد تالت رقم فردي (تمرين «اقرا وتوقّع» فيه الجدول).

---

## ٢. اللي بيرجّعوا iterator (lazy)

| الـ helper | بيعمل إيه | مثال اتشغّل |
|---|---|---|
| [[map(fn)]] | كل قيمة تعدّي على [[fn(value, index)]] | [[['a', 'b', 'c'].values().map((x, i) => i + x)]] بـ [[[ '0a', '1b', '2c' ]]] |
| [[filter(fn)]] | سيب اللي [[fn]] بترجّع له truthy | [[stock.entries().filter(([, q]) => q > 0)]] |
| [[take(n)]] | أول [[n]] وبعدين [[done]] ويقفل المصدر | [[nums().take(2)]] |
| [[drop(n)]] | اتخطى أول [[n]] | [[nums().drop(1).take(3)]] بـ [[[ 12, 8, 130 ]]] |
| [[flatMap(fn)]] | [[fn]] ترجّع iterable أو iterator، وقيمه تطلع واحدة واحدة | تحت في القسم ٤ |

~~~js
const stock = new Map([['tea', 3], ['milk', 0], ['rice', 7]]);
console.log(stock.entries().filter(([, q]) => q > 0).map(([k]) => k).toArray());
~~~

~~~text الناتج
[ 'tea', 'rice' ]
~~~

[[stock.entries()]] iterator على [[[key, value]]]، و [[([, q])]] destructuring بيتخطى المفتاح (الفاصلة الأولى فاضية) وياخد الكمية. ومفيش ولا array اتعملت لحد [[toArray]].

---

## ٣. اللي بيلفوا ويرجّعوا نتيجة

~~~js
const nums = () => [5, 12, 8, 130, 44].values();
console.log(nums().drop(1).take(3).toArray(), nums().reduce((a, b) => a + b, 0));
console.log(nums().some((x) => x > 100), nums().every((x) => x > 1), nums().find((x) => x > 10));
~~~

~~~text الناتج
[ 12, 8, 130 ] 199
true true 12
~~~

| الـ helper | بيرجّع | بيقف بدري ويقفل المصدر؟ |
|---|---|---|
| [[toArray()]] | array بكل القيم | لأ، بيلف لآخره |
| [[reduce(fn, init)]] | القيمة المتجمّعة، ومن غير [[init]] أول قيمة بتبقى البداية | لأ |
| [[forEach(fn)]] | [[undefined]] دايمًا | لأ |
| [[some(fn)]] | [[true]] أول ما واحدة تعدّي | أيوه، عند أول [[true]] |
| [[every(fn)]] | [[false]] أول ما واحدة تفشل | أيوه، عند أول [[false]] |
| [[find(fn)]] | أول قيمة تعدّي أو [[undefined]] | أيوه |

[[nums]] دالة مش متغير: كل سطر محتاج iterator جديد، لأن أي iterator بيتستهلك (لو كتبت [[const it = ...]] واستخدمته في [[some]] وبعدين [[every]]، التانية هتشتغل على الباقي بس).

### القفل اتقاس

~~~text الناتج: src(log).some((x) => x === 2) على generator لانهائي فيه finally
true gen 1 | gen 2 | closed
~~~

[[some]] لقى 2، ونادى [[return]] على الـ generator فالـ [[finally]] اشتغلت ([[closed]]). نفس الحاجة مع [[take(2).toArray()]].

---

## ٤. [[flatMap]]: كل قيمة تبقى كذا قيمة

~~~js
console.log([ ['a', [1, 2] ], ['b', [3] ] ].values().flatMap(([, v]) => v).toArray());
~~~

~~~text الناتج
[ 1, 2, 3 ]
~~~

الدالة رجّعت array لكل عنصر، و [[flatMap]] لف على كل array وطلّع قيمها. ولو رجّعت string بيرمي [[TypeError: Iterator.prototype.flatMap called on non-object]] بقصد (تمرين «صلّح»).

---

## ٥. [[Iterator.from]]: أي حاجة تبقى iterator بـ helpers

~~~js
let n = 0;
const legacy = { next: () => (n < 3 ? { value: ++n, done: false } : { value: undefined, done: true }) };
console.log(Iterator.from(legacy).map((x) => x * 10).toArray(), typeof Iterator.concat);
~~~

~~~text الناتج
[ 10, 20, 30 ] undefined
~~~

- [[legacy]] object عنده [[next]] بس (زي iterators مكتبات قديمة): [[legacy.map]] بـ [[undefined]]. [[Iterator.from]] لفّه في iterator بيورث من [[Iterator.prototype]]، فـ [[map]] اشتغلت.
- [[Iterator.from([1, 2])]] و [[Iterator.from('أب')]] و [[Iterator.from(new Set([1, 1, 2]))]] طلّعوا [[[ 1, 2 ]]] و [[[ 'أ', 'ب' ]]] و [[[ 1, 2 ]]].
- لو اللي اديته iterator حقيقي أصلًا: [[Iterator.from(ai) === ai]] بـ [[true]]، مفيش wrapper.
- [[typeof Iterator.concat]] بـ [[undefined]] في Node 24.22: القسم الجاي.

---

## ٦. [[Iterator.concat]]: كذا مصدر كأنهم واحد

موجود في Chrome 157، واتشغّل في الـ Console هناك:

~~~js
function* a() { yield 1; yield 2; }
Iterator.concat(a(), [3, 4], new Set([5])).toArray();
Object.prototype.toString.call(Iterator.concat([1]));
Iterator.concat('ab');
~~~

~~~text الناتج (Chrome 157)
[1, 2, 3, 4, 5]
[object Iterator Helper]
TypeError: Iterator.concat called on non-object
~~~

- بياخد iterables ويلف عليهم ورا بعض، lazy: اتجرّب بـ generators بتسجّل، و [[start 2]] متكتبتش غير لما الأول خلص.
- الـ strings مرفوضة (لازم objects)، زي [[flatMap]].

### البديل في Node 24

~~~js
const concat = Iterator.concat ?? ((...iterables) => Iterator.from((function* () { for (const it of iterables) yield* it; })()));
console.log(concat(a(), [3, 4], new Set([5])).toArray());
~~~

~~~text الناتج (Node 24.22)
[ 1, 2, 3, 4, 5 ]
~~~

[[??]] بيستخدم الأصلي لو موجود. والبديل generator بـ [[yield*]] على كل iterable، والفرق الوحيد إنه بيقبل strings.

---

## ٧. إمتى الـ lazy بيكسب: اتقاس

| الحالة | array methods | iterator helpers |
|---|---|---|
| مليون رقم array جاهزة، كلها (map و filter و reduce) | حوالي 30ms | حوالي 40ms، و [[for...of]] حوالي 13ms |
| مليون رقم array جاهزة، أول 5 بس | 21.7ms ومليون نداء لـ [[map]] | 0.1ms و 13 نداء |
| ٢ مليون object من generator، فلتر وجمع | 164ms و 244 MB (لازم [[Array.from]] الأول) | 89ms و 64 MB |
| ٢ مليون object من generator، أول 5 | الذاكرة زادت 144.5 MB | الذاكرة زادت 0.1 MB |

القاعدة: الـ helpers مش «أسرع»، هي «مبتعملش شغل مش محتاجه». لو محتاج كل حاجة والداتا في الذاكرة، الـ array أو [[for...of]].

---

## الخلاصة

- [[map]] و [[filter]] و [[take]] و [[drop]] و [[flatMap]] lazy وبيرجّعوا iterator.
- [[toArray]] و [[reduce]] و [[forEach]] بيلفوا للآخر، و [[some]] و [[every]] و [[find]] بيقفوا بدري ويقفلوا المصدر.
- [[Iterator.from]] لأي iterable أو object بـ [[next]]، و [[Iterator.concat]] لسلسلة مصادر (مع بديل في Node).
- الـ iterator بيتستهلك مرة، والـ helpers مش على الـ async iterators.`,
          lines: [
            R`generator لانهائي: 1 و 2 و 3... من غير آخر. مبيحسبش غير لما حد يطلب.`,
            R`عدّاد بيعرّفنا [[map]] اتنادت كام مرة فعلًا.`,
            R`السلسلة: [[map]] بتربّع (وبتعدّ)، و [[filter]] بتسيب الفردي ([[n % 2]] بـ 1 truthy)، و [[take(3)]] أول ٣، و [[toArray]] هي اللي بتبدأ الطلب.`,
            R`[[[ 1, 9, 25 ]]] و [[calls 5]]: الأرقام من 1 لـ 5 بس اتحسبت.`,
            R`[[Map]] فيه منتجات وكمياتها، منهم واحد كميته صفر.`,
            R`[[entries()]] iterator، فلترنا الكمية الأكبر من صفر وخدنا المفتاح: [[[ 'tea', 'rice' ]]].`,
            R`دالة بترجّع iterator جديد كل مرة، لأن الـ iterator بيتستهلك.`,
            R`[[drop(1)]] اتخطى 5 و [[take(3)]] خد 12 و 8 و 130، و [[reduce]] جمع الكل من صفر: 199.`,
            R`[[some]] لقى 130 فـ [[true]]، و [[every]] كلهم أكبر من 1 فـ [[true]]، و [[find]] أول واحد أكبر من 10: 12.`,
            R`[[flatMap]] رجّع الـ array اللي في كل عنصر، وطلّع قيمها: [[[ 1, 2, 3 ]]].`,
            R`عدّاد لـ iterator «قديم» مكتوب بإيدنا.`,
            R`object عنده [[next]] بس، ومش بيورث من [[Iterator.prototype]]، فمعندوش [[map]].`,
            R`[[Iterator.from]] لفّه وادّاله الـ helpers: [[[ 10, 20, 30 ]]]، و [[Iterator.concat]] مش موجود في Node 24.22 فـ [[undefined]].`,
          ],
          ref: [
            { t: "MDN: Iterator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator" },
            { t: "MDN: Iterator.from()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/from" },
            { t: "MDN: Iterator.concat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/concat" },
            { t: "MDN: Iterator.prototype.map()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map" },
            { t: "MDN: Iterator.prototype.filter()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter" },
            { t: "MDN: Iterator.prototype.flatMap()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap" },
            { t: "MDN: Iterator.prototype.reduce()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce" },
            { t: "MDN: Iterator.prototype.some()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some" },
            { t: "MDN: Iterator.prototype.every()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every" },
            { t: "MDN: Iterator.prototype.find()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find" },
            { t: "MDN: Iterator.prototype.take()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take" },
            { t: "MDN: Iterator.prototype.drop()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop" },
            { t: "MDN: Iterator.prototype.forEach()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach" },
            { t: "MDN: Iterator.prototype.toArray()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray" },
          ],
          pre: ["js/iteration protocols: next و return و throw", { to: "js/map و filter و reduce", why: R`نفس الـ methods على الـ arrays` }, "js/Generator: next و return و throw و yield*"],
        },
        {
          cmd: "AsyncIterator و async generators: for await بعمق",
          title: "Symbol.asyncIterator و async generators: next و return و throw بترجّع Promises، و for await على صفحات API وعلى ملف، والتنضيف لما تخرج بدري",
          desc: R`نفس بروتوكول الـ iteration بس كل خطوة Promise: الـ **async iterable** عنده [[ [Symbol.asyncIterator]() ]] بترجّع **async iterator**، و [[next()]] بترجّع **Promise** لـ [[{ value, done }]]. و [[for await...of]] بيستنى كل Promise قبل اللفة الجاية، وبينادي [[return()]] لو خرجت بدري زي [[for...of]] بالظبط.

والـ **async generator** ([[async function*]]) أسهل طريقة تعمل واحد: جواه [[await]] و [[yield]] مع بعض، والـ object اللي بيرجع ([[[object AsyncGenerator]]]) عنده [[next]] و [[return]] و [[throw]] كلهم بيرجّعوا Promises، والطلبات بتقف في طابور لو ناديتهم من غير ما تستنى.

و [[AsyncIterator.prototype]] (مش global، بتوصله من الـ prototype chain) هو أبو كل الـ async iterators، وعليه [[ [Symbol.asyncIterator]() { return this } ]] بس، **من غير** helpers زي [[map]]. وفي Node: الـ streams و [[readline]] و [[events.on]] و [[fs.opendir]] و [[timers/promises]] كلهم async iterables.`,
          example: R`// async generator: صفحات من API، و for await بيقفل لما تخرج بدري
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchPage(page) { await sleep(20); return { items: [page * 10 + 1, page * 10 + 2], next: page < 3 ? page + 1 : null }; }
async function* allItems() {
  let page = 1;
  try {
    while (page) {
      const data = await fetchPage(page);
      console.log('  جبت صفحة', page);
      yield* data.items;
      page = data.next;
    }
  } finally { console.log('  اتقفل'); }
}
for await (const item of allItems()) { console.log(item); if (item === 21) break; }
const it = allItems();
console.log(it[Symbol.asyncIterator]() === it, Object.prototype.toString.call(it));
const first = it.next();
console.log(first instanceof Promise, await first, await it.return('stop'), await it.next());
console.log(await Array.fromAsync(allItems()));`,
          try: R`اعمل ملف فيه ٢٠٠ ألف سطر ([[line 1]] لحد [[line 200000]])، واقراه بـ [[readline.createInterface]] على [[fs.createReadStream]] و [[for await]]، واعمل [[break]] عند [[line 3]]. بعدها اطبع [[input.bytesRead]] و [[input.destroyed]] و [[input.closed]] على طول وبعد ثانية: الملف اتقفل؟ وبعدين لف نفس القراية في [[async function* readLines(file)]] فيها [[finally]] بتقفل الـ stream بإيدك، وقيس تاني.`,
          sol: R`~~~js readline-trap.mjs
import { createReadStream, writeFileSync, statSync } from 'node:fs';
import { createInterface } from 'node:readline';
writeFileSync('lines.txt', Array.from({ length: 200000 }, (_, i) => 'line ' + (i + 1)).join('\n'));
console.log('حجم الملف', statSync('lines.txt').size);
const input = createReadStream('lines.txt', { encoding: 'utf8' });
const rl = createInterface({ input, crlfDelay: Infinity });
for await (const line of rl) { if (line === 'line 3') break; }
for (const ms of [0, 1000]) {
  await new Promise((r) => setTimeout(r, ms));
  console.log('بعد ' + ms + 'ms: bytesRead=' + input.bytesRead + ' destroyed=' + input.destroyed + ' closed=' + input.closed);
}
~~~

~~~text الناتج (Node 24.22)
حجم الملف 2288894
بعد 0ms: bytesRead=131072 destroyed=false closed=false
بعد 1000ms: bytesRead=131072 destroyed=false closed=false
~~~

**المفاجأة:** الـ [[break]] قفل الـ [[readline]] بس. الـ file stream وقف عند 131072 بايت (chunkين) بس **فضل مفتوح**: [[closed=false]] حتى بعد ثانية، يعني الـ file handle لسه ماسكه البرنامج. في سيرفر بيقرا ملفات كتير ده تسريب file descriptors لحد ما يقع بـ [[EMFILE]]. ولو فيه أي حد تاني سامع لـ event [[data]] على نفس الـ stream (عدّاد بايتات مثلًا)، الـ stream بيفضل شغال ويقرا الملف **كله** رغم الـ [[break]]: جرّبتها بعدّاد على [[data]] و [[highWaterMark: 1024]] على ملف 35 MB، والعدّاد وصل 35199122 من 35199122.

~~~js read-lines.mjs
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
let input;
async function* readLines(file) {
  input = createReadStream(file, { encoding: 'utf8' });
  const rl = createInterface({ input, crlfDelay: Infinity });
  try { yield* rl; }
  finally { rl.close(); input.destroy(); }
}
for await (const line of readLines('lines.txt')) { if (line === 'line 3') break; }
await new Promise((r) => setTimeout(r, 50));
console.log('بعد 50ms: bytesRead=' + input.bytesRead + ' destroyed=' + input.destroyed + ' closed=' + input.closed);
~~~

~~~text الناتج (Node 24.22)
بعد 50ms: bytesRead=65536 destroyed=true closed=true
~~~

- [[yield* rl]] جوه async generator بيلف على أي async iterable (الـ readline هنا) ويطلّع سطوره.
- الـ [[break]] برّه نادى [[return()]] على الـ generator، والـ [[return]] وصلت لمكان الـ [[yield*]]، فالـ [[finally]] اشتغلت: [[input.destroy()]] قفل الملف ([[closed=true]]) بعد chunk واحد.
- [[crlfDelay: Infinity]] عشان [[\r\n]] بتاعة ويندوز تتحسب نهاية سطر واحدة.
- [[let input]] برّه الدالة هنا بس عشان نطبع حالته في الآخر؛ في الكود الحقيقي خليه جوه.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٤ نداءات [[next()]] ورا بعض **من غير** [[await]] على async generator فيه ٣ قيم، كل واحدة بعد 30ms. إيه اللي هيتطبع بالترتيب؟ وكام [[start]] هيتطبع قبل [[طلبت ٤]]؟

~~~js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function* slow() {
  for (let i = 1; i <= 3; i++) { console.log('  start', i); await sleep(30); yield i; }
}
const g = slow();
const p1 = g.next(), p2 = g.next(), p3 = g.next(), p4 = g.next();
console.log('طلبت ٤');
console.log(await Promise.all([p1, p2, p3, p4]));
~~~`, done: R`توقّعت إن [[start 1]] بيتطبع **قبل** [[طلبت ٤]]، وإن النتايج بالترتيب ومفيش قيمة اتكررت، والرابعة [[done: true]].`, sol: R`~~~text الناتج (Node 24.22)
  start 1
طلبت ٤
  start 2
  start 3
[
  { value: 1, done: false },
  { value: 2, done: false },
  { value: 3, done: false },
  { value: undefined, done: true }
]
~~~

- أول [[next()]] بيشغّل الـ generator **في نفس اللحظة** لحد أول [[await]]، فـ [[start 1]] اتطبع قبل السطر اللي بعده.
- الـ ٣ نداءات التانية **مبتشغّلش** الـ generator بالتوازي: بتقف في طابور جوه الـ AsyncGenerator، وكل واحد بيستنى اللي قبله يخلص. فـ [[start 2]] جه بعد ما الأولى خلصت.
- [[Promise.all]] رجّع النتايج بالترتيب. ده بيضمن إن الـ async generator عمره ما يشتغل مرتين في نفس الوقت (عكس الـ sync generator اللي بيرمي [[Generator is already running]]).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class Ticker]] async iterable **من غير generator**: [[ [Symbol.asyncIterator]() ]] بترجّع object فيه [[next()]] بترجّع Promise بتتحل بعد [[ms]] بالرقم الجاي لحد [[max]]، و [[return()]] بتلغي الـ timer وتطبع. جرّبها بـ [[for await]] و [[break]] عند 3، وبـ [[Array.fromAsync]].`, done: R`بيطبع [[tick 1]] و [[2]] و [[3]] وبعدين «ticker اتقفل بعد 3»، و [[Array.fromAsync(new Ticker(5, 3))]] بـ [[[ 1, 2, 3 ]]] من غير ما [[return]] تتنادى.`, sol: R`~~~js ticker.mjs
class Ticker {
  constructor(ms, max) { this.ms = ms; this.max = max; }
  [Symbol.asyncIterator]() {
    let count = 0, timer = null;
    const { ms, max } = this;
    return {
      next() {
        if (count >= max) return Promise.resolve({ value: undefined, done: true });
        return new Promise((resolve) => { timer = setTimeout(() => resolve({ value: ++count, done: false }), ms); });
      },
      return() {
        clearTimeout(timer);
        console.log('  ticker اتقفل بعد', count);
        return Promise.resolve({ value: undefined, done: true });
      },
      [Symbol.asyncIterator]() { return this; },
    };
  }
}
for await (const t of new Ticker(20, 5)) { console.log('tick', t); if (t === 3) break; }
console.log(await Array.fromAsync(new Ticker(5, 3)));
~~~

~~~text الناتج (Node 24.22)
tick 1
tick 2
tick 3
  ticker اتقفل بعد 3
[ 1, 2, 3 ]
~~~

**الشرح:** ده البروتوكول من غير سكر: [[Ticker]] **iterable** (كل [[for await]] بياخد iterator جديد بعدّاد جديد)، والـ object اللي بيرجع **iterator**: [[next]] و [[return]] بيرجّعوا Promises. [[ [Symbol.asyncIterator]() { return this; } ]] على الـ iterator نفسه عشان ينفع يتلف عليه مباشرة (زي ما [[AsyncIterator.prototype]] بيعمل). و [[return]] بتلغي الـ timer: من غيرها، لو حد عمل [[break]] والـ [[setTimeout]] شغال، البرنامج يفضل عايش لحد ما يخلص.` },
            { lvl: 'تطبيق', t: R`**ابني:** الـ async iterators معندهمش [[map]] ولا [[take]]. اكتب [[async function* mapAsync(source, fn)]] (الـ [[fn]] ممكن تبقى async) و [[async function* takeAsync(source, n)]]، وركّبهم على async generator لانهائي، واتأكد إن المصدر **اتقفل** في الآخر.`, done: R`[[takeAsync(mapAsync(numbers(log), async (x) => x * 2), 3)]] بيرجّع [[[ 2, 4, 6 ]]]، والـ [[log]] فيه [[gen 1]] و [[gen 2]] و [[gen 3]] وبعدين [[source closed]]، ومفيش [[gen 4]].`, sol: R`~~~js async-helpers.mjs
async function* mapAsync(source, fn) {
  for await (const x of source) yield await fn(x);
}
async function* takeAsync(source, n) {
  if (n <= 0) return;
  let i = 0;
  for await (const x of source) { yield x; if (++i >= n) return; }
}
async function* numbers(log) {
  try { for (let i = 1; ; i++) { log.push('gen ' + i); yield i; } } finally { log.push('source closed'); }
}
const log = [];
const doubled = takeAsync(mapAsync(numbers(log), async (x) => x * 2), 3);
console.log(await Array.fromAsync(doubled), log.join(' | '));
~~~

~~~text الناتج (Node 24.22)
[ 2, 4, 6 ] gen 1 | gen 2 | gen 3 | source closed
~~~

**الشرح:** القفل بيمشي في السلسلة لوحده: [[takeAsync]] عمل [[return]] بعد التالت → الـ [[for await]] اللي جواه قفل [[mapAsync]] (نادى [[return]]) → [[for await]] اللي جوه [[mapAsync]] قفل [[numbers]] → الـ [[finally]] اشتغلت. ومهم: [[if (++i >= n) return]] **بعد** الـ [[yield]] مش قبل الـ [[for await]] الجاية، وإلا هتطلب قيمة زيادة من المصدر قبل ما تقف ([[gen 4]] كانت هتظهر). و [[n <= 0]] بيرجع على طول من غير ما يلمس المصدر.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Node، لاقي ٣ APIs (غير الـ streams و [[readline]]) بيرجّعوا async iterable، واكتب سكربت بيستخدم التلاتة بـ [[for await]] ومعاه [[break]] أو نهاية طبيعية، وبيتأكد إن مفيش حاجة فضلت شغالة بعدها (listeners أو timers).`, done: R`السكربت بيستخدم [[fs/promises.opendir]] و [[timers/promises.setInterval]] و [[events.on]]، وبيطبع أسامي الملفات، و 3 ticks، و [[listeners بعد break: 0]]، والبرنامج بيخلص لوحده.`, sol: R`~~~js node-async-iterables.mjs
import { opendir, mkdir, writeFile, rm } from 'node:fs/promises';
import { setInterval as every } from 'node:timers/promises';
import { on, EventEmitter } from 'node:events';
await mkdir('demo-dir', { recursive: true });
for (const f of ['a.txt', 'b.txt', 'c.log']) await writeFile('demo-dir/' + f, f);
const names = [];
for await (const entry of await opendir('demo-dir')) names.push(entry.name);
console.log('opendir:', names.sort());
let ticks = 0;
for await (const startedAt of every(10, 'tick')) { ticks++; if (ticks === 3) break; }
console.log('timers/promises setInterval:', ticks);
const ee = new EventEmitter();
setTimeout(() => { ee.emit('order', 1); ee.emit('order', 2); ee.emit('order', 3); }, 5);
for await (const [id] of on(ee, 'order')) { console.log('order', id); if (id === 2) break; }
console.log('listeners بعد break:', ee.listenerCount('order'));
await rm('demo-dir', { recursive: true });
~~~

~~~text الناتج (Node 24.22)
opendir: [ 'a.txt', 'b.txt', 'c.log' ]
timers/promises setInterval: 3
order 1
order 2
listeners بعد break: 0
~~~

**اللي اتعلّمناه من الوثائق:**
- [[opendir]] بيرجّع [[Dir]]، و [[for await]] عليه بيقرا الفولدر entry entry (أحسن من [[readdir]] للفولدرات الضخمة) وبيقفل الـ [[Dir]] لوحده في الآخر.
- [[setInterval]] من [[node:timers/promises]] async iterable لانهائي، والـ [[break]] بيلغي الـ interval (من غيره البرنامج مكنش هيخلص).
- [[events.on(emitter, name)]] بيحوّل event لـ async iterable، وكل قيمة **array** بالـ arguments ([[[id]]])، والـ [[break]] بيشيل الـ listener (العدّاد 0)، ولو الـ emitter عمل [[error]] بيترمي جوه الـ loop.
- رتّبنا [[names]] بـ [[sort()]] لأن ترتيب [[opendir]] مش مضمون.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ٥ صفحات، كل واحدة بتاخد 100ms. هاتهم بـ ٣ طرق: async generator بيجيب صفحة صفحة و [[for await]]، و [[Promise.all]]، و async generator بيطلب **صفحتين قدام** (prefetch) وبيطلّع بالترتيب. قيس الوقت.`, done: R`عندك ٣ أرقام قريبة من 500ms و 100ms و 200ms، والـ prefetch طلّع الصفحات بالترتيب، وتقدر تقول إمتى تختار كل واحدة.`, sol: R`~~~js pages-speed.mjs
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fetchPage = async (n) => { await sleep(100); return 'page ' + n; };
async function* pagesInOrder(count) { for (let n = 1; n <= count; n++) yield await fetchPage(n); }
let t = performance.now();
const a = [];
for await (const p of pagesInOrder(5)) a.push(p);
console.log('for await:', a.length, 'صفحات في', Math.round(performance.now() - t) + 'ms');
t = performance.now();
const b = await Promise.all([1, 2, 3, 4, 5].map(fetchPage));
console.log('Promise.all:', b.length, 'صفحات في', Math.round(performance.now() - t) + 'ms');
async function* pagesAhead(count, ahead = 2) {
  const queue = [];
  for (let n = 1; n <= count; n++) {
    queue.push(fetchPage(n));
    if (queue.length > ahead) yield await queue.shift();
  }
  while (queue.length) yield await queue.shift();
}
t = performance.now();
const c = await Array.fromAsync(pagesAhead(5));
console.log('prefetch 2:', c.join(','), Math.round(performance.now() - t) + 'ms');
~~~

~~~text الناتج (Node 24.22)
for await: 5 صفحات في 545ms
Promise.all: 5 صفحات في 106ms
prefetch 2: page 1,page 2,page 3,page 4,page 5 217ms
~~~

**القراءة:**
- **صفحة صفحة (545ms):** الأبطأ، بس الأخف على السيرفر، وبيقف فورًا لو اللي بيلف عمل [[break]]، ومناسب لما رقم الصفحة الجاية بييجي من رد الصفحة اللي قبلها (cursor) فمفيش طريقة توازي أصلًا.
- **[[Promise.all]] (106ms):** الأسرع، بس لازم تعرف عدد الصفحات من الأول، وكلهم في الذاكرة مع بعض، و ١٠٠٠ صفحة = ١٠٠٠ request في نفس اللحظة.
- **prefetch (217ms):** في النص: لحد ٣ requests شغالين (الحالية واتنين قدام)، والنتايج بالترتيب، ولسه async iterable. الفخ: لو request في الطابور اترفض قبل ما توصله، Node بيعتبره unhandled rejection؛ في كود حقيقي اعمل [[p.catch(() => {})]] على كل واحد في الطابور وانت بتحطه، وارمي الـ error لما توصل له بالـ [[await]].` },
          ],
          flag: "script",
          deep: {
            why: R`أغلب الداتا الحقيقية بتيجي «على مراحل» ومع انتظار: صفحات API، سطور ملف كبير، رسايل WebSocket، events، صفوف من قاعدة بيانات. الـ async iteration بيخليك تكتب ده كـ loop عادي بـ [[for await]]، بنفس قواعد القفل والـ [[break]]، بدل callbacks و events متلخبطة. والـ async generator بيخليك تعمل مصدر زي ده في كام سطر وتخبّي جواه الـ pagination والـ retry والتنضيف.`,
            how: R`[[for await (const x of src)]]:
1. بيدوّر على [[ src[Symbol.asyncIterator] ]]. لو مش موجود، بيدوّر على [[ src[Symbol.iterator] ]] ويلفّه (CreateAsyncFromSyncIterator)، فـ [[for await]] على array فيها Promises بيستنى كل واحدة. لو الاتنين مش موجودين: [[TypeError: {(intermediate value)} is not async iterable]].
2. كل لفة: [[await it.next()]]، ولو [[done]] يقف.
3. خروج بدري: [[await it.return()]] لو موجودة.

الـ AsyncGenerator عنده طابور طلبات: كل [[next]] أو [[return]] أو [[throw]] بيرجّع Promise على طول وبيتحط في الطابور، والـ generator بيخدمهم واحد واحد. و [[yield]] جوه async generator بيعمل [[await]] على القيمة الأول (فـ [[yield promise]] بيطلّع قيمتها مش الـ Promise). و [[return(v)]] على generator واقف عند [[yield]] بيشغّل الـ [[finally]] (وممكن تعمل [[await]] جواها، زي قفل connection)، و [[throw(e)]] بيرمي مكان الـ [[yield]] زي الـ sync بالظبط بس النتيجة Promise.

الـ prototype chain: [[allItems.prototype]] ← [[AsyncGenerator.prototype]] (عليه [[next]] و [[return]] و [[throw]]) ← [[AsyncIterator.prototype]] (عليه [[Symbol.asyncIterator]] و [[Symbol.asyncDispose]] بس) ← [[Object.prototype]]. و [[AsyncIterator]] مش global في Node 24 ([[typeof globalThis.AsyncIterator]] بـ [[undefined]]).`,
            when: R`[[async function*]]: أي مصدر بيجيب داتا على دفعات (pagination، polling، قراية ملف وتحويله، استعلام قاعدة بيانات بـ cursor). [[for await]]: لما تستهلك واحد من دول بالترتيب، وكل عنصر محتاج يخلص قبل اللي بعده. [[Array.fromAsync]]: لما الكل صغير وعايزه array. [[ [Symbol.asyncIterator] ]] بإيدك: لما عندك class (queue، channel، socket) عايزها تتلف بـ [[for await]] من غير generator. ولو محتاج توازي (١٠ طلبات مع بعض) [[for await]] مش الأداة: [[Promise.all]] على دفعات (درس «async في loops»).`,
            mistakes: R`- [[for await]] على readline وبعدين [[break]] ومستني الملف يتقفل: الـ file stream بيفضل مفتوح (اتقاس: [[closed=false]] بعد ثانية)، ولو فيه listener تاني على [[data]] بيقرا الملف كله. اقفله بإيدك في [[finally]].
- [[for (const x of asyncGen())]] من غير [[await]]: [[TypeError: ticks is not a function or its return value is not iterable]].
- [[for await]] برّه async function في CommonJS ([[.cjs]]): [[SyntaxError: Unexpected reserved word]]. في ESM ([[.mjs]]) مسموح top-level.
- تفتكر [[next()]] كتير من غير [[await]] بيوازي: بيتطابروا.
- تستخدم [[map]] أو [[take]] على async iterator: مش موجودين (الـ helpers للـ sync بس). استخدم async generator صغير أو [[Array.fromAsync]] بعد ما تحدّد العدد.
- تنسى [[return]] في async iterator بإيدك ماسك timer أو socket: البرنامج ميقفلش بعد [[break]].
- [[yield]] لـ Promise مرفوضة جوه async generator: بتترمي **جوه** الـ generator مكان الـ [[yield]]، مش كقيمة.
- [[for await]] على مصادر محتاج توازي: هتاخد وقت مجموعهم مش وقت أبطأهم.`,
          },
          teach: R`## الفكرة في سطر

نفس [[for...of]] و generators، بس كل قيمة جاية من Promise: [[for await]] بيستنى، و [[async function*]] بيـ [[await]] ويـ [[yield]]. الناتج من Node 24.22.

---

## ١. [[Symbol.asyncIterator]]: البروتوكول

| | sync | async |
|---|---|---|
| الـ method على الـ iterable | [[ [Symbol.iterator]() ]] | [[ [Symbol.asyncIterator]() ]] |
| [[next()]] بترجّع | [[{ value, done }]] | Promise لـ [[{ value, done }]] |
| [[return()]] و [[throw()]] | قيم | Promises |
| اللي بيلف | [[for...of]] و spread و destructuring | [[for await...of]] و [[Array.fromAsync]] بس |
| الـ generator | [[function*]] ← Generator | [[async function*]] ← AsyncGenerator |
| الأب المشترك | [[Iterator.prototype]] بالـ helpers | [[AsyncIterator.prototype]] من غير helpers |

مفيش spread ولا destructuring لـ async iterable: الاتنين sync ومينفعش يستنوا.

---

## ٢. async generator بيجيب صفحات

~~~js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchPage(page) { await sleep(20); return { items: [page * 10 + 1, page * 10 + 2], next: page < 3 ? page + 1 : null }; }
async function* allItems() {
  let page = 1;
  try {
    while (page) {
      const data = await fetchPage(page);
      console.log('  جبت صفحة', page);
      yield* data.items;
      page = data.next;
    }
  } finally { console.log('  اتقفل'); }
}
~~~

- [[fetchPage]] بتمثّل API: كل صفحة فيها رقمين، و [[next]] رقم الصفحة الجاية لحد 3 وبعدين [[null]].
- [[async function*]]: النجمة و [[async]] مع بعض، فجواها [[await]] (تستنى الصفحة) و [[yield]] (تطلّع عنصر).
- [[yield* data.items]]: بيطلّع عناصر الصفحة واحد واحد. ([[yield*]] جوه async generator بيقبل sync أو async iterable.)
- [[finally]]: التنضيف المضمون، هنشوفه بيشتغل في كل الحالات.

---

## ٣. [[for await]] و [[break]]

~~~js
for await (const item of allItems()) { console.log(item); if (item === 21) break; }
~~~

~~~text الناتج
  جبت صفحة 1
11
12
  جبت صفحة 2
21
  اتقفل
~~~

- الصفحة 2 **متجابتش** غير لما الـ loop طلب العنصر التالت: lazy زي الـ sync.
- [[break]] عند 21: [[for await]] نادى [[return()]]، فالـ [[finally]] اشتغلت، والصفحة 3 **عمرها ما اتطلبت**. (في API حقيقي = request أقل.)

---

## ٤. [[AsyncGenerator]]: [[next]] و [[return]] و [[throw]] بإيدك

~~~js
const it = allItems();
console.log(it[Symbol.asyncIterator]() === it, Object.prototype.toString.call(it));
const first = it.next();
console.log(first instanceof Promise, await first, await it.return('stop'), await it.next());
~~~

~~~text الناتج
true [object AsyncGenerator]
  جبت صفحة 1
  اتقفل
true { value: 11, done: false } { value: 'stop', done: true } { value: undefined, done: true }
~~~

| الـ method | بترجّع | بتعمل إيه |
|---|---|---|
| [[next(v)]] | Promise لـ [[{ value, done }]] | كمّل لحد الـ [[yield]] الجاية، و [[v]] قيمة الـ [[yield]] الواقفة |
| [[return(v)]] | Promise لـ [[{ value: v, done: true }]] | الـ [[yield]] الواقفة بقت [[return]]: [[finally]] اشتغلت (وتقدر تعمل [[await]] جواها) |
| [[throw(e)]] | Promise | الـ [[yield]] الواقفة رمت [[e]]: لو فيه [[catch]] بيكمّل، وإلا الـ Promise بتترفض والـ generator يخلص |

اتجرّب [[throw]]: generator فيه [[try { yield i } catch]] رجّع [[{ value: 'recovered', done: false }]] وكمّل، ومن غير [[catch]] الـ Promise اترفضت بنفس الـ error واتمسكت بـ [[try { await t2.throw(...) } catch]] برّه.

### الطابور

لو ناديت [[next()]] ٤ مرات من غير [[await]]، مبيشتغلوش مع بعض: بيقفوا في طابور جوه الـ AsyncGenerator والنتايج بالترتيب (تمرين «اقرا وتوقّع»).

---

## ٥. [[ AsyncIterator[Symbol.asyncIterator] ]]: الأب المشترك

| الحاجة | فين | فيها إيه |
|---|---|---|
| [[ AsyncIterator[Symbol.asyncIterator] ]] (يعني [[ AsyncIterator.prototype[Symbol.asyncIterator] ]]) | أبو كل الـ async iterators | بترجّع [[this]]، فأي async iterator هو كمان async iterable |
| [[AsyncGenerator.prototype]] | تحته | [[next]] و [[return]] و [[throw]] |
| [[AsyncIterator]] كـ global | مش موجود في Node 24 | بتوصله بـ [[Object.getPrototypeOf]] مرتين من [[asyncGenFn.prototype]] |

~~~text الناتج: اتجرّب على allItems
Object.getOwnPropertyNames(AsyncGeneratorProto)   [ 'constructor', 'next', 'return', 'throw' ]
Reflect.ownKeys(AsyncIteratorProto)               [ Symbol(Symbol.asyncIterator), Symbol(Symbol.asyncDispose) ]
AsyncIteratorProto[Symbol.asyncIterator].call(42)  42
typeof globalThis.AsyncIterator                    undefined
~~~

يعني مفيش [[map]] ولا [[filter]] ولا [[take]] على الـ async iterators (لسه proposal). اكتبهم async generators صغيرة (تمرين «ابني» التاني).

---

## ٦. [[Array.fromAsync]] و [[for await]] على sync

~~~js
console.log(await Array.fromAsync(allItems()));
~~~

~~~text الناتج
  جبت صفحة 1
  جبت صفحة 2
  جبت صفحة 3
  اتقفل
[ 11, 12, 21, 22, 31, 32 ]
~~~

و [[for await]] بيقبل sync iterable كمان، ويستنى أي Promise جواه:

~~~text الناتج: for await (const v of [sleep(5).then(() => 'a'), 'b', Promise.resolve('c')])
sync+promises a
sync+promises b
sync+promises c
~~~

---

## ٧. Node: ملف كبير سطر سطر

[[readline.createInterface({ input: createReadStream(file) })]] async iterable بيطلّع سطر سطر من غير ما يقرا الملف في الذاكرة. والفخ اتقاس في «جرّب»: [[break]] بيقفل الـ readline بس، والـ file stream بيفضل مفتوح ([[closed=false]] بعد ثانية)، ولو حد تاني سامع لـ [[data]] بيقرا الملف كله. والحل async generator بـ [[finally]] فيها [[input.destroy()]] (الملف اتقفل بعد chunk واحد). ومشروع الوحدة الكبير بيبني على ده.

---

## الخلاصة

- [[Symbol.asyncIterator]] و [[next]] بترجّع Promise، و [[for await]] بيستنى ويقفل بـ [[return]].
- [[async function*]] = [[await]] + [[yield]]، و [[next]] و [[return]] و [[throw]] Promises في طابور.
- [[AsyncIterator.prototype]] مش global ومعندوش helpers.
- اقفل الـ resources بإيدك في [[finally]]: مش كل async iterable بيقفل اللي تحته.`,
          lines: [
            R`دالة مساعدة: Promise بتتحل بعد [[ms]] ملّي ثانية، عشان نمثّل وقت الشبكة.`,
            R`API وهمي: بيستنى 20ms ويرجّع رقمين للصفحة، ورقم الصفحة الجاية لحد 3، وبعدها [[null]].`,
            R`async generator: يقدر يعمل [[await]] و [[yield]] في نفس الدالة.`,
            R`بنبدأ من الصفحة الأولى.`,
            R`[[try]] عشان الـ [[finally]] تشتغل في كل طرق الخروج.`,
            R`طول ما فيه صفحة (مش [[null]]) كمّل.`,
            R`استنى الصفحة. الـ generator بيقف هنا من غير ما يوقّف باقي البرنامج.`,
            R`بنطبع إننا جبنا الصفحة، عشان نشوف إمتى الطلب بيحصل بالظبط.`,
            R`[[yield*]] بيطلّع عناصر الصفحة واحد واحد، والـ generator بيقف بعد كل عنصر لحد ما حد يطلب.`,
            R`رقم الصفحة الجاية، ولو [[null]] الـ [[while]] تخلص.`,
            R`قفلة الـ [[while]].`,
            R`[[finally]] بتطبع [[اتقفل]] سواء خلصنا أو اتعمل [[break]] أو error.`,
            R`قفلة [[allItems]].`,
            R`[[for await]] بيطبع 11 و 12 و 21، والـ [[break]] بينادي [[return]] فالـ [[finally]] بتشتغل والصفحة 3 متتطلبش.`,
            R`generator جديد هنلعب بيه بإيدنا.`,
            R`[[true]] (الـ async iterator بيرجّع نفسه) و [[[object AsyncGenerator]]].`,
            R`أول [[next()]] بيرجّع Promise على طول، والـ generator بدأ يجيب الصفحة.`,
            R`[[true]] (Promise)، والقيمة 11، و [[return('stop')]] قفلت (الـ [[finally]] اشتغلت) ورجّعت [[{ value: 'stop', done: true }]]، و [[next]] بعدها [[done]].`,
            R`[[Array.fromAsync]] بيلف على الكل ويستنى، فبيجيب التلات صفحات ويرجّع الـ ٦ أرقام في array.`,
          ],
          ref: [
            { t: "MDN: Symbol.asyncIterator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator" },
            { t: "MDN: AsyncIterator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator" },
            { t: "MDN: AsyncIterator.prototype[Symbol.asyncIterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator/Symbol.asyncIterator" },
            { t: "MDN: AsyncGenerator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator" },
            { t: "MDN: AsyncGenerator.prototype.next()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator/next" },
            { t: "MDN: AsyncGenerator.prototype.return()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator/return" },
            { t: "MDN: AsyncGenerator.prototype.throw()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator/throw" },
            { t: "MDN: for await...of", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of" },
            { t: "Node.js: readline (async iteration)", url: "https://nodejs.org/api/readline.html#rlsymbolasynciterator" },
            { t: "Node.js: events.on()", url: "https://nodejs.org/api/events.html#eventsonemitter-eventname-options" },
          ],
          pre: [{ to: "js/async و await", why: R`[[await]] والـ Promises` }, "js/Generator: next و return و throw و yield*", { to: "js/async في loops", why: R`[[for...of]] بـ [[await]] و [[Array.fromAsync]] والتوازي` }, { to: "js/Streams", why: R`الـ streams في المتصفح وإنها async iterables` }],
        },
        {
          cmd: "AsyncFunction و GeneratorFunction و AsyncGeneratorFunction",
          title: "عيلة الدوال: كل نوع دالة ليه constructor مستخبي، تجيبه إزاي، و instanceof بيقول إيه، وليه new AsyncFunction زي eval",
          desc: R`زي ما أي دالة عادية [[instanceof Function]]، الدوال التانية ليها constructors مخصوصة: [[AsyncFunction]] و [[GeneratorFunction]] و [[AsyncGeneratorFunction]]. ومفيش ولا واحد فيهم global: بتجيبه من [[(async function () {}).constructor]] أو [[Object.getPrototypeOf]].

• كل واحد subclass من [[Function]]، فـ [[save instanceof Function]] لسه [[true]].
• الـ [[Symbol.toStringTag]] بتاعهم بيقول النوع: [[[object AsyncFunction]]] و [[[object GeneratorFunction]]].
• [[GeneratorFunction.prototype.prototype]] هو [[Generator.prototype]] (اللي عليه [[next]] و [[return]] و [[throw]])، ونفس الكلام لـ [[AsyncGenerator]].
• [[new AsyncFunction('a', 'b', 'return a + b')]] بيعمل دالة من **نص**، زي [[new Function]] و [[eval]]: بتشوف الـ global بس، والـ CSP بيمنعها، ومينفعش مع أي نص جاي من يوزر.

والأهم: متعتمدش على [[fn instanceof AsyncFunction]] عشان تقرر «أستنى ولا لأ»: دالة عادية بترجّع Promise مش [[AsyncFunction]]. [[await]] على أي نتيجة دايمًا آمن.`,
          example: R`// العيلة: كل نوع دالة ليه constructor و prototype خاص
const AsyncFunction = async function () {}.constructor;
const GeneratorFunction = function* () {}.constructor;
const AsyncGeneratorFunction = async function* () {}.constructor;
console.log(AsyncFunction.name, GeneratorFunction.name, AsyncGeneratorFunction.name, Object.getPrototypeOf(AsyncFunction) === Function);
async function save() {}
function* ids() {}
console.log(save instanceof AsyncFunction, ids instanceof GeneratorFunction, ids instanceof AsyncFunction, save instanceof Function);
const tag = (x) => Object.prototype.toString.call(x);
console.log(tag(save), tag(ids()), tag((async function* () {})()));
const add = new AsyncFunction('a', 'b', 'return a + b');
console.log(add.name, add.length, await add(2, 3));
const notAsync = () => Promise.resolve(1);
console.log(notAsync instanceof AsyncFunction, notAsync() instanceof Promise);
const secret = 'local';
console.log(new Function('return typeof secret')());`,
          try: R`هات [[Generator]] و [[AsyncGenerator]] (الـ prototypes اللي عليهم [[next]]) من الـ constructors: [[GeneratorFunction.prototype.prototype]]. واتأكد إن [[Object.getPrototypeOf(ids.prototype)]] هو هو، واطبع الـ [[Symbol.toStringTag]] بتاعهم وأسامي الخصايص على [[GeneratorFunction.prototype]]. وبعدين اعمل generator من نص بـ [[new GeneratorFunction('n', '...')]] بيطلّع مربعات الأرقام.`,
          sol: R`~~~js family.mjs
const GeneratorFunction = function* () {}.constructor;
const AsyncGeneratorFunction = async function* () {}.constructor;
function* ids() {}
const Generator = GeneratorFunction.prototype.prototype;
const AsyncGenerator = AsyncGeneratorFunction.prototype.prototype;
console.log(Object.getPrototypeOf(ids.prototype) === Generator, Object.getPrototypeOf(ids()) === ids.prototype, Generator[Symbol.toStringTag], AsyncGenerator[Symbol.toStringTag]);
console.log(Object.getPrototypeOf(ids) === GeneratorFunction.prototype, Object.getPrototypeOf(GeneratorFunction.prototype) === Function.prototype);
console.log(Object.getOwnPropertyNames(GeneratorFunction.prototype), Object.getOwnPropertyNames(AsyncGeneratorFunction.prototype));
const g = new GeneratorFunction('n', 'for (let i = 0; i < n; i++) yield i * i;');
console.log([...g(4)]);
const ag = new AsyncGeneratorFunction('yield 1; yield await Promise.resolve(2);');
console.log(await Array.fromAsync(ag()));
console.log(String(g));
~~~

~~~text الناتج (Node 24.22)
true true Generator AsyncGenerator
true true
[ 'prototype', 'constructor' ] [ 'prototype', 'constructor' ]
[ 0, 1, 4, 9 ]
[ 1, 2 ]
function* anonymous(n
) {
for (let i = 0; i < n; i++) yield i * i;
}
~~~

السلسلتين بالترتيب:

~~~text
الدالة:   ids  →  GeneratorFunction.prototype  →  Function.prototype  →  Object.prototype
الناتج:   ids()  →  ids.prototype  →  Generator (= GeneratorFunction.prototype.prototype)  →  Iterator.prototype  →  Object.prototype
~~~

و [[String(g)]] بيوريك إن المحرك بنى الدالة من النص: اسمها [[anonymous]] والـ parameters في سطر لوحدهم.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لكل دالة من دول: الـ tag من [[Object.prototype.toString]]، و [[fn.constructor.name]]، و هل [[instanceof AsyncFunction]]، و هل عندها خاصية [[prototype]]:

~~~js
const kinds = { normal: function () {}, arrow: () => {}, method: { m() {} }.m, asyncFn: async () => {}, gen: function* () {}, asyncGen: async function* () {}, cls: class {}, bound: (async () => {}).bind(null) };
~~~`, done: R`ملّيت جدول بالـ ٨، وطلع صح في أغلبهم، وعرفت ليه [[cls]] بتقول [[Function]] وليه [[bound]] لسه [[AsyncFunction]].`, sol: R`~~~js kinds.mjs
const AsyncFunction = async function () {}.constructor;
const GeneratorFunction = function* () {}.constructor;
const kinds = { normal: function () {}, arrow: () => {}, method: { m() {} }.m, asyncFn: async () => {}, gen: function* () {}, asyncGen: async function* () {}, cls: class {}, bound: (async () => {}).bind(null) };
for (const [k, f] of Object.entries(kinds)) {
  console.log(k.padEnd(9), Object.prototype.toString.call(f).padEnd(33), f.constructor.name.padEnd(23), f instanceof Function, f instanceof AsyncFunction, f instanceof GeneratorFunction, 'prototype' in f);
}
~~~

~~~text الناتج (Node 24.22)
normal    [object Function]                 Function                true false false true
arrow     [object Function]                 Function                true false false false
method    [object Function]                 Function                true false false false
asyncFn   [object AsyncFunction]            AsyncFunction           true true false false
gen       [object GeneratorFunction]        GeneratorFunction       true false true true
asyncGen  [object AsyncGeneratorFunction]   AsyncGeneratorFunction  true false false true
cls       [object Function]                 Function                true false false true
bound     [object AsyncFunction]            AsyncFunction           true true false false
~~~

- **الـ class** مفيش لها constructor خاص: هي [[Function]] عادية في السلسلة (الفرق جواها: مبتتناداش من غير [[new]]). فالطريقة الوحيدة تعرفها: [[Function.prototype.toString]] بيبدأ بـ [[class]].
- **[[bound]]**: [[bind]] بيعمل دالة جديدة الـ prototype بتاعها نفس prototype الأصلية، فلسه [[AsyncFunction]].
- **خاصية [[prototype]]**: الدوال اللي تتنادى بـ [[new]] (عادية و class) عندها، والـ generators عندهم (ده الـ prototype بتاع الـ generator objects اللي هيتعملوا)، والـ arrow والـ methods والـ async functions معندهمش.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[kindOf(fn)]] بترجّع [['async-generator']] أو [['generator']] أو [['async']] أو [['class']] أو [['sync']]، و [[null]] لأي حاجة مش دالة. استخدم الـ constructors الـ ٣ و [[instanceof]]، والـ class من [[Function.prototype.toString]].`, done: R`على [[async () => {}]] و [[function* () {}]] و [[async function* () {}]] و [[class {}]] و [[class A extends Array {}]] و [[() => 1]] و method و [[Math.max]] و bound async و 5 بيطلّع [[async generator async-generator class class sync sync sync async]] وفاضي للأخير، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js kind-of.mjs
const AsyncFunction = async function () {}.constructor;
const GeneratorFunction = function* () {}.constructor;
const AsyncGeneratorFunction = async function* () {}.constructor;
function kindOf(fn) {
  if (typeof fn !== 'function') return null;
  if (fn instanceof AsyncGeneratorFunction) return 'async-generator';
  if (fn instanceof GeneratorFunction) return 'generator';
  if (fn instanceof AsyncFunction) return 'async';
  if (/^class[\s{]/.test(Function.prototype.toString.call(fn))) return 'class';
  return 'sync';
}
console.log([async () => {}, function* () {}, async function* () {}, class {}, class A extends Array {}, () => 1, { m() {} }.m, Math.max, (async () => {}).bind(null), 5].map(kindOf).join(' '));
~~~

~~~text الناتج (Node 24.22)
async generator async-generator class class sync sync sync async
~~~

**الشرح:** الترتيب مش مهم هنا لأن الأنواع التلاتة مش بيورثوا من بعض (كل واحد subclass من [[Function]] مباشرة). و [[Function.prototype.toString.call(fn)]] مش [[fn.toString()]] عشان لو حد عمل override لـ [[toString]] على الـ class. و [[/^class[\s{]/]] عشان [[class{}]] و [[class A]] الاتنين، ومش [[classify()]]. الـ [[null]] في الآخر بقى نص فاضي في [[join]]. **حدود الطريقة:** الكود اللي اتعمله transpile لـ ES5 (Babel قديم) الـ async بيبقى دالة عادية بترجّع Promise، فـ [[kindOf]] هيقول [['sync']] (التمرين الجاي).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[runTask]] بيقرر يستنى ولا لأ بـ [[instanceof AsyncFunction]]. جرّبه على ٣ tasks وشوف أنهي واحدة باظت، وصلّحه بسطر واحد.

~~~js
const AsyncFunction = async function () {}.constructor;
async function runTask(task) {
  if (task instanceof AsyncFunction) return 'استنيت: ' + (await task());
  return 'من غير انتظار: ' + task();
}
const fromDb = async () => 'rows';
const fromCache = () => Promise.resolve('cached');
const plain = () => 'plain';
console.log(await runTask(fromDb), '|', await runTask(fromCache), '|', await runTask(plain));
~~~`, done: R`النسخة المصلّحة بتطبع [[rows]] و [[cached]] و [[plain]]، ومفيش [[[object Promise]]].`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
استنيت: rows | من غير انتظار: [object Promise] | من غير انتظار: plain
~~~

[[fromCache]] دالة عادية بترجّع Promise، فمش [[AsyncFunction]]، فالكود ملزقش الـ Promise في نص من غير ما يستنى: [[[object Promise]]].

~~~js run-task-fixed.mjs
async function runTaskFixed(task) { return 'النتيجة: ' + (await task()); }
const fromDb = async () => 'rows';
const fromCache = () => Promise.resolve('cached');
const plain = () => 'plain';
console.log(await runTaskFixed(fromDb), '|', await runTaskFixed(fromCache), '|', await runTaskFixed(plain));
~~~

~~~text الناتج (Node 24.22)
النتيجة: rows | النتيجة: cached | النتيجة: plain
~~~

**الشرح:** [[await]] على قيمة مش Promise بيرجّعها زي ما هي (بعد microtask)، فـ [[await task()]] آمن على الأنواع التلاتة. «async» صفة في **النتيجة** (بترجّع Promise ولا لأ)، مش في نوع الدالة. وده نفس السبب اللي خلّى مكتبات كتير توقّف الفحص ده: الدوال اللي اتعملها transpile أو bind أو wrap بتضيّع الـ [[AsyncFunction]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** دالة ضريبة بتستخدم [[rate]] متعرّف في الـ module بـ [[const]]: مرة closure ([[(price) => price * (1 + rate)]]) ومرة [[new Function('price', 'return price * (1 + rate)')]]. نادي الاتنين، وبعدين اعمل [[globalThis.rate = 0.5]] ونادي تاني، وبعدين شغّل الملف بـ [[node --disallow-code-generation-from-strings]].`, done: R`الـ closure طلّع 114 في الحالتين، والـ [[new Function]] رمى [[ReferenceError]] الأول وبعدين طلّع 150، والـ flag خلّى [[new Function]] نفسه يرمي [[EvalError]].`, sol: R`~~~js new-function.mjs
const rate = 0.14;
function makeWithClosure() { return (price) => price * (1 + rate); }
let viaFunction;
try { viaFunction = new Function('price', 'return price * (1 + rate)'); console.log(viaFunction(100)); }
catch (e) { console.log(e.constructor.name + ': ' + e.message); }
globalThis.rate = 0.5;
console.log(makeWithClosure()(100), viaFunction?.(100));
~~~

~~~text الناتج: node new-function.mjs (Node 24.22)
ReferenceError: rate is not defined
114.00000000000001 150
~~~

~~~text الناتج: node --disallow-code-generation-from-strings new-function.mjs
EvalError: Code generation from strings disallowed for this context
114.00000000000001 undefined
~~~

**الشرح:**
- الدوال اللي بتتعمل من نص ([[Function]] و [[AsyncFunction]] و [[GeneratorFunction]] و [[AsyncGeneratorFunction]]) بتتعمل في الـ **global scope**، مش في المكان اللي اتكتبت فيه. فـ [[rate]] بتاع الـ module مش ظاهر لها، وبعد ما عملنا [[globalThis.rate]] بقت تشوف ده (0.5) بدل اللي احنا قاصدينه.
- [[--disallow-code-generation-from-strings]] بيقفل [[eval]] وأخواته في Node كله، وده نفس اللي الـ CSP بيعمله في المتصفح لو مفيهاش [[unsafe-eval]]. ابدأ بيه في السيرفرات لو مش محتاجهم.
- [[114.00000000000001]] من الـ floating point (درس «number و NaN»).` },
          ],
          check: { lang: "js", starter: R`const AsyncFunction = async function () {}.constructor;
const GeneratorFunction = function* () {}.constructor;
const AsyncGeneratorFunction = async function* () {}.constructor;
function kindOf(fn) {
  // 'async-generator' أو 'generator' أو 'async' أو 'class' أو 'sync' أو null
}`, tests: R`test("async arrow", () => expect(kindOf(async () => {})).toBe('async'));
test("generator", () => expect(kindOf(function* () {})).toBe('generator'));
test("async generator", () => expect(kindOf(async function* () {})).toBe('async-generator'));
test("class", () => expect(kindOf(class {})).toBe('class'));
test("class extends", () => expect(kindOf(class A extends Array {})).toBe('class'));
test("arrow", () => expect(kindOf(() => 1)).toBe('sync'));
test("method", () => expect(kindOf({ m() {} }.m)).toBe('sync'));
test("bound async", () => expect(kindOf((async () => {}).bind(null))).toBe('async'));
test("مش دالة", () => expect(kindOf(5)).toBe(null));`, solution: R`const AsyncFunction = async function () {}.constructor;
const GeneratorFunction = function* () {}.constructor;
const AsyncGeneratorFunction = async function* () {}.constructor;
function kindOf(fn) {
  if (typeof fn !== 'function') return null;
  if (fn instanceof AsyncGeneratorFunction) return 'async-generator';
  if (fn instanceof GeneratorFunction) return 'generator';
  if (fn instanceof AsyncFunction) return 'async';
  if (/^class[\s{]/.test(Function.prototype.toString.call(fn))) return 'class';
  return 'sync';
}` },
          flag: "script",
          deep: {
            why: R`هتقابل الـ constructors دول في ٣ أماكن: (١) كود بيفحص نوع دالة (frameworks بتعرض warning لو حطيت async في مكان مش مستنيه، أو test runners بيفرّقوا)، (٢) أدوات بتبني كود من نص (REPL، template engines قديمة، sandboxes)، (٣) لما تقرا الـ prototype chain بتاع generator object وتستغرب [[next]] جاية منين. ولما تفهمهم، هتعرف ليه الفحص بالنوع هش، وليه بناء الكود من نص خطر.`,
            how: R`المواصفة فيها ٤ «function constructors»: [[Function]] و [[GeneratorFunction]] و [[AsyncFunction]] و [[AsyncGeneratorFunction]]. التلاتة الأخيرين:
- [[Object.getPrototypeOf(GeneratorFunction) === Function]] (subclass)، و [[GeneratorFunction.prototype]] بيورث من [[Function.prototype]]، وعليه [[Symbol.toStringTag]] بـ [['GeneratorFunction']] و [[prototype]] (هو [[Generator.prototype]]).
- كل generator function بتتعمل بخاصية [[prototype]] جديدة بتورث من [[Generator.prototype]]، والـ objects اللي بترجع منها بتورث من الخاصية دي. عشان كده [[ids() instanceof ids]] بـ [[true]] مع إن [[new ids()]] ممنوع.
- [[AsyncFunction.prototype]] معندوش [[prototype]] لأن الـ async functions مش بتعمل objects بـ [[new]].

نداء أي واحد منهم ([[new]] أو من غيره، الاتنين زي بعض) بيعمل CreateDynamicFunction: بيلزق الـ parameters والـ body في نص، ويعمل parse ليه **كـ دالة في الـ global environment**، فمبتشوفش أي متغير محلي ولا متغيرات الـ module. وده بيعدّي على نفس فحص الأمان بتاع [[eval]] (HostEnsureCanCompileStrings)، فالـ CSP من غير [[unsafe-eval]] أو [[--disallow-code-generation-from-strings]] بيرموا [[EvalError]].`,
            when: R`تجيب الـ constructor: للفحص في أدوات وتيستات (وبحذر)، ولقراية الـ prototype chain. [[new AsyncFunction(...)]] وأخواتها: تقريبًا أبدًا في كود تطبيق. استخدامات مشروعة نادرة: REPL أو playground بيشغّل كود المطوّر نفسه بـ [[await]] top-level، أو code generation وقت الـ build (مش وقت الـ request). وأي نص جاي من يوزر = ثغرة code injection؛ لو محتاج معادلات من اليوزر اكتب parser صغير بـ whitelist.`,
            mistakes: R`- تدوّر على [[AsyncFunction]] كـ global: [[ReferenceError: AsyncFunction is not defined]]. جيبه من [[(async () => {}).constructor]].
- [[fn instanceof AsyncFunction]] عشان تقرر تستنى: دوال كتير بترجّع Promise ومش async (التمرين).
- [[fn.constructor.name === 'AsyncFunction']]: نفس المشكلة، وكمان بيتكسر لو حد غيّر [[constructor]].
- تفتكر [[new Function]] بتشوف متغيراتك: بتشوف الـ global بس.
- تبني [[new Function('return ' + userInput)]] لـ «حاسبة»: اليوزر يقدر يكتب أي كود.
- تفتكر [[class]] ليها constructor خاص زي [[ClassFunction]]: مفيش، [[Object.prototype.toString]] بيقول [[[object Function]]].
- [[new GeneratorFunction('yield +')]]: الـ body بيتعمله parse وقت النداء، فالغلط بيبان [[SyntaxError: Unexpected token '}']] وقتها مش وقت تحميل الملف.`,
          },
          teach: R`## الفكرة في سطر

كل نوع دالة ([[async]] و [[function*]] و [[async function*]]) ليه constructor خاص مستخبي، بيحدد الـ prototype والـ tag بتاعه. الناتج من Node 24.22.

---

## ١. تجيب الـ constructors التلاتة

~~~js
const AsyncFunction = async function () {}.constructor;
const GeneratorFunction = function* () {}.constructor;
const AsyncGeneratorFunction = async function* () {}.constructor;
console.log(AsyncFunction.name, GeneratorFunction.name, AsyncGeneratorFunction.name, Object.getPrototypeOf(AsyncFunction) === Function);
~~~

~~~text الناتج
AsyncFunction GeneratorFunction AsyncGeneratorFunction true
~~~

- [[async function () {}]]: function expression فاضية، و [[.constructor]] بيجيب الدالة اللي «عملتها»، وهي [[AsyncFunction]]. (الأقواس مش لازمة هنا لأن الـ [[async function]] بعد [[=]] expression، الدرس الجاي بيشرح ليه.)
- مفيش طريقة تانية: ولا واحد فيهم global ([[typeof AsyncFunction]] بـ [[undefined]] لو مجبتهوش).
- [[Object.getPrototypeOf(AsyncFunction) === Function]]: subclass من [[Function]] (زي [[class AsyncFunction extends Function]]).

---

## ٢. [[instanceof]] والـ tag

~~~js
async function save() {}
function* ids() {}
console.log(save instanceof AsyncFunction, ids instanceof GeneratorFunction, ids instanceof AsyncFunction, save instanceof Function);
const tag = (x) => Object.prototype.toString.call(x);
console.log(tag(save), tag(ids()), tag((async function* () {})()));
~~~

~~~text الناتج
true true false true
[object AsyncFunction] [object Generator] [object AsyncGenerator]
~~~

| الدالة | constructor | tag الدالة | الناتج لما تناديها | tag الناتج |
|---|---|---|---|---|
| [[function f() {}]] | [[Function]] | [[Function]] | أي حاجة | حسب القيمة |
| [[async function f() {}]] | [[AsyncFunction]] | [[AsyncFunction]] | Promise | [[Promise]] |
| [[function* f() {}]] | [[GeneratorFunction]] | [[GeneratorFunction]] | generator object | [[Generator]] |
| [[async function* f() {}]] | [[AsyncGeneratorFunction]] | [[AsyncGeneratorFunction]] | async generator object | [[AsyncGenerator]] |
| [[class C {}]] | [[Function]] | [[Function]] | لازم [[new]]: instance | حسب الـ class |

---

## ٣. [[Generator]] و [[AsyncGenerator]] جايين منين

[[GeneratorFunction.prototype.prototype]] **هو** [[Generator.prototype]] (عليه [[next]] و [[return]] و [[throw]])، و [[AsyncGeneratorFunction.prototype.prototype]] هو [[AsyncGenerator.prototype]]. اتجرّب في «جرّب»: [[Object.getPrototypeOf(ids.prototype) === Generator]] بـ [[true]]، و الـ tags [[Generator]] و [[AsyncGenerator]].

| الـ prototype | عليه |
|---|---|
| [[GeneratorFunction.prototype]] | [[prototype]] و [[constructor]] و [[Symbol.toStringTag]]: ده أبو كل generator function |
| [[GeneratorFunction.prototype.prototype]] = [[Generator]] | [[next]] و [[return]] و [[throw]]: ده أبو كل generator object |
| [[AsyncFunction.prototype]] | [[constructor]] و [[Symbol.toStringTag]] بس، ومفيش [[prototype]] لأن الـ async functions مش بتعمل objects |

---

## ٤. تعمل دالة من نص: [[new AsyncFunction]]

~~~js
const add = new AsyncFunction('a', 'b', 'return a + b');
console.log(add.name, add.length, await add(2, 3));
~~~

~~~text الناتج
anonymous 2 5
~~~

- آخر argument هو الـ body، واللي قبله أسامي الـ parameters كنصوص.
- الاسم [[anonymous]] دايمًا، و [[length]] 2 من الـ parameters.
- [[add(2, 3)]] بترجّع Promise ([[AsyncFunction]])، فاستنيناها: 5. وتقدر تكتب [[await]] جوه الـ body: [[new AsyncFunction('ms', 'await new Promise(r => setTimeout(r, ms)); return "waited " + ms;')]] رجّعت [['waited 5']].

### بتشوف إيه

~~~js
const secret = 'local';
console.log(new Function('return typeof secret')());
~~~

~~~text الناتج
undefined
~~~

الدالة اتبنت في الـ **global scope**: [[secret]] قدامها بسطر ومش شايفاه. ولما عملت [[globalThis.g = 'global']] شافت [[g]]. يعني زي [[eval]] غير المباشر بالظبط، ومعاه نفس المنع: [[--disallow-code-generation-from-strings]] أو CSP من غير [[unsafe-eval]] بيرموا [[EvalError: Code generation from strings disallowed for this context]] (التمرين الأخير).

---

## ٥. الفخ: «async» مش نوع، دي نتيجة

~~~js
const notAsync = () => Promise.resolve(1);
console.log(notAsync instanceof AsyncFunction, notAsync() instanceof Promise);
~~~

~~~text الناتج
false true
~~~

دالة عادية بترجّع Promise. أي كود بيقرر «أستنى ولا لأ» من نوع الدالة هيغلط معاها (ومع الكود اللي اتعمله transpile). الحل: [[await fn()]] دايمًا.

---

## الخلاصة

- [[AsyncFunction]] و [[GeneratorFunction]] و [[AsyncGeneratorFunction]]: subclasses من [[Function]] مش global، بتتجاب من [[.constructor]].
- [[GeneratorFunction.prototype.prototype]] = [[Generator]]، و [[AsyncGeneratorFunction.prototype.prototype]] = [[AsyncGenerator]].
- بناء دالة من نص = [[eval]]: global scope بس، وممنوع بالـ CSP، ومش لنص من يوزر.
- متقررش تستنى من نوع الدالة: [[await]] النتيجة.`,
          lines: [
            R`function expression فاضية من نوع async، و [[.constructor]] بيجيب الـ constructor اللي عاملها: [[AsyncFunction]].`,
            R`نفس الفكرة على generator function: [[GeneratorFunction]].`,
            R`وعلى async generator function: [[AsyncGeneratorFunction]].`,
            R`الأسامي التلاتة، و [[true]]: الـ prototype بتاع [[AsyncFunction]] هو [[Function]] نفسها، يعني subclass.`,
            R`دالة async عادية بالـ declaration.`,
            R`generator function بالـ declaration.`,
            R`[[true]] و [[true]] و [[false]] (generator مش async) و [[true]] (كلهم [[Function]] في الآخر).`,
            R`دالة بتطبع الـ tag بـ [[Object.prototype.toString]] الأصلية.`,
            R`الدالة [[AsyncFunction]]، والـ objects الناتجة [[Generator]] و [[AsyncGenerator]].`,
            R`دالة async من نص: parameters [[a]] و [[b]] والـ body في الآخر.`,
            R`اسمها [[anonymous]]، و [[length]] 2، والنتيجة Promise استنيناها: 5.`,
            R`دالة عادية (مش async) بترجّع Promise.`,
            R`[[false]]: مش [[AsyncFunction]]، مع إن نتيجتها Promise ([[true]]).`,
            R`متغير محلي في الـ module، عشان نشوف الدالة اللي من نص بتشوفه ولا لأ.`,
            R`[[undefined]]: [[new Function]] اتبنت في الـ global scope ومش شايفة [[secret]].`,
          ],
          ref: [
            { t: "MDN: AsyncFunction", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction" },
            { t: "MDN: GeneratorFunction", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction" },
            { t: "MDN: AsyncGeneratorFunction", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction" },
            { t: "MDN: Generator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator" },
            { t: "MDN: AsyncGenerator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator" },
            { t: "MDN: Function() constructor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function" },
            { t: "ECMAScript: CreateDynamicFunction", url: "https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-createdynamicfunction" },
          ],
          pre: [{ to: "js/Function: length و name و toString و new.target", why: R`[[Function]] كـ object و [[length]] و [[name]] و [[toString]]` }, { to: "js/prototype chain", why: R`[[Object.getPrototypeOf]] والقراية في السلسلة` }, "js/AsyncIterator و async generators: for await بعمق"],
        },
        {
          cmd: "function expression و class expression و expression statement",
          title: "function و function* و async و class كـ expressions: الاسم والـ hoisting، وليه سطر مينفعش يبدأ بـ function أو {",
          desc: R`كل نوع دالة ليه شكلين: **declaration** (جملة لوحدها بتبدأ بالكلمة: [[function f() {}]]) و **expression** (قيمة جوه حاجة تانية: [[const f = function () {}]]). وده للأنواع الخمسة: [[function]] و [[function*]] و [[async function]] و [[async function*]] و [[class]].

الفروق اللي بتفرق:
• **الـ hoisting:** الـ declaration موجودة من أول الـ scope، والـ expression مش موجودة غير لما السطر بتاعها يتنفّذ.
• **الاسم:** في الـ expression الاسم اختياري، ولو كتبته ([[function fact(n) {}]]) بيبقى ظاهر **جوه** الدالة بس، فينفع recursion آمن.
• **المكان:** الـ expression تتحط في أي مكان قيمة: argument، أو [[return]]، أو object، أو [[class extends Base]] جوه دالة (mixins).

و **expression statement** = سطر عبارة عن expression لوحده ([[x = 5;]] أو [[save();]]). والقاعدة: السطر ده **مينفعش يبدأ** بـ [[function]] أو [[class]] أو [[{]] أو [[let []]، لأن JavaScript بيقراهم بداية declaration أو block. عشان كده [[{}.toString()]] بيرمي SyntaxError و [[({}).toString()]] شغال.`,
          example: R`// declaration ولا expression: الفرق في الـ hoisting والاسم والمكان
console.log(typeof declared, typeof expr);
function declared() {}
var expr = function () {};
const factorial = function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); };
console.log(factorial(5), factorial.name, typeof fact);
const ids = function* () { yield 1; yield 2; };
const load = async function () { return 'loaded'; };
const pages = async function* () { yield 'p1'; };
console.log([...ids()], await load(), await Array.fromAsync(pages()), ids.name, pages.name);
const Point = class { constructor(x) { this.x = x; } };
const Timestamped = (Base) => class extends Base { stamp = 'T'; };
console.log(new (Timestamped(Point))(3), Point.name);
const obj = { a: 1 };
let a;
({ a } = obj);
console.log(a, ({}).toString(), (() => ({ a: 1 }))(), (() => { a: 1 })());`,
          try: R`اكتب كل سطر من دول في ملف [[.cjs]] لوحده وشغّله، واقرا الرسالة: [[{}.toString()]] و [[function () {}]] و [[function f() { return 1 }()]] و [[class {}]]. وبعدين سطرين: [[const x = 1]] وتحته [[(function () {})()]] من غير [[;]].`,
          sol: R`~~~text الناتج (Node 24.22، كل سطر في ملف .cjs لوحده)
{}.toString()                      SyntaxError: Unexpected token '.'
function () {}                     SyntaxError: Function statements require a function name
function f() { return 1 }()        SyntaxError: Unexpected token ')'
class {}                           SyntaxError: Unexpected token '{'
const x = 1 / (function () {})()   TypeError: 1 is not a function
~~~

- [[{}.toString()]]: الـ [[{]] في أول جملة = **block** فاضي، وبعده [[.toString()]] ملهاش معنى. بالأقواس [[({}).toString()]] بقت expression: object literal.
- [[function () {}]] في أول جملة = declaration، والـ declaration لازم اسم.
- [[function f() { return 1 }()]]: الـ declaration خلصت عند [[}]]، و [[()]] بعدها أقواس فاضية مش نداء. الـ IIFE لازم تبقى expression: [[(function f() { return 1 })()]].
- [[class {}]]: نفس الكلام، الـ class declaration محتاجة اسم.
- **آخر واحدة مش SyntaxError**: من غير [[;]] السطرين اتقروا [[const x = 1(function () {})()]]: نداء للرقم 1. ده سبب «حط [[;]] قبل أي سطر بيبدأ بـ [[(]] أو [[[]] أو backtick» لو انت من غير semicolons.

**ملاحظة:** لو جرّبتهم بـ [[node -e]] بدل ملف، Node 24.22 بيحاول يقراهم TypeScript الأول وبيطبع سطر من الـ parser بتاعه ([[Expression expected]] أو [[Expected ident]]) فوق الـ SyntaxError الحقيقي. الملف بيدّيك رسالة V8 لوحدها.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٤ نداءات **قبل** التعريفات. اكتب نتيجة كل واحد (القيمة أو اسم الخطأ):

~~~js
const tryIt = (label, fn) => { try { console.log(label, fn()); } catch (e) { console.log(label, e.constructor.name + ': ' + e.message); } };
tryIt('A', () => a());
tryIt('B', () => b());
tryIt('C', () => c());
tryIt('D', () => new D());
function a() { return 'a ok'; }
var b = function () { return 'b ok'; };
let c = function () { return 'c ok'; };
const D = class {};
~~~`, done: R`كتبت الـ ٤ صح، وتقدر تفرّق بين [[TypeError]] بتاع B و [[ReferenceError]] بتاع C و D.`, sol: R`~~~text الناتج (Node 24.22)
A a ok
B TypeError: b is not a function
C ReferenceError: Cannot access 'c' before initialization
D ReferenceError: Cannot access 'D' before initialization
~~~

| التعريف | قبل سطره |
|---|---|
| [[function a() {}]] (declaration) | الدالة كاملة موجودة من أول الملف |
| [[var b = function () {}]] (expression في [[var]]) | [[b]] موجود بقيمة [[undefined]]، فالنداء [[TypeError]] |
| [[let c = function () {}]] | [[c]] في الـ TDZ، فأي لمس [[ReferenceError]] |
| [[const D = class {}]] (class expression) | نفس الـ TDZ |

الـ expression نفسها (الدالة أو الـ class) مبتتعملش غير لما السطر يتنفّذ، والمتغير اللي شايلها بيمشي بقواعد [[var]] أو [[let]] (درس «hoisting و TDZ»). وحتى [[class D {}]] كـ declaration ليها TDZ زي [[let]]، عكس [[function]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف من غير semicolons بيقع. اقرا الرسالة، وقول ليه بتقول [[qty]] بالذات:

~~~js
const price = 120
const qty = 2
const total = price * qty
(['SAVE10'] || []).forEach((code) => console.log('كوبون', code))
console.log(total)
~~~`, done: R`النسخة المصلّحة بتطبع [[كوبون SAVE10]] و [[240]]، وتقدر تشرح إزاي السطرين اتقروا سطر واحد.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
TypeError: qty is not a function
~~~

السطر التالت مفيهوش [[;]]، والرابع بيبدأ بـ [[(]]، فالـ ASI (automatic semicolon insertion) **محطش** [[;]] بينهم لأن الكلام لسه «ينفع يكمّل»: [[price * qty(['SAVE10'] || [])...]]. يعني نداء لـ [[qty]] كأنه دالة.

~~~js coupon.cjs
const price = 120;
const qty = 2;
const total = price * qty;
(['SAVE10'] || []).forEach((code) => console.log('كوبون', code));
console.log(total);
~~~

~~~text الناتج (Node 24.22)
كوبون SAVE10
240
~~~

القاعدة لو بتكتب من غير semicolons (أسلوب StandardJS مثلًا): أي سطر بيبدأ بـ [[(]] أو [[[]] أو backtick أو [[+]] أو [[-]] أو [[/]] حط قبله [[;]] ([[;(['SAVE10'] || [])...]]). و Prettier بيحطها لوحده.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فيه **empty statement** مستخبي في كل جزء. لاقيه:

~~~js
const items = [1, 2, 3];
let found = null;
for (let i = 0; i < items.length; i++);
{
  found = 'loop body ran once';
}
console.log(found);
let total = 0;
for (const x of items) if (x > 1); total += x;
~~~`, done: R`عرفت الـ [[;]] الزيادة في الاتنين، والنسخة المصلّحة بتجمع [[5]] (2 + 3)، وتقدر تقول إمتى الـ empty statement مقصودة.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
loop body ran once
for (const x of items) if (x > 1); total += x;
ReferenceError: x is not defined
~~~

- [[for (...);]]: الـ [[;]] لوحدها **empty statement** هي جسم الـ loop. الـ loop لفت ٣ مرات وماعملتش حاجة، والـ [[{ ... }]] اللي تحتها **block** عادي اتنفّذ مرة واحدة.
- [[if (x > 1);]]: نفس الكلام: جسم الـ [[if]] فاضي، و [[total += x]] جملة **برّه** الـ loop خالص، فـ [[x]] مش موجود هناك.

~~~js fixed.cjs
const items = [1, 2, 3];
let total = 0;
for (const x of items) if (x > 1) total += x;
console.log(total);
~~~

~~~text الناتج (Node 24.22)
5
~~~

**إمتى الـ [[;]] الفاضية مقصودة:** لما الشغل كله في رأس الـ loop: [[while (k++ < 3);]] (وبعدها [[k]] بـ 4) أو [[for (let i = 0; i < 3; arr.push(i++));]] (بيعمل [[[ 0, 1, 2 ]]])، اتجرّبوا. ولو كتبتها، اكتبها في سطر لوحدها بتعليق، و ESLint عنده [[no-empty]] و [[no-extra-semi]] بيمسكوا الغلط ده.` },
            { lvl: 'تحدي', t: R`**ابني:** mixins بـ class expressions: [[Timestamped(Base)]] بيزوّد [[createdAt]]، و [[Serializable(Base)]] بيزوّد [[toJSON()]] بترجّع [[{ type: this.constructor.name, ...this }]]. ركّبهم على [[Product]]. لازم [[type]] في الـ JSON يبقى اسم الـ class النهائية.`, done: R`[[JSON.stringify(new Item('tea', 45))]] فيه [[type: "Item"]] و [[createdAt]]، و [[tea instanceof Product]] بـ [[true]]، و [[class Ticket extends Serializable(Object)]] بيطلّع [[{"type":"Ticket","id":7}]].`, sol: R`أول نسخة كتبت [[const Item = Serializable(Timestamped(Product))]]، والناتج كان:

~~~text الناتج من النسخة الأولى (Node 24.22)
{"type":"Serializable","name":"tea","price":45,"createdAt":"2026-11-21"} true Serializable
~~~

[[Item]] مجرد متغير شايل الـ class اللي رجعت من [[Serializable]]، والـ class دي **named class expression** اسمها [[Serializable]]، فـ [[this.constructor.name]] قال كده. والـ class اللي من [[Timestamped]] من غير اسم خالص ([[name]] فاضي) لأنها اترجعت من دالة مش اتحطت في متغير.

~~~js mixins.mjs
const Timestamped = (Base) => class extends Base {
  createdAt = '2026-11-21';
};
const Serializable = (Base) => class Serializable extends Base {
  toJSON() { return { type: this.constructor.name, ...this }; }
};
class Product { constructor(name, price) { this.name = name; this.price = price; } }
class Item extends Serializable(Timestamped(Product)) {}
const tea = new Item('tea', 45);
console.log(JSON.stringify(tea));
console.log(tea instanceof Product, Item.name, Object.getPrototypeOf(Item).name, JSON.stringify(Object.getPrototypeOf(Object.getPrototypeOf(Item)).name));
class Ticket extends Serializable(Object) { id = 7; }
console.log(JSON.stringify(new Ticket()));
~~~

~~~text الناتج (Node 24.22)
{"type":"Item","name":"tea","price":45,"createdAt":"2026-11-21"}
true Item Serializable ""
{"type":"Ticket","id":7}
~~~

**الشرح:** [[class extends]] بيقبل **أي expression** بعد [[extends]]، فـ [[Serializable(Timestamped(Product))]] نداء بيرجّع class، واتعملت declaration باسم [[Item]] فوقيها. السلسلة: [[Item]] ← [[Serializable]] ← (من غير اسم) ← [[Product]]. والـ [[...this]] في [[toJSON]] بياخد الخصايص الـ own (والـ class fields زي [[createdAt]] و [[id]] own). سمّي الـ class expressions اللي جوه mixins (زي [[class Serializable]]) عشان الـ stack traces تبقى مقروءة، وخلّي آخر class declaration باسم حقيقي.` },
            { lvl: 'تحدي', t: R`**قارن:** دالة recursion متخزنة في [[let countdown]]، واتعمل لها نسخة [[saved]] وبعدين [[countdown = null]]. جرّبها مرة كـ anonymous function expression بتنادي [[countdown]]، ومرة كـ named function expression [[function self(n)]] بتنادي [[self]].`, done: R`الأولى بتقع بـ [[TypeError]] والتانية بترجّع [[[ 3, 2, 1, 'go' ]]]، وتقدر تشرح ليه [[self]] مبيتأثرش.`, sol: R`~~~js nfe.mjs
let countdown = function (n) { return n <= 0 ? ['go'] : [n, ...countdown(n - 1)]; };
const saved = countdown;
countdown = null;
try { console.log(saved(3)); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
let countdown2 = function self(n) { return n <= 0 ? ['go'] : [n, ...self(n - 1)]; };
const saved2 = countdown2;
countdown2 = null;
console.log(saved2(3), saved2.name);
~~~

~~~text الناتج (Node 24.22)
TypeError: countdown is not a function or its return value is not iterable
[ 3, 2, 1, 'go' ] self
~~~

**الشرح:** الأولى بتدوّر على [[countdown]] في الـ scope اللي برّه **وقت النداء**، ولقته [[null]]. التانية: اسم الـ named function expression ([[self]]) بيتعمل في scope صغير **خاص بالدالة** ومربوط بيها للأبد، ومش ظاهر برّه ([[typeof self]] برّه بـ [[undefined]])، وكمان مينفعش يتغيّر: [[self = 5]] جواها بيتجاهل في sloppy mode وبيرمي [[TypeError: Assignment to constant variable.]] في strict (اتجرّب). والـ [[name]] بقى [[self]] مش [[countdown2]]، فالـ stack trace هيقول [[self]].` },
          ],
          flag: "script",
          deep: {
            why: R`الفرق بين declaration و expression بيفسّر نص الأخطاء الغريبة: [[is not a function]] قبل التعريف، و [[Cannot access before initialization]]، و [[{}.toString()]] بيقع، و [[() => { a: 1 }]] بترجّع [[undefined]]، وسطرين من غير [[;]] بقوا سطر واحد. وكمان بيفتح أنماط مهمة: callbacks و IIFE و mixins و factories بترجّع classes، و recursion آمن.`,
            how: R`الـ parser لما يبدأ **جملة** بيبص على أول token: [[function]] أو [[async function]] = FunctionDeclaration (أو generator)، و [[class]] = ClassDeclaration، و [[{]] = Block، و [[let []] = lexical declaration. فالمواصفة بتقول ExpressionStatement «lookahead ∉ { [[{]]، [[function]]، [[async function]]، [[class]]، [[let []] }». أي حاجة تانية بتبدأ expression، والأقواس [[( )]] (grouping) أسهل طريقة تقلب الـ parser لـ «expression».

الـ declarations بتتسجّل قبل التنفيذ (hoisting): [[function]] بقيمتها، و [[class]] من غير قيمة (TDZ). الـ expressions بتتقيّم لما السطر يتنفّذ. و named function expression بتعمل environment صغير فيه اسمها بس، مربوط بالدالة و immutable، فالاسم ظاهر في الجسم بس. ولو الـ expression من غير اسم واتحطت مباشرة في متغير أو property، بتاخد اسم المتغير ([[ids.name]] بـ [[ids]])، وده اسمه NamedEvaluation، لكن لو اترجعت من دالة ([[return class extends Base {}]]) بتفضل من غير اسم.`,
            when: R`declaration: للدوال والـ classes الأساسية في الملف (مقروءة وبتتنادى من أي مكان). function expression أو arrow: callbacks، وقيم في objects، ودوال اتعملت حسب شرط. named function expression: recursion جوه expression، و stack traces أوضح لـ callbacks. class expression: mixins و factories ([[(Base) => class extends Base {}]]) و classes مؤقتة في الاختبارات. [[async function]] expression: [[(async function () { ... })()]] لما محتاج [[await]] في ملف CommonJS. و [[function*]] و [[async function*]] expressions: generators كقيم ([[{ [Symbol.iterator]: function* () {} }]] أو argument).`,
            mistakes: R`- تنادي function expression قبل سطرها: [[TypeError: b is not a function]] ([[var]]) أو [[ReferenceError]] ([[let]] و [[const]]).
- تفتكر اسم الـ named function expression ظاهر برّه: [[typeof fact]] بـ [[undefined]].
- [[() => { a: 1 }]] ومستني object: الـ [[{]] block و [[a:]] label، فبترجّع [[undefined]]. اكتب [[() => ({ a: 1 })]].
- [[{ a } = obj;]] في أول سطر: block. اكتب [[({ a } = obj);]].
- IIFE من غير أقواس، أو سطر قبلها من غير [[;]]: [[TypeError: 1 is not a function]].
- [[;]] بعد [[for (...)]] أو [[if (...)]]: الـ body بقى empty statement.
- [[class {}]] كجملة: [[SyntaxError: Unexpected token '{']]. الـ class declaration لازم اسم.
- في الـ REPL أو [[eval]]: [[eval('{}')]] بـ [[undefined]] (block) و [[eval('({})')]] بـ [[{}]]، و [[eval('{} + []')]] بـ [[0]] (block وبعده [[ +[] ]]) و [[eval('({} + [])')]] بـ [[[object Object]]] (اتجرّبوا).`,
          },
          teach: R`## الفكرة في سطر

نفس الدالة أو الـ class ممكن تتكتب **جملة** لوحدها (declaration) أو **قيمة** جوه حاجة (expression)، والفرق بيبان في الـ hoisting والاسم والأماكن اللي تقدر تحطها فيها. الناتج من Node 24.22 (ملف [[.mjs]]).

---

## ١. function expression والـ hoisting

~~~js
console.log(typeof declared, typeof expr);
function declared() {}
var expr = function () {};
~~~

~~~text الناتج
function undefined
~~~

- [[function declared() {}]]: declaration، اتسجّلت بقيمتها قبل أي سطر، فـ [[typeof]] قال [[function]] قبل سطرها.
- [[var expr = function () {};]]: الـ **function expression** هي الحتة اللي على يمين [[=]]. المتغير [[expr]] اتسجّل (عشان [[var]]) بقيمة [[undefined]]، والدالة نفسها مش هتتعمل غير لما السطر يتنفّذ.

---

## ٢. named function expression

~~~js
const factorial = function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); };
console.log(factorial(5), factorial.name, typeof fact);
~~~

~~~text الناتج
120 fact undefined
~~~

- [[fact]] اسم الـ expression نفسها: ظاهر **جوه** الدالة (فالـ recursion بيناديه)، ومش ظاهر برّه: [[typeof fact]] بـ [[undefined]].
- [[factorial.name]] بقى [[fact]] مش [[factorial]]: الاسم المكتوب بيكسب.
- الاسم ده مربوط بالدالة للأبد، فلو المتغير برّه اتغيّر الـ recursion مبيتأثرش (تمرين «قارن»).

---

## ٣. function* expression و async function expression و async function* expression

~~~js
const ids = function* () { yield 1; yield 2; };
const load = async function () { return 'loaded'; };
const pages = async function* () { yield 'p1'; };
console.log([...ids()], await load(), await Array.fromAsync(pages()), ids.name, pages.name);
~~~

~~~text الناتج
[ 1, 2 ] loaded [ 'p1' ] ids pages
~~~

| الـ expression | بترجّع لما تتنادى | مثال استخدام |
|---|---|---|
| [[function* () {}]] | generator object | [[{ [Symbol.iterator]: function* () { ... } }]] |
| [[async function () {}]] | Promise | [[(async function () { await main(); })()]] في CommonJS |
| [[async function* () {}]] | async generator object | [[{ [Symbol.asyncIterator]: async function* () { ... } }]] |

ومن غير اسم مكتوب، الـ expression اللي بتتحط مباشرة في [[const]] بتاخد اسم المتغير: [[ids.name]] بـ [[ids]] و [[pages.name]] بـ [[pages]].

---

## ٤. class expression

~~~js
const Point = class { constructor(x) { this.x = x; } };
const Timestamped = (Base) => class extends Base { stamp = 'T'; };
console.log(new (Timestamped(Point))(3), Point.name);
~~~

~~~text الناتج
Point { x: 3, stamp: 'T' } Point
~~~

- [[const Point = class { ... }]]: **class expression** من غير اسم، خدت اسم المتغير.
- [[(Base) => class extends Base { ... }]]: arrow بترجّع class جديدة بتورث من أي [[Base]] تديهولها. ده **mixin**: [[Timestamped(Point)]] = Point ومعاها [[stamp]].
- [[new (Timestamped(Point))(3)]]: الأقواس حوالين النداء لازم، وإلا [[new Timestamped(Point)]] كانت هتتعمل [[new]] على [[Timestamped]] نفسها.
- named class expression ([[const Named = class Vec { static who() { return Vec.name; } }]]) زي الدالة: [[Vec]] ظاهر جوه بس، و [[Named.name]] بـ [[Vec]].
- الـ class (expression أو declaration) ليها TDZ: [[new Later()]] قبل [[class Later {}]] بيرمي [[ReferenceError: Cannot access 'Later' before initialization]].

---

## ٥. expression statement: سطر هو expression لوحده

~~~js
const obj = { a: 1 };
let a;
({ a } = obj);
console.log(a, ({}).toString(), (() => ({ a: 1 }))(), (() => { a: 1 })());
~~~

~~~text الناتج
1 [object Object] { a: 1 } undefined
~~~

أي سطر زي [[save();]] أو [[x = 5;]] أو [[a++;]] اسمه expression statement. والـ parser لما يشوف أول كلمة في السطر بيقرر:

| السطر بيبدأ بـ | الـ parser بيفهمه | عشان تخليه expression |
|---|---|---|
| [[{]] | block | [[({ a } = obj);]] و [[({}).toString()]] |
| [[function]] أو [[async function]] | declaration (لازم اسم) | [[(function () { ... })();]] |
| [[class]] | class declaration (لازم اسم) | [[(class {});]] |
| [[let []] | declaration بـ destructuring | بيفرق بس لو عندك متغير اسمه [[let]] في sloppy mode، فمتسمّيش متغير كده |

- [[({ a } = obj)]]: destructuring assignment من غير [[let]] لازم أقواس، وإلا [[{ a }]] block.
- [[(() => ({ a: 1 }))()]]: الأقواس حوالين الـ object عشان الـ arrow ترجّعه. و [[(() => { a: 1 })()]] رجّعت [[undefined]]: الـ [[{]] بقى جسم الدالة، و [[a:]] **label**، و [[1]] expression statement متجاهلة.

### الـ ASI: لما السطر الجاي بيبدأ بقوس

لو مش بتكتب [[;]]، JavaScript بيحطها لوحده **بس** لما السطر الجاي ميقدرش يكمّل اللي قبله. سطر بيبدأ بـ [[(]] أو [[[]] أو backtick **بيكمّل**:

| الكود (سطرين من غير [[;]]) | اتقرا كـ | الناتج |
|---|---|---|
| [[const x = 1]] ثم [[(function () {})()]] | [[1(function () {})()]] | [[TypeError: 1 is not a function]] |
| [[const t = 5]] ثم template literal [[.length]] | [[5$__bt...$__bt]] (tagged template) | [[TypeError: 5 is not a function]] |
| [[const total = price * qty]] ثم [[(['SAVE10'] \|\| []).forEach(...)]] | [[qty(...)]] | [[TypeError: qty is not a function]] |

---

## ٦. empty statement: [[;]] لوحدها

[[;]] لوحدها جملة فاضية صحيحة. مفيدة لما الشغل كله في رأس الـ loop:

~~~js
let k = 0; while (k++ < 3);
const arr = [];
for (let i = 0; i < 3; arr.push(i++));
~~~

~~~text الناتج: console.log('k =', k) و console.log(arr)
k = 4
[ 0, 1, 2 ]
~~~

وخطيرة لما تيجي بالغلط بعد [[for (...)]] أو [[if (...)]]: الـ body بيبقى فاضي (تمرين «صلّح» التاني).

---

## الخلاصة

| | declaration | expression |
|---|---|---|
| الشكل | جملة بتبدأ بـ [[function]] أو [[class]] | قيمة على يمين [[=]] أو argument أو بين أقواس |
| الاسم | لازم | اختياري، ولو موجود ظاهر جوه بس |
| قبل سطرها | [[function]]: موجودة، [[class]]: TDZ | مش موجودة (المتغير بقواعد [[var]] أو [[let]]) |
| الأنواع | الخمسة | الخمسة، ومعاهم arrow |

- السطر مينفعش يبدأ بـ [[{]] أو [[function]] أو [[class]] أو [[let []] لو قصدك expression: أقواس.
- [[;]] قبل أي سطر بيبدأ بـ [[(]] أو [[[]] أو backtick لو مش بتكتبها.`,
          lines: [
            R`[[typeof]] قبل التعريفين: [[function]] للـ declaration، و [[undefined]] للـ expression اللي لسه سطرها متنفذش.`,
            R`function declaration: بتتسجّل بقيمتها قبل أي سطر في الـ scope.`,
            R`function expression من غير اسم جوه [[var]]: [[expr]] موجود من الأول بـ [[undefined]]، والدالة بتتعمل هنا بس.`,
            R`named function expression: [[fact]] ظاهر جوه الدالة فبيستخدمه للـ recursion، والمتغير برّه اسمه [[factorial]].`,
            R`[[120]]، والاسم [[fact]] (المكتوب بيكسب)، و [[typeof fact]] برّه [[undefined]].`,
            R`[[function*]] expression: generator من غير اسم في [[const]].`,
            R`async function expression: بترجّع Promise.`,
            R`async function* expression: بترجّع async generator.`,
            R`[[[ 1, 2 ]]] و [[loaded]] و [[[ 'p1' ]]]، والأسامي [[ids]] و [[pages]] اتاخدت من المتغيرات.`,
            R`class expression من غير اسم، خدت اسم [[Point]] من المتغير.`,
            R`arrow بترجّع class expression بتورث من أي [[Base]]: ده mixin بيزوّد [[stamp]].`,
            R`عملنا instance من [[Timestamped(Point)]] (الأقواس عشان [[new]] ياخد نتيجة النداء)، فيها [[x]] و [[stamp]]، و [[Point.name]] بـ [[Point]].`,
            R`object هنعمل منه destructuring.`,
            R`متغير متعرّف من غير قيمة، هنملاه بـ destructuring assignment.`,
            R`expression statement بيبدأ بـ [[(]] عشان الـ [[{ a }]] ميتقريش block: [[a]] بقى 1.`,
            R`[[1]]، و [[({}).toString()]] بالأقواس شغالة، والـ arrow اللي بترجّع [[({ a: 1 })]] رجّعت object، واللي من غير أقواس رجّعت [[undefined]] (block و label).`,
          ],
          ref: [
            { t: "MDN: function expression", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function" },
            { t: "MDN: function* expression", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function*" },
            { t: "MDN: async function expression", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function" },
            { t: "MDN: async function* expression", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function*" },
            { t: "MDN: class expression", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class" },
            { t: "MDN: Expression statement", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/Expression_statement" },
            { t: "MDN: Empty statement", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/Empty" },
            { t: "MDN: Automatic semicolon insertion", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion" },
          ],
          pre: [{ to: "js/function و arrow", why: R`function declaration و expression و arrow في أبسط صورهم` }, { to: "js/hoisting و TDZ", why: R`التسجيل قبل التنفيذ والـ TDZ` }, { to: "js/module pattern و IIFE", why: R`الـ IIFE واستخدامها` }, { to: "js/class", why: R`الـ class declaration و [[extends]]` }],
        },
        {
          cmd: "void: void 0 و fire-and-forget",
          title: "void بيعمل إيه: void 0، و void في الـ arrow callbacks عشان النتيجة متتسرّبش، و void promise كعلامة «مش هستنى»",
          desc: R`[[void expr]] بيقيّم الـ expression (يعني الكود بيشتغل فعلًا) وبعدين **يرمي** النتيجة ويرجّع [[undefined]]. ٣ استخدامات حقيقية:
• [[void 0]]: طريقة مضمونة تكتب [[undefined]] (زمان [[undefined]] كان ممكن يتغطّى بمتغير محلي، و الـ minifiers لسه بيكتبوها لأنها أقصر).
• في arrow بسطر واحد: [[() => void count++]] عشان الـ callback **ميرجّعش** قيمة بالغلط، في API بتفرق معاها القيمة اللي بترجع (handler بيرجّع [[false]] فبيلغي، أو effect في React لازم يرجّع function أو مفيش).
• [[void save()]]: علامة صريحة «أنا قاصد مستناش الـ Promise دي». أدوات زي ESLint ([[no-floating-promises]] في typescript-eslint) بتقبلها. بس [[void]] **مبيمسكش** الأخطاء: لو الـ Promise اترفضت، Node بيقفل البرنامج. فالـ fire-and-forget الصح: [[void save().catch(log)]].

و [[void]] operator بأولوية عالية: [[void 2 + 3]] = [[(void 2) + 3]] = [[NaN]]، فحط أقواس.`,
          example: R`// void: قيّم الـ expression وارمي نتيجتها، ورجّع undefined
console.log(void 0, void 'x', typeof void 0, void 0 === undefined);
console.log(void 2 + 3, void (2 + 3));
const ids = [];
console.log([1, 2, 3].map((n) => ids.push(n)), [1, 2, 3].map((n) => void ids.push(n)));
let count = 0;
const handlers = [() => count++, () => void count++];
console.log(handlers.map((h) => h()), count);
const save = async (x) => { if (x < 0) throw new Error('negative'); return 'saved ' + x; };
void save(1);
void save(-1).catch((e) => console.log('logged:', e.message));
void function start() { console.log('void IIFE ran'); }();`,
          try: R`اعمل ملف [[.cjs]] فيه [[const save = async () => { throw new Error('disk full'); };]] وبعدين [[void save();]] وبعدين [[setTimeout(() => console.log('still alive?'), 20);]]. شغّله واطبع الـ exit code ([[echo $?]] في Git Bash أو [[$LASTEXITCODE]] في PowerShell). البرنامج كمّل؟ وبعدين ضيف [[.catch]] وشغّل تاني.`,
          sol: R`~~~js fire.cjs
const save = async () => { throw new Error('disk full'); };
void save();
setTimeout(() => console.log('still alive?'), 20);
~~~

~~~text الناتج: node fire.cjs; echo "exit $?" (Node 24.22، المسار الكامل وسطور node:internal اتشالوا)
const save = async () => { throw new Error('disk full'); };
                                 ^

Error: disk full
    at save (fire.cjs:1:34)
    at Object.<anonymous> (fire.cjs:2:6)

Node.js v24.22.1
exit 1
~~~

[[still alive?]] **متطبعتش**: الـ Promise اترفضت ومحدش مسكها، فـ Node (من النسخة 15) بيعامل الـ unhandled rejection كـ crash ويخرج بـ 1. يعني [[void]] قال «مش هستنى» بس **مقالش** «ومش مهتم لو فشلت».

~~~js fire-fixed.cjs
const save = async () => { throw new Error('disk full'); };
void save().catch((e) => console.error('save failed:', e.message));
setTimeout(() => console.log('still alive?'), 20);
~~~

~~~text الناتج (Node 24.22)
save failed: disk full
still alive?
~~~

القاعدة: [[void promise]] لوحدها مقبولة بس لو الدالة نفسها بتمسك أخطاءها جواها. وإلا [[void p.catch(handler)]]. (درس «الأخطاء العامة: unhandledrejection و uncaughtException».)`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الـ ٦ قيم قبل التشغيل:

~~~js
console.log(void 2 + 3, void (2 + 3), typeof void 0, void 0 === undefined, [void 0].length, void [1, 2].push(3));
~~~`, done: R`كتبت [[NaN undefined undefined true 1 undefined]] قبل التشغيل، وتقدر تقول ليه الأولى [[NaN]].`, sol: R`~~~text الناتج (Node 24.22)
NaN undefined undefined true 1 undefined
~~~

- [[void 2 + 3]]: [[void]] unary operator، أولويته أعلى من [[+]]، فاتقرت [[(void 2) + 3]] = [[undefined + 3]] = [[NaN]].
- [[void (2 + 3)]]: الأقواس خلّت الجمع يحصل الأول، وبعدين اترمى: [[undefined]].
- [[typeof void 0]]: [[typeof]] و [[void]] الاتنين unary بنفس الأولوية من اليمين للشمال، فـ [[typeof (void 0)]] = [['undefined']].
- [[[void 0].length]]: array فيها عنصر واحد قيمته [[undefined]]، طولها 1.
- [[void [1, 2].push(3)]]: الـ [[push]] **اشتغل** فعلًا (الـ array بقت ٣ عناصر)، بس رقم الطول اللي رجع اترمى.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** emitter صغير: لو أي handler رجّع [[false]] الـ event بيتلغي (زي أنظمة events قديمة كتير). أول handler بيحدّث flag في سطر واحد، والـ save التاني مبيحصلش. ليه؟ وصلّحه بـ [[void]].

~~~js
function createEmitter() {
  const handlers = [];
  return {
    on(fn) { handlers.push(fn); },
    emit(value) {
      for (const fn of handlers) if (fn(value) === false) return 'cancelled';
      return 'delivered to ' + handlers.length;
    },
  };
}
const flags = { dirty: true };
const bus = createEmitter();
bus.on((v) => (flags.dirty = v.dirty));
bus.on((v) => console.log('  saved', v.id));
console.log(bus.emit({ id: 1, dirty: false }));
~~~`, done: R`النسخة المصلّحة بتطبع [[saved 2]] و [[delivered to 2]]، وتقدر تقول القيمة [[false]] جت منين.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
cancelled
~~~

[[(v) => (flags.dirty = v.dirty)]] arrow بسطر واحد، فبترجّع قيمة الـ expression. والـ assignment كـ expression قيمتها القيمة اللي اتحطت: [[false]]. فالـ emitter فهم «الغي».

~~~js emitter-fixed.mjs
function createEmitter() {
  const handlers = [];
  return {
    on(fn) { handlers.push(fn); },
    emit(value) {
      for (const fn of handlers) if (fn(value) === false) return 'cancelled';
      return 'delivered to ' + handlers.length;
    },
  };
}
const flags = { dirty: true };
const bus2 = createEmitter();
bus2.on((v) => void (flags.dirty = v.dirty));
bus2.on((v) => console.log('  saved', v.id));
console.log(bus2.emit({ id: 2, dirty: false }));
~~~

~~~text الناتج (Node 24.22)
  saved 2
delivered to 2
~~~

**الشرح:** [[void (...)]] خلّت الـ arrow ترجّع [[undefined]] دايمًا. والأقواس حوالين الـ assignment لازمة، لأن [[void flags.dirty = v.dirty]] = [[(void flags.dirty) = ...]]: [[SyntaxError: Invalid left-hand side in assignment]]. والبديل الأوضح لو السطر طويل: جسم [[{ flags.dirty = v.dirty; }]] بأقواس معقوفة. ونفس الفخ في React: [[useEffect(() => fetchData())]] بترجّع Promise و React مستني function للتنضيف، فبيكتبوا [[useEffect(() => { fetchData(); }, [])]] أو [[() => void fetchData()]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك شاف [[void 0]] في كود minified و [[href="javascript:void(0)"]] في HTML قديم و [[void sendAnalytics()]] في كود TypeScript. اكتب له ٤ سطور: كل واحدة بتعمل إيه وليه، وأنهي فيهم تستخدمها في كود جديد.`, done: R`الـ ٤ سطور بيغطوا: [[void 0]] = [[undefined]] أقصر ومضمون، و [[javascript:void(0)]] لينك مبيروحش حتة (قديم وفيه مشاكل accessibility)، و [[void promise]] علامة fire-and-forget بس لازم معاها [[.catch]]، والاختيار في الكود الجديد.`, sol: R`**إجابة نموذجية:**

1. [[void 0]] بيرجّع [[undefined]] دايمًا. الـ minifiers (زي terser) بيكتبوه بدل [[undefined]] لأنه ٦ حروف بدل ٩، ولأن [[undefined]] زمان (قبل ES5) كان متغير global ممكن يتغيّر، ولسه ممكن يتغطّى محليًا: [[function legacy() { var undefined = 5; return [undefined, void 0]; }]] رجّعت [[[ 5, undefined ]]] (اتجرّب). في كودك اكتب [[undefined]]: أوضح، والمحليين ده محدش بيعمله.
2. [[href="javascript:void(0)"]]: لينك لما تدوس عليه بيقيّم [[void(0)]] = [[undefined]]، فالمتصفح مبيروحش حتة، والـ click handler بيشتغل. قديم: استخدم [[<button type="button">]] بدل لينك مش رايح حتة (keyboard و screen readers بيتعاملوا معاه صح، وCSP بيمنع [[javascript:]] URLs أصلًا).
3. [[void sendAnalytics()]]: «أنا قاصد مستناش». [[no-floating-promises]] في typescript-eslint بيقبلها (فيه option [[ignoreVoid]] وهو [[true]] افتراضيًا حسب وثائقها). بس لو [[sendAnalytics]] بترمي، Node بيقفل (exit 1، اتجرّب في «جرّب»): اكتب [[void sendAnalytics().catch(report)]] أو خلّي الدالة تمسك أخطاءها.
4. في كود جديد: [[void]] للـ fire-and-forget (ومعاه [[catch]]) وفي arrow callbacks اللي مش المفروض ترجّع حاجة. و [[void 0]] و [[javascript:void(0)]] سيبهم للأدوات والكود القديم.` },
          ],
          flag: "script",
          deep: {
            why: R`[[void]] صغير بس بيحل ٣ مشاكل حقيقية: قيمة بترجع بالغلط من arrow بسطر واحد وبتغيّر سلوك الـ API (الإلغاء بـ [[false]]، أو cleanup في React)، و Promise محدش مستنيها والقارئ مش عارف ده قصد ولا نسيان، والكود اللي بتقراه من minifiers وأنظمة قديمة. وفهمه بيوضّح فكرة أعم: كل expression ليها قيمة، حتى الـ assignment و [[push]].`,
            how: R`[[void UnaryExpression]] حسب المواصفة: قيّم الـ expression (فأي side effect بيحصل: نداء، تعديل، [[++]])، واعمل GetValue (فلو الـ reference مش موجود بيرمي [[ReferenceError]])، وبعدين ارجع [[undefined]]. أولويته زي باقي الـ unary ([[typeof]] و [[!]] و [[-]])، أعلى من أي binary operator، فـ [[void a + b]] = [[(void a) + b]].

مع Promise: [[void p]] مش بيعمل [[then]] ولا [[catch]]، الـ Promise بتكمّل عادي. لو اترفضت ومفيش handler، الـ host بيطلق unhandledrejection: في Node 15+ الافتراضي [[--unhandled-rejections=throw]] (البرنامج بيقع بـ exit 1 لو مفيش [[process.on('unhandledRejection')]])، وفي المتصفح event [[unhandledrejection]] وتحذير في الـ console.

و [[void function () {}()]]: الـ [[void]] خلّى [[function]] تبقى في مكان expression (مش أول الجملة)، فده IIFE من غير أقواس (درس «function expression و class expression و expression statement»).`,
            when: R`[[() => void doSomething()]]: callbacks في APIs بتفرق معاها القيمة الراجعة (events بتتلغي بـ [[false]]، و [[useEffect]] في React، و [[Array.prototype.forEach]] مش بتفرق بس بيوضّح النية). [[void promise.catch(...)]]: تحليلات و logs وتسخين كاش، أي حاجة مش لازم تخلص قبل اللي بعدها. [[void 0]]: لو بتكتب كود لازم يشتغل في بيئة ممكن تغطّي [[undefined]] (نادر جدًا دلوقتي). ومتستخدموش عشان تخبّي نتيجة دالة مهمة: لو النتيجة مهمة، استخدمها.`,
            mistakes: R`- [[void save()]] وتفتكر الأخطاء اتمسكت: البرنامج بيقع (exit 1).
- [[void 2 + 3]] ومستني [[undefined]]: [[NaN]]. أقواس.
- [[void x = 5]]: [[SyntaxError: Invalid left-hand side in assignment]]. اكتب [[void (x = 5)]].
- تستخدم [[void]] على [[await]]: [[void await p]] بيستنى فعلًا (الـ [[await]] بيتقيّم الأول)، فمش fire-and-forget.
- [[javascript:void(0)]] في لينكات جديدة بدل [[<button>]].
- تفتكر [[void]] function: [[void(0)]] الأقواس هنا grouping مش نداء.`,
          },
          teach: R`## الفكرة في سطر

[[void]] = «نفّذ ده وارمي النتيجة». الكود بيشتغل، بس اللي بيرجع دايمًا [[undefined]]. الناتج من Node 24.22.

---

## ١. [[void 0]] والأولوية

~~~js
console.log(void 0, void 'x', typeof void 0, void 0 === undefined);
console.log(void 2 + 3, void (2 + 3));
~~~

~~~text الناتج
undefined undefined undefined true
NaN undefined
~~~

| الـ expression | بيتقري كـ | النتيجة |
|---|---|---|
| [[void 0]] | ارمي [[0]] | [[undefined]] |
| [[typeof void 0]] | [[typeof (void 0)]] | [['undefined']] كنص |
| [[void 2 + 3]] | [[(void 2) + 3]] | [[NaN]]: [[undefined + 3]] |
| [[void (2 + 3)]] | احسب 5 وارميها | [[undefined]] |

---

## ٢. في الـ arrow callbacks: متسرّبش قيمة

~~~js
const ids = [];
console.log([1, 2, 3].map((n) => ids.push(n)), [1, 2, 3].map((n) => void ids.push(n)));
let count = 0;
const handlers = [() => count++, () => void count++];
console.log(handlers.map((h) => h()), count);
~~~

~~~text الناتج
[ 1, 2, 3 ] [ undefined, undefined, undefined ]
[ 0, undefined ] 2
~~~

- الـ arrow بسطر واحد من غير [[{}]] بترجّع قيمة الـ expression. [[ids.push(n)]] بترجّع الطول الجديد، فالـ map الأولى طلّعت أطوال مالهاش معنى.
- [[void ids.push(n)]]: الـ [[push]] حصل، والقيمة اترمت.
- [[() => count++]] رجّعت [[0]] (قيمة [[count]] **قبل** الزيادة)، و [[() => void count++]] رجّعت [[undefined]]، والاتنين زوّدوا [[count]] فبقى 2.

ده بيفرق في أي API بتبص على القيمة الراجعة: handler بيرجّع [[false]] بالغلط فبيلغي event (تمرين «صلّح»)، أو [[useEffect(() => fetchData())]] في React بترجّع Promise مكان دالة التنضيف.

---

## ٣. [[void promise]]: «مش هستنى» بقصد

~~~js
const save = async (x) => { if (x < 0) throw new Error('negative'); return 'saved ' + x; };
void save(1);
void save(-1).catch((e) => console.log('logged:', e.message));
~~~

~~~text الناتج
logged: negative
~~~

- [[void save(1)]]: الحفظ حصل، ومحدش استنى النتيجة. الـ [[void]] هنا للقارئ وللـ linter: «مش ناسي [[await]]، قاصد».
- [[void save(-1).catch(...)]]: الـ [[.catch]] الأول (الـ member access والنداء أولويتهم أعلى من [[void]])، فالـ Promise اللي اترمت هي اللي فيها handler، والخطأ اتسجّل.
- من غير [[.catch]] البرنامج بيقع بـ exit 1 («جرّب» فيه الناتج كامل).

| اللي كتبته | بيستنى؟ | لو فشلت |
|---|---|---|
| [[await save()]] | أيوه | الـ error بيترمي في مكانه |
| [[save();]] | لأ | crash، والقارئ مش عارف ده قصد ولا نسيان |
| [[void save();]] | لأ | crash، بس النية واضحة |
| [[void save().catch(log);]] | لأ | بيتسجّل والبرنامج يكمّل |

---

## ٤. [[void]] قبل [[function]]: IIFE

~~~js
void function start() { console.log('void IIFE ran'); }();
~~~

~~~text الناتج
void IIFE ran
~~~

الجملة بتبدأ بـ [[void]] مش [[function]]، فالـ [[function start() {}]] بقت expression، و [[()]] بعدها نداء. نفس [[(function start() {})()]] بالظبط (الدرس اللي فات: ليه الجملة مينفعش تبدأ بـ [[function]]).

---

## الخلاصة

- [[void expr]] بينفّذ ويرجّع [[undefined]]، وأولويته عالية: أقواس.
- [[() => void x()]] عشان الـ callback ميرجّعش قيمة بالغلط.
- [[void promise]] علامة fire-and-forget، ومعاها [[.catch]] دايمًا.
- [[void 0]] و [[javascript:void(0)]] هتقراهم، ومش محتاج تكتبهم.`,
          lines: [
            R`أربع قيم: [[void 0]] و [[void 'x']] الاتنين [[undefined]]، و [[typeof void 0]] نص [['undefined']]، و [[true]] لأنها نفس [[undefined]].`,
            R`[[void 2 + 3]] بتتقري [[(void 2) + 3]] فـ [[NaN]]، وبالأقواس [[undefined]].`,
            R`array فاضية هنزوّد فيها عشان نشوف القيمة اللي [[push]] بيرجّعها.`,
            R`الـ map الأولى رجّعت الأطوال [[1, 2, 3]] من [[push]]، والتانية بـ [[void]] رجّعت [[undefined]] التلاتة، والـ push حصل في الحالتين.`,
            R`عدّاد هيزيد من handlers.`,
            R`handler بيرجّع قيمة [[count++]] (القيمة القديمة)، والتاني نفس الشغل بس بـ [[void]] فمبيرجّعش حاجة.`,
            R`النتايج [[0]] و [[undefined]]، و [[count]] بقى 2 لأن الاتنين زوّدوا.`,
            R`دالة async بتفشل لو الرقم سالب، وإلا بترجّع نص.`,
            R`fire-and-forget: الحفظ بيحصل ومحدش بيستنى، والـ [[void]] بتقول إن ده مقصود.`,
            R`نفس الكلام بس الحفظ هيفشل، فـ [[.catch]] بيسجّل الخطأ بدل ما البرنامج يقع: [[logged: negative]].`,
            R`[[void]] خلّت [[function]] expression، فـ [[()]] نادتها على طول: IIFE من غير أقواس.`,
          ],
          ref: [
            { t: "MDN: void operator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void" },
            { t: "ECMAScript: The void Operator", url: "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-void-operator" },
            { t: "typescript-eslint: no-floating-promises", url: "https://typescript-eslint.io/rules/no-floating-promises/" },
          ],
          pre: ["js/function expression و class expression و expression statement", { to: "js/الأخطاء العامة: unhandledrejection و uncaughtException", why: R`الـ Promise المرفوضة اللي محدش مسكها` }, { to: "js/null و undefined", why: R`[[undefined]] نفسه` }],
        },
      ]
    }
]);
