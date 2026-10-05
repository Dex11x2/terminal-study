// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "trees",
      l: 3,
      n: "كل عقدة جواها شجرة أصغر: DFS و BFS، و max depth، و BST، و LCA، والمشي على JSON متداخل",
      items: [
        {
          cmd: "tree DFS (pre/in/post)",
          title: "إزاي تزور كل عقدة في الشجرة، وإيه الفرق بين pre و in و post order؟",
          desc: R`الـ binary tree: كل عقدة (node) فيها قيمة وابنين بالكتير: [[left]] و [[right]]. العقدة اللي فوق خالص اسمها root، واللي ملهاش أولاد اسمها leaf.

DFS (depth-first search) معناها «انزل لآخر فرع وبعدين ارجع». أسهل طريقة ليها recursion، لأن كل ابن هو شجرة كاملة لوحده (زي ما شفنا في درس «recursion (base case)»).

الفرق بين الـ ٣ أنواع هو إمتى بتسجّل العقدة نفسها بالنسبة لأولادها:

pre-order: العقدة الأول، وبعدين الشمال، وبعدين اليمين. مفيد لو عايز تنسخ الشجرة أو تطبعها زي شجرة الفولدرات.

in-order: الشمال، وبعدين العقدة، وبعدين اليمين. في BST بيطلّع القيم مترتبة.

post-order: الأولاد الأول وبعدين العقدة. مفيد لما العقدة محتاجة نتيجة أولادها: حجم فولدر = مجموع أحجام اللي جواه، أو مسح شجرة من تحت لفوق.`,
          example: R`class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
//        4
//      /   \
//     2     6
//    / \   / \
//   1   3 5   7
const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7)));
function dfs(node, order, out = []) {
  if (!node) return out;
  if (order === "pre") out.push(node.val);
  dfs(node.left, order, out);
  if (order === "in") out.push(node.val);
  dfs(node.right, order, out);
  if (order === "post") out.push(node.val);
  return out;
}
console.log(dfs(root, "pre").join(" "));  // 4 2 1 3 6 5 7
console.log(dfs(root, "in").join(" "));   // 1 2 3 4 5 6 7
console.log(dfs(root, "post").join(" ")); // 1 3 2 5 7 6 4
// O(n) time (every node once), O(h) space for the call stack (h = height of the tree)`,
          try: R`اكتب [[inorderIter]] و [[preorderIter]] من غير recursion: stack انت اللي ماسكه بـ [[push]] و [[pop]]. لازم يطلّعوا نفس ناتج [[dfs]] بالظبط، وجرّبهم على شجرة فاضية ([[null]]) لازم ترجّع [[[]]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[inorderIter]] و [[preorderIter]] بـ stack انت ماسكه.`,
          sol: R`الناتج المتوقع: [[1 2 3 4 5 6 7]] للـ in-order، و [[4 2 1 3 6 5 7]] للـ pre-order، و [[[]]] للشجرة الفاضية.

in-order: انزل شمال لآخره وانت بتحط كل عقدة في الـ stack. لما توصل null، اعمل [[pop]]، سجّل القيمة، وروح يمين العقدة دي وكرر. الشرط [[while (cur || stack.length)]] لازم يبقى الاتنين: ممكن الـ stack يفضى وإنت لسه عندك فرع يمين.

pre-order: حط الـ root في الـ stack. كل مرة [[pop]] وسجّل، وبعدين [[push]] اليمين الأول وبعده الشمال، عشان الشمال يطلع الأول (الـ stack آخر داخل أول خارج).

الغلطة المشهورة: تعمل [[push]] للشمال قبل اليمين، فيطلع [[4 6 7 5 2 3 1]]، وده pre-order معكوس (يمين قبل شمال).`,
          solCode: R`class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7)));
function inorderIter(root) {
  const out = [], stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}
function preorderIter(root) {
  if (!root) return [];
  const out = [], stack = [root];
  while (stack.length) {
    const node = stack.pop();
    out.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return out;
}
console.log(inorderIter(root).join(" "));  // 1 2 3 4 5 6 7
console.log(preorderIter(root).join(" ")); // 4 2 1 3 6 5 7
console.log(inorderIter(null), preorderIter(null)); // [] []
// both: O(n) time, O(h) extra space for the stack`,
          flag: "script",
          deep: {
            why: "الشجرة في كل حتة في الشغل: الـ DOM، وشجرة الفولدرات، و JSON متداخل، والكومنتات والردود، والـ menus اللي جواها menus، والـ AST اللي ESLint و Prettier و Babel بيشتغلوا عليه. وفي الانترفيو، مسائل الـ trees من أكتر حاجة بتتسأل، وكلها تقريبًا DFS أو BFS بتعديل بسيط.",
            how: R`dry run للـ in-order على الشجرة اللي في المثال: [[dfs(4)]] بتنادي [[dfs(2)]] الأول، واللي بتنادي [[dfs(1)]]. العقدة 1 ملهاش شمال (null بترجع على طول)، فتسجّل 1، وملهاش يمين. نرجع لـ 2: نسجّل 2، وننزل يمين لـ 3. نرجع لـ 4: نسجّل 4، وننزل يمين... النتيجة 1 2 3 4 5 6 7.

ليه [[out]] بتتبعت مع النداءات؟ عشان كل النداءات تضيف في نفس الـ array. لو كل نداء عمل array جديدة ورجّعها، هتحتاج تدمجهم ([[concat]] أو spread) وده بيكلّف نسخ زيادة.

الذاكرة [[O(h)]]: الـ call stack فيه في أي لحظة المسار من الـ root للعقدة الحالية بس. في شجرة متوازنة h حوالي [[log n]]، لكن في شجرة شكلها خط (كل عقدة ليها ابن يمين بس) h = n. وفي JavaScript الـ stack بيخلص بعد حوالي ١٠ آلاف مستوى وبيطلع [[RangeError: Maximum call stack size exceeded]]، ودا سبب إنك لازم تعرف النسخة اللي بـ stack صريح (الـ try).

الـ constructor بيدّي [[null]] كقيمة default للأولاد، فـ [[new TreeNode(1)]] leaf. ومن الدرس الجاي هنستخدم دالة صغيرة [[node(val, left, right)]] بترجّع object بنفس الشكل، عشان الأمثلة تبقى أقصر.`,
            when: "pre-order: نسخ الشجرة، أو serialize (تحويلها لنص وترجيعها)، أو طباعتها بالـ indentation. in-order: أي حاجة على BST محتاجة ترتيب (kth smallest، validate). post-order: لما العقدة محتاجة نتايج أولادها الأول: الارتفاع، والحجم، ومسح شجرة، وحساب مجموع فولدر. ولو المسألة بتقول «مستوى مستوى» أو «أقرب»، ده BFS مش DFS (الدرس الجاي).",
            mistakes: R`إنك تنسى الـ base case [[if (!node)]] فتقرا [[.left]] من null. وإنك تعمل [[return dfs(node.left)]] فتقفل قبل ما تروح يمين. وإنك تخلط بين الأنواع في الانترفيو: اتعلّم الجملة «pre = قبل الأولاد، in = بينهم، post = بعدهم». وسؤال انترفيو مشهور: «إيه اللي يحصل لو الشجرة عمقها مليون؟»، الإجابة stack overflow في النسخة الـ recursive، والحل stack صريح في heap memory.`
          },
          lines: [
            "كل عقدة في الشجرة object من الـ class ده.",
            "القيمة والابنين، والأولاد null لو مش موجودين.",
            "نخزّن التلاتة في العقدة.",
            "قفلة الـ constructor.",
            "قفلة الـ class.",
            "نبني الشجرة اللي في الرسمة: الـ root قيمته 4.",
            "الفرع الشمال: 2 وتحتها 1 و 3.",
            "الفرع اليمين: 6 وتحتها 5 و 7.",
            "دالة واحدة للـ ٣ أنواع، والـ order بيحدد إمتى نسجّل.",
            "base case: فرع فاضي، ارجع من غير ما تعمل حاجة.",
            "pre: سجّل العقدة قبل أولادها.",
            "انزل الشمال كله.",
            "in: سجّل بين الشمال واليمين.",
            "انزل اليمين كله.",
            "post: سجّل بعد الأولاد.",
            "رجّع نفس الـ array اللي بتتملي.",
            "قفلة.",
            "pre-order: الـ root الأول.",
            "in-order: مترتبة لأن الشجرة دي BST.",
            "post-order: الـ root في الآخر."
          ],
          check: {
            lang: "js",
            starter: R`function inorderIter(root) {
  const out = [], stack = [];
  let cur = root;
  // while (cur || stack.length): انزل شمال لآخره، وبعدين pop وسجّل وروح يمين
  return out;
}
function preorderIter(root) {
  const out = [];
  // حط الـ root، وكل مرة pop وسجّل، و push اليمين قبل الشمال
  return out;
}`,
            tests: R`const node = (val, left = null, right = null) => ({ val, left, right });
const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
test("inorderIter ← 1 2 3 4 5 6 7", () => expect(inorderIter(root)).toEqual([1, 2, 3, 4, 5, 6, 7]));
test("preorderIter ← 4 2 1 3 6 5 7 (اليمين يدخل الـ stack قبل الشمال)", () => expect(preorderIter(root)).toEqual([4, 2, 1, 3, 6, 5, 7]));
test("شجرة فاضية (null) ← [] في الاتنين", () => expect([inorderIter(null), preorderIter(null)]).toEqual([[], []]));
test("شجرة فروعها يمين بس: node(1, null, node(2, null, node(3)))", () => {
  const t = node(1, null, node(2, null, node(3)));
  expect([inorderIter(t), preorderIter(t)]).toEqual([[1, 2, 3], [1, 2, 3]]);
});
test("سلسلة عمقها ١٠٠ ألف: الـ recursion كانت هتعمل stack overflow، الـ stack بتاعك لأ", () => {
  let t = null;
  for (let i = 0; i < 100000; i++) t = node(i, t);
  const a = inorderIter(t), b = preorderIter(t);
  expect([a.length, a[0], a.at(-1), b[0], b.at(-1)]).toEqual([100000, 0, 99999, 99999, 0]);
});`,
            solution: R`function inorderIter(root) {
  const out = [], stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}
function preorderIter(root) {
  const out = [];
  if (!root) return out;
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    out.push(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
  return out;
}`
          }
        },
        {
          cmd: "BFS (level order)",
          title: "اطبع الشجرة مستوى مستوى: [[3]] وبعدين [[9, 20]] وبعدين [[15, 7]]",
          desc: R`BFS (breadth-first search) بيزور العقد بالمستوى: الـ root، وبعدين كل أولاده، وبعدين كل أحفاده. الأداة بتاعته queue: أول واحد يدخل أول واحد يطلع، عكس الـ stack اللي بيعمله DFS.

الفكرة هنا: خلّي الـ queue فيها المستوى الحالي كله. سجّل قيمهم، وابني array للمستوى الجاي من أولادهم، وكرر لحد ما المستوى يفضى.

ليه مش [[queue.shift()]]؟ لأن [[shift]] في JavaScript بتزق كل العناصر خانة، فبتبقى [[O(n)]] في كل مرة (شرحناها في درس «queue و deque»). بناء array جديدة لكل مستوى بيخلّي كل عقدة تدخل وتطلع مرة واحدة.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
//      3
//     / \
//    9   20
//       /  \
//      15   7
const root = node(3, node(9), node(20, node(15), node(7)));
function levelOrder(root) {
  if (!root) return [];
  const levels = [];
  let queue = [root];
  while (queue.length) {
    levels.push(queue.map(n => n.val));
    const next = [];
    for (const n of queue) {
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    queue = next;
  }
  return levels;
}
console.log(levelOrder(root)); // [[3], [9, 20], [15, 7]]
console.log(levelOrder(node(1))); // [[1]]
console.log(levelOrder(null)); // []
// O(n) time, O(w) space where w = the widest level (up to n/2 in a full tree)`,
          try: R`حل «Binary Tree Right Side View»: لو واقف على يمين الشجرة، هتشوف أنهي قيم؟ (آخر عقدة في كل مستوى). جرّبه على الشجرة [[node(1, node(2, null, node(5)), node(3, null, node(4)))]]، والمفروض يطلع [[[1, 3, 4]]]. وبعدين عدّل [[levelOrder]] يرجّع zigzag: مستوى شمال لليمين والجاي يمين للشمال. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[rightSideView(root)]] و [[zigzag(root)]].`,
          sol: R`right side view: نفس الـ loop، بس بدل ما تسجّل المستوى كله سجّل [[queue.at(-1).val]] (آخر عقدة). الناتج [[[1, 3, 4]]]: المستوى الأول 1، والتاني [2, 3] آخره 3، والتالت [5, 4] آخره 4.

الغلطة الشائعة: تمشي على الفروع اليمين بس (root.right.right...)، فتطلع [[[1, 3, 4]]] هنا بالصدفة، لكن لو الفرع اليمين أقصر من الشمال هتفوّت عقد باينة. جرّب [[node(1, node(2, node(4)), node(3))]]: الصح [[[1, 3, 4]]] لأن 4 باينة من اليمين رغم إنها في الشمال.

zigzag: اعمل flag بيتقلب كل مستوى، ولو true اعكس قيم المستوى قبل ما تسجّلها. الناتج للشجرة اللي في المثال [[[[3], [20, 9], [15, 7]]]].`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function rightSideView(root) {
  const out = [];
  let queue = root ? [root] : [];
  while (queue.length) {
    out.push(queue.at(-1).val);
    queue = queue.flatMap(n => [n.left, n.right].filter(Boolean));
  }
  return out;
}
function zigzag(root) {
  const out = [];
  let queue = root ? [root] : [], leftToRight = true;
  while (queue.length) {
    const vals = queue.map(n => n.val);
    out.push(leftToRight ? vals : vals.reverse());
    leftToRight = !leftToRight;
    queue = queue.flatMap(n => [n.left, n.right].filter(Boolean));
  }
  return out;
}
console.log(rightSideView(node(1, node(2, null, node(5)), node(3, null, node(4))))); // [1, 3, 4]
console.log(rightSideView(node(1, node(2, node(4)), node(3)))); // [1, 3, 4]
console.log(zigzag(node(3, node(9), node(20, node(15), node(7))))); // [[3], [20, 9], [15, 7]]
console.log(rightSideView(null)); // []
// O(n) time, O(w) space`,
          flag: "script",
          deep: {
            why: "BFS هو الطريقة الطبيعية لأي سؤال فيه «مستوى» أو «أقرب»: أقرب leaf للـ root، وعرض الشجرة في UI على شكل طبقات (org chart مثلًا)، وأقصر طريق في grid أو graph (هنشوفه في درس «shortest path in grid (BFS)»). ونفس الكود ده بالظبط هو اللي بيتعمل على الـ graphs بعد ما تضيف Set للعقد اللي اتزارت.",
            how: R`dry run: [[queue = [3]]]. سجّل [3]. الأولاد: 9 و 20، فـ [[queue = [9, 20]]].

سجّل [9, 20]. أولاد 9 مفيش، وأولاد 20 هما 15 و 7، فـ [[queue = [15, 7]]].

سجّل [15, 7]. مفيش أولاد، [[queue = []]]، والـ loop يقف.

ليه BFS بيلاقي «الأقرب» الأول؟ لأنه بيخلّص كل العقد اللي على مسافة 1 قبل أي عقدة على مسافة 2. فأول مرة تقابل الحاجة اللي بتدوّر عليها، دي أقرب واحدة أكيد. DFS ممكن ينزل فرع عميق جدًا الأول.

الذاكرة: DFS بياخد [[O(h)]] (طول المسار)، و BFS بياخد [[O(w)]] (عرض أوسع مستوى). في شجرة كاملة آخر مستوى فيه حوالي نص العقد، فـ BFS بياخد ذاكرة أكتر. في شجرة شكلها خط العكس.

ولو عايز queue حقيقية من غير array لكل مستوى: استخدم array ومؤشر [[head]] بيتقدّم بدل [[shift]]، زي ما هنعمل في الـ graphs.`,
            when: "BFS: «مستوى مستوى»، و «أقل عدد خطوات»، و «أقرب»، و «أول مستوى فيه كذا». DFS: «كل المسارات»، و «هل فيه مسار»، والحاجات اللي بتعتمد على نتيجة الأولاد. ولو الاتنين ينفعوا (زي عدّ العقد)، DFS كوده أقصر.",
            mistakes: R`[[queue.shift()]] في loop على مليون عقدة بتقلب الحل [[O(n^2)]]. وإنك تسجّل المستوى بعد ما تبدأ تضيف أولاده في نفس الـ array، فالمستويات تتخلط؛ عشان كده بنبني [[next]] لوحدها (أو نحفظ [[queue.length]] قبل الـ loop الداخلي). وإنك تنسى [[if (!root) return []]] فتحط null في الـ queue وتقرا [[null.val]].`
          },
          lines: [
            "دالة صغيرة بتعمل عقدة: object فيه القيمة والابنين.",
            "نفس الشجرة اللي في الرسمة.",
            "BFS بترجّع array فيها array لكل مستوى.",
            "شجرة فاضية: مفيش مستويات.",
            "الناتج.",
            "الـ queue فيها المستوى الحالي، وأول مستوى هو الـ root لوحده.",
            "طول ما فيه مستوى نشتغل عليه.",
            "سجّل قيم المستوى ده كله.",
            "هنا هنجمّع المستوى الجاي.",
            "عدّي على كل عقدة في المستوى الحالي.",
            "ضيف ابنها الشمال لو موجود.",
            "وبعده اليمين، عشان الترتيب يفضل من الشمال لليمين.",
            "قفلة الـ for.",
            "المستوى الجاي بقى هو الحالي.",
            "قفلة الـ while.",
            "رجّع كل المستويات.",
            "قفلة.",
            "٣ مستويات.",
            "عقدة واحدة: مستوى واحد.",
            "فاضية."
          ],
          check: {
            lang: "js",
            starter: R`function rightSideView(root) {
  // نفس levelOrder، بس سجّل آخر عقدة في كل مستوى
  return [];
}
function zigzag(root) {
  // flag بيتقلب كل مستوى، ولو true اعكس القيم
  return [];
}`,
            tests: R`const node = (val, left = null, right = null) => ({ val, left, right });
test("node(1, node(2, null, node(5)), node(3, null, node(4))) ← [1, 3, 4]", () => expect(rightSideView(node(1, node(2, null, node(5)), node(3, null, node(4))))).toEqual([1, 3, 4]));
test("فرع شمال أطول: node(1, node(2, node(4)), node(3)) ← [1, 3, 4] (4 باينة من اليمين)", () => expect(rightSideView(node(1, node(2, node(4)), node(3)))).toEqual([1, 3, 4]));
test("null ← [] في الاتنين", () => expect([rightSideView(null), zigzag(null)]).toEqual([[], []]));
test("zigzag للشجرة 3 / 9 20 / 15 7 ← [[3], [20, 9], [15, 7]]", () => expect(zigzag(node(3, node(9), node(20, node(15), node(7))))).toEqual([[3], [20, 9], [15, 7]]));
test("zigzag ٤ مستويات", () => {
  const t = node(1, node(2, node(4, node(8)), node(5)), node(3, node(6), node(7)));
  expect(zigzag(t)).toEqual([[1], [3, 2], [4, 5, 6, 7], [8]]);
});`,
            solution: R`function levels(root) {
  const out = [];
  let queue = root ? [root] : [];
  while (queue.length) {
    out.push(queue.map(n => n.val));
    const next = [];
    for (const n of queue) {
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    queue = next;
  }
  return out;
}
function rightSideView(root) {
  return levels(root).map(level => level.at(-1));
}
function zigzag(root) {
  return levels(root).map((level, i) => (i % 2 ? level.reverse() : level));
}`
          }
        },
        {
          cmd: "max depth",
          title: "الشجرة عمقها كام؟ وليه min depth فيها فخ؟",
          desc: R`max depth = عدد العقد في أطول مسار من الـ root لأي leaf. الحل سطر واحد بالـ recursion: عمق شجرة = 1 + الأكبر بين عمق الشمال وعمق اليمين، والشجرة الفاضية عمقها 0.

ده post-order: العقدة مش بتعرف إجابتها غير لما أولادها يرجّعوا إجابتهم. ونفس الشكل ده بيحل مسائل كتير: عدد العقد، ومجموع القيم، والقطر (diameter)، وهل الشجرة متوازنة.

min depth شكلها نفس الحكاية بـ [[Math.min]]، بس فيها فخ: لو العقدة ليها ابن واحد بس، الفرع الفاضي عمقه 0، و [[Math.min]] هتختاره. لكن الفرع الفاضي مش leaf، فالمسار ده مش مسار أصلًا. لازم تتعامل مع حالة الابن الواحد لوحدها.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
const root = node(3, node(9), node(20, node(15), node(7)));
const maxDepth = n => (n ? 1 + Math.max(maxDepth(n.left), maxDepth(n.right)) : 0);
function minDepth(n) {
  if (!n) return 0;
  if (!n.left) return 1 + minDepth(n.right);
  if (!n.right) return 1 + minDepth(n.left);
  return 1 + Math.min(minDepth(n.left), minDepth(n.right));
}
const chain = node(1, null, node(2, null, node(3)));
const wrongMin = n => (n ? 1 + Math.min(wrongMin(n.left), wrongMin(n.right)) : 0);
console.log(maxDepth(root), minDepth(root)); // 3 2
console.log(maxDepth(chain), minDepth(chain)); // 3 3
console.log(wrongMin(chain)); // 1
console.log(maxDepth(null)); // 0
// O(n) time, O(h) stack: h is about log n if balanced, n if the tree is a chain`,
          try: R`حل «Diameter of Binary Tree»: أطول مسار بين أي عقدتين (بعدد الـ edges، ومش لازم يعدّي على الـ root). للشجرة [[node(1, node(2, node(4), node(5)), node(3))]] الإجابة 3 (من 4 لـ 2 لـ 1 لـ 3). وبعدين «Balanced Binary Tree»: الشجرة متوازنة لو فرق العمق بين الشمال واليمين عند كل عقدة ≤ 1. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[diameter(root)]] و [[isBalanced(root)]]، الاتنين في لفة واحدة [[O(n)]].`,
          sol: R`diameter: عند كل عقدة، أطول مسار بيعدّي عليها = عمق الشمال + عمق اليمين. فاكتب دالة عمق عادية، وجوّاها حدّث متغير [[best]] بـ [[left + right]]. الإجابة 3 للشجرة اللي في السؤال، و 0 لعقدة لوحدها.

الغلطة الشائعة: ترجّع [[maxDepth(root.left) + maxDepth(root.right)]] للـ root بس. ده غلط لما أطول مسار يبقى كله جوه فرع واحد، زي فرع شمال عميق فيه فرعين طوال. وغلطة تانية: تنادي [[maxDepth]] من جوه loop على كل العقد فتبقى [[O(n^2)]] بدل [[O(n)]].

balanced: نفس الفكرة، الدالة ترجّع العمق، ولو لقت فرق أكبر من 1 ترجّع [[-1]] كإشارة إن الشجرة مش متوازنة وكل اللي فوقها يرجّع [[-1]] على طول. [[O(n)]] في لفة واحدة. السلسلة [[1 → 2 → 3]] مش متوازنة.`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function diameter(root) {
  let best = 0;
  const depth = n => {
    if (!n) return 0;
    const l = depth(n.left), r = depth(n.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  };
  depth(root);
  return best;
}
function isBalanced(root) {
  const height = n => {
    if (!n) return 0;
    const l = height(n.left), r = height(n.right);
    if (l === -1 || r === -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return height(root) !== -1;
}
console.log(diameter(node(1, node(2, node(4), node(5)), node(3)))); // 3
console.log(diameter(node(1))); // 0
console.log(isBalanced(node(3, node(9), node(20, node(15), node(7))))); // true
console.log(isBalanced(node(1, null, node(2, null, node(3))))); // false
// both O(n) time, O(h) stack`,
          flag: "script",
          deep: {
            why: "«الشجرة عمقها كام» سؤال بيتسأل في أول ٥ دقايق من انترفيو كتير عشان يشوفوا هل بتفكر recursive. وفي الشغل: عمق الـ nesting في JSON (فيه APIs بترفض body أعمق من حد معين عشان تحمي نفسها)، وعمق شجرة الكومنتات قبل ما تقرر تعرض «اعرض ردود أكتر».",
            how: R`اسأل نفسك سؤال واحد: «لو أولادي رجّعولي إجابتهم، أحسب إجابتي إزاي؟». عمق الشمال 1 (9 لوحدها) وعمق اليمين 2 (20 وتحتها 15)، فعمقي 1 + 2 = 3. وبعدين حدّد الـ base case: الفرع الفاضي عمقه 0.

فخ min depth على [[chain]] (1 وتحته 2 يمين وتحته 3 يمين): [[wrongMin]] عند 1 بتشوف الشمال null عمقه 0، و [[Math.min(0, ...)]] = 0، فترجّع 1. بس 1 مش leaf، ليها ابن. أقرب leaf هي 3 على عمق 3. عشان كده السطرين [[if (!n.left)]] و [[if (!n.right)]] بيقولوا: لو فيه ابن واحد بس، الإجابة لازم تعدّي عليه.

min depth ممكن تتحل بـ BFS أسرع: أول leaf تقابلها في BFS هي الأقرب، فتقف من غير ما تزور باقي الشجرة. في شجرة كبيرة فيها leaf قريبة ده فرق كبير.`,
            when: "أي خاصية للشجرة كلها بتتبني من خواص الفروع: العمق، والعدد، والمجموع، والتوازن، والقطر، و «Path Sum». لو الإجابة بتعتمد على اللي فوق (زي «المسار من الـ root لحد هنا»)، ابعت المعلومة نازلة كـ argument بدل ما ترجّعها طالعة.",
            mistakes: R`فخ min depth اللي فوق هو الأشهر. وإنك ترجّع 1 للشجرة الفاضية بدل 0. وإنك تخلط بين العمق بعدد العقد وبعدد الـ edges (LeetCode بيعدّ العقد في max depth، والـ edges في diameter)، فاسأل. وفي الانترفيو قول الـ space صح: [[O(h)]] مش [[O(1)]]، لأن الـ recursion بتاخد stack.`
          },
          lines: [
            "نفس دالة العقدة.",
            "شجرة عمقها 3 (3 ثم 20 ثم 15).",
            "العمق = 1 + الأعمق من الفرعين، والفاضي 0.",
            "min depth محتاجة شغل زيادة.",
            "فاضي: 0.",
            "مفيش شمال: المسار لازم يروح يمين.",
            "مفيش يمين: لازم يروح شمال.",
            "الاتنين موجودين: خد الأقصر.",
            "قفلة.",
            "سلسلة: 1 ثم 2 ثم 3، كلها يمين.",
            "النسخة الغلط اللي بتستخدم Math.min على طول.",
            "أقصى عمق 3، وأقرب leaf (9) على عمق 2.",
            "في السلسلة الاتنين 3، لأن فيه leaf واحدة بس.",
            "النسخة الغلط بتقول 1، لأنها اعتبرت الشمال الفاضي مسار.",
            "شجرة فاضية."
          ],
          check: {
            lang: "js",
            starter: R`function diameter(root) {
  let best = 0;
  // دالة عمق عادية، وجوّاها best = max(best, left + right)
  return best;
}
function isBalanced(root) {
  // الدالة ترجّع العمق، أو -1 لو لقت فرق أكبر من 1
}`,
            tests: R`const node = (val, left = null, right = null) => ({ val, left, right });
test("node(1, node(2, node(4), node(5)), node(3)) ← 3", () => expect(diameter(node(1, node(2, node(4), node(5)), node(3)))).toBe(3));
test("عقدة لوحدها ← 0، و null ← 0", () => expect([diameter(node(1)), diameter(null)]).toEqual([0, 0]));
test("أطول مسار جوه فرع واحد ومش بيعدّي على الـ root ← 6", () => {
  const t = node(1, node(2, node(3, node(4, node(5))), node(6, null, node(7, null, node(8)))));
  expect(diameter(t)).toBe(6);
});
test("isBalanced: 3 / 9 20 / 15 7 ← true", () => expect(isBalanced(node(3, node(9), node(20, node(15), node(7))))).toBe(true));
test("سلسلة 1 → 2 → 3 ← false، و null ← true", () => expect([isBalanced(node(1, node(2, node(3)))), isBalanced(null)]).toEqual([false, true]));
test("الـ root متوازن بس فيه عقدة جوه مش متوازنة ← false", () => {
  const t = node(1, node(2, node(3, node(4))), node(5, null, node(6, null, node(7))));
  expect(isBalanced(t)).toBe(false);
});
test("شجرة متوازنة فيها 65535 عقدة (O(n)، مش maxDepth عند كل عقدة)", () => {
  const build = d => (d === 0 ? null : node(d, build(d - 1), build(d - 1)));
  const t = build(16);
  expect([isBalanced(t), diameter(t)]).toEqual([true, 30]);
});`,
            solution: R`function diameter(root) {
  let best = 0;
  const depth = n => {
    if (!n) return 0;
    const l = depth(n.left), r = depth(n.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  };
  depth(root);
  return best;
}
function isBalanced(root) {
  const h = n => {
    if (!n) return 0;
    const l = h(n.left);
    if (l === -1) return -1;
    const r = h(n.right);
    if (r === -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return h(root) !== -1;
}`
          }
        },
        {
          cmd: "validate BST",
          title: "الشجرة دي BST ولا لأ؟ ليه مقارنة العقدة بأولادها مش كفاية؟",
          desc: R`BST (binary search tree): كل القيم في الفرع الشمال أصغر من العقدة، وكل القيم في الفرع اليمين أكبر منها. الشرط ده على الفرع كله، مش على الابن المباشر بس.

الحل الصح: كل عقدة ليها range مسموح [[(low, high)]]. الـ root مسموحلها أي حاجة. لما تنزل شمال، الحد الأعلى بقى قيمة العقدة. ولما تنزل يمين، الحد الأدنى بقى قيمة العقدة. لو أي عقدة طلعت برّا الـ range بتاعها، الشجرة مش BST.

الفخ: [[naive]] في المثال بتقارن كل عقدة بأولادها المباشرين بس. الشجرة [[trap]] فيها 4 في الفرع اليمين تحت 8: 4 أصغر من 8 فمقبولة كابن شمال، بس هي في يمين 5، فلازم تبقى أكبر من 5.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
function isValidBST(n, low = -Infinity, high = Infinity) {
  if (!n) return true;
  if (n.val <= low || n.val >= high) return false;
  return isValidBST(n.left, low, n.val) && isValidBST(n.right, n.val, high);
}
const naive = n => !n || ((!n.left || n.left.val < n.val) && (!n.right || n.right.val > n.val) && naive(n.left) && naive(n.right));
//     5              5
//    / \            / \
//   3   8          3   8
//  / \ / \            / \
// 2  4 7  9          4   9
const good = node(5, node(3, node(2), node(4)), node(8, node(7), node(9)));
const trap = node(5, node(3), node(8, node(4), node(9)));
console.log(isValidBST(good), isValidBST(trap)); // true false
console.log(naive(trap)); // true
console.log(isValidBST(node(2, node(2)))); // false
console.log(isValidBST(null)); // true
// O(n) time, O(h) space`,
          try: R`حلها بطريقة تانية: in-order traversal لـ BST لازم يطلّع قيم متزايدة بشكل صارم. امشي in-order واحفظ القيمة اللي قبلك، ولو لقيت قيمة ≤ اللي قبلها يبقى مش BST. وبعدين حل «Kth Smallest Element in a BST» بنفس المشية: وقف عند العقدة رقم k. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[isValidInorder(root)]] بالـ in-order، و [[kthSmallest(root, k)]].`,
          sol: R`الناتج: [[true]] لـ [[good]]، و [[false]] لـ [[trap]] (الـ in-order بيطلّع 3 5 4 8 9، و 4 بعد 5)، و [[false]] لـ [[node(2, node(2))]] لأن التكرار مش مسموح.

الـ prev لازم يبدأ بـ [[-Infinity]] (أو null مع شرط)، مش 0، لأن الشجرة ممكن يبقى فيها أرقام سالبة. ولازم يبقى متغير برّا الدالة الـ recursive (closure) عشان يفضل محفوظ بين النداءات.

kth smallest: عدّاد بيزيد مع كل عقدة بتتسجّل في الـ in-order، ولما يوصل k احفظ القيمة ووقّف. لـ [[good]] و k = 3 الإجابة 4 (الترتيب 2 3 4 5 7 8 9). الـ Big-O [[O(h + k)]] لأنك بتقف بدري.`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function isValidInorder(root) {
  let prev = -Infinity, ok = true;
  const walk = n => {
    if (!n || !ok) return;
    walk(n.left);
    if (n.val <= prev) ok = false;
    prev = n.val;
    walk(n.right);
  };
  walk(root);
  return ok;
}
function kthSmallest(root, k) {
  let count = 0, answer = null;
  const walk = n => {
    if (!n || answer !== null) return;
    walk(n.left);
    if (++count === k) answer = n.val;
    walk(n.right);
  };
  walk(root);
  return answer;
}
const good = node(5, node(3, node(2), node(4)), node(8, node(7), node(9)));
const trap = node(5, node(3), node(8, node(4), node(9)));
console.log(isValidInorder(good), isValidInorder(trap)); // true false
console.log(isValidInorder(node(2, node(2)))); // false
console.log(kthSmallest(good, 3), kthSmallest(good, 7)); // 4 9
// validate: O(n) time; kth smallest: O(h + k) time; both O(h) stack`,
          flag: "script",
          deep: {
            why: "Validate BST من أشهر مسائل الانترفيو عشان فيها فخ: أغلب الناس بتكتب [[naive]] الأول. ومعرفة خاصية الـ BST مهمة في الشغل كمان، لأن الـ indexes في قواعد البيانات (B-tree) مبنية على نفس الفكرة: قيم مترتبة تقدر تدوّر فيها في [[O(log n)]] من غير ما تعدّي على كل حاجة.",
            how: R`dry run على [[trap]]: [[isValidBST(5, -∞, ∞)]]. الشمال: [[isValidBST(3, -∞, 5)]]، 3 جوه الـ range، ومفيش أولاد، true.

اليمين: [[isValidBST(8, 5, ∞)]]، 8 أكبر من 5، تمام. شمال 8: [[isValidBST(4, 5, 8)]]. 4 ≤ 5، برّا الـ range، false. خلصنا.

ليه [[-Infinity]] و [[Infinity]] كـ defaults؟ عشان الـ root ميبقاش عليه أي قيد، ومن غير if زيادة. ولو القيم ممكن تبقى أي حاجة (حتى [[Infinity]] نفسها)، استخدم null كـ «مفيش حد» وقارن بشرط.

ليه [[<=]] و [[>=]]؟ لأن في التعريف المعتاد التكرار مش مسموح. بعض المسائل بتسمح بالتكرار في جهة واحدة، فاسأل.

الـ [[&&]] بيعمل short-circuit: لو الشمال طلع false، اليمين مش هيتزار أصلًا.`,
            when: "أي مسألة بتقول BST خد منها ميزة: in-order مترتب، والدوَران بيمشي في فرع واحد بس ([[O(h)]] بدل [[O(n)]]). ده بيسهّل search و insert و kth smallest و LCA في BST و «Convert Sorted Array to BST». ولو المسألة بتقول binary tree بس، متفترضش إنها BST.",
            mistakes: R`[[naive]] (مقارنة بالأولاد المباشرين بس) هي الغلطة رقم واحد. وإنك تبدأ الحدود بـ [[Number.MIN_VALUE]]: ده أصغر رقم موجب (حوالي 5e-324) مش أصغر رقم، فأي قيمة سالبة هتترفض. وفي الـ in-order: تبدأ [[prev]] بـ 0 فالشجرة اللي فيها سالب تبان غلط. وفي الانترفيو اسأل: التكرار مسموح؟`
          },
          lines: [
            "نفس دالة العقدة.",
            "كل عقدة معاها الحدود المسموحة ليها، والـ root مفتوح من الناحيتين.",
            "فرع فاضي دايمًا صح.",
            "برّا الـ range (أو مساوية لحد): مش BST.",
            "الشمال سقفه قيمتي، واليمين أرضيته قيمتي، والاتنين لازم يبقوا صح.",
            "قفلة.",
            "النسخة الغلط: بتقارن بالأولاد المباشرين بس.",
            "شجرة سليمة.",
            "الفخ: 4 تحت 8 بس في يمين 5.",
            "الصح بيقول true للسليمة و false للفخ.",
            "النسخة الغلط اتضحك عليها.",
            "تكرار: 2 في شمال 2 مش مسموح.",
            "الشجرة الفاضية BST."
          ],
          check: {
            lang: "js",
            starter: R`function isValidInorder(root) {
  let prev = -Infinity;
  // امشي in-order، ولو قيمة <= prev يبقى مش BST
}
function kthSmallest(root, k) {
  // نفس المشية، ووقّف عند العقدة رقم k
}`,
            tests: R`const node = (val, left = null, right = null) => ({ val, left, right });
const good = node(5, node(3, node(2), node(4)), node(8, node(7), node(9)));
const trap = node(5, node(3), node(8, node(4), node(9)));
test("good ← true، و trap ← false (4 تحت 8 بس أصغر من 5)", () => expect([isValidInorder(good), isValidInorder(trap)]).toEqual([true, false]));
test("التكرار مش مسموح: node(2, node(2)) ← false", () => expect(isValidInorder(node(2, node(2)))).toBe(false));
test("أرقام سالبة: node(-5, node(-10)) ← true (prev يبدأ -Infinity مش 0)", () => expect(isValidInorder(node(-5, node(-10)))).toBe(true));
test("null ← true", () => expect(isValidInorder(null)).toBe(true));
test("prev بيبدأ من جديد مع كل نداء: trap وبعدين good", () => expect([isValidInorder(trap), isValidInorder(good)]).toEqual([false, true]));
test("kthSmallest(good, 3) ← 4، و k = 1 ← 2، و k = 7 ← 9", () => expect([kthSmallest(good, 3), kthSmallest(good, 1), kthSmallest(good, 7)]).toEqual([4, 2, 9]));`,
            solution: R`function isValidInorder(root) {
  let prev = -Infinity, ok = true;
  const walk = n => {
    if (!n || !ok) return;
    walk(n.left);
    if (n.val <= prev) ok = false;
    prev = n.val;
    walk(n.right);
  };
  walk(root);
  return ok;
}
function kthSmallest(root, k) {
  let count = 0, answer;
  const walk = n => {
    if (!n || count >= k) return;
    walk(n.left);
    if (++count === k) answer = n.val;
    walk(n.right);
  };
  walk(root);
  return answer;
}`
          }
        },
        {
          cmd: "lowest common ancestor",
          title: "أقرب جد مشترك لعقدتين في الشجرة (LCA)",
          desc: R`LCA لعقدتين p و q: أعمق عقدة الاتنين تحتها (والعقدة بتتحسب تحت نفسها). يعني لو q تحت p، الإجابة p نفسها.

الحل في binary tree عادية: اسأل كل فرع «لقيت p أو q عندك؟». لو الشمال لقى واحدة واليمين لقى التانية، يبقى أنا نقطة التفرّع، وأنا الإجابة. لو فرع واحد بس لقى حاجة، ارجع باللي لقاه لفوق.

والـ base case هو السر: لو أنا نفسي p أو q، ارجع بنفسي من غير ما تنزل. ليه؟ لو التانية تحتي، أنا الإجابة أصلًا. ولو مش تحتي، الجد اللي فوق هيلاقيها في الفرع التاني.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
//         3
//       /   \
//      5     1
//     / \   / \
//    6   2 0   8
//       / \
//      7   4
const n7 = node(7), n4 = node(4);
const n5 = node(5, node(6), node(2, n7, n4));
const n1 = node(1, node(0), node(8));
const root = node(3, n5, n1);
function lca(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lca(root.left, p, q);
  const right = lca(root.right, p, q);
  if (left && right) return root;
  return left || right;
}
console.log(lca(root, n5, n1).val); // 3
console.log(lca(root, n7, n4).val); // 2
console.log(lca(root, n5, n4).val); // 5
// O(n) time, O(h) space; assumes both p and q are in the tree`,
          try: R`حل «Lowest Common Ancestor of a Binary Search Tree»: في BST مش محتاج تزور الشجرة كلها. لو p و q الاتنين أصغر من العقدة، الإجابة في الشمال. لو الاتنين أكبر، في اليمين. غير كده، العقدة دي هي الإجابة. اكتبها بـ while loop من غير recursion، وجرّبها على BST فيها 6 و 2 و 8 و 0 و 4 و 7 و 9 و 3 و 5. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[lcaBST(root, p, q)]] بتاخد قيمتين وترجّع العقدة، بـ while loop.`,
          sol: R`على الـ BST [[6 → (2 → 0, 4 → 3, 5), (8 → 7, 9)]]: [[lca(2, 8)]] = 6 (واحد شمال وواحد يمين)، و [[lca(2, 4)]] = 2 (4 تحت 2)، و [[lca(3, 5)]] = 4.

الـ Big-O [[O(h)]] وقت و [[O(1)]] ذاكرة، لأنك بتنزل في مسار واحد بس ومن غير recursion. في BST متوازنة ده [[O(log n)]]، مقابل [[O(n)]] للحل العام.

الغلطة الشائعة: تكتب الشرط [[p < node && q > node]] بس وتنسى إن p ممكن تبقى أكبر من q، أو إن واحدة منهم ممكن تساوي العقدة نفسها. الشرط الصح هو اللي بيقول «لو الاتنين في نفس الناحية انزل، غير كده وقّف»، وده بيغطي كل الحالات.`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function lcaBST(root, p, q) {
  let cur = root;
  while (cur) {
    if (p < cur.val && q < cur.val) cur = cur.left;
    else if (p > cur.val && q > cur.val) cur = cur.right;
    else return cur.val;
  }
  return null;
}
const bst = node(6, node(2, node(0), node(4, node(3), node(5))), node(8, node(7), node(9)));
console.log(lcaBST(bst, 2, 8)); // 6
console.log(lcaBST(bst, 2, 4)); // 2
console.log(lcaBST(bst, 3, 5), lcaBST(bst, 5, 3)); // 4 4
console.log(lcaBST(bst, 7, 9)); // 8
// O(h) time, O(1) space`,
          flag: "script",
          deep: {
            why: "LCA بيبان في الشغل أكتر مما تتخيل: أقرب فولدر مشترك لملفين، وأقرب مدير مشترك لموظفين في org chart، وأقرب component مشترك في React لازم ترفع له الـ state عشان اتنين components يشاركوه (lifting state up هو LCA بالظبط). وهو سؤال انترفيو كلاسيكي بيختبر إنك فاهم إزاي النتايج بتطلع من الـ recursion.",
            how: R`dry run على [[lca(root, n7, n4)]]: من 3 ننزل شمال لـ 5، ومن 5 شمال لـ 6: مش p ولا q، وأولادها null، فترجع null.

من 5 يمين لـ 2، ومن 2 شمال لـ 7: هي p، ترجع نفسها. ومن 2 يمين لـ 4: هي q، ترجع نفسها. عند 2: الشمال واليمين الاتنين مش null، فترجع 2.

عند 5: الشمال null واليمين 2، فترجع 2. عند 3: الشمال 2، واليمين (فرع 1) رجّع null، فترجع 2. الإجابة 2.

[[lca(root, n5, n4)]]: من 3 ننزل لـ 5، ولقيناها p، فبنرجع على طول من غير ما ننزل لـ 4. الفرع اليمين null. فالإجابة 5، وده صح لأن 4 تحت 5.

المقارنة بـ [[===]] على العقد نفسها مش على القيم، لأن الشجرة العادية ممكن يبقى فيها قيم متكررة. ولو الـ nodes عندها [[parent]]، المسألة بتتحول لـ «أول نقطة التقاء بين قائمتين»، وتتحل بـ Set أو بمؤشرين.`,
            when: "الحل العام لأي binary tree. لو الشجرة BST استخدم الترتيب ([[O(h)]]). ولو هتسأل أسئلة LCA كتير على نفس الشجرة الكبيرة، فيه تقنيات تجهيز (binary lifting) بتخلّي كل سؤال [[O(log n)]]، ودي نادرًا ما تتسأل في انترفيو full-stack.",
            mistakes: R`إنك تفترض إن p و q موجودين من غير ما تسأل: لو q مش في الشجرة، الكود ده هيرجّع p وكإنها الإجابة. وإنك تقارن بالقيم ([[root.val === p.val]]) في شجرة فيها تكرار. وإنك تنزل تدوّر تحت p بعد ما لقيتها، فالكود يبقى أطول من غير فايدة. وفي BST: تنسى إن p ممكن تبقى أكبر من q.`
          },
          lines: [
            "نفس دالة العقدة.",
            "بنحفظ 7 و 4 في متغيرات عشان نسأل عليهم بالـ reference.",
            "فرع 5 كامل.",
            "فرع 1.",
            "الـ root.",
            "LCA لـ p و q تحت root.",
            "فاضي، أو أنا واحدة منهم: ارجع بنفسي.",
            "دوّر في الشمال.",
            "ودوّر في اليمين.",
            "واحدة في كل ناحية: أنا نقطة التفرّع.",
            "غير كده ارجع باللي اتلقى (أو null).",
            "قفلة.",
            "5 شمال و 1 يمين: الإجابة الـ root.",
            "7 و 4 أولاد 2.",
            "4 تحت 5، فـ 5 هي الإجابة."
          ],
          check: {
            lang: "js",
            starter: R`function lcaBST(root, p, q) {
  let n = root;
  // الاتنين أصغر؟ انزل شمال. الاتنين أكبر؟ انزل يمين. غير كده n هي الإجابة
  return n;
}`,
            tests: R`const node = (val, left = null, right = null) => ({ val, left, right });
const bst = node(6, node(2, node(0), node(4, node(3), node(5))), node(8, node(7), node(9)));
test("lca(2, 8) ← 6", () => expect(lcaBST(bst, 2, 8).val).toBe(6));
test("lca(2, 4) ← 2 (واحدة تحت التانية)", () => expect(lcaBST(bst, 2, 4).val).toBe(2));
test("lca(3, 5) ← 4، و lca(7, 9) ← 8", () => expect([lcaBST(bst, 3, 5).val, lcaBST(bst, 7, 9).val]).toEqual([4, 8]));
test("p أكبر من q: lca(8, 2) ← 6", () => expect(lcaBST(bst, 8, 2).val).toBe(6));
test("نفس القيمة: lca(0, 0) ← 0", () => expect(lcaBST(bst, 0, 0).val).toBe(0));
test("سلسلة عمقها ١٠٠ ألف: الـ while مبتستخدمش stack (O(h) وقت و O(1) ذاكرة)", () => {
  const root = node(0);
  let cur = root;
  for (let i = 1; i < 100000; i++) cur = cur.right = node(i);
  expect(lcaBST(root, 99998, 99999).val).toBe(99998);
});`,
            solution: R`function lcaBST(root, p, q) {
  let n = root;
  while (n) {
    if (p < n.val && q < n.val) n = n.left;
    else if (p > n.val && q > n.val) n = n.right;
    else return n;
  }
  return null;
}`
          }
        },
        {
          cmd: "walk nested JSON",
          title: "امشي على كومنتات متداخلة و JSON جوه JSON في كود حقيقي",
          desc: R`البيانات المتداخلة اللي بتقابلها كل يوم هي trees، حتى لو محدش سمّاها كده: كومنت عليه ردود عليها ردود، و JSON جاي من API جواه objects جوه arrays، و menu جوه menu، وشجرة فولدرات.

الفرق عن الـ binary tree: كل عقدة ليها عدد أولاد مش ثابت (array اسمها [[replies]] أو [[children]])، وفي الغالب عندك «غابة» (array فيها كذا root) مش root واحد. بس الحل هو نفسه: DFS بـ recursion، أو بـ stack لو العمق ممكن يكبر.

المثال فيه ٣ حاجات بتتعمل في كود حقيقي: [[flatten]] بتحوّل الشجرة لقائمة فيها العمق (عشان تعرضها بـ indentation في UI)، و [[count]] بتعدّ كل الكومنتات، و [[paths]] بتطلّع كل قيمة في JSON مع المسار بتاعها (مفيد في مقارنة config أو logging أو رسايل validation).`,
          example: R`const comments = [
  { id: 1, text: "Great post", replies: [
    { id: 2, text: "Agreed", replies: [
      { id: 3, text: "Same", replies: [] },
    ] },
  ] },
  { id: 4, text: "Typo in line 3", replies: [] },
];
function flatten(list, depth = 0, out = []) {
  for (const c of list) {
    out.push({ id: c.id, depth });
    flatten(c.replies, depth + 1, out);
  }
  return out;
}
const count = list => list.reduce((sum, c) => sum + 1 + count(c.replies), 0);
function paths(value, prefix = "$", out = []) {
  if (value !== null && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) paths(v, prefix + "." + k, out);
  } else out.push(prefix + " = " + JSON.stringify(value));
  return out;
}
console.log(flatten(comments).map(c => "-".repeat(c.depth) + c.id).join(" ")); // 1 -2 --3 4
console.log(count(comments)); // 4
console.log(paths({ user: { name: "Mona", tags: ["admin"] }, ok: true })); // ['$.user.name = "Mona"', '$.user.tags.0 = "admin"', '$.ok = true']
// O(n) time for n comments or values, O(depth) stack`,
          try: R`اكتب [[flattenIter]]: نفس [[flatten]] بس بـ stack صريح من غير recursion، ولازم يطلّع نفس الترتيب بالظبط. وبعدين ابني كومنت متداخل عمقه ١٠٠ ألف (كل كومنت رد على اللي قبله) بـ loop، وشوف [[flatten]] الـ recursive بتعمل إيه، و [[flattenIter]] بتعمل إيه. وكمان اكتب [[findPath(list, id)]] ترجّع الـ ids من الـ root لحد الكومنت ده. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[flattenIter(list)]] بترجّع [[{ id, depth }]] بنفس ترتيب [[flatten]]، و [[findPath(list, id)]].`,
          sol: R`[[flattenIter]]: حط الـ roots في الـ stack بالعكس (عشان أول واحد يطلع الأول)، ومع كل [[pop]] سجّل العقدة وحط ردودها بالعكس برضه مع [[depth + 1]]. الناتج لازم يبقى [[1 -2 --3 4]] زي النسخة الـ recursive. لو نسيت العكس هيطلع [[4 1 -2 --3]].

مع عمق ١٠٠ ألف: النسخة الـ recursive بتقع بـ [[RangeError: Maximum call stack size exceeded]] (الحد في Node حوالي ١٠ آلاف نداء، والرقم بيختلف حسب حجم الـ frame). والنسخة اللي بـ stack بتشتغل عادي لأن الـ array بتتخزن في الـ heap مش في الـ call stack.

[[findPath]]: DFS بيحط الـ id في [[path]] قبل ما ينزل ويشيله بعد ما يرجع (ده backtracking صغير)، ولما يلاقي الـ id يرجّع نسخة. [[findPath(comments, 3)]] = [[[1, 2, 3]]]، و id مش موجود = [[null]].

وخلي بالك: بناء كومنت عمقه ١٠٠ ألف لازم يبقى بـ loop، ولو عملت [[JSON.stringify]] عليه هيقع هو كمان لأنه recursive من جوه.`,
          solCode: R`function flatten(list, depth = 0, out = []) {
  for (const c of list) {
    out.push({ id: c.id, depth });
    flatten(c.replies, depth + 1, out);
  }
  return out;
}
function flattenIter(list) {
  const out = [];
  const stack = list.map(c => ({ c, depth: 0 })).reverse();
  while (stack.length) {
    const { c, depth } = stack.pop();
    out.push({ id: c.id, depth });
    for (let i = c.replies.length - 1; i >= 0; i--) stack.push({ c: c.replies[i], depth: depth + 1 });
  }
  return out;
}
function findPath(list, id, path = []) {
  for (const c of list) {
    path.push(c.id);
    if (c.id === id) return [...path];
    const found = findPath(c.replies, id, path);
    if (found) return found;
    path.pop();
  }
  return null;
}
const comments = [
  { id: 1, text: "Great post", replies: [{ id: 2, text: "Agreed", replies: [{ id: 3, text: "Same", replies: [] }] }] },
  { id: 4, text: "Typo in line 3", replies: [] },
];
const show = list => list.map(c => "-".repeat(c.depth) + c.id).join(" ");
console.log(show(flattenIter(comments))); // 1 -2 --3 4
console.log(findPath(comments, 3), findPath(comments, 99)); // [1, 2, 3] null
const deep = { id: 0, replies: [] };
let cur = deep;
for (let i = 1; i < 100000; i++) { const next = { id: i, replies: [] }; cur.replies.push(next); cur = next; }
try { flatten([deep]); } catch (e) { console.log(e.constructor.name); } // RangeError
console.log(flattenIter([deep]).length); // 100000
// flattenIter: O(n) time, O(n) worst-case stack in heap memory, no call-stack limit`,
          flag: "script",
          deep: {
            why: "ده المكان اللي الـ trees بتقابلك فيه في شغل الـ full-stack فعلًا: شاشة كومنتات فيها ردود (Reddit و GitHub)، و sidebar فيه أقسام جوه أقسام، و JSON راجع من API محتاج تدوّر فيه أو تنضّفه، وشجرة تصنيفات منتجات. لو فاهم DFS، كل ده بقى نفس الـ 5 سطور.",
            how: R`[[flatten]] هي pre-order: سجّل الكومنت، وبعدين انزل على ردوده بعمق + 1. الترتيب اللي بيطلع هو نفس الترتيب اللي بتعرض بيه الشاشة: الكومنت، وتحته ردوده بـ indentation، وبعدين الكومنت اللي بعده.

[[count]]: كل كومنت = 1 + عدد اللي تحته. وده post-order (لازم ردوده ترجع الأول). والـ [[reduce]] بيجمع على مستوى الإخوات.

[[paths]]: أي قيمة يا إما «ورقة» (string أو number أو boolean أو null) فنسجّلها، يا إما object أو array فننزل في كل key. [[typeof null === "object"]] في JavaScript، عشان كده الشرط [[value !== null]] لازم. والـ arrays بتطلع keys بتاعتها "0" و "1"، فالمسار [[$.user.tags.0]].

البيانات في الـ database في الغالب مش متخزّنة متداخلة: كل كومنت صف فيه [[parent_id]]. عشان تبني الشجرة: Map من id لكومنت، وبعدين لكل كومنت ضيفه في [[replies]] بتاع أبوه، [[O(n)]]. وفي SQL فيه [[WITH RECURSIVE]] بيعمل نفس المشية جوه الداتابيز (شوف «تاب SQL و Prisma»).`,
            when: "recursion عادية لما العمق محدود ومعروف (menu من ٣ مستويات، JSON من API مظبوط). stack صريح لما العمق جاي من المستخدم ومحدش حاطط له حد: كومنتات ممكن يتعمل عليها ردود لا نهائية، أو ملف JSON مرفوع. ولو عايز ترسم الكومنتات، في الغالب هتحط حد للعمق وتعرض «كمّل المحادثة» زي Reddit.",
            mistakes: R`[[typeof null]] بيطلع "object" فالكود بيقع على [[Object.entries(null)]]. وإنك تعدّل البيانات الأصلية وانت بتمشي عليها (مثلًا تمسح [[replies]])، والـ state في React لازم يفضل immutable. وإنك تنسى إن الـ recursion ليها حد: JSON عمقه عشرات الآلاف (سواء بالغلط أو هجوم متعمّد) هيوقع السيرفر لو بتمشي عليه recursive، عشان كده بعض الـ parsers بيحطوا حد للعمق. وفي الانترفيو، لو اتسألت «عندك كومنتات بـ parent_id، اعرضهم كشجرة»، ابدأ ببناء الـ Map.`
          },
          lines: [
            "array فيها كومنتات، وكل كومنت ليه replies.",
            "كومنت 1، والـ replies بتاعته مفتوحة.",
            "رد عليه (2)، وليه ردود.",
            "رد على الرد (3)، من غير ردود.",
            "قفلة ردود 2.",
            "قفلة ردود 1.",
            "كومنت تاني على نفس المستوى.",
            "قفلة الـ array.",
            "flatten: pre-order بيحفظ عمق كل كومنت.",
            "عدّي على الإخوات بالترتيب.",
            "سجّل الكومنت بعمقه.",
            "انزل على ردوده بعمق أكبر بواحد.",
            "قفلة الـ for.",
            "رجّع القائمة.",
            "قفلة.",
            "count: كل كومنت = 1 + عدد اللي تحته.",
            "paths: كل قيمة ومسارها.",
            "object أو array (مع استبعاد null): انزل.",
            "لكل key، ضيفه على المسار وانزل.",
            "قيمة عادية: سجّلها بالمسار.",
            "رجّع كل المسارات.",
            "قفلة.",
            "الشرطة = مستوى عمق، فبتشوف الشكل المتداخل.",
            "٤ كومنتات في كل المستويات.",
            "كل قيمة في الـ JSON ومسارها."
          ],
          check: {
            lang: "js",
            starter: R`function flattenIter(list) {
  const out = [];
  const stack = []; // [comment, depth]، والـ roots بالعكس
  return out;
}
function findPath(list, id) {
  const path = [];
  // DFS: push قبل ما تنزل و pop بعد ما ترجع
  return null;
}`,
            tests: R`const comments = [
  { id: 1, text: "Great post", replies: [
    { id: 2, text: "Agreed", replies: [{ id: 3, text: "Same", replies: [] }] },
  ] },
  { id: 4, text: "Typo in line 3", replies: [] },
];
test("flattenIter ← 1 -2 --3 4 (نفس ترتيب النسخة الـ recursive)", () => expect(flattenIter(comments)).toEqual([{ id: 1, depth: 0 }, { id: 2, depth: 1 }, { id: 3, depth: 2 }, { id: 4, depth: 0 }]));
test("[] ← []", () => expect(flattenIter([])).toEqual([]));
test("ردين على نفس الكومنت بيطلعوا بترتيبهم", () => {
  const c = [{ id: 1, replies: [{ id: 2, replies: [] }, { id: 3, replies: [] }] }];
  expect(flattenIter(c).map(x => x.id)).toEqual([1, 2, 3]);
});
test("findPath(comments, 3) ← [1, 2, 3]، و 4 ← [4]، و 99 ← null", () => expect([findPath(comments, 3), findPath(comments, 4), findPath(comments, 99)]).toEqual([[1, 2, 3], [4], null]));
test("كومنت متداخل عمقه ١٠٠ ألف: الـ recursion بتقع، الـ stack الصريح لأ", () => {
  const root = { id: 0, replies: [] };
  let cur = root;
  for (let i = 1; i < 100000; i++) { const c = { id: i, replies: [] }; cur.replies.push(c); cur = c; }
  const r = flattenIter([root]);
  expect([r.length, r.at(-1)]).toEqual([100000, { id: 99999, depth: 99999 }]);
});`,
            solution: R`function flattenIter(list) {
  const out = [];
  const stack = [];
  for (let i = list.length - 1; i >= 0; i--) stack.push([list[i], 0]);
  while (stack.length) {
    const [c, depth] = stack.pop();
    out.push({ id: c.id, depth });
    for (let i = c.replies.length - 1; i >= 0; i--) stack.push([c.replies[i], depth + 1]);
  }
  return out;
}
function findPath(list, id) {
  const path = [];
  const dfs = items => {
    for (const c of items) {
      path.push(c.id);
      if (c.id === id || dfs(c.replies)) return true;
      path.pop();
    }
    return false;
  };
  return dfs(list) ? [...path] : null;
}`
          }
        }
      ]
    }
]);
