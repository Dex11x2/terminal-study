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
