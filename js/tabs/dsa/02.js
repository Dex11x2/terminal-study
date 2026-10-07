// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "hash map و set",
      l: 1,
      n: "بدل ما تدوّر بـ loop كل مرة، خزّن اللي شفته في Map أو Set ولاقيه في O(1)",
      items: [
        {
          cmd: "Two Sum (hash map)",
          title: "رجّع مكان رقمين مجموعهم يساوي target، والـ array مش مترتبة",
          desc: R`وانت ماشي على الـ array، اسأل: «الرقم اللي ناقصني ([[target - x]]) شفته قبل كده؟». خزّن كل رقم شفته ومكانه في Map، فالسؤال ده بقى [[O(1)]] بدل loop. الحل كله [[O(n)]].

الحل البديهي loop جوه loop يجرّب كل زوج: [[O(n^2)]]. الـ Map بتدفع [[O(n)]] ذاكرة عشان توفّر loop كامل، ودي أشهر مقايضة وقت بذاكرة.

الترتيب مهم: بتسأل الأول وبعدين تضيف الرقم الحالي. كده عمرك ما هتستخدم نفس العنصر مرتين.`,
          example: R`function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([3, 3], 6));         // [0, 1]
console.log(twoSum([], 7));             // []
// O(n) time, O(n) space (brute force over all pairs: O(n^2) time, O(1) space)`,
          try: R`عدّلها ترجّع كل الأزواج (القيم مش الـ indexes) من غير تكرار: [1, 5, 3, 3, 7, 5] مع target = 8 ترجع [5, 3] و [1, 7] بس. فكّر: هتخزّن إيه، وإزاي تمنع الزوج يتكرر؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[allPairs]] بترجّع الأزواج (القيم)، وترتيبهم مش مهم.`,
          flag: "script",
          deep: {
            why: "أشهر مسألة انترفيو في الدنيا، ومش عشان صعبة: عشان بتوريك إزاي Map بتحوّل O(n^2) لـ O(n). ونفس الفكرة («دوّر على المكمّل في اللي فات») هتلاقيها في مسائل كتير: عدد الأجزاء اللي مجموعها k، وأي «زوج بيحقق شرط».",
            how: R`dry run على [3, 2, 4] و target = 6:

i = 0: الرقم 3، والناقص 3. الـ Map فاضية. نضيف 3 عند 0.

i = 1: الرقم 2، والناقص 4. مش موجود. نضيف 2 عند 1.

i = 2: الرقم 4، والناقص 2. موجود عند 1! نرجّع [1, 2].

لاحظ i = 0: الناقص كان 3، ولو كنا ضفنا قبل ما نسأل كنا رجّعنا [0, 0]، يعني استخدمنا نفس الـ 3 مرتين.

ليه Map مش Set؟ لأن المطلوب الـ index، مش بس «موجود ولا لأ». ولو المطلوب true أو false بس، Set كفاية.

ولو الـ array مترتبة، فيه حل بذاكرة [[O(1)]] بمؤشرين (في المستوى التاني). ولو مش مترتبة وعايز [[O(1)]] ذاكرة، ترتّبها [[O(n log n)]]، بس هتضيّع الـ indexes الأصلية. ولو رتّبت أزواج من القيمة والـ index عشان تحافظ عليهم، الأزواج نفسها [[O(n)]] ذاكرة، فمبقتش [[O(1)]].`,
            when: "أي «رقمين» أو «زوج» مجموعهم أو فرقهم قيمة معينة. وفي الشغل: تلاقي منتجين سعرهم مع بعض قد رصيد العميل من غير ما تقارن الكل بالكل.",
            mistakes: R`إنك تضيف للـ Map قبل ما تسأل فتستخدم نفس العنصر مرتين. وإنك تستخدم [[nums.indexOf(need)]] بدل Map: ده loop مستخبي فرجعت [[O(n^2)]]. وإنك ترجّع القيم والمطلوب indexes (أو العكس): اقرا المسألة تاني. واسأل: فيه دايمًا حل واحد؟ الأرقام ممكن تبقى سالبة؟ (الحل ده بيشتغل مع السالب عادي).`
          },
          teach: R`## الفكرة في جملة

امشي على الأرقام مرة واحدة، ومع كل رقم اسأل: «الرقم اللي ناقصني عشان أوصل لـ target، شفته قبل كده؟». والسؤال ده بيتجاوب في خطوة واحدة لأن كل رقم عدّينا عليه متخزّن في **Map** ومعاه مكانه.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الحالة.

---

## ١. الكود سطر سطر

~~~js
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
~~~

### [[const seen = new Map();]]

[[Map]] مخزن «مفتاح ← قيمة». هنا المفتاح هو **الرقم** والقيمة هي **مكانه** (الـ index). يعني بعد ما نعدّي على 4 عند index 0، الـ Map فيها [[4 → 0]]. أهم حاجة فيها إن [[has]] و [[get]] و [[set]] كل واحدة [[O(1)]] في المتوسط: بتروح للمفتاح على طول من غير ما تعدّي على الباقي.

### [[for (let i = 0; i < nums.length; i++)]]

loop عادي بالـ index، لأن المطلوب نرجّع أماكن مش قيم. [[i]] بيبدأ من 0 ويقف قبل [[nums.length]].

### [[const need = target - nums[i];]]

لو الرقم الحالي 6 والـ target 7، يبقى الناقص 7 - 6 = 1. [[need]] هو الرقم اللي لو لقيناه في اللي فات يبقى خلصنا.

### [[if (seen.has(need)) return [seen.get(need), i];]]

- [[seen.has(need)]]: الرقم الناقص عدّينا عليه قبل كده؟ [[true]] أو [[false]].
- لو آه: [[seen.get(need)]] بتجيب مكانه القديم، و [[i]] مكان الرقم الحالي، فنرجّع الاتنين في array.

### [[seen.set(nums[i], i);]]

لو ملقيناش، سجّل الرقم الحالي ومكانه عشان الأرقام اللي جاية تلاقيه. ولاحظ الترتيب: **بنسأل الأول وبعدين نسجّل**. لو سجّلنا الأول، الرقم ممكن يلاقي نفسه (3 مع target = 6 هترجع [[[0, 0]]]).

### [[return [];]]

لو الـ loop خلص من غير ما نلاقي زوج، نرجّع array فاضية.

---

## ٢. التتبع على [[[4, 9, 1, 6, 3]]] و target = 7

| i | nums[i] | need | seen.has(need) | الـ Map بعد اللفة |
|---|---|---|---|---|
| 0 | 4 | 3 | false | {4 → 0} |
| 1 | 9 | -2 | false | {4 → 0, 9 → 1} |
| 2 | 1 | 6 | false | {4 → 0, 9 → 1, 1 → 2} |
| 3 | 6 | 1 | **true** | (رجعنا قبل التسجيل) |

عند i = 3 الناقص 1، و 1 متسجّل عند index 2، فالدالة رجّعت:

~~~text الناتج
[ 2, 3 ]
~~~

يعني [[nums[2] + nums[3]]] = 1 + 6 = 7. والـ 3 اللي في الآخر عمرنا ما وصلناله: الدالة بتقف عند أول زوج.

ولاحظ i = 1: الناقص -2، رقم سالب، وده عادي. الحل مش فارق معاه الإشارة.

---

## ٣. حالات المثال

- [[twoSum([3, 2, 4], 6)]]: عند i = 0 الناقص 3، والـ Map لسه فاضية، فمش هيلاقي نفسه. الناتج [[[1, 2]]].
- [[twoSum([3, 3], 6)]]: الـ 3 التانية بتلاقي الأولى متسجّلة عند 0، فالناتج [[[0, 1]]].
- [[twoSum([], 7)]]: الـ loop مبيلفّش خالص، فالناتج [[[]]].

~~~text الناتج الكامل (Node 24 على ويندوز)
[ 0, 1 ]
[ 1, 2 ]
[ 0, 1 ]
[]
~~~

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | لفة واحدة على n رقم، وجوه كل لفة [[has]] و [[get]] و [[set]] كل واحدة [[O(1)]] |
| الذاكرة | [[O(n)]] | في أسوأ حالة (مفيش زوج) الـ Map بتشيل الـ n رقم كلهم |
| الـ brute force | [[O(n^2)]] وقت، [[O(1)]] ذاكرة | loop جوه loop بيجرّب كل زوج |

يعني دفعنا ذاكرة [[O(n)]] عشان نشيل loop كامل. دي أشهر مقايضة وقت بذاكرة.

---

## الخلاصة

~~~text
الـ Map         رقم شفناه ← مكانه
need            target - nums[i]: الرقم اللي ناقصني
الترتيب         اسأل has الأول، وبعدين set (عشان الرقم ميلاقيش نفسه)
الرجوع          [مكان الناقص، المكان الحالي] أول ما نلاقي
الـ Big-O       O(n) وقت، O(n) ذاكرة
~~~

> نفس النمط («دوّر على المكمّل في اللي فات») هيرجع معاك في prefix sum مع hash map، وفي أي مسألة «زوج بيحقق شرط».`,
          lines: [
            "ترجّع الـ indexes بتوع الرقمين.",
            "Map: رقم شفناه ← مكانه.",
            "عدّي مرة واحدة.",
            "الرقم اللي لو لقيناه المجموع يبقى target.",
            "شفناه قبل كده؟ يبقى لقينا الزوج: مكانه، والمكان الحالي.",
            "لسه: سجّل الرقم الحالي عشان اللي جايين.",
            "قفلة.",
            "مفيش زوج.",
            "قفلة.",
            "2 + 7 = 9.",
            "مش [0, 0]: الـ 3 مينفعش تتجمع مع نفسها، لأننا بنسأل قبل ما نضيف.",
            "رقمين متساويين عادي، لأن التاني بيلاقي الأول في الـ Map.",
            "array فاضية: مفيش زوج."
          ],
          sol: R`الناتج [[[[5, 3], [1, 7]]]]. هتخزّن حاجتين: [[seen]] (Set بالقيم اللي عديت عليها)، و [[used]] (Set بمفتاح لكل زوج اتسجّل). المفتاح لازم يبقى مترتب ([[min + "," + max]]) عشان [3, 5] و [5, 3] يبقوا نفس الزوج.

جرّبها كمان على [4, 4, 4] مع 8: المفروض [[[[4, 4]]]] مرة واحدة. الحل [[O(n)]] time و [[O(n)]] space.

الغلطة المشهورة: تمنع التكرار بإنك تشيّك إن القيمة نفسها اتشافت قبل كده، فتخسر زوج زي [4, 4]. أو تستخدم array جوه Set ([[used.add([a, b])]]): الـ Set بيقارن الـ arrays بالـ reference، فكل زوج هيبان جديد.`,
          solCode: R`function allPairs(nums, target) {
  const seen = new Set(), used = new Set(), out = [];
  for (const x of nums) {
    const need = target - x;
    if (seen.has(need)) {
      const key = Math.min(x, need) + "," + Math.max(x, need);
      if (!used.has(key)) { used.add(key); out.push([need, x]); }
    }
    seen.add(x);
  }
  return out;
}
console.log(allPairs([1, 5, 3, 3, 7, 5], 8)); // [[5, 3], [1, 7]]
console.log(allPairs([4, 4, 4], 8));          // [[4, 4]]
console.log(allPairs([1, 2], 10));            // []
// O(n) time, O(n) space (seen + used)`,
          check: {
            lang: "js",
            starter: R`function allPairs(nums, target) {
  const seen = new Set();
  const used = new Set();
  const out = [];
  // ...
  return out;
}`,
            tests: R`const norm = ps => ps.map(p => [...p].sort((a, b) => a - b).join(",")).sort();
test("[1, 5, 3, 3, 7, 5] مع 8 ← [5, 3] و [1, 7] بس", () => expect(norm(allPairs([1, 5, 3, 3, 7, 5], 8))).toEqual(["1,7", "3,5"]));
test("[4, 4, 4] مع 8 ← [4, 4] مرة واحدة", () => expect(norm(allPairs([4, 4, 4], 8))).toEqual(["4,4"]));
test("[4] مع 8 ← []: الرقم مينفعش يتاخد مع نفسه", () => expect(allPairs([4], 8)).toEqual([]));
test("أرقام سالبة: [-2, 10, 3, 5] مع 8", () => expect(norm(allPairs([-2, 10, 3, 5], 8))).toEqual(["-2,10", "3,5"]));
test("[] ← []", () => expect(allPairs([], 8)).toEqual([]));
test("١٠ آلاف رقم ← ٥ آلاف زوج (O(n) بالـ Set)", () => expect(allPairs(Array.from({ length: 10000 }, (_, i) => i), 9999).length).toBe(5000));`,
            solution: R`function allPairs(nums, target) {
  const seen = new Set();
  const used = new Set();
  const out = [];
  for (const x of nums) {
    const need = target - x;
    if (seen.has(need)) {
      const key = Math.min(x, need) + "," + Math.max(x, need);
      if (!used.has(key)) { used.add(key); out.push([need, x]); }
    }
    seen.add(x);
  }
  return out;
}`
          }
        },
        {
          cmd: "contains duplicate (Set)",
          title: "فيه أي رقم ظاهر أكتر من مرة في الـ array؟",
          desc: R`Set بيخزّن كل قيمة مرة واحدة، و [[has]] و [[add]] فيه [[O(1)]] في المتوسط. عدّي على الـ array، ولو القيمة موجودة في الـ Set يبقى فيه تكرار. [[O(n)]] وقت و [[O(n)]] ذاكرة.

وفيه نسخة سطر واحد: [[new Set(nums).size !== nums.length]]. بس دي دايمًا بتعدّي على الـ array كلها، والـ loop بيقف عند أول تكرار.

ومن غير ذاكرة زيادة: رتّب وقارن كل عنصر باللي جنبه، [[O(n log n)]]، بس بتغيّر الـ array الأصلية.`,
          example: R`function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
const hasDupShort = nums => new Set(nums).size !== nums.length;
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3]));    // false
console.log(hasDupShort([NaN, NaN]));         // true
// O(n) time, O(n) space; sort + compare neighbors = O(n log n) time and no Set`,
          try: R`اكتب [[missingIds(requested, existing)]] ترجّع الـ ids اللي في الأولى ومش في التانية، مرة بـ [[filter]] و [[includes]] ومرة بـ Set، وقيس الوقت على ٥٠ ألف id في كل واحدة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[missingFast]] (اكتب نسخة الـ Set).`,
          flag: "script",
          deep: {
            why: R`«هل شفت الحاجة دي قبل كده؟» سؤال بيتسأل في الكود طول الوقت: الإيميل مسجّل قبل كده؟ الطلب اتبعت مرتين؟ الـ id موجود في القايمة التانية؟ والإجابة بـ [[includes]] بتكلّف O(n) كل مرة، وبـ Set بتكلّف O(1).`,
            how: R`الـ Set (وكمان Map) جواه hash table: بيحوّل القيمة لرقم (hash)، والرقم ده بيحدد الخانة. فـ [[has(x)]] بتروح للخانة على طول من غير ما تعدّي على الباقي. ده [[O(1)]] في المتوسط (التفاصيل عن الـ collisions في تاب الانترفيو، في سؤال «array ولا linked list ولا hash map ولا set ولا tree»).

المساواة في الـ Set اسمها SameValueZero: زي [[===]] بالظبط، ما عدا إن NaN بيساوي NaN.

والـ objects بتتقارن بالـ reference مش بالمحتوى: [[new Set([{ id: 1 }, { id: 1 }]).size]] بـ 2، لأنهم object‑ين مختلفين في الذاكرة. لو عايز تشيل تكرار objects، استخدم مفتاح: [[new Set(users.map(u => u.id))]].

وفي مشروع حقيقي كان فيه check إن كل المنتجات المطلوبة موجودة، بـ [[productIds.filter(id => !existingIds.includes(id))]]. ده [[O(n × m)]]. مع أعداد صغيرة مش هتفرق، بس الصح [[const existing = new Set(existingIds)]] وبعدين [[existing.has(id)]]: [[O(n + m)]].`,
            when: "أي «فيه تكرار؟» أو «شيل المكرر» أو «موجود في القايمة التانية؟». ولشيل التكرار من array: [[Array.from(new Set(arr))]] وبتحافظ على ترتيب أول ظهور.",
            mistakes: R`إنك تستخدم [[includes]] جوه loop على قوايم كبيرة. وإنك تتوقع إن Set بيشيل تكرار الـ objects اللي ليها نفس المحتوى. وإنك تنسى إن الحل ده [[O(n)]] ذاكرة: لو الانترفيوير قال «من غير ذاكرة زيادة»، رتّب وقارن الجيران. والـ edge cases: array فاضية (false)، وعنصر واحد (false).`
          },
          teach: R`## الفكرة في جملة

امشي على الأرقام واحد واحد، وحط كل رقم في **Set** (مجموعة بتشيل كل قيمة مرة واحدة). قبل ما تحطه اسأل: «هو موجود أصلًا؟». أول ما الإجابة تبقى آه، يبقى فيه تكرار وتقف على طول.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الحالة.

---

## ١. الكود سطر سطر

~~~js
function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
~~~

### [[const seen = new Set();]]

[[Set]] زي الـ Map بس من غير قيم: مفاتيح بس. فيه عمليتين هنستخدمهم:

- [[seen.has(x)]]: هل x جوه؟ بترجّع [[true]] أو [[false]] في [[O(1)]] في المتوسط.
- [[seen.add(x)]]: ضيف x. ولو كانت موجودة أصلًا مبيحصلش حاجة، مفيش نسختين.

### [[for (const x of nums)]]

[[for...of]] بتمشي على القيم نفسها مش الـ indexes: [[x]] في كل لفة هو العنصر. هنا مش محتاجين المكان، فده أبسط من [[for (let i = 0; ...)]].

### [[if (seen.has(x)) return true;]]

لو x اتشافت قبل كده، يبقى ده تكرار. [[return]] بتطلع من الدالة كلها على طول، فمش بنكمّل باقي الـ array.

### [[seen.add(x);]]

أول مرة نشوف x: سجّلها.

### [[return false;]]

لو الـ loop خلص كله من غير ما نلاقي تكرار.

---

## ٢. التتبع على [[[5, 8, 2, 8, 1]]]

| اللفة | x | seen.has(x) | الـ Set قبل السؤال | اللي حصل |
|---|---|---|---|---|
| 1 | 5 | false | {} | add(5) |
| 2 | 8 | false | {5} | add(8) |
| 3 | 2 | false | {5, 8} | add(2) |
| 4 | 8 | **true** | {5, 8, 2} | return true |

~~~text الناتج
true
~~~

الـ 1 اللي في الآخر عمرنا ما وصلناله. ده الفرق بين الـ loop والنسخة القصيرة.

---

## ٣. النسخة القصيرة: [[new Set(nums).size !== nums.length]]

~~~js
const hasDupShort = nums => new Set(nums).size !== nums.length;
~~~

نفكها من جوه لبرة:

1. [[new Set(nums)]]: بيبني Set من الـ array كلها مرة واحدة، والمكرر بيتشال لوحده. على [5, 8, 2, 8, 1] طلع [[Set(4) { 5, 8, 2, 1 }]].
2. [[.size]]: عدد العناصر في الـ Set، هنا 4.
3. [[!== nums.length]]: الـ array طولها 5. لو الـ Set أصغر، يبقى فيه قيم اتشالت لأنها مكررة. 4 مش 5، فالناتج [[true]].

الـ [[=>]] ده arrow function: [[nums => ...]] معناها دالة بتاخد [[nums]] وترجّع اللي بعد السهم.

الفرق إن النسخة دي **دايمًا** بتعدّي على الـ array كلها وبتبني Set كامل، حتى لو التكرار في أول عنصرين. الـ loop بيقف بدري.

---

## ٤. ليه [[[NaN, NaN]]] بترجع [[true]]؟

[[NaN]] (Not a Number) هو الناتج لما حساب يبوظ، زي [[0 / 0]]. وفي JS هو مش بيساوي نفسه بـ [[===]]. شغّلنا:

~~~js
console.log(NaN === NaN, new Set([NaN, NaN]).size, [NaN].includes(NaN), [NaN].indexOf(NaN));
~~~

~~~text الناتج
false 1 true -1
~~~

الـ Set بيقارن بطريقة اسمها **SameValueZero**: زي [[===]] بالظبط، ما عدا إن [[NaN]] بيساوي [[NaN]]. فالاتنين بقوا عنصر واحد و [[size]] = 1. و [[includes]] بتستخدم نفس الطريقة، أما [[indexOf]] بتستخدم [[===]] فمش بتلاقيه.

---

## ٥. الناتج الكامل

~~~text الناتج (Node 24 على ويندوز)
true
false
true
~~~

وجرّبنا كمان [[containsDuplicate([])]]: الـ loop مبيلفّش، والناتج [[false]].

---

## ٦. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | لفة واحدة، وجوهها [[has]] و [[add]] [[O(1)]] في المتوسط |
| الذاكرة | [[O(n)]] | لو مفيش تكرار الـ Set بيشيل الـ n عنصر |
| sort + مقارنة الجيران | [[O(n log n)]] وقت | من غير Set، بس بيغيّر ترتيب الـ array الأصلية |

ولو استخدمت [[array.includes(x)]] بدل [[seen.has(x)]]، كل سؤال بيعدّي على الـ array: [[O(n)]] لكل عنصر، يعني [[O(n^2)]] كله.

---

## الخلاصة

~~~text
Set            كل قيمة مرة واحدة، has و add في O(1)
الـ loop        اسأل has، لو آه ارجع true على طول، غير كده add
النسخة القصيرة   new Set(nums).size !== nums.length، بس بتعدّي على الكل
NaN            الـ Set بيعتبرها زي بعض (SameValueZero)
الـ Big-O       O(n) وقت، O(n) ذاكرة
~~~`,
          lines: [
            "true لو فيه أي قيمة مكررة.",
            "اللي شفناه لحد دلوقتي.",
            "عدّي على العناصر.",
            "شفناها قبل كده: تكرار، ونقف على طول.",
            "أول مرة: سجّلها.",
            "قفلة.",
            "خلصنا ومفيش تكرار.",
            "قفلة.",
            "نسخة سطر واحد: لو الـ Set أصغر من الـ array، يبقى فيه قيم اتشالت لأنها مكررة.",
            "1 ظاهرة مرتين.",
            "كله مختلف.",
            "الـ Set بيعتبر NaN زي NaN (مع إن NaN !== NaN)."
          ],
          sol: R`النسختين بيطلّعوا نفس النتيجة (مثلًا [[missingIds([1, 2, 3, 4], [2, 4])]] ترجع [[[1, 3]]]). الفرق في الوقت: على ٥٠ ألف id في كل ناحية، نسخة [[filter]] + [[includes]] أخدت حوالي 1.8 ثانية عندي، ونسخة الـ Set حوالي 8ms. أرقامك هتختلف، بس الفرق هيفضل بالمئات.

السبب: [[includes]] بتعدّي على الـ array التانية كلها لكل id، فده [[O(n * m)]]. الـ Set بتتبني مرة واحدة [[O(m)]]، وبعدين كل [[has]] [[O(1)]]، فالمجموع [[O(n + m)]].

الغلطة المشهورة: تبني الـ Set جوه الـ filter ([[new Set(existing).has(id)]]). كده بتبنيها من الأول لكل id، وترجع [[O(n * m)]] تاني وأبطأ كمان.`,
          solCode: R`const missingSlow = (requested, existing) => requested.filter(id => !existing.includes(id));
function missingFast(requested, existing) {
  const have = new Set(existing);
  return requested.filter(id => !have.has(id));
}
console.log(missingFast([1, 2, 3, 4], [2, 4])); // [1, 3]
const requested = Array.from({ length: 50_000 }, (_, i) => i);
const existing = Array.from({ length: 50_000 }, (_, i) => i + 25_000);
console.time("includes");
console.log(missingSlow(requested, existing).length); // 25000
console.timeEnd("includes"); // 1-2 s (depends on the machine)
console.time("set");
console.log(missingFast(requested, existing).length); // 25000
console.timeEnd("set");      // a few ms
// includes: O(n * m) time; Set: O(n + m) time, O(m) extra space`,
          check: {
            lang: "js",
            starter: R`function missingFast(requested, existing) {
  // ابني Set من existing مرة واحدة برّا الـ filter
  return [];
}`,
            tests: R`test("([1, 2, 3, 4], [2, 4]) ← [1, 3]", () => expect(missingFast([1, 2, 3, 4], [2, 4])).toEqual([1, 3]));
test("بتحافظ على ترتيب الأولى: ([5, 1, 4], [4]) ← [5, 1]", () => expect(missingFast([5, 1, 4], [4])).toEqual([5, 1]));
test("التانية فاضية ← الأولى كلها", () => expect(missingFast([1, 2], [])).toEqual([1, 2]));
test("strings كمان: (['a', 'b'], ['b']) ← ['a']", () => expect(missingFast(["a", "b"], ["b"])).toEqual(["a"]));
test("5000 id في كل ناحية (Set: O(n + m)، includes: O(n × m))", () => {
  const req = Array.from({ length: 5000 }, (_, i) => i), have = req.filter(x => x % 2 === 0);
  const r = missingFast(req, have);
  expect([r.length, r[0], r.at(-1)]).toEqual([2500, 1, 4999]);
});`,
            solution: R`function missingFast(requested, existing) {
  const have = new Set(existing);
  return requested.filter(id => !have.has(id));
}`
          }
        },
        {
          cmd: "first unique (count + scan)",
          title: "أول حرف مش متكرر في string، ورجّع مكانه (أو -1)",
          desc: R`عدّيتين: الأولى تعدّ كل حرف ظهر كام مرة، والتانية تمشي على الـ string بالترتيب وترجّع أول حرف عدّه 1. [[O(n)]] وقت.

ليه عدّيتين؟ لأنك وانت في النص متعرفش الحرف ده هيتكرر بعدين ولا لأ. العدّ الكامل الأول بيجاوب السؤال ده.

والذاكرة [[O(k)]] حيث k عدد الحروف المختلفة. لو الحروف a-z بس يبقى 26 على الأكتر، يعني [[O(1)]].`,
          example: R`function firstUniqChar(s) {
  const count = new Map();
  for (let i = 0; i < s.length; i++) count.set(s[i], (count.get(s[i]) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}
console.log(firstUniqChar("leetcode"));     // 0
console.log(firstUniqChar("loveleetcode")); // 2
console.log(firstUniqChar("aabb"));         // -1
// O(n) time, O(k) space (k = alphabet size, so O(1) for a-z)`,
          try: R`اعملها بـ array طولها 26 بدل Map (الحروف a-z بس). وبعدين النسخة الـ stream: الحروف جاية واحد واحد، وبعد كل حرف لازم ترد «أول حرف مش متكرر لحد دلوقتي» (فكّر في Map مع queue). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[firstUniqChar]] بـ array طولها 26، و [[FirstUnique]] فيها [[add(ch)]] بترجّع الرد بعد كل حرف (أو null).`,
          flag: "script",
          deep: {
            why: "بتعلّمك نمط «عدّ الأول، بعدين دوّر»، وبتختبر إنك بتحافظ على الترتيب. ولو عملتها بـ loop جوه loop (لكل حرف عدّ هو اتكرر كام مرة) هتبقى O(n^2).",
            how: R`dry run على loveleetcode:

بعد العدّ: l عددها 2، و o عددها 2، و v عددها 1، و e عددها 4، و t و c و d كل واحد 1.

العدّية التانية: i = 0 (l) عددها 2. i = 1 (o) عددها 2. i = 2 (v) عددها 1، نرجّع 2.

ليه مش brute force؟ لكل حرف تعدّ هو اتكرر كام مرة في الـ string كلها: n حرف × n عدّ = [[O(n^2)]]. العدّ مرة واحدة في Map بيخلّي كل سؤال [[O(1)]].

ينفع كمان تعدّي على الـ Map في العدّية التانية بدل الـ string (الـ Map بتحفظ ترتيب أول إضافة)، بس هتحتاج تخزّن الـ index مع العدد. العدّي على الـ string أبسط.`,
            when: "أي «أول» حاجة بتحقق شرط بيعتمد على الكل: أول عميل طلب مرة واحدة بس، أول رقم ملوش تكرار.",
            mistakes: R`إنك تخلط [[for...of]] (بيمشي على code points) مع القراية بالـ index (بتقرا UTF-16 code units): مع الإيموجي العدّ والقراية مش هيتطابقوا. خليك على نوع واحد في الـ loopين، زي المثال. وإنك تنسى الـ -1 لما كله متكرر. وإنك تستخدم [[s.indexOf(ch) === s.lastIndexOf(ch)]] لكل حرف: شكلها أنيق بس [[O(n^2)]].`
          },
          teach: R`## الفكرة في جملة

عدّيتين على الـ string: الأولى **تعدّ** كل حرف ظهر كام مرة وتخزّن العدد في Map، والتانية تمشي على الحروف **بالترتيب** وترجّع مكان أول حرف عدده 1. محتاجين العدّية الأولى كاملة لأنك وانت في النص متعرفش الحرف ده هيتكرر بعدين ولا لأ.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] في الـ loopين يطبع الحالة.

---

## ١. الكود سطر سطر

~~~js
function firstUniqChar(s) {
  const count = new Map();
  for (let i = 0; i < s.length; i++) count.set(s[i], (count.get(s[i]) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}
~~~

### [[const count = new Map();]]

Map: المفتاح الحرف، والقيمة عدد مرات ظهوره.

### العدّية الأولى: [[count.set(s[i], (count.get(s[i]) || 0) + 1)]]

السطر ده هتكتبه كتير، فنفكه من جوه لبرة:

1. [[s[i]]]: الحرف اللي عند index i.
2. [[count.get(s[i])]]: عدده لحد دلوقتي. لو أول مرة نشوفه، الـ Map مفيهاش المفتاح فبترجّع [[undefined]].
3. [[|| 0]]: [[||]] معناها «أو»: لو اللي على الشمال قيمة falsy (زي [[undefined]]) خد اللي على اليمين. فأول مرة بتبقى 0.
4. [[+ 1]]: زوّد واحد.
5. [[count.set(s[i], ...)]]: خزّن العدد الجديد.

جرّبنا على Map فاضية: [[m.get("x")]] طلعت [[undefined]]، و [[m.get("x") || 0]] طلعت 0، و [[(m.get("x") || 0) + 1]] طلعت 1.

ولاحظ إن الـ for هنا من غير [[{ }]]: لما جسم الـ loop سطر واحد ينفع تكتبه على نفس السطر.

### العدّية التانية: [[if (count.get(s[i]) === 1) return i;]]

نمشي من أول الـ string تاني، ولكل حرف نسأل الـ Map: عددك 1؟ أول واحد يقول آه نرجّع مكانه [[i]]. ليه بنمشي على الـ string مش على الـ Map؟ لأن الـ string هي اللي فيها الترتيب والـ index.

### [[return -1;]]

لو كل الحروف متكررة. [[-1]] اتفاق مشهور معناه «مش موجود» (زي [[indexOf]]).

---

## ٢. التتبع على [[swiss]]

### العدّية الأولى

| i | s[i] | الـ Map بعد السطر |
|---|---|---|
| 0 | s | {s: 1} |
| 1 | w | {s: 1, w: 1} |
| 2 | i | {s: 1, w: 1, i: 1} |
| 3 | s | {s: **2**, w: 1, i: 1} |
| 4 | s | {s: **3**, w: 1, i: 1} |

لاحظ: لو كنا وقفنا عند i = 0 وقلنا «s ظهرت مرة لحد دلوقتي، يبقى هي الإجابة» كنا هنغلط، لأنها اتكررت بعد كده. عشان كده لازم العدّ يخلص الأول.

### العدّية التانية

| i | s[i] | count.get | النتيجة |
|---|---|---|---|
| 0 | s | 3 | كمّل |
| 1 | w | 1 | **return 1** |

~~~text الناتج
1
~~~

---

## ٣. حالات المثال والناتج

- [[leetcode]]: الـ l عددها 1 وهي أول حرف، فالناتج 0 من أول خطوة في العدّية التانية.
- [[loveleetcode]]: l و o متكررين، و v عددها 1 عند index 2.
- [[aabb]]: كله عدده 2، فالناتج -1.

~~~text الناتج الكامل (Node 24 على ويندوز)
0
2
-1
~~~

وجرّبنا [[firstUniqChar("")]]: الـ loopين مبيلفّوش، والناتج [[-1]].

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n)]] | عدّيتين كل واحدة n خطوة = 2n، والـ 2 بتتشال. وكل [[get]] و [[set]] [[O(1)]] |
| الذاكرة | [[O(k)]] | k = عدد الحروف المختلفة اللي في الـ Map. لو الحروف a-z بس يبقى 26 على الأكتر، يعني [[O(1)]] |
| الـ brute force | [[O(n^2)]] | لكل حرف تعدّ هو اتكرر كام مرة في الـ string كلها |

---

## الخلاصة

~~~text
العدّية الأولى    count.set(ch, (count.get(ch) || 0) + 1)
|| 0             أول مرة get بترجّع undefined، فنبدأ من 0
العدّية التانية   على الـ string بالترتيب، أول عدد = 1 هو الإجابة
مفيش            -1
الـ Big-O         O(n) وقت، O(k) ذاكرة
~~~

> نمط «عدّ الأول، وبعدين دوّر» بيحل أي سؤال «أول حاجة» بشرط بيعتمد على الكل.`,
          lines: [
            "ترجّع index أول حرف مش متكرر.",
            "Map: حرف ← عدده.",
            "العدّية الأولى: عدّ كل الحروف.",
            "العدّية التانية: بالترتيب من الأول.",
            "أول حرف عدده 1 هو الإجابة.",
            "قفلة.",
            "كل الحروف متكررة.",
            "قفلة.",
            "l ظاهرة مرة واحدة ومكانها 0.",
            "l و o متكررين، و v عند 2.",
            "كله متكرر."
          ],
          sol: R`بالـ array: [[new Array(26).fill(0)]]، والـ index هو [[ch.charCodeAt(0) - 97]] (لأن كود a هو 97). النتايج زي ما هي: 0 و 2 و -1. والـ space بقى [[O(1)]] بجد (26 خانة مهما الـ string طول).

الـ stream: Map للعدّ، و queue بالحروف بالترتيب، ومؤشر [[head]]. مع كل حرف جديد: زوّد عدّه وحطه في الـ queue، وبعدين قدّم [[head]] طول ما الحرف اللي عنده عدده أكبر من 1. على «aabcbc» الردود: [[a null b b c null]].

الغلطة المشهورة: تعدّي على الـ string كلها من الأول بعد كل حرف، ده [[O(n^2)]]. الـ [[head]] بيتحرك لقدام بس، فالتكلفة [[amortized O(1)]] لكل حرف.`,
          solCode: R`function firstUniqChar(s) {
  const count = new Array(26).fill(0);
  const idx = ch => ch.charCodeAt(0) - 97;
  for (const ch of s) count[idx(ch)]++;
  for (let i = 0; i < s.length; i++) {
    if (count[idx(s[i])] === 1) return i;
  }
  return -1;
}
console.log(firstUniqChar("leetcode"), firstUniqChar("loveleetcode"), firstUniqChar("aabb")); // 0 2 -1
class FirstUnique {
  constructor() { this.count = new Map(); this.queue = []; this.head = 0; }
  add(ch) {
    this.count.set(ch, (this.count.get(ch) || 0) + 1);
    this.queue.push(ch);
    while (this.head < this.queue.length && this.count.get(this.queue[this.head]) > 1) this.head++;
    return this.head < this.queue.length ? this.queue[this.head] : null;
  }
}
const fu = new FirstUnique();
console.log([..."aabcbc"].map(ch => String(fu.add(ch))).join(" ")); // a null b b c null
// array: O(n) time, O(1) space (26 slots); stream: amortized O(1) per char (head only moves forward)`,
          check: {
            lang: "js",
            starter: R`function firstUniqChar(s) {
  const count = new Array(26).fill(0);
  // الـ index: ch.charCodeAt(0) - 97
  return -1;
}
class FirstUnique {
  constructor() { this.count = new Map(); this.queue = []; this.head = 0; }
  add(ch) {
    // زوّد العدّ وحط الحرف في الـ queue، وقدّم head طول ما الحرف اللي عنده متكرر
    return null;
  }
}`,
            tests: R`test("'leetcode' ← 0", () => expect(firstUniqChar("leetcode")).toBe(0));
test("'loveleetcode' ← 2", () => expect(firstUniqChar("loveleetcode")).toBe(2));
test("'aabb' و '' ← -1", () => expect([firstUniqChar("aabb"), firstUniqChar("")]).toEqual([-1, -1]));
const stream = s => { const fu = new FirstUnique(); return [...s].map(ch => fu.add(ch)); };
test("stream 'aabcbc' ← a null b b c null", () => expect(stream("aabcbc")).toEqual(["a", null, "b", "b", "c", null]));
test("كل FirstUnique ليها حالتها: 'ab' ← a a، و 'b' لوحدها ← b", () => expect([stream("ab"), stream("b")]).toEqual([["a", "a"], ["b"]]));
test("١٠٠ ألف حرف: الـ head بيمشي لقدام بس (amortized O(1) لكل حرف)", () => {
  const s = "ab".repeat(50000) + "c";
  expect(firstUniqChar(s)).toBe(100000);
  const r = stream(s);
  expect([r.length, r[0], r[1], r.at(-1)]).toEqual([100001, "a", "a", "c"]);
});`,
            solution: R`function firstUniqChar(s) {
  const count = new Array(26).fill(0);
  for (const ch of s) count[ch.charCodeAt(0) - 97]++;
  for (let i = 0; i < s.length; i++) if (count[s.charCodeAt(i) - 97] === 1) return i;
  return -1;
}
class FirstUnique {
  constructor() { this.count = new Map(); this.queue = []; this.head = 0; }
  add(ch) {
    this.count.set(ch, (this.count.get(ch) || 0) + 1);
    this.queue.push(ch);
    while (this.head < this.queue.length && this.count.get(this.queue[this.head]) > 1) this.head++;
    return this.head < this.queue.length ? this.queue[this.head] : null;
  }
}`
          }
        },
        {
          cmd: "group anagrams (key)",
          title: "جمّع الكلمات اللي ليها نفس الحروف مع بعض في مجموعات",
          desc: R`لكل كلمة اعمل «مفتاح» يطلع واحد لكل الـ anagrams: الحروف مترتبة (eat و tea الاتنين aet). وبعدين Map: مفتاح ← قايمة الكلمات. [[O(n × k log k)]] حيث k طول أطول كلمة.

الفكرة الكبيرة: لما عايز تجمّع حاجات «متساوية بطريقة ما»، دوّر على مفتاح بيطلع نفس القيمة لكل الحاجات دي، وخلي الـ Map تعمل الباقي. ده نفس [[GROUP BY]] في SQL.

ومفتاح أسرع من الـ sort: عدد كل حرف من a لـ z متجمّع في string بفاصل، ده [[O(k)]] بدل [[O(k log k)]].`,
          example: R`function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const key = [...w].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
console.log(groupAnagrams([""])); // [[""]]
// O(n * k log k) time (k = longest word), O(n * k) space`,
          try: R`غيّر المفتاح لعدّ الحروف: array من 26 صفر، زوّد عند كل حرف، و [[join("#")]]. اتأكد إن النتيجة زي ما هي. ليه الـ # مهمة؟ (من غيرها العدّين [1, 11] و [11, 1] الاتنين يبقوا 111). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[groupAnagrams]] بمفتاح العدّ و [[#]]، وترتيب المجموعات مش مهم.`,
          flag: "script",
          deep: {
            why: "مسألة بتعلّمك أقوى استخدام للـ Map: التجميع بمفتاح محسوب. في الشغل هتعمله كل يوم: الطلبات حسب اليوم، والمنتجات حسب الفئة، واللوجات حسب نوع الـ error. وفي JS الجديد فيه [[Object.groupBy]] و [[Map.groupBy]] بيعملوا ده جاهز.",
            how: R`dry run على eat و tea و tan و ate و nat و bat:

eat مفتاحها aet: جديد، [eat]. tea مفتاحها aet: موجود، [eat, tea]. tan مفتاحها ant: جديد. ate مفتاحها aet: [eat, tea, ate]. nat مفتاحها ant: [tan, nat]. bat مفتاحها abt: جديد.

النتيجة ٣ مجموعات، والـ Map بتحفظ ترتيب أول ظهور لكل مفتاح.

الـ Big-O: n كلمة، ولكل كلمة sort لحروفها [[O(k log k)]]، فالمجموع [[O(n × k log k)]]. بمفتاح العدّ: لكل كلمة [[O(k)]] عدّ و [[O(26)]] join، فالمجموع [[O(n × k)]].

الـ [[sort()]] من غير comparator بيرتّب كـ strings حسب UTF-16، وده تمام هنا لأننا عايزين أي ترتيب ثابت، مش ترتيب أبجدي مظبوط. و [[Map.groupBy(words, w => key(w))]] بيعمل نفس الـ loop في سطر.`,
            when: "أي «جمّع» أو «صنّف» أو «كام نوع مختلف». وكمان لما تدوّر على تكرار بمعنى أوسع من «متساوي بالظبط»: إيميلات بحروف كبيرة وصغيرة، المفتاح [[toLowerCase()]].",
            mistakes: R`إنك تستخدم array كمفتاح في Map: [[groups.get(["a", "e", "t"])]] عمره ما هيلاقي حاجة، لأن كل array جديدة reference مختلف. لازم string. وفي مفتاح العدّ من غير فاصل، عدّين مختلفين ممكن يطلعوا نفس الـ string. والـ edge cases: كلمة فاضية، وكلمة واحدة، وكلمات مكررة بالظبط (بيتحطوا في نفس المجموعة مرتين).`
          },
          teach: R`## الفكرة في جملة

لكل كلمة اعمل **مفتاح** بيطلع واحد لكل الكلمات اللي ليها نفس الحروف: الحروف نفسها مترتبة أبجديًا (listen و silent الاتنين [[eilnst]]). وبعدين Map: المفتاح ← قايمة الكلمات اللي ليها المفتاح ده. الكلمات اللي ليها نفس المفتاح بتقع في نفس القايمة لوحدها.

**anagram** يعني كلمتين نفس الحروف بنفس العدد بس بترتيب مختلف.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الحالة.

---

## ١. الكود سطر سطر

~~~js
function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const key = [...w].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
~~~

### [[const groups = new Map();]]

المفتاح string (الحروف مترتبة)، والقيمة array فيها الكلمات.

### [[const key = [...w].sort().join("");]]

ده أهم سطر، ونفكه من جوه لبرة على كلمة [[listen]]:

1. [[[...w]]]: الـ spread بيفرد حروف الـ string في array: [[["l","i","s","t","e","n"]]].
2. [[.sort()]]: بيرتّب الـ array نفسها. من غير دالة مقارنة بيرتّب كـ strings حسب كود الحرف (UTF-16): [[["e","i","l","n","s","t"]]].
3. [[.join("")]]: بيلزق الحروف في string من غير فاصل: [[eilnst]].

ليه الترتيب بيعمل مفتاح صح؟ أي كلمتين نفس الحروف، لو رتّبت حروفهم هيطلعوا نفس الـ string بالظبط. ولو الحروف مختلفة ولو في حرف واحد، الـ string هتختلف.

وخلي بالك إن [[sort()]] من غير comparator مش ترتيب أبجدي مظبوط: جرّبنا [[["b","a","B","10","9"].sort()]] وطلعت [[[ '10', '9', 'B', 'a', 'b' ]]] (الأرقام قبل الحروف الكبيرة قبل الصغيرة، و "10" قبل "9"). هنا مش فارقة، لأننا عايزين أي ترتيب **ثابت** وخلاص.

### [[if (!groups.has(key)) groups.set(key, []);]]

[[!]] معناها «مش». لو المفتاح ده أول مرة يظهر، ابدأ له قايمة فاضية.

### [[groups.get(key).push(w);]]

هات القايمة بتاعة المفتاح، وضيف الكلمة في آخرها بـ [[push]]. وده بيعدّل القايمة اللي جوه الـ Map نفسها، لأن [[get]] بترجّع نفس الـ array مش نسخة.

### [[return [...groups.values()];]]

- [[groups.values()]]: بترجّع القيم بس (القوايم) من غير المفاتيح، بترتيب أول إضافة.
- [[[... ]]]: نحوّلها array عادية.

---

## ٢. التتبع على [[["listen", "stone", "silent", "notes", "tinsel"]]]

| w | key | جديد؟ | الـ Map بعد اللفة |
|---|---|---|---|
| listen | eilnst | آه | eilnst: [listen] |
| stone | enost | آه | eilnst: [listen]، enost: [stone] |
| silent | eilnst | لأ | eilnst: [listen, silent]، enost: [stone] |
| notes | enost | لأ | eilnst: [listen, silent]، enost: [stone, notes] |
| tinsel | eilnst | لأ | eilnst: [listen, silent, tinsel]، enost: [stone, notes] |

~~~text الناتج
[ [ 'listen', 'silent', 'tinsel' ], [ 'stone', 'notes' ] ]
~~~

مجموعتين بترتيب أول ظهور لكل مفتاح: eilnst ظهر الأول (مع listen)، فقايمته الأول.

---

## ٣. ليه المفتاح string مش array؟

الـ Map بتقارن الـ objects (والـ array object) بالـ **reference**: يعني «هل ده نفس الحاجة في الذاكرة؟» مش «هل المحتوى زي بعض؟». شغّلنا:

~~~js
const g = new Map(); g.set(["a"], 1); console.log(g.get(["a"]));
~~~

~~~text الناتج
undefined
~~~

الـ [[["a"]]] التانية array جديدة، فمش هي المفتاح. عشان كده بنعمل [[join("")]]: الـ strings بتتقارن بالمحتوى.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
[ [ '' ] ]
~~~

الكلمة الفاضية [[""]]: [[[...""]]] array فاضية، ومفتاحها [[""]]، فبقت مجموعة لوحدها فيها كلمة فاضية.

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| الوقت | [[O(n × k log k)]] | n كلمة، ولكل كلمة sort لحروفها (k = طول أطول كلمة) بـ [[O(k log k)]]. باقي الشغل ([[has]] و [[get]] و [[push]]) [[O(1)]] تقريبًا |
| الذاكرة | [[O(n × k)]] | الـ Map شايلة كل الكلمات ومفاتيحها |

ولو مفتاح تاني اتعمل من غير sort، الـ log k هتختفي. ده اللي التمرين بيطلبه.

---

## الخلاصة

~~~text
المفتاح        [...w].sort().join(""): الحروف مترتبة
الـ Map         مفتاح ← قايمة كلمات
أول مرة         groups.set(key, [])
الإضافة         groups.get(key).push(w)
الناتج          [...groups.values()] بترتيب أول ظهور
المفتاح string   لأن الـ arrays بتتقارن بالـ reference
~~~

> «جمّع بمفتاح محسوب» هو نفس [[GROUP BY]] في SQL، وهتستخدمه كل يوم: الطلبات حسب اليوم، واللوجات حسب نوع الـ error.`,
          lines: [
            "ترجّع array من المجموعات.",
            "Map: المفتاح ← الكلمات اللي ليها المفتاح ده.",
            "لكل كلمة.",
            "المفتاح: حروفها مترتبة. كل الـ anagrams ليهم نفس المفتاح.",
            "أول مرة نشوف المفتاح ده: ابدأ له قايمة فاضية.",
            "ضيف الكلمة لقايمة المفتاح بتاعها.",
            "قفلة.",
            "القوايم بس، من غير المفاتيح.",
            "قفلة.",
            "٣ مجموعات، بترتيب أول ظهور لكل مفتاح (الناتج في السطر اللي تحت).",
            "كلمة فاضية: مجموعة فيها كلمة فاضية."
          ],
          sol: R`النتيجة نفسها: [[[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]]]، و [[[[""]]]] لكلمة فاضية. الفرق إن المفتاح بقى زي [[1#0#0#...]] بدل الحروف مترتبة، والوقت بقى [[O(n * k)]] بدل [[O(n * k log k)]].

الـ [[#]] بتفصل بين الأعداد: من غيرها [[[1, 11].join("")]] و [[[11, 1].join("")]] الاتنين بيبقوا [[111]]، فكلمتين مختلفتين ممكن ياخدوا نفس المفتاح. مع الـ [[#]] بيبقوا [[1#11]] و [[11#1]]. ده بيحصل لما حرف يتكرر 10 مرات أو أكتر.

الغلطة المشهورة: تستخدم الـ array نفسها كمفتاح في الـ Map. الـ Map بتقارن الـ objects بالـ reference، فكل كلمة هتطلع في مجموعة لوحدها.`,
          solCode: R`function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const count = new Array(26).fill(0);
    for (const ch of w) count[ch.charCodeAt(0) - 97]++;
    const key = count.join("#");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
console.log(groupAnagrams([""])); // [[""]]
console.log([1, 11].join(""), [11, 1].join(""), [1, 11].join("#"), [11, 1].join("#")); // 111 111 1#11 11#1
// O(n * k) time (no sort), O(n * k) space`,
          check: {
            lang: "js",
            starter: R`function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const count = new Array(26).fill(0);
    // زوّد العدّ لكل حرف، والمفتاح count.join("#")
  }
  return [...groups.values()];
}`,
            tests: R`const norm = gs => gs.map(g => JSON.stringify([...g].sort())).sort();
test("eat tea tan ate nat bat ← ٣ مجموعات", () => expect(norm(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))).toEqual(norm([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]])));
test("[''] ← [['']]", () => expect(groupAnagrams([""])).toEqual([[""]]));
test("[] ← []", () => expect(groupAnagrams([])).toEqual([]));
test("فخ الـ #: a×11 + b و a + b×11 مجموعتين مش واحدة", () => expect(groupAnagrams(["aaaaaaaaaaab", "abbbbbbbbbbb"]).length).toBe(2));
test("٢٠ ألف كلمة (O(n × k))", () => {
  const words = Array.from({ length: 20000 }, (_, i) => (i % 2 ? "listen" : "silent") + "abcdefghij"[i % 10]);
  expect(groupAnagrams(words).length).toBe(10);
});`,
            solution: R`function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const count = new Array(26).fill(0);
    for (const ch of w) count[ch.charCodeAt(0) - 97]++;
    const key = count.join("#");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}`
          }
        }
      ]
    },
    {
      t: "recursion و prefix sums",
      l: 1,
      n: "دالة بتنادي نفسها على مسألة أصغر، وتجهيز مرة واحدة يوفّر loops كتير بعدين",
      items: [
        {
          cmd: "recursion (base case)",
          title: "احسب n! بدالة بتنادي نفسها",
          desc: R`recursion يعني دالة بتحل المسألة بإنها تنادي نفسها على نسخة أصغر منها، لحد ما توصل لحالة صغيرة إجابتها معروفة (الـ base case). [[factorial(5) = 5 × factorial(4)]]، ولحد [[factorial(1) = 1]].

أي دالة recursive محتاجة حاجتين: base case بيوقّف، وكل نداء بيقرّب منه. لو نسيت الأولى، أو الخطوة مش بتقرّب، الدالة هتنادي نفسها لحد ما الـ stack يتملي.

الـ Big-O هنا: n نداء، كل واحد شغله [[O(1)]]، يعني [[O(n)]] وقت، و [[O(n)]] ذاكرة للـ call stack.`,
          example: R`function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
function sumDigits(n) {
  if (n < 10) return n;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}
console.log(factorial(5));    // 120
console.log(factorial(0));    // 1
console.log(sumDigits(9045)); // 18
console.log(factorial(171));  // Infinity
// factorial: O(n) time, O(n) call stack; sumDigits: O(number of digits)`,
          try: R`اكتب [[power(x, n)]] بـ recursion بطريقتين: [[x * power(x, n - 1)]]، و «لو n زوجي، احسب [[power(x, n / 2)]] مرة واحدة وربّعها». عدّ النداءات في الاتنين لـ n = 1024، وقول الـ Big-O لكل واحدة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[powerFast]] بالنسخة اللي بتقسم n على ٢.`,
          flag: "script",
          deep: {
            why: "recursion هي الطريقة الطبيعية لأي حاجة شكلها «جواها نسخة أصغر منها»: شجرة (كل فرع شجرة)، وفولدرات جوه فولدرات، و JSON متداخل، وكومنتات عليها ردود عليها ردود. ومن غيرها trees و backtracking و DP هيبقوا صعبين جدًا.",
            how: R`طريقة التفكير (مش التتبّع): افترض إن الدالة شغالة صح للمسألة الأصغر، وركّز بس على سؤال واحد: إزاي أبني الإجابة من إجابة الأصغر؟ ده اسمه leap of faith.

[[factorial(n)]]: لو [[factorial(n - 1)]] صح، يبقى الإجابة n × الناتج. خلاص.

وبعدين الـ base case: أصغر مسألة ممكنة وإجابتها من غير نداء. هنا n ≤ 1.

التتبّع لـ [[factorial(4)]]: بتستنى [[factorial(3)]]، اللي بتستنى [[factorial(2)]]، اللي بتستنى [[factorial(1)]] اللي بترجّع 1 على طول. بعدين النتايج بتطلع لفوق: 2 × 1 = 2، و 3 × 2 = 6، و 4 × 6 = 24. النداءات بتنزل لحد الـ base case، والنتايج بتطلع. ده بالظبط اللي بيحصل في الـ call stack (الدرس الجاي).

و [[n <= 1]] أأمن من [[n === 1]]: الأولى بتغطي 0، والتانية مع [[factorial(0)]] هتنزل -1 و -2 ومش هتقف.`,
            when: "trees و graphs (DFS)، و divide and conquer (merge sort)، و backtracking، وأي بيانات متداخلة. وتجنّبها لو العمق ممكن يوصل آلاف (شوف الدرس الجاي).",
            mistakes: R`base case ناقص أو مش بيتوصله ([[n === 1]] مع n = 0، أو رقم عشري زي 2.5). ونسيان [[return]] قبل النداء: الدالة هترجّع undefined. وإنك تفتكر إن الأرقام مالهاش حد: بعد 18! الناتج بيعدّي [[Number.MAX_SAFE_INTEGER]]، يعني مفيش ضمان إنه مضبوط، ومحتاج [[BigInt]] (اكتب [[1n]] بدل 1).`
          },
          teach: R`## الفكرة في جملة

**recursion** يعني دالة بتنادي نفسها على نسخة أصغر من نفس المسألة. 4! = 4 × 3!، و 3! = 3 × 2!، وهكذا لحد ما نوصل لمسألة صغيرة إجابتها معروفة من غير حساب: ده الـ **base case** (1! = 1). من غيره الدالة مش هتقف.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] في أول كل نداء وفي آخره، بمسافة على قد عمق النداء.

---

## ١. [[factorial]] سطر سطر

~~~js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
~~~

**factorial** (المضروب، ويتكتب n!) = حاصل ضرب كل الأرقام من 1 لـ n. يعني 4! = 4 × 3 × 2 × 1 = 24.

### [[if (n <= 1) return 1;]]

الـ base case. 1! = 1، و 0! = 1 بالتعريف. ليه [[<=]] مش [[===]]؟ لو كتبت [[n === 1]] ونادينا [[factorial(0)]]، الشرط مش هيتحقق أبدًا: هتنزل -1 و -2 ومش هتقف لحد ما البرنامج يقع.

### [[return n * factorial(n - 1);]]

هنا السر: افترض إن [[factorial(n - 1)]] بترجّع الإجابة الصح للمسألة الأصغر (ده اسمه **leap of faith**). يبقى إجابتك n × الناتج ده. وكل نداء n بيقل واحد، فأكيد هنوصل لـ 1.

---

## ٢. التتبع: [[factorial(4)]]

كل نداء بيستنى النداء اللي جواه يخلص الأول. المسافة على الشمال = العمق:

~~~text الناتج (Node 24 على ويندوز)
call factorial(4)
  call factorial(3)
    call factorial(2)
      call factorial(1)
      base -> 1
    factorial(2) = 2 * 1 = 2
  factorial(3) = 3 * 2 = 6
factorial(4) = 4 * 6 = 24
~~~

نفس الكلام في جدول، بترتيب اللي حصل:

| الخطوة | النداء | بيستنى | بيرجّع |
|---|---|---|---|
| 1 | factorial(4) | factorial(3) | |
| 2 | factorial(3) | factorial(2) | |
| 3 | factorial(2) | factorial(1) | |
| 4 | factorial(1) | ولا حاجة (base case) | 1 |
| 5 | factorial(2) | | 2 × 1 = 2 |
| 6 | factorial(3) | | 3 × 2 = 6 |
| 7 | factorial(4) | | 4 × 6 = 24 |

النداءات **بتنزل** لحد الـ base case، والنتايج **بتطلع** لفوق. أقصى عمق وصلناه 4 نداءات مفتوحين في نفس الوقت.

---

## ٣. [[sumDigits]] سطر سطر

~~~js
function sumDigits(n) {
  if (n < 10) return n;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}
~~~

- [[n < 10]]: رقم من خانة واحدة، مجموع أرقامه هو نفسه. ده الـ base case.
- [[n % 10]]: [[%]] باقي القسمة. باقي قسمة أي عدد على 10 هو آخر رقم فيه: [[372 % 10]] = 2.
- [[Math.floor(n / 10)]]: [[372 / 10]] = 37.2، و [[Math.floor]] بتقرّب لتحت فتبقى 37. يعني شلنا آخر رقم.
- فالقاعدة: مجموع أرقام 372 = آخر رقم (2) + مجموع أرقام الباقي (37).

### التتبع: [[sumDigits(372)]]

~~~text الناتج (Node 24 على ويندوز)
call sumDigits(372) n%10=2 floor(n/10)=37
  call sumDigits(37) n%10=7 floor(n/10)=3
    call sumDigits(3) n%10=3 floor(n/10)=0
    base -> 3
  sumDigits(37) = 10
sumDigits(372) = 12
~~~

| النداء | n % 10 | الباقي | بيرجّع |
|---|---|---|---|
| sumDigits(3) | | | 3 (base case) |
| sumDigits(37) | 7 | 3 | 7 + 3 = 10 |
| sumDigits(372) | 2 | 37 | 2 + 10 = 12 |

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
120
1
18
Infinity
~~~

- [[factorial(5)]] = 120، و [[factorial(0)]] = 1 لأن الـ base case [[<= 1]] غطّاه، و [[sumDigits(9045)]] = 9 + 0 + 4 + 5 = 18.
- [[factorial(171)]] = [[Infinity]]: أكبر رقم JS تقدر تخزّنه ([[Number.MAX_VALUE]]) حوالي 1.8 × 10^308. شغّلنا [[factorial(170)]] وطلعت حوالي 7.26 × 10^306، ولما تضرب في 171 بتعدّي الحد.
- وقبلها بكتير الدقة بتضيع: [[factorial(18)]] = 6402373705728000 لسه أقل من [[Number.MAX_SAFE_INTEGER]] (9007199254740991)، بس [[factorial(19)]] أكبر منه، فمفيش ضمان إن كل رقم فيه مضبوط. للأرقام الكبيرة استخدم [[BigInt]].

---

## ٥. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| وقت factorial | [[O(n)]] | n نداء، وكل نداء ضربة واحدة ومقارنة |
| ذاكرة factorial | [[O(n)]] | n نداء مفتوحين في نفس الوقت، كل واحد واخد مكان في الـ call stack (الدرس الجاي) |
| sumDigits | [[O(d)]] | d = عدد أرقام n، لأن كل نداء بيشيل رقم. يعني [[O(log n)]] بالنسبة لـ n نفسه |

---

## الخلاصة

~~~text
base case      أصغر مسألة، إجابتها من غير نداء (n <= 1)
الخطوة          نادي نفسك على مسألة أصغر، وابني الإجابة من نتيجتها
لازم            كل نداء يقرّب من الـ base case
التنفيذ         النداءات بتنزل، والنتايج بتطلع
الـ Big-O       factorial: O(n) وقت و O(n) stack
~~~

> قبل ما تكتب أي دالة recursive اسأل سؤالين: إيه أصغر مسألة؟ وإزاي أبني إجابة n من إجابة الأصغر؟`,
          lines: [
            "n! = n × (n-1) × ... × 1.",
            "الـ base case: 0! و 1! بـ 1. من غيره الدالة مش هتقف.",
            "المسألة الأكبر = n × نفس المسألة على n - 1.",
            "قفلة.",
            "مثال تاني: مجموع أرقام عدد.",
            "رقم واحد: مجموعه هو نفسه.",
            "آخر رقم ([[n % 10]]) + مجموع أرقام الباقي من غير آخر رقم.",
            "قفلة.",
            "5 × 4 × 3 × 2 × 1.",
            "0! = 1 بالتعريف، والـ base case غطّاه.",
            "9 + 0 + 4 + 5.",
            "171! أكبر من أكبر رقم JS تقدر تخزّنه، فبيطلع Infinity."
          ],
          sol: R`النسخة الأولى [[x * power(x, n - 1)]] بتعمل 1025 نداء لـ n = 1024 (من 1024 لحد 0)، فهي [[O(n)]] time و [[O(n)]] stack. النسخة التانية بتعمل 12 نداء بس: n بتتقسم نصين كل مرة (1024، 512، ... 1، 0)، فهي [[O(log n)]].

المهم في التانية إنك تحسب [[power(x, n / 2)]] مرة واحدة في متغير وتضربه في نفسه. ولو n فردي: [[x * power(x, n - 1)]] (وده يرجّعها زوجي في الخطوة الجاية).

الغلطة المشهورة: تكتب [[power(x, n / 2) * power(x, n / 2)]]. شكلها صح، بس كل نداء بيعمل اتنين، فعدد النداءات بيرجع قريب من n، والـ [[O(log n)]] تضيع.`,
          solCode: R`let calls = 0;
function powerSlow(x, n) {
  calls++;
  if (n === 0) return 1;
  return x * powerSlow(x, n - 1);
}
function powerFast(x, n) {
  calls++;
  if (n === 0) return 1;
  if (n % 2 === 1) return x * powerFast(x, n - 1);
  const half = powerFast(x, n / 2);
  return half * half;
}
console.log(powerSlow(2, 10), powerFast(2, 10)); // 1024 1024
calls = 0; powerSlow(2, 1024); console.log("slow calls:", calls); // slow calls: 1025
calls = 0; powerFast(2, 1024); console.log("fast calls:", calls); // fast calls: 12
// powerSlow: O(n) time and O(n) stack; powerFast: O(log n) time and O(log n) stack`,
          check: {
            lang: "js",
            starter: R`function powerFast(x, n) {
  // base case الأول: n === 0
  // لو n زوجي: احسب powerFast(x, n / 2) مرة واحدة في متغير وربّعه
}`,
            tests: R`test("powerFast(2, 10) ← 1024", () => expect(powerFast(2, 10)).toBe(1024));
test("powerFast(5, 0) ← 1 (الـ base case)", () => expect(powerFast(5, 0)).toBe(1));
test("n فردي: powerFast(3, 13) ← 1594323", () => expect(powerFast(3, 13)).toBe(1594323));
test("powerFast(2, 31) ← 2147483648", () => expect(powerFast(2, 31)).toBe(2147483648));
test("n = 100001: النسخة اللي بتنزّل n واحد هتعمل stack overflow، والنسخة O(log n) بتنزل حوالي ٣٤ مستوى", () => {
  expect(powerFast(1, 100000)).toBe(1);
  expect(powerFast(-1, 100001)).toBe(-1);
});`,
            solution: R`function powerFast(x, n) {
  if (n === 0) return 1;
  if (n % 2 === 1) return x * powerFast(x, n - 1);
  const half = powerFast(x, n / 2);
  return half * half;
}`
          }
        },
        {
          cmd: "call stack",
          title: "إيه اللي بيحصل في الذاكرة لما دالة تنادي نفسها مليون مرة؟",
          desc: R`كل نداء لدالة بيحجز frame في الـ call stack (المتغيرات المحلية ومكان الرجوع)، والـ frame مبيتشالش غير لما الدالة ترجع. recursion بعمق n يعني n frame في نفس الوقت، والـ stack ليه حد: في Node حوالي ١٠ آلاف لـ ١٢ ألف نداء لدالة بسيطة، وبعدها [[RangeError: Maximum call stack size exceeded]].

الحل لما العمق كبير: حوّلها loop. أي recursion ينفع تتكتب loop، أحيانًا بـ stack إنت اللي بتديره (array) بدل الـ call stack.

وخلي بالك: V8 (اللي في Chrome و Node) مبيعملش tail call optimization، فحتى لو النداء آخر حاجة في الدالة، برضه بياخد frame.`,
          example: R`function depth(n) {
  return n === 0 ? 0 : 1 + depth(n - 1);
}
console.log(depth(1000)); // 1000
try { depth(1e6); }
catch (e) { console.log(e instanceof RangeError, e.message); } // true Maximum call stack size exceeded
function depthLoop(n) {
  let d = 0;
  while (n > 0) { d++; n--; }
  return d;
}
console.log(depthLoop(1e6)); // 1000000
// recursion: O(n) stack space and it crashes past ~10k frames; the loop: O(1) space`,
          try: R`اعرف أقصى عمق على جهازك: [[let d = 0; const f = () => { d++; f(); }; try { f(); } catch { console.log(d); }]]. وبعدين ضيف متغيرات محلية كتير جوه f وشوف الرقم بيقل (الـ frame كبر).`,
          flag: "script",
          deep: {
            why: "bug حقيقي بيحصل في الإنتاج: دالة recursive بتمشي على شجرة كومنتات أو قايمة مترابطة أو فولدرات، بتشتغل تمام في التجربة، وبعدين بيانات عميقة جت فالسيرفر وقع بـ RangeError. ولازم تفهم ليه عشان تعرف امتى الـ recursion آمنة.",
            how: R`الـ call stack منطقة ذاكرة الـ runtime بيستخدمها عشان يفتكر «أنا فين». لما تنادي دالة، بيتحط فوقه frame فيه: الـ arguments، والمتغيرات المحلية، والمكان اللي هيرجع له بعد ما الدالة تخلص. لما الدالة ترجع، الـ frame بيتشال.

في [[depth(3)]]: frame لـ depth(3)، فوقه depth(2)، فوقه depth(1)، فوقه depth(0). depth(0) بترجع 0 وتتشال، depth(1) تكمّل وترجع 1 وتتشال، وهكذا. أقصى ارتفاع وصله الـ stack = n + 1.

حجم الـ stack محدود (في V8 حوالي 1MB افتراضيًا)، فعدد الـ frames بيعتمد على حجم كل frame. عشان كده الرقم مش ثابت بين الأجهزة والإصدارات. فيه flag اسمه [[--stack-size]] في Node، بس متعتمدش عليه: الحل الصح إنك تشيل العمق.

tail call: [[return f(n - 1)]] من غير أي حساب بعده. المواصفات (ES2015) بتقول المحرك المفروض يعيد استخدام نفس الـ frame، بس Safari بس اللي عامل كده. V8 مش عاملها، يعني في Node الـ tail recursion برضه بتعمل stack overflow.

التحويل لـ loop: لو الدالة بتنادي نفسها مرة واحدة، غالبًا loop عادي كفاية. لو بتنادي نفسها أكتر من مرة (شجرة)، استخدم array كـ stack: [[push]] بدل النداء، و [[pop]] بدل الرجوع.`,
            when: "أي recursion العمق فيها مرتبط بحجم البيانات: linked list، أو شجرة ممكن تبقى مايلة، أو grid كبيرة في flood fill. لو العمق log n (شجرة متوازنة، merge sort)، الـ recursion آمنة.",
            mistakes: R`إنك تفتكر إن try/catch حوالين الـ recursion حل: ده بيخبّي المشكلة بس. وإنك تفتكر إن tail recursion بتحل المشكلة في Node. وإنك تنسى إن [[JSON.stringify]] على object متداخل جدًا ممكن يرمي نفس الـ RangeError. وإنك تقول على الـ recursion «O(1) space».`
          },
          teach: R`## الفكرة في جملة

كل ما دالة تتنادى، الـ runtime بيحجز لها **frame** (إطار) في منطقة ذاكرة اسمها **call stack**: فيه الـ arguments والمتغيرات المحلية والمكان اللي هيرجع له لما تخلص. الـ frame مبيتشالش غير لما الدالة ترجع. فـ recursion بعمق مليون = مليون frame في نفس الوقت، والـ stack حجمه محدود، فبيتملي والبرنامج يرمي [[RangeError]].

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز.

---

## ١. [[depth]] سطر سطر

~~~js
function depth(n) {
  return n === 0 ? 0 : 1 + depth(n - 1);
}
~~~

[[condition ? a : b]] اسمه **ternary operator**: لو الشرط صح خد a، غير كده خد b. يعني: لو n = 0 رجّع 0، غير كده رجّع 1 + [[depth(n - 1)]]. الدالة بتعدّ هي نزلت كام مستوى، فـ [[depth(n)]] = n.

المهم إن الجمع [[1 + ...]] مش هيحصل غير لما [[depth(n - 1)]] ترجع. فكل نداء **مستني** اللي جواه، والـ frame بتاعه لسه محجوز.

### التتبع: [[depth(3)]] وحجم الـ stack

ضفنا عدّاد بيزيد أول النداء (push) ويقل قبل الرجوع (pop):

~~~text الناتج (Node 24 على ويندوز)
push depth(3) stack size=1
push depth(2) stack size=2
push depth(1) stack size=3
push depth(0) stack size=4
pop depth(0) returns 0
pop depth(1) returns 1
pop depth(2) returns 2
pop depth(3) returns 3
~~~

| اللحظة | الـ frames اللي في الـ stack (تحت ← فوق) | الحجم |
|---|---|---|
| بعد نداء depth(3) | depth(3) | 1 |
| بعد نداء depth(2) | depth(3)، depth(2) | 2 |
| بعد نداء depth(1) | depth(3)، depth(2)، depth(1) | 3 |
| بعد نداء depth(0) | depth(3)، depth(2)، depth(1)، depth(0) | **4** |
| depth(0) رجعت 0 | depth(3)، depth(2)، depth(1) | 3 |
| depth(1) رجعت 1 | depth(3)، depth(2) | 2 |
| ... | | |

أقصى حجم = n + 1. ولو n مليون، يبقى مليون frame وواحد.

---

## ٢. [[try]] و [[catch]] والـ RangeError

~~~js
try { depth(1e6); }
catch (e) { console.log(e instanceof RangeError, e.message); }
~~~

- [[1e6]]: كتابة علمية، يعني 1 × 10^6 = مليون.
- [[try { ... }]]: جرّب الكود ده، ولو رمى error متوقّعش البرنامج.
- [[catch (e) { ... }]]: لو حصل error، امسكه في متغير [[e]] ونفّذ ده.
- [[e instanceof RangeError]]: هل الـ error ده من نوع RangeError؟ ([[instanceof]] بتسأل «الـ object ده اتعمل من الـ class دي؟»).
- [[e.message]]: نص الرسالة.

~~~text الناتج
true Maximum call stack size exceeded
~~~

بحثنا بـ binary search على أقصى n تعدّي من غير error لـ [[depth]] على نفس الجهاز، وطلع 9765. الرقم ده بيتغير من جهاز لجهاز ومن إصدار لإصدار، ومش حاجة تبني عليها.

---

## ٣. [[depthLoop]]: نفس الحساب من غير frames

~~~js
function depthLoop(n) {
  let d = 0;
  while (n > 0) { d++; n--; }
  return d;
}
~~~

بدل ما ننادي الدالة على n - 1، بنلف: كل لفة نزوّد [[d]] وننقّص [[n]]. الدالة اتنادت **مرة واحدة**، فـ frame واحد بس طول الوقت.

| بعد اللفة | n | d |
|---|---|---|
| البداية | 3 | 0 |
| 1 | 2 | 1 |
| 2 | 1 | 2 |
| 3 | 0 | 3 |

الناتج 3، وده من تتبّع حقيقي لـ [[depthLoop(3)]]. ومع مليون: مليون لفة، ونفس الـ frame.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
1000
true Maximum call stack size exceeded
1000000
~~~

---

## ٥. الـ solCode: حجم الـ frame بيأثر

~~~js
let d = 0;
const f = () => { d++; f(); };
try { f(); } catch { console.log("small frame:", d); }
~~~

- [[f]] بتزوّد العدّاد وتنادي نفسها من غير base case خالص، فأكيد هتقع. [[d]] في الآخر = عدد النداءات اللي دخلت قبل ما الـ stack يتملي.
- [[catch { ... }]] من غير [[(e)]]: مسموح لما مش محتاج الـ error نفسه.
- الدالة التانية [[g]] نفس الفكرة بس فيها ٨ متغيرات محلية ([[let a = d2, b = a + 1, ...]])، والـ [[return a + b + ...]] بعد النداء بيجبر المحرك يحتفظ بيهم في الـ frame.

~~~text الناتج (Node 24 على ويندوز)
small frame: 12504
big frame: 6946
~~~

الـ stack حجمه ثابت (في V8، المحرك اللي في Node و Chrome، حوالي 1MB افتراضيًا). frame أكبر = عدد أقل يدخل. عشان كده مفيش «رقم سحري» للعمق.

---

## ٦. الـ Big-O وليه

| | الذاكرة | السبب |
|---|---|---|
| [[depth(n)]] recursion | [[O(n)]] | n + 1 frame مفتوحين في نفس اللحظة |
| [[depthLoop(n)]] | [[O(1)]] | frame واحد ومتغيرين، مهما n كبرت |
| الوقت للاتنين | [[O(n)]] | n خطوة في الحالتين |

---

## الخلاصة

~~~text
frame          الـ arguments والمتغيرات المحلية ومكان الرجوع، لكل نداء
بيتشال امتى     لما الدالة ترجع بس
العمق d        d frame في نفس الوقت = O(d) ذاكرة
الحد           حوالي 10 آلاف لـ 12 ألف لدالة بسيطة في Node، وبيقل لو الـ frame كبير
الحل           حوّلها loop (أو stack إنت اللي بتديره في array)
~~~

> الـ recursion آمنة لما العمق صغير (زي log n في شجرة متوازنة). لو العمق ممكن يوصل لحجم البيانات نفسه، استخدم loop.`,
          lines: [
            "دالة بتنزل n مستوى.",
            "لو 0 خلاص، غير كده 1 + نفسها على n - 1. كل نداء مستني اللي بعده.",
            "قفلة.",
            "ألف مستوى: مفيش مشكلة.",
            "مليون مستوى...",
            "...الـ stack اتملى قبل ما نوصل للـ base case: RangeError.",
            "نفس الحساب بـ loop.",
            "عدّاد.",
            "لفة بدل نداء: مفيش frames جديدة.",
            "رجّع.",
            "قفلة.",
            "مليون عادي، لأن الذاكرة O(1)."
          ],
          sol: R`على جهازي بـ Node 22 الرقم طلع حوالي 12500، ومع 8 متغيرات محلية جوه الدالة نزل لحوالي 7000. رقمك هيبقى مختلف (الجهاز والإصدار بيفرقوا)، بس لازم يقل لما تضيف متغيرات.

السبب: الـ stack حجمه ثابت (حوالي 1MB افتراضيًا)، وكل نداء بيحجز frame فيه متغيراته. frame أكبر يبقى عدد أقل يدخل. كل نداء [[O(1)]] space، فعمق d بيكلّف [[O(d)]].

الغلطة المشهورة: تفتكر إن الرقم ده ثابت وتبني عليه كود. الحل مش إنك تكبّر الـ stack بـ [[--stack-size]]، الحل إنك تحوّل الـ recursion العميقة لـ loop أو stack صريح.`,
          solCode: R`let d = 0;
const f = () => { d++; f(); };
try { f(); } catch { console.log("small frame:", d); } // about 12500 on node 22 (varies by machine and version)
let d2 = 0;
const g = () => {
  d2++;
  let a = d2, b = a + 1, c = b + 1, e = c + 1, h = e + 1, i = h + 1, j = i + 1, k = j + 1;
  g();
  return a + b + c + e + h + i + j + k;
};
try { g(); } catch { console.log("big frame:", d2); } // about 7000: each frame holds more locals, so fewer fit
// each call is O(1) stack space, so depth d costs O(d); the total stack size is fixed (~1 MB by default)`
        },
        {
          cmd: "memoization",
          title: "fib(50) بالطريقة العادية بتاخد وقت طويل جدًا، خليها تطلع في لحظة",
          desc: R`memoization: خزّن نتيجة كل نداء في Map، ولو نفس المدخل اتطلب تاني رجّع المخزّن بدل ما تحسب. [[fib]] بتتحول من [[O(2^n)]] لـ [[O(n)]].

المشكلة في [[fibSlow]]: [[fib(50)]] بتنادي [[fib(49)]] و [[fib(48)]]، و [[fib(49)]] بتنادي [[fib(48)]] تاني، وهكذا. نفس القيم بتتحسب ملايين المرات. بالـ memo كل قيمة من 0 لـ n بتتحسب مرة واحدة بس.

ده أول خطوة في dynamic programming: recursion + cache = top-down DP.`,
          example: R`function fibSlow(n) {
  if (n < 2) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}
function fib(n, memo = new Map()) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const val = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, val);
  return val;
}
console.log(fibSlow(20)); // 6765
console.log(fib(50));     // 12586269025
// fibSlow: O(2^n) time; fib with memo: O(n) time, O(n) space (map + call stack)`,
          try: R`حط عدّاد نداءات في النسختين وقارن لـ n = 25 (حوالي ربع مليون نداء مقابل ٤٩). وبعدين اكتب [[memoize(fn)]] عامة: تاخد أي دالة ليها argument واحد وترجّع نسخة بـ cache. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[memoize]] وبتعدّ كام مرة الدالة الأصلية اتنادت.`,
          flag: "script",
          deep: {
            why: "فيه مسائل كتير الحل البديهي فيها recursion بتحسب نفس الحاجة مرات كتير: عدد الطرق، أقل تكلفة، هل ممكن. الـ memoization بتحوّلها من «مستحيل» لـ «فوري» بسطرين زيادة. وفي الشغل نفس الفكرة اسمها caching: [[useMemo]] في React، و cache لنتايج API.",
            how: R`ارسم شجرة النداءات لـ [[fibSlow(5)]]: fib(5) بتنادي fib(4) و fib(3). و fib(4) بتنادي fib(3) و fib(2). يعني fib(3) اتحسبت مرتين، و fib(2) تلات مرات. كل ما n تكبر، التكرار بيتضاعف: عدد النداءات حوالي 1.6^n.

مع الـ memo: أول مرة fib(3) تتحسب بتتخزّن. المرة التانية، [[memo.has(3)]] بترجّعها في [[O(1)]]. النتيجة إن كل رقم من 0 لـ 50 بيتحسب مرة واحدة، وكل واحد بيعمل نداءين، يعني حوالي 2n نداء: [[O(n)]].

ليه الـ memo بتتبعت كـ argument؟ عشان كل النداءات تشارك نفس الـ Map. لو عملت [[new Map()]] جوه جسم الدالة، كل نداء هيبدأ بـ cache فاضي.

الـ memo مش مجاني: [[O(n)]] ذاكرة للـ Map، و [[O(n)]] للـ call stack. والنسخة الـ bottom-up (loop من تحت لفوق) بتشيل الاتنين، ودي في درس «bottom-up DP (table)» في المستوى التالت.

ومش أي دالة ينفع يتعملها memo: لازم تكون pure، نفس المدخل يدّي نفس المخرج دايمًا، ومن غير side effects.`,
            when: "لما الـ recursion فيها نداءات متكررة لنفس المدخلات (overlapping subproblems). ارسم شجرة النداءات لـ n صغير: لو شفت نفس النداء مرتين، يبقى memo.",
            mistakes: R`إنك تحط [[new Map()]] جوه جسم الدالة فكل نداء يبدأ فاضي. وإنك تستخدم [[if (memo[n])]] مع object: لو القيمة المخزّنة 0 هتعتبرها مش موجودة وتحسب تاني، استخدم [[has]] أو [[in]]. وإنك تنسى إن الأرقام الكبيرة بتفقد دقة: بعد fib(78) الناتج بيعدّي [[Number.MAX_SAFE_INTEGER]]، ولو المطلوب رقم مضبوط استخدم BigInt.`
          },
          teach: R`## الفكرة في جملة

**memoization**: أول مرة تحسب نتيجة لمدخل معين، خزّنها في Map. لو نفس المدخل اتطلب تاني، رجّع المخزّن بدل ما تحسب من الأول. مع [[fib]] ده بيحوّل ملايين النداءات لـ 99 نداء بس.

**Fibonacci** (فيبوناتشي): كل رقم = مجموع الرقمين اللي قبله. 0، 1، 1، 2، 3، 5، 8، 13... يعني fib(0) = 0 و fib(1) = 1 و fib(n) = fib(n - 1) + fib(n - 2).

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا عدّادات و [[console.log]] جوه الدوال.

---

## ١. [[fibSlow]]: ليه بطيئة؟

~~~js
function fibSlow(n) {
  if (n < 2) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}
~~~

- [[if (n < 2) return n;]]: الـ base case. fib(0) = 0 و fib(1) = 1، يعني الإجابة هي n نفسها.
- [[fibSlow(n - 1) + fibSlow(n - 2)]]: كل نداء بيعمل **نداءين**. ودي المشكلة.

### عدّينا النداءات لـ [[fibSlow(5)]]

حطينا عدّاد لكل n:

| n | اتحسبت كام مرة |
|---|---|
| 5 | 1 |
| 4 | 1 |
| 3 | 2 |
| 2 | 3 |
| 1 | 5 |
| 0 | 3 |
| **المجموع** | **15 نداء** |

fib(3) اتحسبت مرتين، و fib(2) تلات مرات، بنفس النتيجة كل مرة. وكل ما n تكبر التكرار بيتضاعف تقريبًا: [[fibSlow(20)]] عملت 21891 نداء، و [[fibSlow(30)]] عملت 2692537 نداء (حوالي ٢.٧ مليون). عشان كده [[fibSlow(50)]] عمليًا مش هتخلص.

---

## ٢. [[fib]] مع الـ memo سطر سطر

~~~js
function fib(n, memo = new Map()) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const val = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, val);
  return val;
}
~~~

### [[memo = new Map()]] في الـ parameters

ده **default parameter**: لو اللي نادى الدالة مبعتش [[memo]]، اعمل Map جديدة. فـ [[fib(50)]] من برّا بتبدأ بـ Map فاضية، وكل النداءات اللي جوه بتبعت **نفس** الـ Map: [[fib(n - 1, memo)]]. كده الكل بيشارك نفس الـ cache.

### [[if (memo.has(n)) return memo.get(n);]]

اتحسبت قبل كده؟ رجّعها على طول، من غير أي نداء جديد. ولاحظ إننا بنسأل بـ [[has]] مش [[if (memo.get(n))]]: لو القيمة المخزّنة 0، [[get]] هترجع 0 والـ if هيعتبرها مش موجودة.

### [[const val = fib(n - 1, memo) + fib(n - 2, memo);]]

نفس معادلة فيبوناتشي، بس مع تمرير الـ memo.

### [[memo.set(n, val); return val;]]

خزّن النتيجة **قبل** ما ترجع، عشان أي نداء بعد كده يلاقيها.

---

## ٣. التتبع: [[fib(5)]]

~~~text الناتج (Node 24 على ويندوز)
fib(5)
  fib(4)
    fib(3)
      fib(2)
        fib(1) base -> 1
        fib(0) base -> 0
      set memo 2 = 1  memo=[[2,1]]
      fib(1) base -> 1
    set memo 3 = 2  memo=[[2,1],[3,2]]
    fib(2) memo hit -> 1
  set memo 4 = 3  memo=[[2,1],[3,2],[4,3]]
  fib(3) memo hit -> 2
set memo 5 = 5  memo=[[2,1],[3,2],[4,3],[5,5]]
5
~~~

| الخطوة | اللي حصل | الـ memo بعدها |
|---|---|---|
| 1 | النزول على الشمال لحد fib(1) و fib(0) | {} |
| 2 | fib(2) = 1 + 0 = 1 | {2: 1} |
| 3 | fib(3) = fib(2) + fib(1) = 1 + 1 = 2 | {2: 1, 3: 2} |
| 4 | fib(4) محتاجة fib(2): **موجودة**، مفيش نزول | |
| 5 | fib(4) = 2 + 1 = 3 | {2: 1, 3: 2, 4: 3} |
| 6 | fib(5) محتاجة fib(3): **موجودة** | |
| 7 | fib(5) = 3 + 2 = 5 | {2: 1, 3: 2, 4: 3, 5: 5} |

9 نداءات بدل 15. والفرق بيكبر جامد: كل رقم من 2 لـ n بيتحسب مرة واحدة وبيعمل نداءين، فالمجموع 2n - 1. عدّيناهم لـ [[fib(50)]] وطلعوا 99 نداء، وخلصت في 0.021ms.

---

## ٤. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
6765
12586269025
~~~

[[fibSlow(20)]] = 6765 لسه سريعة (21891 نداء)، و [[fib(50)]] = 12586269025 في لحظة.

---

## ٥. الـ Big-O وليه

| | الوقت | الذاكرة | السبب |
|---|---|---|---|
| fibSlow | [[O(2^n)]] | [[O(n)]] stack | كل نداء بيعمل اتنين، والشجرة بتتضاعف كل مستوى (بالظبط حوالي 1.6^n) |
| fib بالـ memo | [[O(n)]] | [[O(n)]] | كل n بتتحسب مرة، والـ Map فيها n قيمة، والـ stack بينزل n مستوى |

---

## الخلاصة

~~~text
المشكلة         نفس المدخل بيتحسب مرات كتير (overlapping subproblems)
الحل            Map: لو has(n) رجّع get(n)، غير كده احسب و set قبل الرجوع
الـ memo          بيتبعت مع كل نداء عشان الكل يشارك نفس الـ cache
has مش get      عشان القيم زي 0 متتحسبش تاني
النتيجة          O(2^n) بقت O(n): fib(50) بـ 99 نداء
~~~

> recursion + cache = **top-down dynamic programming**. هتشوفها تاني في مسائل «عدد الطرق» و «أقل تكلفة».`,
          lines: [
            "النسخة العادية.",
            "fib(0) = 0 و fib(1) = 1.",
            "كل نداء بيعمل نداءين، والشجرة بتتضاعف كل مستوى: O(2^n).",
            "قفلة.",
            "نفس الدالة ومعاها Map بتتبعت مع كل نداء.",
            "نفس الـ base case.",
            "اتحسبت قبل كده؟ رجّعها على طول.",
            "احسبها مرة واحدة.",
            "خزّنها قبل ما ترجع.",
            "رجّعها.",
            "قفلة.",
            "20 لسه سريعة حتى من غير memo (حوالي ٢٢ ألف نداء).",
            "50 في أقل من ملّي ثانية. من غير memo كانت هتاخد عشرات المليارات من النداءات."
          ],
          sol: R`لـ n = 25: النسخة البطيئة بتعمل 242785 نداء، ونسخة الـ memo بتعمل 49 بس، والاتنين بيرجّعوا 75025. الـ 49 جاية من إن كل n من 2 لـ 25 بتتحسب مرة، وكل واحدة بتنادي اتنين.

[[memoize(fn)]]: بترجّع دالة جديدة معاها Map، لو الـ argument موجود ترجّع القيمة المتخزنة، ولو لأ تنادي [[fn]] وتخزّن النتيجة. تتأكد إنها شغالة لو دالة زي [[square]] اتنادت مرتين بـ 9 واتنفذت مرة واحدة بس. ولـ fib، الدالة لازم تنادي النسخة الـ memoized نفسها ([[fibM(n - 1)]])، فـ [[fibM(50)]] بتطلع 12586269025 على طول.

الغلطة المشهورة: [[const fast = memoize(fibSlow)]]. النداء الأول بيتخزن، بس [[fibSlow]] جواها بتنادي نفسها مش النسخة الـ memoized، فبتفضل بطيئة. وغلطة تانية: [[if (cache.get(x))]] بدل [[has]]، فالقيم زي 0 مش هتتخزن أبدًا.`,
          solCode: R`let slowCalls = 0, memoCalls = 0;
function fibSlow(n) {
  slowCalls++;
  if (n < 2) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}
function fib(n, memo = new Map()) {
  memoCalls++;
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const val = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, val);
  return val;
}
console.log(fibSlow(25), slowCalls); // 75025 242785
console.log(fib(25), memoCalls);     // 75025 49
function memoize(fn) {
  const cache = new Map();
  return x => {
    if (cache.has(x)) return cache.get(x);
    const val = fn(x);
    cache.set(x, val);
    return val;
  };
}
const fibM = memoize(n => (n < 2 ? n : fibM(n - 1) + fibM(n - 2)));
console.log(fibM(50)); // 12586269025
let squareRuns = 0;
const square = memoize(x => { squareRuns++; return x * x; });
console.log(square(9), square(9), squareRuns); // 81 81 1
// fibSlow: O(2^n) time; memo: O(n) time, O(n) space`,
          check: {
            lang: "js",
            starter: R`function memoize(fn) {
  const cache = new Map();
  // رجّع دالة جديدة: لو الـ argument في الـ cache رجّع قيمته، وإلا نادي fn وخزّن
}`,
            tests: R`test("بترجّع نفس نتايج الدالة الأصلية", () => {
  const sq = memoize(x => x * x);
  expect([sq(9), sq(3), sq(9)]).toEqual([81, 9, 81]);
});
test("الدالة الأصلية بتتنادي مرة واحدة لنفس الـ argument", () => {
  let calls = 0;
  const f = memoize(x => { calls++; return x * 2; });
  f(9); f(9); f(9);
  expect(calls).toBe(1);
});
test("بتخزّن النتايج falsy زي 0 و undefined (افحص بـ has مش get)", () => {
  let calls = 0;
  const f = memoize(x => { calls++; return x === 1 ? 0 : undefined; });
  f(1); f(1); f(2); f(2);
  expect(calls).toBe(2);
});
test("كل دالة memoized ليها cache لوحدها", () => {
  const a = memoize(x => x + 1), b = memoize(x => x + 100);
  expect([a(1), b(1)]).toEqual([2, 101]);
});
test("fibM(78) بتنادي النسخة الـ memoized نفسها فبتخلص في لحظة (O(n) بدل O(2^n))", () => {
  const fibM = memoize(n => (n < 2 ? n : fibM(n - 1) + fibM(n - 2)));
  expect(fibM(78)).toBe(8944394323791464);
});`,
            solution: R`function memoize(fn) {
  const cache = new Map();
  return x => {
    if (cache.has(x)) return cache.get(x);
    const value = fn(x);
    cache.set(x, value);
    return value;
  };
}`
          }
        },
        {
          cmd: "prefix sum",
          title: "مجموع أي جزء من array بين l و r في O(1)، بعد تجهيز مرة واحدة",
          desc: R`اعمل array تانية [[pre]] كل خانة فيها مجموع أول i عناصر. بعدها مجموع أي جزء من l لـ r = [[pre[r + 1] - pre[l]]]. التجهيز [[O(n)]] مرة واحدة، وكل سؤال بعد كده [[O(1)]].

من غيرها، كل سؤال بيعمل loop على الجزء: q سؤال × n = [[O(q × n)]]. بالـ prefix sum بقت [[O(n + q)]].

الـ [[pre]] أطول من الـ array بواحد وبتبدأ بـ 0، عشان الجزء اللي بيبدأ من أول الـ array ميحتاجش if.`,
          example: R`function buildPrefix(a) {
  const pre = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) pre[i + 1] = pre[i] + a[i];
  return pre;
}
const rangeSum = (pre, l, r) => pre[r + 1] - pre[l];
const a = [3, -1, 4, 1, 5, 9];
const pre = buildPrefix(a);
console.log(pre);                 // [0, 3, 2, 6, 7, 12, 21]
console.log(rangeSum(pre, 1, 3)); // 4
console.log(rangeSum(pre, 0, 5)); // 21
console.log(rangeSum(pre, 4, 4)); // 5
// build: O(n) time and O(n) space, then every query is O(1)`,
          try: R`حل «عدد الأجزاء المتصلة اللي مجموعها k» ([1, 2, 3] و k = 3 الإجابة 2): وانت بتجمّع، خزّن في Map كل مجموع شفته كام مرة، واسأل «[[sum - k]] ظهر كام مرة قبل كده؟». ده prefix sum مع hash map، وبيشتغل مع الأرقام السالبة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[subarraySum(nums, k)]] بترجّع عدد الأجزاء المتصلة اللي مجموعها k.`,
          flag: "script",
          deep: {
            why: "لما عندك أسئلة كتير على نفس البيانات (مجموع المبيعات من يوم لـ يوم، عدد الزيارات في فترة)، الحساب من الأول كل مرة بيضيّع وقت. التجهيز مرة واحدة ودفع شوية ذاكرة بيخلّي كل سؤال فوري. وهو أساس مسائل «subarray sum» كلها.",
            how: R`dry run على [3, -1, 4, 1, 5, 9]:

pre = [0, 3, 2, 6, 7, 12, 21]. يعني pre عند 4 = 7 = 3 + (-1) + 4 + 1.

مجموع من 1 لـ 3 = pre عند 4 ناقص pre عند 1 = 7 - 3 = 4. ليه؟ pre عند 4 فيه أول ٤ عناصر، و pre عند 1 فيه أول عنصر بس، والفرق هو العناصر من 1 لـ 3.

الـ off-by-one أكتر حاجة بتبوّظ هنا، لأن [[pre]] متأخرة خانة عن الـ array. خلي في دماغك قاعدة واحدة ثابتة: «[[pre[i]]] = مجموع أول i عنصر»، والباقي بيطلع منها.

نفس الفكرة في 2D: كل خانة فيها مجموع المستطيل من الركن لحد عندها، وأي مستطيل مجموعه بيطلع من ٤ خانات. وفيه أخ ليها اسمه difference array، لو عايز تزوّد قيمة على range كامل مرات كتير.

والـ try (subarray sum equals k): لو المجموع لحد دلوقتي sum، وفيه جزء متصل بيخلص هنا مجموعه k، يبقى فيه prefix قبل كده مجموعه [[sum - k]]. فالـ Map بتعدّ الـ prefixes. ده [[O(n)]] وبيشتغل مع السالب، عكس الـ sliding window اللي محتاج أرقام موجبة.`,
            when: "أسئلة كتير على مجموع ranges في بيانات مش بتتغير. لو البيانات بتتغير كتير، الـ prefix لازم يتبني من جديد مع كل تعديل، ووقتها فيه هياكل تانية (Fenwick tree أو segment tree).",
            mistakes: R`off-by-one: [[pre[r] - pre[l]]] بدل [[pre[r + 1] - pre[l]]] (بيشيل آخر عنصر). وإنك تبني الـ prefix جوه كل سؤال فترجع [[O(n)]] لكل سؤال. وإنك تنسى إن مجموع أرقام كبيرة ممكن يعدّي [[Number.MAX_SAFE_INTEGER]]. والـ edge cases: array فاضية (pre = [0])، و l = r، و l = 0.`
          },
          teach: R`## الفكرة في جملة

جهّز مرة واحدة array اسمها [[pre]] (اختصار prefix، يعني «البادئة»)، كل خانة [[pre[i]]] فيها **مجموع أول i عنصر**. بعدها مجموع أي جزء من l لـ r = [[pre[r + 1] - pre[l]]]: عملية طرح واحدة، مهما الجزء طويل.

كل الأرقام اللي تحت من تشغيل حقيقي على Node 24.19.0 على ويندوز، بعد ما ضفنا [[console.log]] جوه الـ loop يطبع الحالة.

---

## ١. [[buildPrefix]] سطر سطر

~~~js
function buildPrefix(a) {
  const pre = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) pre[i + 1] = pre[i] + a[i];
  return pre;
}
~~~

### [[new Array(a.length + 1).fill(0)]]

- [[new Array(5)]]: array طولها 5 بس خاناتها فاضية. جرّبنا [[new Array(3)]] وطلعت [[[ <3 empty items> ]]].
- [[.fill(0)]]: املا كل الخانات بـ 0، فبقت [[[ 0, 0, 0 ]]].
- ليه الطول [[a.length + 1]]؟ لأن [[pre[0]]] معناها «مجموع أول 0 عنصر» = 0. الخانة الزيادة دي هي اللي بتخلّي الجزء اللي بيبدأ من أول الـ array ميحتاجش [[if]].

### [[pre[i + 1] = pre[i] + a[i];]]

مجموع أول i + 1 عنصر = مجموع أول i عنصر + العنصر رقم i. يعني كل خانة = اللي قبلها + عنصر جديد. ولاحظ إن [[pre]] متأخرة خانة عن [[a]]: العنصر [[a[i]]] بيدخل في [[pre[i + 1]]].

### التتبع على [[[2, 7, -3, 5]]]

| i | a[i] | الحساب | pre بعد اللفة |
|---|---|---|---|
| البداية | | | [0, 0, 0, 0, 0] |
| 0 | 2 | pre[1] = 0 + 2 = 2 | [0, 2, 0, 0, 0] |
| 1 | 7 | pre[2] = 2 + 7 = 9 | [0, 2, 9, 0, 0] |
| 2 | -3 | pre[3] = 9 + (-3) = 6 | [0, 2, 9, 6, 0] |
| 3 | 5 | pre[4] = 6 + 5 = 11 | [0, 2, 9, 6, 11] |

آخر خانة (11) = مجموع الـ array كلها. والرقم السالب عادي: المجموع نزل من 9 لـ 6.

---

## ٢. [[rangeSum]]: ليه الطرح بيشتغل؟

~~~js
const rangeSum = (pre, l, r) => pre[r + 1] - pre[l];
~~~

arrow function بتاخد الـ [[pre]] وحدود الجزء l و r (الاتنين داخلين). على [[pre = [0, 2, 9, 6, 11]]]:

| السؤال | الحساب | الناتج | تأكيد يدوي |
|---|---|---|---|
| rangeSum(pre, 1, 2) | pre[3] - pre[1] = 6 - 2 | 4 | 7 + (-3) = 4 |
| rangeSum(pre, 0, 3) | pre[4] - pre[0] = 11 - 0 | 11 | الكل |
| rangeSum(pre, 2, 2) | pre[3] - pre[2] = 6 - 9 | -3 | عنصر واحد |
| rangeSum(pre, 0, 0) | pre[1] - pre[0] = 2 - 0 | 2 | أول عنصر |

~~~text الناتج (Node 24 على ويندوز)
4 11 -3 2
~~~

الفكرة: [[pre[r + 1]]] فيها العناصر من 0 لـ r. و [[pre[l]]] فيها العناصر من 0 لـ l - 1. لما تطرح، اللي من 0 لـ l - 1 بيروح، ويفضل من l لـ r بالظبط.

ولو كتبت [[pre[r] - pre[l]]] (من غير + 1) هتشيل آخر عنصر من الجزء. دي أشهر غلطة هنا. احفظ قاعدة واحدة بس: «[[pre[i]]] = مجموع أول i عنصر»، والباقي بيطلع منها.

---

## ٣. الناتج الكامل للمثال

~~~text الناتج (Node 24 على ويندوز)
[
  0,  3,  2, 6,
  7, 12, 21
]
4
21
5
~~~

Node بيطبع الـ array الطويلة على كذا سطر، بس هي [[[0, 3, 2, 6, 7, 12, 21]]]. و [[rangeSum(pre, 1, 3)]] = 7 - 3 = 4، و [[(pre, 0, 5)]] = 21 - 0، و [[(pre, 4, 4)]] = 12 - 7 = 5.

وجرّبنا [[buildPrefix([])]]: الـ loop مبيلفّش، والناتج [[[ 0 ]]].

---

## ٤. الـ Big-O وليه

| | القيمة | السبب |
|---|---|---|
| التجهيز | [[O(n)]] وقت، [[O(n)]] ذاكرة | لفة واحدة، و array طولها n + 1 |
| كل سؤال | [[O(1)]] | قراية خانتين وطرح |
| q سؤال من غير prefix | [[O(q × n)]] | كل سؤال بيلف على الجزء |
| q سؤال بالـ prefix | [[O(n + q)]] | تجهيز مرة + q × O(1) |

---

## الخلاصة

~~~text
pre[i]          مجموع أول i عنصر، و pre[0] = 0
الطول           a.length + 1
البناء          pre[i + 1] = pre[i] + a[i]
مجموع l..r       pre[r + 1] - pre[l]
الـ Big-O       O(n) مرة واحدة، وبعدها O(1) لكل سؤال
~~~

> الـ prefix sum بيشتغل مع الأرقام السالبة عادي، ودي ميزته الكبيرة على الـ sliding window اللي هتشوفه بعدين.`,
          lines: [
            "تجهيز: مرة واحدة.",
            "array أطول بواحد، كلها أصفار. الخانة i = مجموع أول i عناصر.",
            "كل خانة = اللي قبلها + العنصر الجديد.",
            "رجّعها.",
            "قفلة.",
            "مجموع من l لـ r (شاملين الاتنين): أول r+1 عنصر ناقص أول l عنصر.",
            "array فيها رقم سالب عادي.",
            "جهّز مرة.",
            "أول خانة 0، وآخر خانة مجموع الكل.",
            "من index 1 لـ 3: -1 + 4 + 1.",
            "الـ array كلها.",
            "جزء فيه عنصر واحد."
          ],
          sol: R`ابدأ الـ Map بـ [[[[0, 1]]]] (مجموع 0 ظهر مرة قبل ما تبدأ)، وكل عنصر: زوّد [[sum]]، وضيف للعدّاد [[seen.get(sum - k) || 0]]، وبعدين سجّل [[sum]]. النتايج: [1, 2, 3] مع 3 تطلع 2، و [1, 1, 1] مع 2 تطلع 2، و [1, -1, 0] مع 0 تطلع 3. الحل [[O(n)]] time و [[O(n)]] space.

ليه [[sum - k]]؟ لو المجموع لحد هنا [[sum]]، وفيه مكان قبل كده المجموع كان [[sum - k]]، يبقى اللي بينهم مجموعه k بالظبط.

الغلطة المشهورة: تنسى [[[0, 1]]] فتضيع كل جزء بيبدأ من أول الـ array (الإجابة تطلع 1 بدل 2 في أول مثال). وغلطة تانية: تحاول sliding window، ودي بتبوظ مع الأرقام السالبة.`,
          solCode: R`function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}
console.log(subarraySum([1, 2, 3], 3));    // 2  ([1, 2] and [3])
console.log(subarraySum([1, 1, 1], 2));    // 2
console.log(subarraySum([1, -1, 0], 0));   // 3  ([1, -1], [0], [1, -1, 0])
console.log(subarraySum([3, 4, -7], 0));   // 1
// O(n) time, O(n) space`,
          check: {
            lang: "js",
            starter: R`function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  // لكل عنصر: زوّد sum، وضيف seen.get(sum - k)، وبعدين سجّل sum
  return count;
}`,
            tests: R`test("([1, 2, 3], 3) ← 2", () => expect(subarraySum([1, 2, 3], 3)).toBe(2));
test("([1, 1, 1], 2) ← 2", () => expect(subarraySum([1, 1, 1], 2)).toBe(2));
test("أصفار وسالب: ([1, -1, 0], 0) ← 3", () => expect(subarraySum([1, -1, 0], 0)).toBe(3));
test("سالب في النص: ([2, -1, 1, 2], 2) ← 4 (sliding window كانت هتغلط)", () => expect(subarraySum([2, -1, 1, 2], 2)).toBe(4));
test("([], 0) ← 0", () => expect(subarraySum([], 0)).toBe(0));
test("3000 رقم عشوائي من -5 لـ 5، مقارنة بالـ brute force O(n^2)", () => {
  let seed = 7;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) % 11 - 5;
  const a = Array.from({ length: 3000 }, rnd);
  let want = 0;
  for (let i = 0; i < a.length; i++) { let s = 0; for (let j = i; j < a.length; j++) { s += a[j]; if (s === 3) want++; } }
  expect(subarraySum(a, 3)).toBe(want);
});`,
            solution: R`function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}`
          }
        }
      ]
    }
]);
