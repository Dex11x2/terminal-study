// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "sorting",
      l: 2,
      n: "إزاي الـ sort بيشتغل من جوه، وإزاي تكتب comparator صح في JS",
      items: [
        {
          cmd: "merge sort",
          title: "رتّب array في O(n log n) مضمونة حتى في أسوأ حالة",
          desc: R`قسّم الـ array نصين، رتّب كل نص بنفس الطريقة (recursion)، وبعدين ادمج النصين المترتبين في واحد مترتب. الدمج بمؤشرين: كل مرة خد الأصغر من أول النصين. [[O(n log n)]] دايمًا.

ليه [[n log n]]؟ التقسيم بيعمل log n مستوى (كل مستوى الأجزاء بتتقسم نصين). وفي كل مستوى، الدمج بيلمس كل العناصر مرة: n. يعني n × log n.

و merge sort stable (العناصر المتساوية بتفضل بترتيبها الأصلي) بسبب [[<=]] في الدمج. وعيبه إنه محتاج [[O(n)]] ذاكرة زيادة للدمج.`,
          example: R`function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = a.length >> 1;
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}
console.log(mergeSort([5, 2, 9, 1, 5, 6])); // [1, 2, 5, 5, 6, 9]
console.log(mergeSort([]));                 // []
// O(n log n) time in every case, O(n) extra space; stable`,
          try: R`اكتب دمج اتنين array مترتبين لوحده، ده سؤال انترفيو لوحده. وبعدين عدّ الـ inversions: كام زوج (i < j) العنصر الأول فيه أكبر من التاني؟ عدّل الدمج: كل ما تاخد من اليمين، زوّد العدّاد بعدد العناصر الفاضلة في الشمال. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[mergeSorted(a, b)]] و [[countInversions(a)]].`,
          flag: "script",
          deep: {
            why: "في الشغل مش هتكتب sort بإيدك، [[Array.prototype.sort]] موجودة. بس merge sort هو أوضح مثال على divide and conquer، والانترفيو بيسأل عنه («اشرح merge sort» أو «ليه O(n log n)»). وفكرة الدمج نفسها بتتكرر: دمج linked lists، ودمج نتايج من أكتر من سيرفر، و external sort لملف أكبر من الرام.",
            how: R`dry run على [5, 2, 9, 1]:

التقسيم: [5, 2] و [9, 1]. بعدين [5] و [2]، و [9] و [1]. كل واحدة عنصر واحد، مترتبة.

الدمج من تحت: [5] مع [2]: 2 أصغر، بعدين 5، يعني [2, 5]. و [9] مع [1] بتبقى [1, 9].

الدمج الأخير: [2, 5] مع [1, 9]. قارن 2 و 1، خد 1. قارن 2 و 9، خد 2. قارن 5 و 9، خد 5. الشمال خلص، ضيف 9. النتيجة [1, 2, 5, 9].

الـ Big-O بالتفصيل: كل مستوى من الشجرة فيه أجزاء مجموع أطوالها n، والدمج في المستوى كله [[O(n)]]. وعدد المستويات [[log₂ n]] لأن كل مستوى بيقسم نصين. المجموع [[O(n log n)]]، ومفيش حالة أسوأ: مش فارق الـ array مترتبة ولا مقلوبة.

الذاكرة: [[out]] والـ [[slice]] بياخدوا [[O(n)]] في كل مستوى، بس مش كلهم عايشين في نفس الوقت. الأقصى [[O(n)]]، زائد [[O(log n)]] للـ call stack.

الـ TimSort (اللي في V8 و Python) هو merge sort متطوّر: بيدوّر على أجزاء مترتبة أصلًا في البيانات ويدمجها، فعلى بيانات شبه مترتبة بيقرّب من [[O(n)]].`,
            when: "لما محتاج ترتيب مضمون O(n log n) و stable. ولما البيانات أكبر من الرام (external sort: رتّب قطع وادمجها). ولما بتدمج مصادر مترتبة أصلًا.",
            mistakes: R`إنك تنسى تضيف الباقي بعد الـ while، فيضيع آخر عنصر أو أكتر. وإنك تستخدم [[<]] بدل [[<=]] فيبقى مش stable. وإنك تقول space [[O(1)]]: الدمج محتاج مكان. وإنك تفتكر إن merge sort أسرع من quick sort دايمًا: عمليًا quick sort غالبًا أسرع على الـ arrays لأنه in-place وبيستغل الـ cache أحسن، مع إن worst case بتاعه أوحش.`
          },
          teach: R`## الفكرة في جملة

array فيها عنصر واحد مترتبة أصلًا. فقسّم الـ array نصين، وكل نص قسّمه نصين، لحد ما توصل لعناصر لوحدها. وبعدين ارجع لفوق وادمج كل نصين **مترتبين** في واحد مترتب. والدمج سهل: النصين مترتبين، فالأصغر في الكل لازم يكون أول واحد في الشمال أو أول واحد في اليمين، فقارن الاتنين وخد الأصغر، وكرّر.

ده اسمه divide and conquer: قسّم المسألة لمسائل أصغر من نفس النوع، حلّهم، واجمع الحلول.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع كل تقسيمة وكل مقارنة في الدمج.

---

## ١. الكود سطر سطر

~~~js
function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = a.length >> 1;
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}
~~~

### [[if (a.length <= 1) return a;]]

الـ base case: الحالة اللي الـ recursion بيقف عندها. فاضية أو عنصر واحد يبقى مترتبة ومفيش حاجة تتعمل. من غير السطر ده الدالة هتنادي نفسها للأبد.

### [[const mid = a.length >> 1;]]

[[>>]] بيزق الـ bits خانة لليمين، وده قسمة على ٢ مع تقريب لتحت: [[5 >> 1]] طلعت 2، و [[4 >> 1]] طلعت 2.

### [[mergeSort(a.slice(0, mid))]] و [[mergeSort(a.slice(mid))]]

[[slice(start, end)]] بترجّع **نسخة** من start لحد قبل end، ومن غير end لحد الآخر. على [1, 2, 3]: [[slice(0, 1)]] طلعت [[[ 1 ]]] و [[slice(1)]] طلعت [[[ 2, 3 ]]]. والدالة بتنادي نفسها على كل نص (recursion)، وبنثق إنها هترجّعه مترتب.

### [[const out = []; let i = 0, j = 0;]]

[[out]] الناتج المدموج. [[i]] مؤشر على أول عنصر لسه ماتاخدش من [[left]]، و [[j]] نفس الكلام في [[right]].

### [[while (i < left.length && j < right.length)]]

طول ما النصين لسه فيهم عناصر.

### [[out.push(left[i] <= right[j] ? left[i++] : right[j++]);]]

من جوه لبرة:

1. [[left[i] <= right[j]]]: مين أصغر؟
2. الـ ternary [[? :]]: لو الشمال أصغر أو مساوي خد [[left[i++]]]، غير كده [[right[j++]]].
3. [[i++]] post-increment: بيرجّع [[left[i]]] بالـ i القديمة، وبعدين يقدّم المؤشر.
4. [[out.push(...)]]: حطه في الناتج.

ليه [[<=]] مش [[<]]؟ وقت التساوي بناخد من الشمال، فالعناصر المتساوية بتفضل بترتيبها الأصلي. ده اسمه **stable**.

### [[return out.concat(left.slice(i), right.slice(j));]]

الـ while وقف لأن نص واحد خلص. النص التاني فاضل فيه عناصر، وهي مترتبة وأكبر من كل اللي في [[out]]. [[concat]] بتلزق arrays ورا بعض في array جديدة: [[[1].concat([], [2, 3])]] طلعت [[[ 1, 2, 3 ]]]. واحد من الـ slices هيبقى فاضي دايمًا، فمش فارق مين.

---

## ٢. التتبع على [[[8, 3, 5, 1, 4]]]

### التقسيم (نازلين)

~~~text التقسيم
[8, 3, 5, 1, 4]        mid = 2
[8, 3]   [5, 1, 4]     mid = 1 لكل واحدة
[8] [3]  [5] [1, 4]
             [1] [4]
~~~

خمس نداءات وصلت للـ base case (عنصر واحد).

### الدمج (طالعين)

| الدمج | المقارنة | خدنا | i | j | out |
|---|---|---|---|---|---|
| [8] مع [3] | 8 و 3 | 3 | 0 | 1 | [3] |
| | اليمين خلص، ضيف [8] | | | | [3, 8] |
| [1] مع [4] | 1 و 4 | 1 | 1 | 0 | [1] |
| | الشمال خلص، ضيف [4] | | | | [1, 4] |
| [5] مع [1, 4] | 5 و 1 | 1 | 0 | 1 | [1] |
| | 5 و 4 | 4 | 0 | 2 | [1, 4] |
| | اليمين خلص، ضيف [5] | | | | [1, 4, 5] |
| [3, 8] مع [1, 4, 5] | 3 و 1 | 1 | 0 | 1 | [1] |
| | 3 و 4 | 3 | 1 | 1 | [1, 3] |
| | 8 و 4 | 4 | 1 | 2 | [1, 3, 4] |
| | 8 و 5 | 5 | 1 | 3 | [1, 3, 4, 5] |
| | اليمين خلص، ضيف [8] | | | | [1, 3, 4, 5, 8] |

في كل دمج الـ while بيوقف قبل الآخر، و [[concat]] هي اللي بتضيف الباقي. لو شلتها، الـ 8 كانت هتضيع.

### الـ stability بتجربة

رتّبنا بنفس الكود (بمقارنة [[k]]) objects بالترتيب: [[{k:2,n:"a"}]] و [[{k:1,n:"b"}]] و [[{k:2,n:"c"}]] و [[{k:1,n:"d"}]]. الناتج: b ثم d ثم a ثم c. الاتنين اللي k بتاعهم 1 فضلوا b قبل d زي الأصل، ونفس الكلام لـ a و c.

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 1, 2, 5, 5, 6, 9 ]
[]
~~~

الـ 5 المكررة طلعت مرتين جنب بعض، والفاضية رجعت من الـ base case على طول.

---

## ٤. الـ Big-O وليه

- **عدد المستويات:** كل مستوى بيقسم الأجزاء نصين، فمن n لحد 1 محتاج [[log₂ n]] مستوى (في المثال: ٥ عناصر، ٣ مستويات).
- **الشغل في كل مستوى:** الأجزاء في نفس المستوى مجموع أطوالها n، وكل عنصر بيتنقل لـ [[out]] مرة في الدمج: [[O(n)]].
- المجموع n × log n، ومش فارق شكل الـ input: مترتب أو مقلوب، نفس التقسيم ونفس الدمج.

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n log n)]] | log n مستوى × n في كل مستوى، في كل الحالات |
| الذاكرة | [[O(n)]] زيادة | [[out]] والـ slices، زائد [[O(log n)]] للـ call stack |
| stable | آه | [[<=]] بتاخد من الشمال وقت التساوي |

---

## الخلاصة

~~~text
base case    length <= 1 ترجع زي ما هي
قسّم         mid = length >> 1 ، و slice للنصين
رتّب         نادي نفسك على كل نص
ادمج         i و j، خد الأصغر (<= عشان stable)
الباقي       concat اللي فاضل من النصين
Big-O        O(n log n) دايمًا، و O(n) ذاكرة
~~~`,
          lines: [
            "بترجّع array جديدة مترتبة.",
            "عنصر واحد أو فاضية: مترتبة أصلًا (الـ base case).",
            "النص. [[>> 1]] قسمة على ٢ لتحت.",
            "رتّب النص الشمال (recursion).",
            "رتّب النص اليمين.",
            "الناتج المدموج.",
            "مؤشر على كل نص.",
            "طول ما النصين فيهم عناصر.",
            "خد الأصغر من الاتنين وقدّم مؤشره. [[<=]] بتاخد من الشمال وقت التساوي، وده اللي بيخليه stable.",
            "قفلة.",
            "واحد من النصين خلص، ضيف الباقي من التاني زي ما هو (مترتب أصلًا).",
            "قفلة.",
            "الـ 5 المكررة موجودة مرتين.",
            "فاضية."
          ],
          sol: R`الدمج لوحده: مؤشرين [[i]] و [[j]]، خد الأصغر كل مرة، وبعدين ضيف اللي فاضل من الاتنين. [1, 4, 9] مع [2, 3, 10, 11] تطلع [[1 2 3 4 9 10 11]]. ده [[O(n + m)]].

الـ inversions: في الـ merge، لما تاخد من اليمين ([[right[j] < left[i]]])، العنصر ده أصغر من كل اللي فاضلين في الشمال، فزوّد العدّاد [[left.length - i]]. الدالة بترجّع [array مترتبة، عدد]، والعدد الكلي = الشمال + اليمين + اللي في الدمج. [2, 4, 1, 3, 5] تطلع 3، و [5, 4, 3, 2, 1] تطلع 10. [[O(n log n)]] بدل [[O(n^2)]].

الغلطة المشهورة: تستخدم [[<]] بدل [[<=]] في المقارنة، فالأرقام المتساوية تتحسب inversion ([1, 2, 2] تطلع 1 بدل 0).`,
          solCode: R`function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}
console.log(mergeSorted([1, 4, 9], [2, 3, 10, 11]).join(" ")); // 1 2 3 4 9 10 11
function countInversions(a) {
  if (a.length <= 1) return [a, 0];
  const mid = a.length >> 1;
  const [left, cl] = countInversions(a.slice(0, mid));
  const [right, cr] = countInversions(a.slice(mid));
  const out = [];
  let i = 0, j = 0, count = cl + cr;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else { out.push(right[j++]); count += left.length - i; }
  }
  return [out.concat(left.slice(i), right.slice(j)), count];
}
console.log(countInversions([2, 4, 1, 3, 5])[1]); // 3  (2,1) (4,1) (4,3)
console.log(countInversions([5, 4, 3, 2, 1])[1]); // 10 (every pair: 5*4/2)
console.log(countInversions([1, 2, 2])[1]);       // 0
// merge: O(n + m); inversions: O(n log n) time, O(n) space (brute force over pairs = O(n^2))`,
          check: {
            lang: "js",
            starter: R`function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  // خد الأصغر كل مرة، وبعدين ضيف اللي فاضل
  return out;
}
function countInversions(a) {
  // merge sort بيرجّع [مترتبة، عدد]: لما تاخد من اليمين زوّد left.length - i
  return 0;
}`,
            tests: R`test("mergeSorted([1, 4, 9], [2, 3, 10, 11]) ← [1, 2, 3, 4, 9, 10, 11]", () => expect(mergeSorted([1, 4, 9], [2, 3, 10, 11])).toEqual([1, 2, 3, 4, 9, 10, 11]));
test("واحدة فاضية: ([], [1]) ← [1]، و ([], []) ← []", () => expect([mergeSorted([], [1]), mergeSorted([], [])]).toEqual([[1], []]));
test("countInversions([2, 4, 1, 3, 5]) ← 3", () => expect(countInversions([2, 4, 1, 3, 5])).toBe(3));
test("[5, 4, 3, 2, 1] ← 10", () => expect(countInversions([5, 4, 3, 2, 1])).toBe(10));
test("المتساويين مش inversion: [1, 2, 2] ← 0 (<= مش <)", () => expect(countInversions([1, 2, 2])).toBe(0));
test("[] ← 0", () => expect(countInversions([])).toBe(0));
test("3000 رقم نازلين ← 4498500 (O(n log n)، والـ brute force O(n^2))", () => expect(countInversions(Array.from({ length: 3000 }, (_, i) => 3000 - i))).toBe(4498500));`,
            solution: R`function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}
function countInversions(a) {
  const sort = arr => {
    if (arr.length <= 1) return [arr, 0];
    const mid = arr.length >> 1;
    const [left, x] = sort(arr.slice(0, mid));
    const [right, y] = sort(arr.slice(mid));
    const out = [];
    let i = 0, j = 0, count = x + y;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) out.push(left[i++]);
      else { out.push(right[j++]); count += left.length - i; }
    }
    return [out.concat(left.slice(i), right.slice(j)), count];
  };
  return sort(a)[1];
}`
          }
        },
        {
          cmd: "quick sort",
          title: "رتّب بإنك تختار عنصر وتحط الأصغر منه شماله والأكبر يمينه",
          desc: R`اختار pivot، ورتّب الـ array بحيث كل الأصغر منه على شماله وكل الباقي على يمينه (partition). الـ pivot كده في مكانه النهائي. كرّر نفس الكلام على الشمال واليمين. متوسط [[O(n log n)]]، وأسوأ حالة [[O(n^2)]].

أسوأ حالة لما الـ pivot يطلع كل مرة أصغر أو أكبر عنصر (زي آخر عنصر في array مترتبة): التقسيم بيبقى 0 و n - 1، فـ n مستوى بدل log n. الـ pivot العشوائي بيخلي ده شبه مستحيل.

وميزته إنه in-place: مش محتاج array جديدة، بس الـ call stack ([[O(log n)]] في المتوسط). وعيبه إنه مش stable.`,
          example: R`const swap = (a, i, j) => { const t = a[i]; a[i] = a[j]; a[j] = t; };
function quickSort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return a;
  swap(a, lo + Math.floor(Math.random() * (hi - lo + 1)), hi);
  const pivot = a[hi];
  let p = lo;
  for (let i = lo; i < hi; i++) {
    if (a[i] < pivot) { swap(a, i, p); p++; }
  }
  swap(a, p, hi);
  quickSort(a, lo, p - 1);
  quickSort(a, p + 1, hi);
  return a;
}
console.log(quickSort([5, 2, 9, 1, 5, 6])); // [1, 2, 5, 5, 6, 9]
// average O(n log n), worst O(n^2); O(log n) stack on average; in-place, not stable`,
          try: R`شيل سطر الـ pivot العشوائي (يبقى آخر عنصر دايمًا) وجرّبها على array مترتبة فيها ٢٠ ألف عنصر: هتعمل stack overflow. وبعدين رجّع السطر وجرّبها على array كلها نفس الرقم. برضه بتقع. ليه؟`,
          flag: "script",
          deep: {
            why: "أشهر sort في الانترفيو مع merge sort، والأسئلة عليه دايمًا: اشرح الـ partition، وإيه الـ worst case، وإزاي تتجنبه. وفكرة الـ partition نفسها بتحل مسائل تانية: أكبر k عنصر في متوسط O(n) (quickselect)، و «حط كل الأصفار شمال»، و Dutch national flag.",
            how: R`dry run على [5, 2, 9, 1, 6] ونفترض الـ pivot طلع 5 (نقلناه للآخر: [6, 2, 9, 1, 5]):

p = 0. i = 0 (6): مش أصغر من 5. i = 1 (2): أصغر، بدّل مع p = 0، بقت [2, 6, 9, 1, 5]، و p = 1. i = 2 (9): لأ. i = 3 (1): أصغر، بدّل مع p = 1، بقت [2, 1, 9, 6, 5]، و p = 2.

بدّل الـ pivot مع p = 2: [2, 1, 5, 6, 9]. الـ 5 في مكانها النهائي، وكل اللي شمالها أصغر، وكل اللي يمينها أكبر.

بعدين رتّب [2, 1] و [6, 9] بنفس الطريقة.

ده اسمه Lomuto partition. فيه كمان Hoare partition (مؤشرين من الطرفين) وهو بيعمل swaps أقل.

الـ Big-O: لو الـ pivot بيقسم في النص تقريبًا، الشجرة عمقها log n وكل مستوى [[O(n)]]: [[O(n log n)]]. لو بيقسم 0 و n - 1 كل مرة: n مستوى، و n + (n-1) + ... = [[O(n^2)]]، والـ recursion عمقها n فبتعمل stack overflow على array كبيرة.

المشكلة مع العناصر المكررة: لو كلها نفس الرقم، ولا عنصر «أصغر من الـ pivot»، فكل partition بيدّي 0 و n - 1، حتى مع pivot عشوائي. الحل 3-way partition: أصغر، ويساوي، وأكبر، والجزء اللي يساوي مبيترتبش تاني.`,
            when: "لما محتاج sort in-place سريع ومش فارق الـ stability. في الانترفيو: اشرحه، واعرف الـ worst case. وفي الشغل: استخدم [[sort]] الجاهزة. وفكرة الـ partition في quickselect.",
            mistakes: R`إنك تاخد أول أو آخر عنصر pivot دايمًا: على بيانات مترتبة (حاجة شائعة جدًا) بيبقى [[O(n^2)]]. وإنك تنسى إن worst case [[O(n^2)]] وتقول «O(n log n)» وخلاص. وإنك تقول إنه stable. وإن الـ recursion ممكن توصل عمق n في الـ worst case، يعني stack overflow على array كبيرة.`
          },
          teach: R`## الفكرة في جملة

اختار عنصر اسمه **pivot**، وعدّي مرة على الجزء: كل اللي أصغر منه يروح شماله، والباقي يمينه. ده اسمه **partition**. بعدها الـ pivot بقى في مكانه النهائي بالظبط، ومش هيتحرك تاني. كرّر نفس الكلام على الشمال لوحده واليمين لوحده لحد ما الأجزاء تبقى عنصر واحد. كل ده جوه نفس الـ array (in-place).

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز. وعشان التتبع يطلع نفس الشكل كل مرة، ثبّتنا [[Math.random]] في التجربة يرجّع 0.5 دايمًا (يعني الـ pivot هو العنصر اللي في نص الجزء). في الكود الحقيقي الاختيار عشوائي.

---

## ١. الكود سطر سطر

~~~js
const swap = (a, i, j) => { const t = a[i]; a[i] = a[j]; a[j] = t; };
function quickSort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return a;
  swap(a, lo + Math.floor(Math.random() * (hi - lo + 1)), hi);
  const pivot = a[hi];
  let p = lo;
  for (let i = lo; i < hi; i++) {
    if (a[i] < pivot) { swap(a, i, p); p++; }
  }
  swap(a, p, hi);
  quickSort(a, lo, p - 1);
  quickSort(a, p + 1, hi);
  return a;
}
~~~

### [[swap]]

بتبدّل الخانتين i و j بمتغير مؤقت [[t]] (temporary): احفظ الأول، اكتب التاني مكانه، وحط المحفوظ مكان التاني.

### [[function quickSort(a, lo = 0, hi = a.length - 1)]]

[[lo]] و [[hi]] حدود الجزء اللي بنرتّبه (الاتنين شاملين). [[= 0]] و [[= a.length - 1]] قيم افتراضية (default parameters): لو ناديت [[quickSort(arr)]] من غيرهم، يبقى الجزء هو الـ array كلها.

### [[if (lo >= hi) return a;]]

الـ base case: جزء فيه عنصر واحد (lo = hi) أو فاضي (lo > hi) مترتب أصلًا.

### [[swap(a, lo + Math.floor(Math.random() * (hi - lo + 1)), hi);]]

من جوه لبرة:

1. [[hi - lo + 1]]: عدد العناصر في الجزء.
2. [[Math.random()]]: رقم عشوائي من 0 لحد أقل من 1.
3. [[Math.floor(Math.random() * عدد)]]: رقم صحيح عشوائي من 0 لـ عدد - 1.
4. [[lo + ...]]: index عشوائي جوه الجزء.
5. [[swap(..., hi)]]: انقل العنصر ده لآخر الجزء. كده الـ pivot دايمًا عند hi، وباقي الكود مبيفرقش معاه اتختار إزاي.

### [[const pivot = a[hi]; let p = lo;]]

[[p]] هو الحد: كل الخانات من lo لحد قبل p فيها عناصر **أصغر** من الـ pivot. في الأول المنطقة دي فاضية (p = lo).

### الـ for والـ if

[[for (let i = lo; i < hi; i++)]] بيعدّي على الجزء كله ما عدا الـ pivot نفسه. ولو [[a[i] < pivot]]: بدّله مع الخانة p (يدخل منطقة الأصغر)، وكبّر المنطقة بـ [[p++]]. الطريقة دي اسمها Lomuto partition.

### [[swap(a, p, hi);]]

الخانة p هي أول خانة بعد منطقة الأصغر. حط الـ pivot فيها: كل اللي شماله أصغر، وكل اللي يمينه أكبر أو يساوي. ده مكانه النهائي.

### النداءين و [[return a]]

رتّب [lo, p - 1] و [p + 1, hi]، والـ pivot عند p مش داخل في الاتنين. و [[return a]] بترجّع نفس الـ array، مش نسخة.

---

## ٢. التتبع على [[[7, 2, 9, 4, 3, 8]]]

### أول partition (lo = 0، hi = 5)

الـ index اللي اتختار 3 (القيمة 4)، اتبدّل مع الآخر: [7, 2, 9, 8, 3, **4**]، والـ pivot = 4.

| i | a[i] | أصغر من 4؟ | p بعدها | الـ array |
|---|---|---|---|---|
| 0 | 7 | لأ | 0 | [7, 2, 9, 8, 3, 4] |
| 1 | 2 | آه، بدّل مع خانة 0 | 1 | [2, 7, 9, 8, 3, 4] |
| 2 | 9 | لأ | 1 | [2, 7, 9, 8, 3, 4] |
| 3 | 8 | لأ | 1 | [2, 7, 9, 8, 3, 4] |
| 4 | 3 | آه، بدّل مع خانة 1 | 2 | [2, 3, 9, 8, 7, 4] |
| الآخر | | الـ pivot لخانة 2 | | [2, 3, **4**, 8, 7, 9] |

الـ 4 خلاص في مكانها. الشمال [2, 3] واليمين [8, 7, 9].

### باقي النداءات

| النداء | الـ pivot | بعد الـ partition | مكان الـ pivot |
|---|---|---|---|
| lo = 0، hi = 1 | 3 | [2, 3, 4, 8, 7, 9] | 1 |
| lo = 3، hi = 5 | 7 | [2, 3, 4, **7**, 9, 8] | 3 |
| lo = 4، hi = 5 | 8 | [2, 3, 4, 7, **8**, 9] | 4 |

وكل نداء تاني (زي lo = 0، hi = 0 أو lo = 2، hi = 1) وقف عند الـ base case. الناتج [[[2,3,4,7,8,9]]].

### الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 1, 2, 5, 5, 6, 9 ]
~~~

الترتيب صح مهما الـ pivot طلع إيه، اللي بيتغير هو عدد الخطوات بس.

---

## ٣. الحل (solCode): ليه بتقع، والـ 3-way partition

### [[quickSortLast]] على array مترتبة

نفس الكود من غير سطر الـ pivot العشوائي، فالـ pivot دايمًا آخر عنصر. على [[[0, 1, ..., 19999]]] آخر عنصر هو الأكبر دايمًا: الـ partition بيطلّع n - 1 عنصر شمال وصفر يمين. فالـ recursion بيوصل لعمق 20000.

~~~text الناتج (Node 24 على ويندوز)
sorted input: Maximum call stack size exceeded
~~~

[[try { ... } catch (e) { ... }]] بيمسك الـ error بدل ما البرنامج يقف، و [[e.message]] نص الرسالة. وجرّبنا كمان الكود الأصلي **بالـ pivot العشوائي** على [[new Array(20000).fill(7)]] ووقع بنفس الرسالة: مفيش ولا عنصر [[< pivot]]، فكل partition بيشيل عنصر واحد بس.

### [[quickSort3]]: تلات مناطق بدل اتنين

~~~js
let lt = lo, i = lo + 1, gt = hi;
while (i <= gt) {
  if (a[i] < pivot) swap(a, lt++, i++);
  else if (a[i] > pivot) swap(a, i, gt--);
  else i++;
}
~~~

الـ pivot هنا بيتحط عند lo. وتلات مؤشرات بيقسّموا الجزء:

| المنطقة | المعنى |
|---|---|
| من lo لـ lt - 1 | أصغر من الـ pivot |
| من lt لـ i - 1 | يساوي الـ pivot |
| من i لـ gt | لسه ماتفحصش |
| من gt + 1 لـ hi | أكبر من الـ pivot |

- أصغر: بدّله مع أول «يساوي» (lt)، وقدّم الاتنين.
- أكبر: بدّله مع آخر واحد ماتفحصش (gt) وصغّر gt. **i مبيتحركش**، لأن اللي جه من gt لسه ماتفحصش.
- يساوي: سيبه وقدّم i.

**التتبع على [[[5, 3, 1, 3, 4, 3]]]** (الـ pivot اللي اتختار 3، واتنقل لأول خانة: [3, 3, 1, 5, 4, 3]):

| شاف | العملية | الـ array | lt | i | gt |
|---|---|---|---|---|---|
| | البداية | [3, 3, 1, 5, 4, 3] | 0 | 1 | 5 |
| 3 | يساوي | [3, 3, 1, 5, 4, 3] | 0 | 2 | 5 |
| 1 | أصغر، بدّل خانة 0 و 2 | [1, 3, 3, 5, 4, 3] | 1 | 3 | 5 |
| 5 | أكبر، بدّل خانة 3 و 5 | [1, 3, 3, 3, 4, 5] | 1 | 3 | 4 |
| 3 | يساوي | [1, 3, 3, 3, 4, 5] | 1 | 4 | 4 |
| 4 | أكبر، بدّل خانة 4 مع نفسها | [1, 3, 3, 3, 4, 5] | 1 | 4 | 3 |

الـ 3 التلاتة (خانة 1 لـ 3) في مكانهم ومش هيتلمسوا تاني. فاضل [1] (خانة 0) و [4, 5] (خانة 4 و 5).

### ليه recursion على ناحية و loop على التانية؟

~~~js
if (lt - lo < hi - gt) { quickSort3(a, lo, lt - 1); lo = gt + 1; }
else { quickSort3(a, gt + 1, hi); hi = lt - 1; }
~~~

الناحية **الأصغر** بتاخد نداء recursive، والأكبر بتتعمل بإن الـ [[while (lo < hi)]] يلف تاني بحدود جديدة. في التتبع: الشمال عنصر واحد (lt - lo = 1) واليمين اتنين (hi - gt = 2)، فاتنادى على [0, 0] والـ loop كمّل على [4, 5]. وبما إن كل نداء بياخد النص أو أقل، العمق [[O(log n)]] حتى في أسوأ حالة.

~~~text الناتج (Node 24 على ويندوز)
sorted input: Maximum call stack size exceeded
20000
19999
1 2 5 5 6 9
~~~

الـ 20000 سبعة خلصوا في مرور واحد، والـ array المترتبة اتعملت من غير ما تقع.

---

## ٤. الـ Big-O وليه

| | الوقت | السبب |
|---|---|---|
| المتوسط | [[O(n log n)]] | الـ pivot بيقسم قريب من النص: log n مستوى × n في كل مستوى |
| الأسوأ | [[O(n^2)]] | الـ pivot دايمًا الأصغر أو الأكبر: n + (n - 1) + ... |
| quickSort3 وكله متساوي | [[O(n)]] | مرور واحد، ومنطقة «يساوي» بتاخد الكل |
| الذاكرة | [[O(log n)]] stack في المتوسط | in-place، الـ stack بس. والأسوأ [[O(n)]] في النسخة العادية |

ومش stable: الـ swap ممكن ينقل عنصر فوق عنصر مساوي ليه.

---

## الخلاصة

~~~text
pivot عشوائي    انقله لآخر الجزء
partition       p = حد منطقة الأصغر، swap كل أصغر لعنده
مكانه النهائي   swap(a, p, hi)
كرّر            [lo, p - 1] و [p + 1, hi]
بيقع لما        pivot دايمًا أطرف عنصر، أو كله متساوي
3-way           أصغر / يساوي / أكبر، والمساوي مبيتلمسش تاني
stack           recursion على الأصغر، loop على الأكبر
~~~`,
          lines: [
            "تبديل عنصرين بمتغير مؤقت.",
            "بترتّب الجزء من lo لـ hi في نفس الـ array.",
            "جزء فيه عنصر واحد أو فاضي: خلاص.",
            "اختار pivot عشوائي وحطه في الآخر.",
            "قيمة الـ pivot.",
            "p: الخانة الجاية لعنصر أصغر من الـ pivot.",
            "عدّي على الجزء من غير الـ pivot.",
            "أصغر من الـ pivot؟ حطه في منطقة الأصغر وكبّرها.",
            "قفلة.",
            "حط الـ pivot بين المنطقتين: ده مكانه النهائي.",
            "رتّب الشمال (الأصغر).",
            "رتّب اليمين (الأكبر أو المساوي).",
            "رجّع نفس الـ array.",
            "قفلة.",
            "الترتيب صح مهما الـ pivot طلع إيه."
          ],
          sol: R`مع آخر عنصر pivot و array مترتبة من ٢٠ ألف: [[Maximum call stack size exceeded]]. الـ pivot دايمًا أكبر واحد، فكل تقسيمة بتطلع n - 1 على ناحية و 0 على التانية، والعمق بيبقى n.

مع الـ pivot العشوائي و array كلها 7: برضه بتقع. الشرط [[a[i] < pivot]] مش بيتحقق أبدًا مع قيم متساوية، فـ p بيفضل عند lo، وكل مرة بتشيل عنصر واحد بس. العشوائية مش بتفرق لأن كل الاختيارات نفس القيمة.

الحل: 3-way partition (أصغر، ويساوي، وأكبر)، والجزء اللي يساوي الـ pivot مش بيتلمس تاني، فـ array كلها نفس الرقم بتخلص في مرور واحد [[O(n)]]. وعشان الـ stack يفضل [[O(log n)]]، اعمل recursion على الجزء الأصغر و loop على الأكبر.`,
          solCode: R`const swap = (a, i, j) => { const t = a[i]; a[i] = a[j]; a[j] = t; };
function quickSortLast(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return a;
  const pivot = a[hi];
  let p = lo;
  for (let i = lo; i < hi; i++) {
    if (a[i] < pivot) { swap(a, i, p); p++; }
  }
  swap(a, p, hi);
  quickSortLast(a, lo, p - 1);
  quickSortLast(a, p + 1, hi);
  return a;
}
const sortedInput = Array.from({ length: 20_000 }, (_, i) => i);
try { quickSortLast(sortedInput); } catch (e) { console.log("sorted input:", e.message); }
// sorted input: Maximum call stack size exceeded
function quickSort3(a, lo = 0, hi = a.length - 1) {
  while (lo < hi) {
    swap(a, lo + Math.floor(Math.random() * (hi - lo + 1)), lo);
    const pivot = a[lo];
    let lt = lo, i = lo + 1, gt = hi;
    while (i <= gt) {
      if (a[i] < pivot) swap(a, lt++, i++);
      else if (a[i] > pivot) swap(a, i, gt--);
      else i++;
    }
    if (lt - lo < hi - gt) { quickSort3(a, lo, lt - 1); lo = gt + 1; }
    else { quickSort3(a, gt + 1, hi); hi = lt - 1; }
  }
  return a;
}
const same = new Array(20_000).fill(7);
console.log(quickSort3(same).length);                         // 20000 (one pass: all equal to the pivot)
console.log(quickSort3(Array.from({ length: 20_000 }, (_, i) => i))[19_999]); // 19999
console.log(quickSort3([5, 2, 9, 1, 5, 6]).join(" "));        // 1 2 5 5 6 9
// quickSort3: average O(n log n), O(n) when all values are equal; O(log n) stack (recurse into the smaller side, loop on the bigger)`
        },
        {
          cmd: "sort comparator",
          title: "ليه [10, 9, 1].sort() بيطلع [1, 10, 9]؟ وإزاي ترتّب بأكتر من حاجة؟",
          desc: R`[[sort()]] من غير comparator بيحوّل كل عنصر لـ string ويقارن حروف، فـ «10» قبل «9» لأن «1» قبل «9». للأرقام لازم [[(a, b) => a - b]]: سالب يعني a الأول، وموجب يعني b الأول، وصفر يعني متساويين.

للترتيب بأكتر من مفتاح: قارن بالأول، ولو متساويين (0) قارن بالتاني. [[||]] بتعمل ده في سطر، لأن 0 بتتحسب false فبتروح للمقارنة اللي بعدها.

و [[sort]] بتغيّر الـ array نفسها. لو عايز نسخة: [[toSorted()]] (من ES2023). ومن ES2019 المواصفات بتلزم إن [[sort]] تبقى stable، يعني العناصر المتساوية بتفضل بترتيبها الأصلي.`,
          example: R`console.log([10, 9, 1].sort());                // [1, 10, 9]
console.log([10, 9, 1].sort((a, b) => a - b)); // [1, 9, 10]
console.log([10, 9, 1].sort((a, b) => b - a)); // [10, 9, 1]
const users = [
  { name: "Sara", age: 30 }, { name: "Ali", age: 25 }, { name: "Omar", age: 30 },
];
users.sort((a, b) => b.age - a.age || a.name.localeCompare(b.name));
console.log(users.map(u => u.name)); // ["Omar", "Sara", "Ali"]
const orig = [3, 1, 2];
const sorted = orig.toSorted((a, b) => a - b);
console.log(orig, sorted); // [3, 1, 2] [1, 2, 3]
// sort is O(n log n) comparisons; V8 uses TimSort: stable, O(n) extra memory in the worst case`,
          try: R`رتّب منتجات: المتاح الأول ([[inStock]] true)، وبعدين السعر تصاعدي، وبعدين الاسم. وبعدين جرّب comparator غلط [[(a, b) => a > b]] على [3, 1, 2]: هترجع زي ما هي من غير ترتيب. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[sortProducts(products)]] بترجّع المنتجات مترتبة: المتاح، وبعدين السعر، وبعدين الاسم.`,
          flag: "script",
          deep: {
            why: "bug مشهور جدًا في الشغل: ترتيب أسعار أو IDs أو أعمار بـ [[sort()]] من غير comparator، وتلاقي 100 قبل 20. والترتيب بأكتر من مفتاح (الحالة وبعدين التاريخ) موجود في أي جدول في أي dashboard.",
            how: R`الـ comparator دالة بتاخد عنصرين a و b وبترجّع رقم: سالب لو a لازم ييجي الأول، وموجب لو b، و 0 لو متساويين في الترتيب. الإشارة بس اللي بتفرق، مش القيمة.

من غير comparator، [[sort]] بتحوّل العنصرين لـ strings وتقارن UTF-16 code units. و [[undefined]] بيروح للآخر دايمًا.

الـ strings: [[a.localeCompare(b)]] بترجّع سالب أو صفر أو موجب حسب قواعد اللغة، وبتعرف ترتّب عربي وحروف بتشكيل صح. أما [[a < b ? -1 : 1]] بتقارن code units بس (Z قبل a).

التواريخ: [[a.date - b.date]] بيشتغل مع [[Date]] objects (الطرح بيحوّلهم لأرقام). ومع strings بصيغة ISO زي 2026-09-29، [[localeCompare]] بتنفع لأن الصيغة دي بتترتب أبجديًا صح.

الـ stability: V8 من إصدار 7.0 بيستخدم TimSort، وهو stable. فتقدر ترتّب بمفتاحين على مرحلتين: رتّب بالمفتاح التاني الأول، وبعدين بالأول، والمتساويين في الأول هيحافظوا على ترتيب التاني.

الـ Big-O: [[O(n log n)]] مقارنة. لو الـ comparator نفسه غالي (بيحسب حاجة كل مرة)، احسبها مرة واحدة لكل عنصر قبل الـ sort ورتّب بيها.`,
            when: "أي ترتيب لأرقام أو objects. ودايمًا [[toSorted]] أو نسخة لما الـ array جاية من state أو props في React.",
            mistakes: R`comparator بيرجّع boolean ([[(a, b) => a > b]]): عمره ما بيرجّع سالب، والنتيجة بتبوظ (على Node 24 [3, 1, 2] بترجع زي ما هي). وإنك تنسى إن [[sort]] بتغيّر الأصلية وبترجّع نفس الـ array (مش نسخة). و [[a - b]] مع قيم فيها NaN أو strings بيبوّظ الترتيب كله.`
          },
          teach: R`## الفكرة في جملة

[[sort]] مبتعرفش إنت عايز ترتّب إزاي، فبتسألك عن كل زوج عناصر: «مين فيهم ييجي الأول؟». الإجابة دالة اسمها **comparator** بتاخد [[a]] و [[b]] وترجّع رقم: سالب يبقى a الأول، وموجب يبقى b الأول، وصفر يبقى متساويين. الإشارة بس اللي بتفرق، مش قيمة الرقم.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ comparator يطبع كل مقارنة.

---

## ١. من غير comparator: [[[10, 9, 1].sort()]]

~~~js
console.log([10, 9, 1].sort()); // [1, 10, 9]
~~~

من غير دالة، [[sort]] بتحوّل كل عنصر لـ string وتقارن حرف حرف من الشمال، زي ترتيب القاموس. [["10"]] و [["9"]]: أول حرف [["1"]] كوده 49 و [["9"]] كوده 57 (جرّبناها بـ [[charCodeAt(0)]])، فـ [["10" < "9"]] طلعت [[true]]. عشان كده 10 جت قبل 9.

---

## ٢. [[(a, b) => a - b]] و [[(a, b) => b - a]]

~~~js
console.log([10, 9, 1].sort((a, b) => a - b)); // [1, 9, 10]
console.log([10, 9, 1].sort((a, b) => b - a)); // [10, 9, 1]
~~~

[[a - b]] سالب لما a أصغر، يعني الأصغر ييجي الأول: تصاعدي. و [[b - a]] العكس: تنازلي.

طبعنا المقارنات اللي V8 طلبها فعلًا في الترتيب التصاعدي:

| a | b | a - b | المعنى |
|---|---|---|---|
| 9 | 10 | -1 | 9 قبل 10 |
| 1 | 9 | -8 | 1 قبل 9 |

مقارنتين بس كفوا لـ 3 عناصر. إنت مبتتحكمش في ترتيب أو عدد المقارنات، الـ sort هو اللي بيختار، فالـ comparator لازم يرجّع إجابة صح لأي زوج.

---

## ٣. الترتيب بمفتاحين

~~~js
const users = [
  { name: "Sara", age: 30 }, { name: "Ali", age: 25 }, { name: "Omar", age: 30 },
];
users.sort((a, b) => b.age - a.age || a.name.localeCompare(b.name));
console.log(users.map(u => u.name)); // ["Omar", "Sara", "Ali"]
~~~

### [[b.age - a.age]]

المفتاح الأول: السن تنازلي (الأكبر الأول).

### [[a.name.localeCompare(b.name)]]

المفتاح التاني: الاسم أبجديًا. [[localeCompare]] بترجّع رقم بنفس الاتفاق: [["Omar".localeCompare("Sara")]] طلعت -1، والعكس 1، و [["a".localeCompare("a")]] طلعت 0. وبتعرف قواعد اللغة (عربي وحروف عليها علامات)، مش بس أكواد الحروف.

### [[||]] بين الاتنين

[[||]] بترجّع أول قيمة مش falsy. والـ 0 falsy: [[0 || -1]] طلعت -1، و [[5 || -1]] طلعت 5. يعني: لو السن مختلف (رقم مش صفر) خلاص هو الإجابة، ولو متساوي (0) روح للاسم.

### المقارنات الحقيقية

| a | b | b.age - a.age | localeCompare | الناتج | المعنى |
|---|---|---|---|---|---|
| Ali (25) | Sara (30) | 5 | -1 | 5 | Sara قبل Ali |
| Omar (30) | Ali (25) | -5 | 1 | -5 | Omar قبل Ali |
| Omar (30) | Ali (25) | -5 | 1 | -5 | نفس السؤال اتسأل تاني |
| Omar (30) | Sara (30) | 0 | -1 | -1 | السن متساوي، فالاسم: Omar قبل Sara |

لاحظ إن في أول تلات صفوف قيمة [[localeCompare]] اتحسبت بس اتجاهلت (إحنا حسبناها في التجربة عشان نطبعها، أما في الكود الأصلي [[||]] مبتحسبهاش أصلًا لما الشمال مش صفر).

~~~text الناتج (Node 24 على ويندوز)
[ 'Omar', 'Sara', 'Ali' ]
~~~

### [[users.map(u => u.name)]]

[[map]] بتعمل array جديدة فيها نتيجة الدالة على كل عنصر: هنا الاسم بس، عشان نطبع حاجة قصيرة.

---

## ٤. [[sort]] بتغيّر الأصلية، و [[toSorted]] لأ

~~~js
const orig = [3, 1, 2];
const sorted = orig.toSorted((a, b) => a - b);
console.log(orig, sorted); // [3, 1, 2] [1, 2, 3]
~~~

جرّبنا الاتنين:

- [[x.sort(...)]]: الـ array نفسها اتغيرت، والراجع هو **نفس** الـ array ([[x === y]] طلعت [[true]]).
- [[o.toSorted(...)]]: الأصلية فضلت [[[ 3, 1, 2 ]]]، والراجع array جديدة ([[o === s]] طلعت [[false]]). [[toSorted]] جت في ES2023.

---

## ٥. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 1, 10, 9 ]
[ 1, 9, 10 ]
[ 10, 9, 1 ]
[ 'Omar', 'Sara', 'Ali' ]
[ 3, 1, 2 ] [ 1, 2, 3 ]
~~~

وحاجة صغيرة: [[["b", undefined, "a"].sort()]] طلعت [[[ 'a', 'b', undefined ]]]: الـ [[undefined]] بيروح للآخر دايمًا ومبيتبعتش للـ comparator.

---

## ٦. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n log n)]] مقارنة | V8 بيستخدم TimSort (merge sort متطوّر)، وكل مقارنة هنا [[O(1)]] |
| الذاكرة | [[O(n)]] في أسوأ حالة | TimSort بيدمج بمساحة مؤقتة، و [[toSorted]] بتعمل نسخة [[O(n)]] كمان |
| stable | آه | من ES2019 المواصفات بتلزم بيه: المتساويين بيفضلوا بترتيبهم |

---

## الخلاصة

~~~text
من غير comparator    بيقارن كـ strings: "10" قبل "9"
a - b                تصاعدي، و b - a تنازلي
الإشارة              سالب a الأول، موجب b الأول، صفر متساويين
أكتر من مفتاح        مقارنة1 || مقارنة2 (الصفر بيعدّي للي بعده)
strings              a.localeCompare(b)
sort                 بتغيّر الأصلية، toSorted بترجّع نسخة
~~~`,
          lines: [
            "من غير comparator: بيقارن كـ strings، فـ «10» قبل «9».",
            "تصاعدي: [[a - b]] سالب لما a أصغر، فـ a يبقى الأول.",
            "تنازلي: اعكس الطرح.",
            "array من objects.",
            "اتنين ليهم نفس السن.",
            "قفلة.",
            "السن تنازلي، ولو متساوي (الطرح = 0) الاسم أبجديًا.",
            "Omar و Sara عندهم 30 (بالترتيب الأبجدي)، وبعدين Ali.",
            "array أصلية.",
            "[[toSorted]] بترجّع نسخة مترتبة ومتلمسش الأصلية.",
            "الأصلية زي ما هي."
          ],
          sol: R`الـ comparator: [[(b.inStock - a.inStock) || (a.price - b.price) || a.name.localeCompare(b.name)]]. [[true - false]] بتطلع 1، فالمتاح يطلع الأول. و [[||]] بتروح للشرط اللي بعده لما اللي قبله يطلع 0 (تعادل). الناتج: [[Adapter, Keyboard, Mouse, Cable, Monitor]].

[[[3, 1, 2].sort((a, b) => a > b)]] بترجع [[[3, 1, 2]]] زي ما هي. الـ comparator لازم يرجّع رقم سالب لما a قبل b، و [[a > b]] بترجع true أو false (يعني 1 أو 0)، ومفيش سالب أبدًا. فالـ sort بيفتكر إن مفيش حاجة محتاجة تتحرك. الحل [[a - b]] للأرقام، أو [[(a > b) - (a < b)]] لأي حاجة بتتقارن.

الغلطة المشهورة: تجرّب الـ comparator الغلط على array مترتبة أصلًا زي [1, 2, 3]، فتلاقيها «صح» وتفتكر إنه سليم. الناتج بالصدفة، وأول array مش مترتبة هتكشفه.`,
          solCode: R`const products = [
  { name: "Mouse", price: 200, inStock: true },
  { name: "Cable", price: 50, inStock: false },
  { name: "Keyboard", price: 200, inStock: true },
  { name: "Adapter", price: 50, inStock: true },
  { name: "Monitor", price: 3000, inStock: false },
];
const sorted = products.toSorted((a, b) =>
  (b.inStock - a.inStock) || (a.price - b.price) || a.name.localeCompare(b.name));
console.log(sorted.map(p => p.name).join(", "));
// Adapter, Keyboard, Mouse, Cable, Monitor
console.log([3, 1, 2].sort((a, b) => a > b)); // [3, 1, 2]  (never negative, so nothing moves)
console.log([3, 1, 2].sort((a, b) => (a > b) - (a < b))); // [1, 2, 3]  (returns -1, 0 or 1)
// O(n log n) comparisons, each O(1) here; toSorted makes an O(n) copy`,
          check: {
            lang: "js",
            starter: R`function sortProducts(products) {
  return [...products].sort((a, b) => a.price - b.price);
}`,
            tests: R`const P = [
  { name: "Monitor", price: 3000, inStock: false },
  { name: "Mouse", price: 250, inStock: true },
  { name: "Cable", price: 50, inStock: false },
  { name: "Keyboard", price: 250, inStock: true },
  { name: "Adapter", price: 120, inStock: true },
];
test("Adapter, Keyboard, Mouse, Cable, Monitor", () => expect(sortProducts(P.map(p => ({ ...p }))).map(p => p.name)).toEqual(["Adapter", "Keyboard", "Mouse", "Cable", "Monitor"]));
test("نفس السعر ← الاسم أبجديًا (Keyboard قبل Mouse)", () => {
  const r = sortProducts([P[1], P[3]].map(p => ({ ...p })));
  expect(r.map(p => p.name)).toEqual(["Keyboard", "Mouse"]);
});
test("المتاح قبل الأرخص: Cable (50) بعد Adapter (120)", () => {
  const r = sortProducts([P[2], P[4]].map(p => ({ ...p }))).map(p => p.name);
  expect(r).toEqual(["Adapter", "Cable"]);
});
test("array مقلوبة كمان (مترتبة بالصدفة مش دليل)", () => expect(sortProducts(P.map(p => ({ ...p })).reverse()).map(p => p.name)).toEqual(["Adapter", "Keyboard", "Mouse", "Cable", "Monitor"]));`,
            solution: R`function sortProducts(products) {
  return [...products].sort((a, b) => (b.inStock - a.inStock) || (a.price - b.price) || a.name.localeCompare(b.name));
}`
          }
        }
      ]
    },
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
