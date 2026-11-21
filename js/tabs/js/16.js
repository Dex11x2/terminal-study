// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الأخطاء",
      l: 2,
      n: "try و catch و finally، وأنواع الـ errors، و errors مخصصة بـ cause و AggregateError، والأخطاء العامة اللي محدش مسكها",
      pre: [
        { to: "js/اقرا الـ error", why: R`هنا بنمسك الـ errors ونرميها بنفسنا، فلازم تعرف تقرا الاسم والرسالة والـ stack الأول` },
        { to: "js/class", why: R`الـ custom errors كلها [[class]] و [[constructor]]` },
        { to: "js/extends و super", why: R`[[class AppError extends Error]] و [[super(message, { cause })]] هما أساس درس custom errors` },
        { to: "js/import و export", why: R`المشاريع بتحط عيلة الـ errors في ملف [[errors.js]] وتستوردها في كل حتة` },
      ],
      projects: [
        { lvl: 'صغير', dir: "signup-validation", t: R`فاحص فورم بيقول كل الغلطات مرة واحدة`, what: R`[[validateSignup(data)]] بتفحص [[name]] و [[email]] و [[age]]، ولو فيه غلط واحد أو أكتر بترمي [[ValidationError]] واحد فيه [[fields]] (لكل حقل رسالته بالعربي)، ولو كله سليم بترجّع object نضيف (الاسم من غير مسافات في الأطراف، والسن رقم). وفورم في صفحة بيعرض كل رسالة تحت حقلها. من درسي الوحدة.`, done: R`[[validateSignup({ name: " ", email: "x", age: "abc" })]] بترمي error واحد و [[Object.keys(e.fields).length]] بيدّي 3، و [[e instanceof ValidationError]] بيدّي true. والبيانات السليمة بترجّع [[age]] كرقم مش string، والفورم بيمسح الرسالة لما الحقل يتصلّح.`, sol: R`## الشكل النهائي

~~~view 470 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تسجيل حساب</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 420px; }
  label { display: block; margin-top: 12px; font-weight: 600; }
  input { font: inherit; width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #888; border-radius: 6px; }
  input[aria-invalid="true"] { border-color: #b91c1c; background: #fef2f2; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1.4em; margin: 2px 0 0; }
  button { font: inherit; margin-top: 16px; padding: 8px 20px; }
  #result { color: #15803d; white-space: pre-wrap; }
</style>
</head>
<body>
<form id="signup" novalidate>
  <label for="name">الاسم</label>
  <input id="name" name="name" aria-describedby="name-err" autocomplete="name">
  <p class="err" id="name-err"></p>

  <label for="email">الإيميل</label>
  <input id="email" name="email" aria-describedby="email-err" autocomplete="email">
  <p class="err" id="email-err"></p>

  <label for="age">السن</label>
  <input id="age" name="age" aria-describedby="age-err" inputmode="numeric">
  <p class="err" id="age-err"></p>

  <button>سجّل</button>
</form>
<p id="result"></p>

<script>
  class ValidationError extends Error {
    constructor(fields) {
      super("البيانات فيها " + Object.keys(fields).length + " غلط");
      this.name = "ValidationError";
      this.fields = fields;
    }
  }

  function validateSignup(data) {
    const fields = {};
    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const ageText = String(data.age ?? "").trim();
    const age = Number(ageText);

    if (name.length < 2) fields.name = "اكتب اسمك (حرفين على الأقل)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = "الإيميل شكله غلط، زي sara@mail.com";
    if (ageText === "" || !Number.isInteger(age)) fields.age = "السن لازم يبقى رقم صحيح";
    else if (age < 13 || age > 120) fields.age = "السن لازم يبقى من 13 لـ 120";

    if (Object.keys(fields).length > 0) throw new ValidationError(fields);
    return { name, email: email.toLowerCase(), age };
  }

  const form = document.querySelector("#signup");
  const result = document.querySelector("#result");

  function showErrors(fields) {
    for (const input of form.querySelectorAll("input")) {
      const msg = fields[input.name] ?? "";
      document.querySelector("#" + input.name + "-err").textContent = msg;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    result.textContent = "";
    try {
      const clean = validateSignup(Object.fromEntries(new FormData(form)));
      showErrors({});
      result.textContent = "تمام: " + JSON.stringify(clean);
    } catch (err) {
      if (!(err instanceof ValidationError)) throw err;
      showErrors(err.fields);
    }
  });

  // الحقل اللي عليه غلط: أول ما يتصلّح الرسالة بتاعته تتمسح
  form.addEventListener("input", (e) => {
    const input = e.target;
    if (input.getAttribute("aria-invalid") !== "true") return;
    try {
      validateSignup(Object.fromEntries(new FormData(form)));
      showErrors({});
    } catch (err) {
      if (!(err instanceof ValidationError)) throw err;
      if (!err.fields[input.name]) {
        document.querySelector("#" + input.name + "-err").textContent = "";
        input.setAttribute("aria-invalid", "false");
      }
    }
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

فورم فيه ٣ حقول. لو دوست «سجّل» والبيانات فيها أكتر من غلط، **كل** الرسايل بتظهر مرة واحدة، كل واحدة تحت حقلها والحقل بيتلوّن أحمر. وأول ما تصلّح حقل، رسالته بتختفي وانت بتكتب من غير ما تدوس تاني. والبيانات السليمة بتطلع object نضيف: الاسم من غير مسافات في الأطراف، والإيميل حروف صغيرة، والسن **رقم**.

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تسجيل حساب</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 420px; }
  label { display: block; margin-top: 12px; font-weight: 600; }
  input { font: inherit; width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #888; border-radius: 6px; }
  input[aria-invalid="true"] { border-color: #b91c1c; background: #fef2f2; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1.4em; margin: 2px 0 0; }
  button { font: inherit; margin-top: 16px; padding: 8px 20px; }
  #result { color: #15803d; white-space: pre-wrap; }
</style>
</head>
<body>
<form id="signup" novalidate>
  <label for="name">الاسم</label>
  <input id="name" name="name" aria-describedby="name-err" autocomplete="name">
  <p class="err" id="name-err"></p>

  <label for="email">الإيميل</label>
  <input id="email" name="email" aria-describedby="email-err" autocomplete="email">
  <p class="err" id="email-err"></p>

  <label for="age">السن</label>
  <input id="age" name="age" aria-describedby="age-err" inputmode="numeric">
  <p class="err" id="age-err"></p>

  <button>سجّل</button>
</form>
<p id="result"></p>

<script>
  class ValidationError extends Error {
    constructor(fields) {
      super("البيانات فيها " + Object.keys(fields).length + " غلط");
      this.name = "ValidationError";
      this.fields = fields;
    }
  }

  function validateSignup(data) {
    const fields = {};
    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const ageText = String(data.age ?? "").trim();
    const age = Number(ageText);

    if (name.length < 2) fields.name = "اكتب اسمك (حرفين على الأقل)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = "الإيميل شكله غلط، زي sara@mail.com";
    if (ageText === "" || !Number.isInteger(age)) fields.age = "السن لازم يبقى رقم صحيح";
    else if (age < 13 || age > 120) fields.age = "السن لازم يبقى من 13 لـ 120";

    if (Object.keys(fields).length > 0) throw new ValidationError(fields);
    return { name, email: email.toLowerCase(), age };
  }

  const form = document.querySelector("#signup");
  const result = document.querySelector("#result");

  function showErrors(fields) {
    for (const input of form.querySelectorAll("input")) {
      const msg = fields[input.name] ?? "";
      document.querySelector("#" + input.name + "-err").textContent = msg;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    result.textContent = "";
    try {
      const clean = validateSignup(Object.fromEntries(new FormData(form)));
      showErrors({});
      result.textContent = "تمام: " + JSON.stringify(clean);
    } catch (err) {
      if (!(err instanceof ValidationError)) throw err;
      showErrors(err.fields);
    }
  });

  // الحقل اللي عليه غلط: أول ما يتصلّح الرسالة بتاعته تتمسح
  form.addEventListener("input", (e) => {
    const input = e.target;
    if (input.getAttribute("aria-invalid") !== "true") return;
    try {
      validateSignup(Object.fromEntries(new FormData(form)));
      showErrors({});
    } catch (err) {
      if (!(err instanceof ValidationError)) throw err;
      if (!err.fields[input.name]) {
        document.querySelector("#" + input.name + "-err").textContent = "";
        input.setAttribute("aria-invalid", "false");
      }
    }
  });
</script>
</body>
</html>
~~~

## كل حتة مهمة بتعمل إيه

- **[[class ValidationError extends Error]]:** بيشيل [[fields]]: object مفتاحه اسم الحقل وقيمته الرسالة. كده error **واحد** بيحمل كل الغلطات، بدل ما الدالة ترمي عند أول غلط واليوزر يصلّح واحدة واحدة.
- **[[validateSignup]] بتجمع وبعدين ترمي:** كل فحص بيضيف لـ [[fields]] ومبيرميش. في الآخر: لو [[Object.keys(fields).length > 0]] ترمي مرة واحدة، غير كده ترجّع البيانات النضيفة.
- **[[String(data.name ?? "")]]:** لو الحقل مش موجود خالص ([[undefined]]) يبقى نص فاضي بدل ما [[.trim()]] يقع.
- **السن:** [[Number(ageText)]] بيحوّل النص، و [[Number.isInteger]] بترفض [["abc"]] ([[NaN]]) و [["2.5"]]. وفحص النص الفاضي لوحده لأن [[Number("")]] بـ [[0]] مش NaN.
- **[[showErrors(fields)]]:** بتلف على كل الـ inputs وتكتب رسالة كل حقل أو تمسحها، و [[aria-invalid]] بيلوّن الحقل من الـ CSS ([[input[aria-invalid="true"]]]) وبيقول لقارئ الشاشة إن الحقل فيه غلط. و [[aria-describedby]] بيربط الرسالة بالحقل.
- **[[if (!(err instanceof ValidationError)) throw err]]:** الـ catch بيتعامل مع غلطات الفورم بس. لو فيه باج تاني (اسم دالة غلط مثلًا) بيترمي ويظهر في Console بدل ما يتبلع.
- **event [[input]] على الفورم كله:** listener واحد (event delegation). لو الحقل اللي بيتكتب فيه عليه غلط، بنعمل validate تاني، ولو الحقل ده بالذات مبقاش في [[err.fields]] بنمسح رسالته بس، ونسيب رسايل الحقول التانية زي ما هي.

## اتقاس في Chrome

ناديت الدالة مباشرة، وبعدين ملّيت الفورم زي اليوزر:

~~~text الناتج (Chrome headless)
keys: 3 | instanceof: true | البيانات فيها 3 غلط
fields: {"name":"اكتب اسمك (حرفين على الأقل)","email":"الإيميل شكله غلط، زي sara@mail.com","age":"السن لازم يبقى رقم صحيح"}
سليم: {"name":"Sara Ali","email":"sara@mail.com","age":27} | typeof age: number
سن 7: {"age":"السن لازم يبقى من 13 لـ 120"}
بعد submit غلط: name=«اكتب اسمك (حرفين على الأقل)» email=«الإيميل شكله غلط، زي sara@mail.com» age=«السن لازم يبقى رقم صحيح»
بعد تصليح الإيميل بس: name=«اكتب اسمك (حرفين على الأقل)» email=«» age=«السن لازم يبقى رقم صحيح»
بعد التصليح كله: name=«» email=«» age=«»
#result: تمام: {"name":"Sara","email":"sara@mail.com","age":27}
[chrome] 157
~~~

- [[Object.keys(e.fields).length]] بـ 3 و [[instanceof]] بـ [[true]] زي المطلوب.
- [[typeof age]] بـ [["number"]]: [[27]] مش [["27"]].
- بعد تصليح الإيميل بس، رسالته اختفت والاتنين التانيين فضلوا.

## الغلطة الشائعة

ترمي من جوه كل [[if]]: [[if (!name) throw new ValidationError(...)]]. كده اليوزر بيشوف أول غلط بس، يصلّحه، يدوس، يلاقي التاني. اجمع الأول وارمي مرة واحدة في الآخر.` },
        { lvl: 'صغير', t: R`عيلة errors لتطبيقك`, what: R`ملف [[errors.js]] فيه [[AppError]] و [[NotFoundError]] و [[ValidationError]] و [[AuthError]]، كل واحد بـ status، و [[toJSON()]] بترجّع [[name]] و [[message]] و [[status]] من غير stack. من درس custom errors و cause ودرس import و export.`, done: R`[[JSON.stringify(new NotFoundError("المنتج"))]] فيه [["المنتج مش موجود"]] و [[404]] (ومن غير toJSON الرسالة مبتظهرش خالص: جرّب). و [[instanceof AppError]] بيدّي true للأربعة، و [[err.name]] صح لكل واحد من غير ما تكتبه بإيدك في كل class.`, sol: R`## الشكل النهائي

~~~text الناتج: node main.js (Node 24)
NotFoundError    true {"name":"NotFoundError","message":"المنتج مش موجود","status":404}
ValidationError  true {"name":"ValidationError","message":"البيانات فيها غلط","status":400,"fields":{"email":"الإيميل ناقص"}}
AuthError        true {"name":"AuthError","message":"لازم تسجّل دخول الأول","status":401}
AppError         true {"name":"AppError","message":"حاجة غريبة حصلت","status":500}
Error عادي:       {"status":404}
NotFoundError: الطلب مش موجود
stack موجود بس مش في الـ JSON: string false
~~~

## هتشوف إيه

٤ أنواع errors، كل واحد [[instanceof AppError]] بـ [[true]]، واسمه صح لوحده، والـ JSON بتاعه فيه [[name]] و [[message]] و [[status]] (و [[fields]] للـ ValidationError) من غير stack. والـ [[Error]] العادي بنفس الخصايص طلع [[{"status":404}]] بس: الرسالة اختفت.

## الكود

~~~js errors.js
export class AppError extends Error {
  status = 500;

  constructor(message, options) {
    super(message, options);
    this.name = new.target.name;
  }

  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}

export class NotFoundError extends AppError {
  status = 404;

  constructor(what, options) {
    super(what + " مش موجود", options);
  }
}

export class ValidationError extends AppError {
  status = 400;

  constructor(fields, options) {
    super("البيانات فيها غلط", options);
    this.fields = fields;
  }

  toJSON() {
    return { ...super.toJSON(), fields: this.fields };
  }
}

export class AuthError extends AppError {
  status = 401;

  constructor(message = "لازم تسجّل دخول الأول", options) {
    super(message, options);
  }
}
~~~

~~~js main.js
import { AppError, NotFoundError, ValidationError, AuthError } from "./errors.js";

const errors = [
  new NotFoundError("المنتج"),
  new ValidationError({ email: "الإيميل ناقص" }),
  new AuthError(),
  new AppError("حاجة غريبة حصلت"),
];

for (const err of errors) {
  console.log(err.name.padEnd(16), err instanceof AppError, JSON.stringify(err));
}

// من غير toJSON: Error عادي بنفس الخصايص
const plain = new Error("المنتج مش موجود");
plain.status = 404;
console.log("Error عادي:      ", JSON.stringify(plain));

console.log(String(new NotFoundError("الطلب")));
console.log("stack موجود بس مش في الـ JSON:", typeof errors[0].stack, JSON.stringify(errors[0]).includes("at "));
~~~

وجنبهم [[package.json]] فيه [[{ "type": "module" }]].

## كل حتة مهمة بتعمل إيه

- **[[this.name = new.target.name]] في [[AppError]] بس:** [[new.target]] هو الكلاس اللي اتعمله [[new]] فعلًا، فـ [[new NotFoundError(...)]] بياخد [["NotFoundError"]] من غير ما تكتب الاسم في كل كلاس.
- **[[status = 404]] class field:** كل كلاس بيكتب الـ status بتاعه كـ field. الـ fields بتتعمل **بعد** ما [[super()]] يخلص، فـ [[status = 404]] في [[NotFoundError]] بيكتب فوق [[status = 500]] بتاع [[AppError]].
- **[[toJSON()]]:** [[JSON.stringify]] بيدوّر على method بالاسم ده، ولو لقاها بيحوّل اللي بترجّعه بدل الـ object نفسه. ومن غيرها، [[message]] مش enumerable فـ [[JSON.stringify]] بيتجاهلها (سطر الـ Error العادي).
- **[[{ ...super.toJSON(), fields: this.fields }]]:** الـ ValidationError بيزوّد [[fields]] على اللي الأب بيرجّعه، من غير ما يكرر الكود.
- **الـ stack مش في الـ JSON:** [[typeof stack]] بـ [["string"]] (موجود للّوج) بس الـ JSON مفيهوش [["at "]]. الـ stack فيه مسارات الملفات على السيرفر، ومينفعش يوصل لليوزر.
- **[[options]] بتتعدّى لـ [[super]]:** عشان [[new NotFoundError("المنتج", { cause: err })]] يشتغل.

## الغلطة الشائعة

تكتب [[constructor() { this.status = 404; super(...) }]]: [[this]] قبل [[super()]] بيرمي [[ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor]]. عشان كده الـ class field أسهل: مكانه محسوب لوحده بعد [[super]].` },
        { lvl: 'متوسط', t: R`قارئ إعدادات مبيقعش`, what: R`[[loadConfig(text)]] بتعمل JSON.parse جوه try، ولو بايظ ترمي [[ConfigError("ملف الإعدادات بايظ", { cause })]]، وبعدين تتأكد من [[port]] (رقم صحيح من 1 لـ 65535) و [[dbUrl]] (نص مش فاضي)، وتحط default لأي حقل اختياري. و [[main]] بيمسك الـ ConfigError ويطبع الرسالة والـ cause بس ويخرج بكود ١. من درسي الوحدة ووحدة الـ objects.`, done: R`JSON بايظ بيطبع «ملف الإعدادات بايظ» وتحتها رسالة الـ SyntaxError الأصلية. [[port: 70000]] و [[port: "80"]] كل واحد بيطبع رسالة فيها اسم الحقل. والإعدادات السليمة بترجّع object فيه الـ defaults. ومفيش stack trace بيوصل لليوزر في أي حالة.`, sol: R`## الشكل النهائي

~~~text الناتج: bash run-all.sh (Node 24)
$ node main.js configs/good.json
الإعدادات: {
  host: '127.0.0.1',
  logLevel: 'info',
  port: 8080,
  dbUrl: 'postgres://localhost/shop'
}
(exit 0)
$ node main.js configs/broken.json
✗ ملف الإعدادات بايظ
  السبب: Unexpected end of JSON input
(exit 1)
$ node main.js configs/big-port.json
✗ port لازم رقم صحيح من 1 لـ 65535، ولقيت 70000
(exit 1)
$ node main.js configs/string-port.json
✗ port لازم رقم صحيح من 1 لـ 65535، ولقيت "80"
(exit 1)
$ node main.js configs/empty-db.json
✗ dbUrl لازم يبقى نص مش فاضي
(exit 1)
$ node main.js configs/array.json
✗ ملف الإعدادات لازم يبقى object {}
(exit 1)
$ node main.js configs/override.json
الإعدادات: { host: '127.0.0.1', logLevel: 'debug', port: 80, dbUrl: 'x' }
(exit 0)
$ node main.js configs/nope.json
✗ مش قادر أقرا configs/nope.json
  السبب: ENOENT: no such file or directory, open 'C:\Users\ali\code\safe-config\configs\nope.json'
(exit 1)
~~~

## هتشوف إيه

٨ ملفات إعدادات: السليم بيرجّع object فيه الـ defaults ([[host]] و [[logLevel]])، واللي بيغيّر default بيكسب. وكل ملف بايظ بيطلّع سطر واحد مفهوم فيه اسم الحقل (والسبب الأصلي تحته لو فيه)، وكود خروج ١، ومفيش ولا stack trace.

## الكود

~~~js config.js
export class ConfigError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ConfigError";
  }
}

const DEFAULTS = { host: "127.0.0.1", logLevel: "info" };

export function loadConfig(text) {
  let raw;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    throw new ConfigError("ملف الإعدادات بايظ", { cause: err });
  }
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    throw new ConfigError("ملف الإعدادات لازم يبقى object {}");
  }

  if (!Number.isInteger(raw.port) || raw.port < 1 || raw.port > 65535) {
    throw new ConfigError($__btport لازم رقم صحيح من 1 لـ 65535، ولقيت $__{JSON.stringify(raw.port)}$__bt);
  }
  if (typeof raw.dbUrl !== "string" || raw.dbUrl.trim() === "") {
    throw new ConfigError("dbUrl لازم يبقى نص مش فاضي");
  }

  return { ...DEFAULTS, ...raw };
}
~~~

~~~js main.js
import { readFileSync } from "node:fs";
import { loadConfig, ConfigError } from "./config.js";

function readText(file) {
  try {
    return readFileSync(file, "utf8");
  } catch (err) {
    throw new ConfigError("مش قادر أقرا " + file, { cause: err });
  }
}

function main(file) {
  try {
    const config = loadConfig(readText(file));
    console.log("الإعدادات:", config);
  } catch (err) {
    if (!(err instanceof ConfigError)) throw err;
    console.error("✗ " + err.message);
    if (err.cause) console.error("  السبب: " + err.cause.message);
    process.exitCode = 1;
  }
}

main(process.argv[2] ?? "config.json");
~~~

~~~bash run-all.sh
for f in good broken big-port string-port empty-db array override nope; do
  echo "\$ node main.js configs/$f.json"
  node main.js configs/$f.json
  echo "(exit $?)"
done
~~~

وملفات التجربة في [[configs/]]:

~~~text configs
good.json         { "port": 8080, "dbUrl": "postgres://localhost/shop" }
broken.json       { "port": 8080, "dbUrl": 
big-port.json     { "port": 70000, "dbUrl": "x" }
string-port.json  { "port": "80", "dbUrl": "x" }
empty-db.json     { "port": 80, "dbUrl": "  " }
array.json        [1, 2]
override.json     { "port": 80, "dbUrl": "x", "logLevel": "debug" }
nope.json         (مش موجود)
~~~

## كل حتة مهمة بتعمل إيه

- **[[JSON.parse]] جوه try لوحده:** بنمسك الـ SyntaxError ونرمي [[ConfigError("ملف الإعدادات بايظ", { cause: err })]]. اليوزر بيشوف جملة مفهومة، والسبب التقني (فين بالظبط) موجود في [[err.cause.message]].
- **[[raw === null || typeof raw !== "object" || Array.isArray(raw)]]:** [[JSON.parse("[1, 2]")]] نجح، بس ده array مش إعدادات. و [[typeof null]] بـ [["object"]] فلازم فحص [[null]] لوحده.
- **[[Number.isInteger(raw.port)]]:** بترفض [["80"]] (نص) و [[80.5]] و [[NaN]] مرة واحدة، وبعدين المدى من 1 لـ 65535 (أعلى رقم port في TCP). و [[JSON.stringify(raw.port)]] في الرسالة بيبيّن الفرق بين [[80]] و [["80"]].
- **[[{ ...DEFAULTS, ...raw }]]:** الـ defaults الأول، وبعدين اللي في الملف يكتب فوقهم. فـ [[logLevel: "debug"]] كسبت.
- **[[main]]:** بيمسك [[ConfigError]] **بس**، ويطبع الرسالة والسبب على stderr، و [[process.exitCode = 1]]. أي error تاني (باج في الكود) بيترمي بالـ stack عشان المطوّر يشوفه.

## الغلطة اللي حصلت وأنا ببنيه

أول نسخة من [[main.js]] كانت بتعمل [[loadConfig(readFileSync(file, "utf8"))]] على طول. جرّبت ملف مش موجود:

~~~text الناتج (النسخة الأولى، node main.js configs/nope.json، أول ٣ سطور)
node:fs:483
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^
~~~

stack trace طويل وصل لليوزر، لأن [[ENOENT]] مش [[ConfigError]] فالـ catch رماه تاني. التصليح: [[readText]] بتلف غلط القراية في [[ConfigError("مش قادر أقرا ...", { cause })]]، فبقى سطرين مفهومين زي آخر حالة في الناتج فوق.` },
        { lvl: 'متوسط', t: R`wrapper للـ handlers`, what: R`[[handle(fn)]] بتاخد دالة async وترجّع دالة بترجّع دايمًا [[{ status, body }]]: لو نجحت 200 والنتيجة، ولو رمت AppError الـ status بتاعه ورسالته، ولو أي حاجة تانية 500 برسالة عامة، والـ error الأصلي بيتطبع في [[console.error]] بس. من درسي الوحدة.`, done: R`٤ handlers تجريبية (بتنجح، و NotFound، و Validation، وواحد فيه [[undefined.x]]) بيرجّعوا 200 و 404 و 400 و 500 بالترتيب، والـ 500 مفيهوش [[Cannot read properties]] في الـ body، والـ wrapper نفسه عمره ما بيرمي.`, sol: R`## الشكل النهائي

~~~text الناتج: node main.js 2>/dev/null (الـ stdout، Node 24)
ok           200 {"id":1,"name":"كوباية"}
notFound     404 {"name":"NotFoundError","message":"المنتج مش موجود","status":404}
validation   400 {"name":"ValidationError","message":"البيانات فيها غلط","status":400,"fields":{"name":"الاسم مطلوب"}}
bug          500 {"error":"حصل خطأ في السيرفر، جرّب كمان شوية"}
syncThrow    500 {"error":"حصل خطأ في السيرفر، جرّب كمان شوية"}
throwsString 500 {"error":"حصل خطأ في السيرفر، جرّب كمان شوية"}
~~~

~~~text الناتج: اللوج اللي على stderr (أول سطر من كل 500)
[500] TypeError: Cannot read properties of undefined (reading 'x')
[500] Error: sync
[500] نص مش Error
~~~

## هتشوف إيه

٦ handlers ملفوفين بـ [[handle]]، وكلهم رجّعوا [[{ status, body }]] من غير ولا واحد يرمي: 200 والبيانات، و 404 و 400 من الـ AppErrors برسايلهم، و 500 برسالة عامة للباج الحقيقي ([[undefined.x]])، ولدالة مش async بترمي، ولحد رمى string. وتفاصيل الـ 500 راحت لـ stderr بس.

## الكود

[[errors.js]] هو نفس ملف مشروع «عيلة errors لتطبيقك» (فيه [[AppError]] بـ [[status]] و [[toJSON()]]):

~~~js errors.js
export class AppError extends Error {
  status = 500;

  constructor(message, options) {
    super(message, options);
    this.name = new.target.name;
  }

  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}

export class NotFoundError extends AppError {
  status = 404;

  constructor(what, options) {
    super(what + " مش موجود", options);
  }
}

export class ValidationError extends AppError {
  status = 400;

  constructor(fields, options) {
    super("البيانات فيها غلط", options);
    this.fields = fields;
  }

  toJSON() {
    return { ...super.toJSON(), fields: this.fields };
  }
}

export class AuthError extends AppError {
  status = 401;

  constructor(message = "لازم تسجّل دخول الأول", options) {
    super(message, options);
  }
}
~~~

~~~js handle.js
import { AppError } from "./errors.js";

export function handle(fn) {
  return async (...args) => {
    try {
      const body = await fn(...args);
      return { status: 200, body };
    } catch (err) {
      if (err instanceof AppError) {
        return { status: err.status, body: err.toJSON() };
      }
      console.error("[500]", err);
      return { status: 500, body: { error: "حصل خطأ في السيرفر، جرّب كمان شوية" } };
    }
  };
}
~~~

~~~js main.js
import { handle } from "./handle.js";
import { NotFoundError, ValidationError } from "./errors.js";

const products = { 1: { id: 1, name: "كوباية" } };

const handlers = {
  ok: handle(async (id) => products[id]),
  notFound: handle(async (id) => {
    if (!products[id]) throw new NotFoundError("المنتج");
  }),
  validation: handle(async (body) => {
    if (!body.name) throw new ValidationError({ name: "الاسم مطلوب" });
  }),
  bug: handle(async () => {
    const order = undefined;
    return order.x;
  }),
  // حالات غريبة: دالة مش async بترمي، ودالة بترمي string
  syncThrow: handle(() => {
    throw new Error("sync");
  }),
  throwsString: handle(async () => {
    throw "نص مش Error";
  }),
};

const args = { ok: [1], notFound: [99], validation: [{}], bug: [], syncThrow: [], throwsString: [] };

for (const [name, h] of Object.entries(handlers)) {
  const res = await h(...args[name]);
  console.log(name.padEnd(12), res.status, JSON.stringify(res.body));
}
~~~

## كل حتة مهمة بتعمل إيه

- **[[handle(fn)]] بترجّع دالة جديدة:** دي higher-order function: بتاخد الـ handler الأصلي وترجّع نسخة ملفوفة بنفس الـ arguments ([[...args]]).
- **[[await fn(...args)]] جوه try:** الـ await بيحوّل الـ Promise المرفوض لـ throw يتمسك. ولو [[fn]] نفسها مش async ورمت فورًا (حالة [[syncThrow]])، الرمية بتحصل جوه الـ try برضه فبتتمسك.
- **[[err instanceof AppError]]:** errors احنا رميناها بقصد، رسالتها معمولة لليوزر، فبنبعتها بالـ status بتاعها وبـ [[toJSON()]].
- **أي حاجة تانية = 500:** الرسالة الأصلية ([[Cannot read properties of undefined]]) مبتظهرش في الـ body، لأنها بتكشف تفاصيل الكود. بتروح لـ [[console.error]] كاملة بالـ stack.
- **[[throw "نص مش Error"]]:** [[instanceof]] على string بـ [[false]] من غير ما يقع، فوصل للـ 500. لو كنا كتبنا [[err.status ?? 500]] كان هيشتغل برضه، بس [[err.message]] كانت هتبقى [[undefined]].

## الغلطة الشائعة

تكتب [[return fn(...args)]] من غير [[await]] جوه الـ try. الـ Promise بيرجع على طول، والـ try بيخلص قبل ما يترفض، فالـ catch عمره ما يشتغل والـ wrapper يرجّع Promise مرفوض بدل [[{ status: 500 }]]. الـ [[await]] هو اللي بيخلّي الرفض يحصل **جوه** الـ try.` },
        { lvl: 'كبير', t: R`مستورد CSV للطلاب`, what: R`[[importStudents(csvText)]] بتقسم السطور، وتتأكد إن الـ header هو [[name,age,email]]، وتفحص كل سطر بـ ValidationError فيه رقم السطر والحقل، وتكمّل لآخر الملف من غير ما تقف عند أول غلط، وترجّع [[{ imported, errors }]]. وأي error مش متوقع يتلف في [[ImportError]] بـ cause ويترمي. وفي الآخر تقرير: كام سطر اتقري وكام اتضاف وكل غلط في سطره. ومعاه [[test.js]] فيه ٥ حالات. من وحدات النصوص والـ arrays والـ classes والـ modules والوحدة دي.`, done: R`ملف سليم ← errors فاضية. ملف فيه سطرين غلط ← [[errors.length === 2]] وكل واحد فيه رقم السطر الصح (عادّ الـ header). ملف فاضي أو header غلط ← ValidationError واضح من غير ما يكمّل. سطر فيه فاصلة زيادة أو سطر فاضي في الآخر ← غلط مفهوم أو تجاهل، مش crash. والـ ٥ اختبارات بتطبع نجح.`, ext: R`خلّي الإيميل المكرر غلط، واعرض التقرير في صفحة فيها [[textarea]] تلزق فيها الـ CSV وجدول بالسطور الغلط باللون الأحمر.`, sol: R`## الشكل النهائي

~~~text الناتج: ٥ ملفات CSV (Node 24)
$ node cli.js samples/good.csv
اتقري 3 سطر، اتضاف 3، فيه 0 غلط
(exit 0)
$ node cli.js samples/two-bad.csv
اتقري 4 سطر، اتضاف 2، فيه 2 غلط
  سطر 3 (age): السن "abc" لازم رقم صحيح من 5 لـ 100
  سطر 4 (email): الإيميل "mona-at-mail" شكله غلط
(exit 1)
$ node cli.js samples/empty.csv
الملف مرفوض (سطر 1): الملف فاضي
(exit 1)
$ node cli.js samples/bad-header.csv
الملف مرفوض (سطر 1): أول سطر لازم يبقى "name,age,email"، ولقيت "Name;Age;Email"
(exit 1)
$ node cli.js samples/messy.csv
اتقري 3 سطر، اتضاف 1، فيه 2 غلط
  سطر 2: عدد الأعمدة 4 بدل 3
  سطر 3: سطر فاضي
(exit 1)
~~~

~~~text الناتج: node --test test.js (الأوقات اتشالت لأنها بتتغيّر)
✔ ملف سليم: الكل اتضاف ومفيش errors
✔ سطرين غلط: errors.length = 2 وأرقام السطور عادّة الـ header
✔ ملف فاضي أو header غلط: ValidationError على سطر 1 من غير ما يكمّل
✔ فاصلة زيادة غلط مفهوم، والسطور الفاضية في الآخر بتتجاهل، و CRLF شغال
✔ مدخل مش نص: ImportError والسبب الأصلي في cause
✔ التقرير: سطر الملخص وسطر لكل غلط
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
~~~

## هتشوف إيه

الملف السليم بيتقري كله. الملف اللي فيه سطرين غلط بيكمّل لآخره، ويضيف الصح (٢ من ٤)، ويقول رقم كل سطر غلط **عادّ الـ header** واسم الحقل والسبب. والملف الفاضي أو اللي الـ header بتاعه غلط بيترفض من أوله بسطر واحد. والسطر اللي فيه فاصلة زيادة غلط مفهوم، والسطور الفاضية في الآخر بتتجاهل.

## شجرة الملفات وترتيب البناء

~~~text
csv-import/
  package.json     { "type": "module" }
  errors.js        ValidationError (line و field) و ImportError
  importer.js      importStudents و report
  cli.js           يقرا ملف ويطبع التقرير وكود الخروج
  test.js          ٦ اختبارات بـ node --test
  samples/         ٥ ملفات للتجربة
~~~

اتبنى بالترتيب ده: [[errors.js]]، وبعدين [[importStudents]] على الملف السليم بس، وبعدين فحص كل حقل في [[checkRow]]، وبعدين الحالات الطرفية (فاضي، header غلط، أعمدة زيادة، سطور فاضية، CRLF)، وبعدين [[report]] و [[cli.js]]، والاختبارات مع كل خطوة.

## الكود

~~~js errors.js
export class ValidationError extends Error {
  constructor(message, { line = null, field = null } = {}) {
    super(message);
    this.name = "ValidationError";
    this.line = line;
    this.field = field;
  }
}

export class ImportError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ImportError";
  }
}
~~~

~~~js importer.js
import { ValidationError, ImportError } from "./errors.js";

const HEADER = ["name", "age", "email"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkRow(cols, line) {
  const problems = [];
  if (cols.length !== HEADER.length) {
    return [new ValidationError($__btعدد الأعمدة $__{cols.length} بدل $__{HEADER.length}$__bt, { line })];
  }
  const [name, ageText, email] = cols.map((c) => c.trim());
  const age = Number(ageText);
  if (name === "") problems.push(new ValidationError("الاسم فاضي", { line, field: "name" }));
  if (ageText === "" || !Number.isInteger(age) || age < 5 || age > 100) {
    problems.push(new ValidationError($__btالسن "$__{ageText}" لازم رقم صحيح من 5 لـ 100$__bt, { line, field: "age" }));
  }
  if (!EMAIL_RE.test(email)) problems.push(new ValidationError($__btالإيميل "$__{email}" شكله غلط$__bt, { line, field: "email" }));
  return problems.length ? problems : { name, age, email: email.toLowerCase() };
}

export function importStudents(csvText) {
  try {
    if (typeof csvText !== "string") throw new TypeError("المدخل لازم يبقى نص، جالي " + typeof csvText);

    const lines = csvText.replace(/^\uFEFF/, "").split(/\r?\n/);
    while (lines.length && lines.at(-1).trim() === "") lines.pop();
    if (lines.length === 0) throw new ValidationError("الملف فاضي", { line: 1 });

    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    if (header.join(",") !== HEADER.join(",")) {
      throw new ValidationError($__btأول سطر لازم يبقى "$__{HEADER.join(",")}"، ولقيت "$__{lines[0]}"$__bt, { line: 1 });
    }

    const imported = [];
    const errors = [];
    lines.slice(1).forEach((text, i) => {
      const line = i + 2;
      if (text.trim() === "") {
        errors.push(new ValidationError("سطر فاضي", { line }));
        return;
      }
      const result = checkRow(text.split(","), line);
      if (Array.isArray(result)) errors.push(...result);
      else imported.push(result);
    });

    return { read: lines.length - 1, imported, errors };
  } catch (err) {
    if (err instanceof ValidationError) throw err;
    throw new ImportError("الاستيراد وقف بسبب غلط مش متوقع", { cause: err });
  }
}

export function report({ read, imported, errors }) {
  const out = [$__btاتقري $__{read} سطر، اتضاف $__{imported.length}، فيه $__{errors.length} غلط$__bt];
  for (const e of errors) out.push($__bt  سطر $__{e.line}$__{e.field ? " (" + e.field + ")" : ""}: $__{e.message}$__bt);
  return out.join("\n");
}
~~~

~~~js cli.js
import { readFileSync } from "node:fs";
import { importStudents, report } from "./importer.js";
import { ValidationError } from "./errors.js";

const file = process.argv[2];
try {
  const result = importStudents(readFileSync(file, "utf8"));
  console.log(report(result));
  if (result.errors.length) process.exitCode = 1;
} catch (err) {
  if (err instanceof ValidationError) {
    console.error($__btالملف مرفوض (سطر $__{err.line}): $__{err.message}$__bt);
  } else {
    console.error("حصلت مشكلة:", err.message);
    if (err.cause) console.error("  السبب:", err.cause.message);
  }
  process.exitCode = 1;
}
~~~

~~~js test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { importStudents, report } from "./importer.js";
import { ValidationError, ImportError } from "./errors.js";

const csv = (...rows) => rows.join("\n");

test("ملف سليم: الكل اتضاف ومفيش errors", () => {
  const r = importStudents(csv("name,age,email", "Sara,21,Sara@Mail.com", "Omar,19,omar@mail.com"));
  assert.equal(r.errors.length, 0);
  assert.equal(r.imported.length, 2);
  assert.deepEqual(r.imported[0], { name: "Sara", age: 21, email: "sara@mail.com" });
});

test("سطرين غلط: errors.length = 2 وأرقام السطور عادّة الـ header", () => {
  const r = importStudents(csv("name,age,email", "Sara,21,s@m.co", "Omar,abc,o@m.co", "Mona,22,mona-at-mail", "Ali,30,a@m.co"));
  assert.equal(r.errors.length, 2);
  assert.deepEqual(r.errors.map((e) => [e.line, e.field]), [[3, "age"], [4, "email"]]);
  assert.ok(r.errors.every((e) => e instanceof ValidationError));
  assert.equal(r.imported.length, 2);
});

test("ملف فاضي أو header غلط: ValidationError على سطر 1 من غير ما يكمّل", () => {
  for (const text of ["", "\n\n", "Name;Age;Email\nSara;21;s@m.co"]) {
    assert.throws(() => importStudents(text), (e) => e instanceof ValidationError && e.line === 1);
  }
});

test("فاصلة زيادة غلط مفهوم، والسطور الفاضية في الآخر بتتجاهل، و CRLF شغال", () => {
  const r = importStudents("name,age,email\r\nSara,21,s@m.co,extra\r\nOmar,19,o@m.co\r\n\r\n\r\n");
  assert.equal(r.read, 2);
  assert.equal(r.errors.length, 1);
  assert.match(r.errors[0].message, /عدد الأعمدة 4 بدل 3/);
  assert.equal(r.imported.length, 1);
});

test("مدخل مش نص: ImportError والسبب الأصلي في cause", () => {
  assert.throws(
    () => importStudents(null),
    (e) => e instanceof ImportError && e.cause instanceof TypeError && /object/.test(e.cause.message),
  );
});

test("التقرير: سطر الملخص وسطر لكل غلط", () => {
  const r = importStudents(csv("name,age,email", ",21,s@m.co"));
  assert.equal(report(r), 'اتقري 1 سطر، اتضاف 0، فيه 1 غلط\n  سطر 2 (name): الاسم فاضي');
});
~~~

ملفات التجربة:

~~~text samples/good.csv
name,age,email
Sara Ali,21,sara@mail.com
Omar,19,omar@mail.com
Mona,22,mona@mail.com
~~~

~~~text samples/two-bad.csv
name,age,email
Sara Ali,21,sara@mail.com
Omar,abc,omar@mail.com
Mona,22,mona-at-mail
Khaled,20,khaled@mail.com
~~~

~~~text samples/bad-header.csv
Name;Age;Email
Sara;21;sara@mail.com
~~~

~~~text samples/messy.csv
name,age,email
Sara,21,sara@mail.com,extra

Omar,19,omar@mail.com
~~~

و [[samples/empty.csv]] ملف فاضي خالص (صفر bytes).

## كل حتة مهمة بتعمل إيه

- **نوعين errors:** [[ValidationError]] = غلط في **البيانات** (متوقع، رسالته لليوزر، وفيه [[line]] و [[field]]). [[ImportError]] = غلط مش متوقع في **الكود أو المدخل**، بيلف السبب الأصلي في [[cause]].
- **[[replace(/^\uFEFF/, "")]]:** Excel ساعات بيحط حرف BOM مخفي في أول الملف، فالـ header يبان [[name,age,email]] وهو مش كده. بنشيله قبل أي حاجة.
- **[[split(/\r?\n/)]]:** بيقسم على [[\n]] ومعاه [[\r]] لو موجود، فملفات ويندوز (CRLF) ولينكس الاتنين شغالين (الاختبار الرابع).
- **[[while (... lines.at(-1).trim() === "") lines.pop()]]:** يشيل السطور الفاضية من **الآخر** بس. السطر الفاضي في النص بيبقى غلط ([[سطر فاضي]]) لأنه غالبًا بيانات ناقصة.
- **[[const line = i + 2]]:** [[i]] بيبدأ من 0 على السطور اللي بعد الـ header، فأول سطر بيانات هو سطر 2 في الملف.
- **[[checkRow]] بترجّع يا object يا array أخطاء:** وبتجمع كل غلطات السطر (اسم وسن وإيميل)، فلو السطر فيه غلطتين يطلعوا الاتنين. وعدد الأعمدة الغلط بيوقّف فحص السطر ده بس، لأن الحقول متلخبطة.
- **الـ try/catch الكبير:** [[ValidationError]] بيعدّي زي ما هو (الملف الفاضي والـ header). أي حاجة تانية، زي [[TypeError]] من [[importStudents(null)]]، بتتلف في [[ImportError]] بـ [[cause]]، فاللي بينادي الدالة بيمسك نوعين بس.
- **كود الخروج في [[cli.js]]:** ١ لو فيه أي غلط أو الملف اترفض، فسكربت تاني يقدر يعرف من غير ما يقرا النص.

## اتقاس

- ٦ اختبارات عدّوا ([[pass 6]])، فيهم الـ ٥ حالات المطلوبة واختبار للتقرير.
- [[samples/two-bad.csv]] فيه سطر فاضي في الآخر، واتجاهل: [[اتقري 4 سطر]] مش 5.

## الغلطات اللي حصلت وإزاي اتصلحت

- **الاختبار نفسه كان غلط:** أول تشغيل لـ [[node --test]] طلّع [[fail 1]]: [[2 !== 3]] في اختبار «سطرين غلط». كنت كاتب إن ٣ سطور هتتضاف، والملف فيه ٤ سطور بيانات منهم ٢ غلط، يعني ٢ بس. الكود كان صح والاختبار هو اللي اتصلّح. الدرس: لما اختبار يفشل، اتأكد من الرقم المتوقع قبل ما تغيّر الكود.
- **الـ BOM:** كتبت [[\uFEFF]] في الـ regex، والأداة اللي كتبت بيها الملف حوّلت الـ escape للحرف المخفي نفسه، فالكود بقى فيه حرف مش باين. اكتشفته لما [[grep "uFEFF"]] ملقاش حاجة، وصلّحته. لو حرف مخفي دخل كودك، [[cat -A]] في الترمنال بيبيّنه.` },
        { lvl: 'فكرة', t: R`سياسة أخطاء لمشروعك`, what: R`خد مشروع من اللي عملتهم وحط فيه سياسة أخطاء: أنواع errors بتاعتك، ومكان واحد بيمسك ويقرر يعرض إيه لليوزر وإيه يتسجّل، و cause في كل مرة بتلف error.`, done: R`مفيش [[catch {}]] فاضي في المشروع كله، وكل رسالة بتظهر لليوزر مفهومة بالعربي، وكل error في اللوج فيه السبب الأصلي.`, ext: R`اعرض الأخطاء في الصفحة كـ toast بدل alert، وزوّد [[code]] ثابت لكل نوع (زي [[E_NOT_FOUND]]) عشان الواجهة تقرر من غير ما تقرا النص.`, sol: R`## الشكل النهائي

~~~text الناتج: node demo.js (Node 24؛ الـ errorId بيتغيّر كل تشغيل فكتبناه …)
POST /notes    200 {"id":1,"text":"اشتري لبن"}
GET  /notes/1  200 {"id":1,"text":"اشتري لبن"}
GET  /notes/9  404 {"code":"E_NOT_FOUND","message":"الملاحظة دي مش موجودة"}
POST /notes    400 {"code":"E_VALIDATION","message":"الـ body لازم يبقى JSON سليم"}
POST /notes    400 {"code":"E_VALIDATION","message":"اكتب نص الملاحظة"}
GET  /notes    503 {"code":"E_STORAGE","message":"ملف الملاحظات بايظ","errorId":"…"}
GET  /notes/1  500 {"code":"E_INTERNAL","message":"حصلت مشكلة عندنا، جرّب كمان شوية","errorId":"…"}
--- errors.log:
GET /notes StorageError: ملف الملاحظات بايظ  ←  SyntaxError: Expected property name or '}' in JSON at position 3 (line 1 column 4)
GET /notes/1 TypeError: (intermediate value).find is not a function
~~~

## النسخة النموذجية: API ملاحظات صغير بسياسة أخطاء

اخترنا API فيه ٣ endpoints ([[GET /notes]] و [[GET /notes/:id]] و [[POST /notes]]) بيحفظ في ملف JSON، لأنه فيه الـ ٣ أنواع اللي في أي مشروع: غلط من اليوزر، وغلط في التخزين، وباج في الكود.

| النوع | مين بيرميه | اليوزر بيشوف | بيتسجّل؟ |
|---|---|---|---|
| [[ValidationError]] (400) | الكود لما الـ input غلط | الرسالة نفسها | لأ |
| [[NotFoundError]] (404) | الكود لما الحاجة مش موجودة | الرسالة نفسها | لأ |
| [[StorageError]] (503) | [[store.js]] لما الملف يبوظ | رسالة عامة + [[errorId]] | أيوه بالسبب الأصلي |
| أي حاجة تانية (500) | باج | «حصلت مشكلة عندنا» + [[errorId]] | أيوه |

## الكود

~~~js errors.js
// كل error بنرميه بقصد: رسالة لليوزر بالعربي + code ثابت للواجهة + status للـ HTTP
export class AppError extends Error {
  status = 500;
  code = "E_INTERNAL";

  constructor(message, options) {
    super(message, options);
    this.name = new.target.name;
  }

  toJSON() {
    return { code: this.code, message: this.message };
  }
}

export class NotFoundError extends AppError {
  status = 404;
  code = "E_NOT_FOUND";
}

export class ValidationError extends AppError {
  status = 400;
  code = "E_VALIDATION";
}

export class StorageError extends AppError {
  status = 503;
  code = "E_STORAGE";
}
~~~

~~~js store.js
import { readFile, writeFile } from "node:fs/promises";
import { StorageError } from "./errors.js";

const FILE = new URL("./notes.json", import.meta.url);

export async function readNotes() {
  let text;
  try {
    text = await readFile(FILE, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw new StorageError("مش قادرين نقرا الملاحظات دلوقتي", { cause: err });
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new StorageError("ملف الملاحظات بايظ", { cause: err });
  }
}

export async function saveNotes(notes) {
  try {
    await writeFile(FILE, JSON.stringify(notes, null, 2));
  } catch (err) {
    throw new StorageError("مش قادرين نحفظ دلوقتي", { cause: err });
  }
}
~~~

~~~js log.js
import { appendFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const LOG = new URL("./errors.log", import.meta.url);

function chain(err) {
  const out = [];
  for (let e = err; e && out.length < 10; e = e.cause) {
    out.push(e instanceof Error ? { name: e.name, message: e.message, code: e.code } : { value: String(e) });
  }
  return out;
}

// بيسجّل الـ error بكل أسبابه وبيرجّع رقم يتبعت لليوزر عشان الدعم يلاقيه
export function logError(err, context) {
  const id = randomUUID().slice(0, 8);
  appendFileSync(LOG, JSON.stringify({ id, time: new Date().toISOString(), ...context, chain: chain(err) }) + "\n");
  return id;
}
~~~

~~~js server.js
import http from "node:http";
import { AppError, NotFoundError, ValidationError } from "./errors.js";
import { readNotes, saveNotes } from "./store.js";
import { logError } from "./log.js";

async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  try {
    return JSON.parse(body || "{}");
  } catch (err) {
    throw new ValidationError("الـ body لازم يبقى JSON سليم", { cause: err });
  }
}

async function route(req) {
  const { pathname } = new URL(req.url, "http://x");
  const match = pathname.match(/^\/notes\/(\d+)$/);

  if (req.method === "GET" && pathname === "/notes") return readNotes();
  if (req.method === "GET" && match) {
    const note = (await readNotes()).find((n) => n.id === Number(match[1]));
    if (!note) throw new NotFoundError("الملاحظة دي مش موجودة");
    return note;
  }
  if (req.method === "POST" && pathname === "/notes") {
    const { text } = await readJson(req);
    if (typeof text !== "string" || !text.trim()) throw new ValidationError("اكتب نص الملاحظة");
    const notes = await readNotes();
    const note = { id: (notes.at(-1)?.id ?? 0) + 1, text: text.trim() };
    await saveNotes([...notes, note]);
    return note;
  }
  throw new NotFoundError("الصفحة دي مش موجودة");
}

// المكان الوحيد اللي بيقرر: اليوزر يشوف إيه، وإيه يتسجّل
function sendError(res, err, req) {
  const known = err instanceof AppError;
  const status = known ? err.status : 500;
  const body = known ? err.toJSON() : { code: "E_INTERNAL", message: "حصلت مشكلة عندنا، جرّب كمان شوية" };
  if (!known || status >= 500) body.errorId = logError(err, { method: req.method, url: req.url });
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

export function createServer() {
  return http.createServer(async (req, res) => {
    try {
      const data = await route(req);
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(data));
    } catch (err) {
      sendError(res, err, req);
    }
  });
}
~~~

~~~js demo.js
import { writeFileSync, rmSync, readFileSync } from "node:fs";
import { createServer } from "./server.js";

rmSync(new URL("./notes.json", import.meta.url), { force: true });
rmSync(new URL("./errors.log", import.meta.url), { force: true });

const server = createServer().listen(0);
const base = "http://127.0.0.1:" + server.address().port;

async function call(method, path, body) {
  const res = await fetch(base + path, { method, body });
  console.log(method.padEnd(4), path.padEnd(9), res.status, await res.text());
}

await call("POST", "/notes", JSON.stringify({ text: "اشتري لبن" }));
await call("GET", "/notes/1");
await call("GET", "/notes/9");
await call("POST", "/notes", "{text:");
await call("POST", "/notes", JSON.stringify({ text: "  " }));
writeFileSync(new URL("./notes.json", import.meta.url), "[{ bad json");
await call("GET", "/notes");
// باج حقيقي: الملف object مش array، فـ find مش موجودة
writeFileSync(new URL("./notes.json", import.meta.url), JSON.stringify({ id: 1 }));
await call("GET", "/notes/1");
server.close();

console.log("--- errors.log:");
const log = readFileSync(new URL("./errors.log", import.meta.url), "utf8").trim().split("\n");
for (const line of log) {
  const e = JSON.parse(line);
  console.log(e.method, e.url, e.chain.map((c) => c.name + ": " + c.message).join("  ←  "));
}
~~~

## ليه التصميم ده

- **مكان واحد بيقرر ([[sendError]]):** كل route بيرمي وخلاص، ومحدش بيكتب [[res.writeHead(500)]] بإيده. لو حبيت تغيّر شكل الـ error بكرة، بتغيّره في دالة واحدة.
- **[[code]] ثابت جنب الرسالة:** الواجهة بتقرر بـ [[E_NOT_FOUND]] مش بالنص العربي، فتقدر تغيّر صياغة الرسالة من غير ما تكسر حاجة.
- **[[cause]] في كل لفّة:** [[store.js]] بيحوّل [[SyntaxError]] و أخطاء [[fs]] لـ [[StorageError]] مفهومة، بس السبب الأصلي جواها. اللوج طلّع السلسلة كاملة: [[StorageError ← SyntaxError ... position 3]].
- **[[errorId]] بس للي بيتسجّل:** اليوزر بيبعته للدعم، والدعم بيدوّر بيه في [[errors.log]]. الـ 400 والـ 404 مش بيتسجّلوا لأنهم مش مشكلة عندنا.
- **[[ENOENT]] مش غلط:** أول مرة الملف مش موجود، فـ [[readNotes]] بترجّع [[[]]]. ده قرار واعي ومكتوب في الكود، مش [[catch {}]] بيبلع كل حاجة.
- **مفيش [[catch {}]] فاضي:** اتأكدنا بـ grep:

~~~text الناتج: grep على catch فاضي
مفيش catch فاضي
~~~

## التصميم اللي اترفض

[[try/catch]] جوه كل route وكل واحد يقرر يرد بإيه. ده بيشتغل، بس كل route جديد بيكرر نفس الكود، وكل واحد ممكن يطلع بشكل error مختلف، وكفاية route واحد ينسى ويبعت [[err.message]] الأصلي في الـ 500 (اللي ممكن يبقى فيه مسار ملف على السيرفر زي رسالة الـ ENOENT). المكان الواحد بيمنع ده من الأساس.

## خليه بتاعك

نفس الملفات الأربعة ([[errors.js]] و [[log.js]] و لفّ الـ cause في طبقة التخزين و [[sendError]]) تنفع في أي مشروع. في الواجهة: اقرا [[code]] واعرض toast بالـ [[message]]، ولو فيه [[errorId]] اعرضه صغير تحت.` },
      ],
      items: [
        {
          cmd: "try و catch و finally",
          title: "تمسك error قبل ما البرنامج يقع",
          desc: R`[[throw]] بيوقف الدالة ويطلع لفوق لحد أول [[try/catch]]، ولو ملقاش، البرنامج يقع (أو في المتصفح error في Console). [[catch (err)]] بتمسكه، و [[finally]] بتشتغل في الحالتين (نجح أو فشل)، ومكانها التنضيف: قفل loading أو connection.

ارمي دايمًا [[Error]] أو حاجة وارثة منه ([[TypeError]] و [[RangeError]]...)، مش string، عشان يبقى فيه [[message]] و [[stack]].`,
          example: R`function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
  if (age < 0) throw new RangeError("السن مينفعش يبقى سالب");
  return age;
}
try {
  parseAge("abc");
} catch (err) {
  console.log(err.name, err.message);
  if (!(err instanceof TypeError)) throw err;
} finally {
  console.log("خلصنا");
}
try { JSON.parse("{"); } catch { console.log("JSON بايظ"); }`,
          try: R`اطبع [[err.stack]] وشوف أرقام السطور. وبعدين خلي الـ try يرجّع [[return "a"]] والـ finally يرجّع [[return "b"]] جوه دالة، وشوف مين بيكسب.`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** زرار «احفظ» بينادي [[save()]]: الدالة بتقفل الزرار وتكتب عليه «بيحفظ...»، وبعدين بتنادي [[fakeSave()]] اللي بترمي Error عشوائيًا نص المرات، ولو فشلت تكتب الرسالة في [[<p>]] تحت. رجّع الزرار لحالته في [[finally]].`, done: R`في النجاح والفشل الاتنين الزرار بيرجع مفتوح ومكتوب عليه «احفظ»، ورسالة الغلط بتظهر في الفشل بس. ولو نقلت سطر الرجوع لآخر الـ try بدل finally، أول فشل بيسيب الزرار مقفول للأبد.`, sol: R`~~~live 170 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>زرار احفظ</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  button { font: inherit; padding: 8px 20px; }
  #msg { color: #b91c1c; min-height: 1.6em; }
  #ok { color: #15803d; min-height: 1.6em; }
</style>
<button id="save">احفظ</button>
<p id="msg"></p>
<p id="ok"></p>
<script>
  const btn = document.querySelector("#save");
  const msg = document.querySelector("#msg");
  const ok = document.querySelector("#ok");
  let saves = 0;

  // بتستنى ٦٠٠ms وبعدين بتفشل نص المرات (await هتتشرح في وحدة async)
  async function fakeSave() {
    await new Promise((r) => setTimeout(r, 600));
    if (Math.random() < 0.5) throw new Error("السيرفر مردّش، جرّب تاني");
    return ++saves;
  }

  async function save() {
    btn.disabled = true;
    btn.textContent = "بيحفظ...";
    msg.textContent = "";
    ok.textContent = "";
    try {
      const n = await fakeSave();
      ok.textContent = "اتحفظ (مرة رقم " + n + ")";
    } catch (err) {
      msg.textContent = err.message;
    } finally {
      btn.disabled = false;
      btn.textContent = "احفظ";
    }
  }

  btn.addEventListener("click", save);
</script>
</html>
~~~

دوس «احفظ» كذا مرة في الـ preview: نص المرات هتشوف الرسالة الحمرا، ونص المرات «اتحفظ»، وفي الحالتين الزرار بيرجع.

## اتقاس في Chrome

ثبّتنا [[Math.random]] في كل ضغطة عشان نجرّب النجاح والفشل بالترتيب اللي عايزينه، وقرينا الزرار مرة وهو شغال (بعد 100ms) ومرة بعد ما يخلص. وعملنا نسخة تانية [[broken.html]] فيها سطور الرجوع في آخر الـ try بدل finally:

~~~js broken.html (الجزء اللي اتغيّر بس)
    try {
      const n = await fakeSave();
      ok.textContent = "اتحفظ (مرة رقم " + n + ")";
      btn.disabled = false;
      btn.textContent = "احفظ";
    } catch (err) {
      msg.textContent = err.message;
    }
~~~

~~~text الناتج (Chrome headless)
=== index.html
نجاح: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=false «احفظ» msg=«» ok=«اتحفظ (مرة رقم 1)»
فشل: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=false «احفظ» msg=«السيرفر مردّش، جرّب تاني» ok=«»
فشل تاني: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=false «احفظ» msg=«السيرفر مردّش، جرّب تاني» ok=«»
نجاح: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=false «احفظ» msg=«» ok=«اتحفظ (مرة رقم 2)»
=== broken.html
نجاح: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=false «احفظ» msg=«» ok=«اتحفظ (مرة رقم 1)»
فشل: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=true «بيحفظ...» msg=«السيرفر مردّش، جرّب تاني» ok=«»
فشل تاني: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=true «بيحفظ...» msg=«السيرفر مردّش، جرّب تاني» ok=«»
نجاح: وهو شغال disabled=true «بيحفظ...» | بعدها disabled=true «بيحفظ...» msg=«السيرفر مردّش، جرّب تاني» ok=«»
[chrome] 157
~~~

**ليه كده:**

- **قبل الـ try:** بنقفل الزرار ونكتب «بيحفظ...» ونمسح الرسايل القديمة، فاليوزر عارف إن فيه حاجة شغالة ومش هيدوس مرتين.
- **[[try]]:** الحتة اللي ممكن تفشل بس ([[fakeSave]]). لو نجحت بنكتب الرسالة الخضرا.
- **[[catch (err)]]:** بيتنفّذ لو [[fakeSave]] رمت، و [[err.message]] هي النص اللي اترمى مع الـ Error.
- **[[finally]]:** بيتنفّذ **في الحالتين**، بعد الـ try أو بعد الـ catch. ده المكان الصح لأي «رجّع الحالة زي ما كانت»: فك القفل، شيل الـ loading، اقفل ملف.
- **في [[broken.html]]:** أول فشل نط من سطر [[await fakeSave()]] للـ catch على طول، فسطرين الرجوع اللي في آخر الـ try متنفّذوش، والزرار فضل [[disabled=true]] و «بيحفظ...» للأبد. الضغطة الرابعة ([[click]] على زرار مقفول) معملتش حاجة خالص.
- **[[await]]:** هنا عشان [[fakeSave]] بتستنى 600ms زي سيرفر حقيقي، والـ try/catch بيمسك الـ error بتاع الـ await عادي. ده هيتشرح بالتفصيل في وحدة async.

**الغلطة الشائعة:** تكرّر سطور الرجوع في الـ try وفي الـ catch الاتنين. بيشتغل، بس أول ما حد يزوّد [[return]] جوه الـ try أو error تاني يطلع من الـ catch، النسخة المكررة بتتنسي. [[finally]] مكان واحد بيتنفّذ دايمًا.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[function f() { try { console.log("a"); return "b"; } finally { console.log("c"); } } console.log(f());]]. اكتب الترتيب.`, done: R`توقعت وطلع [[a]] ثم [[c]] ثم [[b]]: الـ finally بتشتغل قبل ما الدالة ترجع فعلًا، حتى مع return.`, sol: R`**التوقع:** [[a]] ثم [[c]] ثم [[b]].

~~~js finally-order.js
function f() {
  try {
    console.log("a");
    return "b";
  } finally {
    console.log("c");
  }
}
console.log(f());
~~~

~~~text الناتج (node finally-order.js، Node 24)
a
c
b
~~~

**ليه كده بالترتيب:**

1. [[f()]] بتبدأ، والـ try بيطبع [[a]].
2. [[return "b"]]: الدالة **قررت** ترجّع [["b"]]، بس قبل ما ترجع فعلًا لازم الـ finally يتنفّذ. القيمة [["b"]] بتتشال على جنب.
3. الـ finally بيطبع [[c]].
4. الدالة بترجع [["b"]]، و [[console.log(f())]] اللي برّه بيطبعها.

يعني [[console.log(f())]] مستني نتيجة [[f()]] الأول، وكل اللي جوه [[f]] (حتى الـ finally) بيخلص قبل ما الطباعة اللي برّه تحصل.

**الغلطة الشائعة:** تفتكر إن [[return]] بتقطع كل حاجة فالـ finally ميتنفّذش. لأ: [[finally]] بيتنفّذ مع [[return]] و [[throw]] و [[break]]. وده بالظبط اللي بيخليه آمن لتنظيف الموارد.` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[safeJSON(text, fallback)]] بترجّع الـ object لو النص سليم، و fallback لو [[SyntaxError]] بس، وأي error تاني تعمله throw تاني. جرّبها على [['{"a":1}']] و [["{"]] و [[undefined]].`, done: R`النتايج [[{ a: 1 }]] وبعدين الـ fallback مرتين: [[undefined]] كمان بيدّي SyntaxError ورسالته [["undefined" is not valid JSON]]. وجرّب كمان [[function g() { try { throw new Error("x"); } finally { return "ok"; } }]]: بترجّع [["ok"]] والـ error بيختفي، وده سبب إنك متعملش return جوه finally.`, sol: R`~~~js safe-json.js
function safeJSON(text, fallback) {
  try {
    return JSON.parse(text);
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log("  (SyntaxError: " + err.message + ")");
      return fallback;
    }
    throw err;
  }
}

console.log(safeJSON('{"a":1}', {}));
console.log(safeJSON("{", { empty: true }));
console.log(safeJSON(undefined, { empty: true }));

// أي error تاني بيعدّي: object بيرمي وهو بيتحوّل لنص
const evil = { toString() { throw new RangeError("مش نص"); } };
try {
  safeJSON(evil, {});
} catch (err) {
  console.log("اتعدّى لبرّه:", err.name, err.message);
}

function g() {
  try {
    throw new Error("x");
  } finally {
    return "ok";
  }
}
console.log(g());
~~~

~~~text الناتج (node safe-json.js، Node 24)
{ a: 1 }
  (SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2))
{ empty: true }
  (SyntaxError: "undefined" is not valid JSON)
{ empty: true }
اتعدّى لبرّه: RangeError مش نص
ok
~~~

**ليه كده:**

- **[[return JSON.parse(text)]] جوه الـ try:** لو النص سليم بيرجع الـ object على طول.
- **[[if (err instanceof SyntaxError)]]:** [[JSON.parse]] بترمي [[SyntaxError]] لما النص مش JSON. ده النوع **الوحيد** اللي احنا عارفين نتعامل معاه (نرجّع الـ fallback). سطر الطباعة بين قوسين موجود عشان تشوف الرسالة بس.
- **[[undefined]]:** [[JSON.parse(undefined)]] بتحوّله لنص [["undefined"]] الأول، وده مش JSON، فـ SyntaxError برسالة [["undefined" is not valid JSON]] والـ fallback رجع.
- **[[throw err]]:** أي نوع تاني بيترمي زي ما هو. جرّبناه بـ object الـ [[toString]] بتاعه بيرمي [[RangeError]]: الـ catch مسكه، شاف إنه مش SyntaxError، ورماه تاني، فوصل للـ try اللي برّه.

## [[return]] جوه [[finally]]

آخر سطر [[ok]]: الدالة [[g]] رمت [[Error("x")]]، بس الـ finally عمل [[return "ok"]]، والـ return ده **مسح** الـ error. الـ error اختفى من غير ما حد يعرف، ومفيش ولا سطر في اللوج. عشان كده متكتبش [[return]] (ولا [[throw]]) جوه finally: خليه للتنظيف بس.

**الغلطة الشائعة:** [[catch { return fallback; }]] من غير ما تفحص النوع. كده أي باج تاني (اسم متغير غلط، أو [[TypeError]]) هيرجّع الـ fallback بهدوء وعمرك ما هتلاقيه.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[try { setTimeout(() => { throw new Error("x"); }, 0); } catch (e) { console.log("caught"); } console.log("after");]]. صاحبه فاكر إن الـ try حامية الـ timer. شغّله، وفسّر ليه، وصلّحه بحيث الغلط يتمسك ويتطبع والبرنامج يكمّل.`, done: R`قبل التصليح بيطبع [[after]]، وبعدها البرنامج بيقع بـ [[Error: x]] ويخرج بكود ١، و [[caught]] عمرها ما بتطبع: الـ try خلص قبل ما الـ callback يشتغل بكتير. بعد ما تنقل الـ try/catch جوه الـ callback نفسه بيطبع [[after]] وبعدين [[caught]] والكود ٠.`, sol: R`## قبل التصليح

~~~js timer-broken.js
try {
  setTimeout(() => {
    throw new Error("x");
  }, 0);
} catch (e) {
  console.log("caught");
}
console.log("after");
~~~

~~~text الناتج (node timer-broken.js; echo "exit code: $?" ، Node 24، أول ٦ سطور والكود)
after
C:\Users\ali\code\try-basics\timer-broken.js:3
    throw new Error("x");
    ^

Error: x
exit code: 1
~~~

## ليه الـ try محمتهوش

بالترتيب اللي حصل فعلًا:

1. الـ try بدأ، و [[setTimeout]] **سجّلت** الدالة عشان تتنادى بعدين، ورجعت على طول من غير ما تنفّذها.
2. الـ try خلص من غير أي error، فالـ catch اتخطّى.
3. [[console.log("after")]] اتطبعت.
4. الكود الأساسي خلص، وبعدين Node نادى الدالة بتاعة الـ timer. ساعتها الـ try **مش موجود أصلًا**: هو كان حوالين سطر التسجيل بس، مش حوالين الدالة لما تشتغل.
5. الـ throw ملقاش أي catch، فبقى **uncaught exception**: Node طبع الـ error ووقف البرنامج بكود ١، و [[caught]] عمرها ما اتطبعت.

## التصليح: الـ try جوه الـ callback

~~~js timer-fixed.js
setTimeout(() => {
  try {
    throw new Error("x");
  } catch (e) {
    console.log("caught", e.message);
  }
}, 0);
console.log("after");
~~~

~~~text الناتج (node timer-fixed.js; echo "exit code: $?")
after
caught x
exit code: 0
~~~

الـ try دلوقتي جزء من الدالة نفسها، فلما الدالة تشتغل بعدين، الـ try بيشتغل معاها ويمسك الـ error. [[after]] لسه أول سطر، لأن الـ timer بيتنفّذ بعد الكود الأساسي في الحالتين.

**الغلطة الشائعة:** نفس الكلام على [[addEventListener]] و [[fs.readFile]] بالـ callback: try حوالين **تسجيل** الـ callback مبيحميش الـ callback. القاعدة: الـ try لازم يبقى في نفس الدالة اللي بتنفّذ السطر اللي بيرمي، أو تستخدم Promise و [[await]] (وحدة async).` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** لوج فيه سطر JSON لكل حدث، وفيه سطر بايظ: [[['{"level":"info"}', '{bad', '{"level":"error"}']]]. اقرا كل سطر بـ try/catch جوه الـ loop، وعدّ السليم، واطبع رقم السطر البايظ ورسالته، ومتوقفش عنده.`, done: R`بيطبع [[سطر 2 Expected property name or '}' in JSON at position 1 (line 1 column 2)]] وبعدين عدد السليم 2. ولو حطيت الـ try برّه الـ loop، أول سطر بايظ بيوقّف القراية وتضيع الأحداث اللي بعده.`, sol: R`~~~js log-lines.js
const lines = ['{"level":"info"}', "{bad", '{"level":"error"}'];
const events = [];

lines.forEach((line, i) => {
  try {
    events.push(JSON.parse(line));
  } catch (err) {
    console.log("سطر", i + 1, err.message);
  }
});

console.log("السليم:", events.length, events.map((e) => e.level));
~~~

~~~text الناتج (node log-lines.js، Node 24)
سطر 2 Expected property name or '}' in JSON at position 1 (line 1 column 2)
السليم: 2 [ 'info', 'error' ]
~~~

## لو الـ try برّه الـ loop

~~~js log-lines-wrong.js
const lines = ['{"level":"info"}', "{bad", '{"level":"error"}'];
const events = [];

try {
  for (const line of lines) events.push(JSON.parse(line));
} catch (err) {
  console.log("وقفنا:", err.message);
}

console.log("السليم:", events.length);
~~~

~~~text الناتج (node log-lines-wrong.js)
وقفنا: Expected property name or '}' in JSON at position 1 (line 1 column 2)
السليم: 1
~~~

**ليه كده:**

- **الـ try جوه الـ [[forEach]]:** كل سطر ليه try لوحده. السطر البايظ بيرمي، الـ catch بتاعه بيطبع رقمه، والـ loop بيكمّل للسطر اللي بعده عادي. فالحدثين السليمين (info و error) وصلوا.
- **[[i + 1]]:** الـ index بيبدأ من 0، والناس بتعد السطور من 1.
- **[[err.message]]:** [[Expected property name or '}' in JSON at position 1 (line 1 column 2)]]: بعد [[{]] كان مستني اسم خاصية بين علامتين، ولقى [[b]] في الحرف رقم 1 (العد من 0).
- **في النسخة الغلط:** الـ try حوالين الـ loop كله، فأول throw طلّعنا من الـ loop **كله** للـ catch. السطر التالت عمره ما اتقري، وطلع عندنا حدث واحد بس بدل ٢: حدث الـ error (الأهم في اللوج!) ضاع.

**الغلطة الشائعة:** تحط [[continue]] أو تسيب الـ catch فاضي من غير ما تطبع. لازم تعرف **أنهي** سطر باظ وليه، وإلا اللوج هيبان سليم وهو ناقص.` }
          ],
          ref: [
            { t: "MDN: try...catch", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" },
            { t: "MDN: throw", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw" },
            { t: "MDN: Control flow and error handling", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" },
            { t: "MDN: Error", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" },
          ],
          flag: "script",
          deep: {
            why: "الداتا الغلط والنت اللي بيقطع والـ JSON البايظ هيحصلوا أكيد. الفرق بين تطبيق محترم وتطبيق بيقع إنك تمسك الـ error في المكان الصح، وتعرض رسالة مفهومة، وتسجّل التفاصيل.",
            how: R`الـ throw بيفك الـ call stack: بيطلع من الدوال واحدة واحدة لحد ما يلاقي try. أي كود بعد الـ throw في نفس الدالة مبيشتغلش.

[[catch]] بتمسك أي حاجة اترمت، مش Error بس، عشان كده في TypeScript نوعها unknown. و [[catch {}]] من غير متغير مسموحة لو مش محتاجه (ES2019).

[[finally]] بتشتغل دايمًا، حتى لو فيه return جوه try أو catch. ولو الـ finally نفسها عملت return، بتلغي أي return أو throw قبلها، وده بيخبّي errors، فمتعملش كده.

try/catch بتمسك الـ errors المتزامنة بس. لو الـ error حصل جوه setTimeout أو Promise من غير await، الـ try اللي حوالين مش هتشوفه. مع async/await، [[await]] جوه try بيمسك رفض الـ Promise (درس async).

الأنواع المدمجة: [[TypeError]] (عملية على نوع غلط، زي نداء undefined)، و [[ReferenceError]] (متغير مش موجود)، و [[SyntaxError]] (كود أو JSON بايظ)، و [[RangeError]] (قيمة برا المدى).`,
            when: R`حوالين أي حاجة ممكن تفشل لأسباب برّه الكود: JSON.parse، و fetch، والملفات، و input اليوزر. وفي الطبقة اللي تعرف تعمل حاجة مفيدة بالـ error (تعرض رسالة، تعيد المحاولة). وفي Express فيه error middleware بيلم كله (تاب Backend بـ Node).`,
            mistakes: R`[[catch (e) {}]] فاضية: الـ error اختفى وانت مش عارف. و [[throw "error"]] كـ string: مفيش stack. وتلف كل دالة في try/catch بدل مكان واحد مناسب. وتمسك كل الـ errors وانت عايز نوع واحد: افحص النوع وارمي الباقي تاني زي المثال.`
          },
          teach: R`## الكود ده بيعمل إيه؟

دالة [[parseAge]] بتحوّل input لسن، وبترمي error بنوع واضح لو الـ input غلط. وبعدين بنناديها بحاجة غلط جوه [[try]]، ونمسك الـ error في [[catch]]، ونطبع رسالة في [[finally]] في كل الأحوال. وفي الآخر [[catch]] من غير متغير. اتشغّل في Node 24.

---

## ١. الدالة اللي بترمي

~~~text app.js
function parseAge(input) {
  const age = Number(input);
~~~

[[Number(input)]] بيحوّل أي حاجة لرقم. لو مقدرش بيرجّع [[NaN]] (Not a Number، «مش رقم»). جرّبنا شوية قيم:

~~~text الناتج: Number("abc"), Number("25"), Number(""), Number(" 7 "), Number("-3")
NaN 25 0 7 -3
~~~

لاحظ إن النص الفاضي بيبقى 0 مش NaN، والمسافات حوالين الرقم بتتشال.

~~~text app.js
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
~~~

- [[Number.isNaN(age)]]: هل age هي NaN؟ (مينفعش تكتب [[age === NaN]]: NaN مش بتساوي حتى نفسها.)
- [[throw]]: ارمي error. التنفيذ **بيقف هنا فورًا**، والدالة مبترجّعش حاجة، والـ error بيطلع لفوق لحد أول try.
- [[new TypeError(...)]]: نوع جاهز من الـ errors معناه «القيمة نوعها غلط». والرسالة template فيها الـ input.

~~~text app.js
  if (age < 0) throw new RangeError("السن مينفعش يبقى سالب");
  return age;
}
~~~

- [[RangeError]]: نوع تاني معناه «القيمة نوعها صح بس برّه المدى المسموح».
- [[return age]]: لو عدّى الفحصين، رجّع الرقم. [[parseAge("25")]] رجّعت [[25]].

---

## ٢. [[try]] و [[catch]]

~~~text app.js
try {
  parseAge("abc");
} catch (err) {
  console.log(err.name, err.message);
~~~

- [[try { ... }]]: «جرّب الكود ده، ولو رمى error متوقعش البرنامج».
- [[parseAge("abc")]] رمت TypeError، فباقي الـ try اتلغى، والتنفيذ نط على الـ catch.
- [[catch (err)]]: [[err]] هو الـ object اللي اترمى. وأي Error ليه ٣ خصايص: [[name]] اسم النوع ([["TypeError"]])، و [[message]] الرسالة اللي كتبناها، و [[stack]] مكان الـ error بالسطر (تحت).

~~~text الناتج
TypeError مش رقم: abc
~~~

---

## ٣. ارمي اللي مش بتاعك تاني

~~~text app.js
  if (!(err instanceof TypeError)) throw err;
~~~

- [[err instanceof TypeError]]: الـ error ده من نوع TypeError؟
- [[!( ... )]]: عكس الشرط. يعني «لو **مش** TypeError، ارميه تاني لفوق».

الفكرة: الـ catch ده عارف يتعامل مع «مش رقم» بس. أي حاجة تانية (bug حقيقي مثلًا) متبلعهاش في صمت. جرّبنا [[parseAge(-3)]] بدل abc:

~~~text الناتج
RangeError السن مينفعش يبقى سالب
خلصنا
C:\Users\ali\code\app.js:11
  if (!(err instanceof TypeError)) throw err;
                                   ^

RangeError: السن مينفعش يبقى سالب
    at parseAge (C:\Users\ali\code\app.js:4:22)
~~~

الـ catch طبع الرسالة، والـ RangeError اترمى تاني، ومفيش try فوقه فالبرنامج وقع. بس لاحظ [[خلصنا]] اتطبعت **قبل** ما يقع: ده الـ finally.

---

## ٤. [[finally]]

~~~text app.js
} finally {
  console.log("خلصنا");
}
~~~

[[finally]] بتشتغل **دايمًا**: لو الـ try نجح، لو الـ catch مسك، ولو حتى الـ catch نفسه رمى error زي اللي فوق. مكانها التنضيف: قفل loading أو connection أو ملف.

~~~text الناتج: المثال كامل
TypeError مش رقم: abc
خلصنا
JSON بايظ
~~~

---

## ٥. [[catch]] من غير متغير

~~~text app.js
try { JSON.parse("{"); } catch { console.log("JSON بايظ"); }
~~~

- [[JSON.parse("{")]]: نص JSON ناقص، فبيرمي SyntaxError. لما طبعناه:

~~~text الناتج
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

يعني «بعد [[{]] كنت مستني اسم خاصية أو [[}]]». و [[position 1]] بالعدّ من صفر، يعني الحرف التاني.

- [[catch { ... }]] من غير [[(err)]]: مسموحة لو مش محتاج تعرف الـ error (من ES2019).

---

## ٦. [[err.stack]] (الـ solCode)

~~~text app.js
try { parseAge("abc"); } catch (err) { console.log(err.stack); }
~~~

~~~text الناتج
TypeError: مش رقم: abc
    at parseAge (C:\Users\ali\code\app.js:3:32)
    at Object.<anonymous> (C:\Users\ali\code\app.js:6:7)
    at Module._compile (node:internal/modules/cjs/loader:1872:14)
    ...
~~~

اقراه من فوق لتحت: أول سطر النوع والرسالة، وبعده **مكان الرمي** ([[app.js:3:32]] يعني الملف، سطر 3، عمود 32)، وبعده مين نادى الدالة دي (سطر 6). السطور اللي فيها [[node:internal]] ده كود Node نفسه، سيبها.

---

## ٧. return جوه finally (الـ solCode)

~~~text app.js
function who() {
  try { return "a"; } finally { return "b"; }
}
console.log(who());
~~~

~~~text الناتج
b
~~~

الـ try قال «رجّع a»، بس قبل ما الدالة تخرج فعلًا الـ finally اشتغلت ورجّعت b، فغطّت عليها. نفس الحاجة لو الـ try كان رمى error: return في finally بتبلعه. عشان كده **متكتبش return جوه finally أبدًا**.

---

## ٨. ليه try مبيمسكش error جوه callback

[[try]] بيحمي الكود اللي بيشتغل **وهو لسه جواه**. الـ callback اللي بتبعته لـ [[setTimeout]] أو [[addEventListener]] أو [[.then]] مش بيشتغل دلوقتي: بيتسجّل، والـ try يخلص، وبعدين الـ event loop يناديه بعدين في لفة لوحدها (درس «event loop»).

~~~text cb.mjs
try {
  setTimeout(() => { throw new Error("جوه الـ timer"); }, 0);
} catch (e) {
  console.log("caught", e.message);
}
console.log("after try");
~~~

~~~text الناتج (Node 24)
after try
file:///C:/.../cb.mjs:2
  setTimeout(() => { throw new Error("جوه الـ timer"); }, 0);
                     ^

Error: جوه الـ timer
    at Timeout._onTimeout (file:///C:/.../cb.mjs:2:28)
    at listOnTimeout (node:internal/timers:685:17)

Node.js v24.22.1
~~~

[[caught]] عمرها ما اتطبعت، والبرنامج وقع بكود خروج ١. شوف الـ stack: أول سطر [[Timeout._onTimeout]] جاي من [[node:internal/timers]] مش من الـ try بتاعك. يعني ساعة ما الـ error اترمى، الـ try كان خلص من زمان ومش موجود في الـ call stack.

### التصليح: الـ try يبقى جوه الـ callback، أو await

~~~text cb2.mjs
function later(fn) { setTimeout(fn, 0); }
later(() => {
  try { JSON.parse("{"); } catch (e) { console.log("اتمسك جوه الـ callback:", e.name); }
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function main() {
  try {
    await wait(10);
    JSON.parse("{");
  } catch (e) { console.log("اتمسك بعد await:", e.name); }
  try {
    Promise.reject(new Error("من غير await"));
  } catch { console.log("مش هتتطبع"); }
}
main();
~~~

~~~text الناتج (Node 24)
اتمسك جوه الـ callback: SyntaxError
اتمسك بعد await: SyntaxError
file:///C:/.../cb2.mjs:12
    Promise.reject(new Error("من غير await"));
                   ^

Error: من غير await
~~~

- الأول: الـ try **جوه** الـ callback، فهو موجود ساعة ما الكود بيشتغل.
- التاني: [[await]] بيوقّف [[main]] ويرجّعها **جوه نفس الـ try** لما الـ Promise يخلص، فالـ error بعده بيتمسك. ده أحسن حل: حوّل الـ callback لـ Promise وخلّي [[await]] جوه try.
- التالت: Promise اترفض من غير [[await]] ولا [[.catch]]: الـ try مش شايفه، و Node وقّع البرنامج كله (ده اسمه unhandled rejection، ليه درس لوحده: «الأخطاء العامة: unhandledrejection و uncaughtException»).

| الكود | الـ try اللي برّه بيمسكه؟ | ليه |
|---|---|---|
| [[JSON.parse]] جوه الـ try على طول | أيوه | بيشتغل والـ try لسه مفتوح |
| [[setTimeout(() => { throw ... })]] | لأ | الـ callback بيشتغل بعد ما الـ try خلص |
| [[el.addEventListener("click", () => { throw ... })]] | لأ | نفس الكلام: بيشتغل مع كل ضغطة بعدين |
| [[promise.then(() => { throw ... })]] من غير await | لأ | بيبقى rejection، محتاج [[.catch]] أو await |
| [[await promise]] جوه try | أيوه | الـ await بيرجّع التنفيذ جوه الـ try |

---

## الخلاصة

| الحتة | بتشتغل إمتى |
|---|---|
| [[try]] | دايمًا، لحد أول throw |
| [[catch (err)]] | لو حصل throw في الـ try بس |
| [[finally]] | دايمًا في الآخر، حتى لو catch رمى تاني |
| [[throw err]] جوه catch | لو الـ error مش من النوع اللي انت عارف تتعامل معاه |

| النوع | معناه |
|---|---|
| [[TypeError]] | نوع القيمة غلط (نداء undefined، رقم مكان نص) |
| [[RangeError]] | القيمة برّه المدى |
| [[SyntaxError]] | كود أو JSON بايظ |
| [[ReferenceError]] | متغير مش موجود |

- ارمي [[new Error]] أو نوع منه، مش string، عشان يبقى فيه name و stack.
- الـ try مبيشوفش errors جوه callbacks بتشتغل بعدين (timer، أو event، أو [[.then]]): حط الـ try جوه الـ callback، أو استخدم await جوه try.`,
          lines: [
            R`دالة بتاخد input (غالبًا string جاي من فورم) وتحوّله سن، أو ترمي error لو القيمة مينفعش تبقى سن.`,
            R`[[Number()]] بتحوّل الـ string لرقم، ولو مش رقم بترجّع [[NaN]] من غير error. خلي بالك: [[Number("")]] بترجّع [[0]] مش NaN، فالخانة الفاضية هتعدّي كسن صفر لو مشيكتش عليها.`,
            R`[[NaN]] مبيساويش أي حاجة ولا حتى نفسه، فلازم [[Number.isNaN]] مش [[===]]. [[throw]] بتوقف الدالة فورًا وترمي [[TypeError]] برسالة فيها القيمة الغلط، وأقرب [[catch]] فوق هي اللي بتمسكه.`,
            R`السن سالب: مشكلة من نوع تاني (رقم بس برّه المسموح)، فبنرمي [[RangeError]]. النوع المختلف بيخلي اللي ماسك الـ error يفرّق بين الحالتين.`,
            R`لو وصلنا هنا يبقى القيمة عدّت الفحصين، فبنرجّعها رقم.`,
            R`نهاية [[parseAge]].`,
            R`[[try]]: الكود اللي ممكن يرمي. لو رمى، باقي السطور جوه الـ try بتتلغي والتنفيذ ينط على [[catch]] على طول.`,
            R`[[abc]] مش رقم، فـ [[parseAge]] هترمي TypeError، وأي سطر كان بعده جوه الـ try مش هيتنفّذ.`,
            R`[[catch]] بتمسك الـ error في [[err]]، فالبرنامج مبيقعش ويكمّل.`,
            R`بيطبع [[TypeError مش رقم: abc]]: [[name]] نوع الـ error و [[message]] الرسالة اللي كتبناها في الـ throw.`,
            R`إحنا مستعدين لـ TypeError بس. لو جالنا نوع تاني (RangeError، أو bug في الكود) بنرميه تاني لفوق بدل ما نبلعه، عشان منخبّيش مشكلة مش فاهمينها. هنا هو TypeError فمش هيترمي تاني.`,
            R`[[finally]] بتشتغل في كل الأحوال: الـ try نجح، أو اتمسك error، أو حتى الـ catch رمى تاني. مكانها الطبيعي للتنضيف، زي قفل ملف أو إخفاء الـ loading.`,
            R`بيطبع «خلصنا» بعد الـ catch. ولو الـ catch كان رمى الـ error تاني، كانت هتتطبع برضه قبل ما الـ error يطلع لفوق.`,
            R`نهاية الـ try/catch/finally.`,
            R`[[catch]] من غير [[(err)]] لما مش محتاج تفاصيل الـ error: هنا يكفينا نعرف إن الـ JSON بايظ. [[JSON.parse("{")]] بترمي SyntaxError فبيطبع «JSON بايظ».`,
          ],
          sol: R`[[err.stack]] بيطبع [[TypeError: مش رقم: abc]] وتحته سطور [[at parseAge (file.js:3:...)]] وبعدها السطر اللي ناداها. اقراه من فوق لتحت: أول سطر هو المكان اللي الـ error اترمى فيه، واللي تحته مين نادى مين.

الدالة اللي فيها [[try { return "a"; } finally { return "b"; }]] بترجّع [["b"]]: الـ finally بيشتغل دايمًا قبل ما الدالة تخرج، والـ return بتاعته بيغطّي على اللي في الـ try (وكمان بيبلع أي error اترمى). عشان كده متكتبش return جوه finally أبدًا، استخدمه للتنضيف بس. ولو finally من غير return، الدالة بترجّع [["a"]] بعد ما الـ finally يشتغل.`,
          solCode: R`function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
  return age;
}
try { parseAge("abc"); } catch (err) { console.log(err.stack); }
function who() {
  try { return "a"; } finally { return "b"; }
}
console.log(who()); // "b"`
        },
        {
          cmd: "custom errors و cause",
          title: "تعمل أنواع errors بتاعتك وتحافظ على السبب الأصلي",
          desc: R`[[class NotFoundError extends Error]] بتخليك تفرّق بين الأخطاء بـ [[instanceof]]: الـ NotFound يرجّع 404، والـ Validation يرجّع 400، والباقي 500.

ولما تمسك error وترمي واحد أوضح منه، ابعت الأصلي في [[{ cause: err }]] (ES2022). كده الرسالة مفهومة، والتفاصيل التقنية مضاعتش للـ debugging.`,
          example: R`class AppError extends Error {
  constructor(message, { status = 500, cause } = {}) {
    super(message, { cause });
    this.name = this.constructor.name;
    this.status = status;
  }
}
class NotFoundError extends AppError {
  constructor(what) { super($__bt$__{what} مش موجود$__bt, { status: 404 }); }
}
async function loadUser(id) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{id}$__bt);
    if (res.status === 404) throw new NotFoundError("اليوزر");
    return await res.json();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("فشل تحميل اليوزر", { cause: err });
  }
}
loadUser(1).catch((e) => console.log(e.name, e.status, e.message, e.cause?.message));`,
          try: R`شغّل الكود من غير نت (أو بدومين غلط) واطبع [[e.cause]]. وبعدين اعمل [[ValidationError]] بـ status 400 وفيه [[fields]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اعمل [[class ValidationError extends Error]] فيها [[this.name = "ValidationError"]]، و [[const e = new ValidationError("الإيميل ناقص")]]، واكتب على ورقة إيه اللي هيطلع من [[e instanceof ValidationError]] و [[e instanceof Error]] و [[String(e)]] و [[JSON.stringify(e)]]، وبعدين شغّل وقارن.`, done: R`[[true true]] وبعدين [[ValidationError: الإيميل ناقص]]. والـ JSON بيطلع [[{"name":"ValidationError"}]] من غير الرسالة: [[message]] و [[stack]] مش enumerable، فلو هتبعت error في API لازم تكتب الحقول بإيدك أو تعمل [[toJSON()]].`, sol: R`**التوقع على الورق:** [[true]] و [[true]]، وبعدين [[ValidationError: الإيميل ناقص]]، والـ JSON... ده اللي بيفاجئ.

~~~js validation.js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

const e = new ValidationError("الإيميل ناقص");
console.log(e instanceof ValidationError, e instanceof Error);
console.log(String(e));
console.log(JSON.stringify(e));
console.log(Object.keys(e));
console.log(Object.getOwnPropertyDescriptor(e, "message"));
~~~

~~~text الناتج (node validation.js، Node 24)
true true
ValidationError: الإيميل ناقص
{"name":"ValidationError"}
[ 'name' ]
{
  value: 'الإيميل ناقص',
  writable: true,
  enumerable: false,
  configurable: true
}
~~~

**ليه كده:**

- **[[instanceof]] الاتنين [[true]]:** [[extends Error]] بيخلّي سلسلة الـ prototype: [[e]] ← [[ValidationError.prototype]] ← [[Error.prototype]]. و [[instanceof]] بيدوّر في السلسلة دي كلها.
- **[[String(e)]]:** بينادي [[Error.prototype.toString]] اللي بترجّع [[name + ": " + message]]. وعشان كتبنا [[this.name = "ValidationError"]] طلع الاسم الصح بدل [[Error]].
- **[[JSON.stringify(e)]] بـ [[{"name":"ValidationError"}]] بس:** [[JSON.stringify]] بياخد الخصايص الـ **enumerable** بس. [[Object.keys(e)]] طلّعت [[name]] لوحده (لأننا عملناه بـ [[=]] عادي)، و [[message]] اتعمل جوه [[super(message)]] بـ [[enumerable: false]] زي ما الـ descriptor بيقول. و [[stack]] كمان مش enumerable.

**الغلطة الشائعة:** تبعت [[res.json(err)]] في API وتستغرب إن اليوزر وصله [[{}]] أو [[{"name":...}]] من غير رسالة. اكتب الحقول بإيدك ([[{ error: err.message }]]) أو اعمل [[toJSON()]] في الكلاس (المشروع التاني في الوحدة).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[class AppError extends Error { constructor(msg) { super(msg); } }]] وفي الـ catch [[if (e.name === "AppError")]] مبيدخلش. اطبع [[String(new AppError("x"))]] وصلّح.`, done: R`قبل التصليح بيطبع [[Error: x]] والـ name [["Error"]]. بعد [[this.name = new.target.name]] في الـ constructor بيطبع [[AppError: x]]، وأي كلاس بيورث منه زي [[DbError]] بياخد اسمه هو لوحده ([[DbError: y]]).`, sol: R`## قبل التصليح

~~~js name-broken.js
class AppError extends Error {
  constructor(msg) {
    super(msg);
  }
}
const e = new AppError("x");
console.log(String(e), "| name =", JSON.stringify(e.name));
console.log(e.name === "AppError" ? "دخل الـ if" : "مدخلش الـ if");
~~~

~~~text الناتج (node name-broken.js، Node 24)
Error: x | name = "Error"
مدخلش الـ if
~~~

## بعد التصليح

~~~js name-fixed.js
class AppError extends Error {
  constructor(msg, options) {
    super(msg, options);
    this.name = new.target.name;
  }
}
class DbError extends AppError {}

console.log(String(new AppError("x")));
console.log(String(new DbError("y")));
console.log(new DbError("y") instanceof AppError);
~~~

~~~text الناتج (node name-fixed.js)
AppError: x
DbError: y
true
~~~

**ليه كده:**

- **[[name]] مش بيتورّث من اسم الكلاس:** [[e.name]] بيتقري من [[Error.prototype.name]] اللي قيمته [["Error"]]، مهما كان اسم الكلاس اللي عمل الـ object. فلازم تحطه بإيدك.
- **[[new.target]]:** جوه الـ constructor، [[new.target]] هو الكلاس اللي اتعمله [[new]] فعلًا. لما تكتب [[new DbError("y")]]، الـ constructor بتاع [[AppError]] هو اللي بيشتغل (لأن [[DbError]] مالوش constructor)، بس [[new.target]] بيبقى [[DbError]]، فـ [[new.target.name]] بـ [["DbError"]]. عشان كده كل كلاس بيورث بياخد اسمه لوحده من غير ولا سطر.
- **[[super(msg, options)]]:** بنعدّي الـ options لـ [[Error]] عشان [[cause]] يشتغل (الدرس ده).

**الغلطة الشائعة:** تكتب [[this.name = "AppError"]] نص ثابت. هيشتغل لـ [[AppError]]، وبعدين كل كلاس بيورث منه ([[DbError]] و [[AuthError]]) هيطلع اسمه [[AppError]] برضه، والـ [[if (e.name === "DbError")]] عمره ما هيدخل. وقريب منها [[this.constructor.name]]، وده شغال برضه (زي مثال الدرس).` },
            { lvl: 'تطبيق', t: R`**ابني:** اكتب [[toHttp(err)]] بترجّع [[{ status, body }]]: [[NotFoundError]] ← 404 ورسالته، و [[ValidationError]] ← 400 ومعاها [[fields]]، وأي حاجة تانية ← 500 برسالة عامة «حصل خطأ» من غير رسالة الـ error الأصلية.`, done: R`[[toHttp(new NotFoundError("المنتج"))]] بترجّع [[{ status: 404, body: { error: "المنتج مش موجود" } }]]، و [[toHttp(new TypeError("db password wrong"))]] بترجّع 500 والـ body مفيهوش كلمة password خالص، و [[toHttp("نص")]] (حد رمى string) بترجّع 500 برضه من غير ما تقع.`, sol: R`~~~js errors.js
export class AppError extends Error {
  constructor(message, { status = 500, cause } = {}) {
    super(message, { cause });
    this.name = new.target.name;
    this.status = status;
  }
}

export class NotFoundError extends AppError {
  constructor(what) {
    super(what + " مش موجود", { status: 404 });
  }
}

export class ValidationError extends AppError {
  constructor(fields) {
    super("البيانات فيها غلط", { status: 400 });
    this.fields = fields;
  }
}
~~~

~~~js to-http.js
import { AppError, NotFoundError, ValidationError } from "./errors.js";

export function toHttp(err) {
  if (err instanceof ValidationError) {
    return { status: 400, body: { error: err.message, fields: err.fields } };
  }
  if (err instanceof NotFoundError) {
    return { status: 404, body: { error: err.message } };
  }
  if (err instanceof AppError) {
    return { status: err.status, body: { error: err.message } };
  }
  console.error("[غلط مش متوقع]", err);
  return { status: 500, body: { error: "حصل خطأ" } };
}
~~~

~~~js try-to-http.js
import { toHttp } from "./to-http.js";
import { NotFoundError, ValidationError } from "./errors.js";

console.log(toHttp(new NotFoundError("المنتج")));
console.log(JSON.stringify(toHttp(new ValidationError({ email: "الإيميل ناقص" }))));
console.log(toHttp(new TypeError("db password wrong")));
console.log(toHttp("نص"));
~~~

وجنبهم [[package.json]] فيه [[{ "type": "module" }]].

~~~text الناتج (node try-to-http.js 2>/dev/null ، الـ stdout بس، Node 24)
{ status: 404, body: { error: 'المنتج مش موجود' } }
{"status":400,"body":{"error":"البيانات فيها غلط","fields":{"email":"الإيميل ناقص"}}}
{ status: 500, body: { error: 'حصل خطأ' } }
{ status: 500, body: { error: 'حصل خطأ' } }
~~~

والـ stderr (ده اللوج اللي بيوصل للمطوّر بس، أول سطرين):

~~~text الناتج (node try-to-http.js 2>&1 >/dev/null | head -2)
[غلط مش متوقع] TypeError: db password wrong
    at file:///C:/Users/ali/code/custom-errors/try-to-http.js:6:20
~~~

**ليه كده:**

- **الترتيب من الأخص للأعم:** [[ValidationError]] و [[NotFoundError]] الاتنين بيورثوا من [[AppError]]، فلازم يتفحصوا **قبله**. وأي [[AppError]] تاني بياخد الـ status بتاعه.
- **الـ 500 مفيهاش رسالة الـ error:** [[TypeError("db password wrong")]] ممكن يبقى فيه معلومات سرية (أسامي جداول، باسوردات، مسارات). اليوزر بياخد «حصل خطأ» بس، والتفاصيل بتروح لـ [[console.error]] اللي بيقراه المطوّر.
- **[[toHttp("نص")]]:** حد رمى string مش Error. [[instanceof]] على string بترجّع [[false]] من غير ما تقع، فوصلنا للآخر و 500. لو كنا كتبنا [[err.status]] أو [[err.message.includes]] قبل الفحص كان ممكن يقع.
- **[[fields]]** بيوصل للـ 400 بس، عشان الواجهة تكتب كل رسالة تحت الحقل بتاعها.

**الغلطة الشائعة:** [[body: { error: err.message }]] في كل الحالات. ده بيسرّب رسايل داخلية زي [[db password wrong]] لأي حد بيبعت request غلط.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لـ [[toHttp]] اللي في التمرين التاني اكتب ٤ سطور [[console.assert]] أو [[console.log(x === y)]]: NotFoundError بـ 404، و ValidationError بـ 400 وفيها fields، و TypeError بـ 500 والـ body مفيهوش رسالته، و string مرمي بـ 500.`, done: R`الـ ٤ بيعدّوا. ولو غيّرت ترتيب الـ instanceof بحيث فحص [[Error]] ييجي الأول، اختبار 404 و 400 بيفشلوا، فعرفت إن الكلاس الأخص لازم يتفحص الأول.`, sol: R`الاختبار بيستخدم [[errors.js]] و [[to-http.js]] اللي في التمرين اللي قبله، وبياخد اسم الملف اللي هيختبره من الـ command line عشان نجرّبه على نسختين:

~~~js test-to-http.js
import { NotFoundError, ValidationError } from "./errors.js";

const file = process.argv[2] ?? "./to-http.js";
const { toHttp } = await import(file);
console.error = () => {}; // نسكّت اللوج بتاع الـ 500 عشان الناتج يبقى السطور بس

const nf = toHttp(new NotFoundError("المنتج"));
const v = toHttp(new ValidationError({ email: "ناقص" }));
const t = toHttp(new TypeError("db password wrong"));
const s = toHttp("نص");

console.log("404:", nf.status === 404 && nf.body.error === "المنتج مش موجود");
console.log("400 + fields:", v.status === 400 && v.body.fields?.email === "ناقص");
console.log("500 من غير الرسالة:", t.status === 500 && !JSON.stringify(t.body).includes("password"));
console.log("string مرمي = 500:", s.status === 500);
~~~

~~~text الناتج (node test-to-http.js، Node 24)
404: true
400 + fields: true
500 من غير الرسالة: true
string مرمي = 500: true
~~~

## نسخة الترتيب فيها غلط

~~~js to-http-wrong-order.js
import { AppError, NotFoundError, ValidationError } from "./errors.js";

// نفس الدالة، بس فحص Error العام اتنقل الأول
export function toHttp(err) {
  if (err instanceof Error) {
    return { status: 500, body: { error: "حصل خطأ" } };
  }
  if (err instanceof ValidationError) {
    return { status: 400, body: { error: err.message, fields: err.fields } };
  }
  if (err instanceof NotFoundError) {
    return { status: 404, body: { error: err.message } };
  }
  if (err instanceof AppError) {
    return { status: err.status, body: { error: err.message } };
  }
  return { status: 500, body: { error: "حصل خطأ" } };
}
~~~

~~~text الناتج (node test-to-http.js ./to-http-wrong-order.js)
404: false
400 + fields: false
500 من غير الرسالة: true
string مرمي = 500: true
~~~

**ليه كده:**

- **كل سطر اختبار = شرط واحد بيطبع [[true]] أو [[false]]:** بنفحص الـ status **و** حاجة في الـ body، عشان دالة بترجّع 404 برسالة غلط متعدّيش.
- **[[!JSON.stringify(t.body).includes("password")]]:** بنحوّل الـ body كله لنص ونتأكد إن الكلمة مش فيه في أي حتة، مش في [[error]] بس.
- **[[console.error = () => {}]]:** الدالة الأصلية بتطبع الـ error المش متوقع على stderr، وده سليم، بس في الاختبار بيبوّظ شكل الناتج فسكّتناه.
- **النسخة الغلط:** [[NotFoundError]] و [[ValidationError]] الاتنين [[instanceof Error]]، فأول if مسكهم ورجّع 500، والـ ifs اللي تحت عمرها ما اتوصلت. اختبارين الـ 404 والـ 400 فشلوا، والاتنين التانيين نجحوا بالصدفة. فعرفنا إن الكلاس الأخص لازم يتفحص الأول.

**الغلطة الشائعة:** تكتب اختبار بيفحص [[status === 500]] بس للحالات الغريبة. النسخة الغلط بتعدّي الاختبار ده! لازم يبقى فيه اختبار لكل فرع، وإلا ترتيب الـ ifs يبوظ والاختبارات تفضل خضرا.` },
            { lvl: 'تحدي', t: R`**مسألة:** اعمل سلسلة ٣ مستويات: [[readFileFake]] بترمي [[new Error("ENOENT")]]، و [[loadConfig]] بتمسكه وترمي [[ConfigError]] بـ cause، و [[startApp]] بتمسكه وترمي [[AppError("السيرفر مقامش")]] بـ cause. واكتب [[explain(err)]] بتمشي على [[.cause]] وتطبع كل مستوى في سطر، وبحد أقصى ١٠ مستويات.`, done: R`[[explain]] بتطبع ٣ سطور بالترتيب: AppError، وبعدين ConfigError، وبعدين Error ENOENT. و [[console.log(err)]] العادي في Node بيطبع الـ cause تحت كلمة [[[cause]:]]. ولو عملت [[a.cause = b; b.cause = a]]، الدالة بتقف بعد ١٠ سطور ومبتعلّقش.`, sol: R`~~~js cause-chain.js
import { inspect } from "node:util";

class AppError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = new.target.name;
  }
}
class ConfigError extends AppError {}

function readFileFake() {
  throw new Error("ENOENT");
}
function loadConfig() {
  try {
    readFileFake();
  } catch (err) {
    throw new ConfigError("مش لاقي config.json", { cause: err });
  }
}
function startApp() {
  try {
    loadConfig();
  } catch (err) {
    throw new AppError("السيرفر مقامش", { cause: err });
  }
}

function explain(err, max = 10) {
  let depth = 0;
  for (let e = err; e && depth < max; e = e.cause, depth++) {
    const label = e instanceof Error ? e.name + ": " + e.message : String(e);
    console.log("  ".repeat(depth) + (depth ? "↳ سببه " : "") + label);
  }
}

try {
  startApp();
} catch (err) {
  explain(err);
  console.log("--- console.log(err) العادي (أول ١٠ سطور):");
  console.log(inspect(err).split("\n").slice(0, 10).join("\n"));
}

const a = new Error("a");
const b = new Error("b");
a.cause = b;
b.cause = a;
console.log("--- دايرة a ↔ b:");
explain(a);
~~~

~~~text الناتج (node cause-chain.js، Node 24)
AppError: السيرفر مقامش
  ↳ سببه ConfigError: مش لاقي config.json
    ↳ سببه Error: ENOENT
--- console.log(err) العادي (أول ١٠ سطور):
AppError: السيرفر مقامش
    at startApp (file:///C:/Users/ali/code/custom-errors/cause-chain.js:25:11)
    at file:///C:/Users/ali/code/custom-errors/cause-chain.js:38:3
    ... 2 lines matching cause stack trace ...
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
  [cause]: ConfigError: مش لاقي config.json
      at loadConfig (file:///C:/Users/ali/code/custom-errors/cause-chain.js:18:11)
      at startApp (file:///C:/Users/ali/code/custom-errors/cause-chain.js:23:5)
      ... 3 lines matching cause stack trace ...
      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
--- دايرة a ↔ b:
Error: a
  ↳ سببه Error: b
    ↳ سببه Error: a
      ↳ سببه Error: b
        ↳ سببه Error: a
          ↳ سببه Error: b
            ↳ سببه Error: a
              ↳ سببه Error: b
                ↳ سببه Error: a
                  ↳ سببه Error: b
~~~

**ليه كده:**

- **كل مستوى بيلف اللي تحته:** [[loadConfig]] مسكت [[Error("ENOENT")]] ورمت [[ConfigError]] رسالته مفهومة لمستواها، و [[{ cause: err }]] حفظت الأصلي جواه. و [[startApp]] عملت نفس الحاجة. فوصلنا error واحد فوق، بس جواه السلسلة كلها.
- **[[explain]]:** [[for (let e = err; e && depth < max; e = e.cause, depth++)]] بيمشي من الـ error لسببه لسبب سببه، وبيقف لما ميبقاش فيه [[cause]] ([[e]] بقت [[undefined]]) **أو** يوصل ١٠. و [[e instanceof Error ? ... : String(e)]] عشان [[cause]] ممكن يبقى أي قيمة مش Error بس.
- **[[console.log(err)]] في Node:** بيطبع الـ stack، وتحته [[[cause]:]] والـ stack بتاع السبب، وجواه السبب اللي بعده. وسطور زي [[... 2 lines matching cause stack trace ...]] معناها إن Node شال السطور المتكررة بين المستويات.
- **الدايرة:** [[a.cause = b; b.cause = a]] سلسلة ملهاش آخر. الشرط [[depth < max]] وقّفها بعد ١٠ سطور بالظبط. من غيره الـ loop كان هيلف للأبد والبرنامج يعلّق.

**الغلطة الشائعة:** [[throw new ConfigError("مش لاقي config.json")]] من غير [[cause]]. الرسالة أحسن، بس الـ [[ENOENT]] الأصلي (اللي فيه المسار الحقيقي) ضاع، واللي هيصلّح المشكلة مش هيعرف أنهي ملف.` }
          ],
          ref: [
            { t: "MDN: Error (Custom error types)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" },
            { t: "MDN: Error: cause", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause" },
            { t: "MDN: extends", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends" },
            { t: "Node.js: Errors", url: "https://nodejs.org/api/errors.html" },
          ],
          pre: [{ to: "js/Function: length و name و toString و new.target", why: R`[[this.name = new.target.name]] هو اللي بيدّي كل error اسم كلاسه لوحده` }],
          flag: "script",
          deep: {
            why: R`في أي backend أو تطبيق كبير، طريقة التعامل مع الـ error بتعتمد على نوعه: تعرض رسالة لليوزر؟ تعيد المحاولة؟ تسجّل وتنبّه؟ لو كله [[Error]] بـ message بس، هتقارن نصوص، وده بيبوظ أول ما حد يعدّل الرسالة.`,
            how: R`[[super(message, { cause })]] بيحط الـ message والـ cause على الـ error. و [[this.name = this.constructor.name]] بيخلي الـ name يطلع اسم الكلاس الفعلي في الـ logs والـ stack، بدل "Error".

[[cause]] بيتعرض في Node وفي DevTools مع الـ stack، فبتشوف السلسلة كاملة: «فشل تحميل اليوزر» سببه «fetch failed» سببه «ECONNREFUSED».

وفيه [[AggregateError]] لما عندك كذا error مع بعض، وده اللي [[Promise.any]] بترميه لو كله فشل.

والفكرة العامة: الطبقات التحت ترمي errors بنوع ومعنى، وطبقة واحدة فوق (error middleware في Express، أو error boundary في React) بتقرر تعمل إيه بيها.`,
            when: "في أي backend (errors بـ status codes)، وفي المكتبات، وفي أي مكان بتمسك error تقني وتحوّله لحاجة ليها معنى.",
            mistakes: R`ترمي error جديد وتضيّع الأصلي من غير cause. وترجّع [[err.message]] الداخلي لليوزر (ممكن يكون فيه تفاصيل قاعدة بيانات أو paths). وتفرّق بين الأخطاء بـ [[err.message.includes(...)]].`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيعمل نوعين errors بتوعنا: [[AppError]] (أي خطأ في التطبيق ومعاه HTTP status)، و [[NotFoundError]] (حاجة مش موجودة، 404). وبعدين دالة [[loadUser]] بتجيب يوزر من API، وأي error تقني بيحصل بتلفّه في AppError برسالة مفهومة، والأصلي بيفضل محفوظ في [[cause]].

[[api.example.com]] دومين محجوز للأمثلة، مفيش عليه API. فشغّلنا الكود في Node 24 مرتين: مرة زي ما هو (فالطلب بيفشل)، ومرة على سيرفر صغير محلي فيه [[/users/1]] بس، وأي حاجة تانية 404.

---

## ١. [[AppError]]

~~~text app.js
class AppError extends Error {
  constructor(message, { status = 500, cause } = {}) {
~~~

- [[extends Error]]: AppError نوع من Error، فبياخد message و stack وكل حاجة (درس extends).
- [[{ status = 500, cause } = {}]]: التاني object خيارات، بنفكّه في السطر نفسه (destructuring):
- [[status = 500]]: لو مبعتش status، يبقى 500 (خطأ في السيرفر).
- [[cause]]: الـ error الأصلي لو فيه.
- [[= {}]] في الآخر: لو مبعتش الـ object خالص، اعتبره object فاضي. من غيرها [[new AppError("x")]] كانت هتقع لأن مينفعش تفك undefined. بيها [[new AppError("x").status]] طلعت [[500]].

~~~text app.js
    super(message, { cause });
    this.name = this.constructor.name;
    this.status = status;
  }
}
~~~

- [[super(message, { cause })]]: نادي constructor بتاع Error. و Error نفسه بيقبل [[{ cause }]] من ES2022 وبيحطها على الـ error كخاصية [[cause]].
- [[this.constructor.name]]: [[this.constructor]] هو الكلاس اللي اتعمل بيه الـ object فعلًا، و [[.name]] اسمه. فلو اتعمل بـ NotFoundError، الاسم يطلع [["NotFoundError"]] **من غير** ما تكتبه في كل كلاس. ومن غير السطر ده، جرّبنا [[class NoName extends Error {}]]: الاسم طلع [["Error"]]، فالـ logs متقولكش النوع.
- [[this.status = status]]: خاصية زيادة بتاعتنا.

---

## ٢. [[NotFoundError]]

~~~text app.js
class NotFoundError extends AppError {
  constructor(what) { super($__bt$__{what} مش موجود$__bt, { status: 404 }); }
}
~~~

بياخد اسم الحاجة بس، ويبني الرسالة لوحده، ويثبّت status على 404. واتأكدنا إن [[new NotFoundError("x")]] هو [[instanceof]] الاتنين: NotFoundError و AppError و Error كمان. ده اللي بيخليك تفرّق بالنوع.

---

## ٣. [[loadUser]]: الطلب

~~~text app.js
async function loadUser(id) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{id}$__bt);
    if (res.status === 404) throw new NotFoundError("اليوزر");
    return await res.json();
~~~

- [[async]] و [[await]]: استنى الطلب من غير ما توقف البرنامج (درس async و await).
- [[res.status === 404]]: fetch **مبترميش** error على 404، فبنفحص بنفسنا ونرمي النوع الواضح.
- [[return await res.json()]]: حوّل الرد لـ object ورجّعه.

---

## ٤. الـ catch: عدّي أو لِف

~~~text app.js
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("فشل تحميل اليوزر", { cause: err });
  }
}
~~~

- [[err instanceof AppError]]: لو ده error **بتاعنا** (زي الـ NotFoundError اللي رميناه فوق)، عدّيه زي ما هو، معناه واضح أصلًا.
- غير كده يبقى error تقني مش متوقع (النت، DNS، JSON بايظ): اعمل AppError برسالة مفهومة، وحط الأصلي في [[cause]] عشان التفاصيل متضيعش.

---

## ٥. التشغيل

~~~text app.js
loadUser(1).catch((e) => console.log(e.name, e.status, e.message, e.cause?.message));
~~~

[[.catch(...)]] على الـ Promise اللي loadUser رجّعته، وبنطبع ٤ حاجات. و [[e.cause?.message]]: [[?.]] عشان لو مفيش cause ميقعش.

### على [[api.example.com]] (الدومين مش موجود)

~~~text الناتج
AppError 500 فشل تحميل اليوزر fetch failed
~~~

fetch رمت [[TypeError: fetch failed]]، والـ catch لفّها. وفي Node الـ error الأصلي جواه cause **تاني** بالسبب الحقيقي، طبعناه:

~~~text الناتج: e.cause.cause.code, e.cause.cause.message
ENOTFOUND getaddrinfo ENOTFOUND api.example.com
~~~

[[ENOTFOUND]] يعني الـ DNS ملقاش الدومين. فالسلسلة كاملة: «فشل تحميل اليوزر» ← سببه «fetch failed» ← سببه «ENOTFOUND». وفي Chrome نفس الطلب لدومين مش موجود رمى [[TypeError: Failed to fetch]].

### على السيرفر المحلي

~~~text الناتج
{ id: 1, name: 'Sara' }                         ← loadUser(1)
NotFoundError 404 اليوزر مش موجود undefined     ← loadUser(2)
~~~

مع 2، الـ NotFoundError عدّى من الـ catch زي ما هو، و cause بـ undefined لأنه مش ملفوف.

### شكل الـ error في Node

لما تطبع AppError فيه cause بـ console.log، Node بيعرض الاتنين (من ملف تجربة، السطر 37 فيه [[new AppError("فشل تحميل اليوزر", { cause: new TypeError("fetch failed") })]]):

~~~text الناتج
AppError: فشل تحميل اليوزر
    at file:///C:/Users/ali/code/test.mjs:37:14
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5) {
  status: 500,
  [cause]: TypeError: fetch failed
      at file:///C:/Users/ali/code/test.mjs:37:56
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
}
~~~

---

## ٦. نوع تالت (الـ solCode)

~~~text app.js
class ValidationError extends AppError {
  constructor(fields) {
    super("البيانات مش صحيحة", { status: 400 });
    this.fields = fields;
  }
}
const err = new ValidationError({ email: "لازم يبقى إيميل صحيح" });
console.log(err.name, err.status, err.fields, err instanceof AppError);
~~~

- [[super(...)]] الأول دايمًا، وبعدين [[this.fields]]: object فيه كل خانة غلط ورسالتها، عشان الفورم يعرض كل غلطة جنب خانتها.

~~~text الناتج
ValidationError 400 { email: 'لازم يبقى إيميل صحيح' } true
~~~

الاسم طلع ValidationError لوحده بفضل [[this.constructor.name]] في AppError.

---

## ٧. AggregateError: كذا error في error واحد

ساعات الفشل مش سبب واحد: كل الـ mirrors وقعت، أو الفورم فيه ٣ غلطات. [[AggregateError]] نوع مدمج (ES2021) شايل array من الـ errors في [[errors]]، و [[message]] واحدة فوقهم.

### بيجيلك من [[Promise.any]]

[[Promise.any]] بتستنى **أول** Promise ينجح. لو كلهم فشلوا، بترمي AggregateError فيه كل الأسباب:

~~~text agg.mjs
const fail = (name, ms) => new Promise((_, rej) => setTimeout(() => rej(new Error($__bt$__{name} واقع$__bt)), ms));
try {
  await Promise.any([fail("mirror1", 10), fail("mirror2", 20)]);
} catch (e) {
  console.log(e.name, "|", e.message, "|", e instanceof AggregateError);
  console.log(e.errors.map((x) => x.message));
}
~~~

~~~text الناتج (Node 24)
AggregateError | All promises were rejected | true
[ 'mirror1 واقع', 'mirror2 واقع' ]
~~~

- [[e.message]] عامة («كلهم اترفضوا»)، فمتعرضهاش لليوزر لوحدها.
- [[e.errors]]: الأسباب الحقيقية بنفس ترتيب الـ promises (مش ترتيب الفشل)، فتقدر تسجّل كل واحد.
- لو واحد بس نجح، [[Promise.any]] بترجّعه ومفيش error خالص (جرّبتها: [["b شغال"]]).
- [[Promise.any([])]] على array فاضية بترمي AggregateError على طول و [[errors.length]] بـ 0.

### تعمله بنفسك: كل غلطات الفورم مرة واحدة

~~~text agg.mjs
const errs = [new RangeError("age"), new TypeError("email")];
const agg = new AggregateError(errs, "الفورم فيه 2 غلط");
console.log(agg.message, agg.errors.length, agg.errors[1].name);
throw agg;
~~~

~~~text الناتج (Node 24)
الفورم فيه 2 غلط 2 TypeError
AggregateError: الفورم فيه 2 غلط
    at file:///C:/.../agg.mjs:9:13 {
  [errors]: [
    RangeError: age
        at file:///C:/.../agg.mjs:8:15,
    TypeError: email
        at file:///C:/.../agg.mjs:8:38
  ]
}
~~~

- [[new AggregateError(errors, message)]]: الأول الـ array (أي iterable)، وبعدها الرسالة. وبيقبل [[{ cause }]] كتالت argument زي أي Error.
- لما يوقع من غير ما يتمسك، Node بيطبع كل error جواه بالـ stack بتاعه تحت [[[errors]]]، فاللوج بيبقى فيه كل حاجة.
- الفرق عن [[ValidationError]] بتاع الـ solCode: هناك [[fields]] object رسايل بالخانة، وهنا errors كاملة بـ stack. استخدم AggregateError لما كل سبب error حقيقي (طلبات فشلت)، و [[fields]] لما هي رسايل للفورم.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[class X extends Error]] | تفرّق بين الأخطاء بـ [[instanceof]] مش بمقارنة الرسايل |
| [[this.name = this.constructor.name]] | اسم النوع الحقيقي يظهر في الـ logs |
| [[status]] | الطبقة اللي فوق تعرف ترد بأنهي HTTP code |
| [[{ cause: err }]] | رسالة مفهومة فوق، والسبب التقني محفوظ تحت |
| [[if (err instanceof AppError) throw err]] | errors بتاعتك تعدّي، والغريبة تتلف |
| [[AggregateError]] و [[e.errors]] | كذا سبب في error واحد، زي اللي بترميه [[Promise.any]] لما كله يفشل |`,
          lines: [
            R`كلاس أساسي لكل أخطاء التطبيق، بيورث من [[Error]] فبياخد [[message]] و [[stack]] وبيعدّي [[instanceof Error]]. وجود أب واحد بيخليك تفرّق بين «خطأ إحنا عارفينه» وأي error تاني.`,
            R`الـ constructor بياخد الرسالة ومعاها object خيارات بيتفك على طول: [[status]] (افتراضي 500) و [[cause]]. و [[= {}]] الأخيرة عشان لو مبعتش خيارات خالص ميرميش وهو بيفك [[undefined]].`,
            R`[[super]] بينادي constructor بتاع [[Error]]، ولازم ييجي قبل أي استخدام لـ [[this]]. وبنبعتله [[cause]]، و [[Error]] نفسه بيقبلها وبيحطها في [[err.cause]].`,
            R`من غير السطر ده [[name]] هيفضل [["Error"]] لكل الأنواع. [[this.constructor.name]] بيجيب اسم الكلاس الفعلي اللي اتعمل منه الـ object، فـ [[NotFoundError]] اسمه يبقى [["NotFoundError"]] من غير ما يكتبه بنفسه.`,
            R`status الـ HTTP اللي المفروض يرجع للعميل، فالـ error handler في السيرفر يقرا [[err.status]] على طول بدل ما يخمّن.`,
            R`نهاية الـ constructor.`,
            R`نهاية [[AppError]].`,
            R`نوع أخص لحالة «مش موجود». بيورث من [[AppError]]، فـ [[instanceof AppError]] و [[instanceof NotFoundError]] الاتنين [[true]] عليه.`,
            R`constructor بياخد اسم الحاجة بس ويبني الرسالة ويثبّت [[status: 404]]، فاللي بيرمي يكتب [[new NotFoundError("اليوزر")]] من غير ما يفتكر رقم الـ status.`,
            R`نهاية [[NotFoundError]].`,
            R`دالة [[async]] بتجيب يوزر من API، وبتحوّل أي فشل لنوع من أخطاءنا.`,
            R`[[try]] حوالين الطلب وقراية الرد، عشان أي error منهم يتجمع في الـ catch.`,
            R`الطلب. لو الشبكة وقعت أو الـ domain مش موجود، [[fetch]] بترمي TypeError (رسالته في Node [[fetch failed]]).`,
            R`404 مش error عند fetch، فبنرمي النوع الواضح بنفسنا عشان اللي فوق يعرف يتصرف (يعرض «مش موجود» بدل «حصلت مشكلة»).`,
            R`بنرجّع الداتا. الـ [[await]] هنا مهمة: من غيرها لو [[res.json()]] فشلت، الـ rejection هتطلع برّه الـ try والـ catch اللي تحت مش هيشوفها.`,
            R`هنا بيوصل أي error من فوق: [[NotFoundError]] بتاعنا، أو error الشبكة، أو JSON بايظ.`,
            R`لو الـ error من أخطاءنا (زي [[NotFoundError]]) بنعدّيه زي ما هو، عشان منلفّهوش تاني ويضيع الـ status بتاعه.`,
            R`غير كده ده error غريب (شبكة مثلًا)، فبنلفه في [[AppError]] برسالة مفهومة، والأصلي محفوظ في [[cause]] فالتفاصيل مبتضيعش وانت بتدوّر على المشكلة.`,
            R`نهاية الـ catch.`,
            R`نهاية [[loadUser]].`,
            R`[[catch]] على الـ Promise بتطبع السلسلة كلها. الـ domain هنا وهمي فالطلب بيفشل: بيطبع [[AppError 500 فشل تحميل اليوزر]] ومعاه [[fetch failed]] من [[e.cause?.message]]. و [[?.]] عشان مش كل error ليه cause.`,
          ],
          sol: R`من غير نت أو بدومين غلط، [[fetch]] نفسها بترمي [[TypeError: fetch failed]] (في المتصفح [[Failed to fetch]])، فالـ catch بيلفّها في AppError. الناتج: [[AppError 500 فشل تحميل اليوزر]] و [[e.cause]] هو الـ TypeError الأصلي، وفي Node جواه كمان [[cause]] فيه كود زي [[ENOTFOUND]]. يعني الرسالة العامة لليوزر، والسبب الحقيقي محفوظ للـ logs.

[[ValidationError]] بتورث من AppError وبتضيف [[fields]]، و [[this.name]] بيطلع [["ValidationError"]] لوحده بفضل [[this.constructor.name]]. الغلطة الشائعة إنك تعمل [[this.fields = fields]] قبل [[super(...)]] فيطلع ReferenceError.`,
          solCode: R`class ValidationError extends AppError {
  constructor(fields) {
    super("البيانات مش صحيحة", { status: 400 });
    this.fields = fields;
  }
}
const err = new ValidationError({ email: "لازم يبقى إيميل صحيح" });
console.log(err.name, err.status, err.fields, err instanceof AppError);
// ValidationError 400 { email: 'لازم يبقى إيميل صحيح' } true`
        },
        {
          cmd: "الأخطاء العامة: unhandledrejection و uncaughtException",
          title: "تمسك أي error محدش مسكه قبل ما البرنامج يقع ساكت",
          desc: R`أي error محدش مسكه بيوصل لآخر مكان: في Node بيوقّع البرنامج كله بكود خروج ١، وفي المتصفح بيطلع أحمر في Console والصفحة تكمّل. الـ global handlers هي آخر شبكة: [[process.on("unhandledRejection")]] و [[process.on("uncaughtException")]] في Node، و [[window]] events اسمها [[error]] و [[unhandledrejection]] في المتصفح.

وظيفتهم **تسجّل** الـ error (لوج أو خدمة زي Sentry) وتقفل بنضافة، مش إنهم يخلّوا البرنامج يكمّل كأن مفيش حاجة. الـ try/catch في المكان الصح لسه هو الأساس (درس «try و catch و finally»).`,
          example: R`process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", reason instanceof Error ? reason.message : reason);
  process.exitCode = 1;
});
process.on("uncaughtException", (err, origin) => {
  console.error("[uncaughtException]", origin, err.message);
  process.exit(1);
});
process.on("exit", (code) => console.error("exit code", code));
Promise.reject(new Error("DB اتقفلت"));
setTimeout(() => { throw new Error("bug في timer"); }, 10);
setTimeout(() => console.log("مش هتتطبع"), 50);`,
          try: R`احفظ المثال [[gh.mjs]] وشغّله، وبعدين امسح الـ handler الأول بس وشغّل تاني: الـ rejection بقى بيوصل لأنهي handler، و [[origin]] بقى إيه؟ وبعدين اعمل صفحة HTML فيها [[window.addEventListener("unhandledrejection", ...)]] و [[fetch("/nope.json").then((r) => r.json())]] وشوف الـ reason.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[const p = Promise.reject(new Error("late")); setTimeout(() => p.catch(() => console.log("اتمسك")), 0);]] في Node 24 من غير أي handler. هيطبع «اتمسك» ولا هيقع؟ وبعدين غيّر [[setTimeout(..., 0)]] لـ [[queueMicrotask(...)]] وتوقّع تاني، وشغّل الاتنين.`, done: R`نسخة [[setTimeout]] بتقع بـ [[Error: late]] وكود ١ و «اتمسك» مبتتطبعش، لأن Node بيفحص الـ rejections اللي ملهاش handler بعد ما الـ microtasks تخلص وقبل الـ timer. نسخة [[queueMicrotask]] بتطبع «اتمسك في microtask» ومبتقعش، وتقدر تقول القاعدة: الـ [[.catch]] لازم يتحط قبل ما اللفة الحالية تخلص.`, sol: R`**التوقع:** نسخة [[setTimeout]] هتقع، ونسخة [[queueMicrotask]] هتطبع.

~~~js late-timeout.js
const p = Promise.reject(new Error("late"));
setTimeout(() => p.catch(() => console.log("اتمسك")), 0);
~~~

~~~text الناتج (node late-timeout.js، Node 24، أول ٥ سطور والكود)
file:///C:/Users/ali/code/global-errors/late-timeout.js:1
const p = Promise.reject(new Error("late"));
                         ^

Error: late
exit code: 1
~~~

~~~js late-microtask.js
const p = Promise.reject(new Error("late"));
queueMicrotask(() => p.catch(() => console.log("اتمسك في microtask")));
~~~

~~~text الناتج (node late-microtask.js; echo "exit code: $?")
اتمسك في microtask
exit code: 0
~~~

**ليه كده:**

- **[[Promise.reject(...)]]** بيعمل Promise مرفوض فورًا، ومفيش حد عامله [[.catch]] لسه.
- **Node بيفحص إمتى؟** بعد ما الكود الحالي يخلص **وكل الـ microtasks** (الـ [[.then]] و [[.catch]] و [[queueMicrotask]]) تخلص، Node بيبص: فيه Promise مرفوض ومحدش مسكه؟ لو أيوه، ده [[unhandledRejection]]، والسلوك الافتراضي من Node 15 إنه يرميه كـ error ويقفل البرنامج بكود ١.
- **[[setTimeout(..., 0)]]** حتى بصفر بيتنفّذ في دور الـ timers، وده **بعد** الفحص. فالبرنامج وقع قبل ما الـ [[.catch]] يتحط، و «اتمسك» متطبعتش.
- **[[queueMicrotask]]** بيتنفّذ في نفس دور الـ microtasks، **قبل** الفحص، فالـ [[.catch]] اتحط في الوقت، و Node شاف إن الـ Promise ليه handler.

**القاعدة:** الـ [[.catch]] (أو الـ [[await]] جوه try) لازم يتحط قبل ما اللفة الحالية من الكود والـ microtasks تخلص. عمليًا: اعمل [[await]] أو [[.catch]] على أي Promise في نفس المكان اللي عملته فيه.

**الغلطة الشائعة:** تخزّن Promise في متغير وتعمله [[await]] بعدين بعد [[await]] تاني بياخد وقت. لو اترفض في النص، البرنامج بيقع بنفس الطريقة (تمرين «قارن وقيس» في درس async و await).` },
            { lvl: 'تطبيق', t: R`ابني [[crash-guard.mjs]] تعمله import في أول أي سكربت: بيسجّل [[unhandledRejection]] و [[uncaughtException]]، ولكل واحد بيكتب سطر JSON في [[crash.log]] فيه [[time]] و [[type]] و [[message]] و [[stack]]، وبعدين [[process.exit(1)]]. و [[process.on("exit")]] بيطبع كود الخروج.`, done: R`سكربت فيه [[Promise.reject(new Error("x"))]] وسكربت فيه [[setTimeout(() => null.a)]] الاتنين بيخرجوا بكود ١ ([[echo $?]] أو [[$LASTEXITCODE]])، و [[crash.log]] فيه سطرين JSON صالحين ([[JSON.parse]] لكل سطر بينجح) فيهم النوع الصح والـ stack، وتشغيل السكربت مرتين بيزوّد سطور مش بيمسح القديم.`, sol: R`~~~js crash-guard.mjs
import { appendFileSync } from "node:fs";

const LOG = new URL("./crash.log", import.meta.url);

function record(type, err) {
  const e = err instanceof Error ? err : new Error(String(err));
  const line = JSON.stringify({
    time: new Date().toISOString(),
    type,
    message: e.message,
    stack: e.stack,
  });
  appendFileSync(LOG, line + "\n");
  console.error($__bt[$__{type}] $__{e.message} (اتسجّل في crash.log)$__bt);
}

process.on("unhandledRejection", (reason) => {
  record("unhandledRejection", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  record("uncaughtException", err);
  process.exit(1);
});

process.on("exit", (code) => console.error("exit code", code));
~~~

سكربتين بيوقعوا بطريقتين:

~~~js reject.mjs
import "./crash-guard.mjs";

Promise.reject(new Error("x"));
~~~

~~~js timer-null.mjs
import "./crash-guard.mjs";

setTimeout(() => null.a, 10);
~~~

وسكربت بيقرا [[crash.log]] ويعمل [[JSON.parse]] لكل سطر (لو أي سطر مش JSON صالح هيقع):

~~~js check-log.mjs
import { readFileSync } from "node:fs";

const lines = readFileSync(new URL("./crash.log", import.meta.url), "utf8").trim().split("\n");
for (const line of lines) {
  const entry = JSON.parse(line);
  console.log(entry.type.padEnd(19), entry.message, "| stack:", entry.stack.split("\n").length, "سطور");
}
console.log("عدد السطور:", lines.length);
~~~

~~~text الناتج (Git Bash، Node 24، بعد ما مسحنا crash.log)
$ node reject.mjs; echo "\$? = $?"
[unhandledRejection] x (اتسجّل في crash.log)
exit code 1
$? = 1
[uncaughtException] Cannot read properties of null (reading 'a') (اتسجّل في crash.log)
exit code 1
$? = 1
unhandledRejection  x | stack: 5 سطور
uncaughtException   Cannot read properties of null (reading 'a') | stack: 4 سطور
عدد السطور: 2
--- تشغيل reject.mjs تاني:
عدد السطور: 3
~~~

وفي PowerShell كود الخروج في [[$LASTEXITCODE]]:

~~~text الناتج (PowerShell 7)
[unhandledRejection] x (اتسجّل في crash.log)
exit code 1
LASTEXITCODE = 1
~~~

**ليه كده:**

- **[[import "./crash-guard.mjs"]] أول سطر:** import من غير أسامي بينفّذ الملف بس. ولأن الـ imports بتتنفّذ قبل جسم السكربت، الـ handlers بتتسجّل قبل أي سطر ممكن يوقع.
- **[[unhandledRejection]]:** Promise اترفض ومحدش مسكه ([[reject.mjs]]). **[[uncaughtException]]:** throw عادي محدش مسكه، هنا [[null.a]] جوه timer بيرمي [[TypeError]].
- **[[err instanceof Error ? err : new Error(String(err))]]:** اللي بيترفض ممكن يبقى أي حاجة ([[Promise.reject("نص")]])، فبنحوّله لـ Error عشان يبقى فيه [[message]] و [[stack]] دايمًا.
- **[[appendFileSync]] مش [[appendFile]]:** إحنا على وشك [[process.exit]]. النسخة الـ async كانت هتبدأ تكتب والبرنامج يقفل قبل ما تخلص. الـ sync بتخلص الكتابة الأول. وهي append، فالتشغيل التاني زوّد سطر (بقوا ٣) ومسحش القديم.
- **[[JSON.stringify]] لكل سطر:** الـ stack فيه سطور جديدة، و [[JSON.stringify]] بيحوّلها لـ [[\n]] جوه النص، فكل حدث بيفضل **سطر واحد** في الملف. ده اسمه JSON Lines، وكل سطر بيتقري لوحده.
- **[[process.on("exit")]]:** بيتنادى وقت الخروج بالكود. مينفعش تعمل فيه حاجة async.

**الغلطة الشائعة:** تسجّل [[uncaughtException]] وتنسى [[process.exit(1)]]. البرنامج هيكمّل بـ state بايظة (التمرين الجاي)، وكود الخروج هيبقى ٠ فالـ CI أو الـ process manager مش هيعرف إن فيه مشكلة.` },
            { lvl: 'تحدي', t: R`صلّح الكود البايظ: سيرفر فيه [[process.on("uncaughtException", (e) => console.log("تمام، كمّل", e.message))]] وبعدين request handler بيعمل [[connections++]] وبعدها بيرمي قبل [[connections--]]. ابعت ١٠ requests بايظة واطبع [[connections]]. اشرح ليه «كمّل عادي» غلط، وصلّحه بإن الـ handler يسجّل ويقفل السيرفر بـ [[server.close()]] ويخرج بكود ١، والـ restart يبقى شغل الـ process manager.`, done: R`قبل التصليح [[connections]] بيوصل 10 والسيرفر لسه شغال وبيكذب (الـ state باظ ومحدش عارف)، وبعد التصليح أول request بايظ بيكتب الـ error ويخرج بكود ١ بعد ما الـ requests المفتوحة تخلص، وكتبت في سطرين ليه وثائق Node بتقول إن الكمّل بعد [[uncaughtException]] مش آمن.`, sol: R`## السيرفر البايظ

~~~js server-broken.mjs
import http from "node:http";

let connections = 0;

process.on("uncaughtException", (e) => console.log("تمام، كمّل", e.message));

const server = http.createServer((req, res) => {
  if (req.url === "/stats") return res.end("connections = " + connections + "\n");
  connections++;
  if (req.url === "/bad") throw new Error("bug في الـ handler");
  res.end("ok\n");
  connections--;
});

server.listen(3100, () => console.log("شغال على 3100"));
~~~

عميل بيبعت ١٠ requests على [[/bad]] مع بعض (كل واحد بمهلة 500ms عشان مايستناش للأبد)، وبعدين يسأل [[/stats]]:

~~~js hammer.mjs
// بيبعت 10 requests على /bad (كل واحد بمهلة 500ms) وبعدين يسأل عن /stats
const port = process.argv[2];
const base = $__bthttp://127.0.0.1:$__{port}$__bt;
let failed = 0;
await Promise.all(
  Array.from({ length: 10 }, () =>
    fetch(base + "/bad", { signal: AbortSignal.timeout(500) }).catch(() => failed++),
  ),
);
console.log("requests على /bad من غير رد:", failed);
try {
  const res = await fetch(base + "/stats", { signal: AbortSignal.timeout(500) });
  console.log("/stats:", (await res.text()).trim());
} catch (err) {
  console.log("/stats:", err.name, "- السيرفر مش بيرد");
}
~~~

~~~bash demo-broken.sh
node server-broken.mjs > broken.out 2>&1 &
pid=$!
sleep 0.5
node hammer.mjs 3100
kill $pid
echo "--- اللي طبعه السيرفر:"
sort broken.out | uniq -c
~~~

~~~text الناتج (bash demo-broken.sh، Node 24)
requests على /bad من غير رد: 10
/stats: connections = 10
--- اللي طبعه السيرفر:
     10 تمام، كمّل bug في الـ handler
      1 شغال على 3100
~~~

## ليه «كمّل عادي» غلط

- كل request بايظ عمل [[connections++]] ووقع قبل [[connections--]]. الـ handler قال «تمام» وكمّل، فالعدّاد بقى **10** والسيرفر بيقول إن فيه ١٠ اتصالات مفتوحة وهي مش موجودة. لو العدّاد ده بيمنع اتصالات جديدة بعد حد معيّن، السيرفر هيقفل الباب على الناس من غير سبب.
- والأسوأ: الـ ١٠ requests **ماتردّش عليهم خالص** ([[res.end]] متنادتش)، فالعميل قعد مستني لحد مهلته. والسيرفر لسه «شغال» قدام أي health check.
- وثائق Node (صفحة process، جزء «Warning: Using uncaughtException correctly») بتقول بالظبط كده: بعد [[uncaughtException]] البرنامج في حالة مش معروفة، والـ resources ممكن تكون فاضلة مفتوحة، ومش آمن تكمّل. المسموح: تسجّل وتنضّف وتخرج.

## التصليح

~~~js server-fixed.mjs
import http from "node:http";

let connections = 0;

const server = http.createServer((req, res) => {
  if (req.url === "/stats") return res.end("connections = " + connections + "\n");
  connections++;
  if (req.url === "/bad") throw new Error("bug في الـ handler");
  res.end("ok\n");
  connections--;
});

let shuttingDown = false;

process.on("uncaughtException", (err) => {
  console.error("[uncaughtException]", err.stack.split("\n")[0]);
  if (shuttingDown) return;
  shuttingDown = true;
  process.exitCode = 1;
  // بطّل تستقبل جديد، واقفل لما المفتوحين يخلصوا
  server.close(() => {
    console.error("السيرفر اتقفل، خارج بكود 1");
    process.exit(1);
  });
  server.closeIdleConnections();
  // لو فيه request معلّق (زي اللي وقع في النص) متستناش للأبد
  setTimeout(() => {
    console.error("مهلة الـ 3 ثواني خلصت، خارج بالعافية");
    process.exit(1);
  }, 3000).unref();
});

server.listen(3101, () => console.log("شغال على 3101"));
~~~

~~~bash demo-fixed.sh
node server-fixed.mjs > fixed.out 2>&1 &
pid=$!
sleep 0.5
start=$(date +%s%N)
node hammer.mjs 3101
wait $pid
code=$?
echo "السيرفر خرج بكود $code بعد $(( ($(date +%s%N) - start) / 1000000 ))ms من أول request"
echo "--- اللي طبعه السيرفر:"
cat fixed.out
~~~

~~~text الناتج (bash demo-fixed.sh)
requests على /bad من غير رد: 10
/stats: TypeError - السيرفر مش بيرد
السيرفر خرج بكود 1 بعد 720ms من أول request
--- اللي طبعه السيرفر:
شغال على 3101
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
[uncaughtException] Error: bug في الـ handler
السيرفر اتقفل، خارج بكود 1
~~~

**كل حتة بتعمل إيه:**

- **[[server.close(cb)]]:** بيبطّل يقبل اتصالات جديدة، والـ callback بيتنادى لما **كل** الاتصالات المفتوحة تتقفل. ساعتها بنخرج بكود ١.
- **[[closeIdleConnections()]]:** يقفل الاتصالات الفاضية (keep-alive) على طول بدل ما تفضل مستنية.
- **[[shuttingDown]]:** الـ ١٠ requests وصلوا مع بعض، فالـ handler اتنادى ١٠ مرات. كلهم بيتسجّلوا في اللوج، بس القفل بيبدأ مرة واحدة بس.
- **[[process.exitCode = 1]]:** لو خرجنا بأي طريق، الكود ١.

## الغلطة اللي ظهرت وأنا ببنيه: request معلّق بيمنع القفل

الـ request اللي وقع في النص **مقفلش** الاتصال بتاعه. لما العميل كان عنده مهلة 500ms، هو اللي قفل، فالسيرفر خرج بعد حوالي 600ms. جرّبنا request واحد من غير مهلة عند العميل:

~~~js hammer-one.mjs
// request واحد بايظ من غير مهلة عند العميل، عشان نشوف مهلة السيرفر نفسه
const port = process.argv[2];
try {
  await fetch($__bthttp://127.0.0.1:$__{port}/bad$__bt);
} catch (err) {
  console.log("العميل:", err.name, err.message, "-", err.cause?.code);
}
~~~

~~~text الناتج (السيرفر شغال بـ server-fixed.mjs وبعدين node hammer-one.mjs 3101)
العميل: TypeError fetch failed - ECONNRESET
السيرفر خرج بكود 1 بعد 3167ms
شغال على 3101
[uncaughtException] Error: bug في الـ handler
مهلة الـ 3 ثواني خلصت، خارج بالعافية
~~~

من غير الـ [[setTimeout(..., 3000)]] السيرفر كان هيفضل مستني الـ request ده للأبد، و [[server.close]] عمرها ما هتنادي الـ callback. عشان كده لازم مهلة. و [[.unref()]] معناها «التايمر ده لوحده ميخلّيش البرنامج عايش»: لو كل حاجة قفلت قبله، البرنامج يخرج من غير ما يستناه. الأرقام بالـ ms بتتغيّر شوية كل تشغيل.

**مين يرجّع السيرفر؟** الـ process manager (systemd، أو pm2، أو Docker بـ [[restart: always]]) بيشوف كود ١ ويشغّل نسخة **جديدة** نضيفة. ده الفرق: بدل سيرفر شغال بـ state بايظة، سيرفر وقع ثانية ورجع سليم.` },
          ],
          ref: [
            { t: "MDN: Window: unhandledrejection event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event" },
            { t: "Node.js: process (uncaughtException و unhandledRejection)", url: "https://nodejs.org/api/process.html" },
            { t: "Node.js: Errors", url: "https://nodejs.org/api/errors.html" },
            { t: "MDN: Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
          ],
          flag: "script",
          deep: {
            why: R`في Node من النسخة 15، أي Promise اترفض ومحدش مسكه بيوقّع الـ process كله، فـ API كامل بيقع عشان [[await]] واحدة ناقصة. والـ global handler هو اللي بيضمن إن السبب يتسجّل في اللوج بدل ما السيرفر يموت ساكت، وإن الخروج يبقى بكود ١ فالـ process manager (systemd أو Docker أو PM2) يعرف ويعيد التشغيل. وفي المتصفح من غيرهم الـ errors اللي بتحصل عند اليوزرز بتضيع في Console محدش بيفتحه.`,
            how: R`Node: لما Promise يترفض، بيتسجّل في لستة. بعد ما الـ microtasks تخلص، أي واحد لسه ملوش handler بيطلّع [[unhandledRejection]]. لو مفيش listener للحدث ده، Node (الوضع الافتراضي [[--unhandled-rejections=throw]]) بيحوّله لـ uncaught exception، فلو فيه [[uncaughtException]] listener بياخده و [[origin]] بيبقى [["unhandledRejection"]]، ولو مفيش البرنامج بيقع. ولو الـ reason مش Error (زي [[Promise.reject("نص")]]) Node بيطبع [[UnhandledPromiseRejection]] بكود [[ERR_UNHANDLED_REJECTION]].

[[uncaughtException]] بيتنادى لأي throw وصل لآخر الـ stack. وجوده بيمنع الخروج، فالبرنامج **بيكمّل** (جرّبتها: timer بعده اشتغل عادي)، وده الخطر: نص عملية اتنفّذت والـ state ممكن يكون باظ. عشان كده بنسجّل ونعمل [[process.exit(1)]].

[[process.exitCode = 1]] بيحدد كود الخروج من غير ما يقفل فورًا (اللي شغال يكمّل)، و [[process.exit(1)]] بيقفل حالًا. و [[exit]] event بيتنادى في الحالتين، وجواه كود synchronous بس.

المتصفح: [[window]] بيطلّع [[error]] لأي throw محدش مسكه ([[event.message]] و [[event.filename]] و [[event.lineno]] و [[event.error]])، و [[unhandledrejection]] لأي Promise مترفض ([[event.reason]] و [[event.promise]]). و [[event.preventDefault()]] بيمنع الرسالة الافتراضية في Console (من MDN). والصفحة بتكمّل في الحالتين.`,
            when: R`في أي سيرفر أو سكربت Node هيشتغل لوحده (cron، worker، API): handler واحد في أول ملف بيسجّل ويخرج. وفي أي تطبيق ويب في production: listener على الحدثين بيبعت الـ error لخدمة تتبّع. ومش بديل عن try/catch: الـ handler بيعرف إن فيه حاجة وقعت، بس مبيعرفش يعرض رسالة مفيدة لليوزر في المكان الصح.`,
            mistakes: R`تحط [[uncaughtException]] وتكمّل عادي بعده كأن مفيش حاجة: الـ state باظ. وتحط [[unhandledRejection]] فاضي عشان «التحذير يختفي»: كده بتبلع bugs. وتنسى إن [[.catch]] اللي بيتحط في [[setTimeout]] متأخر: البرنامج بيكون وقع. وتعمل حاجة async جوه [[exit]] event (مش هتخلص). وفي المتصفح تقرا [[event.reason.message]] من غير ما تتأكد إن الـ reason Error أصلًا. والـ scripts من دومين تاني بتوصّل [[Script error.]] من غير تفاصيل إلا لو [[crossorigin]] متحطوط والسيرفر بيبعت CORS (من MDN).`
          },
          teach: R`## الفكرة في سطر

أي error محدش مسكه بيوصل لـ «آخر الدنيا». المثال بيحط شبكة هناك في Node: handler للـ Promise اللي اترفض من غير catch، و handler لأي throw وصل لفوق، وبعدين بيعمل الغلطتين عمدًا عشان نشوفهم بيتمسكوا. كل حاجة هنا اتشغّلت على ويندوز 11 بـ Node 24.22، وجزء المتصفح في Chrome 156 (headless بـ playwright).

---

## ١. من غير أي handler: Node بيقع

~~~text crash.mjs
Promise.reject(new Error("DB اتقفلت"));
~~~

~~~text الناتج (Node 24)
file:///C:/.../crash.mjs:1
Promise.reject(new Error("DB اتقفلت"));
               ^

Error: DB اتقفلت
    at file:///C:/.../crash.mjs:1:16

Node.js v24.22.1
~~~

وكود الخروج ١. من Node 15 ده الافتراضي: Promise اترفض ومحدش عمله [[.catch]] ولا [[await]] جوه try = البرنامج كله يقع. ولو الـ reason مش Error:

~~~text الناتج (Node 24، Promise.reject("نص مش Error"))
UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "نص مش Error".
  code: 'ERR_UNHANDLED_REJECTION'
~~~

مفيش stack يقولك فين، وده سبب تاني إنك ترمي [[Error]] دايمًا مش string.

---

## ٢. [[process.on("unhandledRejection")]]

~~~text gh.mjs
process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", reason instanceof Error ? reason.message : reason);
  process.exitCode = 1;
});
~~~

- [[process]]: object عام في Node بيمثّل البرنامج الشغال، وهو EventEmitter (درس «EventEmitter»)، فـ [[.on(name, fn)]] بتشترك في حدث.
- [[reason]]: القيمة اللي الـ Promise اترفض بيها (غالبًا Error، بس ممكن أي حاجة). الـ listener بياخد كمان [[promise]] نفسه كـ argument تاني لو محتاجه.
- [[reason instanceof Error ? reason.message : reason]]: لو Error اطبع الرسالة، غير كده اطبع القيمة زي ما هي.
- [[console.error]]: بيكتب على stderr مش stdout، فاللوج بيفصل الأخطاء.
- [[process.exitCode = 1]]: «لما تخلص، اخرج بكود ١». مش بيقفل دلوقتي.

مجرد وجود الـ listener ده بيوقّف الوقوع الافتراضي. يعني انت اللي مسؤول تقرر: تخرج ولا لأ.

---

## ٣. [[process.on("uncaughtException")]]

~~~text gh.mjs
process.on("uncaughtException", (err, origin) => {
  console.error("[uncaughtException]", origin, err.message);
  process.exit(1);
});
~~~

- بيتنادى لأي [[throw]] وصل لآخر الـ call stack من غير ما try يمسكه، زي throw جوه [[setTimeout]] (ليه try اللي برّه مبيمسكوش؟ درس «try و catch و finally» الجزء ٨).
- [[origin]]: نص بيقول جه منين: [["uncaughtException"]] لـ throw عادي، و [["unhandledRejection"]] لو Promise اترفض ومفيش listener للحدث اللي فوق (جرّبت: شيلت الـ handler الأول فالـ rejection وصل هنا و [[origin]] بقى [[unhandledRejection]]).
- [[process.exit(1)]]: اقفل **حالًا** بكود ١.

### ليه لازم تخرج؟

جرّبت handler بيطبع بس ومبيخرجش، وبعده timer:

~~~text الناتج (Node 24)
caught a
كمّل عادي بعد uncaught
~~~

البرنامج كمّل. ده شكله حلو بس خطر: الـ error حصل في نص حاجة (اتصال اتفتح ومتقفلش، عداد زاد ومنقصش)، ومحدش عارف الـ state بقى عامل إزاي. وثائق Node نفسها بتقول إن الكمّل بعد [[uncaughtException]] مش آمن، والصح: سجّل، واقفل، وخلّي الـ process manager (systemd أو Docker [[restart: always]] أو PM2) يشغّله من جديد نضيف.

---

## ٤. [[exit]] والتشغيل

~~~text gh.mjs
process.on("exit", (code) => console.error("exit code", code));
Promise.reject(new Error("DB اتقفلت"));
setTimeout(() => { throw new Error("bug في timer"); }, 10);
setTimeout(() => console.log("مش هتتطبع"), 50);
~~~

~~~powershell
node gh.mjs; $LASTEXITCODE
~~~

~~~text الناتج (Node 24)
[unhandledRejection] DB اتقفلت
[uncaughtException] uncaughtException bug في timer
exit code 1
1
~~~

| اللي حصل | مين مسكه | ليه بالترتيب ده |
|---|---|---|
| [[Promise.reject]] | [[unhandledRejection]]، وحط exitCode بـ 1 | Node بيفحص الـ rejections بعد ما الكود المتزامن والـ microtasks يخلصوا، قبل أي timer |
| throw في timer بعد 10ms | [[uncaughtException]] و [[origin]] بـ [[uncaughtException]] | ده throw عادي مش Promise |
| [[process.exit(1)]] | | بيقفل حالًا، فالـ timer بتاع 50ms عمره ما اشتغل |
| [[exit]] event | بيطبع الكود | بيتنادى قبل الخروج في كل الأحوال |

في bash بتشوف الكود بـ [[echo $?]] بدل [[$LASTEXITCODE]].

---

## ٥. الـ catch المتأخر

Node بيقرر «الـ Promise ده ملوش handler» بعد ما **الـ microtasks** تخلص. فلو حطيت الـ catch في timer، متأخر:

~~~text late.mjs
const p = Promise.reject(new Error("late"));
setTimeout(() => p.catch(() => console.log("اتمسك متأخر")), 0);
~~~

~~~text الناتج (Node 24)
Error: late
    at file:///C:/.../late.mjs:1:24
~~~

وقع، و «اتمسك متأخر» متطبعتش. نفس الكود بـ [[queueMicrotask(() => p.catch(...))]] بدل [[setTimeout]] طبع «اتمسك في microtask» ومقعش، لأن الـ microtask بيشتغل قبل الفحص. القاعدة العملية: اعمل [[await]] أو [[.catch]] في نفس المكان اللي عملت فيه الـ Promise.

(ولو فيه [[unhandledRejection]] listener والـ catch اتحط بعدين، Node بيطلّع حدث [[rejectionHandled]] وتحذير [[PromiseRejectionHandledWarning]]. جرّبتها.)

---

## ٦. في المتصفح: [[error]] و [[unhandledrejection]] على [[window]]

~~~text index.html
<script>
window.addEventListener("error", (event) => {
  console.log("[error]", event.message, "|", event.filename, event.lineno, "|", event.error instanceof Error);
});
window.addEventListener("unhandledrejection", (event) => {
  console.log("[unhandledrejection]", event.reason.message, event.promise instanceof Promise);
  event.preventDefault();
});
setTimeout(() => { null.x; }, 0);
fetch("/nope.json").then((r) => r.json());
Promise.reject(new Error("API وقع"));
setTimeout(() => console.log("الصفحة لسه شغالة"), 200);
</script>
~~~

~~~text الناتج (Chrome 156، الصفحة على http://127.0.0.1)
[error] Uncaught TypeError: Cannot read properties of null (reading 'x') | http://127.0.0.1:64275/ 10 | true
[unhandledrejection] API وقع true
[unhandledrejection] Failed to execute 'json' on 'Response': Unexpected end of JSON input true
الصفحة لسه شغالة
~~~

- [[event.message]]: نص الـ error زي ما Console بيكتبه، و [[event.filename]] و [[event.lineno]]: الملف والسطر (هنا الصفحة نفسها لأن الـ script جوه HTML)، و [[event.error]]: الـ Error object نفسه بالـ stack.
- [[event.reason]]: زي [[reason]] في Node، و [[event.promise]]: الـ Promise اللي اترفض.
- الـ fetch لملف مش موجود مرماش (404 مش error عند fetch)، بس [[r.json()]] على صفحة 404 فاضية رمت، ومحدش مسكها. ده أشهر unhandled rejection في الويب.
- [[event.preventDefault()]]: بيمنع المتصفح يطبع الرسالة الحمرا الافتراضية في Console (من MDN). مفيد لو انت بتسجّلها بنفسك.
- **الفرق الكبير عن Node**: الصفحة مبتقعش. «الصفحة لسه شغالة» اتطبعت. فمن غير listener محدش هيعرف إن فيه حاجة باظت عند اليوزر.

> لو الـ script جاي من دومين تاني (CDN)، المتصفح بيخبّي التفاصيل وبيدّيك [[Script error.]] بس، إلا لو [[<script crossorigin>]] والسيرفر بيبعت [[Access-Control-Allow-Origin]] (من MDN). خدمات زي Sentry بتعمل نفس الـ listeners دول ومعاهم إرسال للسيرفر.

---

## الخلاصة

| المكان | الحدث | بيتنادى لما |
|---|---|---|
| Node | [[unhandledRejection]] | Promise اترفض ومفيش catch لحد ما الـ microtasks خلصت |
| Node | [[uncaughtException]] | throw وصل لآخر الـ stack، أو rejection مفيش ليه listener |
| Node | [[exit]] | قبل الخروج دايمًا، وجواه كود synchronous بس |
| المتصفح | [[window]] و [[error]] | throw محدش مسكه، والصفحة بتكمّل |
| المتصفح | [[window]] و [[unhandledrejection]] | Promise اترفض من غير catch، والصفحة بتكمّل |

- من غير handlers: Node بيقع بكود ١، والمتصفح بيكتب في Console وبس.
- الـ handler بيسجّل ويخرج، مش بيكمّل كأن مفيش حاجة.
- [[process.exitCode = 1]] بيستنى، و [[process.exit(1)]] بيقفل حالًا.`,
          lines: [
            R`بنشترك في حدث [[unhandledRejection]] على [[process]] (الـ object اللي بيمثّل البرنامج في Node). بيتنادى لأي Promise اترفض ومحدش عمله catch، ووجوده لوحده بيمنع الوقوع الافتراضي.`,
            R`بنطبع على stderr: لو الـ [[reason]] Error بنطبع رسالته، ولو حاجة تانية (نص مثلًا) بنطبعها زي ما هي، لأن مش كل rejection جواه Error.`,
            R`[[process.exitCode = 1]]: لما البرنامج يخلص يخرج بكود ١ (يعني فشل)، من غير ما يقفل دلوقتي. كده اللي شغّل السكربت (CI أو cron) يعرف إن فيه حاجة وقعت.`,
            R`قفلة الـ listener.`,
            R`حدث [[uncaughtException]]: لأي [[throw]] محدش مسكه. [[origin]] بيقول هل هو throw عادي ([["uncaughtException"]]) ولا rejection ملوش listener ([["unhandledRejection"]]).`,
            R`بنسجّل النوع والرسالة. في الشغل الحقيقي هنا بتكتب في ملف لوج أو تبعت لخدمة تتبّع، ومعاها [[err.stack]].`,
            R`[[process.exit(1)]] بيقفل حالًا بكود ١. ده مقصود: بعد error محدش توقّعه الـ state ممكن يكون باظ، والأمان إنك تقفل ويتشغّل من جديد.`,
            R`قفلة الـ listener.`,
            R`حدث [[exit]] بيتنادى قبل ما البرنامج يقفل في كل الأحوال وبياخد الكود. بنطبعه عشان نشوف إن الكود فعلًا 1. جواه كود synchronous بس، أي حاجة async مش هتلحق.`,
            R`Promise مترفض ومحدش عمله catch ولا await: بعد ما الكود المتزامن يخلص، Node بينادي الـ [[unhandledRejection]] listener اللي فوق، فيطبع [[[unhandledRejection] DB اتقفلت]]. من غير الـ listener البرنامج كان هيقع هنا.`,
            R`throw جوه timer بعد 10ms: مفيش try حواليه ساعة ما بيشتغل، فبيروح للـ [[uncaughtException]] listener اللي بيطبع ويقفل بـ [[process.exit(1)]].`,
            R`timer بعد 50ms عمره ما بيشتغل: البرنامج اتقفل عند الـ 10ms. ده بيثبت إن [[process.exit]] بيقفل حالًا مش بيستنى اللي فاضل.`,
          ],
          sol: R`[[node gh.mjs]] بيطبع [[[unhandledRejection] DB اتقفلت]] وبعدين [[[uncaughtException] uncaughtException bug في timer]] وبعدين [[exit code 1]]، وكود الخروج 1، و «مش هتتطبع» فعلًا مبتتطبعش.

لما تمسح الـ handler الأول: الـ rejection بيروح لـ [[uncaughtException]] و [[origin]] بيبقى [[unhandledRejection]]، فبيطبع [[[uncaughtException] unhandledRejection DB اتقفلت]] ويخرج على طول بكود 1، والـ timer بتاع الـ 10ms مبيلحقش يشتغل.

في المتصفح (جرّبتها في Chrome 156): [[fetch("/nope.json")]] بيرجّع 404 من غير error، و [[r.json()]] على الصفحة الفاضية بترمي، فالـ listener بيطبع [[Failed to execute 'json' on 'Response': Unexpected end of JSON input]]، والصفحة بتكمّل عادي. التصليح: افحص [[r.ok]] قبل [[r.json()]] واعمل [[.catch]] أو [[await]] جوه try.`,
          solCode: R`// crash-guard.mjs: اعمله import في أول أي سكربت
import { appendFileSync } from "node:fs";
function record(type, err) {
  const line = JSON.stringify({
    time: new Date().toISOString(),
    type,
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
  });
  appendFileSync("crash.log", line + "\n");
}
process.on("unhandledRejection", (reason) => { record("unhandledRejection", reason); process.exit(1); });
process.on("uncaughtException", (err, origin) => { record(origin, err); process.exit(1); });
// المتصفح: نفس الفكرة
// window.addEventListener("error", (e) => send({ type: "error", message: e.message, stack: e.error?.stack }));
// window.addEventListener("unhandledrejection", (e) => send({ type: "rejection", message: String(e.reason?.message ?? e.reason) }));`
        }
      ]
    }
]);
