// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "backtracking و trie",
      l: 3,
      n: "جرّب اختيار، انزل، وارجع فيه: subsets و permutations و combination sum، و trie للـ autocomplete",
      items: [
        {
          cmd: "subsets (backtracking)",
          title: "طلّع كل المجموعات الجزئية من [[[1, 2, 3]]]",
          desc: R`backtracking: بتبني الحل خطوة خطوة. في كل خطوة: اختار حاجة، انزل كمّل (recursion)، وبعدين ارجع في اختيارك (undo) وجرّب اللي بعده. ده DFS على «شجرة القرارات».

القالب ثابت تقريبًا في كل مسائل الـ backtracking:

[[path.push(x)]] (اختار)، و [[backtrack(...)]] (كمّل)، و [[path.pop()]] (ارجع).

في الـ subsets: كل عقدة في شجرة القرارات هي مجموعة جزئية صحيحة، فبنسجّل [[path]] أول ما ندخل. والـ [[start]] بيضمن إننا بنختار عناصر بعد آخر عنصر اخترناه بس، فـ [1, 2] و [2, 1] ميتعدّوش مرتين.

العدد: كل عنصر يا داخل يا لأ، فـ [[2^n]] مجموعة. مع n = 20 ده مليون، ومع n = 30 مليار. الـ backtracking exponential بطبيعته، لأن الإجابة نفسها exponential.`,
          example: R`function subsets(nums) {
  const out = [], path = [];
  const backtrack = start => {
    out.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return out;
}
const show = sets => sets.map(s => "[" + s.join(",") + "]").join(" ");
console.log(show(subsets([1, 2, 3]))); // [] [1] [1,2] [1,2,3] [1,3] [2] [2,3] [3]
console.log(subsets([]).length, subsets([1, 2, 3, 4, 5]).length); // 1 32
// 2^n subsets, each copied in O(n): O(n × 2^n) time and output; O(n) extra for path + stack`,
          try: R`حل «Subsets II»: الـ input فيه تكرار، والناتج مينفعش يكون فيه مجموعتين متطابقتين. [[[1, 2, 2]]] الإجابة ٦ مجموعات: [[[] [1] [1,2] [1,2,2] [2] [2,2]]]. (رتّب الأول، وفي نفس المستوى فوّت العنصر لو زي اللي قبله.) وبعدين اكتب [[subsets]] من غير recursion خالص باستخدام الـ bits: كل رقم من 0 لـ [[2^n - 1]] بيمثّل مجموعة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[subsetsWithDup(nums)]] و [[subsetsBits(nums)]]، وترتيب المجموعات مش مهم.`,
          sol: R`Subsets II: بعد الـ sort، الشرط [[if (i > start && nums[i] === nums[i - 1]) continue]]. الـ [[i > start]] مهم: التكرار ممنوع كـ «أول اختيار في نفس المستوى» بس، لكن مسموح إنك تاخد الـ 2 التانية بعد الأولى (عشان [1,2,2] تطلع). لو كتبت [[i > 0]] هتفوّت [[[1,2,2]]] و [[[2,2]]] وتطلع ٤ بس.

بالـ bits: [[mask]] من 0 لـ [[(1 << n) - 1]]، والعنصر i داخل لو [[mask & (1 << i)]] مش صفر. لـ [1, 2, 3]: الـ mask 5 = 101 = [1, 3]. الناتج نفس الـ ٨ مجموعات بترتيب تاني: [[[] [1] [2] [1,2] [3] [1,3] [2,3] [1,2,3]]].

وخلي بالك إن [[1 << n]] في JavaScript بيشتغل لحد n = 30 بس (الـ bitwise بيبقى 32-bit بإشارة)، وده مش مشكلة لأن 2^30 مجموعة أكتر من اللي الذاكرة تشيله أصلًا.`,
          solCode: R`function subsetsWithDup(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = start => {
    out.push([...path]);
    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      path.push(sorted[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return out;
}
function subsetsBits(nums) {
  const out = [];
  for (let mask = 0; mask < 1 << nums.length; mask++)
    out.push(nums.filter((_, i) => mask & (1 << i)));
  return out;
}
const show = sets => sets.map(s => "[" + s.join(",") + "]").join(" ");
console.log(show(subsetsWithDup([1, 2, 2]))); // [] [1] [1,2] [1,2,2] [2] [2,2]
console.log(show(subsetsBits([1, 2, 3]))); // [] [1] [2] [1,2] [3] [1,3] [2,3] [1,2,3]
// both O(n × 2^n)`,
          flag: "script",
          deep: {
            why: "الـ backtracking هو الطريقة لأي «طلّع كل الاحتمالات» أو «دوّر على حل يحقق قيود»: كل تركيبات الـ filters في صفحة منتجات، و test cases لكل مجموعة options، و Sudoku، وجدولة بقيود. وفي الانترفيو، Subsets و Permutations و Combination Sum هما الـ ٣ مسائل الأساسية، ولو فهمت القالب هتحل الـ ٣ بنفس الكود تقريبًا.",
            how: R`شجرة القرارات لـ [1, 2, 3]: الجذر [] (سجّل). من الجذر: اختار 1 ← [1] (سجّل)، ومنها اختار 2 ← [1,2] (سجّل)، ومنها 3 ← [1,2,3] (سجّل). ارجع (pop 3)، مفيش بعد 3. ارجع (pop 2)، اختار 3 ← [1,3]. ارجع لحد الجذر، اختار 2 ← [2]، وبعدها 3 ← [2,3]. ارجع، اختار 3 ← [3].

ليه [[[...path]]] مش [[path]]؟ [[path]] array واحدة بتتعدل طول الوقت. لو حطيتها هي نفسها في [[out]]، كل الخانات هتشاور على نفس الـ array، وفي الآخر هتبقى فاضية كلها (لأن آخر حاجة بتحصل pop). النسخة بتصوّر الحالة في اللحظة دي.

ليه [[path.pop()]] بعد النداء؟ ده الـ «backtrack» نفسه: رجّع الحالة زي ما كانت قبل ما تختار، عشان الاختيار الجاي في الـ loop يبدأ من نفس النقطة. من غيره، العناصر هتتراكم.

الـ Big-O: [[2^n]] مجموعة، وكل واحدة بتتنسخ في [[O(n)]]، فـ [[O(n × 2^n)]]. ودي الإجابة نفسها حجمها كده، فمفيش حل أسرع.`,
            when: "«كل المجموعات الجزئية» أو «كل التركيبات»: الـ backtracking بـ start. «كل الترتيبات»: بـ used (الدرس الجاي). «فيه حل؟» (Sudoku، N-Queens، Word Search): backtracking مع pruning (توقف بدري لما الفرع مستحيل). ولو المطلوب عدد الحلول أو أحسن حل مش الحلول نفسها، شوف الأول لو ينفع DP، لأنه غالبًا polynomial.",
            mistakes: R`[[out.push(path)]] من غير نسخ. ونسيان [[path.pop()]]. و [[backtrack(start + 1)]] بدل [[backtrack(i + 1)]]، فتطلع مجموعات مكررة وناقصة. وفي Subsets II، [[i > 0]] بدل [[i > start]]. وفي الانترفيو: قول الـ Big-O صح، [[O(n × 2^n)]] مش [[O(2^n)]]، لأن النسخ بياخد وقت.`
          },
          teach: R`## الفكرة في جملة

ابني المجموعة عنصر عنصر في array اسمها [[path]]. كل ما تدخل دالة [[backtrack]] سجّل نسخة من [[path]] (هي مجموعة صحيحة). وبعدين جرّب تضيف كل عنصر **بعد** آخر عنصر اخترته: ضيفه، وانزل كمّل، وشيله (ارجع) قبل ما تجرّب اللي بعده.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل push و pop وكل تسجيل، والمسافة على الشمال = عمق الـ recursion. هنتتبع على [[[5, 6, 7]]].

---

## ١. الكود سطر سطر

### [[const out = [], path = [];]]

[[out]] الناتج (array من arrays)، و [[path]] المجموعة اللي بنبنيها دلوقتي. [[path]] واحدة بس طول الوقت، وبتكبر وتصغر.

### [[const backtrack = start => { ... }]]

دالة جوه دالة (arrow function). بتشوف [[out]] و [[path]] و [[nums]] من الدالة اللي برّاها من غير ما تتبعت لها (closure). و [[start]] = أول index مسموح نختار منه.

### [[out.push([...path]);]]

سجّل **نسخة** ([[[...path]]] array جديدة فيها نفس العناصر). ليه نسخة؟ جرّبنا [[out.push(path)]]: الناتج طلع [[[[], [], [], [], [], [], [], []]]]: ٨ خانات كلها بتشاور على **نفس** الـ array، واللي في الآخر فضيت بعد آخر pop.

### الـ loop

~~~js
for (let i = start; i < nums.length; i++) {
  path.push(nums[i]);   // اختار
  backtrack(i + 1);     // كمّل بالعناصر اللي بعده بس
  path.pop();           // ارجع في الاختيار
}
~~~

- [[i = start]]: مش من 0. كده كل مجموعة عناصرها بترتيب الـ indexes، فـ [5, 6] بتطلع مرة و [6, 5] عمرها ما بتطلع.
- [[backtrack(i + 1)]]: اللي بعد العنصر اللي **لسه** مختارينه، مش [[start + 1]]. جرّبنا [[start + 1]]: طلع 16 مجموعة فيها [[[5,7,7]]] و [[[7,6]]]، غلط.
- [[path.pop()]]: رجّع [[path]] زي ما كانت قبل الـ push، عشان الـ i اللي بعده يبدأ من نفس الحالة.

### [[backtrack(0); return out;]]

ابدأ من الجذر: [[path]] فاضية، ومسموح نختار من index 0.

---

## ٢. التتبع على [[[5, 6, 7]]]

~~~text اللي اتطبع (المسافة = العمق)
1. backtrack(0) record []
2.   push 5 -> path [5]
3.   backtrack(1) record [5]
4.     push 6 -> path [5,6]
5.     backtrack(2) record [5,6]
6.       push 7 -> path [5,6,7]
7.       backtrack(3) record [5,6,7]
8.       pop -> path [5,6]
9.     pop -> path [5]
10.     push 7 -> path [5,7]
11.     backtrack(3) record [5,7]
12.     pop -> path [5]
13.   pop -> path []
14.   push 6 -> path [6]
15.   backtrack(2) record [6]
16.     push 7 -> path [6,7]
17.     backtrack(3) record [6,7]
18.     pop -> path [6]
19.   pop -> path []
20.   push 7 -> path [7]
21.   backtrack(3) record [7]
22.   pop -> path []
~~~

اقراها كده:

| الخطوات | اللي حصل |
|---|---|
| 1 | الجذر: سجّل [] |
| 2 لـ 7 | نزلنا على طول: 5 ثم 6 ثم 7، وسجّلنا كل مستوى |
| 7 | [[backtrack(3)]]: [[start]] = 3 = طول الـ array، فالـ loop مبيلفش. ده آخر الفرع |
| 8 و 9 | رجعنا مرتين: شلنا 7 ثم 6 |
| 10 لـ 12 | جوه مستوى [5] لسه فيه 7: جرّبناها، [5,7] |
| 13 | رجعنا للجذر |
| 14 لـ 19 | الجذر بيجرّب 6: [6] ثم [6,7] |
| 20 لـ 22 | الجذر بيجرّب 7: [7]، ومفيش بعدها حاجة |

في الآخر [[path]] رجعت فاضية زي ما بدأت. وده اختبار سريع إن كل push ليه pop.

### شجرة القرارات

~~~text كل عقدة مجموعة اتسجّلت
                 []
        /        |       \
      [5]       [6]      [7]
     /    \      |
  [5,6]  [5,7] [6,7]
    |
 [5,6,7]
~~~

[[[6]]] مفيهاش فرع لـ 5، لأن [[start]] بعد 6 بيبقى 2: مسموح 7 بس.

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[] [1] [1,2] [1,2,3] [1,3] [2] [2,3] [3]
1 32
~~~

- ٨ مجموعات لـ [1, 2, 3] بنفس ترتيب الـ DFS اللي في التتبع.
- [[subsets([])]]: الجذر بيسجّل [] والـ loop مبيلفش، فمجموعة واحدة (الفاضية).
- ٥ عناصر: [[2^5]] = 32.

[[show]] بتحوّل كل مجموعة لـ string زي [[[1,2]]] بـ [[join(",")]]، وتلزقهم بمسافة.

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| عدد المجموعات | [[2^n]] | كل عنصر يا داخل يا لأ |
| الوقت | [[O(n × 2^n)]] | كل مجموعة بتتنسخ بـ [[[...path]]]، والنسخة طولها لحد n |
| الذاكرة الزيادة | [[O(n)]] | [[path]] والـ call stack عمقهم n بالكتير (من غير الناتج نفسه) |

مفيش حل أسرع، لأن الناتج نفسه حجمه [[n × 2^n]].

---

## الخلاصة

~~~text
القالب      سجّل نسخة، وبعدين لكل i من start: push، backtrack(i + 1)، pop
[...path]   نسخة، لأن path واحدة بتتغير طول الوقت
start       بيمنع [6,5] بعد [5,6]
i + 1       مش start + 1
pop         بيرجّع الحالة عشان الاختيار الجاي
~~~

> الـ backtracking = DFS على شجرة قرارات. الـ push والـ pop لازم يبقوا متقابلين حوالين النداء، وأي حاجة بتسجّلها من حالة بتتغير لازم تتنسخ.`,
          lines: [
            "كل المجموعات الجزئية.",
            "الناتج، والمسار الحالي (المجموعة اللي بنبنيها).",
            "backtrack بتختار من start لقدام بس.",
            "كل عقدة في الشجرة مجموعة صحيحة: سجّل نسخة.",
            "جرّب كل عنصر من start.",
            "اختار.",
            "كمّل بالعناصر اللي بعده.",
            "ارجع في الاختيار.",
            "قفلة الـ for.",
            "قفلة backtrack.",
            "ابدأ من أول عنصر.",
            "رجّع.",
            "قفلة.",
            "طباعة مختصرة.",
            "٨ مجموعات بترتيب الـ DFS.",
            "array فاضية ليها مجموعة واحدة (الفاضية)، و ٥ عناصر 32."
          ],
          check: {
            lang: "js",
            starter: R`function subsetsWithDup(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [];
  // زي subsets، وفوّت: i > start && sorted[i] === sorted[i - 1]
  return out;
}
function subsetsBits(nums) {
  const out = [];
  // mask من 0 لـ (1 << n) - 1
  return out;
}`,
            tests: R`const norm = xs => xs.map(x => JSON.stringify(x)).sort();
const normSorted = xs => xs.map(x => JSON.stringify([...x].sort((a, b) => a - b))).sort();
test("[1, 2, 2] ← 6 مجموعات: [] [1] [1,2] [1,2,2] [2] [2,2]", () => expect(normSorted(subsetsWithDup([1, 2, 2]))).toEqual(normSorted([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]])));
test("i > start مش i > 0: [2, 2] ← [] [2] [2,2]", () => expect(normSorted(subsetsWithDup([2, 2]))).toEqual(normSorted([[], [2], [2, 2]])));
test("[4, 4, 4, 1, 4] ← 10 مجموعات", () => expect(subsetsWithDup([4, 4, 4, 1, 4]).length).toBe(10));
test("[] ← [[]]", () => expect(subsetsWithDup([])).toEqual([[]]));
test("subsetsBits([1, 2, 3]) ← نفس الـ 8 مجموعات", () => expect(normSorted(subsetsBits([1, 2, 3]))).toEqual(normSorted([[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]])));
test("subsetsBits لـ 12 عنصر ← 4096 (O(n × 2^n))", () => expect(subsetsBits(Array.from({ length: 12 }, (_, i) => i)).length).toBe(4096));`,
            solution: R`function subsetsWithDup(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = start => {
    out.push([...path]);
    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      path.push(sorted[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return out;
}
function subsetsBits(nums) {
  const out = [];
  for (let mask = 0; mask < 1 << nums.length; mask++) {
    out.push(nums.filter((_, i) => mask & (1 << i)));
  }
  return out;
}`
          }
        },
        {
          cmd: "permutations",
          title: "طلّع كل الترتيبات الممكنة لـ [[[1, 2, 3]]]",
          desc: R`الترتيبات (permutations): نفس العناصر كلها، بس بكل ترتيب ممكن. العدد [[n!]]: 3 عناصر = 6، و 10 عناصر = 3.6 مليون، و 13 عنصر أكتر من 6 مليار.

الفرق عن الـ subsets: الترتيب بيفرق، فكل عنصر ممكن ييجي في أي مكان. فبدل [[start]]، بنستخدم [[used]] (array من true/false) تقول مين اتاخد في المسار الحالي. وكل مستوى بيجرّب كل العناصر اللي لسه متاخدتش.

وبنسجّل بس لما المسار يبقى طوله n (ترتيب كامل)، مش في كل عقدة زي الـ subsets.

نفس القالب: اختار ([[used[i] = true]] و push)، كمّل، ارجع ([[pop]] و [[used[i] = false]]).`,
          example: R`function permutations(nums) {
  const out = [], path = [], used = new Array(nums.length).fill(false);
  const backtrack = () => {
    if (path.length === nums.length) { out.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  };
  backtrack();
  return out;
}
console.log(permutations([1, 2, 3]).map(p => p.join("")).join(" ")); // 123 132 213 231 312 321
console.log(permutations([1, 2, 3, 4]).length); // 24
console.log(permutations([])); // [[]]
// n! permutations, each copied in O(n): O(n × n!) time; O(n) extra for path, used and the stack`,
          try: R`حل «Permutations II» (الـ input فيه تكرار): [[[1, 1, 2]]] الإجابة ٣ بس: 112 و 121 و 211. وبعدين «N-Queens»: كام طريقة تحط n وزير على رقعة n × n من غير ما اتنين يهاجموا بعض (نفس الصف أو العمود أو القطر)؟ n = 4 الإجابة 2، و n = 8 الإجابة 92. (كل صف فيه وزير واحد، فجرّب كل عمود في الصف الحالي، واحفظ الأعمدة والقطرين المشغولين في Sets.) اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[permuteUnique(nums)]] و [[nQueens(n)]].`,
          sol: R`Permutations II: رتّب، وفوّت العنصر لو زي اللي قبله واللي قبله مش مستخدم في المسار الحالي: [[if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue]]. المعنى: من النسخ المتكررة، استخدمهم دايمًا بالترتيب (الأولى قبل التانية)، فكل ترتيب يطلع مرة واحدة. الناتج [[112 121 211]].

N-Queens: [[place(row)]]: لو row = n لقيت حل. غير كده لكل عمود c: لو c أو [[row - c]] (قطر) أو [[row + c]] (القطر التاني) مشغولين، فوّت. غير كده علّمهم، وانزل للصف الجاي، وشيل العلامات. الإجابات 2 و 92.

ليه [[row - c]] و [[row + c]]؟ كل الخانات على نفس القطر من فوق شمال لتحت يمين ليهم نفس [[row - c]]، واللي على القطر التاني ليهم نفس [[row + c]]. فالـ Set بتكشف التعارض في [[O(1)]] بدل ما تلف على الرقعة.

ده مثال على الـ pruning: بدل ما تجرّب كل الـ [[8^8]] (16 مليون) طريقة، بتقطع أي فرع أول ما يبان إنه غلط، فالـ 8 × 8 بتخلص في أجزاء من الثانية.`,
          solCode: R`function permuteUnique(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [], used = new Array(sorted.length).fill(false);
  const backtrack = () => {
    if (path.length === sorted.length) { out.push([...path]); return; }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i] || (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1])) continue;
      used[i] = true; path.push(sorted[i]);
      backtrack();
      path.pop(); used[i] = false;
    }
  };
  backtrack();
  return out;
}
function nQueens(n) {
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  let count = 0;
  const place = row => {
    if (row === n) { count++; return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
      cols.add(c); diag1.add(row - c); diag2.add(row + c);
      place(row + 1);
      cols.delete(c); diag1.delete(row - c); diag2.delete(row + c);
    }
  };
  place(0);
  return count;
}
console.log(permuteUnique([1, 1, 2]).map(p => p.join("")).join(" ")); // 112 121 211
console.log(nQueens(4), nQueens(8)); // 2 92
// permuteUnique: O(n × n!) worst case; nQueens: O(n!) worst case, far less with pruning`,
          flag: "script",
          deep: {
            why: "الترتيبات بتقابلك في: كل ترتيبات أعمدة جدول لاختبار الـ UI، ومسائل الجدولة («رتّب المهام بأحسن ترتيب»)، والـ brute force في أي مسألة ترتيب قبل ما تلاقي حل أذكى. وفي الانترفيو، Permutations و N-Queens بيختبروا إنك فاهم إزاي ترجع الحالة زي ما كانت (undo) صح.",
            how: R`الشجرة لـ [1, 2, 3]: المستوى الأول ٣ اختيارات، والتاني ٢ (اللي فاضلين)، والتالت ١. فـ 3 × 2 × 1 = 6 أوراق، وكل ورقة ترتيب.

dry run: اختار 1 (used = [T, F, F]). اختار 2 (used = [T, T, F]). اختار 3، الطول 3، سجّل 123. ارجع: pop 3، used[2] = F. مفيش بعد 3. ارجع: pop 2، used[1] = F. اختار 3 (used = [T, F, T])، وبعدين 2، سجّل 132. وهكذا.

ليه [[used]] وليه مش [[path.includes(x)]]؟ [[includes]] بتاخد [[O(n)]] في كل خطوة، و [[used]] بتاخد [[O(1)]]. والأهم إن [[includes]] بتبوّظ مع التكرار: في [1, 1, 2] الـ 1 التانية هتبان «مستخدمة» لما الأولى تتاخد.

permutations([]) بترجّع [[[[]]]] (ترتيب واحد: الفاضي)، مش [[[]]]، لأن الشرط [[path.length === 0]] صح من أول نداء. ده متسق رياضيًا ([[0! = 1]]).

فيه طريقة تانية بالـ swap: بدّل العنصر i مع كل عنصر بعده في نفس الـ array، وانزل، وبدّل تاني. بتوفّر [[used]] و [[path]]، بس صعب تتعامل بيها مع التكرار.`,
            when: "«كل الترتيبات» والترتيب بيفرق: used. «كل المجموعات» والترتيب مش بيفرق: start (الدرس اللي فات). لو n أكبر من حوالي 10، الترتيبات كلها مستحيلة عمليًا، فلازم pruning قوي أو فكرة تانية (DP على bitmask، أو greedy). ولو محتاج «الترتيب اللي بعد ده» بس، فيه خوارزمية Next Permutation في [[O(n)]].",
            mistakes: R`نسيان إرجاع [[used[i] = false]] بعد النداء، فأول فرع بس بيطلع. ونسيان النسخ عند التسجيل. وفي التكرار: تنسى الـ sort قبل شرط التخطي، فالمتكرر ميبقاش جنب بعضه والشرط ميشتغلش. (الشرط [[used[i - 1]]] من غير ! بيطلّع نفس النتيجة بس بيقطع الفروع متأخر، فاعرف تشرح أنهي واحدة كتبت وليه.) وإنك متعرفش إن n! بيكبر أسرع من 2^n: 10! حوالي 3.6 مليون، و 2^10 = 1024.`
          },
          teach: R`## الفكرة في جملة

الترتيب بيتبني مكان مكان. في كل مكان جرّب **كل** عنصر لسه متاخدش في المسار ده (array اسمها [[used]] بتقول مين اتاخد). ولما المسار يبقى طوله n، ده ترتيب كامل: سجّله. وبعد كل محاولة ارجع: شيل العنصر من [[path]] وشيل علامته من [[used]].

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع [[path]] و [[used]] بعد كل خطوة (T = true، F = false)، والمسافة على الشمال = عمق الـ recursion. هنتتبع على [[["A", "B", "C"]]].

---

## ١. الكود سطر سطر

### [[const out = [], path = [], used = new Array(nums.length).fill(false);]]

- [[out]] الناتج، و [[path]] الترتيب اللي بنبنيه.
- [[used[i]]] = هل العنصر رقم i موجود في [[path]] دلوقتي؟ بتبدأ كلها [[false]].

ليه بالـ index مش بالقيمة؟ عشان لو فيه قيمتين زي بعض، كل واحدة ليها علامتها.

### [[if (path.length === nums.length) { out.push([...path]); return; }]]

ده الـ base case: المسار كامل، سجّل **نسخة** واخرج من النداء ده. الفرق عن الـ subsets: هنا بنسجّل في الأوراق بس (الترتيبات الكاملة)، مش في كل عقدة.

### الـ loop

~~~js
for (let i = 0; i < nums.length; i++) {
  if (used[i]) continue;
  used[i] = true;
  path.push(nums[i]);
  backtrack();
  path.pop();
  used[i] = false;
}
~~~

- [[i = 0]] مش [[start]]: أي عنصر ممكن ييجي في أي مكان، فكل مستوى بيبص على الكل.
- [[continue]]: فوّت باقي جسم الـ loop وروح للـ i اللي بعده. هنا معناها «العنصر ده في المسار خلاص».
- اختار (علامة + push)، كمّل، وارجع بنفس الترتيب بالعكس (pop + شيل العلامة).

[[backtrack]] هنا من غير parameters: كل الحالة في [[path]] و [[used]].

---

## ٢. التتبع على [[["A", "B", "C"]]]

أول فرع (اللي بيبدأ بـ A) كامل:

~~~text اللي اتطبع (أول 17 خطوة)
1. i=0 take A path=A used=TFF
2.   i=0 (A) used -> skip
3.   i=1 take B path=AB used=TTF
4.     i=0 (A) used -> skip
5.     i=1 (B) used -> skip
6.     i=2 take C path=ABC used=TTT
7.       record ABC
8.     undo C path=AB used=TTF
9.   undo B path=A used=TFF
10.   i=2 take C path=AC used=TFT
11.     i=0 (A) used -> skip
12.     i=1 take B path=ACB used=TTT
13.       record ACB
14.     undo B path=AC used=TFT
15.     i=2 (C) used -> skip
16.   undo C path=A used=TFF
17. undo A path=- used=FFF
~~~

| الخطوات | اللي حصل |
|---|---|
| 1 | المكان الأول: A |
| 2 | المكان التاني: A متاخدة، فوّت |
| 3 | المكان التاني: B |
| 4 و 5 | المكان التالت: A و B متاخدين |
| 6 و 7 | C، الطول 3: سجّل ABC |
| 8 و 9 | ارجع: شيل C، وشيل B. [[used]] رجعت TFF |
| 10 | المكان التاني يجرّب C بدل B |
| 11 لـ 13 | المكان التالت: B هي اللي فاضلة، سجّل ACB |
| 14 لـ 17 | ارجع لحد الجذر: [[path]] فاضية و [[used]] = FFF |

وبعدين نفس الكلام بـ B في الأول (BAC و BCA) وبـ C (CAB و CBA). الجدول الكامل طلع 51 سطر، وفي الآخر [[path]] فاضية و [[used]] كلها F.

### لو نسيت [[used[i] = false]]

جرّبنا نشيل السطر ده بس: الناتج طلع [[['ABC']]] ترتيب واحد. بعد أول فرع، A و B و C فضلوا «متاخدين» للأبد، فكل المحاولات التانية اتفوّتت.

---

## ٣. الشجرة

~~~text كل مستوى بيختار من اللي فاضل
                   (فاضي)
          /          |          \
         A           B           C
       /   \       /   \       /   \
     AB     AC   BA     BC   CA     CB
     |      |    |      |    |      |
    ABC    ACB  BAC    BCA  CAB    CBA
~~~

٣ اختيارات، وبعدين ٢، وبعدين ١: 3 × 2 × 1 = 6 أوراق = [[3!]].

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
123 132 213 231 312 321
24
[ [] ]
~~~

- ٦ ترتيبات لـ [1, 2, 3] بنفس ترتيب الشجرة. [[p.join("")]] بتلزق الأرقام من غير فاصل.
- [[4!]] = 24.
- [[permutations([])]]: أول نداء [[path.length]] = 0 = [[nums.length]]، فبيسجّل [] ويخرج: ترتيب واحد فاضي، [[[[]]]]. ومتسق مع [[0! = 1]].

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| عدد الترتيبات | [[n!]] | n اختيار للمكان الأول، و n - 1 للتاني، ... |
| الوقت | [[O(n × n!)]] | كل ترتيب بيتنسخ في [[O(n)]]، وكل عقدة بتلف loop طوله n |
| الذاكرة الزيادة | [[O(n)]] | [[path]] و [[used]] والـ call stack (من غير الناتج) |

[[n!]] بيكبر أسرع بكتير من [[2^n]]: [[10!]] = 3628800، و [[2^10]] = 1024.

---

## الخلاصة

~~~text
used[i]      مين في المسار دلوقتي، بالـ index
loop         من 0 (مش start)، و continue لو used
اختار        used[i] = true، push
ارجع         pop، used[i] = false  (العكس بالظبط)
سجّل         لما path.length === n بس، ونسخة [...path]
~~~

> subsets = [[start]] (الترتيب مش بيفرق). permutations = [[used]] (الترتيب بيفرق). وأي حاجة بتعلّمها قبل النداء لازم تتشال بعده.`,
          lines: [
            "كل الترتيبات.",
            "الناتج، والمسار، ومين اتاخد.",
            "backtrack.",
            "المسار كامل: سجّل نسخة وارجع.",
            "جرّب كل عنصر.",
            "متاخد في المسار ده: فوّت.",
            "علّمه.",
            "اختاره.",
            "كمّل.",
            "ارجع في الاختيار.",
            "وشيل العلامة.",
            "قفلة الـ for.",
            "قفلة backtrack.",
            "ابدأ.",
            "رجّع.",
            "قفلة.",
            "٦ ترتيبات بالترتيب ده.",
            "4! = 24.",
            "ترتيب واحد: الفاضي."
          ],
          check: {
            lang: "js",
            starter: R`function permuteUnique(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [], used = new Array(sorted.length).fill(false);
  // فوّت: i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]
  return out;
}
function nQueens(n) {
  const cols = new Set(), d1 = new Set(), d2 = new Set();
  // place(row): الأعمدة، و row - c، و row + c
  return 0;
}`,
            tests: R`const norm = xs => xs.map(x => JSON.stringify(x)).sort();
const normSorted = xs => xs.map(x => JSON.stringify([...x].sort((a, b) => a - b))).sort();
test("[1, 1, 2] ← 112 و 121 و 211 بس", () => expect(norm(permuteUnique([1, 1, 2]))).toEqual(norm([[1, 1, 2], [1, 2, 1], [2, 1, 1]])));
test("[1, 2, 3] ← 6، و [2, 2, 2] ← 1", () => expect([permuteUnique([1, 2, 3]).length, permuteUnique([2, 2, 2]).length]).toEqual([6, 1]));
test("[] ← [[]]", () => expect(permuteUnique([])).toEqual([[]]));
test("7 عناصر فيهم تكرار ← 7! / (2! × 3!) = 420", () => expect(permuteUnique([1, 1, 2, 2, 2, 3, 4]).length).toBe(420));
test("N-Queens: 1 ← 1، و 2 و 3 ← 0، و 4 ← 2", () => expect([1, 2, 3, 4].map(nQueens)).toEqual([1, 0, 0, 2]));
test("8 وزراء ← 92 (الـ pruning بيخليها أجزاء من الثانية)", () => expect(nQueens(8)).toBe(92));`,
            solution: R`function permuteUnique(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [], used = new Array(sorted.length).fill(false);
  const backtrack = () => {
    if (path.length === sorted.length) { out.push([...path]); return; }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      path.push(sorted[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  };
  backtrack();
  return out;
}
function nQueens(n) {
  const cols = new Set(), d1 = new Set(), d2 = new Set();
  let count = 0;
  const place = row => {
    if (row === n) { count++; return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || d1.has(row - c) || d2.has(row + c)) continue;
      cols.add(c); d1.add(row - c); d2.add(row + c);
      place(row + 1);
      cols.delete(c); d1.delete(row - c); d2.delete(row + c);
    }
  };
  place(0);
  return count;
}`
          }
        },
        {
          cmd: "combination sum",
          title: "كل التركيبات اللي مجموعها target، والرقم ممكن يتكرر (Combination Sum)",
          desc: R`عندك أرقام موجبة مختلفة، وعايز كل التركيبات (من غير ما الترتيب يفرق) اللي مجموعها بالظبط target، والرقم الواحد ممكن يتاخد أكتر من مرة.

نفس قالب الـ subsets، مع فرقين:

١. بعد ما تختار العنصر i، تنزل بـ [[backtrack(i)]] مش [[i + 1]]، عشان ينفع تاخده تاني. وبرضه مش بترجع لعناصر قبل i، فـ [2, 3] و [3, 2] ميتعدّوش مرتين.

٢. بتسجّل لما الباقي يبقى 0 بالظبط.

والـ pruning: لو الأرقام مترتبة، وأول رقم أكبر من الباقي، كل اللي بعده أكبر كمان، فـ [[break]] مش [[continue]]. ده بيقطع فروع كتير.

ودي أخت coin change: coin change بيسأل «أقل عدد» أو «كام طريقة» (DP)، وهنا عايز الطرق نفسها مكتوبة، فلازم backtracking.`,
          example: R`function combinationSum(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = (start, remaining) => {
    if (remaining === 0) { out.push([...path]); return; }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remaining) break;
      path.push(sorted[i]);
      backtrack(i, remaining - sorted[i]);
      path.pop();
    }
  };
  backtrack(0, target);
  return out;
}
console.log(combinationSum([2, 3, 6, 7], 7)); // [[2, 2, 3], [7]]
console.log(combinationSum([2, 3, 5], 8)); // [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
console.log(combinationSum([2], 1)); // []
// exponential: the tree has at most about n^(target / min) nodes; O(target / min) depth`,
          try: R`حل «Combination Sum II»: كل رقم يتاخد مرة واحدة بس، والـ input فيه تكرار، والناتج مينفعش يكون فيه تركيبتين متطابقتين. [[[10, 1, 2, 7, 6, 1, 5]]] و target = 8 الإجابة [[[[1,1,6], [1,2,5], [1,7], [2,6]]]]. (خليط من الدرس ده ومن Subsets II.) اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[combinationSum2(candidates, target)]]، وترتيب التركيبات مش مهم.`,
          sol: R`الإجابة: [[[[1,1,6], [1,2,5], [1,7], [2,6]]]].

التغييرين: [[backtrack(i + 1, ...)]] بدل [[backtrack(i, ...)]] (كل رقم مرة)، و [[if (i > start && sorted[i] === sorted[i - 1]) continue]] (فوّت التكرار في نفس المستوى، زي Subsets II بالظبط).

[1, 1, 6] مسموحة لأن الـ 1 التانية اتاخدت في مستوى أعمق (بعد الأولى)، مش في نفس المستوى. لكن [1, 7] مش هتطلع مرتين (مرة بكل 1)، لأن الـ 1 التانية اتفوّتت كأول اختيار.

الغلطة الشائعة: تشيل التكرار من الـ input بـ Set في الأول، فـ [1, 1, 6] تختفي. أو تطلّع كل حاجة وبعدين تشيل المكرر بـ [[JSON.stringify]] في Set: بيشتغل بس بيضيّع وقت في فروع مكررة، والانترفيور هيسأل «ممكن من غير كده؟».`,
          solCode: R`function combinationSum2(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = (start, remaining) => {
    if (remaining === 0) { out.push([...path]); return; }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remaining) break;
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      path.push(sorted[i]);
      backtrack(i + 1, remaining - sorted[i]);
      path.pop();
    }
  };
  backtrack(0, target);
  return out;
}
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)); // [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
console.log(combinationSum2([2, 5, 2, 1, 2], 5)); // [[1, 2, 2], [5]]
// O(2^n) subsets in the worst case, each copied in O(n)`,
          flag: "script",
          deep: {
            why: "«كل الطرق اللي بتحقق هدف» بتظهر في: تكوين باقات من منتجات بسعر معين، وتقسيم ساعات شغل على مهام، واقتراح تركيبات قطع في متجر. والانترفيو بيستخدم Combination Sum عشان يشوف هل تقدر تعدّل القالب بتاع الـ backtracking (i ولا i + 1، و break ولا continue) من غير ما تحفظ.",
            how: R`الشجرة لـ [2, 3, 6, 7] و 7: من الجذر (باقي 7): اختار 2 (باقي 5)، اختار 2 (باقي 3)، اختار 2 (باقي 1)، الـ 2 أكبر من 1: break. ارجع، اختار 3 (باقي 0): سجّل [2, 2, 3]. ارجع، 6 > 3: break.

ارجع لـ [2] (باقي 5): اختار 3 (باقي 2)، و 3 > 2: break. 6 > 5: break. ارجع للجذر: اختار 3 (باقي 4)، اختار 3 (باقي 1): break. 6 > 4: break. اختار 6 (باقي 1): break. اختار 7 (باقي 0): سجّل [7].

الـ [[break]] بيشتغل لأننا رتبنا. من غير ترتيب لازم [[continue]] وتجرّب كل حاجة.

ليه [[backtrack(i, ...)]] بتمنع التكرار في الترتيب؟ لأن كل مسار الأرقام فيه غير متناقصة (2 ثم 2 ثم 3). فكل تركيبة ليها ترتيب واحد بس ممكن يطلع.

الـ Big-O صعب يتحسب بالظبط، والطبيعي تقول: العمق أقصاه [[target / min]]، وكل مستوى فيه لحد n فرع، فـ [[O(n^(target / min))]] كحد أعلى. في الانترفيو قول «exponential» واشرح ليه، ده كفاية.`,
            when: "«كل التركيبات» اللي مجموعها أو خاصيتها بتحقق شرط: backtracking. «عدد التركيبات» أو «أقل عدد»: DP (coin change). ولو الأرقام ممكن تبقى سالبة أو صفر، الـ pruning بالـ break مبقاش صح، ولو فيه صفر ممكن تلف للأبد (0 + 0 + 0...)، فاسأل عن القيود.",
            mistakes: R`[[i + 1]] في Combination Sum I (مش هيكرر) أو [[i]] في II (هيكرر). و [[continue]] بدل [[break]] (بيشتغل بس أبطأ) أو [[break]] من غير sort (غلط). ونسيان النسخ. وإنك تسجّل لما [[remaining <= 0]] بدل [[=== 0]]. وفي II: شيل التكرار من الـ input.`
          },
          teach: R`## الفكرة في جملة

نفس قالب الـ subsets، بس بنشيل معانا **الباقي** ([[remaining]]): كل رقم بنختاره بينقص منه. لو الباقي بقى 0 بالظبط، ده حل. وبعد ما تختار الرقم i تنزل من **نفس** i (عشان ينفع يتكرر)، ومش بترجع لأرقام قبله (عشان الترتيب ميتكررش). ولأن الأرقام مترتبة، أول رقم أكبر من الباقي معناه إن كل اللي بعده أكبر كمان: [[break]].

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل اختيار والباقي، والمسافة على الشمال = عمق الـ recursion. هنتتبع على input جديد: [[combinationSum([3, 2, 4], 6)]].

---

## ١. الكود سطر سطر

### [[const sorted = [...candidates].sort((a, b) => a - b);]]

نسخة مترتبة من الصغير للكبير. الترتيب هنا مش للشكل: هو اللي بيخلّي الـ [[break]] صح. [[[3, 2, 4]]] بقت [[[2, 3, 4]]].

### [[const backtrack = (start, remaining) => { ... }]]

- [[start]]: أول index مسموح نختار منه (زي الـ subsets).
- [[remaining]]: فاضل كام عشان نوصل للـ target.

### [[if (remaining === 0) { out.push([...path]); return; }]]

وصلنا بالظبط: سجّل نسخة واخرج. [[=== 0]] مش [[<= 0]]: الباقي مش هيبقى سالب أصلًا بسبب الـ break، بس لو بقى، ده مش حل.

### [[if (sorted[i] > remaining) break;]]

الرقم ده أكبر من الباقي، ولأن الـ array مترتبة كل اللي بعده أكبر كمان: اخرج من الـ loop كله. لو كانت مش مترتبة، كان لازم [[continue]] (فوّت ده بس) وتجرّب الباقي.

### [[path.push(sorted[i]); backtrack(i, remaining - sorted[i]); path.pop();]]

- اختار الرقم.
- كمّل من **[[i]] نفسه** مش [[i + 1]]: الرقم ده لسه مسموح يتاخد تاني. والباقي نقص بقيمته.
- ارجع.

---

## ٢. التتبع على [[([3, 2, 4], 6)]]

بعد الترتيب: [2, 3, 4].

~~~text اللي اتطبع (المسافة = العمق)
1. i=0 take 2 path [2] remaining 4
2.   i=0 take 2 path [2,2] remaining 2
3.     i=0 take 2 path [2,2,2] remaining 0
4.       remaining 0 -> record [2,2,2]
5.     i=1 3 > 2 -> break
6.   i=1 take 3 path [2,3] remaining 1
7.     i=1 3 > 1 -> break
8.   i=2 take 4 path [2,4] remaining 0
9.     remaining 0 -> record [2,4]
10. i=1 take 3 path [3] remaining 3
11.   i=1 take 3 path [3,3] remaining 0
12.     remaining 0 -> record [3,3]
13.   i=2 4 > 3 -> break
14. i=2 take 4 path [4] remaining 2
15.   i=2 4 > 2 -> break
~~~

| الخطوات | اللي حصل |
|---|---|
| 1 لـ 4 | 2 ثلاث مرات (لأن بننزل من نفس i): الباقي 0، سجّل [2,2,2] |
| 5 | تحت [2,2] الباقي 2، والـ 3 أكبر: break (ومن غير ما نجرّب 4 خالص) |
| 6 و 7 | [2,3] الباقي 1، وأصغر رقم مسموح (3) أكبر: break |
| 8 و 9 | [2,4] الباقي 0: سجّل |
| 10 لـ 13 | الجذر بيجرّب 3: [3,3] سجّل. وجوه [3] مبيرجعش لـ 2 (لأن [[start]] = 1)، فـ [3, 2] مش هتطلع |
| 14 و 15 | الجذر بيجرّب 4: الباقي 2، والـ 4 أكبر: break |

لاحظ إن كل مسار الأرقام فيه **مبتنقصش** (2 2 2، 2 4، 3 3). ده اللي بيضمن إن كل تركيبة تطلع بترتيب واحد بس.

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ [ 2, 2, 3 ], [ 7 ] ]
[ [ 2, 2, 2, 2 ], [ 2, 3, 3 ], [ 3, 5 ] ]
[]
~~~

- [[([2, 3, 6, 7], 7)]]: 2 + 2 + 3، و 7 لوحدها.
- [[([2, 3, 5], 8)]]: ٣ تركيبات، والـ 2 اتكررت ٤ مرات في الأولى.
- [[([2], 1)]]: أول رقم (2) أكبر من الباقي (1): break من أول لفة، والناتج فاضي.

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| العمق | [[target / min]] | أطول مسار = أصغر رقم متكرر لحد الـ target (6 / 2 = 3 في التتبع) |
| الوقت | exponential، حد أعلى تقريبًا [[O(n^(target / min))]] | كل مستوى فيه لحد n اختيار، والـ break بيقطع كتير منهم |
| الذاكرة الزيادة | [[O(target / min)]] | [[path]] والـ call stack (من غير الناتج) |

---

## الخلاصة

~~~text
sort           عشان break يبقى صح
remaining      بينقص مع كل اختيار، و === 0 يعني سجّل
break          أول رقم أكبر من الباقي = كل اللي بعده أكبر
backtrack(i)   الرقم ينفع يتاخد تاني
start          بيمنع [3, 2] بعد [2, 3]
~~~

> نفس القالب بيحل subsets و combinations: الفرق بين المسائل في ٣ حاجات بس: بتسجّل إمتى، وبتنزل بـ [[i]] ولا [[i + 1]]، وبتوقف بـ [[break]] ولا [[continue]].`,
          lines: [
            "كل التركيبات اللي مجموعها target.",
            "رتّب عشان الـ break يشتغل.",
            "الناتج والمسار.",
            "backtrack بتعرف تبدأ منين وفاضل كام.",
            "وصلنا بالظبط: سجّل.",
            "جرّب من start لقدام.",
            "الرقم أكبر من الباقي، واللي بعده أكبر كمان: وقّف.",
            "اختار.",
            "كمّل من نفس i (ينفع يتكرر).",
            "ارجع.",
            "قفلة الـ for.",
            "قفلة backtrack.",
            "ابدأ بالـ target كله.",
            "رجّع.",
            "قفلة.",
            "2 + 2 + 3، و 7.",
            "٣ تركيبات.",
            "مستحيل."
          ],
          check: {
            lang: "js",
            starter: R`function combinationSum2(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const out = [], path = [];
  // backtrack(i + 1, ...) بدل backtrack(i, ...)، وفوّت التكرار في نفس المستوى
  return out;
}`,
            tests: R`const norm = xs => xs.map(x => JSON.stringify(x)).sort();
const normSorted = xs => xs.map(x => JSON.stringify([...x].sort((a, b) => a - b))).sort();
test("[10, 1, 2, 7, 6, 1, 5] و 8 ← [1,1,6] [1,2,5] [1,7] [2,6]", () => expect(normSorted(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))).toEqual(normSorted([[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]])));
test("[2, 5, 2, 1, 2] و 5 ← [1,2,2] و [5]", () => expect(normSorted(combinationSum2([2, 5, 2, 1, 2], 5))).toEqual(normSorted([[1, 2, 2], [5]])));
test("كل رقم مرة واحدة: [1, 1, 1] و 2 ← [1,1] مرة واحدة", () => expect(normSorted(combinationSum2([1, 1, 1], 2))).toEqual(normSorted([[1, 1]])));
test("مفيش ← []", () => expect([combinationSum2([], 3), combinationSum2([3], 1)]).toEqual([[], []]));
test("30 واحد و target 15 ← تركيبة واحدة (التكرار في نفس المستوى بيتفوّت، وإلا 155 مليون فرع)", () => expect(combinationSum2(new Array(30).fill(1), 15).length).toBe(1));`,
            solution: R`function combinationSum2(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = (start, remaining) => {
    if (remaining === 0) { out.push([...path]); return; }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remaining) break;
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      path.push(sorted[i]);
      backtrack(i + 1, remaining - sorted[i]);
      path.pop();
    }
  };
  backtrack(0, target);
  return out;
}`
          }
        },
        {
          cmd: "trie (autocomplete)",
          title: "اقتراحات البحث وانت بتكتب: trie (prefix tree)",
          desc: R`الـ trie شجرة كل عقدة فيها حرف، وكل مسار من الجذر لعقدة هو prefix. الكلمات اللي بتبدأ بنفس الحروف بتشارك نفس الفرع: car و card و care و cat كلهم تحت c ← a.

كل عقدة فيها [[children]] (Map من الحرف للعقدة اللي بعده) و [[end]] (true لو فيه كلمة بتخلص هنا). الـ [[end]] مهم: «car» كلمة، بس «ca» مجرد prefix.

العمليات: insert و has و startsWith كلهم [[O(L)]] (L طول الكلمة)، مهما كان عدد الكلمات في القاموس مليون. والـ autocomplete: انزل لآخر الـ prefix، وبعدين DFS من هناك يجمّع كل الكلمات اللي تحته.

مقارنة بـ [[words.filter(w => w.startsWith(prefix))]]: ده [[O(n × L)]] مع كل حرف بيتكتب. مع قاموس صغير (مئات) مفيش فرق يذكر، ومع قاموس كبير وكتابة سريعة، الـ trie بيفرق.`,
          example: R`class Trie {
  constructor() { this.root = { children: new Map(), end: false }; }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), end: false });
      node = node.children.get(ch);
    }
    node.end = true;
  }
  find(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return null;
    }
    return node;
  }
  has(word) { return this.find(word)?.end === true; }
  complete(prefix, limit = 5) {
    const out = [];
    const walk = (node, word) => {
      if (out.length >= limit) return;
      if (node.end) out.push(word);
      for (const ch of [...node.children.keys()].sort()) walk(node.children.get(ch), word + ch);
    };
    const start = this.find(prefix);
    if (start) walk(start, prefix);
    return out;
  }
}
const t = new Trie();
for (const w of ["car", "card", "care", "cat", "dog", "do"]) t.insert(w);
console.log(t.complete("car")); // ['car', 'card', 'care']
console.log(t.complete("d")); // ['do', 'dog']
console.log(t.has("ca"), t.has("cat"), t.complete("x")); // false true []
// insert, has, find: O(L) for length L; complete: O(L + size of the visited subtree)`,
          try: R`خلّي الاقتراحات مترتبة بالشعبية: كل مرة المستخدم يختار كلمة، [[insert]] بتزوّد عدّاد [[count]] في آخر عقدة. و [[complete]] ترجّع أعلى k كلمات تحت الـ prefix حسب العدد (والتعادل أبجدي). بعد ما تضيف "care" ٣ مرات و "card" مرتين و "car" مرة، [[complete("car", 2)]] لازم ترجّع [[["care", "card"]]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[RankedTrie]] فيه [[insert(word)]] بتزوّد العدّاد، و [[complete(prefix, k)]] مترتبة بالعدد والتعادل أبجدي.`,
          sol: R`الناتج: [[["care", "card"]]]، و [[complete("ca", 3)]] = [[["care", "card", "car"]]] لو "cat" اتضافت مرة و "car" مرة (التعادل أبجدي: car قبل cat).

[[end]] بقت [[count]] (رقم، و 0 يعني مش كلمة). في [[complete]]: اجمع كل الكلمات تحت الـ prefix مع عددها، ورتّبهم بـ [[(a, b) => b.count - a.count || a.word.localeCompare(b.word)]]، وخد أول k. لو الفرع ضخم، استخدم heap حجمه k (درس «top k frequent»).

في الأنظمة الحقيقية، بيحفظوا في كل عقدة «أعلى k كلمات تحتها» جاهزين، عشان الاقتراح يبقى [[O(L)]] من غير DFS. التحديث بيبقى أغلى، بس القراءة (اللي بتحصل مع كل حرف) بتبقى فورية.

الغلطة الشائعة: تنسى [[limit]] أو تطلّع كل الشجرة لما الـ prefix يبقى حرف واحد، فمع قاموس كبير الاقتراح يبطّأ الـ UI.`,
          solCode: R`class RankedTrie {
  constructor() { this.root = { children: new Map(), count: 0 }; }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), count: 0 });
      node = node.children.get(ch);
    }
    node.count++;
  }
  complete(prefix, k = 5) {
    let node = this.root;
    for (const ch of prefix) { node = node.children.get(ch); if (!node) return []; }
    const found = [];
    const walk = (n, word) => {
      if (n.count) found.push({ word, count: n.count });
      for (const [ch, child] of n.children) walk(child, word + ch);
    };
    walk(node, prefix);
    found.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
    return found.slice(0, k).map(x => x.word);
  }
}
const t = new RankedTrie();
["care", "care", "care", "card", "card", "car", "cat"].forEach(w => t.insert(w));
console.log(t.complete("car", 2)); // ['care', 'card']
console.log(t.complete("ca", 3)); // ['care', 'card', 'car']
console.log(t.complete("z")); // []
// insert O(L); complete O(L + m log m) for m words under the prefix`,
          flag: "script",
          deep: {
            why: "الـ autocomplete في search box من أشهر features الـ frontend، وسؤال «صمّم autocomplete» بيتسأل في انترفيوهات الـ system design والـ frontend. والـ trie كمان ورا بعض الـ routers: Fastify (عن طريق مكتبة find-my-way) بيستخدم radix tree، نسخة مضغوطة من الـ trie، عشان يطابق [[/users/:id/posts]] من غير ما يجرّب كل route بالترتيب زي Express، وورا IP routing، و spell checkers.",
            how: R`insert "car": الجذر مفيهوش c، اعمل عقدة. انزل. مفيش a، اعمل. مفيش r، اعمل. علّم r بـ [[end = true]]. insert "card": c و a و r موجودين، انزل من غير ما تعمل حاجة، واعمل d وعلّمها.

[[complete("car")]]: [[find]] بتنزل c ← a ← r. من r: [[end]] = true فسجّل "car". الأولاد d و e بالترتيب الأبجدي: d عندها end، سجّل "card". e سجّل "care".

ليه Map مش object؟ الـ Map بتحفظ ترتيب الإضافة، ومفيهاش keys موروثة زي [[__proto__]] و [[constructor]] (كلمة زي "constructor" في object عادي هتلاقي حاجة موجودة أصلًا!). وليه مش array من 26 خانة زي اللي في كتب C/Java؟ عشان الحروف ممكن تبقى عربي أو emoji أو أي Unicode.

[[for (const ch of word)]] بتمشي على الحروف بالـ code points، فالـ emoji (اللي بياخد خانتين في UTF-16) بيتعامل كحرف واحد، عكس [[word[i]]].

الذاكرة: كل حرف في كل كلمة ممكن ياخد عقدة، فـ [[O(مجموع أطوال الكلمات)]]، والـ prefixes المشتركة بتوفّر. بس كل عقدة Map، وده تقيل في JavaScript، فمع مليون كلمة الـ trie ممكن ياخد مئات الميجا.`,
            when: "autocomplete، و «فيه كلمة بتبدأ بكذا؟» كتير، و Word Search II (كلمات كتير في grid)، و routers. لو محتاج «الكلمة موجودة؟» بس، Set أبسط وأسرع. لو القاموس صغير، [[filter]] + [[startsWith]] كفاية. ولو القاموس ضخم وعلى السيرفر، الداتابيز أو search engine (Postgres بـ [[LIKE 'car%']] على index، أو Elasticsearch/Meilisearch) أحسن من trie في الذاكرة.",
            mistakes: R`نسيان [[end]]، فكل prefix يبان كلمة ([[has("ca")]] ترجع true). واستخدام object بـ keys من المستخدم ([[__proto__]]). واستخدام [[word[i]]] مع emoji. وفي الـ frontend: مناداة الـ API مع كل حرف من غير debounce، أو الـ response القديم يوصل بعد الجديد فيعرض اقتراحات غلط (استخدم AbortController، شوف «تاب React»).`
          },
          teach: R`## الفكرة في جملة

كل كلمة بتتخزن كمسار من الجذر: حرف في كل عقدة. الكلمات اللي بتبدأ بنفس الحروف بتمشي في نفس المسار لحد ما تختلف، وآخر عقدة في كل كلمة متعلّمة بـ [[end = true]]. عشان تقترح كلمات لـ prefix: انزل بحروفه، وبعدين لف على كل اللي تحته (DFS) واجمع أي عقدة متعلّمة.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه [[insert]] و [[walk]]. هنتتبع على كلمات جديدة: [[["sun", "sum", "sung", "so"]]].

---

## ١. شكل العقدة

~~~js
{ children: new Map(), end: false }
~~~

- [[children]]: [[Map]] من الحرف للعقدة اللي بعده. ليه Map؟ مفاتيحها أي حرف (عربي، emoji)، ومفيهاش مفاتيح موروثة. في object عادي، [[({}).constructor]] موجودة أصلًا (جرّبناها)، فكلمة زي "constructor" كانت هتلاقي «ابن» مش بتاعها.
- [[end]]: فيه كلمة بتخلص هنا؟ من غيرها مش هنعرف نفرّق بين الكلمة "sun" والـ prefix "su".

---

## ٢. [[insert(word)]]

~~~js
let node = this.root;
for (const ch of word) {
  if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), end: false });
  node = node.children.get(ch);
}
node.end = true;
~~~

ابدأ من الجذر. لكل حرف: لو مفيش ابن بالحرف ده اعمله، وانزل له. في الآخر علّم العقدة.

| الكلمة | الحروف | عدد العقد بعدها (مع الجذر) |
|---|---|---|
| sun | s جديدة، u جديدة، n جديدة | 4 |
| sum | s موجودة، u موجودة، m جديدة | 5 |
| sung | s و u و n موجودين، g جديدة | 6 |
| so | s موجودة، o جديدة | 7 |

٤ كلمات فيهم 12 حرف، وخدوا 6 عقد بس (من غير الجذر)، لأن الـ prefixes المشتركة اتشاركت.

~~~text الشجرة (* = end)
(root)
  s
    u
      n*
        g*
      m*
    o*
~~~

---

## ٣. [[find(prefix)]] و [[has(word)]]

~~~js
for (const ch of prefix) {
  node = node.children.get(ch);
  if (!node) return null;
}
return node;
~~~

انزل حرف حرف. لو حرف مش موجود، [[get]] بترجّع [[undefined]]، و [[!node]] بتبقى [[true]]: الـ prefix مش موجود، رجّع [[null]]. جرّبنا [[find("sx")]]: وقفت عند x.

[[has(word)]]: [[this.find(word)?.end === true]].

- [[?.]] اسمها optional chaining: لو اللي قبلها [[null]] أو [[undefined]]، الناتج [[undefined]] بدل ما يرمي error. جرّبنا [[undefined?.end]] = [[undefined]].
- [[=== true]]: عشان [[undefined]] تبقى [[false]] صريحة.

فـ [[has("su")]] = [[false]] (العقدة موجودة بس [[end]] = false)، و [[has("sun")]] = [[true]].

---

## ٤. [[complete(prefix, limit = 5)]]

~~~js
const walk = (node, word) => {
  if (out.length >= limit) return;
  if (node.end) out.push(word);
  for (const ch of [...node.children.keys()].sort()) walk(node.children.get(ch), word + ch);
};
const start = this.find(prefix);
if (start) walk(start, prefix);
~~~

- [[walk]] DFS بياخد العقدة والكلمة اللي اتكونت لحد هنا.
- [[out.length >= limit]]: جمعنا كفاية، اخرج من غير ما تكمّل.
- [[node.end]]: كلمة كاملة، سجّلها **قبل** أولادها، فالكلمة الأقصر بتطلع الأول.
- [[[...node.children.keys()].sort()]]: [[keys()]] بترجّع iterator، و [[[...]]] بتحوّله array عشان نعمل له [[sort]] (أبجدي)، فالاقتراحات تطلع مترتبة.
- [[word + ch]]: الكلمة بتكبر حرف مع كل نزلة.

### التتبع: [[complete("su")]]

| النداء | [[end]] | الأولاد (مترتبين) | [[out]] بعدها |
|---|---|---|---|
| walk(su) | false | m، n | [] |
| walk(sum) | true | | [sum] |
| walk(sun) | true | g | [sum, sun] |
| walk(sung) | true | | [sum, sun, sung] |

m قبل n أبجديًا، فـ sum قبل sun مع إن sun اتضافت الأول.

### التتبع: [[complete("s", 2)]]

| النداء | اللي حصل | [[out]] بعدها |
|---|---|---|
| walk(s) | مش كلمة، الأولاد o و u | [] |
| walk(so) | كلمة | [so] |
| walk(su) | مش كلمة، الأولاد m و n | [so] |
| walk(sum) | كلمة | [so, sum] |
| walk(sun) | [[out.length]] = 2 = limit: اخرج | [so, sum] |

الـ limit وقّف الـ DFS، فـ sung عمرها ما اتزارت. ده المهم مع قاموس كبير: prefix حرف واحد ممكن يبقى تحته ألوف الكلمات.

---

## ٥. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 'car', 'card', 'care' ]
[ 'do', 'dog' ]
false true []
~~~

- [[complete("car")]]: car نفسها كلمة فطلعت الأول، وبعدين d قبل e.
- [[complete("d")]]: do قبل dog لأنها بتتسجّل قبل أولادها.
- [[has("ca")]] = false (prefix مش كلمة)، و [[has("cat")]] = true، و [[complete("x")]] = [] (الـ [[find]] رجّعت null، فـ [[walk]] متنادتش).

---

## ٦. الـ Big-O وليه

L = طول الكلمة أو الـ prefix.

| العملية | الوقت | السبب |
|---|---|---|
| [[insert]] و [[find]] و [[has]] | [[O(L)]] | خطوة لكل حرف، و [[Map.get]] [[O(1)]]. مش مربوط بعدد الكلمات في القاموس |
| [[complete]] | [[O(L + العقد اللي اتزارت)]] | النزول للـ prefix، وبعدين الـ DFS (والـ sort لأولاد كل عقدة) |
| الذاكرة | [[O(مجموع أطوال الكلمات)]] | عقدة لكل حرف، ناقص الـ prefixes المشتركة |

---

## الخلاصة

~~~text
العقدة       { children: Map, end: boolean }
insert       لكل حرف: لو مش موجود اعمله، وانزل. وفي الآخر end = true
find         انزل حرف حرف، ولو مفيش ابن رجّع null
has          find(word)?.end === true
complete     find للـ prefix، وبعدين DFS بيسجّل أي end، بالترتيب الأبجدي ولحد limit
~~~

> الـ trie بيجاوب «إيه الكلمات اللي بتبدأ بكذا؟» في وقت مربوط بطول الـ prefix، مش بحجم القاموس. والـ [[end]] هو اللي بيفرق بين كلمة و prefix.`,
          lines: [
            "الـ trie.",
            "الجذر عقدة فاضية: أولادها Map، ومش نهاية كلمة.",
            "إضافة كلمة.",
            "ابدأ من الجذر.",
            "لكل حرف.",
            "مفيش ابن بالحرف ده: اعمله.",
            "انزل.",
            "قفلة.",
            "هنا بتخلص كلمة.",
            "قفلة insert.",
            "انزل لآخر الـ prefix.",
            "من الجذر.",
            "حرف حرف.",
            "انزل.",
            "مفيش فرع: الـ prefix مش موجود.",
            "قفلة.",
            "العقدة اللي عند آخر حرف.",
            "قفلة find.",
            "كلمة كاملة؟ لازم الـ prefix يبقى موجود وينتهي بـ end.",
            "الاقتراحات: لحد limit كلمة.",
            "الناتج.",
            "DFS من عقدة، ومعاه الكلمة لحد هنا.",
            "كفاية: وقّف.",
            "فيه كلمة بتخلص هنا: سجّلها.",
            "انزل على الأولاد بالترتيب الأبجدي.",
            "قفلة walk.",
            "آخر الـ prefix.",
            "لو موجود، اجمع من عنده.",
            "رجّع.",
            "قفلة complete.",
            "قفلة الـ class.",
            "trie جديد.",
            "٦ كلمات.",
            "تحت car.",
            "تحت d: do الأول لأنها أقصر (بتتسجّل قبل أولادها).",
            "ca مش كلمة، و cat كلمة، و x مفيش."
          ],
          check: {
            lang: "js",
            starter: R`class RankedTrie {
  constructor() { this.root = { children: new Map(), count: 0 }; }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), count: 0 });
      node = node.children.get(ch);
    }
    // زوّد العدّاد في آخر عقدة
  }
  complete(prefix, k = 5) {
    // اجمع كل الكلمات تحت الـ prefix مع عددها، ورتّب، وخد أول k
    return [];
  }
}`,
            tests: R`const make = () => {
  const t = new RankedTrie();
  for (const [w, n] of [["care", 3], ["card", 2], ["car", 1]]) for (let i = 0; i < n; i++) t.insert(w);
  return t;
};
test("care ×3 و card ×2 و car ×1: complete('car', 2) ← ['care', 'card']", () => expect(make().complete("car", 2)).toEqual(["care", "card"]));
test("التعادل أبجدي: + cat مرة ← complete('ca', 3) ← ['care', 'card', 'car']", () => {
  const t = make();
  t.insert("cat");
  expect(t.complete("ca", 3)).toEqual(["care", "card", "car"]);
});
test("k أكبر من عدد الكلمات ← كلهم", () => expect(make().complete("car", 10)).toEqual(["care", "card", "car"]));
test("prefix مش موجود ← []", () => expect(make().complete("x", 3)).toEqual([]));
test("كلمة بتتختار كتير تطلع فوق: car ×5", () => {
  const t = make();
  for (let i = 0; i < 5; i++) t.insert("car");
  expect(t.complete("c", 1)).toEqual(["car"]);
});`,
            solution: R`class RankedTrie {
  constructor() { this.root = { children: new Map(), count: 0 }; }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), count: 0 });
      node = node.children.get(ch);
    }
    node.count++;
  }
  complete(prefix, k = 5) {
    let node = this.root;
    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return [];
    }
    const found = [];
    const walk = (n, word) => {
      if (n.count) found.push({ word, count: n.count });
      for (const [ch, child] of n.children) walk(child, word + ch);
    };
    walk(node, prefix);
    return found.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word)).slice(0, k).map(x => x.word);
  }
}`
          }
        }
      ]
    }
]);
