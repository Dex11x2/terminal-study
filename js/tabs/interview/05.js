// تكملة تاب interview: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/interview/01.js (شرح حقول الدرس في أوله)
MORE("interview", [
    {
      t: "Big-O و الـ data structures",
      l: 2,
      n: "مش مسائل: دي الأسئلة النظرية اللي بتيجي قبل المسألة أو بعدها. المسائل نفسها في تاب «DSA»",
      items: [
        {
          cmd: "معدل النمو مع n",
          title: "يعني إيه Big-O؟ ورتّب الـ complexities المشهورة من الأسرع للأبطأ",
          desc: R`Big-O بيوصف الوقت أو الذاكرة بيكبروا إزاي لما حجم الداتا n يكبر، مش بالثواني. بنشيل الثوابت والحدود الصغيرة، وغالبًا بنتكلم عن أسوأ حالة. الترتيب: O(1) ثابت (قراية من hash map)، و O(log n) (binary search)، و O(n) (لوب واحد)، و O(n log n) (sort كويس)، و O(n²) (لوب جوه لوب)، و O(2ⁿ) (كل المجموعات الجزئية).

والمهم مش الحفظ: لما n = مليون، الـ O(n log n) حوالي ٢٠ مليون عملية، والـ O(n²) تريليون. ده الفرق بين أقل من ثانية وساعات.`,
          example: R`const ops = n => ({ n, log: Math.round(Math.log2(n)), nlogn: Math.round(n * Math.log2(n)), n2: n * n });
console.table([10, 1000, 1_000_000].map(ops));
// n = 1000000 → log: 20 | nlogn: 19931569 | n2: 1000000000000`,
          try: "شغّل السطرين في [[node]] وبص على العمود الأخير. بعدين قول بصوت عالي: لو كل عملية بتاخد نانو ثانية، الـ n² على مليون عنصر هياخد قد إيه؟",
          flag: "script",
          deep: {
            why: "هو اللغة اللي بتتكلم بيها عن الأداء في أي مسألة أو system design. من غيره مش هتعرف تقول ليه حل أحسن من حل.",
            how: R`Big-O حد أعلى لمعدل النمو: [[3n + 5]] و [[n/2]] الاتنين O(n)، لأن لما n تكبر جدًا الثوابت مبتفرقش في «الشكل». عشان كده بنشيل الثوابت ([[O(2n)]] بتتكتب O(n)) والحدود الأصغر ([[O(n² + n)]] بتتكتب O(n²)).

فيه كمان Ω (حد أدنى) و Θ (بالظبط)، بس في الانترفيو «Big-O» غالبًا بيقصد بيها الحالة الأسوأ أو المتوقعة. وقول الحالة بصراحة: hash map بتاخد O(1) في المتوسط، و quick sort بياخد O(n log n) في المتوسط و O(n²) في الأسوأ.

وفيه amortized: [[push]] في array أغلب الوقت O(1)، ومرة كل فين وفين بينسخ كل العناصر لمكان أكبر O(n). على المدى الطويل المتوسط O(1) لكل عملية. والـ log بيظهر كل ما المسألة بتتقسم نصين كل خطوة.`,
            when: "Follow-ups: «الحل ده complexity بتاعه إيه؟». «ممكن أحسن؟». «والـ space؟». «amortized يعني إيه؟». «الـ O(1) دايمًا أسرع من O(n)؟» (لأ، لـ n صغيرة الثوابت ممكن تفرق).",
            mistakes: R`تقول O(2n) أو O(n + 5) من غير تبسيط. وتقول «O(n) يعني بياخد n ثانية». وتنسى الـ space complexity. وتفتكر O(log n) و O(n) قريبين: لمليون عنصر ٢٠ ضد مليون.`
          },
          teach: R`## الفكرة في جملة

السطرين بيحسبوا **عدد العمليات** (مش الوقت) لكل complexity على ٣ أحجام، ويطبعوهم جدول. الجدول ده هو الإجابة: بيوريك ليه بنهتم بـ «الشكل» مش بالثواني. شغلناه في Node 24 على ويندوز.

---

## ١. الدالة [[ops]]

~~~js
const ops = n => ({ n, log: Math.round(Math.log2(n)), nlogn: Math.round(n * Math.log2(n)), n2: n * n });
~~~

- [[n => ({ ... })]]: arrow function بترجّع object. الأقواس [[( )]] حوالين [[{ }]] لازمة، وإلا JavaScript هيفتكر [[{]] بداية جسم الدالة.
- [[{ n, ... }]]: اختصار [[n: n]].
- [[Math.log2(n)]]: «أقسم n على 2 كام مرة لحد ما أوصل 1؟». لـ مليون = 19.93.
- [[Math.round]]: قرّب لأقرب رقم صحيح عشان الجدول يبقى مقروء.
- [[n * n]]: الـ n².

---

## ٢. الجدول

~~~js
console.table([10, 1000, 1_000_000].map(ops));
~~~

- [[1_000_000]]: نفس مليون، والـ [[_]] فاصل للقراية بس.
- [[.map(ops)]]: نادي [[ops]] على كل رقم، فبيطلع array من ٣ objects.
- [[console.table]]: اطبع array of objects كجدول، كل object صف وكل مفتاح عمود.

~~~text الناتج
┌─────────┬─────────┬─────┬──────────┬───────────────┐
│ (index) │ n       │ log │ nlogn    │ n2            │
├─────────┼─────────┼─────┼──────────┼───────────────┤
│ 0       │ 10      │ 3   │ 33       │ 100           │
│ 1       │ 1000    │ 10  │ 9966     │ 1000000       │
│ 2       │ 1000000 │ 20  │ 19931569 │ 1000000000000 │
└─────────┴─────────┴─────┴──────────┴───────────────┘
~~~

---

## ٣. اقرا الجدول بالعرض

لما n كبرت **١٠٠٠ مرة** (من ألف لمليون):

| العمود | من | لـ | اتضرب في |
|---|---|---|---|
| [[log]] | 10 | 20 | زاد **10 بس** (مش اتضرب) |
| [[n]] | ألف | مليون | ١٠٠٠ |
| [[nlogn]] | 9,966 | 19,931,569 | حوالي ٢٠٠٠ |
| [[n2]] | مليون | تريليون | **مليون** |

ده معنى «معدل النمو». الـ log تقريبًا مبيتحركش، والـ n² بينفجر.

---

## ٤. نحوّلها وقت

لو كل عملية نانو ثانية (10⁻⁹ ثانية)، ودي تقريبًا سرعة عملية بسيطة:

| الـ complexity | العمليات لمليون | الوقت |
|---|---|---|
| O(log n) | 20 | ولا حاجة |
| O(n) | مليون | ١ ميلي ثانية |
| O(n log n) | ٢٠ مليون | ٢٠ ميلي ثانية |
| O(n²) | 10¹² | 10³ ثانية ≈ **١٧ دقيقة** |

---

## ٥. الترتيب من الأسرع للأبطأ

| الـ complexity | الاسم | مثال |
|---|---|---|
| O(1) | ثابت | [[map.get(key)]]، وقراية عنصر بالـ index |
| O(log n) | لوغاريتمي | binary search، index في الداتابيز |
| O(n) | خطي | لوب واحد، [[includes]] |
| O(n log n) | | [[sort]] كويس |
| O(n²) | تربيعي | لوب جوه لوب على نفس الداتا |
| O(2ⁿ) | أُسّي | كل المجموعات الجزئية، fib من غير memo |

---

## الخلاصة

- Big-O = الشغل بيكبر **إزاي** مع n، مش بياخد كام ثانية.
- بنشيل الثوابت والحدود الصغيرة: [[3n + 5]] تبقى O(n)، و [[n² + n]] تبقى O(n²).
- الحساب اللي تقوله: عدد العمليات × نانو ثانية. 10¹² × 10⁻⁹ = 10³ ثانية.

> لما n صغيرة (١٠ مثلًا) الفرق مش باين: 33 ضد 100. الفرق بيبان لما الداتا تكبر، وده بالظبط اللي بيحصل في الإنتاج.`,
          lines: [
            "دالة بتحسب عدد العمليات لكل complexity على حجم n.",
            "اطبعهم في جدول لتلات أحجام: ١٠، وألف، ومليون."
          ],
          sol: R`الجدول هيطلع 3 أعمدة للـ n: عند مليون [[log]] = 20، و [[nlogn]] = 19,931,569، و [[n2]] = 1,000,000,000,000. الإجابة بصوت عالي: مليون × مليون = 10^12 عملية، وكل عملية نانو ثانية (10^-9)، يعني 10^3 ثانية = 1000 ثانية ≈ ١٧ دقيقة. والـ n log n على نفس المليون ≈ ٢٠ مليون نانو ثانية = ٢٠ ميلي ثانية.

ده الجواب اللي يفرق في الانترفيو: الفرق بين O(n²) و O(n log n) على مليون عنصر هو الفرق بين «اليوزر استنى ربع ساعة» و «محسش بحاجة». ولو قلت رقم زي «ثانية» أو «دقيقة»، راجع الحساب: 10^12 × 10^-9 = 10^3.`
        },
        {
          cmd: "عد اللوبات المخفية",
          title: "إزاي تحسب complexity الكود بتاعك؟ وليه كود فيه لوب واحد بس ممكن يطلع O(n²)؟",
          desc: R`بمشي على الكود: لوب على n يبقى O(n)، واللوبات اللي ورا بعض بتتجمع (O(n) + O(n) = O(n))، واللوب جوه لوب بيتضرب. وبدوّر على اللوبات المخفية: [[includes]] و [[indexOf]] و [[find]] و [[some]] و [[filter]] جوه لوب كل واحدة O(n)، و [[shift]] بتحرّك كل العناصر، والـ spread جوه reduce بينسخ الـ object كل لفة. وبحسب الذاكرة كمان: array جديدة بحجم n تبقى O(n) space، و recursion بعمق n تبقى O(n) على الـ stack.

وفي الـ backend أغلى لوب مخفي هو query جوه لوب (N+1): ١٠٠ order يعني ١٠١ query. والحل واحدة بـ [[IN]] أو [[include]] أو JOIN.`,
          example: R`const users = Array.from({ length: 20000 }, (_, i) => ({ id: i }));
const ids = users.map(u => u.id).reverse();
console.time("some");
const a = ids.filter(id => users.some(u => u.id === id));
console.timeEnd("some");
console.time("Set");
const known = new Set(users.map(u => u.id));
const b = ids.filter(id => known.has(id));
console.timeEnd("Set");
// some: ~970ms | Set: ~2ms`,
          try: "شغّله، وبعدين خلي الطول ٤٠ ألف بدل ٢٠: الـ some هيزيد أكتر بكتير من الضعف (نظريًا ٤ أضعاف لأنه n²، وعمليًا في تشغيل جديد غالبًا ٢.٥ لـ ٣ بسبب تسخين الـ JIT)، والـ Set حوالي الضعف بس (n). ده أوضح إثبات للفرق.",
          flag: "script",
          deep: {
            why: "الإنترفيوير هيسألك «complexity الحل ده إيه؟» بعد كل مسألة. والأهم إن ده اللي بيخليك تلاقي البطء في مشروعك الحقيقي قبل ما اليوزرز يلاقوه.",
            how: R`القواعد: الخطوات المتتالية بتتجمع وتاخد الأكبر. المتداخلة بتتضرب. ومدخلين مختلفين ليهم متغيرين: لوب على users جواه لوب على orders يبقى O(u × o) مش O(n²).

الـ methods ليها تمن: [[push]] و [[pop]] و [[Map.get]] و [[Set.has]] O(1). [[includes]] و [[indexOf]] و [[find]] و [[filter]] و [[map]] و [[slice]] و [[spread]] و [[shift]] و [[unshift]] O(n). و [[sort]] O(n log n). و [[str += x]] في لوب ممكن يبقى مكلّف، والأحسن [[join]].

والـ space: كل array أو object جديد بحجم الداتا بيتحسب، وكل مستوى recursion بيحجز frame على الـ stack. والمقايضة الأشهر: تصرف ذاكرة O(n) في Set أو Map عشان تنزل من O(n²) لـ O(n)، زي المثال.`,
            when: "Follow-ups: «ممكن تعملها أسرع؟». «ولو الذاكرة محدودة؟». «الـ sort اللي في النص complexity بتاعه إيه؟». «فين الـ bottleneck في الـ endpoint ده؟».",
            mistakes: R`تقول O(n) عشان فيه لوب واحد وناسي [[includes]] جواه. وتنسى تحسب الـ sort. وتقول لوبين ورا بعض O(n²). وتنسى الـ space، أو تنسى إن الـ recursion بتاخد space على الـ stack.`
          },
          teach: R`## الفكرة في جملة

الكود بيحل نفس المسألة مرتين: «لكل id، هل موجود في اليوزرز؟». المرة الأولى بـ [[some]] جوه [[filter]] (شكلها لوب واحد، وهي لوب جوه لوب)، والتانية بـ [[Set]]. وبيقيس الوقت. شغلناه بـ Node 24 على ويندوز، وضفنا عدّاد مقارنات عشان نشوف الـ n² كرقم مش كإحساس.

---

## ١. الداتا

~~~js
const users = Array.from({ length: 20000 }, (_, i) => ({ id: i }));
const ids = users.map(u => u.id).reverse();
~~~

- [[Array.from({ length: 20000 }, fn)]]: اعمل array طولها ٢٠ ألف، وكل خانة قيمتها [[fn(_, i)]].
- [[(_, i)]]: الـ argument الأول (القيمة) مش محتاجينه فسميناه [[_]]، والتاني [[i]] رقم الخانة.
- [[({ id: i })]]: object، والأقواس عشان [[{]] متتفهمش جسم دالة.
- [[.map(u => u.id)]]: هات الـ ids بس: من 0 لـ 19999.
- [[.reverse()]]: اعكسها. كده أول id بندوّر عليه (19999) في **آخر** اليوزرز، فالبحث بيمشي مسافة.

---

## ٢. النسخة البطيئة

~~~js
console.time("some");
const a = ids.filter(id => users.some(u => u.id === id));
console.timeEnd("some");
~~~

- [[console.time(label)]] و [[console.timeEnd(label)]]: ساعة إيقاف باسم، و [[timeEnd]] بتطبع الوقت اللي فات.
- [[ids.filter(fn)]]: لوب على الـ ٢٠ ألف id.
- [[users.some(fn)]]: **لوب تاني** على اليوزرز، بيقف أول ما يلاقي [[true]].

اللوب المخفي هو [[some]]. عدّينا المقارنات [[u.id === id]] فعلًا:

~~~text الناتج
N 20000 comparisons 200,010,000
N 40000 comparisons 800,020,000
~~~

ليه الرقم ده؟ الـ ids معكوسة، فأول id بيلاقيه بعد ٢٠٠٠٠ مقارنة، والتاني بعد ١٩٩٩٩، ... لحد ١. المجموع 1 + 2 + ... + n = n(n+1)/2 = 20000 × 20001 / 2 = 200,010,000. ده [[O(n^2)]]. ولما n اتضاعفت، المقارنات اتضربت في **٤** بالظبط تقريبًا.

---

## ٣. النسخة السريعة

~~~js
console.time("Set");
const known = new Set(users.map(u => u.id));
const b = ids.filter(id => known.has(id));
console.timeEnd("Set");
~~~

- [[new Set(array)]]: ابني Set من الـ ids مرة واحدة: لفة واحدة O(n)، وذاكرة O(n).
- [[known.has(id)]]: hash lookup، O(1) في المتوسط، مش لوب.
- فالكل: O(n) للبناء + n × O(1) للبحث = **O(n)**.

---

## ٤. الوقت

شغلنا كل حجم في process جديد (مرتين لكل حجم):

~~~text الناتج
N = 20000   some: 2.022s   Set: 2.604ms
N = 20000   some: 1.702s   Set: 2.132ms
N = 40000   some: 4.033s   Set: 11.572ms
N = 40000   some: 3.065s   Set: 7.959ms
~~~

- الفرق بين الاتنين **مئات المرات** (ثانيتين ضد ٢ ميلي).
- الأرقام نفسها بتختلف حسب الجهاز ومين شغال جنبك (التعليق في المثال بيقول حوالي ١ ثانية على جهاز تاني). الثابت هو النسبة.
- الـ some اتضرب في حوالي ٢ لـ ٢ ونص مش ٤، رغم إن المقارنات اتضربت في ٤. ده لأن الـ JIT في V8 بيبدأ الكود بطيء وبيعمله optimize وهو شغال، فالتشغيل القصير بياخد نصيب أكبر من «التسخين». عشان كده **عدّ العمليات** أصدق من التوقيت لما تثبت complexity.

وتجربة جانبية: لما شغلنا الحجمين **في نفس الـ process** ورا بعض، الـ ٤٠ ألف طلع أسرع من الـ ٢٠ ألف (٥٢٣ms ضد ١.١ ثانية)، لأن الكود كان اتسخّن. القياس الصح يبقى كل حجم لوحده، أو بعد تسخين.

---

## ٥. اللوبات المخفية في JavaScript

| الـ method | التمن |
|---|---|
| [[push]] و [[pop]] و [[Map.get]] و [[Set.has]] | O(1) |
| [[includes]] و [[indexOf]] و [[find]] و [[some]] و [[filter]] و [[map]] | O(n) |
| [[shift]] و [[unshift]] | O(n): بيحرّكوا كل العناصر |
| [[slice]] والـ spread [[...arr]] | O(n): نسخة |
| [[sort]] | O(n log n) |

وفي الـ backend: query جوه لوب (N+1) هو نفس الفكرة بس كل «مقارنة» رحلة للداتابيز.

---

## الخلاصة

- ورا بعض تتجمع، جوه بعض تتضرب، ومتغيرين مختلفين يبقوا O(u × o).
- أي method بتلف على array جوه لوب = لوب جوه لوب.
- الحل الأشهر: ابني Set أو Map **برا** اللوب، وادفع O(n) ذاكرة عشان تنزل من O(n²) لـ O(n).`,
          lines: [
            "٢٠ ألف يوزر.",
            "الـ ids بترتيب معكوس (عشان البحث يمشي مسافة).",
            "ابدأ عدّاد الوقت.",
            "لكل id، دوّر عليه بـ some في كل اليوزرز: لوب جوه لوب، O(n²).",
            "اطبع الوقت.",
            "عدّاد تاني.",
            "ابني Set مرة واحدة: O(n) وقت و O(n) ذاكرة.",
            "لكل id، [[has]] بـ O(1): الكل O(n).",
            "اطبع الوقت: فرق مئات المرات."
          ],
          sol: R`الـ Set هيقرب من الضعف فعلًا (مثلًا ٤ms لـ ٨ms) لأنه O(n). أما الـ some فنظريًا ٤ أضعاف، بس لما جربت (Node 22) من ٢٠ لـ ٤٠ ألف طلع ما بين ٢.٥ و ٣ أضعاف بس (مثلًا ٦٥٠ms لـ ١٨٠٠ms)، ومن ٤٠ لـ ٨٠ ألف طلع حوالي ٤ (١.٤ ثانية لـ ٥.٢). السبب إن أول جزء من كل تشغيل بيبقى بطيء على ما الـ JIT يعمل optimize للكود، فالرقم الصغير متضخم شوية. لو شغلت الاتنين في نفس الـ process بعد تسخين هتشوف الـ ٤ أضعاف بوضوح.

المهم الاتجاه: التاني بيتضاعف مرتين كل ما الـ n يتضاعف، والأول مرة. وجملة الانترفيو: «[[some]] و [[includes]] و [[find]] و [[indexOf]] كل واحدة لوب، فلو جوه [[filter]] أو [[map]] يبقى عندي n². الحل إني أبني Set أو Map مرة واحدة برا اللوب، وأدفع O(n) ذاكرة».`
        },
        {
          cmd: "العملية الأكتر تكرار",
          title: "array ولا linked list ولا hash map ولا set ولا tree: بتختار بينهم إزاي؟",
          desc: R`بختار حسب العملية اللي هتتكرر أكتر. الـ array: وصول بالـ index في O(1) وبتحافظ على الترتيب، بس البحث O(n) والإضافة في الأول O(n). الـ linked list: إضافة ومسح O(1) لو معاك العقدة نفسها، بس الوصول لعنصر O(n). الـ hash map ([[Map]]): بحث وإضافة بالمفتاح O(1) في المتوسط. الـ set: نفس الفكرة للقيم المميزة، لـ «موجود ولا لأ» وشيل التكرار. والـ tree المتوازن: كل حاجة O(log n) ومترتبة، فبيسمح بـ «هات من كذا لكذا»، وده اللي الداتابيز بتعمل بيه الـ index (B-tree).

وفيه كمان stack (آخر واحد يدخل أول واحد يخرج: undo والـ call stack)، و queue (الأول يدخل الأول يخرج: الـ jobs)، و heap (أصغر أو أكبر عنصر بسرعة: priority queue). المسائل عليهم في تاب «DSA».`,
          example: R`const tags = ["js", "css", "js", "react", "css"];
console.log([...new Set(tags)]);
const count = new Map();
for (const t of tags) count.set(t, (count.get(t) ?? 0) + 1);
console.log(count);
const stack = []; stack.push(1); stack.push(2); console.log(stack.pop());
const queue = [1, 2, 3]; console.log(queue.shift());
// [ 'js', 'css', 'react' ]  Map(3) { 'js' => 2, 'css' => 2, 'react' => 1 }  2  1`,
          try: "اكتب دالة بتلاقي أول حرف مش متكرر في string مرة بـ [[indexOf]] و [[lastIndexOf]] ومرة بـ Map للعد. احسب الـ complexity للاتنين.",
          flag: "script",
          deep: {
            why: "الاختيار الصح للـ data structure هو نص حل أي مسألة، ونص تصميم أي feature: cache، أو طابور jobs، أو autocomplete، أو leaderboard.",
            how: R`الـ array متخزنة ورا بعض في الذاكرة، فالوصول بالـ index حساب بسيط، والمعالج بيحبها (cache friendly). الإضافة في النص محتاجة تزق كل اللي بعدها.

الـ hash map بتحوّل المفتاح لرقم بـ hash function، والرقم ده بيحدد الخانة. لو مفتاحين وقعوا في نفس الخانة (collision) بتتخزن مع بعض، فأسوأ حالة نظريًا O(n). ولما تتملى بتكبر وتعيد التوزيع (amortized O(1)). وفي JS الأحسن [[Map]] من الـ object كـ dictionary: أي نوع مفتاح، و [[size]] جاهز، ومفيش مفاتيح موروثة زي [[__proto__]].

الـ binary search tree من غير توازن ممكن يبقى linked list لو دخلت الداتا مترتبة، عشان كده فيه أشجار بتوازن نفسها. والداتابيز بتستخدم B-tree: شجرة عريضة كل عقدة فيها مفاتيح كتير، فعدد قرايات الـ disk قليل جدًا، ومترتبة فتنفع لـ [[ORDER BY]] و [[BETWEEN]]. وفيه trie للـ autocomplete، و graph للعلاقات والطرق.`,
            when: "Follow-ups: «Map ولا object؟». «ليه الـ index في الداتابيز tree مش hash؟». «الـ hash map بتتعامل مع الـ collisions إزاي؟». «تعمل LRU cache بإيه؟» (Map بيحافظ على ترتيب الإضافة، أو hash map + doubly linked list).",
            mistakes: R`تقول linked list «أسرع في الإضافة» من غير «لو معاك مكان العقدة». و [[includes]] جوه لوب بدل Set. و object كـ map بمفاتيح جاية من اليوزر. و queue بـ [[shift]] على مليون عنصر: كل shift بتحرّك الباقي.`
          },
          teach: R`## الفكرة في جملة

المثال بيستخدم ٤ data structures في ٦ سطور: Set لشيل التكرار، و Map للعد، و array كـ stack، و array كـ queue. كل واحد اختيار مبني على **العملية اللي هتتكرر**. شغلناه بـ Node 24 على ويندوز، ومعاه الـ solCode.

---

## ١. Set: شيل التكرار

~~~js
const tags = ["js", "css", "js", "react", "css"];
console.log([...new Set(tags)]);
~~~

من جوه لبرا:

1. [[new Set(tags)]]: Set بتخزن كل قيمة **مرة واحدة**. التكرار بيتجاهل.
2. [[[...set]]]: الـ spread بيفرد الـ Set جوه array جديدة، عشان نطبعها ونستخدم methods الـ array.

~~~text الناتج
[ 'js', 'css', 'react' ]
~~~

الترتيب هو ترتيب **أول ظهور**: الـ Set في JavaScript بتحافظ على ترتيب الإضافة. وكل إضافة O(1) في المتوسط، فالكل O(n).

---

## ٢. Map: العد

~~~js
const count = new Map();
for (const t of tags) count.set(t, (count.get(t) ?? 0) + 1);
console.log(count);
~~~

- [[for (const t of tags)]]: لف على القيم.
- [[count.get(t)]]: العدد الحالي، أو [[undefined]] لو أول مرة.
- [[?? 0]]: الـ nullish coalescing: لو اللي على الشمال [[null]] أو [[undefined]] خد 0. جربنا: [[undefined ?? 0]] ← 0، و [[0 ?? 5]] ← 0. بخلاف [[||]]: [[0 || 5]] ← 5، لأن [[||]] بيعتبر 0 «فاضي».
- [[+ 1]] ثم [[count.set]]: خزّن العدد الجديد.

~~~text الناتج
Map(3) { 'js' => 2, 'css' => 2, 'react' => 1 }
~~~

ليه Map مش object؟ جربنا: [["toString" in {}]] طلعت [[true]] (object فاضي ورث مفاتيح من الـ prototype)، و [[new Map().has("toString")]] طلعت [[false]]. لو المفاتيح جاية من اليوزر، الـ object ممكن يلخبطك.

---

## ٣. stack و queue

~~~js
const stack = []; stack.push(1); stack.push(2); console.log(stack.pop());
const queue = [1, 2, 3]; console.log(queue.shift());
~~~

~~~text الناتج
2
1
~~~

- stack = LIFO (Last In First Out): [[push]] في الآخر و [[pop]] من الآخر، الاتنين O(1). زي الـ undo والـ call stack.
- queue = FIFO (First In First Out): [[shift]] بيشيل **الأول**. بس على array ده O(n) لأن كل العناصر بتتزق خانة لقدام.

قسنا الفرق: فضّينا ١٠٠ ألف عنصر بـ [[shift]] مقابل إننا نمشي بـ index على أول الطابور ([[head++]]):

~~~text الناتج
shift 1e5: 721.052ms
index head 1e5: 0.843ms
~~~

حوالي ٨٠٠ مرة. الـ queue الحقيقية بتتعمل بـ index للأول، أو linked list، أو مكتبة.

---

## ٤. الـ solCode: أول حرف مش متكرر

~~~js
function firstUniqueScan(s) {          // O(n²) time, O(1) space
  for (const ch of s) {
    if (s.indexOf(ch) === s.lastIndexOf(ch)) return ch;
  }
  return null;
}
~~~

[[indexOf]] أول مكان للحرف، و [[lastIndexOf]] آخر مكان. لو هما نفس المكان، الحرف موجود مرة واحدة. بس الاتنين **لوبات** على الـ string كلها، وجوه لوب على الـ string: O(n²).

~~~js
function firstUniqueMap(s) {           // O(n) time, O(k) space
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1);
  for (const ch of s) if (count.get(ch) === 1) return ch;
  return null;
}
~~~

لفتين **ورا بعض**: الأولى تعد، والتانية تدوّر على أول واحد عدده 1. O(n) + O(n) = O(n). والذاكرة O(k)، k عدد الحروف المختلفة.

~~~text الناتج
"swiss" w w
"aabb" null null
"" null null
"leetcode" l l
~~~

نفس النتايج، و [[JSON.stringify(s)]] بس عشان الـ string الفاضي يبان [[""]].

---

## الخلاصة

| الـ structure | الأسرع في | الأبطأ في | استخدامه |
|---|---|---|---|
| array | الوصول بالـ index، والإضافة في الآخر | البحث، والإضافة أو الشيل من الأول | لستة مترتبة |
| linked list | إضافة/شيل لو معاك العقدة | الوصول لعنصر | queue، LRU |
| Map | get/set بالمفتاح O(1) | الترتيب بالقيمة | عد، cache، index |
| Set | موجود ولا لأ O(1) | — | شيل تكرار، visited |
| tree متوازن | كل حاجة O(log n) ومترتب | — | index الداتابيز (B-tree)، range |
| heap | أصغر/أكبر عنصر | البحث | priority queue |

> اسأل «إيه العملية اللي هتتعمل مليون مرة؟» واختار الـ structure اللي بيعملها أسرع.`,
          lines: [
            "array فيها تكرار.",
            "Set بتشيل التكرار وتحافظ على ترتيب أول ظهور.",
            "Map للعد: كلمة ← عدد.",
            "لكل كلمة زوّد العداد، و [[?? 0]] لو أول مرة.",
            "اطبع العدادات.",
            "stack: آخر حاجة دخلت (2) هي أول حاجة تطلع.",
            "queue: أول حاجة دخلت (1) تطلع الأول. بس [[shift]] على array O(n)، والـ queue الحقيقية بتتعمل بطريقة تانية."
          ],
          sol: R`الحلين بيرجعوا نفس النتيجة: [[swiss]] ← [[w]]، و [[aabb]] ← [[null]]، و [[leetcode]] ← [[l]]، والـ string الفاضي ← [[null]]. الفرق في الـ complexity: نسخة [[indexOf]] و [[lastIndexOf]] O(n²) وقت و O(1) ذاكرة، لأن كل واحدة فيهم بتلف على الـ string كلها ولكل حرف. ونسخة الـ Map O(n) وقت (لفتين منفصلتين، مش لوب جوه لوب) و O(k) ذاكرة حيث k عدد الحروف المختلفة.

الغلط الشائع: إنك تقول الـ indexOf نسخة O(n) لأن «فيه لوب واحد». الـ indexOf نفسه لوب مخفي. وحاجة زيادة تقولها: لو الحروف إنجليزي صغير بس، الـ k ثابت (26) فالذاكرة عمليًا O(1).`,
          solCode: R`// first-unique.mjs
function firstUniqueScan(s) {          // O(n²) time, O(1) space
  for (const ch of s) {
    if (s.indexOf(ch) === s.lastIndexOf(ch)) return ch;
  }
  return null;
}
function firstUniqueMap(s) {           // O(n) time, O(k) space
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1);
  for (const ch of s) if (count.get(ch) === 1) return ch;
  return null;
}
for (const s of ["swiss", "aabb", "", "leetcode"]) {
  console.log(JSON.stringify(s), firstUniqueScan(s), firstUniqueMap(s));
}
// "swiss" w w
// "aabb" null null
// "" null null
// "leetcode" l l`
        },
        {
          cmd: "base case + مشكلة أصغر",
          title: "يعني إيه دالة بتنادي نفسها؟ وإمتى تستخدمها وإمتى تخاف منها؟",
          desc: R`الـ recursion يعني الدالة تحل المشكلة بإنها تنادي نفسها على نسخة أصغر. لازم حاجتين: base case يوقف، وكل نداء يقرّب منه. مناسبة جدًا للحاجات اللي شكلها شجرة: فولدرات جوه فولدرات، وكومنتات فيها ردود، و JSON متداخل، و DOM. وكل نداء بياخد frame على الـ call stack، فعمق كبير بيوقع بـ [[RangeError: Maximum call stack size exceeded]].

والبديل لوب مع stack بتعمله انت. والـ recursion اللي بتحل نفس المسألة الفرعية كذا مرة (زي fibonacci) محتاجة memoization، وإلا تبقى O(2ⁿ).`,
          example: R`const tree = { name: "src", children: [{ name: "app.js" }, { name: "lib", children: [{ name: "db.js" }] }] };
function countFiles(node) {
  if (!node.children) return 1;
  return node.children.reduce((sum, child) => sum + countFiles(child), 0);
}
console.log(countFiles(tree));
const fib = (n, memo = new Map()) => n < 2 ? n : memo.get(n) ?? memo.set(n, fib(n - 1, memo) + fib(n - 2, memo)).get(n);
console.log(fib(70));
// 2  190392490709135`,
          try: "اكتب countFiles تاني من غير recursion: استخدم array كـ stack و [[while]]. بعدين جرّب fib من غير memo على 40 وشوف الوقت.",
          flag: "script",
          deep: {
            why: "أي داتا متداخلة (تعليقات، وقوايم، وفولدرات، وصلاحيات بتورث) حلها الطبيعي recursion. والإنترفيوير عايز يتأكد إنك عارف حدودها مش بس بتكتبها.",
            how: R`كل نداء بيتحط على الـ call stack كـ frame فيه الـ arguments والمتغيرات المحلية ومكان الرجوع. لما الدالة ترجع، الـ frame بيتشال. الـ stack حجمه محدود (في V8 حوالي ١٠ لـ ١٥ ألف مستوى بالإعدادات الافتراضية، وأقل كل ما الـ frame يكبر)، فشجرة عمقها ١٠ مستويات مفيش مشكلة، بس لستة متوصلة مليون عنصر هتوقع.

الـ tail call optimization (النداء الأخير ميحجزش frame جديد) مكتوبة في مواصفة JS بس Safari بس اللي طبّقها، فمتعتمدش عليها في Node أو Chrome.

الـ complexity = عدد النداءات × الشغل في كل نداء. fibonacci العادية كل نداء بيعمل نداءين فبتبقى حوالي O(2ⁿ)، ومع memo كل n بيتحسب مرة واحدة فبتبقى O(n). وده أول باب للـ dynamic programming في تاب «DSA».`,
            when: "Follow-ups: «حوّلها لـ iterative». «الـ complexity بتاعتها إيه؟». «فيه tail call optimization في JS؟». «memoization يعني إيه؟». «هتعمل deep clone لـ object إزاي؟» ([[structuredClone]]).",
            mistakes: R`تنسى الـ base case أو تكتب واحد مبيتوصلش له (n - 1 وهي بدأت سالبة). و recursion على داتا اليوزر يتحكم في عمقها. وتفتكر إن JS بيعمل TCO. وتقول recursion «أبطأ دايمًا»: الفرق غالبًا صغير، والمشكلة في العمق والتكرار.`
          },
          teach: R`## الفكرة في جملة

المثال فيه دالتين recursive: [[countFiles]] بتعد الملفات في شجرة فولدرات، و [[fib]] بتحسب fibonacci مع memo. الأولى بتوريك **الشكل** الصح (base case + مشكلة أصغر)، والتانية بتوريك **الخطر** (نفس الحساب يتكرر) وحله. شغلنا كل حاجة بـ Node 24 على ويندوز.

---

## ١. الشجرة

~~~js
const tree = { name: "src", children: [{ name: "app.js" }, { name: "lib", children: [{ name: "db.js" }] }] };
~~~

فولدر [[src]] فيه ملف [[app.js]] وفولدر [[lib]] فيه [[db.js]]. الفولدر عنده [[children]]، والملف معندوش. يعني فيه **ملفين**.

---

## ٢. [[countFiles]]

~~~js
function countFiles(node) {
  if (!node.children) return 1;
  return node.children.reduce((sum, child) => sum + countFiles(child), 0);
}
~~~

- [[if (!node.children) return 1;]]: الـ **base case**. عقدة من غير ولاد = ملف = 1. هنا الـ recursion بتقف.
- [[node.children.reduce(fn, 0)]]: لف على الولاد وجمّع نتيجة واحدة. [[sum]] المجموع لحد دلوقتي (بيبدأ من [[0]])، و [[child]] الابن الحالي.
- [[sum + countFiles(child)]]: الدالة **بتنادي نفسها** على الابن. والابن مشكلة **أصغر** (شجرة أقل). كده كل نداء بيقرّب من الـ base case.

ضفنا [[console.log]] بمسافات على قد العمق عشان نشوف النداءات:

~~~text الناتج
countFiles(src)
  countFiles(app.js)
  countFiles(lib)
    countFiles(db.js)
2
~~~

| النداء | بيرجّع | ليه |
|---|---|---|
| [[countFiles(app.js)]] | 1 | base case |
| [[countFiles(db.js)]] | 1 | base case |
| [[countFiles(lib)]] | 0 + 1 = 1 | ابن واحد |
| [[countFiles(src)]] | 0 + 1 + 1 = 2 | |

النداءات بتنزل لتحت لحد الأوراق، والنتايج بتطلع لفوق وتتجمع.

---

## ٣. [[fib]] مع memo

~~~js
const fib = (n, memo = new Map()) => n < 2 ? n : memo.get(n) ?? memo.set(n, fib(n - 1, memo) + fib(n - 2, memo)).get(n);
~~~

سطر واحد طويل، نفكّه:

1. [[memo = new Map()]]: default parameter. أول نداء بيعمل Map جديدة، وكل النداءات الداخلية بتبعتها هي نفسها.
2. [[n < 2 ? n : ...]]: الـ base case: fib(0) = 0 و fib(1) = 1.
3. [[memo.get(n) ?? ...]]: لو حسبناها قبل كده رجّعها على طول. [[??]] بيكمّل للجزء اللي بعده بس لو النتيجة [[undefined]].
4. [[fib(n - 1, memo) + fib(n - 2, memo)]]: التعريف نفسه: كل رقم = مجموع اللي قبله.
5. [[memo.set(n, value)]]: خزّنها. و [[set]] بترجّع الـ Map نفسها (جربنا: [[m.set("a", 1) === m]] طلعت [[true]])، فـ [[.get(n)]] بعدها بتطلّع القيمة اللي اتخزنت حالًا.

~~~text الناتج
190392490709135
fib(70) memo: 0.135ms
~~~

---

## ٤. ليه الـ memo فرق كده؟ عدّينا النداءات

نسخة من غير memo ([[slowFib]] في الـ solCode) بتنادي نفسها مرتين في كل نداء، فنفس الأرقام بتتحسب ملايين المرات:

~~~text الناتج
slowFib 20 calls 21891
slowFib 25 calls 242785
slowFib 30 calls 2692537
memo fib 30 calls 59
~~~

كل ما n تزيد 5، النداءات بتتضرب في حوالي ١١. ده نمو أُسّي، O(2ⁿ) تقريبًا. ومع الـ memo: 59 نداء بس لـ fib(30)، لأن كل n بيتحسب مرة واحدة: O(n).

والوقت لـ fib(40) من غير memo:

~~~text الناتج
102334155
fib(40) no memo: 1.195s
~~~

---

## ٥. حدود الـ call stack

كل نداء بيحجز frame على الـ call stack. عملنا دالة بتنادي نفسها من غير base case:

~~~text الناتج
RangeError: Maximum call stack size exceeded depth 12478
~~~

يعني الـ stack في Node وقع بعد حوالي ١٢ ألف مستوى (الرقم بيتغير حسب حجم الـ frame). شجرة فولدرات عمقها ١٠ مفيش مشكلة. لستة متوصلة مليون عنصر هتوقع.

---

## ٦. البديل: لوب + stack بإيدك (الـ solCode)

~~~js
function countFilesIter(root) {
  const stack = [root];
  let files = 0;
  while (stack.length) {
    const node = stack.pop();
    if (!node.children) files++;
    else stack.push(...node.children);
  }
  return files;
}
~~~

- [[stack = [root]]]: array انت ماسكها بدل الـ call stack.
- [[while (stack.length)]]: طول ما فيه حاجة. (0 بيتحسب false.)
- [[stack.pop()]]: خد آخر واحد.
- [[stack.push(...node.children)]]: الـ spread بيحط الولاد كل واحد لوحده.

| الخطوة | pop | الـ stack بعدها | files |
|---|---|---|---|
| ١ | src | app.js، lib | 0 |
| ٢ | lib | app.js، db.js | 0 |
| ٣ | db.js | app.js | 1 |
| ٤ | app.js | فاضي | 2 |

نفس الناتج [[2]]، ومفيش حد للعمق غير الرام.

---

## الخلاصة

- الـ recursion = base case + نداء على مشكلة أصغر. ناقص أي واحد فيهم = loop مبيخلصش أو [[RangeError]].
- الـ complexity = عدد النداءات × الشغل في كل نداء. fib العادية O(2ⁿ)، ومع memo O(n).
- الداتا الشجرية (فولدرات، كومنتات، JSON) مكانها الطبيعي الـ recursion. ولو العمق ممكن يبقى كبير، لوب + stack.

> fib(70) = 190,392,490,709,135 لسه أصغر من [[Number.MAX_SAFE_INTEGER]] (9,007,199,254,740,991). من fib(79) الأرقام بتعدّي الحد، وساعتها محتاج [[BigInt]].`,
          lines: [
            "شجرة فولدرات: src فيها ملف وفولدر فيه ملف.",
            "دالة بتعد الملفات في أي عقدة.",
            "base case: عقدة من غير children يبقى ملف واحد.",
            "غير كده: اجمع نتيجة كل ابن، وكل ابن مشكلة أصغر.",
            "قفلة.",
            "النتيجة 2.",
            "fibonacci مع memo: كل n بيتحسب مرة واحدة ويتحفظ في Map، فبقت O(n).",
            "fib(70) في لحظة. من غير memo كانت هتاخد وقت طويل جدًا."
          ],
          sol: R`النسخة من غير recursion لازم تطبع [[2]] زي الأصلية. الفكرة: الـ call stack اللي كان اللغة شايلاه عنك بقى array انت ماسكه، والـ [[while]] بتسحب منه node وتحط ولادها. الـ recursion والـ stack نفس الشغل، والفرق إن الـ array مفيهاش حد زي الـ call stack، فمش هتاخد [[Maximum call stack size exceeded]] على شجرة عميقة جدًا.

وفي fib من غير memo على 40: هتستنى حوالي ثانية (عندي ١.٢ ثانية) والناتج [[102334155]]، في حين إن نسخة الـ memo بتحسب fib(70) في أقل من ميلي. السبب إن كل نداء بيعمل نداءين، فالـ complexity حوالي O(2^n)، وكل ما تزود 5 على n الوقت بيتضرب في حوالي ١١. جرّب 45 لو عايز تتأكد، ومتجربش 50.`,
          solCode: R`// count-iter.mjs
const tree = { name: "src", children: [{ name: "app.js" }, { name: "lib", children: [{ name: "db.js" }] }] };
function countFilesIter(root) {
  const stack = [root];
  let files = 0;
  while (stack.length) {
    const node = stack.pop();
    if (!node.children) files++;
    else stack.push(...node.children);
  }
  return files;
}
console.log(countFilesIter(tree));
const slowFib = n => n < 2 ? n : slowFib(n - 1) + slowFib(n - 2);
console.time("fib(40) no memo");
console.log(slowFib(40));
console.timeEnd("fib(40) no memo");
// 2
// 102334155
// fib(40) no memo: 1.172s  (بيختلف حسب الجهاز)`
        },
        {
          cmd: "n log n و log n",
          title: "الـ sort والبحث بياخدوا قد إيه؟ وليه binary search محتاج الداتا مترتبة؟",
          desc: R`البحث العادي في array بيمشي عنصر عنصر: O(n). الـ binary search بيبص في النص ويرمي نص الداتا كل خطوة: O(log n)، يعني مليون عنصر في حوالي ٢٠ خطوة، بس لازم الداتا تبقى مترتبة عشان يعرف يرمي أنهي نص. وأحسن sort عام بالمقارنة O(n log n) زي merge sort و quick sort (quick في المتوسط، و O(n²) في أسوأ حالة)، و [[sort]] في V8 بيستخدم TimSort وهو stable.

فلو هتدوّر مرة واحدة: دوّر خطي O(n). لو هتدوّر كتير: رتّب مرة ودوّر binary، أو ابني Set أو Map وخلاص. وفي الداتابيز ده بالظبط دور الـ index.`,
          example: R`function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
const nums = [10, 1, 5, 100, 25];
console.log(nums.sort());
console.log(nums.sort((a, b) => a - b), binarySearch(nums, 25));
// [ 1, 10, 100, 25, 5 ]  ← ترتيب نصوص!
// [ 1, 5, 10, 25, 100 ] 3`,
          try: "جرّب binarySearch على array مش مترتبة وشوف بيرجّع إيه. بعدين جرّب [[toSorted]] بدل [[sort]] واطبع الـ array الأصلية: متغيرتش.",
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الترتيب نفسه ليه تمن، وإمتى يستاهل تدفعه. ومعاه أشهر فخ في JavaScript: الـ sort الافتراضي.",
            how: R`أي sort بيعتمد على المقارنة مينفعش يبقى أسرع من O(n log n) في أسوأ حالة، لأن فيه n! ترتيب ممكن وكل مقارنة بتقسم الاحتمالات نصين. الـ counting sort بيكسر الحد ده لما القيم في مدى صغير (O(n + k)) لأنه مبيقارنش.

merge sort: قسّم نصين، ورتّب كل نص، وادمج. دايمًا O(n log n) و stable، بس محتاج ذاكرة إضافية O(n). quick sort: اختار pivot، وحط الأصغر شمال والأكبر يمين، وكرر. in-place وسريع عمليًا، بس pivot وحش يوصّله O(n²). و TimSort هجين من merge و insertion sort، وبيستغل الأجزاء المترتبة أصلًا فيبقى قريب من O(n) على داتا شبه مترتبة.

والمواصفة من ES2019 بتلزم إن [[sort]] يبقى stable: العناصر المتساوية تفضل بترتيبها. ومن غير compare function بيحوّل كل حاجة لـ string ويرتب أبجدي. و [[sort]] بيعدّل الـ array نفسها، و [[toSorted]] (ES2023) بترجّع نسخة.`,
            when: "Follow-ups: «stable sort يعني إيه ومهم إمتى؟» (رتّب بالتاريخ وبعدين بالحالة). «quick sort أسوأ حالة إمتى؟». «ترتب ملف 100GB إزاي؟» (external merge sort). «binary search على الإجابة نفسها؟».",
            mistakes: R`[[sort()]] من غير compare على أرقام. وتنسى إن [[sort]] بيعدّل الأصل (مشكلة في React state). و binary search على داتا مش مترتبة. و off-by-one في [[lo <= hi]] و [[mid + 1]] فيدخل loop مبيخلصش.`
          },
          teach: R`## الفكرة في جملة

المثال فيه binary search مكتوب بإيدك، وبعدين فخ الـ [[sort]] في JavaScript: من غير compare function بيرتب الأرقام كنصوص. وبعد الترتيب الصح، الـ binary search بيلاقي 25. شغلناه بـ Node 24 على ويندوز، وطبعنا كل خطوة جوه الـ while.

---

## ١. حدود منطقة البحث

~~~js
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
~~~

[[lo]] و [[hi]] أول وآخر index في المنطقة اللي **ممكن** يكون فيها الهدف. في الأول الـ array كلها: من 0 لـ [[length - 1]].

---

## ٢. اللوب

~~~js
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
~~~

- [[lo <= hi]]: المنطقة لسه فيها عنصر واحد على الأقل. ([[<=]] مش [[<]]: لما [[lo === hi]] لسه فيه عنصر نبص عليه.)
- [[(lo + hi) >> 1]]: النص. [[>>]] shift لليمين بمقدار 1 bit = قسمة على 2 وتقريب لتحت. جربنا: [[(0+4) >> 1]] = 2، و [[7 >> 1]] = 3، و [[9 >> 1]] = 4.
- [[arr[mid] < target]]: النص أصغر من الهدف، فالهدف (لو موجود) على اليمين. ارمي الشمال كله **والنص نفسه**: [[lo = mid + 1]].
- غير كده: ارمي اليمين: [[hi = mid - 1]].
- خرجنا من اللوب: المنطقة فضيت، يبقى مش موجود: [[-1]].

### التتبع على [[[1, 5, 10, 25, 100]]]

البحث عن 100:

~~~text الناتج
lo 0 hi 4 mid 2 arr[mid] 10     ← 10 < 100: ارمي الشمال
lo 3 hi 4 mid 3 arr[mid] 25     ← 25 < 100: ارمي الشمال
lo 4 hi 4 mid 4 arr[mid] 100    ← لقيته
4
~~~

والبحث عن 7 (مش موجود):

~~~text الناتج
lo 0 hi 4 mid 2 arr[mid] 10     ← 10 > 7: ارمي اليمين
lo 0 hi 1 mid 0 arr[mid] 1      ← 1 < 7: ارمي الشمال
lo 1 hi 1 mid 1 arr[mid] 5      ← 5 < 7: lo بقى 2 > hi
-1
~~~

كل خطوة المنطقة بتتقسم نصين. ولما جربنا على array فيها مليون رقم ودورنا على آخر واحد: **20 خطوة**. ده O(log n): log₂ مليون ≈ 20.

---

## ٣. الفخ: [[sort()]] من غير compare

~~~js
const nums = [10, 1, 5, 100, 25];
console.log(nums.sort());
~~~

~~~text الناتج
[ 1, 10, 100, 25, 5 ]
~~~

من غير compare function، [[sort]] بيحوّل كل عنصر لـ string ويقارن **حرف حرف** زي القاموس. [["100"]] قبل [["25"]] لأن الحرف [["1"]] قبل [["2"]]. جربنا: [[String(100) < String(25)]] طلعت [[true]].

---

## ٤. الترتيب الصح

~~~js
console.log(nums.sort((a, b) => a - b), binarySearch(nums, 25));
~~~

- [[(a, b) => a - b]]: compare function. لو الناتج سالب [[a]] قبل [[b]]، ولو موجب [[b]] الأول، ولو صفر زي ما هما.

~~~text الناتج
[ 1, 5, 10, 25, 100 ] 3
~~~

25 في index 3. وخلي بالك: [[sort]] بيعدّل [[nums]] نفسها. [[toSorted]] بترجّع نسخة جديدة، وبرضو من غير compare بترتب كنصوص: [[[5,1,10].toSorted()]] طلعت [[[ 1, 10, 5 ]]].

---

## ٥. ليه لازم مترتبة؟

الـ binary search بيرمي نص على **افتراض** إن اللي على الشمال أصغر. في الـ solCode جربنا على [[[10, 1, 5, 100, 25]]] من غير ترتيب: 25 رجّعت [[-1]] رغم إنها موجودة، و 5 رجّعت [[2]] بالصدفة لأنها في النص بالظبط. يعني الكود «بيشتغل ساعات»، ودي أسوأ نوع bug.

---

## الخلاصة

| | الوقت | الشرط |
|---|---|---|
| بحث خطي ([[includes]]) | O(n) | مفيش |
| binary search | O(log n) | الداتا مترتبة |
| sort بالمقارنة | O(n log n) | — |
| Set أو Map | O(1) للبحث بعد O(n) للبناء | — |

- بحث مرة واحدة: خطي. بحث كتير: رتّب مرة و binary، أو Set.
- [[sort()]] على أرقام لازم [[(a, b) => a - b]].
- الـ index في الداتابيز (B-tree) هو نفس الفكرة: داتا مترتبة فالبحث O(log n).`,
          lines: [
            "binary search: بيرجّع مكان العنصر أو -1.",
            "حدود المنطقة اللي بندوّر فيها: الكل في الأول.",
            "طول ما المنطقة مش فاضية.",
            "النص ([[>> 1]] قسمة على ٢ وتقريب لتحت).",
            "لقيته: رجّع مكانه.",
            "الهدف أكبر: ارمي النص الشمال. أصغر: ارمي اليمين.",
            "قفلة الـ while.",
            "مش موجود.",
            "قفلة.",
            "أرقام مش مترتبة.",
            "الفخ: sort من غير compare بيرتب كنصوص، فـ 100 قبل 25.",
            "compare صح يرتب أرقام، وبعدين binary search يلاقي 25 في مكان 3."
          ],
          sol: R`على [[[10, 1, 5, 100, 25]]] من غير ترتيب: البحث عن 25 بيرجّع [[-1]] رغم إنه موجود، وعن 1 برضو [[-1]]، وعن 5 بيرجّع [[2]] بالصدفة لأنه قاعد في النص بالظبط. ده أخطر من إنه يفشل دايمًا: ساعات يشتغل، فالـ bug يعدّي من الاختبار. binary search بيرمي نص الـ array كل خطوة على افتراض إن اللي على الشمال أصغر، ولو الافتراض ده مش صح هو بيرمي النص اللي فيه الإجابة.

ومع [[toSorted((a, b) => a - b)]]: الناتج [[[ 1, 5, 10, 25, 100 ]]] والأصلية لسه [[[ 10, 1, 5, 100, 25 ]]]، والبحث عن 25 في المترتبة يرجع [[3]]. [[sort]] بيعدّل الـ array نفسها وبيرجّعها، وده بيعمل bugs لو الـ array جاية props أو state في React. وافتكر إن [[toSorted()]] من غير comparator برضو بيرتب كنصوص.`,
          solCode: R`// bs.mjs
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
const unsorted = [10, 1, 5, 100, 25];
console.log(binarySearch(unsorted, 25), binarySearch(unsorted, 5), binarySearch(unsorted, 1));
const sorted = unsorted.toSorted((a, b) => a - b);
console.log(sorted, unsorted, binarySearch(sorted, 25));
// -1 2 -1
// [ 1, 5, 10, 25, 100 ] [ 10, 1, 5, 100, 25 ] 3`
        }
      ]
    }
]);
