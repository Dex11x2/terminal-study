// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "WebAssembly",
      l: 3,
      lab: R`mkdir -p ~/lab/wasm-as && cd ~/lab/wasm-as && npm i -D -E assemblyscript && npx asinit . -y  # فولدر جديد فاضي: من غير npm init -y قبلها`,
      pre: [
        { to: "js/البيانات الثنائية: bytes و typed arrays", why: R`ذاكرة الـ wasm [[ArrayBuffer]] واحد كبير، وكل اللي بتعديه بتكتبه فيه bytes` },
        { to: "js/TypedArray: set و subarray و slice و كل الـ methods", why: R`[[new Int32Array(memory.buffer, ptr, len)]] و [[view.set(...)]] في كل درس في الوحدة` },
        { to: "js/Uint8Array: fromBase64 و toHex و TextEncoder", why: R`النصوص بتتحول bytes بـ [[TextEncoder]] قبل ما تدخل الـ wasm، وبترجع بـ [[TextDecoder]]` },
        { to: "js/BigInt بعمق", why: R`[[i64]] بيوصل JavaScript كـ [[BigInt]] ([[100n]])، ومبيتقارنش بـ [[===]] مع number` },
        { to: "js/async و await", why: R`[[WebAssembly.instantiate]] بترجّع Promise، والأمثلة كلها top-level [[await]]` },
      ],
      projects: [
        { lvl: 'صغير', t: R`آلة حاسبة wasm من الترمنال`, what: R`[[calc.c]] فيه [[add]] و [[sub]] و [[mul]] و [[divi]] بـ [[EXPORT]] (درس «wasm من C»)، و [[calc.mjs]] بيقرا [[process.argv]] بالشكل [[node calc.mjs 6 x 7]] (استخدم [[x]] مش [[*]] عشان الشيل بيفك النجمة) وينادي الدالة الصح.`, done: R`[[node calc.mjs 6 x 7]] بيطبع [[42]]. والقسمة على صفر بتطبع رسالة واضحة وبتخرج بكود ١ لأن الغلاف فحص قبل النداء، ولو شلت الفحص wasm بيرمي [[RuntimeError: divide by zero]]. وعملية مش معروفة أو رقم مش رقم بيطبعوا طريقة الاستخدام.`, sol: R`## الشكل النهائي

~~~text الترمنال
$ node calc.mjs 6 x 7
42
$ node calc.mjs 20 - 50
-30
$ node calc.mjs -7 / 2
-3
$ node calc.mjs 9 / 0
مينفعش تقسم على صفر          (exit 1)
$ node calc.mjs 6 x abc
usage: node calc.mjs <a> <+|-|x|/> <b>   (x للضرب عشان الشيل بيفك *)     (exit 1)
~~~

## هتشوف إيه

أداة سطر أوامر بتاخد رقمين وعملية، والحساب نفسه بيحصل جوه [[calc.wasm]] (456 byte). أي مدخل غلط بيطبع طريقة الاستخدام ويخرج بكود 1، والقسمة على صفر بتتمسك في JS قبل ما توصل للـ wasm.

~~~text شجرة الملفات
wasm-calc/
├── calc.c
├── calc.wasm     ← بيتعمل من calc.c
└── calc.mjs
~~~

~~~text calc.c
// calc.c: العمليات الأربعة، كل واحدة export
#define EXPORT(name) __attribute__((export_name(name)))
EXPORT("add") int add(int a, int b) { return a + b; }
EXPORT("sub") int sub(int a, int b) { return a - b; }
EXPORT("mul") int mul(int a, int b) { return a * b; }
EXPORT("divi") int divi(int a, int b) { return a / b; }
~~~

~~~bash
# أمر Docker بتاع درس «wasm من C»، أو زي ما اتجرّب هنا: clang 22 من @yowasp/clang بنفس الـ flags
clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -o calc.wasm calc.c
~~~

~~~js calc.mjs
// calc.mjs: node calc.mjs 6 x 7
import { readFile } from "node:fs/promises";
import { argv, exit } from "node:process";

const USAGE = "usage: node calc.mjs <a> <+|-|x|/> <b>   (x للضرب عشان الشيل بيفك *)";
const ops = { "+": "add", "-": "sub", x: "mul", "/": "divi" };

const [a, op, b, ...extra] = argv.slice(2);
const isInt32 = (s) => /^-?\d+$/.test(s ?? "") && Number(s) >= -(2 ** 31) && Number(s) <= 2 ** 31 - 1;
if (extra.length || !isInt32(a) || !isInt32(b) || !(op in ops)) {
  console.error(USAGE);
  exit(1);
}
if (op === "/" && Number(b) === 0 && !process.env.NO_CHECK) {
  console.error("مينفعش تقسم على صفر");
  exit(1);
}

const { instance } = await WebAssembly.instantiate(await readFile(new URL("calc.wasm", import.meta.url)));
console.log(instance.exports[ops[op]](Number(a), Number(b)));
~~~

## الناتج المتقاس (Node 24.22، Git Bash على ويندوز)

~~~text الناتج
$ node calc.mjs 6 x 7
42
$ node calc.mjs 20 - 50
-30
$ node calc.mjs 7 / 2
3
$ node calc.mjs -7 / 2
-3
$ node calc.mjs 9 / 0
مينفعش تقسم على صفر          (exit 1)
$ node calc.mjs 6 * 7
usage: ...                    (exit 1)
$ node calc.mjs 6 x abc
usage: ...                    (exit 1)
$ node calc.mjs 1 % 2
usage: ...                    (exit 1)
$ node calc.mjs
usage: ...                    (exit 1)
$ node calc.mjs 2147483647 + 1
-2147483648
~~~

**ولو شلت فحص القسمة على صفر** (السكربت بيتخطاه لو [[NO_CHECK=1]]، عشان نشوف الـ wasm لوحده):

~~~text NO_CHECK=1 node calc.mjs 9 / 0   (exit 1)
RuntimeError: divide by zero
    at calc.wasm.divi (wasm://wasm/calc.wasm-36b92262:wasm-function[3]:0x74)
    at file:///.../calc.mjs:20:38
~~~

## الكود حتة حتة

- **[[const ops = { "+": "add", "-": "sub", x: "mul", "/": "divi" }]]:** خريطة من الرمز لاسم الدالة اللي في الـ wasm، والسطر الأخير بياخد الدالة اللي اسمها [[ops[op]]] من [[instance.exports]] وينادي الصح من غير [[if]] لكل عملية. و [[op in ops]] بيرفض أي رمز تاني ([[%]]).
- **[[isInt32]]:** [[/^-?\d+$/]] أرقام صحيحة بس (بسالب اختياري)، وجوه حدود [[i32]]. من غيره [["abc"]] كانت هتوصل الـ wasm [[0]] بصمت، و [[7.5]] كانت هتبقى 7.
- **[[extra.length]]:** أي argument زيادة = استخدام غلط. ده اللي مسك [[6 * 7]] (تحت).
- **[[console.error]] و [[exit(1)]]:** رسايل الغلط على stderr، والكود 1 عشان أي سكربت بيستخدم الأداة يعرف إنها فشلت.
- **فحص الصفر قبل [[instantiate]]:** الـ wasm حتى مبيتحمّلش لو المدخل غلط.
- **[[new URL("calc.wasm", import.meta.url)]]:** المسار نسبةً لملف السكربت نفسه، فالأداة تشتغل من أي فولدر ([[node ../wasm-calc/calc.mjs 6 x 7]]).
- **[[2147483647 + 1]] = [[-2147483648]]:** نفس لفّة [[i32]] بتاعة الدرس؛ الأداة متعمّدة تسيبها عشان تشوفها، والحل لو مش عايزها فحص الناتج في JS أو [[long long]] في الـ C.
- **[[-7 / 2]] = [[-3]]:** القسمة الصحيحة في C بتقص ناحية الصفر (مش [[Math.floor]] اللي كانت هتدّي [[-4]]).

## الغلطات اللي حصلت فعلًا

1. **[[node calc.mjs 7 / 2]] طلّع usage في Git Bash:** Git Bash بيحوّل أي argument شكله مسار يونكس، و [[/]] لوحدها بقت [[C:/Program Files/Git/]] قبل ما توصل لـ Node (اتأكدت بـ [[node -e "console.log(process.argv.slice(1))" 6 / 2]] اللي طبع [[[ '6', 'C:/Program Files/Git/', '2' ]]]). الحل: [[MSYS_NO_PATHCONV=1 node calc.mjs 7 / 2]] (أو PowerShell، أو اكتب [[//]]). في Linux و Mac مفيش المشكلة دي.
2. **[[6 * 7]]:** الشيل بيفك النجمة لأسامي الملفات اللي في الفولدر، فـ Node استلم [[[ '6', 'calc.c', 'calc.mjs', 'calc.wasm', 'nocheck.txt', '7' ]]]. ده سبب [[x]]، و [[extra.length]] هو اللي حوّلها لـ usage بدل ناتج غريب. ([[6 \* 7]] بتوصل نجمة فعلًا.)` },
        { lvl: 'صغير', t: R`مكتبة نصوص بـ AssemblyScript`, what: R`[[reverse(s)]] و [[isPalindrome(s)]] و [[countWords(s)]] في [[assembly/index.ts]] (درس «AssemblyScript»)، وملف [[demo.mjs]] بيستوردهم من [[build/release.js]].`, done: R`[[reverse("abc")]] بترجّع [[cba]]، و [[isPalindrome("level")]] [[true]]، و [[reverse("")]] نص فاضي، و [[reverse(null)]] بترمي [[TypeError]] من الـ bindings بدل ما توقّع الـ wasm. وحجم [[release.wasm]] مكتوب في README.`, sol: R`## الشكل النهائي

~~~text node demo.mjs
reverse("abc")                 "cba"
reverse("")                    ""
reverse("مرحبا")               "ابحرم"
reverse("hi 😀!")              "!😀 ih"
isPalindrome("level")          true
isPalindrome("Level")          false
isPalindrome("")               false
countWords("  one two<TAB>three ") 3
reverse(null)                  TypeError: value must not be null
reverse(42)                    ""
~~~

## هتشوف إيه

٣ دوال نصوص مكتوبة بـ AssemblyScript ومتنادية من JS عادي كأنها دوال JS: بتقلب النص (حتى العربي والإيموجي)، وبتقول هو palindrome ولا لأ، وبتعدّ الكلمات. والـ [[null]] بيترفض بـ [[TypeError]] قبل ما يوصل للـ wasm.

~~~text شجرة الملفات
as-strings/
├── package.json        ← من npx asinit . -y
├── asconfig.json       ← من asinit (release: optimizeLevel 3، bindings: esm)
├── assembly/index.ts   ← الدوال
├── build/release.wasm  ← بيتعمل بـ npm run asbuild
├── build/release.js    ← الـ bindings
├── demo.mjs
└── README.md
~~~

~~~bash
mkdir as-strings && cd as-strings
npm i -D -E assemblyscript      # اتجرّب على 0.28.20
npx asinit . -y
# اكتب assembly/index.ts و demo.mjs
npm run asbuild
node demo.mjs
~~~

~~~text assembly/index.ts
// assembly/index.ts: مكتبة نصوص صغيرة
function isHigh(c: i32): bool { return c >= 0xD800 && c <= 0xDBFF; }
function isLow(c: i32): bool { return c >= 0xDC00 && c <= 0xDFFF; }

// بيقلب النص من غير ما يكسر الإيموجي (الحرف اللي واخد مكانين في UTF-16)
export function reverse(s: string): string {
  const n = s.length;
  const out = new Array<string>(0);
  let i = n - 1;
  while (i >= 0) {
    const c = s.charCodeAt(i);
    if (isLow(c) && i > 0 && isHigh(s.charCodeAt(i - 1))) {
      out.push(s.substring(i - 1, i + 1));
      i -= 2;
    } else {
      out.push(s.charAt(i));
      i -= 1;
    }
  }
  return out.join("");
}

export function isPalindrome(s: string): bool {
  return s.length > 0 && s == reverse(s);
}

export function countWords(s: string): i32 {
  let words = 0;
  let inWord = false;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    const space = c == 32 || c == 9 || c == 10 || c == 13;
    if (space) {
      inWord = false;
    } else if (!inWord) {
      inWord = true;
      words++;
    }
  }
  return words;
}
~~~

~~~js demo.mjs
// demo.mjs: node demo.mjs
import { reverse, isPalindrome, countWords } from "./build/release.js";

const show = (label, fn) => {
  try {
    console.log(label.padEnd(30), JSON.stringify(fn()));
  } catch (e) {
    console.log(label.padEnd(30), e.name + ":", e.message);
  }
};
show('reverse("abc")', () => reverse("abc"));
show('reverse("")', () => reverse(""));
show('reverse("مرحبا")', () => reverse("مرحبا"));
show('reverse("hi 😀!")', () => reverse("hi 😀!"));
show('isPalindrome("level")', () => isPalindrome("level"));
show('isPalindrome("Level")', () => isPalindrome("Level"));
show('isPalindrome("")', () => isPalindrome(""));
show('countWords("  one two<TAB>three ")', () => countWords("  one two\tthree "));
show("reverse(null)", () => reverse(null));
show("reverse(42)", () => reverse(42));
~~~

~~~md README.md
# as-strings

مكتبة نصوص صغيرة بـ AssemblyScript 0.28.20: $__btreverse$__bt و $__btisPalindrome$__bt و $__btcountWords$__bt.

$__bt$__bt$__btbash
npm i
npm run asbuild
node demo.mjs
$__bt$__bt$__bt

| الملف | الحجم |
|---|---|
| build/release.wasm | 6583 byte |
| build/release.js (الـ bindings) | 2836 byte |

$__btreverse(null)$__bt بترمي $__btTypeError: value must not be null$__bt من الـ bindings. وأي حاجة مش نص (زي $__bt42$__bt) بتتحول لنص فاضي من غير error، فلو المدخل جاي من بره افحص $__bttypeof s === "string"$__bt الأول.
~~~

## الكود حتة حتة

- **[[reverse]] بيمشي من الآخر للأول:** [[s.charAt(i)]] حرف حرف، بس لو لقى [[low surrogate]] (من [[0xDC00]] لـ [[0xDFFF]]) وقبله [[high surrogate]]، بياخدهم الاتنين مع بعض بـ [[substring(i - 1, i + 1)]]. الإيموجي 😀 في UTF-16 مكانين، ولو اتقلبوا لوحدهم بيبقى حرف مكسور. عشان كده [["hi 😀!"]] رجعت [["!😀 ih"]] سليمة.
- **[[new Array<string>(0)]] و [[push]] و [[join("")]]:** في AssemblyScript الـ array لازم نوعه معروف ([[<string>]]). وبنجمع الحتت وبعدين [[join]] مرة واحدة، بدل [[out += c]] اللي بيعمل نص جديد في الذاكرة مع كل حرف.
- **[[isPalindrome]]: [[s.length > 0 && s == reverse(s)]]:** [[==]] على النصوص في AssemblyScript بيقارن المحتوى (زي JS). والنص الفاضي اخترت إنه مش palindrome عشان [[isPalindrome(input)]] على خانة فاضية متقولش «آه». والمقارنة حساسة للحروف الكبيرة ([["Level"]] لأ)؛ لو عايز تتجاهلها اعمل [[toLowerCase()]] الأول.
- **[[countWords]]:** نفس حل تمرين درس «AssemblyScript»: بنعدّ بداية كل كلمة.
- **من غير ما تكتب أي تحويل:** [[build/release.js]] بيعمل لكل دالة بتاخد [[string]] غلاف: [[__lowerString]] يكتب النص في ذاكرة الـ wasm، والناتج بيترجع نص بـ [[__liftString]].

## اللي اتقاس واتلاحظ

- **الحجم:** [[release.wasm]] = 6583 byte و [[release.js]] = 2836 byte. معظم الـ wasm هو الـ runtime بتاع AssemblyScript (إدارة الذاكرة والـ GC والنصوص)، مش الـ ٣ دوال. (الـ [[sum.wasm]] بتاع C من غير مكتبة كان أقل من 1KB.)
- **[[reverse(null)]]** رمت [[TypeError: value must not be null]]. ده جاي من [[build/release.js]]: [[s = __lowerString(s) || __notnull()]]، و [[__lowerString(null)]] بترجّع 0 فـ [[__notnull()]] بترمي.
- **[[reverse(42)]] رجّعت [[""]] من غير error:** [[__lowerString]] بتفحص [[null]] بس، و [[(42).length]] = [[undefined]] فاتعمل نص طوله صفر. يعني الـ bindings مش بديل عن فحص النوع في JS (مكتوب في الـ README).` },
        { lvl: 'متوسط', dir: "wasm-upper-page", t: R`صفحة تكبير حروف حيّة ومتينة`, what: R`صفحة فيها [[textarea]] ونتيجة وعداد (درس «WebAssembly في المتصفح»)، بتحمّل [[text.wasm]] بدالة [[loadWasm(url, imports)]] بتجرّب [[instantiateStreaming]] ولو رميت [[TypeError]] بتاع الـ MIME ترجع لـ [[arrayBuffer()]] + [[instantiate]]، وبتقطّع النص الطويل بـ [[encodeInto]].`, done: R`مع سيرفر بيبعت [[application/wasm]] مفيش تحذير، ومع [[application/octet-stream]] بيظهر [[console.warn]] مرة واحدة والصفحة شغالة. ولو الملف 404 بتظهر رسالة فيها الـ status بدل [[CompileError]] (يعني فحصت [[res.ok]] قبل الـ compile). ونص 10 آلاف حرف عربي وانجليزي بيرجع سليم.`, sol: R`## الشكل النهائي

~~~view 330 الصفحة شغالة (الملفات في ملف واحد، والـ wasm في data: URL عشان المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تكبير حروف بـ wasm</title>
<link rel="icon" href="data:,">
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; max-width: 640px; }
  textarea { width: 100%; min-height: 90px; font: inherit; padding: 8px; box-sizing: border-box; }
  #out { white-space: pre-wrap; overflow-wrap: anywhere; background: #f3f4f6; padding: 8px; border-radius: 8px; min-height: 2em; max-height: 160px; overflow: auto; }
  #status { color: #555; }
  #status.err { color: #b91c1c; font-weight: 700; }
</style>
</head>
<body>
<main id="app" data-wasm="data:application/wasm;base64,AGFzbQEAAAABDgNgAX8AYAABf2ABfwF/AhEBA2Vudglsb2dfY291bnQAAAMDAgECBAUBcAEBAQUDAQACBggBfwFBgIAECwccAwZtZW1vcnkCAAdidWZfcHRyAAEFdXBwZXIAAgqEAgIIAEGAgISAAAv4AQEGfwJAIABBAU4NAEEAEICAgIAAIAAPC0EAIQFBACECAkACQCAAQQFGDQAgAEEBcSEDIABB/v///wdxIQRBACECQQAhAQNAAkAgAUGAgISAAGoiBS0AACIGQZ9/akH/AXFBGUsNACAFIAZBYGo6AAAgAkEBaiECCwJAIAFBgYCEgABqIgUtAAAiBkGff2pB/wFxQRlLDQAgBSAGQWBqOgAAIAJBAWohAgsgBCABQQJqIgFHDQALIANFDQELIAEtAICAhIAAIgVBn39qQf8BcUEZSw0AIAFBgICEgABqIAVBYGo6AAAgAkEBaiECCyACEICAgIAAIAALAEIEbmFtZQAJCG91dC53YXNtARwDAAlsb2dfY291bnQBB2J1Zl9wdHICBXVwcGVyBxIBAA9fX3N0YWNrX3BvaW50ZXIAeglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQEFY2xhbmdaMjIuMS42IChodHRwczovL2NvZGViZXJnLm9yZy9Zb1dBU1AvbGx2bS1wcm9qZWN0IGE4OTgyZDMwM2M0OWE5ZTlmMGVjNjZmZDJhYjZkZTIxODBmNThjY2MpAJQBD3RhcmdldF9mZWF0dXJlcwgrC2J1bGstbWVtb3J5Kw9idWxrLW1lbW9yeS1vcHQrFmNhbGwtaW5kaXJlY3Qtb3ZlcmxvbmcrCm11bHRpdmFsdWUrD211dGFibGUtZ2xvYmFscysTbm9udHJhcHBpbmctZnB0b2ludCsPcmVmZXJlbmNlLXR5cGVzKwhzaWduLWV4dA==">
  <h1>كبّر الحروف الإنجليزي</h1>
  <p id="status">بيحمّل text.wasm…</p>
  <textarea id="text" disabled aria-label="النص">hello wasm، مرحبا</textarea>
  <p id="count"></p>
  <div id="out" aria-live="polite"></div>
</main>
<script type="module">
// load-wasm.js: بيحمّل .wasm بأسرع طريقة، ولو السيرفر غلطان في الـ MIME بيرجع للطريقة العادية
let warned = false;

async function loadWasm(url, imports = {}) {
  const res = await fetch(url);
  if (!res.ok) throw new Error($__btمقدرتش أحمّل $__{url}: $__{res.status} $__{res.statusText}$__bt);
  try {
    return await WebAssembly.instantiateStreaming(res.clone(), imports);
  } catch (e) {
    const type = res.headers.get("content-type") ?? "(مفيش)";
    // TypeError بسبب الـ imports كمان بيبقى TypeError، فبنرجع للطريقة التانية بس لو الـ MIME هو السبب
    if (!(e instanceof TypeError) || type.startsWith("application/wasm")) throw e;
    if (!warned) {
      console.warn($__bt$__{url} جاي بـ Content-Type: $__{type} مش application/wasm، فهحمّله كله الأول. صلّح السيرفر عشان يبقى أسرع.$__bt, e.message);
      warned = true;
    }
    return WebAssembly.instantiate(await res.arrayBuffer(), imports);
  }
}

// main.js: الصفحة: textarea ونتيجة وعداد، والتكبير جوه text.wasm

const $ = (s) => document.querySelector(s);
const status = $("#status");
let changed = 0;

async function start() {
  const { instance } = await loadWasm($("#app").dataset.wasm, { env: { log_count: (n) => (changed += n) } });
  const { memory, buf_ptr, upper } = instance.exports;
  const BUF = 4096; // static unsigned char buf[4096] في text.c
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  function toUpperLong(text) {
    const view = new Uint8Array(memory.buffer, buf_ptr(), BUF);
    let rest = text;
    let result = "";
    let chunks = 0;
    changed = 0;
    while (rest.length > 0) {
      const { read, written } = encoder.encodeInto(rest, view);
      upper(written);
      result += decoder.decode(view.subarray(0, written));
      rest = rest.slice(read);
      chunks++;
    }
    return { result, chunks, changed };
  }

  const input = $("#text");
  const render = () => {
    const { result, chunks, changed } = toUpperLong(input.value);
    $("#out").textContent = result;
    $("#count").textContent = $__bt$__{changed} حرف اتغيّر | $__{encoder.encode(input.value).length} byte | $__{chunks} حتة$__bt;
  };
  input.addEventListener("input", render);
  input.disabled = false;
  status.textContent = "جاهز";
  render();
  window.toUpperLong = toUpperLong; // للتجربة من Console
}

start().catch((e) => {
  status.textContent = e.message;
  status.classList.add("err");
});
</script>
</body>
</html>
~~~

## هتشوف إيه

خانة نص فيها «hello wasm، مرحبا»، وتحتها سطر «9 حرف اتغيّر | 23 byte | 1 حتة»، وتحته النتيجة بالحروف الكبيرة. أي حاجة تكتبها بتتكبّر وانت بتكتب. ولو [[text.wasm]] مش موجود، السطر اللي فوق بيبقى أحمر وفيه الـ status. ولو السيرفر بيبعت الـ wasm بنوع غلط، الصفحة بتشتغل عادي وفي Console تحذير واحد.

> **افتحها من السيرفر مش بدبل كليك:** بعد [[node server.mjs]] افتح [[http://localhost:8080/]]. لو فتحت [[index.html]] كملف ([[start index.html]] في «ابدأ إزاي»)، Chrome بيرفض يحمّل [[main.js]] كـ module من [[file://]]: جرّبتها وطلع [[Access to script at 'file:///.../main.js' from origin 'null' has been blocked by CORS policy]]. و [[fetch("text.wasm")]] كمان محتاج سيرفر.

~~~text شجرة الملفات
wasm-upper-page/
├── index.html
├── main.js          ← الصفحة والتقطيع
├── load-wasm.js     ← loadWasm بالـ fallback
├── text.wasm        ← من text.c بتاع درس «WebAssembly في المتصفح»
├── server.mjs       ← سيرفر صغير تقدر تبوّظ فيه الـ MIME
└── e2e.mjs          ← الفحص في Chrome
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تكبير حروف بـ wasm</title>
<link rel="icon" href="data:,">
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; max-width: 640px; }
  textarea { width: 100%; min-height: 90px; font: inherit; padding: 8px; box-sizing: border-box; }
  #out { white-space: pre-wrap; overflow-wrap: anywhere; background: #f3f4f6; padding: 8px; border-radius: 8px; min-height: 2em; max-height: 160px; overflow: auto; }
  #status { color: #555; }
  #status.err { color: #b91c1c; font-weight: 700; }
</style>
</head>
<body>
<main id="app" data-wasm="text.wasm">
  <h1>كبّر الحروف الإنجليزي</h1>
  <p id="status">بيحمّل text.wasm…</p>
  <textarea id="text" disabled aria-label="النص">hello wasm، مرحبا</textarea>
  <p id="count"></p>
  <div id="out" aria-live="polite"></div>
</main>
<script type="module" src="main.js"></script>
</body>
</html>
~~~

~~~js load-wasm.js
// load-wasm.js: بيحمّل .wasm بأسرع طريقة، ولو السيرفر غلطان في الـ MIME بيرجع للطريقة العادية
let warned = false;

export async function loadWasm(url, imports = {}) {
  const res = await fetch(url);
  if (!res.ok) throw new Error($__btمقدرتش أحمّل $__{url}: $__{res.status} $__{res.statusText}$__bt);
  try {
    return await WebAssembly.instantiateStreaming(res.clone(), imports);
  } catch (e) {
    const type = res.headers.get("content-type") ?? "(مفيش)";
    // TypeError بسبب الـ imports كمان بيبقى TypeError، فبنرجع للطريقة التانية بس لو الـ MIME هو السبب
    if (!(e instanceof TypeError) || type.startsWith("application/wasm")) throw e;
    if (!warned) {
      console.warn($__bt$__{url} جاي بـ Content-Type: $__{type} مش application/wasm، فهحمّله كله الأول. صلّح السيرفر عشان يبقى أسرع.$__bt, e.message);
      warned = true;
    }
    return WebAssembly.instantiate(await res.arrayBuffer(), imports);
  }
}
~~~

~~~js main.js
// main.js: الصفحة: textarea ونتيجة وعداد، والتكبير جوه text.wasm
import { loadWasm } from "./load-wasm.js";

const $ = (s) => document.querySelector(s);
const status = $("#status");
let changed = 0;

async function start() {
  const { instance } = await loadWasm($("#app").dataset.wasm, { env: { log_count: (n) => (changed += n) } });
  const { memory, buf_ptr, upper } = instance.exports;
  const BUF = 4096; // static unsigned char buf[4096] في text.c
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  function toUpperLong(text) {
    const view = new Uint8Array(memory.buffer, buf_ptr(), BUF);
    let rest = text;
    let result = "";
    let chunks = 0;
    changed = 0;
    while (rest.length > 0) {
      const { read, written } = encoder.encodeInto(rest, view);
      upper(written);
      result += decoder.decode(view.subarray(0, written));
      rest = rest.slice(read);
      chunks++;
    }
    return { result, chunks, changed };
  }

  const input = $("#text");
  const render = () => {
    const { result, chunks, changed } = toUpperLong(input.value);
    $("#out").textContent = result;
    $("#count").textContent = $__bt$__{changed} حرف اتغيّر | $__{encoder.encode(input.value).length} byte | $__{chunks} حتة$__bt;
  };
  input.addEventListener("input", render);
  input.disabled = false;
  status.textContent = "جاهز";
  render();
  window.toUpperLong = toUpperLong; // للتجربة من Console
}

start().catch((e) => {
  status.textContent = e.message;
  status.classList.add("err");
});
~~~

~~~js server.mjs
// server.mjs: WASM_TYPE=application/octet-stream node server.mjs  عشان تجرّب السيرفر الغلطان
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ?? 8080;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".wasm": process.env.WASM_TYPE ?? "application/wasm" };

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const file = path.join(root, url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("not found");
  }
}).listen(PORT, () => console.log($__bthttp://localhost:$__{PORT}  (.wasm as $__{types[".wasm"]})$__bt));
~~~

~~~js e2e.mjs
// e2e.mjs: node e2e.mjs <port> : بيفتح الصفحة، ويجرّب نص 10 آلاف حرف، والـ 404
import { chromium } from "playwright-core";
const base = $__bthttp://localhost:$__{process.argv[2]}$__bt;
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
const warns = [];
page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") warns.push($__bt[$__{m.type()}] $__{m.text()}$__bt); });
await page.goto(base + "/");
await page.waitForFunction(() => !document.querySelector("#text").disabled || document.querySelector("#status.err"));
console.log("status:", await page.textContent("#status"), "|", await page.textContent("#count"));
console.log("out:", await page.textContent("#out"));
const long = await page.evaluate(() => {
  const words = ["hello", "مرحبا", "wasm", "😀", "يا", "world"];
  let t = "";
  for (let i = 0; t.length < 10000; i++) t += words[i % words.length] + " ";
  const input = document.querySelector("#text");
  input.value = t;
  input.dispatchEvent(new Event("input"));
  const out = document.querySelector("#out").textContent;
  return { chars: t.length, ok: out === t.replace(/[a-z]/g, (c) => c.toUpperCase()), broken: out.includes("\uFFFD"), count: document.querySelector("#count").textContent };
});
console.log("10k chars:", JSON.stringify(long));
console.log("console warnings:", warns.length ? warns.join("\n  ") : "none");
// الملف مش موجود: Playwright بيرجّع 404 لـ text.wasm والصفحة بتتحمّل من الأول
await page.route("**/text.wasm", (route) => route.fulfill({ status: 404, contentType: "text/plain", body: "not found" }));
await page.reload();
await page.waitForSelector("#status.err");
console.log("404 status line:", await page.textContent("#status"));
await browser.close();
~~~

~~~bash
PORT=8852 node server.mjs                                       # الصح
PORT=8853 WASM_TYPE=application/octet-stream node server.mjs    # الغلطان
node e2e.mjs 8852
node e2e.mjs 8853
~~~

## الناتج المتقاس (Chrome 158، playwright-core)

~~~text node e2e.mjs 8852   (application/wasm)
status: جاهز | 9 حرف اتغيّر | 23 byte | 1 حتة
out: HELLO WASM، مرحبا
10k chars: {"chars":10005,"ok":true,"broken":false,"count":"4830 حرف اتغيّر | 13110 byte | 4 حتة"}
console warnings: none
404 status line: مقدرتش أحمّل text.wasm: 404 Not Found
~~~

~~~text node e2e.mjs 8853   (application/octet-stream)
status: جاهز | 9 حرف اتغيّر | 23 byte | 1 حتة
out: HELLO WASM، مرحبا
10k chars: {"chars":10005,"ok":true,"broken":false,"count":"4830 حرف اتغيّر | 13110 byte | 4 حتة"}
console warnings: [warning] text.wasm جاي بـ Content-Type: application/octet-stream مش application/wasm، فهحمّله كله الأول. صلّح السيرفر عشان يبقى أسرع. Failed to execute 'compile' on 'WebAssembly': Incorrect response MIME type. Expected 'application/wasm'.
404 status line: مقدرتش أحمّل text.wasm: 404 Not Found
~~~

- مع [[application/wasm]] مفيش ولا تحذير، ومع [[octet-stream]] تحذير واحد بس فيه سبب Chrome بنصه: [[Incorrect response MIME type. Expected 'application/wasm'.]]، والصفحة شغالة في الحالتين.
- نص 10005 حرف (عربي وإنجليزي وإيموجي) = 13110 byte اتقطّع ٤ حتت ورجع مطابق بالظبط لـ [[replace(/[a-z]/g, ...)]] ومن غير [[\uFFFD]].
- الـ 404 ظهر كـ «مقدرتش أحمّل text.wasm: 404 Not Found» بالأحمر.

## الكود حتة حتة

- **[[if (!res.ok) throw ...]] قبل أي compile:** من غيره صفحة الـ 404 نفسها ([["not found"]]) بتروح للـ compiler، والرسالة بتبقى [[CompileError: WebAssembly.instantiate(): expected magic word 00 61 73 6d, found 6e 6f 74 20 @+0]] (جرّبتها: [[6e 6f 74 20]] هي حروف [["not "]]). رسالة صح بس محدش هيفهم منها إن الملف مش موجود.
- **[[instantiateStreaming(res.clone(), imports)]]:** الـ body بتاع الـ Response بيتقري مرة واحدة. لو الـ streaming فشل بعد ما بدأ يقرا، [[res.arrayBuffer()]] على نفس الـ Response مش هتلاقي body تقراه. الـ [[clone()]] بيخلّي عندنا نسخة للخطة التانية.
- **الشرط [[!(e instanceof TypeError) || type.startsWith("application/wasm")]]:** الـ MIME الغلط بيرمي [[TypeError]]، بس الـ imports الغلط (تمرين الدرس) بيرمي [[TypeError]] برضه. فبنرجع للطريقة التانية بس لو الـ Content-Type فعلًا مش wasm؛ غير كده الـ error الحقيقي بيطلع زي ما هو بدل ما يتخبّى.
- **[[warned]] برة الدالة:** التحذير مرة واحدة في عمر الصفحة حتى لو حمّلت ١٠ ملفات wasm.
- **[[data-wasm]] على [[<main>]]:** مسار الملف في الـ HTML مش في الكود، فالمعاينة اللي فوق نفس الكود بالظبط بس [[data-wasm]] فيها الـ wasm نفسه كـ [[data:application/wasm;base64,...]].
- **[[toUpperLong]]:** حل تمرين [[encodeInto]] بتاع الدرس، و [[changed]] بيتصفّر في أول كل نداء وبيتجمّع من [[log_count]] بتاع كل حتة.
- **[[input.disabled]] لحد ما الـ wasm يجهز**، و [[start().catch(...)]] بيعرض أي error في الصفحة بدل Console بس.
- **[[aria-live="polite"]]** على النتيجة: قارئ الشاشة بيقرا التغيير.

## الغلطات اللي حصلت وأنا ببنيه

- أول تشغيل للفحص كان فيه [[Failed to load resource: ... 404]] في الحالتين ومن غير ما أطلب ملف مش موجود: كان طلب [[favicon.ico]] اللي المتصفح بيعمله لوحده. [[<link rel="icon" href="data:,">]] شاله، فبقى أي تحذير في Console له معنى.
- أول نسخة من تست الـ 404 كانت بتنادي [[loadWasm("missing.wasm")]] من Console، وده بيختبر الدالة بس مش الصفحة. بقت [[page.route]] بيرجّع 404 لـ [[text.wasm]] نفسه والصفحة بتتحمّل من الأول، فاتأكدنا إن الرسالة بتظهر لليوزر.` },
        { lvl: 'متوسط', t: R`تقرير: wasm ولا JS؟`, what: R`سكربت [[report.mjs]] بيقيس بـ [[bench]] (الوسيط بعد warm-up) تلات حاجات في JS وفي wasm: الأعداد الأولية، ونداء [[add]] ملايين المرات، و [[countWords]] بتاعة AssemblyScript على نص كبير. من دروس «wasm من C» و «AssemblyScript» و «wasm يستاهل إمتى».`, done: R`بيطبع جدول بالعمودين ونسبة الفرق لكل حالة، ونفس الناتج في JS و wasm (لو اختلفوا بيطبع تحذير)، واتشغّل مرتين والترتيب ما اتغيّرش، و README فيه رأيك بالأرقام.`, sol: R`## الشكل النهائي

~~~text node report.mjs (التشغيلة الأولى)
Node v24.22.1 | 2026-11-21T10:44
┌─────────┬───────────────────────────┬─────────┬─────────┬──────────────────────────┬────────────┐
│ (index) │ case                      │ JS ms   │ wasm ms │ winner                   │ result     │
├─────────┼───────────────────────────┼─────────┼─────────┼──────────────────────────┼────────────┤
│ 0       │ 'count primes < 3M'       │ '441.6' │ '432.8' │ 'تعادل (فرق أقل من 10%)' │ '216816'   │
│ 1       │ 'add x 10M calls'         │ '2.5'   │ '28.3'  │ 'JS x11.15'              │ '10000000' │
│ 2       │ 'countWords (1.0M chars)' │ '2.0'   │ '4.1'   │ 'JS x2.08'               │ '200000'   │
└─────────┴───────────────────────────┴─────────┴─────────┴──────────────────────────┴────────────┘
~~~

## هتشوف إيه

سكربت واحد بيقيس ٣ حالات في JS وفي wasm بنفس الطريقة (الوسيط من ٧ بعد warm-up)، ويطبع جدول فيه الوقتين والكسبان وبكام، والناتج نفسه عشان تتأكد إن الاتنين بيحسبوا نفس الحاجة. ولو الناتجين اختلفوا بيطبع تحذير قبل الجدول.

~~~text شجرة الملفات
wasm-report/
├── report.mjs
├── sum.wasm                 ← من sum.c بتاع درس «wasm من C»
├── as/build/release.js      ← من مشروع AssemblyScript (فيه countWords من تمرين الدرس)
├── as/build/release.wasm
├── as/package.json          ← فيه "type": "module" عشان release.js يتحمّل كـ ES module
└── README.md
~~~

~~~js report.mjs
// report.mjs: node report.mjs  : تلات حالات في JS و wasm، بالوسيط بعد warm-up
import { readFile } from "node:fs/promises";
import { countWords as countWordsAS } from "./as/build/release.js";

const { instance } = await WebAssembly.instantiate(await readFile(new URL("sum.wasm", import.meta.url)));
const c = instance.exports;

function bench(fn, runs = 7) {
  fn();
  const times = [];
  let result;
  for (let i = 0; i < runs; i++) {
    const t = performance.now();
    result = fn();
    times.push(performance.now() - t);
  }
  times.sort((a, b) => a - b);
  return { result, median: times[Math.floor(runs / 2)] };
}

function countPrimesJS(limit) {
  let count = 0;
  for (let n = 2; n < limit; n++) {
    let prime = 1;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) { prime = 0; break; }
    }
    count += prime;
  }
  return count;
}
function countWordsJS(s) {
  let words = 0;
  let inWord = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    if (ch === 32 || ch === 9 || ch === 10 || ch === 13) inWord = false;
    else if (!inWord) { inWord = true; words++; }
  }
  return words;
}
const jsAdd = (a, b) => (a + b) | 0;
const words = ["مرحبا", "hello", "wasm", "يا", "world"];
const bigText = Array.from({ length: 200_000 }, (_, i) => words[i % 5] + (i % 10 === 9 ? "\n" : " ")).join("");

const cases = [
  ["count primes < 3M", () => countPrimesJS(3_000_000), () => c.count_primes(3_000_000)],
  ["add x 10M calls", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = jsAdd(s, 1); return s; },
                      () => { let s = 0; for (let i = 0; i < 1e7; i++) s = c.add(s, 1); return s; }],
  [$__btcountWords ($__{(bigText.length / 1e6).toFixed(1)}M chars)$__bt, () => countWordsJS(bigText), () => countWordsAS(bigText)],
];

const rows = [];
for (const [name, js, wasm] of cases) {
  const a = bench(js);
  const b = bench(wasm);
  if (a.result !== b.result) console.warn($__btتحذير: $__{name}: JS طلّع $__{a.result} و wasm طلّع $__{b.result}$__bt);
  const ratio = a.median / b.median;
  rows.push({
    case: name,
    "JS ms": a.median.toFixed(1),
    "wasm ms": b.median.toFixed(1),
    winner: ratio > 1.1 ? $__btwasm x$__{ratio.toFixed(2)}$__bt : ratio < 1 / 1.1 ? $__btJS x$__{(1 / ratio).toFixed(2)}$__bt : "تعادل (فرق أقل من 10%)",
    result: String(a.result),
  });
}
console.log($__btNode $__{process.version} | $__{new Date().toISOString().slice(0, 16)}$__bt);
console.table(rows);
~~~

~~~text node report.mjs (التشغيلة التانية)
Node v24.22.1 | 2026-11-21T10:45
┌─────────┬───────────────────────────┬─────────┬─────────┬──────────────────────────┬────────────┐
│ (index) │ case                      │ JS ms   │ wasm ms │ winner                   │ result     │
├─────────┼───────────────────────────┼─────────┼─────────┼──────────────────────────┼────────────┤
│ 0       │ 'count primes < 3M'       │ '448.0' │ '434.6' │ 'تعادل (فرق أقل من 10%)' │ '216816'   │
│ 1       │ 'add x 10M calls'         │ '2.6'   │ '29.2'  │ 'JS x11.39'              │ '10000000' │
│ 2       │ 'countWords (1.0M chars)' │ '2.0'   │ '4.0'   │ 'JS x2.05'               │ '200000'   │
└─────────┴───────────────────────────┴─────────┴─────────┴──────────────────────────┴────────────┘
~~~

الترتيب ماتغيّرش بين التشغيلتين: تعادل، و JS × 11، و JS × 2.

**فحص التحذير:** غيّرت [[countWordsJS]] تعدّ المسافة بس (من غير السطر الجديد)، فالناتجين اختلفوا والتحذير طلع قبل الجدول:

~~~text الناتج
تحذير: countWords (1.0M chars): JS طلّع 180001 و wasm طلّع 200000
~~~

~~~md README.md
# wasm ولا JS؟

اتقاس بـ $__btnode report.mjs$__bt مرتين على Node 24.22 على ويندوز. الأرقام بالـ ms، الوسيط من ٧ تشغيلات بعد warm-up.

| الحالة | JS | wasm | الكسبان |
|---|---|---|---|
| الأعداد الأولية تحت 3 مليون (C) | 441.6 / 448.0 | 432.8 / 434.6 | تعادل (أقل من 3%) |
| 10 مليون نداء add من JS | 2.5 / 2.6 | 28.3 / 29.2 | JS أسرع 11 مرة |
| countWords على مليون حرف (AssemblyScript) | 2.0 / 2.0 | 4.1 / 4.0 | JS أسرع مرتين |

## رأيي

- **الحساب التقيل نفسه:** V8 بيعمل JIT للوب بتاعة الأعداد الأولية لكود قريب جدًا من اللي clang بيطلّعه، فالفرق أقل من 3% ومش يستاهل ملف wasm وخطوة build.
- **النداءات الكتير الصغيرة:** كل نداء من JS لـ wasm ليه تمن، فـ 10 مليون نداء صغير خسرانين قدام JS. لو هتستخدم wasm ابعتله الشغل كله في نداء واحد.
- **النصوص:** نسخة AssemblyScript بتنسخ المليون حرف لذاكرة الـ wasm في كل نداء ($__bt__lowerString$__bt في release.js)، والنسخ لوحده أغلى من العدّ في JS.
- **إمتى أختار wasm:** كود C أو Rust موجود ومتجرّب (ضغط، صور، تشفير) مش عايز أعيد كتابته، أو حسابات أرقام طويلة الداتا فيها عايشة جوه ذاكرة الـ wasm. مش عشان «أسرع» من غير قياس.
~~~

## الكود حتة حتة

- **[[bench(fn)]] بترجّع [[{ result, median }]]:** نفس حل تمرين الـ bench في الدرس، بس من غير طباعة، عشان التقرير يقرر هو يعرض إيه.
- **[[cases]] array من [[[name, js, wasm]]]:** كل حالة سطر واحد، وزيادة حالة رابعة سطر واحد كمان. واللوب بتعامل الكل بنفس الطريقة، فمفيش حالة اتقاست بشكل مختلف بالغلط.
- **[[a.result !== b.result]] → [[console.warn]]:** قياس سرعة لكود بيطلّع ناتج غلط ملهوش معنى. ده اللي مسك [[180001]] قدام [[200000]].
- **[[ratio > 1.1]] و [[ratio < 1 / 1.1]]:** أي فرق أقل من 10% «تعادل»، لأن التذبذب بين التشغيلات نفسه ممكن يوصل لـ 2–3% (الأعداد الأولية: 441.6 ثم 448.0 لنفس الكود).
- **[[bigText]]:** مليون حرف عربي وإنجليزي، وكل عشر كلمات سطر جديد، عشان الحالتين ([[\n]] والمسافة) يتجرّبوا.
- **[[new URL("sum.wasm", import.meta.url)]]:** السكربت يشتغل من أي فولدر.
- **السطر الأول (النسخة والوقت):** الأرقام ملهاش معنى من غير الجهاز والنسخة اللي اتقاست عليهم.

## ليه [[as/package.json]] لازم

جرّبت أشيله: السكربت وقع قبل أي قياس بـ [[SyntaxError: Named export 'countWords' not found. The requested module './as/build/release.js' is a CommonJS module, which may not support all module.exports as named exports.]] Node بيقرر نوع ملف [[.js]] من أقرب [[package.json]] فوقه، والأقرب بعد ما شلته كان في فولدر أعلى ومفيهوش [["type": "module"]]، فاعتبر [[release.js]] CommonJS. الـ [[package.json]] اللي [[asinit]] عمله فيه [["type": "module"]]، فلازم ينتقل مع [[build/]].` },
        { lvl: 'كبير', t: R`موديول wasm بغلاف JS متين`, what: R`[[wasm-math.mjs]] بيحمّل [[sum.wasm]] مرة واحدة بس (بيحفظ الـ Promise)، وبيعمل export لـ [[sumArray]] و [[maxOf]]: بيفحص المدخل (مصفوفة أرقام int32)، وبيقطّع أي مصفوفة أكبر من 1024 لحتت ويجمع نواتجها BigInt، وبيرمي error فيه المسار لو الـ [[.wasm]] مش موجود. ومعاه [[check.mjs]] بـ [[node:assert/strict]]. من الوحدة كلها ومن درس الأخطاء.`, done: R`[[node check.mjs]] بيعدّي على ٨ حالات على الأقل: مصفوفة فاضية، ورقم واحد، و 3000 رقم (نفس ناتج [[reduce]] في JS)، وسوالب، و [[1.5]] مرفوض، ونص مرفوض، ورقم أكبر من int32 مرفوض، وملف مش موجود رسالته فيها اسم الملف. والتحميل حصل مرة واحدة حتى لو ناديت الدالة ١٠٠ مرة، والسكربت بيشتغل مرتين ورا بعض بنفس الناتج.`, ext: R`زوّد نسخة بتشتغل في Web Worker عشان الصفحة متعلقش مع المصفوفات الكبيرة، وانشره كـ package صغير فيه README وأمثلة.`, sol: R`## الشكل النهائي

~~~text node check.mjs
✔ empty array: sum 0, max throws (4.7179ms)
✔ one number (0.2422ms)
✔ 3000 numbers (3 chunks) = reduce in JS (1.515ms)
✔ negatives, and the max in the last chunk (0.425ms)
✔ 1.5 rejected (0.2207ms)
✔ a string rejected (even "5") (0.2763ms)
✔ bigger than int32 rejected (0.1882ms)
✔ missing .wasm: message has the path, and the next call tries again (0.6224ms)
✔ a .wasm without our exports: clear message (2.9362ms)
✔ sum bigger than MAX_SAFE_INTEGER? not with int32 x 1024 chunks, but toSafeNumber keeps BigInt (0.5887ms)
✔ loaded once, even with 100 calls at the same time (1.2533ms)
ℹ tests 11
ℹ pass 11
ℹ fail 0
~~~

## هتشوف إيه

موديول [[wasm-math.mjs]] بيدّيك [[sumArray]] و [[maxOf]] كأنهم دوال JS عادية ([[await sumArray([1, 2, 3])]])، وهو من جوه بيحمّل [[sum.wasm]] مرة واحدة، ويفحص كل رقم، ويقطّع المصفوفات الكبيرة على قد الـ buffer اللي في الـ C. وأي غلط بيطلع برسالة بتقول فين بالظبط. و ١١ تست بيعدّوا في كل تشغيلة.

## الهيكل وترتيب البناء

~~~text شجرة الملفات
wasm-math/
├── package.json
├── sum.c            ← sum.c بتاع الدرس + max_array (تمرين) + buffer_len
├── sum.wasm         ← 1078 byte
├── validate.mjs     ← ١. الفحص والتقطيع من غير wasm
├── wasm-math.mjs    ← ٢. التحميل والدوال
└── check.mjs        ← ٣. التستات
~~~

~~~json package.json
{ "type": "module", "scripts": { "test": "node check.mjs" } }
~~~

~~~text sum.c
// sum.c: دوال C هتتحول WebAssembly
#define EXPORT(name) __attribute__((export_name(name)))
EXPORT("add")
int add(int a, int b) { return a + b; }
static int buffer[1024];
EXPORT("buffer_ptr")
int *buffer_ptr(void) { return buffer; }
EXPORT("buffer_len")
int buffer_len(void) { return sizeof buffer / sizeof buffer[0]; }
EXPORT("sum_array")
long long sum_array(int *arr, int len) {
  long long total = 0;
  for (int i = 0; i < len; i++) total += arr[i];
  return total;
}
EXPORT("count_primes")
int count_primes(int limit) {
  int count = 0;
  for (int n = 2; n < limit; n++) {
    int prime = 1;
    for (int d = 2; d * d <= n; d++) {
      if (n % d == 0) { prime = 0; break; }
    }
    count += prime;
  }
  return count;
}
EXPORT("max_array")
int max_array(int *arr, int len) {
  int best = arr[0];
  for (int i = 1; i < len; i++) {
    if (arr[i] > best) best = arr[i];
  }
  return best;
}
~~~

~~~bash
# أمر Docker بتاع درس «wasm من C»، أو زي ما اتعمل هنا: clang 22 من @yowasp/clang بنفس الـ flags
clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -o sum.wasm sum.c
node check.mjs
~~~

## ١. [[validate.mjs]]

~~~js validate.mjs
// validate.mjs: فحص المدخل والتقطيع، من غير wasm خالص (عشان يتختبر لوحده)
export const INT32_MIN = -(2 ** 31);
export const INT32_MAX = 2 ** 31 - 1;

// بترمي TypeError أو RangeError برسالة فيها اسم الدالة ورقم العنصر
export function checkInt32Array(fnName, nums) {
  if (!Array.isArray(nums)) throw new TypeError($__bt$__{fnName}: محتاج مصفوفة، جالي $__{nums === null ? "null" : typeof nums}$__bt);
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (typeof n !== "number" || !Number.isInteger(n)) throw new TypeError($__bt$__{fnName}: العنصر رقم $__{i} ($__{JSON.stringify(n)}) مش رقم صحيح$__bt);
    if (n < INT32_MIN || n > INT32_MAX) throw new RangeError($__bt$__{fnName}: العنصر رقم $__{i} ($__{n}) برا حدود int32$__bt);
  }
}

// [1..2500] بحجم 1024 → 3 حتت: 1024 و 1024 و 452
export function chunks(nums, size) {
  const out = [];
  for (let i = 0; i < nums.length; i += size) out.push(nums.slice(i, i + size));
  return out;
}

// BigInt صغير يرجع Number عادي، والكبير يفضل BigInt عشان منخسرش دقة
export function toSafeNumber(big) {
  return big <= BigInt(Number.MAX_SAFE_INTEGER) && big >= BigInt(Number.MIN_SAFE_INTEGER) ? Number(big) : big;
}
~~~

- **[[typeof n !== "number" || !Number.isInteger(n)]]:** [["5"]] و [[1.5]] و [[NaN]] و [[null]] بيترفضوا، والرسالة فيها اسم الدالة ورقم العنصر وقيمته بـ [[JSON.stringify]] (عشان [["5"]] تبان نص مش رقم).
- **الفحص كله قبل أي كتابة:** الدالة بتلف على المصفوفة كلها الأول؛ مفيش حاجة بتتكتب في ذاكرة الـ wasm لو عنصر واحد غلط.
- **[[chunks]] و [[toSafeNumber]]:** دوال صغيرة من غير wasm، فبتتختبر لوحدها.

## ٢. [[wasm-math.mjs]]

~~~js wasm-math.mjs
// wasm-math.mjs: sumArray و maxOf فوق sum.wasm، بفحص وتقطيع وتحميل مرة واحدة
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { checkInt32Array, chunks, toSafeNumber } from "./validate.mjs";

const debug = process.env.DEBUG?.split(",").includes("wasm-math")
  ? (...a) => console.error("[wasm-math]", ...a)
  : () => {};

export function createWasmMath(wasmPath = new URL("./sum.wasm", import.meta.url)) {
  const file = wasmPath instanceof URL ? fileURLToPath(wasmPath) : wasmPath;
  let loading = null; // الـ Promise نفسه بيتحفظ، فـ ١٠٠ نداء في نفس اللحظة بيستنوا تحميل واحد
  let loads = 0;

  function load() {
    if (loading) return loading;
    loading = (async () => {
      loads++;
      const t = performance.now();
      let bytes;
      try {
        bytes = await readFile(file);
      } catch (e) {
        throw new Error($__btwasm-math: مقدرتش أقرا $__{file} ($__{e.code})$__bt, { cause: e });
      }
      const { instance } = await WebAssembly.instantiate(bytes);
      for (const name of ["buffer_ptr", "buffer_len", "sum_array", "max_array", "memory"]) {
        if (!(name in instance.exports)) throw new Error($__btwasm-math: $__{file} مفيهوش $__{name}، اتعمله compile من sum.c الصح؟$__bt);
      }
      debug($__btloaded $__{file} ($__{bytes.length} bytes) in $__{(performance.now() - t).toFixed(1)} ms$__bt);
      return instance.exports;
    })();
    // لو التحميل فشل، النداء الجاي يحاول تاني بدل ما يفضل يرجّع نفس الـ error للأبد
    loading.catch(() => { loading = null; });
    return loading;
  }

  // بيكتب الحتة في الـ buffer وينادي الدالة. الحتة دايمًا ≤ buffer_len()، والحجم جاي من الـ C نفسه
  function callOnChunk(wasm, fn, part) {
    const ptr = wasm.buffer_ptr();
    new Int32Array(wasm.memory.buffer, ptr, part.length).set(part);
    return wasm[fn](ptr, part.length);
  }

  async function sumArray(nums) {
    checkInt32Array("sumArray", nums);
    const wasm = await load();
    let total = 0n;
    const size = wasm.buffer_len();
    for (const part of chunks(nums, size)) total += callOnChunk(wasm, "sum_array", part);
    debug($__btsumArray: $__{nums.length} numbers, $__{Math.ceil(nums.length / size)} chunk(s) of up to $__{size}$__bt);
    return toSafeNumber(total);
  }

  async function maxOf(nums) {
    checkInt32Array("maxOf", nums);
    if (nums.length === 0) throw new RangeError("maxOf: المصفوفة فاضية، مفيش أكبر رقم");
    const wasm = await load();
    let best = -Infinity;
    for (const part of chunks(nums, wasm.buffer_len())) best = Math.max(best, callOnChunk(wasm, "max_array", part));
    return best;
  }

  return { sumArray, maxOf, stats: () => ({ loads, file }) };
}

// النسخة الافتراضية: sum.wasm اللي جنب الملف ده
const shared = createWasmMath();
export const { sumArray, maxOf } = shared;
export const stats = shared.stats;
~~~

- **[[loading]] بيحفظ الـ Promise مش النتيجة:** ١٠٠ نداء في نفس اللحظة كلهم بيلاقوا [[loading]] مش [[null]] فبيستنوا نفس التحميل. لو كنا بنحفظ الـ exports بعد ما التحميل يخلص، الـ ١٠٠ كانوا هيبدأوا ١٠٠ تحميل قبل ما أولهم يخلص. التست الأخير بيأكد [[loads === 1]].
- **[[loading.catch(() => { loading = null; })]]:** لو الملف مش موجود، الـ Promise المرفوض ميتحفظش للأبد؛ النداء الجاي بيحاول تاني (التست بيعدّ [[loads === 2]] بعد فشلين). مفيد لو الملف كان لسه بيتعمله build.
- **الرسالة فيها المسار الكامل و [[e.code]]:** «مقدرتش أقرا C:\...\nope\sum.wasm (ENOENT)» بدل [[ENOENT: no such file or directory]] لوحدها، و [[{ cause: e }]] بيحتفظ بالأصلي.
- **فحص الـ exports بعد الـ instantiate:** لو حد حط [[.wasm]] تاني بالغلط، الرسالة بتقول ناقصه إيه (التست بيجرّبه على أصغر wasm صالح: ٨ bytes من غير ولا دالة).
- **[[wasm.buffer_len()]]:** حجم الحتة جاي من الـ C نفسه ([[sizeof buffer / sizeof buffer[0]]])، مش رقم مكتوب في JS. شوف «اللي اكتشفته» تحت.
- **[[total += ...]] بـ BigInt:** كل حتة بترجّع [[i64]] = BigInt، فالجمع بين الحتت BigInt من غير ما نخسر دقة، وبعدين [[toSafeNumber]].
- **[[maxOf]]:** أكبر رقم في كل حتة، وبعدين الأكبر فيهم. والفاضية [[RangeError]] من JS قبل ما توصل للـ C (اللي كان هيقرا [[arr[0]]] قديم من الذاكرة).
- **[[DEBUG=wasm-math]]:** لوج على stderr بس لما تطلبه:

~~~text DEBUG=wasm-math node -e "..."
[wasm-math] loaded .../sum.wasm (1078 bytes) in 1.9 ms
[wasm-math] sumArray: 2500 numbers, 3 chunk(s) of up to 1024
3123750 9
~~~

- **[[createWasmMath(path)]] و النسخة الافتراضية:** التطبيق بيستخدم [[sumArray]] على طول، والتستات بتعمل نسخ بمسارات تانية (ملف مش موجود، wasm فاضي) من غير ما تبوّظ النسخة المشتركة.

## ٣. [[check.mjs]]

~~~js check.mjs
// check.mjs: node check.mjs (أو node --test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { sumArray, maxOf, stats, createWasmMath } from "./wasm-math.mjs";
import { chunks, toSafeNumber } from "./validate.mjs";
import { writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const reduceSum = (a) => a.reduce((s, n) => s + n, 0);
let seed = 7;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) % 2_000_001) - 1_000_000;

test("empty array: sum 0, max throws", async () => {
  assert.equal(await sumArray([]), 0);
  await assert.rejects(maxOf([]), { name: "RangeError", message: /فاضية/ });
});

test("one number", async () => {
  assert.equal(await sumArray([42]), 42);
  assert.equal(await maxOf([42]), 42);
});

test("3000 numbers (3 chunks) = reduce in JS", async () => {
  const nums = Array.from({ length: 3000 }, rand);
  assert.equal(await sumArray(nums), reduceSum(nums));
  assert.equal(await maxOf(nums), Math.max(...nums));
});

test("negatives, and the max in the last chunk", async () => {
  const nums = Array(2500).fill(-5);
  nums[2499] = -1;
  assert.equal(await sumArray(nums), -5 * 2499 - 1);
  assert.equal(await maxOf(nums), -1);
});

test("1.5 rejected", async () => {
  await assert.rejects(sumArray([1, 1.5]), { name: "TypeError", message: /العنصر رقم 1 \(1\.5\)/ });
});

test("a string rejected (even \"5\")", async () => {
  await assert.rejects(maxOf([3, "5"]), { name: "TypeError", message: /\("5"\)/ });
  await assert.rejects(sumArray("123"), { name: "TypeError", message: /محتاج مصفوفة/ });
});

test("bigger than int32 rejected", async () => {
  await assert.rejects(sumArray([2 ** 31]), RangeError);
  await assert.rejects(sumArray([-(2 ** 31) - 1]), RangeError);
});

test("missing .wasm: message has the path, and the next call tries again", async () => {
  const m = createWasmMath("./nope/sum.wasm");
  await assert.rejects(m.sumArray([1]), { message: /nope[\\/]sum\.wasm \(ENOENT\)/ });
  await assert.rejects(m.sumArray([1]), /ENOENT/);
  assert.equal(m.stats().loads, 2);
});

test("a .wasm without our exports: clear message", async () => {
  const empty = path.join(tmpdir(), "empty-module.wasm");
  await writeFile(empty, new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00])); // أصغر wasm صالح: البصمة والنسخة بس
  await assert.rejects(createWasmMath(empty).sumArray([1]), { message: /مفيهوش buffer_ptr/ });
  await rm(empty);
});

test("sum bigger than MAX_SAFE_INTEGER? not with int32 x 1024 chunks, but toSafeNumber keeps BigInt", () => {
  assert.equal(toSafeNumber(2n ** 60n), 2n ** 60n);
  assert.equal(toSafeNumber(10n), 10);
  assert.deepEqual(chunks([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test("loaded once, even with 100 calls at the same time", async () => {
  const m = createWasmMath();
  const results = await Promise.all(Array.from({ length: 100 }, (_, i) => m.sumArray([i, 1])));
  assert.equal(results[99], 100);
  assert.equal(m.stats().loads, 1);
  assert.equal(stats().loads, 1); // النسخة الافتراضية كمان اتحمّلت مرة واحدة طول الملف ده
});
~~~

- **[[node check.mjs]] بيشغّل التستات على طول:** أي ملف فيه [[test()]] من [[node:test]] بيتشغّل لما تنفّذه بـ [[node]]، ومش محتاج [[--test]].
- **[[rand]] بـ seed ثابت:** نفس الـ 3000 رقم في كل تشغيلة، فلو تست وقع مرة هيقع تاني بنفس الأرقام.
- **اتشغّل مرتين ورا بعض:** نفس الـ ١١ ✔ في المرتين والـ exit code صفر.

## اللي اكتشفته وأنا ببنيه

أول نسخة كان فيها [[const CAPACITY = 1024]] في JS. عشان أتأكد إن التستات بتمسك غلط التقطيع، غيّرته لـ 4096 (يعني بيكتب لحد 16KB في buffer حجمه 4KB). **التستات كلها عدّت**: الـ 3000 رقم اتجمعوا صح. السبب إن ذاكرة الـ wasm 128KB، والبرنامج الصغير ده مفيش حاجة بعد الـ buffer، فالكتابة فوق الحد مبوّظتش حاجة نشوفها. في برنامج أكبر كانت هتكتب فوق داتا تانية بصمت. التست مقدرش يمسك الباج، فالحل كان إن الرقم ميتكتبش في مكانين: [[buffer_len()]] في الـ C، و JS بيسأله. وأي wasm قديم من غير [[buffer_len]] بيترفض:

~~~text الناتج (sum.wasm القديم بتاع التمرين)
wasm-math: ./old-sum.wasm مفيهوش buffer_len، اتعمله compile من sum.c الصح؟
~~~

## لو عايز تكمّل (ext)

نسخة للمتصفح بتشغّل [[sumArray]] في Web Worker (درس Web Workers في وحدة البيانات الثنائية): الـ Worker بيحمّل الـ wasm، والصفحة بتبعتله المصفوفة بـ [[postMessage]] وتستنى الرد، فالصفحة متعلقش مع ملايين الأرقام. والـ package: [[exports]] في [[package.json]] بيشاور على [[wasm-math.mjs]]، و [[files]] فيه [[sum.wasm]].` },
        { lvl: 'فكرة', t: R`حاجة تستاهل wasm بجد`, what: R`اختار شغل تقيل حقيقي (فلتر صور، أو hash لملف كبير، أو ضغط، أو محاكاة فيزيا) واعمله في JS الأول، وبعدين في C أو AssemblyScript، وقيس قبل ما تقرر. انت اللي بتختار المشكلة وشكل الصفحة.`, done: R`فيه نسختين بنفس الناتج بالظبط، وجدول قياس فيه وقت النسخ للذاكرة، وقرار مكتوب في README: wasm كسب ولا لأ وبكام.`, ext: R`جرّب [[-msimd128]]، أو مكتبة C جاهزة معمولها compile، أو Rust بـ wasm-pack، وقارن الحجم والسرعة.`, sol: R`## الشكل النهائي

~~~text node measure.mjs
JS    crc32("123456789") = cbf43926 | crc32("") = 0
wasm  crc32("123456789") = cbf43926 | crc32("") = 0
zlib  crc32("123456789") = cbf43926 | crc32("") = 0

64MB, Node v24.22.1, median of 7 after warm-up | same result: true (e1115862)
┌────────────────────────┬─────────┬────────┐
│ (index)                │ ms      │ MB/s   │
├────────────────────────┼─────────┼────────┤
│ JS                     │ '122.5' │ '522'  │
│ wasm + copy in         │ '142.2' │ '450'  │
│ wasm (data already in) │ '141.6' │ '452'  │
│ zlib.crc32 (native)    │ '15.6'  │ '4097' │
└────────────────────────┴─────────┴────────┘
~~~

## النسخة النموذجية: CRC-32 لملف كبير، وليه ده بالذات

اخترت الـ hash (CRC-32، نفس اللي جوه كل ملف zip و PNG) لأنه أكتر شغل «تقيل حقيقي» شكله مناسب لـ wasm: لوب على ملايين bytes، أرقام بس، مفيش DOM ولا نصوص. وفيه ميزة مش في الفلاتر: Node عنده [[zlib.crc32]] جاهزة، فعندي مرجع أتأكد بيه إن الناتج صح حرف بحرف، ونقطة مقارنة بكود native. واخترت سكربت Node مش صفحة عشان القياس يبقى من غير DOM ولا تاب في الخلفية يبوّظ الأرقام.

~~~text شجرة الملفات
crc32-wasm/
├── crc32.c       ← النسخة C
├── crc32.wasm    ← 1829 byte
├── crc32.mjs     ← التلات نسخ ورا API واحد
├── measure.mjs   ← الصح الأول، وبعدين القياس
└── README.md     ← الجدول والقرار
~~~

~~~text crc32.c
// crc32.c: CRC-32 (نفس اللي في zip و PNG) على bytes جوه ذاكرة الـ wasm
#define EXPORT(name) __attribute__((export_name(name)))
extern unsigned char __heap_base;
static unsigned int table[256];

EXPORT("init") void init(void) {
  for (unsigned int n = 0; n < 256; n++) {
    unsigned int c = n;
    for (int k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320u ^ (c >> 1) : c >> 1;
    table[n] = c;
  }
}

// بتكبّر الذاكرة لحد ما bytes تكفي، وبترجّع المكان (أو 0 لو فشلت)
EXPORT("alloc") unsigned char *alloc(int bytes) {
  unsigned long need = (unsigned long)&__heap_base + (unsigned long)bytes;
  unsigned long have = __builtin_wasm_memory_size(0) * 65536UL;
  if (need > have && __builtin_wasm_memory_grow(0, (need - have + 65535) / 65536) == -1) return 0;
  return &__heap_base;
}

// crc: القيمة اللي فاتت (0 في الأول)، فينفع تحسب ملف كبير حتة حتة
EXPORT("crc32") unsigned int crc32(unsigned int crc, const unsigned char *p, int len) {
  crc = ~crc;
  for (int i = 0; i < len; i++) crc = table[(crc ^ p[i]) & 0xFF] ^ (crc >> 8);
  return ~crc;
}
~~~

~~~bash
# أمر Docker بتاع درس «wasm من C»، أو زي ما اتعمل هنا: clang 22 من @yowasp/clang
clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -o crc32.wasm crc32.c
node measure.mjs
~~~

~~~js crc32.mjs
// crc32.mjs: نفس الـ CRC-32 بتلات طرق: JS، و wasm، و zlib.crc32 المدمجة في Node (للتأكد من الناتج)
import { readFile } from "node:fs/promises";
import zlib from "node:zlib";

// ١) JS
const TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  TABLE[n] = c >>> 0;
}
export function crc32JS(bytes, crc = 0) {
  crc = ~crc;
  for (let i = 0; i < bytes.length; i++) crc = TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return ~crc >>> 0;
}

// ٢) wasm: الذاكرة بتتحجز مرة على قد أكبر ملف
const { instance } = await WebAssembly.instantiate(await readFile(new URL("crc32.wasm", import.meta.url)));
const w = instance.exports;
w.init();
let ptr = 0;
let capacity = 0;
export function crc32Wasm(bytes) {
  if (bytes.length > capacity) {
    ptr = w.alloc(bytes.length);
    if (!ptr) throw new RangeError($__btcrc32Wasm: مفيش ذاكرة لـ $__{bytes.length} byte$__bt);
    capacity = bytes.length;
  }
  new Uint8Array(w.memory.buffer, ptr, bytes.length).set(bytes); // النسخ جوه الـ wasm
  return w.crc32(0, ptr, bytes.length) >>> 0;
}
// نفس الحساب من غير النسخ: الـ bytes موجودة جوه الذاكرة من قبل
export const crc32WasmNoCopy = (len) => w.crc32(0, ptr, len) >>> 0;

// ٣) المرجع
export const crc32Native = (bytes) => zlib.crc32(bytes);
~~~

~~~js measure.mjs
// measure.mjs: node measure.mjs  : الناتج لازم يبقى واحد، وبعدين نقيس
import { crc32JS, crc32Wasm, crc32WasmNoCopy, crc32Native } from "./crc32.mjs";

function bench(fn, runs = 7) {
  fn();
  const times = [];
  let result;
  for (let i = 0; i < runs; i++) {
    const t = performance.now();
    result = fn();
    times.push(performance.now() - t);
  }
  times.sort((a, b) => a - b);
  return { result, median: times[Math.floor(runs / 2)] };
}

// صح الأول: قيم معروفة، و "123456789" = cbf43926 (رقم الاختبار المشهور لـ CRC-32)
const check = new TextEncoder().encode("123456789");
for (const [name, fn] of [["JS", crc32JS], ["wasm", crc32Wasm], ["zlib", crc32Native]]) {
  console.log($__bt$__{name.padEnd(5)} crc32("123456789") = $__{fn(check).toString(16)} | crc32("") = $__{fn(new Uint8Array(0)).toString(16)}$__bt);
}

const MB = 64;
const data = new Uint8Array(MB * 1024 * 1024);
let x = 12345;
for (let i = 0; i < data.length; i++) { x = (x * 1103515245 + 12345) >>> 0; data[i] = x >>> 24; }

const js = bench(() => crc32JS(data));
const wasmCopy = bench(() => crc32Wasm(data));
const wasmOnly = bench(() => crc32WasmNoCopy(data.length));
const native = bench(() => crc32Native(data));
const same = new Set([js.result, wasmCopy.result, wasmOnly.result, native.result]).size === 1;

console.log($__bt\n$__{MB}MB, Node $__{process.version}, median of 7 after warm-up | same result: $__{same} ($__{js.result.toString(16)})$__bt);
console.table({
  "JS": { ms: js.median.toFixed(1), "MB/s": (MB / js.median * 1000).toFixed(0) },
  "wasm + copy in": { ms: wasmCopy.median.toFixed(1), "MB/s": (MB / wasmCopy.median * 1000).toFixed(0) },
  "wasm (data already in)": { ms: wasmOnly.median.toFixed(1), "MB/s": (MB / wasmOnly.median * 1000).toFixed(0) },
  "zlib.crc32 (native)": { ms: native.median.toFixed(1), "MB/s": (MB / native.median * 1000).toFixed(0) },
});
~~~

~~~text node measure.mjs (التشغيلة التانية)
JS    crc32("123456789") = cbf43926 | crc32("") = 0
wasm  crc32("123456789") = cbf43926 | crc32("") = 0
zlib  crc32("123456789") = cbf43926 | crc32("") = 0

64MB, Node v24.22.1, median of 7 after warm-up | same result: true (e1115862)
┌────────────────────────┬─────────┬────────┐
│ (index)                │ ms      │ MB/s   │
├────────────────────────┼─────────┼────────┤
│ JS                     │ '121.8' │ '525'  │
│ wasm + copy in         │ '142.6' │ '449'  │
│ wasm (data already in) │ '138.2' │ '463'  │
│ zlib.crc32 (native)    │ '15.0'  │ '4266' │
└────────────────────────┴─────────┴────────┘
~~~

~~~md README.md
# CRC-32: JS ولا wasm؟

نفس الـ CRC-32 (اللي في zip و PNG) مكتوب في JS وفي C متحوّل wasm، ومعاهم $__btzlib.crc32$__bt المدمجة في Node كمرجع للناتج والسرعة.

$__bt$__bt$__btbash
node measure.mjs
$__bt$__bt$__bt

## القياس (Node 24.22 على ويندوز، 64MB، الوسيط من ٧ بعد warm-up، تشغيلتين)

| الطريقة | ms | MB/s |
|---|---|---|
| JS | 122.5 / 121.8 | ~520 |
| wasm + نسخ الداتا جوه | 142.2 / 142.6 | ~450 |
| wasm (الداتا جوه من قبل) | 141.6 / 138.2 | ~455 |
| zlib.crc32 (native) | 15.6 / 15.0 | ~4100 |

الأربعة طلّعوا نفس الناتج (e1115862)، و $__bt"123456789"$__bt = $__btcbf43926$__bt في الكل.

## القرار

**wasm خسر.** أبطأ من JS بحوالي 15%، والنسخ مش هو السبب (من غيره برضه أبطأ): V8 بيعمل JIT للوب دي في JS بنفس كفاءة clang تقريبًا. وفي Node الإجابة الصح $__btzlib.crc32$__bt: أسرع ٨ مرات لأنه كود native محسّن جوه Node نفسه، من غير أي عدّية بين JS و wasm. في المتصفح: JS كفاية (نص جيجا في الثانية).
~~~

## ليه التصميم ده

- **الصح قبل السرعة:** [["123456789"]] لازم يطلع [[cbf43926]] (رقم الاختبار المعروف لـ CRC-32)، والنص الفاضي [[0]]، والـ 64MB نفس الناتج في الأربعة ([[same result: true]]). قياس سرعة لنسخة بتطلّع ناتج تاني ملوش أي قيمة.
- **نفس الخوارزمية في JS و C بالظبط** (table من 256 رقم، و byte كل لفة)، فالفرق اللي بيتقاس هو فرق التشغيل مش فرق الخوارزمية.
- **[[>>> 0]] في JS:** عمليات الـ bits في JS بترجّع int32 بإشارة، و [[>>> 0]] بيحوّلها لرقم موجب (uint32). ومن الـ wasm كمان: [[i32]] اللي راجع ممكن يبان سالب، فبنعمل [[>>> 0]] عشان الأربعة يتقارنوا صح.
- **[[crc]] كـ argument في الـ C:** تقدر تحسب ملف ٥ جيجا حتة حتة ([[crc = crc32(crc, chunk)]]) من غير ما تحمّله كله في الذاكرة.
- **[[alloc]] مرة على قد أكبر ملف:** مش مع كل نداء، عشان [[memory.grow]] نفسه ليه تمن.
- **قياس «wasm من غير نسخ» لوحده:** عشان أعرف لو wasm خسر بسبب النسخ ولا بسبب الحساب. الإجابة: الحساب نفسه (138–142 ms قدام 122 لـ JS).

## القرار

wasm مكسبش هنا: أبطأ من JS بحوالي 15%، والنسخ مش السبب. وأسرع حاجة بفرق كبير هي [[zlib.crc32]] المدمجة (حوالي 15 ms، ٨ مرات أسرع من JS). يعني قبل ما تكتب wasm، دوّر على API جاهز في المنصة نفسها. لو مشروعك في المتصفح ومفيش API جاهز، الـ JS هنا كفاية (أكتر من 500MB في الثانية).

## لو عايز تكمّل (ext)

جرّب [[-msimd128]] (جرّبته: الملف بقى 1907 byte والسرعة زي ما هي، 137.9 ms من غير نسخ و 142.0 بالنسخ، لأن الـ table lookup byte byte مبيتعملوش vectorize لوحده؛ محتاج تغيّر الخوارزمية نفسها لـ slicing-by-8 مثلًا)، أو مكتبة C جاهزة زي zlib نفسها متحوّلة wasm، أو Rust بـ wasm-pack، وقارن الحجم والسرعة بنفس [[measure.mjs]].` },
      ],
      n: "كود C أو AssemblyScript بيتحول ملف .wasm يشتغل في المتصفح و Node، وبرا المتصفح بـ WASI: تعمله compile، وتحمّله من JS، وتعدّي داتا في الذاكرة، وتشغّله في Worker، وتعرف إمتى يستاهل",
      items: [
        {
          cmd: "wasm من C",
          title: "تحوّل C لـ .wasm بـ clang في Docker وتناديه من Node",
          ref: [
            { t: "MDN: WebAssembly concepts", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Concepts" },
            { t: "MDN: Using the WebAssembly JavaScript API", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API" },
            { t: "MDN: WebAssembly.instantiate()", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/instantiate_static" },
            { t: "MDN: WebAssembly.Memory", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory" },
            { t: "LLVM: lld WebAssembly port", url: "https://lld.llvm.org/WebAssembly.html" },
            { t: "Clang: Attributes (export_name, import_module)", url: "https://clang.llvm.org/docs/AttributeReference.html" },
          ],
          pre: [
            { to: "files/.wasm", why: R`شكل ملف [[.wasm]] من جوه (البصمة والـ sections) قبل ما تعمله بنفسك` },
          ],
          desc: R`[[clang --target=wasm32]] بيحوّل ملف C لـ [[.wasm]] صغير (المثال طلع 722 byte). الدوال اللي عليها [[export_name]] بتبقى دوال JavaScript، و [[memory]] (ذاكرة الـ wasm) بتبقى [[ArrayBuffer]] تقدر تقرا وتكتب فيه من JS.

مش محتاج تسطّب compiler على جهازك: [[alpine]] + [[clang]] و [[lld]] جوه Docker. ولو أول مرة تشوف [[.wasm]]، ابدأ بدرس [[.wasm]] في تاب الملفات (البصمة والـ sections).`,
          example: R`// sum.c: دوال C هتتحول WebAssembly
#define EXPORT(name) __attribute__((export_name(name)))
EXPORT("add")
int add(int a, int b) { return a + b; }
static int buffer[1024];
EXPORT("buffer_ptr")
int *buffer_ptr(void) { return buffer; }
EXPORT("sum_array")
long long sum_array(int *arr, int len) {
  long long total = 0;
  for (int i = 0; i < len; i++) total += arr[i];
  return total;
}
EXPORT("count_primes")
int count_primes(int limit) {
  int count = 0;
  for (int n = 2; n < limit; n++) {
    int prime = 1;
    for (int d = 2; d * d <= n; d++) {
      if (n % d == 0) { prime = 0; break; }
    }
    count += prime;
  }
  return count;
}`,
          try: R`احفظ المثال [[sum.c]]، وفي نفس الفولدر شغّل:
[[docker run --rm -v "$PWD:/src" -w /src alpine:3.22 sh -c "apk add --no-cache clang lld && clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -o sum.wasm sum.c"]]
(في PowerShell بدّل [[$PWD]] بـ [[$__{PWD}]]). وبعدين اعمل [[run.mjs]] يحمّل [[sum.wasm]] ويطبع [[add(2, 3)]]، ويكتب [[[10, 20, 30, 40]]] في [[buffer_ptr()]] وينادي [[sum_array]]. إيه نوع الناتج؟`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب في تعليق في [[run.mjs]] إيه اللي هيطبعه [[add(2147483647, 1)]]، وإيه [[typeof]] اللي هترجّعه [[sum_array]]. بعدين شغّل وقارن.`, done: R`كاتب توقعك قبل التشغيل، والناتج الحقيقي: [[add]] بترجّع [[-2147483648]] (الـ [[int]] لفّ من غير ولا error)، و [[typeof]] ناتج [[sum_array]] هو [[bigint]] لأن [[long long]] بيبقى BigInt في JS. ولو توقعك غلط، كاتب السبب في سطر.`, sol: R`> **الأداة:** الدرس بيعمل compile بـ clang 20.1.8 جوه Docker. هنا Docker مكانش متاح، فاتعمل compile بـ clang 22 من باكدج [[@yowasp/clang]] (clang نفسه متحوّل wasm وبيشتغل جوه Node) بنفس الـ flags بالظبط: [[--target=wasm32 -O2 -nostdlib -Wl,--no-entry]]. الناتج نفس الدوال، والحجم بيفرق شوية بين النسختين.

~~~js run.mjs
import { readFile } from "node:fs/promises";

const { instance } = await WebAssembly.instantiate(await readFile("sum.wasm"));
const { add, buffer_ptr, sum_array, memory } = instance.exports;

// توقعي قبل التشغيل:
// add(2147483647, 1) => 2147483648 ؟ ولا هيلف؟
// typeof sum_array(...) => "number" ؟
console.log("add(2147483647, 1) =", add(2147483647, 1));
console.log("add(-2147483648, -1) =", add(-2147483648, -1));
console.log("add(2.9, 0.9) =", add(2.9, 0.9));
console.log("add(\"5\", 2) =", add("5", 2));

const ptr = buffer_ptr();
new Int32Array(memory.buffer, ptr, 4).set([10, 20, 30, 40]);
const total = sum_array(ptr, 4);
console.log("sum_array =", total, "| typeof:", typeof total);
console.log("total === 100:", total === 100, "| total === 100n:", total === 100n, "| Number(total) === 100:", Number(total) === 100);
~~~

~~~text node run.mjs (Node 24.22)
add(2147483647, 1) = -2147483648
add(-2147483648, -1) = 2147483647
add(2.9, 0.9) = 2
add("5", 2) = 7
sum_array = 100n | typeof: bigint
total === 100: false | total === 100n: true | Number(total) === 100: true
~~~

**ليه [[-2147483648]]؟** [[int]] في wasm32 هو [[i32]]: 32 bit بس. أكبر قيمة [[2147483647]] (2³¹ − 1)، والـ +1 بتلف لأصغر قيمة. و wasm مبيرميش error على الـ overflow (في C نفسها الـ overflow ده undefined behavior، والـ compiler من حقه يفترض إنه مش هيحصل؛ عمليًا [[i32.add]] بيلف). والعكس كمان: أصغر قيمة − 1 لفّت لأكبر قيمة.

**السطرين الزيادة:** JS بيحوّل أي حاجة بتتبعت لـ [[i32]] زي [[x | 0]]: [[2.9]] بقت 2 و [[0.9]] بقت 0، و [["5"]] بقت 5. مفيش error ولا تحذير، وده سبب إن الغلاف في JS لازم يفحص (التمرينين الجايين).

**ليه [[bigint]]؟** [[long long]] = [[i64]]، و JS بيستلم [[i64]] كـ BigInt دايمًا. و [[100n === 100]] بـ [[false]] لأن [[===]] بيقارن النوع كمان؛ استخدم [[Number(total)]] لو متأكد إن الرقم صغير، أو قارن بـ [[100n]].

**الغلطة الشائعة:** تتوقع إن wasm «أسرع ومظبوط أكتر» فيتعامل مع الأرقام زي JS. لأ: JS كان هيطلّع [[2147483648]] لأن أرقامه 64-bit float، و wasm بيلتزم بحجم النوع اللي في الـ C.` },
            { lvl: 'تطبيق', t: R`**مسألة بحالات طرفية:** زوّد على [[sum.c]] دالة [[max_array(int *arr, int len)]] بترجّع أكبر رقم، واكتب في JS غلاف [[maxOf(nums)]] بيكتب الأرقام في [[buffer_ptr()]] وينادي الدالة.`, done: R`[[maxOf([5, 99, -100, 3])]] بترجّع [[99]]، و [[maxOf([-7, -3, -9])]] بترجّع [[-3]] مش [[0]] (يعني بدأت من أول عنصر مش من صفر)، و [[maxOf([])]] بترمي error من JS قبل ما توصل للـ C.`, sol: R`**الإضافة في [[sum.c]]** (تحت باقي الدوال):

~~~text sum.c
EXPORT("max_array")
int max_array(int *arr, int len) {
  int best = arr[0];
  for (int i = 1; i < len; i++) {
    if (arr[i] > best) best = arr[i];
  }
  return best;
}
~~~

~~~bash
# نفس أمر الدرس (Docker)، أو زي ما اتجرّب هنا: clang 22 من @yowasp/clang بنفس الـ flags
clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -o sum.wasm sum.c
~~~

~~~js max.mjs
// max.mjs: غلاف maxOf حوالين max_array
import { readFile } from "node:fs/promises";

const { instance } = await WebAssembly.instantiate(await readFile("sum.wasm"));
const { buffer_ptr, max_array, memory } = instance.exports;

function maxOf(nums) {
  if (!Array.isArray(nums) || nums.length === 0) throw new RangeError("maxOf: محتاج مصفوفة فيها رقم واحد على الأقل");
  if (nums.length > 1024) throw new RangeError($__btmaxOf: الحد 1024 رقم، وده $__{nums.length}$__bt);
  const ptr = buffer_ptr();
  new Int32Array(memory.buffer, ptr, nums.length).set(nums);
  return max_array(ptr, nums.length);
}

console.log("maxOf([5, 99, -100, 3]) =", maxOf([5, 99, -100, 3]));
console.log("maxOf([-7, -3, -9]) =", maxOf([-7, -3, -9]));
console.log("maxOf([42]) =", maxOf([42]));
try {
  maxOf([]);
} catch (e) {
  console.log("maxOf([]) ->", e.name + ":", e.message);
}
~~~

~~~text node max.mjs
maxOf([5, 99, -100, 3]) = 99
maxOf([-7, -3, -9]) = -3
maxOf([42]) = 42
maxOf([]) -> RangeError: maxOf: محتاج مصفوفة فيها رقم واحد على الأقل
~~~

- **[[int best = arr[0];]]:** البداية من أول عنصر مش من [[0]]. لو بدأت من صفر، [[[-7, -3, -9]]] كانت هترجّع [[0]] وهو مش في المصفوفة أصلًا. واللفة بتبدأ من [[i = 1]] لأن العنصر الأول اتحسب.
- **الفحص في JS قبل النداء:** الـ C مبيعرفش إن المصفوفة فاضية. جرّبت [[max_array(ptr, 0)]] من غير الغلاف بعد ما كتبت [[[-7, -3, -9]]]، ورجّعت [[-7]]: قرت [[arr[0]]] القديم اللي فاضل في الذاكرة من النداء اللي قبله. يعني من غير الفحص هتاخد رقم غلط بثقة.
- **[[nums.length > 1024]]:** الـ buffer في [[sum.c]] حجمه 1024 [[int]]، والكتابة بعده بتكتب فوق داتا تانية جوه الـ wasm من غير أي error.
- **[[new Int32Array(memory.buffer, ptr, nums.length).set(nums)]]:** view على الذاكرة من عند [[ptr]] بطول الأرقام بس، و [[set]] بتكتبهم مرة واحدة.

**الغلطة الشائعة:** تحط الفحص في الـ C ([[if (len == 0) return 0;]]). ده بيرجّع رقم مضلل بدل error. الـ C مالوش طريقة كويسة يقول «غلط»، فالفحص مكانه الغلاف اللي في JS.` },
            { lvl: 'تحدي', t: R`**ابني غلاف متين:** [[sumArray(nums)]] بيرفض أكتر من 1024 رقم (حجم [[buffer]])، وأي رقم مش [[Number.isInteger]] أو برا حدود int32، وبيرجّع Number عادي لو الناتج أصغر من [[Number.MAX_SAFE_INTEGER]].`, done: R`1024 مرة [[2147483647]] بترجّع [[2199023254528]] (بيساوي [[2147483647n * 1024n]])، و 1025 رقم، و [[1.5]]، و [[2 ** 31]] كل واحد بيرمي error برسالة بتقول المشكلة فين، من غير ما يكتب حاجة في الذاكرة.`, sol: R`~~~js safe-sum.mjs
// safe-sum.mjs: sumArray بيفحص كل حاجة قبل ما يلمس ذاكرة الـ wasm
import { readFile } from "node:fs/promises";

const { instance } = await WebAssembly.instantiate(await readFile("sum.wasm"));
const { buffer_ptr, sum_array, memory } = instance.exports;
const CAPACITY = 1024; // static int buffer[1024] في sum.c
const INT32_MIN = -(2 ** 31);
const INT32_MAX = 2 ** 31 - 1;

export function sumArray(nums) {
  if (!Array.isArray(nums)) throw new TypeError("sumArray: محتاج مصفوفة");
  if (nums.length > CAPACITY) throw new RangeError($__btsumArray: الحد $__{CAPACITY} رقم، وده $__{nums.length}$__bt);
  nums.forEach((n, i) => {
    if (!Number.isInteger(n)) throw new TypeError($__btsumArray: العنصر رقم $__{i} ($__{n}) مش رقم صحيح$__bt);
    if (n < INT32_MIN || n > INT32_MAX) throw new RangeError($__btsumArray: العنصر رقم $__{i} ($__{n}) برا حدود int32$__bt);
  });
  const ptr = buffer_ptr();
  new Int32Array(memory.buffer, ptr, nums.length).set(nums);
  const total = sum_array(ptr, nums.length);
  return total <= BigInt(Number.MAX_SAFE_INTEGER) && total >= BigInt(Number.MIN_SAFE_INTEGER) ? Number(total) : total;
}

const view = new Int32Array(memory.buffer, buffer_ptr(), 4);
const big = Array(1024).fill(2147483647);
const r = sumArray(big);
console.log("1024 x 2147483647 =", r, "| typeof:", typeof r, "| === Number(2147483647n * 1024n):", r === Number(2147483647n * 1024n));
console.log("sumArray([1, 2, 3]) =", sumArray([1, 2, 3]), "| sumArray([]) =", sumArray([]));
view.set([7, 7, 7, 7]);
for (const bad of [Array(1025).fill(1), [1, 1.5], [2 ** 31], ["5"]]) {
  try {
    sumArray(bad);
  } catch (e) {
    console.log(e.name + ":", e.message);
  }
}
console.log("memory untouched by the rejected calls:", [...view].join(","));
~~~

~~~text node safe-sum.mjs (Node 24.22، و sum.wasm من sum.c بتاع الدرس ومعاه max_array)
1024 x 2147483647 = 2199023254528 | typeof: number | === Number(2147483647n * 1024n): true
sumArray([1, 2, 3]) = 6 | sumArray([]) = 0
RangeError: sumArray: الحد 1024 رقم، وده 1025
TypeError: sumArray: العنصر رقم 1 (1.5) مش رقم صحيح
RangeError: sumArray: العنصر رقم 0 (2147483648) برا حدود int32
TypeError: sumArray: العنصر رقم 0 (5) مش رقم صحيح
memory untouched by the rejected calls: 7,7,7,7
~~~

- **كل الفحوص قبل [[buffer_ptr()]]:** ده معنى «من غير ما يكتب حاجة في الذاكرة». كتبنا [[7,7,7,7]] في أول الـ buffer قبل الـ ٤ نداءات الغلط، وبعدهم لسه [[7,7,7,7]]: ولا نداء وصل للكتابة.
- **[[Number.isInteger(n)]]:** بيرفض [[1.5]] و [["5"]] (نص) و [[NaN]]. من غيره [[Int32Array]] كانت هتحوّلهم بصمت ([[1.5]] تبقى 1، و [["5"]] تبقى 5).
- **حدود int32 ([[-(2 ** 31)]] لـ [[2 ** 31 - 1]]):** [[2 ** 31]] لو اتكتب في [[Int32Array]] بيلف لـ [[-2147483648]] والمجموع يطلع غلط من غير error.
- **الرسالة فيها رقم العنصر وقيمته:** في مصفوفة ألف رقم، «رقم مش صحيح» لوحدها مش مفيدة.
- **[[total <= BigInt(Number.MAX_SAFE_INTEGER)]]:** [[sum_array]] بترجّع BigInt. لو الناتج جوه المدى الآمن بنرجّعه Number عادي (اللي بيستخدم الدالة مش محتاج يعرف إن فيه wasm)، وإلا بنسيبه BigInt عشان منخسرش دقة. وأكبر مجموع ممكن (1024 × [[2147483647]] = [[2199023254528]]) أصغر بكتير من [[MAX_SAFE_INTEGER]] (حوالي 9 × 10¹⁵)، فعمليًا هيرجع Number دايمًا.

**الغلطة الشائعة:** تفحص وانت بتكتب ([[for]] واحدة بتفحص وتكتب)، فلما العنصر رقم 500 يطلع غلط تكون كتبت 499 رقم فوق القديم. افحص الكل الأول، واكتب بعدين.` },
          ],
          flag: "script",
          deep: {
            why: R`عندك كود C أو C++ أو Rust موجود ومتجرّب (ضغط، تشفير، معالجة صور، parser) وعايز تستخدمه في المتصفح أو Node من غير ما تعيد كتابته. WebAssembly هو الطريقة: نفس الكود، ملف [[.wasm]] بيشتغل في أي مكان فيه JavaScript.`,
            how: R`[[clang]] جزء من LLVM، و [[--target=wasm32]] يعني «اطلع كود WebAssembly 32-bit» بدل كود المعالج بتاعك. [[lld]] هو الـ linker ([[wasm-ld]]) اللي بيجمّع الناتج ملف واحد.

[[-nostdlib]]: من غير مكتبة C القياسية (مفيش [[printf]] ولا [[malloc]]). عشان كده الكود بيستخدم array ثابت [[buffer]] بدل [[malloc]]. لو محتاج المكتبة القياسية استخدم WASI SDK أو Emscripten. [[-Wl,--no-entry]]: مفيش [[main]]، ده library. [[-O2]]: optimization.

[[__attribute__((export_name("add")))]]: الدالة دي تبان لـ JavaScript بالاسم ده. والـ [[#define EXPORT]] بس عشان نختصرها.

الأنواع: [[int]] في wasm32 هو [[i32]] = number في JS. [[long long]] هو [[i64]]، و JS بيستلمه **BigInt** ([[100n]]). والـ pointer ([[int *]]) مجرد رقم: مكان (offset) جوه [[memory]]. JS بيكتب في الذاكرة بـ [[new Int32Array(memory.buffer, ptr, len)]] ويدّي الـ pointer للدالة.`,
            when: R`كود native موجود عايز تشغّله في الويب، أو حسابات تقيلة على أرقام (درس [[wasm يستاهل إمتى]]). مش لكود عادي بيتعامل مع DOM أو JSON.`,
            mistakes: R`تنسى [[lld]] فـ clang يقع بـ [[unable to execute command: Executable "wasm-ld" doesn't exist]]. وتنسى [[export_name]] فالدالة متبانش (أو يشيلها الـ optimizer). وتقارن ناتج [[long long]] بـ [[===]] مع number: [[100n === 100]] بـ false. وتكتب في الـ buffer أكتر من حجمه (1024 [[int]]): مفيش حماية، هتكتب فوق داتا تانية جوه الـ wasm.`
          },
          teach: R`## من C لـ [[.wasm]] لـ JavaScript

اتعمله compile بـ clang 20.1.8 جوه [[alpine:3.22]]، واتشغّل بـ Node 24.22 على ويندوز.

---

## ١. الـ compile

~~~bash
docker run --rm -v "$PWD:/src" -w /src alpine:3.22 sh -c "apk add --no-cache clang lld && clang --target=wasm32 -O2 -nostdlib -Wl,--no-entry -o sum.wasm sum.c"
~~~

| الحتة | معناها |
|---|---|
| [[-v "$PWD:/src" -w /src]] | الفولدر الحالي يبقى [[/src]] جوه الـ container ونشتغل فيه |
| [[apk add --no-cache clang lld]] | سطّب الـ compiler والـ linker (جوه الـ container بس) |
| [[--target=wasm32]] | اطلع WebAssembly 32-bit |
| [[-O2]] | optimization |
| [[-nostdlib]] | من غير مكتبة C القياسية |
| [[-Wl,--no-entry]] | [[-Wl,]] = مرّر للـ linker. [[--no-entry]] = مفيش [[main]] |
| [[-o sum.wasm]] | اسم الناتج |

~~~text الناتج
Alpine clang version 20.1.8
-rwxr-xr-x    1 root     root           722 Oct 27 17:17 sum.wasm
~~~

722 byte لـ ٤ دوال.

---

## ٢. الكود C سطر سطر

- [[// sum.c: ...]]: تعليق C (نفس [[//]] بتاع JS).
- [[#define EXPORT(name) __attribute__((export_name(name)))]]: macro. أي [[EXPORT("add")]] بيتبدّل بالـ attribute الطويل اللي بيقول لـ clang «صدّر الدالة دي بالاسم ده».
- [[int add(int a, int b)]]: دالة بترجّع [[int]] وبتاخد [[int]] اتنين.
- [[static int buffer[1024];]]: array ثابت من 1024 [[int]] جوه ذاكرة الـ wasm (4096 byte). [[static]] = خاص بالملف ده.
- [[int *buffer_ptr(void)]]: بترجّع **عنوان** الـ buffer ([[int *]] = pointer لـ int). JS محتاجه عشان يعرف يكتب فين.
- [[long long sum_array(int *arr, int len)]]: بتاخد عنوان وطول، وبتجمع. [[long long]] = 64-bit عشان المجموع ميعدّيش.
- [[count_primes]]: بتعدّ الأعداد الأولية تحت [[limit]] (للقياس في درس [[wasm يستاهل إمتى]]). [[d * d <= n]] = جرّب القسمة لحد الجذر بس.

---

## ٣. [[run.mjs]]

~~~text run.mjs
import { readFile } from "node:fs/promises";

const { instance } = await WebAssembly.instantiate(await readFile("sum.wasm"));
const { add, buffer_ptr, sum_array, count_primes, memory } = instance.exports;

console.log("exports:", Object.keys(instance.exports).join(", "));
console.log("add(2, 3) =", add(2, 3));
console.log("memory:", memory.buffer.byteLength / 1024, "KB");

const ptr = buffer_ptr();
const view = new Int32Array(memory.buffer, ptr, 1024);
view.set([10, 20, 30, 40]);
console.log("ptr =", ptr, "| sum_array =", sum_array(ptr, 4));
console.log("count_primes(100) =", count_primes(100));
~~~

~~~text node run.mjs
exports: memory, add, buffer_ptr, sum_array, count_primes
add(2, 3) = 5
memory: 128 KB
ptr = 1024 | sum_array = 100n
count_primes(100) = 25
~~~

| السطر | معناه |
|---|---|
| [[exports: memory, ...]] | clang صدّر [[memory]] لوحده جنب الدوال |
| [[memory: 128 KB]] | الذاكرة صفحتين، كل صفحة wasm = 64KB |
| [[ptr = 1024]] | الـ buffer بيبدأ عند byte رقم 1024 جوه الذاكرة |
| [[sum_array = 100n]] | [[10+20+30+40]]، و [[n]] لأن [[long long]] بيوصل BigInt |
| [[count_primes(100) = 25]] | 2، 3، 5، ... 97: ٢٥ عدد أولي |

- [[new Int32Array(memory.buffer, ptr, 1024)]]: «شوف الذاكرة من عند [[ptr]] كـ 1024 [[int]]». ده **view** مش نسخة: الكتابة فيه بتكتب في ذاكرة الـ wasm نفسها.
- [[view.set([...])]]: اكتب الأرقام. وبعدين [[sum_array(ptr, 4)]] قرا من نفس المكان.

---

## الخلاصة

| C | WebAssembly | JavaScript |
|---|---|---|
| [[int]] | [[i32]] | number |
| [[long long]] | [[i64]] | **BigInt** |
| [[int *]] (pointer) | [[i32]] (offset) | number = مكان في [[memory.buffer]] |
| [[export_name("x")]] | export | [[instance.exports.x]] |

النصوص والـ arrays مبتتبعتش مباشرة: تكتبها في [[memory]] وتبعت المكان والطول (درس [[WebAssembly في المتصفح]]).`,
          lines: [
            R`[[#define]] بيعمل macro اسمه [[EXPORT]]: أي مكان تكتب فيه [[EXPORT("add")]] الـ preprocessor بيبدّله بالـ attribute [[export_name("add")]] قبل الـ compile. والـ attribute ده بيقول لـ clang «طلّع الدالة دي من الـ wasm بالاسم ده عشان JS يشوفها». من غيره الدالة بتفضل جوه الـ wasm ومش هتلاقيها في [[instance.exports]].`,
            R`بيعلّم الدالة اللي تحته إنها تتصدّر باسم [[add]]. لازم ييجي قبل تعريف الدالة على طول، لأنه attribute بيتلزق في التعريف اللي بعده.`,
            R`دالة بتجمع رقمين. [[int]] في wasm32 بيبقى [[i32]]، فـ JS بيبعت ويستقبل numbers عادية. ولو الناتج عدّى حدود الـ 32-bit (حوالي ٢.١ مليار) ده overflow ممنوع في C، وعمليًا في wasm بيلف للسالب بدل ما يكبر زي أرقام JS.`,
            R`array ثابتة فيها ١٠٢٤ [[int]] (يعني 4096 byte) جوه ذاكرة الـ wasm. [[static]] معناها إنها موجودة طول عمر البرنامج ومش ظاهرة برّه الملف ده. هي المكان اللي JS هيكتب فيه الأرقام قبل ما يطلب جمعها، لأننا من غير مكتبة C مفيش [[malloc]].`,
            R`بيصدّر الدالة اللي تحته باسم [[buffer_ptr]]، عشان JS يقدر يسأل «الـ buffer فين في الذاكرة؟».`,
            R`بترجّع عنوان الـ buffer، والعنوان في wasm مجرد رقم: offset بالـ bytes من أول الذاكرة. JS بياخد الرقم ده ويعمل [[Int32Array]] على [[memory.buffer]] من المكان ده. JS ميقدرش يعرف المكان لوحده، لأن الـ compiler هو اللي بيحدده.`,
            R`بيصدّر الدالة اللي تحته باسم [[sum_array]]، عشان JS يناديها بعد ما يكتب الأرقام في الـ buffer.`,
            R`بتاخد عنوان أول عنصر وعدد العناصر، لأن C مبيعرفش طول الـ array من الـ pointer لوحده. وبترجّع [[long long]] (64-bit) عشان مجموع أرقام [[int]] كتير ممكن يعدّي حدود الـ 32-bit. والـ 64-bit بيوصل JS كـ [[BigInt]]، فهتشوف الناتج وفي آخره [[n]].`,
            R`المجموع بيبدأ من صفر ونوعه 64-bit. لو كان [[int]] كان هيلف للسالب أول ما المجموع يعدّي ٢.١ مليار تقريبًا.`,
            R`بيلف على العناصر من 0 لحد قبل [[len]] ويزوّد كل عنصر على [[total]]. ومفيش أي فحص للحدود: لو JS بعت [[len]] أكبر من الحقيقي، C هيقرا أي حاجة موجودة في الذاكرة بعد الـ buffer من غير error.`,
            R`بيرجّع المجموع لـ JS. ولأن نوعه [[long long]] هيوصل [[BigInt]]، ولو عايزه number عادي حوّله بـ [[Number(...)]].`,
            R`نهاية [[sum_array]].`,
            R`بيصدّر الدالة اللي تحته باسم [[count_primes]]، ودي اللي هنقيس بيها سرعة wasm قدام JS في درس جاي.`,
            R`بتعدّ الأعداد الأولية الأصغر من [[limit]]. شغل حسابي تقيل على أرقام بس، من غير ذاكرة ولا نصوص، فمناسب نشوف بيه wasm بيعمل إيه.`,
            R`عدّاد الأعداد الأولية اللي لقيناها، بيبدأ من صفر.`,
            R`بنجرّب كل رقم من 2 لحد قبل [[limit]]. البداية من 2 لأن 0 و 1 مش أوليين.`,
            R`بنفترض إن الرقم أولي، واللفة اللي جاية هتحاول تثبت العكس. الكود مستخدم [[int]] كـ true/false: [[1]] أولي و [[0]] لأ، وده هيفيدنا تحت لما نجمعه على العدّاد.`,
            R`بنجرّب القواسم من 2 لحد الجذر التربيعي بس ([[d * d <= n]]): لو الرقم ليه قاسم أكبر من الجذر، لازم يبقى ليه قاسم تاني أصغر منه كنا هنلاقيه قبل كده. ده بيوفّر شغل كتير قدام اللف لحد [[n]].`,
            R`لو [[n]] بيقبل القسمة على [[d]] من غير باقي يبقى مش أولي: بنحط 0، و [[break]] تخرج من لفة القواسم على طول لأن مفيش داعي نكمّل.`,
            R`نهاية لفة القواسم.`,
            R`[[prime]] يا 1 يا 0، فبنزوّده على العدّاد على طول من غير [[if]]: الأولي بيزوّد واحد، والمش أولي بيزوّد صفر.`,
            R`نهاية لفة الأرقام.`,
            R`بيرجّع عدد الأعداد الأولية لـ JS كـ number عادي، لأن [[int]] = [[i32]].`,
            R`نهاية [[count_primes]].`,
          ],
          sol: R`الناتج الحقيقي ([[sum.wasm]] 722 byte، Node 24.22):
[[add(2, 3) = 5]]
[[ptr = 1024 | sum_array = 100n]]
النوع [[bigint]]: الدالة بترجّع [[long long]] (يعني [[i64]] في wasm)، و JavaScript بيستلم [[i64]] كـ BigInt. لو عايزه number: [[Number(sum_array(ptr, 4))]]، أو خلّي الدالة ترجّع [[int]] أو [[double]].`
        },
        {
          cmd: "WebAssembly في المتصفح",
          title: "تحمّل .wasm في المتصفح: instantiateStreaming و imports و نصوص في الذاكرة",
          ref: [
            { t: "MDN: Loading and running WebAssembly code", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Loading_and_running" },
            { t: "MDN: WebAssembly.instantiateStreaming()", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/instantiateStreaming_static" },
            { t: "MDN: WebAssembly JavaScript interface", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface" },
            { t: "MDN: Understanding WebAssembly text format", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Understanding_the_text_format" },
            { t: "MDN: TextEncoder.encodeInto()", url: "https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encodeInto" },
          ],
          pre: [
            { to: "js/fetch و AbortController", why: R`[[instantiateStreaming]] بياخد الـ [[Response]] بتاع [[fetch]] على طول` },
            { to: "js/Web Workers و worker_threads: postMessage و transfer", why: R`الشغل التقيل بيتنقل لـ Worker عشان الصفحة متعلقش` },
          ],
          desc: R`في المتصفح: [[WebAssembly.instantiateStreaming(fetch("text.wasm"), imports)]] بينزّل ويعمل compile وهو بينزّل، والسيرفر **لازم** يبعته بـ [[Content-Type: application/wasm]]. و [[imports]] دوال JavaScript الـ wasm يقدر يناديها (الـ wasm ميقدرش يلمس [[console]] ولا الـ DOM لوحده).

والنصوص: wasm مبيعرفش غير أرقام. فبتحوّل النص bytes بـ [[TextEncoder]]، وتكتبه في [[memory]]، وتدّي الدالة الطول، وتقرا الناتج بـ [[TextDecoder]].`,
          example: R`const imports = {
  env: {
    log_count: (n) => console.log($__btwasm changed $__{n} letters$__bt),
  },
};
const { instance } = await WebAssembly.instantiateStreaming(fetch("text.wasm"), imports);
const { memory, buf_ptr, upper } = instance.exports;
function toUpper(text) {
  const bytes = new TextEncoder().encode(text);
  const ptr = buf_ptr();
  new Uint8Array(memory.buffer, ptr, bytes.length).set(bytes);
  const len = upper(bytes.length);
  return new TextDecoder().decode(new Uint8Array(memory.buffer, ptr, len));
}
console.log(toUpper("hello wasm, مرحبا 123"));
document.querySelector("#out").textContent = toUpper("from the browser");`,
          try: R`اعمل [[text.c]] (في الشرح) واعمله compile زي درس [[wasm من C]]. حط [[text.wasm]] و [[main.js]] (المثال) و [[index.html]] فيه [[<p id="out">]] و [[<script type="module" src="main.js">]] على سيرفر محلي ([[npx serve]] أو Vite). افتح Console. وبعدين خلي السيرفر يبعت الـ [[.wasm]] بـ [[application/octet-stream]]: إيه اللي حصل؟`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** زميلك كتب [[const imports = { log_count: (n) => console.log(n) };]] والصفحة وقعت قبل ما تطبع حاجة. اقرا الـ error ولاقي الغلطة من غير ما تبص على المثال.`, done: R`لقيت إن الرسالة بتقول [[Import #0 "env": module is not an object or function]] (الدالة لازم تبقى جوه [[env]] زي ما الـ C طالبها)، وبعد التصليح الصفحة بتطبع عدد الحروف. وجرّبت كمان [[{ env: {} }]] وشفت [[LinkError]] فيها اسم [[log_count]].`, sol: R`**الكود البايظ** ([[text.wasm]] من [[text.c]] بتاع الدرس، 706 byte، اتعمله compile بـ clang 22 من [[@yowasp/clang]] بنفس flags الدرس لأن Docker مكانش متاح):

~~~js main-broken.js
// main-broken.js: كود الزميل
const imports = { log_count: (n) => console.log(n) };
const { instance } = await WebAssembly.instantiateStreaming(fetch("text.wasm"), imports);
console.log("loaded", Object.keys(instance.exports));
~~~

~~~text الـ error (Chrome 158، اللي Playwright مسكه من الصفحة)
TypeError: WebAssembly.instantiate(): Import #0 "env": module is not an object or function
~~~

لاحظ إن الرسالة بتقول [[instantiate()]] مع إن الكود كاتب [[instantiateStreaming]]: الاتنين بيوصلوا لنفس الخطوة في V8. والصفحة وقفت قبل ما تطبع حاجة لأن الـ [[await]] رمى، فباقي الـ module ماتنفّذش.

**اقرا الرسالة حتة حتة:**

- [[Import #0]]: أول حاجة الـ wasm طالبها من بره (الـ wasm ممكن يطلب أكتر من حاجة، وبيتعدّوا من صفر).
- [["env"]]: اسم الـ module اللي المفروض يبقى فيه الـ import، ده [[import_module("env")]] في الـ C.
- [[module is not an object or function]]: [[imports.env]] قيمته [[undefined]]. الزميل حط [[log_count]] على طول جوه [[imports]]، والـ wasm بيدوّر على [[imports.env.log_count]].

**التصليح:**

~~~js main-fixed.js
// main-fixed.js: الدالة جوه env زي ما الـ C طالبها
const imports = { env: { log_count: (n) => console.log($__btwasm changed $__{n} letters$__bt) } };
const { instance } = await WebAssembly.instantiateStreaming(fetch("text.wasm"), imports);
const { memory, buf_ptr, upper } = instance.exports;
const bytes = new TextEncoder().encode("hello wasm");
new Uint8Array(memory.buffer, buf_ptr(), bytes.length).set(bytes);
upper(bytes.length);
~~~

~~~text Console
wasm changed 9 letters
~~~

**وبـ [[{ env: {} }]]:**

~~~text الـ error
LinkError: WebAssembly.instantiate(): Import #0 "env" "log_count": function import requires a callable
~~~

المرة دي [[env]] موجود فعدّى الخطوة الأولى، والرسالة بقت [[LinkError]] وفيها الاسمين: [["env" "log_count"]]، يعني «الدالة دي ناقصة». ونفس الأخطاء في Node بـ [[WebAssembly.instantiate(bytes, imports)]] بنفس النص بالظبط (V8 في الاتنين).

**إزاي تعرف الأسامي من غير ما تقرا الـ C:**

~~~js
const m = await WebAssembly.compile(await readFile("text.wasm")); // في المتصفح: await WebAssembly.compileStreaming(fetch("text.wasm"))
console.log(WebAssembly.Module.imports(m), WebAssembly.Module.exports(m));
~~~

~~~text الناتج (Node 24.22)
[ { module: 'env', name: 'log_count', kind: 'function' } ] [
  { name: 'memory', kind: 'memory' },
  { name: 'buf_ptr', kind: 'function' },
  { name: 'upper', kind: 'function' }
]
~~~

**الغلطة الشائعة:** تفتكر إن [[TypeError]] معناها الملف بايظ فتعمل compile تاني. الـ [[CompileError]] هو اللي بيقول الملف بايظ؛ [[TypeError]] و [[LinkError]] هنا معناهم إن الـ [[imports]] مش مطابقة.` },
            { lvl: 'تطبيق', t: R`**ابني حتة صفحة:** خانة [[<input>]]، وتحتها [[<p id="out">]] و [[<span id="count">]]. مع كل حدث [[input]] اعرض [[toUpper(value)]] في [[out]]، وعدد الحروف اللي اتغيرت (من [[log_count]]) في [[count]].`, done: R`لما تكتب [[hello مرحبا]] الصفحة بتعرض [[HELLO مرحبا]] والعداد [[5]]، والعربي زي ما هو، والخانة الفاضية بتعرض نص فاضي والعداد [[0]]، والـ wasm بيتحمّل مرة واحدة بس مش مع كل حرف.`, sol: R`~~~view 170 الشكل (الـ wasm محطوط جوه الصفحة base64 عشان المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تكبير الحروف بـ wasm</title>
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 6px 10px; width: min(100%, 360px); }
  #out { font-size: 22px; min-height: 1.7em; direction: ltr; text-align: right; }
</style>
</head>
<body>
<input id="text" disabled placeholder="بيحمّل الـ wasm…" aria-label="النص">
<p id="out"></p>
<p>عدد الحروف اللي اتغيرت: <span id="count">0</span></p>
<script type="module">
// main.js: الـ wasm بيتحمّل مرة واحدة، وكل حرف بيتكبّر جواه
const out = document.querySelector("#out");
const count = document.querySelector("#count");
const input = document.querySelector("#text");

let lastCount = 0;
const imports = { env: { log_count: (n) => (lastCount = n) } };
const { instance } = await WebAssembly.instantiate(Uint8Array.from(atob("AGFzbQEAAAABDgNgAX8AYAABf2ABfwF/AhEBA2Vudglsb2dfY291bnQAAAMDAgECBAUBcAEBAQUDAQACBggBfwFBgIAECwccAwZtZW1vcnkCAAdidWZfcHRyAAEFdXBwZXIAAgqEAgIIAEGAgISAAAv4AQEGfwJAIABBAU4NAEEAEICAgIAAIAAPC0EAIQFBACECAkACQCAAQQFGDQAgAEEBcSEDIABB/v///wdxIQRBACECQQAhAQNAAkAgAUGAgISAAGoiBS0AACIGQZ9/akH/AXFBGUsNACAFIAZBYGo6AAAgAkEBaiECCwJAIAFBgYCEgABqIgUtAAAiBkGff2pB/wFxQRlLDQAgBSAGQWBqOgAAIAJBAWohAgsgBCABQQJqIgFHDQALIANFDQELIAEtAICAhIAAIgVBn39qQf8BcUEZSw0AIAFBgICEgABqIAVBYGo6AAAgAkEBaiECCyACEICAgIAAIAALAEIEbmFtZQAJCG91dC53YXNtARwDAAlsb2dfY291bnQBB2J1Zl9wdHICBXVwcGVyBxIBAA9fX3N0YWNrX3BvaW50ZXIAeglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQEFY2xhbmdaMjIuMS42IChodHRwczovL2NvZGViZXJnLm9yZy9Zb1dBU1AvbGx2bS1wcm9qZWN0IGE4OTgyZDMwM2M0OWE5ZTlmMGVjNjZmZDJhYjZkZTIxODBmNThjY2MpAJQBD3RhcmdldF9mZWF0dXJlcwgrC2J1bGstbWVtb3J5Kw9idWxrLW1lbW9yeS1vcHQrFmNhbGwtaW5kaXJlY3Qtb3ZlcmxvbmcrCm11bHRpdmFsdWUrD211dGFibGUtZ2xvYmFscysTbm9udHJhcHBpbmctZnB0b2ludCsPcmVmZXJlbmNlLXR5cGVzKwhzaWduLWV4dA=="), (c) => c.charCodeAt(0)), imports);
const { memory, buf_ptr, upper } = instance.exports;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toUpper(text) {
  const bytes = encoder.encode(text);
  const ptr = buf_ptr();
  new Uint8Array(memory.buffer, ptr, bytes.length).set(bytes);
  const len = upper(bytes.length);
  return decoder.decode(new Uint8Array(memory.buffer, ptr, len));
}

input.addEventListener("input", () => {
  out.textContent = toUpper(input.value);
  count.textContent = lastCount;
});
input.disabled = false;
input.placeholder = "اكتب أي حاجة";
</script>
</body>
</html>
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تكبير الحروف بـ wasm</title>
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 6px 10px; width: min(100%, 360px); }
  #out { font-size: 22px; min-height: 1.7em; direction: ltr; text-align: right; }
</style>
</head>
<body>
<input id="text" disabled placeholder="بيحمّل الـ wasm…" aria-label="النص">
<p id="out"></p>
<p>عدد الحروف اللي اتغيرت: <span id="count">0</span></p>
<script type="module" src="main.js"></script>
</body>
</html>
~~~

~~~js main.js
// main.js: الـ wasm بيتحمّل مرة واحدة، وكل حرف بيتكبّر جواه
const out = document.querySelector("#out");
const count = document.querySelector("#count");
const input = document.querySelector("#text");

let lastCount = 0;
const imports = { env: { log_count: (n) => (lastCount = n) } };
const { instance } = await WebAssembly.instantiateStreaming(fetch("text.wasm"), imports);
const { memory, buf_ptr, upper } = instance.exports;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toUpper(text) {
  const bytes = encoder.encode(text);
  const ptr = buf_ptr();
  new Uint8Array(memory.buffer, ptr, bytes.length).set(bytes);
  const len = upper(bytes.length);
  return decoder.decode(new Uint8Array(memory.buffer, ptr, len));
}

input.addEventListener("input", () => {
  out.textContent = toUpper(input.value);
  count.textContent = lastCount;
});
input.disabled = false;
input.placeholder = "اكتب أي حاجة";
~~~

حط [[text.wasm]] و [[index.html]] و [[main.js]] في فولدر واحد وشغّل سيرفر ([[npx serve]]). (المعاينة اللي فوق نفس الكود بالظبط، بس [[instantiateStreaming(fetch("text.wasm"))]] اتبدّلت بـ [[instantiate]] على bytes مكتوبة في الصفحة، لأن المعاينة مالهاش سيرفر تجيب منه الملف.)

~~~text الناتج (Chrome 158 من localhost: Playwright كتب في الخانة وعدّ طلبات text.wasm)
"HELLO مرحبا" count 5
"HELLO مرحبا OK 123" count 7
"" count 0
text.wasm requests: 1
~~~

- **[[instantiateStreaming]] برة الـ listener، في أول الـ module:** بيتعمل مرة واحدة، وكل حرف بعدها بيستخدم نفس [[instance]]. السطر الأخير بيأكد: طلب واحد لـ [[text.wasm]] مع إن فيه ١٩ حدث [[input]].
- **[[input.disabled]] لحد ما الـ wasm يجهز:** لو اليوزر كتب قبل التحميل، الـ listener مكانش لسه اتسجّل والحروف كانت هتضيع من غير ما تتكبّر. الـ [[placeholder]] بيقول «بيحمّل».
- **[[lastCount]] من [[log_count]]:** الـ C بينادي [[log_count(changed)]] جوه [[upper]]، و JS بيحفظ الرقم في متغير ويعرضه بعد النداء. ده الطريق الوحيد إن الـ wasm «يكلّم» الصفحة: دالة JS في [[imports]].
- **العربي زي ما هو:** حروفه في UTF-8 بايتين كل واحد منهم أكبر من 127، والـ C بيغيّر بس اللي بين [['a']] و [['z']]، فمحدش بيلمس bytes العربي. والعداد 5 (حروف [[hello]] بس).
- **الخانة الفاضية:** [[upper(0)]] بينادي [[log_count(0)]]، فالعداد بقى 0 والنتيجة نص فاضي، من غير حالة خاصة في الكود.
- **[[encoder]] و [[decoder]] مرة واحدة:** بدل ما نعمل [[new TextEncoder()]] مع كل حرف.

**الغلطة الشائعة:** تحط [[instantiateStreaming]] جوه الـ [[input]] listener، فكل حرف بيعمل [[fetch]] و compile من الأول (في Network هتلاقي طلب لكل حرف).` },
            { lvl: 'تحدي', t: R`**مسألة:** [[toUpper]] بتبوّظ الذاكرة لو النص أكبر من 4096 byte. اكتب [[toUpperLong(text)]] بتقطّع النص بـ [[new TextEncoder().encodeInto(rest, view)]] (بترجّع [[read]] و [[written]] ومبتقسمش حرف في النص)، وتنادي [[upper]] على كل حتة.`, done: R`[[('مرحبا hello ').repeat(500)]] (8500 byte) بيرجع مساوي بالظبط لـ [[text.replace(/[a-z]/g, c => c.toUpperCase())]]، ومفيهوش ولا [[�]] (علامة الحرف المكسور)، والنص الفاضي بيرجع فاضي.`, sol: R`اتجرّب في Node 24.22 على نفس [[text.wasm]] (منطق التقطيع واحد في المتصفح و Node).

~~~js long.mjs
// long.mjs: toUpperLong بيقطّع النص على قد الـ buffer (4096 byte) من غير ما يكسر حرف
import { readFile } from "node:fs/promises";

let changedTotal = 0;
const imports = { env: { log_count: (n) => (changedTotal += n) } };
const { instance } = await WebAssembly.instantiate(await readFile("text.wasm"), imports);
const { memory, buf_ptr, upper } = instance.exports;
const BUF = 4096; // static unsigned char buf[4096] في text.c
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function toUpperLong(text) {
  const view = new Uint8Array(memory.buffer, buf_ptr(), BUF);
  let rest = text;
  let result = "";
  let chunks = 0;
  while (rest.length > 0) {
    const { read, written } = encoder.encodeInto(rest, view);
    upper(written);
    result += decoder.decode(view.subarray(0, written));
    rest = rest.slice(read);
    chunks++;
  }
  return { result, chunks };
}

const text = "مرحبا hello ".repeat(500);
const expected = text.replace(/[a-z]/g, (c) => c.toUpperCase());
const { result, chunks } = toUpperLong(text);
console.log("bytes:", encoder.encode(text).length, "| chunks:", chunks);
console.log("equal:", result === expected, "| has U+FFFD:", result.includes("\uFFFD"), "| letters changed:", changedTotal);
console.log("empty:", JSON.stringify(toUpperLong("").result));
console.log("emoji at the edge:", toUpperLong("a".repeat(4095) + "😀b").result.slice(-3));

// النسخة الغلط: تقطيع كل 4096 byte بالظبط، على نص الحرف العربي فيه بيقع على الحد
const tricky = "a" + "م".repeat(3000);
console.log("tricky (6001 bytes) with toUpperLong: equal:", toUpperLong(tricky).result === "A" + "م".repeat(3000));
const raw = encoder.encode(tricky);
let broken = "";
for (let i = 0; i < raw.length; i += BUF) broken += decoder.decode(raw.subarray(i, i + BUF));
console.log("naive 4096-byte slices: has U+FFFD:", broken.includes("\uFFFD"), "| equal:", broken === tricky);
~~~

~~~text node long.mjs
bytes: 8500 | chunks: 3
equal: true | has U+FFFD: false | letters changed: 2500
empty: ""
emoji at the edge: 😀B
tricky (6001 bytes) with toUpperLong: equal: true
naive 4096-byte slices: has U+FFFD: true | equal: false
~~~

- **[[encoder.encodeInto(rest, view)]]:** بيكتب في الـ view لحد ما يتملي، و **مبيكتبش نص حرف**: لو الحرف الجاي محتاج ٢ أو ٤ bytes ومفيش مكان، بيقف قبله. وبيرجّع [[read]] (كام حرف من النص اتقرا، بوحدات UTF-16 زي [[length]]) و [[written]] (كام byte اتكتب).
- **[[upper(written)]]:** الـ C بيشتغل على الـ bytes اللي اتكتبت بس.
- **[[rest = rest.slice(read)]]:** الجاي يبدأ من أول حرف ماتكتبش. [[read]] بنفس وحدات [[slice]]، فالحساب مظبوط حتى مع الإيموجي (حرفين UTF-16 و ٤ bytes).
- **[[view.subarray(0, written)]]:** نقرا اللي اتكتب بس، مش الـ 4096 كلهم (اللي بعد [[written]] فيه بقايا من اللفة اللي فاتت).
- **٣ حتت لـ 8500 byte:** 4096 + 4096 + الباقي، و 2500 حرف اتغيروا (5 في كل تكرار × 500).
- **[[while (rest.length > 0)]]:** النص الفاضي مبيدخلش اللفة خالص، فبيرجع فاضي من غير ما ننادي الـ wasm.
- **إيموجي على الحد بالظبط:** 4095 حرف [[a]] و بعدهم 😀 (4 bytes): مفيش مكان له في الحتة الأولى، فـ [[encodeInto]] وقف قبله والحتة التانية بدأت بيه كامل.

**ليه التقطيع العادي غلط:** آخر سطرين. نص بيبدأ بـ [[a]] وبعده 3000 حرف عربي، فالحد عند byte 4096 بيقع في نص حرف عربي. [[toUpperLong]] رجّعه سليم، والتقطيع كل 4096 byte بالظبط طلّع [[\uFFFD]] (علامة الحرف المكسور) والنص مبقاش زي الأصلي. (النص بتاع التمرين نفسه بالصدفة حدوده بتقع على حروف إنجليزي، فالتقطيع العادي كان هيعدّي عليه ويخبّي الباج.)

**الغلطة الشائعة:** تقطّع النص بالحروف ([[text.slice(0, 4096)]]) على أساس إن كل حرف byte. العربي بايتين والإيموجي ٤، فـ 4096 حرف عربي = 8192 byte والـ buffer يفيض ويكتب فوق ذاكرة تانية.` },
          ],
          flag: "script",
          deep: {
            why: R`الـ wasm معزول: مفيش [[console.log]] ولا [[fetch]] ولا DOM ولا نصوص. عشان يعمل حاجة مفيدة في صفحة لازم JavaScript يدّيله دوال (imports) ويتبادل معاه داتا عن طريق الذاكرة. ده الشغل اللي المكتبات زي [[wasm-bindgen]] (Rust) و Emscripten و AssemblyScript بتعمله لك، وفهمه بيخليك تعرف تصلّح لما يقع.`,
            how: R`[[instantiateStreaming(response, imports)]]: بيبدأ compile للـ bytes وهي لسه جاية من الشبكة (أسرع من [[instantiate]] على [[arrayBuffer()]])، وعشان كده بيتأكد إن الـ [[Content-Type]] هو [[application/wasm]] وإلا بيرفض.

[[imports]]: object بالشكل [[{ module: { name: fn } }]]. في C الدالة متعرّفة بـ [[import_module("env")]] و [[import_name("log_count")]]، فلازم [[imports.env.log_count]] يكون موجود وإلا الـ instantiate يقع بـ [[LinkError]].

النصوص: [[TextEncoder().encode(text)]] بيرجّع [[Uint8Array]] بـ UTF-8. الحروف الإنجليزي byte واحد، و «مرحبا» كل حرف 2 bytes. الكود C بيكبّر [[a-z]] بس، فالعربي والأرقام بيعدّوا زي ما هم. [[TextDecoder().decode(bytes)]] بيرجّعهم نص.

[[memory.buffer]] ممكن يتغير لو الـ wasm كبّر ذاكرته ([[memory.grow]]): أي [[Uint8Array]] قديم بيبقى «detached» وطوله صفر. اعمل view جديد كل مرة زي المثال.`,
            when: R`لما تكتب الـ glue code بإيدك لمكتبة صغيرة، أو تفهم مكتبة wasm بتقع. ولو بتستخدم Rust فـ [[wasm-bindgen]] بيكتب ده لوحده، ولو AssemblyScript فالـ bindings (الدرس الجاي).`,
            mistakes: R`السيرفر بيبعت [[application/octet-stream]]: [[Incorrect response MIME type. Expected 'application/wasm']]. وتفتح [[index.html]] كملف ([[file://]]): [[fetch]] مش هيشتغل، لازم سيرفر. وتكتب نص أطول من الـ buffer (4096 byte في المثال) فتكتب فوق ذاكرة تانية. وتحتفظ بـ [[Uint8Array]] على [[memory.buffer]] بعد [[grow]].`
          },
          teach: R`## الـ C اللي اتعمله compile

اتعمله compile بـ clang 20.1.8 في [[alpine:3.22]] (نفس أمر درس [[wasm من C]])، وطلع 633 byte. واتجرّب في Chrome 156 headless من سيرفر Node صغير على localhost.

~~~text text.c
// text.c: بياخد نص من JS، يكبّر حروفه، ويبلّغ JS بعدد الحروف اللي اتغيرت
#define EXPORT(name) __attribute__((export_name(name)))
#define IMPORT(name) __attribute__((import_module("env"), import_name(name)))

IMPORT("log_count") void log_count(int changed);

static unsigned char buf[4096];

EXPORT("buf_ptr") unsigned char *buf_ptr(void) { return buf; }

EXPORT("upper") int upper(int len) {
  int changed = 0;
  for (int i = 0; i < len; i++) {
    if (buf[i] >= 'a' && buf[i] <= 'z') { buf[i] -= 32; changed++; }
  }
  log_count(changed);
  return len;
}
~~~

- [[IMPORT("log_count") void log_count(int changed);]]: دالة **من بره** (JavaScript)، في module اسمه [[env]]. الـ C بيناديها عادي.
- [[unsigned char buf[4096]]]: 4096 byte للنص.
- [[buf[i] -= 32]]: في ASCII الحرف الكبير أقل من الصغير بـ 32 ([[a]] = 97، [[A]] = 65).

---

## ١. [[imports]]

~~~text main.js
const imports = {
  env: {
    log_count: (n) => console.log($__btwasm changed $__{n} letters$__bt),
  },
};
~~~

[[env]] و [[log_count]] لازم نفس الأسامي اللي في [[import_module]] و [[import_name]].

---

## ٢. [[instantiateStreaming]]

~~~text main.js
const { instance } = await WebAssembly.instantiateStreaming(fetch("text.wasm"), imports);
const { memory, buf_ptr, upper } = instance.exports;
~~~

- [[fetch("text.wasm")]]: Promise لـ [[Response]]. [[instantiateStreaming]] بياخده مباشرة ويبدأ compile مع التنزيل.
- [[await]] في أول الملف: شغال لأن [[<script type="module">]].

---

## ٣. [[toUpper(text)]]: نص رايح جاي

1. [[new TextEncoder().encode(text)]]: النص ← bytes بـ UTF-8.
2. [[buf_ptr()]]: مكان الـ buffer في ذاكرة الـ wasm.
3. [[new Uint8Array(memory.buffer, ptr, bytes.length).set(bytes)]]: اكتب الـ bytes هناك.
4. [[upper(bytes.length)]]: الـ wasm بيكبّر في مكانه، وبينادي [[log_count]].
5. [[new TextDecoder().decode(new Uint8Array(memory.buffer, ptr, len))]]: اقرا الـ bytes ورجّعها نص.

~~~text Console
wasm changed 9 letters
HELLO WASM, مرحبا 123
wasm changed 14 letters
~~~

- [[9]]: [[hello]] (5) + [[wasm]] (4). العربي والأرقام والمسافات اتسابوا.
- [[مرحبا]] رجعت سليمة: كل حرف عربي 2 bytes في UTF-8 وقيمهم أكبر من 127، فمش بين [[a]] و [[z]]، فالـ C ملمسهمش.
- [[14]]: [[from the browser]] من غير المسافتين، والـ [[#out]] بقى فيه [[FROM THE BROWSER]].

---

## ٤. الـ MIME غلط

خليت السيرفر يبعت [[.wasm]] بـ [[application/octet-stream]]:

~~~text Console
[pageerror] Failed to execute 'compile' on 'WebAssembly': Incorrect response MIME type. Expected 'application/wasm'.
~~~

ولا سطر اتنفذ. الحل في السيرفر: [[mime.types]] بتاع Nginx (اتأكدت في [[nginx:alpine]] نسخة 1.31) فيه [[application/wasm wasm;]]، فلو بتستخدمه مع [[include mime.types;]] الـ MIME صح. ولو سيرفر تاني، اتأكد بـ [[curl -I]]. أو (أبطأ) [[WebAssembly.instantiate(await (await fetch(url)).arrayBuffer(), imports)]] مش بيهتم بالـ MIME.

---

## ٥. [[memory.grow]]: ليه الـ view القديم بيبقى فاضي

ذاكرة الـ wasm بتكبر بصفحات، كل صفحة 64KB. وبتكبر في حالتين: JS ينادي [[memory.grow(n)]]، أو الـ wasm نفسه يحتاج مكان (زي [[malloc]] في C أو [[new Uint8Array(n)]] في AssemblyScript). ولما تكبر، **الـ [[ArrayBuffer]] القديم بيتفصل (detached)** وبيتعمل واحد جديد أكبر. وأي [[Uint8Array]] كان عامله على القديم بيبقى طوله صفر.

~~~js grow.mjs
const memory = new WebAssembly.Memory({ initial: 1, maximum: 4 });
const old = new Uint8Array(memory.buffer);
old[0] = 42;
console.log("قبل grow:", memory.buffer.byteLength, "| old.length =", old.length);
const prev = memory.grow(1);
console.log("grow رجّع:", prev, "| بعده:", memory.buffer.byteLength);
console.log("old.length =", old.length, "| old[0] =", old[0], "| old.buffer.detached =", old.buffer.detached);
const fresh = new Uint8Array(memory.buffer);
console.log("fresh.length =", fresh.length, "| fresh[0] =", fresh[0]);
try { memory.grow(10); } catch (e) { console.log(e.name + ":", e.message); }
~~~

~~~text node grow.mjs (Node 24.22.1)
قبل grow: 65536 | old.length = 65536
grow رجّع: 1 | بعده: 131072
old.length = 0 | old[0] = undefined | old.buffer.detached = true
fresh.length = 131072 | fresh[0] = 42
RangeError: WebAssembly.Memory.grow(): Maximum memory size exceeded
~~~

| السطر | معناه |
|---|---|
| [[new WebAssembly.Memory({ initial: 1, maximum: 4 })]] | ذاكرة بتبدأ صفحة واحدة (64KB) ومتعدّيش 4 صفحات. ده نفس اللي الـ wasm بيصدّره باسم [[memory]] |
| [[memory.grow(1)]] | زوّد صفحة، وبيرجّع **عدد الصفحات القديم** (1) مش الجديد |
| [[old.length = 0]] و [[detached = true]] | الـ view القديم بقى بيشاور على buffer اتفصل، فمفيش قراية ولا كتابة، ومن غير ولا error |
| [[fresh[0] = 42]] | الداتا نفسها اتنقلت للـ buffer الجديد، اللي اتغيّر هو الـ view بس |
| [[RangeError]] | طلبت أكتر من [[maximum]]، فـ [[grow]] رمى ومكبرتش |

### والـ wasm بيكبّر لوحده

نفس الحاجة بتحصل من جوه. دالة AssemblyScript بتعمل [[new Uint8Array(1_000_000)]] (درس «AssemblyScript»)، والذاكرة كبرت من غير ما JS يطلب:

~~~text node g.mjs (AssemblyScript 0.28.20)
قبل: 65536 view.length = 65536
بعد bigArray(1e6): 1114112 view.length = 0
~~~

من 64KB لـ 1088KB (17 صفحة)، والـ view اللي اتعمل قبل النداء طوله بقى صفر. **وده بالظبط سبب إن [[toUpper]] في المثال بتعمل [[new Uint8Array(memory.buffer, ...)]] جديد كل مرة**، وسبب إن الـ bindings بتاعة AssemblyScript بتعمل [[new Uint16Array(memory.buffer)]] جوه كل [[__liftString]].

> القاعدة: متخزّنش view على [[memory.buffer]] في متغير بيعيش طول البرنامج. اعمله وقت ما تحتاجه، أو افحص [[view.length === 0]] واعمله تاني.

---

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| تحمّل في المتصفح | [[instantiateStreaming(fetch(url), imports)]] + [[application/wasm]] |
| wasm ينادي JS | [[imports.env.name]] ↔ [[import_module("env"), import_name("name")]] |
| نص من JS لـ wasm | [[TextEncoder]] ← اكتب في [[memory]] ← ابعت الطول |
| نص من wasm لـ JS | [[Uint8Array(memory.buffer, ptr, len)]] ← [[TextDecoder]] |`,
          lines: [
            R`[[imports]] هو الـ object اللي بنديه للـ wasm وفيه دوال JavaScript يقدر يناديها. الـ wasm معزول: ميقدرش يطبع ولا يلمس الصفحة لوحده، فأي حاجة زي دي لازم تيجي من هنا.`,
            R`المستوى الأول اسم الـ module، وهنا [[env]] لأن الـ C معرّف الدالة بـ [[import_module("env")]]. الاسم لازم يطابق بالظبط، وإلا الـ instantiate يقع بـ [[LinkError]].`,
            R`الدالة نفسها، واسمها لازم يطابق [[import_name("log_count")]] في الـ C. الـ wasm بيناديها بعد ما يخلص ويبعتلها [[n]] = عدد الحروف اللي اتغيرت، فبتطبعه في الـ Console. ده الطريق الوحيد إن الـ wasm «يتكلم».`,
            R`نهاية [[env]].`,
            R`نهاية [[imports]].`,
            R`[[fetch]] بيبدأ ينزّل الملف، و [[instantiateStreaming]] بيعمل compile للـ bytes **وهي لسه جاية** من الشبكة، وبعدين instance موصّل بالـ imports. ولازم السيرفر يبعت الملف بـ [[Content-Type: application/wasm]] وإلا بيرفض. و [[await]] هنا برّه أي دالة، فلازم الـ script يبقى [[type="module"]].`,
            R`[[instance.exports]] فيه كل اللي الـ wasm صدّره: [[memory]] (ذاكرته كلها، والـ bytes بتاعتها في [[memory.buffer]])، و [[buf_ptr]] اللي بترجّع مكان الـ buffer، و [[upper]] اللي بتكبّر الحروف. أسامي الدوال جاية من [[export_name]] في الـ C.`,
            R`دالة JavaScript عادية بتخبّي كل شغل الذاكرة: اللي بيستخدمها يدّيها نص وياخد نص من غير ما يعرف إن في wasm. ده نفس اللي المكتبات زي [[wasm-bindgen]] بتعمله لك.`,
            R`الـ wasm مبيعرفش نصوص، بيعرف bytes بس. [[TextEncoder]] بيحوّل النص لـ [[Uint8Array]] بـ UTF-8: كل حرف إنجليزي byte واحد وكل حرف عربي 2 bytes، فطول الـ bytes مش دايمًا طول النص.`,
            R`بنسأل الـ wasm «الـ buffer بتاعك فين؟» والرد رقم: offset بالـ bytes جوه الذاكرة. JS ميقدرش يخمّن المكان ده، الـ compiler هو اللي بيحدده.`,
            R`بنعمل view بـ [[Uint8Array]] على ذاكرة الـ wasm من مكان الـ buffer وبطول الـ bytes، و [[set]] بتنسخهم فيه. ده view مش نسخة، فالكتابة بتوصل لذاكرة الـ wasm نفسها. ومحدش بيفحص الطول: نص أطول من الـ buffer (4096 byte) هيكتب فوق ذاكرة تانية.`,
            R`بننادي [[upper]] بعدد الـ bytes بس لأنه عارف مكان الـ buffer. بيكبّر [[a-z]] في مكانها (العربي والأرقام بتعدّي زي ما هي)، وبينادي [[log_count]]، وبيرجّع الطول.`,
            R`بنعمل view **جديد** على [[memory.buffer]] بدل ما نستخدم القديم، لأن لو الذاكرة كبرت أي view قديم بيبقى detached وطوله صفر. و [[TextDecoder]] بيحوّل الـ bytes لنص تاني.`,
            R`نهاية [[toUpper]].`,
            R`تجربة بنص فيه إنجليزي وعربي وأرقام: الحروف الإنجليزي بس اللي بتتكبّر، فتشوف [[HELLO WASM, مرحبا 123]]، وقبله سطر [[log_count]] بيقول إن ٩ حروف اتغيروا.`,
            R`نفس الدالة بتكتب في الصفحة: [[textContent]] بيحط الناتج كنص عادي في العنصر [[#out]]. لازم العنصر يبقى موجود في الـ HTML، وإلا [[querySelector]] هترجّع [[null]] والسطر يرمي TypeError.`,
          ],
          sol: R`الناتج الحقيقي في Chrome 156:
[[wasm changed 9 letters]]
[[HELLO WASM, مرحبا 123]]
[[wasm changed 14 letters]] والـ [[#out]] بقى [[FROM THE BROWSER]].

ومع [[Content-Type: application/octet-stream]]:
[[Failed to execute 'compile' on 'WebAssembly': Incorrect response MIME type. Expected 'application/wasm'.]]`
        },
        {
          cmd: "AssemblyScript",
          title: "AssemblyScript: تكتب wasm بشكل TypeScript",
          ref: [
            { t: "AssemblyScript: Getting started", url: "https://www.assemblyscript.org/getting-started.html" },
            { t: "AssemblyScript: Using the compiler", url: "https://www.assemblyscript.org/compiler.html" },
            { t: "AssemblyScript: Types", url: "https://www.assemblyscript.org/types.html" },
          ],
          desc: R`AssemblyScript لغة شكلها TypeScript بس بأنواع wasm ([[i32]] و [[f64]] و [[u8]]) وبتتحول [[.wasm]] بـ [[asc]]، من npm من غير Docker ولا compiler. والأهم: بتعمل ملف JS (bindings) بيحوّل النصوص والـ typed arrays لوحده، فتعمل [[import { greet } from "./build/release.js"]] وتنادي [[greet("Sara")]] عادي.

اتجرّب بـ AssemblyScript 0.28.20.`,
          example: R`// assembly/index.ts: AssemblyScript، شكله TypeScript بس بيتحول wasm
export function add(a: i32, b: i32): i32 {
  return a + b;
}
export function countPrimes(limit: i32): i32 {
  let count = 0;
  for (let n = 2; n < limit; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d == 0) { prime = false; break; }
    }
    if (prime) count++;
  }
  return count;
}
export function greet(name: string): string {
  return "Hello, " + name + "!";
}
export function sum(values: Float64Array): f64 {
  let total = 0.0;
  for (let i = 0; i < values.length; i++) total += values[i];
  return total;
}`,
          try: R`في فولدر **جديد فاضي** (مش [[~/lab/jslab]] اللي عملت فيه [[npm init -y]] في وحدة تانية): [[npm i -D -E assemblyscript]] ثم [[npx asinit . -y]]، أو استخدم أوامر «جهّز معملك» تحت الوحدة. حط المثال في [[assembly/index.ts]] واعمل [[npm run asbuild]]. اعمل [[test.mjs]] بيعمل [[import { add, countPrimes, greet, sum } from "./build/release.js"]] ويناديهم، وجرّب [[add(2147483647, 1)]]. وبص على حجم [[build/release.wasm]] و [[build/release.js]].`,
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[export function countWords(s: string): i32]] بتعدّ الكلمات المفصولة بمسافة أو tab أو سطر جديد، من غير [[split]].`, done: R`[[countWords("  hello   world ")]] بترجّع [[2]]، و [[countWords("")]] بترجّع [[0]]، و [[countWords("واحد اتنين تلاتة")]] بترجّع [[3]].`, sol: R`اتجرّب بـ AssemblyScript 0.28.20 ([[npx asinit . -y]] وبعدين [[npx asc assembly/index.ts --target release]]) و Node 24.22.

~~~text assembly/index.ts (الإضافة)
export function countWords(s: string): i32 {
  let words = 0;
  let inWord = false;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    const space = c == 32 || c == 9 || c == 10 || c == 13;
    if (space) {
      inWord = false;
    } else if (!inWord) {
      inWord = true;
      words++;
    }
  }
  return words;
}
~~~

~~~js words.mjs
import { countWords } from "./build/release.js";

for (const s of ["  hello   world ", "", "واحد اتنين تلاتة", "tab\there\nnew line", "   "]) {
  console.log(JSON.stringify(s), "->", countWords(s));
}
~~~

~~~text node words.mjs
"  hello   world " -> 2
"" -> 0
"واحد اتنين تلاتة" -> 3
"tab\there\nnew line" -> 4
"   " -> 0
~~~

- **[[inWord]]:** بنعدّ لحظة «بداية الكلمة» بس: أول حرف مش مسافة بعد مسافة (أو في أول النص). كده المسافات الكتير ورا بعض والمسافة في الأول والآخر مبتعملش كلمات فاضية، وده اللي [[split(" ")]] كان هيغلط فيه ([[" a  b".split(" ")]] بيطلّع ٤ عناصر).
- **[[s.charCodeAt(i)]] والأرقام [[32]] و [[9]] و [[10]] و [[13]]:** المسافة و tab و سطر جديد و [[\r]] (ويندوز بيكتب السطر الجديد [[\r\n]]). في AssemblyScript المقارنة بالأرقام أسرع من مقارنة نصوص.
- **[[==]] مش [[===]]:** في AssemblyScript [[==]] على الأرقام مقارنة عادية، والنوع معروف وقت الـ compile.
- **العربي:** حروفه مش مسافات، فاتعدّوا كلمات عادي (3).

**الغلطة الشائعة:** تعدّ المسافات وتزوّد واحد ([[spaces + 1]]): [["  hello   world "]] كانت هتطلع 7، والنص الفاضي 1.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب توقعك لـ [[add("5", 2)]] و [[add(1.9, 1)]] و [[add(2147483647, 1)]]، وزوّد [[isEven(n: i32): bool]] وتوقّع [[typeof isEven(4)]]. بعدين شغّل.`, done: R`الناتج على AssemblyScript 0.28.20: [[7]] و [[2]] و [[-2147483648]] من غير ولا error (الـ bindings بتحوّل أي حاجة لـ i32)، و [[typeof isEven(4)]] هو [[boolean]]. وكاتب جنب كل واحدة توقعك كان صح ولا لأ.`, sol: R`~~~text assembly/index.ts (الإضافة)
export function isEven(n: i32): bool {
  return n % 2 == 0;
}
~~~

~~~js predict.mjs
import { add, isEven } from "./build/release.js";

// توقعاتي: add("5", 2) = 7 ؟  add(1.9, 1) = 2.9 ولا 2 ؟  add(2147483647, 1) = 2147483648 ؟
console.log('add("5", 2) =', add("5", 2));
console.log("add(1.9, 1) =", add(1.9, 1));
console.log("add(2147483647, 1) =", add(2147483647, 1));
console.log("add(NaN, 1) =", add(NaN, 1), "| add(undefined, 1) =", add(undefined, 1));
console.log("isEven(4) =", isEven(4), "| typeof:", typeof isEven(4), "| isEven(7) =", isEven(7));
~~~

~~~text node predict.mjs (AssemblyScript 0.28.20، Node 24.22)
add("5", 2) = 7
add(1.9, 1) = 2
add(2147483647, 1) = -2147483648
add(NaN, 1) = 1 | add(undefined, 1) = 1
isEven(4) = true | typeof: boolean | isEven(7) = false
~~~

| النداء | توقّع شائع | الحقيقي | ليه |
|---|---|---|---|
| [[add("5", 2)]] | [["52"]] زي JS | [[7]] | الـ bindings بيبعت الأرقام زي ما هي، والـ wasm بيحوّل أي argument لـ [[i32]] بـ [[ToInt32]]، فالنص [["5"]] بقى 5 |
| [[add(1.9, 1)]] | [[2.9]] | [[2]] | [[ToInt32]] بيشيل الكسر (مش تقريب): 1.9 بقت 1 |
| [[add(2147483647, 1)]] | [[2147483648]] | [[-2147483648]] | [[i32]] لفّ، من غير error |
| [[add(NaN, 1)]] و [[add(undefined, 1)]] | error | [[1]] | [[NaN]] و [[undefined]] بيبقوا [[0]] |
| [[typeof isEven(4)]] | [["number"]] | [["boolean"]] | wasm مفيهوش boolean (الـ [[bool]] جواه [[i32]] صفر أو واحد)، بس [[release.js]] بيعمل [[exports.isEven(n) != 0]] فبيرجّعه [[true]] أو [[false]] |

السطر ده في [[build/release.js]] اللي اتولّد:

~~~text build/release.js (جزء)
isEven(n) {
  // assembly/index/isEven(i32) => bool
  return exports.isEven(n) != 0;
},
~~~

**الغلطة الشائعة:** تعمل [[import]] للـ [[.wasm]] على طول من غير [[release.js]]، فـ [[isEven(4)]] ترجع [[1]] (رقم) مش [[true]]. والـ bindings مبتفحصش الأرقام: الفحص عليك (التمرين الجاي).` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[addSafe(a: i32, b: i32): i64]]، وغلاف JS [[safeAdd]] بيرفض أي حاجة مش [[Number.isInteger]]. واكتب [[test.mjs]] بـ [[node:assert/strict]] فيه ٦ حالات على الأقل للاتنين.`, done: R`[[node test.mjs]] بيعدّي من غير ولا error: [[addSafe(2147483647, 1)]] بترجّع [[2147483648n]] (BigInt)، و [[safeAdd("5", 2)]] و [[safeAdd(1.9, 1)]] بيرموا [[TypeError]]، ولو شلت الفحص من الغلاف الاختبار بيفشل.`, sol: R`~~~text assembly/index.ts (الإضافة)
export function addSafe(a: i32, b: i32): i64 {
  return <i64>a + <i64>b;
}
~~~

~~~js safe.mjs
// safe.mjs: غلاف بيرفض أي حاجة مش رقم صحيح جوه حدود i32 قبل ما يوصل للـ wasm
import { addSafe } from "./build/release.js";

const INT32_MIN = -(2 ** 31);
const INT32_MAX = 2 ** 31 - 1;

export function safeAdd(a, b) {
  for (const [name, v] of [["a", a], ["b", b]]) {
    if (!Number.isInteger(v)) throw new TypeError($__btsafeAdd: $__{name} لازم رقم صحيح، جالي $__{typeof v} $__{String(v)}$__bt);
    if (v < INT32_MIN || v > INT32_MAX) throw new RangeError($__btsafeAdd: $__{name} برا حدود i32: $__{v}$__bt);
  }
  return addSafe(a, b);
}
export { addSafe };
~~~

~~~js test.mjs
// test.mjs: node test.mjs
import assert from "node:assert/strict";
import { safeAdd, addSafe } from "./safe.mjs";

// addSafe نفسها: i64 بيوصل BigInt ومبيلفش
assert.equal(addSafe(2, 3), 5n);
assert.equal(addSafe(2147483647, 1), 2147483648n);
assert.equal(addSafe(-2147483648, -1), -2147483649n);
assert.equal(typeof addSafe(0, 0), "bigint");

// الغلاف
assert.equal(safeAdd(40, 2), 42n);
assert.equal(safeAdd(2147483647, 2147483647), 4294967294n);
assert.throws(() => safeAdd("5", 2), TypeError);
assert.throws(() => safeAdd(1.9, 1), TypeError);
assert.throws(() => safeAdd(NaN, 1), TypeError);
assert.throws(() => safeAdd(1, undefined), { name: "TypeError", message: /b لازم رقم صحيح/ });
assert.throws(() => safeAdd(2 ** 31, 0), RangeError);

console.log("all 11 assertions passed");
~~~

~~~text node test.mjs (AssemblyScript 0.28.20، Node 24.22)
all 11 assertions passed
~~~

**ولو شلت سطر [[Number.isInteger]] من الغلاف:**

~~~text node test.mjs (من غير الفحص)
AssertionError [ERR_ASSERTION]: Missing expected exception (TypeError).
Node.js v24.22.1
~~~

والـ exit code بقى 1. أول [[assert.throws]] على [[safeAdd("5", 2)]] وقع لأن الـ wasm قبل [["5"]] بصمت ورجّع [[7n]].

- **[[<i64>a + <i64>b]]:** الـ [[<i64>]] cast بيكبّر كل رقم لـ 64-bit **قبل** الجمع. لو كتبت [[<i64>(a + b)]] الجمع هيحصل في 32-bit ويلف الأول، وبعدين يتكبّر وهو غلط.
- **[[addSafe(2147483647, 1)]] = [[2147483648n]]:** الـ [[i64]] بيوصل JS كـ BigInt دايمًا، فالمقارنة في التستات بـ [[5n]] مش [[5]] ([[assert.equal(5n, 5)]] بيقع لأن [[assert/strict]] بيستخدم [[Object.is]]).
- **الغلاف بيفحص النوع والحدود:** [[Number.isInteger]] بيرفض النص والكسر و [[NaN]] و [[undefined]]، والحدود بترفض [[2 ** 31]] اللي الـ wasm كان هيلفه لسالب.
- **[[assert.throws(fn, { name, message: /.../ })]]:** بيتأكد من نوع الـ error **ونص الرسالة**، مش إنه رمى وخلاص.
- **مفيش test runner:** [[node:assert/strict]] لوحده بيرمي عند أول فشل، فالسكربت بيخرج بكود 1، وده كفاية لـ CI. ([[node --test]] بيدّيك تقرير لكل حالة لو عايز.)

**الغلطة الشائعة:** تختبر الحالات الصح بس ([[safeAdd(40, 2)]]). الحالات اللي لازم ترمي هي اللي بتثبت إن الغلاف بيعمل شغله، وهي اللي وقعت لما الفحص اتشال.` },
          ],
          flag: "script",
          deep: {
            why: R`لو انت مطوّر JavaScript وعايز wasm لحتة حسابات، تعلّم C أو Rust كتير. AssemblyScript قريب من TypeScript اللي تعرفه، وبيتسطّب من npm، وبيكتب الـ glue code بتاع النصوص والـ arrays لوحده.`,
            how: R`الأنواع مش أنواع TypeScript: [[number]] مش موجود، بدله [[i32]] (صحيح 32-bit) و [[i64]] و [[f32]] و [[f64]] (عشري 64-bit زي number في JS) و [[u8]] وغيرهم. [[string]] و [[Array]] و [[Float64Array]] موجودين، بس بيتخزّنوا في ذاكرة الـ wasm ومعاهم garbage collector صغير جوه الـ wasm (فالملف أكبر من C).

[[asc assembly/index.ts --target release]] بيقرا [[asconfig.json]]: [[optimizeLevel: 3]]، و [["bindings": "esm"]] = اعمل [[release.js]] كـ ES module. ملف الـ bindings بيحمّل الـ [[.wasm]] (بـ [[fetch]] في المتصفح أو [[readFile]] في Node)، ولكل دالة فيها string أو typed array بيعمل غلاف: يكتب الـ argument في الذاكرة ([[__lowerString]])، ينادي، ويقرا الناتج ([[__liftString]]). والدوال اللي أرقام بس بيصدّرها زي ما هي.

[[==]] في AssemblyScript مقارنة عادية (مفيش coercion زي JS)، و [[i32]] بيعمل overflow زي C.`,
            when: R`حسابات أرقام أو bytes (ضغط، hashing، معالجة صور، فيزيا) وانت مش عايز تكتب C أو Rust. لو عندك مكتبة C أو Rust جاهزة، استخدمها هي بدل ما تعيد كتابتها.`,
            mistakes: R`تعمل [[npm init -y]] قبل [[asinit]] فيرفض بـ [[The "type" field in ./package.json is set to "commonjs"]] (npm 11 بيكتب الحقل ده): ابدأ في فولدر فاضي أو اعمل [[npm pkg set type=module]] الأول. وتفتكره TypeScript: [[number]] و [[any]] و union types و closures بتلقط متغيرات مش مدعومين أو ليهم شروط. وتعمل [[import]] للـ [[.wasm]] مباشرة بدل [[release.js]] فتلاقي [[greet]] بترجّع رقم (pointer) مش نص. وتنسى إن [[i32]] بيلف: [[add(2147483647, 1)]] = [[-2147483648]].`
          },
          teach: R`## من [[npm i]] لـ [[import]]

اتجرّب على ويندوز بـ AssemblyScript 0.28.20 و Node 24.22.

---

## ١. [[npx asinit . -y]]

بيعمل [[assembly/index.ts]] و [[asconfig.json]] وفولدر [[build]] ويضيف سكربتات:

~~~text package.json (اللي اتضاف)
"type": "module",
"exports": { ".": { "import": "./build/release.js", "types": "./build/release.d.ts" } },
"scripts": {
  "asbuild:debug": "asc assembly/index.ts --target debug",
  "asbuild:release": "asc assembly/index.ts --target release",
  "asbuild": "npm run asbuild:debug && npm run asbuild:release"
}
~~~

و [[asconfig.json]] فيه [[target]] اتنين: [[debug]] (من غير optimization، و source map) و [[release]] ([["optimizeLevel": 3]])، و [["bindings": "esm"]].

### لو عملت [[npm init -y]] الأول: [[asinit]] بيرفض

npm 11 (اتجرّب على 11.19.1) بيكتب [["type": "commonjs"]] في [[package.json]] لما تعمل [[npm init -y]]. و [[asinit]] محتاج ES modules، فبيرفض ومبيعملش ولا ملف:

~~~text npm init -y ثم npm i -D -E assemblyscript ثم npx asinit . -y
Error: The "type" field in ./package.json is set to "commonjs".
       asinit requires the "type" field to be set to "module" (ES modules).
~~~

والفولدر فضل فيه [[node_modules]] و [[package.json]] و [[package-lock.json]] بس، من غير [[assembly]] ولا [[asconfig.json]].

| الحل | الأمر | ليه بيشتغل |
|---|---|---|
| ابدأ في فولدر فاضي | [[npm i -D -E assemblyscript]] ثم [[npx asinit . -y]] | [[npm i]] لوحده بيعمل [[package.json]] فيه [[devDependencies]] بس من غير [[type]]، و [[asinit]] بيحط [["type": "module"]] بنفسه |
| صلّح الفولدر الموجود | [[npm pkg set type=module]] ثم [[npx asinit . -y]] | بيغيّر الحقل لـ [[module]] قبل ما [[asinit]] يفحصه، واتجرّب وكمّل عادي |

وتشغيل [[npx asinit . -y]] تاني على نفس الفولدر آمن: بيكتب [[Exists]] جنب كل ملف موجود ومبيمسحش [[assembly/index.ts]] بتاعك.

---

## ٢. الكود

- [[add(a: i32, b: i32): i32]]: نفس شكل TypeScript، بس [[i32]] مكان [[number]].
- [[countPrimes]]: نفس خوارزمية الـ C. [[let prime = true]] = [[bool]].
- [[greet(name: string): string]]: نص داخل ونص خارج، و [[+]] بيلزق النصوص زي JS.
- [[sum(values: Float64Array): f64]]: typed array داخل، و [[f64]] (زي number في JS) خارج.

---

## ٣. [[npm run asbuild]]

~~~text ls -l build
debug.wasm      10335
debug.wat       58771
release.js       3475
release.wasm     4700
release.wat     38931
release.d.ts      662
~~~

- [[release.wasm]] 4.7KB (الـ C كان 722 byte): جواه runtime صغير للنصوص والـ arrays والذاكرة.
- [[.wat]]: نفس الـ wasm بصيغة نصية تقدر تقراها (درس [[.wasm]] في تاب الملفات).
- [[release.js]]: الـ bindings. و [[release.d.ts]]: الأنواع لـ TypeScript.

---

## ٤. [[test.mjs]]

~~~text test.mjs
import { add, countPrimes, greet, sum } from "./build/release.js";
console.log(add(2, 3));
console.log(countPrimes(100));
console.log(greet("Sara"));
console.log(sum(new Float64Array([1.5, 2.5, 3])));
console.log(add(2147483647, 1));
~~~

~~~text node test.mjs
5
25
Hello, Sara!
7
-2147483648
~~~

- [[Hello, Sara!]]: الـ bindings كتبت [["Sara"]] في الذاكرة، ونادت، وقرت الناتج. انت ماشفتش pointers خالص.
- [[7]]: [[1.5 + 2.5 + 3]].
- [[-2147483648]]: [[2147483647]] أكبر [[i32]]، و +1 لفّ للسالب (overflow). في JS العادي كان [[2147483648]].

### جوه [[release.js]]

~~~text release.js (جزء)
greet(name) {
  // assembly/index/greet(~lib/string/String) => ~lib/string/String
  name = __lowerString(name) || __notnull();
  return __liftString(exports.greet(name) >>> 0);
},
~~~

- [[__lowerString(name)]]: اكتب النص في ذاكرة الـ wasm ورجّع مكانه.
- [[exports.greet(ptr)]]: الدالة الحقيقية: pointer داخل، pointer خارج.
- [[__liftString(...)]]: اقرا النص من الذاكرة. AssemblyScript بيخزّن النصوص UTF-16 (زي JS)، والطول مكتوب قبل النص بـ 4 bytes.
- [[>>> 0]]: حوّل الرقم لـ unsigned 32-bit (الـ pointers مش سالبة).

ده نفس اللي عملناه بإيدنا بـ [[TextEncoder]] في الدرس اللي فات.

---

## الخلاصة

| | C + clang | AssemblyScript |
|---|---|---|
| اللغة | C | شبه TypeScript |
| التسطيب | Docker أو clang | [[npm i -D assemblyscript]] |
| الحجم هنا | 722 byte | 4.7KB |
| النصوص والـ arrays | بإيدك في [[memory]] | الـ bindings بتعملها |
| أنواع الأرقام | [[int]] و [[long long]] و [[double]] | [[i32]] و [[i64]] و [[f64]] |`,
          lines: [
            R`[[export]] بيخلي الدالة تطلع من الـ wasm، و [[i32]] نوع wasm حقيقي (رقم صحيح 32-bit) مش [[number]] بتاع TypeScript. الأنواع هنا مش اختيارية، لأن الـ compiler محتاجها عشان يطلّع تعليمات wasm.`,
            R`جمع عادي بس على [[i32]]: لو الناتج عدّى حوالي ٢.١ مليار بيلف للسالب من غير error، مش بيبقى رقم أكبر زي JS.`,
            R`نهاية [[add]].`,
            R`نفس خوارزمية الأعداد الأولية اللي كتبناها في C بس بشكل TypeScript، عشان نقارن الاتنين. بتاخد [[limit]] وبترجّع العدد كـ [[i32]].`,
            R`العدّاد. AssemblyScript بيستنتج من [[0]] إن نوعه [[i32]] (رقم صحيح)، مش زي JS اللي كل أرقامه عشرية 64-bit.`,
            R`بنجرّب كل رقم من 2 لحد قبل [[limit]]، لأن 0 و 1 مش أوليين.`,
            R`بنفترض إن الرقم أولي، واللفة اللي جاية هتحاول تثبت العكس. هنا بنستخدم [[true]] و [[false]] بجد لأن AssemblyScript عنده [[bool]]، مش 1 و 0 زي الـ C.`,
            R`القواسم من 2 لحد الجذر التربيعي بس ([[d * d <= n]]): أي قاسم أكبر من الجذر ليه قاسم مقابل أصغر منه كنا هنلاقيه قبل كده.`,
            R`لو [[n]] بيتقسم على [[d]] من غير باقي يبقى مش أولي، و [[break]] تخرج من لفة القواسم على طول. و [[==]] هنا على أرقام من نفس النوع، فمفيش تحويل أنواع زي [[==]] في JS.`,
            R`نهاية لفة القواسم.`,
            R`لو فضل [[prime]] بـ [[true]] بعد ما جرّبنا كل القواسم، يبقى أولي فنزوّد العدّاد واحد.`,
            R`نهاية لفة الأرقام.`,
            R`بيرجّع عدد الأعداد الأولية لـ JS كـ number عادي.`,
            R`نهاية [[countPrimes]].`,
            R`هنا الفرق الكبير عن C: [[string]] داخل و [[string]] خارج. الـ wasm نفسه مبيعرفش نصوص، فالـ bindings اللي [[asc]] بيعملها بتكتب النص في ذاكرة الـ wasm قبل النداء وتقراه بعده، وانت بتنادي [[greet("Sara")]] عادي.`,
            R`لزق نصوص عادي زي TypeScript، والنص الجديد بيتعمل جوه ذاكرة الـ wasm. ده اللي في C كان محتاج buffer و [[TextEncoder]] و [[TextDecoder]] بإيدك.`,
            R`نهاية [[greet]].`,
            R`بتاخد [[Float64Array]] (array أرقام عشرية 64-bit) وبترجّع [[f64]] = number عادي في JS. والـ bindings بتنسخ الأرقام لذاكرة الـ wasm قبل النداء، فانت مش محتاج تكتب في [[memory]] بإيدك.`,
            R`المجموع بيبدأ من [[0.0]]، والكتابة دي بتخلي AssemblyScript يستنتج النوع [[f64]]. لو كتبت [[0]] بس كان النوع هيبقى [[i32]] (رقم صحيح)، وده غلط لمجموع أرقام عشرية.`,
            R`بيلف على كل الأرقام بالـ index ويزوّد كل واحد على [[total]]، بنفس شكل TypeScript العادي.`,
            R`بيرجّع المجموع، والـ bindings بترجّعه لـ JS كـ number عادي.`,
            R`نهاية [[sum]].`,
          ],
          sol: R`الناتج الحقيقي:
[[5]] و [[25]] و [[Hello, Sara!]] و [[7]] و [[-2147483648]].
[[build/release.wasm]] = 4700 byte، و [[build/release.js]] = 3475 byte. والـ [[-2147483648]] لأن [[i32]] لفّ (overflow) زي C، مش زي number في JS.`
        },
        {
          cmd: "WASI و node:wasi",
          title: "WASI: wasm برا المتصفح، برنامج C بـ printf و fopen بيشتغل بـ node:wasi",
          ref: [
            { t: "Node.js: WASI", url: "https://nodejs.org/api/wasi.html" },
            { t: "WASI.dev", url: "https://wasi.dev/" },
            { t: "wasi-libc", url: "https://github.com/WebAssembly/wasi-libc" },
          ],
          pre: [
            { to: "node/process.argv و parseArgs", why: R`البرنامج بياخد [[argv]] زي أي CLI، و [[args]] في [[new WASI]] هي نفس الفكرة` },
            { to: "bash/$?", why: R`الـ exit code اللي [[wasi.start()]] بيرجّعه` },
          ],
          desc: R`WASI (WebAssembly System Interface) هو الطريقة اللي بيها ملف [[.wasm]] يطبع ويقرا ملفات ويشوف الـ arguments ومتغيرات البيئة **برا المتصفح**. البرنامج بيستورد دوال بأسماء معيارية ([[fd_write]] و [[path_open]] و [[args_get]]...) من module اسمه [[wasi_snapshot_preview1]]، وأي runtime بيدعم WASI بيدّيها له: Node بـ [[node:wasi]]، أو wasmtime، أو wasmer.

والفرق المهم عن الـ native: البرنامج **مبيشوفش غير الفولدرات اللي انت تفتحهاله** ([[preopens]]). [[fopen("/data/../run.mjs")]] رجّع [[Capabilities insufficient]].

اتعمله compile بـ clang 20.1.8 و [[wasi-sdk]] جوه [[alpine:3.22]]، واتشغّل على Node 24.22.1 على ويندوز. ولو أول مرة تعمل compile لـ C، ابدأ بدرس «wasm من C».`,
          example: R`// run.mjs: بيشغّل wcat.wasm (برنامج C) بـ node:wasi
import { readFile } from "node:fs/promises";
import { WASI } from "node:wasi";
import { argv } from "node:process";
const wasi = new WASI({
  version: "preview1",
  args: ["wcat", ...argv.slice(2)],
  env: { USER: "sara" },
  preopens: { "/data": "./data" },
});
const wasm = await WebAssembly.compile(await readFile("wcat.wasm"));
const instance = await WebAssembly.instantiate(wasm, wasi.getImportObject());
const code = wasi.start(instance);
console.log("exit code:", code);`,
          lines: [
            R`[[readFile]] من نسخة الـ promises في [[node:fs]]، عشان نقرا bytes ملف الـ [[.wasm]] من الديسك بـ [[await]].`,
            R`[[WASI]] كلاس مدمج في Node (من غير تسطيب). هو اللي بيعمل الدوال اللي البرنامج مستنيها: [[fd_write]] للطباعة، و [[path_open]] لفتح ملف، و [[args_get]] للـ arguments. ولسه experimental، فـ Node بيطبع [[ExperimentalWarning]] أول ما تستورده.`,
            R`[[argv]] هي الـ arguments اللي اتكتبت بعد [[node run.mjs]] في الترمنال، عشان نعدّيها للبرنامج C.`,
            R`بنعمل بيئة WASI للبرنامج ده بس. كل حاجة البرنامج هيشوفها (arguments وبيئة وملفات) بتتحدد هنا، ومفيش حاجة تانية من جهازك بتوصله.`,
            R`[[version]] إجباري: [["preview1"]] هي النسخة اللي clang و wasi-sdk بيطلّعوها (الـ imports اسمها [[wasi_snapshot_preview1]]). لو نسيته: [[The "options.version" property must be of type string. Received undefined]].`,
            R`الـ arguments اللي البرنامج هيشوفها في [[argv]] بتاع C. أول عنصر اسم البرنامج (زي أي برنامج native)، وبعده اللي اتكتب في الترمنال، و [[...]] بيفرد [[argv.slice(2)]] (من غير [[node]] واسم الملف).`,
            R`متغيرات البيئة. **مش بتتورّث** من جهازك: لو مكتبتهاش هنا، [[getenv("USER")]] في C هترجّع [[NULL]]. وده مقصود: البرنامج ميشوفش أسرار زي [[API_KEY]] اللي في بيئتك.`,
            R`**الفولدرات المسموحة**. المفتاح [["/data"]] هو الاسم اللي البرنامج هيشوفه، والقيمة [["./data"]] هي الفولدر الحقيقي على جهازك. أي مسار برا [[/data]] مش موجود بالنسبة للبرنامج، وأي محاولة يطلع منه بـ [[..]] بترجع [[Capabilities insufficient]].`,
            R`نهاية الإعدادات.`,
            R`[[compile]] بيحوّل الـ bytes لـ [[WebAssembly.Module]] (كود جاهز من غير ذاكرة ولا imports). ممكن تعمله مرة وتشغّله كذا مرة أو تبعته لـ Worker.`,
            R`[[getImportObject()]] بيرجّع [[{ wasi_snapshot_preview1: { fd_write, path_open, ... } }]]، وده بالظبط اللي البرنامج مستنيه. من غيره: [[Import #0 "wasi_snapshot_preview1": module is not an object or function]].`,
            R`[[start]] بينادي [[_start]] اللي clang عمله (بيجهّز مكتبة C وينادي [[main]])، ويرجّع الرقم اللي [[main]] رجّعته: exit code. ومينفعش تناديه مرتين على نفس الـ instance: [[WASI instance has already started]].`,
            R`بنطبع الـ exit code: [[0]] نجح، و [[2]] لو [[fopen]] فشل (من [[return 2]] في الـ C). وتقدر تمرره لـ [[process.exitCode]] لو السكربت نفسه جزء من pipeline.`,
          ],
          try: R`اعمل فولدر جديد فيه [[wcat.c]] (في الشرح) وفولدر [[data]] فيه [[note.txt]] بسطرين. اعمل compile بأمر Docker اللي في الشرح، وشغّل [[node run.mjs]]، وبعدين [[node run.mjs /data/note.txt]] و [[node run.mjs /data/../run.mjs]] و [[node run.mjs /etc/passwd]]. وبعدين خلّي [[preopens]] فاضي وشوف إيه اللي اتغيّر. (في Git Bash على ويندوز اكتب [[MSYS_NO_PATHCONV=1]] قبل [[node]]، وإلا [[/data]] بيتحول لـ [[C:/Program Files/Git/data]].)`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب السطر اللي [[perror]] هيطبعه والـ exit code لكل واحدة: [[/data/note.txt]]، و [[/data/missing.txt]]، و [[/data/../run.mjs]]، ونفس [[/data/note.txt]] بس و [[preopens: {}]].`, done: R`الناتج الحقيقي: الأولى طبعت السطرين و [[exit code: 0]]، والتانية [[fopen: No such file or directory]] و 2، والتالتة [[fopen: Capabilities insufficient]] و 2 (مش «مش موجود»: البرنامج حاول يطلع برا الفولدر)، والرابعة [[No such file or directory]] و 2 لأن [[/data]] نفسها مش موجودة بالنسبة له. وكاتب جنب كل واحدة توقعك.`, sol: R`اتجرّب بـ [[wcat.c]] و [[run.mjs]] بتوع الدرس زي ما هم، و Node 24.22 على ويندوز من Git Bash بـ [[MSYS_NO_PATHCONV=1]]. والـ compile بـ clang 22 من [[@yowasp/clang]] (Docker مكانش متاح) بـ [[--target=wasm32-wasip1 -O2]]، والناتج 35347 byte.

> **فرق لقيته:** بـ [[--target=wasm32-wasi]] (الاسم اللي في الدرس) clang 22 من YoWASP وقف بـ [[fatal error: 'stdio.h' file not found]]: الاسم القديم [[wasm32-wasi]] اتغيّر لـ [[wasm32-wasip1]] في النسخ الجديدة، والمكتبة جواه متسطّبة بالاسم الجديد بس. clang 20 في Alpine لسه بيقبل الاتنين.

~~~bash
node run.mjs /data/note.txt
node run.mjs /data/missing.txt
node run.mjs /data/../run.mjs
node run-nopre.mjs /data/note.txt     # نفس run.mjs بس preopens: {}
~~~

~~~text الناتج (من غير سطرين الـ ExperimentalWarning اللي بيطلعوا كل مرة)
== /data/note.txt
hi sara, reading /data/note.txt
| سطر أول من ملف حقيقي
| second line
exit code: 0
== /data/missing.txt
hi sara, reading /data/missing.txt
fopen: No such file or directory
exit code: 2
== /data/../run.mjs
hi sara, reading /data/../run.mjs
fopen: Capabilities insufficient
exit code: 2
== /data/note.txt, preopens {}
hi sara, reading /data/note.txt
fopen: No such file or directory
exit code: 2
~~~

| المسار | السطر من [[perror]] | الكود | ليه |
|---|---|---|---|
| [[/data/note.txt]] | (مفيش) | 0 | [[/data]] متفتح على [[./data]] والملف موجود |
| [[/data/missing.txt]] | [[No such file or directory]] | 2 | الفولدر متاح بس الملف مش موجود ([[ENOENT]]) |
| [[/data/../run.mjs]] | [[Capabilities insufficient]] | 2 | البرنامج حاول يطلع برا الفولدر اللي اتاداله. WASI مبيقولش «مش موجود»، بيقول «مالكش صلاحية» ([[ENOTCAPABLE]]) |
| نفس الأول بـ [[preopens: {}]] | [[No such file or directory]] | 2 | مفيش أي فولدر متفتح، فـ [[/data]] نفسها مش موجودة بالنسبة للبرنامج |

- **السطر الأول [[hi sara]] بيتطبع في كل الحالات:** [[printf]] قبل [[fopen]]، و [[USER]] جاي من [[env]] في [[new WASI]] بس، مش من جهازك.
- **[[perror("fopen")]]:** بيطبع [[fopen: ]] وبعدها سبب آخر غلطة (من [[errno]])، على stderr.
- **[[return 2]] → [[exit code: 2]]:** [[wasi.start()]] بيرجّع الكود اللي [[main]] رجّعته.

**الغلطة الشائعة:** تتوقع إن [[/data/../run.mjs]] هيلاقي [[run.mjs]] لأنه فعلًا موجود في الفولدر اللي فوق [[data]]. ده بالظبط اللي WASI بيمنعه: البرنامج يشوف الفولدرات اللي انت فتحتهاله بس، وأي مسار بيخرج منها مرفوض حتى لو الملف موجود.` },
            { lvl: 'تطبيق', t: R`**ابني أداة:** [[wcount.c]] زي [[wc]]: بياخد اسم ملف ويطبع عدد السطور والكلمات والـ bytes، ومن غير ملف يطبع [[usage: wcount FILE]] على [[stderr]] ويرجّع 1. شغّله بـ [[node:wasi]] وخلّي [[stdout]] يروح لملف [[out.txt]] بـ [[openSync]] و خيار [[stdout]] في [[new WASI]].`, done: R`على [[note.txt]] (سطرين: «سطر أول من ملف حقيقي» و «second line») [[out.txt]] فيه [[2 7 49 /data/note.txt]] والـ exit code صفر، وعلى ملف مش موجود الترمنال طبع [[/data/nope.txt: No such file or directory]] و [[out.txt]] فاضي والـ exit code 1، ومن غير arguments طبع [[usage: wcount FILE]] و 1.`, sol: R`~~~text wcount.c
// wcount.c: زي wc: السطور والكلمات والـ bytes لملف
#include <stdio.h>
#include <ctype.h>
int main(int argc, char **argv) {
  if (argc < 2) {
    fprintf(stderr, "usage: wcount FILE\n");
    return 1;
  }
  FILE *f = fopen(argv[1], "rb");
  if (!f) {
    perror(argv[1]);
    return 1;
  }
  long lines = 0, words = 0, bytes = 0;
  int c, inWord = 0;
  while ((c = fgetc(f)) != EOF) {
    bytes++;
    if (c == '\n') lines++;
    if (isspace(c)) {
      inWord = 0;
    } else if (!inWord) {
      inWord = 1;
      words++;
    }
  }
  fclose(f);
  printf("%ld %ld %ld %s\n", lines, words, bytes, argv[1]);
  return 0;
}
~~~

~~~bash
# clang 22 من @yowasp/clang (أو أمر Docker بتاع الدرس مع wasi-sdk)
clang --target=wasm32-wasip1 -O2 -o wcount.wasm wcount.c      # 34268 byte
~~~

~~~js wcount.mjs
// wcount.mjs: بيشغّل wcount.wasm، والـ stdout بيروح لملف out.txt
import { readFile } from "node:fs/promises";
import { openSync, closeSync } from "node:fs";
import { WASI } from "node:wasi";
import { argv } from "node:process";

const out = openSync("out.txt", "w");
const wasi = new WASI({
  version: "preview1",
  args: ["wcount", ...argv.slice(2)],
  preopens: { "/data": "./data" },
  stdout: out,
});
const instance = await WebAssembly.instantiate(await WebAssembly.compile(await readFile("wcount.wasm")), wasi.getImportObject());
const code = wasi.start(instance);
closeSync(out);
console.log("exit code:", code);
~~~

~~~text الناتج (Node 24.22، من غير سطرين الـ ExperimentalWarning)
== node wcount.mjs /data/note.txt
exit code: 0
out.txt: [2 7 49 /data/note.txt]
== node wcount.mjs /data/nope.txt
/data/nope.txt: No such file or directory
exit code: 1
out.txt: []
== node wcount.mjs
usage: wcount FILE
exit code: 1
out.txt: []
~~~

- **[[fprintf(stderr, ...)]] و [[perror(argv[1])]]:** رسايل الغلط على stderr، فبتظهر في الترمنال ومبتروحش [[out.txt]] (الملف فاضي في الحالتين). ده نفس اللي أي أداة Unix بتعمله، عشان [[wcount x > out.txt]] ميتملاش رسايل غلط.
- **[[fopen(argv[1], "rb")]]:** [[b]] = binary، فالـ bytes بتتعدّ زي ما هي (49 byte: «سطر أول من ملف حقيقي» 16 حرف عربي × 2 byte و 4 مسافات = 36، و [[second line]] 11، وسطرين جداد).
- **[[isspace(c)]] و [[inWord]]:** نفس فكرة [[countWords]]: بنعدّ بداية كل كلمة. والـ bytes العربي أكبر من 127 فمش مسافات، فالكلمات العربي اتعدّت (5 + 2 = 7).
- **[[stdout: out]] في [[new WASI]]:** رقم file descriptor من [[openSync]]، فأي حاجة البرنامج بيكتبها على fd 1 بتروح الملف. و [[closeSync(out)]] بعد [[start]] عشان الكتابة تخلص.
- **[[return 1]] في الحالتين:** الكود اللي المطلوب، و [[wasi.start()]] رجّعه.

**مقارنة بـ [[wc]] الحقيقي في Git Bash:** [[wc -l -w -c data/note.txt]] طلّع [[2 2 49]]، يعني كلمتين بس! [[wc]] في الـ locale الافتراضي ([[C]]) مبيعتبرش bytes العربي حروف. ومع [[LC_ALL=C.UTF-8 wc -l -w -c data/note.txt]] طلع [[2 7 49]] زي [[wcount]].

**الغلطة الشائعة:** تطبع الـ usage بـ [[printf]] (على stdout)، فـ [[out.txt]] يبقى فيه «usage: wcount FILE» والسكربت اللي بيقرا الناتج يفتكره رقم.` },
            { lvl: 'تحدي', t: R`**اكتب غلاف متين واختباره:** [[runWasi(file, { args, env, dirs })]] بترجّع [[{ code }]] وبتعمل [[new WASI]] جديد كل نداء. ارمي error واضح لو الملف مش موجود، ولو الـ wasm مالوش [[_start]] (زي [[sum.wasm]] بتاع درس «wasm من C»)، واختبرها بـ [[node:assert/strict]].`, done: R`[[node test.mjs]] بيعدّي: [[wcat.wasm]] بيرجّع [[{ code: 0 }]] مرتين ورا بعض (مفيش [[WASI instance has already started]] لأن كل نداء بـ WASI جديد)، و [[sum.wasm]] بيرمي رسالتك انت بدل [[The "instance.exports._start" property must be of type function]]، والملف المش موجود رسالته فيها اسم الملف.`, sol: R`~~~js run-wasi.mjs
// run-wasi.mjs: runWasi بيشغّل أي برنامج WASI بـ WASI جديد كل مرة
import { readFile } from "node:fs/promises";
import { WASI } from "node:wasi";
import path from "node:path";

export async function runWasi(file, { args = [], env = {}, dirs = {}, stdout, stderr } = {}) {
  let bytes;
  try {
    bytes = await readFile(file);
  } catch (e) {
    throw new Error($__btrunWasi: مش لاقي الملف $__{path.resolve(file)} ($__{e.code})$__bt, { cause: e });
  }
  const module = await WebAssembly.compile(bytes);
  const hasStart = WebAssembly.Module.exports(module).some((x) => x.name === "_start" && x.kind === "function");
  if (!hasStart) {
    throw new Error($__btrunWasi: $__{path.basename(file)} مش برنامج WASI (مفيهوش _start). ده library؟ حمّله بـ WebAssembly.instantiate ونادي دواله.$__bt);
  }
  const wasi = new WASI({ version: "preview1", args: [path.basename(file, ".wasm"), ...args], env, preopens: dirs, stdout, stderr });
  const instance = await WebAssembly.instantiate(module, wasi.getImportObject());
  return { code: wasi.start(instance) };
}
~~~

~~~js test.mjs
// test.mjs: node test.mjs
import assert from "node:assert/strict";
import { openSync, closeSync, readFileSync } from "node:fs";
import { WASI } from "node:wasi";
import { runWasi } from "./run-wasi.mjs";

const dirs = { "/data": "./data" };
const out = openSync("test-out.txt", "w");

// نفس البرنامج مرتين ورا بعض: كل نداء بـ WASI جديد
assert.deepEqual(await runWasi("wcat.wasm", { args: ["/data/note.txt"], env: { USER: "test" }, dirs, stdout: out }), { code: 0 });
assert.deepEqual(await runWasi("wcat.wasm", { args: ["/data/note.txt"], dirs, stdout: out }), { code: 0 });
closeSync(out);
const printed = readFileSync("test-out.txt", "utf8");
assert.match(printed, /^hi test, reading \/data\/note.txt/);
assert.match(printed, /hi nobody, reading/); // التاني من غير USER
assert.equal(printed.split("| second line").length - 1, 2);

// exit code مش صفر بيرجع زي ما هو، مش error
assert.deepEqual(await runWasi("wcat.wasm", { args: ["/data/missing.txt"], dirs, stdout: openSync("test-err.txt", "w"), stderr: openSync("test-err.txt", "a") }), { code: 2 });

// مكتبة من غير _start: رسالتنا مش رسالة node:wasi
await assert.rejects(runWasi("sum.wasm"), { message: /sum\.wasm مش برنامج WASI \(مفيهوش _start\)/ });

// ملف مش موجود: الرسالة فيها اسم الملف
await assert.rejects(runWasi("nope.wasm"), { message: /nope\.wasm \(ENOENT\)/ });

// وده ليه WASI جديد كل نداء: نفس الـ WASI مرتين بيرمي
const once = new WASI({ version: "preview1", args: ["wcat", "/data/note.txt"], preopens: dirs, stdout: openSync("test-out.txt", "w") });
const mod = await WebAssembly.compile(readFileSync("wcat.wasm"));
once.start(await WebAssembly.instantiate(mod, once.getImportObject()));
assert.throws(() => once.start({ exports: {} }), (e) => (console.log("same WASI twice:", e.code, "-", e.message), e.code === "ERR_WASI_ALREADY_STARTED"));

// ورسالة node:wasi الأصلية لو ناديت sum.wasm من غير الغلاف
const raw = new WASI({ version: "preview1" });
await assert.rejects(
  (async () => raw.start(await WebAssembly.instantiate(await WebAssembly.compile(readFileSync("sum.wasm")), raw.getImportObject())))(),
  (e) => (console.log("node:wasi says:", e.message), true),
);
console.log("all runWasi checks passed");
~~~

انسخ [[sum.wasm]] بتاع درس «wasm من C» (library من غير [[_start]]) جنب [[wcat.wasm]]، وبعدين:

~~~bash
node test.mjs; echo "exit: $?"
~~~

~~~text الناتج (Node 24.22، من غير سطرين الـ ExperimentalWarning)
same WASI twice: ERR_WASI_ALREADY_STARTED - WASI instance has already started
node:wasi says: The "instance.exports._start" property must be of type function. Received undefined
all runWasi checks passed
exit: 0
~~~

و [[test-err.txt]] فيه اللي البرنامج كتبه في نداء الملف المش موجود: [[hi nobody, reading /data/missing.txt]] و [[fopen: No such file or directory]].

- **[[new WASI]] جوه الدالة:** كل نداء بـ instance جديد، فـ [[wcat.wasm]] اشتغل مرتين ورا بعض بـ [[{ code: 0 }]]. وآخر جزء في التست بيبيّن ليه: نفس الـ WASI مرة تانية بيرمي [[ERR_WASI_ALREADY_STARTED]] برسالة [[WASI instance has already started]].
- **[[WebAssembly.Module.exports(module)]] قبل [[instantiate]]:** بنسأل الـ module «عندك [[_start]]؟» من غير ما نشغّله. [[sum.wasm]] معندوش (اتعمله compile بـ [[--no-entry]])، فبنرمي رسالتنا اللي بتقول المشكلة وإيه الحل، بدل رسالة [[node:wasi]] الأصلية اللي اتطبعت فوق: [[The "instance.exports._start" property must be of type function. Received undefined]].
- **الـ [[readFile]] في [[try]] والرسالة فيها [[path.resolve(file)]] و [[e.code]]:** «مش لاقي الملف C:\...\nope.wasm (ENOENT)» بتقولك بالظبط فين دوّر. و [[{ cause: e }]] بيحتفظ بالـ error الأصلي لو حد محتاج تفاصيله.
- **exit code مش صفر مش error:** البرنامج اشتغل وخلص بكود 2، فالدالة بترجّع [[{ code: 2 }]] عادي واللي بينادي يقرر. الـ errors للحاجات اللي منعت التشغيل نفسه.
- **[[assert.rejects(promise, { message: /.../ })]]:** للدوال الـ async، بيستنى الـ Promise يترفض ويقارن الرسالة بالـ regex.

**الغلطة الشائعة:** تعمل [[const wasi = new WASI(...)]] مرة واحدة برة الدالة «عشان توفّر»، فأول نداء يشتغل وكل اللي بعده يرمي [[WASI instance has already started]].` },
          ],
          flag: "script",
          deep: {
            why: R`الـ wasm لوحده مبيعرفش يعمل ولا حاجة برا ذاكرته: مفيش طباعة ولا ملفات ولا وقت. في المتصفح JavaScript بيدّيله دوال بإيده (درس «WebAssembly في المتصفح»). WASI بيوحّد الدوال دي، فنفس الـ [[.wasm]] يشتغل على Node و wasmtime و wasmer وجوه Docker وعلى أي نظام، وبرنامج C أو Rust عادي بـ [[printf]] و [[fopen]] يتعمله compile من غير ما تغيّر سطر.`,
            how: R`**الـ compile:** [[--target=wasm32-wasi]] بيقول لـ clang يستخدم [[wasi-libc]] (مكتبة C مكتوبة فوق WASI) بدل [[-nostdlib]]. [[printf]] جوه wasi-libc بينادي [[fd_write]] على fd رقم 1 (stdout)، و [[fopen]] بينادي [[path_open]]. والناتج 33KB بدل 722 byte لأن فيه مكتبة C (printf لوحدها كبيرة).

**الـ imports:** [[WebAssembly.Module.imports(wasm)]] على [[wcat.wasm]] طلّع ١٤ دالة كلها من [[wasi_snapshot_preview1]]: [[args_get]] و [[environ_get]] و [[fd_write]] و [[fd_read]] و [[path_open]] و [[proc_exit]] وغيرهم. والـ exports اتنين بس: [[memory]] و [[_start]].

**الـ capabilities:** مفيش «افتح أي مسار». البرنامج بيستلم file descriptors جاهزة لكل فولدر في [[preopens]] (بـ [[fd_prestat_get]])، وكل [[path_open]] لازم يبقى جوه واحد منهم. عشان كده [[/data/../run.mjs]] رجعت [[Capabilities insufficient]] (اسمها [[ENOTCAPABLE]] في WASI) مش [[No such file]].

**بس خد بالك:** docs بتاعة Node بتقول صراحة إن [[node:wasi]] **مش sandbox آمن** لكود مش واثق فيه: الحماية دي مش كاملة زي runtimes تانية. لكود من برا استخدم wasmtime أو عزل حقيقي (container).

**Reactor ولا command:** البرنامج اللي فيه [[main]] اسمه command وبيتشغّل بـ [[wasi.start()]]. والمكتبة اللي من غير [[main]] (زي [[sum.wasm]]) اسمها reactor: بتعمل [[wasi.initialize(instance)]] لو محتاجة WASI، وبعدين تنادي الدوال عادي.

**preview1 و preview2:** [[wasi_snapshot_preview1]] هي اللي شغالة في كل مكان النهارده. و WASI 0.2 (preview2) مبني على الـ Component Model وفيه sockets و HTTP، ومدعوم في wasmtime، و Node لسه بيدعم preview1 بس (من docs بتاعة Node و wasmtime).`,
            when: R`نفس الأداة (parser، ضاغط، محوّل صور) محتاجها على كذا نظام من ملف واحد. أو plugins لبرنامجك بتشتغل معزولة (Envoy و Zed و Shopify Functions بيستخدموا wasm للسبب ده). أو تشغّل أداة C في سكربت Node من غير compiler على جهاز اليوزر. مش بديل لـ addon native لو محتاج سرعة الـ syscalls أو threads كاملة.`,
            mistakes: R`تنسى [[version: "preview1"]] فيرمي [[ERR_INVALID_ARG_TYPE]]. تنسى [[getImportObject()]] فتاخد [[Import #0 "wasi_snapshot_preview1": module is not an object or function]]. تنادي [[start]] مرتين على نفس الـ instance ([[ERR_WASI_ALREADY_STARTED]]). تنادي [[start]] على reactor مالوش [[_start]]. تحط مسار فولدر في [[preopens]] مش موجود فيرمي [[UVWASI_ENOENT]] من [[new WASI]] نفسها. تفتكر إن البرنامج شايف متغيرات البيئة بتاعتك. وفي Git Bash على ويندوز، [[/data]] في الـ arguments بيتحول لمسار ويندوز لو مكتبتش [[MSYS_NO_PATHCONV=1]].`
          },
          teach: R`## نفس برنامج C، برا المتصفح

في درس «wasm من C» عملنا compile بـ [[-nostdlib]]: من غير [[printf]] ولا [[fopen]]، والـ JS كان بيكتب في الذاكرة بإيده. هنا برنامج C **عادي** بمكتبة C كاملة، بيقرا arguments وبيئة وملف، وبيتشغّل بـ [[node:wasi]].

كله اتشغّل فعلًا: clang 20.1.8 و wasi-sdk 25 جوه [[alpine:3.22]]، و Node 24.22.1 على ويندوز.

---

## ١. البرنامج: [[wcat.c]]

~~~text wcat.c
// wcat.c: بيطبع ملف زي cat، C عادي بـ printf و fopen
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char **argv) {
  const char *path = argc > 1 ? argv[1] : "/data/note.txt";
  const char *user = getenv("USER");
  printf("hi %s, reading %s\n", user ? user : "nobody", path);
  FILE *f = fopen(path, "r");
  if (!f) { perror("fopen"); return 2; }
  char line[256];
  while (fgets(line, sizeof line, f)) printf("| %s", line);
  fclose(f);
  return 0;
}
~~~

- [[#include <stdio.h>]]: [[printf]] و [[fopen]] و [[fgets]] و [[perror]]. ده اللي مكنش موجود مع [[-nostdlib]].
- [[argc > 1 ? argv[1] : "/data/note.txt"]]: لو اتبعت مسار خده، وإلا الملف الافتراضي.
- [[getenv("USER")]]: متغير بيئة، وهيرجع [[NULL]] لو الـ runtime مدّاهوش.
- [[perror("fopen")]]: بيطبع [[fopen: ]] وبعدها سبب آخر غلطة بالكلام (من [[errno]]).
- [[return 2]]: الـ exit code لما الفتح يفشل.

---

## ٢. الـ compile: [[wasm32-wasi]]

~~~bash
docker run --rm -v "$PWD:/src" -w /src alpine:3.22 sh -c "apk add --no-cache clang lld wasi-sdk && clang --target=wasm32-wasi -O2 -o wcat.wasm wcat.c"
~~~

| الحتة | معناها |
|---|---|
| [[wasi-sdk]] | باكدج في Alpine بيسطّب [[wasi-libc]] (مكتبة C فوق WASI) و [[wasi-compiler-rt]] |
| [[--target=wasm32-wasi]] | wasm 32-bit بيستورد دوال WASI، ومعاه مكتبة C بدل [[-nostdlib]] |
| من غير [[--no-entry]] | المرة دي فيه [[main]]، و clang بيعمل [[_start]] بينادي عليها |

(في PowerShell بدّل [[$PWD]] بـ [[$__{PWD}]] زي درس «wasm من C». والتسطيب نزّل حوالي 500MB جوه الـ container ومش بيفضل على جهازك.)

> **الاسم الجديد للـ target:** WASI اتقسم لنسخ (Preview 1 و Preview 2)، فالـ target بقى اسمه [[wasm32-wasip1]] (ومعاه [[wasm32-wasip2]]). [[wasm32-wasi]] لسه شغال في باكدج Alpine فوق، بس في نسخ clang الجديدة اللي جاية بـ sysroot لـ p1 بس (زي clang 22 من [[@yowasp/clang]]) وقف بـ [[fatal error: 'stdio.h' file not found]] واشتغل بـ [[--target=wasm32-wasip1]] (اتجرّب ٢١ نوفمبر ٢٠٢٦). لو شفت الرسالة دي جرّب الاسم الجديد الأول. و [[node:wasi]] اللي تحت بيشغّل الاتنين لأنه بيتكلم WASI Preview 1.

~~~text ls -l
-rwxr-xr-x    1 root     root         33577 wcat.wasm
~~~

33KB بدل 722 byte: جواه wasi-libc (و [[printf]] لوحدها كبيرة).

### بيستورد إيه؟

~~~js
const m = await WebAssembly.compile(fs.readFileSync("wcat.wasm"));
WebAssembly.Module.imports(m).map(i => i.module + "." + i.name);
~~~

~~~text الناتج (14 دالة)
wasi_snapshot_preview1.args_get
wasi_snapshot_preview1.args_sizes_get
wasi_snapshot_preview1.environ_get
wasi_snapshot_preview1.environ_sizes_get
wasi_snapshot_preview1.fd_close
wasi_snapshot_preview1.fd_fdstat_get
wasi_snapshot_preview1.fd_fdstat_set_flags
wasi_snapshot_preview1.fd_prestat_get
wasi_snapshot_preview1.fd_prestat_dir_name
wasi_snapshot_preview1.fd_read
wasi_snapshot_preview1.fd_seek
wasi_snapshot_preview1.fd_write
wasi_snapshot_preview1.path_open
wasi_snapshot_preview1.proc_exit
exports: memory:memory, _start:function
~~~

| الدالة | جاية منين في الـ C |
|---|---|
| [[args_get]] و [[args_sizes_get]] | [[argc]] و [[argv]] اللي [[main]] بتستلمهم |
| [[environ_get]] | [[getenv]]: بيقرا من [[env]] اللي في [[new WASI]] بس |
| [[fd_write]] | [[printf]] بيكتب على fd 1 (stdout)، و [[perror]] على fd 2 (stderr) |
| [[path_open]] و [[fd_read]] | [[fopen]] بيفتح، و [[fgets]] بيقرا سطر سطر |
| [[fd_prestat_get]] | مكتبة C بتسأل بيه «إيه الفولدرات اللي اتفتحتلي؟» أول ما البرنامج يقوم |
| [[proc_exit]] | الخروج بالـ exit code |

ده **كل** اللي البرنامج يقدر يعمله في العالم: مفيش import تاني، فمفيش شبكة ولا تشغيل برامج.

---

## ٣. التشغيل بـ [[node:wasi]]

~~~text node run.mjs
(node:46324) ExperimentalWarning: WASI is an experimental feature and might change at any time
(Use $__btnode --trace-warnings ...$__bt to show where the warning was created)
hi sara, reading /data/note.txt
| سطر أول من ملف حقيقي
| second line
exit code: 0
~~~

- [[ExperimentalWarning]]: في Node 24 لسه experimental. [[node --no-warnings run.mjs]] بيخفيه، والرقم [[46324]] هو الـ PID وبيتغيّر كل مرة.
- [[hi sara]]: [[getenv("USER")]] رجّعت القيمة اللي في [[env]] بتاعة [[new WASI]]، مش اسم اليوزر بتاع جهازك.
- [[reading /data/note.txt]]: مفيش arguments، فالبرنامج خد المسار الافتراضي. و [[/data]] ده الاسم اللي في [[preopens]]، والملف الحقيقي [[./data/note.txt]] جنب [[run.mjs]].
- العربي اتقرا واتطبع سليم: الملف UTF-8 والبرنامج بينقل bytes من غير ما يفهمها.
- [[exit code: 0]]: اللي [[main]] رجّعته، و [[wasi.start]] رجّعهولنا.

---

## ٤. الـ sandbox: [[preopens]]

نفس [[wcat.wasm]] بمسارات مختلفة ([[node --no-warnings run.mjs PATH]]):

~~~text
== /data/note.txt
hi sara, reading /data/note.txt
| سطر أول من ملف حقيقي
| second line
exit code: 0
== /data/../run.mjs
hi sara, reading /data/../run.mjs
fopen: Capabilities insufficient
exit code: 2
== /etc/passwd   (من هنا شلت سطر hi للاختصار)
fopen: No such file or directory
== C:/Windows/win.ini
fopen: No such file or directory
== /data/missing.txt
fopen: No such file or directory
~~~

| المسار | النتيجة | ليه |
|---|---|---|
| [[/data/note.txt]] | اتقرا | جوه الفولدر اللي في [[preopens]] |
| [[/data/../run.mjs]] | [[Capabilities insufficient]] | بيحاول يطلع برا [[/data]] بـ [[..]]، و WASI بيرفض (اسمها [[ENOTCAPABLE]]) |
| [[/etc/passwd]] و [[C:/Windows/win.ini]] | [[No such file or directory]] | بالنسبة للبرنامج، مفيش أي مسار غير [[/data]] |

ولما خليت [[preopens: {}]]، حتى [[/data/note.txt]] بقت [[No such file or directory]]. ولو كتبت فولدر مش موجود على جهازك ([[preopens: { "/data": "./nope" }]])، [[new WASI]] نفسها بترمي [[Error: UVWASI_ENOENT, uvwasi_init]] قبل ما البرنامج يبدأ.

> **مهم:** docs بتاعة Node بتقول إن [[node:wasi]] مش sandbox كامل لكود مش واثق فيه. الـ preopens بتمنع الغلط العادي، بس لكود جاي من برا استخدم wasmtime أو container.

---

## ٥. الأخطاء اللي هتقابلها (اتشغّلت كلها)

| الغلطة | الرسالة | التصليح |
|---|---|---|
| [[new WASI({})]] | [[The "options.version" property must be of type string. Received undefined]] | زوّد [[version: "preview1"]] |
| [[instantiate(wasm, {})]] | [[Import #0 "wasi_snapshot_preview1": module is not an object or function]] | ابعت [[wasi.getImportObject()]] |
| [[start]] مرتين | [[ERR_WASI_ALREADY_STARTED]]: [[WASI instance has already started]] | اعمل [[new WASI]] و instance جديد لكل تشغيلة |
| [[start]] على [[sum.wasm]] | [[The "instance.exports._start" property must be of type function. Received undefined]] | استخدم [[wasi.initialize(instance)]] |

والأخيرة لأن [[sum.wasm]] مكتبة من غير [[main]] (اسمها reactor). ودي بتتنادى دوالها عادي، ولو محتاجة WASI بتعمل [[wasi.initialize(instance)]] بدل [[start]].

---

## ٦. [[stdout]] لملف

~~~js
const out = openSync("out.txt", "w");
const wasi = new WASI({ version: "preview1", args: ["wcount", "/data/note.txt"], preopens: { "/data": "./data" }, stdout: out });
~~~

[[stdout]] و [[stderr]] و [[stdin]] بياخدوا file descriptor. هنا [[printf]] جوه الـ C راح لـ [[out.txt]] بدل الترمنال (التمرين التاني).

---

## ٧. برا Node

نفس [[wcat.wasm]] بيشتغل على أي runtime بيدعم WASI preview1 من غير compile تاني (من docs بتاعة wasmtime):

~~~bash
wasmtime run --dir ./data::/data wcat.wasm /data/note.txt
~~~

[[--dir ./data::/data]] هي نفس فكرة [[preopens]]. و WASI 0.2 (preview2) الجديد فيه sockets و HTTP مبني على الـ Component Model، وشغال في wasmtime، و [[node:wasi]] لسه preview1 بس.

---

## الخلاصة

| | [[-nostdlib]] (درس «wasm من C») | WASI |
|---|---|---|
| مكتبة C | مفيش، كل حاجة بإيدك | [[wasi-libc]]: [[printf]] و [[fopen]] شغالين |
| الحجم هنا | 722 byte | حوالي 33KB |
| بيتشغّل إزاي | [[instance.exports.add(...)]] | [[wasi.start(instance)]] بينادي [[main]] |
| الملفات | مفيش | جوه [[preopens]] بس |
| يشتغل فين | أي مكان فيه JS | Node و wasmtime و wasmer وغيرهم |

- [[version: "preview1"]] و [[getImportObject()]] إجباريين.
- البيئة مش بتتورّث، والفولدرات لازم تتفتح بالاسم.
- [[start]] مرة واحدة لكل instance.`,
          sol: R`الناتج الحقيقي (Node 24.22.1، [[wcat.wasm]] 33577 byte):
[[node run.mjs]] طبع [[hi sara, reading /data/note.txt]] والسطرين و [[exit code: 0]].
[[/data/../run.mjs]]: [[fopen: Capabilities insufficient]] و [[exit code: 2]]، لأن البرنامج حاول يطلع برا الفولدر اللي اتفتحله.
[[/etc/passwd]]: [[fopen: No such file or directory]]، لأن مفيش أي مسار بالنسبة له غير [[/data]].
ومع [[preopens: {}]] حتى [[/data/note.txt]] بقت [[No such file or directory]]. وفي أول تشغيل Node طبع [[ExperimentalWarning: WASI is an experimental feature and might change at any time]].`
        },
        {
          cmd: "wasm يستاهل إمتى",
          title: "WebAssembly أسرع من JavaScript؟ قياس حقيقي",
          ref: [
            { t: "MDN: WebAssembly concepts", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Concepts" },
            { t: "MDN: WebAssembly.Memory", url: "https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory" },
          ],
          pre: [
            { to: "js/memory leaks", why: R`القياس الصح (warm-up وأكتر من تشغيلة) بيتشرح في وحدة الأداء` },
          ],
          desc: R`مش دايمًا. JavaScript في V8 بيتعمله JIT، فلوب أرقام بسيط بيبقى قريب من wasm جدًا. وكل نداء من JS لـ wasm ليه تمن، فدالة صغيرة بتتنادى ملايين المرات بتبقى **أبطأ** في wasm. الفرق الحقيقي بيظهر في الشغل الكبير على bytes و SIMD (عملية واحدة على كذا رقم مع بعض)، وفي إنك تستخدم مكتبة C أو Rust جاهزة.

المثال بيقيس الحالتين الأولانيين على Node 24.`,
          example: R`import { readFile } from "node:fs/promises";
const { instance } = await WebAssembly.instantiate(await readFile("sum.wasm"));
const wasm = instance.exports;
function countPrimesJS(limit) {
  let count = 0;
  for (let n = 2; n < limit; n++) {
    let prime = 1;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) { prime = 0; break; }
    }
    count += prime;
  }
  return count;
}
function time(label, fn) {
  fn();
  const t = performance.now();
  const r = fn();
  console.log(label.padEnd(26), String(r).padStart(9), (performance.now() - t).toFixed(1).padStart(7), "ms");
}
time("JS   countPrimes(5e6)", () => countPrimesJS(5_000_000));
time("wasm count_primes(5e6)", () => wasm.count_primes(5_000_000));
const jsAdd = (a, b) => (a + b) | 0;
time("JS   add x 10M", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = jsAdd(s, 1); return s; });
time("wasm add x 10M", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = wasm.add(s, 1); return s; });`,
          try: R`خد [[sum.wasm]] من درس [[wasm من C]] وشغّل المثال [[bench.mjs]] مرتين بـ [[node bench.mjs]]. مين كسب في الأولية؟ وفي [[add]]؟ وبعدين قيس حاجة على bytes كبيرة (زي تفتيح 32MB «بكسلات») في JS وفي C عادي وفي C بـ [[-msimd128]].`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** زوّد في C دالة [[add_many(int n)]] بتعمل اللوب كلها جوه wasm ([[s = add(s, 1)]] عشر مليون مرة)، وقيسها بـ [[time]] اللي في المثال جنب ١٠ مليون نداء [[wasm.add]] من JS.`, done: R`عندك رقمين بالـ ms بعد الـ warm-up، والناتجين [[10000000]]، وكاتب جملة بتقول مين كسب وليه (كل نداء من JS لـ wasm ليه تمن).`, sol: R`اتجرّب في Node 24.22 على ويندوز، و [[sum.wasm]] اتعمله compile بـ clang 22 ([[@yowasp/clang]]) بـ [[-O2]] زي الدرس. الأرقام بتتغيّر من جهاز لجهاز، والمهم النسبة.

**الإضافة في [[sum.c]]:**

~~~text sum.c (الإضافة)
EXPORT("add_many")
int add_many(int n) {
  int s = 0;
  for (int i = 0; i < n; i++) s = add(s, 1);
  return s;
}
__attribute__((noinline)) static int add_ni(int a, int b) { return a + b; }
EXPORT("add_many_calls")
int add_many_calls(int n) {
  int s = 0;
  for (int i = 0; i < n; i++) s = add_ni(s, 1);
  return s;
}
~~~

~~~js d0.mjs
// d0.mjs: ١٠ مليون نداء من JS لـ wasm، قدام لوب كاملة جوه wasm
import { readFile } from "node:fs/promises";
const { instance } = await WebAssembly.instantiate(await readFile("sum.wasm"));
const wasm = instance.exports;

function time(label, fn) {
  fn();
  const t = performance.now();
  const r = fn();
  console.log(label.padEnd(28), String(r).padStart(10), (performance.now() - t).toFixed(1).padStart(7), "ms");
}
time("wasm add x 10M (from JS)", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = wasm.add(s, 1); return s; });
time("wasm add_many(10M)", () => wasm.add_many(1e7));
time("wasm add_many_calls(10M)", () => wasm.add_many_calls(1e7));
time("wasm add_many(1e9)", () => wasm.add_many(1e9));
~~~

~~~text node d0.mjs (مرتين)
wasm add x 10M (from JS)       10000000    31.0 ms
wasm add_many(10M)             10000000     0.0 ms
wasm add_many_calls(10M)       10000000     2.4 ms
wasm add_many(1e9)           1000000000     0.0 ms

wasm add x 10M (from JS)       10000000    29.7 ms
wasm add_many(10M)             10000000     0.0 ms
wasm add_many_calls(10M)       10000000     2.4 ms
wasm add_many(1e9)           1000000000     0.0 ms
~~~

**المفاجأة: [[add_many]] أخدت 0.0 ms حتى مع مليار.** فتحت الـ [[.wasm]] بـ [[wasm-dis]] (من binaryen، بييجي مع AssemblyScript):

~~~text wasm-dis sum.wasm (جزء)
(func $add_many (param $0 i32) (result i32)
 (select
  (local.get $0)
  (i32.const 0)
  (i32.gt_s
   (local.get $0)
   (i32.const 0)
  )
 )
)
~~~

clang بـ [[-O2]] فهم إن اللوب بتجمع واحد [[n]] مرة، فشالها خالص وكتب «لو [[n > 0]] رجّع [[n]]، وإلا صفر». يعني القياس ده مش بيقيس لوب أصلًا. عشان كده زوّدت [[add_many_calls]]: [[noinline]] بيمنع clang يدمج الدالة جوه اللوب، فالـ ١٠ مليون نداء موجودين فعلًا في الـ wasm.

**مين كسب وليه:** نفس الـ ١٠ مليون نداء جوه wasm أخدوا 2.4 ms، ومن JS أخدوا حوالي 30 ms، يعني أبطأ حوالي ١٢ مرة. كل نداء من JS لـ wasm بيعدّي حدود بين العالمين (تحويل الـ arguments لـ [[i32]] والرجوع)، والتمن ده بيتدفع ١٠ مليون مرة. الدرس: ابعت للـ wasm شغل كبير في نداء واحد، مش نداءات صغيرة كتير.

**الغلطة الشائعة:** تصدّق رقم 0.0 ms وتقول «wasm أسرع مليون مرة». لما رقم يطلع أحلى من المعقول، بص على الكود اللي اتعمله compile، أو غيّر المدخل وشوف الوقت بيتغيّر ولا لأ (مليار وعشرة مليون أخدوا نفس الصفر).` },
            { lvl: 'تطبيق', t: R`**refactor:** [[time(label, fn)]] بتقيس مرة واحدة بس. خليها [[bench(label, fn, runs = 7)]]: warm-up مرة، وبعدين ٧ قياسات، وتطبع الأقل والوسيط (median)، من غير ما تغيّر أي سطر في الدوال اللي بتتقاس.`, done: R`كل سطر بيطبع الاسم والناتج والأقل والوسيط، والـ warm-up مش داخل في الحساب، ولما تشغّل مرتين الوسيط بيبقى قريب أكتر من القياس الواحد القديم.`, sol: R`~~~js bench.mjs
// bench.mjs: نفس الدوال اللي بتتقاس في الدرس، والقياس بقى bench بدل time
import { readFile } from "node:fs/promises";
const { instance } = await WebAssembly.instantiate(await readFile("sum.wasm"));
const wasm = instance.exports;
function countPrimesJS(limit) {
  let count = 0;
  for (let n = 2; n < limit; n++) {
    let prime = 1;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) { prime = 0; break; }
    }
    count += prime;
  }
  return count;
}
function bench(label, fn, runs = 7) {
  fn(); // warm-up: مش داخل في الحساب
  const times = [];
  let r;
  for (let i = 0; i < runs; i++) {
    const t = performance.now();
    r = fn();
    times.push(performance.now() - t);
  }
  times.sort((a, b) => a - b);
  const median = times[Math.floor(runs / 2)];
  console.log(label.padEnd(26), String(r).padStart(9), "min", times[0].toFixed(1).padStart(6), "ms | median", median.toFixed(1).padStart(6), "ms");
  return { label, result: r, min: times[0], median };
}
bench("JS   countPrimes(5e6)", () => countPrimesJS(5_000_000));
bench("wasm count_primes(5e6)", () => wasm.count_primes(5_000_000));
const jsAdd = (a, b) => (a + b) | 0;
bench("JS   add x 10M", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = jsAdd(s, 1); return s; });
bench("wasm add x 10M", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = wasm.add(s, 1); return s; });
~~~

~~~text node bench.mjs (مرتين، Node 24.22)
JS   countPrimes(5e6)         348513 min  901.7 ms | median  907.3 ms
wasm count_primes(5e6)        348513 min  890.1 ms | median  892.1 ms
JS   add x 10M              10000000 min    2.5 ms | median    2.6 ms
wasm add x 10M              10000000 min   31.3 ms | median   31.5 ms

JS   countPrimes(5e6)         348513 min  904.1 ms | median  912.9 ms
wasm count_primes(5e6)        348513 min  903.5 ms | median  913.9 ms
JS   add x 10M              10000000 min    2.6 ms | median    2.6 ms
wasm add x 10M              10000000 min   28.0 ms | median   28.5 ms
~~~

**وللمقارنة، [[time]] القديمة (قياس واحد) ٣ مرات:**

~~~text node time.mjs (٣ مرات)
JS   countPrimes(5e6)         348513   925.4 ms
wasm count_primes(5e6)        348513   889.1 ms

JS   countPrimes(5e6)         348513   902.1 ms
wasm count_primes(5e6)        348513   901.9 ms

JS   countPrimes(5e6)         348513   924.6 ms
wasm count_primes(5e6)        348513   892.9 ms
~~~

- **[[fn()]] الأولى برة الحساب:** أول نداء بيدفع تمن الـ JIT (V8 بيترجم الدالة بنسخة سريعة بعد ما تتنادى كام مرة)، فلو دخل في الحساب كان هيرفع الرقم.
- **[[times.sort((a, b) => a - b)]]:** ترتيب أرقام (من غير الـ comparator [[sort]] بيرتّب كنصوص: [["10" < "9"]]).
- **الوسيط [[times[Math.floor(runs / 2)]]]:** مع ٧ قياسات = القياس الرابع بعد الترتيب. الوسيط مبيتأثرش بقياس واحد شاذ (مثلًا الـ garbage collector اشتغل في النص)، عكس المتوسط.
- **الأقل [[times[0]]]:** أحسن حالة الجهاز قدر عليها، وبيبيّن الحد اللي الكود ميقدرش ينزل تحته.
- **الدوال اللي بتتقاس متغيّرتش:** [[countPrimesJS]] و [[jsAdd]] واللوبات نفسها زي الدرس بالظبط. اللي اتغيّر الدالة اللي بتقيس بس، وبترجّع object عشان تقدر تستخدم الأرقام بعدين (المشروع اللي بيعمل تقرير).

**النتيجة بالأرقام:** القياس الواحد كان بيقول مرتين من تلاتة إن wasm أسرع بحوالي 30 ms (3%)، ومرة إنهم زي بعض. الوسيط في التشغيلتين قال إنهم متساويين تقريبًا (907 قدام 892، وبعدين 913 قدام 914). يعني الـ 3% دي كانت تذبذب مش فرق حقيقي. و [[add]] من JS أبطأ حوالي ١١ مرة في الحالتين، والوسيط ثابت تقريبًا بين التشغيلتين (31.5 و 28.5).

**الغلطة الشائعة:** تحط الـ warm-up جوه اللفة وتحسبه، أو تاخد المتوسط، فقياس واحد بطيء بيبوّظ الرقم كله.` },
            { lvl: 'تحدي', t: R`**اشرحها بأرقام:** في تلات حالات (تكبير حروف نص ١٠ حروف مرة واحدة، وفلتر على صورة 32MB، وجمع رقمين في لوب) قرر wasm يستاهل ولا لأ، وقيس الحالة التانية **ومعاها** وقت نسخ الـ bytes للـ [[memory]] ورجوعها.`, done: R`عندك جدول: لكل حالة قرارك وسببه في سطر، وللصورة ٣ أرقام (JS، و wasm من غير النسخ، و wasm بالنسخ رايح جاي)، وجملة بتقول القرار اتغيّر ولا لأ لما حسبت النسخ.`, sol: R`اتقاس في Node 24.22 على ويندوز ([[text.wasm]] من درس «WebAssembly في المتصفح»، و [[sum.wasm]] من «wasm من C»، و [[img.wasm]] جديد تحت). الأرقام بتتغيّر من جهاز لجهاز، والقرار مبني على النسبة.

~~~text img.c
// img.c: فلتر رمادي على صورة RGBA جوه ذاكرة الـ wasm
#define EXPORT(name) __attribute__((export_name(name)))
extern unsigned char __heap_base;

// بتكبّر الذاكرة لحد ما bytes تكفي بعد __heap_base، وبترجّع المكان (أو 0 لو فشلت)
EXPORT("alloc") unsigned char *alloc(int bytes) {
  unsigned long need = (unsigned long)&__heap_base + (unsigned long)bytes;
  unsigned long have = __builtin_wasm_memory_size(0) * 65536UL;
  if (need > have && __builtin_wasm_memory_grow(0, (need - have + 65535) / 65536) == -1) return 0;
  return &__heap_base;
}

EXPORT("grayscale") void grayscale(unsigned char *p, int len) {
  for (int i = 0; i < len; i += 4) {
    unsigned char g = (p[i] * 77 + p[i + 1] * 150 + p[i + 2] * 29) >> 8;
    p[i] = p[i + 1] = p[i + 2] = g;
  }
}
~~~

~~~js decide.mjs
// decide.mjs: ٣ حالات، ونشوف wasm يستاهل ولا لأ بالأرقام
import { readFile } from "node:fs/promises";

function bench(label, fn, runs = 7) {
  fn();
  const times = [];
  let r;
  for (let i = 0; i < runs; i++) {
    const t = performance.now();
    r = fn();
    times.push(performance.now() - t);
  }
  times.sort((a, b) => a - b);
  const median = times[Math.floor(runs / 2)];
  console.log(label.padEnd(34), "median", median.toFixed(3).padStart(8), "ms");
  return { r, median };
}

// ١) تكبير حروف نص ١٠ حروف (مرة واحدة = بنقيس ١٠٠ ألف مرة ونقسم)
let changed = 0;
const text = (await WebAssembly.instantiate(await readFile("text.wasm"), { env: { log_count: (n) => (changed = n) } })).instance.exports;
const enc = new TextEncoder(), dec = new TextDecoder();
function toUpperWasm(s) {
  const bytes = enc.encode(s);
  new Uint8Array(text.memory.buffer, text.buf_ptr(), bytes.length).set(bytes);
  return dec.decode(new Uint8Array(text.memory.buffer, text.buf_ptr(), text.upper(bytes.length)));
}
const N = 100_000;
const words = Array.from({ length: 1000 }, (_, i) => ("word" + i).padEnd(10, "x")); // نصوص مختلفة عشان V8 ميحسبهاش مرة واحدة
const a = bench("1) JS   toUpperCase x 100k", () => { let out = ""; for (let i = 0; i < N; i++) out = words[i % 1000].toUpperCase(); return out; });
const b = bench("1) wasm upper x 100k (+encode/decode)", () => { let out = ""; for (let i = 0; i < N; i++) out = toUpperWasm(words[i % 1000]); return out; });
console.log($__bt   per call: JS $__{(a.median / N * 1e6).toFixed(0)} ns, wasm $__{(b.median / N * 1e6).toFixed(0)} ns, same result: $__{a.r === b.r} ($__{a.r})$__bt);

// ٢) فلتر رمادي على صورة 32MB (4096 × 2048 × 4 bytes)
const LEN = 4096 * 2048 * 4;
const src = new Uint8Array(LEN);
let x = 1;
for (let i = 0; i < LEN; i++) { x = (x * 1103515245 + 12345) >>> 0; src[i] = x >>> 24; }
function grayJS(p) {
  for (let i = 0; i < p.length; i += 4) {
    const g = (p[i] * 77 + p[i + 1] * 150 + p[i + 2] * 29) >> 8;
    p[i] = p[i + 1] = p[i + 2] = g;
  }
  return p;
}
const img = (await WebAssembly.instantiate(await readFile("img.wasm"))).instance.exports;
const ptr = img.alloc(LEN);
console.log("2) image:", LEN / 1024 / 1024, "MB | wasm memory now", img.memory.buffer.byteLength / 1024 / 1024, "MB");
const jsCopy = src.slice();
const t1 = bench("2) JS   grayscale", () => grayJS(jsCopy));
const mem = () => new Uint8Array(img.memory.buffer, ptr, LEN);
mem().set(src);
const t2 = bench("2) wasm grayscale (data already in)", () => { img.grayscale(ptr, LEN); return 0; });
const t3 = bench("2) wasm copy in + grayscale + copy out", () => { mem().set(src); img.grayscale(ptr, LEN); return mem().slice(); });
const t0 = bench("2) just the two copies", () => { mem().set(src); return mem().slice(); });
const same = Buffer.compare(grayJS(src.slice()), t3.r) === 0;
console.log($__bt   same pixels JS vs wasm: $__{same}$__bt);

// ٣) جمع رقمين في لوب
const sum = (await WebAssembly.instantiate(await readFile("sum.wasm"))).instance.exports;
const jsAdd = (p, q) => (p + q) | 0;
bench("3) JS   add x 10M", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = jsAdd(s, 1); return s; });
bench("3) wasm add x 10M (from JS)", () => { let s = 0; for (let i = 0; i < 1e7; i++) s = sum.add(s, 1); return s; });
~~~

~~~text node decide.mjs (التشغيلة الأولى)
1) JS   toUpperCase x 100k         median    3.060 ms
1) wasm upper x 100k (+encode/decode) median   56.227 ms
   per call: JS 31 ns, wasm 562 ns, same result: true (WORD999XXX)
2) image: 32 MB | wasm memory now 32.0625 MB
2) JS   grayscale                  median   14.744 ms
2) wasm grayscale (data already in) median   12.815 ms
2) wasm copy in + grayscale + copy out median   19.024 ms
2) just the two copies             median    6.055 ms
   same pixels JS vs wasm: true
3) JS   add x 10M                  median    2.565 ms
3) wasm add x 10M (from JS)        median   30.329 ms
~~~

(التشغيلة التانية: نفس الأرقام تقريبًا: 2.9 و 55.0، و 14.7 و 12.8 و 20.0 و 6.0، و 2.6 و 30.8.)

| الحالة | القرار | ليه، في سطر |
|---|---|---|
| تكبير حروف نص ١٠ حروف مرة واحدة | **JS** | [[toUpperCase]] حوالي 30 ns، والـ wasm حوالي 560 ns: التحويل لـ bytes والنسخ والنداء أغلى ١٨ مرة من الشغل نفسه |
| فلتر على صورة 32MB | **حسب الداتا فين** | wasm لوحده 12.8 ms قدام JS 14.7 (أسرع 13%)، بس بالنسخ رايح جاي 19.0 ms، يعني أبطأ من JS بـ 29% |
| جمع رقمين في لوب من JS | **JS** | 2.6 ms قدام 30.3 ms: كل نداء بيعدّي الحدود، والجمع نفسه أرخص من العدّية |

**أرقام الصورة الـ ٣:** JS 14.7 ms، و wasm من غير نسخ 12.8 ms، و wasm بالنسخ رايح جاي 19.0 ms (والنسختين لوحدهم 6.1 ms).

**القرار اتغيّر لما حسبت النسخ؟** آه. من غير النسخ wasm كسب، وبالنسخ خسر. wasm يستاهل هنا بس لو الصورة **بتعيش** في ذاكرة الـ wasm: تتكتب فيها مرة (مثلًا من decoder مكتوب في C أو من الـ canvas)، وتعدّي عليها فلاتر كتير ورا بعض، وترجع مرة في الآخر. ساعتها الـ 6 ms بتتدفع مرة واحدة على كل الفلاتر.

- **[[alloc(bytes)]] في الـ C:** من غير مكتبة C مفيش [[malloc]]، فالدالة بتكبّر الذاكرة بـ [[__builtin_wasm_memory_grow]] لحد ما الصورة تكفي، وبترجّع [[__heap_base]] (أول مكان فاضي بعد داتا البرنامج، الـ linker بيحدده). الذاكرة بقت 32.06 MB.
- **[[const mem = () => new Uint8Array(img.memory.buffer, ptr, LEN)]] دالة مش متغير:** لو الذاكرة كبرت بعد ما عملت الـ view، الـ [[ArrayBuffer]] القديم بيبقى detached (طوله صفر) والـ view بايظ. فبنعمل view جديد كل مرة.
- **[[same pixels JS vs wasm: true]]:** الاتنين نفس المعادلة بالظبط ([[(r*77 + g*150 + b*29) >> 8]])، و [[Buffer.compare]] بيقارن الـ 32MB byte byte. من غير الفحص ده ممكن تقيس كود أسرع بيطلّع ناتج غلط.
- **[[words[i % 1000]]] بدل نص ثابت:** أول نسخة كانت بتكبّر [["hello wasm"]] نفسه ١٠٠ ألف مرة وطلعت 0.026 ms، يعني 0.26 ns للنداء، وده مستحيل: V8 حسبها مرة واحدة. بنصوص مختلفة الرقم بقى 3 ms (30 ns) وده المعقول.
- **أول نسخة كمان كانت ظالمة لـ JS:** القياس كان فيه [[jsCopy.set(src)]] (نسخة 32MB) جوه الدالة اللي بتتقاس، فـ JS طلع 17.1 ms. شلت النسخة عشان الاتنين يتقاسوا على داتا موجودة.

**الغلطة الشائعة:** تقيس الـ wasm على داتا موجودة في الذاكرة وتنسى إن الداتا الحقيقية جاية من JS ورايحة لـ JS. القياس اللي يهم هو الرحلة كلها.` },
          ],
          flag: "script",
          deep: {
            why: R`ناس كتير بتفتكر «wasm = أسرع»، فتنقل كود عادي لـ Rust/wasm وتتعب وفي الآخر مفيش فرق، أو يبقى أبطأ. القرار لازم يبقى بقياس على شغلك انت.`,
            how: R`V8 بيراقب الكود الـ JS وهو شغال، ولو لاقى دالة سخنة بأنواع ثابتة (أرقام صحيحة دايمًا) بيعملها compile لكود معالج قريب من C. فلوب [[countPrimes]] بيتحول تقريبًا لنفس الكود اللي clang طلّعه.

النداء من JS لـ wasm بيعدّي «حدود»: تحويل الـ arguments، وتغيير الـ context. ده رخيص بس مش ببلاش، فلما الدالة نفسها تافهة ([[add]]) التمن ده بيبقى هو كل الوقت. وفي JS الـ JIT بيعمل inline لـ [[jsAdd]] (بيحط جسمها مكان النداء) فبتختفي.

wasm بيكسب: لما الشغل كتير جوه نداء واحد، وعلى bytes و typed arrays، ولما الـ compiler يقدر يستخدم SIMD (128-bit: 16 byte مع بعض في تعليمة واحدة)، ولما الأداء لازم يبقى ثابت (مفيش «JIT لسه ماسخنش» ولا deopt). وأكبر سبب عملي: كود C/C++/Rust موجود (SQLite و ffmpeg و image codecs و PGlite اللي الموقع ده بيستخدمه لتمارين SQL).`,
            when: R`استخدمه: مكتبة native جاهزة، أو شغل تقيل على bytes/صور/صوت، أو SIMD، أو نفس الكود محتاجه في المتصفح والسيرفر والموبايل. متستخدموش: كود بيكلم DOM أو JSON أو الشبكة، أو دوال صغيرة بتتنادى كتير من JS.`,
            mistakes: R`تقيس مرة واحدة من غير تسخين (أول تشغيل فيه compile). وتقيس دالة فاضية وتحكم. وتنسى إن تحويل الداتا (نصوص ← memory ← نصوص) بياكل الفرق. وتشحن wasm 2MB عشان توفّر 10ms: التنزيل والـ compile أغلى.`
          },
          teach: R`## القياس

[[sum.wasm]] هو بتاع درس [[wasm من C]] (clang [[-O2]]). اتشغّل بـ Node 24.22 على ويندوز (Ryzen 9 5900HX)، مرتين.

---

## ١. [[time(label, fn)]]

- [[fn();]] الأول: تسخين. أول نداء فيه compile و JIT، فمش بنحسبه.
- [[performance.now()]] قبل وبعد التاني: الوقت بالـ ms بكسور.
- [[padEnd(26)]] و [[padStart(9)]]: يكمّلوا بمسافات عشان الأعمدة تتصف.

## ٢. الأعداد الأولية تحت ٥ مليون

نفس الخوارزمية بالظبط في JS ([[countPrimesJS]]) و C ([[count_primes]]). [[5_000_000]]: الـ [[_]] بيفصل الأرقام للقراية بس.

## ٣. [[add]] عشرة مليون مرة

- [[(a + b) | 0]]: [[| 0]] بيحوّل الناتج لـ int 32-bit زي الـ C، عشان المقارنة تبقى عادلة.
- كل لفة نداء واحد: من JS لـ JS، أو من JS لـ wasm.

---

## النتيجة

~~~text node bench.mjs (المرة الأولى)
JS   countPrimes(5e6)         348513  1089.2 ms
wasm count_primes(5e6)        348513  1108.7 ms
JS   add x 10M              10000000     4.0 ms
wasm add x 10M              10000000    38.3 ms
~~~

~~~text node bench.mjs (المرة التانية)
JS   countPrimes(5e6)         348513  1164.5 ms
wasm count_primes(5e6)        348513   985.4 ms
JS   add x 10M              10000000     3.5 ms
wasm add x 10M              10000000    31.2 ms
~~~

| | JS | wasm | مين كسب |
|---|---|---|---|
| الأولية (شغل كتير في نداء واحد) | 1089 / 1164 ms | 1109 / 985 ms | **تعادل تقريبًا** (الفرق بين التشغيلتين أكبر من الفرق بينهم) |
| [[add]] × 10M (نداءات صغيرة) | 4.0 / 3.5 ms | 38.3 / 31.2 ms | **JS أسرع ~9 مرات** |

[[348513]]: عدد الأعداد الأولية تحت 5 مليون، نفس الرقم في الاتنين (الكود صح).

---

## ٤. حالة wasm بيكسب فيها: bytes و SIMD

قست دالة بتفتّح صورة: بتزوّد 1 على كل byte في 32MB (بحد أقصى 255). نفس الكود C اتعمله compile مرتين: عادي، ومرة بـ [[-O3 -msimd128]] (SIMD: تعليمة واحدة على 16 byte). والذاكرة واحدة بين التلاتة.

~~~text node bench2.mjs (مرتين)
JS   brightness 32MB        36.2 ms      40.6 ms
wasm brightness             23.2 ms      23.2 ms
wasm+SIMD brightness         8.0 ms       7.9 ms
~~~

| | الوقت | مقارنة بـ JS |
|---|---|---|
| JS ([[Uint8Array]]) | 36 لـ 41 ms | 1× |
| wasm عادي | 23 ms | أسرع ~1.7× |
| wasm + SIMD | 8 ms | **أسرع ~4.8×** |

هنا wasm كسب: شغل كبير على bytes في نداء واحد، و SIMD بيعمل 16 byte مرة واحدة. والرقم ثابت بين التشغيلتين (JS اتذبذب).

---

## ٥. wasm في Worker: الحساب التقيل من غير ما الصفحة تعلّق

الأعداد الأولية تحت ٥ مليون بتاخد ثانية. وفي الثانية دي، **لو اتنادت على الـ main thread، مفيش أي حاجة تانية بتشتغل**: ولا timer، ولا click، ولا رسم. wasm مش بيحل ده، لأنه بيشتغل على نفس الـ thread اللي ناداه. الحل إنك تنقله لـ Worker (درس «blocking و الـ main thread» في وحدة الـ event loop).

اتجرّب في Node بـ [[worker_threads]] و [[sum.wasm]] بتاع درس «wasm من C»:

~~~js worker.mjs
// worker.mjs: بيشغّل الـ wasm في thread لوحده
import { parentPort } from "node:worker_threads";
parentPort.on("message", async ({ module, limit }) => {
  const instance = await WebAssembly.instantiate(module);
  parentPort.postMessage(instance.exports.count_primes(limit));
});
~~~

~~~js main.mjs
import { readFile } from "node:fs/promises";
import { Worker } from "node:worker_threads";
const module = await WebAssembly.compile(await readFile("sum.wasm"));
let ticks = 0;
const timer = setInterval(() => ticks++, 100);
const t = performance.now();
const worker = new Worker(new URL("./worker.mjs", import.meta.url));
worker.postMessage({ module, limit: 5_000_000 });
worker.once("message", (count) => {
  console.log("worker:", count, "|", Math.round(performance.now() - t), "ms | ticks:", ticks);
  clearInterval(timer);
  worker.terminate();
});
~~~

~~~text node main.mjs (مرتين)، وبعدين نفس الحساب على الـ main thread (مرتين)
worker: 348513 | 1187 ms | ticks: 10
worker: 348513 | 1098 ms | ticks: 10
main thread: 348513 | 1028 ms | ticks: 0
main thread: 348513 | 1006 ms | ticks: 0
~~~

| السطر | معناه |
|---|---|
| [[ticks: 10]] مع الـ Worker | الـ timer اشتغل كل 100ms طول الحساب، يعني الـ main thread كان فاضي يرد على أي حاجة |
| [[ticks: 0]] من غيره | الحساب حجز الـ thread ثانية كاملة، والـ timer ما اشتغلش ولا مرة |
| الوقت | تقريبًا نفسه (حوالي ثانية)، والـ Worker بياخد شوية زيادة عشان يقوم. هو مش أسرع، هو **مش بيعلّق** |

- [[WebAssembly.compile]] مرة واحدة في الـ main thread، وبعدين [[postMessage({ module })]]: الـ [[WebAssembly.Module]] بيتبعت لـ Worker من غير ما يتعمله compile تاني (structured clone بيدعمه).
- [[instantiate(module)]] جوه الـ Worker: كل Worker لازم يعمل instance خاص بيه بذاكرة خاصة بيه. الذاكرة **مش** متشاركة إلا لو [[shared: true]] (تحت).
- [[worker.terminate()]]: من غيرها البروسيس مش هيخرج لأن الـ Worker لسه شغال ومستني رسايل.

### في المتصفح (من MDN)

~~~js worker.js
self.onmessage = async ({ data }) => {
  const { instance } = await WebAssembly.instantiateStreaming(fetch("sum.wasm"));
  self.postMessage(instance.exports.count_primes(data));
};
~~~

~~~js main.js
const worker = new Worker("worker.js", { type: "module" });
worker.onmessage = (e) => (document.querySelector("#out").textContent = e.data);
worker.postMessage(5_000_000);
~~~

نفس الفكرة: [[self]] مكان [[parentPort]]، و [[{ type: "module" }]] عشان [[import]] جوه الـ Worker. والـ Worker مالوش DOM، فالنتيجة بترجع بـ [[postMessage]] والـ main thread هو اللي بيكتبها في الصفحة.

### وذاكرة مشتركة بين كذا Worker

[[new WebAssembly.Memory({ initial: 1, maximum: 10, shared: true })]] بتعمل ذاكرة [[buffer]] بتاعها [[SharedArrayBuffer]]، فكذا Worker يشتغلوا على نفس الـ bytes. ده محتاج wasm اتعمله compile بـ threads ([[-pthread]] في Emscripten مثلًا)، وفي المتصفح الصفحة لازم تبقى cross-origin isolated (هيدرز [[Cross-Origin-Opener-Policy: same-origin]] و [[Cross-Origin-Embedder-Policy: require-corp]]). (من MDN، ماتجرّبش هنا.)

---

## ٦. Rust و wasm-pack (من الـ docs، ماتجرّبش هنا)

لو مكتبتك Rust، الطريق المعتاد هو [[wasm-pack]] و [[wasm-bindgen]]: نفس فكرة bindings بتاعة AssemblyScript (درس «AssemblyScript»)، بس لـ Rust.

~~~text src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
~~~

~~~bash
cargo install wasm-pack
wasm-pack build --target web
~~~

| الحتة | معناها |
|---|---|
| [[wasm_bindgen]] | العلامة اللي فوق الدالة في الكود: اعمل لها غلاف JS بيحوّل [[&str]] و [[String]] لنصوص JS، زي [[__lowerString]] و [[__liftString]] |
| [[--target web]] | الناتج ES module للمتصفح. وفيه [[--target nodejs]] لـ Node، و [[--target bundler]] لـ Vite و webpack |
| الناتج | فولدر [[pkg/]] فيه [[.wasm]] وملف JS و [[.d.ts]] و [[package.json]]، تعمله [[import]] أو تنشره على npm |

وفي [[Cargo.toml]] لازم السطرين دول عشان Rust يطلّع wasm مكتبة:

~~~text Cargo.toml
[lib]
crate-type = ["cdylib"]
~~~

 ولـ WASI من غير JS خالص: [[rustup target add wasm32-wasip1]] و [[cargo build --target wasm32-wasip1]]، والناتج بيشتغل بـ [[node:wasi]] زي درس «WASI و node:wasi».

| | C + clang | AssemblyScript | Rust + wasm-pack |
|---|---|---|---|
| النصوص | بإيدك في [[memory]] | الـ bindings | [[wasm-bindgen]] |
| التسطيب | Docker أو clang | [[npm i]] | [[rustup]] و [[cargo]] |
| بيستاهل لما | عندك كود C جاهز | انت مطوّر TS وعايز حتة سريعة | مكتبة Rust جاهزة، أو مشروع wasm كبير |

---

## الخلاصة

| الحالة | wasm يستاهل؟ |
|---|---|
| مكتبة C/C++/Rust جاهزة (SQLite، ffmpeg، codecs) | **آه**: ده أكبر سبب |
| شغل كبير على bytes / صور / صوت، خصوصًا مع SIMD | آه (هنا 4.8×) |
| لوب أرقام عادي | غالبًا لأ (تعادل) |
| دوال صغيرة بتتنادى كتير من JS | لأ (هنا أبطأ 9×) |
| DOM و JSON و الشبكة | لأ |

قيس على شغلك انت، مع تسخين، وأكتر من مرة.`,
          lines: [
            R`[[readFile]] من نسخة الـ promises في [[node:fs]]، عشان نقرا ملف الـ [[.wasm]] من الديسك بـ [[await]]. في Node بنقرا الـ bytes كلها الأول، وبعدين ندّيها لـ WebAssembly.`,
            R`[[readFile]] بيرجّع Buffer فيه bytes الملف، و [[WebAssembly.instantiate]] بيعمل compile و instance مرة واحدة. مفيش imports هنا لأن [[sum.wasm]] مبيناديش أي دالة من JS. و [[await]] برّه أي دالة شغالة لأن الملف [[.mjs]] (ES module).`,
            R`[[exports]] فيه الدوال اللي اتصدّرت من الـ C زي [[add]] و [[count_primes]]. بنحطه في اسم قصير عشان سطور القياس تحت.`,
            R`نفس خوارزمية [[count_primes]] اللي في الـ C سطر بسطر، بـ JS. لازم الاتنين يعملوا نفس الشغل بالظبط، وإلا المقارنة ملهاش معنى.`,
            R`العدّاد. V8 بيلاحظ إن الأرقام في اللوب ده صحيحة دايمًا فبيعمل لها كود محسّن، وده سبب إن JS بيقرّب من wasm هنا.`,
            R`بنجرّب كل رقم من 2 لحد قبل [[limit]]، بنفس حدود لفة الـ C بالظبط.`,
            R`بنفترض إنه أولي، وبنستخدم [[1]] و [[0]] مش [[true]] و [[false]] عشان نقلّد الـ C، ونقدر نجمعه على العدّاد تحت.`,
            R`القواسم من 2 لحد الجذر التربيعي ([[d * d <= n]])، نفس الحيلة اللي بتوفّر معظم الشغل.`,
            R`لو اتقسم من غير باقي يبقى مش أولي، و [[break]] تخرج من لفة القواسم. هنا [[===]] بدل [[==]] بتاع C، والنتيجة واحدة لأن الاتنين أرقام.`,
            R`نهاية لفة القواسم.`,
            R`بنزوّد [[prime]] (1 أو 0) على العدّاد من غير [[if]]، زي الـ C.`,
            R`نهاية لفة الأرقام.`,
            R`بنرجّع العدد، وده اللي بيتطبع جنب الوقت عشان نتأكد إن JS و wasm طلّعوا نفس الناتج.`,
            R`نهاية [[countPrimesJS]].`,
            R`دالة قياس صغيرة: بتاخد اسم يتطبع، ودالة فيها الشغل اللي هنقيسه.`,
            R`تشغيل تسخين مش محسوب: أول مرة V8 بيشغّل الكود ببطء وبعدين بيعمله JIT، والـ wasm كمان ممكن يتعمله compile أحسن بعد أول استخدام. من غير التسخين هتقيس وقت الـ compile مش وقت الشغل.`,
            R`[[performance.now()]] بترجّع الوقت بالـ milliseconds وبكسور، أدق من [[Date.now()]] اللي بالـ ms الصحيحة بس. ده لحظة البداية.`,
            R`التشغيل اللي بنقيسه فعلًا، وبنحفظ الناتج في [[r]] عشان نطبعه. استخدام الناتج مهم: الـ JIT ممكن يشيل شغل نتيجته مش مستخدمة، والقياس يطلع أسرع من الحقيقة.`,
            R`بيطبع سطر واحد: [[padEnd]] و [[padStart]] بيكمّلوا بمسافات عشان الأعمدة تبقى تحت بعض، و [[toFixed(1)]] بيقرّب الوقت لرقم عشري واحد. والطرح من [[t]] هو المدة.`,
            R`نهاية [[time]].`,
            R`بيقيس [[countPrimesJS]] على ٥ مليون. الـ [[_]] في [[5_000_000]] للقراية بس، و JavaScript بيتجاهلها.`,
            R`نفس الشغل بـ wasm: نداء واحد بس من JS، وكل اللف جوه الـ wasm. هنا بيبان فرق السرعة الحقيقي بين الاتنين، وهو عادة صغير لأن JS متعمله JIT.`,
            R`نسخة JS من [[add]]. الـ [[| 0]] بيحوّل الناتج لرقم صحيح 32-bit زي [[int]] في C، فالدالتين يعملوا نفس الحاجة بالظبط حتى لو الرقم كبر.`,
            R`عشرة مليون نداء من JS لدالة JS صغيرة. V8 غالبًا بيدخّل [[jsAdd]] جوه اللوب نفسه (inlining)، فالنداء بيبقى شبه ببلاش.`,
            R`نفس العشرة مليون نداء بس لـ [[wasm.add]]: كل نداء بيعدّي الحدود بين JS و wasm وليه تمن، فالنسخة دي غالبًا **أبطأ** مع إن الدالة نفسها أبسط حاجة. الدرس: wasm بيكسب في شغل كبير جوه نداء واحد، مش في دوال صغيرة بتتنادى ملايين المرات.`,
          ],
          sol: R`الناتج الحقيقي (Node 24.22، مرتين):
الأولية: JS [[1089.2 ms]] و [[1164.5 ms]]، wasm [[1108.7 ms]] و [[985.4 ms]]: تعادل.
[[add]] × 10M: JS [[4.0 ms]] و [[3.5 ms]]، wasm [[38.3 ms]] و [[31.2 ms]]: JS أسرع ~9 مرات بسبب تمن النداء.
وتفتيح 32MB: JS حوالي 36 لـ 41 ms، و wasm عادي 23 ms، و wasm بـ [[-msimd128]] حوالي 8 ms.`
        }
      ]
    }
]);
