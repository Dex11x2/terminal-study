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
    }
]);
