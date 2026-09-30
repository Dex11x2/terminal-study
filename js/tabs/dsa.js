// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
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
          try: R`اكتب [[reverseRange(a, from, to)]] تقلب جزء بس، واستخدمها تعمل rotate لليمين: [1, 2, 3, 4, 5] بـ k = 2 تبقى [4, 5, 1, 2, 3]. (اقلب الكل، وبعدين اقلب أول k، وبعدين الباقي).`,
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
// O(n) time (every item is swapped at most twice), O(1) extra space`
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
          try: R`عدّلها ترجّع كل القيم اللي ليها أعلى عدد لو فيه تعادل: [1, 1, 2, 2, 3] ترجع [1, 2]. وبعدين عدّ الحروف في جملة بـ [[reduce]] بدل [[for]].`,
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
// O(n) time, O(k) space (k = distinct values)`
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
          try: R`حلّها بطريقة الـ sort في سطر واحد وقارن الـ Big-O. وبعدين خليها تتجاهل المسافات والحروف الكبيرة: [[isAnagram("Dormitory", "dirty room")]] تطلع true.`,
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
// sort version: O(n log n) time, O(n) space; count version: O(n) time, O(k) space`
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
          try: R`اعملها O(1) space: من غير [[clean]]، خلي المؤشرين يعدّوا أي حاجة مش حرف أو رقم وهما ماشيين. وبعدين حل النسخة الأصعب: مسموح تمسح حرف واحد بس، تقدر تخليها palindrome؟ (aba آه، abca آه، abc لأ).`,
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
// both: O(n) time, O(1) extra space`
        }
      ]
    },
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
          try: R`عدّلها ترجّع كل الأزواج (القيم مش الـ indexes) من غير تكرار: [1, 5, 3, 3, 7, 5] مع target = 8 ترجع [5, 3] و [1, 7] بس. فكّر: هتخزّن إيه، وإزاي تمنع الزوج يتكرر؟`,
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
// O(n) time, O(n) space (seen + used)`
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
          try: R`اكتب [[missingIds(requested, existing)]] ترجّع الـ ids اللي في الأولى ومش في التانية، مرة بـ [[filter]] و [[includes]] ومرة بـ Set، وقيس الوقت على ٥٠ ألف id في كل واحدة.`,
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
// includes: O(n * m) time; Set: O(n + m) time, O(m) extra space`
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
          try: R`اعملها بـ array طولها 26 بدل Map (الحروف a-z بس). وبعدين النسخة الـ stream: الحروف جاية واحد واحد، وبعد كل حرف لازم ترد «أول حرف مش متكرر لحد دلوقتي» (فكّر في Map مع queue).`,
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
// array: O(n) time, O(1) space (26 slots); stream: amortized O(1) per char (head only moves forward)`
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
          try: R`غيّر المفتاح لعدّ الحروف: array من 26 صفر، زوّد عند كل حرف، و [[join("#")]]. اتأكد إن النتيجة زي ما هي. ليه الـ # مهمة؟ (من غيرها العدّين [1, 11] و [11, 1] الاتنين يبقوا 111).`,
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
// O(n * k) time (no sort), O(n * k) space`
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
          try: R`اكتب [[power(x, n)]] بـ recursion بطريقتين: [[x * power(x, n - 1)]]، و «لو n زوجي، احسب [[power(x, n / 2)]] مرة واحدة وربّعها». عدّ النداءات في الاتنين لـ n = 1024، وقول الـ Big-O لكل واحدة.`,
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
// powerSlow: O(n) time and O(n) stack; powerFast: O(log n) time and O(log n) stack`
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
          try: R`حط عدّاد نداءات في النسختين وقارن لـ n = 25 (حوالي ربع مليون نداء مقابل ٤٩). وبعدين اكتب [[memoize(fn)]] عامة: تاخد أي دالة ليها argument واحد وترجّع نسخة بـ cache.`,
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
// fibSlow: O(2^n) time; memo: O(n) time, O(n) space`
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
          try: R`حل «عدد الأجزاء المتصلة اللي مجموعها k» ([1, 2, 3] و k = 3 الإجابة 2): وانت بتجمّع، خزّن في Map كل مجموع شفته كام مرة، واسأل «[[sum - k]] ظهر كام مرة قبل كده؟». ده prefix sum مع hash map، وبيشتغل مع الأرقام السالبة.`,
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
// O(n) time, O(n) space`
        }
      ]
    },
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
          try: R`حل three sum: كل التلاتيات اللي مجموعها 0 من غير تكرار. رتّب الأول، وثبّت عنصر، وشغّل المؤشرين على اللي بعده. [-1, 0, 1, 2, -1, -4] ترجع [-1, -1, 2] و [-1, 0, 1]. الـ Big-O المتوقع [[O(n^2)]].`,
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
// O(n^2) time (n fixed items x an O(n) two-pointer pass; the sort is only O(n log n)), O(1) extra space besides the output and the sorted copy`
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
          try: R`حرّك كل الأصفار لآخر الـ array مع الحفاظ على ترتيب الباقي، in-place: [0, 1, 0, 3, 12] تبقى [1, 3, 12, 0, 0]. وبعدين: شيل التكرار بس اسمح لكل رقم يظهر مرتين بالكتير (قارن بالعنصر عند [[write - 2]]).`,
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
// both: O(n) time, O(1) extra space`
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
          try: R`حل trapping rain water: كام وحدة مية تتحبس فوق كل الأعمدة؟ [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] الإجابة 6. نفس الفكرة: مؤشرين، وأعلى عمود شفته من كل ناحية لحد دلوقتي.`,
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
// O(n) time, O(1) space (the leftMax/rightMax arrays version is O(n) space)`
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
          try: R`عدّلها ترجّع index بداية أحسن شباك بدل المجموع. وبعدين حل: كام شباك طوله k متوسطه ≥ threshold؟`,
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
// both: O(n) time, O(1) space`
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
          try: R`حل: أطول جزء متصل فيه k حروف مختلفة بالكتير ([[eceba]] مع k = 2 الإجابة 3: ece). المرة دي ضيّق الشباك بـ while من الشمال، وشيل من عدّاد الحروف، لحد ما عدد الحروف المختلفة يرجع ≤ k.`,
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
// O(n) time (start only moves forward, each char enters and leaves once), O(k) space`
        }
      ]
    },
    {
      t: "stacks و queues",
      l: 2,
      n: "آخر واحد دخل أول واحد يطلع (stack)، وأول واحد دخل أول واحد يطلع (queue)",
      items: [
        {
          cmd: "stack (matching brackets)",
          title: "الأقواس دي متقفلة صح وبالترتيب؟ زي ({[]})",
          desc: R`كل قوس بيفتح حطه في stack. كل قوس بيقفل لازم يطابق آخر واحد اتفتح (اللي فوق الـ stack)، فاعمله pop وقارن. في الآخر الـ stack لازم يبقى فاضي. [[O(n)]].

ليه stack؟ لأن آخر قوس اتفتح هو أول واحد لازم يتقفل. ده بالظبط LIFO (Last In, First Out).

وفي JS الـ array هي الـ stack: [[push]] و [[pop]] و [[at(-1)]] للي فوق، كلهم [[O(1)]].`,
          example: R`function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}
console.log(isValid("({[]})")); // true
console.log(isValid("([)]"));   // false
console.log(isValid("(("));     // false
console.log(isValid("))"));     // false
// O(n) time, O(n) space`,
          try: R`عدّلها ترجّع index أول قوس غلط (أو -1). وبعدين حل: أقل عدد أقواس تضيفها عشان [[())(]] تبقى سليمة (الإجابة 2).`,
          flag: "script",
          deep: {
            why: "الـ stack هو الـ data structure اللي ورا حاجات بتستخدمها كل يوم: الـ call stack نفسه، و undo في أي editor، وزرار back في المتصفح، والـ parser اللي بيقرا JSON و HTML ويتأكد إن كل حاجة اتقفلت. والمسألة دي أبسط مثال عليه، وبتتسأل كتير.",
            how: R`dry run على ({[]}):

( يفتح: الـ stack فيه (. و { يفتح: فيه ( و {. و [ يفتح: فيه ( و { و [.

] يقفل: pop بيطلّع [، وبيطابق. فاضل ( و {.

} يقفل: pop بيطلّع {، بيطابق. ) يقفل: pop بيطلّع (، بيطابق. الـ stack فاضي: true.

على ([)]: ( و [ اتحطوا. جت ): pop بيطلّع [ ومش بيطابق (: false على طول.

ليه الـ object من القفل للفتح مش العكس؟ لأن لما ييجي قوس قفل محتاج تعرف «المفروض يبقى فوق إيه»، فالقفل هو المفتاح.

و [[ch in pairs]] بتسأل: الحرف ده مفتاح في الـ object؟ يعني قوس قفل. أي حرف تاني (حروف أو أرقام) بيتجاهل.`,
            when: "أقواس وتاجز، وأي «آخر حاجة اتفتحت لازم تتقفل الأول». وكمان حساب expression زي 3 + (4 × 2)، و undo/redo، و DFS من غير recursion.",
            mistakes: R`إنك تعدّ الأقواس بس (عدد الفتح = عدد القفل): ([)] عدّها سليم وهي غلط. وإنك تنسى الـ check الأخير إن الـ stack فاضي ((( هترجع true). وإنك تعتمد على إن [[pop()]] على stack فاضي بترجّع undefined بهدوء: هنا ده شغال لصالحنا، بس في كود تاني ممكن يخبّي bug، فاعمل check صريح لو المعنى مهم.`
          },
          lines: [
            "true لو كل الأقواس متقفلة صح.",
            "كل قوس قفل ← القوس اللي بيفتحه.",
            "الـ stack: الأقواس المفتوحة اللي لسه متقفلتش.",
            "حرف حرف.",
            "قوس بيفتح: حطه فوق.",
            "قوس بيقفل...",
            "...لازم اللي فوق يبقى نفس النوع. [[pop]] على stack فاضي بترجّع undefined، فبيفشل صح.",
            "قفلة.",
            "قفلة.",
            "لو فاضل حاجة مفتوحة، يبقى غلط.",
            "قفلة.",
            "متداخلين صح.",
            "الـ ) جت والـ [ لسه مفتوح فوقها.",
            "فتح من غير قفل.",
            "قفل من غير فتح."
          ],
          sol: R`index أول قوس غلط: خزّن الـ indexes في الـ stack بدل الحروف. لو قفلة ملهاش فتحة أو مش مناسبة، رجّع مكانها. ولو الـ loop خلص والـ stack فيه حاجة، رجّع [[stack[0]]] (أول فتحة ماتقفلتش). النتايج: [[-1]] لـ ({[]})، و 2 لـ ([)]، و 0 لـ ((.

أقل إضافة: مع نوع واحد من الأقواس مش محتاج stack، عداد كفاية. [[open]] بيزيد مع كل فتحة وبيقل مع كل قفلة، ولو جت قفلة و [[open]] صفر زوّد [[add]]. الإجابة [[add + open]]، و ())( تطلع 2. [[O(n)]] time و [[O(1)]] space.

الغلطة المشهورة: تكتفي بـ [[open]] وتخليه ينزل تحت الصفر. كده ( و ) بيلغوا بعض حتى لو القفلة جت قبل الفتحة، فـ ")(" تطلع 0 وهي محتاجة 2.`,
          solCode: R`function firstBadIndex(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(" || ch === "[" || ch === "{") stack.push(i);
    else if (ch in pairs) {
      if (!stack.length || s[stack.pop()] !== pairs[ch]) return i;
    }
  }
  return stack.length ? stack[0] : -1;
}
console.log(firstBadIndex("({[]})")); // -1
console.log(firstBadIndex("([)]"));   // 2
console.log(firstBadIndex("(("));     // 0  (never closed)
console.log(firstBadIndex("a)"));     // 1
function minAddToMakeValid(s) {
  let open = 0, add = 0;
  for (const ch of s) {
    if (ch === "(") open++;
    else if (open > 0) open--;
    else add++;
  }
  return add + open;
}
console.log(minAddToMakeValid("())("));  // 2
console.log(minAddToMakeValid("((("));   // 3
console.log(minAddToMakeValid("()"));    // 0
// firstBadIndex: O(n) time, O(n) space; minAdd: O(n) time, O(1) space (one kind of bracket needs only a counter)`
        },
        {
          cmd: "min stack",
          title: "stack بيرجّع أصغر رقم فيه في أي لحظة في O(1)",
          desc: R`جنب الـ stack الأساسي، stack تاني [[mins]] كل خانة فيه = أصغر رقم من أول الـ stack لحد الخانة دي. مع كل push تحط الأصغر بين الجديد وآخر خانة في [[mins]]، ومع كل pop تشيل من الاتنين. [[getMin]] = اللي فوق [[mins]]. كل العمليات [[O(1)]].

الحل البديهي تدوّر على الأصغر بـ loop مع كل [[getMin]]: [[O(n)]]. أو تخزّن الأصغر في متغير واحد، بس لما تعمل pop للأصغر نفسه، مش هتعرف مين اللي بعده.

الـ stack التاني بيحفظ «التاريخ»: لكل ارتفاع للـ stack، الأصغر كان مين.`,
          example: R`class MinStack {
  constructor() { this.items = []; this.mins = []; }
  push(x) {
    this.items.push(x);
    this.mins.push(this.mins.length ? Math.min(x, this.mins.at(-1)) : x);
  }
  pop() { this.mins.pop(); return this.items.pop(); }
  getMin() { return this.mins.at(-1); }
}
const st = new MinStack();
st.push(5); st.push(2); st.push(7); st.push(1);
console.log(st.getMin());           // 1
console.log(st.pop(), st.getMin()); // 1 2
console.log(st.pop(), st.getMin()); // 7 2
// push, pop and getMin are all O(1) time; O(n) extra space for mins`,
          try: R`ضيف [[top()]] و [[size]]. وبعدين حل النسخة الموفّرة: خزّن في mins بس لما الجديد ≤ الأصغر الحالي، وفي pop شيل من mins بس لو العنصر اللي خارج = الأصغر. ليه لازم ≤ مش <؟ (جرّب push 2 و push 2 و pop).`,
          flag: "script",
          deep: {
            why: "سؤال بيختبر إزاي تصمّم data structure بعمليات O(1) بإنك تدفع ذاكرة. ونفس الفكرة («خزّن معلومة زيادة مع كل عنصر») بتتكرر كتير: max stack، و undo بحالة كاملة، وقوايم بتحفظ المجموع لحد كل عنصر.",
            how: R`dry run: push 5 و 2 و 7 و 1:

push 5: items [5]، و mins [5]. push 2: items [5, 2]، و mins [5, 2]. push 7: الأصغر بين 7 و 2 هو 2، و mins [5, 2, 2]. push 1: mins [5, 2, 2, 1].

getMin: آخر خانة = 1.

pop: شلنا 1 من items و 1 من mins. دلوقتي آخر خانة في mins = 2، وده فعلًا أصغر رقم في [5, 2, 7].

pop تاني: شلنا 7 من items و 2 (الخانة التالتة) من mins. آخر خانة 2، وده الأصغر في [5, 2].

الخانة i في mins بتجاوب «لو الـ stack ارتفاعه i + 1، الأصغر مين؟». وبما إن الـ stack بيتغير من فوق بس، الإجابة دي عمرها ما بتتغير لما تضيف أو تشيل فوقها.

الذاكرة [[O(n)]] زيادة. النسخة الموفّرة بتخزّن في mins بس لما الأصغر يتغير، بس أسوأ حالة (أرقام نازلة) برضه [[O(n)]].`,
            when: "أي data structure مطلوب منها «الأصغر أو الأكبر لحد دلوقتي» مع إضافة وحذف من ناحية واحدة. وفي الانترفيو: أي «صمّم class عملياته O(1)».",
            mistakes: R`إنك تخزّن الأصغر في متغير واحد وتنسى إنه لما يتشال مش هتعرف اللي بعده. وفي النسخة الموفّرة إنك تستخدم [[<]] بدل [[<=]]: لو الأصغر اتضاف مرتين وشلت واحدة، هتشيله من mins وهو لسه موجود. وإنك تنسى تعمل pop من mins مع كل pop. و [[getMin]] على stack فاضي: اتفق مع الانترفيوير هترجّع إيه (undefined أو error).`
          },
          lines: [
            "stack عادي ومعاه أصغر رقم في O(1).",
            "اتنين array: العناصر، والأصغر عند كل ارتفاع.",
            "إضافة.",
            "حط العنصر.",
            "الأصغر الجديد = الأصغر بين x وآخر خانة في mins (أو x لو الـ stack كان فاضي).",
            "قفلة.",
            "شيل من الاتنين مع بعض عشان يفضلوا متزامنين، ورجّع العنصر.",
            "الأصغر = آخر خانة في mins.",
            "قفلة الـ class.",
            "stack جديد.",
            "items بقت [5, 2, 7, 1]، و mins بقت [5, 2, 2, 1].",
            "الأصغر 1.",
            "شلنا 1، فرجع الأصغر 2.",
            "شلنا 7، والأصغر لسه 2."
          ],
          sol: R`[[top()]] هي [[this.items.at(-1)]]، و [[size]] getter بيرجّع [[this.items.length]]. بعد push 5 و 2 و 7 و 2، [[mins]] بتبقى [[[5, 2, 2]]] بس، والـ 7 مش متخزنة لأنها مش أصغر.

ليه [[<=]]؟ لو استخدمت [[<]]، الـ 2 التانية مش هتتخزن في mins، فتبقى [[[5, 2]]]. أول pop بيطلّع 2، وبما إنه = الأصغر، بيشيل الـ 2 الوحيدة من mins. فـ getMin هترجع 5 مع إن فيه 2 لسه في الـ stack. مع [[<=]] الإجابة الصح 2. كل العمليات [[O(1)]].

الغلطة المشهورة: تفتكر إن النسخة دي بتوفّر دايمًا. في input نازل (5، 4، 3، ...) كل عنصر بيتخزن مرتين، فأسوأ حالة [[O(n)]] space زي الأولى.`,
          solCode: R`class MinStack {
  constructor() { this.items = []; this.mins = []; }
  push(x) {
    this.items.push(x);
    if (!this.mins.length || x <= this.mins.at(-1)) this.mins.push(x);
  }
  pop() {
    const x = this.items.pop();
    if (x === this.mins.at(-1)) this.mins.pop();
    return x;
  }
  top() { return this.items.at(-1); }
  get size() { return this.items.length; }
  getMin() { return this.mins.at(-1); }
}
const st = new MinStack();
st.push(5); st.push(2); st.push(7); st.push(2);
console.log(st.top(), st.size, st.getMin(), st.mins); // 2 4 2 [5, 2, 2]
st.pop();
console.log(st.getMin()); // 2  (with < instead of <=, mins would be [5, 2], the pop removes that 2, and this prints 5)
st.pop(); st.pop();
console.log(st.getMin(), st.size); // 5 1
// all operations O(1); mins holds only the new records, O(n) in the worst case (a decreasing input)`
        },
        {
          cmd: "monotonic stack",
          title: "لكل رقم في الـ array، أول رقم أكبر منه على يمينه",
          desc: R`امشي من الشمال لليمين ومعاك stack فيه indexes لسه «مستنية» حد أكبر منها. لما ييجي رقم جديد، طول ما هو أكبر من اللي فوق الـ stack، يبقى هو الإجابة بتاعته: اعمل pop وسجّل. وبعدين حط الجديد. [[O(n)]].

الـ stack ده قيمه دايمًا نازلة من تحت لفوق (monotonic)، لأن أي رقم أصغر من الجديد بيتشال قبل ما الجديد يتحط.

ليه [[O(n)]] مع إن فيه while جوه for؟ لأن كل index بيدخل الـ stack مرة ويطلع مرة بالكتير. المجموع 2n عملية.`,
          example: R`function nextGreater(a) {
  const res = new Array(a.length).fill(-1);
  const stack = [];
  for (let i = 0; i < a.length; i++) {
    while (stack.length && a[stack.at(-1)] < a[i]) {
      res[stack.pop()] = a[i];
    }
    stack.push(i);
  }
  return res;
}
console.log(nextGreater([2, 1, 2, 4, 3])); // [4, 2, 4, -1, -1]
console.log(nextGreater([5, 4, 3]));       // [-1, -1, -1]
console.log(nextGreater([]));              // []
// O(n) time (every index is pushed and popped at most once), O(n) space`,
          try: R`حل daily temperatures: لكل يوم، كام يوم لحد ما الحرارة تبقى أعلى؟ [73, 74, 75, 71, 69, 72, 76, 73] ترجع [1, 1, 4, 2, 1, 1, 0, 0]. (نفس الكود، بس سجّل الفرق بين الـ indexes بدل القيمة، والافتراضي 0).`,
          flag: "script",
          deep: {
            why: "الـ monotonic stack بيحل عيلة كاملة من المسائل في O(n) بدل O(n^2): أول أكبر أو أصغر على اليمين أو الشمال، وأيام لحد درجة حرارة أعلى، وأكبر مستطيل في histogram، و stock span. الحل البديهي لكل عنصر بيدوّر على يمينه: O(n^2).",
            how: R`dry run على [2, 1, 2, 4, 3]:

i = 0 (2): الـ stack فاضي. حط 0.

i = 1 (1): اللي فوق قيمته 2، و 1 مش أكبر. حط 1. الـ stack فيه 0 و 1 (قيمهم 2 و 1، نازلة).

i = 2 (2): اللي فوق (index 1) قيمته 1 أصغر من 2: إجابته 2، pop. اللي فوق دلوقتي (index 0) قيمته 2، مش أصغر من 2. حط 2.

i = 3 (4): index 2 قيمته 2 أصغر: إجابته 4. و index 0 قيمته 2 أصغر: إجابته 4. الـ stack فضي، حط 3.

i = 4 (3): اللي فوق قيمته 4، مش أصغر. حط 4. خلصنا، و index 3 و 4 فضلوا بـ -1.

ليه نخزّن indexes مش قيم؟ عشان نعرف نكتب الإجابة فين في res، ولو المطلوب مسافة (daily temperatures) نحسبها من الـ index.

لو المطلوب «أول أصغر»، اعكس المقارنة. ولو «على الشمال»، امشي من اليمين للشمال. ولو الـ array دايرية (circular)، لف مرتين واستخدم [[i % n]].`,
            when: "أي «أول عنصر أكبر أو أصغر من ده» أو «لحد إمتى القيمة دي هتفضل الأكبر». ولما تلاقي نفسك بتكتب loop جوه loop بيدوّر على اليمين لحد ما يلاقي حاجة أكبر.",
            mistakes: R`إنك تخزّن القيم بدل الـ indexes فمتعرفش تسجّل الإجابة فين. وإنك تستخدم [[<=]] بدل [[<]] من غير ما تفكر: مع أرقام متساوية ده بيغيّر المعنى بين «أكبر» و «أكبر أو يساوي». وإنك تقول الـ Big-O [[O(n^2)]] بسبب الـ while جوه الـ for: عدّ العمليات على كل عنصر، مش شكل الـ loops.`
          },
          lines: [
            "لكل عنصر: أول عنصر أكبر منه على يمينه، أو -1.",
            "الإجابات، وافتراضيًا -1 (مفيش أكبر).",
            "indexes مستنية إجابة. قيمها نازلة من تحت لفوق.",
            "عدّي من الشمال لليمين.",
            "طول ما الجديد أكبر من اللي فوق...",
            "...يبقى الجديد هو الإجابة بتاعته. شيله وسجّل.",
            "قفلة الـ while.",
            "الجديد نفسه مستني حد أكبر منه.",
            "قفلة الـ for.",
            "اللي فضلوا في الـ stack ملهمش أكبر، وقيمتهم -1 من الأول.",
            "قفلة.",
            "2 ← 4، و 1 ← 2، و 2 ← 4، و 4 و 3 مفيش.",
            "نازلة: ولا واحد ليه أكبر على يمينه.",
            "فاضية."
          ],
          sol: R`الناتج [[[1, 1, 4, 2, 1, 1, 0, 0]]]. التعديل: الافتراضي [[fill(0)]]، ولما تعمل pop للـ index [[j]]، سجّل [[res[j] = i - j]] بدل [[a[i]]]. الـ 75 مثلًا (index 2) فضلت في الـ stack لحد 76 (index 6)، فالإجابة 4.

الحل [[O(n)]] time لأن كل index بيدخل الـ stack مرة ويخرج مرة، و [[O(n)]] space. ودرجات متساوية زي [30, 30, 30] ترجع أصفار، لأن الشرط [[<]] مش [[<=]] («أعلى» مش «أعلى أو زي»).

الغلطة المشهورة: تخزّن القيم في الـ stack مش الـ indexes. كده مش هتعرف تحسب المسافة، ومش هتعرف تكتب في [[res]] مكان مين.`,
          solCode: R`function dailyTemperatures(t) {
  const res = new Array(t.length).fill(0);
  const stack = [];
  for (let i = 0; i < t.length; i++) {
    while (stack.length && t[stack.at(-1)] < t[i]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]).join(" ")); // 1 1 4 2 1 1 0 0
console.log(dailyTemperatures([30, 30, 30]).join(" "));                     // 0 0 0
// O(n) time (each index is pushed and popped once), O(n) space`
        },
        {
          cmd: "queue و deque",
          title: "طابور أول واحد يدخل أول واحد يطلع، سريع في JS (وليه shift بطيء؟)",
          desc: R`[[shift()]] بتشيل أول عنصر وبتحرّك كل الباقي خطوة لورا، فهي [[O(n)]]. طابور بـ push و shift على مئات الآلاف من العناصر بيبقى [[O(n^2)]]. الحل: خزّن العناصر في object ومعاك رقمين، [[head]] و [[tail]]. الإضافة عند tail والطلوع من head، الاتنين [[O(1)]].

الـ queue هو FIFO (First In, First Out)، وده اللي بيحتاجه BFS، وطوابير الـ jobs، و rate limiting.

والـ deque (double-ended queue) بتضيف وتشيل من الناحيتين. نفس فكرة head و tail، بس head ينفع ينزل بالسالب. و JS مفيهاش queue أو deque جاهزين.`,
          example: R`class Queue {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  enqueue(x) { this.items[this.tail++] = x; }
  dequeue() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  get size() { return this.tail - this.head; }
}
const q = new Queue();
q.enqueue("a"); q.enqueue("b"); q.enqueue("c");
console.log(q.dequeue(), q.dequeue(), q.size); // a b 1
// enqueue and dequeue are O(1); Array.prototype.shift is O(n) because every item moves down one index`,
          try: R`قيس الفرق: ١٠٠ ألف عنصر بـ push و shift، وبعدين بالـ Queue دي، بـ [[console.time]]. وبعدين حوّلها deque: ضيف [[pushFront]] (بتقلّل head وتكتب فيه) و [[popBack]].`,
          flag: "script",
          deep: {
            why: "BFS، وطابور مهام (إيميلات بتتبعت واحد واحد)، و sliding window maximum، كلهم queue. ولو كتبته بـ shift الكود هيشتغل في التجربة ويبقى بطيء جدًا على بيانات حقيقية. قياس على Node 24: تفضية array فيها ١٠٠ ألف عنصر بـ shift خدت حوالي نص ثانية، و ٤٠٠ ألف خدت أكتر من ٤٠ ثانية. ده شكل O(n^2).",
            how: R`ليه shift بطيء؟ الـ array بلوك متصل، والعنصر رقم i لازم يبقى في الخانة i. لما تشيل الأول، كل عنصر لازم يتنقل خانة لورا عشان الـ indexes تفضل صح. ده n عملية. V8 عنده تحسينات في حالات معينة، بس القياس فوق بيقول إن الطابور الكبير بـ shift بيبقى [[O(n^2)]] فعلًا.

الحل بالـ head و tail: العناصر مبتتحركش أبدًا. «أول الطابور» مجرد رقم بيزيد. الـ object هنا شغال كأنه Map من رقم لقيمة، و [[delete]] بيسيب الذاكرة تتحرر.

بديل أبسط في BFS: array عادية ومتغير [[head]] بيزيد، من غير ما تشيل حاجة: [[const x = queue[head++]]]. العيب إن الذاكرة مبتتحررش لحد ما الـ BFS يخلص، وده عادي في مسائل الانترفيو.

وبديل تاني: circular buffer، array بحجم ثابت والمؤشرات بتلف بـ [[% capacity]]. ده اللي بتستخدمه المكتبات لما الحجم معروف.

الـ deque: نفس الـ object، بس [[pushFront]] بتكتب في [[--this.head]]، والـ head ينفع يبقى سالب عادي لأن مفاتيح الـ object أي رقم. و [[popBack]] بتقرا من [[--this.tail]].`,
            when: "BFS على شجرة أو graph أو grid. أي طابور طلبات أو رسايل بيتعالج بالترتيب. و deque في sliding window maximum ومسائل «الأكبر في كل شباك».",
            mistakes: R`[[shift()]] في BFS على بيانات كبيرة. وإنك تفتكر إن [[unshift]] أحسن: نفس المشكلة من الناحية التانية. وإنك تنسى check الفاضي في dequeue فترجّع undefined وتكمّل كأن فيه عنصر. وفي النسخة بالـ array والـ head من غير مسح: الذاكرة بتفضل محجوزة لكل اللي خرجوا، مش مشكلة في BFS بس مشكلة في طابور شغال على طول في سيرفر.`
          },
          lines: [
            "طابور FIFO.",
            "object للعناصر، و head أول واحد، و tail مكان الإضافة الجاية.",
            "إضافة في الآخر: خانة جديدة و tail يزيد. O(1).",
            "طلوع من الأول.",
            "فاضي: head لحق tail.",
            "أول عنصر.",
            "امسحه عشان الذاكرة، وقدّم head. محدش اتحرك من مكانه.",
            "رجّعه.",
            "قفلة.",
            "العدد = الفرق بين المؤشرين.",
            "قفلة الـ class.",
            "طابور جديد.",
            "تلاتة دخلوا بالترتيب.",
            "أول اتنين خرجوا بنفس الترتيب، وفاضل واحد."
          ],
          sol: R`على ١٠٠ ألف عنصر: [[push]] + [[shift]] أخدت حوالي 900ms عندي، والـ Queue حوالي 20ms. أرقامك هتختلف، بس الفرق كبير لأن [[shift]] ممكن تحرّك كل العناصر خطوة لورا.

الـ deque: [[pushFront(x)]] بتعمل [[this.items[--this.head] = x]] (الـ head ممكن ينزل تحت الصفر، ومفيش مشكلة لأن الـ keys في object). و [[popBack()]] بتعمل [[--this.tail]] وتقرا وتمسح. الأربع عمليات [[O(1)]]. مثال: pushBack b، pushFront a، pushBack c، وبعدين popFront و popBack و popBack يطلّعوا [[a c b]].

الغلطة المشهورة: [[this.items[this.head--] = x]] بدل [[--this.head]]. كده بتكتب فوق أول عنصر موجود، لأن الـ head لسه بيشاور عليه.`,
          solCode: R`class Deque {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  pushBack(x) { this.items[this.tail++] = x; }
  pushFront(x) { this.items[--this.head] = x; }
  popFront() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  popBack() {
    if (this.head === this.tail) return undefined;
    const x = this.items[--this.tail];
    delete this.items[this.tail];
    return x;
  }
  get size() { return this.tail - this.head; }
}
const N = 100_000;
console.time("shift");
const arr = [];
for (let i = 0; i < N; i++) arr.push(i);
let s1 = 0;
while (arr.length) s1 += arr.shift();
console.timeEnd("shift"); // shift: around 900ms on node 22 (varies)
console.time("queue");
const q = new Deque();
for (let i = 0; i < N; i++) q.pushBack(i);
let s2 = 0;
while (q.size) s2 += q.popFront();
console.timeEnd("queue"); // queue: around 20ms
console.log(s1 === s2); // true
const d = new Deque();
d.pushBack("b"); d.pushFront("a"); d.pushBack("c");
console.log(d.popFront(), d.popBack(), d.popBack(), d.size); // a c b 0
// all four operations O(1); head can go negative, which is fine for object keys`
        }
      ]
    },
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
          try: R`اكتبها recursive بـ [[(a, target, lo, hi)]]، وقول الـ space complexity بتاعتها. وبعدين دوّر في array مترتبة واتلفّت زي [4, 5, 6, 7, 0, 1, 2] في O(log n): في كل خطوة، نص واحد على الأقل مترتب.`,
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
// bsRec: O(log n) time, O(log n) stack space; searchRotated: O(log n) time, O(1) space (distinct values)`
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
          try: R`اكتب [[upperBound]] (أول مكان قيمته > x) بتغيير علامة واحدة، واستخدمها بدل [[x + 1]] عشان تشتغل مع أرقام عشرية و strings. وبعدين: عدد مرات ظهور x = [[upperBound - lowerBound]].`,
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
// O(log n) time, O(1) space`
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
          try: R`استخدمها عشان تضيف رقم لـ array مترتبة: [[a.splice(searchInsert(a, x), 0, x)]]. البحث [[O(log n)]]، بس الإضافة نفسها Big-O بتاعتها إيه؟ (O(n)، لأن splice بتحرّك اللي بعدها).`,
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
// n inserts = O(n^2) in the worst case: to build a big sorted array, push everything then sort once (O(n log n))`
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
          try: R`حل «ship within D days»: أوزان طرود بالترتيب، وأقل حمولة للمركب تشحنهم كلهم في D أيام (كل يوم بتشحن طرود ورا بعض لحد ما الحمولة تتملي). الأوزان من 1 لـ 10 و D = 5 الإجابة 15. المدى هنا من أتقل طرد لمجموع الكل.`,
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
// O(n log S) time (S = sum of weights), O(1) space`
        }
      ]
    },
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
          try: R`اكتب دمج اتنين array مترتبين لوحده، ده سؤال انترفيو لوحده. وبعدين عدّ الـ inversions: كام زوج (i < j) العنصر الأول فيه أكبر من التاني؟ عدّل الدمج: كل ما تاخد من اليمين، زوّد العدّاد بعدد العناصر الفاضلة في الشمال.`,
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
// merge: O(n + m); inversions: O(n log n) time, O(n) space (brute force over pairs = O(n^2))`
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
          try: R`رتّب منتجات: المتاح الأول ([[inStock]] true)، وبعدين السعر تصاعدي، وبعدين الاسم. وبعدين جرّب comparator غلط [[(a, b) => a > b]] على [3, 1, 2]: هترجع زي ما هي من غير ترتيب.`,
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
// O(n log n) comparisons, each O(1) here; toSorted makes an O(n) copy`
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
          try: R`اكتبها recursive: اقلب الباقي من [[head.next]]، وبعدين خلّي [[head.next.next = head]] و [[head.next = null]]. وقول الـ space. وبعدين اقلب جزء بس من الـ list من المكان m لـ n.`,
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
// reverseRec: O(n) time, O(n) call stack; reverseBetween: O(n) time, O(1) space (1-based m and n)`
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
          try: R`اكتب [[middleNode(head)]] بنفس الفكرة: لما الـ fast يخلص، الـ slow في النص. وبعدين (أصعب): رجّع أول node في الدايرة. بعد ما يتقابلوا، رجّع مؤشر للـ head وحرّك الاتنين خطوة خطوة، هيتقابلوا عند بداية الدايرة.`,
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
// both: O(n) time, O(1) space`
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
          try: R`ادمج k lists مترتبين. جرّب الأول تدمجهم واحدة واحدة (الـ Big-O كام؟)، وبعدين بالتقسيم: ادمجهم اتنين اتنين زي merge sort، أو بـ min heap (درس «merge k sorted lists» في المستوى التالت).`,
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
// pairs: O(N log k) time (log k rounds, each touches all N nodes), O(k) space for the array of heads`
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
          try: R`حل insert interval: عندك فترات مترتبة ومش متداخلة، ضيف فترة جديدة وادمج اللي لازم يتدمج، في O(n) من غير sort. وبعدين: «أقل عدد قاعات اجتماعات» لمواعيد متداخلة (رتّب البدايات لوحدها والنهايات لوحدها وامشي بمؤشرين).`,
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
// insert: O(n) time and O(n) output; rooms: O(n log n) time for the sorts, O(n) space`
        }
      ]
    },
    {
      t: "trees",
      l: 3,
      n: "كل عقدة جواها شجرة أصغر: DFS و BFS، و max depth، و BST، و LCA، والمشي على JSON متداخل",
      items: [
        {
          cmd: "tree DFS (pre/in/post)",
          title: "إزاي تزور كل عقدة في الشجرة، وإيه الفرق بين pre و in و post order؟",
          desc: R`الـ binary tree: كل عقدة (node) فيها قيمة وابنين بالكتير: [[left]] و [[right]]. العقدة اللي فوق خالص اسمها root، واللي ملهاش أولاد اسمها leaf.

DFS (depth-first search) معناها «انزل لآخر فرع وبعدين ارجع». أسهل طريقة ليها recursion، لأن كل ابن هو شجرة كاملة لوحده (زي ما شفنا في درس «recursion (base case)»).

الفرق بين الـ ٣ أنواع هو إمتى بتسجّل العقدة نفسها بالنسبة لأولادها:

pre-order: العقدة الأول، وبعدين الشمال، وبعدين اليمين. مفيد لو عايز تنسخ الشجرة أو تطبعها زي شجرة الفولدرات.

in-order: الشمال، وبعدين العقدة، وبعدين اليمين. في BST بيطلّع القيم مترتبة.

post-order: الأولاد الأول وبعدين العقدة. مفيد لما العقدة محتاجة نتيجة أولادها: حجم فولدر = مجموع أحجام اللي جواه، أو مسح شجرة من تحت لفوق.`,
          example: R`class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
//        4
//      /   \
//     2     6
//    / \   / \
//   1   3 5   7
const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7)));
function dfs(node, order, out = []) {
  if (!node) return out;
  if (order === "pre") out.push(node.val);
  dfs(node.left, order, out);
  if (order === "in") out.push(node.val);
  dfs(node.right, order, out);
  if (order === "post") out.push(node.val);
  return out;
}
console.log(dfs(root, "pre").join(" "));  // 4 2 1 3 6 5 7
console.log(dfs(root, "in").join(" "));   // 1 2 3 4 5 6 7
console.log(dfs(root, "post").join(" ")); // 1 3 2 5 7 6 4
// O(n) time (every node once), O(h) space for the call stack (h = height of the tree)`,
          try: R`اكتب [[inorderIter]] و [[preorderIter]] من غير recursion: stack انت اللي ماسكه بـ [[push]] و [[pop]]. لازم يطلّعوا نفس ناتج [[dfs]] بالظبط، وجرّبهم على شجرة فاضية ([[null]]) لازم ترجّع [[[]]].`,
          sol: R`الناتج المتوقع: [[1 2 3 4 5 6 7]] للـ in-order، و [[4 2 1 3 6 5 7]] للـ pre-order، و [[[]]] للشجرة الفاضية.

in-order: انزل شمال لآخره وانت بتحط كل عقدة في الـ stack. لما توصل null، اعمل [[pop]]، سجّل القيمة، وروح يمين العقدة دي وكرر. الشرط [[while (cur || stack.length)]] لازم يبقى الاتنين: ممكن الـ stack يفضى وإنت لسه عندك فرع يمين.

pre-order: حط الـ root في الـ stack. كل مرة [[pop]] وسجّل، وبعدين [[push]] اليمين الأول وبعده الشمال، عشان الشمال يطلع الأول (الـ stack آخر داخل أول خارج).

الغلطة المشهورة: تعمل [[push]] للشمال قبل اليمين، فيطلع [[4 6 7 5 2 3 1]]، وده pre-order معكوس (يمين قبل شمال).`,
          solCode: R`class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(6, new TreeNode(5), new TreeNode(7)));
function inorderIter(root) {
  const out = [], stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}
function preorderIter(root) {
  if (!root) return [];
  const out = [], stack = [root];
  while (stack.length) {
    const node = stack.pop();
    out.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return out;
}
console.log(inorderIter(root).join(" "));  // 1 2 3 4 5 6 7
console.log(preorderIter(root).join(" ")); // 4 2 1 3 6 5 7
console.log(inorderIter(null), preorderIter(null)); // [] []
// both: O(n) time, O(h) extra space for the stack`,
          flag: "script",
          deep: {
            why: "الشجرة في كل حتة في الشغل: الـ DOM، وشجرة الفولدرات، و JSON متداخل، والكومنتات والردود، والـ menus اللي جواها menus، والـ AST اللي ESLint و Prettier و Babel بيشتغلوا عليه. وفي الانترفيو، مسائل الـ trees من أكتر حاجة بتتسأل، وكلها تقريبًا DFS أو BFS بتعديل بسيط.",
            how: R`dry run للـ in-order على الشجرة اللي في المثال: [[dfs(4)]] بتنادي [[dfs(2)]] الأول، واللي بتنادي [[dfs(1)]]. العقدة 1 ملهاش شمال (null بترجع على طول)، فتسجّل 1، وملهاش يمين. نرجع لـ 2: نسجّل 2، وننزل يمين لـ 3. نرجع لـ 4: نسجّل 4، وننزل يمين... النتيجة 1 2 3 4 5 6 7.

ليه [[out]] بتتبعت مع النداءات؟ عشان كل النداءات تضيف في نفس الـ array. لو كل نداء عمل array جديدة ورجّعها، هتحتاج تدمجهم ([[concat]] أو spread) وده بيكلّف نسخ زيادة.

الذاكرة [[O(h)]]: الـ call stack فيه في أي لحظة المسار من الـ root للعقدة الحالية بس. في شجرة متوازنة h حوالي [[log n]]، لكن في شجرة شكلها خط (كل عقدة ليها ابن يمين بس) h = n. وفي JavaScript الـ stack بيخلص بعد حوالي ١٠ آلاف مستوى وبيطلع [[RangeError: Maximum call stack size exceeded]]، ودا سبب إنك لازم تعرف النسخة اللي بـ stack صريح (الـ try).

الـ constructor بيدّي [[null]] كقيمة default للأولاد، فـ [[new TreeNode(1)]] leaf. ومن الدرس الجاي هنستخدم دالة صغيرة [[node(val, left, right)]] بترجّع object بنفس الشكل، عشان الأمثلة تبقى أقصر.`,
            when: "pre-order: نسخ الشجرة، أو serialize (تحويلها لنص وترجيعها)، أو طباعتها بالـ indentation. in-order: أي حاجة على BST محتاجة ترتيب (kth smallest، validate). post-order: لما العقدة محتاجة نتايج أولادها الأول: الارتفاع، والحجم، ومسح شجرة، وحساب مجموع فولدر. ولو المسألة بتقول «مستوى مستوى» أو «أقرب»، ده BFS مش DFS (الدرس الجاي).",
            mistakes: R`إنك تنسى الـ base case [[if (!node)]] فتقرا [[.left]] من null. وإنك تعمل [[return dfs(node.left)]] فتقفل قبل ما تروح يمين. وإنك تخلط بين الأنواع في الانترفيو: اتعلّم الجملة «pre = قبل الأولاد، in = بينهم، post = بعدهم». وسؤال انترفيو مشهور: «إيه اللي يحصل لو الشجرة عمقها مليون؟»، الإجابة stack overflow في النسخة الـ recursive، والحل stack صريح في heap memory.`
          },
          lines: [
            "كل عقدة في الشجرة object من الـ class ده.",
            "القيمة والابنين، والأولاد null لو مش موجودين.",
            "نخزّن التلاتة في العقدة.",
            "قفلة الـ constructor.",
            "قفلة الـ class.",
            "نبني الشجرة اللي في الرسمة: الـ root قيمته 4.",
            "الفرع الشمال: 2 وتحتها 1 و 3.",
            "الفرع اليمين: 6 وتحتها 5 و 7.",
            "دالة واحدة للـ ٣ أنواع، والـ order بيحدد إمتى نسجّل.",
            "base case: فرع فاضي، ارجع من غير ما تعمل حاجة.",
            "pre: سجّل العقدة قبل أولادها.",
            "انزل الشمال كله.",
            "in: سجّل بين الشمال واليمين.",
            "انزل اليمين كله.",
            "post: سجّل بعد الأولاد.",
            "رجّع نفس الـ array اللي بتتملي.",
            "قفلة.",
            "pre-order: الـ root الأول.",
            "in-order: مترتبة لأن الشجرة دي BST.",
            "post-order: الـ root في الآخر."
          ]
        },
        {
          cmd: "BFS (level order)",
          title: "اطبع الشجرة مستوى مستوى: [[3]] وبعدين [[9, 20]] وبعدين [[15, 7]]",
          desc: R`BFS (breadth-first search) بيزور العقد بالمستوى: الـ root، وبعدين كل أولاده، وبعدين كل أحفاده. الأداة بتاعته queue: أول واحد يدخل أول واحد يطلع، عكس الـ stack اللي بيعمله DFS.

الفكرة هنا: خلّي الـ queue فيها المستوى الحالي كله. سجّل قيمهم، وابني array للمستوى الجاي من أولادهم، وكرر لحد ما المستوى يفضى.

ليه مش [[queue.shift()]]؟ لأن [[shift]] في JavaScript بتزق كل العناصر خانة، فبتبقى [[O(n)]] في كل مرة (شرحناها في درس «queue و deque»). بناء array جديدة لكل مستوى بيخلّي كل عقدة تدخل وتطلع مرة واحدة.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
//      3
//     / \
//    9   20
//       /  \
//      15   7
const root = node(3, node(9), node(20, node(15), node(7)));
function levelOrder(root) {
  if (!root) return [];
  const levels = [];
  let queue = [root];
  while (queue.length) {
    levels.push(queue.map(n => n.val));
    const next = [];
    for (const n of queue) {
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    queue = next;
  }
  return levels;
}
console.log(levelOrder(root)); // [[3], [9, 20], [15, 7]]
console.log(levelOrder(node(1))); // [[1]]
console.log(levelOrder(null)); // []
// O(n) time, O(w) space where w = the widest level (up to n/2 in a full tree)`,
          try: R`حل «Binary Tree Right Side View»: لو واقف على يمين الشجرة، هتشوف أنهي قيم؟ (آخر عقدة في كل مستوى). جرّبه على الشجرة [[node(1, node(2, null, node(5)), node(3, null, node(4)))]]، والمفروض يطلع [[[1, 3, 4]]]. وبعدين عدّل [[levelOrder]] يرجّع zigzag: مستوى شمال لليمين والجاي يمين للشمال.`,
          sol: R`right side view: نفس الـ loop، بس بدل ما تسجّل المستوى كله سجّل [[queue.at(-1).val]] (آخر عقدة). الناتج [[[1, 3, 4]]]: المستوى الأول 1، والتاني [2, 3] آخره 3، والتالت [5, 4] آخره 4.

الغلطة الشائعة: تمشي على الفروع اليمين بس (root.right.right...)، فتطلع [[[1, 3, 4]]] هنا بالصدفة، لكن لو الفرع اليمين أقصر من الشمال هتفوّت عقد باينة. جرّب [[node(1, node(2, node(4)), node(3))]]: الصح [[[1, 3, 4]]] لأن 4 باينة من اليمين رغم إنها في الشمال.

zigzag: اعمل flag بيتقلب كل مستوى، ولو true اعكس قيم المستوى قبل ما تسجّلها. الناتج للشجرة اللي في المثال [[[[3], [20, 9], [15, 7]]]].`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function rightSideView(root) {
  const out = [];
  let queue = root ? [root] : [];
  while (queue.length) {
    out.push(queue.at(-1).val);
    queue = queue.flatMap(n => [n.left, n.right].filter(Boolean));
  }
  return out;
}
function zigzag(root) {
  const out = [];
  let queue = root ? [root] : [], leftToRight = true;
  while (queue.length) {
    const vals = queue.map(n => n.val);
    out.push(leftToRight ? vals : vals.reverse());
    leftToRight = !leftToRight;
    queue = queue.flatMap(n => [n.left, n.right].filter(Boolean));
  }
  return out;
}
console.log(rightSideView(node(1, node(2, null, node(5)), node(3, null, node(4))))); // [1, 3, 4]
console.log(rightSideView(node(1, node(2, node(4)), node(3)))); // [1, 3, 4]
console.log(zigzag(node(3, node(9), node(20, node(15), node(7))))); // [[3], [20, 9], [15, 7]]
console.log(rightSideView(null)); // []
// O(n) time, O(w) space`,
          flag: "script",
          deep: {
            why: "BFS هو الطريقة الطبيعية لأي سؤال فيه «مستوى» أو «أقرب»: أقرب leaf للـ root، وعرض الشجرة في UI على شكل طبقات (org chart مثلًا)، وأقصر طريق في grid أو graph (هنشوفه في درس «shortest path in grid (BFS)»). ونفس الكود ده بالظبط هو اللي بيتعمل على الـ graphs بعد ما تضيف Set للعقد اللي اتزارت.",
            how: R`dry run: [[queue = [3]]]. سجّل [3]. الأولاد: 9 و 20، فـ [[queue = [9, 20]]].

سجّل [9, 20]. أولاد 9 مفيش، وأولاد 20 هما 15 و 7، فـ [[queue = [15, 7]]].

سجّل [15, 7]. مفيش أولاد، [[queue = []]]، والـ loop يقف.

ليه BFS بيلاقي «الأقرب» الأول؟ لأنه بيخلّص كل العقد اللي على مسافة 1 قبل أي عقدة على مسافة 2. فأول مرة تقابل الحاجة اللي بتدوّر عليها، دي أقرب واحدة أكيد. DFS ممكن ينزل فرع عميق جدًا الأول.

الذاكرة: DFS بياخد [[O(h)]] (طول المسار)، و BFS بياخد [[O(w)]] (عرض أوسع مستوى). في شجرة كاملة آخر مستوى فيه حوالي نص العقد، فـ BFS بياخد ذاكرة أكتر. في شجرة شكلها خط العكس.

ولو عايز queue حقيقية من غير array لكل مستوى: استخدم array ومؤشر [[head]] بيتقدّم بدل [[shift]]، زي ما هنعمل في الـ graphs.`,
            when: "BFS: «مستوى مستوى»، و «أقل عدد خطوات»، و «أقرب»، و «أول مستوى فيه كذا». DFS: «كل المسارات»، و «هل فيه مسار»، والحاجات اللي بتعتمد على نتيجة الأولاد. ولو الاتنين ينفعوا (زي عدّ العقد)، DFS كوده أقصر.",
            mistakes: R`[[queue.shift()]] في loop على مليون عقدة بتقلب الحل [[O(n^2)]]. وإنك تسجّل المستوى بعد ما تبدأ تضيف أولاده في نفس الـ array، فالمستويات تتخلط؛ عشان كده بنبني [[next]] لوحدها (أو نحفظ [[queue.length]] قبل الـ loop الداخلي). وإنك تنسى [[if (!root) return []]] فتحط null في الـ queue وتقرا [[null.val]].`
          },
          lines: [
            "دالة صغيرة بتعمل عقدة: object فيه القيمة والابنين.",
            "نفس الشجرة اللي في الرسمة.",
            "BFS بترجّع array فيها array لكل مستوى.",
            "شجرة فاضية: مفيش مستويات.",
            "الناتج.",
            "الـ queue فيها المستوى الحالي، وأول مستوى هو الـ root لوحده.",
            "طول ما فيه مستوى نشتغل عليه.",
            "سجّل قيم المستوى ده كله.",
            "هنا هنجمّع المستوى الجاي.",
            "عدّي على كل عقدة في المستوى الحالي.",
            "ضيف ابنها الشمال لو موجود.",
            "وبعده اليمين، عشان الترتيب يفضل من الشمال لليمين.",
            "قفلة الـ for.",
            "المستوى الجاي بقى هو الحالي.",
            "قفلة الـ while.",
            "رجّع كل المستويات.",
            "قفلة.",
            "٣ مستويات.",
            "عقدة واحدة: مستوى واحد.",
            "فاضية."
          ]
        },
        {
          cmd: "max depth",
          title: "الشجرة عمقها كام؟ وليه min depth فيها فخ؟",
          desc: R`max depth = عدد العقد في أطول مسار من الـ root لأي leaf. الحل سطر واحد بالـ recursion: عمق شجرة = 1 + الأكبر بين عمق الشمال وعمق اليمين، والشجرة الفاضية عمقها 0.

ده post-order: العقدة مش بتعرف إجابتها غير لما أولادها يرجّعوا إجابتهم. ونفس الشكل ده بيحل مسائل كتير: عدد العقد، ومجموع القيم، والقطر (diameter)، وهل الشجرة متوازنة.

min depth شكلها نفس الحكاية بـ [[Math.min]]، بس فيها فخ: لو العقدة ليها ابن واحد بس، الفرع الفاضي عمقه 0، و [[Math.min]] هتختاره. لكن الفرع الفاضي مش leaf، فالمسار ده مش مسار أصلًا. لازم تتعامل مع حالة الابن الواحد لوحدها.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
const root = node(3, node(9), node(20, node(15), node(7)));
const maxDepth = n => (n ? 1 + Math.max(maxDepth(n.left), maxDepth(n.right)) : 0);
function minDepth(n) {
  if (!n) return 0;
  if (!n.left) return 1 + minDepth(n.right);
  if (!n.right) return 1 + minDepth(n.left);
  return 1 + Math.min(minDepth(n.left), minDepth(n.right));
}
const chain = node(1, null, node(2, null, node(3)));
const wrongMin = n => (n ? 1 + Math.min(wrongMin(n.left), wrongMin(n.right)) : 0);
console.log(maxDepth(root), minDepth(root)); // 3 2
console.log(maxDepth(chain), minDepth(chain)); // 3 3
console.log(wrongMin(chain)); // 1
console.log(maxDepth(null)); // 0
// O(n) time, O(h) stack: h is about log n if balanced, n if the tree is a chain`,
          try: R`حل «Diameter of Binary Tree»: أطول مسار بين أي عقدتين (بعدد الـ edges، ومش لازم يعدّي على الـ root). للشجرة [[node(1, node(2, node(4), node(5)), node(3))]] الإجابة 3 (من 4 لـ 2 لـ 1 لـ 3). وبعدين «Balanced Binary Tree»: الشجرة متوازنة لو فرق العمق بين الشمال واليمين عند كل عقدة ≤ 1.`,
          sol: R`diameter: عند كل عقدة، أطول مسار بيعدّي عليها = عمق الشمال + عمق اليمين. فاكتب دالة عمق عادية، وجوّاها حدّث متغير [[best]] بـ [[left + right]]. الإجابة 3 للشجرة اللي في السؤال، و 0 لعقدة لوحدها.

الغلطة الشائعة: ترجّع [[maxDepth(root.left) + maxDepth(root.right)]] للـ root بس. ده غلط لما أطول مسار يبقى كله جوه فرع واحد، زي فرع شمال عميق فيه فرعين طوال. وغلطة تانية: تنادي [[maxDepth]] من جوه loop على كل العقد فتبقى [[O(n^2)]] بدل [[O(n)]].

balanced: نفس الفكرة، الدالة ترجّع العمق، ولو لقت فرق أكبر من 1 ترجّع [[-1]] كإشارة إن الشجرة مش متوازنة وكل اللي فوقها يرجّع [[-1]] على طول. [[O(n)]] في لفة واحدة. السلسلة [[1 → 2 → 3]] مش متوازنة.`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function diameter(root) {
  let best = 0;
  const depth = n => {
    if (!n) return 0;
    const l = depth(n.left), r = depth(n.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  };
  depth(root);
  return best;
}
function isBalanced(root) {
  const height = n => {
    if (!n) return 0;
    const l = height(n.left), r = height(n.right);
    if (l === -1 || r === -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return height(root) !== -1;
}
console.log(diameter(node(1, node(2, node(4), node(5)), node(3)))); // 3
console.log(diameter(node(1))); // 0
console.log(isBalanced(node(3, node(9), node(20, node(15), node(7))))); // true
console.log(isBalanced(node(1, null, node(2, null, node(3))))); // false
// both O(n) time, O(h) stack`,
          flag: "script",
          deep: {
            why: "«الشجرة عمقها كام» سؤال بيتسأل في أول ٥ دقايق من انترفيو كتير عشان يشوفوا هل بتفكر recursive. وفي الشغل: عمق الـ nesting في JSON (فيه APIs بترفض body أعمق من حد معين عشان تحمي نفسها)، وعمق شجرة الكومنتات قبل ما تقرر تعرض «اعرض ردود أكتر».",
            how: R`اسأل نفسك سؤال واحد: «لو أولادي رجّعولي إجابتهم، أحسب إجابتي إزاي؟». عمق الشمال 1 (9 لوحدها) وعمق اليمين 2 (20 وتحتها 15)، فعمقي 1 + 2 = 3. وبعدين حدّد الـ base case: الفرع الفاضي عمقه 0.

فخ min depth على [[chain]] (1 وتحته 2 يمين وتحته 3 يمين): [[wrongMin]] عند 1 بتشوف الشمال null عمقه 0، و [[Math.min(0, ...)]] = 0، فترجّع 1. بس 1 مش leaf، ليها ابن. أقرب leaf هي 3 على عمق 3. عشان كده السطرين [[if (!n.left)]] و [[if (!n.right)]] بيقولوا: لو فيه ابن واحد بس، الإجابة لازم تعدّي عليه.

min depth ممكن تتحل بـ BFS أسرع: أول leaf تقابلها في BFS هي الأقرب، فتقف من غير ما تزور باقي الشجرة. في شجرة كبيرة فيها leaf قريبة ده فرق كبير.`,
            when: "أي خاصية للشجرة كلها بتتبني من خواص الفروع: العمق، والعدد، والمجموع، والتوازن، والقطر، و «Path Sum». لو الإجابة بتعتمد على اللي فوق (زي «المسار من الـ root لحد هنا»)، ابعت المعلومة نازلة كـ argument بدل ما ترجّعها طالعة.",
            mistakes: R`فخ min depth اللي فوق هو الأشهر. وإنك ترجّع 1 للشجرة الفاضية بدل 0. وإنك تخلط بين العمق بعدد العقد وبعدد الـ edges (LeetCode بيعدّ العقد في max depth، والـ edges في diameter)، فاسأل. وفي الانترفيو قول الـ space صح: [[O(h)]] مش [[O(1)]]، لأن الـ recursion بتاخد stack.`
          },
          lines: [
            "نفس دالة العقدة.",
            "شجرة عمقها 3 (3 ثم 20 ثم 15).",
            "العمق = 1 + الأعمق من الفرعين، والفاضي 0.",
            "min depth محتاجة شغل زيادة.",
            "فاضي: 0.",
            "مفيش شمال: المسار لازم يروح يمين.",
            "مفيش يمين: لازم يروح شمال.",
            "الاتنين موجودين: خد الأقصر.",
            "قفلة.",
            "سلسلة: 1 ثم 2 ثم 3، كلها يمين.",
            "النسخة الغلط اللي بتستخدم Math.min على طول.",
            "أقصى عمق 3، وأقرب leaf (9) على عمق 2.",
            "في السلسلة الاتنين 3، لأن فيه leaf واحدة بس.",
            "النسخة الغلط بتقول 1، لأنها اعتبرت الشمال الفاضي مسار.",
            "شجرة فاضية."
          ]
        },
        {
          cmd: "validate BST",
          title: "الشجرة دي BST ولا لأ؟ ليه مقارنة العقدة بأولادها مش كفاية؟",
          desc: R`BST (binary search tree): كل القيم في الفرع الشمال أصغر من العقدة، وكل القيم في الفرع اليمين أكبر منها. الشرط ده على الفرع كله، مش على الابن المباشر بس.

الحل الصح: كل عقدة ليها range مسموح [[(low, high)]]. الـ root مسموحلها أي حاجة. لما تنزل شمال، الحد الأعلى بقى قيمة العقدة. ولما تنزل يمين، الحد الأدنى بقى قيمة العقدة. لو أي عقدة طلعت برّا الـ range بتاعها، الشجرة مش BST.

الفخ: [[naive]] في المثال بتقارن كل عقدة بأولادها المباشرين بس. الشجرة [[trap]] فيها 4 في الفرع اليمين تحت 8: 4 أصغر من 8 فمقبولة كابن شمال، بس هي في يمين 5، فلازم تبقى أكبر من 5.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
function isValidBST(n, low = -Infinity, high = Infinity) {
  if (!n) return true;
  if (n.val <= low || n.val >= high) return false;
  return isValidBST(n.left, low, n.val) && isValidBST(n.right, n.val, high);
}
const naive = n => !n || ((!n.left || n.left.val < n.val) && (!n.right || n.right.val > n.val) && naive(n.left) && naive(n.right));
//     5              5
//    / \            / \
//   3   8          3   8
//  / \ / \            / \
// 2  4 7  9          4   9
const good = node(5, node(3, node(2), node(4)), node(8, node(7), node(9)));
const trap = node(5, node(3), node(8, node(4), node(9)));
console.log(isValidBST(good), isValidBST(trap)); // true false
console.log(naive(trap)); // true
console.log(isValidBST(node(2, node(2)))); // false
console.log(isValidBST(null)); // true
// O(n) time, O(h) space`,
          try: R`حلها بطريقة تانية: in-order traversal لـ BST لازم يطلّع قيم متزايدة بشكل صارم. امشي in-order واحفظ القيمة اللي قبلك، ولو لقيت قيمة ≤ اللي قبلها يبقى مش BST. وبعدين حل «Kth Smallest Element in a BST» بنفس المشية: وقف عند العقدة رقم k.`,
          sol: R`الناتج: [[true]] لـ [[good]]، و [[false]] لـ [[trap]] (الـ in-order بيطلّع 3 5 4 8 9، و 4 بعد 5)، و [[false]] لـ [[node(2, node(2))]] لأن التكرار مش مسموح.

الـ prev لازم يبدأ بـ [[-Infinity]] (أو null مع شرط)، مش 0، لأن الشجرة ممكن يبقى فيها أرقام سالبة. ولازم يبقى متغير برّا الدالة الـ recursive (closure) عشان يفضل محفوظ بين النداءات.

kth smallest: عدّاد بيزيد مع كل عقدة بتتسجّل في الـ in-order، ولما يوصل k احفظ القيمة ووقّف. لـ [[good]] و k = 3 الإجابة 4 (الترتيب 2 3 4 5 7 8 9). الـ Big-O [[O(h + k)]] لأنك بتقف بدري.`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function isValidInorder(root) {
  let prev = -Infinity, ok = true;
  const walk = n => {
    if (!n || !ok) return;
    walk(n.left);
    if (n.val <= prev) ok = false;
    prev = n.val;
    walk(n.right);
  };
  walk(root);
  return ok;
}
function kthSmallest(root, k) {
  let count = 0, answer = null;
  const walk = n => {
    if (!n || answer !== null) return;
    walk(n.left);
    if (++count === k) answer = n.val;
    walk(n.right);
  };
  walk(root);
  return answer;
}
const good = node(5, node(3, node(2), node(4)), node(8, node(7), node(9)));
const trap = node(5, node(3), node(8, node(4), node(9)));
console.log(isValidInorder(good), isValidInorder(trap)); // true false
console.log(isValidInorder(node(2, node(2)))); // false
console.log(kthSmallest(good, 3), kthSmallest(good, 7)); // 4 9
// validate: O(n) time; kth smallest: O(h + k) time; both O(h) stack`,
          flag: "script",
          deep: {
            why: "Validate BST من أشهر مسائل الانترفيو عشان فيها فخ: أغلب الناس بتكتب [[naive]] الأول. ومعرفة خاصية الـ BST مهمة في الشغل كمان، لأن الـ indexes في قواعد البيانات (B-tree) مبنية على نفس الفكرة: قيم مترتبة تقدر تدوّر فيها في [[O(log n)]] من غير ما تعدّي على كل حاجة.",
            how: R`dry run على [[trap]]: [[isValidBST(5, -∞, ∞)]]. الشمال: [[isValidBST(3, -∞, 5)]]، 3 جوه الـ range، ومفيش أولاد، true.

اليمين: [[isValidBST(8, 5, ∞)]]، 8 أكبر من 5، تمام. شمال 8: [[isValidBST(4, 5, 8)]]. 4 ≤ 5، برّا الـ range، false. خلصنا.

ليه [[-Infinity]] و [[Infinity]] كـ defaults؟ عشان الـ root ميبقاش عليه أي قيد، ومن غير if زيادة. ولو القيم ممكن تبقى أي حاجة (حتى [[Infinity]] نفسها)، استخدم null كـ «مفيش حد» وقارن بشرط.

ليه [[<=]] و [[>=]]؟ لأن في التعريف المعتاد التكرار مش مسموح. بعض المسائل بتسمح بالتكرار في جهة واحدة، فاسأل.

الـ [[&&]] بيعمل short-circuit: لو الشمال طلع false، اليمين مش هيتزار أصلًا.`,
            when: "أي مسألة بتقول BST خد منها ميزة: in-order مترتب، والدوَران بيمشي في فرع واحد بس ([[O(h)]] بدل [[O(n)]]). ده بيسهّل search و insert و kth smallest و LCA في BST و «Convert Sorted Array to BST». ولو المسألة بتقول binary tree بس، متفترضش إنها BST.",
            mistakes: R`[[naive]] (مقارنة بالأولاد المباشرين بس) هي الغلطة رقم واحد. وإنك تبدأ الحدود بـ [[Number.MIN_VALUE]]: ده أصغر رقم موجب (حوالي 5e-324) مش أصغر رقم، فأي قيمة سالبة هتترفض. وفي الـ in-order: تبدأ [[prev]] بـ 0 فالشجرة اللي فيها سالب تبان غلط. وفي الانترفيو اسأل: التكرار مسموح؟`
          },
          lines: [
            "نفس دالة العقدة.",
            "كل عقدة معاها الحدود المسموحة ليها، والـ root مفتوح من الناحيتين.",
            "فرع فاضي دايمًا صح.",
            "برّا الـ range (أو مساوية لحد): مش BST.",
            "الشمال سقفه قيمتي، واليمين أرضيته قيمتي، والاتنين لازم يبقوا صح.",
            "قفلة.",
            "النسخة الغلط: بتقارن بالأولاد المباشرين بس.",
            "شجرة سليمة.",
            "الفخ: 4 تحت 8 بس في يمين 5.",
            "الصح بيقول true للسليمة و false للفخ.",
            "النسخة الغلط اتضحك عليها.",
            "تكرار: 2 في شمال 2 مش مسموح.",
            "الشجرة الفاضية BST."
          ]
        },
        {
          cmd: "lowest common ancestor",
          title: "أقرب جد مشترك لعقدتين في الشجرة (LCA)",
          desc: R`LCA لعقدتين p و q: أعمق عقدة الاتنين تحتها (والعقدة بتتحسب تحت نفسها). يعني لو q تحت p، الإجابة p نفسها.

الحل في binary tree عادية: اسأل كل فرع «لقيت p أو q عندك؟». لو الشمال لقى واحدة واليمين لقى التانية، يبقى أنا نقطة التفرّع، وأنا الإجابة. لو فرع واحد بس لقى حاجة، ارجع باللي لقاه لفوق.

والـ base case هو السر: لو أنا نفسي p أو q، ارجع بنفسي من غير ما تنزل. ليه؟ لو التانية تحتي، أنا الإجابة أصلًا. ولو مش تحتي، الجد اللي فوق هيلاقيها في الفرع التاني.`,
          example: R`const node = (val, left = null, right = null) => ({ val, left, right });
//         3
//       /   \
//      5     1
//     / \   / \
//    6   2 0   8
//       / \
//      7   4
const n7 = node(7), n4 = node(4);
const n5 = node(5, node(6), node(2, n7, n4));
const n1 = node(1, node(0), node(8));
const root = node(3, n5, n1);
function lca(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lca(root.left, p, q);
  const right = lca(root.right, p, q);
  if (left && right) return root;
  return left || right;
}
console.log(lca(root, n5, n1).val); // 3
console.log(lca(root, n7, n4).val); // 2
console.log(lca(root, n5, n4).val); // 5
// O(n) time, O(h) space; assumes both p and q are in the tree`,
          try: R`حل «Lowest Common Ancestor of a Binary Search Tree»: في BST مش محتاج تزور الشجرة كلها. لو p و q الاتنين أصغر من العقدة، الإجابة في الشمال. لو الاتنين أكبر، في اليمين. غير كده، العقدة دي هي الإجابة. اكتبها بـ while loop من غير recursion، وجرّبها على BST فيها 6 و 2 و 8 و 0 و 4 و 7 و 9 و 3 و 5.`,
          sol: R`على الـ BST [[6 → (2 → 0, 4 → 3, 5), (8 → 7, 9)]]: [[lca(2, 8)]] = 6 (واحد شمال وواحد يمين)، و [[lca(2, 4)]] = 2 (4 تحت 2)، و [[lca(3, 5)]] = 4.

الـ Big-O [[O(h)]] وقت و [[O(1)]] ذاكرة، لأنك بتنزل في مسار واحد بس ومن غير recursion. في BST متوازنة ده [[O(log n)]]، مقابل [[O(n)]] للحل العام.

الغلطة الشائعة: تكتب الشرط [[p < node && q > node]] بس وتنسى إن p ممكن تبقى أكبر من q، أو إن واحدة منهم ممكن تساوي العقدة نفسها. الشرط الصح هو اللي بيقول «لو الاتنين في نفس الناحية انزل، غير كده وقّف»، وده بيغطي كل الحالات.`,
          solCode: R`const node = (val, left = null, right = null) => ({ val, left, right });
function lcaBST(root, p, q) {
  let cur = root;
  while (cur) {
    if (p < cur.val && q < cur.val) cur = cur.left;
    else if (p > cur.val && q > cur.val) cur = cur.right;
    else return cur.val;
  }
  return null;
}
const bst = node(6, node(2, node(0), node(4, node(3), node(5))), node(8, node(7), node(9)));
console.log(lcaBST(bst, 2, 8)); // 6
console.log(lcaBST(bst, 2, 4)); // 2
console.log(lcaBST(bst, 3, 5), lcaBST(bst, 5, 3)); // 4 4
console.log(lcaBST(bst, 7, 9)); // 8
// O(h) time, O(1) space`,
          flag: "script",
          deep: {
            why: "LCA بيبان في الشغل أكتر مما تتخيل: أقرب فولدر مشترك لملفين، وأقرب مدير مشترك لموظفين في org chart، وأقرب component مشترك في React لازم ترفع له الـ state عشان اتنين components يشاركوه (lifting state up هو LCA بالظبط). وهو سؤال انترفيو كلاسيكي بيختبر إنك فاهم إزاي النتايج بتطلع من الـ recursion.",
            how: R`dry run على [[lca(root, n7, n4)]]: من 3 ننزل شمال لـ 5، ومن 5 شمال لـ 6: مش p ولا q، وأولادها null، فترجع null.

من 5 يمين لـ 2، ومن 2 شمال لـ 7: هي p، ترجع نفسها. ومن 2 يمين لـ 4: هي q، ترجع نفسها. عند 2: الشمال واليمين الاتنين مش null، فترجع 2.

عند 5: الشمال null واليمين 2، فترجع 2. عند 3: الشمال 2، واليمين (فرع 1) رجّع null، فترجع 2. الإجابة 2.

[[lca(root, n5, n4)]]: من 3 ننزل لـ 5، ولقيناها p، فبنرجع على طول من غير ما ننزل لـ 4. الفرع اليمين null. فالإجابة 5، وده صح لأن 4 تحت 5.

المقارنة بـ [[===]] على العقد نفسها مش على القيم، لأن الشجرة العادية ممكن يبقى فيها قيم متكررة. ولو الـ nodes عندها [[parent]]، المسألة بتتحول لـ «أول نقطة التقاء بين قائمتين»، وتتحل بـ Set أو بمؤشرين.`,
            when: "الحل العام لأي binary tree. لو الشجرة BST استخدم الترتيب ([[O(h)]]). ولو هتسأل أسئلة LCA كتير على نفس الشجرة الكبيرة، فيه تقنيات تجهيز (binary lifting) بتخلّي كل سؤال [[O(log n)]]، ودي نادرًا ما تتسأل في انترفيو full-stack.",
            mistakes: R`إنك تفترض إن p و q موجودين من غير ما تسأل: لو q مش في الشجرة، الكود ده هيرجّع p وكإنها الإجابة. وإنك تقارن بالقيم ([[root.val === p.val]]) في شجرة فيها تكرار. وإنك تنزل تدوّر تحت p بعد ما لقيتها، فالكود يبقى أطول من غير فايدة. وفي BST: تنسى إن p ممكن تبقى أكبر من q.`
          },
          lines: [
            "نفس دالة العقدة.",
            "بنحفظ 7 و 4 في متغيرات عشان نسأل عليهم بالـ reference.",
            "فرع 5 كامل.",
            "فرع 1.",
            "الـ root.",
            "LCA لـ p و q تحت root.",
            "فاضي، أو أنا واحدة منهم: ارجع بنفسي.",
            "دوّر في الشمال.",
            "ودوّر في اليمين.",
            "واحدة في كل ناحية: أنا نقطة التفرّع.",
            "غير كده ارجع باللي اتلقى (أو null).",
            "قفلة.",
            "5 شمال و 1 يمين: الإجابة الـ root.",
            "7 و 4 أولاد 2.",
            "4 تحت 5، فـ 5 هي الإجابة."
          ]
        },
        {
          cmd: "walk nested JSON",
          title: "امشي على كومنتات متداخلة و JSON جوه JSON في كود حقيقي",
          desc: R`البيانات المتداخلة اللي بتقابلها كل يوم هي trees، حتى لو محدش سمّاها كده: كومنت عليه ردود عليها ردود، و JSON جاي من API جواه objects جوه arrays، و menu جوه menu، وشجرة فولدرات.

الفرق عن الـ binary tree: كل عقدة ليها عدد أولاد مش ثابت (array اسمها [[replies]] أو [[children]])، وفي الغالب عندك «غابة» (array فيها كذا root) مش root واحد. بس الحل هو نفسه: DFS بـ recursion، أو بـ stack لو العمق ممكن يكبر.

المثال فيه ٣ حاجات بتتعمل في كود حقيقي: [[flatten]] بتحوّل الشجرة لقائمة فيها العمق (عشان تعرضها بـ indentation في UI)، و [[count]] بتعدّ كل الكومنتات، و [[paths]] بتطلّع كل قيمة في JSON مع المسار بتاعها (مفيد في مقارنة config أو logging أو رسايل validation).`,
          example: R`const comments = [
  { id: 1, text: "Great post", replies: [
    { id: 2, text: "Agreed", replies: [
      { id: 3, text: "Same", replies: [] },
    ] },
  ] },
  { id: 4, text: "Typo in line 3", replies: [] },
];
function flatten(list, depth = 0, out = []) {
  for (const c of list) {
    out.push({ id: c.id, depth });
    flatten(c.replies, depth + 1, out);
  }
  return out;
}
const count = list => list.reduce((sum, c) => sum + 1 + count(c.replies), 0);
function paths(value, prefix = "$", out = []) {
  if (value !== null && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) paths(v, prefix + "." + k, out);
  } else out.push(prefix + " = " + JSON.stringify(value));
  return out;
}
console.log(flatten(comments).map(c => "-".repeat(c.depth) + c.id).join(" ")); // 1 -2 --3 4
console.log(count(comments)); // 4
console.log(paths({ user: { name: "Mona", tags: ["admin"] }, ok: true })); // ['$.user.name = "Mona"', '$.user.tags.0 = "admin"', '$.ok = true']
// O(n) time for n comments or values, O(depth) stack`,
          try: R`اكتب [[flattenIter]]: نفس [[flatten]] بس بـ stack صريح من غير recursion، ولازم يطلّع نفس الترتيب بالظبط. وبعدين ابني كومنت متداخل عمقه ١٠٠ ألف (كل كومنت رد على اللي قبله) بـ loop، وشوف [[flatten]] الـ recursive بتعمل إيه، و [[flattenIter]] بتعمل إيه. وكمان اكتب [[findPath(list, id)]] ترجّع الـ ids من الـ root لحد الكومنت ده.`,
          sol: R`[[flattenIter]]: حط الـ roots في الـ stack بالعكس (عشان أول واحد يطلع الأول)، ومع كل [[pop]] سجّل العقدة وحط ردودها بالعكس برضه مع [[depth + 1]]. الناتج لازم يبقى [[1 -2 --3 4]] زي النسخة الـ recursive. لو نسيت العكس هيطلع [[4 1 -2 --3]].

مع عمق ١٠٠ ألف: النسخة الـ recursive بتقع بـ [[RangeError: Maximum call stack size exceeded]] (الحد في Node حوالي ١٠ آلاف نداء، والرقم بيختلف حسب حجم الـ frame). والنسخة اللي بـ stack بتشتغل عادي لأن الـ array بتتخزن في الـ heap مش في الـ call stack.

[[findPath]]: DFS بيحط الـ id في [[path]] قبل ما ينزل ويشيله بعد ما يرجع (ده backtracking صغير)، ولما يلاقي الـ id يرجّع نسخة. [[findPath(comments, 3)]] = [[[1, 2, 3]]]، و id مش موجود = [[null]].

وخلي بالك: بناء كومنت عمقه ١٠٠ ألف لازم يبقى بـ loop، ولو عملت [[JSON.stringify]] عليه هيقع هو كمان لأنه recursive من جوه.`,
          solCode: R`function flatten(list, depth = 0, out = []) {
  for (const c of list) {
    out.push({ id: c.id, depth });
    flatten(c.replies, depth + 1, out);
  }
  return out;
}
function flattenIter(list) {
  const out = [];
  const stack = list.map(c => ({ c, depth: 0 })).reverse();
  while (stack.length) {
    const { c, depth } = stack.pop();
    out.push({ id: c.id, depth });
    for (let i = c.replies.length - 1; i >= 0; i--) stack.push({ c: c.replies[i], depth: depth + 1 });
  }
  return out;
}
function findPath(list, id, path = []) {
  for (const c of list) {
    path.push(c.id);
    if (c.id === id) return [...path];
    const found = findPath(c.replies, id, path);
    if (found) return found;
    path.pop();
  }
  return null;
}
const comments = [
  { id: 1, text: "Great post", replies: [{ id: 2, text: "Agreed", replies: [{ id: 3, text: "Same", replies: [] }] }] },
  { id: 4, text: "Typo in line 3", replies: [] },
];
const show = list => list.map(c => "-".repeat(c.depth) + c.id).join(" ");
console.log(show(flattenIter(comments))); // 1 -2 --3 4
console.log(findPath(comments, 3), findPath(comments, 99)); // [1, 2, 3] null
const deep = { id: 0, replies: [] };
let cur = deep;
for (let i = 1; i < 100000; i++) { const next = { id: i, replies: [] }; cur.replies.push(next); cur = next; }
try { flatten([deep]); } catch (e) { console.log(e.constructor.name); } // RangeError
console.log(flattenIter([deep]).length); // 100000
// flattenIter: O(n) time, O(n) worst-case stack in heap memory, no call-stack limit`,
          flag: "script",
          deep: {
            why: "ده المكان اللي الـ trees بتقابلك فيه في شغل الـ full-stack فعلًا: شاشة كومنتات فيها ردود (Reddit و GitHub)، و sidebar فيه أقسام جوه أقسام، و JSON راجع من API محتاج تدوّر فيه أو تنضّفه، وشجرة تصنيفات منتجات. لو فاهم DFS، كل ده بقى نفس الـ 5 سطور.",
            how: R`[[flatten]] هي pre-order: سجّل الكومنت، وبعدين انزل على ردوده بعمق + 1. الترتيب اللي بيطلع هو نفس الترتيب اللي بتعرض بيه الشاشة: الكومنت، وتحته ردوده بـ indentation، وبعدين الكومنت اللي بعده.

[[count]]: كل كومنت = 1 + عدد اللي تحته. وده post-order (لازم ردوده ترجع الأول). والـ [[reduce]] بيجمع على مستوى الإخوات.

[[paths]]: أي قيمة يا إما «ورقة» (string أو number أو boolean أو null) فنسجّلها، يا إما object أو array فننزل في كل key. [[typeof null === "object"]] في JavaScript، عشان كده الشرط [[value !== null]] لازم. والـ arrays بتطلع keys بتاعتها "0" و "1"، فالمسار [[$.user.tags.0]].

البيانات في الـ database في الغالب مش متخزّنة متداخلة: كل كومنت صف فيه [[parent_id]]. عشان تبني الشجرة: Map من id لكومنت، وبعدين لكل كومنت ضيفه في [[replies]] بتاع أبوه، [[O(n)]]. وفي SQL فيه [[WITH RECURSIVE]] بيعمل نفس المشية جوه الداتابيز (شوف «تاب SQL و Prisma»).`,
            when: "recursion عادية لما العمق محدود ومعروف (menu من ٣ مستويات، JSON من API مظبوط). stack صريح لما العمق جاي من المستخدم ومحدش حاطط له حد: كومنتات ممكن يتعمل عليها ردود لا نهائية، أو ملف JSON مرفوع. ولو عايز ترسم الكومنتات، في الغالب هتحط حد للعمق وتعرض «كمّل المحادثة» زي Reddit.",
            mistakes: R`[[typeof null]] بيطلع "object" فالكود بيقع على [[Object.entries(null)]]. وإنك تعدّل البيانات الأصلية وانت بتمشي عليها (مثلًا تمسح [[replies]])، والـ state في React لازم يفضل immutable. وإنك تنسى إن الـ recursion ليها حد: JSON عمقه عشرات الآلاف (سواء بالغلط أو هجوم متعمّد) هيوقع السيرفر لو بتمشي عليه recursive، عشان كده بعض الـ parsers بيحطوا حد للعمق. وفي الانترفيو، لو اتسألت «عندك كومنتات بـ parent_id، اعرضهم كشجرة»، ابدأ ببناء الـ Map.`
          },
          lines: [
            "array فيها كومنتات، وكل كومنت ليه replies.",
            "كومنت 1، والـ replies بتاعته مفتوحة.",
            "رد عليه (2)، وليه ردود.",
            "رد على الرد (3)، من غير ردود.",
            "قفلة ردود 2.",
            "قفلة ردود 1.",
            "كومنت تاني على نفس المستوى.",
            "قفلة الـ array.",
            "flatten: pre-order بيحفظ عمق كل كومنت.",
            "عدّي على الإخوات بالترتيب.",
            "سجّل الكومنت بعمقه.",
            "انزل على ردوده بعمق أكبر بواحد.",
            "قفلة الـ for.",
            "رجّع القائمة.",
            "قفلة.",
            "count: كل كومنت = 1 + عدد اللي تحته.",
            "paths: كل قيمة ومسارها.",
            "object أو array (مع استبعاد null): انزل.",
            "لكل key، ضيفه على المسار وانزل.",
            "قيمة عادية: سجّلها بالمسار.",
            "رجّع كل المسارات.",
            "قفلة.",
            "الشرطة = مستوى عمق، فبتشوف الشكل المتداخل.",
            "٤ كومنتات في كل المستويات.",
            "كل قيمة في الـ JSON ومسارها."
          ]
        }
      ]
    },
    {
      t: "graphs",
      l: 3,
      n: "عقد وعلاقات من غير root: adjacency list، و islands، وأقصر طريق بـ BFS، و topological sort، و cycles",
      items: [
        {
          cmd: "adjacency list",
          title: "إزاي تخزّن graph في الكود، وتمشي عليه من غير ما تلف في دواير؟",
          desc: R`الـ graph: عقد (vertices) ووصلات بينها (edges). الشجرة نوع من الـ graph، بس الـ graph العادي ممكن يبقى فيه دواير، وممكن عقدة ليها أكتر من أب، ومفيش root.

أشهر طريقة تخزّنه بيها: adjacency list، يعني Map (أو array) فيها لكل عقدة قائمة جيرانها. الذاكرة [[O(V + E)]]: عدد العقد + عدد الوصلات.

البديل adjacency matrix: جدول V × V فيه true لو فيه وصلة. بتسأل «فيه وصلة بين a و b؟» في [[O(1)]]، بس بتاخد [[O(V^2)]] ذاكرة حتى لو الوصلات قليلة. أغلب الـ graphs الحقيقية (أصحاب، links، dependencies) وصلاتها قليلة، فالـ list هي الاختيار الافتراضي.

الفرق الوحيد بين DFS على شجرة وعلى graph: لازم [[Set]] للعقد اللي زرتها، وإلا هتلف في دايرة لحد ما الـ stack يخلص.`,
          example: R`const edges = [["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"], ["d", "e"]];
function buildGraph(edges, directed = false) {
  const g = new Map();
  for (const [u, v] of edges) {
    if (!g.has(u)) g.set(u, []);
    if (!g.has(v)) g.set(v, []);
    g.get(u).push(v);
    if (!directed) g.get(v).push(u);
  }
  return g;
}
function dfs(g, start, seen = new Set()) {
  seen.add(start);
  for (const next of g.get(start)) if (!seen.has(next)) dfs(g, next, seen);
  return seen;
}
function countComponents(g) {
  const seen = new Set();
  let count = 0;
  for (const v of g.keys()) if (!seen.has(v)) { dfs(g, v, seen); count++; }
  return count;
}
const g = buildGraph(edges);
console.log(g.get("d")); // ['b', 'c', 'e']
console.log([...dfs(g, "a")].join(" ")); // a b d c e
console.log(countComponents(buildGraph([["a", "b"], ["c", "d"], ["d", "e"]]))); // 2
// build: O(V + E); DFS visits every vertex once and every edge twice: O(V + E) time, O(V) space`,
          try: R`حل «Find if Path Exists in Graph»: عندك n عقدة مترقمة من 0 لـ n - 1، و edges، و source و destination. فيه طريق؟ ابني الـ graph بـ arrays بدل Map، وحلها بـ BFS المرة دي (queue ومؤشر [[head]]). جرّب n = 6 و edges [[[0,1],[0,2],[3,5],[5,4],[4,3]]]: من 0 لـ 5 الإجابة false، ومن 3 لـ 4 true. وخلي بالك إن فيه عقد ممكن متبقاش في أي edge.`,
          sol: R`الناتج: [[false]] من 0 لـ 5 (0 و 1 و 2 في جزيرة، و 3 و 4 و 5 في جزيرة تانية)، و [[true]] من 3 لـ 4، و [[true]] من 2 لـ 2 (العقدة بتوصل لنفسها).

ليه arrays؟ لما العقد أرقام من 0 لـ n - 1، [[Array.from({ length: n }, () => [])]] أسرع وأبسط من Map، وكل عقدة ليها قائمة حتى لو ملهاش edges. لو استخدمت [[new Array(n).fill([])]] كل الخانات هتشاور على نفس الـ array، وكل الجيران هيتخلطوا: دي أشهر غلطة في المسألة دي.

BFS بـ مؤشر [[head]] بدل [[shift]]: الـ queue بتفضل array عادية، وإنت بتقرا منها بالترتيب. وضيف العقدة للـ [[seen]] لحظة ما تحطها في الـ queue، مش لما تطلعها، وإلا نفس العقدة ممكن تدخل الـ queue كذا مرة.`,
          solCode: R`function validPath(n, edges, source, destination) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  const seen = new Array(n).fill(false);
  const queue = [source];
  seen[source] = true;
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    if (u === destination) return true;
    for (const v of graph[u]) if (!seen[v]) { seen[v] = true; queue.push(v); }
  }
  return false;
}
const edges = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]];
console.log(validPath(6, edges, 0, 5)); // false
console.log(validPath(6, edges, 3, 4)); // true
console.log(validPath(6, edges, 2, 2)); // true
// O(V + E) time and space`,
          flag: "script",
          deep: {
            why: "الـ graphs بتوصف أي «علاقات»: مين متابع مين، والصفحات اللي بتلينك لبعض، والـ packages اللي معتمدة على بعض في [[package-lock.json]]، والـ microservices اللي بتكلم بعض، والخرايط. وأغلب مسائل الـ graphs في الانترفيو بتبدأ بنفس الخطوة: ابني adjacency list من الـ edges، وبعدين DFS أو BFS.",
            how: R`[[buildGraph]] بتضيف كل عقدة للـ Map حتى لو ملهاش جيران غير في ناحية واحدة (عشان [[g.get(v)]] متبقاش undefined). وفي الـ undirected graph كل edge بيتضاف مرتين: من u لـ v ومن v لـ u.

DFS من a: نزور a ونحطها في seen، وجيرانها b و c. نروح b: جيرانها a (اتزارت) و d. نروح d: جيرانها b (اتزارت) و c و e. نروح c: كل جيرانها اتزاروا. نرجع لـ d ونروح e. الترتيب a b d c e.

من غير [[seen]]: a تروح b، و b ترجع a، و a تروح b... للأبد.

connected components: لف على كل العقد، وأي عقدة لسه ماتزارتش يبقى بداية جزيرة جديدة، فابدأ DFS منها وزوّد العدّاد. الـ DFS بيعلّم الجزيرة كلها، فمش هتتعد تاني. والإجمالي لسه [[O(V + E)]] لأن كل عقدة بتتزار مرة واحدة في كل الـ DFS calls مع بعض.

الـ Big-O: كل عقدة بتدخل مرة، وكل edge بيتبص عليه مرة من كل ناحية، فـ [[O(V + E)]]. ده الـ Big-O بتاع أغلب مسائل الـ graph traversal، واتعوّد تقوله كده بدل [[O(n)]].`,
            when: "adjacency list: الاختيار الافتراضي. matrix: لما الـ graph كثيف (أغلب العقد متوصلة ببعض) أو صغير، أو محتاج «فيه edge بين دول؟» كتير. والـ grid (زي الخرايط والـ mazes) هو graph من غير ما تبنيه: كل خانة جيرانها الأربعة، وده الدرس الجاي.",
            mistakes: R`[[new Array(n).fill([])]]: كل الخانات نفس الـ array. وإنك تنسى تضيف الناحية التانية في الـ undirected. وإنك تنسى [[seen]] فتلف في دايرة. وإنك تفترض إن الـ graph متوصل كله، فتعمل DFS من عقدة واحدة وتفوّت جزر تانية. وفي الانترفيو اسأل دايمًا: directed ولا undirected؟ فيه دواير؟ فيه عقد لوحدها؟ العقد أرقام ولا strings؟`
          },
          lines: [
            "الوصلات كـ أزواج.",
            "بناء adjacency list، و directed بيحدد لو الوصلة في اتجاه واحد.",
            "Map من العقدة لقائمة جيرانها.",
            "عدّي على كل وصلة.",
            "اتأكد إن u ليها قائمة.",
            "و v كمان، حتى لو ملهاش جيران طالعين.",
            "ضيف v في جيران u.",
            "لو مش directed، ضيف u في جيران v.",
            "قفلة الـ for.",
            "رجّع الـ graph.",
            "قفلة.",
            "DFS recursive بـ Set للي اتزار.",
            "علّم العقدة.",
            "انزل على كل جار لسه ماتزارش.",
            "رجّع كل اللي اتزار.",
            "قفلة.",
            "عدد الجزر (connected components).",
            "Set واحدة لكل الـ DFS calls.",
            "العدّاد.",
            "كل عقدة ماتزارتش = جزيرة جديدة، علّمها كلها وعدّها.",
            "رجّع العدد.",
            "قفلة.",
            "ابني الـ graph.",
            "جيران d.",
            "كل اللي يوصل له من a بترتيب الـ DFS.",
            "جزيرة a-b وجزيرة c-d-e."
          ]
        },
        {
          cmd: "number of islands",
          title: "عدّ الجزر في خريطة من 1 و 0 (Number of Islands)",
          desc: R`الـ grid هو graph من غير ما تبنيه: كل خانة عقدة، وجيرانها الأربعة (فوق وتحت وشمال ويمين) هما الـ edges. الجزيرة مجموعة 1 متوصلين ببعض أفقي أو رأسي (مش قطري).

الحل: لف على كل الخانات. أول ما تلاقي 1، دي جزيرة جديدة: زوّد العدّاد، وبعدين «اغرق» الجزيرة كلها بـ DFS، يعني حوّل كل 1 متوصل بيها لـ 0، عشان متتعدّش تاني.

ده نفس connected components من الدرس اللي فات، بس الـ [[seen]] هنا هي الـ grid نفسها (بنعلّم بتغيير القيمة). عشان منبوّظش الـ input اللي جاي من برّا، بنشتغل على نسخة.`,
          example: R`function numIslands(grid) {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const g = grid.map(row => [...row]);
  let count = 0;
  const sink = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || g[r][c] !== "1") return;
    g[r][c] = "0";
    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (g[r][c] === "1") { count++; sink(r, c); }
  return count;
}
const map = ["11000", "11000", "00100", "00011"].map(s => s.split(""));
console.log(numIslands(map)); // 3
console.log(numIslands([["1", "1"], ["1", "1"]])); // 1
console.log(numIslands([["1", "0", "1"]])); // 2
console.log(numIslands([])); // 0
// O(rows × cols) time; O(rows × cols) space for the copy and, in the worst case, the recursion`,
          try: R`حل «Max Area of Island»: رجّع مساحة أكبر جزيرة بدل العدد (خلّي [[sink]] ترجّع عدد الخانات اللي غرّقتها). وبعدين اكتبها بـ BFS (queue) بدل recursion، وجرّبها على grid 1000 × 1000 كله 1: النسخة الـ recursive هتعمل إيه؟`,
          sol: R`للخريطة اللي في المثال: أكبر جزيرة مساحتها 4 (المربع اللي فوق على الشمال). و grid كله 0 الإجابة 0.

[[area]] ترجّع 0 لو برّا الحدود أو مش 1، وغير كده [[1 + area(4 جيران)]]. وخد [[Math.max]] على كل الجزر.

على grid مليون خانة كله 1: الـ DFS الـ recursive ممكن ينزل مليون مستوى، فهيقع بـ [[RangeError: Maximum call stack size exceeded]]. نسخة الـ BFS بـ queue ومؤشر [[head]] بتشتغل عادي وبترجّع 1000000.

في الـ BFS علّم الخانة (حوّلها لـ 0) لحظة ما تحطها في الـ queue، مش لما تطلعها. لو استنيت، نفس الخانة هتدخل الـ queue من كذا جار، والـ queue هتكبر أضعاف.`,
          solCode: R`function maxAreaOfIsland(grid) {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const g = grid.map(row => [...row]);
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let best = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] !== "1") continue;
      g[r][c] = "0";
      const queue = [[r, c]];
      for (let head = 0; head < queue.length; head++) {
        const [cr, cc] = queue[head];
        for (const [dr, dc] of dirs) {
          const nr = cr + dr, nc = cc + dc;
          if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && g[nr][nc] === "1") {
            g[nr][nc] = "0";
            queue.push([nr, nc]);
          }
        }
      }
      best = Math.max(best, queue.length);
    }
  }
  return best;
}
const map = ["11000", "11000", "00100", "00011"].map(s => s.split(""));
console.log(maxAreaOfIsland(map)); // 4
console.log(maxAreaOfIsland([["0", "0"]])); // 0
const big = Array.from({ length: 1000 }, () => new Array(1000).fill("1"));
console.log(maxAreaOfIsland(big)); // 1000000
// O(rows × cols) time and space, no recursion depth limit`,
          flag: "script",
          deep: {
            why: "Number of Islands من أكتر مسائل الانترفيو اللي بتتسأل في الشركات الكبيرة، لأنها بتختبر إنك شايف الـ grid كـ graph. ونفس الفكرة بالظبط هي أداة «الجردل» (flood fill) في برامج الرسم، وتحديد المناطق المتوصلة في خريطة لعبة، وتجميع الخانات المتشابهة في spreadsheet.",
            how: R`dry run على الخريطة: [[(0,0)]] = 1، جزيرة رقم 1. [[sink(0,0)]] بتغرّق [[(0,0) (1,0) (0,1) (1,1)]]، والباقي حواليهم 0 أو برّا.

نكمل اللف لحد [[(2,2)]] = 1، جزيرة 2، وبتغرق لوحدها. وبعدين [[(3,3)]] = 1، جزيرة 3، وبتغرق هي و [[(3,4)]]. الإجابة 3.

الشرط الطويل في أول [[sink]] هو كل الـ base cases في سطر واحد: برّا الحدود من أي ناحية، أو ماء، أو اتغرّقت قبل كده. الترتيب مهم: لازم تتأكد من الحدود قبل ما تقرا [[g[r][c]]]، عشان [[g[-1]]] بـ undefined و [[undefined[c]]] هتوقع البرنامج.

[[grid[0]?.length ?? 0]]: لو الـ grid فاضي، [[grid[0]]] undefined، والـ optional chaining بيمنع الـ crash.

الـ Big-O: كل خانة بتتزار مرة في الـ loop الخارجي، وبتتغرق مرة واحدة بالكتير، فـ [[O(rows × cols)]].`,
            when: "أي grid فيه «مناطق متوصلة»: عدّها، أو احسب مساحتها، أو حيطها (Surrounded Regions)، أو اعرف إيه اللي يوصل للحافة (Pacific Atlantic Water Flow). DFS أو BFS الاتنين ينفعوا؛ BFS أأمن لو الـ grid كبير. ولو الـ grid بيتغير (جزر بتتضاف واحدة واحدة)، ده union-find.",
            mistakes: R`قراءة الخانة قبل التأكد من الحدود. ونسيان إنك تعلّم الخانة قبل ما تنزل على جيرانها (فتلف في دايرة). وإنك تقارن بـ [[1]] (رقم) والـ grid فيه [["1"]] (string)؛ LeetCode بيستخدم strings في المسألة دي بالذات. وإنك تعدّل الـ input من غير ما تقول، وفي الانترفيو قول «هعدّل الـ grid عشان أوفّر ذاكرة، ولو مش مسموح هعمل Set أو نسخة».`
          },
          lines: [
            "بتعدّ الجزر.",
            "الأبعاد، مع حماية للـ grid الفاضي.",
            "نسخة عشان منغيّرش الـ input.",
            "العدّاد.",
            "sink بتغرّق جزيرة كاملة بـ DFS.",
            "برّا الحدود أو مش أرض: ارجع.",
            "غرّق الخانة دي (هي كمان علامة إنها اتزارت).",
            "انزل على الجيران الأربعة.",
            "قفلة sink.",
            "لف على كل الصفوف.",
            "وكل الأعمدة.",
            "أرض لسه ماتغرقتش: جزيرة جديدة، عدّها وغرّقها كلها.",
            "رجّع العدد.",
            "قفلة.",
            "الخريطة المشهورة بتاعة المسألة، كل صف array من الحروف.",
            "٣ جزر.",
            "كله أرض: جزيرة واحدة.",
            "اتنين مفصولين بـ 0.",
            "فاضي."
          ]
        },
        {
          cmd: "shortest path in grid (BFS)",
          title: "أقل عدد خطوات من نقطة لنقطة في متاهة",
          desc: R`لما كل خطوة بنفس التكلفة (خطوة = 1)، BFS بيلاقي أقصر طريق. ليه؟ لأنه بيزور كل الخانات اللي على بعد 1، وبعدين كل اللي على بعد 2، وهكذا. فأول مرة يوصل للهدف، دي أقل مسافة ممكنة.

الـ DFS مينفعش هنا: ممكن ينزل في طريق طويل ملفوف ويوصل للهدف الأول، ومفيش ضمان إنه الأقصر.

الأدوات: queue ومؤشر [[head]]، و [[dist]] جدول بنفس حجم الـ grid فيه المسافة لكل خانة ([[-1]] = لسه ماوصلناش). الـ [[dist]] بيقوم بدور الـ [[seen]] كمان. و [[dirs]] فيها الاتجاهات الأربعة، عشان منكتبش نفس الكود ٤ مرات.

لو الخطوات ليها تكاليف مختلفة (طريق سريع وطريق زحمة)، BFS مبقاش ينفع، ومحتاج Dijkstra (درس «Dijkstra» في نفس المستوى).`,
          example: R`function shortestPath(grid, start, goal) {
  const rows = grid.length, cols = grid[0].length;
  const dist = grid.map(row => [...row].map(() => -1));
  const queue = [start];
  const [sr, sc] = start;
  dist[sr][sc] = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let head = 0; head < queue.length; head++) {
    const [r, c] = queue[head];
    if (r === goal[0] && c === goal[1]) return dist[r][c];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (grid[nr][nc] === "#" || dist[nr][nc] !== -1) continue;
      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }
  return -1;
}
const maze = [
  "..#.",
  "..#.",
  "....",
  "#.#.",
];
console.log(shortestPath(maze, [0, 0], [0, 3])); // 7
console.log(shortestPath(maze, [0, 0], [0, 0])); // 0
console.log(shortestPath([".#", "#."], [0, 0], [1, 1])); // -1
// O(rows × cols) time and space: every cell enters the queue at most once`,
          try: R`خلّي الدالة ترجّع الطريق نفسه مش طوله بس: احفظ لكل خانة «جيت منين» ([[parent]])، ولما توصل للهدف ارجع بالـ parents لحد البداية واعكس. وبعدين حل «Rotting Oranges»: كل البرتقان البايظ بيبوّظ جيرانه كل دقيقة، في كام دقيقة كله يبوظ؟ (BFS بيبدأ من كل البايظين مع بعض: multi-source BFS).`,
          sol: R`الطريق في المتاهة من [[(0,0)]] لـ [[(0,3)]]: ٨ خانات (٧ خطوات)، زي [[0,0 → 1,0 → 2,0 → 2,1 → 2,2 → 2,3 → 1,3 → 0,3]]. ممكن يطلع عندك طريق تاني بنفس الطول حسب ترتيب [[dirs]]، وده صح برضه.

الـ [[parent]] ممكن تبقى Map مفتاحها [[r + "," + c]]، أو جدول زي [[dist]]. واحفظ الـ parent لحظة ما تحط الخانة في الـ queue (نفس لحظة [[dist]]).

Rotting Oranges على [[[[2,1,1],[1,1,0],[0,1,1]]]]: الإجابة 4. حط كل الـ 2 في الـ queue في الأول بمسافة 0، وعدّ البرتقان السليم. BFS عادي، وكل ما سليمة تبوظ نقّص العدد. في الآخر لو فيه سليم لسه، الإجابة [[-1]] (زي [[[[2,1,1],[0,1,1],[1,0,1]]]]). ولو مفيش سليم من الأول، الإجابة 0.

الغلطة الشائعة: تعمل BFS منفصل من كل برتقانة بايظة. ده [[O((rows × cols)^2)]] وبيدّي إجابة غلط لو مش بتاخد الـ minimum صح.`,
          solCode: R`function shortestRoute(grid, start, goal) {
  const rows = grid.length, cols = grid[0].length;
  const key = (r, c) => r + "," + c;
  const parent = new Map([[key(...start), null]]);
  const queue = [start];
  for (let head = 0; head < queue.length; head++) {
    const [r, c] = queue[head];
    if (r === goal[0] && c === goal[1]) {
      const path = [];
      for (let k = key(r, c); k !== null; k = parent.get(k)) path.push(k);
      return path.reverse();
    }
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] === "#" || parent.has(key(nr, nc))) continue;
      parent.set(key(nr, nc), key(r, c));
      queue.push([nr, nc]);
    }
  }
  return null;
}
function orangesRotting(grid) {
  const g = grid.map(row => [...row]);
  let queue = [], fresh = 0, minutes = 0;
  g.forEach((row, r) => row.forEach((v, c) => { if (v === 2) queue.push([r, c]); if (v === 1) fresh++; }));
  while (queue.length && fresh > 0) {
    const next = [];
    for (const [r, c] of queue)
      for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]])
        if (g[nr]?.[nc] === 1) { g[nr][nc] = 2; fresh--; next.push([nr, nc]); }
    queue = next;
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}
const maze = ["..#.", "..#.", "....", "#.#."];
console.log(shortestRoute(maze, [0, 0], [0, 3]).join(" > ")); // 0,0 > 1,0 > 2,0 > 2,1 > 2,2 > 2,3 > 1,3 > 0,3
console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])); // 4
console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])); // -1
console.log(orangesRotting([[0, 2]])); // 0
// both O(rows × cols) time and space`,
          flag: "script",
          deep: {
            why: "«أقل عدد خطوات» سؤال بيتكرر بأشكال كتير: أقل عدد نقلات في لعبة، وأقل عدد تحويلات بين كلمتين (Word Ladder)، وأقرب مخزن لكل عميل، ودرجات القرابة في شبكة اجتماعية («صديق صديقك»). وكلهم BFS على graph، سواء كان grid أو شبكة أو حالات لعبة.",
            how: R`dry run مختصر: [[dist(0,0) = 0]]. من [[(0,0)]] نضيف [[(1,0)]] و [[(0,1)]] بمسافة 1. من [[(1,0)]] نضيف [[(2,0)]] و [[(1,1)]] بمسافة 2. [[(0,1)]] جيرانها يا إما حيطة يا إما اتزاروا. وهكذا، الموجة بتتوسع خطوة خطوة.

الحيطة في [[(0,2)]] و [[(1,2)]] بتجبر الطريق ينزل لصف 2 عشان يعدّي لليمين. بعد ما يوصل [[(2,3)]] بمسافة 5، يطلع [[(1,3)]] بـ 6، و [[(0,3)]] بـ 7.

ليه بنكتب [[dist]] لحظة ما الخانة تدخل الـ queue؟ لو استنينا لحد ما تطلع، نفس الخانة ممكن تدخل الـ queue من جارين مختلفين، والـ queue تكبر. والأهم إن أول مرة بنوصل لخانة في BFS هي أقصر مسافة ليها، فمفيش داعي نكتبها تاني.

[[grid[nr][nc]]] بيشتغل على strings عادي ([["..#."[2]]] = "#")، فمش لازم نحوّل كل صف لـ array.

multi-source BFS (الـ try): بدل ما الـ queue تبدأ بعنصر واحد، تبدأ بكل المصادر مع بعض بمسافة 0. الموجات بتتوسع من كل المصادر في نفس الوقت، وكل خانة بتاخد المسافة لأقرب مصدر.`,
            when: "أقصر طريق لما كل الخطوات بنفس التكلفة: BFS، [[O(V + E)]]. لو التكاليف 0 و 1 بس، فيه 0-1 BFS بـ deque. لو التكاليف موجبة ومختلفة: Dijkstra. لو فيه تكاليف سالبة: Bellman-Ford (نادرًا ما يتسأل). ولو المطلوب «فيه طريق ولا لأ» بس، DFS كفاية.",
            mistakes: R`استخدام DFS لأقصر طريق. وإنك تعلّم الخانة لما تطلع من الـ queue بدل لما تدخل. و [[queue.shift()]] على grid كبير. وإنك تنسى حالة إن البداية هي الهدف (الإجابة 0) أو إن البداية نفسها حيطة. وإنك ترجّع [[Infinity]] أو [[undefined]] لما مفيش طريق بدل اللي المسألة طالباه (في الغالب [[-1]]).`
          },
          lines: [
            "أقل عدد خطوات من start لـ goal.",
            "الأبعاد.",
            "جدول المسافات، كله -1 في الأول (ماوصلناش).",
            "الـ queue بتبدأ بالبداية.",
            "صف وعمود البداية.",
            "المسافة للبداية 0.",
            "الاتجاهات الأربعة: تحت، فوق، يمين، شمال.",
            "queue بمؤشر head بدل shift.",
            "الخانة اللي عليها الدور.",
            "وصلنا للهدف: المسافة دي أقل مسافة أكيد.",
            "جرّب كل اتجاه.",
            "الخانة الجارة.",
            "برّا الحدود: فوّت.",
            "حيطة، أو اتزارت قبل كده: فوّت.",
            "المسافة = مسافتي + 1، وده كمان بيعلّمها إنها اتزارت.",
            "حطها في آخر الـ queue.",
            "قفلة الـ for الداخلية.",
            "قفلة الـ for الخارجية.",
            "الـ queue خلصت ومفيش وصول: مفيش طريق.",
            "قفلة.",
            "المتاهة: # حيطة، و . مكان فاضي.",
            "الصف الأول.",
            "التاني.",
            "التالت.",
            "الرابع.",
            "قفلة الـ array.",
            "لازم تنزل لصف 2 وتلف: ٧ خطوات.",
            "البداية هي الهدف.",
            "محبوس بين حيطتين."
          ]
        },
        {
          cmd: "topological sort (course schedule)",
          title: "رتّب المهام بحيث كل مهمة تيجي بعد اللي معتمدة عليه (Course Schedule)",
          desc: R`عندك كورسات، وكل كورس ليه prerequisites. عايز ترتيب تاخد بيه كل الكورسات بحيث متاخدش كورس قبل متطلباته. ده اسمه topological sort، وبيشتغل على directed graph من غير دواير (DAG).

طريقة Kahn (بـ BFS): احسب لكل عقدة [[indegree]] (عدد الحاجات اللي مستنياها). الحاجات اللي indegree بتاعها 0 مش مستنية حد، فحطها في الـ queue. كل ما تطلّع واحدة وتحطها في الترتيب، قلّل indegree لكل اللي معتمد عليها، واللي يوصل لـ 0 يدخل الـ queue.

لو خلصت والترتيب ناقص عقد، يبقى فيه دايرة: كورسات معتمدة على بعض في حلقة، ومحدش فيهم هيوصل لـ 0 أبدًا. فالكود نفسه بيكشف الدواير ببلاش.`,
          example: R`function courseOrder(n, prereqs) {
  const graph = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [course, pre] of prereqs) {
    graph[pre].push(course);
    indegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  const order = [];
  for (let head = 0; head < queue.length; head++) {
    const c = queue[head];
    order.push(c);
    for (const next of graph[c]) if (--indegree[next] === 0) queue.push(next);
  }
  return order.length === n ? order : [];
}
console.log(courseOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // [0, 1, 2, 3]
console.log(courseOrder(2, [[1, 0], [0, 1]])); // []
console.log(courseOrder(3, [])); // [0, 1, 2]
// O(V + E) time and space`,
          try: R`طبّقها على حاجة حقيقية: عندك packages ومعتمدة على بعض كـ object: [[{ app: ["api", "ui"], api: ["db", "auth"], auth: ["db"], ui: [], db: [] }]]. اكتب [[buildOrder(deps)]] ترجّع ترتيب تبني بيه كل package بعد اللي هي معتمدة عليه، أو ترمي Error فيه كلمة cycle لو فيه اعتماد دائري. وجرّبها لما [[db]] تعتمد على [[app]].`,
          sol: R`الكود اللي تحت بيطلّع [[ui db auth api app]]، وأي ترتيب تاني فيه db قبل auth و api، و auth قبل api، و api و ui قبل app. الـ topological sort مش وحيد، وأي ترتيب يحقق الشروط صح.

خلي بالك من اتجاه السهم: «api معتمدة على db» يعني السهم من db لـ api (لازم db تتبني الأول)، فـ [[graph.get(db).push(api)]] و [[indegree(api)++]]. لو عكست الاتجاه هيطلعلك الترتيب مقلوب (app الأول).

لو [[db]] بقت معتمدة على [[app]]: db ← app ← api ← db دايرة، ومفيش حد فيهم indegree بتاعه هيوصل 0، فالترتيب هيطلع ناقص ([[ui]] بس)، والدالة ترمي [[cycle detected]].

واتأكد إن كل dependency ليها مكان في الـ Map حتى لو مش key في الـ object (مثلًا dependency خارجية مش متعرّفة).`,
          solCode: R`function buildOrder(deps) {
  const graph = new Map(), indegree = new Map();
  const ensure = x => { if (!graph.has(x)) { graph.set(x, []); indegree.set(x, 0); } };
  for (const [pkg, needs] of Object.entries(deps)) {
    ensure(pkg);
    for (const dep of needs) {
      ensure(dep);
      graph.get(dep).push(pkg);
      indegree.set(pkg, indegree.get(pkg) + 1);
    }
  }
  const queue = [...graph.keys()].filter(x => indegree.get(x) === 0);
  for (let head = 0; head < queue.length; head++)
    for (const next of graph.get(queue[head])) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  if (queue.length !== graph.size) throw new Error("cycle detected");
  return queue;
}
const deps = { app: ["api", "ui"], api: ["db", "auth"], auth: ["db"], ui: [], db: [] };
console.log(buildOrder(deps).join(" ")); // ui db auth api app
try { buildOrder({ ...deps, db: ["app"] }); } catch (e) { console.log(e.message); }
// O(V + E) time and space`,
          flag: "script",
          deep: {
            why: "topological sort موجود في أدوات بتستخدمها كل يوم: npm و pnpm بيرتبوا تثبيت الـ packages، و Turborepo و Nx بيرتبوا build الـ packages في monorepo، و GitHub Actions بيرتب الـ jobs حسب [[needs]]، والـ migrations بتتنفذ بالترتيب، و Excel بيعيد حساب الخلايا بعد اللي معتمدة عليه. وفي الانترفيو، Course Schedule من أشهر مسائل الـ graphs.",
            how: R`dry run على [[[[1,0],[2,0],[3,1],[3,2]]]]: الـ edges 0→1 و 0→2 و 1→3 و 2→3. الـ indegree: 0 عندها 0، و 1 و 2 عندهم 1، و 3 عندها 2.

الـ queue تبدأ بـ [0]. نطلّع 0، والترتيب [0]. نقلّل 1 و 2 لـ 0، فيدخلوا الـ queue.

نطلّع 1: نقلّل 3 لـ 1. نطلّع 2: نقلّل 3 لـ 0، فتدخل. نطلّع 3. الترتيب [0, 1, 2, 3]، وطوله 4 = n، يبقى مفيش دايرة.

في [[[[1,0],[0,1]]]]: الاتنين indegree بتاعهم 1، والـ queue بتبدأ فاضية، والترتيب طوله 0، فنرجّع [] (مستحيل).

الـ input بتاع LeetCode [[[course, pre]]] معناه «course محتاج pre»، فالسهم من pre لـ course. ده أكتر حاجة بتلخبط الناس في المسألة دي.

فيه طريقة تانية بـ DFS: رتّب العقد حسب وقت خروجها (post-order)، واعكس الترتيب. بتشتغل، بس محتاجة كشف دواير لوحدها (الدرس الجاي)، و Kahn أسهل تشرحه في الانترفيو.`,
            when: "أي «رتّب حاجات ليها شروط قبلها»: تبعيات، ومهام، وخطوات build، وترتيب قراءة دروس. ولو المطلوب «ممكن ولا لأ» بس (Course Schedule I)، نفس الكود وارجع [[order.length === n]]. ولو محتاج أول ترتيب أبجديًا، بدّل الـ queue بـ min heap.",
            mistakes: R`عكس اتجاه السهم. ونسيان العقد اللي ملهاش أي edges (لازم تدخل الترتيب برضه). ونسيان التأكد من طول الترتيب في الآخر، فترجّع ترتيب ناقص وكأنه صح. وإنك تفترض إن فيه ترتيب واحد بس صح؛ أي ترتيب يحقق الشروط مقبول، وفي الانترفيو قول كده.`
          },
          lines: [
            "n كورس، و prereqs أزواج [الكورس، متطلبه].",
            "لكل كورس، قائمة الكورسات اللي بتفتح بعده.",
            "indegree: كل كورس مستني كام متطلب.",
            "لكل شرط.",
            "السهم من المتطلب للكورس.",
            "الكورس بقى مستني واحد زيادة.",
            "قفلة.",
            "الـ queue.",
            "كل كورس مش مستني حاجة يبدأ فيها.",
            "الترتيب النهائي.",
            "queue بمؤشر.",
            "الكورس اللي عليه الدور.",
            "خده.",
            "كل اللي كان مستنيه: قلّل، واللي بقى 0 يدخل الـ queue.",
            "قفلة.",
            "لو مخدناش كل الكورسات يبقى فيه دايرة، رجّع فاضي.",
            "قفلة.",
            "0 الأول، وبعدين 1 و 2، وبعدين 3.",
            "كل واحد مستني التاني: مستحيل.",
            "مفيش شروط: أي ترتيب، والكود بيطلّعهم بالترتيب."
          ]
        },
        {
          cmd: "cycle detection",
          title: "فيه دايرة في الـ graph؟ (circular imports و deadlocks)",
          desc: R`كشف الدواير بيختلف حسب نوع الـ graph:

directed graph: بـ DFS و ٣ حالات لكل عقدة: 0 لسه مازرتهاش، و 1 أنا جوه المسار الحالي بتاعها (نزلت منها ولسه مارجعتش)، و 2 خلصت كل اللي تحتها. لو قابلت عقدة حالتها 1، يبقى رجعت لحاجة لسه في المسار: دايرة. لو حالتها 2، دي اتفحصت قبل كده ومفيش منها دايرة، فوّتها.

ليه مش [[seen]] عادية؟ في شكل الـ diamond (0→1 و 0→2 و 1→2)، هتوصل لـ 2 مرتين من طريقين مختلفين. ده مش دايرة، بس Set عادية هتقول إنه دايرة.

undirected graph: كل edge بيبان من الناحيتين، فلازم تتجاهل الأب اللي جيت منه. لو قابلت جار اتزار ومش أبوك، يبقى فيه دايرة.

وللـ directed فيه طريقة تانية ببلاش: Kahn من الدرس اللي فات، لو الترتيب طلع ناقص.`,
          example: R`function hasCycleDirected(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) graph[u].push(v);
  const state = new Array(n).fill(0);
  const visit = u => {
    if (state[u] === 1) return true;
    if (state[u] === 2) return false;
    state[u] = 1;
    for (const v of graph[u]) if (visit(v)) return true;
    state[u] = 2;
    return false;
  };
  for (let u = 0; u < n; u++) if (visit(u)) return true;
  return false;
}
function hasCycleUndirected(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  const seen = new Array(n).fill(false);
  const visit = (u, parent) => {
    seen[u] = true;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (seen[v] || visit(v, u)) return true;
    }
    return false;
  };
  for (let u = 0; u < n; u++) if (!seen[u] && visit(u, -1)) return true;
  return false;
}
console.log(hasCycleDirected(3, [[0, 1], [1, 2], [2, 0]])); // true
console.log(hasCycleDirected(3, [[0, 1], [0, 2], [1, 2]])); // false
console.log(hasCycleUndirected(3, [[0, 1], [1, 2]])); // false
console.log(hasCycleUndirected(3, [[0, 1], [1, 2], [2, 0]])); // true
// both O(V + E) time, O(V) space`,
          try: R`اكشف الـ circular imports في مشروع: [[{ "a.js": ["b.js"], "b.js": ["c.js"], "c.js": ["a.js"], "d.js": ["a.js"] }]] (كل ملف والملفات اللي بيعملها import). اكتب [[findCycle(imports)]] ترجّع الدايرة نفسها كـ array، زي [[["a.js", "b.js", "c.js", "a.js"]]]، أو null لو مفيش. (احفظ المسار الحالي في stack، ولما تقابل عقدة حالتها 1، اقطع المسار من عندها.)`,
          sol: R`الإجابة: [[a.js → b.js → c.js → a.js]]. لو بدأت الـ DFS من [[d.js]] الأول برضه هتلاقي نفس الدايرة، بس d.js مش جزء منها، عشان كده بنقطع المسار من أول ظهور لـ [[a.js]] مش من أوله.

الحالات: [[path]] array فيها المسار الحالي. أول ما تنزل على ملف: حالته 1 و [[path.push]]. لما ترجع منه: حالته 2 و [[path.pop]]. لو قابلت ملف حالته 1: [[path.slice(path.indexOf(file))]] وضيف الملف في الآخر عشان تقفل الدايرة.

من غير دايرة (شيل [[c.js → a.js]]) الإجابة null.

ده بالظبط اللي أدوات زي madge و ESLint rule [[import/no-cycle]] بتعمله. و circular imports في Node بتطلّع bugs غريبة: الـ module بيستلم object ناقص لأن الملف التاني لسه ماخلصش تحميل.`,
          solCode: R`function findCycle(imports) {
  const state = new Map(), path = [];
  const visit = file => {
    if (state.get(file) === 1) return [...path.slice(path.indexOf(file)), file];
    if (state.get(file) === 2) return null;
    state.set(file, 1);
    path.push(file);
    for (const dep of imports[file] ?? []) {
      const cycle = visit(dep);
      if (cycle) return cycle;
    }
    path.pop();
    state.set(file, 2);
    return null;
  };
  for (const file of Object.keys(imports)) {
    const cycle = visit(file);
    if (cycle) return cycle;
  }
  return null;
}
console.log(findCycle({ "a.js": ["b.js"], "b.js": ["c.js"], "c.js": ["a.js"], "d.js": ["a.js"] })); // ['a.js', 'b.js', 'c.js', 'a.js']
console.log(findCycle({ "d.js": ["a.js"], "a.js": ["b.js"], "b.js": ["c.js"], "c.js": ["a.js"] })); // ['a.js', 'b.js', 'c.js', 'a.js']
console.log(findCycle({ "a.js": ["b.js"], "b.js": ["c.js"], "c.js": [] })); // null
// O(V + E) time, O(V) space`,
          flag: "script",
          deep: {
            why: "الدواير مشكلة حقيقية في الشغل: circular imports بتطلّع [[undefined]] في أماكن غريبة، و deadlock في الداتابيز هو دايرة «مين مستني مين»، والـ migration أو الـ build اللي معتمد على نفسه بيعلّق. وفي الانترفيو، Course Schedule في الأساس سؤال «فيه دايرة ولا لأ».",
            how: R`dry run للـ directed على [[0→1، 1→2، 2→0]]: [[visit(0)]]: حالتها 1. تنزل 1: حالتها 1. تنزل 2: حالتها 1. تنزل 0: حالتها 1 بالفعل، يعني 0 لسه في المسار: دايرة.

الـ diamond [[0→1، 0→2، 1→2]]: [[visit(0)]] تنزل 1، و 1 تنزل 2، و 2 ملهاش حاجة فتبقى 2 (خلصت). نرجع 1 تبقى 2. نرجع 0 وتنزل 2 تاني: حالتها 2، فوّت. مفيش دايرة. لو كنا بنستخدم Set عادية كانت هتقول «2 اتزارت» وتعتبرها دايرة.

الـ undirected على [[0-1، 1-2]]: [[visit(0, -1)]] تنزل 1 وأبوها 0. جيران 1: 0 (الأب، فوّت) و 2. تنزل 2 وأبوها 1. جيران 2: 1 (الأب). مفيش دايرة. ولو ضفت [[2-0]]: جيران 2 فيها 0، و 0 اتزارت ومش الأب، دايرة.

الـ loop الخارجي على كل العقد عشان الـ graph ممكن يبقى أكتر من جزيرة، والدايرة ممكن تبقى في أي واحدة.`,
            when: "directed (imports، تبعيات، مهام): ٣ حالات أو Kahn. undirected (شبكة، طرق): parent أو union-find (درس «union-find» في نفس المستوى، وبيبقى أسهل لما الـ edges بتيجي واحدة واحدة). ولو محتاج الدايرة نفسها مش مجرد true/false، الـ DFS بالـ path هو اللي بيطلّعها.",
            mistakes: R`Set واحدة في الـ directed فالـ diamond يبان دايرة. ونسيان الأب في الـ undirected فكل edge يبان دايرة (0 تروح 1، و 1 تشوف 0 «اتزارت»). ولو فيه edges مكررة بين نفس العقدتين (multi-graph)، مقارنة الأب بالقيمة بتفوّت الدايرة الصغيرة دي، والحل تقارن بـ id الـ edge. وإنك تنسى إن DFS الـ recursive على graph فيه مليون عقدة في خط ممكن يعمل stack overflow.`
          },
          lines: [
            "كشف دايرة في directed graph.",
            "adjacency list.",
            "السهم في اتجاه واحد بس.",
            "0 جديدة، 1 في المسار الحالي، 2 خلصت.",
            "visit بترجّع true لو لقت دايرة.",
            "رجعت لعقدة لسه في المسار: دايرة.",
            "اتفحصت قبل كده ومفيش منها دايرة.",
            "أنا دلوقتي في المسار.",
            "انزل على كل جار، ولو أي واحد لقى دايرة ارجع true.",
            "خلصت كل اللي تحتي من غير دواير.",
            "مفيش دايرة من هنا.",
            "قفلة visit.",
            "ابدأ من كل عقدة (العقد اللي خلصت بترجع على طول).",
            "مفيش دواير.",
            "قفلة.",
            "كشف دايرة في undirected graph.",
            "adjacency list.",
            "كل edge من الناحيتين.",
            "اللي اتزار.",
            "visit بتعرف هي جاية منين.",
            "علّم.",
            "لكل جار.",
            "ده اللي جيت منه، مش دايرة.",
            "جار اتزار ومش أبويا، أو دايرة تحت: دايرة.",
            "قفلة الـ for.",
            "مفيش.",
            "قفلة visit.",
            "كل جزيرة لوحدها.",
            "مفيش دواير.",
            "قفلة.",
            "0 ثم 1 ثم 2 ثم 0: دايرة.",
            "diamond: طريقين لـ 2، مش دايرة.",
            "خط: مفيش دايرة.",
            "مثلث: دايرة."
          ]
        }
      ]
    },
    {
      t: "heaps و priority queues",
      l: 3,
      n: "أصغر (أو أكبر) عنصر في O(1) وتطلّعه في O(log n): heap بإيدك، و kth largest، و top k، و merge k lists",
      items: [
        {
          cmd: "min heap (by hand)",
          title: "JavaScript معندهاش heap جاهز، اكتب واحد بإيدك",
          desc: R`الـ min heap: شجرة binary كاملة، كل عقدة فيها أصغر من (أو تساوي) أولادها. فالأصغر دايمًا في الـ root. بيدّيك ٣ عمليات: [[peek]] (الأصغر) في [[O(1)]]، و [[push]] و [[pop]] في [[O(log n)]].

مش محتاجين objects وأولاد: الشجرة الكاملة بتتخزّن في array عادية. العنصر في index i أولاده في [[2i + 1]] و [[2i + 2]]، وأبوه في [[(i - 1) >> 1]] (يعني قسمة على 2 وتقريب لتحت).

push: حط العنصر في آخر الـ array، وطالما أصغر من أبوه بدّلهم واطلع (sift up). pop: خد الـ root، وحط آخر عنصر مكانه، وطالما أكبر من أصغر ابن بدّلهم وانزل (sift down). الشجرة ارتفاعها [[log n]]، فكل عملية [[O(log n)]].

Python عندها [[heapq]]، و Java عندها [[PriorityQueue]]، لكن JavaScript مفيهاش حاجة جاهزة. في الانترفيو اكتبه أو اسأل «ينفع أفترض إن عندي MinHeap؟». في الشغل فيه packages جاهزة، وبيئة JavaScript في LeetCode عادةً فيها [[MinPriorityQueue]] من package اسمها [[@datastructures-js/priority-queue]]، بس متعتمدش عليها في انترفيو على whiteboard أو editor عادي.

الـ [[compare]] بيخلّي نفس الـ class ينفع max heap، أو heap على objects بأي مفتاح. احفظ الملف ده باسم [[min-heap.js]] جوه [[~/lab/dsa]]، لأن الدروس الجاية بتعمل له [[require]].`,
          example: R`class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }
  get size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(value) {
    const d = this.data;
    d.push(value);
    let i = d.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(d[i], d[parent]) >= 0) break;
      const tmp = d[i]; d[i] = d[parent]; d[parent] = tmp;
      i = parent;
    }
  }
  pop() {
    const d = this.data;
    if (d.length === 0) return undefined;
    const top = d[0];
    const last = d.pop();
    if (d.length > 0) {
      d[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = l + 1;
        let smallest = i;
        if (l < d.length && this.compare(d[l], d[smallest]) < 0) smallest = l;
        if (r < d.length && this.compare(d[r], d[smallest]) < 0) smallest = r;
        if (smallest === i) break;
        const tmp = d[i]; d[i] = d[smallest]; d[smallest] = tmp;
        i = smallest;
      }
    }
    return top;
  }
}
module.exports = { MinHeap };
if (require.main === module) {
  const h = new MinHeap();
  for (const x of [5, 3, 8, 1, 9, 2]) h.push(x);
  console.log(h.peek(), h.size); // 1 6
  const out = [];
  while (h.size) out.push(h.pop());
  console.log(out.join(" ")); // 1 2 3 5 8 9
  const maxHeap = new MinHeap((a, b) => b - a);
  [5, 3, 8].forEach(x => maxHeap.push(x));
  console.log(maxHeap.pop(), new MinHeap().pop()); // 8 undefined
}
// push and pop: O(log n); peek: O(1); n pushes: O(n log n)`,
          try: R`اختبر الـ heap بعشوائية: ضيف ١٠ آلاف رقم عشوائي، وطلّعهم كلهم، وقارن بـ [[sort]]. لازم يطلعوا متطابقين. وبعدين استخدمه كـ «task queue» بأولويات: كل مهمة [[{ name, priority }]]، والأولوية الأقل تطلع الأول، ولو أولويتين متساويتين يطلع اللي اتضاف الأول.`,
          sol: R`الاختبار العشوائي لازم يطبع [[true]]. لو طلع false، الغلط في الغالب في [[pop]]: يا إما نسيت حالة [[d.length > 0]] بعد الـ [[pop]] (heap فيه عنصر واحد)، يا إما بتقارن بالابن الشمال بس في الـ sift down.

المهام بأولويات: الـ heap مش stable، يعني عنصرين متساويين ممكن يطلعوا بأي ترتيب. عشان «اللي اتضاف الأول يطلع الأول»، ضيف عدّاد [[seq]] بيزيد مع كل push، وخلي الـ compare يقارن الأولوية الأول، ولو متساويين يقارن الـ seq. الناتج: [[deploy fix-bug write-docs lunch]] (deploy و fix-bug أولويتهم 1، و deploy اتضافت الأول).

الغلطة الشائعة: تعمل [[sort]] على الـ array بعد كل push. ده [[O(n log n)]] لكل عملية بدل [[O(log n)]].`,
          solCode: R`const { MinHeap } = require("./min-heap");
const nums = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1e6));
const h = new MinHeap();
nums.forEach(x => h.push(x));
const fromHeap = [];
while (h.size) fromHeap.push(h.pop());
const sorted = [...nums].sort((a, b) => a - b);
console.log(fromHeap.every((x, i) => x === sorted[i])); // true
let seq = 0;
const tasks = new MinHeap((a, b) => a.priority - b.priority || a.seq - b.seq);
const add = (name, priority) => tasks.push({ name, priority, seq: seq++ });
add("write-docs", 2); add("deploy", 1); add("lunch", 3); add("fix-bug", 1);
const order = [];
while (tasks.size) order.push(tasks.pop().name);
console.log(order.join(" ")); // deploy fix-bug write-docs lunch
// 10k pushes + pops: O(n log n)`,
          flag: "script",
          deep: {
            why: "الـ heap هو الأداة لأي «هات الأصغر/الأكبر دلوقتي، والبيانات بتتغير»: queue مهام بأولويات (BullMQ و Sidekiq بيستخدموا فكرة قريبة)، و timers في event loop، و Dijkstra، و «أعلى 10 منتجات مبيعًا» على stream بيانات. والـ sort مش بديل، لأن كل عنصر جديد هيحتاج sort من الأول.",
            how: R`push لـ [5, 3, 8, 1]: [[[5]]]. push 3: [[[5, 3]]]، 3 أصغر من أبوها 5، بدّل: [[[3, 5]]]. push 8: [[[3, 5, 8]]]، 8 أكبر من 3، خلاص. push 1: [[[3, 5, 8, 1]]]، أبوها index 1 (قيمته 5)، بدّل: [[[3, 1, 8, 5]]]، أبوها index 0 (قيمته 3)، بدّل: [[[1, 3, 8, 5]]].

pop: الـ top هو 1. آخر عنصر (5) يروح مكانه: [[[5, 3, 8]]]. أصغر ابن لـ 5 هو 3، بدّل: [[[3, 5, 8]]]. خلاص. رجّعنا 1، والأصغر الجديد 3 في الـ root.

الـ array مش مترتبة! [[[1, 3, 8, 5]]] heap صحيح. الضمان الوحيد إن كل أب أصغر من أولاده، وده كفاية عشان الـ root يبقى الأصغر.

[[module.exports]] و [[require.main === module]]: الملف ده بيصدّر الـ class عشان الدروس الجاية تستخدمه، والـ demo بتتنفذ بس لو شغّلت الملف نفسه بـ [[node min-heap.js]]، مش لما حد يعمله require.

بناء heap من array موجودة ممكن يتعمل في [[O(n)]] (heapify: sift down من نص الـ array لأولها)، بس الـ push واحد واحد [[O(n log n)]] كفاية في أغلب الحالات.`,
            when: "لما محتاج الأصغر أو الأكبر أكتر من مرة، والعناصر بتدخل وتطلع. لو محتاج الأصغر مرة واحدة بس: [[Math.min]] أو loop، [[O(n)]]. لو البيانات ثابتة ومحتاجها كلها مترتبة: sort مرة. لو محتاج تدوّر على أي عنصر أو تمسحه من النص، الـ heap مش مناسب (العملية دي [[O(n)]] فيه).",
            mistakes: R`[[Math.floor(i / 2)]] كأب بدل [[(i - 1) >> 1]] مع array بتبدأ من 0. ونسيان إن الـ heap فيه عنصر واحد في [[pop]] (تحط الـ last مكان الـ top وترجّعه تاني). والـ compare بالطرح [[a - b]] بيقع مع strings (ترجع NaN)؛ استخدم [[a.localeCompare(b)]]. وفي الانترفيو: «heap مترتب؟» لأ، والـ sift down بيقارن بأصغر ابن مش بأي ابن.`
          },
          lines: [
            "الـ class بتاع الـ heap.",
            "compare زي بتاع sort: سالب يعني a يطلع قبل b. الـ default أرقام من الصغير.",
            "الشجرة متخزنة في array.",
            "نحفظ الـ compare.",
            "قفلة الـ constructor.",
            "عدد العناصر.",
            "الأصغر من غير ما نشيله.",
            "إضافة عنصر.",
            "اختصار.",
            "حطه في آخر الـ array (آخر مكان في الشجرة).",
            "مكانه.",
            "sift up: طالما مش الـ root.",
            "index الأب.",
            "مش أصغر من أبوه: مكانه صح، وقّف.",
            "أصغر: بدّله مع أبوه.",
            "واطلع مكان الأب.",
            "قفلة الـ while.",
            "قفلة push.",
            "طلّع الأصغر.",
            "اختصار.",
            "فاضي: مفيش حاجة.",
            "الأصغر هو اللي هنرجّعه.",
            "شيل آخر عنصر.",
            "لو لسه فيه عناصر.",
            "حط الأخير مكان الـ root.",
            "sift down من الـ root.",
            "لحد ما يلاقي مكانه.",
            "index الابنين.",
            "افترض إن أنا الأصغر.",
            "الشمال أصغر؟",
            "اليمين أصغر من الأصغر لحد دلوقتي؟",
            "أنا أصغر من الاتنين: مكاني صح.",
            "بدّل مع أصغر ابن.",
            "وانزل مكانه.",
            "قفلة الـ while.",
            "قفلة الـ if.",
            "رجّع الأصغر.",
            "قفلة pop.",
            "قفلة الـ class.",
            "صدّر الـ class للملفات التانية.",
            "الـ demo تشتغل بس لو الملف ده اتشغّل مباشرة.",
            "heap جديد.",
            "ضيف ٦ أرقام.",
            "الأصغر 1، والعدد 6.",
            "هنطلّعهم كلهم.",
            "كل pop بيطلّع الأصغر اللي فاضل.",
            "طلعوا مترتبين: ده heap sort.",
            "max heap بنفس الكود: اعكس الـ compare.",
            "ضيف ٣ أرقام.",
            "الأكبر طلع الأول، و pop على heap فاضي undefined.",
            "قفلة الـ if."
          ]
        },
        {
          cmd: "kth largest",
          title: "تاني أكبر رقم، أو الـ k أكبر، من غير ما ترتّب كل حاجة",
          desc: R`الحل البديهي: رتّب تنازلي وخد العنصر [[k - 1]]. ده [[O(n log n)]] وبيشتغل، واذكره الأول في الانترفيو.

الحل بالـ heap: خلّي min heap حجمه k بالظبط. عدّي على الأرقام: ضيف كل رقم، ولو الحجم عدّى k شيل الأصغر. في الآخر الـ heap فيه أكبر k أرقام، وأصغرهم (الـ root) هو الـ k أكبر.

ليه min heap مش max heap؟ لأنك عايز تطرد الأصغر كل مرة: أي رقم أصغر من كل الـ k اللي معاك مش ممكن يبقى من «أكبر k».

الـ Big-O: [[O(n log k)]]. لو k صغير (أعلى 10 من مليون)، ده أسرع بكتير من sort، والذاكرة [[O(k)]] بدل [[O(n)]]. والأهم إنه بيشتغل على stream: الأرقام بتيجي واحد واحد ومش لازم تبقى كلها في الذاكرة.`,
          example: R`const { MinHeap } = require("./min-heap");
function kthLargest(nums, k) {
  const heap = new MinHeap();
  for (const x of nums) {
    heap.push(x);
    if (heap.size > k) heap.pop();
  }
  return heap.peek();
}
const bySort = (nums, k) => [...nums].sort((a, b) => b - a)[k - 1];
console.log(kthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(kthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
console.log(kthLargest([7], 1)); // 7
console.log(bySort([3, 2, 1, 5, 6, 4], 2)); // 5
// heap: O(n log k) time, O(k) space; sort: O(n log n) time, O(n) space`,
          try: R`حل «Kth Largest Element in a Stream»: class اسمه [[KthLargest]] بياخد k وأرقام أولية، وفيه [[add(val)]] بتضيف رقم وترجّع الـ k أكبر لحد دلوقتي. جرّب [[new KthLargest(3, [4, 5, 8, 2])]] وبعدين [[add]] لـ 3 و 5 و 10 و 9 و 4، والمفروض يطلع 4 و 5 و 5 و 8 و 8.`,
          sol: R`الناتج: [[4 5 5 8 8]]. نفس الفكرة: heap حجمه k، والـ [[add]] بتعمل push، ولو الحجم عدّى k تعمل pop، وترجّع [[peek]]. كل add [[O(log k)]].

dry run: بعد الأرقام الأولية الـ heap فيه [4, 5, 8] (2 اتطردت). add 3: دخلت وطلعت على طول، والـ root لسه 4. add 5: [4, 5, 5, 8] نطرد 4، الـ root 5. add 10: نطرد 5، والـ heap [5, 8, 10]، الـ root 5. add 9: نطرد 5، الـ root 8. add 4: تدخل وتطلع، 8.

الغلطة الشائعة: تخزّن كل الأرقام في array وتعمل sort مع كل add، [[O(n log n)]] لكل add. وغلطة تانية: تنسى إن الأرقام الأولية ممكن تبقى أقل من k، فالـ [[peek]] يرجّع رقم مش هو الـ k أكبر لحد ما يتملي.`,
          solCode: R`const { MinHeap } = require("./min-heap");
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = new MinHeap();
    for (const x of nums) this.add(x);
  }
  add(val) {
    this.heap.push(val);
    if (this.heap.size > this.k) this.heap.pop();
    return this.heap.peek();
  }
}
const s = new KthLargest(3, [4, 5, 8, 2]);
console.log([3, 5, 10, 9, 4].map(x => s.add(x)).join(" ")); // 4 5 5 8 8
// add: O(log k) time; O(k) space`,
          flag: "script",
          deep: {
            why: "«أعلى k» سؤال في كل dashboard: أكتر 10 منتجات مبيعًا، وأبطأ 5 endpoints، وأكتر المستخدمين نشاطًا. ولما البيانات كبيرة أو جاية كـ stream (logs و events)، مش هتقدر تعمل sort لكل حاجة كل مرة. و Kth Largest من أشهر مسائل الـ heap في الانترفيو.",
            how: R`dry run لـ [[[3, 2, 1, 5, 6, 4]]] و k = 2: push 3: [3]. push 2: [2, 3]. push 1: [1, 2, 3]، الحجم 3 > 2، pop الأصغر (1): [2, 3]. push 5: pop 2: [3, 5]. push 6: pop 3: [5, 6]. push 4: pop 4: [5, 6]. الـ peek = 5، تاني أكبر رقم.

التكرار بيتعد: في [[[3, 2, 3, 1, 2, 4, 5, 5, 6]]] و k = 4، الترتيب التنازلي 6 5 5 4 ...، فالـ 4 أكبر هو 4. الـ 5 المكررة بتتعد مرتين. لو المطلوب «الـ k أكبر رقم مختلف»، اعمل [[new Set]] الأول.

فيه حل تالت: Quickselect (زي quick sort بس بتنزل في ناحية واحدة بس): [[O(n)]] في المتوسط و [[O(n^2)]] في أسوأ حالة، ومش بيشتغل على stream. اذكره في الانترفيو كـ follow-up.`,
            when: "k صغير و n كبير، أو بيانات جاية stream: heap حجمه k. محتاج كل العناصر مترتبة: sort. سؤال واحد على array ثابتة وعايز أسرع حاجة في المتوسط: quickselect. والعكس «الـ k أصغر» بـ max heap حجمه k.",
            mistakes: R`max heap فيه كل العناصر وتعمل pop k مرات: بيشتغل بس [[O(n + k log n)]] وذاكرة [[O(n)]]، وده مش اللي الانترفيور عايزه. وإنك تنسى إن [[sort()]] من غير compare بيرتب الأرقام كـ strings ([[[10, 9, 1].sort()]] بتدّي [[[1, 10, 9]]]). وإنك تخلط بين «k أكبر» (index k - 1 في الترتيب التنازلي) و index k.`
          },
          lines: [
            "الـ heap من درس «min heap (by hand)»، والملف جنب الملف ده.",
            "الـ k أكبر رقم.",
            "min heap.",
            "عدّي على الأرقام.",
            "ضيف الرقم.",
            "لو بقوا أكتر من k، اطرد الأصغر.",
            "قفلة.",
            "الأصغر في أكبر k هو الإجابة.",
            "قفلة.",
            "الحل البديهي للمقارنة.",
            "تاني أكبر: 5.",
            "رابع أكبر مع تكرار: 4.",
            "عنصر واحد.",
            "الـ sort بيدّي نفس الإجابة."
          ]
        },
        {
          cmd: "top k frequent",
          title: "أكتر k عناصر تكرارًا (Top K Frequent Elements)",
          desc: R`خطوتين: عدّ التكرار بـ Map (زي درس «frequency count»)، وبعدين هات أعلى k حسب العدد.

بالـ heap: نفس فكرة kth largest، بس الـ heap فيه أزواج [[[العنصر، العدد]]] والمقارنة بالعدد. [[O(n log k)]].

بالـ bucket sort: التكرار مستحيل يزيد عن n. فاعمل array طولها n + 1، والخانة c فيها العناصر اللي اتكررت c مرة. وامشي من آخرها لحد ما تجمّع k. [[O(n)]]، أسرع من أي sort، لأنك استغليت إن القيم (التكرارات) محدودة.

والاتنين بيبدأوا بالـ Map اللي بتاخد [[O(n)]] وقت و [[O(u)]] ذاكرة (u عدد العناصر المختلفة).`,
          example: R`const { MinHeap } = require("./min-heap");
function countAll(nums) {
  const count = new Map();
  for (const x of nums) count.set(x, (count.get(x) ?? 0) + 1);
  return count;
}
function topKHeap(nums, k) {
  const heap = new MinHeap((a, b) => a[1] - b[1]);
  for (const entry of countAll(nums)) {
    heap.push(entry);
    if (heap.size > k) heap.pop();
  }
  const out = [];
  while (heap.size) out.push(heap.pop()[0]);
  return out.reverse();
}
function topKBucket(nums, k) {
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [x, c] of countAll(nums)) buckets[c].push(x);
  const out = [];
  for (let c = nums.length; c > 0 && out.length < k; c--) out.push(...buckets[c]);
  return out.slice(0, k);
}
console.log(topKHeap([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKBucket([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKHeap([4], 1), topKBucket([5, 5, 6], 1)); // [4] [5]
// heap: O(n log k) time; bucket: O(n) time; both O(n) space`,
          try: R`حل «Top K Frequent Words»: نفس المسألة على كلمات، بس لو كلمتين نفس التكرار، اللي أبجديًا أصغر تيجي الأول. [[["i", "love", "leetcode", "i", "love", "coding"]]] و k = 2 الإجابة [[["i", "love"]]]، و [[["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"]]] و k = 4 الإجابة [[["the", "is", "sunny", "day"]]]. فكّر كويس في الـ compare بتاع الـ min heap.`,
          sol: R`الإجابتين: [[i love]] و [[the is sunny day]].

الـ compare في الـ min heap بيحدد مين يطلع (يتطرد) الأول. عايز تطرد الأقل تكرارًا، ولو متساويين تطرد اللي أبجديًا أكبر (عشان الأصغر أبجديًا هو اللي يفضل). فـ [[(a, b) => a[1] - b[1] || b[0].localeCompare(a[0])]]. لاحظ إن الـ tie-break معكوس ([[b]] قبل [[a]]).

في الآخر اعكس الناتج، لأن الـ heap بيطلّع الأضعف الأول.

الحل الأبسط اللي ينفع تقوله الأول: [[[...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))]] وخد أول k. [[O(u log u)]]، وكفاية في أغلب الحالات، وبعدين قول «لو u كبير، heap حجمه k».

الغلطة الشائعة: تكتب الـ tie-break بنفس اتجاه الـ sort العادي في الـ min heap، فيطلعلك [[day]] بدل [[sunny]] في الحالات المتساوية.`,
          solCode: R`const { MinHeap } = require("./min-heap");
function topKWords(words, k) {
  const count = new Map();
  for (const w of words) count.set(w, (count.get(w) ?? 0) + 1);
  const heap = new MinHeap((a, b) => a[1] - b[1] || b[0].localeCompare(a[0]));
  for (const entry of count) {
    heap.push(entry);
    if (heap.size > k) heap.pop();
  }
  const out = [];
  while (heap.size) out.push(heap.pop()[0]);
  return out.reverse();
}
console.log(topKWords(["i", "love", "leetcode", "i", "love", "coding"], 2)); // ['i', 'love']
console.log(topKWords(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)); // ['the', 'is', 'sunny', 'day']
// O(n + u log k) time, O(u) space (u = distinct words)`,
          flag: "script",
          deep: {
            why: "أكتر hashtags استخدامًا، وأكتر أخطاء بتظهر في الـ logs، وأكتر كلمات بيدوّر عليها الناس، وأكتر صفحات زيارة. «عدّ وهات الأعلى» من أكتر الحاجات اللي هتكتبها في analytics، والانترفيو بيحبها لأنها بتجمع hash map و heap مع بعض.",
            how: R`الـ Map بعد العدّ: [[1 → 3، 2 → 2، 3 → 1]]. الـ Map في JavaScript لما تعمل عليها [[for...of]] بتطلّع أزواج [[[key, value]]]، فالـ heap بياخدها زي ما هي.

heap بـ k = 2: push [1, 3]. push [2, 2]. push [3, 1]، الحجم 3، pop الأقل تكرارًا [3, 1]. الباقي [2, 2] و [1, 3]. الـ pop بيطلّعهم من الأقل للأكتر: 2 ثم 1، فبنعكس: [1, 2].

الـ bucket: [[buckets[3] = [1]]]، و [[buckets[2] = [2]]]، و [[buckets[1] = [3]]]. من 6 لتحت: الخانات فاضية لحد 3، ناخد 1. خانة 2، ناخد 2. بقوا k، نقف.

الـ [[slice(0, k)]] في الآخر مهم: الـ bucket الواحد ممكن يبقى فيه أكتر من عنصر، و [[push(...)]] بتضيفهم كلهم، فممكن نعدّي k.`,
            when: "bucket sort لما القيم اللي بترتب بيها أرقام صحيحة ومحدودة (التكرار ≤ n). heap لما k صغير والبيانات كبيرة أو stream. sort عادي لما البيانات صغيرة، وده الاختيار الصح في الشغل في أغلب الأحيان لأنه أوضح. وفي الداتابيز: [[GROUP BY ... ORDER BY count DESC LIMIT k]] بيعمل ده كله.",
            mistakes: R`[[count[x]++]] على object من غير قيمة أولية بتطلّع NaN. واستخدام object بدل Map مع أرقام: الـ keys بتتحول لـ strings، فالناتج يطلع [[["1", "2"]]] بدل [[[1, 2]]]. ونسيان الـ [[reverse]] في آخر نسخة الـ heap. ونسيان الـ [[slice]] في نسخة الـ bucket. وفي الانترفيو اسأل: لو فيه تعادل على آخر مكان، أرجّع مين؟`
          },
          lines: [
            "الـ heap من ملف min-heap.js.",
            "دالة العدّ.",
            "Map من العنصر لعدد مرات ظهوره.",
            "عدّ كل عنصر.",
            "رجّعها.",
            "قفلة.",
            "الحل بالـ heap.",
            "min heap على الأزواج، والمقارنة بالعدد.",
            "كل زوج [العنصر، العدد].",
            "ضيفه.",
            "لو عدّينا k، اطرد الأقل تكرارًا.",
            "قفلة.",
            "هنجمّع الناتج.",
            "طلّع العناصر (من الأقل للأكتر).",
            "اعكس عشان الأكتر تكرارًا الأول.",
            "قفلة.",
            "الحل بالـ bucket sort.",
            "خانة لكل تكرار ممكن من 0 لـ n.",
            "كل عنصر في خانة عدد تكراره.",
            "الناتج.",
            "من أعلى تكرار لتحت، لحد ما نجمّع k.",
            "ممكن نكون عدّينا k لو الخانة فيها أكتر من عنصر.",
            "قفلة.",
            "1 اتكرر ٣ مرات و 2 مرتين.",
            "نفس الإجابة بالـ bucket.",
            "عنصر واحد، وحالة فيها تكرار واضح."
          ]
        },
        {
          cmd: "merge k sorted lists",
          title: "ادمج k linked lists مترتبين في list واحدة مترتبة",
          desc: R`في درس «merge (dummy head)» دمجنا اتنين. مع k lists، الحل البديهي تدمجهم واحدة واحدة: الأولى مع التانية، والناتج مع التالتة... ده [[O(N × k)]] (N مجموع العقد كلها)، لأن الناتج اللي بيكبر بيتعدّى عليه تاني كل مرة.

بالـ heap: في أي لحظة، العنصر الجاي في الناتج هو أصغر واحد بين «رؤوس» الـ k lists. فحط الرؤوس في min heap. اسحب الأصغر، ضيفه للناتج، ولو ليه [[next]] حطه في الـ heap مكانه. الـ heap عمره ما بيبقى فيه أكتر من k عقدة، فكل عملية [[O(log k)]]، والإجمالي [[O(N log k)]].

والـ dummy head نفس الحيلة بتاعة درس الدمج: عقدة وهمية في الأول عشان ما نعملش if لأول عنصر.`,
          example: R`const { MinHeap } = require("./min-heap");
const toList = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = list => { const out = []; for (let n = list; n; n = n.next) out.push(n.val); return out; };
function mergeKLists(lists) {
  const heap = new MinHeap((a, b) => a.val - b.val);
  for (const head of lists) if (head) heap.push(head);
  const dummy = { next: null };
  let tail = dummy;
  while (heap.size) {
    const node = heap.pop();
    tail.next = node;
    tail = node;
    if (node.next) heap.push(node.next);
  }
  return dummy.next;
}
const lists = [[1, 4, 5], [1, 3, 4], [2, 6]].map(toList);
console.log(toArray(mergeKLists(lists)).join(" ")); // 1 1 2 3 4 4 5 6
console.log(toArray(mergeKLists([]))); // []
console.log(toArray(mergeKLists([null, toList([0])]))); // [0]
// N total nodes, k lists: O(N log k) time, O(k) space for the heap`,
          try: R`حلها من غير heap بالتقسيم (divide and conquer): ادمج الـ lists اتنين اتنين (0 مع 1، و 2 مع 3، ...)، وبعدين ادمج النواتج اتنين اتنين، لحد ما تفضل واحدة. زي merge sort بالظبط. احسب الـ Big-O. وبعدين طبّقها على حاجة حقيقية: ٣ ملفات logs كل واحد مترتب بالوقت، ادمجهم في timeline واحد.`,
          sol: R`الناتج [[1 1 2 3 4 4 5 6]] زي نسخة الـ heap.

الـ Big-O: كل «جولة» بتعدّي على كل العقد مرة، [[O(N)]]، وعدد الجولات [[log k]] (كل جولة عدد الـ lists بيقل للنص)، فالإجمالي [[O(N log k)]]، نفس الـ heap، ومن غير heap خالص، وذاكرة [[O(1)]] زيادة (غير الـ array بتاعة الـ lists).

الغلطة الشائعة: تدمج [[result = merge(result, lists[i])]] في loop، وده الحل البديهي [[O(N × k)]]، مش التقسيم.

الـ logs: كل سطر بيبدأ بالوقت بنفس الشكل ([[HH:MM]])، فمقارنة الـ strings بـ [[<=]] بترتبهم صح، ونفس [[mergeTwo]] بتشتغل من غير تعديل. لو الوقت بصيغة تانية، قارن بـ [[Date.parse]] بدل الـ string نفسها. ونفس الفكرة (external merge sort) هي اللي بتستخدمها قواعد البيانات عشان ترتب بيانات أكبر من الـ RAM: ترتب أجزاء صغيرة وتكتبها على الديسك، وبعدين تدمجها بـ heap.`,
          solCode: R`const toList = arr => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = list => { const out = []; for (let n = list; n; n = n.next) out.push(n.val); return out; };
function mergeTwo(a, b) {
  const dummy = { next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; } else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a ?? b;
  return dummy.next;
}
function mergeKDivide(lists) {
  if (lists.length === 0) return null;
  let round = lists;
  while (round.length > 1) {
    const next = [];
    for (let i = 0; i < round.length; i += 2) next.push(mergeTwo(round[i], round[i + 1] ?? null));
    round = next;
  }
  return round[0];
}
console.log(toArray(mergeKDivide([[1, 4, 5], [1, 3, 4], [2, 6]].map(toList))).join(" ")); // 1 1 2 3 4 4 5 6
console.log(toArray(mergeKDivide([]))); // []
const logs = [["09:00 api up", "09:05 db slow"], ["09:01 worker start"], ["09:03 cache miss", "09:06 cache hit"]];
console.log(toArray(mergeKDivide(logs.map(toList))).join(" | ")); // 09:00 api up | 09:01 worker start | 09:03 cache miss | 09:05 db slow | 09:06 cache hit
// O(N log k) time, O(1) extra space besides the list of heads`,
          flag: "script",
          deep: {
            why: "دمج مصادر مترتبة حاجة بتحصل في الشغل: logs من كذا سيرفر في timeline واحد، ونتايج بحث من كذا shard مترتبة بالـ score، و feed فيه posts من كذا مصدر مترتبة بالوقت. و Merge k Sorted Lists مسألة Hard مشهورة، والـ heap بيحوّلها لـ ١٠ سطور.",
            how: R`dry run: الرؤوس في الـ heap: 1 (من الأولى) و 1 (من التانية) و 2. اسحب 1 (من الأولى)، وحط 4 مكانها: الـ heap [1، 2، 4]. اسحب 1 (التانية)، وحط 3: [2، 3، 4]. اسحب 2، وحط 6: [3، 4، 6]. وهكذا لحد ما الـ heap يفضى.

ليه الـ heap فيه عقد مش أرقام؟ عشان لما نسحب عقدة نعرف [[next]] بتاعها ونحطه. والـ compare بيقارن [[a.val]].

إحنا مش بنعمل عقد جديدة: بنوصّل العقد الموجودة ببعض بتغيير [[next]]. عشان كده الذاكرة الزيادة [[O(k)]] للـ heap بس. لكن ده معناه إن الـ lists الأصلية اتغيرت.

[[toList]] بتبني linked list من array بـ [[reduceRight]]: بتبدأ من الآخر وكل عقدة بتشاور على اللي بعدها. و [[toArray]] العكس، عشان نطبع.`,
            when: "k مصادر مترتبة وعايز ناتج واحد مترتب: heap بحجم k. لو المصادر arrays مش lists، احفظ في الـ heap [[[value, listIndex, elementIndex]]]. ولو k صغير (2 أو 3)، الدمج المباشر أبسط. ولو المصادر مش مترتبة أصلًا، اجمعهم واعمل sort.",
            mistakes: R`إنك تحط null في الـ heap (list فاضية) فالـ compare يقرا [[null.val]]. وإنك تحط كل العقد في الـ heap مرة واحدة: بيشتغل بس [[O(N log N)]] وذاكرة [[O(N)]]. وإنك تنسى تحط [[node.next]] بعد ما تسحب العقدة فتضيع باقي الـ list. وفي الانترفيو: اذكر الحل البديهي وليه [[O(N × k)]]، وبعدين الـ heap، وبعدين إن التقسيم بيدّي نفس الـ Big-O من غير heap.`
          },
          lines: [
            "الـ heap من ملف min-heap.js.",
            "تحويل array لـ linked list (من الآخر للأول).",
            "تحويل linked list لـ array عشان نطبع.",
            "دمج k lists.",
            "min heap على العقد، والمقارنة بالقيمة.",
            "حط رأس كل list مش فاضية.",
            "عقدة وهمية في أول الناتج.",
            "آخر عقدة في الناتج.",
            "طول ما فيه عقد.",
            "اسحب أصغر رأس.",
            "وصّلها بآخر الناتج.",
            "بقت هي الآخر.",
            "لو الـ list بتاعتها ليها باقي، حط العقدة الجاية مكانها.",
            "قفلة.",
            "الناتج بعد العقدة الوهمية.",
            "قفلة.",
            "٣ lists مترتبين.",
            "٨ عقد مترتبة.",
            "مفيش lists.",
            "list فاضية (null) و list فيها عنصر."
          ]
        }
      ]
    },
    {
      t: "dynamic programming و greedy",
      l: 3,
      n: "من memoization لجدول bottom-up: climbing stairs و coin change و LCS و knapsack، والـ greedy إمتى ينفع وإمتى يخونك",
      items: [
        {
          cmd: "bottom-up DP (table)",
          title: "من recursion بـ memo لجدول بيتملي من تحت لفوق (Climbing Stairs)",
          desc: R`في درس «memoization» حوّلنا fib من [[O(2^n)]] لـ [[O(n)]] بـ Map. ده اسمه top-down DP: بتبدأ من المطلوب وتنزل، وبتخزّن.

bottom-up DP: نفس الفكرة بالعكس. بدل recursion، اعمل array اسمها [[dp]] واملاها من أصغر حالة لحد المطلوب بـ loop. مفيش call stack (فمفيش stack overflow)، ومفيش Map، وفي الغالب أسرع.

أي DP بيتكتب بـ ٥ أسئلة، اكتبهم كـ comment قبل الكود:

١. الحالة: [[dp[i]]] معناها إيه بالظبط؟ (هنا: عدد الطرق للوصول للسلمة i.)

٢. الانتقال: [[dp[i]]] بتتحسب من إيه؟ (آخر خطوة كانت 1 أو 2، فـ [[dp[i] = dp[i - 1] + dp[i - 2]]].)

٣. الـ base cases: [[dp[0] = 1]] (طريقة واحدة: متتحركش)، و [[dp[1] = 1]].

٤. الترتيب: من الصغير للكبير، عشان لما تحسب i يكون اللي قبله جاهز.

٥. الإجابة: [[dp[n]]].

ولو كل خانة محتاجة آخر خانتين بس، مش محتاج الـ array كلها: متغيرين كفاية، والذاكرة تبقى [[O(1)]].`,
          example: R`function climbMemo(n, memo = new Map()) {
  if (n <= 1) return 1;
  if (memo.has(n)) return memo.get(n);
  const ways = climbMemo(n - 1, memo) + climbMemo(n - 2, memo);
  memo.set(n, ways);
  return ways;
}
function climbTable(n) {
  if (n <= 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}
function climbTwoVars(n) {
  let prev = 1, cur = 1;
  for (let i = 2; i <= n; i++) [prev, cur] = [cur, prev + cur];
  return cur;
}
console.log(climbMemo(5), climbTable(5), climbTwoVars(5)); // 8 8 8
console.log(climbTwoVars(45)); // 1836311903
console.log(climbTable(1), climbTwoVars(0)); // 1 1
// memo: O(n) time, O(n) map + O(n) stack; table: O(n) time, O(n) space; two vars: O(n) time, O(1) space`,
          try: R`حل «House Robber» بالـ ٥ أسئلة: بيوت في شارع، كل بيت فيه فلوس، ومينفعش تسرق بيتين جنب بعض. أقصى مبلغ كام؟ [[[2, 7, 9, 3, 1]]] الإجابة 12 (2 + 9 + 1)، و [[[2, 1, 1, 2]]] الإجابة 4. اكتبها بجدول الأول، وبعدين بمتغيرين. وبعدين «Min Cost Climbing Stairs»: [[[10, 15, 20]]] الإجابة 15.`,
          sol: R`House Robber: الحالة [[dp[i]]] = أقصى مبلغ من أول i بيوت. الانتقال: يا إما متسرقش البيت i (فالإجابة [[dp[i - 1]]])، يا إما تسرقه (فلوسه + [[dp[i - 2]]])، وخد الأكبر. الـ base: [[dp[0] = 0]]، و [[dp[1] = nums[0]]]. الإجابات 12 و 4 و 0 للشارع الفاضي.

[[[2, 1, 1, 2]]] بتوقع اللي بيفكر greedy («خد البيوت الزوجية أو الفردية»): الاتنين بيدّوا 3، والإجابة 4 (أول بيت وآخر بيت).

Min Cost Climbing Stairs: [[dp[i]]] = أقل تكلفة توصل للسلمة i، وتقدر تبدأ من 0 أو 1 ببلاش. [[dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])]]، والإجابة [[dp[n]]] (فوق آخر سلمة). [[[10, 15, 20]]] = 15، و [[[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]]] = 6.

الغلطة الشائعة: تعتبر الإجابة [[dp[n - 1]]] (آخر سلمة) بدل [[dp[n]]] (القمة اللي فوقها).`,
          solCode: R`function rob(nums) {
  let prev = 0, cur = 0;
  for (const x of nums) [prev, cur] = [cur, Math.max(cur, prev + x)];
  return cur;
}
function robTable(nums) {
  const dp = new Array(nums.length + 1).fill(0);
  if (nums.length) dp[1] = nums[0];
  for (let i = 2; i <= nums.length; i++) dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  return dp[nums.length];
}
function minCostClimbing(cost) {
  const dp = new Array(cost.length + 1).fill(0);
  for (let i = 2; i <= cost.length; i++)
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  return dp[cost.length];
}
console.log(rob([2, 7, 9, 3, 1]), robTable([2, 7, 9, 3, 1])); // 12 12
console.log(rob([2, 1, 1, 2]), rob([])); // 4 0
console.log(minCostClimbing([10, 15, 20])); // 15
console.log(minCostClimbing([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6
// all O(n) time; rob with two variables is O(1) space`,
          flag: "script",
          deep: {
            why: "DP هي الطريقة اللي بتحوّل مسائل «جرّب كل الاحتمالات» (exponential) لحاجة polynomial. في الانترفيو بتتسأل كتير لأنها بتفصل بين اللي حافظ حلول واللي بيعرف يبني الحل. وفي الشغل بتقابلها في diff بين نصين، و spell check، وتقسيم الفلوس، وترتيب الـ layout، وكل «أحسن اختيار» فيه قيود.",
            how: R`إمتى المسألة DP؟ علامتين: (١) optimal substructure: إجابة الكبيرة بتتبني من إجابات أصغر منها. (٢) overlapping subproblems: نفس المسألة الصغيرة بتتحسب أكتر من مرة في الـ recursion (زي fib).

الطريق العملي في الانترفيو: اكتب الـ recursion البديهية الأول (brute force)، وبعدين ضيف memo (top-down)، وبعدين لو عايز حوّلها لجدول (bottom-up)، وبعدين شوف لو ينفع تقلل الذاكرة. كل خطوة صح لوحدها، وكل خطوة بتبين إنك فاهم.

dry run للجدول مع n = 5: [[dp = [1, 1, 2, 3, 5, 8]]]. للسلمة 5: إما جيت من 4 (5 طرق) أو من 3 (3 طرق)، فـ 8.

ليه [[dp[0] = 1]] مش 0؟ «عدد الطرق إنك تفضل مكانك» = طريقة واحدة (متعملش حاجة). لو خليتها 0، [[dp[2]]] هتطلع 1 بدل 2. الـ base cases هي أكتر حاجة بتبوّظ حلول الـ DP.

[[[prev, cur] = [cur, prev + cur]]]: destructuring بيحسب الجهة اليمين كلها الأول، فمش محتاج متغير مؤقت.

climbTwoVars(45) = 1836311903، لسه أقل من [[Number.MAX_SAFE_INTEGER]]. بعد حوالي 78 الأرقام بتفقد الدقة، ولو محتاج الرقم مضبوط استخدم BigInt.`,
            when: "top-down (memo): أسهل تكتبه من الـ recursion، ومفيد لما مش كل الحالات محتاجة تتحسب. bottom-up: لما كل الحالات هتتحسب على أي حال، أو العمق كبير (n = مليون هيعمل stack overflow في الـ memo)، أو عايز تقلل الذاكرة. في الانترفيو أي واحدة صح، بس اعرف تحوّل من واحدة للتانية.",
            mistakes: R`إنك تبدأ تكتب جدول قبل ما تحدد [[dp[i]]] معناها إيه بالكلام، فتلخبط. والـ base cases الغلط ([[dp[0] = 0]] في عدّ الطرق). والـ off-by-one بين «أول i عناصر» و «العنصر i». والـ array بطول n بدل n + 1. وإنك تفكر greedy في مسألة DP (House Robber بـ «خد الزوجي أو الفردي»). وفي الانترفيو: قول الـ ٥ أسئلة بصوت عالي قبل الكود.`
          },
          lines: [
            "top-down: recursion + memo (زي fib).",
            "0 أو 1 سلمة: طريقة واحدة.",
            "اتحسبت قبل كده؟",
            "آخر خطوة يا 1 يا 2.",
            "خزّن.",
            "رجّع.",
            "قفلة.",
            "bottom-up: جدول.",
            "حالات صغيرة.",
            "dp[i] = عدد الطرق للسلمة i.",
            "base: متتحركش = طريقة واحدة.",
            "base: سلمة واحدة = طريقة واحدة.",
            "املى من تحت لفوق: كل خانة من اللي قبلها.",
            "الإجابة.",
            "قفلة.",
            "نفس الجدول بس بآخر خانتين بس.",
            "dp[i-2] و dp[i-1].",
            "حرّك الاتنين خطوة لقدام.",
            "cur = dp[n].",
            "قفلة.",
            "الـ ٣ نسخ نفس الإجابة.",
            "45 سلمة في لحظة.",
            "الحالات الصغيرة."
          ]
        },
        {
          cmd: "coin change (DP)",
          title: "أقل عدد عملات يكوّن مبلغ معين (Coin Change)",
          desc: R`عندك أنواع عملات (من كل نوع عدد لا نهائي)، وعايز أقل عدد عملات مجموعها amount بالظبط. ولو مستحيل، [[-1]].

الحالة: [[dp[a]]] = أقل عدد عملات يكوّن المبلغ a.

الانتقال: آخر عملة استخدمتها كانت c (أي عملة من الأنواع)، فالباقي [[a - c]] اتكوّن بأقل عدد ممكن. [[dp[a] = 1 + min(dp[a - c])]] على كل c ≤ a.

الـ base: [[dp[0] = 0]]. وكل الباقي يبدأ [[Infinity]] يعني «لسه مستحيل»، و [[Infinity + 1]] لسه Infinity، فالمستحيل بيفضل مستحيل من غير if.

وفيه أخت ليها: «عدد الطرق» (Coin Change II). نفس الجدول بس بتجمع بدل ما تاخد الأقل، وترتيب الـ loops بيفرق: لو العملات برّا، كل تركيبة بتتعد مرة واحدة ([1, 2] زي [2, 1]).`,
          example: R`function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++)
    for (const c of coins)
      if (c <= a && dp[a - c] + 1 < dp[a]) dp[a] = dp[a - c] + 1;
  return dp[amount] === Infinity ? -1 : dp[amount];
}
function countWays(coins, amount) {
  const ways = new Array(amount + 1).fill(0);
  ways[0] = 1;
  for (const c of coins)
    for (let a = c; a <= amount; a++) ways[a] += ways[a - c];
  return ways[amount];
}
console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1, 3, 4], 6)); // 2
console.log(coinChange([7], 0)); // 0
console.log(countWays([1, 2, 5], 5)); // 4
// both: O(amount × coins) time, O(amount) space`,
          try: R`خلّي [[coinChange]] ترجّع العملات نفسها مش عددها بس: احفظ في array تانية [[pick[a]]] آخر عملة اخترتها للمبلغ a، وارجع بيها من amount لـ 0. [[([1, 2, 5], 11)]] المفروض ترجّع [[[5, 5, 1]]] (أو أي ترتيب ليها). وبعدين في [[countWays]] بدّل ترتيب الـ loopين (المبلغ برّا والعملات جوه)، وشوف [[([1, 2, 5], 5)]] بقت كام، وفسّر ليه.`,
          sol: R`[[coinsUsed([1, 2, 5], 11)]] = [[[1, 5, 5]]] بالكود اللي تحت (الترتيب حسب [[pick]])، و [[([1, 3, 4], 6)]] = [[[3, 3]]]، و [[([2], 3)]] = [[null]].

كل ما [[dp[a]]] تتحسن، احفظ [[pick[a] = c]]. وبعدين: [[while (a > 0) { out.push(pick[a]); a -= pick[a]; }]].

بتبديل الـ loops: الناتج بيبقى 9 بدل 4. ليه؟ لما المبلغ برّا، لكل مبلغ بتجرّب كل العملات كـ «آخر عملة»، فـ [1, 2, 2] و [2, 1, 2] و [2, 2, 1] بيتعدوا ٣ طرق مختلفة. ده عدد الترتيبات (permutations)، ودي مسألة تانية اسمها Combination Sum IV. لما العملات برّا، كل عملة بتتضاف بعد اللي قبلها بس، فكل تركيبة بتتعد مرة واحدة.

الغلطة الشائعة: تبدأ [[dp]] بـ 0 بدل Infinity، فكل المبالغ تبان «ممكنة بـ 0 عملات».`,
          solCode: R`function coinsUsed(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity), pick = new Array(amount + 1).fill(0);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++)
    for (const c of coins)
      if (c <= a && dp[a - c] + 1 < dp[a]) { dp[a] = dp[a - c] + 1; pick[a] = c; }
  if (dp[amount] === Infinity) return null;
  const out = [];
  for (let a = amount; a > 0; a -= pick[a]) out.push(pick[a]);
  return out;
}
function countOrders(coins, amount) {
  const ways = new Array(amount + 1).fill(0);
  ways[0] = 1;
  for (let a = 1; a <= amount; a++)
    for (const c of coins) if (c <= a) ways[a] += ways[a - c];
  return ways[amount];
}
console.log(coinsUsed([1, 2, 5], 11)); // [1, 5, 5]
console.log(coinsUsed([1, 3, 4], 6), coinsUsed([2], 3)); // [3, 3] null
console.log(countOrders([1, 2, 5], 5)); // 9
// O(amount × coins) time, O(amount) space`,
          flag: "script",
          deep: {
            why: "Coin Change هي مسألة الـ DP الكلاسيكية اللي بتفرق بين greedy و DP، وبتتسأل كتير. وفكرتها (أقل تكلفة لتكوين حاجة من قطع) بتظهر في تقسيم مبلغ على باقات، وأقل عدد رسايل لإرسال بيانات بأحجام معينة، وتقطيع الموارد.",
            how: R`dry run لـ [[[1, 3, 4]]] و 6: [[dp[0] = 0]]. [[dp[1]]]: بعملة 1 من dp[0]، = 1. [[dp[2]]] = 2 (1 + 1). [[dp[3]]]: من dp[2] بـ 1 = 3، أو من dp[0] بـ 3 = 1، فـ 1. [[dp[4]]]: بـ 4 من dp[0] = 1. [[dp[5]]]: من dp[4] بـ 1 = 2، أو dp[2] بـ 3 = 3، أو dp[1] بـ 4 = 2، فـ 2. [[dp[6]]]: من dp[5] بـ 1 = 3، أو dp[3] بـ 3 = 2، أو dp[2] بـ 4 = 3، فـ 2.

الإجابة 2 (3 + 3). الـ greedy كان هياخد 4 الأول، وبعدين 1 و 1، يعني 3 عملات. ده بالظبط المثال المضاد في درس الـ greedy.

الـ countWays لـ [[[1, 2, 5]]] و 5: بعد العملة 1: كل مبلغ طريقة واحدة. بعد 2: [[ways = [1, 1, 2, 2, 3, 3]]]. بعد 5: [[ways[5] += ways[0]]]، فـ 4. الطرق: 5، و 2+2+1، و 2+1+1+1، و 1×5.

Big-O: [[O(amount × coins)]]. ده اسمه pseudo-polynomial: لو amount مليار، الجدول مستحيل حتى لو العملات ٣ بس.`,
            when: "«أقل/أكتر عدد» أو «عدد الطرق» لتكوين هدف من قطع بتتكرر: DP على الهدف. لو كل قطعة مرة واحدة بس، ده knapsack (الدرس الجاي). لو العملات «canonical» زي الجنيه والدولار، الـ greedy بيشتغل، بس مش مضمون لأي نظام عملات.",
            mistakes: R`الـ greedy (خد أكبر عملة الأول). وبداية [[dp]] بـ 0 بدل Infinity. واستخدام recursion من غير memo ([[O(coins^amount)]]). وترتيب الـ loops الغلط في عدّ الطرق. ونسيان إن amount = 0 إجابته 0 مش -1. وفي الانترفيو: قول إن ده DP مش greedy، واديهم المثال المضاد [[[1, 3, 4]]] و 6.`
          },
          lines: [
            "أقل عدد عملات.",
            "dp[a] = أقل عدد للمبلغ a، وكله مستحيل في الأول.",
            "المبلغ 0 محتاج 0 عملات.",
            "لكل مبلغ من الصغير للكبير.",
            "جرّب كل عملة كآخر عملة.",
            "لو العملة تنفع، والباقي ممكن، وده أحسن: خده.",
            "لسه مستحيل؟ -1.",
            "قفلة.",
            "عدد الطرق (من غير ما الترتيب يفرق).",
            "ways[a] = عدد الطرق للمبلغ a.",
            "المبلغ 0: طريقة واحدة (متاخدش حاجة).",
            "العملات برّا: كل تركيبة تتعد مرة واحدة.",
            "كل مبلغ ≥ العملة: ضيف طرق الباقي.",
            "الإجابة.",
            "قفلة.",
            "5 + 5 + 1.",
            "مبلغ فردي بعملة 2 بس: مستحيل.",
            "3 + 3، مش 4 + 1 + 1.",
            "مبلغ 0.",
            "٤ طرق للـ 5."
          ]
        },
        {
          cmd: "LCS (2D table)",
          title: "أطول subsequence مشتركة بين نصين (Longest Common Subsequence)",
          desc: R`subsequence: حروف من النص بنفس ترتيبها، بس مش لازم متجاورة. [["ace"]] subsequence من [["abcde"]]. الـ LCS بين نصين هي أطول subsequence موجودة في الاتنين.

هنا الحالة محتاجة رقمين، فالجدول 2D: [[dp[i][j]]] = طول الـ LCS بين أول i حروف من a وأول j حروف من b.

الانتقال: لو الحرف رقم i في a هو نفسه الحرف رقم j في b، يبقى هو جزء من الـ LCS: [[dp[i - 1][j - 1] + 1]]. لو مختلفين، واحد منهم على الأقل مش هيدخل، فخد الأحسن بين «شيل حرف من a» و «شيل حرف من b».

الـ base: الصف 0 والعمود 0 كلهم 0 (نص فاضي ملوش حاجة مشتركة مع أي حاجة). وعشان كده الجدول أكبر بواحد في كل اتجاه.

وعشان تطلّع النص نفسه مش طوله بس: ابدأ من آخر خانة وارجع لورا. لو الحرفين متساويين، ده حرف في الناتج وارجع قطري. غير كده، روح ناحية الخانة الأكبر.`,
          example: R`function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  let i = a.length, j = b.length, text = "";
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) { text = a[i - 1] + text; i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
    else j--;
  }
  return { length: dp[a.length][b.length], text };
}
console.log(lcs("abcde", "ace")); // { length: 3, text: 'ace' }
console.log(lcs("abc", "def")); // { length: 0, text: '' }
console.log(lcs("AGGTAB", "GXTXAYB")); // { length: 4, text: 'GTAB' }
// O(n × m) time and space (n and m are the two lengths)`,
          try: R`حل «Edit Distance»: أقل عدد عمليات (إضافة حرف، أو مسح حرف، أو تبديل حرف) عشان تحوّل كلمة لكلمة. [[("horse", "ros")]] = 3، و [[("intention", "execution")]] = 5، و [[("", "abc")]] = 3. نفس شكل الجدول بالظبط، بس فكّر: الصف 0 والعمود 0 قيمتهم إيه هنا؟`,
          sol: R`الإجابات 3 و 5 و 3.

[[dp[i][j]]] = أقل عمليات لتحويل أول i حروف من a لأول j حروف من b. الـ base مختلف عن LCS: [[dp[i][0] = i]] (امسح i حروف)، و [[dp[0][j] = j]] (ضيف j حروف). لو خليتهم 0 زي LCS، الإجابة هتطلع أقل من الحقيقة.

لو الحرفين متساويين: [[dp[i - 1][j - 1]]] من غير تكلفة. غير كده: 1 + الأقل بين [[dp[i - 1][j]]] (مسح)، و [[dp[i][j - 1]]] (إضافة)، و [[dp[i - 1][j - 1]]] (تبديل).

horse ← ros: horse → rorse (بدّل h بـ r) → rose (امسح r) → ros (امسح e). ٣ عمليات.

ده اسمه Levenshtein distance، وهو اللي ورا «هل تقصد...؟» في البحث، و fuzzy matching في أسماء المنتجات.`,
          solCode: R`function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => new Array(b.length + 1).fill(0).map((_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
}
console.log(editDistance("horse", "ros")); // 3
console.log(editDistance("intention", "execution")); // 5
console.log(editDistance("", "abc"), editDistance("same", "same")); // 3 0
// O(n × m) time and space`,
          flag: "script",
          deep: {
            why: "LCS هي الفكرة ورا أدوات الـ diff: لما [[git diff]] بيوريك السطور اللي اتضافت واتمسحت، هو بيدوّر على أكبر جزء مشترك بين النسختين (git بيستخدم خوارزمية Myers، وهي قريبة من الفكرة دي بس أسرع). ونفس الجدول بيستخدم في مقارنة DNA، وكشف النقل، و «هل تقصد» في البحث. وفي الانترفيو هي مدخل مسائل الـ DP على نصين.",
            how: R`الجدول لـ "abcde" و "ace" (الصفوف a، والأعمدة b):

الصف a: [[0 1 1 1]]. الحرف a مشترك من أول.

الصف b: [[0 1 1 1]]. b مش في "ace"، فبناخد الأكبر من فوق أو من الشمال.

الصف c: [[0 1 2 2]]. c = c، قطري + 1 = 2.

الصف d: [[0 1 2 2]]. والصف e: [[0 1 2 3]]. e = e، قطري + 1.

الإجابة في آخر خانة: 3. والرجوع: e = e، خدها وارجع قطري. d ≠ e، روح للأكبر. c = c خدها. b ≠ a، ... a = a خدها. النص "ace".

ليه [[a[i - 1]]] مش [[a[i]]]؟ لأن الجدول مزاح بواحد عشان الصف والعمود 0 (النص الفاضي). أكتر مصدر للـ bugs في الجداول 2D.

الذاكرة ممكن تبقى [[O(m)]] لو محتاج الطول بس: كل صف معتمد على الصف اللي قبله بس، فخلّي صفين. بس لو محتاج النص نفسه، لازم الجدول كله (أو خوارزمية Hirschberg).`,
            when: "أي مسألة على نصين أو قائمتين وسؤالها عن «مشترك» أو «تحويل» أو «تطابق»: LCS، و Edit Distance، و Longest Common Substring (متجاورة: الخانة بتبقى 0 لو الحرفين مختلفين)، و Interleaving String، و Regular Expression Matching. الجدول دايمًا (n + 1) × (m + 1).",
            mistakes: R`الخلط بين subsequence (مش لازم متجاورة) و substring (لازم متجاورة). والـ off-by-one بين الجدول والنص. وإنشاء الجدول بـ [[new Array(n).fill(new Array(m).fill(0))]]: كل الصفوف نفس الـ array! استخدم [[Array.from]]. ونسيان الـ base cases في Edit Distance. وفي الانترفيو: ارسم الجدول الصغير بإيدك قبل الكود، ده بيوفّر وقت.`
          },
          lines: [
            "LCS بين a و b.",
            "جدول (n+1) × (m+1) كله أصفار، وكل صف array مستقلة.",
            "لكل حرف في a.",
            "ولكل حرف في b.",
            "متساويين: قطري + 1. مختلفين: الأكبر من فوق أو من الشمال.",
            "نرجع من آخر خانة عشان نطلّع النص.",
            "طول ما لسه في الاتنين حروف.",
            "حرف مشترك: ضيفه في أول النص وارجع قطري.",
            "اللي فوق أكبر أو يساوي: اطلع.",
            "غير كده روح شمال.",
            "قفلة.",
            "الطول والنص.",
            "قفلة.",
            "a و c و e.",
            "مفيش حاجة مشتركة.",
            "مثال أطول: GTAB."
          ]
        },
        {
          cmd: "0/1 knapsack",
          title: "شنطة سعتها محدودة: تاخد أنهي حاجات عشان القيمة تبقى أعلى؟ (0/1 knapsack)",
          desc: R`عندك حاجات، لكل واحدة وزن وقيمة، وشنطة سعتها capacity. كل حاجة يا تاخدها كلها يا متاخدهاش (0 أو 1)، ومتاخدش نفس الحاجة مرتين. أعلى قيمة كام؟

الحالة: [[dp[c]]] = أعلى قيمة بسعة c باستخدام الحاجات اللي اتفحصت لحد دلوقتي. ولكل حاجة جديدة، لكل سعة: يا إما متاخدهاش ([[dp[c]]] زي ما هي)، يا إما تاخدها ([[dp[c - w] + v]]).

السر في اتجاه الـ loop: السعة لازم تمشي من الكبير للصغير. ليه؟ عشان [[dp[c - w]]] لسه بقيمتها «قبل الحاجة دي». لو مشيت من الصغير للكبير، [[dp[c - w]]] ممكن تكون اتحدثت بالحاجة نفسها، فتاخدها مرتين. ده بالظبط الفرق بين 0/1 knapsack و unbounded knapsack (زي coin change): نفس السطر، واتجاه الـ loop بس هو اللي بيتغير.

ليه مش greedy (خد الأعلى قيمة لكل كيلو)؟ لأن الحاجات مش بتتقسم. وزن 1 قيمة 1، ووزن 3 قيمة 4، ووزن 4 قيمة 5، ووزن 5 قيمة 7، وسعة 7: أعلى نسبة هي وزن 5 (1.4 لكل كيلو)، وبعدها يفضل 2 كيلو ماينفعش فيهم غير وزن 1 = 8. بس 3 + 4 = 9.`,
          example: R`function knapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (const [i, w] of weights.entries())
    for (let c = capacity; c >= w; c--)
      dp[c] = Math.max(dp[c], dp[c - w] + values[i]);
  return dp[capacity];
}
function unbounded(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (const [i, w] of weights.entries())
    for (let c = w; c <= capacity; c++)
      dp[c] = Math.max(dp[c], dp[c - w] + values[i]);
  return dp[capacity];
}
console.log(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)); // 9
console.log(knapsack([2], [3], 4), unbounded([2], [3], 4)); // 3 6
console.log(knapsack([5], [10], 4)); // 0
// O(n × capacity) time, O(capacity) space`,
          try: R`حل «Partition Equal Subset Sum»: تقدر تقسم الأرقام لمجموعتين مجموعهم متساوي؟ [[[1, 5, 11, 5]]] true (11 و 1 + 5 + 5)، و [[[1, 2, 3, 5]]] false. ده knapsack متنكر: السعة = نص المجموع، والسؤال «فيه مجموعة جزئية مجموعها بالظبط كده؟». استخدم جدول true/false بدل القيم.`,
          sol: R`الإجابات: [[true]] و [[false]]، و [[[1, 1]]] true، و [[[3]]] false، و [[[2, 6]]] false.

لو المجموع فردي: false على طول. غير كده [[target = sum / 2]]، و [[can[s]]] = «ممكن أكوّن المجموع s». [[can[0] = true]]. لكل رقم، من target لتحت: [[can[s] = can[s] || can[s - x]]]. ومن الكبير للصغير عشان كل رقم يتاخد مرة واحدة (0/1).

ليه الاتجاه مهم؟ جرّب [[[2, 6]]]: المجموع 8 و target 4، والصح false (المجاميع الممكنة 0 و 2 و 6 و 8 بس). لو مشيت من الصغير للكبير مع x = 2: [[can[2]]] بتبقى true، وبعدين [[can[4]]] بتبص على [[can[2]]] اللي لسه متحدثة بنفس الـ 2، فتبقى true غلط، لأنك استخدمت 2 مرتين.

وفي JavaScript فيه حيلة: [[Set]] فيها كل المجاميع الممكنة لحد دلوقتي، ولكل رقم ضيف [[s + x]] لكل s. بتشتغل وأوضح، بس أبطأ من الـ array.`,
          solCode: R`function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2) return false;
  const target = sum / 2;
  const can = new Array(target + 1).fill(false);
  can[0] = true;
  for (const x of nums)
    for (let s = target; s >= x; s--)
      if (can[s - x]) can[s] = true;
  return can[target];
}
console.log(canPartition([1, 5, 11, 5]), canPartition([1, 2, 3, 5])); // true false
console.log(canPartition([1, 1]), canPartition([3]), canPartition([2, 6])); // true false false
// O(n × sum) time, O(sum) space`,
          flag: "script",
          deep: {
            why: "الـ knapsack هو شكل «اختار حاجات بقيد» اللي بيتكرر في الشغل: أنهي features تدخل الـ sprint في عدد ساعات محدود، وأنهي إعلانات تتعرض في مساحة محدودة، وأنهي ملفات تتحط في cache حجمه ثابت. وفي الانترفيو، نادرًا ما يتسأل باسمه، بس بيتسأل متنكر (Partition Equal Subset Sum و Target Sum و Last Stone Weight II).",
            how: R`الجدول الكامل 2D: [[dp[i][c]]] = أعلى قيمة من أول i حاجات بسعة c. [[dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - w] + v)]]. كل صف معتمد على الصف اللي قبله بس.

عشان نوفّر الذاكرة بنستخدم صف واحد، ونحدّثه في مكانه. ولما نحسب [[dp[c]]]، محتاجين [[dp[c - w]]] «القديمة» (من الصف اللي قبل). لو مشينا من الكبير للصغير، [[c - w]] أصغر من c فلسه ماتحدثتش. ده سبب الاتجاه.

dry run لـ [[([2], [3], 4)]]: 0/1 من 4 لـ 2: [[dp[4] = max(0, dp[2] + 3) = 3]] (dp[2] لسه 0)، و [[dp[2] = 3]]. الإجابة 3. unbounded من 2 لـ 4: [[dp[2] = 3]]، وبعدين [[dp[4] = dp[2] + 3 = 6]]: الحاجة اتاخدت مرتين، وده المطلوب في unbounded.

الـ Big-O [[O(n × capacity)]]، وده pseudo-polynomial: لو السعة مليار مش هينفع. الـ knapsack في العموم مسألة NP-hard، ومفيش حل polynomial معروف في عدد الـ bits بتاعة الأرقام.`,
            when: "0/1: كل حاجة مرة واحدة (اختيار features، تقسيم مجموعة، Target Sum). unbounded: نفس الحاجة ممكن تتكرر (coin change، تقطيع حبل). fractional (تقدر تاخد جزء من الحاجة، زي دهب بودرة): هنا الـ greedy بالنسبة (قيمة/وزن) صح.",
            mistakes: R`اتجاه الـ loop الغلط (بيحوّلها unbounded من غير ما تاخد بالك). والـ greedy بالنسبة في 0/1. وإنك تبدأ الـ loop من 0 بدل وزن الحاجة فتقرا [[dp[-1]]] (undefined، و [[Math.max]] مع NaN بترجّع NaN). وفي الانترفيو، لما تشوف «قسّم لمجموعتين» أو «اختار مجموعة جزئية مجموعها كذا»، قول «ده knapsack» بصوت عالي.`
          },
          lines: [
            "0/1 knapsack بصف واحد.",
            "dp[c] = أعلى قيمة بسعة c.",
            "لكل حاجة: رقمها ووزنها.",
            "السعة من الكبير للصغير (لحد وزن الحاجة).",
            "متاخدهاش، أو خدها + أحسن حاجة في السعة الباقية.",
            "الإجابة.",
            "قفلة.",
            "unbounded: نفس الكود.",
            "نفس الجدول.",
            "لكل حاجة.",
            "بس السعة من الصغير للكبير، فالحاجة ممكن تتاخد تاني.",
            "نفس السطر.",
            "الإجابة.",
            "قفلة.",
            "وزن 3 + وزن 4 = قيمة 9.",
            "0/1 تاخدها مرة (3)، و unbounded مرتين (6).",
            "الحاجة أتقل من الشنطة."
          ]
        },
        {
          cmd: "greedy (interval scheduling)",
          title: "خد أحسن اختيار دلوقتي وماترجعش فيه: إمتى الـ greedy بينفع، وإمتى بيخونك؟",
          desc: R`الـ greedy: في كل خطوة خد الاختيار اللي باين أحسن دلوقتي، ومترجعش فيه أبدًا. أسرع وأبسط من DP بكتير، بس مش دايمًا صح.

مثال بيشتغل: interval scheduling. عندك اجتماعات ليها بداية ونهاية، وقاعة واحدة. أكبر عدد اجتماعات تقدر تعملهم من غير تعارض؟ رتّب بالنهاية، وخد أي اجتماع بيبدأ بعد نهاية آخر واحد خدته. ليه بالنهاية؟ الاجتماع اللي بيخلص بدري بيسيب أكبر وقت للباقي. الترتيب بالبداية أو بالمدة بيطلّع إجابات غلط.

مثال بيخونك: الفكة. «خد أكبر عملة الأول» بيشتغل مع الجنيه والدولار (1 و 5 و 10 و 25)، بس مع عملات [[[1, 3, 4]]] ومبلغ 6: الـ greedy بياخد 4 + 1 + 1 (٣ عملات)، والصح 3 + 3 (عملتين). ومع [[[3, 4]]] ومبلغ 6، الـ greedy بياخد 4 وبعدين مش لاقي حاجة، فيقول مستحيل، مع إن 3 + 3 موجودة. عشان كده Coin Change في درس «coin change (DP)» اتحلت DP.

القاعدة: الـ greedy صح بس لو تقدر تثبت إن الاختيار المحلي عمره ما بيبوّظ أحسن حل. لو مش قادر تثبت، دوّر على مثال مضاد صغير. ولو لقيته، ده DP.`,
          example: R`function maxMeetings(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  const chosen = [];
  let lastEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      chosen.push([start, end]);
      lastEnd = end;
    }
  }
  return chosen;
}
function greedyCoins(coins, amount) {
  let count = 0;
  for (const c of [...coins].sort((a, b) => b - a)) {
    count += Math.floor(amount / c);
    amount %= c;
  }
  return amount === 0 ? count : -1;
}
const meetings = [[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11], [8, 12], [2, 14], [12, 16]];
console.log(maxMeetings(meetings)); // [[1, 4], [5, 7], [8, 11], [12, 16]]
console.log(greedyCoins([1, 5, 10, 25], 63)); // 6
console.log(greedyCoins([1, 3, 4], 6)); // 3
console.log(greedyCoins([3, 4], 6)); // -1
// maxMeetings: O(n log n) for the sort; greedyCoins: O(k log k) for k coin types`,
          try: R`حل «Non-overlapping Intervals»: أقل عدد فترات تشيلها عشان الباقي ميتداخلش. [[[[1,2],[2,3],[3,4],[1,3]]]] الإجابة 1، و [[[[1,2],[1,2],[1,2]]]] الإجابة 2. (فكّر: ده مرتبط بـ [[maxMeetings]] إزاي؟) وبعدين «Jump Game»: كل خانة فيها أقصى قفزة منها، تقدر توصل للآخر؟ [[[2,3,1,1,4]]] true و [[[3,2,1,0,4]]] false. وبعدين جرّب ترتّب الاجتماعات بالبداية بدل النهاية وشوف [[maxMeetings]] بتطلّع كام.`,
          sol: R`Non-overlapping Intervals = العدد الكلي ناقص أكبر عدد فترات مش متداخلة، يعني [[n - maxMeetings(intervals).length]]. الإجابات 1 و 2. الفترات اللي بتلمس بعض ([1,2] و [2,3]) مش متداخلة، عشان كده الشرط [[>=]].

Jump Game: امشي من الشمال واحفظ [[reach]] = أبعد خانة تقدر توصلها. لو وصلت لخانة [[i > reach]]، معناها في حتة مش هتعرف تعدّيها: false. غير كده [[reach = max(reach, i + nums[i])]]. [[O(n)]] وقت و [[O(1)]] ذاكرة. في [[[3,2,1,0,4]]] كل الطرق بتقف عند index 3 (قيمته 0).

الترتيب بالبداية: [[[0, 6]]] بيتاخد الأول لأنه بيبدأ بدري، وبيقفل القاعة لحد 6، فبتطلع 3 اجتماعات بس بدل 4. ده المثال المضاد اللي بيثبت إن الترتيب بالنهاية هو الصح.`,
          solCode: R`function maxMeetings(intervals, key = 1) {
  const sorted = [...intervals].sort((a, b) => a[key] - b[key]);
  let count = 0, lastEnd = -Infinity;
  for (const [start, end] of sorted) if (start >= lastEnd) { count++; lastEnd = end; }
  return count;
}
const eraseOverlap = intervals => intervals.length - maxMeetings(intervals);
function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
console.log(eraseOverlap([[1, 2], [2, 3], [3, 4], [1, 3]]), eraseOverlap([[1, 2], [1, 2], [1, 2]])); // 1 2
console.log(canJump([2, 3, 1, 1, 4]), canJump([3, 2, 1, 0, 4])); // true false
const meetings = [[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11], [8, 12], [2, 14], [12, 16]];
console.log(maxMeetings(meetings, 1), maxMeetings(meetings, 0)); // 4 3
// eraseOverlap: O(n log n); canJump: O(n) time, O(1) space`,
          flag: "script",
          deep: {
            why: "الـ greedy في كل حتة لأنه بسيط وسريع: جدولة الاجتماعات والقاعات، و Huffman coding في الضغط (gzip)، و Dijkstra (بياخد أقرب عقدة كل مرة)، و load balancers بتبعت للسيرفر الأقل حمل. والانترفيو بيحب يختبرك: هل هتقع في greedy غلط؟ وهل تعرف تثبت إن الـ greedy صح؟",
            how: R`ليه الترتيب بالنهاية صح؟ (فكرة الإثبات «exchange argument»): خد أي حل أحسن. أول اجتماع فيه ممكن تبدّله بالاجتماع اللي بيخلص الأبدر، والحل يفضل صحيح (لأنه بيخلص بدري أو في نفس الوقت، فمش هيتعارض مع التاني). يبقى فيه حل أحسن بيبدأ باختيارنا، وكرّر نفس الكلام على الباقي.

dry run: بعد الترتيب بالنهاية: [1,4] [3,5] [0,6] [5,7] [3,9] [5,9] [6,10] [8,11] [8,12] [2,14] [12,16]. خد [1,4]، lastEnd = 4. [3,5] بيبدأ 3 < 4، فوّت. [0,6] فوّت. [5,7] 5 ≥ 4 خده، lastEnd = 7. فوّت لحد [8,11] خده، lastEnd = 11. فوّت لحد [12,16] خده. ٤ اجتماعات.

ليه الـ greedy بتاع الفكة بيشتغل مع 1 و 5 و 10 و 25؟ لأن العملات دي «canonical»: أي كمية من العملات الصغيرة بتساوي عملة كبيرة ممكن تتبدل بيها وتقلل العدد. مع [[[1, 3, 4]]] ده مش صحيح: 3 + 3 = 6 مينفعش يتبدل بـ 4 + حاجة أقل عدد.

إزاي تعرف بسرعة؟ جرّب الـ greedy على ٣ أو ٤ أمثلة صغيرة، وقارن بـ brute force. لو اختلفوا في أي مثال، الـ greedy غلط.`,
            when: "الـ greedy بينفع في: الفترات (رتّب بالنهاية)، و Jump Game، و Gas Station، و Assign Cookies، و fractional knapsack، و Huffman، و Dijkstra و MST. لو المسألة فيها «أقل/أكتر» وكل اختيار بيأثر على الاختيارات اللي بعده بطريقة معقدة، في الغالب DP. في الانترفيو، لو اقترحت greedy، اتوقع السؤال «متأكد؟ ليه؟».",
            mistakes: R`الترتيب بالبداية أو بالمدة في interval scheduling. واستخدام greedy في coin change أو 0/1 knapsack. وإنك تقول «greedy» من غير ما تجرّب مثال مضاد. والعكس: تعمل DP تقيل ([[O(n^2)]]) لمسألة الـ greedy فيها [[O(n)]] (زي Jump Game)، والانترفيور هيسألك «ممكن أحسن؟». وافتكر إن [[sort]] بتغيّر الـ array الأصلية، فانسخ الأول.`
          },
          lines: [
            "أكبر عدد اجتماعات من غير تعارض.",
            "رتّب بالنهاية (نسخة عشان منغيّرش الأصل).",
            "اللي اخترناهم.",
            "نهاية آخر اجتماع اخترناه.",
            "بالترتيب.",
            "بيبدأ بعد (أو ساعة) ما آخر واحد خلص؟",
            "خده.",
            "حدّث النهاية.",
            "قفلة الـ if.",
            "قفلة الـ for.",
            "رجّعهم.",
            "قفلة.",
            "الفكة بالـ greedy: أكبر عملة الأول.",
            "العداد.",
            "العملات من الكبيرة للصغيرة.",
            "خد منها أكتر عدد ممكن.",
            "والباقي يكمّل.",
            "قفلة.",
            "لو فضل باقي، الـ greedy فشل.",
            "قفلة.",
            "١١ اجتماع.",
            "٤ اجتماعات، ومفيش حل أحسن.",
            "عملات أمريكا: 25 + 25 + 10 + 1 + 1 + 1، صح.",
            "3 (4 + 1 + 1)، والصح 2 (3 + 3).",
            "بيقول مستحيل، والصح 2 (3 + 3)."
          ]
        }
      ]
    },
    {
      t: "backtracking و trie",
      l: 3,
      n: "جرّب اختيار، انزل، وارجع فيه: subsets و permutations و combination sum، و trie للـ autocomplete",
      items: [
        {
          cmd: "subsets (backtracking)",
          title: "طلّع كل المجموعات الجزئية من [[[1, 2, 3]]]",
          desc: R`backtracking: بتبني الحل خطوة خطوة. في كل خطوة: اختار حاجة، انزل كمّل (recursion)، وبعدين ارجع في اختيارك (undo) وجرّب اللي بعده. ده DFS على «شجرة القرارات».

القالب ثابت تقريبًا في كل مسائل الـ backtracking:

[[path.push(x)]] (اختار)، و [[backtrack(...)]] (كمّل)، و [[path.pop()]] (ارجع).

في الـ subsets: كل عقدة في شجرة القرارات هي مجموعة جزئية صحيحة، فبنسجّل [[path]] أول ما ندخل. والـ [[start]] بيضمن إننا بنختار عناصر بعد آخر عنصر اخترناه بس، فـ [1, 2] و [2, 1] ميتعدّوش مرتين.

العدد: كل عنصر يا داخل يا لأ، فـ [[2^n]] مجموعة. مع n = 20 ده مليون، ومع n = 30 مليار. الـ backtracking exponential بطبيعته، لأن الإجابة نفسها exponential.`,
          example: R`function subsets(nums) {
  const out = [], path = [];
  const backtrack = start => {
    out.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return out;
}
const show = sets => sets.map(s => "[" + s.join(",") + "]").join(" ");
console.log(show(subsets([1, 2, 3]))); // [] [1] [1,2] [1,2,3] [1,3] [2] [2,3] [3]
console.log(subsets([]).length, subsets([1, 2, 3, 4, 5]).length); // 1 32
// 2^n subsets, each copied in O(n): O(n × 2^n) time and output; O(n) extra for path + stack`,
          try: R`حل «Subsets II»: الـ input فيه تكرار، والناتج مينفعش يكون فيه مجموعتين متطابقتين. [[[1, 2, 2]]] الإجابة ٦ مجموعات: [[[] [1] [1,2] [1,2,2] [2] [2,2]]]. (رتّب الأول، وفي نفس المستوى فوّت العنصر لو زي اللي قبله.) وبعدين اكتب [[subsets]] من غير recursion خالص باستخدام الـ bits: كل رقم من 0 لـ [[2^n - 1]] بيمثّل مجموعة.`,
          sol: R`Subsets II: بعد الـ sort، الشرط [[if (i > start && nums[i] === nums[i - 1]) continue]]. الـ [[i > start]] مهم: التكرار ممنوع كـ «أول اختيار في نفس المستوى» بس، لكن مسموح إنك تاخد الـ 2 التانية بعد الأولى (عشان [1,2,2] تطلع). لو كتبت [[i > 0]] هتفوّت [[[1,2,2]]] و [[[2,2]]] وتطلع ٤ بس.

بالـ bits: [[mask]] من 0 لـ [[(1 << n) - 1]]، والعنصر i داخل لو [[mask & (1 << i)]] مش صفر. لـ [1, 2, 3]: الـ mask 5 = 101 = [1, 3]. الناتج نفس الـ ٨ مجموعات بترتيب تاني: [[[] [1] [2] [1,2] [3] [1,3] [2,3] [1,2,3]]].

وخلي بالك إن [[1 << n]] في JavaScript بيشتغل لحد n = 30 بس (الـ bitwise بيبقى 32-bit بإشارة)، وده مش مشكلة لأن 2^30 مجموعة أكتر من اللي الذاكرة تشيله أصلًا.`,
          solCode: R`function subsetsWithDup(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = start => {
    out.push([...path]);
    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      path.push(sorted[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return out;
}
function subsetsBits(nums) {
  const out = [];
  for (let mask = 0; mask < 1 << nums.length; mask++)
    out.push(nums.filter((_, i) => mask & (1 << i)));
  return out;
}
const show = sets => sets.map(s => "[" + s.join(",") + "]").join(" ");
console.log(show(subsetsWithDup([1, 2, 2]))); // [] [1] [1,2] [1,2,2] [2] [2,2]
console.log(show(subsetsBits([1, 2, 3]))); // [] [1] [2] [1,2] [3] [1,3] [2,3] [1,2,3]
// both O(n × 2^n)`,
          flag: "script",
          deep: {
            why: "الـ backtracking هو الطريقة لأي «طلّع كل الاحتمالات» أو «دوّر على حل يحقق قيود»: كل تركيبات الـ filters في صفحة منتجات، و test cases لكل مجموعة options، و Sudoku، وجدولة بقيود. وفي الانترفيو، Subsets و Permutations و Combination Sum هما الـ ٣ مسائل الأساسية، ولو فهمت القالب هتحل الـ ٣ بنفس الكود تقريبًا.",
            how: R`شجرة القرارات لـ [1, 2, 3]: الجذر [] (سجّل). من الجذر: اختار 1 ← [1] (سجّل)، ومنها اختار 2 ← [1,2] (سجّل)، ومنها 3 ← [1,2,3] (سجّل). ارجع (pop 3)، مفيش بعد 3. ارجع (pop 2)، اختار 3 ← [1,3]. ارجع لحد الجذر، اختار 2 ← [2]، وبعدها 3 ← [2,3]. ارجع، اختار 3 ← [3].

ليه [[[...path]]] مش [[path]]؟ [[path]] array واحدة بتتعدل طول الوقت. لو حطيتها هي نفسها في [[out]]، كل الخانات هتشاور على نفس الـ array، وفي الآخر هتبقى فاضية كلها (لأن آخر حاجة بتحصل pop). النسخة بتصوّر الحالة في اللحظة دي.

ليه [[path.pop()]] بعد النداء؟ ده الـ «backtrack» نفسه: رجّع الحالة زي ما كانت قبل ما تختار، عشان الاختيار الجاي في الـ loop يبدأ من نفس النقطة. من غيره، العناصر هتتراكم.

الـ Big-O: [[2^n]] مجموعة، وكل واحدة بتتنسخ في [[O(n)]]، فـ [[O(n × 2^n)]]. ودي الإجابة نفسها حجمها كده، فمفيش حل أسرع.`,
            when: "«كل المجموعات الجزئية» أو «كل التركيبات»: الـ backtracking بـ start. «كل الترتيبات»: بـ used (الدرس الجاي). «فيه حل؟» (Sudoku، N-Queens، Word Search): backtracking مع pruning (توقف بدري لما الفرع مستحيل). ولو المطلوب عدد الحلول أو أحسن حل مش الحلول نفسها، شوف الأول لو ينفع DP، لأنه غالبًا polynomial.",
            mistakes: R`[[out.push(path)]] من غير نسخ. ونسيان [[path.pop()]]. و [[backtrack(start + 1)]] بدل [[backtrack(i + 1)]]، فتطلع مجموعات مكررة وناقصة. وفي Subsets II، [[i > 0]] بدل [[i > start]]. وفي الانترفيو: قول الـ Big-O صح، [[O(n × 2^n)]] مش [[O(2^n)]]، لأن النسخ بياخد وقت.`
          },
          lines: [
            "كل المجموعات الجزئية.",
            "الناتج، والمسار الحالي (المجموعة اللي بنبنيها).",
            "backtrack بتختار من start لقدام بس.",
            "كل عقدة في الشجرة مجموعة صحيحة: سجّل نسخة.",
            "جرّب كل عنصر من start.",
            "اختار.",
            "كمّل بالعناصر اللي بعده.",
            "ارجع في الاختيار.",
            "قفلة الـ for.",
            "قفلة backtrack.",
            "ابدأ من أول عنصر.",
            "رجّع.",
            "قفلة.",
            "طباعة مختصرة.",
            "٨ مجموعات بترتيب الـ DFS.",
            "array فاضية ليها مجموعة واحدة (الفاضية)، و ٥ عناصر 32."
          ]
        },
        {
          cmd: "permutations",
          title: "طلّع كل الترتيبات الممكنة لـ [[[1, 2, 3]]]",
          desc: R`الترتيبات (permutations): نفس العناصر كلها، بس بكل ترتيب ممكن. العدد [[n!]]: 3 عناصر = 6، و 10 عناصر = 3.6 مليون، و 13 عنصر أكتر من 6 مليار.

الفرق عن الـ subsets: الترتيب بيفرق، فكل عنصر ممكن ييجي في أي مكان. فبدل [[start]]، بنستخدم [[used]] (array من true/false) تقول مين اتاخد في المسار الحالي. وكل مستوى بيجرّب كل العناصر اللي لسه متاخدتش.

وبنسجّل بس لما المسار يبقى طوله n (ترتيب كامل)، مش في كل عقدة زي الـ subsets.

نفس القالب: اختار ([[used[i] = true]] و push)، كمّل، ارجع ([[pop]] و [[used[i] = false]]).`,
          example: R`function permutations(nums) {
  const out = [], path = [], used = new Array(nums.length).fill(false);
  const backtrack = () => {
    if (path.length === nums.length) { out.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  };
  backtrack();
  return out;
}
console.log(permutations([1, 2, 3]).map(p => p.join("")).join(" ")); // 123 132 213 231 312 321
console.log(permutations([1, 2, 3, 4]).length); // 24
console.log(permutations([])); // [[]]
// n! permutations, each copied in O(n): O(n × n!) time; O(n) extra for path, used and the stack`,
          try: R`حل «Permutations II» (الـ input فيه تكرار): [[[1, 1, 2]]] الإجابة ٣ بس: 112 و 121 و 211. وبعدين «N-Queens»: كام طريقة تحط n وزير على رقعة n × n من غير ما اتنين يهاجموا بعض (نفس الصف أو العمود أو القطر)؟ n = 4 الإجابة 2، و n = 8 الإجابة 92. (كل صف فيه وزير واحد، فجرّب كل عمود في الصف الحالي، واحفظ الأعمدة والقطرين المشغولين في Sets.)`,
          sol: R`Permutations II: رتّب، وفوّت العنصر لو زي اللي قبله واللي قبله مش مستخدم في المسار الحالي: [[if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue]]. المعنى: من النسخ المتكررة، استخدمهم دايمًا بالترتيب (الأولى قبل التانية)، فكل ترتيب يطلع مرة واحدة. الناتج [[112 121 211]].

N-Queens: [[place(row)]]: لو row = n لقيت حل. غير كده لكل عمود c: لو c أو [[row - c]] (قطر) أو [[row + c]] (القطر التاني) مشغولين، فوّت. غير كده علّمهم، وانزل للصف الجاي، وشيل العلامات. الإجابات 2 و 92.

ليه [[row - c]] و [[row + c]]؟ كل الخانات على نفس القطر من فوق شمال لتحت يمين ليهم نفس [[row - c]]، واللي على القطر التاني ليهم نفس [[row + c]]. فالـ Set بتكشف التعارض في [[O(1)]] بدل ما تلف على الرقعة.

ده مثال على الـ pruning: بدل ما تجرّب كل الـ [[8^8]] (16 مليون) طريقة، بتقطع أي فرع أول ما يبان إنه غلط، فالـ 8 × 8 بتخلص في أجزاء من الثانية.`,
          solCode: R`function permuteUnique(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [], path = [], used = new Array(sorted.length).fill(false);
  const backtrack = () => {
    if (path.length === sorted.length) { out.push([...path]); return; }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i] || (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1])) continue;
      used[i] = true; path.push(sorted[i]);
      backtrack();
      path.pop(); used[i] = false;
    }
  };
  backtrack();
  return out;
}
function nQueens(n) {
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  let count = 0;
  const place = row => {
    if (row === n) { count++; return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
      cols.add(c); diag1.add(row - c); diag2.add(row + c);
      place(row + 1);
      cols.delete(c); diag1.delete(row - c); diag2.delete(row + c);
    }
  };
  place(0);
  return count;
}
console.log(permuteUnique([1, 1, 2]).map(p => p.join("")).join(" ")); // 112 121 211
console.log(nQueens(4), nQueens(8)); // 2 92
// permuteUnique: O(n × n!) worst case; nQueens: O(n!) worst case, far less with pruning`,
          flag: "script",
          deep: {
            why: "الترتيبات بتقابلك في: كل ترتيبات أعمدة جدول لاختبار الـ UI، ومسائل الجدولة («رتّب المهام بأحسن ترتيب»)، والـ brute force في أي مسألة ترتيب قبل ما تلاقي حل أذكى. وفي الانترفيو، Permutations و N-Queens بيختبروا إنك فاهم إزاي ترجع الحالة زي ما كانت (undo) صح.",
            how: R`الشجرة لـ [1, 2, 3]: المستوى الأول ٣ اختيارات، والتاني ٢ (اللي فاضلين)، والتالت ١. فـ 3 × 2 × 1 = 6 أوراق، وكل ورقة ترتيب.

dry run: اختار 1 (used = [T, F, F]). اختار 2 (used = [T, T, F]). اختار 3، الطول 3، سجّل 123. ارجع: pop 3، used[2] = F. مفيش بعد 3. ارجع: pop 2، used[1] = F. اختار 3 (used = [T, F, T])، وبعدين 2، سجّل 132. وهكذا.

ليه [[used]] وليه مش [[path.includes(x)]]؟ [[includes]] بتاخد [[O(n)]] في كل خطوة، و [[used]] بتاخد [[O(1)]]. والأهم إن [[includes]] بتبوّظ مع التكرار: في [1, 1, 2] الـ 1 التانية هتبان «مستخدمة» لما الأولى تتاخد.

permutations([]) بترجّع [[[[]]]] (ترتيب واحد: الفاضي)، مش [[[]]]، لأن الشرط [[path.length === 0]] صح من أول نداء. ده متسق رياضيًا ([[0! = 1]]).

فيه طريقة تانية بالـ swap: بدّل العنصر i مع كل عنصر بعده في نفس الـ array، وانزل، وبدّل تاني. بتوفّر [[used]] و [[path]]، بس صعب تتعامل بيها مع التكرار.`,
            when: "«كل الترتيبات» والترتيب بيفرق: used. «كل المجموعات» والترتيب مش بيفرق: start (الدرس اللي فات). لو n أكبر من حوالي 10، الترتيبات كلها مستحيلة عمليًا، فلازم pruning قوي أو فكرة تانية (DP على bitmask، أو greedy). ولو محتاج «الترتيب اللي بعد ده» بس، فيه خوارزمية Next Permutation في [[O(n)]].",
            mistakes: R`نسيان إرجاع [[used[i] = false]] بعد النداء، فأول فرع بس بيطلع. ونسيان النسخ عند التسجيل. وفي التكرار: تنسى الـ sort قبل شرط التخطي، فالمتكرر ميبقاش جنب بعضه والشرط ميشتغلش. (الشرط [[used[i - 1]]] من غير ! بيطلّع نفس النتيجة بس بيقطع الفروع متأخر، فاعرف تشرح أنهي واحدة كتبت وليه.) وإنك متعرفش إن n! بيكبر أسرع من 2^n: 10! حوالي 3.6 مليون، و 2^10 = 1024.`
          },
          lines: [
            "كل الترتيبات.",
            "الناتج، والمسار، ومين اتاخد.",
            "backtrack.",
            "المسار كامل: سجّل نسخة وارجع.",
            "جرّب كل عنصر.",
            "متاخد في المسار ده: فوّت.",
            "علّمه.",
            "اختاره.",
            "كمّل.",
            "ارجع في الاختيار.",
            "وشيل العلامة.",
            "قفلة الـ for.",
            "قفلة backtrack.",
            "ابدأ.",
            "رجّع.",
            "قفلة.",
            "٦ ترتيبات بالترتيب ده.",
            "4! = 24.",
            "ترتيب واحد: الفاضي."
          ]
        },
        {
          cmd: "combination sum",
          title: "كل التركيبات اللي مجموعها target، والرقم ممكن يتكرر (Combination Sum)",
          desc: R`عندك أرقام موجبة مختلفة، وعايز كل التركيبات (من غير ما الترتيب يفرق) اللي مجموعها بالظبط target، والرقم الواحد ممكن يتاخد أكتر من مرة.

نفس قالب الـ subsets، مع فرقين:

١. بعد ما تختار العنصر i، تنزل بـ [[backtrack(i)]] مش [[i + 1]]، عشان ينفع تاخده تاني. وبرضه مش بترجع لعناصر قبل i، فـ [2, 3] و [3, 2] ميتعدّوش مرتين.

٢. بتسجّل لما الباقي يبقى 0 بالظبط.

والـ pruning: لو الأرقام مترتبة، وأول رقم أكبر من الباقي، كل اللي بعده أكبر كمان، فـ [[break]] مش [[continue]]. ده بيقطع فروع كتير.

ودي أخت coin change: coin change بيسأل «أقل عدد» أو «كام طريقة» (DP)، وهنا عايز الطرق نفسها مكتوبة، فلازم backtracking.`,
          example: R`function combinationSum(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = (start, remaining) => {
    if (remaining === 0) { out.push([...path]); return; }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remaining) break;
      path.push(sorted[i]);
      backtrack(i, remaining - sorted[i]);
      path.pop();
    }
  };
  backtrack(0, target);
  return out;
}
console.log(combinationSum([2, 3, 6, 7], 7)); // [[2, 2, 3], [7]]
console.log(combinationSum([2, 3, 5], 8)); // [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
console.log(combinationSum([2], 1)); // []
// exponential: the tree has at most about n^(target / min) nodes; O(target / min) depth`,
          try: R`حل «Combination Sum II»: كل رقم يتاخد مرة واحدة بس، والـ input فيه تكرار، والناتج مينفعش يكون فيه تركيبتين متطابقتين. [[[10, 1, 2, 7, 6, 1, 5]]] و target = 8 الإجابة [[[[1,1,6], [1,2,5], [1,7], [2,6]]]]. (خليط من الدرس ده ومن Subsets II.)`,
          sol: R`الإجابة: [[[[1,1,6], [1,2,5], [1,7], [2,6]]]].

التغييرين: [[backtrack(i + 1, ...)]] بدل [[backtrack(i, ...)]] (كل رقم مرة)، و [[if (i > start && sorted[i] === sorted[i - 1]) continue]] (فوّت التكرار في نفس المستوى، زي Subsets II بالظبط).

[1, 1, 6] مسموحة لأن الـ 1 التانية اتاخدت في مستوى أعمق (بعد الأولى)، مش في نفس المستوى. لكن [1, 7] مش هتطلع مرتين (مرة بكل 1)، لأن الـ 1 التانية اتفوّتت كأول اختيار.

الغلطة الشائعة: تشيل التكرار من الـ input بـ Set في الأول، فـ [1, 1, 6] تختفي. أو تطلّع كل حاجة وبعدين تشيل المكرر بـ [[JSON.stringify]] في Set: بيشتغل بس بيضيّع وقت في فروع مكررة، والانترفيور هيسأل «ممكن من غير كده؟».`,
          solCode: R`function combinationSum2(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const out = [], path = [];
  const backtrack = (start, remaining) => {
    if (remaining === 0) { out.push([...path]); return; }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remaining) break;
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      path.push(sorted[i]);
      backtrack(i + 1, remaining - sorted[i]);
      path.pop();
    }
  };
  backtrack(0, target);
  return out;
}
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)); // [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
console.log(combinationSum2([2, 5, 2, 1, 2], 5)); // [[1, 2, 2], [5]]
// O(2^n) subsets in the worst case, each copied in O(n)`,
          flag: "script",
          deep: {
            why: "«كل الطرق اللي بتحقق هدف» بتظهر في: تكوين باقات من منتجات بسعر معين، وتقسيم ساعات شغل على مهام، واقتراح تركيبات قطع في متجر. والانترفيو بيستخدم Combination Sum عشان يشوف هل تقدر تعدّل القالب بتاع الـ backtracking (i ولا i + 1، و break ولا continue) من غير ما تحفظ.",
            how: R`الشجرة لـ [2, 3, 6, 7] و 7: من الجذر (باقي 7): اختار 2 (باقي 5)، اختار 2 (باقي 3)، اختار 2 (باقي 1)، الـ 2 أكبر من 1: break. ارجع، اختار 3 (باقي 0): سجّل [2, 2, 3]. ارجع، 6 > 3: break.

ارجع لـ [2] (باقي 5): اختار 3 (باقي 2)، و 3 > 2: break. 6 > 5: break. ارجع للجذر: اختار 3 (باقي 4)، اختار 3 (باقي 1): break. 6 > 4: break. اختار 6 (باقي 1): break. اختار 7 (باقي 0): سجّل [7].

الـ [[break]] بيشتغل لأننا رتبنا. من غير ترتيب لازم [[continue]] وتجرّب كل حاجة.

ليه [[backtrack(i, ...)]] بتمنع التكرار في الترتيب؟ لأن كل مسار الأرقام فيه غير متناقصة (2 ثم 2 ثم 3). فكل تركيبة ليها ترتيب واحد بس ممكن يطلع.

الـ Big-O صعب يتحسب بالظبط، والطبيعي تقول: العمق أقصاه [[target / min]]، وكل مستوى فيه لحد n فرع، فـ [[O(n^(target / min))]] كحد أعلى. في الانترفيو قول «exponential» واشرح ليه، ده كفاية.`,
            when: "«كل التركيبات» اللي مجموعها أو خاصيتها بتحقق شرط: backtracking. «عدد التركيبات» أو «أقل عدد»: DP (coin change). ولو الأرقام ممكن تبقى سالبة أو صفر، الـ pruning بالـ break مبقاش صح، ولو فيه صفر ممكن تلف للأبد (0 + 0 + 0...)، فاسأل عن القيود.",
            mistakes: R`[[i + 1]] في Combination Sum I (مش هيكرر) أو [[i]] في II (هيكرر). و [[continue]] بدل [[break]] (بيشتغل بس أبطأ) أو [[break]] من غير sort (غلط). ونسيان النسخ. وإنك تسجّل لما [[remaining <= 0]] بدل [[=== 0]]. وفي II: شيل التكرار من الـ input.`
          },
          lines: [
            "كل التركيبات اللي مجموعها target.",
            "رتّب عشان الـ break يشتغل.",
            "الناتج والمسار.",
            "backtrack بتعرف تبدأ منين وفاضل كام.",
            "وصلنا بالظبط: سجّل.",
            "جرّب من start لقدام.",
            "الرقم أكبر من الباقي، واللي بعده أكبر كمان: وقّف.",
            "اختار.",
            "كمّل من نفس i (ينفع يتكرر).",
            "ارجع.",
            "قفلة الـ for.",
            "قفلة backtrack.",
            "ابدأ بالـ target كله.",
            "رجّع.",
            "قفلة.",
            "2 + 2 + 3، و 7.",
            "٣ تركيبات.",
            "مستحيل."
          ]
        },
        {
          cmd: "trie (autocomplete)",
          title: "اقتراحات البحث وانت بتكتب: trie (prefix tree)",
          desc: R`الـ trie شجرة كل عقدة فيها حرف، وكل مسار من الجذر لعقدة هو prefix. الكلمات اللي بتبدأ بنفس الحروف بتشارك نفس الفرع: car و card و care و cat كلهم تحت c ← a.

كل عقدة فيها [[children]] (Map من الحرف للعقدة اللي بعده) و [[end]] (true لو فيه كلمة بتخلص هنا). الـ [[end]] مهم: «car» كلمة، بس «ca» مجرد prefix.

العمليات: insert و has و startsWith كلهم [[O(L)]] (L طول الكلمة)، مهما كان عدد الكلمات في القاموس مليون. والـ autocomplete: انزل لآخر الـ prefix، وبعدين DFS من هناك يجمّع كل الكلمات اللي تحته.

مقارنة بـ [[words.filter(w => w.startsWith(prefix))]]: ده [[O(n × L)]] مع كل حرف بيتكتب. مع قاموس صغير (مئات) مفيش فرق يذكر، ومع قاموس كبير وكتابة سريعة، الـ trie بيفرق.`,
          example: R`class Trie {
  constructor() { this.root = { children: new Map(), end: false }; }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), end: false });
      node = node.children.get(ch);
    }
    node.end = true;
  }
  find(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return null;
    }
    return node;
  }
  has(word) { return this.find(word)?.end === true; }
  complete(prefix, limit = 5) {
    const out = [];
    const walk = (node, word) => {
      if (out.length >= limit) return;
      if (node.end) out.push(word);
      for (const ch of [...node.children.keys()].sort()) walk(node.children.get(ch), word + ch);
    };
    const start = this.find(prefix);
    if (start) walk(start, prefix);
    return out;
  }
}
const t = new Trie();
for (const w of ["car", "card", "care", "cat", "dog", "do"]) t.insert(w);
console.log(t.complete("car")); // ['car', 'card', 'care']
console.log(t.complete("d")); // ['do', 'dog']
console.log(t.has("ca"), t.has("cat"), t.complete("x")); // false true []
// insert, has, find: O(L) for length L; complete: O(L + size of the visited subtree)`,
          try: R`خلّي الاقتراحات مترتبة بالشعبية: كل مرة المستخدم يختار كلمة، [[insert]] بتزوّد عدّاد [[count]] في آخر عقدة. و [[complete]] ترجّع أعلى k كلمات تحت الـ prefix حسب العدد (والتعادل أبجدي). بعد ما تضيف "care" ٣ مرات و "card" مرتين و "car" مرة، [[complete("car", 2)]] لازم ترجّع [[["care", "card"]]].`,
          sol: R`الناتج: [[["care", "card"]]]، و [[complete("ca", 3)]] = [[["care", "card", "car"]]] لو "cat" اتضافت مرة و "car" مرة (التعادل أبجدي: car قبل cat).

[[end]] بقت [[count]] (رقم، و 0 يعني مش كلمة). في [[complete]]: اجمع كل الكلمات تحت الـ prefix مع عددها، ورتّبهم بـ [[(a, b) => b.count - a.count || a.word.localeCompare(b.word)]]، وخد أول k. لو الفرع ضخم، استخدم heap حجمه k (درس «top k frequent»).

في الأنظمة الحقيقية، بيحفظوا في كل عقدة «أعلى k كلمات تحتها» جاهزين، عشان الاقتراح يبقى [[O(L)]] من غير DFS. التحديث بيبقى أغلى، بس القراءة (اللي بتحصل مع كل حرف) بتبقى فورية.

الغلطة الشائعة: تنسى [[limit]] أو تطلّع كل الشجرة لما الـ prefix يبقى حرف واحد، فمع قاموس كبير الاقتراح يبطّأ الـ UI.`,
          solCode: R`class RankedTrie {
  constructor() { this.root = { children: new Map(), count: 0 }; }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map(), count: 0 });
      node = node.children.get(ch);
    }
    node.count++;
  }
  complete(prefix, k = 5) {
    let node = this.root;
    for (const ch of prefix) { node = node.children.get(ch); if (!node) return []; }
    const found = [];
    const walk = (n, word) => {
      if (n.count) found.push({ word, count: n.count });
      for (const [ch, child] of n.children) walk(child, word + ch);
    };
    walk(node, prefix);
    found.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
    return found.slice(0, k).map(x => x.word);
  }
}
const t = new RankedTrie();
["care", "care", "care", "card", "card", "car", "cat"].forEach(w => t.insert(w));
console.log(t.complete("car", 2)); // ['care', 'card']
console.log(t.complete("ca", 3)); // ['care', 'card', 'car']
console.log(t.complete("z")); // []
// insert O(L); complete O(L + m log m) for m words under the prefix`,
          flag: "script",
          deep: {
            why: "الـ autocomplete في search box من أشهر features الـ frontend، وسؤال «صمّم autocomplete» بيتسأل في انترفيوهات الـ system design والـ frontend. والـ trie كمان ورا بعض الـ routers: Fastify (عن طريق مكتبة find-my-way) بيستخدم radix tree، نسخة مضغوطة من الـ trie، عشان يطابق [[/users/:id/posts]] من غير ما يجرّب كل route بالترتيب زي Express، وورا IP routing، و spell checkers.",
            how: R`insert "car": الجذر مفيهوش c، اعمل عقدة. انزل. مفيش a، اعمل. مفيش r، اعمل. علّم r بـ [[end = true]]. insert "card": c و a و r موجودين، انزل من غير ما تعمل حاجة، واعمل d وعلّمها.

[[complete("car")]]: [[find]] بتنزل c ← a ← r. من r: [[end]] = true فسجّل "car". الأولاد d و e بالترتيب الأبجدي: d عندها end، سجّل "card". e سجّل "care".

ليه Map مش object؟ الـ Map بتحفظ ترتيب الإضافة، ومفيهاش keys موروثة زي [[__proto__]] و [[constructor]] (كلمة زي "constructor" في object عادي هتلاقي حاجة موجودة أصلًا!). وليه مش array من 26 خانة زي اللي في كتب C/Java؟ عشان الحروف ممكن تبقى عربي أو emoji أو أي Unicode.

[[for (const ch of word)]] بتمشي على الحروف بالـ code points، فالـ emoji (اللي بياخد خانتين في UTF-16) بيتعامل كحرف واحد، عكس [[word[i]]].

الذاكرة: كل حرف في كل كلمة ممكن ياخد عقدة، فـ [[O(مجموع أطوال الكلمات)]]، والـ prefixes المشتركة بتوفّر. بس كل عقدة Map، وده تقيل في JavaScript، فمع مليون كلمة الـ trie ممكن ياخد مئات الميجا.`,
            when: "autocomplete، و «فيه كلمة بتبدأ بكذا؟» كتير، و Word Search II (كلمات كتير في grid)، و routers. لو محتاج «الكلمة موجودة؟» بس، Set أبسط وأسرع. لو القاموس صغير، [[filter]] + [[startsWith]] كفاية. ولو القاموس ضخم وعلى السيرفر، الداتابيز أو search engine (Postgres بـ [[LIKE 'car%']] على index، أو Elasticsearch/Meilisearch) أحسن من trie في الذاكرة.",
            mistakes: R`نسيان [[end]]، فكل prefix يبان كلمة ([[has("ca")]] ترجع true). واستخدام object بـ keys من المستخدم ([[__proto__]]). واستخدام [[word[i]]] مع emoji. وفي الـ frontend: مناداة الـ API مع كل حرف من غير debounce، أو الـ response القديم يوصل بعد الجديد فيعرض اقتراحات غلط (استخدم AbortController، شوف «تاب React»).`
          },
          lines: [
            "الـ trie.",
            "الجذر عقدة فاضية: أولادها Map، ومش نهاية كلمة.",
            "إضافة كلمة.",
            "ابدأ من الجذر.",
            "لكل حرف.",
            "مفيش ابن بالحرف ده: اعمله.",
            "انزل.",
            "قفلة.",
            "هنا بتخلص كلمة.",
            "قفلة insert.",
            "انزل لآخر الـ prefix.",
            "من الجذر.",
            "حرف حرف.",
            "انزل.",
            "مفيش فرع: الـ prefix مش موجود.",
            "قفلة.",
            "العقدة اللي عند آخر حرف.",
            "قفلة find.",
            "كلمة كاملة؟ لازم الـ prefix يبقى موجود وينتهي بـ end.",
            "الاقتراحات: لحد limit كلمة.",
            "الناتج.",
            "DFS من عقدة، ومعاه الكلمة لحد هنا.",
            "كفاية: وقّف.",
            "فيه كلمة بتخلص هنا: سجّلها.",
            "انزل على الأولاد بالترتيب الأبجدي.",
            "قفلة walk.",
            "آخر الـ prefix.",
            "لو موجود، اجمع من عنده.",
            "رجّع.",
            "قفلة complete.",
            "قفلة الـ class.",
            "trie جديد.",
            "٦ كلمات.",
            "تحت car.",
            "تحت d: do الأول لأنها أقصر (بتتسجّل قبل أولادها).",
            "ca مش كلمة، و cat كلمة، و x مفيش."
          ]
        }
      ]
    },
    {
      t: "أدوات إضافية: union-find و Dijkstra و bits و LRU",
      l: 3,
      n: "بتتسأل أحيانًا: مجموعات بتتدمج، وأقصر طريق بأوزان، وحيل الـ XOR، و cache بيطرد الأقدم",
      items: [
        {
          cmd: "union-find",
          title: "مجموعات بتتدمج مع بعض: الاتنين دول في نفس المجموعة؟ (union-find)",
          desc: R`union-find (اسمه كمان disjoint set union أو DSU) بيدير مجموعات منفصلة وبيدّيك عمليتين:

[[find(x)]]: مين «رئيس» مجموعة x؟ عنصرين في نفس المجموعة لو ليهم نفس الرئيس.

[[union(a, b)]]: ادمج مجموعة a ومجموعة b.

كل مجموعة شجرة، وكل عنصر بيشاور على أبوه في [[parent]]، والرئيس بيشاور على نفسه. عشان الشجر ميبقاش طويل، فيه تحسينين:

path compression: وانت طالع من العنصر للرئيس، خلّي كل عنصر يشاور على جده (أو على الرئيس على طول)، فالمرة الجاية الطريق أقصر.

union by size: لما تدمج، خلّي الشجرة الصغيرة تحت الكبيرة، مش العكس.

مع الاتنين، كل عملية تقريبًا [[O(1)]] (رياضيًا [[O(α(n))]]، و α دالة بتكبر ببطء شديد لدرجة إنها أقل من 5 لأي n في الكون).

الفرق عن BFS/DFS: الـ BFS بيحتاج الـ graph كله جاهز. الـ union-find بيشتغل والـ edges بتيجي واحد واحد، وبيجاوب «متوصلين؟» بعد كل edge من غير ما تعيد المشي.`,
          example: R`class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
    this.count = n;
  }
  find(x) {
    while (this.parent[x] !== x) {
      const up = this.parent[x]; this.parent[x] = this.parent[up];
      x = this.parent[x];
    }
    return x;
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    this.count--;
    return true;
  }
}
const uf = new UnionFind(6);
uf.union(0, 1); uf.union(1, 2); uf.union(3, 4);
console.log(uf.count); // 3
console.log(uf.find(2) === uf.find(0), uf.find(3) === uf.find(5)); // true false
console.log(uf.union(0, 2), uf.count); // false 3
// find and union: amortized almost O(1) (inverse Ackermann) with path compression + union by size; O(n) space`,
          try: R`حل «Redundant Connection»: عندك شجرة من n عقدة (مترقمة من 1)، واتضاف عليها edge زيادة عمل دايرة. رجّع الـ edge ده (ولو فيه أكتر من إجابة، آخر واحد في الـ input). [[[[1,2],[1,3],[2,3]]]] الإجابة [[[2,3]]]، و [[[[1,2],[2,3],[3,4],[1,4],[1,5]]]] الإجابة [[[1,4]]]. وبعدين «Number of Provinces»: matrix فيها 1 لو المدينتين متوصلين، كام مجموعة؟`,
          sol: R`Redundant Connection: امشي على الـ edges بالترتيب واعمل [[union]]. أول edge [[union]] بتاعه يرجّع false (الطرفين أصلًا في نفس المجموعة) هو اللي عمل الدايرة. الإجابات [[[2,3]]] و [[[1,4]]].

الـ UnionFind لازم يبقى حجمه n + 1 لأن العقد بتبدأ من 1. لو عملته بحجم n، العقدة n هتبقى برّا الـ array، و [[parent[n]]] هتبقى undefined، والـ find هتلف للأبد أو ترجّع قيمة غلط.

Number of Provinces: لكل [[isConnected[i][j] === 1]] مع [[j > i]]، اعمل [[union(i, j)]]، والإجابة [[uf.count]]. [[[[1,1,0],[1,1,0],[0,0,1]]]] = 2، و [[[[1,0,0],[0,1,0],[0,0,1]]]] = 3.

ليه «آخر واحد في الـ input» بيطلع طبيعي؟ لأن الشجرة الأصلية + edge واحد = دايرة واحدة بالظبط، وأول edge بيقفلها وانت ماشي بالترتيب هو آخر edge منها في الـ input.`,
          solCode: R`class UnionFind {
  constructor(n) { this.parent = Array.from({ length: n }, (_, i) => i); this.count = n; }
  find(x) {
    while (this.parent[x] !== x) { this.parent[x] = this.parent[this.parent[x]]; x = this.parent[x]; }
    return x;
  }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    this.parent[rb] = ra;
    this.count--;
    return true;
  }
}
function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);
  for (const [a, b] of edges) if (!uf.union(a, b)) return [a, b];
  return null;
}
function findCircleNum(isConnected) {
  const uf = new UnionFind(isConnected.length);
  isConnected.forEach((row, i) => row.forEach((v, j) => { if (v && j > i) uf.union(i, j); }));
  return uf.count;
}
console.log(findRedundantConnection([[1, 2], [1, 3], [2, 3]])); // [2, 3]
console.log(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])); // [1, 4]
console.log(findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]), findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]])); // 2 3
// O(E × α(n)) time, O(n) space`,
          flag: "script",
          deep: {
            why: "union-find بيحل «مين مع مين» والبيانات بتيجي تدريجيًا: دمج حسابات المستخدمين المكررة (نفس الإيميل أو التليفون)، وتجميع الصور المتشابهة، والشبكات («السيرفرين دول متوصلين بعد ما الوصلة دي اتعملت؟»). وكمان هو قلب خوارزمية Kruskal لبناء أرخص شبكة توصّل كل النقط (minimum spanning tree).",
            how: R`في الأول كل عنصر لوحده: [[parent = [0, 1, 2, 3, 4, 5]]]، و count = 6.

[[union(0, 1)]]: رئيس 0 هو 0، ورئيس 1 هو 1. الحجمين متساويين، فـ 1 تبقى تحت 0: [[parent[1] = 0]]، و count = 5.

[[union(1, 2)]]: رئيس 1 هو 0 (حجمها 2)، ورئيس 2 هو 2 (حجمها 1). الصغيرة تحت الكبيرة: [[parent[2] = 0]]. count = 4.

[[union(3, 4)]]: count = 3. فالمجموعات {0, 1, 2} و {3, 4} و {5}.

[[union(0, 2)]]: الاتنين رئيسهم 0، فـ false ومفيش تغيير. ده بالظبط «الـ edge ده بيعمل دايرة».

الـ path compression هنا اسمها path halving: السطر اللي جوه الـ while في [[find]] بيخلّي كل عنصر يشاور على جده بدل أبوه وانت طالع. سطر واحد، ومن غير recursion، وبتدّي نفس الـ Big-O تقريبًا.`,
            when: "connected components والـ edges بتيجي واحد واحد، أو كشف دواير في undirected graph، أو Kruskal، أو «Accounts Merge». لو الـ graph ثابت ومحتاج تسأل مرة واحدة، BFS/DFS أبسط. ولو فيه «فصل» (edge بيتشال)، الـ union-find العادي مبيعرفش يعمل كده.",
            mistakes: R`نسيان إن [[find]] لازم ترجّع الرئيس مش الأب المباشر، فتقارن [[parent[a] === parent[b]]] وده غلط. ونسيان تحسين أو التانيين، فالشجرة تبقى خط والعمليات [[O(n)]]. والعقد اللي بتبدأ من 1 (حجم n + 1). و [[union]] على العناصر نفسها بدل رؤسائها ([[parent[b] = a]])، ودي بتقطع b من مجموعتها القديمة.`
          },
          lines: [
            "الـ class.",
            "n عنصر، كل واحد لوحده في الأول.",
            "كل عنصر أبوه نفسه (رئيس نفسه).",
            "حجم كل مجموعة (بيتحسب عند الرئيس بس).",
            "عدد المجموعات.",
            "قفلة الـ constructor.",
            "هات رئيس x.",
            "طول ما x مش الرئيس.",
            "path halving: خلّي x يشاور على جده.",
            "واطلع.",
            "قفلة.",
            "الرئيس.",
            "قفلة find.",
            "ادمج مجموعة a ومجموعة b.",
            "رئيس كل واحد.",
            "نفس المجموعة: مفيش دمج (والـ edge ده دايرة).",
            "خلّي ra هو الأكبر.",
            "الصغيرة تحت الكبيرة.",
            "حدّث الحجم.",
            "مجموعة أقل.",
            "اتدمجوا.",
            "قفلة union.",
            "قفلة الـ class.",
            "٦ عناصر.",
            "{0,1,2} و {3,4}.",
            "3 مجموعات (و 5 لوحدها).",
            "0 و 2 مع بعض، و 3 و 5 لأ.",
            "في نفس المجموعة أصلًا: false، والعدد ثابت."
          ]
        },
        {
          cmd: "Dijkstra",
          title: "أقصر طريق لما كل طريق ليه وزن مختلف (Dijkstra)",
          desc: R`BFS بيلاقي أقصر طريق لما كل خطوة بـ 1. لو الطرق ليها أوزان (مسافات، أوقات، تكلفة)، الطريق اللي فيه خطوات أقل ممكن يبقى أطول.

Dijkstra: احفظ أحسن مسافة معروفة لكل عقدة، و min heap فيه [[[المسافة، العقدة]]]. كل مرة اسحب أقرب عقدة لسه ماخلصتش (ده الـ greedy: أقرب عقدة مسافتها نهائية ومش هتتحسن). ومنها، جرّب كل جار: لو المسافة من خلالها أقل من المعروفة، حدّثها وحطها في الـ heap.

ليه الأقرب مسافتها نهائية؟ لأن أي طريق تاني ليها لازم يعدّي على عقدة أبعد، والأوزان موجبة، فمش ممكن يبقى أقصر. وده سبب إن Dijkstra مبيشتغلش مع أوزان سالبة.

الـ heap من درس «min heap (by hand)» ([[require("./min-heap")]]). ومفيش «decrease key»: بنحط نسخة جديدة في الـ heap، ولما نسحب نسخة قديمة (مسافتها أكبر من المعروفة) نفوّتها.`,
          example: R`const { MinHeap } = require("./min-heap");
function dijkstra(graph, source) {
  const dist = new Map([[source, 0]]);
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, source]);
  while (heap.size) {
    const [d, u] = heap.pop();
    if (d > dist.get(u)) continue;
    for (const [v, w] of graph[u] ?? []) {
      const nd = d + w;
      if (nd < (dist.get(v) ?? Infinity)) {
        dist.set(v, nd);
        heap.push([nd, v]);
      }
    }
  }
  return dist;
}
const roads = {
  A: [["B", 4], ["C", 1]],
  C: [["B", 2], ["D", 5]],
  B: [["D", 1]],
};
console.log(Object.fromEntries(dijkstra(roads, "A"))); // { A: 0, B: 3, C: 1, D: 4 }
console.log(dijkstra(roads, "D").get("A")); // undefined
// O((V + E) log V) time with a binary heap, O(V + E) space; all weights must be >= 0`,
          try: R`حل «Network Delay Time»: n سيرفر مترقمين من 1، و times فيها [[[u, v, w]]] (رسالة من u لـ v بتاخد w)، وبتبعت من k. إمتى كل السيرفرات تستلم؟ ولو فيه سيرفر مش هيستلم أبدًا رجّع -1. [[times = [[2,1,1],[2,3,1],[3,4,1]]]] و n = 4 و k = 2 الإجابة 2. وبعدين خلّي [[dijkstra]] ترجّع الطريق نفسه من A لـ D (احفظ «جيت منين»).`,
          sol: R`Network Delay Time: شغّل Dijkstra من k، والإجابة أكبر مسافة بين كل السيرفرات. لو عدد السيرفرات اللي وصلتلها أقل من n، الإجابة -1. للمثال: من 2 لـ 1 و 3 بـ 1، ومن 3 لـ 4 بـ 1، فالمسافات 1 و 1 و 2، والإجابة 2. ولو k = 1 في نفس المثال، 1 مبتبعتش لحد، فـ -1.

الطريق: [[prev.set(v, u)]] جنب [[dist.set(v, nd)]]، وبعدين من D ارجع بالـ prev لحد A واعكس: [[A → C → B → D]] بطول 4. لاحظ إن الطريق المباشر A → B (4) أطول من A → C → B (3)، وده اللي BFS كان هيغلط فيه لأنه بيعدّ الخطوات.

الغلطة الشائعة: تحط العقدة في [[seen]] لما تدخل الـ heap زي BFS. في Dijkstra، العقدة ممكن تدخل الـ heap كذا مرة بمسافات بتتحسن، والنهائية بس هي اللي بتطلع الأول.`,
          solCode: R`const { MinHeap } = require("./min-heap");
function shortest(graph, source) {
  const dist = new Map([[source, 0]]), prev = new Map();
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, source]);
  while (heap.size) {
    const [d, u] = heap.pop();
    if (d > dist.get(u)) continue;
    for (const [v, w] of graph[u] ?? []) {
      if (d + w < (dist.get(v) ?? Infinity)) { dist.set(v, d + w); prev.set(v, u); heap.push([d + w, v]); }
    }
  }
  return { dist, prev };
}
function networkDelayTime(times, n, k) {
  const graph = {};
  for (const [u, v, w] of times) (graph[u] ??= []).push([v, w]);
  const { dist } = shortest(graph, k);
  return dist.size === n ? Math.max(...dist.values()) : -1;
}
function path(graph, from, to) {
  const { dist, prev } = shortest(graph, from);
  if (!dist.has(to)) return null;
  const out = [to];
  while (out[0] !== from) out.unshift(prev.get(out[0]));
  return out.join(" -> ") + " (" + dist.get(to) + ")";
}
console.log(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)); // 2
console.log(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 1)); // -1
console.log(path({ A: [["B", 4], ["C", 1]], C: [["B", 2], ["D", 5]], B: [["D", 1]] }, "A", "D")); // A -> C -> B -> D (4)
// O((V + E) log V) time, O(V + E) space`,
          flag: "script",
          deep: {
            why: "Dijkstra (أو نسخ متطورة منه زي A*) ورا خرايط جوجل وتطبيقات التوصيل، وورا بروتوكولات الـ routing في الإنترنت (OSPF). وفي الانترفيو بيتسأل أقل من BFS، بس لما تيجي مسألة «أقل تكلفة» أو «أقل وقت» بأوزان، لازم تعرف إن BFS مش كفاية.",
            how: R`dry run من A: الـ heap [[[0, A]]]. اسحب A (0): C بـ 1 و B بـ 4، الاتنين أحسن من Infinity، حطهم.

اسحب C (1، الأقرب): B من خلال C = 1 + 2 = 3 < 4، حدّث B لـ 3 وحط [3, B]. D = 1 + 5 = 6، حطها.

اسحب B (3): D من خلالها = 3 + 1 = 4 < 6، حدّث لـ 4.

اسحب [4, B] (النسخة القديمة): 4 > 3، فوّت. اسحب D (4): ملهاش جيران. اسحب [6, D]: 6 > 4، فوّت. خلصنا: A 0، و C 1، و B 3، و D 4.

الـ [[graph[u] ?? []]] عشان D مش key في الـ object (ملهاش طرق طالعة). و [[dist.get(v) ?? Infinity]] عشان العقدة اللي لسه ماوصلناهاش مش في الـ Map.

من D لـ A: مفيش طرق طالعة من D أصلًا، فـ [[dist]] فيها D بس، و [[get("A")]] بترجّع undefined (مش متوصلة).`,
            when: "أقصر طريق من مصدر واحد، والأوزان موجبة أو صفر. الأوزان كلها 1: BFS أبسط وأسرع. فيه أوزان سالبة: Bellman-Ford ([[O(V × E)]]). أقصر طريق بين كل الأزواج في graph صغير: Floyd-Warshall ([[O(V^3)]]). ولو عندك تقدير للمسافة للهدف (زي المسافة المستقيمة على الخريطة)، A* بيوصل أسرع.",
            mistakes: R`استخدام BFS مع أوزان. ونسيان سطر [[if (d > dist.get(u)) continue]]: الكود بيفضل صح بس بيعيد شغل على نسخ قديمة. واستخدام Dijkstra مع أوزان سالبة (بيطلّع إجابة غلط من غير أي error). والـ heap بـ sort بعد كل push. وفي الانترفيو: قول الـ Big-O صح [[O((V + E) log V)]]، واذكر إن الـ greedy هنا صح بسبب إن الأوزان مش سالبة.`
          },
          lines: [
            "الـ heap من ملف min-heap.js.",
            "أقصر مسافة من source لكل عقدة.",
            "أحسن مسافة معروفة، والمصدر 0.",
            "heap على [المسافة، العقدة]، والأقرب يطلع الأول.",
            "ابدأ بالمصدر.",
            "طول ما فيه عقد.",
            "أقرب واحدة.",
            "نسخة قديمة (لقينا أحسن منها بعد ما اتحطت): فوّت.",
            "لكل طريق طالع [الجار، الوزن].",
            "المسافة للجار من خلالي.",
            "أحسن من المعروفة؟",
            "حدّثها.",
            "وحط النسخة الجديدة في الـ heap.",
            "قفلة الـ if.",
            "قفلة الـ for.",
            "قفلة الـ while.",
            "كل المسافات.",
            "قفلة.",
            "الطرق: من كل مدينة لـ [مدينة، مسافة].",
            "A لـ B بـ 4، و A لـ C بـ 1.",
            "C لـ B بـ 2، و C لـ D بـ 5.",
            "B لـ D بـ 1.",
            "قفلة.",
            "B بـ 3 (من خلال C) مش 4، و D بـ 4.",
            "مفيش طرق طالعة من D: A مش متوصلة."
          ]
        },
        {
          cmd: "bit manipulation (XOR)",
          title: "حيل الـ bits: الـ XOR بيلاقي الرقم الوحيد، و n & (n - 1) بيشيل آخر 1",
          desc: R`الأرقام جوه الجهاز bits، و JavaScript بتدّيك عمليات عليها: [[&]] (and)، و [[|]] (or)، و [[^]] (xor)، و [[~]] (not)، و [[<<]] و [[>>]] (إزاحة).

XOR ليه ٣ خواص بتعمل سحر: [[x ^ x = 0]]، و [[x ^ 0 = x]]، والترتيب مش بيفرق. فلو عملت XOR لكل الأرقام في array كل رقم فيها متكرر مرتين ما عدا واحد، الأزواج بتلغي بعض ويفضل الوحيد. [[O(n)]] وقت و [[O(1)]] ذاكرة، من غير Map.

[[n & (n - 1)]] بيشيل أيمن 1 في n. فـ «n قوة لـ 2؟» = [[n > 0 && (n & (n - 1)) === 0]] (قوى الـ 2 فيها 1 واحد بس). وعدّ الـ 1s: شيل واحد لحد ما n تبقى 0.

الـ flags: كل صلاحية bit ([[READ = 1]]، و [[WRITE = 2]]، و [[ADMIN = 4]]). [[|]] يجمعهم، و [[&]] يسأل «فيه الصلاحية دي؟». ده نفس الـ permissions في لينكس ([[chmod 755]]).

تحذير JavaScript: الـ bitwise بيحوّل الرقم لـ 32-bit بإشارة. [[2 ** 31 | 0]] بيطلع سالب، والأرقام أكبر من كده بتتقص. لو محتاج أكتر من 32 bit، استخدم BigInt.`,
          example: R`const single = nums => nums.reduce((acc, x) => acc ^ x, 0);
const missing = nums => nums.reduce((acc, x, i) => acc ^ x ^ (i + 1), 0);
const isPowerOfTwo = n => n > 0 && (n & (n - 1)) === 0;
function countBits(n) {
  let count = 0;
  while (n) { n &= n - 1; count++; }
  return count;
}
const READ = 1, WRITE = 2, ADMIN = 4;
const perms = READ | WRITE;
console.log(single([4, 1, 2, 1, 2])); // 4
console.log(missing([3, 0, 1])); // 2
console.log(isPowerOfTwo(64), isPowerOfTwo(12)); // true false
console.log(countBits(11), (11).toString(2)); // 3 1011
console.log((perms & WRITE) !== 0, (perms & ADMIN) !== 0); // true false
console.log(2 ** 31 | 0, 2n ** 40n); // -2147483648 1099511627776n
// single and missing: O(n) time, O(1) space; countBits: O(number of 1 bits)`,
          try: R`حل «Counting Bits»: array فيها عدد الـ 1s لكل رقم من 0 لـ n في [[O(n)]] (مش [[countBits]] لكل رقم). n = 5 الإجابة [[[0, 1, 1, 2, 1, 2]]]. (عدد الـ 1s في i = عدد الـ 1s في [[i >> 1]] + آخر bit في i.) وبعدين «Single Number III»: كل رقم متكرر مرتين ما عدا اتنين، هاتهم الاتنين في [[O(1)]] ذاكرة. [[[1, 2, 1, 3, 2, 5]]] الإجابة 3 و 5.`,
          sol: R`Counting Bits: [[dp[i] = dp[i >> 1] + (i & 1)]]. [[i >> 1]] هو i من غير آخر bit (أصغر من i، فمحسوب قبل كده)، و [[i & 1]] هو آخر bit. ده DP صغير. الناتج لـ 5: [[[0, 1, 1, 2, 1, 2]]].

Single Number III: الـ XOR للكل = [[a ^ b]] (الأزواج اتلغت)، ومش صفر لأن a ≠ b. أي bit فيه 1 في الناتج ده معناه إن a و b مختلفين فيه. خد أيمن bit بـ [[x & -x]]، وقسّم الأرقام لمجموعتين: اللي فيها الـ bit ده واللي مفيهاش. a في مجموعة و b في التانية، وكل زوج متكرر بيقع كله في نفس المجموعة. XOR لكل مجموعة لوحدها يطلّع a و b.

للمثال: [[3 ^ 5 = 6]] (110)، وأيمن bit هو 2 (010). اللي فيهم الـ bit ده: 2 و 3 و 2 → XOR = 3. الباقي: 1 و 1 و 5 → 5.

الغلطة الشائعة: تقارن [[(x & mask) === 1]] بدل [[!== 0]]. لو الـ mask مش 1، ناتج الـ & هو الـ mask نفسه (2 أو 4...) مش 1.`,
          solCode: R`function countBitsUpTo(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
}
function singleNumberIII(nums) {
  const xor = nums.reduce((acc, x) => acc ^ x, 0);
  const bit = xor & -xor;
  let a = 0, b = 0;
  for (const x of nums) {
    if ((x & bit) !== 0) a ^= x;
    else b ^= x;
  }
  return [a, b].sort((p, q) => p - q);
}
console.log(countBitsUpTo(5)); // [0, 1, 1, 2, 1, 2]
console.log(singleNumberIII([1, 2, 1, 3, 2, 5])); // [3, 5]
console.log(singleNumberIII([-1, 0])); // [-1, 0]
// countBitsUpTo: O(n) time and space; singleNumberIII: O(n) time, O(1) space`,
          flag: "script",
          deep: {
            why: "في شغل الـ web، الـ bits بتظهر في: permission flags (Discord و Unix بيخزنوا الصلاحيات كـ bits)، و feature flags مضغوطة في رقم واحد، و hashing، و bloom filters، وضغط البيانات، و WebGL. وفي الانترفيو، Single Number و Missing Number و Number of 1 Bits مسائل Easy مشهورة، والـ XOR trick بيخلّي الحل سطر واحد.",
            how: R`single على [4, 1, 2, 1, 2]: [[0 ^ 4 = 4]]، [[4 ^ 1 = 5]]، [[5 ^ 2 = 7]]، [[7 ^ 1 = 6]]، [[6 ^ 2 = 4]]. الـ 1 والـ 2 لغوا بعض.

missing على [3, 0, 1] (أرقام من 0 لـ 3 وناقص واحد): XOR كل الأرقام اللي في الـ array مع كل الأرقام من 1 لـ n. الموجودين بيتلغوا مع نفسهم، ويفضل الناقص: [[3 ^ 1 ^ 0 ^ 2 ^ 1 ^ 3 = 2]].

countBits(11): 11 = 1011. [[1011 & 1010 = 1010]]، [[1010 & 1001 = 1000]]، [[1000 & 0111 = 0]]. ٣ خطوات = ٣ واحدات. ليه؟ [[n - 1]] بيقلب أيمن 1 لـ 0 وكل الأصفار اللي بعده لـ 1، فالـ & بيشيل الـ 1 ده بس.

[[(11).toString(2)]] بيطبع الرقم بالـ binary، و [[parseInt("1011", 2)]] العكس. مفيدين للـ debugging.

[[2 ** 31 | 0]]: 2^31 مش داخل في 32-bit بإشارة (أقصاه [[2^31 - 1]])، فبيلف ويبقى سالب. BigInt ([[2n ** 40n]]) مفيهوش الحد ده، والـ bitwise شغال عليه.`,
            when: "مسائل «كل حاجة متكررة ما عدا» (XOR)، والـ flags والـ masks، و «قوة لـ 2؟»، والـ subsets بالـ bitmask (n ≤ 20)، و DP على bitmask. في كود الشغل العادي، استخدم Set أو object من الـ booleans لو أوضح؛ الـ bits بتوفّر ذاكرة وسرعة بس بتصعّب القراية.",
            mistakes: R`نسيان إن الـ bitwise في JS بيقص لـ 32 bit (IDs كبيرة، و timestamps بالملّي ثانية). وأولوية العمليات: [[n & n - 1 === 0]] بتتقري [[n & ((n - 1) === 0)]]، فحط أقواس دايمًا. والخلط بين [[>>]] (بتحفظ الإشارة) و [[>>>]] (بتملى أصفار). و [[~~x]] أو [[x | 0]] كـ «تقريب» بيبوّظ الأرقام الكبيرة، استخدم [[Math.trunc]].`
          },
          lines: [
            "الـ XOR لكل الأرقام: الأزواج بتلغي بعض.",
            "XOR الأرقام مع 1 لـ n: الناقص بس اللي بيفضل.",
            "قوة لـ 2 = فيها 1 واحد بس.",
            "عدّ الـ 1s.",
            "العداد.",
            "شيل أيمن 1 وعدّ، لحد ما يخلصوا.",
            "رجّع.",
            "قفلة.",
            "كل صلاحية bit لوحدها.",
            "صلاحيتين مع بعض = 3 (011).",
            "4 هي الوحيدة.",
            "2 ناقصة من 0 لـ 3.",
            "64 = 1000000، و 12 = 1100.",
            "11 فيها ٣ واحدات.",
            "فيه WRITE، ومفيش ADMIN.",
            "2^31 بيلف لسالب في 32-bit، و BigInt مفيهوش حد."
          ]
        },
        {
          cmd: "LRU cache (Map)",
          title: "cache حجمه محدود بيطرد اللي بقاله أطول وقت ماتستخدمش (LRU Cache)",
          desc: R`LRU (least recently used): لما الـ cache يتملي وعايز تضيف حاجة جديدة، اطرد اللي بقاله أطول وقت محدش لمسه. والمطلوب في الانترفيو: [[get]] و [[put]] الاتنين [[O(1)]].

الحل الكلاسيكي في أي لغة: hash map + doubly linked list. الـ map بتوصلك للعقدة في [[O(1)]]، والـ list بتحفظ الترتيب: الجديد في آخرها والقديم في أولها، وتقدر تشيل عقدة من النص في [[O(1)]].

في JavaScript فيه اختصار: الـ [[Map]] بتحفظ ترتيب الإضافة. فـ «استخدمت key» = امسحه وضيفه تاني (يروح للآخر). و «اطرد الأقدم» = أول key في الـ Map: [[map.keys().next().value]]. كل ده [[O(1)]] في المتوسط.

في الانترفيو قول الاختصار ده، بس اتوقع إنهم يقولولك «اعملها من غير ما تعتمد على ترتيب الـ Map»، فاعرف النسخة الكلاسيكية كمان (الـ try).`,
          example: R`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);
  }
}
const cache = new LRUCache(2);
cache.put(1, "one");
cache.put(2, "two");
console.log(cache.get(1)); // one
cache.put(3, "three");
console.log(cache.get(2), [...cache.map.keys()]); // -1 [1, 3]
cache.put(1, "ONE");
cache.put(4, "four");
console.log([...cache.map.entries()]); // [[1, 'ONE'], [4, 'four']]
// get and put: O(1) average; O(capacity) space`,
          try: R`اكتب [[LRUList]] بنفس الـ API من غير ما تعتمد على ترتيب الـ Map: Map من الـ key للعقدة، و doubly linked list فيها عقدتين وهميتين [[head]] و [[tail]] (عشان متعملش if للأطراف). محتاج دالتين صغيرين: [[remove(node)]] و [[addToEnd(node)]]. لازم تعدّي نفس السيناريو اللي في المثال وتطلّع نفس النتايج.`,
          sol: R`نفس الناتج: [[one]]، وبعدين [[-1]] و الترتيب [[1 3]]، وبعد ما [[put(1)]] و [[put(4)]]، الـ cache فيه 1 و 4 (الـ 3 اتطردت لأن 1 اتحدثت بعدها).

العقدة فيها [[key]] و [[value]] و [[prev]] و [[next]]. الـ key لازم يبقى في العقدة، عشان لما تطرد [[head.next]] تعرف تمسحه من الـ Map.

[[remove(node)]]: [[node.prev.next = node.next]] و [[node.next.prev = node.prev]]. [[addToEnd(node)]]: حطها بين [[tail.prev]] و [[tail]]. بالعقد الوهمية، مفيش ولا if في الدالتين.

get: لو موجود، remove و addToEnd ورجّع القيمة. put: لو موجود، حدّث القيمة وحرّكها للآخر. لو جديد، اعمل عقدة وضيفها، ولو الحجم عدّى، اطرد [[head.next]].

الغلطة الشائعة: singly linked list، فالـ remove من النص يبقى [[O(n)]] لأنك محتاج تلاقي اللي قبلها.`,
          solCode: R`class LRUList {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { prev: null, next: null };
    this.tail = { prev: this.head, next: null };
    this.head.next = this.tail;
  }
  remove(node) { node.prev.next = node.next; node.next.prev = node.prev; }
  addToEnd(node) {
    node.prev = this.tail.prev; node.next = this.tail;
    this.tail.prev.next = node; this.tail.prev = node;
  }
  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;
    this.remove(node); this.addToEnd(node);
    return node.value;
  }
  put(key, value) {
    let node = this.map.get(key);
    if (node) { node.value = value; this.remove(node); }
    else { node = { key, value }; this.map.set(key, node); }
    this.addToEnd(node);
    if (this.map.size > this.capacity) {
      const oldest = this.head.next;
      this.remove(oldest);
      this.map.delete(oldest.key);
    }
  }
  keys() { const out = []; for (let n = this.head.next; n !== this.tail; n = n.next) out.push(n.key); return out; }
}
const cache = new LRUList(2);
cache.put(1, "one"); cache.put(2, "two");
console.log(cache.get(1)); // one
cache.put(3, "three");
console.log(cache.get(2), cache.keys()); // -1 [1, 3]
cache.put(1, "ONE"); cache.put(4, "four");
console.log(cache.keys(), cache.get(1)); // [1, 4] ONE
// get and put: O(1); O(capacity) space`,
          flag: "script",
          deep: {
            why: "الـ LRU هو سياسة الطرد الأشهر: الـ browser cache، و [[maxmemory-policy allkeys-lru]] في Redis (Redis بيطبّق نسخة تقريبية بتاخد عينة)، ومكتبة [[lru-cache]] في npm اللي بتستخدمها أدوات كتير، و cache الصفحات في نظام التشغيل. و LRU Cache من أكتر مسائل «صمّم data structure» اللي بتتسأل في الانترفيو.",
            how: R`السيناريو: [[put(1)]] و [[put(2)]]: الترتيب 1 ثم 2. [[get(1)]]: امسح 1 وضيفه تاني، الترتيب 2 ثم 1 (1 بقى الأحدث). [[put(3)]]: الترتيب 2 و 1 و 3، والحجم 3 > 2، فاطرد أول key: 2. [[get(2)]] = -1.

[[put(1, "ONE")]]: 1 موجود، امسحه وضيفه بالقيمة الجديدة، الترتيب 3 ثم 1. [[put(4)]]: 3 و 1 و 4، اطرد 3. الباقي 1 و 4.

ليه [[delete]] ثم [[set]] في [[put]] حتى لو الـ key موجود؟ لأن [[set]] على key موجود بيغيّر القيمة بس ومش بيحرّكه للآخر. ده أكتر bug بيحصل في النسخة دي.

[[this.map.keys().next().value]]: [[keys()]] بترجّع iterator، و [[next()]] بتدّي أول عنصر من غير ما تعمل array. ده [[O(1)]]، عكس [[[...map.keys()][0]]] اللي بيعمل array كاملة ([[O(n)]]).`,
            when: "cache بحجم محدود والبيانات الحديثة غالبًا هتتطلب تاني: نتايج API، وصور، و query results، وملفات compiled. لو محتاج انتهاء بالوقت (TTL)، ضيف timestamp لكل entry. لو فيه حاجات بتتطلب كتير جدًا بس مش حديثة، LFU (الأقل استخدامًا) ممكن يبقى أحسن. وفي الـ production على أكتر من سيرفر، استخدم Redis بدل Map في الذاكرة (درس «cache-aside + TTL» في «تاب بناء مشروع كامل»).",
            mistakes: R`[[set]] على key موجود من غير [[delete]]، فالترتيب ميتحدثش. ونسيان إن [[get]] كمان بتحدّث الترتيب. وطرد الأقدم قبل ما تتأكد إن الـ key الجديد مش موجود أصلًا (فتطرد حاجة من غير داعي). وفي النسخة الكلاسيكية: نسيان تخزين الـ key في العقدة. وفي الـ production: cache في ذاكرة process واحدة مش بيتشارك بين السيرفرات، وبيضيع مع كل restart.`
          },
          lines: [
            "الـ cache.",
            "بياخد الحجم الأقصى.",
            "نحفظه.",
            "Map بتحفظ ترتيب الإضافة: الأقدم في الأول.",
            "قفلة.",
            "قراءة.",
            "مش موجود: -1 (زي ما LeetCode بيطلب).",
            "القيمة.",
            "امسحه.",
            "وضيفه تاني: بقى الأحدث.",
            "رجّع القيمة.",
            "قفلة get.",
            "كتابة.",
            "لو موجود امسحه الأول، عشان set لوحدها مش بتغيّر الترتيب.",
            "ضيفه في الآخر.",
            "عدّينا الحجم: اطرد أول key (الأقدم).",
            "قفلة put.",
            "قفلة الـ class.",
            "cache بيشيل عنصرين.",
            "ضيف 1.",
            "ضيف 2.",
            "قراءة 1 بتخليه الأحدث.",
            "ضيف 3: الأقدم دلوقتي 2، فيتطرد.",
            "2 اتطرد، والباقي 1 و 3.",
            "حدّث 1: بقى الأحدث.",
            "ضيف 4: الأقدم 3، فيتطرد.",
            "الباقي 1 بالقيمة الجديدة و 4."
          ]
        }
      ]
    },
    {
      t: "حل المسائل والتمرين",
      l: 3,
      n: "إطار ثابت لأي مسألة في الانترفيو، وخطة تمرين: مسائل متدرجة لكل نمط، وجلسات بتايمر، ومراجعة اللي وقعت فيه",
      items: [
        {
          cmd: "interview framework",
          title: "مسألة جديدة قدامك في الانترفيو: تعمل إيه بالترتيب؟",
          desc: R`الإنترفيوير بيقيّم طريقة وصولك للحل قد الحل نفسه. الخطوات دي بتضمن إنك متقعدش ساكت، ومتكتبش كود لمسألة غير اللي اتسألت. (الجانب الكلامي والتواصل مشروح في «تاب الانترفيو»، درس «clarify → examples → brute → optimize → test». هنا بنطبّقه على كود.)

١. clarify (٢-٣ دقايق): اسأل عن الـ input: فاضي ممكن؟ أرقام سالبة؟ تكرار؟ مترتب؟ الحجم قد إيه؟ (n ≤ 20 غالبًا exponential مقبول، و n ≤ 10^5 محتاج [[O(n log n)]] أو أحسن.) والـ output: أرجّع إيه لو مفيش إجابة؟

٢. examples (٢-٣ دقايق): اكتب مثال عادي، ومثال edge (فاضي، عنصر واحد، كله متكرر)، وحلهم بإيدك. دول هيبقوا الـ tests بعدين.

٣. brute force (دقيقتين): قول أبسط حل وقيمته Big-O، حتى لو بطيء. ده بيثبت إنك فاهم المسألة، وبيدّيك حاجة ترجع لها لو اتزنقت.

٤. optimize (٥-١٠ دقايق): فين الشغل المتكرر؟ قارن بالأنماط: hash map، two pointers، sliding window، sort، binary search، heap، BFS/DFS، DP. قول الـ Big-O المتوقعة قبل ما تكتب.

٥. code (١٥-٢٠ دقيقة): أسماء واضحة، ودوال صغيرة، واتكلم وانت بتكتب.

٦. test: مشّي الأمثلة بإيدك على الكود نفسه (مش على اللي في دماغك)، وبعدين الـ edge cases.

٧. complexity: وقت وذاكرة، وليه. واذكر trade-off لو فيه.`,
          example: R`// 1. Clarify: unsorted ints, may repeat, may be empty -> 0. Longest run of consecutive values.
// 2. Examples: [100, 4, 200, 1, 3, 2] -> 4 (1 2 3 4); [] -> 0; [1, 2, 0, 1] -> 3
// 3. Brute force: sort, then count runs. O(n log n)
function longestBrute(nums) {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  let best = 0, run = 0;
  for (let i = 0; i < sorted.length; i++) {
    run = i > 0 && sorted[i] === sorted[i - 1] + 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}
// 4. Optimize: a Set gives O(1) lookups; only start counting at the start of a run
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue;
    let len = 1;
    while (set.has(x + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}
// 6. Test: the examples + edge cases, against the brute force
const tests = [{ input: [100, 4, 200, 1, 3, 2], want: 4 }, { input: [], want: 0 }, { input: [1, 2, 0, 1], want: 3 }, { input: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], want: 9 }, { input: [-2, -1, 5], want: 2 }];
const results = tests.map(({ input, want }) => longestConsecutive(input) === want && longestBrute(input) === want);
console.log(results.every(Boolean) ? "all passed" : results); // all passed
// 7. Complexity: brute O(n log n) time; optimized O(n) time (each run is walked once, from its start), O(n) space`,
          try: R`طبّق الـ ٧ خطوات على «Product of Array Except Self» بتايمر ٣٠ دقيقة وبصوت عالي: array، رجّع array كل خانة فيها حاصل ضرب كل العناصر ما عدا اللي في مكانها، من غير قسمة، في [[O(n)]]. [[[1, 2, 3, 4]]] → [[[24, 12, 8, 6]]]. اكتب الـ clarify والـ examples كـ comments الأول، وبعدين brute force، وبعدين الحل الأحسن، وقارن الاتنين على الأمثلة.`,
          sol: R`clarify: فيه أصفار؟ (مهم جدًا: القسمة كانت هتقع). أرقام سالبة؟ الطول ≥ 2؟ ممكن الناتج يعدّي حدود الأرقام؟

examples: [[[1, 2, 3, 4]]] → [[[24, 12, 8, 6]]]، و [[[-1, 1, 0, -3, 3]]] → [[[0, 0, 9, 0, 0]]] (صفر واحد: كل الخانات صفر ما عدا مكانه)، و [[[0, 0]]] → [[[0, 0]]].

brute force: لكل i، loop يضرب الباقي. [[O(n^2)]].

optimize: الإجابة عند i = (حاصل ضرب كل اللي على شماله) × (كل اللي على يمينه). ده prefix و suffix (زي درس «prefix sum» بس ضرب). لفة من الشمال تكتب الـ prefix في الناتج، ولفة من اليمين تضرب في suffix متراكم في متغير. [[O(n)]] وقت، و [[O(1)]] ذاكرة زيادة (غير الناتج).

الأخطاء اللي بتتكرر: الحل بالقسمة (بيقع مع الصفر)، ونسيان إن [[-0]] بيطلع في JavaScript لما تضرب صفر في سالب ([[Object.is(-0, 0)]] false، بس [[-0 === 0]] true، فالـ tests بـ [[===]] بتعدّي). ولو خلصت في أقل من ٣٠ دقيقة، قول الـ follow-up لوحدك: «لو مسموح بالقسمة، هتعامل مع الأصفار إزاي؟».`,
          solCode: R`// Brute force: O(n^2)
const productBrute = nums => nums.map((_, i) => nums.reduce((p, x, j) => (j === i ? p : p * x), 1));
// Optimized: prefix products left to right, then suffix products right to left. O(n) time, O(1) extra space
function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) out[i] = out[i - 1] * nums[i - 1];
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= nums[i];
  }
  return out;
}
const tests = [[[1, 2, 3, 4], [24, 12, 8, 6]], [[-1, 1, 0, -3, 3], [0, 0, 9, 0, 0]], [[0, 0], [0, 0]], [[2, 3], [3, 2]]];
for (const [input, want] of tests) {
  const a = productExceptSelf(input), b = productBrute(input);
  console.log(a.every((x, i) => x === want[i]) && b.every((x, i) => x === want[i]) ? "ok" : "FAIL", a.join(" "));
}
// ok 24 12 8 6 / ok 0 0 9 0 0 / ok 0 0 / ok 3 2`,
          flag: "script",
          deep: {
            why: "أغلب الناس بتفشل في الانترفيو مش عشان مش عارفة الحل، لكن عشان بدأت تكتب على طول، وحلّت مسألة غير المطلوبة، أو اتزنقت في النص وسكتت، أو قالت «خلصت» والكود فيه bug في أول مثال. الإطار الثابت بيحميك من الـ ٤ دول، وبيدّي الإنترفيوير فرص يساعدك (hints) في الوقت الصح.",
            how: R`المثال مكتوب بنفس الترتيب اللي هتقوله: الـ clarify والـ examples comments فوق، وبعدين brute force، وبعدين optimize مع جملة بتقول الفكرة، وبعدين tests بتقارن الاتنين.

الفكرة في [[longestConsecutive]]: الحل البديهي بعد الـ Set: من كل رقم، عدّ لقدام طول ما [[x + 1]] موجود. ده ممكن يبقى [[O(n^2)]] (كل رقم في run طويل هيعدّ الـ run من عنده). الحيلة: متبدأش تعدّ غير من «بداية run» (رقم ملوش [[x - 1]]). فكل run بيتمشي مرة واحدة، والإجمالي [[O(n)]] حتى مع الـ while الداخلي.

ده بالظبط نوع الجملة اللي الإنترفيوير عايز يسمعها في خطوة ٧: «فيه loop جوه loop، بس الـ inner loop بيتنفذ مرة واحدة لكل عنصر في الإجمالي، فـ amortized [[O(n)]]».

الـ brute force بيفضل مفيد بعد ما تلاقي الحل الأحسن: قارن الاتنين على inputs عشوائية كتير. لو اختلفوا في أي حالة، فيه bug. ده اسمه stress testing، وبيتعمل في المسابقات والشغل.

توزيع الوقت في انترفيو ٤٥ دقيقة: حوالي ٥ للتعارف، و ٣٠-٣٥ للمسألة (زي التقسيم اللي في الشرح)، و ٥ لأسئلتك. لو عدّت ١٠ دقايق في optimize من غير فكرة، اكتب الـ brute force وقول «هحسّنه لو فضل وقت».`,
            when: "في كل مسألة، حتى السهلة. في المسألة السهلة الـ clarify والـ examples بياخدوا دقيقة، بس بيبيّنوا إنك منظم. وفي الـ online assessment (من غير إنترفيوير) نفس الخطوات بس في دماغك، والـ examples بتبقى test cases بتجرّبها قبل الـ submit.",
            mistakes: R`تبدأ تكتب قبل الـ clarify. تسكت أكتر من دقيقة (قول «بفكر في hash map عشان...»). تتمسك بفكرة optimize مش ماشية بدل ما تكتب brute force. تقول «خلصت» من غير ما تمشّي مثال على الكود. تقول Big-O غلط (أو ماتقولهاش خالص). وفي الآخر، متسألش أسئلة للإنترفيوير عن الشغل (درس «أسئلتك للإنترفيوير» في «تاب الانترفيو»).`
          },
          lines: [
            "الـ brute force: رتّب بعد ما تشيل المكرر.",
            "نسخة من غير تكرار ومترتبة.",
            "أطول run، والـ run الحالي.",
            "على الأرقام المترتبة.",
            "الرقم بعد اللي قبله بواحد؟ كمّل الـ run، غير كده ابدأ من 1.",
            "حدّث الأطول.",
            "قفلة.",
            "الإجابة.",
            "قفلة.",
            "الحل الأحسن.",
            "Set: بحث في O(1) ومن غير تكرار.",
            "الأطول.",
            "لكل رقم (مرة واحدة حتى لو متكرر).",
            "مش بداية run: فوّت، هيتعد من بدايته.",
            "من البداية.",
            "عدّ لقدام.",
            "حدّث.",
            "قفلة.",
            "الإجابة.",
            "قفلة.",
            "الأمثلة والـ edge cases: الـ input والإجابة المتوقعة.",
            "كل test: الحلين لازم يدّوا الإجابة.",
            "لو كله نجح اطبع كده، غير كده اطبع أنهي فشل."
          ]
        },
        {
          cmd: "practice regimen",
          title: "خطة تمرين حقيقية: أنهي مسائل، بتايمر قد إيه، وإمتى ترجع للي وقعت فيها",
          desc: R`«مسألة أو اتنين كل يوم» مش خطة. الخطة ليها ٣ أجزاء: قائمة متدرجة لكل نمط، وجلسات بتايمر، ومراجعة متباعدة للي وقعت فيه.

١. القائمة: لكل نمط في التاب ده، ٣ easy و ٣ medium و ١ hard، بأسمائهم على LeetCode. اعمل الـ easy بتاعة النمط، وبعدين الـ medium، وسيب الـ hard لما تخلص الأنماط كلها. القائمة كاملة في «الحل» تحت (بعد ما تجرب). والتصنيف easy/medium/hard حسب LeetCode وقت الكتابة، وممكن يتغير.

٢. الجلسات بتايمر: easy ٢٠ دقيقة، و medium ٣٥، و hard ٥٠. لو الوقت خلص ومفيش فكرة: اقرا hint واحدة بس، وخد ١٠ دقايق زيادة. لو لسه: اقرا الحل، وافهمه، واقفل الصفحة، واكتبه من دماغك. أي مسألة احتاجت hint أو حل، أو عدّت الوقت، اسمها «وقعت فيها».

٣. المراجعة المتباعدة (spaced repetition): المسألة اللي وقعت فيها ترجعلها بعد يوم، وبعدين ٣ أيام، وبعدين أسبوع، وأسبوعين، وشهر. كل مرة تحلها لوحدك في الوقت، تروح للمسافة اللي بعدها. لو وقعت تاني، ترجع لأول (بعد يوم). بعد ما تعدّي الشهر، اعتبرها اتقفلت.

المثال سكربت صغير بيعمل الحساب ده: كل مسألة معاها [[step]] (أنهي مسافة) و [[last]] (آخر محاولة)، والسكربت بيقولك إيه اللي عليه الدور النهاردة.`,
          example: R`const DAY = 24 * 60 * 60 * 1000;
const INTERVALS = [1, 3, 7, 14, 30];
function review(card, result, today) {
  const step = result === "ok" ? card.step + 1 : 0;
  return { ...card, step, last: today, done: step >= INTERVALS.length };
}
function dueToday(cards, today) {
  const now = Date.parse(today);
  return cards
    .filter(c => !c.done && Date.parse(c.last) + INTERVALS[c.step] * DAY <= now)
    .map(c => c.title);
}
let cards = [
  { title: "Coin Change", step: 0, last: "2026-09-01" },
  { title: "Course Schedule", step: 3, last: "2026-09-20" },
  { title: "Merge k Sorted Lists", step: 1, last: "2026-09-27" },
];
console.log(dueToday(cards, "2026-09-29")); // ['Coin Change']
cards = cards.map(c => (c.title === "Coin Change" ? review(c, "ok", "2026-09-29") : c));
console.log(cards[0]); // { title: 'Coin Change', step: 1, last: '2026-09-29', done: false }
console.log(dueToday(cards, "2026-09-30")); // ['Merge k Sorted Lists']
console.log(review(cards[2], "fail", "2026-09-30").step); // 0
// every call is O(number of cards)`,
          try: R`حوّل السكربت لأداة بتستخدمها فعلًا: ملف [[cards.json]] فيه مسائلك، و [[node review.js]] يطبع اللي عليه الدور النهاردة، و [[node review.js "Coin Change" ok]] (أو fail) يحدّث المسألة ويحفظ. وبعدين ابدأ الخطة: الأسبوع ده الأنماط الـ ٣ الأولى من القائمة (easy بس)، وسجّل كل مسألة بالوقت اللي أخدته ولو احتجت hint.`,
          sol: R`الأداة: [[fs.readFileSync]] و [[JSON.parse]] في الأول، و [[fs.writeFileSync]] في الآخر، و [[process.argv.slice(2)]] للـ arguments. لو مفيش arguments اطبع [[dueToday]]، ولو فيه اسم ونتيجة شغّل [[review]] على المسألة دي (ولو مش موجودة ضيفها بـ [[step: 0]]). النهاردة = [[new Date().toISOString().slice(0, 10)]]. الـ solCode تحت شغال بتاريخ ثابت عشان الناتج يبقى متوقع.

القائمة المتدرجة (easy / medium / hard):

arrays و strings: Reverse String، Valid Anagram، Valid Palindrome / Rotate Array، Product of Array Except Self، String Compression / First Missing Positive.

hash map و set: Two Sum، Contains Duplicate، First Unique Character in a String / Group Anagrams، Longest Consecutive Sequence، Top K Frequent Elements / Substring with Concatenation of All Words.

recursion و prefix sums: Fibonacci Number، Range Sum Query - Immutable، Find Pivot Index / Subarray Sum Equals K، Pow(x, n)، Continuous Subarray Sum / Number of Submatrices That Sum to Target.

two pointers: Merge Sorted Array، Move Zeroes، Remove Duplicates from Sorted Array / Two Sum II - Input Array Is Sorted، 3Sum، Container With Most Water / Trapping Rain Water.

sliding window: Maximum Average Subarray I، Best Time to Buy and Sell Stock، Contains Duplicate II / Longest Substring Without Repeating Characters، Longest Repeating Character Replacement، Permutation in String / Minimum Window Substring.

stacks و queues: Valid Parentheses، Implement Queue using Stacks، Baseball Game / Min Stack، Daily Temperatures، Evaluate Reverse Polish Notation / Largest Rectangle in Histogram.

binary search: Binary Search، Search Insert Position، First Bad Version / Find First and Last Position of Element in Sorted Array، Search in Rotated Sorted Array، Koko Eating Bananas / Median of Two Sorted Arrays.

sorting: Squares of a Sorted Array، Majority Element، Height Checker / Sort an Array، Sort Colors، Largest Number / Count of Smaller Numbers After Self.

linked lists و intervals: Reverse Linked List، Merge Two Sorted Lists، Linked List Cycle / Merge Intervals، Insert Interval، Remove Nth Node From End of List / Reverse Nodes in k-Group.

trees: Maximum Depth of Binary Tree، Invert Binary Tree، Diameter of Binary Tree / Binary Tree Level Order Traversal، Validate Binary Search Tree، Lowest Common Ancestor of a Binary Tree / Serialize and Deserialize Binary Tree.

graphs: Find if Path Exists in Graph، Flood Fill، Find the Town Judge / Number of Islands، Course Schedule، Rotting Oranges / Word Ladder.

heaps: Kth Largest Element in a Stream، Last Stone Weight، Relative Ranks / Kth Largest Element in an Array، Top K Frequent Words، K Closest Points to Origin / Merge k Sorted Lists.

dynamic programming: Climbing Stairs، Min Cost Climbing Stairs، N-th Tribonacci Number / House Robber، Coin Change، Longest Common Subsequence / Distinct Subsequences.

greedy: Assign Cookies، Lemonade Change، Maximum Units on a Truck / Jump Game، Non-overlapping Intervals، Gas Station / Candy.

backtracking و trie: Binary Watch، Letter Case Permutation (medium على LeetCode، بس سهلة كبداية)، Longest Common Prefix / Subsets، Combination Sum، Implement Trie (Prefix Tree) / N-Queens.

union-find و Dijkstra و bits و LRU: Single Number، Missing Number، Number of 1 Bits / Number of Provinces، Network Delay Time، LRU Cache / Swim in Rising Water.

الجدول الأسبوعي المقترح: ٥ أيام × جلسة ساعة (مسألة جديدة أو اتنين + اللي عليه الدور في المراجعة)، ويوم واحد mock: مسألتين medium ورا بعض في ٧٠ دقيقة، بصوت عالي أو مع صاحبك، من غير ما تعرف النمط مسبقًا (اختار عشوائي من القائمة). ويوم راحة. المراجعة ليها الأولوية على المسائل الجديدة.

الغلطات الشائعة: تحل ٥٠٠ مسألة من غير ما ترجع لأي واحدة (هتنساهم). وتقرا الحل بعد ٥ دقايق. وتفضل على easy لأنها مريحة. وتحل من غير تايمر، فأول انترفيو الوقت يخضّك.`,
          solCode: R`const fs = require("fs");
const DAY = 24 * 60 * 60 * 1000, INTERVALS = [1, 3, 7, 14, 30];
const FILE = "cards.json";
const review = (card, result, today) => {
  const step = result === "ok" ? card.step + 1 : 0;
  return { ...card, step, last: today, done: step >= INTERVALS.length };
};
const due = (cards, today) => cards.filter(c => !c.done && Date.parse(c.last) + INTERVALS[c.step] * DAY <= Date.parse(today));
function main(args, today) {
  const cards = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : [];
  const [title, result] = args;
  if (!title) return due(cards, today).map(c => "due: " + c.title).join("\n") || "nothing due";
  const i = cards.findIndex(c => c.title === title);
  const card = i === -1 ? { title, step: 0, last: today } : cards[i];
  const next = review(card, result, today);
  if (i === -1) cards.push(next); else cards[i] = next;
  fs.writeFileSync(FILE, JSON.stringify(cards, null, 2));
  return title + " -> next review in " + (next.done ? "never (done)" : INTERVALS[next.step] + " day(s)");
}
if (fs.existsSync(FILE)) fs.unlinkSync(FILE);
console.log(main(["Coin Change", "fail"], "2026-09-29")); // Coin Change -> next review in 1 day(s)
console.log(main([], "2026-09-29")); // nothing due
console.log(main([], "2026-09-30")); // due: Coin Change
console.log(main(["Coin Change", "ok"], "2026-09-30")); // Coin Change -> next review in 3 day(s)
// real use: main(process.argv.slice(2), new Date().toISOString().slice(0, 10))`,
          flag: "script",
          deep: {
            why: "الذاكرة بتنسى بسرعة: مسألة حليتها بـ hint النهاردة، بعد أسبوعين هتقعد قدامها كأنها جديدة. المراجعة المتباعدة (نفس فكرة Anki) بتثبّت الأنماط بأقل وقت، لأنك بتراجع بس اللي قرّبت تنساه. والتايمر بيعوّدك على ضغط الانترفيو الحقيقي، والقائمة المتدرجة بتمنعك تقفز لـ hard قبل ما الأساس يثبت.",
            how: R`[[review]]: لو الحل نجح، روح للمسافة اللي بعدها. لو فشل، ارجع لأول مسافة (يوم). و [[done]] لما تعدّي آخر مسافة (٣٠ يوم).

[[dueToday]]: المسألة عليها الدور لو «آخر محاولة + المسافة الحالية» ≤ النهاردة. [[Date.parse("2026-09-01")]] بيرجّع الوقت بالملّي ثانية (UTC)، فالجمع والمقارنة أرقام عادية.

في المثال: Coin Change آخر محاولة 1 سبتمبر ومسافتها يوم، فعليها الدور من 2 سبتمبر (متأخرة). Course Schedule في المسافة 14 يوم من 20 سبتمبر، فدورها 4 أكتوبر. Merge k في المسافة 3 أيام من 27، فدورها 30.

بعد ما Coin Change تتحل صح النهاردة، بتروح للمسافة 3 أيام، فمش هتظهر بكرة. و Merge k بتظهر بكرة. ولو وقعت فيها، [[step]] بترجع 0.

الـ spread [[{ ...card, step }]] بيعمل object جديد بدل ما يعدّل القديم. نفس أسلوب الـ state في React.`,
            when: "ابدأ الخطة قبل الانترفيو بـ ٦-١٠ أسابيع لو بتبدأ من الصفر في الأنماط، و ٢-٣ أسابيع لو مراجعة. في آخر أسبوعين، وقّف المسائل الجديدة تقريبًا وركّز على المراجعة والـ mocks (زي درس «آخر أسبوعين» في «تاب الانترفيو»). ولو الشركة بتعمل take-home أو pair programming مش LeetCode، قلّل الـ hard وزوّد مشاريع صغيرة.",
            mistakes: R`عدّ المسائل كهدف («حليت ٣٠٠») بدل الأنماط. وقراءة الحل من غير ما تكتبه تاني من دماغك. وتجاهل الـ easy لأنها «سهلة» (الانترفيو فيه easy كتير، ولازم تخلصها في ١٠ دقايق من غير bugs). والمراجعة من غير تايمر. وإنك متسجلش إنك احتجت hint، فالمسألة تتعلّم «نجحت» وهي لأ. وفي الـ mock: متختارش النمط بنفسك، لأن نص صعوبة الانترفيو إنك تعرف النمط لوحدك.`
          },
          lines: [
            "يوم بالملّي ثانية.",
            "المسافات بالأيام: 1 ثم 3 ثم 7 ثم 14 ثم 30.",
            "حدّث مسألة بعد محاولة.",
            "نجحت: المسافة اللي بعدها. فشلت: ارجع لأول.",
            "نسخة جديدة، وخلصت لو عدّت آخر مسافة.",
            "قفلة.",
            "اللي عليه الدور النهاردة.",
            "النهاردة كرقم.",
            "رجّع.",
            "مش خلصانة، وآخر محاولة + المسافة ≤ النهاردة.",
            "أسماءهم بس.",
            "قفلة.",
            "المسائل اللي بتراجعها.",
            "متأخرة من أول الشهر.",
            "دورها 4 أكتوبر.",
            "دورها 30 سبتمبر.",
            "قفلة.",
            "النهاردة 29: Coin Change بس.",
            "حليتها صح النهاردة.",
            "بقت في المسافة 3 أيام.",
            "بكرة: Merge k بس.",
            "لو وقعت فيها: ترجع لأول مسافة."
          ]
        }
      ]
    }
  ]
});
