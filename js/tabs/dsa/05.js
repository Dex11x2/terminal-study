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
