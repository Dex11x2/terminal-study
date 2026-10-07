// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات React، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "reconciliation",
          title: "يعني إيه reconciliation، وليه الـ key بالـ index مشكلة؟",
          desc: R`لما الـ state تتغير، React بتنادي الـ components وتطلع شجرة عناصر جديدة، وتقارنها بالقديمة (reconciliation) عشان تعرف أقل تغييرات تعملها في الـ DOM. المقارنة الكاملة بين شجرتين بطيئة جدًا، فـ React بتفترض فرضيتين: لو نوع العنصر اتغير ([[div]] بقى [[span]]، أو [[<Login>]] بقى [[<Dashboard>]]) ترمي الشجرة القديمة كلها وتعمل جديدة، ولو في list فالـ [[key]] بيقول مين هو مين. بالـ key بتطابق العناصر حتى لو اتحركت، فتحافظ على الـ DOM والـ state بتاعتهم. بالـ index، مسح أو ترتيب بيخلي key 0 يبقى عنصر تاني، فـ React تحط state العنصر القديم (نص input، أو focus، أو animation) على العنصر الجديد.`,
          example: R`{todos.map((t, i) => <TodoRow key={i} todo={t} />)}
{todos.map(t => <TodoRow key={t.id} todo={t} />)}
<Profile key={userId} userId={userId} />`,
          try: R`افتح درس key في المستوى الأول وجرّب المثال (اكتب في أول خانة وامسح أول عنصر)، وبعدين اشرح اللي حصل بصوتك في ٣٠ ثانية باستخدام كلمة «reconciliation».`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم React بتشتغل إزاي من جوه مش بس بتستخدمها، وإن الـ bugs اللي شكلها غريب (نص بيتنقل لصف تاني) ليها سبب منطقي.",
            how: R`نقط لو اتسألت أكتر: الـ virtual DOM مجرد objects بتوصف الشاشة، والـ reconciliation هي خوارزمية المقارنة (O(n) بالفرضيتين بدل O(n³))، والـ commit هو تطبيق الفرق على الـ DOM. Fiber هو الـ data structure اللي بيخلي الشغل ده يتقسم ويتوقف ويكمّل (عشان الـ transitions). والـ key مش بس للـ lists: تغيير الـ key على component بيجبر React تعمله من جديد (reset للـ state). والـ index مقبول لو الـ list ثابتة ومفيش state جوه عناصرها.`,
            when: R`«ليه React محتاجة key؟»، و «إيه اللي بيحصل لو key اتكرر؟» (warning، وعناصر ممكن تتدمج أو تختفي)، و «Math.random() كـ key؟» (كل render عنصر جديد: state بتروح و focus بيضيع وأبطأ)، و «إزاي تعمل reset لفورم لما المستخدم يتغير؟» (key).`,
            mistakes: R`«الـ virtual DOM أسرع من الـ DOM» من غير شرح (هو مش أسرع، هو بيقلل التعديلات على الـ DOM ويخليك تكتب declarative). و «الـ key عشان الأداء بس» (هو عشان الصحة أولًا). و «الـ key لازم يبقى فريد في الصفحة كلها» (بين الإخوات بس).`
          },
          teach: R`## الفكرة: React بتطابق القديم بالجديد، والـ key هو الاسم

المثال ٣ سطور: الأول غلط، والتاني صح، والتالت استخدام تاني للـ key. جربناهم في Vite + React 19.3 في Chrome headless: list فيها [[Milk]] و [[Bread]]، وكل صف فيه خانة ليها state خاصة بيها، وكتبنا [[hello]] جنب Milk وبعدين مسحنا أول عنصر.

---

## ١. يعني إيه reconciliation؟

كل ما state تتغير، React بتنادي الـ component تاني فيرجّع JSX جديد (شجرة objects بتوصف الشاشة، اسمها virtual DOM). React بتقارنها بالشجرة اللي فاتت عشان تعدّل في الـ DOM الحقيقي اللي اتغير بس. المقارنة دي اسمها **reconciliation**، وبعدها **commit** (تطبيق الفرق).

المقارنة الكاملة بين أي شجرتين بطيئة جدًا (O(n³)، يعني لو فيه ١٠٠٠ عنصر يبقى مليار عملية). فـ React بتعمل فرضيتين تخليها O(n) (عملية لكل عنصر تقريبًا):

| الفرضية | معناها |
|---|---|
| نوع العنصر اتغير | [[<div>]] بقى [[<span>]]، أو [[<Login>]] بقى [[<Dashboard>]]: ارمي القديم كله بالـ state بتاعته واعمل جديد |
| الـ [[key]] | في الـ list، العنصر اللي ليه نفس الـ key هو نفس العنصر، حتى لو مكانه اتغير |

---

## ٢. السطر الأول: [[key={i}]]

~~~text المثال
{todos.map((t, i) => <TodoRow key={i} todo={t} />)}
~~~

[[map]] بتدّي الدالة العنصر [[t]] ورقمه [[i]] (index، من 0). الـ key هنا **المكان**.

~~~text الناتج (Chrome)
قبل:               ['Milk = "hello"', 'Bread = ""']
بعد مسح Milk:      ['Bread = "hello"']
~~~

[[hello]] اتنقلت لـ Bread! اللي React شافته:

| key | قبل | بعد | React فهمت |
|---|---|---|---|
| [[0]] | Milk، state = hello | Bread | «نفس الصف، الـ prop بس اتغير»، فسابت الـ state |
| [[1]] | Bread، state فاضية | مش موجود | «الصف ده اتشال» |

## ٣. السطر التاني: [[key={t.id}]]

~~~text المثال
{todos.map(t => <TodoRow key={t.id} todo={t} />)}
~~~

~~~text الناتج (Chrome)
قبل:               ['Milk = "hello"', 'Bread = ""']
بعد مسح Milk:      ['Bread = ""']
~~~

key [[1]] (Milk) اختفى، فـ React شالت صفه بالـ [[hello]]. و key [[2]] (Bread) لسه موجود بنفس الـ state. الـ id ماشي مع البيانات مش مع المكان.

## ٤. السطر التالت: key على component مش list

~~~text المثال
<Profile key={userId} userId={userId} />
~~~

الـ key بيشتغل في أي مكان: لو اتغير، React بتعتبره component تاني خالص، فترمي القديم بالـ state بتاعته وتعمل جديد. كتبنا في خانة جوه [[Profile]] وبعدين غيرنا المستخدم:

~~~text الناتج (Chrome)
قبل:          u1  "draft for u1"
بعد u2:       u2  ""
~~~

الخانة فضيت لوحدها من غير أي [[useEffect]] يعمل reset. ده الحل المعروف لـ «إزاي أفضّي فورم لما المستخدم يتغير».

---

## ٥. الأسئلة اللي بتيجي بعدها

| السؤال | الإجابة المختصرة |
|---|---|
| key اتكرر؟ | warning في الـ Console، وعناصر ممكن تتدمج أو تختفي |
| [[Math.random()]] كـ key؟ | key جديد كل render: كل صف بيتشال ويتعمل من الأول، فالـ state والـ focus بيضيعوا والأداء أوحش |
| الـ index مقبول إمتى؟ | لو الـ list ثابتة ومفيش state جوه عناصرها |
| الـ key لازم يبقى فريد في الصفحة؟ | لأ، بين الإخوات بس |
| الـ virtual DOM أسرع؟ | مش أسرع من الـ DOM، هو بيقلل التعديلات وبيخليك تكتب declarative |

---

## الخلاصة

- reconciliation = مقارنة الشجرة الجديدة بالقديمة، و commit = تطبيق الفرق.
- الـ key بيقول لـ React «ده نفس العنصر»، فلازم ييجي من البيانات ([[t.id]]).
- بالـ index، الـ state بتتبع المكان، فبتتنقل لعنصر تاني مع المسح أو الترتيب.
- تغيير الـ key على component = reset كامل للـ state.`,
          lines: [
            "غلط لو الـ list بتتمسح أو تترتب: key 0 بيبقى عنصر تاني والـ state بتتنقل له.",
            "صح: الـ id بيمشي مع العنصر أينما راح.",
            "key على component عادي: userId جديد يعني component جديد بـ state فاضية."
          ],
          sol: R`إجابة كويسة في دقيقة: «React بتقارن شجرة العناصر الجديدة بالقديمة وتطبّق الفرق، ودي الـ reconciliation. في الـ lists بتطابق العناصر بالـ key. لو الـ key هو الـ index ومسحت أول عنصر، التاني بياخد key 0، فـ React بتفتكره نفس العنصر وتحتفظ بالـ state والـ DOM بتوعه، فالنص اللي كان في الصف الأول يظهر جنب العنصر التاني. الحل key ثابت من البيانات.» ولو ختمت بمثال حقيقي حصل معاك، أحسن.`
        },
        {
          cmd: "stale closure",
          title: "الـ effect أو الـ interval شايف قيمة قديمة: ليه وإزاي تصلّحه؟",
          desc: R`كل render ليه نسخة خاصة بيه من الـ props والـ state والدوال (closure). الـ effect أو الـ handler اللي اتعمل في render معين شايف قيم الـ render ده بس. لو الـ effect اشتغل مرة ([[[]]]) وجواه [[setInterval]] بيقرا [[count]]، هيفضل شايف [[count]] بتاعة أول render (0) للأبد. الحل حسب الحالة: حط القيمة في الـ dependencies (والـ effect يتعاد)، أو استخدم الـ updater [[setCount(c => c + 1)]] فمش محتاج تقرا القيمة أصلًا، أو [[useEffectEvent]] (React 19.2) للجزء اللي محتاج أحدث قيمة من غير ما يعيد تشغيل الـ effect، أو ref.`,
          example: R`useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000)
  return () => clearInterval(id)
}, [])
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(id)
}, [])`,
          try: R`اكتب الاتنين في component وشوف الأول واقف عند 1 للأبد. وبعدين اشرح ليه [[eslint-disable-next-line react-hooks/exhaustive-deps]] على الأول كان هيخبّي الـ bug.`,
          flag: "script",
          deep: {
            why: "أشهر bug في الـ hooks، وبيختبر إنك فاهم إن الـ component دالة بتتنادى من الأول كل مرة، مش object عايش.",
            how: R`نقط أكتر: الـ linter [[exhaustive-deps]] موجود عشان يمنع ده، وتسكيته غالبًا غلط. و [[useEffectEvent]]: [[const onTick = useEffectEvent(() => log(count))]] دالة بتشوف أحدث قيم ومبتتحطش في الـ deps، للأجزاء اللي «event» جوه effect (زي analytics بالـ theme الحالي وانت فاتح اتصال بـ roomId). والـ objects والدوال في الـ deps بتتقارن بالمرجع فبتعمل loop (درس dependency array).`,
            when: R`«ليه العداد واقف عند 1؟»، و «إمتى تستخدم الـ updater function؟»، و «إيه اللي بيحصل لو شلت dependency عشان الـ effect بيشتغل كتير؟»، و «useEffectEvent بيحل إيه؟».`,
            mistakes: R`«React bug». و «هحط count في الـ deps» من غير ما تلاحظ إن الـ interval هيتعمل ويتلغي كل ثانية (شغال بس مش أنضف حل). و «useRef لكل حاجة» كأول حل.`
          },
          teach: R`## الفكرة: كل render ليه نسخته من [[count]]

المثال فيه effect-ين شبه بعض. الأول عداد واقف عند 1، والتاني شغال. جربناهم الاتنين في نفس الصفحة في Vite + React 19.3 في Chrome headless، والـ lint بـ oxlint 1.87 (الـ linter اللي مشروع Vite الجديد جاي بيه).

---

## ١. الأول: الـ bug

~~~text المثال
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000)
  return () => clearInterval(id)
}, [])
~~~

- [[setInterval(fn, 1000)]]: نادي [[fn]] كل 1000 millisecond (ثانية)، وبترجّع رقم [[id]] تقدر توقفه بيه.
- [[return () => clearInterval(id)]]: الـ cleanup، بيوقف الـ interval لما الـ component يتشال.
- [[[]]]: الـ effect ده بيشتغل **مرة واحدة** بعد أول render.

فين المشكلة؟ الدالة [[() => setCount(count + 1)]] اتعملت جوه أول render، و [[count]] في أول render كانت [[0]]. الدالة دي «قفلت» على القيمة دي (ده معنى closure: دالة فاكرة المتغيرات اللي كانت حواليها لما اتعملت). والـ effect مبيتعادش، فالـ interval فاضل بنفس الدالة القديمة للأبد:

| الثانية | [[count]] اللي الدالة شايفاها | اللي بيتنادى | النتيجة |
|---|---|---|---|
| ١ | 0 | [[setCount(0 + 1)]] | 1 |
| ٢ | 0 (لسه) | [[setCount(0 + 1)]] | 1 |
| ٣ | 0 | [[setCount(0 + 1)]] | 1 |

## ٢. التاني: الحل

~~~text المثال
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(id)
}, [])
~~~

الفرق كله في [[c => c + 1]]: ده updater. انت مش بتقول «خليها 1»، انت بتقول «خد آخر قيمة وزوّد واحد». React هي اللي بتدّي [[c]] القيمة الحالية وقت التنفيذ، فالدالة مش محتاجة تقرا [[count]] خالص، و [[[]]] هنا صح.

~~~text الناتج (Chrome، كل ثانية)
stale 1  fixed 2
stale 1  fixed 3
stale 1  fixed 4
stale 1  fixed 5
~~~

(fixed سابق بواحد لأننا بدأنا نقرا بعد ما الصفحة اتحملت بشوية.)

---

## ٣. الـ linter كان قال

~~~text الناتج (oxlint)
src/i/l6.tsx:5:43: error react-hooks(exhaustive-deps): React Hook useEffect has a missing dependency: 'count' help: Either include it or remove the dependency array.
~~~

[[exhaustive-deps]] بيدوّر على أي قيمة من الـ render مستخدمة جوه الـ effect ومش في الـ deps. لو كتبت فوق السطر [[// eslint-disable-next-line react-hooks/exhaustive-deps]] التحذير بيختفي (جربناها، oxlint بيحترم نفس التعليق)، **والـ bug بيفضل**. الأداة كانت بتشاور على المشكلة بالظبط.

---

## ٤. الحلول التانية وإمتى

| الحل | إمتى |
|---|---|
| updater [[setX(x => ...)]] | لما الحاجة الوحيدة اللي محتاجها القيمة القديمة للـ state نفسها (زي هنا) |
| [[count]] في الـ deps | شغال، بس الـ interval بيتلغي ويتعمل كل ثانية، مش أنضف حاجة |
| [[useEffectEvent]] (React 19.2) | جزء جوه الـ effect محتاج أحدث قيمة (زي analytics بالـ theme الحالي) ومينفعش يعيد تشغيل الـ effect |
| [[useRef]] | آخر حل: [[ref.current]] بيتقرا وقت التنفيذ، بس React مبتعرفش إنه اتغير |

---

## الخلاصة

- الـ component دالة بتتنادى من الأول كل render، وكل render ليه نسخة من الـ props والـ state.
- effect بـ [[[]]] شايف قيم أول render بس.
- الحل الأنضف هنا الـ updater، لأنه مش محتاج يقرا القيمة.
- تسكيت [[exhaustive-deps]] بيخبّي الـ bug مش بيصلّحه.`,
          lines: [
            "effect بيشتغل مرة واحدة.",
            "count هنا 0 للأبد (closure أول render)، فكل ثانية «خليها 1».",
            "cleanup.",
            "الـ deps فاضية، والـ linter كان هيحذّر.",
            "الصح:",
            "الـ updater بياخد آخر قيمة، فمش محتاج count خالص.",
            "cleanup.",
            "فاضية وصح هنا، لأن مفيش قيمة من الـ render جوه."
          ],
          sol: R`الأول بيعرض 1 ويقف: كل ثانية بيحط [[0 + 1]]. التاني بيعد 1، 2، 3. تسكيت الـ linter على الأول كان هيشيل التحذير بس والـ bug يفضل، لأن المشكلة إن الـ effect بيقرا قيمة من الـ render ومش معلن عنها. الإجابة في الانترفيو: «الـ closure بتاع أول render، والحل الـ updater لأنه مش محتاج يقرا القيمة».`
        },
        {
          cmd: "batching",
          title: "لو ناديت setState تلات مرات، كام render هيحصل؟ (state batching)",
          desc: R`Render واحد. React بتجمع كل الـ setState اللي بتحصل في نفس الـ event (أو نفس الـ tick) وتعمل render واحد في الآخر، ودي الـ batching. من React 18 ده بيحصل في كل مكان (automatic batching): جوه [[setTimeout]] و promises و native events كمان، مش في handlers بتوع React بس زي زمان. وعشان كده [[setState]] مبتغيّرش القيمة فورًا: [[console.log(count)]] بعدها على طول بيطبع القديمة. ولو محتاج تحسب من القيمة الجديدة استخدم الـ updater، ولو محتاج الـ DOM يتحدث فورًا (نادرًا) فيه [[flushSync]].`,
          example: R`function handleClick() {
  setCount(count + 1)
  setCount(count + 1)
  setCount(c => c + 1)
  console.log(count)
}
setTimeout(() => { setA(1); setB(2) }, 0)`,
          try: R`حط [[console.log('render')]] في component ودوس زرار بالـ handler ده: كام render؟ وكام القيمة النهائية لو count كانت 0؟ جاوب قبل ما تجرّب.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن setState بيطلب render مش بيعمله، والفرق بين القيمة والـ updater، وده أساس bugs كتير.",
            how: R`React بتحط التحديثات في طابور للـ component، وفي الآخر تحسبها بالترتيب: [[count + 1]] (قيمة ثابتة 1)، و [[count + 1]] (1 تاني)، و [[c => c + 1]] (بياخد 1 ويطلّع 2). فالنتيجة 2 مش 3، و render واحد. قبل React 18، التحديثات جوه [[setTimeout]] أو [[fetch().then]] كانت بتعمل render لكل setState. [[flushSync(() => setX(1))]] بيجبر render فوري (مثلًا عشان تعمل scroll لعنصر لسه متضاف).`,
            when: R`«ليه console.log بعد setState بيطبع القديم؟»، و «إيه اللي اتغير في React 18؟»، و «setState sync ولا async؟» (مش async بمعنى promise، هو بيتأجل لحد ما الـ event يخلص).`,
            mistakes: R`«setState async فلازم await»: مبترجعش promise. و «كل setState بتعمل render». ونسيان إن [[count]] ثابتة جوه الـ render ده.`
          },
          teach: R`## الفكرة: [[setState]] بيطلب render، مش بيعمله

المثال handler فيه ٣ [[setCount]] و [[console.log]]، وسطر تاني فيه تحديثين جوه [[setTimeout]]. جربناه في Vite + React 19.3 في Chrome headless، مع [[console.log('render', count, a, b)]] في أول الـ component عشان نعدّ الـ renders.

---

## ١. الـ handler سطر سطر (و [[count]] = 0)

~~~text المثال
function handleClick() {
  setCount(count + 1)
  setCount(count + 1)
  setCount(c => c + 1)
  console.log(count)
}
~~~

React مبتعملش render بعد كل سطر. بتحط كل تحديث في **طابور** للـ component، وبعد ما الـ handler يخلص بتحسب الطابور بالترتيب وتعمل render واحد. ده اسمه **batching**.

| السطر | اللي اتحط في الطابور | القيمة بعد ما الطابور يتحسب |
|---|---|---|
| [[setCount(count + 1)]] | «خليها 1» ([[count]] هنا 0 والـ render ده) | 1 |
| [[setCount(count + 1)]] | «خليها 1» تاني (لسه [[0 + 1]]) | 1 |
| [[setCount(c => c + 1)]] | «خد اللي قبلك وزوّد 1» | 2 |
| [[console.log(count)]] | مش تحديث: بيطبع [[count]] بتاعة الـ render ده | يطبع 0 |

ليه [[console.log]] طبع 0؟ [[count]] مش متغير بيتحدث، هو ثابت جوه الـ render ده. القيمة الجديدة هتبقى في **الـ render الجاي**، يعني نداء جديد للـ component.

~~~text الناتج (Chrome) بعد دوسة واحدة
0
render 2 0 0
~~~

[[0]] من الـ [[console.log]]، وبعده **render واحد** بـ [[count]] = 2.

---

## ٢. جوه [[setTimeout]]

~~~text المثال
setTimeout(() => { setA(1); setB(2) }, 0)
~~~

[[setTimeout(fn, 0)]]: نفّذ [[fn]] بعد ما الكود الحالي يخلص (مش جوه الـ event). قبل React 18 كان كل [[setState]] هنا بيعمل render لوحده (اتنين). من React 18 الـ batching بقى في كل مكان (automatic batching):

~~~text الناتج (Chrome)
render 2 1 2
~~~

render واحد فيه [[a = 1]] و [[b = 2]] مع بعض.

---

## ٣. وفي [[StrictMode]]

مشروع Vite بيلف التطبيق في [[<StrictMode>]]، فجربنا تاني:

~~~text الناتج (Chrome + StrictMode)
0
render 2 0 0
render 2 0 0
~~~

السطر مكرر مش لأن فيه render زيادة اتحسب، لكن React في وضع التطوير بتنادي الـ component مرتين عشان تكشف الكود اللي مش pure. نفس القيم، و render واحد للـ DOM. في الـ production مش بيحصل.

---

## ٤. اللي بيتسأل بعدها

| السؤال | الإجابة |
|---|---|
| [[setState]] async؟ | مش promise ومبيترجعش حاجة تعملها [[await]]. هو بيتأجل لحد ما الـ event يخلص |
| عايز أحسب من الجديد | الـ updater [[x => ...]] |
| عايز الـ DOM يتحدث حالًا (scroll لعنصر لسه متضاف) | [[flushSync(() => setX(1))]] من [[react-dom]]، نادرًا |

---

## الخلاصة

- كل [[setState]] في نفس الـ event (أو نفس الـ tick) = render واحد.
- القيمة متتغيرش جوه الـ render الحالي، فـ [[console.log]] بعدها بيطبع القديمة.
- [[count + 1]] مرتين = 1، والـ updater بس هو اللي بيبني على اللي قبله، فالنتيجة 2.
- من React 18 ده في كل مكان، حتى [[setTimeout]] و promises.`,
          lines: [
            "handler واحد.",
            "«خليها count + 1»، و count هنا 0.",
            "نفس الكلام: لسه 0 + 1.",
            "updater: آخر قيمة في الطابور + 1.",
            "لسه القيمة القديمة: التحديث مستني آخر الـ handler.",
            "قفلة.",
            "من React 18: الاتنين في render واحد حتى جوه setTimeout."
          ],
          sol: R`Render واحد، والقيمة النهائية 2 (مش 3)، والـ console بيطبع 0. (ده نفس مثال درس useState في المستوى الأول.) في Strict Mode هتشوف «render» مرتين، بس ده نفس الـ render متنادي مرتين للكشف، مش تلاتة.`
        },
        {
          cmd: "controlled ولا uncontrolled؟",
          title: "الفرق بين controlled و uncontrolled components، وتختار إمتى؟",
          desc: R`Controlled: قيمة الخانة جاية من state ([[value]] مع [[onChange]])، فـ React مصدر الحقيقة، وتقدر تتحقق وانت بتكتب وتغيّر القيمة من الكود. Uncontrolled: الـ DOM بيمسك القيمة ([[defaultValue]])، وبتقراها وقت الإرسال بـ FormData أو ref، وده أخف (مفيش render مع كل حرف). react-hook-form uncontrolled من جوه عشان الأداء، و Actions في React 19 بتشتغل بـ FormData. أختار controlled لما محتاج القيمة لحظيًا (زرار بيتقفل، أو بحث بيفلتر، أو خانة بتأثر على خانة)، و uncontrolled أو RHF للفورمات العادية. ونفس الفكرة في الـ components بتاعتي: أدعم الاتنين بـ [[value]] و [[defaultValue]] (درس controlled ولا uncontrolled API).`,
          example: R`<input value={email} onChange={e => setEmail(e.target.value)} />
<input name="email" defaultValue="" />
<input type="file" name="avatar" />`,
          try: R`اكتب فورم بخانتين بالطريقتين، وحط [[console.log('render')]] واكتب ١٠ حروف في كل واحد. وبعدين اشرح ليه [[<input type="file">]] دايمًا uncontrolled.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار الأداة حسب الحاجة، وفاهم تمن كل اختيار (renders مقابل تحكم).",
            how: R`نقط أكتر: التحذير «A component is changing an uncontrolled input to be controlled» بيجي لما [[value]] تبدأ [[undefined]] وبعدين تبقى نص (الحل [[?? '']]). و [[value]] من غير onChange بيعمل الخانة read-only. والـ file input قيمته [[File]] والمتصفح مبيسمحش للكود يحطها لأسباب أمان. و reset للـ uncontrolled بـ [[form.reset()]] أو تغيير الـ key.`,
            when: R`«ليه react-hook-form أسرع من Formik؟» (uncontrolled وrenders أقل)، و «إزاي تعمل reset لفورم uncontrolled؟»، و «صمم API لـ component بتاعك يدعم الاتنين».`,
            mistakes: R`«uncontrolled غلط ودايمًا استخدم controlled». و «controlled أبطأ دايمًا» (لفورم صغير الفرق مش محسوس). ونسيان الـ file input.`
          },
          teach: R`## الفكرة: مين ماسك القيمة، React ولا المتصفح؟

المثال ٣ خانات، كل واحدة شكل. جربناهم في Vite + React 19.3 في Chrome headless، ومع [[console.log('render ...')]] في كل component، وكتبنا ١٠ حروف في كل خانة.

---

## ١. controlled

~~~text المثال
<input value={email} onChange={e => setEmail(e.target.value)} />
~~~

- [[value={email}]]: القيمة اللي ظاهرة في الخانة **جاية من state**. React هي مصدر الحقيقة.
- [[onChange]]: مع كل حرف، [[e.target.value]] (النص اللي في الخانة دلوقتي) بيروح لـ [[setEmail]]، فيحصل render، والخانة تتعرض بالقيمة الجديدة.

لو شلت [[onChange]]، الخانة بتبقى read-only لأن [[value]] ثابتة والكتابة مش بترجع لها. ولو [[email]] بدأت [[undefined]] وبعدين بقت نص، React بتطلع warning «A component is changing an uncontrolled input to be controlled»، والحل [[value={email ?? ''}]].

## ٢. uncontrolled

~~~text المثال
<input name="email" defaultValue="" />
~~~

- [[defaultValue]]: قيمة **أولى** بس. بعدها المتصفح بيمسك القيمة، و React مبتعرفش انت كتبت إيه.
- [[name="email"]]: الاسم اللي هتقرا بيه القيمة وقت الإرسال:

~~~text وقت الإرسال
new FormData(form).get('email')
~~~

## ٣. الملف: دايمًا uncontrolled

~~~text المثال
<input type="file" name="avatar" />
~~~

جربنا نحط قيمة فيه من JavaScript:

~~~text الناتج (Chrome)
InvalidStateError: Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string.
~~~

يعني المسموح بس [['']] (تفضيته). ليه؟ لو موقع يقدر يكتب مسار ملف ويبعت الفورم، يقدر يسرق ملف من جهازك من غير ما تختاره. فمينفعش [[value]] من state، وبتقراه من [[FormData]] أو ref.

---

## ٤. الناتج: كام render؟

~~~text الناتج (Chrome) بعد ١٠ حروف في كل خانة
controlled    10 renders
uncontrolled  0 renders
submit:       submitted email = abcdefghij
~~~

الـ uncontrolled اترسم مرة واحدة بس لما الصفحة فتحت، والكتابة مكلّفتش أي render، والقيمة وصلت كاملة وقت الإرسال من [[FormData]].

---

## ٥. تختار إمتى؟

| محتاج | استخدم |
|---|---|
| القيمة لحظيًا: زرار بيتقفل، بحث بيفلتر وانت بتكتب، خانة بتأثر على خانة | controlled |
| فورم عادي بيتقري وقت الإرسال | uncontrolled أو react-hook-form (uncontrolled من جوه، عشان كده renders أقل) |
| Actions في React 19 | بتاخد [[FormData]]، يعني uncontrolled |
| ملف | uncontrolled دايمًا |
| reset لفورم uncontrolled | [[form.reset()]] أو غيّر الـ [[key]] |

ولو بتعمل component لغيرك: ادعم الاتنين، [[value]] + [[onChange]] أو [[defaultValue]] (درس controlled ولا uncontrolled API).

---

## الخلاصة

- controlled: [[value]] + [[onChange]]، render مع كل حرف، وتحكم كامل.
- uncontrolled: [[defaultValue]] + [[name]]، المتصفح ماسك القيمة، وبتقراها وقت الإرسال.
- الفرق في الأداء مش محسوس في فورم صغير. اختار حسب محتاج القيمة إمتى.`,
          lines: [
            "controlled: القيمة من state وكل حرف بيرجع لها، يعني render مع كل حرف.",
            "uncontrolled: قيمة أولى والمتصفح يمسك الباقي، وتتقري بالـ name وقت الإرسال.",
            "الملفات دايمًا uncontrolled: الكود ميقدرش يحط ملف في الخانة."
          ],
          sol: R`الـ controlled بيطبع render مع كل حرف (١٠ مرات)، والـ uncontrolled مرة واحدة بس. الـ file input: المتصفح مش بيسمح لـ JavaScript يحط قيمة فيه (غير إنه يفضّيه)، عشان موقع ميقدرش يختار ملف من جهازك ويرفعه من غير ما تختاره انت، فمينفعش يبقى [[value]] من state.`
        },
        {
          cmd: "context ولا store",
          title: "Context ولا Zustand/Redux ولا React Query؟ الـ state بتاعتك مكانها فين؟",
          desc: R`أول سؤال: البيانات دي جاية من السيرفر ولا من الفرونت؟ بيانات السيرفر (منتجات، وطلبات، والمستخدم من API) مكانها React Query أو RTK Query: الكاش والـ refetch والـ loading مشكلتهم. الـ client state: لو component واحد محتاجها، [[useState]] جواه. لو شوية components قريبين، ارفعها للأب. لو كتير وبعيدين وبتتغير نادرًا (ثيم، ولغة، والمستخدم الحالي)، Context. لو كتير وبتتغير كتير وكل واحد محتاج جزء (سلة، ومحرر، و filters معقدة)، store زي Zustand أو Redux، لأن الـ selectors بتخلي كل component يعيد الرسم بس لما الجزء بتاعه يتغير. والـ URL للي المستخدم ممكن يشاركه. Context مش state manager: هو وسيلة توصيل، وأي تغيير في قيمته بيعيد رسم كل اللي بيقروه.`,
          example: R`const { data: products } = useQuery(productQueries.list(filters))
const { theme } = useTheme()
const count = useCartStore(s => s.items.length)
const [open, setOpen] = useState(false)
const [params] = useSearchParams()`,
          try: R`خد تطبيق عندك (أو المشروع اللي بتبنيه) واعمل جدول: كل قطعة state، وجاية منين، ومين بيقراها، وبتتغير قد إيه، وهي فين دلوقتي. لاقي حاجة واحدة في المكان الغلط.`,
          flag: "script",
          deep: {
            why: "سؤال تصميم بيبان منه خبرتك: الناس اللي بتحط كل حاجة في Redux أو كل حاجة في Context بتعمل تطبيقات بطيئة وصعبة. الإجابة الكويسة بتقسّم حسب مصدر البيانات ومعدل التغيير.",
            how: R`ليه Context بطيء للحاجات اللي بتتغير كتير: أي component بيعمل [[useContext]] بيعيد الرسم مع أي تغيير في القيمة، حتى لو بيقرا جزء، ومفيش selectors. تقدر تقسّمه لـ contexts أصغر، بس بعد حد معين ده بيبقى store بإيدك. الـ stores الخارجية مبنية على [[useSyncExternalStore]]: كل component بيشترك بـ selector. وبيانات السيرفر في Redux أو Context معناها إنك بتكتب كاش بإيدك وبتنسى الـ invalidation. ومثال مشاكل حقيقية: context فيه بيانات السلة من API بـ loading و error يدوي، أو store ضخم كل الـ components بتقراه من غير selector (دروس useContext و Zustand).`,
            when: R`«إمتى تستخدم Redux؟»، و «Context بيعمل re-render لإيه؟»، و «server state و client state الفرق؟»، و «لو هتبني checkout من ٣ خطوات، الـ state فين؟» (reducer + context في الصفحة، أو Zustand لو محتاجها تفضل بعد refresh مع persist).`,
            mistakes: R`«Redux عشان التطبيق كبير» من غير سبب. و «Context بدل Redux دايمًا». ونسيان React Query خالص وحط بيانات الـ API في useState و effect. ونسيان الـ URL كمكان للـ state.`
          },
          teach: R`## الفكرة: كل نوع state ليه مكان

المثال ٥ سطور، كل سطر مكان مختلف لـ state مختلفة. مش برنامج كامل: [[productQueries]] و [[useTheme]] و [[useCartStore]] حاجات معمولة في دروس تانية (query key factory و useContext و Zustand). الإجابة في الانترفيو هي إنك تعرف تقول ليه كل سطر في مكانه.

---

## السطر سطر

~~~text المثال
const { data: products } = useQuery(productQueries.list(filters))
~~~

بيانات **سيرفر**: المنتجات عايشة في الـ database، واللي عندك نسخة ممكن تبقى قديمة. React Query بيدير الكاش والـ loading والـ refetch. [[{ data: products }]] معناها «خد خانة [[data]] وسمّيها [[products]]».

~~~text المثال
const { theme } = useTheme()
~~~

client state **قليلة التغيير** وكل التطبيق محتاجها: Context. [[useTheme]] custom hook جواه [[useContext]].

~~~text المثال
const count = useCartStore(s => s.items.length)
~~~

client state **مشتركة وبتتغير كتير**: store زي Zustand. [[s => s.items.length]] اسمه selector: الـ component ده بيقرا رقم واحد بس من الـ store، وبيعيد الرسم لما الرقم ده بس يتغير.

~~~text المثال
const [open, setOpen] = useState(false)
~~~

state **محلية**: مفتوح ولا مقفول، محدش برا الـ component محتاجها.

~~~text المثال
const [params] = useSearchParams()
~~~

state في **الـ URL** (React Router): فلاتر وصفحة وترتيب. بتفضل بعد الـ refresh، وتتبعت في لينك، وزرار Back بيرجّعها.

---

## ليه Context مش لكل حاجة؟ جربناها

عملنا سلة فيها خانة كوبون مرتين: مرة في Context ومرة في Zustand. وفي كل واحدة component تاني بيعرض عدد العناصر بس (مش بيقرا الكوبون). كتبنا [[SAVE10]] (٦ حروف) في كل خانة وعدّينا الـ renders. اتشغّل في Vite + React 19.3 + Zustand 5 في Chrome headless:

~~~text الناتج (Chrome)
context: count badge:  6
context: coupon input: 6
store: count badge:    0
store: coupon input:   6
~~~

- في Context: عداد العناصر اترسم ٦ مرات رغم إن عدد العناصر متغيرش. أي تغيير في قيمة الـ Provider بيعيد رسم **كل** اللي بيعمل [[useContext]]، ومفيش selectors.
- في Zustand: عداد العناصر صفر renders، لأن الـ selector بتاعه رجّع نفس الرقم.

عشان كده Context «وسيلة توصيل» مش state manager. ينفع تقسّمه لـ contexts أصغر، بس بعد حد معين انت كده بتكتب store بإيدك.

---

## الجدول اللي تقوله في الانترفيو

| السؤال | لو الإجابة أيوه |
|---|---|
| جاية من السيرفر؟ | React Query أو RTK Query |
| component واحد بس محتاجها؟ | [[useState]] جواه |
| شوية components قريبين؟ | ارفعها لأقرب أب |
| المستخدم ممكن يشاركها أو يرجع لها بـ Back؟ | الـ URL |
| كل التطبيق ونادرًا ما بتتغير (ثيم، لغة، المستخدم الحالي)؟ | Context |
| مشتركة وبتتغير كتير وكل واحد محتاج جزء (سلة، محرر)؟ | Zustand أو Redux بـ selectors |

---

## الخلاصة

- أول سؤال: سيرفر ولا client؟ بيانات السيرفر مكانها كاش مش [[useState]].
- Context بيعيد رسم كل اللي بيقروه مع أي تغيير، فهو للحاجات البطيئة.
- الـ store بالـ selector بيعيد رسم اللي اتأثر بس.
- الـ URL مكان state كمان، وناس كتير بتنساه.`,
          lines: [
            "بيانات سيرفر: React Query.",
            "حاجة قليلة التغيير وكل التطبيق محتاجها: context.",
            "client state مشتركة بتتغير كتير: store بـ selector.",
            "state محلية: جوه الـ component.",
            "حاجة المستخدم يشاركها: الـ URL."
          ],
          sol: R`جدول كويس بيطلع فيه غالبًا حاجة من دول: بيانات API محفوظة في useState أو store (لازم تروح React Query)، أو فلاتر في state بتضيع مع الـ refresh (لازم تروح الـ URL)، أو state في App محدش بيستخدمها غير component واحد تحت (لازم تنزل له)، أو context واحد كبير فيه حاجات بتتغير بسرعات مختلفة (يتقسم). لو ملقتش ولا حاجة، يا إما التطبيق صغير يا إما بص تاني.`
        },
        {
          cmd: "SSR و hydration",
          title: "SSR يعني إيه في React، والـ hydration بيعمل إيه؟",
          desc: R`SSR إن الـ components تترسم HTML على السيرفر ([[renderToString]] زمان، و [[renderToPipeableStream]] أو [[renderToReadableStream]] دلوقتي مع streaming)، فالمستخدم ومحركات البحث بيشوفوا المحتوى قبل ما الـ JS يتحمّل. بعدين في المتصفح، [[hydrateRoot]] بترسم نفس الـ components وتربط الـ events بالـ DOM الموجود بدل ما تعمله من جديد، ودي الـ hydration. لازم الناتج يبقى هو هو في الاتنين، وإلا hydration mismatch. SPA زي Vite مفيهاش SSR: الـ HTML فاضي ([[<div id="root">]]) والمتصفح بيرسم كل حاجة. وفي Next.js ده بيحصل لوحده، ومع Server Components فيه طبقة تانية (تاب Next.js، أسئلة الانترفيو).`,
          example: R`// server
const html = renderToString(<App url={req.url} />)
res.send($__bt<div id="root">$__{html}</div><script src="/client.js"></script>$__bt)
// client
hydrateRoot(document.getElementById('root')!, <App url={location.pathname} />)
// SPA: createRoot(document.getElementById('root')!).render(<App />)`,
          try: R`افتح موقع Next.js ومشروع Vite، واعمل View Source على الاتنين: فين المحتوى؟ وبعدين في Next، اقفل JavaScript من DevTools (Command menu > Disable JavaScript) واعمل refresh: إيه اللي شغال وإيه اللي لأ؟`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الفرق بين «فين الـ HTML بيتعمل» و «إمتى الصفحة تبقى تفاعلية»، وده أساس أي نقاش عن Next.js والأداء والـ SEO.",
            how: R`الترتيب: السيرفر بيبعت HTML كامل (المستخدم بيشوف المحتوى بسرعة، FCP و LCP أحسن)، وبعدين الـ JS يتحمّل، وبعدين hydration (لحد ما تخلص الزراير شكلها موجود بس مبتشتغلش). الـ streaming بيبعت الـ HTML على أجزاء مع Suspense، و selective hydration في React 18 بيعمل hydration للجزء اللي المستخدم داس عليه الأول. أسباب الـ mismatch: [[Date.now()]]، و [[Math.random()]]، و [[window]] في الـ render، و localStorage، و HTML مش صالح. والحل القيم الخاصة بالمتصفح في effect بعد الـ hydration.`,
            when: R`«SSR ولا CSR؟»، و «ليه الزرار مش شغال في أول ثانية؟» (لسه متعملّهاش hydration)، و «إيه اللي بيعمل hydration error؟»، و «SSR بيحسّن الـ SEO إزاي؟».`,
            mistakes: R`«SSR معناه مفيش JS». و «hydration يعني الـ render من الأول» (لأ، بيعيد استخدام الـ DOM). و «SPA مينفعش تتأرشف خالص» (جوجل بيشغّل JS بس أبطأ وأقل ضمانًا).`
          },
          teach: R`## الفكرة: الـ HTML يتعمل على السيرفر، والـ events تتربط في المتصفح

المثال ٣ أجزاء: سطرين على السيرفر، وسطر في المتصفح، وتعليق بيوري الـ SPA للمقارنة. جربنا الجزء الأول بـ [[renderToString]] في Node 24، والتاني بـ [[hydrateRoot]] في Chrome headless (React 19.3)، على component فيه عنوان وزرار عداد:

~~~text App.tsx (للتجربة)
export function App({ url }: { url: string }) {
  const [n, setN] = useState(0)
  return <main><h1>Page {url}</h1><button onClick={() => setN(n + 1)}>Clicked {n}</button></main>
}
~~~

---

## ١. على السيرفر: [[renderToString]]

~~~text المثال
// server
const html = renderToString(<App url={req.url} />)
~~~

[[renderToString]] من [[react-dom/server]] بتنادي الـ components وترجّع النتيجة **نص HTML** بدل ما ترسم في DOM. و [[req.url]] الـ path اللي المستخدم طلبه (من Express مثلًا)، عشان السيرفر يعرف يرسم أنهي صفحة.

~~~text الناتج (Node 24، url = /orders)
<main><h1>Page <!-- -->/orders</h1><button>Clicked <!-- -->0</button></main>
~~~

حاجتين تلاحظهم:

- [[<!-- -->]]: تعليق HTML فاضي بين «Page» و [[/orders]]. ده لأنهم في JSX نصين منفصلين (نص ثابت و [[{url}]])، و React بتعلّم الحد بينهم عشان وقت الـ hydration تعرف تطابق كل نص.
- مفيش [[onClick]] في الـ HTML. الـ HTML شكل بس، والزرار لسه ميعملش حاجة.

~~~text المثال
res.send($__bt<div id="root">$__{html}</div><script src="/client.js"></script>$__bt)
~~~

بنحط الـ HTML جوه الصفحة، ومعاه [[<script>]] بيحمّل كود الـ React للمتصفح. ([[$__{html}]] جوه الـ template string بتحط قيمة المتغير.)

## ٢. في المتصفح: [[hydrateRoot]]

~~~text المثال
// client
hydrateRoot(document.getElementById('root')!, <App url={location.pathname} />)
~~~

- [[document.getElementById('root')!]]: الـ div اللي فيه الـ HTML الجاهز. [[!]] بتقول لـ TypeScript «مش null».
- [[location.pathname]]: نفس الـ path اللي السيرفر شافه، عشان الناتج يطلع **نفس** الـ HTML.
- [[hydrateRoot]] بترسم الـ components في الذاكرة، وبدل ما تعمل DOM جديد بتمشي على الـ DOM الموجود وتربط فيه الـ events. ده الـ hydration.

جربنا: دوسنا الزرار قبل الـ hydration، وبعدين عملنا hydration، ودوسنا تاني:

~~~text الناتج (Chrome)
before hydration, click -> Clicked 0
same <button> node after hydration: true
after hydration, click -> Clicked 1
~~~

- قبل الـ hydration الزرار ظاهر بس مبيعملش حاجة (ده اللي المستخدم بيحسه في أول ثانية في موقع SSR).
- [[true]]: نفس عنصر الزرار، React معملتش واحد جديد.
- بعدها [[onClick]] اشتغل.

## ٣. الـ SPA

~~~text المثال
// SPA: createRoot(document.getElementById('root')!).render(<App />)
~~~

في مشروع Vite عادي [[index.html]] فيه [[<div id="root"></div>]] فاضي، و [[createRoot]] بيعمل كل الـ DOM من الصفر في المتصفح. يعني لحد ما الـ JS يتحمّل ويشتغل، الصفحة بيضا.

---

## ٤. الـ hydration mismatch

خلّينا الـ component يكتب [[Math.random()]] في [[<p>]]. السيرفر طلّع رقم، والمتصفح طلّع رقم تاني:

~~~text الناتج (Chrome)
Hydration failed because the server rendered text didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:
- A server/client branch $__btif (typeof window !== 'undefined')$__bt.
- Variable input such as $__btDate.now()$__bt or $__btMath.random()$__bt ...
same <button> node after hydration: false
~~~

React لاقت الناتج مختلف، فرمت الـ HTML ورسمت الجزء ده من الأول في المتصفح ([[false]]: عنصر جديد). يعني خسرت فايدة الـ SSR للجزء ده. الحل: أي قيمة خاصة بالمتصفح ([[Date.now()]] و [[Math.random()]] و [[window]] و localStorage) تتحط في [[useEffect]] بعد الـ hydration.

---

## الخلاصة

| | SSR + hydration | SPA |
|---|---|---|
| الـ HTML الأول | فيه المحتوى | [[<div id="root"></div>]] فاضي |
| بيترسم فين | [[renderToString]] أو [[renderToPipeableStream]] على السيرفر | [[createRoot]] في المتصفح |
| التفاعل | بعد [[hydrateRoot]] | بعد ما الـ JS يشتغل |
| شرط | السيرفر والمتصفح يطلّعوا نفس الناتج | مفيش |
| من غير JS | المحتوى ظاهر واللينكات شغالة | صفحة بيضا |`,
          lines: [
            "على السيرفر: ارسم التطبيق HTML.",
            "ابعته جوه الصفحة ومعاه الـ JS.",
            "في المتصفح: نفس الـ App، وربط الـ events بالـ HTML الموجود. (في SPA بدلها createRoot بيرسم من الصفر.)"
          ],
          sol: R`View Source في Next: المحتوى كله موجود كـ HTML. في Vite: [[<div id="root"></div>]] فاضي وملفات JS بس. من غير JavaScript: صفحة Next بتظهر بالمحتوى واللينكات العادية شغالة (تنقل كامل)، بس أي زرار بيعتمد على onClick مش شغال (إلا الفورمات اللي بـ Server Actions، بتتبعت كفورم عادي). وموقع Vite صفحة بيضا.`
        },
        {
          cmd: "useLayoutEffect",
          title: "useEffect ولا useLayoutEffect؟",
          desc: R`الاتنين بيشتغلوا بعد ما React تعدّل الـ DOM، والفرق إمتى: [[useLayoutEffect]] بيشتغل قبل ما المتصفح يرسم الشاشة (sync)، و [[useEffect]] بعد الرسم. فلو محتاج تقيس عنصر وتغيّر حاجة على أساسه (مكان tooltip، أو ارتفاع textarea) قبل ما المستخدم يشوف، useLayoutEffect بيمنع الوميض: المستخدم مش هيشوف الـ tooltip في المكان الغلط لحظة. بس لأنه بيوقف الرسم، أي شغل تقيل فيه بيبطّأ الصفحة، فالقاعدة: useEffect دايمًا، و useLayoutEffect بس لقياس الـ layout وتعديله. وعلى السيرفر مبيشتغلش خالص.`,
          example: R`function Tooltip({ anchor, children }: { anchor: DOMRect; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(anchor.bottom)
  useLayoutEffect(() => {
    const height = ref.current!.getBoundingClientRect().height
    if (anchor.bottom + height > window.innerHeight) setTop(anchor.top - height)
  }, [anchor])
  return <div ref={ref} style={{ position: 'fixed', top, left: anchor.left }}>{children}</div>
}`,
          try: R`حط الـ Tooltip ده قريب من آخر الشاشة، وغيّر [[useLayoutEffect]] لـ [[useEffect]]، واعمل CPU throttling 6x: هتلاقي الـ tooltip بيظهر تحت لحظة وبعدين ينط فوق.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم دورة render ثم commit ثم paint، وإن الأداة الأقوى مش دايمًا الأحسن.",
            how: R`الترتيب: render (حساب الـ JSX)، و commit (تعديل الـ DOM)، و useLayoutEffect (sync، والمتصفح لسه مرسمش)، و paint، و useEffect. أي setState جوه useLayoutEffect بيعمل render تاني sync قبل الـ paint، فالمستخدم بيشوف النتيجة النهائية بس. ومكتبات الـ positioning (Floating UI) بتستخدمه. وفي SSR بيطبع warning زمان (React 18) لأنه مبيشتغلش على السيرفر، و [[useInsertionEffect]] نوع تالت لمكتبات CSS-in-JS بس.`,
            when: R`«ليه الـ tooltip بيومض؟»، و «ترتيب الـ effects إيه؟»، و «useLayoutEffect في Next.js بيعمل إيه؟».`,
            mistakes: R`«useLayoutEffect أسرع فاستخدمه دايمًا» (هو بيوقف الرسم). وجلب بيانات جواه. ونسيان إنه مش بيشتغل على السيرفر.`
          },
          teach: R`## الفكرة: نقيس قبل ما المستخدم يشوف

[[Tooltip]] بيظهر تحت العنصر اللي بيشاور عليه. لو مفيش مكان تحت (هيخرج برا الشاشة)، بيتنقل فوقه. عشان يعرف، لازم يتعمل الأول ويتقاس، وده اللي [[useLayoutEffect]] بيعمله قبل ما المتصفح يرسم.

جربناه في Vite + React 19.3 في Chrome headless: الشاشة ارتفاعها 600، والزرار تحت خالص (طرفه التحتاني عند 590)، والـ tooltip ٣ سطور. وسجّلنا مكان الـ tooltip في كل فريم بيترسم (بـ [[requestAnimationFrame]]، اللي بيتنادى مرة قبل رسم كل فريم).

---

## ١. الـ props والـ ref والـ state

~~~text المثال
function Tooltip({ anchor, children }: { anchor: DOMRect; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(anchor.bottom)
~~~

- [[anchor: DOMRect]]: مكان العنصر اللي بيشاور عليه، من [[getBoundingClientRect()]]: فيه [[top]] و [[bottom]] و [[left]] بالبكسل من أول الشاشة.
- [[ref]]: عشان نوصل لـ div الـ tooltip نفسه ونقيسه (درس useRef).
- [[top]]: المكان الرأسي، ومبدئيًا [[anchor.bottom]] يعني تحت العنصر على طول.

## ٢. القياس

~~~text المثال
  useLayoutEffect(() => {
    const height = ref.current!.getBoundingClientRect().height
    if (anchor.bottom + height > window.innerHeight) setTop(anchor.top - height)
  }, [anchor])
~~~

- [[ref.current!]]: الـ div، و [[!]] لأننا متأكدين إنه اترسم (الـ effect بيشتغل بعد تعديل الـ DOM).
- [[.height]]: ارتفاع الـ tooltip الحقيقي بعد ما اترسم بالنص بتاعه.
- [[window.innerHeight]]: ارتفاع الشاشة الظاهرة.
- الشرط: لو تحت العنصر + ارتفاع الـ tooltip أكبر من الشاشة، حطه فوق: [[anchor.top - height]].
- [[[anchor]]]: اتعاد لو العنصر اتحرك.

## ٣. الرسم

~~~text المثال
  return <div ref={ref} style={{ position: 'fixed', top, left: anchor.left }}>{children}</div>
}
~~~

[[position: 'fixed']] يعني [[top]] و [[left]] محسوبين من الشاشة نفسها، زي أرقام [[DOMRect]] بالظبط. و [[top]] لوحدها اختصار [[top: top]].

---

## ٤. الترتيب: إمتى كل حاجة بتشتغل

| الخطوة | اللي بيحصل |
|---|---|
| ١. render | React تنادي [[Tooltip]] وتحسب الـ JSX ([[top]] = تحت) |
| ٢. commit | تعدّل الـ DOM |
| ٣. [[useLayoutEffect]] | sync، والمتصفح **لسه مرسمش**. لو فيه [[setTop]] هنا، React تعمل render تاني على طول |
| ٤. paint | المتصفح يرسم الشاشة |
| ٥. [[useEffect]] | بعد الرسم |

## ٥. الناتج: مكان الـ tooltip في كل فريم

~~~text الناتج (Chrome، الشاشة 600)
useEffect       [590, 497, 497, 497, ...]
useLayoutEffect [497, 497, 497, 497, ...]

CPU throttling 6x:
useEffect       [590, 590, 497, 497, ...]
useLayoutEffect [497, 497, 497, ...]
~~~

- [[590]] = تحت الزرار، يعني الـ tooltip ظاهر ومقصوص من آخر الشاشة.
- [[497]] = فوق الزرار (طرفه فوق عند 590 ناقص ارتفاع الـ tooltip). الفرق 93 هو ارتفاع الـ tooltip + ارتفاع الزرار.
- بـ [[useEffect]]: أول فريم اترسم والـ tooltip تحت، وبعدين نط فوق. ومع CPU أبطأ ٦ مرات (زي موبايل ضعيف) فضل تحت فريمين. ده الوميض.
- بـ [[useLayoutEffect]]: من أول فريم فوق. التصحيح حصل قبل أي رسم.
- ونفس النتيجة لما فتحناه بدوسة على الزرار.

---

## ٦. ليه مش [[useLayoutEffect]] دايمًا؟

لأنه بيوقف الرسم لحد ما يخلص. أي شغل تقيل فيه (أو جلب بيانات) الشاشة كلها بتستناه. ومبيشتغلش على السيرفر خالص في SSR. عشان كده القاعدة: [[useEffect]] دايمًا، و [[useLayoutEffect]] بس لما تقيس الـ layout وتعدّل عليه قبل ما المستخدم يشوف. ومكتبات الـ positioning زي Floating UI بتستخدمه لنفس السبب.

---

## الخلاصة

- الاتنين بعد تعديل الـ DOM. [[useLayoutEffect]] قبل الرسم، و [[useEffect]] بعده.
- قياس وتعديل مكان أو حجم = [[useLayoutEffect]]، فمفيش وميض.
- أي حاجة تانية = [[useEffect]].`,
          lines: [
            "tooltip بياخد مكان العنصر اللي بيشاور عليه.",
            "ref عشان نقيس الـ tooltip نفسه.",
            "مبدئيًا تحت العنصر.",
            "قبل ما المتصفح يرسم:",
            "قيس ارتفاع الـ tooltip.",
            "لو هيخرج برا الشاشة، حطه فوق. الـ render ده بيحصل قبل الرسم، فمفيش وميض.",
            "كل ما العنصر يتحرك.",
            "الـ tooltip في مكانه.",
            "قفلة."
          ],
          sol: R`بـ useEffect والـ throttling: فريم أو اتنين الـ tooltip تحت العنصر ومقصوص من الشاشة، وبعدين ينط فوق. بـ useLayoutEffect: بيظهر فوق على طول. الإجابة: «useLayoutEffect بيشتغل بعد تعديل الـ DOM وقبل الـ paint، فالتصحيح بيبان في نفس الفريم».`
        },
        {
          cmd: "قواعد الـ hooks",
          title: "ليه الـ hooks مينفعش تتنادى جوه if أو loop؟",
          desc: R`لأن React مبتعرفش الـ hook بالاسم، بتعرفه بترتيبه. أول [[useState]] في الـ component ليه الخانة الأولى في list محفوظة للـ component ده، والتاني التانية، وهكذا. لو hook اتنادى جوه [[if]] ومرة اتنادى ومرة لأ، الترتيب يتزحلق: التاني ياخد خانة الأول، والـ state تتلخبط أو تتمسح، و React ساعات بترمي «Rendered fewer hooks than expected» وساعات لأ (لو مفيش ولا hook قبل الشرط، الـ state بتتمسح من غير أي error). القاعدتين: hooks في أعلى مستوى من الـ component أو custom hook بس (مش جوه if أو loop أو بعد early return أو في دالة عادية)، ومن components أو custom hooks بس. الاستثناء الوحيد [[use()]] في React 19، ينفع جوه if. والـ linter [[react-hooks/rules-of-hooks]] بيمسك ده.`,
          example: R`function Profile({ userId }: { userId?: string }) {
  if (!userId) return <p>Sign in</p>
  const [tab, setTab] = useState('info')
  return <Tabs value={tab} onChange={setTab} />
}
function ProfileFixed({ userId }: { userId?: string }) {
  const [tab, setTab] = useState('info')
  if (!userId) return <p>Sign in</p>
  return <Tabs value={tab} onChange={setTab} />
}`,
          try: R`ارسم [[Profile]] بـ userId ودوس الـ tab، وبعدين غيّر userId لـ undefined، وبعدين رجّعه (بزرار في الأب): الـ tab فضل زي ما هو؟ بعدين زوّد [[useState]] تاني فوق الـ [[if]] وكرر، واقرا الـ error. بعدين اكتب نفس المثال بـ [[useQuery]] جوه [[ids.map]] واعرف ليه [[useQueries]] موجودة.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إزاي الـ hooks شغالة من جوه، مش حافظ القاعدة وخلاص.",
            how: R`React بتحفظ لكل component (fiber) linked list من الـ hooks. في كل render بتمشي عليها بالترتيب مع كل نداء. عشان كده الاسم مش مهم والترتيب هو كل حاجة. الـ custom hooks مجرد دوال بتنادي hooks، فالنداءات جواها بتتحسب في ترتيب الـ component اللي ناداها. و [[use(promise)]] و [[use(Context)]] مختلفين لأنهم مش بيحفظوا state في الخانات دي. و React Compiler بيعتمد على القواعد دي عشان يعرف يحلل الكود.`,
            when: R`«ليه hooks ليها قواعد؟»، و «إزاي React بتعرف أنهي state لأنهي useState؟»، و «ينفع hook جوه loop لو عدد اللفات ثابت؟» (تقنيًا بيشتغل، بس القاعدة ممنوع والـ linter هيرفض، واستخدم useQueries أو component لكل عنصر)، و «اكتب useDebounce» (درس custom hook).`,
            mistakes: R`«عشان React قالت كده». و hook بعد early return. و [[use]] في أول اسم دالة مفيهاش hooks، أو العكس دالة فيها hooks من غير use فالـ linter ميفحصهاش.`
          },
          teach: R`## الفكرة: React بتعرف الـ hooks بترتيبهم

المثال component-ين بيعملوا نفس الحاجة: لو مفيش [[userId]] اكتب «Sign in»، وإلا اعرض tabs. الأول فيه [[useState]] **بعد** [[return]] بدري، والتاني قبله. جربناهم في Vite + React 19.3 في Chrome headless، بزرار في الأب بيقلب [[userId]] بين [[u1]] و [[undefined]]، والـ lint بـ oxlint 1.87.

---

## ١. React بتحفظ الـ state فين؟

كل component على الشاشة ليه list من الخانات (في الـ fiber بتاعه). أول hook يتنادى ياخد الخانة ١، التاني الخانة ٢، وهكذا. React **مبتعرفش الاسم** ([[tab]] ولا [[theme]])، بتعرف الترتيب بس. فلازم نفس الـ hooks تتنادى بنفس الترتيب في كل render.

---

## ٢. الأول: الغلط

~~~text المثال
function Profile({ userId }: { userId?: string }) {
  if (!userId) return <p>Sign in</p>
  const [tab, setTab] = useState('info')
  return <Tabs value={tab} onChange={setTab} />
}
~~~

- [[userId?: string]]: الـ [[?]] معناها اختياري، ممكن تبقى [[undefined]].
- [[if (!userId) return ...]]: early return. لو مفيش user الدالة بتخلص هنا، و [[useState]] **مبيتناداش**. يعني مرة hook واحد ومرة صفر.

الـ linter مسكها قبل التشغيل:

~~~text الناتج (oxlint)
error react-hooks(rules-of-hooks): React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render. help: Move the Hook call before the condition, or call it unconditionally and branch inside the Hook/effect instead.
~~~

وفي المتصفح: دوسنا الـ tab فبقى [[orders]]، وبعدين قلبنا [[userId]] لـ [[undefined]] ورجعناه:

~~~text الناتج (Chrome)
info  ->  orders  ->  Sign in  ->  info
~~~

مفيش error، بس الـ tab رجع [[info]]: الـ state اتمسحت من غير ما حد يقولك. ليه مفيش error هنا؟ لأن الـ render اللي فيه «Sign in» منادش ولا hook، فـ React اعتبرت إن الـ component ملوش state، ولما رجع عمل الـ [[useState]] كأنه أول مرة.

### ولو فيه hook قبل الـ return؟

زوّدنا [[const [theme] = useState('light')]] في أول الـ component (قبل الـ [[if]]):

~~~text الناتج (Chrome)
من u1 لـ undefined:   Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
من undefined لـ u1:   Rendered more hooks than during the previous render.
~~~

هنا React لاحظت إن عدد الـ hooks اتغير ورمت error (الصفحة وقعت لولا الـ ErrorBoundary). يعني الكسر ساعات بيعمل crash وساعات بيمسح state بهدوء، والاتنين bug.

## ٣. التاني: الصح

~~~text المثال
function ProfileFixed({ userId }: { userId?: string }) {
  const [tab, setTab] = useState('info')
  if (!userId) return <p>Sign in</p>
  return <Tabs value={tab} onChange={setTab} />
}
~~~

الـ [[useState]] فوق قبل أي شرط، فبيتنادى كل render. الشرط بيأثر على اللي بيترسم بس.

~~~text الناتج (Chrome)
info  ->  orders  ->  Sign in  ->  orders
~~~

الـ tab فضل [[orders]] بعد ما الـ user راح ورجع، لأن الخانة ١ فضلت موجودة طول الوقت.

---

## ٤. القاعدتين

| القاعدة | يعني |
|---|---|
| الـ hooks في أعلى مستوى بس | مش جوه [[if]] أو loop أو بعد [[return]] أو جوه دالة عادية جوه الـ component |
| من components أو custom hooks بس | مش من دالة JavaScript عادية. والـ custom hook اسمه بيبدأ بـ [[use]] عشان الـ linter يفحصه |

والاستثناء الوحيد [[use()]] في React 19 (لـ promise أو Context)، ينفع جوه [[if]] لأنه مش بيحجز خانة state. وعدد متغير من الـ queries؟ [[ids.map(id => useQuery(...))]] بيكسر نفس القاعدة لما عدد الـ ids يتغير، و [[useQueries]] hook واحد بياخد array، فعدد الـ hooks ثابت.

---

## الخلاصة

- React بتربط كل hook بخانة حسب ترتيب النداء، مش الاسم.
- hook بعد early return = الترتيب بيتغير: يا إما error «Rendered fewer/more hooks»، يا إما الـ state بتتمسح من غير صوت.
- كل الـ hooks فوق، والشروط بعدها.
- [[react-hooks/rules-of-hooks]] بيمسكها قبل ما تشغّل.`,
          lines: [
            "component فيه early return.",
            "لو مفيش user، ارجع بدري...",
            "...فالـ useState ده ساعات بيتنادى وساعات لأ: الترتيب بيتكسر.",
            "بيرسم.",
            "قفلة.",
            "الصح:",
            "كل الـ hooks فوق، قبل أي return.",
            "وبعدين الشرط.",
            "بيرسم.",
            "قفلة."
          ],
          sol: R`في المثال زي ما هو: غيّر الـ tab لـ orders، وخلّي userId undefined (يظهر «Sign in»)، ورجّعه: مفيش error، بس الـ tab رجع info. الـ render اللي فيه «Sign in» منادش ولا hook، فـ React اعتبرت الـ component ملوش state وعملت الـ useState من الأول. ولو فيه hook تاني قبل الـ if (زي [[const [theme] = useState('light')]])، React بترمي «Rendered fewer hooks than expected. This may be caused by an accidental early return statement.» وهو بيختفي، و «Rendered more hooks than during the previous render.» وهو بيرجع (متجرّب في Chrome بـ React 19.3). و ProfileFixed بيحتفظ بـ orders. و [[ids.map(id => useQuery(...))]] بيكسر نفس القاعدة لما عدد الـ ids يتغير، و [[useQueries]] hook واحد بياخد array، فالعدد بتاع الـ hooks ثابت مهما كان عدد الـ queries.`
        }
      ]
    }
]);
