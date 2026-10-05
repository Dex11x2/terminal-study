// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "heaps و priority queues",
      l: 3,
      n: "أصغر (أو أكبر) عنصر في O(1) وتطلّعه في O(log n): heap بإيدك، و kth largest، و top k، و merge k lists",
      items: [
        {
          cmd: "min heap (by hand)",
          title: "JavaScript معندهاش heap جاهز، اكتب واحد بإيدك",
          desc: R`الـ min heap: شجرة binary كاملة، كل عقدة فيها أصغر من (أو تساوي) أولادها. فالأصغر دايمًا في الـ root. بيدّيك ٣ عمليات: [[peek]] (الأصغر) في [[O(1)]]، و [[push]] و [[pop]] في [[O(log n)]].

مش محتاجين objects وأولاد: الشجرة الكاملة بتتخزّن في array عادية. العنصر في index i أولاده في [[2i + 1]] و [[2i + 2]]، وأبوه في [[(i - 1) >> 1]] (يعني قسمة على 2 وتقريب لتحت).

push: حط العنصر في آخر الـ array، وطالما أصغر من أبوه بدّلهم واطلع (sift up). pop: خد الـ root، وحط آخر عنصر مكانه، وطالما أكبر من أصغر ابن بدّلهم وانزل (sift down). الشجرة ارتفاعها [[log n]]، فكل عملية [[O(log n)]].

Python عندها [[heapq]]، و Java عندها [[PriorityQueue]]، لكن JavaScript مفيهاش حاجة جاهزة. في الانترفيو اكتبه أو اسأل «ينفع أفترض إن عندي MinHeap؟». في الشغل فيه packages جاهزة، وبيئة JavaScript في LeetCode عادةً فيها [[MinPriorityQueue]] من package اسمها [[@datastructures-js/priority-queue]]، بس متعتمدش عليها في انترفيو على whiteboard أو editor عادي.

الـ [[compare]] بيخلّي نفس الـ class ينفع max heap، أو heap على objects بأي مفتاح. احفظ الملف ده باسم [[min-heap.js]] جوه [[~/lab/dsa]]، لأن الدروس الجاية بتعمل له [[require]].`,
          example: R`class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }
  get size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(value) {
    const d = this.data;
    d.push(value);
    let i = d.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(d[i], d[parent]) >= 0) break;
      const tmp = d[i]; d[i] = d[parent]; d[parent] = tmp;
      i = parent;
    }
  }
  pop() {
    const d = this.data;
    if (d.length === 0) return undefined;
    const top = d[0];
    const last = d.pop();
    if (d.length > 0) {
      d[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = l + 1;
        let smallest = i;
        if (l < d.length && this.compare(d[l], d[smallest]) < 0) smallest = l;
        if (r < d.length && this.compare(d[r], d[smallest]) < 0) smallest = r;
        if (smallest === i) break;
        const tmp = d[i]; d[i] = d[smallest]; d[smallest] = tmp;
        i = smallest;
      }
    }
    return top;
  }
}
module.exports = { MinHeap };
if (require.main === module) {
  const h = new MinHeap();
  for (const x of [5, 3, 8, 1, 9, 2]) h.push(x);
  console.log(h.peek(), h.size); // 1 6
  const out = [];
  while (h.size) out.push(h.pop());
  console.log(out.join(" ")); // 1 2 3 5 8 9
  const maxHeap = new MinHeap((a, b) => b - a);
  [5, 3, 8].forEach(x => maxHeap.push(x));
  console.log(maxHeap.pop(), new MinHeap().pop()); // 8 undefined
}
// push and pop: O(log n); peek: O(1); n pushes: O(n log n)`,
          try: R`اختبر الـ heap بعشوائية: ضيف ١٠ آلاف رقم عشوائي، وطلّعهم كلهم، وقارن بـ [[sort]]. لازم يطلعوا متطابقين. وبعدين استخدمه كـ «task queue» بأولويات: كل مهمة [[{ name, priority }]]، والأولوية الأقل تطلع الأول، ولو أولويتين متساويتين يطلع اللي اتضاف الأول. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[TaskQueue]] فيه [[push(name, priority)]] و [[pop()]] و [[size]]، والتعادل يطلع اللي اتضاف الأول.`,
          sol: R`الاختبار العشوائي لازم يطبع [[true]]. لو طلع false، الغلط في الغالب في [[pop]]: يا إما نسيت حالة [[d.length > 0]] بعد الـ [[pop]] (heap فيه عنصر واحد)، يا إما بتقارن بالابن الشمال بس في الـ sift down.

المهام بأولويات: الـ heap مش stable، يعني عنصرين متساويين ممكن يطلعوا بأي ترتيب. عشان «اللي اتضاف الأول يطلع الأول»، ضيف عدّاد [[seq]] بيزيد مع كل push، وخلي الـ compare يقارن الأولوية الأول، ولو متساويين يقارن الـ seq. الناتج: [[deploy fix-bug write-docs lunch]] (deploy و fix-bug أولويتهم 1، و deploy اتضافت الأول).

الغلطة الشائعة: تعمل [[sort]] على الـ array بعد كل push. ده [[O(n log n)]] لكل عملية بدل [[O(log n)]].`,
          solCode: R`const { MinHeap } = require("./min-heap");
const nums = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1e6));
const h = new MinHeap();
nums.forEach(x => h.push(x));
const fromHeap = [];
while (h.size) fromHeap.push(h.pop());
const sorted = [...nums].sort((a, b) => a - b);
console.log(fromHeap.every((x, i) => x === sorted[i])); // true
let seq = 0;
const tasks = new MinHeap((a, b) => a.priority - b.priority || a.seq - b.seq);
const add = (name, priority) => tasks.push({ name, priority, seq: seq++ });
add("write-docs", 2); add("deploy", 1); add("lunch", 3); add("fix-bug", 1);
const order = [];
while (tasks.size) order.push(tasks.pop().name);
console.log(order.join(" ")); // deploy fix-bug write-docs lunch
// 10k pushes + pops: O(n log n)`,
          flag: "script",
          deep: {
            why: "الـ heap هو الأداة لأي «هات الأصغر/الأكبر دلوقتي، والبيانات بتتغير»: queue مهام بأولويات (BullMQ و Sidekiq بيستخدموا فكرة قريبة)، و timers في event loop، و Dijkstra، و «أعلى 10 منتجات مبيعًا» على stream بيانات. والـ sort مش بديل، لأن كل عنصر جديد هيحتاج sort من الأول.",
            how: R`push لـ [5, 3, 8, 1]: [[[5]]]. push 3: [[[5, 3]]]، 3 أصغر من أبوها 5، بدّل: [[[3, 5]]]. push 8: [[[3, 5, 8]]]، 8 أكبر من 3، خلاص. push 1: [[[3, 5, 8, 1]]]، أبوها index 1 (قيمته 5)، بدّل: [[[3, 1, 8, 5]]]، أبوها index 0 (قيمته 3)، بدّل: [[[1, 3, 8, 5]]].

pop: الـ top هو 1. آخر عنصر (5) يروح مكانه: [[[5, 3, 8]]]. أصغر ابن لـ 5 هو 3، بدّل: [[[3, 5, 8]]]. خلاص. رجّعنا 1، والأصغر الجديد 3 في الـ root.

الـ array مش مترتبة! [[[1, 3, 8, 5]]] heap صحيح. الضمان الوحيد إن كل أب أصغر من أولاده، وده كفاية عشان الـ root يبقى الأصغر.

[[module.exports]] و [[require.main === module]]: الملف ده بيصدّر الـ class عشان الدروس الجاية تستخدمه، والـ demo بتتنفذ بس لو شغّلت الملف نفسه بـ [[node min-heap.js]]، مش لما حد يعمله require.

بناء heap من array موجودة ممكن يتعمل في [[O(n)]] (heapify: sift down من نص الـ array لأولها)، بس الـ push واحد واحد [[O(n log n)]] كفاية في أغلب الحالات.`,
            when: "لما محتاج الأصغر أو الأكبر أكتر من مرة، والعناصر بتدخل وتطلع. لو محتاج الأصغر مرة واحدة بس: [[Math.min]] أو loop، [[O(n)]]. لو البيانات ثابتة ومحتاجها كلها مترتبة: sort مرة. لو محتاج تدوّر على أي عنصر أو تمسحه من النص، الـ heap مش مناسب (العملية دي [[O(n)]] فيه).",
            mistakes: R`[[Math.floor(i / 2)]] كأب بدل [[(i - 1) >> 1]] مع array بتبدأ من 0. ونسيان إن الـ heap فيه عنصر واحد في [[pop]] (تحط الـ last مكان الـ top وترجّعه تاني). والـ compare بالطرح [[a - b]] بيقع مع strings (ترجع NaN)؛ استخدم [[a.localeCompare(b)]]. وفي الانترفيو: «heap مترتب؟» لأ، والـ sift down بيقارن بأصغر ابن مش بأي ابن.`
          },
          lines: [
            "الـ class بتاع الـ heap.",
            "compare زي بتاع sort: سالب يعني a يطلع قبل b. الـ default أرقام من الصغير.",
            "الشجرة متخزنة في array.",
            "نحفظ الـ compare.",
            "قفلة الـ constructor.",
            "عدد العناصر.",
            "الأصغر من غير ما نشيله.",
            "إضافة عنصر.",
            "اختصار.",
            "حطه في آخر الـ array (آخر مكان في الشجرة).",
            "مكانه.",
            "sift up: طالما مش الـ root.",
            "index الأب.",
            "مش أصغر من أبوه: مكانه صح، وقّف.",
            "أصغر: بدّله مع أبوه.",
            "واطلع مكان الأب.",
            "قفلة الـ while.",
            "قفلة push.",
            "طلّع الأصغر.",
            "اختصار.",
            "فاضي: مفيش حاجة.",
            "الأصغر هو اللي هنرجّعه.",
            "شيل آخر عنصر.",
            "لو لسه فيه عناصر.",
            "حط الأخير مكان الـ root.",
            "sift down من الـ root.",
            "لحد ما يلاقي مكانه.",
            "index الابنين.",
            "افترض إن أنا الأصغر.",
            "الشمال أصغر؟",
            "اليمين أصغر من الأصغر لحد دلوقتي؟",
            "أنا أصغر من الاتنين: مكاني صح.",
            "بدّل مع أصغر ابن.",
            "وانزل مكانه.",
            "قفلة الـ while.",
            "قفلة الـ if.",
            "رجّع الأصغر.",
            "قفلة pop.",
            "قفلة الـ class.",
            "صدّر الـ class للملفات التانية.",
            "الـ demo تشتغل بس لو الملف ده اتشغّل مباشرة.",
            "heap جديد.",
            "ضيف ٦ أرقام.",
            "الأصغر 1، والعدد 6.",
            "هنطلّعهم كلهم.",
            "كل pop بيطلّع الأصغر اللي فاضل.",
            "طلعوا مترتبين: ده heap sort.",
            "max heap بنفس الكود: اعكس الـ compare.",
            "ضيف ٣ أرقام.",
            "الأكبر طلع الأول، و pop على heap فاضي undefined.",
            "قفلة الـ if."
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
class TaskQueue {
  constructor() {
    this.seq = 0;
    this.heap = new MinHeap(/* قارن الأولوية، ولو متساويين قارن seq */);
  }
  push(name, priority) {}
  pop() {}
  get size() { return this.heap.size; }
}`,
            tests: R`test("lunch 3، deploy 1، write-docs 2، fix-bug 1 ← deploy fix-bug write-docs lunch", () => {
  const q = new TaskQueue();
  q.push("lunch", 3); q.push("deploy", 1); q.push("write-docs", 2); q.push("fix-bug", 1);
  expect([q.pop(), q.pop(), q.pop(), q.pop()]).toEqual(["deploy", "fix-bug", "write-docs", "lunch"]);
});
test("فاضي: pop ← undefined و size ← 0", () => { const q = new TaskQueue(); expect([q.pop(), q.size]).toEqual([undefined, 0]); });
test("size بيزيد ويقل", () => { const q = new TaskQueue(); q.push("a", 1); q.push("b", 1); q.pop(); expect(q.size).toBe(1); });
test("20 ألف مهمة بأولويات عشوائية: نفس ناتج sort الـ stable (كل عملية O(log n))", () => {
  let seed = 3;
  const tasks = Array.from({ length: 20000 }, (_, i) => ({ name: "t" + i, p: (seed = (seed * 1103515245 + 12345) % 2147483648) % 10 }));
  const q = new TaskQueue();
  tasks.forEach(t => q.push(t.name, t.p));
  const got = [];
  while (q.size) got.push(q.pop());
  expect(got).toEqual([...tasks].sort((a, b) => a.p - b.p).map(t => t.name));
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
class TaskQueue {
  constructor() {
    this.seq = 0;
    this.heap = new MinHeap((a, b) => a.priority - b.priority || a.seq - b.seq);
  }
  push(name, priority) { this.heap.push({ name, priority, seq: this.seq++ }); }
  pop() { return this.heap.pop()?.name; }
  get size() { return this.heap.size; }
}`
          }
        },
        {
          cmd: "kth largest",
          title: "تاني أكبر رقم، أو الـ k أكبر، من غير ما ترتّب كل حاجة",
          desc: R`الحل البديهي: رتّب تنازلي وخد العنصر [[k - 1]]. ده [[O(n log n)]] وبيشتغل، واذكره الأول في الانترفيو.

الحل بالـ heap: خلّي min heap حجمه k بالظبط. عدّي على الأرقام: ضيف كل رقم، ولو الحجم عدّى k شيل الأصغر. في الآخر الـ heap فيه أكبر k أرقام، وأصغرهم (الـ root) هو الـ k أكبر.

ليه min heap مش max heap؟ لأنك عايز تطرد الأصغر كل مرة: أي رقم أصغر من كل الـ k اللي معاك مش ممكن يبقى من «أكبر k».

الـ Big-O: [[O(n log k)]]. لو k صغير (أعلى 10 من مليون)، ده أسرع بكتير من sort، والذاكرة [[O(k)]] بدل [[O(n)]]. والأهم إنه بيشتغل على stream: الأرقام بتيجي واحد واحد ومش لازم تبقى كلها في الذاكرة.`,
          example: R`const { MinHeap } = require("./min-heap");
function kthLargest(nums, k) {
  const heap = new MinHeap();
  for (const x of nums) {
    heap.push(x);
    if (heap.size > k) heap.pop();
  }
  return heap.peek();
}
const bySort = (nums, k) => [...nums].sort((a, b) => b - a)[k - 1];
console.log(kthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(kthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
console.log(kthLargest([7], 1)); // 7
console.log(bySort([3, 2, 1, 5, 6, 4], 2)); // 5
// heap: O(n log k) time, O(k) space; sort: O(n log n) time, O(n) space`,
          try: R`حل «Kth Largest Element in a Stream»: class اسمه [[KthLargest]] بياخد k وأرقام أولية، وفيه [[add(val)]] بتضيف رقم وترجّع الـ k أكبر لحد دلوقتي. جرّب [[new KthLargest(3, [4, 5, 8, 2])]] وبعدين [[add]] لـ 3 و 5 و 10 و 9 و 4، والمفروض يطلع 4 و 5 و 5 و 8 و 8. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[KthLargest]] (الـ MinHeap جاهز في المربع).`,
          sol: R`الناتج: [[4 5 5 8 8]]. نفس الفكرة: heap حجمه k، والـ [[add]] بتعمل push، ولو الحجم عدّى k تعمل pop، وترجّع [[peek]]. كل add [[O(log k)]].

dry run: بعد الأرقام الأولية الـ heap فيه [4, 5, 8] (2 اتطردت). add 3: دخلت وطلعت على طول، والـ root لسه 4. add 5: [4, 5, 5, 8] نطرد 4، الـ root 5. add 10: نطرد 5، والـ heap [5, 8, 10]، الـ root 5. add 9: نطرد 5، الـ root 8. add 4: تدخل وتطلع، 8.

الغلطة الشائعة: تخزّن كل الأرقام في array وتعمل sort مع كل add، [[O(n log n)]] لكل add. وغلطة تانية: تنسى إن الأرقام الأولية ممكن تبقى أقل من k، فالـ [[peek]] يرجّع رقم مش هو الـ k أكبر لحد ما يتملي.`,
          solCode: R`const { MinHeap } = require("./min-heap");
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new MinHeap();
    for (const x of nums) this.add(x);
  }
  add(val) {
    this.heap.push(val);
    if (this.heap.size > this.k) this.heap.pop();
    return this.heap.peek();
  }
}
const s = new KthLargest(3, [4, 5, 8, 2]);
console.log([3, 5, 10, 9, 4].map(x => s.add(x)).join(" ")); // 4 5 5 8 8
// add: O(log k) time; O(k) space`,
          flag: "script",
          deep: {
            why: "«أعلى k» سؤال في كل dashboard: أكتر 10 منتجات مبيعًا، وأبطأ 5 endpoints، وأكتر المستخدمين نشاطًا. ولما البيانات كبيرة أو جاية كـ stream (logs و events)، مش هتقدر تعمل sort لكل حاجة كل مرة. و Kth Largest من أشهر مسائل الـ heap في الانترفيو.",
            how: R`dry run لـ [[[3, 2, 1, 5, 6, 4]]] و k = 2: push 3: [3]. push 2: [2, 3]. push 1: [1, 2, 3]، الحجم 3 > 2، pop الأصغر (1): [2, 3]. push 5: pop 2: [3, 5]. push 6: pop 3: [5, 6]. push 4: pop 4: [5, 6]. الـ peek = 5، تاني أكبر رقم.

التكرار بيتعد: في [[[3, 2, 3, 1, 2, 4, 5, 5, 6]]] و k = 4، الترتيب التنازلي 6 5 5 4 ...، فالـ 4 أكبر هو 4. الـ 5 المكررة بتتعد مرتين. لو المطلوب «الـ k أكبر رقم مختلف»، اعمل [[new Set]] الأول.

فيه حل تالت: Quickselect (زي quick sort بس بتنزل في ناحية واحدة بس): [[O(n)]] في المتوسط و [[O(n^2)]] في أسوأ حالة، ومش بيشتغل على stream. اذكره في الانترفيو كـ follow-up.`,
            when: "k صغير و n كبير، أو بيانات جاية stream: heap حجمه k. محتاج كل العناصر مترتبة: sort. سؤال واحد على array ثابتة وعايز أسرع حاجة في المتوسط: quickselect. والعكس «الـ k أصغر» بـ max heap حجمه k.",
            mistakes: R`max heap فيه كل العناصر وتعمل pop k مرات: بيشتغل بس [[O(n + k log n)]] وذاكرة [[O(n)]]، وده مش اللي الانترفيور عايزه. وإنك تنسى إن [[sort()]] من غير compare بيرتب الأرقام كـ strings ([[[10, 9, 1].sort()]] بتدّي [[[1, 10, 9]]]). وإنك تخلط بين «k أكبر» (index k - 1 في الترتيب التنازلي) و index k.`
          },
          lines: [
            "الـ heap من درس «min heap (by hand)»، والملف جنب الملف ده.",
            "الـ k أكبر رقم.",
            "min heap.",
            "عدّي على الأرقام.",
            "ضيف الرقم.",
            "لو بقوا أكتر من k، اطرد الأصغر.",
            "قفلة.",
            "الأصغر في أكبر k هو الإجابة.",
            "قفلة.",
            "الحل البديهي للمقارنة.",
            "تاني أكبر: 5.",
            "رابع أكبر مع تكرار: 4.",
            "عنصر واحد.",
            "الـ sort بيدّي نفس الإجابة."
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
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new MinHeap();
    // ضيف الأرقام الأولية بنفس طريقة add
  }
  add(val) {
    // push، ولو الحجم عدّى k اعمل pop، ورجّع peek
  }
}`,
            tests: R`test("KthLargest(3, [4, 5, 8, 2]) و add 3، 5، 10، 9، 4 ← 4 5 5 8 8", () => {
  const kth = new KthLargest(3, [4, 5, 8, 2]);
  expect([3, 5, 10, 9, 4].map(x => kth.add(x))).toEqual([4, 5, 5, 8, 8]);
});
test("الأرقام الأولية أقل من k: KthLargest(1, []) و add -3، -2، -4، 0، 4 ← -3 -2 -2 0 4", () => {
  const kth = new KthLargest(1, []);
  expect([-3, -2, -4, 0, 4].map(x => kth.add(x))).toEqual([-3, -2, -2, 0, 4]);
});
test("الـ heap حجمه k بس، مش كل الأرقام", () => {
  const kth = new KthLargest(2, [1, 2, 3, 4, 5]);
  kth.add(6);
  expect(kth.heap.size).toBe(2);
});
test("١٠٠ ألف add و k = 10 (كل add O(log k))", () => {
  const kth = new KthLargest(10, []);
  let last;
  for (let i = 0; i < 100000; i++) last = kth.add((i * 7919) % 100003);
  const all = Array.from({ length: 100000 }, (_, i) => (i * 7919) % 100003).sort((a, b) => b - a);
  expect(last).toBe(all[9]);
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
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new MinHeap();
    for (const x of nums) this.add(x);
  }
  add(val) {
    this.heap.push(val);
    if (this.heap.size > this.k) this.heap.pop();
    return this.heap.peek();
  }
}`
          }
        },
        {
          cmd: "top k frequent",
          title: "أكتر k عناصر تكرارًا (Top K Frequent Elements)",
          desc: R`خطوتين: عدّ التكرار بـ Map (زي درس «frequency count»)، وبعدين هات أعلى k حسب العدد.

بالـ heap: نفس فكرة kth largest، بس الـ heap فيه أزواج [[[العنصر، العدد]]] والمقارنة بالعدد. [[O(n log k)]].

بالـ bucket sort: التكرار مستحيل يزيد عن n. فاعمل array طولها n + 1، والخانة c فيها العناصر اللي اتكررت c مرة. وامشي من آخرها لحد ما تجمّع k. [[O(n)]]، أسرع من أي sort، لأنك استغليت إن القيم (التكرارات) محدودة.

والاتنين بيبدأوا بالـ Map اللي بتاخد [[O(n)]] وقت و [[O(u)]] ذاكرة (u عدد العناصر المختلفة).`,
          example: R`const { MinHeap } = require("./min-heap");
function countAll(nums) {
  const count = new Map();
  for (const x of nums) count.set(x, (count.get(x) ?? 0) + 1);
  return count;
}
function topKHeap(nums, k) {
  const heap = new MinHeap((a, b) => a[1] - b[1]);
  for (const entry of countAll(nums)) {
    heap.push(entry);
    if (heap.size > k) heap.pop();
  }
  const out = [];
  while (heap.size) out.push(heap.pop()[0]);
  return out.reverse();
}
function topKBucket(nums, k) {
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [x, c] of countAll(nums)) buckets[c].push(x);
  const out = [];
  for (let c = nums.length; c > 0 && out.length < k; c--) out.push(...buckets[c]);
  return out.slice(0, k);
}
console.log(topKHeap([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKBucket([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKHeap([4], 1), topKBucket([5, 5, 6], 1)); // [4] [5]
// heap: O(n log k) time; bucket: O(n) time; both O(n) space`,
          try: R`حل «Top K Frequent Words»: نفس المسألة على كلمات، بس لو كلمتين نفس التكرار، اللي أبجديًا أصغر تيجي الأول. [[["i", "love", "leetcode", "i", "love", "coding"]]] و k = 2 الإجابة [[["i", "love"]]]، و [[["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"]]] و k = 4 الإجابة [[["the", "is", "sunny", "day"]]]. فكّر كويس في الـ compare بتاع الـ min heap. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[topKWords(words, k)]].`,
          sol: R`الإجابتين: [[i love]] و [[the is sunny day]].

الـ compare في الـ min heap بيحدد مين يطلع (يتطرد) الأول. عايز تطرد الأقل تكرارًا، ولو متساويين تطرد اللي أبجديًا أكبر (عشان الأصغر أبجديًا هو اللي يفضل). فـ [[(a, b) => a[1] - b[1] || b[0].localeCompare(a[0])]]. لاحظ إن الـ tie-break معكوس ([[b]] قبل [[a]]).

في الآخر اعكس الناتج، لأن الـ heap بيطلّع الأضعف الأول.

الحل الأبسط اللي ينفع تقوله الأول: [[[...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))]] وخد أول k. [[O(u log u)]]، وكفاية في أغلب الحالات، وبعدين قول «لو u كبير، heap حجمه k».

الغلطة الشائعة: تكتب الـ tie-break بنفس اتجاه الـ sort العادي في الـ min heap، فيطلعلك [[day]] بدل [[sunny]] في الحالات المتساوية.`,
          solCode: R`const { MinHeap } = require("./min-heap");
function topKWords(words, k) {
  const count = new Map();
  for (const w of words) count.set(w, (count.get(w) ?? 0) + 1);
  const heap = new MinHeap((a, b) => a[1] - b[1] || b[0].localeCompare(a[0]));
  for (const entry of count) {
    heap.push(entry);
    if (heap.size > k) heap.pop();
  }
  const out = [];
  while (heap.size) out.push(heap.pop()[0]);
  return out.reverse();
}
console.log(topKWords(["i", "love", "leetcode", "i", "love", "coding"], 2)); // ['i', 'love']
console.log(topKWords(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)); // ['the', 'is', 'sunny', 'day']
// O(n + u log k) time, O(u) space (u = distinct words)`,
          flag: "script",
          deep: {
            why: "أكتر hashtags استخدامًا، وأكتر أخطاء بتظهر في الـ logs، وأكتر كلمات بيدوّر عليها الناس، وأكتر صفحات زيارة. «عدّ وهات الأعلى» من أكتر الحاجات اللي هتكتبها في analytics، والانترفيو بيحبها لأنها بتجمع hash map و heap مع بعض.",
            how: R`الـ Map بعد العدّ: [[1 → 3، 2 → 2، 3 → 1]]. الـ Map في JavaScript لما تعمل عليها [[for...of]] بتطلّع أزواج [[[key, value]]]، فالـ heap بياخدها زي ما هي.

heap بـ k = 2: push [1, 3]. push [2, 2]. push [3, 1]، الحجم 3، pop الأقل تكرارًا [3, 1]. الباقي [2, 2] و [1, 3]. الـ pop بيطلّعهم من الأقل للأكتر: 2 ثم 1، فبنعكس: [1, 2].

الـ bucket: [[buckets[3] = [1]]]، و [[buckets[2] = [2]]]، و [[buckets[1] = [3]]]. من 6 لتحت: الخانات فاضية لحد 3، ناخد 1. خانة 2، ناخد 2. بقوا k، نقف.

الـ [[slice(0, k)]] في الآخر مهم: الـ bucket الواحد ممكن يبقى فيه أكتر من عنصر، و [[push(...)]] بتضيفهم كلهم، فممكن نعدّي k.`,
            when: "bucket sort لما القيم اللي بترتب بيها أرقام صحيحة ومحدودة (التكرار ≤ n). heap لما k صغير والبيانات كبيرة أو stream. sort عادي لما البيانات صغيرة، وده الاختيار الصح في الشغل في أغلب الأحيان لأنه أوضح. وفي الداتابيز: [[GROUP BY ... ORDER BY count DESC LIMIT k]] بيعمل ده كله.",
            mistakes: R`[[count[x]++]] على object من غير قيمة أولية بتطلّع NaN. واستخدام object بدل Map مع أرقام: الـ keys بتتحول لـ strings، فالناتج يطلع [[["1", "2"]]] بدل [[[1, 2]]]. ونسيان الـ [[reverse]] في آخر نسخة الـ heap. ونسيان الـ [[slice]] في نسخة الـ bucket. وفي الانترفيو اسأل: لو فيه تعادل على آخر مكان، أرجّع مين؟`
          },
          lines: [
            "الـ heap من ملف min-heap.js.",
            "دالة العدّ.",
            "Map من العنصر لعدد مرات ظهوره.",
            "عدّ كل عنصر.",
            "رجّعها.",
            "قفلة.",
            "الحل بالـ heap.",
            "min heap على الأزواج، والمقارنة بالعدد.",
            "كل زوج [العنصر، العدد].",
            "ضيفه.",
            "لو عدّينا k، اطرد الأقل تكرارًا.",
            "قفلة.",
            "هنجمّع الناتج.",
            "طلّع العناصر (من الأقل للأكتر).",
            "اعكس عشان الأكتر تكرارًا الأول.",
            "قفلة.",
            "الحل بالـ bucket sort.",
            "خانة لكل تكرار ممكن من 0 لـ n.",
            "كل عنصر في خانة عدد تكراره.",
            "الناتج.",
            "من أعلى تكرار لتحت، لحد ما نجمّع k.",
            "ممكن نكون عدّينا k لو الخانة فيها أكتر من عنصر.",
            "قفلة.",
            "1 اتكرر ٣ مرات و 2 مرتين.",
            "نفس الإجابة بالـ bucket.",
            "عنصر واحد، وحالة فيها تكرار واضح."
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
function topKWords(words, k) {
  const count = new Map();
  for (const w of words) count.set(w, (count.get(w) ?? 0) + 1);
  // min heap حجمه k: يطرد الأقل تكرارًا، ولو متساويين يطرد الأكبر أبجديًا
  return [];
}`,
            tests: R`test("i love leetcode i love coding، k = 2 ← ['i', 'love']", () => expect(topKWords(["i", "love", "leetcode", "i", "love", "coding"], 2)).toEqual(["i", "love"]));
test("k = 4 ← ['the', 'is', 'sunny', 'day']", () => expect(topKWords(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)).toEqual(["the", "is", "sunny", "day"]));
test("كلهم مرة واحدة ← أبجدي: ['b', 'a', 'c'] و k = 2 ← ['a', 'b']", () => expect(topKWords(["b", "a", "c"], 2)).toEqual(["a", "b"]));
test("k = عدد الكلمات المختلفة ← كلهم", () => expect(topKWords(["x", "y", "x"], 2)).toEqual(["x", "y"]));
test("50 ألف كلمة و k = 3 (O(n log k))", () => {
  const words = Array.from({ length: 50000 }, (_, i) => "w" + (i % 1000 < 3 ? i % 1000 : i % 997));
  expect(topKWords(words, 3)).toEqual(["w0", "w1", "w2"]);
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
function topKWords(words, k) {
  const count = new Map();
  for (const w of words) count.set(w, (count.get(w) ?? 0) + 1);
  const heap = new MinHeap((a, b) => a[1] - b[1] || b[0].localeCompare(a[0]));
  for (const entry of count) {
    heap.push(entry);
    if (heap.size > k) heap.pop();
  }
  const out = [];
  while (heap.size) out.push(heap.pop()[0]);
  return out.reverse();
}`
          }
        },
        {
          cmd: "merge k sorted lists",
          title: "ادمج k linked lists مترتبين في list واحدة مترتبة",
          desc: R`في درس «merge (dummy head)» دمجنا اتنين. مع k lists، الحل البديهي تدمجهم واحدة واحدة: الأولى مع التانية، والناتج مع التالتة... ده [[O(N × k)]] (N مجموع العقد كلها)، لأن الناتج اللي بيكبر بيتعدّى عليه تاني كل مرة.

بالـ heap: في أي لحظة، العنصر الجاي في الناتج هو أصغر واحد بين «رؤوس» الـ k lists. فحط الرؤوس في min heap. اسحب الأصغر، ضيفه للناتج، ولو ليه [[next]] حطه في الـ heap مكانه. الـ heap عمره ما بيبقى فيه أكتر من k عقدة، فكل عملية [[O(log k)]]، والإجمالي [[O(N log k)]].

والـ dummy head نفس الحيلة بتاعة درس الدمج: عقدة وهمية في الأول عشان ما نعملش if لأول عنصر.`,
          example: R`const { MinHeap } = require("./min-heap");
const toList = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = list => { const out = []; for (let n = list; n; n = n.next) out.push(n.val); return out; };
function mergeKLists(lists) {
  const heap = new MinHeap((a, b) => a.val - b.val);
  for (const head of lists) if (head) heap.push(head);
  const dummy = { next: null };
  let tail = dummy;
  while (heap.size) {
    const node = heap.pop();
    tail.next = node;
    tail = node;
    if (node.next) heap.push(node.next);
  }
  return dummy.next;
}
const lists = [[1, 4, 5], [1, 3, 4], [2, 6]].map(toList);
console.log(toArray(mergeKLists(lists)).join(" ")); // 1 1 2 3 4 4 5 6
console.log(toArray(mergeKLists([]))); // []
console.log(toArray(mergeKLists([null, toList([0])]))); // [0]
// N total nodes, k lists: O(N log k) time, O(k) space for the heap`,
          try: R`حلها من غير heap بالتقسيم (divide and conquer): ادمج الـ lists اتنين اتنين (0 مع 1، و 2 مع 3، ...)، وبعدين ادمج النواتج اتنين اتنين، لحد ما تفضل واحدة. زي merge sort بالظبط. احسب الـ Big-O. وبعدين طبّقها على حاجة حقيقية: ٣ ملفات logs كل واحد مترتب بالوقت، ادمجهم في timeline واحد. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[mergeKDivide(lists)]] بالتقسيم اتنين اتنين، والاختبارات فيها lists أرقام و lists سطور logs.`,
          sol: R`الناتج [[1 1 2 3 4 4 5 6]] زي نسخة الـ heap.

الـ Big-O: كل «جولة» بتعدّي على كل العقد مرة، [[O(N)]]، وعدد الجولات [[log k]] (كل جولة عدد الـ lists بيقل للنص)، فالإجمالي [[O(N log k)]]، نفس الـ heap، ومن غير heap خالص، وذاكرة [[O(1)]] زيادة (غير الـ array بتاعة الـ lists).

الغلطة الشائعة: تدمج [[result = merge(result, lists[i])]] في loop، وده الحل البديهي [[O(N × k)]]، مش التقسيم.

الـ logs: كل سطر بيبدأ بالوقت بنفس الشكل ([[HH:MM]])، فمقارنة الـ strings بـ [[<=]] بترتبهم صح، ونفس [[mergeTwo]] بتشتغل من غير تعديل. لو الوقت بصيغة تانية، قارن بـ [[Date.parse]] بدل الـ string نفسها. ونفس الفكرة (external merge sort) هي اللي بتستخدمها قواعد البيانات عشان ترتب بيانات أكبر من الـ RAM: ترتب أجزاء صغيرة وتكتبها على الديسك، وبعدين تدمجها بـ heap.`,
          solCode: R`const toList = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = list => { const out = []; for (let n = list; n; n = n.next) out.push(n.val); return out; };
function mergeTwo(a, b) {
  const dummy = { next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; } else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a ?? b;
  return dummy.next;
}
function mergeKDivide(lists) {
  if (lists.length === 0) return null;
  let round = lists;
  while (round.length > 1) {
    const next = [];
    for (let i = 0; i < round.length; i += 2) next.push(mergeTwo(round[i], round[i + 1] ?? null));
    round = next;
  }
  return round[0];
}
console.log(toArray(mergeKDivide([[1, 4, 5], [1, 3, 4], [2, 6]].map(toList))).join(" ")); // 1 1 2 3 4 4 5 6
console.log(toArray(mergeKDivide([]))); // []
const logs = [["09:00 api up", "09:05 db slow"], ["09:01 worker start"], ["09:03 cache miss", "09:06 cache hit"]];
console.log(toArray(mergeKDivide(logs.map(toList))).join(" | ")); // 09:00 api up | 09:01 worker start | 09:03 cache miss | 09:05 db slow | 09:06 cache hit
// O(N log k) time, O(1) extra space besides the list of heads`,
          flag: "script",
          deep: {
            why: "دمج مصادر مترتبة حاجة بتحصل في الشغل: logs من كذا سيرفر في timeline واحد، ونتايج بحث من كذا shard مترتبة بالـ score، و feed فيه posts من كذا مصدر مترتبة بالوقت. و Merge k Sorted Lists مسألة Hard مشهورة، والـ heap بيحوّلها لـ ١٠ سطور.",
            how: R`dry run: الرؤوس في الـ heap: 1 (من الأولى) و 1 (من التانية) و 2. اسحب 1 (من الأولى)، وحط 4 مكانها: الـ heap [1، 2، 4]. اسحب 1 (التانية)، وحط 3: [2، 3، 4]. اسحب 2، وحط 6: [3، 4، 6]. وهكذا لحد ما الـ heap يفضى.

ليه الـ heap فيه عقد مش أرقام؟ عشان لما نسحب عقدة نعرف [[next]] بتاعها ونحطه. والـ compare بيقارن [[a.val]].

إحنا مش بنعمل عقد جديدة: بنوصّل العقد الموجودة ببعض بتغيير [[next]]. عشان كده الذاكرة الزيادة [[O(k)]] للـ heap بس. لكن ده معناه إن الـ lists الأصلية اتغيرت.

[[toList]] بتبني linked list من array بـ [[reduceRight]]: بتبدأ من الآخر وكل عقدة بتشاور على اللي بعدها. و [[toArray]] العكس، عشان نطبع.`,
            when: "k مصادر مترتبة وعايز ناتج واحد مترتب: heap بحجم k. لو المصادر arrays مش lists، احفظ في الـ heap [[[value, listIndex, elementIndex]]]. ولو k صغير (2 أو 3)، الدمج المباشر أبسط. ولو المصادر مش مترتبة أصلًا، اجمعهم واعمل sort.",
            mistakes: R`إنك تحط null في الـ heap (list فاضية) فالـ compare يقرا [[null.val]]. وإنك تحط كل العقد في الـ heap مرة واحدة: بيشتغل بس [[O(N log N)]] وذاكرة [[O(N)]]. وإنك تنسى تحط [[node.next]] بعد ما تسحب العقدة فتضيع باقي الـ list. وفي الانترفيو: اذكر الحل البديهي وليه [[O(N × k)]]، وبعدين الـ heap، وبعدين إن التقسيم بيدّي نفس الـ Big-O من غير heap.`
          },
          lines: [
            "الـ heap من ملف min-heap.js.",
            "تحويل array لـ linked list (من الآخر للأول).",
            "تحويل linked list لـ array عشان نطبع.",
            "دمج k lists.",
            "min heap على العقد، والمقارنة بالقيمة.",
            "حط رأس كل list مش فاضية.",
            "عقدة وهمية في أول الناتج.",
            "آخر عقدة في الناتج.",
            "طول ما فيه عقد.",
            "اسحب أصغر رأس.",
            "وصّلها بآخر الناتج.",
            "بقت هي الآخر.",
            "لو الـ list بتاعتها ليها باقي، حط العقدة الجاية مكانها.",
            "قفلة.",
            "الناتج بعد العقدة الوهمية.",
            "قفلة.",
            "٣ lists مترتبين.",
            "٨ عقد مترتبة.",
            "مفيش lists.",
            "list فاضية (null) و list فيها عنصر."
          ],
          check: {
            lang: "js",
            starter: R`function mergeTwo(a, b) {
  const dummy = { next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; } else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a ?? b;
  return dummy.next;
}
function mergeKDivide(lists) {
  // كل جولة: ادمج [0 مع 1]، [2 مع 3]... لحد ما تفضل list واحدة
  return null;
}`,
            tests: R`const toList = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = list => { const out = []; for (let n = list; n && out.length <= 100000; n = n.next) out.push(n.val); return out; };
test("[[1, 4, 5], [1, 3, 4], [2, 6]] ← 1 1 2 3 4 4 5 6", () => expect(toArray(mergeKDivide([[1, 4, 5], [1, 3, 4], [2, 6]].map(toList)))).toEqual([1, 1, 2, 3, 4, 4, 5, 6]));
test("[] ← null", () => expect(mergeKDivide([])).toBe(null));
test("lists فاضية (null) في النص وعدد فردي", () => expect(toArray(mergeKDivide([null, toList([3]), null, toList([1, 2]), null])) ).toEqual([1, 2, 3]));
test("٣ ملفات logs ← timeline واحد (مقارنة الـ strings بـ <= بتنفع مع HH:MM)", () => {
  const logs = [["09:00 api up", "09:05 db slow"], ["09:01 worker start"], ["09:03 cache miss", "09:06 cache hit"]];
  expect(toArray(mergeKDivide(logs.map(toList))).map(l => l.slice(0, 5))).toEqual(["09:00", "09:01", "09:03", "09:05", "09:06"]);
});
test("بتربط العقد الموجودة، مش بتعمل عقد جديدة", () => {
  const a = toList([1]), b = toList([2]);
  const r = mergeKDivide([a, b]);
  expect([r === a, r.next === b]).toEqual([true, true]);
});
test("500 list × 40 عقدة (O(N log k)، مش O(N × k))", () => {
  const lists = Array.from({ length: 500 }, (_, i) => toList(Array.from({ length: 40 }, (_, j) => j * 500 + i)));
  const r = toArray(mergeKDivide(lists));
  expect([r.length, r.every((x, i) => x === i)]).toEqual([20000, true]);
});`,
            solution: R`function mergeTwo(a, b) {
  const dummy = { next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; } else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a ?? b;
  return dummy.next;
}
function mergeKDivide(lists) {
  if (lists.length === 0) return null;
  let round = lists;
  while (round.length > 1) {
    const next = [];
    for (let i = 0; i < round.length; i += 2) next.push(mergeTwo(round[i], round[i + 1] ?? null));
    round = next;
  }
  return round[0];
}`
          }
        }
      ]
    }
]);
