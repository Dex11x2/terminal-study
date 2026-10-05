// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("dsa", {
  label: "DSA",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/dsa && cd ~/lab/dsa
node --test
node --watch two-sum.js`,
  labText: "حل كل مسألة في ملف لوحده، واكتب لها اختبار بـ node --test (تاب Node). جرّب تحلها قبل ما تبص على الحل، وبعدين قارن الـ Big-O.",
  levels: {"1":["الأساس","Big-O، و arrays و strings، و hash maps و sets، و recursion"],"2":["الأنماط","two pointers و sliding window و stacks و queues و binary search و sorting و linked lists"],"3":["المتقدم","trees و graphs و heaps و dynamic programming و greedy و backtracking و trie، و union-find و Dijkstra، وطريقة حل أي مسألة في الانترفيو وخطة تمرين"]},
  categories: [
    {
      t: "Big-O: تقيس الحل إزاي",
      l: 1,
      n: "قبل أي مسألة: الحل ده بيكبر إزاي لما الـ input يكبر، في الوقت وفي الذاكرة",
      items: [
        {
          cmd: "Big-O",
          title: "إزاي تقارن سرعة حلين من غير ما تشغّلهم؟",
          desc: R`Big-O بيقولك الوقت (أو الذاكرة) بيزيد إزاي لما حجم الـ input (اسمه n) يكبر، مش الكود بياخد كام ثانية.

الترتيب من الأسرع للأبطأ: [[O(1)]] ثابت مهما n كبرت، و [[O(log n)]] بيقسم المسألة نصين كل خطوة، و [[O(n)]] بيعدّي على كل عنصر مرة، و [[O(n log n)]] زي الـ sort الكويس، و [[O(n^2)]] كل عنصر مع كل عنصر.

عشان تحس بالفرق: لو n مليون، [[O(log n)]] حوالي ٢٠ خطوة، و [[O(n)]] مليون، و [[O(n log n)]] حوالي ٢٠ مليون، و [[O(n^2)]] مليون مليون. الأخيرة دي ساعات بدل جزء من الثانية.`,
          example: R`const arr = [3, 8, 1, 9, 4];
const first = a => a[0];                          // O(1)
const has = (a, x) => a.includes(x);              // O(n)
const sorted = a => [...a].sort((x, y) => x - y); // O(n log n)
const hasPair = a => {                            // O(n^2)
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      if (a[i] === a[j]) return true;
  return false;
};
let steps = 0;
for (let n = 1_000_000; n > 1; n = Math.floor(n / 2)) steps++; // O(log n)
console.log(first(arr), has(arr, 9), sorted(arr), hasPair(arr), steps); // 3 true [1, 3, 4, 8, 9] false 19`,
          try: R`غيّر n في loop القسمة لمليار وشوف [[steps]] بقت كام (٢٩ بس). وبعدين جرّب [[hasPair]] على array فيها ٥٠ ألف رقم مختلفين، وقيس الوقت بـ [[console.time("x")]] و [[console.timeEnd("x")]].`,
          flag: "script",
          deep: {
            why: "في الانترفيو مش هيسألك «الكود ده بياخد كام ثانية»، لأن ده بيعتمد على الجهاز. هيسألك «لو الـ input بقى أكبر ١٠٠ مرة، هيحصل إيه؟». وفي الشغل نفس السؤال: صفحة بتتعامل مع ١٠٠ طلب كويس، ومع ١٠٠ ألف بتقع. Big-O هو اللغة اللي بتتكلم بيها عن ده.",
            how: R`Big-O بيوصف الحل لما n تكبر أوي، فبنشيل حاجتين: الثوابت، والحدود الأصغر. [[3n + 10]] بتبقى [[O(n)]]، لأن لما n تبقى مليون الـ 10 ملهاش لازمة، والـ 3 مش هتغيّر شكل المنحنى. و [[n^2 + n]] بتبقى [[O(n^2)]].

[[O(1)]]: عدد خطوات ثابت. قراءة عنصر بالـ index، أو [[map.get(key)]].

[[O(log n)]]: كل خطوة بتشيل نص المسألة. binary search على مليون عنصر = ٢٠ خطوة.

[[O(n)]]: loop واحد على العناصر.

[[O(n log n)]]: الـ sort الكويس (merge sort، و TimSort اللي جوه JS). وأي حل شكله «رتّب الأول وبعدين loop» بيبقى [[O(n log n)]]، لأن الـ sort هو الأغلى.

[[O(n^2)]]: loop جوه loop على نفس البيانات.

[[O(2^n)]]: كل عنصر قدامه اختيارين (تاخده أو لأ)، زي كل المجموعات الجزئية. بيبقى مستحيل بعد n = 30 تقريبًا.

وقاعدة عملية للانترفيو: اعتبر إن الجهاز بيعمل حوالي 10^8 عملية بسيطة في الثانية. لو n = 10^5 يبقى [[O(n^2)]] = 10^10، كتير أوي، ومحتاج [[O(n log n)]] أو أحسن. ولو n ≤ 20، حتى [[O(2^n)]] مقبول. عشان كده الـ constraints المكتوبة في المسألة بتلمّحلك على الحل.`,
            when: "مع كل حل بتكتبه، قبل ما تشغّله. وفي الانترفيو قولها بصوت عالي بعد ما تخلص: «ده O(n) time و O(n) space».",
            mistakes: R`إنك تفتكر إن [[O(2n)]] أبطأ من [[O(n)]] في Big-O: هما نفس الحاجة. وإنك تنسى إن فيه دوال جواها loop مستخبي: [[includes]] و [[indexOf]] و [[slice]] والـ spread كلهم [[O(n)]]، فلو جوه loop يبقى الحل [[O(n^2)]] من غير ما تاخد بالك. وإنك تفتكر إن Big-O هو الوقت بالظبط: حل [[O(n)]] ممكن يبقى أبطأ من [[O(n^2)]] على ١٠ عناصر، الفرق بيبان لما n تكبر.`
          },
          lines: [
            "array صغيرة نجرّب عليها.",
            "أول عنصر: خطوة واحدة مهما الـ array كبرت، O(1).",
            "[[includes]] بتعدّي على العناصر واحد واحد لحد ما تلاقي: O(n).",
            "الـ sort بياخد O(n log n). والـ spread بيعمل نسخة عشان منبوّظش الأصلية.",
            "دالة بتقارن كل عنصر بكل اللي بعده.",
            "loop برّا: n لفة.",
            "loop جوّا: لكل i لحد n لفة، فالمجموع حوالي n² / 2، يعني O(n^2).",
            "لو لقينا اتنين زي بعض نرجع على طول.",
            "خلصنا من غير تكرار.",
            "قفلة الدالة.",
            "عدّاد للخطوات.",
            "كل لفة n بتتقسم على ٢، فعدد اللفات log₂(n)، يعني O(log n).",
            "مليون بيتقسم نصين ١٩ مرة بس لحد ما يوصل ١."
          ],
          sol: R`مع مليار، [[steps]] بتطلع 29 بس (مع مليون كانت 19). الـ input كبر ألف مرة والخطوات زادت 10 بس، لأن كل ما n تتضاعف بتزيد خطوة واحدة. ده معنى [[O(log n)]].

و [[hasPair]] على ٥٠ ألف رقم مختلفين بترجع [[false]] بعد حوالي ١.٢٥ مليار مقارنة (n × (n - 1) / 2)، وعندي أخدت حوالي ثانية ([[x: 949ms]] تقريبًا، والرقم عندك هيختلف حسب الجهاز). نفس السؤال بـ [[new Set(a).size !== a.length]] خلص في حوالي 5ms. الأرقام المختلفة هي أسوأ حالة، لأن الدالة مش هتلاقي تكرار تقف عنده.

الغلطة المشهورة: تجرّب على array فيها تكرار في الأول (زي [[[1, 1, ...]]]) فتلاقيها سريعة وتفتكر إن [[O(n^2)]] مش مشكلة. Big-O بيتكلم عن أسوأ حالة، ومش كل اختبار بيوصلها.`,
          solCode: R`let steps = 0;
for (let n = 1_000_000_000; n > 1; n = Math.floor(n / 2)) steps++;
console.log(steps); // 29
const hasPair = a => {
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      if (a[i] === a[j]) return true;
  return false;
};
const hasPairSet = a => new Set(a).size !== a.length;
const big = Array.from({ length: 50_000 }, (_, i) => i);
console.time("x");
console.log(hasPair(big));    // false (after ~1.25 billion comparisons)
console.timeEnd("x");         // x: about 1s (depends on the machine)
console.time("set");
console.log(hasPairSet(big)); // false
console.timeEnd("set");       // set: a few ms
// hasPair: O(n^2) time, O(1) space; hasPairSet: O(n) time, O(n) space`
        },
        {
          cmd: "counting loops",
          title: "الكود ده O(إيه)؟ loop جوه loop، و loop بيقسم على ٢",
          desc: R`loops ورا بعض بتتجمع، و loops جوه بعض بتتضرب، و loop المتغير فيه بيتضرب أو بيتقسم على رقم ثابت كل لفة بياخد [[O(log n)]].

بعد ما تعدّ، شيل الثوابت والحدود الأصغر: [[2n]] تبقى [[O(n)]]، و [[n^2 + n]] تبقى [[O(n^2)]]. و loop جوه loop الجوّاني فيه بيبدأ من [[i + 1]] بيعمل [[n(n-1)/2]] لفة، ودي برضه [[O(n^2)]].

وخلي بالك من الـ loops المستخبية: أي دالة built-in بتعدّي على array (زي [[includes]] و [[indexOf]] و [[filter]]) جوه loop بتضرب في n.`,
          example: R`function countOps(n) {
  let a = 0, b = 0, c = 0, d = 0;
  for (let i = 0; i < n; i++) a++;
  for (let i = 0; i < n; i++) a++;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) b++;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) c++;
  for (let i = 1; i < n; i *= 2) d++;
  return [a, b, c, d];
}
console.log(countOps(8));    // [16, 64, 28, 3]
console.log(countOps(1024)); // [2048, 1048576, 523776, 10]
// a: 2n = O(n), b: n^2 = O(n^2), c: n(n-1)/2 = O(n^2), d: log2(n) = O(log n)`,
          try: R`ضيف loop خامس [[for (let i = n; i > 0; i = Math.floor(i / 3))]] واتوقّع هيلف كام مرة لـ n = 1024 قبل ما تشغّل (٧). وبعدين اكتب دالة فيها [[arr.includes]] جوه [[for]] وقول الـ Big-O بتاعها.`,
          flag: "script",
          deep: {
            why: "في الانترفيو أول سؤال بعد ما تكتب الحل: «الـ complexity بتاعته إيه؟». ولازم تجاوب من الكود نفسه في ثواني، من غير ما تشغّله. والطريقة دي بتنفع مع أغلب الكود اللي هتقابله.",
            how: R`امشي على الكود من برّا لجوّا، واسأل لكل loop سؤالين: بيلف كام مرة؟ وجواه إيه؟

١. loop بيعدّ من 0 لـ n بخطوة ثابتة: n لفة. حتى لو الخطوة 2 ([[i += 2]])، ده n/2 لفة، وبرضه [[O(n)]].

٢. loop جوه loop: اضرب. ولو الجوّاني بيعتمد على الخارجي ([[j = i + 1]])، عدّ بالمجموع: 1 + 2 + ... + (n-1) = n(n-1)/2، يعني [[O(n^2)]].

٣. loops ورا بعض: اجمع، وخد الأكبر. [[O(n) + O(n^2) = O(n^2)]].

٤. المتغير بيتضرب أو بيتقسم ([[i *= 2]] أو [[i = Math.floor(i / 2)]]): عدد اللفات هو «كام مرة أقسم n على ٢ لحد ما توصل ١»، ودا تعريف log₂(n).

٥. لو فيه حجمين مختلفين (array طولها n و array طولها m)، متدمجهمش: loop على واحدة جوه loop على التانية يبقى [[O(n × m)]]، مش [[O(n^2)]].

٦. دوال الـ built-in ليها تمن: [[arr.includes(x)]] [[O(n)]]، و [[arr.sort()]] [[O(n log n)]]، و [[str.slice()]] على قد طول القطعة. لو جوه loop، اضربها في عدد اللفات.

وبعد ما تعدّ، شيل الثوابت والحدود الأصغر، واللي فاضل هو اللي بتقوله.`,
            when: "مع كل حل بتكتبه. وكمان وانت بتراجع كود حد تاني: [[filter]] أو [[find]] جوه [[map]] على بيانات كبيرة علامة إن فيه O(n^2) مستخبية.",
            mistakes: R`إنك تحكم من شكل الكود بس: loop جوه loop مش دايمًا [[O(n^2)]]، لو الجوّاني بيلف ٣ مرات ثابتين يبقى [[O(n)]]. والعكس: loop واحد فيه [[includes]] يبقى [[O(n^2)]].

وفي مشروع حقيقي كان فيه سطر زي [[ids.filter(id => !existingIds.includes(id))]]. ده [[O(n × m)]]. على ٥٠ عنصر مش هتحس بحاجة، بس على ١٠٠ ألف هيعلّق. الحل تحوّل [[existingIds]] لـ Set الأول وتستخدم [[has]]، فيبقى [[O(n + m)]].

وتنسى الـ recursion: دالة بتنادي نفسها مرتين على n-1 مش [[O(n)]]، دي [[O(2^n)]].`
          },
          lines: [
            "دالة بتعدّ كل loop لف كام مرة.",
            "أربع عدّادات، واحد لكل نوع.",
            "loop على n: n لفة.",
            "loop تاني ورا الأول (مش جواه): n كمان. المجموع 2n، يعني O(n).",
            "loop برّا...",
            "...وجواه loop كامل: n × n لفة، O(n^2).",
            "loop برّا تاني.",
            "الجوّاني بيبدأ من [[i + 1]]: عدد اللفات حوالي النص، بس برضه O(n^2).",
            "[[i *= 2]]: المتغير بيتضاعف، فبيوصل n في log₂(n) لفة.",
            "رجّع العدّادات.",
            "قفلة.",
            "n = 8: أرقام صغيرة تقدر تعدّها بإيدك.",
            "n = 1024: لاحظ b بقت مليون، و d بقت ١٠ بس."
          ],
          sol: R`الـ loop الخامس بيلف 7 مرات لـ n = 1024: قيم i هي 1024 و 341 و 113 و 37 و 12 و 4 و 1، وبعدها [[Math.floor(1 / 3)]] بتبقى 0 فيقف. ده [[O(log n)]] بأساس 3 (log3 1024 حوالي 6.3، فبيلف 7). وأساس الـ log مش بيفرق في Big-O، لأنه مجرد ضرب في رقم ثابت.

الدالة اللي فيها [[arr.includes]] جوه [[for]]: الـ Big-O بتاعها [[O(n * m)]]، أو [[O(n^2)]] لو الاتنين نفس الحجم. [[includes]] شكلها سطر واحد، بس جواها loop بيعدّي على الـ array كلها.

الغلطة المشهورة: تقول [[O(n)]] لأنك شايف [[for]] واحد بس. في الانترفيو اسأل نفسك عن كل method: [[includes]] و [[indexOf]] و [[shift]] و [[splice]] كلهم [[O(n)]]، أما [[Set.has]] و [[Map.get]] فـ [[O(1)]] في المتوسط.`,
          solCode: R`function countDiv3(n) {
  let e = 0;
  for (let i = n; i > 0; i = Math.floor(i / 3)) e++;
  return e;
}
console.log(countDiv3(1024)); // 7  (1024, 341, 113, 37, 12, 4, 1)
function common(a, b) {
  const out = [];
  for (const x of a) {
    if (b.includes(x)) out.push(x);
  }
  return out;
}
console.log(common([1, 2, 3, 4], [4, 2, 9])); // [2, 4]
// countDiv3: O(log n) (log base 3 = 6.3, so 7 turns)
// common: O(n * m) time, includes is a hidden loop; O(n^2) when both have n items`
        },
        {
          cmd: "space complexity",
          title: "الحل ده بياخد ذاكرة زيادة قد إيه؟",
          desc: R`space complexity هي الذاكرة الزيادة اللي الحل بيحجزها غير الـ input نفسه، وبتتقاس بـ Big-O زي الوقت بالظبط.

كام متغير ثابت (عدّاد، مجموع، index) = [[O(1)]]. array أو Map أو Set بتكبر مع n = [[O(n)]]. و array جديدة في كل لفة من loop (زي [[slice]]) ممكن توصّل الذاكرة المتحجزة لـ [[O(n^2)]] لو فضلت عايشة.

والـ recursion بتاخد ذاكرة حتى لو مفيش ولا array: كل نداء بيحجز frame في الـ call stack، فـ recursion بعمق n = [[O(n)]] space.`,
          example: R`function sumConstant(a) {
  let s = 0;
  for (const x of a) s += x;
  return s;
}
function doubledCopy(a) {
  return a.map(x => x * 2);
}
function sumRecursive(a, i = 0) {
  if (i === a.length) return 0;
  return a[i] + sumRecursive(a, i + 1);
}
const a = [1, 2, 3, 4];
console.log(sumConstant(a), doubledCopy(a), sumRecursive(a)); // 10 [2, 4, 6, 8] 10
// all three are O(n) time; space: O(1), O(n) new array, O(n) call stack`,
          try: R`شغّل [[sumRecursive]] على array فيها ١٠٠ ألف عنصر ([[new Array(1e5).fill(1)]]) وشوف الـ RangeError، وبعدين [[sumConstant]] على نفس الـ array. نفس عدد الخطوات، بس الذاكرة فرقت.`,
          flag: "script",
          deep: {
            why: "السؤال التاني في الانترفيو بعد الوقت: «والـ space؟». وكتير من الحلول الأسرع بتدفع ذاكرة (Map عشان توفّر loop)، فلازم تعرف بتدفع كام. وفي الحقيقة: سيرفر فيه 512MB رام، أو function على serverless، أو موبايل، الذاكرة ليها حد.",
            how: R`بتعدّ الحاجات اللي بتتحجز وتفضل عايشة في نفس الوقت، وبتاخد أكبر رقم وصلته:

١. متغيرات عادية (أرقام و booleans ومراجع لـ objects موجودة): كل واحد [[O(1)]]. عشرة متغيرات برضه [[O(1)]].

٢. array أو Map أو Set أو string جديدة: على قد حجمها. [[new Array(n)]] = [[O(n)]]. وجدول n × m زي جدول الـ DP بتاع LCS = [[O(n × m)]].

٣. الـ call stack: كل نداء بيحجز frame فيه المتغيرات المحلية ومكان الرجوع. لو الـ recursion بتنزل n مستوى قبل ما ترجع، يبقى فيه n frame في نفس الوقت = [[O(n)]]. في شجرة متوازنة العمق log n، فالـ DFS عليها [[O(log n)]] space، وفي شجرة شكلها خط [[O(n)]].

٤. الـ output: عادة مش بيتحسب (لو المطلوب ترجّع n عنصر، مفيش طريقة غير كده). قول ده صراحة في الانترفيو: «O(1) extra space غير الـ output».

والـ strings في JS immutable: [[split]] والـ spread بيعملوا array جديدة طولها n، فحتى لو «مفيش array» في الحل، التحويل ده بيكلّف [[O(n)]] space.`,
            when: "لما تقارن حلين ليهم نفس الوقت، أو لما المسألة تقول «in-place» أو «O(1) extra space». ولما البيانات كبيرة: ملف لوج ٢ جيجا مينفعش تحطه كله في array، لازم تقراه stream.",
            mistakes: R`إنك تنسى الـ call stack وتقول على recursion إنها [[O(1)]] space. وإنك تفتكر إن [[slice]] والـ spread و [[map]] ببلاش: كل واحدة بتعمل نسخة. وإنك تعدّ الـ input نفسه ضمن الـ extra space. وإن «in-place» معناها [[O(1)]] ذاكرة زيادة، مش «الدالة مبترجّعش حاجة».`
          },
          lines: [
            "مجموع بـ loop.",
            "متغير واحد بس مهما الـ array كبرت: O(1).",
            "عدّي على العناصر.",
            "رجّع المجموع.",
            "قفلة.",
            "نسخة مضاعفة.",
            "[[map]] بترجّع array جديدة طولها n: O(n) space.",
            "قفلة.",
            "نفس المجموع بس بـ recursion.",
            "الـ base case: وصلنا لآخر الـ array.",
            "كل نداء مستني اللي بعده يرجع، فيه n نداء مفتوحين في نفس الوقت: O(n) space.",
            "قفلة.",
            "input نجرّب بيه.",
            "التلاتة بيطلّعوا نتيجة صح، بس بتكلفة ذاكرة مختلفة."
          ],
          sol: R`[[sumRecursive]] على ١٠٠ ألف عنصر بتقع بـ [[RangeError: Maximum call stack size exceeded]]، لأن كل نداء بيفضل مستني اللي بعده، فالـ stack بيبقى فيه ١٠٠ ألف frame في نفس الوقت، والـ stack في Node بيشيل حوالي ١٠ آلاف بس. و [[sumConstant]] على نفس الـ array بترجع [[100000]] عادي.

الاتنين بيعملوا نفس عدد الخطوات ([[O(n)]] time). الفرق كله في الذاكرة: الـ loop بيستخدم متغير واحد [[O(1)]]، والـ recursion بيستخدم [[O(n)]] في الـ call stack حتى لو مفيش ولا array جديدة.

الغلطة المشهورة: تقول إن الـ recursion space بتاعها [[O(1)]] لأنك مش شايف [[new Array]]. الـ call stack بيتحسب في الـ space complexity، وده سؤال بيتسأل كتير في الانترفيو.`,
          solCode: R`function sumConstant(a) {
  let s = 0;
  for (const x of a) s += x;
  return s;
}
function sumRecursive(a, i = 0) {
  if (i === a.length) return 0;
  return a[i] + sumRecursive(a, i + 1);
}
const big = new Array(1e5).fill(1);
try { sumRecursive(big); }
catch (e) { console.log(e.name + ": " + e.message); } // RangeError: Maximum call stack size exceeded
console.log(sumConstant(big)); // 100000
// both do n steps: O(n) time; sumRecursive keeps n frames alive: O(n) space, sumConstant: O(1)`
        },
        {
          cmd: "amortized O(1)",
          title: "ليه push سريع مع إن الـ array ساعات بتتنقل كلها لمكان أكبر؟",
          desc: R`الـ array بتحجز مكان أكبر من اللي محتاجاه. لما تتملي، بتحجز مكان أكبر وتنقل كل العناصر ([[O(n)]])، بس ده بيحصل نادر، فلو قسمت التكلفة على كل الـ pushes يطلع المتوسط ثابت: amortized [[O(1)]].

المثال بيعمل array بإيده بتكبر للضعف. بعد ١٠٢٤ push، عدد عمليات النسخ كلها ١٠٢٣، يعني أقل من نسخة واحدة لكل push.

amortized مش «متوسط لو الحظ حلو»: ده ضمان على أي سلسلة عمليات. push واحدة ممكن تبقى [[O(n)]]، بس أي n push ورا بعض مجموعهم [[O(n)]].`,
          example: R`class DynArray {
  constructor() { this.cap = 1; this.len = 0; this.data = new Array(1); this.copies = 0; }
  push(x) {
    if (this.len === this.cap) {
      this.cap *= 2;
      const bigger = new Array(this.cap);
      for (let i = 0; i < this.len; i++) { bigger[i] = this.data[i]; this.copies++; }
      this.data = bigger;
    }
    this.data[this.len++] = x;
  }
}
const d = new DynArray();
for (let i = 0; i < 1024; i++) d.push(i);
console.log(d.len, d.cap, d.copies, d.copies / d.len); // 1024 1024 1023 0.9990234375
// push: amortized O(1) time (total copies < n), a single push is O(n) in the worst case`,
          try: R`غيّر [[this.cap *= 2]] لـ [[this.cap += 10]] (تكبير بمقدار ثابت) وشغّل ١٠٠٠٠ push. قارن [[copies / len]]: هتلاقيها بتكبر مع n، يعني push بقت [[O(n)]] في المتوسط.`,
          flag: "script",
          deep: {
            why: "هتسمع «push O(1)» في كل حتة، ومسائل الـ stack كلها مبنية عليه. ولو الانترفيوير سألك «بس ساعات الـ array بتتنسخ كلها؟» لازم ترد: أيوه، والمتوسط برضه ثابت، وده اسمه amortized.",
            how: R`الـ array في الذاكرة بلوك واحد متصل. عشان كده الـ index سريع: عنوان العنصر = بداية البلوك + i × حجم الخانة.

لما البلوك يتملى، مينفعش نكبّره في مكانه (اللي بعده ممكن يكون محجوز لحاجة تانية)، فبنحجز بلوك أكبر وننقل. السر إن الزيادة بتبقى بنسبة (ضعف مثلًا)، مش بمقدار ثابت:

مع الضعف، النسخ بيحصل لما الطول يوصل 1 و 2 و 4 ... لحد n/2. مجموعهم 1 + 2 + 4 + ... + n/2 أقل من n. يعني n push كلّفوا n كتابة + أقل من n نسخة = أقل من 2n. يعني [[O(1)]] لكل push، مضمونة.

مع زيادة ثابتة (+10)، النسخ بيحصل كل ١٠ عناصر، وكل مرة بتنسخ كل اللي فات: 10 + 20 + 30 + ... ≈ n² / 20. يعني [[O(n)]] لكل push. الفرق كله في «بنسبة» مقابل «بمقدار».

V8 (محرك JS في Chrome و Node) مش بيضاعف بالظبط، بيكبّر حوالي مرة ونص، بس الفكرة واحدة. ونفس الكلام في [[ArrayList]] في Java و [[vector]] في C++ و [[list]] في Python.

ولنفس السبب [[pop]] [[O(1)]]. لكن [[shift]] و [[unshift]] [[O(n)]]، لأنهم بيحرّكوا كل العناصر خطوة (شوف درس الـ queue في المستوى التاني).`,
            when: "لما تستخدم array كـ stack (push و pop): ده O(1) ومفيش داعي لحاجة أعقد. ولما حد يسألك عن Big-O لـ push: قول «amortized O(1)» مش «O(1)» وبس.",
            mistakes: R`إنك تقول push دايمًا [[O(1)]]: push واحدة ممكن تبقى [[O(n)]] لحظة التكبير، وده ممكن يفرق في حاجة حساسة للتأخير زي لعبة أو صوت live. وإنك تعمّم الكلام على [[unshift]]: دي بتضيف في الأول فبتحرّك كله، [[O(n)]] كل مرة، و n منها ورا بعض [[O(n^2)]].`
          },
          lines: [
            "array بتكبر لوحدها، زي اللي جوه JS.",
            "مكان لعنصر واحد في الأول، وعدّاد لعمليات النسخ.",
            "إضافة عنصر في الآخر.",
            "لو المكان اتملى...",
            "...ضاعف السعة.",
            "احجز array أكبر.",
            "انقل كل العناصر القديمة واحد واحد، وعدّ. دي الخطوة الغالية O(n).",
            "استخدم المكان الجديد.",
            "قفلة الـ if.",
            "الحالة العادية: حط العنصر وزوّد الطول. O(1).",
            "قفلة push.",
            "قفلة الـ class.",
            "array جديدة فاضية.",
            "١٠٢٤ push.",
            "النسخ حصل عند 1 و 2 و 4 ... و 512، المجموع 1023، يعني أقل من نسخة لكل push."
          ],
          sol: R`مع المضاعفة، [[copies / len]] بتفضل صغيرة وثابتة تقريبًا: 1.02 لـ ١٠٠٠، و 1.64 لـ ١٠ آلاف (بتتذبذب بين 1 و 2 حسب إنت فين من آخر تكبير). يعني كل push بتكلّف في المتوسط نسخة أو اتنين.

مع [[this.cap += 10]] الرقم بيطلع 49.6 لـ ١٠٠٠، و 499.6 لـ ١٠ آلاف: n كبرت ١٠ مرات، والنسخ لكل push كبر ١٠ مرات. ده لأن التكبير بيحصل كل 10 عناصر وكل مرة بتنسخ كل اللي قبله (1 + 11 + 21 + ...)، فالمجموع حوالي [[n^2 / 20]]، يعني push بقت [[O(n)]] في المتوسط.

الغلطة المشهورة: تفتكر إن أي تكبير كفاية. اللي بيخلّي الـ push [[amortized O(1)]] إن الحجم بيتضرب في رقم (2 أو 1.5)، مش بيزيد بمقدار ثابت.`,
          solCode: R`class DynArray {
  constructor(grow) { this.grow = grow; this.cap = 1; this.len = 0; this.data = new Array(1); this.copies = 0; }
  push(x) {
    if (this.len === this.cap) {
      this.cap = this.grow(this.cap);
      const bigger = new Array(this.cap);
      for (let i = 0; i < this.len; i++) { bigger[i] = this.data[i]; this.copies++; }
      this.data = bigger;
    }
    this.data[this.len++] = x;
  }
}
for (const n of [1000, 10000]) {
  const dbl = new DynArray(c => c * 2), add = new DynArray(c => c + 10);
  for (let i = 0; i < n; i++) { dbl.push(i); add.push(i); }
  console.log(n, dbl.copies / dbl.len, add.copies / add.len);
}
// 1000 1.023 49.6
// 10000 1.6383 499.6
// doubling: total copies < 2n, so push is amortized O(1)
// +10: copies = 1 + 11 + 21 + ... ~ n^2 / 20, so push averages O(n)`
        }
      ]
    },
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
  ]
});
