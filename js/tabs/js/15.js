// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`الـ object model: الخصائص من جوه، و Reflect و Proxy`,
      l: 3,
      n: "كل أشكال الـ object literal و property accessors، والـ descriptors (writable و enumerable و configurable)، ومين بيشوف أنهي خاصية، والأقفال التلاتة، والـ prototype كـ API، والتحويل لرقم ونص، والدالة كـ object و arguments، و Reflect كله، وكل traps الـ Proxy بالـ invariants بتاعتها، ومشاريع: config بـ schema و undo و views بتتسحب",
      pre: [
        { to: "js/object literal", why: R`الـ object literal في أبسط صورته و [[?.]]، والوحدة دي بتكمّل كل الأشكال الباقية` },
        { to: "js/prototype chain", why: R`[[Object.getPrototypeOf]] و [[Object.create]] والقراية في السلسلة` },
        { to: "js/class", why: R`الـ getters والـ setters والـ [[#private]] في الـ class` },
        { to: "js/Object.keys و entries", why: R`[[Object.keys]] و [[entries]] و [[Object.hasOwn]] في أبسط صورهم` },
        { to: "js/this", why: R`[[this]] جوه الـ methods والـ getters، وهو الـ receiver في [[Reflect]]` },
        { to: "js/Proxy و Reflect", why: R`الـ traps الأربعة [[get]] و [[set]] و [[has]] و [[deleteProperty]]: الوحدة دي بتكمّل الباقي` },
      ],
      goal: [
        R`تكتب أي object literal بكل أشكاله (shorthand و computed و method definitions و [[get]]/[[set]] و [[async]] و [[*generator]] و [[__proto__]])، وتعرف ليه [[m() {}]] مش [[m: function () {}]]، وإن كل مفتاح بيتحوّل لنص.`,
        R`تقرا وتكتب الـ descriptors بـ [[Object.defineProperty]] و [[getOwnPropertyDescriptors]]، وتتجنّب الـ defaults trap، وتنسخ object بالـ getters بتاعته.`,
        R`تختار الطريقة الصح للّف والفحص ([[Object.keys]] ولا [[for...in]] ولا [[getOwnPropertyNames]] ولا [[Reflect.ownKeys]]، و [[in]] ولا [[Object.hasOwn]] ولا [[propertyIsEnumerable]]) من جدول واحد.`,
        R`تقفل objects بالدرجة اللي محتاجها ([[preventExtensions]] و [[seal]] و [[freeze]] وعميق)، وتعرف اللي القفل مبيوصلوش.`,
        R`تتحكم في تحويل objects بتاعتك لرقم ونص ([[valueOf]] و [[toString]] و [[Symbol.toPrimitive]] و [[toLocaleString]])، وتستخدم خصايص الدوال ([[length]] و [[name]] و [[Symbol.hasInstance]] و [[new.target]] و [[arguments]]).`,
        R`تستخدم الـ ١٣ دالة في [[Reflect]] والـ ١٣ trap في [[Proxy]] من غير ما تكسر الـ invariants، وتعمل views بتتسحب بـ [[Proxy.revocable]]، وتعرف تمن الـ Proxy بالأرقام.`,
      ],
      use: {
        prog: R`كل مكتبة و framework بتستخدمه مبني على الحاجات دي: Vue 3 على Proxy، و Vue 2 على [[defineProperty]]، و Immer على Proxy و [[freeze]]، و ORMs بتعرض الأعمدة كخصايص. ولما تفهم الـ object model مش هتتفاجئ بخاصية «موجودة ومش ظاهرة»، ولا بـ [[[object Object]]] في الواجهة، ولا بـ Proxy بيقع أول ما حد يعمل [[freeze]].`,
        work: R`إعدادات لازم تتحقق وتتقفل، و APIs بتدّي كود تاني صلاحية للقراية بس وتسحبها، وتتبّع «فيه تعديلات متحفظتش» في فورم، وأنواع فلوس ومدد بتتعرض وتتقارن صح، و mocks و tracers في الاختبارات والـ debugging.`,
        cs: R`الـ metaprogramming و reflection (برنامج بيقرا ويغيّر بنية نفسه)، والفرق بين الـ interface والـ implementation (الـ internal methods في المواصفات)، والـ invariants كـ «عقد» لازم أي implementation تحترمه، و hidden classes و inline caches في المحركات.`,
      },
      projects: [
        { lvl: 'صغير', t: R`جدول الـ descriptors زي ls -l`, what: R`أداة [[props.js]] فيها [[listProps(obj, { inherited })]] بتطبع كل خاصية own (نصوص و Symbols، ظاهرة ومخفية) في سطر: الأذونات بحروف زي [[ls -l]] ([[w]] أو [[a]] للـ accessor أو [[-]]، ثم [[e]]، ثم [[c]])، ومكانها ([[own]] أو [[↑1]] لو موروثة)، واسمها، ومعاينة للقيمة (دالة باسمها وعدد الـ parameters). وفي أول سطر درجة القفل وعدد الخصايص. من دروس «property descriptors» و «enumerability و ownership» و «Object.preventExtensions و seal و freeze».`, done: R`على instance من class بـ [[{ inherited: true }]] بيطلّع الـ field والخاصية المخفية والـ [[constructor]] والـ methods والـ getter والـ [[Symbol.iterator]] كل واحد بأذوناته الصح، وعلى [[[10, 20]]] بيطلّع [[length]] بـ [[w--]]، وعلى object متجمّد بيقول [[frozen]] وكل خاصية [[-e-]].`, sol: R`**هتشوف إيه:** ٣ جداول، واحد لكل object، شبه [[ls -l]] بالظبط:

~~~text الناتج: node props.js
== new Account("Sara") ومعاه الموروث
(open, 6 خاصية)
wec  own  owner                    "Sara"
---  own  id                       "AC-1"
w-c  ↑1   constructor              ƒ Account(1)
w-c  ↑1   deposit                  ƒ deposit(1)
a-c  ↑1   label                    get
w-c  ↑1   Symbol(Symbol.iterator)  ƒ [Symbol.iterator](0)

== [10, 20]
(open, 3 خاصية)
wec  own  0       10
wec  own  1       20
w--  own  length  2

== Object.freeze({ port: 8080, hosts: [...] })
(frozen, 2 خاصية)
-e-  own  port   8080
-e-  own  hosts  Array(2)
~~~

~~~js props.js
// node props.js: بيطبع خصايص أي object زي ls -l، كل خاصية بإعداداتها
function flags(d) {
  const kind = 'value' in d ? (d.writable ? 'w' : '-') : 'a';
  return kind + (d.enumerable ? 'e' : '-') + (d.configurable ? 'c' : '-');
}

function preview(d) {
  if (!('value' in d)) return (d.get ? 'get' : '') + (d.get && d.set ? '/' : '') + (d.set ? 'set' : '');
  const v = d.value;
  if (typeof v === 'function') return 'ƒ ' + (v.name || '(من غير اسم)') + '(' + v.length + ')';
  if (typeof v === 'string') return JSON.stringify(v.length > 20 ? v.slice(0, 20) + '…' : v);
  if (v !== null && typeof v === 'object') return Array.isArray(v) ? 'Array(' + v.length + ')' : '{…}';
  return String(v);
}

function listProps(obj, { inherited = false } = {}) {
  const rows = [];
  let level = 0;
  for (let o = obj; o !== null && (level === 0 || inherited); o = Object.getPrototypeOf(o), level++) {
    if (o === Object.prototype && level > 0) break;
    for (const key of Reflect.ownKeys(o)) {
      const d = Reflect.getOwnPropertyDescriptor(o, key);
      rows.push([flags(d), level === 0 ? 'own' : '↑' + level, String(key), preview(d)]);
    }
  }
  const lock = Object.isFrozen(obj) ? 'frozen' : Object.isSealed(obj) ? 'sealed' : Object.isExtensible(obj) ? 'open' : 'no-add';
  const width = Math.max(4, ...rows.map((r) => r[2].length));
  const lines = rows.map(([f, where, key, val]) => f + '  ' + where.padEnd(4) + ' ' + key.padEnd(width) + '  ' + val);
  return ['(' + lock + ', ' + rows.length + ' خاصية)', ...lines].join('\n');
}

class Account {
  #pin = 1234;
  owner;
  constructor(owner) {
    this.owner = owner;
    Object.defineProperty(this, 'id', { value: 'AC-1' });
  }
  deposit(amount) { return amount; }
  get label() { return this.owner + ' ' + this.id; }
  [Symbol.iterator]() { return [].values(); }
}

console.log('== new Account("Sara") ومعاه الموروث');
console.log(listProps(new Account('Sara'), { inherited: true }));
console.log('\n== [10, 20]');
console.log(listProps([10, 20]));
console.log('\n== Object.freeze({ port: 8080, hosts: [...] })');
console.log(listProps(Object.freeze({ port: 8080, hosts: ['a', 'b'] })));

export { listProps };
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- [[flags(d)]]: لو الـ descriptor فيه [[value]] يبقى data وأول حرف من [[writable]]، وإلا accessor ([[a]]). ده نفس منطق تمرين [[describeProps]].
- [[preview(d)]]: الـ getter **مبيتناداش** (بيكتب [[get]] بس)، لأن نداء getter ممكن يعمل حاجة. والدالة بتتعرض بـ [[name]] و [[length]] (درس «Function»).
- اللوب الكبير بيطلع في السلسلة بـ [[Object.getPrototypeOf]] لحد [[Object.prototype]] (اللي بنقف عنده عشان مطلعش ١٢ method مالهمش لازمة)، ولكل مستوى [[Reflect.ownKeys]] و [[Reflect.getOwnPropertyDescriptor]].
- درجة القفل بالترتيب من الأقوى: frozen ثم sealed ثم no-add ثم open (درس الأقفال: الأسئلة بتقيس الحالة).
- العرض: [[padEnd]] بعرض أطول اسم، عشان الأعمدة تتراص.

**الغلطات اللي حصلت وأنا ببنيه:**

- أول نسخة كانت بتلف بـ [[Object.keys]]، والجدول بتاع الـ Account طلع كده:

~~~text الناتج من النسخة الأولى
(open, 1 خاصية)
wec  own  owner  "Sara"
~~~

  [[id]] المخفية والـ methods والـ getter والـ Symbol كلهم اختفوا، لأن [[Object.keys]] own وظاهر ونص بس (درس «enumerability و ownership»). الحل [[Reflect.ownKeys]].
- لما غيّرتها لـ [[Reflect.ownKeys]] وكنت حاطط [[key]] نفسه في الصف (من غير [[String(key)]])، البرنامج وقع عند الـ Symbol: [[TypeError: key.padEnd is not a function]]. الـ Symbol مش نص فمفيهوش methods النصوص. الحل [[String(key)]] قبل أي حاجة.
- [[#pin]] مظهرتش في أي نسخة: الـ private field مش property أصلًا، وده صح مش باج.` },
        { lvl: 'صغير', t: R`تقرير قفل الـ objects`, what: R`[[lock-report.js]] فيه [[lockReport(root, name)]] بيلف على object متداخل (objects و arrays جوه بعض) ويطبع كل مسار ودرجة قفله ([[open]] أو [[no-add]] أو [[sealed]] أو [[frozen]])، ويحذّر لو جزء مش متجمّد جوه object متجمّد (لأن ده معناه إن الـ freeze السطحي ضحك عليك)، ومبيلفش للأبد على المراجع الدايرية. من دروس «Object.preventExtensions و seal و freeze» و «enumerability و ownership».`, done: R`على إعدادات [[Object.freeze]] من برّه بس، التقرير بيطلّع [[settings.db]] [[sealed]] و [[settings.db.pool]] [[open]] وتحذيرين، وعلى object فيه [[self]] بيكتب «مرجع دايري» ويكمّل، وآخر سطر بيثبت إن التعديل جوه المتجمّد شغال فعلًا.`, sol: R`**هتشوف إيه:** كل مسار في سطر بدرجة قفله، والتحذيرات تحته:

~~~text الناتج: node lock-report.js
settings               frozen
settings.db            sealed
settings.db.pool       open
settings.origins       frozen
settings.flags         no-add
⚠ settings.db جوه object متجمّد بس هو نفسه sealed: أي حد يقدر يعدّل فيه
⚠ settings.flags جوه object متجمّد بس هو نفسه no-add: أي حد يقدر يعدّل فيه

loop                   open
loop.self ↺ (مرجع دايري، اتخطيته)

عدّلت settings.db.pool.max وهي جوه settings المتجمّدة: 999
~~~

~~~js lock-report.js
// node lock-report.js: بيلف على object متداخل ويقول كل جزء متقفل لأي درجة

function lockLevel(o) {
  if (Object.isFrozen(o)) return 'frozen';
  if (Object.isSealed(o)) return 'sealed';
  if (!Object.isExtensible(o)) return 'no-add';
  return 'open';
}

function lockReport(root, name = 'root') {
  const lines = [];
  const warnings = [];
  const seen = new WeakSet();
  (function walk(value, path, parentLevel) {
    if (value === null || typeof value !== 'object') return;
    if (seen.has(value)) { lines.push(path + ' ↺ (مرجع دايري، اتخطيته)'); return; }
    seen.add(value);
    const level = lockLevel(value);
    lines.push(path.padEnd(22) + ' ' + level);
    if (parentLevel === 'frozen' && level !== 'frozen') warnings.push(path + ' جوه object متجمّد بس هو نفسه ' + level + ': أي حد يقدر يعدّل فيه');
    for (const key of Reflect.ownKeys(value)) {
      const d = Object.getOwnPropertyDescriptor(value, key);
      if ('value' in d) walk(d.value, path + (Array.isArray(value) ? '[' + String(key) + ']' : '.' + String(key)), level);
    }
  })(root, name, null);
  return { lines, warnings };
}

const settings = Object.freeze({
  port: 8080,
  db: Object.seal({ host: 'localhost', pool: { min: 1, max: 10 } }),
  origins: Object.freeze(['https://shop.example']),
  flags: Object.preventExtensions({ beta: false }),
});
const loop = { name: 'loop' };
loop.self = loop;

for (const [label, obj] of [['settings', settings], ['loop', loop]]) {
  const { lines, warnings } = lockReport(obj, label);
  console.log(lines.join('\n'));
  for (const w of warnings) console.log('⚠ ' + w);
  console.log('');
}

settings.db.pool.max = 999;
console.log('عدّلت settings.db.pool.max وهي جوه settings المتجمّدة:', settings.db.pool.max);

export { lockReport, lockLevel };
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- [[lockLevel]]: بيسأل من الأقوى للأضعف، لأن أي object متجمّد هو كمان sealed ومش extensible. لو سألت [[isSealed]] الأول كان كل المتجمّد هيطلع sealed.
- [[walk]] دالة recursive جوه IIFE (درس «module pattern و IIFE»)، وبتاخد درجة الأب عشان تقارن.
- [[WeakSet]] للمراجع الدايرية: من غيره [[loop.self]] كان هيلف لحد [[RangeError: Maximum call stack size exceeded]].
- الـ descriptor مش القيمة: لو فيه getter مبنقراهوش.
- التحذير بس لما الأب [[frozen]]: لأن ده المكان اللي الناس بتفتكر فيه إن «كله اتقفل». ولاحظ إن [[settings.db.pool]] [[open]] جوه [[sealed]] من غير تحذير، لأن الـ seal أصلًا بيسمح بالتعديل.

**الغلطة اللي حصلت:** أول نسخة كانت من غير سطر [[seen.has(value)]]، فالـ [[loop]] وقع البرنامج كله: [[RangeError: Maximum call stack size exceeded]] (الدالة نادت نفسها على [[loop.self]] ثم [[loop.self.self]] للأبد). الحل [[WeakSet]] بيفتكر اللي اتزار، ولما الـ object يتكرر بنكتب سطر «مرجع دايري» ونرجع.` },
        { lvl: 'متوسط', t: R`Money بيتحوّل صح ومبيتجمعش غلط`, what: R`class [[Money]] في [[money.js]]: المبلغ قروش في [[#cents]] (integer، وأي كسر بيرمي)، و [[Money.from('125.50')]] بيقرا نص برقمين عشريين بالكتير، و [[add]] و [[subtract]] بيرفضوا عملتين مختلفتين، و [[allocate(n)]] بيقسم المبلغ على [[n]] من غير ما قرش يضيع. والتحويل: [[Number(m)]] رقم، و [[String(m)]] و template literal [["125.50 EGP"]]، و [[toLocaleString('ar-EG')]] بالأرقام العربي، و [[JSON.stringify]] بيطلّع [[{ amount, currency }]]. و [[m + 10]] و [[m == 155.5]] **بيرموا** بدل ما يحسبوا غلط. والـ object متجمّد. من دروس «valueOf و toString و Symbol.toPrimitive» و «Object.preventExtensions و seal و freeze» و «Function» ([[instanceof]]).`, done: R`[[demo.js]] بيطبع الإجمالي ١٥٥٫٥٠ بالشكلين، و [[allocate(3)]] بيطلّع [[51.84]] و [[51.83]] و [[51.83]] (مجموعهم المبلغ بالظبط)، والست محاولات الغلط بيرموا ٦ رسايل مفهومة، والترتيب بـ [[a - b]] شغال.`, sol: R`**هتشوف إيه:** المبلغ بكل الأشكال، وبعده كل استخدام غلط بيرمي رسالة بتقولك تعمل إيه:

~~~text الناتج: node demo.js
155.50 EGP | ١٥٥٫٥٠ EGP | 155.50 EGP
155.5 true 15550
الإجمالي: 155.50 EGP | 155.50 EGP
{"order":7,"total":{"amount":155.5,"currency":"EGP"}}
[ '51.84 EGP', '51.83 EGP', '51.83 EGP' ]
TypeError: Money مبيتجمعش ولا يتقارن بـ == ضمني: استخدم add() أو Number(m) أو String(m)
TypeError: Money مبيتجمعش ولا يتقارن بـ == ضمني: استخدم add() أو Number(m) أو String(m)
TypeError: متوقع Money، وصلني number
TypeError: عملتين مختلفتين: EGP و USD
SyntaxError: مبلغ مش مفهوم: "12.345"
TypeError: Money بياخد قروش (integer)، وصلني 1.5
TypeError: Cannot add property extra, object is not extensible
[ '25.00 EGP', '90.00 EGP', '150.00 EGP' ]
~~~

~~~js money.js
// Money: فلوس بالقروش (integer) بتتحوّل لرقم أو نص صح، وبترفض الجمع الضمني
export class Money {
  #cents;
  #currency;

  constructor(cents, currency = 'EGP') {
    if (!Number.isSafeInteger(cents)) throw new TypeError('Money بياخد قروش (integer)، وصلني ' + cents);
    this.#cents = cents;
    this.#currency = currency;
    Object.freeze(this);
  }

  static from(text, currency = 'EGP') {
    const m = /^\s*(-)?(\d+)(?:\.(\d{1,2}))?\s*$/.exec(String(text));
    if (!m) throw new SyntaxError('مبلغ مش مفهوم: ' + JSON.stringify(text));
    const cents = Number(m[2]) * 100 + Number((m[3] ?? '0').padEnd(2, '0'));
    return new Money(m[1] ? -cents : cents, currency);
  }

  get cents() { return this.#cents; }
  get currency() { return this.#currency; }

  #same(other) {
    if (!(other instanceof Money)) throw new TypeError('متوقع Money، وصلني ' + typeof other);
    if (other.currency !== this.#currency) throw new TypeError('عملتين مختلفتين: ' + this.#currency + ' و ' + other.currency);
    return other.cents;
  }

  add(other) { return new Money(this.#cents + this.#same(other), this.#currency); }
  subtract(other) { return new Money(this.#cents - this.#same(other), this.#currency); }

  allocate(parts) {
    const base = Math.trunc(this.#cents / parts);
    let rest = this.#cents - base * parts;
    return Array.from({ length: parts }, () => new Money(base + (rest-- > 0 ? 1 : 0), this.#currency));
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.#cents / 100;
    if (hint === 'string') return this.toString();
    throw new TypeError('Money مبيتجمعش ولا يتقارن بـ == ضمني: استخدم add() أو Number(m) أو String(m)');
  }

  toString() { return (this.#cents / 100).toFixed(2) + ' ' + this.#currency; }

  toLocaleString(locale = 'ar-EG') {
    const amount = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(this.#cents / 100);
    return amount + ' ' + this.#currency;
  }

  toJSON() { return { amount: this.#cents / 100, currency: this.#currency }; }
}
~~~

~~~js demo.js
import { Money } from './money.js';

const price = Money.from('125.50');
const shipping = Money.from('30');
const total = price.add(shipping);

console.log(String(total), '|', total.toLocaleString(), '|', total.toLocaleString('en-US'));
console.log(Number(total), +total > 150, total.cents);
console.log('الإجمالي: ' + String(total), '|', $__bt$__{total}$__bt);
console.log(JSON.stringify({ order: 7, total }));
console.log(total.allocate(3).map(String));

const checks = [
  () => total + 10,
  () => total == 155.5,
  () => total.add(155),
  () => total.add(new Money(100, 'USD')),
  () => Money.from('12.345'),
  () => new Money(1.5),
];
for (const fn of checks) {
  try { console.log(fn()); } catch (e) { console.log(e.name + ': ' + e.message); }
}
try { total.extra = 1; } catch (e) { console.log(e.name + ': ' + e.message); }
console.log([Money.from('90'), Money.from('150'), Money.from('25')].sort((a, b) => a - b).map(String));
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- [[#cents]] و [[#currency]] private، و getters للقراية بس، و [[Object.freeze(this)]] في آخر الـ constructor: محدش يقدر يزوّد خاصية ([[extra]] رمت). والـ private لسه بتتقري لأن القفل مبيوصلهاش، بس محدش بيكتب فيها بعد الإنشاء.
- [[Money.from]]: regex على النص **كله** برقمين عشريين بالكتير، و [[padEnd(2, '0')]] بيخلي [["5"]] تبقى ٥٠ قرش مش ٥. والحساب كله integers.
- [[#same(other)]]: method private بتتأكد إن التاني [[Money]] وبنفس العملة. ورجّعت [[other.cents]] (الـ getter) لأن [[#cents]] بتاع object تاني من نفس الـ class مسموح تقراه، بس الـ getter أوضح.
- [[allocate]]: كل جزء [[Math.trunc]] والباقي (قرش أو اتنين) بيتوزّع على الأوائل. ١٥٥٥٠ / ٣ = ٥١٨٣ والباقي ١، فالأول ٥١٨٤.
- [[Symbol.toPrimitive]]: [['number']] الجنيهات، و [['string']] النص، و [['default']] **يرمي**. ده بيمنع [[total + 10]] (اللي [[+]] بتاعها [['default']]) و [[==]]. بس [[a - b]] في الـ sort شغال لأنه [['number']]، و template literal و [[String()]] شغالين لأنهم [['string']].
- [[toLocaleString]] بـ [[Intl.NumberFormat]] رقمين عشريين، و [[toJSON]] عشان JSON (اللي مش بيستخدم التحويل خالص، درس الـ conversion).

**الغلطات اللي حصلت وأنا ببنيه:** أول نسخة كانت [[valueOf]] و [[toString]] عاديين:

~~~text الناتج من النسخة الأولى
165.5 الإجمالي: 155.5 155.50 EGP
0.30 EGP
1234.5
~~~

- [[total + 10]] طلّعت [[165.5]] ساكتة: جمع جنيهات على Money من غير عملة ومن غير ما حد يلاحظ. الحل [[Symbol.toPrimitive]] اللي بيرمي في [['default']].
- [['الإجمالي: ' + total]] طلّعت [[155.5]] من غير العملة ومن غير الصفر: الـ [[+]] راح لـ [[valueOf]]. الحل نفسه، و [[String(total)]] صراحة.
- [[12.345 * 100]] بقت [[1234.5]] قرش (كسر). الحل [[Number.isSafeInteger]] في الـ constructor، و [[Money.from]] بيقبل رقمين عشريين بس.` },
        { lvl: 'متوسط', t: R`tracer للدوال والـ classes بـ Proxy`, what: R`[[trace.js]] فيه [[trace(target, { name, out })]]: لو الـ target دالة بيلفها في Proxy بـ [[apply]] يطبع النداء بالـ arguments والنتيجة والوقت، ولو class بيلفها بـ [[construct]] ويلف الـ instance نفسه، ولو object بيلف كل method بيتقري منه بـ [[get]]. النداءات المتداخلة (method بتنادي method) بتتطبع بمسافة، والـ error بيتطبع ويترمي زي ما هو. والـ [[name]] و [[length]] و [[instanceof]] بيفضلوا زي الأصل، و [[cart.add === cart.add]]. من دروس «Proxy: باقي الـ traps» و «Reflect» و «Function».`, done: R`[[node demo.js]] بيطبع شجرة نداءات Cart فيها [[Cart.subtotal]] متزقّحة جوه [[Cart.total]]، والنداء اللي رمى بعلامة ✗ والبرنامج كمّل، و [[slugify]] كمان، وآخر سطر [[Cart 2 2 true true]].`, sol: R`**هتشوف إيه:** كل نداء بسهم داخل وسهم خارج بالنتيجة والوقت، والمتداخل بمسافة:

~~~text الناتج: node demo.js
→ new Cart("Sara")
← new Cart = Cart{…} (0.07ms)
→ Cart.add("A-7", 120, 2)
← Cart.add = 1 (0.04ms)
→ Cart.add("B-1", 45)
← Cart.add = 2 (0.00ms)
→ Cart.total(0.14)
  → Cart.subtotal()
  ← Cart.subtotal = 285 (0.03ms)
← Cart.total = 324.9 (0.16ms)
→ Cart.total(-1)
✗ Cart.total رمى RangeError: الضريبة بالسالب
→ slugify("  Hello World ")
← slugify = "hello-world" (0.09ms)

الاسم والـ length لسه زي الأصل: Cart 2 2 true true
~~~

~~~js trace.js
// trace(): بيلف دالة أو class أو object في Proxy ويسجّل كل نداء بالـ arguments والنتيجة والوقت
let depth = 0;
const wrapped = new WeakMap();

function show(v) {
  if (typeof v === 'function') return 'ƒ ' + (v.name || 'anonymous');
  if (typeof v === 'string') return JSON.stringify(v);
  if (v && typeof v === 'object') return v.constructor?.name === 'Object' ? JSON.stringify(v) : (v.constructor?.name ?? 'Object') + '{…}';
  return String(v);
}

function record(label, args, run, out) {
  const pad = '  '.repeat(depth);
  out(pad + '→ ' + label + '(' + args.map(show).join(', ') + ')');
  depth++;
  const t0 = performance.now();
  try {
    const result = run();
    out(pad + '← ' + label + ' = ' + show(result) + ' (' + (performance.now() - t0).toFixed(2) + 'ms)');
    return result;
  } catch (e) {
    out(pad + '✗ ' + label + ' رمى ' + e.name + ': ' + e.message);
    throw e;
  } finally {
    depth--;
  }
}

export function trace(target, { name = target.name || 'object', out = console.log } = {}) {
  if (wrapped.has(target)) return wrapped.get(target);
  const handler = {
    apply: (fn, thisArg, args) => record(name, args, () => Reflect.apply(fn, thisArg, args), out),
    construct: (C, args, newTarget) => record('new ' + name, args, () => {
      const instance = Reflect.construct(C, args, newTarget);
      return trace(instance, { name, out });
    }, out),
    get(t, key, receiver) {
      const value = Reflect.get(t, key, receiver);
      if (typeof t === 'function' || typeof value !== 'function' || typeof key === 'symbol' || key === 'constructor') return value;
      return trace(value, { name: name + '.' + key, out });
    },
  };
  const proxy = new Proxy(target, handler);
  wrapped.set(target, proxy);
  return proxy;
}
~~~

~~~js demo.js
import { trace } from './trace.js';

class Cart {
  constructor(owner) { this.owner = owner; this.items = []; }
  add(sku, price, qty = 1) { this.items.push({ sku, price, qty }); return this.items.length; }
  subtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  total(taxRate) {
    if (taxRate < 0) throw new RangeError('الضريبة بالسالب');
    return Math.round(this.subtotal() * (1 + taxRate) * 100) / 100;
  }
}

const TracedCart = trace(Cart);
const cart = new TracedCart('Sara');
cart.add('A-7', 120, 2);
cart.add('B-1', 45);
cart.total(0.14);
try { cart.total(-1); } catch {}

const slugify = trace((text) => text.trim().toLowerCase().replace(/\s+/g, '-'), { name: 'slugify' });
slugify('  Hello World ');
console.log('');
console.log('الاسم والـ length لسه زي الأصل:', TracedCart.name, Cart.prototype.add.length, cart.add.length, cart instanceof Cart, cart.add === cart.add);
~~~

~~~json package.json
{ "type": "module" }
~~~

**كل حتة بتعمل إيه:**

- [[record]]: بيطبع السهم الداخل، ويزوّد [[depth]]، وينفّذ، ويطبع النتيجة أو الـ error، وفي [[finally]] بيرجّع [[depth]] حتى لو حصل error. من غير [[finally]] أول error كان هيخلّي كل اللي بعده متزقّح زيادة.
- [[apply]] trap: للدوال. [[Reflect.apply(fn, thisArg, args)]] بنفس الـ [[this]] اللي اتنادت بيه.
- [[construct]] trap: للـ classes. بيعمل الـ instance بـ [[Reflect.construct(C, args, newTarget)]] (عشان الوراثة)، وبعدين يلفّه هو كمان في [[trace]] عشان الـ methods تتسجّل.
- [[get]] trap: لما تقرا method من object متلف بيرجّعها ملفوفة باسم [[Cart.add]]. وبيسيب كل حاجة تانية: القيم العادية، والـ Symbols، و [[constructor]] (عشان [[instanceof]] و [[show]] يشتغلوا)، وأي حاجة على دالة (عشان [[TracedCart.name]] يرجع النص مش Proxy).
- ليه [[Cart.subtotal]] اتسجّلت؟ [[total]] اتنادت بـ [[this]] = الـ proxy (مش الـ object الأصلي)، فـ [[this.subtotal()]] جواها عدّت على [[get]] تاني. ده نفس سبب الـ receiver في درس «Proxy و Reflect».
- [[WeakMap]] كاش: كل target بيتلف مرة واحدة.

**الغلطات اللي حصلت:** أول نسخة كانت من غير الـ [[WeakMap]]، والسطر الأخير طلع:

~~~text الناتج من النسخة الأولى (آخر سطر)
الاسم والـ length لسه زي الأصل: Cart 2 2 true false
~~~

[[cart.add === cart.add]] بقت [[false]] لأن كل قراية بتعمل Proxy جديد. ده بيبوّظ أي كود بيقارن دوال (زي [[removeEventListener(type, fn)]] اللي لازم ياخد نفس الدالة)، وبيعمل objects جديدة مع كل نداء. والكاش [[WeakMap]] مش [[Map]] عشان الـ targets تتمسح من الذاكرة لما محدش يستخدمها.

**الوقت:** الأرقام بين القوسين بتتغيّر كل تشغيل، والمهم ترتيب السطور والقيم.` },
        { lvl: 'كبير', t: R`config store بـ schema و undo و views بتتسحب`, what: R`مكتبة صغيرة [[config-store]]: [[createStore(schema, initial)]] بترجّع [[{ config, reset, undo, history, freeze, frozen, view, revokeViews }]]. الـ [[schema]] لكل إعداد: نوعه ([[integer]] و [[string]] و [[boolean]])، وحدوده ([[min]] و [[max]] و [[oneOf]] و [[pattern]])، وقيمته الافتراضية (اللي بتتفحص هي كمان). [[config]] Proxy: القراية لاسم غلط بترمي [[ReferenceError]] ومعاها «قصدك port؟»، والكتابة بتتحقق وبتتسجّل في [[history]]، و [[delete]] و [[Object.defineProperty]] و [[Object.setPrototypeOf]] بيترفضوا برسايل بتقول تعمل إيه، و JSON والـ spread و [[Object.keys]] و [[in]] شغالين. [[undo()]] بيرجّع آخر تغيير، و [[freeze()]] بيقفل كل حاجة، و [[view()]] بيدّي نسخة للقراية بس بـ [[Proxy.revocable]] و [[revokeViews()]] بيسحبها كلها. ومعاه ١٠ اختبارات بـ [[node --test]]. من الوحدة كلها.`, done: R`[[npm test]] بيطلّع ١٠ ✔ وصفر fail، و [[node demo.js]] بيطلّع السيناريو كامل: كتابات سليمة، و ٦ محاولات غلط برسايلها، و history و undo، و view بتقرا آخر قيمة ومبتكتبش، وبعد [[freeze]] مفيش كتابة، وبعد [[revokeViews]] الـ view بترمي.`, ext: R`زوّد نوع [[url]] (بـ [[URL.canParse]]) ونوع [[array]] بعناصر من نوع معيّن، و [[subscribe(key, fn)]] بينادي الدالة مع كل تغيير، و [[loadEnv(process.env, prefix)]] بيقرا [[APP_PORT]] ويحوّله للنوع الصح، و [[redo()]].`, sol: R`**هتشوف إيه:** سيناريو كامل، كل سطر فيه العملية ونتيجتها أو الـ error بتاعها:

~~~text الناتج: node demo.js
البداية                    {"port":8080,"host":"localhost","logLevel":"info","debug":false}
config.port = 9090         9090
config.logLevel = "debug"  debug
config.port = "80"         ✗ TypeError: port: لازم رقم صحيح، وصلني "80"
config.port = 70000        ✗ TypeError: port: أكبر من 65535، وصلني 70000
config.prot                ✗ ReferenceError: مفيش إعداد اسمه prot، قصدك port؟
config.colour = "red"      ✗ ReferenceError: مفيش إعداد اسمه colour
delete config.host         ✗ TypeError: مينفعش تمسح host، استخدم reset("host")
defineProperty             ✗ TypeError: مينفعش Object.defineProperty على الإعدادات (port)، اكتب config.port = ...
Object.keys                port, host, logLevel, debug
history                    port: 8080 → 9090 | logLevel: info → debug
undo()                     {"key":"logLevel","from":"info","to":"debug"}
بعد undo                   info
view.port                  9090
view.port = 1              ✗ TypeError: view للقراية بس: مينفعش تكتب port
بعد freeze: config.debug   ✗ TypeError: الإعدادات اتقفلت بـ freeze()، مينفعش تتغيّر
بعد freeze: undo()         ✗ TypeError: الإعدادات اتقفلت بـ freeze()، مينفعش تتغيّر
revokeViews()              1
view.port بعد revoke       ✗ TypeError: Cannot perform 'get' on a proxy that has been revoked
الآخر                      {"port":9090,"host":"localhost","logLevel":"info","debug":false}
~~~

### شجرة الملفات

~~~text config-store/
config-store/
├── package.json            type: module و npm test
├── demo.js                 السيناريو اللي فوق
├── src/
│   ├── schema.js           قواعد التحقق، وفحص الـ schema نفسها، و «قصدك ...؟»
│   └── config-store.js     createStore: الـ Proxy والـ history والـ views
└── test/
    └── config-store.test.js   ١٠ اختبارات بـ node:test
~~~

### ترتيب البناء

1. [[schema.js]] الأول: دالة لكل نوع بترجّع رسالة أو [[null]]، واختبرتها في الـ REPL على قيم صح وغلط.
2. [[createStore]] بـ [[get]] و [[set]] بس، وبعدها الاختبارين الأولانيين.
3. الأبواب الخلفية: [[deleteProperty]] و [[defineProperty]] و [[setPrototypeOf]]، واختبارهم.
4. [[history]] و [[undo]]، وبعدين [[freeze]]، وبعدين [[view]] و [[revokeViews]]، وكل واحدة باختبار قبل اللي بعدها.
5. [[demo.js]] في الآخر عشان أشوف الرسايل كلها مع بعض وأصلّح صياغتها.

~~~json package.json
{
  "name": "config-store",
  "type": "module",
  "scripts": { "test": "node --test", "demo": "node demo.js" }
}
~~~

~~~js src/schema.js
// قواعد التحقق: كل قاعدة بترجّع رسالة الغلط أو null
const CHECKS = {
  integer: (v, r) => !Number.isInteger(v) ? 'لازم رقم صحيح'
    : r.min !== undefined && v < r.min ? 'أقل من ' + r.min
    : r.max !== undefined && v > r.max ? 'أكبر من ' + r.max : null,
  string: (v, r) => typeof v !== 'string' ? 'لازم نص'
    : r.oneOf && !r.oneOf.includes(v) ? 'لازم واحدة من: ' + r.oneOf.join(' أو ')
    : r.pattern && !r.pattern.test(v) ? 'شكلها مش مظبوط (' + r.pattern + ')' : null,
  boolean: (v) => typeof v !== 'boolean' ? 'لازم true أو false' : null,
};

export function validateSchema(schema) {
  for (const [key, rule] of Object.entries(schema)) {
    if (!CHECKS[rule.type]) throw new TypeError('نوع مش معروف لـ ' + key + ': ' + rule.type);
    const problem = CHECKS[rule.type](rule.default, rule);
    if (problem) throw new TypeError('الـ default بتاع ' + key + ' نفسه غلط: ' + problem);
  }
  return schema;
}

export function checkValue(schema, key, value) {
  const problem = CHECKS[schema[key].type](value, schema[key]);
  return problem && key + ': ' + problem + '، وصلني ' + JSON.stringify(value);
}

// أقرب اسم بعدد التعديلات (Levenshtein)، عشان «prot» تقول «قصدك port؟»
function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

export function suggest(key, keys) {
  const best = keys.map((k) => [k, distance(key, k)]).sort((x, y) => x[1] - y[1])[0];
  return best && best[1] <= 2 ? '، قصدك ' + best[0] + '؟' : '';
}
~~~

~~~js src/config-store.js
import { validateSchema, checkValue, suggest } from './schema.js';

export function createStore(schema, initial = {}) {
  validateSchema(schema);
  const keys = Object.keys(schema);
  const data = Object.create(null);
  for (const key of keys) data[key] = schema[key].default;
  const changes = [];
  const revokers = [];

  const unknown = (key) => new ReferenceError('مفيش إعداد اسمه ' + key + suggest(key, keys));
  const locked = () => new TypeError('الإعدادات اتقفلت بـ freeze()، مينفعش تتغيّر');

  function write(key, value, record) {
    if (Object.isFrozen(data)) throw locked();
    if (!Object.hasOwn(schema, key)) throw unknown(key);
    const problem = checkValue(schema, key, value);
    if (problem) throw new TypeError(problem);
    if (record && data[key] !== value) changes.push(Object.freeze({ key, from: data[key], to: value }));
    data[key] = value;
    return true;
  }

  const config = new Proxy(data, {
    get(t, key) {
      if (typeof key === 'symbol') return undefined;
      if (key === 'toJSON' || key === 'then') return undefined;
      if (Object.hasOwn(schema, key)) return t[key];
      if (key in Object.prototype) return Object.prototype[key];
      throw unknown(key);
    },
    set: (t, key, value) => write(String(key), value, true),
    has: (t, key) => Object.hasOwn(schema, key),
    deleteProperty(t, key) { throw new TypeError('مينفعش تمسح ' + String(key) + '، استخدم reset("' + String(key) + '")'); },
    defineProperty(t, key) { throw new TypeError('مينفعش Object.defineProperty على الإعدادات (' + String(key) + ')، اكتب config.' + String(key) + ' = ...'); },
    setPrototypeOf() { throw new TypeError('مينفعش تغيّر الـ prototype بتاع الإعدادات'); },
    ownKeys: (t) => Reflect.ownKeys(t),
    getOwnPropertyDescriptor: (t, key) => Reflect.getOwnPropertyDescriptor(t, key),
  });

  for (const [key, value] of Object.entries(initial)) write(key, value, false);

  return {
    config,
    reset: (key) => write(key, schema[key]?.default, true) && undefined,
    undo() {
      if (Object.isFrozen(data)) throw locked();
      const last = changes.pop();
      if (last) write(last.key, last.from, false);
      return last ?? null;
    },
    history: () => Object.freeze([...changes]),
    freeze() { Object.freeze(data); return this; },
    get frozen() { return Object.isFrozen(data); },
    view() {
      const { proxy, revoke } = Proxy.revocable(data, {
        set(t, key) { throw new TypeError('view للقراية بس: مينفعش تكتب ' + String(key)); },
        deleteProperty(t, key) { throw new TypeError('view للقراية بس: مينفعش تمسح ' + String(key)); },
        defineProperty(t, key) { throw new TypeError('view للقراية بس: مينفعش تعرّف ' + String(key)); },
      });
      revokers.push(revoke);
      return proxy;
    },
    revokeViews() {
      const n = revokers.length;
      for (const revoke of revokers.splice(0)) revoke();
      return n;
    },
  };
}
~~~

~~~js demo.js
import { createStore } from './src/config-store.js';

const schema = {
  port: { type: 'integer', min: 1, max: 65535, default: 3000 },
  host: { type: 'string', pattern: /^[a-z0-9.-]+$/, default: 'localhost' },
  logLevel: { type: 'string', oneOf: ['error', 'warn', 'info', 'debug'], default: 'info' },
  debug: { type: 'boolean', default: false },
};
const log = (label, fn) => { try { console.log(label.padEnd(26), fn()); } catch (e) { console.log(label.padEnd(26), '✗', e.name + ':', e.message); } };

const store = createStore(schema, { port: 8080 });
const { config } = store;
log('البداية', () => JSON.stringify(config));
log('config.port = 9090', () => (config.port = 9090));
log('config.logLevel = "debug"', () => (config.logLevel = 'debug'));
log('config.port = "80"', () => (config.port = '80'));
log('config.port = 70000', () => (config.port = 70000));
log('config.prot', () => config.prot);
log('config.colour = "red"', () => (config.colour = 'red'));
log('delete config.host', () => delete config.host);
log('defineProperty', () => Object.defineProperty(config, 'port', { value: 1 }));
log('Object.keys', () => Object.keys(config).join(', '));
log('history', () => store.history().map((c) => c.key + ': ' + c.from + ' → ' + c.to).join(' | '));
log('undo()', () => JSON.stringify(store.undo()));
log('بعد undo', () => config.logLevel);

const view = store.view();
log('view.port', () => view.port);
log('view.port = 1', () => (view.port = 1));
store.freeze();
log('بعد freeze: config.debug', () => (config.debug = true));
log('بعد freeze: undo()', () => store.undo());
log('revokeViews()', () => store.revokeViews());
log('view.port بعد revoke', () => view.port);
log('الآخر', () => JSON.stringify(config));
~~~

~~~js test/config-store.test.js
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../src/config-store.js';

const schema = {
  port: { type: 'integer', min: 1, max: 65535, default: 3000 },
  host: { type: 'string', pattern: /^[a-z0-9.-]+$/, default: 'localhost' },
  debug: { type: 'boolean', default: false },
};

describe('القراية والكتابة', () => {
  test('الـ defaults والـ initial بيتحطوا', () => {
    const { config } = createStore(schema, { port: 8080 });
    assert.deepEqual({ ...config }, { port: 8080, host: 'localhost', debug: false });
  });
  test('قيمة سليمة بتتكتب وقيمة غلط بترمي TypeError فيه اسم الإعداد', () => {
    const { config } = createStore(schema);
    config.port = 443;
    assert.equal(config.port, 443);
    assert.throws(() => { config.port = '80'; }, { name: 'TypeError', message: /^port: لازم رقم صحيح/ });
    assert.throws(() => { config.host = 'Bad Host'; }, /host: شكلها مش مظبوط/);
    assert.equal(config.port, 443);
  });
  test('اسم غلط بيرمي ReferenceError ومعاه اقتراح', () => {
    const { config } = createStore(schema);
    assert.throws(() => config.prot, { name: 'ReferenceError', message: /قصدك port؟/ });
    assert.throws(() => { config.timeout = 5; }, ReferenceError);
  });
  test('initial فيه قيمة غلط بيرمي قبل ما الـ store يتعمل', () => {
    assert.throws(() => createStore(schema, { port: 0 }), /port: أقل من 1/);
  });
  test('schema الـ default بتاعها غلط بترمي', () => {
    assert.throws(() => createStore({ n: { type: 'integer', min: 5, default: 1 } }), /الـ default بتاع n نفسه غلط/);
  });
});

describe('الأبواب الخلفية مقفولة', () => {
  test('delete و defineProperty و setPrototypeOf بيترفضوا', () => {
    const { config } = createStore(schema);
    assert.throws(() => { delete config.port; }, /reset\("port"\)/);
    assert.throws(() => Object.defineProperty(config, 'port', { value: 1 }), /Object.defineProperty/);
    assert.throws(() => Object.setPrototypeOf(config, {}), /prototype/);
  });
  test('JSON و in و Object.keys شغالين', () => {
    const { config } = createStore(schema);
    assert.equal(JSON.stringify(config), '{"port":3000,"host":"localhost","debug":false}');
    assert.equal('port' in config, true);
    assert.equal('toString' in config, false);
    assert.deepEqual(Object.keys(config), ['port', 'host', 'debug']);
    assert.equal(String(config), '[object Object]');
  });
});

describe('history و undo و freeze و view', () => {
  test('كل تغيير بيتسجّل، والكتابة بنفس القيمة مبتتسجّلش، و undo بيرجّع', () => {
    const store = createStore(schema);
    store.config.port = 1;
    store.config.port = 1;
    store.config.debug = true;
    assert.equal(store.history().length, 2);
    assert.deepEqual(store.undo(), { key: 'debug', from: false, to: true });
    assert.equal(store.config.debug, false);
    assert.equal(store.undo().key, 'port');
    assert.equal(store.undo(), null);
  });
  test('بعد freeze مفيش كتابة ولا undo', () => {
    const store = createStore(schema).freeze();
    assert.equal(store.frozen, true);
    assert.throws(() => { store.config.port = 2; }, /اتقفلت/);
    assert.throws(() => store.undo(), /اتقفلت/);
    assert.equal(store.config.port, 3000);
  });
  test('الـ view بيقرا آخر قيمة، ومبيكتبش، وبيتقفل بـ revokeViews', () => {
    const store = createStore(schema);
    const view = store.view();
    store.config.port = 9000;
    assert.equal(view.port, 9000);
    assert.throws(() => { view.port = 1; }, /للقراية بس/);
    assert.equal(store.revokeViews(), 1);
    assert.throws(() => view.port, /revoked/);
    assert.equal(store.config.port, 9000);
  });
});
~~~

~~~text الناتج: npm test
▶ القراية والكتابة
  ✔ الـ defaults والـ initial بيتحطوا (1.4686ms)
  ✔ قيمة سليمة بتتكتب وقيمة غلط بترمي TypeError فيه اسم الإعداد (0.5718ms)
  ✔ اسم غلط بيرمي ReferenceError ومعاه اقتراح (0.3536ms)
  ✔ initial فيه قيمة غلط بيرمي قبل ما الـ store يتعمل (0.1726ms)
  ✔ schema الـ default بتاعها غلط بترمي (0.1615ms)
✔ القراية والكتابة (4.0212ms)
▶ الأبواب الخلفية مقفولة
  ✔ delete و defineProperty و setPrototypeOf بيترفضوا (0.3298ms)
  ✔ JSON و in و Object.keys شغالين (0.2118ms)
✔ الأبواب الخلفية مقفولة (0.7268ms)
▶ history و undo و freeze و view
  ✔ كل تغيير بيتسجّل، والكتابة بنفس القيمة مبتتسجّلش، و undo بيرجّع (0.2579ms)
  ✔ بعد freeze مفيش كتابة ولا undo (0.2282ms)
  ✔ الـ view بيقرا آخر قيمة، ومبيكتبش، وبيتقفل بـ revokeViews (0.3257ms)
✔ history و undo و freeze و view (1.0669ms)
ℹ tests 10
ℹ suites 3
ℹ pass 10
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 87.5948
~~~

### كل حتة مهمة بتعمل إيه وليه

- **[[data = Object.create(null)]]:** الـ target من غير prototype، فاسم إعداد زي [[constructor]] أو [[toString]] مش هيتلخبط بحاجة موروثة (درس «setPrototypeOf»).
- **[[write(key, value, record)]]:** كل كتابة (من [[set]] أو [[reset]] أو [[undo]] أو الـ initial) بتعدّي من هنا: مقفول؟ اسم معروف؟ قيمة سليمة؟ وبعدين التسجيل. مكان واحد للقواعد.
- **[[get]]:** الـ Symbols بترجّع [[undefined]] (عشان [[console.log]] و [[Symbol.toPrimitive]])، و [[toJSON]] و [[then]] [[undefined]] (عشان JSON و [[await]] ميقعوش، درس «Proxy و Reflect»)، والأسامي اللي على [[Object.prototype]] بترجّع الأصلية (عشان [[String(config)]])، وأي اسم تاني غلط بيرمي باقتراح.
- **[[defineProperty]] مقفول:** من غيره [[Object.defineProperty(config, 'port', { value: 'x' })]] كان هيعدّي من ورا التحقق كله (درس «باقي الـ traps»، الباب الخلفي).
- **[[ownKeys]] و [[getOwnPropertyDescriptor]] بيرجّعوا الحقيقة:** محدش مخبّي، فالـ invariants مش هتقع حتى بعد [[freeze]].
- **[[freeze()]]:** [[Object.freeze(data)]] على الـ target نفسه، و [[write]] بيسأل [[Object.isFrozen(data)]] الأول عشان الرسالة تبقى مفهومة بدل [[trap returned falsish]].
- **[[view()]]:** [[Proxy.revocable]] على **نفس** [[data]]، فالـ view بتشوف آخر قيمة من غير نسخ. و [[revokers]] لستة بدوال السحب.
- **[[history()]]** بترجّع نسخة متجمّدة، وكل تغيير جواها متجمّد، فمحدش يقدر يزوّر التاريخ.
- **«قصدك port؟»:** مسافة Levenshtein (أقل عدد حروف تتغيّر عشان كلمة تبقى التانية)، ولو ٢ أو أقل بنقترح. [[prot]] و [[port]] مسافتهم ٢، و [[colour]] بعيدة عن كل الأسامي فمفيش اقتراح.

### الغلطات اللي حصلت وأنا ببنيه وإزاي اتصلحت

1. **[[String(config)]] كانت بترمي.** أول نسخة من الـ [[get]] كانت بترمي على أي اسم مش في الـ schema، و [[String()]] بيسأل عن [[toString]]: [[ReferenceError: مفيش إعداد اسمه toString]]. يعني أي لوج فيه الـ config كان هيوقع البرنامج. الحل سطر [[key in Object.prototype]]، واختبار جديد [[String(config) === '[object Object]']]. و [['toString' in config]] لسه [[false]] لأن [[has]] بيسأل الـ schema بس.
2. **الـ initial كان بيتسجّل في الـ history.** أول نسخة كانت بتنادي [[write(key, value, true)]] للقيم الأولانية:

~~~text الناتج من النسخة دي
[ { key: 'port', from: 3000, to: 8080 } ]
3000
~~~

يعني [[undo()]] على store لسه معمول رجّع الـ port للـ default. الحل [[record = false]] للـ initial ولـ [[undo]] نفسه.
3. **[[structuredClone(config)]] بيرمي:** [[DataCloneError: [object Object] could not be cloned.]]. الـ structured clone مش بيعدّي على traps، وبيرفض أي Proxy. سيبتها كده (الـ Proxy مش داتا) والحل للي محتاج نسخة: [[structuredClone({ ...config })]] اشتغلت وطلّعت [[{ port: 3000 }]].
4. **[[console.log(config)]]** بيطبع [[[Object: null prototype] { port: 3000 }]]: Node بيعرض الـ target مباشرة من غير ما يعدّي على الـ traps، فده عادي ومش باج.

### إزاي تكبر

اللي في [[ext]]، وكمان: تقرا الـ schema من JSON Schema حقيقي بدل الشكل ده، وتطلّع الـ errors كلها مرة واحدة بدل أول واحد (للفورمز)، وتعمل [[store.snapshot()]] بيرجّع object متجمّد عادي للي محتاج يبعته لـ worker.` },
        { lvl: 'فكرة', t: R`حط حارس على حاجة عندك`, what: R`اختار object في مشروع بتاعك بيتغيّر من أماكن كتير ومحتاج تعرف عنه حاجة: فورم «فيه تعديلات متحفظتش»، أو state عايز تعرف مين غيّره، أو إعدادات عايز تقفلها بعد التشغيل، أو API client عايز تلوج نداءاته. اختار الأداة الأنسب من الوحدة (descriptors، ولا أقفال، ولا Proxy بالـ traps اللي محتاجها بس)، واكتب ليه اخترتها، وابنيها بـ ٣ اختبارات على الأقل.`, done: R`الأداة شغالة على داتا حقيقية من مشروعك (أسامي مخترعة لو هتنشرها)، وفيه سطر بيقول ليه الأداة دي مش التانية، وفيه حالة طرفية اتعاملت معاها (مسح خاصية، أو رجوع لنفس القيمة، أو object متداخل).`, ext: R`خلّيها deep (تتبّع objects جوه objects بـ [[WeakMap]] كاش زي Vue)، أو اعرض التعديلات في الصفحة كـ diff، أو اربطها بـ [[beforeunload]] عشان المتصفح يسأل «متأكد إنك عايز تقفل؟» لما يبقى فيه تعديلات.`, sol: R`**النسخة النموذجية: «فيه تعديلات متحفظتش» لفورم بروفايل.** اخترت Proxy بـ [[set]] و [[deleteProperty]] و [[defineProperty]] بدل getters و setters لأن حقول الفورم بتتغيّر من مشروع للتاني ومش عايز أكتب setter لكل حقل، وبدل المقارنة الكاملة كل مرة لأن الـ Proxy بيعرف **أنهي** حقول اتلمست بس فبيقارنها هي.

~~~text الناتج: node demo.js
أول ما الفورم فتح: false
بعد التعديل: true {
  city: { from: 'Giza', to: 'Cairo' },
  newsletter: { from: false, to: true },
  phone: { from: '0100', to: undefined }
}
رجّعت المدينة زي ما كانت: {
  newsletter: { from: false, to: true },
  phone: { from: '0100', to: undefined }
}
بعد reset: false { name: 'Sara', city: 'Giza', phone: '0100', newsletter: false } false
~~~

~~~js track-changes.js
// trackChanges: نسخة «مسودة» من بيانات فورم، بتعرف إيه اتغيّر عن الأصل
export function trackChanges(original) {
  const base = structuredClone(original);
  const draft = structuredClone(original);
  const touched = new Set();
  const proxy = new Proxy(draft, {
    set(t, key, value, receiver) {
      touched.add(key);
      return Reflect.set(t, key, value, receiver);
    },
    deleteProperty(t, key) {
      touched.add(key);
      return Reflect.deleteProperty(t, key);
    },
    defineProperty(t, key, desc) {
      touched.add(key);
      return Reflect.defineProperty(t, key, desc);
    },
  });
  const changes = () => {
    const out = {};
    for (const key of touched) {
      const before = base[key];
      const after = Object.hasOwn(draft, key) ? draft[key] : undefined;
      if (!Object.is(before, after)) out[key] = { from: before, to: after };
    }
    return out;
  };
  return {
    draft: proxy,
    changes,
    isDirty: () => Object.keys(changes()).length > 0,
    reset() {
      for (const key of Reflect.ownKeys(draft)) delete draft[key];
      Object.assign(draft, structuredClone(base));
      touched.clear();
    },
  };
}
~~~

~~~js demo.js
import { trackChanges } from './track-changes.js';

const profile = { name: 'Sara', city: 'Giza', phone: '0100', newsletter: false };
const form = trackChanges(profile);
const { draft } = form;

console.log('أول ما الفورم فتح:', form.isDirty());
draft.city = 'Cairo';
draft.newsletter = true;
draft.name = 'Sara';
delete draft.phone;
console.log('بعد التعديل:', form.isDirty(), form.changes());
draft.city = 'Giza';
console.log('رجّعت المدينة زي ما كانت:', form.changes());
form.reset();
console.log('بعد reset:', form.isDirty(), draft, profile === draft);
~~~

~~~json package.json
{ "type": "module" }
~~~

**ليه التصميم ده:**

- **نسختين بـ [[structuredClone]]:** [[base]] الأصل اللي بنقارن بيه، و [[draft]] اللي بيتعدّل. ولو الأصل اتغيّر من برّه، الفورم مش بيتأثر.
- **[[touched]]** بيسجّل المفاتيح اللي اتلمست بس، و [[changes()]] بيقارنها بـ [[Object.is]] (عشان [[NaN]] و [[-0]]). فلو اليوزر كتب نفس الاسم ([[draft.name = 'Sara']]) أو رجّع المدينة، الحقل مش بيبان متغيّر. ده الفرق بين «اتلمس» و «اتغيّر».
- **المسح:** [[delete draft.phone]] بيتحسب تغيير لـ [[undefined]]، و [[Object.hasOwn]] بيفرّق بين حقل اتمسح وحقل قيمته [[undefined]].
- **[[defineProperty]] trap:** عشان [[Object.defineProperty(draft, ...)]] ميعدّيش من غير تسجيل. وخلي بالك: [[Reflect.set]] بالـ receiver بينادي [[defineProperty]] كمان، فالكتابة العادية بتسجّل مرتين في الـ [[Set]]، وده مش مشكلة لأن الـ [[Set]] مبيكرّرش.
- **[[reset()]]:** بيمسح كل المفاتيح ويرجّع نسخة من الأصل على **نفس** الـ object، عشان أي حد ماسك [[draft]] يفضل ماسك نفس الحاجة.
- آخر قيمة [[false]] في الناتج: [[profile === draft]]، إثبات إن الأصل متلمسش.

**إمتى متختارهاش:** لو الفورم فيه objects متداخلة (عنوان جواه شارع ومدينة)، الـ Proxy ده سطحي ومش هيشوف [[draft.address.city = 'x']] (درس «Proxy و Reflect»، حاجات Proxy مبيعملهاش). ساعتها يا إما deep proxy (الـ ext) يا إما مقارنة كاملة بـ deep equal وقت الحفظ بس.` },
      ],
      items: [
        {
          cmd: "method definitions و property accessors",
          title: "كل اللي ينفع يتكتب جوه {}: shorthand و computed و get و set و async و *method و __proto__، وتقرا الخاصية بالنقطة ولا بالأقواس؟",
          desc: R`الـ object literal ([[{ ... }]]) فيه أشكال كتير غير [[key: value]]: اسم المتغير لوحده (shorthand)، ومفتاح محسوب [[[expr]: v]]، و methods بالشكل المختصر، و [[get]] و [[set]]، و [[async]] و [[*generator]] methods، و [[__proto__: obj]] اللي بيحدد الـ prototype. وتقرا أي خاصية بطريقتين: [[obj.name]] أو [[obj["name"]]]، والتانية بتقبل أي expression.

درس «object literal» علّمك الأساس ([[name,]] و [[[key]: "red"]] و method بسيطة و [[?.]]). هنا بنكمّل الباقي: الفرق الحقيقي بين [[m() {}]] و [[m: function () {}]] ([[super]] والـ [[new]])، وقواعد الـ getters والـ setters، و [[__proto__]] جوه الـ literal، وإن **أي مفتاح بيتحوّل لنص** إلا الـ Symbol، فـ [[o[1]]] و [[o["1"]]] نفس الخانة، و [[ o[{}] ]] بتبقى [["[object Object]"]].`,
          example: R`// object literal فيه كل أشكال التعريف
const sku = 'A-7';
const qty = 3;
const field = 'price';
const base = { describe() { return 'منتج'; } };
const item = {
  __proto__: base,
  sku,
  qty,
  [field]: 120,
  [field + 'WithTax']: 136.8,
  get total() { return this.price * this.qty; },
  set total(v) { this.qty = Math.round(v / this.price); },
  describe() { return super.describe() + ' ' + this.sku; },
  async stock() { return 12; },
  *lines() { yield this.sku; yield this.qty; },
};
console.log(item.total, item['priceWithTax'], item.describe());
item.total = 600;
console.log(item.qty, [...item.lines()]);
item.stock().then((n) => console.log('stock', n));
console.log(Object.getPrototypeOf(item) === base, Object.keys(item));`,
          try: R`اعمل ملف [[keys.mjs]] فيه [[const k = {}]] وبعدين اكتب فيه بـ ٥ مفاتيح: [[k[1] = 'a']] و [[k[{}] = 'b']] و [[k[ [1, 2] ] = 'c']] و [[k[true] = 'd']] و [[k[null] = 'e']]، وزوّد [[k[Symbol('id')] = 'f']]. اطبع [[Object.keys(k)]]، وبعدين اطبع [[k['1,2']]] و [[k['[object Object]']]]. وآخر حاجة جرّب في ملف تاني [[({ get x(a) { return a; } })]] واقرا الـ error.`,
          sol: R`اتجرّب على Node 24.22:

~~~js keys.mjs
const k = {};
k[1] = 'a'; k[{}] = 'b'; k[[1, 2]] = 'c'; k[true] = 'd'; k[null] = 'e';
const s = Symbol('id'); k[s] = 'f';
console.log(Object.keys(k), k['1'], k['[object Object]'], k['1,2'], k[s]);
~~~

~~~text الناتج
[ '1', '[object Object]', '1,2', 'true', 'null' ] a b c f
~~~

كل مفتاح مش Symbol اتحوّل لنص بـ [[String()]]: الرقم [[1]] بقى [["1"]]، والـ object الفاضي بقى [["[object Object]"]]، والـ array بقت [["1,2"]] (زي [[join]])، و [[true]] و [[null]] بقوا كلمات. والـ Symbol فضل Symbol ومظهرش في [[Object.keys]] (ده درس «enumerability و ownership»).

والـ getter بـ parameter ([[getter.mjs]] فيه سطر واحد: [[({ get x(a) { return a; } });]]):

~~~text الناتج
SyntaxError: Getter must not have any formal parameters.
~~~

الـ getter بيتنادى من غير أقواس ([[obj.x]])، فمفيش حد يبعتله argument، والـ parser بيرفضه قبل ما أي سطر يشتغل.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب الناتج:

~~~js
const o = {};
o[1] = 'a';
o['1'] = 'b';
o[{}] = 'c';
o[{ id: 2 }] = 'd';
console.log(Object.keys(o), o[1], o['[object Object]']);
~~~`, done: R`كتبت [[[ '1', '[object Object]' ] b d]] قبل التشغيل، وتقدر تقول ليه في مفتاحين بس مش أربعة.`, sol: R`~~~text الناتج (Node 24.22)
[ '1', '[object Object]' ] b d
~~~

**ليه مفتاحين بس:** [[o[1]]] و [[o['1']]] نفس الخانة لأن الرقم بيتحوّل لنص [["1"]]، فالتانية كتبت [['b']] فوق [['a']]. والـ object الفاضي والـ object اللي فيه [[id]] الاتنين بيتحوّلوا لنفس النص [["[object Object]"]] (ده [[Object.prototype.toString]])، فـ [['d']] كتبت فوق [['c']].

**الغلطة الشائعة:** إنك تستخدم object عادي كـ «قاموس» مفاتيحه objects (يوزر ← بياناته). كل اليوزرز هيبقوا مفتاح واحد. الحل [[Map]] اللي بيقبل أي قيمة كمفتاح (درس «Map و Set»).` },
            { lvl: 'تطبيق', t: R`**ابني:** دالة [[makeCounter(start)]] بترجّع object literal فيه: [[count]]، و getter [[value]]، و setter [[value]] بيرفض أي حاجة مش رقم صحيح موجب بـ [[RangeError]]، و method [[inc(step = 1)]] بترجّع الـ object نفسه عشان تتسلسل ([[c.inc().inc(3)]])، و generator method [[*history()]] بيطلّع كل القيم اللي اتكتبت.`, done: R`[[makeCounter(5)]] وبعدها [[inc().inc(3)]] بيطلّع [[value]] بـ 9 و [[[...c.history()]]] بـ [[[ 5, 6, 9 ]]]، و [[c.value = -1]] بيرمي والقيمة بتفضل 9.`, sol: R`~~~js counter.mjs
function makeCounter(start = 0) {
  const steps = [start];
  return {
    count: start,
    get value() { return this.count; },
    set value(v) {
      if (!Number.isInteger(v) || v < 0) throw new RangeError('العدّاد رقم صحيح موجب، وصلني ' + v);
      this.count = v;
      steps.push(v);
    },
    inc(step = 1) { this.value = this.count + step; return this; },
    *history() { yield* steps; },
  };
}
const c = makeCounter(5);
c.inc().inc(3);
console.log(c.value, [...c.history()]);
try { c.value = -1; } catch (e) { console.log(e.name, e.message); }
console.log(c.value, Object.keys(c));
~~~

~~~text الناتج (Node 24.22)
9 [ 5, 6, 9 ]
RangeError العدّاد رقم صحيح موجب، وصلني -1
9 [ 'count', 'value', 'inc', 'history' ]
~~~

**الشرح:**

- [[inc]] مبتكتبش في [[count]] مباشرة، بتكتب في [[this.value]]، فالتحقق اللي في الـ setter بيشتغل على كل الطرق. لو كتبت [[this.count += step]] كان الـ history هيفضل [[[5]]].
- الـ getter والـ setter ليهم **نفس الاسم** [[value]] وده خاصية واحدة (accessor property) مش اتنين، عشان كده [[Object.keys]] طلّع [[value]] مرة واحدة.
- [[steps]] برّه الـ object (closure)، فمحدش يقدر يعدّل الـ history من برّه. و [[yield*]] بيسلّم القيم واحدة واحدة.
- الغلطة اللي ناس كتير بتقع فيها: setter بيكتب في نفس اسمه ([[set value(v) { this.value = v; }]]) فبينادي نفسه للأبد ويطلع [[RangeError: Maximum call stack size exceeded]]. عشان كده التخزين في [[count]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الملف ده مش بيشتغل خالص. شغّله، اقرا الـ error، وصلّحه من غير ما تغيّر الـ [[__proto__]] ولا تشيل [[super]]:

~~~js
const base = { describe() { return 'منتج'; } };
const item = {
  __proto__: base,
  sku: 'A-7',
  describe: function () { return super.describe() + ' رقم ' + this.sku; },
};
console.log(item.describe());
~~~`, done: R`الملف بيطبع [[منتج رقم A-7]]، وتقدر تقول ليه [[function ()]] مينفعش فيها [[super]].`, sol: R`الـ error قبل ما أي سطر يشتغل:

~~~text الناتج
  describe: function () { return super.describe() + ' رقم ' + this.sku; },
                                 ^^^^^

SyntaxError: 'super' keyword unexpected here
~~~

الحل: اكتبها **method definition** بدل property قيمتها function:

~~~js fix-super.mjs
const base = { describe() { return 'منتج'; } };
const item = {
  __proto__: base,
  sku: 'A-7',
  describe() { return super.describe() + ' رقم ' + this.sku; },
};
console.log(item.describe());
~~~

~~~text الناتج (Node 24.22)
منتج رقم A-7
~~~

**ليه:** الـ method المكتوبة بالشكل المختصر بتتربط وقت الإنشاء بالـ object اللي اتكتبت فيه (اسمها في المواصفات [[HomeObject]])، و [[super]] معناها «الـ prototype بتاع الـ HomeObject». الـ [[function ()]] العادية ملهاش HomeObject، فالـ parser بيرفض [[super]] جواها. ودا من الفروق اللي بتخلي [[m() {}]] مش مجرد اختصار لـ [[m: function () {}]].` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[getPath(obj, path)]] بتقرا قيمة متداخلة بمسار نصي زي [['items[0].sku']] أو [['customer.name']] أو [['ship-to.city']]، وترجّع [[undefined]] (من غير error) لو أي حتة في النص مش موجودة. المسار الفاضي بيرجّع الـ object نفسه.`, done: R`[[getPath(order, 'items[0].sku')]] و [[getPath(order, 'items.0.sku')]] بيرجّعوا نفس القيمة، و [['ship-to.city']] شغالة، و [['a.b.c']] و [['items[5].sku']] بيرجّعوا [[undefined]]، و [[getPath({ x: 0 }, 'x')]] بيرجّع [[0]] مش [[undefined]]، وتمرين «شغّل واختبر» عدّى.`, sol: R`~~~js get-path.mjs
function getPath(obj, path) {
  const keys = path.match(/[^.[\]]+/g) ?? [];
  let cur = obj;
  for (const key of keys) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[key];
  }
  return cur;
}
const order = { customer: { name: 'Sara' }, items: [{ sku: 'A-7', qty: 2 }], 'ship-to': { city: 'Giza' } };
console.log(getPath(order, 'customer.name'));
console.log(getPath(order, 'items[0].sku'), getPath(order, 'items.0.qty'));
console.log(getPath(order, 'ship-to.city'), getPath(order, 'items[5].sku'), getPath(order, 'a.b.c'));
console.log(getPath({ x: 0 }, 'x'), getPath({ x: null }, 'x.y'));
~~~

~~~text الناتج (Node 24.22)
Sara
A-7 2
Giza undefined undefined
0 undefined
~~~

**الشرح:**

- الـ regex اللي في أول سطر في الدالة بيطلّع كل حتة مش نقطة ولا قوس، فـ [['items[0].sku']] بتبقى [[[ 'items', '0', 'sku' ]]]. و [[?? []]] عشان [[match]] بترجّع [[null]] مع النص الفاضي.
- [[cur[key]]] هو الـ bracket notation: بيقبل أي نص حتى [['ship-to']] اللي مينفعش بالنقطة، و [['0']] نص بس بيقرا الـ array عادي لأن مفاتيح الـ array نفسها نصوص.
- الفحص [[cur === null || cur === undefined]] قبل القراية هو اللي [[?.]] بيعمله. ومينفعش تكتب [[if (!cur)]]: كانت هتوقف عند [[0]] و [[""]] وترجّع [[undefined]] غلط.` },
          ],
          check: { lang: "js", starter: R`function getPath(obj, path) {
  // قسّم المسار لمفاتيح، وامشي مفتاح مفتاح، ورجّع undefined لو وقفت
}`, tests: R`const order = { customer: { name: 'Sara' }, items: [{ sku: 'A-7', qty: 2 }], 'ship-to': { city: 'Giza' } };
test("نقط", () => expect(getPath(order, 'customer.name')).toBe('Sara'));
test("أقواس", () => expect(getPath(order, 'items[0].sku')).toBe('A-7'));
test("رقم بالنقطة", () => expect(getPath(order, 'items.0.qty')).toBe(2));
test("مفتاح فيه شرطة", () => expect(getPath(order, 'ship-to.city')).toBe('Giza'));
test("مش موجود", () => expect(getPath(order, 'a.b.c')).toBe(undefined));
test("index برّه الـ array", () => expect(getPath(order, 'items[5].sku')).toBe(undefined));
test("صفر مش undefined", () => expect(getPath({ x: 0 }, 'x')).toBe(0));
test("null في النص", () => expect(getPath({ x: null }, 'x.y')).toBe(undefined));
test("مسار فاضي", () => expect(getPath(order, '')).toBe(order));`, solution: R`function getPath(obj, path) {
  const keys = path.match(/[^.[\]]+/g) ?? [];
  let cur = obj;
  for (const key of keys) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[key];
  }
  return cur;
}` },
          flag: "script",
          deep: {
            why: R`أغلب الكود اللي هتقراه في مكتبات و frameworks مكتوب بالأشكال دي: Vue options فيها methods و [[computed]] getters، و [[ [Symbol.iterator]() ]] بيخلي أي object يتلف عليه، و [[async load()]] جوه object خدمات. ولو مش فاهم إن [[m() {}]] و [[m: function () {}]] مختلفين، هتتلخبط لما [[super]] أو [[new]] يتصرّفوا بشكل مختلف. وموضوع تحويل المفاتيح لنص هو سبب باجات «كل اليوزرز ظهروا تحت نفس المفتاح».`,
            how: R`الـ parser بيقرا الـ literal من فوق لتحت، وكل سطر بيعرّف خاصية بالترتيب: المفتاح المحسوب [[[expr]]] بيتحسب الأول وبعده القيمة (اتجرّب: ترتيب الحساب طلع [[[ 'k1', 'v1', 'k2', 'v2' ]]]). والمفتاح بيعدّي على عملية اسمها ToPropertyKey: لو Symbol يفضل Symbol، وأي حاجة تانية بتتحوّل لنص بـ [[String()]].

الـ method definition بتعمل دالة ليها [[HomeObject]] (عشان [[super]])، ومن غير [[prototype]] ومش constructor: [[new item.describe()]] رمت [[TypeError: o.describe is not a constructor]]. و [[get x() {}]] و [[set x(v) {}]] بيعملوا **خاصية واحدة** نوعها accessor فيها دالتين بدل قيمة (درس «property descriptors»).

و [[__proto__: value]] حالة خاصة في الـ literal: لو القيمة object أو [[null]] بتبقى الـ prototype، ولو رقم أو نص بتتجاهل. ولو كتبتها computed ([[['__proto__']: x]]) أو shorthand ([[{ __proto__ }]]) بتبقى خاصية عادية اسمها [["__proto__"]] (اتجرّبت: [[Object.keys]] طلّعت [[[ '__proto__' ]]]).`,
            when: R`الـ shorthand في أي object بتبنيه من متغيرات بنفس الأسامي (رد API، أو props). الـ computed لما اسم المفتاح جاي من متغير أو من Symbol. الـ method definition لأي دالة جوه object، إلا لو محتاجها arrow عشان [[this]] بتاع اللي برّه. الـ getter لقيمة محسوبة من خصايص تانية ([[total]])، والـ setter لما الكتابة محتاجة تحقق. و [[__proto__]] في الـ literal بس لما عايز object صغير يورث من object تاني من غير class، وفي الكود الكبير [[class]] أوضح. والـ bracket notation لما المفتاح متغير أو فيه حروف مش مسموحة في الاسم.`,
            mistakes: R`- تكتب [[obj.key]] وانت قاصد المتغير [[key]]: النقطة دايمًا بتقرا خاصية اسمها حرفيًا «key». المتغير محتاج [[obj[key] ]].
- تستخدم object كقاموس مفاتيحه objects: كلهم بيبقوا [["[object Object]"]].
- getter بـ parameter أو setter من غير parameter: SyntaxError قبل التشغيل ([[Getter must not have any formal parameters.]] و [[Setter must have exactly one formal parameter.]]).
- [[__proto__]] مرتين في نفس الـ literal: [[SyntaxError: Duplicate __proto__ fields are not allowed in object literals]]. بس مفتاح عادي مكرر مبيرميش: [[{ a: 1, a: 2 }]] بيطلع [[{ a: 2 }]] من غير ولا كلمة.
- [[5.toString()]]: الـ parser بيفتكر النقطة علامة عشرية. اكتب [[(5).toString()]] أو [[5..toString()]].
- arrow function كـ method وانت محتاج [[this]] بتاع الـ object (درس «arrow و this»).`,
          },
          teach: R`## الفكرة في سطرين

الـ object literal مش بس [[key: value]]. فيه ٨ أشكال للتعريف، وكل واحد بيعمل حاجة مختلفة من جوه. وقراية الخاصية ليها شكلين (property accessors)، والاتنين بيحوّلوا المفتاح لنص. كل اللي تحت اتشغّل على ويندوز ١١ بـ Node 24.22 كملفات [[.mjs]] (يعني strict mode)، والناتج منسوخ زي ما طلع.

---

## ١. shorthand properties و computed keys

~~~js
const sku = 'A-7';
const qty = 3;
const field = 'price';
const item = { sku, qty, [field]: 120, [field + 'WithTax']: 136.8 };
~~~

| الشكل | معناه | المفتاح اللي اتعمل |
|---|---|---|
| [[sku,]] | shorthand property: اسم المتغير بقى المفتاح وقيمته بقت القيمة، يعني [[sku: sku]] | [["sku"]] |
| [[[field]: 120]] | computed key: اللي بين الأقواس المربعة expression بيتحسب، وناتجه هو المفتاح | [["price"]] |
| [[[field + 'WithTax']: ...]] | أي expression ينفع، حتى نداء دالة | [["priceWithTax"]] |
| [[[Symbol.iterator]() {}]] | computed key من نوع Symbol، وبيفضل Symbol مش نص | [[Symbol(Symbol.iterator)]] |

الترتيب: كل مفتاح محسوب بيتحسب، وبعده قيمته، وبعدين اللي بعده. اتجرّب بـ [[order.push]] جوه المفاتيح والقيم وطلع [[[ 'k1', 'v1', 'k2', 'v2' ]]].

---

## ٢. method definitions: الـ method بالشكل المختصر

~~~js
describe() { return super.describe() + ' ' + this.sku; },
async stock() { return 12; },
*lines() { yield this.sku; yield this.qty; },
~~~

الـ method definition هي [[name() {}]] جوه الـ object. وليها ٤ أشكال: عادية، و [[async name() {}]] بترجّع Promise، و [[*name() {}]] generator، و [[async *name() {}]] async generator. ومعاهم الاسم ممكن يبقى computed: [[[key]() {}]].

**الفرق بينها وبين [[name: function () {}]]** (اتجرّب):

~~~js
const o = { describe() { return 1; }, old: function () { return 2; }, arrow: () => 3 };
try { new o.describe(); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
console.log(typeof new o.old(), 'prototype' in o.describe, 'prototype' in o.old);
~~~

~~~text الناتج
TypeError: o.describe is not a constructor
object false true
~~~

| الحاجة | [[m() {}]] | [[m: function () {}]] | [[m: () => {}]] |
|---|---|---|---|
| [[super]] جواها | شغالة | [[SyntaxError: 'super' keyword unexpected here]] | نفس الـ SyntaxError |
| [[new o.m()]] | [[TypeError: ... is not a constructor]] | بيشتغل | [[TypeError]] |
| ليها [[prototype]] | لأ | أيوه | لأ |
| [[this]] | الـ object اللي قبل النقطة | الـ object اللي قبل النقطة | [[this]] بتاع اللي برّه |
| [[name]] | [["describe"]] | [["old"]] (بتتاخد من المفتاح) | [["arrow"]] |

يعني الـ method definition مش اختصار وبس: هي دالة «method» بجد، مربوطة بالـ object اللي اتكتبت فيه (عشان [[super]])، ومش بتنفع [[new]].

---

## ٣. [[get]] و [[set]]: خاصية بتتحسب

~~~js
get total() { return this.price * this.qty; },
set total(v) { this.qty = Math.round(v / this.price); },
~~~

- [[item.total]] من غير أقواس بينادي الـ getter: [[120 * 3 = 360]].
- [[item.total = 600]] بينادي الـ setter بـ [[v = 600]]، فـ [[qty]] بقت [[Math.round(600 / 120) = 5]].
- الاتنين **خاصية واحدة** اسمها [[total]]، وظهرت في [[Object.keys]] زي أي خاصية.
- الـ getter مينفعش ياخد parameter، والـ setter لازم ياخد واحد بالظبط. ده SyntaxError قبل التشغيل:

~~~text الناتج
SyntaxError: Getter must not have any formal parameters.
SyntaxError: Setter must have exactly one formal parameter.
~~~

وتقدر تعمل getter من غير setter (خاصية للقراية بس): الكتابة عليها في strict mode بترمي [[TypeError: Cannot set property only of #<Object> which has only a getter]].

---

## ٤. [[__proto__]] جوه الـ literal

~~~js
const base = { describe() { return 'منتج'; } };
const item = { __proto__: base, sku };
~~~

[[__proto__: base]] جوه الـ literal بيخلّي [[base]] هو الـ prototype بتاع [[item]]، فـ [[super.describe()]] بتلاقي [[describe]] بتاعة [[base]]، و [[Object.getPrototypeOf(item) === base]] طلعت [[true]]. وده شكل في المواصفات نفسها (مش زي [[obj.__proto__]] القديمة اللي على [[Object.prototype]]).

| اللي كتبته | النتيجة (اتجرّبت) |
|---|---|
| [[{ __proto__: base }]] | الـ prototype بقى [[base]] |
| [[{ __proto__: null }]] | object من غير prototype خالص، و [['toString' in o]] بـ [[false]] |
| [[{ __proto__: 5 }]] | القيمة اتجاهلت والـ prototype فضل [[Object.prototype]] |
| [[{ ['__proto__']: x }]] | خاصية عادية اسمها [["__proto__"]]، مش prototype |
| [[{ __proto__ }]] (shorthand) | برضه خاصية عادية |
| [[{ __proto__: a, __proto__: b }]] | [[SyntaxError: Duplicate __proto__ fields are not allowed in object literals]] |

---

## ٥. property accessors: النقطة ولا الأقواس

~~~js
console.log(item.total, item['priceWithTax'], item.describe());
~~~

| الشكل | المفتاح | ينفع إمتى |
|---|---|---|
| [[obj.name]] (dot notation) | الكلمة اللي بعد النقطة حرفيًا | الاسم identifier: حروف وأرقام و [[_]] و [[$]] ومبيبدأش برقم. الكلمات المحجوزة مسموحة: [[r.class]] و [[r.delete]] و [[r.if]] اشتغلوا |
| [[ obj[expr] ]] (bracket notation) | ناتج الـ expression بعد ما يتحوّل لنص (أو يفضل Symbol) | المفتاح في متغير، أو فيه شرطة أو مسافة ([[ r['first-name'] ]])، أو رقم، أو Symbol |
| [[obj?.name]] و [[ obj?.[expr] ]] و [[obj.fn?.()]] | زي اللي فوق | لو اللي قبل [[?.]] ممكن يبقى [[null]] أو [[undefined]] (درس «object literal»، قسم [[?.]]) |

**المفتاح دايمًا بيتحوّل لنص** (إلا الـ Symbol):

~~~js
const k = {};
k[1] = 'a'; k[{}] = 'b'; k[[1, 2]] = 'c'; k[true] = 'd'; k[null] = 'e';
console.log(Object.keys(k));
~~~

~~~text الناتج
[ '1', '[object Object]', '1,2', 'true', 'null' ]
~~~

وعشان كده [[ r[2] ]] و [[ r['2'] ]] نفس القيمة، و [[o.1]] مينفعش ([[SyntaxError: Unexpected number]]) لأن [[1]] مش identifier.

---

## ٦. المثال كله

~~~text الناتج (node literal.mjs)
360 136.8 منتج A-7
5 [ 'A-7', 5 ]
true [
  'sku',
  'qty',
  'price',
  'priceWithTax',
  'total',
  'describe',
  'stock',
  'lines'
]
stock 12
~~~

لاحظ إن [[stock 12]] اتطبع **آخر حاجة** مع إن سطره قبل آخر سطر: الـ [[async]] method بترجّع Promise، و [[then]] بيستنى لما الكود العادي يخلص (درس «microtasks و macrotasks»). ولاحظ إن [[base]] و [[describe]] بتاعتها مش في [[Object.keys]]: دي موروثة مش own (درس «enumerability و ownership»).

---

## الخلاصة

- [[{ sku }]] = [[{ sku: sku }]]، و [[{ [expr]: v }]] المفتاح بيتحسب.
- [[m() {}]] مش [[m: function () {}]]: الأولى فيها [[super]] ومش constructor.
- [[get]] و [[set]] خاصية واحدة؛ الـ getter من غير parameter والـ setter بواحد.
- [[__proto__: obj]] في الـ literal بيحدد الـ prototype، والـ computed منه خاصية عادية.
- [[obj.x]] للاسم الثابت، و [[ obj[x] ]] لأي حاجة تانية، وكل مفتاح بيبقى نص إلا الـ Symbol.`,
          lines: [
            R`متغير نصي بنفس اسم الخاصية اللي عايزينها، عشان نستخدمه shorthand تحت.`,
            R`الكمية في متغير بنفس الاسم برضه. الـ shorthand محتاج المتغير يبقى اسمه هو اسم المفتاح بالظبط.`,
            R`اسم المفتاح نفسه جوه متغير ([['price']]). ده اللي هيتحسب في الـ computed key تحت.`,
            R`object صغير فيه method هيبقى الـ prototype بتاع المنتج، عشان نجرّب [[__proto__]] و [[super]].`,
            R`بداية الـ object literal. كل سطر جواه بيعرّف خاصية بالترتيب من فوق لتحت.`,
            R`[[__proto__: base]] جوه الـ literal بيخلّي [[base]] هو الـ prototype، مش خاصية اسمها [[__proto__]].`,
            R`shorthand property: [[sku]] لوحدها = [[sku: sku]]، فالمفتاح [["sku"]] وقيمته [['A-7']].`,
            R`shorthand تاني: المفتاح [["qty"]] وقيمته 3.`,
            R`computed key: [[[field]]] بيتحسب وقت الإنشاء فبيبقى [["price"]]، وقيمته 120.`,
            R`computed key بـ expression كامل: [[field + 'WithTax']] = [["priceWithTax"]]. أي كود ينفع بين الأقواس المربعة.`,
            R`getter: [[item.total]] من غير أقواس بينادي الدالة دي وبيرجّع السعر في الكمية. مش بياخد parameters.`,
            R`setter بنفس الاسم: [[item.total = 600]] بينادي الدالة دي بـ [[v = 600]] ويحسب الكمية من الإجمالي. الاتنين خاصية واحدة.`,
            R`method definition فيها [[super]]: بتنادي [[describe]] بتاعة الـ prototype ([[base]]) وتزوّد عليها الكود. [[super]] بتشتغل هنا بس، مش في [[function ()]].`,
            R`async method: بترجّع Promise دايمًا حتى لو القيمة جاهزة. شكلها [[async اسم() {}]].`,
            R`generator method: النجمة قبل الاسم، وكل [[yield]] بيطلّع قيمة لما حد يلف عليها.`,
            R`قفلة الـ object. الفاصلة بعد آخر خاصية مسموحة (trailing comma) وبتخلي إضافة سطر جديد diff بسطر واحد.`,
            R`تلات قرايات: [[item.total]] (getter = 360)، و [[item['priceWithTax']]] بالأقواس (136.8)، و [[item.describe()]] اللي بتطبع «منتج A-7».`,
            R`كتابة على الـ setter: [[qty]] بقت [[Math.round(600 / 120)]] = 5.`,
            R`[[qty]] بقت 5، و [[[...item.lines()]]] لف على الـ generator وجمّع القيمتين في array: [[[ 'A-7', 5 ]]].`,
            R`[[stock()]] بترجّع Promise، و [[then]] بيطبع «stock 12» بعد ما كل السطور العادية تخلص، عشان كده بيظهر آخر الناتج.`,
            R`الـ prototype هو [[base]] فعلًا ([[true]])، و [[Object.keys]] طلّع الـ ٨ خصايص اللي اتكتبت في الـ literal بالترتيب، ومن ضمنهم [[total]] مرة واحدة، ومفيش [[__proto__]].`,
          ],
          ref: [
            { t: "MDN: Object initializer (shorthand و computed و __proto__)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer" },
            { t: "MDN: Method definitions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions" },
            { t: "MDN: Property accessors", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors" },
            { t: "MDN: Lexical grammar (shorthand object literals)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar" },
            { t: "MDN: get", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get" },
            { t: "MDN: set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set" },
            { t: "ECMAScript: Object Initializer", url: "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-object-initializer" },
            { t: "ECMAScript: Method Definitions", url: "https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-method-definitions" }
          ],
          pre: ["js/object literal", { to: "js/this", why: R`[[this]] جوه الـ method والـ getter هو الـ object اللي قبل النقطة` }, { to: "js/iterators و generators", why: R`الـ generator method و [[yield]] و [[yield*]]` }]
        },
        {
          cmd: "property descriptors: Object.defineProperty",
          title: "كل خاصية ليها ٣ مفاتيح مخفية: writable و enumerable و configurable. تشوفهم وتغيّرهم إزاي؟",
          desc: R`كل خاصية في أي object مش قيمة وبس: معاها **descriptor** فيه ٣ إعدادات: [[writable]] (تتكتب؟)، و [[enumerable]] (تظهر في [[Object.keys]] و JSON و [[for...in]]؟)، و [[configurable]] (تتمسح أو إعداداتها تتغيّر؟). [[Object.getOwnPropertyDescriptor(obj, key)]] بيوريهم، و [[Object.defineProperty(obj, key, descriptor)]] بيعرّف خاصية بالإعدادات اللي انت عايزها.

الفخ الأشهر: الخاصية اللي بتتعمل عادي ([[obj.x = 1]] أو في الـ literal) التلاتة بتوعها [[true]]، بس اللي بتتعمل بـ [[defineProperty]] أي إعداد مكتبتهوش بيبقى [[false]]. فـ [[Object.defineProperty(o, 'id', { value: 501 })]] بتعمل خاصية مبتتكتبش، ومبتظهرش، ومبتتمسحش، ومن غير ما تقصد.

وفيه نوعين descriptors: **data** ([[value]] و [[writable]]) و **accessor** ([[get]] و [[set]])، ومينفعش تخلط الاتنين.`,
          example: R`// خاصية ليها إعدادات: قيمة، وتتكتب؟ وتظهر؟ وتتمسح؟
const product = { name: 'كوباية' };
Object.defineProperty(product, 'id', { value: 501 });
console.log(Object.getOwnPropertyDescriptor(product, 'name'));
console.log(Object.getOwnPropertyDescriptor(product, 'id'));
console.log(Object.keys(product), JSON.stringify(product), product.id);
try { product.id = 9; } catch (e) { console.log(e.message); }
try { delete product.id; } catch (e) { console.log(e.message); }
Object.defineProperties(product, {
  priceCents: { value: 4500, writable: true, enumerable: true },
  price: {
    get() { return this.priceCents / 100; },
    set(v) { this.priceCents = Math.round(v * 100); },
    enumerable: true,
  },
});
product.price = 52.5;
console.log(product.priceCents, product.price);
console.log(Object.getOwnPropertyDescriptors(product));
try { Object.defineProperty(product, 'id', { value: 1 }); } catch (e) { console.log(e.message); }`,
          try: R`في ملف [[desc.mjs]] اطبع [[Object.getOwnPropertyDescriptor([1, 2], 'length')]] و [[Object.getOwnPropertyDescriptor('hi', 'length')]] و descriptor الـ method [[open]] في [[class Box { open() {} }]] (من [[Box.prototype]]). أنهي فيهم [[enumerable]] و أنهي [[writable]]؟ وبعدين جرّب تعرّف خاصية فيها [[value]] و [[get]] مع بعض واقرا الـ error كله.`,
          sol: R`~~~js desc.mjs
console.log(Object.getOwnPropertyDescriptor([1, 2], 'length'));
console.log(Object.getOwnPropertyDescriptor('hi', 'length'));
class Box { open() {} }
console.log(Object.getOwnPropertyDescriptor(Box.prototype, 'open'));
try { Object.defineProperty({}, 'y', { value: 1, get() { return 2; } }); } catch (e) { console.log(e.constructor.name + ': ' + e.message); }
~~~

~~~text الناتج (Node 24.22)
{ value: 2, writable: true, enumerable: false, configurable: false }
{ value: 2, writable: false, enumerable: false, configurable: false }
{
  value: [Function: open],
  writable: true,
  enumerable: false,
  configurable: true
}
TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
~~~

- [[length]] بتاعة الـ array بتتكتب (عشان [[arr.length = 0]] بيفضّيها) بس مش enumerable، عشان كده [[for...in]] على array مبيطلّعش [["length"]].
- [[length]] بتاعة النص مبتتكتبش خالص: النصوص immutable.
- الـ methods اللي في [[class]] مش enumerable، وده الفرق بينها وبين method حطيتها بإيدك بـ [[Box.prototype.open = ...]] (دي enumerable وهتظهر في [[for...in]] على أي instance).
- الخلط بين data و accessor مرفوض: الخاصية يا إما ليها قيمة متخزنة، يا إما دالة بتحسبها.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** نفس الكود مرة في [[a.cjs]] (sloppy) ومرة في [[a.mjs]] (strict). اكتب الناتج في الحالتين قبل التشغيل:

~~~js
const o = {};
Object.defineProperty(o, 'x', { value: 1 });
o.x = 2;
console.log(o.x, Object.keys(o), JSON.stringify(o), delete o.x);
~~~`, done: R`توقّعت إن الـ cjs بيطبع [[1 [] {} false]] والـ mjs بيقع عند [[o.x = 2]]، وطلع كده.`, sol: R`~~~text الناتج: node a.cjs
1 [] {} false
~~~

~~~text الناتج: node a.mjs
o.x = 2;
    ^

TypeError: Cannot assign to read only property 'x' of object '#<Object>'
~~~

**ليه:** [[{ value: 1 }]] لوحدها = [[writable: false, enumerable: false, configurable: false]]. في الـ cjs (من غير [['use strict']]) الكتابة والمسح بيفشلوا **ساكتين**: [[o.x]] فضلت 1، و [[delete]] رجّعت [[false]]. وفي الـ mjs (ESM دايمًا strict) نفس الكتابة رمت [[TypeError]]. والخاصية مش ظاهرة في [[Object.keys]] ولا JSON لأنها مش enumerable.

الغلطة الشائعة: تفتكر الكود «شغال» لأن الـ cjs مرماش error، وهو أصلًا مكتبش حاجة.` },
            { lvl: 'تطبيق', t: R`**ابني:** دالتين: [[constant(obj, key, value)]] بتعمل خاصية ظاهرة بس مبتتكتبش ولا تتمسح، و [[hidden(obj, key, value)]] بتعمل خاصية بتتكتب بس مش ظاهرة في [[Object.keys]] ولا JSON. جرّبهم على فاتورة: [[currency]] ثابتة و [[_dbId]] مخفية.`, done: R`[[JSON.stringify(invoice)]] فيه [[currency]] ومفيهوش [[_dbId]]، و [[invoice._dbId]] بيتقري ويتكتب عادي، و [[invoice.currency = 'USD']] بيرمي في الـ mjs.`, sol: R`~~~js invoice.mjs
function constant(obj, key, value) {
  return Object.defineProperty(obj, key, { value, enumerable: true, writable: false, configurable: false });
}
function hidden(obj, key, value) {
  return Object.defineProperty(obj, key, { value, enumerable: false, writable: true, configurable: true });
}
const invoice = { total: 250 };
constant(invoice, 'currency', 'EGP');
hidden(invoice, '_dbId', 9812);
console.log(invoice, JSON.stringify(invoice), invoice._dbId);
try { invoice.currency = 'USD'; } catch (e) { console.log(e.message); }
invoice._dbId = 1;
console.log(invoice._dbId, Object.keys(invoice));
~~~

~~~text الناتج (Node 24.22)
{ total: 250, currency: 'EGP' } {"total":250,"currency":"EGP"} 9812
Cannot assign to read only property 'currency' of object '#<Object>'
1 [ 'total', 'currency' ]
~~~

**الشرح:** كتبت التلات إعدادات صراحة في الاتنين حتى اللي قيمته [[false]] (ومكانش لازم)، عشان اللي يقرا الكود يعرف إنها مقصودة. و [[defineProperty]] بترجّع الـ object نفسه، فالدالتين بيرجّعوه كمان. و [[console.log]] في Node مبيعرضش الخصايص اللي مش enumerable، عشان كده [[_dbId]] مش في السطر الأول مع إنها موجودة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زميلك كتب ده عشان «يضيف [[role]] بطريقة احترافية»، والـ API بقى بيرجّع اليوزر من غير [[role]]، والأدمن مش قادر يغيّرها. لاقي السبب وصلّحه بسطر واحد:

~~~js
const user = { name: 'Sara' };
Object.defineProperty(user, 'role', { value: 'admin' });
console.log(Object.keys(user), JSON.stringify(user));
user.role = 'editor';
~~~`, done: R`[[Object.keys(user)]] فيه [[role]]، و JSON فيه [["role":"admin"]]، و [[user.role = 'editor']] بيشتغل في strict mode.`, sol: R`قبل التصليح (في [[.mjs]]):

~~~text الناتج
[ 'name' ] {"name":"Sara"}
Cannot assign to read only property 'role' of object '#<Object>'
~~~

ده الـ defaults trap: [[{ value: 'admin' }]] لوحدها خلّت التلاتة [[false]]. التصليح إنك تكتب الإعدادات صراحة (أو تكتب [[user.role = 'admin']] عادي وخلاص، لو مش محتاج أي إعداد مختلف):

~~~js role.mjs
const user = { name: 'Sara' };
Object.defineProperty(user, 'role', { value: 'admin', writable: true, enumerable: true, configurable: true });
console.log(Object.keys(user), JSON.stringify(user));
user.role = 'editor';
console.log(user.role);
~~~

~~~text الناتج (Node 24.22)
[ 'name', 'role' ] {"name":"Sara","role":"admin"}
editor
~~~

**القاعدة:** [[defineProperty]] تستخدمها لما عايز إعداد **مختلف** عن العادي. لو كلهم [[true]] الإسناد العادي أوضح.` },
            { lvl: 'تحدي', t: R`**قارن:** object فيه array [[items]] و getter [[total]] بيجمعها. انسخه ٣ مرات: بـ [[{ ...cart }]]، و بـ [[Object.assign({}, cart)]]، و بـ [[Object.defineProperties({}, Object.getOwnPropertyDescriptors(cart))]]. بعد ما تزوّد عنصر في [[cart.items]]، اطبع [[total]] من التلات نسخ و descriptor [[total]] في أول وآخر نسخة.`, done: R`أول نسختين طلّعوا الإجمالي القديم و descriptor فيه [[value]]، والتالتة طلّعت الإجمالي الجديد و descriptor فيه [[get]]، وتقدر تقول ليه.`, sol: R`~~~js copy-getter.mjs
const cart = {
  items: [120, 80],
  get total() { return this.items.reduce((a, b) => a + b, 0); },
};
const bySpread = { ...cart };
const byAssign = Object.assign({}, cart);
const exact = Object.defineProperties({}, Object.getOwnPropertyDescriptors(cart));
cart.items.push(50);
console.log(bySpread.total, byAssign.total, exact.total);
console.log(Object.getOwnPropertyDescriptor(bySpread, 'total'));
console.log(Object.getOwnPropertyDescriptor(exact, 'total'));
~~~

~~~text الناتج (Node 24.22)
200 200 250
{ value: 200, writable: true, enumerable: true, configurable: true }
{
  get: [Function: get total],
  set: undefined,
  enumerable: true,
  configurable: true
}
~~~

**الشرح:** الـ spread و [[Object.assign]] بيعملوا **قراية** لكل خاصية ([[cart.total]] = 200 وقتها) ويكتبوا الناتج كقيمة عادية. فالـ getter اتشغّل مرة واتنسى. لكن [[getOwnPropertyDescriptors]] بيرجّع الـ descriptors نفسها، و [[defineProperties]] بيعرّفها زي ما هي، فالـ getter فضل getter. ولاحظ إن [[items]] نفس الـ array في التلاتة (النسخ سطحي)، عشان كده [[exact.total]] شاف الـ 50.

ده نفس سبب إن [[{ ...obj }]] بيضيّع الـ getters والخصايص المخفية والإعدادات، والطريقة الكاملة للنسخ «زي ما هو» هي الزوج ده.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[describeProps(obj)]] بترجّع array نصوص زي [['name: wec']] لكل خاصية own (من [[Object.getOwnPropertyNames]]): أول حرف [[w]] لو writable و [[a]] لو accessor و [[-]] لو مبتتكتبش، وبعده [[e]] أو [[-]]، وبعده [[c]] أو [[-]].`, done: R`[[describeProps([10])]] بيرجّع [[[ '0: wec', 'length: w--' ]]]، و object متجمّد فيه [[a]] بيرجّع [[[ 'a: -e-' ]]]، وتمرين «شغّل واختبر» عدّى.`, sol: R`~~~js describe-props.mjs
function describeProps(obj) {
  return Object.getOwnPropertyNames(obj).map((key) => {
    const d = Object.getOwnPropertyDescriptor(obj, key);
    const w = 'get' in d || 'set' in d ? 'a' : d.writable ? 'w' : '-';
    return key + ': ' + w + (d.enumerable ? 'e' : '-') + (d.configurable ? 'c' : '-');
  });
}
const o = { name: 'Sara', get full() { return this.name; } };
Object.defineProperty(o, 'id', { value: 1 });
console.log(describeProps(o));
console.log(describeProps([10]));
console.log(describeProps(Object.freeze({ a: 1 })));
~~~

~~~text الناتج (Node 24.22)
[ 'name: wec', 'full: aec', 'id: ---' ]
[ '0: wec', 'length: w--' ]
[ 'a: -e-' ]
~~~

**الشرح:** الـ accessor descriptor مفيهوش [[writable]] أصلًا، فلازم تفحص [[get]] أو [[set]] الأول بـ [[in]] (مش [[d.get]]، لأن [[set: undefined]] موجودة كمفتاح). و [[getOwnPropertyNames]] مش [[Object.keys]] عشان الخصايص المخفية ([[id]] و [[length]]) تظهر. والـ freeze خلّى [[a]] مبتتكتبش ولا configurable، بس فضلت enumerable.` },
          ],
          check: { lang: "js", starter: R`function describeProps(obj) {
  // لكل اسم من Object.getOwnPropertyNames: "اسم: " + (w أو a أو -) + (e أو -) + (c أو -)
}`, tests: R`test("خاصية عادية", () => expect(describeProps({ a: 1 })).toEqual(['a: wec']));
test("getter", () => expect(describeProps({ get g() { return 1; } })).toEqual(['g: aec']));
test("defineProperty بالـ defaults", () => { const o = {}; Object.defineProperty(o, 'id', { value: 1 }); expect(describeProps(o)).toEqual(['id: ---']); });
test("array", () => expect(describeProps([10])).toEqual(['0: wec', 'length: w--']));
test("freeze", () => expect(describeProps(Object.freeze({ a: 1 }))).toEqual(['a: -e-']));
test("فاضي", () => expect(describeProps({})).toEqual([]));`, solution: R`function describeProps(obj) {
  return Object.getOwnPropertyNames(obj).map((key) => {
    const d = Object.getOwnPropertyDescriptor(obj, key);
    const w = 'get' in d || 'set' in d ? 'a' : d.writable ? 'w' : '-';
    return key + ': ' + w + (d.enumerable ? 'e' : '-') + (d.configurable ? 'c' : '-');
  });
}` },
          flag: "script",
          deep: {
            why: R`كل الحاجات اللي بتشوفها «سحر» في JavaScript مبنية على الإعدادات دي: ليه [[length]] مش بتظهر في [[for...in]]، وليه methods الـ class مش في [[Object.keys]]، وليه [[Math.PI = 3]] مبيعملش حاجة، وإزاي [[Object.freeze]] شغالة (بتخلّي كل خاصية [[writable: false, configurable: false]]). و Vue 2 كلها كانت مبنية على [[defineProperty]] بـ getter و setter لكل خاصية. ولما تعرفها تقدر تعمل ثوابت حقيقية، وخصايص داخلية متطلعش في JSON، و lazy getters.`,
            how: R`المحرك بيخزّن كل خاصية كسجل فيه المفتاح ومعاه إما Value و Writable، أو Get و Set، ومعاهم في الحالتين Enumerable و Configurable (دي أسامي الخانات في المواصفات، و [[getOwnPropertyDescriptor]] بيرجّعها بحروف صغيرة).

- الإسناد العادي [[o.x = v]]: لو الخاصية مش موجودة بيعملها بالتلاتة [[true]]، ولو موجودة و [[writable: false]] بيفشل (ساكت في sloppy، و [[TypeError]] في strict).
- [[defineProperty]]: لو الخاصية **جديدة** أي إعداد مش مكتوب بيبقى [[false]] (أو [[undefined]] للقيمة والدوال)، ولو **موجودة** بيغيّر اللي كتبته بس ويسيب الباقي. اتجرّب: [[Object.defineProperty(a, 'x', { enumerable: false })]] على خاصية عادية سابت [[writable: true]] و [[configurable: true]].
- [[configurable: false]] قفل نهائي: مينفعش تمسح، ولا تغيّر [[enumerable]]، ولا تحوّل data لـ accessor. الاستثناء الوحيد: [[writable]] ينفع تقلبها من [[true]] لـ [[false]] (مش العكس)، والقيمة تتغيّر طول ما [[writable: true]]. اتجرّب: [[value]] اتغيّرت لـ 2 وبعدها [[writable: false]] عدّت، ورجوعها [[true]] رمى [[Cannot redefine property: v]].
- والخاصية الموروثة اللي [[writable: false]] بتمنع الكتابة على الابن كمان: [[child.kind = 'x']] رمت [[Cannot assign to read only property 'kind']] مع إن [[child]] نفسه مفيهوش [[kind]]، والحل الوحيد إنك تعرّفها على الابن بـ [[defineProperty]].`,
            when: R`ثابت حقيقي على object ([[writable: false]]). خاصية داخلية مش عايزها في JSON أو [[Object.keys]] ([[enumerable: false]]) زي cache أو id من الداتابيز. getter محسوب بتضيفه على object موجود أو على prototype. نسخ object بالـ getters بتاعته (الزوج [[getOwnPropertyDescriptors]] و [[defineProperties]]). وفي الكود العادي اليومي: الإسناد العادي أوضح، و [[class]] بالـ [[#private]] و [[get]] أحسن من [[defineProperty]] على كل instance.`,
            mistakes: R`- الـ defaults trap: [[defineProperty(o, 'x', { value: 1 })]] تعمل خاصية مخفية ومبتتكتبش وانت مش واخد بالك.
- تخلط [[value]] مع [[get]]: [[TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>]].
- تعرّف خاصية [[configurable: false]] وبعدين تحاول تعدّلها: [[TypeError: Cannot redefine property: id]]، وده مالوش رجعة غير إنك تعمل object جديد.
- تفتكر [[delete]] نجح في sloppy mode: رجّع [[false]] ساكت. وفي strict: [[TypeError: Cannot delete property 'id' of #<Object>]].
- تنسخ object فيه getters بالـ spread وتتوقع الـ getter يفضل شغال.
- [[defineProperty]] على قيمة primitive: [[TypeError: Object.defineProperty called on non-object]].`,
          },
          teach: R`## الفكرة في سطرين

كل خاصية = مفتاح + descriptor. الـ descriptor فيه القيمة (أو getter و setter) و ٣ أذونات. انت كنت بتشوفهم كلهم [[true]] لأن الإسناد العادي بيعمل كده. كل الأمثلة اتشغّلت على Node 24.22 كملف [[.mjs]] (strict).

---

## ١. [[Object.getOwnPropertyDescriptor]]: شوف الإعدادات

~~~js
const product = { name: 'كوباية' };
console.log(Object.getOwnPropertyDescriptor(product, 'name'));
~~~

~~~text الناتج
{
  value: 'كوباية',
  writable: true,
  enumerable: true,
  configurable: true
}
~~~

| الإعداد | لو [[true]] | لو [[false]] |
|---|---|---|
| [[value]] | القيمة المتخزنة | (مش boolean) |
| [[writable]] | [[obj.x = v]] بتغيّرها | الكتابة بتفشل: ساكتة في sloppy، و [[TypeError]] في strict |
| [[enumerable]] | بتظهر في [[Object.keys]] و [[for...in]] و JSON والـ spread | مخفية عنهم، بس [[obj.x]] بتقراها عادي |
| [[configurable]] | تتمسح، وإعداداتها تتغيّر | مبتتمسحش، وإعداداتها مقفولة نهائيًا (إلا [[writable]] من [[true]] لـ [[false]]) |

ولو الخاصية مش موجودة أو موروثة، [[getOwnPropertyDescriptor]] بيرجّع [[undefined]]: جرّبت [['nope']] و [['toString']] على object عادي والاتنين [[undefined]]. الكلمة Own في الاسم معناها «بتاعته هو بس».

---

## ٢. [[Object.defineProperty]] والـ defaults

~~~js
Object.defineProperty(product, 'id', { value: 501 });
console.log(Object.getOwnPropertyDescriptor(product, 'id'));
console.log(Object.keys(product), JSON.stringify(product), product.id);
~~~

~~~text الناتج
{ value: 501, writable: false, enumerable: false, configurable: false }
[ 'name' ] {"name":"كوباية"} 501
~~~

كتبنا [[value]] بس، والتلات أذونات بقوا [[false]]. [[id]] موجودة وبتتقري (501)، بس مش ظاهرة في [[Object.keys]] ولا JSON. وكمان:

~~~text الناتج
Cannot assign to read only property 'id' of object '#<Object>'
Cannot delete property 'id' of #<Object>
~~~

| بتعمل الخاصية إزاي | الأذونات |
|---|---|
| [[obj.x = 1]] أو [[{ x: 1 }]] | التلاتة [[true]]: بتتكتب وتظهر وتتمسح |
| [[Object.defineProperty(obj, 'x', { value: 1 })]] (خاصية جديدة) | التلاتة [[false]]: أي إذن مكتبتهوش بيتقفل |
| [[defineProperty]] على خاصية موجودة | اللي كتبته بس بيتغيّر، والباقي بيفضل زي ما هو |
| method في [[class]] | [[writable: true, enumerable: false, configurable: true]] |

---

## ٣. [[Object.defineProperties]]: كذا خاصية مرة واحدة

~~~js
Object.defineProperties(product, {
  priceCents: { value: 4500, writable: true, enumerable: true },
  price: {
    get() { return this.priceCents / 100; },
    set(v) { this.priceCents = Math.round(v * 100); },
    enumerable: true,
  },
});
product.price = 52.5;
console.log(product.priceCents, product.price);
~~~

~~~text الناتج
5250 52.5
~~~

التاني argument object: كل مفتاح فيه اسم خاصية، وقيمته الـ descriptor بتاعها. [[priceCents]] **data descriptor** (قيمة)، و [[price]] **accessor descriptor** ([[get]] و [[set]] بدل [[value]] و [[writable]]). الفكرة: نخزّن الفلوس قروش (integer) ونعرضها جنيهات، فـ [[52.5]] اتخزنت [[5250]] من غير كسور.

| النوع | مفاتيحه | مينفعش معاه |
|---|---|---|
| data descriptor | [[value]] و [[writable]] و [[enumerable]] و [[configurable]] | [[get]] و [[set]] |
| accessor descriptor | [[get]] و [[set]] و [[enumerable]] و [[configurable]] | [[value]] و [[writable]] |

الخلط بيرمي: [[TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>]].

---

## ٤. [[Object.getOwnPropertyDescriptors]]: كل الإعدادات

~~~text الناتج (نفس اللي Node طبعه، متجمّع في سطور أقل)
  id: { value: 501, writable: false, enumerable: false, configurable: false },
  priceCents: { value: 5250, writable: true, enumerable: true, configurable: false },
  price: { get: [Function: get], set: [Function: set], enumerable: true, configurable: false }
~~~

لاحظ [[configurable: false]] في [[priceCents]] و [[price]]: محدّدناهاش في [[defineProperties]] فبقت [[false]]. والدالتين اسمهم [[get]] و [[set]] لأنهم method definitions جوه الـ descriptor. واستخدامه الأهم: نسخ object «زي ما هو»:

~~~js
const copy = Object.defineProperties({}, Object.getOwnPropertyDescriptors(src));
~~~

ده بينقل الـ getters كـ getters والخصايص المخفية مخفية، عكس [[{ ...src }]] اللي بيقرا كل قيمة ويكتبها عادي (اتجرّب: الـ spread طلّع [[Sara Ali]] بعد ما غيّرنا [[first]]، والنسخة بالـ descriptors طلّعت [[Mona Ali]]).

---

## ٥. [[configurable: false]] نهائي

~~~js
try { Object.defineProperty(product, 'id', { value: 1 }); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
Cannot redefine property: id
~~~

مفيش [[undefineProperty]]. الخاصية دي هتفضل كده طول عمر الـ object. عشان كده [[Math.PI]] و [[undefined]] و [[NaN]] على [[globalThis]] متعرّفين كده: محدش يقدر يبوّظهم.

---

## الخلاصة

- [[getOwnPropertyDescriptor(s)]] بيقرا، و [[defineProperty]] / [[defineProperties]] بيكتب.
- الإسناد العادي = التلاتة [[true]]. [[defineProperty]] على خاصية جديدة = أي حاجة مكتبتهاش [[false]].
- data ([[value]]) أو accessor ([[get]]/[[set]])، مش الاتنين.
- [[configurable: false]] مالوش رجعة.
- النسخ الكامل: [[defineProperties({}, getOwnPropertyDescriptors(src))]].`,
          lines: [
            R`object عادي: [[name]] اتعملت بالإسناد العادي، فأذوناتها التلاتة [[true]].`,
            R`نعرّف [[id]] بـ [[value]] بس. الأذونات اللي مكتبناهاش هتبقى [[false]]، وده الـ defaults trap.`,
            R`بنطبع الـ descriptor بتاع [[name]]: القيمة ومعاها تلات أذونات كلهم [[true]] لأنها اتعملت بالإسناد العادي.`,
            R`الـ descriptor بتاع [[id]] فيه التلات أذونات [[false]]: [[{ value: 501, writable: false, enumerable: false, configurable: false }]].`,
            R`[[Object.keys]] و JSON مش شايفين [[id]] (مش enumerable)، بس [[product.id]] بتقراها عادي: 501.`,
            R`كتابة على [[id]]: في الـ mjs بترمي [[Cannot assign to read only property 'id' of object '#<Object>']]، والـ [[catch]] بيطبع الرسالة.`,
            R`مسح [[id]]: بيرمي [[Cannot delete property 'id' of #<Object>]] لأنها [[configurable: false]].`,
            R`[[defineProperties]] بيعرّف كذا خاصية مرة واحدة: كل مفتاح في الـ object ده اسم خاصية، وقيمته الـ descriptor بتاعها.`,
            R`[[priceCents]] data descriptor: قيمة 4500، بتتكتب وظاهرة. ومش configurable لأننا مكتبناش.`,
            R`بداية [[price]]: accessor descriptor، يعني مفيهوش قيمة متخزنة، فيه دالتين.`,
            R`الـ getter: القراية بتقسم القروش على 100 فبترجّع جنيهات.`,
            R`الـ setter: الكتابة بتضرب في 100 وتقرّب، فالكسور (52.5) بتتخزن integer (5250) من غير غلطات floating point.`,
            R`[[price]] ظاهرة في [[Object.keys]] و JSON. من غير السطر ده كانت هتبقى مخفية.`,
            R`قفلة الـ descriptor بتاع [[price]] بعد ما حددنا الدالتين والظهور.`,
            R`قفلة الـ object اللي فيه الخاصيتين، وقفلة نداء [[defineProperties]] نفسه.`,
            R`كتابة على الـ setter: [[priceCents]] بقت 5250.`,
            R`[[5250 52.5]]: القيمة المتخزنة والقيمة المحسوبة من الـ getter.`,
            R`كل الـ descriptors مرة واحدة كـ object: [[name]] و [[id]] و [[priceCents]] و [[price]]، وتقدر تشوف إن الاتنين الأخيرين [[configurable: false]].`,
            R`محاولة تعريف [[id]] تاني: [[Cannot redefine property: id]]. الخاصية [[configurable: false]] فمقفولة نهائيًا.`,
          ],
          ref: [
            { t: "MDN: Object.defineProperty()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" },
            { t: "MDN: Object.defineProperties()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties" },
            { t: "MDN: Object.getOwnPropertyDescriptor()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor" },
            { t: "MDN: Object.getOwnPropertyDescriptors()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors" },
            { t: "ECMAScript: Property Attributes", url: "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-property-attributes" },
            { t: "ECMAScript: Object.defineProperty", url: "https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.defineproperty" }
          ],
          pre: ["js/method definitions و property accessors", { to: "js/class", why: R`الـ getter والـ setter في الـ class، ونفس الفكرة هنا بس بإيدك على أي object` }, { to: "js/reference و copy", why: R`النسخ السطحي بالـ spread، وهنا هتشوف إنه كمان بيضيّع الـ getters` }]
        },
        {
          cmd: "enumerability و ownership",
          title: "Object.keys و for...in و JSON و Reflect.ownKeys: كل واحد بيشوف أنهي خصايص بالظبط؟",
          desc: R`كل خاصية ليها صفتين بيحددوا مين يشوفها: هي **own** (على الـ object نفسه) ولا **موروثة** من الـ prototype؟ وهي **enumerable** ولا مخفية؟ وكمان مفتاحها نص ولا Symbol؟ وكل طريقة لف أو فحص بتشوف تركيبة مختلفة: [[Object.keys]] own و enumerable و نصوص بس، و [[for...in]] بيزوّد الموروث، و [[Object.getOwnPropertyNames]] بيزوّد المخفي، و [[Object.getOwnPropertySymbols]] الـ Symbols بس، و [[Reflect.ownKeys]] كل الـ own.

وفي الفحص: [[in]] بيدوّر في السلسلة كلها، و [[Object.hasOwn]] (والقديمة [[obj.hasOwnProperty]]) own بس، و [[obj.propertyIsEnumerable(k)]] own **و** enumerable. والدرس فيه الجدول الكامل لكل الطرق، لأن «الخاصية موجودة بس مش ظاهرة» من أكتر الباجات اللي بتضيّع وقت.`,
          example: R`// خاصية من ٤ أنواع: موروثة، وعادية، ومخفية، و Symbol
const base = { inherited: 1 };
const secret = Symbol('secret');
const user = Object.create(base);
user.name = 'Sara';
Object.defineProperty(user, 'hidden', { value: 'h', enumerable: false });
user[secret] = 's';
console.log(Object.keys(user), Object.getOwnPropertyNames(user));
console.log(Object.getOwnPropertySymbols(user), Reflect.ownKeys(user));
for (const k in user) console.log('for-in', k);
console.log('inherited' in user, Object.hasOwn(user, 'inherited'), user.hasOwnProperty('hidden'));
console.log(user.propertyIsEnumerable('name'), user.propertyIsEnumerable('hidden'), user.propertyIsEnumerable('inherited'));
console.log(JSON.stringify(user), { ...user }, Object.assign({}, user));`,
          try: R`في نفس ملف المثال زوّد سطر: [[console.log(structuredClone(user), Object.entries(user), Object.values(user))]]. قبل ما تشغّل: أنهي خصايص هتظهر في كل واحد؟ وبعدين اطبع [[Object.getOwnPropertyNames(Math).length]] و [[Object.keys(Math).length]]: ليه الفرق ده؟`,
          sol: R`~~~text الناتج (Node 24.22)
{ name: 'Sara' } [ [ 'name', 'Sara' ] ] [ 'Sara' ]
44 0
~~~

التلاتة شافوا [[name]] بس: own و enumerable ونص. [[structuredClone]] كمان ساب الـ Symbol والمخفي والموروث (والـ prototype نفسه: النسخة object عادي، مش وارث من [[base]]).

و [[Math]] فيه ٤٤ خاصية own في Node 24 (الثوابت زي [[PI]] والدوال زي [[max]] و [[sumPrecise]])، وكلهم [[enumerable: false]]، عشان كده [[Object.keys(Math)]] فاضية. ونفس الكلام لأي built-in: [[Object.keys(Array.prototype)]] فاضية مع إن فيها عشرات الـ methods. لو عايز تشوف الـ API بتاع object من الـ Console استخدم [[Object.getOwnPropertyNames]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ترتيب المفاتيح. اكتب الناتج قبل التشغيل:

~~~js
const o = { b: 1, 2: 'x', a: 2, 1: 'y', [Symbol('s')]: 0, '1.5': 'z' };
console.log(Object.keys(o));
console.log(Reflect.ownKeys(o).length);
~~~`, done: R`كتبت [[[ '1', '2', 'b', 'a', '1.5' ]]] و 6 قبل التشغيل، وتقدر تقول ليه [['1.5']] جت آخر حاجة.`, sol: R`~~~text الناتج (Node 24.22)
[ '1', '2', 'b', 'a', '1.5' ]
6
~~~

**القاعدة** (اسمها OrdinaryOwnPropertyKeys في المواصفات، وكل الطرق بتمشي عليها):

1. المفاتيح اللي شكلها **index** (رقم صحيح موجب في صورة نص، زي [['1']] و [['2']]) الأول، مترتبة تصاعدي.
2. باقي النصوص بترتيب الإضافة: [['b']] ثم [['a']] ثم [['1.5']]. [['1.5']] مش index (فيه كسر) فبيتعامل كنص عادي. وكمان [['-1']] و [['01']] نصوص عادية (اتجرّبت).
3. الـ Symbols في الآخر بترتيب الإضافة، و [[Object.keys]] مبيطلّعهاش، عشان كده [[Reflect.ownKeys]] عدّها ٦.

الغلطة الشائعة: تعتمد على ترتيب مفاتيح زي [[{ "10": .., "9": .. }]] جاية من API وتستغرب إنها اتقلبت.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** إعدادات اليوزر وارثة من الـ defaults، والكود بيعدّ «اليوزر غيّر كام إعداد». اليوزر غيّر واحد بس والكود بيقول ٢:

~~~js
const defaults = { theme: 'light', lang: 'ar' };
const userPrefs = Object.create(defaults);
userPrefs.theme = 'dark';
let changed = 0;
for (const key in userPrefs) changed++;
console.log('اليوزر غيّر', changed, 'إعداد');
~~~`, done: R`بيطبع «اليوزر غيّر 1 إعداد» بطريقتين: [[Object.keys]] و [[for...in]] مع [[Object.hasOwn]].`, sol: R`[[for...in]] بيلف على الـ enumerable **والموروث**، فعدّ [[theme]] (own) و [[lang]] (من [[defaults]]):

~~~text الناتج قبل التصليح
اليوزر غيّر 2 إعداد
~~~

~~~js prefs.mjs
const defaults = { theme: 'light', lang: 'ar' };
const userPrefs = Object.create(defaults);
userPrefs.theme = 'dark';
console.log('اليوزر غيّر', Object.keys(userPrefs).length, 'إعداد');
let viaForIn = 0;
for (const key in userPrefs) if (Object.hasOwn(userPrefs, key)) viaForIn++;
console.log('ونفس العدد بـ for...in و Object.hasOwn:', viaForIn);
~~~

~~~text الناتج (Node 24.22)
اليوزر غيّر 1 إعداد
ونفس العدد بـ for...in و Object.hasOwn: 1
~~~

[[Object.keys]] own بس، فهو الأنسب هنا. والطريقة التانية موجودة في كود قديم كتير ([[for...in]] + فحص own)، وكانت بتتكتب [[obj.hasOwnProperty(key)]] قبل [[Object.hasOwn]].` },
            { lvl: 'تطبيق', t: R`**ابني:** دالة [[allKeys(obj)]] بتلف على السلسلة كلها (الـ object وبعده الـ prototype وهكذا لحد قبل [[Object.prototype]])، ولكل مستوى بتطبع: الظاهر، والمخفي، والـ Symbols. جرّبها على instance من class فيها field و method و getter و [[ [Symbol.toPrimitive]() ]] وخاصية [[id]] مخفية.`, done: R`المستوى 0 فيه الـ field ظاهر و [[id]] مخفية، والمستوى 1 فيه [[constructor]] والـ method والـ getter مخفيين والـ Symbol، والـ private field مش ظاهر خالص.`, sol: R`~~~js all-keys.mjs
function allKeys(obj) {
  const out = [];
  let level = 0;
  for (let o = obj; o !== null; o = Object.getPrototypeOf(o), level++) {
    if (o === Object.prototype) { out.push(level + ' Object.prototype (اتخطيته)'); break; }
    const names = Object.getOwnPropertyNames(o);
    const shown = names.filter((k) => Object.prototype.propertyIsEnumerable.call(o, k));
    const hiddenKeys = names.filter((k) => !Object.prototype.propertyIsEnumerable.call(o, k));
    const syms = Object.getOwnPropertySymbols(o).map(String);
    out.push(level + ' ' + JSON.stringify({ shown, hidden: hiddenKeys, symbols: syms }));
  }
  return out.join('\n');
}
class Account {
  static #count = 0;
  owner;
  constructor(owner) { this.owner = owner; Object.defineProperty(this, 'id', { value: ++Account.#count }); }
  deposit() {}
  get label() { return this.owner + '#' + this.id; }
  [Symbol.toPrimitive]() { return this.label; }
}
console.log(allKeys(new Account('Sara')));
~~~

~~~text الناتج (Node 24.22)
0 {"shown":["owner"],"hidden":["id"],"symbols":[]}
1 {"shown":[],"hidden":["constructor","deposit","label"],"symbols":["Symbol(Symbol.toPrimitive)"]}
2 Object.prototype (اتخطيته)
~~~

**الشرح:**

- [[Object.prototype.propertyIsEnumerable.call(o, k)]] بدل [[o.propertyIsEnumerable(k)]]: لو [[o]] جاي من [[Object.create(null)]] مفيهوش الـ method أصلًا. ده نفس سبب [[Object.hasOwn]].
- الـ class field ([[owner]]) خاصية own عادية ظاهرة، والـ methods والـ getter على الـ prototype ومخفيين (الـ class بيعرّفهم [[enumerable: false]]).
- [[#count]] و أي [[#private]] مش property خالص، فمفيش طريقة من دول تشوفه. ده الفرق بينه وبين [[_name]] اللي بيظهر في كل حاجة.
- [[String(symbol)]] عشان [[JSON.stringify]] بيشيل الـ Symbols من الـ arrays ويحط [[null]] مكانها.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** endpoint بيفحص الـ body اللي جاي من اليوزر. يوزر بعت JSON فيه مفتاح اسمه [["hasOwnProperty"]] والسيرفر وقع:

~~~js
const body = JSON.parse('{"hasOwnProperty": "x", "email": "a@b.c"}');
console.log(body.hasOwnProperty('email'));
~~~`, done: R`الفحص بقى [[Object.hasOwn(body, 'email')]] وبيرجّع [[true]]، وشغال كمان على object من [[Object.create(null)]].`, sol: R`~~~text الناتج قبل التصليح
TypeError: body.hasOwnProperty is not a function
~~~

اليوزر بعت مفتاح بنفس اسم الـ method، فـ [[body.hasOwnProperty]] بقت النص [["x"]] (الـ own بيغطّي على الموروث)، ونداء نص = [[TypeError]]. وده باب لوقوع السيرفر من أي input.

~~~js has-own.mjs
const body = JSON.parse('{"hasOwnProperty": "x", "email": "a@b.c"}');
const dict = Object.create(null);
dict.email = 'a@b.c';
console.log(Object.hasOwn(body, 'email'), Object.hasOwn(dict, 'email'), Object.hasOwn(body, 'toString'));
console.log(Object.prototype.hasOwnProperty.call(body, 'email'));
~~~

~~~text الناتج (Node 24.22)
true true false
true
~~~

[[Object.hasOwn]] static: مش بتتقري من الـ object، فمحدش يقدر يغطّي عليها، وشغالة على الـ object اللي من غير prototype. والسطر الأخير الطريقة القديمة الآمنة (قبل ES2022): تاخد الـ method من [[Object.prototype]] مباشرة وتناديها بـ [[call]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك سألك: «ليه [[JSON.stringify]] شال الـ Symbol والخاصية المخفية، بس [[{ ...user }]] شال المخفية بس وساب الـ Symbol؟». اكتبله الإجابة في ٣ أو ٤ سطور، ومعاها سطر كود يثبت كلامك.`, done: R`الإجابة فيها إن الاتنين own و enumerable بس، والفرق إن JSON نص ومفيش Symbol في JSON، والكود بيطبع الفرق.`, sol: R`**الإجابة النموذجية:**

1. الاتنين بيبدأوا من نفس القاعدة: الخصايص الـ **own** والـ **enumerable** بس. عشان كده المخفية ([[enumerable: false]]) والموروثة اتشالوا في الاتنين.
2. الـ spread بيعمل object تاني، والـ object بيقبل مفاتيح Symbol، فبينسخها (هو بيلف على [[Reflect.ownKeys]] مش [[Object.keys]]).
3. [[JSON.stringify]] بيعمل **نص** بصيغة JSON، و JSON مفيهوش حاجة اسمها Symbol، فبيلف على [[Object.keys]] (نصوص بس). ونفس السبب بيشيل الـ [[undefined]] والدوال.

~~~js explain.mjs
const user = { name: 'Sara', [Symbol('s')]: 1 };
Object.defineProperty(user, 'hidden', { value: 'h' });
console.log(JSON.stringify(user), { ...user });
~~~

~~~text الناتج (Node 24.22)
{"name":"Sara"} { name: 'Sara', Symbol(s): 1 }
~~~

لاحظ إن [[console.log]] في Node بيكتب المفتاح [[Symbol(s)]] بالوصف بتاعه، بس ده عرض بس: مفيش مفتاح نصي اسمه [["Symbol(s)"]]، وعشان تقرا القيمة لازم يبقى معاك الـ Symbol نفسه.` },
          ],
          flag: "script",
          deep: {
            why: R`كل كود بيلف على object (يعمل JSON، أو ينسخ، أو يقارن، أو يعرض فورم) بيستخدم واحدة من الطرق دي، ولو اخترت الغلط يا إما هتطلع خصايص مش عايزها (موروثة في [[for...in]])، يا إما هتضيع خصايص مهمة (Symbols في [[Object.keys]]). و [[hasOwnProperty]] على input من يوزر ثغرة حقيقية: أي حد يبعت مفتاح بنفس الاسم يوقّع الكود.`,
            how: R`كل object ليه «قايمة مفاتيح own» مترتبة (الـ index الأول تصاعدي، وبعدها النصوص بترتيب الإضافة، وبعدها الـ Symbols)، و [[Reflect.ownKeys]] بيرجّعها كلها. وكل طريقة تانية فلتر عليها:

- [[Object.getOwnPropertyNames]] = القايمة من غير Symbols.
- [[Object.getOwnPropertySymbols]] = الـ Symbols بس.
- [[Object.keys]] و [[values]] و [[entries]] = النصوص اللي [[enumerable: true]].
- [[for...in]] = [[Object.keys]] للـ object وبعده لكل prototype في السلسلة، من غير تكرار (لو الاسم ظهر قبل كده مبيتعدّش تاني)، ومن غير Symbols.
- [[JSON.stringify]] = [[Object.keys]]، ومن غير القيم اللي مالهاش مكان في JSON.
- الـ spread و [[Object.assign]] = كل الـ own الـ enumerable، نصوص و Symbols، وبيقروا القيمة (فالـ getter بيتنادى).

والفحص: [[in]] بيمشي في السلسلة كلها ومش بيفرق مع enumerable. [[Object.hasOwn(o, k)]] = «فيه descriptor own للمفتاح ده؟». و [[o.propertyIsEnumerable(k)]] = «فيه descriptor own و [[enumerable]] بتاعه [[true]]؟»، فبيرجّع [[false]] للموروث حتى لو ظاهر في [[for...in]].`,
            when: R`[[Object.keys]] / [[entries]] لأي لف عادي على داتا (الافتراضي). [[for...in]] نادرًا، ومعاه [[Object.hasOwn]] لو مش متأكد إن مفيش وراثة. [[Object.getOwnPropertyNames]] للـ debugging وانت عايز تشوف API object. [[Reflect.ownKeys]] لما بتعمل أداة عامة (نسخ عميق، deep freeze، مقارنة) لازم تشوف كل حاجة. [[Object.hasOwn]] دايمًا بدل [[hasOwnProperty]]، و [[propertyIsEnumerable]] لما بتبني نسخ أو serialization بإيدك وعايز تحترم المخفي.`,
            mistakes: R`- [[for...in]] على object وارث فبيطلّع خصايص الـ prototype (الإعدادات الافتراضية، أو method حد زوّدها على [[Object.prototype]]).
- [[for...in]] على array: المفاتيح نصوص ([['0']] مش [[0]])، وأي خاصية زيادة على الـ array بتطلع معاها. استخدم [[for...of]].
- [[obj.hasOwnProperty(k)]] على input أو على [[Object.create(null)]]: [[TypeError: obj.hasOwnProperty is not a function]].
- تفتكر [[Object.keys]] بتشوف الـ Symbols أو الخصايص اللي [[defineProperty]] عملها من غير [[enumerable: true]].
- تعتمد على إن المفاتيح الرقمية هتفضل بترتيب الإضافة: دايمًا بتتطلع الأول تصاعدي.
- تفتكر [[propertyIsEnumerable]] بيرد [[true]] للموروث الظاهر في [[for...in]]: لأ، own بس.`,
          },
          teach: R`## الفكرة في سطرين

السؤال «الخاصية دي موجودة؟» ليه ٣ أبعاد: own ولا موروثة، وظاهرة (enumerable) ولا مخفية، ونص ولا Symbol. كل طريقة في اللغة بتختار تركيبة، والدرس ده بيحطهم جنب بعض. الناتج من Node 24.22 كملف [[.mjs]].

---

## ١. نبني object فيه الأربع أنواع

~~~js
const base = { inherited: 1 };
const secret = Symbol('secret');
const user = Object.create(base);
user.name = 'Sara';
Object.defineProperty(user, 'hidden', { value: 'h', enumerable: false });
user[secret] = 's';
~~~

| الخاصية | own؟ | enumerable؟ | نوع المفتاح |
|---|---|---|---|
| [[inherited]] | لأ، جاية من [[base]] | أيوه | نص |
| [[name]] | أيوه | أيوه | نص |
| [[hidden]] | أيوه | لأ | نص |
| [[secret]] | أيوه | أيوه | Symbol |

---

## ٢. اللف على المفاتيح

~~~text الناتج
[ 'name' ] [ 'name', 'hidden' ]
[ Symbol(secret) ] [ 'name', 'hidden', Symbol(secret) ]
for-in name
for-in inherited
~~~

| الطريقة | own | موروث | مخفي (enumerable: false) | Symbol | طلّعت إيه هنا |
|---|---|---|---|---|---|
| [[Object.keys]] و [[values]] و [[entries]] | ✓ | ✗ | ✗ | ✗ | [[name]] |
| [[Object.getOwnPropertyNames]] | ✓ | ✗ | ✓ | ✗ | [[name]] و [[hidden]] |
| [[Object.getOwnPropertySymbols]] | ✓ | ✗ | ✓ | ✓ (بس) | [[Symbol(secret)]] |
| [[Reflect.ownKeys]] | ✓ | ✗ | ✓ | ✓ | التلاتة الـ own |
| [[for...in]] | ✓ | ✓ | ✗ | ✗ | [[name]] و [[inherited]] |
| [[JSON.stringify]] | ✓ | ✗ | ✗ | ✗ | [[{"name":"Sara"}]] |
| [[{ ...obj }]] و [[Object.assign]] | ✓ | ✗ | ✗ | ✓ | [[name]] و الـ Symbol |
| [[structuredClone]] | ✓ | ✗ | ✗ | ✗ | [[{ name: 'Sara' }]] |

### [[Object.getOwnPropertyNames]]

بيرجّع **كل** المفاتيح النصية الـ own، ظاهرة ومخفية. مفيد جدًا مع الـ built-ins: [[Object.getOwnPropertyNames([7, 8])]] طلّعت [[[ '0', '1', 'length' ]]] و [[Object.keys]] طلّعت [[[ '0', '1' ]]] بس. و [[Object.getOwnPropertyNames(Math)]] فيها ٤٤ اسم و [[Object.keys(Math)]] صفر.

### [[Object.getOwnPropertySymbols]]

الـ Symbols بس. مثال: [[Object.getOwnPropertySymbols(Array.prototype)]] طلّعت [[[ Symbol(Symbol.iterator), Symbol(Symbol.unscopables) ]]]، ودي اللي بتخلي الـ array تتلف بـ [[for...of]].

---

## ٣. الفحص: [[in]] و [[Object.hasOwn]] و [[hasOwnProperty]] و [[propertyIsEnumerable]]

~~~text الناتج
true false true
true false false
~~~

| السؤال | own | موروث | مخفي | اللي طلع |
|---|---|---|---|---|
| [['k' in obj]] | ✓ | ✓ | ✓ | [['inherited' in user]] بـ [[true]] |
| [[Object.hasOwn(obj, 'k')]] | ✓ | ✗ | ✓ | [[Object.hasOwn(user, 'inherited')]] بـ [[false]] |
| [[Object.prototype.hasOwnProperty]] ([[obj.hasOwnProperty('k')]]) | ✓ | ✗ | ✓ | [[user.hasOwnProperty('hidden')]] بـ [[true]] |
| [[Object.prototype.propertyIsEnumerable]] ([[obj.propertyIsEnumerable('k')]]) | ✓ | ✗ | ✗ | [[name]] بـ [[true]]، و [[hidden]] و [[inherited]] بـ [[false]] |

**[[hasOwnProperty]] ولا [[Object.hasOwn]]؟** نفس الإجابة، بس [[hasOwnProperty]] method بتتقري من الـ object نفسه، فبتقع في حالتين اتجرّبوا:

~~~text الناتج
dict.hasOwnProperty is not a function
fromApi.hasOwnProperty is not a function
~~~

الأولى object من [[Object.create(null)]] (مفيهوش [[Object.prototype]] أصلًا)، والتانية JSON من يوزر فيه مفتاح [["hasOwnProperty"]] غطّى على الـ method. [[Object.hasOwn]] (ES2022) مش بتتأثر بالاتنين.

**[[propertyIsEnumerable]]** هي السؤال اللي [[Object.keys]] بيسأله لكل مفتاح: own **و** ظاهر. و [[[].propertyIsEnumerable('length')]] بـ [[false]]، و [[[5].propertyIsEnumerable(0)]] بـ [[true]].

---

## ٤. النسخ: مين بيعدّي

~~~text الناتج
{"name":"Sara"} { name: 'Sara', Symbol(secret): 's' } { name: 'Sara', Symbol(secret): 's' }
~~~

JSON شال الـ Symbol (مفيش Symbol في JSON)، والـ spread و [[Object.assign]] نسخوه. والتلاتة شالوا [[hidden]] و [[inherited]]، والنسخ كلها بقت objects عادية وارثة من [[Object.prototype]] مش من [[base]].

---

## ٥. ترتيب المفاتيح

[[Object.keys({ b: 1, 10: 'x', a: 2, 2: 'y', '-1': 'n', '01': 'z' })]] طلّعت [[[ '2', '10', 'b', 'a', '-1', '01' ]]]: الأرقام الصحيحة الموجبة الأول تصاعدي، وبعدها الباقي بترتيب الإضافة، والـ Symbols في الآخر في [[Reflect.ownKeys]].

---

## ٦. الـ class

~~~js
class Account { #pin = 1; balance = 0; deposit() {} }
const acc = new Account();
console.log(Reflect.ownKeys(acc), Object.getOwnPropertyNames(Account.prototype));
~~~

~~~text الناتج
[ 'balance' ] [ 'constructor', 'deposit' ]
~~~

الـ field العادي own وظاهر، والـ method على الـ prototype ومخفية، و [[#pin]] مش property أصلًا فمفيش طريقة بتشوفه.

---

## الخلاصة

- [[Object.keys]]: own + ظاهر + نص. ده الافتراضي.
- [[getOwnPropertyNames]] بيزوّد المخفي، و [[getOwnPropertySymbols]] الـ Symbols بس، و [[Reflect.ownKeys]] الاتنين.
- [[for...in]] الوحيد اللي بيطلع للموروث.
- [[in]] سلسلة كاملة، و [[Object.hasOwn]] own (واستخدمها بدل [[hasOwnProperty]])، و [[propertyIsEnumerable]] own وظاهر.`,
          lines: [
            R`الـ object اللي هيبقى prototype. أي خاصية فيه هتبقى «موروثة» عند اللي تحت.`,
            R`Symbol جديد بوصف [['secret']]. هنستخدمه مفتاح، والمفتاح ده عمره ما هيتحوّل لنص.`,
            R`[[Object.create(base)]] بيعمل object فاضي الـ prototype بتاعه [[base]]، فـ [[user.inherited]] بيتقري من فوق.`,
            R`خاصية own عادية: own وظاهرة ومفتاحها نص.`,
            R`خاصية own مخفية: [[enumerable: false]]، وأي إذن مكتبناهوش بيبقى [[false]] (درس «property descriptors»).`,
            R`خاصية own مفتاحها Symbol، وقيمتها [['s']].`,
            R`[[Object.keys]] شاف [[name]] بس، و [[getOwnPropertyNames]] شاف [[name]] و [[hidden]]: المخفي ظاهر هنا لأنها بتجيب كل النصوص الـ own.`,
            R`[[getOwnPropertySymbols]] جاب الـ Symbol بس، و [[Reflect.ownKeys]] جاب التلاتة الـ own (نصوص و Symbol).`,
            R`[[for...in]] طلّع [[name]] و [[inherited]]: الظاهر من الـ object نفسه ومن الـ prototype، ومن غير المخفي ولا الـ Symbol.`,
            R`[[in]] لقى الموروث ([[true]])، و [[Object.hasOwn]] قال إنه مش own ([[false]])، و [[hasOwnProperty]] قال إن [[hidden]] own ([[true]]) لأنها مش بتهتم بالظهور.`,
            R`[[propertyIsEnumerable]] own **و** ظاهر: [[name]] بـ [[true]]، و [[hidden]] بـ [[false]] (مخفية)، و [[inherited]] بـ [[false]] (موروثة).`,
            R`النسخ: JSON طلّع [[name]] بس، والـ spread و [[Object.assign]] طلّعوا [[name]] والـ Symbol. ومفيش نسخة فيها [[hidden]] أو [[inherited]].`,
          ],
          ref: [
            { t: "MDN: Enumerability and ownership of properties", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties" },
            { t: "MDN: Object.getOwnPropertyNames()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames" },
            { t: "MDN: Object.getOwnPropertySymbols()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols" },
            { t: "MDN: Object.prototype.hasOwnProperty()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty" },
            { t: "MDN: Object.prototype.propertyIsEnumerable()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable" },
            { t: "ECMAScript: OrdinaryOwnPropertyKeys", url: "https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-ordinaryownpropertykeys" }
          ],
          pre: ["js/property descriptors: Object.defineProperty", { to: "js/Object.keys و entries", why: R`[[Object.keys]] و [[entries]] و [[Object.hasOwn]] في أبسط صورهم` }, { to: "js/prototype chain", why: R`الموروث جاي منين، و [[Object.create]]` }, "js/for...of و for...in"]
        },
        {
          cmd: "Object.preventExtensions و seal و freeze",
          title: "تلات درجات قفل للـ object: تمنع الإضافة، ولا الإضافة والمسح، ولا أي تعديل؟",
          desc: R`[[Object.preventExtensions(o)]] بيمنع إضافة خصايص جديدة بس. [[Object.seal(o)]] بيمنع الإضافة **والمسح**، والقيم لسه بتتغيّر. [[Object.freeze(o)]] بيمنع الإضافة والمسح **والتعديل**. وكل واحد ليه سؤال: [[Object.isExtensible]] و [[Object.isSealed]] و [[Object.isFrozen]].

التلاتة **سطحيين**: بيقفلوا الـ object نفسه بس، والـ objects اللي جواه مفتوحة. والتلاتة **ملهمش رجعة**. وفي strict mode (أي ملف [[.mjs]] أو [[class]]) أي محاولة ممنوعة بترمي [[TypeError]]، وفي sloppy بتفشل ساكتة.

درس «immutability» علّمك [[Object.freeze]] كأداة للـ state. هنا بنشوف السلّم كله والأسئلة والحالات الطرفية: الـ arrays، و typed arrays، و [[Map]]، والـ private fields، والـ object الفاضي.`,
          example: R`// تلات أقفال بالترتيب: preventExtensions ثم seal ثم freeze
const tryIt = (label, fn) => { try { fn(); console.log(label, 'ok'); } catch (e) { console.log(label, '✗', e.message); } };
const open = { x: 1 };
const noAdd = Object.preventExtensions({ x: 1 });
const sealed = Object.seal({ x: 1 });
const frozen = Object.freeze({ x: 1, inner: { y: 1 } });
for (const [name, o] of Object.entries({ noAdd, sealed, frozen })) {
  tryIt(name + ' add', () => { o.z = 1; });
  tryIt(name + ' edit', () => { o.x = 2; });
  tryIt(name + ' delete', () => { delete o.x; });
}
frozen.inner.y = 99;
console.log(frozen.inner.y);
console.log(Object.isExtensible(open), Object.isExtensible(noAdd), Object.isSealed(sealed), Object.isFrozen(sealed), Object.isFrozen(frozen));`,
          try: R`جرّب السؤال الغريب ده في [[edge.mjs]]: [[const e = Object.preventExtensions({})]] واطبع [[Object.isSealed(e)]] و [[Object.isFrozen(e)]]. وبعدين اطبع [[Object.isFrozen(1)]] و [[Object.isExtensible('s')]]. وآخر حاجة: [[Object.freeze(new Uint8Array(2))]] واقرا الـ error.`,
          sol: R`~~~js edge.mjs
const e = Object.preventExtensions({});
console.log(Object.isSealed(e), Object.isFrozen(e));
console.log(Object.isFrozen(1), Object.isExtensible('s'));
try { Object.freeze(new Uint8Array(2)); } catch (er) { console.log(er.message); }
console.log(Object.isFrozen(Object.freeze(new Uint8Array(0))));
~~~

~~~text الناتج (Node 24.22)
true true
true false
Cannot freeze array buffer views with elements
true
~~~

- object فاضي ممنوع الإضافة عليه = sealed و frozen في نفس الوقت: مفيش خاصية تتمسح ولا تتعدّل أصلًا. الأسئلة بتفحص الحالة مش «اتنادى عليه freeze ولا لأ».
- الـ primitives ([[1]] و [['s']]) بتتعامل كأنها متجمّدة ومش قابلة للإضافة، والأسئلة مبترميش عليها.
- الـ typed array اللي فيه عناصر مينفعش يتجمّد: عناصره متخزنة في buffer، والمحرك مش بيقدر يقفلها كخصايص. الفاضي بيتجمّد عادي.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الكود ده في ملف [[seal.cjs]] (من غير strict). اكتب الناتج قبل ما تشغّل:

~~~js
const s = Object.seal({ qty: 1 });
s.qty = 5;
s.price = 10;
const removed = delete s.qty;
console.log(s, removed, Object.isSealed(s), Object.isFrozen(s));
~~~`, done: R`كتبت [[{ qty: 5 } false true false]] وطلع كده، وتعرف أنهي سطر فشل ساكت.`, sol: R`~~~text الناتج (Node 24.22)
{ qty: 5 } false true false
~~~

- [[s.qty = 5]] نجح: الـ seal بيسيب التعديل.
- [[s.price = 10]] فشل **ساكت**: إضافة على object مختوم. في الـ cjs مفيش error.
- [[delete s.qty]] فشل ورجّع [[false]] بدل ما يرمي.
- [[isFrozen]] بـ [[false]] لأن [[qty]] لسه [[writable]].

لو نفس الكود في [[.mjs]] كان هيقف عند [[s.price = 10]] بـ [[TypeError: Cannot add property price, object is not extensible]]. عشان كده الأقفال دي «بتشتغل بجد» بس في strict mode.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[deepFreeze(obj)]] بتجمّد الـ object وكل اللي جواه: arrays و objects متداخلة، ومفاتيح Symbol، ومراجع دايرية ([[config.self = config]]) من غير ما تلف للأبد. ومتناديش الـ getters (اقرا الـ descriptor مش القيمة). والـ typed arrays سيبها.`, done: R`بعد [[deepFreeze(config)]]: [[config.db.hosts.push('c')]] بيرمي، و [[Object.isFrozen]] بـ [[true]] على كل مستوى وعلى قيمة الـ Symbol، و [[deepFreeze(5)]] و [[deepFreeze(null)]] بيرجّعوا نفسهم، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js deep-freeze.mjs
function deepFreeze(obj, seen = new WeakSet()) {
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function') || seen.has(obj)) return obj;
  seen.add(obj);
  for (const key of Reflect.ownKeys(obj)) {
    const d = Object.getOwnPropertyDescriptor(obj, key);
    if ('value' in d) deepFreeze(d.value, seen);
  }
  return ArrayBuffer.isView(obj) ? obj : Object.freeze(obj);
}
const config = { db: { hosts: ['a', 'b'] }, [Symbol('meta')]: { v: 1 } };
config.self = config;
deepFreeze(config);
console.log(Object.isFrozen(config.db), Object.isFrozen(config.db.hosts), Object.isFrozen(config[Object.getOwnPropertySymbols(config)[0]]));
try { config.db.hosts.push('c'); } catch (e) { console.log(e.message); }
console.log(deepFreeze(5), deepFreeze(null), config.self === config);
~~~

~~~text الناتج (Node 24.22)
true true true
Cannot add property 2, object is not extensible
5 null true
~~~

**كل حتة ليه:**

- [[WeakSet]] بيفتكر اللي اتجمّد، فـ [[config.self]] بيرجع على طول بدل ما يلف للأبد ([[RangeError: Maximum call stack size exceeded]]). و [[WeakSet]] مش [[Set]] عشان ميمسكش الـ objects في الذاكرة.
- [[Reflect.ownKeys]] مش [[Object.keys]]: عشان المخفي والـ Symbols (درس «enumerability و ownership»).
- [[getOwnPropertyDescriptor]] و [[ 'value' in d ]]: لو الخاصية getter مبنقراهاش، لأن نداء getter ممكن يعمل حاجة (يحسب، أو يكتب لوج، أو يرمي).
- [[ArrayBuffer.isView]] بيمسك الـ typed arrays و [[DataView]]، اللي [[Object.freeze]] بيرمي عليهم لو فيهم عناصر.
- الـ push رسالته «Cannot add property 2»: [[push]] بيحاول يضيف خاصية بالـ index الجديد.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** موديول [[settings.js]] بيصدّر [[settings]] متجمّدة وفيها array [[origins]] متجمّدة كمان. اكتب [[settings.test.js]] بـ [[node:test]] بيتأكد إن الكتابة والإضافة بيرموا [[TypeError]] بالرسالة الصح، وإن الـ array الداخلية مبتقبلش [[push]].`, done: R`[[node --test]] بيطلّع اختبارين ✔ وصفر fail، ولو شلت [[Object.freeze]] من الـ array الاختبار التاني بيقع.`, sol: R`~~~js settings.js
export const settings = Object.freeze({ port: 8080, origins: Object.freeze(['https://shop.example']) });
~~~

~~~js settings.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { settings } from './settings.js';

test('الإعدادات متقفلة على المستوى الأول', () => {
  assert.equal(Object.isFrozen(settings), true);
  assert.throws(() => { settings.port = 1; }, { name: 'TypeError', message: /read only property 'port'/ });
  assert.throws(() => { settings.debug = true; }, /not extensible/);
  assert.equal(settings.port, 8080);
});

test('والـ array اللي جوه متقفلة كمان', () => {
  assert.equal(Object.isFrozen(settings.origins), true);
  assert.throws(() => settings.origins.push('https://evil.example'), /not extensible/);
  assert.deepEqual(settings.origins, ['https://shop.example']);
});
~~~

~~~json package.json
{ "type": "module" }
~~~

~~~text الناتج: node --test
✔ الإعدادات متقفلة على المستوى الأول (1.5247ms)
✔ والـ array اللي جوه متقفلة كمان (0.5607ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 85.3372
~~~

**ليه شغال:** ملف الاختبار ESM ([[type: module]])، فهو strict، فالكتابة على متجمّد بترمي بدل ما تفشل ساكتة. ولو كان [[.cjs]] من غير [['use strict']] كان [[assert.throws]] هيفشل («Missing expected exception») مع إن الـ object متجمّد. و [[assert.throws]] بياخد object يقارن [[name]] و regex على [[message]]، فبيتأكد إنه الـ error الصح مش أي error.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك كاتب [[const settings = { port: 80 };]] وفاكر إن [[const]] كده «قفل» الإعدادات. اشرحله في ٣ سطور الفرق بين [[const]] و [[Object.freeze]]، وإمتى يستخدم [[seal]] بدل [[freeze]]، ومعاها كود صغير يثبت كلامك.`, done: R`الشرح فيه إن [[const]] على المتغير و [[freeze]] على الـ object، ومثال لـ seal مناسب (شكل ثابت وقيم بتتغيّر)، والكود بيطبع الفرق.`, sol: R`**الإجابة النموذجية:**

1. [[const]] بيقفل **المتغير**: مينفعش [[settings = {}]]. بس الـ object اللي فيه مفتوح، فـ [[settings.port = 1]] شغالة.
2. [[Object.freeze]] بيقفل **الـ object**: الخصايص متتغيّرش ولا تتضاف ولا تتمسح، بس المتغير لو [[let]] ممكن يشاور على object تاني. وعادة بتستخدم الاتنين مع بعض.
3. [[Object.seal]] لما الشكل ثابت والقيم بتتغيّر: state بتاع لعبة أو فورم مفاتيحه معروفة، فغلطة إملا زي [[state.scroe = 5]] ترمي بدل ما تعمل خاصية جديدة.

~~~js const-vs-freeze.mjs
const a = { port: 80 };
a.port = 1;
let b = Object.freeze({ port: 80 });
b = { port: 2 };
const form = Object.seal({ score: 0 });
form.score = 5;
try { form.scroe = 6; } catch (e) { console.log(e.message); }
console.log(a.port, b.port, form.score);
~~~

~~~text الناتج (Node 24.22)
Cannot add property scroe, object is not extensible
1 2 5
~~~` },
          ],
          check: { lang: "js", starter: R`function deepFreeze(obj, seen = new WeakSet()) {
  // جمّد obj وكل object جواه، من غير ما تلف للأبد ومن غير ما تنادي getters
  return obj;
}`, tests: R`test("المستوى التاني متجمّد", () => { const o = deepFreeze({ a: { b: 1 } }); expect(Object.isFrozen(o.a)).toBe(true); });
test("array جوه object", () => { const o = deepFreeze({ list: [1, { x: 1 }] }); expect(Object.isFrozen(o.list) && Object.isFrozen(o.list[1])).toBe(true); });
test("Symbol key", () => { const s = Symbol('k'); const o = deepFreeze({ [s]: { v: 1 } }); expect(Object.isFrozen(o[s])).toBe(true); });
test("مرجع دايري مبيلفش للأبد", () => { const o = { n: 1 }; o.self = o; expect(deepFreeze(o) === o && Object.isFrozen(o)).toBe(true); });
test("primitives بترجع زي ما هي", () => { expect(deepFreeze(5)).toBe(5); expect(deepFreeze(null)).toBe(null); });
test("الـ getter مبيتناداش", () => { let calls = 0; const o = { get g() { calls++; return {}; } }; deepFreeze(o); expect(calls).toBe(0); });
test("typed array بيعدّي من غير error", () => { const o = deepFreeze({ bytes: new Uint8Array(2) }); expect(Object.isFrozen(o)).toBe(true); });
test("الكتابة بترمي في strict", () => { const o = deepFreeze({ a: { b: 1 } }); expect(() => { 'use strict'; o.a.b = 2; }).toThrow('read only'); });`, solution: R`function deepFreeze(obj, seen = new WeakSet()) {
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function') || seen.has(obj)) return obj;
  seen.add(obj);
  for (const key of Reflect.ownKeys(obj)) {
    const d = Object.getOwnPropertyDescriptor(obj, key);
    if ('value' in d) deepFreeze(d.value, seen);
  }
  return ArrayBuffer.isView(obj) ? obj : Object.freeze(obj);
}` },
          flag: "script",
          deep: {
            why: R`الإعدادات والثوابت والـ state اللي المفروض ميتغيّرش: لو أي كود (مكتبة، أو زميل، أو انت بعد شهر) عدّل فيهم بالغلط، الباج هيظهر بعيد جدًا عن مكانه. القفل بيخلّي الغلطة ترمي error في السطر اللي عملها. و [[seal]] بالذات بيمسك غلطات الإملا في أسامي الخصايص، اللي من غيره بتعمل خاصية جديدة ساكتة.`,
            how: R`كل object فيه علامة داخلية اسمها Extensible (بتقبل إضافة ولا لأ)، وكل خاصية فيها [[writable]] و [[configurable]] (درس «property descriptors»). والتلات دوال بيغيّروهم:

- [[preventExtensions]]: Extensible = false. بس.
- [[seal]]: نفس اللي فوق + كل خاصية [[configurable: false]].
- [[freeze]]: نفس اللي فوق + كل data property [[writable: false]] (الـ accessors بتفضل زي ما هي، فالـ setter لسه بيشتغل لو بيكتب في حتة تانية).

والأسئلة بتفحص الحالة الفعلية: [[isFrozen]] = مش extensible و كل الخصايص non-configurable و الـ data منهم non-writable. عشان كده الـ object الفاضي بعد [[preventExtensions]] بيقول frozen.

والـ [[Map]] و [[Set]] و [[Date]] داتاهم في «خانات داخلية» مش خصايص، فـ [[Object.freeze(new Map())]] مبيمنعش [[set]] (اتجرّب: [[size]] بقى 1)، و [[Object.freeze(new Date(0))]] مبيمنعش [[setFullYear]] (السنة بقت 2030). ونفس الكلام الـ [[#private]] fields: [[Object.freeze(new Counter())]] و [[inc()]] لسه بيزوّد [[#n]] (طلع 1 ثم 2).`,
            when: R`[[freeze]] للثوابت والإعدادات والـ enums ([[Object.freeze({ PENDING: 'pending', ... })]]) والـ state في تطبيقات بتعتمد على immutability. [[seal]] لـ object شكله ثابت والقيم بتتغيّر (state لعبة، record من الداتابيز). [[preventExtensions]] نادر: لما عايز تسمح بالمسح والتعديل بس مش الإضافة. ولو عايز قفل عميق: deepFreeze (التمرين). والقفل مش أمان ضد كود خبيث معاه نفس الـ object قبل ما تقفله، هو حماية من الغلط.`,
            mistakes: R`- تفتكر [[freeze]] عميق: [[frozen.inner.y = 99]] اشتغلت.
- تختبر في sloppy mode فمفيش error، وتفتكر القفل مش شغال أو العكس.
- تفتكر [[const]] = [[freeze]].
- [[Object.freeze([2, 1]).sort()]] بيرمي [[Cannot assign to read only property '0' of object '[object Array]']]: الـ methods اللي بتعدّل في مكانها ([[sort]] و [[reverse]] و [[push]]) ممنوعة، استخدم [[toSorted]] و [[toReversed]].
- تتوقع [[freeze]] تقفل [[Map]] أو [[Date]] أو [[#private]].
- [[Object.setPrototypeOf]] على object مش extensible: [[TypeError: #<Object> is not extensible]].
- [[defineProperty]] على object مختوم: [[Cannot define property n, object is not extensible]] للجديد، و [[Cannot redefine property: x]] لو بتغيّر [[enumerable]] لخاصية موجودة.`,
          },
          teach: R`## الفكرة في سطرين

تلات دوال بتقفل object بدرجات، وتلات أسئلة بتقولك هو مقفول لأي درجة. الأقفال على الـ object نفسه بس (مش اللي جواه)، ومالهاش فك. الناتج من Node 24.22 كملف [[.mjs]] (strict).

---

## ١. السلّم

| الدالة | إضافة | مسح | تعديل قيمة | السؤال |
|---|---|---|---|---|
| (من غير قفل) | ✓ | ✓ | ✓ | [[Object.isExtensible]] بـ [[true]] |
| [[Object.preventExtensions]] | ✗ | ✓ | ✓ | [[Object.isExtensible]] بـ [[false]] |
| [[Object.seal]] | ✗ | ✗ | ✓ | [[Object.isSealed]] بـ [[true]] |
| [[Object.freeze]] | ✗ | ✗ | ✗ | [[Object.isFrozen]] بـ [[true]] |

والتلاتة بيرجّعوا **نفس الـ object** (مش نسخة): [[Object.freeze(ret) === ret]] بـ [[true]]. فتقدر تكتب [[const cfg = Object.freeze({...})]].

---

## ٢. [[Object.preventExtensions]]

~~~text الناتج
noAdd add ✗ Cannot add property z, object is not extensible
noAdd edit ok
noAdd delete ok
~~~

الإضافة بس اللي ممنوعة. ولاحظ إن [[delete]] نجح، فممكن الـ object «يفضى» بس عمره ما يكبر. و [[defineProperty]] لخاصية جديدة كمان بيرمي: [[Cannot define property n, object is not extensible]].

---

## ٣. [[Object.seal]]

~~~text الناتج
sealed add ✗ Cannot add property z, object is not extensible
sealed edit ok
sealed delete ✗ Cannot delete property 'x' of #<Object>
~~~

الشكل ثابت (نفس المفاتيح)، والقيم بتتغيّر. ومن جوه: [[seal]] = [[preventExtensions]] + كل خاصية [[configurable: false]]. عشان كده تغيير [[enumerable]] بـ [[defineProperty]] رمى [[Cannot redefine property: x]]، بس تغيير [[value]] بـ [[defineProperty]] عدّى (لأن [[writable]] لسه [[true]]).

---

## ٤. [[Object.freeze]] وإنه سطحي

~~~text الناتج
frozen add ✗ Cannot add property z, object is not extensible
frozen edit ✗ Cannot assign to read only property 'x' of object '#<Object>'
frozen delete ✗ Cannot delete property 'x' of #<Object>
99
~~~

[[frozen.x]] مقفولة تمامًا، بس [[frozen.inner.y = 99]] **اشتغلت**: [[inner]] نفسها خاصية مقفولة (مينفعش تحط object تاني مكانها)، لكن الـ object اللي جواها مفتوح. القفل العميق محتاج تلف بنفسك (تمرين deepFreeze).

### الـ arrays

~~~text الناتج
Cannot add property 1, object is not extensible
Cannot assign to read only property '0' of object '[object Array]'
~~~

الأول من [[Object.freeze([1]).push(2)]]، والتاني من [[Object.freeze([2, 1]).sort()]]. أي method بتعدّل الـ array في مكانها بترمي. والـ methods اللي بترجّع array جديدة ([[map]] و [[toSorted]]) شغالة عادي.

---

## ٥. الأسئلة: [[Object.isExtensible]] و [[Object.isSealed]] و [[Object.isFrozen]]

~~~text الناتج
true false true false true
~~~

بالترتيب: [[open]] بيقبل إضافة، و [[noAdd]] لأ، و [[sealed]] مختوم، و [[sealed]] **مش** متجمّد (قيمته بتتغيّر)، و [[frozen]] متجمّد.

| الحالة الطرفية | [[isExtensible]] | [[isSealed]] | [[isFrozen]] |
|---|---|---|---|
| [[Object.preventExtensions({})]] (فاضي) | [[false]] | [[true]] | [[true]] |
| primitive زي [[1]] أو [['s']] | [[false]] | [[true]] | [[true]] |
| [[Object.freeze(new Map())]] | [[false]] | [[true]] | [[true]]، وبرضه [[set]] شغالة |

الأسئلة بتفحص **الحالة**، مش «مين اتنادى». عشان كده الفاضي frozen.

---

## ٦. حاجات القفل مبيلمسهاش

| الحاجة | اللي حصل (اتجرّب) | ليه |
|---|---|---|
| [[#private]] fields | [[c.inc()]] على instance متجمّد طلّع 1 ثم 2 | الـ private مش property أصلًا |
| [[Map]] و [[Set]] | [[m.set('k', 1)]] و [[size]] بقى 1 | الداتا في خانة داخلية |
| [[Date]] | [[setFullYear(2030)]] اشتغلت | نفس السبب |
| typed array فيه عناصر | [[Cannot freeze array buffer views with elements]] | العناصر في buffer مش خصايص عادية |
| الـ prototype | [[Object.setPrototypeOf(ne, {})]] رمى [[#<Object> is not extensible]] | تغيير الـ prototype محسوب «توسيع» |

---

## الخلاصة

- [[preventExtensions]] < [[seal]] < [[freeze]]، وكل واحد بيعمل اللي قبله وزيادة.
- سطحيين، ومالهمش فك، وبيرجّعوا نفس الـ object.
- بيرموا في strict بس، وفي sloppy بيفشلوا ساكتين.
- الأسئلة بتقيس الحالة: الفاضي اللي مبيقبلش إضافة = frozen.
- مبيوصلوش للـ private ولا [[Map]] ولا [[Date]].`,
          lines: [
            R`دالة مساعدة بتجرّب عملية: لو عدّت تطبع [[ok]]، ولو رمت تطبع [[✗]] ونص الـ error. كده نشوف كل محاولة في سطر.`,
            R`object مفتوح عادي للمقارنة في الآخر.`,
            R`[[preventExtensions]] على object جديد: ممنوع يضاف عليه، والقيم والمسح مسموحين. وبترجّع نفس الـ object فبنحطه في متغير على طول.`,
            R`[[seal]]: ممنوع الإضافة والمسح، والتعديل مسموح.`,
            R`[[freeze]]: ممنوع كل حاجة على المستوى الأول. و [[inner]] object جوه عشان نشوف إن القفل سطحي.`,
            R`بنلف على التلات objects بأسمائهم. [[Object.entries({ noAdd, ... })]] بيستخدم الـ shorthand عشان الاسم يبقى المفتاح.`,
            R`محاولة إضافة خاصية جديدة [[z]]: ممنوعة في التلاتة، والرسالة [[Cannot add property z, object is not extensible]].`,
            R`محاولة تعديل [[x]]: بتنجح في [[noAdd]] و [[sealed]]، وبترمي في [[frozen]] بـ [[Cannot assign to read only property 'x']].`,
            R`محاولة مسح [[x]]: بتنجح في [[noAdd]] بس، وبترمي في الاتنين التانيين بـ [[Cannot delete property 'x' of #<Object>]].`,
            R`قفلة الـ loop بعد ما جرّبنا ٩ محاولات.`,
            R`تعديل جوه الـ object الداخلي: بيشتغل مع إن [[frozen]] متجمّد، لأن [[freeze]] سطحي.`,
            R`بيطبع 99: إثبات إن الـ object الداخلي اتعدّل.`,
            R`الأسئلة التلاتة: [[true false true false true]]. و [[isFrozen(sealed)]] بـ [[false]] لأن قيمته لسه بتتكتب.`,
          ],
          ref: [
            { t: "MDN: Object.preventExtensions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions" },
            { t: "MDN: Object.seal()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal" },
            { t: "MDN: Object.freeze()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze" },
            { t: "MDN: Object.isExtensible()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible" },
            { t: "MDN: Object.isSealed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed" },
            { t: "MDN: Object.isFrozen()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen" },
            { t: "ECMAScript: SetIntegrityLevel و TestIntegrityLevel", url: "https://tc39.es/ecma262/multipage/abstract-operations.html#sec-setintegritylevel" }
          ],
          pre: ["js/property descriptors: Object.defineProperty", { to: "js/immutability", why: R`[[Object.freeze]] كأداة للـ state، والنسخ بدل التعديل` }, { to: "js/let و const و var", why: R`الفرق بين قفل المتغير ([[const]]) وقفل الـ object` }]
        },
        {
          cmd: "Object.setPrototypeOf و isPrototypeOf",
          title: "تغيّر الـ prototype بتاع object موجود، وتسأل «ده جد ده؟»، وليه ده بطيء",
          desc: R`[[Object.setPrototypeOf(obj, proto)]] بيغيّر الـ prototype بتاع object **بعد** ما اتعمل، و [[proto.isPrototypeOf(obj)]] بيسأل: [[proto]] موجود في أي مكان في سلسلة [[obj]]؟ والاتنين بيكمّلوا [[Object.getPrototypeOf]] و [[Object.create]] اللي في درس «prototype chain».

[[isPrototypeOf]] زي [[instanceof]] بس من غير constructor: بتشتغل مع objects عادية مالهاش class. و [[setPrototypeOf]] موجودة وشغالة، بس MDN والمحركات بيحذّروا منها: تغيير الـ prototype بعد الإنشاء بيبوّظ تحسينات المحرك. قِسناها: إنشاء مليون object بـ [[setPrototypeOf]] أبطأ من [[Object.create]] بـ ٣ لـ ٨ مرات. فالقاعدة: حدّد الـ prototype **وقت الإنشاء** ([[Object.create]] أو [[class]] أو [[__proto__]] في الـ literal).`,
          example: R`// تغيّر الـ prototype بعد الإنشاء، وتسأل مين جد مين
const animal = { speak() { return this.name + ' بيعمل صوت'; } };
const dog = { name: 'Rex' };
console.log(typeof dog.speak);
Object.setPrototypeOf(dog, animal);
console.log(dog.speak(), animal.isPrototypeOf(dog), Object.prototype.isPrototypeOf(dog));
class Shape {}
class Circle extends Shape {}
const c = new Circle();
console.log(Shape.prototype.isPrototypeOf(c), c instanceof Shape);
const dict = Object.create(null);
dict.toString = 'مش دالة';
console.log(Object.prototype.isPrototypeOf(dict), dict instanceof Object, Object.keys(dict));
try { Object.setPrototypeOf(animal, dog); } catch (e) { console.log(e.message); }
try { Object.setPrototypeOf(dog, 5); } catch (e) { console.log(e.message); }`,
          try: R`في [[proto.mjs]] جرّب ٤ حاجات واقرا كل ناتج: [[Object.setPrototypeOf(1, {})]]، و [[Object.setPrototypeOf(Object.prototype, {})]]، و [[Object.setPrototypeOf(null, {})]]، وآخر حاجة: [[function F() {}]] و [[const f = new F()]] وبعدين [[F.prototype = {}]] واطبع [[f instanceof F]].`,
          sol: R`~~~js proto.mjs
console.log(Object.setPrototypeOf(1, {}));
try { Object.setPrototypeOf(Object.prototype, {}); } catch (e) { console.log(e.message); }
try { Object.setPrototypeOf(null, {}); } catch (e) { console.log(e.message); }
function F() {}
const f = new F();
F.prototype = {};
console.log(f instanceof F, Object.getPrototypeOf(f) === F.prototype);
~~~

~~~text الناتج (Node 24.22)
1
Immutable prototype object 'Object.prototype' cannot have their prototype set
Object.setPrototypeOf called on null or undefined
false false
~~~

- على primitive مبيعملش حاجة وبيرجّعه زي ما هو (مفيش object يتغيّر).
- [[Object.prototype]] نفسه prototype بتاعه مقفول في المواصفات (immutable prototype exotic object)، عشان محدش يعمل سلسلة دايرية من أساس اللغة.
- [[null]] و [[undefined]] بيرموا.
- [[instanceof]] بيسأل «[[F.prototype]] **الحالي** في السلسلة؟». [[f]] اتعمل بالقديم، ولما [[F.prototype]] اتغيّر بقى [[false]]. ده سبب إن [[isPrototypeOf]] بالـ object نفسه أوضح لما بتغيّر حاجات.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سلسلة من ٣ مستويات: [[a]] ← [[b]] ← [[c]]. اكتب الـ ٦ قيم قبل التشغيل:

~~~js
const c = { level: 'c' };
const b = Object.create(c);
const a = Object.create(b);
console.log(b.isPrototypeOf(a), c.isPrototypeOf(a), a.isPrototypeOf(b));
console.log(Object.prototype.isPrototypeOf(a), Object.prototype.isPrototypeOf(Object.create(null)));
console.log(a.level, Object.hasOwn(a, 'level'));
~~~`, done: R`كتبت [[true true false]] و [[true false]] و [[c false]]، وتقدر تقول ليه [[c.isPrototypeOf(a)]] بـ [[true]] مع إن [[c]] مش الأب المباشر.`, sol: R`~~~text الناتج (Node 24.22)
true true false
true false
c false
~~~

- [[isPrototypeOf]] بيدوّر في **السلسلة كلها** مش أول مستوى بس، فـ [[c]] (الجد) بـ [[true]].
- العكس [[false]]: [[a]] مش في سلسلة [[b]]، السلسلة بتطلع لفوق بس.
- كل object عادي آخر سلسلته [[Object.prototype]]، إلا اللي اتعمل بـ [[Object.create(null)]].
- [[a.level]] اتقرت من [[c]] بالوراثة، بس مش own.` },
            { lvl: 'تطبيق', t: R`**refactor وقيس:** الكود ده بيعمل مليون شكل ويحط الـ methods بـ [[setPrototypeOf]] لكل واحد. خليه [[class]] وقيس الفرق برقم:

~~~js
const shapeMethods = { area() { return this.w * this.h; } };
function before(n) {
  const out = [];
  for (let i = 0; i < n; i++) { const s = { w: i, h: 2 }; Object.setPrototypeOf(s, shapeMethods); out.push(s); }
  return out;
}
~~~`, done: R`النسخة الـ class بتطلّع نفس [[area()]] لنفس العنصر، وقسّت الاتنين مرتين، والـ class أسرع بشكل واضح في الرقم اللي طلع عندك.`, sol: R`~~~js bench-shapes.mjs
const shapeMethods = { area() { return this.w * this.h; } };
function before(n) {
  const out = [];
  for (let i = 0; i < n; i++) { const s = { w: i, h: 2 }; Object.setPrototypeOf(s, shapeMethods); out.push(s); }
  return out;
}
class Rect { constructor(w, h) { this.w = w; this.h = h; } area() { return this.w * this.h; } }
function after(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(new Rect(i, 2));
  return out;
}
for (const [label, fn] of [['setPrototypeOf', before], ['class', after], ['setPrototypeOf', before], ['class', after]]) {
  const t0 = performance.now();
  const list = fn(1_000_000);
  console.log(label.padEnd(15), (performance.now() - t0).toFixed(0).padStart(4), 'ms', list[3].area());
}
~~~

~~~text الناتج (Node 24.22، ويندوز ١١، لابتوب)
setPrototypeOf   188 ms 6
class             37 ms 6
setPrototypeOf   182 ms 6
class             14 ms 6
~~~

**الفرق ٥ لـ ١٣ مرة** في القياس ده. السبب: المحرك (V8) بيعمل لكل «شكل» object وصف داخلي (hidden class أو map). الـ class بيعمل الشكل مرة وكل الـ objects بتشاركه. أما [[setPrototypeOf]] بعد الإنشاء فبيجبر المحرك يحوّل الـ object لشكل تاني في كل مرة. والتشغيل التاني أسرع في الاتنين لأن المحرك «سخن» (JIT). الأرقام بتختلف من جهاز للتاني، والنسبة هي المهمة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[chainOf(value)]] بترجّع نص فيه السلسلة كلها بالأسامي: [[Dog.prototype → Animal.prototype → Object.prototype → null]]. استخدم [[constructor.name]] لو الـ prototype ليه [[constructor]] own، وإلا اكتب إنه object من غير constructor. لازم تشتغل على primitives ([['نص']]) وعلى [[Object.create(null)]].`, done: R`بتطلّع السلسلة صح لـ array، و instance من class وارثة، ونص، و [[Object.create({ a: 1 })]]، و [[Object.create(null)]] (بتطلّع [[null]] بس)، و async arrow.`, sol: R`~~~js chain-of.mjs
function chainOf(value) {
  const names = [];
  for (let o = Object.getPrototypeOf(Object(value)); o !== null; o = Object.getPrototypeOf(o)) {
    names.push(Object.hasOwn(o, 'constructor') ? o.constructor.name + '.prototype' : '(object من غير constructor)');
  }
  return names.concat('null').join(' → ');
}
class Animal {}
class Dog extends Animal {}
console.log(chainOf([1]));
console.log(chainOf(new Dog()));
console.log(chainOf('نص'));
console.log(chainOf(Object.create({ a: 1 })));
console.log(chainOf(Object.create(null)));
console.log(chainOf(async () => {}));
~~~

~~~text الناتج (Node 24.22)
Array.prototype → Object.prototype → null
Dog.prototype → Animal.prototype → Object.prototype → null
String.prototype → Object.prototype → null
(object من غير constructor) → Object.prototype → null
null
AsyncFunction.prototype → Function.prototype → Object.prototype → null
~~~

**الشرح:** [[Object(value)]] بيلف الـ primitive في object ([[new String('نص')]]) عشان [[getPrototypeOf]] يشتغل بنفس الطريقة على الكل. و [[Object.hasOwn(o, 'constructor')]] مش [[o.constructor]] بس: من غير [[hasOwn]] الـ object اللي من [[Object.create({ a: 1 })]] كان هيقرا [[constructor]] بالوراثة من [[Object.prototype]] ويقول [[Object.prototype]] مرتين. والسطر الأخير بيوريك إن الـ async function ليها prototype خاص [[AsyncFunction.prototype]] قبل [[Function.prototype]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[countWords(text)]] بتعدّ تكرار كل كلمة (بعد ما تصغّر الحروف). لازم تشتغل صح على كلمات زي [[constructor]] و [[toString]] و [[__proto__]]. شغّل النسخة دي الأول وشوف بتطلّع إيه:

~~~js
function countWordsBad(text) {
  const counts = {};
  for (const w of text.split(/\s+/)) counts[w] = (counts[w] || 0) + 1;
  return counts;
}
console.log(countWordsBad('constructor toString __proto__'));
~~~`, done: R`نسختك بتطلّع [[constructor: 1]] و [[tostring: 1]] و [[__proto__: 2]] للنص [['the constructor of the toString __proto__ __proto__']]، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`النسخة البايظة:

~~~text الناتج
{
  constructor: 'function Object() { [native code] }1',
  toString: 'function toString() { [native code] }1'
}
~~~

[[counts['constructor']]] لقى [[Object]] بالوراثة (مش [[undefined]])، فـ [[|| 0]] مشتغلش، والدالة + 1 بقت نص. و [[__proto__]] **اختفت**: [[counts['__proto__']]] هي [[Object.prototype]] نفسه، والكتابة عليها بنص اتجاهلت.

~~~js count-words.mjs
function countWords(text) {
  const counts = Object.create(null);
  for (const w of text.toLowerCase().split(/\s+/).filter(Boolean)) counts[w] = (counts[w] ?? 0) + 1;
  return counts;
}
console.log(countWords('the constructor of the toString __proto__ __proto__'));
~~~

~~~text الناتج (Node 24.22)
[Object: null prototype] {
  the: 2,
  constructor: 1,
  of: 1,
  tostring: 1,
  ['__proto__']: 2
}
~~~

[[Object.create(null)]] مفيهوش أي حاجة موروثة، فكل كلمة بتبدأ [[undefined]]، و [[__proto__]] بقت مفتاح عادي (الـ setter بتاعها على [[Object.prototype]] اللي مش في السلسلة). و [[filter(Boolean)]] بيشيل النص الفاضي لو النص بيبدأ أو بيخلص بمسافة. والبديل التاني [[Map]]، وده أحسن لو هتحتاج [[size]] أو ترتيب.` },
          ],
          check: { lang: "js", starter: R`function countWords(text) {
  // رجّع object كل مفتاح فيه كلمة (بحروف صغيرة) وقيمته عدد مراتها
}`, tests: R`test("كلمات عادية", () => { const c = countWords('a b a'); expect(c.a).toBe(2); expect(c.b).toBe(1); });
test("constructor", () => expect(countWords('constructor')['constructor']).toBe(1));
test("toString بحروف صغيرة", () => expect(countWords('toString TOSTRING')['tostring']).toBe(2));
test("__proto__ مفتاح عادي", () => expect(countWords('__proto__ __proto__')['__proto__']).toBe(2));
test("مفيش مفاتيح موروثة", () => expect('hasOwnProperty' in countWords('x')).toBe(false));
test("مسافات زيادة", () => expect(Object.keys(countWords('  a   b  ')).length).toBe(2));
test("نص فاضي", () => expect(Object.keys(countWords('')).length).toBe(0));`, solution: R`function countWords(text) {
  const counts = Object.create(null);
  for (const w of text.toLowerCase().split(/\s+/).filter(Boolean)) counts[w] = (counts[w] ?? 0) + 1;
  return counts;
}` },
          flag: "script",
          deep: {
            why: R`[[isPrototypeOf]] بتجاوب على سؤال «الـ object ده من النوع ده؟» لما مفيش class: plugins بتورث من object أساسي، أو objects من [[Object.create]]. و [[setPrototypeOf]] لازم تعرفها لأنك هتلاقيها في كود قديم ومكتبات (mixins، و polyfills)، ولازم تعرف ليه بنتجنبها. و [[Object.create(null)]] هو الحل الصح لأي «قاموس» مفاتيحه جاية من يوزر (عدّاد كلمات، cache بالـ URL، headers)، لأن الـ object العادي فيه مفاتيح «مستخبية» زي [[constructor]] و [[__proto__]].`,
            how: R`كل object فيه خانة داخلية اسمها Prototype. [[getPrototypeOf]] بيقراها، و [[setPrototypeOf]] بيكتبها بعد ٣ فحوص: القيمة object أو [[null]] (وإلا [[Object prototype may only be an Object or null: 5]])، والـ object extensible (وإلا [[#<Object> is not extensible]])، ومفيش دايرة (وإلا [[Cyclic __proto__ value]]).

و [[proto.isPrototypeOf(obj)]] بيعمل loop: [[o = getPrototypeOf(obj)]]، ولو [[o === proto]] يرجّع [[true]]، ولو [[null]] يرجّع [[false]]. و [[obj instanceof F]] نفس الـ loop بالظبط بس بيقارن بـ [[F.prototype]] (إلا لو [[F]] ليها [[ [Symbol.hasInstance] ]]، درس «Function»).

والـ [[obj.__proto__]] (getter و setter على [[Object.prototype]]) هو نفس [[getPrototypeOf]] و [[setPrototypeOf]] بشكل قديم ومهجور في MDN. وعلى [[Object.create(null)]] مش موجود: [[n.__proto__ = {...}]] عملت خاصية عادية اسمها [[__proto__]] والـ prototype فضل [[null]] (اتجرّب).

**ليه بطيء:** V8 بيحسّن الوصول للخصايص بـ «shapes» (hidden classes)، وكل shape مربوط بـ prototype. تغيير الـ prototype بعد الإنشاء بيخلّي الـ object ياخد shape جديد، وتغيير prototype **لـ objects كتير** بيخلّي المحرك يرمي الكاش اللي عامله لأي كود بيقرا منهم. قياسنا (مليون object): الإنشاء بـ [[setPrototypeOf]] من ١٥٠ لـ ٤٥٠ ms، وبـ [[Object.create]] من ٣٠ لـ ١٣٠ ms، ونداء الـ method بعدها كان قريب في الاتنين.`,
            when: R`[[isPrototypeOf]]: فحص نوع objects مالهاش constructor، أو لما [[instanceof]] مش متاح (مفيش دالة) أو مش موثوق (عابر لـ iframes). [[setPrototypeOf]]: في أدوات وتجارب صغيرة، أو object واحد في بداية البرنامج، أو لما الـ object جاي جاهز ومش بتاعك. في أي حاجة بتتعمل كتير: [[Object.create(proto)]] أو [[class]] أو [[{ __proto__: proto, ... }]]. و [[Object.create(null)]] لأي قاموس مفاتيحه من برّه، أو استخدم [[Map]].`,
            mistakes: R`- تستخدم [[setPrototypeOf]] جوه loop أو factory بتتنادى كتير.
- تقلب الترتيب: [[obj.isPrototypeOf(proto)]] بدل [[proto.isPrototypeOf(obj)]].
- تعمل [[X.isPrototypeOf(obj)]] على الـ constructor نفسه: الصح [[X.prototype.isPrototypeOf(obj)]].
- تنادي [[dict.isPrototypeOf]] أو أي method من [[Object.prototype]] على [[Object.create(null)]]: مش موجودة. استخدم [[Object.prototype.isPrototypeOf.call(...)]] أو [[Object.getPrototypeOf]].
- object عادي كقاموس لمفاتيح من يوزر: [[constructor]] و [[toString]] بيرجعوا دوال، و [[__proto__]] بتختفي (تمرين التحدي).
- سلسلة دايرية: [[TypeError: Cyclic __proto__ value]].`,
          },
          teach: R`## الفكرة في سطرين

الـ prototype بيتحدد عادة وقت الإنشاء. [[Object.setPrototypeOf]] بيغيّره بعدين، و [[isPrototypeOf]] بيسأل عن السلسلة كلها. كل اللي تحت من Node 24.22 كملف [[.mjs]].

---

## ١. [[Object.setPrototypeOf]]

~~~js
const animal = { speak() { return this.name + ' بيعمل صوت'; } };
const dog = { name: 'Rex' };
console.log(typeof dog.speak);
Object.setPrototypeOf(dog, animal);
console.log(dog.speak());
~~~

~~~text الناتج
undefined
Rex بيعمل صوت
~~~

قبل التغيير [[dog]] مفيهوش [[speak]]. بعده [[dog.speak()]] اتقرت من [[animal]]، و [[this]] جواها [[dog]] (اللي قبل النقطة). [[setPrototypeOf]] بترجّع [[dog]] نفسه.

| اللي بتبعته | اللي حصل (اتجرّب) |
|---|---|
| [[setPrototypeOf(obj, otherObj)]] | السلسلة اتغيّرت، والقراية بقت تدوّر في [[otherObj]] |
| [[setPrototypeOf(obj, null)]] | object من غير prototype: [[toString]] بقت [[undefined]] |
| [[setPrototypeOf(obj, 5)]] | رمت [[TypeError: Object prototype may only be an Object or null: 5]] لأن الرقم مش object |
| [[setPrototypeOf(animal, dog)]] بعد ما [[dog]] ورث [[animal]] | رمت [[TypeError: Cyclic __proto__ value]] لأن السلسلة هتلف على نفسها |
| [[setPrototypeOf(1, {})]] | رجّعت [[1]] زي ما هو ومحصلش أي تغيير |
| object مقفول بـ [[preventExtensions]] | رمت [[TypeError: #<Object> is not extensible]] لأن الـ object مقفول |

### الشكل القديم: [[obj.__proto__ = x]]

نفس الحاجة، بس من getter و setter على [[Object.prototype]]، وMDN معلّمها deprecated. استخدم [[Object.getPrototypeOf]] و [[Object.setPrototypeOf]] (أو [[__proto__]] **جوه الـ literal** بس، ودي حاجة تانية في المواصفات).

---

## ٢. [[Object.prototype.isPrototypeOf]]

~~~js
console.log(animal.isPrototypeOf(dog), Object.prototype.isPrototypeOf(dog));
~~~

~~~text الناتج
true true
~~~

[[animal]] الأب المباشر، و [[Object.prototype]] الجد. الاتنين [[true]] لأن السؤال عن السلسلة كلها.

### [[isPrototypeOf]] ضد [[instanceof]]

~~~js
class Shape {}
class Circle extends Shape {}
const c = new Circle();
console.log(Shape.prototype.isPrototypeOf(c), c instanceof Shape);
~~~

~~~text الناتج
true true
~~~

| | [[proto.isPrototypeOf(obj)]] | [[obj instanceof F]] |
|---|---|---|
| بيقارن بـ | الـ object اللي بتديهوله | [[F.prototype]] الحالي |
| محتاج دالة؟ | لأ، أي object | أيوه، [[F]] لازم يبقى callable |
| بيتأثر بـ [[Symbol.hasInstance]] | لأ | أيوه |
| لو [[F.prototype]] اتغيّر بعد الإنشاء | مش بيتأثر | بيرجّع [[false]] للقديم |

---

## ٣. [[Object.create(null)]]: object من غير جد

~~~js
const dict = Object.create(null);
dict.toString = 'مش دالة';
console.log(Object.prototype.isPrototypeOf(dict), dict instanceof Object, Object.keys(dict));
~~~

~~~text الناتج
false false [ 'toString' ]
~~~

[[dict]] مش وارث من [[Object.prototype]]، فـ [[instanceof Object]] بـ [[false]]، و [[toString]] بقت مفتاح عادي زي أي مفتاح. ده «قاموس» نضيف: مفيش [[constructor]] ولا [[hasOwnProperty]] ولا [[__proto__]] مستخبيين. والتمن: مفيش methods خالص، فـ [[String(dict)]] و [[dict + '']] بيرموا، واستخدم [[Object.hasOwn]] و [[Object.keys]] (static).

---

## ٤. ليه [[setPrototypeOf]] بطيء: الرقم

~~~js
function viaCreate(i) { const o = Object.create(proto); o.w = i; o.h = 2; return o; }
function viaSet(i) { const o = { w: i, h: 2 }; Object.setPrototypeOf(o, proto); return o; }
~~~

~~~text الناتج (مليون object، Node 24.22، أول تشغيل وتاني تشغيل)
Object.create    إنشاء    68 ms | نداء   108 ms true
setPrototypeOf   إنشاء   174 ms | نداء    63 ms true
Object.create    إنشاء    28 ms | نداء    61 ms true
setPrototypeOf   إنشاء   152 ms | نداء    88 ms true
~~~

على ٣ تشغيلات كمان الإنشاء بـ [[setPrototypeOf]] كان دايمًا أبطأ (٣ لـ ٨ مرات)، والنداء بعدها كان قريب ومتذبذب. يعني التمن الأكبر في لحظة التغيير نفسها. وفي برنامج حقيقي التغيير ده بيبوّظ كمان الكاش اللي المحرك عامله للكود اللي بيقرا من الـ objects دي. عشان كده: حدّد الـ prototype وقت الإنشاء.

---

## الخلاصة

- [[Object.setPrototypeOf(obj, proto)]] شغالة، بس بطيئة: استخدم [[Object.create]] أو [[class]].
- [[proto.isPrototypeOf(obj)]]: السلسلة كلها، من غير constructor.
- [[instanceof]] = نفس الفحص بـ [[F.prototype]] الحالي.
- [[Object.create(null)]] للقواميس اللي مفاتيحها من برّه.`,
          lines: [
            R`object فيه method واحدة. [[this.name]] جواها هيبقى اسم اللي بينادي.`,
            R`object تاني فيه [[name]] بس، ومفيهوش [[speak]].`,
            R`قبل أي تغيير: [[dog.speak]] مش موجودة، فـ [[typeof]] بيطبع [[undefined]].`,
            R`[[setPrototypeOf]] بيخلّي [[animal]] هو الـ prototype بتاع [[dog]] بعد ما اتعمل. من دلوقتي أي حاجة مش في [[dog]] بتتدوّر في [[animal]].`,
            R`[[dog.speak()]] اشتغلت ([[Rex بيعمل صوت]])، و [[animal]] في السلسلة ([[true]])، و [[Object.prototype]] في السلسلة كمان ([[true]]).`,
            R`class أساسي فاضي، هنستخدمه عشان نقارن [[isPrototypeOf]] بـ [[instanceof]] على نفس السلسلة.`,
            R`class وارثة منه، فـ [[Circle.prototype]] الـ prototype بتاعه [[Shape.prototype]].`,
            R`object جديد من [[Circle]]، سلسلته: [[Circle.prototype]] ثم [[Shape.prototype]] ثم [[Object.prototype]].`,
            R`[[Shape.prototype.isPrototypeOf(c)]] و [[c instanceof Shape]] الاتنين [[true]]: نفس السؤال بشكلين. لاحظ إن [[isPrototypeOf]] بتتنادى على [[Shape.prototype]] مش [[Shape]].`,
            R`object من غير prototype خالص: ده قاموس نضيف.`,
            R`[[toString]] هنا خاصية عادية قيمتها نص، ومفيش [[Object.prototype.toString]] تتغطّى أصلًا.`,
            R`[[false false [ 'toString' ] ]]: مش وارث من [[Object.prototype]]، و [[instanceof Object]] غلط، و [[toString]] مفتاح زي أي مفتاح.`,
            R`سلسلة دايرية: [[dog]] وارث [[animal]]، فلو [[animal]] ورث [[dog]] هيلفوا للأبد، والمحرك بيرفض بـ [[Cyclic __proto__ value]].`,
            R`prototype رقم: مرفوض بـ [[Object prototype may only be an Object or null: 5]].`,
          ],
          ref: [
            { t: "MDN: Object.setPrototypeOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf" },
            { t: "MDN: Object.prototype.isPrototypeOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf" },
            { t: "MDN: Object.prototype.__proto__ (deprecated)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto" },
            { t: "MDN: Inheritance and the prototype chain", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" },
            { t: "ECMAScript: Object.setPrototypeOf", url: "https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.setprototypeof" }
          ],
          pre: [{ to: "js/prototype chain", why: R`[[Object.getPrototypeOf]] و [[Object.create]] والقراية في السلسلة` }, { to: "js/extends و super", why: R`السلسلة اللي [[extends]] بتعملها بين الـ classes` }, "js/enumerability و ownership"]
        },
        {
          cmd: "valueOf و toString و Symbol.toPrimitive",
          title: "لما object يدخل في + أو > أو نص: JavaScript بيحوّله لإيه، وانت تتحكم في ده إزاي؟",
          desc: R`لما object يتستخدم مكان رقم أو نص ([[price + 10]] أو [[price > 100]] أو [[String(price)]])، JavaScript بيحوّله لـ primitive بـ ٣ methods: [[valueOf]] (القيمة كرقم)، و [[toString]] (كنص)، و [[ [Symbol.toPrimitive](hint) ]] اللي لو موجودة بتكسب على الاتنين وبتعرف المكان عايز إيه ([[hint]]: [['number']] أو [['string']] أو [['default']]). و [[toLocaleString]] مش بتدخل في التحويل التلقائي: بتتنادى بإيدك عشان العرض باللغة.

الافتراضي من [[Object.prototype]]: [[valueOf]] بيرجّع الـ object نفسه (مش primitive، فبيتجاهل)، و [[toString]] بيرجّع [["[object Object]"]]، و [[toLocaleString]] بينادي [[toString]]. عشان كده [[{} + 1]] بيطلع [["[object Object]1"]].

والفخ الأشهر: [[+]] و [[==]] بيبعتوا hint [['default']] ودي بتتعامل زي [['number']]، فـ [[price + '']] بيستخدم [[valueOf]] مش [[toString]].`,
          example: R`// object فلوس بيتحوّل لرقم أو نص حسب المكان اللي اتستخدم فيه
const price = {
  cents: 12550,
  currency: 'EGP',
  valueOf() { return this.cents / 100; },
  toString() { return (this.cents / 100).toFixed(2) + ' ' + this.currency; },
  toLocaleString(locale = 'ar-EG') {
    return new Intl.NumberFormat(locale, { minimumFractionDigits: 2 }).format(this.cents / 100) + ' ' + this.currency;
  },
};
console.log(price + 10, price * 2, price > 100);
console.log(String(price), price + '', [price].join());
console.log(price.toLocaleString(), price.toLocaleString('en-US'), [price].toLocaleString());
const plain = { a: 1 };
console.log(plain.valueOf() === plain, plain.toString(), plain.toLocaleString(), plain + 1);
const hinted = { [Symbol.toPrimitive](hint) { return hint === 'number' ? 42 : 'hint=' + hint; } };
console.log(+hinted, String(hinted), hinted + '');`,
          try: R`اعمل object فيه [[ [Symbol.toPrimitive](hint) ]] بيطبع الـ [[hint]] قبل ما يرجّع، وجرّب عليه ٦ أماكن: [[+t]] و template literal فيه [[t]] و [[t + '']] و [[t * 1]] و [[t == 'x']] و [[String(t)]]. وبعدين اعمل object فيه [[valueOf]] و [[toString]] الاتنين بيرجّعوا [[{}]] وجرّب [[obj + 1]].`,
          sol: R`~~~js hints.mjs
const t = {
  [Symbol.toPrimitive](hint) { console.log('hint', hint); return hint === 'number' ? 42 : 'نص'; },
};
console.log(+t); console.log(String(t)); console.log(t + ''); console.log(t * 1); console.log(t == 'نص');
const bad = { valueOf() { return {}; }, toString() { return {}; } };
try { bad + 1; } catch (e) { console.log(e.message); }
~~~

~~~text الناتج (Node 24.22)
hint number
42
hint string
نص
hint default
نص
hint number
42
hint default
true
Cannot convert object to primitive value
~~~

والـ template literal ([[$__bt$__{t}$__bt]]) طبع [[hint string]] زي [[String(t)]] بالظبط.

| المكان | الـ hint |
|---|---|
| [[+t]] و [[t * 1]] و [[t > 5]] و [[Math.max(t)]] و [[Number(t)]] | [['number']] |
| [[String(t)]] و template literal و مفتاح [[ obj[t] ]] | [['string']] |
| [[t + x]] و [[t == x]] | [['default']] |

ولو مفيش method بترجّع primitive (حتى [[Symbol.toPrimitive]] لو رجّعت object) بيترمي [[TypeError: Cannot convert object to primitive value]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** object فيه [[valueOf]] بيرجّع 10 و [[toString]] بيرجّع [['T']]. اكتب الـ ٦ قيم بالترتيب قبل التشغيل:

~~~js
const o = { valueOf() { return 10; }, toString() { return 'T'; } };
console.log(String(o), o + '', o * 2, [o].join(), o + o, o > 9);
~~~`, done: R`كتبت [[T 10 20 T 20 true]] وطلع كده، وتقدر تقول ليه [[o + '']] بقت [[10]] مش [[T]].`, sol: R`~~~text الناتج (Node 24.22)
T 10 20 T 20 true
~~~

- [[String(o)]] و [[[o].join()]]: hint [['string']]، فـ [[toString]] الأول: [[T]].
- [[o + '']]: hint [['default']] اللي بيمشي زي [['number']]، فـ [[valueOf]] الأول: [[10]]، وبعدين [[10 + '']] = [["10"]].
- [[o * 2]] و [[o + o]] و [[o > 9]]: [[valueOf]]، فـ 20 و 20 و [[true]].

والـ template literal ([[$__bt$__{o}$__bt]]) بيطلّع [[T]] زي [[String(o)]]. يعني [[o + '']] و الـ template **مش** نفس الحاجة لما الـ object فيه [[valueOf]]، وده بيفاجئ ناس كتير في أي object زي [[Date]] أو Money.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[temperature(celsius)]] بترجّع object فيه [[ [Symbol.toPrimitive](hint) ]]: مع [['number']] يرجّع الرقم، ومع أي hint تاني يرجّع نص زي [['36.6°C']]. وفيه [[toLocaleString(locale = 'ar-EG')]] بيستخدم [[Intl.NumberFormat]] بـ [[style: 'unit']] و [[unit: 'celsius']].`, done: R`[[+t]] بـ 36.6، و [[t > 37]] بـ [[false]]، و [[String(t)]] و [['الحرارة ' + t]] فيهم [[°C]]، و [[t.toLocaleString()]] بالعربي، و [[[t1, t2].toLocaleString()]] بيستخدم الـ method بتاعتك لكل عنصر.`, sol: R`~~~js temperature.mjs
function temperature(celsius) {
  return {
    celsius,
    [Symbol.toPrimitive](hint) {
      if (hint === 'number') return this.celsius;
      return this.celsius + '°C';
    },
    toLocaleString(locale = 'ar-EG') {
      return new Intl.NumberFormat(locale, { style: 'unit', unit: 'celsius', maximumFractionDigits: 1 }).format(this.celsius);
    },
  };
}
const t = temperature(36.6);
console.log(+t, t > 37, String(t), 'الحرارة ' + t);
console.log(t.toLocaleString(), t.toLocaleString('en-US'));
console.log([temperature(20), temperature(18.25)].toLocaleString());
~~~

~~~text الناتج (Node 24.22)
36.6 false 36.6°C الحرارة 36.6°C
٣٦٫٦°م 36.6°C
٢٠°م,١٨٫٣°م
~~~

**الشرح:** [[Symbol.toPrimitive]] بيكسب على [[valueOf]] و [[toString]]، فمكتبناهمش. و [[t > 37]] hint [['number']] فاتقارن بالرقم، و [['الحرارة ' + t]] hint [['default']] فرجع النص (عكس الـ [[valueOf]] في التمرين اللي فات). و [[Array.prototype.toLocaleString]] بينادي [[toLocaleString]] على كل عنصر ويفصل بـ [[,]] (الفاصل مش بيتترجم). و [[18.25]] بقت [[١٨٫٣]] بسبب [[maximumFractionDigits: 1]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** أسعار متخزنة كـ objects فيها [[valueOf]] بالقروش، و [[sort()]] رتّبها غلط:

~~~js
const money = (cents) => ({ cents, valueOf() { return this.cents; }, toString() { return (this.cents / 100).toFixed(2) + ' EGP'; } });
const prices = [money(9000), money(15000), money(2500)];
console.log(prices.slice().sort().map(String));
~~~`, done: R`الترتيب طلع [[25.00 EGP]] ثم [[90.00 EGP]] ثم [[150.00 EGP]]، وتعرف ليه [[sort()]] من غير دالة استخدم [[toString]].`, sol: R`~~~text الناتج قبل التصليح
[ '150.00 EGP', '25.00 EGP', '90.00 EGP' ]
~~~

[[sort()]] من غير دالة مقارنة بيحوّل كل عنصر **لنص** (hint [['string']]، يعني [[toString]]) ويقارن النصوص حرف حرف، فـ [["150..."]] قبل [["25..."]] لأن [["1"]] قبل [["2"]].

~~~js sort-money.mjs
const money = (cents) => ({ cents, valueOf() { return this.cents; }, toString() { return (this.cents / 100).toFixed(2) + ' EGP'; } });
const prices = [money(9000), money(15000), money(2500)];
console.log(prices.slice().sort((a, b) => a - b).map(String));
~~~

~~~text الناتج (Node 24.22)
[ '25.00 EGP', '90.00 EGP', '150.00 EGP' ]
~~~

[[a - b]] بيبعت hint [['number']]، فـ [[valueOf]] بيرجّع القروش والطرح بيقارن أرقام. وأوضح منها لو حد بيقرا الكود: [[(a, b) => a.cents - b.cents]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[duration(seconds)]] بترجّع object: [[valueOf]] بيرجّع الثواني، و [[toString]] بيرجّع [['ساعات:دقايق:ثواني']] بدقايق وثواني دايمًا رقمين ([['1:05:09']]). لازم [[a > b]] و [[a - b]] يشتغلوا بالأرقام، و [[String(a)]] يرجّع الشكل.`, done: R`[[String(duration(3909))]] بـ [['1:05:09']]، و [[duration(3909) > duration(60)]] بـ [[true]]، و [[[duration(59), duration(3600)].join(' و ')]] بيطلّع [[0:00:59 و 1:00:00]]، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js duration.mjs
function duration(seconds) {
  return {
    seconds,
    valueOf() { return this.seconds; },
    toString() {
      const h = Math.floor(this.seconds / 3600);
      const m = Math.floor((this.seconds % 3600) / 60);
      const s = this.seconds % 60;
      return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    },
  };
}
const a = duration(3909);
console.log(String(a), a + 0, a > duration(60), [duration(59), duration(3600)].join(' و '));
~~~

~~~text الناتج (Node 24.22)
1:05:09 3909 true 0:00:59 و 1:00:00
~~~

**الشرح:** ٣٩٠٩ ثانية = ساعة (٣٦٠٠) + ٣٠٩، و ٣٠٩ = ٥ دقايق (٣٠٠) + ٩. و [[padStart(2, '0')]] بيخلي ٥ تبقى [["05"]]. و [[join]] بينادي [[toString]] على كل عنصر. ولاحظ [[a + 0]] طلّع [[3909]] مش النص: الـ [[+]] بيروح لـ [[valueOf]] الأول.` },
          ],
          check: { lang: "js", starter: R`function duration(seconds) {
  return {
    seconds,
    // valueOf: الثواني، و toString: "h:mm:ss"
  };
}`, tests: R`test("String", () => expect(String(duration(3909))).toBe('1:05:09'));
test("صفر", () => expect(String(duration(0))).toBe('0:00:00'));
test("ساعة بالظبط", () => expect(String(duration(3600))).toBe('1:00:00'));
test("مقارنة", () => expect(duration(3909) > duration(60)).toBe(true));
test("طرح", () => expect(duration(100) - duration(40)).toBe(60));
test("join", () => expect([duration(59), duration(61)].join(' ')).toBe('0:00:59 0:01:01'));
test("أكتر من ١٠ ساعات", () => expect(String(duration(36000 + 61))).toBe('10:01:01'));`, solution: R`function duration(seconds) {
  return {
    seconds,
    valueOf() { return this.seconds; },
    toString() {
      const h = Math.floor(this.seconds / 3600);
      const m = Math.floor((this.seconds % 3600) / 60);
      const s = this.seconds % 60;
      return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    },
  };
}` },
          flag: "script",
          deep: {
            why: R`أي object بيمثل قيمة (فلوس، مدة، حرارة، تاريخ، نسخة برنامج) هيتحط في نص أو مقارنة أو حساب في مكان ما. لو مش متحكم في التحويل هتشوف [["[object Object]"]] في الواجهة، أو [[NaN]] في الحساب، أو مقارنة بتشتغل «صدفة». وفهم الـ hints بيفسّر سلوك [[Date]] الغريب: [[new Date(0) + 1]] نص و [[new Date(0) - 0]] رقم.`,
            how: R`لما المحرك محتاج primitive من object بيعمل ToPrimitive بـ hint:

1. لو فيه [[ obj[Symbol.toPrimitive] ]]: بيناديها بالـ hint، ولو رجّعت primitive خلاص، ولو رجّعت object يرمي [[TypeError]].
2. لو مفيش: لو الـ hint [['string']] بيجرّب [[toString]] وبعدين [[valueOf]]. ولو [['number']] أو [['default']] بيجرّب [[valueOf]] وبعدين [[toString]]. أول واحدة ترجّع primitive بتكسب.
3. لو الاتنين رجّعوا objects: [[TypeError: Cannot convert object to primitive value]].

و [[Object.prototype.valueOf]] بيرجّع [[this]] (object)، فبيتعدّى في الخطوة ٢ وبيكسب [[toString]] اللي بيرجّع [["[object Object]"]]. و [[Date.prototype]] عنده [[Symbol.toPrimitive]] بيعامل [['default']] كأنها [['string']]، عشان كده [[typeof (d + 1)]] بـ [[string]] و [[d - 0]] بـ [[0]] (اتجرّبوا).

و [[Object.prototype.toLocaleString]] مجرد [[return this.toString()]]، والفكرة إن كل نوع يعمل override: [[Number]] و [[Date]] و [[Array]] (بينادي [[toLocaleString]] على كل عنصر). اتجرّب: [[[1234.5].toLocaleString('de-DE')]] طلّع [[1.234,5]].`,
            when: R`[[toString]] لأي object هيظهر في لوج أو رسالة: خليه يرجّع شكل مقروء. [[valueOf]] لما الـ object فعلًا «رقم» ومقارنته بـ [[<]] و [[>]] و [[-]] منطقية (مدة، نسخة). [[Symbol.toPrimitive]] لما عايز تحكم كامل: نص في النصوص ورقم في الحسابات، أو ترمي error في [['default']] عشان تمنع [[+]] الملتبس (مشروع Money في الوحدة). [[toLocaleString]] للعرض لليوزر بلغته، ومتعتمدش على التحويل التلقائي للعرض.`,
            mistakes: R`- تفتكر [[obj + '']] زي [[String(obj)]]: الأولى [[valueOf]] الأول.
- [[valueOf]] بترجّع object (أو [[this]]) وتستغرب إنه مش بيتستخدم.
- [[sort()]] من غير دالة على objects بيرتّب بـ [[toString]].
- [[==]] بين object ورقم بيعمل تحويل ([[m == 10]] بـ [[true]]) و [[===]] لأ ([[false]]): ده من أسباب «استخدم [[===]]».
- [[JSON.stringify]] مش بيستخدم أي واحدة فيهم: object فيه [[toString]] و [[valueOf]] بس طلع [[{"tpl":{}}]] (اتجرّب). JSON محتاج [[toJSON]].
- [[new Number(5)]]: object مش رقم، [[typeof]] بـ [[object]]، بس [[+ 1]] بيطلع 6 بالـ [[valueOf]].`,
          },
          teach: R`## الفكرة في سطرين

الـ object مش رقم ولا نص، فلما يتحط في مكان محتاج واحد منهم JavaScript بيسأله يتحوّل إزاي. انت بتجاوب بـ [[valueOf]] و [[toString]]، أو بـ [[Symbol.toPrimitive]] اللي بتشوف السؤال نفسه. الناتج من Node 24.22.

---

## ١. [[Object.prototype.valueOf]] و [[Object.prototype.toString]]: الافتراضي

~~~js
const plain = { a: 1 };
console.log(plain.valueOf() === plain, plain.toString(), plain.toLocaleString(), plain + 1);
~~~

~~~text الناتج
true [object Object] [object Object] [object Object]1
~~~

| الـ method الافتراضية | بترجّع | يعني إيه في التحويل |
|---|---|---|
| [[Object.prototype.valueOf]] | الـ object نفسه | مش primitive، فالمحرك بيتجاهلها ويروح للي بعدها |
| [[Object.prototype.toString]] | [["[object Object]"]] | دي اللي بتكسب في أي object عادي |
| [[Object.prototype.toLocaleString]] | نفس [[this.toString()]] | موجودة عشان الأنواع التانية تعمل override |

عشان كده [[plain + 1]] بقت نص: [["[object Object]" + 1]].

---

## ٢. Money بـ [[valueOf]] و [[toString]]

~~~js
valueOf() { return this.cents / 100; },
toString() { return (this.cents / 100).toFixed(2) + ' ' + this.currency; },
~~~

~~~text الناتج
135.5 251 true
125.50 EGP 125.5 125.50 EGP
~~~

السطر الأول حسابات: [[price + 10]] = 135.5 و [[price * 2]] = 251 و [[price > 100]] = [[true]]، كلهم [[valueOf]]. السطر التاني نصوص: [[String(price)]] و [[[price].join()]] طلّعوا [[125.50 EGP]] من [[toString]]، بس [[price + '']] طلّع [[125.5]] من غير العملة.

### ليه [[price + '']] أخدت [[valueOf]]؟

الـ [[+]] مش عارف هو جمع ولا لزق نصوص لحد ما يحوّل الاتنين، فبيبعت hint اسمه [['default']]، و [['default']] بيتعامل زي [['number']]: [[valueOf]] الأول. فالقاعدة:

| المكان | الـ hint | الترتيب |
|---|---|---|
| [[String(x)]]، template literal، [[join]]، مفتاح [[ obj[x] ]] | [['string']] | [[toString]] ثم [[valueOf]] |
| [[+x]] و [[x * 2]] و [[x > y]] و [[Number(x)]] و [[x - y]] | [['number']] | [[valueOf]] ثم [[toString]] |
| [[x + y]] و [[x == y]] | [['default']] | زي [['number']] (إلا [[Date]]) |

---

## ٣. [[Object.prototype.toLocaleString]]: العرض بلغة اليوزر

~~~js
toLocaleString(locale = 'ar-EG') {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 2 }).format(this.cents / 100) + ' ' + this.currency;
},
~~~

~~~text الناتج
١٢٥٫٥٠ EGP 125.50 EGP ١٢٥٫٥٠ EGP
~~~

[[toLocaleString]] مش بتتنادى في أي تحويل تلقائي. انت بتناديها بإيدك، أو حاجة بتناديها زي [[Array.prototype.toLocaleString]] (التالتة: [[[price].toLocaleString()]] نادت الـ method بتاعتنا على العنصر). والـ [[Intl.NumberFormat]] بالـ [[minimumFractionDigits: 2]] بيكتب [[١٢٥٫٥٠]] بالأرقام العربي والفاصلة العشرية العربي (درس «Number: toFixed و toString و toLocaleString»).

---

## ٤. [[Symbol.toPrimitive]]: method واحدة بتعرف السؤال

~~~js
const hinted = { [Symbol.toPrimitive](hint) { return hint === 'number' ? 42 : 'hint=' + hint; } };
console.log(+hinted, String(hinted), hinted + '');
~~~

~~~text الناتج
42 hint=string hint=default
~~~

لو موجودة، [[valueOf]] و [[toString]] مبيتسألوش في التحويل خالص. وبتاخد الـ hint كـ argument، فتقدر تفرّق بين [['default']] و [['number']] (اللي [[valueOf]] مبتقدرش). استخدام مهم: ترمي error في [['default']] عشان [[price + 10]] الملتبسة متعدّيش (مشروع «Money» في الوحدة دي).

---

## ٥. الأنواع اللي جاهزة

| النوع | [['default']] بيروح لـ | اتجرّب |
|---|---|---|
| [[Date]] | نص (عنده [[Symbol.toPrimitive]] خاص) | [[typeof (new Date(0) + 1)]] بـ [[string]]، و [[new Date(0) - 0]] بـ [[0]] |
| [[Array]] | [[toString]] = [[join(',')]] | [[[] + []]] نص فاضي، و [[[1] * [2]]] بـ [[2]] |
| [[Number]] object | [[valueOf]] = الرقم | [[new Number(5) + 1]] بـ [[6]] |

---

## الخلاصة

- التحويل بيسأل [[Symbol.toPrimitive]] الأول، ولو مش موجودة [[valueOf]] و [[toString]] بترتيب حسب الـ hint.
- [[+]] و [[==]] hint [['default']] = رقم الأول، فـ [[obj + '']] مش زي [[String(obj)]].
- [[valueOf]] الافتراضية بترجّع الـ object نفسه، و [[toString]] [["[object Object]"]].
- [[toLocaleString]] للعرض وبتتنادى بإيدك، و JSON محتاج [[toJSON]] مش دول.`,
          lines: [
            R`بداية object بيمثل مبلغ. هنحط فيه طرق التحويل التلاتة.`,
            R`المبلغ متخزن قروش (integer) عشان مفيش كسور floating point.`,
            R`العملة كنص، هتظهر في [[toString]] و [[toLocaleString]].`,
            R`[[valueOf]]: لما حد يعامل المبلغ كرقم ([[+]] و [[*]] و [[>]]) بيرجّع الجنيهات: 125.5.`,
            R`[[toString]]: لما حد يعامله كنص بيرجّع [["125.50 EGP"]]. [[toFixed(2)]] بيثبّت رقمين بعد العلامة.`,
            R`[[toLocaleString]] بـ locale افتراضي [['ar-EG']]: مش بتتنادى لوحدها، دي للعرض بلغة اليوزر.`,
            R`[[Intl.NumberFormat]] بيكتب الرقم بأرقام وفاصلة اللغة، و [[minimumFractionDigits: 2]] بيخلي 125.5 تبقى 125.50، وبعدها العملة.`,
            R`قفلة [[toLocaleString]].`,
            R`قفلة الـ object.`,
            R`حسابات: [[valueOf]] في التلاتة، فـ [[135.5 251 true]].`,
            R`[[String]] و [[join]] استخدموا [[toString]] ([[125.50 EGP]])، بس [[price + '']] استخدمت [[valueOf]] ([[125.5]]) لأن [[+]] بيبعت hint [['default']].`,
            R`[[toLocaleString()]] بالعربي، و [['en-US']] بالإنجليزي، و [[[price].toLocaleString()]] الـ array نادت الـ method بتاعتنا على العنصر.`,
            R`object عادي من غير أي method بتاعته، عشان نشوف الافتراضي من [[Object.prototype]].`,
            R`[[valueOf]] رجّعت الـ object نفسه ([[true]])، و [[toString]] و [[toLocaleString]] [["[object Object]"]]، و [[plain + 1]] بقت نص [["[object Object]1"]].`,
            R`object بـ [[Symbol.toPrimitive]] بيرجّع 42 لو الـ hint رقم، وإلا بيرجّع اسم الـ hint كنص عشان نشوفه.`,
            R`[[+hinted]] بعت [['number']] فرجع 42، و [[String]] بعت [['string']]، و [[+ '']] بعت [['default']].`,
          ],
          ref: [
            { t: "MDN: Object.prototype.valueOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf" },
            { t: "MDN: Object.prototype.toLocaleString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString" },
            { t: "MDN: Object.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" },
            { t: "MDN: Symbol.toPrimitive", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive" },
            { t: "MDN: Type coercion (primitive coercion)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_coercion" },
            { t: "ECMAScript: ToPrimitive", url: "https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive" }
          ],
          pre: [{ to: "js/== و ===", why: R`التحويل التلقائي اللي بيحصل في [[==]]` }, "js/method definitions و property accessors", { to: "js/Number: toFixed و toString و toLocaleString", why: R`[[toFixed]] و [[Intl.NumberFormat]] بالعربي` }]
        },
        {
          cmd: "Function: length و name و toString و new.target",
          title: "الدالة object زي أي object: عدد الـ parameters بتاعها، واسمها، وكودها، و instanceof بتاعك، وعرفت إنها اتنادت بـ new",
          desc: R`كل دالة في JavaScript object من نوع [[Function]]، وليها خصايص: [[length]] (عدد الـ parameters «المطلوبة»: بيقف عند أول default أو rest)، و [[name]] (اسمها، حتى لو اتعرّفت في متغير)، و [[toString()]] (الكود بتاعها كنص). وتقدر تغيّر معنى [[instanceof]] لـ class بـ [[ static [Symbol.hasInstance](x) ]]. وجوه الدالة [[new.target]] بيقولك اتنادت بـ [[new]] ولا لأ، ومين الـ class اللي اتعمل فعلًا.

و [[new Function('a', 'b', 'return a + b')]] بيعمل دالة من نص وقت التشغيل، وده نفس خطر [[eval]]: متستخدمهوش مع input من يوزر، والمتصفحات اللي فيها CSP بتمنعه.

الدرس ده بيكمّل «function و arrow» و «call و apply و bind» (اللي اتشرح فيهم [[bind]] و [[call]])، وبيوصّل لدرس «arguments object» بعده.`,
          example: R`// الدالة object: ليها length و name و toString، وتعرف اتنادت بـ new ولا لأ
function area(w, h = w, ...rest) { return w * h; }
const add = (a, b) => a + b;
console.log(area.length, add.length, ((a, b = 1, c) => 0).length, ((...xs) => 0).length);
console.log(area.name, add.name, add.bind(null).name, (() => {}).name);
console.log(add.toString(), '|', Math.max.toString());
class Even {
  static [Symbol.hasInstance](n) { return Number.isInteger(n) && n % 2 === 0; }
}
console.log(4 instanceof Even, 3 instanceof Even, '4' instanceof Even);
function Point(x) {
  if (!new.target) return new Point(x);
  this.x = x;
}
console.log(Point(3).x, new Point(5).x);
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 3), sum.name, sum.length, typeof Function.prototype, area instanceof Function);`,
          try: R`في [[fn.mjs]]: (١) اطبع [[Object.getOwnPropertyDescriptor((a, b) => 0, 'length')]]. (٢) اعمل [[function F() {}]] وحاول تكتب [[F[Symbol.hasInstance] = () => true]]: إيه اللي حصل؟ وبعدين اعملها بـ [[Object.defineProperty]] وجرّب [[({}) instanceof F]]. (٣) اطبع [[toString()]] لـ class، ولـ method بالشكل المختصر، ولدالة فيها تعليق جوه الـ parameters.`,
          sol: R`~~~js fn.mjs
console.log(Object.getOwnPropertyDescriptor((a, b) => 0, 'length'));
function F() {}
try { F[Symbol.hasInstance] = () => true; } catch (e) { console.log(e.message); }
Object.defineProperty(F, Symbol.hasInstance, { value: () => true });
console.log({} instanceof F);
console.log(class Cat { meow() { return 1; } }.toString());
const obj = { describe() { return 1; } };
console.log(obj.describe.toString());
function add2(a, /* تعليق */ b) { return a + b; }
console.log(add2.toString());
~~~

~~~text الناتج (Node 24.22)
{ value: 2, writable: false, enumerable: false, configurable: true }
Cannot assign to read only property 'Symbol(Symbol.hasInstance)' of function 'function F() {}'
true
class Cat { meow() { return 1; } }
describe() { return 1; }
function add2(a, /* تعليق */ b) { return a + b; }
~~~

- [[length]] مبتتكتبش ([[writable: false]]) بس [[configurable: true]]، فتقدر تغيّرها بـ [[defineProperty]] لو بتعمل wrapper عايزه يبان زي الأصل.
- الكتابة العادية على [[F[Symbol.hasInstance]]] رمت: الخاصية موروثة من [[Function.prototype]] وهي [[writable: false]]، والموروث اللي مبيتكتبش بيمنع الكتابة على الابن (درس «property descriptors»). الحل [[defineProperty]] على [[F]] نفسها، أو [[static [Symbol.hasInstance]]] جوه class (ده تعريف مش إسناد).
- [[toString]] بيرجّع **الكود الأصلي حرفيًا** بالتعليقات والمسافات، وللـ method بالشكل المختصر بيرجّعها من غير [[function]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الـ ٤ أرقام قبل التشغيل:

~~~js
console.log(((a, b = 2, c) => {}).length, (function (...args) {}).length, (function (a, [b, c], { d }) {}).length, (async (x) => x).length);
~~~`, done: R`كتبت [[1 0 3 1]] وطلع كده، وتقدر تقول ليه [[c]] في الأولى متحسبتش مع إنها مش default.`, sol: R`~~~text الناتج (Node 24.22)
1 0 3 1
~~~

- [[(a, b = 2, c)]]: العدّ بيقف عند أول default، فـ [[c]] بعده متحسبتش حتى لو هي نفسها مالهاش default: 1.
- [[(...args)]]: الـ rest مش بيتحسب: 0.
- [[(a, [b, c], { d })]]: كل destructuring pattern = parameter واحد: 3.
- [[async (x) => x]]: [[async]] ملهاش دعوة: 1.

[[length]] معناها «كام argument الدالة **مستنياهم** على الأقل»، مش عدد الأسامي.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[describeFn(fn)]] بترجّع [[{ name, length, kind, type }]]: [[kind]] واحدة من [[class]] و [[arrow]] و [[method]] و [[native]] و [[bound]] و [[function]]، و [[type]] اسم الـ constructor ([[AsyncFunction]] و [[GeneratorFunction]]...). استخدم [[Function.prototype.toString.call(fn)]] و [[Object.hasOwn(fn, 'prototype')]].`, done: R`على ٨ دوال مختلفة (class، و method، و arrow، و async، و generator، و [[Math.max]]، و bound، و دالة من غير اسم) كل واحدة طلعت [[kind]] صح.`, sol: R`~~~js describe-fn.mjs
function describeFn(fn) {
  const src = Function.prototype.toString.call(fn);
  let kind = 'function';
  if (src.startsWith('class')) kind = 'class';
  else if (/\{ \[native code\] \}$/.test(src)) kind = fn.name.startsWith('bound ') ? 'bound' : 'native';
  else if (!Object.hasOwn(fn, 'prototype') && !fn.constructor.name.startsWith('Async')) kind = /^(async\s*)?(\(|[\w$]+\s*=>)/.test(src) ? 'arrow' : 'method';
  return { name: fn.name || '(من غير اسم)', length: fn.length, kind, type: fn.constructor.name };
}
class Cart { add(item) {} }
const list = [Cart, Cart.prototype.add, (a, b) => a, async function load(url) {}, function* ids() {}, Math.max, Cart.prototype.add.bind(null), function () {}];
for (const fn of list) console.log(describeFn(fn));
~~~

~~~text الناتج (Node 24.22)
{ name: 'Cart', length: 0, kind: 'class', type: 'Function' }
{ name: 'add', length: 1, kind: 'method', type: 'Function' }
{ name: '(من غير اسم)', length: 2, kind: 'arrow', type: 'Function' }
{ name: 'load', length: 1, kind: 'function', type: 'AsyncFunction' }
{ name: 'ids', length: 0, kind: 'function', type: 'GeneratorFunction' }
{ name: 'max', length: 2, kind: 'native', type: 'Function' }
{ name: 'bound add', length: 1, kind: 'bound', type: 'Function' }
{ name: '(من غير اسم)', length: 0, kind: 'function', type: 'Function' }
~~~

**الشرح:**

- [[Function.prototype.toString.call(fn)]] مش [[fn.toString()]]: لو حد عمل override لـ [[toString]] على الدالة، الأصلية لسه موثوقة.
- الـ class كوده بيبدأ بـ [[class]]. والدوال المكتوبة بـ C++ جوه المحرك ([[Math.max]]) والـ bound كودهم [[{ [native code] }]]، والـ bound اسمها بيبدأ بـ [[bound ]].
- الـ arrow والـ method مالهمش [[prototype]] (مش constructors)، والفرق بينهم إن كود الـ arrow فيه [[=>]] بعد الـ parameters. والـ async function برضه مالهاش [[prototype]]، عشان كده استثنيناها بالـ [[constructor.name]].
- ده تحليل نصي للكود، يعني تقريبي: مفيد للـ debugging والأدوات، مش للمنطق الأساسي في برنامج.` },
            { lvl: 'تطبيق', t: R`**ابني:** class [[Range]] فيها [[from]] و [[to]]، و [[ static [Symbol.hasInstance](value) ]] بيقول [[true]] لأي object فيه [[from]] و [[to]] أرقام و [[from <= to]]، حتى لو مش معمول بـ [[new Range]] (duck typing).`, done: R`[[new Range(1, 5) instanceof Range]] و [[{ from: 1, to: 3 } instanceof Range]] بـ [[true]]، و [[{ from: 5, to: 1 }]] و [[null]] و [[[1, 2]]] بـ [[false]].`, sol: R`~~~js range.mjs
class Range {
  constructor(from, to) { this.from = from; this.to = to; }
  static [Symbol.hasInstance](value) {
    return value !== null && typeof value === 'object' && Number.isFinite(value.from) && Number.isFinite(value.to) && value.from <= value.to;
  }
}
console.log(new Range(1, 5) instanceof Range, { from: 1, to: 3 } instanceof Range, { from: 5, to: 1 } instanceof Range, null instanceof Range, [1, 2] instanceof Range);
~~~

~~~text الناتج (Node 24.22)
true true false false false
~~~

**الشرح:** [[x instanceof Range]] بيدوّر الأول على [[Range[Symbol.hasInstance]]]، ولو لقاه بيناديه ويرجّع نتيجته كـ boolean من غير ما يبص على السلسلة. و [[static]] بيحطها على الـ class نفسها (مش الـ instances). وفحص [[null]] الأول ضروري: [[null.from]] بيرمي. ولاحظ إن [[new Range(5, 1) instanceof Range]] هيطلع [[false]] مع إنها اتعملت بـ [[new]]: انت غيّرت معنى [[instanceof]] بالكامل، فده سلاح ذو حدين.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** constructor function قديمة، وحد نادى عليها من غير [[new]]:

~~~js
function Product(name) {
  this.name = name;
}
const p = Product('كوباية');
console.log(p);
~~~

شغّلها مرة في [[.mjs]] ومرة في [[.cjs]]، وبعدين خلّيها ترمي رسالة واضحة لو اتنادت من غير [[new]].`, done: R`في الـ mjs شفت [[TypeError: Cannot set properties of undefined]]، وفي الـ cjs [[undefined]] واسم المنتج اتكتب في [[globalThis]]، وبعد التصليح [[Product('x')]] بترمي رسالتك و [[new Product('x')]] شغالة.`, sol: R`~~~text الناتج: node product.mjs
  this.name = name;
            ^

TypeError: Cannot set properties of undefined (setting 'name')
~~~

~~~text الناتج: node product.cjs (مع سطر زيادة console.log(p, globalThis.name))
undefined كوباية
~~~

في strict mode، [[this]] في نداء عادي [[undefined]] فوقعت. وفي sloppy، [[this]] هو [[globalThis]]، فالاسم اتكتب كمتغير global والدالة رجّعت [[undefined]] من غير أي error: ده أسوأ.

~~~js product.mjs
function Product(name) {
  if (!new.target) throw new TypeError('Product لازم يتنادى بـ new: new Product(name)');
  this.name = name;
}
console.log(new Product('كوباية'));
try { Product('كوباية'); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج (Node 24.22)
Product { name: 'كوباية' }
Product لازم يتنادى بـ new: new Product(name)
~~~

[[new.target]] بـ [[undefined]] في النداء العادي، وبيبقى الدالة نفسها مع [[new]]. والحل البديل: [[return new Product(name)]] بدل الرمي (زي [[Point]] في المثال). والحل الأحسن في كود جديد: [[class]]، لأنها بترمي لوحدها [[Class constructor Product cannot be invoked without 'new']].` },
            { lvl: 'تحدي', t: R`**مسألة:** class [[Shape]] «مجردة»: [[new Shape()]] بيرمي، وأي class وارثة منها لازم يكون فيها method اسمها [[area]] وإلا الإنشاء يرمي برسالة فيها اسم الـ class الوارثة. و [[describe()]] بترجّع [['مربع: 9']].`, done: R`[[new Square(3).describe()]] بـ [['مربع: 9']]، و [[new Shape()]] بيرمي، و class [[Blob]] من غير [[area]] بيرمي برسالة فيها «Blob»، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js shape.mjs
class Shape {
  constructor(name) {
    if (new.target === Shape) throw new TypeError('Shape مجردة، اعمل class وارثة منها');
    if (typeof this.area !== 'function') throw new TypeError(new.target.name + ' لازم يكون فيها area()');
    this.name = name;
  }
  describe() { return this.name + ': ' + this.area(); }
}
class Square extends Shape { constructor(s) { super('مربع'); this.s = s; } area() { return this.s ** 2; } }
class Blob extends Shape {}
console.log(new Square(3).describe());
for (const make of [() => new Shape('x'), () => new Blob('y')]) {
  try { make(); } catch (e) { console.log(e.message); }
}
~~~

~~~text الناتج (Node 24.22)
مربع: 9
Shape مجردة، اعمل class وارثة منها
Blob لازم يكون فيها area()
~~~

**الشرح:** جوه constructor الأب، [[new.target]] هو الـ class اللي اتنادى عليها [[new]] فعلًا ([[Square]] أو [[Blob]])، مش [[Shape]]. فـ [[new.target === Shape]] معناها «حد عمل [[new Shape]] مباشرة». و [[this.area]] بيتقري من الـ prototype بتاع الـ class الوارثة، فموجود في [[Square]] ومش في [[Blob]]. و [[new.target.name]] بيدّي اسم الـ class للرسالة.` },
          ],
          check: { lang: "js", starter: R`class Shape {
  constructor(name) {
    // ارمي لو new Shape مباشرة، أو لو الـ class الوارثة مفيهاش area()
    this.name = name;
  }
  describe() { return this.name + ': ' + this.area(); }
}`, tests: R`class Square extends Shape { constructor(s) { super('مربع'); this.s = s; } area() { return this.s ** 2; } }
class Blob extends Shape {}
test("الوارثة شغالة", () => expect(new Square(3).describe()).toBe('مربع: 9'));
test("new Shape بيرمي", () => expect(() => new Shape('x')).toThrow('مجردة'));
test("من غير area بيرمي باسم الـ class", () => expect(() => new Blob('y')).toThrow('Blob'));
test("TypeError", () => { let err; try { new Blob('y'); } catch (e) { err = e; } expect(err instanceof TypeError).toBe(true); });`, solution: R`class Shape {
  constructor(name) {
    if (new.target === Shape) throw new TypeError('Shape مجردة، اعمل class وارثة منها');
    if (typeof this.area !== 'function') throw new TypeError(new.target.name + ' لازم يكون فيها area()');
    this.name = name;
  }
  describe() { return this.name + ': ' + this.area(); }
}` },
          flag: "script",
          deep: {
            why: R`مكتبات كتير بتقرا خصايص الدوال: Express بيعرف إن الـ middleware بتاع الأخطاء لأن [[fn.length === 4]]، و Mocha بيعرف إن الاختبار مستني [[done]] من [[length]]، و [[curry]] بيعرف إمتى يقف من [[length]] (درس «curry»). و [[name]] هو اللي بيظهر في الـ stack traces والـ profiler، فدالة من غير اسم صعب تلاقيها. و [[new.target]] هو الطريقة الوحيدة الموثوقة تعرف بيها إن الدالة اتنادت بـ [[new]] وإن مين الـ class الوارثة.`,
            how: R`أي دالة object وارث من [[Function.prototype]] (اللي هو نفسه دالة: [[typeof Function.prototype]] بـ [[function]]، وبترجّع [[undefined]] لو ناديتها). وكل دالة بتتعمل ومعاها خاصيتين own: [[length]] و [[name]]، الاتنين [[writable: false, configurable: true]].

- [[name]] بتتحسب وقت التعريف: من اسم الدالة، أو من المتغير ([[const add = () => ...]] → [["add"]])، أو من المفتاح ([[{ ['x' + 1]: function () {} }]] → [["x1"]]، والـ Symbol → [["[sym]"]])، والـ getter → [["get total"]]، والـ bound → [["bound add"]]. ولو مفيش أي حاجة: نص فاضي. و [[new Function(...)]] اسمها [["anonymous"]].
- [[Function.prototype.toString]] بيرجّع النص الأصلي من الملف بالظبط، وللدوال المبنية في المحرك [["function max() { [native code] }"]].
- [[instanceof]]: [[x instanceof C]] بينادي [[ C[Symbol.hasInstance](x) ]]. و [[Function.prototype[Symbol.hasInstance]]] هو الافتراضي اللي بيمشي في السلسلة ويقارن بـ [[C.prototype]]، وهو [[writable: false]] و [[configurable: false]] عشان محدش يبوّظ [[instanceof]] لكل الدوال مرة واحدة. اتجرّب: [[Function.prototype[Symbol.hasInstance].call(Even, 4)]] بـ [[false]] (الافتراضي متجاهل الـ static بتاعتنا).
- [[new.target]]: في نداء عادي [[undefined]]. مع [[new F()]] هو [[F]]. ومع [[class B extends A]] و [[new B()]] هو [[B]] حتى جوه constructor [[A]]. ومع [[Reflect.construct(A, [], B)]] هو [[B]] (اتجرّب: [[A sees B]]). والـ arrow function مالهاش [[new.target]] بتاعها: بتشوف بتاع الدالة اللي حواليها.
- [[new Function(args..., body)]] بيعمل دالة في الـ global scope: مش شايفة المتغيرات اللي حواليها (اتجرّب: [[typeof local]] جواها طلع [[undefined]]).`,
            when: R`[[length]]: لما بتبني أداة بتتعامل مع دوال غيرك (curry، و middleware، و dependency injection)، أو wrapper عايزه يحافظ على الشكل. [[name]]: سمّي الدوال اللي بتتبعت callbacks عشان الـ stack trace. [[toString]]: للـ debugging والأدوات (مش منطق برنامج). [[Symbol.hasInstance]]: نادر، لما الـ «نوع» تعريفه شكل الداتا مش طريقة إنشائها، وخلي بالك إنه بيلخبط اللي بيقرا الكود. [[new.target]]: classes مجردة، أو constructor function قديمة لازم تشتغل بـ [[new]] ومن غيرها. و [[new Function]]: تقريبًا أبدًا، إلا في أدوات بتولّد كود من مصادر موثوقة.`,
            mistakes: R`- تفتكر [[length]] = عدد كل الـ parameters: بتقف عند أول default أو rest.
- تحاول [[F[Symbol.hasInstance] = ...]] بالإسناد: [[Cannot assign to read only property 'Symbol(Symbol.hasInstance)']].
- تعتمد على [[fn.name]] بعد minification: الأدوات بتغيّر الأسامي لحروف.
- [[new.target]] في arrow مستني إنها تبقى بتاعتها: بتاخد بتاعة الدالة اللي حواليها، ولو مفيش دالة حواليها [[SyntaxError: new.target expression is not allowed here]].
- [[new Function(userInput)]] أو [[eval]]: تنفيذ كود من يوزر. وفي متصفح عليه CSP من غير [['unsafe-eval']] بيرمي [[EvalError]] (من الـ docs).
- تنادي constructor function من غير [[new]] في sloppy mode: بتكتب في [[globalThis]] ساكتة.`,
          },
          teach: R`## الفكرة في سطرين

الدالة object وارث من [[Function.prototype]]، وليها خصايص تقراها زي أي object، وجواها كلمة [[new.target]] بتقولها اتنادت إزاي. كل اللي تحت من Node 24.22 كملف [[.mjs]].

---

## ١. [[Function]] نفسها

~~~js
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(2, 3), sum.name, sum.length, typeof Function.prototype, area instanceof Function);
~~~

~~~text الناتج
5 anonymous 2 function true
~~~

[[Function]] هو الـ constructor بتاع كل الدوال: آخر argument هو جسم الدالة كنص، واللي قبله أسامي الـ parameters. الدالة اللي بيعملها اسمها [["anonymous"]] وبتشتغل في الـ global scope (مش شايفة المتغيرات اللي حوالين السطر). ولأنها بتحوّل نص لكود وقت التشغيل، هي و [[eval]] باب لتنفيذ أي كود: متدخّلش فيها input من يوزر أبدًا.

وأي دالة [[instanceof Function]]، و [[Function.prototype]] نفسه دالة ([[typeof]] بـ [[function]]) فيها [[call]] و [[apply]] و [[bind]] و [[toString]].

| الدالة | [[constructor.name]] |
|---|---|
| [[function f() {}]] و arrow و method | [[Function]]: الدوال العادية كلها من نفس النوع |
| [[async function]] و async arrow | [[AsyncFunction]]: بترجّع Promise ومالهاش [[prototype]] |
| [[function*]] | [[GeneratorFunction]]: بترجّع generator object لما تتنادى |

---

## ٢. [[Function.prototype.length]]: كام argument مستنية

~~~js
function area(w, h = w, ...rest) { return w * h; }
const add = (a, b) => a + b;
console.log(area.length, add.length, ((a, b = 1, c) => 0).length, ((...xs) => 0).length);
~~~

~~~text الناتج
1 2 1 0
~~~

| الدالة | [[length]] | ليه |
|---|---|---|
| [[(w, h = w, ...rest)]] | 1 | العدّ وقف عند [[h]] (أول default) |
| [[(a, b)]] | 2 | الاتنين من غير default |
| [[(a, b = 1, c)]] | 1 | [[c]] بعد الـ default، فمتحسبتش |
| [[(...xs)]] | 0 | الـ rest مش بيتحسب |

وهي خاصية own: [[{ value: 2, writable: false, enumerable: false, configurable: true }]]. والـ bound function [[length]] بتاعتها بتقل بعدد الـ arguments اللي اتربطت. ومختلفة عن [[arguments.length]] (عدد اللي **اتبعت فعلًا**، الدرس الجاي).

---

## ٣. [[Function.prototype.name]]

~~~text الناتج
area add bound add
~~~

[[area]] من التعريف، و [[add]] من اسم المتغير اللي الـ arrow اتحطت فيه، و [[bind]] بيزوّد [["bound "]]، والـ arrow اللي متحطتش في متغير اسمها نص فاضي (الفراغ في آخر السطر).

---

## ٤. [[Function.prototype.toString]]: الكود كنص

~~~text الناتج
(a, b) => a + b | function max() { [native code] }
~~~

الدوال اللي انت كاتبها: نفس النص من الملف حرفيًا (بالتعليقات والمسافات). الدوال المبنية في المحرك: [[[native code]]]. الـ class: [[class Cat { ... }]] كاملة، والـ method المختصرة: [[describe() { ... }]] من غير [[function]].

---

## ٥. [[Function.prototype[Symbol.hasInstance]]] و [[instanceof]] بتاعك

~~~js
class Even {
  static [Symbol.hasInstance](n) { return Number.isInteger(n) && n % 2 === 0; }
}
console.log(4 instanceof Even, 3 instanceof Even, '4' instanceof Even);
~~~

~~~text الناتج
true false false
~~~

[[x instanceof C]] أول حاجة بيعملها: يدوّر على [[ C[Symbol.hasInstance] ]] ويناديها. كل الدوال وارثاه من [[Function.prototype]]، والافتراضي بيمشي في سلسلة [[x]] ويدوّر على [[C.prototype]]. لما عرّفنا [[static [Symbol.hasInstance]]] على [[Even]] غطّينا على الافتراضي، فبقى [[4 instanceof Even]] (رقم primitive!) بـ [[true]].

| اللي حصل | الناتج (اتجرّب) |
|---|---|
| [[Object.getOwnPropertyDescriptor(Function.prototype, Symbol.hasInstance)]] | [[writable: false]] و [[configurable: false]]: الافتراضي مقفول ومحدش يقدر يغيّره لكل الدوال |
| [[F[Symbol.hasInstance] = () => true]] على دالة عادية | رمت [[TypeError: Cannot assign to read only property 'Symbol(Symbol.hasInstance)' of function 'function F() {}']] لأن الموروث مبيتكتبش |
| [[Object.defineProperty(F, Symbol.hasInstance, { value: () => true })]] | [[({}) instanceof F]] بقت [[true]] لأن التعريف مش إسناد |
| [[Function.prototype[Symbol.hasInstance].call(Even, 4)]] | [[false]]: ده الفحص الافتراضي بالسلسلة |

---

## ٦. [[new.target]]: اتنادت بـ [[new]]؟

~~~js
function Point(x) {
  if (!new.target) return new Point(x);
  this.x = x;
}
console.log(Point(3).x, new Point(5).x);
~~~

~~~text الناتج
3 5
~~~

[[new.target]] meta property (كلمة خاصة مش متغير): [[undefined]] لو الدالة اتنادت عادي، والدالة اللي اتعمل بيها [[new]] لو بـ [[new]]. هنا لو حد نسي [[new]] بنناديها إحنا صح.

| الحالة | [[new.target]] (اتجرّب) |
|---|---|
| [[plain()]] | [[undefined]] لأن النداء عادي من غير [[new]] |
| [[new Point(5)]] | الدالة نفسها [[Point]] |
| [[new Square()]] و جوه constructor الأب [[Base]] | [[Square]] (مش [[Base]])، يعني الـ class اللي اتعمل منها الـ object فعلًا |
| [[Reflect.construct(A, [], B)]] | [[B]]: التالت argument بيحدد [[new.target]] بإيدك |
| arrow جوه دالة اتنادت بـ [[new]] | بتاع الدالة اللي حواليها: [[arrow sees true]] مع [[new]] و [[false]] من غيرها |

ودي اللي بتعمل class «مجردة»: [[if (new.target === Base) throw ...]] (تمرين التحدي).

---

## الخلاصة

- الدالة object: [[length]] (لحد أول default أو rest)، و [[name]]، و [[toString()]] (الكود الأصلي).
- [[ static [Symbol.hasInstance] ]] بيغيّر [[instanceof]]، والإسناد العادي عليها ممنوع.
- [[new.target]]: [[undefined]] من غير [[new]]، والـ class الحقيقية مع [[new]].
- [[new Function]] = [[eval]]: متستخدمهاش مع input.`,
          lines: [
            R`دالة فيها parameter عادي، وواحد default، و rest. هنشوف [[length]] بيعدّ أنهي فيهم.`,
            R`arrow في متغير. اسمها هيتاخد من المتغير.`,
            R`[[length]] لأربع دوال: [[1 2 1 0]]. العدّ بيقف عند أول default أو rest.`,
            R`[[name]]: [[area]] من التعريف، و [[add]] من المتغير، و [[bound add]] من [[bind]]، والـ arrow اللي ملهاش متغير اسمها نص فاضي.`,
            R`[[toString()]]: كود الـ arrow زي ما اتكتب، و [[Math.max]] مكتوبة جوه المحرك فبتطلع [[[native code]]].`,
            R`class هنغيّر معنى [[instanceof]] بتاعها.`,
            R`[[static [Symbol.hasInstance](n)]]: [[x instanceof Even]] هينادي الدالة دي بـ [[x]] ويرجّع ناتجها، من غير ما يبص على السلسلة.`,
            R`قفلة الـ class.`,
            R`[[4]] زوجي فـ [[true]]، و [[3]] فردي، و [[4]] النص مش integer: [[true false false]].`,
            R`constructor function قديمة بتحمي نفسها لو حد ناداها من غير [[new]].`,
            R`[[new.target]] بـ [[undefined]] في النداء العادي، فبتنادي نفسها بـ [[new]] وترجّع الناتج.`,
            R`هنا الدالة اتنادت بـ [[new]]، فـ [[this]] هو الـ object الجديد.`,
            R`قفلة [[Point]].`,
            R`الاتنين اشتغلوا: [[3 5]]، مع إن الأولى اتنادت من غير [[new]].`,
            R`[[new Function]] بيعمل دالة من نصوص: [['a']] و [['b']] أسامي الـ parameters، والأخير جسمها. خطيرة مع أي input من برّه.`,
            R`[[5 anonymous 2 function true]]: شغالة، واسمها [[anonymous]]، و [[length]] 2، و [[Function.prototype]] نفسه دالة، وأي دالة [[instanceof Function]].`,
          ],
          ref: [
            { t: "MDN: Function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function" },
            { t: "MDN: Function.prototype.length", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length" },
            { t: "MDN: Function.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString" },
            { t: "MDN: Function.prototype[Symbol.hasInstance]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Symbol.hasInstance" },
            { t: "MDN: Function.prototype.name", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name" },
            { t: "MDN: new.target", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target" },
            { t: "ECMAScript: Function Objects", url: "https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function-objects" }
          ],
          pre: [{ to: "js/function و arrow", why: R`أشكال تعريف الدوال، والفرق بين arrow والدالة العادية` }, { to: "js/default و rest و spread", why: R`الـ default والـ rest اللي بيحددوا [[length]]` }, "js/call و apply و bind", { to: "js/extends و super", why: R`[[new.target]] جوه constructor الأب` }]
        },
        {
          cmd: "arguments object",
          title: "arguments: كل الـ arguments اللي اتبعتت للدالة، عددها، واللف عليها، وليه rest أحسن",
          desc: R`جوه أي دالة عادية (مش arrow) فيه object اسمه [[arguments]] فيه **كل** اللي اتبعت في النداء، حتى اللي ملوش parameter باسمه. [[arguments.length]] عدد اللي اتبعت فعلًا (مش [[fn.length]] اللي هو عدد المستنيين)، و [[ arguments[0] ]] أول واحد، و [[ arguments[Symbol.iterator] ]] هو اللي بيخلّيك تلف عليه بـ [[for...of]] وتعمل [[[...arguments]]].

بس هو **مش array**: مفيهوش [[map]] ولا [[reduce]]. والـ arrow function ملهاش [[arguments]] بتاعها. وفي الكود الجديد الـ rest parameter ([[...nums]]) بيعمل نفس الشغل وأوضح: array حقيقية، وباسم، وبتشتغل في الـ arrow. هتقابل [[arguments]] في كود قديم ومكتبات، وفي حالة واحدة مفيدة: تفرّق بين «مبعتش» و «بعت [[undefined]]».`,
          example: R`// arguments: كل اللي اتبعت للدالة، حتى اللي ملوش اسم
function total(label) {
  console.log(arguments.length, total.length, typeof arguments, Array.isArray(arguments));
  let sum = 0;
  for (const n of arguments) if (typeof n === 'number') sum += n;
  return label + ': ' + sum;
}
console.log(total('فاتورة', 10, 20, 5));
console.log(total());
function totalRest(label, ...nums) {
  return label + ': ' + nums.reduce((a, b) => a + b, 0);
}
console.log(totalRest('فاتورة', 10, 20, 5));
const arrow = () => typeof arguments;
console.log(arrow());`,
          try: R`اعمل ملف [[args.cjs]] (من غير strict) فيه ٣ دوال: [[function mapped(a) { arguments[0] = 'changed'; return a; }]]، ونفسها بس أول سطر فيها [['use strict';]]، ونفسها بـ [[a = 1]] default. نادي التلاتة بـ [['orig']]. وبعدين جرّب [[function f() { return Object.prototype.toString.call(arguments); }]] و [[function h() { return arguments.map((x) => x); }]].`,
          sol: R`~~~js args.cjs
function mapped(a) { arguments[0] = 'changed'; return a; }
function unmapped(a) { 'use strict'; arguments[0] = 'changed'; return a; }
function withDefault(a = 1) { arguments[0] = 'changed'; return a; }
console.log(mapped('orig'), unmapped('orig'), withDefault('orig'));
function f() { return Object.prototype.toString.call(arguments); }
console.log(f(1));
function h() { try { return arguments.map((x) => x); } catch (e) { return e.message; } }
console.log(h(1));
~~~

~~~text الناتج (Node 24.22)
changed orig orig
[object Arguments]
arguments.map is not a function
~~~

- في sloppy mode و parameters بسيطة، [[arguments]] **مربوط** بالـ parameters ("mapped"): تغيير [[ arguments[0] ]] غيّر [[a]] نفسها. ده سلوك قديم مربك.
- في strict mode، أو لو فيه default أو rest أو destructuring في الـ parameters، الربط بيتلغي ("unmapped"): [[a]] فضلت [['orig']].
- نوعه الداخلي [[Arguments]]، مش [[Array]]: فيه [[length]] و indexes و [[Symbol.iterator]] بس.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الدالة مستنية اتنين. اكتب الـ ٤ نتايج قبل التشغيل:

~~~js
function f(a, b) { return [arguments.length, f.length]; }
console.log(f(1), f(1, 2, 3), f(...[]), f(undefined, undefined));
~~~`, done: R`كتبت [[[ 1, 2 ] [ 3, 2 ] [ 0, 2 ] [ 2, 2 ]]] وطلع كده، وتقدر تقول ليه [[f(undefined, undefined)]] طلّعت 2 مش 0.`, sol: R`~~~text الناتج (Node 24.22)
[ 1, 2 ] [ 3, 2 ] [ 0, 2 ] [ 2, 2 ]
~~~

[[f.length]] ثابت (2): ده عدد الـ parameters في التعريف. و [[arguments.length]] بيتغيّر مع كل نداء: عدد اللي **اتبعت فعلًا**. [[f(...[])]] مبعتش حاجة: 0. و [[f(undefined, undefined)]] بعت اتنين قيمتهم [[undefined]]: 2. وده الفرق اللي ميظهرش لو بصيت على [[a]] و [[b]] بس، لأنهم [[undefined]] في الحالتين.` },
            { lvl: 'تطبيق', t: R`**refactor:** الدالة دي من كود قديم. خليها بالـ rest parameter، ونفس الناتج بالظبط:

~~~js
function logLine(level) {
  var parts = Array.prototype.slice.call(arguments, 1);
  return '[' + level.toUpperCase() + '] ' + parts.join(' ');
}
console.log(logLine('warn', 'disk', 91, '%'));
~~~`, done: R`النسختين بيطبعوا [[[WARN] disk 91 %]]، والجديدة مفيهاش [[arguments]] ولا [[slice.call]].`, sol: R`~~~js log-line.mjs
function logLine(level, ...parts) {
  return '[' + level.toUpperCase() + '] ' + parts.join(' ');
}
console.log(logLine('warn', 'disk', 91, '%'));
~~~

~~~text الناتج (Node 24.22، والنسخة القديمة طلّعت نفس السطر)
[WARN] disk 91 %
~~~

**الشرح:** [[Array.prototype.slice.call(arguments, 1)]] كانت الطريقة المشهورة قبل ES2015: تستلف [[slice]] من الـ arrays وتناديها على [[arguments]] (لأنه شبه array: فيه [[length]] و indexes) عشان تاخد كل حاجة بعد أول واحد. الـ rest [[...parts]] بيعمل نفس الحاجة: array حقيقية فيها كل اللي بعد [[level]]، وباسم بيقول هي إيه. و [[var]] بقت مش محتاجينها.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حد حوّل دالة لـ arrow عشان «أقصر»، في ملف [[sum.cjs]]:

~~~js
const sum = () => {
  let total = 0;
  for (const n of arguments) total += typeof n === 'number' ? n : 0;
  return total + ' (من ' + arguments.length + ' arguments)';
};
console.log(sum(1, 2, 3));
~~~

شغّلها كـ [[.cjs]] وكـ [[.mjs]]، وفسّر الناتجين، وصلّحها.`, done: R`فهمت الـ 5 الغريبة في الـ cjs والـ [[ReferenceError]] في الـ mjs، والتصليح بيطبع [[6 (من 3 arguments)]] في الاتنين.`, sol: R`~~~text الناتج: node sum.cjs
0 (من 5 arguments)
~~~

~~~text الناتج: node sum.mjs
ReferenceError: arguments is not defined
~~~

الـ arrow ملهاش [[arguments]] بتاعها، فبتدوّر عليه برّه:

- في CommonJS، Node بيلف الملف كله في دالة بـ ٥ parameters ([[exports]] و [[require]] و [[module]] و [[__filename]] و [[__dirname]]). فالـ arrow لقت [[arguments]] بتاع **الملف**: ٥ حاجات مش أرقام، فالمجموع 0. باج ساكت.
- في ESM مفيش دالة حوالين الملف، فـ [[arguments]] مش متعرّف: [[ReferenceError]].

~~~js sum.cjs
const sum = (...nums) => {
  let total = 0;
  for (const n of nums) total += typeof n === 'number' ? n : 0;
  return total + ' (من ' + nums.length + ' arguments)';
};
console.log(sum(1, 2, 3));
~~~

~~~text الناتج (Node 24.22)
6 (من 3 arguments)
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** [[area(w, h)]]: لو اتبعت رقم واحد بس ترجّع مساحة مربع، ولو اتنين مساحة مستطيل. ولو مفيش ولا واحد ترمي [[TypeError]]. ولو حد بعت [[area(5, undefined)]] (غالبًا متغير فاضي بالغلط) ترمي برضه، متعتبرهاش مربع. لازم تفرّق بين «مبعتش» و «بعت [[undefined]]».`, done: R`[[area(5)]] بـ 25، و [[area(5, 2)]] بـ 10، و [[area()]] و [[area(5, undefined)]] بيرموا رسايل مختلفة، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js area.mjs
function area(w, h) {
  if (arguments.length === 0) throw new TypeError('area محتاجة على الأقل ضلع واحد');
  if (arguments.length === 1) return w * w;
  if (h === undefined) throw new TypeError('العرض اتبعت undefined: لو مربع ابعت رقم واحد بس');
  return w * h;
}
console.log(area(5), area(5, 2));
for (const args of [[], [5, undefined]]) {
  try { area(...args); } catch (e) { console.log(e.message); }
}
~~~

~~~text الناتج (Node 24.22)
25 10
area محتاجة على الأقل ضلع واحد
العرض اتبعت undefined: لو مربع ابعت رقم واحد بس
~~~

**الشرح:** [[h === undefined]] لوحدها مش هتفرّق بين [[area(5)]] و [[area(5, undefined)]]: [[h]] [[undefined]] في الاتنين. [[arguments.length]] هي اللي بتفرّق (1 ضد 2). والبديل الحديث من غير [[arguments]]: [[function area(...args)]] و [[args.length]]، بس كده بتخسر الأسامي [[w]] و [[h]] في التوقيع.` },
          ],
          check: { lang: "js", starter: R`function area(w, h) {
  // رقم واحد = مربع، اتنين = مستطيل، ومفيش أو h اتبعت undefined = TypeError
}`, tests: R`test("مربع", () => expect(area(5)).toBe(25));
test("مستطيل", () => expect(area(5, 2)).toBe(10));
test("من غير arguments", () => expect(() => area()).toThrow("ضلع"));
test("h اتبعت undefined", () => expect(() => area(5, undefined)).toThrow("undefined"));
test("نوع الـ error", () => { let err; try { area(); } catch (e) { err = e; } expect(err instanceof TypeError).toBe(true); });
test("صفر مش undefined", () => expect(area(5, 0)).toBe(0));`, solution: R`function area(w, h) {
  if (arguments.length === 0) throw new TypeError('area محتاجة على الأقل ضلع واحد');
  if (arguments.length === 1) return w * w;
  if (h === undefined) throw new TypeError('العرض اتبعت undefined: لو مربع ابعت رقم واحد بس');
  return w * h;
}` },
          flag: "script",
          deep: {
            why: R`[[arguments]] موجود في كود كتير قبل 2015 (مكتبات، و polyfills، و jQuery plugins)، ولازم تقراه وتحوّله. وفيه باجات بتيجي منه بالذات: arrow بتاخد [[arguments]] بتاع حد تاني، و «mapped arguments» اللي بيغيّر الـ parameters من ورا ضهرك، و [[arguments.map]] اللي مش موجودة. ومعرفة [[arguments.length]] ضد [[fn.length]] بتوضّح الفرق بين «الدالة مستنية كام» و «اتبعتلها كام».`,
            how: R`لما دالة عادية تتنادى، المحرك بيعمل object من نوع Arguments فيه: indexes من [[0]] لـ [[n - 1]]، و [[length]] (خاصية own [[writable: true]] و [[enumerable: false]]، فتقدر تغيّرها: [[arguments.length = 1]] خلّت [[[...arguments]]] [[[ 'a' ]]])، و [[ [Symbol.iterator] ]] اللي هو نفس [[Array.prototype.values]] بالظبط ([[arguments[Symbol.iterator] === Array.prototype.values]] طلعت [[true]])، فـ [[for...of]] والـ spread و [[Array.from]] شغالين. وفي sloppy mode فيه كمان [[callee]] (الدالة نفسها)، وفي strict قرايته بترمي [[TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them]].

والـ arrow functions مالهاش [[arguments]] ولا [[this]] ولا [[new.target]] بتوعها: بتشوف بتوع أقرب دالة عادية حواليها. وده سبب الـ 5 الغريبة في CommonJS، لأن الملف نفسه جوه دالة wrapper.`,
            when: R`في الكود الجديد: rest parameter دايمًا ([[...args]]). [[arguments.length]] بس لما محتاج تفرّق بين «مبعتش» و «بعت [[undefined]]» ومش عايز تخسر أسامي الـ parameters. ولما تقرا كود قديم: [[Array.prototype.slice.call(arguments)]] = [[[...arguments]]] = [[Array.from(arguments)]]، وكلهم = rest.`,
            mistakes: R`- [[arguments.map(...)]]: [[TypeError: arguments.map is not a function]]. حوّله الأول أو استخدم rest.
- [[arguments]] جوه arrow: بتاخد بتاع الدالة اللي برّه، أو بتاع ملف الـ CommonJS، أو [[ReferenceError]] في ESM.
- تفتكر [[arguments.length]] = [[fn.length]].
- تعدّل [[ arguments[0] ]] في sloppy mode وتفاجأ إن الـ parameter اتغيّر.
- [[arguments.callee]] في strict mode: [[TypeError]]، و MDN معلّماه deprecated. سمّي الدالة واستخدم اسمها.
- تعمل [[ 'use strict' ]] جوه دالة فيها default أو rest: [[SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list]] (اتجرّب). وفايرفوكس بيكتبها «"use strict" not allowed in function with non-simple parameters» (من MDN).`,
          },
          teach: R`## الفكرة في سطرين

[[arguments]] هو «شنطة» فيها كل اللي اتبعت للدالة. شبه array بس مش array. والـ rest parameter عمل نفس الشغل بشكل أحسن. كل اللي تحت من Node 24.22، والمثال ملف [[.mjs]].

---

## ١. [[arguments.length]]: كام واحد اتبعت

~~~js
function total(label) {
  console.log(arguments.length, total.length, typeof arguments, Array.isArray(arguments));
~~~

~~~text الناتج
4 1 object false
0 1 object false
~~~

| | [[arguments.length]] | [[total.length]] |
|---|---|---|
| معناه | عدد اللي اتبعت **في النداء ده** | عدد الـ parameters في التعريف (لحد أول default أو rest) |
| [[total('فاتورة', 10, 20, 5)]] | 4 | 1 |
| [[total()]] | 0 | 1 |
| بيتغيّر؟ | مع كل نداء | ثابت |

و [[typeof]] بـ [[object]]، و [[Array.isArray]] بـ [[false]]: مش array.

---

## ٢. [[arguments[Symbol.iterator]]]: اللف عليه

~~~js
for (const n of arguments) if (typeof n === 'number') sum += n;
~~~

[[for...of]] شغال لأن [[arguments]] فيه [[ [Symbol.iterator] ]]، وده **نفس** [[Array.prototype.values]] (اتجرّب: المقارنة [[===]] طلعت [[true]]). فكل حاجة بتحتاج iterable شغالة:

~~~text الناتج (من g('a', 'b'))
{ value: 'a', done: false }
[ 'a', 'b' ]
[ 'a', 'b' ]
[ 'a', 'b' ]
~~~

بالترتيب: [[ arguments[Symbol.iterator]().next() ]]، و [[[...arguments]]]، و [[Array.from(arguments)]]، و [[Array.prototype.slice.call(arguments)]]. التلاتة الأخيرة بيحوّلوه لـ array حقيقية. والقديم [[for (let i = 0; i < arguments.length; i++)]] شغال برضه عشان [[length]] و الـ indexes.

---

## ٣. اللي مش موجود فيه

| الحاجة | النتيجة (اتجرّب) |
|---|---|
| [[arguments.map(...)]] | [[TypeError: arguments.map is not a function]]: مفيش methods الـ array |
| [[Object.prototype.toString.call(arguments)]] | [["[object Arguments]"]]: نوع لوحده |
| [[arguments]] في arrow جوه ESM | [[ReferenceError: arguments is not defined]] لو قريته، و [[typeof arguments]] بـ [[undefined]] (زي آخر سطر في المثال) |
| [[arguments]] في arrow في ملف CommonJS | بتاع الملف نفسه: [[length]] بـ 5 |
| [[arguments.callee]] في strict | [[TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions ...]] |

---

## ٤. mapped و unmapped

~~~text الناتج (args.cjs)
changed orig orig
~~~

في الـ sloppy mode ولو الـ parameters بسيطة (من غير default ولا rest ولا destructuring)، [[ arguments[0] ]] و [[a]] **نفس الخانة**: تغيير واحد بيغيّر التاني. في strict mode أو مع parameters مش بسيطة، الربط مش موجود. ده واحد من أسباب إن كل الكود الجديد strict (ESM و class).

---

## ٥. rest parameter: البديل

~~~js
function totalRest(label, ...nums) {
  return label + ': ' + nums.reduce((a, b) => a + b, 0);
}
~~~

| | [[arguments]] | [[...nums]] |
|---|---|---|
| النوع | Arguments (شبه array) | Array حقيقية: [[map]] و [[reduce]] على طول |
| فيه | **كل** الـ arguments حتى اللي ليهم أسامي | اللي بعد الـ parameters اللي ليها أسامي بس |
| في arrow | مش موجود | شغال |
| الاسم | ثابت [[arguments]] | انت بتسمّيه |
| [[fn.length]] | مبيأثرش | مبيتحسبش |

---

## الخلاصة

- [[arguments.length]] = اتبعت كام فعلًا. [[fn.length]] = مستنية كام.
- [[ arguments[Symbol.iterator] ]] = [[Array.prototype.values]]، فـ [[for...of]] والـ spread شغالين، بس [[map]] لأ.
- الـ arrow ملهاش [[arguments]]: في CommonJS بتاخد بتاع الملف (باج ساكت)، وفي ESM [[ReferenceError]].
- في الكود الجديد: [[...rest]].`,
          lines: [
            R`دالة عادية بـ parameter واحد بس، وهنبعتلها أكتر.`,
            R`[[arguments.length]] عدد اللي اتبعت فعلًا، و [[total.length]] عدد الـ parameters في التعريف (1)، و [[typeof]] بـ [[object]]، و [[Array.isArray]] بـ [[false]].`,
            R`مجموع بيبدأ من صفر.`,
            R`[[for...of]] على [[arguments]] شغال بسبب [[ arguments[Symbol.iterator] ]]. بنجمع الأرقام بس، فالنص [['فاتورة']] بيتعدّى.`,
            R`[[label]] لسه بالاسم بتاعه، وهو نفسه [[ arguments[0] ]].`,
            R`قفلة [[total]].`,
            R`٤ arguments: السطر الأول من جوه الدالة [[4 1 object false]]، وبعده [[فاتورة: 35]].`,
            R`من غير arguments: [[0 1 object false]] وبعده [[undefined: 0]] لأن [[label]] مبعتهوش حد.`,
            R`نفس الدالة بالـ rest: [[nums]] array حقيقية فيها كل اللي بعد [[label]].`,
            R`[[reduce]] شغالة على طول لأن [[nums]] array، والـ [[0]] قيمة البداية عشان لو الـ array فاضية.`,
            R`قفلة [[totalRest]].`,
            R`نفس الناتج [[فاتورة: 35]] من غير [[arguments]].`,
            R`arrow بتسأل عن [[typeof arguments]]. في ملف [[.mjs]] مفيش دالة حواليها، فمفيش [[arguments]].`,
            R`بيطبع [[undefined]]: [[typeof]] مبترميش على اسم مش متعرّف. لو كتبت [[arguments]] لوحدها كانت هترمي [[ReferenceError]]، ولو الملف [[.cjs]] كانت هتطلع [[object]] (بتاع الملف).`,
          ],
          ref: [
            { t: "MDN: The arguments object", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments" },
            { t: "MDN: arguments.length", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/length" },
            { t: "MDN: arguments[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/Symbol.iterator" },
            { t: "MDN: arguments.callee (deprecated)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee" },
            { t: "MDN: Rest parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters" },
            { t: "ECMAScript: Arguments Exotic Objects", url: "https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-arguments-exotic-objects" }
          ],
          pre: ["js/Function: length و name و toString و new.target", { to: "js/default و rest و spread", why: R`الـ rest parameter اللي هو البديل الحديث` }, { to: "js/CommonJS و ESM", why: R`ليه ملف الـ CommonJS جوه دالة wrapper، والـ ESM لأ` }, "js/iterators و generators"]
        },
        {
          cmd: "Reflect: الـ ١٣ دالة",
          title: "Reflect كله: نفس عمليات المحرك على الـ objects، كدوال بترجّع true و false بدل ما ترمي",
          desc: R`[[Reflect]] object جاهز فيه ١٣ دالة static، كل واحدة بتعمل عملية واحدة من العمليات الداخلية اللي المحرك بيعملها على أي object: [[Reflect.get]] (قراية)، و [[Reflect.set]] (كتابة)، و [[Reflect.has]] ([[in]])، و [[Reflect.deleteProperty]] ([[delete]])، و [[Reflect.ownKeys]] (كل المفاتيح)، و [[Reflect.defineProperty]] و [[Reflect.getOwnPropertyDescriptor]]، و [[Reflect.getPrototypeOf]] و [[Reflect.setPrototypeOf]]، و [[Reflect.isExtensible]] و [[Reflect.preventExtensions]]، و [[Reflect.apply]] (نداء دالة)، و [[Reflect.construct]] ([[new]]).

ليه موجود جنب [[Object.*]]؟ لأن [[Reflect]] بيرجّع [[true]] أو [[false]] لما العملية تفشل بدل ما يرمي، وبيرمي لو الـ target مش object بدل ما يحوّله ساكت، وكل دالة فيه بنفس اسم trap في [[Proxy]] وبنفس الـ arguments. ودا اللي خلّى [[return Reflect.set(...)]] هي الطريقة الصح في درس «Proxy و Reflect».`,
          example: R`// Reflect: نفس عمليات المحرك، بترجّع true و false بدل ما ترمي
const locked = Object.freeze({ id: 7 });
console.log(Reflect.defineProperty(locked, 'id', { value: 8 }), Reflect.set(locked, 'id', 8));
try { Object.defineProperty(locked, 'id', { value: 8 }); } catch (e) { console.log(e.message); }
console.log(Reflect.deleteProperty(locked, 'id'), Reflect.has(locked, 'id'), Reflect.ownKeys({ a: 1, [Symbol('s')]: 2 }));
const user = { first: 'Sara', get greet() { return 'أهلًا ' + this.first; } };
console.log(Reflect.get(user, 'greet'), Reflect.get(user, 'greet', { first: 'Mona' }));
function sum(...n) { return n.reduce((a, b) => a + b, 0); }
sum.apply = null;
console.log(Reflect.apply(sum, null, [1, 2, 3]));
class Point { constructor(x) { this.x = x; } }
const p = Reflect.construct(Point, [4]);
console.log(p instanceof Point, p.x);
console.log(Reflect.getPrototypeOf(p) === Point.prototype, Reflect.setPrototypeOf(locked, null), Reflect.isExtensible(locked));
console.log(Reflect.getOwnPropertyDescriptor(locked, 'id'), Reflect.preventExtensions({}));
try { Reflect.getPrototypeOf(1); } catch (e) { console.log(e.message); }`,
          try: R`اطبع [[Object.getOwnPropertyNames(Reflect)]] و [[Object.keys(Reflect)]]: ليه التانية فاضية؟ وبعدين جرّب [[const o = {}]] و [[Reflect.set(o, 'x', 1, { other: true })]]: رجّعت إيه؟ و [[o.x]] بقت إيه؟ وفين راحت القيمة؟`,
          sol: R`~~~js reflect-list.mjs
console.log(Object.getOwnPropertyNames(Reflect), Object.keys(Reflect));
const o = {};
const receiver = { other: true };
console.log(Reflect.set(o, 'x', 1, receiver), o.x, receiver);
~~~

~~~text الناتج (Node 24.22)
[
  'defineProperty',
  'deleteProperty',
  'apply',
  'construct',
  'get',
  'getOwnPropertyDescriptor',
  'getPrototypeOf',
  'has',
  'isExtensible',
  'ownKeys',
  'preventExtensions',
  'set',
  'setPrototypeOf'
] []
true undefined { other: true, x: 1 }
~~~

- الـ ١٣ دالة [[enumerable: false]] زي كل الـ built-ins، عشان كده [[Object.keys]] فاضية (درس «enumerability و ownership»).
- الـ argument الرابع في [[Reflect.set]] هو الـ **receiver**: الـ object اللي الكتابة بتحصل عليه فعلًا (وهو [[this]] لو فيه setter). بعتنا receiver تاني فالقيمة اتكتبت **عليه** مش على [[o]]، و [[Reflect.set]] رجّعت [[true]]. ده سبب إن الـ Proxy trap لازم يعدّي الـ [[receiver]] اللي جاله، مش object من عنده.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الـ ٦ قيم قبل التشغيل:

~~~js
const frozen = Object.freeze({ a: 1 });
const child = Object.create({ inherited: true });
console.log(Reflect.set(frozen, 'a', 2), Reflect.deleteProperty(frozen, 'a'), Reflect.deleteProperty(frozen, 'zzz'));
console.log(Reflect.has(child, 'inherited'), Reflect.ownKeys(child), Reflect.getOwnPropertyDescriptor(child, 'inherited'));
~~~`, done: R`كتبت [[false false true]] و [[true [] undefined]]، وتقدر تقول ليه مسح خاصية مش موجودة من object متجمّد رجّع [[true]].`, sol: R`~~~text الناتج (Node 24.22)
false false true
true [] undefined
~~~

- الكتابة والمسح على متجمّد: [[false]] من غير ما يرمي، حتى في strict mode (الملف [[.mjs]]). ده الفرق عن [[frozen.a = 2]] اللي كانت هترمي.
- مسح حاجة **مش موجودة** بيعتبر نجاح ([[true]]): النتيجة النهائية «مفيش [[zzz]]» اتحققت. ونفس الكلام في [[delete obj.zzz]].
- [[Reflect.has]] زي [[in]]: بيشوف الموروث. بس [[ownKeys]] و [[getOwnPropertyDescriptor]] own بس، فـ [[[]]] و [[undefined]].` },
            { lvl: 'تطبيق', t: R`**refactor:** الدالة دي بتستخدم [[try/catch]] عشان تعرف إذا التعريف نجح. خليها من غير [[try]] بـ [[Reflect.defineProperty]]:

~~~js
function addId(obj, id) {
  try {
    Object.defineProperty(obj, 'id', { value: id, enumerable: true });
    return 'اتضاف';
  } catch (e) {
    return 'مش ممكن: ' + e.message;
  }
}
console.log(addId({}, 1), '|', addId(Object.freeze({}), 2));
~~~`, done: R`النسختين بيرجّعوا [[اتضاف]] للأول و «مش ممكن» للتاني، والجديدة مفيهاش [[try]].`, sol: R`~~~text الناتج (القديمة)
اتضاف | مش ممكن: Cannot define property id, object is not extensible
~~~

~~~js add-id.mjs
function addId(obj, id) {
  return Reflect.defineProperty(obj, 'id', { value: id, enumerable: true }) ? 'اتضاف' : 'مش ممكن: الـ object مقفول أو id متعرّفة قبل كده';
}
console.log(addId({}, 1), '|', addId(Object.freeze({}), 2));
~~~

~~~text الناتج (Node 24.22)
اتضاف | مش ممكن: الـ object مقفول أو id متعرّفة قبل كده
~~~

**التمن:** خسرنا نص الـ error بتاع المحرك، لأن [[Reflect]] بيقول نجح ولا لأ بس. لو محتاج السبب بالظبط (للوج مثلًا) القديمة أحسن. ولو الفشل حالة عادية متوقعة (مش استثناء)، [[Reflect]] أوضح وأرخص: الـ [[throw]] والـ [[catch]] بيكلّفوا أكتر من [[if]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[safeCall(obj, method, ...args)]] بتنادي method على object حتى لو حد غيّر [[apply]] و [[call]] على الدالة نفسها، وبترمي [[TypeError]] لو الاسم مش method. و [[createFrom(Class, args)]] بتعمل instance من أي class والـ arguments في array.`, done: R`[[weird.total.apply(...)]] بيرجّع الكلام المزيّف و [[safeCall(weird, 'total', 1, 2)]] بيرجّع 8، و [[createFrom(Date, [0])]] و [[createFrom(Map, ...)]] شغالين، و [[safeCall(weird, 'fee')]] بيرمي.`, sol: R`~~~js safe-call.mjs
function safeCall(obj, method, ...args) {
  const fn = Reflect.get(obj, method);
  if (typeof fn !== 'function') throw new TypeError(String(method) + ' مش method في الـ object ده');
  return Reflect.apply(fn, obj, args);
}
function createFrom(Class, args) {
  return Reflect.construct(Class, args);
}
const weird = { total(a, b) { return a + b + this.fee; }, fee: 5 };
weird.total.apply = () => 'apply اتغيّرت!';
weird.total.call = () => 'call اتغيّرت!';
console.log(weird.total.apply(weird, [1, 2]), safeCall(weird, 'total', 1, 2));
console.log(createFrom(Date, [0]).toISOString(), createFrom(Map, [[['k', 1]]]).get('k'));
try { safeCall(weird, 'fee'); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج (Node 24.22)
apply اتغيّرت! 8
1970-01-01T00:00:00.000Z 1
fee مش method في الـ object ده
~~~

**الشرح:** [[fn.apply(...)]] بيقرا [[apply]] من الدالة نفسها، وحد غطّى عليها بخاصية own. [[Reflect.apply(fn, thisArg, args)]] static، فمحدش يقدر يغيّرها من على الدالة. ده نفس سبب [[Object.hasOwn]] بدل [[obj.hasOwnProperty]]. و [[Reflect.construct(Class, args)]] = [[new Class(...args)]] بس الـ args في array، وده مفيد في factory أو dependency injection.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** Proxy بيعدّي كل كتابة للأصل، بس الكتابة مش بتوصل:

~~~js
const target = { qty: 1 };
const p = new Proxy(target, { set(t, k, v) { return Reflect.set(t, k, v, {}); } });
p.qty = 5;
console.log(target.qty, p.qty);
~~~`, done: R`بيطبع [[5 5]] بعد التصليح، وتقدر تقول القيمة كانت بتروح فين.`, sol: R`~~~text الناتج قبل التصليح
1 1
~~~

الرابع في [[Reflect.set]] هو الـ receiver، والـ trap بعت [[{}]] جديد. فالكتابة حصلت على الـ object الفاضي ده (اللي اترمى بعدها)، و [[Reflect.set]] رجّعت [[true]] فالـ Proxy مرماش أي error. باج ساكت.

~~~js receiver.mjs
const target = { qty: 1 };
const p = new Proxy(target, { set(t, k, v, receiver) { return Reflect.set(t, k, v, receiver); } });
p.qty = 5;
console.log(target.qty, p.qty);
~~~

~~~text الناتج (Node 24.22)
5 5
~~~

الـ receiver هنا هو [[p]] نفسه. [[Reflect.set]] لقى إن [[qty]] data property في [[target]]، فعرّفها على الـ receiver ([[p]])، والـ Proxy مفيهوش trap [[defineProperty]] فوصلت لـ [[target]]. القاعدة: عدّي الـ arguments اللي جاتلك للـ trap زي ما هي.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN ومن التجربة: لكل دالة في [[Reflect]] فيه مقابل في [[Object]] أو operator؟ واعمل جدول فيه المقابل، والفرق في السلوك لو فيه، وجرّب على الأقل حالتين بنفسك.`, done: R`جدول فيه الـ ١٣، وكل صف فيه المقابل، وعرفت إن [[getPrototypeOf]] و [[isExtensible]] و [[preventExtensions]] و [[getOwnPropertyDescriptor]] بيختلفوا مع الـ primitives، وجرّبت حالتين.`, sol: R`**الإجابة النموذجية:**

| [[Reflect]] | المقابل | الفرق |
|---|---|---|
| [[get(o, k, r)]] | [[ o[k] ]] | بياخد receiver |
| [[set(o, k, v, r)]] | [[o[k] = v]] | بيرجّع boolean مهما كان الـ mode |
| [[has(o, k)]] | [[k in o]] | دالة مش operator |
| [[deleteProperty(o, k)]] | [[delete o[k] ]] | boolean من غير رمي في strict |
| [[ownKeys(o)]] | [[getOwnPropertyNames]] + [[getOwnPropertySymbols]] | الاتنين في نداء واحد |
| [[defineProperty]] | [[Object.defineProperty]] | boolean بدل الرمي |
| [[getOwnPropertyDescriptor]] | نفس الاسم في [[Object]] | بيرمي مع primitive |
| [[getPrototypeOf]] | نفس الاسم في [[Object]] | بيرمي مع primitive |
| [[setPrototypeOf]] | نفس الاسم في [[Object]] | boolean بدل الرمي |
| [[isExtensible]] | [[Object.isExtensible]] | بيرمي مع primitive |
| [[preventExtensions]] | [[Object.preventExtensions]] | boolean، وبيرمي مع primitive |
| [[apply(f, t, args)]] | [[f.apply(t, args)]] | مش بيتأثر لو [[apply]] اتغيّرت على الدالة |
| [[construct(C, args, nt)]] | [[new C(...args)]] | التالت بيحدد [[new.target]] |

~~~js reflect-vs-object.mjs
console.log(Object.getPrototypeOf(1) === Number.prototype, Object.isExtensible(1), Object.preventExtensions(1));
for (const f of [() => Reflect.getPrototypeOf(1), () => Reflect.isExtensible(1), () => Reflect.preventExtensions(1)]) {
  try { f(); } catch (e) { console.log(e.message); }
}
~~~

~~~text الناتج (Node 24.22)
true false 1
Reflect.getPrototypeOf called on non-object
Reflect.isExtensible called on non-object
Reflect.preventExtensions called on non-object
~~~

[[Object.*]] بتحوّل الـ primitive (أو تتعامل معاه كأنه متجمّد) من غير ما تقول، و [[Reflect.*]] بترمي، لأن الـ trap المقابل في Proxy عمره ما بيستقبل primitive.` },
          ],
          flag: "script",
          deep: {
            why: R`[[Reflect]] اتعمل مع [[Proxy]] في ES2015 لسببين: يدّي كل trap طريقة يكمّل بيها السلوك الأصلي بنفس الـ arguments ([[return Reflect.set(t, k, v, r)]])، ويلم العمليات اللي كانت متفرقة (operators زي [[in]] و [[delete]]، و methods على [[Object]]، و [[Function.prototype.apply]]) في مكان واحد بشكل واحد: دوال بترجّع نتيجة واضحة. ولو بتكتب أداة عامة (validation، أو serializer، أو test mocks، أو ORM) هتحتاج تعمل العمليات دي على objects مش بتاعتك من غير ما تقع.`,
            how: R`كل object في المواصفات ليه ١١ «internal method» (و ١٣ لو دالة: Call و Construct). كل دالة في [[Reflect]] بتنادي واحدة منهم مباشرة، وبترجّع نتيجتها زي ما هي:

- العمليات اللي بتغيّر ([[set]] و [[defineProperty]] و [[deleteProperty]] و [[setPrototypeOf]] و [[preventExtensions]]) بترجّع boolean النجاح، و [[Object.*]] و الـ operators في strict mode هما اللي بيحوّلوا [[false]] لـ [[TypeError]].
- أي target مش object بيرمي ([[Reflect.get called on non-object]]) لأن العملية الداخلية مش موجودة على primitive.
- [[Reflect.apply(f, thisArg, argsList)]]: [[argsList]] لازم array-like، وإلا [[TypeError: CreateListFromArrayLike called on non-object]] (اتجرّب بـ [[Reflect.apply(Math.max, null)]]).
- [[Reflect.construct(C, args, newTarget)]]: [[C]] لازم constructor (arrow رمت [[() => {} is not a constructor]])، والتالت بيحدد [[new.target]] والـ prototype: [[Reflect.construct(Animal, [], Dog)]] طلّع [[Dog { kind: 'Dog' }]] و [[instanceof Dog]] بـ [[true]].
- و [[Reflect]] نفسه مش constructor: [[new Reflect()]] رمت [[Reflect is not a constructor]]، و [[Reflect[Symbol.toStringTag] ]] بـ [["Reflect"]].`,
            when: R`جوه أي Proxy trap: دايمًا [[Reflect]] بنفس الاسم ونفس الـ arguments. في كود عام بيتعامل مع objects غريبة: [[Reflect.ownKeys]] (كل المفاتيح)، و [[Reflect.apply]] (نداء آمن)، و [[Reflect.defineProperty]] لما الفشل حالة عادية. و [[Reflect.construct]] لما محتاج [[new]] بـ arguments في array أو [[new.target]] مختلف. وفي الكود العادي اليومي: [[obj.x]] و [[x in obj]] أوضح من [[Reflect.get]] و [[Reflect.has]].`,
            mistakes: R`- تستخدم [[Reflect.set]] وتنسى تبص على الناتج: الفشل ساكت ([[false]]) حتى في strict.
- تبعت receiver غلط في [[Reflect.set]] أو [[Reflect.get]]: الكتابة بتروح لـ object تاني.
- [[Reflect.apply(fn, null)]] من غير array: [[CreateListFromArrayLike called on non-object]].
- تتوقع [[Reflect.getPrototypeOf(1)]] يرجّع [[Number.prototype]] زي [[Object.getPrototypeOf]]: بيرمي.
- [[Object.keys(Reflect)]] فاضية فتفتكر [[Reflect]] فاضي.
- تفتكر [[Reflect.has]] = [[Object.hasOwn]]: لأ، [[has]] = [[in]] وبيشوف الموروث.`,
          },
          teach: R`## الفكرة في سطرين

[[Reflect]] = العمليات الداخلية بتاعة المحرك على الـ objects، كدوال عادية. نفس اللي بيحصل في [[obj.x]] و [[x in obj]] و [[delete]] و [[new]]، بس بترجّع النتيجة بدل ما ترمي. الناتج من Node 24.22 كملف [[.mjs]] (strict).

---

## ١. الـ ١٣ دالة

| الدالة | العملية | بترجّع |
|---|---|---|
| [[Reflect.get]] ([[target, key, receiver]]) | قراية [[ target[key] ]]، والـ getter بيتنادى بـ [[this = receiver]] | القيمة |
| [[Reflect.set]] ([[target, key, value, receiver]]) | كتابة | [[true]] أو [[false]] |
| [[Reflect.has]] ([[target, key]]) | [[key in target]] (بالموروث) | boolean |
| [[Reflect.deleteProperty]] ([[target, key]]) | [[delete target[key] ]] | [[true]] أو [[false]] |
| [[Reflect.ownKeys]] ([[target]]) | كل المفاتيح الـ own: نصوص و Symbols، ظاهرة ومخفية | array |
| [[Reflect.defineProperty]] ([[target, key, desc]]) | زي [[Object.defineProperty]] | [[true]] أو [[false]] |
| [[Reflect.getOwnPropertyDescriptor]] ([[target, key]]) | زي [[Object.getOwnPropertyDescriptor]] | descriptor أو [[undefined]] |
| [[Reflect.getPrototypeOf]] ([[target]]) | الـ prototype | object أو [[null]] |
| [[Reflect.setPrototypeOf]] ([[target, proto]]) | تغيير الـ prototype | [[true]] أو [[false]] |
| [[Reflect.isExtensible]] ([[target]]) | بيقبل إضافة؟ | boolean |
| [[Reflect.preventExtensions]] ([[target]]) | امنع الإضافة | [[true]] أو [[false]] |
| [[Reflect.apply]] ([[fn, thisArg, args]]) | نداء الدالة بـ [[this]] و arguments في array | ناتج الدالة |
| [[Reflect.construct]] ([[C, args, newTarget]]) | [[new C(...args)]] | الـ object الجديد |

كل اسم هنا هو نفس اسم trap في [[Proxy]] بنفس الـ arguments بالظبط. ده مقصود.

---

## ٢. boolean بدل الرمي

~~~js
const locked = Object.freeze({ id: 7 });
console.log(Reflect.defineProperty(locked, 'id', { value: 8 }), Reflect.set(locked, 'id', 8));
try { Object.defineProperty(locked, 'id', { value: 8 }); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
false false
Cannot redefine property: id
~~~

نفس العملية: [[Reflect]] قال «فشلت» بـ [[false]]، و [[Object.defineProperty]] رمى. والملف strict، يعني حتى [[Reflect.set]] مرماش زي ما [[locked.id = 8]] كانت هترمي.

### [[Reflect.deleteProperty]] و [[Reflect.has]] و [[Reflect.ownKeys]]

~~~text الناتج
false true [ 'a', Symbol(s) ]
~~~

المسح من متجمّد فشل ([[false]]) و [[id]] لسه موجودة ([[true]]). و [[ownKeys]] جابت النص والـ Symbol مع بعض (درس «enumerability و ownership»).

---

## ٣. [[Reflect.get]] والـ receiver

~~~js
const user = { first: 'Sara', get greet() { return 'أهلًا ' + this.first; } };
console.log(Reflect.get(user, 'greet'), Reflect.get(user, 'greet', { first: 'Mona' }));
~~~

~~~text الناتج
أهلًا Sara أهلًا Mona
~~~

التالت هو الـ receiver: الـ [[this]] اللي الـ getter بيشتغل بيه. الـ getter موجود في [[user]]، بس [[this.first]] اتقرت من الـ receiver. ده بالظبط اللي بيخلّي الـ Proxy يشوف القرايات اللي جوه الـ getters (درس «Proxy و Reflect»، قسم [[receiver]]).

---

## ٤. [[Reflect.apply]] و [[Reflect.construct]]

~~~js
function sum(...n) { return n.reduce((a, b) => a + b, 0); }
sum.apply = null;
console.log(Reflect.apply(sum, null, [1, 2, 3]));
~~~

~~~text الناتج
6
~~~

حد بوّظ [[sum.apply]]، فـ [[sum.apply(null, [1, 2, 3])]] كانت هترمي [[sum.apply is not a function]]. [[Reflect.apply]] مش بتقرا حاجة من الدالة، فشغالة. وده نفس [[Function.prototype.apply.call(sum, null, [1, 2, 3])]] بس مقروء.

~~~js
class Point { constructor(x) { this.x = x; } }
const p = Reflect.construct(Point, [4]);
console.log(p instanceof Point, p.x);
~~~

~~~text الناتج
true 4
~~~

[[Reflect.construct(Point, [4])]] = [[new Point(4)]]. والتالت الاختياري [[newTarget]] بيغيّر [[new.target]] والـ prototype (درس «Function»، قسم [[new.target]]).

---

## ٥. الـ prototype والقفل

~~~text الناتج
true false false
{ value: 7, writable: false, enumerable: true, configurable: false } true
~~~

[[getPrototypeOf]] زي [[Object.getPrototypeOf]]، و [[setPrototypeOf]] على متجمّد رجّعت [[false]] (مش [[TypeError]] زي [[Object.setPrototypeOf]])، و [[isExtensible]] [[false]]. و [[preventExtensions({})]] نجحت فرجّعت [[true]] (مش الـ object زي [[Object.preventExtensions]]).

---

## ٦. الـ primitives بترمي

~~~text الناتج
Reflect.getPrototypeOf called on non-object
~~~

[[Object.getPrototypeOf(1)]] بترجّع [[Number.prototype]] لأنها بتلف الرقم في object الأول. [[Reflect]] مبيعملش كده: كل دوالّه (حتى [[get]] و [[has]] و [[ownKeys]]) رمت مع primitive، والرسالة دايمًا [[Reflect.xxx called on non-object]].

---

## الخلاصة

- ١٣ دالة بأسامي الـ Proxy traps وبنفس الـ arguments.
- اللي بيغيّر بيرجّع boolean، ومبيرميش حتى في strict.
- الـ primitive بيرمي، عكس [[Object.*]].
- [[Reflect.apply]] و [[Reflect.construct]] آمنين ضد اللي بيغيّر [[apply]] على الدالة.
- الـ receiver في [[get]] و [[set]] هو [[this]] والمكان اللي الكتابة بتروحله.`,
          lines: [
            R`object متجمّد عشان نشوف [[Reflect]] بيتصرّف إزاي لما العملية تفشل.`,
            R`[[Reflect.defineProperty]] و [[Reflect.set]] الاتنين فشلوا ورجّعوا [[false false]]، من غير رمي مع إن الملف strict.`,
            R`نفس التعريف بـ [[Object.defineProperty]]: رمى [[Cannot redefine property: id]]. ده الفرق كله.`,
            R`المسح فشل ([[false]])، و [[id]] لسه موجودة ([[true]])، و [[ownKeys]] جابت [[ 'a' ]] والـ Symbol مع بعض.`,
            R`object فيه getter بيستخدم [[this.first]]، عشان نشوف الـ receiver.`,
            R`من غير receiver: [[this = user]] فـ «أهلًا Sara». ومع receiver تاني: [[this]] بقى الـ object ده فـ «أهلًا Mona».`,
            R`دالة بتجمع أي عدد أرقام.`,
            R`بنبوّظ [[apply]] على الدالة نفسها: خاصية own بتغطّي على [[Function.prototype.apply]].`,
            R`[[Reflect.apply(sum, null, [1, 2, 3])]] مش بتقرا [[sum.apply]] خالص، فطلّعت 6.`,
            R`class صغيرة الـ constructor بتاعها بيحط [[x]] على الـ object الجديد، عشان نعملها من غير [[new]] مكتوبة.`,
            R`[[Reflect.construct]] = [[new Point(4)]] والـ arguments في array.`,
            R`[[true 4]]: instance حقيقي من [[Point]].`,
            R`الـ prototype صح ([[true]])، وتغيير prototype المتجمّد فشل ([[false]])، والمتجمّد مش extensible ([[false]]).`,
            R`الـ descriptor بتاع [[id]]: مقفولة ([[writable: false]] و [[configurable: false]])، و [[preventExtensions]] على object جديد نجحت ([[true]]).`,
            R`primitive مع [[Reflect]]: رمى [[Reflect.getPrototypeOf called on non-object]]، عكس [[Object.getPrototypeOf(1)]].`,
          ],
          ref: [
            { t: "MDN: Reflect", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect" },
            { t: "MDN: Reflect.apply()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply" },
            { t: "MDN: Reflect.construct()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct" },
            { t: "MDN: Reflect.defineProperty()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty" },
            { t: "MDN: Reflect.ownKeys()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys" },
            { t: "MDN: Reflect.set()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set" },
            { t: "MDN: Comparing Reflect and Object methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods" },
            { t: "ECMAScript: The Reflect Object", url: "https://tc39.es/ecma262/multipage/reflection.html#sec-reflect-object" }
          ],
          pre: [{ to: "js/Proxy و Reflect", why: R`أول مرة شفت [[Reflect.get]] و [[Reflect.set]] جوه traps الـ [[get]] و [[set]]` }, "js/property descriptors: Object.defineProperty", "js/Object.preventExtensions و seal و freeze", "js/call و apply و bind"]
        },
        {
          cmd: "Proxy: باقي الـ traps و Proxy.revocable",
          title: "الـ traps التسعة اللي فاضلين (ownKeys و defineProperty و apply و construct...)، والـ invariants اللي المحرك بيفرضها، و Proxy.revocable",
          desc: R`درس «Proxy و Reflect» غطّى [[get]] و [[set]] و [[has]] و [[deleteProperty]]. فيه ٩ traps تانيين: [[ownKeys]] (المفاتيح: [[Object.keys]] و JSON والـ spread)، و [[getOwnPropertyDescriptor]]، و [[defineProperty]]، و [[getPrototypeOf]] و [[setPrototypeOf]]، و [[isExtensible]] و [[preventExtensions]]، و [[apply]] (لما الـ Proxy دالة وحد ناداها)، و [[construct]] (لما حد عمل [[new]]). وكل trap ليه دالة [[Reflect]] بنفس الاسم.

والـ Proxy مش حر يكدب: فيه **invariants** المحرك بيتأكد منها بعد كل trap. مثلًا لو الـ target مقفول بـ [[preventExtensions]]، الـ [[ownKeys]] لازم يرجّع كل مفاتيحه، وإلا [[TypeError: 'ownKeys' on proxy: trap result did not include '_token']].

و [[Proxy.revocable(target, handler)]] بيرجّع [[{ proxy, revoke }]]: بعد [[revoke()]] أي عملية على الـ proxy بترمي. مفيد لما تدّي كود تاني صلاحية مؤقتة على object.`,
          example: R`// الـ traps اللي بتتحكم في المفاتيح والتعريف والقفل والـ prototype، وفي النداء نفسه
const log = [];
const hidden = (k) => typeof k === 'string' && k.startsWith('_');
const store = new Proxy({ id: 1, _token: 'x' }, {
  ownKeys(t) { log.push('ownKeys'); return Reflect.ownKeys(t).filter((k) => !hidden(k)); },
  getOwnPropertyDescriptor(t, k) { log.push('gopd ' + String(k)); return Reflect.getOwnPropertyDescriptor(t, k); },
  defineProperty(t, k, d) { log.push('define ' + String(k)); return !hidden(k) && Reflect.defineProperty(t, k, d); },
  preventExtensions(t) { log.push('preventExtensions'); return Reflect.preventExtensions(t); },
  isExtensible(t) { log.push('isExtensible'); return Reflect.isExtensible(t); },
  setPrototypeOf() { log.push('setPrototypeOf'); return false; },
});
console.log(Object.keys(store), JSON.stringify(store));
Object.defineProperty(store, 'name', { value: 'Sara', enumerable: true });
try { Object.defineProperty(store, '_x', { value: 1 }); } catch (e) { console.log(e.message); }
try { Object.setPrototypeOf(store, null); } catch (e) { console.log(e.message); }
Object.preventExtensions(store);
console.log(Object.isExtensible(store), log);
let calls = 0;
const price = new Proxy((base, qty) => base * qty, {
  apply(fn, thisArg, args) { calls++; return Reflect.apply(fn, thisArg, args); },
});
class User { constructor(name) { this.name = name; } }
const Tracked = new Proxy(User, {
  construct(C, args, newTarget) { if (!args[0]) throw new TypeError('الاسم مطلوب'); return Reflect.construct(C, args, newTarget); },
});
console.log(price(10, 3), price(2, 2), calls, new Tracked('Mona') instanceof User);
try { new Tracked(); } catch (e) { console.log(e.message); }
const { proxy, revoke } = Proxy.revocable({ plan: 'pro' }, {});
console.log(proxy.plan);
revoke();
try { proxy.plan; } catch (e) { console.log(e.message); }`,
          try: R`في ملف المثال، بعد سطر [[Object.preventExtensions(store)]] زوّد [[console.log(Object.keys(store))]] وشغّل: إيه اللي حصل وليه؟ وبعدين جرّب Proxy على object متجمّد [[Object.freeze({ id: 1 })]] بـ [[get: () => 2]] واقرا [[.id]].`,
          sol: R`~~~text الناتج (Node 24.22)
TypeError: 'ownKeys' on proxy: trap result did not include '_token'
TypeError: 'get' on proxy: property 'id' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '1' but got '2')
~~~

الاتنين invariants:

- بعد [[preventExtensions]] الـ target مبقاش بيقبل إضافة، فالمحرك بقى يطلب من [[ownKeys]] يرجّع **كل** مفاتيح الـ target بالظبط. الـ trap خبّى [[_token]] فرمى. قبل القفل نفس الـ trap كان شغال ([[[ 'id' ]]]). يعني الإخفاء بـ [[ownKeys]] بيتكسر لحظة ما حد يعمل [[Object.freeze]] أو [[seal]] على الـ proxy.
- خاصية [[writable: false]] و [[configurable: false]] (والـ freeze بيعمل كده) لازم [[get]] يرجّع قيمتها الحقيقية. المحرك بيقارن بنفسه ويرمي.

الفكرة: المحرك بيضمن إن أي حاجة «مقفولة نهائيًا» في الـ target تفضل بنفس الشكل من برّه، حتى لو في Proxy في النص.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** Proxy كل traps بتاعته بتسجّل اسمها وترجّع [[Reflect]] بنفس الاسم. اكتب الـ traps اللي هتتنادى بالترتيب لـ: [[Object.keys(p)]]، و [[{ ...p }]]، و [[JSON.stringify(p)]]، و [[ 'a' in p ]]، على [[{ a: 1, b: 2 }]]:

~~~js
const log = [];
const handler = {};
for (const trap of Object.getOwnPropertyNames(Reflect)) {
  handler[trap] = (...args) => { log.push(trap + (typeof args[1] === 'string' ? ' ' + args[1] : '')); return Reflect[trap](...args); };
}
const p = new Proxy({ a: 1, b: 2 }, handler);
Object.keys(p); console.log('keys:', log.splice(0));
({ ...p }); console.log('spread:', log.splice(0));
JSON.stringify(p); console.log('json:', log.splice(0));
'a' in p; console.log('in:', log.splice(0));
~~~`, done: R`توقّعت إن [[Object.keys]] بينادي [[ownKeys]] وبعده [[getOwnPropertyDescriptor]] لكل مفتاح، وإن JSON بيبدأ بـ [[get toJSON]]، وطلع قريب من توقّعك، وتعرف ليه [[Object.keys]] محتاج الـ descriptor.`, sol: R`~~~text الناتج (Node 24.22)
keys: [
  'ownKeys',
  'getOwnPropertyDescriptor a',
  'getOwnPropertyDescriptor b'
]
spread: [
  'ownKeys',
  'getOwnPropertyDescriptor a',
  'get a',
  'getOwnPropertyDescriptor b',
  'get b'
]
json: [
  'get toJSON',
  'ownKeys',
  'getOwnPropertyDescriptor a',
  'getOwnPropertyDescriptor b',
  'get a',
  'get b'
]
in: [ 'has a' ]
~~~

- [[Object.keys]] = [[ownKeys]] وبعدين لكل مفتاح «هو enumerable؟» = [[getOwnPropertyDescriptor]]. عشان كده لو [[ownKeys]] رجّع مفتاح مش موجود في الـ target ومعملتش [[getOwnPropertyDescriptor]] يأكّده، [[Object.keys]] بيشيله (اتجرّب: [[ownKeys: () => ['ghost']]] طلّع [[[]]]، ولما زوّدنا descriptor طلّع [[[ 'ghost' ]]]).
- الـ spread بيعمل نفس الحاجة بس بيقرا كل قيمة بعد ما يتأكد منها ([[get]]).
- JSON بيسأل عن [[toJSON]] الأول، وبعدين بيجمع المفاتيح كلها، وبعدين يقرا القيم.
- [[in]] = [[has]] بس.

ده بيوضّح ليه trap واحد زي [[ownKeys]] مش كفاية عشان تخبّي خاصية: لازم [[getOwnPropertyDescriptor]] و [[has]] و [[get]] يتفقوا معاه.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[readOnly(obj, name)]] بترجّع Proxy القراية فيه عادية (و [[Object.keys]] و JSON شغالين)، بس أي محاولة تغيير ترمي [[TypeError]] برسالة فيها الاسم والعملية: الكتابة، والـ [[defineProperty]]، والمسح، وتغيير الـ prototype، والقفل ([[Object.freeze]]).`, done: R`[[plan.tier]] و [[Object.keys(plan)]] و [[JSON.stringify(plan)]] شغالين، والخمس محاولات بيرموا ٥ رسايل مختلفة، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js read-only.mjs
function readOnly(obj, name = 'object') {
  const refuse = (op) => () => { throw new TypeError(name + ' للقراية بس: مينفعش ' + op); };
  return new Proxy(obj, {
    set: refuse('تكتب'),
    defineProperty: refuse('تعرّف خاصية'),
    deleteProperty: refuse('تمسح'),
    setPrototypeOf: refuse('تغيّر الـ prototype'),
    preventExtensions: refuse('تقفله'),
  });
}
const plan = readOnly({ tier: 'pro', seats: 5 }, 'plan');
console.log(plan.tier, Object.keys(plan), JSON.stringify(plan));
for (const op of [() => { plan.seats = 99; }, () => { delete plan.tier; }, () => Object.defineProperty(plan, 'x', { value: 1 }), () => Object.setPrototypeOf(plan, null), () => Object.freeze(plan)]) {
  try { op(); } catch (e) { console.log(e.message); }
}
~~~

~~~text الناتج (Node 24.22)
pro [ 'tier', 'seats' ] {"tier":"pro","seats":5}
plan للقراية بس: مينفعش تكتب
plan للقراية بس: مينفعش تمسح
plan للقراية بس: مينفعش تعرّف خاصية
plan للقراية بس: مينفعش تغيّر الـ prototype
plan للقراية بس: مينفعش تقفله
~~~

**الشرح:** الرمي من جوه الـ trap بيوصل للي نادى زي ما هو، فرسالتك بتظهر بدل [[trap returned falsish]]. و [[defineProperty]] لازم يتقفل كمان، وإلا [[Object.defineProperty(plan, ...)]] كانت هتعدّي من ورا [[set]]. و [[Object.freeze(plan)]] أول حاجة بتعملها [[preventExtensions]] فوقعت هناك. ولاحظ إن ده بيحمي من اللي معاه الـ proxy بس: اللي معاه الـ object الأصلي يقدر يغيّره (والـ proxy هيشوف التغيير).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[memo(fn)]] بترجّع Proxy على الدالة بـ trap [[apply]] بيحفظ الناتج في [[Map]] بمفتاح [[JSON.stringify(args)]]، فالنداء التاني بنفس الـ arguments مبيشغّلش الدالة. واطبع إن [[name]] و [[length]] و [[typeof]] لسه زي الأصل.`, done: R`٣ نداءات منهم اتنين متشابهين بيشغّلوا الدالة مرتين بس ([[runs]] بـ 2)، و [[slowTax.name]] بـ [[tax]] و [[length]] بـ 2.`, sol: R`~~~js memo.mjs
function memo(fn) {
  const cache = new Map();
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args);
      if (!cache.has(key)) cache.set(key, Reflect.apply(target, thisArg, args));
      return cache.get(key);
    },
  });
}
let runs = 0;
const slowTax = memo(function tax(amount, rate) { runs++; return Math.round(amount * rate * 100) / 100; });
console.log(slowTax(100, 0.14), slowTax(100, 0.14), slowTax(250, 0.14), runs);
console.log(slowTax.name, slowTax.length, typeof slowTax);
~~~

~~~text الناتج (Node 24.22)
14 14 35 2
tax 2 function
~~~

**الشرح:** الـ [[apply]] trap بيستقبل الدالة الأصلية، والـ [[this]] اللي اتنادت بيه، والـ arguments كـ array. وميزة الـ Proxy على wrapper عادي ([[(...args) => ...]]): القراية من الـ proxy (زي [[name]] و [[length]]) بتعدّي للأصل، فالأدوات اللي بتبص على [[fn.length]] (درس «Function») مش بتتلخبط. والـ [[apply]] trap بيشتغل بس لو الـ target نفسه دالة: Proxy على object عادي بـ [[apply]] ونداه رمى [[TypeError: ... is not a function]]. وعيب [[JSON.stringify(args)]]: objects مختلفة بنفس الشكل بتاخد نفس المفتاح، و [[undefined]] بيبقى [[null]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** عايز تدّي واجهة الإعدادات من غير المفاتيح السرية، والإعدادات متجمّدة:

~~~js
const config = Object.freeze({ port: 8080, _secret: 'k' });
const publicView = new Proxy(config, { ownKeys: (t) => Reflect.ownKeys(t).filter((k) => !k.startsWith('_')) });
console.log(Object.keys(publicView));
~~~`, done: R`[[Object.keys(publicView)]] بـ [[[ 'port' ]]]، و [[publicView._secret]] بـ [[undefined]]، والـ view متجمّد.`, sol: R`~~~text الناتج قبل التصليح
TypeError: 'ownKeys' on proxy: trap result did not include '_secret'
~~~

الـ target متجمّد يعني non-extensible، والـ invariant بيقول: [[ownKeys]] على target مش extensible لازم يرجّع **كل** مفاتيحه. فمفيش أي trap يقدر يخبّي مفتاح من object متجمّد. (وحتى لو مش متجمّد، [[_secret]] لو كانت [[configurable: false]] كانت هتوقع برضه: [[trap result did not include '_fixed']] في التجربة.)

الحل: متخبّيش من الأصل، اعمل object تاني فيه اللي عايز تظهره بس:

~~~js public-view.mjs
const config = Object.freeze({ port: 8080, _secret: 'k' });
const visible = Object.freeze(Object.fromEntries(Object.entries(config).filter(([k]) => !k.startsWith('_'))));
const publicView = new Proxy(visible, {});
console.log(Object.keys(publicView), publicView._secret, Object.isFrozen(publicView));
~~~

~~~text الناتج (Node 24.22)
[ 'port' ] undefined true
~~~

وكمان أأمن: [[_secret]] مش موجودة أصلًا في اللي اتدّى، فمفيش trap نسيته ([[get]] أو [[has]] أو [[getOwnPropertyDescriptor]]) يسرّبها. والـ Proxy الفاضي هنا ملوش لازمة غير لو هتزوّد traps بعدين، وممكن تدّي [[visible]] نفسها.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** تحقق على [[age]] بطريقتين: Proxy بـ [[set]]، و object فيه getter و setter. اكتب مليون مرة في كل واحد وقيس بـ [[performance.now()]]، مرتين.`, done: R`عندك ٤ أرقام، والـ setter أسرع بفرق واضح، وتقدر تقول إمتى الفرق ده يفرق وإمتى لأ.`, sol: R`~~~js bench-validate.mjs
function viaProxy() {
  return new Proxy({ age: 0 }, {
    set(t, k, v, r) {
      if (k === 'age' && (!Number.isInteger(v) || v < 0)) throw new TypeError('age غلط');
      return Reflect.set(t, k, v, r);
    },
  });
}
function viaAccessor() {
  let age = 0;
  return {
    get age() { return age; },
    set age(v) { if (!Number.isInteger(v) || v < 0) throw new TypeError('age غلط'); age = v; },
  };
}
for (let round = 0; round < 2; round++) {
  for (const [label, make] of [['Proxy set', viaProxy], ['setter', viaAccessor]]) {
    const o = make();
    const t0 = performance.now();
    for (let i = 0; i < 1_000_000; i++) o.age = i;
    console.log(label.padEnd(10), (performance.now() - t0).toFixed(1).padStart(6), 'ms', o.age);
  }
}
~~~

~~~text الناتج (Node 24.22، ويندوز ١١)
Proxy set   276.1 ms 999999
setter       79.3 ms 999999
Proxy set   273.9 ms 999999
setter       75.1 ms 999999
~~~

**الـ setter أسرع حوالي ٣.٥ مرة.** الـ Proxy كل كتابة فيها نداء trap ونداء [[Reflect.set]] وفحوص invariants، والمحرك بيعرف يحسّن الـ setter العادي أكتر بكتير. بس خلي بالك من الرقم نفسه: ٠٫٢٧ مايكروثانية للكتابة. في فورم أو إعدادات أو state بيتغيّر عشرات المرات في الثانية، الفرق صفر عمليًا. في loop بيعالج ملايين عناصر، ابعد عن الـ Proxy. والـ Proxy بيكسب لما الخصايص مش معروفة مقدمًا (validation بـ schema، أو reactivity).` },
          ],
          check: { lang: "js", starter: R`function readOnly(obj, name = 'object') {
  // رجّع Proxy القراية فيه عادية، وأي تغيير يرمي TypeError فيه name
  return obj;
}`, tests: R`test("القراية شغالة", () => { const p = readOnly({ a: 1 }); expect(p.a).toBe(1); expect(Object.keys(p)).toEqual(['a']); });
test("الكتابة بترمي", () => { const p = readOnly({ a: 1 }, 'plan'); expect(() => { p.a = 2; }).toThrow('plan'); });
test("defineProperty بيرمي", () => { const p = readOnly({ a: 1 }, 'plan'); expect(() => Object.defineProperty(p, 'b', { value: 1 })).toThrow('plan'); });
test("المسح بيرمي", () => { const p = readOnly({ a: 1 }, 'plan'); expect(() => { delete p.a; }).toThrow('plan'); });
test("setPrototypeOf بيرمي", () => { const p = readOnly({ a: 1 }, 'plan'); expect(() => Object.setPrototypeOf(p, null)).toThrow('plan'); });
test("freeze بيرمي", () => { const p = readOnly({ a: 1 }, 'plan'); expect(() => Object.freeze(p)).toThrow('plan'); });
test("الأصل مبيتغيّرش", () => { const raw = { a: 1 }; const p = readOnly(raw, 'x'); try { p.a = 5; } catch (e) {} expect(raw.a).toBe(1); });`, solution: R`function readOnly(obj, name = 'object') {
  const refuse = (op) => () => { throw new TypeError(name + ' للقراية بس: مينفعش ' + op); };
  return new Proxy(obj, {
    set: refuse('تكتب'),
    defineProperty: refuse('تعرّف خاصية'),
    deleteProperty: refuse('تمسح'),
    setPrototypeOf: refuse('تغيّر الـ prototype'),
    preventExtensions: refuse('تقفله'),
  });
}` },
          flag: "script",
          deep: {
            why: R`الأربع traps الأولانيين بيكفّوا لـ validation بسيط، بس أي أداة حقيقية (read-only views، و mocks في الاختبارات، و ORM بيعرض أعمدة الجدول كخصايص، و reactivity زي Vue) لازم تتحكم في المفاتيح ([[ownKeys]]) والتعريف ([[defineProperty]]) عشان محدش يعدّي من الباب الخلفي، وفي النداء ([[apply]] و [[construct]]) عشان تلف دوال و classes. والـ invariants هي اللي بتقولك إيه اللي **مينفعش** تعمله، فلو مش عارفها هتكتب Proxy بيشتغل في التجربة ويقع أول ما حد يعمل [[Object.freeze]].`,
            how: R`كل عملية على الـ proxy بتنادي الـ internal method المقابلة: [[OwnPropertyKeys]] ← [[ownKeys]]، و [[GetOwnProperty]] ← [[getOwnPropertyDescriptor]]، و [[DefineOwnProperty]] ← [[defineProperty]]، و [[Call]] ← [[apply]]، و [[Construct]] ← [[construct]]... ولو الـ trap مش موجود العملية بتروح للـ target.

بعد ما الـ trap يرجّع، المحرك بيقارن الناتج بالـ target ويرمي لو الكدبة تكسر حاجة مضمونة:

- [[ownKeys]]: لازم array من نصوص و Symbols من غير تكرار، وفيها كل مفتاح non-configurable، ولو الـ target مش extensible لازم تبقى مفاتيحه بالظبط.
- [[getOwnPropertyDescriptor]]: متقولش non-configurable على حاجة configurable، ومتخبّيش ([[undefined]]) حاجة non-configurable.
- [[defineProperty]]: متقولش «نجحت» في تعريف non-configurable مش موجود فعلًا كده في الـ target.
- [[isExtensible]]: لازم يطابق الـ target بالظبط. و [[preventExtensions]]: متقولش [[true]] والـ target لسه extensible.
- [[getPrototypeOf]] و [[setPrototypeOf]]: لو الـ target مش extensible لازم الحقيقة.
- [[construct]]: لازم يرجّع object.

و [[apply]] و [[construct]] موجودين بس لو الـ target دالة (أو constructor)، و [[typeof]] الـ proxy بيبقى [[function]] ساعتها. و [[Proxy.revocable]] بيعمل proxy عادي ودالة [[revoke]] بتمسح الـ target والـ handler من جواه، فأي عملية بعدها [[Cannot perform 'xxx' on a proxy that has been revoked]]، و [[revoke()]] تاني مبترميش.`,
            when: R`[[ownKeys]] + [[getOwnPropertyDescriptor]]: لما بتعرض مفاتيح مش موجودة فعلًا (ORM، أو env vars) أو بتخفي مفاتيح من object **مش مقفول**. [[defineProperty]]: اقفله في أي Proxy بيعمل validation، وإلا [[Object.defineProperty]] بيعدّي من ورا [[set]]. [[apply]]: لوج، و memoize، و rate limit، و mocks للدوال. [[construct]]: تحقق من arguments الـ class، أو تسجيل كل instance، أو singleton. [[setPrototypeOf]] و [[preventExtensions]]: لما عايز object محدش يغيّر شكله. و [[Proxy.revocable]]: plugin أو كود طرف تالت أو صلاحية مؤقتة (session) تقدر تسحبها.`,
            mistakes: R`- تخبّي مفتاح بـ [[ownKeys]] بس: [[get]] و [[has]] و [[getOwnPropertyDescriptor]] لسه بيكشفوه.
- تخبّي بـ [[ownKeys]] من target هيتقفل بعدين: [[trap result did not include '_token']].
- [[get]] بيرجّع قيمة تانية لخاصية متجمّدة: [[TypeError: 'get' on proxy: property 'id' is a read-only and non-configurable data property ...]].
- [[ownKeys]] بيرجّع تكرار: [[trap returned duplicate entries]]، أو رقم: [[1 is not a valid property name]].
- [[isExtensible]] بيكدب: [[trap result does not reflect extensibility of proxy target (which is 'true')]].
- [[construct]] بيرجّع primitive: [[trap returned non-object ('1')]].
- [[apply]] على target مش دالة: الـ proxy مش callable أصلًا.
- [[Proxy(...)]] من غير [[new]]: [[TypeError: Constructor Proxy requires 'new']].
- [[setPrototypeOf]] بيرجّع [[false]]: الرسالة في V8 [['setPrototypeOf' on proxy: trap returned falsish for property 'undefined']] (كلمة property هنا ملهاش معنى، دي من V8 نفسه).
- تحط Proxy في كود سخن: قراية من Proxy فاضي أبطأ ٢٥ مرة من object عادي في القياس.`,
          },
          teach: R`## الفكرة في سطرين

فيه ١٣ trap، وكل واحد بيعترض عملية داخلية واحدة. الأربعة المشهورين في درس «Proxy و Reflect». هنا التسعة الباقيين، والقواعد اللي بتمنع الـ Proxy يكدب، و [[Proxy.revocable]]. الناتج من Node 24.22 كملف [[.mjs]].

---

## ١. خريطة الـ traps الـ ١٣

| الـ trap | بيتنادى مع | المقابل |
|---|---|---|
| [[get]] و [[set]] و [[has]] و [[deleteProperty]] | القراية والكتابة و [[in]] و [[delete]] | درس «Proxy و Reflect» |
| [[ownKeys]] | [[Object.keys]] و [[Reflect.ownKeys]] و [[for...in]] و JSON والـ spread و [[getOwnPropertyNames]] | [[Reflect.ownKeys]] |
| [[getOwnPropertyDescriptor]] | [[Object.getOwnPropertyDescriptor]]، وكل اللي بيسأل «enumerable؟» زي [[Object.keys]] | [[Reflect.getOwnPropertyDescriptor]] |
| [[defineProperty]] | [[Object.defineProperty]]، وكمان آخر خطوة في [[Reflect.set]] لما الـ receiver هو الـ proxy | [[Reflect.defineProperty]] |
| [[getPrototypeOf]] | [[Object.getPrototypeOf]] و [[instanceof]] و [[isPrototypeOf]] | [[Reflect.getPrototypeOf]] |
| [[setPrototypeOf]] | [[Object.setPrototypeOf]] | [[Reflect.setPrototypeOf]] |
| [[isExtensible]] | [[Object.isExtensible]] و [[isSealed]] و [[isFrozen]] | [[Reflect.isExtensible]] |
| [[preventExtensions]] | [[Object.preventExtensions]] و [[seal]] و [[freeze]] | [[Reflect.preventExtensions]] |
| [[apply]] | نداء الـ proxy كدالة | [[Reflect.apply]] |
| [[construct]] | [[new proxy()]] | [[Reflect.construct]] |

---

## ٢. [[ownKeys]] و [[getOwnPropertyDescriptor]]: المفاتيح

~~~js
ownKeys(t) { log.push('ownKeys'); return Reflect.ownKeys(t).filter((k) => !hidden(k)); },
getOwnPropertyDescriptor(t, k) { log.push('gopd ' + String(k)); return Reflect.getOwnPropertyDescriptor(t, k); },
~~~

~~~text الناتج
[ 'id' ] {"id":1}
~~~

و اللوج بعد السطر ده: [[ownKeys]] ثم [[gopd id]] مرتين (مرة لـ [[Object.keys]] ومرة لـ JSON). [[ownKeys]] خبّى [[_token]] فمحدش سأل عنها. والـ [[getOwnPropertyDescriptor]] اتسأل عشان [[Object.keys]] لازم يعرف المفتاح enumerable ولا لأ.

### الـ invariants بتوع [[ownKeys]] (اتجرّبوا كلهم)

| الحالة | الرسالة |
|---|---|
| target اتقفل ([[preventExtensions]]) والـ trap خبّى مفتاح | رمى [[TypeError: 'ownKeys' on proxy: trap result did not include '_token']] لأن المقفول لازم يطلع كامل |
| target فيه خاصية [[configurable: false]] والـ trap خبّاها | رمى [[TypeError: 'ownKeys' on proxy: trap result did not include '_fixed']] حتى والـ target مفتوح |
| المفتاح متكرر في الناتج | [[TypeError: 'ownKeys' on proxy: trap returned duplicate entries]] |
| فيه رقم في الناتج | [[TypeError: 1 is not a valid property name]] |
| الناتج مش array | [[TypeError: CreateListFromArrayLike called on non-object]] |
| مفتاح زيادة مش في الـ target (والـ target مفتوح) | مفيش error، بس [[Object.keys]] شالته لأن الـ descriptor بـ [[undefined]]، ولما [[getOwnPropertyDescriptor]] رجّع descriptor ظهر |

### invariants الـ [[getOwnPropertyDescriptor]]

~~~text الناتج
'getOwnPropertyDescriptor' on proxy: trap reported non-configurability for property 'a' which is either non-existent or configurable in the proxy target
'getOwnPropertyDescriptor' on proxy: trap returned undefined for property '_fixed' which is non-configurable in the proxy target
~~~

الأولى: الـ trap قال إن [[a]] non-configurable وهي في الـ target configurable. التانية: الـ trap خبّى خاصية non-configurable. الاتنين ممنوعين.

---

## ٣. [[defineProperty]]: الباب الخلفي

~~~js
defineProperty(t, k, d) { log.push('define ' + String(k)); return !hidden(k) && Reflect.defineProperty(t, k, d); },
~~~

~~~text الناتج
'defineProperty' on proxy: trap returned falsish for property '_x'
~~~

[[Object.defineProperty(store, 'name', ...)]] عدّى، و [[_x]] اترفض. لاحظ إن [[Object.defineProperty]] رمى لأنه دايمًا بيرمي على الفشل (مش بس في strict). ولو عندك Proxy بـ [[set]] بيعمل validation ومعندكش [[defineProperty]]، أي حد يقدر يكتب بـ [[Object.defineProperty]] من غير ما يعدّي على التحقق. والعكس كمان: [[Reflect.set(t, k, v, receiver)]] لما الـ receiver هو الـ proxy بينادي [[defineProperty]] بتاعه في الآخر، فالـ trap ده بيتنادى مع الكتابة العادية كمان (اتشاف في مشروع «تتبّع التعديلات»).

والـ invariant: [[defineProperty: () => true]] مع descriptor [[configurable: false]] لخاصية مش موجودة رمى [[trap returned truish for defining non-configurable property 'z' which is either non-existent or configurable in the proxy target]].

---

## ٤. [[setPrototypeOf]] و [[getPrototypeOf]]

~~~text الناتج
'setPrototypeOf' on proxy: trap returned falsish for property 'undefined'
~~~

الـ trap رجّع [[false]] فـ [[Object.setPrototypeOf]] رمى. وكلمة [[property 'undefined']] غريبة: دي رسالة V8 كده (العملية ملهاش property أصلًا). و [[getPrototypeOf]] يقدر «يكدب» طول ما الـ target مفتوح: [[getPrototypeOf: () => Array.prototype]] خلّى [[proxy instanceof Array]] بـ [[true]] (بس [[Array.isArray]] لأ). ولو الـ target مقفول، لازم الحقيقة: [['getPrototypeOf' on proxy: proxy target is non-extensible but the trap did not return its actual prototype]]. ونفس الكلام [[setPrototypeOf]] اللي بيقول [[true]] على target مقفول: [[trap returned truish for setting a new prototype on the non-extensible proxy target]].

---

## ٥. [[preventExtensions]] و [[isExtensible]]

~~~text الناتج (آخر سطر في الجزء الأول)
false [
  'ownKeys',
  'gopd id',
  'ownKeys',
  'gopd id',
  'define name',
  'define _x',
  'setPrototypeOf',
  'preventExtensions',
  'isExtensible'
]
~~~

[[Object.preventExtensions(store)]] نادى الـ trap فقفل الـ target، و [[Object.isExtensible(store)]] نادى [[isExtensible]] فرجّع [[false]]. الاتنين **لازم** يقولوا الحقيقة:

| الكدبة | الرسالة (اتجرّبت) |
|---|---|
| [[isExtensible: () => false]] والـ target مفتوح | رمى [[trap result does not reflect extensibility of proxy target (which is 'true')]] |
| [[preventExtensions: () => true]] من غير ما تقفل الـ target | رمى [[trap returned truish but the proxy target is extensible]] |

يعني تقدر **ترفض** القفل (ترجّع [[false]] أو ترمي، زي تمرين [[readOnly]])، بس متقدرش تدّعي إنه حصل.

---

## ٦. [[apply]]: Proxy على دالة

~~~js
const price = new Proxy((base, qty) => base * qty, {
  apply(fn, thisArg, args) { calls++; return Reflect.apply(fn, thisArg, args); },
});
~~~

[[price(10, 3)]] و [[price(2, 2)]] عدّوا على الـ trap: [[30 4]] و [[calls]] بقت 2. الـ trap بياخد الدالة الأصلية، و [[this]] (لو اتنادت كـ method: [[o.m()]] بيبعت [[o]]، و [[fn.call('X')]] بيبعت [['X']])، والـ arguments كـ array. والـ trap ده بيشتغل بس لو الـ target دالة: [[new Proxy({}, { apply: () => 1 })()]] رمى [[is not a function]].

---

## ٧. [[construct]]: Proxy على class

~~~js
const Tracked = new Proxy(User, {
  construct(C, args, newTarget) { if (!args[0]) throw new TypeError('الاسم مطلوب'); return Reflect.construct(C, args, newTarget); },
});
~~~

~~~text الناتج
30 4 2 true
الاسم مطلوب
~~~

[[new Tracked('Mona')]] عدّى على الـ trap وطلع [[User]] حقيقي ([[instanceof User]] بـ [[true]])، و [[new Tracked()]] اترفض. التالت [[newTarget]] هو الـ proxy نفسه (أو class وارثة منه)، وعدّيناه لـ [[Reflect.construct]] عشان الوراثة تفضل شغالة. لازم الـ trap يرجّع object: [[construct: () => 1]] رمى [['construct' on proxy: trap returned non-object ('1')]]. والـ target لازم يبقى constructor: Proxy على arrow و [[new]] رمى [[is not a constructor]].

---

## ٨. [[Proxy.revocable]]: صلاحية تتسحب

~~~js
const { proxy, revoke } = Proxy.revocable({ plan: 'pro' }, {});
console.log(proxy.plan);
revoke();
try { proxy.plan; } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
pro
Cannot perform 'get' on a proxy that has been revoked
~~~

بعد [[revoke()]] كل العمليات بترمي باسم العملية: [[Cannot perform 'ownKeys' ...]] لـ [[Object.keys]]، و [['has']] لـ [[in]]، و [['IsArray']] لـ [[Array.isArray]] (اتجرّبوا). و [[revoke()]] مرة تانية مبترميش، و [[typeof]] الـ proxy المسحوب لسه بيرجّع نوعه ([[function]] لو كان دالة). الاستخدام: تدّي plugin أو كود تاني الـ [[proxy]] وتحتفظ بـ [[revoke]] عندك، ولما الجلسة تخلص أو الـ plugin يتشال تسحب الصلاحية. وبعد الـ revoke الـ target بيبقى ممكن يتمسح من الذاكرة لو مفيش حد تاني ماسكه.

---

## ٩. التمن: رقم

~~~text الناتج (١٠ مليون قراية، Node 24.22)
plain          5.0 ms 10000000
empty        143.2 ms 10000000
get trap     319.4 ms 10000000
plain         42.0 ms 10000000
empty        126.9 ms 10000000
get trap     306.1 ms 10000000
~~~

Proxy فاضي (من غير traps) أبطأ من object عادي حوالي ٢٥ مرة، و بـ [[get]] trap حوالي ٦٠ مرة. والـ [[plain]] في الجولة التانية بقى 42 مش 5: نفس دالة القياس شافت ٣ أنواع objects فالمحرك بطّل يحسّنها لنوع واحد. يعني الـ Proxy كمان بيبطّأ الكود اللي **حواليه**. بس ٣٠ نانوثانية للقراية مش هتفرق في واجهة أو إعدادات، هتفرق في loop على ملايين.

---

## الخلاصة

- ١٣ trap = ١٣ دالة في [[Reflect]]، ودايمًا كمّل بـ [[Reflect]] بنفس الـ arguments.
- [[ownKeys]] لوحده مبيخبّيش: [[get]] و [[has]] و [[getOwnPropertyDescriptor]] لازم يتفقوا.
- اقفل [[defineProperty]] في أي Proxy بيعمل validation.
- الـ invariants: اللي مقفول نهائيًا في الـ target (non-configurable، أو non-extensible) لازم يبان زي ما هو.
- [[apply]] و [[construct]] للدوال والـ classes، و [[Proxy.revocable]] لصلاحية تتسحب.`,
          lines: [
            R`لستة هنسجّل فيها كل trap اتنادى، عشان نشوف أنهي عملية بتنادي أنهي trap.`,
            R`دالة بتقول المفتاح «داخلي» لو نص بيبدأ بـ [[_]]. الـ [[typeof k === 'string']] عشان الـ Symbols مالهاش [[startsWith]].`,
            R`Proxy على object فيه مفتاح عادي ومفتاح داخلي، والـ handler فيه ٦ traps من اللي مكانوش في الدرس اللي فات.`,
            R`[[ownKeys]]: بيرجّع كل المفاتيح الـ own من غير الداخلية. ده اللي [[Object.keys]] و JSON والـ spread بيسألوه.`,
            R`[[getOwnPropertyDescriptor]]: بيرجّع الـ descriptor الحقيقي. [[Object.keys]] بيسأله عن كل مفتاح عشان يعرف هو enumerable.`,
            R`[[defineProperty]]: بيرفض تعريف أي مفتاح داخلي برجوع [[false]]، والباقي بيتعرّف عادي في الأصل.`,
            R`[[preventExtensions]]: بيسجّل وبيقفل الأصل فعلًا بـ [[Reflect]]. لازم القفل يحصل بجد عشان الـ invariant.`,
            R`[[isExtensible]]: بيسجّل ويرجّع الحقيقة. أي كدبة هنا بترمي [[TypeError]].`,
            R`[[setPrototypeOf]]: بيرفض أي تغيير للـ prototype برجوع [[false]].`,
            R`قفلة الـ handler والـ Proxy.`,
            R`[[Object.keys]] و JSON شافوا [[id]] بس: [[[ 'id' ]]] و [[{"id":1}]]. [[_token]] اتخبّت.`,
            R`تعريف [[name]] من برّه عدّى على [[defineProperty]] واتعرّف في الأصل.`,
            R`تعريف [[_x]]: الـ trap رجّع [[false]]، و [[Object.defineProperty]] رمى [['defineProperty' on proxy: trap returned falsish for property '_x']].`,
            R`تغيير الـ prototype: الـ trap رجّع [[false]] فرمى [['setPrototypeOf' on proxy: trap returned falsish for property 'undefined']].`,
            R`القفل: عدّى على [[preventExtensions]] اللي قفل الأصل. بعد السطر ده [[Object.keys(store)]] هترمي لأن [[ownKeys]] بيخبّي مفتاح من target مقفول.`,
            R`[[false]] من [[isExtensible]]، واللوج فيه الـ ٩ نداءات بالترتيب.`,
            R`عدّاد بيبدأ من صفر، والـ [[apply]] trap هيزوّده مع كل نداء للدالة.`,
            R`Proxy على arrow function: الـ target لازم يبقى دالة عشان [[apply]] يشتغل.`,
            R`[[apply]]: بيعدّ النداء ويكمّل بـ [[Reflect.apply]] بنفس الدالة و [[this]] والـ arguments.`,
            R`قفلة الـ handler.`,
            R`class عادية بـ constructor بياخد الاسم.`,
            R`Proxy على الـ class نفسها، عشان نعترض [[new]].`,
            R`[[construct]]: لو أول argument فاضي يرمي، وإلا يكمّل بـ [[Reflect.construct]] ومعاه [[newTarget]] عشان الوراثة.`,
            R`قفلة الـ handler.`,
            R`[[30 4 2 true]]: النداءين اشتغلوا والعدّاد 2، و [[new Tracked('Mona')]] طلع [[User]] حقيقي.`,
            R`[[new Tracked()]] من غير اسم: الـ trap رمى «الاسم مطلوب».`,
            R`[[Proxy.revocable]] بيرجّع object فيه الـ [[proxy]] ودالة [[revoke]]، وبنفكّهم بالـ destructuring.`,
            R`قبل السحب: القراية عادية [[pro]].`,
            R`السحب: من هنا أي عملية على [[proxy]] بترمي.`,
            R`القراية بعد السحب: [[Cannot perform 'get' on a proxy that has been revoked]].`,
          ],
          ref: [
            { t: "MDN: Proxy", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" },
            { t: "MDN: handler.ownKeys()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys" },
            { t: "MDN: handler.getOwnPropertyDescriptor()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor" },
            { t: "MDN: handler.defineProperty()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty" },
            { t: "MDN: handler.setPrototypeOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/setPrototypeOf" },
            { t: "MDN: handler.isExtensible()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible" },
            { t: "MDN: handler.preventExtensions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions" },
            { t: "MDN: handler.apply()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply" },
            { t: "MDN: handler.construct()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct" },
            { t: "MDN: Proxy.revocable()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable" },
            { t: "ECMAScript: Proxy Object Internal Methods", url: "https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots" }
          ],
          pre: [{ to: "js/Proxy و Reflect", why: R`الـ traps الأربعة [[get]] و [[set]] و [[has]] و [[deleteProperty]]، والـ receiver، و [[trap returned falsish]]` }, "js/Reflect: الـ ١٣ دالة", "js/enumerability و ownership", "js/Object.preventExtensions و seal و freeze"]
        },
      ]
    }
]);
