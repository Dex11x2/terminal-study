// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "حل المسائل والتمرين",
      l: 3,
      n: "إطار ثابت لأي مسألة في الانترفيو، وخطة تمرين: مسائل متدرجة لكل نمط، وجلسات بتايمر، ومراجعة اللي وقعت فيه",
      items: [
        {
          cmd: "interview framework",
          title: "مسألة جديدة قدامك في الانترفيو: تعمل إيه بالترتيب؟",
          desc: R`الإنترفيوير بيقيّم طريقة وصولك للحل قد الحل نفسه. الخطوات دي بتضمن إنك متقعدش ساكت، ومتكتبش كود لمسألة غير اللي اتسألت. (الجانب الكلامي والتواصل مشروح في «تاب الانترفيو»، درس «clarify → examples → brute → optimize → test». هنا بنطبّقه على كود.)

١. clarify (٢-٣ دقايق): اسأل عن الـ input: فاضي ممكن؟ أرقام سالبة؟ تكرار؟ مترتب؟ الحجم قد إيه؟ (n ≤ 20 غالبًا exponential مقبول، و n ≤ 10^5 محتاج [[O(n log n)]] أو أحسن.) والـ output: أرجّع إيه لو مفيش إجابة؟

٢. examples (٢-٣ دقايق): اكتب مثال عادي، ومثال edge (فاضي، عنصر واحد، كله متكرر)، وحلهم بإيدك. دول هيبقوا الـ tests بعدين.

٣. brute force (دقيقتين): قول أبسط حل وقيمته Big-O، حتى لو بطيء. ده بيثبت إنك فاهم المسألة، وبيدّيك حاجة ترجع لها لو اتزنقت.

٤. optimize (٥-١٠ دقايق): فين الشغل المتكرر؟ قارن بالأنماط: hash map، two pointers، sliding window، sort، binary search، heap، BFS/DFS، DP. قول الـ Big-O المتوقعة قبل ما تكتب.

٥. code (١٥-٢٠ دقيقة): أسماء واضحة، ودوال صغيرة، واتكلم وانت بتكتب.

٦. test: مشّي الأمثلة بإيدك على الكود نفسه (مش على اللي في دماغك)، وبعدين الـ edge cases.

٧. complexity: وقت وذاكرة، وليه. واذكر trade-off لو فيه.`,
          example: R`// 1. Clarify: unsorted ints, may repeat, may be empty -> 0. Longest run of consecutive values.
// 2. Examples: [100, 4, 200, 1, 3, 2] -> 4 (1 2 3 4); [] -> 0; [1, 2, 0, 1] -> 3
// 3. Brute force: sort, then count runs. O(n log n)
function longestBrute(nums) {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  let best = 0, run = 0;
  for (let i = 0; i < sorted.length; i++) {
    run = i > 0 && sorted[i] === sorted[i - 1] + 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}
// 4. Optimize: a Set gives O(1) lookups; only start counting at the start of a run
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue;
    let len = 1;
    while (set.has(x + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}
// 6. Test: the examples + edge cases, against the brute force
const tests = [{ input: [100, 4, 200, 1, 3, 2], want: 4 }, { input: [], want: 0 }, { input: [1, 2, 0, 1], want: 3 }, { input: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], want: 9 }, { input: [-2, -1, 5], want: 2 }];
const results = tests.map(({ input, want }) => longestConsecutive(input) === want && longestBrute(input) === want);
console.log(results.every(Boolean) ? "all passed" : results); // all passed
// 7. Complexity: brute O(n log n) time; optimized O(n) time (each run is walked once, from its start), O(n) space`,
          try: R`طبّق الـ ٧ خطوات على «Product of Array Except Self» بتايمر ٣٠ دقيقة وبصوت عالي: array، رجّع array كل خانة فيها حاصل ضرب كل العناصر ما عدا اللي في مكانها، من غير قسمة، في [[O(n)]]. [[[1, 2, 3, 4]]] → [[[24, 12, 8, 6]]]. اكتب الـ clarify والـ examples كـ comments الأول، وبعدين brute force، وبعدين الحل الأحسن، وقارن الاتنين على الأمثلة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[productExceptSelf(nums)]] بالحل الـ [[O(n)]].`,
          sol: R`clarify: فيه أصفار؟ (مهم جدًا: القسمة كانت هتقع). أرقام سالبة؟ الطول ≥ 2؟ ممكن الناتج يعدّي حدود الأرقام؟

examples: [[[1, 2, 3, 4]]] → [[[24, 12, 8, 6]]]، و [[[-1, 1, 0, -3, 3]]] → [[[0, 0, 9, 0, 0]]] (صفر واحد: كل الخانات صفر ما عدا مكانه)، و [[[0, 0]]] → [[[0, 0]]].

brute force: لكل i، loop يضرب الباقي. [[O(n^2)]].

optimize: الإجابة عند i = (حاصل ضرب كل اللي على شماله) × (كل اللي على يمينه). ده prefix و suffix (زي درس «prefix sum» بس ضرب). لفة من الشمال تكتب الـ prefix في الناتج، ولفة من اليمين تضرب في suffix متراكم في متغير. [[O(n)]] وقت، و [[O(1)]] ذاكرة زيادة (غير الناتج).

الأخطاء اللي بتتكرر: الحل بالقسمة (بيقع مع الصفر)، ونسيان إن [[-0]] بيطلع في JavaScript لما تضرب صفر في سالب ([[Object.is(-0, 0)]] false، بس [[-0 === 0]] true، فالـ tests بـ [[===]] بتعدّي). ولو خلصت في أقل من ٣٠ دقيقة، قول الـ follow-up لوحدك: «لو مسموح بالقسمة، هتعامل مع الأصفار إزاي؟».`,
          solCode: R`// Brute force: O(n^2)
const productBrute = nums => nums.map((_, i) => nums.reduce((p, x, j) => (j === i ? p : p * x), 1));
// Optimized: prefix products left to right, then suffix products right to left. O(n) time, O(1) extra space
function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) out[i] = out[i - 1] * nums[i - 1];
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= nums[i];
  }
  return out;
}
const tests = [[[1, 2, 3, 4], [24, 12, 8, 6]], [[-1, 1, 0, -3, 3], [0, 0, 9, 0, 0]], [[0, 0], [0, 0]], [[2, 3], [3, 2]]];
for (const [input, want] of tests) {
  const a = productExceptSelf(input), b = productBrute(input);
  console.log(a.every((x, i) => x === want[i]) && b.every((x, i) => x === want[i]) ? "ok" : "FAIL", a.join(" "));
}
// ok 24 12 8 6 / ok 0 0 9 0 0 / ok 0 0 / ok 3 2`,
          flag: "script",
          deep: {
            why: "أغلب الناس بتفشل في الانترفيو مش عشان مش عارفة الحل، لكن عشان بدأت تكتب على طول، وحلّت مسألة غير المطلوبة، أو اتزنقت في النص وسكتت، أو قالت «خلصت» والكود فيه bug في أول مثال. الإطار الثابت بيحميك من الـ ٤ دول، وبيدّي الإنترفيوير فرص يساعدك (hints) في الوقت الصح.",
            how: R`المثال مكتوب بنفس الترتيب اللي هتقوله: الـ clarify والـ examples comments فوق، وبعدين brute force، وبعدين optimize مع جملة بتقول الفكرة، وبعدين tests بتقارن الاتنين.

الفكرة في [[longestConsecutive]]: الحل البديهي بعد الـ Set: من كل رقم، عدّ لقدام طول ما [[x + 1]] موجود. ده ممكن يبقى [[O(n^2)]] (كل رقم في run طويل هيعدّ الـ run من عنده). الحيلة: متبدأش تعدّ غير من «بداية run» (رقم ملوش [[x - 1]]). فكل run بيتمشي مرة واحدة، والإجمالي [[O(n)]] حتى مع الـ while الداخلي.

ده بالظبط نوع الجملة اللي الإنترفيوير عايز يسمعها في خطوة ٧: «فيه loop جوه loop، بس الـ inner loop بيتنفذ مرة واحدة لكل عنصر في الإجمالي، فـ amortized [[O(n)]]».

الـ brute force بيفضل مفيد بعد ما تلاقي الحل الأحسن: قارن الاتنين على inputs عشوائية كتير. لو اختلفوا في أي حالة، فيه bug. ده اسمه stress testing، وبيتعمل في المسابقات والشغل.

توزيع الوقت في انترفيو ٤٥ دقيقة: حوالي ٥ للتعارف، و ٣٠-٣٥ للمسألة (زي التقسيم اللي في الشرح)، و ٥ لأسئلتك. لو عدّت ١٠ دقايق في optimize من غير فكرة، اكتب الـ brute force وقول «هحسّنه لو فضل وقت».`,
            when: "في كل مسألة، حتى السهلة. في المسألة السهلة الـ clarify والـ examples بياخدوا دقيقة، بس بيبيّنوا إنك منظم. وفي الـ online assessment (من غير إنترفيوير) نفس الخطوات بس في دماغك، والـ examples بتبقى test cases بتجرّبها قبل الـ submit.",
            mistakes: R`تبدأ تكتب قبل الـ clarify. تسكت أكتر من دقيقة (قول «بفكر في hash map عشان...»). تتمسك بفكرة optimize مش ماشية بدل ما تكتب brute force. تقول «خلصت» من غير ما تمشّي مثال على الكود. تقول Big-O غلط (أو ماتقولهاش خالص). وفي الآخر، متسألش أسئلة للإنترفيوير عن الشغل (درس «أسئلتك للإنترفيوير» في «تاب الانترفيو»).`
          },
          teach: R`## الفكرة في جملة

الدرس ده عن **الترتيب** اللي بتشتغل بيه في الانترفيو، والمثال مكتوب بنفس الترتيب: الـ clarify والـ examples كـ comments، وبعدين حل brute force، وبعدين الحل الأحسن، وبعدين tests بتقارن الاتنين. المسألة اللي في المثال: «أطول سلسلة أرقام متتالية» (Longest Consecutive Sequence).

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الدالتين. هنتتبع على input جديد: [[[9, 1, 4, 7, 3, 2, 8, 3]]] (فيه 1 2 3 4، و 7 8 9، والـ 3 متكررة).

---

## ١. خطوة ١ و ٢: الـ comments اللي فوق

~~~js
// 1. Clarify: unsorted ints, may repeat, may be empty -> 0. Longest run of consecutive values.
// 2. Examples: [100, 4, 200, 1, 3, 2] -> 4 (1 2 3 4); [] -> 0; [1, 2, 0, 1] -> 3
~~~

قبل أي كود: الأرقام مش مترتبة، وممكن تتكرر، والـ array الفاضية إجابتها 0. والأمثلة متحلولة بالإيد، ومنها مثال edge (فاضي) ومثال فيه تكرار ([[[1, 2, 0, 1]]] = 3 مش 4، لأن الـ 1 المكررة متعدش مرتين). الأمثلة دي هي نفسها اللي هتبقى tests في الآخر.

---

## ٢. خطوة ٣: [[longestBrute]]

~~~js
const sorted = [...new Set(nums)].sort((a, b) => a - b);
let best = 0, run = 0;
for (let i = 0; i < sorted.length; i++) {
  run = i > 0 && sorted[i] === sorted[i - 1] + 1 ? run + 1 : 1;
  best = Math.max(best, run);
}
~~~

- [[new Set(nums)]] بيشيل التكرار، و [[[...set]]] بيرجّعه array عشان نعمل [[sort]]. جرّبنا: [[[...new Set([3, 1, 3])]]] = [[[3, 1]]].
- [[run]]: طول السلسلة اللي احنا فيها. لو الرقم = اللي قبله + 1، كمّل ([[run + 1]])، غير كده ابدأ سلسلة جديدة من 1. و [[i > 0 &&]] عشان أول عنصر ملوش قبله.
- [[best]]: أطول [[run]] شفناه.

| i | الرقم | [[run]] | [[best]] |
|---|---|---|---|
| | بعد الـ Set والـ sort: [1, 2, 3, 4, 7, 8, 9] | | |
| 0 | 1 | 1 | 1 |
| 1 | 2 | 2 | 2 |
| 2 | 3 | 3 | 3 |
| 3 | 4 | 4 | 4 |
| 4 | 7 | 1 (7 ≠ 4 + 1) | 4 |
| 5 | 8 | 2 | 4 |
| 6 | 9 | 3 | 4 |

الإجابة 4، والوقت [[O(n log n)]] بسبب الـ sort.

---

## ٣. خطوة ٤: [[longestConsecutive]]

~~~js
const set = new Set(nums);
let best = 0;
for (const x of set) {
  if (set.has(x - 1)) continue;
  let len = 1;
  while (set.has(x + len)) len++;
  best = Math.max(best, len);
}
~~~

- [[Set]]: [[has]] بتاخد [[O(1)]] في المتوسط، ومفيهاش تكرار.
- [[for (const x of set)]]: على الـ Set مش الـ array، فالـ 3 المكررة بتتلف مرة واحدة.
- [[if (set.has(x - 1)) continue;]]: لو [[x - 1]] موجود، يبقى x مش **بداية** سلسلة، وهيتعد لما نوصل لبدايتها. فوّته.
- من البداية بس: عدّ لقدام طول ما [[x + len]] موجود.

| x | [[x - 1]] موجود؟ | اللي حصل | [[best]] |
|---|---|---|---|
| 9 | 8 موجود | مش بداية، فوّت | 0 |
| 1 | 0 مش موجود | بداية: 1، 2، 3، 4، و 5 مش موجود: len = 4 | 4 |
| 4 | 3 موجود | فوّت | 4 |
| 7 | 6 مش موجود | بداية: 7، 8، 9: len = 3 | 4 |
| 3 | 2 موجود | فوّت | 4 |
| 2 | 1 موجود | فوّت | 4 |
| 8 | 7 موجود | فوّت | 4 |

نفس الإجابة 4. ولاحظ إن الـ [[while]] اشتغلت مرتين بس (من 1 ومن 7)، وكل رقم اتعدّ جوه سلسلة مرة واحدة. عدّينا كل نداءات [[has]]: 14 لـ 7 أرقام مختلفة.

ليه الـ [[continue]] هو اللي بيعمل الفرق؟ من غيره، كل رقم هيعدّ لقدام من عنده: 1 يعدّ 4، و 2 يعدّ 3، و 3 يعدّ 2... ومع سلسلة طولها n ده [[O(n^2)]].

---

## ٤. خطوة ٦: الـ tests

~~~js
const tests = [{ input: [100, 4, 200, 1, 3, 2], want: 4 }, ...];
const results = tests.map(({ input, want }) => longestConsecutive(input) === want && longestBrute(input) === want);
console.log(results.every(Boolean) ? "all passed" : results);
~~~

- كل test object فيه [[input]] و [[want]] (الإجابة المتوقعة). و [[({ input, want })]] بتفك الـ object في البارامترات.
- [[map]] بيرجّع [[true]] أو [[false]] لكل test: الحلين الاتنين لازم يدّوا الإجابة.
- [[every(Boolean)]]: [[Boolean]] هنا دالة بتحوّل القيمة لـ true/false، و [[every]] بترجّع [[true]] لو كل العناصر [[true]]. جرّبنا [[[true, true, false].every(Boolean)]] = [[false]].
- لو كله نجح اطبع [["all passed"]]، غير كده اطبع الـ array كلها عشان تعرف أنهي test وقع.

مقارنة الحل السريع بالـ brute force كده اسمها stress testing: الـ brute force بطيء بس سهل يبقى صح، فبيبقى «المرجع».

---

## ٥. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
all passed
~~~

الـ 5 tests عدّوا بالحلين: العادي، والفاضي، والتكرار، وسلسلة طولها 9 (الأرقام من 0 لـ 8 بترتيب ملخبط)، وأرقام سالبة ([[[-2, -1, 5]]] = 2).

---

## ٦. خطوة ٧: الـ Big-O وليه

| الحل | الوقت | الذاكرة | السبب |
|---|---|---|---|
| [[longestBrute]] | [[O(n log n)]] | [[O(n)]] | الـ sort، والـ Set والنسخة |
| [[longestConsecutive]] | [[O(n)]] | [[O(n)]] | loop جوه loop، بس الـ [[while]] بتمشي على كل رقم مرة واحدة في الإجمالي (من بداية سلسلته بس) |

دي الجملة اللي الانترفيوير عايز يسمعها: «فيه loop جوه loop، بس الداخلي بيتنفذ مرة لكل عنصر في الإجمالي، فـ [[O(n)]]».

---

## الخلاصة

~~~text
1 clarify      الـ input فاضي؟ متكرر؟ مترتب؟ حجمه؟ والـ output لو مفيش إجابة؟
2 examples     عادي + edge، محلولين بالإيد
3 brute        أبسط حل وقيمته Big-O
4 optimize     فين الشغل المتكرر؟ (هنا: الـ Set + ابدأ من بداية السلسلة بس)
5 code         أسماء واضحة، واتكلم وانت بتكتب
6 test         الأمثلة على الكود نفسه، وقارن بالـ brute force
7 complexity   وقت وذاكرة، وليه
~~~

> الـ brute force مش مضيعة وقت: بيثبت إنك فاهم المسألة، وبيبقى المرجع اللي بتختبر بيه الحل الأحسن.`,
          lines: [
            "الـ brute force: رتّب بعد ما تشيل المكرر.",
            "نسخة من غير تكرار ومترتبة.",
            "أطول run، والـ run الحالي.",
            "على الأرقام المترتبة.",
            "الرقم بعد اللي قبله بواحد؟ كمّل الـ run، غير كده ابدأ من 1.",
            "حدّث الأطول.",
            "قفلة.",
            "الإجابة.",
            "قفلة.",
            "الحل الأحسن.",
            "Set: بحث في O(1) ومن غير تكرار.",
            "الأطول.",
            "لكل رقم (مرة واحدة حتى لو متكرر).",
            "مش بداية run: فوّت، هيتعد من بدايته.",
            "من البداية.",
            "عدّ لقدام.",
            "حدّث.",
            "قفلة.",
            "الإجابة.",
            "قفلة.",
            "الأمثلة والـ edge cases: الـ input والإجابة المتوقعة.",
            "كل test: الحلين لازم يدّوا الإجابة.",
            "لو كله نجح اطبع كده، غير كده اطبع أنهي فشل."
          ],
          check: {
            lang: "js",
            starter: R`function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  // لفة من الشمال تكتب الـ prefix، ولفة من اليمين تضرب في suffix متراكم
  return out;
}`,
            tests: R`const noNegZero = a => a.map(x => x + 0);
test("[1, 2, 3, 4] ← [24, 12, 8, 6]", () => expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]));
test("صفر واحد: [-1, 1, 0, -3, 3] ← [0, 0, 9, 0, 0] (القسمة كانت هتقع)", () => expect(noNegZero(productExceptSelf([-1, 1, 0, -3, 3]))).toEqual([0, 0, 9, 0, 0]));
test("صفرين ← كله صفر", () => expect(noNegZero(productExceptSelf([0, 0]))).toEqual([0, 0]));
test("[2, 3] ← [3, 2]", () => expect(productExceptSelf([2, 3])).toEqual([3, 2]));
test("3000 رقم (O(n)، الـ brute force O(n^2))", () => {
  const a = Array.from({ length: 3000 }, (_, i) => (i % 7 === 0 ? -1 : 1));
  const neg = a.filter(x => x < 0).length;
  const r = productExceptSelf(a);
  expect([r[0], r[1]]).toEqual([(-1) ** (neg - 1), (-1) ** neg]);
});`,
            solution: R`function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) out[i] = out[i - 1] * nums[i - 1];
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= nums[i];
  }
  return out;
}`
          }
        },
        {
          cmd: "practice regimen",
          title: "خطة تمرين حقيقية: أنهي مسائل، بتايمر قد إيه، وإمتى ترجع للي وقعت فيها",
          desc: R`«مسألة أو اتنين كل يوم» مش خطة. الخطة ليها ٣ أجزاء: قائمة متدرجة لكل نمط، وجلسات بتايمر، ومراجعة متباعدة للي وقعت فيه.

١. القائمة: لكل نمط في التاب ده، ٣ easy و ٣ medium و ١ hard، بأسمائهم على LeetCode. اعمل الـ easy بتاعة النمط، وبعدين الـ medium، وسيب الـ hard لما تخلص الأنماط كلها. القائمة كاملة في «الحل» تحت (بعد ما تجرب). والتصنيف easy/medium/hard حسب LeetCode وقت الكتابة، وممكن يتغير.

٢. الجلسات بتايمر: easy ٢٠ دقيقة، و medium ٣٥، و hard ٥٠. لو الوقت خلص ومفيش فكرة: اقرا hint واحدة بس، وخد ١٠ دقايق زيادة. لو لسه: اقرا الحل، وافهمه، واقفل الصفحة، واكتبه من دماغك. أي مسألة احتاجت hint أو حل، أو عدّت الوقت، اسمها «وقعت فيها».

٣. المراجعة المتباعدة (spaced repetition): المسألة اللي وقعت فيها ترجعلها بعد يوم، وبعدين ٣ أيام، وبعدين أسبوع، وأسبوعين، وشهر. كل مرة تحلها لوحدك في الوقت، تروح للمسافة اللي بعدها. لو وقعت تاني، ترجع لأول (بعد يوم). بعد ما تعدّي الشهر، اعتبرها اتقفلت.

المثال سكربت صغير بيعمل الحساب ده: كل مسألة معاها [[step]] (أنهي مسافة) و [[last]] (آخر محاولة)، والسكربت بيقولك إيه اللي عليه الدور النهاردة.`,
          example: R`const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [1, 3, 7, 14, 30];
function review(card, result, today) {
  const step = result === "ok" ? card.step + 1 : 0;
  return { ...card, step, last: today, done: step >= INTERVALS.length };
}
function dueToday(cards, today) {
  const now = Date.parse(today);
  return cards
    .filter(c => !c.done && Date.parse(c.last) + INTERVALS[c.step] * DAY <= now)
    .map(c => c.title);
}
let cards = [
  { title: "Coin Change", step: 0, last: "2026-09-01" },
  { title: "Course Schedule", step: 3, last: "2026-09-20" },
  { title: "Merge k Sorted Lists", step: 1, last: "2026-09-27" },
];
console.log(dueToday(cards, "2026-09-29")); // ['Coin Change']
cards = cards.map(c => (c.title === "Coin Change" ? review(c, "ok", "2026-09-29") : c));
console.log(cards[0]); // { title: 'Coin Change', step: 1, last: '2026-09-29', done: false }
console.log(dueToday(cards, "2026-09-30")); // ['Merge k Sorted Lists']
console.log(review(cards[2], "fail", "2026-09-30").step); // 0
// every call is O(number of cards)`,
          try: R`حوّل السكربت لأداة بتستخدمها فعلًا: ملف [[cards.json]] فيه مسائلك، و [[node review.js]] يطبع اللي عليه الدور النهاردة، و [[node review.js "Coin Change" ok]] (أو fail) يحدّث المسألة ويحفظ. وبعدين ابدأ الخطة: الأسبوع ده الأنماط الـ ٣ الأولى من القائمة (easy بس)، وسجّل كل مسألة بالوقت اللي أخدته ولو احتجت hint.`,
          sol: R`الأداة: [[fs.readFileSync]] و [[JSON.parse]] في الأول، و [[fs.writeFileSync]] في الآخر، و [[process.argv.slice(2)]] للـ arguments. لو مفيش arguments اطبع [[dueToday]]، ولو فيه اسم ونتيجة شغّل [[review]] على المسألة دي (ولو مش موجودة ضيفها بـ [[step: 0]]). النهاردة = [[new Date().toISOString().slice(0, 10)]]. الـ solCode تحت شغال بتاريخ ثابت عشان الناتج يبقى متوقع.

القائمة المتدرجة (easy / medium / hard):

arrays و strings: Reverse String، Valid Anagram، Valid Palindrome / Rotate Array، Product of Array Except Self، String Compression / First Missing Positive.

hash map و set: Two Sum، Contains Duplicate، First Unique Character in a String / Group Anagrams، Longest Consecutive Sequence، Top K Frequent Elements / Substring with Concatenation of All Words.

recursion و prefix sums: Fibonacci Number، Range Sum Query - Immutable، Find Pivot Index / Subarray Sum Equals K، Pow(x, n)، Continuous Subarray Sum / Number of Submatrices That Sum to Target.

two pointers: Merge Sorted Array، Move Zeroes، Remove Duplicates from Sorted Array / Two Sum II - Input Array Is Sorted، 3Sum، Container With Most Water / Trapping Rain Water.

sliding window: Maximum Average Subarray I، Best Time to Buy and Sell Stock، Contains Duplicate II / Longest Substring Without Repeating Characters، Longest Repeating Character Replacement، Permutation in String / Minimum Window Substring.

stacks و queues: Valid Parentheses، Implement Queue using Stacks، Baseball Game / Min Stack، Daily Temperatures، Evaluate Reverse Polish Notation / Largest Rectangle in Histogram.

binary search: Binary Search، Search Insert Position، First Bad Version / Find First and Last Position of Element in Sorted Array، Search in Rotated Sorted Array، Koko Eating Bananas / Median of Two Sorted Arrays.

sorting: Squares of a Sorted Array، Majority Element، Height Checker / Sort an Array، Sort Colors، Largest Number / Count of Smaller Numbers After Self.

linked lists و intervals: Reverse Linked List، Merge Two Sorted Lists، Linked List Cycle / Merge Intervals، Insert Interval، Remove Nth Node From End of List / Reverse Nodes in k-Group.

trees: Maximum Depth of Binary Tree، Invert Binary Tree، Diameter of Binary Tree / Binary Tree Level Order Traversal، Validate Binary Search Tree، Lowest Common Ancestor of a Binary Tree / Serialize and Deserialize Binary Tree.

graphs: Find if Path Exists in Graph، Flood Fill، Find the Town Judge / Number of Islands، Course Schedule، Rotting Oranges / Word Ladder.

heaps: Kth Largest Element in a Stream، Last Stone Weight، Relative Ranks / Kth Largest Element in an Array، Top K Frequent Words، K Closest Points to Origin / Merge k Sorted Lists.

dynamic programming: Climbing Stairs، Min Cost Climbing Stairs، N-th Tribonacci Number / House Robber، Coin Change، Longest Common Subsequence / Distinct Subsequences.

greedy: Assign Cookies، Lemonade Change، Maximum Units on a Truck / Jump Game، Non-overlapping Intervals، Gas Station / Candy.

backtracking و trie: Binary Watch، Letter Case Permutation (medium على LeetCode، بس سهلة كبداية)، Longest Common Prefix / Subsets، Combination Sum، Implement Trie (Prefix Tree) / N-Queens.

union-find و Dijkstra و bits و LRU: Single Number، Missing Number، Number of 1 Bits / Number of Provinces، Network Delay Time، LRU Cache / Swim in Rising Water.

الجدول الأسبوعي المقترح: ٥ أيام × جلسة ساعة (مسألة جديدة أو اتنين + اللي عليه الدور في المراجعة)، ويوم واحد mock: مسألتين medium ورا بعض في ٧٠ دقيقة، بصوت عالي أو مع صاحبك، من غير ما تعرف النمط مسبقًا (اختار عشوائي من القائمة). ويوم راحة. المراجعة ليها الأولوية على المسائل الجديدة.

الغلطات الشائعة: تحل ٥٠٠ مسألة من غير ما ترجع لأي واحدة (هتنساهم). وتقرا الحل بعد ٥ دقايق. وتفضل على easy لأنها مريحة. وتحل من غير تايمر، فأول انترفيو الوقت يخضّك.`,
          solCode: R`const fs = require("fs");
const DAY = 24 * 60 * 60 * 1000, INTERVALS = [1, 3, 7, 14, 30];
const FILE = "cards.json";
const review = (card, result, today) => {
  const step = result === "ok" ? card.step + 1 : 0;
  return { ...card, step, last: today, done: step >= INTERVALS.length };
};
const due = (cards, today) => cards.filter(c => !c.done && Date.parse(c.last) + INTERVALS[c.step] * DAY <= Date.parse(today));
function main(args, today) {
  const cards = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : [];
  const [title, result] = args;
  if (!title) return due(cards, today).map(c => "due: " + c.title).join("\n") || "nothing due";
  const i = cards.findIndex(c => c.title === title);
  const card = i === -1 ? { title, step: 0, last: today } : cards[i];
  const next = review(card, result, today);
  if (i === -1) cards.push(next); else cards[i] = next;
  fs.writeFileSync(FILE, JSON.stringify(cards, null, 2));
  return title + " -> next review in " + (next.done ? "never (done)" : INTERVALS[next.step] + " day(s)");
}
if (fs.existsSync(FILE)) fs.unlinkSync(FILE);
console.log(main(["Coin Change", "fail"], "2026-09-29")); // Coin Change -> next review in 1 day(s)
console.log(main([], "2026-09-29")); // nothing due
console.log(main([], "2026-09-30")); // due: Coin Change
console.log(main(["Coin Change", "ok"], "2026-09-30")); // Coin Change -> next review in 3 day(s)
// real use: main(process.argv.slice(2), new Date().toISOString().slice(0, 10))`,
          flag: "script",
          deep: {
            why: "الذاكرة بتنسى بسرعة: مسألة حليتها بـ hint النهاردة، بعد أسبوعين هتقعد قدامها كأنها جديدة. المراجعة المتباعدة (نفس فكرة Anki) بتثبّت الأنماط بأقل وقت، لأنك بتراجع بس اللي قرّبت تنساه. والتايمر بيعوّدك على ضغط الانترفيو الحقيقي، والقائمة المتدرجة بتمنعك تقفز لـ hard قبل ما الأساس يثبت.",
            how: R`[[review]]: لو الحل نجح، روح للمسافة اللي بعدها. لو فشل، ارجع لأول مسافة (يوم). و [[done]] لما تعدّي آخر مسافة (٣٠ يوم).

[[dueToday]]: المسألة عليها الدور لو «آخر محاولة + المسافة الحالية» ≤ النهاردة. [[Date.parse("2026-09-01")]] بيرجّع الوقت بالملّي ثانية (UTC)، فالجمع والمقارنة أرقام عادية.

في المثال: Coin Change آخر محاولة 1 سبتمبر ومسافتها يوم، فعليها الدور من 2 سبتمبر (متأخرة). Course Schedule في المسافة 14 يوم من 20 سبتمبر، فدورها 4 أكتوبر. Merge k في المسافة 3 أيام من 27، فدورها 30.

بعد ما Coin Change تتحل صح النهاردة، بتروح للمسافة 3 أيام، فمش هتظهر بكرة. و Merge k بتظهر بكرة. ولو وقعت فيها، [[step]] بترجع 0.

الـ spread [[{ ...card, step }]] بيعمل object جديد بدل ما يعدّل القديم. نفس أسلوب الـ state في React.`,
            when: "ابدأ الخطة قبل الانترفيو بـ ٦-١٠ أسابيع لو بتبدأ من الصفر في الأنماط، و ٢-٣ أسابيع لو مراجعة. في آخر أسبوعين، وقّف المسائل الجديدة تقريبًا وركّز على المراجعة والـ mocks (زي درس «آخر أسبوعين» في «تاب الانترفيو»). ولو الشركة بتعمل take-home أو pair programming مش LeetCode، قلّل الـ hard وزوّد مشاريع صغيرة.",
            mistakes: R`عدّ المسائل كهدف («حليت ٣٠٠») بدل الأنماط. وقراءة الحل من غير ما تكتبه تاني من دماغك. وتجاهل الـ easy لأنها «سهلة» (الانترفيو فيه easy كتير، ولازم تخلصها في ١٠ دقايق من غير bugs). والمراجعة من غير تايمر. وإنك متسجلش إنك احتجت hint، فالمسألة تتعلّم «نجحت» وهي لأ. وفي الـ mock: متختارش النمط بنفسك، لأن نص صعوبة الانترفيو إنك تعرف النمط لوحدك.`
          },
          teach: R`## الفكرة في جملة

كل مسألة وقعت فيها بتبقى «كارت» فيه ٢ معلومات: [[step]] (انت في أنهي مسافة من [[[1, 3, 7, 14, 30]]] يوم) و [[last]] (آخر مرة حاولت). المسألة عليها الدور لو «آخر محاولة + المسافة» وصل النهاردة. لو حليتها صح بتروح للمسافة اللي بعدها، ولو وقعت ترجع لأول (يوم).

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع لكل كارت إمتى دوره. هنتتبع على كروت جديدة.

---

## ١. الثوابت

~~~js
const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [1, 3, 7, 14, 30];
~~~

- [[DAY]]: يوم بالملّي ثانية = 24 ساعة × 60 دقيقة × 60 ثانية × 1000 = 86400000 (طبعناها).
- [[INTERVALS]]: المسافات بالأيام. [[step]] هو الـ index فيها: [[step]] 0 = بعد يوم، و 2 = بعد أسبوع.

---

## ٢. [[review(card, result, today)]]

~~~js
const step = result === "ok" ? card.step + 1 : 0;
return { ...card, step, last: today, done: step >= INTERVALS.length };
~~~

- نجحت ([["ok"]]): المسافة اللي بعدها. أي حاجة تانية: ارجع لـ 0.
- [[{ ...card, step, last: today, done }]]: object **جديد**: [[...card]] بينسخ كل خانات الكارت، والخانات اللي بعدها بتكتب فوقها. و [[step]] لوحدها اختصار [[step: step]].
- [[done]]: لو [[step]] عدّى آخر index (5 = طول الـ array)، الكارت خلص.

جرّبنا: [[review]] لـ Two Sum (step 2) بـ [["fail"]] رجّعت [[{ title: 'Two Sum', step: 0, last: '2026-10-08', done: false }]]، والكارت الأصلي فضل [[step]] بتاعه 2، والاتنين مش نفس الـ object. وكارت في [[step]] 4 اتحل صح: بقى [[step: 5]] و [[done: true]].

---

## ٣. [[dueToday(cards, today)]]

~~~js
const now = Date.parse(today);
return cards
  .filter(c => !c.done && Date.parse(c.last) + INTERVALS[c.step] * DAY <= now)
  .map(c => c.title);
~~~

- [[Date.parse("2026-10-01")]]: التاريخ ده كرقم ملّي ثانية من 1 يناير 1970 (UTC). طبعناه: 1790812800000. والفرق بين يومين ورا بعض طلع 86400000 = [[DAY]] بالظبط. فالتواريخ بقت أرقام نجمعها ونقارنها.
- [[filter]]: سيب الكروت اللي (مش خلصانة) **و** (آخر محاولة + المسافة ≤ النهاردة).
- [[!c.done &&]] لازم ييجي الأول: الكارت الخلصان [[step]] بتاعه 5، و [[INTERVALS[5]]] = [[undefined]] (جرّبناها)، فالحساب كان هيطلع [[NaN]]. الـ [[&&]] بتوقف قبل ما توصل له.
- [[map(c => c.title)]]: الأسامي بس.

### التتبع

الكروت: Two Sum ([[step]] 2، آخر محاولة 1 أكتوبر)، و Word Ladder ([[step]] 0، آخر محاولة 6 أكتوبر).

| الكارت | المسافة | دوره يوم | يوم 7 أكتوبر | يوم 8 أكتوبر |
|---|---|---|---|---|
| Two Sum | 7 أيام | 2026-10-08 | لأ | نعم |
| Word Ladder | يوم | 2026-10-07 | نعم | نعم (متأخرة) |

فـ [[dueToday(cards, "2026-10-07")]] = [[['Word Ladder']]]، و يوم 8 = [[['Two Sum', 'Word Ladder']]]. المسألة اللي دورها فات بتفضل تظهر لحد ما تراجعها.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 'Coin Change' ]
{ title: 'Coin Change', step: 1, last: '2026-09-29', done: false }
[ 'Merge k Sorted Lists' ]
0
~~~

| السطر | ليه |
|---|---|
| [[['Coin Change']]] | يوم 29: Coin Change دورها من 2 سبتمبر (متأخرة). Course Schedule دورها 4 أكتوبر، و Merge k دورها 30 سبتمبر |
| الكارت بعد [[review]] | اتحلت صح: [[step]] بقى 1 (3 أيام)، و [[last]] بقى 29 |
| [[['Merge k Sorted Lists']]] | يوم 30: Merge k وصل دورها، و Coin Change دورها بقى 2 أكتوبر |
| 0 | Merge k وقعت فيها: [[step]] رجع لأول |

---

## ٥. الـ solCode: نفس الحساب في أداة بتحفظ

- [[require("fs")]]: موديول الملفات في Node.
- [[fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : []]]: لو الملف موجود اقراه كـ نص ([["utf8"]]) وحوّله لـ array بـ [[JSON.parse]]، غير كده ابدأ بقائمة فاضية.
- [[const [title, result] = args;]]: الـ arguments اللي بعد اسم السكربت. في الاستخدام الحقيقي [[process.argv.slice(2)]] (أول اتنين في [[process.argv]] هما مسار node ومسار السكربت).
- مفيش [[title]]: اطبع اللي عليه الدور. و [[|| "nothing due"]]: لو الـ join طلع نص فاضي (falsy)، اطبع الجملة دي بداله.
- فيه [[title]]: [[findIndex]] بيدوّر على الكارت (-1 لو مش موجود، فيعمل كارت جديد بـ [[step: 0]])، وبعدين [[review]]، وبعدين [[fs.writeFileSync(FILE, JSON.stringify(cards, null, 2))]] ([[2]] = مسافتين indentation عشان الملف يتقري).
- [[if (fs.existsSync(FILE)) fs.unlinkSync(FILE);]]: بيمسح [[cards.json]] قبل الـ demo عشان الناتج يبقى ثابت كل مرة. في الأداة الحقيقية شيل السطر ده، وإلا هتمسح كروتك.

شغّلناه في فولدر تجارب لوحده، وطلع:

~~~text الناتج (Node 24 على ويندوز)
Coin Change -> next review in 1 day(s)
nothing due
due: Coin Change
Coin Change -> next review in 3 day(s)
~~~

اتسجلت [["fail"]] يوم 29 (المسافة يوم)، فمكانتش عليها الدور يوم 29، وظهرت يوم 30، واتحلت صح فراحت لـ 3 أيام.

---

## ٦. الـ Big-O

| | القيمة | السبب |
|---|---|---|
| [[review]] | [[O(1)]] | نسخة كارت واحد |
| [[dueToday]] | [[O(عدد الكروت)]] | [[filter]] و [[map]] لفة لفة |

مع مئات المسائل ده لحظي، فمش محتاج أي حاجة أذكى.

---

## الخلاصة

~~~text
المسافات      1 ثم 3 ثم 7 ثم 14 ثم 30 يوم، و step هو الـ index
ok            step + 1، وبعد آخر مسافة done
fail          step = 0 (ترجع بعد يوم)
عليها الدور   Date.parse(last) + INTERVALS[step] × DAY <= النهاردة
{ ...card }   كارت جديد، القديم مبيتغيرش
~~~

> اللي بيتراجع هو اللي وقعت فيه بس، وفي الوقت اللي قرّبت تنساه فيه. ولازم تسجّل الـ hint كـ «وقعت»، وإلا الأداة هتصدّق إنك فاهمها.`,
          lines: [
            "يوم بالملّي ثانية.",
            "المسافات بالأيام: 1 ثم 3 ثم 7 ثم 14 ثم 30.",
            "حدّث مسألة بعد محاولة.",
            "نجحت: المسافة اللي بعدها. فشلت: ارجع لأول.",
            "نسخة جديدة، وخلصت لو عدّت آخر مسافة.",
            "قفلة.",
            "اللي عليه الدور النهاردة.",
            "النهاردة كرقم.",
            "رجّع.",
            "مش خلصانة، وآخر محاولة + المسافة ≤ النهاردة.",
            "أسماءهم بس.",
            "قفلة.",
            "المسائل اللي بتراجعها.",
            "متأخرة من أول الشهر.",
            "دورها 4 أكتوبر.",
            "دورها 30 سبتمبر.",
            "قفلة.",
            "النهاردة 29: Coin Change بس.",
            "حليتها صح النهاردة.",
            "بقت في المسافة 3 أيام.",
            "بكرة: Merge k بس.",
            "لو وقعت فيها: ترجع لأول مسافة."
          ]
        }
      ]
    }
]);
