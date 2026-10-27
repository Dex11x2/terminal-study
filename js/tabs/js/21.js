// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "WebAssembly",
      l: 3,
      n: "كود C أو AssemblyScript بيتحول ملف .wasm يشتغل في المتصفح و Node: تعمله compile، وتحمّله من JS، وتعدّي داتا في الذاكرة، وتعرف إمتى يستاهل",
      items: [
        {
          cmd: "wasm من C",
          title: "تحوّل C لـ .wasm بـ clang في Docker وتناديه من Node",
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
            R`macro بيختصر [[export_name]]: صدّر الدالة دي لـ JS بالاسم ده.`,
            R`صدّر [[add]].`,
            R`جمع رقمين [[i32]].`,
            R`buffer ثابت جوه ذاكرة الـ wasm (1024 [[int]]).`,
            R`صدّر [[buffer_ptr]].`,
            R`رجّع عنوان الـ buffer عشان JS يكتب فيه.`,
            R`صدّر [[sum_array]].`,
            R`بتاخد عنوان وطول، وبترجّع [[long long]] (BigInt في JS).`,
            R`المجموع 64-bit.`,
            R`اجمع.`,
            R`رجّعه.`,
            R`قفلة.`,
            R`صدّر [[count_primes]].`,
            R`عدّ الأعداد الأولية تحت [[limit]].`,
            R`العدّاد.`,
            R`كل رقم من 2.`,
            R`افترض إنه أولي.`,
            R`جرّب القواسم لحد الجذر.`,
            R`اتقسم؟ مش أولي، واخرج.`,
            R`قفلة.`,
            R`زوّد لو أولي.`,
            R`قفلة.`,
            R`رجّع العدد.`,
            R`قفلة.`
          ],
          sol: R`الناتج الحقيقي ([[sum.wasm]] 722 byte، Node 24.22):
[[add(2, 3) = 5]]
[[ptr = 1024 | sum_array = 100n]]
النوع [[bigint]]: الدالة بترجّع [[long long]] (يعني [[i64]] في wasm)، و JavaScript بيستلم [[i64]] كـ BigInt. لو عايزه number: [[Number(sum_array(ptr, 4))]]، أو خلّي الدالة ترجّع [[int]] أو [[double]].`
        },
        {
          cmd: "WebAssembly في المتصفح",
          title: "تحمّل .wasm في المتصفح: instantiateStreaming و imports و نصوص في الذاكرة",
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

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| تحمّل في المتصفح | [[instantiateStreaming(fetch(url), imports)]] + [[application/wasm]] |
| wasm ينادي JS | [[imports.env.name]] ↔ [[import_module("env"), import_name("name")]] |
| نص من JS لـ wasm | [[TextEncoder]] ← اكتب في [[memory]] ← ابعت الطول |
| نص من wasm لـ JS | [[Uint8Array(memory.buffer, ptr, len)]] ← [[TextDecoder]] |`,
          lines: [
            R`الدوال اللي هندّيها للـ wasm.`,
            R`في module اسمه [[env]] (زي الـ C).`,
            R`[[log_count]]: الـ wasm بيناديها بعدد الحروف.`,
            R`قفلة [[env]].`,
            R`قفلة.`,
            R`نزّل واعمل compile وinstance مع بعض، وادّيله الـ imports.`,
            R`الذاكرة والدوال المصدّرة.`,
            R`دالة بتكبّر نص عن طريق الـ wasm.`,
            R`النص ← bytes بـ UTF-8.`,
            R`مكان الـ buffer جوه الذاكرة.`,
            R`اكتب الـ bytes هناك.`,
            R`الـ wasm يكبّر الحروف في مكانها.`,
            R`اقرا الناتج ورجّعه نص.`,
            R`قفلة.`,
            R`جرّب في الـ Console.`,
            R`وفي الصفحة.`
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
          try: R`في فولدر فاضي: [[npm i -D -E assemblyscript]] ثم [[npx asinit . -y]]. حط المثال في [[assembly/index.ts]] واعمل [[npm run asbuild]]. اعمل [[test.mjs]] بيعمل [[import { add, countPrimes, greet, sum } from "./build/release.js"]] ويناديهم، وجرّب [[add(2147483647, 1)]]. وبص على حجم [[build/release.wasm]] و [[build/release.js]].`,
          flag: "script",
          deep: {
            why: R`لو انت مطوّر JavaScript وعايز wasm لحتة حسابات، تعلّم C أو Rust كتير. AssemblyScript قريب من TypeScript اللي تعرفه، وبيتسطّب من npm، وبيكتب الـ glue code بتاع النصوص والـ arrays لوحده.`,
            how: R`الأنواع مش أنواع TypeScript: [[number]] مش موجود، بدله [[i32]] (صحيح 32-bit) و [[i64]] و [[f32]] و [[f64]] (عشري 64-bit زي number في JS) و [[u8]] وغيرهم. [[string]] و [[Array]] و [[Float64Array]] موجودين، بس بيتخزّنوا في ذاكرة الـ wasm ومعاهم garbage collector صغير جوه الـ wasm (فالملف أكبر من C).

[[asc assembly/index.ts --target release]] بيقرا [[asconfig.json]]: [[optimizeLevel: 3]]، و [["bindings": "esm"]] = اعمل [[release.js]] كـ ES module. ملف الـ bindings بيحمّل الـ [[.wasm]] (بـ [[fetch]] في المتصفح أو [[readFile]] في Node)، ولكل دالة فيها string أو typed array بيعمل غلاف: يكتب الـ argument في الذاكرة ([[__lowerString]])، ينادي، ويقرا الناتج ([[__liftString]]). والدوال اللي أرقام بس بيصدّرها زي ما هي.

[[==]] في AssemblyScript مقارنة عادية (مفيش coercion زي JS)، و [[i32]] بيعمل overflow زي C.`,
            when: R`حسابات أرقام أو bytes (ضغط، hashing، معالجة صور، فيزيا) وانت مش عايز تكتب C أو Rust. لو عندك مكتبة C أو Rust جاهزة، استخدمها هي بدل ما تعيد كتابتها.`,
            mistakes: R`تفتكره TypeScript: [[number]] و [[any]] و union types و closures بتلقط متغيرات مش مدعومين أو ليهم شروط. وتعمل [[import]] للـ [[.wasm]] مباشرة بدل [[release.js]] فتلاقي [[greet]] بترجّع رقم (pointer) مش نص. وتنسى إن [[i32]] بيلف: [[add(2147483647, 1)]] = [[-2147483648]].`
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
            R`دالة [[add]] بأنواع wasm.`,
            R`[[+]] عادي (بيلف لو عدّى [[i32]]).`,
            R`قفلة.`,
            R`عدّ الأعداد الأولية.`,
            R`العدّاد ([[i32]]).`,
            R`كل رقم من 2.`,
            R`افترض إنه أولي.`,
            R`القواسم لحد الجذر.`,
            R`اتقسم؟ مش أولي.`,
            R`قفلة.`,
            R`زوّد لو أولي.`,
            R`قفلة.`,
            R`رجّع العدد.`,
            R`قفلة.`,
            R`نص داخل ونص خارج.`,
            R`لزق النصوص.`,
            R`قفلة.`,
            R`typed array داخل و [[f64]] خارج.`,
            R`المجموع عشري.`,
            R`اجمع.`,
            R`رجّعه.`,
            R`قفلة.`
          ],
          sol: R`الناتج الحقيقي:
[[5]] و [[25]] و [[Hello, Sara!]] و [[7]] و [[-2147483648]].
[[build/release.wasm]] = 4700 byte، و [[build/release.js]] = 3475 byte. والـ [[-2147483648]] لأن [[i32]] لفّ (overflow) زي C، مش زي number في JS.`
        },
        {
          cmd: "wasm يستاهل إمتى",
          title: "WebAssembly أسرع من JavaScript؟ قياس حقيقي",
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
            R`[[readFile]] لقراية الملف.`,
            R`حمّل [[sum.wasm]].`,
            R`الدوال المصدّرة.`,
            R`نفس خوارزمية الـ C بـ JS.`,
            R`العدّاد.`,
            R`كل رقم من 2.`,
            R`افترض إنه أولي.`,
            R`القواسم لحد الجذر.`,
            R`اتقسم؟ مش أولي.`,
            R`قفلة.`,
            R`زوّد لو أولي.`,
            R`قفلة.`,
            R`رجّع العدد.`,
            R`قفلة.`,
            R`دالة القياس.`,
            R`تسخين (مش محسوب).`,
            R`البداية.`,
            R`التشغيل المحسوب.`,
            R`اطبع الاسم والناتج والوقت في أعمدة.`,
            R`قفلة.`,
            R`الأولية بـ JS.`,
            R`الأولية بـ wasm.`,
            R`[[add]] بـ JS، و [[| 0]] يخليها int زي C.`,
            R`عشرة مليون نداء JS ← JS.`,
            R`عشرة مليون نداء JS ← wasm.`
          ],
          sol: R`الناتج الحقيقي (Node 24.22، مرتين):
الأولية: JS [[1089.2 ms]] و [[1164.5 ms]]، wasm [[1108.7 ms]] و [[985.4 ms]]: تعادل.
[[add]] × 10M: JS [[4.0 ms]] و [[3.5 ms]]، wasm [[38.3 ms]] و [[31.2 ms]]: JS أسرع ~9 مرات بسبب تمن النداء.
وتفتيح 32MB: JS حوالي 36 لـ 41 ms، و wasm عادي 23 ms، و wasm بـ [[-msimd128]] حوالي 8 ms.`
        }
      ]
    }
]);
