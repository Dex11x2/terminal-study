// تكملة تاب dsa: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/dsa/01.js (شرح حقول الدرس في أوله)
MORE("dsa", [
    {
      t: "two pointers",
      l: 2,
      n: "مؤشرين بيمشوا على الـ array بدل loop جوه loop، فالـ O(n^2) بيبقى O(n)",
      items: [
        {
          cmd: "two pointers (sorted)",
          title: "رقمين مجموعهم target في array مترتبة، من غير ذاكرة زيادة",
          desc: R`مؤشر على الأصغر (أول الـ array) ومؤشر على الأكبر (آخرها). لو المجموع أصغر من المطلوب زوّد الصغير، لو أكبر قلّل الكبير. [[O(n)]] وقت و [[O(1)]] ذاكرة.

ليه ده صح؟ لو المجموع أصغر من target، يبقى العنصر عند [[lo]] مع أكبر رقم متاح لسه صغير، فمع أي رقم تاني هيبقى أصغر. يعني [[lo]] ملوش أي زوج، ونقدر نشيله بأمان. ونفس المنطق لـ [[hi]] لو المجموع أكبر.

ده الفرق عن Two Sum العادية: الترتيب هو اللي خلانا نستغنى عن الـ Map.`,
          example: R`function twoSumSorted(a, target) {
  let lo = 0, hi = a.length - 1;
  while (lo < hi) {
    const sum = a[lo] + a[hi];
    if (sum === target) return [lo, hi];
    if (sum < target) lo++;
    else hi--;
  }
  return [];
}
console.log(twoSumSorted([1, 3, 4, 6, 9], 10)); // [0, 4]
console.log(twoSumSorted([-3, -1, 0, 2], -4));  // [0, 1]
console.log(twoSumSorted([1, 2, 3], 100));      // []
// O(n) time, O(1) space`,
          try: R`حل three sum: كل التلاتيات اللي مجموعها 0 من غير تكرار. رتّب الأول، وثبّت عنصر، وشغّل المؤشرين على اللي بعده. [-1, 0, 1, 2, -1, -4] ترجع [-1, -1, 2] و [-1, 0, 1]. الـ Big-O المتوقع [[O(n^2)]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[threeSum]] بترجّع التلاتيات من غير تكرار، وترتيبهم مش مهم.`,
          flag: "script",
          deep: {
            why: "المؤشرين من الطرفين بيستغلوا إن الـ array مترتبة عشان يشيلوا عنصر كامل من الحساب مع كل خطوة. ده بيحوّل مسائل «كل زوج» من O(n^2) لـ O(n) من غير ذاكرة، وهو أساس three sum، و container with most water، و «أقرب مجموع لـ target».",
            how: R`dry run على [1, 3, 4, 6, 9] و target = 8:

lo = 0 و hi = 4: 1 + 9 = 10، أكبر. قلّل hi. ليه 9 ملهاش زوج؟ لأن أصغر رقم متاح (1) معاها بيدّي 10، يعني أي رقم تاني معاها أكبر.

lo = 0 و hi = 3: 1 + 6 = 7، أصغر. زوّد lo. ليه 1 ملهاش زوج؟ لأن أكبر رقم متاح (6) معاها بيدّي 7، يعني أي رقم تاني أصغر.

lo = 1 و hi = 3: 3 + 6 = 9، أكبر. قلّل hi.

lo = 1 و hi = 2: 3 + 4 = 7، أصغر. زوّد lo. دلوقتي lo = hi، وقفنا: مفيش زوج.

كل خطوة بتشيل عنصر واحد من الحساب نهائيًا، فأقصى عدد خطوات n - 1: [[O(n)]].

والشرط [[lo < hi]] مش [[lo <= hi]]: عشان منجمعش العنصر مع نفسه.`,
            when: "لما الـ array مترتبة (أو ينفع ترتّبها من غير ما الـ indexes الأصلية تفرق) والمطلوب زوج بيحقق شرط على المجموع أو الفرق. ولو مش مترتبة والمطلوب الـ indexes، ارجع لـ Two Sum بالـ Map.",
            mistakes: R`إنك تستخدمها على array مش مترتبة: هتفوّت إجابات من غير أي error. وإنك ترتّب array مش مترتبة وترجّع الـ indexes الجديدة والمطلوب الأصلية. وإنك تكتب [[lo <= hi]] فتجمع عنصر مع نفسه (لما target = ضعف عنصر). والـ edge cases: array فاضية أو فيها عنصر واحد (الـ while مبتلفّش)، وأرقام مكررة.`
          },
          lines: [
            "ترجّع index الرقمين (الـ array مترتبة من الصغير للكبير).",
            "مؤشر على الأول (أصغر رقم) ومؤشر على الآخر (أكبر رقم).",
            "لحد ما يتقابلوا.",
            "مجموع الاتنين دلوقتي.",
            "لقيناه.",
            "أصغر من المطلوب: الصغير ده ملوش زوج، زوّده.",
            "أكبر: الكبير ده ملوش زوج، قلّله.",
            "قفلة.",
            "مفيش زوج.",
            "قفلة.",
            "1 + 9 = 10 من أول خطوة.",
            "أرقام سالبة: الكبير بيتقلّل مرتين لحد ما نوصل -3 + -1.",
            "مفيش زوج."
          ],
          sol: R`الناتج [[[[-1, -1, 2], [-1, 0, 1]]]]. رتّب الأول ([-4, -1, -1, 0, 1, 2])، وبعدين لكل i شغّل [[lo = i + 1]] و [[hi]] من الآخر زي درس Two Sum. الـ Big-O [[O(n^2)]]: n عنصر، ولكل واحد مرور بالمؤشرين [[O(n)]]، والـ sort [[O(n log n)]] مش بيأثر.

منع التكرار في مكانين: تخطّى i لو [[a[i] === a[i - 1]]]، وبعد ما تلاقي تلاتية، حرّك [[lo]] لحد ما القيمة تتغير. تأكد إن [0, 0, 0, 0] ترجع [[[[0, 0, 0]]]] مرة واحدة بس.

الغلطة المشهورة: تشيل التكرار في الآخر بـ Set من الـ arrays. ده مش هينفع لأن كل array reference مختلف، ولو حوّلتهم strings هتشتغل بس الكود هيبقى أبطأ وأصعب يتشرح في الانترفيو.`,
          solCode: R`function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y), out = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (a[i] > 0) break;
    if (i > 0 && a[i] === a[i - 1]) continue;
    let lo = i + 1, hi = a.length - 1;
    while (lo < hi) {
      const sum = a[i] + a[lo] + a[hi];
      if (sum < 0) lo++;
      else if (sum > 0) hi--;
      else {
        out.push([a[i], a[lo], a[hi]]);
        lo++; hi--;
        while (lo < hi && a[lo] === a[lo - 1]) lo++;
      }
    }
  }
  return out;
}
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]
console.log(threeSum([0, 0, 0, 0]));          // [[0, 0, 0]]
console.log(threeSum([1, 2]));                // []
// O(n^2) time (n fixed items x an O(n) two-pointer pass; the sort is only O(n log n)), O(1) extra space besides the output and the sorted copy`,
          check: {
            lang: "js",
            starter: R`function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y);
  const out = [];
  // ثبّت i، وشغّل lo و hi على اللي بعده، وفوّت التكرار في المكانين
  return out;
}`,
            tests: R`const norm = ts => ts.map(t => [...t].sort((a, b) => a - b).join(",")).sort();
test("[-1, 0, 1, 2, -1, -4] ← [-1, -1, 2] و [-1, 0, 1]", () => expect(norm(threeSum([-1, 0, 1, 2, -1, -4]))).toEqual(["-1,-1,2", "-1,0,1"]));
test("[0, 0, 0, 0] ← [0, 0, 0] مرة واحدة", () => expect(norm(threeSum([0, 0, 0, 0]))).toEqual(["0,0,0"]));
test("[1, 2, -2, -1] ← [] (مفيش)", () => expect(threeSum([1, 2, -2, -1])).toEqual([]));
test("[] و [0, 0] ← []", () => expect([threeSum([]), threeSum([0, 0])]).toEqual([[], []]));
test("متغيّرش الـ input", () => { const a = [3, -3, 0]; threeSum(a); expect(a).toEqual([3, -3, 0]); });
test("150 رقم عشوائي، مقارنة بـ brute force O(n^3)؛ الحل المطلوب O(n^2)", () => {
  let seed = 11;
  const a = Array.from({ length: 150 }, () => (seed = (seed * 1103515245 + 12345) % 2147483648) % 21 - 10);
  const want = new Set();
  for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) for (let k = j + 1; k < a.length; k++)
    if (a[i] + a[j] + a[k] === 0) want.add([a[i], a[j], a[k]].sort((x, y) => x - y).join(","));
  expect(norm(threeSum(a))).toEqual([...want].sort());
});`,
            solution: R`function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (i > 0 && a[i] === a[i - 1]) continue;
    let lo = i + 1, hi = a.length - 1;
    while (lo < hi) {
      const sum = a[i] + a[lo] + a[hi];
      if (sum === 0) {
        out.push([a[i], a[lo], a[hi]]);
        lo++; hi--;
        while (lo < hi && a[lo] === a[lo - 1]) lo++;
      } else if (sum < 0) lo++;
      else hi--;
    }
  }
  return out;
}`
          }
        },
        {
          cmd: "read/write pointers",
          title: "شيل التكرار من array مترتبة in-place، ورجّع الطول الجديد",
          desc: R`مؤشر [[read]] بيمشي على كل عنصر، ومؤشر [[write]] بيقول «هحط الجديد فين». لو العنصر مختلف عن آخر حاجة اتكتبت، اكتبه وقدّم [[write]]. في الآخر أول [[write]] عنصر هم الـ array من غير تكرار. [[O(n)]] وقت و [[O(1)]] ذاكرة.

الـ array مترتبة، فالمكرر دايمًا جنب بعض. عشان كده كفاية نقارن بآخر حاجة اتكتبت، من غير Set.

النمط ده (مؤشر بيقرا ومؤشر بيكتب، الاتنين من الأول) بيحل أي «شيل عناصر in-place»: شيل كل الأصفار، أو شيل قيمة معينة، أو حرّك الأصفار للآخر.`,
          example: R`function removeDuplicates(a) {
  if (a.length === 0) return 0;
  let write = 1;
  for (let read = 1; read < a.length; read++) {
    if (a[read] !== a[write - 1]) {
      a[write] = a[read];
      write++;
    }
  }
  return write;
}
const nums = [0, 0, 1, 1, 1, 2, 2, 3];
const k = removeDuplicates(nums);
console.log(k, nums.slice(0, k));  // 4 [0, 1, 2, 3]
console.log(removeDuplicates([])); // 0
// O(n) time, O(1) extra space`,
          try: R`حرّك كل الأصفار لآخر الـ array مع الحفاظ على ترتيب الباقي، in-place: [0, 1, 0, 3, 12] تبقى [1, 3, 12, 0, 0]. وبعدين: شيل التكرار بس اسمح لكل رقم يظهر مرتين بالكتير (قارن بالعنصر عند [[write - 2]]). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[moveZeroes]] بتعدّل الـ array نفسها، و [[removeDuplicatesTwice]] بترجّع الطول الجديد.`,
          flag: "script",
          deep: {
            why: "in-place يعني من غير array جديدة، ودي بتتطلب لما البيانات كبيرة أو في انترفيو بيقولك «O(1) extra space». ومعظم المسائل دي بتتحل بنفس الفكرة: مؤشر بيقرا كل حاجة، ومؤشر بيكتب اللي عايزه بس.",
            how: R`dry run على [0, 0, 1, 1, 2]:

write = 1. read = 1: القيمة 0، وآخر مكتوب (عند write - 1) 0. نفس الحاجة، سيبها.

read = 2: 1 مختلفة عن 0. اكتبها عند 1، و write = 2. الـ array بقت [0, 1, 1, 1, 2].

read = 3: 1 زي آخر مكتوب. سيبها.

read = 4: 2 مختلفة. اكتبها عند 2، و write = 3. الـ array بقت [0, 1, 2, 1, 2].

رجّعنا 3، وأول ٣ عناصر [0, 1, 2]. اللي بعدهم محدش هيبصله، والمسألة (زي LeetCode 26) بتقول كده صراحة.

[[write]] عمره ما بيسبق [[read]]، فمفيش خطر إننا نكتب فوق عنصر لسه مقريناهوش.

ليه منقارنش بالعنصر اللي قبل [[read]] على طول؟ هنا هيطلع نفس الإجابة لأن الـ array مترتبة. بس المقارنة بآخر مكتوب هي اللي بتتعمم على نسخة «اسمح بمرتين».`,
            when: "أي «شيل» أو «رشّح» in-place. وفي الشغل [[filter]] أوضح وأأمن، بس الفكرة دي بتلزم لما تتعامل مع buffer كبير أو typed array مينفعش تعمل منه نسخ.",
            mistakes: R`إنك تستخدم [[splice]] جوه loop تشيل المكرر: كل [[splice]] بتحرّك الباقي، فالحل [[O(n^2)]]، وكمان الـ indexes بتتلخبط وانت ماشي. وإنك تبدأ [[write]] من 0 و [[read]] من 1: أول مقارنة هتبقى مع [[a[-1]]] (undefined)، فالعنصر التاني هيتكتب فوق الأول، ولو كانوا مختلفين القيمة الأولى هتضيع والعدد يطلع ناقص واحد ([1, 2, 3] ترجع 2 و [2, 3]). وإنك تنسى الـ array الفاضية: من غير أول سطر، الدالة هترجّع 1 لـ array فاضية.`
          },
          lines: [
            "بتعدّل الـ array نفسها وترجّع عدد العناصر المختلفة.",
            "array فاضية: مفيش حاجة.",
            "أول عنصر دايمًا بيفضل، فالكتابة تبدأ من 1.",
            "[[read]] بيعدّي على الباقي.",
            "مختلف عن آخر عنصر اتكتب؟ يبقى قيمة جديدة.",
            "اكتبه في مكان [[write]].",
            "قدّم مكان الكتابة.",
            "قفلة الـ if.",
            "قفلة الـ for.",
            "[[write]] = عدد العناصر المختلفة.",
            "قفلة.",
            "array مترتبة فيها تكرار.",
            "شغّل الدالة.",
            "أول 4 عناصر هم الإجابة. الباقي بعدهم ملوش لازمة.",
            "array فاضية: 0."
          ],
          sol: R`الأصفار: [[write]] يبدأ من 0، وكل رقم مش صفر اكتبه عند [[write]] وزوّده، وبعدين املا الباقي أصفار. [0, 1, 0, 3, 12] تبقى [[[1, 3, 12, 0, 0]]] وترتيب الأرقام محفوظ.

مرتين بالكتير: اكتب العنصر لو [[write < 2]] أو لو مختلف عن [[a[write - 2]]]. [1, 1, 1, 2, 2, 3] ترجع 5 و [[[1, 1, 2, 2, 3]]]. الاتنين [[O(n)]] time و [[O(1)]] space.

الغلطة المشهورة: تقارن بـ [[a[read - 2]]] بدل [[a[write - 2]]]. الـ read بيبص على الـ array القديمة، فلو 1 اتكرر 3 مرات هيتكتب التالت برضه.`,
          solCode: R`function moveZeroes(a) {
  let write = 0;
  for (let read = 0; read < a.length; read++) {
    if (a[read] !== 0) a[write++] = a[read];
  }
  while (write < a.length) a[write++] = 0;
  return a;
}
console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0]));              // [0]
function removeDuplicatesTwice(a) {
  let write = 0;
  for (const x of a) {
    if (write < 2 || x !== a[write - 2]) a[write++] = x;
  }
  return write;
}
const nums = [1, 1, 1, 2, 2, 3];
const k = removeDuplicatesTwice(nums);
console.log(k, nums.slice(0, k)); // 5 [1, 1, 2, 2, 3]
// both: O(n) time, O(1) extra space`,
          check: {
            lang: "js",
            starter: R`function moveZeroes(a) {
  let write = 0;
  // كل رقم مش صفر اكتبه عند write، وبعدين املا الباقي أصفار
}
function removeDuplicatesTwice(a) {
  // اكتب العنصر لو write < 2 أو لو مختلف عن a[write - 2]
  return a.length;
}`,
            tests: R`test("moveZeroes([0, 1, 0, 3, 12]) ← [1, 3, 12, 0, 0] في نفس الـ array", () => {
  const a = [0, 1, 0, 3, 12];
  moveZeroes(a);
  expect(a).toEqual([1, 3, 12, 0, 0]);
});
test("moveZeroes([0]) و [1, 2] زي ما هم", () => {
  const a = [0], b = [1, 2];
  moveZeroes(a); moveZeroes(b);
  expect([a, b]).toEqual([[0], [1, 2]]);
});
test("removeDuplicatesTwice([1, 1, 1, 2, 2, 3]) ← 5 و [1, 1, 2, 2, 3]", () => {
  const a = [1, 1, 1, 2, 2, 3];
  const k = removeDuplicatesTwice(a);
  expect([k, a.slice(0, k)]).toEqual([5, [1, 1, 2, 2, 3]]);
});
test("قارن بـ a[write - 2] مش a[read - 2]: [0, 0, 1, 1, 1, 1, 2, 3, 3] ← 7", () => {
  const a = [0, 0, 1, 1, 1, 1, 2, 3, 3];
  const k = removeDuplicatesTwice(a);
  expect([k, a.slice(0, k)]).toEqual([7, [0, 0, 1, 1, 2, 3, 3]]);
});
test("[] ← 0 و [1] ← 1", () => expect([removeDuplicatesTwice([]), removeDuplicatesTwice([1])]).toEqual([0, 1]));
test("١٠٠ ألف عنصر (O(n) و O(1) ذاكرة)", () => {
  const a = Array.from({ length: 99999 }, (_, i) => Math.floor(i / 3));
  expect(removeDuplicatesTwice(a)).toBe(66666);
  const z = Array.from({ length: 100000 }, (_, i) => (i % 2 ? i : 0));
  moveZeroes(z);
  expect([z[0], z[49999], z[50000]]).toEqual([1, 99999, 0]);
});`,
            solution: R`function moveZeroes(a) {
  let write = 0;
  for (const x of a) if (x !== 0) a[write++] = x;
  while (write < a.length) a[write++] = 0;
}
function removeDuplicatesTwice(a) {
  let write = 0;
  for (const x of a) {
    if (write < 2 || x !== a[write - 2]) a[write++] = x;
  }
  return write;
}`
          }
        },
        {
          cmd: "two pointers (move the shorter)",
          title: "أكبر كمية مية تتحبس بين خطين، من خطوط ليها أطوال مختلفة",
          desc: R`مؤشر في الأول ومؤشر في الآخر. المساحة = الأقصر فيهم × المسافة بينهم. سجّل الأكبر، وبعدين حرّك المؤشر اللي عند الخط الأقصر. [[O(n)]] بدل [[O(n^2)]].

ليه الأقصر؟ المساحة محكومة بالخط الأقصر. لو حرّكت الأطول، المسافة هتقل والأقصر لسه هو الحد، فالمساحة عمرها ما هتزيد. تحريك الأقصر هو الأمل الوحيد في خط أطول.

دي بتوريك إن two pointers مش لازم يكون على array مترتبة: المهم إن كل خطوة تقدر تثبت إنها بتشيل احتمالات مش هتكسب.`,
          example: R`function maxArea(h) {
  let lo = 0, hi = h.length - 1, best = 0;
  while (lo < hi) {
    const area = Math.min(h[lo], h[hi]) * (hi - lo);
    best = Math.max(best, area);
    if (h[lo] < h[hi]) lo++;
    else hi--;
  }
  return best;
}
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1]));                      // 1
console.log(maxArea([5]));                         // 0
// O(n) time, O(1) space (brute force over all pairs = O(n^2))`,
          try: R`حل trapping rain water: كام وحدة مية تتحبس فوق كل الأعمدة؟ [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] الإجابة 6. نفس الفكرة: مؤشرين، وأعلى عمود شفته من كل ناحية لحد دلوقتي. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[trap(heights)]].`,
          flag: "script",
          deep: {
            why: "مسألة بتختبر إنك تقدر تثبت إن تحريك المؤشرين مش بيفوّت الإجابة. الانترفيوير هيسألك «ليه تحرّك الأقصر؟» وده أهم من الكود نفسه.",
            how: R`dry run على [1, 8, 6, 2, 5, 4, 8, 3, 7]:

lo = 0 (1) و hi = 8 (7): المساحة 1 × 8 = 8. الشمال أقصر، lo = 1.

lo = 1 (8) و hi = 8 (7): المساحة 7 × 7 = 49. اليمين أقصر، hi = 7.

lo = 1 (8) و hi = 7 (3): 3 × 6 = 18. hi = 6.

lo = 1 (8) و hi = 6 (8): 8 × 5 = 40. متساويين، الـ else بتحرّك hi. والباقي كله أقل من 49.

الإثبات بالكلام: لما تحرّك الأقصر (خليه عند lo)، إنت بتستبعد كل الأزواج اللي فيها lo مع أي خط بين lo و hi. أي زوج منهم عرضه أقل من العرض الحالي، وارتفاعه ≤ طول lo (لأن lo هو الحد). يعني مساحته ≤ المساحة اللي سجّلناها. فمفيش حاجة ضاعت.

ولما الاتنين متساويين، تحريك أي واحد صح: أي زوج فيه واحد منهم مع خط في النص هيبقى عرضه أقل وارتفاعه مش أكبر.`,
            when: "لما المسألة بتقارن «طرفين» والقيمة محكومة بالأصغر والمسافة. وأي مسألة زوج تقدر فيها تثبت إن طرف معين خلاص مش هيكسب.",
            mistakes: R`إنك تحرّك الأطول (بتضيّع الإجابة الصح). وإنك تحسب المساحة بالأطول بدل الأقصر. وإنك تحسب العرض [[hi - lo + 1]]: العرض هو المسافة بين الخطين [[hi - lo]]. وإنك تخلطها بـ trapping rain water: دي خطين بس، والتانية المية فوق كل الأعمدة.`
          },
          lines: [
            "h فيها أطوال الخطوط، والمسافة بين كل خطين جنب بعض 1.",
            "مؤشر في كل طرف، وأكبر مساحة لحد دلوقتي.",
            "لحد ما يتقابلوا.",
            "المية بتوصل لحد الخط الأقصر بس، والعرض هو المسافة.",
            "سجّل لو أحسن.",
            "الشمال أقصر: هو اللي حاكم، حرّكه.",
            "غير كده حرّك اليمين.",
            "قفلة.",
            "أكبر مساحة.",
            "قفلة.",
            "الخطين 8 (index 1) و 7 (index 8): 7 × 7 = 49.",
            "خطين طولهم 1 والمسافة 1.",
            "خط واحد: مفيش وعاء."
          ],
          sol: R`الإجابة 6. مؤشرين من الطرفين، و [[leftMax]] و [[rightMax]]. حرّك الناحية اللي عمودها أقصر: لو [[h[lo] < h[hi]]]، المية فوق [[lo]] بتتحدد بـ [[leftMax]] بس (لأن فيه عمود أعلى على اليمين أكيد)، فضيف [[leftMax - h[lo]]]. وجرّب كمان [4, 2, 0, 3, 2, 5] الإجابة 9.

الحل [[O(n)]] time و [[O(1)]] space. النسخة الأسهل تحسب array لأعلى عمود على الشمال وarray لليمين، والمية عند كل عمود [[min(left, right) - h[i]]]، وده [[O(n)]] space.

الغلطة المشهورة: تحدّث [[leftMax]] بعد ما تضيف المية بدل قبلها، فتطلع قيمة سالبة عند عمود أعلى من اللي قبله.`,
          solCode: R`function trap(h) {
  let lo = 0, hi = h.length - 1, leftMax = 0, rightMax = 0, water = 0;
  while (lo < hi) {
    if (h[lo] < h[hi]) {
      leftMax = Math.max(leftMax, h[lo]);
      water += leftMax - h[lo];
      lo++;
    } else {
      rightMax = Math.max(rightMax, h[hi]);
      water += rightMax - h[hi];
      hi--;
    }
  }
  return water;
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5]));                   // 9
console.log(trap([1, 2, 3]));                            // 0
// O(n) time, O(1) space (the leftMax/rightMax arrays version is O(n) space)`,
          check: {
            lang: "js",
            starter: R`function trap(h) {
  let lo = 0, hi = h.length - 1, leftMax = 0, rightMax = 0, water = 0;
  // حرّك الناحية اللي عمودها أقصر، وحدّث الـ max بتاعها قبل ما تضيف المية
  return water;
}`,
            tests: R`test("[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] ← 6", () => expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6));
test("[4, 2, 0, 3, 2, 5] ← 9", () => expect(trap([4, 2, 0, 3, 2, 5])).toBe(9));
test("[3, 0, 3] ← 3", () => expect(trap([3, 0, 3])).toBe(3));
test("سلم طالع [1, 2, 3] مبيحبسش حاجة ← 0", () => expect(trap([1, 2, 3])).toBe(0));
test("[] و [5] ← 0", () => expect([trap([]), trap([5])]).toEqual([0, 0]));
test("5000 عمود (O(n) بمؤشرين، و O(n^2) لو لكل عمود دوّرت على الأعلى يمين وشمال)", () => {
  const h = [5, ...new Array(4998).fill(0), 5];
  expect(trap(h)).toBe(5 * 4998);
});`,
            solution: R`function trap(h) {
  let lo = 0, hi = h.length - 1, leftMax = 0, rightMax = 0, water = 0;
  while (lo < hi) {
    if (h[lo] < h[hi]) {
      leftMax = Math.max(leftMax, h[lo]);
      water += leftMax - h[lo];
      lo++;
    } else {
      rightMax = Math.max(rightMax, h[hi]);
      water += rightMax - h[hi];
      hi--;
    }
  }
  return water;
}`
          }
        }
      ]
    },
    {
      t: "sliding window",
      l: 2,
      n: "شباك بيتحرك على الـ array: تضيف اللي داخل وتشيل اللي خارج بدل ما تعيد الحساب",
      items: [
        {
          cmd: "fixed sliding window",
          title: "أكبر مجموع لـ k عناصر ورا بعض في array",
          desc: R`احسب مجموع أول k عناصر، وبعدين حرّك «الشباك» خطوة خطوة: ضيف العنصر اللي دخل واطرح اللي خرج. كل خطوة [[O(1)]]، فالحل [[O(n)]] بدل [[O(n × k)]].

الشباكين اللي جنب بعض مشتركين في k - 1 عنصر. مفيش داعي تجمعهم من الأول، الفرق عنصر داخل وعنصر خارج.

وخلي بالك من أول قيمة لـ [[best]]: لازم تبقى مجموع أول شباك، مش 0، عشان الأرقام ممكن تكون كلها سالبة.`,
          example: R`function maxSumK(a, k) {
  if (k <= 0 || k > a.length) return null;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i];
  let best = sum;
  for (let i = k; i < a.length; i++) {
    sum += a[i] - a[i - k];
    best = Math.max(best, sum);
  }
  return best;
}
console.log(maxSumK([2, 1, 5, 1, 3, 2], 3)); // 9
console.log(maxSumK([-4, -2, -7], 2));       // -6
console.log(maxSumK([1, 2], 5));             // null
// O(n) time, O(1) space (summing every window again = O(n * k))`,
          try: R`عدّلها ترجّع index بداية أحسن شباك بدل المجموع. وبعدين حل: كام شباك طوله k متوسطه ≥ threshold؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[bestWindowStart(a, k)]] بترجّع index بداية أحسن شباك (أو -1 لو k مش مناسب)، و [[countAvgAtLeast(a, k, threshold)]].`,
          flag: "script",
          deep: {
            why: "أي سؤال عن «k عناصر ورا بعض» (أعلى مبيعات في ٧ أيام متتالية، متوسط آخر ٥ قراءات) الحل البديهي بيعيد الجمع لكل شباك. الشباك المتحرك بيخلي كل خطوة O(1)، وده نفس المنطق اللي ورا moving average في الرسوم البيانية.",
            how: R`dry run على [2, 1, 5, 1, 3, 2] و k = 3:

أول شباك [2, 1, 5] مجموعه 8، و best = 8.

i = 3: دخل 1 وخرج 2 (عند i - k = 0): 8 + 1 - 2 = 7. الشباك [1, 5, 1].

i = 4: دخل 3 وخرج 1: 7 + 3 - 1 = 9. best = 9. الشباك [5, 1, 3].

i = 5: دخل 2 وخرج 5: 9 + 2 - 5 = 6.

النتيجة 9.

الـ Big-O: أول loop k خطوة، والتاني n - k خطوة، والمجموع n: [[O(n)]]. والذاكرة متغيرين: [[O(1)]].

الـ index اللي بيخرج هو [[i - k]] بالظبط: الشباك اللي بيخلص عند i بيبدأ عند i - k + 1، فاللي قبل بدايته على طول (i - k) هو اللي لسه خارج.`,
            when: "شباك طوله ثابت ومعروف: «k عناصر متتالية»، «كل فترة ٧ أيام». لو الطول مش ثابت وبيتحدد بشرط، ده النوع التاني (الدرس الجاي).",
            mistakes: R`[[best = 0]] في الأول (بيبوظ مع الأرقام السالبة). و off-by-one في العنصر الخارج ([[i - k + 1]] بدل [[i - k]]). وإنك تنسى الحالة اللي k فيها أكبر من طول الـ array أو 0. وإنك تعيد حساب مجموع الشباك بـ [[slice]] و [[reduce]] كل خطوة: كده رجعت [[O(n × k)]].`
          },
          lines: [
            "أكبر مجموع لأي k عناصر متتالية.",
            "k مش منطقي: مفيش شباك.",
            "مجموع الشباك الحالي.",
            "أول شباك: أول k عناصر.",
            "أحسن مجموع يبدأ بأول شباك، مش 0.",
            "كل خطوة الشباك بيتحرك واحد لليمين.",
            "العنصر i دخل، والعنصر i - k خرج.",
            "سجّل لو أحسن.",
            "قفلة.",
            "رجّع الأحسن.",
            "قفلة.",
            "5 + 1 + 3 = 9.",
            "كله سالب: -4 + -2 = -6. لو best بدأ بـ 0 كان هيرجّع 0 غلط.",
            "k أكبر من الـ array: null."
          ],
          sol: R`index البداية لـ [2, 1, 5, 1, 3, 2] مع k = 3 هو 2 (الشباك [5, 1, 3] مجموعه 9). لما تلاقي مجموع أكبر، سجّل [[bestStart = i - k + 1]]: [[i]] آخر عنصر في الشباك، والبداية قبله بـ k - 1.

عدد الشبابيك: بدل ما تقسم على k كل مرة، قارن المجموع بـ [[k * threshold]]. [2, 2, 2, 2, 5, 5, 5, 8] مع k = 3 و threshold = 4 الإجابة 3. الاتنين [[O(n)]] time و [[O(1)]] space.

الغلطة المشهورة: تكتب [[bestStart = i - k]]، فالإجابة تطلع 1. وغلطة تانية: تعدّ الشبابيك قبل ما يكمل أول شباك ([[i < k - 1]]).`,
          solCode: R`function bestWindowStart(a, k) {
  if (k <= 0 || k > a.length) return -1;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i];
  let best = sum, bestStart = 0;
  for (let i = k; i < a.length; i++) {
    sum += a[i] - a[i - k];
    if (sum > best) { best = sum; bestStart = i - k + 1; }
  }
  return bestStart;
}
console.log(bestWindowStart([2, 1, 5, 1, 3, 2], 3)); // 2  (5 + 1 + 3 = 9)
function countAvgAtLeast(a, k, threshold) {
  const need = k * threshold;
  let sum = 0, count = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i];
    if (i >= k) sum -= a[i - k];
    if (i >= k - 1 && sum >= need) count++;
  }
  return count;
}
console.log(countAvgAtLeast([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)); // 3
console.log(countAvgAtLeast([1, 1, 1], 2, 5));               // 0
// both: O(n) time, O(1) space`,
          check: {
            lang: "js",
            starter: R`function bestWindowStart(a, k) {
  if (k <= 0 || k > a.length) return -1;
  // نفس maxSumK، وسجّل bestWindowStart = i - k + 1 لما تلاقي مجموع أكبر
}
function countAvgAtLeast(a, k, threshold) {
  // قارن المجموع بـ k * threshold بدل ما تقسم
  return 0;
}`,
            tests: R`test("bestWindowStart([2, 1, 5, 1, 3, 2], 3) ← 2", () => expect(bestWindowStart([2, 1, 5, 1, 3, 2], 3)).toBe(2));
test("التعادل: أول شباك ← bestWindowStart([1, 1, 1], 2) = 0", () => expect(bestWindowStart([1, 1, 1], 2)).toBe(0));
test("أرقام سالبة: bestWindowStart([-4, -2, -7], 2) ← 0", () => expect(bestWindowStart([-4, -2, -7], 2)).toBe(0));
test("k أكبر من الطول ← -1", () => expect(bestWindowStart([1, 2], 5)).toBe(-1));
test("countAvgAtLeast([2, 2, 2, 2, 5, 5, 5, 8], 3, 4) ← 3", () => expect(countAvgAtLeast([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)).toBe(3));
test("countAvgAtLeast([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5) ← 6", () => expect(countAvgAtLeast([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5)).toBe(6));
test("١٠٠ ألف عنصر و k = 1000 (O(n)، مش O(n × k))", () => {
  const a = Array.from({ length: 100000 }, (_, i) => (i >= 50000 && i < 51000 ? 2 : 1));
  expect(bestWindowStart(a, 1000)).toBe(50000);
  expect(countAvgAtLeast(a, 1000, 1)).toBe(99001);
});`,
            solution: R`function bestWindowStart(a, k) {
  if (k <= 0 || k > a.length) return -1;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i];
  let best = sum, start = 0;
  for (let i = k; i < a.length; i++) {
    sum += a[i] - a[i - k];
    if (sum > best) { best = sum; start = i - k + 1; }
  }
  return start;
}
function countAvgAtLeast(a, k, threshold) {
  if (k <= 0 || k > a.length) return 0;
  let sum = 0, count = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i];
    if (i >= k) sum -= a[i - k];
    if (i >= k - 1 && sum >= k * threshold) count++;
  }
  return count;
}`
          }
        },
        {
          cmd: "variable sliding window",
          title: "أطول جزء متصل من string من غير ولا حرف متكرر",
          desc: R`شباك من [[start]] لـ [[i]]: وسّعه من اليمين حرف حرف، ولو الحرف الجديد متكرر جوه الشباك، حرّك [[start]] لبعد آخر مكان شفناه فيه. خزّن آخر index لكل حرف في Map. [[O(n)]].

كل حرف بيدخل الشباك مرة، و [[start]] عمره ما بيرجع لورا، فالمؤشرين الاتنين بيمشوا n خطوة بالكتير.

والشرط [[last.get(ch) >= start]] مهم: الحرف ممكن يكون ظهر قبل كده بس برّا الشباك الحالي، ووقتها مش تكرار.`,
          example: R`function longestUnique(s) {
  const last = new Map();
  let start = 0, best = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (last.has(ch) && last.get(ch) >= start) start = last.get(ch) + 1;
    last.set(ch, i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}
console.log(longestUnique("abcabcbb")); // 3
console.log(longestUnique("pwwkew"));   // 3
console.log(longestUnique("abba"));     // 2
console.log(longestUnique(""));         // 0
// O(n) time, O(k) space (k = distinct chars)`,
          try: R`حل: أطول جزء متصل فيه k حروف مختلفة بالكتير ([[eceba]] مع k = 2 الإجابة 3: ece). المرة دي ضيّق الشباك بـ while من الشمال، وشيل من عدّاد الحروف، لحد ما عدد الحروف المختلفة يرجع ≤ k. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[longestKDistinct(s, k)]].`,
          flag: "script",
          deep: {
            why: "أي «أطول» أو «أقصر» جزء متصل بيحقق شرط، الحل البديهي بيجرّب كل بداية وكل نهاية: O(n^2) أو أكتر. الشباك المتغير بيحلها في O(n)، لأنه بيستغل إن الشرط لو اتكسر، تكبير الشباك مش هيصلّحه، لازم تضيّقه.",
            how: R`dry run على abcabcbb:

i = 0 (a): الطول 1. i = 1 (b): 2. i = 2 (c): 3، و best = 3.

i = 3 (a): a آخر مرة عند 0، و 0 ≥ start (0)، فـ start = 1. الشباك bca، الطول 3.

i = 4 (b): آخر مرة عند 1 ≥ 1، فـ start = 2. الشباك cab.

i = 5 (c): عند 2 ≥ 2، فـ start = 3. الشباك abc.

i = 6 (b): عند 4 ≥ 3، فـ start = 5. الشباك cb، الطول 2.

i = 7 (b): عند 6 ≥ 5، فـ start = 7. الطول 1. النتيجة 3.

القالب العام للشباك المتغير: loop على right يضيف العنصر؛ وجواه while «الشرط مكسور» يشيل من الشمال ويقدّم left؛ وبعدين سجّل الإجابة. هنا استخدمنا Map بآخر index عشان نقفز بـ start مرة واحدة بدل while، بس الفكرة واحدة.

ليه الشباك بيشتغل؟ لو الجزء من start لـ i فيه تكرار، أي جزء أكبر بيحتويه فيه نفس التكرار. فمفيش فايدة من إنك تكبّر من غير ما تضيّق.`,
            when: "«أطول/أقصر جزء متصل (substring أو subarray) بشرط»: من غير تكرار، أو مجموعه ≥ target، أو فيه كل حروف كلمة تانية. بشرط إن الشرط «يتصلّح لما تضيّق» (زي المجموع مع أرقام موجبة). مع أرقام سالبة الشباك مبيشتغلش، ارجع لـ prefix sum.",
            mistakes: R`إنك تنسى [[>= start]] فـ start يرجع لورا (abba بترجع 3 بدل 2). وإنك تحسب الطول [[i - start]] وتنسى الـ + 1. وإنك تستخدم sliding window على مجموع فيه أرقام سالبة: تضييق الشباك ممكن يزوّد المجموع مش يقلّله، فالمنطق كله بيبوظ. وفي نسخة الـ Set: إنك تنسى تشيل الحرف من الـ Set وانت بتقدّم start.`
          },
          lines: [
            "طول أطول جزء متصل حروفه كلها مختلفة.",
            "Map: حرف ← آخر مكان شفناه فيه.",
            "بداية الشباك، وأطول طول لحد دلوقتي.",
            "i نهاية الشباك، بيتحرك لليمين كل لفة.",
            "الحرف اللي داخل.",
            "لو شفناه جوه الشباك الحالي، ابدأ الشباك بعد مكانه القديم.",
            "حدّث آخر مكان للحرف ده.",
            "طول الشباك دلوقتي [[i - start + 1]]، سجّله لو أحسن.",
            "قفلة.",
            "رجّع الأطول.",
            "قفلة.",
            "abc.",
            "wke، طولها ٣.",
            "abba: من غير شرط [[>= start]] كانت هترجع 3 غلط.",
            "string فاضية."
          ],
          sol: R`الإجابة 3 لـ «eceba» مع k = 2. Map للعدّ، وكل حرف جديد زوّد عدّه، وطول ما [[count.size > k]] شيل من الشمال: قلّل عدّ [[s[start]]]، ولو بقى صفر امسحه من الـ Map، وزوّد [[start]]. بعدين [[best = max(best, i - start + 1)]].

الحل [[O(n)]] رغم الـ while، لأن [[start]] بيتحرك لقدام بس، فكل حرف بيدخل مرة ويخرج مرة. والـ space [[O(k)]].

الغلطة المشهورة: تقلّل العدّ من غير ما تعمل [[delete]] لما يوصل صفر. كده [[count.size]] مش هيقل أبدًا والـ while هتفضل تلف لحد ما الشباك يفضى.`,
          solCode: R`function longestKDistinct(s, k) {
  const count = new Map();
  let start = 0, best = 0;
  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) || 0) + 1);
    while (count.size > k) {
      const ch = s[start++];
      count.set(ch, count.get(ch) - 1);
      if (count.get(ch) === 0) count.delete(ch);
    }
    best = Math.max(best, i - start + 1);
  }
  return best;
}
console.log(longestKDistinct("eceba", 2));  // 3  (ece)
console.log(longestKDistinct("aa", 1));     // 2
console.log(longestKDistinct("abc", 0));    // 0
// O(n) time (start only moves forward, each char enters and leaves once), O(k) space`,
          check: {
            lang: "js",
            starter: R`function longestKDistinct(s, k) {
  const count = new Map();
  let start = 0, best = 0;
  // زوّد عدّ الحرف الجديد، و while (count.size > k) ضيّق من الشمال
  return best;
}`,
            tests: R`test("('eceba', 2) ← 3 (ece)", () => expect(longestKDistinct("eceba", 2)).toBe(3));
test("('aa', 1) ← 2", () => expect(longestKDistinct("aa", 1)).toBe(2));
test("('aabbcc', 1) ← 2 و ('aabbcc', 3) ← 6", () => expect([longestKDistinct("aabbcc", 1), longestKDistinct("aabbcc", 3)]).toEqual([2, 6]));
test("لما العدّ يوصل صفر امسح الحرف من الـ Map: ('abaccc', 2) ← 4", () => expect(longestKDistinct("abaccc", 2)).toBe(4));
test("('', 2) و ('abc', 0) ← 0", () => expect([longestKDistinct("", 2), longestKDistinct("abc", 0)]).toEqual([0, 0]));
test("٩٠ ألف حرف (O(n): start بيتحرك لقدام بس)", () => expect(longestKDistinct("abc".repeat(30000), 2)).toBe(2));`,
            solution: R`function longestKDistinct(s, k) {
  const count = new Map();
  let start = 0, best = 0;
  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) || 0) + 1);
    while (count.size > k) {
      const c = count.get(s[start]) - 1;
      if (c === 0) count.delete(s[start]);
      else count.set(s[start], c);
      start++;
    }
    best = Math.max(best, i - start + 1);
  }
  return best;
}`
          }
        }
      ]
    }
]);
