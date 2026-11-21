// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`تفاصيل المحترف: الـ literals والـ class fields والأخطاء والذاكرة`,
      l: 3,
      n: "الـ literals اللي بتكتبها كل يوم بأساميها و trailing commas، و hashbang و import attributes في CLI بيقرا JSON، والـ class fields والـ static blocks وترتيب التهيئة، والـ Error من جوه (toString و cause و AggregateError و EvalError و captureStackTrace)، و encodeURI ضد encodeURIComponent و URIError، و JSON.rawJSON للأرقام الكبيرة، و WeakRef و FinalizationRegistry و resource management، وخريطة JavaScript: ECMAScript و Web APIs و Node",
      pre: [
        { to: "js/try و catch و finally", why: R`[[try]] و [[finally]]: أساس الـ resource management والأخطاء هنا` },
        { to: "js/custom errors و cause", why: R`[[class AppError extends Error]] وأول تعارف بـ [[cause]] و [[AggregateError]]` },
        { to: "js/الأخطاء العامة: unhandledrejection و uncaughtException", why: R`الأخطاء اللي محدش مسكها، والـ exit codes` },
        { to: "js/class", why: R`الـ fields والـ private fields والـ static في أبسط صورهم` },
        { to: "js/extends و super", why: R`[[super()]] وترتيب الـ constructor في الـ subclass` },
        { to: "js/import و export", why: R`الـ modules: import attributes جزء من جملة [[import]]` },
        { to: "js/dynamic import()", why: R`[[import()]] بيستقبل attributes كمان` },
        { to: "js/memory leaks", why: R`[[WeakMap]] و [[WeakRef]] و [[FinalizationRegistry]] في أبسط صورهم` },
      ],
      goal: [
        R`تسمّي كل literal بتكتبه ([[true]] و [[null]] و [[/re/]] و trailing commas)، وتعرف إن [[undefined]] مش literal، وفين الفاصلة الأخيرة مسموحة وفين بترمي.`,
        R`تكتب CLI بـ hashbang يتشغّل بـ [[./tool.mjs]]، ويقرا JSON بـ [[import ... with { type: "json" }]].`,
        R`تكتب classes بـ public fields و static fields و [[static { }]]، وتعرف ترتيب التهيئة بالظبط، وإمتى الـ arrow field أحسن من method وبكام.`,
        R`تبني عيلة أخطاء بـ [[name]] و [[cause]] و [[AggregateError]]، وتطبعها كاملة، وتعرف [[EvalError]] و [[Error.captureStackTrace]] بييجوا منين.`,
        R`تبني لينكات آمنة بـ [[encodeURIComponent]] وتفك من غير ما [[URIError]] يوقّع السيرفر، وتنقل أرقام أكبر من [[Number.MAX_SAFE_INTEGER]] في JSON من غير ما تضيع.`,
        R`تستخدم [[WeakRef]] و [[FinalizationRegistry]] صح ومن غير ما تعتمد عليهم، وتقفل resources بـ [[try/finally]] (و [[using]] لما يبقى Baseline)، وتعرف كل feature جاية منين: اللغة ولا المتصفح ولا Node.`,
      ],
      use: {
        prog: R`أدوات الـ CLI في npm ([[eslint]] و [[prettier]] و [[vite]]) كلها ملفات أولها hashbang ومتسجلة في [[bin]] بتاع [[package.json]]. والـ frameworks (React و Lit و Angular) بتستخدم class fields و arrow fields للـ handlers. وأي SDK محترم (Stripe و AWS) بيرمي أخطاء ليها [[name]] و [[cause]]. وأي API فيه IDs من Twitter/X أو قواعد بيانات بـ BIGINT بيحتاج يتعامل مع أرقام أكبر من [[Number]].`,
        work: R`CLI داخلي للفريق بيقرا config، ورسايل أخطاء بتقول السبب الأصلي بدل «Something went wrong»، ولينكات بحث فيها عربي و [[&]] ومبتبوظش، و IDs طويلة راجعة من الباك إند زي ما هي، و cache تقيل بيفضى لوحده لما الذاكرة تحتاج.`,
        cs: R`الـ lexical grammar (إيه اللي الـ parser بيشوفه كـ token)، وترتيب التهيئة في الـ OOP، وسلسلة الأسباب (exception chaining) في أي لغة، و percent-encoding في مواصفة الـ URL، ودقة الـ IEEE 754 double، والـ garbage collection والمراجع الضعيفة، و RAII (تقفل الـ resource لما الـ scope يخلص)، والفرق بين اللغة والـ runtime.`,
      },
      projects: [
        { lvl: 'صغير', t: R`مصلّح الـ trailing commas في JSON`, what: R`[[json-commas.mjs]] بيقرا ملف JSON اتكتب بإيد واحد متعوّد على JS. لو [[JSON.parse]] نجح يقول «سليم». لو فشل، بيجرّب يشيل الـ trailing commas (فاصلة قبل [[]]] أو [[}]]) **من غير ما يلمس النصوص** اللي جواها فاصلة وقوس، ولو ده صلّحه يقول كده، ومع [[--fix]] يحفظ. ولو الغلط حاجة تانية يقول «فيه غلط تاني». من دروس «boolean literals و null literal و trailing commas» و «regex كامل».`, done: R`ملف فيه [["items": ["tea", "rice",],]] وفاصلة قبل [[}]] الأخيرة وقيمة نص [["a,]"]]: من غير [[--fix]] بيطبع رسالة [[JSON.parse]] واقتراح، ومع [[--fix]] الملف بيبقى JSON سليم والنص [["a,]"]] زي ما هو. وملف فيه [[b: 2]] (key من غير تنصيص) بيقول «فيه غلط تاني» والـ exit code 1.`, sol: R`**هتشوف إيه:**

~~~text الناتج (Node 24.22)
Unexpected token ']', ..."", "rice",],
  "note"... is not valid JSON
المشكلة trailing commas بس: شغّل بـ --fix
exit=1
اتشالت الـ trailing commas واتحفظ
{
  "name": "menu, ver 2",
  "items": ["tea", "rice"],
  "note": "a,]"
}
JSON سليم
Expected double-quoted property name in JSON at position 10 (line 1 column 11)
فيه غلط تاني غير الـ commas
exit=1
~~~

بالترتيب: [[menu.json]] من غير [[--fix]]، وبعدين بـ [[--fix]] ومحتواه بعدها، وبعدين تشغيله تاني، وآخر حاجة [[other.json]].

~~~text menu.json قبل
{
  "name": "menu, ver 2",
  "items": ["tea", "rice",],
  "note": "a,]",
}
~~~

~~~js json-commas.mjs
// json-commas.mjs: ملف JSON اتكتب بإيد واحد متعوّد على JS: يقولك فين الـ trailing comma ويصلّحها
import { readFileSync, writeFileSync } from "node:fs";

// نص JSON كامل (بالـ escapes جواه) أو فاصلة قبل ] أو }
const STRING_OR_COMMA = /("(?:[^"\\]|\\.)*")|,(?<close>\s*[\]}])/g;

export function stripTrailingCommas(text) {
  return text.replace(STRING_OR_COMMA, (all, str, close) => str ?? close);
}

export function check(text) {
  try {
    JSON.parse(text);
    return { ok: true };
  } catch (e) {
    const fixed = stripTrailingCommas(text);
    try {
      JSON.parse(fixed);
      return { ok: false, fixable: true, error: e.message, fixed };
    } catch {
      return { ok: false, fixable: false, error: e.message };
    }
  }
}

if (import.meta.main) {
  const [, , file, flag] = process.argv;
  if (!file) { console.error("الاستخدام: node json-commas.mjs <file.json> [--fix]"); process.exit(2); }
  const r = check(readFileSync(file, "utf8"));
  if (r.ok) console.log("JSON سليم");
  else if (r.fixable && flag === "--fix") { writeFileSync(file, r.fixed); console.log("اتشالت الـ trailing commas واتحفظ"); }
  else console.log(r.error + (r.fixable ? "\nالمشكلة trailing commas بس: شغّل بـ --fix" : "\nفيه غلط تاني غير الـ commas"));
  process.exitCode = r.ok || (r.fixable && flag === "--fix") ? 0 : 1;
}
~~~

**كل حتة بتعمل إيه:**

- [[STRING_OR_COMMA]] بديلين: يا **نص JSON كامل** [["(?:[^"\\]|\\.)*"]] (أي حرف غير [["]] و [[\]]، أو [[\]] وبعدها أي حرف عشان [[\"]] جوه النص)، يا فاصلة وبعدها مسافات و [[]]] أو [[}]].
- الـ callback: لو اللي اتطابق نص ([[str]] مش [[undefined]]) يرجّعه زي ما هو، ولو فاصلة يرجّع القوس من غيرها ([[close]]). الحيلة دي (نطابق النصوص عشان «نعدّي» عليها) هي اللي بتمنع اللمس جوه النصوص.
- [[check]]: بنجرّب [[JSON.parse]] على الأصلي، ولو فشل على النسخة المصلّحة. فالأداة مبتقولش «اتصلّح» غير لما تتأكد إن [[JSON.parse]] قبل النتيجة.
- الـ exit code: 0 لو سليم أو اتصلّح، و 1 لو لسه بايظ، و 2 لو الاستخدام غلط.

**غلطة حصلت:** أول نسخة كانت [[/,(\s*[\]}])/g]] بس. جرّبناها على [[{"note": "a,]", "x": [1,]}]]:

~~~text الناتج
{"note": "a]", "x": [1]}
~~~

شالت الفاصلة **من جوه النص** كمان: القيمة اتغيّرت من غير ما حد ياخد باله. الحل البديل اللي بيطابق النصوص الأول. وللملفات المعقدة (تعليقات، single quotes) استخدم parser زي JSON5 بدل regex.` },
        { lvl: 'صغير', t: R`لينكات بحث ومنتجات آمنة`, what: R`[[safe-link.mjs]] فيه ٣ دوال: [[searchLink(base, words, page)]] بتبني لينك بحث فيه كلام اليوزر (عربي و [[&]] و [[/]] و [[?]])، و [[productPath(category, name)]] بتبني path من حتتين، و [[readPath(path)]] بتفك path جاي من برّه حتة حتة وبترجّع [[null]] للحتة البايظة بدل ما ترمي. من درس «encodeURI و encodeURIComponent و URIError».`, done: R`[[new URL(link).searchParams.get("q")]] بيرجّع [["شاي & قهوة/لبن?"]] بالظبط، و [[readPath(productPath("مشروبات", "شاي 100% أخضر"))]] بترجّع الاسمين زي ما هم، و [[readPath("/مشروبات/شاي 100% أخضر")]] (من غير encoding) بترجّع [[[ 'مشروبات', null ]]] من غير ما ترمي.`, sol: R`**هتشوف إيه:**

~~~text الناتج (Node 24.22)
https://shop.example/search?q=%D8%B4%D8%A7%D9%8A%20%26%20%D9%82%D9%87%D9%88%D8%A9%2F%D9%84%D8%A8%D9%86%3F&page=1
شاي & قهوة/لبن?
/%D9%85%D8%B4%D8%B1%D9%88%D8%A8%D8%A7%D8%AA/%D8%B4%D8%A7%D9%8A%20100%25%20%D8%A3%D8%AE%D8%B6%D8%B1
[ 'مشروبات', 'شاي 100% أخضر' ]
[ 'مشروبات', null ]
~~~

~~~js safe-link.mjs
// safe-link.mjs: يبني لينك بحث من كلام اليوزر، ويفك path جاي من برّه من غير ما يقع
export function searchLink(base, words, page = 1) {
  return $__bt$__{base}/search?q=$__{encodeURIComponent(words)}&page=$__{encodeURIComponent(page)}$__bt;
}

export function productPath(category, name) {
  return "/" + [category, name].map(encodeURIComponent).join("/");
}

export function readPath(path) {
  return path.split("/").filter(Boolean).map((part) => {
    try {
      return decodeURIComponent(part);
    } catch (e) {
      if (e instanceof URIError) return null;
      throw e;
    }
  });
}

if (import.meta.main) {
  const link = searchLink("https://shop.example", "شاي & قهوة/لبن?");
  console.log(link);
  console.log(new URL(link).searchParams.get("q"));
  const path = productPath("مشروبات", "شاي 100% أخضر");
  console.log(path);
  console.log(readPath(path));
  console.log(readPath("/مشروبات/شاي 100% أخضر"));
}
~~~

**كل حتة بتعمل إيه:**

- [[searchLink]]: كل **قيمة** بتعدّي على [[encodeURIComponent]]، فالـ [[&]] بقت [[%26]] والـ [[/]] بقت [[%2F]] والـ [[?]] بقت [[%3F]]، ومحدش فيهم بيتقري كجزء من شكل الـ URL. حتى [[page]] (رقم) بتعدّي عليها: لو بعدين بقت جاية من يوزر متبقاش ثغرة.
- [[productPath]]: [[map(encodeURIComponent)]] على كل حتة **لوحدها** وبعدين [[join("/")]]. لو عملت encode للـ path كله بـ [[encodeURIComponent]] الـ [[/]] اللي بين الحتت كانت هتبقى [[%2F]].
- [[readPath]]: [[decodeURIComponent]] جوه try لكل حتة. [[URIError]] (زي [[%]] من غير رقمين hex بعدها في [[100% أخضر]]) بترجّع [[null]] للحتة دي بس، وأي error تاني بيترمي تاني (متبلعش أخطاء مش بتاعتك).

**الغلطة اللي بيمنعها:** في سيرفر حقيقي، path زي [[/شاي 100% أخضر]] جاي من بوت أو لينك متقصوص، و [[decodeURIComponent]] من غير try بيرمي [[URIError: URI malformed]]، ولو مفيش catch الطلب بيقع بـ 500 (أو السيرفر كله في Node قديم).` },
        { lvl: 'متوسط', t: R`أسعار بعملات مختلفة بـ class fields`, what: R`[[class Price]] فيها [[static base]] و [[static #rates]] (Map خاصة)، و [[static { }]] بيقرا أسعار الصرف **مرة واحدة** من متغير البيئة [[RATES]] ([["USD=48.5,EUR=52.1"]]) أو قيمة افتراضية، وبيتجاهل الأزواج البايظة ويسجلها في [[Price.warnings]]. وكل سعر ليه public fields [[amount]] و [[currency]] و [[createdAt]]، و arrow fields [[inBase]] و [[format]] تشتغل حتى لو اتبعتت لوحدها callback. والعملة المش معروفة بترمي [[RangeError]]. من درس «public class fields و static initialization blocks».`, done: R`من غير [[RATES]]: [[Price.currencies]] بـ [[[ 'EGP', 'USD', 'EUR' ]]]، و ٣ دولار و ١٢٠ جنيه و ٢ يورو بالجنيه [[[ 145.5, 120, 104.2 ]]] والإجمالي [[369.7]] بـ [[map((p) => p.inBase)]] (الدالة لوحدها)، و [[new Price(1, "XYZ")]] بترمي. ومع [[RATES="USD=50, eur=55,SAR=abc,GBP=63"]]: العملات [[EGP و USD و GBP]] واتنين في [[warnings]].`, sol: R`**هتشوف إيه:**

~~~text الناتج (Node 24.22): node price.mjs
[ 'EGP', 'USD', 'EUR' ] []
[ 145.5, 120, 104.2 ]
[ '$3.00', 'EGP 120.00', '€2.00' ]
الإجمالي بالجنيه: 369.7
RangeError: عملة مش معروفة: XYZ
~~~

~~~text الناتج: RATES="USD=50, eur=55,SAR=abc,GBP=63" (Git Bash)
[ 'EGP', 'USD', 'GBP' ] [ 'اتجاهلت « eur=55»', 'اتجاهلت «SAR=abc»' ]
~~~

(التشغيل التاني بـ [[node -e "import('./price.mjs').then(({ Price }) => console.log(Price.currencies, Price.warnings))"]] عشان نشوف الـ static بس.)

~~~js price.mjs
// price.mjs: أسعار بعملات مختلفة: static block بيقرا الأسعار مرة واحدة، و fields لكل سعر
export class Price {
  static base = "EGP";
  static #rates = new Map([["EGP", 1]]);
  static warnings = [];

  static {
    const raw = globalThis.process?.env.RATES ?? "USD=48.5,EUR=52.1";
    for (const pair of raw.split(",")) {
      const [code, value] = pair.split("=").map((s) => s?.trim());
      const rate = Number(value);
      if (!/^[A-Z]{3}$/.test(code ?? "") || !(rate > 0)) {
        this.warnings.push($__btاتجاهلت «$__{pair}»$__bt);
        continue;
      }
      this.#rates.set(code, rate);
    }
  }

  static get currencies() { return [...Price.#rates.keys()]; }

  amount;
  currency;
  createdAt = new Date().toISOString().slice(0, 10);
  inBase = () => this.amount * Price.#rates.get(this.currency);
  format = (locale = "ar-EG") =>
    new Intl.NumberFormat(locale, { style: "currency", currency: this.currency }).format(this.amount);

  constructor(amount, currency = Price.base) {
    if (!Price.#rates.has(currency)) throw new RangeError($__btعملة مش معروفة: $__{currency}$__bt);
    this.amount = amount;
    this.currency = currency;
  }
}

if (import.meta.main) {
  console.log(Price.currencies, Price.warnings);
  const items = [new Price(3, "USD"), new Price(120), new Price(2, "EUR")];
  console.log(items.map((p) => p.inBase()));
  console.log(items.map((p) => p.format("en-US")));
  const total = items.map((p) => p.inBase).reduce((sum, f) => sum + f(), 0);
  console.log("الإجمالي بالجنيه:", total);
  try { new Price(1, "XYZ"); } catch (e) { console.log(e.name + ": " + e.message); }
}
~~~

**كل حتة بتعمل إيه:**

- [[static #rates]]: field خاص على الكلاس نفسه (Map بتبدأ بـ [[EGP]] قيمته 1)، محدش برّه يقدر يغيّر الأسعار.
- [[static { }]]: بيتنفّذ **مرة واحدة** وقت تعريف الكلاس (يعني وقت ما الملف يتحمّل)، و [[this]] جواه هو الكلاس [[Price]]. وجواه [[try]] أو [[continue]] أو متغيرات محلية ([[raw]] و [[pair]]) عادي، ومش بيبقوا خصايص على الكلاس. وفيه وصول للـ [[#rates]] الخاصة.
- [[globalThis.process?.env.RATES]]: لو الملف اتحمّل في متصفح مفيش [[process]]، فبنستخدم [[?.]] والقيمة الافتراضية.
- [[!/^[A-Z]{3}$/.test(code ?? "")]] و [[!(rate > 0)]]: [[(rate > 0)]] بتبقى [[false]] لـ [[NaN]] والسالب والصفر مع بعض. و [[eur]] (صغير) و [[SAR=abc]] اتجاهلوا واتسجلوا.
- [[amount;]] و [[currency;]] من غير قيمة: field موجود من الأول بقيمة [[undefined]]، والـ constructor بيحط القيمة. ده بيوضّح شكل الـ object لأي حد بيقرا الكلاس.
- [[inBase = () => ...]]: arrow field، [[this]] متثبت على الـ instance، فـ [[items.map((p) => p.inBase)]] بيرجّع دوال لوحدها والـ [[reduce]] بينادي كل واحدة [[f()]] من غير [[this]] وبتشتغل.
- [[createdAt = new Date()...]]: كل instance بياخد قيمته وقت ما يتعمل.

**غلطة حصلت:** أول تشغيل بـ [[RATES]] ناقصها [[EUR]] وقع، لأن الجزء التجريبي في آخر الملف بيعمل [[new Price(2, "EUR")]]:

~~~text الناتج
RangeError: عملة مش معروفة: EUR
    at new Price (file:///…/price.mjs:30:44)
~~~

ده الصح (العملة مش موجودة فعلًا)، بس عرّفنا إن الكود اللي بيستخدم الكلاس لازم يتعامل مع الـ [[RangeError]] أو يسأل [[Price.currencies]] الأول.` },
        { lvl: 'متوسط', t: R`IDs كبيرة رايح جاي من API`, what: R`[[big-ids.mjs]] بيقرا JSON راجع من API فيه [[orderId]] و [[customerId]] و [[items[].id]] أكبر من [[Number.MAX_SAFE_INTEGER]]: [[parseBig(text)]] بتحوّلهم [[BigInt]] من النص الأصلي (reviver بـ [[context.source]])، و [[stringifyBig(value)]] بترجّعهم أرقام في الـ JSON بـ [[JSON.rawJSON]]. والاتنين بيرموا رسالة واضحة لو الـ runtime مفيهوش الـ features دي. من درس «JSON.rawJSON و JSON.isRawJSON: أرقام أكبر من Number».`, done: R`[[JSON.parse]] العادي بيطلّع [[9007199254740992]] و [[9223372036854776000]] (غلط)، و [[parseBig]] بيطلّع [[9007199254740993n]] و [[9223372036854775807n]]، وبعد ما تزوّد الـ qty وتزوّد [[orderId]] واحد، [[stringifyBig]] بيطلّع نفس النص الأصلي بالتعديلين بس، والمقارنة [[true]].`, sol: R`**هتشوف إيه:**

~~~text الناتج (Node 24.22)
JSON.parse عادي: 9007199254740992 9223372036854776000
parseBig: 9007199254740993n 9223372036854775807n
{"orderId":9007199254740994,"customerId":12345678901234567890,"items":[{"id":9223372036854775807,"qty":3}],"total":250.5}
اترجع زي ما هو؟ true
~~~

~~~js big-ids.mjs
// big-ids.mjs: JSON من API فيه ids أكبر من Number.MAX_SAFE_INTEGER: نقراهم BigInt ونرجّعهم بنفس الأرقام
const BIG_KEYS = new Set(["id", "orderId", "customerId"]);

export function parseBig(text) {
  return JSON.parse(text, (key, value, ctx) => {
    if (BIG_KEYS.has(key) && typeof value === "number") {
      if (!ctx?.source) throw new Error("الـ runtime ده مفيهوش context.source في الـ reviver");
      return BigInt(ctx.source);
    }
    return value;
  });
}

export function stringifyBig(value, space) {
  if (typeof JSON.rawJSON !== "function") {
    throw new Error("JSON.rawJSON مش موجودة هنا: ابعت الـ ids كنصوص");
  }
  return JSON.stringify(value, (key, v) => (typeof v === "bigint" ? JSON.rawJSON(v.toString()) : v), space);
}

if (import.meta.main) {
  const fromApi = '{"orderId":9007199254740993,"customerId":12345678901234567890,"items":[{"id":9223372036854775807,"qty":2}],"total":250.5}';
  console.log("JSON.parse عادي:", JSON.parse(fromApi).orderId, JSON.parse(fromApi).items[0].id);
  const order = parseBig(fromApi);
  console.log("parseBig:", order.orderId, order.items[0].id);
  order.items[0].qty += 1;
  order.orderId += 1n;
  const back = stringifyBig(order);
  console.log(back);
  console.log("اترجع زي ما هو؟", back === fromApi.replace('"qty":2', '"qty":3').replace("740993", "740994"));
}
~~~

**كل حتة بتعمل إيه:**

- [[BIG_KEYS]]: إحنا اللي بنقول أنهي keys IDs. مش كل رقم: [[qty]] و [[total]] أرقام عادية ولازم يفضلوا [[Number]] عشان الحساب.
- الـ reviver بياخد [[ctx]] تالت (موجود في Node 24 و Chrome)، و [[ctx.source]] هو **النص الأصلي** للرقم في الـ JSON ([["9007199254740993"]])، قبل ما يتحوّل [[Number]] ويضيع. [[BigInt(ctx.source)]] بيحوّله صح.
- [[typeof value === "number"]]: لو الـ API بعت الـ id كنص أصلًا نسيبه نص.
- الـ replacer: أي [[bigint]] بيبقى [[JSON.rawJSON(v.toString())]]: «حط الأرقام دي في الـ JSON زي ما هي». من غيرها [[JSON.stringify]] بيرمي [[TypeError: Do not know how to serialize a BigInt]].
- [[order.orderId += 1n]]: الحساب على BigInt لازم بـ BigInt ([[1n]] مش [[1]]).

**غلطة لازم تعرفها:** المفاتيح اللي **مش** في [[BIG_KEYS]] بتتحوّل [[Number]] عادي، فلو الـ API فيه رقم كبير تاني (زي [[paymentRef]]) هيضيع في صمت. لو مش متأكد، اعرف الـ keys من وثائق الـ API، أو حوّل أي رقم [[ctx.source]] بتاعه طويل ([[!Number.isSafeInteger(value)]]).` },
        { lvl: 'كبير', t: R`shop-links: CLI بيقرا config ويبني لينكات`, what: R`أداة سطر أوامر [[shop-links]]: ملف أوله hashbang ومتسجل في [[bin]] بتاع [[package.json]]، بيقرا config (الافتراضي [[config.json]] جنب الأداة، أو مسار تديهوله) بـ [[import()]] و [[with: { type: "json" }]]، ويتحقق منه ويجمع **كل** المشاكل مرة واحدة في [[AggregateError]] جوه [[ConfigError]] بـ [[cause]]، ويطبع لينك كل منتج (الاسم في الـ path بـ [[encodeURIComponent]] والباقي في [[searchParams]]). الأخطاء عيلة بـ class fields: [[AppError]] و [[ConfigError]] و [[LinkError]]، وكل نوع ليه exit code، و [[explain(err)]] بتطبع سلسلة الأسباب كلها متفتحة. و [[--version]] بيقرا [[package.json]] بـ import attributes. ومعاها ٥ اختبارات بـ [[node --test]] منهم اختبار بيشغّل الـ CLI نفسه. من الوحدة كلها.`, done: R`[[./bin/shop-links.mjs]] من Git Bash بيطبع لينكين صح (الـ [[&]] و [[%]] متعمل لهم encode). config فيه ٣ مشاكل بيطبع الـ ٣ تحت بعض ومنهم السبب الأصلي [[TypeError: Invalid URL]]، والـ exit code 2. ملف مش موجود أو JSON بايظ: [[ConfigError]] وتحتها السبب الأصلي ([[ERR_MODULE_NOT_FOUND]] أو [[SyntaxError]]) والـ exit code 2. و [[--version]] بيطبع [[shop-links 1.0.0]]. و [[npm test]] بيقول [[pass 5]].`, ext: R`زوّد [[--check]] بيعمل [[fetch]] بـ [[HEAD]] لكل لينك ويجمع اللي فشل في [[AggregateError]] (مع [[AbortSignal.timeout]])، و [[--json]] بيطبع النتيجة JSON والـ IDs فيها BigInt بـ [[JSON.rawJSON]]، وجرّب [[npm link]] عشان الأمر يبقى [[shop-links]] من أي فولدر (ده بيسطّب على جهازك، فاعمله في بيئة تجربة).`, sol: R`**هتشوف إيه:** لينك لكل منتج، أو شرح كامل لكل غلط وسببه:

~~~text الناتج (Node 24.22، Git Bash): ./bin/shop-links.mjs
https://shop.example/p/%D8%B4%D8%A7%D9%8A%20%26%20%D9%86%D8%B9%D9%86%D8%A7%D8%B9?id=9007199254740993&tag=%D9%85%D8%B4%D8%B1%D9%88%D8%A8%D8%A7%D8%AA&tag=%D8%B3%D8%AE%D9%86
https://shop.example/p/%D8%A8%D9%86%20100%25%20%D8%A8%D8%B1%D8%A7%D8%B2%D9%8A%D9%84%D9%8A?id=17
exit=0
~~~

~~~text الناتج: ./bin/shop-links.mjs bad.json
ConfigError: الكونفج فيه 3 مشكلة
  بسبب:
    AggregateError: مشاكل الكونفج
      TypeError: baseUrl مش URL: «shop.example»
        بسبب:
          TypeError: Invalid URL
      TypeError: products[0]: الاسم ناقص
      TypeError: products[1]: الـ id لازم أرقام مكتوبة كنص
exit=2
~~~

~~~text الناتج: ملف مش موجود، و JSON فيه trailing comma، و --version (المسارات متقصرة بـ …)
ConfigError: مش قادر أقرا …\shop-links\nope.json
  بسبب:
    Error [ERR_MODULE_NOT_FOUND]: Cannot find module '…\shop-links\nope.json' imported from …\shop-links\src\config.mjs
exit=2
ConfigError: مش قادر أقرا …\shop-links\broken.json
  بسبب:
    SyntaxError: …\shop-links\broken.json: Unexpected token ']', ..."ucts": [1,], }" is not valid JSON
exit=2
shop-links 1.0.0
~~~

**الملفات:**

~~~text شجرة الملفات
shop-links/
  package.json            الاسم والنسخة و "type": "module" و bin و script الاختبار
  config.json             الكونفج الافتراضي
  bin/shop-links.mjs      الـ CLI: أوله hashbang
  src/errors.mjs          AppError و ConfigError و LinkError و explain
  src/config.mjs          loadConfig (import attributes) و validate (AggregateError)
  src/links.mjs           productUrl و nameFromUrl
  test/shop-links.test.mjs ٥ اختبارات
~~~

~~~json package.json
{
  "name": "shop-links",
  "version": "1.0.0",
  "type": "module",
  "bin": { "shop-links": "./bin/shop-links.mjs" },
  "scripts": { "test": "node --test" }
}
~~~

~~~json config.json
{
  "baseUrl": "https://shop.example",
  "products": [
    { "id": "9007199254740993", "name": "شاي & نعناع", "tags": ["مشروبات", "سخن"] },
    { "id": "17", "name": "بن 100% برازيلي" }
  ]
}
~~~

~~~js bin/shop-links.mjs
#!/usr/bin/env node
// shop-links: يطبع لينك كل منتج في الكونفج، أو يشرح كل غلط فيه
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import pkg from "../package.json" with { type: "json" };
import { loadConfig, validate } from "../src/config.mjs";
import { productUrl } from "../src/links.mjs";
import { AppError, explain } from "../src/errors.mjs";

const arg = process.argv[2];
if (arg === "--version") {
  console.log($__bt$__{pkg.name} $__{pkg.version}$__bt);
} else {
  try {
    const file = arg ? pathToFileURL(resolve(arg)) : new URL("../config.json", import.meta.url);
    const cfg = validate(await loadConfig(file));
    for (const p of cfg.products) console.log(productUrl(cfg.baseUrl, p));
  } catch (e) {
    if (!(e instanceof AppError)) throw e;
    console.error(explain(e).join("\n"));
    process.exitCode = e.exitCode;
  }
}
~~~

~~~js src/errors.mjs
// errors.mjs: عيلة أخطاء البرنامج، وكل نوع ليه exit code
export class AppError extends Error {
  static exitCode = 1;
  name = this.constructor.name;
  get exitCode() { return this.constructor.exitCode; }
}
export class ConfigError extends AppError { static exitCode = 2; }
export class LinkError extends AppError { static exitCode = 3; }

// يمشي على سلسلة الـ cause، ويفتح أي AggregateError لأخطائه
export function explain(err, depth = 0, seen = new Set()) {
  if (seen.has(err)) return [$__bt$__{"  ".repeat(depth)}(دايرة في الـ cause)$__bt];
  seen.add(err);
  const pad = "  ".repeat(depth);
  const lines = [pad + (err instanceof Error ? String(err) : $__btقيمة مش Error: $__{JSON.stringify(err)}$__bt)];
  if (err instanceof AggregateError) {
    for (const inner of err.errors) lines.push(...explain(inner, depth + 1, seen));
  }
  if (err instanceof Error && "cause" in err) {
    lines.push(pad + "  بسبب:", ...explain(err.cause, depth + 2, seen));
  }
  return lines;
}
~~~

~~~js src/config.mjs
// config.mjs: يقرا ملف الكونفج JSON بـ import attributes، ويجمع كل مشاكله مرة واحدة
import { fileURLToPath } from "node:url";
import { ConfigError } from "./errors.mjs";

export async function loadConfig(fileUrl) {
  try {
    const mod = await import(fileUrl, { with: { type: "json" } });
    return mod.default;
  } catch (e) {
    throw new ConfigError($__btمش قادر أقرا $__{fileURLToPath(fileUrl)}$__bt, { cause: e });
  }
}

export function validate(cfg) {
  const problems = [];
  if (typeof cfg?.baseUrl !== "string") {
    problems.push(new TypeError("baseUrl لازم يبقى نص"));
  } else {
    try {
      const u = new URL(cfg.baseUrl);
      if (u.protocol !== "https:") problems.push(new RangeError($__btbaseUrl لازم https مش $__{u.protocol}$__bt));
    } catch (e) {
      problems.push(new TypeError($__btbaseUrl مش URL: «$__{cfg.baseUrl}»$__bt, { cause: e }));
    }
  }
  if (!Array.isArray(cfg?.products) || cfg.products.length === 0) {
    problems.push(new TypeError("products لازم array فيها منتج واحد على الأقل"));
  } else {
    cfg.products.forEach((p, i) => {
      if (typeof p?.name !== "string" || p.name.trim() === "") problems.push(new TypeError($__btproducts[$__{i}]: الاسم ناقص$__bt));
      if (!/^\d+$/.test(String(p?.id ?? ""))) problems.push(new TypeError($__btproducts[$__{i}]: الـ id لازم أرقام مكتوبة كنص$__bt));
    });
  }
  if (problems.length) {
    throw new ConfigError($__btالكونفج فيه $__{problems.length} مشكلة$__bt, {
      cause: new AggregateError(problems, "مشاكل الكونفج"),
    });
  }
  return cfg;
}
~~~

~~~js src/links.mjs
// links.mjs: لينك كل منتج: الاسم في الـ path بـ encodeURIComponent، والباقي في searchParams
import { LinkError } from "./errors.mjs";

export function productUrl(base, p) {
  const url = new URL($__bt/p/$__{encodeURIComponent(p.name)}$__bt, base);
  url.searchParams.set("id", p.id);
  for (const tag of p.tags ?? []) url.searchParams.append("tag", tag);
  return url.href;
}

export function nameFromUrl(href) {
  const last = new URL(href).pathname.split("/").pop();
  try {
    return decodeURIComponent(last);
  } catch (e) {
    throw new LinkError($__btاسم المنتج في اللينك بايظ: $__{last}$__bt, { cause: e });
  }
}
~~~

~~~js test/shop-links.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { validate } from "../src/config.mjs";
import { productUrl, nameFromUrl } from "../src/links.mjs";
import { ConfigError, LinkError, explain } from "../src/errors.mjs";

const BIN = fileURLToPath(new URL("../bin/shop-links.mjs", import.meta.url));
const run = (...args) => {
  try {
    return { code: 0, out: execFileSync(process.execPath, [BIN, ...args], { encoding: "utf8", stdio: "pipe" }) };
  } catch (e) {
    return { code: e.status, out: e.stdout, err: e.stderr };
  }
};

test("validate بيجمع كل المشاكل في AggregateError جوه cause", () => {
  const bad = { baseUrl: "http://x.example", products: [{ name: "", id: "12a" }] };
  assert.throws(() => validate(bad), (e) => {
    assert.ok(e instanceof ConfigError);
    assert.equal(e.name, "ConfigError");
    assert.equal(e.exitCode, 2);
    assert.ok(e.cause instanceof AggregateError);
    assert.equal(e.cause.errors.length, 3);
    return true;
  });
});

test("productUrl بيعمل encode للاسم والـ tags", () => {
  const href = productUrl("https://shop.example", { id: "9007199254740993", name: "شاي & نعناع/كبير", tags: ["سخن", "a&b"] });
  const u = new URL(href);
  assert.equal(u.searchParams.get("id"), "9007199254740993");
  assert.deepEqual(u.searchParams.getAll("tag"), ["سخن", "a&b"]);
  assert.equal(nameFromUrl(href), "شاي & نعناع/كبير");
});

test("nameFromUrl بيرمي LinkError وجواه الـ URIError", () => {
  assert.throws(() => nameFromUrl("https://shop.example/p/100%"), (e) => e instanceof LinkError && e.cause instanceof URIError);
});

test("explain بيفتح الـ cause والـ AggregateError", () => {
  const e = new ConfigError("x", { cause: new AggregateError([new TypeError("a"), new RangeError("b")], "agg") });
  assert.deepEqual(explain(e), ["ConfigError: x", "  بسبب:", "    AggregateError: agg", "      TypeError: a", "      RangeError: b"]);
});

test("الـ CLI: كونفج سليم، وكونفج بايظ، وملف مش موجود، و --version", () => {
  const dir = mkdtempSync(join(tmpdir(), "shop-links-"));
  const ok = join(dir, "ok.json");
  writeFileSync(ok, JSON.stringify({ baseUrl: "https://shop.example", products: [{ id: "1", name: "بن" }] }));
  assert.deepEqual(run(ok), { code: 0, out: "https://shop.example/p/%D8%A8%D9%86?id=1\n" });
  const bad = join(dir, "bad.json");
  writeFileSync(bad, '{ "baseUrl": "ftp://x", "products": [] }');
  const r = run(bad);
  assert.equal(r.code, 2);
  assert.match(r.err, /الكونفج فيه 2 مشكلة/);
  const missing = run(join(dir, "nope.json"));
  assert.equal(missing.code, 2);
  assert.match(missing.err, /ERR_MODULE_NOT_FOUND|Cannot find module/);
  assert.match(run("--version").out, /^shop-links \d+\.\d+\.\d+\n$/);
});
~~~

~~~text الناتج: npm test
✔ validate بيجمع كل المشاكل في AggregateError جوه cause (1.3615ms)
✔ productUrl بيعمل encode للاسم والـ tags (0.9162ms)
✔ nameFromUrl بيرمي LinkError وجواه الـ URIError (0.178ms)
✔ explain بيفتح الـ cause والـ AggregateError (0.2276ms)
✔ الـ CLI: كونفج سليم، وكونفج بايظ، وملف مش موجود، و --version (234.7377ms)
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

**ترتيب البناء وليه كل حتة كده:**

1. **[[package.json]]:** [["type": "module"]] عشان الـ [[.mjs]] و [[import]] (كان ممكن من غيرها لأن كل الملفات [[.mjs]]، بس كده أوضح). و [["bin"]] بيقول لـ npm إن الأمر [[shop-links]] هو الملف ده: لما حد يسطّب الباكدج أو يعمل [[npm link]]، npm بيعمل له اختصار في الـ PATH (على ويندوز ملف [[.cmd]] بينادي node، لأن ويندوز مبيقراش الـ hashbang).
2. **[[bin/shop-links.mjs]]:** أول سطر [[#!/usr/bin/env node]] ومن غيره [[./bin/shop-links.mjs]] في bash بيتقري كسكربت shell. و [[chmod +x]] مرة واحدة. والـ [[import pkg from "../package.json" with { type: "json" }]] import ثابت لأن المسار معروف، أما الـ config فـ [[import()]] لأن المسار جاي من اليوزر. و [[pathToFileURL(resolve(arg))]]: [[import()]] عايز URL أو مسار نسبي للملف اللي بيستورد، مش مسار نسبي للفولدر اللي انت فيه.
3. **[[src/errors.mjs]]:** [[name = this.constructor.name]] class field: بيتنفّذ بعد [[super()]] فبيحط اسم الكلاس الحقيقي ([[ConfigError]]) من غير ما كل subclass يكتبه. و [[static exitCode]] على كل كلاس، و getter [[exitCode]] على الـ instance بيقرا من [[this.constructor]]. و [[explain]] بتمشي على [[cause]] وتفتح [[errors]] بتاعة أي [[AggregateError]]، ومعاها [[seen]] عشان لو error سببه نفسه متلفش للأبد.
4. **[[src/config.mjs]]:** [[validate]] **مبترميش عند أول غلط**: بتجمع في [[problems]] وبترمي مرة واحدة، فاليوزر يصلّح كل حاجة في مرة. و [[new URL(cfg.baseUrl)]] جوه try، والـ [[TypeError: Invalid URL]] بيتحط [[cause]] للمشكلة.
5. **[[src/links.mjs]]:** [[new URL($__bt/p/$__{encodeURIComponent(p.name)}$__bt, base)]] و [[searchParams.set]] / [[append]] (اللي بيعملوا encode لوحدهم).
6. **الاختبارات:** [[execFileSync(process.execPath, [BIN, ...args])]] بيشغّل الـ CLI بنفس الـ node اللي شغّال الاختبار، وبيمسك الـ exit code من [[e.status]]. والملفات المؤقتة في [[mkdtempSync(join(tmpdir(), ...))]].

**غلطات حصلت وإحنا بنبنيه:**

- **الاسم في الـ path من غير [[encodeURIComponent]]:** جرّبنا [[new URL("/p/بن 100% x&y?z", "https://shop.example")]]: الـ pathname طلع [[/p/%D8%A8%D9%86%20100%%20x&y]] والـ search [[?z]]. الـ [[%]] فضلت زي ما هي (فـ [[decodeURIComponent]] عليها بترمي [[URIError: URI malformed]])، والـ [[?]] قطعت الاسم وبقى الباقي query.
- **من غير [[name]] field:** شلنا السطر وشغّلنا [[bad.json]]، أول سطر بقى [[Error: الكونفج فيه 3 مشكلة]]: [[class ConfigError extends Error {}]] لوحده مبيغيّرش الـ [[name]]، فـ [[toString]] بيطبع [[Error]].
- **رسالة المسار:** أول نسخة كانت بتطبع [[decodeURIComponent(fileUrl.pathname)]] فطلع [[/C:/Users/...]] بـ [[/]] في الأول على ويندوز. [[fileURLToPath(fileUrl)]] بيدّي المسار الصح على كل نظام.

**حاجة لازم تعرفها عن [[import()]] للـ JSON:** الـ module بيتحفظ في cache بالـ URL، فلو الأداة دي كانت سيرفر شغّال وقرا نفس الملف مرتين بعد ما اتعدّل، هيرجّع القديم (درس «hashbang و import attributes» بيورّيها بالأرقام). لـ CLI بيشتغل مرة ويخرج ده مش مشكلة.` },
        { lvl: 'فكرة', t: R`اعرف بيئتك: الـ feature دي جاية منين؟`, what: R`سكربت واحد يتشغّل في Node وفي صفحة في المتصفح من غير تعديل، وبيطبع البيئة (Node بنسخته و V8، أو المتصفح بنسخته)، وقايمة features متقسمة: ECMAScript (اللغة نفسها)، و Web APIs (معظمها في Node كمان)، والمتصفح بس، و Node بس، وقصاد كل واحدة ✓ أو ✗.`, done: R`نفس الملف بيشتغل بـ [[node where-am-i.mjs]] وفي صفحة بـ [[<script type="module">]]، وقسم ECMAScript كله ✓ في الاتنين، وقسم «المتصفح بس» و «Node بس» بيتعكسوا، وعندك تفسير لأي نتيجة غريبة.`, ext: R`شغّله في Deno أو Bun لو عندك، وزوّد features أحدث (زي [[Iterator]] و [[RegExp.escape]] و [[Temporal]]) وقارن النسخ.`, sol: R`**نسخة نموذجية:**

~~~text الناتج (Node 24.22): node where-am-i.mjs
{
  runtime: 'Node 24.22.1 (V8 13.6.233.17-node.58)',
  'ECMAScript (اللغة)': '✓ Array  ✓ Promise  ✓ Map  ✓ JSON  ✓ Intl  ✓ RegExp  ✓ WeakRef  ✓ Iterator',
  'Web APIs (المتصفح، وكتير منها في Node كمان)': '✓ fetch  ✓ URL  ✓ TextEncoder  ✓ structuredClone  ✓ setTimeout  ✓ AbortController',
  'المتصفح بس': '✗ document  ✗ window  ✗ localStorage  ✓ navigator',
  'Node بس': '✓ process  ✓ Buffer  ✓ global'
}
~~~

~~~text الناتج (Chrome 157، صفحة where.html)
{
  "runtime": "Chrome/157.0.0.0",
  "ECMAScript (اللغة)": "✓ Array  ✓ Promise  ✓ Map  ✓ JSON  ✓ Intl  ✓ RegExp  ✓ WeakRef  ✓ Iterator",
  "Web APIs (المتصفح، وكتير منها في Node كمان)": "✓ fetch  ✓ URL  ✓ TextEncoder  ✓ structuredClone  ✓ setTimeout  ✓ AbortController",
  "المتصفح بس": "✓ document  ✓ window  ✓ localStorage  ✓ navigator",
  "Node بس": "✗ process  ✗ Buffer  ✗ global"
}
~~~

~~~js where-am-i.mjs
// where-am-i.mjs: يقولك انت شغال فين، وكل feature جاية منين: اللغة نفسها ولا البيئة
const FEATURES = {
  "ECMAScript (اللغة)": ["Array", "Promise", "Map", "JSON", "Intl", "RegExp", "WeakRef", "Iterator"],
  "Web APIs (المتصفح، وكتير منها في Node كمان)": ["fetch", "URL", "TextEncoder", "structuredClone", "setTimeout", "AbortController"],
  "المتصفح بس": ["document", "window", "localStorage", "navigator"],
  "Node بس": ["process", "Buffer", "global"],
};

export function runtime() {
  if (typeof Deno !== "undefined") return $__btDeno $__{Deno.version.deno}$__bt;
  if (typeof Bun !== "undefined") return $__btBun $__{Bun.version}$__bt;
  if (globalThis.process?.versions?.node) return $__btNode $__{process.versions.node} (V8 $__{process.versions.v8})$__bt;
  if (typeof navigator !== "undefined") return navigator.userAgent.match(/(Firefox|Chrome|Safari)\/[\d.]+/)?.[0] ?? "متصفح";
  return "مش معروف";
}

export function report() {
  const out = { runtime: runtime() };
  for (const [group, names] of Object.entries(FEATURES)) {
    out[group] = names.map((n) => (n in globalThis ? "✓ " : "✗ ") + n).join("  ");
  }
  return out;
}

if (globalThis.process?.argv?.[1]?.endsWith("where-am-i.mjs")) console.log(report());
~~~

~~~html where.html
<!doctype html><meta charset="utf-8"><title>w</title><pre id="out"></pre><script type="module">import { report } from "./where-am-i.mjs"; document.getElementById("out").textContent = JSON.stringify(report(), null, 2);$__lt/script>
~~~

الصفحة لازم تتفتح من سيرفر (مش [[file://]]) عشان الـ modules: [[npx serve]] أو أي سيرفر صغير.

**ليه التصميم ده:**

- [[n in globalThis]] بيسأل «الاسم ده موجود في الـ global؟» من غير ما يقراه (قراية [[document]] في Node مش مشكلة مع [[globalThis]]، بس [[in]] أوضح).
- [[runtime()]] بتسأل عن Deno و Bun الأول لأنهم الاتنين بيعرّفوا [[process]] عشان التوافق مع Node.
- آخر سطر بيطبع بس لما الملف يتشغّل من Node مباشرة، فالصفحة تستورد [[report]] من غير ما حاجة تتطبع.

**نتيجة فاجئتنا:** [[navigator]] ✓ في Node. من Node 21 فيه [[navigator]] global: جرّبنا [[node -p "navigator.userAgent"]] وطلع [[Node.js/24]]، و [[hardwareConcurrency]] بـ 16. فـ [[typeof navigator !== "undefined"]] **مبقتش** طريقة تعرف بيها إنك في متصفح. عشان كده الترتيب في [[runtime()]] بيسأل عن [[process.versions.node]] قبل [[navigator]]. ودي بالظبط الفكرة: اسأل عن الـ feature اللي محتاجها، مش عن اسم البيئة.` },
      ],
      items: [
        {
          cmd: "boolean literals و null literal و trailing commas",
          title: "الـ literals اللي بتكتبها كل يوم بأساميها: true و false و null و /re/، والفاصلة الأخيرة مسموحة فين وممنوعة فين",
          desc: R`الـ **literal** قيمة مكتوبة في الكود بشكلها، مش متغير ولا نداء. وفيه ٤ بتكتبهم كل يوم: **boolean literals** [[true]] و [[false]]، و **null literal** [[null]]، و **regular expression literal** [[/.../flags]] (الدرس كامل في «regex literal و new RegExp: خصايص الـ RegExp و toString»)، والأرقام والنصوص (ليهم وحدات لوحدهم). والمهم: دول **كلمات محجوزة**، فمينفعش [[null = 1]] ولا [[let true]]. أما [[undefined]] فمش literal خالص: ده اسم خاصية على الـ global، وينفع يتعمل له shadow.

و **trailing commas** (الفاصلة بعد آخر عنصر) مسموحة في الـ arrays والـ objects والـ parameters والـ calls والـ destructuring والـ imports والـ exports: بتخلّي إضافة سطر جديد تغيّر سطر واحد في الـ diff بدل اتنين. وممنوعة في **JSON** (أي [[JSON.parse]] بيرمي)، وبعد [[...rest]]، وفي [[f(,)]] الفاضية. وفي الـ array فاصلتين ورا بعض [[[1, , 3]]] مش trailing comma: ده **خرم** (hole) بيعمل عنصر ناقص.`,
          example: R`// boolean literals و null literal: قيم بتتكتب بإيدك ومش أسامي متغيرات
const flags = [true, false, null];
console.log(flags.map((v) => typeof v), typeof undefined);
const shadow = (undefined) => undefined;
console.log(shadow(5), null == undefined, null === undefined);
// regular expression literal: /.../ بيتعمل parse مع الملف
const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone instanceof RegExp);
// trailing commas: مسموحة في arrays و objects و params و calls
const order = {
  id: 7,
  items: ["tea", "rice",],
  paid: false,
};
function total(price, qty,) { return price * qty; }
console.log(order.items.length, total(20, 3,), total.length);
console.log([1, , 3,].length, [,].length);
// وممنوعة في JSON وبعد ...rest
try { JSON.parse('{"a": 1,}'); } catch (e) { console.log(e.name + ": " + e.message); }
try { new Function("function f(...args,) {}"); } catch (e) { console.log(e.name + ": " + e.message); }`,
          try: R`اعمل ملف فيه كل مكان ممكن تتحط فيه فاصلة أخيرة (array، object، parameters، call، arrow params، destructuring، class method، import و export من ملف تاني)، وجرّب بـ [[new Function(src)]] على كل واحد: يتقبل ولا يرمي؟ وزوّد [[function g(...r,) {}]] و [[Math.max(,)]].`,
          sol: R`~~~js commas.mjs
const places = {
  "array": "[1, 2,]",
  "object": "({ a: 1, })",
  "params": "function f(a, b,) {}",
  "call": "Math.max(1, 2,)",
  "arrow params": "(a, b,) => a",
  "destructuring": "const [x, y,] = [1, 2];",
  "object destructuring": "const { a, } = { a: 1 };",
  "after rest": "function g(...r,) {}",
  "empty call": "Math.max(,)",
  "class method params": "class K { m(a,) {} }",
};
for (const [name, src] of Object.entries(places)) {
  try { new Function(src); console.log("✓", name); } catch (e) { console.log("✗", name, "→", e.message); }
}
~~~

~~~text الناتج (Node 24.22)
✓ array
✓ object
✓ params
✓ call
✓ arrow params
✓ destructuring
✓ object destructuring
✗ after rest → Rest parameter must be last formal parameter
✗ empty call → Unexpected token ','
✓ class method params
~~~

و الـ imports والـ exports من ملف لملف حقيقي:

~~~js lib.mjs
export const a = 1, b = 2;
export { a as one, b as two, };
~~~

~~~js use.mjs
import { one, two, } from "./lib.mjs";
console.log(one, two);
~~~

~~~text الناتج: node use.mjs
1 2
~~~

[[new Function(src)]] بيعمل parse للنص كجسم دالة من غير ما ينفّذه، فأي SyntaxError بيبان على طول. الفاصلة الأخيرة مسموحة في كل حتة فيها «لستة»، إلا بعد الـ rest (لأن الـ rest لازم آخر حاجة، والفاصلة معناها «فيه حاجة جاية») وإلا لو اللستة فاضية.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[[1, , 3,].length]] و [[typeof null]] و [[[,].length]] و [[[, ,].length]] و [[typeof true]] و [[Object.keys([1, , 3])]]. اكتبهم قبل ما تشغّل.`, done: R`كتبت [[3 object 1 2 boolean [ '0', '2' ] ]] وطلع كده، وتقدر تقول ليه [[[,]]] طوله 1 مش 0.`, sol: R`~~~js p1.mjs
console.log([1, , 3,].length, typeof null, [,].length, [, ,].length, typeof true, Object.keys([1, , 3]));
~~~

~~~text الناتج (Node 24.22)
3 object 1 2 boolean [ '0', '2' ]
~~~

- [[[1, , 3,]]]: الفاصلة الأخيرة trailing comma (مبتعملش عنصر)، والفاصلتين في النص خرم. فـ ٣ خانات.
- [[[,]]]: مفيش عنصر قبل الفاصلة، فهي مش trailing comma: هي بتقفل خانة فاضية (خرم)، فطوله 1. و [[[, ,]]] خرمين.
- [[Object.keys([1, , 3])]]: الخرم **مش موجود** كخاصية، فـ [['1']] مش في الـ keys. ده الفرق بين الخرم و [[undefined]].
- [[typeof null]] بـ [["object"]]: غلطة تاريخية من أول نسخة في اللغة، واتسابت عشان متكسرش المواقع.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ملف [[a.js]] فيه array من ٢ عنصر من غير trailing comma، و [[b.js]] نفسه بعد ما زوّدت عنصر تالت. واعمل نفس الحكاية بـ trailing comma في [[c.js]] و [[d.js]]. قارن بـ [[git diff --no-index --stat]] وبعدين [[git diff --no-index]].`, done: R`الـ diff من غير trailing comma بيقول [[2 insertions(+), 1 deletion(-)]]، ومعاها [[1 insertion(+)]] بس، وشفت السطر اللي «اتغيّر» في الأولى وهو متغيّرش فعلًا.`, sol: R`~~~text a.js و b.js و c.js و d.js
// a.js                // b.js                // c.js                // d.js
const menu = [         const menu = [         const menu = [         const menu = [
  "tea",                 "tea",                 "tea",                 "tea",
  "rice"                 "rice",                "rice",                "rice",
];                       "milk"               ];                       "milk",
                       ];                                            ];
~~~

~~~bash
git --no-pager diff --no-index --stat a.js b.js
git --no-pager diff --no-index a.js b.js
git --no-pager diff --no-index c.js d.js
git --no-pager diff --no-index --stat c.js d.js
~~~

~~~text الناتج (Git Bash، Git for Windows)
 a.js => b.js | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
   "tea",
-  "rice"
+  "rice",
+  "milk"
 ];
   "tea",
   "rice",
+  "milk",
 ];
 c.js => d.js | 1 +
 1 file changed, 1 insertion(+)
~~~

(شلنا من الناتج سطور [[warning: ... LF will be replaced by CRLF]] اللي Git على ويندوز بيطبعها لما [[core.autocrlf]] شغال: ملهاش علاقة بالتمرين.)

- من غير trailing comma: السطر [["rice"]] **اتغيّر** في الـ diff (اتزوّدت له فاصلة)، فـ [[git blame]] هيقول إن آخر واحد عدّل السطر ده هو اللي زوّد [["milk"]]، وده كدب.
- معاها: سطر واحد اتضاف، والـ review أسهل، والـ merge conflicts أقل لو اتنين زوّدوا عناصر في نفس الوقت.
- عشان كده Prettier بيحط trailing commas لوحده (الإعداد [[trailingComma: "all"]] هو الافتراضي من Prettier 3، من الـ docs).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف [[settings.json]] فيه [[{"theme": "dark", "fontSize": 14,}]] وسكربت بيعمله [[JSON.parse]]. شغّله واقرا الرسالة، وصلّح الملف، وقول ليه JS قبلت نفس الشكل في object literal.`, done: R`شفت [[Expected double-quoted property name in JSON at position ...]]، وشلت الفاصلة فاشتغل، وعرفت إن JSON مش JavaScript: مواصفة منفصلة أشد (مفيش trailing commas ولا تعليقات ولا single quotes).`, sol: R`~~~js p3.mjs
const bad = '{"theme": "dark", "fontSize": 14,}';
try { JSON.parse(bad); } catch (e) { console.log(e.name + ": " + e.message); }
const fixed = '{"theme": "dark", "fontSize": 14}';
console.log(JSON.parse(fixed));
try { JSON.parse("[1, 2,]"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج (Node 24.22)
SyntaxError: Expected double-quoted property name in JSON at position 33 (line 1 column 34)
{ theme: 'dark', fontSize: 14 }
SyntaxError: Unexpected token ']', "[1, 2,]" is not valid JSON
~~~

- الرسالة بتقول «مستني اسم property بين تنصيص» عند العمود 34: بعد الفاصلة الـ parser مستني key جديد، ولقى [[}]] (المكان 33 بالعد من صفر، يعني العمود 34).
- في الـ array الرسالة مختلفة ([[Unexpected token ']']]) بس نفس السبب.
- JSON (RFC 8259) مبني على JS قديمة جدًا، ومتعمّد يبقى صغير وثابت: مفيش trailing commas خالص. لو ملفات الإعدادات عندك بيكتبها بني آدمين وبيغلطوا، فيه صيغ زي JSON5 أو JSONC (اللي VS Code بيستخدمها في [[settings.json]] بتاعه) بتقبلهم بـ parser خاص.` },
            { lvl: 'تحدي', t: R`**اشرحها بالكود:** ورّي إن [[undefined]] مش literal و [[null]] literal: دالة parameter اسمه [[undefined]]، و [[new Function("null = 5")]]، و [[Object.getOwnPropertyDescriptor(globalThis, "undefined")]]. واكتب في سطرين ليه [[void 0]] موجودة في كود قديم.`, done: R`الدالة رجّعت [[[ 'surprise', 'string' ]]]، و [[null = 5]] رمت [[Invalid left-hand side in assignment]]، و [[writable]] بـ [[false]]، والسطرين بيقولوا إن [[void 0]] دايمًا [[undefined]] الحقيقية حتى لو حد عمل shadow.`, sol: R`~~~js p5.mjs
function show(undefined) { return [undefined, typeof undefined]; }
console.log(show("surprise"), void 0 === undefined);
try { new Function("null = 5"); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(globalThis.undefined === undefined, Object.getOwnPropertyDescriptor(globalThis, "undefined").writable);
~~~

~~~text الناتج (Node 24.22)
[ 'surprise', 'string' ] true
SyntaxError: Invalid left-hand side in assignment
true false
~~~

- [[undefined]] **identifier** (اسم) زي أي اسم متغير، فينفع parameter أو [[let]] باسمه في أي scope (جرّبنا [[let undefined = 1]] في دالة واتقبل). و [[null]] و [[true]] و [[false]] **literals**: الـ parser بيشوفهم قيم، فـ [[let null]] بيرمي [[Unexpected token 'null']].
- الـ [[undefined]] بتاعة الـ global نفسها [[writable: false]] من ES5، فمحدش يقدر يغيّرها، بس shadow جوه scope لسه ممكن.
- [[void 0]]: [[void]] أي حاجة = [[undefined]] الحقيقية دايمًا، والـ minifiers بيستخدموها عشان أقصر من [[undefined]] ومفيش shadow يأثر عليها.` },
          ],
          flag: "script",
          deep: {
            why: R`بتكتب الحاجات دي كل يوم من غير ما تعرف أساميها، والأسامي دي هي اللي هتلاقيها في رسايل الأخطاء ([[Unexpected token 'null']]) وفي الـ linters (قاعدة [[comma-dangle]]) وفي الـ formatters (Prettier [[trailingComma]]). والفرق بين JS و JSON في الفاصلة الأخيرة بيوقّع ملفات config وطلبات API كل يوم.`,
            how: R`الـ **lexical grammar** هي أول مرحلة: الـ engine بيقطّع الملف لـ tokens. [[true]] و [[false]] بيبقوا BooleanLiteral، و [[null]] NullLiteral، وكلهم من الكلمات المحجوزة (reserved words)، فمينفعش يبقوا أسامي متغيرات أو parameters. أما [[undefined]] و [[NaN]] و [[Infinity]] فـ identifiers عادية بتشاور على خصايص في الـ global object، عشان كده الـ shadow ممكن.

و [[/.../]] الـ lexer بيعرف إنها regex مش قسمة من المكان: بعد قيمة ([[a / b]]) قسمة، وفي مكان مستني قيمة ([[= /x/]]) regex.

الـ **trailing comma** في الـ grammar بتاعة كل لستة: ArrayLiteral (ومن ES3 القديمة كمان)، و ObjectLiteral (من ES5)، و parameters والـ arguments (من ES2017). في الـ array بس، الفاصلة اللي **قبلها** فاضي بتعمل خرم ([[Elision]] في الـ spec)، فـ [[[1, , 3]]] طولها 3 والخانة 1 مش موجودة أصلًا. الـ rest ([[...args]]) لازم آخر عنصر، والفاصلة بعده SyntaxError. والـ JSON مواصفة منفصلة (RFC 8259) مفيهاش trailing commas.`,
            when: R`trailing commas في أي لستة متعددة السطور: arrays و objects و imports و parameters طويلة. وفي لستة على سطر واحد مش لازمة. ومتحطهاش أبدًا في ملف [[.json]] ولا في نص هتعمله [[JSON.parse]]. و [[null]] لما تقصد «مفيش قيمة» بقصد (حقل اتمسح، نتيجة بحث فاضية)، و [[undefined]] سيبها للغة (متغير ماخدش قيمة، خاصية مش موجودة).`,
            mistakes: R`تحط trailing comma في JSON (أو تنسخ object من JS وتلزقه في ملف [[.json]]). وتحط فاصلة بعد [[...rest]]. وتفتكر [[[1, , 3]]] فيها [[undefined]] في النص وهي خرم (فـ [[forEach]] و [[map]] بيتنطوا عليه، و [[Object.keys]] مبيشوفوش). و [[typeof x === "object"]] لوحده كفحص لـ object: [[null]] بيعدّي، فاكتب [[x !== null && typeof x === "object"]]. وفي كود قديم جدًا (IE8) trailing comma في object كانت بترمي، فلو شفت كود بيتجنبها ده السبب.`
          },
          teach: R`## الفكرة في سطر

كل قيمة مكتوبة في الكود بشكلها اسمها **literal**، والـ parser بيتعرف عليها قبل أي تنفيذ. المثال بيمشي على الـ literals اللي ملهاش وحدة لوحدها، وبعدين الفاصلة الأخيرة. كل الناتج اتشغّل فعلًا على Node 24.22 (والـ JSON SyntaxError بنفس النص في Chrome، لأن الاتنين V8).

---

## ١. boolean literals و null literal

~~~js app.mjs
const flags = [true, false, null];
console.log(flags.map((v) => typeof v), typeof undefined);
~~~

~~~text الناتج
[ 'boolean', 'boolean', 'object' ] undefined
~~~

| الـ literal | النوع | معناه |
|---|---|---|
| [[true]] و [[false]] | boolean | الـ **boolean literals**: القيمتين الوحيدتين للنوع ده |
| [[null]] | null (و [[typeof]] بيقول [["object"]] غلط تاريخي) | الـ **null literal**: «مفيش قيمة» بقصد |
| [[/.../flags]] | object من نوع RegExp | الـ regular expression literal (درس لوحده في وحدة regex) |
| [[undefined]] | **مش literal** | اسم خاصية على الـ global قيمتها undefined |

### ليه [[undefined]] مش زيهم؟

~~~js app.mjs
const shadow = (undefined) => undefined;
console.log(shadow(5), null == undefined, null === undefined);
~~~

~~~text الناتج
5 true false
~~~

- [[(undefined) => undefined]]: parameter **اسمه** [[undefined]]. اتقبل عادي، ورجّع 5! لأن [[undefined]] identifier زي أي اسم.
- جرّبنا نفس الحكاية مع [[null]]: [[new Function("let null = 1;")]] رمت [[SyntaxError: Unexpected token 'null']]، و [[null = 1]] و [[true = 1]] رموا [[Invalid left-hand side in assignment]]. الـ literals **قيم** مش أسامي.
- [[null == undefined]] بـ [[true]] (الـ [[==]] بيعتبرهم زي بعض)، و [[===]] بـ [[false]] (نوعين مختلفين).

---

## ٢. regular expression literal

~~~js app.mjs
const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone instanceof RegExp);
~~~

~~~text الناتج
true true
~~~

[[/.../]] literal بيعمل object من نوع [[RegExp]] وبيتعمل له parse مع الملف. الفرق بينه وبين [[new RegExp]] والخصايص كلها في درس «regex literal و new RegExp: خصايص الـ RegExp و toString».

---

## ٣. trailing commas: المسموح

~~~js app.mjs
const order = {
  id: 7,
  items: ["tea", "rice",],
  paid: false,
};
function total(price, qty,) { return price * qty; }
console.log(order.items.length, total(20, 3,), total.length);
~~~

~~~text الناتج
2 60 2
~~~

| المكان | مثال | النتيجة |
|---|---|---|
| object literal | [[{ id: 7, paid: false, }]] | الفاصلة بعد [[paid]] ملهاش أثر |
| array literal | [[["tea", "rice",]]] | طوله 2 مش 3 |
| parameters | [[function total(price, qty,)]] | [[total.length]] بـ 2 |
| call | [[total(20, 3,)]] | نداء عادي بـ argumentين |
| destructuring و imports و exports | [[const [x, y,] = arr]] و [[import { a, } from]] | جرّبناهم في الحل: اتقبلوا |

### خرم مش trailing comma

~~~js app.mjs
console.log([1, , 3,].length, [,].length);
~~~

~~~text الناتج
3 1
~~~

في الـ array، فاصلة **بعد** آخر عنصر = trailing (ملهاش أثر). فاصلة **قبلها مفيش حاجة** = خرم (hole): خانة في الطول بس مش موجودة. [[[,]]] طولها 1 لأنها خرم واحد.

---

## ٤. trailing commas: الممنوع

~~~js app.mjs
try { JSON.parse('{"a": 1,}'); } catch (e) { console.log(e.name + ": " + e.message); }
try { new Function("function f(...args,) {}"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
SyntaxError: Expected double-quoted property name in JSON at position 8 (line 1 column 9)
SyntaxError: Rest parameter must be last formal parameter
~~~

| الممنوع | الرسالة الحقيقية |
|---|---|
| JSON object | [[Expected double-quoted property name in JSON at position 8]] |
| JSON array [["[1, 2,]"]] | [[Unexpected token ']', "[1, 2,]" is not valid JSON]] |
| بعد rest parameter | [[Rest parameter must be last formal parameter]] |
| بعد rest في destructuring | [[Rest element must be last element]] |
| لستة فاضية [[f(,)]] و [[(,) => 1]] | [[Unexpected token ',']] |

الـ rest معناه «كل اللي فاضل»، والفاصلة بعده معناها «فيه حاجة جاية». تناقض، فالـ grammar بيرفضه.

---

## الخلاصة

| الحاجة | literal؟ | تتكتب مكانها فاصلة أخيرة؟ |
|---|---|---|
| [[true]] و [[false]] و [[null]] | أيوه، كلمات محجوزة | |
| [[undefined]] | لأ، اسم على الـ global | |
| [[/re/flags]] | أيوه، regular expression literal | |
| arrays و objects و params و calls و imports | | أيوه، ويُفضّل في اللستة الطويلة |
| JSON، وبعد [[...rest]]، و [[f(,)]] | | لأ: SyntaxError |`,
          lines: [
            R`array فيها الـ boolean literals الاتنين والـ null literal: قيم مكتوبة بشكلها مش أسامي متغيرات.`,
            R`[[typeof]] لكل واحدة: [[boolean]] و [[boolean]] و [[object]] (غلط تاريخي في [[null]])، و [[typeof undefined]] بـ [["undefined"]].`,
            R`arrow function الـ parameter بتاعها **اسمه** [[undefined]]: اتقبل لأن [[undefined]] identifier مش literal.`,
            R`[[shadow(5)]] رجّعت 5 (الـ parameter غطّى على الـ global)، و [[null == undefined]] بـ [[true]] و [[===]] بـ [[false]].`,
            R`regular expression literal: [[/^01[0125]\d{8}$/]] بيعمل RegExp object وقت الـ parse.`,
            R`الـ regex شغال ([[true]])، و [[instanceof RegExp]] بـ [[true]]: الـ literal والـ constructor بيطلّعوا نفس النوع.`,
            R`بداية object literal هنحط فيه trailing commas.`,
            R`أول خاصية، رقم عادي وبعده فاصلة.`,
            R`array جواه فاصلة بعد آخر عنصر [["rice",]]: trailing comma ملهاش أثر على الطول.`,
            R`آخر خاصية وبعدها فاصلة: مسموح في الـ objects من ES5.`,
            R`قفلة الـ object.`,
            R`دالة فيها فاصلة بعد آخر parameter: مسموح من ES2017.`,
            R`طول الـ array 2، والنداء نفسه بفاصلة أخيرة رجّع 60، و [[total.length]] (عدد الـ parameters) بـ 2.`,
            R`[[[1, , 3,]]] طولها 3: الفاصلتين في النص خرم، والأخيرة trailing. و [[[,]]] طولها 1: خرم واحد.`,
            R`نفس الـ object بفاصلة أخيرة كنص JSON: [[JSON.parse]] رمت SyntaxError. JSON مواصفة منفصلة مفيهاش trailing commas.`,
            R`فاصلة بعد [[...args]]: SyntaxError [[Rest parameter must be last formal parameter]]. [[new Function]] بيعمل parse للنص من غير ما ينفّذه.`,
          ],
          ref: [
            { t: "MDN: Lexical grammar: boolean literal", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#boolean_literal" },
            { t: "MDN: Lexical grammar: null literal", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#null_literal" },
            { t: "MDN: Lexical grammar: regular expression literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#regular_expression_literals" },
            { t: "MDN: Trailing commas", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas" },
            { t: "MDN: undefined", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined" },
          ],
          pre: [{ to: "js/regex literal و new RegExp: خصايص الـ RegExp و toString", why: R`الـ regular expression literal بالتفصيل` }],
        },
        {
          cmd: "hashbang و import attributes: CLI بيقرا JSON",
          title: "سكربت Node بيتشغّل لوحده بـ ./menu.mjs، وبيقرا ملف JSON بـ import ... with { type: \"json\" }",
          desc: R`**hashbang comment** هو سطر [[#!/usr/bin/env node]] في **أول** الملف بالظبط: لينكس والماك (و Git Bash) بيقروه لما تشغّل الملف مباشرة ([[./menu.mjs]]) عشان يعرفوا يشغّلوه بإيه، و JavaScript نفسها بتعامله كتعليق. لو في أي سطر تاني، أو قبله مسافة، SyntaxError. وويندوز (PowerShell و CMD) مبيقراهوش: هناك [[node menu.mjs]] أو الـ [[bin]] في [[package.json]].

**import attributes** بيقولوا للـ runtime **نوع** الملف اللي بتستورده: [[import config from "./menu.json" with { type: "json" }]]. من غيرها Node بيرفض يستورد JSON ([[ERR_IMPORT_ATTRIBUTE_MISSING]])، والمتصفح بيرفض. السبب أمني: سيرفر ممكن يرجّع JavaScript مكان الـ JSON، والـ attribute بيضمن إن الملف هيتقري **داتا بس** مهما رجع. ونفس الشكل في الـ dynamic import: [[await import("./x.json", { with: { type: "json" } })]]. والـ JSON بييجي [[default]] بس (مفيش named exports)، ومتخزن في cache الـ modules.`,
          example: R`#!/usr/bin/env node
// menu.mjs: CLI بيقرا الكونفج بـ import attributes ويطبع المنيو
import config from "./menu.json" with { type: "json" };
const { shop, currency, items } = config;
const filter = process.argv[2]?.toLowerCase();
console.log($__bt$__{shop}: $__{items.length} أصناف$__bt);
for (const it of items) {
  if (filter && !it.name.toLowerCase().includes(filter)) continue;
  console.log($__bt$__{it.name.padEnd(9)} $__{it.price} $__{currency}$__bt);
}
const again = await import("./menu.json", { with: { type: "json" } });
console.log(again.default === config, Object.isFrozen(config));`,
          try: R`اعمل [[count-lines.mjs]] أوله hashbang، بيعدّ السطور غير الفاضية في كل ملف تديهوله ويطبع الإجمالي، والملف المش موجود يطبع [[ENOENT]] ويكمّل بالباقي بس الـ exit code يبقى 1، ومن غير arguments يطبع طريقة الاستخدام ويخرج بـ 2. اعمله [[chmod +x]] وشغّله بـ [[./count-lines.mjs]] في Git Bash.`,
          sol: R`~~~js count-lines.mjs
#!/usr/bin/env node
// count-lines.mjs: يعدّ سطور الملفات اللي تديهاله
import { readFileSync } from "node:fs";
const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("الاستخدام: count-lines <file>...");
  process.exit(2);
}
let total = 0;
for (const f of files) {
  try {
    const n = readFileSync(f, "utf8").split(/\r?\n/).filter((l) => l !== "").length;
    total += n;
    console.log(String(n).padStart(5), f);
  } catch (e) {
    console.error($__bt$__{f}: $__{e.code}$__bt);
    process.exitCode = 1;
  }
}
console.log(String(total).padStart(5), "الإجمالي");
~~~

~~~bash
chmod +x count-lines.mjs
./count-lines.mjs count-lines.mjs package.json nope.txt; echo "exit=$?"
./count-lines.mjs; echo "exit=$?"
~~~

~~~text الناتج (Git Bash، Node 24.22)
   20 count-lines.mjs
    1 package.json
nope.txt: ENOENT
   21 الإجمالي
exit=1
الاستخدام: count-lines <file>...
exit=2
~~~

- [[chmod +x]]: بيدّي الملف صلاحية التنفيذ ([[-rwxr-xr-x]] في [[ls -l]]). من غيرها [[./count-lines.mjs]] بيقول [[Permission denied]].
- [[process.exitCode = 1]] بدل [[process.exit(1)]]: البرنامج بيكمّل الملفات الباقية ويخرج بـ 1 في الآخر. و [[process.exit(2)]] للاستخدام الغلط عشان نقف على طول.
- [[console.error]] بيكتب على stderr، فلو عملت [[> out.txt]] الأخطاء هتفضل ظاهرة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ملف [[late.mjs]] أول سطر فيه فاضي وبعده [[#!/usr/bin/env node]]، وملف [[late2.mjs]] أول سطر فيه [[  #!/usr/bin/env node]] (بمسافتين). [[node late.mjs]] و [[node late2.mjs]] هيعملوا إيه؟`, done: R`توقعت SyntaxError في الاتنين وطلعت [[Invalid or unexpected token]] مع [[^]] تحت الـ [[#]]، وعرفت إن الـ hashbang لازم أول حرفين في الملف بالظبط.`, sol: R`~~~bash
printf '\n#!/usr/bin/env node\nconsole.log(1)\n' > late.mjs
printf '  #!/usr/bin/env node\nconsole.log(1)\n' > late2.mjs
node late.mjs
node late2.mjs
~~~

~~~text الناتج (Node 24.22)
late.mjs:2
#!/usr/bin/env node
^

SyntaxError: Invalid or unexpected token

late2.mjs:1
  #!/usr/bin/env node
  ^

SyntaxError: Invalid or unexpected token
~~~

الـ grammar بيقبل [[#!]] كتعليق **لو** هو أول حرفين في الملف (أو في الـ script بتاع [[eval]] و [[new Function]]). في أي مكان تاني [[#]] حرف ملوش معنى برّه الـ classes (هناك بيبدأ private name). وده نفس اللي الـ kernel في لينكس بيعمله: بيبص على أول بايتين بس.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[version.mjs]] بيستورد [[package.json]] بـ import attributes ويطبع [[name v version]]. وبعدين شيل [[with { type: "json" }]] وشغّل تاني واقرا الرسالة، وجرّب [[type: "css"]] و [[assert]] بدل [[with]].`, done: R`بيطبع [[kahwa-tools v0.3.1]]، ومن غير attribute بيرمي [[ERR_IMPORT_ATTRIBUTE_MISSING]]، و [[css]] بيرمي [[ERR_IMPORT_ATTRIBUTE_UNSUPPORTED]]، و [[assert]] بيرمي SyntaxError.`, sol: R`~~~json package.json
{ "name": "kahwa-tools", "version": "0.3.1", "type": "module" }
~~~

~~~js version.mjs
import pkg from "./package.json" with { type: "json" };
console.log($__bt$__{pkg.name} v$__{pkg.version}$__bt);
~~~

~~~text الناتج (Node 24.22)
kahwa-tools v0.3.1
~~~

والتلات أشكال الغلط (السطر الأول بس من كل رسالة، والمسار متقصّر):

~~~text الناتج
TypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module "file:///…/config.json" needs an import attribute of "type: json"
TypeError [ERR_IMPORT_ATTRIBUTE_UNSUPPORTED]: Import attribute "type" with value "css" is not supported in file:///…/config.json
SyntaxError: Unexpected identifier 'assert'
~~~

- من غير attribute: Node بيعرف من الامتداد إنه JSON، بس بيرفض يحمّله من غير ما **انت** تقول [[type: "json"]]. القاعدة: النوع لازم يبقى معلن في الكود، مش متخمّن.
- [[type: "css"]]: Node مبيدعمش CSS modules (المتصفح بيدعمها).
- [[assert]]: الشكل القديم من الاقتراح (Node 17 لـ 21 كان بيقبله). اتشال في Node 22، فلو شفته في كود قديم بدّله بـ [[with]].` },
            { lvl: 'تحدي', t: R`**اكتشف فخ الـ cache:** سكربت بيكتب [[state.json]] بـ [[{ n: 1 }]]، يستورده بـ [[import()]] و [[with]]، يكتبه تاني بـ [[{ n: 2 }]]، ويستورده تاني. اطبع القيمتين و [[a === b]]. وبعدين اقراه بـ [[readFile]] و [[JSON.parse]]، وجرّب [[import("./state.json?v=2", ...)]].`, done: R`الـ import التاني رجّع [[1]] نفس الـ object، و [[readFile]] رجّع [[2]]، و [[?v=2]] رجّع [[2]]، وعرفت إمتى تستخدم [[import]] للـ JSON وإمتى [[fs]].`, sol: R`~~~js cache.mjs
import { writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
writeFileSync("state.json", JSON.stringify({ n: 1 }));
const a = (await import("./state.json", { with: { type: "json" } })).default;
writeFileSync("state.json", JSON.stringify({ n: 2 }));
const b = (await import("./state.json", { with: { type: "json" } })).default;
console.log(a.n, b.n, a === b);
const fresh = JSON.parse(await readFile("state.json", "utf8"));
console.log(fresh.n);
const busted = (await import("./state.json?v=2", { with: { type: "json" } })).default;
console.log(busted.n);
~~~

~~~text الناتج (Node 24.22)
1 1 true
2
2
~~~

- أي module (والـ JSON module منهم) بيتحمّل **مرة واحدة** لكل URL ويتحفظ. الـ [[import()]] التاني رجّع نفس الـ object حتى لو الملف اتغيّر.
- [[?v=2]] بيعمل URL جديد فبيتحمّل تاني، بس القديم بيفضل في الذاكرة: لو عملتها في loop هتعمل memory leak.
- **القاعدة:** [[import ... with { type: "json" }]] للحاجات الثابتة اللي بتتقري مرة (config، package.json، ترجمات). والملفات اللي بتتغيّر وانت شغال: [[readFile]] و [[JSON.parse]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف CLI اتكتب على ويندوز وحفظه الـ editor بنهايات سطور CRLF. في Git Bash اشتغل عادي، بس على لينكس بيقول [[/usr/bin/env: 'node\r': No such file or directory]]. افهم الرسالة، واعرف الملف فيه CRLF إزاي، وصلّحه.`, done: R`عرفت إن الـ [[\r]] بقى جزء من اسم البرنامج، وشفته بـ [[od -c]] أو [[file]]، وصلّحته بتغيير نهاية السطور لـ LF من VS Code أو [[sed -i 's/\r$//']]، وحطيت [[*.mjs text eol=lf]] في [[.gitattributes]].`, sol: R`~~~bash
printf '#!/usr/bin/env node\r\nconsole.log("crlf ok")\r\n' > crlf.mjs
head -c 25 crlf.mjs | od -c | head -2
/usr/bin/env $'node\r' -v
sed -i 's/\r$//' crlf.mjs
head -c 25 crlf.mjs | od -c | head -2
~~~

~~~text الناتج (Git Bash)
0000000   #   !   /   u   s   r   /   b   i   n   /   e   n   v       n
0000020   o   d   e  \r  \n   c   o   n   s
/usr/bin/env: 'node\r': No such file or directory
0000000   #   !   /   u   s   r   /   b   i   n   /   e   n   v       n
0000020   o   d   e  \n   c   o   n   s   o
~~~

- [[od -c]] بيعرض كل بايت: [[\r \n]] بعد [[node]] = CRLF.
- السطر التالت بيعمل بالظبط اللي لينكس بيعمله مع الـ hashbang ده: بينادي [[env]] بالاسم [[node\r]]، فـ [[env]] بيدوّر على برنامج اسمه كده ومبيلاقيش. (في Git Bash نفسه [[./crlf.mjs]] اشتغل وطبع [[crlf ok]]، فالمشكلة مبتبانش غير لما الملف يروح سيرفر لينكس أو CI.)
- [[sed -i 's/\r$//']] بيشيل [[\r]] من آخر كل سطر. ومن VS Code: اضغط [[CRLF]] تحت على اليمين واختار [[LF]].
- عشان متتكررش: [[.gitattributes]] فيه [[*.mjs text eol=lf]] فـ Git يحفظها LF دايمًا.` },
          ],
          flag: "script",
          deep: {
            why: R`أي أداة بتشغّلها من الترمنال وهي مكتوبة بـ JavaScript ([[eslint]] و [[prettier]] و [[tsc]] و [[vite]]) ملفها أوله hashbang. ولما تكتب أداة للفريق (سكربت deploy، أو مولّد ملفات، أو فحص config) هتحتاج نفس الشكل. والـ JSON أشهر حاجة بتتقري في الأدوات دي (config، package.json، ترجمات)، والـ import attributes هي الطريقة الرسمية في ESM بعد ما [[require("./x.json")]] بقى CommonJS بس.`,
            how: R`لما تكتب [[./menu.mjs]] في bash، الـ kernel بيقرا أول بايتين، يلاقيهم [[#!]]، فيشغّل اللي بعدهم ([[/usr/bin/env node]]) ويديله مسار الملف. و [[env]] بيدوّر على [[node]] في الـ [[PATH]]، فده أحسن من [[#!/usr/bin/node]] لأن Node ممكن يبقى متسطّب في أي مكان (nvm مثلًا). وبعدين Node بيقرا الملف، والـ grammar بتاعة ECMAScript (من ES2023) بتقول إن [[#!...]] في أول الـ script أو الـ module **تعليق** (HashbangComment)، فمبيتنفّذش.

الـ import attributes ([[with { type: "json" }]]) بتتبعت للـ host (Node أو المتصفح) مع الـ import. الـ host بيحمّل الملف، ويقارن نوعه الحقيقي بالمعلن: Node من الامتداد، والمتصفح من [[Content-Type]] بتاع الرد (لازم [[application/json]]). لو مختلفين أو مش معلن، بيرفض. ولو JSON، بيعمل module فيه [[default]] بس = نتيجة [[JSON.parse]]، مش متجمّد (جرّبنا [[Object.isFrozen]] بـ [[false]] وقدرنا نعدّل)، بس متشارك بين كل اللي استوردوه.`,
            when: R`hashbang في أي ملف هيتشغّل كأمر (CLI)، مع [[chmod +x]] و [[bin]] في [[package.json]]. ومش في ملفات الـ library اللي بتتستورد بس. والـ import attributes لأي JSON ثابت معروف مكانه وقت الكتابة (أو بـ [[import()]] لو المسار من اليوزر). والملفات اللي بتتغيّر وقت التشغيل أو كبيرة جدًا: [[readFile]] و [[JSON.parse]] (أو streaming).`,
            mistakes: R`سطر فاضي أو BOM أو مسافة قبل [[#!]]. ونهايات سطور CRLF في ملف هيروح لينكس. ونسيان [[chmod +x]] ([[Permission denied]]). و [[import x from "./a.json"]] من غير [[with]]. و [[assert { type: "json" }]] من كود قديم (اتشالت في Node 22). و [[import { shop } from "./menu.json" with { type: "json" }]]: الـ JSON مفيهوش named exports، فجرّبناها ورمت [[SyntaxError: The requested module './menu.json' does not provide an export named 'shop']]. وتعتمد على [[import()]] يرجّع نسخة جديدة من ملف اتغيّر (الـ cache).`
          },
          teach: R`## الفكرة في سطر

CLI حقيقي في ملف واحد: سطر **hashbang** بيخلي الملف يتشغّل لوحده، و **import attributes** بيقروا الـ config. كل الناتج اتشغّل فعلًا على Node 24.22 في Git Bash، وجزء المتصفح على Chrome 157.

---

## ١. الملفين

~~~json menu.json
{
  "shop": "Kahwa Corner",
  "currency": "EGP",
  "items": [
    { "name": "Tea", "price": 15 },
    { "name": "Mint tea", "price": 20 },
    { "name": "Coffee", "price": 35 }
  ]
}
~~~

و [[menu.mjs]] هو المثال اللي فوق.

---

## ٢. hashbang comment: [[#!/usr/bin/env node]]

~~~text menu.mjs
#!/usr/bin/env node
~~~

| الحتة | معناها |
|---|---|
| [[#!]] | «shebang» أو «hashbang»: الـ kernel في لينكس والماك بيقرا أول بايتين في أي ملف بتنفّذه، ولو لقاهم كده بيشغّل اللي بعدهم |
| [[/usr/bin/env]] | برنامج بيدوّر على الاسم اللي بعده في الـ [[PATH]] ويشغّله |
| [[node]] | البرنامج اللي هيشغّل الملف. الـ kernel بيدّيه مسار الملف كـ argument |

ولـ JavaScript نفسها السطر ده **تعليق** (اسمه في الـ spec [[HashbangComment]] من ES2023)، فـ [[node menu.mjs]] بيتجاهله.

### التشغيل

~~~bash
chmod +x menu.mjs
./menu.mjs
./menu.mjs tea
node menu.mjs COF
~~~

~~~text الناتج (Git Bash)
Kahwa Corner: 3 أصناف
Tea       15 EGP
Mint tea  20 EGP
Coffee    35 EGP
true false
Kahwa Corner: 3 أصناف
Tea       15 EGP
Mint tea  20 EGP
true false
Kahwa Corner: 3 أصناف
Coffee    35 EGP
true false
~~~

- [[chmod +x]]: صلاحية تنفيذ. بعدها [[ls -l]] بيقول [[-rwxr-xr-x]].
- [[./menu.mjs]]: [[./]] لازم عشان الفولدر الحالي مش في الـ [[PATH]].
- [[./menu.mjs tea]]: الفلتر في [[process.argv[2]]]، فـ «Tea» و «Mint tea» بس.

### على كل نظام

| النظام | [[./menu.mjs]] | الحل |
|---|---|---|
| لينكس والماك و WSL | بيشتغل بعد [[chmod +x]] | |
| Git Bash على ويندوز | بيشتغل (MSYS بيقرا الـ hashbang بنفسه) | |
| PowerShell و CMD | ويندوز مبيعرفش الـ hashbang، فبيفتح الملف بالبرنامج المربوط بالامتداد (من الـ docs، متجرّبش هنا عشان بيفتح برنامج تاني) | [[node menu.mjs]]، أو [[bin]] في [[package.json]] و [[npm link]] (npm بيعمل ملف [[.cmd]] بينادي node) |

### لو مش في أول سطر

جرّبنا ملف أوله سطر فاضي وبعده الـ hashbang:

~~~text الناتج: node late.mjs
late.mjs:2
#!/usr/bin/env node
^

SyntaxError: Invalid or unexpected token
~~~

---

## ٣. import attributes: [[with { type: "json" }]]

~~~js menu.mjs
import config from "./menu.json" with { type: "json" };
const { shop, currency, items } = config;
~~~

| الحتة | معناها |
|---|---|
| [[import config from "./menu.json"]] | استيراد عادي: الـ JSON كله بييجي [[default]]، فبنسميه [[config]] |
| [[with { ... }]] | الـ **import attributes**: معلومات زيادة للـ runtime عن الـ module ده |
| [[type: "json"]] | «الملف ده داتا JSON، مش كود». الـ runtime بيتأكد منها قبل ما يحمّل |

### من غيرها

~~~text الناتج: import config from "./config.json"; (من غير with)
TypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module "file:///…/config.json" needs an import attribute of "type: json"
~~~

### ليه الحكاية دي أصلًا؟

في المتصفح الـ module بييجي من URL. لو كتبت [[import data from "https://cdn.example/data.json"]] من غير attribute، والسيرفر ده اتخترق ورجّع **JavaScript** بـ [[Content-Type: text/javascript]]، المتصفح كان هينفّذه. مع [[type: "json"]] المتصفح بيقول «أنا مستني JSON» وبيرفض أي حاجة تانية. جرّبنا في Chrome 157 بسيرفر صغير:

~~~text Chrome 157: رسايل الـ Console
import("./config.json") من غير with:
  Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec.
import("./note.txt", { with: { type: "json" } }):
  Failed to load module script: Expected a JSON module script but the server responded with a MIME type of "text/plain". Strict MIME type checking is enforced for module scripts per HTML spec.
~~~

والـ [[import()]] نفسها في الحالتين رمت [[TypeError: Failed to fetch dynamically imported module]]. ومع [[with: { type: "json" }]] على ملف بيرجع [[application/json]] اشتغلت وجابت الداتا.

### الـ dynamic import والـ cache

~~~js menu.mjs
const again = await import("./menu.json", { with: { type: "json" } });
console.log(again.default === config, Object.isFrozen(config));
~~~

~~~text الناتج
true false
~~~

- [[import()]] بياخد الـ attributes في object تاني: [[{ with: { type: "json" } }]].
- [[again.default === config]]: **نفس** الـ object. الـ modules بتتحمّل مرة لكل URL وتتحفظ (التمرين التالت بيورّي ده لما الملف يتغيّر).
- [[Object.isFrozen(config)]] بـ [[false]]: تقدر تعدّل فيه، والتعديل هيبان عند أي حد استورده. متعدّلش.
- مفيش named exports: [[import { shop } from "./menu.json" with ...]] بيرمي [[does not provide an export named 'shop']]، فخد [[default]] وفكّه.

---

## الخلاصة

| الحاجة | اكتبها | خلي بالك |
|---|---|---|
| ملف يتشغّل لوحده | [[#!/usr/bin/env node]] أول سطر + [[chmod +x]] | LF مش CRLF، ومفيش حاجة قبله |
| أمر باسم من أي فولدر | [[bin]] في [[package.json]] | على ويندوز npm بيعمل [[.cmd]] |
| JSON ثابت | [[import x from "./x.json" with { type: "json" }]] | [[default]] بس، ومتشارك |
| JSON مساره متغير | [[await import(url, { with: { type: "json" } })]] | الـ cache بالـ URL |
| JSON بيتغيّر وانت شغال | [[JSON.parse(await readFile(path, "utf8"))]] | |
| كود قديم فيه [[assert]] | بدّلها بـ [[with]] | اتشالت في Node 22 |`,
          lines: [
            R`import attributes: [[with { type: "json" }]] بيقول لـ Node إن الملف داتا JSON، فبيعمل له [[JSON.parse]] ويدّيه [[default]] باسم [[config]].`,
            R`destructuring للـ ٣ حقول اللي هنستخدمهم من الـ config.`,
            R`أول argument بعد اسم الملف (الفلتر)، بحروف صغيرة. [[?.]] عشان لو مفيش argument يبقى [[undefined]] من غير error.`,
            R`سطر العنوان: اسم المحل وعدد الأصناف من الـ JSON.`,
            R`[[for...of]] بيلف على أصناف المنيو واحد واحد.`,
            R`لو فيه فلتر والاسم مفيهوش الكلمة دي، اتنط على الصنف ده ([[continue]]).`,
            R`كل صنف في سطر: الاسم بـ [[padEnd(9)]] عشان الأسعار تيجي تحت بعض، والسعر والعملة.`,
            R`قفلة الـ loop.`,
            R`نفس الملف بـ dynamic import: الـ attributes في object تاني [[{ with: { type: "json" } }]].`,
            R`[[again.default === config]] بـ [[true]]: نفس الـ module من الـ cache، و [[isFrozen]] بـ [[false]]: الداتا مش متجمّدة.`,
          ],
          ref: [
            { t: "MDN: Lexical grammar: hashbang comments", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#hashbang_comments" },
            { t: "MDN: Import attributes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with" },
            { t: "MDN: import()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import" },
            { t: "Node.js: Modules: import attributes", url: "https://nodejs.org/api/esm.html#import-attributes" },
            { t: "npm: package.json bin", url: "https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#bin" },
          ],
          pre: [{ to: "js/import و export", why: R`جملة [[import]] نفسها` }, { to: "js/dynamic import()", why: R`[[import()]] اللي بياخد الـ attributes في object تاني` }],
        },
        {
          cmd: "public class fields و static initialization blocks",
          title: "الـ class fields بتتحط إمتى بالظبط؟ والـ arrow field بتكلّف كام؟ و static { } بيتنفّذ إمتى؟",
          desc: R`**public class field** هو خاصية بتكتبها في جسم الكلاس بقيمتها الأولى ([[items = [];]] أو [[count = 0;]] أو [[name;]] من غير قيمة = [[undefined]]). كل instance بياخد نسخته، والـ initializer بيتنفّذ من جديد لكل [[new]]، و [[this]] جواه هو الـ instance. وبتتحط **قبل** جسم الـ constructor في الكلاس العادي، و **بعد** [[super()]] على طول في الـ subclass. والـ field بيتعرّف بـ define مش بـ set: لو الأب فيه setter بنفس الاسم، الـ field بيغطّي عليه ومبيناديهوش.

و **static field** ([[static base = "EGP"]]) خاصية على الكلاس نفسه مرة واحدة. و **static initialization block** [[static { ... }]] كود بيتنفّذ **مرة واحدة** وقت تعريف الكلاس، و [[this]] جواه هو الكلاس: تحسب فيه قيم static محتاجة loop أو [[try]]، وتوصل للـ private static ([[#rates]]). والـ static fields والـ blocks بيتنفّذوا بالترتيب اللي مكتوبين بيه.

والـ **arrow function field** ([[inc = () => ++this.n]]) [[this]] بتاعه متثبت على الـ instance فينفع يتبعت callback، بس نسخة جديدة لكل instance مش على الـ prototype.`,
          example: R`// public class fields: بتتحط على كل instance قبل جسم الـ constructor (أو بعد super)
const log = [];
class Base {
  name = (log.push("Base field"), "base");
  constructor() { log.push("Base constructor: kind = " + this.kind); }
}
class Cart extends Base {
  kind = (log.push("Cart field"), "cart");
  items = [];
  count = this.items.length;
  ["created" + "At"] = "2026-11-21";
  constructor() {
    log.push("Cart before super");
    super();
    log.push("Cart after super: kind = " + this.kind);
  }
}
const cart = new Cart();
console.log(log.join(" | "));
console.log(Object.keys(cart));
// arrow function field: this متثبت، بس نسخة لكل instance
class Counter {
  n = 0;
  inc = () => ++this.n;
  dec() { return --this.n; }
}
const { inc, dec } = new Counter();
console.log(inc(), inc());
try { dec(); } catch (e) { console.log(e.name + ": " + e.message); }
// static fields و static initialization block
class Currency {
  static #rates = new Map();
  static base = "EGP";
  static {
    for (const pair of "USD=48.5,EUR=52.1".split(",")) {
      const [code, rate] = pair.split("=");
      this.#rates.set(code, Number(rate));
    }
  }
  static toEGP(amount, code) { return amount * Currency.#rates.get(code); }
}
console.log(Currency.base, Currency.toEGP(10, "USD"));`,
          try: R`اعمل [[class FeatureFlags]] فيها [[static #flags]] (Map) و [[static loadedFrom]]، و [[static { }]] بيقرا JSON من متغير البيئة [[FLAGS]] (أو قيمة افتراضية [[{"darkMode": true, "newCheckout": false}]]) جوه [[try/catch]]، و [[static on(name)]] بترجّع [[true]] أو [[false]]. شغّله من غير [[FLAGS]]، وبـ [[FLAGS='{"darkMode": false}']]، وبـ [[FLAGS='oops']].`,
          sol: R`~~~js flags.mjs
class FeatureFlags {
  static #flags = new Map();
  static loadedFrom;
  static {
    try {
      const raw = JSON.parse(globalThis.process?.env.FLAGS ?? '{"darkMode": true, "newCheckout": false}');
      for (const [k, v] of Object.entries(raw)) this.#flags.set(k, v === true);
      this.loadedFrom = globalThis.process?.env.FLAGS ? "env" : "default";
    } catch (e) {
      this.loadedFrom = "error: " + e.message;
    }
  }
  static on(name) { return FeatureFlags.#flags.get(name) ?? false; }
}
console.log(FeatureFlags.loadedFrom, FeatureFlags.on("darkMode"), FeatureFlags.on("newCheckout"), FeatureFlags.on("nope"));
~~~

~~~text الناتج (Node 24.22، ٣ تشغيلات)
default true false false
env false false false
error: Unexpected token 'o', "oops" is not valid JSON false false false
~~~

- الـ block بيتنفّذ مرة واحدة وقت تحميل الملف، فـ [[JSON.parse]] مبيتعادش في كل [[on()]].
- الـ [[try/catch]] جوه الـ block: من غير static block كنت هتحتاج دالة برّه الكلاس أو تعقيد في initializer واحد. ولو الـ JSON بايظ الكلاس بيتحمّل برضه والـ flags كلها [[false]] (آمن).
- [[this]] جوه الـ block هو [[FeatureFlags]]، فـ [[this.#flags]] شغالة.
- [[v === true]]: أي قيمة غير [[true]] بالظبط (نص [["yes"]] مثلًا) بتبقى [[false]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[class A]] فيها field بيطبع [["A field"]] و constructor بيطبع [["A constructor"]]. و [[class B extends A]] فيها field بيطبع [["B field"]] ومحتاج [[this.x]]، و constructor بيطبع قبل وبعد [[super()]]. رتّب الـ ٥ سطور قبل ما تشغّل [[new B()]].`, done: R`رتّبتهم [[B before super]] ثم [[A field]] ثم [[A constructor]] ثم [[B field]] ثم [[B after super]]، وطلع كده.`, sol: R`~~~js p1.mjs
class A {
  x = (console.log("A field"), 1);
  constructor() { console.log("A constructor, x =", this.x); }
}
class B extends A {
  y = (console.log("B field"), this.x + 1);
  constructor() { console.log("B before super"); super(); console.log("B after super, y =", this.y); }
}
new B();
~~~

~~~text الناتج (Node 24.22)
B before super
A field
A constructor, x = 1
B field
B after super, y = 2
~~~

- الـ constructor بتاع [[B]] بيبدأ الأول، بس مفيش [[this]] لحد [[super()]].
- [[super()]] بيعمل الـ object، وفي الكلاس الأساسي [[A]] الـ fields بتتحط **قبل** جسم الـ constructor.
- بعد ما [[super()]] يرجع، fields [[B]] بتتحط **على طول**، فـ [[this.x]] موجود (1) و [[y]] بقى 2.
- [[(console.log(...), 1)]]: الـ comma operator بينفّذ الاتنين ويرجّع آخر واحد، عشان نشوف إمتى الـ initializer اشتغل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[class Timer]] فيها [[seconds = 0]] و method [[tickMethod()]]، وحد بيعمل [[setInterval(timer.tickMethod, 1000)]] (أو أي callback). ابعت الـ method لوحدها لدالة بتناديها، وشوف الـ error، وصلّحه بطريقتين.`, done: R`شفت [[TypeError: Cannot read properties of undefined (reading 'seconds')]]، وصلّحته مرة بـ arrow field ومرة بـ [[bind]]، والاتنين زوّدوا العدّاد.`, sol: R`~~~js p2.mjs
class Timer {
  seconds = 0;
  tickMethod() { this.seconds++; return this.seconds; }
  tickArrow = () => { this.seconds++; return this.seconds; };
}
const t = new Timer();
const run = (fn) => { try { return fn(); } catch (e) { return e.name + ": " + e.message; } };
console.log(run(t.tickMethod), run(t.tickArrow), run(t.tickMethod.bind(t)), t.seconds);
~~~

~~~text الناتج (Node 24.22)
TypeError: Cannot read properties of undefined (reading 'seconds') 1 2 2
~~~

- [[run(t.tickMethod)]]: الـ method اتبعتت **من غير** الـ object، فلما [[run]] نادتها [[fn()]]، [[this]] بقى [[undefined]] (الكلاسات strict).
- [[tickArrow]]: الـ arrow اتعملت جوه الـ field initializer، و [[this]] هناك هو الـ instance، والـ arrow بتفتكره للأبد.
- [[bind(t)]]: بيعمل دالة جديدة [[this]] بتاعها [[t]] دايمًا.
- الاختيار: arrow field لو الـ method هتتبعت callback كتير (handlers في React أو [[addEventListener]])، و [[bind]] لو مرة واحدة. والتمرين الجاي بيقيس التمن.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[class Base]] فيها setter [[price]] بيرفض السالب ويحط القيمة في [[#price]]. [[class WithField extends Base { price = -5; }]] و [[class WithCtor extends Base]] بتحط [[this.price = 10]] في الـ constructor. اعمل instance من كل واحدة، واطبع [[price]] و [[Object.hasOwn(x, "price")]]، وجرّب تحط [[-100]] في الاتنين.`, done: R`عرفت إن الـ field عمل خاصية عادية على الـ instance **غطّت** الـ setter ([[-5]] و [[-100]] اتقبلوا من غير فحص)، وإن الـ constructor نادى الـ setter ورفض السالب بـ [[RangeError]].`, sol: R`~~~js p4.mjs
class Base {
  #price = 0;
  set price(v) { if (v < 0) throw new RangeError("السعر سالب"); this.#price = v; }
  get price() { return this.#price; }
}
class WithField extends Base { price = -5; }
class WithCtor extends Base { constructor() { super(); this.price = 10; } }
const wf = new WithField();
console.log(wf.price, Object.hasOwn(wf, "price"));
wf.price = -100;
console.log(wf.price);
const wc = new WithCtor();
console.log(wc.price, Object.hasOwn(wc, "price"));
try { wc.price = -1; } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج (Node 24.22)
-5 true
-100
10 false
RangeError: السعر سالب
~~~

- الـ field بيستخدم **[[DefineOwnProperty]]** (زي [[Object.defineProperty]]): بيعمل خاصية جديدة على الـ instance نفسه، من غير ما يسأل الـ prototype. فالـ setter اللي على [[Base.prototype]] اتغطّى خالص، وأي كتابة بعد كده بتروح للخاصية العادية.
- الـ constructor بيعمل **[[Set]]** عادي ([[this.price = 10]])، فبيطلع للـ prototype ويلاقي الـ setter وينادي الفحص.
- ده كان اختيار مقصود في الـ spec، ومختلف عن TypeScript القديم (قبل [[useDefineForClassFields]]) اللي كان بيعمل set. لو هتورّث من كلاس فيه accessors، حط القيمة في الـ constructor مش field.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[class M { n = 0; inc() { this.n++; } }]] و [[class F { n = 0; inc = () => { this.n++; }; }]]. اعمل ١٠٠ ألف instance من كل واحد وقيس الذاكرة بـ [[process.memoryUsage().heapUsed]] قبل وبعد (شغّل بـ [[node --expose-gc]] وادعي [[gc()]] قبل كل قياس). وشغّل مرتين.`, done: R`الـ methods حوالي 3.8 MB والـ arrow fields حوالي 13.7 MB (الأرقام عندك قريبة)، يعني حوالي ١٠٠ بايت زيادة لكل instance، وعرفت تختار امتى التمن ده يستاهل.`, sol: R`~~~js p5.mjs
class M { n = 0; inc() { this.n++; } }
class F { n = 0; inc = () => { this.n++; }; }
const measure = (C) => {
  globalThis.gc();
  const before = process.memoryUsage().heapUsed;
  const keep = Array.from({ length: 100000 }, () => new C());
  globalThis.gc();
  const mb = (process.memoryUsage().heapUsed - before) / 1024 / 1024;
  return [keep.length, mb.toFixed(1) + " MB"];
};
console.log("method:", measure(M), "arrow field:", measure(F));
~~~

~~~text الناتج (Node 24.22، node --expose-gc، نفس الرقم في التشغيلتين)
method: [ 100000, '3.8 MB' ] arrow field: [ 100000, '13.7 MB' ]
~~~

- مع [[M]]: كل instance فيه [[n]] بس، و [[inc]] واحدة على [[M.prototype]] متشاركة.
- مع [[F]]: كل instance فيه [[n]] و **دالة جديدة** (closure فيها [[this]])، فالفرق حوالي 10 MB لـ ١٠٠ ألف، يعني ~100 بايت لكل واحد.
- [[keep]] لازم يفضل موجود لحد القياس التاني، وإلا الـ GC هيمسح الـ objects ونقيس صفر.
- الخلاصة: لـ component فيه كام instance (زرار، فورم) الفرق ولا حاجة والراحة تستاهل. لـ ١٠٠ ألف record في الذاكرة (صفوف جدول، نقاط في رسم) خليها methods.` },
          ],
          flag: "script",
          deep: {
            why: R`الـ fields خلّت شكل الكلاس يتقري من فوق: كل الخصايص وقيمها الأولى في مكان واحد بدل ما تبقى مستخبية في الـ constructor. والـ arrow fields بقت الطريقة المعتادة للـ event handlers. والـ static blocks بتحل مشكلة «قيم static محتاجة حساب أو [[try]]» من غير كود برّه الكلاس. ولازم تعرف الترتيب بالظبط، لأن باجات زي «[[this.kind]] بـ [[undefined]] في الـ constructor بتاع الأب» و «الـ setter مش بيتنادى» محيّرة جدًا لو مش عارف.`,
            how: R`لما تكتب [[new Cart()]]: الـ constructor بتاع [[Cart]] بيبدأ، و [[this]] مش موجود. [[super()]] بينادي [[Base]]: الـ object بيتعمل، وبعدين fields [[Base]] بتتحط بالترتيب (كل initializer بيتنفّذ دلوقتي و [[this]] = الـ object)، وبعدين جسم constructor [[Base]] (وهنا [[this.kind]] لسه [[undefined]] لأن fields [[Cart]] مجتش). [[super()]] يرجع، وfields [[Cart]] تتحط، وبعدين باقي constructor [[Cart]].

الـ field بيتحط بـ DefineOwnProperty: خاصية data عادية ([[writable]] و [[enumerable]] و [[configurable]] كلهم [[true]]) على الـ instance، مش [[Set]]، فمفيش setter بيتنادى ومفيش proxy trap [[set]]. والاسم ممكن يتحسب ([[["created" + "At"]]]) مرة واحدة وقت تعريف الكلاس.

الـ static fields والـ static blocks بيتنفّذوا بالترتيب وقت تقييم الـ class definition، و [[this]] = الكلاس. الـ block ليه scope خاص (المتغيرات جواه مش بتطلع)، ومينفعش فيه [[await]] ولا [[return]] ولا [[arguments]]. والـ static fields مش بتتنسخ للـ subclass: [[Special.count]] بيقرا من [[Order]] بالـ prototype chain، ولو كتبت [[Special.count = 50]] بتعمل خاصية جديدة على [[Special]] و [[Order.count]] مبيتغيّرش (جرّبناها: [[1 50]]).`,
            when: R`fields لأي state بيبدأ بقيمة ثابتة أو محسوبة من الـ instance ([[items = []]]). وقيمة جاية من الـ constructor: اكتب الـ field من غير قيمة ([[amount;]]) عشان الشكل يبان، وحطها في الـ constructor. arrow fields للدوال اللي هتتبعت callbacks. static fields للثوابت والعدادات على مستوى الكلاس، و static blocks لما التهيئة محتاجة loop أو [[try]] أو private static من برّه. ومتستخدمش field على اسم الأب عامل له accessor.`,
            mistakes: R`تقرا field بتاع الـ subclass من constructor الأب (لسه [[undefined]]). وتستخدم [[this]] قبل [[super()]] ([[ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor]]). و field بيغطّي setter الأب. و arrow field في كلاس بيتعمل منه آلاف الـ instances. وتفتكر الـ initializer بيتنفّذ مرة (لأ، لكل instance: [[items = []]] array جديدة لكل واحد، وده الصح). وتحط [[await]] في static block.`
          },
          teach: R`## الفكرة في سطر

الـ fields خصايص بتتكتب في جسم الكلاس، والمهم **إمتى** بتتحط و**إزاي**. المثال ٣ أجزاء: الترتيب، والـ arrow field، والـ static. كل الناتج اتشغّل فعلًا على Node 24.22.

---

## ١. public class fields وترتيب التهيئة

~~~js app.mjs
const log = [];
class Base {
  name = (log.push("Base field"), "base");
  constructor() { log.push("Base constructor: kind = " + this.kind); }
}
~~~

| الحتة | معناها |
|---|---|
| [[name = ...;]] | **public class field**: خاصية [[name]] على كل instance، وقيمتها من الـ initializer |
| [[(log.push(...), "base")]] | comma operator: ينفّذ الـ [[push]] (عشان نشوف إمتى) ويرجّع [["base"]] |
| [[this.kind]] في constructor الأب | هنشوف قيمتها إيه وقت ما الأب شغال |

~~~js app.mjs
class Cart extends Base {
  kind = (log.push("Cart field"), "cart");
  items = [];
  count = this.items.length;
  ["created" + "At"] = "2026-11-21";
  constructor() {
    log.push("Cart before super");
    super();
    log.push("Cart after super: kind = " + this.kind);
  }
}
const cart = new Cart();
console.log(log.join(" | "));
console.log(Object.keys(cart));
~~~

- [[count = this.items.length]]: الـ initializer يقدر يستخدم [[this]] وأي field **قبله**.
- [[["created" + "At"]]]: اسم محسوب، بيتحسب مرة واحدة وقت تعريف الكلاس.

~~~text الناتج
Cart before super | Base field | Base constructor: kind = undefined | Cart field | Cart after super: kind = cart
[ 'name', 'kind', 'items', 'count', 'createdAt' ]
~~~

| الخطوة | اللي حصل |
|---|---|
| ١ | constructor [[Cart]] بدأ، ولسه مفيش [[this]] |
| ٢ | [[super()]]: الـ object اتعمل، و fields [[Base]] اتحطت (**قبل** جسم constructor [[Base]]) |
| ٣ | جسم constructor [[Base]]: [[this.kind]] لسه [[undefined]] لأن fields [[Cart]] مجتش |
| ٤ | [[super()]] رجع: fields [[Cart]] اتحطت **على طول** بالترتيب |
| ٥ | باقي constructor [[Cart]]: [[this.kind]] بقى [[cart]] |

والـ fields كلها خصايص عادية enumerable، فـ [[Object.keys]] شافهم بالترتيب.

### define مش set

الـ field بيتحط كأنه [[Object.defineProperty]]: خاصية جديدة على الـ instance **من غير ما يسأل** الـ prototype. فلو الأب فيه setter بنفس الاسم، الـ setter **مش بيتنادى**:

~~~js app.mjs
class Model {
  set price(v) { console.log("setter ran with", v); this._p = v; }
  get price() { return this._p; }
}
class Product extends Model { price = 100; }
const p = new Product();
console.log(Object.getOwnPropertyDescriptor(p, "price"), p._p);
~~~

~~~text الناتج
{ value: 100, writable: true, enumerable: true, configurable: true } undefined
~~~

مفيش [["setter ran with"]] خالص، و [[_p]] بـ [[undefined]]. ولو كتبت [[this.price = 100]] في الـ constructor بدل الـ field، الـ setter بيتنادى (جرّبناها وطبع [[setter ran with 100]]).

---

## ٢. arrow function field

~~~js app.mjs
class Counter {
  n = 0;
  inc = () => ++this.n;
  dec() { return --this.n; }
}
const { inc, dec } = new Counter();
console.log(inc(), inc());
try { dec(); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
1 2
TypeError: Cannot read properties of undefined (reading 'n')
~~~

- [[inc = () => ...]]: field قيمته arrow function، اتعملت جوه الـ initializer و [[this]] هناك = الـ instance، والـ arrow بتفتكر [[this]] بتاع المكان اللي اتعملت فيه. فـ [[inc]] لوحدها شغالة.
- [[dec()]]: method عادية على الـ prototype، و [[this]] بيتحدد وقت النداء. نادينا [[dec()]] لوحدها فـ [[this]] بـ [[undefined]].

| | method | arrow field |
|---|---|---|
| مكانها | [[Counter.prototype]]: نسخة واحدة | على كل instance: نسخة لكل واحد |
| [[this]] لو اتبعتت لوحدها | [[undefined]] | الـ instance دايمًا |
| الذاكرة لـ ١٠٠ ألف instance | 3.8 MB في تجربتنا | 13.7 MB |
| subclass يعمل override بـ [[super.inc()]] | ينفع | مينفعش (مش على الـ prototype) |

---

## ٣. static fields و static initialization blocks

~~~js app.mjs
class Currency {
  static #rates = new Map();
  static base = "EGP";
  static {
    for (const pair of "USD=48.5,EUR=52.1".split(",")) {
      const [code, rate] = pair.split("=");
      this.#rates.set(code, Number(rate));
    }
  }
  static toEGP(amount, code) { return amount * Currency.#rates.get(code); }
}
console.log(Currency.base, Currency.toEGP(10, "USD"));
~~~

~~~text الناتج
EGP 485
~~~

| الحتة | معناها |
|---|---|
| [[static #rates]] | private static field: على الكلاس نفسه ومحدش برّه يوصله |
| [[static base]] | public static field: [[Currency.base]] |
| [[static { ... }]] | **static initialization block**: بيتنفّذ مرة واحدة وقت تعريف الكلاس، و [[this]] = [[Currency]] |
| [[pair]] و [[code]] و [[rate]] | متغيرات محلية جوه الـ block، مش بتبقى خصايص على الكلاس |

### الترتيب

الـ static fields والـ blocks بيتنفّذوا من فوق لتحت بالظبط:

~~~js order.mjs
class Order {
  static count = 0;
  static { console.log("block 1, count =", this.count); }
  static next = ++Order.count;
  static { console.log("block 2, count =", this.count, "next =", this.next); }
}
~~~

~~~text الناتج
block 1, count = 0
block 2, count = 1 next = 1
~~~

والـ subclass مبياخدش **نسخة** من الـ static field: [[class Special extends Order {}]] و [[Special.count]] بـ 1 (بيقراها من [[Order]] بالـ prototype chain)، و [[Object.hasOwn(Special, "count")]] بـ [[false]]. ولما كتبنا [[Special.count = 50]]: [[Order.count]] فضل 1 و [[Special.count]] بقى 50.

---

## الخلاصة

| عايز | اكتب | خلي بالك |
|---|---|---|
| خاصية بقيمة أولى لكل instance | [[items = [];]] | بتتحط قبل الـ constructor، أو بعد [[super()]] |
| خاصية قيمتها من الـ constructor | [[amount;]] وبعدين [[this.amount = x]] | الشكل يبان من فوق |
| دالة تتبعت callback | [[handle = () => {...}]] | نسخة لكل instance |
| قيمة على الكلاس | [[static base = "EGP";]] | الـ subclass بيقراها بالـ prototype chain |
| تهيئة static فيها loop أو [[try]] | [[static { ... }]] | مرة واحدة، ومن غير [[await]] |
| الأب عنده setter بنفس الاسم | حط القيمة في الـ constructor | الـ field بيغطّي الـ setter |`,
          lines: [
            R`array نسجّل فيها كل خطوة عشان نشوف ترتيب التهيئة بالظبط.`,
            R`الكلاس الأساسي (الأب) اللي [[Cart]] هيورث منه.`,
            R`public class field: الـ initializer بيسجّل [["Base field"]] وبيرجّع [["base"]] قيمة لـ [[name]] (comma operator).`,
            R`constructor الأب بيسجّل قيمة [[this.kind]] وقت ما هو شغال، وده field في الـ subclass.`,
            R`قفلة [[Base]].`,
            R`subclass من [[Base]]: الـ fields بتاعتها مش هتتحط غير بعد [[super()]].`,
            R`field بيسجّل [["Cart field"]] وقيمته [["cart"]].`,
            R`field قيمته array جديدة لكل instance.`,
            R`field بيستخدم [[this]] وfield قبله: [[this.items.length]] = 0.`,
            R`اسم field محسوب بين [[[ ]]]: بيتحسب مرة وقت تعريف الكلاس ويبقى [[createdAt]].`,
            R`constructor الـ subclass، وفيه ٣ سطور تسجيل حوالين [[super()]].`,
            R`أول حاجة بتتنفّذ: لسه مفيش [[this]] ولا fields.`,
            R`[[super()]]: بيعمل الـ object، ويحط fields [[Base]]، وينفّذ constructor [[Base]]، وبعد ما يرجع تتحط fields [[Cart]] على طول.`,
            R`بعد [[super()]] والـ fields بتاعة [[Cart]] اتحطت: [[this.kind]] بقى [[cart]] خلاص.`,
            R`قفلة الـ constructor.`,
            R`قفلة [[Cart]].`,
            R`[[new Cart()]] بيشغّل كل خطوات التهيئة اللي فوق بالترتيب وبيسجّلها في [[log]].`,
            R`الترتيب: [[Cart before super]] ثم [[Base field]] ثم [[Base constructor: kind = undefined]] ثم [[Cart field]] ثم [[Cart after super: kind = cart]].`,
            R`الـ fields كلها خصايص عادية على الـ instance: [[name]] و [[kind]] و [[items]] و [[count]] و [[createdAt]].`,
            R`كلاس فيه arrow field و method عشان نقارن.`,
            R`field عادي قيمته 0.`,
            R`arrow function field: [[this]] جواها متثبت على الـ instance لأنها اتعملت جوه الـ initializer.`,
            R`method عادية على الـ prototype: [[this]] بيتحدد وقت النداء.`,
            R`قفلة الكلاس.`,
            R`destructuring: بناخد الدالتين لوحدهم من غير الـ object.`,
            R`[[inc()]] لوحدها اشتغلت مرتين: [[1 2]].`,
            R`[[dec()]] لوحدها: [[this]] بـ [[undefined]] فرمت [[TypeError: Cannot read properties of undefined (reading 'n')]].`,
            R`كلاس فيه static fields و static block.`,
            R`private static field: Map الأسعار، محدش برّه الكلاس يوصلها.`,
            R`public static field: [[Currency.base]] بـ [["EGP"]] على الكلاس نفسه.`,
            R`static initialization block: بيتنفّذ مرة واحدة وقت تعريف الكلاس، و [[this]] جواه = [[Currency]].`,
            R`loop على أزواج [[كود=سعر]]: حاجة مينفعش تتكتب في static field initializer واحد بسهولة.`,
            R`متغيرات محلية جوه الـ block، مش بتبقى خصايص على الكلاس.`,
            R`[[this.#rates]]: الـ block جوه الكلاس فيقدر يوصل للـ private static.`,
            R`قفلة الـ loop.`,
            R`قفلة الـ static block.`,
            R`static method بتستخدم الأسعار: [[amount * rate]].`,
            R`قفلة الكلاس.`,
            R`[[EGP]] و [[485]] (١٠ × 48.5): الـ block اشتغل مرة واحدة قبل أي نداء.`,
          ],
          ref: [
            { t: "MDN: Public class fields", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields" },
            { t: "MDN: Static initialization blocks", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks" },
            { t: "MDN: static", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static" },
            { t: "ECMAScript: DefineField", url: "https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-definefield" },
          ],
          pre: ["js/class", { to: "js/extends و super", why: R`[[super()]] وليه [[this]] مش موجود قبله` }, { to: "js/this", why: R`[[this]] في الـ arrow ضد الـ method` }],
        },
        {
          cmd: "Error من جوه: toString و cause و AggregateError و EvalError و captureStackTrace",
          title: "الـ Error بيتطبع إزاي، وسلسلة الأسباب بـ cause، و AggregateError.errors، و EvalError بيترمي إمتى، و stack أنضف",
          desc: R`أي error بيتطبع بـ [[Error.prototype.toString()]]: [[name + ": " + message]] (ولو واحد فيهم فاضي بيتشال هو والـ [[: ]]). عشان كده الـ subclass من غير [[name]] بيطبع [[Error: ...]].

و **cause** ([[new Error(msg, { cause })]]) بيحفظ الـ error الأصلي جوه الجديد، فتقدر تلف الأخطاء ("مش قادر أحمّل المنيو" ← "fetch failed" ← "ECONNRESET") من غير ما تضيع السبب. والخاصية [[cause]] بتتعمل **بس** لو بعت [[cause]] في الـ options.

و **AggregateError** error واحد شايل كذا error في [[errors]] (array): [[Promise.any]] بيرميه لما كله يفشل، وانت تستخدمه لما تجمع كل غلطات الفورم أو الـ config مرة واحدة.

و **EvalError** موجود عشان التوافق: محدش في اللغة بيرميه النهارده **إلا** الـ host لما توليد كود من نص ([[eval]] و [[new Function]]) يبقى ممنوع: صفحة عليها CSP من غير [['unsafe-eval']]، أو [[node --disallow-code-generation-from-strings]].

و **Error.captureStackTrace(obj, fn)** مش standard (V8، يعني Node و Chrome، وفيه اقتراح في TC39): بيحط [[stack]] على أي object، ولو بعت [[fn]] بيشيل الـ frames من [[fn]] وفوق، فالـ stack يبدأ من الكود اللي نادى الـ helper.`,
          example: R`// Error.prototype.toString: name + ": " + message
const e = new RangeError("qty must be 1..99");
console.log(String(e), String(new Error()), Error.prototype.toString.call({ name: "PayError", message: "declined" }));
class PayError extends Error {}
class CardError extends Error { name = "CardError"; }
console.log(String(new PayError("declined")), String(new CardError("expired")));
// cause: السبب الأصلي جوه الـ error الجديد
const root = new TypeError("fetch failed");
const wrapped = new Error("loading menu failed", { cause: root });
console.log(wrapped.cause === root, "cause" in wrapped, "cause" in new Error("x"));
// AggregateError: كذا error في واحد، في errors
const agg = new AggregateError([new Error("a"), new TypeError("b")], "2 checks failed");
console.log(String(agg), agg.errors.map(String));
try { await Promise.any([Promise.reject(new Error("mirror 1")), Promise.reject(new Error("mirror 2"))]); }
catch (err) { console.log(err.constructor.name, err.message, err.errors.map((x) => x.message)); }
// EvalError: موجود عشان التوافق، وبيترمي لما توليد كود من نص ممنوع
console.log(new EvalError("x") instanceof Error, Object.getPrototypeOf(EvalError) === Error);
// Error.captureStackTrace (V8 بس): يشيل الـ helper من الـ stack
function failClean(msg) {
  const err = new Error(msg);
  Error.captureStackTrace(err, failClean);
  return err;
}
function checkout() { return failClean("no stock"); }
console.log(checkout().stack.split("\n")[1].trim().split(" (")[0]);`,
          try: R`اكتب [[fullMessage(err)]] بترجّع كل الرسايل في سلسلة الـ [[cause]] بـ [[" ← "]] بينهم، وتتعامل مع: cause مش Error (نص زي [["timeout"]])، و error من غير cause، و error سببه نفسه (loop). حلها في المربع اللي تحت ودوس «شغّل واختبر».`,
          sol: R`~~~js full-message.mjs
function fullMessage(err) {
  const parts = [];
  const seen = new Set();
  for (let cur = err; cur !== undefined && !seen.has(cur); cur = cur?.cause) {
    seen.add(cur);
    parts.push(cur instanceof Error ? cur.message : String(cur));
    if (!(cur instanceof Error) || !("cause" in cur)) break;
  }
  return parts.join(" ← ");
}
const low = new Error("ECONNRESET");
const mid = new Error("fetch /api/menu failed", { cause: low });
const top = new Error("المنيو مش متاح", { cause: mid });
console.log(fullMessage(top));
console.log(fullMessage(new Error("x", { cause: "timeout" })));
const loop = new Error("a"); loop.cause = loop;
console.log(fullMessage(loop));
~~~

~~~text الناتج (Node 24.22)
المنيو مش متاح ← fetch /api/menu failed ← ECONNRESET
x ← timeout
a
~~~

- [[seen]]: Set بالـ errors اللي عدّينا عليها. من غيره [[loop.cause = loop]] كان هيلف للأبد.
- [[cur instanceof Error ? cur.message : String(cur)]]: الـ [[cause]] ممكن يبقى أي قيمة (نص، رقم، object)، مش لازم Error.
- [[!("cause" in cur)]]: نقف لما مفيش cause **خالص**. لاحظ إن [[new Error("x", { cause: undefined })]] بيعمل خاصية [[cause]] قيمتها [[undefined]] (جرّبناها: [["cause" in e]] بـ [[true]])، والـ loop هيقف عند [[cur !== undefined]].`,
          check: {
            lang: "js",
            starter: R`function fullMessage(err) {
  // الرسايل كلها بـ " ← " بينهم
}`,
            tests: R`test("سلسلة من ٣", () => { const a = new Error("c"); const b = new Error("b", { cause: a }); expect(fullMessage(new Error("a", { cause: b }))).toBe("a ← b ← c"); });
test("من غير cause", () => expect(fullMessage(new Error("وحيد"))).toBe("وحيد"));
test("cause نص", () => expect(fullMessage(new Error("x", { cause: "timeout" }))).toBe("x ← timeout"));
test("error سببه نفسه", () => { const e = new Error("a"); e.cause = e; expect(fullMessage(e)).toBe("a"); });
test("TypeError في النص", () => expect(fullMessage(new Error("load", { cause: new TypeError("bad") }))).toBe("load ← bad"));`,
            solution: R`function fullMessage(err) {
  const parts = [], seen = new Set();
  for (let cur = err; cur !== undefined && !seen.has(cur); cur = cur?.cause) {
    seen.add(cur);
    parts.push(cur instanceof Error ? cur.message : String(cur));
    if (!(cur instanceof Error) || !("cause" in cur)) break;
  }
  return parts.join(" ← ");
}`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيتطبع لـ [[String(new TypeError("bad qty"))]] و [[String(new Error(""))]] و error رسالته [["x"]] بس [[name]] بتاعه [[""]]، و [[Error.prototype.toString.call({ name: "Fake", message: "not an Error" })]]، و [[String({ name: "Fake", message: "..." })]]؟`, done: R`كتبت [[TypeError: bad qty]] و [[Error]] و [[x]] و [[Fake: not an Error]] و [[[object Object]]] وطلعوا كده.`, sol: R`~~~js p1.mjs
const e1 = new TypeError("bad qty");
const e2 = new Error("");
const e3 = new Error("x"); e3.name = "";
const e4 = { name: "Fake", message: "not an Error" };
console.log(String(e1) + " | " + String(e2) + " | " + String(e3) + " | " + Error.prototype.toString.call(e4) + " | " + String(e4));
~~~

~~~text الناتج (Node 24.22)
TypeError: bad qty | Error | x | Fake: not an Error | [object Object]
~~~

قاعدة [[Error.prototype.toString]]: لو [[name]] فاضي يرجّع [[message]] بس، ولو [[message]] فاضي يرجّع [[name]] بس، وإلا الاتنين بـ [[: ]] بينهم. وبتشتغل على أي object فيه [[name]] و [[message]] (بـ [[.call]])، أما [[String]] على object عادي فبيستخدم [[Object.prototype.toString]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[validateOrder(o)]] بتفحص الاسم (مش فاضي) والموبايل ([[^01[0125]\d{8}$]]) والكمية (من 1 لـ 20)، وبتجمع **كل** الغلطات وترميهم مرة واحدة في [[AggregateError]]، كل غلطة نوعها مناسب ([[TypeError]] أو [[RangeError]]). واطبع كل غلطة في سطر.`, done: R`order فيه ٣ غلطات بيطبع [[AggregateError: 3 حقول غلط]] وتحتها ٣ سطور بأنواعهم، والـ order السليم بيرجّع [[true]].`, sol: R`~~~js p3.mjs
function validateOrder(o) {
  const errors = [];
  if (!o.name?.trim()) errors.push(new TypeError("الاسم ناقص"));
  if (!/^01[0125]\d{8}$/.test(o.phone ?? "")) errors.push(new RangeError("رقم الموبايل غلط"));
  if (!(o.qty >= 1 && o.qty <= 20)) errors.push(new RangeError("الكمية من 1 لـ 20"));
  if (errors.length) throw new AggregateError(errors, $__bt$__{errors.length} حقول غلط$__bt);
  return true;
}
try { validateOrder({ name: " ", phone: "0123", qty: 50 }); }
catch (e) { console.log(String(e)); for (const x of e.errors) console.log(" -", x.name, x.message); }
console.log(validateOrder({ name: "Sara", phone: "01012345678", qty: 2 }));
~~~

~~~text الناتج (Node 24.22)
AggregateError: 3 حقول غلط
 - TypeError الاسم ناقص
 - RangeError رقم الموبايل غلط
 - RangeError الكمية من 1 لـ 20
true
~~~

- [[new AggregateError(errors, message)]]: الـ array **أول** argument والرسالة تاني (عكس [[Error]]).
- [[e.errors]] array عادية تلف عليها. والـ UI يقدر يحط كل رسالة تحت الحقل بتاعها لو زوّدت [[field]] لكل error.
- [[!(o.qty >= 1 && o.qty <= 20)]] بدل [[o.qty < 1 || o.qty > 20]]: عشان [[NaN]] و [[undefined]] يتمسكوا (أي مقارنة معاهم [[false]]).` },
            { lvl: 'تحدي', t: R`**ابني:** [[assertPositive(n, label)]] بترمي [[RangeError]] لو الرقم مش موجب، و [[addToCart(qty)]] بتناديها. خلّي أول سطر في الـ stack يبقى [[addToCart]] مش [[assertPositive]] بـ [[Error.captureStackTrace]]، ومن غير ما الكود يقع في runtime مفيهوش الدالة دي.`, done: R`السطر التاني في الـ stack (أول frame) بقى [[at addToCart (...)]]، والكود فيه [[?.()]] عشان لو [[captureStackTrace]] مش موجودة.`, sol: R`~~~js p4.mjs
function assertPositive(n, label) {
  if (n > 0) return;
  const err = new RangeError($__bt$__{label} لازم موجب، جالي $__{n}$__bt);
  Error.captureStackTrace?.(err, assertPositive);
  throw err;
}
function addToCart(qty) { assertPositive(qty, "qty"); }
try { addToCart(0); } catch (e) { console.log(e.stack.split("\n").slice(0, 2).map((l) => l.replace(/\(.*[\\/]/, "(")).join("\n")); }
~~~

~~~text الناتج (Node 24.22)
RangeError: qty لازم موجب، جالي 0
    at addToCart (p4.mjs:7:27)
~~~

- [[Error.captureStackTrace(err, assertPositive)]]: بيكتب [[err.stack]] من جديد، ومن غير أي frame من [[assertPositive]] وفوق. فاللي بيقرا الـ stack بيروح على طول للسطر اللي بعت الرقم الغلط.
- [[?.()]]: optional call: لو الدالة مش موجودة (Firefox القديم، أو Safari) السطر ميعملش حاجة والـ stack العادي يفضل.
- الـ [[replace]] بيشيل المسار الطويل من الـ stack عشان الناتج يتقري.
- ده اللي [[assert]] في Node و الـ test runners بيعملوه عشان الـ error يشاور على الاختبار مش على مكتبة الـ assert.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** زميلك شاف [[EvalError]] في لستة أنواع الأخطاء وسألك «إمتى بيترمي؟». جرّب [[eval("1+1")]] و [[new Function("return 1")]] في ملف عادي، وبعدين بـ [[node --disallow-code-generation-from-strings]]، واكتب له ٣ سطور.`, done: R`من غير الـ flag مفيش error، ومعاه الاتنين رموا [[EvalError: Code generation from strings disallowed for this context]] و [[instanceof EvalError]] بـ [[true]]، والسطور فيها إن اللغة نفسها مبترميهوش والـ host هو اللي بيرميه، ومثال الـ CSP في المتصفح.`, sol: R`~~~js ev.mjs
try { eval("1+1"); } catch (e) { console.log(e.name + ": " + e.message, e instanceof EvalError); }
try { new Function("return 1"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~bash
node ev.mjs
node --disallow-code-generation-from-strings ev.mjs
~~~

~~~text الناتج (Node 24.22)
EvalError: Code generation from strings disallowed for this context true
EvalError: Code generation from strings disallowed for this context
~~~

(التشغيل الأول مطبعش حاجة: [[eval("1+1")]] اشتغل عادي ومفيش [[console.log]] لناتجه.)

**الـ ٣ سطور:**
1. [[EvalError]] نوع error قديم، ومحدش في JavaScript نفسها بيرميه النهارده؛ موجود عشان الكود القديم اللي بيعمل [[instanceof EvalError]] ميبوظش.
2. اللي بيرميه هو **الـ host** لما توليد كود من نص ممنوع: Node بـ [[--disallow-code-generation-from-strings]]، والمتصفح لما الصفحة عليها CSP من غير [['unsafe-eval']] (جرّبناها في Chrome 157 بـ [[script-src 'self']] والرسالة: [[EvalError: Evaluating a string as JavaScript violates the following Content Security Policy directive because 'unsafe-eval' is not an allowed source of script]]).
3. يعني لو شفته في production: فيه كود (غالبًا مكتبة قديمة أو template engine) بيعمل [[eval]] أو [[new Function]]، والـ CSP صح إنه منعه.` },
          ],
          flag: "script",
          deep: {
            why: R`أغلب وقت الـ debugging بيروح في رسايل أخطاء ناقصة: «Something went wrong» من غير السبب، أو «Error: failed» من غير نوع، أو أول غلطة في الفورم بس. الـ [[name]] الصح و [[cause]] و [[AggregateError]] بيحلوا التلاتة. والـ logging services (Sentry و Datadog) بتعرض الـ [[cause]] كسلسلة، و Node نفسه بيطبعها لو الـ error وصل لفوق من غير catch.`,
            how: R`[[Error.prototype.toString]] بيقرا [[this.name]] (من الـ prototype: [["Error"]] أو [["TypeError"]]…) و [[this.message]]. الـ [[class PayError extends Error {}]] بيورث [[name]] من [[Error.prototype]] فبيطبع [["Error"]]، عشان كده [[name = "PayError"]] كـ class field (أو [[PayError.prototype.name = ...]]).

[[cause]]: الـ constructor بيبص في الـ options، ولو فيه خاصية [[cause]] (حتى لو قيمتها [[undefined]]) بيعمل خاصية own اسمها [[cause]] على الـ error (non-enumerable). من غير options مفيش خاصية خالص ([["cause" in e]] بـ [[false]]). وكل الأنواع بتقبلها: [[TypeError]] و [[AggregateError]] (الـ options تالت argument).

[[AggregateError]] subclass من [[Error]]، و [[errors]] خاصية own (array جديدة من الـ iterable اللي بعته). و [[Promise.any]] بيرميه برسالة [["All promises were rejected"]] والـ [[errors]] بنفس ترتيب الـ promises.

[[stack]] مش في الـ spec: كل engine بيعمله بشكله. V8 بيبنيه وقت ما الـ error يتعمل، وبيحفظ [[Error.stackTraceLimit]] frame (الافتراضي 10، وجرّبنا [[Error.stackTraceLimit = 1]] فالـ stack بقى سطرين). و [[Error.captureStackTrace(obj, fn)]] بيعمل نفس الحكاية على أي object، وبيشيل [[fn]] وكل اللي فوقها.`,
            when: R`[[name]] في كل subclass (أو class field [[name = this.constructor.name]] في الأساسي). و [[cause]] في أي [[catch]] هترمي فيه error جديد بمعنى أعلى (طبقة الـ service فوق طبقة الـ HTTP). و [[AggregateError]] لما تجمع غلطات مستقلة: validation، أو مهام متوازية ([[Promise.allSettled]] وبعدين ترمي اللي فشلوا). و [[captureStackTrace]] في دوال الـ assert والـ helpers اللي بتعمل errors، مع [[?.()]]. و [[EvalError]] متعملوش بنفسك.`,
            mistakes: R`subclass من غير [[name]] فكل الأخطاء [[Error: ...]]. و [[new Error(msg + ": " + e.message)]] بدل [[{ cause: e }]] (السبب بيضيع والـ stack الأصلي معاه). و [[new AggregateError("msg", errors)]] بالعكس: مبيرميش! النص iterable، فجرّبنا [[new AggregateError("ab", [])]] وطلع [[errors]] بـ [[[ 'a', 'b' ]]] (كل حرف «error»)، والـ array بقت الرسالة. ولو بعت رقم بدل الـ array: [[TypeError: number 5 is not iterable (cannot read property Symbol(Symbol.iterator))]]. و [[catch (e) { throw e.message }]] (بترمي نص مش Error، فمفيش stack). وتعتمد على شكل [[stack]] في كود (بيختلف بين المتصفحات). و [[Error.captureStackTrace]] من غير فحص في كود بيشتغل في Firefox القديم.`
          },
          teach: R`## الفكرة في سطر

الـ error مش رسالة بس: ليه **نوع** ([[name]])، و**سبب** ([[cause]])، وممكن يبقى **مجموعة** ([[errors]])، وليه **مكان** ([[stack]]). المثال بيمشي عليهم بالترتيب. كل الناتج اتشغّل فعلًا على Node 24.22.

---

## ١. Error.prototype.toString: الـ error بيتطبع إزاي

~~~js app.mjs
const e = new RangeError("qty must be 1..99");
console.log(String(e), String(new Error()), Error.prototype.toString.call({ name: "PayError", message: "declined" }));
~~~

~~~text الناتج
RangeError: qty must be 1..99 Error PayError: declined
~~~

| الحالة | الناتج | ليه |
|---|---|---|
| [[name]] و [[message]] موجودين | [[RangeError: qty must be 1..99]] | الاتنين بـ [[: ]] بينهم |
| [[message]] فاضي | [[Error]] | الاسم بس من غير [[: ]] |
| [[name]] فاضي | الرسالة بس | جرّبناها في التمرين الأول |
| object عادي بـ [[.call]] | [[PayError: declined]] | الدالة بتقرا [[name]] و [[message]] من أي object |

### الـ subclass والاسم

~~~js app.mjs
class PayError extends Error {}
class CardError extends Error { name = "CardError"; }
console.log(String(new PayError("declined")), String(new CardError("expired")));
~~~

~~~text الناتج
Error: declined CardError: expired
~~~

[[PayError]] ورث [[name]] من [[Error.prototype]] فاتطبع [[Error]]. الـ class field [[name = "CardError"]] حط الاسم الصح على الـ instance. (ولو عايزه يتحط لوحده لكل subclass: [[name = this.constructor.name]] في الكلاس الأساسي، زي المشروع الكبير.)

---

## ٢. cause (Error.cause): السبب الأصلي

~~~js app.mjs
const root = new TypeError("fetch failed");
const wrapped = new Error("loading menu failed", { cause: root });
console.log(wrapped.cause === root, "cause" in wrapped, "cause" in new Error("x"));
~~~

~~~text الناتج
true true false
~~~

| الحتة | معناها |
|---|---|
| [[{ cause: root }]] | تاني argument (options): الـ error اللي سبّب الجديد |
| [[wrapped.cause]] | خاصية own على الـ error، فيها نفس الـ object بالظبط ([[===]]) |
| [["cause" in new Error("x")]] | [[false]]: من غير options مفيش خاصية [[cause]] خالص |

ليه مش [[new Error("loading menu failed: " + root.message)]]؟ لأن كده ضاع **نوع** الأصلي و **الـ stack** بتاعه. مع [[cause]] الاتنين محفوظين. وجرّبنا نرمي [[wrapped]] من غير ما حد يمسكه، فـ Node طبع السلسلة كلها (المسار متقصّر):

~~~text الناتج: throw new Error("loading menu failed", { cause: new TypeError("fetch failed") })
Error: loading menu failed
    at Timeout._onTimeout (…/q7.mjs:5:26)
    at listOnTimeout (node:internal/timers:685:17)
    at process.processTimers (node:internal/timers:618:7) {
  [cause]: TypeError: fetch failed
      at Timeout._onTimeout (…/q7.mjs:5:68)
      at listOnTimeout (node:internal/timers:685:17)
      at process.processTimers (node:internal/timers:618:7)
}
~~~

---

## ٣. AggregateError.errors: كذا error في واحد

~~~js app.mjs
const agg = new AggregateError([new Error("a"), new TypeError("b")], "2 checks failed");
console.log(String(agg), agg.errors.map(String));
~~~

~~~text الناتج
AggregateError: 2 checks failed [ 'Error: a', 'TypeError: b' ]
~~~

- [[new AggregateError(errors, message, options)]]: الـ array **الأول**، والرسالة تاني، و [[{ cause }]] تالت لو عايز.
- [[agg.errors]]: array عادية بالأخطاء بالترتيب.

### من [[Promise.any]]

~~~js app.mjs
try { await Promise.any([Promise.reject(new Error("mirror 1")), Promise.reject(new Error("mirror 2"))]); }
catch (err) { console.log(err.constructor.name, err.message, err.errors.map((x) => x.message)); }
~~~

~~~text الناتج
AggregateError All promises were rejected [ 'mirror 1', 'mirror 2' ]
~~~

[[Promise.any]] بيرجّع أول واحد ينجح. لو كله فشل، مفيش «غلطة واحدة» يرميها، فبيرمي [[AggregateError]] فيها كل الأسباب بنفس ترتيب الـ promises.

---

## ٤. EvalError: مين بيرميه؟

~~~js app.mjs
console.log(new EvalError("x") instanceof Error, Object.getPrototypeOf(EvalError) === Error);
~~~

~~~text الناتج
true true
~~~

[[EvalError]] واحد من الـ ٦ أنواع الأساسية (مع [[RangeError]] و [[ReferenceError]] و [[SyntaxError]] و [[TypeError]] و [[URIError]])، و subclass من [[Error]]. بس اللغة نفسها **مبقتش بترميه** من ES5. اللي بيرميه هو الـ host لما توليد كود من نص يبقى ممنوع:

| فين | إمتى | الرسالة الحقيقية |
|---|---|---|
| Node | [[node --disallow-code-generation-from-strings]] و [[eval]] أو [[new Function]] | [[EvalError: Code generation from strings disallowed for this context]] |
| Chrome 157 | صفحة عليها [[Content-Security-Policy: script-src 'self']] و [[eval]] | [[EvalError: Evaluating a string as JavaScript violates the following Content Security Policy directive because 'unsafe-eval' is not an allowed source of script: script-src 'self'".]] |

الاتنين جرّبناهم (الـ CSP بصفحة على سيرفر صغير، و [[eval]] في ملف [[csp.js]] كتب الرسالة في الـ title).

---

## ٥. Error.captureStackTrace و الـ stack

~~~js app.mjs
function failClean(msg) {
  const err = new Error(msg);
  Error.captureStackTrace(err, failClean);
  return err;
}
function checkout() { return failClean("no stock"); }
console.log(checkout().stack.split("\n")[1].trim().split(" (")[0]);
~~~

~~~text الناتج
at checkout
~~~

- [[err.stack]] نص: أول سطر [[toString()]] بتاع الـ error، وبعده سطر لكل frame ([[at اسم الدالة (الملف:السطر:العمود)]]).
- [[Error.captureStackTrace(err, failClean)]] كتبه من جديد من غير [[failClean]] نفسها، فأول frame بقى [[checkout]]: المكان اللي طلب الـ error.

قارنّا من غيرها ومعاها (المسار متقصّر):

~~~text الناتج: stack من غير captureStackTrace ثم معاها
Error: no stock
    at fail (b4b.mjs:2:15)
    at checkout (b4b.mjs:10:31)
---
Error: no stock
    at checkout (b4b.mjs:10:49)
    at file:///…/b4b.mjs:11:16
~~~

| الحاجة | standard؟ | فين |
|---|---|---|
| [[err.stack]] | لأ، بس موجودة في كل الـ engines بأشكال مختلفة | Node و Chrome و Firefox و Safari |
| [[Error.captureStackTrace]] | لأ: V8 (وفيه اقتراح في TC39) | Node و Chrome و Edge (كلهم V8)، ومش مضمونة في غيرهم، فاكتبها [[?.()]] |
| [[Error.stackTraceLimit]] | لأ: V8 | الافتراضي 10 frames |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| error بنوع واضح | [[class X extends Error { name = "X"; }]] |
| تلف error بمعنى أعلى من غير ما تضيّع الأصلي | [[throw new Error("...", { cause: e })]] |
| كذا غلطة مرة واحدة | [[throw new AggregateError(list, "msg")]] واقرا [[e.errors]] |
| تطبع السلسلة كلها | loop على [[cause]] بـ Set ضد الـ loops |
| stack من غير الـ helper | [[Error.captureStackTrace?.(err, helper)]] |
| تعرف [[EvalError]] جه منين | [[eval]] أو [[new Function]] في مكان ممنوع فيه (CSP أو flag) |`,
          lines: [
            R`RangeError برسالة: النوع المناسب لقيمة برّه المدى المسموح.`,
            R`[[String(e)]] بينادي [[toString]]: [[RangeError: qty must be 1..99]]. و [[new Error()]] من غير رسالة: [[Error]] بس. و [[.call]] على object عادي: [[PayError: declined]].`,
            R`subclass من غير ما نغيّر [[name]]: هيورث [["Error"]] من [[Error.prototype]].`,
            R`subclass فيه class field [[name]]: الاسم الصح بيتحط على كل instance.`,
            R`الأولى اتطبعت [[Error: declined]] (الاسم ضاع)، والتانية [[CardError: expired]].`,
            R`الـ error الأصلي اللي حصل في طبقة تحت.`,
            R`error جديد بمعنى أعلى، والأصلي جوه [[cause]] في الـ options.`,
            R`[[cause === root]] بـ [[true]] (نفس الـ object)، و [["cause" in wrapped]] بـ [[true]]، و error من غير options مفيهوش [[cause]] خالص.`,
            R`[[AggregateError]]: الـ array أول argument والرسالة تاني.`,
            R`بيتطبع [[AggregateError: 2 checks failed]]، و [[errors]] فيها الاتنين بأنواعهم.`,
            R`[[Promise.any]] على اتنين فاشلين: مفيش ولا واحد نجح، فبيرمي [[AggregateError]].`,
            R`الـ catch بيطبع النوع والرسالة [[All promises were rejected]] ورسايل الأسباب بالترتيب من [[err.errors]].`,
            R`[[EvalError]] لسه موجود و subclass من [[Error]]، بس اللغة نفسها مبترميهوش.`,
            R`helper بيعمل errors ويرجّعها، زي دوال الـ assert والـ validation.`,
            R`الـ error بيتعمل هنا، فالـ stack الطبيعي أوله [[failClean]].`,
            R`[[Error.captureStackTrace]] (V8 بس) بيكتب الـ stack من جديد من غير [[failClean]] وكل اللي فوقها.`,
            R`بنرجّع الـ error (مش بنرميه) عشان نقرا الـ stack بتاعه.`,
            R`قفلة الدالة.`,
            R`[[checkout]] بتنادي الـ helper، وهي اللي عايزينها أول سطر في الـ stack.`,
            R`السطر التاني في الـ stack (أول frame) بقى [[at checkout]]: المكان اللي طلب الـ error، مش الـ helper.`,
          ],
          ref: [
            { t: "MDN: Error.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString" },
            { t: "MDN: Error: cause", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause" },
            { t: "MDN: AggregateError: errors", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError/errors" },
            { t: "MDN: EvalError", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError" },
            { t: "MDN: Error.captureStackTrace()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/captureStackTrace" },
            { t: "MDN: Error.prototype.stack", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack" },
            { t: "Node.js: --disallow-code-generation-from-strings", url: "https://nodejs.org/api/cli.html#--disallow-code-generation-from-strings" },
          ],
          pre: [{ to: "js/custom errors و cause", why: R`أول [[class AppError]] وأول [[cause]] و [[AggregateError]]: هنا بنكمّل من جوه` }, "js/try و catch و finally"],
        },
        {
          cmd: "encodeURI و encodeURIComponent و decodeURI و URIError",
          title: "تحط كلام اليوزر في لينك إزاي من غير ما يبوظه؟ encodeURI ولا encodeURIComponent، و URIError لما الـ % غلط",
          desc: R`الـ URL مسموح فيه حروف ASCII معيّنة بس، وكل حرف تاني (عربي، مسافة، رموز ليها معنى زي [[&]] و [[?]] و [[/]] و [[#]]) لازم يتكتب **percent-encoded**: [[%]] وبعدها رقمين hex لكل byte في UTF-8. فـ [["ش"]] بقت [[%D8%B4]] والمسافة [[%20]].

فيه دالتين للـ encoding، والفرق بينهم في الحروف اللي **ليها معنى في شكل الـ URL** ([[; , / ? : @ & = + $ #]]):
• [[encodeURI(url)]] لـ URL **كامل**: بيسيب الحروف دي زي ما هي عشان الـ URL يفضل URL. مبيعملش encode لـ [[&]] ولا [[?]].
• [[encodeURIComponent(part)]] لـ **حتة واحدة** هتتحط جوه URL (قيمة في الـ query، أو جزء من الـ path): بيعمل encode لكل الحروف دي. ده اللي هتستخدمه ٩٥٪ من الوقت.

والعكس [[decodeURI]] و [[decodeURIComponent]]. ولو النص فيه [[%]] مش متبوعة بـ hex صح، أو bytes مش UTF-8 سليم، بيرموا **URIError** ([[URI malformed]]): وده بيحصل في السيرفر مع أي لينك متقصوص أو بوت، فلازم try. والنهارده للـ query الأحسن [[URL]] و [[URLSearchParams]] (بيعملوا الـ encoding لوحدهم).`,
          example: R`// encodeURI: لـ URL كامل، بيسيب ؟ و & و / و #
const url = "https://shop.example/بحث?q=شاي&page=2";
console.log(encodeURI(url));
// encodeURIComponent: لحتة واحدة جوه الـ URL، بيعمل encode لكل حاجة ليها معنى
const q = "شاي & قهوة/لبن?";
console.log(encodeURIComponent(q));
const link = "https://shop.example/search?q=" + encodeURIComponent(q) + "&page=2";
console.log(new URL(link).searchParams.get("q"));
const broken = "https://shop.example/search?q=" + encodeURI(q) + "&page=2";
console.log([...new URL(broken).searchParams.keys()]);
// decodeURI مبيفكش الحاجات اللي encodeURI مبيلمسهاش
console.log(decodeURIComponent("%D8%B4%D8%A7%D9%8A%20%26"), decodeURI("%D8%B4%D8%A7%D9%8A%20%26"));
// URIError: % مش متبوعة بـ hex صح
for (const bad of ["100%", "%E0%A4%A"]) {
  try { decodeURIComponent(bad); } catch (e) { console.log(JSON.stringify(bad), e.name + ": " + e.message); }
}`,
          try: R`اكتب [[safeDecode(s, fallback = s)]] بتفك نص percent-encoded جاي من query (و [[+]] فيه معناها مسافة)، ولو [[URIError]] ترجّع الـ [[fallback]]، وأي error تاني ترميه تاني. حلها في المربع ودوس «شغّل واختبر».`,
          sol: R`~~~js safe-decode.mjs
function safeDecode(s, fallback = s) {
  try { return decodeURIComponent(s.replaceAll("+", " ")); }
  catch (e) { if (e instanceof URIError) return fallback; throw e; }
}
console.log(safeDecode("%D8%B4%D8%A7%D9%8A+%D8%A8%D9%84%D8%A8%D9%86"), safeDecode("50%"), safeDecode("%E0%A4%A", null));
~~~

~~~text الناتج (Node 24.22)
شاي بلبن 50% null
~~~

- [[replaceAll("+", " ")]] **قبل** الـ decode: في الـ query (فورم HTML) المسافة بتتكتب [[+]]، و [[decodeURIComponent]] مبيعرفش ده (بيسيبها [[+]]). والـ [[+]] الحقيقية بتيجي [[%2B]] فمبتتأثرش.
- [[fallback = s]]: الافتراضي يرجّع النص زي ما هو، وتقدر تبعت [[null]] عشان تعرف إنه كان بايظ.
- [[instanceof URIError]]: بنبلع النوع اللي متوقعينه بس.`,
          check: {
            lang: "js",
            starter: R`function safeDecode(s, fallback = s) {
}`,
            tests: R`test("عربي و +", () => expect(safeDecode("%D8%B4%D8%A7%D9%8A+%D8%A8%D9%84%D8%A8%D9%86")).toBe("شاي بلبن"));
test("%2B تفضل +", () => expect(safeDecode("a%2Bb")).toBe("a+b"));
test("% لوحدها ترجّع النص", () => expect(safeDecode("50%")).toBe("50%"));
test("byte ناقص ← fallback", () => expect(safeDecode("%E0%A4%A", null)).toBe(null));
test("نص عادي", () => expect(safeDecode("tea")).toBe("tea"));`,
            solution: R`function safeDecode(s, fallback = s) {
  try { return decodeURIComponent(s.replaceAll("+", " ")); }
  catch (e) { if (e instanceof URIError) return fallback; throw e; }
}`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[encodeURI("a b&c/d?e=f#g")]] و [[encodeURIComponent("a b&c/d?e=f#g")]]. أنهي حروف هتتغيّر في كل واحدة؟`, done: R`توقعت إن [[encodeURI]] هتغيّر المسافة بس، و [[encodeURIComponent]] هتغيّر المسافة و [[&]] و [[/]] و [[?]] و [[=]] و [[#]]، وطلع كده.`, sol: R`~~~js p1.mjs
const s = "a b&c/d?e=f#g";
console.log(encodeURI(s));
console.log(encodeURIComponent(s));
~~~

~~~text الناتج (Node 24.22)
a%20b&c/d?e=f#g
a%20b%26c%2Fd%3Fe%3Df%23g
~~~

[[encodeURI]] افترضت إن النص URL كامل، فسابت [[&]] و [[/]] و [[?]] و [[=]] و [[#]] لأنهم «شكل» الـ URL. [[encodeURIComponent]] افترضت إنه **قيمة**، فعملتهم كلهم: [[%26]] و [[%2F]] و [[%3F]] و [[%3D]] و [[%23]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const link = "https://shop.example/search?q=" + encodeURI(q) + "&page=2"]] و [[q = "fish & chips"]]. اقرا الـ params بـ [[new URL(link).searchParams]] وشوف طلع كام param. صلّحه بطريقتين.`, done: R`شفت ٣ params ([[q]] بـ [["fish "]] و [[" chips"]] و [[page]])، وصلّحته بـ [[encodeURIComponent]] مرة وبـ [[url.searchParams.set]] مرة.`, sol: R`~~~js p2.mjs
const q = "fish & chips";
const bad = "https://shop.example/search?q=" + encodeURI(q) + "&page=2";
const fixed = "https://shop.example/search?q=" + encodeURIComponent(q) + "&page=2";
console.log([...new URL(bad).searchParams], [...new URL(fixed).searchParams]);
const u = new URL("https://shop.example/search");
u.searchParams.set("q", q);
u.searchParams.set("page", 2);
console.log(u.href);
~~~

~~~text الناتج (Node 24.22)
[ [ 'q', 'fish ' ], [ ' chips', '' ], [ 'page', '2' ] ] [ [ 'q', 'fish & chips' ], [ 'page', '2' ] ]
https://shop.example/search?q=fish+%26+chips&page=2
~~~

- [[encodeURI]] ساب الـ [[&]]، فالسيرفر شافه فاصل params: البحث بقى «fish » بس، وظهر param اسمه « chips».
- [[encodeURIComponent]]: الـ [[&]] بقت [[%26]].
- [[searchParams.set]]: أوضح وأأمن، وبيعمل الـ encoding لوحده. لاحظ إنه كتب المسافة [[+]] (شكل الفورم)، مش [[%20]]: الاتنين صح في الـ query.
- ده نوع من **injection**: يوزر يقدر يزوّد params ([[q=x&admin=1]]) لو بتبني اللينك بـ [[encodeURI]] أو من غير encoding.` },
            { lvl: 'تطبيق', t: R`**قارن:** [[encodeURIComponent("شاي بلبن")]] و [[new URLSearchParams({ q: "شاي بلبن" }).toString()]]. والعكس: [[decodeURIComponent("a+b")]] و [[new URLSearchParams("q=a+b").get("q")]] و [[new URLSearchParams("q=a%2Bb").get("q")]].`, done: R`عرفت إن [[encodeURIComponent]] بتكتب المسافة [[%20]] و [[URLSearchParams]] بيكتبها [[+]]، وإن [[decodeURIComponent]] بتسيب [[+]] زي ما هي و [[URLSearchParams]] بيفكها مسافة.`, sol: R`~~~js p4.mjs
const word = "شاي بلبن";
console.log(encodeURIComponent(word));
console.log(new URLSearchParams({ q: word }).toString());
console.log(decodeURIComponent("a+b"), new URLSearchParams("q=a+b").get("q"), new URLSearchParams("q=a%2Bb").get("q"));
~~~

~~~text الناتج (Node 24.22)
%D8%B4%D8%A7%D9%8A%20%D8%A8%D9%84%D8%A8%D9%86
q=%D8%B4%D8%A7%D9%8A+%D8%A8%D9%84%D8%A8%D9%86
a+b a b a+b
~~~

| | المسافة بتبقى | [[+]] بتتقري |
|---|---|---|
| [[encodeURIComponent]] و [[decodeURIComponent]] | [[%20]] | [[+]] زي ما هي (مش مسافة) |
| [[URLSearchParams]] (قواعد [[application/x-www-form-urlencoded]]) | [[+]] | مسافة، و [[%2B]] هي الـ [[+]] الحقيقية |

يعني متخلطش: لو بنيت بـ [[URLSearchParams]] فك بـ [[URLSearchParams]]. ولو فكيت query بـ [[decodeURIComponent]] حوّل [[+]] لمسافة الأول (زي [[safeDecode]]).` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** نص فيه نص emoji مقطوع (lone surrogate) زي [["ok \uD83D end"]] (بيحصل لما تقطع نص بـ [[slice]] في نص الـ emoji). جرّب [[encodeURIComponent]] عليه، وصلّحه بـ [[isWellFormed]] و [[toWellFormed]].`, done: R`شفت [[URIError: URI malformed]] **من الـ encode** مش الـ decode، و [[isWellFormed()]] بـ [[false]]، و [[toWellFormed()]] حطت [[U+FFFD]] مكان النص المقطوع فبقى [[%EF%BF%BD]].`, sol: R`~~~js p5.mjs
const broken = "ok \uD83D end";
try { encodeURIComponent(broken); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(broken.isWellFormed(), encodeURIComponent(broken.toWellFormed()));
~~~

~~~text الناتج (Node 24.22)
URIError: URI malformed
false ok%20%EF%BF%BD%20end
~~~

- [[\uD83D]] نص surrogate pair (أول حتة من emoji)، ومينفعش يتحوّل UTF-8 لوحده، فالـ encode نفسه بيرمي.
- [[isWellFormed()]] بتسأل «فيه surrogate لوحده؟»، و [[toWellFormed()]] بتبدّله بـ [[U+FFFD]] (علامة الحرف البايظ �)، واللي بيتعمل له encode [[%EF%BF%BD]].
- بيحصل لما تقص نص طويل لـ ١٠٠ حرف بـ [[slice]] للـ preview واللينك. استخدم [[toWellFormed]] أو اقطع بـ [[Intl.Segmenter]] (درس النصوص بعمق).` },
          ],
          flag: "script",
          deep: {
            why: R`أي لينك فيه كلام يوزر (بحث، اسم منتج، فلتر، redirect) ممكن يبوظ أو يبقى ثغرة لو اتبنى غلط: [[&]] في البحث بيقسم الـ params، و [[/]] في اسم المنتج بيغيّر الـ path، و [[#]] بيقطع كل اللي بعده. وفي السيرفر، أي path فيه [[%]] غلط بيرمي [[URIError]] ويوقّع الطلب لو مفيش try. والعربي بالذات لازم يتعمله encode صح.`,
            how: R`الدالتين بيحوّلوا النص لـ UTF-8 bytes، وأي byte مش في القايمة المسموحة بيبقى [[%XX]]. القايمة: الحروف والأرقام و [[- _ . ! ~ * ' ( )]] مسموحين في الاتنين. و [[encodeURI]] بتسيب كمان [[; , / ? : @ & = + $ #]] (الحروف «المحجوزة» اللي بتعمل شكل الـ URL). فالعربي (٢ bytes لكل حرف في UTF-8) بيبقى [[%D8%B4]] مثلًا.

الـ decode العكس: كل [[%XX]] بيرجع byte، والـ bytes بتتقري UTF-8. و [[decodeURI]] **مبتفكش** الـ escapes اللي بتمثّل حروف محجوزة ([[%26]] بتفضل [[%26]]، جرّبناها في المثال)، عشان متغيّرش شكل الـ URL. [[URIError]] بيترمي لو [[%]] مش متبوعة برقمين hex، أو الـ bytes مش UTF-8 سليم ([[%FF]] لوحدها)، أو في الـ encode لو فيه surrogate لوحده.

[[URL]] و [[URLSearchParams]] (Web APIs، موجودين في Node والمتصفح) بيطبّقوا قواعد مواصفة WHATWG URL: كل جزء ليه قواعده، والـ query بقواعد الفورم ([[+]] للمسافة).`,
            when: R`[[encodeURIComponent]] لأي **قيمة** هتلزقها بإيدك في URL: param، أو حتة path، أو قيمة cookie. و [[encodeURI]] نادر: لما معاك URL كامل فيه عربي أو مسافات وعايزه يبقى صالح من غير ما تغيّر شكله. والأحسن في الكود الجديد: [[new URL(path, base)]] و [[url.searchParams.set(k, v)]]. و [[decodeURIComponent]] جوه try في أي كود بيقرا من برّه (سيرفر، أو [[location.hash]]).`,
            mistakes: R`[[encodeURI]] على قيمة param (الـ [[&]] و [[=]] و [[?]] بيعدّوا). و [[encodeURIComponent]] على URL كامل (الـ [[://]] بيبقى [[%3A%2F%2F]] واللينك يبوظ). و encode مرتين ([[%20]] بتبقى [[%2520]]). و [[decodeURIComponent]] من غير try في سيرفر. و [[decodeURIComponent]] على query فيها [[+]] من فورم (المسافات تفضل [[+]]). وتحط اسم فيه [[/]] أو [[?]] في [[new URL("/p/" + name, base)]] من غير encode: جرّبناها والـ [[?]] قسمت الاسم والـ [[%]] فضلت بايظة (المشروع الكبير).`
          },
          teach: R`## الفكرة في سطر

الـ URL ليه **شكل** ([[/]] بين الأجزاء، و [[?]] قبل الـ query، و [[&]] بين الـ params، و [[#]] للـ fragment)، والكلام اللي بتحطه جواه لازم يتعمل له **percent-encoding** عشان ميتلخبطش مع الشكل. كل الناتج اتشغّل فعلًا على Node 24.22.

---

## ١. encodeURI: لـ URL كامل

~~~js app.mjs
const url = "https://shop.example/بحث?q=شاي&page=2";
console.log(encodeURI(url));
~~~

~~~text الناتج
https://shop.example/%D8%A8%D8%AD%D8%AB?q=%D8%B4%D8%A7%D9%8A&page=2
~~~

- الحروف العربي اتحوّلت: كل حرف عربي = ٢ bytes في UTF-8، وكل byte = [[%]] ورقمين hex. «ب» = [[%D8%A8]].
- [[://]] و [[/]] و [[?]] و [[=]] و [[&]] **اتسابوا**: [[encodeURI]] فاكرة إنهم شكل الـ URL. وده صح هنا، لأن النص فعلًا URL كامل.

---

## ٢. encodeURIComponent: لحتة جوه الـ URL

~~~js app.mjs
const q = "شاي & قهوة/لبن?";
console.log(encodeURIComponent(q));
const link = "https://shop.example/search?q=" + encodeURIComponent(q) + "&page=2";
console.log(new URL(link).searchParams.get("q"));
~~~

~~~text الناتج
%D8%B4%D8%A7%D9%8A%20%26%20%D9%82%D9%87%D9%88%D8%A9%2F%D9%84%D8%A8%D9%86%3F
شاي & قهوة/لبن?
~~~

| الحرف | [[encodeURI]] | [[encodeURIComponent]] |
|---|---|---|
| المسافة | [[%20]] | [[%20]] |
| [[&]] | بيسيبها: هتتقري فاصل params | [[%26]] |
| [[/]] | بيسيبها: هتتقري فاصل path | [[%2F]] |
| [[?]] | بيسيبها: هتتقري بداية query | [[%3F]] |
| [[#]] | بيسيبها: كل اللي بعدها هيروح fragment | [[%23]] |
| حروف وأرقام و [[- _ . ! ~ * ' ( )]] | زي ما هي | زي ما هي |

و [[new URL(link).searchParams.get("q")]] رجّع البحث **بالظبط** زي ما اليوزر كتبه.

### لو استخدمت encodeURI على قيمة

~~~js app.mjs
const broken = "https://shop.example/search?q=" + encodeURI(q) + "&page=2";
console.log([...new URL(broken).searchParams.keys()]);
~~~

~~~text الناتج
[ 'q', ' قهوة/لبن?', 'page' ]
~~~

الـ [[&]] اتسابت، فالسيرفر شاف **٣** params: [[q]] قيمتها «شاي » بس، و param اسمه « قهوة/لبن?». ده باج، وممكن يبقى ثغرة لو اليوزر كتب [[&admin=1]].

---

## ٣. decodeURI و decodeURIComponent: الفك

~~~js app.mjs
console.log(decodeURIComponent("%D8%B4%D8%A7%D9%8A%20%26"), decodeURI("%D8%B4%D8%A7%D9%8A%20%26"));
~~~

~~~text الناتج
شاي & شاي %26
~~~

- [[decodeURIComponent]] فكت كل حاجة: [[&]] رجعت.
- [[decodeURI]] **سابت [[%26]]**: لأن [[encodeURI]] عمرها ما بتعمل [[&]] كده، فلو لقتها مكتوبة [[%26]] يبقى حد عملها بقصد (قيمة فيها [[&]])، ولو فكتها الـ URL هيتغيّر شكله. فالقاعدة: فك بنفس العيلة اللي عملت الـ encode.

---

## ٤. URIError: لما الـ [[%]] غلط

~~~js app.mjs
for (const bad of ["100%", "%E0%A4%A"]) {
  try { decodeURIComponent(bad); } catch (e) { console.log(JSON.stringify(bad), e.name + ": " + e.message); }
}
~~~

~~~text الناتج
"100%" URIError: URI malformed
"%E0%A4%A" URIError: URI malformed
~~~

| النص | ليه بايظ |
|---|---|
| [[100%]] | [[%]] في الآخر من غير رقمين hex بعدها |
| [[%E0%A4%A]] | حرف UTF-8 من ٣ bytes، والتالت ناقص رقم |
| [[%FF]] | byte مش بداية أي حرف UTF-8 سليم (جرّبناها: نفس الرسالة) |
| نص فيه surrogate لوحده | الـ **encode** نفسه بيرمي (التمرين الأخير) |

في السيرفر ده بيحصل كل يوم: بوت بيجرّب paths غريبة، أو لينك اتقص في رسالة. أي [[decodeURIComponent]] على حاجة جاية من برّه **جوه try**.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| قيمة جوه URL (param، حتة path) | [[encodeURIComponent(v)]]، أو [[url.searchParams.set(k, v)]] |
| URL كامل فيه عربي أو مسافات | [[encodeURI(url)]]، أو [[new URL(url).href]] |
| تفك قيمة | [[decodeURIComponent]] جوه try ([[URIError]]) |
| تفك query من فورم | [[URLSearchParams]] (بيفهم [[+]] كمسافة) |
| تبني لينك بـ params | [[new URL(path, base)]] و [[searchParams]] |`,
          lines: [
            R`URL كامل فيه path عربي ([[بحث]]) وقيمة عربي في الـ query.`,
            R`[[encodeURI]] حوّلت العربي لـ [[%XX]] وسابت [[/]] و [[?]] و [[=]] و [[&]] لأنها فاكرة النص URL كامل.`,
            R`قيمة بحث فيها كل الحروف الخطر: [[&]] و [[/]] و [[?]].`,
            R`[[encodeURIComponent]] عملت encode لكلهم: [[&]] بقت [[%26]] و [[/]] [[%2F]] و [[?]] [[%3F]].`,
            R`لينك متبني بإيدنا والقيمة متعمل لها [[encodeURIComponent]].`,
            R`[[searchParams.get("q")]] رجّع البحث بالظبط [[شاي & قهوة/لبن?]].`,
            R`نفس اللينك بس بـ [[encodeURI]]: الغلطة الشايعة.`,
            R`الـ params بقت ٣: [[q]] و [[ قهوة/لبن?]] و [[page]]، لأن الـ [[&]] اتسابت فقسمت البحث.`,
            R`[[decodeURIComponent]] فكت [[%26]] لـ [[&]]، و [[decodeURI]] سابتها لأنها حرف محجوز.`,
            R`loop على نصين percent-encoding بتاعهم بايظ.`,
            R`[[decodeURIComponent]] رمت [[URIError: URI malformed]] للاتنين، والـ catch مسكها وطبعها.`,
            R`قفلة الـ loop.`,
          ],
          ref: [
            { t: "MDN: encodeURI()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI" },
            { t: "MDN: encodeURIComponent()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent" },
            { t: "MDN: decodeURI()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI" },
            { t: "MDN: decodeURIComponent()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent" },
            { t: "MDN: URIError", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError" },
            { t: "MDN: URLSearchParams", url: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" },
          ],
          pre: [{ to: "js/try و catch و finally", why: R`[[URIError]] لازم تتمسك` }, { to: "js/fetch و AbortController", why: R`اللينكات اللي بتبنيها هنا بتروح لـ [[fetch]]` }],
        },
        {
          cmd: "JSON.rawJSON و JSON.isRawJSON: أرقام أكبر من Number",
          title: "ID من 19 رقم جه من الـ API: JSON.parse بيبوظه في صمت، و JSON.rawJSON بيرجّعه زي ما هو",
          desc: R`[[Number]] في JavaScript بيمثّل الأعداد الصحيحة بدقة لحد [[Number.MAX_SAFE_INTEGER]] (9007199254740991) بس. أي رقم أكبر في JSON (IDs من قاعدة بيانات بـ BIGINT، أو Snowflake IDs، أو أرقام بطاقات) [[JSON.parse]] بيقرّبه لأقرب رقم ممكن **من غير ولا error**: [[9007199254740993]] بيبقى [[9007199254740992]]. وفي الاتجاه التاني، [[BigInt]] مبيتعملوش [[JSON.stringify]] خالص ([[TypeError: Do not know how to serialize a BigInt]]).

**[[JSON.rawJSON(text)]]** بتعمل object خاص معناه «حط النص ده في الـ JSON زي ما هو»: [[JSON.stringify({ id: JSON.rawJSON("9007199254740993") })]] بيطلّع الرقم كامل. والنص لازم يبقى JSON primitive سليم (رقم، أو نص بتنصيص، أو [[true]] و [[false]] و [[null]])، مش object ولا array. و **[[JSON.isRawJSON(x)]]** بتقول لو [[x]] واحد من الـ objects دي.

والقراية بتتعمل بالـ reviver: [[JSON.parse(text, (key, value, context) => ...)]] و [[context.source]] فيه **النص الأصلي** للرقم قبل ما يضيع، فـ [[BigInt(context.source)]] بيرجّعه صح. الاتنين جداد (Baseline «newly available»): شغالين في Node 24 و Chrome، فلو الكود هيشتغل على متصفحات قديمة افحص [[typeof JSON.rawJSON === "function"]] أو ابعت الأرقام الكبيرة كنصوص.`,
          example: R`// رقم أكبر من MAX_SAFE_INTEGER بيبوظ في JSON.parse من غير ولا error
const fromServer = '{"orderId": 9007199254740993, "total": 0.1}';
console.log(JSON.parse(fromServer).orderId, Number.MAX_SAFE_INTEGER);
// BigInt مبيتعملوش stringify
try { JSON.stringify({ id: 9007199254740993n }); } catch (e) { console.log(e.name + ": " + e.message); }
// JSON.rawJSON: «حط النص ده في الـ JSON زي ما هو»
const raw = JSON.rawJSON("9007199254740993");
console.log(JSON.stringify({ id: raw }), JSON.isRawJSON(raw), JSON.isRawJSON(9007199254740993));
console.log(raw.rawJSON, Object.isFrozen(raw), Object.getPrototypeOf(raw));
// رايح جاي من غير ما رقم يضيع: reviver بـ context.source و replacer بـ rawJSON
const order = JSON.parse(fromServer, (key, value, ctx) => (key === "orderId" ? BigInt(ctx.source) : value));
console.log(order.orderId);
const back = JSON.stringify(order, (key, v) => (typeof v === "bigint" ? JSON.rawJSON(v.toString()) : v));
console.log(back);
try { JSON.rawJSON('{"a": 1}'); } catch (e) { console.log(e.name + ": " + e.message); }`,
          try: R`اكتب replacer صغير بيخلّي [[JSON.stringify]] يقبل أي [[BigInt]] في أي مكان (حتى جوه arrays و objects متداخلة) ويكتبه رقم في الـ JSON. جرّبه على [[{ id: 2n ** 64n, list: [1n, 2], nested: { n: -5n } }]].`,
          sol: R`~~~js bigint-json.mjs
const toJSON = (v) => JSON.stringify(v, (k, x) => (typeof x === "bigint" ? JSON.rawJSON(String(x)) : x));
console.log(toJSON({ id: 2n ** 64n, list: [1n, 2], nested: { n: -5n } }));
~~~

~~~text الناتج (Node 24.22)
{"id":18446744073709551616,"list":[1,2],"nested":{"n":-5}}
~~~

- الـ replacer بيتنادى على **كل** قيمة في الشجرة، فـ [[1n]] جوه الـ array و [[-5n]] جوه الـ nested object اتمسكوا.
- [[String(x)]] لـ BigInt بيطلّع الأرقام من غير [[n]] ([[String(5n)]] = [["5"]]).
- [[2n ** 64n]] = 18446744073709551616، أكبر من أي [[Number]] صحيح، واتكتب كامل.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[JSON.parse('{"id": 1234567890123456789, "price": 19.90}')]]. هيطلع إيه في [[id]] و [[price]]؟ و [[Number.isSafeInteger(r.id)]]؟`, done: R`توقعت إن الـ id آخره هيتغيّر وإن السعر هيبقى 19.9، وطلع [[1234567890123456800 19.9 false]].`, sol: R`~~~js p1.mjs
const r = JSON.parse('{"id": 1234567890123456789, "price": 19.90}');
console.log(r.id, r.price, Number.isSafeInteger(r.id));
~~~

~~~text الناتج (Node 24.22)
1234567890123456800 19.9 false
~~~

- الـ id الحقيقي [[...789]] بقى [[...800]]: الـ [[Number]] (double) فيه 53 bit للدقة بس، والرقم ده محتاج أكتر، فاتقرّب لأقرب قيمة ممكنة. ومفيش error.
- [[19.90]] بقى [[19.9]]: القيمة نفسها، بس شكل الكتابة ضاع (مهم لو بتعرض فلوس).
- [[Number.isSafeInteger]]: أسرع طريقة تعرف إن رقم جه من JSON ومش مضمون.` },
            { lvl: 'تطبيق', t: R`**ابني:** الأسعار في الـ API لازم تتبعت بخانتين عشرية دايمًا ([[19.90]] مش [[19.9]]، و [[40.00]] مش [[40]]) والـ JSON رقم مش نص. اعمل [[money(n)]] بترجّع [[JSON.rawJSON]] بالشكل ده.`, done: R`[[JSON.stringify]] لـ صنفين بيطلّع [["price":19.90]] و [["price":40.00]] كأرقام، و [[JSON.parse]] للناتج بيرجّع [[19.9]] عادي.`, sol: R`~~~js p3.mjs
const money = (n) => JSON.rawJSON(n.toFixed(2));
console.log(JSON.stringify({ items: [{ name: "tea", price: money(19.9) }, { name: "rice", price: money(40) }] }));
console.log(JSON.parse(JSON.stringify({ p: money(19.9) })).p);
~~~

~~~text الناتج (Node 24.22)
{"items":[{"name":"tea","price":19.90},{"name":"rice","price":40.00}]}
19.9
~~~

- [[toFixed(2)]] بترجّع **نص** [["19.90"]]، و [[JSON.rawJSON]] بتحطه في الـ JSON من غير تنصيص، فبيبقى رقم.
- اللي بيقرا بـ [[JSON.parse]] عادي هيلاقي [[19.9]]: القيمة واحدة، الشكل بس اللي اتحفظ لأنظمة (بنوك، فواتير ضريبية) بتقارن النص.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حد عايز يحط JSON جاهز جوه JSON تاني من غير parse: [[JSON.rawJSON('{"a":1}')]]. جرّبها، وجرّب [[JSON.rawJSON("[1,2]")]] و [[""]] و [["  7"]]. وبعدين جرّب نص بتنصيص و [[false]].`, done: R`عرفت إن الـ objects والـ arrays والنص الفاضي والمسافات بيترفضوا بـ SyntaxError، وإن [['"قهوة"']] و [["false"]] شغالين.`, sol: R`~~~js p4.mjs
for (const bad of ['{"a":1}', "[1,2]", "", "  7"]) {
  try { JSON.rawJSON(bad); } catch (e) { console.log(JSON.stringify(bad), "→", e.name + ": " + e.message); }
}
console.log(JSON.stringify({ a: JSON.rawJSON('"قهوة"'), b: JSON.rawJSON("false") }));
~~~

~~~text الناتج (Node 24.22)
"{\"a\":1}" → SyntaxError: Unexpected token '{', "{"a":1}" is not valid JSON
"[1,2]" → SyntaxError: Unexpected token '[', "[1,2]" is not valid JSON
"" → SyntaxError: Invalid value for JSON.rawJSON
"  7" → SyntaxError: Unexpected token ' ', "  7" is not valid JSON
{"a":"قهوة","b":false}
~~~

[[JSON.rawJSON]] بيقبل **primitive** واحد بس، ومن غير مسافات في الأول والآخر: الهدف إنه يبقى «قيمة» مش «JSON جوه JSON»، عشان محدش يقدر يحقن structure في الـ output. لو عايز تحط object جاهز: [[JSON.parse]] الأول وبعدين حطه عادي.` },
            { lvl: 'تحدي', t: R`**رايح جاي:** [[parse]] بتحوّل الـ key [[id]] بس لـ BigInt من [[context.source]]، و [[stringify]] بترجّعه بـ [[rawJSON]]. جرّب على [['{"id":18446744073709551615,"tags":["a"],"score":1.5e3}']] وقارن الناتج بالأصل. طابق؟ ليه؟ وبعدين اطبع [[JSON.isRawJSON(JSON.rawJSON("1"))]] و [[JSON.isRawJSON({ rawJSON: "1" })]].`, done: R`الـ id رجع كامل، بس المقارنة [[false]] لأن [[1.5e3]] رجعت [[1500]]، وعرفت إن [[rawJSON]] بيحفظ اللي انت اخترته بس، و [[isRawJSON]] بتفرّق بين الـ object الحقيقي و object شكله زيه.`, sol: R`~~~js p5.mjs
const KEYS = new Set(["id"]);
const parse = (t) => JSON.parse(t, (k, v, ctx) => (KEYS.has(k) && typeof v === "number" ? BigInt(ctx.source) : v));
const stringify = (v) => JSON.stringify(v, (k, x) => (typeof x === "bigint" ? JSON.rawJSON(x.toString()) : x));
const input = '{"id":18446744073709551615,"tags":["a"],"score":1.5e3}';
const out = stringify(parse(input));
console.log(out, out === input);
console.log(JSON.isRawJSON(JSON.rawJSON("1")), JSON.isRawJSON({ rawJSON: "1" }));
~~~

~~~text الناتج (Node 24.22)
{"id":18446744073709551615,"tags":["a"],"score":1500} false
true false
~~~

- [[18446744073709551615]] (أكبر unsigned 64-bit) رجع بالظبط.
- [[score]] مش في [[KEYS]]، فاتقري [[Number]] (1500) واتكتب [[1500]]. يعني **شكل** أي رقم تاني مش محفوظ: [[rawJSON]] مش «round-trip كامل» إلا للي انت بتحفظه.
- [[isRawJSON]] بتفحص علامة داخلية مش شكل الـ object: [[{ rawJSON: "1" }]] عادي، ولو حطيته في [[stringify]] هيطلع object.` },
          ],
          flag: "script",
          deep: {
            why: R`IDs الـ 64-bit في كل حتة: Twitter/X و Discord (Snowflake)، و Postgres [[BIGINT]]، وأرقام المعاملات في البنوك. ولو الـ frontend أو Node عمل [[JSON.parse]] عادي، الـ ID بيتغيّر **في صمت**، فتطلب الطلب الغلط أو تحدّث record تاني. قبل [[rawJSON]] الحل الوحيد كان الـ API يبعت الـ IDs كنصوص ([["id_str"]])، أو مكتبة JSON كاملة بتاعتها.`,
            how: R`[[Number]] هو IEEE 754 double: 53 bit للأرقام، فأي عدد صحيح أكبر من [[2 ** 53 - 1]] مش كل قيمه ممكنة (بعد 2 ** 53 بيمشي ٢ ٢، وبعدين ٤ ٤…). [[JSON.parse]] بيحوّل النص لأقرب double، فالدقة بتضيع قبل ما الكود بتاعك يشوف الرقم.

الـ reviver بياخد argument تالت [[context]]، وفيه [[source]] = النص الأصلي للقيمة **لو هي primitive** (للـ objects والـ arrays مفيش [[source]]). فـ [[BigInt(context.source)]] بيبني الرقم من النص قبل التقريب.

[[JSON.rawJSON(text)]] بتعمل parse للنص (لازم primitive JSON سليم من غير مسافات حواليه)، وبترجّع object **متجمّد** و prototype بتاعه [[null]] وفيه خاصية واحدة [[rawJSON]] = النص. [[JSON.stringify]] لما يقابله بيكتب النص زي ما هو بدل ما يعامله كـ object. و [[JSON.isRawJSON]] بتفحص العلامة الداخلية دي (مش الشكل).`,
            when: R`لما API بيبعت أو بيستقبل أرقام ممكن تعدّي [[MAX_SAFE_INTEGER]] (IDs، مبالغ بأصغر وحدة في عملات كتير، timestamps بالـ nanoseconds)، أو لما لازم تحافظ على شكل رقم ([[19.90]]). ولو الطرف التاني بتاعك وتقدر تغيّره: ابعت الـ IDs **نصوص** وخلاص، ده أبسط وشغال في كل مكان.`,
            mistakes: R`تفتكر الرقم سليم عشان مفيش error. وتحوّل لـ BigInt **بعد** [[JSON.parse]] ([[BigInt(obj.id)]]: الرقم كان ضاع خلاص). وتحوّل كل رقم لـ BigInt (الحساب مع Number بعد كده بيرمي [[Cannot mix BigInt and other types]]). و [[JSON.rawJSON(obj)]] لـ object كامل. وتنسى إن [[ctx]] مش موجود في runtimes قديمة (افحص [[ctx?.source]]). وتعتمد على [[rawJSON]] في كود بيشتغل في متصفحات قديمة من غير fallback.`
          },
          teach: R`## الفكرة في سطر

الأرقام الكبيرة في JSON بتضيع في **رحلتين**: وهي داخلة ([[JSON.parse]] بيقرّبها) ووهي طالعة ([[JSON.stringify]] مبيقبلش BigInt). المثال بيورّي المشكلة وحلها في الاتجاهين. كل الناتج اتشغّل فعلًا على Node 24.22، و [[JSON.rawJSON]] اتجرّبت كمان على Chrome 157 وطلّعت نفس الـ JSON.

---

## ١. المشكلة: الرقم بيتغيّر في صمت

~~~js app.mjs
const fromServer = '{"orderId": 9007199254740993, "total": 0.1}';
console.log(JSON.parse(fromServer).orderId, Number.MAX_SAFE_INTEGER);
~~~

~~~text الناتج
9007199254740992 9007199254740991
~~~

السيرفر بعت [[...993]] ووصلك [[...992]]. الرقم أكبر من [[Number.MAX_SAFE_INTEGER]] بـ ٢، والـ [[Number]] مبيقدرش يمثّل [[...993]] أصلًا (بعد [[2 ** 53]] الأرقام الممكنة بتمشي ٢ ٢)، فاتقرّب. لو بعدين عملت [[fetch("/orders/" + id)]] هتطلب طلب تاني.

## ٢. والـ BigInt مبيتكتبش

~~~js app.mjs
try { JSON.stringify({ id: 9007199254740993n }); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
TypeError: Do not know how to serialize a BigInt
~~~

[[BigInt]] بيمثّل أي عدد صحيح بالظبط، بس [[JSON.stringify]] رافض يكتبه (عشان أي حد هيقرا الـ JSON بـ [[JSON.parse]] عادي هيضيّعه تاني).

---

## ٣. JSON.rawJSON و JSON.isRawJSON

~~~js app.mjs
const raw = JSON.rawJSON("9007199254740993");
console.log(JSON.stringify({ id: raw }), JSON.isRawJSON(raw), JSON.isRawJSON(9007199254740993));
console.log(raw.rawJSON, Object.isFrozen(raw), Object.getPrototypeOf(raw));
~~~

~~~text الناتج
{"id":9007199254740993} true false
9007199254740993 true null
~~~

| الحاجة | معناها |
|---|---|
| [[JSON.rawJSON("...")]] | object خاص: «لما تكتب JSON، حط النص ده زي ما هو» |
| [[JSON.stringify({ id: raw })]] | [[{"id":9007199254740993}]]: الرقم كامل، ومن غير تنصيص (رقم مش نص) |
| [[JSON.isRawJSON(raw)]] | [[true]]: الـ object ده من [[rawJSON]]. لأي حاجة تانية [[false]] |
| [[raw.rawJSON]] | النص نفسه |
| [[Object.isFrozen(raw)]] و الـ prototype [[null]] | object متجمّد ومن غير methods: قيمة بس |

### بيقبل إيه؟

~~~js app.mjs
try { JSON.rawJSON('{"a": 1}'); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
SyntaxError: Unexpected token '{', "{"a": 1}" is not valid JSON
~~~

primitive JSON واحد بس: رقم، أو نص بتنصيص ([['"قهوة"']])، أو [[true]] و [[false]] و [[null]]. الـ objects والـ arrays والنص الفاضي والمسافات حوالين القيمة بيترفضوا (التمرين التالت).

---

## ٤. رايح جاي: reviver بـ context.source

~~~js app.mjs
const order = JSON.parse(fromServer, (key, value, ctx) => (key === "orderId" ? BigInt(ctx.source) : value));
console.log(order.orderId);
const back = JSON.stringify(order, (key, v) => (typeof v === "bigint" ? JSON.rawJSON(v.toString()) : v));
console.log(back);
~~~

~~~text الناتج
9007199254740993n
{"orderId":9007199254740993,"total":0.1}
~~~

- الـ reviver ([[(key, value, ctx) => ...]]) بيتنادى على كل قيمة. [[value]] الرقم بعد ما اتقرّب (متأخر)، و **[[ctx.source]]** النص الأصلي [["9007199254740993"]] قبل أي تقريب.
- [[BigInt(ctx.source)]]: [[9007199254740993n]] بالظبط.
- الـ replacer في [[stringify]] بيحوّل أي [[bigint]] لـ [[rawJSON]]، فالـ JSON اللي طالع زي اللي دخل حرف بحرف.

> [[ctx]] و [[rawJSON]] من نفس الاقتراح (JSON.parse source text access)، والاتنين Baseline «newly available»: Node 24 و Chrome 157 فيهم (جرّبناهم). في runtime قديم [[ctx]] بيبقى [[undefined]] و [[JSON.rawJSON]] مش موجودة، فافحص قبل ما تعتمد عليهم.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تعرف إن رقم جه من JSON مش مضمون | [[!Number.isSafeInteger(n)]] |
| تقرا ID كبير صح | [[JSON.parse(t, (k, v, ctx) => k === "id" ? BigInt(ctx.source) : v)]] |
| تكتب BigInt في JSON كرقم | replacer بـ [[JSON.rawJSON(x.toString())]] |
| تحافظ على شكل رقم ([[19.90]]) | [[JSON.rawJSON(n.toFixed(2))]] |
| تعرف إن object ده raw | [[JSON.isRawJSON(x)]] |
| تشتغل في كل مكان من غير features جديدة | ابعت الأرقام الكبيرة نصوص |`,
          lines: [
            R`JSON جاي من السيرفر فيه [[orderId]] أكبر من [[MAX_SAFE_INTEGER]] بـ ٢.`,
            R`[[JSON.parse]] العادي رجّع [[9007199254740992]] بدل [[...993]] من غير ولا error، وجنبه [[MAX_SAFE_INTEGER]] للمقارنة.`,
            R`BigInt في [[JSON.stringify]]: بيرمي [[TypeError: Do not know how to serialize a BigInt]].`,
            R`[[JSON.rawJSON]]: object خاص شايل النص [["9007199254740993"]] عشان يتكتب في الـ JSON زي ما هو.`,
            R`الـ JSON طلع [[{"id":9007199254740993}]] كامل، و [[JSON.isRawJSON(raw)]] بـ [[true]]، والرقم العادي بـ [[false]].`,
            R`[[raw.rawJSON]] النص نفسه، والـ object متجمّد والـ prototype بتاعه [[null]].`,
            R`reviver بياخد [[ctx]]: [[ctx.source]] النص الأصلي للرقم، فـ [[BigInt(ctx.source)]] بيبنيه بالظبط.`,
            R`[[9007199254740993n]]: الرقم الصح كـ BigInt.`,
            R`replacer بيحوّل أي BigInt لـ [[JSON.rawJSON]] وهو طالع.`,
            R`الـ JSON رجع زي اللي جه من السيرفر: [[{"orderId":9007199254740993,"total":0.1}]].`,
            R`object كامل في [[rawJSON]]: SyntaxError، لأنه بيقبل primitive JSON واحد بس.`,
          ],
          ref: [
            { t: "MDN: JSON.rawJSON()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/rawJSON" },
            { t: "MDN: JSON.isRawJSON()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/isRawJSON" },
            { t: "MDN: JSON.parse() (reviver context)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse" },
            { t: "MDN: Number.MAX_SAFE_INTEGER", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER" },
          ],
          pre: [{ to: "js/JSON", why: R`[[JSON.parse]] و [[JSON.stringify]] والـ reviver والـ replacer في أبسط صورهم` }],
        },
        {
          cmd: "WeakRef و FinalizationRegistry و resource management",
          title: "WeakRef بـ deref، و FinalizationRegistry بـ register و unregister، وليه متعتمدش عليهم، وتقفل الـ resources صح",
          desc: R`**[[WeakRef]]** إشارة لـ object **مبتمنعش** الـ garbage collector (GC) إنه يمسحه. [[ref.deref()]] بترجّع الـ object لو لسه عايش، أو [[undefined]] لو اتمسح. و **[[FinalizationRegistry]]** بتسجّل فيها objects بـ [[register(target, heldValue, token)]]، وبعد ما object منهم يتمسح بتنادي الـ callback بتاعها بالـ [[heldValue]] (مش بالـ object، هو خلاص راح). و [[unregister(token)]] بتلغي التسجيل (مثلًا لما تقفل الحاجة بنفسك).

بس **متبنيش منطق البرنامج عليهم**: الـ spec مبيضمنش **إمتى** الـ GC يشتغل ولا **إذا** الـ callback هيتنادى أصلًا (ممكن البرنامج يخلص قبلها، والـ registry نفسها لو اتمسحت مفيش callbacks). استخدمهم لـ caches وتحسينات بس.

والصح لأي **resource** (ملف مفتوح، connection، lock، timer، ملف مؤقت): تقفله **بنفسك** في مكان مضمون. النهارده ده [[try/finally]]. والجديد في اللغة: [[using x = ...]] بينادي [[x[Symbol.dispose]()]] لوحده لما الـ block يخلص، و [[DisposableStack]] لكذا resource. شغالين في Node 24 و Chrome، بس **مش Baseline** (مش في كل المتصفحات الرئيسية لسه)، فاستخدمهم في Node، وفي المتصفح [[try/finally]].`,
          example: R`// شغّله بـ node --expose-gc عشان globalThis.gc تبقى موجودة
const registry = new FinalizationRegistry((label) => console.log("cleanup:", label));
let a = { name: "report-a", data: new Array(1e6).fill(1) };
let b = { name: "report-b", data: new Array(1e6).fill(2) };
const tokenB = {};
registry.register(a, "report-a");
registry.register(b, "report-b", tokenB);
const refA = new WeakRef(a);
console.log("deref:", refA.deref()?.name);
console.log("unregister b:", registry.unregister(tokenB), registry.unregister(tokenB));
a = null;
b = null;
console.log("same job:", refA.deref()?.name);
setTimeout(() => {
  globalThis.gc();
  console.log("after gc:", refA.deref()?.name);
  setTimeout(() => console.log("done, registry is", typeof registry), 500);
}, 0);
try { new WeakRef(1); } catch (e) { console.log(e.name + ": " + e.message); }`,
          try: R`اكتب [[class Connection]] بتسجّل نفسها في [[FinalizationRegistry]] وقت ما تتعمل، و [[close()]] بتعمل [[unregister]]. اعمل اتنين، اقفل واحد بس، وامسح الإشارات للاتنين، واعمل [[gc()]] (بـ [[node --expose-gc]]) واستنى شوية: الـ registry لازم تقول «نسيت تقفل» على اللي متقفلش بس.`,
          sol: R`~~~js forgot-close.mjs
const closed = new FinalizationRegistry((name) => console.log("نسيت تقفل:", name));
class Connection {
  constructor(name) { this.name = name; this.open = true; closed.register(this, name, this); }
  close() { this.open = false; closed.unregister(this); console.log("اتقفلت:", this.name); }
}
let c1 = new Connection("db-1");
let c2 = new Connection("db-2");
c1.close();
c1 = null;
c2 = null;
await new Promise((r) => setTimeout(r, 0));
globalThis.gc?.();
await new Promise((r) => setTimeout(r, 100));
console.log("registry لسه موجودة:", typeof closed);
~~~

~~~text الناتج (Node 24.22، node --expose-gc)
اتقفلت: db-1
نسيت تقفل: db-2
registry لسه موجودة: object
~~~

- [[register(this, name, this)]]: الـ target هو الـ connection، والـ [[heldValue]] اسمها (نص، مش الـ object نفسه)، والـ token هو الـ connection كمان عشان [[unregister(this)]] تلاقيه. الـ token مبيمنعش الـ GC (مرجع ضعيف).
- [[close()]] بتعمل [[unregister]]، فـ [[db-1]] مبيتقالش عليه حاجة لما يتمسح.
- [[await]] قبل [[gc()]]: الـ objects اللي اتعملت في نفس الـ «job» بتفضل عايشة لحد ما يخلص (الشرح تحت)، فلازم نديله فرصة.
- آخر سطر بيستخدم [[closed]]: لو الـ registry نفسها اتمسحت مفيش callbacks خالص (الغلطة اللي في الشرح).
- ده **أداة debugging** («نسيت تقفل connection»)، مش طريقة تقفل بيها. القفل نفسه لازم يبقى [[close()]] في [[finally]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[let user = { name: "Sara" }; const ref = new WeakRef(user); user = null; console.log(ref.deref()?.name);]] وبعدين [[await]] على [[setTimeout]] و [[gc()]] وتاني [[deref]]. هيطبع إيه في المرتين، من غير [[--expose-gc]] ومعاه؟`, done: R`توقعت [[Sara]] في الأول دايمًا، وفي التاني [[اتمسح]] مع [[--expose-gc]] و [[Sara]] من غيره، وطلع كده، وتقدر تقول ليه الأولى مستحيل تبقى [[undefined]].`, sol: R`~~~js p1.mjs
let user = { name: "Sara" };
const ref = new WeakRef(user);
user = null;
console.log(ref.deref()?.name);
await new Promise((r) => setTimeout(r, 0));
globalThis.gc?.();
console.log(ref.deref()?.name ?? "اتمسح");
~~~

~~~text الناتج (Node 24.22): node --expose-gc p1.mjs
Sara
اتمسح
~~~

~~~text الناتج: node p1.mjs (من غير الـ flag)
Sara
Sara
~~~

- أول [[deref]] في نفس الـ job اللي اتعمل فيه الـ [[WeakRef]]: الـ spec بيضمن إن الـ target يفضل عايش لحد آخر الـ job (KeepDuringJob)، عشان [[if (ref.deref()) ref.deref().x]] متبقاش قمار.
- من غير [[--expose-gc]]، [[globalThis.gc]] مش موجودة ([[?.()]] منعت الـ error)، والـ GC مكانش محتاج يشتغل لـ object صغير، فـ [[Sara]] فضلت.
- يعني نفس الكود طلّع نتيجتين: ده بالظبط ليه متبنيش منطق على [[deref]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف فيه [[const registry = new FinalizationRegistry(...)]] و [[register]] لـ object، وبعدين [[a = null]] و [[gc()]] جوه [[setTimeout]] وانتظار 500ms. الـ callback **مش بيتنادى خالص** مع إن [[deref]] بيقول إن الـ object اتمسح. ليه؟ صلّحه بسطر.`, done: R`عرفت إن الـ registry نفسها مكانش حد ماسكها بعد ما الملف خلص فاتمسحت، وصلّحته بإن callback الـ [[setTimeout]] يستخدم [[registry]]، فطلع [[cleanup: report-a]].`, sol: R`~~~text قبل التصليح: آخر سطور المثال كانت
setTimeout(() => {
  globalThis.gc();
  console.log("after gc:", refA.deref()?.name);
  setTimeout(() => console.log("done"), 500);
}, 0);
~~~

~~~text الناتج قبل (node --expose-gc)
after gc: undefined
done
~~~

~~~text بعد: السطر الأخير بس اتغيّر
  setTimeout(() => console.log("done, registry is", typeof registry), 500);
~~~

~~~text الناتج بعد
after gc: undefined
cleanup: report-a
done, registry is object
~~~

- الـ object اتمسح ([[deref]] بـ [[undefined]]) بس الـ callback متنادتش، لأن **الـ registry نفسها** اتمسحت: بعد ما الـ module خلص، [[registry]] مكانش حد ماسكه (الـ closures اللي في [[setTimeout]] مكانتش بتستخدمه)، فـ V8 مسحه مع الـ object.
- لما الـ closure استخدمت [[registry]] بقت ماسكاه، فعاش، فالـ callback اتنادت.
- القاعدة: الـ registry لازم تعيش طول ما انت عايز callbacks (خليها في module scope بيتستخدم، أو static على كلاس). ودي غلطة حقيقية وقعنا فيها وإحنا بنجهز المثال.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[report(lines)]] بتكتب ملف مؤقت [[report.tmp]] وبترمي لو [[lines]] فاضية، والملف المؤقت لازم يتمسح **في الحالتين** بـ [[try/finally]]. وبعدين اكتب [[reportUsing]] بـ [[using]] و [[Symbol.dispose]] (Node 24).`, done: R`في الحالتين الملف المؤقت اتمسح ([[existsSync]] بـ [[false]])، والـ error وصل للـ catch برّه، ونسخة [[using]] طبعت [[dispose: report2.tmp]] في الحالتين.`, sol: R`~~~js p4.mjs
import { writeFileSync, rmSync, existsSync } from "node:fs";
function report(lines) {
  const tmp = "report.tmp";
  writeFileSync(tmp, "");
  try {
    if (lines.length === 0) throw new Error("مفيش داتا");
    writeFileSync(tmp, lines.join("\n"));
    return "اتكتب " + lines.length;
  } finally {
    rmSync(tmp, { force: true });
    console.log("الملف المؤقت اتمسح:", !existsSync(tmp));
  }
}
console.log(report(["a", "b"]));
try { report([]); } catch (e) { console.log("caught:", e.message); }
function reportUsing(lines) {
  using tmp = { path: "report2.tmp", [Symbol.dispose]() { rmSync(this.path, { force: true }); console.log("dispose:", this.path); } };
  writeFileSync(tmp.path, lines.join("\n"));
  if (lines.length === 0) throw new Error("مفيش داتا");
  return "اتكتب " + lines.length;
}
console.log(reportUsing(["x"]));
try { reportUsing([]); } catch (e) { console.log("caught:", e.message, existsSync("report2.tmp")); }
~~~

~~~text الناتج (Node 24.22)
الملف المؤقت اتمسح: true
اتكتب 2
الملف المؤقت اتمسح: true
caught: مفيش داتا
dispose: report2.tmp
اتكتب 1
dispose: report2.tmp
caught: مفيش داتا false
~~~

- [[finally]] بيتنفّذ **قبل** ما الـ [[return]] يوصل للي نادى (عشان كده [[الملف المؤقت اتمسح]] اتطبع قبل [[اتكتب 2]])، وقبل ما الـ error يطلع.
- [[using tmp = {...}]]: أي object فيه [[[Symbol.dispose]]] method. لما الدالة تخلص بأي طريقة (return أو throw) بيتنادى لوحده.
- لو أكتر من [[using]] في نفس الـ block بيتقفلوا **بالعكس** (آخر واحد اتفتح أول واحد يتقفل).
- [[using]] شغال في Node 24 و Chrome، بس مش Baseline، فالكود ده للسيرفر. في كود هيشتغل في كل المتصفحات: [[try/finally]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عايز يستخدم [[FinalizationRegistry]] عشان يقفل connections قاعدة البيانات «لوحدها» بدل ما يكتب [[close()]]. اكتب له ٤ سطور بالأسباب اللي تخليه ميعملش كده، والبديل.`, done: R`السطور فيها: مفيش ضمان إمتى ولا إذا، والـ connection ممكن تفضل مفتوحة دقايق تحت ضغط والـ pool يخلص، والـ GC مش بيحس بـ resources برّه الـ heap (socket ملوش حجم في الذاكرة)، والبديل [[try/finally]] أو [[using]] أو pool بيقفل لوحده، والـ registry للتحذير بس.`, sol: R`**إجابة نموذجية:**

1. **مفيش ضمان:** الـ spec بيقول إن الـ engine ممكن ميشغّلش الـ callback خالص (البرنامج يخلص، أو الـ registry تتمسح، أو الـ GC ميحتاجش يشتغل). جرّبنا في الدرس نفس الكود طلّع نتيجتين بين [[--expose-gc]] ومن غيره.
2. **الـ GC مش شايف الـ connection:** الـ GC بيشتغل لما **الذاكرة** تتملي. الـ connection object صغير في الذاكرة بس ماسك socket وحاجة في سيرفر قاعدة البيانات. ممكن تعمل ١٠٠ connection قبل ما الذاكرة تتملي، والـ pool (مثلًا ٢٠) يخلص ويبدأ يرفض.
3. **التوقيت عشوائي:** حتى لو اتنادت، ممكن بعد ثانية أو دقيقة، فالـ lock أو الـ transaction يفضلوا ماسكين حاجة.
4. **البديل:** [[try { ... } finally { conn.close() }]] (أو [[using conn = await pool.connect()]] في Node لما الـ driver يدعم [[Symbol.asyncDispose]])، والـ registry **بس** تطبع تحذير «نسيت تقفل» وقت الـ development (زي حل «جرّب» فوق).` },
          ],
          flag: "script",
          deep: {
            why: R`[[WeakRef]] و [[FinalizationRegistry]] بتحل مشكلة حقيقية: cache لحاجات تقيلة (صور، نتايج حسابات) ميمنعش الذاكرة تفضى، وتحذير لما حد ينسى يقفل حاجة. بس هما أكتر APIs في اللغة سهل تستخدمها غلط، و MDN نفسه بيقول «avoid where possible». والـ resource management (القفل المضمون) هو اللي بيمنع ملفات مؤقتة متسابة، و connections مفتوحة، و locks متعلّقة: أشهر أسباب «السيرفر بيقع بعد كام ساعة».`,
            how: R`الـ GC بيمسح أي object مفيش **مرجع قوي** يوصله من الـ roots (الـ globals والـ stack). [[WeakRef]] مرجع ضعيف: مبيتحسبش. و [[deref()]] بترجّع الـ object لو لسه عايش، وأي [[deref]] بيخلّي الـ object عايش لحد آخر الـ job الحالي (synchronous code لحد ما يخلص)، فمش هيختفي في نص الدالة.

[[FinalizationRegistry]]: [[register(target, heldValue, unregisterToken)]]. الـ [[heldValue]] بيتحفظ بمرجع قوي (فمينفعش يبقى الـ target نفسه: [[TypeError: FinalizationRegistry.prototype.register: target and holdings must not be same]])، والـ token مرجع ضعيف ولازم object (نص بيرمي [[TypeError: Invalid unregisterToken ('token-string')]]). بعد ما الـ target يتمسح، الـ engine **ممكن** يحط مهمة في الـ queue تنادي الـ callback بالـ [[heldValue]]. و [[unregister(token)]] بترجّع [[true]] لو لقت تسجيلات وشالتها، و [[false]] لو مفيش.

[[using]]: [[const]] زيادة. لما الـ block يخلص (عادي أو بـ throw أو return) بينادي [[ [Symbol.dispose]() ]] على كل [[using]] بالعكس. ولو الـ dispose نفسه رمى وكان فيه error أصلًا، الاتنين بيتجمعوا في [[SuppressedError]]. و [[DisposableStack]] بيجمّع كذا resource: [[use(x)]] و [[defer(fn)]] و [[dispose()]]. و [[await using]] و [[Symbol.asyncDispose]] للـ async.`,
            when: R`[[WeakRef]]: cache لحاجات تقيلة ممكن تتحسب تاني (مع Map من key لـ WeakRef، و registry تشيل الـ keys الميتة). [[FinalizationRegistry]]: تحذيرات debugging، أو تنضيف حاجة برّه JS (WebAssembly memory) كـ **احتياط** فوق القفل اليدوي. وأي resource: [[try/finally]] دايمًا، و [[using]] في Node 24 لو الكود سيرفر بس. ولو عايز داتا مربوطة بـ object وتتمسح معاه: [[WeakMap]] أبسط وأضمن من الاتنين.`,
            mistakes: R`تعتمد على الـ callback عشان تقفل حاجة. وتعمل [[deref()]] مرتين في سطرين وتفتكرهم نفس النتيجة بعد [[await]] (ممكن الأولى object والتانية [[undefined]]). والـ registry تتمسح (local variable جوه دالة خلصت). و [[heldValue]] = الـ target (بيرمي، ولو لفيته في object بيمسك الـ target فمبيتمسحش أبدًا). وتختبر بـ [[gc()]] من غير [[--expose-gc]]. و [[using]] في كود متصفح عام من غير ما تتأكد من الدعم. و [[new WeakRef(1)]]: الـ target لازم object أو symbol مش متسجّل ([[TypeError: WeakRef: invalid target]]).`
          },
          teach: R`## الفكرة في سطر

فيه طريقتين «تسيب» بيهم حاجة: تسيبها للـ **GC** (مش مضمون إمتى)، أو **تقفلها بنفسك** (مضمون). [[WeakRef]] و [[FinalizationRegistry]] بيكلّموك مع الـ GC، والـ resource management هو القفل المضمون. الناتج اتشغّل فعلًا على Node 24.22 بـ [[node --expose-gc]] (عشان [[globalThis.gc()]] تبقى موجودة ونجبر الـ GC يشتغل).

---

## ١. WeakRef و deref

~~~js app.mjs
const registry = new FinalizationRegistry((label) => console.log("cleanup:", label));
let a = { name: "report-a", data: new Array(1e6).fill(1) };
let b = { name: "report-b", data: new Array(1e6).fill(2) };
const tokenB = {};
registry.register(a, "report-a");
registry.register(b, "report-b", tokenB);
const refA = new WeakRef(a);
console.log("deref:", refA.deref()?.name);
~~~

| الحتة | معناها |
|---|---|
| [[new WeakRef(a)]] | إشارة **ضعيفة**: مبتمنعش الـ GC يمسح [[a]] |
| [[refA.deref()]] | الـ object لو لسه عايش، أو [[undefined]]. عشان كده [[?.]] بعدها دايمًا |
| [[new Array(1e6).fill(1)]] | مليون رقم: عشان الـ object يبقى تقيل والـ GC يهتم بيه |

~~~text الناتج
deref: report-a
~~~

---

## ٢. FinalizationRegistry: register و unregister

| الـ method | بتعمل إيه |
|---|---|
| [[new FinalizationRegistry(cb)]] | الـ callback اللي هيتنادى **بعد** ما object متسجّل يتمسح |
| [[register(target, heldValue)]] | سجّل [[target]]. الـ callback هتاخد [[heldValue]] (هنا اسم)، لأن الـ target نفسه خلاص راح |
| [[register(target, heldValue, token)]] | نفس الكلام، ومعاه token تلغي بيه بعدين |
| [[unregister(token)]] | الغي التسجيل. بترجّع [[true]] لو كان فيه، و [[false]] لو مفيش |

~~~js app.mjs
console.log("unregister b:", registry.unregister(tokenB), registry.unregister(tokenB));
~~~

~~~text الناتج
unregister b: true false
~~~

أول مرة لقت تسجيل [[b]] وشالته، والتانية ملقتش. فـ [[b]] هيتمسح من غير ما الـ callback تتنادى.

---

## ٣. الـ GC بيشتغل إمتى؟

~~~js app.mjs
a = null;
b = null;
console.log("same job:", refA.deref()?.name);
~~~

~~~text الناتج
same job: report-a
~~~

شلنا الإشارات القوية، بس [[deref]] لسه رجّع الـ object! الـ spec بيضمن إن أي object عملت له [[deref]] (أو [[new WeakRef]]) يفضل عايش لحد آخر الـ **job** الحالي (الكود الـ synchronous لحد ما يخلص). عشان كده الـ GC لازم يستنى لحد [[setTimeout]]:

~~~js app.mjs
setTimeout(() => {
  globalThis.gc();
  console.log("after gc:", refA.deref()?.name);
  setTimeout(() => console.log("done, registry is", typeof registry), 500);
}, 0);
~~~

~~~text الناتج
after gc: undefined
cleanup: report-a
done, registry is object
~~~

- [[gc()]] اشتغل، [[a]] اتمسح، و [[deref]] بقى [[undefined]].
- الـ callback اتنادت لـ [[report-a]] بس، **بعد** شوية (في task لوحدها)، و [[report-b]] لأ (اتعمله [[unregister]]).

### الغلطة اللي وقعنا فيها

أول نسخة كان آخر سطر [[console.log("done")]] من غير [[registry]]. النتيجة: [[after gc: undefined]] و [[done]]، **ومفيش [[cleanup]] خالص**. السبب: بعد ما الـ module خلص، محدش كان ماسك [[registry]]، فالـ GC مسحها هي كمان، ومع الـ registry راحت الـ callbacks. لما الـ closure استخدمت [[registry]] عاشت واتنادت. **الـ registry لازم تعيش.**

### والأخطاء

~~~js app.mjs
try { new WeakRef(1); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
TypeError: WeakRef: invalid target
~~~

| الغلط | الرسالة الحقيقية |
|---|---|
| [[new WeakRef(1)]] | [[TypeError: WeakRef: invalid target]]: الـ target لازم object أو symbol مش متسجّل |
| [[register(o, o)]] | [[TypeError: FinalizationRegistry.prototype.register: target and holdings must not be same]] |
| [[register(o, "x", "token-string")]] | [[TypeError: Invalid unregisterToken ('token-string')]]: الـ token لازم object |
| [[globalThis.gc()]] من غير [[--expose-gc]] | [[TypeError: globalThis.gc is not a function]] |

---

## ٤. resource management: using النهارده و try/finally في كل حتة

الـ GC للذاكرة بس. لكن ملف مفتوح أو connection أو lock **resources** برّه الذاكرة، ولازم تتقفل في وقت معروف. جرّبنا ٣ طرق على لوج مفتوح:

~~~js resources.mjs
import { openSync, closeSync, writeSync, rmSync } from "node:fs";
function openLog(path) {
  const fd = openSync(path, "w");
  console.log("open", path);
  return {
    write(line) { writeSync(fd, line + "\n"); },
    close() { closeSync(fd); console.log("close", path); },
    [Symbol.dispose]() { this.close(); },
  };
}
function withTryFinally() {
  const log = openLog("a.log");
  try {
    log.write("start");
    throw new Error("boom");
  } finally {
    log.close();
  }
}
try { withTryFinally(); } catch (e) { console.log("caught:", e.message); }
function withUsing() {
  using log = openLog("b.log");
  log.write("start");
  throw new Error("boom 2");
}
try { withUsing(); } catch (e) { console.log("caught:", e.message); }
{
  using stack = new DisposableStack();
  const x = stack.use(openLog("c.log"));
  stack.defer(() => console.log("deferred cleanup"));
  x.write("hi");
  console.log("end of block");
}
for (const f of ["a.log", "b.log", "c.log"]) rmSync(f);
~~~

~~~text الناتج (Node 24.22)
open a.log
close a.log
caught: boom
open b.log
close b.log
caught: boom 2
open c.log
end of block
deferred cleanup
close c.log
~~~

| الطريقة | بتقفل إمتى | فين تشتغل |
|---|---|---|
| [[try { ... } finally { x.close() }]] | دايمًا، حتى مع throw أو return | في كل مكان: **دي اللي تستخدمها النهارده** |
| [[using x = ...]] | آخر الـ block، بينادي [[x[Symbol.dispose]()]] | Node 24 و Chrome، مش Baseline |
| [[DisposableStack]] و [[use]] و [[defer]] | آخر الـ block، **بالعكس**: آخر حاجة اتضافت أول واحدة تتقفل | Node 24 و Chrome، مش Baseline |

لاحظ الترتيب في التالتة: [[deferred cleanup]] قبل [[close c.log]] لأنها اتضافت بعدها. ده نفس ترتيب أي stack: اللي اتفتح الأخير يتقفل الأول (زي ما بتقفل الأقواس).

---

## الخلاصة

| عايز | استخدم | متعتمدش على |
|---|---|---|
| إشارة لحاجة تقيلة ممكن تتمسح | [[new WeakRef(obj)]] و [[ref.deref()?.x]] | إنها تفضل موجودة بعد [[await]] |
| تعرف إن حاجة اتمسحت (debugging) | [[FinalizationRegistry]] و [[register]] و [[unregister]] | إن الـ callback هتتنادى أصلًا |
| داتا مربوطة بـ object | [[WeakMap]] (أبسط) | |
| تقفل resource مضمون | [[try/finally]] | الـ GC |
| نفس الكلام بشكل أنضف (Node) | [[using]] و [[Symbol.dispose]] و [[DisposableStack]] | إنه موجود في كل المتصفحات |`,
          lines: [
            R`registry الـ callback بتاعتها بتطبع اسم الـ object اللي اتمسح (الـ [[heldValue]]).`,
            R`object تقيل (مليون رقم) عشان الـ GC يهتم يمسحه.`,
            R`object تقيل تاني هنلغي تسجيله.`,
            R`object فاضي هنستخدمه token: [[unregister]] محتاج object يتعرف بيه.`,
            R`[[register]] من غير token: الـ callback هتاخد [["report-a"]] لما [[a]] يتمسح.`,
            R`[[register]] بـ token تالت عشان نقدر نلغيه.`,
            R`[[WeakRef]] لـ [[a]]: إشارة ضعيفة مبتمنعش الـ GC.`,
            R`[[deref()]] رجّع الـ object لأنه لسه عايش: [[report-a]].`,
            R`[[unregister(tokenB)]]: أول مرة [[true]] (لقى وشال)، والتانية [[false]] (مفيش حاجة).`,
            R`شلنا الإشارة القوية لـ [[a]]: الـ WeakRef لوحده مش كفاية يمسكه.`,
            R`وشلنا [[b]] كمان (اللي اتلغى تسجيله).`,
            R`في نفس الـ job: [[deref]] لسه رجّع [[report-a]]، لأن الـ spec بيمسك الـ target لحد آخر الـ job.`,
            R`[[setTimeout]] عشان نخرج من الـ job الحالي ونخلّي الـ GC يقدر يمسح.`,
            R`[[globalThis.gc()]] بيجبر الـ GC يشتغل، وموجودة بس مع [[node --expose-gc]].`,
            R`بعد الـ GC: [[deref]] بقى [[undefined]] لأن [[a]] اتمسح فعلًا.`,
            R`نستنى نص ثانية عشان الـ callback تتنادى، والـ closure دي بتستخدم [[registry]] فبتمسكها عايشة (من غيرها مفيش callbacks).`,
            R`قفلة الـ [[setTimeout]] الأولاني بتأخير صفر: يشتغل بعد ما الكود الحالي يخلص.`,
            R`[[WeakRef]] لرقم: الـ target لازم object، فـ [[TypeError: WeakRef: invalid target]].`,
          ],
          ref: [
            { t: "MDN: WeakRef.prototype.deref()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef/deref" },
            { t: "MDN: FinalizationRegistry.prototype.unregister()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry/unregister" },
            { t: "MDN: FinalizationRegistry.prototype.register()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry/register" },
            { t: "MDN: JavaScript resource management", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management" },
            { t: "MDN: using", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using" },
          ],
          pre: [{ to: "js/memory leaks", why: R`أول تعارف بـ [[WeakRef]] و [[FinalizationRegistry]] و heap snapshots` }, { to: "js/try و catch و finally", why: R`[[finally]] هو أساس القفل المضمون` }],
        },
        {
          cmd: "JavaScript technologies overview: ECMAScript و Web APIs و Node",
          title: "كل اللي اتعلمته جاي منين: اللغة نفسها (ECMAScript)، ولا المتصفح (Web APIs)، ولا Node؟ والـ engine إيه؟",
          desc: R`«JavaScript» في الحقيقة ٣ طبقات:
• **ECMAScript**: اللغة نفسها، مواصفتها اسمها ECMA-262 وبتطلع نسخة كل سنة (ES2024 و ES2025…) من لجنة TC39. فيها الـ syntax ([[if]] و [[class]] و [[async]] و regex) والـ built-ins ([[Array]] و [[Promise]] و [[Map]] و [[JSON]] و [[Math]] و [[WeakRef]])، و [[Intl]] في مواصفة جنبها (ECMA-402). ومفيهاش ولا طريقة تطبع أو تقرا ملف أو تعمل طلب شبكة!
• **الـ host** (البيئة اللي شغّالة اللغة): المتصفح بيضيف **Web APIs** ([[document]] و [[fetch]] و [[localStorage]] و [[setTimeout]] و [[URL]])، ومواصفاتها من WHATWG و W3C. و **Node** بيضيف [[process]] و [[Buffer]] و [[require]] و modules [[node:fs]] و [[node:http]]، ومعاها كمان أغلب الـ Web APIs المهمة ([[fetch]] و [[URL]] و [[structuredClone]]).
• **الـ engine** (JS engine): البرنامج اللي بيقرا الكود وينفّذه: **V8** (Chrome و Edge و Node و Deno)، و **SpiderMonkey** (Firefox)، و **JavaScriptCore** (Safari و Bun).

فلما feature مش شغالة، السؤال الصح: هي جاية منين؟ لو ECMAScript: أي نسخة engine فيها؟ لو Web API: البيئة دي فيها؟ ولو Node API: انت في المتصفح أصلًا؟`,
          example: R`// نفس السؤال في Node وفي المتصفح: الاسم ده موجود ولا لأ؟
const names = ["Array", "Promise", "JSON", "Intl", "setTimeout", "fetch", "URL", "structuredClone", "document", "window", "localStorage", "process", "Buffer"];
const kind = (n) => typeof globalThis[n];
const where = Object.fromEntries(names.map((n) => [n, kind(n)]));
console.log(where);
console.log(typeof require, typeof import.meta.dirname, typeof navigator);
console.log(process.versions.node, process.versions.v8);`,
          try: R`شغّل نفس الكود في Node وفي Console بتاع المتصفح (من غير سطور [[import.meta]] و [[process]] في المتصفح)، وقارن الـ [[typeof]] لكل اسم. وبعدين صنّف كل اسم: ECMAScript ولا Web API ولا Node.`,
          sol: R`~~~text الناتج (Node 24.22): node d8.mjs
{
  Array: 'function',
  Promise: 'function',
  JSON: 'object',
  Intl: 'object',
  setTimeout: 'function',
  fetch: 'function',
  URL: 'function',
  structuredClone: 'function',
  document: 'undefined',
  window: 'undefined',
  localStorage: 'undefined',
  process: 'object',
  Buffer: 'function'
}
undefined string object
24.22.1 13.6.233.17-node.58
~~~

~~~text الناتج (Chrome 157، نفس الأسماء + require)
{"Array":"function","JSON":"object","Promise":"function","Intl":"object","setTimeout":"function","fetch":"function","URL":"function","structuredClone":"function","document":"object","window":"object","localStorage":"object","process":"undefined","Buffer":"undefined","require":"undefined"}
~~~

| الاسم | جاي منين | Node 24 | Chrome |
|---|---|---|---|
| [[Array]] و [[Promise]] و [[JSON]] | ECMAScript (ECMA-262) | ✓ | ✓ |
| [[Intl]] | ECMAScript Intl (ECMA-402) | ✓ | ✓ |
| [[setTimeout]] و [[fetch]] و [[URL]] و [[structuredClone]] | Web APIs (WHATWG)، و Node عامل نسخته | ✓ | ✓ |
| [[document]] و [[window]] و [[localStorage]] | Web APIs للمتصفح بس | ✗ | ✓ |
| [[process]] و [[Buffer]] | Node APIs | ✓ | ✗ |
| [[require]] | Node، في CommonJS بس | ✗ في [[.mjs]] | ✗ |`,
          practice: [
            { lvl: 'سريع', t: R`**صنّف:** حط كل واحدة من دول في ECMAScript أو Web API أو Node API: [[Array.prototype.map]] و [[document.querySelector]] و [[fs.readFile]] و [[fetch]] و [[Promise.all]] و [[localStorage]] و [[process.argv]] و [[JSON.parse]] و [[setTimeout]] و [[RegExp.escape]] و [[Intl.NumberFormat]] و [[Buffer.from]].`, done: R`كل واحدة في مكانها، ولاحظت إن [[setTimeout]] و [[fetch]] Web APIs رغم إنهم في Node كمان.`, sol: R`| الـ API | جاي منين | ليه |
|---|---|---|
| [[Array.prototype.map]] و [[Promise.all]] و [[JSON.parse]] و [[RegExp.escape]] | ECMAScript (ECMA-262) | جزء من اللغة نفسها، موجودين في أي engine حديث |
| [[Intl.NumberFormat]] | ECMAScript Intl (ECMA-402) | مواصفة جنب اللغة، بس من نفس اللجنة |
| [[document.querySelector]] و [[localStorage]] | Web APIs (DOM و HTML من WHATWG) | ليهم معنى في صفحة بس |
| [[fetch]] و [[setTimeout]] | Web APIs (Fetch و HTML من WHATWG) | اتعملوا للمتصفح، و Node عمل نسخه منهم بنفس الشكل |
| [[fs.readFile]] و [[process.argv]] و [[Buffer.from]] | Node APIs | ملفات وعملية وبايتات: حاجات السيرفر |

**الفخ:** [[setTimeout]] مش في ECMAScript، رغم إنه في كل حتة. عشان كده سلوكه بيختلف بسيط بين المتصفح و Node: في Node بيرجّع object ([[Timeout]])، وفي المتصفح بيرجّع رقم.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[makeStore()]] بترجّع storage فيه [[getItem]] و [[setItem]]: لو [[localStorage]] موجود تستخدمه، وإلا Map في الذاكرة. اسأل عن الـ **feature** ([[typeof globalThis.localStorage?.getItem === "function"]]) مش عن اسم البيئة. شغّله في Node وفي المتصفح.`, done: R`في Node بيطبع [[1 false]] (Map)، وفي Chrome [[1 true]] (localStorage)، ونفس الكود من غير ولا [[if (isNode)]].`, sol: R`~~~js pd8.mjs
// تخزين بيشتغل في المتصفح و Node: بنسأل عن الـ feature مش عن البيئة
function makeStore() {
  if (typeof globalThis.localStorage?.getItem === "function") return globalThis.localStorage;
  const mem = new Map();
  return {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
  };
}
const store = makeStore();
store.setItem("visits", Number(store.getItem("visits") ?? 0) + 1);
console.log(store.getItem("visits"), store === globalThis.localStorage);
~~~

~~~text الناتج (Node 24.22)
1 false
~~~

~~~text الناتج (Chrome 157، نفس الدالة في الـ Console)
1 true
~~~

- [[globalThis]]: اسم الـ global object في أي بيئة ([[window]] في الصفحة، و [[global]] في Node، و [[self]] في الـ workers). من ES2020.
- **feature detection** أحسن من **runtime detection**: Node بقى فيه [[fetch]] و [[navigator]] (التمرين الجاي)، فـ [[typeof window === "undefined"]] كفحص «أنا في Node» بيبوظ بمرور الوقت.
- النسخة اللي في الذاكرة بتحوّل القيم لنصوص زي [[localStorage]] بالظبط ([[String(v)]])، عشان الكود اللي بيستخدمها ميتفاجئش.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** اعرف نسخة الـ engine في Node ([[process.versions]]) وفي Chrome (صفحة [[chrome://version]] أو [[navigator.userAgent]])، وجرّب [[node -p "navigator.userAgent"]]. وبعدين دوّر في MDN على صفحة [[RegExp.escape]] وشوف جدول الـ compatibility: أنهي نسخ Chrome و Firefox و Safari و Node فيها؟`, done: R`لقيت V8 [[13.6.233.17-node.58]] في Node 24.22 و [[Chrome/157.0.0.0]]، وإن Node فيه [[navigator]] وبيرجّع [[Node.js/24]]، وقريت جدول MDN.`, sol: R`~~~bash
node -p "process.versions.v8"
node -p "navigator.userAgent + ' | ' + navigator.hardwareConcurrency"
~~~

~~~text الناتج (Node 24.22)
13.6.233.17-node.58
Node.js/24 | 16
~~~

~~~text الناتج (Chrome 157، Console): navigator.userAgent
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36
~~~

- Node 24 مبني على V8 13.6، فأي feature في V8 13.6 موجودة فيه (من غير flags). عشان كده [[RegExp.escape]] و [[using]] و [[JSON.rawJSON]] شغالين في الاتنين.
- [[navigator]] في Node (من Node 21) فيه [[userAgent]] و [[hardwareConcurrency]] و [[language]]. Web API تاني اتنقل للسيرفر.
- الـ userAgent بتاع Chrome فيه «Safari» و «AppleWebKit» و «Mozilla» لأسباب تاريخية: متعرفش المتصفح من كلمة واحدة فيه.
- جدول MDN لـ [[RegExp.escape]] (من صفحته، مش متجرّب هنا لكل متصفح): Chrome 136 و Firefox 134 و Safari 18.2، و Node 24 (اللي جرّبناه). يعني Baseline من 2025.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك كتب [[import fs from "fs"]] في ملف بيتحمّل في الصفحة، وفي ملف تاني [[document.querySelector]] في سكربت Node، والاتنين وقعوا. اشرح له في ٣ سطور ليه، والقاعدة اللي تمنع ده.`, done: R`السطور بتقول إن [[fs]] Node API والمتصفح مفيهوش، و [[document]] Web API و Node مفيهوش (ReferenceError)، وإن الحل تعرف كل API جاي من أنهي طبقة وتفصل الكود المشترك عن الكود الخاص بالبيئة.`, sol: R`~~~bash
node -e "document.querySelector('h1')"
~~~

~~~text الناتج (Node 24.22، أول سطر في الرسالة)
ReferenceError: document is not defined
~~~

**الـ ٣ سطور:**
1. JavaScript نفسها (ECMAScript) مفيهاش ملفات ولا صفحات. [[fs]] جاي من **Node**، و [[document]] جاي من **المتصفح**، وكل واحد مش موجود في التاني: في Node [[ReferenceError: document is not defined]]، وفي المتصفح [[import fs from "fs"]] بيفشل لأن مفيش module بالاسم ده (والمتصفح مبيقراش ملفات جهازك أصلًا).
2. الكود اللي بيستخدم ECMAScript بس ([[map]] و [[Promise]] و [[JSON]] و [[Intl]]) بيشتغل في الاتنين، ومعاه الـ Web APIs اللي Node عمل نسخها ([[fetch]] و [[URL]]).
3. القاعدة: افصل «المنطق» (حسابات، validation، formatting) في ملفات ECMAScript بس، والـ I/O (ملفات، DOM) في ملفات خاصة بالبيئة. وأي حاجة مشتركة: feature detection زي [[makeStore]].` },
          ],
          flag: "script",
          deep: {
            why: R`أغلب الأسئلة «ليه ده مش شغال؟» إجابتها «الحاجة دي مش من اللغة، دي من بيئة تانية»: [[require]] في المتصفح، و [[document]] في Node، و [[window]] في worker، و feature جديدة في Safari قديم. ولما تعرف الطبقات تعرف تدوّر صح: مواصفة ECMAScript ولا Web API ولا وثائق Node، وتقرا جدول الـ compatibility في MDN، وتعرف إن TypeScript (الكورس الجاي بعد React) بيضيف types فوق ECMAScript بس.`,
            how: R`**ECMA-262** (ECMAScript) بتعرّف: الـ grammar (literals و statements و expressions)، والـ built-in objects، وإزاي الكود بيتنفّذ (scopes و jobs). بتطلع كل يونيو، وأي feature بتمشي ٤ مراحل في TC39 (stage 0 لحد 4) قبل ما تدخل. والـ engine بيطبّقها: V8 (C++، من Google) و SpiderMonkey (Mozilla) و JavaScriptCore (Apple). الـ engine فيه parser و interpreter و JIT compiler و GC.

**الـ host** بيدّي الـ engine الـ global object وكل حاجة تكلّم العالم: المتصفح (Chromium أو Firefox أو WebKit) بيضيف الـ DOM و [[fetch]] و timers والـ event loop نفسه (HTML spec). و Node بيضيف libuv (الـ event loop والـ I/O) و modules زي [[node:fs]]. و Deno و Bun hosts تانيين. فـ [[setTimeout]] و [[console]] و الـ event loop مش في ECMAScript خالص، وكل host عاملهم بطريقته (عشان كده ترتيب الـ timers بيختلف شوية بين Node والمتصفح).

ونسخة الـ engine بتحدد الـ features: Node 24 = V8 13.6. ولو feature لسه مش في V8 بتاعك: polyfill (كود بيعمل نفس الشيء) أو transpiler (Babel أو TypeScript بيحوّل الـ syntax الجديد لقديم).`,
            when: R`كل مرة تستخدم API: اعرف هو من أنهي طبقة (MDN بيقولك فوق الصفحة: «JavaScript reference» ولا «Web APIs»، و Node ليه وثائقه). وقبل ما تكتب كود هيشتغل في أكتر من بيئة (مكتبة، أو كود مشترك بين الـ frontend والـ backend): افصل المنطق عن الـ I/O واستخدم feature detection. وقبل ما تستخدم feature جديدة في المتصفح: جدول الـ compatibility أو Baseline.`,
            mistakes: R`تفتكر [[setTimeout]] و [[console]] و [[fetch]] جزء من اللغة. و [[typeof window !== "undefined"]] كفحص «أنا في المتصفح» (بيبوظ في workers و SSR و Deno). وتستخدم feature جديدة عشان شغالة في Chrome من غير ما تبص على Safari. وتسأل «JavaScript بتعمل كذا؟» وانت تقصد «المتصفح» أو «Node». وتقرا مقالة عن «ES2025» وتفتكر كل الـ engines فيها كل حاجة على طول.`
          },
          teach: R`## الفكرة في سطر

نفس سطر الكود ممكن يشتغل في Node ويقع في المتصفح أو العكس، لأن «JavaScript» = **لغة** + **بيئة** + **engine**. المثال بيسأل البيئة «الاسم ده عندك؟». الناتج من Node 24.22، والمقارنة من Chrome 157.

---

## ١. ECMAScript و JS engine و host: مين بيعمل إيه

| الطبقة | فيها إيه | مواصفتها | أمثلة اتعلمتها |
|---|---|---|---|
| ECMAScript (اللغة) | الـ syntax والـ built-ins | ECMA-262 (TC39)، نسخة كل سنة | [[class]] و [[async]] و regex و [[Map]] و [[Promise]] و [[JSON.rawJSON]] و [[WeakRef]] و [[using]] |
| ECMAScript Intl | التواريخ والأرقام بكل اللغات | ECMA-402 | [[Intl.NumberFormat]] و [[Intl.DateTimeFormat]] |
| Web APIs (المتصفح) | الصفحة والشبكة والتخزين والـ timers | WHATWG و W3C | [[document]] و [[fetch]] و [[localStorage]] و [[URL]] و [[setTimeout]] |
| Node APIs | الملفات والعمليات والشبكة على السيرفر | وثائق Node.js | [[process]] و [[Buffer]] و [[node:fs]] و [[require]] |
| JS engine | بيقرا الكود وينفّذه | (برنامج، مش مواصفة) | V8 و SpiderMonkey و JavaScriptCore |

---

## ٢. نسأل البيئة

~~~js app.mjs
const names = ["Array", "Promise", "JSON", "Intl", "setTimeout", "fetch", "URL", "structuredClone", "document", "window", "localStorage", "process", "Buffer"];
const kind = (n) => typeof globalThis[n];
const where = Object.fromEntries(names.map((n) => [n, kind(n)]));
console.log(where);
~~~

- [[globalThis]]: الـ global object في أي بيئة. كل الأسامي «العالمية» خصايص عليه.
- [[kind(n)]] بترجّع [[typeof globalThis[n]]]: [["undefined"]] لو الاسم مش موجود، من غير ما يرمي (قراية متغير مش موجود مباشرة كانت هترمي ReferenceError).
- [[Object.fromEntries]] بيحوّل الـ pairs لـ object عشان الطباعة.

~~~text الناتج (Node 24.22)
{
  Array: 'function',
  Promise: 'function',
  JSON: 'object',
  Intl: 'object',
  setTimeout: 'function',
  fetch: 'function',
  URL: 'function',
  structuredClone: 'function',
  document: 'undefined',
  window: 'undefined',
  localStorage: 'undefined',
  process: 'object',
  Buffer: 'function'
}
~~~

وفي Chrome 157 (نفس الكود في الـ Console): [[document]] و [[window]] و [[localStorage]] بـ [["object"]]، و [[process]] و [[Buffer]] بـ [["undefined"]]، والباقي زي Node. يعني:

- اللغة (Array و Promise و JSON و Intl) **في الاتنين**.
- Web APIs زي [[fetch]] و [[URL]] و [[setTimeout]] و [[structuredClone]] **في الاتنين** (Node عمل نسخه).
- الصفحة ([[document]]) في المتصفح بس، والسيرفر ([[process]]) في Node بس.

---

## ٣. CommonJS و ESM و [[navigator]]

~~~js app.mjs
console.log(typeof require, typeof import.meta.dirname, typeof navigator);
~~~

~~~text الناتج (Node 24.22، ملف .mjs)
undefined string object
~~~

- [[require]] مش موجودة في [[.mjs]]: هي من نظام CommonJS بتاع Node، مش global حقيقي. جرّبنا نفس السؤال في ملف [[.cjs]]: [[typeof require]] و [[typeof module]] و [[typeof __dirname]] طلعوا [[function object string]].
- [[import.meta.dirname]]: البديل في ESM (Node 20.11+).
- [[navigator]] بـ [["object"]] في Node! من Node 21 فيه [[navigator]] global ([[navigator.userAgent]] = [["Node.js/24"]]). فـ [[typeof navigator]] **مبقاش** طريقة تعرف بيها إنك في متصفح.

---

## ٤. الـ engine ونسخته

~~~js app.mjs
console.log(process.versions.node, process.versions.v8);
~~~

~~~text الناتج
24.22.1 13.6.233.17-node.58
~~~

Node 24.22 مبني على V8 13.6. ده اللي بيحدد أنهي features في اللغة شغالة: كل حاجة جديدة اتعلمتها في الكورس ده ([[RegExp.escape]] و الـ regex modifiers و [[JSON.rawJSON]] و [[using]]) موجودة فيه لأن V8 13.6 فيه. وفي المتصفح نسخة الـ engine = نسخة المتصفح (Chrome 157 فيه V8 بتاعه).

| الـ JS engine | مين | بيشغّل |
|---|---|---|
| V8 | Google | Chrome و Edge و Opera و Node و Deno |
| SpiderMonkey | Mozilla | Firefox |
| JavaScriptCore | Apple | Safari (وكل متصفحات iPhone) و Bun |

---

## ٥. خريطة الكورس: كل حاجة اتعلمتها جاية منين

| اتعلمتها في | من ECMAScript | من الـ host |
|---|---|---|
| أساسيات البرمجة والقيم والدوال | كله | [[console.log]] (host) و [[prompt]] (المتصفح) |
| الـ DOM والأحداث | | كله Web APIs |
| async: [[Promise]] و [[await]] | [[Promise]] و [[async]] | [[fetch]] و [[setTimeout]] و الـ event loop (host) |
| modules | [[import]] و [[export]] و import attributes (الشكل) | تحميل الملفات وأنواعها و [[require]] (host) |
| الأخطاء | [[Error]] وأنواعه و [[cause]] و [[AggregateError]] | [[stack]] و [[Error.captureStackTrace]] (V8) و [[unhandledrejection]] |
| regex والنصوص والأرقام والتواريخ | كله، و [[Intl]] من ECMA-402 | |
| الذاكرة | [[WeakRef]] و [[FinalizationRegistry]] | الـ GC نفسه (engine) و [[--expose-gc]] (Node) |

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| feature مش شغالة | اعرف هي من أنهي طبقة الأول (MDN بيقولك) |
| ECMAScript ومش شغالة | نسخة الـ engine قديمة: حدّث، أو polyfill، أو transpiler |
| Web API ومش شغالة في Node | Node معملهاش: ابحث عن البديل في وثائق Node |
| كود هيشتغل في أكتر من بيئة | feature detection ([[typeof globalThis.x]])، مش «أنا فين» |`,
          lines: [
            R`أسامي من الـ ٣ طبقات: ECMAScript ([[Array]] و [[Promise]] و [[JSON]] و [[Intl]])، و Web APIs، والمتصفح بس، و Node بس.`,
            R`[[kind(n)]] بترجّع [[typeof globalThis[n]]]: نوع الاسم لو موجود، و [["undefined"]] من غير error لو مش موجود.`,
            R`لكل اسم pair من الاسم ونوعه، و [[Object.fromEntries]] بيحوّل الـ pairs لـ object واحد نطبعه.`,
            R`في Node: اللغة والـ Web APIs المشتركة موجودين، و [[document]] و [[window]] و [[localStorage]] [["undefined"]]، و [[process]] و [[Buffer]] موجودين.`,
            R`[[require]] مش موجودة في [[.mjs]] (CommonJS بس)، و [[import.meta.dirname]] البديل، و [[navigator]] موجود في Node من 21.`,
            R`نسخة Node ونسخة V8 اللي جواه: [[24.22.1]] و [[13.6.233.17-node.58]]. الـ V8 هو اللي بيحدد features اللغة المتاحة.`,
          ],
          ref: [
            { t: "MDN: JavaScript technologies overview", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/JavaScript_technologies_overview" },
            { t: "ECMAScript (ECMA-262)", url: "https://tc39.es/ecma262/" },
            { t: "MDN: globalThis", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis" },
            { t: "MDN: Web APIs", url: "https://developer.mozilla.org/en-US/docs/Web/API" },
            { t: "Node.js: Globals", url: "https://nodejs.org/api/globals.html" },
          ],
          pre: [{ to: "js/CommonJS و ESM", why: R`[[require]] ضد [[import]] ومين بيوفّر كل واحد` }],
        },
      ],
    }
]);
