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
          teach: R`## الفكرة في جملة

كل مجموعة شجرة، وكل عنصر بيشاور على أبوه في array اسمها [[parent]]، والرئيس (الجذر) بيشاور على نفسه. [[find(x)]] بتطلع من x لحد الرئيس. و [[union(a, b)]] بتجيب رئيس كل واحد، ولو مختلفين بتحط رئيس المجموعة الصغيرة تحت رئيس الكبيرة.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع [[parent]] و [[size]] و [[count]] بعد كل [[union]]، وكل خطوة جوه [[find]]. هنتتبع على ٦ عناصر بعمليات جديدة: [[union(0, 1)]] و [[union(2, 3)]] و [[union(0, 2)]] و [[find(3)]] و [[union(4, 3)]] و [[union(1, 3)]].

---

## ١. الـ constructor

~~~js
this.parent = Array.from({ length: n }, (_, i) => i);
this.size = new Array(n).fill(1);
this.count = n;
~~~

- [[Array.from({ length: n }, (_, i) => i)]]: الدالة بتاخد (القيمة، الـ index)، والقيمة مش مهمة فاسمها [[_]]. جرّبنا [[n = 4]]: [[[0, 1, 2, 3]]]. يعني كل عنصر أبوه نفسه = كل عنصر رئيس مجموعة لوحده.
- [[size[r]]]: عدد عناصر المجموعة اللي رئيسها r. بيتقرا عند الرئيس بس.
- [[count]]: عدد المجموعات. بيبدأ n وبيقل واحد مع كل دمج.

---

## ٢. [[find(x)]]

~~~js
while (this.parent[x] !== x) {
  const up = this.parent[x]; this.parent[x] = this.parent[up];
  x = this.parent[x];
}
return x;
~~~

- [[while (parent[x] !== x)]]: طول ما x مش الرئيس، اطلع.
- [[up]] = أبو x. و [[parent[x] = parent[up]]]: خلّي x يشاور على **جده** بدل أبوه. ده اسمه path halving (نوع من path compression): كل مرة بتعدّي على مسار، بتقصّره للمرة الجاية.
- [[x = parent[x]]]: اطلع للجد.

---

## ٣. [[union(a, b)]]

~~~js
let ra = this.find(a), rb = this.find(b);
if (ra === rb) return false;
if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
this.parent[rb] = ra;
this.size[ra] += this.size[rb];
this.count--;
return true;
~~~

1. رئيس كل واحد ([[ra]] و [[rb]]، r = root).
2. نفس الرئيس = نفس المجموعة أصلًا: [[false]]، ومفيش تغيير.
3. [[[ra, rb] = [rb, ra]]]: swap بالـ destructuring، عشان [[ra]] يبقى دايمًا الأكبر.
4. الرئيس الصغير يبقى تحت الكبير (union by size)، والحجم يتجمع عند الكبير، والمجموعات تقل واحد.

ليه الرؤساء مش العناصر نفسها؟ [[parent[b] = a]] كانت هتقطع b بس من مجموعته القديمة وتسيب الباقي.

---

## ٤. التتبع

| العملية | اللي حصل | [[parent]] بعدها | [[size]] | [[count]] |
|---|---|---|---|---|
| البداية | | [0,1,2,3,4,5] | [1,1,1,1,1,1] | 6 |
| union(0, 1) | رؤساء 0 و 1، حجمين متساويين: [[parent[1] = 0]] | [0,0,2,3,4,5] | [2,1,1,1,1,1] | 5 |
| union(2, 3) | [[parent[3] = 2]] | [0,0,2,2,4,5] | [2,1,2,1,1,1] | 4 |
| union(0, 2) | رؤساء 0 و 2، حجمين 2 و 2: [[parent[2] = 0]] | [0,0,0,2,4,5] | [4,1,2,1,1,1] | 3 |

دلوقتي 3 بيشاور على 2، و 2 على 0: مسار طوله ٢.

~~~text بعد union(0, 2)
      0
     / \
    1   2
        |
        3
~~~

### [[find(3)]]: الـ path halving

| x | [[up]] | [[parent[x]]] بقت | x بعدها |
|---|---|---|---|
| 3 | 2 | [[parent[2]]] = 0 | 0 |
| 0 | | 0 رئيس نفسه، الـ loop وقف | |

رجعت 0، و [[parent]] بقت [[[0, 0, 0, 0, 4, 5]]]: 3 بقت تحت 0 على طول. المرة الجاية [[find(3)]] خطوة واحدة.

### الباقي

| العملية | اللي حصل | [[parent]] بعدها | [[count]] |
|---|---|---|---|
| union(4, 3) | [[ra]] = 4 (حجم 1)، [[rb]] = 0 (حجم 4): 1 < 4 فـ swap، و [[parent[4] = 0]] | [0,0,0,0,0,5] | 2 |
| union(1, 3) | الاتنين رئيسهم 0: [[false]] | زي ما هي | 2 |

من غير الـ swap، كان 0 (المجموعة اللي فيها ٤) هيتحط تحت 4، والشجرة تطول مستوى. والمجموعتين في الآخر: {0, 1, 2, 3, 4} و {5}.

> لاحظ إن [[size[2]]] فضلت 2 بعد ما 2 بقت تحت 0. ده عادي: الحجم بيتقرا عند الرئيس بس، وقيمته عند غير الرئيس ملهاش معنى.

---

## ٥. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
3
true false
false 3
~~~

- بعد [[union(0, 1)]] و [[union(1, 2)]] و [[union(3, 4)]]: ٣ مجموعات {0,1,2} و {3,4} و {5}.
- [[find(2) === find(0)]]: نفس الرئيس، [[true]]. و [[find(3) === find(5)]]: [[false]].
- [[union(0, 2)]]: نفس المجموعة، [[false]]، والعدد فضل 3.

---

## ٦. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| [[find]] و [[union]] | تقريبًا [[O(1)]] (رياضيًا [[O(α(n))]] amortized) | union by size بيخلّي الشجرة قصيرة، والـ path halving بيقصّرها أكتر كل ما تتمشي |
| من غير التحسينين | [[O(n)]] للعملية | الشجرة ممكن تبقى خط طوله n |
| الذاكرة | [[O(n)]] | [[parent]] و [[size]] |

amortized يعني: عملية واحدة ممكن تاخد شوية أكتر، بس المتوسط على أي سلسلة عمليات تقريبًا ثابت.

---

## الخلاصة

~~~text
parent[i] = i     كل عنصر رئيس نفسه في الأول
find(x)           اطلع لحد parent[x] === x، وخلّي كل عنصر يشاور على جده
union(a, b)       رئيسين؛ لو واحد: false. غير كده الصغير تحت الكبير، و count--
size              بيتقرا عند الرئيس بس
~~~

> قارن دايمًا **رؤساء** المجموعات ([[find(a) === find(b)]])، مش [[parent[a] === parent[b]]]: الأب المباشر ممكن يختلف والرئيس واحد.`,
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
          teach: R`## الفكرة في جملة

احفظ أحسن مسافة معروفة لكل عقدة في [[dist]]، وحط [[[المسافة، العقدة]]] في min heap. كل لفة اسحب الأقرب: مسافتها خلاص نهائية. ومنها جرّب كل طريق طالع: لو الوصول للجار من خلالها أقصر من المعروف، حدّث مسافته وحطه في الـ heap. النسخ القديمة اللي بتطلع بعدين بمسافة أكبر بتتفوّت.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، والـ [[MinHeap]] هو ملف [[min-heap.js]]، بعد ما ضفنا [[console.log]] يطبع كل سحبة وكل تحديث و [[dist]] والـ heap. هنتتبع على graph جديد:

~~~text الـ graph (الأسهم في اتجاه واحد)
S --7--> A
S --2--> B
B --3--> A
B --8--> C
A --1--> C
~~~

الطريق المباشر S → A وزنه 7، بس S → B → A وزنه 5. و BFS (اللي بيعدّ الخطوات) كان هيختار المباشر لأنه خطوة واحدة.

---

## ١. شكل الـ graph في الكود

~~~js
const roads = {
  A: [["B", 4], ["C", 1]],
  ...
};
~~~

object: كل عقدة → array من أزواج [[[الجار، الوزن]]]. ده اسمه adjacency list. والعقدة اللي ملهاش طرق طالعة (زي D) مش موجودة كـ key أصلًا.

---

## ٢. الكود سطر سطر

### [[const dist = new Map([[source, 0]]);]]

Map بتبدأ بزوج واحد: المصدر مسافته 0. أي عقدة مش في الـ Map = لسه موصلناهاش (مسافتها Infinity).

### [[new MinHeap((a, b) => a[0] - b[0])]] و [[heap.push([0, source])]]

العناصر [[[d, node]]]، والمقارنة بـ [[a[0]]] (المسافة)، فالأقرب يطلع الأول.

### [[const [d, u] = heap.pop();]]

اسحب الأقرب وفكّه: [[d]] المسافة، و [[u]] العقدة.

### [[if (d > dist.get(u)) continue;]]

النسخة دي قديمة: اتحطت في الـ heap وبعدين لقينا طريق أقصر لنفس العقدة. فوّتها. (الـ heap مفيهوش «عدّل قيمة عنصر جوايا»، فبنحط نسخة جديدة ونسيب القديمة تطلع وتتفوّت.)

### [[for (const [v, w] of graph[u] ?? [])]]

كل طريق طالع من [[u]]: [[v]] الجار و [[w]] الوزن. و [[?? []]]: لو [[u]] ملهاش key في الـ object، [[graph[u]]] = [[undefined]]، فخد array فاضية بدل ما الـ [[for...of]] يرمي error.

### [[const nd = d + w; if (nd < (dist.get(v) ?? Infinity))]]

[[nd]] = new distance: المسافة لـ v لو جينا من u. [[dist.get(v) ?? Infinity]]: لو v لسه مش في الـ Map، اعتبرها Infinity، فأي رقم أحسن منها.

### [[dist.set(v, nd); heap.push([nd, v]);]]

حدّث، وحط نسخة جديدة بالمسافة الجديدة.

---

## ٣. التتبع من S

| سحبنا | الطرق اللي جربناها | [[dist]] بعدها | الـ heap بعدها |
|---|---|---|---|
| [0, S] | A: 0+7 = 7 < ∞ حدّث. B: 0+2 = 2 < ∞ حدّث | S 0، A 7، B 2 | [2,B] [7,A] |
| [2, B] | A: 2+3 = **5 < 7** حدّث. C: 2+8 = 10 < ∞ حدّث | S 0، A 5، B 2، C 10 | [5,A] [7,A] [10,C] |
| [5, A] | C: 5+1 = **6 < 10** حدّث | S 0، A 5، B 2، C 6 | [6,C] [10,C] [7,A] |
| [6, C] | ملهاش طرق طالعة | زي ما هي | [7,A] [10,C] |
| [7, A] | قديمة: 7 > 5، فوّت | | [10,C] |
| [10, C] | قديمة: 10 > 6، فوّت | | فاضي |

الناتج: [[{ S: 0, A: 5, B: 2, C: 6 }]].

لاحظ:

- A اتحطت في الـ heap مرتين ([7, A] و [5, A])، والأقصر هي اللي طلعت الأول. القديمة طلعت بعدين واتفوّتت.
- كل عقدة طلعت «صح» (مش قديمة) كانت مسافتها نهائية. ده الـ greedy: الأقرب في الـ heap مفيش طريق أقصر ليه، لأن أي طريق تاني بيعدّي على عقدة أبعد، والأوزان مش سالبة.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
{ A: 0, B: 3, C: 1, D: 4 }
undefined
~~~

- [[Object.fromEntries(map)]] بتحوّل الـ Map لـ object عشان الطباعة تبقى أوضح.
- من A: B مسافتها 3 (A → C → B) مش 4 (المباشر)، و D مسافتها 4 (A → C → B → D) مش 6 (A → C → D).
- من D: D ملهاش طرق طالعة، فـ [[dist]] فيها D بس، و [[get("A")]] = [[undefined]] (مش متوصلة).

---

## ٥. الـ Big-O وليه

V عدد العقد، و E عدد الطرق.

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O((V + E) log V)]] | كل طريق ممكن يعمل push واحد، والـ heap بيكبر لحد E، و [[log E]] من نفس رتبة [[log V]] |
| الذاكرة | [[O(V + E)]] | [[dist]] فيها V، والـ heap ممكن يوصل E نسخة |

---

## الخلاصة

~~~text
dist        Map، المصدر 0، واللي مش فيها = Infinity
heap        [المسافة، العقدة]، الأقرب يطلع الأول
كل سحبة     لو d > dist.get(u): نسخة قديمة، continue
كل طريق     nd = d + w؛ لو أقل: dist.set و heap.push
الشرط       الأوزان ≥ 0، غير كده الإجابة بتطلع غلط من غير error
~~~

> BFS = أقل عدد خطوات. Dijkstra = أقل مجموع أوزان. الفرق إن BFS بيستخدم queue عادي، و Dijkstra بيستخدم min heap على المسافة.`,
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
          teach: R`## الفكرة في جملة

أي رقم جوه الجهاز bits (أصفار وواحدات)، والعمليات [[&]] و [[|]] و [[^]] بتشتغل على كل خانة لوحدها. المثال فيه ٤ حيل: XOR بيلغي الأرقام المتكررة، و [[n & (n - 1)]] بيشيل أيمن 1، والـ flags (كل صلاحية bit)، وحدود الـ 32-bit في JavaScript.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل خطوة بالـ binary ([[x.toString(2)]] بيطبع الرقم بالـ binary، و [[padStart(4, "0")]] بتكمّله أصفار من الشمال عشان الخانات تيجي تحت بعض). هنتتبع على inputs جديدة.

---

## ١. العمليات على كل bit

| العملية | الرمز | الخانة بتبقى 1 لو | مثال |
|---|---|---|---|
| and | [[&]] | الاتنين 1 | [[1100 & 1010]] = 1000 |
| or | [[|]] | واحد منهم على الأقل 1 | [[1100 | 1010]] = 1110 |
| xor | [[^]] | مختلفين | [[1100 ^ 1010]] = 0110 |

خواص الـ XOR اللي هنستخدمها (جرّبناها): [[5 ^ 5]] = 0، و [[5 ^ 0]] = 5، والترتيب مش بيفرق.

---

## ٢. [[single]]: الرقم اللي مش متكرر

~~~js
const single = nums => nums.reduce((acc, x) => acc ^ x, 0);
~~~

[[reduce]] بيمشي على الـ array وبيشيل قيمة متراكمة [[acc]] (accumulator) بتبدأ بـ 0، وفي كل خطوة [[acc = acc ^ x]].

### التتبع: [[single([7, 3, 5, 3, 7])]]

| x | الحساب | بالـ binary | [[acc]] |
|---|---|---|---|
| 7 | 0 ^ 7 | 0000 ^ 0111 = 0111 | 7 |
| 3 | 7 ^ 3 | 0111 ^ 0011 = 0100 | 4 |
| 5 | 4 ^ 5 | 0100 ^ 0101 = 0001 | 1 |
| 3 | 1 ^ 3 | 0001 ^ 0011 = 0010 | 2 |
| 7 | 2 ^ 7 | 0010 ^ 0111 = 0101 | 5 |

الأرقام اللي في النص ملهاش معنى، بس في الآخر الـ 7 والـ 3 لغوا نفسهم (كأنك عملت [[(7 ^ 7) ^ (3 ^ 3) ^ 5]] = [[0 ^ 0 ^ 5]])، وفضل 5.

---

## ٣. [[missing]]: الرقم الناقص من 0 لـ n

~~~js
const missing = nums => nums.reduce((acc, x, i) => acc ^ x ^ (i + 1), 0);
~~~

الـ array فيها n رقم من 0 لـ n وناقص واحد. [[reduce]] بيدّي الـ index [[i]] كمان، فبنعمل XOR لكل رقم موجود **و** لكل رقم من 1 لـ n ([[i + 1]]). كل رقم موجود هيظهر مرتين ويتلغي، والصفر مش فارق ([[x ^ 0 = x]])، فيفضل الناقص.

### التتبع: [[missing([1, 4, 0, 2])]] (من 0 لـ 4، والناقص 3)

| i | الحساب | [[acc]] |
|---|---|---|
| 0 | 0 ^ 1 ^ 1 | 0 |
| 1 | 0 ^ 4 ^ 2 | 6 |
| 2 | 6 ^ 0 ^ 3 | 5 |
| 3 | 5 ^ 2 ^ 4 | 3 |

1 و 2 و 4 ظهروا مرتين واتلغوا. 3 ظهرت مرة بس (من [[i + 1]])، فهي الناقصة.

---

## ٤. [[n & (n - 1)]]: شيل أيمن 1

[[n - 1]] بيقلب أيمن 1 في n لصفر، وكل الأصفار اللي على يمينه لواحدات. فالـ [[&]] بينهم بيمسح الـ 1 ده بس وبيسيب الباقي.

### [[isPowerOfTwo]]

قوى الـ 2 فيها 1 واحد بس، فلو شلته يفضل 0.

| n | n بالـ binary | n - 1 | [[n & (n - 1)]] | قوة لـ 2؟ |
|---|---|---|---|---|
| 16 | 010000 | 001111 | 000000 | [[true]] |
| 40 | 101000 | 100111 | 100000 | [[false]] |

و [[n > 0]] لازمة عشان 0 مش قوة لـ 2، و [[0 & -1]] = 0.

> الأقواس حوالين [[(n & (n - 1))]] مش زينة: [[===]] أقوى من [[&]]. جرّبنا [[16 & 15 === 0]] من غير أقواس: اتقرت [[16 & (15 === 0)]] = [[16 & false]] = 0.

### [[countBits]]

~~~js
while (n) { n &= n - 1; count++; }
~~~

[[while (n)]]: طول ما n مش صفر. و [[&=]] اختصار [[n = n & (n - 1)]]. كل لفة بتشيل 1، فعدد اللفات = عدد الواحدات.

| اللفة | n قبل | n - 1 | n بعد | [[count]] |
|---|---|---|---|---|
| ١ | 1101 (13) | 1100 | 1100 | 1 |
| ٢ | 1100 | 1011 | 1000 | 2 |
| ٣ | 1000 | 0111 | 0000 | 3 |

13 فيها ٣ واحدات، والـ loop لف ٣ مرات بس، مش 4 (عدد الخانات).

---

## ٥. الـ flags

~~~js
const READ = 1, WRITE = 2, ADMIN = 4;
~~~

كل صلاحية قوة لـ 2، يعني bit لوحده: READ = 001، و WRITE = 010، و ADMIN = 100.

- [[|]] بيجمع صلاحيات: [[READ | ADMIN]] = 5 = 101 (جرّبناها).
- [[&]] بيسأل: [[5 & WRITE]] = 0 (مفيش)، و [[5 & ADMIN]] = 4 (موجودة). عشان كده بنقارن بـ [[!== 0]] مش بـ [[=== 1]]: الناتج هو قيمة الـ bit نفسه (4 هنا)، مش 1.

---

## ٦. حد الـ 32-bit

الـ bitwise في JavaScript بيحوّل الرقم لـ 32-bit بإشارة الأول، وأقصاه [[2^31 - 1]] = 2147483647. اللي جرّبناه:

| التعبير | الناتج | ليه |
|---|---|---|
| [[(2 ** 31 - 1) | 0]] | 2147483647 | داخل في الحد |
| [[2 ** 31 | 0]] | -2147483648 | عدّى الحد بواحد، فلف للسالب |
| [[2 ** 32 | 0]] | 0 | الـ bits اللي فوق 32 اتقصت |
| [[2n ** 40n]] | 1099511627776n | BigInt (الـ [[n]] في الآخر) ملوش الحد ده |

---

## ٧. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
4
2
true false
3 1011
true false
-2147483648 1099511627776n
~~~

| السطر | ليه |
|---|---|
| 4 | في [4, 1, 2, 1, 2] الـ 1 والـ 2 اتلغوا |
| 2 | [3, 0, 1] من 0 لـ 3 والناقص 2 |
| true false | 64 = 1000000 (1 واحد)، و 12 = 1100 (اتنين) |
| 3 1011 | 11 = 1011 فيها ٣ واحدات |
| true false | [[READ | WRITE]] = 3 = 011: فيها WRITE ومفيهاش ADMIN |
| -2147483648 ... | حد الـ 32-bit، و BigInt من غير حد |

---

## ٨. الـ Big-O وليه

| الدالة | الوقت | الذاكرة | السبب |
|---|---|---|---|
| [[single]] و [[missing]] | [[O(n)]] | [[O(1)]] | لفة واحدة، ومتغير واحد بدل Map أو Set |
| [[isPowerOfTwo]] | [[O(1)]] | [[O(1)]] | عملية واحدة |
| [[countBits]] | [[O(عدد الواحدات)]] | [[O(1)]] | لفة لكل 1، وأقصاها 32 |

---

## الخلاصة

~~~text
x ^ x = 0، x ^ 0 = x    المتكرر مرتين بيتلغي
n & (n - 1)             بيشيل أيمن 1
قوة لـ 2                 n > 0 && (n & (n - 1)) === 0
flags                   | تجمع، و & تسأل، وقارن بـ !== 0
32-bit                  الـ bitwise بيقص، واستخدم BigInt للأكبر
~~~

> حط أقواس حوالين أي [[&]] أو [[|]] جوه مقارنة: أولويتهم أقل من [[===]].`,
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
          teach: R`## الفكرة في جملة

الـ [[Map]] في JavaScript بتحفظ ترتيب إضافة المفاتيح: الأقدم في الأول والأحدث في الآخر. فبنستخدمها كـ cache وقائمة ترتيب في نفس الوقت: أي key اتلمس (قراءة أو كتابة) نمسحه ونضيفه تاني فيروح للآخر، ولما الحجم يعدّي الـ capacity نطرد **أول** key.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع ترتيب المفاتيح بعد كل عملية. هنتتبع على سيناريو جديد بـ capacity 3.

---

## ١. الكود سطر سطر

### [[constructor(capacity)]]

[[this.capacity]] أقصى عدد عناصر، و [[this.map]] فيها الـ key والقيمة، وترتيب المفاتيح فيها هو ترتيب الاستخدام (من الأقدم للأحدث).

### [[get(key)]]

~~~js
if (!this.map.has(key)) return -1;
const value = this.map.get(key);
this.map.delete(key);
this.map.set(key, value);
return value;
~~~

1. مش موجود: [[-1]] (ده اللي المسألة بتطلبه).
2. خد القيمة.
3. امسحه وضيفه تاني: كده بقى آخر key = الأحدث استخدامًا. **القراية استخدام**، فلازم تحرّكه.

### [[put(key, value)]]

~~~js
if (this.map.has(key)) this.map.delete(key);
this.map.set(key, value);
if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);
~~~

1. لو موجود امسحه الأول. ليه؟ جرّبنا: Map فيها x ثم y، و [[set("x", 9)]] غيّرت القيمة بس، والترتيب فضل [[['x', 'y']]]. يعني [[set]] على key موجود **مش بيحرّكه**.
2. ضيفه: يروح للآخر.
3. لو عدّينا الـ capacity، اطرد الأقدم. وده بييجي **بعد** الإضافة، فلو الـ key كان موجود أصلًا، الحجم مزادش ومفيش طرد.

### [[this.map.keys().next().value]]

- [[keys()]] بترجّع iterator (حاجة بتطلّع العناصر واحد واحد لما تطلب)، مش array.
- [[next()]] بتطلب أول عنصر، وبترجّع object زي [[{ value: 'x', done: false }]] (جرّبناها).
- [[.value]] هو الـ key نفسه.

كده بناخد أول key في [[O(1)]] من غير ما نعمل array بكل المفاتيح.

---

## ٢. التتبع: capacity = 3

| العملية | النتيجة | اتطرد | الترتيب بعدها (أقدم ← أحدث) |
|---|---|---|---|
| put(a, 1) | | | a |
| put(b, 2) | | | a، b |
| put(c, 3) | | | a، b، c |
| get(a) | 1 | | b، c، a |
| put(d, 4) | | b | c، a، d |
| get(b) | -1 | | c، a، d |
| put(c, 30) | | | a، d، c |
| put(e, 5) | | a | d، c، e |

اللي حصل:

- [[get(a)]] نقلت a للآخر، فلما d دخلت، الأقدم كان b مش a.
- [[get(b)]] بعد الطرد: [[-1]]، والترتيب متغيرش.
- [[put(c, 30)]]: c موجودة، فاتمسحت واتضافت بالقيمة الجديدة في الآخر، والحجم فضل 3 فمفيش طرد.
- [[put(e, 5)]]: الأقدم بقى a، فاتطردت.

المحتوى في الآخر: [[[['d', 4], ['c', 30], ['e', 5]]]].

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
one
-1 [ 1, 3 ]
[ [ 1, 'ONE' ], [ 4, 'four' ] ]
~~~

- capacity 2: put 1، put 2، و [[get(1)]] رجّعت [[one]] ونقلت 1 للآخر.
- [[put(3)]] طردت 2 (الأقدم)، فـ [[get(2)]] = -1، والمفاتيح [1, 3]. [[[...cache.map.keys()]]] بتحوّل الـ iterator لـ array عشان نطبعها.
- [[put(1, "ONE")]] حدّثت 1 ونقلته للآخر، فـ [[put(4)]] طردت 3. و [[entries()]] بتطلّع أزواج [[[key, value]]].

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| [[get]] | [[O(1)]] في المتوسط | [[has]] و [[get]] و [[delete]] و [[set]] في الـ Map كلهم [[O(1)]] في المتوسط |
| [[put]] | [[O(1)]] في المتوسط | نفس العمليات، والطرد بـ [[keys().next()]] من غير array |
| الذاكرة | [[O(capacity)]] | الـ Map عمرها ما بتعدّي capacity + 1 |

لو كتبت [[[...this.map.keys()][0]]] بدل [[keys().next().value]]، كل طرد هيبني array بكل المفاتيح: [[O(capacity)]].

---

## الخلاصة

~~~text
Map               الترتيب = ترتيب الإضافة، الأقدم أول key
get               لو موجود: delete ثم set (القراية استخدام)
put               لو موجود delete، وبعدين set، وبعدين اطرد لو size > capacity
الأقدم            map.keys().next().value  في O(1)
set لوحدها        بتغيّر القيمة ومش بتحرّك الـ key
~~~

> «استخدمته» = امسحه وضيفه تاني. ده السطر اللي لو نسيته الـ cache بيطرد الحاجات الغلط من غير أي error.`,
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
    }
]);
