// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الأخطاء",
      l: 2,
      n: "try و catch و finally، وأنواع الـ errors، و errors مخصصة بـ cause و AggregateError، والأخطاء العامة اللي محدش مسكها",
      projects: [
        { lvl: 'صغير', t: R`فاحص فورم بيقول كل الغلطات مرة واحدة`, what: R`[[validateSignup(data)]] بتفحص [[name]] و [[email]] و [[age]]، ولو فيه غلط واحد أو أكتر بترمي [[ValidationError]] واحد فيه [[fields]] (لكل حقل رسالته بالعربي)، ولو كله سليم بترجّع object نضيف (الاسم من غير مسافات في الأطراف، والسن رقم). وفورم في صفحة بيعرض كل رسالة تحت حقلها. من درسي الوحدة.`, done: R`[[validateSignup({ name: " ", email: "x", age: "abc" })]] بترمي error واحد و [[Object.keys(e.fields).length]] بيدّي 3، و [[e instanceof ValidationError]] بيدّي true. والبيانات السليمة بترجّع [[age]] كرقم مش string، والفورم بيمسح الرسالة لما الحقل يتصلّح.` },
        { lvl: 'صغير', t: R`عيلة errors لتطبيقك`, what: R`ملف [[errors.js]] فيه [[AppError]] و [[NotFoundError]] و [[ValidationError]] و [[AuthError]]، كل واحد بـ status، و [[toJSON()]] بترجّع [[name]] و [[message]] و [[status]] من غير stack. من درس custom errors و cause ودرس import و export.`, done: R`[[JSON.stringify(new NotFoundError("المنتج"))]] فيه [["المنتج مش موجود"]] و [[404]] (ومن غير toJSON الرسالة مبتظهرش خالص: جرّب). و [[instanceof AppError]] بيدّي true للأربعة، و [[err.name]] صح لكل واحد من غير ما تكتبه بإيدك في كل class.` },
        { lvl: 'متوسط', t: R`قارئ إعدادات مبيقعش`, what: R`[[loadConfig(text)]] بتعمل JSON.parse جوه try، ولو بايظ ترمي [[ConfigError("ملف الإعدادات بايظ", { cause })]]، وبعدين تتأكد من [[port]] (رقم صحيح من 1 لـ 65535) و [[dbUrl]] (نص مش فاضي)، وتحط default لأي حقل اختياري. و [[main]] بيمسك الـ ConfigError ويطبع الرسالة والـ cause بس ويخرج بكود ١. من درسي الوحدة ووحدة الـ objects.`, done: R`JSON بايظ بيطبع «ملف الإعدادات بايظ» وتحتها رسالة الـ SyntaxError الأصلية. [[port: 70000]] و [[port: "80"]] كل واحد بيطبع رسالة فيها اسم الحقل. والإعدادات السليمة بترجّع object فيه الـ defaults. ومفيش stack trace بيوصل لليوزر في أي حالة.` },
        { lvl: 'متوسط', t: R`wrapper للـ handlers`, what: R`[[handle(fn)]] بتاخد دالة async وترجّع دالة بترجّع دايمًا [[{ status, body }]]: لو نجحت 200 والنتيجة، ولو رمت AppError الـ status بتاعه ورسالته، ولو أي حاجة تانية 500 برسالة عامة، والـ error الأصلي بيتطبع في [[console.error]] بس. من درسي الوحدة.`, done: R`٤ handlers تجريبية (بتنجح، و NotFound، و Validation، وواحد فيه [[undefined.x]]) بيرجّعوا 200 و 404 و 400 و 500 بالترتيب، والـ 500 مفيهوش [[Cannot read properties]] في الـ body، والـ wrapper نفسه عمره ما بيرمي.` },
        { lvl: 'كبير', t: R`مستورد CSV للطلاب`, what: R`[[importStudents(csvText)]] بتقسم السطور، وتتأكد إن الـ header هو [[name,age,email]]، وتفحص كل سطر بـ ValidationError فيه رقم السطر والحقل، وتكمّل لآخر الملف من غير ما تقف عند أول غلط، وترجّع [[{ imported, errors }]]. وأي error مش متوقع يتلف في [[ImportError]] بـ cause ويترمي. وفي الآخر تقرير: كام سطر اتقري وكام اتضاف وكل غلط في سطره. ومعاه [[test.js]] فيه ٥ حالات. من وحدات النصوص والـ arrays والـ classes والـ modules والوحدة دي.`, done: R`ملف سليم ← errors فاضية. ملف فيه سطرين غلط ← [[errors.length === 2]] وكل واحد فيه رقم السطر الصح (عادّ الـ header). ملف فاضي أو header غلط ← ValidationError واضح من غير ما يكمّل. سطر فيه فاصلة زيادة أو سطر فاضي في الآخر ← غلط مفهوم أو تجاهل، مش crash. والـ ٥ اختبارات بتطبع نجح.`, ext: R`خلّي الإيميل المكرر غلط، واعرض التقرير في صفحة فيها [[textarea]] تلزق فيها الـ CSV وجدول بالسطور الغلط باللون الأحمر.` },
        { lvl: 'فكرة', t: R`سياسة أخطاء لمشروعك`, what: R`خد مشروع من اللي عملتهم وحط فيه سياسة أخطاء: أنواع errors بتاعتك، ومكان واحد بيمسك ويقرر يعرض إيه لليوزر وإيه يتسجّل، و cause في كل مرة بتلف error.`, done: R`مفيش [[catch {}]] فاضي في المشروع كله، وكل رسالة بتظهر لليوزر مفهومة بالعربي، وكل error في اللوج فيه السبب الأصلي.`, ext: R`اعرض الأخطاء في الصفحة كـ toast بدل alert، وزوّد [[code]] ثابت لكل نوع (زي [[E_NOT_FOUND]]) عشان الواجهة تقرر من غير ما تقرا النص.` },
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
            { lvl: 'سريع', t: R`زرار «احفظ» بينادي [[save()]]: الدالة بتقفل الزرار وتكتب عليه «بيحفظ...»، وبعدين بتنادي [[fakeSave()]] اللي بترمي Error عشوائيًا نص المرات، ولو فشلت تكتب الرسالة في [[<p>]] تحت. رجّع الزرار لحالته في [[finally]].`, done: R`في النجاح والفشل الاتنين الزرار بيرجع مفتوح ومكتوب عليه «احفظ»، ورسالة الغلط بتظهر في الفشل بس. ولو نقلت سطر الرجوع لآخر الـ try بدل finally، أول فشل بيسيب الزرار مقفول للأبد.` },
            { lvl: 'تطبيق', t: R`اكتب [[safeJSON(text, fallback)]] بترجّع الـ object لو النص سليم، و fallback لو [[SyntaxError]] بس، وأي error تاني تعمله throw تاني. جرّبها على [['{"a":1}']] و [["{"]] و [[undefined]].`, done: R`النتايج [[{ a: 1 }]] وبعدين الـ fallback مرتين: [[undefined]] كمان بيدّي SyntaxError ورسالته [["undefined" is not valid JSON]]. وجرّب كمان [[function g() { try { throw new Error("x"); } finally { return "ok"; } }]]: بترجّع [["ok"]] والـ error بيختفي، وده سبب إنك متعملش return جوه finally.` },
            { lvl: 'تحدي', t: R`صلّح الكود البايظ: [[try { setTimeout(() => { throw new Error("x"); }, 0); } catch (e) { console.log("caught"); } console.log("after");]]. صاحبه فاكر إن الـ try حامية الـ timer. شغّله، وفسّر ليه، وصلّحه بحيث الغلط يتمسك ويتطبع والبرنامج يكمّل.`, done: R`قبل التصليح بيطبع [[after]]، وبعدها البرنامج بيقع بـ [[Error: x]] ويخرج بكود ١، و [[caught]] عمرها ما بتطبع: الـ try خلص قبل ما الـ callback يشتغل بكتير. بعد ما تنقل الـ try/catch جوه الـ callback نفسه بيطبع [[after]] وبعدين [[caught]] والكود ٠.` },
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
            { lvl: 'سريع', t: R`اقرا وتوقّع: اعمل [[class ValidationError extends Error]] فيها [[this.name = "ValidationError"]]، و [[const e = new ValidationError("الإيميل ناقص")]]، واكتب على ورقة إيه اللي هيطلع من [[e instanceof ValidationError]] و [[e instanceof Error]] و [[String(e)]] و [[JSON.stringify(e)]]، وبعدين شغّل وقارن.`, done: R`[[true true]] وبعدين [[ValidationError: الإيميل ناقص]]. والـ JSON بيطلع [[{"name":"ValidationError"}]] من غير الرسالة: [[message]] و [[stack]] مش enumerable، فلو هتبعت error في API لازم تكتب الحقول بإيدك أو تعمل [[toJSON()]].` },
            { lvl: 'تطبيق', t: R`اكتب [[toHttp(err)]] بترجّع [[{ status, body }]]: [[NotFoundError]] ← 404 ورسالته، و [[ValidationError]] ← 400 ومعاها [[fields]]، وأي حاجة تانية ← 500 برسالة عامة «حصل خطأ» من غير رسالة الـ error الأصلية.`, done: R`[[toHttp(new NotFoundError("المنتج"))]] بترجّع [[{ status: 404, body: { error: "المنتج مش موجود" } }]]، و [[toHttp(new TypeError("db password wrong"))]] بترجّع 500 والـ body مفيهوش كلمة password خالص، و [[toHttp("نص")]] (حد رمى string) بترجّع 500 برضه من غير ما تقع.` },
            { lvl: 'تحدي', t: R`اعمل سلسلة ٣ مستويات: [[readFileFake]] بترمي [[new Error("ENOENT")]]، و [[loadConfig]] بتمسكه وترمي [[ConfigError]] بـ cause، و [[startApp]] بتمسكه وترمي [[AppError("السيرفر مقامش")]] بـ cause. واكتب [[explain(err)]] بتمشي على [[.cause]] وتطبع كل مستوى في سطر، وبحد أقصى ١٠ مستويات.`, done: R`[[explain]] بتطبع ٣ سطور بالترتيب: AppError، وبعدين ConfigError، وبعدين Error ENOENT. و [[console.log(err)]] العادي في Node بيطبع الـ cause تحت كلمة [[[cause]:]]. ولو عملت [[a.cause = b; b.cause = a]]، الدالة بتقف بعد ١٠ سطور ومبتعلّقش.` },
          ],
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
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[const p = Promise.reject(new Error("late")); setTimeout(() => p.catch(() => console.log("اتمسك")), 0);]] في Node 24 من غير أي handler. هيطبع «اتمسك» ولا هيقع؟ وبعدين غيّر [[setTimeout(..., 0)]] لـ [[queueMicrotask(...)]] وتوقّع تاني، وشغّل الاتنين.`, done: R`نسخة [[setTimeout]] بتقع بـ [[Error: late]] وكود ١ و «اتمسك» مبتتطبعش، لأن Node بيفحص الـ rejections اللي ملهاش handler بعد ما الـ microtasks تخلص وقبل الـ timer. نسخة [[queueMicrotask]] بتطبع «اتمسك في microtask» ومبتقعش، وتقدر تقول القاعدة: الـ [[.catch]] لازم يتحط قبل ما اللفة الحالية تخلص.` },
            { lvl: 'تطبيق', t: R`ابني [[crash-guard.mjs]] تعمله import في أول أي سكربت: بيسجّل [[unhandledRejection]] و [[uncaughtException]]، ولكل واحد بيكتب سطر JSON في [[crash.log]] فيه [[time]] و [[type]] و [[message]] و [[stack]]، وبعدين [[process.exit(1)]]. و [[process.on("exit")]] بيطبع كود الخروج.`, done: R`سكربت فيه [[Promise.reject(new Error("x"))]] وسكربت فيه [[setTimeout(() => null.a)]] الاتنين بيخرجوا بكود ١ ([[echo $?]] أو [[$LASTEXITCODE]])، و [[crash.log]] فيه سطرين JSON صالحين ([[JSON.parse]] لكل سطر بينجح) فيهم النوع الصح والـ stack، وتشغيل السكربت مرتين بيزوّد سطور مش بيمسح القديم.` },
            { lvl: 'تحدي', t: R`صلّح الكود البايظ: سيرفر فيه [[process.on("uncaughtException", (e) => console.log("تمام، كمّل", e.message))]] وبعدين request handler بيعمل [[connections++]] وبعدها بيرمي قبل [[connections--]]. ابعت ١٠ requests بايظة واطبع [[connections]]. اشرح ليه «كمّل عادي» غلط، وصلّحه بإن الـ handler يسجّل ويقفل السيرفر بـ [[server.close()]] ويخرج بكود ١، والـ restart يبقى شغل الـ process manager.`, done: R`قبل التصليح [[connections]] بيوصل 10 والسيرفر لسه شغال وبيكذب (الـ state باظ ومحدش عارف)، وبعد التصليح أول request بايظ بيكتب الـ error ويخرج بكود ١ بعد ما الـ requests المفتوحة تخلص، وكتبت في سطرين ليه وثائق Node بتقول إن الكمّل بعد [[uncaughtException]] مش آمن.` },
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
