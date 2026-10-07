// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "dynamic programming و greedy",
      l: 3,
      n: "من memoization لجدول bottom-up: climbing stairs و coin change و LCS و knapsack، والـ greedy إمتى ينفع وإمتى يخونك",
      items: [
        {
          cmd: "bottom-up DP (table)",
          title: "من recursion بـ memo لجدول بيتملي من تحت لفوق (Climbing Stairs)",
          desc: R`في درس «memoization» حوّلنا fib من [[O(2^n)]] لـ [[O(n)]] بـ Map. ده اسمه top-down DP: بتبدأ من المطلوب وتنزل، وبتخزّن.

bottom-up DP: نفس الفكرة بالعكس. بدل recursion، اعمل array اسمها [[dp]] واملاها من أصغر حالة لحد المطلوب بـ loop. مفيش call stack (فمفيش stack overflow)، ومفيش Map، وفي الغالب أسرع.

أي DP بيتكتب بـ ٥ أسئلة، اكتبهم كـ comment قبل الكود:

١. الحالة: [[dp[i]]] معناها إيه بالظبط؟ (هنا: عدد الطرق للوصول للسلمة i.)

٢. الانتقال: [[dp[i]]] بتتحسب من إيه؟ (آخر خطوة كانت 1 أو 2، فـ [[dp[i] = dp[i - 1] + dp[i - 2]]].)

٣. الـ base cases: [[dp[0] = 1]] (طريقة واحدة: متتحركش)، و [[dp[1] = 1]].

٤. الترتيب: من الصغير للكبير، عشان لما تحسب i يكون اللي قبله جاهز.

٥. الإجابة: [[dp[n]]].

ولو كل خانة محتاجة آخر خانتين بس، مش محتاج الـ array كلها: متغيرين كفاية، والذاكرة تبقى [[O(1)]].`,
          example: R`function climbMemo(n, memo = new Map()) {
  if (n <= 1) return 1;
  if (memo.has(n)) return memo.get(n);
  const ways = climbMemo(n - 1, memo) + climbMemo(n - 2, memo);
  memo.set(n, ways);
  return ways;
}
function climbTable(n) {
  if (n <= 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}
function climbTwoVars(n) {
  let prev = 1, cur = 1;
  for (let i = 2; i <= n; i++) [prev, cur] = [cur, prev + cur];
  return cur;
}
console.log(climbMemo(5), climbTable(5), climbTwoVars(5)); // 8 8 8
console.log(climbTwoVars(45)); // 1836311903
console.log(climbTable(1), climbTwoVars(0)); // 1 1
// memo: O(n) time, O(n) map + O(n) stack; table: O(n) time, O(n) space; two vars: O(n) time, O(1) space`,
          try: R`حل «House Robber» بالـ ٥ أسئلة: بيوت في شارع، كل بيت فيه فلوس، ومينفعش تسرق بيتين جنب بعض. أقصى مبلغ كام؟ [[[2, 7, 9, 3, 1]]] الإجابة 12 (2 + 9 + 1)، و [[[2, 1, 1, 2]]] الإجابة 4. اكتبها بجدول الأول، وبعدين بمتغيرين. وبعدين «Min Cost Climbing Stairs»: [[[10, 15, 20]]] الإجابة 15. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[rob(nums)]] و [[minCostClimbing(cost)]].`,
          sol: R`House Robber: الحالة [[dp[i]]] = أقصى مبلغ من أول i بيوت. الانتقال: يا إما متسرقش البيت i (فالإجابة [[dp[i - 1]]])، يا إما تسرقه (فلوسه + [[dp[i - 2]]])، وخد الأكبر. الـ base: [[dp[0] = 0]]، و [[dp[1] = nums[0]]]. الإجابات 12 و 4 و 0 للشارع الفاضي.

[[[2, 1, 1, 2]]] بتوقع اللي بيفكر greedy («خد البيوت الزوجية أو الفردية»): الاتنين بيدّوا 3، والإجابة 4 (أول بيت وآخر بيت).

Min Cost Climbing Stairs: [[dp[i]]] = أقل تكلفة توصل للسلمة i، وتقدر تبدأ من 0 أو 1 ببلاش. [[dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])]]، والإجابة [[dp[n]]] (فوق آخر سلمة). [[[10, 15, 20]]] = 15، و [[[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]]] = 6.

الغلطة الشائعة: تعتبر الإجابة [[dp[n - 1]]] (آخر سلمة) بدل [[dp[n]]] (القمة اللي فوقها).`,
          solCode: R`function rob(nums) {
  let prev = 0, cur = 0;
  for (const x of nums) [prev, cur] = [cur, Math.max(cur, prev + x)];
  return cur;
}
function robTable(nums) {
  const dp = new Array(nums.length + 1).fill(0);
  if (nums.length) dp[1] = nums[0];
  for (let i = 2; i <= nums.length; i++) dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  return dp[nums.length];
}
function minCostClimbing(cost) {
  const dp = new Array(cost.length + 1).fill(0);
  for (let i = 2; i <= cost.length; i++)
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  return dp[cost.length];
}
console.log(rob([2, 7, 9, 3, 1]), robTable([2, 7, 9, 3, 1])); // 12 12
console.log(rob([2, 1, 1, 2]), rob([])); // 4 0
console.log(minCostClimbing([10, 15, 20])); // 15
console.log(minCostClimbing([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
// all O(n) time; rob with two variables is O(1) space`,
          flag: "script",
          deep: {
            why: "DP هي الطريقة اللي بتحوّل مسائل «جرّب كل الاحتمالات» (exponential) لحاجة polynomial. في الانترفيو بتتسأل كتير لأنها بتفصل بين اللي حافظ حلول واللي بيعرف يبني الحل. وفي الشغل بتقابلها في diff بين نصين، و spell check، وتقسيم الفلوس، وترتيب الـ layout، وكل «أحسن اختيار» فيه قيود.",
            how: R`إمتى المسألة DP؟ علامتين: (١) optimal substructure: إجابة الكبيرة بتتبني من إجابات أصغر منها. (٢) overlapping subproblems: نفس المسألة الصغيرة بتتحسب أكتر من مرة في الـ recursion (زي fib).

الطريق العملي في الانترفيو: اكتب الـ recursion البديهية الأول (brute force)، وبعدين ضيف memo (top-down)، وبعدين لو عايز حوّلها لجدول (bottom-up)، وبعدين شوف لو ينفع تقلل الذاكرة. كل خطوة صح لوحدها، وكل خطوة بتبين إنك فاهم.

dry run للجدول مع n = 5: [[dp = [1, 1, 2, 3, 5, 8]]]. للسلمة 5: إما جيت من 4 (5 طرق) أو من 3 (3 طرق)، فـ 8.

ليه [[dp[0] = 1]] مش 0؟ «عدد الطرق إنك تفضل مكانك» = طريقة واحدة (متعملش حاجة). لو خليتها 0، [[dp[2]]] هتطلع 1 بدل 2. الـ base cases هي أكتر حاجة بتبوّظ حلول الـ DP.

[[[prev, cur] = [cur, prev + cur]]]: destructuring بيحسب الجهة اليمين كلها الأول، فمش محتاج متغير مؤقت.

climbTwoVars(45) = 1836311903، لسه أقل من [[Number.MAX_SAFE_INTEGER]]. بعد حوالي 78 الأرقام بتفقد الدقة، ولو محتاج الرقم مضبوط استخدم BigInt.`,
            when: "top-down (memo): أسهل تكتبه من الـ recursion، ومفيد لما مش كل الحالات محتاجة تتحسب. bottom-up: لما كل الحالات هتتحسب على أي حال، أو العمق كبير (n = مليون هيعمل stack overflow في الـ memo)، أو عايز تقلل الذاكرة. في الانترفيو أي واحدة صح، بس اعرف تحوّل من واحدة للتانية.",
            mistakes: R`إنك تبدأ تكتب جدول قبل ما تحدد [[dp[i]]] معناها إيه بالكلام، فتلخبط. والـ base cases الغلط ([[dp[0] = 0]] في عدّ الطرق). والـ off-by-one بين «أول i عناصر» و «العنصر i». والـ array بطول n بدل n + 1. وإنك تفكر greedy في مسألة DP (House Robber بـ «خد الزوجي أو الفردي»). وفي الانترفيو: قول الـ ٥ أسئلة بصوت عالي قبل الكود.`
          },
          teach: R`## الفكرة في جملة

عشان توصل للسلمة n، آخر خطوة كانت يا من n - 1 (خطوة واحدة) يا من n - 2 (خطوتين). فعدد الطرق لـ n = عدد الطرق لـ n - 1 + عدد الطرق لـ n - 2. المثال بيكتب نفس المعادلة دي ٣ مرات: recursion بـ memo (من فوق لتحت)، وجدول (من تحت لفوق)، ومتغيرين بس.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع الحالة في كل خطوة. هنتتبع على n = 6 (المثال بيطبع 5).

---

## ١. الـ ٥ أسئلة للمسألة دي

| السؤال | الإجابة هنا |
|---|---|
| الحالة | [[dp[i]]] = عدد الطرق اللي توصل بيها للسلمة i |
| الانتقال | [[dp[i] = dp[i - 1] + dp[i - 2]]] |
| الـ base | [[dp[0] = 1]] (طريقة واحدة: متتحركش)، و [[dp[1] = 1]] (خطوة واحدة) |
| الترتيب | i من 2 لـ n، عشان اللي قبلها يكون جاهز |
| الإجابة | [[dp[n]]] |

---

## ٢. النسخة الأولى: [[climbMemo]] (top-down)

~~~js
function climbMemo(n, memo = new Map()) {
  if (n <= 1) return 1;
  if (memo.has(n)) return memo.get(n);
  const ways = climbMemo(n - 1, memo) + climbMemo(n - 2, memo);
  memo.set(n, ways);
  return ways;
}
~~~

- [[memo = new Map()]]: default parameter. أول نداء بيعمل Map جديدة، وكل النداءات اللي جوه بتتبعت لها **نفس** الـ Map.
- [[if (n <= 1) return 1;]]: الـ base cases في سطر واحد (0 و 1).
- [[memo.has(n)]]: اتحسبت قبل كده؟ رجّعها على طول من غير ما تنزل تاني.
- غير كده احسبها من المعادلة، وخزّنها بـ [[memo.set]]، ورجّعها.

### التتبع: [[climbMemo(6)]]

المسافة على الشمال = عمق الـ recursion:

~~~text اللي اتطبع
climb(6) computing
  climb(5) computing
    climb(4) computing
      climb(3) computing
        climb(2) computing
          climb(1) base -> 1
          climb(0) base -> 1
        climb(2) = 2  memo [[2,2]]
        climb(1) base -> 1
      climb(3) = 3  memo [[2,2],[3,3]]
      climb(2) from memo -> 2
    climb(4) = 5  memo [[2,2],[3,3],[4,5]]
    climb(3) from memo -> 3
  climb(5) = 8  memo [[2,2],[3,3],[4,5],[5,8]]
  climb(4) from memo -> 5
climb(6) = 13  memo [[2,2],[3,3],[4,5],[5,8],[6,13]]
~~~

الـ recursion نزلت على طول لحد 1 و 0، وبعدين وهي طالعة كل خانة اتحسبت مرة واحدة. النداء التاني في كل مستوى (زي [[climb(4)]] جوه [[climb(6)]]) لقى الإجابة في الـ memo. عدد النداءات كلها 11، ومن غير memo نفس الحساب أخد 25 نداء (عددناهم)، والفرق بيكبر بسرعة جدًا مع n.

---

## ٣. النسخة التانية: [[climbTable]] (bottom-up)

- [[if (n <= 1) return 1;]]: الحالات الصغيرة بره الجدول. من غيره، n = 0 هتعمل array طولها 1، و [[dp[1] = 1]] هتكتب برا طولها (جرّبناها: JavaScript بتطوّل الـ array لـ 2 بهدوء، والإجابة لسه 1، بس الكود بقى بيعتمد على صدفة).
- [[new Array(n + 1).fill(0)]]: array طولها n + 1 كلها أصفار. ليه n + 1؟ عشان فيها من [[dp[0]]] لحد [[dp[n]]].
- [[dp[0] = 1; dp[1] = 1;]]: الـ base cases.
- [[for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];]]: املى من الصغير للكبير.

### التتبع: [[climbTable(6)]]

| i | الحساب | [[dp]] بعدها |
|---|---|---|
| البداية | | [1, 1, 0, 0, 0, 0, 0] |
| 2 | 1 + 1 = 2 | [1, 1, 2, 0, 0, 0, 0] |
| 3 | 2 + 1 = 3 | [1, 1, 2, 3, 0, 0, 0] |
| 4 | 3 + 2 = 5 | [1, 1, 2, 3, 5, 0, 0] |
| 5 | 5 + 3 = 8 | [1, 1, 2, 3, 5, 8, 0] |
| 6 | 8 + 5 = 13 | [1, 1, 2, 3, 5, 8, 13] |

نفس الأرقام اللي في الـ memo، بس من غير recursion: مفيش call stack، فمفيش «Maximum call stack size exceeded» لو n كبيرة.

ليه [[dp[0] = 1]] مش 0؟ لو 0، [[dp[2]]] هتطلع 0 + 1 = 1، والصح 2 (1+1 أو 2).

---

## ٤. النسخة التالتة: [[climbTwoVars]]

بص على الجدول: كل خانة محتاجة آخر خانتين بس. يبقى مش محتاجين الـ array كلها:

~~~js
let prev = 1, cur = 1;
for (let i = 2; i <= n; i++) [prev, cur] = [cur, prev + cur];
return cur;
~~~

- [[prev]] = [[dp[i - 2]]]، و [[cur]] = [[dp[i - 1]]].
- [[[prev, cur] = [cur, prev + cur]]]: destructuring assignment. الجهة اليمين بتتحسب **كلها الأول** (array فيها القيمتين الجداد)، وبعدين بتتوزع على الشمال. فـ [[prev + cur]] بيستخدم القيم القديمة.

ليه مش سطرين عاديين؟ جرّبنا [[prev = cur; cur = prev + cur;]] بـ 1 و 2: طلعوا 2 و 4 بدل 2 و 3، لأن [[prev]] اتغير قبل ما نستخدمه.

### التتبع: [[climbTwoVars(6)]]

| i | [[prev]] | [[cur]] |
|---|---|---|
| البداية | 1 | 1 |
| 2 | 1 | 2 |
| 3 | 2 | 3 |
| 4 | 3 | 5 |
| 5 | 5 | 8 |
| 6 | 8 | 13 |

ولو n = 0 أو 1، الـ loop مبيلفش خالص، و [[cur]] = 1 صح.

---

## ٥. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
8 8 8
1836311903
1 1
~~~

- [[climb(5)]] بالـ ٣ نسخ: 8.
- [[climbTwoVars(45)]]: 45 لفة بس. الـ recursion من غير memo كانت هتعمل حوالي ٣.٧ مليار نداء (عدد النداءات = 2 × الإجابة - 1، زي ما طلع 25 = 2 × 13 - 1 لـ n = 6).
- [[climbTable(1)]] و [[climbTwoVars(0)]]: الحالات الصغيرة = 1.

> الأرقام دي هي أرقام Fibonacci. [[Number.MAX_SAFE_INTEGER]] = 9007199254740991، وجرّبنا: [[climbTwoVars(77)]] لسه safe integer، و 78 وطالع لأ (الرقم بيتقرّب). لو محتاج دقة بعد كده: [[BigInt]].

---

## ٦. الـ Big-O وليه

| النسخة | الوقت | الذاكرة | السبب |
|---|---|---|---|
| memo | [[O(n)]] | [[O(n)]] | كل n بتتحسب مرة، والـ Map فيها n خانة، والـ call stack عمقه n |
| جدول | [[O(n)]] | [[O(n)]] | loop واحد، و array طولها n + 1 |
| متغيرين | [[O(n)]] | [[O(1)]] | نفس الـ loop، ومتغيرين بس |
| recursion من غير memo | [[O(2^n)]] تقريبًا | [[O(n)]] | كل نداء بيعمل نداءين، ونفس الحالات بتتحسب مرات كتير |

---

## الخلاصة

~~~text
الحالة       dp[i] = عدد الطرق للسلمة i
الانتقال     dp[i] = dp[i-1] + dp[i-2]
الـ base     dp[0] = 1، dp[1] = 1
top-down     recursion + Map، من n لتحت
bottom-up    array من 0 لـ n بـ loop
متغيرين      لما الخانة محتاجة آخر خانتين بس: O(1) ذاكرة
~~~

> اكتب الحالة بالكلام الأول. لو [[dp[i]]] معناها واضحة، الانتقال والـ base والترتيب بيطلعوا لوحدهم.`,
          lines: [
            "top-down: recursion + memo (زي fib).",
            "0 أو 1 سلمة: طريقة واحدة.",
            "اتحسبت قبل كده؟",
            "آخر خطوة يا 1 يا 2.",
            "خزّن.",
            "رجّع.",
            "قفلة.",
            "bottom-up: جدول.",
            "حالات صغيرة.",
            "dp[i] = عدد الطرق للسلمة i.",
            "base: متتحركش = طريقة واحدة.",
            "base: سلمة واحدة = طريقة واحدة.",
            "املى من تحت لفوق: كل خانة من اللي قبلها.",
            "الإجابة.",
            "قفلة.",
            "نفس الجدول بس بآخر خانتين بس.",
            "dp[i-2] و dp[i-1].",
            "حرّك الاتنين خطوة لقدام.",
            "cur = dp[n].",
            "قفلة.",
            "الـ ٣ نسخ نفس الإجابة.",
            "45 سلمة في لحظة.",
            "الحالات الصغيرة."
          ],
          check: {
            lang: "js",
            starter: R`function rob(nums) {
  // dp[i] = max(dp[i - 1], nums[i - 1] + dp[i - 2])، أو بمتغيرين
  return 0;
}
function minCostClimbing(cost) {
  // الإجابة dp[n] (القمة فوق آخر سلمة)
  return 0;
}`,
            tests: R`test("rob([2, 7, 9, 3, 1]) ← 12", () => expect(rob([2, 7, 9, 3, 1])).toBe(12));
test("rob([2, 1, 1, 2]) ← 4 (الزوجي أو الفردي بيدّوا 3)", () => expect(rob([2, 1, 1, 2])).toBe(4));
test("rob([]) ← 0 و rob([5]) ← 5", () => expect([rob([]), rob([5])]).toEqual([0, 5]));
test("minCostClimbing([10, 15, 20]) ← 15", () => expect(minCostClimbing([10, 15, 20])).toBe(15));
test("[1, 100, 1, 1, 1, 100, 1, 1, 100, 1] ← 6", () => expect(minCostClimbing([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6));
test("١٠٠ ألف بيت كلهم 1 ← 50000 (O(n))", () => expect(rob(new Array(100000).fill(1))).toBe(50000));`,
            solution: R`function rob(nums) {
  let prev = 0, cur = 0;
  for (const x of nums) [prev, cur] = [cur, Math.max(cur, prev + x)];
  return cur;
}
function minCostClimbing(cost) {
  const n = cost.length;
  const dp = new Array(n + 1).fill(0);
  for (let i = 2; i <= n; i++) dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  return dp[n];
}`
          }
        },
        {
          cmd: "coin change (DP)",
          title: "أقل عدد عملات يكوّن مبلغ معين (Coin Change)",
          desc: R`عندك أنواع عملات (من كل نوع عدد لا نهائي)، وعايز أقل عدد عملات مجموعها amount بالظبط. ولو مستحيل، [[-1]].

الحالة: [[dp[a]]] = أقل عدد عملات يكوّن المبلغ a.

الانتقال: آخر عملة استخدمتها كانت c (أي عملة من الأنواع)، فالباقي [[a - c]] اتكوّن بأقل عدد ممكن. [[dp[a] = 1 + min(dp[a - c])]] على كل c ≤ a.

الـ base: [[dp[0] = 0]]. وكل الباقي يبدأ [[Infinity]] يعني «لسه مستحيل»، و [[Infinity + 1]] لسه Infinity، فالمستحيل بيفضل مستحيل من غير if.

وفيه أخت ليها: «عدد الطرق» (Coin Change II). نفس الجدول بس بتجمع بدل ما تاخد الأقل، وترتيب الـ loops بيفرق: لو العملات برّا، كل تركيبة بتتعد مرة واحدة ([1, 2] زي [2, 1]).`,
          example: R`function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++)
    for (const c of coins)
      if (c <= a && dp[a - c] + 1 < dp[a]) dp[a] = dp[a - c] + 1;
  return dp[amount] === Infinity ? -1 : dp[amount];
}
function countWays(coins, amount) {
  const ways = new Array(amount + 1).fill(0);
  ways[0] = 1;
  for (const c of coins)
    for (let a = c; a <= amount; a++) ways[a] += ways[a - c];
  return ways[amount];
}
console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1, 3, 4], 6)); // 2
console.log(coinChange([7], 0)); // 0
console.log(countWays([1, 2, 5], 5)); // 4
// both: O(amount × coins) time, O(amount) space`,
          try: R`خلّي [[coinChange]] ترجّع العملات نفسها مش عددها بس: احفظ في array تانية [[pick[a]]] آخر عملة اخترتها للمبلغ a، وارجع بيها من amount لـ 0. [[([1, 2, 5], 11)]] المفروض ترجّع [[[5, 5, 1]]] (أو أي ترتيب ليها). وبعدين في [[countWays]] بدّل ترتيب الـ loopين (المبلغ برّا والعملات جوه)، وشوف [[([1, 2, 5], 5)]] بقت كام، وفسّر ليه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[coinsUsed(coins, amount)]] بترجّع العملات نفسها (أي ترتيب) أو null.`,
          sol: R`[[coinsUsed([1, 2, 5], 11)]] = [[[1, 5, 5]]] بالكود اللي تحت (الترتيب حسب [[pick]])، و [[([1, 3, 4], 6)]] = [[[3, 3]]]، و [[([2], 3)]] = [[null]].

كل ما [[dp[a]]] تتحسن، احفظ [[pick[a] = c]]. وبعدين: [[while (a > 0) { out.push(pick[a]); a -= pick[a]; }]].

بتبديل الـ loops: الناتج بيبقى 9 بدل 4. ليه؟ لما المبلغ برّا، لكل مبلغ بتجرّب كل العملات كـ «آخر عملة»، فـ [1, 2, 2] و [2, 1, 2] و [2, 2, 1] بيتعدوا ٣ طرق مختلفة. ده عدد الترتيبات (permutations)، ودي مسألة تانية اسمها Combination Sum IV. لما العملات برّا، كل عملة بتتضاف بعد اللي قبلها بس، فكل تركيبة بتتعد مرة واحدة.

الغلطة الشائعة: تبدأ [[dp]] بـ 0 بدل Infinity، فكل المبالغ تبان «ممكنة بـ 0 عملات».`,
          solCode: R`function coinsUsed(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity), pick = new Array(amount + 1).fill(0);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++)
    for (const c of coins)
      if (c <= a && dp[a - c] + 1 < dp[a]) { dp[a] = dp[a - c] + 1; pick[a] = c; }
  if (dp[amount] === Infinity) return null;
  const out = [];
  for (let a = amount; a > 0; a -= pick[a]) out.push(pick[a]);
  return out;
}
function countOrders(coins, amount) {
  const ways = new Array(amount + 1).fill(0);
  ways[0] = 1;
  for (let a = 1; a <= amount; a++)
    for (const c of coins) if (c <= a) ways[a] += ways[a - c];
  return ways[amount];
}
console.log(coinsUsed([1, 2, 5], 11)); // [1, 5, 5]
console.log(coinsUsed([1, 3, 4], 6), coinsUsed([2], 3)); // [3, 3] null
console.log(countOrders([1, 2, 5], 5)); // 9
// O(amount × coins) time, O(amount) space`,
          flag: "script",
          deep: {
            why: "Coin Change هي مسألة الـ DP الكلاسيكية اللي بتفرق بين greedy و DP، وبتتسأل كتير. وفكرتها (أقل تكلفة لتكوين حاجة من قطع) بتظهر في تقسيم مبلغ على باقات، وأقل عدد رسايل لإرسال بيانات بأحجام معينة، وتقطيع الموارد.",
            how: R`dry run لـ [[[1, 3, 4]]] و 6: [[dp[0] = 0]]. [[dp[1]]]: بعملة 1 من dp[0]، = 1. [[dp[2]]] = 2 (1 + 1). [[dp[3]]]: من dp[2] بـ 1 = 3، أو من dp[0] بـ 3 = 1، فـ 1. [[dp[4]]]: بـ 4 من dp[0] = 1. [[dp[5]]]: من dp[4] بـ 1 = 2، أو dp[2] بـ 3 = 3، أو dp[1] بـ 4 = 2، فـ 2. [[dp[6]]]: من dp[5] بـ 1 = 3، أو dp[3] بـ 3 = 2، أو dp[2] بـ 4 = 3، فـ 2.

الإجابة 2 (3 + 3). الـ greedy كان هياخد 4 الأول، وبعدين 1 و 1، يعني 3 عملات. ده بالظبط المثال المضاد في درس الـ greedy.

الـ countWays لـ [[[1, 2, 5]]] و 5: بعد العملة 1: كل مبلغ طريقة واحدة. بعد 2: [[ways = [1, 1, 2, 2, 3, 3]]]. بعد 5: [[ways[5] += ways[0]]]، فـ 4. الطرق: 5، و 2+2+1، و 2+1+1+1، و 1×5.

Big-O: [[O(amount × coins)]]. ده اسمه pseudo-polynomial: لو amount مليار، الجدول مستحيل حتى لو العملات ٣ بس.`,
            when: "«أقل/أكتر عدد» أو «عدد الطرق» لتكوين هدف من قطع بتتكرر: DP على الهدف. لو كل قطعة مرة واحدة بس، ده knapsack (الدرس الجاي). لو العملات «canonical» زي الجنيه والدولار، الـ greedy بيشتغل، بس مش مضمون لأي نظام عملات.",
            mistakes: R`الـ greedy (خد أكبر عملة الأول). وبداية [[dp]] بـ 0 بدل Infinity. واستخدام recursion من غير memo ([[O(coins^amount)]]). وترتيب الـ loops الغلط في عدّ الطرق. ونسيان إن amount = 0 إجابته 0 مش -1. وفي الانترفيو: قول إن ده DP مش greedy، واديهم المثال المضاد [[[1, 3, 4]]] و 6.`
          },
          teach: R`## الفكرة في جملة

أي طريقة تكوّن بيها المبلغ a ليها «آخر عملة» c. لو شلتها، الباقي [[a - c]] لازم يكون اتكوّن بأقل عدد ممكن. فجرّب كل عملة كآخر عملة، وخد الأحسن: [[dp[a] = 1 + أقل dp[a - c]]]. واملى الجدول من المبلغ 0 لحد amount.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل محاولة وقيمة الخانة. هنتتبع على input جديد: العملات [[[1, 4, 5]]] والمبلغ 8.

---

## ١. [[coinChange]] سطر سطر

### [[const dp = new Array(amount + 1).fill(Infinity);]]

خانة لكل مبلغ من 0 لـ amount، وكلها [[Infinity]] يعني «لسه منعرفش نكوّنه». ليه Infinity مش 0 أو -1؟ لأننا هناخد **الأقل**، وأي رقم حقيقي أقل من Infinity، فأول طريقة نلاقيها هتكسب. وجرّبنا: [[Infinity + 1]] لسه [[Infinity]]، فالمبلغ المستحيل بيفضل مستحيل من غير أي [[if]].

### [[dp[0] = 0;]]

المبلغ صفر محتاج صفر عملات. دي الخانة الوحيدة المعروفة من الأول، وكل الباقي بيتبني عليها.

### الـ loopين

~~~js
for (let a = 1; a <= amount; a++)
  for (const c of coins)
    if (c <= a && dp[a - c] + 1 < dp[a]) dp[a] = dp[a - c] + 1;
~~~

- برّا: كل مبلغ من الصغير للكبير، عشان [[dp[a - c]]] (مبلغ أصغر) يكون اتحسب.
- جوه: جرّب كل عملة كآخر عملة.
- [[c <= a]]: العملة مش أكبر من المبلغ (غير كده [[a - c]] هيبقى سالب). و [[&&]] بتوقف لو الشرط ده [[false]]، فمش هنقرا [[dp]] بـ index سالب.
- [[dp[a - c] + 1 < dp[a]]]: «الباقي بأحسن طريقة، + العملة دي» أحسن من اللي لقيناه لحد دلوقتي؟ خده.

مفيش أقواس [[{}]] للـ loops: لو جسم الـ loop أو الـ if سطر واحد، ينفع من غيرها.

### [[return dp[amount] === Infinity ? -1 : dp[amount];]]

[[? :]] اسمه ternary: لو الشرط صح خد اللي بعد [[?]]، غير كده اللي بعد [[:]]. لو لسه Infinity، مستحيل: [[-1]].

---

## ٢. التتبع: [[coinChange([1, 4, 5], 8)]]

| a | المحاولات (dp[a - c] + 1) | [[dp[a]]] |
|---|---|---|
| 0 | base | 0 |
| 1 | c=1: dp[0]+1 = 1 | 1 |
| 2 | c=1: dp[1]+1 = 2 | 2 |
| 3 | c=1: dp[2]+1 = 3 | 3 |
| 4 | c=1: 4، c=4: dp[0]+1 = 1 | 1 |
| 5 | c=1: 2، c=4: 2، c=5: dp[0]+1 = 1 | 1 |
| 6 | c=1: 2، c=4: 3، c=5: 2 | 2 |
| 7 | c=1: 3، c=4: 4، c=5: 3 | 3 |
| 8 | c=1: 4، c=4: dp[4]+1 = 2، c=5: 4 | 2 |

الجدول في الآخر: [[[0, 1, 2, 3, 1, 1, 2, 3, 2]]]، والإجابة 2 (4 + 4).

لاحظ إن العملة 4 (مش أكبر عملة) هي اللي كسبت عند 8. الـ greedy (خد أكبر عملة الأول) كان هياخد 5، وبعدين 1 و 1 و 1: ٤ عملات. عشان كده دي DP مش greedy.

### والمستحيل: [[coinChange([3], 5)]]

| a | المحاولة | [[dp[a]]] |
|---|---|---|
| 1 و 2 | العملة 3 أكبر، مفيش محاولة | ∞ |
| 3 | dp[0]+1 = 1 | 1 |
| 4 | dp[1]+1 = ∞ | ∞ |
| 5 | dp[2]+1 = ∞ | ∞ |

[[dp[5]]] فضلت Infinity، فرجعت [[-1]].

---

## ٣. [[countWays]]: عدد الطرق مش أقل عدد

~~~js
const ways = new Array(amount + 1).fill(0);
ways[0] = 1;
for (const c of coins)
  for (let a = c; a <= amount; a++) ways[a] += ways[a - c];
~~~

- [[ways[a]]] = عدد الطرق اللي تكوّن بيها a. بتبدأ 0 (مفيش طرق لسه).
- [[ways[0] = 1]]: المبلغ صفر ليه طريقة واحدة: متاخدش ولا عملة. لو خليتها 0، كل حاجة هتفضل 0.
- [[+=]] مش [[min]]: هنا بنجمع الطرق.
- [[a = c]]: بنبدأ من قيمة العملة، لأن أي مبلغ أصغر منها مينفعش تستخدمها فيه.
- **العملات في الـ loop اللي برّا:** بعد ما نخلص العملة 1، بندخل 2، وبعدها 3. فأي طريقة بتتبني بالعملات بترتيب ثابت، و [1, 3] و [3, 1] بيتعدوا طريقة واحدة.

### التتبع: [[countWays([1, 2, 3], 4)]]

| بعد العملة | [[ways]] (المبالغ 0 لـ 4) |
|---|---|
| البداية | [1, 0, 0, 0, 0] |
| 1 | [1, 1, 1, 1, 1] |
| 2 | [1, 1, 2, 2, 3] |
| 3 | [1, 1, 2, 3, 4] |

الإجابة 4: (1+1+1+1)، و (1+1+2)، و (2+2)، و (1+3).

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
3
-1
2
0
4
~~~

| النداء | الإجابة | ليه |
|---|---|---|
| [[([1, 2, 5], 11)]] | 3 | 5 + 5 + 1 |
| [[([2], 3)]] | -1 | مبلغ فردي بعملات زوجية |
| [[([1, 3, 4], 6)]] | 2 | 3 + 3، والـ greedy كان هيقول 4 + 1 + 1 |
| [[([7], 0)]] | 0 | الـ loop مبيلفش، و [[dp[0] = 0]] |
| [[countWays([1, 2, 5], 5)]] | 4 | 5، و 2+2+1، و 2+1+1+1، و 1×5 |

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(amount × coins)]] | لكل مبلغ (amount) بنجرّب كل عملة |
| الذاكرة | [[O(amount)]] | الجدول بس |

ده اسمه pseudo-polynomial: الوقت مربوط بقيمة المبلغ نفسه مش بعدد العملات. مبلغ مليار مع ٣ عملات = ٣ مليار خطوة وجدول مليار خانة.

---

## الخلاصة

~~~text
الحالة        dp[a] = أقل عدد عملات للمبلغ a
الانتقال      dp[a] = 1 + min(dp[a - c]) لكل c ≤ a
الـ base      dp[0] = 0، والباقي Infinity
الإجابة       dp[amount]، ولو Infinity يبقى -1
عدد الطرق     ways[0] = 1، و += بدل min، والعملات في الـ loop اللي برّا
~~~

> «أقل عدد» = [[min]] و Infinity في الأول. «عدد الطرق» = [[+=]] و 0 في الأول (غير خانة الصفر). نفس الجدول، والفرق في العملية والقيمة الأولية.`,
          lines: [
            "أقل عدد عملات.",
            "dp[a] = أقل عدد للمبلغ a، وكله مستحيل في الأول.",
            "المبلغ 0 محتاج 0 عملات.",
            "لكل مبلغ من الصغير للكبير.",
            "جرّب كل عملة كآخر عملة.",
            "لو العملة تنفع، والباقي ممكن، وده أحسن: خده.",
            "لسه مستحيل؟ -1.",
            "قفلة.",
            "عدد الطرق (من غير ما الترتيب يفرق).",
            "ways[a] = عدد الطرق للمبلغ a.",
            "المبلغ 0: طريقة واحدة (متاخدش حاجة).",
            "العملات برّا: كل تركيبة تتعد مرة واحدة.",
            "كل مبلغ ≥ العملة: ضيف طرق الباقي.",
            "الإجابة.",
            "قفلة.",
            "5 + 5 + 1.",
            "مبلغ فردي بعملة 2 بس: مستحيل.",
            "3 + 3، مش 4 + 1 + 1.",
            "مبلغ 0.",
            "٤ طرق للـ 5."
          ],
          check: {
            lang: "js",
            starter: R`function coinsUsed(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  const pick = new Array(amount + 1);
  dp[0] = 0;
  // كل ما dp[a] تتحسن احفظ pick[a] = c، وبعدين ارجع من amount لـ 0
  return null;
}`,
            tests: R`const sorted = a => a && [...a].sort((x, y) => x - y);
test("([1, 2, 5], 11) ← [1, 5, 5]", () => expect(sorted(coinsUsed([1, 2, 5], 11))).toEqual([1, 5, 5]));
test("([1, 3, 4], 6) ← [3, 3] (الـ greedy كان هيقول 4 + 1 + 1)", () => expect(sorted(coinsUsed([1, 3, 4], 6))).toEqual([3, 3]));
test("([2], 3) ← null", () => expect(coinsUsed([2], 3)).toBe(null));
test("([7], 0) ← []", () => expect(coinsUsed([7], 0)).toEqual([]));
test("([1, 7, 13], 10000): المجموع صح وعدد العملات أقل عدد (O(amount × coins))", () => {
  const r = coinsUsed([1, 7, 13], 10000);
  const dp = new Array(10001).fill(Infinity); dp[0] = 0;
  for (let a = 1; a <= 10000; a++) for (const c of [1, 7, 13]) if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
  expect([r.reduce((s, x) => s + x, 0), r.length]).toEqual([10000, dp[10000]]);
});`,
            solution: R`function coinsUsed(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  const pick = new Array(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++)
    for (const c of coins)
      if (c <= a && dp[a - c] + 1 < dp[a]) { dp[a] = dp[a - c] + 1; pick[a] = c; }
  if (dp[amount] === Infinity) return null;
  const out = [];
  for (let a = amount; a > 0; a -= pick[a]) out.push(pick[a]);
  return out;
}`
          }
        },
        {
          cmd: "LCS (2D table)",
          title: "أطول subsequence مشتركة بين نصين (Longest Common Subsequence)",
          desc: R`subsequence: حروف من النص بنفس ترتيبها، بس مش لازم متجاورة. [["ace"]] subsequence من [["abcde"]]. الـ LCS بين نصين هي أطول subsequence موجودة في الاتنين.

هنا الحالة محتاجة رقمين، فالجدول 2D: [[dp[i][j]]] = طول الـ LCS بين أول i حروف من a وأول j حروف من b.

الانتقال: لو الحرف رقم i في a هو نفسه الحرف رقم j في b، يبقى هو جزء من الـ LCS: [[dp[i - 1][j - 1] + 1]]. لو مختلفين، واحد منهم على الأقل مش هيدخل، فخد الأحسن بين «شيل حرف من a» و «شيل حرف من b».

الـ base: الصف 0 والعمود 0 كلهم 0 (نص فاضي ملوش حاجة مشتركة مع أي حاجة). وعشان كده الجدول أكبر بواحد في كل اتجاه.

وعشان تطلّع النص نفسه مش طوله بس: ابدأ من آخر خانة وارجع لورا. لو الحرفين متساويين، ده حرف في الناتج وارجع قطري. غير كده، روح ناحية الخانة الأكبر.`,
          example: R`function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  let i = a.length, j = b.length, text = "";
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) { text = a[i - 1] + text; i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
    else j--;
  }
  return { length: dp[a.length][b.length], text };
}
console.log(lcs("abcde", "ace")); // { length: 3, text: 'ace' }
console.log(lcs("abc", "def")); // { length: 0, text: '' }
console.log(lcs("AGGTAB", "GXTXAYB")); // { length: 4, text: 'GTAB' }
// O(n × m) time and space (n and m are the two lengths)`,
          try: R`حل «Edit Distance»: أقل عدد عمليات (إضافة حرف، أو مسح حرف، أو تبديل حرف) عشان تحوّل كلمة لكلمة. [[("horse", "ros")]] = 3، و [[("intention", "execution")]] = 5، و [[("", "abc")]] = 3. نفس شكل الجدول بالظبط، بس فكّر: الصف 0 والعمود 0 قيمتهم إيه هنا؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[editDistance(a, b)]].`,
          sol: R`الإجابات 3 و 5 و 3.

[[dp[i][j]]] = أقل عمليات لتحويل أول i حروف من a لأول j حروف من b. الـ base مختلف عن LCS: [[dp[i][0] = i]] (امسح i حروف)، و [[dp[0][j] = j]] (ضيف j حروف). لو خليتهم 0 زي LCS، الإجابة هتطلع أقل من الحقيقة.

لو الحرفين متساويين: [[dp[i - 1][j - 1]]] من غير تكلفة. غير كده: 1 + الأقل بين [[dp[i - 1][j]]] (مسح)، و [[dp[i][j - 1]]] (إضافة)، و [[dp[i - 1][j - 1]]] (تبديل).

horse ← ros: horse → rorse (بدّل h بـ r) → rose (امسح r) → ros (امسح e). ٣ عمليات.

ده اسمه Levenshtein distance، وهو اللي ورا «هل تقصد...؟» في البحث، و fuzzy matching في أسماء المنتجات.`,
          solCode: R`function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => new Array(b.length + 1).fill(0).map((_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
}
console.log(editDistance("horse", "ros")); // 3
console.log(editDistance("intention", "execution")); // 5
console.log(editDistance("", "abc"), editDistance("same", "same")); // 3 0
// O(n × m) time and space`,
          flag: "script",
          deep: {
            why: "LCS هي الفكرة ورا أدوات الـ diff: لما [[git diff]] بيوريك السطور اللي اتضافت واتمسحت، هو بيدوّر على أكبر جزء مشترك بين النسختين (git بيستخدم خوارزمية Myers، وهي قريبة من الفكرة دي بس أسرع). ونفس الجدول بيستخدم في مقارنة DNA، وكشف النقل، و «هل تقصد» في البحث. وفي الانترفيو هي مدخل مسائل الـ DP على نصين.",
            how: R`الجدول لـ "abcde" و "ace" (الصفوف a، والأعمدة b):

الصف a: [[0 1 1 1]]. الحرف a مشترك من أول.

الصف b: [[0 1 1 1]]. b مش في "ace"، فبناخد الأكبر من فوق أو من الشمال.

الصف c: [[0 1 2 2]]. c = c، قطري + 1 = 2.

الصف d: [[0 1 2 2]]. والصف e: [[0 1 2 3]]. e = e، قطري + 1.

الإجابة في آخر خانة: 3. والرجوع: e = e، خدها وارجع قطري. d ≠ e، روح للأكبر. c = c خدها. b ≠ a، ... a = a خدها. النص "ace".

ليه [[a[i - 1]]] مش [[a[i]]]؟ لأن الجدول مزاح بواحد عشان الصف والعمود 0 (النص الفاضي). أكتر مصدر للـ bugs في الجداول 2D.

الذاكرة ممكن تبقى [[O(m)]] لو محتاج الطول بس: كل صف معتمد على الصف اللي قبله بس، فخلّي صفين. بس لو محتاج النص نفسه، لازم الجدول كله (أو خوارزمية Hirschberg).`,
            when: "أي مسألة على نصين أو قائمتين وسؤالها عن «مشترك» أو «تحويل» أو «تطابق»: LCS، و Edit Distance، و Longest Common Substring (متجاورة: الخانة بتبقى 0 لو الحرفين مختلفين)، و Interleaving String، و Regular Expression Matching. الجدول دايمًا (n + 1) × (m + 1).",
            mistakes: R`الخلط بين subsequence (مش لازم متجاورة) و substring (لازم متجاورة). والـ off-by-one بين الجدول والنص. وإنشاء الجدول بـ [[new Array(n).fill(new Array(m).fill(0))]]: كل الصفوف نفس الـ array! استخدم [[Array.from]]. ونسيان الـ base cases في Edit Distance. وفي الانترفيو: ارسم الجدول الصغير بإيدك قبل الكود، ده بيوفّر وقت.`
          },
          teach: R`## الفكرة في جملة

قارن آخر حرف في النصين. لو زي بعض، هو أكيد في الـ LCS، فالإجابة = 1 + الـ LCS من غيرهم الاتنين. لو مختلفين، واحد منهم على الأقل مش هيدخل، فجرّب تشيل ده أو ده وخد الأحسن. ولأن كل حالة فيها رقمين (كام حرف من a وكام حرف من b)، الجدول 2D.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل خانة وهي بتتحسب، والجدول كله، وكل خطوة في الرجوع. هنتتبع على input جديد: [[lcs("GAME", "ACME")]].

---

## ١. بناء الجدول

~~~js
const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
~~~

- [[Array.from({ length: n + 1 }, fn)]]: array فيها n + 1 صف، والدالة بتتنده لكل صف وبترجّع **array جديدة** (m + 1 خانة كلها 0).
- [[dp[i][j]]] = طول الـ LCS بين **أول i حروف** من a و **أول j حروف** من b.
- ليه + 1؟ عشان الصف 0 والعمود 0 = «نص فاضي»، والـ LCS مع نص فاضي = 0. الأصفار دي هي الـ base cases ببلاش.

> ليه مش [[new Array(n).fill(new Array(m).fill(0))]]؟ جرّبنا: غيّرنا [[bad[0][0] = 9]]، فطلع [[[[9, 0], [9, 0]]]]. [[fill]] حط **نفس** الصف في كل مكان، فأي تعديل بيظهر في كل الصفوف.

---

## ٢. ملي الجدول

~~~js
for (let i = 1; i <= a.length; i++)
  for (let j = 1; j <= b.length; j++)
    dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
~~~

- [[a[i - 1]]] مش [[a[i]]]: الجدول مزاح بواحد. الخانة i في الجدول = أول i حروف، وآخر حرف فيهم في الـ string عند index [[i - 1]].
- [[? :]]: لو الحرفين زي بعض، **قطري** + 1 ([[dp[i - 1][j - 1]]] = من غير الحرفين).
- غير كده الأكبر بين **فوق** ([[dp[i - 1][j]]] = شيل حرف a) و **شمال** ([[dp[i][j - 1]]] = شيل حرف b).

الخانات اللي بنقرا منها (فوق، وشمال، وقطري) كلها اتحسبت قبل كده، لأننا ماشيين صف صف من فوق، وفي كل صف من الشمال.

### التتبع: كل خانة

| الصف (حرف a) | j=1 (A) | j=2 (C) | j=3 (M) | j=4 (E) |
|---|---|---|---|---|
| i=1 (G) | مختلف: max(0, 0) = 0 | max(0, 0) = 0 | max(0, 0) = 0 | max(0, 0) = 0 |
| i=2 (A) | **زي بعض:** 0 + 1 = 1 | max(فوق 0، شمال 1) = 1 | max(0, 1) = 1 | max(0, 1) = 1 |
| i=3 (M) | max(1, 0) = 1 | max(1, 1) = 1 | **زي بعض:** 1 + 1 = 2 | max(1, 2) = 2 |
| i=4 (E) | max(1, 0) = 1 | max(1, 1) = 1 | max(2, 1) = 2 | **زي بعض:** 2 + 1 = 3 |

### الجدول الكامل

~~~text dp (الصفوف حروف GAME، والأعمدة حروف ACME)
      -  A  C  M  E
  -   0  0  0  0  0
  G   0  0  0  0  0
  A   0  1  1  1  1
  M   0  1  1  2  2
  E   0  1  1  2  3
~~~

الصف G كله أصفار: G مش موجودة في ACME. والإجابة في آخر خانة: [[dp[4][4]]] = 3.

---

## ٣. الرجوع عشان نطلّع النص

~~~js
let i = a.length, j = b.length, text = "";
while (i > 0 && j > 0) {
  if (a[i - 1] === b[j - 1]) { text = a[i - 1] + text; i--; j--; }
  else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
  else j--;
}
~~~

الجدول بيقول الطول بس. عشان النص، ابدأ من آخر خانة واعمل نفس القرار بالعكس:

- الحرفين زي بعض: ده حرف من الـ LCS. حطه **في أول** [[text]] (لأننا ماشيين من الآخر)، وارجع قطري.
- مختلفين: روح ناحية الخانة الأكبر (اللي القيمة جت منها). ولو متساويين، الكود بيطلع لفوق ([[>=]]).

| الخانة | الحرفين | القرار | [[text]] |
|---|---|---|---|
| i=4 j=4 | E و E | زي بعض، قطري | E |
| i=3 j=3 | M و M | زي بعض، قطري | ME |
| i=2 j=2 | A و C | مختلفين: فوق 0، شمال 1، روح شمال | ME |
| i=2 j=1 | A و A | زي بعض، قطري | AME |
| i=1 j=0 | | [[j]] بقى 0، الـ loop وقف | AME |

الناتج: [[{ length: 3, text: 'AME' }]].

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
{ length: 3, text: 'ace' }
{ length: 0, text: '' }
{ length: 4, text: 'GTAB' }
~~~

- [["abcde"]] و [["ace"]]: كل حروف ace موجودة بالترتيب في abcde.
- [["abc"]] و [["def"]]: الجدول كله أصفار، والرجوع مبيلاقيش ولا حرف.
- [["AGGTAB"]] و [["GXTXAYB"]]: GTAB موجودة بالترتيب في الاتنين، مش متجاورة.

> لو فيه أكتر من LCS بنفس الطول، الكود بيرجّع واحدة بس. أي واحدة بالظبط بيحددها اختيار [[>=]] (اطلع لفوق عند التساوي).

---

## ٥. الـ Big-O وليه

n و m طول النصين.

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n × m)]] | كل خانة في الجدول بتتحسب مرة بـ [[O(1)]]، والرجوع [[O(n + m)]] بس |
| الذاكرة | [[O(n × m)]] | الجدول كله. لو محتاج الطول بس، صفين كفاية ([[O(m)]]) لأن كل صف بيقرا من اللي فوقه بس |

---

## الخلاصة

~~~text
الحالة       dp[i][j] = LCS بين أول i حروف من a وأول j حروف من b
الجدول       (n + 1) × (m + 1)، بـ Array.from، والصف/العمود 0 أصفار
زي بعض       dp[i-1][j-1] + 1 (قطري)
مختلفين      max(فوق، شمال)
الحرف        a[i - 1] مش a[i]
النص         ارجع من آخر خانة: زي بعض = خده وقطري، غير كده للأكبر
~~~

> أي DP على نصين: الجدول (n + 1) × (m + 1)، والخانة بتقرا من فوق وشمال وقطري. اللي بيتغير من مسألة للتانية هو القيمة الأولية للصف والعمود 0، والعملية في الخانة.`,
          lines: [
            "LCS بين a و b.",
            "جدول (n+1) × (m+1) كله أصفار، وكل صف array مستقلة.",
            "لكل حرف في a.",
            "ولكل حرف في b.",
            "متساويين: قطري + 1. مختلفين: الأكبر من فوق أو من الشمال.",
            "نرجع من آخر خانة عشان نطلّع النص.",
            "طول ما لسه في الاتنين حروف.",
            "حرف مشترك: ضيفه في أول النص وارجع قطري.",
            "اللي فوق أكبر أو يساوي: اطلع.",
            "غير كده روح شمال.",
            "قفلة.",
            "الطول والنص.",
            "قفلة.",
            "a و c و e.",
            "مفيش حاجة مشتركة.",
            "مثال أطول: GTAB."
          ],
          check: {
            lang: "js",
            starter: R`function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  // الصف 0 والعمود 0 هنا مش أصفار: dp[i][0] = i و dp[0][j] = j
  return dp[a.length][b.length];
}`,
            tests: R`test("('horse', 'ros') ← 3", () => expect(editDistance("horse", "ros")).toBe(3));
test("('intention', 'execution') ← 5", () => expect(editDistance("intention", "execution")).toBe(5));
test("('', 'abc') ← 3 و ('abc', '') ← 3", () => expect([editDistance("", "abc"), editDistance("abc", "")]).toEqual([3, 3]));
test("نفس الكلمة ← 0", () => expect(editDistance("same", "same")).toBe(0));
test("كلمتين 1000 حرف (O(n × m) = مليون خانة)", () => expect(editDistance("a".repeat(1000), "b".repeat(999) + "a")).toBe(999));`,
            solution: R`function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
}`
          }
        },
        {
          cmd: "0/1 knapsack",
          title: "شنطة سعتها محدودة: تاخد أنهي حاجات عشان القيمة تبقى أعلى؟ (0/1 knapsack)",
          desc: R`عندك حاجات، لكل واحدة وزن وقيمة، وشنطة سعتها capacity. كل حاجة يا تاخدها كلها يا متاخدهاش (0 أو 1)، ومتاخدش نفس الحاجة مرتين. أعلى قيمة كام؟

الحالة: [[dp[c]]] = أعلى قيمة بسعة c باستخدام الحاجات اللي اتفحصت لحد دلوقتي. ولكل حاجة جديدة، لكل سعة: يا إما متاخدهاش ([[dp[c]]] زي ما هي)، يا إما تاخدها ([[dp[c - w] + v]]).

السر في اتجاه الـ loop: السعة لازم تمشي من الكبير للصغير. ليه؟ عشان [[dp[c - w]]] لسه بقيمتها «قبل الحاجة دي». لو مشيت من الصغير للكبير، [[dp[c - w]]] ممكن تكون اتحدثت بالحاجة نفسها، فتاخدها مرتين. ده بالظبط الفرق بين 0/1 knapsack و unbounded knapsack (زي coin change): نفس السطر، واتجاه الـ loop بس هو اللي بيتغير.

ليه مش greedy (خد الأعلى قيمة لكل كيلو)؟ لأن الحاجات مش بتتقسم. وزن 1 قيمة 1، ووزن 3 قيمة 4، ووزن 4 قيمة 5، ووزن 5 قيمة 7، وسعة 7: أعلى نسبة هي وزن 5 (1.4 لكل كيلو)، وبعدها يفضل 2 كيلو ماينفعش فيهم غير وزن 1 = 8. بس 3 + 4 = 9.`,
          example: R`function knapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (const [i, w] of weights.entries())
    for (let c = capacity; c >= w; c--)
      dp[c] = Math.max(dp[c], dp[c - w] + values[i]);
  return dp[capacity];
}
function unbounded(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (const [i, w] of weights.entries())
    for (let c = w; c <= capacity; c++)
      dp[c] = Math.max(dp[c], dp[c - w] + values[i]);
  return dp[capacity];
}
console.log(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)); // 9
console.log(knapsack([2], [3], 4), unbounded([2], [3], 4)); // 3 6
console.log(knapsack([5], [10], 4)); // 0
// O(n × capacity) time, O(capacity) space`,
          try: R`حل «Partition Equal Subset Sum»: تقدر تقسم الأرقام لمجموعتين مجموعهم متساوي؟ [[[1, 5, 11, 5]]] true (11 و 1 + 5 + 5)، و [[[1, 2, 3, 5]]] false. ده knapsack متنكر: السعة = نص المجموع، والسؤال «فيه مجموعة جزئية مجموعها بالظبط كده؟». استخدم جدول true/false بدل القيم. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[canPartition(nums)]].`,
          sol: R`الإجابات: [[true]] و [[false]]، و [[[1, 1]]] true، و [[[3]]] false، و [[[2, 6]]] false.

لو المجموع فردي: false على طول. غير كده [[target = sum / 2]]، و [[can[s]]] = «ممكن أكوّن المجموع s». [[can[0] = true]]. لكل رقم، من target لتحت: [[can[s] = can[s] || can[s - x]]]. ومن الكبير للصغير عشان كل رقم يتاخد مرة واحدة (0/1).

ليه الاتجاه مهم؟ جرّب [[[2, 6]]]: المجموع 8 و target 4، والصح false (المجاميع الممكنة 0 و 2 و 6 و 8 بس). لو مشيت من الصغير للكبير مع x = 2: [[can[2]]] بتبقى true، وبعدين [[can[4]]] بتبص على [[can[2]]] اللي لسه متحدثة بنفس الـ 2، فتبقى true غلط، لأنك استخدمت 2 مرتين.

وفي JavaScript فيه حيلة: [[Set]] فيها كل المجاميع الممكنة لحد دلوقتي، ولكل رقم ضيف [[s + x]] لكل s. بتشتغل وأوضح، بس أبطأ من الـ array.`,
          solCode: R`function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2) return false;
  const target = sum / 2;
  const can = new Array(target + 1).fill(false);
  can[0] = true;
  for (const x of nums)
    for (let s = target; s >= x; s--)
      if (can[s - x]) can[s] = true;
  return can[target];
}
console.log(canPartition([1, 5, 11, 5]), canPartition([1, 2, 3, 5])); // true false
console.log(canPartition([1, 1]), canPartition([3]), canPartition([2, 6])); // true false false
// O(n × sum) time, O(sum) space`,
          flag: "script",
          deep: {
            why: "الـ knapsack هو شكل «اختار حاجات بقيد» اللي بيتكرر في الشغل: أنهي features تدخل الـ sprint في عدد ساعات محدود، وأنهي إعلانات تتعرض في مساحة محدودة، وأنهي ملفات تتحط في cache حجمه ثابت. وفي الانترفيو، نادرًا ما يتسأل باسمه، بس بيتسأل متنكر (Partition Equal Subset Sum و Target Sum و Last Stone Weight II).",
            how: R`الجدول الكامل 2D: [[dp[i][c]]] = أعلى قيمة من أول i حاجات بسعة c. [[dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - w] + v)]]. كل صف معتمد على الصف اللي قبله بس.

عشان نوفّر الذاكرة بنستخدم صف واحد، ونحدّثه في مكانه. ولما نحسب [[dp[c]]]، محتاجين [[dp[c - w]]] «القديمة» (من الصف اللي قبل). لو مشينا من الكبير للصغير، [[c - w]] أصغر من c فلسه ماتحدثتش. ده سبب الاتجاه.

dry run لـ [[([2], [3], 4)]]: 0/1 من 4 لـ 2: [[dp[4] = max(0, dp[2] + 3) = 3]] (dp[2] لسه 0)، و [[dp[2] = 3]]. الإجابة 3. unbounded من 2 لـ 4: [[dp[2] = 3]]، وبعدين [[dp[4] = dp[2] + 3 = 6]]: الحاجة اتاخدت مرتين، وده المطلوب في unbounded.

الـ Big-O [[O(n × capacity)]]، وده pseudo-polynomial: لو السعة مليار مش هينفع. الـ knapsack في العموم مسألة NP-hard، ومفيش حل polynomial معروف في عدد الـ bits بتاعة الأرقام.`,
            when: "0/1: كل حاجة مرة واحدة (اختيار features، تقسيم مجموعة، Target Sum). unbounded: نفس الحاجة ممكن تتكرر (coin change، تقطيع حبل). fractional (تقدر تاخد جزء من الحاجة، زي دهب بودرة): هنا الـ greedy بالنسبة (قيمة/وزن) صح.",
            mistakes: R`اتجاه الـ loop الغلط (بيحوّلها unbounded من غير ما تاخد بالك). والـ greedy بالنسبة في 0/1. وإنك تبدأ الـ loop من 0 بدل وزن الحاجة فتقرا [[dp[-1]]] (undefined، و [[Math.max]] مع NaN بترجّع NaN). وفي الانترفيو، لما تشوف «قسّم لمجموعتين» أو «اختار مجموعة جزئية مجموعها كذا»، قول «ده knapsack» بصوت عالي.`
          },
          teach: R`## الفكرة في جملة

خد الحاجات واحدة واحدة. لكل حاجة، ولكل سعة c، فيه اختيارين بس: متاخدهاش (القيمة زي ما هي [[dp[c]]])، أو تاخدها (قيمتها + أحسن حاجة في السعة اللي فاضلة [[dp[c - w]]]). خد الأكبر. والسعة لازم تمشي **من الكبير للصغير**، عشان كل حاجة تتاخد مرة واحدة بس.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل قرار والجدول بعد كل حاجة. هنتتبع على input جديد: الأوزان [[[2, 3, 4]]]، والقيم [[[3, 4, 6]]]، والسعة 7.

---

## ١. [[knapsack]] سطر سطر

### [[const dp = new Array(capacity + 1).fill(0);]]

[[dp[c]]] = أعلى قيمة تقدر تحطها في شنطة سعتها c، بالحاجات اللي اتفحصت لحد دلوقتي. في الأول مفيش حاجات، فكله 0. والطول capacity + 1 عشان من سعة 0 لحد capacity.

### [[for (const [i, w] of weights.entries())]]

[[entries()]] بتطلّع أزواج [[[index, value]]]. جرّبنا: [[[...[10, 20].entries()]]] طلعت [[[[0, 10], [1, 20]]]]. فـ [[i]] رقم الحاجة (عشان نجيب [[values[i]]])، و [[w]] وزنها.

### [[for (let c = capacity; c >= w; c--)]]

السعة من capacity لتحت، ولحد [[w]] بس: أي سعة أصغر من وزن الحاجة مينفعش تتحط فيها، فالخانة دي بتفضل زي ما هي من غير ما نلمسها.

### [[dp[c] = Math.max(dp[c], dp[c - w] + values[i]);]]

- [[dp[c]]] (اللي على اليمين): القيمة **قبل** الحاجة دي = متاخدهاش.
- [[dp[c - w] + values[i]]]: خدها، وفاضل [[c - w]] سعة، واملاها بأحسن حاجة من الحاجات اللي **قبلها**.

---

## ٢. ليه من الكبير للصغير؟

الجدول ده صف واحد بنكتب فوقه. لما بنحسب [[dp[c]]] محتاجين [[dp[c - w]]] **القديمة** (قبل الحاجة الحالية). ولأن [[c - w]] أصغر من c، لو ماشيين من الكبير للصغير، الخانة الأصغر لسه متحدثتش. لو مشينا العكس، تكون اتحدثت بالحاجة نفسها، فتتاخد مرتين.

جرّبناها على حاجة واحدة، وزن 3 وقيمة 5، والسعة 6:

| الاتجاه | الجدول في الآخر | الإجابة |
|---|---|---|
| من الكبير للصغير ([[knapsack]]) | [0, 0, 0, 5, 5, 5, 5] | 5: الحاجة مرة |
| من الصغير للكبير ([[unbounded]]) | [0, 0, 0, 5, 5, 5, 10] | 10: الحاجة اتاخدت مرتين |

في الـ unbounded: عند c = 3 بقت [[dp[3] = 5]]، وبعدين عند c = 6 قرت [[dp[3]]] الجديدة (اللي فيها الحاجة) وضافت عليها 5 كمان.

---

## ٣. التتبع: [[knapsack([2, 3, 4], [3, 4, 6], 7)]]

### الحاجة 0: وزن 2، قيمة 3

كل سعة من 7 لـ 2: [[dp[c - 2]]] كلها لسه 0، فـ «خدها» = 3 أحسن من 0.

~~~text بعد الحاجة 0
c:    0  1  2  3  4  5  6  7
dp:   0  0  3  3  3  3  3  3
~~~

### الحاجة 1: وزن 3، قيمة 4

| c | متاخدهاش | خدها | النتيجة |
|---|---|---|---|
| 7 | 3 | dp[4] + 4 = 7 | 7 |
| 6 | 3 | dp[3] + 4 = 7 | 7 |
| 5 | 3 | dp[2] + 4 = 7 | 7 |
| 4 | 3 | dp[1] + 4 = 4 | 4 |
| 3 | 3 | dp[0] + 4 = 4 | 4 |

~~~text بعد الحاجة 1
c:    0  1  2  3  4  5  6  7
dp:   0  0  3  4  4  7  7  7
~~~

7 عند سعة 5 = الحاجتين (2 + 3 كيلو، 3 + 4 قيمة).

### الحاجة 2: وزن 4، قيمة 6

| c | متاخدهاش | خدها | النتيجة |
|---|---|---|---|
| 7 | 7 | dp[3] + 6 = 10 | 10 |
| 6 | 7 | dp[2] + 6 = 9 | 9 |
| 5 | 7 | dp[1] + 6 = 6 | 7 |
| 4 | 4 | dp[0] + 6 = 6 | 6 |

~~~text بعد الحاجة 2
c:    0  1  2  3  4  5  6  7
dp:   0  0  3  4  6  7  9  10
~~~

الإجابة [[dp[7]]] = 10: وزن 3 + وزن 4 (قيمة 4 + 6). لاحظ عند c = 7 إن [[dp[3]]] كانت لسه 4 (من الحاجة 1)، مش متحدثة بالحاجة 2، لأننا نزلنا من فوق.

---

## ٤. [[unbounded]]: نفس السطر، الاتجاه بس

~~~js
for (let c = w; c <= capacity; c++)
  dp[c] = Math.max(dp[c], dp[c - w] + values[i]);
~~~

من [[w]] لحد capacity، فالحاجة ممكن تتاخد أكتر من مرة. ده المطلوب لما الحاجات ملهاش عدد محدود (زي العملات في coin change).

---

## ٥. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
9
3 6
0
~~~

- [[([1, 3, 4, 5], [1, 4, 5, 7], 7)]]: وزن 3 + وزن 4 = قيمة 9. الـ greedy بالنسبة (قيمة لكل كيلو) كان هياخد وزن 5 الأول ويوصل 8 بس.
- [[([2], [3], 4)]]: 0/1 تاخدها مرة = 3، و unbounded مرتين = 6.
- [[([5], [10], 4)]]: الحاجة أتقل من الشنطة. الـ loop شرطه [[c >= 5]] و c بيبدأ من 4، فمبيلفش خالص، والإجابة 0.

---

## ٦. الـ Big-O وليه

n عدد الحاجات، و W السعة.

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n × W)]] | لكل حاجة بنعدي على السعات مرة |
| الذاكرة | [[O(W)]] | صف واحد بدل جدول n × W، لأن كل حاجة محتاجة الصف اللي قبلها بس |

pseudo-polynomial برضه: الوقت مربوط بقيمة السعة. سعة مليار مش هتنفع بالجدول ده.

---

## الخلاصة

~~~text
الحالة       dp[c] = أعلى قيمة بسعة c بالحاجات اللي اتفحصت
لكل حاجة     dp[c] = max(dp[c], dp[c - w] + v)
0/1          c من capacity لتحت لحد w  (كل حاجة مرة)
unbounded    c من w لفوق لحد capacity  (الحاجة تتكرر)
greedy       بالنسبة غلط في 0/1، لأن الحاجة مبتتقسمش
~~~

> في الـ DP بصف واحد، اتجاه الـ loop مش تفصيلة: هو اللي بيحدد إذا كانت [[dp[c - w]]] «قبل» الحاجة الحالية ولا «بعدها».`,
          lines: [
            "0/1 knapsack بصف واحد.",
            "dp[c] = أعلى قيمة بسعة c.",
            "لكل حاجة: رقمها ووزنها.",
            "السعة من الكبير للصغير (لحد وزن الحاجة).",
            "متاخدهاش، أو خدها + أحسن حاجة في السعة الباقية.",
            "الإجابة.",
            "قفلة.",
            "unbounded: نفس الكود.",
            "نفس الجدول.",
            "لكل حاجة.",
            "بس السعة من الصغير للكبير، فالحاجة ممكن تتاخد تاني.",
            "نفس السطر.",
            "الإجابة.",
            "قفلة.",
            "وزن 3 + وزن 4 = قيمة 9.",
            "0/1 تاخدها مرة (3)، و unbounded مرتين (6).",
            "الحاجة أتقل من الشنطة."
          ],
          check: {
            lang: "js",
            starter: R`function canPartition(nums) {
  const sum = nums.reduce((s, x) => s + x, 0);
  // لو فردي false، وإلا can[s] من target لتحت
  return false;
}`,
            tests: R`test("[1, 5, 11, 5] ← true", () => expect(canPartition([1, 5, 11, 5])).toBe(true));
test("[1, 2, 3, 5] ← false", () => expect(canPartition([1, 2, 3, 5])).toBe(false));
test("[1, 1] ← true و [3] ← false", () => expect([canPartition([1, 1]), canPartition([3])]).toEqual([true, false]));
test("فخ الاتجاه: [2, 6] ← false (لو مشيت من الصغير للكبير هتستخدم 2 مرتين)", () => expect(canPartition([2, 6])).toBe(false));
test("200 رقم مجموعهم 20000 (O(n × sum))", () => {
  const nums = Array.from({ length: 200 }, (_, i) => (i % 2 ? 99 : 101));
  expect([canPartition(nums), canPartition([...new Array(199).fill(100), 102])]).toEqual([true, false]);
});`,
            solution: R`function canPartition(nums) {
  const sum = nums.reduce((s, x) => s + x, 0);
  if (sum % 2) return false;
  const target = sum / 2;
  const can = new Array(target + 1).fill(false);
  can[0] = true;
  for (const x of nums)
    for (let s = target; s >= x; s--) can[s] = can[s] || can[s - x];
  return can[target];
}`
          }
        },
        {
          cmd: "greedy (interval scheduling)",
          title: "خد أحسن اختيار دلوقتي وماترجعش فيه: إمتى الـ greedy بينفع، وإمتى بيخونك؟",
          desc: R`الـ greedy: في كل خطوة خد الاختيار اللي باين أحسن دلوقتي، ومترجعش فيه أبدًا. أسرع وأبسط من DP بكتير، بس مش دايمًا صح.

مثال بيشتغل: interval scheduling. عندك اجتماعات ليها بداية ونهاية، وقاعة واحدة. أكبر عدد اجتماعات تقدر تعملهم من غير تعارض؟ رتّب بالنهاية، وخد أي اجتماع بيبدأ بعد نهاية آخر واحد خدته. ليه بالنهاية؟ الاجتماع اللي بيخلص بدري بيسيب أكبر وقت للباقي. الترتيب بالبداية أو بالمدة بيطلّع إجابات غلط.

مثال بيخونك: الفكة. «خد أكبر عملة الأول» بيشتغل مع الجنيه والدولار (1 و 5 و 10 و 25)، بس مع عملات [[[1, 3, 4]]] ومبلغ 6: الـ greedy بياخد 4 + 1 + 1 (٣ عملات)، والصح 3 + 3 (عملتين). ومع [[[3, 4]]] ومبلغ 6، الـ greedy بياخد 4 وبعدين مش لاقي حاجة، فيقول مستحيل، مع إن 3 + 3 موجودة. عشان كده Coin Change في درس «coin change (DP)» اتحلت DP.

القاعدة: الـ greedy صح بس لو تقدر تثبت إن الاختيار المحلي عمره ما بيبوّظ أحسن حل. لو مش قادر تثبت، دوّر على مثال مضاد صغير. ولو لقيته، ده DP.`,
          example: R`function maxMeetings(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  const chosen = [];
  let lastEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      chosen.push([start, end]);
      lastEnd = end;
    }
  }
  return chosen;
}
function greedyCoins(coins, amount) {
  let count = 0;
  for (const c of [...coins].sort((a, b) => b - a)) {
    count += Math.floor(amount / c);
    amount %= c;
  }
  return amount === 0 ? count : -1;
}
const meetings = [[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11], [8, 12], [2, 14], [12, 16]];
console.log(maxMeetings(meetings)); // [[1, 4], [5, 7], [8, 11], [12, 16]]
console.log(greedyCoins([1, 5, 10, 25], 63)); // 6
console.log(greedyCoins([1, 3, 4], 6)); // 3
console.log(greedyCoins([3, 4], 6)); // -1
// maxMeetings: O(n log n) for the sort; greedyCoins: O(k log k) for k coin types`,
          try: R`حل «Non-overlapping Intervals»: أقل عدد فترات تشيلها عشان الباقي ميتداخلش. [[[[1,2],[2,3],[3,4],[1,3]]]] الإجابة 1، و [[[[1,2],[1,2],[1,2]]]] الإجابة 2. (فكّر: ده مرتبط بـ [[maxMeetings]] إزاي؟) وبعدين «Jump Game»: كل خانة فيها أقصى قفزة منها، تقدر توصل للآخر؟ [[[2,3,1,1,4]]] true و [[[3,2,1,0,4]]] false. وبعدين جرّب ترتّب الاجتماعات بالبداية بدل النهاية وشوف [[maxMeetings]] بتطلّع كام. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[eraseOverlap(intervals)]] و [[canJump(nums)]].`,
          sol: R`Non-overlapping Intervals = العدد الكلي ناقص أكبر عدد فترات مش متداخلة، يعني [[n - maxMeetings(intervals).length]]. الإجابات 1 و 2. الفترات اللي بتلمس بعض ([1,2] و [2,3]) مش متداخلة، عشان كده الشرط [[>=]].

Jump Game: امشي من الشمال واحفظ [[reach]] = أبعد خانة تقدر توصلها. لو وصلت لخانة [[i > reach]]، معناها في حتة مش هتعرف تعدّيها: false. غير كده [[reach = max(reach, i + nums[i])]]. [[O(n)]] وقت و [[O(1)]] ذاكرة. في [[[3,2,1,0,4]]] كل الطرق بتقف عند index 3 (قيمته 0).

الترتيب بالبداية: [[[0, 6]]] بيتاخد الأول لأنه بيبدأ بدري، وبيقفل القاعة لحد 6، فبتطلع 3 اجتماعات بس بدل 4. ده المثال المضاد اللي بيثبت إن الترتيب بالنهاية هو الصح.`,
          solCode: R`function maxMeetings(intervals, key = 1) {
  const sorted = [...intervals].sort((a, b) => a[key] - b[key]);
  let count = 0, lastEnd = -Infinity;
  for (const [start, end] of sorted) if (start >= lastEnd) { count++; lastEnd = end; }
  return count;
}
const eraseOverlap = intervals => intervals.length - maxMeetings(intervals);
function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
console.log(eraseOverlap([[1, 2], [2, 3], [3, 4], [1, 3]]), eraseOverlap([[1, 2], [1, 2], [1, 2]])); // 1 2
console.log(canJump([2, 3, 1, 1, 4]), canJump([3, 2, 1, 0, 4])); // true false
const meetings = [[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11], [8, 12], [2, 14], [12, 16]];
console.log(maxMeetings(meetings, 1), maxMeetings(meetings, 0)); // 4 3
// eraseOverlap: O(n log n); canJump: O(n) time, O(1) space`,
          flag: "script",
          deep: {
            why: "الـ greedy في كل حتة لأنه بسيط وسريع: جدولة الاجتماعات والقاعات، و Huffman coding في الضغط (gzip)، و Dijkstra (بياخد أقرب عقدة كل مرة)، و load balancers بتبعت للسيرفر الأقل حمل. والانترفيو بيحب يختبرك: هل هتقع في greedy غلط؟ وهل تعرف تثبت إن الـ greedy صح؟",
            how: R`ليه الترتيب بالنهاية صح؟ (فكرة الإثبات «exchange argument»): خد أي حل أحسن. أول اجتماع فيه ممكن تبدّله بالاجتماع اللي بيخلص الأبدر، والحل يفضل صحيح (لأنه بيخلص بدري أو في نفس الوقت، فمش هيتعارض مع التاني). يبقى فيه حل أحسن بيبدأ باختيارنا، وكرّر نفس الكلام على الباقي.

dry run: بعد الترتيب بالنهاية: [1,4] [3,5] [0,6] [5,7] [3,9] [5,9] [6,10] [8,11] [8,12] [2,14] [12,16]. خد [1,4]، lastEnd = 4. [3,5] بيبدأ 3 < 4، فوّت. [0,6] فوّت. [5,7] 5 ≥ 4 خده، lastEnd = 7. فوّت لحد [8,11] خده، lastEnd = 11. فوّت لحد [12,16] خده. ٤ اجتماعات.

ليه الـ greedy بتاع الفكة بيشتغل مع 1 و 5 و 10 و 25؟ لأن العملات دي «canonical»: أي كمية من العملات الصغيرة بتساوي عملة كبيرة ممكن تتبدل بيها وتقلل العدد. مع [[[1, 3, 4]]] ده مش صحيح: 3 + 3 = 6 مينفعش يتبدل بـ 4 + حاجة أقل عدد.

إزاي تعرف بسرعة؟ جرّب الـ greedy على ٣ أو ٤ أمثلة صغيرة، وقارن بـ brute force. لو اختلفوا في أي مثال، الـ greedy غلط.`,
            when: "الـ greedy بينفع في: الفترات (رتّب بالنهاية)، و Jump Game، و Gas Station، و Assign Cookies، و fractional knapsack، و Huffman، و Dijkstra و MST. لو المسألة فيها «أقل/أكتر» وكل اختيار بيأثر على الاختيارات اللي بعده بطريقة معقدة، في الغالب DP. في الانترفيو، لو اقترحت greedy، اتوقع السؤال «متأكد؟ ليه؟».",
            mistakes: R`الترتيب بالبداية أو بالمدة في interval scheduling. واستخدام greedy في coin change أو 0/1 knapsack. وإنك تقول «greedy» من غير ما تجرّب مثال مضاد. والعكس: تعمل DP تقيل ([[O(n^2)]]) لمسألة الـ greedy فيها [[O(n)]] (زي Jump Game)، والانترفيور هيسألك «ممكن أحسن؟». وافتكر إن [[sort]] بتغيّر الـ array الأصلية، فانسخ الأول.`
          },
          teach: R`## الفكرة في جملة

الـ greedy بياخد في كل خطوة الاختيار اللي باين أحسن **دلوقتي**، ومبيرجعش فيه أبدًا. المثال فيه دالتين: [[maxMeetings]] (greedy صح: رتّب بالنهاية وخد أي اجتماع مبيتعارضش)، و [[greedyCoins]] (greedy بيشتغل مع عملات وبيغلط مع عملات تانية).

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل قرار. هنتتبع على input جديد: الاجتماعات [[[[9, 12], [1, 3], [2, 5], [4, 8], [6, 7], [8, 10]]]].

---

## ١. [[maxMeetings]] سطر سطر

### [[const sorted = [...intervals].sort((a, b) => a[1] - b[1]);]]

- كل اجتماع array من رقمين: [[[start, end]]]، فـ [[a[1]]] هي النهاية.
- [[[...intervals]]]: نسخة، لأن [[sort]] بيغيّر الـ array اللي بيتنده عليها. وجرّبنا: الـ array الأصلية فضلت زي ما هي بعد الدالة.
- [[a[1] - b[1]]]: من النهاية الأبدر للأبعد.

ليه بالنهاية؟ الاجتماع اللي بيخلص بدري بيسيب أطول وقت فاضي للباقي. الترتيب بالبداية بيخلّي اجتماع طويل بيبدأ بدري ([0, 6] في المثال) يقفل القاعة.

### [[let lastEnd = -Infinity;]]

نهاية آخر اجتماع خدناه. بتبدأ [[-Infinity]] (أصغر من أي رقم)، فأول اجتماع بيتاخد دايمًا من غير [[if]] خاصة.

### [[for (const [start, end] of sorted)]]

[[[start, end]]] بتفك كل اجتماع لمتغيرين بأسامي واضحة بدل [[m[0]]] و [[m[1]]].

### [[if (start >= lastEnd)]]

الاجتماع بيبدأ بعد (أو ساعة) ما آخر واحد خلص؟ خده وحدّث [[lastEnd]]. [[>=]] مش [[>]]: اجتماع بيخلص 4 وواحد بيبدأ 4 مش متعارضين. غير كده فوّته، ومش هنرجعله تاني.

---

## ٢. التتبع

بعد الترتيب بالنهاية: [[[[1,3], [2,5], [6,7], [4,8], [8,10], [9,12]]]]

| الاجتماع | [[start >= lastEnd]]؟ | [[lastEnd]] بعدها | [[chosen]] |
|---|---|---|---|
| [1, 3] | 1 ≥ -Infinity: نعم | 3 | [1,3] |
| [2, 5] | 2 ≥ 3: لأ | 3 | [1,3] |
| [6, 7] | 6 ≥ 3: نعم | 7 | [1,3] [6,7] |
| [4, 8] | 4 ≥ 7: لأ | 7 | [1,3] [6,7] |
| [8, 10] | 8 ≥ 7: نعم | 10 | [1,3] [6,7] [8,10] |
| [9, 12] | 9 ≥ 10: لأ | 10 | [1,3] [6,7] [8,10] |

٣ اجتماعات. لاحظ إن [6, 7] اتاخد قبل [4, 8] مع إنه بيبدأ بعده، لأنه بيخلص الأول، وده اللي خلّى [8, 10] ينفع بعده.

---

## ٣. [[greedyCoins]]: greedy مش مضمون

~~~js
let count = 0;
for (const c of [...coins].sort((a, b) => b - a)) {
  count += Math.floor(amount / c);
  amount %= c;
}
return amount === 0 ? count : -1;
~~~

- [[b - a]]: العملات من الكبيرة للصغيرة.
- [[Math.floor(amount / c)]]: أكتر عدد من العملة دي يدخل في المبلغ (قسمة وتقريب لتحت). [[Math.floor(41 / 25)]] = 1.
- [[amount %= c]]: [[%]] باقي القسمة، و [[%=]] بتحطه في [[amount]]. [[41 % 25]] = 16 = اللي فاضل.
- في الآخر: لو فضل باقي، العملات مقدرتش تكمّله: [[-1]].

### التتبع: [[greedyCoins([1, 5, 10, 25], 41)]] (بيشتغل)

| العملة | خدنا | [[count]] | الباقي |
|---|---|---|---|
| 25 | 1 | 1 | 16 |
| 10 | 1 | 2 | 6 |
| 5 | 1 | 3 | 1 |
| 1 | 1 | 4 | 0 |

٤ عملات، وده فعلًا أقل عدد.

### التتبع: [[greedyCoins([3, 4], 6)]] (بيغلط)

| العملة | خدنا | [[count]] | الباقي |
|---|---|---|---|
| 4 | 1 | 1 | 2 |
| 3 | 0 | 1 | 2 |

فضل 2، فرجعت [[-1]] «مستحيل». بس 3 + 3 = 6 موجودة! الـ greedy خد الـ 4 ومرجعش فيها، والـ 4 هي اللي بوّظت الحل.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ [ 1, 4 ], [ 5, 7 ], [ 8, 11 ], [ 12, 16 ] ]
6
3
-1
~~~

| السطر | الناتج | صح؟ |
|---|---|---|
| [[maxMeetings(meetings)]] | ٤ اجتماعات من ١١ | صح، ومفيش حل بـ ٥ |
| [[greedyCoins([1, 5, 10, 25], 63)]] | 6 (25 + 25 + 10 + 1 + 1 + 1) | صح |
| [[greedyCoins([1, 3, 4], 6)]] | 3 (4 + 1 + 1) | غلط، الصح 2 (3 + 3) |
| [[greedyCoins([3, 4], 6)]] | -1 | غلط، الصح 2 (3 + 3) |

---

## ٥. الـ Big-O وليه

| الدالة | الوقت | الذاكرة | السبب |
|---|---|---|---|
| [[maxMeetings]] | [[O(n log n)]] | [[O(n)]] | الـ sort هو الأغلى، واللفة بعده [[O(n)]]. والنسخة والناتج n |
| [[greedyCoins]] | [[O(k log k)]] | [[O(k)]] | k عدد أنواع العملات: sort ولفة واحدة، ومش مربوط بقيمة المبلغ خالص |

قارن بـ coin change بالـ DP: [[O(amount × k)]]. الـ greedy أسرع بمراحل، بس مش دايمًا صح.

---

## الخلاصة

~~~text
greedy           أحسن اختيار دلوقتي، ومن غير رجوع
الاجتماعات       رتّب بالنهاية، وخد اللي start >= lastEnd
lastEnd          يبدأ -Infinity عشان أول واحد يتاخد
الفكة            greedy صح مع 1 و 5 و 10 و 25، وغلط مع [1, 3, 4] و [3, 4]
قبل ما تثق فيه   دوّر على مثال مضاد صغير، ولو لقيته فده DP
~~~

> الـ greedy محتاج إثبات، مش إحساس. الترتيب بالنهاية في الاجتماعات له إثبات، و «أكبر عملة الأول» ملهوش إثبات لأي نظام عملات.`,
          lines: [
            "أكبر عدد اجتماعات من غير تعارض.",
            "رتّب بالنهاية (نسخة عشان منغيّرش الأصل).",
            "اللي اخترناهم.",
            "نهاية آخر اجتماع اخترناه.",
            "بالترتيب.",
            "بيبدأ بعد (أو ساعة) ما آخر واحد خلص؟",
            "خده.",
            "حدّث النهاية.",
            "قفلة الـ if.",
            "قفلة الـ for.",
            "رجّعهم.",
            "قفلة.",
            "الفكة بالـ greedy: أكبر عملة الأول.",
            "العداد.",
            "العملات من الكبيرة للصغيرة.",
            "خد منها أكتر عدد ممكن.",
            "والباقي يكمّل.",
            "قفلة.",
            "لو فضل باقي، الـ greedy فشل.",
            "قفلة.",
            "١١ اجتماع.",
            "٤ اجتماعات، ومفيش حل أحسن.",
            "عملات أمريكا: 25 + 25 + 10 + 1 + 1 + 1، صح.",
            "3 (4 + 1 + 1)، والصح 2 (3 + 3).",
            "بيقول مستحيل، والصح 2 (3 + 3)."
          ],
          check: {
            lang: "js",
            starter: R`function eraseOverlap(intervals) {
  // n - عدد اللي maxMeetings بتختاره (رتّب بالنهاية)
  return 0;
}
function canJump(nums) {
  let reach = 0;
  // لو i > reach يبقى مش هتعدّي
  return false;
}`,
            tests: R`test("[[1,2],[2,3],[3,4],[1,3]] ← 1", () => expect(eraseOverlap([[1, 2], [2, 3], [3, 4], [1, 3]])).toBe(1));
test("[[1,2],[1,2],[1,2]] ← 2", () => expect(eraseOverlap([[1, 2], [1, 2], [1, 2]])).toBe(2));
test("فترات بتلمس بعض مش متداخلة: [[1,2],[2,3]] ← 0، و [] ← 0", () => expect([eraseOverlap([[1, 2], [2, 3]]), eraseOverlap([])]).toEqual([0, 0]));
test("فترة طويلة بتغطي الكل: [[1,100],[11,22],[1,11],[2,12]] ← 2", () => expect(eraseOverlap([[1, 100], [11, 22], [1, 11], [2, 12]])).toBe(2));
test("canJump([2,3,1,1,4]) ← true و [3,2,1,0,4] ← false", () => expect([canJump([2, 3, 1, 1, 4]), canJump([3, 2, 1, 0, 4])]).toEqual([true, false]));
test("[0] ← true (انت أصلًا في الآخر)، و [0, 1] ← false", () => expect([canJump([0]), canJump([0, 1])]).toEqual([true, false]));
test("١٠٠ ألف خانة (O(n))", () => expect([canJump(new Array(100000).fill(1)), canJump([...new Array(50000).fill(1), 0, 1])]).toEqual([true, false]));`,
            solution: R`function eraseOverlap(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let kept = 0, lastEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start >= lastEnd) { kept++; lastEnd = end; }
  }
  return intervals.length - kept;
}
function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`
          }
        }
      ]
    }
]);
