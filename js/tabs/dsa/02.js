// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "arrays و strings",
      l: 1,
      n: "أساسيات هتستخدمها جوه كل مسألة: تقلب، وتعدّ، وتقارن من الناحيتين",
      items: [
        {
          cmd: "reverse in place",
          title: "اقلب array من غير ما تعمل array جديدة",
          desc: R`مؤشر في الأول ومؤشر في الآخر، بدّل العنصرين وقرّب المؤشرين من بعض لحد ما يتقابلوا. [[O(n)]] وقت و [[O(1)]] ذاكرة زيادة.

كل لفة بتحط عنصرين في مكانهم النهائي، فمحتاج n/2 لفة بس. والتبديل بمتغير مؤقت، أو بـ destructuring في سطر واحد لو تحب.

والـ string في JS immutable، مينفعش تغيّر حرف فيها، فلازم تحوّلها array الأول بالـ spread وترجّعها بـ [[join("")]]. ده [[O(n)]] ذاكرة غصب عنك.`,
          example: R`function reverseInPlace(a) {
  let i = 0, j = a.length - 1;
  while (i < j) {
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    i++; j--;
  }
  return a;
}
console.log(reverseInPlace([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
console.log(reverseInPlace([]));              // []
const s = "hello";
console.log(reverseInPlace([...s]).join("")); // olleh
// O(n) time, O(1) extra space (a string needs an O(n) copy because strings are immutable)`,
          try: R`اكتب [[reverseRange(a, from, to)]] تقلب جزء بس، واستخدمها تعمل rotate لليمين: [1, 2, 3, 4, 5] بـ k = 2 تبقى [4, 5, 1, 2, 3]. (اقلب الكل، وبعدين اقلب أول k، وبعدين الباقي). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[reverseRange]] و [[rotateRight]] وبتتأكد إن التعديل في نفس الـ array.`,
          flag: "script",
          deep: {
            why: "مسألة بسيطة بس فيها أهم فكرة في النوع ده: مؤشرين بيتحركوا ناحية بعض. نفس الفكرة هتلاقيها في palindrome، و two sum على array مترتبة، و container with most water. وكمان بتوريك الفرق بين «in-place» و «نسخة جديدة».",
            how: R`dry run على [1, 2, 3, 4, 5]:

i = 0 و j = 4: بدّل 1 و 5، بقت [5, 2, 3, 4, 1]. بعدين i = 1 و j = 3.

i = 1 و j = 3: بدّل 2 و 4، بقت [5, 4, 3, 2, 1]. بعدين i = 2 و j = 2.

i مش أقل من j، فالـ loop وقف. العنصر اللي في النص مكانه صح أصلًا.

الشرط [[i < j]] مش [[i <= j]]: لو كتبت [[<=]] هيبدّل العنصر اللي في النص مع نفسه، مش غلط بس لفة زيادة. أما لو الشرط [[i < a.length]] هتقلب الـ array مرتين وترجع زي ما كانت.

و [[a.reverse()]] الجاهزة بتعمل نفس الكلام in-place وبترجّع نفس الـ array. ولو عايز نسخة من غير ما تلمس الأصلية: [[a.toReversed()]] (من ES2023) أو [[a.slice().reverse()]].`,
            when: "لما المسألة تقول in-place أو O(1) extra space. ولما تقلب جزء من array كخطوة في حل أكبر (rotate، أو next permutation).",
            mistakes: R`[[s.split("").reverse().join("")]] بتبوّظ الإيموجي، لأن [[split("")]] بيقسم على UTF-16 code units والإيموجي اتنين منهم. الـ spread أحسن لأنه بيقسم على code points (وبرضه مش مثالي مع الإيموجي المركّب زي الأعلام).

وإنك تنسى إن [[reverse()]] بتغيّر الأصلية: في React لو قلبت array جاية من state بـ [[reverse()]] إنت بتعدّل الـ state مباشرة. استخدم [[toReversed()]].

والـ edge cases: array فاضية، وعنصر واحد، وطول زوجي، وطول فردي. الكود ده بيعدّي الأربعة.`
          },
          teach: R`## الفكرة في جملة

حط مؤشر على أول عنصر ومؤشر على آخر عنصر، بدّل اللي تحتهم، وقرّبهم من بعض خطوة. لما يتقابلوا تبقى خلصت. كل تبديل بيحط عنصرين في مكانهم النهائي، ومفيش أي array جديدة بتتعمل: ده معنى **in-place**.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الحالة.

---

## ١. الكود سطر سطر

~~~js
function reverseInPlace(a) {
  let i = 0, j = a.length - 1;
  while (i < j) {
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    i++; j--;
  }
  return a;
}
~~~

### [[let i = 0, j = a.length - 1;]]

مؤشرين. والمؤشر هنا مجرد رقم index. [[i]] على أول خانة (0)، و [[j]] على آخر خانة. ليه [[a.length - 1]]؟ لأن الـ index بيبدأ من 0، فـ array طولها 6 آخر index فيها 5.

### [[while (i < j)]]

[[while]] بتكرّر طول ما الشرط صح. والشرط «المؤشر الشمال لسه على شمال اليمين». أول ما يتقابلوا ([[i === j]]، عنصر في النص) أو يعدّوا بعض ([[i > j]]) نقف.

### التبديل: [[const tmp = a[i]; a[i] = a[j]; a[j] = tmp;]]

تلات خطوات، والترتيب مهم:

1. [[tmp = a[i]]]: احفظ الشمال في متغير مؤقت (tmp = temporary).
2. [[a[i] = a[j]]]: اكتب اليمين مكان الشمال. هنا قيمة الشمال القديمة اتمسحت من الـ array، بس محفوظة في [[tmp]].
3. [[a[j] = tmp]]: اكتب القيمة المحفوظة مكان اليمين.

لو شلت [[tmp]] وكتبت [[a[i] = a[j]; a[j] = a[i];]]، الخانتين هيبقوا نفس القيمة، لأن [[a[i]]] اتغيّرت قبل ما نقراها. وفيه طريقة في سطر واحد اسمها destructuring، بتعمل نفس الكلام من غير [[tmp]]:

~~~js
[a[i], a[j]] = [a[j], a[i]];
~~~

### [[i++; j--;]]

[[i++]] زوّد i واحد (يمشي يمين)، و [[j--]] نقّص j واحد (يمشي شمال). المؤشرين بيقرّبوا من بعض.

### [[return a;]]

بنرجّع **نفس** الـ array اللي اتبعتت، مش نسخة. شغّلنا [[reverseInPlace(x) === x]] وطلعت [[true]].

---

## ٢. التتبع على [[[10, 20, 30, 40, 50, 60]]] (طول زوجي)

| الخطوة | i | j | tmp | الـ array بعد التبديل |
|---|---|---|---|---|
| البداية | 0 | 5 | | [10, 20, 30, 40, 50, 60] |
| 1 | 0 | 5 | 10 | [**60**, 20, 30, 40, 50, **10**] |
| 2 | 1 | 4 | 20 | [60, **50**, 30, 40, **20**, 10] |
| 3 | 2 | 3 | 30 | [60, 50, **40**, **30**, 20, 10] |
| النهاية | 3 | 2 | | i بقت أكبر من j، وقف |

٦ عناصر = ٣ تبديلات بس (n/2). وفي الآخر i = 3 و j = 2: عدّوا بعض.

## ٣. طول فردي وحالات الأطراف

- [[[7]]] (عنصر واحد): i = 0 و j = 0 من الأول، [[0 < 0]] غلط، فالـ loop مالفّش خالص. صح، لأن عنصر واحد مقلوب هو نفسه.
- [[[]]] (فاضية): j = -1، و [[0 < -1]] غلط، فبترجع [[[]]] على طول.
- طول فردي زي ٥: بعد تبديلتين المؤشرين بيقفوا على نفس العنصر اللي في النص، وده مكانه صح أصلًا.

---

## ٤. الـ string: [[[...s]]] و [[join("")]]

~~~js
const s = "hello";
console.log(reverseInPlace([...s]).join(""));
~~~

الـ string في JS **immutable**: مينفعش تكتب [[s[0] = "x"]]، مش هتغيّر حاجة. فبنعمل تلات خطوات، من جوه لبرة:

1. [[[...s]]]: الـ spread بيفرد حروف الـ string في array. جرّبناها على «hey» وطلعت [[[ 'h', 'e', 'y' ]]].
2. [[reverseInPlace(...)]]: نقلب الـ array دي. على «hey»: تبديلة واحدة (i = 0 و j = 2، h و y)، وبعدها i = 1 و j = 1 فوقف.
3. [[.join("")]]: نلزق الحروف تاني في string، و [[""]] معناها «من غير فاصل بينهم». الناتج [[yeh]].

ومع «hello» اللي في المثال طلعت [[olleh]]. والـ array اللي عملناها في الخطوة ١ هي اللي بتخلّي الـ strings تاخد [[O(n)]] ذاكرة، مش [[O(1)]].

---

## ٥. الناتج الكامل

~~~text الناتج (Node 24 على ويندوز)
[ 5, 4, 3, 2, 1 ]
[]
olleh
~~~

---

## ٦. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | n/2 تبديلة، وكل تبديلة ٣ خطوات ثابتة. n/2 × 3 بنشيل الثوابت فتبقى n |
| الذاكرة | [[O(1)]] | [[i]] و [[j]] و [[tmp]] بس، مهما الـ array كبرت |
| الذاكرة للـ string | [[O(n)]] | الـ array اللي بتعملها بالـ spread |

---

## الخلاصة

~~~text
مؤشرين        i من الأول و j من الآخر
الشرط         while (i < j): وقف لما يتقابلوا
التبديل       tmp = a[i]; a[i] = a[j]; a[j] = tmp
in-place      نفس الـ array، O(1) ذاكرة زيادة
string        [...s] ثم القلب ثم join("")، عشان الـ string immutable
~~~

> نمط «المؤشرين من الناحيتين» هيتكرر كتير: palindrome، و two sum على array مترتبة، وغيرهم. اتعلّمه هنا كويس.`,
          lines: [
            "الدالة بتعدّل الـ array نفسها.",
            "مؤشر على أول عنصر ومؤشر على آخر عنصر.",
            "طول ما المؤشرين متقابلوش.",
            "بدّل العنصرين: احفظ الأول في tmp، حط التاني مكانه، وحط tmp مكان التاني.",
            "قرّب المؤشرين خطوة.",
            "قفلة الـ while.",
            "رجّع نفس الـ array (مش نسخة).",
            "قفلة.",
            "عدد فردي: العنصر اللي في النص بيفضل مكانه.",
            "array فاضية: الـ while مبتلفّش خالص.",
            "string عادية.",
            "الـ spread بيحوّلها array حروف، نقلبها، ونرجّعها string."
          ],
          sol: R`[[rotateRight([1, 2, 3, 4, 5], 2)]] ترجع [[[4, 5, 1, 2, 3]]]: بعد قلب الكل تبقى [5, 4, 3, 2, 1]، وقلب أول 2 يديك [4, 5, 3, 2, 1]، وقلب الباقي يديك [4, 5, 1, 2, 3].

مهم تعمل [[k %= n]] الأول: rotate بـ 5 لـ array طولها 3 هو نفسه rotate بـ 2، والناتج [[[2, 3, 1]]]. ولو الـ array فاضية ارجع على طول، عشان [[k % 0]] بتطلع [[NaN]]. الحل [[O(n)]] time و [[O(1)]] space.

الغلطة المشهورة: تنسى الـ [[%]] فتلاقي [[reverseRange(a, 0, k - 1)]] بيخرج برا حدود الـ array ويكتب [[undefined]] في أماكن جديدة. وغلطة تانية: تقلب أول k قبل ما تقلب الكل، فتطلع rotate لليسار بدل اليمين.`,
          solCode: R`function reverseRange(a, from, to) {
  while (from < to) {
    const tmp = a[from]; a[from] = a[to]; a[to] = tmp;
    from++; to--;
  }
  return a;
}
function rotateRight(a, k) {
  const n = a.length;
  if (n === 0) return a;
  k %= n;
  reverseRange(a, 0, n - 1);
  reverseRange(a, 0, k - 1);
  reverseRange(a, k, n - 1);
  return a;
}
console.log(rotateRight([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
console.log(rotateRight([1, 2, 3], 5));       // [2, 3, 1]  (5 % 3 = 2)
console.log(rotateRight([], 3));              // []
// O(n) time (every item is swapped at most twice), O(1) extra space`,
          check: {
            lang: "js",
            starter: R`function reverseRange(a, from, to) {
  // اقلب العناصر من from لـ to (الاتنين داخلين) في نفس الـ array
}
function rotateRight(a, k) {
  // اقلب الكل، وبعدين أول k، وبعدين الباقي، ورجّع a نفسها
  return a;
}`,
            tests: R`test("reverseRange(a, 1, 3) على [1, 2, 3, 4, 5] ← [1, 4, 3, 2, 5]", () => {
  const a = [1, 2, 3, 4, 5];
  reverseRange(a, 1, 3);
  expect(a).toEqual([1, 4, 3, 2, 5]);
});
test("rotateRight([1, 2, 3, 4, 5], 2) ← [4, 5, 1, 2, 3]", () => expect(rotateRight([1, 2, 3, 4, 5], 2)).toEqual([4, 5, 1, 2, 3]));
test("in-place: بترجّع نفس الـ array بعد ما عدّلتها", () => {
  const a = [1, 2, 3];
  expect(rotateRight(a, 1) === a).toBe(true);
  expect(a).toEqual([3, 1, 2]);
});
test("k أكبر من الطول: rotateRight([1, 2, 3], 5) ← [2, 3, 1] (اعمل k %= n الأول)", () => expect(rotateRight([1, 2, 3], 5)).toEqual([2, 3, 1]));
test("array فاضية ← [] (من غير k % 0 = NaN)", () => expect(rotateRight([], 3)).toEqual([]));
test("١٠٠ ألف عنصر و k = 12345: الحل O(n) ومن غير array جديدة", () => {
  const n = 100000, a = Array.from({ length: n }, (_, i) => i);
  rotateRight(a, 12345);
  expect([a[0], a[12344], a[12345], a[n - 1]]).toEqual([n - 12345, n - 1, 0, n - 12346]);
});`,
            solution: R`function reverseRange(a, from, to) {
  while (from < to) {
    const t = a[from]; a[from] = a[to]; a[to] = t;
    from++; to--;
  }
  return a;
}
function rotateRight(a, k) {
  const n = a.length;
  if (n === 0) return a;
  k %= n;
  reverseRange(a, 0, n - 1);
  reverseRange(a, 0, k - 1);
  reverseRange(a, k, n - 1);
  return a;
}`
          }
        },
        {
          cmd: "frequency count",
          title: "أكتر عنصر اتكرر في array، واتكرر كام مرة؟",
          desc: R`عدّي على الـ array مرة واحدة وخزّن في Map كل قيمة ظهرت كام مرة، وبعدين عدّي على الـ Map وخد الأكبر. [[O(n)]] وقت.

السطر ده ([[count.set(x, (count.get(x) || 0) + 1)]]) هتكتبه في نص مسائل الـ strings والـ arrays: anagram، وأول حرف مش متكرر، و top-k، والعنصر اللي ظاهر أكتر من النص.

ليه Map مش object عادي؟ الـ Map بتقبل أي نوع مفتاح (الرقم يفضل رقم)، ومفيهاش مفاتيح موروثة زي [[constructor]]، وبتحفظ ترتيب الإضافة.`,
          example: R`function mostFrequent(a) {
  const count = new Map();
  for (const x of a) count.set(x, (count.get(x) || 0) + 1);
  let best, bestCount = 0;
  for (const [x, c] of count) {
    if (c > bestCount) { best = x; bestCount = c; }
  }
  return [best, bestCount];
}
console.log(mostFrequent([3, 1, 3, 2, 1, 3])); // [3, 3]
console.log(mostFrequent(["a", "b", "b"]));    // ["b", 2]
console.log(mostFrequent([]));                 // [undefined, 0]
// O(n) time, O(k) space (k = number of distinct values)`,
          try: R`عدّلها ترجّع كل القيم اللي ليها أعلى عدد لو فيه تعادل: [1, 1, 2, 2, 3] ترجع [1, 2]. وبعدين عدّ الحروف في جملة بـ [[reduce]] بدل [[for]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[mostFrequentAll]] بترجّع كل القيم اللي ليها أعلى عدد بترتيب أول ظهور، و [[countChars]] بـ reduce وبتتجاهل المسافات.`,
          flag: "script",
          deep: {
            why: "جزء كبير من المسائل بيتحل لما تعرف «كل حاجة ظهرت كام مرة»: الحرف المكرر، والكلمتين anagram، والعنصر اللي ظاهر أكتر من النص. ومن غير Map هتعمل loop جوه loop تعدّ كل عنصر: O(n^2).",
            how: R`dry run على [3, 1, 3, 2, 1, 3]:

بعد الـ loop الأول الـ Map فيها: 3 عدده 3، و 1 عدده 2، و 2 عدده 1، بترتيب أول ظهور.

الـ loop التاني: 3 عدده 3 أكبر من 0، فبقى الأحسن. 1 عدده 2 مش أكبر من 3. 2 عدده 1. النتيجة [3, 3].

[[(count.get(x) || 0) + 1]]: أول مرة [[get]] بترجّع undefined، و [[undefined || 0]] بتدّي 0. و [[??]] بدل [[||]] بتدّي نفس النتيجة هنا، لأن العدد المخزّن عمره ما هيبقى 0.

الـ loop التاني على الـ Map مش على الـ array: عدد المفاتيح k ≤ n، فالمجموع [[O(n + k)]] = [[O(n)]]. والذاكرة [[O(k)]].

ولو المفاتيح حروف إنجليزي صغيرة بس، ممكن array طولها 26 بدل Map، وتزوّد عند [[ch.charCodeAt(0) - 97]]. أسرع شوية وذاكرتها [[O(1)]].`,
            when: "أي مسألة فيها «أكتر» أو «مكرر» أو «نفس الحروف» أو «عدد مرات». وفي الشغل: تعدّ الطلبات حسب الحالة، أو أكتر منتج اتباع، أو أكتر IP بيبعت requests.",
            mistakes: R`إنك تبدأ [[best]] بأول عنصر في الـ array من غير ما تفكر في الـ array الفاضية. وإنك تستخدم object عادي: المفتاح 1 والمفتاح «1» بيبقوا نفس المفتاح لأن مفاتيح الـ object بتتحوّل string، و [[obj.constructor]] موجود أصلًا من غير ما تضيفه. وفي التعادل: الكود ده بيرجّع أول قيمة وصلت للعدد الأكبر بترتيب أول ظهور، ولو الانترفيوير عايز أصغر قيمة مثلًا، اسأله.`
          },
          teach: R`## الفكرة في جملة

مرحلتين: **الأولى** عدّي على الـ array وخزّن في Map كل قيمة ظهرت كام مرة. **التانية** عدّي على الـ Map وخد القيمة اللي عددها أكبر. كل مرحلة loop واحد، فالحل كله [[O(n)]]، بدل ما تعدّ كل عنصر بـ loop جوه loop.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع الـ Map والمتغيرات في كل لفة.

---

## ١. يعني إيه Map؟

**Map** جدول بيربط **مفتاح** بـ **قيمة**. هنا المفتاح هو العنصر، والقيمة هي عدد مرات ظهوره. أهم ٣ دوال:

| الدالة | بتعمل إيه | Big-O |
|---|---|---|
| [[new Map()]] | Map فاضية | [[O(1)]] |
| [[count.get(x)]] | هات القيمة بتاعة المفتاح x، أو [[undefined]] لو مش موجود | [[O(1)]] في المتوسط |
| [[count.set(x, v)]] | خلّي قيمة المفتاح x تبقى v (بتضيفه لو جديد) | [[O(1)]] في المتوسط |

وليه مش object عادي [[{}]]؟ جرّبنا: [[o[1] = 1]] وبعدين [[o["1"] = 5]] طلع [[{ '1': 5 }]]، المفتاحين بقوا واحد، لأن مفاتيح الـ object بتتحوّل نصوص. والـ Map فضل فيها مفتاحين ([[size]] = 2). وكمان [["constructor" in {}]] بتطلع [[true]] في object فاضي، مفتاح موروث محدش ضافه.

---

## ٢. المرحلة الأولى: العدّ

~~~js
  const count = new Map();
  for (const x of a) count.set(x, (count.get(x) || 0) + 1);
~~~

السطر التاني ده هتكتبه كتير جدًا، فنفكّه من جوه لبرة:

1. [[count.get(x)]]: العدد اللي معانا للقيمة دي. أول مرة نشوفها بيرجع [[undefined]].
2. [[(... || 0)]]: [[||]] معناها «لو اللي على الشمال قيمة فاضية (زي [[undefined]] أو [[0]])، خد اللي على اليمين». فـ [[undefined || 0]] = 0. من غيرها: [[undefined + 1]] بتطلع [[NaN]] (Not a Number)، وجرّبناها فعلًا وطلعت كده.
3. [[+ 1]]: زوّد واحد.
4. [[count.set(x, ...)]]: خزّن العدد الجديد.

### التتبع على [[[4, 6, 4, 6, 6, 9]]]

| x | [[get(x)]] قبل | العدد الجديد | الـ Map بعدها |
|---|---|---|---|
| 4 | undefined | 1 | { 4 => 1 } |
| 6 | undefined | 1 | { 4 => 1, 6 => 1 } |
| 4 | 1 | 2 | { 4 => 2, 6 => 1 } |
| 6 | 1 | 2 | { 4 => 2, 6 => 2 } |
| 6 | 2 | 3 | { 4 => 2, 6 => 3 } |
| 9 | undefined | 1 | { 4 => 2, 6 => 3, 9 => 1 } |

لاحظ إن الـ Map بتحفظ **ترتيب أول ظهور**: 4 الأول، بعدين 6، بعدين 9، حتى لو 6 اتعدّلت بعد كده.

---

## ٣. المرحلة التانية: مين الأكبر؟

~~~js
  let best, bestCount = 0;
  for (const [x, c] of count) {
    if (c > bestCount) { best = x; bestCount = c; }
  }
  return [best, bestCount];
~~~

- [[let best, bestCount = 0;]]: متغيرين. [[best]] من غير قيمة (يعني [[undefined]])، و [[bestCount]] بيبدأ 0، عشان أي عدد حقيقي (١ أو أكتر) يكسبه.
- [[for (const [x, c] of count)]]: الـ loop على Map بيدّيك كل entry كـ array من اتنين [مفتاح، قيمة]. و [[[x, c]]] هنا **destructuring**: بيفك الـ array دي في متغيرين على طول، [[x]] القيمة و [[c]] عددها.
- [[if (c > bestCount)]]: لو العدد ده أكبر من أحسن عدد شفناه، القيمة دي بقت الأحسن.
- [[return [best, bestCount];]]: رجّع الاتنين في array.

### التتبع على نفس الـ Map

| الـ entry | [[c > bestCount]]؟ | best | bestCount |
|---|---|---|---|
| (البداية) | | undefined | 0 |
| [4, 2] | 2 > 0 آه | 4 | 2 |
| [6, 3] | 3 > 2 آه | 6 | 3 |
| [9, 1] | 1 > 3 لأ | 6 | 3 |

النتيجة [[[ 6, 3 ]]]: الرقم 6 اتكرر ٣ مرات.

### التعادل

شغّلناها على [[[8, 5, 8, 5]]] (الاتنين عددهم 2) فرجّعت [[[ 8, 2 ]]] بس. ليه؟ لأن الشرط [[>]] مش [[>=]]: لما وصلنا لـ 5 بعدد 2، [[2 > 2]] غلط، فـ 8 فضلت. يعني الكود ده بيرجّع **أول** قيمة وصلت للعدد الأكبر بترتيب الظهور. وإنك ترجّع كل القيم المتعادلة هو بالظبط تمرين الدرس.

---

## ٤. الناتج

~~~js
console.log(mostFrequent([3, 1, 3, 2, 1, 3]));
console.log(mostFrequent(["a", "b", "b"]));
console.log(mostFrequent([]));
~~~

~~~text الناتج (Node 24 على ويندوز)
[ 3, 3 ]
[ 'b', 2 ]
[ undefined, 0 ]
~~~

- [[[ 3, 3 ]]]: القيمة 3 ظهرت ٣ مرات.
- [[[ 'b', 2 ]]]: نفس الكود شغال مع strings، لأن مفتاح الـ Map ممكن يبقى أي نوع.
- [[[ undefined, 0 ]]]: array فاضية: الـ Map فاضية، الـ loop التاني مالفّش، فـ [[best]] فضلت [[undefined]] و [[bestCount]] صفر. مفيش crash، وده سبب إننا مبدأناش [[best]] بـ [[a[0]]].

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| المرحلة الأولى | [[O(n)]] | n لفة، وكل [[get]] و [[set]] [[O(1)]] في المتوسط |
| المرحلة التانية | [[O(k)]] | k = عدد القيم المختلفة، و k ≤ n |
| الوقت كله | [[O(n)]] | O(n + k) و k ≤ n |
| الذاكرة | [[O(k)]] | مفتاح واحد في الـ Map لكل قيمة مختلفة |

والبديل الساذج: لكل عنصر، عدّ هو موجود كام مرة بـ loop تاني: n × n = [[O(n^2)]].

---

## الخلاصة

~~~text
count.set(x, (count.get(x) || 0) + 1)   سطر العدّ: undefined || 0 = 0 أول مرة
for (const [x, c] of count)            لف على الـ Map بترتيب أول ظهور
c > bestCount                          أول واحد يوصل للأكبر يكسب في التعادل
O(n) time، O(k) space                  k = عدد القيم المختلفة
~~~

> أي مسألة فيها «أكتر» أو «مكرر» أو «كام مرة»: ابدأ بـ Map للعدّ.`,
          lines: [
            "الدالة بترجّع [القيمة، عدد مراتها].",
            "Map: القيمة ← عدد مرات ظهورها.",
            "لكل عنصر: زوّد العدّاد بتاعه (أو ابدأه من 0 لو أول مرة).",
            "أحسن قيمة لحد دلوقتي وعددها.",
            "عدّي على الـ Map: كل entry عبارة عن [قيمة، عدد].",
            "لو العدد أكبر من اللي معانا، ده الجديد.",
            "قفلة.",
            "رجّع النتيجة.",
            "قفلة.",
            "3 اتكررت ٣ مرات.",
            "بتشتغل مع strings عادي.",
            "array فاضية: مفيش قيمة، والعدد 0."
          ],
          sol: R`الناتج: [[[1, 2]]] لـ [1, 1, 2, 2, 3]، و [[[3]]] لـ [3, 1, 3]، و [[[]]] للـ array الفاضية. التعديل الوحيد إن [[best]] بقت array: لو العدد أكبر ابدأ array جديدة [[[x]]]، ولو مساوي ضيف عليها.

العدّ بـ [[reduce]] على «hello world» (من غير المسافة) يطلع [[{ h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }]]. المهم إن الـ accumulator يبدأ [[{}]] وإنك ترجّعه في آخر كل لفة.

الغلطة المشهورة: تنسى [[return acc]] جوه الـ reduce، فاللفة التانية تستلم [[undefined]] وتقع بـ TypeError. وغلطة تانية في التعادل: تكتب [[>=]] بدل الفرع التاني، فالعنصر يتحط لوحده بدل ما يتضاف للي قبله.`,
          solCode: R`function mostFrequentAll(a) {
  const count = new Map();
  for (const x of a) count.set(x, (count.get(x) || 0) + 1);
  let best = [], bestCount = 0;
  for (const [x, c] of count) {
    if (c > bestCount) { best = [x]; bestCount = c; }
    else if (c === bestCount) best.push(x);
  }
  return best;
}
console.log(mostFrequentAll([1, 1, 2, 2, 3])); // [1, 2]
console.log(mostFrequentAll([3, 1, 3]));       // [3]
console.log(mostFrequentAll([]));              // []
const letters = [..."hello world"].reduce((acc, ch) => {
  if (ch !== " ") acc[ch] = (acc[ch] || 0) + 1;
  return acc;
}, {});
console.log(letters); // { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }
// O(n) time, O(k) space (k = distinct values)`,
          check: {
            lang: "js",
            starter: R`function mostFrequentAll(a) {
  const count = new Map();
  // عدّ، وبعدين لف على الـ Map: عدد أكبر يبدأ array جديدة، وعدد مساوي يتضاف
  return [];
}
function countChars(text) {
  // بـ reduce، والـ accumulator يبدأ {}
  return {};
}`,
            tests: R`test("[1, 1, 2, 2, 3] ← [1, 2] (تعادل: الاتنين)", () => expect(mostFrequentAll([1, 1, 2, 2, 3])).toEqual([1, 2]));
test("[3, 1, 3] ← [3]", () => expect(mostFrequentAll([3, 1, 3])).toEqual([3]));
test("بترتيب أول ظهور: [2, 1, 2, 1] ← [2, 1]", () => expect(mostFrequentAll([2, 1, 2, 1])).toEqual([2, 1]));
test("array فاضية ← []", () => expect(mostFrequentAll([])).toEqual([]));
test("strings: ['a', 'b', 'b'] ← ['b']", () => expect(mostFrequentAll(["a", "b", "b"])).toEqual(["b"]));
test("countChars('hello world') من غير المسافة", () => expect(countChars("hello world")).toEqual({ h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }));
test("١٠٠ ألف عنصر، ألف قيمة متعادلة (O(n))", () => expect(mostFrequentAll(Array.from({ length: 100000 }, (_, i) => i % 1000)).length).toBe(1000));`,
            solution: R`function mostFrequentAll(a) {
  const count = new Map();
  for (const x of a) count.set(x, (count.get(x) || 0) + 1);
  let best = [], bestCount = 0;
  for (const [x, c] of count) {
    if (c > bestCount) { best = [x]; bestCount = c; }
    else if (c === bestCount) best.push(x);
  }
  return best;
}
function countChars(text) {
  return [...text].reduce((acc, ch) => {
    if (ch !== " ") acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});
}`
          }
        },
        {
          cmd: "anagram (char count)",
          title: "الكلمتين دول نفس الحروف بس بترتيب مختلف؟",
          desc: R`عدّ حروف الكلمة الأولى في Map، وبعدين عدّي على التانية وانقص. لو حرف مش موجود أو عدّاده خلص، يبقى لأ. [[O(n)]] وقت.

الحل الأسهل إنك ترتّب حروف الكلمتين وتقارن، بس ده [[O(n log n)]]. العدّ أسرع لأنه بيعدّي على كل حرف مرة واحدة.

وأول سطر مهم: لو الطولين مختلفين خلاص مش anagram. ومن غيره الكود هيقول إن abc و ab anagram، لأن الحروف الزيادة في الأولى محدش بيشوفها.`,
          example: R`function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);
  for (const ch of t) {
    const c = count.get(ch);
    if (!c) return false;
    count.set(ch, c - 1);
  }
  return true;
}
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("rat", "car"));       // false
console.log(isAnagram("aab", "abb"));       // false
// O(n) time, O(k) space (k = distinct chars); sorting both strings would be O(n log n)`,
          try: R`حلّها بطريقة الـ sort في سطر واحد وقارن الـ Big-O. وبعدين خليها تتجاهل المسافات والحروف الكبيرة: [[isAnagram("Dormitory", "dirty room")]] تطلع true. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[isAnagram]] لازم تتجاهل المسافات والحروف الكبيرة.`,
          flag: "script",
          deep: {
            why: "سؤال انترفيو كلاسيكي، والأهم إنه بيعلّمك تحوّل «نفس الحاجة بترتيب مختلف» لـ «نفس العدّ». نفس الفكرة في group anagrams، وفي «هل فيه permutation من الكلمة دي جوه string تانية» (sliding window مع عدّ).",
            how: R`dry run على s = aab و t = abb:

الطول واحد (٣)، نكمّل. العدّ من s: a عددها 2، و b عددها 1.

t: أول a موجودة وعددها 2، بقت 1. بعدين b عددها 1، بقت 0. بعدين b تاني عددها 0، و [[!0]] بـ true، فبنرجّع false.

ليه نقدر نرجّع true في الآخر من غير ما نتأكد إن كل العدّادات صفر؟ لأن الطولين متساويين: t استهلكت n حرف بالظبط من العدّ، ومفيش ولا حرف فشل، فمفيش حرف فاضل.

ولو الحروف a-z بس: array طولها 26، زوّد لـ s وانقص لـ t في نفس الـ loop، وفي الآخر كلهم لازم يبقوا 0. ذاكرتها [[O(1)]] لأن 26 ثابت.`,
            when: "لما السؤال عن «نفس العناصر بغض النظر عن الترتيب»: anagram، أو سلتين فيهم نفس المنتجات، أو قايمتين permissions متطابقين.",
            mistakes: R`إنك تنسى check الطول (فتعدّي abc و ab). وإنك تقارن [[s.split("").sort() === t.split("").sort()]]: دي مقارنة arrays بالـ reference، دايمًا false، لازم [[join("")]] الأول. وإنك تنسى الحروف الكبيرة والمسافات لو المسألة بتقول «جملة». واسأل: الحروف unicode ولا a-z بس؟ ده بيحدد Map ولا array بـ 26.`
          },
          teach: R`## الفكرة في جملة

كلمتين anagram لو فيهم **نفس الحروف بنفس العدد**. فبنعدّ حروف الكلمة الأولى في Map (زي درس frequency count)، وبعدين نعدّي على حروف التانية **ونستهلك** من العدّ. لو احتجنا حرف مش موجود أو خلص، يبقى لأ. ولو خلّصنا التانية كلها من غير مشكلة، يبقى آه.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع الـ Map في كل خطوة.

---

## ١. الكود سطر سطر

~~~js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);
  for (const ch of t) {
    const c = count.get(ch);
    if (!c) return false;
    count.set(ch, c - 1);
  }
  return true;
}
~~~

### [[if (s.length !== t.length) return false;]]

[[!==]] يعني «مش بيساوي» (مقارنة صارمة). لو الطولين مختلفين مستحيل يبقوا نفس الحروف، فنرجع على طول من غير ما نعدّ حاجة.

والسطر ده مش مجرد تسريع، الكود **بيغلط** من غيره. شيلناه وجرّبنا: [[("abc", "ab")]] طلعت [[true]]! لأن الـ loop التاني بيعدّي على حروف t بس (a و b)، ويلاقيهم، ومحدش بيسأل عن الـ c الزيادة في s.

### [[for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);]]

[[for...of]] على string بتدّيك حرف حرف في [[ch]] (ch = character). والباقي هو سطر العدّ المعروف: «هات العدد أو 0، وزوّد واحد».

### الـ loop التاني: الاستهلاك

- [[const c = count.get(ch);]]: فاضل من الحرف ده كام؟ [[undefined]] لو s مفيهاش الحرف ده أصلًا.
- [[if (!c) return false;]]: [[!]] معناها «عكس». و [[!c]] بتطلع [[true]] لو c قيمتها 0 **أو** [[undefined]]. جرّبنا: [[!0]] = true، و [[!undefined]] = true، و [[!1]] = false. يعني سطر واحد بيمسك الحالتين: «الحرف مش موجود» و «الحرف خلص».
- [[count.set(ch, c - 1);]]: استهلك واحد.

### [[return true;]]

ليه نقدر نقول آه من غير ما نتأكد إن كل العدّادات بقت صفر؟ لأن الطولين متساويين: t استهلكت n حرف بالظبط، وكل استهلاك نجح، فمجموع العدّادات نزل من n لـ 0. ومفيش عدّاد سالب (كنا هنرجع false قبلها)، فكلهم صفر.

---

## ٢. التتبع: [[("night", "thing")]]

الطولين 5 و 5، نكمّل. بعد عدّ حروف s:

~~~text الـ Map بعد الـ loop الأول
Map(5) { 'n' => 1, 'i' => 1, 'g' => 1, 'h' => 1, 't' => 1 }
~~~

| حرف من t | c قبل | c بعد | الـ Map |
|---|---|---|---|
| t | 1 | 0 | n:1 i:1 g:1 h:1 **t:0** |
| h | 1 | 0 | n:1 i:1 g:1 **h:0** t:0 |
| i | 1 | 0 | n:1 **i:0** g:1 h:0 t:0 |
| n | 1 | 0 | **n:0** i:0 g:1 h:0 t:0 |
| g | 1 | 0 | n:0 i:0 **g:0** h:0 t:0 |

كله اتستهلك من غير مشكلة، فالنتيجة [[true]].

## ٣. التتبع: [[("tool", "toll")]]

الطولين 4 و 4. بعد عدّ s: [[{ 't' => 1, 'o' => 2, 'l' => 1 }]].

| حرف من t | c قبل | [[!c]]؟ | بعدها |
|---|---|---|---|
| t | 1 | لأ | t:0 |
| o | 2 | لأ | o:1 |
| l | 1 | لأ | l:0 |
| l | **0** | **آه** | رجّع [[false]] |

الـ l التانية ملقتش حاجة: s فيها l واحدة بس. ولاحظ إن o فضل منها 1، يعني s فيها o زيادة. الطول المتساوي ضمن إن الزيادة في ناحية تقابلها ناقصة في الناحية التانية، فبنمسكها لما الناقص يخلص.

## ٤. التتبع: [[("ab", "abc")]]

الطولين 2 و 3، فالسطر الأول رجّع [[false]] على طول، من غير ما نعمل Map أصلًا.

---

## ٥. الناتج

~~~text الناتج (Node 24 على ويندوز)
true
false
false
~~~

| السطر | ليه |
|---|---|
| [[("listen", "silent")]] ← true | نفس الحروف بترتيب تاني |
| [[("rat", "car")]] ← false | الـ c مش موجودة في rat |
| [[("aab", "abb")]] ← false | نفس الحروف بس بعدد مختلف: الـ b التانية بتلاقي العدّاد 0 |

---

## ٦. البديل: الـ sort، ومقارنة الـ Big-O

لو رتبت حروف الكلمتين، الـ anagram بيطلعوا نفس الكلمة. جرّبنا: [[[..."night"].sort().join("")]] و [[[..."thing"].sort().join("")]] الاتنين طلعوا [[ghint]].

وخلي بالك: [[join("")]] لازم. مقارنة arrays بـ [[===]] بتقارن **المكان في الذاكرة** مش المحتوى، فـ [[[..."ab"].sort() === [..."ab"].sort()]] طلعت [[false]] مع إن الاتنين [a, b].

| الطريقة | الوقت | الذاكرة | ليه |
|---|---|---|---|
| العدّ بـ Map | [[O(n)]] | [[O(k)]] | loopين كل واحد n، و k = عدد الحروف المختلفة |
| الـ sort | [[O(n log n)]] | [[O(n)]] | الـ sort هو الأغلى، والـ spread بيعمل array |

ولو الحروف a-z صغيرة بس، k مش ممكن تعدّي 26، فالذاكرة عمليًا [[O(1)]].

---

## الخلاصة

~~~text
طول مختلف       false على طول (ومن غيره abc و ab يطلعوا true غلط)
عدّ s           count.set(ch, (count.get(ch) || 0) + 1)
استهلك t        !c يمسك «مش موجود» (undefined) و «خلص» (0)
الآخر           true، لأن الطول المتساوي يضمن إن كله اتطابق
Big-O           O(n) time بالعدّ، مقابل O(n log n) بالـ sort
~~~`,
          lines: [
            "true لو s و t نفس الحروف بنفس العدد.",
            "طول مختلف: أكيد لأ، ووفّرنا الشغل.",
            "Map: حرف ← عدده في s.",
            "عدّ حروف s.",
            "عدّي على حروف t.",
            "الحرف ده فاضل منه كام؟",
            "مش موجود أو خلص (0 أو undefined): t فيها حرف زيادة.",
            "استهلك واحد منه.",
            "قفلة.",
            "عدّينا t كلها من غير مشكلة، ومع تساوي الطولين يبقى كله اتطابق.",
            "قفلة.",
            "نفس الحروف بترتيب تاني.",
            "r و c مختلفين.",
            "نفس الحروف بس بعدد مختلف: a اتنين في الأولى وواحدة في التانية."
          ],
          sol: R`طريقة الـ sort: [[[...s].sort().join("") === [...t].sort().join("")]]، وده [[O(n log n)]] بدل [[O(n)]]. أقصر في الكتابة وكفاية في معظم الشغل، بس في الانترفيو قول الفرق.

عشان تتجاهل المسافات والحروف الكبيرة، نضّف الاتنين الأول: [[toLowerCase()]] وبعدين [[replace(/\s+/g, "")]]، وبعدين شيّك على الطول. كده [[isAnagram("Dormitory", "dirty room")]] تطلع [[true]]، و [[isAnagram("aab", "abb")]] تفضل [[false]].

الغلطة المشهورة: تشيّك على الطول قبل التنضيف، فـ «Dormitory» (9 حروف) و «dirty room» (10 بالمسافة) يطلعوا [[false]] على طول.`,
          solCode: R`const isAnagramSort = (s, t) => [...s].sort().join("") === [...t].sort().join("");
console.log(isAnagramSort("listen", "silent"), isAnagramSort("rat", "car")); // true false
function isAnagram(s, t) {
  const norm = x => x.toLowerCase().replace(/\s+/g, "");
  s = norm(s); t = norm(t);
  if (s.length !== t.length) return false;
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);
  for (const ch of t) {
    const c = count.get(ch);
    if (!c) return false;
    count.set(ch, c - 1);
  }
  return true;
}
console.log(isAnagram("Dormitory", "dirty room")); // true
console.log(isAnagram("Hello", "olleh "));         // true
console.log(isAnagram("aab", "abb"));              // false
// sort version: O(n log n) time, O(n) space; count version: O(n) time, O(k) space`,
          check: {
            lang: "js",
            starter: R`function isAnagram(s, t) {
  // نضّف الاتنين (حروف صغيرة ومن غير مسافات) قبل ما تشيّك على الطول
}`,
            tests: R`test("('listen', 'silent') ← true", () => expect(isAnagram("listen", "silent")).toBe(true));
test("('rat', 'car') ← false", () => expect(isAnagram("rat", "car")).toBe(false));
test("('aab', 'abb') ← false: نفس الحروف بس بعدد مختلف", () => expect(isAnagram("aab", "abb")).toBe(false));
test("('Dormitory', 'dirty room') ← true: نضّف قبل فحص الطول", () => expect(isAnagram("Dormitory", "dirty room")).toBe(true));
test("('Listen', 'Silent') ← true: الحروف الكبيرة زي الصغيرة", () => expect(isAnagram("Listen", "Silent")).toBe(true));
test("('', '') ← true", () => expect(isAnagram("", "")).toBe(true));
test("نصين ٥٠ ألف حرف (O(n) بالعدّ، O(n log n) بالـ sort)", () => {
  const s = "abcde".repeat(10000);
  expect(isAnagram(s, [...s].reverse().join(""))).toBe(true);
  expect(isAnagram(s, s.slice(1) + "z")).toBe(false);
});`,
            solution: R`function isAnagram(s, t) {
  const clean = x => x.toLowerCase().replace(/\s+/g, "");
  s = clean(s);
  t = clean(t);
  if (s.length !== t.length) return false;
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);
  for (const ch of t) {
    const c = count.get(ch);
    if (!c) return false;
    count.set(ch, c - 1);
  }
  return true;
}`
          }
        },
        {
          cmd: "palindrome (two ends)",
          title: "الجملة دي بتتقري زي ما هي من الناحيتين؟ (من غير مسافات وعلامات)",
          desc: R`نضّف الـ string (حروف صغيرة، وشيل أي حاجة مش حرف أو رقم)، وبعدين مؤشر من الأول ومؤشر من الآخر يقارنوا ويقرّبوا. أول اختلاف يبقى لأ. [[O(n)]].

ممكن تقلب الـ string وتقارنها بنفسها، وبرضه [[O(n)]]، بس بتعمل نسخ زيادة، وبتكمّل للآخر حتى لو أول حرف غلط. المؤشرين بيقفوا عند أول اختلاف.

والـ regex [[/[^a-z0-9]/g]] معناها «أي حاجة مش حرف صغير أو رقم»، وبنشيلها. لو النص عربي هتمسح الحروف كلها، وقتها استخدم [[/[^\p{L}\p{N}]/gu]].`,
          example: R`function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let i = 0, j = clean.length - 1;
  while (i < j) {
    if (clean[i] !== clean[j]) return false;
    i++; j--;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(""));                               // true
// O(n) time, O(n) space for the cleaned copy (skipping symbols with the pointers makes it O(1))`,
          try: R`اعملها O(1) space: من غير [[clean]]، خلي المؤشرين يعدّوا أي حاجة مش حرف أو رقم وهما ماشيين. وبعدين حل النسخة الأصعب: مسموح تمسح حرف واحد بس، تقدر تخليها palindrome؟ (aba آه، abca آه، abc لأ). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[isPalindrome]] من غير نسخة نضيفة، و [[validPalindrome]] بمسح حرف واحد بالكتير.`,
          flag: "script",
          deep: {
            why: "سؤال بيختبر المؤشرين من الناحيتين، وبيختبر إنك بتسأل عن التفاصيل: المسافات؟ الحروف الكبيرة؟ العلامات؟ الانترفيوير بيحب يشوف الأسئلة دي قبل ما تكتب.",
            how: R`dry run على «race a car»: بعد التنضيف raceacar (٨ حروف).

i = 0 و j = 7: r و r، زي بعض. i = 1 و j = 6: a و a. i = 2 و j = 5: c و c. i = 3 و j = 4: e و a، مختلفين، false.

نسخة O(1) space: مفيش [[clean]]. جوه الـ while، طول ما الحرف عند i مش حرف أو رقم زوّد i، وطول ما الحرف عند j كده قلّل j (بشرط i < j)، وبعدين قارن الاتنين بعد [[toLowerCase]]. نفس الـ [[O(n)]] بس من غير نسخة.

والنسخة «مسموح تمسح حرف»: أول ما تلاقي اختلاف عند i و j، جرّب الاحتمالين: الجزء من i+1 لـ j palindrome؟ أو من i لـ j-1؟ لو أي واحد منهم آه، يبقى آه. [[O(n)]] برضه.`,
            when: "أي مسألة فيها «من الناحيتين» أو «متماثل». وأساس لمسائل أصعب زي أطول palindrome جوه string (expand around center).",
            mistakes: R`إنك تنسى [[toLowerCase]] فـ A و a يطلعوا مختلفين. وإنك تستخدم regex الإنجليزي على نص عربي فتمسحه كله وترجع true غلط. وفي نسخة الـ O(1)، لو نسيت [[i < j]] في الـ while الداخلية، المؤشر هيعدّي حدود الـ string على جملة كلها علامات. والـ edge cases: string فاضية، وحرف واحد، وstring كلها علامات زي «.,!» (بعد التنضيف فاضية، يعني true).`
          },
          teach: R`## الفكرة في جملة

خطوتين: **نضّف** الجملة (حروف صغيرة، وشيل أي حاجة مش حرف أو رقم)، وبعدين **مؤشرين** واحد من الأول وواحد من الآخر، يقارنوا الحرفين ويقرّبوا من بعض. أول حرفين مختلفين يبقى مش palindrome. لو اتقابلوا من غير اختلاف يبقى palindrome. نفس نمط درس reverse in place، بس بنقارن بدل ما نبدّل.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] يطبع المؤشرين والحرفين في كل لفة.

---

## ١. التنضيف: [[s.toLowerCase().replace(/[^a-z0-9]/g, "")]]

دي سلسلة دوال، كل واحدة بتشتغل على ناتج اللي قبلها، من الشمال لليمين:

### [[toLowerCase()]]

بتحوّل كل الحروف الكبيرة لصغيرة، عشان [[N]] و [[n]] يبقوا زي بعض. «Never odd, or even!» بقت «never odd, or even!».

### [[replace(/[^a-z0-9]/g, "")]]

[[replace]] بتدوّر على حاجة وتبدّلها. اللي بندوّر عليه **regex** (نمط بحث)، مكتوب بين [[/ /]]:

| الحتة | معناها |
|---|---|
| [[[ ]]] | «أي حرف واحد من اللي جوه» |
| [[^]] في أول الأقواس | **عكس**: «أي حرف **مش** من اللي جوه» |
| [[a-z]] | من a لـ z |
| [[0-9]] | من 0 لـ 9 |
| [[g]] بعد الـ [[/]] | global: بدّل **كل** اللي تلاقيه، مش أول واحد بس |

و [[""]] في الآخر: بدّله بـ «ولا حاجة»، يعني امسحه. فالنتيجة: المسافات والفواصل وعلامة التعجب اتمسحوا، وفضل [[neveroddoreven]] (١٤ حرف).

وده سبب إن [[toLowerCase]] لازم **قبل** [[replace]]: لو اتعكسوا، الـ regex هيمسح [[N]] الكبيرة لأنها مش بين a و z.

---

## ٢. المؤشرين

~~~js
  let i = 0, j = clean.length - 1;
  while (i < j) {
    if (clean[i] !== clean[j]) return false;
    i++; j--;
  }
  return true;
~~~

- [[clean[i]]]: الحرف رقم i في الـ string. القراية من string بالـ index عادي، الممنوع هو التعديل.
- [[if (clean[i] !== clean[j]) return false;]]: أول اختلاف نخرج على طول، ومنكمّلش.
- [[i++; j--;]]: قرّب الاتنين.
- [[return true;]]: المؤشرين اتقابلوا وكل المقارنات نجحت.

### التتبع: «Never odd, or even!» ← [[neveroddoreven]]

| اللفة | i | j | clean[i] | clean[j] | زي بعض؟ |
|---|---|---|---|---|---|
| 1 | 0 | 13 | n | n | آه |
| 2 | 1 | 12 | e | e | آه |
| 3 | 2 | 11 | v | v | آه |
| 4 | 3 | 10 | e | e | آه |
| 5 | 4 | 9 | r | r | آه |
| 6 | 5 | 8 | o | o | آه |
| 7 | 6 | 7 | d | d | آه |

بعد اللفة ٧: i = 7 و j = 6، الشرط [[7 < 6]] غلط، فوقف ورجّع [[true]]. ١٤ حرف = ٧ مقارنات (n/2).

### التتبع: «Top spit» ← [[topspit]]

| اللفة | i | j | clean[i] | clean[j] | زي بعض؟ |
|---|---|---|---|---|---|
| 1 | 0 | 6 | t | t | آه |
| 2 | 1 | 5 | o | i | **لأ**، رجّع [[false]] |

وقفنا بعد مقارنتين بس، من غير ما نبص على الباقي. وده الفرق عن طريقة «اقلب الـ string وقارنها بنفسها»: القلب بيعدّي على الحروف كلها حتى لو أول حرف غلط.

---

## ٣. الناتج

~~~js
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
console.log(isPalindrome(""));
~~~

~~~text الناتج (Node 24 على ويندوز)
true
false
true
~~~

| الجملة | بعد التنضيف | اللي حصل |
|---|---|---|
| A man, a plan, a canal: Panama | [[amanaplanacanalpanama]] (21) | ١٠ مقارنات ناجحة، ووقفوا عند i = j = 10 (الحرف اللي في النص) |
| race a car | [[raceacar]] (8) | r و r، a و a، c و c، وبعدين e و a مختلفين ← false |
| (فاضية) | فاضية | j = -1، الـ loop مالفّش ← true |

---

## ٤. فخ: النص العربي

الـ regex بيسيب a-z و 0-9 بس. شغّلناها على «مرحبا»: بعد التنضيف الـ string بقت **فاضية**، فرجّعت [[true]]! مع إن «مرحبا» مش palindrome. عشان كده الـ desc بيقول: لو النص مش إنجليزي استخدم regex بيفهم حروف أي لغة ([[\p{L}]] للحروف و [[\p{N}]] للأرقام مع الـ flag [[u]]).

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | التنضيف بيعدّي على الحروف مرة، والمؤشرين n/2 مقارنة بالكتير |
| الذاكرة | [[O(n)]] | [[toLowerCase]] و [[replace]] كل واحدة بتعمل string جديدة |

والذاكرة دي ممكن تنزل لـ [[O(1)]] لو ماعملناش [[clean]] خالص، وده بالظبط الجزء الأول من تمرين الدرس.

---

## الخلاصة

~~~text
التنضيف       toLowerCase() الأول، وبعدين replace(/[^a-z0-9]/g, "")
مؤشرين        i من الأول و j من الآخر، while (i < j)
أول اختلاف    return false على طول
اتقابلوا      return true (string فاضية أو حرف واحد = true)
Big-O         O(n) time، و O(n) space بسبب النسخة النضيفة
~~~`,
          lines: [
            "true لو الجملة palindrome بعد التنضيف.",
            "حروف صغيرة، وشيل أي حاجة مش a-z أو رقم.",
            "مؤشر من الأول ومؤشر من الآخر.",
            "لحد ما يتقابلوا.",
            "أول حرفين مختلفين: خلاص مش palindrome.",
            "قرّب الاتنين.",
            "قفلة.",
            "عدّينا كله من غير اختلاف.",
            "قفلة.",
            "بعد التنضيف: amanaplanacanalpanama.",
            "raceacar مقلوبة racaecar.",
            "string فاضية بتتحسب palindrome."
          ],
          sol: R`النسخة الـ [[O(1)]] space: جوه الـ loop، [[while]] صغيرة لكل مؤشر تعدّي أي حاجة مش حرف أو رقم (بشرط [[i < j]])، وبعدين قارن بعد [[toLowerCase()]]. الناتج [[true]] لـ «A man, a plan...» و [[false]] لـ «race a car» و [[true]] لـ [[".,"]].

مسح حرف واحد: امشي بالمؤشرين، وأول ما تلاقي اختلاف جرّب الاحتمالين: شيل الشمال ([[isPal(s, i + 1, j)]]) أو اليمين ([[isPal(s, i, j - 1)]]). النتيجة: aba [[true]]، و abca [[true]] (امسح c أو b)، و abc [[false]]. الاتنين [[O(n)]] time.

الغلطة المشهورة في الجزء التاني: تجرّب احتمال واحد بس (تمسح الشمال دايمًا)، فحالة زي «abca» ممكن تعدّي بالصدفة، بس غيرها يفشل. لازم الاتنين بـ [[||]].`,
          solCode: R`const isAlnum = ch => /[a-z0-9]/i.test(ch);
function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    while (i < j && !isAlnum(s[i])) i++;
    while (i < j && !isAlnum(s[j])) j--;
    if (s[i].toLowerCase() !== s[j].toLowerCase()) return false;
    i++; j--;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(".,"));                             // true
function isPal(s, i, j) {
  while (i < j) { if (s[i] !== s[j]) return false; i++; j--; }
  return true;
}
function validPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return isPal(s, i + 1, j) || isPal(s, i, j - 1);
    i++; j--;
  }
  return true;
}
console.log(validPalindrome("aba"), validPalindrome("abca"), validPalindrome("abc")); // true true false
// both: O(n) time, O(1) extra space`,
          check: {
            lang: "js",
            starter: R`function isPalindrome(s) {
  // مؤشرين، وكل واحد يعدّي أي حاجة مش حرف أو رقم وهو ماشي
}
function validPalindrome(s) {
  // أول اختلاف: جرّب تشيل الشمال أو اليمين (الاتنين)
}`,
            tests: R`test("'A man, a plan, a canal: Panama' ← true", () => expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true));
test("'race a car' ← false", () => expect(isPalindrome("race a car")).toBe(false));
test("'.,' ← true (مفيش حروف خالص)", () => expect(isPalindrome(".,")).toBe(true));
test("'0P' ← false: الأرقام بتتقارن برضه", () => expect(isPalindrome("0P")).toBe(false));
test("validPalindrome: aba و abca ← true، و abc ← false", () => expect([validPalindrome("aba"), validPalindrome("abca"), validPalindrome("abc")]).toEqual([true, true, false]));
test("validPalindrome محتاجة تجرّب الاحتمالين مش واحد بس", () => {
  expect(validPalindrome("ebcbbececabbacecbbcbe")).toBe(true);
  expect(validPalindrome("cbbcc")).toBe(true);
  expect(validPalindrome("eeccccbebaeeabebccceea")).toBe(false);
});
test("١٠٠ ألف حرف (O(n))", () => {
  const s = "a".repeat(50000) + "b" + "a".repeat(50000);
  expect(isPalindrome(s)).toBe(true);
  expect(validPalindrome("x" + s)).toBe(true);
});`,
            solution: R`const isAlnum = ch => /[a-z0-9]/i.test(ch);
function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    while (i < j && !isAlnum(s[i])) i++;
    while (i < j && !isAlnum(s[j])) j--;
    if (s[i].toLowerCase() !== s[j].toLowerCase()) return false;
    i++; j--;
  }
  return true;
}
function validPalindrome(s) {
  const isPal = (i, j) => {
    while (i < j) { if (s[i] !== s[j]) return false; i++; j--; }
    return true;
  };
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return isPal(i + 1, j) || isPal(i, j - 1);
    i++; j--;
  }
  return true;
}`
          }
        }
      ]
    }
]);
