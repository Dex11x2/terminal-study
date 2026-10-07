// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "binary search",
      l: 2,
      n: "كل خطوة بتشيل نص الاحتمالات، فمليون عنصر محتاجين ٢٠ خطوة",
      items: [
        {
          cmd: "binary search",
          title: "دوّر على رقم في array مترتبة من غير ما تعدّي عليها كلها",
          desc: R`بص على العنصر اللي في النص: لو هو المطلوب خلاص، لو أصغر يبقى المطلوب في النص اليمين، لو أكبر يبقى في الشمال. كل خطوة بتشيل نص الاحتمالات: [[O(log n)]].

مليون عنصر محتاجين ٢٠ مقارنة بالكتير، ومليار محتاجين ٣٠. عشان كده الـ binary search من أقوى الأدوات، بس شرطه إن البيانات مترتبة.

المهم تفهم الحدود: [[lo]] و [[hi]] الاتنين جوه المنطقة اللي لسه ممكن يكون فيها المطلوب، والـ loop شغال طول ما المنطقة مش فاضية ([[lo <= hi]]).`,
          example: R`function binarySearch(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
const a = [1, 3, 5, 7, 9, 11];
console.log(binarySearch(a, 7));  // 3
console.log(binarySearch(a, 4));  // -1
console.log(binarySearch([], 1)); // -1
// O(log n) time, O(1) space`,
          try: R`اكتبها recursive بـ [[(a, target, lo, hi)]]، وقول الـ space complexity بتاعتها. وبعدين دوّر في array مترتبة واتلفّت زي [4, 5, 6, 7, 0, 1, 2] في O(log n): في كل خطوة، نص واحد على الأقل مترتب. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[bsRec(a, target, lo, hi)]] (والـ lo و hi ليهم قيم افتراضية)، و [[searchRotated(a, target)]].`,
          flag: "script",
          deep: {
            why: "أي بحث في بيانات مترتبة: الـ index في قاعدة البيانات (B-tree بنفس الروح)، و [[git bisect]] اللي بيدوّر على الـ commit اللي بوّظ الكود، والبحث في لوج مترتب بالوقت. والانترفيو بيحبها لأن فيها off-by-one كتير وسهل تتكتب غلط.",
            how: R`dry run على [1, 3, 5, 7, 9, 11] ونبحث عن 7:

lo = 0 و hi = 5، و mid = 2 (قيمته 5). 5 أصغر من 7، فـ lo = 3.

lo = 3 و hi = 5، و mid = 4 (قيمته 9). أكبر، فـ hi = 3.

lo = 3 و hi = 3، و mid = 3 (قيمته 7). لقيناه.

والبحث عن 4: mid = 2 (5) أكبر، فـ hi = 1. mid = 0 (1) أصغر، فـ lo = 1. mid = 1 (3) أصغر، فـ lo = 2. دلوقتي lo = 2 أكبر من hi = 1: المنطقة فاضية، -1.

القاعدة اللي بتمنع الأخطاء: قرّر معنى lo و hi وخليك عليه. هنا الاتنين «شاملين» (المطلوب ممكن يكون عند lo أو عند hi). فالـ loop بـ [[<=]]، والتحديث [[mid + 1]] و [[mid - 1]] لأن mid نفسه اتفحص خلاص.

لو كتبت [[lo = mid]] بدل [[mid + 1]]، لما lo و hi يبقوا جنب بعض، mid هيفضل = lo، والـ loop هيلف للأبد.

و [[lo + Math.floor((hi - lo) / 2)]] بدل [[(lo + hi) / 2]]: في Java و C++ جمع رقمين كبار ممكن يعدّي حد الـ int. في JS الأرقام doubles فمفيش overflow عملي، بس العادة دي بتبان كويس في الانترفيو. وفيه كمان [[(lo + hi) >>> 1]] اللي هتشوفه في الدروس الجاية.`,
            when: "أي بحث في حاجة مترتبة. ولو المطلوب «أول/آخر مكان» أو «يتحط فين» أو «أقل قيمة تحقق شرط»، دي تنويعات عليها (الدروس الجاية).",
            mistakes: R`[[lo < hi]] مع [[hi = a.length - 1]] بيفوّت آخر عنصر فاضل. و [[lo = mid]] بدل [[mid + 1]] بيعمل loop لا نهائي. ونسيان [[Math.floor]] فيطلع mid كسر والقيمة undefined. وتشغيلها على array مش مترتبة: مفيش error، بس الإجابات غلط. ولو هتدوّر مرة واحدة بس في array مش مترتبة، [[includes]] ([[O(n)]]) أحسن من sort وبعده binary search ([[O(n log n)]]).`
          },
          teach: R`## الفكرة في جملة

الـ array مترتبة، فلو بصّيت على العنصر اللي في النص وطلع أصغر من المطلوب، يبقى النص الشمال كله أصغر كمان ومفيش داعي تبص فيه. كل مقارنة بترمي نص الاحتمالات. معانا رقمين [[lo]] و [[hi]] بيحدّدوا المنطقة اللي لسه ممكن المطلوب يكون فيها، والمنطقة بتتقسم نصين لحد ما نلاقيه أو تفضى.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع lo و hi و mid.

---

## ١. الكود سطر سطر

~~~js
function binarySearch(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
~~~

### [[let lo = 0, hi = a.length - 1;]]

lo = low (الحد الأدنى)، و hi = high (الحد الأعلى). الاتنين **شاملين**: المطلوب ممكن يكون عند lo نفسه أو عند hi نفسه. في الأول المنطقة هي الـ array كلها، من أول index (0) لآخر index ([[a.length - 1]]).

### [[while (lo <= hi)]]

المنطقة من lo لـ hi فيها عنصر واحد على الأقل طول ما [[lo <= hi]]. لما lo = hi، فيه عنصر واحد لسه ماتفحصش، فلازم نلف كمان مرة: عشان كده [[<=]] مش [[<]].

### [[const mid = lo + Math.floor((hi - lo) / 2);]]

من جوه لبرة:

1. [[hi - lo]]: عرض المنطقة.
2. [[/ 2]]: نصه. القسمة في JS بتطلّع كسور: [[7 / 2]] طلعت [[3.5]].
3. [[Math.floor]]: بتقرّب لتحت: [[Math.floor(7 / 2)]] طلعت [[3]]. من غيرها [[a[3.5]]] بترجع [[undefined]].
4. [[lo + ...]]: نبدأ من lo ونمشي نص العرض. ده نفس [[(lo + hi) / 2]] بس من غير جمع رقمين كبار (في لغات زي Java الجمع ده ممكن يعدّي حد الـ int).

### [[if (a[mid] === target) return mid;]]

لقيناه: رجّع مكانه وخلاص.

### [[if (a[mid] < target) lo = mid + 1;]]

النص أصغر من المطلوب، والـ array مترتبة، فكل حاجة من lo لـ mid أصغر كمان. المنطقة الجديدة تبدأ **بعد** mid: [[mid + 1]]، لأن mid نفسه اتفحص.

### [[else hi = mid - 1;]]

النص أكبر: كل حاجة من mid لـ hi أكبر. المنطقة الجديدة تخلص **قبل** mid.

### [[return -1;]]

الـ loop وقف لأن lo بقت أكبر من hi: المنطقة فضيت، والمطلوب مش موجود. -1 اتفاق معروف معناه «مش موجود» لأنه مستحيل يبقى index.

---

## ٢. التتبع: البحث عن 32 في [[[2, 4, 8, 16, 32, 64, 128]]]

| الخطوة | lo | hi | mid | a[mid] | القرار | بعدها |
|---|---|---|---|---|---|---|
| 1 | 0 | 6 | 3 | 16 | أصغر من 32، روح يمين | lo = 4، hi = 6 |
| 2 | 4 | 6 | 5 | 64 | أكبر، روح شمال | lo = 4، hi = 4 |
| 3 | 4 | 4 | 4 | 32 | لقيناه | رجّع 4 |

٧ عناصر وخلصنا في ٣ مقارنات.

## ٣. التتبع: البحث عن 5 (مش موجود)

| الخطوة | lo | hi | mid | a[mid] | القرار | بعدها |
|---|---|---|---|---|---|---|
| 1 | 0 | 6 | 3 | 16 | أكبر | lo = 0، hi = 2 |
| 2 | 0 | 2 | 1 | 4 | أصغر | lo = 2، hi = 2 |
| 3 | 2 | 2 | 2 | 8 | أكبر | lo = 2، hi = 1 |
| النهاية | 2 | 1 | | | lo > hi، المنطقة فاضية | رجّع -1 |

لاحظ إن lo وقفت عند 2، وده بالظبط المكان اللي الـ 5 كانت هتتحط فيه (بين 4 و 8). الحتة دي هي درس «search insert position».

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
3
-1
-1
~~~

- 7 عند index 3.
- 4 مش موجود.
- [[[]]]: hi = -1 من الأول، و [[0 <= -1]] غلط، فالـ loop مبيلفّش ويرجع -1.

---

## ٥. الـ Big-O وليه

كل لفة المنطقة بتبقى النص أو أقل. فعدد اللفات = كام مرة تقسم n على ٢ لحد ما توصل لـ 1، وده [[log₂ n]]. جرّبنا [[2 ** 20]] طلعت 1048576 (حوالي مليون)، فمليون عنصر محتاجين ٢٠ لفة بالكتير، و [[2 ** 30]] حوالي مليار: ٣٠ لفة.

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(log n)]] | المنطقة بتتنصّف كل لفة |
| الذاكرة | [[O(1)]] | lo و hi و mid بس |

---

## الخلاصة

~~~text
شرط           الـ array مترتبة
lo, hi        شاملين: من 0 لـ a.length - 1
while         lo <= hi (فيه عنصر لسه ماتفحصش)
mid           lo + Math.floor((hi - lo) / 2)
أصغر          lo = mid + 1
أكبر          hi = mid - 1
فضيت          return -1
~~~

> اختار معنى lo و hi (هنا شاملين) والتزم بيه: هو اللي بيحدد [[<=]] و [[mid + 1]] و [[mid - 1]]. أي خلط بينهم يعمل loop لا نهائي أو يفوّت عنصر.`,
          lines: [
            "ترجّع مكان target أو -1.",
            "المنطقة اللي ممكن يكون فيها: من أول لآخر عنصر (شاملين الاتنين).",
            "طول ما المنطقة فيها عنصر واحد على الأقل.",
            "النص. [[Math.floor]] مهمة لأن القسمة في JS بتطلّع كسور.",
            "لقيناه.",
            "النص أصغر: المطلوب على اليمين، والنص نفسه اتستبعد (+ 1).",
            "النص أكبر: المطلوب على الشمال (- 1).",
            "قفلة.",
            "المنطقة فضيت: مش موجود.",
            "قفلة.",
            "array مترتبة.",
            "7 عند index 3.",
            "4 مش موجود.",
            "array فاضية: hi = -1 والـ loop مبيلفّش."
          ],
          sol: R`النسخة الـ recursive: [[if (lo > hi) return -1]]، واحسب mid، وبعدين [[return bsRec(a, target, mid + 1, hi)]] أو [[lo, mid - 1]]. الناتج 3 و -1 و -1. الوقت [[O(log n)]] بس الـ space [[O(log n)]] كمان (عمق الـ stack)، والـ loop كان [[O(1)]].

المتلفّتة: في كل خطوة قارن [[a[lo] <= a[mid]]]. لو آه، الشمال مترتب: لو target بين [[a[lo]]] و [[a[mid]]] روح شمال، وإلا يمين. لو لأ يبقى اليمين مترتب، واعمل نفس الشيك عليه. على [4, 5, 6, 7, 0, 1, 2]: الـ 0 عند 4، والـ 4 عند 0، والـ 2 عند 6، والـ 3 مش موجودة.

الغلطة المشهورة: [[a[lo] < a[mid]]] بدل [[<=]]. لما [[lo === mid]] (آخر عنصرين) الشرط يغلط، فـ [3, 1] والتارجت 1 ترجع -1.`,
          solCode: R`function bsRec(a, target, lo = 0, hi = a.length - 1) {
  if (lo > hi) return -1;
  const mid = lo + Math.floor((hi - lo) / 2);
  if (a[mid] === target) return mid;
  if (a[mid] < target) return bsRec(a, target, mid + 1, hi);
  return bsRec(a, target, lo, mid - 1);
}
console.log(bsRec([1, 3, 5, 7, 9, 11], 7), bsRec([1, 3, 5], 4), bsRec([], 1)); // 3 -1 -1
function searchRotated(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[lo] <= a[mid]) {
      if (a[lo] <= target && target < a[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (a[mid] < target && target <= a[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
const r = [4, 5, 6, 7, 0, 1, 2];
console.log(searchRotated(r, 0), searchRotated(r, 4), searchRotated(r, 2), searchRotated(r, 3)); // 4 0 6 -1
console.log(searchRotated([1], 1), searchRotated([3, 1], 1)); // 0 1
// bsRec: O(log n) time, O(log n) stack space; searchRotated: O(log n) time, O(1) space (distinct values)`,
          check: {
            lang: "js",
            starter: R`function bsRec(a, target, lo = 0, hi = a.length - 1) {
  // if (lo > hi) return -1، واحسب mid، ونادي نفسك على نص واحد
}
function searchRotated(a, target) {
  let lo = 0, hi = a.length - 1;
  // في كل خطوة: a[lo] <= a[mid] يبقى الشمال مترتب
  return -1;
}`,
            tests: R`test("bsRec([1, 3, 5, 7, 9, 11], 7) ← 3", () => expect(bsRec([1, 3, 5, 7, 9, 11], 7)).toBe(3));
test("مش موجود ← -1، و [] ← -1", () => expect([bsRec([1, 3, 5, 7, 9, 11], 4), bsRec([], 1)]).toEqual([-1, -1]));
test("searchRotated([4, 5, 6, 7, 0, 1, 2]): 0 ← 4، و 4 ← 0، و 2 ← 6", () => {
  const a = [4, 5, 6, 7, 0, 1, 2];
  expect([searchRotated(a, 0), searchRotated(a, 4), searchRotated(a, 2)]).toEqual([4, 0, 6]);
});
test("searchRotated: 3 مش موجودة ← -1", () => expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1));
test("فخ <= : searchRotated([3, 1], 1) ← 1", () => expect(searchRotated([3, 1], 1)).toBe(1));
test("مليون عنصر متلفّتين: كل بحث O(log n)", () => {
  const n = 1000000, k = 377777, a = Array.from({ length: n }, (_, i) => (i + k) % n);
  expect([searchRotated(a, 0), searchRotated(a, n - 1), searchRotated(a, k), bsRec(Array.from({ length: n }, (_, i) => i * 2), 1999998)]).toEqual([n - k, n - k - 1, 0, 999999]);
});`,
            solution: R`function bsRec(a, target, lo = 0, hi = a.length - 1) {
  if (lo > hi) return -1;
  const mid = lo + Math.floor((hi - lo) / 2);
  if (a[mid] === target) return mid;
  return a[mid] < target ? bsRec(a, target, mid + 1, hi) : bsRec(a, target, lo, mid - 1);
}
function searchRotated(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[lo] <= a[mid]) {
      if (a[lo] <= target && target < a[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (a[mid] < target && target <= a[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`
          }
        },
        {
          cmd: "lower bound (first/last)",
          title: "أول وآخر مكان لرقم متكرر في array مترتبة",
          desc: R`[[lowerBound(a, x)]] بترجّع أول مكان قيمته ≥ x. أول ظهور لـ x هو الـ lowerBound بتاعه، وآخر ظهور هو lowerBound لـ [[x + 1]] ناقص واحد. الاتنين [[O(log n)]].

الفرق عن الـ binary search العادية: لما تلاقي x متقفش، لأن ممكن يكون فيه نسخة قبله. بدل كده [[hi = mid]] وتكمّل على الشمال.

هنا [[hi = a.length]] (مش [[a.length - 1]]) والـ loop بـ [[lo < hi]]: المنطقة [lo, hi) نصها مفتوح، والإجابة ممكن تبقى [[a.length]] نفسها لو كل العناصر أصغر من x.`,
          example: R`function lowerBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function firstLast(a, x) {
  const first = lowerBound(a, x);
  if (first === a.length || a[first] !== x) return [-1, -1];
  return [first, lowerBound(a, x + 1) - 1];
}
console.log(firstLast([5, 7, 7, 8, 8, 8, 10], 8), firstLast([5, 7], 6)); // [3, 5] [-1, -1]
// O(log n) time, O(1) space; x + 1 works for integers only (use an upperBound for anything else)`,
          try: R`اكتب [[upperBound]] (أول مكان قيمته > x) بتغيير علامة واحدة، واستخدمها بدل [[x + 1]] عشان تشتغل مع أرقام عشرية و strings. وبعدين: عدد مرات ظهور x = [[upperBound - lowerBound]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[upperBound]] و [[firstLast]] من غير [[x + 1]]، و [[count]].`,
          flag: "script",
          deep: {
            why: "الـ binary search العادية بترجّع «أي» مكان للقيمة، ودا مش كفاية لما فيه تكرار: أول طلب في يوم معين، أو عدد المستخدمين اللي عمرهم بين ٢٠ و ٣٠ في array مترتبة. الـ lower bound هو القالب اللي بيحل كل ده، وموجود جاهز في لغات تانية ([[bisect_left]] في Python، و [[std::lower_bound]] في C++).",
            how: R`dry run: lowerBound على [5, 7, 7, 8, 8, 8, 10] و x = 8:

lo = 0 و hi = 7. mid = 3 (8)، مش أصغر من 8، فـ hi = 3.

lo = 0 و hi = 3. mid = 1 (7)، أصغر، فـ lo = 2.

lo = 2 و hi = 3. mid = 2 (7)، أصغر، فـ lo = 3. دلوقتي lo = hi = 3. أول 8 عند 3.

lowerBound لـ 9: هيوصل لـ 6 (أول قيمة ≥ 9 هي 10 عند 6). فآخر 8 عند 5.

ليه الـ loop ده مبيلفّش للأبد؟ mid دايمًا أصغر من hi (لأن [[>>> 1]] بيقرّب لتحت)، فـ [[hi = mid]] بيصغّر المنطقة، و [[lo = mid + 1]] بيصغّرها. المنطقة بتقل كل لفة.

طريقة تفكير بتسهّل كل ده: تخيّل الـ array اتحولت لـ false, false, true, true حسب الشرط «القيمة ≥ x». إنت بتدوّر على أول true. كل مسائل الـ binary search الصعبة بترجع لكده.

[[x + 1]] بتشتغل مع الأعداد الصحيحة بس. مع 2.5 مثلًا، [[x + 1]] = 3.5، وممكن يكون فيه 3 في النص تتحسب غلط. عشان كده الـ upperBound (أول قيمة > x) هي الحل العام.`,
            when: "أول أو آخر ظهور، وعدد مرات ظهور قيمة في بيانات مترتبة، وعدد العناصر في range (upperBound للحد الأعلى ناقص lowerBound للأدنى).",
            mistakes: R`إنك تخلط القالبين: [[hi = a.length]] مع [[lo <= hi]] بيقرا برّا الـ array، و [[hi = mid - 1]] مع [[lo < hi]] بيفوّت الإجابة. اختار قالب واحد واحفظه. وإنك تنسى تتأكد إن القيمة عند [[first]] هي x فعلًا، فترجّع مكان رقم تاني. وإنك تحل «أول ظهور» بإنك تلاقي أي ظهور وتمشي لورا بـ loop: مع array كلها نفس الرقم ده بقى [[O(n)]].`
          },
          teach: R`## الفكرة في جملة

[[lowerBound(a, x)]] بتدوّر على **أول** مكان قيمته ≥ x. فكّر في الـ array كأنها اتحولت لصف من «لأ» و «آه» حسب السؤال «القيمة دي ≥ x؟»: كله «لأ» الأول وبعدين كله «آه» (لأنها مترتبة). إنت بتدوّر على أول «آه». ولما تلاقي «آه» متقفش: يمكن فيه «آه» قبلها، فتكمّل على الشمال وإنت سايبها في المنطقة.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع lo و hi و mid.

---

## ١. الكود سطر سطر

~~~js
function lowerBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
~~~

### [[let lo = 0, hi = a.length;]]

هنا المنطقة **نص مفتوحة**: [lo, hi). يعني lo داخلة و hi **مش** داخلة. ليه [[hi = a.length]] مش [[a.length - 1]]؟ لأن الإجابة ممكن تبقى «بعد آخر عنصر» لو كل العناصر أصغر من target. فـ [[a.length]] نفسها إجابة ممكنة.

### [[while (lo < hi)]]

المنطقة [lo, hi) فاضية لما lo = hi. فبنلف طول ما [[lo < hi]]، ولما يتساووا يبقى ده المكان.

### [[const mid = (lo + hi) >>> 1;]]

[[>>>]] اسمه unsigned right shift: بيزق الـ bits خانة لليمين، وده قسمة على ٢ مع تقريب لتحت في سطر واحد. جرّبناها: [[(3 + 6) >>> 1]] طلعت 4. بتشتغل صح طول ما الرقم أقل من حوالي ٤ مليار.

### [[if (a[mid] < target) lo = mid + 1;]]

mid في منطقة الـ «لأ» (أصغر من target)، فالإجابة أكيد بعده.

### [[else hi = mid;]]

mid في منطقة الـ «آه» (≥ target)، فممكن يكون **هو** الإجابة. فمنرميهوش: [[hi = mid]] مش [[mid - 1]]. وبما إن hi مش داخلة في المنطقة، ده معناه «الإجابة عند mid أو قبله».

### [[return lo;]]

lo = hi = أول «آه». ولو مفيش «آه» خالص، بترجع [[a.length]].

### ليه الـ loop مبيلفّش للأبد؟

[[>>> 1]] بيقرّب لتحت، فـ mid دايمًا أصغر من hi. يعني [[hi = mid]] بيصغّر المنطقة، و [[lo = mid + 1]] بيصغّرها. المنطقة بتقل كل لفة.

---

## ٢. [[firstLast]]

~~~js
function firstLast(a, x) {
  const first = lowerBound(a, x);
  if (first === a.length || a[first] !== x) return [-1, -1];
  return [first, lowerBound(a, x + 1) - 1];
}
~~~

1. [[first]]: أول مكان ≥ x.
2. الشرط: لو [[first]] برّا الـ array، أو القيمة هناك مش x (يعني أول حاجة ≥ x أكبر منه)، يبقى x مش موجود: [[[-1, -1]]]. و [[||]] بتقف عند أول true، فلو [[first === a.length]] مش هنقرا [[a[first]]] أصلًا.
3. آخر x: أول مكان ≥ [[x + 1]] هو أول حاجة أكبر من x، والخانة اللي قبله هي آخر x. ده بيشتغل مع الأعداد الصحيحة بس.

---

## ٣. التتبع: [[firstLast([1, 2, 2, 2, 3, 5], 2)]]

**أول نداء: [[lowerBound(a, 2)]]**

| lo | hi | mid | a[mid] | أصغر من 2؟ | بعدها |
|---|---|---|---|---|---|
| 0 | 6 | 3 | 2 | لأ | lo = 0، hi = 3 |
| 0 | 3 | 1 | 2 | لأ | lo = 0، hi = 1 |
| 0 | 1 | 0 | 1 | آه | lo = 1، hi = 1 |

رجعت 1. لاحظ إنها لقت 2 عند index 3 من أول لفة وموقفتش، وكمّلت لحد أول واحدة.

**تاني نداء: [[lowerBound(a, 3)]]**

| lo | hi | mid | a[mid] | أصغر من 3؟ | بعدها |
|---|---|---|---|---|---|
| 0 | 6 | 3 | 2 | آه | lo = 4، hi = 6 |
| 4 | 6 | 5 | 5 | لأ | lo = 4، hi = 5 |
| 4 | 5 | 4 | 3 | لأ | lo = 4، hi = 4 |

رجعت 4، فآخر 2 عند 4 - 1 = 3. الناتج [[[ 1, 3 ]]].

**مش موجود: [[firstLast(a, 4)]]**: [[lowerBound(a, 4)]] رجعت 5 (الـ 5 أول حاجة ≥ 4)، و [[a[5]]] = 5 مش 4، فالناتج [[[ -1, -1 ]]]. ومع 9: رجعت 6 = [[a.length]]، فالشرط الأول وقّفها.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ 3, 5 ] [ -1, -1 ]
~~~

الـ 8 في [[[5, 7, 7, 8, 8, 8, 10]]] من 3 لـ 5، والـ 6 مش موجودة في [[[5, 7]]].

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| lowerBound | [[O(log n)]] | المنطقة بتتنصّف كل لفة |
| firstLast | [[O(log n)]] | نداءين، و 2 log n لسه [[O(log n)]] |
| الذاكرة | [[O(1)]] | lo و hi و mid |

ولو كنت لقيت أي 8 بالـ binary search العادية ومشيت شمال خطوة خطوة لحد أول واحدة، array كلها نفس الرقم كانت هتبقى [[O(n)]].

---

## الخلاصة

~~~text
المنطقة       [lo, hi) نص مفتوحة: hi = a.length
while         lo < hi
أصغر          lo = mid + 1
≥ target      hi = mid (ممكن يكون هو الإجابة)
النتيجة       lo = أول مكان ≥ target، أو a.length
أول x         lowerBound(x) والقيمة هناك = x
آخر x         lowerBound(x + 1) - 1 (أعداد صحيحة بس)
~~~

> متخلطش القالبين: الشامل ([[hi = a.length - 1]] و [[<=]] و [[mid - 1]]) والنص مفتوح ([[hi = a.length]] و [[<]] و [[hi = mid]]). كل واحد صح لوحده، والخلط بيكسر الاتنين.`,
          lines: [
            "أول index قيمته ≥ target (أو a.length لو مفيش).",
            "hi = a.length: الإجابة ممكن تبقى بعد آخر عنصر.",
            "لحد ما lo و hi يتقابلوا.",
            "النص. [[>>> 1]] قسمة على ٢ مع تقريب لتحت.",
            "النص أصغر من target: الإجابة أكيد بعده.",
            "النص ≥ target: ممكن يكون هو الإجابة، فسيبه في المنطقة (hi = mid مش mid - 1).",
            "قفلة.",
            "lo = hi = الإجابة.",
            "قفلة.",
            "أول وآخر مكان لـ x.",
            "أول مكان ≥ x.",
            "لو برّا الـ array أو القيمة هناك مش x، يبقى x مش موجود.",
            "آخر x = قبل أول مكان ≥ x + 1 بخانة.",
            "قفلة.",
            "8 من 3 لـ 5، و 6 مش موجود."
          ],
          sol: R`[[upperBound]] هي نفس [[lowerBound]] بالظبط، بس [[<]] بتبقى [[<=]]: كده بتعدّي كل القيم اللي = x وتقف عند أول أكبر منها. وآخر مكان لـ x = [[upperBound - 1]].

دلوقتي بتشتغل مع أي حاجة بتتقارن: [[firstLast([1.5, 2.5, 2.5, 3], 2.5)]] ترجع [[[1, 2]]]، ومع strings [[["ali", "bob", "bob", "zed"]]] ترجع [[[1, 2]]]. و [[x + 1]] كانت هتبوظ هنا: [[2.5 + 1]] بتعدّي الـ 3، و [["bob" + 1]] بتبقى "bob1". عدد مرات 8 في [5, 7, 7, 8, 8, 8, 10] = 6 - 3 = 3. كله [[O(log n)]].

الغلطة المشهورة: تغيّر العلامة في مكان تاني (مثلًا [[hi = mid - 1]]) فالحدود تتلخبط وتطلع بـ loop مالهاش نهاية أو إجابة ناقصة واحد.`,
          solCode: R`function lowerBound(a, x) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound(a, x) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function firstLast(a, x) {
  const first = lowerBound(a, x);
  if (first === a.length || a[first] !== x) return [-1, -1];
  return [first, upperBound(a, x) - 1];
}
const count = (a, x) => upperBound(a, x) - lowerBound(a, x);
console.log(firstLast([5, 7, 7, 8, 8, 8, 10], 8));        // [3, 5]
console.log(firstLast([1.5, 2.5, 2.5, 3], 2.5));         // [1, 2]
console.log(firstLast(["ali", "bob", "bob", "zed"], "bob")); // [1, 2]
console.log(count([5, 7, 7, 8, 8, 8, 10], 8), count([5, 7], 6)); // 3 0
// O(log n) time, O(1) space`,
          check: {
            lang: "js",
            starter: R`function lowerBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound(a, target) {
  // نفس lowerBound بعلامة واحدة مختلفة
}
function firstLast(a, x) {
  return [-1, -1];
}
function count(a, x) {
  return 0;
}`,
            tests: R`test("upperBound([5, 7, 7, 8, 8, 8, 10], 8) ← 6", () => expect(upperBound([5, 7, 7, 8, 8, 8, 10], 8)).toBe(6));
test("upperBound([1, 2], 5) ← 2 (بعد الآخر)", () => expect(upperBound([1, 2], 5)).toBe(2));
test("firstLast([5, 7, 7, 8, 8, 8, 10], 8) ← [3, 5]", () => expect(firstLast([5, 7, 7, 8, 8, 8, 10], 8)).toEqual([3, 5]));
test("أرقام عشرية: firstLast([1.5, 2.5, 2.5, 3], 2.5) ← [1, 2]", () => expect(firstLast([1.5, 2.5, 2.5, 3], 2.5)).toEqual([1, 2]));
test("strings: firstLast(['ali', 'bob', 'bob', 'zed'], 'bob') ← [1, 2]", () => expect(firstLast(["ali", "bob", "bob", "zed"], "bob")).toEqual([1, 2]));
test("مش موجود ← [-1, -1]", () => expect(firstLast([5, 7], 6)).toEqual([-1, -1]));
test("count: 8 ← 3، و [] ← 0", () => expect([count([5, 7, 7, 8, 8, 8, 10], 8), count([], 1)]).toEqual([3, 0]));
test("مليون عنصر (O(log n))", () => {
  const a = Array.from({ length: 1000000 }, (_, i) => Math.floor(i / 10));
  expect([count(a, 4242), firstLast(a, 99999)]).toEqual([10, [999990, 999999]]);
});`,
            solution: R`function lowerBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound(a, target) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function firstLast(a, x) {
  const first = lowerBound(a, x);
  if (first === a.length || a[first] !== x) return [-1, -1];
  return [first, upperBound(a, x) - 1];
}
function count(a, x) {
  return upperBound(a, x) - lowerBound(a, x);
}`
          }
        },
        {
          cmd: "search insert position",
          title: "الرقم ده لو مش موجود، يتحط فين عشان الترتيب يفضل صح؟",
          desc: R`نفس الـ binary search العادية بالظبط، بس لما تخلص من غير ما تلاقي الرقم، رجّع [[lo]] بدل -1. [[lo]] ساعتها أول مكان قيمته أكبر من target، وده مكان الإضافة. [[O(log n)]].

ليه [[lo]]؟ الـ loop بيقف لما [[lo = hi + 1]]. كل اللي قبل lo أصغر من target (اتستبعدوا بـ [[lo = mid + 1]])، وكل اللي بعد hi أكبر (اتستبعدوا بـ [[hi = mid - 1]]). فـ lo هو الحد بينهم.

ده نفس نتيجة الـ lowerBound من الدرس اللي فات، بقالب تاني، طول ما مفيش تكرار (مع التكرار بيرجّع أي نسخة يقابلها، مش أولها). اختار واحد تحفظه، وافهم التاني.`,
          example: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
console.log(searchInsert([1, 3, 5, 6], 5)); // 2
console.log(searchInsert([1, 3, 5, 6], 2)); // 1
console.log(searchInsert([1, 3, 5, 6], 7)); // 4
console.log(searchInsert([1, 3, 5, 6], 0)); // 0
console.log(searchInsert([], 3));           // 0
// O(log n) time, O(1) space`,
          try: R`استخدمها عشان تضيف رقم لـ array مترتبة: [[a.splice(searchInsert(a, x), 0, x)]]. البحث [[O(log n)]]، بس الإضافة نفسها Big-O بتاعتها إيه؟ (O(n)، لأن splice بتحرّك اللي بعدها). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[insertSorted(a, x)]] بتضيف في نفس الـ array وترجّعها.`,
          flag: "script",
          deep: {
            why: "«يتحط فين» سؤال بيتسأل كتير: leaderboard مترتب وعايز تضيف score جديد، أو مواعيد مترتبة وعايز تحط ميعاد، أو autocomplete بيدوّر على أول كلمة بتبدأ بحروف معينة. ولو فهمت ليه [[lo]] هو الإجابة، يبقى فهمت الـ binary search فعلًا.",
            how: R`dry run على [1, 3, 5, 6] و target = 2:

lo = 0 و hi = 3. mid = 1 (3)، أكبر من 2، فـ hi = 0.

lo = 0 و hi = 0. mid = 0 (1)، أصغر، فـ lo = 1.

lo = 1 أكبر من hi = 0، الـ loop وقف. رجّع 1. وفعلًا 2 مكانها بين 1 و 3.

و target = 7: mid = 1 (3) أصغر، lo = 2. mid = 2 (5) أصغر، lo = 3. mid = 3 (6) أصغر، lo = 4. وقف، ورجّع 4 = طول الـ array: يتحط في الآخر.

الـ invariant (الحاجة اللي بتفضل صح طول الوقت): كل حاجة قبل lo أصغر من target، وكل حاجة بعد hi أكبر. لما الـ loop يقف (lo = hi + 1)، مفيش حاجة بين الاتنين، فـ lo هو أول «أكبر».

لو فيه تكرار (زي [1, 3, 3, 3, 5] و target = 3)، الكود ده بيرجّع أي 3 يقابله، مش أولهم. لو المطلوب أول واحد، استخدم الـ lowerBound.`,
            when: "إضافة في قايمة مترتبة، أو تحديد «أنهي شريحة»: أسعار شحن حسب الوزن بحدود [0, 1, 5, 10] كيلو، والوزن 3 في أنهي شريحة؟",
            mistakes: R`إنك ترجّع [[hi]] بدل [[lo]] (بيطلع قبل المكان الصح بخانة). وإنك ترجّع [[mid]] الأخير: ساعات بيطلع صح وساعات لأ حسب آخر اتجاه. والـ edge cases اللي لازم تجربها: أصغر من الكل، وأكبر من الكل، و array فاضية، و array فيها عنصر واحد.`
          },
          teach: R`## الفكرة في جملة

ده الـ binary search العادي حرف بحرف، والفرق في آخر سطر بس: لما المنطقة تفضى من غير ما نلاقي الرقم، بنرجّع [[lo]] بدل -1. ليه؟ لأن وقتها كل اللي قبل lo أصغر من target، وكل اللي من lo ورايح أكبر. فـ lo هو بالظبط المكان اللي الرقم يتحط فيه والترتيب يفضل صح.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع lo و hi و mid.

---

## ١. الكود سطر سطر

~~~js
function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
~~~

- [[let lo = 0, hi = a.length - 1;]]: الحدود **شاملة** زي الـ binary search العادي.
- [[while (lo <= hi)]]: طول ما فيه عنصر ماتفحصش.
- [[const mid = (lo + hi) >>> 1;]]: النص. [[>>> 1]] قسمة على ٢ مع تقريب لتحت ([[(3 + 6) >>> 1]] = 4).
- [[if (a[mid] === target) return mid;]]: موجود، رجّع مكانه.
- [[lo = mid + 1]]: النص أصغر، فالـ mid وكل اللي قبله أصغر من target. اترموا.
- [[hi = mid - 1]]: النص أكبر، فالـ mid وكل اللي بعده أكبر. اترموا.
- [[return lo;]]: السطر الجديد. شرحه في الجزء ٣.

---

## ٢. التتبع على [[[2, 4, 6, 8, 10]]]

### target = 7 (بين 6 و 8)

| lo | hi | mid | a[mid] | القرار | بعدها |
|---|---|---|---|---|---|
| 0 | 4 | 2 | 6 | أصغر من 7 | lo = 3، hi = 4 |
| 3 | 4 | 3 | 8 | أكبر من 7 | lo = 3، hi = 2 |

lo = 3 أكبر من hi = 2، وقف. رجّع **3**: الـ 7 تتحط مكان الـ 8 والـ 8 تتزق، فتبقى [2, 4, 6, 7, 8, 10].

### target = 11 (أكبر من الكل)

| lo | hi | mid | a[mid] | بعدها |
|---|---|---|---|---|
| 0 | 4 | 2 | 6 | lo = 3، hi = 4 |
| 3 | 4 | 3 | 8 | lo = 4، hi = 4 |
| 4 | 4 | 4 | 10 | lo = 5، hi = 4 |

رجّع **5** = طول الـ array: يتحط في الآخر.

### target = 1 (أصغر من الكل)

| lo | hi | mid | a[mid] | بعدها |
|---|---|---|---|---|
| 0 | 4 | 2 | 6 | lo = 0، hi = 1 |
| 0 | 1 | 0 | 2 | lo = 0، hi = -1 |

lo عمرها ما اتحركت، فرجّع **0**: يتحط في الأول. و target = 6 اتلقت من أول لفة ورجعت 2.

---

## ٣. ليه [[lo]] بالظبط؟

فيه حاجة بتفضل صح طول الـ loop (اسمها invariant):

- كل اللي **قبل** lo أصغر من target (اترموا بـ [[lo = mid + 1]] لأنهم أصغر).
- كل اللي **بعد** hi أكبر من target (اترموا بـ [[hi = mid - 1]] لأنهم أكبر).

الـ loop بيقف لما lo = hi + 1. يعني مفيش ولا خانة بين «اللي قبل lo» و «اللي بعد hi». فـ lo هو أول خانة في منطقة «الأكبر»، وده مكان الإضافة. وعشان كده hi غلط (أقل بخانة)، و mid الأخير مش مضمون (بيعتمد على آخر اتجاه).

ومع التكرار: [[searchInsert([1, 3, 3, 3, 5], 3)]] رجعت 2، لأن أول mid وقع على 3 في النص ورجع على طول. يعني أي نسخة يقابلها، مش أولها. لو محتاج أولها، ده شغل الـ lowerBound من الدرس اللي فات.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
2
1
4
0
0
~~~

5 موجود عند 2، و 2 يتحط عند 1، و 7 في الآخر (4)، و 0 في الأول، والـ array الفاضية: hi = -1 فالـ loop مبيلفّش ويرجع lo = 0.

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(log n)]] | نفس الـ binary search: المنطقة بتتنصّف |
| الذاكرة | [[O(1)]] | lo و hi و mid |

> البحث بس هو اللي [[O(log n)]]. لو هتضيف الرقم فعلًا في array، الإضافة نفسها ليها تمن، وده سؤال التمرين.

---

## الخلاصة

~~~text
نفس binary search   حدود شاملة، lo <= hi، mid + 1 و mid - 1
موجود               رجّع mid
مش موجود            رجّع lo مش -1
ليه lo              قبله كله أصغر، ومن عنده كله أكبر
أطراف               أصغر من الكل 0، أكبر من الكل a.length، فاضية 0
~~~`,
          lines: [
            "مكان target، أو المكان اللي يتحط فيه.",
            "نفس الحدود الشاملة.",
            "نفس الـ loop.",
            "النص.",
            "موجود: رجّع مكانه.",
            "أصغر: روح يمين.",
            "أكبر: روح شمال.",
            "قفلة.",
            "مش موجود: lo هو أول مكان قيمته أكبر من target.",
            "قفلة.",
            "5 موجود عند 2.",
            "2 بين 1 و 3، يتحط عند 1.",
            "أكبر من الكل: في الآخر (4).",
            "أصغر من الكل: في الأول (0).",
            "array فاضية: 0."
          ],
          sol: R`[[a.splice(searchInsert(a, x), 0, x)]] بتحط الرقم في مكانه. لو ضفت 5 و 1 و 4 و 2 و 3 و 0 و 6 لـ array فاضية، الناتج [[0 1 2 3 4 5 6]] مترتب.

البحث [[O(log n)]]، بس الإضافة [[O(n)]]: [[splice]] لازم تحرّك كل العناصر اللي بعد المكان خطوة لقدام. فكل إضافة [[O(n)]]، و n إضافات [[O(n^2)]] في أسوأ حالة (لو كل رقم جديد أصغر من كله).

الغلطة المشهورة: تقول إن الحل كله [[O(log n)]] لأن فيه binary search. لو محتاج إضافة ومسح سريع مع ترتيب، ده شغل balanced tree أو heap. ولو هتبني الـ array مرة واحدة، اعمل push للكل وبعدين sort واحد ([[O(n log n)]]).`,
          solCode: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
function insertSorted(a, x) {
  a.splice(searchInsert(a, x), 0, x);
  return a;
}
const a = [];
for (const x of [5, 1, 4, 2, 3, 0, 6]) insertSorted(a, x);
console.log(a.join(" ")); // 0 1 2 3 4 5 6
// find the spot: O(log n); splice shifts everything after it: O(n); so one insert is O(n)
// n inserts = O(n^2) in the worst case: to build a big sorted array, push everything then sort once (O(n log n))`,
          check: {
            lang: "js",
            starter: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
function insertSorted(a, x) {
  // a.splice(مكان, 0, x)
  return a;
}`,
            tests: R`test("ضيف 5 و 1 و 4 و 2 و 3 و 0 و 6 لـ [] ← [0, 1, 2, 3, 4, 5, 6]", () => {
  const a = [];
  for (const x of [5, 1, 4, 2, 3, 0, 6]) insertSorted(a, x);
  expect(a).toEqual([0, 1, 2, 3, 4, 5, 6]);
});
test("بترجّع نفس الـ array", () => { const a = [1, 3]; expect(insertSorted(a, 2) === a).toBe(true); });
test("رقم مكرر: insertSorted([1, 3, 3, 5], 3) ← [1, 3, 3, 3, 5]", () => expect(insertSorted([1, 3, 3, 5], 3)).toEqual([1, 3, 3, 3, 5]));
test("في الأطراف: 0 في الأول و 9 في الآخر", () => expect(insertSorted(insertSorted([2, 4], 0), 9)).toEqual([0, 2, 4, 9]));`,
            solution: R`function searchInsert(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return lo;
}
function insertSorted(a, x) {
  a.splice(searchInsert(a, x), 0, x);
  return a;
}`
          }
        },
        {
          cmd: "binary search on answer",
          title: "أقل سرعة أكل تخلّص بيها كل أكوام الموز في h ساعة",
          desc: R`مش بتدوّر في array، بتدوّر في مدى الإجابات الممكنة (السرعة من 1 لأكبر كوم). اسأل عن كل سرعة: «ينفع أخلّص في h ساعة؟». لو نفع، جرّب أبطأ. لو لأ، لازم أسرع. [[O(n log m)]].

الشرط الأساسي: الإجابة لازم تبقى monotonic. لو سرعة 4 بتلحق، يبقى 5 و 6 وأي سرعة أكبر بتلحق. يعني false, false, true, true وإنت بتدوّر على أول true.

ده نفس الـ lowerBound، بس بدل «القيمة ≥ x» الشرط دالة إنت كاتبها. أي مسألة فيها «أقل قيمة تحقق كذا» أو «أكبر قيمة تحقق كذا» جرّب فيها الفكرة دي.`,
          example: R`function minEatingSpeed(piles, h) {
  const hoursAt = k => piles.reduce((t, p) => t + Math.ceil(p / k), 0);
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (hoursAt(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
console.log(minEatingSpeed([3, 6, 7, 11], 8));       // 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); // 23
// O(n log m) time (m = biggest pile), O(1) space`,
          try: R`حل «ship within D days»: أوزان طرود بالترتيب، وأقل حمولة للمركب تشحنهم كلهم في D أيام (كل يوم بتشحن طرود ورا بعض لحد ما الحمولة تتملي). الأوزان من 1 لـ 10 و D = 5 الإجابة 15. المدى هنا من أتقل طرد لمجموع الكل. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[shipWithinDays(weights, days)]].`,
          flag: "script",
          deep: {
            why: "من أقوى الأفكار في الانترفيو لأنها مش واضحة: المسألة مفيهاش array مترتبة خالص، ومع ذلك الحل binary search. بتظهر في مسائل التحسين: أقل حمولة، أقل وقت، أكبر مسافة ممكنة، أقل عدد سيرفرات يستحمل الضغط.",
            how: R`dry run على [3, 6, 7, 11] و h = 8:

المدى من 1 لـ 11. mid = 6: الساعات 1 + 1 + 2 + 2 = 6 ≤ 8، بتلحق، hi = 6.

lo = 1 و hi = 6. mid = 3: الساعات 1 + 2 + 3 + 4 = 10، مبتلحقش، lo = 4.

lo = 4 و hi = 6. mid = 5: الساعات 1 + 2 + 2 + 3 = 8، بتلحق، hi = 5.

lo = 4 و hi = 5. mid = 4: الساعات 1 + 2 + 2 + 3 = 8، بتلحق، hi = 4. و lo = hi = 4.

الـ Big-O: الـ binary search بياخد log m خطوة (m = أكبر كوم)، وكل خطوة بتحسب الساعات على n كوم. المجموع [[O(n log m)]]. لو جرّبت كل السرعات من 1 لـ m بالترتيب يبقى [[O(n × m)]]، ومع m مليار ده مستحيل.

الخطوات لأي مسألة من النوع ده: (١) إيه الإجابة؟ رقم: سرعة، أو حمولة، أو وقت. (٢) أقل وأكبر قيمة ممكنة ليها. (٣) دالة [[canDo(x)]]: لو الإجابة x، ينفع؟ (٤) اتأكد إنها monotonic، وبعدين lowerBound على أول true.`,
            when: "«أقل X بحيث يحصل Y» أو «أكبر X بحيث ميحصلش Y»، والتحقق من إجابة معينة أسهل بكتير من إيجادها.",
            mistakes: R`إنك تبدأ lo بـ 0: القسمة على 0 بتدّي Infinity. وإنك تكتب [[Math.floor]] بدل [[Math.ceil]] في حساب الساعات. وإنك تستخدم [[Math.max(...piles)]] على array فيها مئات الآلاف من العناصر: الـ spread بيحط كل عنصر كـ argument، وعلى Node 24 مع ٢٠٠ ألف عنصر بيرمي RangeError. استخدم loop أو [[reduce]]. وإنك تنسى تتأكد إن الشرط monotonic: لو مش كده الـ binary search هيرجّع إجابة غلط من غير error.`
          },
          teach: R`## الفكرة في جملة

مفيش array مترتبة هنا خالص. بدل كده بنعمل binary search على **الإجابة نفسها**: السرعة ممكن تبقى من 1 لأكبر كوم. لأي سرعة k نقدر نسأل سؤال سهل: «بالسرعة دي أخلّص في h ساعة؟». والإجابة monotonic: لو k بتلحق، أي سرعة أكبر بتلحق. يعني صف من «لأ، لأ، لأ، آه، آه»، وإحنا بندوّر على أول «آه» بنفس قالب الـ lowerBound.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع lo و hi و mid والساعات.

---

## ١. الكود سطر سطر

~~~js
function minEatingSpeed(piles, h) {
  const hoursAt = k => piles.reduce((t, p) => t + Math.ceil(p / k), 0);
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (hoursAt(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
~~~

### المسألة

[[piles]] أكوام موز، و [[h]] عدد الساعات. بتختار سرعة k (موزة في الساعة). كل ساعة بتاكل من كوم **واحد** بس، ولو الكوم خلص قبل الساعة ما تخلص، الباقي من الساعة بيضيع. عايزين أقل k تخلّص كل الأكوام في h ساعة أو أقل.

### [[const hoursAt = k => ...]]

دالة مساعدة (arrow function) بتحسب الساعات اللي محتاجها بسرعة k. من جوه لبرة:

1. [[p / k]]: الكوم ده محتاج كام ساعة، بكسور.
2. [[Math.ceil]]: تقريب **لفوق**، لأن الساعة مبتتقسمش على كومين. كوم فيه 7 بسرعة 3: [[Math.ceil(7 / 3)]] طلعت 3، أما [[Math.floor]] كانت هتطلّع 2 وتكدب.
3. [[piles.reduce((t, p) => t + ..., 0)]]: [[reduce]] بتمشي على الـ array وتجمّع في [[t]] (total) بادئ من 0. [[p]] هو الكوم الحالي. جرّبنا [[[1, 2, 3].reduce((t, p) => t + p, 0)]] وطلعت 6.

### [[let lo = 1, hi = Math.max(...piles);]]

مدى الإجابات الممكنة:

- [[lo = 1]]: أقل سرعة منطقية. صفر مينفعش (القسمة على 0).
- [[hi = Math.max(...piles)]]: [[...]] هنا spread، بيفرد الـ array كـ arguments للدالة، فـ [[Math.max(...[3, 9, 2])]] طلعت 9. ليه أكبر كوم كفاية؟ بالسرعة دي كل كوم بيخلص في ساعة واحدة، وأسرع من كده مش هيقلّل الساعات.

### [[while (lo < hi)]] و [[mid]]

نفس قالب الـ lowerBound بالظبط: لما lo = hi تبقى دي الإجابة.

### [[if (hoursAt(mid) <= h) hi = mid;]]

السرعة mid بتلحق. يمكن تكون هي الأقل، ويمكن فيه أبطأ منها بتلحق. فنسيبها في المنطقة ([[hi = mid]] مش [[mid - 1]]) وندوّر على الشمال.

### [[else lo = mid + 1;]]

مبتلحقش، وأي سرعة أبطأ مش هتلحق كمان. الإجابة أكيد أسرع من mid.

### [[return lo;]]

أقل سرعة بتلحق.

---

## ٢. التتبع على [[[9, 4, 10]]] و h = 6

المدى من 1 لـ 10. عمود الساعات فيه ساعات كل كوم بالترتيب.

| lo | hi | mid | ساعات كل كوم | المجموع | ≤ 6؟ | بعدها |
|---|---|---|---|---|---|---|
| 1 | 10 | 5 | 2 + 1 + 2 | 5 | آه | lo = 1، hi = 5 |
| 1 | 5 | 3 | 3 + 2 + 4 | 9 | لأ | lo = 4، hi = 5 |
| 4 | 5 | 4 | 3 + 1 + 3 | 7 | لأ | lo = 5، hi = 5 |

lo = hi = **5**. التلات لفات جرّبوا 3 سرعات بس من 10. والسرعة 4 تستاهل وقفة: 7 ساعات، يعني ناقصة ساعة واحدة، فـ 5 هي الأقل فعلًا.

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
4
30
23
~~~

- [[[3, 6, 7, 11]]] و 8 ساعات: بسرعة 4 الساعات 1 + 2 + 2 + 3 = 8 بالظبط.
- ٥ أكوام و ٥ ساعات: لازم كل كوم في ساعة، فالسرعة = أكبر كوم (30).
- نفس الأكوام و ٦ ساعات: ساعة زيادة بتسمح لأكبر كوم ياخد ساعتين، فـ 23 كفاية.

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n log m)]] | m = أكبر كوم. الـ binary search بياخد log m لفة، وكل لفة [[hoursAt]] بتمشي على الـ n كوم |
| الذاكرة | [[O(1)]] | lo و hi و mid، و [[reduce]] مبتعملش array |

لو جرّبت كل السرعات من 1 لـ m بالترتيب يبقى [[O(n × m)]]. مع كوم فيه مليار موزة، ده مليار تجربة مقابل حوالي ٣٠.

---

## الخلاصة

~~~text
الإجابة رقم      دوّر في مداه مش في array
المدى            lo = أقل قيمة منطقية، hi = أكبر قيمة لازمة
canDo(mid)       هنا hoursAt(mid) <= h
monotonic        لو mid بتنفع، أي حاجة أكبر بتنفع
القالب           lowerBound: بتنفع ← hi = mid، مبتنفعش ← lo = mid + 1
Big-O            log(المدى) × تمن الـ canDo
~~~

> أي «أقل X بحيث يحصل Y» والتحقق من X معيّنة سهل: جرّب الفكرة دي.`,
          lines: [
            "piles أكوام الموز، و h عدد الساعات المتاحة.",
            "بسرعة k: كل كوم محتاج [[ceil(p / k)]] ساعة (الساعة مبتتقسمش على كومين).",
            "مدى الإجابة: أقل سرعة 1، وأكبر كوم كفاية (ساعة لكل كوم).",
            "نفس قالب الـ lowerBound.",
            "سرعة في النص.",
            "بتلحق: الإجابة هي دي أو أقل، hi = mid.",
            "مبتلحقش: لازم أسرع من mid.",
            "قفلة.",
            "أقل سرعة بتلحق.",
            "قفلة.",
            "بسرعة 4: 1 + 2 + 2 + 3 = 8 ساعات بالظبط.",
            "الساعات قد عدد الأكوام: لازم تخلّص كل كوم في ساعة، يعني السرعة = أكبر كوم.",
            "ساعة زيادة: 23 تكفي."
          ],
          sol: R`الإجابة 15. المدى من [[Math.max(...weights)]] (أتقل طرد لازم يدخل المركب) لـ [[sum]] (كله في يوم واحد). والدالة المساعدة [[daysAt(cap)]] بتمشي على الطرود وتبدأ يوم جديد لما [[load + w > cap]]. وبعدين نفس binary search: لو [[daysAt(mid) <= D]] جرّب أصغر ([[hi = mid]])، وإلا [[lo = mid + 1]].

كمان [3, 2, 2, 4, 1, 4] مع 3 أيام الإجابة 6، و [1, 2, 3, 1, 1] مع 4 أيام الإجابة 3. الوقت [[O(n log S)]] (S = مجموع الأوزان)، والـ space [[O(1)]].

الغلطة المشهورة: تبدأ [[lo]] من 1. مع حمولة أصغر من أتقل طرد، [[daysAt]] هتحط الطرد التقيل في يوم لوحده وتفتكر إن ده ينفع، فالإجابة تطلع أصغر من المفروض وغلط.`,
          solCode: R`function shipWithinDays(weights, days) {
  const daysAt = cap => {
    let d = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { d++; load = 0; }
      load += w;
    }
    return d;
  };
  let lo = Math.max(...weights), hi = weights.reduce((s, w) => s + w, 0);
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (daysAt(mid) <= days) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); // 15
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3));             // 6
console.log(shipWithinDays([1, 2, 3, 1, 1], 4));                // 3
// O(n log S) time (S = sum of weights), O(1) space`,
          check: {
            lang: "js",
            starter: R`function shipWithinDays(weights, days) {
  const daysAt = cap => {
    // امشي على الطرود، وابدأ يوم جديد لما load + w > cap
  };
  let lo = 1, hi = 0; // المدى الصح: من أتقل طرد لمجموع الكل
  return lo;
}`,
            tests: R`const daysNeeded = (ws, cap) => { let d = 1, load = 0; for (const w of ws) { if (load + w > cap) { d++; load = 0; } load += w; } return d; };
test("الأوزان من 1 لـ 10 و 5 أيام ← 15", () => expect(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toBe(15));
test("([3, 2, 2, 4, 1, 4], 3) ← 6", () => expect(shipWithinDays([3, 2, 2, 4, 1, 4], 3)).toBe(6));
test("([1, 2, 3, 1, 1], 4) ← 3", () => expect(shipWithinDays([1, 2, 3, 1, 1], 4)).toBe(3));
test("lo يبدأ من أتقل طرد: ([10, 1, 1], 3) ← 10", () => expect(shipWithinDays([10, 1, 1], 3)).toBe(10));
test("يوم واحد ← المجموع كله", () => expect(shipWithinDays([4, 5, 6], 1)).toBe(15));
test("20 ألف طرد: الناتج بيكفي، والناتج - 1 مبيكفيش (O(n log S))", () => {
  const ws = Array.from({ length: 20000 }, (_, i) => (i * 37) % 500 + 1);
  const cap = shipWithinDays(ws, 100);
  expect([daysNeeded(ws, cap) <= 100, daysNeeded(ws, cap - 1) > 100]).toEqual([true, true]);
});`,
            solution: R`function shipWithinDays(weights, days) {
  const daysAt = cap => {
    let d = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { d++; load = 0; }
      load += w;
    }
    return d;
  };
  let lo = Math.max(...weights), hi = weights.reduce((s, w) => s + w, 0);
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (daysAt(mid) <= days) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`
          }
        }
      ]
    }
]);
