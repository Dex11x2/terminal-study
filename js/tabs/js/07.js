// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الـ DOM",
      l: 1,
      n: "تمسك عناصر الصفحة وتعدّلها، وتسمع للـ events، و event delegation",
      projects: [
        { lvl: 'صغير', t: R`عدّاد كلمات حي`, what: R`صفحة فيها textarea وتحتها عدد الحروف والكلمات والسطور، وبيتحدث وانت بتكتب بـ event [[input]]، ولو عدّيت ٢٨٠ حرف الرقم يبقى أحمر بـ [[classList]]. من دروس querySelector و textContent و addEventListener.`, done: R`الأرقام صح على نص فاضي (٠ كلمات مش ١)، وعلى مسافات كتير ورا بعض، وعلى لصق نص طويل، واللون بيرجع عادي لما تمسح تحت ٢٨٠.` },
        { lvl: 'صغير', t: R`الوضع الليلي اللي بيفتكر`, what: R`زرار بيعمل toggle لكلاس [[dark]] على الـ body، والاختيار بيتخزّن في [[localStorage]] وبيتقري أول ما الصفحة تفتح، والسكربت بـ [[defer]]. من دروس textContent و classList و defer و async و module، و JSON.`, done: R`تختار غامق وتعمل refresh: الصفحة بتفتح غامقة ونص الزرار صح. ولو مسحت الـ localStorage من DevTools بتفتح فاتحة من غير error.` },
        { lvl: 'متوسط', t: R`todo list كاملة`, what: R`فورم بيضيف مهمة (submit و [[preventDefault]] و [[FormData]])، وكل مهمة ليها done و delete بـ event delegation، وعدّاد «فاضل كام»، وفلتر الكل والمتبقي واللي خلص، وحالة empty لما الليستة فاضية. كل النصوص بـ [[textContent]]. من كل دروس الوحدة.`, done: R`مهمة فاضية أو مسافات بس مبتتضافش، و [[<img src=x onerror=alert(1)>]] بتظهر كنص ومفيش alert، والعدّاد صح بعد أي خليط عمليات، وفي الكود listener واحد بس للضغطات على الليستة.` },
        { lvl: 'متوسط', t: R`دليل يوزرز بفلتر في الـ URL`, what: R`صفحة بتجيب يوزرز من API بـ [[fetch]] وبتعرضهم بـ [[<template>]]، مع حالات loading و empty و error وزرار «جرّب تاني»، وفورم بحث وترتيب بيقرا بـ [[FormData]] ويحط الاختيار في الـ URL بـ [[URLSearchParams]]. من دروس اعرض داتا من fetch و FormData و URLSearchParams.`, done: R`اللينك [[?q=le&sort=name]] بيفتح الليستة متفلترة ومترتبة، والـ Offline بيطلع رسالة وزرار جرّب تاني شغال لما الشبكة ترجع، والبحث مبيعملش request جديد.` },
        { lvl: 'كبير', t: R`صفحة منتجات وسلة متينة`, what: R`[[products.json]] محلي بتجيبه بـ [[fetch]] من سيرفر محلي، وبتعرض الكروت من [[<template>]]، وفلتر بالقسم والسعر من فورم متزامن مع الـ URL، و «ضيف للسلة» بـ event delegation، والسلة (object أو Map من الـ id للكمية) بتتحفظ في localStorage بـ [[safeParse]]. التحقق: الكمية من ١ لـ ١٠، والسعر في الـ JSON لازم رقم (المنتج اللي سعره مش رقم بيتساب وبيطبع [[console.warn]]). وكل خطوة مهمة بتتكتب في Console بـ [[console.info]]. من الوحدة دي ووحدة الـ objects.`, done: R`الحالات دي كلها شغالة ومتجرّبة بإيدك: [[products.json]] مش موجود (404) بيطلع رسالة و «جرّب تاني»؛ JSON بايظ في localStorage الصفحة بتفتح بسلة فاضية؛ منتج اسمه [[<script>]] بيظهر كنص؛ refresh بيرجّع نفس الفلتر ونفس السلة؛ ومجموع السلة صح بعد ما تزوّد وتشيل.`, ext: R`زوّد صفحة «السلة» بـ [[pushState]] (هتيجي في APIs المتصفح)، وكود خصم، وتحويل العملة بـ [[Intl.NumberFormat]].` },
        { lvl: 'فكرة', t: R`أداة صغيرة لحاجة بتعملها كل يوم`, what: R`اختار حاجة بتعملها بإيدك على الويب (تحسب حاجة، تنظّم لينكات، تتابع مذاكرة، تعمل قايمة مشتريات) واعملها صفحة واحدة: فورم للإدخال، وليستة بـ delegation، وفلتر، وبتفتكر بعد الـ refresh. انت اللي بتقرر الشكل والخصايص.`, done: R`بتستخدمها فعلًا أسبوع، ومفيش ولا [[innerHTML]] فيه داتا من اليوزر، وبتشتغل من سيرفر محلي من غير errors في Console.`, ext: R`زوّد تصدير واستيراد JSON بملف، واختصارات كيبورد بـ [[keydown]]، وخلّيها PWA بعد قسم PWA.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`افتح أي موقع، وفي Console اعدّ الصور اللي مالهاش alt: [[document.querySelectorAll("img:not([alt])").length]]. وبعدين جرّب [[.map]] مباشرة على نتيجة [[querySelectorAll]].`, done: R`بيطلع رقم، ولو حطيت [[alt]] لصورة منهم من تاب Elements العدد بيقل واحد. و [[.map]] بتطلع [[TypeError: document.querySelectorAll(...).map is not a function]]: الـ NodeList فيها forEach بس، فلازم [[[...list] ]] الأول.` },
            { lvl: 'تطبيق', t: R`صفحة فيها كروت منتجات [[<div class="card" data-price="120">]] (اعمل ٤). اجمع الأسعار كلها بـ [[querySelectorAll]] و [[dataset.price]] و [[reduce]]، وطلّع اسم أغلى كارت.`, done: R`المجموع اللي بيتطبع بيساوي مجموع الأرقام اللي كاتبها في الـ HTML (مش نصوص متلزقة جنب بعض زي [["12080"]])، ولو زوّدت كارت خامس الرقم بيتغير لوحده.` },
            { lvl: 'تحدي', t: R`اكتب helper [[qs(selector, root = document)]] بترمي Error فيه الـ selector لو مفيش عنصر بدل ما ترجّع null، و [[qsa(selector, root)]] بترجّع array حقيقية. واستخدمهم في صفحة فيها فورم وجواه inputs.`, done: R`[[qs("#nope")]] بترمي Error رسالته فيها [[#nope]] (فبتعرف فورًا أنهي selector غلط)، و [[qsa("li").map((li) => li.textContent)]] شغالة، و [[qs("input", form)]] بتدوّر جوه الفورم بس.` },
          ],
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
            R`[[querySelector]] بتاخد CSS selector وترجّع **أول** عنصر بيطابقه في الصفحة، أو [[null]] لو مفيش. هنا أول [[h1]]، حتى لو الصفحة فيها كذا واحد.`,
            R`[[#]] في الـ selector معناها id، فده العنصر اللي [[id="login-form"]]. الـ [[#]] لازم: من غيرها هيدوّر على tag اسمه [[login-form]] ويرجّع [[null]].`,
            R`المسافة بين الاتنين معناها «جوه»: عنصر عليه كلاس [[price]] في أي مستوى جوه عنصر عليه كلاس [[card]]. أي selector بتكتبه في CSS ينفع هنا بنفس الشكل.`,
            R`الأقواس المربعة بتدوّر بالـ attribute: العنصر اللي [[data-id]] بتاعه [["42"]]. مفيد لما كل عنصر في الـ HTML شايل id من الداتا في [[data-*]].`,
            R`[[querySelectorAll]] بترجّع **كل** العناصر اللي بتطابق في NodeList، و [[length]] عددهم. لو مفيش ولا واحد بترجّع NodeList فاضية (طولها 0) مش [[null]]، فمفيش error.`,
            R`الـ NodeList عندها [[forEach]]، فبنلف عليها مباشرة ونطبع نص كل [[li]]. وهي static: لو ضفت [[li]] بعد كده مش هيظهر فيها، لازم تنادي [[querySelectorAll]] تاني.`,
            R`بس الـ NodeList مش array ومفيهاش [[map]] ولا [[filter]]، فـ [[...]] بتحوّلها array الأول، وبعدها [[map]] بتطلّع الـ [[href]] بتاع كل لينك. ([[Array.from()]] بتعمل نفس التحويل.)`,
            R`الطريقة القديمة بالـ id، ولسه شغالة وسريعة. خد بالك إنها بتاخد الـ id من غير [[#]]: [[getElementById("#app")]] هترجّع [[null]].`,
            R`[[querySelector]] موجودة على أي عنصر مش [[document]] بس، فهنا بتدوّر جوه الفورم ده بس على الـ input اللي [[name]] بتاعه [[email]]. و [[?.]] عشان لو مفيش فورم [[form]] هيبقى [[null]] والنداء عليه كان هيرمي TypeError.`,
            R`في Console بتاع DevTools بس: [[$0]] هو العنصر اللي انت مختاره دلوقتي في تبويب Elements، فتجرّب عليه أي سطر من اللي فوق بسرعة. متكتبهاش في كود حقيقي، لأنها مش موجودة برّه الـ Console.`,
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
          practice: [
            { lvl: 'سريع', t: R`زرار «الوضع الليلي»: كل ضغطة بتعمل [[classList.toggle("dark")]] على [[document.body]] وبتغيّر نص الزرار بـ [[textContent]] لـ «فاتح» أو «غامق».`, done: R`الألوان بتتبدل مع كل ضغطة، و [[document.body.classList.contains("dark")]] في Console بترجّع [[true]] و [[false]] بالتبادل، ونص الزرار دايمًا عكس الوضع الحالي.` },
            { lvl: 'تطبيق', t: R`todo صغيرة: input وزرار «ضيف» بيعملوا [[li]] جديد بـ [[createElement]] و [[textContent]] و [[append]]. جرّب تكتب [[<b>hi</b>]] في الـ input.`, done: R`الـ li بيظهر فيه [[<b>hi</b>]] كنص بالحروف مش bold، و [[li.children.length]] بترجّع [[0]]. ولو غيّرتها لـ [[innerHTML]] الكلمة بتبقى bold: يعني أي حد يقدر يحط HTML في صفحتك.` },
            { lvl: 'تحدي', t: R`على ليستة مهام، كل [[li]] جنبه زرار ✓ بيعمل toggle لكلاس [[done]]، وفوق الليستة عدّاد «٢ من ٥ خلصوا» بيتحسب من [[querySelectorAll("li.done").length]]، وبيتخزّن في [[data-count]] على العنوان.`, done: R`العدّاد بيتحدث مع كل ضغطة ومع كل مهمة جديدة، و [[h1.dataset.count]] بيساوي الرقم اللي في النص، ولو شلت كلاس done من Elements بإيدك وضغطت أي زرار العدّاد بيصلّح نفسه.` },
          ],
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
            R`العنصر اللي [[id]] بتاعه [[todos]]، الليستة اللي هنضيف فيها المهام. بنحفظه في متغير مرة واحدة، ولو الـ id غلط هيبقى [[null]] وأول استخدام ليه هيرمي TypeError.`,
            R`أول [[h1]] في الصفحة، وده اللي هنغيّر نصه وشكله في السطور اللي جاية.`,
            R`[[textContent]] بتحط نص عادي: أي [[<]] أو [[>]] بيظهر كحروف ومبيتحوّلش HTML، فده الآمن مع أي داتا جاية من اليوزر. وبتمسح أي حاجة كانت جوه العنصر قبلها.`,
            R`[[classList.add]] بتضيف كلاس على العنصر من غير ما تلمس الكلاسات اللي عليه. لو كتبت [[className = "big"]] بدلها هتمسح كل الكلاسات القديمة وتسيب دي بس.`,
            R`[[toggle]]: لو الكلاس موجود بتشيله، ولو مش موجود بتضيفه، وبترجّع [[true]] لو بقى موجود. مناسبة لزرار فتح وقفل أو «المهمة خلصت».`,
            R`[[dataset]] بيقرا ويكتب الـ attributes اللي بتبدأ بـ [[data-]]: السطر ده بيعمل [[data-count="3"]] على العنصر. القيم دايمًا strings، والاسم بيتحوّل: [[dataset.userId]] تبقى [[data-user-id]].`,
            R`[[style]] بيحط CSS inline على العنصر مباشرة، والـ inline بيكسب على قواعد ملف الـ CSS العادية. ينفع لقيم بتتحسب وقت التشغيل زي عرض progress bar، لكن للشكل الثابت الأحسن كلاس في CSS وتضيفه بـ [[classList]].`,
            R`[[createElement]] بتعمل عنصر [[li]] جديد في الميموري، بس لسه مش في الصفحة ومحدش شايفه لحد ما تضيفه.`,
            R`نص العنصر الجديد بـ [[textContent]] برضه، فلو النص ده جاي من اليوزر محدش يقدر يحقن HTML فيه.`,
            R`[[append]] بتدخّل العنصر في آخر الليستة، وساعتها بس بيظهر في الصفحة. وتقدر تديها كذا عنصر مرة واحدة: [[list.append(a, b)]].`,
            R`نص شكله بريء بس هو HTML: صورة [[src]] بتاعها غلط، فالـ [[onerror]] بيشتغل وينفّذ JavaScript. ده نوع الكلام اللي أي حد يقدر يكتبه في خانة اسم أو تعليق.`,
            R`[[innerHTML]] بيعامل النص كـ HTML، فالـ [[img]] اتعملت والـ [[onerror]] نفّذ [[alert]]: ده XSS، وبدل alert ممكن يسرق التوكن أو يبعت طلبات باسم اليوزر. وكمان [[+=]] بتبني محتوى الليستة كله من جديد، فالـ listeners اللي على العناصر القديمة بتضيع. استخدم [[createElement]] و [[textContent]] زي اللي فوق.`,
            R`[[remove]] بتشيل العنصر من الصفحة، وهنا بتشيل أول [[li]] في الليستة. ده نسخة جديدة مش الـ [[li]] اللي عملناه: [[innerHTML +=]] اللي فوق عمل العناصر من النص من جديد، فالمتغير [[li]] بقى بيشاور على عنصر برّه الصفحة.`,
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
          practice: [
            { lvl: 'سريع', t: R`textarea وتحتها [[<p>]] بيكتب عدد الحروف وانت بتكتب، باستخدام event [[input]].`, done: R`الرقم بيتغير مع كل حرف، ومع المسح، ومع اللصق بالماوس (اللي [[keydown]] كان هيفوّته).` },
            { lvl: 'تطبيق', t: R`modal: زرار «افتح» بيشيل [[hidden]] من الـ dialog، وزرار × بيرجّعه. وأول ما يتفتح ضيف [[keydown]] على [[document]] بيقفله لما [[e.key === "Escape"]]، وشيل الـ listener ده بـ [[removeEventListener]] لما يتقفل.`, done: R`Esc بتقفل المودال، وحط [[console.log]] في handler الـ keydown: وهو مقفول مبيطبعش حاجة لو دوست أي زرار، يعني الـ listener اتشال فعلًا (لأنك بعت نفس الدالة مش arrow جديدة).` },
            { lvl: 'تحدي', t: R`فورم تسجيل فيه باسورد وتأكيد باسورد: الـ submit بيعمل [[preventDefault]] لو الباسورد أقل من ٨ حروف أو التأكيد مختلف، وبيكتب رسالة الغلط تحت الـ input نفسه، والرسالة بتختفي أول ما تصلّح (event [[input]]) من غير ما تدوس submit تاني.`, done: R`فورم غلط مبيعملش reload والـ URL متغيرش، والرسالة بتظهر تحت الحقل الغلط بس، وبتختفي وانت بتكتب أول ما الشرط يتحقق، وفورم صح بيطبع الداتا في Console.` },
          ],
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
            R`الزرار اللي [[id="save"]]. بنحفظه في متغير عشان هنضيف ونشيل عليه listeners أكتر من مرة.`,
            R`أول [[form]] في الصفحة، عشان نسمع لـ [[submit]] بتاعه تحت.`,
            R`دالة ليها اسم بدل arrow مكتوبة جوه النداء، عشان [[removeEventListener]] محتاجة نفس الدالة بالظبط. المتصفح بيناديها ويبعتلها object الـ [[event]] فيه تفاصيل اللي حصل.`,
            R`[[event.target]] هو العنصر اللي اتضغط فعلًا. لو جوه الزرار [[span]] أو أيقونة وضغطت عليها، [[target]] هيبقى الـ span؛ أما [[event.currentTarget]] فدايمًا العنصر اللي عليه الـ listener (الزرار).`,
            R`نهاية [[onSave]].`,
            R`[[addEventListener]] بتسجّل [[onSave]] تتنادى مع كل ضغطة. بنبعت الدالة نفسها من غير أقواس: لو كتبت [[onSave()]] كانت هتتنادى فورًا مرة واحدة ويتسجّل اللي رجّعته ([[undefined]]).`,
            R`[[removeEventListener]] بتشيل الـ listener، ولازم نفس اسم الحدث ونفس الدالة بالظبط. لو كنت سجّلت arrow مكتوبة جوه النداء مش هتعرف تشيلها، لأن أي arrow تانية زيها في الشكل دالة جديدة.`,
            R`[[once: true]] بتخلي الـ listener يشتغل أول ضغطة بس ويتشال لوحده، فمش محتاج تحفظ الدالة ولا تنادي remove.`,
            R`[[submit]] على الفورم بيشتغل بالضغط على زرار الإرسال وبـ Enter جوه أي input، وبعد ما validation الـ HTML (زي [[required]]) تعدّي. عشان كده نسمع لـ submit على الفورم مش لـ click على الزرار.`,
            R`من غير السطر ده الفورم بيعمل reload للصفحة (أو يروح للـ [[action]] بتاعه) وكل اللي في الصفحة يضيع. [[preventDefault()]] بتلغي التصرف ده عشان نتعامل إحنا مع الداتا بالـ JavaScript.`,
            R`[[new FormData(form)]] بتقرا كل الـ inputs اللي ليها [[name]]، و [[Object.fromEntries]] بتحوّلها object زي [[{ email: "..." }]]. الـ input اللي مالوش [[name]] مش هيظهر، ولو فيه اسم متكرر (checkboxes) هتفضل آخر قيمة بس.`,
            R`بيطبع الـ object في الـ console، فتشوف بالظبط الداتا اللي كنت هتبعتها للسيرفر.`,
            R`نهاية الـ submit listener.`,
            R`حدث [[input]] بيشتغل مع كل تغيير في القيمة (كل حرف، والـ paste، والمسح)، عكس [[change]] اللي في خانات الكتابة بيستنى لحد ما تسيب الخانة. مناسب للبحث وانت بتكتب أو للـ validation الفوري.`,
            R`[[e.target.value]] هي اللي اليوزر كاتبها دلوقتي، ودايمًا string حتى في [[type="number"]]، فلو محتاجها رقم حوّلها بـ [[Number()]].`,
            R`نهاية الـ input listener.`,
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
          practice: [
            { lvl: 'سريع', t: R`[[ul]] فيها ٥ [[li]]: حط listener واحد على الـ ul بيطبع [[textContent]] بتاع الـ li اللي اتضغط بـ [[e.target.closest("li")]]. وبعدين ضيف li سادس من Console.`, done: R`الضغط على أي واحد بيطبع نصه، والسادس اللي اتضاف بعدين بيطبع برضه، والضغط على الفراغ في الـ ul برّه أي li مبيطبعش حاجة ومبيطلعش error.` },
            { lvl: 'تطبيق', t: R`todo list: كل li فيه زرارين [[data-action="done"]] و [[data-action="delete"]]، وفورم بيضيف مهام جديدة. كل الضغطات بـ listener واحد على الـ ul.`, done: R`delete على مهمة لسه مضافة بيشيلها، و done بيعمل toggle للكلاس، وفي الكود كله [[addEventListener("click"]] مكتوبة مرة واحدة بس.` },
            { lvl: 'تحدي', t: R`tabs: أزرار [[button[data-tab="..."]]] جوه [[nav]]، وكل زرار جواه [[<span>]] أيقونة ونص. listener واحد على الـ nav بيدّي كلاس [[active]] للزرار اللي اتضغط ويظهر اللوحة اللي الـ id بتاعها زي [[data-tab]] ويخفي الباقي.`, done: R`الضغط على الأيقونة نفسها بيشتغل زي الضغط على الزرار (لأن [[e.target]] هنا الـ span و [[closest]] بتطلع للزرار)، وفي أي وقت فيه لوحة واحدة بس ظاهرة وزرار واحد بس عليه [[active]].` },
          ],
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

## ٥. تفاصيل الـ delegation: اللي بيكسرها واللي بيصلّحها

ليستة فيها زرار جواه [[<b>]]، وخانة [[input]]. وعلى الـ [[ul]] أربع listeners. اتشغّل فعلًا على jsdom 30 و Node 24.22.1:

~~~js
list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  log.push($__btclick: target=$__{e.target.tagName} currentTarget=$__{e.currentTarget.id} btn=$__{btn?.dataset.action}$__bt);
});
list.addEventListener('focus', () => log.push('focus على الأب (bubble)'));
list.addEventListener('focusin', (e) => log.push('focusin: ' + e.target.name));
list.addEventListener('focus', (e) => log.push('focus بـ capture: ' + e.target.name), { capture: true });

document.querySelector('b').click();
document.querySelector('button').addEventListener('click', (e) => e.stopPropagation());
document.querySelector('b').click();
document.querySelector('input').focus();
~~~

~~~text الناتج
click: target=B currentTarget=list btn=delete
focus بـ capture: qty
focusin: qty
~~~

| اللي اتشاف | معناه |
|---|---|
| [[target=B]] و [[currentTarget=list]] | [[e.target]] أعمق عنصر اتضغط، و [[e.currentTarget]] العنصر اللي عليه الـ listener (الـ ul). عشان كده [[closest]] بتبدأ من [[target]] |
| تاني ضغطة **مطلعتش** سطر | [[stopPropagation]] على الزرار وقفت الـ bubbling قبل ما يوصل للـ ul، فالـ delegation بطلت تشتغل من غير أي error |
| [[focus]] العادي ماوصلش للأب | [[focus]] و [[blur]] مبيعملوش bubble |
| [[focusin]] وصل | ده الـ focus اللي بيعمل bubble، واستخدمه مع الـ delegation |
| [[focus]] بـ [[{ capture: true }]] وصل | الـ capture بيمسك الحدث وهو **نازل** للعنصر، فبيشتغل حتى مع الأحداث اللي مبتطلعش |

**والقاعدة في [[stopPropagation]]:** متستخدمهاش عشان «تمنع الضغطة توصل لحتة تانية» إلا لو مفيش حل تاني، لأن أي delegation فوق (بتاعتك، أو analytics، أو فريمورك) بتقف من غير ما حد يعرف. لو عايز تمنع سلوك المتصفح (submit أو فتح لينك) فده [[preventDefault]] مش [[stopPropagation]]. ولو عايز الـ listener اللي فوق يتجاهل حاجة، خليه هو يفحص بـ [[closest]].

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
            R`الليستة الأب. هنحط عليها listener واحد بدل listener على كل زرار جواها.`,
            R`بتدوّر جوه الليستة على العنصر اللي [[data-id]] بتاعه هو الـ id ده وتشيله. [[?.]] عشان لو مش موجود [[querySelector]] ترجّع [[null]] و [[remove]] عليها كانت هترمي TypeError.`,
            R`مكان تعليم المهمة إنها خلصت. هنا بتطبع بس، وفي تطبيق حقيقي هتغيّر الـ state وتعيد الرسم.`,
            R`listener واحد على الأب. الضغطة على أي حاجة جوه الليستة بتطلع لفوق (event bubbling) لحد ما توصل لـ [[list]]، فالـ listener ده بيشوف كل الضغطات، حتى على العناصر اللي هتتضاف بعدين.`,
            R`[[e.target]] ممكن يكون حاجة جوه الزرار (أيقونة مثلًا)، فـ [[closest]] بتبدأ من العنصر اللي اتضغط نفسه وتطلع لفوق لحد أول [[button]] عليه [[data-action]]، أو ترجّع [[null]] لو مفيش.`,
            R`لو الضغطة مش على زرار ([[btn]] بقى [[null]]) نخرج. و [[list.contains]] بتتأكد إن الزرار جوه الليستة فعلًا، لأن [[closest]] ممكن تطلع برّه الليستة وتلاقي زرار في عنصر أكبر شايلها.`,
            R`الزرار نفسه مفيهوش الـ id، فبنطلع للـ [[li]] اللي شايله وناخد [[data-id]] بتاعه من [[dataset.id]]. القيمة دي string حتى لو شكلها رقم.`,
            R`[[dataset.action]] بتقرا [[data-action]] من الزرار وتحدد هنعمل إيه: الزرار اللي مكتوب عليه [["delete"]] بينادي [[deleteTodo]].`,
            R`واللي عليه [["done"]] بينادي [[toggleTodo]]. نوع زرار جديد = سطر زي ده، من غير ما تسجّل listeners جديدة.`,
            R`نهاية الـ listener.`,
            R`بنضيف [[li]] جديد بزرار مسح بعد ما الـ listener اتسجّل، والزرار ده شغّال من غير ما نسجّل عليه حاجة لأن الـ listener على الأب. ودي أهم ميزة في الـ delegation. و [[insertAdjacentHTML]] بتعامل النص كـ HTML، فمتحطش فيها داتا جاية من اليوزر.`,
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
          practice: [
            { lvl: 'سريع', t: R`بعد ما الليستة تتحمّل، اكتب في [[#status]] عدد اليوزرز اللي اتعرضوا («١٠ يوزر» مثلًا)، وزوّد في كل سطر اسم الشركة من [[u.company.name]].`, done: R`الرقم اللي في الـ status بيساوي [[users.length]] (اطبعه في Console وقارن)، وكل سطر فيه اسم الشركة، ولو الـ API رجّع لستة فاضية الـ status بيقول «مفيش يوزرز لسه» مش «٠ يوزر».` },
            { lvl: 'تطبيق', t: R`زوّد input بحث فوق الليستة بيفلتر اليوزرز المتحمّلين بالاسم وانت بتكتب، من غير fetch جديد: خزّن الداتا في متغير مرة واحدة، و [[render]] الجزء المفلتر بس.`, done: R`الكتابة مبتعملش ولا request جديد في تاب Network، والبحث مش حسّاس للحروف الكبيرة، ولو مفيش نتيجة بيظهر «مفيش نتايج لـ «الكلمة»» والكلمة مكتوبة فيه بـ [[textContent]].` },
            { lvl: 'تحدي', t: R`لما تضغط على يوزر (event delegation على الليستة) هات بوستاته من [[/posts?userId=ID]] واعرضهم تحته، بحالات loading و error لليوزر ده لوحده، والزرار يبقى [[disabled]] وهو بيحمّل عشان الضغطتين ورا بعض ميبعتوش طلبين.`, done: R`ضغطتين بسرعة بيعملوا request واحد بس في Network، و Offline من DevTools بيطلّع رسالة error تحت اليوزر ده بس والباقي سليم، وضغطة تانية بعد ما الشبكة ترجع بتجيب البوستات.` },
          ],
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
            R`الليستة اللي هنرسم فيها اليوزرز. بنجيبها مرة واحدة فوق بدل ما ندوّر عليها في كل رسمة.`,
            R`سطر الحالة اللي هيقول لليوزر «بيحمّل» أو «مفيش داتا» أو «حصلت مشكلة»، عشان الصفحة متبقاش فاضية وساكتة ومحدش فاهم فيه إيه.`,
            R`الـ [[<template>]]: HTML مكتوب في الصفحة بس مبيترسمش، بنستخدمه قالب للصف وننسخه لكل يوزر. أنضف وأأمن من بناء الصف بـ strings و [[innerHTML]].`,
            R`دالة صغيرة لسطر الحالة، عشان كل حالة (loading و empty و error) تتعمل بنفس الطريقة في سطر واحد. [[kind = ""]] قيمة default لو مبعتناش نوع.`,
            R`الرسالة بتتحط بـ [[textContent]]، فحتى رسالة خطأ جاية من برّه متتحوّلش HTML.`,
            R`[[className]] بتستبدل كل الكلاسات بالكلاس ده ([[loading]] أو [[error]] أو [[empty]])، والـ CSS بيلوّن السطر على حسبه. الاستبدال هنا مقصود، عشان كلاس الحالة القديمة يتشال لوحده.`,
            R`نهاية [[setStatus]].`,
            R`[[render]] بتاخد array اليوزرز وترسمهم. فصلناها عن التحميل عشان الرسم حاجة والشبكة حاجة، وتقدر تجرّب الرسم بداتا مزيّفة من غير سيرفر.`,
            R`[[replaceChildren()]] من غير arguments بتمسح كل اللي جوه الليستة. من غيرها كل ضغطة «حدّث» هتضيف اليوزرز تاني تحت القديم فيتكرروا.`,
            R`empty state: الطلب نجح بس رجّع array فاضية، فبنقول ده صراحة بدل صفحة فاضية. و [[return]] بتخرج من الدالة فمش هنوصل للـ loop.`,
            R`فيه داتا، فبنمسح سطر الحالة عشان «بيحمّل» متفضلش ظاهرة جنب اليوزرز.`,
            R`بنلف على كل يوزر في الـ array ونعمله صف.`,
            R`[[tpl.content]] هو محتوى الـ template كـ [[DocumentFragment]]، و [[cloneNode(true)]] بتعمل نسخة جديدة منه بكل اللي جواه ([[true]] = انسخ العناصر اللي جوه كمان). من غير [[true]] النسخة هتطلع فاضية.`,
            R`بندوّر جوه النسخة على [[strong]] ونحط فيه الاسم بـ [[textContent]]: لو اسم اليوزر فيه HTML هيظهر كنص ومش هيتنفّذ.`,
            R`والإيميل في الـ [[span]] بنفس الطريقة الآمنة.`,
            R`[[append]] بتنقل محتوى النسخة جوه الليستة. بعد السطر ده الـ fragment بيفضى، فلو عملت [[row.querySelector]] بعده هترجّع [[null]]: املا الأول وبعدين ضيف.`,
            R`نهاية الـ loop.`,
            R`نهاية [[render]].`,
            R`[[async]] بتخلي الدالة ترجّع Promise وتسمح بـ [[await]] جواها، فنكتب الكود اللي بيستنى الشبكة من فوق لتحت زي الكود العادي.`,
            R`loading state قبل أي حاجة: اليوزر يعرف إن فيه حاجة شغالة بدل ما يفتكر إن الصفحة بايظة ويضغط تاني.`,
            R`أي error جوه الـ [[try]] (شبكة وقعت، أو [[throw]] بتاعنا، أو JSON بايظ) بيقفز على [[catch]] بدل ما يوقف الكود ويسيب الصفحة على «بيحمّل».`,
            R`[[fetch]] بتبعت GET للـ URL، و [[await]] بتستنى لحد ما الرد يبدأ يوصل وترجّع object الـ [[Response]] (الـ status والـ headers). الـ body لسه متقريش.`,
            R`[[fetch]] مش بترمي error مع 404 أو 500، بترمي بس لو الشبكة نفسها فشلت. فبنشيك على [[res.ok]] (بيبقى [[true]] لما الـ status من 200 لـ 299) ونرمي بنفسنا عشان نروح للـ catch.`,
            R`[[res.json()]] بتقرا الـ body وتعمله parse، وهي كمان Promise فمحتاجة [[await]]. وبعدها الـ array بتروح لـ [[render]].`,
            R`error state: بنوصل هنا لو الشبكة وقعت، أو الـ status غلط، أو الـ JSON بايظ. و [[err]] فيه رسالة اللي حصل.`,
            R`بنمسح أي يوزرز من تحميل قبل كده، عشان اليوزر ميشوفش داتا قديمة جنب رسالة الخطأ ويفتكرها جديدة.`,
            R`بنعرض رسالة فيها [[err.message]] (زي [[HTTP 500]]) بكلاس [[error]] اللي الـ CSS بيلوّنه.`,
            R`نهاية الـ catch.`,
            R`نهاية [[load]].`,
            R`زرار «حدّث» بينادي [[load]] تاني: نفس الدالة بكل حالاتها، فالـ loading والـ error بيشتغلوا في إعادة التحميل كمان. بنبعت [[load]] من غير أقواس عشان تتنادى وقت الضغطة مش دلوقتي.`,
            R`أول تحميل أول ما السكريبت يشتغل، من غير ما اليوزر يضغط حاجة.`,
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
          practice: [
            { lvl: 'سريع', t: R`في Node أو Console: [[const p = new URLSearchParams("?q=js&tag=a&tag=b")]] واطبع [[p.get("tag")]] و [[p.getAll("tag")]] و [[p.toString()]].`, done: R`[[get]] بترجّع [["a"]] (أول واحدة بس)، و [[getAll]] بترجّع [[[ 'a', 'b' ] ]]، و [[toString()]] بترجّع [["q=js&tag=a&tag=b"]] من غير علامة الاستفهام.` },
            { lvl: 'تطبيق', t: R`فلتر منتجات في صفحة: فورم فيه [[select]] للقسم و checkbox «المتاح بس». الـ submit بيقرا القيم بـ [[FormData]]، ويخفي الكروت اللي مش مطابقة بـ [[hidden]]، ويحط الفلتر في الـ URL بـ [[history.replaceState]]، ولما الصفحة تفتح بيقرا الـ URL ويطبّق الفلتر.`, done: R`بعد الفلتر الـ URL شكله [[?cat=cups&available=on]]، و refresh بيرجّع نفس الكروت ونفس اختيارات الفورم، ولو بعت اللينك لنفسك في تاب جديد بيفتح متفلتر.` },
            { lvl: 'تحدي', t: R`[[Object.fromEntries(fd)]] بتضيّع الـ checkboxes اللي ليها نفس الاسم. اكتب [[formToObject(fd)]] بتخلي أي اسم متكرر array، والأسامي اللي ظاهرة مرة واحدة تفضل string.`, done: R`على FormData فيها [[q=x]] و [[tag=hot]] و [[tag=new]]: [[Object.fromEntries(fd)]] بترجّع [[{ q: 'x', tag: 'new' }]] (آخر واحدة كسبت)، و [[formToObject(fd)]] بترجّع [[{ q: 'x', tag: [ 'hot', 'new' ] }]].` },
          ],
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
            R`فورم البحث اللي [[id="search"]]، هنسمع لـ submit بتاعه ونقرا خاناته.`,
            R`[[location.search]] هو الجزء اللي بعد [[?]] في الـ URL (زي [[?q=js&page=1]])، و [[URLSearchParams]] بتفكه وتعمل decode للحروف، فتقرا كل مفتاح بالاسم بدل ما تقطّع الـ string بإيدك.`,
            R`[[form.elements.q]] هو الـ input اللي [[name="q"]]. بنحط فيه البحث اللي في الـ URL، فلو اليوزر عمل refresh أو بعت اللينك لحد البحث يفضل موجود. [[get]] بترجّع [[null]] لو مفيش [[q]]، و [[?? ""]] بتسيب الخانة فاضية بدل ما يتكتب فيها null.`,
            R`[[submit]] مش click: بيشتغل بـ Enter كمان، وبعد ما validation الـ HTML تعدّي. والـ listener [[async]] عشان هنعمل [[await]] جواه.`,
            R`من غيرها المتصفح هيعمل reload ويبعت الفورم بنفسه، والكود اللي تحت مش هيلحق يشتغل.`,
            R`[[FormData]] بتاخد كل الـ inputs اللي ليها [[name]] (ومش disabled) بقيمها في اللحظة دي. الـ input اللي مالوش name مش هيتبعت خالص، ودي غلطة شائعة.`,
            R`[[get]] بترجّع أول قيمة للاسم ده، و [[getAll]] بترجّع array بكل القيم، ودي اللي تحتاجها مع checkboxes كتير بنفس [[name="tag"]]. لو استخدمت [[get]] معاهم هتاخد أول واحدة بس.`,
            R`[[new URLSearchParams(fd)]] بتحوّل الداتا لـ query string زي [[q=js&tag=a&tag=b]] وبتعمل encoding صح للمسافات والرموز (المسافة [[+]] و [[&]] بتبقى [[%26]])، بدل ما تلزق strings بإيدك وتبوظ مع أول رمز.`,
            R`[[set]] بتحط [[page=1]]: لو المفتاح موجود بتستبدل كل قيمه، ولو مش موجود بتضيفه. بحث جديد يبدأ من أول صفحة. ([[append]] كانت هتضيف قيمة تانية جنب القديمة.)`,
            R`[[history.replaceState]] بتغيّر الـ URL في شريط العنوان من غير reload، فالبحث يتحفظ في اللينك. ومش بتزوّد خطوة في الـ history، فزرار Back مش هيعدّي على كل بحث؛ لو عايز ده استخدم [[pushState]].`,
            R`زرار الإرسال اللي جوه الفورم.`,
            R`بنعطّل الزرار وإحنا مستنيين الرد، عشان الضغط مرتين ميبعتش نفس الطلب مرتين.`,
            R`الـ [[try]] هنا مش عشان نمسك الـ error، عشان الـ [[finally]] اللي تحت يرجّع الزرار مهما حصل.`,
            R`بنبعت الطلب والبحث في الـ URL. [[+ params]] بتحوّل الـ object لـ string بنفسها (بتنادي [[toString()]])، و [[await]] بتستنى الرد.`,
            R`بنطبع الـ status والـ query عشان نتأكد إن اللي اتبعت هو اللي متوقعينه. هنا مفيش API حقيقي، فغالبًا هتشوف 404.`,
            R`[[finally]] بيتنفّذ في النجاح وفي الفشل، حتى لو [[fetch]] رمت error وكمّل لبرّه الدالة.`,
            R`بنرجّع الزرار شغال. لو السطر ده كان بعد الـ fetch عادي من غير finally، أي error كان هيسيب الزرار متعطّل لحد ما اليوزر يعمل refresh.`,
            R`نهاية الـ try/finally.`,
            R`نهاية الـ submit listener.`,
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
          practice: [
            { lvl: 'سريع', t: R`حط [[<script src="app.js">]] من غير [[defer]] في الـ [[<head>]]، و [[app.js]] فيه [[document.querySelector("h1").textContent = "اتغيّر"]]. افتح Console. وبعدين زوّد [[defer]].`, done: R`من غير defer بيطلع [[TypeError: Cannot set properties of null (setting 'textContent')]] والعنوان زي ما هو، ومع defer العنوان بيتغير ومفيش error.` },
            { lvl: 'تطبيق', t: R`اعمل [[greet.js]] فيه [[export function greet(name)]]، و [[main.js]] بيعمل import ليها وبيكتب التحية في الصفحة، بـ [[<script type="module" src="main.js">]]. افتحه مرة بدبل كليك على الملف ([[file://]]) ومرة من سيرفر محلي. وجرّب [[const secret = 1]] في main.js وبعدين [[window.secret]] في Console.`, done: R`من [[file://]] بيطلع error في Console فيه كلمة CORS ومفيش تحية، ومن [[localhost]] التحية بتظهر. و [[window.secret]] بترجّع [[undefined]] لأن متغيرات الـ module مش global.` },
            { lvl: 'تحدي', t: R`٣ سكربتات [[a.js]] و [[b.js]] و [[c.js]]، كل واحد بيعمل [[console.log]] لاسمه، و [[b.js]] بيستخدم متغير [[window.config]] اللي [[a.js]] بيعرّفه. جرّبهم بـ [[defer]] وبعدين بـ [[async]]، مع Network throttling «Slow 4G» و [[a.js]] أكبر حجمًا (حط فيه كومنت طويل).`, done: R`مع defer الترتيب دايمًا a ثم b ثم c و b شايف الـ config، ومع async الترتيب بيتغير بين reload وتاني وأحيانًا b بيطبع [[undefined]] أو error، وتقدر تكتب في سطر ليه defer هو الصح لكود بيعتمد على بعضه.` },
          ],
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
            R`[[async]]: المتصفح بيحمّل الملف في الخلفية وهو بيكمّل قراية الـ HTML، وأول ما يوصل بيشغّله فورًا من غير ما يستنى حد. مناسب لحاجة مستقلة زي analytics؛ لكن سكريبتين async ترتيبهم مش مضمون، فمينفعش واحد يعتمد على التاني.`,
            R`[[defer]]: بيتحمّل في الخلفية برضه، بس مش بيشتغل غير بعد ما الـ HTML كله يتقري، وسكريبتات defer بتشتغل بترتيب كتابتها. ده الاختيار الطبيعي لكود صفحتك اللي بيلمس الـ DOM.`,
            R`[[type="module"]] بيبقى deferred لوحده من غير ما تكتب defer، وبيسمح بـ [[import]] و [[export]]، والمتغيرات اللي فوق في الملف مبتبقاش global. وفي Chrome مش هيشتغل لو فتحت الصفحة من [[file://]]، لازم سيرفر محلي.`,
            R`سكريبت inline عادي من غير [[src]] ولا defer: بيشتغل فورًا في مكانه، والمتصفح بيوقف قراية الـ HTML لحد ما يخلص.`,
            R`بيطبع [["loading"]]: الـ HTML لسه بيتقري، فالعناصر اللي مكتوبة بعد السكريبت ده لسه مش موجودة، و [[querySelector]] عليها هترجّع [[null]].`,
            R`[[DOMContentLoaded]] بيحصل بعد ما الـ HTML كله يتقري وسكريبتات defer و module تشتغل، من غير ما يستنى الصور. لو مضطر لسكريبت عادي في الـ head ومحتاج الـ DOM، حط الكود جوه الـ listener ده.`,
            R`[[load]] على [[window]] بيحصل بعد كل حاجة: الصور والـ CSS كمان، فهو متأخر. استخدمه لو محتاج حاجة زي مقاسات الصور، مش لتشغيل كودك العادي.`,
            R`نهاية السكريبت الـ inline.`,
          ],
          sol: R`الترتيب: [[inline: loading]] ← [[app.js <h1>]] ← [[main.js <h1>]] ← [[DOMContentLoaded]] ← [[load]]. الاتنين لاقيين الـ h1 لأنهم استنوا الـ HTML.

لما تشيل [[defer]]: [[app.js]] بيطلع الأول وبيطبع [[app.js null]]، لأنه اشتغل وهو في الـ head قبل ما المتصفح يوصل للـ body. ده بالظبط الـ bug الشهير. و main.js لسه تمام لأن module = deferred.

لو فتحت الملف بدبل كليك هتلاقي main.js مشتغلش وفيه error عن CORS أو origin: الـ modules محتاجة [[http://]]، استخدم [[npx serve]] أو Live Server.`
        }
      ]
    }
]);
