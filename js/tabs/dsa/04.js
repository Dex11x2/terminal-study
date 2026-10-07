// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "recursion و prefix sums",
      l: 1,
      n: "دالة بتنادي نفسها على مسألة أصغر، وتجهيز مرة واحدة يوفّر loops كتير بعدين",
      items: [
        {
          cmd: "recursion (base case)",
          title: "احسب n! بدالة بتنادي نفسها",
          desc: R`recursion يعني دالة بتحل المسألة بإنها تنادي نفسها على نسخة أصغر منها، لحد ما توصل لحالة صغيرة إجابتها معروفة (الـ base case). [[factorial(5) = 5 × factorial(4)]]، ولحد [[factorial(1) = 1]].

أي دالة recursive محتاجة حاجتين: base case بيوقّف، وكل نداء بيقرّب منه. لو نسيت الأولى، أو الخطوة مش بتقرّب، الدالة هتنادي نفسها لحد ما الـ stack يتملي.

الـ Big-O هنا: n نداء، كل واحد شغله [[O(1)]]، يعني [[O(n)]] وقت، و [[O(n)]] ذاكرة للـ call stack.`,
          example: R`function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
function sumDigits(n) {
  if (n < 10) return n;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}
console.log(factorial(5));    // 120
console.log(factorial(0));    // 1
console.log(sumDigits(9045)); // 18
console.log(factorial(171));  // Infinity
// factorial: O(n) time, O(n) call stack; sumDigits: O(number of digits)`,
          try: R`اكتب [[power(x, n)]] بـ recursion بطريقتين: [[x * power(x, n - 1)]]، و «لو n زوجي، احسب [[power(x, n / 2)]] مرة واحدة وربّعها». عدّ النداءات في الاتنين لـ n = 1024، وقول الـ Big-O لكل واحدة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[powerFast]] بالنسخة اللي بتقسم n على ٢.`,
          flag: "script",
          deep: {
            why: "recursion هي الطريقة الطبيعية لأي حاجة شكلها «جواها نسخة أصغر منها»: شجرة (كل فرع شجرة)، وفولدرات جوه فولدرات، و JSON متداخل، وكومنتات عليها ردود عليها ردود. ومن غيرها trees و backtracking و DP هيبقوا صعبين جدًا.",
            how: R`طريقة التفكير (مش التتبّع): افترض إن الدالة شغالة صح للمسألة الأصغر، وركّز بس على سؤال واحد: إزاي أبني الإجابة من إجابة الأصغر؟ ده اسمه leap of faith.

[[factorial(n)]]: لو [[factorial(n - 1)]] صح، يبقى الإجابة n × الناتج. خلاص.

وبعدين الـ base case: أصغر مسألة ممكنة وإجابتها من غير نداء. هنا n ≤ 1.

التتبّع لـ [[factorial(4)]]: بتستنى [[factorial(3)]]، اللي بتستنى [[factorial(2)]]، اللي بتستنى [[factorial(1)]] اللي بترجّع 1 على طول. بعدين النتايج بتطلع لفوق: 2 × 1 = 2، و 3 × 2 = 6، و 4 × 6 = 24. النداءات بتنزل لحد الـ base case، والنتايج بتطلع. ده بالظبط اللي بيحصل في الـ call stack (الدرس الجاي).

و [[n <= 1]] أأمن من [[n === 1]]: الأولى بتغطي 0، والتانية مع [[factorial(0)]] هتنزل -1 و -2 ومش هتقف.`,
            when: "trees و graphs (DFS)، و divide and conquer (merge sort)، و backtracking، وأي بيانات متداخلة. وتجنّبها لو العمق ممكن يوصل آلاف (شوف الدرس الجاي).",
            mistakes: R`base case ناقص أو مش بيتوصله ([[n === 1]] مع n = 0، أو رقم عشري زي 2.5). ونسيان [[return]] قبل النداء: الدالة هترجّع undefined. وإنك تفتكر إن الأرقام مالهاش حد: بعد 18! الناتج بيعدّي [[Number.MAX_SAFE_INTEGER]]، يعني مفيش ضمان إنه مضبوط، ومحتاج [[BigInt]] (اكتب [[1n]] بدل 1).`
          },
          teach: R`## الفكرة في جملة

**recursion** يعني دالة بتنادي نفسها على نسخة أصغر من نفس المسألة. 4! = 4 × 3!، و 3! = 3 × 2!، وهكذا لحد ما نوصل لمسألة صغيرة إجابتها معروفة من غير حساب: ده الـ **base case** (1! = 1). من غيره الدالة مش هتقف.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] في أول كل نداء وفي آخره، بمسافة على قد عمق النداء.

---

## ١. [[factorial]] سطر سطر

~~~js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
~~~

**factorial** (المضروب، ويتكتب n!) = حاصل ضرب كل الأرقام من 1 لـ n. يعني 4! = 4 × 3 × 2 × 1 = 24.

### [[if (n <= 1) return 1;]]

الـ base case. 1! = 1، و 0! = 1 بالتعريف. ليه [[<=]] مش [[===]]؟ لو كتبت [[n === 1]] ونادينا [[factorial(0)]]، الشرط مش هيتحقق أبدًا: هتنزل -1 و -2 ومش هتقف لحد ما البرنامج يقع.

### [[return n * factorial(n - 1);]]

هنا السر: افترض إن [[factorial(n - 1)]] بترجّع الإجابة الصح للمسألة الأصغر (ده اسمه **leap of faith**). يبقى إجابتك n × الناتج ده. وكل نداء n بيقل واحد، فأكيد هنوصل لـ 1.

---

## ٢. التتبع: [[factorial(4)]]

كل نداء بيستنى النداء اللي جواه يخلص الأول. المسافة على الشمال = العمق:

~~~text الناتج (Node 24 على ويندوز)
call factorial(4)
  call factorial(3)
    call factorial(2)
      call factorial(1)
      base -> 1
    factorial(2) = 2 * 1 = 2
  factorial(3) = 3 * 2 = 6
factorial(4) = 4 * 6 = 24
~~~

نفس الكلام في جدول، بترتيب اللي حصل:

| الخطوة | النداء | بيستنى | بيرجّع |
|---|---|---|---|
| 1 | factorial(4) | factorial(3) | |
| 2 | factorial(3) | factorial(2) | |
| 3 | factorial(2) | factorial(1) | |
| 4 | factorial(1) | ولا حاجة (base case) | 1 |
| 5 | factorial(2) | | 2 × 1 = 2 |
| 6 | factorial(3) | | 3 × 2 = 6 |
| 7 | factorial(4) | | 4 × 6 = 24 |

النداءات **بتنزل** لحد الـ base case، والنتايج **بتطلع** لفوق. أقصى عمق وصلناه 4 نداءات مفتوحين في نفس الوقت.

---

## ٣. [[sumDigits]] سطر سطر

~~~js
function sumDigits(n) {
  if (n < 10) return n;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}
~~~

- [[n < 10]]: رقم من خانة واحدة، مجموع أرقامه هو نفسه. ده الـ base case.
- [[n % 10]]: [[%]] باقي القسمة. باقي قسمة أي عدد على 10 هو آخر رقم فيه: [[372 % 10]] = 2.
- [[Math.floor(n / 10)]]: [[372 / 10]] = 37.2، و [[Math.floor]] بتقرّب لتحت فتبقى 37. يعني شلنا آخر رقم.
- فالقاعدة: مجموع أرقام 372 = آخر رقم (2) + مجموع أرقام الباقي (37).

### التتبع: [[sumDigits(372)]]

~~~text الناتج (Node 24 على ويندوز)
call sumDigits(372) n%10=2 floor(n/10)=37
  call sumDigits(37) n%10=7 floor(n/10)=3
    call sumDigits(3) n%10=3 floor(n/10)=0
    base -> 3
  sumDigits(37) = 10
sumDigits(372) = 12
~~~

| النداء | n % 10 | الباقي | بيرجّع |
|---|---|---|---|
| sumDigits(3) | | | 3 (base case) |
| sumDigits(37) | 7 | 3 | 7 + 3 = 10 |
| sumDigits(372) | 2 | 37 | 2 + 10 = 12 |

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
120
1
18
Infinity
~~~

- [[factorial(5)]] = 120، و [[factorial(0)]] = 1 لأن الـ base case [[<= 1]] غطّاه، و [[sumDigits(9045)]] = 9 + 0 + 4 + 5 = 18.
- [[factorial(171)]] = [[Infinity]]: أكبر رقم JS تقدر تخزّنه ([[Number.MAX_VALUE]]) حوالي 1.8 × 10^308. شغّلنا [[factorial(170)]] وطلعت حوالي 7.26 × 10^306، ولما تضرب في 171 بتعدّي الحد.
- وقبلها بكتير الدقة بتضيع: [[factorial(18)]] = 6402373705728000 لسه أقل من [[Number.MAX_SAFE_INTEGER]] (9007199254740991)، بس [[factorial(19)]] أكبر منه، فمفيش ضمان إن كل رقم فيه مضبوط. للأرقام الكبيرة استخدم [[BigInt]].

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| وقت factorial | [[O(n)]] | n نداء، وكل نداء ضربة واحدة ومقارنة |
| ذاكرة factorial | [[O(n)]] | n نداء مفتوحين في نفس الوقت، كل واحد واخد مكان في الـ call stack (الدرس الجاي) |
| sumDigits | [[O(d)]] | d = عدد أرقام n، لأن كل نداء بيشيل رقم. يعني [[O(log n)]] بالنسبة لـ n نفسه |

---

## الخلاصة

~~~text
base case      أصغر مسألة، إجابتها من غير نداء (n <= 1)
الخطوة          نادي نفسك على مسألة أصغر، وابني الإجابة من نتيجتها
لازم            كل نداء يقرّب من الـ base case
التنفيذ         النداءات بتنزل، والنتايج بتطلع
الـ Big-O       factorial: O(n) وقت و O(n) stack
~~~

> قبل ما تكتب أي دالة recursive اسأل سؤالين: إيه أصغر مسألة؟ وإزاي أبني إجابة n من إجابة الأصغر؟`,
          lines: [
            "n! = n × (n-1) × ... × 1.",
            "الـ base case: 0! و 1! بـ 1. من غيره الدالة مش هتقف.",
            "المسألة الأكبر = n × نفس المسألة على n - 1.",
            "قفلة.",
            "مثال تاني: مجموع أرقام عدد.",
            "رقم واحد: مجموعه هو نفسه.",
            "آخر رقم ([[n % 10]]) + مجموع أرقام الباقي من غير آخر رقم.",
            "قفلة.",
            "5 × 4 × 3 × 2 × 1.",
            "0! = 1 بالتعريف، والـ base case غطّاه.",
            "9 + 0 + 4 + 5.",
            "171! أكبر من أكبر رقم JS تقدر تخزّنه، فبيطلع Infinity."
          ],
          sol: R`النسخة الأولى [[x * power(x, n - 1)]] بتعمل 1025 نداء لـ n = 1024 (من 1024 لحد 0)، فهي [[O(n)]] time و [[O(n)]] stack. النسخة التانية بتعمل 12 نداء بس: n بتتقسم نصين كل مرة (1024، 512، ... 1، 0)، فهي [[O(log n)]].

المهم في التانية إنك تحسب [[power(x, n / 2)]] مرة واحدة في متغير وتضربه في نفسه. ولو n فردي: [[x * power(x, n - 1)]] (وده يرجّعها زوجي في الخطوة الجاية).

الغلطة المشهورة: تكتب [[power(x, n / 2) * power(x, n / 2)]]. شكلها صح، بس كل نداء بيعمل اتنين، فعدد النداءات بيرجع قريب من n، والـ [[O(log n)]] تضيع.`,
          solCode: R`let calls = 0;
function powerSlow(x, n) {
  calls++;
  if (n === 0) return 1;
  return x * powerSlow(x, n - 1);
}
function powerFast(x, n) {
  calls++;
  if (n === 0) return 1;
  if (n % 2 === 1) return x * powerFast(x, n - 1);
  const half = powerFast(x, n / 2);
  return half * half;
}
console.log(powerSlow(2, 10), powerFast(2, 10)); // 1024 1024
calls = 0; powerSlow(2, 1024); console.log("slow calls:", calls); // slow calls: 1025
calls = 0; powerFast(2, 1024); console.log("fast calls:", calls); // fast calls: 12
// powerSlow: O(n) time and O(n) stack; powerFast: O(log n) time and O(log n) stack`,
          check: {
            lang: "js",
            starter: R`function powerFast(x, n) {
  // base case الأول: n === 0
  // لو n زوجي: احسب powerFast(x, n / 2) مرة واحدة في متغير وربّعه
}`,
            tests: R`test("powerFast(2, 10) ← 1024", () => expect(powerFast(2, 10)).toBe(1024));
test("powerFast(5, 0) ← 1 (الـ base case)", () => expect(powerFast(5, 0)).toBe(1));
test("n فردي: powerFast(3, 13) ← 1594323", () => expect(powerFast(3, 13)).toBe(1594323));
test("powerFast(2, 31) ← 2147483648", () => expect(powerFast(2, 31)).toBe(2147483648));
test("n = 100001: النسخة اللي بتنزّل n واحد هتعمل stack overflow، والنسخة O(log n) بتنزل حوالي ٣٤ مستوى", () => {
  expect(powerFast(1, 100000)).toBe(1);
  expect(powerFast(-1, 100001)).toBe(-1);
});`,
            solution: R`function powerFast(x, n) {
  if (n === 0) return 1;
  if (n % 2 === 1) return x * powerFast(x, n - 1);
  const half = powerFast(x, n / 2);
  return half * half;
}`
          }
        },
        {
          cmd: "call stack",
          title: "إيه اللي بيحصل في الذاكرة لما دالة تنادي نفسها مليون مرة؟",
          desc: R`كل نداء لدالة بيحجز frame في الـ call stack (المتغيرات المحلية ومكان الرجوع)، والـ frame مبيتشالش غير لما الدالة ترجع. recursion بعمق n يعني n frame في نفس الوقت، والـ stack ليه حد: في Node حوالي ١٠ آلاف لـ ١٢ ألف نداء لدالة بسيطة، وبعدها [[RangeError: Maximum call stack size exceeded]].

الحل لما العمق كبير: حوّلها loop. أي recursion ينفع تتكتب loop، أحيانًا بـ stack إنت اللي بتديره (array) بدل الـ call stack.

وخلي بالك: V8 (اللي في Chrome و Node) مبيعملش tail call optimization، فحتى لو النداء آخر حاجة في الدالة، برضه بياخد frame.`,
          example: R`function depth(n) {
  return n === 0 ? 0 : 1 + depth(n - 1);
}
console.log(depth(1000)); // 1000
try { depth(1e6); }
catch (e) { console.log(e instanceof RangeError, e.message); } // true Maximum call stack size exceeded
function depthLoop(n) {
  let d = 0;
  while (n > 0) { d++; n--; }
  return d;
}
console.log(depthLoop(1e6)); // 1000000
// recursion: O(n) stack space and it crashes past ~10k frames; the loop: O(1) space`,
          try: R`اعرف أقصى عمق على جهازك: [[let d = 0; const f = () => { d++; f(); }; try { f(); } catch { console.log(d); }]]. وبعدين ضيف متغيرات محلية كتير جوه f وشوف الرقم بيقل (الـ frame كبر).`,
          flag: "script",
          deep: {
            why: "bug حقيقي بيحصل في الإنتاج: دالة recursive بتمشي على شجرة كومنتات أو قايمة مترابطة أو فولدرات، بتشتغل تمام في التجربة، وبعدين بيانات عميقة جت فالسيرفر وقع بـ RangeError. ولازم تفهم ليه عشان تعرف امتى الـ recursion آمنة.",
            how: R`الـ call stack منطقة ذاكرة الـ runtime بيستخدمها عشان يفتكر «أنا فين». لما تنادي دالة، بيتحط فوقه frame فيه: الـ arguments، والمتغيرات المحلية، والمكان اللي هيرجع له بعد ما الدالة تخلص. لما الدالة ترجع، الـ frame بيتشال.

في [[depth(3)]]: frame لـ depth(3)، فوقه depth(2)، فوقه depth(1)، فوقه depth(0). depth(0) بترجع 0 وتتشال، depth(1) تكمّل وترجع 1 وتتشال، وهكذا. أقصى ارتفاع وصله الـ stack = n + 1.

حجم الـ stack محدود (في V8 حوالي 1MB افتراضيًا)، فعدد الـ frames بيعتمد على حجم كل frame. عشان كده الرقم مش ثابت بين الأجهزة والإصدارات. فيه flag اسمه [[--stack-size]] في Node، بس متعتمدش عليه: الحل الصح إنك تشيل العمق.

tail call: [[return f(n - 1)]] من غير أي حساب بعده. المواصفات (ES2015) بتقول المحرك المفروض يعيد استخدام نفس الـ frame، بس Safari بس اللي عامل كده. V8 مش عاملها، يعني في Node الـ tail recursion برضه بتعمل stack overflow.

التحويل لـ loop: لو الدالة بتنادي نفسها مرة واحدة، غالبًا loop عادي كفاية. لو بتنادي نفسها أكتر من مرة (شجرة)، استخدم array كـ stack: [[push]] بدل النداء، و [[pop]] بدل الرجوع.`,
            when: "أي recursion العمق فيها مرتبط بحجم البيانات: linked list، أو شجرة ممكن تبقى مايلة، أو grid كبيرة في flood fill. لو العمق log n (شجرة متوازنة، merge sort)، الـ recursion آمنة.",
            mistakes: R`إنك تفتكر إن try/catch حوالين الـ recursion حل: ده بيخبّي المشكلة بس. وإنك تفتكر إن tail recursion بتحل المشكلة في Node. وإنك تنسى إن [[JSON.stringify]] على object متداخل جدًا ممكن يرمي نفس الـ RangeError. وإنك تقول على الـ recursion «O(1) space».`
          },
          teach: R`## الفكرة في جملة

كل ما دالة تتنادى، الـ runtime بيحجز لها **frame** (إطار) في منطقة ذاكرة اسمها **call stack**: فيه الـ arguments والمتغيرات المحلية والمكان اللي هيرجع له لما تخلص. الـ frame مبيتشالش غير لما الدالة ترجع. فـ recursion بعمق مليون = مليون frame في نفس الوقت، والـ stack حجمه محدود، فبيتملي والبرنامج يرمي [[RangeError]].

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز.

---

## ١. [[depth]] سطر سطر

~~~js
function depth(n) {
  return n === 0 ? 0 : 1 + depth(n - 1);
}
~~~

[[condition ? a : b]] اسمه **ternary operator**: لو الشرط صح خد a، غير كده خد b. يعني: لو n = 0 رجّع 0، غير كده رجّع 1 + [[depth(n - 1)]]. الدالة بتعدّ هي نزلت كام مستوى، فـ [[depth(n)]] = n.

المهم إن الجمع [[1 + ...]] مش هيحصل غير لما [[depth(n - 1)]] ترجع. فكل نداء **مستني** اللي جواه، والـ frame بتاعه لسه محجوز.

### التتبع: [[depth(3)]] وحجم الـ stack

ضفنا عدّاد بيزيد أول النداء (push) ويقل قبل الرجوع (pop):

~~~text الناتج (Node 24 على ويندوز)
push depth(3) stack size=1
push depth(2) stack size=2
push depth(1) stack size=3
push depth(0) stack size=4
pop depth(0) returns 0
pop depth(1) returns 1
pop depth(2) returns 2
pop depth(3) returns 3
~~~

| اللحظة | الـ frames اللي في الـ stack (تحت ← فوق) | الحجم |
|---|---|---|
| بعد نداء depth(3) | depth(3) | 1 |
| بعد نداء depth(2) | depth(3)، depth(2) | 2 |
| بعد نداء depth(1) | depth(3)، depth(2)، depth(1) | 3 |
| بعد نداء depth(0) | depth(3)، depth(2)، depth(1)، depth(0) | **4** |
| depth(0) رجعت 0 | depth(3)، depth(2)، depth(1) | 3 |
| depth(1) رجعت 1 | depth(3)، depth(2) | 2 |
| ... | | |

أقصى حجم = n + 1. ولو n مليون، يبقى مليون frame وواحد.

---

## ٢. [[try]] و [[catch]] والـ RangeError

~~~js
try { depth(1e6); }
catch (e) { console.log(e instanceof RangeError, e.message); }
~~~

- [[1e6]]: كتابة علمية، يعني 1 × 10^6 = مليون.
- [[try { ... }]]: جرّب الكود ده، ولو رمى error متوقّعش البرنامج.
- [[catch (e) { ... }]]: لو حصل error، امسكه في متغير [[e]] ونفّذ ده.
- [[e instanceof RangeError]]: هل الـ error ده من نوع RangeError؟ ([[instanceof]] بتسأل «الـ object ده اتعمل من الـ class دي؟»).
- [[e.message]]: نص الرسالة.

~~~text الناتج
true Maximum call stack size exceeded
~~~

بحثنا بـ binary search على أقصى n تعدّي من غير error لـ [[depth]] على نفس الجهاز، وطلع 9765. الرقم ده بيتغير من جهاز لجهاز ومن إصدار لإصدار، ومش حاجة تبني عليها.

---

## ٣. [[depthLoop]]: نفس الحساب من غير frames

~~~js
function depthLoop(n) {
  let d = 0;
  while (n > 0) { d++; n--; }
  return d;
}
~~~

بدل ما ننادي الدالة على n - 1، بنلف: كل لفة نزوّد [[d]] وننقّص [[n]]. الدالة اتنادت **مرة واحدة**، فـ frame واحد بس طول الوقت.

| بعد اللفة | n | d |
|---|---|---|
| البداية | 3 | 0 |
| 1 | 2 | 1 |
| 2 | 1 | 2 |
| 3 | 0 | 3 |

الناتج 3، وده من تتبّع حقيقي لـ [[depthLoop(3)]]. ومع مليون: مليون لفة، ونفس الـ frame.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
1000
true Maximum call stack size exceeded
1000000
~~~

---

## ٥. الـ solCode: حجم الـ frame بيأثر

~~~js
let d = 0;
const f = () => { d++; f(); };
try { f(); } catch { console.log("small frame:", d); }
~~~

- [[f]] بتزوّد العدّاد وتنادي نفسها من غير base case خالص، فأكيد هتقع. [[d]] في الآخر = عدد النداءات اللي دخلت قبل ما الـ stack يتملي.
- [[catch { ... }]] من غير [[(e)]]: مسموح لما مش محتاج الـ error نفسه.
- الدالة التانية [[g]] نفس الفكرة بس فيها ٨ متغيرات محلية ([[let a = d2, b = a + 1, ...]])، والـ [[return a + b + ...]] بعد النداء بيجبر المحرك يحتفظ بيهم في الـ frame.

~~~text الناتج (Node 24 على ويندوز)
small frame: 12504
big frame: 6946
~~~

الـ stack حجمه ثابت (في V8، المحرك اللي في Node و Chrome، حوالي 1MB افتراضيًا). frame أكبر = عدد أقل يدخل. عشان كده مفيش «رقم سحري» للعمق.

---

## ٦. الـ Big-O وليه

| | الذاكرة | السبب |
|---|---|---|
| [[depth(n)]] recursion | [[O(n)]] | n + 1 frame مفتوحين في نفس اللحظة |
| [[depthLoop(n)]] | [[O(1)]] | frame واحد ومتغيرين، مهما n كبرت |
| الوقت للاتنين | [[O(n)]] | n خطوة في الحالتين |

---

## الخلاصة

~~~text
frame          الـ arguments والمتغيرات المحلية ومكان الرجوع، لكل نداء
بيتشال امتى     لما الدالة ترجع بس
العمق d        d frame في نفس الوقت = O(d) ذاكرة
الحد           حوالي 10 آلاف لـ 12 ألف لدالة بسيطة في Node، وبيقل لو الـ frame كبير
الحل           حوّلها loop (أو stack إنت اللي بتديره في array)
~~~

> الـ recursion آمنة لما العمق صغير (زي log n في شجرة متوازنة). لو العمق ممكن يوصل لحجم البيانات نفسه، استخدم loop.`,
          lines: [
            "دالة بتنزل n مستوى.",
            "لو 0 خلاص، غير كده 1 + نفسها على n - 1. كل نداء مستني اللي بعده.",
            "قفلة.",
            "ألف مستوى: مفيش مشكلة.",
            "مليون مستوى...",
            "...الـ stack اتملى قبل ما نوصل للـ base case: RangeError.",
            "نفس الحساب بـ loop.",
            "عدّاد.",
            "لفة بدل نداء: مفيش frames جديدة.",
            "رجّع.",
            "قفلة.",
            "مليون عادي، لأن الذاكرة O(1)."
          ],
          sol: R`على جهازي بـ Node 22 الرقم طلع حوالي 12500، ومع 8 متغيرات محلية جوه الدالة نزل لحوالي 7000. رقمك هيبقى مختلف (الجهاز والإصدار بيفرقوا)، بس لازم يقل لما تضيف متغيرات.

السبب: الـ stack حجمه ثابت (حوالي 1MB افتراضيًا)، وكل نداء بيحجز frame فيه متغيراته. frame أكبر يبقى عدد أقل يدخل. كل نداء [[O(1)]] space، فعمق d بيكلّف [[O(d)]].

الغلطة المشهورة: تفتكر إن الرقم ده ثابت وتبني عليه كود. الحل مش إنك تكبّر الـ stack بـ [[--stack-size]]، الحل إنك تحوّل الـ recursion العميقة لـ loop أو stack صريح.`,
          solCode: R`let d = 0;
const f = () => { d++; f(); };
try { f(); } catch { console.log("small frame:", d); } // about 12500 on node 22 (varies by machine and version)
let d2 = 0;
const g = () => {
  d2++;
  let a = d2, b = a + 1, c = b + 1, e = c + 1, h = e + 1, i = h + 1, j = i + 1, k = j + 1;
  g();
  return a + b + c + e + h + i + j + k;
};
try { g(); } catch { console.log("big frame:", d2); } // about 7000: each frame holds more locals, so fewer fit
// each call is O(1) stack space, so depth d costs O(d); the total stack size is fixed (~1 MB by default)`
        },
        {
          cmd: "memoization",
          title: "fib(50) بالطريقة العادية بتاخد وقت طويل جدًا، خليها تطلع في لحظة",
          desc: R`memoization: خزّن نتيجة كل نداء في Map، ولو نفس المدخل اتطلب تاني رجّع المخزّن بدل ما تحسب. [[fib]] بتتحول من [[O(2^n)]] لـ [[O(n)]].

المشكلة في [[fibSlow]]: [[fib(50)]] بتنادي [[fib(49)]] و [[fib(48)]]، و [[fib(49)]] بتنادي [[fib(48)]] تاني، وهكذا. نفس القيم بتتحسب ملايين المرات. بالـ memo كل قيمة من 0 لـ n بتتحسب مرة واحدة بس.

ده أول خطوة في dynamic programming: recursion + cache = top-down DP.`,
          example: R`function fibSlow(n) {
  if (n < 2) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}
function fib(n, memo = new Map()) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const val = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, val);
  return val;
}
console.log(fibSlow(20)); // 6765
console.log(fib(50));     // 12586269025
// fibSlow: O(2^n) time; fib with memo: O(n) time, O(n) space (map + call stack)`,
          try: R`حط عدّاد نداءات في النسختين وقارن لـ n = 25 (حوالي ربع مليون نداء مقابل ٤٩). وبعدين اكتب [[memoize(fn)]] عامة: تاخد أي دالة ليها argument واحد وترجّع نسخة بـ cache. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[memoize]] وبتعدّ كام مرة الدالة الأصلية اتنادت.`,
          flag: "script",
          deep: {
            why: "فيه مسائل كتير الحل البديهي فيها recursion بتحسب نفس الحاجة مرات كتير: عدد الطرق، أقل تكلفة، هل ممكن. الـ memoization بتحوّلها من «مستحيل» لـ «فوري» بسطرين زيادة. وفي الشغل نفس الفكرة اسمها caching: [[useMemo]] في React، و cache لنتايج API.",
            how: R`ارسم شجرة النداءات لـ [[fibSlow(5)]]: fib(5) بتنادي fib(4) و fib(3). و fib(4) بتنادي fib(3) و fib(2). يعني fib(3) اتحسبت مرتين، و fib(2) تلات مرات. كل ما n تكبر، التكرار بيتضاعف: عدد النداءات حوالي 1.6^n.

مع الـ memo: أول مرة fib(3) تتحسب بتتخزّن. المرة التانية، [[memo.has(3)]] بترجّعها في [[O(1)]]. النتيجة إن كل رقم من 0 لـ 50 بيتحسب مرة واحدة، وكل واحد بيعمل نداءين، يعني حوالي 2n نداء: [[O(n)]].

ليه الـ memo بتتبعت كـ argument؟ عشان كل النداءات تشارك نفس الـ Map. لو عملت [[new Map()]] جوه جسم الدالة، كل نداء هيبدأ بـ cache فاضي.

الـ memo مش مجاني: [[O(n)]] ذاكرة للـ Map، و [[O(n)]] للـ call stack. والنسخة الـ bottom-up (loop من تحت لفوق) بتشيل الاتنين، ودي في درس «bottom-up DP (table)» في المستوى التالت.

ومش أي دالة ينفع يتعملها memo: لازم تكون pure، نفس المدخل يدّي نفس المخرج دايمًا، ومن غير side effects.`,
            when: "لما الـ recursion فيها نداءات متكررة لنفس المدخلات (overlapping subproblems). ارسم شجرة النداءات لـ n صغير: لو شفت نفس النداء مرتين، يبقى memo.",
            mistakes: R`إنك تحط [[new Map()]] جوه جسم الدالة فكل نداء يبدأ فاضي. وإنك تستخدم [[if (memo[n])]] مع object: لو القيمة المخزّنة 0 هتعتبرها مش موجودة وتحسب تاني، استخدم [[has]] أو [[in]]. وإنك تنسى إن الأرقام الكبيرة بتفقد دقة: بعد fib(78) الناتج بيعدّي [[Number.MAX_SAFE_INTEGER]]، ولو المطلوب رقم مضبوط استخدم BigInt.`
          },
          teach: R`## الفكرة في جملة

**memoization**: أول مرة تحسب نتيجة لمدخل معين، خزّنها في Map. لو نفس المدخل اتطلب تاني، رجّع المخزّن بدل ما تحسب من الأول. مع [[fib]] ده بيحوّل ملايين النداءات لـ 99 نداء بس.

**Fibonacci** (فيبوناتشي): كل رقم = مجموع الرقمين اللي قبله. 0، 1، 1، 2، 3، 5، 8، 13... يعني fib(0) = 0 و fib(1) = 1 و fib(n) = fib(n - 1) + fib(n - 2).

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا عدّادات و [[console.log]] جوه الدوال.

---

## ١. [[fibSlow]]: ليه بطيئة؟

~~~js
function fibSlow(n) {
  if (n < 2) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}
~~~

- [[if (n < 2) return n;]]: الـ base case. fib(0) = 0 و fib(1) = 1، يعني الإجابة هي n نفسها.
- [[fibSlow(n - 1) + fibSlow(n - 2)]]: كل نداء بيعمل **نداءين**. ودي المشكلة.

### عدّينا النداءات لـ [[fibSlow(5)]]

حطينا عدّاد لكل n:

| n | اتحسبت كام مرة |
|---|---|
| 5 | 1 |
| 4 | 1 |
| 3 | 2 |
| 2 | 3 |
| 1 | 5 |
| 0 | 3 |
| **المجموع** | **15 نداء** |

fib(3) اتحسبت مرتين، و fib(2) تلات مرات، بنفس النتيجة كل مرة. وكل ما n تكبر التكرار بيتضاعف تقريبًا: [[fibSlow(20)]] عملت 21891 نداء، و [[fibSlow(30)]] عملت 2692537 نداء (حوالي ٢.٧ مليون). عشان كده [[fibSlow(50)]] عمليًا مش هتخلص.

---

## ٢. [[fib]] مع الـ memo سطر سطر

~~~js
function fib(n, memo = new Map()) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const val = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, val);
  return val;
}
~~~

### [[memo = new Map()]] في الـ parameters

ده **default parameter**: لو اللي نادى الدالة مبعتش [[memo]]، اعمل Map جديدة. فـ [[fib(50)]] من برّا بتبدأ بـ Map فاضية، وكل النداءات اللي جوه بتبعت **نفس** الـ Map: [[fib(n - 1, memo)]]. كده الكل بيشارك نفس الـ cache.

### [[if (memo.has(n)) return memo.get(n);]]

اتحسبت قبل كده؟ رجّعها على طول، من غير أي نداء جديد. ولاحظ إننا بنسأل بـ [[has]] مش [[if (memo.get(n))]]: لو القيمة المخزّنة 0، [[get]] هترجع 0 والـ if هيعتبرها مش موجودة.

### [[const val = fib(n - 1, memo) + fib(n - 2, memo);]]

نفس معادلة فيبوناتشي، بس مع تمرير الـ memo.

### [[memo.set(n, val); return val;]]

خزّن النتيجة **قبل** ما ترجع، عشان أي نداء بعد كده يلاقيها.

---

## ٣. التتبع: [[fib(5)]]

~~~text الناتج (Node 24 على ويندوز)
fib(5)
  fib(4)
    fib(3)
      fib(2)
        fib(1) base -> 1
        fib(0) base -> 0
      set memo 2 = 1  memo=[[2,1]]
      fib(1) base -> 1
    set memo 3 = 2  memo=[[2,1],[3,2]]
    fib(2) memo hit -> 1
  set memo 4 = 3  memo=[[2,1],[3,2],[4,3]]
  fib(3) memo hit -> 2
set memo 5 = 5  memo=[[2,1],[3,2],[4,3],[5,5]]
5
~~~

| الخطوة | اللي حصل | الـ memo بعدها |
|---|---|---|
| 1 | النزول على الشمال لحد fib(1) و fib(0) | {} |
| 2 | fib(2) = 1 + 0 = 1 | {2: 1} |
| 3 | fib(3) = fib(2) + fib(1) = 1 + 1 = 2 | {2: 1, 3: 2} |
| 4 | fib(4) محتاجة fib(2): **موجودة**، مفيش نزول | |
| 5 | fib(4) = 2 + 1 = 3 | {2: 1, 3: 2, 4: 3} |
| 6 | fib(5) محتاجة fib(3): **موجودة** | |
| 7 | fib(5) = 3 + 2 = 5 | {2: 1, 3: 2, 4: 3, 5: 5} |

9 نداءات بدل 15. والفرق بيكبر جامد: كل رقم من 2 لـ n بيتحسب مرة واحدة وبيعمل نداءين، فالمجموع 2n - 1. عدّيناهم لـ [[fib(50)]] وطلعوا 99 نداء، وخلصت في 0.021ms.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
6765
12586269025
~~~

[[fibSlow(20)]] = 6765 لسه سريعة (21891 نداء)، و [[fib(50)]] = 12586269025 في لحظة.

---

## ٥. الـ Big-O وليه

| | الوقت | الذاكرة | السبب |
|---|---|---|---|
| fibSlow | [[O(2^n)]] | [[O(n)]] stack | كل نداء بيعمل اتنين، والشجرة بتتضاعف كل مستوى (بالظبط حوالي 1.6^n) |
| fib بالـ memo | [[O(n)]] | [[O(n)]] | كل n بتتحسب مرة، والـ Map فيها n قيمة، والـ stack بينزل n مستوى |

---

## الخلاصة

~~~text
المشكلة         نفس المدخل بيتحسب مرات كتير (overlapping subproblems)
الحل            Map: لو has(n) رجّع get(n)، غير كده احسب و set قبل الرجوع
الـ memo          بيتبعت مع كل نداء عشان الكل يشارك نفس الـ cache
has مش get      عشان القيم زي 0 متتحسبش تاني
النتيجة          O(2^n) بقت O(n): fib(50) بـ 99 نداء
~~~

> recursion + cache = **top-down dynamic programming**. هتشوفها تاني في مسائل «عدد الطرق» و «أقل تكلفة».`,
          lines: [
            "النسخة العادية.",
            "fib(0) = 0 و fib(1) = 1.",
            "كل نداء بيعمل نداءين، والشجرة بتتضاعف كل مستوى: O(2^n).",
            "قفلة.",
            "نفس الدالة ومعاها Map بتتبعت مع كل نداء.",
            "نفس الـ base case.",
            "اتحسبت قبل كده؟ رجّعها على طول.",
            "احسبها مرة واحدة.",
            "خزّنها قبل ما ترجع.",
            "رجّعها.",
            "قفلة.",
            "20 لسه سريعة حتى من غير memo (حوالي ٢٢ ألف نداء).",
            "50 في أقل من ملّي ثانية. من غير memo كانت هتاخد عشرات المليارات من النداءات."
          ],
          sol: R`لـ n = 25: النسخة البطيئة بتعمل 242785 نداء، ونسخة الـ memo بتعمل 49 بس، والاتنين بيرجّعوا 75025. الـ 49 جاية من إن كل n من 2 لـ 25 بتتحسب مرة، وكل واحدة بتنادي اتنين.

[[memoize(fn)]]: بترجّع دالة جديدة معاها Map، لو الـ argument موجود ترجّع القيمة المتخزنة، ولو لأ تنادي [[fn]] وتخزّن النتيجة. تتأكد إنها شغالة لو دالة زي [[square]] اتنادت مرتين بـ 9 واتنفذت مرة واحدة بس. ولـ fib، الدالة لازم تنادي النسخة الـ memoized نفسها ([[fibM(n - 1)]])، فـ [[fibM(50)]] بتطلع 12586269025 على طول.

الغلطة المشهورة: [[const fast = memoize(fibSlow)]]. النداء الأول بيتخزن، بس [[fibSlow]] جواها بتنادي نفسها مش النسخة الـ memoized، فبتفضل بطيئة. وغلطة تانية: [[if (cache.get(x))]] بدل [[has]]، فالقيم زي 0 مش هتتخزن أبدًا.`,
          solCode: R`let slowCalls = 0, memoCalls = 0;
function fibSlow(n) {
  slowCalls++;
  if (n < 2) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}
function fib(n, memo = new Map()) {
  memoCalls++;
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const val = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, val);
  return val;
}
console.log(fibSlow(25), slowCalls); // 75025 242785
console.log(fib(25), memoCalls);     // 75025 49
function memoize(fn) {
  const cache = new Map();
  return x => {
    if (cache.has(x)) return cache.get(x);
    const val = fn(x);
    cache.set(x, val);
    return val;
  };
}
const fibM = memoize(n => (n < 2 ? n : fibM(n - 1) + fibM(n - 2)));
console.log(fibM(50)); // 12586269025
let squareRuns = 0;
const square = memoize(x => { squareRuns++; return x * x; });
console.log(square(9), square(9), squareRuns); // 81 81 1
// fibSlow: O(2^n) time; memo: O(n) time, O(n) space`,
          check: {
            lang: "js",
            starter: R`function memoize(fn) {
  const cache = new Map();
  // رجّع دالة جديدة: لو الـ argument في الـ cache رجّع قيمته، وإلا نادي fn وخزّن
}`,
            tests: R`test("بترجّع نفس نتايج الدالة الأصلية", () => {
  const sq = memoize(x => x * x);
  expect([sq(9), sq(3), sq(9)]).toEqual([81, 9, 81]);
});
test("الدالة الأصلية بتتنادي مرة واحدة لنفس الـ argument", () => {
  let calls = 0;
  const f = memoize(x => { calls++; return x * 2; });
  f(9); f(9); f(9);
  expect(calls).toBe(1);
});
test("بتخزّن النتايج falsy زي 0 و undefined (افحص بـ has مش get)", () => {
  let calls = 0;
  const f = memoize(x => { calls++; return x === 1 ? 0 : undefined; });
  f(1); f(1); f(2); f(2);
  expect(calls).toBe(2);
});
test("كل دالة memoized ليها cache لوحدها", () => {
  const a = memoize(x => x + 1), b = memoize(x => x + 100);
  expect([a(1), b(1)]).toEqual([2, 101]);
});
test("fibM(78) بتنادي النسخة الـ memoized نفسها فبتخلص في لحظة (O(n) بدل O(2^n))", () => {
  const fibM = memoize(n => (n < 2 ? n : fibM(n - 1) + fibM(n - 2)));
  expect(fibM(78)).toBe(8944394323791464);
});`,
            solution: R`function memoize(fn) {
  const cache = new Map();
  return x => {
    if (cache.has(x)) return cache.get(x);
    const value = fn(x);
    cache.set(x, value);
    return value;
  };
}`
          }
        },
        {
          cmd: "prefix sum",
          title: "مجموع أي جزء من array بين l و r في O(1)، بعد تجهيز مرة واحدة",
          desc: R`اعمل array تانية [[pre]] كل خانة فيها مجموع أول i عناصر. بعدها مجموع أي جزء من l لـ r = [[pre[r + 1] - pre[l]]]. التجهيز [[O(n)]] مرة واحدة، وكل سؤال بعد كده [[O(1)]].

من غيرها، كل سؤال بيعمل loop على الجزء: q سؤال × n = [[O(q × n)]]. بالـ prefix sum بقت [[O(n + q)]].

الـ [[pre]] أطول من الـ array بواحد وبتبدأ بـ 0، عشان الجزء اللي بيبدأ من أول الـ array ميحتاجش if.`,
          example: R`function buildPrefix(a) {
  const pre = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) pre[i + 1] = pre[i] + a[i];
  return pre;
}
const rangeSum = (pre, l, r) => pre[r + 1] - pre[l];
const a = [3, -1, 4, 1, 5, 9];
const pre = buildPrefix(a);
console.log(pre);                 // [0, 3, 2, 6, 7, 12, 21]
console.log(rangeSum(pre, 1, 3)); // 4
console.log(rangeSum(pre, 0, 5)); // 21
console.log(rangeSum(pre, 4, 4)); // 5
// build: O(n) time and O(n) space, then every query is O(1)`,
          try: R`حل «عدد الأجزاء المتصلة اللي مجموعها k» ([1, 2, 3] و k = 3 الإجابة 2): وانت بتجمّع، خزّن في Map كل مجموع شفته كام مرة، واسأل «[[sum - k]] ظهر كام مرة قبل كده؟». ده prefix sum مع hash map، وبيشتغل مع الأرقام السالبة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[subarraySum(nums, k)]] بترجّع عدد الأجزاء المتصلة اللي مجموعها k.`,
          flag: "script",
          deep: {
            why: "لما عندك أسئلة كتير على نفس البيانات (مجموع المبيعات من يوم لـ يوم، عدد الزيارات في فترة)، الحساب من الأول كل مرة بيضيّع وقت. التجهيز مرة واحدة ودفع شوية ذاكرة بيخلّي كل سؤال فوري. وهو أساس مسائل «subarray sum» كلها.",
            how: R`dry run على [3, -1, 4, 1, 5, 9]:

pre = [0, 3, 2, 6, 7, 12, 21]. يعني pre عند 4 = 7 = 3 + (-1) + 4 + 1.

مجموع من 1 لـ 3 = pre عند 4 ناقص pre عند 1 = 7 - 3 = 4. ليه؟ pre عند 4 فيه أول ٤ عناصر، و pre عند 1 فيه أول عنصر بس، والفرق هو العناصر من 1 لـ 3.

الـ off-by-one أكتر حاجة بتبوّظ هنا، لأن [[pre]] متأخرة خانة عن الـ array. خلي في دماغك قاعدة واحدة ثابتة: «[[pre[i]]] = مجموع أول i عنصر»، والباقي بيطلع منها.

نفس الفكرة في 2D: كل خانة فيها مجموع المستطيل من الركن لحد عندها، وأي مستطيل مجموعه بيطلع من ٤ خانات. وفيه أخ ليها اسمه difference array، لو عايز تزوّد قيمة على range كامل مرات كتير.

والـ try (subarray sum equals k): لو المجموع لحد دلوقتي sum، وفيه جزء متصل بيخلص هنا مجموعه k، يبقى فيه prefix قبل كده مجموعه [[sum - k]]. فالـ Map بتعدّ الـ prefixes. ده [[O(n)]] وبيشتغل مع السالب، عكس الـ sliding window اللي محتاج أرقام موجبة.`,
            when: "أسئلة كتير على مجموع ranges في بيانات مش بتتغير. لو البيانات بتتغير كتير، الـ prefix لازم يتبني من جديد مع كل تعديل، ووقتها فيه هياكل تانية (Fenwick tree أو segment tree).",
            mistakes: R`off-by-one: [[pre[r] - pre[l]]] بدل [[pre[r + 1] - pre[l]]] (بيشيل آخر عنصر). وإنك تبني الـ prefix جوه كل سؤال فترجع [[O(n)]] لكل سؤال. وإنك تنسى إن مجموع أرقام كبيرة ممكن يعدّي [[Number.MAX_SAFE_INTEGER]]. والـ edge cases: array فاضية (pre = [0])، و l = r، و l = 0.`
          },
          teach: R`## الفكرة في جملة

جهّز مرة واحدة array اسمها [[pre]] (اختصار prefix، يعني «البادئة»)، كل خانة [[pre[i]]] فيها **مجموع أول i عنصر**. بعدها مجموع أي جزء من l لـ r = [[pre[r + 1] - pre[l]]]: عملية طرح واحدة، مهما الجزء طويل.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الحالة.

---

## ١. [[buildPrefix]] سطر سطر

~~~js
function buildPrefix(a) {
  const pre = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) pre[i + 1] = pre[i] + a[i];
  return pre;
}
~~~

### [[new Array(a.length + 1).fill(0)]]

- [[new Array(5)]]: array طولها 5 بس خاناتها فاضية. جرّبنا [[new Array(3)]] وطلعت [[[ <3 empty items> ]]].
- [[.fill(0)]]: املا كل الخانات بـ 0، فبقت [[[ 0, 0, 0 ]]].
- ليه الطول [[a.length + 1]]؟ لأن [[pre[0]]] معناها «مجموع أول 0 عنصر» = 0. الخانة الزيادة دي هي اللي بتخلّي الجزء اللي بيبدأ من أول الـ array ميحتاجش [[if]].

### [[pre[i + 1] = pre[i] + a[i];]]

مجموع أول i + 1 عنصر = مجموع أول i عنصر + العنصر رقم i. يعني كل خانة = اللي قبلها + عنصر جديد. ولاحظ إن [[pre]] متأخرة خانة عن [[a]]: العنصر [[a[i]]] بيدخل في [[pre[i + 1]]].

### التتبع على [[[2, 7, -3, 5]]]

| i | a[i] | الحساب | pre بعد اللفة |
|---|---|---|---|
| البداية | | | [0, 0, 0, 0, 0] |
| 0 | 2 | pre[1] = 0 + 2 = 2 | [0, 2, 0, 0, 0] |
| 1 | 7 | pre[2] = 2 + 7 = 9 | [0, 2, 9, 0, 0] |
| 2 | -3 | pre[3] = 9 + (-3) = 6 | [0, 2, 9, 6, 0] |
| 3 | 5 | pre[4] = 6 + 5 = 11 | [0, 2, 9, 6, 11] |

آخر خانة (11) = مجموع الـ array كلها. والرقم السالب عادي: المجموع نزل من 9 لـ 6.

---

## ٢. [[rangeSum]]: ليه الطرح بيشتغل؟

~~~js
const rangeSum = (pre, l, r) => pre[r + 1] - pre[l];
~~~

arrow function بتاخد الـ [[pre]] وحدود الجزء l و r (الاتنين داخلين). على [[pre = [0, 2, 9, 6, 11]]]:

| السؤال | الحساب | الناتج | تأكيد يدوي |
|---|---|---|---|
| rangeSum(pre, 1, 2) | pre[3] - pre[1] = 6 - 2 | 4 | 7 + (-3) = 4 |
| rangeSum(pre, 0, 3) | pre[4] - pre[0] = 11 - 0 | 11 | الكل |
| rangeSum(pre, 2, 2) | pre[3] - pre[2] = 6 - 9 | -3 | عنصر واحد |
| rangeSum(pre, 0, 0) | pre[1] - pre[0] = 2 - 0 | 2 | أول عنصر |

~~~text الناتج (Node 24 على ويندوز)
4 11 -3 2
~~~

الفكرة: [[pre[r + 1]]] فيها العناصر من 0 لـ r. و [[pre[l]]] فيها العناصر من 0 لـ l - 1. لما تطرح، اللي من 0 لـ l - 1 بيروح، ويفضل من l لـ r بالظبط.

ولو كتبت [[pre[r] - pre[l]]] (من غير + 1) هتشيل آخر عنصر من الجزء. دي أشهر غلطة هنا. احفظ قاعدة واحدة بس: «[[pre[i]]] = مجموع أول i عنصر»، والباقي بيطلع منها.

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[
  0,  3,  2, 6,
  7, 12, 21
]
4
21
5
~~~

Node بيطبع الـ array الطويلة على كذا سطر، بس هي [[[0, 3, 2, 6, 7, 12, 21]]]. و [[rangeSum(pre, 1, 3)]] = 7 - 3 = 4، و [[(pre, 0, 5)]] = 21 - 0، و [[(pre, 4, 4)]] = 12 - 7 = 5.

وجرّبنا [[buildPrefix([])]]: الـ loop مبيلفّش، والناتج [[[ 0 ]]].

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| التجهيز | [[O(n)]] وقت، [[O(n)]] ذاكرة | لفة واحدة، و array طولها n + 1 |
| كل سؤال | [[O(1)]] | قراية خانتين وطرح |
| q سؤال من غير prefix | [[O(q × n)]] | كل سؤال بيلف على الجزء |
| q سؤال بالـ prefix | [[O(n + q)]] | تجهيز مرة + q × O(1) |

---

## الخلاصة

~~~text
pre[i]          مجموع أول i عنصر، و pre[0] = 0
الطول           a.length + 1
البناء          pre[i + 1] = pre[i] + a[i]
مجموع l..r       pre[r + 1] - pre[l]
الـ Big-O       O(n) مرة واحدة، وبعدها O(1) لكل سؤال
~~~

> الـ prefix sum بيشتغل مع الأرقام السالبة عادي، ودي ميزته الكبيرة على الـ sliding window اللي هتشوفه بعدين.`,
          lines: [
            "تجهيز: مرة واحدة.",
            "array أطول بواحد، كلها أصفار. الخانة i = مجموع أول i عناصر.",
            "كل خانة = اللي قبلها + العنصر الجديد.",
            "رجّعها.",
            "قفلة.",
            "مجموع من l لـ r (شاملين الاتنين): أول r+1 عنصر ناقص أول l عنصر.",
            "array فيها رقم سالب عادي.",
            "جهّز مرة.",
            "أول خانة 0، وآخر خانة مجموع الكل.",
            "من index 1 لـ 3: -1 + 4 + 1.",
            "الـ array كلها.",
            "جزء فيه عنصر واحد."
          ],
          sol: R`ابدأ الـ Map بـ [[[[0, 1]]]] (مجموع 0 ظهر مرة قبل ما تبدأ)، وكل عنصر: زوّد [[sum]]، وضيف للعدّاد [[seen.get(sum - k) || 0]]، وبعدين سجّل [[sum]]. النتايج: [1, 2, 3] مع 3 تطلع 2، و [1, 1, 1] مع 2 تطلع 2، و [1, -1, 0] مع 0 تطلع 3. الحل [[O(n)]] time و [[O(n)]] space.

ليه [[sum - k]]؟ لو المجموع لحد هنا [[sum]]، وفيه مكان قبل كده المجموع كان [[sum - k]]، يبقى اللي بينهم مجموعه k بالظبط.

الغلطة المشهورة: تنسى [[[0, 1]]] فتضيع كل جزء بيبدأ من أول الـ array (الإجابة تطلع 1 بدل 2 في أول مثال). وغلطة تانية: تحاول sliding window، ودي بتبوظ مع الأرقام السالبة.`,
          solCode: R`function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}
console.log(subarraySum([1, 2, 3], 3));    // 2  ([1, 2] and [3])
console.log(subarraySum([1, 1, 1], 2));    // 2
console.log(subarraySum([1, -1, 0], 0));   // 3  ([1, -1], [0], [1, -1, 0])
console.log(subarraySum([3, 4, -7], 0));   // 1
// O(n) time, O(n) space`,
          check: {
            lang: "js",
            starter: R`function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  // لكل عنصر: زوّد sum، وضيف seen.get(sum - k)، وبعدين سجّل sum
  return count;
}`,
            tests: R`test("([1, 2, 3], 3) ← 2", () => expect(subarraySum([1, 2, 3], 3)).toBe(2));
test("([1, 1, 1], 2) ← 2", () => expect(subarraySum([1, 1, 1], 2)).toBe(2));
test("أصفار وسالب: ([1, -1, 0], 0) ← 3", () => expect(subarraySum([1, -1, 0], 0)).toBe(3));
test("سالب في النص: ([2, -1, 1, 2], 2) ← 4 (sliding window كانت هتغلط)", () => expect(subarraySum([2, -1, 1, 2], 2)).toBe(4));
test("([], 0) ← 0", () => expect(subarraySum([], 0)).toBe(0));
test("3000 رقم عشوائي من -5 لـ 5، مقارنة بالـ brute force O(n^2)", () => {
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) % 11 - 5;
  const a = Array.from({ length: 3000 }, rnd);
  let want = 0;
  for (let i = 0; i < a.length; i++) { let s = 0; for (let j = i; j < a.length; j++) { s += a[j]; if (s === 3) want++; } }
  expect(subarraySum(a, 3)).toBe(want);
});`,
            solution: R`function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}`
          }
        }
      ]
    }
]);
