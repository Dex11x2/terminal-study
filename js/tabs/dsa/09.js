// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "linked lists و intervals",
      l: 2,
      n: "nodes مربوطة بـ pointers بدل خانات ورا بعض، وفترات بتتداخل",
      items: [
        {
          cmd: "reverse (prev/curr)",
          title: "اقلب linked list في مكانها من غير ما تعمل nodes جديدة",
          desc: R`تلات متغيرات: [[prev]] و [[curr]] و [[next]]. مع كل node: احفظ اللي بعدها، واقلب السهم بتاعها يشاور على [[prev]]، وقدّم الاتنين خطوة. في الآخر [[prev]] هو الـ head الجديد. [[O(n)]] وقت و [[O(1)]] ذاكرة.

الـ linked list سلسلة nodes، كل واحدة فيها قيمة ومؤشر ([[next]]) على اللي بعدها. مفيش index: عشان توصل للعنصر العاشر لازم تمشي عشر خطوات.

أهم حاجة في أي مسألة linked list: ارسمها على ورقة، واتأكد إنك مش بتقطع السلسلة قبل ما تحفظ باقيها.`,
          example: R`const node = (val, next = null) => ({ val, next });
const toArray = h => { const out = []; for (; h; h = h.next) out.push(h.val); return out; };
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
const list = node(1, node(2, node(3)));
console.log(toArray(reverseList(list))); // [3, 2, 1]
console.log(reverseList(null));          // null
// O(n) time, O(1) space (the recursive version uses O(n) call stack)`,
          try: R`اكتبها recursive: اقلب الباقي من [[head.next]]، وبعدين خلّي [[head.next.next = head]] و [[head.next = null]]. وقول الـ space. وبعدين اقلب جزء بس من الـ list من المكان m لـ n. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[reverseRec(head)]] و [[reverseBetween(head, m, n)]] (m و n بيبدأوا من 1).`,
          flag: "script",
          deep: {
            why: "أشهر مسألة linked list، ومش عشان هتقلب lists في الشغل: عشان بتختبر إنك تقدر تتعامل مع pointers من غير ما تضيّع جزء من السلسلة. وهي خطوة في مسائل أكبر: palindrome linked list، و reverse in k-groups.",
            how: R`dry run على 1 ثم 2 ثم 3:

البداية: prev = null، و curr = 1.

لفة 1: next = 2. خلّي 1 تشاور على null. prev = 1، و curr = 2. عندنا دلوقتي: 1 لوحدها، و 2 ثم 3.

لفة 2: next = 3. خلّي 2 تشاور على 1. prev = 2، و curr = 3. عندنا: 2 ثم 1، و 3 لوحدها.

لفة 3: next = null. خلّي 3 تشاور على 2. prev = 3، و curr = null. عندنا: 3 ثم 2 ثم 1.

الـ while وقف، رجّع prev = 3.

الترتيب في جسم الـ loop مهم جدًا: لو قلبت السهم ([[curr.next = prev]]) قبل ما تحفظ [[curr.next]]، الباقي من الـ list ضاع ومفيش أي حاجة بتشاور عليه.

النسخة الـ recursive أقصر، بس [[O(n)]] space على الـ call stack، ومع list فيها مئات الآلاف من الـ nodes هتعمل stack overflow.`,
            when: "مسائل الـ linked list في الانترفيو. وفي الشغل نادرًا ما هتكتب linked list بإيدك في JS، بس الفكرة موجودة في undo history، و LRU cache، و React Fiber (كل fiber بيشاور على الابن والأخ والأب).",
            mistakes: R`إنك تقطع الرابط قبل ما تحفظ الباقي. وإنك ترجّع [[curr]] بدل [[prev]] (curr في الآخر null). وفي النسخة الـ recursive: تنسى [[head.next = null]] فيبقى فيه دايرة بين أول اتنين. والـ edge cases: list فاضية، و node واحدة.`
          },
          teach: R`## الفكرة في جملة

كل node في الـ list فيها سهم ([[next]]) بيشاور على اللي بعدها. عشان نقلب الـ list، نمشي عليها node node ونقلب السهم بتاع كل واحدة يشاور على اللي **قبلها**. المشكلة الوحيدة: أول ما تقلب السهم، الطريق للباقي بيضيع. فقبل ما تقلبه، احفظ الباقي في متغير.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع المتغيرات والجزء المقلوب والباقي.

---

## ١. الأدوات المساعدة

~~~js
const node = (val, next = null) => ({ val, next });
const toArray = h => { const out = []; for (; h; h = h.next) out.push(h.val); return out; };
~~~

### [[node]]

بترجّع object فيه [[val]] (القيمة) و [[next]] (اللي بعدها، أو [[null]] لو دي الأخيرة). [[({ val, next })]] اختصار لـ [[{ val: val, next: next }]]، والقوسين حوالين الـ [[{}]] عشان JS متفتكرهاش جسم دالة. و [[node(1, node(2))]] طلعت [[{"val":1,"next":{"val":2,"next":null}}]]: الـ list كلها objects جوه بعض.

### [[toArray]]

[[for (; h; h = h.next)]]: loop من غير بداية، شرطه [[h]] مش null، وكل لفة بتمشي خطوة لقدام. وبتجمع القيم في array عشان نطبعها.

---

## ٢. [[reverseList]] سطر سطر

~~~js
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
~~~

### [[let prev = null, curr = head;]]

- [[curr]] (current): الـ node اللي بنقلبها دلوقتي، بتبدأ من الأول.
- [[prev]] (previous): أول الجزء اللي اتقلب خلاص. في الأول مفيش حاجة اتقلبت، فـ [[null]]. وده بالظبط اللي أول node لازم تشاور عليه في الآخر، لأنها هتبقى آخر واحدة.

### [[while (curr)]]

طول ما فيه node لسه متقلبتش. لما [[curr]] تبقى [[null]] نكون عدّينا الآخر.

### الأربع سطور، والترتيب هو كل الحكاية

1. [[const next = curr.next;]]: احفظ الباقي. من غير السطر ده، السطر الجاي بيمسح الطريق الوحيد ليه.
2. [[curr.next = prev;]]: اقلب السهم: الـ node الحالية بقت تشاور على اللي قبلها.
3. [[prev = curr;]]: الـ node دي بقت أول الجزء المقلوب.
4. [[curr = next;]]: روح للباقي اللي حفظناه.

### [[return prev;]]

لما الـ loop يقف، [[curr]] بقت [[null]] و [[prev]] على آخر node في الأصل، وهي دلوقتي الـ head الجديد. لو رجّعت [[curr]] هترجّع [[null]].

---

## ٣. التتبع على 10 ثم 20 ثم 30 ثم 40

| اللفة | next | prev بعدها | curr بعدها | الجزء المقلوب (من prev) | الباقي (من curr) |
|---|---|---|---|---|---|
| البداية | | null | 10 | فاضي | 10 ثم 20 ثم 30 ثم 40 |
| 1 | 20 | 10 | 20 | 10 | 20 ثم 30 ثم 40 |
| 2 | 30 | 20 | 30 | 20 ثم 10 | 30 ثم 40 |
| 3 | 40 | 30 | 40 | 30 ثم 20 ثم 10 | 40 |
| 4 | null | 40 | null | 40 ثم 30 ثم 20 ثم 10 | فاضي |

في كل لحظة عندنا سلسلتين منفصلتين: المقلوبة (أولها [[prev]]) والباقية (أولها [[curr]]). كل لفة بتنقل node واحدة من أول الباقية لأول المقلوبة. ومفيش ولا node جديدة اتعملت: نفس الـ objects، بس الأسهم اتغيرت.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 3, 2, 1 ]
null
~~~

- 1 ثم 2 ثم 3 بقت 3 ثم 2 ثم 1.
- [[reverseList(null)]]: [[curr]] بتبدأ [[null]]، الـ while مبتلفّش، وبترجع [[prev]] = [[null]].
- node واحدة: لفة واحدة، السهم بيشاور على [[null]] (زي ما كان)، وبترجع نفسها.

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | كل node بتتلمس مرة، و ٤ عمليات ثابتة |
| الذاكرة | [[O(1)]] | تلات متغيرات [[prev]] و [[curr]] و [[next]] مهما الـ list طولت |

---

## الخلاصة

~~~text
prev = null, curr = head
احفظ        next = curr.next   (قبل أي حاجة)
اقلب        curr.next = prev
قدّم        prev = curr; curr = next
رجّع        prev (مش curr)
~~~

> في أي مسألة linked list: ارسم الأسهم على ورقة، واسأل قبل كل سطر «لو غيّرت السهم ده، فيه حاجة لسه بتشاور على الباقي؟».`,
          lines: [
            "بتعمل node: قيمة ومؤشر على اللي بعدها.",
            "بتحوّل الـ list لـ array عشان نطبعها.",
            "بترجّع الـ head الجديد.",
            "prev: اللي هيبقى بعد curr بعد القلب (في الأول null). curr: الـ node الحالية.",
            "لحد ما نخلص الـ list.",
            "احفظ الباقي قبل ما تقطع الرابط.",
            "اقلب السهم: curr بقت تشاور على اللي قبلها.",
            "قدّم prev.",
            "قدّم curr للباقي اللي حفظناه.",
            "قفلة.",
            "curr بقت null، و prev آخر node، وهي الـ head الجديد.",
            "قفلة.",
            "1 ثم 2 ثم 3.",
            "3 ثم 2 ثم 1.",
            "list فاضية: الـ while مبتلفّش، ويرجع null."
          ],
          sol: R`النسخة الـ recursive: لو [[!head || !head.next]] رجّع head. غير كده اقلب الباقي واحفظ [[newHead]]، وبعدين [[head.next.next = head]] (اللي بعدك يشاور عليك) و [[head.next = null]]. [1, 2, 3, 4] تبقى [[[4, 3, 2, 1]]]. الـ space [[O(n)]] للـ call stack، والـ loop كان [[O(1)]].

قلب جزء من m لـ n (بيبدأوا من 1): dummy قبل الـ head، وامشي لحد العقدة اللي قبل m ([[before]]). اقلب n - m + 1 عقدة بنفس prev/curr، وبعدين اربط الطرفين: [[before.next = prev]] (أول الجزء المقلوب)، والعقدة اللي كانت أول الجزء تشاور على [[curr]]. [1, 2, 3, 4, 5] مع 2 و 4 تبقى [[[1, 4, 3, 2, 5]]].

الغلطة المشهورة: تنسى [[head.next = null]] في الـ recursive، فآخر عقدتين يشاوروا على بعض ويبقى فيه دايرة، و [[toArray]] تلف للأبد.`,
          solCode: R`const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = h => { const out = []; for (; h; h = h.next) out.push(h.val); return out; };
function reverseRec(head) {
  if (!head || !head.next) return head;
  const newHead = reverseRec(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
console.log(toArray(reverseRec(fromArray([1, 2, 3, 4])))); // [4, 3, 2, 1]
console.log(reverseRec(null));                             // null
function reverseBetween(head, m, n) {
  const dummy = { next: head };
  let before = dummy;
  for (let i = 1; i < m; i++) before = before.next;
  let prev = null, curr = before.next;
  const firstOfRange = curr;
  for (let i = m; i <= n; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  before.next = prev;
  firstOfRange.next = curr;
  return dummy.next;
}
console.log(toArray(reverseBetween(fromArray([1, 2, 3, 4, 5]), 2, 4))); // [1, 4, 3, 2, 5]
console.log(toArray(reverseBetween(fromArray([1, 2, 3]), 1, 3)));       // [3, 2, 1]
// reverseRec: O(n) time, O(n) call stack; reverseBetween: O(n) time, O(1) space (1-based m and n)`,
          check: {
            lang: "js",
            starter: R`function reverseRec(head) {
  // لو !head || !head.next رجّع head
}
function reverseBetween(head, m, n) {
  const dummy = { next: head };
  // امشي لحد العقدة اللي قبل m، واقلب n - m + 1 عقدة، واربط الطرفين
  return dummy.next;
}`,
            tests: R`const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = head => {
  const out = [];
  for (let n = head; n; n = n.next) {
    out.push(n.val);
    if (out.length > 100000) throw new Error("الـ list فيها دايرة: عقدتين بيشاوروا على بعض");
  }
  return out;
};
test("reverseRec([1, 2, 3, 4]) ← [4, 3, 2, 1]", () => expect(toArray(reverseRec(fromArray([1, 2, 3, 4])))).toEqual([4, 3, 2, 1]));
test("null ← null، وعقدة واحدة زي ما هي", () => {
  expect(reverseRec(null)).toBe(null);
  expect(toArray(reverseRec(fromArray([7])))).toEqual([7]);
});
test("reverseBetween([1, 2, 3, 4, 5], 2, 4) ← [1, 4, 3, 2, 5]", () => expect(toArray(reverseBetween(fromArray([1, 2, 3, 4, 5]), 2, 4))).toEqual([1, 4, 3, 2, 5]));
test("m = 1 (الـ head بيتغير): ([1, 2, 3], 1, 3) ← [3, 2, 1]", () => expect(toArray(reverseBetween(fromArray([1, 2, 3]), 1, 3))).toEqual([3, 2, 1]));
test("m = n ← زي ما هي", () => expect(toArray(reverseBetween(fromArray([1, 2, 3]), 2, 2))).toEqual([1, 2, 3]));
test("مبتعملش nodes جديدة: أول عقدة بقت الأخيرة", () => {
  const head = fromArray([1, 2, 3]);
  const r = reverseRec(head);
  expect([r.next.next === head, head.next]).toEqual([true, null]);
});
test("3000 عقدة (الـ recursive: O(n) stack)", () => expect(toArray(reverseRec(fromArray(Array.from({ length: 3000 }, (_, i) => i))))[0]).toBe(2999));`,
            solution: R`function reverseRec(head) {
  if (!head || !head.next) return head;
  const newHead = reverseRec(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
function reverseBetween(head, m, n) {
  const dummy = { next: head };
  let before = dummy;
  for (let i = 1; i < m; i++) before = before.next;
  const first = before.next;
  let prev = null, curr = first;
  for (let i = m; i <= n; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  before.next = prev;
  first.next = curr;
  return dummy.next;
}`
          }
        },
        {
          cmd: "fast/slow pointers",
          title: "الـ linked list دي فيها دايرة (آخرها بيرجع لنصها) ولا لأ؟",
          desc: R`مؤشرين من الأول: [[slow]] بيمشي خطوة، و [[fast]] بيمشي خطوتين. لو فيه دايرة، الـ fast هيلف ويلحق الـ slow من ورا ويتقابلوا. لو مفيش، الـ fast هيوصل للآخر (null). [[O(n)]] وقت و [[O(1)]] ذاكرة.

الحل البديهي: Set فيه كل node شفتها، ولو قابلت واحدة تاني يبقى فيه دايرة. ده [[O(n)]] ذاكرة. المؤشرين بيعملوا نفس الشغل من غير ذاكرة (Floyd's cycle detection).

ونفس الفكرة (سريع وبطيء) بتجيب نص الـ list في لفة واحدة: لما الـ fast يوصل للآخر، الـ slow بيبقى في النص.`,
          example: R`function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
const a = { val: 1 }, b = { val: 2 }, c = { val: 3 };
a.next = b; b.next = c; c.next = null;
console.log(hasCycle(a));    // false
c.next = b;
console.log(hasCycle(a));    // true
console.log(hasCycle(null)); // false
// O(n) time, O(1) space (a Set of visited nodes also works, with O(n) space)`,
          try: R`اكتب [[middleNode(head)]] بنفس الفكرة: لما الـ fast يخلص، الـ slow في النص. وبعدين (أصعب): رجّع أول node في الدايرة. بعد ما يتقابلوا، رجّع مؤشر للـ head وحرّك الاتنين خطوة خطوة، هيتقابلوا عند بداية الدايرة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[middleNode(head)]] و [[cycleStart(head)]] بيرجّعوا العقدة نفسها (أو null).`,
          flag: "script",
          deep: {
            why: "bug حقيقي ممكن يحصل: بيانات فيها references دايرية (parent بيشاور على child والعكس)، وأي loop بيمشي عليها هيلف للأبد. والمؤشرين السريع والبطيء بيظهروا في مسائل تانية: نص الـ list، و palindrome linked list، و happy number، و find the duplicate number.",
            how: R`dry run: 1 ثم 2 ثم 3 ثم يرجع لـ 2.

البداية: slow = 1، و fast = 1.

لفة 1: slow = 2، و fast = 3 (من 1 لـ 2 لـ 3). مش متساويين.

لفة 2: slow = 3، و fast = 3 (من 3 لـ 2 لـ 3). اتقابلوا: true.

ليه لازم يتقابلوا؟ لما الاتنين يدخلوا الدايرة، الـ fast بيقرّب من الـ slow خطوة واحدة كل لفة (هو بيمشي 2 والتاني 1). فالمسافة بينهم بتقل 1 كل لفة لحد ما تبقى 0. مستحيل يعدّيه من غير ما يقابله، لأن المسافة بتقل بـ 1 بالظبط.

والـ Big-O: الـ slow بيدخل الدايرة بعد عدد خطوات ≤ n، والـ fast بيلحقه في أقل من لفة واحدة حوالين الدايرة. المجموع [[O(n)]].

الشرط [[fast && fast.next]]: عشان [[fast.next.next]] ميقراش من null. لو الـ list عدد عناصرها زوجي، fast هيبقى null. لو فردي، [[fast.next]] هيبقى null.`,
            when: "أي «فيه loop؟» في سلسلة references. ونص الـ list في لفة واحدة. ومسائل الأرقام اللي بتتحول لأرقام تانية (happy number: هل التحويل بيدخل في دايرة؟).",
            mistakes: R`إنك تقارن القيم ([[slow.val === fast.val]]) بدل الـ nodes نفسها: قيمتين متساويتين في nodes مختلفة مش دايرة. وإنك تنسى check [[fast.next]] فتقرا [[next]] من null وترمي TypeError. وإنك تقارن قبل ما تحرّكهم (الاتنين بيبدأوا متساويين، فهترجع true على طول).`
          },
          teach: R`## الفكرة في جملة

اتنين بيجروا على تراك: واحد بيمشي خطوة والتاني خطوتين. لو التراك خط مستقيم، السريع هيوصل للآخر ويخلص. لو التراك دايرة، السريع هيلف ويلحق البطيء من ورا. فبمؤشرين على الـ list، [[slow]] و [[fast]]، نعرف فيه دايرة ولا لأ من غير ما نحفظ أي node شفناها.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع مكان كل مؤشر.

---

## ١. الكود سطر سطر

~~~js
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
~~~

### [[let slow = head, fast = head;]]

الاتنين بيبدأوا من أول node.

### [[while (fast && fast.next)]]

السريع هيمشي خطوتين، يعني هيقرا [[fast.next.next]]. ده يقع لو [[fast]] نفسه [[null]] أو [[fast.next]] [[null]]: جرّبنا [[null.next]] ورمت [[TypeError: Cannot read properties of null (reading 'next')]]. فالشرط بيتأكد من الاتنين الأول، و [[&&]] بتقف عند أول false فمش هتقرا [[fast.next]] لو [[fast]] null. ولو الشرط وقع يبقى السريع وصل للآخر: مفيش دايرة.

### [[slow = slow.next; fast = fast.next.next;]]

خطوة للبطيء، وخطوتين للسريع.

### [[if (slow === fast) return true;]]

[[===]] على objects بتسأل «هما **نفس** الـ object؟» مش «شبه بعض؟»: [[{val: 1} === {val: 1}]] طلعت [[false]]. فإحنا بنقارن الـ nodes نفسها، مش القيم. والمقارنة **بعد** الحركة، لأنهم بيبدأوا متساويين.

### [[return false;]]

السريع خرج من الـ list: ليها آخر، فمفيش دايرة.

---

## ٢. التتبع: list من غير دايرة

### ٦ nodes: 1 ثم 2 ثم ... ثم 6 ثم null

| اللفة | slow | fast |
|---|---|---|
| البداية | 1 | 1 |
| 1 | 2 | 3 |
| 2 | 3 | 5 |
| 3 | 4 | null |

[[fast]] بقى [[null]] فالـ while وقف: [[false]].

### ٥ nodes: 1 ثم ... ثم 5 ثم null

| اللفة | slow | fast |
|---|---|---|
| البداية | 1 | 1 |
| 1 | 2 | 3 |
| 2 | 3 | 5 |

[[fast]] عند 5 بس [[fast.next]] [[null]]، فالشرط وقف: [[false]]. يعني مع طول زوجي [[fast]] نفسه بيبقى null، ومع فردي [[fast.next]].

---

## ٣. التتبع: نفس الـ ٦ nodes بس 6 بتشاور على 2

الدايرة: 2 ثم 3 ثم 4 ثم 5 ثم 6 ثم ترجع 2 (طولها 5).

| اللفة | slow | fast | المسافة من fast لـ slow جوه الدايرة |
|---|---|---|---|
| البداية | 1 | 1 | |
| 1 | 2 | 3 | 4 |
| 2 | 3 | 5 | 3 |
| 3 | 4 | 2 | 2 |
| 4 | 5 | 4 | 1 |
| 5 | 6 | 6 | 0: اتقابلوا، [[true]] |

في اللفة 3 الـ fast لف (من 6 رجع لـ 2). وبعد ما الاتنين بقوا جوه الدايرة، المسافة بينهم بتقل **واحد بالظبط** كل لفة، لأن السريع بيمشي 2 والبطيء 1. فمستحيل يعدّيه من غير ما يقف عليه.

---

## ٤. الناتج الكامل للمثال

~~~js
const a = { val: 1 }, b = { val: 2 }, c = { val: 3 };
a.next = b; b.next = c; c.next = null;
console.log(hasCycle(a));
c.next = b;
console.log(hasCycle(a));
console.log(hasCycle(null));
~~~

~~~text الناتج (Node 24 على ويندوز)
false
true
false
~~~

- أول مرة 1 ثم 2 ثم 3 ثم null: [[false]].
- [[c.next = b]] عملت دايرة (3 بترجع لـ 2): [[true]].
- [[null]]: [[fast]] null من الأول، والـ while مبتلفّش.

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | البطيء بيدخل الدايرة بعد خطوات أقل من n، والسريع بيلحقه في أقل من لفة حوالين الدايرة (المسافة أقل من طولها وبتقل 1 كل لفة) |
| الذاكرة | [[O(1)]] | مؤشرين بس |

الحل البديهي: [[Set]] فيه كل node شفتها، ولو قابلت واحدة موجودة يبقى فيه دايرة. نفس الوقت، بس [[O(n)]] ذاكرة.

---

## الخلاصة

~~~text
slow       خطوة كل لفة
fast       خطوتين كل لفة
الشرط      fast && fast.next (عشان fast.next.next متقعش)
قارن       بعد الحركة، بـ === على الـ nodes مش القيم
اتقابلوا   فيه دايرة
fast خلص   مفيش
~~~`,
          lines: [
            "true لو فيه دايرة.",
            "الاتنين من الأول.",
            "طول ما الـ fast يقدر يمشي خطوتين.",
            "الـ slow خطوة.",
            "الـ fast خطوتين.",
            "اتقابلوا (نفس الـ node، مش نفس القيمة): فيه دايرة.",
            "قفلة.",
            "الـ fast وصل للآخر: مفيش دايرة.",
            "قفلة.",
            "تلات nodes.",
            "1 ثم 2 ثم 3 ثم null.",
            "من غير دايرة.",
            "خلّي 3 تشاور على 2: دايرة.",
            "فيه دايرة.",
            "list فاضية."
          ],
          sol: R`[[middleNode]]: نفس الـ loop، وبعد ما fast يخلص رجّع slow. [1..5] ترجع 3، و [1..4] ترجع 3 كمان (النص التاني لما الطول زوجي). لو عايز النص الأول، الشرط يبقى [[fast.next && fast.next.next]].

بداية الدايرة: بعد ما slow و fast يتقابلوا، حط [[p = head]] وحرّك p و slow خطوة خطوة، هيتقابلوا عند بداية الدايرة. في [1, 2, 3, 4, 5] وآخرها بيرجع لـ 3، الإجابة العقدة 3، ولو مفيش دايرة ترجع null. الاتنين [[O(n)]] time و [[O(1)]] space.

ليه ده بيشتغل (سؤال انترفيو): لو المسافة من الـ head لبداية الدايرة L، ونقطة التقابل بعد البداية بـ X، والدايرة طولها C، يبقى L = C - X + مضاعفات C. يعني الـ head ونقطة التقابل على نفس المسافة من البداية. الغلطة المشهورة: تحرّك fast خطوتين في المرحلة التانية.`,
          solCode: R`const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  return slow;
}
console.log(middleNode(fromArray([1, 2, 3, 4, 5])).val); // 3
console.log(middleNode(fromArray([1, 2, 3, 4])).val);    // 3  (the second middle for even length)
function cycleStart(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) { p = p.next; slow = slow.next; }
      return p;
    }
  }
  return null;
}
const list = fromArray([1, 2, 3, 4, 5]);
list.next.next.next.next.next = list.next.next; // 5 -> 3
console.log(cycleStart(list).val);            // 3
console.log(cycleStart(fromArray([1, 2])));   // null
// both: O(n) time, O(1) space`,
          check: {
            lang: "js",
            starter: R`function middleNode(head) {
  let slow = head, fast = head;
  // ...
  return slow;
}
function cycleStart(head) {
  // اتقابلوا؟ رجّع مؤشر للـ head وحرّك الاتنين خطوة خطوة
  return null;
}`,
            tests: R`const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = head => {
  const out = [];
  for (let n = head; n; n = n.next) {
    out.push(n.val);
    if (out.length > 100000) throw new Error("الـ list فيها دايرة: عقدتين بيشاوروا على بعض");
  }
  return out;
};
const nodes = n => { const a = Array.from({ length: n }, (_, i) => ({ val: i + 1, next: null })); a.forEach((x, i) => (x.next = a[i + 1] || null)); return a; };
test("middleNode([1..5]) ← 3", () => expect(middleNode(fromArray([1, 2, 3, 4, 5])).val).toBe(3));
test("طول زوجي: middleNode([1..4]) ← 3 (النص التاني)", () => expect(middleNode(fromArray([1, 2, 3, 4])).val).toBe(3));
test("عقدة واحدة ← نفسها", () => expect(middleNode(fromArray([9])).val).toBe(9));
test("cycleStart: [1..5] وآخرها بيرجع لـ 3 ← العقدة 3", () => {
  const a = nodes(5);
  a[4].next = a[2];
  expect(cycleStart(a[0]) === a[2]).toBe(true);
});
test("الدايرة من أول عقدة ← الـ head", () => {
  const a = nodes(4);
  a[3].next = a[0];
  expect(cycleStart(a[0]) === a[0]).toBe(true);
});
test("مفيش دايرة ← null، و null ← null", () => expect([cycleStart(fromArray([1, 2, 3])), cycleStart(null)]).toEqual([null, null]));
test("١٠٠ ألف عقدة ودايرة من النص (O(n) و O(1) ذاكرة)", () => {
  const a = nodes(100000);
  a[99999].next = a[31337];
  expect(cycleStart(a[0]) === a[31337]).toBe(true);
});`,
            solution: R`function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
function cycleStart(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) { p = p.next; slow = slow.next; }
      return p;
    }
  }
  return null;
}`
          }
        },
        {
          cmd: "merge (dummy head)",
          title: "ادمج اتنين linked lists مترتبين في list واحدة مترتبة",
          desc: R`node وهمية ([[dummy]]) في الأول، ومؤشر [[tail]] على آخر node في الناتج. قارن أول الـ listين، وصّل الأصغر في [[tail]] وقدّم في الـ list بتاعته. لما واحدة تخلص، وصّل الباقي من التانية مرة واحدة. [[O(n + m)]] وقت و [[O(1)]] ذاكرة.

ليه الـ dummy؟ من غيرها، أول node في الناتج محتاجة if خاصة («لو الناتج لسه فاضي...»). الـ dummy بتخلي كل الـ nodes تتعامل بنفس الطريقة، وفي الآخر ترجّع [[dummy.next]].

ده نفس الدمج اللي في merge sort، بس على pointers بدل array، ومن غير ما تنسخ حاجة: الـ nodes نفسها بتتربط من جديد.`,
          example: R`const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = h => { const out = []; for (; h; h = h.next) out.push(h.val); return out; };
function mergeTwo(l1, l2) {
  const dummy = { next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}
console.log(toArray(mergeTwo(fromArray([1, 2, 4]), fromArray([1, 3, 4])))); // [1, 1, 2, 3, 4, 4]
console.log(toArray(mergeTwo(null, fromArray([0]))));                       // [0]
// O(n + m) time, O(1) extra space (it relinks the existing nodes)`,
          try: R`ادمج k lists مترتبين. جرّب الأول تدمجهم واحدة واحدة (الـ Big-O كام؟)، وبعدين بالتقسيم: ادمجهم اتنين اتنين زي merge sort، أو بـ min heap (درس «merge k sorted lists» في المستوى التالت). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[mergeKPairs(lists)]] بالتقسيم اتنين اتنين.`,
          flag: "script",
          deep: {
            why: "الدمج بيتكرر في حاجات كتير: merge sort، ودمج نتايج مترتبة من كذا مصدر (لوجات من كذا سيرفر مترتبة بالوقت)، و k-way merge. والـ dummy node بتبسّط أي مسألة linked list بتبني list جديدة أو بتشيل من أولها.",
            how: R`dry run على 1، 2، 4 و 1، 3، 4:

dummy، و tail عليها. قارن 1 و 1: خد من الأولى ([[<=]]). l1 بقت عند 2.

قارن 2 و 1: التانية أصغر، وصّلها. l2 بقت عند 3.

قارن 2 و 3: وصّل 2، و l1 بقت عند 4. قارن 4 و 3: وصّل 3، و l2 بقت عند 4. قارن 4 و 4: وصّل 4 من الأولى. l1 خلصت.

وصّل الباقي من l2 (4). الناتج: 1، 1، 2، 3، 4، 4.

الـ [[<=]] بتخلي الدمج stable: لو قيمتين متساويين، اللي من الـ list الأولى ييجي الأول.

الذاكرة [[O(1)]] لأننا مش بنعمل ولا node جديدة (غير الـ dummy)، بنغيّر الـ [[next]] بس. لو عملت nodes جديدة بقيم منسوخة، يبقى [[O(n + m)]].

ودمج k lists واحدة واحدة: أول دمج بيلمس 2n، والتاني 3n، وهكذا. المجموع حوالي [[O(k² × n)]]. بالتقسيم اتنين اتنين: log k مستوى، وكل مستوى بيلمس كل الـ N عنصر: [[O(N log k)]].`,
            when: "أي «ادمج مترتبين». والـ dummy في أي مسألة ممكن الـ head نفسها تتغير فيها (شيل عناصر من list، أو partition list).",
            mistakes: R`إنك تنسى توصّل الباقي بعد الـ while، فتضيع آخر الـ nodes. وإنك تنسى تقدّم [[tail]] فتفضل تكتب فوق نفس الـ node. وإنك ترجّع [[dummy]] بدل [[dummy.next]]. والـ edge cases: الاتنين فاضيين، وواحدة فاضية، وكل عناصر واحدة أصغر من كل عناصر التانية.`
          },
          teach: R`## الفكرة في جملة

الاتنين lists مترتبين، فأصغر node في الاتنين لازم تكون أول واحدة في l1 أو أول واحدة في l2. قارن الأولتين، وصّل الأصغر في آخر الناتج، واتقدّم في الـ list اللي خدت منها. ولما واحدة تخلص، الباقي من التانية مترتب أصلًا: وصّله كله مرة واحدة. ومفيش nodes جديدة: بنعيد توصيل الأسهم بس.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع المؤشرات.

---

## ١. الأدوات المساعدة

~~~js
const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = h => { const out = []; for (; h; h = h.next) out.push(h.val); return out; };
~~~

### [[fromArray]]

[[reduceRight]] زي [[reduce]] بس بتمشي من **آخر** الـ array لأولها. بتبدأ بـ [[null]]، ومع كل قيمة بتعمل node بتشاور على اللي اتعمل قبلها. على [2, 5, 7] طبعنا الترتيب: 7 (next = null) الأول، وبعدين 5 (next = 7)، وبعدين 2 (next = 5). وآخر واحدة اتعملت هي الـ head. ليه من الآخر؟ لأن كل node محتاجة اللي بعدها يكون موجود وقت ما تتعمل.

### [[toArray]]

بتمشي بـ [[h = h.next]] لحد [[null]] وتجمع القيم، عشان نطبع.

---

## ٢. [[mergeTwo]] سطر سطر

~~~js
function mergeTwo(l1, l2) {
  const dummy = { next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}
~~~

### [[const dummy = { next: null };]]

node وهمية قبل أول الناتج، ملهاش قيمة. فايدتها إن «وصّل في آخر الناتج» بقت نفس السطر دايمًا ([[tail.next = ...]])، حتى لأول node. من غيرها كنا هنحتاج if: «لو الناتج لسه فاضي، الـ node دي هي الـ head».

### [[let tail = dummy;]]

[[tail]] بيشاور على آخر node في الناتج لحد دلوقتي. في الأول الناتج فاضي، فآخره هو الـ dummy.

### [[while (l1 && l2)]]

[[l1]] و [[l2]] مش الـ lists كلها، دول مؤشرين على أول node لسه ماتاخدتش من كل list. الـ loop شغال طول ما الاتنين فيهم nodes.

### الـ if والـ else

- [[l1.val <= l2.val]]: الأصغر أو المساوي من l1 ← وصّله ([[tail.next = l1]]) وقدّم [[l1]].
- غير كده: نفس الكلام من l2.

[[<=]] مش [[<]]: وقت التساوي بناخد من الأولى، فالترتيب الأصلي للمتساويين بيتحفظ (stable).

### [[tail = tail.next;]]

الـ node اللي لسه واصلينها بقت آخر الناتج. لو نسيت السطر ده، كل node جديدة هتتكتب فوق اللي قبلها في نفس [[tail.next]].

### [[tail.next = l1 || l2;]]

واحدة خلصت (بقت [[null]]). [[||]] بترجّع أول قيمة مش falsy: [[null || 3]] طلعت 3، و [[4 || null]] طلعت 4. يعني وصّل اللي فاضل، وهو مترتب أصلًا. ولو الاتنين [[null]] بترجع [[null]].

### [[return dummy.next;]]

الناتج الحقيقي بيبدأ بعد الـ dummy.

---

## ٣. التتبع: 2 ثم 5 ثم 7، مع 1 ثم 5 ثم 9 ثم 10

| الخطوة | l1.val و l2.val | خدنا | l1 بعدها | l2 بعدها | الناتج لحد tail |
|---|---|---|---|---|---|
| 1 | 2 و 1 | 1 من l2 | 2 | 5 | [1] |
| 2 | 2 و 5 | 2 من l1 | 5 | 5 | [1, 2] |
| 3 | 5 و 5 | 5 من **l1** (<=) | 7 | 5 | [1, 2, 5] |
| 4 | 7 و 5 | 5 من l2 | 7 | 9 | [1, 2, 5, 5] |
| 5 | 7 و 9 | 7 من l1 | null | 9 | [1, 2, 5, 5, 7] |
| بعد الـ while | | وصّل 9 ثم 10 مرة واحدة | | | [1, 2, 5, 5, 7, 9, 10] |

- في الخطوة 3 التساوي راح للأولى. واتأكدنا في الآخر إن الـ node الـ 5 بتاعة l1 (نفس الـ object) موجودة في الناتج والـ next بتاعها هو الـ 5 بتاعة l2.
- لما طبعنا الناتج كله في نص الشغل، كان بيطلع أطول من اللي فوق (مثلًا بعد الخطوة 1: [1, 5, 9, 10]). ليه؟ لأن [[tail]] لسه بيشاور بسهمه القديم على باقي الـ list اللي جه منها، لحد ما اللفة الجاية تكتب فوقه بـ [[tail.next = ...]]. وآخر سطر بعد الـ while هو اللي بيصلّح آخر سهم.
- الـ 9 و 10 مااتقارنوش خالص: اتوصلوا في خطوة واحدة.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 1, 1, 2, 3, 4, 4 ]
[ 0 ]
~~~

- [1, 2, 4] مع [1, 3, 4]: المتساويين جنب بعض.
- [[mergeTwo(null, [0])]]: الـ while مبتلفّش، و [[tail.next = null || l2]] بتوصّل التانية كلها في الـ dummy.

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n + m)]] | كل لفة بتاخد node واحدة، والباقي بيتوصل في خطوة |
| الذاكرة | [[O(1)]] زيادة | الـ dummy بس. الـ nodes نفسها بتتربط من جديد، مش بتتنسخ |

---

## الخلاصة

~~~text
dummy          node وهمية عشان أول وصلة زي أي وصلة
tail           آخر الناتج، ويتقدّم بعد كل وصلة
<=             التساوي من الأولى: stable
الباقي         tail.next = l1 || l2
رجّع           dummy.next
~~~

> الـ dummy مفيدة في أي مسألة linked list ممكن الـ head نفسها تتغير فيها.`,
          lines: [
            "بتحوّل array لـ linked list (من الآخر للأول).",
            "بتحوّل list لـ array عشان نطبعها.",
            "ترجّع head الـ list المدموجة.",
            "node وهمية قبل أول الناتج.",
            "tail: آخر node في الناتج لحد دلوقتي.",
            "طول ما الاتنين فيهم nodes.",
            "الأصغر (أو المساوي) من l1: وصّله وقدّم l1.",
            "غير كده من l2.",
            "tail بقى الـ node اللي لسه واصلينها.",
            "قفلة.",
            "واحدة خلصت: وصّل الباقي من التانية كله مرة واحدة (مترتب أصلًا).",
            "الناتج بيبدأ بعد الـ dummy.",
            "قفلة.",
            "دمج عادي، والمتساويين جنب بعض.",
            "واحدة فاضية: الناتج هو التانية."
          ],
          sol: R`واحدة واحدة: النتيجة الصح [[1 1 2 3 4 4 5 6]]، بس النتيجة بتكبر وبتتمشي من الأول مع كل list، فلو N عدد العقد كلها و k عدد الـ lists يبقى [[O(N * k)]].

اتنين اتنين: كل دورة ادمج [0 مع 1]، [2 مع 3]... فعدد الـ lists بيقل للنص. عندك [[log k]] دورة، وكل دورة بتلمس كل العقد، فده [[O(N log k)]] ونفس الناتج. خلي بالك من العدد الفردي ([[lists[i + 1] || null]]) ومن input فاضي (رجّع null). الـ min heap بيدّي نفس الـ [[O(N log k)]].

الغلطة المشهورة: تنسخ العقد لـ array وتعمل sort. ده [[O(N log N)]] و [[O(N)]] space، وبيضيّع الفكرة اللي الانترفيو عايز يشوفها.`,
          solCode: R`const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = h => { const out = []; for (; h; h = h.next) out.push(h.val); return out; };
function mergeTwo(l1, l2) {
  const dummy = { next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}
function mergeOneByOne(lists) {
  let result = null;
  for (const l of lists) result = mergeTwo(result, l);
  return result;
}
function mergeKPairs(lists) {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const next = [];
    for (let i = 0; i < lists.length; i += 2) next.push(mergeTwo(lists[i], lists[i + 1] || null));
    lists = next;
  }
  return lists[0];
}
const make = () => [fromArray([1, 4, 5]), fromArray([1, 3, 4]), fromArray([2, 6])];
console.log(toArray(mergeOneByOne(make())).join(" ")); // 1 1 2 3 4 4 5 6
console.log(toArray(mergeKPairs(make())).join(" "));   // 1 1 2 3 4 4 5 6
console.log(mergeKPairs([]), toArray(mergeKPairs([null, fromArray([0])]))); // null [0]
// N = all nodes, k = lists: one by one O(N * k) (the growing result is re-walked k times)
// pairs: O(N log k) time (log k rounds, each touches all N nodes), O(k) space for the array of heads`,
          check: {
            lang: "js",
            starter: R`function mergeTwo(l1, l2) {
  const dummy = { next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}
function mergeKPairs(lists) {
  // ادمج [0 مع 1]، [2 مع 3]... لحد ما تفضل واحدة
  return null;
}`,
            tests: R`const fromArray = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = head => {
  const out = [];
  for (let n = head; n; n = n.next) {
    out.push(n.val);
    if (out.length > 100000) throw new Error("الـ list فيها دايرة: عقدتين بيشاوروا على بعض");
  }
  return out;
};
test("[[1, 4, 5], [1, 3, 4], [2, 6]] ← [1, 1, 2, 3, 4, 4, 5, 6]", () => expect(toArray(mergeKPairs([[1, 4, 5], [1, 3, 4], [2, 6]].map(fromArray)))).toEqual([1, 1, 2, 3, 4, 4, 5, 6]));
test("[] ← null", () => expect(mergeKPairs([])).toBe(null));
test("[null, [0]] ← [0]", () => expect(toArray(mergeKPairs([null, fromArray([0])]))).toEqual([0]));
test("عدد فردي (5 lists): lists[i + 1] || null", () => expect(toArray(mergeKPairs([[5], [1], [4], [2], [3]].map(fromArray)))).toEqual([1, 2, 3, 4, 5]));
test("200 list × 50 عقدة (O(N log k))", () => {
  const lists = Array.from({ length: 200 }, (_, i) => fromArray(Array.from({ length: 50 }, (_, j) => j * 200 + i)));
  const r = toArray(mergeKPairs(lists));
  expect([r.length, r.every((x, i) => x === i)]).toEqual([10000, true]);
});`,
            solution: R`function mergeTwo(l1, l2) {
  const dummy = { next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}
function mergeKPairs(lists) {
  if (lists.length === 0) return null;
  while (lists.length > 1) {
    const next = [];
    for (let i = 0; i < lists.length; i += 2) next.push(mergeTwo(lists[i], lists[i + 1] || null));
    lists = next;
  }
  return lists[0];
}`
          }
        },
        {
          cmd: "merge intervals",
          title: "ادمج الفترات اللي بتتداخل: [1, 3] و [2, 6] يبقوا [1, 6]",
          desc: R`رتّب الفترات بالبداية. بعد الترتيب، الفترة اللي بتتداخل مع اللي قبلها لازم تكون جنبها. فامشي عليهم: لو بداية الفترة ≤ نهاية آخر فترة في الناتج، مدّ النهاية. غير كده، ابدأ فترة جديدة. [[O(n log n)]] بسبب الـ sort.

[[Math.max]] في المدّ مهمة: الفترة الجديدة ممكن تكون جوه القديمة بالكامل ([1, 10] و [2, 3])، ووقتها النهاية متتغيرش.

ولو فترتين بيلمسوا بعض بس ([1, 4] و [4, 5]) هنا اعتبرناهم متداخلين ([[<=]]). ده بيختلف من مسألة للتانية، فاسأل.`,
          example: R`function mergeIntervals(list) {
  const sorted = [...list].sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [start, end] of sorted) {
    const last = out.at(-1);
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
}
console.log(mergeIntervals([[1, 3], [8, 10], [2, 6], [15, 18]])); // [[1, 6], [8, 10], [15, 18]]
console.log(mergeIntervals([[1, 4], [4, 5]]));                    // [[1, 5]]
console.log(mergeIntervals([[1, 10], [2, 3]]));                   // [[1, 10]]
console.log(mergeIntervals([]));                                  // []
// O(n log n) time for the sort, O(n) space for the output`,
          try: R`حل insert interval: عندك فترات مترتبة ومش متداخلة، ضيف فترة جديدة وادمج اللي لازم يتدمج، في O(n) من غير sort. وبعدين: «أقل عدد قاعات اجتماعات» لمواعيد متداخلة (رتّب البدايات لوحدها والنهايات لوحدها وامشي بمؤشرين). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[insertInterval(intervals, newInterval)]] و [[minMeetingRooms(intervals)]].`,
          flag: "script",
          deep: {
            why: "الفترات في كل حتة في الشغل: مواعيد حجز، وورديات، وفترات اشتراك، و time ranges في الـ analytics. «الميعاد ده بيتعارض مع ميعاد تاني؟» و «إجمالي الوقت اللي الموظف كان online فيه» كلها merge intervals.",
            how: R`dry run على [1, 3] و [8, 10] و [2, 6] و [15, 18]:

بعد الـ sort بالبداية: [1, 3] و [2, 6] و [8, 10] و [15, 18].

[1, 3]: الناتج فاضي، ضيفها.

[2, 6]: البداية 2 ≤ 3 (نهاية آخر فترة): متداخلين. النهاية تبقى الأكبر بين 3 و 6، يعني 6. الناتج [1, 6].

[8, 10]: 8 > 6، فترة جديدة. [15, 18]: 15 > 10، فترة جديدة.

ليه الـ sort ضروري؟ من غيره، [8, 10] ممكن تيجي قبل [2, 6]، وساعتها [2, 6] هتتقارن بـ [8, 10] بس، ومش هتتدمج مع [1, 3].

ليه المقارنة بآخر فترة بس كفاية؟ بعد الترتيب، كل الفترات اللي في الناتج قبل الأخيرة بتخلص قبل بداية الأخيرة. فلو الفترة الجديدة مبتتداخلش مع الأخيرة، مبتتداخلش مع اللي قبلها.

الـ Big-O: [[O(n log n)]] للـ sort، و [[O(n)]] للـ loop. والذاكرة [[O(n)]] للناتج والنسخة.`,
            when: "أي مسألة فيها «فترات» أو «مواعيد» أو «ranges»: ادمج، أو اعرف التعارض، أو احسب الوقت الكلي. وأول خطوة تقريبًا دايمًا: رتّب بالبداية (أو بالنهاية في مسائل الـ greedy، زي درس «greedy (interval scheduling)» في المستوى التالت).",
            mistakes: R`إنك تنسى الـ sort. وإنك تكتب [[last[1] = end]] بدل [[Math.max]] فالفترة اللي جوه فترة تقصّرها. وإنك تعدّل الـ input: [[sort]] بتغيّر الـ array الأصلية، ولو حطيت الفترة الأصلية نفسها في الناتج وبعدين مدّيت نهايتها، إنت بتعدّل بيانات جاية من برّا. وإنك متسألش: الفترات اللي بتلمس بعض بتتدمج ولا لأ؟`
          },
          teach: R`## الفكرة في جملة

رتّب الفترات بالبداية. بعد الترتيب، أي فترة بتتداخل مع اللي قبلها لازم تكون **جنبها** في الترتيب. فامشي عليهم بالترتيب ومعاك الناتج: لو الفترة الجديدة بتبدأ قبل ما آخر فترة في الناتج تخلص، يبقى متداخلين: مدّ نهاية الأخيرة. غير كده ابدأ فترة جديدة.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع القرار والناتج.

---

## ١. الكود سطر سطر

~~~js
function mergeIntervals(list) {
  const sorted = [...list].sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [start, end] of sorted) {
    const last = out.at(-1);
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
}
~~~

### [[const sorted = [...list].sort((a, b) => a[0] - b[0]);]]

من جوه لبرة:

1. [[[...list]]]: نسخة جديدة من الـ array (الـ spread بيفرد العناصر في array جديدة). ليه؟ لأن [[sort]] بتغيّر الـ array اللي بتشتغل عليها، ومش عايزين نلخبط ترتيب بيانات جاية من برّا.
2. [[.sort((a, b) => a[0] - b[0])]]: كل فترة array من رقمين [بداية، نهاية]، و [[a[0]]] البداية. يعني رتّب تصاعدي بالبداية.

### [[for (const [start, end] of sorted)]]

[[[start, end]]] هنا destructuring: بيفك الفترة لمتغيرين. [[const [s, e] = [3, 8]]] بيدّي s = 3 و e = 8.

### [[const last = out.at(-1);]]

آخر فترة في الناتج. ولو الناتج فاضي [[[].at(-1)]] بترجع [[undefined]].

### [[if (last && start <= last[1])]]

- [[last &&]]: لو مفيش آخر فترة (أول لفة)، [[&&]] بتقف ومبتقراش [[last[1]]].
- [[start <= last[1]]]: الجديدة بتبدأ قبل (أو عند) نهاية الأخيرة: متداخلين. الـ [[<=]] معناها إن [1, 4] و [4, 5] اللي بيلمسوا بعض عند 4 بيتدمجوا.

### [[last[1] = Math.max(last[1], end);]]

مدّ النهاية لأبعد واحدة. ليه [[Math.max]] مش [[= end]] بس؟ لأن الجديدة ممكن تكون جوه القديمة بالكامل ([1, 10] و [2, 3])، ووقتها [[= end]] كانت هتقصّر الفترة لـ 3.

### [[else out.push([start, end]);]]

مش متداخلين: فترة جديدة. [[[start, end]]] array **جديدة**، مش الفترة الأصلية، عشان لما نمدّ نهايتها بعدين منعدّلش الـ input.

---

## ٢. التتبع على [[[[5, 7], [1, 4], [2, 3], [6, 9], [11, 12]]]]

بعد الـ sort: [[[[1,4],[2,3],[5,7],[6,9],[11,12]]]].

| الفترة | آخر نهاية في الناتج | القرار | الناتج بعدها |
|---|---|---|---|
| [1, 4] | مفيش | جديدة (الناتج فاضي) | [[1, 4]] |
| [2, 3] | 4 | 2 ≤ 4 متداخلين، النهاية max(4, 3) = 4 | [[1, 4]] |
| [5, 7] | 4 | 5 > 4، جديدة | [[1, 4], [5, 7]] |
| [6, 9] | 7 | 6 ≤ 7 متداخلين، النهاية max(7, 9) = 9 | [[1, 4], [5, 9]] |
| [11, 12] | 9 | 11 > 9، جديدة | [[1, 4], [5, 9], [11, 12]] |

- [2, 3] جوه [1, 4] بالكامل: الـ [[Math.max]] هي اللي حافظت على النهاية 4.
- بعد ما خلصنا طبعنا الـ input تاني ولقيناه زي ما هو: [[[[5,7],[1,4],[2,3],[6,9],[11,12]]]].

### ليه المقارنة بآخر فترة بس كفاية؟

بعد الترتيب، كل فترة في الناتج قبل الأخيرة بتخلص **قبل** ما الأخيرة تبدأ (وإلا كانوا اتدمجوا). والجديدة بتبدأ بعد بداية الأخيرة. فلو مبتتداخلش مع الأخيرة، مستحيل تتداخل مع اللي قبلها.

### ولو منسيناش الـ sort؟

على الترتيب الأصلي، [5, 7] كانت هتدخل الأول، و [1, 4] تيجي بعدها: 1 ≤ 7 فهتتحسب «متداخلة» وتختفي جوه [5, 7]. جرّبناها من غير الـ sort والناتج طلع [[[[5,9],[11,12]]]]: البداية 1 ضاعت. الـ sort هو اللي بيخلّي الشرط ده صح.

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
[ [ 1, 5 ] ]
[ [ 1, 10 ] ]
[]
~~~

- [1, 3] و [2, 6] اتدمجوا لـ [1, 6]، والباقي منفصل.
- [1, 4] و [4, 5] بيلمسوا عند 4: اتدمجوا بسبب [[<=]].
- [2, 3] جوه [1, 10]: النهاية فضلت 10.
- الفاضية: الـ for مبتلفّش.

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n log n)]] | الـ sort. الـ loop بعده [[O(n)]]، والأكبر هو اللي بيكسب |
| الذاكرة | [[O(n)]] | النسخة المترتبة والناتج |

---

## الخلاصة

~~~text
رتّب          نسخة [...list] بالبداية
متداخلين      start <= آخر نهاية (اللمس بيتدمج هنا)
مدّ           Math.max عشان الفترة اللي جوه فترة
جديدة         push نسخة [start, end]
بآخر واحدة    كفاية بعد الترتيب
~~~

> اسأل دايمًا: الفترات اللي بتلمس بعض بتتدمج ولا لأ؟ الإجابة بتحدد [[<=]] أو [[<]].`,
          lines: [
            "كل فترة [بداية، نهاية].",
            "نسخة مترتبة بالبداية (من غير ما نغيّر الأصلية).",
            "الفترات المدموجة.",
            "عدّي عليهم بالترتيب.",
            "آخر فترة في الناتج (أو undefined لو فاضي).",
            "بتبدأ قبل ما آخر فترة تخلص: متداخلين، مدّ النهاية لأبعد واحدة.",
            "غير كده: فترة جديدة (نسخة عشان منعدّلش الـ input).",
            "قفلة.",
            "الناتج.",
            "قفلة.",
            "[1, 3] و [2, 6] اتدمجوا، والباقي منفصل.",
            "بيلمسوا بعض عند 4: اتدمجوا.",
            "واحدة جوه التانية: [[Math.max]] خلّت النهاية 10.",
            "فاضية."
          ],
          sol: R`insert interval في 3 مراحل: ضيف كل فترة بتخلص قبل البداية ([[end < s]]) زي ما هي، وبعدين ادمج كل فترة بتبدأ قبل النهاية ([[start <= e]]) بإنك تكبّر s و e، وضيف الفترة المدموجة، وبعدين الباقي. [[[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]]] مع [4, 8] تبقى [[[[1, 2], [3, 10], [12, 16]]]]. [[O(n)]] من غير sort.

القاعات: رتّب البدايات لوحدها والنهايات لوحدها. لكل بداية، اقفل كل اجتماع خلص ([[ends[j] <= start]]) وقلّل القاعات، وبعدين زوّد واحدة. أعلى رقم وصلته هو الإجابة: [[[[0, 30], [5, 10], [15, 20]]]] تطلع 2. [[O(n log n)]] بسبب الـ sort.

الغلطة المشهورة: [[<]] بدل [[<=]] في شرط الخلصان. كده [1, 5] و [5, 10] يحتاجوا قاعتين، مع إن الاجتماع اللي خلص الساعة 5 بيسيب القاعة للي بيبدأ الساعة 5.`,
          solCode: R`function insertInterval(list, [s, e]) {
  const out = [];
  let i = 0;
  while (i < list.length && list[i][1] < s) out.push(list[i++]);
  while (i < list.length && list[i][0] <= e) {
    s = Math.min(s, list[i][0]);
    e = Math.max(e, list[i][1]);
    i++;
  }
  out.push([s, e]);
  while (i < list.length) out.push(list[i++]);
  return out;
}
console.log(JSON.stringify(insertInterval([[1, 3], [6, 9]], [2, 5])));                     // [[1,5],[6,9]]
console.log(JSON.stringify(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]))); // [[1,2],[3,10],[12,16]]
console.log(JSON.stringify(insertInterval([], [4, 8])));                                   // [[4,8]]
function minMeetingRooms(meetings) {
  const starts = meetings.map(m => m[0]).sort((a, b) => a - b);
  const ends = meetings.map(m => m[1]).sort((a, b) => a - b);
  let rooms = 0, best = 0, j = 0;
  for (let i = 0; i < starts.length; i++) {
    while (ends[j] <= starts[i]) { j++; rooms--; }
    rooms++;
    best = Math.max(best, rooms);
  }
  return best;
}
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
console.log(minMeetingRooms([[7, 10], [2, 4]]));            // 1
console.log(minMeetingRooms([[1, 5], [5, 10]]));            // 1  (a meeting ending at 5 frees the room for one starting at 5)
// insert: O(n) time and O(n) output; rooms: O(n log n) time for the sorts, O(n) space`,
          check: {
            lang: "js",
            starter: R`function insertInterval(intervals, newInterval) {
  const out = [];
  let [s, e] = newInterval;
  // ٣ مراحل: اللي قبل، واللي بيتداخل، واللي بعد
  return out;
}
function minMeetingRooms(intervals) {
  const starts = intervals.map(x => x[0]).sort((a, b) => a - b);
  const ends = intervals.map(x => x[1]).sort((a, b) => a - b);
  // ...
  return 0;
}`,
            tests: R`test("[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]] + [4, 8] ← [[1, 2], [3, 10], [12, 16]]", () => expect(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])).toEqual([[1, 2], [3, 10], [12, 16]]));
test("ليستة فاضية ← الفترة لوحدها", () => expect(insertInterval([], [5, 7])).toEqual([[5, 7]]));
test("قبل الكل وبعد الكل وجوه واحدة", () => {
  expect(insertInterval([[3, 5]], [1, 2])).toEqual([[1, 2], [3, 5]]);
  expect(insertInterval([[1, 5]], [6, 8])).toEqual([[1, 5], [6, 8]]);
  expect(insertInterval([[1, 5]], [2, 3])).toEqual([[1, 5]]);
});
test("فترتين بيلمسوا بعض بيتدمجوا: [[1, 2]] + [2, 3] ← [[1, 3]]", () => expect(insertInterval([[1, 2]], [2, 3])).toEqual([[1, 3]]));
test("minMeetingRooms([[0, 30], [5, 10], [15, 20]]) ← 2", () => expect(minMeetingRooms([[0, 30], [5, 10], [15, 20]])).toBe(2));
test("[[1, 5], [5, 10]] ← 1 (<= في شرط الخلصان)", () => expect(minMeetingRooms([[1, 5], [5, 10]])).toBe(1));
test("[[1, 10], [2, 9], [3, 8]] ← 3، و [] ← 0", () => expect([minMeetingRooms([[1, 10], [2, 9], [3, 8]]), minMeetingRooms([])]).toEqual([3, 0]));`,
            solution: R`function insertInterval(intervals, newInterval) {
  const out = [];
  let [s, e] = newInterval, i = 0;
  while (i < intervals.length && intervals[i][1] < s) out.push(intervals[i++]);
  while (i < intervals.length && intervals[i][0] <= e) {
    s = Math.min(s, intervals[i][0]);
    e = Math.max(e, intervals[i][1]);
    i++;
  }
  out.push([s, e]);
  while (i < intervals.length) out.push(intervals[i++]);
  return out;
}
function minMeetingRooms(intervals) {
  const starts = intervals.map(x => x[0]).sort((a, b) => a - b);
  const ends = intervals.map(x => x[1]).sort((a, b) => a - b);
  let rooms = 0, best = 0, j = 0;
  for (const start of starts) {
    while (ends[j] <= start) { rooms--; j++; }
    rooms++;
    best = Math.max(best, rooms);
  }
  return best;
}`
          }
        }
      ]
    }
]);
