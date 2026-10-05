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
