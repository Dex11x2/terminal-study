// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الفورم: كل أنواع الحقول والأخطاء",
      l: 1,
      n: "اختيارات بـ fieldset، والنوع الصح لكل حقل، و validation المتصفح من JavaScript، وأخطاء واضحة للكل",
      items: [
        {
          cmd: "fieldset و radio",
          title: "اختيار واحد ولا أكتر؟ radio و checkbox و select",
          desc: R`[[radio]] لاختيار واحد بس من مجموعة، وكل الـ radios اللي في المجموعة ليهم نفس الـ [[name]]. و [[checkbox]] لصفر أو أكتر. و [[<select>]] لاختيار واحد من قايمة طويلة.

والمجموعة كلها بتتلف في [[<fieldset>]] وأول حاجة جواه [[<legend>]] فيه السؤال. من غيرهم قارئ الشاشة بيقول «كارت، radio button» ومش بيقول السؤال أصلًا. ومعاهم بيقول «طريقة الدفع، مجموعة، كارت، radio button، 1 من 2».

قاعدة سريعة: 5 اختيارات أو أقل يبقى radio (كلهم باينين وضغطة واحدة)، أكتر من كده select.`,
          example: R`<fieldset>
  <legend>طريقة الدفع</legend>
  <label><input type="radio" name="pay" value="card" required> كارت</label>
  <label><input type="radio" name="pay" value="cod"> كاش عند الاستلام</label>
</fieldset>
<fieldset>
  <legend>ابعتلي إشعارات على</legend>
  <label><input type="checkbox" name="notify" value="email" checked> الإيميل</label>
  <label><input type="checkbox" name="notify" value="sms"> SMS</label>
</fieldset>
<label for="city">المحافظة</label>
<select id="city" name="city" required>
  <option value="">اختار…</option>
  <optgroup label="الدلتا">
    <option value="gharbia">الغربية</option>
    <option value="dakahlia">الدقهلية</option>
  </optgroup>
</select>`,
          try: R`حط الكود في [[<form>]] ومعاه زرار submit، ودوس عليه من غير ما تختار حاجة وشوف المتصفح بيقف فين. وبعدين علّم الـ checkboxes الاتنين، وافتح الـ Console واكتب [[Object.fromEntries(new FormData(document.forms[0]))]] وبعدها [[new FormData(document.forms[0]).getAll('notify')]] وقارن.`,
          flag: "script",
          deep: {
            why: R`أي فورم دفع أو تسجيل أو إعدادات فيه اختيارات. ولو المجموعة ملهاش legend، مستخدم قارئ الشاشة بيسمع «نعم، لا» ومش عارف السؤال إيه. ولو الـ radios أسماءهم مختلفة، المستخدم يقدر يختار الاتنين مع بعض والسيرفر يستلم بيانات متناقضة.`,
            how: R`الـ radios اللي ليهم نفس الـ [[name]] جوه نفس الفورم بقوا مجموعة: تعليم واحد بيشيل التاني، والمجموعة كلها وقفة Tab واحدة، وجواها بتتنقل بالأسهم (والسهم بيختار كمان). و [[required]] على radio واحد بس بيكفي للمجموعة كلها.

وقت الإرسال: الـ checkbox اللي مش متعلّم مش بيتبعت خالص (مش [[false]])، والمتعلّم بيتبعت بالـ [[value]] بتاعه (ولو ملوش value بيتبعت [[on]]). ولو كذا checkbox ليهم نفس الـ name بيتبعتوا كذا مرة، فلازم [[formData.getAll('notify')]] مش [[get]].

في الـ select: أول option بـ [[value=""]] هو اللي بيخلي [[required]] يشتغل، لأن الـ required بيرفض القيمة الفاضية. و [[<optgroup>]] بيقسّم القايمة بعناوين مبتتختارش.

والشكل: [[accent-color: var(--color-brand)]] بيلوّن الـ checkbox والـ radio الأصليين من غير ما تكسرهم. وفيه [[appearance: base-select]] جديد بيخليك تعمل ستايل كامل للـ select، بس لسه مش في كل المتصفحات، فاتأكد من caniuse قبل ما تعتمد عليه.`,
            when: R`radio: اختيار واحد إجباري وقليل (الجنس، طريقة الدفع، حجم). checkbox لوحده: موافقة أو تشغيل/إطفاء. checkboxes: اختيارات متعددة. select: قايمة طويلة (محافظات، دول). ولو القايمة طويلة جدًا ومحتاجة بحث، ده combobox (مستوى تالت).`,
            mistakes: R`كل radio بـ name مختلف فيتعلّموا كلهم. checkbox لاختيار واحد من اتنين. select لـ «نعم/لا». option أولاني من غير [[value=""]] فالـ required ميشتغلش. [[Object.fromEntries(formData)]] مع checkboxes بنفس الاسم: بيسيب آخر قيمة بس. وتخفي الـ input بـ [[display: none]] عشان تعمل شكل مخصص: كده اتشال من الكيبورد وقارئ الشاشة. وسؤال انترفيو: «ليه الـ radio group وقفة Tab واحدة؟» لأنها widget واحد، والأسهم للتنقل جواه، ودا نفس فكرة roving tabindex.`
          },
          teach: R`## الفكرة في سطرين

3 أنواع اختيار: radio (واحد بس)، و checkbox (صفر أو أكتر)، و select (واحد من قايمة). والمجموعات ملفوفة في [[fieldset]] عشان يبقى ليها سؤال. حطيت المثال جوه [[<form>]] ومعاه زرار، وجرّبته في Chrome (headless): الكيبورد، ورسايل المتصفح، و [[FormData]].

---

## ١. [[<fieldset>]] و [[<legend>]]

- [[fieldset]]: صندوق بيجمّع حقول ليها علاقة ببعض. المتصفح بيرسم حواليه برواز.
- [[legend]]: عنوان الصندوق (السؤال). لازم يبقى أول حاجة جواه.

في شجرة الـ accessibility بتاعة Chrome:

~~~text الناتج
group "طريقة الدفع"
  radio "كارت"
  radio "كاش عند الاستلام"
group "ابعتلي إشعارات على"
  checkbox "الإيميل"
  checkbox "SMS"
~~~

الـ fieldset بقى [[group]]، واسمه جه من الـ legend. فقارئ الشاشة لما يدخل على «كارت» يقول السؤال الأول.

---

## ٢. الـ radios

~~~text index.html
<label><input type="radio" name="pay" value="card" required> كارت</label>
<label><input type="radio" name="pay" value="cod"> كاش عند الاستلام</label>
~~~

| الحتة | معناها |
|---|---|
| [[type="radio"]] | دايرة، واحدة بس فيها بتتعلّم |
| [[name="pay"]] | نفس الاسم = نفس المجموعة. ده اللي بيربطهم |
| [[value="card"]] | اللي بيتبعت للسيرفر لو ده اللي اتختار |
| [[required]] | على واحد بس، وبيسري على المجموعة كلها |
| [[cod]] | اختصار cash on delivery: كاش عند الاستلام |

اللي اتقاس:

- دوست «ابعت» من غير ما أختار: الرسالة «Please select one of these options.» والـ focus راح لأول radio. مع إن [[required]] مكتوب على الأولاني بس، الاتنين اتعلّموا [[invalid]].
- وقفت على «كارت» ودوست السهم لتحت: الـ focus راح لـ «كاش» **واتعلّم كمان** ([[:checked]] بقى [[cod]]). يعني الأسهم بتتنقل وبتختار.

---

## ٣. الـ checkboxes

~~~text index.html
<label><input type="checkbox" name="notify" value="email" checked> الإيميل</label>
<label><input type="checkbox" name="notify" value="sms"> SMS</label>
~~~

[[checked]] attribute من غير قيمة: المربع متعلّم من الأول. والاتنين ليهم نفس الـ [[name]]، بس ده مش بيخليهم مجموعة زي الـ radio: كل واحد بيتعلّم لوحده.

---

## ٤. الـ [[<select>]]

| الحتة | معناها |
|---|---|
| [[<select id="city" name="city" required>]] | القايمة. الـ id عشان الـ label، والـ name عشان الإرسال |
| [[<option value="">اختار…</option>]] | أول اختيار وقيمته فاضية |
| [[<optgroup label="الدلتا">]] | عنوان مجموعة جوه القايمة، مبيتختارش |
| [[<option value="gharbia">الغربية</option>]] | المستخدم بيشوف «الغربية»، والسيرفر بيستلم [[gharbia]] |

Chrome سمّى الـ select [[combobox "المحافظة"]] (من الـ label)، والـ optgroup ظهر [[group "الدلتا"]] جواه.

بعد ما اخترت الدفع ودوست «ابعت» تاني، المتصفح وقف عند المحافظة: «Please select an item in the list.». السبب: الاختيار المبدئي قيمته [[""]]، و [[required]] بيرفض القيمة الفاضية.

---

## ٥. الكيبورد: كام وقفة Tab؟

~~~text ترتيب Tab
radio كارت  →  checkbox الإيميل  →  checkbox SMS  →  select  →  زرار
~~~

الـ radio group كله وقفة واحدة (الـ «كاش» مظهرش)، والجوه بالأسهم. أما كل checkbox وقفة لوحده.

---

## ٦. إيه اللي بيتبعت؟ ([[FormData]])

[[new FormData(form)]] بيجمّع اللي الفورم هيبعته. اخترت كارت والغربية وعلّمت الـ checkboxes الاتنين:

~~~text Console
[...new FormData(document.forms[0])]
Object.fromEntries(new FormData(document.forms[0]))
new FormData(document.forms[0]).getAll('notify')
~~~

~~~text الناتج
pay=card & notify=email & notify=sms & city=gharbia
{ pay: 'card', notify: 'sms', city: 'gharbia' }
[ 'email', 'sms' ]
~~~

- [[document.forms]]: كل الفورمات اللي في الصفحة، و [[0]] بين الأقواس المربعة يعني أولهم.
- السطر الأول: [[notify]] اتبعتت **مرتين**.
- [[Object.fromEntries]] بيحوّل الأزواج لـ object، والـ object مينفعش فيه مفتاح مكرر، فاتبقى آخر واحد ([[sms]]) وضاع [[email]].
- [[getAll('notify')]] بترجّع كل القيم في array.

وشلت العلامة من الاتنين:

~~~text الناتج
pay=card & city=gharbia
getAll('notify')  →  []
get('notify')     →  null
~~~

[[notify]] اختفت خالص. مش [[false]] ولا [[""]].

---

## الخلاصة

| | radio | checkbox | select |
|---|---|---|---|
| كام اختيار | واحد | صفر أو أكتر | واحد |
| اللي بيربطهم | نفس [[name]] | (كل واحد لوحده) | عنصر واحد |
| [[required]] | على واحد بيكفي | على كل واحد لوحده | محتاج option بـ [[value=""]] |
| الكيبورد | وقفة واحدة والأسهم جواها | وقفة لكل واحد | وقفة واحدة |
| لو مش متختار | مش بيتبعت | مش بيتبعت | بيتبعت [[""]] |

- لفّ أي مجموعة في [[fieldset]] و [[legend]].
- checkboxes بنفس الاسم: [[getAll]] مش [[get]] ولا [[Object.fromEntries]].`,
          lines: [
            "بداية المجموعة الأولى.",
            "السؤال. قارئ الشاشة بيقوله قبل أول اختيار.",
            R`radio متعلّم باسم [[pay]]. [[required]] على واحد بيكفي للمجموعة.`,
            R`نفس الـ [[name]]، فتعليمه بيشيل التاني.`,
            "قفلة المجموعة.",
            "مجموعة checkboxes: تختار صفر أو أكتر.",
            "السؤال.",
            R`[[checked]] متعلّم من الأول، وهيتبعت [[notify=email]].`,
            R`نفس الاسم، فلو اتعلّموا الاتنين هيتبعتوا مرتين.`,
            "قفلة.",
            "label الـ select مربوط بالـ id زي أي حقل.",
            R`قايمة، و [[required]] يرفض القيمة الفاضية.`,
            R`اختيار مبدئي قيمته فاضية، فالمستخدم مجبر يختار حاجة تانية.`,
            "عنوان مجموعة جوه القايمة، مبيتختارش.",
            R`الكلام بالعربي للمستخدم، والـ [[value]] ثابت للسيرفر.`,
            "اختيار تاني.",
            "قفلة المجموعة.",
            "قفلة الـ select."
          ],
          sol: R`لما تدوس submit والحقول فاضية: المتصفح بيقف عند أول حقل required فاضي (مجموعة الدفع) ويعرض رسالة جنبها، ومش بيبعت حاجة.

بعد ما تختار وتعلّم الـ checkboxes الاتنين، [[Object.fromEntries(...)]] هيطلّع حاجة زي [[{pay: 'cod', notify: 'sms', city: 'gharbia'}]]: الـ [[notify]] فيها قيمة واحدة بس (آخر واحدة) لأن الـ object مينفعش يبقى فيه نفس المفتاح مرتين. أما [[getAll('notify')]] فبترجّع [[['email', 'sms']]].

ولو شلت العلامة من الاتنين، [[notify]] مش هتظهر خالص في الـ FormData. الغلط الشائع: تتوقعها [[false]] أو [[[]]] وتكتب كود في السيرفر على الأساس ده.`
        },
        {
          cmd: "textarea و date و number",
          title: "كل حقل بنوعه، وإمتى متستخدمش type=\"number\"",
          desc: R`[[<textarea>]] للكلام اللي أكتر من سطر. و [[type="date"]] بيدّي calendar أصلي، وقيمته دايمًا [[2026-10-05]] مهما كان الشكل اللي المستخدم شايفه. و [[type="number"]] للكميات الحقيقية (كمية، سن) ومعاه [[min]] و [[max]] و [[step]]. و [[email]] و [[tel]] و [[url]] بيغيّروا الكيبورد وبعضهم بيعمل validation.

وإمتى متستخدمش number: أي رقم مش «كمية» (تليفون، كارت، كود OTP، رقم قومي، رمز بريدي). هنا [[inputmode="numeric"]] على حقل نص: كيبورد أرقام من غير أسهم ولا شيل للأصفار.`,
          example: R`<label for="msg">رسالتك</label>
<textarea id="msg" name="msg" rows="4" maxlength="500"></textarea>
<label for="qty">الكمية</label>
<input id="qty" name="qty" type="number" min="1" max="10" step="1" value="1">
<label for="date">ميعاد التوصيل</label>
<input id="date" name="date" type="date" min="2026-10-01">
<label for="otp">كود التأكيد</label>
<input id="otp" name="otp" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6">
<label for="site">موقعك</label>
<input id="site" name="site" type="url" placeholder="https://" dir="ltr">`,
          try: R`حط الحقول في صفحة وافتح الـ Console. اختار تاريخ واكتب [[date.value]] و [[date.valueAsDate]]. وبعدين [[qty.value = 'abc']] واقرا [[qty.value]] و [[qty.valueAsNumber]]. وافتح الصفحة من الموبايل وشوف كيبورد كل حقل.`,
          flag: "script",
          deep: {
            why: R`النوع الصح بيوفّر على المستخدم: كيبورد مناسب، و calendar بدل ما يكتب التاريخ بإيده ويغلط في الترتيب، و validation ببلاش. والنوع الغلط بيبوّظ البيانات: [[type="number"]] على تليفون بيشيل الصفر اللي على الشمال، وفيه أسهم، والـ scroll بالماوس فوقه بيغيّر القيمة من غير ما تاخد بالك.`,
            how: R`[[value]] دايمًا string. للأرقام فيه [[valueAsNumber]] (و [[NaN]] لو فاضي)، وللتاريخ [[valueAsDate]] (Date بتوقيت UTC). و type=number لما تكتب فيه حاجة مش رقم، [[value]] بيرجع [[""]] مش الكلام اللي اتكتب، فمتعرفش من JavaScript المستخدم كتب إيه غلط.

الـ [[date]] بيعرض التاريخ بلغة وشكل جهاز المستخدم، بس القيمة اللي بتتبعت وبتتقري ثابتة [[YYYY-MM-DD]]، ودا اللي خلّي الحقل ده أحسن من نص حر. و [[min]] و [[max]] بيقفلوا الأيام اللي مينفعش تتختار.

[[autocomplete="one-time-code"]] بيخلي الموبايل يقترح الكود اللي جه في SMS. و [[maxlength]] على textarea بيوقف الكتابة عند الحد، واعرض عدّاد جنبه عشان المستخدم ميتفاجئش.

وفيه [[field-sizing: content]] في CSS بيخلي الـ textarea يكبر مع الكلام من غير JavaScript، بس لسه مش في كل المتصفحات، فخليه تحسين إضافي.`,
            when: R`number: كمية، سن، عدد أفراد. date: ميعاد قريب (توصيل، حجز). تاريخ الميلاد: ناس كتير (زي GOV.UK) بيفضّلوا 3 حقول نص (يوم وشهر وسنة) لأن الـ calendar بيخليك ترجع 30 سنة ورا. tel: أي تليفون. inputmode=numeric: أكواد وأرقام تعريفية.`,
            mistakes: R`type=number لتليفون أو كارت. [[pattern]] من غير رسالة واضحة جنب الحقل، فالمستخدم يشوف «Please match the requested format» ومش فاهم. تعتمد على [[qty.value]] كرقم فتجمع strings ([[1 + '1']] بيطلّع [[11]]). و date بتحوّله بـ [[new Date(value)]] وتعرضه بتوقيت محلي فيطلع يوم قبله في بعض المناطق: خليه string أو اتعامل معاه كتاريخ من غير وقت. وسؤال انترفيو: «امتى type=number مش مناسب؟» والإجابة: لما القيمة مش حاجة بتتجمع وتطرح.`
          },
          teach: R`## الفكرة في سطرين

5 حقول، كل واحد نوعه على قد البيانات اللي فيه. هنفك كل حقل، ونشوف قيمته بتتقري إزاي من JavaScript، والمتصفح بيرفض إيه. كل النتايج من Chrome (headless، لغته إنجليزي)، بقيم حطيتها من الـ Console وبكتابة بالكيبورد المتقلّد.

> أي عنصر ليه [[id]] المتصفح بيعمل له متغير بنفس الاسم، عشان كده [[date.value]] في الـ Console شغالة من غير querySelector. ده للتجربة بس، في الكود الحقيقي امسك العنصر بـ querySelector.

---

## ١. [[<textarea>]]

~~~text index.html
<textarea id="msg" name="msg" rows="4" maxlength="500"></textarea>
~~~

- [[textarea]]: حقل كلام متعدد السطور. ليه قفلة، والكلام اللي بين الـ tags هو القيمة المبدئية.
- [[rows="4"]]: الارتفاع المبدئي 4 سطور. اتقاس 66 بيكسل.
- [[maxlength="500"]]: أقصى عدد حروف. كتبت 510 حرف بالكيبورد، والقيمة وقفت عند 500: المتصفح بيمنع الكتابة، مش بيعرض غلط.

---

## ٢. [[type="number"]]

~~~text index.html
<input id="qty" name="qty" type="number" min="1" max="10" step="1" value="1">
~~~

[[min]] أقل قيمة، و [[max]] أكبر قيمة، و [[step]] الخطوة (القيم المسموحة 1، 2، 3...)، و [[value]] القيمة المبدئية.

### القيمة string مش رقم

~~~text Console
qty.value
typeof qty.value
qty.value + 1
qty.valueAsNumber + 1
~~~

~~~text الناتج
'1'
'string'
'11'
2
~~~

[[qty.value + 1]] طلعت [[11]] لأن الـ [[+]] بين string ورقم بيلزقهم. [[valueAsNumber]] بيرجّع رقم بجد.

### لما القيمة متبقاش رقم

| اللي حصل | [[value]] | [[valueAsNumber]] |
|---|---|---|
| [[qty.value = 'abc']] من الكود | [[""]] | [[NaN]] |
| كتبت [[1e3abc]] بالكيبورد | [[1e3]] | 1000 |

الحروف اتمنعت وانت بتكتب، بس [[e]] عدّت لأن [[1e3]] رقم سليم (1 × 10 أس 3). و [[NaN]] اختصار Not a Number.

### المتصفح بيرفض إيه؟

| القيمة | الخاصية في [[validity]] | الرسالة |
|---|---|---|
| 11 | [[rangeOverflow]] | Value must be less than or equal to 10. |
| 2.5 | [[stepMismatch]] | Please enter a valid value. The two nearest valid values are 2 and 3. |

---

## ٣. [[type="date"]]

~~~text index.html
<input id="date" name="date" type="date" min="2026-10-01">
~~~

### القيمة دايمًا [[YYYY-MM-DD]]

[[YYYY]] السنة 4 أرقام، و [[MM]] الشهر، و [[DD]] اليوم. ده الشكل اللي بيتبعت وبيتقري، مهما كان الشكل اللي المستخدم شايفه. وجرّبت أحط [[05/10/2026]] من الكود: [[date.value]] رجع [[""]]، يعني الحقل رفض أي شكل تاني.

و [[min]] بنفس الشكل: حطيت [[2026-09-30]] فطلع [[rangeUnderflow]] والرسالة «Value must be 10/01/2026 or later.».

### [[valueAsDate]] وفرق التوقيت

حطيت [[2026-10-05]] وقريته في منطقتين زمنيتين:

| المنطقة | [[valueAsDate]] | [[toLocaleDateString()]] |
|---|---|---|
| القاهرة | Mon Oct 05 2026 03:00 GMT+0300 | 05/10/2026 |
| نيويورك | Sun Oct 04 2026 20:00 GMT-0400 | **04/10/2026** |

[[valueAsDate]] بيرجّع [[Date]] الساعة 00:00 بتوقيت UTC (التوقيت العالمي). في نيويورك الساعة دي لسه يوم 4 بالليل، فالتاريخ ظهر يوم قبله. و [[new Date(date.value)]] عمل نفس الغلطة. عشان كده خلي التاريخ string لو مش محتاج الوقت.

---

## ٤. كود التأكيد: نص بكيبورد أرقام

~~~text index.html
<input id="otp" name="otp" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6">
~~~

- مفيش [[type]]، فهو [[text]] (اتقاس [[otp.type]] = [[text]]).
- [[inputmode="numeric"]]: يغيّر كيبورد الموبايل بس لأرقام، من غير ما يغيّر نوع الحقل.
- [[autocomplete="one-time-code"]]: الموبايل يقترح الكود اللي جه في SMS. [[OTP]] اختصار one-time password.
- [[pattern="[0-9]{6}"]]: regular expression. [[0-9]] بين القوسين المربعين يعني أي رقم من 0 لـ 9، و [[{6}]] 6 مرات بالظبط. حطيت [[12a]] فطلع [[patternMismatch]] والرسالة «Please match the requested format.» (رسالة عامة، عشان كده اكتب القاعدة جنب الحقل).
- [[maxlength="6"]]: الكتابة بتقف عند 6 حروف.

ليه مش [[type="number"]]؟ لأن الكود ممكن يبدأ بصفر، ومش حاجة بتتجمع.

---

## ٥. [[type="url"]]

~~~text index.html
<input id="site" name="site" type="url" placeholder="https://" dir="ltr">
~~~

| القيمة | سليمة؟ | الرسالة |
|---|---|---|
| [[example.com]] | لأ ([[typeMismatch]]) | Please enter a URL. |
| [[https://example.com]] | أيوه | |

لازم الرابط كامل ومعاه [[https://]]، عشان كده الـ [[placeholder]] بيوريه للمستخدم.

---

## الخلاصة

| الحقل | قيمته | امتى |
|---|---|---|
| [[textarea]] | string | كلام أكتر من سطر |
| [[type="number"]] | string، ورقم من [[valueAsNumber]] | كمية أو سن |
| [[type="date"]] | [[YYYY-MM-DD]] | ميعاد |
| [[inputmode="numeric"]] | string | تليفون، كود، رقم قومي |
| [[type="url"]] | string | رابط كامل |

- [[value]] دايمًا string، حتى في number.
- [[valueAsDate]] بتوقيت UTC، فممكن يطلع يوم قبله.`,
          lines: [
            "label الرسالة.",
            R`حقل كلام متعدد السطور. [[rows]] الارتفاع المبدئي، و [[maxlength]] أقصى عدد حروف.`,
            "label الكمية.",
            R`رقم حقيقي: أقل حاجة 1 وأكتر حاجة 10 وبيزيد 1، ومبدئيًا 1.`,
            "label التاريخ.",
            R`calendar أصلي، والأيام قبل [[min]] مقفولة. القيمة دايمًا [[YYYY-MM-DD]].`,
            "label الكود.",
            R`نص مش number: كيبورد أرقام، والموبايل يقترح الكود من الـ SMS، و [[pattern]] 6 أرقام بالظبط.`,
            "label الموقع.",
            R`[[type="url"]]: كيبورد فيه / و .com، ومبيقبلش غير رابط كامل. و [[dir="ltr"]] عشان الرابط ميتقلبش.`
          ],
          sol: R`[[date.value]] بيرجع حاجة زي [[2026-10-05]] حتى لو الحقل بيعرض «٥/١٠/٢٠٢٦» أو بالإنجليزي. و [[date.valueAsDate]] بيرجع Date الساعة 00:00 UTC، فلو عملته [[toLocaleDateString()]] في منطقة غرب جرينتش هيطلع يوم 4.

[[qty.value = 'abc']] وبعدها [[qty.value]] بيرجع [[""]] لأن الحقل رفض القيمة، و [[qty.valueAsNumber]] بيرجع [[NaN]].

على الموبايل: qty و otp كيبورد أرقام، و url كيبورد فيه [[/]]، و date بيفتح calendar. لو otp طلعلك كيبورد حروف يبقى نسيت [[inputmode="numeric"]].`
        },
        {
          cmd: "Constraint Validation API",
          title: "validation المتصفح من JavaScript: validity و setCustomValidity",
          desc: R`كل حقل فيه [[validity]]: object فيه سبب الغلط ([[valueMissing]] و [[typeMismatch]] و [[tooShort]] و [[rangeUnderflow]] و [[patternMismatch]] و [[customError]]) و [[valid]] لو كله تمام. و [[validationMessage]] الرسالة اللي المتصفح هيعرضها.

[[checkValidity()]] بترجع true أو false، و [[reportValidity()]] كمان بتعرض الرسالة وتحط الـ focus على الحقل. و [[setCustomValidity('...')]] بتخلي الحقل غلط برسالتك انت (زي «كلمتين السر مش زي بعض»)، و [[setCustomValidity('')]] بترجّعه سليم.

و [[novalidate]] على الفورم بيوقف رسايل المتصفح وقت الإرسال عشان تعرض انت أخطائك، بس الـ API كله لسه شغال. وفي CSS، [[:user-invalid]] بتلوّن الحقل الغلط بعد ما المستخدم يلمسه بس، مش أول ما الصفحة تفتح زي [[:invalid]].`,
          example: R`const form = document.querySelector('#signup');
const pass = form.elements.password;
const confirm = form.elements.confirm;
confirm.addEventListener('input', () => {
  confirm.setCustomValidity(confirm.value === pass.value ? '' : 'كلمتين السر مش زي بعض');
});
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
  }
});
console.log(pass.validity.valueMissing, pass.validity.tooShort, pass.validationMessage);
// styles.css
input:user-invalid { border-color: crimson; }`,
          try: R`اعمل [[<form id="signup" method="post" novalidate>]] فيه [[password]] بـ [[required minlength="8"]] و [[confirm]]، وحط السكربت. اكتب باسورد وتأكيد مختلف ودوس submit. وبعدين في الـ Console اكتب [[confirm.validity]] و [[form.checkValidity()]]. وبعدين غيّر الباسورد الأصلي بس (مش التأكيد) لحد ما يبقوا زي بعض: الرسالة لسه موجودة؟`,
          flag: "script",
          deep: {
            why: R`الـ attributes ([[required]] و [[minlength]] و [[type]]) بتغطي أغلب الحالات، بس فيه قواعد بتعتمد على أكتر من حقل (تأكيد الباسورد، تاريخ النهاية بعد البداية) أو على السيرفر (الإيميل مستخدم قبل كده). الـ API ده بيخليك تحط القواعد دي في نفس نظام المتصفح، فالـ [[:user-invalid]] والرسايل و [[checkValidity]] كلهم يشتغلوا عليها من غير ما تبني نظام validation من الصفر.`,
            how: R`لو الفورم من غير [[novalidate]]، المتصفح بيعمل validation قبل حدث [[submit]]، ولو فيه غلط حدث submit مش بيحصل أصلًا. ولو بـ [[novalidate]]، حدث submit بيحصل دايمًا وانت اللي بتسأل [[form.checkValidity()]].

[[setCustomValidity]] بتلزق في الحقل: طول ما الرسالة مش فاضية الحقل غلط، حتى لو المستخدم صلّح. عشان كده لازم تنادي [[setCustomValidity('')]] (string فاضي) في كل تغيير يخلي الحقل سليم، وعلى الحقلين (الباسورد والتأكيد) مش واحد بس.

[[tooShort]] و [[tooLong]] بيتحسبوا بس لما المستخدم هو اللي يكتب، مش لما تحط [[value]] من الكود. ودي تفصيلة بتلخبط في الاختبارات.

[[:user-invalid]] (وأختها [[:user-valid]]) بتشتغل بعد ما المستخدم يعدّل الحقل ويسيبه، أو بعد محاولة submit. ودي Baseline في كل المتصفحات الحديثة، وأحسن بكتير من [[:invalid]] اللي بتلوّن الفورم كله أحمر أول ما يفتح.`,
            when: R`قواعد بين أكتر من حقل، ورسايل بلغتك بدل رسايل المتصفح، وأخطاء راجعة من السيرفر تحطها على الحقل بتاعها. ولو بتستخدم React Hook Form أو Zod في الفرونت، هما بيعملوا نفس الفكرة بنظامهم، بس الـ attributes الأصلية لسه مفيدة كخط أول.`,
            mistakes: R`تنادي [[setCustomValidity('غلط')]] ومترجعش تناديها بـ string فاضي لما الغلط يتصلح، فالحقل يفضل غلط للأبد والفورم مبيتبعتش. تسمع على التأكيد بس فلو المستخدم غيّر الباسورد الأصلي الغلط ميتحدثش. تستخدم [[:invalid]] فالحقول تبقى حمرا قبل ما حد يكتب. وتفتكر إن validation المتصفح أمان: أي حد يقدر يبعت request من غير الفورم، فالسيرفر لازم يتأكد تاني.`
          },
          teach: R`## الفكرة في سطرين

نفس الـ validation اللي المتصفح بيعمله لوحده من [[required]] و [[minlength]]، بس من JavaScript: تسأله الحقل سليم ولا لأ وليه، وتضيف قواعدك انت (زي «التأكيد = كلمة السر»). جرّبت الكود في Chrome (headless) على الفورم ده:

~~~text index.html
<form id="signup" method="post" novalidate>
  <label for="p">كلمة السر</label>
  <input id="p" name="password" type="password" required minlength="8">
  <label for="c">التأكيد</label>
  <input id="c" name="confirm" type="password">
  <button>سجّل</button>
</form>
~~~

[[novalidate]] على الفورم: «متعرضش رسايلك لوحدك وقت الإرسال، أنا هقرر». الـ API نفسه بيفضل شغال.

---

## ١. مسك الحقول

~~~text app.js
const form = document.querySelector('#signup');
const pass = form.elements.password;
const confirm = form.elements.confirm;
~~~

- [[const]]: متغير مش هيتغيّر.
- [[querySelector('#signup')]]: أول عنصر الـ id بتاعه [[signup]] (الـ [[#]] = id).
- [[form.elements]]: كل حقول الفورم، وتقدر تجيب الحقل باسمه ([[name]]): [[.password]] و [[.confirm]].

---

## ٢. [[validity]]: الحقل غلط ليه؟

آخر سطر في المثال:

~~~text app.js
console.log(pass.validity.valueMissing, pass.validity.tooShort, pass.validationMessage);
~~~

~~~text الناتج أول ما الصفحة فتحت
true false Please fill out this field.
~~~

- [[valueMissing]] بـ [[true]]: الحقل [[required]] وفاضي.
- [[tooShort]] بـ [[false]]: مفيش كلام أصلًا عشان يبقى قصير.
- [[validationMessage]]: الرسالة اللي المتصفح كان هيعرضها.

[[validity]] فيه خانة لكل سبب. ده اللي رجع لحقل التأكيد بعد ما بقى غلط:

~~~text الناتج
valueMissing: false   typeMismatch: false   patternMismatch: false
tooLong: false        tooShort: false       rangeUnderflow: false
rangeOverflow: false  stepMismatch: false   badInput: false
customError: true     valid: false
~~~

[[valid]] بيبقى [[true]] بس لو كل الباقي [[false]].

---

## ٣. [[setCustomValidity]]: قاعدة من عندك

~~~text app.js
confirm.addEventListener('input', () => {
  confirm.setCustomValidity(confirm.value === pass.value ? '' : 'كلمتين السر مش زي بعض');
});
~~~

فكها من جوه:

1. [[confirm.value === pass.value]]: [[===]] مقارنة، بترجّع true أو false.
2. [[? '' : '...']]: الـ ternary. لو الشرط true خد اللي بعد [[?]] (string فاضي)، لو false خد اللي بعد [[:]] (الرسالة).
3. [[setCustomValidity(...)]]: string فاضي = الحقل سليم. أي كلام = الحقل غلط والكلام ده رسالته.
4. [[addEventListener('input', ...)]]: شغّل ده مع كل حرف بيتكتب في التأكيد.

كتبت [[secret123]] في كلمة السر و [[secret12]] في التأكيد:

~~~text الناتج
customError: true   valid: false
validationMessage: كلمتين السر مش زي بعض
form.checkValidity(): false
~~~

---

## ٤. الإرسال: [[checkValidity]] و [[reportValidity]]

~~~text app.js
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
  }
});
~~~

| الدالة | بتعمل إيه |
|---|---|
| [[form.checkValidity()]] | بترجّع [[true]] لو كل الحقول سليمة. ساكتة |
| [[!]] قبلها | عكس: «لو مش سليم» |
| [[e.preventDefault()]] | [[e]] هو الحدث. امنع الإرسال العادي |
| [[form.reportValidity()]] | اعرض الرسالة على أول حقل غلط وحط الـ focus عليه |

دوست «سجّل»: الصفحة فضلت مكانها، والـ focus راح لحقل التأكيد ([[document.activeElement.name]] = [[confirm]]).

---

## ٥. المشكلة اللي في المثال

مسحت آخر حرف من كلمة السر عشان تبقى [[secret12]] زي التأكيد:

~~~text الناتج
pass.value === confirm.value   →  true
confirm.validationMessage      →  كلمتين السر مش زي بعض
form.checkValidity()           →  false
~~~

الرسالة لسه لازقة، لأن الـ listener على التأكيد بس، ومحدش نادى [[setCustomValidity('')]]. الحل (الـ solCode): دالة واحدة [[sync]] بتتنادي من الحقلين. جرّبتها بنفس الخطوات: الرسالة بقت [[""]] و [[checkValidity()]] بقت [[true]]، والفورم اتبعت.

> ليه [[method="post"]] في الفورم فوق؟ جرّبته من غيرها: الفورم اتبعت بـ GET (الـ default) والباسوردات ظهرت في الـ URL: [[/ok?password=secret12&confirm=secret12]]، يعني تتسجل في الـ history وفي logs السيرفر. أي فورم فيه كلمة سر لازم [[method="post"]].

---

## ٦. [[tooShort]] بيتحسب إمتى؟

| اللي عملته | [[tooShort]] |
|---|---|
| كتبت [[abc]] بالكيبورد | [[true]]، والرسالة: Please lengthen this text to 8 characters or more (you are currently using 3 characters). |
| [[pass.value = 'abc']] من الكود | [[false]]، و [[valid]] بـ [[true]] |

الطول بيتحسب بس على اللي المستخدم كتبه.

---

## ٧. [[:user-invalid]] في الـ CSS

~~~text style.css
input:user-invalid { border-color: crimson; }
~~~

[[crimson]] اسم لون أحمر غامق. قست [[border-top-color]] لحقل كلمة السر:

| الوقت | [[:invalid]] | [[:user-invalid]] | لون البوردر |
|---|---|---|---|
| أول ما الصفحة فتحت | أيوه | لأ | [[rgb(118, 118, 118)]] رمادي |
| كتبت [[abc]] وخرجت من الحقل | أيوه | أيوه | [[rgb(220, 20, 60)]] = crimson |

يعني [[:invalid]] شغال من أول لحظة (الحقل فاضي و required)، و [[:user-invalid]] استنى لحد ما المستخدم لمس الحقل.

---

## الخلاصة

| الأداة | امتى |
|---|---|
| [[el.validity]] | تعرف السبب |
| [[el.validationMessage]] | الرسالة الجاهزة |
| [[setCustomValidity('msg')]] و [[('')]] | قاعدة من عندك. لازم ترجّعها فاضية لما الغلط يتصلح |
| [[form.checkValidity()]] | سؤال ساكت |
| [[form.reportValidity()]] | سؤال ويعرض الرسالة والـ focus |
| [[:user-invalid]] | تلوين بعد ما المستخدم يلمس الحقل |`,
          lines: [
            R`الفورم، وعليه [[novalidate]] في الـ HTML عشان احنا اللي نقرر امتى نعرض.`,
            R`[[form.elements]] بيجيب الحقل بالـ [[name]] بتاعه.`,
            "حقل التأكيد.",
            "مع كل حرف في التأكيد...",
            R`...لو زي الباسورد الرسالة فاضية (الحقل سليم)، غير كده الحقل غلط بالرسالة دي.`,
            "قفلة.",
            "وقت الإرسال...",
            "لو فيه أي حقل غلط (بما فيهم الـ custom)...",
            "...امنع الإرسال...",
            "...واعرض رسالة المتصفح على أول حقل غلط وحط الـ focus عليه.",
            "قفلة الـ if.",
            "قفلة الـ listener.",
            R`تقدر تسأل عن أي سبب: فاضي؟ قصير؟ والرسالة بلغة المتصفح.`,
            R`بوردر أحمر بعد ما المستخدم يلمس الحقل بس، مش أول ما الصفحة تفتح.`
          ],
          sol: R`بعد ما تكتب تأكيد مختلف: [[confirm.validity.customError]] بـ true و [[valid]] بـ false، و [[form.checkValidity()]] بـ false، والـ submit بيعرض «كلمتين السر مش زي بعض» على حقل التأكيد.

المشكلة اللي هتلاقيها: لو غيّرت الباسورد الأصلي لحد ما يبقى زي التأكيد، الرسالة لسه موجودة، لأن الـ listener على التأكيد بس. الحل تعمل دالة واحدة وتسمع بيها على الحقلين.

وتفصيلة: لو حطيت [[pass.value = 'abc']] من الـ Console، [[pass.validity.tooShort]] هتفضل false، لأنها بتتحسب بس لما المستخدم يكتب بإيده.`,
          solCode: R`const form = document.querySelector('#signup');
const pass = form.elements.password;
const confirm = form.elements.confirm;
const sync = () => confirm.setCustomValidity(confirm.value === pass.value ? '' : 'كلمتين السر مش زي بعض');
pass.addEventListener('input', sync);
confirm.addEventListener('input', sync);
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
  }
});`
        },
        {
          cmd: "ملخص الأخطاء",
          title: "الفورم رفض: المستخدم يعرف الغلط فين، وميبعتش مرتين",
          desc: R`لما الإرسال يفشل، اعمل 3 حاجات: رسالة جنب كل حقل غلط ومربوطة بيه بـ [[aria-describedby]] ومعاها [[aria-invalid="true"]]، وملخص فوق الفورم فيه لينك لكل حقل غلط (مهم في الفورمات الطويلة)، وحط الـ focus على أول حقل غلط عشان قارئ الشاشة يقول اسمه والغلط بتاعه على طول.

ولما الإرسال يبدأ فعلًا، امنع الضغطة التانية: flag في الكود، والزرار يبقى [[aria-disabled]] لحد ما الرد يرجع.

الـ HTML المتوقع: كل حقل ليه [[id]] و [[aria-describedby="<id>-err"]] وبعده [[<p id="<id>-err">]]، وفوق الفورم [[<div id="summary" hidden>]] فيه [[<h2>]] و [[<ul>]].`,
          example: R`const form = document.querySelector('#signup');
const summary = document.querySelector('#summary');
const submitBtn = form.querySelector('[type=submit]');
let sending = false;
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (sending) return;
  const fields = [...form.querySelectorAll('input, select, textarea')];
  const bad = fields.filter((el) => !el.checkValidity());
  for (const el of fields) {
    el.setAttribute('aria-invalid', String(!el.validity.valid));
    document.getElementById(el.id + '-err').textContent = el.validationMessage;
  }
  summary.hidden = bad.length === 0;
  summary.querySelector('h2').textContent = $__btفيه $__{bad.length} حاجات محتاجة تتصلح$__bt;
  summary.querySelector('ul').innerHTML = bad.map((el) => $__bt<li><a href="#$__{el.id}">$__{el.labels[0].textContent}</a></li>$__bt).join('');
  if (bad.length) return bad[0].focus();
  sending = true;
  submitBtn.setAttribute('aria-disabled', 'true');
  try {
    await fetch(form.action, { method: 'POST', body: new FormData(form) });
  } finally {
    sending = false;
    submitBtn.removeAttribute('aria-disabled');
  }
});`,
          try: R`اعمل فورم فيه الاسم والإيميل (required) بالـ HTML اللي في الشرح، وحط [[novalidate]] على الفورم وشغّل السكربت. دوس سجّل والحقول فاضية: الـ focus راح فين؟ الملخص فيه كام لينك؟ وبعدين املاهم صح، ودوس سجّل مرتين ورا بعض بسرعة وبص في Network › Fetch/XHR: كام request اتبعت؟`,
          flag: "script",
          deep: {
            why: R`لو الفورم رفض من غير ما يقول ليه، أو الرسالة ظهرت فوق والمستخدم تحت، أو قارئ الشاشة فضل ساكت، المستخدم بيمشي. والضغطة المزدوجة على «ادفع» أو «اطلب» بتعمل طلبين ودفع مرتين، ودي من أشهر مشاكل المتاجر.`,
            how: R`[[aria-describedby]] بيخلي قارئ الشاشة يقرا الرسالة بعد اسم الحقل ونوعه: «الإيميل، edit، invalid entry، اكتب الإيميل». و [[aria-invalid]] هو اللي بيقول «invalid». فلما الـ focus يروح لأول حقل غلط، المستخدم بيسمع كل اللي محتاجه في جملة واحدة.

الملخص: اللينكات [[href="#email"]] بتنقل الـ focus للحقل نفسه لما تتضغط. في فورم قصير (2 أو 3 حقول) ممكن تستغنى عن الملخص وتكتفي بالـ focus على أول حقل. في فورم طويل (زي GOV.UK) بيحطوا الـ focus على الملخص نفسه ([[tabindex="-1"]]) عشان المستخدم يعرف العدد الأول.

الـ [[validationMessage]] بيبقى فاضي لما الحقل سليم، فنفس السطر بيمسح الرسالة القديمة. ورسايل المتصفح بلغته، ولو عايز رسايلك انت استخدم [[setCustomValidity]] (الدرس اللي فات).

ليه [[aria-disabled]] مش [[disabled]]؟ [[disabled]] بيشيل الزرار من الـ Tab، فلو الـ focus كان عليه بيضيع لأول الصفحة. [[aria-disabled]] بيقول لقارئ الشاشة إنه مقفول والـ focus بيفضل مكانه، والـ flag [[sending]] هو اللي بيمنع فعلًا. وفي React 19 فيه [[useFormStatus]] بيدّيك [[pending]] جوه الفورم، وفي السيرفر الحماية الحقيقية idempotency key (نفس المفتاح مرتين = طلب واحد).`,
            when: R`أي فورم فيه أكتر من حقل، وخصوصًا الدفع والتسجيل. ومنع الضغطة المزدوجة في أي زرار بيعمل حاجة مش بتتعاد (طلب، دفع، إرسال رسالة).`,
            mistakes: R`رسالة واحدة عامة «فيه أخطاء» من غير ما تقول فين. الأخطاء بالأحمر بس (اللي عنده عمى ألوان مش هيشوفها). رسالة مش مربوطة بالحقل فقارئ الشاشة ميقولهاش. الـ focus يفضل على الزرار. [[disabled]] على الزرار وقت الإرسال فالـ focus يضيع. تنسى ترجّع الزرار لو الطلب فشل فالمستخدم يفضل محبوس. و [[innerHTML]] بكلام جاي من المستخدم (XSS)، هنا الـ labels بتاعتنا فمفيش مشكلة، بس لو فيه أي قيمة من المستخدم استخدم [[textContent]].`
          },
          teach: R`## الفكرة في سطرين

الكود ده بيستلم حدث الإرسال بنفسه: يفحص كل حقل، ويكتب رسالة تحت كل حقل غلط، ويعمل ملخص فوقه، ويحط الـ focus على أول غلط. ولو كله سليم يبعت بـ [[fetch]] ويمنع الضغطة التانية. جرّبته في Chrome (headless) على الـ HTML اللي في الحل (الاسم والإيميل required و [[novalidate]] على الفورم)، والسيرفر المحلي بيتأخر ثانية قبل ما يرد عشان أقدر أدوس تاني والطلب لسه شغال.

---

## ١. التجهيز

~~~text app.js
const form = document.querySelector('#signup');
const summary = document.querySelector('#summary');
const submitBtn = form.querySelector('[type=submit]');
let sending = false;
~~~

- [[[type=submit]]]: selector بالـ attribute: العنصر اللي [[type]] بتاعه [[submit]]. و [[form.querySelector]] بيدوّر جوه الفورم بس.
- [[let]]: متغير هيتغيّر (عكس [[const]]). [[sending]] اسمه flag: true أو false بيقول «فيه إرسال شغال دلوقتي».

---

## ٢. أول الـ listener

~~~text app.js
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (sending) return;
~~~

- [[async]]: الدالة جواها [[await]] (هنستنى الـ fetch).
- [[e.preventDefault()]]: امنع الإرسال العادي (اللي بيعمل reload)، إحنا اللي هنبعت.
- [[if (sending) return;]]: لو فيه طلب لسه مخلصش، اخرج من غير ما تعمل حاجة.

---

## ٣. مين الغلط؟

~~~text app.js
const fields = [...form.querySelectorAll('input, select, textarea')];
const bad = fields.filter((el) => !el.checkValidity());
~~~

- [[querySelectorAll('input, select, textarea')]]: الفاصلة في الـ selector معناها «أو». بيرجّع NodeList.
- [[[...]]] حوالين الـ NodeList: الـ [[...]] (spread) بيفرده جوه array جديدة، عشان يبقى عندنا [[filter]].
- [[filter]]: بيرجّع array فيها العناصر اللي الشرط بتاعها true بس. والشرط [[!el.checkValidity()]] يعني «الحقل مش سليم».

---

## ٤. علامة ورسالة على كل حقل

~~~text app.js
for (const el of fields) {
  el.setAttribute('aria-invalid', String(!el.validity.valid));
  document.getElementById(el.id + '-err').textContent = el.validationMessage;
}
~~~

- [[for (const el of fields)]]: لف على كل حقل، واسمه جوه اللفة [[el]].
- [[String(!el.validity.valid)]]: عكس [[valid]] ومحوّل لنص: [[true]] أو [[false]]. و [[setAttribute]] بيحطه على العنصر.
- [[el.id + '-err']]: لو الـ id [[email]] يبقى [[email-err]]، وده الـ [[<p>]] اللي تحت الحقل.
- [[textContent]] = الرسالة. والحقل السليم رسالته [[""]]، فنفس السطر بيمسح الرسالة القديمة.

---

## ٥. الملخص

~~~text app.js
summary.hidden = bad.length === 0;
summary.querySelector('h2').textContent = $__btفيه $__{bad.length} حاجات محتاجة تتصلح$__bt;
summary.querySelector('ul').innerHTML = bad.map((el) => $__bt<li><a href="#$__{el.id}">$__{el.labels[0].textContent}</a></li>$__bt).join('');
~~~

- [[hidden]]: لو مفيش غلط (الطول 0) خبّي الملخص.
- الـ backticks حوالين النص اسمها template literal، و [[$__{...}]] جواها بيحط قيمة.
- [[bad.map(...)]]: بيحوّل كل حقل غلط لسطر [[<li>]] فيه لينك [[#id]]، والاسم من [[el.labels[0].textContent]] (أول label مربوط بالحقل).
- [[.join('')]]: يلزق السطور في string واحد من غير فاصل.

---

## ٦. الـ focus، وبعدين الإرسال

~~~text app.js
if (bad.length) return bad[0].focus();
sending = true;
submitBtn.setAttribute('aria-disabled', 'true');
try {
  await fetch(form.action, { method: 'POST', body: new FormData(form) });
} finally {
  sending = false;
  submitBtn.removeAttribute('aria-disabled');
}
~~~

- لو فيه غلط: الـ focus على أول واحد ([[bad[0]]]) واخرج.
- [[sending = true]] **قبل** الـ [[await]]: ده اللي بيقفل الباب على الضغطة التانية.
- [[try]] و [[finally]]: اللي في [[finally]] بيتنفّذ دايمًا، سواء الطلب نجح أو رمى error، فالزرار مبيفضلش مقفول للأبد.
- [[fetch(form.action, ...)]]: يبعت لنفس العنوان اللي في [[action]]، بـ [[POST]]، والجسم [[new FormData(form)]].

---

## ٧. اللي اتقاس

### دوست «سجّل» والحقلين فاضيين

~~~text الناتج
الـ focus على:      name
الملخص ظاهر:        نعم
العنوان:            فيه 2 حاجات محتاجة تتصلح
الـ ul:             <li><a href="#name">الاسم</a></li><li><a href="#email">الإيميل</a></li>
name:  aria-invalid=true   الرسالة: Please fill out this field.
email: aria-invalid=true   الرسالة: Please fill out this field.
~~~

وفي شجرة الـ accessibility كل حقل بقى كده:

~~~text الناتج
textbox "الإيميل"  invalid=true  description: Please fill out this field.
~~~

الـ description جاية من [[aria-describedby="email-err"]] اللي في الـ HTML، فقارئ الشاشة بيقول الاسم وإنه غلط والرسالة مع بعض. وضغطت على لينك «الإيميل» في الملخص: الـ hash بقى [[#email]] والـ focus راح للحقل نفسه.

### ملّيتهم صح ودوست دبل كليك

~~~text الناتج
حدث submit:   مرتين (بينهم 1 ملّي ثانية)
POST للسيرفر: واحد بس
~~~

الضغطة التانية لقت [[sending]] بـ [[true]] فرجعت. ونفس النتيجة مع Enter مرتين ورا بعض في حقل الإيميل. وفي الثانية اللي الطلب شغال فيها: [[aria-disabled="true"]] على الزرار، وبعد ما الرد رجع اتشال.

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| امنع الإرسال العادي | [[e.preventDefault()]] |
| امنع الضغطة التانية | [[if (sending) return]] و [[sending = true]] قبل الـ await |
| مين الغلط | [[filter(el => !el.checkValidity())]] |
| علّم كل حقل | [[aria-invalid]] ورسالة في [[<p id="...-err">]] |
| ملخص بلينكات | [[href="#id"]] |
| الـ focus | [[bad[0].focus()]] |
| رجّع الزرار مهما حصل | [[finally]] |`,
          lines: [
            "الفورم (عليه novalidate في الـ HTML).",
            "صندوق الملخص فوق الفورم.",
            "زرار الإرسال.",
            "flag: بنبعت دلوقتي ولا لأ.",
            "وقت الإرسال...",
            "إحنا اللي هنبعت بـ fetch، فامنع الإرسال العادي.",
            "لو فيه طلب لسه مخلصش، تجاهل الضغطة دي.",
            R`كل الحقول (من غير الأزرار، لأن الزرار كمان ليه [[checkValidity]]).`,
            "الحقول الغلط بس.",
            "لكل حقل...",
            R`[[aria-invalid]] بـ true أو false حسب حالته.`,
            "رسالته تحته، وبتتمسح لوحدها لو بقى سليم.",
            "قفلة.",
            "الملخص يظهر لو فيه غلط.",
            "العنوان فيه العدد.",
            "لينك لكل حقل غلط باسمه من الـ label.",
            "لو فيه غلط: الـ focus على أول حقل غلط ووقف هنا.",
            "كله سليم: علّم إننا بنبعت.",
            "الزرار يبان مقفول ويفضل ماسك الـ focus.",
            "حاول تبعت...",
            "الطلب نفسه بالبيانات.",
            "...ومهما حصل (نجح أو فشل)...",
            "...افتح الإرسال تاني...",
            "...ورجّع الزرار.",
            "قفلة الـ finally.",
            "قفلة الـ listener."
          ],
          sol: R`أول submit والحقول فاضية: الـ focus بيروح لحقل الاسم (أول حقل غلط)، وقارئ الشاشة بيقول اسمه و invalid والرسالة. الملخص بيظهر وفيه لينكين (الاسم والإيميل) والعنوان «فيه 2 حاجات محتاجة تتصلح». وكل حقل عليه [[aria-invalid="true"]] وتحته رسالة المتصفح.

بعد ما تملاهم صح وتدوس مرتين بسرعة: request واحد بس في Network، لأن الضغطة التانية لقت [[sending]] بـ true ورجعت. ولو لقيت اتنين يبقى الـ flag اتحط بعد الـ await مش قبله.

لو الـ focus مراحش للحقل: اتأكد إن الـ id في الـ HTML زي اللي في [[aria-describedby]]، وإن الـ [[<p>]] بتاع الغلط موجود (لو مش موجود [[getElementById]] بيرجع null والسكربت يقع).`,
          solCode: R`<div id="summary" hidden>
  <h2></h2>
  <ul></ul>
</div>
<form id="signup" action="/api/signup" novalidate>
  <label for="name">الاسم</label>
  <input id="name" name="name" required aria-describedby="name-err">
  <p id="name-err"></p>
  <label for="email">الإيميل</label>
  <input id="email" name="email" type="email" required aria-describedby="email-err">
  <p id="email-err"></p>
  <button type="submit">سجّل</button>
</form>`
        }
      ]
    }
]);
