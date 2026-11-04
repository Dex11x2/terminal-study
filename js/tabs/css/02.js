// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الفورم: كل أنواع الحقول والأخطاء",
      projects: [
        { lvl: 'صغير', t: R`حاسبة BMI`, what: R`فورم فيه الوزن ([[type="number"]] و [[min="20"]] و [[max="300"]] و [[step="0.1"]]) والطول بالسنتي، والنتيجة في [[<output>]] عليه [[aria-live="polite"]] بتتحدّث مع كل [[input]]، وجنبها التصنيف (نحيف، طبيعي، زيادة). من دروس «textarea و date و number» و «Constraint Validation API».`, done: R`70 كيلو و 175 سم بيطلّعوا 22.9 «طبيعي»، والحقل الفاضي أو 500 كيلو بيطلّع رسالة المتصفح ([[rangeOverflow]]) ومفيش رقم غلط في النتيجة، وكتابة حرف [[e]] لوحده في الوزن مش بتكسر الحساب ([[validity.badInput]]).` },
        { lvl: 'صغير', t: R`اختيار باقة جيم بالكروت`, what: R`٣ باقات لـ «جيم الأبطال» (شهري، ٣ شهور، سنوي) كل واحدة [[<label>]] شكلها كارت وجواها radio، والكارت المختار بيتلوّن بـ [[.plan:has(input:checked)]] من غير JavaScript، والـ radio نفسه مخفي بالشكل بس (مش [[display: none]]). من درس «fieldset و radio».`, done: R`الأسهم بتنقّل الاختيار بين الكروت، والكارت اللي عليه الـ focus عليه outline واضح ([[:has(:focus-visible)]])، و [[getComputedStyle]] على الكارت المختار بيرجّع لون الحدود الجديد، و [[new FormData(form).get('plan')]] بيرجّع الباقة.` },
        { lvl: 'متوسط', t: R`حجز ميعاد في عيادة متخيلة`, what: R`فورم حجز لـ «عيادة الشفاء»: الاسم، والموبايل بـ pattern، والتخصص (select بـ optgroup)، والتاريخ ([[min]] = النهارده بالتوقيت المحلي)، والوقت ([[type="time"]] و [[step="900"]] كل ربع ساعة)، وملاحظات (textarea بـ maxlength وعداد حروف)، وملخص أخطاء فوق. من دروس الوحدة كلها.`, done: R`تاريخ امبارح مقفول في الـ calendar، والإرسال الفاضي بيطلّع ملخص فيه لينك لكل حقل غلط والضغط على اللينك بيحط الـ focus في الحقل، والعداد بيقف عند الـ maxlength، والدبل كليك على «احجز» بيبعت request واحد بس في Network.` },
        { lvl: 'متوسط', t: R`اختبار «أنسب قهوة ليك» خطوة خطوة`, what: R`٤ أسئلة، كل سؤال fieldset بـ legend و radios، وسؤال واحد بس ظاهر في المرة ([[hidden]] على الباقي)، وزرار «التالي» مبيعدّيش لو السؤال مش متجاوب ([[reportValidity()]] على الـ radio)، وزرار «رجوع»، وفي الآخر كارت نتيجة عليه [[aria-live="polite"]]. فكرة «quiz بيخلص بتوصية» اللي بتتعمل في صفحات الهبوط.`, done: R`بالكيبورد بس تقدر تجاوب الأربعة (الأسهم للاختيار و Enter للتالي)، و «التالي» من غير اختيار بيطلّع رسالة المتصفح على المجموعة، و «رجوع» بيرجّع اختيارك زي ما هو، والنتيجة بتتغيّر لو غيّرت إجابة.` },
        { lvl: 'كبير', t: R`Checkout لمتجر قهوة متخيل (من غير دفع حقيقي)`, what: R`صفحة طلب لـ «بُن الصباح»: بياناتك (autocomplete كامل)، وعنوان الشحن في شبكة عمودين بتبقى عمود واحد على الموبايل والحقل الطويل [[grid-column: 1 / -1]]، وطريقة الدفع radio cards (كارت أو كاش)، وكوبون بتاريخ انتهاء بيتحسب لآخر اليوم مش أوله، وملخص أخطاء، ومنع الإرسال مرتين، ومسودة بتتحفظ في localStorage كل ثانية **من غير** أي حقل حساس (رقم الكارت مثلًا)، وصفحة «اتطلب» بعد النجاح. فكرة «الفورم الطويل اللي بيرجع مكان ما وقفت».`, done: R`على 360px عمود واحد وعلى 800px عمودين، والإرسال الفاضي بيحط الـ focus على أول غلط والملخص فيه عدد الأخطاء، وقفل التاب وفتحه بيرجّع كل الحقول ما عدا الحساسة (اتأكد من Application › Local Storage إن رقم الكارت مش متخزن)، وكوبون بينتهي النهارده لسه شغال الساعة 11 بالليل، و axe صفر violations، والدبل كليك بيبعت طلب واحد، ولو الطلب فشل (Network › Offline) الزرار بيرجع والبيانات متمسحتش.`, ext: R`زوّد رسالة تأكيد بتفتح واتساب برسالة جاهزة ([[wa.me/?text=]] و [[encodeURIComponent]])، ونسخة إنجليزي بـ [[dir="ltr"]] من غير ما تغيّر الـ CSS.` },
        { lvl: 'فكرة', t: R`فورم لنشاط حقيقي حواليك`, what: R`اختار نشاط تعرفه (درس خصوصي، ورشة تصليح، ماتش كورة في الحي) واعمل الفورم اللي هيستقبل الطلبات بتاعته: انت اللي تقرر الحقول وأنواعها والقواعد والرسايل.`, done: R`كل حقل ليه سبب مكتوب في تعليق (ليه النوع ده وليه required أو لأ)، و ٣ أصحاب ملوه من موبايلاتهم من غير ما يسألوك حاجة، و axe صفر violations.`, ext: R`اربطه بـ Google Sheets أو بـ backend بسيط من تاب Node، وابعت إيميل تأكيد.` },
      ],
      l: 1,
      n: "اختيارات بـ fieldset، والنوع الصح لكل حقل، و validation المتصفح من JavaScript، وأخطاء واضحة للكل",
      items: [
        {
          cmd: "fieldset و radio",
          practice: [
            { lvl: 'تطبيق', t: R`**أشكال:** اختيار باقة في جيم متخيل بـ ٣ كروت: كل كارت [[<label class="plan">]] جواه radio ونص، والـ radio مخفي بالشكل بس (حجم 1px و [[clip-path: inset(50%)]])، والكارت المختار حدوده بلون مختلف بـ [[.plan:has(input:checked)]].`, done: R`الضغط على أي حتة في الكارت بيختاره، والأسهم بتنقّل بين الكروت، و [[getComputedStyle(card).borderColor]] على المختار بيرجّع اللون اللي حطيته في الـ :has، ومفيش ولا سطر JavaScript.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الباقات</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  fieldset { border: 0; padding: 0; margin: 0; display: grid; gap: 12px; max-width: 420px; }
  .plan { display: block; padding: 14px; border: 2px solid #d4d4d8; border-radius: 12px; cursor: pointer; }
  .plan input {
    position: absolute;
    width: 1px;
    height: 1px;
    clip-path: inset(50%);
  }
  .plan:has(input:checked) { border-color: rgb(15, 118, 110); background: #f0fdfa; }
  .plan:has(input:focus-visible) { outline: 3px solid #1d4ed8; outline-offset: 2px; }
</style>
</head>
<body>
<main>
<h1>اختار باقتك</h1>
<form>
  <fieldset>
    <legend>الباقة</legend>
    <label class="plan"><input type="radio" name="plan" value="month" checked> شهر، ٥٠٠ جنيه</label>
    <label class="plan"><input type="radio" name="plan" value="quarter"> ٣ شهور، ١٣٠٠ جنيه</label>
    <label class="plan"><input type="radio" name="plan" value="year"> سنة، ٤٥٠٠ جنيه</label>
  </fieldset>
</form>
</main>
</body>
</html>
~~~

**اللي بيخلي الكارت كله يتداس:** الـ [[input]] جوه الـ [[label]]، فأي ضغطة على الـ label بتعلّم الـ radio من غير [[for]] ولا JavaScript.

**ليه الإخفاء بالشكل مش** [[display: none]]**:** الـ [[input]] لازم يفضل موجود عشان يتوصله بالكيبورد وقارئ الشاشة يقراه. [[width: 1px]] و [[height: 1px]] و [[clip-path: inset(50%)]] بيخلوه مش مرئي بس لسه في الصفحة. و [[position: absolute]] عشان ميزقّش النص.

**الجزء الجديد:** [[.plan:has(input:checked)]] معناها «الكارت اللي جواه radio متعلّم». ده اللي بيخلي الأب يتغيّر حسب ابنه.

**الغلطة الشائعة:** تخفي الـ radio وتنسى السطر بتاع [[:focus-visible]]. اللي بيستخدم الكيبورد مش هيشوف هو واقف فين، لأن الدايرة اللي كان عليها الإطار اختفت.

~~~text الناتج
الضغط على نص الكارت التاني: quarter
لون حدود المختار: rgb(15, 118, 110)   ولون حدود غير المختار: rgb(212, 212, 216)
Tab ثم سهم لتحت: quarter   وسهم تاني: year
عرض الـ radio في الصفحة: 1px، ومفيش ولا سطر JavaScript
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نفس كروت الباقات بس الـ radio عليه [[display: none]] عشان «ميبانش». جرّب توصل للكروت بالكيبورد بس، وبعدين صلّحها.`, done: R`مع [[display: none]] الـ Tab بيعدّي من غير ما يقف على أي كارت (الـ radio اتشال من الكيبورد وشجرة الـ accessibility)، وبعد ما خبّيته بالشكل بس بقى الـ Tab بيقف على المجموعة والأسهم بتختار.`, sol: R`قبل:

~~~css
.plan input { display: none; }
~~~

بعد:

~~~css
.plan input {
  position: absolute;
  width: 1px;
  height: 1px;
  clip-path: inset(50%);
}
.plan:has(input:focus-visible) { outline: 3px solid #1d4ed8; }
~~~

والـ HTML كامل عشان تجرب:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الباقات</title>
<style>
  .plan { display: block; padding: 12px; border: 2px solid #999; margin-block-end: 8px; }
  .plan input { position: absolute; width: 1px; height: 1px; clip-path: inset(50%); }
  .plan:has(input:checked) { border-color: rgb(15, 118, 110); }
  .plan:has(input:focus-visible) { outline: 3px solid #1d4ed8; }
</style>
</head>
<body>
<main>
<h1>الباقات</h1>
<form>
  <fieldset>
    <legend>الباقة</legend>
    <label class="plan"><input type="radio" name="plan" value="a"> شهر</label>
    <label class="plan"><input type="radio" name="plan" value="b"> سنة</label>
  </fieldset>
  <button>اشترك</button>
</form>
</main>
</body>
</html>
~~~

**اللي بيحصل:** [[display: none]] مش بس بيخفي العنصر، ده بيشيله من الصفحة كلها: مبيتوصلش بـ Tab، وقارئ الشاشة مبيشوفوش، حتى لو الـ label ظاهر. الماوس بس هو اللي شغال، لأن الضغط بيروح للـ label.

**الغلطة الشائعة:** تجرب بالماوس بس، فتلاقيه شغال وتقفل التذكرة. جرّب كل كروت الاختيار بالكيبورد قبل ما تعتبرها خلصت. ونفس المشكلة بتحصل مع [[visibility: hidden]].

~~~text الناتج
                       أول Tab وقف عند     الأسهم اختارت    راديوز في شجرة الـ a11y
display: none          BUTTON               ولا حاجة             0
مخفي بالشكل بس         INPUT a               b             2
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مجموعة radios اسمها [[pay]] ومفيش ولا واحد متعلّم. [[form.elements.pay.value]] هيرجّع إيه؟ وبعد ما تعلّم «كاش» ([[value="cod"]])؟ وهل [[pay]] هيبقى موجود في [[FormData]] قبل الاختيار؟`, done: R`قبل الاختيار رجّع نص فاضي [[""]] (مش null)، وبعده [[cod]]، و [[new FormData(form).has('pay')]] كان [[false]] قبل الاختيار: المجموعة اللي مفيهاش اختيار مبتتبعتش خالص.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الدفع</title>
</head>
<body>
<form id="f">
  <label><input type="radio" name="pay" value="card"> كارت</label>
  <label><input type="radio" name="pay" value="cod"> كاش</label>
</form>
</body>
</html>
~~~

~~~js
const form = document.querySelector('#f');
form.elements.pay.value;
new FormData(form).has('pay');
form.elements.pay[1].checked = true;   // علّم كاش
form.elements.pay.value;
~~~

**الإجابة:** [[form.elements.pay]] مش عنصر واحد، ده مجموعة اسمها [[RadioNodeList]]، و [[.value]] بتاعتها قيمة المتعلّم. ولو مفيش متعلّم بترجّع نص فاضي [[""]]، مش [[null]].

أما [[FormData]] فبيجمع اللي هيتبعت فعلًا، والمجموعة اللي مفيهاش اختيار مش بتتبعت خالص. عشان كده [[has]] رجّعت [[false]].

**الغلطة الشائعة:** تكتب [[if (form.elements.pay.value === null)]]. الشرط ده عمره ما هيتحقق. اكتب [[if (!form.elements.pay.value)]]، أو حط [[required]] على المجموعة.

~~~text الناتج
قبل الاختيار: value = ""   FormData.has = false
بعد «كاش»:   value = "cod"   FormData.has = true
نوع form.elements.pay = RadioNodeList
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم دفع فيه [[<input type="radio" name="pay1" value="card">]] و [[<input type="radio" name="pay2" value="cod">]]، و [[<legend>]] مكتوب برّه الـ fieldset. المستخدم قدر يعلّم الاتنين!`, done: R`بعد ما بقوا نفس الـ [[name]] تعليم واحد بيشيل التاني، و [[FormData]] فيه قيمة واحدة لـ [[pay]]، والـ legend جوه الـ fieldset كأول عنصر فتاب Accessibility بقى بيقول اسم المجموعة «طريقة الدفع».`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الدفع</title>
</head>
<body>
<main>
<h1>الدفع</h1>
<form id="f">
  <fieldset>
    <legend>طريقة الدفع</legend>
    <label><input type="radio" name="pay" value="card"> كارت</label>
    <label><input type="radio" name="pay" value="cod"> كاش عند الاستلام</label>
  </fieldset>
</form>
</main>
</body>
</html>
~~~

**الغلطتين:**

- الـ radios بتبقى مجموعة واحدة بس لو ليهم نفس [[name]]. [[pay1]] و [[pay2]] يعني مجموعتين، كل واحدة فيها اختيار واحد، فالمستخدم قدر يعلّم الاتنين.
- [[legend]] لازم يبقى أول ابن جوه [[fieldset]]. برّه الـ fieldset ده مجرد كلام، مش اسم المجموعة.

و [[fieldset]] مهم لقارئ الشاشة: لما يدخل المجموعة بيقول «طريقة الدفع» قبل ما يقرا «كارت»، فالمستخدم يعرف بيختار إيه.

**الغلطة الشائعة:** تكتب JavaScript يلغي تعليم الراديو التاني، بدل ما تصلّح الـ [[name]]. سطر الـ HTML بيعمل ده ببلاش، والأسهم كمان بتتظبط لوحدها.

~~~text الناتج
قبل: اتعلّم 2 راديو في نفس الوقت
بعد: اتعلّم 1 راديو، و FormData.getAll('pay') = ["cod"]

تاب Accessibility:
- group "طريقة الدفع":
  - text: طريقة الدفع
  - radio "كارت"
  - text: كارت
  - radio "كاش عند الاستلام" [checked]
  - text: كاش عند الاستلام
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** اختبار صغير «أنسب قهوة ليك» من ٣ أسئلة، كل سؤال fieldset و legend و ٣ radios ليهم [[value]] بنقط (1 و 2 و 3)، وزرار يحسب المجموع ويعرض النتيجة في [[<output aria-live="polite">]].`, done: R`لو سؤال مش متجاوب الإرسال بيقف عنده (حط [[required]] على أول radio في كل مجموعة)، والمجموع 3 بيقول «إسبريسو» و 9 بيقول «لاتيه» مثلًا، والنتيجة بتتغيّر من غير reload.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أنسب قهوة ليك</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  fieldset { border: 1px solid #d4d4d8; border-radius: 12px; margin-block-end: 12px; }
  label { display: block; padding: 4px 0; }
  output { display: block; margin-block-start: 12px; font-size: 1.25rem; font-weight: 700; }
</style>
</head>
<body>
<main>
<h1>أنسب قهوة ليك</h1>
<form id="quiz">
  <fieldset>
    <legend>بتحبها قد إيه؟</legend>
    <label><input type="radio" name="q1" value="1" required> تقيلة جدًا</label>
    <label><input type="radio" name="q1" value="2"> وسط</label>
    <label><input type="radio" name="q1" value="3"> خفيفة</label>
  </fieldset>
  <fieldset>
    <legend>اللبن؟</legend>
    <label><input type="radio" name="q2" value="1" required> من غير</label>
    <label><input type="radio" name="q2" value="2"> شوية</label>
    <label><input type="radio" name="q2" value="3"> كتير</label>
  </fieldset>
  <fieldset>
    <legend>السكر؟</legend>
    <label><input type="radio" name="q3" value="1" required> من غير</label>
    <label><input type="radio" name="q3" value="2"> معلقة</label>
    <label><input type="radio" name="q3" value="3"> معلقتين</label>
  </fieldset>
  <button>شوف النتيجة</button>
  <output id="result" aria-live="polite"></output>
</form>
</main>
<script>
  const form = document.querySelector('#quiz');
  const result = document.querySelector('#result');

  function coffeeFor(score) {
    if (score <= 4) return 'إسبريسو';
    if (score <= 7) return 'كابتشينو';
    return 'لاتيه';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const score = ['q1', 'q2', 'q3'].reduce((sum, q) => sum + Number(data.get(q)), 0);
    result.textContent = coffeeFor(score) + ' (مجموعك ' + score + ')';
  });
$__lt/script>
</body>
</html>
~~~

**كل جزء بيعمل إيه:**

- [[required]] على راديو واحد كفاية: القاعدة بتتطبق على المجموعة كلها اللي ليها نفس الـ [[name]].
- [[e.preventDefault()]]: بيوقف إعادة تحميل الصفحة. والفحص بتاع [[required]] بيحصل قبل event الـ submit أصلًا، فالكود بتاعك مش هيشتغل لو فيه سؤال ناقص.
- [[data.get(q)]] بترجّع نص، فـ [[Number]] لازمة، وإلا [[0 + "1"]] تبقى [[01]].
- [[reduce]] بتجمع القيم، و [[0]] في آخرها هي بداية العداد.
- [[aria-live="polite"]]: قارئ الشاشة بيقرا النتيجة لما تتغيّر من غير ما الـ focus يتحرك.

**الغلطة الشائعة:** تستخدم [[click]] على الزرار بدل [[submit]] على الفورم. كده الفحص ممكن يتعدّى، و Enter من الكيبورد مش هيتعامل زي الضغط.

~~~text الناتج
إرسال من غير إجابة: النتيجة = «»   والـ focus عند q1 value=1
كل الإجابات 1: إسبريسو (مجموعك 3)
كل الإجابات 2: كابتشينو (مجموعك 6)
كل الإجابات 3: لاتيه (مجموعك 9)
الصفحة اتعمل لها reload: false
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف الفرق بين [[<select>]] و [[<input list="...">]] مع [[<datalist>]]، واعمل حقل «المدينة» بـ datalist فيه ٥ مدن.`, done: R`تقدر تختار من الاقتراحات أو تكتب مدينة مش في اللستة وتتبعت عادي (ده الفرق: datalist اقتراح مش إجبار)، والـ select مبيقبلش غير اللي فيه.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المدينة</title>
</head>
<body>
<main>
<h1>العنوان</h1>
<form id="f">
  <label for="city">المدينة</label>
  <input id="city" name="city" list="cities">
  <datalist id="cities">
    <option value="القاهرة"></option>
    <option value="الإسكندرية"></option>
    <option value="المنصورة"></option>
    <option value="أسوان"></option>
    <option value="طنطا"></option>
  </datalist>

  <label for="gov">المحافظة</label>
  <select id="gov" name="gov">
    <option>القاهرة</option>
    <option>الجيزة</option>
  </select>
</form>
</main>
</body>
</html>
~~~

| | [[select]] | [[input]] مع [[datalist]] |
|---|---|---|
| القيم | لازم من اللستة | أي نص، واللستة اقتراح |
| الكتابة | مفيش | عادي، والاقتراحات بتتفلتر |
| الشكل | ثابت | بيختلف من متصفح للتاني |
| إمتى | اللستة مقفولة: البلد، المقاس | أغلب الناس هيختاروا، والباقي يكتب |

**الربط:** [[list="cities"]] على الـ input لازم يساوي [[id="cities"]] بتاع الـ datalist.

**الغلطة الشائعة:** تستخدم datalist وانت عايز إجبار، فتستقبل في السيرفر مدينة مكتوبة غلط. لو القيمة لازم تبقى من اللستة استخدم select، وافحصها في السيرفر في كل الأحوال.

~~~text الناتج
كتابة «دمياط» في datalist (مش في اللستة): اتقبلت = true، و FormData = دمياط
محاولة تعيين select بقيمة مش فيه: القيمة بقت ""
عدد الاقتراحات = 5
axe: 0 violations
~~~` },
          ],
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
            R`بداية المجموعة الأولى: [[<fieldset>]] بيلف الـ radios اللي بيجاوبوا على نفس السؤال، والمتصفح بيرسم حواليهم برواز لحد ما تشيله بالـ CSS.`,
            "السؤال. قارئ الشاشة بيقوله قبل أول اختيار.",
            R`radio متعلّم باسم [[pay]]. [[required]] على واحد بيكفي للمجموعة.`,
            R`نفس الـ [[name]]، فتعليمه بيشيل التاني.`,
            R`نهاية مجموعة الدفع: قارئ الشاشة بيعرف إن الاختيارين دول بس اللي تبع سؤال «طريقة الدفع».`,
            "مجموعة checkboxes: تختار صفر أو أكتر.",
            R`السؤال بتاع المجموعة التانية: [[<legend>]] لازم يبقى أول عنصر جوه الـ fieldset عشان يتقري كاسمها.`,
            R`[[checked]] متعلّم من الأول، وهيتبعت [[notify=email]].`,
            R`نفس الاسم، فلو اتعلّموا الاتنين هيتبعتوا مرتين.`,
            R`نهاية مجموعة الإشعارات. الـ select اللي بعدها مش محتاج fieldset لأنه حقل واحد وليه label عادي.`,
            "label الـ select مربوط بالـ id زي أي حقل.",
            R`قايمة، و [[required]] يرفض القيمة الفاضية.`,
            R`اختيار مبدئي قيمته فاضية، فالمستخدم مجبر يختار حاجة تانية.`,
            "عنوان مجموعة جوه القايمة، مبيتختارش.",
            R`الكلام بالعربي للمستخدم، والـ [[value]] ثابت للسيرفر.`,
            R`اختيار تاني في نفس المجموعة: [[value="dakahlia"]] هو اللي بيتبعت، و «الدقهلية» اللي بيظهر.`,
            R`نهاية الـ [[<optgroup>]]: لو عندك مجموعة تانية (الصعيد مثلًا) تبدأ بعدها بـ optgroup جديد.`,
            R`نهاية الـ select: قيمته وقت الإرسال هي [[value]] الاختيار المتعلّم، ولو لسه على «اختار…» قيمته فاضية والـ [[required]] بيوقف الإرسال.`
          ],
          sol: R`لما تدوس submit والحقول فاضية: المتصفح بيقف عند أول حقل required فاضي (مجموعة الدفع) ويعرض رسالة جنبها، ومش بيبعت حاجة.

بعد ما تختار وتعلّم الـ checkboxes الاتنين، [[Object.fromEntries(...)]] هيطلّع حاجة زي [[{pay: 'cod', notify: 'sms', city: 'gharbia'}]]: الـ [[notify]] فيها قيمة واحدة بس (آخر واحدة) لأن الـ object مينفعش يبقى فيه نفس المفتاح مرتين. أما [[getAll('notify')]] فبترجّع [[['email', 'sms']]].

ولو شلت العلامة من الاتنين، [[notify]] مش هتظهر خالص في الـ FormData. الغلط الشائع: تتوقعها [[false]] أو [[[]]] وتكتب كود في السيرفر على الأساس ده.`
        },
        {
          cmd: "textarea و date و number",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على جهاز توقيته نيويورك (في DevTools: Sensors › Location، أو [[timezoneId]] في Playwright) إيه ناتج [[new Date('2026-06-26').getDate()]] و [[new Date('2026-06-26T00:00').getDate()]]؟`, done: R`الأول طلع 25 والتاني 26: النص اللي فيه تاريخ بس بيتقري منتصف الليل UTC (ودي الساعة 8 بالليل يوم 25 في نيويورك)، واللي فيه وقت من غير Z بيتقري بالتوقيت المحلي. وده نفس اللي بيرجع من [[date.valueAsDate]] (اتطبع [[2026-06-26T00:00:00.000Z]]).`, sol: R`~~~js
// في Console على جهاز توقيته نيويورك
new Date('2026-06-26').getDate();
new Date('2026-06-26T00:00').getDate();

const i = document.createElement('input');
i.type = 'date';
i.value = '2026-06-26';
i.valueAsDate.toISOString();
~~~

عشان تغيّر التوقيت من غير ما تلمس الجهاز: DevTools، ثم More tools، ثم Sensors، ثم Location واختار نيويورك.

**ليه مختلفين:** المعيار قايل حاجتين مختلفتين:

- تاريخ بس [[2026-06-26]]: يتقري منتصف الليل **UTC**. ونيويورك في يونيو ورا UTC بـ ٤ ساعات، فده الساعة 8 بالليل يوم 25.
- تاريخ ووقت من غير Z: يتقري بالتوقيت **المحلي**، فهو 26 فعلًا.

و [[getDate()]] بترجّع اليوم بالتوقيت المحلي، فالأول طلع 25.

**الغلطة الشائعة:** تعمل [[new Date(input.value)]] من حقل [[type="date"]] وتعرض اليوم. في مصر مش هتشوف المشكلة لأنها قدام UTC، وأول عميل في أمريكا هيشوف ميعاده قبلها بيوم. لو عايز اليوم نفسه، قارن النص زي ما هو، أو ضيف [[T00:00]].

~~~text الناتج
التوقيت: America/New_York
new Date('2026-06-26').getDate()        = 25
new Date('2026-06-26T00:00').getDate()  = 26
input.valueAsDate                       = 2026-06-26T00:00:00.000Z
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** كوبون فيه حقل «ينتهي في» ([[type="date"]]). اكتب [[isExpired(dateStr, now)]] بترجّع true بس بعد آخر اليوم ده بالتوقيت المحلي، مش من أوله.`, done: R`مع [[isExpired('2026-06-26', new Date('2026-06-26T23:00'))]] بترجّع false، ومع [[new Date('2026-06-27T00:01')]] بترجّع true، ومع [[new Date('2026-06-26T00:30')]] false. والحل بيبني [[new Date(dateStr + 'T23:59:59.999')]] مش [[new Date(dateStr)]].`, sol: R`~~~js
function isExpired(dateStr, now = new Date()) {
  const lastMoment = new Date(dateStr + 'T23:59:59.999');
  return now > lastMoment;
}
~~~

**السطر المهم:** [[dateStr + 'T23:59:59.999']] بيبني آخر لحظة في اليوم **بالتوقيت المحلي**، لأن النص فيه وقت ومن غير [[Z]]. والكوبون مكتوب عليه «ينتهي في 26» يعني طول يوم 26 شغال.

**ليه** [[now]] **parameter:** عشان تقدر تختبر الدالة بوقت ثابت. لو جوه الدالة [[new Date()]] مباشرة، النتيجة هتتغيّر كل مرة تشغّلها. و [[= new Date()]] قيمة افتراضية للاستخدام العادي.

و [[>]] بين تاريخين شغالة لأن JavaScript بيحوّلهم لأرقام (milliseconds).

**الغلطة الشائعة:** تكتب [[new Date(dateStr) < now]]. ده بيقرا التاريخ منتصف الليل UTC، يعني الكوبون بينتهي **أول** اليوم، مش آخره. في القاهرة صيفًا بعد الساعة 3 الفجر هيقولك الكوبون انتهى.

~~~text الناتج
isExpired('2026-06-26', new Date('2026-06-26T23:00'))  → false
isExpired('2026-06-26', new Date('2026-06-27T00:01'))  → true
isExpired('2026-06-26', new Date('2026-06-26T00:30'))  → false

الحل الغلط new Date(dateStr) < now في القاهرة 3:01 الفجر يوم 26 → true
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** حاسبة BMI: وزن ([[step="0.1"]] و min و max) وطول بالسنتي، والنتيجة في [[<output>]] بـ [[aria-live="polite"]] بتتحدّث مع كل حرف، وبتستخدم [[valueAsNumber]] مش [[Number(value)]].`, done: R`70 و 175 بيطلّعوا 22.9، والحقل الفاضي بيخلي [[valueAsNumber]] بـ [[NaN]] والنتيجة بتقول «اكتب الوزن» مش NaN، وكتابة 70.55 في الوزن بتطلّع رسالة المتصفح عن أقرب قيمتين.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حاسبة BMI</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  form { display: grid; gap: 8px; max-width: 280px; }
  input { padding: 8px; font: inherit; }
  output { font-size: 1.5rem; font-weight: 700; }
</style>
</head>
<body>
<main>
<h1>حاسبة BMI</h1>
<form id="bmi">
  <label for="w">الوزن (كجم)</label>
  <input id="w" type="number" step="0.1" min="20" max="300" value="70">
  <label for="h">الطول (سنتي)</label>
  <input id="h" type="number" min="100" max="250" value="175">
  <output id="res" for="w h" aria-live="polite"></output>
</form>
</main>
<script>
  const w = document.querySelector('#w');
  const h = document.querySelector('#h');
  const res = document.querySelector('#res');

  function update() {
    const weight = w.valueAsNumber;
    const height = h.valueAsNumber;
    if (Number.isNaN(weight)) { res.textContent = 'اكتب الوزن'; return; }
    if (Number.isNaN(height)) { res.textContent = 'اكتب الطول'; return; }
    const meters = height / 100;
    res.textContent = (weight / (meters * meters)).toFixed(1);
  }

  document.querySelector('#bmi').addEventListener('input', update);
  update();
$__lt/script>
</body>
</html>
~~~

**السطور المهمة:**

- [[valueAsNumber]] بيرجّع رقم جاهز، أو [[NaN]] لو الحقل فاضي. أما [[Number("")]] فبترجّع [[0]]، يعني الحقل الفاضي هيتحسب وزن صفر.
- [[Number.isNaN]] هي اللي بتمسك الحالة دي قبل الحساب.
- الـ [[input]] event على الـ form نفسه، لأن الأحداث بتطلع لأعلى (bubbling)، فمستمع واحد بيغطي الحقلين.
- [[toFixed(1)]] رقم واحد بعد العلامة.
- [[step="0.1"]] هو اللي بيخلي 70.5 مقبولة، والافتراضي [[step="1"]] كان هيرفضها.

**الغلطة الشائعة:** تعرض الناتج من غير فحص الفاضي، فالمستخدم يشوف [[NaN]] أو [[Infinity]] وهو بيمسح الطول عشان يكتبه من الأول.

~~~text الناتج
70 و 175            → 22.9
الوزن فاضي           → اكتب الوزن   (valueAsNumber = NaN)
الطول فاضي           → اكتب الطول
الوزن 70.55          → stepMismatch = true
رسالة المتصفح: Please enter a valid value. The two nearest valid values are 70.5 and 70.6.
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم شكوى فيه [[<textarea name="msg" required value="اكتب هنا">]] وبعده [[</textarea>]] في سطر تاني بعد مسافات. المستخدم بيبعت الشكوى فاضية والـ required ساكت!`, done: R`عرفت إن [[value]] مش attribute على الـ textarea (الكلام بيتكتب بين التاجين)، وإن المسافات اللي بين التاجين بقت قيمة الحقل ([[ta.value]] رجّع [["   "]] فـ [[valueMissing]] بـ false). بعد ما خليت [[<textarea ...></textarea>]] لازقين و [[placeholder]] للتلميح، الإرسال الفاضي بيقف.`, sol: R`قبل (كل المشكلة في السطرين دول):

~~~html
<textarea name="msg" required value="اكتب هنا">
   </textarea>
~~~

بعد:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شكوى</title>
</head>
<body>
<main>
<h1>شكوى</h1>
<form id="f">
  <label for="msg">الشكوى</label>
  <textarea id="msg" name="msg" required placeholder="اكتب هنا"></textarea>
  <button>ابعت</button>
</form>
</main>
</body>
</html>
~~~

**المشكلتين:**

- [[textarea]] ملوش [[value]] attribute. الـ [[input]] بيقراه، لكن الـ textarea قيمته هي الكلام اللي **بين** التاجين. فـ [[value="اكتب هنا"]] متجاهلة.
- اللي بين التاجين كان سطر جديد ومسافات. والمتصفح بيشيل أول سطر جديد بعد الفتحة، والمسافات اللي بعده بتفضل قيمة حقيقية. فالحقل مش فاضي، و [[required]] راضي.

**الغلطة الشائعة:** تشوف الحقل فاضي بالعين وتدوّر على باج في الـ JavaScript. لما حقل [[required]] يعدّي وهو باين فاضي، اطبع [[JSON.stringify(ta.value)]]. وعشان كده [[<textarea></textarea>]] لازم يبقوا لازقين، حتى لو الـ formatter عايز يفصلهم.

~~~text الناتج
قبل: ta.value = "   "   valueMissing = false   الفورم بيتبعت = true
بعد: ta.value = ""   valueMissing = true   الفورم بيتبعت = false
axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**قارن وقيس:** حقل [[type="number" step="1"]]: اكتب فيه 2.5 بالكيبورد واقرا [[validity.stepMismatch]] و [[validationMessage]]. وبعدين غيّر لـ [[step="any"]].`, done: R`مع step 1 رجّع [[true]] والرسالة في Chrome «Please enter a valid value. The two nearest valid values are 2 and 3.»، ومع [[step="any"]] بقى سليم. والفلوس والوزن محتاجين [[step="0.01"]] أو any.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>step</title>
</head>
<body>
<label for="n">السعر</label>
<input id="n" type="number" step="1">
</body>
</html>
~~~

~~~js
const n = document.querySelector('#n');
n.value = '2.5';
n.validity.stepMismatch;
n.validationMessage;
n.step = 'any';
n.validity.stepMismatch;
~~~

**معنى** [[step]]**:** القيم المسموحة تبدأ من [[min]] (أو صفر) وتزيد بمقدار الـ step. فـ [[step="1"]] وهو الافتراضي يعني أرقام صحيحة بس، ورقم زي 2.5 مش مسموح.

وعشان كده المتصفح بيقولك أقرب قيمتين مسموحتين.

| القيمة | تستخدمها في |
|---|---|
| [[step="1"]] (افتراضي) | عدد قطع، عمر |
| [[step="0.01"]] | فلوس بقرشين |
| [[step="any"]] | وزن أو قياس من غير حد للكسور |

**الغلطة الشائعة:** تنسى الـ step في حقل السعر. تجربتك انت بـ 100 هتعدّي، وأول عميل يكتب 99.5 الفورم هيرفض.

~~~text الناتج
step="1"   القيمة 2.5:
  stepMismatch = true
  الرسالة: Please enter a valid value. The two nearest valid values are 2 and 3.
step="any" القيمة 2.5:
  stepMismatch = false   valid = true
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف شكل الـ value لـ [[type="time"]] و [[month]] و [[week]] و [[datetime-local]]، وبعدين اتأكد بنفسك في الـ Console.`, done: R`طلعوا [[14:30]] و [[2026-10]] و [[2026-W41]] و [[2026-10-05T14:30]] مهما كان الشكل اللي المستخدم شايفه بالعربي، وعرفت إن السيرفر بيستقبل الصيغ دي بالظبط.`, sol: R`~~~js
for (const [type, value] of [
  ['time', '14:30'],
  ['month', '2026-10'],
  ['week', '2026-W41'],
  ['datetime-local', '2026-10-05T14:30'],
]) {
  const i = document.createElement('input');
  i.type = type;
  i.value = value;
  console.log(type, JSON.stringify(i.value));
}
~~~

| الـ type | شكل الـ value | ملحوظة |
|---|---|---|
| [[time]] | [[HH:mm]] | ٢٤ ساعة دايمًا، حتى لو ظاهر 2:30 PM |
| [[month]] | [[YYYY-MM]] | |
| [[week]] | [[YYYY-Www]] | حرف W ورقم الأسبوع |
| [[datetime-local]] | [[YYYY-MM-DDTHH:mm]] | من غير توقيت، يعني مفيش Z |

**ليه ده مهم:** الشكل اللي المستخدم شايفه بيتغيّر حسب لغة جهازه، لكن اللي بيوصل للسيرفر ثابت. فالسيرفر مش محتاج يعرف لغة المستخدم.

**الغلطة الشائعة:** تحوّل [[datetime-local]] لـ UTC من غير ما تفكر. القيمة دي مفيهاش توقيت، فلازم السيرفر يعرف توقيت المستخدم، أو تبعته في حقل تاني. وكمان، لو القيمة شكلها غلط المتصفح بيفضّي الحقل في صمت، زي ما هتشوف في آخر سطر.

~~~text الناتج
time "14:30"
month "2026-10"
week "2026-W41"
datetime-local "2026-10-05T14:30"

time بقيمة "2:30 PM" → ""
~~~` },
          ],
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
            R`اسم حقل الرسالة: [[for="msg"]] بيربطه بالـ textarea اللي [[id="msg"]] زي أي input بالظبط.`,
            R`حقل كلام متعدد السطور. [[rows]] الارتفاع المبدئي، و [[maxlength]] أقصى عدد حروف.`,
            R`اسم حقل الكمية: [[for="qty"]] = [[id]] الـ input، والضغط على الكلمة بيحط المؤشر في الحقل.`,
            R`رقم حقيقي: أقل حاجة 1 وأكتر حاجة 10 وبيزيد 1، ومبدئيًا 1.`,
            R`اسم حقل التاريخ: لازم label حتى لو فيه calendar، لأن قارئ الشاشة مش هيعرف «تاريخ إيه» من غيره.`,
            R`calendar أصلي، والأيام قبل [[min]] مقفولة. القيمة دايمًا [[YYYY-MM-DD]].`,
            R`اسم حقل كود التأكيد: [[for="otp"]] = [[id="otp"]]. اكتب جنبه «٦ أرقام» عشان المستخدم يعرف الشكل قبل ما يغلط.`,
            R`نص مش number: كيبورد أرقام، والموبايل يقترح الكود من الـ SMS، و [[pattern]] 6 أرقام بالظبط.`,
            R`اسم حقل الموقع: [[for="site"]] مربوط بالـ input اللي [[type="url"]] تحته.`,
            R`[[type="url"]]: كيبورد فيه / و .com، ومبيقبلش غير رابط كامل. و [[dir="ltr"]] عشان الرابط ميتقلبش.`
          ],
          sol: R`[[date.value]] بيرجع حاجة زي [[2026-10-05]] حتى لو الحقل بيعرض «٥/١٠/٢٠٢٦» أو بالإنجليزي. و [[date.valueAsDate]] بيرجع Date الساعة 00:00 UTC، فلو عملته [[toLocaleDateString()]] في منطقة غرب جرينتش هيطلع يوم 4.

[[qty.value = 'abc']] وبعدها [[qty.value]] بيرجع [[""]] لأن الحقل رفض القيمة، و [[qty.valueAsNumber]] بيرجع [[NaN]].

على الموبايل: qty و otp كيبورد أرقام، و url كيبورد فيه [[/]]، و date بيفتح calendar. لو otp طلعلك كيبورد حروف يبقى نسيت [[inputmode="numeric"]].`
        },
        {
          cmd: "Constraint Validation API",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** حقل [[type="email"]]. أنهي قيمة هتعدّي: [[a@b]] و [[a@b.]] و [[a..b@c.com]] و [[a b@c.com]] و [[أحمد@example.com]] و [[ a@b.com ]] (بمسافات)؟ قول الأول وبعدين اسأل [[validity.valid]].`, done: R`في Chrome عدّوا [[a@b]] (مش لازم .com) و [[a..b@c.com]] واللي بمسافات (المتصفح بيشيل المسافات من الأول والآخر)، ووقعوا [[a@b.]] واللي فيه مسافة في النص والعربي. يعني validation المتصفح شكل بس، والسيرفر لازم يتأكد تاني.`, sol: R`~~~js
const i = document.createElement('input');
i.type = 'email';
for (const v of ['a@b', 'a@b.', 'a..b@c.com', 'a b@c.com', 'أحمد@example.com', ' a@b.com ']) {
  i.value = v;
  console.log(JSON.stringify(v), '→', JSON.stringify(i.value), i.validity.valid);
}
~~~

**ليه النتيجة كده:** المتصفح بيطبّق regex من المعيار، وهو بسيط عن قصد.

- [[a@b]] يعدّي: الإيميل من غير نقطة صح نظريًا، زي [[admin@localhost]].
- [[a@b.]] يقع: نقطة في الآخر من غير حاجة بعدها.
- [[a..b@c.com]] يعدّي: الـ regex مبيفحصش النقطتين ورا بعض.
- [[a b@c.com]] يقع: مسافة في النص.
- [[أحمد@example.com]] يقع: الجزء قبل الـ @ حروف لاتيني بس.
- القيمة بالمسافات تعدّي، لأن المتصفح بيشيل المسافات من الأول والآخر، وده بان في القيمة نفسها.

**الاستنتاج:** الفحص ده شكل بس. ميعرفش الإيميل موجود ولا لأ. السيرفر لازم يفحص تاني، والفحص الوحيد المضمون هو إنك تبعت رسالة تأكيد.

**الغلطة الشائعة:** تكتب regex طويل تبقى فاكر إنه «أدق». هيرفض إيميلات سليمة، وهيعدّي إيميلات مش موجودة.

~~~text الناتج
القيمة               بعد التنضيف       valid
"a@b"   "a@b"   true
"a@b."   "a@b."   false
"a..b@c.com"   "a..b@c.com"   true
"a b@c.com"   "a b@c.com"   false
"أحمد@example.com"   "أحمد@example.com"   false
" a@b.com "   "a@b.com"   true
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حقل اسم مستخدم عليه [[pattern="[a-z0-9-]+"]]، والمستخدم كتب [[ABC]] والفورم اتبعت عادي! افتح الـ Console قبل ما تصلّح.`, done: R`الـ Console فيه «Pattern attribute value [a-z0-9-]+ is not a valid regular expression» لأن Chrome بيقرا الـ pattern بفلاج [[v]] وفيه الشَرطة في الآخر لازم تتهرّب، فالـ pattern اتجاهل خالص. بعد [[pattern="[a-z0-9\-]+"]] الـ ABC بقى [[patternMismatch]] و [[ab-1]] بيعدّي.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اسم المستخدم</title>
</head>
<body>
<main>
<h1>حساب جديد</h1>
<form id="f">
  <label for="u">اسم المستخدم</label>
  <input id="u" name="u" pattern="[a-z0-9\-]+" required>
  <button>تسجيل</button>
</form>
</main>
</body>
</html>
~~~

**اللي حصل:** Chrome بيقرا الـ [[pattern]] بالفلاج [[v]]، وده أكتر تشددًا من الفلاج [[u]] القديم. وفي الوضع ده [[-]] في آخر [[[...]]] لازم تتهرّب بـ [[\-]]. ولو الـ regex غلط، المتصفح **بيتجاهل الـ pattern خالص** ويكتب تحذير في الـ Console، والفورم بيتبعت عادي.

**ليه الـ Console أول حاجة:** من غيره هتقعد تعدّل في الحروف وتدوّر على باج في مكان تاني. الفورم مش بيقول حاجة، ده الـ Console بس.

**الغلطة الشائعة:** تنقل regex من ملف JavaScript للـ [[pattern]] من غير تجربة. والـ [[pattern]] مش محتاج [[^]] و [[$]]، المتصفح بيطابق القيمة كلها لوحده.

~~~text الناتج
قبل، رسالة الـ Console:
Pattern attribute value [a-z0-9-]+ is not a valid regular expression: Uncaught SyntaxError: Invalid regular expression: /[a-z0-9-]+/v: Invalid character class

قبل: ABC → patternMismatch = false  valid = true

بعد:
ABC  → patternMismatch = true  valid = false
ab-1 → patternMismatch = false  valid = true
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيعرض رسالة عربي: [[email.addEventListener('invalid', () => email.setCustomValidity('اكتب إيميل صح'))]]. المستخدم غلط مرة، وبعدين كتب إيميل سليم، ولسه مش قادر يبعت.`, done: R`عرفت إن [[customError]] فضل [[true]] بعد الإيميل السليم ([[checkValidity()]] رجّع false)، لأن محدش رجّعها فاضية. بعد ما زوّدت [[email.addEventListener('input', () => email.setCustomValidity(''))]] بقى بيبعت.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشتراك</title>
</head>
<body>
<main>
<h1>اشتراك</h1>
<form id="f">
  <label for="email">الإيميل</label>
  <input id="email" type="email" required>
  <button>اشترك</button>
</form>
</main>
<script>
  const email = document.querySelector('#email');

  email.addEventListener('invalid', () => {
    email.setCustomValidity('اكتب إيميل صح');
  });

  email.addEventListener('input', () => {
    email.setCustomValidity('');
  });
$__lt/script>
</body>
</html>
~~~

**السبب:** [[setCustomValidity('أي كلام')]] مش بس بتغيّر الرسالة، دي بتعلن إن الحقل **غلط**. والحالة دي بتفضل ثابتة لحد ما تنادي نفس الدالة بنص فاضي. المتصفح مبيعيدش الفحص ويشيلها لوحده.

فالترتيب اللي كان بيحصل: الإيميل غلط، فـ [[invalid]] بيتنادي ويحط الرسالة. المستخدم صلّح، بس الحقل لسه عليه [[customError]]. يدوس إرسال، يترفض، و [[invalid]] يتنادي تاني. دايرة مقفولة.

**الحل:** مع كل كتابة فضّي الرسالة، والفحص العادي يشتغل من الأول.

**الغلطة الشائعة:** تحط [[setCustomValidity('')]] جوه [[invalid]] نفسه. الحدث ده بيتنادي بس لو الحقل غلط، فالسطر مش هيتنفّذ في الوقت الصح.

~~~text الناتج
قبل التصليح، بعد ما كتب a@b.com: customError = true  checkValidity = false
بعد التصليح، نفس الخطوات:        customError = false  checkValidity = true
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** مقياس قوة كلمة السر: [[<meter min="0" max="4" low="2" high="3" optimum="4">]] بيتحدّث مع كل حرف (نقطة للطول 8+، وللحروف الكبيرة، وللأرقام، وللرموز)، و [[setCustomValidity]] بيرفض أقل من 3 برسالة بتقول ناقص إيه.`, done: R`[[abc]] بيسيب المقياس فاضي (صفر نقطة) و [[abc1]] بيدّيه أحمر، والاتنين ليهم رسالة فيها الناقص، و [[Abcdef12!]] بيدّيه أخضر والفورم بيتبعت، والمقياس ليه label مربوط ([[<label for="strength">]]) فتاب Accessibility بيقول اسمه.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كلمة السر</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  form { display: grid; gap: 8px; max-width: 320px; }
  input { padding: 8px; font: inherit; }
  meter { width: 100%; height: 16px; }
</style>
</head>
<body>
<main>
<h1>حساب جديد</h1>
<form id="f">
  <label for="pass">كلمة السر</label>
  <input id="pass" type="password" autocomplete="new-password">
  <label for="strength">القوة</label>
  <meter id="strength" min="0" max="4" low="2" high="3" optimum="4" value="0"></meter>
  <button>تسجيل</button>
  <p id="ok" hidden>اتسجلت</p>
</form>
</main>
<script>
  const pass = document.querySelector('#pass');
  const meter = document.querySelector('#strength');

  const RULES = [
    { ok: (s) => s.length >= 8, need: '٨ حروف على الأقل' },
    { ok: (s) => /[A-Z]/.test(s), need: 'حرف كبير' },
    { ok: (s) => /[0-9]/.test(s), need: 'رقم' },
    { ok: (s) => /[^A-Za-z0-9]/.test(s), need: 'رمز' },
  ];

  function check() {
    const missing = RULES.filter((r) => !r.ok(pass.value));
    const score = RULES.length - missing.length;
    meter.value = score;
    pass.setCustomValidity(score < 3 ? 'ناقص: ' + missing.map((r) => r.need).join('، ') : '');
  }

  pass.addEventListener('input', check);
  check();

  document.querySelector('#f').addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#ok').hidden = false;
  });
$__lt/script>
</body>
</html>
~~~

**الفكرة:** القواعد في array، كل قاعدة دالة بترجّع true أو false ومعاها الكلام اللي هيظهر لو ناقصة. كده زيادة قاعدة سطر واحد.

- [[RULES.filter]] بيجيب القواعد الفاشلة، والنقط هي الفرق.
- [[low]] و [[high]] و [[optimum]] هما اللي بيخلوا المتصفح يختار اللون: تحت [[low]] بعيد عن الأمثل فأحمر، وعند [[optimum]] أخضر.
- [[setCustomValidity]] بنص يرفض، وبنص فاضي يقبل، فالفورم بيقف لوحده.
- [[check()]] أول ما الصفحة تفتح، عشان الحقل الفاضي يترفض من غير ما حد يكتب.
- لو القيمة صفر الشريط بيبقى فاضي خالص، مفيهوش لون أصلًا. الأحمر بيبدأ من نقطة واحدة.

**الغلطة الشائعة:** تعمل [[if (score < 3) alert(...)]] في الـ submit. كده الفحص بعيد عن المتصفح، وقارئ الشاشة مش هيربطه بالحقل.

~~~text الناتج
القيمة       المقياس   اللون          الرسالة
abc          0/4     فاضي           ناقص: ٨ حروف على الأقل، حرف كبير، رقم، رمز
abc1         1/4     أحمر           ناقص: ٨ حروف على الأقل، حرف كبير، رمز
abcD12       2/4     أصفر           ناقص: ٨ حروف على الأقل، رمز
abcD1234     3/4     أخضر           (مفيش رسالة) و valid = true
Abcdef12!    4/4     أخضر           (مفيش رسالة) والفورم اتبعت: true

اسم المقياس في تاب Accessibility: - meter "القوة"
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** سكربت للـ Console بيلف على [[form.elements]] ويطبع لكل حقل اسمه وأسماء الـ validity اللي بـ true بس (زي [[email: valueMissing]]).`, done: R`على فورم فاضي فيه required بيطبع [[valueMissing]] للحقول الإجبارية بس، وبعد ما تكتب [[abc]] في الإيميل بيطبع [[typeMismatch]]، ولما كله سليم مبيطبعش غير الحقول اللي [[valid]] بس أو مبيطبعش حاجة.`, sol: R`~~~js
function report(form) {
  for (const el of form.elements) {
    if (!el.name) continue;
    const bad = [];
    for (const key in el.validity) {
      if (key !== 'valid' && el.validity[key]) bad.push(key);
    }
    if (bad.length) console.log(el.name + ': ' + bad.join(', '));
  }
}
report(document.forms[0]);
~~~

وفورم تجرب عليه:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الفورم</title>
</head>
<body>
<form>
  <input name="email" type="email" required aria-label="الإيميل">
  <input name="age" type="number" min="18" required aria-label="السن">
  <input name="note" aria-label="ملاحظة">
  <button>ابعت</button>
</form>
</body>
</html>
~~~

**إزاي بيشتغل:**

- [[form.elements]] فيها كل الحقول، والزرار كمان. و [[if (!el.name) continue]] بتعدّي اللي مالوش اسم زي الزرار.
- [[el.validity]] object فيه ١١ property. و [[for...in]] بتلف عليها بما فيها اللي جاية من الـ prototype.
- بنعدّي [[valid]] لأنها مش نوع غلط، هي النتيجة النهائية.

**الغلطة الشائعة:** تعمل [[Object.keys(el.validity)]]. بترجّع لستة فاضية، لأن القيم دي مش properties مباشرة على الـ object، دي getters في الـ prototype. عشان كده [[for...in]] هنا.

~~~text الناتج
فورم فاضي:
email: valueMissing
age: valueMissing

بعد abc في الإيميل:
email: typeMismatch
age: valueMissing

بعد ما كله سليم:
(مطبعش حاجة)

Object.keys(el.validity).length = 0
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** صفحة [[ValidityState]] على MDN فيها ١١ property. اعمل حقل يطلّع [[badInput]] وحقل يطلّع [[rangeOverflow]].`, done: R`[[badInput]] طلع لما كتبت حرف [[e]] لوحده في [[type="number"]] (والـ value بقى [[""]] والرسالة «Please enter a number.»)، و [[rangeOverflow]] لما كتبت 15 في حقل [[max="10"]] (الرسالة «Value must be less than or equal to 10.»).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>validity</title>
</head>
<body>
<label for="n">الكمية</label>
<input id="n" type="number">
<label for="m">التقييم</label>
<input id="m" type="number" max="10">
</body>
</html>
~~~

اكتب بالكيبورد، مش بالكود: حرف [[e]] لوحده في الأول، و [[15]] في التاني.

**الفرق بين الاتنين:**

- [[badInput]]: اللي مكتوب مش رقم أصلًا. الحرف [[e]] مسموح بيه في الكتابة لأن [[1e5]] رقم، بس لوحده مش رقم. والـ [[value]] بيبقى فاضي، لأن المتصفح مش قادر يحوّله. ده معناه إن JavaScript ميعرفش إن فيه حاجة مكتوبة، غير من [[badInput]].
- [[rangeOverflow]]: الرقم سليم، بس أكبر من [[max]].

| الـ property | بتبقى true لما |
|---|---|
| [[valueMissing]] | حقل [[required]] فاضي |
| [[typeMismatch]] | شكل email أو url غلط |
| [[patternMismatch]] | مش مطابق لـ [[pattern]] |
| [[tooLong]] و [[tooShort]] | أطول من [[maxlength]] أو أقصر من [[minlength]] |
| [[rangeUnderflow]] و [[rangeOverflow]] | برّه [[min]] و [[max]] |
| [[stepMismatch]] | مش على الـ [[step]] |
| [[badInput]] | المتصفح مش قادر يفهم اللي اتكتب |
| [[customError]] | عليه [[setCustomValidity]] |
| [[valid]] | كله سليم |

**الغلطة الشائعة:** تفحص [[input.value === '']] عشان تعرف الحقل فاضي. في حالة [[badInput]] الجملة دي true والمستخدم كاتب حاجة فعلًا.

~~~text الناتج
حرف e لوحده:
  badInput = true   value = ""
  الرسالة: Please enter a number.

15 مع max="10":
  rangeOverflow = true
  الرسالة: Value must be less than or equal to 10.

عدد الـ properties في ValidityState: 11
~~~` },
          ],
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
| [[el.validity]] | تعرف السبب: فاضي ولا قصير ولا شكله غلط |
| [[el.validationMessage]] | الرسالة الجاهزة بلغة المتصفح، تعرضها جنب الحقل |
| [[setCustomValidity('msg')]] و [[('')]] | قاعدة من عندك. لازم ترجّعها فاضية لما الغلط يتصلح |
| [[form.checkValidity()]] | سؤال ساكت: true أو false من غير ما يعرض حاجة |
| [[form.reportValidity()]] | سؤال ويعرض الرسالة والـ focus |
| [[:user-invalid]] | تلوين بعد ما المستخدم يلمس الحقل |`,
          lines: [
            R`الفورم، وعليه [[novalidate]] في الـ HTML عشان احنا اللي نقرر امتى نعرض.`,
            R`[[form.elements]] بيجيب الحقل بالـ [[name]] بتاعه.`,
            R`حقل تأكيد كلمة السر بنفس الطريقة: [[name="confirm"]]. سمّيناه [[confirm]] بس ده بيغطي على [[window.confirm]] جوه السكربت ده، فلو احتجتها سمّيه [[confirmEl]].`,
            "مع كل حرف في التأكيد...",
            R`...لو زي الباسورد الرسالة فاضية (الحقل سليم)، غير كده الحقل غلط بالرسالة دي.`,
            "قفلة.",
            R`لما المستخدم يدوس «سجّل» أو Enter، الحدث [[submit]] بيوصل هنا قبل ما الفورم تتبعت فعلًا، فلسه تقدر توقفها.`,
            "لو فيه أي حقل غلط (بما فيهم الـ custom)...",
            R`...امنع الإرسال: [[e.preventDefault()]] بيلغي الإرسال العادي فالصفحة متتحمّلش والبيانات متروحش.`,
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
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** فورم طلب لمتجر قهوة متخيل في شبكة: [[.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px }]]، والعنوان حقل طويل [[grid-column: 1 / -1]]، وعلى الموبايل عمود واحد، وفوقه صندوق الملخص.`, done: R`على 800px الاسم والموبايل جنب بعض والعنوان واخد السطر كله، وعلى 360px كله تحت بعض، والملخص بيظهر فوق الشبكة مش جواها، والأخطاء تحت كل حقل مش بتكسر الشبكة.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>طلب قهوة</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  form { max-width: 720px; margin-inline: auto; }
  .summary { border: 2px solid #b91c1c; border-radius: 8px; padding: 12px; margin-block-end: 16px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .wide { grid-column: 1 / -1; }
  .field { display: grid; gap: 4px; align-content: start; min-width: 0; }
  input { padding: 10px; font: inherit; width: 100%; box-sizing: border-box; }
  .err { color: #b91c1c; font-size: .875rem; margin: 0; }
  button { margin-block-start: 12px; padding: 10px 20px; font: inherit; }
  @media (max-width: 520px) {
    .row { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<main>
<h1>اطلب قهوتك</h1>
<form novalidate>
  <div class="summary" role="alert">
    <h2>فيه غلطتين</h2>
    <ul>
      <li><a href="#name">الاسم مطلوب</a></li>
      <li><a href="#phone">الموبايل ناقص</a></li>
    </ul>
  </div>
  <div class="row">
    <div class="field">
      <label for="name">الاسم</label>
      <input id="name" name="name" autocomplete="name" aria-describedby="name-e" aria-invalid="true">
      <p class="err" id="name-e">اكتب اسمك</p>
    </div>
    <div class="field">
      <label for="phone">الموبايل</label>
      <input id="phone" name="phone" type="tel" dir="ltr" autocomplete="tel" aria-describedby="phone-e" aria-invalid="true">
      <p class="err" id="phone-e">١١ رقم</p>
    </div>
    <div class="field wide">
      <label for="addr">العنوان</label>
      <input id="addr" name="addr" autocomplete="street-address">
    </div>
  </div>
  <button>اطلب</button>
</form>
</main>
</body>
</html>
~~~

**اللي بيعمل الشبكة:**

- [[grid-template-columns: 1fr 1fr]]: عمودين متساويين.
- [[grid-column: 1 / -1]] معناها من أول خط لآخر خط، يعني السطر كله. و [[-1]] هو آخر خط مهما كان عدد الأعمدة.
- [[align-content: start]] على الـ field: لو حقل تحته غلطة وحقل تاني لأ، اللي مفيهوش مبيتمطّش.
- [[min-width: 0]]: من غيرها، الحقول ممكن تعمل overflow لأن الـ grid item مبيصغرش عن محتواه.
- الملخص برّه [[.row]]، فمبيبقاش خلية في الشبكة.

**الغلطة الشائعة:** تحط الملخص جوه [[.row]]، فياخد عمود واحد ويزق الحقول. وأي عنصر زيادة في الشبكة بيتحسب خلية.

~~~text الناتج
على 800:
الاسم x=406 عرض=354، الموبايل x=40 عرض=354، نفس السطر: true
العنوان عرضه 720  (السطر كله)

على 360:
أعمدة الشبكة: 328px
الترتيب تحت بعض: y = 260 , 365 , 470
overflow: 0px
axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في الملخص لينك [[<a href="#email">الإيميل</a>]]. لما تدوس عليه، الـ focus هيروح فين: اللينك، ولا الحقل نفسه، ولا مفيش؟`, done: R`في Chrome [[document.activeElement]] بقى الحقل نفسه ([[#email]])، فالمستخدم يكتب على طول. ده بيحصل بس لو الهدف عنصر بيتركّز عليه (input)؛ لو اللينك رايح لـ div الـ focus مش بيروح له.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الملخص</title>
<style>form { padding-block-start: 900px; }</style>
</head>
<body>
<main>
<h1>الفورم</h1>
<a id="l1" href="#email">الإيميل</a>
<a id="l2" href="#box">الصندوق</a>
<form>
  <label for="email">الإيميل</label>
  <input id="email" type="email">
  <div id="box">صندوق عادي</div>
</form>
</main>
</body>
</html>
~~~

**الإجابة:** الـ focus بيروح للحقل نفسه. لما اللينك يودّي لعنصر بيقبل الـ focus زي [[input]]، المتصفح بينزل له ويركّز فيه، فالمستخدم يكتب على طول. وده اللي بيخلي ملخص الأخطاء مفيد فعلًا.

لو الهدف [[div]] عادي، الصفحة بتنزل له، بس [[document.activeElement]] مش بيبقى الـ div. المتصفح بيحرّك نقطة بداية الـ Tab بس.

**لو محتاج الـ focus يروح لعنصر عادي** (زي عنوان الصفحة): حط عليه [[tabindex="-1"]]. الرقم ده معناه «يقبل الـ focus من الكود واللينكات، بس مش من Tab».

**الغلطة الشائعة:** تكتب JavaScript يعمل [[scrollIntoView]] ثم [[focus()]] لكل لينك. اللينك بيعمل ده لوحده.

~~~text الناتج
الضغط على لينك #email:
document.activeElement = input#email   الـ URL = #email   الحقل نزل لجوه الشاشة: true

الضغط على لينك #box:
document.activeElement = body

بعد tabindex="-1" على الصندوق:
document.activeElement = div#box
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** زرارين «بيبعت…»: واحد [[disabled]] وواحد [[aria-disabled="true"]]. من الحقل اللي قبلهم دوس Tab، وبعدين دوس Enter على اللي وصلت له.`, done: R`الـ Tab عدّى الـ disabled ووقف على الـ aria-disabled، والضغط عليه شغّل الـ onclick عادي (اتعدّ مرتين في التجربة). يعني aria-disabled بيسيب الزرار في الكيبورد ويقول إنه مقفول، بس الكود لازم يتأكد بنفسه بـ flag زي [[sending]] في الدرس.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الإرسال</title>
</head>
<body>
<main>
<h1>تسجيل</h1>
<label for="n">الاسم</label>
<input id="n">
<button id="a" disabled onclick="count()">بيبعت…</button>
<button id="b" aria-disabled="true" onclick="count()">بيبعت…</button>
<p id="c">0</p>
</main>
<script>
  let clicks = 0;
  function count() { clicks++; document.querySelector('#c').textContent = clicks; }
$__lt/script>
</body>
</html>
~~~

**اللي طلع:**

| | [[disabled]] | [[aria-disabled="true"]] |
|---|---|---|
| Tab بيقف عليه | لأ | أيوه |
| قارئ الشاشة يعرف إنه مقفول | أيوه، لو وصله | أيوه |
| الضغط بيشغّل onclick | لأ | **أيوه** |

الـ ARIA مش بتغيّر سلوك العنصر. دي بتقول لقارئ الشاشة معلومة بس. فالزرار لسه زرار عادي، والكود بتاعك لازم يمنع الضغط بنفسه:

~~~js
let sending = false;
async function send() {
  if (sending) return;
  sending = true;
  // ...
}
~~~

**إمتى كل واحد:** أثناء إرسال بتاخد ثواني، [[aria-disabled]] أحسن، لأن [[disabled]] بيرمي الـ focus من الزرار، واللي بيستخدم الكيبورد بيضيع مكانه. أما زرار مش متاح أصلًا، فـ [[disabled]] أوضح.

**الغلطة الشائعة:** تكتب [[aria-disabled]] وتفتكر إن الضغط اتمنع.

~~~text الناتج
Tab من الحقل: وقف عند #b
Enter عليه + Space عليه: العداد = 2
- button "بيبعت…" [disabled]
- button "بيبعت…" [disabled]
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**محاكاة:** خلي السيرفر بطيء: بدل الـ fetch حط [[await new Promise((r) => setTimeout(r, 2000))]]، وغيّر كلمة الزرار لـ «بيبعت…» وقت الانتظار. اضغط ٥ مرات ورا بعض بسرعة.`, done: R`عداد في الكود بيقول إن الإرسال اتنفّذ مرة واحدة بس، والزرار رجع «سجّل» بعد ثانيتين، ولو رميت error جوه الـ Promise الزرار برضه رجع (بسبب [[finally]]).`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تسجيل</title>
</head>
<body>
<main>
<h1>تسجيل</h1>
<form id="f">
  <label for="n">الاسم</label>
  <input id="n" value="منى">
  <button id="send">سجّل</button>
</form>
<p>مرات الإرسال: <output id="count">0</output></p>
</main>
<script>
  const button = document.querySelector('#send');
  let sending = false;
  let count = 0;
  window.shouldFail = false;

  async function fakeServer() {
    await new Promise((r) => setTimeout(r, 2000));
    if (window.shouldFail) throw new Error('السيرفر وقع');
  }

  document.querySelector('#f').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    sending = true;
    button.textContent = 'بيبعت…';
    button.setAttribute('aria-disabled', 'true');
    try {
      count++;
      document.querySelector('#count').textContent = count;
      await fakeServer();
    } catch (err) {
      console.error(err.message);
    } finally {
      sending = false;
      button.textContent = 'سجّل';
      button.removeAttribute('aria-disabled');
    }
  });
$__lt/script>
</body>
</html>
~~~

**السطور اللي بتمنع الإرسال المكرر:**

- [[if (sending) return;]] أول سطر بعد [[preventDefault]]. الـ flag بيتغيّر قبل أي [[await]]، فالضغطة التانية بتلاقيه true.
- [[finally]]: بيتنفّذ سواء الطلب نجح أو فشل. من غيره، أول خطأ بيسيب الزرار مقفول للأبد.
- بنعالج الـ [[submit]] مش الـ [[click]]، عشان Enter في الحقل يتعامل نفس المعاملة.

**ليه مش كفاية نعمل** [[button.disabled = true]]**:** ده بيرمي الـ focus من الزرار، والـ Enter في الحقل ممكن يوصل قبل ما السطر يتنفّذ. الـ flag أضمن.

**الغلطة الشائعة:** تحط [[sending = false]] في آخر الـ try. لو الطلب وقع، السطر ده مش هيتنفّذ.

~~~text الناتج
٥ ضغطات ورا بعض:
مرات الإرسال = 1
كلمة الزرار أثناء الانتظار = بيبعت…
بعد ثانيتين = سجّل

مع رمي error جوه الـ Promise:
كلمة الزرار بعد الخطأ = سجّل
الضغط تاني اشتغل: مرات الإرسال = 3
axe: 0 violations
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** فورم حجز لعيادة متخيلة بيفتح واتساب برسالة جاهزة: الاسم والميعاد والملاحظات في سطور، و [[window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener')]].`, done: R`الرسالة بتوصل كاملة بالسطور (الـ [[\n]] اتحوّلت [[%0A]])، واسم زي «سلمى & أحمد» بيوصل كامل. ومن غير [[encodeURIComponent]] الـ [[&]] بتقطع الرسالة: [[new URL('https://wa.me/?text=سلمى & أحمد').searchParams.get('text')]] رجّع [[سلمى ]] بس.`, sol: R`~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>احجز</title>
<style>
  body { font-family: system-ui; margin: 16px; }
  form { display: grid; gap: 8px; max-width: 340px; }
  input, textarea { padding: 10px; font: inherit; }
</style>
</head>
<body>
<main>
<h1>احجز عند عيادة الشفاء</h1>
<form id="f">
  <label for="n">الاسم</label>
  <input id="n" name="name" required autocomplete="name">
  <label for="d">الميعاد</label>
  <input id="d" name="when" type="datetime-local" required>
  <label for="m">ملاحظات</label>
  <textarea id="m" name="notes"></textarea>
  <button>افتح واتساب</button>
</form>
</main>
<script>
  document.querySelector('#f').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const msg = [
      'حجز جديد',
      'الاسم: ' + data.get('name'),
      'الميعاد: ' + data.get('when'),
      'ملاحظات: ' + (data.get('notes') || 'مفيش'),
    ].join('\n');
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
$__lt/script>
</body>
</html>
~~~

**السطور المهمة:**

- [[.join('\n')]]: بيحط سطر جديد بين كل جزء.
- [[encodeURIComponent]]: بيحوّل أي حرف ليه معنى في الـ URL لشكل آمن. السطر الجديد بقى [[%0A]]، و [[&]] بقت [[%26]].
- [[data.get('notes') || 'مفيش']]: لو الحقل فاضي، اكتب «مفيش».
- [[noopener]]: الصفحة الجديدة متقدرش توصل لصفحتك.

**ليه** [[encodeURIComponent]] **لازم:** الـ [[&]] في الـ URL معناها «اللي بعدي parameter جديد». فمن غيرها، اسم زي «سلمى & أحمد» بيقطع الرسالة عند الـ &، وباقيها بيتفهم كـ parameter تاني.

**الغلطة الشائعة:** تستخدم [[encodeURI]] بدل [[encodeURIComponent]]. الأولى بتسيب [[&]] زي ما هي، لأنها معمولة لـ URL كامل مش لقيمة جواه.

~~~text الناتج
الـ URL اللي اتفتح (أوله):
https://wa.me/?text=%D8%AD%D8%AC%D8%B2%20%D8%AC%D8%AF%D9%8A%D8…

فيه %0A بدل السطر الجديد: true
الرسالة اللي واتساب هيقراها:
حجز جديد
الاسم: سلمى & أحمد
الميعاد: 2026-07-01T10:30
ملاحظات: أول زيارة

من غير encodeURIComponent:
new URL('https://wa.me/?text=سلمى & أحمد').searchParams.get('text') = "سلمى "
overflow على 360: 0px   axe: 0 violations
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك عايز يشيل الملخص ويكتفي بالرسالة الحمرا تحت كل حقل. اكتبله في ٣ سطور إمتى الملخص بيفرق.`, done: R`الشرح فيه: الفورم الطويل اللي الغلط فيه تحت الشاشة، ومستخدم قارئ الشاشة اللي بيسمع العدد واللينكات مرة واحدة، والموبايل اللي الرسالة الحمرا فيه ممكن تبقى برّه الشاشة.`, sol: R`**الرد النموذجي لزميلك:**

~~~text الشرح
الرسالة تحت الحقل كفاية لو الفورم قصير والغلط قدامك. الملخص بيفرق في ٣ حالات:
١. فورم طويل والغلطة في حقل تحت الشاشة: من غير ملخص المستخدم بيدوس إرسال ومش شايف أي حاجة حصلت.
٢. قارئ الشاشة: بيسمع «فيه ٣ غلطات» والأسامي مرة واحدة، ويدخل على اللينك مباشرة بدل ما يدوّر حقل حقل.
٣. الموبايل: الشاشة صغيرة والكيبورد واكلة نصها، فالرسالة الحمرا غالبًا برّه الشاشة.
~~~

**الحل الصح الاتنين مع بعض:** الملخص بيقول إيه الغلط، والرسالة تحت كل حقل بتقول إزاي تصلّحه. والصفحة دي بتوضّح الحالة الأولى: الحقل فوق والزرار تحت:

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فورم طويل</title>
<style>.gap { height: 1400px; }</style>
</head>
<body>
<main>
<h1>فورم طويل</h1>
<form novalidate>
  <label for="e">الإيميل</label>
  <input id="e" required>
  <p class="err" hidden>اكتب إيميلك</p>
  <div class="gap"></div>
  <button type="button" onclick="document.querySelector('.err').hidden = false">ابعت</button>
</form>
</main>
</body>
</html>
~~~

**الغلطة الشائعة:** تحط الملخص من غير ما تنقل الـ focus له. قارئ الشاشة مش هيعرف إنه ظهر، إلا لو عليه [[role="alert"]] أو الـ focus راحله.

~~~text الناتج
شاشة 360×640، نزلت لآخر الفورم ودست ابعت:
الرسالة الحمرا موقعها y = -823، يعني فوق الشاشة ومش باينة
هل ظهرت في الشاشة؟ لأ
وكل اللي المستخدم شايفه: زرار مفيش بعده أي تغيير
~~~` },
          ],
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
            R`زرار الإرسال: [[form.querySelector('[type=submit]')]] بيمسك الزرار اللي بيبعت الفورم، عشان نقفله وقت الإرسال.`,
            "flag: بنبعت دلوقتي ولا لأ.",
            R`لما الفورم تتبعت: الـ function [[async]] عشان نقدر نستنى الـ fetch جواها بـ [[await]].`,
            "إحنا اللي هنبعت بـ fetch، فامنع الإرسال العادي.",
            "لو فيه طلب لسه مخلصش، تجاهل الضغطة دي.",
            R`كل الحقول (من غير الأزرار، لأن الزرار كمان ليه [[checkValidity]]).`,
            R`الحقول الغلط بس: [[filter]] بيسيب الحقل اللي [[checkValidity()]] بيرجّعه false.`,
            R`نلف على كل الحقول (السليم والغلط)، عشان السليم كمان لازم رسالته القديمة تتمسح.`,
            R`[[aria-invalid]] بـ true أو false حسب حالته.`,
            "رسالته تحته، وبتتمسح لوحدها لو بقى سليم.",
            "قفلة.",
            "الملخص يظهر لو فيه غلط.",
            R`عنوان الملخص فيه عدد الأخطاء، عشان أول حاجة قارئ الشاشة يقولها لما يوصل للملخص «فيه 2 حاجات محتاجة تتصلح».`,
            "لينك لكل حقل غلط باسمه من الـ label.",
            "لو فيه غلط: الـ focus على أول حقل غلط ووقف هنا.",
            "كله سليم: علّم إننا بنبعت.",
            "الزرار يبان مقفول ويفضل ماسك الـ focus.",
            R`[[try]] عشان لو الطلب فشل (النت قطع مثلًا) الكود اللي في [[finally]] يشتغل برضه.`,
            R`الطلب نفسه: [[fetch]] لعنوان الـ [[action]] بـ POST، و [[new FormData(form)]] بيجمع كل حقل ليه name.`,
            "...ومهما حصل (نجح أو فشل)...",
            R`...افتح الإرسال تاني: [[sending = false]] عشان الضغطة الجاية تتقبل.`,
            R`...ورجّع الزرار: شيل [[aria-disabled]] فقارئ الشاشة مبقاش يقول إنه مقفول.`,
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
