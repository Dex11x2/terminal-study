// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "WebAssembly",
      l: 3,
      lab: R`mkdir -p ~/lab/wasm-as && cd ~/lab/wasm-as && npm i -D -E assemblyscript && npx asinit . -y  # فولدر جديد فاضي: من غير npm init -y قبلها`,
      projects: [
        { lvl: 'صغير', t: R`آلة حاسبة wasm من الترمنال`, what: R`[[calc.c]] فيه [[add]] و [[sub]] و [[mul]] و [[divi]] بـ [[EXPORT]] (درس «wasm من C»)، و [[calc.mjs]] بيقرا [[process.argv]] بالشكل [[node calc.mjs 6 x 7]] (استخدم [[x]] مش [[*]] عشان الشيل بيفك النجمة) وينادي الدالة الصح.`, done: R`[[node calc.mjs 6 x 7]] بيطبع [[42]]. والقسمة على صفر بتطبع رسالة واضحة وبتخرج بكود ١ لأن الغلاف فحص قبل النداء، ولو شلت الفحص wasm بيرمي [[RuntimeError: divide by zero]]. وعملية مش معروفة أو رقم مش رقم بيطبعوا طريقة الاستخدام.` },
        { lvl: 'صغير', t: R`مكتبة نصوص بـ AssemblyScript`, what: R`[[reverse(s)]] و [[isPalindrome(s)]] و [[countWords(s)]] في [[assembly/index.ts]] (درس «AssemblyScript»)، وملف [[demo.mjs]] بيستوردهم من [[build/release.js]].`, done: R`[[reverse("abc")]] بترجّع [[cba]]، و [[isPalindrome("level")]] [[true]]، و [[reverse("")]] نص فاضي، و [[reverse(null)]] بترمي [[TypeError]] من الـ bindings بدل ما توقّع الـ wasm. وحجم [[release.wasm]] مكتوب في README.` },
        { lvl: 'متوسط', t: R`صفحة تكبير حروف حيّة ومتينة`, what: R`صفحة فيها [[textarea]] ونتيجة وعداد (درس «WebAssembly في المتصفح»)، بتحمّل [[text.wasm]] بدالة [[loadWasm(url, imports)]] بتجرّب [[instantiateStreaming]] ولو رميت [[TypeError]] بتاع الـ MIME ترجع لـ [[arrayBuffer()]] + [[instantiate]]، وبتقطّع النص الطويل بـ [[encodeInto]].`, done: R`مع سيرفر بيبعت [[application/wasm]] مفيش تحذير، ومع [[application/octet-stream]] بيظهر [[console.warn]] مرة واحدة والصفحة شغالة. ولو الملف 404 بتظهر رسالة فيها الـ status بدل [[CompileError]] (يعني فحصت [[res.ok]] قبل الـ compile). ونص 10 آلاف حرف عربي وانجليزي بيرجع سليم.` },
        { lvl: 'متوسط', t: R`تقرير: wasm ولا JS؟`, what: R`سكربت [[report.mjs]] بيقيس بـ [[bench]] (الوسيط بعد warm-up) تلات حاجات في JS وفي wasm: الأعداد الأولية، ونداء [[add]] ملايين المرات، و [[countWords]] بتاعة AssemblyScript على نص كبير. من دروس «wasm من C» و «AssemblyScript» و «wasm يستاهل إمتى».`, done: R`بيطبع جدول بالعمودين ونسبة الفرق لكل حالة، ونفس الناتج في JS و wasm (لو اختلفوا بيطبع تحذير)، واتشغّل مرتين والترتيب ما اتغيّرش، و README فيه رأيك بالأرقام.` },
        { lvl: 'كبير', t: R`موديول wasm بغلاف JS متين`, what: R`[[wasm-math.mjs]] بيحمّل [[sum.wasm]] مرة واحدة بس (بيحفظ الـ Promise)، وبيعمل export لـ [[sumArray]] و [[maxOf]]: بيفحص المدخل (مصفوفة أرقام int32)، وبيقطّع أي مصفوفة أكبر من 1024 لحتت ويجمع نواتجها BigInt، وبيرمي error فيه المسار لو الـ [[.wasm]] مش موجود. ومعاه [[check.mjs]] بـ [[node:assert/strict]]. من الوحدة كلها ومن درس الأخطاء.`, done: R`[[node check.mjs]] بيعدّي على ٨ حالات على الأقل: مصفوفة فاضية، ورقم واحد، و 3000 رقم (نفس ناتج [[reduce]] في JS)، وسوالب، و [[1.5]] مرفوض، ونص مرفوض، ورقم أكبر من int32 مرفوض، وملف مش موجود رسالته فيها اسم الملف. والتحميل حصل مرة واحدة حتى لو ناديت الدالة ١٠٠ مرة، والسكربت بيشتغل مرتين ورا بعض بنفس الناتج.`, ext: R`زوّد نسخة بتشتغل في Web Worker عشان الصفحة متعلقش مع المصفوفات الكبيرة، وانشره كـ package صغير فيه README وأمثلة.` },
        { lvl: 'فكرة', t: R`حاجة تستاهل wasm بجد`, what: R`اختار شغل تقيل حقيقي (فلتر صور، أو hash لملف كبير، أو ضغط، أو محاكاة فيزيا) واعمله في JS الأول، وبعدين في C أو AssemblyScript، وقيس قبل ما تقرر. انت اللي بتختار المشكلة وشكل الصفحة.`, done: R`فيه نسختين بنفس الناتج بالظبط، وجدول قياس فيه وقت النسخ للذاكرة، وقرار مكتوب في README: wasm كسب ولا لأ وبكام.`, ext: R`جرّب [[-msimd128]]، أو مكتبة C جاهزة معمولها compile، أو Rust بـ wasm-pack، وقارن الحجم والسرعة.` },
      ],
      n: "كود C أو AssemblyScript بيتحول ملف .wasm يشتغل في المتصفح و Node، وبرا المتصفح بـ WASI: تعمله compile، وتحمّله من JS، وتعدّي داتا في الذاكرة، وتشغّله في Worker، وتعرف إمتى يستاهل",
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب في تعليق في [[run.mjs]] إيه اللي هيطبعه [[add(2147483647, 1)]]، وإيه [[typeof]] اللي هترجّعه [[sum_array]]. بعدين شغّل وقارن.`, done: R`كاتب توقعك قبل التشغيل، والناتج الحقيقي: [[add]] بترجّع [[-2147483648]] (الـ [[int]] لفّ من غير ولا error)، و [[typeof]] ناتج [[sum_array]] هو [[bigint]] لأن [[long long]] بيبقى BigInt في JS. ولو توقعك غلط، كاتب السبب في سطر.` },
            { lvl: 'تطبيق', t: R`**مسألة بحالات طرفية:** زوّد على [[sum.c]] دالة [[max_array(int *arr, int len)]] بترجّع أكبر رقم، واكتب في JS غلاف [[maxOf(nums)]] بيكتب الأرقام في [[buffer_ptr()]] وينادي الدالة.`, done: R`[[maxOf([5, 99, -100, 3])]] بترجّع [[99]]، و [[maxOf([-7, -3, -9])]] بترجّع [[-3]] مش [[0]] (يعني بدأت من أول عنصر مش من صفر)، و [[maxOf([])]] بترمي error من JS قبل ما توصل للـ C.` },
            { lvl: 'تحدي', t: R`**ابني غلاف متين:** [[sumArray(nums)]] بيرفض أكتر من 1024 رقم (حجم [[buffer]])، وأي رقم مش [[Number.isInteger]] أو برا حدود int32، وبيرجّع Number عادي لو الناتج أصغر من [[Number.MAX_SAFE_INTEGER]].`, done: R`1024 مرة [[2147483647]] بترجّع [[2199023254528]] (بيساوي [[2147483647n * 1024n]])، و 1025 رقم، و [[1.5]]، و [[2 ** 31]] كل واحد بيرمي error برسالة بتقول المشكلة فين، من غير ما يكتب حاجة في الذاكرة.` },
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
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** زميلك كتب [[const imports = { log_count: (n) => console.log(n) };]] والصفحة وقعت قبل ما تطبع حاجة. اقرا الـ error ولاقي الغلطة من غير ما تبص على المثال.`, done: R`لقيت إن الرسالة بتقول [[Import #0 "env": module is not an object or function]] (الدالة لازم تبقى جوه [[env]] زي ما الـ C طالبها)، وبعد التصليح الصفحة بتطبع عدد الحروف. وجرّبت كمان [[{ env: {} }]] وشفت [[LinkError]] فيها اسم [[log_count]].` },
            { lvl: 'تطبيق', t: R`**ابني حتة صفحة:** خانة [[<input>]]، وتحتها [[<p id="out">]] و [[<span id="count">]]. مع كل حدث [[input]] اعرض [[toUpper(value)]] في [[out]]، وعدد الحروف اللي اتغيرت (من [[log_count]]) في [[count]].`, done: R`لما تكتب [[hello مرحبا]] الصفحة بتعرض [[HELLO مرحبا]] والعداد [[5]]، والعربي زي ما هو، والخانة الفاضية بتعرض نص فاضي والعداد [[0]]، والـ wasm بيتحمّل مرة واحدة بس مش مع كل حرف.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[toUpper]] بتبوّظ الذاكرة لو النص أكبر من 4096 byte. اكتب [[toUpperLong(text)]] بتقطّع النص بـ [[new TextEncoder().encodeInto(rest, view)]] (بترجّع [[read]] و [[written]] ومبتقسمش حرف في النص)، وتنادي [[upper]] على كل حتة.`, done: R`[[('مرحبا hello ').repeat(500)]] (8500 byte) بيرجع مساوي بالظبط لـ [[text.replace(/[a-z]/g, c => c.toUpperCase())]]، ومفيهوش ولا [[�]] (علامة الحرف المكسور)، والنص الفاضي بيرجع فاضي.` },
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
            { lvl: 'سريع', t: R`**مسألة:** [[export function countWords(s: string): i32]] بتعدّ الكلمات المفصولة بمسافة أو tab أو سطر جديد، من غير [[split]].`, done: R`[[countWords("  hello   world ")]] بترجّع [[2]]، و [[countWords("")]] بترجّع [[0]]، و [[countWords("واحد اتنين تلاتة")]] بترجّع [[3]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** اكتب توقعك لـ [[add("5", 2)]] و [[add(1.9, 1)]] و [[add(2147483647, 1)]]، وزوّد [[isEven(n: i32): bool]] وتوقّع [[typeof isEven(4)]]. بعدين شغّل.`, done: R`الناتج على AssemblyScript 0.28.20: [[7]] و [[2]] و [[-2147483648]] من غير ولا error (الـ bindings بتحوّل أي حاجة لـ i32)، و [[typeof isEven(4)]] هو [[boolean]]. وكاتب جنب كل واحدة توقعك كان صح ولا لأ.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[addSafe(a: i32, b: i32): i64]]، وغلاف JS [[safeAdd]] بيرفض أي حاجة مش [[Number.isInteger]]. واكتب [[test.mjs]] بـ [[node:assert/strict]] فيه ٦ حالات على الأقل للاتنين.`, done: R`[[node test.mjs]] بيعدّي من غير ولا error: [[addSafe(2147483647, 1)]] بترجّع [[2147483648n]] (BigInt)، و [[safeAdd("5", 2)]] و [[safeAdd(1.9, 1)]] بيرموا [[TypeError]]، ولو شلت الفحص من الغلاف الاختبار بيفشل.` },
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، اكتب السطر اللي [[perror]] هيطبعه والـ exit code لكل واحدة: [[/data/note.txt]]، و [[/data/missing.txt]]، و [[/data/../run.mjs]]، ونفس [[/data/note.txt]] بس و [[preopens: {}]].`, done: R`الناتج الحقيقي: الأولى طبعت السطرين و [[exit code: 0]]، والتانية [[fopen: No such file or directory]] و 2، والتالتة [[fopen: Capabilities insufficient]] و 2 (مش «مش موجود»: البرنامج حاول يطلع برا الفولدر)، والرابعة [[No such file or directory]] و 2 لأن [[/data]] نفسها مش موجودة بالنسبة له. وكاتب جنب كل واحدة توقعك.` },
            { lvl: 'تطبيق', t: R`**ابني أداة:** [[wcount.c]] زي [[wc]]: بياخد اسم ملف ويطبع عدد السطور والكلمات والـ bytes، ومن غير ملف يطبع [[usage: wcount FILE]] على [[stderr]] ويرجّع 1. شغّله بـ [[node:wasi]] وخلّي [[stdout]] يروح لملف [[out.txt]] بـ [[openSync]] و خيار [[stdout]] في [[new WASI]].`, done: R`على [[note.txt]] (سطرين: «سطر أول من ملف حقيقي» و «second line») [[out.txt]] فيه [[2 7 49 /data/note.txt]] والـ exit code صفر، وعلى ملف مش موجود الترمنال طبع [[/data/nope.txt: No such file or directory]] و [[out.txt]] فاضي والـ exit code 1، ومن غير arguments طبع [[usage: wcount FILE]] و 1.` },
            { lvl: 'تحدي', t: R`**اكتب غلاف متين واختباره:** [[runWasi(file, { args, env, dirs })]] بترجّع [[{ code }]] وبتعمل [[new WASI]] جديد كل نداء. ارمي error واضح لو الملف مش موجود، ولو الـ wasm مالوش [[_start]] (زي [[sum.wasm]] بتاع درس «wasm من C»)، واختبرها بـ [[node:assert/strict]].`, done: R`[[node test.mjs]] بيعدّي: [[wcat.wasm]] بيرجّع [[{ code: 0 }]] مرتين ورا بعض (مفيش [[WASI instance has already started]] لأن كل نداء بـ WASI جديد)، و [[sum.wasm]] بيرمي رسالتك انت بدل [[The "instance.exports._start" property must be of type function]]، والملف المش موجود رسالته فيها اسم الملف.` },
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
            { lvl: 'سريع', t: R`**قارن وقيس:** زوّد في C دالة [[add_many(int n)]] بتعمل اللوب كلها جوه wasm ([[s = add(s, 1)]] عشر مليون مرة)، وقيسها بـ [[time]] اللي في المثال جنب ١٠ مليون نداء [[wasm.add]] من JS.`, done: R`عندك رقمين بالـ ms بعد الـ warm-up، والناتجين [[10000000]]، وكاتب جملة بتقول مين كسب وليه (كل نداء من JS لـ wasm ليه تمن).` },
            { lvl: 'تطبيق', t: R`**refactor:** [[time(label, fn)]] بتقيس مرة واحدة بس. خليها [[bench(label, fn, runs = 7)]]: warm-up مرة، وبعدين ٧ قياسات، وتطبع الأقل والوسيط (median)، من غير ما تغيّر أي سطر في الدوال اللي بتتقاس.`, done: R`كل سطر بيطبع الاسم والناتج والأقل والوسيط، والـ warm-up مش داخل في الحساب، ولما تشغّل مرتين الوسيط بيبقى قريب أكتر من القياس الواحد القديم.` },
            { lvl: 'تحدي', t: R`**اشرحها بأرقام:** في تلات حالات (تكبير حروف نص ١٠ حروف مرة واحدة، وفلتر على صورة 32MB، وجمع رقمين في لوب) قرر wasm يستاهل ولا لأ، وقيس الحالة التانية **ومعاها** وقت نسخ الـ bytes للـ [[memory]] ورجوعها.`, done: R`عندك جدول: لكل حالة قرارك وسببه في سطر، وللصورة ٣ أرقام (JS، و wasm من غير النسخ، و wasm بالنسخ رايح جاي)، وجملة بتقول القرار اتغيّر ولا لأ لما حسبت النسخ.` },
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
