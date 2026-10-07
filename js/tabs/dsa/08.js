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
    }
]);
