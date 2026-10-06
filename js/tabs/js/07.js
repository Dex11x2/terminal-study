// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الـ DOM",
      l: 1,
      n: "تمسك عناصر الصفحة وتعدّلها، وتسمع للـ events، و event delegation",
      items: [
        {
          cmd: "querySelector",
          title: "تمسك عنصر من الصفحة بالـ CSS selector",
          desc: R`الـ DOM هو الصفحة بعد ما المتصفح قراها وحوّلها شجرة objects. [[document.querySelector(selector)]] بترجّع أول عنصر مطابق (أو null)، و [[querySelectorAll]] بترجّع كلهم في NodeList. والـ selector نفس اللي بتكتبه في CSS (تاب HTML و CSS).

وتقدر تدوّر جوه عنصر معيّن بدل الصفحة كلها: [[form.querySelector("input")]].`,
          example: R`document.querySelector("h1")
document.querySelector("#login-form")
document.querySelector(".card .price")
document.querySelector("[data-id='42']")
document.querySelectorAll("li").length
document.querySelectorAll("li").forEach((li) => console.log(li.textContent))
[...document.querySelectorAll("a")].map((a) => a.href)
document.getElementById("app")
const form = document.querySelector("form"); form?.querySelector("input[name=email]")
$0`,
          try: R`افتح أي موقع، واعمل Inspect على عنصر، وبعدين في Console اكتب [[$0]] (العنصر اللي اخترته). جرّب [[[...document.querySelectorAll("a")].map((a) => a.href)]] عشان تجيب كل لينكات الصفحة.`,
          flag: "console",
          deep: {
            why: "أي تفاعل في صفحة من غير framework بيبدأ إنك تمسك العنصر: الزرار اللي هتسمع له، والـ div اللي هتعرض فيه النتيجة. وحتى مع React هتحتاجه في الـ tests (Testing Library) وفي سكربتات Console والـ extensions.",
            how: R`المتصفح بيقرا الـ HTML ويبني شجرة (Document Object Model): كل tag بيبقى object ([[HTMLElement]]) ليه خصايص و methods، والـ JS بيقرا ويعدّل فيها، والمتصفح بيعيد الرسم.

[[querySelectorAll]] بترجّع NodeList ثابتة (static): لو ضفت عناصر بعدها مش هتظهر فيها. وعندها [[forEach]] بس مفيهاش [[map]] و [[filter]]، عشان كده بتحوّلها array بـ [[[...list]]] أو [[Array.from]].

[[getElementById]] أقدم وأسرع شوية، و [[getElementsByClassName]] بترجّع HTMLCollection «live» بتتحدث لوحدها، وده ساعات بيعمل مفاجآت في الـ loops.

لو الـ script في [[<head>]] من غير [[defer]]، العناصر لسه متعملتش وقت ما الكود يشتغل فهترجع null. الحل: [[<script src="app.js" defer>]] أو [[type="module"]] (الاتنين بيستنوا الـ HTML يخلص).`,
            when: R`في أي صفحة JS عادي، وفي سكربتات Console، وفي الـ tests. في React متستخدمهاش جوه الـ components: استخدم [[useRef]] (تاب React).`,
            mistakes: R`تنسى إن querySelector ممكن ترجّع null فتقع على [[.addEventListener]] («Cannot read properties of null»): السبب غالبًا selector غلط أو الـ script اشتغل قبل الـ HTML. وتنسى [[#]] أو [[.]] في الـ selector. وتنادي map على NodeList.`
          },
          teach: R`## الفكرة في سطرين

قبل ما تغيّر أي حاجة في الصفحة لازم «تمسكها». [[document.querySelector]] بتاخد CSS selector (نفس اللي بتكتبه في ملف CSS) وترجّعلك العنصر. السطور دي بتتكتب في Console المتصفح (F12 ثم Console). جرّبتها كلها في Chrome headless على صفحة تجربة دي:

~~~text index.html
<h1>متجر</h1>
<div id="app">
  <form id="login-form"><input name="email" type="email"><input name="pass"></form>
  <div class="card"><span class="price">120</span></div>
  <div data-id="42">item 42</div>
  <ul><li>شاي</li><li>قهوة</li><li>عصير</li></ul>
  <a href="/about">عن</a> <a href="https://example.com/x">برا</a>
</div>
~~~

---

## ١. [[document]]

[[document]] object جاهز في المتصفح بيمثّل الصفحة كلها. المتصفح قرا الـ HTML وعمل منه شجرة objects اسمها **DOM** (Document Object Model)، و document هو أصلها. ومش موجود في Node، عشان كده الدرس ده في المتصفح بس.

---

## ٢. أنواع الـ selectors

~~~text Console
document.querySelector("h1")
document.querySelector("#login-form")
document.querySelector(".card .price")
document.querySelector("[data-id='42']")
~~~

| الـ selector | معناه | اللي رجع |
|---|---|---|
| [[h1]] | أول tag اسمه h1 | [[<h1>متجر</h1>]] |
| [[#login-form]] | [[#]] = id | الفورم |
| [[.card .price]] | [[.]] = class، والمسافة = «جوه» | [[<span class="price">120</span>]] |
| [[[data-id='42']]] | الأقواس = attribute بقيمة معيّنة | [[<div data-id="42">item 42</div>]] |

querySelector بترجّع **أول** عنصر مطابق بس. ولو مفيش:

~~~text الناتج
document.querySelector(".nope")   →  null
~~~

---

## ٣. [[querySelectorAll]]: كلهم

~~~text Console
document.querySelectorAll("li").length
document.querySelectorAll("li").forEach((li) => console.log(li.textContent))
~~~

بترجّع **NodeList**: شبه array، فيها [[length]] و [[forEach]].

~~~text الناتج
3
شاي
قهوة
عصير
~~~

[[textContent]] النص اللي جوه العنصر.

---

## ٤. NodeList مش array

~~~text Console
[...document.querySelectorAll("a")].map((a) => a.href)
~~~

NodeList معندهاش map. جرّبت من غير تحويل:

~~~text الناتج
TypeError: document.querySelectorAll(...).map is not a function
~~~

فبنحوّلها array الأول بـ [[[...list]]]: الـ spread بيفرد عناصرها جوه array جديدة. وبعدين [[map]] بتاخد [[href]] من كل لينك:

~~~text الناتج
["http://127.0.0.1:58602/about","https://example.com/x"]
~~~

لاحظ إن [[/about]] بقت URL كامل: الخاصية [[a.href]] بترجّع العنوان المحسوب (الرقم بعد 127.0.0.1 هو بورت السيرفر المحلي اللي جرّبت عليه). ولو عايز المكتوب في الـ HTML زي ما هو: [[a.getAttribute("href")]] رجّعت [[/about]].

---

## ٥. الطريقة القديمة بالـ id

~~~text Console
document.getElementById("app")
~~~

بتاخد الـ id **من غير** [[#]]. رجّعت الـ div ([[tagName]] بتاعه [[DIV]]).

---

## ٦. تدوّر جوه عنصر

~~~text Console
const form = document.querySelector("form"); form?.querySelector("input[name=email]")
~~~

- [[;]] بتفصل جملتين في نفس السطر.
- [[form.querySelector(...)]]: نفس الدالة بس على عنصر، فبتدوّر جواه بس.
- [[?.]]: لو form طلع null، متكملش وارجع undefined بدل error.
- [[input[name=email]]]: input الـ attribute بتاعه name قيمته email.

~~~text الناتج
<input name="email" type="email">
~~~

---

## ٧. [[$0]]

ده مش JS عادي، ده اختصار في Console بتاع DevTools (Chrome و Edge و Firefox): العنصر اللي مختاره دلوقتي في تاب Elements. مش هيشتغل في ملف [[app.js]]. (الكلام ده من docs الـ Chrome DevTools، مش متجرّب في السكربت.)

---

## ٨. الـ error المشهور

~~~text الناتج
document.querySelector("#nope").addEventListener("click", () => {})
TypeError: Cannot read properties of null (reading 'addEventListener')
~~~

querySelector رجّعت null (selector غلط، أو السكربت اشتغل قبل ما العنصر يتعمل)، وانت حاولت تقرا منه.

---

## الخلاصة

| الدالة | بترجّع | لو مفيش |
|---|---|---|
| [[querySelector(sel)]] | أول عنصر | [[null]] |
| [[querySelectorAll(sel)]] | NodeList ثابتة | NodeList فاضية |
| [[getElementById(id)]] | العنصر | [[null]] |
| [[el.querySelector(sel)]] | جوه el بس | [[null]] |

> NodeList ثابتة: جرّبت أضيف [[.card]] جديد بعد [[querySelectorAll(".card")]] وفضلت 1، أما [[getElementsByClassName("card")]] (live) بقت 2 لوحدها.`,
          lines: [
            "أول h1 في الصفحة.",
            "بالـ id.",
            R`عنصر [[.price]] جوه [[.card]]: أي selector بتاع CSS ينفع.`,
            "بالـ attribute.",
            "عدد العناصر.",
            R`NodeList عندها [[forEach]].`,
            R`بس مفيهاش [[map]]، فحوّلها array الأول.`,
            "الطريقة القديمة بالـ id.",
            R`دوّر جوه عنصر معيّن، و [[?.]] لو الفورم مش موجود.`,
            R`في DevTools: [[$0]] هو العنصر اللي مختاره في Elements.`
          ],
          sol: R`[[$0]] بيطبع نفس العنصر اللي اخترته في Elements (ولما تعدّي عليه بالماوس بيتلوّن في الصفحة). و [[$1]] العنصر اللي قبله، وهكذا. ده موجود في DevTools بس، مش في كودك.

السطر التاني بيرجّع array فيها كل الـ URLs كاملة (absolute)، حتى لو في الـ HTML مكتوبة [[/about]]: [[a.href]] الخاصية بتطلع الـ URL المحسوب، و [[a.getAttribute("href")]] بتطلع المكتوب زي ما هو. والـ [[[...]]] لازمة لأن querySelectorAll بترجّع NodeList، وفيها forEach بس معندهاش map، فلو كتبت [[document.querySelectorAll("a").map]] هيطلعلك [[is not a function]].`
        },
        {
          cmd: "textContent و classList",
          title: "تغيّر النص والكلاسات وتضيف عناصر",
          desc: R`[[el.textContent = "..."]] بتغيّر النص، وأمان لأن أي HTML فيه بيظهر كنص. و [[el.classList.add / remove / toggle]] للكلاسات، و [[el.dataset.x]] لـ attributes [[data-x]]. و [[document.createElement]] ثم [[append]] لإضافة عنصر.

[[innerHTML]] بيحط HTML حقيقي، وده خطر لو فيه أي حاجة من اليوزر: ممكن يحط سكربت (XSS). استخدمه مع نصوص انت كاتبها بس.`,
          example: R`const list = document.querySelector("#todos");
const title = document.querySelector("h1");
title.textContent = "مهامي";
title.classList.add("big");
title.classList.toggle("done");
title.dataset.count = "3";
title.style.color = "tomato";
const li = document.createElement("li");
li.textContent = "اكتب درس JS";
list.append(li);
const userInput = "<img src=x onerror=alert(1)>";
list.innerHTML += $__bt<li>$__{userInput}</li>$__bt;
list.querySelector("li").remove();`,
          try: R`اعمل ملف [[index.html]] فيه [[<h1>]] و [[<ul id="todos">]] و [[<script src="app.js" defer>]]، وحط الكود في [[app.js]]، وافتحه بسيرفر محلي (تاب المتصفح). شوف الـ alert بيطلع من السطر الخطر، وبعدين غيّره لـ createElement و textContent وشوفه بيظهر كنص.`,
          flag: "script",
          deep: {
            why: "ده كل اللي React بيعمله من تحت: بيغيّر نصوص وكلاسات ويضيف ويشيل عناصر. لما تفهمه هتفهم ليه React موجود أصلًا، وهتعرف تكتب صفحة صغيرة من غير framework.",
            how: R`[[textContent]] بيحط النص زي ما هو، فمفيش أي حاجة بتتنفذ. [[innerText]] شبهه بس بيراعي الـ CSS (العناصر المخفية) وأبطأ لأنه بيحتاج layout.

[[innerHTML]] بيخلي المتصفح يعمل parse للنص كـ HTML. [[<script>]] مش بتشتغل فيه، بس [[<img onerror=...>]] بتشتغل، وده أشهر شكل XSS. و [[innerHTML +=]] بيعيد بناء كل العناصر اللي جوه، فبيضيّع الـ listeners والـ state بتاعتهم.

[[classList]] أحسن من [[className]] لأنه بيعدّل كلاس واحد من غير ما يمسح الباقي. و [[dataset]] بيحوّل [[data-user-id]] لـ [[dataset.userId]].

[[append]] بيقبل أكتر من عنصر ونصوص، و [[prepend]] و [[before]] و [[after]] و [[replaceWith]] و [[remove]] كلهم حديثين وأبسط من [[appendChild]] و [[removeChild]] القديمة.

وكل تعديل ممكن يخلي المتصفح يعيد حساب الصفحة؛ لو هتضيف مية عنصر، اعملهم في [[DocumentFragment]] أو ابنيهم وضيفهم مرة واحدة (تاب HTML و CSS: layout thrashing).`,
            when: R`صفحات بسيطة، و widgets صغيرة، والـ extensions. و [[classList]] مع CSS بدل [[style]] في أغلب الحالات: الشكل في CSS والـ JS بيغيّر الكلاس بس.`,
            mistakes: R`[[innerHTML]] مع داتا من اليوزر أو من API. و [[style.x]] لكل حاجة بدل كلاس. و [[innerHTML +=]] جوه loop. وفي الانترفيو: «الفرق بين textContent و innerHTML و innerText؟» و «إزاي تمنع XSS؟».`
          },
          teach: R`## الفكرة في سطرين

بعد ما تمسك العنصر (الدرس اللي فات) بتغيّر فيه: النص، والكلاسات، والـ attributes، وتضيف عناصر جديدة أو تشيل. وفي نص المثال سطر خطر عن قصد عشان تشوف XSS بعينك. شغّلت الكود بالظبط في Chrome headless بالصفحة دي:

~~~text index.html
<h1>عنوان</h1>
<ul id="todos"></ul>
<script src="app.js" defer></script>
~~~

---

## ١. تمسك العنصرين

~~~text app.js
const list = document.querySelector("#todos");
const title = document.querySelector("h1");
~~~

[[defer]] في الـ HTML هو اللي مخلّي السطرين دول يلاقوا العناصر (درس defer و async).

---

## ٢. [[textContent]]: النص

~~~text app.js
title.textContent = "مهامي";
~~~

بتستبدل كل اللي جوه العنصر بالنص ده. وأي [[<]] أو [[>]] بيتعامل كحرف عادي مش tag.

---

## ٣. [[classList]]: الكلاسات

~~~text app.js
title.classList.add("big");
title.classList.toggle("done");
~~~

- [[classList]] object فيه كلاسات العنصر، ومعاه methods.
- [[add("big")]]: ضيف الكلاس من غير ما تمسح الموجود.
- [[toggle("done")]]: لو موجود شيله، ولو مش موجود ضيفه. هنا مكانش موجود فاتضاف.

جرّبت toggle مرتين ورا بعض: الكلاسات بقت [[big]] وبعدين رجعت [[big done]].

---

## ٤. [[dataset]] و [[style]]

~~~text app.js
title.dataset.count = "3";
title.style.color = "tomato";
~~~

- [[dataset]] بيكتب attributes بتبدأ بـ [[data-]]. [[dataset.count]] بقت [[data-count="3"]]. والاسم المكتوب camelCase بيتحوّل لشُرَط: [[dataset.userId = "5"]] طلعت [[data-user-id="5"]].
- [[style.color]] بيحط CSS مباشر على العنصر ([[style="color: tomato;"]]). الأحسن في العادي تغيّر كلاس وسيب الشكل في CSS.

بعد الخطوات دي الـ h1 بقى:

~~~text الناتج
<h1 class="big done" data-count="3" style="color: tomato;">مهامي</h1>
~~~

---

## ٥. عنصر جديد

~~~text app.js
const li = document.createElement("li");
li.textContent = "اكتب درس JS";
list.append(li);
~~~

1. [[createElement("li")]]: بيعمل عنصر li في الذاكرة. لسه مش في الصفحة.
2. نحطله نص.
3. [[append]]: دخّله كآخر ابن جوه list. دلوقتي ظهر.

~~~text الناتج
<ul id="todos"><li>اكتب درس JS</li></ul>
~~~

---

## ٦. السطر الخطر: [[innerHTML]]

~~~text app.js
const userInput = "<img src=x onerror=alert(1)>";
list.innerHTML += $__bt<li>$__{userInput}</li>$__bt;
~~~

تخيّل إن userInput ده حاجة يوزر كتبها. [[innerHTML]] بيقرا النص **كـ HTML**:

1. [[+=]] معناها [[list.innerHTML = list.innerHTML + ...]]: اقرا الـ HTML الحالي كنص، ضيف عليه، وابني كل العناصر من جديد.
2. المتصفح لقى [[<img src=x>]]: صورة عنوانها [[x]]، والعنوان ده مش موجود فالتحميل فشل.
3. [[onerror=alert(1)]]: كود بيشتغل لما التحميل يفشل. فاشتغل.

والنتيجة في Chrome:

~~~text الناتج
alert: 1     (نافذة alert طلعت ومكتوب فيها 1)
~~~

ده **XSS** (Cross-Site Scripting): كود حد تاني اشتغل في صفحتك. وكان ممكن يبقى سرقة توكن بدل alert.

وفيه أثر جانبي: الـ li بتاعة createElement اتشالت من الصفحة واتعمل بدالها li جديدة بنفس الشكل. [[li.isConnected]] كانت true قبل السطر ده وبقت false بعده. يعني أي listener كان على العناصر القديمة ضاع.

---

## ٧. [[remove()]]

~~~text app.js
list.querySelector("li").remove();
~~~

بيشيل أول li من الصفحة (النسخة الجديدة من «اكتب درس JS»). الصفحة في الآخر:

~~~text الناتج
<ul id="todos"><li><img src="x" onerror="alert(1)"></li></ul>
~~~

---

## ٨. الحل الآمن (الـ solCode)

~~~text app.js
const safe = document.createElement("li");
safe.textContent = userInput;
list.append(safe);
~~~

مفيش alert، والعنصر في الـ HTML بقى:

~~~text الناتج
<li>&lt;img src=x onerror=alert(1)&gt;</li>
~~~

[[&lt;]] و [[&gt;]] هما [[<]] و [[>]] بس كـ **حروف** تتعرض، مش tag. فاليوزر بيشوف النص زي ما كتبه.

---

## الخلاصة

| عايز | استخدم | ملاحظة |
|---|---|---|
| تغيّر نص | [[textContent]] | آمن مع أي داتا |
| كلاس | [[classList.add/remove/toggle]] | مبيمسحش الباقي |
| [[data-x]] | [[dataset.x]] | camelCase ↔ شرطة |
| عنصر جديد | [[createElement]] + [[append]] | |
| تشيل عنصر | [[el.remove()]] | |
| HTML حقيقي | [[innerHTML]] | لنصوص انت كاتبها بس |`,
          lines: [
            "العنصر اللي هنضيف فيه.",
            "العنوان.",
            "غيّر النص بأمان.",
            "ضيف كلاس من غير ما تمسح الموجود.",
            "لو الكلاس موجود شيله، ولو مش موجود ضيفه.",
            R`بيعمل [[data-count="3"]] على العنصر.`,
            "style مباشر، والأحسن كلاس في CSS.",
            "عنصر جديد، لسه مش في الصفحة.",
            "نصه.",
            "دخّله في آخر الليستة.",
            "input خبيث من اليوزر.",
            R`[[innerHTML]] نفّذ الـ onerror: ده XSS. متعملش كده.`,
            R`شيل أول عنصر من الصفحة. ([[li]] القديم مبقاش في الصفحة أصلًا: [[innerHTML +=]] اللي فوق عمل العناصر من جديد.)`
          ],
          sol: R`لما تفتح الصفحة: العنوان بيبقى «مهامي» باللون الأحمر، وفيه [[<li>]] من createElement، وبعدين الـ alert بيطلع (رقم 1) لأن الـ [[<img>]] اتحط كـ HTML حقيقي، والـ [[src=x]] فشل فاشتغل [[onerror]]. ده XSS: أي نص من يوزر في innerHTML ممكن يشغّل كود. وآخر سطر بيشيل أول li (بتاعة createElement) مش التانية.

لما تغيّر السطر الخطر لـ [[const li2 = document.createElement("li"); li2.textContent = userInput; list.append(li2);]] مفيش alert، وهتشوف النص [[<img src=x onerror=alert(1)>]] مكتوب في الصفحة زي ما هو: textContent بيعامل أي حاجة كنص. ولو الصفحة فاضية خالص افتح Console: غالبًا انت فاتحها كـ file:// أو نسيت [[defer]] فالسكريبت اشتغل قبل ما [[#todos]] يتعمل، و querySelector رجّع null.`,
          solCode: R`const list = document.querySelector("#todos");
const userInput = "<img src=x onerror=alert(1)>";
const safe = document.createElement("li");
safe.textContent = userInput; // بيظهر كنص، مفيش alert
list.append(safe);`
        },
        {
          cmd: "addEventListener",
          title: "تسمع لضغطة أو كتابة أو submit",
          desc: R`[[el.addEventListener("click", handler)]] بتنادي الدالة كل ما الحدث يحصل، وبتبعتلها object الـ event: فيه [[event.target]] (العنصر اللي الحدث حصل عليه) و [[event.preventDefault()]] (امنع السلوك الافتراضي، زي إن الفورم يعمل reload).

أشهر الأحداث: [[click]] و [[input]] (كل حرف) و [[change]] و [[submit]] و [[keydown]]. وعشان تشيل الـ listener لازم تبعت نفس الدالة لـ [[removeEventListener]].`,
          example: R`const btn = document.querySelector("#save");
const form = document.querySelector("form");
function onSave(event) {
  console.log("اتضغط", event.target);
}
btn.addEventListener("click", onSave);
btn.removeEventListener("click", onSave);
btn.addEventListener("click", () => console.log("مرة واحدة"), { once: true });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});
form.querySelector("input").addEventListener("input", (e) => {
  console.log(e.target.value);
});`,
          try: R`اعمل فورم فيه input اسمه email وزرار submit. شيل [[e.preventDefault()]] وشوف الصفحة بتعمل reload والـ URL اتغير. وبعدين جرّب [[{ once: true }]] واضغط الزرار مرتين.`,
          flag: "script",
          deep: {
            why: "أي تفاعل مع اليوزر حدث: ضغطة، كتابة، scroll، إرسال فورم. ده الأساس اللي [[onClick]] في React مبني عليه، و React نفسه بيعمل listener واحد على الـ root (درس event delegation).",
            how: R`لما تضغط على عنصر، الحدث بيمشي ٣ مراحل: capture من الـ document لتحت لحد العنصر، وبعدين target، وبعدين bubble من العنصر لفوق لحد الـ document. الـ listeners العادية بتشتغل في الـ bubble، و [[{ capture: true }]] بيخليها في الـ capture.

[[event.target]] العنصر اللي اتضغط فعلًا (ممكن يكون span جوه الزرار)، و [[event.currentTarget]] العنصر اللي عليه الـ listener. و [[stopPropagation()]] بيوقف الـ bubble، و [[preventDefault()]] بيمنع سلوك المتصفح (submit، أو فتح لينك، أو checkbox).

الخيارات: [[once]] (يتشال لوحده بعد أول مرة)، و [[passive: true]] (وعد إنك مش هتعمل preventDefault، فالـ scroll يبقى ناعم على الموبايل)، و [[signal]] (تشيل listeners كتير مرة واحدة بـ AbortController).

[[new FormData(form)]] بتقرا كل الـ inputs اللي ليها [[name]]، و [[Object.fromEntries]] بتحوّلها object.`,
            when: R`أي تفاعل في صفحة من غير framework. و [[submit]] على الفورم مش [[click]] على الزرار، عشان Enter يشتغل كمان.`,
            mistakes: R`[[removeEventListener]] بـ arrow جديدة: دالة مختلفة فمش هتتشال. و [[addEventListener("click", save())]]: نادتها فورًا. وتضيف listener جوه دالة بتتنادي كتير فالحدث يشتغل ٥ مرات. وتنسى preventDefault في الـ submit. وفي الانترفيو: «اشرح event bubbling و capturing» و «الفرق بين target و currentTarget».`
          },
          teach: R`## الفكرة في سطرين

الـ event (حدث) حاجة بتحصل في الصفحة: ضغطة، أو حرف اتكتب، أو فورم اتبعت. [[addEventListener]] بتقول للمتصفح: «لما الحدث ده يحصل على العنصر ده، نادي الدالة دي». الدالة دي اسمها **handler** أو **listener**. شغّلت المثال في Chrome headless على الفورم اللي في الـ solCode (input اسمه email وزرار id بتاعه save)، وكتبت وضغطت بـ playwright.

---

## ١. نمسك العنصرين

~~~text app.js
const btn = document.querySelector("#save");
const form = document.querySelector("form");
~~~

---

## ٢. handler باسم

~~~text app.js
function onSave(event) {
  console.log("اتضغط", event.target);
}
btn.addEventListener("click", onSave);
~~~

- [[addEventListener("click", onSave)]]: أول argument اسم الحدث كـ string، والتاني الدالة نفسها. لاحظ: [[onSave]] من غير [[()]]. لو كتبت [[onSave()]] هتتنادي **دلوقتي** واللي هيتسجّل هو الناتج بتاعها (undefined).
- المتصفح لما ينادي الدالة بيبعتلها object الحدث، واحنا سمّيناه event. وفيه [[event.target]]: العنصر اللي الحدث حصل عليه فعلًا.

---

## ٣. تشيله

~~~text app.js
btn.removeEventListener("click", onSave);
~~~

لازم تبعت **نفس الدالة** بالظبط. عشان كده عملناها باسم. لو كانت arrow مكتوبة جوه الـ addEventListener، كل arrow جديدة دالة مختلفة ومفيش طريقة تشيلها.

بعد السطر ده onSave مش هتتنادي خالص، وفعلًا في التجربة «اتضغط» مطلعتش ولا مرة.

---

## ٤. [[{ once: true }]]

~~~text app.js
btn.addEventListener("click", () => console.log("مرة واحدة"), { once: true });
~~~

التالت object خيارات. [[once: true]] يعني بعد أول تنفيذ اتشال لوحدك. ضغطت الزرار مرتين:

~~~text الناتج
-- ضغطة 1
مرة واحدة
{"email":"sara@example.com"}
-- ضغطة 2
{"email":"sara@example.com"}
~~~

السطر التاني في كل ضغطة جاي من الـ submit (الخطوة الجاية): الزرار جوه فورم، فالضغط عليه بيبعت الفورم.

---

## ٥. [[submit]] و [[preventDefault]]

~~~text app.js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});
~~~

- [[submit]] على **الفورم** مش click على الزرار، عشان Enter جوه الـ input يشغّله كمان.
- [[e]] نفس object الحدث، بس باسم أقصر.
- [[e.preventDefault()]]: «امنع اللي المتصفح كان هيعمله». المتصفح كان هيبعت الفورم ويعمل reload للصفحة.
- [[new FormData(form)]]: بتقرا كل input ليه [[name]]، و [[Object.fromEntries]] بتحوّلها object (درس Object.keys و entries).

ولما شلت preventDefault في التجربة (نسخة تانية من الصفحة)، الصفحة اتنقلت فعلًا والـ URL بقى:

~~~text الناتج
http://127.0.0.1:51364/ev.html?email=a%40b.co
~~~

الفورم من غير [[method]] بيبعت GET، فالحقول بتتحط في الـ URL بعد [[?]]، و [[@]] بقت [[%40]] (encoding). والـ console.log بيظهر ثانية ويختفي مع الـ reload.

> ملاحظة من التجربة: لما كتبت [[ab]] في [[type="email"]] وضغطت، الـ submit **مشتغلش خالص**. المتصفح عمل validation الأول ورفض، ورسالته كانت [[Please include an '@' in the email address. 'ab' is missing an '@'.]]. فلو الـ handler مش بيشتغل، اتأكد إن الفورم valid.

---

## ٦. [[input]]: مع كل حرف

~~~text app.js
form.querySelector("input").addEventListener("input", (e) => {
  console.log(e.target.value);
});
~~~

كتبت [[ab]] حرف حرف:

~~~text الناتج
a string
ab string
~~~

[[e.target]] هو الـ input، و [[.value]] اللي مكتوب فيه، ونوعها دايمًا string حتى لو كتبت أرقام. أما [[change]] فبتشتغل مرة لما تخرج من الـ input بعد ما غيّرته.

---

## الخلاصة

| الحاجة | الشكل | تفتكر إيه |
|---|---|---|
| تسمع | [[el.addEventListener("click", fn)]] | fn من غير [[()]] |
| تشيل | [[el.removeEventListener("click", fn)]] | نفس الدالة بالظبط |
| مرة واحدة | [[{ once: true }]] | بيتشال لوحده |
| فورم | [[submit]] على الفورم | بيشتغل بـ Enter وبعد الـ validation |
| امنع المتصفح | [[e.preventDefault()]] | من غيرها reload |
| مين؟ | [[e.target]] | العنصر اللي الحدث حصل عليه |`,
          lines: [
            "الزرار.",
            "الفورم.",
            "دالة باسم عشان نقدر نشيلها بعدين.",
            R`[[event.target]] العنصر اللي اتضغط.`,
            "قفلة.",
            "اسمع للضغطة.",
            "شيله: لازم نفس الدالة بالظبط.",
            R`[[once]]: يشتغل مرة ويتشال لوحده.`,
            R`اسمع لـ [[submit]] على الفورم: بيشتغل بالضغط وبـ Enter.`,
            "امنع الـ reload.",
            R`اقرا كل الـ inputs اللي ليها [[name]] في object.`,
            "اطبع الداتا.",
            "قفلة.",
            R`[[input]] بيشتغل مع كل حرف.`,
            "القيمة دايمًا string.",
            "قفلة."
          ],
          sol: R`من غير [[e.preventDefault()]]: لما تضغط submit الصفحة بتعمل reload، والـ console.log بيظهر ويختفي بسرعة، والـ URL بيبقى فيه [[?email=...]] لأن الفورم default method بتاعه GET وبيبعت الحقول في الـ URL. مع preventDefault الصفحة ثابتة والـ console بيطبع [[{ email: "..." }]].

مع [[{ once: true }]]: أول ضغطة تطبع «مرة واحدة»، والتانية ولا حاجة، لأن الـ listener اتشال لوحده بعد أول تنفيذ. لو شايف الرسالة مرتين فغالبًا الكود نفسه اتنفّذ مرتين (سكريبت متحمّل مرتين)، ولو [[querySelector("input")]] رجّعت null يبقى الفورم ملوش input وقت تشغيل السكريبت.`,
          solCode: R`<form>
  <input name="email" type="email" />
  <button>Send</button>
</form>
<script>
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(form))); // { email: "..." }
  });
</script>`
        },
        {
          cmd: "event delegation",
          title: "listener واحد على الأب بدل listener لكل عنصر",
          desc: R`بدل ما تحط listener على كل زرار في ليستة (ولما تضيف عنصر جديد تفتكر تحطله)، حط listener واحد على الأب، وجواه اعرف مين اتضغط بـ [[e.target.closest(...)]]. ده شغال لأن الحدث بيطلع لفوق (bubbling).

الميزة: listener واحد مهما كان عدد العناصر، والعناصر اللي هتتضاف بعدين شغالة لوحدها.`,
          example: R`const list = document.querySelector("#todos");
function deleteTodo(id) { list.querySelector($__bt[data-id="$__{id}"]$__bt)?.remove(); }
function toggleTodo(id) { console.log("done", id); }
list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn || !list.contains(btn)) return;
  const id = btn.closest("li").dataset.id;
  if (btn.dataset.action === "delete") deleteTodo(id);
  if (btn.dataset.action === "done") toggleTodo(id);
});
list.insertAdjacentHTML("beforeend", '<li data-id="9">جديد <button data-action="delete">x</button></li>');`,
          try: R`ضيف ٣ عناصر بـ insertAdjacentHTML، واضغط delete على الأخير: شغال من غير ما تضيف listener. وبعدين حط [[<span>]] جوه الزرار واضغط عليه، وجرّب تشيل [[closest]] وتستخدم [[e.target.dataset]] مباشرة وشوف ليه بيبوظ.`,
          flag: "script",
          deep: {
            why: "ليستات بتتغير (todos، سلة، تعليقات، جدول) بتتعب لو كل عنصر ليه listener: لازم تضيف وتشيل مع كل تغيير، والذاكرة بتكبر. ودي من أشهر أسئلة انترفيو الفرونت.",
            how: R`الضغطة على الزرار بتعمل bubble: الزرار ثم الـ li ثم الـ ul ثم ... لحد الـ document. فالـ listener على الـ ul بيشوف كل ضغطة جواه.

[[e.target]] ممكن يكون عنصر جوه الزرار (أيقونة أو span)، عشان كده [[closest(selector)]] بتطلع لفوق من الـ target لحد ما تلاقي أول أب مطابق (أو العنصر نفسه). و [[list.contains(btn)]] بتتأكد إنه جوه الليستة دي مش في مكان تاني فوقيها.

React بيعمل ده على مستوى التطبيق كله: listener واحد لكل نوع حدث على الـ root، وبيوزّع على الـ components.

بعض الأحداث مبتعملش bubble زي [[focus]] و [[blur]] و [[mouseenter]]؛ بدالهم [[focusin]] و [[focusout]] و [[mouseover]].`,
            when: "أي ليستة أو جدول عناصره بتتضاف وتتشال، أو فيه عدد كبير من العناصر بنفس السلوك.",
            mistakes: R`تعتمد على [[e.target]] مباشرة فتبوظ لما حد يضغط على أيقونة جوه الزرار. وتعمل [[stopPropagation]] في مكان تاني فالـ delegation تقف من غير ما تعرف. وفي الانترفيو: «إيه هو event delegation وليه مفيد؟» والإجابة: bubbling، و listener واحد، وعناصر جديدة شغالة لوحدها، وذاكرة أقل.`
          },
          teach: R`## الفكرة في سطرين

لما تضغط على زرار، الحدث مش بيحصل على الزرار بس: بيطلع لأبوه، وجده، لحد الـ document. ده اسمه **bubbling** (زي الفقاعة اللي بتطلع لفوق). فبدل listener على كل زرار، بنحط واحد على الليستة كلها ونسأل «مين اتضغط؟». جرّبت المثال في Chrome headless على الصفحة دي (الزرار التاني فيه span جواه عن قصد):

~~~text index.html
<ul id="todos">
  <li data-id="1">أول <button data-action="done">✓</button>
    <button data-action="delete"><span>x</span></button></li>
</ul>
~~~

---

## ١. الليستة ودالتين مساعدتين

~~~text app.js
const list = document.querySelector("#todos");
function deleteTodo(id) { list.querySelector($__bt[data-id="$__{id}"]$__bt)?.remove(); }
function toggleTodo(id) { console.log("done", id); }
~~~

- deleteTodo بتبني selector زي [[[data-id="1"]]] بـ template literal، وتدوّر بيه جوه الليستة، و [[?.remove()]] تشيله لو لقته (لو مش موجود [[?.]] بتوقف من غير error).
- toggleTodo مثال بيطبع بس.

---

## ٢. listener واحد على الأب

~~~text app.js
list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn || !list.contains(btn)) return;
  const id = btn.closest("li").dataset.id;
  if (btn.dataset.action === "delete") deleteTodo(id);
  if (btn.dataset.action === "done") toggleTodo(id);
});
~~~

أي ضغطة في أي حتة جوه الـ ul هتوصل هنا. نمشي سطر سطر:

### [[e.target.closest("button[data-action]")]]

[[e.target]] العنصر اللي اتضغط فعلًا، ممكن يكون الـ span جوه الزرار. [[closest(selector)]] بتبدأ من العنصر نفسه وتطلع لأبوه وجده لحد ما تلاقي أول واحد مطابق، ولو ملقتش ترجّع null.

### [[if (!btn || !list.contains(btn)) return;]]

- [[!btn]]: الضغطة مش على زرار أو جواه (مثلًا على كلام الـ li)، اخرج.
- [[list.contains(btn)]]: الزرار جوه الليستة دي؟ احتياط لو الـ closest طلعت لزرار برّه الليستة.
- [[||]] = «أو»، و [[return]] جوه الـ handler معناها «خلّص هنا».

### [[btn.closest("li").dataset.id]]

من الزرار اطلع لأقرب li، وخد [[data-id]] بتاعه. لاحظ إنه string: [["1"]].

### آخر سطرين

[[btn.dataset.action]] هي قيمة [[data-action]]: يا [["delete"]] يا [["done"]]، ونادي الدالة المناسبة.

---

## ٣. عنصر بيتضاف بعدين

~~~text app.js
list.insertAdjacentHTML("beforeend", '<li data-id="9">جديد <button data-action="delete">x</button></li>');
~~~

[[insertAdjacentHTML]] بتضيف HTML في مكان معيّن من غير ما تعيد بناء الموجود (عكس [[innerHTML +=]]). و [[beforeend]] يعني جوه العنصر في الآخر. محدش حط listener للزرار الجديد.

---

## ٤. التجربة

طبعت [[e.target.tagName]] في أول الـ handler، وضغطت بالترتيب:

~~~text الناتج
الـ li الموجودة: 1,9
ضغطة على ✓ في 1          target: BUTTON  →  done 1
ضغطة على الـ x (span) في 1  target: SPAN    →  action: delete id: 1
الـ li الموجودة: 9
ضغطة على كلام li 9        target: LI      →  (ولا حاجة: return)
ضغطة على x في 9           target: BUTTON  →  action: delete id: 9
الـ li الموجودة: (فاضية)
~~~

اللي تاخده من الجدول:

1. الضغطة على الـ span: target كان SPAN، و closest طلعت للزرار، فاشتغل. لو كنا استخدمنا [[e.target.dataset.action]] مباشرة كانت هتبقى undefined ومفيش حاجة تحصل.
2. الضغطة على الكلام: closest رجّعت null، فالـ return اشتغل.
3. li 9 اتضافت **بعد** الـ listener، وزرارها اشتغل عادي.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| listener على الأب | واحد بس، والعناصر الجديدة شغالة لوحدها |
| [[e.target]] | اللي اتضغط فعلًا (ممكن يكون جوه الزرار) |
| [[closest(sel)]] | اطلع لأقرب أب مطابق |
| [[list.contains(btn)]] | اتأكد إنه جوه الليستة دي |
| [[data-action]] و [[data-id]] | الزرار بيقول هو مين وعايز إيه |

> أحداث زي focus و blur و mouseenter مبتعملش bubble، فالـ delegation معاها بـ focusin و focusout و mouseover.`,
          lines: [
            "الليستة الأب.",
            R`مسح عنصر بالـ id. [[?.]] لو مش موجود.`,
            "تعليم إنه خلص (مثال).",
            "listener واحد على الأب.",
            R`[[closest]] بتطلع من العنصر اللي اتضغط لحد أول زرار ليه [[data-action]].`,
            "الضغطة مش على زرار (أو زرار برا الليستة): تجاهلها.",
            R`هات الـ id من الـ [[li]] اللي فيه الزرار.`,
            "نفّذ حسب نوع الزرار.",
            "نفس الكلام.",
            "قفلة.",
            "عنصر جديد اتضاف بعد الـ listener، وزراره شغال لوحده."
          ],
          sol: R`الضغط على delete في العنصر الأخير بيشيله فورًا، مع إن الـ listener اتحط على الـ [[<ul>]] قبل ما العنصر يتعمل: الـ click بيطلع (bubbling) من الزرار للـ ul، والـ listener هناك بيعرف مين اتضغط من [[e.target]].

لما تحط [[<span>x</span>]] جوه الزرار وتضغط على الـ x: [[e.target]] بيبقى الـ SPAN مش الـ BUTTON، و [[e.target.dataset.action]] بـ undefined، فمفيش حاجة بتحصل. [[closest("button[data-action]")]] بتطلع من الـ span لأقرب زرار فوقيه، فبتشتغل مهما ضغطت على أي حاجة جوه. ده بالظبط سبب إنها موجودة، وسؤال انترفيو مشهور: «ليه e.target مش دايمًا العنصر اللي حاطط عليه البيانات؟».`
        },
        {
          cmd: "اعرض داتا من fetch",
          title: "تعرض ليستة من API بحالات loading و empty و error",
          desc: R`ده الدرس اللي بيربط كل اللي فات: تجيب JSON من API بـ [[fetch]]، وترسمه في الصفحة، وتعرض ٣ حالات غير النجاح: بيحمّل (loading)، ومفيش داتا (empty)، وحصلت مشكلة (error). أي شاشة حقيقية فيها الحالات الأربعة دي، ولو نسيت واحدة اليوزر هيشوف صفحة فاضية ومش فاهم.

الـ HTML فيه [[<ul id="list">]] و [[<p id="status">]] و [[<template id="row">]]. الـ [[<template>]] حتة HTML مش بتتعرض، بتنسخها بـ [[content.cloneNode(true)]] لكل عنصر وتملاها بـ [[textContent]]، فالشكل يفضل في الـ HTML والداتا بتدخل بأمان من غير innerHTML.

[[fetch]] و [[await]] هتتشرح بالتفصيل في المستوى ٢ (قسم async). دلوقتي كفاية تعرف إن [[await]] معناها «استنى النتيجة»، وإنها بتشتغل جوه [[async function]].`,
          example: R`// HTML: <p id="status"></p> <ul id="list"></ul> <button id="reload">حدّث</button>
// <template id="row"><li><strong></strong> — <span></span></li></template>
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const tpl = document.querySelector("#row");
function setStatus(text, kind = "") {
  statusEl.textContent = text;
  statusEl.className = kind;
}
function render(users) {
  listEl.replaceChildren();
  if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty");
  setStatus("");
  for (const u of users) {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector("span").textContent = u.email;
    listEl.append(row);
  }
}
async function load() {
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
  }
}
document.querySelector("#reload").addEventListener("click", load);
load();`,
          try: R`اعمل [[index.html]] بالـ HTML اللي في أول سطرين و [[<script src="app.js" defer>]]، وافتحه بسيرفر محلي ([[npx serve]] أو Live Server). جرّب الحالات الأربعة: عادي، وغيّر الـ URL لـ [[/users?id=999]] (empty)، وغيّره لـ [[/nope]] (error بـ 404)، وافصل النت من DevTools ← Network ← Offline واضغط «حدّث». وبعدين زوّد: الزرار يتعطّل وهو بيحمّل، وفي حالة الـ error يظهر زرار «جرّب تاني».`,
          flag: "script",
          deep: {
            why: "الـ DOM لوحده (querySelector و textContent) مبيعملش تطبيق. التطبيق الحقيقي بيجيب داتا من سيرفر ويعرضها، والجزء اللي المبتدئين بينسوه هو الحالات اللي مش «كله تمام». ده بالظبط اللي React و TanStack Query بيعملوه (isLoading و isError و data)، فلما تكتبه بإيدك مرة هتفهم هما بيحلوا إيه.",
            how: R`الترتيب: [[load()]] تحط «بيحمّل» فورًا (قبل ما الشبكة ترد)، وبعدين [[await fetch]]. [[fetch]] مش بترمي error لو السيرفر رد بـ 404 أو 500، بترمي بس لو الشبكة نفسها وقعت. عشان كده [[if (!res.ok) throw]] بنفسك، فالحالتين يروحوا للـ [[catch]]. و [[res.json()]] كمان ممكن ترمي لو الرد مش JSON.

[[render]] بتمسح القديم بـ [[replaceChildren()]] (من غير arguments بتفضّي العنصر)، وتفحص الـ empty قبل الرسم، وبعدين تنسخ الـ template لكل يوزر. [[cloneNode(true)]] بترجّع DocumentFragment، و [[append]] بتنقل محتواه للّيستة.

[[textContent]] مش [[innerHTML]]: الأسماء جاية من API، ولو فيها [[<img onerror>]] هتظهر كنص (درس textContent و classList). و [[className = kind]] بيخلي الـ CSS يلوّن كل حالة ([[.error { color: red }]]).

لو ضغطت «حدّث» مرتين بسرعة، الطلبين شغالين والأبطأ هو اللي بيكسب حتى لو هو القديم (race condition). الحل الكامل [[AbortController]] (درس «fetch و AbortController» في المستوى ٢)، والبسيط إنك تعطّل الزرار وهو بيحمّل.`,
            when: R`أي صفحة بتعرض داتا من API من غير framework: dashboard صغيرة، أو widget، أو extension. ولما تنقل لـ React، نفس الحالات الأربعة هتفضل موجودة (تاب React).`,
            mistakes: R`تنسى [[res.ok]] فالـ 404 تتعامل كنجاح و [[res.json()]] تقع برسالة غريبة. و «بيحمّل» تفضل ظاهرة للأبد لأنك مسحتها في حالة النجاح بس (حط المسح في الحالتين أو في [[finally]]). ومفيش empty state فاليوزر يشوف صفحة فاضية. وتبني الـ HTML بـ template literal و innerHTML بداتا من API (XSS). وفي الانترفيو: «إيه الحالات اللي لازم أي شاشة بتجيب داتا تتعامل معاها؟».`
          },
          teach: R`## الفكرة في سطرين

البرنامج بيطلب ليستة يوزرز من API، ويرسمها في الصفحة، وطول الوقت بيقول لليوزر الصفحة في أنهي حالة: بتحمّل، أو فاضية، أو فيها مشكلة، أو تمام. الكود مقسوم ٣ دوال: [[setStatus]] (سطر الحالة)، و [[render]] (الرسم)، و [[load]] (الطلب). شغّلته في Chrome headless من سيرفر محلي، وطلب الـ API الحقيقي [[jsonplaceholder.typicode.com]] (API مجاني فيه داتا وهمية للتجارب).

---

## ١. الـ HTML

~~~text index.html
<p id="status"></p> <ul id="list"></ul> <button id="reload">حدّث</button>
<template id="row"><li><strong></strong> — <span></span></li></template>
<script src="app.js" defer></script>
~~~

[[<template>]] tag خاص: المتصفح بيقراه بس **مش بيعرضه**. هو «قالب» لشكل الصف، هننسخه لكل يوزر.

---

## ٢. نمسك العناصر

~~~text app.js
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const tpl = document.querySelector("#row");
~~~

[[El]] في آخر الاسم عادة عشان تفتكر إن ده عنصر DOM مش داتا.

---

## ٣. [[setStatus]]

~~~text app.js
function setStatus(text, kind = "") {
  statusEl.textContent = text;
  statusEl.className = kind;
}
~~~

- [[kind = ""]]: default، لو مبعتّوش يبقى string فاضي.
- [[className = kind]]: بيستبدل كل كلاسات العنصر بالكلاس ده ([[loading]] أو [[empty]] أو [[error]] أو ولا حاجة)، فالـ CSS يقدر يلوّن كل حالة.

---

## ٤. [[render]]: الرسم

~~~text app.js
function render(users) {
  listEl.replaceChildren();
  if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty");
  setStatus("");
  for (const u of users) {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector("span").textContent = u.email;
    listEl.append(row);
  }
}
~~~

1. [[replaceChildren()]] من غير arguments: فضّي الليستة من أي رسم قديم.
2. **empty state**: لو الـ array فاضية، اكتب الرسالة و [[return]] عشان منكملش. ([[return setStatus(...)]] اختصار لسطرين: نادي واخرج.)
3. فيه داتا: امسح سطر الحالة.
4. لكل يوزر: [[tpl.content]] محتوى الـ template، و [[cloneNode(true)]] نسخة منه، و [[true]] يعني انسخ كل اللي جواه كمان. اللي بيرجع **DocumentFragment** (جرّبت: [[constructor.name]] طلع DocumentFragment): صندوق مؤقت فيه الـ li.
5. نملا الـ strong بالاسم والـ span بالإيميل بـ [[textContent]]، فلو API رجّع اسم فيه HTML هيظهر كنص (درس textContent).
6. [[append(row)]] بينقل الـ li من الصندوق للّيستة.

---

## ٥. [[load]]: الطلب

~~~text app.js
async function load() {
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
  }
}
~~~

- [[async function]]: دالة مسموح جواها [[await]].
- **loading state** أول حاجة، قبل ما الشبكة ترد.
- [[fetch(url)]]: اطلب الـ URL، و [[await]] يعني استنى الرد. [[res]] (response) فيه [[status]] (رقم زي 200 أو 404) و [[ok]] (true لو الرقم بين 200 و 299).
- [[if (!res.ok) throw ...]]: fetch مبترميش error على 404 أو 500. جرّبت: [[fetch(".../nope")]] رجّعت [[404 false]] والـ body [[{}]] من غير أي error. فاحنا بنرمي بنفسنا عشان نروح للـ catch.
- [[await res.json()]]: اقرا الـ body وحوّله من JSON، وابعته لـ render.
- **error state** في الـ catch: امسح أي داتا قديمة واكتب الرسالة.

---

## ٦. آخر سطرين

~~~text app.js
document.querySelector("#reload").addEventListener("click", load);
load();
~~~

الزرار بيعيد التحميل، و [[load()]] بتبدأ أول ما الصفحة تفتح.

---

## ٧. الحالات الأربعة في التجربة

| التجربة | سطر الحالة | الكلاس | عدد الـ li |
|---|---|---|---|
| أول ما الصفحة تفتح | بيحمّل... | loading | 0 |
| الـ URL العادي | (فاضي) | (ولا حاجة) | 10، أولهم Leanne Graham |
| [[/users?id=999]] | مفيش يوزرز لسه | empty | 0 |
| [[/nope]] | حصلت مشكلة: HTTP 404 | error | 0 |
| Offline وضغطت «حدّث» | حصلت مشكلة: Failed to fetch | error | 0 |

[[Failed to fetch]] هي رسالة Chrome لما الشبكة نفسها مش موجودة. ولو شلت سطر [[res.ok]]، الـ [[{}]] بتاع 404 بيروح لـ render: [[users.length]] بـ undefined فمش 0، وبعدين [[for...of]] على object:

~~~text الناتج
TypeError: users is not iterable
~~~

---

## ٨. حل «جرّب» (الـ solCode)

الحل بيضيف ٣ حاجات على load:

- [[btn.disabled = true]] في الأول: الزرار بيتعطّل وهو بيحمّل (جرّبت: [[disabled]] كانت true وقت التحميل).
- [[finally { btn.disabled = false; }]]: [[finally]] بيتنفذ بعد الـ try أو الـ catch في كل الحالات، فالزرار بيرجع مهما حصل (بقت false بعد النجاح وبعد الفشل).
- في الـ catch: زرار «جرّب تاني» بـ createElement، و [[statusEl.append(" ", retry)]] بتحط مسافة وبعدها الزرار جنب الرسالة.

~~~text الناتج: Offline ثم Online وضغطت «جرّب تاني»
حصلت مشكلة: Failed to fetch <button>جرّب تاني</button>
(بعد الضغط)  سطر الحالة فاضي، و 10 يوزرز
~~~

---

## الخلاصة

| الحالة | إمتى | في الكود |
|---|---|---|
| loading | قبل الرد | أول سطر في load |
| success | فيه داتا | render |
| empty | array فاضية | الـ if في render |
| error | شبكة، أو HTTP غلط، أو JSON بايظ | catch (مع [[res.ok]]) |

> fetch مبترميش على 404 و 500، بترمي بس لو الشبكة وقعت. [[res.ok]] دايمًا.`,
          lines: [
            "الليستة.",
            "سطر الحالة.",
            R`الـ [[<template>]] اللي هننسخه.`,
            "دالة صغيرة تغيّر نص الحالة وشكلها.",
            "النص.",
            R`كلاس زي [[loading]] أو [[error]] يلوّنه CSS.`,
            "قفلة.",
            "الرسم.",
            "امسح اللي كان مرسوم قبل كده.",
            R`empty state: مفيش داتا، قول كده واخرج.`,
            "فيه داتا: امسح سطر الحالة.",
            "لكل يوزر.",
            R`نسخة جديدة من الـ template (DocumentFragment).`,
            "املاها بـ textContent: آمن.",
            "والإيميل.",
            "ضيفها للّيستة.",
            "قفلة الـ loop.",
            "قفلة.",
            R`[[async]] عشان نقدر نستخدم [[await]] جواها.`,
            "loading state قبل أي حاجة.",
            "أي خطأ جوه الـ try هيروح للـ catch.",
            "اطلب واستنى الرد.",
            R`404 و 500 مش errors عند fetch: ارميها بنفسك.`,
            R`حوّل الرد لـ JSON وارسمه.`,
            R`error state: شبكة وقعت، أو HTTP غلط، أو JSON بايظ.`,
            "امسح أي داتا قديمة عشان متتلخبطش مع رسالة الخطأ.",
            "اعرض الرسالة.",
            "قفلة.",
            "قفلة.",
            "زرار «حدّث» بيعيد التحميل.",
            "حمّل أول ما الصفحة تفتح."
          ],
          sol: R`الحالات الأربعة: عادي هتشوف ١٠ يوزرز (jsonplaceholder بيرجّع ١٠)، و [[?id=999]] بيرجّع [[[]]] فتظهر «مفيش يوزرز لسه»، و [[/nope]] بيطلع «حصلت مشكلة: HTTP 404»، و Offline بيطلع «حصلت مشكلة: Failed to fetch» (الرسالة بتختلف شوية بين المتصفحات، في Firefox «NetworkError when attempting to fetch resource.»).

لو شيلت سطر [[if (!res.ok)]] وجرّبت [[/nope]]: السيرفر بيرد بـ [[{}]] مش array، فـ [[users.length]] بـ undefined، والـ loop [[for...of]] على object بيرمي «users is not iterable». يعني الخطأ بيطلع في مكان تاني وبرسالة مالهاش علاقة بالسبب الحقيقي.

للزرار: في أول [[load]] اعمل [[btn.disabled = true]]، وفي [[finally]] رجّعه false. و «جرّب تاني»: زرار جوه سطر الحالة بيظهر بس في الـ error ويستدعي [[load]]. الكود تحت بيحل محل [[load]] القديمة، وباقي الملف زي ما هو (و [[setStatus]] بتمسح الزرار في المحاولة الجاية لأن [[textContent]] بيمسح كل اللي جوه العنصر).`,
          solCode: R`const btn = document.querySelector("#reload");
async function load() {
  btn.disabled = true;
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
    const retry = document.createElement("button");
    retry.textContent = "جرّب تاني";
    retry.addEventListener("click", load);
    statusEl.append(" ", retry);
  } finally {
    btn.disabled = false;
  }
}`
        },
        {
          cmd: "FormData و URLSearchParams",
          title: "تقرا فورم وتبعته أو تحطه في الـ URL إزاي؟",
          desc: R`الفورم في HTML لوحده بيعمل submit ويعمل reload للصفحة. عشان تتحكم فيه بـ JS: اسمع لـ [[submit]] على الفورم (مش click على الزرار)، واعمل [[e.preventDefault()]]، واقرا القيم بـ [[new FormData(form)]]: بتجيب كل input ليه [[name]].

[[fd.get("q")]] قيمة واحدة، و [[fd.getAll("tag")]] كل القيم لنفس الاسم (checkboxes). ولو عايز تحوّلها query string زي [[?q=قهوة&tag=hot]] استخدم [[new URLSearchParams(fd)]]: بتعمل الـ encoding صح للعربي والمسافات والـ [[&]].

وتبعتها للسيرفر بطريقتين: [[fetch(url, { method: "POST", body: fd })]] كـ multipart (لازم لو فيه ملفات)، أو [[JSON.stringify(Object.fromEntries(fd))]] مع [[Content-Type: application/json]].`,
          example: R`// HTML: <form id="search"><input name="q" required> <label><input type="checkbox" name="tag" value="hot"> سخن</label>
// <label><input type="checkbox" name="tag" value="new"> جديد</label> <button>دوّر</button></form>
const form = document.querySelector("#search");
const initial = new URLSearchParams(location.search);
form.elements.q.value = initial.get("q") ?? "";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  console.log(fd.get("q"), fd.getAll("tag"));
  const params = new URLSearchParams(fd);
  params.set("page", "1");
  history.replaceState(null, "", "?" + params);
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const res = await fetch("/api/search?" + params);
    console.log(res.status, params.toString());
  } finally {
    btn.disabled = false;
  }
});`,
          try: R`اعمل الفورم ده، واكتب «قهوة سادة»، وعلّم الاتنين checkboxes، واضغط Enter. بص على الـ URL وعلى تاب Network: شكل الـ query string إيه؟ اعمل refresh: الـ input لسه فيه الكلمة؟ وبعدين في Node جرّب [[new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" }).toString()]] وشوف الـ encoding.`,
          flag: "script",
          deep: {
            why: "كل فورم في أي موقع (login، بحث، checkout) محتاج نفس الخطوات: امنع الـ reload، واقرا القيم، واتأكد منها، وابعتها، وامنع الضغط المزدوج. ولو البحث والفلاتر في الـ URL، اليوزر يقدر يعمل refresh أو يبعت اللينك لحد ويشوف نفس النتيجة.",
            how: R`[[submit]] بيحصل بالضغط على أي زرار جوه الفورم (الـ [[<button>]] الافتراضي نوعه submit) وبـ Enter في أي input. وقبله المتصفح بيعمل الـ validation بتاع HTML ([[required]] و [[type="email"]] و [[minlength]])، ولو فيه غلط مش هيطلق الحدث أصلًا. لو عايز تعمل submit من JS بنفس الـ validation استخدم [[form.requestSubmit()]] مش [[form.submit()]] (دي بتنط الـ validation والـ event).

[[FormData]] بتاخد كل عنصر ليه [[name]] ومش [[disabled]]: الـ checkbox بيتاخد بس لو متعلّم وقيمته [[value]] بتاعه (أو "on")، والـ [[<select multiple>]] بيدّي كذا قيمة. و [[form.elements.q]] بيوصلك للعنصر اللي [[name="q"]] (فيه كمان اختصار [[form.q]]، بس بيتضرب لو عندك input اسمه زي خاصية في الفورم نفسه زي [[submit]] أو [[action]]).

[[URLSearchParams]] بيعمل encoding بطريقة الفورمز: المسافة [[+]] والعربي [[%D9%82...]]. [[set]] بتستبدل، و [[append]] بتضيف قيمة كمان لنفس المفتاح. و [[history.replaceState]] بيغيّر الـ URL من غير reload ومن غير ما يضيف خطوة في الـ back (لو عايز back يرجع للبحث اللي قبله استخدم [[pushState]]، في المستوى ٣).

لما تبعت FormData كـ body متحطش Content-Type بنفسك: المتصفح بيحط [[multipart/form-data; boundary=...]] والـ boundary لازم يبقى فيه.`,
            when: R`أي فورم من غير framework. وحتى في React/Next، FormData هي اللي بتوصل لـ server actions ([[<form action={fn}>]])، و URLSearchParams هي اللي تحت [[useSearchParams]].`,
            mistakes: R`input من غير [[name]] فمش بيظهر في FormData. و [[Content-Type: multipart/form-data]] بإيدك فالسيرفر مش لاقي الـ boundary. و [[Object.fromEntries(fd)]] مع checkboxes بنفس الاسم: بياخد آخر قيمة بس. وتبني الـ query بـ [[$__bt?q=$__{q}$__bt]] من غير encoding فأي [[&]] في البحث يكسر الـ URL. وتنسى إن الـ validation في المتصفح للراحة بس، والسيرفر لازم يتحقق تاني (تاب Backend بـ Node).`
          },
          teach: R`## الفكرة في سطرين

فورم بحث: input للكلمة و checkboxes للفلاتر. لما اليوزر يدوّر، الكود بيقرا القيم بـ [[FormData]]، ويحوّلها query string بـ [[URLSearchParams]]، ويحطها في الـ URL، ويبعت الطلب، والزرار متعطّل لحد ما الرد ييجي. جرّبت الفورم في Chrome headless من سيرفر محلي (مفيهوش [[/api/search]]، فالرد 404 وده متوقع)، والـ solCode في Node 24.

---

## ١. الـ HTML

~~~text index.html
<form id="search">
  <input name="q" required>
  <label><input type="checkbox" name="tag" value="hot"> سخن</label>
  <label><input type="checkbox" name="tag" value="new"> جديد</label>
  <button>دوّر</button>
</form>
~~~

- [[name]] هو المفتاح اللي هيظهر في FormData. input من غير name مش هيتقري.
- الـ checkboxes الاتنين ليهم **نفس الاسم** tag، وكل واحد ليه [[value]].
- [[required]]: المتصفح مش هيبعت الفورم والـ input فاضي.
- [[<button>]] جوه فورم نوعه الافتراضي submit.

---

## ٢. ترجّع البحث القديم من الـ URL

~~~text app.js
const form = document.querySelector("#search");
const initial = new URLSearchParams(location.search);
form.elements.q.value = initial.get("q") ?? "";
~~~

- [[location.search]]: الجزء من الـ URL من أول [[?]]، زي [[?q=...&tag=hot]].
- [[new URLSearchParams(...)]] بتفكه لمفاتيح وقيم، و [[get("q")]] بترجّع القيمة **بعد فك الـ encoding** (عربي عادي)، أو null لو مش موجودة.
- [[?? ""]]: لو null حط نص فاضي.
- [[form.elements.q]]: العنصر اللي [[name="q"]] جوه الفورم. ([[form.elements.tag]] بقى RadioNodeList لأن فيه اتنين بنفس الاسم.)

---

## ٣. الـ submit

~~~text app.js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  console.log(fd.get("q"), fd.getAll("tag"));
~~~

- [[async (e) =>]]: الـ handler نفسه async عشان هنعمل await جواه.
- [[preventDefault]]: من غيرها المتصفح هيعمل reload.
- [[fd.get("q")]] أول قيمة للاسم ده، و [[fd.getAll("tag")]] **كل** القيم في array، والـ checkbox بيتحسب بس لو متعلّم.

لما ضغطت Enter والـ input فاضي، الـ handler **مشتغلش**، ورسالة المتصفح كانت [[Please fill out this field.]]. ولما كتبت «قهوة سادة» وعلّمت الاتنين:

~~~text الناتج
قهوة سادة ["hot","new"]
~~~

---

## ٤. query string

~~~text app.js
  const params = new URLSearchParams(fd);
  params.set("page", "1");
  history.replaceState(null, "", "?" + params);
~~~

- [[new URLSearchParams(fd)]]: نفس الداتا، بس بتعرف تتكتب كـ query string.
- [[set("page", "1")]]: حط المفتاح (ولو موجود استبدله). القيم strings، عشان كده [["1"]].
- [[history.replaceState(state, title, url)]]: غيّر الـ URL في شريط العنوان **من غير reload** ومن غير خطوة جديدة في Back. أول اتنين مش مهمين هنا ([[null]] و [[""]]).
- [[+ params]]: لما تجمع string مع URLSearchParams، JS بينادي [[toString()]] لوحده.

الـ URL بعد Enter:

~~~text الناتج
http://127.0.0.1:52765/form.html?q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1
~~~

نقراه: [[&]] بتفصل المفاتيح، و tag اتكرر مرتين، والمسافة بقت [[+]]، وكل حرف عربي بقى bytes الـ UTF-8 بتاعته (كل حرف عربي = ٢ بايت، زي [[%D9%82]] = ق). ده الـ **encoding**: عشان الـ URL يتبعت بحروف آمنة بس.

---

## ٥. الطلب والزرار

~~~text app.js
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const res = await fetch("/api/search?" + params);
    console.log(res.status, params.toString());
  } finally {
    btn.disabled = false;
  }
});
~~~

- [[disabled = true]]: اليوزر ميقدرش يضغط تاني والطلب لسه شغال.
- [[fetch("/api/search?" + params)]]: GET على نفس السيرفر.
- [[finally]]: بيتنفذ في النجاح وفي الفشل، فالزرار بيرجع دايمًا.

~~~text الناتج
404 q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1
~~~

وبعد reload للصفحة الـ input رجع فيه «قهوة سادة» (من خطوة ٢)، والـ checkboxes لأ.

---

## ٦. الـ solCode في Node

~~~text app.js
const p = new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" });
console.log(p.toString());
~~~

~~~text الناتج
q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&sort=price%26desc
~~~

الـ [[&]] اللي **جوه** القيمة بقت [[%26]]، فمبقتش تتلخبط مع الفاصل.

~~~text app.js
p.append("tag", "hot");
p.append("tag", "new");
console.log(p.getAll("tag"), p.get("q"));
~~~

~~~text الناتج
[ 'hot', 'new' ] قهوة سادة
~~~

[[append]] بتضيف قيمة كمان لنفس المفتاح، و [[set]] كانت هتمسح القديم (جرّبت [[p.set("tag", "x")]] فبقى فيه tag=x بس).

~~~text app.js
const fd = new FormData();
fd.append("q", "قهوة");
fd.append("tag", "hot");
fd.append("tag", "new");
console.log(new URLSearchParams(fd).toString(), Object.fromEntries(fd));
~~~

~~~text الناتج
q=%D9%82%D9%87%D9%88%D8%A9&tag=hot&tag=new { q: 'قهوة', tag: 'new' }
~~~

FormData موجودة في Node كمان. والمهم: [[Object.fromEntries]] خدت **آخر** tag بس، لأن الـ object ميقدرش يشيل مفتاحين بنفس الاسم. للقيم المتكررة استخدم [[getAll]].

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تقرا الفورم | [[new FormData(form)]] (الحقول اللي ليها name) |
| قيمة / كل القيم | [[get]] / [[getAll]] |
| query string بـ encoding صح | [[new URLSearchParams(fd)]] |
| تستبدل / تضيف | [[set]] / [[append]] |
| تقرا الـ URL الحالي | [[new URLSearchParams(location.search)]] |
| تغيّر الـ URL من غير reload | [[history.replaceState(null, "", "?" + params)]] |
| تمنع الضغط المزدوج | [[disabled]] + [[finally]] |`,
          lines: [
            "الفورم.",
            "اقرا الـ query string الحالي من الـ URL.",
            R`رجّع البحث القديم في الـ input بعد refresh. [[form.elements.q]] هو الـ input اللي اسمه q.`,
            R`[[submit]] مش click: بيشتغل بـ Enter كمان، وبعد الـ validation.`,
            "امنع الـ reload.",
            R`كل الـ inputs اللي ليها [[name]].`,
            R`[[get]] قيمة واحدة، و [[getAll]] array للـ checkboxes.`,
            "حوّلها query string بـ encoding صح.",
            R`[[set]] بتستبدل أو تضيف مفتاح.`,
            "حط البحث في الـ URL من غير reload.",
            "الزرار.",
            "عطّله عشان الضغط المزدوج.",
            "try عشان نرجّع الزرار مهما حصل.",
            R`ابعت. [[+ params]] بتنادي [[toString()]] لوحدها.`,
            "اطبع الـ status والـ query.",
            R`[[finally]]: بيتنفذ في النجاح والفشل.`,
            "رجّع الزرار.",
            "قفلة.",
            "قفلة الـ listener."
          ],
          sol: R`بعد Enter الـ URL بيبقى [[?q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1]]: المسافة بقت [[+]]، والعربي بقى bytes بـ UTF-8، و [[tag]] اتكرر مرتين. المتصفح في شريط العنوان ممكن يعرضه عربي مقروء بس اللي بيتبعت هو الـ encoded. الـ console بتطبع [[قهوة سادة [ 'hot', 'new' ] ]] وبعدها رقم الـ status (غالبًا 404 لأن [[/api/search]] مش موجود عندك، وده طبيعي).

بعد refresh الـ input فيه «قهوة سادة» لأن السطر التالت بيقراها من الـ URL. (الـ checkboxes مش هترجع: ده تمرين زيادة بـ [[initial.getAll("tag")]].)

وفي Node: [[q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&sort=price%26desc]]. لاحظ [[&]] بقت [[%26]]، فمبقتش بتتلخبط مع الفاصل بين المفاتيح.`,
          solCode: R`const p = new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" });
console.log(p.toString());
p.append("tag", "hot");
p.append("tag", "new");
console.log(p.getAll("tag"), p.get("q"));
const fd = new FormData();
fd.append("q", "قهوة");
fd.append("tag", "hot");
fd.append("tag", "new");
console.log(new URLSearchParams(fd).toString(), Object.fromEntries(fd));`
        },
        {
          cmd: "defer و async و module",
          title: "تحط الـ script فين، وإيه الفرق بين defer و async و type=module؟",
          desc: R`[[<script src="app.js">]] العادي في الـ [[<head>]] بيوقّف قراية الـ HTML لحد ما الملف يتحمّل ويشتغل. ودي مشكلتين: الصفحة بتتأخر، والكود مش لاقي العناصر (querySelector بترجّع null).

[[defer]]: حمّل في الخلفية، وشغّل بعد ما الـ HTML يخلص، بالترتيب اللي في الصفحة، وقبل [[DOMContentLoaded]]. ده الافتراضي الصح لكود الصفحة بتاعك.

[[async]]: حمّل في الخلفية، وشغّل أول ما يوصل، في أي ترتيب، حتى لو الـ HTML لسه بيتقري. مناسب لسكربتات مستقلة زي analytics.

[[type="module"]]: بيتصرف زي defer لوحده، وكمان بيسمح بـ [[import]] و [[export]]، و strict mode، والمتغيرات مش global.`,
          example: R`<script src="https://example.com/analytics.js" async></script>
<script src="app.js" defer></script>
<script type="module" src="main.js"></script>
<script>
  console.log("inline:", document.readyState);
  document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));
  window.addEventListener("load", () => console.log("load"));
</script>`,
          try: R`اعمل [[index.html]] فيه السطور دي في الـ [[<head>]] (شيل سطر analytics)، واعمل [[app.js]] فيه [[console.log("app.js", document.querySelector("h1"))]] و [[main.js]] فيه نفس السطر بـ "main.js"، وحط [[<h1>]] في الـ body. خمّن ترتيب الـ logs، وبعدين افتح Console. وبعدين شيل [[defer]] من app.js وشوف إيه اللي اتغير.`,
          flag: "script",
          deep: {
            why: "«الكود شغال لو حطيته في آخر الـ body ومش شغال في الـ head» من أشهر حيرات المبتدئين. ولما الصفحة بطيئة، أول حاجة بيبص عليها أي حد في الأداء هي السكربتات اللي بتوقف الـ parsing (render-blocking).",
            how: R`المتصفح بيقرا الـ HTML من فوق لتحت ويبني الـ DOM. [[<script>]] عادي بيوقّف ده: يحمّل، وينفّذ، ويكمّل. عشان كده زمان كانوا بيحطوه في آخر الـ [[<body>]].

[[defer]] و [[type="module"]] بيدخلوا نفس الطابور: بيتحمّلوا بالتوازي مع الـ parsing، وبيتنفذوا بترتيبهم في الصفحة بعد ما الـ parsing يخلص، وبعدهم [[DOMContentLoaded]]. فـ [[app.js]] قبل [[main.js]] لأنه قبله في الصفحة. [[async]] ملوش ترتيب: أي وقت يوصل يتنفذ، ممكن قبل الـ DOM ما يكمل.

الترتيب في المثال: inline (بيطبع [["loading"]] لأنه شغال والـ HTML لسه بيتقري) ← app.js ← main.js ← DOMContentLoaded ← load. و [[load]] بتستنى كل الصور والـ CSS والـ iframes، فهي متأخرة كتير. عشان كده الكود اللي محتاج العناصر يستخدم defer (أو DOMContentLoaded)، مش load.

[[defer]] و [[async]] بيشتغلوا بس مع [[src]]؛ على inline script بيتجاهلوا. الـ module script الـ inline كمان deferred. والـ modules بتتحمّل بـ CORS، فمش هتشتغل من [[file://]]: لازم سيرفر محلي.`,
            when: R`[[type="module"]] لأي كود جديد (Vite بيعمل كده لوحده). [[defer]] لسكربت قديم مش module. [[async]] لسكربتات طرف تالت مستقلة. وفي Next.js ده متحكم فيه بـ [[next/script]] و strategy.`,
            mistakes: R`script عادي في الـ head بيقرا عنصر فيلاقيه null. و [[async]] لكود بيعتمد على كود تاني (jQuery ثم plugin): الترتيب مش مضمون. و [[window.onload]] لكل حاجة فالصفحة تستنى الصور. وتفتح ملف فيه module بدبل كليك ([[file://]]) فيطلع CORS error. وفي الانترفيو: «الفرق بين defer و async؟» والإجابة: الاتنين بيحمّلوا في الخلفية، defer بيستنى الـ HTML وبيحافظ على الترتيب، و async لأ.`
          },
          teach: R`## الفكرة في سطرين

المتصفح بيقرا الـ HTML من فوق لتحت، وكل ما يقابل [[<script>]] لازم يقرر: يقف يشغّله دلوقتي، ولا يكمّل ويشغّله بعدين؟ الكلمات [[defer]] و [[async]] و [[type="module"]] هي اللي بتقوله. جرّبت ده في Chrome headless بالصفحة دي من سيرفر محلي (من غير سطر analytics):

~~~text index.html
<head>
  <script src="app.js" defer></script>
  <script type="module" src="main.js"></script>
  <script>
    console.log("inline:", document.readyState);
    document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));
    window.addEventListener("load", () => console.log("load"));
  </script>
</head>
<body><h1>Hi</h1></body>
~~~

و [[app.js]] و [[main.js]] كل واحد فيه سطر بيطبع اسمه و [[document.querySelector("h1")]].

---

## ١. السطور واحد واحد

### [[<script src="..." async>]]

حمّل الملف في الخلفية والـ HTML بيتقري عادي، وأول ما يوصل **نفّذه فورًا**، حتى لو الـ HTML لسه مخلصش، ومن غير ترتيب مع باقي السكربتات. مناسب لحاجة مستقلة زي analytics.

### [[<script src="app.js" defer>]]

defer = أجّل. حمّل في الخلفية، ونفّذ **بعد** ما الـ HTML كله يتقري، وبترتيب السكربتات في الصفحة.

### [[<script type="module" src="main.js">]]

module بيتأجّل لوحده زي defer، وكمان: بيسمح بـ [[import]] و [[export]]، والكود فيه strict mode، والمتغيرات اللي فيه مش global. جرّبت أطبع [[this]] في أعلى main.js وطلع [[undefined]] (في الـ script العادي بيبقى window).

### الـ inline script

- [[document.readyState]]: حالة الصفحة: [["loading"]] (لسه بيتقري) أو [["interactive"]] أو [["complete"]].
- [[DOMContentLoaded]]: حدث على document، بيحصل لما الـ HTML يخلص وكل سكربتات defer و module تشتغل.
- [[load]]: حدث على window، بيستنى كمان الصور والـ CSS وكل حاجة.

---

## ٢. الترتيب الحقيقي

~~~text الناتج: Chrome
inline: loading
app.js <h1>Hi</h1>
main.js <h1>Hi</h1>
DOMContentLoaded
load
~~~

1. inline اتنفذ في مكانه فورًا، والـ HTML لسه بيتقري ([[loading]]).
2. app.js و main.js استنوا الـ HTML يخلص، فلاقيوا الـ h1، وبالترتيب اللي في الصفحة.
3. بعدهم DOMContentLoaded، وفي الآخر load.

---

## ٣. من غير defer

شلت [[defer]] من app.js:

~~~text الناتج: Chrome
app.js null
inline: loading
main.js <h1>Hi</h1>
DOMContentLoaded
load
~~~

app.js اشتغل **أول ما المتصفح قابله** في الـ head، والـ body لسه متقراش، فـ querySelector رجّعت [[null]]. ده الـ bug الشهير «الكود مش لاقي العنصر». و main.js لسه تمام لأنه module.

---

## ٤. فتح الملف بدبل كليك ([[file://]])

~~~text الناتج: Chrome
inline: loading
Access to script at 'file:///C:/Users/ali/.../main.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
Failed to load resource: net::ERR_FAILED
app.js <h1>Hi</h1>
DOMContentLoaded
load
~~~

الـ modules بتتحمّل بقواعد CORS، والصفحة المفتوحة من ملف ملهاش origin ([[null]])، فـ main.js اترفض خالص. app.js العادي اشتغل. الحل سيرفر محلي ([[npx serve]] أو Live Server).

---

## الخلاصة

| النوع | بيوقف قراية الـ HTML؟ | بيتنفذ إمتى | الترتيب |
|---|---|---|---|
| [[<script>]] عادي | أيوه | فورًا | مكانه |
| [[async]] | لأ | أول ما يتحمّل | مش مضمون |
| [[defer]] | لأ | بعد الـ HTML، قبل DOMContentLoaded | بترتيب الصفحة |
| [[type="module"]] | لأ | زي defer | بترتيب الصفحة، ومحتاج http |

> defer و async بيشتغلوا مع [[src]] بس؛ على script inline بيتجاهلوا.`,
          lines: [
            R`[[async]]: يتنفذ أول ما يوصل، من غير ترتيب.`,
            R`[[defer]]: بعد الـ HTML، بالترتيب.`,
            R`module: deferred لوحده، وفيه import.`,
            "inline script عادي.",
            R`بيطبع [["loading"]]: الـ HTML لسه بيتقري.`,
            "بعد ما الـ HTML يخلص والـ defer يشتغلوا.",
            R`[[load]]: بعد الصور والـ CSS كمان، متأخر.`,
            "قفلة."
          ],
          sol: R`الترتيب: [[inline: loading]] ← [[app.js <h1>]] ← [[main.js <h1>]] ← [[DOMContentLoaded]] ← [[load]]. الاتنين لاقيين الـ h1 لأنهم استنوا الـ HTML.

لما تشيل [[defer]]: [[app.js]] بيطلع الأول وبيطبع [[app.js null]]، لأنه اشتغل وهو في الـ head قبل ما المتصفح يوصل للـ body. ده بالظبط الـ bug الشهير. و main.js لسه تمام لأن module = deferred.

لو فتحت الملف بدبل كليك هتلاقي main.js مشتغلش وفيه error عن CORS أو origin: الـ modules محتاجة [[http://]]، استخدم [[npx serve]] أو Live Server.`
        }
      ]
    }
]);
