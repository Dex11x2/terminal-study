// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
    {
      t: "الـ state والـ events",
      l: 1,
      n: "الـ state ذاكرة الـ component، وتغييرها هو اللي بيعيد الرسم",
      items: [
        {
          cmd: "useState",
          title: "خلي الـ component يفتكر قيمة ويعيد الرسم لما تتغير",
          desc: R`[[useState]] بيدّيك قيمة ودالة تغيّرها. لما تنادي الدالة، React بتحفظ القيمة الجديدة وتعيد رسم الـ component بيها.

متغير عادي ([[let count = 0]]) مش هينفع: بيرجع صفر مع كل render، وتغييره مش بيقول لـ React ترسم. والقيمة جوه الـ render الواحد ثابتة (snapshot)، فلو هتحسب من القيمة القديمة استخدم الـ updater: [[setCount(c => c + 1)]].`,
          example: R`import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  function addFour() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
  }
  console.log('render', count)
  return <button onClick={addFour}>{count}</button>
}
// أول ضغطة: 3 مش 4، والـ console بيطبع render مرة واحدة بس (في Strict Mode وقت التطوير هتشوفه مرتين بنفس الرقم: ده نفس الـ render بيتنادى مرتين، مش أربعة)`,
          try: R`خمّن الرقم قبل ما تضغط. بعدين حط [[alert(count)]] بعد الـ setCount وشوف إنه بيطبع القيمة القديمة.`,
          flag: "script",
          deep: {
            why: "الـ component دالة بتتنادي من الأول مع كل render، فأي متغير جواها بيتولد من جديد. محتاج مكان برا الدالة يفضل فيه الرقم بين الـ renders، وطريقة تقول بيها لـ React «حاجة اتغيرت، ارسم تاني». [[useState]] بيدّيك الاتنين.",
            how: R`الـ state مش محفوظة جوه الدالة. React بتحفظها في الـ component instance بتاعها (fiber)، في list بالترتيب. أول [[useState]] في الدالة ليه الخانة الأولى، والتاني التانية، وهكذا. عشان كده الـ hooks لازم تتنادى بنفس الترتيب كل مرة.

[[setCount(x)]] مش بتغيّر [[count]] حالًا. بتحط التحديث في طابور وتطلب render. وكل الـ setState اللي حصلت في نفس الـ event بتتجمع في render واحد (batching). عشان كده الـ console طبع render واحد بس (أو نفس السطر مرتين في Strict Mode وقت التطوير، مش أربعة).

في المثال: [[count]] جوه الدالة دي صفر طول الوقت. أول سطرين بيقولوا «خليها 0 + 1» مرتين، يعني 1. والـ updater [[c => c + 1]] بياخد آخر قيمة في الطابور، فبتبقى 2 وبعدين 3.

ولو القيمة الجديدة زي القديمة بالظبط ([[Object.is]])، React ممكن تتخطى الـ render. والقيمة الأولى لو حسابها تقيل ابعتها دالة: [[useState(() => loadInitial())]] عشان تتحسب مرة واحدة مش مع كل render.`,
            when: "أي قيمة بتتغير مع الوقت وبتأثر على اللي ظاهر، والـ component ده صاحبها: نص input، أو modal مفتوح ولا لأ، أو التاب المختار.",
            mistakes: R`تستنى [[count]] يتغير على السطر اللي بعد [[setCount]]. وتعدّل object أو array في مكانه ([[items.push]]) بدل ما تعمل نسخة جديدة (الدرس الجاي). وتكتب [[useState(expensive())]] فالحساب يحصل كل render ويترمي. وتخزّن في state حاجة تقدر تحسبها من state تانية (درس derived state).`
          },
          teach: R`## الفكرة: ٤ مرات «زوّد واحد»، والنتيجة ٣

المثال زرار، وكل ضغطة بتنادي [[setCount]] ٤ مرات. لو فاكر إن الرقم هيزيد ٤، الدرس ده هيوريك ليه لأ. اتشغّل في Vite 8.3 + React 19.2 في وضع التطوير (جوه [[<StrictMode>]] زي القالب) في Chrome headless.

---

## ١. [[import { useState } from 'react']]

[[useState]] دالة من React. والأقواس [[{ }]] في الـ import معناها «هات الحاجة اللي اسمها كده بالظبط» (named import)، عكس [[export default]] اللي بيتستورد من غير أقواس.

والدوال اللي بتبدأ بـ [[use]] اسمها **hooks**: دوال React بتديك قدرات جوه الـ component، وليها قاعدة: تتنادى في أول الـ component، مش جوه [[if]] ولا loop (ليه؟ تحت في رقم ٥).

---

## ٢. [[const [count, setCount] = useState(0)]]

| الحتة | معناها |
|---|---|
| [[useState(0)]] | «اعمل خانة ذاكرة، وأول قيمة فيها 0» |
| بيرجّع | array فيها عنصرين: القيمة الحالية، ودالة تغيّرها |
| [[[count, setCount]]] | array destructuring: الأول في [[count]] والتاني في [[setCount]]. الأسماء انت بتختارها، والعادة [[x]] و [[setX]] |
| [[const]] | المتغير مش هيتغير **في الـ render ده**. القيمة الجديدة بتيجي في render جديد |

---

## ٣. [[addFour]] سطر سطر

~~~text Counter.tsx
function addFour() {
  setCount(count + 1)
  setCount(count + 1)
  setCount(c => c + 1)
  setCount(c => c + 1)
}
~~~

أهم معلومة: [[setCount]] **مبتغيّرش** [[count]]. بتحط طلب في طابور، و React بتنفّذ الطابور بعد ما الـ handler يخلص. و [[count]] في الضغطة الأولى قيمته [[0]] طول ما الدالة شغالة.

فيه نوعين من الطلبات:

- **قيمة**: [[setCount(count + 1)]] هي [[setCount(1)]]، يعني «خليها 1»، مهما كان اللي قبلها.
- **دالة** (updater): [[setCount(c => c + 1)]] يعني «خد آخر قيمة في الطابور وزوّد عليها». و [[c => c + 1]] arrow function بتاخد [[c]] وترجّع [[c + 1]].

React بتمشي على الطابور بالترتيب:

| الطلب | قبله | بعده |
|---|---|---|
| [[setCount(0 + 1)]] | 0 | 1 |
| [[setCount(0 + 1)]] | 1 | 1 (تاني «خليها 1») |
| [[setCount(c => c + 1)]] | 1 | 2 |
| [[setCount(c => c + 1)]] | 2 | 3 |

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome، وضع التطوير)
initial         <button>0</button>
after click 1   <button>3</button>
after click 2   <button>6</button>
~~~

~~~text الـ Console
render 0
render 0
>> click 1
render 3
render 3
>> click 2
render 6
render 6
~~~

([[>> click]] علامة احنا حطيناها في الـ log عشان تعرف فين الضغطة.)

- **الرقم**: 3 مش 4، زي الجدول. والضغطة التانية بدأت من 3 فوصلت 6.
- **عدد الـ renders**: الـ ٤ طلبات عملوا render **واحد** بقيمة 3، مش ٤ renders. ده اسمه **batching**: React بتجمّع كل الـ setState اللي في نفس الـ event.
- **السطر المتكرر**: [[render 3]] ظهر مرتين لأن [[<StrictMode>]] في التطوير بينادي الـ component مرتين بنفس القيمة عشان يكشف الـ components اللي مش pure. ده render واحد اتنادى مرتين، مش اتنين. وفي الـ build العادي بيظهر مرة.

### تجربة [[alert(count)]]

حطينا [[alert(count)]] بعد آخر [[setCount]]:

~~~text الناتج
>> click 1   alert: 0
>> click 2   alert: 3
~~~

في الضغطة الأولى، بعد ٤ مرات set، [[count]] لسه 0. ده معنى «الـ state snapshot»: كل render ليه نسخته الثابتة من القيم.

---

## ٥. الـ state محفوظة فين؟

[[Counter]] دالة بتتنادى من الأول في كل render، فأي [[let]] جواها بيرجع لقيمته الأولى. [[useState]] مش بيحفظ جوه الدالة، React بتحفظ القيمة برا، في لستة خاصة بالـ component ده، بالترتيب: أول [[useState]] ليه الخانة الأولى، والتاني التانية. عشان كده لازم الـ hooks تتنادى بنفس الترتيب في كل render: لو واحد جوه [[if]] واتخطّى مرة، الخانات هتتلخبط.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[useState(0)]] | خانة ذاكرة، أولها 0 |
| [[setCount(x)]] | طلب: «خليها x» في الـ render الجاي |
| [[setCount(c => c + 1)]] | طلب: «زوّد على آخر قيمة»، استخدمه لما الجديد معتمد على القديم |
| batching | كل الـ set في نفس الـ event = render واحد |
| [[count]] بعد [[setCount]] | لسه القديمة لحد الـ render الجاي |
| log مرتين في التطوير | [[StrictMode]]، مش bug |`,
          lines: [
            "hook بيدّي الـ component ذاكرة.",
            "component عادي.",
            "قيمة وأداة تغييرها، والقيمة الأولى 0.",
            "دالة الضغطة.",
            "count هنا 0، فده «خليها 1».",
            "برضه «خليها 1»، لأن count لسه 0 في الـ render ده.",
            "updater: خد آخر قيمة في الطابور (1) وزوّد، فتبقى 2.",
            "وتاني من 2 لـ 3.",
            "قفلة الدالة.",
            "بيطبع مرة في كل render، فتشوف إن الأربع setState عملوا render واحد.",
            "اعرض الرقم، والضغطة تنادي addFour.",
            "قفلة الـ component."
          ],
          sol: R`التخمين الصح [[3]]، وأول ضغطة الزرار بيبقى 3 والـ console بيطبع [[render 3]] مرة واحدة (أو مرتين بنفس الرقم في Strict Mode). أول سطرين الاتنين بيقولوا «خليها [[0 + 1]]» لأن [[count]] في الـ render ده صفر، فالنتيجة 1. وبعدين الـ updater functions بتاخد آخر قيمة في الطابور: 2 ثم 3. والضغطة التانية توصّل لـ 6.

الـ [[alert(count)]] بيطلع [[0]] في أول ضغطة (والقيمة القديمة في أي ضغطة بعدها)، لأن setCount مبتغيرش المتغير اللي في إيدك، هي بتطلب render جديد فيه count جديد. اللي بيخمّن 4 فاكر إن [[setCount(count + 1)]] بيقرا آخر قيمة، واللي متوقع 4 renders فاكر إن كل set بيرسم لوحده، والحقيقة إن React بتجمعهم (batching) في render واحد.`
        },
        {
          cmd: "events",
          title: "اتعامل مع الضغط والكتابة وإرسال الفورم",
          desc: R`الـ events في React بتتكتب camelCase وبتاخد دالة: [[onClick={handleClick}]]. ابعت الدالة نفسها ومتنادهاش: [[onClick={handleClick()}]] بتتنفذ وقت الرسم مش وقت الضغط.

الـ handler بياخد event object، منه [[e.target.value]] في الـ input، و [[e.preventDefault()]] في الفورم عشان الصفحة متعملش reload. ولو محتاج تبعت argument، لفّها في arrow: [[onClick={() => remove(id)}]].`,
          example: R`import { useState, type FormEvent } from 'react'

function SearchBox({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSearch(q.trim())
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button type="submit">Search</button>
      <button type="button" onClick={() => setQ('')}>Clear</button>
    </form>
  )
}`,
          try: R`امسح [[type="button"]] من زرار Clear واضغطه: هتلاقيه عمل submit للفورم. وبعدين امسح [[e.preventDefault()]] وشوف الصفحة بتعمل reload.`,
          flag: "script",
          deep: {
            why: "الواجهة لازم ترد على المستخدم: ضغطة، أو كتابة، أو إرسال. React بتدّيك طريقة واحدة تكتب بيها الـ events على كل العناصر، بنفس الشكل في كل المتصفحات.",
            how: R`React مش بتحط listener على كل زرار. بتحط listener واحد لكل نوع event على الـ root، ولما event يحصل بتدوّر مين الـ component اللي ليه handler وتناديه (event delegation). والـ [[e]] اللي بيوصلك SyntheticEvent: غلاف حوالين الـ event الأصلي بنفس الـ API ([[preventDefault]] و [[stopPropagation]] و [[target]])، والأصلي موجود في [[e.nativeEvent]].

[[onChange]] في React بيشتغل مع كل حرف، زي event الـ [[input]] في المتصفح، مش زي [[change]] الأصلي اللي بيستنى لما تسيب الخانة.

الزرار جوه form نوعه الافتراضي [[submit]]، فأي زرار مش للإرسال لازم [[type="button"]]. و [[onSubmit]] بيتنادي بالـ Enter كمان، مش بالزرار بس، عشان كده الأحسن تحط منطق الإرسال في onSubmit مش في onClick بتاع الزرار.

والـ handler بيقرا الـ props والـ state من الـ render اللي اتعمل فيه (closure)، فبيشوف القيم اللي كانت ظاهرة وقت ما المستخدم ضغط.`,
            when: "أي تفاعل. والعادة في التسمية: [[handleX]] للدالة جوه الـ component، و [[onX]] للـ prop اللي بيستلمها ([[onSearch]] و [[onClose]]).",
            mistakes: R`[[onClick={setOpen(true)}]] بتتنادى وقت الرسم، فتعمل setState، فـ render، فتتنادى تاني: «Too many re-renders». الصح [[onClick={() => setOpen(true)}]]. وزرار جوه فورم من غير [[type="button"]] بيبعت الفورم. و [[div]] بـ onClick بدل [[button]]: مبيشتغلش بالكيبورد ولا بيوصل لقارئ الشاشة (تفاصيل الـ accessibility في تاب «HTML و CSS»، درس aria).`
          },
          teach: R`## الفكرة: خانة بحث فيها ٣ events

[[SearchBox]] فورم فيه خانة وزرارين. فيه ٣ events: الكتابة ([[onChange]])، والإرسال ([[onSubmit]])، والتفضية ([[onClick]]). عشان نشوفه شغال، الأب بعتله [[onSearch={q => console.log('onSearch:', JSON.stringify(q))}]] ([[JSON.stringify]] عشان المسافات والنص الفاضي يبانوا). اتشغّل في Vite 8.3 + React 19.2 في Chrome headless، والكتابة والضغط اتعملوا بـ Playwright (أداة بتتحكم في المتصفح من كود).

---

## ١. الـ import

~~~text SearchBox.tsx
import { useState, type FormEvent } from 'react'
~~~

[[useState]] دالة، و [[FormEvent]] نوع TypeScript بس (لاحظ [[type]] قدامه)، بيوصف الـ event اللي بيوصل لـ handler الفورم.

## ٢. الـ props والـ state

~~~text SearchBox.tsx
function SearchBox({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
~~~

- [[onSearch]]: دالة الأب. نوعها [[(q: string) => void]]: بتاخد نص ومبترجّعش حاجة. اسمها بيبدأ بـ [[on]] لأنها بتتنادى لما حاجة **تحصل**.
- [[q]]: النص اللي في الخانة، وبيبدأ فاضي [['']].

---

## ٣. [[handleSubmit]]

~~~text SearchBox.tsx
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  onSearch(q.trim())
}
~~~

- [[e]]: الـ event object، React بتبعته لأي handler لوحدها. و [[FormEvent<HTMLFormElement>]] معناها «event جاي من عنصر form». و [[< >]] هنا generic: نوع جوه نوع.
- [[e.preventDefault()]]: «امنع اللي المتصفح بيعمله عادةً». واللي بيعمله مع أي فورم: يبعته لسيرفر ويعمل reload للصفحة.
- [[q.trim()]]: [[trim]] بتشيل المسافات من أول النص وآخره.
- [[onSearch(...)]]: بلّغ الأب.

اسم [[handleSubmit]] بيبدأ بـ [[handle]]: العادة إن الدالة اللي جوه الـ component اسمها [[handleX]]، والـ prop اللي جاية من الأب [[onX]].

---

## ٤. الـ JSX

~~~text SearchBox.tsx
<form onSubmit={handleSubmit}>
  <input value={q} onChange={e => setQ(e.target.value)} />
  <button type="submit">Search</button>
  <button type="button" onClick={() => setQ('')}>Clear</button>
</form>
~~~

| السطر | الـ event | بيحصل إمتى |
|---|---|---|
| [[onSubmit={handleSubmit}]] | إرسال الفورم | ضغطة Search، **أو** Enter جوه الخانة |
| [[onChange={e => setQ(e.target.value)}]] | تغيير الخانة | مع كل حرف. [[e.target]] العنصر نفسه، و [[.value]] النص اللي فيه |
| [[onClick={() => setQ('')}]] | ضغطة | فضّي الخانة |

لاحظ إن الـ events بتتكتب camelCase ([[onSubmit]] مش [[onsubmit]])، وبتاخد **دالة**. [[onSubmit={handleSubmit}]] بتبعت الدالة نفسها من غير أقواس. لو كتبت [[handleSubmit()]] هتتنادى وقت الرسم.

و [[onClick={() => setQ('')}]]: هنا محتاجين نبعت argument ([['']])، فلفّيناها في arrow function. الـ arrow نفسها هي اللي بتتبعت، و [[setQ('')]] جواها بتتنادى وقت الضغط بس.

---

## ٥. اللي حصل

كتبنا [[  react  ]] (بمسافات) ودوسنا Enter، وبعدين ضغطنا Search، وبعدين Clear:

~~~text الـ Console
>> typed
onSearch: "react"
>> click Search
onSearch: "react"
>> click Clear
~~~

- Enter و Search الاتنين نادوا [[onSubmit]]، والمسافات اتشالت.
- Clear فضّى الخانة ومنادهاش، لأنه [[type="button"]].
- الـ URL فضل [[?l=L09]] زي ما هو: مفيش reload.

---

## ٦. التجارب اللي في «جرّب»

### من غير [[type="button"]] على Clear

~~~text الـ Console
>> click Clear
onSearch: ""
~~~

أي [[<button>]] جوه [[<form>]] نوعه الافتراضي [[submit]]. فالضغطة فضّت الخانة **وكمان** بعتت الفورم، و [[onSearch]] اتنادت بنص فاضي. (فاضي مش [[react]]، لأن React خلّصت تفضية الخانة ورسمت قبل ما event الـ submit ييجي.)

### من غير [[e.preventDefault()]]

كتبنا [[react]] ودوسنا Enter:

~~~text الناتج
onSearch: "react"
navigated: http://localhost:5791/?
~~~

[[onSearch]] اتنادت، وبعدها على طول المتصفح بعت الفورم بـ GET لنفس الصفحة: الـ URL بقى ينتهي بـ [[?]] (الخانة ملهاش [[name]] فمفيش حاجة بعد العلامة)، والصفحة عملت reload، فكل الـ state راحت والـ Console اتمسح. (في التجربة دي حتى الـ [[?l=L09c]] بتاعنا ضاع.)

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[onClick={fn}]] | ابعت الدالة، متنادهاش |
| [[onClick={() => fn(x)}]] | لو محتاج argument |
| [[e.target.value]] | النص اللي في الخانة |
| [[e.preventDefault()]] | امنع الـ reload في الفورم |
| [[onSubmit]] | بيشتغل بالزرار وبالـ Enter |
| [[type="button"]] | أي زرار جوه فورم مش للإرسال |`,
          lines: [
            "useState، و FormEvent كـ type بس.",
            "component بياخد دالة من الأب تستلم كلمة البحث.",
            "النص اللي في الخانة.",
            "handler الإرسال، ونوع الـ event محدد.",
            "امنع المتصفح من إنه يبعت الفورم ويعمل reload.",
            "ابعت الكلمة للأب من غير مسافات في الأطراف.",
            "قفلة الدالة.",
            "بداية الـ JSX.",
            "onSubmit بيشتغل بالزرار وبالـ Enter.",
            "كل حرف يروح للـ state (controlled input).",
            "زرار الإرسال.",
            "[[type=\"button\"]] عشان ميبعتش الفورم، والضغطة تفضّي الخانة.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`من غير [[type="button"]]، أي زرار جوه form نوعه الافتراضي [[submit]]، فدوسة Clear بتمسح الخانة وكمان بتعمل submit وتنادي onSearch. عشان كده أي زرار جوه فورم مش المقصود بيه الإرسال لازم تكتبله [[type="button"]].

ومن غير [[e.preventDefault()]] المتصفح بيعمل اللي بيعمله مع أي فورم: يبعت GET لنفس الصفحة (هتلاقي [[?]] في آخر الـ URL) ويعمل reload، فكل الـ state بتضيع والـ console بيتمسح. لو لاحظت إن الـ log بتاعك «بيظهر ويختفي»، ده غالبًا السبب.`
        },
        {
          cmd: "immutable updates",
          title: "عدّل object أو array في الـ state من غير ما تبوّظها",
          desc: R`React بتعرف إن الـ state اتغيرت لما المرجع (reference) يتغير. لو عدّلت نفس الـ array بـ [[push]] أو نفس الـ object بـ [[user.name = 'x']]، المرجع هو هو، فالشاشة ممكن متتحدثش.

القاعدة: اعمل نسخة جديدة. spread [[...]] للـ objects، و [[map]] للتعديل، و [[filter]] للمسح، و array جديدة فيها القديم والجديد للإضافة. ولو الـ state متداخلة أوي، بسّط شكلها أو استخدم immer.`,
          example: R`// جوه component
type Todo = { id: number; text: string; done: boolean }
const [todos, setTodos] = useState<Todo[]>([])
const add = (text: string) =>
  setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
const remove = (id: number) =>
  setTodos(prev => prev.filter(t => t.id !== id))
const [user, setUser] = useState({ name: 'Sara', address: { city: 'Cairo' } })
const moveTo = (city: string) =>
  setUser(prev => ({ ...prev, address: { ...prev.address, city } }))`,
          try: R`اكتب [[toggle]] غلط: [[prev.find(t => t.id === id)!.done = true; return prev]]، وشوف الـ checkbox مش بيتحدث. رجّعها بـ map وقارن.`,
          flag: "script",
          deep: {
            why: "React مش بتفتش جوه الـ objects تشوف إيه اتغير، ده هيبقى بطيء جدًا. بتقارن المرجع بس: قديم ولا جديد. فلو غيّرت جوه نفس الـ object، بالنسبة لها مفيش حاجة حصلت.",
            how: R`[[setTodos(x)]] بتقارن x بالقيمة الحالية بـ [[Object.is]]. نفس المرجع يبقى ممكن تتخطى الـ render. ونفس المقارنة بتستخدمها dependencies الـ effects و [[useMemo]] و [[memo]]، فالتعديل في المكان بيبوّظهم كلهم.

الـ spread بينسخ مستوى واحد بس (shallow copy). في [[user]]، [[{ ...prev }]] بيعمل object جديد بس [[address]] جواه لسه نفس الـ object القديم. عشان كده لما تغيّر city لازم تنسخ address كمان. القاعدة: انسخ كل مستوى في الطريق للحاجة اللي بتغيّرها، وسيب الباقي مشترك.

خد بالك من الدوال اللي بتعدّل في المكان: [[push]] و [[splice]] و [[sort]] و [[reverse]]. بدائلها اللي بترجع نسخة: spread، و [[filter]]، و [[toSorted]] و [[toReversed]] (ES2023)، أو [[slice().sort()]].

ولما الـ state تبقى متداخلة جامد، immer بيخليك تكتب كأنك بتعدّل ([[draft.address.city = city]]) وهو بيطلّع نسخة جديدة صح، و Zustand بيدعمه كـ middleware.`,
            when: "أي state فيها object أو array. والـ updater [[prev => ...]] أأمن لأنه بيشتغل على آخر قيمة حتى لو فيه تحديثات تانية في الطابور.",
            mistakes: R`[[todos.push(x); setTodos(todos)]]: نفس المرجع، فمفيش render. و [[setTodos(todos.sort())]]: [[sort]] عدّلت الـ state الأصلية قبل ما React تشوفها. و [[structuredClone]] للـ state كلها مع كل تعديل: شغال بس بيعمل نسخ ملهوش لازمة ويبوّظ memo لأن كل حاجة بقت جديدة.`
          },
          teach: R`## الفكرة: ٤ عمليات، وكلها بترجّع نسخة جديدة

المثال حتة من component (مش ملف كامل) فيها list مهام ([[todos]]) وبيانات مستخدم ([[user]])، و ٤ دوال: إضافة، وتعديل، ومسح، وتغيير حاجة جوه object جوه object. ولا دالة فيهم بتعدّل القديم: كلهم بيعملوا نسخة. عشان نجرّب، حطيناهم في component فيه زراير و checkboxes، واتشغّل في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. النوع والـ state

~~~text Todos.tsx
type Todo = { id: number; text: string; done: boolean }
const [todos, setTodos] = useState<Todo[]>([])
~~~

[[useState<Todo[]>([])]]: [[< >]] بتقول لـ TypeScript نوع الـ state: [[Todo[]]] يعني array من [[Todo]]. لازمة هنا لأن [[[]]] الفاضية لوحدها مش بتقول هتشيل إيه.

---

## ٢. الإضافة: spread

~~~text Todos.tsx
const add = (text: string) =>
  setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
~~~

- [[prev => ...]]: الـ updater (من درس useState): [[prev]] هي آخر قيمة للـ state.
- [[[...prev, x]]]: array **جديدة**. [[...]] (spread) بيفرد عناصر [[prev]] جواها، وبعدهم العنصر الجديد.
- [[{ id: Date.now(), text, done: false }]]: [[Date.now()]] الوقت بالميلي ثانية، رقم مختلف كل مرة فينفع id في مثال. و [[text]] لوحدها اختصار لـ [[text: text]].

ليه مش [[prev.push(x)]]؟ [[push]] بتعدّل نفس الـ array وترجّع طولها، فالمرجع (reference) هو هو، و React مش هتشوف تغيير.

## ٣. التعديل: [[map]]

~~~text Todos.tsx
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
~~~

[[map]] بتعدّي على كل عنصر وترجّع **array جديدة** باللي الدالة رجّعته:

- لو ده العنصر المقصود ([[t.id === id]]): object جديد [[{ ...t, done: !t.done }]]، يعني انسخ كل خانات [[t]]، وبعدين اكتب [[done]] فوقها بالعكس ([[!]] بتقلب true و false).
- غير كده: رجّع [[t]] نفسه. العناصر اللي متغيرتش بتفضل نفس الـ objects.

## ٤. المسح: [[filter]]

~~~text Todos.tsx
const remove = (id: number) =>
  setTodos(prev => prev.filter(t => t.id !== id))
~~~

[[filter]] بترجّع array جديدة فيها العناصر اللي الشرط بتاعها [[true]] بس. و [[!==]] «مش بيساوي»، فكله بيفضل ما عدا اللي [[id]] بتاعه ده.

## ٥. object جوه object

~~~text Todos.tsx
const [user, setUser] = useState({ name: 'Sara', address: { city: 'Cairo' } })
const moveTo = (city: string) =>
  setUser(prev => ({ ...prev, address: { ...prev.address, city } }))
~~~

من جوه لبرة:

1. [[{ ...prev.address, city }]]: نسخة من [[address]] و [[city]] الجديدة فوقها.
2. [[{ ...prev, address: ... }]]: نسخة من [[user]]، و [[address]] الجديدة فوق القديمة.
3. [[({ ... })]]: القوسين حوالين الـ object لازمين في arrow function، وإلا JavaScript هيفتكر [[{]] بداية جسم دالة.

ليه نسخنا [[address]] كمان؟ لأن الـ spread بينسخ **مستوى واحد**. جرّبناها في Node:

~~~text الناتج (Node)
> const shallow = { ...prev }
> shallow === prev, shallow.address === prev.address
false true
> const next = { ...prev, address: { ...prev.address, city: 'Alex' } }
> next.address === prev.address, prev.address.city, next.address.city
false Cairo Alex
~~~

[[shallow]] object جديد، بس [[address]] جواه **نفس** الـ object القديم. لو عدّلت فيه هتعدّل في القديم. بالنسخ في المستويين، القديم فضل [[Cairo]] والجديد [[Alex]].

---

## ٦. اللي حصل في المتصفح

بعد كل خطوة طبعنا حالة الـ checkboxes ونص المستخدم:

~~~text الناتج (النسخة الصح)
after add x2         [false,false] Sara - Cairo
toggle first         [true,false]  Sara - Cairo
other state change   [true,false]  Sara - Cairo
moveTo Alex          [true,false]  Sara - Alex
remove last          [true]        Sara - Alex
~~~

([[other state change]] زرار بيغيّر state تانية خالص، ملهاش علاقة بالـ todos.)

### تجربة «جرّب»: [[toggleBad]]

~~~text Todos.tsx
setTodos(prev => { prev.find(t => t.id === id)!.done = true; return prev })
~~~

[[find]] بترجّع أول عنصر الشرط بتاعه صح، و [[!]] بعدها لـ TypeScript: «متأكد إنه مش [[undefined]]». وبعدين عدّلنا [[done]] في **نفس** الـ object ورجّعنا **نفس** الـ array:

~~~text الناتج (toggleBad)
after add x2         [false,false]
toggle first         [false,false]   ← الضغطة ملهاش أثر
other state change   [true,false]    ← اتعلّم فجأة!
~~~

React قارنت [[prev]] باللي رجع بـ [[Object.is]]: نفس المرجع، فمعملتش render. بس البيانات اتغيرت فعلًا، فأول ما state تانية عملت render، الـ checkbox اتعلّم في لحظة ملهاش علاقة بالضغطة.

---

## الدوال اللي بتعدّل في المكان وبدايلها

| بتعدّل القديم (متستخدمهاش على state) | بترجّع نسخة |
|---|---|
| [[push]] | [[[...prev, x]]] |
| [[splice]] | [[filter]] أو [[slice]] |
| [[sort]] | [[toSorted]] (ES2023) |
| [[reverse]] | [[toReversed]] |
| [[obj.x = 1]] | [[{ ...obj, x: 1 }]] |

جرّبنا [[[3, 1, 2].toSorted()]] في Node 24: رجّعت [[[1, 2, 3]]] والأصلية فضلت [[[3, 1, 2]]].

---

## الخلاصة

React مش بتفتش جوه الـ object، بتسأل سؤال واحد: «ده نفس المرجع ولا جديد؟». فأي تغيير لازم يطلّع object أو array جديدة، في كل مستوى في الطريق للحاجة اللي اتغيرت، والباقي يفضل زي ما هو.`,
          lines: [
            "شكل العنصر.",
            "array فاضية ونوعها محدد.",
            "إضافة:",
            "array جديدة فيها القديم وبعدهم العنصر الجديد.",
            "تعديل عنصر:",
            "map بترجع array جديدة، والعنصر المقصود بس بيتعمله نسخة بـ done مقلوبة.",
            "مسح:",
            "filter بترجع array جديدة من غير العنصر ده.",
            "state فيها object جواه object.",
            "تغيير المدينة:",
            "انسخ user، وانسخ address جواه، وغيّر city بس."
          ],
          sol: R`بالنسخة الغلط الـ checkbox مش بيتعلّم. انت عدّلت الـ object القديم ورجّعت نفس الـ array، فـ React قارنت بـ [[Object.is]] ولقت نفس المرجع، فمعملتش render خالص. والأسوأ إن البيانات نفسها اتغيرت فعلًا، فأول ما أي state تانية تعمل render الـ checkbox يتعلّم فجأة، وده bug صعب تتبعه.

بالـ map كل ضغطة بترجع array جديدة فيها object جديد للعنصر اللي اتغير بس، فالـ render بيحصل والباقي زي ما هو بنفس المرجع (وده اللي بيخلي [[memo]] يشتغل صح بعدين).`,
          solCode: R`// غلط: نفس المرجع، React مش هتعيد الرسم
const toggleBad = (id: number) =>
  setTodos(prev => { prev.find(t => t.id === id)!.done = true; return prev })
// صح: array جديدة و object جديد للعنصر اللي اتغير بس
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))`
        },
        {
          cmd: "conditional rendering",
          title: "اعرض حاجة أو خبّيها حسب الحالة",
          desc: R`مفيش [[if]] جوه JSX، فبتستخدم تلات أشكال: early return قبل الـ JSX لحالات زي loading و error، و ternary [[? :]] لما يبقى فيه اختيارين، و [[&&]] لما يبقى حاجة أو لا شيء.

واحذر من [[&&]] مع الأرقام: [[{count && <Badge />}]] لو count صفر هتطبع 0 على الشاشة. خليها [[{count > 0 && <Badge />}]].`,
          example: R`type Order = { id: string; total: number }
function Orders({ orders, isLoading, error }: { orders: Order[]; isLoading: boolean; error?: string }) {
  if (isLoading) return <p>Loading...</p>
  if (error) return <p role="alert">{error}</p>
  return (
    <section>
      {orders.length === 0 ? <p>No orders yet</p> : <OrderTable rows={orders} />}
      {orders.length > 0 && <p>{orders.length} orders</p>}
    </section>
  )
}`,
          try: R`غيّر السطر الأخير لـ [[{orders.length && <p>...</p>}]] وابعت array فاضية: هتلاقي 0 ظاهر على الشاشة.`,
          flag: "script",
          deep: {
            why: "نفس الـ component بيعرض حاجات مختلفة حسب الحالة: بيحمّل، أو فيه خطأ، أو فاضي، أو فيه بيانات. لو نسيت حالة منهم، المستخدم يشوف صفحة فاضية أو تقع.",
            how: R`جوه [[{ }]] بتحط expression. [[false]] و [[null]] و [[undefined]] و [[true]] مبيترسموش، بس الأرقام بتترسم حتى الصفر، والنص الفاضي مش بيبان.

[[a && b]] في JavaScript بترجع a لو كانت falsy. فـ [[0 && <Badge />]] بترجع 0، و React بترسمه. عشان كده خلي الشرط boolean صريح.

الـ early return ([[if (isLoading) return ...]]) بيخلي الـ JSX الرئيسي نضيف. بس لازم يكون بعد كل الـ hooks: لو فيه [[useState]] بعد الـ return، هيتنادى أحيانًا ومش هيتنادى أحيانًا، و React هتقع بـ «Rendered fewer hooks than expected».

والفرق بين تخبية وشيل: الشرط في JSX بيشيل الـ component من الشجرة، فالـ state اللي جواه بتروح. لو عايزه يفضل فاكر (زي تاب فيه فورم متكتب نصه)، خبّيه بـ CSS ([[hidden]])، أو استخدم [[<Activity mode="hidden">]] اللي نزل في React 19.2 وبيخبّي ويحافظ على الـ state.`,
            when: "Loading و error و empty states في كل صفحة بتجيب بيانات، وأجزاء بتظهر حسب صلاحيات المستخدم.",
            mistakes: R`الـ [[0 &&]]. و hooks بعد early return. و ternary جوه ternary جوه ternary: اطلع بيها لمتغير قبل الـ return أو component صغير. وتنسى الـ empty state، فالمستخدم يشوف جدول فاضي ومش عارف هل لسه بيحمّل ولا مفيش بيانات.`
          },
          teach: R`## الفكرة: ٤ حالات، و ٣ أدوات

[[Orders]] بيعرض طلبات، والطلبات ليها ٤ حالات: بتحمّل، أو فيه خطأ، أو مفيش طلبات، أو فيه. المثال بيستخدم early return لأول اتنين، و ternary و [[&&]] للباقي. [[OrderTable]] مش متعرّف في المثال، فعملنا واحد بسيط بيرسم جدول. وعرضنا [[Orders]] بالـ ٤ حالات جنب بعض في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. الـ props

~~~text Orders.tsx
function Orders({ orders, isLoading, error }: { orders: Order[]; isLoading: boolean; error?: string }) {
~~~

[[orders]] لستة الطلبات، و [[isLoading]] بتحمّل ولا لأ، و [[error?]] رسالة خطأ اختيارية (لو مفيش خطأ بتبقى [[undefined]]).

---

## ٢. الـ early return

~~~text Orders.tsx
if (isLoading) return <p>Loading...</p>
if (error) return <p role="alert">{error}</p>
~~~

[[if]] عادي، **قبل** الـ JSX الأساسي. لو الشرط صح، الـ component يرجّع حاجة صغيرة ويخلص، والباقي مبيتنفذش. ده بيخلي الـ JSX الأساسي نضيف ومش محتاج يفكر في الحالات دي.

- [[if (error)]]: نص فاضي و [[undefined]] الاتنين falsy، فالشرط صح بس لو فيه رسالة فعلًا.
- [[role="alert"]]: بيقول لقارئ الشاشة (برنامج المكفوفين) «اقرا ده على طول».

## ٣. الـ ternary

~~~text Orders.tsx
{orders.length === 0 ? <p>No orders yet</p> : <OrderTable rows={orders} />}
~~~

[[شرط ? أ : ب]]: لو الشرط صح [[أ]]، غير كده [[ب]]. مناسب لما يبقى فيه اختيارين، وده expression فينفع جوه [[{ }]].

## ٤. الـ [[&&]]

~~~text Orders.tsx
{orders.length > 0 && <p>{orders.length} orders</p>}
~~~

[[a && b]] في JavaScript: لو [[a]] falsy، النتيجة [[a]] نفسها. لو truthy، النتيجة [[b]]. يعني:

- [[orders.length > 0]] = [[false]]: النتيجة [[false]]، و React مبترسمش [[false]].
- = [[true]]: النتيجة الـ [[<p>]].

مناسب لـ «حاجة أو ولا حاجة».

---

## ٥. الناتج للـ ٤ حالات

~~~text الناتج (Chrome)
loading    <p>Loading...</p>
error      <p role="alert">Network error</p>
empty      <section><p>No orders yet</p></section>
data       <section><table><tbody><tr><td>A1</td><td>250</td></tr><tr><td>A2</td><td>90</td></tr></tbody></table><p>2 orders</p></section>
~~~

- [[loading]] و [[error]]: مفيش [[<section>]] أصلًا، الـ early return رجّع قبلها.
- [[empty]]: الـ ternary اختار [[No orders yet]]، والـ [[&&]] رجّع [[false]] فمفيش حاجة.
- [[data]]: الجدول، و [[2 orders]].

---

## ٦. تجربة «جرّب»: [[orders.length &&]]

شلنا [[> 0]] وبعتنا array فاضية:

~~~text الناتج
bad-empty  <section><p>No orders yet</p>0</section>
~~~

[[0]] ظهر على الشاشة! لأن [[orders.length]] = [[0]]، و [[0]] falsy، فـ [[0 && ...]] رجّعت [[0]] نفسه، و React بترسم الأرقام. اللي مبيترسمش: [[false]] و [[null]] و [[undefined]] و [[true]] بس. الحل شرط boolean صريح ([[> 0]]) زي المثال الأصلي.

---

## ٧. hooks بعد الـ early return

جرّبنا component فيه [[useState]] قبل الـ [[if]] و [[useState]] تاني بعده. أول render ([[isLoading]] = false) نادى الاتنين، ولما بقت true:

~~~text الـ Console
Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
~~~

والصفحة كلها اختفت. React بتعدّ الـ hooks بالترتيب (درس useState)، والـ render ده نادى واحد بدل اتنين. القاعدة: كل الـ hooks فوق، والـ early returns بعدهم.

---

## الخلاصة

| الأداة | إمتى | مثال |
|---|---|---|
| early return | حالة بتغيّر الشاشة كلها | [[if (isLoading) return <Spinner />]] |
| ternary [[? :]] | اختيارين | فاضي ولا جدول |
| [[&&]] | حاجة أو ولا حاجة | [[count > 0 && <Badge />]] |

> [[&&]] مع رقم = خطر. خلي الشرط boolean.`,
          lines: [
            "شكل الطلب.",
            "component بياخد الطلبات وحالة التحميل والخطأ.",
            "early return: لو بيحمّل، اعرض ده بس.",
            "ولو فيه خطأ اعرضه، و [[role=\"alert\"]] عشان قارئ الشاشة يقراه.",
            "الحالة العادية.",
            "بداية الـ section.",
            "ternary: فاضي ولا فيه بيانات.",
            "&& بشرط boolean صريح، عشان الصفر ميظهرش.",
            "قفلة الـ section.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`بـ array فاضية الـ section بيبقى فيه «No orders yet» وجنبها [[0]]. [[0 && <p/>]] نتيجتها [[0]] مش false، و React بترسم الأرقام (بتتجاهل false و null و undefined بس). في React Native ده مش مجرد صفر على الشاشة، ده crash لأن النص لازم يبقى جوه [[<Text>]].

الحل: خلي الشرط boolean صريح، [[orders.length > 0 && ...]] زي المثال الأصلي، أو ternary. ولو شفت [[NaN]] على الشاشة فهو نفس المشكلة مع رقم تاني.`
        },
        {
          cmd: "key",
          title: "ليه كل عنصر في list محتاج مفتاح ثابت",
          desc: R`لما ترسم list بـ [[map]]، كل عنصر لازم ياخد [[key]] فريد وثابت، غالبًا الـ id اللي جاي من البيانات. React بتستخدمه عشان تعرف مين هو مين بين render والتاني.

الـ index كـ key بيبوّظ الدنيا لما الـ list يتغير ترتيبها أو يتمسح منها عنصر: الـ state والكلام المكتوب في input جوه عنصر بيروح لعنصر تاني. جرّب المثال: اكتب في أول خانة وامسح أول عنصر.`,
          example: R`function Row({ name }: { name: string }) {
  const [note, setNote] = useState('')
  return <li>{name} <input value={note} onChange={e => setNote(e.target.value)} /></li>
}
export default function People() {
  const [people, setPeople] = useState([{ id: 1, name: 'Ali' }, { id: 2, name: 'Mona' }])
  return (
    <>
      <button onClick={() => setPeople(p => p.slice(1))}>Remove first</button>
      <ul>{people.map((p, i) => <Row key={i} name={p.name} />)}</ul>
    </>
  )
}`,
          try: R`اكتب «hello» جنب Ali واضغط Remove first: هتلاقي «hello» بقت جنب Mona. غيّر [[key={i}]] لـ [[key={p.id}]] وجرّب تاني.`,
          flag: "script",
          deep: {
            why: "بين render والتاني React لازم تقرر: العنصر ده هو نفسه اللي كان قبل كده (فتحافظ على الـ state والـ DOM بتاعه) ولا جديد؟ من غير key مفيش غير الترتيب، والترتيب بيتغير.",
            how: R`React بتطابق الأولاد القدام بالجداد عن طريق الـ key. في المثال بـ [[key={i}]]: قبل المسح كان key 0 هو Ali و key 1 هو Mona. بعد المسح Mona بقت في index 0، يعني key 0. React تقول «key 0 لسه موجود، يبقى هو نفس الـ Row»، فتحتفظ بالـ state بتاعه (note = hello) وتغيّر الـ prop بس لـ Mona. و key 1 اختفى، فتشيل الـ Row التاني اللي كان فاضي. النتيجة: hello جنب Mona.

بـ [[key={p.id}]]: key 1 (Ali) اختفى فيتشال بالـ state بتاعه، و key 2 (Mona) لسه موجود بـ state بتاعه. مظبوط.

الـ key لازم يكون فريد بين الإخوات بس، مش في التطبيق كله. ومبيوصلش كـ prop للـ component. ولو بترجع أكتر من عنصر لكل item، استخدم [[<Fragment key={id}>]] بدل [[<>]].

والـ key بيتعمل وقت ما البيانات تتعمل (id من الداتابيز، أو [[crypto.randomUUID()]] لما المستخدم يضيف عنصر)، مش وقت الرسم.

والـ index مقبول في حالة واحدة: list ثابتة عمرها ما هتتغير ترتيبها ولا هيتمسح منها، ومفيش state جوه عناصرها.`,
            when: "أي [[map]] بيطلّع JSX. و React بتطلّع warning في الـ console لو نسيته.",
            mistakes: R`[[key={Math.random()}]] أو [[crypto.randomUUID()]] جوه الـ map: key جديد كل render، فكل عنصر بيتشال ويتعمل من الأول، والـ input بيفقد الـ focus مع كل حرف. وفي مشروع حقيقي كان فيه عشرات [[key={index}]]، منها list صور فيها زرار مسح لكل صورة: طول ما مفيش state جوه العنصر الغلط مش باين، وأول ما تضيف loading للصورة أو animation هيظهر على الصورة الغلط.`
          },
          teach: R`## الفكرة: المثال فيه bug مقصود

[[People]] بيعرض شخصين، وكل صف فيه خانة ملاحظة ليها state خاصة بيها. والـ [[key]] متحط غلط ([[key={i}]]) عشان تشوف المشكلة بعينك. اتشغّل في Vite 8.3 + React 19.2 في Chrome headless، والكتابة والضغط بـ Playwright.

---

## ١. [[Row]]: صف ليه ذاكرة

~~~text People.tsx
function Row({ name }: { name: string }) {
  const [note, setNote] = useState('')
  return <li>{name} <input value={note} onChange={e => setNote(e.target.value)} /></li>
}
~~~

[[name]] جاي من الأب. [[note]] state خاصة بكل نسخة من [[Row]]: لو فيه صفين، فيه [[note]] اتنين منفصلين. والخانة controlled: قيمتها من [[note]] وكل حرف بيرجع لها (درس controlled input).

## ٢. [[People]]: الـ list

~~~text People.tsx
const [people, setPeople] = useState([{ id: 1, name: 'Ali' }, { id: 2, name: 'Mona' }])
~~~

array فيها شخصين، كل واحد ليه [[id]] ثابت.

~~~text People.tsx
<button onClick={() => setPeople(p => p.slice(1))}>Remove first</button>
~~~

[[p.slice(1)]] بترجّع array **جديدة** من العنصر رقم 1 لآخرها، يعني من غير الأول. (الترقيم بيبدأ من 0.)

~~~text People.tsx
<ul>{people.map((p, i) => <Row key={i} name={p.name} />)}</ul>
~~~

- [[people.map((p, i) => ...)]]: [[map]] بتدّي الدالة العنصر ([[p]]) ورقمه في الـ array ([[i]]، اختصار index)، وبترجّع array من JSX، و React بترسمها ورا بعض.
- [[key={i}]]: الغلط. المفتاح هو **المكان** مش **الشخص**.
- [[key]] مش prop عادية: React بتاخدها لنفسها ومبتوصلش لـ [[Row]].

---

## ٣. اللي حصل بـ [[key={i}]]

كتبنا [[hello]] جنب Ali وضغطنا Remove first:

~~~text الناتج (Chrome)
typed hello     ["Ali = \"hello\"","Mona = \"\""]
remove first    ["Mona = \"hello\""]
~~~

Ali اتمسح، بس [[hello]] بقت جنب Mona! React بتطابق القديم بالجديد بالـ key:

| key | قبل المسح | بعد المسح | React فهمت إيه |
|---|---|---|---|
| [[0]] | Ali، note = hello | Mona | «key 0 لسه موجود، يبقى نفس الصف». خلّت الـ state (hello) وغيّرت [[name]] بس |
| [[1]] | Mona، note فاضية | (مش موجود) | «key 1 اختفى». شالت الصف التاني بالـ state بتاعته |

يعني React مسحت الصف **الغلط**، لأن الـ key قالها إن اللي اختفى هو التاني.

## ٤. بـ [[key={p.id}]]

~~~text الناتج (Chrome)
typed hello     ["Ali = \"hello\"","Mona = \"\""]
remove first    ["Mona = \"\""]
~~~

| key | قبل | بعد | React فهمت إيه |
|---|---|---|---|
| [[1]] | Ali، hello | (مش موجود) | Ali اتشال، فشالت صفه بالـ hello |
| [[2]] | Mona، فاضية | Mona | نفس الصف، بنفس الـ state |

مظبوط، لأن الـ key ماشي مع **البيانات** مش مع المكان.

## ٥. من غير [[key]] خالص

~~~text الـ Console
Each child in a list should have a unique "key" prop.

Check the render method of $__btPeople$__bt.
~~~

ومن غير key React بتستخدم الترتيب، يعني نفس مشكلة [[key={i}]] بالظبط، بس على الأقل بتحذّرك. [[key={i}]] بيسكّت التحذير ويسيب الـ bug.

---

## الخلاصة

| الـ key | النتيجة |
|---|---|
| [[p.id]] (من البيانات) | صح دايمًا |
| [[i]] (الترتيب) | الـ state بتتنقل لعنصر تاني لو حصل مسح أو ترتيب أو إضافة في النص |
| [[Math.random()]] جوه الـ map | key جديد كل render: كل صف بيتشال ويتعمل من الأول ويفقد الـ state والـ focus |
| مفيش | تحذير، ونفس سلوك الترتيب |`,
          lines: [
            "صف فيه اسم وخانة ملاحظة.",
            "كل صف ليه state خاصة بيه.",
            "الاسم والخانة.",
            "قفلة الصف.",
            "الـ list.",
            "شخصين، كل واحد ليه id ثابت.",
            "بداية الـ JSX.",
            "Fragment عشان الزرار و ul جنب بعض.",
            "امسح أول شخص.",
            "الغلط هنا: key هو الترتيب مش الـ id.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`بـ [[key={i}]]: بعد Remove first هتلاقي «Mona» ومعاها «hello». React شافت إن اللي اتشال هو key [[1]] (آخر واحد)، و key [[0]] لسه موجود، فخلّت الـ state بتاع أول Row (اللي فيه hello) وغيّرت الـ name بس لـ Mona.

بـ [[key={p.id}]]: «Mona» والخانة فاضية، لأن React عرفت إن Row بتاع id 1 هو اللي اتمسح بالـ state بتاعته. القاعدة: الـ key لازم يتبع البيانات مش المكان. الـ index مقبول بس لو الـ list عمرها ما هتترتب أو يتشال منها أو يتضاف في نصها.`
        }
      ]
    }
]);
