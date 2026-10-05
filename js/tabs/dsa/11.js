// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "أدوات إضافية: union-find و Dijkstra و bits و LRU",
      l: 3,
      n: "بتتسأل أحيانًا: مجموعات بتتدمج، وأقصر طريق بأوزان، وحيل الـ XOR، و cache بيطرد الأقدم",
      items: [
        {
          cmd: "union-find",
          title: "مجموعات بتتدمج مع بعض: الاتنين دول في نفس المجموعة؟ (union-find)",
          desc: R`union-find (اسمه كمان disjoint set union أو DSU) بيدير مجموعات منفصلة وبيدّيك عمليتين:

[[find(x)]]: مين «رئيس» مجموعة x؟ عنصرين في نفس المجموعة لو ليهم نفس الرئيس.

[[union(a, b)]]: ادمج مجموعة a ومجموعة b.

كل مجموعة شجرة، وكل عنصر بيشاور على أبوه في [[parent]]، والرئيس بيشاور على نفسه. عشان الشجر ميبقاش طويل، فيه تحسينين:

path compression: وانت طالع من العنصر للرئيس، خلّي كل عنصر يشاور على جده (أو على الرئيس على طول)، فالمرة الجاية الطريق أقصر.

union by size: لما تدمج، خلّي الشجرة الصغيرة تحت الكبيرة، مش العكس.

مع الاتنين، كل عملية تقريبًا [[O(1)]] (رياضيًا [[O(α(n))]]، و α دالة بتكبر ببطء شديد لدرجة إنها أقل من 5 لأي n في الكون).

الفرق عن BFS/DFS: الـ BFS بيحتاج الـ graph كله جاهز. الـ union-find بيشتغل والـ edges بتيجي واحد واحد، وبيجاوب «متوصلين؟» بعد كل edge من غير ما تعيد المشي.`,
          example: R`class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
    this.count = n;
  }
  find(x) {
    while (this.parent[x] !== x) {
      const up = this.parent[x]; this.parent[x] = this.parent[up];
      x = this.parent[x];
    }
    return x;
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    this.count--;
    return true;
  }
}
const uf = new UnionFind(6);
uf.union(0, 1); uf.union(1, 2); uf.union(3, 4);
console.log(uf.count); // 3
console.log(uf.find(2) === uf.find(0), uf.find(3) === uf.find(5)); // true false
console.log(uf.union(0, 2), uf.count); // false 3
// find and union: amortized almost O(1) (inverse Ackermann) with path compression + union by size; O(n) space`,
          try: R`حل «Redundant Connection»: عندك شجرة من n عقدة (مترقمة من 1)، واتضاف عليها edge زيادة عمل دايرة. رجّع الـ edge ده (ولو فيه أكتر من إجابة، آخر واحد في الـ input). [[[[1,2],[1,3],[2,3]]]] الإجابة [[[2,3]]]، و [[[[1,2],[2,3],[3,4],[1,4],[1,5]]]] الإجابة [[[1,4]]]. وبعدين «Number of Provinces»: matrix فيها 1 لو المدينتين متوصلين، كام مجموعة؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[findRedundantConnection(edges)]] و [[findCircleNum(isConnected)]] (الـ UnionFind جاهز في المربع).`,
          sol: R`Redundant Connection: امشي على الـ edges بالترتيب واعمل [[union]]. أول edge [[union]] بتاعه يرجّع false (الطرفين أصلًا في نفس المجموعة) هو اللي عمل الدايرة. الإجابات [[[2,3]]] و [[[1,4]]].

الـ UnionFind لازم يبقى حجمه n + 1 لأن العقد بتبدأ من 1. لو عملته بحجم n، العقدة n هتبقى برّا الـ array، و [[parent[n]]] هتبقى undefined، والـ find هتلف للأبد أو ترجّع قيمة غلط.

Number of Provinces: لكل [[isConnected[i][j] === 1]] مع [[j > i]]، اعمل [[union(i, j)]]، والإجابة [[uf.count]]. [[[[1,1,0],[1,1,0],[0,0,1]]]] = 2، و [[[[1,0,0],[0,1,0],[0,0,1]]]] = 3.

ليه «آخر واحد في الـ input» بيطلع طبيعي؟ لأن الشجرة الأصلية + edge واحد = دايرة واحدة بالظبط، وأول edge بيقفلها وانت ماشي بالترتيب هو آخر edge منها في الـ input.`,
          solCode: R`class UnionFind {
  constructor(n) { this.parent = Array.from({ length: n }, (_, i) => i); this.count = n; }
  find(x) {
    while (this.parent[x] !== x) { this.parent[x] = this.parent[this.parent[x]]; x = this.parent[x]; }
    return x;
  }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    this.parent[rb] = ra;
    this.count--;
    return true;
  }
}
function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);
  for (const [a, b] of edges) if (!uf.union(a, b)) return [a, b];
  return null;
}
function findCircleNum(isConnected) {
  const uf = new UnionFind(isConnected.length);
  isConnected.forEach((row, i) => row.forEach((v, j) => { if (v && j > i) uf.union(i, j); }));
  return uf.count;
}
console.log(findRedundantConnection([[1, 2], [1, 3], [2, 3]])); // [2, 3]
console.log(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])); // [1, 4]
console.log(findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]), findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]])); // 2 3
// O(E × α(n)) time, O(n) space`,
          flag: "script",
          deep: {
            why: "union-find بيحل «مين مع مين» والبيانات بتيجي تدريجيًا: دمج حسابات المستخدمين المكررة (نفس الإيميل أو التليفون)، وتجميع الصور المتشابهة، والشبكات («السيرفرين دول متوصلين بعد ما الوصلة دي اتعملت؟»). وكمان هو قلب خوارزمية Kruskal لبناء أرخص شبكة توصّل كل النقط (minimum spanning tree).",
            how: R`في الأول كل عنصر لوحده: [[parent = [0, 1, 2, 3, 4, 5]]]، و count = 6.

[[union(0, 1)]]: رئيس 0 هو 0، ورئيس 1 هو 1. الحجمين متساويين، فـ 1 تبقى تحت 0: [[parent[1] = 0]]، و count = 5.

[[union(1, 2)]]: رئيس 1 هو 0 (حجمها 2)، ورئيس 2 هو 2 (حجمها 1). الصغيرة تحت الكبيرة: [[parent[2] = 0]]. count = 4.

[[union(3, 4)]]: count = 3. فالمجموعات {0, 1, 2} و {3, 4} و {5}.

[[union(0, 2)]]: الاتنين رئيسهم 0، فـ false ومفيش تغيير. ده بالظبط «الـ edge ده بيعمل دايرة».

الـ path compression هنا اسمها path halving: السطر اللي جوه الـ while في [[find]] بيخلّي كل عنصر يشاور على جده بدل أبوه وانت طالع. سطر واحد، ومن غير recursion، وبتدّي نفس الـ Big-O تقريبًا.`,
            when: "connected components والـ edges بتيجي واحد واحد، أو كشف دواير في undirected graph، أو Kruskal، أو «Accounts Merge». لو الـ graph ثابت ومحتاج تسأل مرة واحدة، BFS/DFS أبسط. ولو فيه «فصل» (edge بيتشال)، الـ union-find العادي مبيعرفش يعمل كده.",
            mistakes: R`نسيان إن [[find]] لازم ترجّع الرئيس مش الأب المباشر، فتقارن [[parent[a] === parent[b]]] وده غلط. ونسيان تحسين أو التانيين، فالشجرة تبقى خط والعمليات [[O(n)]]. والعقد اللي بتبدأ من 1 (حجم n + 1). و [[union]] على العناصر نفسها بدل رؤسائها ([[parent[b] = a]])، ودي بتقطع b من مجموعتها القديمة.`
          },
          lines: [
            "الـ class.",
            "n عنصر، كل واحد لوحده في الأول.",
            "كل عنصر أبوه نفسه (رئيس نفسه).",
            "حجم كل مجموعة (بيتحسب عند الرئيس بس).",
            "عدد المجموعات.",
            "قفلة الـ constructor.",
            "هات رئيس x.",
            "طول ما x مش الرئيس.",
            "path halving: خلّي x يشاور على جده.",
            "واطلع.",
            "قفلة.",
            "الرئيس.",
            "قفلة find.",
            "ادمج مجموعة a ومجموعة b.",
            "رئيس كل واحد.",
            "نفس المجموعة: مفيش دمج (والـ edge ده دايرة).",
            "خلّي ra هو الأكبر.",
            "الصغيرة تحت الكبيرة.",
            "حدّث الحجم.",
            "مجموعة أقل.",
            "اتدمجوا.",
            "قفلة union.",
            "قفلة الـ class.",
            "٦ عناصر.",
            "{0,1,2} و {3,4}.",
            "3 مجموعات (و 5 لوحدها).",
            "0 و 2 مع بعض، و 3 و 5 لأ.",
            "في نفس المجموعة أصلًا: false، والعدد ثابت."
          ],
          check: {
            lang: "js",
            starter: R`class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
    this.count = n;
  }
  find(x) {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]];
      x = this.parent[x];
    }
    return x;
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    this.count--;
    return true;
  }
}
function findRedundantConnection(edges) {
  // UnionFind بحجم n + 1 (العقد من 1)، وأول union بيرجّع false هو الإجابة
}
function findCircleNum(isConnected) {
  return 0;
}`,
            tests: R`test("[[1,2],[1,3],[2,3]] ← [2,3]", () => expect(findRedundantConnection([[1, 2], [1, 3], [2, 3]])).toEqual([2, 3]));
test("[[1,2],[2,3],[3,4],[1,4],[1,5]] ← [1,4]", () => expect(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])).toEqual([1, 4]));
test("العقدة n موجودة (حجم n + 1): [[1,2],[2,3],[3,1]] ← [3,1]", () => expect(findRedundantConnection([[1, 2], [2, 3], [3, 1]])).toEqual([3, 1]));
test("findCircleNum: [[1,1,0],[1,1,0],[0,0,1]] ← 2", () => expect(findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]])).toBe(2));
test("كلهم لوحدهم ← 3", () => expect(findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]])).toBe(3));
test("سلسلة 20 ألف عقدة و edge زيادة في الآخر (تقريبًا O(1) لكل عملية)", () => {
  const edges = Array.from({ length: 19999 }, (_, i) => [i + 1, i + 2]);
  edges.push([1, 20000]);
  expect(findRedundantConnection(edges)).toEqual([1, 20000]);
});`,
            solution: R`class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
    this.count = n;
  }
  find(x) {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]];
      x = this.parent[x];
    }
    return x;
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    this.count--;
    return true;
  }
}
function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);
  for (const [a, b] of edges) if (!uf.union(a, b)) return [a, b];
  return null;
}
function findCircleNum(isConnected) {
  const n = isConnected.length, uf = new UnionFind(n);
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      if (isConnected[i][j] === 1) uf.union(i, j);
  return uf.count;
}`
          }
        },
        {
          cmd: "Dijkstra",
          title: "أقصر طريق لما كل طريق ليه وزن مختلف (Dijkstra)",
          desc: R`BFS بيلاقي أقصر طريق لما كل خطوة بـ 1. لو الطرق ليها أوزان (مسافات، أوقات، تكلفة)، الطريق اللي فيه خطوات أقل ممكن يبقى أطول.

Dijkstra: احفظ أحسن مسافة معروفة لكل عقدة، و min heap فيه [[[المسافة، العقدة]]]. كل مرة اسحب أقرب عقدة لسه ماخلصتش (ده الـ greedy: أقرب عقدة مسافتها نهائية ومش هتتحسن). ومنها، جرّب كل جار: لو المسافة من خلالها أقل من المعروفة، حدّثها وحطها في الـ heap.

ليه الأقرب مسافتها نهائية؟ لأن أي طريق تاني ليها لازم يعدّي على عقدة أبعد، والأوزان موجبة، فمش ممكن يبقى أقصر. وده سبب إن Dijkstra مبيشتغلش مع أوزان سالبة.

الـ heap من درس «min heap (by hand)» ([[require("./min-heap")]]). ومفيش «decrease key»: بنحط نسخة جديدة في الـ heap، ولما نسحب نسخة قديمة (مسافتها أكبر من المعروفة) نفوّتها.`,
          example: R`const { MinHeap } = require("./min-heap");
function dijkstra(graph, source) {
  const dist = new Map([[source, 0]]);
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, source]);
  while (heap.size) {
    const [d, u] = heap.pop();
    if (d > dist.get(u)) continue;
    for (const [v, w] of graph[u] ?? []) {
      const nd = d + w;
      if (nd < (dist.get(v) ?? Infinity)) {
        dist.set(v, nd);
        heap.push([nd, v]);
      }
    }
  }
  return dist;
}
const roads = {
  A: [["B", 4], ["C", 1]],
  C: [["B", 2], ["D", 5]],
  B: [["D", 1]],
};
console.log(Object.fromEntries(dijkstra(roads, "A"))); // { A: 0, B: 3, C: 1, D: 4 }
console.log(dijkstra(roads, "D").get("A")); // undefined
// O((V + E) log V) time with a binary heap, O(V + E) space; all weights must be >= 0`,
          try: R`حل «Network Delay Time»: n سيرفر مترقمين من 1، و times فيها [[[u, v, w]]] (رسالة من u لـ v بتاخد w)، وبتبعت من k. إمتى كل السيرفرات تستلم؟ ولو فيه سيرفر مش هيستلم أبدًا رجّع -1. [[times = [[2,1,1],[2,3,1],[3,4,1]]]] و n = 4 و k = 2 الإجابة 2. وبعدين خلّي [[dijkstra]] ترجّع الطريق نفسه من A لـ D (احفظ «جيت منين»). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[networkDelayTime(times, n, k)]] و [[path(graph, from, to)]] بترجّع نص زي [["A -> C -> B -> D (4)"]] أو null (الـ MinHeap جاهز في المربع).`,
          sol: R`Network Delay Time: شغّل Dijkstra من k، والإجابة أكبر مسافة بين كل السيرفرات. لو عدد السيرفرات اللي وصلتلها أقل من n، الإجابة -1. للمثال: من 2 لـ 1 و 3 بـ 1، ومن 3 لـ 4 بـ 1، فالمسافات 1 و 1 و 2، والإجابة 2. ولو k = 1 في نفس المثال، 1 مبتبعتش لحد، فـ -1.

الطريق: [[prev.set(v, u)]] جنب [[dist.set(v, nd)]]، وبعدين من D ارجع بالـ prev لحد A واعكس: [[A → C → B → D]] بطول 4. لاحظ إن الطريق المباشر A → B (4) أطول من A → C → B (3)، وده اللي BFS كان هيغلط فيه لأنه بيعدّ الخطوات.

الغلطة الشائعة: تحط العقدة في [[seen]] لما تدخل الـ heap زي BFS. في Dijkstra، العقدة ممكن تدخل الـ heap كذا مرة بمسافات بتتحسن، والنهائية بس هي اللي بتطلع الأول.`,
          solCode: R`const { MinHeap } = require("./min-heap");
function shortest(graph, source) {
  const dist = new Map([[source, 0]]), prev = new Map();
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, source]);
  while (heap.size) {
    const [d, u] = heap.pop();
    if (d > dist.get(u)) continue;
    for (const [v, w] of graph[u] ?? []) {
      if (d + w < (dist.get(v) ?? Infinity)) { dist.set(v, d + w); prev.set(v, u); heap.push([d + w, v]); }
    }
  }
  return { dist, prev };
}
function networkDelayTime(times, n, k) {
  const graph = {};
  for (const [u, v, w] of times) (graph[u] ??= []).push([v, w]);
  const { dist } = shortest(graph, k);
  return dist.size === n ? Math.max(...dist.values()) : -1;
}
function path(graph, from, to) {
  const { dist, prev } = shortest(graph, from);
  if (!dist.has(to)) return null;
  const out = [to];
  while (out[0] !== from) out.unshift(prev.get(out[0]));
  return out.join(" -> ") + " (" + dist.get(to) + ")";
}
console.log(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)); // 2
console.log(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 1)); // -1
console.log(path({ A: [["B", 4], ["C", 1]], C: [["B", 2], ["D", 5]], B: [["D", 1]] }, "A", "D")); // A -> C -> B -> D (4)
// O((V + E) log V) time, O(V + E) space`,
          flag: "script",
          deep: {
            why: "Dijkstra (أو نسخ متطورة منه زي A*) ورا خرايط جوجل وتطبيقات التوصيل، وورا بروتوكولات الـ routing في الإنترنت (OSPF). وفي الانترفيو بيتسأل أقل من BFS، بس لما تيجي مسألة «أقل تكلفة» أو «أقل وقت» بأوزان، لازم تعرف إن BFS مش كفاية.",
            how: R`dry run من A: الـ heap [[[0, A]]]. اسحب A (0): C بـ 1 و B بـ 4، الاتنين أحسن من Infinity، حطهم.

اسحب C (1، الأقرب): B من خلال C = 1 + 2 = 3 < 4، حدّث B لـ 3 وحط [3, B]. D = 1 + 5 = 6، حطها.

اسحب B (3): D من خلالها = 3 + 1 = 4 < 6، حدّث لـ 4.

اسحب [4, B] (النسخة القديمة): 4 > 3، فوّت. اسحب D (4): ملهاش جيران. اسحب [6, D]: 6 > 4، فوّت. خلصنا: A 0، و C 1، و B 3، و D 4.

الـ [[graph[u] ?? []]] عشان D مش key في الـ object (ملهاش طرق طالعة). و [[dist.get(v) ?? Infinity]] عشان العقدة اللي لسه ماوصلناهاش مش في الـ Map.

من D لـ A: مفيش طرق طالعة من D أصلًا، فـ [[dist]] فيها D بس، و [[get("A")]] بترجّع undefined (مش متوصلة).`,
            when: "أقصر طريق من مصدر واحد، والأوزان موجبة أو صفر. الأوزان كلها 1: BFS أبسط وأسرع. فيه أوزان سالبة: Bellman-Ford ([[O(V × E)]]). أقصر طريق بين كل الأزواج في graph صغير: Floyd-Warshall ([[O(V^3)]]). ولو عندك تقدير للمسافة للهدف (زي المسافة المستقيمة على الخريطة)، A* بيوصل أسرع.",
            mistakes: R`استخدام BFS مع أوزان. ونسيان سطر [[if (d > dist.get(u)) continue]]: الكود بيفضل صح بس بيعيد شغل على نسخ قديمة. واستخدام Dijkstra مع أوزان سالبة (بيطلّع إجابة غلط من غير أي error). والـ heap بـ sort بعد كل push. وفي الانترفيو: قول الـ Big-O صح [[O((V + E) log V)]]، واذكر إن الـ greedy هنا صح بسبب إن الأوزان مش سالبة.`
          },
          lines: [
            "الـ heap من ملف min-heap.js.",
            "أقصر مسافة من source لكل عقدة.",
            "أحسن مسافة معروفة، والمصدر 0.",
            "heap على [المسافة، العقدة]، والأقرب يطلع الأول.",
            "ابدأ بالمصدر.",
            "طول ما فيه عقد.",
            "أقرب واحدة.",
            "نسخة قديمة (لقينا أحسن منها بعد ما اتحطت): فوّت.",
            "لكل طريق طالع [الجار، الوزن].",
            "المسافة للجار من خلالي.",
            "أحسن من المعروفة؟",
            "حدّثها.",
            "وحط النسخة الجديدة في الـ heap.",
            "قفلة الـ if.",
            "قفلة الـ for.",
            "قفلة الـ while.",
            "كل المسافات.",
            "قفلة.",
            "الطرق: من كل مدينة لـ [مدينة، مسافة].",
            "A لـ B بـ 4، و A لـ C بـ 1.",
            "C لـ B بـ 2، و C لـ D بـ 5.",
            "B لـ D بـ 1.",
            "قفلة.",
            "B بـ 3 (من خلال C) مش 4، و D بـ 4.",
            "مفيش طرق طالعة من D: A مش متوصلة."
          ],
          check: {
            lang: "js",
            starter: R`// الـ MinHeap من درس «min heap (by hand)» جاهز هنا تستخدمه
class MinHeap {
  constructor(compare = (a, b) => a - b) { this.data = []; this.compare = compare; }
  get size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(value) {
    const d = this.data;
    d.push(value);
    let i = d.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(d[i], d[p]) >= 0) break;
      [d[i], d[p]] = [d[p], d[i]];
      i = p;
    }
  }
  pop() {
    const d = this.data;
    if (d.length === 0) return undefined;
    const top = d[0], last = d.pop();
    if (d.length > 0) {
      d[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < d.length && this.compare(d[l], d[m]) < 0) m = l;
        if (r < d.length && this.compare(d[r], d[m]) < 0) m = r;
        if (m === i) break;
        [d[i], d[m]] = [d[m], d[i]];
        i = m;
      }
    }
    return top;
  }
}
function shortest(graph, source) {
  const dist = new Map([[source, 0]]), prev = new Map();
  // Dijkstra عادي، و prev.set(v, u) جنب dist.set
  return { dist, prev };
}
function networkDelayTime(times, n, k) {
  // ابني graph كـ object، والإجابة أكبر مسافة أو -1
  return -1;
}
function path(graph, from, to) {
  // ارجع من to بالـ prev لحد from
  return null;
}`,
            tests: R`const roads = { A: [["B", 4], ["C", 1]], C: [["B", 2], ["D", 5]], B: [["D", 1]] };
test("([[2,1,1],[2,3,1],[3,4,1]], 4, 2) ← 2", () => expect(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)).toBe(2));
test("نفس المثال من 1 ← -1 (1 مبتبعتش لحد)", () => expect(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 1)).toBe(-1));
test("الطريق المباشر أطول: ([[1,2,5],[1,3,1],[3,2,1]], 3, 1) ← 2", () => expect(networkDelayTime([[1, 2, 5], [1, 3, 1], [3, 2, 1]], 3, 1)).toBe(2));
test("path(A → D) ← 'A -> C -> B -> D (4)' مش A B D", () => expect(path(roads, "A", "D")).toBe("A -> C -> B -> D (4)"));
test("من D لـ A مفيش طريق ← null", () => expect(path(roads, "D", "A")).toBe(null));
test("شبكة 2000 سيرفر (O((V + E) log V))", () => {
  const times = [];
  for (let i = 1; i < 2000; i++) { times.push([i, i + 1, 1]); times.push([1, i + 1, 3000]); }
  expect(networkDelayTime(times, 2000, 1)).toBe(1999);
});`,
            solution: R`// الـ MinHeap من درس «min heap (by hand)» جاهز هنا تستخدمه
class MinHeap {
  constructor(compare = (a, b) => a - b) { this.data = []; this.compare = compare; }
  get size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(value) {
    const d = this.data;
    d.push(value);
    let i = d.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(d[i], d[p]) >= 0) break;
      [d[i], d[p]] = [d[p], d[i]];
      i = p;
    }
  }
  pop() {
    const d = this.data;
    if (d.length === 0) return undefined;
    const top = d[0], last = d.pop();
    if (d.length > 0) {
      d[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < d.length && this.compare(d[l], d[m]) < 0) m = l;
        if (r < d.length && this.compare(d[r], d[m]) < 0) m = r;
        if (m === i) break;
        [d[i], d[m]] = [d[m], d[i]];
        i = m;
      }
    }
    return top;
  }
}
function shortest(graph, source) {
  const dist = new Map([[source, 0]]), prev = new Map();
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, source]);
  while (heap.size) {
    const [d, u] = heap.pop();
    if (d > dist.get(u)) continue;
    for (const [v, w] of graph[u] ?? []) {
      if (d + w < (dist.get(v) ?? Infinity)) { dist.set(v, d + w); prev.set(v, u); heap.push([d + w, v]); }
    }
  }
  return { dist, prev };
}
function networkDelayTime(times, n, k) {
  const graph = {};
  for (const [u, v, w] of times) (graph[u] ??= []).push([v, w]);
  const { dist } = shortest(graph, k);
  return dist.size === n ? Math.max(...dist.values()) : -1;
}
function path(graph, from, to) {
  const { dist, prev } = shortest(graph, from);
  if (!dist.has(to)) return null;
  const out = [to];
  while (out[0] !== from) out.unshift(prev.get(out[0]));
  return out.join(" -> ") + " (" + dist.get(to) + ")";
}`
          }
        },
        {
          cmd: "bit manipulation (XOR)",
          title: "حيل الـ bits: الـ XOR بيلاقي الرقم الوحيد، و n & (n - 1) بيشيل آخر 1",
          desc: R`الأرقام جوه الجهاز bits، و JavaScript بتدّيك عمليات عليها: [[&]] (and)، و [[|]] (or)، و [[^]] (xor)، و [[~]] (not)، و [[<<]] و [[>>]] (إزاحة).

XOR ليه ٣ خواص بتعمل سحر: [[x ^ x = 0]]، و [[x ^ 0 = x]]، والترتيب مش بيفرق. فلو عملت XOR لكل الأرقام في array كل رقم فيها متكرر مرتين ما عدا واحد، الأزواج بتلغي بعض ويفضل الوحيد. [[O(n)]] وقت و [[O(1)]] ذاكرة، من غير Map.

[[n & (n - 1)]] بيشيل أيمن 1 في n. فـ «n قوة لـ 2؟» = [[n > 0 && (n & (n - 1)) === 0]] (قوى الـ 2 فيها 1 واحد بس). وعدّ الـ 1s: شيل واحد لحد ما n تبقى 0.

الـ flags: كل صلاحية bit ([[READ = 1]]، و [[WRITE = 2]]، و [[ADMIN = 4]]). [[|]] يجمعهم، و [[&]] يسأل «فيه الصلاحية دي؟». ده نفس الـ permissions في لينكس ([[chmod 755]]).

تحذير JavaScript: الـ bitwise بيحوّل الرقم لـ 32-bit بإشارة. [[2 ** 31 | 0]] بيطلع سالب، والأرقام أكبر من كده بتتقص. لو محتاج أكتر من 32 bit، استخدم BigInt.`,
          example: R`const single = nums => nums.reduce((acc, x) => acc ^ x, 0);
const missing = nums => nums.reduce((acc, x, i) => acc ^ x ^ (i + 1), 0);
const isPowerOfTwo = n => n > 0 && (n & (n - 1)) === 0;
function countBits(n) {
  let count = 0;
  while (n) { n &= n - 1; count++; }
  return count;
}
const READ = 1, WRITE = 2, ADMIN = 4;
const perms = READ | WRITE;
console.log(single([4, 1, 2, 1, 2])); // 4
console.log(missing([3, 0, 1])); // 2
console.log(isPowerOfTwo(64), isPowerOfTwo(12)); // true false
console.log(countBits(11), (11).toString(2)); // 3 1011
console.log((perms & WRITE) !== 0, (perms & ADMIN) !== 0); // true false
console.log(2 ** 31 | 0, 2n ** 40n); // -2147483648 1099511627776n
// single and missing: O(n) time, O(1) space; countBits: O(number of 1 bits)`,
          try: R`حل «Counting Bits»: array فيها عدد الـ 1s لكل رقم من 0 لـ n في [[O(n)]] (مش [[countBits]] لكل رقم). n = 5 الإجابة [[[0, 1, 1, 2, 1, 2]]]. (عدد الـ 1s في i = عدد الـ 1s في [[i >> 1]] + آخر bit في i.) وبعدين «Single Number III»: كل رقم متكرر مرتين ما عدا اتنين، هاتهم الاتنين في [[O(1)]] ذاكرة. [[[1, 2, 1, 3, 2, 5]]] الإجابة 3 و 5. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[countBitsUpTo(n)]] و [[singleNumberIII(nums)]] (بترجّع الرقمين من الأصغر للأكبر).`,
          sol: R`Counting Bits: [[dp[i] = dp[i >> 1] + (i & 1)]]. [[i >> 1]] هو i من غير آخر bit (أصغر من i، فمحسوب قبل كده)، و [[i & 1]] هو آخر bit. ده DP صغير. الناتج لـ 5: [[[0, 1, 1, 2, 1, 2]]].

Single Number III: الـ XOR للكل = [[a ^ b]] (الأزواج اتلغت)، ومش صفر لأن a ≠ b. أي bit فيه 1 في الناتج ده معناه إن a و b مختلفين فيه. خد أيمن bit بـ [[x & -x]]، وقسّم الأرقام لمجموعتين: اللي فيها الـ bit ده واللي مفيهاش. a في مجموعة و b في التانية، وكل زوج متكرر بيقع كله في نفس المجموعة. XOR لكل مجموعة لوحدها يطلّع a و b.

للمثال: [[3 ^ 5 = 6]] (110)، وأيمن bit هو 2 (010). اللي فيهم الـ bit ده: 2 و 3 و 2 → XOR = 3. الباقي: 1 و 1 و 5 → 5.

الغلطة الشائعة: تقارن [[(x & mask) === 1]] بدل [[!== 0]]. لو الـ mask مش 1، ناتج الـ & هو الـ mask نفسه (2 أو 4...) مش 1.`,
          solCode: R`function countBitsUpTo(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}
function singleNumberIII(nums) {
  const xor = nums.reduce((acc, x) => acc ^ x, 0);
  const bit = xor & -xor;
  let a = 0, b = 0;
  for (const x of nums) {
    if ((x & bit) !== 0) a ^= x;
    else b ^= x;
  }
  return [a, b].sort((p, q) => p - q);
}
console.log(countBitsUpTo(5)); // [0, 1, 1, 2, 1, 2]
console.log(singleNumberIII([1, 2, 1, 3, 2, 5])); // [3, 5]
console.log(singleNumberIII([-1, 0])); // [-1, 0]
// countBitsUpTo: O(n) time and space; singleNumberIII: O(n) time, O(1) space`,
          flag: "script",
          deep: {
            why: "في شغل الـ web، الـ bits بتظهر في: permission flags (Discord و Unix بيخزنوا الصلاحيات كـ bits)، و feature flags مضغوطة في رقم واحد، و hashing، و bloom filters، وضغط البيانات، و WebGL. وفي الانترفيو، Single Number و Missing Number و Number of 1 Bits مسائل Easy مشهورة، والـ XOR trick بيخلّي الحل سطر واحد.",
            how: R`single على [4, 1, 2, 1, 2]: [[0 ^ 4 = 4]]، [[4 ^ 1 = 5]]، [[5 ^ 2 = 7]]، [[7 ^ 1 = 6]]، [[6 ^ 2 = 4]]. الـ 1 والـ 2 لغوا بعض.

missing على [3, 0, 1] (أرقام من 0 لـ 3 وناقص واحد): XOR كل الأرقام اللي في الـ array مع كل الأرقام من 1 لـ n. الموجودين بيتلغوا مع نفسهم، ويفضل الناقص: [[3 ^ 1 ^ 0 ^ 2 ^ 1 ^ 3 = 2]].

countBits(11): 11 = 1011. [[1011 & 1010 = 1010]]، [[1010 & 1001 = 1000]]، [[1000 & 0111 = 0]]. ٣ خطوات = ٣ واحدات. ليه؟ [[n - 1]] بيقلب أيمن 1 لـ 0 وكل الأصفار اللي بعده لـ 1، فالـ & بيشيل الـ 1 ده بس.

[[(11).toString(2)]] بيطبع الرقم بالـ binary، و [[parseInt("1011", 2)]] العكس. مفيدين للـ debugging.

[[2 ** 31 | 0]]: 2^31 مش داخل في 32-bit بإشارة (أقصاه [[2^31 - 1]])، فبيلف ويبقى سالب. BigInt ([[2n ** 40n]]) مفيهوش الحد ده، والـ bitwise شغال عليه.`,
            when: "مسائل «كل حاجة متكررة ما عدا» (XOR)، والـ flags والـ masks، و «قوة لـ 2؟»، والـ subsets بالـ bitmask (n ≤ 20)، و DP على bitmask. في كود الشغل العادي، استخدم Set أو object من الـ booleans لو أوضح؛ الـ bits بتوفّر ذاكرة وسرعة بس بتصعّب القراية.",
            mistakes: R`نسيان إن الـ bitwise في JS بيقص لـ 32 bit (IDs كبيرة، و timestamps بالملّي ثانية). وأولوية العمليات: [[n & n - 1 === 0]] بتتقري [[n & ((n - 1) === 0)]]، فحط أقواس دايمًا. والخلط بين [[>>]] (بتحفظ الإشارة) و [[>>>]] (بتملى أصفار). و [[~~x]] أو [[x | 0]] كـ «تقريب» بيبوّظ الأرقام الكبيرة، استخدم [[Math.trunc]].`
          },
          lines: [
            "الـ XOR لكل الأرقام: الأزواج بتلغي بعض.",
            "XOR الأرقام مع 1 لـ n: الناقص بس اللي بيفضل.",
            "قوة لـ 2 = فيها 1 واحد بس.",
            "عدّ الـ 1s.",
            "العداد.",
            "شيل أيمن 1 وعدّ، لحد ما يخلصوا.",
            "رجّع.",
            "قفلة.",
            "كل صلاحية bit لوحدها.",
            "صلاحيتين مع بعض = 3 (011).",
            "4 هي الوحيدة.",
            "2 ناقصة من 0 لـ 3.",
            "64 = 1000000، و 12 = 1100.",
            "11 فيها ٣ واحدات.",
            "فيه WRITE، ومفيش ADMIN.",
            "2^31 بيلف لسالب في 32-bit، و BigInt مفيهوش حد."
          ],
          check: {
            lang: "js",
            starter: R`function countBitsUpTo(n) {
  const dp = new Array(n + 1).fill(0);
  // dp[i] = dp[i >> 1] + (i & 1)
  return dp;
}
function singleNumberIII(nums) {
  // XOR الكل = a ^ b، وخد أيمن bit بـ x & -x، وقسّم
  return [];
}`,
            tests: R`test("countBitsUpTo(5) ← [0, 1, 1, 2, 1, 2]", () => expect(countBitsUpTo(5)).toEqual([0, 1, 1, 2, 1, 2]));
test("countBitsUpTo(0) ← [0]", () => expect(countBitsUpTo(0)).toEqual([0]));
test("countBitsUpTo(100000): الطول 100001 وآخر رقم 6 (O(n))", () => {
  const r = countBitsUpTo(100000);
  expect([r.length, r[100000], r[65535]]).toEqual([100001, 6, 16]);
});
test("singleNumberIII([1, 2, 1, 3, 2, 5]) ← [3, 5]", () => expect(singleNumberIII([1, 2, 1, 3, 2, 5])).toEqual([3, 5]));
test("صفر وسالب: [-1, 0] ← [-1, 0]", () => expect(singleNumberIII([-1, 0])).toEqual([-1, 0]));
test("(x & mask) !== 0 مش === 1: [4, 6, 1, 1] ← [4, 6]", () => expect(singleNumberIII([4, 6, 1, 1])).toEqual([4, 6]));`,
            solution: R`function countBitsUpTo(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}
function singleNumberIII(nums) {
  const xor = nums.reduce((acc, x) => acc ^ x, 0);
  const bit = xor & -xor;
  let a = 0, b = 0;
  for (const x of nums) {
    if ((x & bit) !== 0) a ^= x;
    else b ^= x;
  }
  return [Math.min(a, b), Math.max(a, b)];
}`
          }
        },
        {
          cmd: "LRU cache (Map)",
          title: "cache حجمه محدود بيطرد اللي بقاله أطول وقت ماتستخدمش (LRU Cache)",
          desc: R`LRU (least recently used): لما الـ cache يتملي وعايز تضيف حاجة جديدة، اطرد اللي بقاله أطول وقت محدش لمسه. والمطلوب في الانترفيو: [[get]] و [[put]] الاتنين [[O(1)]].

الحل الكلاسيكي في أي لغة: hash map + doubly linked list. الـ map بتوصلك للعقدة في [[O(1)]]، والـ list بتحفظ الترتيب: الجديد في آخرها والقديم في أولها، وتقدر تشيل عقدة من النص في [[O(1)]].

في JavaScript فيه اختصار: الـ [[Map]] بتحفظ ترتيب الإضافة. فـ «استخدمت key» = امسحه وضيفه تاني (يروح للآخر). و «اطرد الأقدم» = أول key في الـ Map: [[map.keys().next().value]]. كل ده [[O(1)]] في المتوسط.

في الانترفيو قول الاختصار ده، بس اتوقع إنهم يقولولك «اعملها من غير ما تعتمد على ترتيب الـ Map»، فاعرف النسخة الكلاسيكية كمان (الـ try).`,
          example: R`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);
  }
}
const cache = new LRUCache(2);
cache.put(1, "one");
cache.put(2, "two");
console.log(cache.get(1)); // one
cache.put(3, "three");
console.log(cache.get(2), [...cache.map.keys()]); // -1 [1, 3]
cache.put(1, "ONE");
cache.put(4, "four");
console.log([...cache.map.entries()]); // [[1, 'ONE'], [4, 'four']]
// get and put: O(1) average; O(capacity) space`,
          try: R`اكتب [[LRUList]] بنفس الـ API من غير ما تعتمد على ترتيب الـ Map: Map من الـ key للعقدة، و doubly linked list فيها عقدتين وهميتين [[head]] و [[tail]] (عشان متعملش if للأطراف). محتاج دالتين صغيرين: [[remove(node)]] و [[addToEnd(node)]]. لازم تعدّي نفس السيناريو اللي في المثال وتطلّع نفس النتايج. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[LRUList]] بـ [[get]] و [[put]]، والاختبارات بتمشي على الـ list من [[head]] لـ [[tail]].`,
          sol: R`نفس الناتج: [[one]]، وبعدين [[-1]] و الترتيب [[1 3]]، وبعد ما [[put(1)]] و [[put(4)]]، الـ cache فيه 1 و 4 (الـ 3 اتطردت لأن 1 اتحدثت بعدها).

العقدة فيها [[key]] و [[value]] و [[prev]] و [[next]]. الـ key لازم يبقى في العقدة، عشان لما تطرد [[head.next]] تعرف تمسحه من الـ Map.

[[remove(node)]]: [[node.prev.next = node.next]] و [[node.next.prev = node.prev]]. [[addToEnd(node)]]: حطها بين [[tail.prev]] و [[tail]]. بالعقد الوهمية، مفيش ولا if في الدالتين.

get: لو موجود، remove و addToEnd ورجّع القيمة. put: لو موجود، حدّث القيمة وحرّكها للآخر. لو جديد، اعمل عقدة وضيفها، ولو الحجم عدّى، اطرد [[head.next]].

الغلطة الشائعة: singly linked list، فالـ remove من النص يبقى [[O(n)]] لأنك محتاج تلاقي اللي قبلها.`,
          solCode: R`class LRUList {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { prev: null, next: null };
    this.tail = { prev: this.head, next: null };
    this.head.next = this.tail;
  }
  remove(node) { node.prev.next = node.next; node.next.prev = node.prev; }
  addToEnd(node) {
    node.prev = this.tail.prev; node.next = this.tail;
    this.tail.prev.next = node; this.tail.prev = node;
  }
  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;
    this.remove(node); this.addToEnd(node);
    return node.value;
  }
  put(key, value) {
    let node = this.map.get(key);
    if (node) { node.value = value; this.remove(node); }
    else { node = { key, value }; this.map.set(key, node); }
    this.addToEnd(node);
    if (this.map.size > this.capacity) {
      const oldest = this.head.next;
      this.remove(oldest);
      this.map.delete(oldest.key);
    }
  }
  keys() { const out = []; for (let n = this.head.next; n !== this.tail; n = n.next) out.push(n.key); return out; }
}
const cache = new LRUList(2);
cache.put(1, "one"); cache.put(2, "two");
console.log(cache.get(1)); // one
cache.put(3, "three");
console.log(cache.get(2), cache.keys()); // -1 [1, 3]
cache.put(1, "ONE"); cache.put(4, "four");
console.log(cache.keys(), cache.get(1)); // [1, 4] ONE
// get and put: O(1); O(capacity) space`,
          flag: "script",
          deep: {
            why: "الـ LRU هو سياسة الطرد الأشهر: الـ browser cache، و [[maxmemory-policy allkeys-lru]] في Redis (Redis بيطبّق نسخة تقريبية بتاخد عينة)، ومكتبة [[lru-cache]] في npm اللي بتستخدمها أدوات كتير، و cache الصفحات في نظام التشغيل. و LRU Cache من أكتر مسائل «صمّم data structure» اللي بتتسأل في الانترفيو.",
            how: R`السيناريو: [[put(1)]] و [[put(2)]]: الترتيب 1 ثم 2. [[get(1)]]: امسح 1 وضيفه تاني، الترتيب 2 ثم 1 (1 بقى الأحدث). [[put(3)]]: الترتيب 2 و 1 و 3، والحجم 3 > 2، فاطرد أول key: 2. [[get(2)]] = -1.

[[put(1, "ONE")]]: 1 موجود، امسحه وضيفه بالقيمة الجديدة، الترتيب 3 ثم 1. [[put(4)]]: 3 و 1 و 4، اطرد 3. الباقي 1 و 4.

ليه [[delete]] ثم [[set]] في [[put]] حتى لو الـ key موجود؟ لأن [[set]] على key موجود بيغيّر القيمة بس ومش بيحرّكه للآخر. ده أكتر bug بيحصل في النسخة دي.

[[this.map.keys().next().value]]: [[keys()]] بترجّع iterator، و [[next()]] بتدّي أول عنصر من غير ما تعمل array. ده [[O(1)]]، عكس [[[...map.keys()][0]]] اللي بيعمل array كاملة ([[O(n)]]).`,
            when: "cache بحجم محدود والبيانات الحديثة غالبًا هتتطلب تاني: نتايج API، وصور، و query results، وملفات compiled. لو محتاج انتهاء بالوقت (TTL)، ضيف timestamp لكل entry. لو فيه حاجات بتتطلب كتير جدًا بس مش حديثة، LFU (الأقل استخدامًا) ممكن يبقى أحسن. وفي الـ production على أكتر من سيرفر، استخدم Redis بدل Map في الذاكرة (درس «cache-aside + TTL» في «تاب بناء مشروع كامل»).",
            mistakes: R`[[set]] على key موجود من غير [[delete]]، فالترتيب ميتحدثش. ونسيان إن [[get]] كمان بتحدّث الترتيب. وطرد الأقدم قبل ما تتأكد إن الـ key الجديد مش موجود أصلًا (فتطرد حاجة من غير داعي). وفي النسخة الكلاسيكية: نسيان تخزين الـ key في العقدة. وفي الـ production: cache في ذاكرة process واحدة مش بيتشارك بين السيرفرات، وبيضيع مع كل restart.`
          },
          lines: [
            "الـ cache.",
            "بياخد الحجم الأقصى.",
            "نحفظه.",
            "Map بتحفظ ترتيب الإضافة: الأقدم في الأول.",
            "قفلة.",
            "قراءة.",
            "مش موجود: -1 (زي ما LeetCode بيطلب).",
            "القيمة.",
            "امسحه.",
            "وضيفه تاني: بقى الأحدث.",
            "رجّع القيمة.",
            "قفلة get.",
            "كتابة.",
            "لو موجود امسحه الأول، عشان set لوحدها مش بتغيّر الترتيب.",
            "ضيفه في الآخر.",
            "عدّينا الحجم: اطرد أول key (الأقدم).",
            "قفلة put.",
            "قفلة الـ class.",
            "cache بيشيل عنصرين.",
            "ضيف 1.",
            "ضيف 2.",
            "قراءة 1 بتخليه الأحدث.",
            "ضيف 3: الأقدم دلوقتي 2، فيتطرد.",
            "2 اتطرد، والباقي 1 و 3.",
            "حدّث 1: بقى الأحدث.",
            "ضيف 4: الأقدم 3، فيتطرد.",
            "الباقي 1 بالقيمة الجديدة و 4."
          ],
          check: {
            lang: "js",
            starter: R`class LRUList {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key → node
    this.head = { prev: null, next: null };
    this.tail = { prev: this.head, next: null };
    this.head.next = this.tail;
  }
  remove(node) {}
  addToEnd(node) {}
  get(key) { return -1; }
  put(key, value) {}
}`,
            tests: R`const keys = c => { const out = []; for (let n = c.head.next; n && n !== c.tail; n = n.next) out.push(n.key); return out; };
test("put 1، put 2، get 1 ← 'one'", () => {
  const c = new LRUList(2);
  c.put(1, "one"); c.put(2, "two");
  expect(c.get(1)).toBe("one");
});
test("put 3 بتطرد 2 (1 اتقرت): get 2 ← -1، والترتيب من القديم للجديد [1, 3]", () => {
  const c = new LRUList(2);
  c.put(1, "one"); c.put(2, "two"); c.get(1); c.put(3, "three");
  expect([c.get(2), keys(c)]).toEqual([-1, [1, 3]]);
});
test("put على key موجود بيحدّث وبيحرّكه للآخر: put 1 'ONE'، put 4 ← 3 اتطردت", () => {
  const c = new LRUList(2);
  c.put(1, "one"); c.put(3, "three"); c.put(1, "ONE"); c.put(4, "four");
  expect([c.get(3), c.get(1), c.get(4), keys(c)]).toEqual([-1, "ONE", "four", [1, 4]]);
});
test("capacity 1", () => {
  const c = new LRUList(1);
  c.put("a", 1); c.put("b", 2);
  expect([c.get("a"), c.get("b"), c.map.size]).toEqual([-1, 2, 1]);
});
test("الـ list والـ Map دايمًا نفس الحجم، والـ prev متظبطة", () => {
  const c = new LRUList(3);
  for (let i = 0; i < 10; i++) { c.put(i % 5, i); c.get((i * 3) % 5); }
  let back = 0;
  for (let n = c.tail.prev; n !== c.head; n = n.prev) back++;
  expect([keys(c).length, back, c.map.size]).toEqual([3, 3, 3]);
});
test("١٠٠ ألف عملية (كل واحدة O(1))", () => {
  const c = new LRUList(1000);
  for (let i = 0; i < 100000; i++) { c.put(i, i); if (i % 3 === 0) c.get(i - 500); }
  expect([c.get(99999), c.get(0), c.map.size]).toEqual([99999, -1, 1000]);
});`,
            solution: R`class LRUList {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { prev: null, next: null };
    this.tail = { prev: this.head, next: null };
    this.head.next = this.tail;
  }
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  addToEnd(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }
  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;
    this.remove(node);
    this.addToEnd(node);
    return node.value;
  }
  put(key, value) {
    let node = this.map.get(key);
    if (node) {
      node.value = value;
      this.remove(node);
    } else {
      node = { key, value, prev: null, next: null };
      this.map.set(key, node);
    }
    this.addToEnd(node);
    if (this.map.size > this.capacity) {
      const old = this.head.next;
      this.remove(old);
      this.map.delete(old.key);
    }
  }
}`
          }
        }
      ]
    },
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
