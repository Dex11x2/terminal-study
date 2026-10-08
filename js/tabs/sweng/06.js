// تكملة تاب sweng: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sweng/01.js (شرح حقول الدرس في أوله)
MORE("sweng", [
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
          teach: R`## الفكرة

فاتورة طلب #812 طلعت [[NaN]]. المثال بيمشي على الخطوات بالترتيب: يعيد الـ bug، ويصغّره لسطر واحد، ويحط فرضية، ويصلّح. هنشغّل كل خطوة ونشوف الناتج. اتشغّل بـ [[npx tsx]] على Node 24.19 (ويندوز).

---

## ١. reproduce: اعيده بالداتا الحقيقية

~~~text debug.ts
const order812 = { items: [{ price: "1,200", qty: 1 }, { price: "50", qty: 2 }] };
const total = (items: { price: string; qty: number }[]) => items.reduce((t, i) => t + Number(i.price) * i.qty, 0);
console.log(total(order812.items)); // NaN
~~~

- [[order812]]: الطلب بالظبط زي ما هو في الداتابيز، مش طلب اخترعناه. لاحظ إن [[price]] نص.
- [[total]]: نفس حسبة الإنتاج: لكل صنف [[Number(i.price) * i.qty]] ويتجمع بـ [[reduce]] من صفر.

~~~text الناتج
NaN
~~~

[[NaN]] (Not a Number) معناها «حسبة طلّعت حاجة مش رقم». ودلوقتي الـ bug بيحصل كل مرة نشغّل، وده شرط قبل أي حاجة تانية: لو مش قادر تعيده، مش هتعرف إنك صلّحته.

---

## ٢. minimal repro: صغّره

شيل حاجة حاجة. الأول نشوف كل صنف لوحده:

~~~text الناتج: order812.items.map((i) => Number(i.price) * i.qty)
[ NaN, 100 ]
~~~

الصنف التاني سليم، والأول هو المشكلة. نصغّر أكتر لسطر واحد:

~~~text debug.ts
console.log(Number("50"), Number("1,200"));
~~~

~~~text الناتج
50 NaN
~~~

[[Number]] بيفهم [["50"]]، ومبيفهمش [["1,200"]] لأن الفاصلة مش جزء من أي رقم بالنسبة له. وليه الإجمالي كله بقى NaN مش بس الصنف ده؟ لأن أي حسبة فيها [[NaN]] بتطلّع [[NaN]]:

~~~text الناتج: NaN + 100
NaN
~~~

فـ [[NaN]] واحد في أول الـ reduce «بيعدي» كل اللي بعده.

---

## ٣. hypothesis: فرضية تقدر تنفيها

> الأسعار جاية من ملف CSV فيه فاصلة الآلاف، و Number مبيفهمهاش.

دي فرضية لأن فيها «لأن»، ولأن ليها تجربة ممكن تنفيها: لو كل الطلبات اللي فيها NaN فيها منتج سعره فوق ١٠٠٠ (يعني فيه فاصلة)، الفرضية صح. لو لقيت طلب NaN مفيهوش، الفرضية غلط أو ناقصة.

---

## ٤. fix عند الحدود

~~~text debug.ts
const parsePrice = (raw: string) => Number(raw.replaceAll(",", ""));
console.log(parsePrice("1,200")); // 1200
~~~

- [[raw.replaceAll(",", "")]]: بدّل كل فاصلة بنص فاضي، يعني امسحها. [[replaceAll]] بتبدّل كل الأماكن ([[replace]] بنص عادي بتبدّل أول واحدة بس).
- وبعدين [[Number]] على [["1200"]].

~~~text الناتج
1200
~~~

والتصليح مكانه وقت قراية الـ CSV (الحدود)، مش جوه [[total]]: لو صلّحت في [[total]]، كل مكان تاني بيقرا السعر هيفضل فيه نفس الـ bug.

---

## ٥. فخ: [[|| 0]]

~~~text الناتج: parsePrice("abc"), Number("1,200") || 0
NaN 0
~~~

[[|| 0]] بيخفي الـ NaN ويحط صفر، فالفاتورة تطلع رقم **غلط** بسكوت بدل ما تطلع NaN باين. والنص اللي مش رقم خالص ([["abc"]]) لسه NaN بعد [[parsePrice]]، فقرر: ترمي خطأ (fail fast) ولا ترجّع NaN؟ واكتب للقرار ده regression test.

---

## الخلاصة

| الخطوة | السؤال | في المثال |
|---|---|---|
| reproduce | بيحصل كل مرة؟ | [[total(order812.items)]] = NaN |
| minimal repro | أصغر حاجة بتعيده؟ | [[Number("1,200")]] = NaN |
| hypothesis | ليه، وإزاي أنفيها؟ | فاصلة الآلاف من الـ CSV |
| bisect | كان شغال قبل كده؟ | الدرس الجاي |
| fix | أصغر تعديل في المكان الصح | [[parsePrice]] وقت الـ import |
| regression test | يفضل متصلّح؟ | [[expect(parsePrice("1,200")).toBe(1200)]] |

- متغيّرش حاجات عشوائي: كل تجربة بتثبت أو بتنفي فرضية واحدة.
- لو علقت، اشرح المشكلة بصوت عالي لحد (rubber duck): غالبًا هتلاقي الافتراض الغلط وانت بتشرح.`,
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
          sol: R`bisect بياخد حوالي ٣ خطوات لـ ٧ commits، وفي الآخر بيطبع [[<hash> is the first bad commit]] (و Git 2.56 بيكتبها [[is the first 'bad' commit]]) ومعاه رسالة الـ commit الخامس والملفات اللي اتغيرت. [[git show refs/bisect/bad]] بيوريك الـ diff بتاعه قبل الـ reset، وهتلاقي فيه [[i.price + i.qty]].

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
          teach: R`## الفكرة

عملنا التمرين بتاع «جرّب» بالظبط في repo تجريبي: [[price.js]] سليم في tag اسمه [[v1]]، وبعده ٧ commits، والخامس كسر الحسبة. واختبار صغير بيعيد الـ bug، متسابه untracked. وبعدين شغّلنا أوامر المثال واحد واحد (مع [[v1]] مكان [[v1.4.0]]). اتشغّل بـ Git 2.56 و Vitest 5.0 على ويندوز.

---

## ١. التجهيز

~~~text الناتج: git log --oneline
7127fdb docs: note 7
42979ec docs: note 6
ba8780f refactor: tidy price math
54aa510 docs: note 4
a3979dd docs: note 3
e87f358 docs: note 2
6bb3f48 docs: note 1
7175b57 feat: price total
~~~

الـ commit [[ba8780f]] غيّر [[i.price * i.qty]] لـ [[i.price + i.qty]]. واسمه «refactor» يعني محدش هيشك فيه. والاختبار:

~~~text tests/repro-812.test.ts
it("total multiplies price by qty (#812)", () => {
  expect(total([{ price: 100, qty: 2 }])).toBe(200);
});
~~~

~~~text الناتج: npx vitest run tests/repro-812.test.ts (على HEAD)
AssertionError: expected 102 to be 200 // Object.is equality
~~~

١٠٠ + ٢ = ١٠٢ بدل ١٠٠ × ٢. و [[git status --short]] بيقول [[?? tests/]]: الـ [[??]] معناها untracked (Git مش متابعه).

---

## ٢. [[git bisect start HEAD v1]]

- [[bisect]] اختصار binary search: بيقسم الـ commits نصين، يجرّب اللي في النص، ويرمي النص اللي مش فيه المشكلة.
- [[start <bad> <good>]]: أول واحد فيه الـ bug ([[HEAD]]، اللي انت واقف عليه)، والتاني كان سليم ([[v1]]).

~~~text الناتج
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[a3979dd...] docs: note 3
~~~

Git نقلك على commit في النص ([[note 3]]) وقالك فاضل حوالي خطوتين. ٧ commits بالبحث الثنائي ≈ ٣ تجارب، بدل ٧ لو جرّبت واحد واحد.

---

## ٣. [[git bisect run npx vitest run tests/repro-812.test.ts]]

[[run]] بيشغّل الأمر في كل خطوة لوحده، ويحكم من الـ exit code (الرقم اللي البرنامج بيخرج بيه):

| exit code | bisect بيفهمه |
|---|---|
| 0 | good (الاختبار عدّى) |
| 125 | skip (الـ commit ده مينفعش يتجرّب) |
| 1 لـ 127 (غير 125) | bad |

و Vitest بيخرج بـ 0 لو كله عدّى و 1 لو اختبار وقع، فبيتوصّل على طول. الملخص:

~~~text الناتج
[a3979dd...] docs: note 3
      Tests  1 passed (1)
[ba8780f...] refactor: tidy price math
      Tests  1 failed (1)
[54aa510...] docs: note 4
      Tests  1 passed (1)
ba8780f28ff093d4756e3785e090cb198352544d is the first 'bad' commit
    refactor: tidy price math
 price.js | 2 +-
bisect found first 'bad' commit
~~~

٣ تجارب، ووصل للـ commit الصح. ونسخ Git الأقدم (زي 2.43 اللي في Ubuntu 24.04) بتكتب [[is the first bad commit]] من غير علامات التنصيص.

ليه الاختبار لازم يفضل untracked؟ Git وهو بيتنقل بين الـ commits بيسيب الملفات اللي مش بيتابعها في مكانها، فالاختبار موجود في كل خطوة، حتى في commits أقدم منه. لو كنت عملته commit، كان هيختفي في الـ commits القديمة.

---

## ٤. [[git show refs/bisect/bad --stat]]

- [[refs/bisect/bad]]: اسم بيشاور على أول commit وحش لقاه bisect.
- [[--stat]]: بيعرض الملفات اللي اتغيرت وعدد السطور، من غير الـ diff كله.

~~~text الناتج
commit ba8780f28ff093d4756e3785e090cb198352544d
    refactor: tidy price math

 price.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

ملف واحد وسطر واحد: الـ commits الصغيرة هي اللي بتخلي النتيجة دقيقة كده.

---

## ٥. [[git bisect log]]

~~~text الناتج
git bisect start 'HEAD' 'v1'
# good: [a3979dd...] docs: note 3
git bisect good a3979dd...
# bad: [ba8780f...] refactor: tidy price math
git bisect bad ba8780f...
# good: [54aa510...] docs: note 4
git bisect good 54aa510...
# first 'bad' commit: [ba8780f...] refactor: tidy price math
~~~

كل خطوة اتعملت، تنسخها في الـ issue. (الـ hashes متقصّرة هنا.)

---

## ٦. [[git bisect reset]]

~~~text الناتج
Previous HEAD position was 54aa510 docs: note 4
Switched to branch 'master'
~~~

بيرجّعك للـ branch اللي كنت عليه. من غيره هتفضل على detached HEAD (واقف على commit مش على branch).

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git bisect start HEAD v1]] | الـ bug في HEAD، و v1 كانت سليمة |
| [[git bisect run <أمر>]] | يجرّب كل خطوة لوحده بالـ exit code |
| [[git show refs/bisect/bad --stat]] | أول commit وحش والملفات |
| [[git bisect log]] | الخطوات، للـ issue |
| [[git bisect reset]] | ارجع للـ branch |

- اختبار صغير untracked بيعيد الـ bug + [[bisect run]] = Git بيلاقي السبب من غير ما تقرا الكود.
- لو commit قديم بيقع لسبب تاني (import لحاجة لسه متعملتش)، خلّي الـ script يخرج بـ 125 عشان bisect يعمل skip.`,
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
          teach: R`## الفكرة

الأوامر في المثال نوعين: أول ٤ بيدّوك الصورة الكبيرة في ربع ساعة، والباقي بيتتبع مسار واحد (زرار «Apply coupon») من الـ UI لحد السيرفر، وبعدين بيسأل التاريخ ليه الكود كده. عملنا مشروع صغير بنفس الشكل في repo تجريبي وشغّلنا الأوامر بالترتيب. اتشغّل بـ Git 2.56 و npm 11 في Git Bash على ويندوز.

---

## ١. الصورة الكبيرة

### [[cat README.md]]

[[cat]] بيطبع الملف. الـ README أول حاجة: إزاي تشغّل المشروع.

~~~text الناتج
# Shop

npm install
npm run dev
~~~

### [[npm run]]

من غير اسم script، بيطبع كل الـ scripts اللي في [[package.json]] واللي كل واحد بيشغّله:

~~~text الناتج
Lifecycle scripts included in shop:
  test
    vitest run
available via $__btnpm run$__bt:
  dev
    next dev
  db:migrate
    prisma migrate dev
  db:seed
    tsx prisma/seed.ts
~~~

في دقيقة عرفت: Next، و Vitest، و Prisma، وفيه seed للداتا. و [[test]] لوحده فوق لأنه «lifecycle script» ليه اختصار ([[npm test]]).

### [[ls docs/adr]]

~~~text الناتج
0001-use-postgres.md
0002-coupons-on-server.md
~~~

ADR اختصار Architecture Decision Record: ملف قصير لكل قرار كبير وليه اتاخد. الاسم التاني لوحده بيجاوب سؤال هتسأله بعدين: الكوبون بيتحسب في السيرفر.

### [[git log --oneline -15]]

- [[--oneline]]: كل commit في سطر: الـ hash المختصر والعنوان.
- [[-15]]: آخر ١٥ بس.

~~~text الناتج
acbf198 fix(coupons): 404 for unknown codes
a648724 feat(coupons): apply endpoint
9647477 feat(coupons): coupon box UI
a07f748 chore: init
~~~

بيوريك الشغل ماشي فين دلوقتي (الكوبونات).

---

## ٢. مسار واحد بـ [[git grep]]

[[git grep]] بيدوّر في الملفات اللي Git بيتابعها بس، فمش هيغرق في [[node_modules]]. و [[-n]] بيطبع رقم السطر، و [[-- src]] يعني «دوّر جوه [[src]] بس» (الـ [[--]] بتفصل بين الكلام اللي بتدوّر عليه والمسارات).

### من النص الظاهر في الـ UI

~~~text الناتج: git grep -n "Apply coupon" -- src
src/components/CouponBox.tsx:2:  return <button onClick={onApply}>Apply coupon</button>;
~~~

[[ملف:سطر:]] وبعدين السطر نفسه. ابدأ دايمًا بنص المستخدم شايفه، لأنه مكتوب في مكان واحد غالبًا.

### للـ URL

~~~text الناتج: git grep -n "/api/coupons" -- src
src/lib/api.ts:2:  fetch("/api/coupons/apply", { method: "POST", body: JSON.stringify({ code }) });
src/server/coupons.ts:2:// route: /api/coupons/apply
~~~

الـ URL هو الخيط اللي بيوصّل الفرونت بالباك: نفس النص في الاتنين.

> في Git Bash على ويندوز، أي argument بيبدأ بـ [[/]] بيتحوّل لمسار ويندوز قبل ما يوصل للأمر، فـ [["/api/coupons"]] بقت مسار جوه فولدر Git ومطلعش ولا نتيجة. الحل: دوّر على [["api/coupons"]] من غير الـ [[/]] الأولانية، أو شغّل الأمر من PowerShell، أو حط [[MSYS_NO_PATHCONV=1]] قبله. جرّبنا التلاتة وطلّعوا نفس الناتج اللي فوق.

### للدالة اللي بتحسب

~~~text الناتج: git grep -n "applyCoupon(" -- src
src/lib/pricing.ts:1:export function applyCoupon(subtotal: number, percent: number) {
src/server/coupons.ts:42:  return { total: applyCoupon(subtotal, coupon.percent) };
~~~

الـ [[(]] بعد الاسم بتخلّي البحث يلاقي التعريف والنداءات بس، مش أي كلمة فيها [[applyCoupon]]. ودلوقتي المسار كامل: زرار ← [[api.ts]] ← [[/api/coupons/apply]] ← [[coupons.ts:42]] ← [[pricing.ts]].

---

## ٣. ليه الكود كده؟

### [[git log --oneline -5 -- src/server/coupons.ts]]

نفس [[git log]]، بس الـ commits اللي لمست الملف ده بس:

~~~text الناتج
acbf198 fix(coupons): 404 for unknown codes
a648724 feat(coupons): apply endpoint
~~~

### [[git blame -L 40,44 src/server/coupons.ts]]

[[blame]] بيقول لكل سطر: آخر commit غيّره، ومين، وإمتى. و [[-L 40,44]] من السطر ٤٠ لـ ٤٤ بس:

~~~text الناتج
a648724 (teach 2026-10-08 14:31:46 +0300 40)   const coupon = await findCoupon(code);
acbf198 (teach 2026-10-08 14:31:46 +0300 41)   if (!coupon) return { error: "invalid", status: 404 };
a648724 (teach 2026-10-08 14:31:46 +0300 42)   return { total: applyCoupon(subtotal, coupon.percent) };
~~~

السطر ٤١ مختلف: جه من [[acbf198]] (تصليح الـ 404). [[git show acbf198]] بيوريك الـ commit كله ورسالته، وده غالبًا اللي فيه «ليه».

---

## الخلاصة

| الأمر | السؤال اللي بيجاوبه |
|---|---|
| [[cat README.md]] | أشغّله إزاي؟ |
| [[npm run]] | إيه الأدوات والأوامر المتاحة؟ |
| [[ls docs/adr]] | إيه القرارات الكبيرة؟ |
| [[git log --oneline -15]] | الشغل ماشي فين؟ |
| [[git grep -n "..." -- src]] | الحاجة دي مكتوبة فين؟ |
| [[git log -- <ملف>]] | مين لمس الملف ده؟ |
| [[git blame -L]] | السطر ده جه منين؟ |

- تتبّع مسار واحد كامل بدل ما تقرا المشروع كله.
- شغّل التطبيق وحط breakpoint أو [[console.log]] في كل محطة، عشان تتأكد إن الطلب فعلًا بيعدّي منها.
- اكتب الأسئلة اللي ملهاش إجابة، وابعتها مرة واحدة لحد في الفريق.`,
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
