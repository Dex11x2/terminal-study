// تكملة تاب projects: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/projects/01.js (شرح حقول الدرس في أوله)
MORE("projects", [
    {
      t: "مشروع ٣: فورم متعدد الخطوات",
      l: 2,
      n: "حجز كشف في ٤ خطوات: select و radio، وأخطاء قارئ الشاشة بيقراها، وصورة بـ preview، وإرسال مرة واحدة حتى لو دست مرتين",
      items: [
        {
          cmd: "مشروع ٣: الـ spec والخطوات",
          title: "تقسّم فورم طويل لخطوات من غير ما تكسر الـ HTML إزاي؟",
          desc: R`المشروع: فورم «احجز كشف» في ٤ خطوات: بياناتك (اسم وموبايل وإيميل اختياري)، والكشف (تخصص من select، ونوع الكشف radio، واليوم)، وصورة روشتة اختيارية بمعاينة، ومراجعة وإرسال. HTML و JavaScript عادي، وسيرفر Express صغير بيستقبل الحجز.

الفورم ده فيه تقريبًا كل حاجة صعبة في الفورمات: validation على خطوات، ورسايل خطأ لقارئ الشاشة، وملفات، وضغطة مزدوجة، ونت بيفصل. لو عملته صح هنا، هتعمله في React أو Next بسهولة.

المحطة دي: الـ HTML كله. خلصت يعني: (١) [[<form>]] واحد فيه ٤ [[<section>]]، كلهم مخفيين بـ [[hidden]] إلا الحالي. (٢) كل حقل ليه [[<label for>]]، والـ radio جوه [[<fieldset>]] بـ [[<legend>]]. (٣) كل حقل ليه [[<p id="...-error">]] مربوط بـ [[aria-describedby]]، والـ hints كمان. (٤) قايمة الخطوات [[<ol>]] والحالية عليها [[aria-current="step"]]. (٥) [[autocomplete]] و [[inputmode]] و [[type]] صح لكل حقل.

الدروس: [[form و label]] و [[fieldset و radio]] و [[textarea و date و number]] و [[Constraint Validation API]] في تاب «HTML و CSS».`,
          example: R`  <form id="booking" novalidate>
    <div id="summary" class="summary" tabindex="-1" hidden>
      <h2>فيه <span id="summary-count"></span> محتاجين تتصلح:</h2>
      <ul id="summary-list"></ul>
    </div>

    <section class="step" data-step="0" aria-labelledby="s0">
      <h2 id="s0" tabindex="-1">الخطوة 1 من 4: بياناتك</h2>
      <label for="name">الاسم</label>
      <input id="name" name="name" autocomplete="name" required minlength="3" aria-describedby="name-error">
      <p class="error" id="name-error"></p>

      <label for="phone">الموبايل</label>
      <p class="hint" id="phone-hint">11 رقم ويبدأ بـ 01</p>
      <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required pattern="01[0125][0-9]{8}" aria-describedby="phone-hint phone-error">
      <p class="error" id="phone-error"></p>

      <label for="email">الإيميل (اختياري)</label>
      <input id="email" name="email" type="email" autocomplete="email" dir="ltr" aria-describedby="email-error">
      <p class="error" id="email-error"></p>
    </section>`,
          try: R`اكتب [[public/index.html]] بالخطوات الأربعة كاملة، ومؤقتًا شيل [[hidden]] من كل الخطوات عشان تشوفهم تحت بعض. اتأكد إن الفورم ده لوحده، من غير JS، ينفع يتملي ويتبعت. وافتحه على الموبايل: حقل الموبايل لازم يفتح كيبورد أرقام، والإيميل كيبورد فيه @، والاسم يقترح اسمك.`,
          flag: "script",
          deep: {
            why: R`لو كل خطوة [[<form>]] لوحده، هتضطر تجمّع الداتا بإيدك وتخزنها بين الخطوات، و [[FormData]] مش هيشوف غير خطوة واحدة. [[<form>]] واحد بخطوات مخفية بيخلي كل الحقول موجودة طول الوقت، والإرسال في الآخر [[new FormData(form)]] سطر واحد، والرجوع لخطوة قبل كده الداتا لسه فيها.`,
            how: R`[[novalidate]] على الـ form: بيقفل فقاعات المتصفح الافتراضية، بس الـ Constraint Validation API لسه شغال ([[required]] و [[pattern]] و [[minlength]] و [[checkValidity()]]). احنا بنستخدم نفس القواعد، بس بنعرض الرسايل بطريقتنا (المحطة الجاية).

[[aria-describedby="phone-hint phone-error"]]: قارئ الشاشة لما يدخل الحقل بيقول الـ label وبعدين الوصف، والوصف هنا الـ hint والخطأ مع بعض. عنصر الخطأ موجود من الأول وفاضي، فأول ما يتكتب فيه نص، بيتقري مع الحقل.

[[type="tel"]] و [[inputmode="tel"]] و [[autocomplete="tel"]] و [[dir="ltr"]]: كيبورد أرقام، واقتراح الرقم المحفوظ، والرقم بيتكتب شمال ليمين حتى في صفحة عربي. و [[pattern="01[0125][0-9]{8}"]] بيطابق الأرقام المصرية (١١ رقم تبدأ بـ 010 أو 011 أو 012 أو 015).

الـ [[<h2 tabindex="-1">]] في كل خطوة: هنحط عليه الـ focus لما الخطوة تتغير. والـ [[#summary]] كمان [[tabindex="-1"]] لنفس السبب.

الـ select أول option فيه [[value=""]] («اختار تخصص») عشان [[required]] يشتغل. من غيره أول تخصص بيتختار لوحده والمستخدم ممكن ميخدش باله.`,
            when: R`أي فورم فيه أكتر من ٦ أو ٧ حقول على موبايل، أو حقول بتعتمد على اختيار قبلها. الفورم القصير (دخول، أو اشتراك في newsletter) خليه صفحة واحدة.`,
            mistakes: R`[[placeholder]] بدل [[label]]: بيختفي أول ما تكتب، وقارئ الشاشة ممكن ميقراهوش. أو radio من غير fieldset، فقارئ الشاشة يقول «في العيادة، radio» من غير ما يقول السؤال. أو [[type="number"]] للموبايل (بيشيل الصفر اللي في الأول، وبيعمل scroll بالعجلة). أو [[id]] على عنصر بنفس اسم [[name]] حقل تاني: في الحل المرجعي الـ fieldset كان [[id="type"]] والـ radios [[name="type"]]، فـ [[form.elements.type]] رجّع الـ fieldset مع الـ radios، والـ validation بتاع الـ radio اتلغى من غير أي error. اتصلح لـ [[type-group]]، واختبار Playwright هو اللي مسكه.`
          },
          teach: R`## الفكرة: فورم واحد، و ٤ أقسام، و قسم واحد بس ظاهر

المثال أول الفورم: ملخص الأخطاء (مخفي) والخطوة الأولى بحقولها التلاتة. والـ solCode فيه الصفحة كاملة. هنفك المثال سطر سطر، وبعدين الخطوات التانية، ونشوف المتصفح بيفهم القواعد دي إزاي. كله اتجرّب في Chrome 154 (بـ Playwright) على الحل المرجعي شغال على Express 5.2 و multer 2.4 و Node 24.19.

---

## ١. الفورم

~~~text
<form id="booking" novalidate>
~~~

- [[<form>]] واحد لكل الخطوات: الحقول كلها موجودة في الـ DOM طول الوقت، فالرجوع لخطوة الداتا فيها، والإرسال [[new FormData(form)]] سطر واحد.
- [[novalidate]]: بيقفل فقاعات المتصفح اللي بتظهر لما تبعت فورم فيه غلط. القواعد نفسها ([[required]] و [[pattern]]) لسه شغالة، واحنا هنقرا نتيجتها بالكود ونعرض رسايلنا.

## ٢. ملخص الأخطاء

~~~text
<div id="summary" class="summary" tabindex="-1" hidden>
  <h2>فيه <span id="summary-count"></span> محتاجين تتصلح:</h2>
  <ul id="summary-list"></ul>
</div>
~~~

- [[hidden]]: attribute بيخفي العنصر من الشاشة **ومن قارئ الشاشة** ومن ترتيب الـ Tab.
- [[tabindex="-1"]]: العنصر ده مش بيتوصله بـ Tab، بس الكود يقدر يعمل له [[focus()]]. هنحط عليه الـ focus لما يبقى فيه أخطاء.
- [[#summary-count]] و [[#summary-list]] فاضيين، الكود هيملاهم.

## ٣. الخطوة

~~~text
<section class="step" data-step="0" aria-labelledby="s0">
  <h2 id="s0" tabindex="-1">الخطوة 1 من 4: بياناتك</h2>
~~~

- [[data-step="0"]]: رقم الخطوة من صفر (للقراية بس؛ الكود بيمشي بترتيب العناصر).
- [[aria-labelledby="s0"]]: اسم القسم هو نص الـ h2.
- العنوان فيه «1 من 4»: قارئ الشاشة لما الـ focus ييجي عليه بيعرف هو فين.

## ٤. حقل الاسم

~~~text
<label for="name">الاسم</label>
<input id="name" name="name" autocomplete="name" required minlength="3" aria-describedby="name-error">
<p class="error" id="name-error"></p>
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[<label for="name">]] | بيربط الكلمة بالحقل اللي [[id="name"]]: الضغط عليها بيحط الـ focus في الحقل، وقارئ الشاشة بيقولها اسم الحقل |
| [[name="name"]] | اسم الخانة في [[FormData]] وفي اللي بيوصل للسيرفر |
| [[autocomplete="name"]] | المتصفح يقترح اسمك المحفوظ |
| [[required]] | لازم يتملي ([[validity.valueMissing]]) |
| [[minlength="3"]] | ٣ حروف على الأقل ([[validity.tooShort]]) |
| [[aria-describedby="name-error"]] | الوصف هو نص الـ [[p]] اللي تحته، بيتقري بعد الاسم |

[[#name-error]] موجود من الأول وفاضي. أول ما الكود يكتب فيه، بيبقى جزء من وصف الحقل.

## ٥. حقل الموبايل

~~~text
<label for="phone">الموبايل</label>
<p class="hint" id="phone-hint">11 رقم ويبدأ بـ 01</p>
<input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required pattern="01[0125][0-9]{8}" aria-describedby="phone-hint phone-error">
~~~

- [[type="tel"]]: نص عادي (مش رقم)، فالصفر في الأول بيفضل. و [[inputmode="tel"]]: لوحة أرقام التليفون على الموبايل.
- [[dir="ltr"]]: الرقم بيتكتب شمال ليمين في صفحة عربي.
- [[pattern="01[0125][0-9]{8}"]]: regex لازم يطابق القيمة **كلها**: [[01]]، وبعده رقم من [[0]] و [[1]] و [[2]] و [[5]]، وبعده ٨ أرقام. المجموع ١١.
- [[aria-describedby="phone-hint phone-error"]]: أكتر من id بمسافة، فالوصف الـ hint وبعده الخطأ.

جرّبنا قيم في الحقل وقرينا [[validity]]:

~~~text الناتج
""             valid=false valueMissing     | browser msg: Please fill out this field.
"123"          valid=false patternMismatch  | browser msg: Please match the requested format.
"01912345678"  valid=false patternMismatch  | browser msg: Please match the requested format.
"01012345678"  valid=true
~~~

- [[019]] وقع: [[9]] مش من [[[0125]]].
- [[validationMessage]] رسالة المتصفح بلغته هو (إنجليزي هنا)، ومش بتقول المطلوب. عشان كده هنكتب رسايلنا في المحطة الجاية.

## ٦. الإيميل

~~~text
<input id="email" name="email" type="email" autocomplete="email" dir="ltr" aria-describedby="email-error">
~~~

مفيش [[required]]: فاضي مسموح. بس لو اتكتب، [[type="email"]] بيفحص الشكل ([[validity.typeMismatch]])، وبيفتح كيبورد فيه [[@]].

---

## ٧. الخطوات التانية (الـ solCode)

| الخطوة | العناصر المهمة |
|---|---|
| ٢ الكشف | [[<select required>]] أول [[option]] فيه [[value=""]]، و [[<fieldset>]] فيه [[<legend>]] والـ radios، و [[type="date"]] |
| ٣ الصورة | [[type="file" accept="image/jpeg,image/png,image/webp"]]، و [[#photo-error]] عليه [[role="alert"]]، و [[<figure id="preview" hidden>]] |
| ٤ المراجعة | [[<dl id="review">]] فاضي، و [[<p id="submit-status" role="status">]] |
| الزراير | «رجوع» و «التالي» [[type="button"]]، و «احجز» [[type="submit"]] مخفي |

- [[<option value="">]]: من غيره أول تخصص كان هيبقى مختار لوحده، و [[required]] مكانش هيقول حاجة.
- [[<fieldset>]] و [[<legend>]]: قارئ الشاشة بيقول السؤال («نوع الكشف») قبل كل اختيار. و [[required]] على radio واحد بس بيخلي المجموعة كلها مطلوبة.
- [[type="button"]] مهم: أي [[<button>]] جوه form من غير [[type]] بيبقى submit.
- [[#done]] **برّه** الفورم: بعد الحجز الفورم كله بيستخبى والرسالة تظهر.

## ٨. ليه [[id="type-group"]] مش [[id="type"]]

الـ radios اسمها [[name="type"]]. [[form.elements.type]] بيرجّع كل العناصر اللي [[name]] **أو** [[id]] بتاعها [[type]]. عملنا فورم تجريبي فيه [[<fieldset id="type">]] وسألناه:

~~~text الناتج
fieldset id="type":       RadioNodeList 3 FIELDSET,INPUT,INPUT first.checkValidity=true first is FIELDSET
الفورم الحقيقي (type-group): RadioNodeList 2 first.checkValidity=false
~~~

مع [[id="type"]] أول عنصر بقى الـ fieldset، و [[checkValidity()]] عليه [[true]] دايمًا، فالـ radio الفاضي كان هيعدّي من غير ولا رسالة. بعد التغيير لـ [[type-group]] أول عنصر هو الـ radio نفسه، والفحص بيقول [[false]] صح.

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| [[<form novalidate>]] واحد | الداتا كلها في مكان، والرسايل بطريقتنا |
| [[hidden]] على كل خطوة إلا الحالية | مخفية من الشاشة وقارئ الشاشة والـ Tab |
| [[label for]] لكل حقل، و [[fieldset]] + [[legend]] للـ radio | كل حقل ليه اسم مسموع |
| [[aria-describedby]] على الـ hint والخطأ | الوصف بيتقري مع الحقل |
| [[type]] و [[inputmode]] و [[autocomplete]] و [[dir]] | الكيبورد والاقتراح والاتجاه الصح |
| [[tabindex="-1"]] على العناوين والملخص | الكود يحط عليهم focus |
| [[id]] ميساويش [[name]] حقل تاني | [[form.elements]] بيرجّع الاتنين |`,
          lines: [
            R`فورم واحد لكل الخطوات، و [[novalidate]] عشان نعرض الأخطاء بطريقتنا.`,
            R`ملخص الأخطاء: مخفي، وبياخد focus من الكود.`,
            R`عنوانه بعدد الأخطاء.`,
            R`قايمة الأخطاء، كل واحد لينك للحقل بتاعه.`,
            R`قفلة الملخص.`,
            R`الخطوة الأولى، واسمها من العنوان بتاعها.`,
            R`العنوان فيه رقم الخطوة، و [[tabindex="-1"]] عشان ياخد focus.`,
            R`[[label]] مربوط بالحقل بـ [[for]].`,
            R`الاسم: مطلوب، ٣ حروف على الأقل، واقتراح الاسم المحفوظ، ووصفه عنصر الخطأ.`,
            R`عنصر الخطأ: فاضي لحد ما يبقى فيه خطأ.`,
            R`label الموبايل.`,
            R`الـ hint: بيتقري مع الحقل.`,
            R`الموبايل: كيبورد أرقام، واتجاه شمال ليمين، و pattern للأرقام المصرية، ووصفه الـ hint والخطأ.`,
            R`عنصر خطأ الموبايل.`,
            R`label الإيميل، ومكتوب إنه اختياري.`,
            R`[[type="email"]] بيفتح كيبورد فيه @ وبيتحقق من الشكل. مش [[required]].`,
            R`عنصر خطأ الإيميل.`,
            R`قفلة الخطوة الأولى.`
          ],
          sol: R`الصفحة من غير JS: الخطوات الأربعة تحت بعض، والـ submit شغال (بس مفيش سيرفر بيستقبله لسه). على الموبايل: الموبايل بيفتح لوحة أرقام، والإيميل فيه @ و .com، والاسم بيقترح اسمك من الجهاز.

الـ HTML الكامل تحت. لاحظ الـ fieldset: [[id="type-group"]] مش [[id="type"]]، والسبب مكتوب في الأخطاء الشائعة. ولاحظ إن [[#done]] برّه الـ form: بعد النجاح الـ form كله بيتخفي، ورسالة النجاح بتاخد الـ focus.

لو عملت الخطوات كـ ٤ forms: الإرسال هيحتاج تجمع [[FormData]] من كل واحد، والـ Enter في أي حقل هيبعت الخطوة لوحدها للسيرفر.`,
          solCode: R`<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>احجز كشف</title>
  <link rel="stylesheet" href="styles.css">
  <script type="module" src="form.js"></script>
</head>
<body>
<main>
  <h1>احجز كشف</h1>
  <ol class="steps" aria-label="خطوات الحجز">
    <li aria-current="step">بياناتك</li><li>الكشف</li><li>صورة</li><li>مراجعة</li>
  </ol>

  <form id="booking" novalidate>
    <div id="summary" class="summary" tabindex="-1" hidden>
      <h2>فيه <span id="summary-count"></span> محتاجين تتصلح:</h2>
      <ul id="summary-list"></ul>
    </div>

    <section class="step" data-step="0" aria-labelledby="s0">
      <h2 id="s0" tabindex="-1">الخطوة 1 من 4: بياناتك</h2>
      <label for="name">الاسم</label>
      <input id="name" name="name" autocomplete="name" required minlength="3" aria-describedby="name-error">
      <p class="error" id="name-error"></p>

      <label for="phone">الموبايل</label>
      <p class="hint" id="phone-hint">11 رقم ويبدأ بـ 01</p>
      <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required pattern="01[0125][0-9]{8}" aria-describedby="phone-hint phone-error">
      <p class="error" id="phone-error"></p>

      <label for="email">الإيميل (اختياري)</label>
      <input id="email" name="email" type="email" autocomplete="email" dir="ltr" aria-describedby="email-error">
      <p class="error" id="email-error"></p>
    </section>

    <section class="step" data-step="1" aria-labelledby="s1" hidden>
      <h2 id="s1" tabindex="-1">الخطوة 2 من 4: الكشف</h2>
      <label for="specialty">التخصص</label>
      <select id="specialty" name="specialty" required aria-describedby="specialty-error">
        <option value="">اختار تخصص</option>
        <option value="derma">جلدية</option>
        <option value="dental">أسنان</option>
        <option value="peds">أطفال</option>
      </select>
      <p class="error" id="specialty-error"></p>

      <fieldset id="type-group" aria-describedby="type-error">
        <legend>نوع الكشف</legend>
        <label><input type="radio" name="type" value="clinic" required> في العيادة</label>
        <label><input type="radio" name="type" value="online"> أونلاين</label>
        <p class="error" id="type-error"></p>
      </fieldset>

      <label for="date">اليوم</label>
      <input id="date" name="date" type="date" required aria-describedby="date-error">
      <p class="error" id="date-error"></p>
    </section>

    <section class="step" data-step="2" aria-labelledby="s2" hidden>
      <h2 id="s2" tabindex="-1">الخطوة 3 من 4: صورة روشتة أو تحليل (اختياري)</h2>
      <label for="photo">اختار صورة</label>
      <p class="hint" id="photo-hint">JPG أو PNG أو WebP، وأقصى حجم 2 ميجا</p>
      <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="photo-hint photo-error">
      <p class="error" id="photo-error" role="alert"></p>
      <figure id="preview" hidden>
        <img id="preview-img" alt="">
        <figcaption><span id="preview-name"></span> <button type="button" id="remove-photo">شيل الصورة</button></figcaption>
      </figure>
    </section>

    <section class="step" data-step="3" aria-labelledby="s3" hidden>
      <h2 id="s3" tabindex="-1">الخطوة 4 من 4: راجع وابعت</h2>
      <dl id="review"></dl>
      <p id="submit-status" role="status"></p>
    </section>

    <div class="nav">
      <button type="button" id="back" hidden>رجوع</button>
      <button type="button" id="next">التالي</button>
      <button type="submit" id="submit" hidden>احجز</button>
    </div>
  </form>

  <section id="done" hidden aria-labelledby="done-title">
    <h2 id="done-title" tabindex="-1">اتحجز. رقم الحجز <span id="booking-id"></span></h2>
    <p>هنكلمك على الموبايل نأكد الميعاد.</p>
  </section>
</main>
</body>
</html>`
        },
        {
          cmd: "مشروع ٣: أخطاء يقراها قارئ الشاشة",
          title: "تعمل validation لكل خطوة ورسايل واضحة للكل إزاي؟",
          desc: R`زرار «التالي» ميعدّيش غير لما حقول الخطوة الحالية تبقى سليمة. ولو فيه أخطاء: كل حقل غلط تحته رسالة بالعربي، وعليه [[aria-invalid]]، وملخص فوق فيه لينك لكل خطأ وبياخد الـ focus.

خلصت يعني: (١) «التالي» على خطوة فاضية بيطلّع الملخص، والـ focus عليه، وقارئ الشاشة بيقرا «فيه ٢ حاجات محتاجين تتصلح». (٢) لينك في الملخص بيودّي للحقل ويحط عليه الـ focus. (٣) الرسايل بتقول تعمل إيه («الرقم لازم 11 رقم ويبدأ بـ 010...»)، مش «invalid». (٤) أول ما الحقل يتصلح، الرسالة بتختفي وهو بيكتب. (٥) الـ radio الفاضي ليه رسالة.

الدروس: [[Constraint Validation API]] و [[ملخص الأخطاء]] و [[aria]] في تاب «HTML و CSS».`,
          example: R`function validateStep(i) {
  const errors = []
  const names = new Set([...steps[i].querySelectorAll('input, select')].filter(el => el.type !== 'file').map(el => el.name))
  for (const name of names) {
    const el = form.elements[name]
    const first = el instanceof RadioNodeList ? el[0] : el
    const msg = first.checkValidity() ? '' : messageFor(first)
    setError(name, msg)
    if (msg) errors.push({ id: first.id || (first.id = $__bt$__{name}-first$__bt), msg })
  }
  showSummary(errors)
  return errors.length === 0
}`,
          try: R`اكتب [[MESSAGES]] و [[messageFor]] و [[setError]] و [[validateStep]] و [[showSummary]]، واربط «التالي» بيهم. جرّب بالكيبورد وقارئ الشاشة: «التالي» على خطوة فاضية، واسمع الملخص، ودوس على أول لينك، واكتب الاسم واسمع الرسالة بتختفي. وفي الخطوة التانية سيب الـ radio فاضي.`,
          flag: "script",
          deep: {
            why: R`رسايل المتصفح الافتراضية بتظهر فقاعة لحقل واحد بس، وبلغة المتصفح مش لغة الموقع، وبتختفي بعد ثواني. ومستخدم قارئ الشاشة غالبًا مبيعرفش إن فيه خطأ أصلًا لو الرسالة ظهرت بعيد عن الـ focus. الملخص + الرسالة جنب الحقل + [[aria-invalid]] هو النمط اللي مواقع الحكومات الكبيرة بتستخدمه (GOV.UK) لأنه اتجرّب على ناس كتير.`,
            how: R`[[el.validity]] فيه flag لكل نوع خطأ: [[valueMissing]] و [[tooShort]] و [[patternMismatch]] و [[typeMismatch]] و [[rangeUnderflow]]. [[messageFor]] بتلف على رسايل الحقل وترجّع أول واحدة الـ flag بتاعها true، ولو ملقتش ترجع [[validationMessage]] بتاعة المتصفح كاحتياطي.

[[validateStep(i)]] بتجيب أسماء الحقول اللي في الخطوة (من غير الملف، اللي ليه منطق لوحده)، و [[Set]] عشان الـ radio الواحد ليه أكتر من input بنفس الاسم. [[form.elements[name]]] بيرجّع [[RadioNodeList]] للـ radios، فبنفحص أول واحد: [[required]] على radio واحد في المجموعة بيخلي المجموعة كلها مطلوبة.

الملخص: كل خطأ لينك [[href="#id"]]. الضغط عليه بيعمل [[preventDefault]] وبيحط الـ focus على الحقل بإيدك، لأن الانتقال للـ anchor مش دايمًا بيحط focus على الـ input. والملخص نفسه بياخد [[focus()]] فقارئ الشاشة بيقرا محتواه كله.

[[aria-invalid="true"]] بيخلي قارئ الشاشة يقول «invalid entry» مع الحقل، وبيدّيك selector للـ CSS ([[[aria-invalid="true"]]]) للـ border الأحمر.

والـ input listener: لو الحقل عليه [[aria-invalid]]، أي كتابة بتعيد فحصه. فالرسالة تختفي أول ما يبقى سليم، بس مبتظهرش وانت لسه بتكتب أول مرة (أزعج حاجة في الفورمات).

وكل ده في المتصفح للراحة بس: السيرفر بيعيد الفحص كله (المحطة الأخيرة).`,
            when: R`أي فورم. الملخص مهم بالذات لما الأخطاء ممكن تبقى تحت الشاشة، أو في خطوة فيها حقول كتير.`,
            mistakes: R`الخطأ لونه أحمر بس من غير نص. أو الرسالة بتظهر أول ما المستخدم يبدأ يكتب («الإيميل غلط» وهو لسه كاتب حرف). أو [[alert()]] للأخطاء. أو [[aria-live]] على كل رسالة خطأ، فلما ٥ حقول يغلطوا مع بعض قارئ الشاشة يقرا ٥ رسايل ورا بعض. أو [[innerHTML]] للملخص بنص فيه قيم من المستخدم (الحل بيستخدم [[textContent]]). أو تعتمد على الـ validation ده وتنسى السيرفر.`
          },
          teach: R`## الفكرة: المتصفح بيقول «فيه غلط إيه»، واحنا بنقول «تعمل إيه»

المثال [[validateStep(i)]]: بتفحص حقول خطوة واحدة، وتكتب رسالة تحت كل حقل غلط، وتملا الملخص. والـ solCode فيه كل اللي حواليها: الرسايل، و [[messageFor]]، و [[setError]]، و [[showSummary]]، والـ listeners. هنفكهم بترتيب الملف، وبعدين نجرّبهم في Chrome 154 (بـ Playwright) على الحل المرجعي.

---

## ١. أول الملف: المتغيرات

~~~text form.js
const form = document.querySelector('#booking')
const steps = [...form.querySelectorAll('.step')]
const stepItems = [...document.querySelectorAll('.steps li')]
const [back, nextBtn, submitBtn] = ['#back', '#next', '#submit'].map(s => document.querySelector(s))
const summary = document.querySelector('#summary')
const last = steps.length - 1
let current = 0
~~~

- [[[...form.querySelectorAll('.step')]]]: [[querySelectorAll]] بيرجّع NodeList، و [[...]] بيحوّلها array عادية ([[map]] و [[forEach]] بالأرقام).
- [[const [back, nextBtn, submitBtn] = [...].map(...)]]: array destructuring. ٣ selectors اتحوّلوا ٣ عناصر، وكل واحد في متغير.
- [[last]] = 3، رقم آخر خطوة. و [[current]] الخطوة الحالية.

## ٢. الرسايل

~~~text
const MESSAGES = {
  name: { valueMissing: 'اكتب اسمك', tooShort: 'الاسم لازم 3 حروف على الأقل' },
  phone: { valueMissing: 'اكتب رقم الموبايل', patternMismatch: 'الرقم لازم 11 رقم ويبدأ بـ 010 أو 011 أو 012 أو 015' },
  ...
  date: { valueMissing: 'اختار اليوم', rangeUnderflow: 'اختار يوم من النهارده أو بعده' },
}
const today = new Date().toLocaleDateString('en-CA')
form.date.min = today
~~~

- كل حقل ليه object: اسم الـ flag في [[validity]]، والرسالة. الرسالة بتقول **تعمل إيه**، مش «invalid».
- [[toLocaleDateString('en-CA')]]: التاريخ بشكل كندا، وهو بالصدفة [[YYYY-MM-DD]]، نفس الشكل اللي [[input type="date"]] عايزه.
- [[form.date.min = today]]: [[form.date]] = الحقل اللي اسمه [[date]]. و [[min]] بيخلي أي يوم قبل النهارده [[rangeUnderflow]]. اتقرا وقت التجربة: [[min= 2026-10-08]].

## ٣. [[messageFor(el)]]

~~~text
function messageFor(el) {
  for (const [key, msg] of Object.entries(MESSAGES[el.name] ?? {})) if (el.validity[key]) return msg
  return el.validationMessage
}
~~~

- [[MESSAGES[el.name] ?? {}]]: رسايل الحقل ده، ولو مالوش رسايل object فاضي.
- [[Object.entries]]: بيحوّل الـ object لأزواج [[[key, msg]]]، و [[for...of]] بيلف عليهم بالترتيب.
- أول flag يبقى [[true]] نرجّع رسالته. ولو مفيش، رسالة المتصفح كاحتياطي.

## ٤. [[setError(name, msg)]]

~~~text
function setError(name, msg) {
  document.querySelector($__bt#$__{name}-error$__bt).textContent = msg
  const el = form.elements[name]
  if (el instanceof RadioNodeList) return
  if (msg) el.setAttribute('aria-invalid', 'true')
  else el.removeAttribute('aria-invalid')
}
~~~

- اكتب الرسالة في [[#name-error]] (أو امسحها لو [[msg]] فاضي). [[textContent]]: نص بس.
- [[form.elements[name]]]: الحقل بالاسم. وللـ radios بيرجّع [[RadioNodeList]] (مجموعة)، ومينفعش [[aria-invalid]] عليها كلها، فبنخرج.
- [[aria-invalid="true"]]: قارئ الشاشة بيقول «invalid entry»، والـ CSS بيلوّن البوردر بـ [[[aria-invalid="true"]]].

## ٥. [[validateStep(i)]] (المثال)

~~~text
function validateStep(i) {
  const errors = []
  const names = new Set([...steps[i].querySelectorAll('input, select')].filter(el => el.type !== 'file').map(el => el.name))
~~~

من جوه لبرة:

1. [[steps[i].querySelectorAll('input, select')]]: كل الحقول في الخطوة دي بس.
2. [[filter(el => el.type !== 'file')]]: من غير حقل الصورة (ليه فحص لوحده في المحطة الرابعة).
3. [[map(el => el.name)]]: الأسماء. في الخطوة ٢: [["specialty", "type", "type", "date"]].
4. [[new Set(...)]]: Set بيشيل المكرر، فالـ radios ([[type]] مرتين) تتفحص مرة.

~~~text
  for (const name of names) {
    const el = form.elements[name]
    const first = el instanceof RadioNodeList ? el[0] : el
    const msg = first.checkValidity() ? '' : messageFor(first)
    setError(name, msg)
    if (msg) errors.push({ id: first.id || (first.id = $__bt$__{name}-first$__bt), msg })
  }
  showSummary(errors)
  return errors.length === 0
}
~~~

- [[el[0]]] للـ radio: [[required]] عليه بيمثّل المجموعة كلها، فلو مفيش واحد مختار [[valueMissing]] بيبقى [[true]] عليه.
- [[checkValidity()]]: [[true]] لو سليم.
- [[first.id || (first.id = ...)]]: الـ radio مالوش id، فنديله واحد ([[type-first]]) عشان لينك الملخص يوديله. [[||]] بيرجّع الـ id لو موجود، ولو لأ بيعمل التخصيص ويرجّع قيمته.

## ٦. [[showSummary(errors)]]

~~~text
function showSummary(errors) {
  summary.hidden = errors.length === 0
  if (!errors.length) return
  document.querySelector('#summary-count').textContent = errors.length === 1 ? 'حاجة واحدة' : $__bt$__{errors.length} حاجات$__bt
  document.querySelector('#summary-list').replaceChildren(...errors.map(({ id, msg }) => {
    const li = document.createElement('li'), a = document.createElement('a')
    a.href = $__bt#$__{id}$__bt
    a.textContent = msg
    li.append(a)
    return li
  }))
  summary.focus()
}
~~~

- [[summary.hidden = ...]]: يظهر لو فيه أخطاء.
- [[replaceChildren(...)]]: امسح اللي جوه القايمة وحط الجديد. كل خطأ [[li]] جواه لينك للحقل.
- [[createElement]] و [[textContent]] بدل [[innerHTML]]: مفيش أي نص بيتفسر HTML.
- [[summary.focus()]]: قارئ الشاشة بيقرا الملخص كله.

## ٧. الـ listeners

~~~text
summary.addEventListener('click', e => {
  const link = e.target.closest('a')
  if (!link) return
  e.preventDefault()
  document.getElementById(link.hash.slice(1)).focus()
})

form.addEventListener('input', e => {
  const el = e.target
  if (el.getAttribute('aria-invalid') === 'true' || el.type === 'radio') setError(el.name, el.checkValidity() ? '' : messageFor(el))
})
~~~

- [[link.hash]] = [["#name"]]، و [[slice(1)]] بيشيل [[#]]. [[preventDefault()]] بيمنع القفزة العادية، و [[focus()]] بيحط المؤشر في الحقل فعلًا.
- [[input]] event بيحصل مع كل حرف. بس بنعيد الفحص **لو الحقل كان غلط قبل كده** (أو radio)، فالرسالة مبتظهرش وانت لسه بتكتب أول مرة، وبتختفي أول ما تصلّح.

---

## ٨. التجربة

«التالي» على الخطوة الأولى فاضية:

~~~text الناتج
focus: DIV#summary "فيه 2 حاجات محتاجين تتصلح: اكتب اسمك اكتب رقم الموبايل"
summary list: <li><a href="#name">اكتب اسمك</a></li><li><a href="#phone">اكتب رقم الموبايل</a></li>
name aria-invalid: true
phone: - textbox "الموبايل" [invalid]
~~~

الإيميل مش في الملخص: فاضي ومش [[required]]. ودوسنا اللينك الأول وكتبنا:

~~~text الناتج
after link focus: INPUT#name
typing "من":    الاسم لازم 3 حروف على الأقل   aria-invalid=true
typing "منى علي": ""                         aria-invalid=null
~~~

الرسالة اتغيرت من [[valueMissing]] لـ [[tooShort]] وانت بتكتب، واختفت أول ما بقى سليم. وفي الخطوة التانية فاضية الملخص فيه «اختار التخصص» و «اختار نوع الكشف» و «اختار اليوم»، ويوم 2020-01-01: «اختار يوم من النهارده أو بعده».

واختبار Playwright الأول في المحطة الأخيرة بيتأكد من ده كله، وكمان إن الوصف المسموع للموبايل [[11 رقم ويبدأ بـ 01 اكتب رقم الموبايل]] (الـ hint وبعده الخطأ)، و axe صفر violations والأخطاء ظاهرة.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[MESSAGES]] | رسالة بالعربي لكل flag في [[validity]] |
| [[messageFor]] | أول flag [[true]] ← رسالته |
| [[setError]] | الرسالة تحت الحقل و [[aria-invalid]] |
| [[validateStep]] | حقول الخطوة بس، و [[Set]] للـ radio، و [[checkValidity()]] |
| [[showSummary]] | لينك لكل خطأ و [[focus()]] على الملخص |
| [[input]] listener | يعيد الفحص بس لو كان غلط |

- المتصفح بيعمل القواعد ([[required]] و [[pattern]] و [[min]])، واحنا بنعمل الرسايل.
- كل ده راحة للمستخدم: السيرفر بيعيد الفحص (المحطة الأخيرة).`,
          lines: [
            R`بتفحص خطوة واحدة وترجّع true لو سليمة.`,
            R`قايمة الأخطاء اللي هتتعرض في الملخص.`,
            R`أسماء حقول الخطوة من غير الملف، و [[Set]] عشان الـ radio يتفحص مرة.`,
            R`لكل اسم:`,
            R`هات العنصر (أو [[RadioNodeList]] لو radio).`,
            R`للـ radio خد أول واحد، الـ required عليه بيمثّل المجموعة.`,
            R`لو سليم مفيش رسالة، لو لأ هات الرسالة المناسبة.`,
            R`اكتب الرسالة تحت الحقل وحط أو شيل [[aria-invalid]].`,
            R`لو فيه خطأ، ضيفه للملخص بـ id الحقل (والـ radio ياخد id لو معندوش).`,
            R`قفلة الـ for.`,
            R`اعرض الملخص أو خبّيه.`,
            R`رجّع النتيجة.`,
            R`قفلة الدالة.`
          ],
          sol: R`«التالي» على الخطوة الأولى فاضية: الملخص بيظهر وعليه الـ focus، وفيه لينكين: «اكتب اسمك» و «اكتب رقم الموبايل». الإيميل مش فيه لأنه اختياري. الحقلين عليهم [[aria-invalid="true"]]. وقارئ الشاشة على حقل الموبايل بيقول «الموبايل، edit، invalid entry، 11 رقم ويبدأ بـ 01 اكتب رقم الموبايل».

ده اتختبر في Playwright: [[toBeFocused()]] على الملخص، و [[toHaveCount(2)]] على اللينكات، و [[toHaveAccessibleDescription('اكتب اسمك')]] على الاسم، والضغط على اللينك بيحط الـ focus على الحقل، والكتابة بتشيل [[aria-invalid]]، و axe صفر violations والأخطاء ظاهرة.

الحل المرجعي تحت: أول الملف لحد الـ input listener.`,
          solCode: R`const form = document.querySelector('#booking')
const steps = [...form.querySelectorAll('.step')]
const stepItems = [...document.querySelectorAll('.steps li')]
const [back, nextBtn, submitBtn] = ['#back', '#next', '#submit'].map(s => document.querySelector(s))
const summary = document.querySelector('#summary')
const last = steps.length - 1
let current = 0

const MESSAGES = {
  name: { valueMissing: 'اكتب اسمك', tooShort: 'الاسم لازم 3 حروف على الأقل' },
  phone: { valueMissing: 'اكتب رقم الموبايل', patternMismatch: 'الرقم لازم 11 رقم ويبدأ بـ 010 أو 011 أو 012 أو 015' },
  email: { typeMismatch: 'الإيميل مش مكتوب صح، زي name@example.com' },
  specialty: { valueMissing: 'اختار التخصص' },
  type: { valueMissing: 'اختار نوع الكشف' },
  date: { valueMissing: 'اختار اليوم', rangeUnderflow: 'اختار يوم من النهارده أو بعده' },
}
const today = new Date().toLocaleDateString('en-CA')
form.date.min = today

function messageFor(el) {
  for (const [key, msg] of Object.entries(MESSAGES[el.name] ?? {})) if (el.validity[key]) return msg
  return el.validationMessage
}

function setError(name, msg) {
  document.querySelector($__bt#$__{name}-error$__bt).textContent = msg
  const el = form.elements[name]
  if (el instanceof RadioNodeList) return
  if (msg) el.setAttribute('aria-invalid', 'true')
  else el.removeAttribute('aria-invalid')
}

function validateStep(i) {
  const errors = []
  const names = new Set([...steps[i].querySelectorAll('input, select')].filter(el => el.type !== 'file').map(el => el.name))
  for (const name of names) {
    const el = form.elements[name]
    const first = el instanceof RadioNodeList ? el[0] : el
    const msg = first.checkValidity() ? '' : messageFor(first)
    setError(name, msg)
    if (msg) errors.push({ id: first.id || (first.id = $__bt$__{name}-first$__bt), msg })
  }
  showSummary(errors)
  return errors.length === 0
}

function showSummary(errors) {
  summary.hidden = errors.length === 0
  if (!errors.length) return
  document.querySelector('#summary-count').textContent = errors.length === 1 ? 'حاجة واحدة' : $__bt$__{errors.length} حاجات$__bt
  document.querySelector('#summary-list').replaceChildren(...errors.map(({ id, msg }) => {
    const li = document.createElement('li'), a = document.createElement('a')
    a.href = $__bt#$__{id}$__bt
    a.textContent = msg
    li.append(a)
    return li
  }))
  summary.focus()
}

summary.addEventListener('click', e => {
  const link = e.target.closest('a')
  if (!link) return
  e.preventDefault()
  document.getElementById(link.hash.slice(1)).focus()
})

form.addEventListener('input', e => {
  const el = e.target
  if (el.getAttribute('aria-invalid') === 'true' || el.type === 'radio') setError(el.name, el.checkValidity() ? '' : messageFor(el))
})`
        },
        {
          cmd: "مشروع ٣: التنقل والمراجعة",
          title: "تتنقل بين الخطوات وتعرض المراجعة من غير ما حد يتوه إزاي؟",
          desc: R`«التالي» و «رجوع» بيبدّلوا الخطوة، والمؤشر فوق بيتحدث، والـ focus بيروح لعنوان الخطوة الجديدة. والخطوة الأخيرة بتعرض كل اللي اتكتب عشان المستخدم يراجع قبل ما يبعت.

خلصت يعني: (١) «رجوع» بيرجّع للخطوة اللي قبلها والداتا زي ما هي. (٢) [[aria-current="step"]] بيتنقل مع الخطوة. (٣) قارئ الشاشة بيقرا «الخطوة 2 من 4: الكشف» أول ما تتغير. (٤) الـ Enter في أي حقل بيعمل «التالي» مش إرسال. (٥) المراجعة بتعرض اسم التخصص («أسنان») مش القيمة ([[dental]])، واسم نوع الكشف، واسم الصورة.

الدروس: [[FormData و URLSearchParams]] في تاب «JavaScript»، و [[إعلان تغيير الصفحة]] في تاب «HTML و CSS».`,
          example: R`function go(i) {
  steps[current].hidden = true
  current = i
  steps[i].hidden = false
  stepItems.forEach((li, j) => j === i ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'))
  back.hidden = i === 0
  nextBtn.hidden = i === last
  submitBtn.hidden = i !== last
  summary.hidden = true
  if (i === last) renderReview()
  steps[i].querySelector('h2').focus()
}

nextBtn.addEventListener('click', () => { if (validateStep(current)) go(current + 1) })
back.addEventListener('click', () => go(current - 1))`,
          try: R`اكتب [[go(i)]] و [[renderReview()]]، واربط «التالي» و «رجوع». وفي الـ submit listener: لو مش في آخر خطوة، اعتبر الـ submit «التالي». جرّب: املا الخطوة الأولى، ودوس Enter جوه حقل الموبايل: لازم تروح للخطوة التانية مش تبعت. ارجع للأولى وغيّر الاسم، وروح للمراجعة: الاسم الجديد لازم يظهر.`,
          flag: "script",
          deep: {
            why: R`الـ wizard اللي مبيقولش انت فين ولا بيحفظ الداتا لما ترجع هو أكتر حاجة بتخلي الناس تقفل الفورم في النص. وبالنسبة لقارئ الشاشة، تبديل الخطوة من غير ما الـ focus يتحرك معناه إن الشاشة اتغيرت وهو لسه واقف على زرار «التالي» ومش عارف.`,
            how: R`[[go(i)]] بتخفي الخطوة الحالية بـ [[hidden]] وتظهر الجديدة. [[hidden]] مش [[display: none]] في CSS بس، ده attribute بيشيل العنصر من الـ accessibility tree ومن ترتيب الـ Tab كمان. وبتحدّث [[aria-current]] على المؤشر، وبتظهر وتخفي الزراير («رجوع» مش في الأولى، و «احجز» في الأخيرة بس). وفي الآخر [[focus()]] على الـ h2.

[[form.addEventListener('submit')]]: Enter في أي input بيعمل submit للفورم (implicit submission) حتى لو زرار الـ submit مخفي. عشان كده الـ listener بيسأل: لو مش آخر خطوة، يعمل validate و [[go(current + 1)]]، وكأنك دوست «التالي».

المراجعة بتتبني من [[FormData(form)]] بس بتعرض النص المفهوم: للـ select [[el.selectedOptions[0].text]]، وللـ radio نص الـ label بتاع المختار. وبتتبني بـ [[createElement]] و [[textContent]]، فأي حاجة المستخدم كتبها بتتعرض كنص.

و [[<dl>]] (dt و dd) هو العنصر اللي معناه «اسم وقيمة»، وقارئ الشاشة بيقراه كده.`,
            when: R`أي فورم متعدد الخطوات. وفي React نفس الفكرة: state للخطوة الحالية، والحقول كلها في نفس الفورم (react-hook-form بيدعم ده).`,
            mistakes: R`تمسح الخطوة من الـ DOM بدل ما تخفيها، فالداتا تروح. أو «رجوع» بيعمل validation (مش لازم: المستخدم راجع يصلّح). أو تنسى الـ Enter فالفورم يتبعت من الخطوة الأولى ناقص. أو المراجعة بتعرض [[dental]] و [[online]]. أو مؤشر خطوات بالألوان بس من غير [[aria-current]].`
          },
          teach: R`## الفكرة: [[go(i)]] بتبدّل الخطوة، و [[renderReview()]] بتعرض اللي اتكتب بالكلام المفهوم

المثال [[go(i)]] و listener «التالي» و «رجوع». والـ solCode فيه [[renderReview()]] كمان. هنفكهم سطر سطر، ونشوف Enter جوه حقل بيعمل إيه، وبعدين المراجعة الحقيقية اللي طلعت. اتجرّب في Chrome 154 (بـ Playwright) على الحل المرجعي.

---

## ١. [[go(i)]]

~~~text
function go(i) {
  steps[current].hidden = true
  current = i
  steps[i].hidden = false
~~~

خبّي الحالية، وحدّث الرقم، واظهر الجديدة. [[hidden]] هنا property بتحط أو تشيل الـ attribute. الخطوة المخفية الحقول بتاعتها لسه في الفورم وقيمها زي ما هي.

~~~text
  stepItems.forEach((li, j) => j === i ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'))
~~~

لف على [[<li>]] المؤشر فوق: اللي رقمه [[i]] ياخد [[aria-current="step"]]، والباقي يتشال منه. قارئ الشاشة بيقول «current step» على الحالي، والـ CSS بيميّزه بـ [[.steps [aria-current]]].

~~~text
  back.hidden = i === 0
  nextBtn.hidden = i === last
  submitBtn.hidden = i !== last
  summary.hidden = true
~~~

كل سطر شرط بيرجّع [[true]] أو [[false]]:

| الخطوة | رجوع | التالي | احجز |
|---|---|---|---|
| 0 | مخفي | ظاهر | مخفي |
| 1 و 2 | ظاهر | ظاهر | مخفي |
| 3 ([[last]]) | ظاهر | مخفي | ظاهر |

و [[summary.hidden = true]]: أخطاء الخطوة اللي فاتت ملهاش معنى هنا.

~~~text
  if (i === last) renderReview()
  steps[i].querySelector('h2').focus()
}
~~~

- المراجعة بتتبني **كل مرة** تدخل الخطوة الأخيرة، فلو رجعت وغيّرت حاجة، المراجعة الجديدة فيها التغيير.
- [[focus()]] على عنوان الخطوة: قارئ الشاشة يقرا «الخطوة 2 من 4: الكشف».

## ٢. الزراير

~~~text
nextBtn.addEventListener('click', () => { if (validateStep(current)) go(current + 1) })
back.addEventListener('click', () => go(current - 1))
~~~

«التالي» بيفحص الخطوة الأول، و «رجوع» لأ: اللي راجع غالبًا راجع يصلّح.

## ٣. Enter جوه حقل

أي Enter جوه [[input]] في فورم بيعمل submit (اسمها implicit submission)، حتى و «احجز» مخفي. عشان كده أول سطرين في الـ submit listener (المحطة الأخيرة):

~~~text
form.addEventListener('submit', async e => {
  e.preventDefault()
  if (current !== last) { if (validateStep(current)) go(current + 1); return }
~~~

لو مش آخر خطوة: اعمل زي «التالي» واخرج. جرّبنا: كتبنا الاسم والموبايل ودوسنا Enter في حقل الموبايل:

~~~text الناتج
Enter in phone -> H2#s1 "الخطوة 2 من 4: الكشف" | aria-current: الكشف
~~~

## ٤. [[renderReview()]]

~~~text
function renderReview() {
  const labels = { name: 'الاسم', phone: 'الموبايل', email: 'الإيميل', specialty: 'التخصص', type: 'نوع الكشف', date: 'اليوم' }
  const data = new FormData(form)
~~~

- [[labels]]: اسم الخانة → الكلمة اللي تتعرض. وترتيبها هو ترتيب العرض.
- [[new FormData(form)]]: كل قيم الفورم، حتى اللي في خطوات مخفية، ومعاها الملف.

~~~text
  const rows = Object.entries(labels).flatMap(([name, label]) => {
    const el = form.elements[name]
    const value = el.tagName === 'SELECT' ? el.selectedOptions[0].text
      : el instanceof RadioNodeList ? form.querySelector($__bt[name="$__{name}"]:checked$__bt)?.parentElement.textContent.trim()
      : data.get(name)
~~~

- [[flatMap]]: زي [[map]]، بس كل عنصر بيرجّع array ([[[dt, dd]]]) وكلهم بيتفردوا في array واحدة.
- القيمة حسب نوع الحقل (ternary متداخل):
  - [[select]]: [[selectedOptions[0].text]] = النص «أسنان»، مش القيمة [[dental]].
  - radio: [[:checked]] = المختار، و [[parentElement]] = الـ [[label]] اللي حواليه، و [[textContent.trim()]] = «أونلاين». و [[?.]] لو مفيش مختار.
  - غير كده: [[data.get(name)]].

~~~text
    const dt = document.createElement('dt'), dd = document.createElement('dd')
    dt.textContent = label
    dd.textContent = value || '—'
    return [dt, dd]
  })
~~~

[[<dt>]] الاسم و [[<dd>]] القيمة، جوه [[<dl>]]. و [[value || '—']]: الفاضي (الإيميل) يتعرض شرطة.

~~~text
  const photo = data.get('photo')
  const dt = document.createElement('dt'), dd = document.createElement('dd')
  dt.textContent = 'الصورة'
  dd.textContent = photo?.size ? photo.name : 'من غير صورة'
  document.querySelector('#review').replaceChildren(...rows, dt, dd)
}
~~~

[[data.get('photo')]] بيرجّع [[File]]. ولو مفيش صورة، [[FormData]] بيحط File فاضي برضه. سألنا الفورم وهو من غير صورة: [[File "" 0 application/octet-stream]]، يعني اسم فاضي وحجم صفر. فبنفحص [[size]] مش وجوده.

## ٥. المراجعة الحقيقية

ملينا الخطوات ([[منى علي]] و [[01012345678]] من غير إيميل، وأسنان، وأونلاين، وبكره، وصورة [[rx.png]]):

~~~text الناتج (#review)
الاسم | منى علي | الموبايل | 01012345678 | الإيميل | — | التخصص | أسنان | نوع الكشف | أونلاين | اليوم | 2026-10-09 | الصورة | rx.png
focus: H2#s3 "الخطوة 4 من 4: راجع وابعت"
~~~

واختبار Playwright «back keeps the data» بيرجع من الخطوة التانية ويتأكد إن الاسم لسه [[منى علي]].

---

## الخلاصة

| الحاجة | الكود |
|---|---|
| تبديل الخطوة | [[hidden]] على الحالية والجديدة |
| المؤشر | [[aria-current="step"]] على واحد بس |
| الزراير | [[hidden]] حسب [[i === 0]] و [[i === last]] |
| قارئ الشاشة يعرف إن الخطوة اتغيرت | [[focus()]] على الـ h2 |
| Enter مايبعتش بدري | الـ submit listener: لو مش آخر خطوة = «التالي» |
| المراجعة بالكلام | [[selectedOptions[0].text]] ونص الـ label للـ radio |
| الصورة | [[photo?.size]] مش [[photo]] |`,
          lines: [
            R`[[go(i)]]: انقل للخطوة رقم i.`,
            R`خبّي الحالية.`,
            R`حدّث الرقم.`,
            R`اظهر الجديدة.`,
            R`[[aria-current="step"]] على الخطوة الحالية بس في المؤشر.`,
            R`«رجوع» مش في الخطوة الأولى.`,
            R`«التالي» مش في الأخيرة.`,
            R`«احجز» في الأخيرة بس.`,
            R`خبّي ملخص الأخطاء القديم.`,
            R`لو دي المراجعة، ابنيها من الداتا الحالية.`,
            R`الـ focus على عنوان الخطوة، فقارئ الشاشة يقراه.`,
            R`قفلة الدالة.`,
            R`«التالي»: افحص الخطوة الحالية الأول.`,
            R`«رجوع»: من غير فحص.`
          ],
          sol: R`Enter في حقل الموبايل بعد ما الخطوة تبقى سليمة: الخطوة التانية بتظهر، والـ focus على «الخطوة 2 من 4: الكشف». «رجوع» بيرجّع والاسم لسه مكتوب (اختبار Playwright «back keeps the data» بيتأكد بـ [[toHaveValue('منى علي')]]). والمراجعة بتعرض «أسنان» و «أونلاين» واسم الصورة (الاختبار بيتأكد إن [[#review]] فيه «أسنان» و «rx.png»).

الحل المرجعي: [[go]] و [[renderReview]] تحت. والـ submit listener اللي بيحوّل Enter لـ «التالي» في المحطة الأخيرة.

لو الـ Enter بيبعت: الـ submit listener مفيهوش شرط الخطوة، أو فيه زرار [[type="submit"]] تاني في خطوة قبل الأخيرة (أي [[<button>]] جوه form من غير [[type]] بيبقى submit).`,
          solCode: R`function go(i) {
  steps[current].hidden = true
  current = i
  steps[i].hidden = false
  stepItems.forEach((li, j) => j === i ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'))
  back.hidden = i === 0
  nextBtn.hidden = i === last
  submitBtn.hidden = i !== last
  summary.hidden = true
  if (i === last) renderReview()
  steps[i].querySelector('h2').focus()
}

nextBtn.addEventListener('click', () => { if (validateStep(current)) go(current + 1) })
back.addEventListener('click', () => go(current - 1))

function renderReview() {
  const labels = { name: 'الاسم', phone: 'الموبايل', email: 'الإيميل', specialty: 'التخصص', type: 'نوع الكشف', date: 'اليوم' }
  const data = new FormData(form)
  const rows = Object.entries(labels).flatMap(([name, label]) => {
    const el = form.elements[name]
    const value = el.tagName === 'SELECT' ? el.selectedOptions[0].text
      : el instanceof RadioNodeList ? form.querySelector($__bt[name="$__{name}"]:checked$__bt)?.parentElement.textContent.trim()
      : data.get(name)
    const dt = document.createElement('dt'), dd = document.createElement('dd')
    dt.textContent = label
    dd.textContent = value || '—'
    return [dt, dd]
  })
  const photo = data.get('photo')
  const dt = document.createElement('dt'), dd = document.createElement('dd')
  dt.textContent = 'الصورة'
  dd.textContent = photo?.size ? photo.name : 'من غير صورة'
  document.querySelector('#review').replaceChildren(...rows, dt, dd)
}`
        },
        {
          cmd: "مشروع ٣: صورة بـ preview",
          title: "تعرض الصورة قبل الرفع وتمنع الملف الغلط إزاي؟",
          desc: R`في الخطوة التالتة المستخدم بيختار صورة اختيارية. أول ما يختار: لو النوع أو الحجم غلط رسالة واضحة، ولو تمام معاينة للصورة واسمها وحجمها وزرار «شيل الصورة».

خلصت يعني: (١) [[accept]] على الـ input بيقترح الصور بس في نافذة الاختيار. (٢) ملف مش صورة أو أكبر من ٢ ميجا: رسالة بتتقري فورًا، والـ input بيتفضى. (٣) الصورة السليمة بتظهر بـ alt فيه اسمها. (٤) تغيير الصورة أو شيلها بيعمل [[URL.revokeObjectURL]] للقديمة. (٥) «شيل الصورة» بيرجّع الـ focus للـ input. (٦) السيرفر بيرفض النوع والحجم الغلط برضه.

الدروس: [[input type=file]] و [[drag and drop و progress]] في تاب «JavaScript»، و [[multer]] و [[sharp]] في تاب «Backend بـ Node»، و [[معالجة الصور]] في تاب «بناء مشروع كامل».`,
          example: R`photo.addEventListener('change', () => {
  clearPreview()
  setError('photo', '')
  const file = photo.files[0]
  if (!file) return
  const problem = !ALLOWED.includes(file.type) ? 'الصورة لازم تبقى JPG أو PNG أو WebP'
    : file.size > MAX ? $__btالصورة $__{(file.size / 1024 / 1024).toFixed(1)} ميجا، والحد 2 ميجا$__bt : ''
  if (problem) { photo.value = ''; return setError('photo', problem) }
  previewUrl = URL.createObjectURL(file)
  img.src = previewUrl
  img.alt = $__btمعاينة الصورة اللي اخترتها: $__{file.name}$__bt
  document.querySelector('#preview-name').textContent = $__bt$__{file.name} ($__{Math.round(file.size / 1024)} KB)$__bt
  preview.hidden = false
})`,
          try: R`اكتب الـ change listener و [[clearPreview]] و «شيل الصورة». جرّب ٣ ملفات: صورة صغيرة، وملف PDF (غيّر الـ filter في نافذة الاختيار لـ All files)، وصورة أكبر من ٢ ميجا. وفي DevTools: Memory، خد heap snapshot بعد ما تغيّر الصورة ٢٠ مرة، مرة مع [[revokeObjectURL]] ومرة من غيرها.`,
          flag: "script",
          deep: {
            why: R`المعاينة بتقلل الغلط: المستخدم بيشوف إنه اختار الروشتة مش صورة سيلفي. والفحص في المتصفح بيوفّر عليه يستنى رفع ١٠ ميجا عشان السيرفر يرفض في الآخر. بس الفحص الحقيقي على السيرفر، لأن أي حد يقدر يبعت أي ملف من غير الفورم.`,
            how: R`[[URL.createObjectURL(file)]] بيعمل URL زي [[blob:http://localhost/...]] بيشاور على الملف في الذاكرة، من غير ما يقراه كله زي [[FileReader.readAsDataURL]]. أسرع وأخف، بس المتصفح بيفضل ماسك الملف لحد ما تعمل [[revokeObjectURL]] أو الصفحة تتقفل. عشان كده [[clearPreview]] بتعمله قبل أي معاينة جديدة.

[[file.type]] جاي من امتداد الملف (والمتصفح بيخمّنه)، مش من محتواه. ملف [[virus.exe]] اتغير اسمه لـ [[photo.png]] هيعدّي. ده كفاية للمتصفح (تجربة المستخدم)، بس السيرفر لازم يفحص المحتوى نفسه: مكتبة زي [[sharp]] لو فشلت تقرا الصورة يبقى مش صورة، وبتعيد حفظها فبتشيل أي حاجة زيادة (والـ EXIF اللي فيه مكان التصوير).

[[photo.value = '']] بيفضّي الـ input. مينفعش تحط فيه ملف من الكود، بس تقدر تفضّيه.

[[role="alert"]] على [[#photo-error]]: الرسالة بتتقري أول ما تتكتب، لأن الـ focus لسه على زرار اختيار الملف. وفي الحقول التانية مش محتاجين كده لأن الـ focus بيروح للملخص.

والسيرفر: [[multer]] بـ [[limits: { fileSize: 2MB, files: 1 }]] بيقطع الرفع أول ما يعدّي الحد (مش بيستنى الملف كله)، و [[fileFilter]] بيرفض الأنواع التانية. والـ [[memoryStorage]] مناسب للتجربة هنا بس؛ في مشروع حقيقي الملف بيروح S3 مباشرة بـ signed URL (درس [[signed upload URL]] في تاب «بناء مشروع كامل»).`,
            when: R`أي رفع صورة: بروفايل، أو منتج، أو مستند. ولملفات كبيرة (فيديو) محتاج progress bar ورفع مباشر للـ storage.`,
            mistakes: R`[[FileReader.readAsDataURL]] لصورة ١٠ ميجا فالصفحة تهنج. أو نسيان [[revokeObjectURL]]. أو الفحص في المتصفح بس. أو [[alt=""]] على المعاينة (هي معلومة مهمة مش زينة). أو رفع الصورة لحظة الاختيار قبل ما المستخدم يبعت، فالسيرفر يمتلي صور ناس غيّروا رأيهم. أو تفتكر إن [[accept]] حماية: ده اقتراح في نافذة الاختيار بس.`
          },
          teach: R`## الفكرة: افحص النوع والحجم في المتصفح للراحة، واعرض الصورة من الذاكرة، وحرّرها لما تخلص

المثال الـ [[change]] listener على حقل الصورة. والـ solCode فيه الثوابت، و [[clearPreview]]، و «شيل الصورة»، وأول [[server.js]] بإعداد multer. هنفكهم، ونجرّب في Chrome 154 (بـ Playwright) وبـ [[curl]] على السيرفر (Express 5.2 و multer 2.4 على بورت 6037).

---

## ١. الثوابت

~~~text
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'], MAX = 2 * 1024 * 1024
const photo = form.photo, preview = document.querySelector('#preview'), img = document.querySelector('#preview-img')
let previewUrl = null
~~~

- [[ALLOWED]]: أنواع الـ MIME المسموحة. MIME type = اسم نوع الملف زي [[image/png]].
- [[MAX]] = 2 × 1024 × 1024 = 2,097,152 بايت = 2 ميجا.
- [[previewUrl]]: الـ URL المؤقت الحالي، عشان نحرره بعدين.

## ٢. [[clearPreview()]]

~~~text
function clearPreview() {
  if (previewUrl) URL.revokeObjectURL(previewUrl)
  previewUrl = null
  preview.hidden = true
  img.removeAttribute('src')
}
~~~

[[revokeObjectURL]] بيقول للمتصفح «خلاص مش محتاج الملف ده في الذاكرة». جرّبنا على Blob صغير:

~~~text الناتج
blob:http://localhost:6037/<uuid> | before revoke: hello | after revoke: TypeError: Failed to fetch
~~~

قبل الـ revoke الـ URL بيرجّع المحتوى، وبعده مبقاش موجود. من غيره، كل صورة المستخدم يختارها بتفضل محجوزة لحد ما الصفحة تتقفل.

## ٣. الـ [[change]] listener (المثال)

~~~text
photo.addEventListener('change', () => {
  clearPreview()
  setError('photo', '')
  const file = photo.files[0]
  if (!file) return
~~~

- [[change]] بيحصل لما يختار ملف، أو يفتح النافذة ويلغي.
- أول حاجة: شيل المعاينة القديمة والرسالة القديمة.
- [[photo.files]]: قايمة الملفات المختارة (FileList)، و [[[0]]] أول واحد. لو لغى، [[undefined]] ونخرج.

~~~text
  const problem = !ALLOWED.includes(file.type) ? 'الصورة لازم تبقى JPG أو PNG أو WebP'
    : file.size > MAX ? $__btالصورة $__{(file.size / 1024 / 1024).toFixed(1)} ميجا، والحد 2 ميجا$__bt : ''
  if (problem) { photo.value = ''; return setError('photo', problem) }
~~~

- ternary متداخل: النوع غلط؟ رسالة. الحجم كبير؟ رسالة فيها الحجم الحقيقي. غير كده نص فاضي.
- [[file.size / 1024 / 1024]]: بايت → كيلو → ميجا. و [[toFixed(1)]]: رقم عشري واحد كنص.
- [[photo.value = '']]: فضّي الحقل. ده التغيير الوحيد المسموح من الكود على [[input type="file"]] (مينفعش تحط فيه ملف).
- [[return setError(...)]]: اعرض الرسالة واخرج في سطر واحد.

~~~text
  previewUrl = URL.createObjectURL(file)
  img.src = previewUrl
  img.alt = $__btمعاينة الصورة اللي اخترتها: $__{file.name}$__bt
  document.querySelector('#preview-name').textContent = $__bt$__{file.name} ($__{Math.round(file.size / 1024)} KB)$__bt
  preview.hidden = false
})
~~~

- [[URL.createObjectURL(file)]]: URL بيشاور على الملف اللي في الذاكرة، من غير ما يتقري كله. أسرع بكتير من [[FileReader.readAsDataURL]] اللي بيحوّل الصورة كلها نص base64.
- [[alt]]: المعاينة معلومة (اتأكد إنك اخترت الصح)، فليها alt حقيقي فيه اسم الملف.

## ٤. «شيل الصورة»

~~~text
document.querySelector('#remove-photo').addEventListener('click', () => {
  photo.value = ''
  clearPreview()
  photo.focus()
})
~~~

بعد ما الزرار نفسه بيستخبى (جوه [[#preview]])، الـ focus كان هيضيع. [[photo.focus()]] بيرجّعه لحقل الاختيار.

## ٥. التجربة في المتصفح

~~~text الناتج
ملف 3.4 ميجا:    الصورة 3.4 ميجا، والحد 2 ميجا   | value: ""
rx.png صغيرة:    src: blob:http://localhost:6037/<uuid>
                 alt: معاينة الصورة اللي اخترتها: rx.png
                 name: rx.png (0 KB)
شيل الصورة:      focus: INPUT#photo   preview hidden: true
~~~

[[0 KB]] لأن الصورة ٧٠ بايت، و [[Math.round(0.07)]] = 0. واختبار Playwright بيرفع [[a.txt]] ويلاقي [[getByRole('alert')]] فيه «الصورة لازم تبقى JPG أو PNG أو WebP»: [[role="alert"]] على [[#photo-error]] بيخلي الرسالة تتقري والـ focus لسه على زرار الاختيار.

---

## ٦. السيرفر: multer

~~~text server.js
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1, fields: 10 },
  fileFilter: (req, file, cb) => cb(ALLOWED.includes(file.mimetype) ? null : new Error('BAD_TYPE'), true),
})
~~~

- multer بيقرا الطلبات اللي نوعها [[multipart/form-data]] (اللي [[FormData]] بيبعته).
- [[memoryStorage()]]: الملف في الذاكرة كـ Buffer ([[req.file.buffer]]). للتجربة بس.
- [[limits]]: [[fileSize]] بيقطع الرفع أول ما يعدّي ٢ ميجا (مبيستناش الملف كله)، و [[files: 1]] ملف واحد، و [[fields: 10]] أقصى عدد حقول نص.
- [[fileFilter]]: [[cb(error, accept)]]. لو النوع مش مسموح بنمرر error.

بـ [[curl]] (اتشغّل من Git Bash):

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:6037/api/bookings -H "Idempotency-Key: curl-key-0005" -F name="منى علي" ... -F "photo=@big.png;type=image/png"
~~~

- [[-F]]: حقل في multipart، و [[@big.png]] = ارفع الملف ده، و [[;type=image/png]] = النوع اللي بنعلنه.
- [[-w "%{http_code}"]]: اطبع رقم الحالة بس.

~~~text الناتج
صورة 3 ميجا:         413   {"error":"الصورة أكبر من 2 ميجا"}
PDF:                 400   {"error":"نوع الصورة مش مسموح"}
نص اسمه fake.png وبنعلن type=image/png:   201   {"id":"536ea9af"}
~~~

السطر الأخير مهم: [[file.mimetype]] في multer هو اللي **العميل قاله**، زي [[file.type]] في المتصفح (اللي جاي من الامتداد). ملف نص اتقبل كصورة. الحل المرجعي واقف هنا لأنه بيخزن في الذاكرة ومبيعرضش الصورة لحد. في مشروع حقيقي لازم تفحص المحتوى نفسه: [[sharp(buffer).metadata()]] بيرمي لو مش صورة، وإعادة الحفظ بـ sharp بتشيل أي حاجة زيادة جوه الملف (درس [[sharp]] في تاب «Backend بـ Node»).

---

## الخلاصة

| الحاجة | الكود |
|---|---|
| النوع والحجم في المتصفح | [[file.type]] و [[file.size]]، ورسالة فيها الحجم |
| فضّي الحقل | [[photo.value = '']] |
| معاينة من غير قراية الملف | [[URL.createObjectURL(file)]] |
| حرّر الذاكرة | [[URL.revokeObjectURL]] قبل كل معاينة جديدة |
| الرسالة تتقري فورًا | [[role="alert"]] |
| السيرفر | multer: [[limits.fileSize]] (413) و [[fileFilter]] (400) |
| الحماية الحقيقية | فحص المحتوى (sharp)، لأن الـ MIME type كلام العميل |`,
          lines: [
            R`أول ما المستخدم يختار (أو يلغي) ملف:`,
            R`شيل المعاينة القديمة وحرّر الـ URL بتاعها.`,
            R`امسح أي رسالة خطأ قديمة.`,
            R`الملف المختار (ممكن مفيش لو لغى).`,
            R`لو مفيش ملف، خلاص.`,
            R`النوع مش صورة من المسموح؟`,
            R`الحجم أكبر من ٢ ميجا؟ والرسالة فيها الحجم الحقيقي.`,
            R`لو فيه مشكلة: فضّي الـ input واعرض الرسالة.`,
            R`اعمل URL مؤقت للملف في الذاكرة.`,
            R`اعرضه في الصورة.`,
            R`[[alt]] بيوصف المعاينة واسم الملف.`,
            R`الاسم والحجم بالكيلو.`,
            R`اظهر المعاينة.`,
            R`قفلة الـ listener.`
          ],
          sol: R`الصورة الصغيرة: معاينة واسمها وحجمها بالـ KB. الـ PDF: «الصورة لازم تبقى JPG أو PNG أو WebP» بتتقري فورًا، والـ input فاضي. الصورة الكبيرة: «الصورة 3.4 ميجا، والحد 2 ميجا». اختبار Playwright بيرفع ملف [[a.txt]] بـ [[setInputFiles]] ويتأكد إن [[getByRole('alert')]] فيه الرسالة والمعاينة مخفية.

الـ heap snapshot: من غير [[revokeObjectURL]] هتلاقي الـ Blobs بتتراكم (كل صورة اخترتها لسه في الذاكرة). معاه، واحدة بس.

والسيرفر برضه بيرفض: صورة أكبر من ٢ ميجا بـ 413 ورسالة «الصورة أكبر من 2 ميجا»، ونوع غلط بـ 400. الحل المرجعي فيه كود المعاينة، وأول [[server.js]] بإعداد multer.`,
          solCode: R`// الصورة
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'], MAX = 2 * 1024 * 1024
const photo = form.photo, preview = document.querySelector('#preview'), img = document.querySelector('#preview-img')
let previewUrl = null

function clearPreview() {
  if (previewUrl) URL.revokeObjectURL(previewUrl)
  previewUrl = null
  preview.hidden = true
  img.removeAttribute('src')
}

photo.addEventListener('change', () => {
  clearPreview()
  setError('photo', '')
  const file = photo.files[0]
  if (!file) return
  const problem = !ALLOWED.includes(file.type) ? 'الصورة لازم تبقى JPG أو PNG أو WebP'
    : file.size > MAX ? $__btالصورة $__{(file.size / 1024 / 1024).toFixed(1)} ميجا، والحد 2 ميجا$__bt : ''
  if (problem) { photo.value = ''; return setError('photo', problem) }
  previewUrl = URL.createObjectURL(file)
  img.src = previewUrl
  img.alt = $__btمعاينة الصورة اللي اخترتها: $__{file.name}$__bt
  document.querySelector('#preview-name').textContent = $__bt$__{file.name} ($__{Math.round(file.size / 1024)} KB)$__bt
  preview.hidden = false
})

document.querySelector('#remove-photo').addEventListener('click', () => {
  photo.value = ''
  clearPreview()
  photo.focus()
})

// ── server.js (أوله) ──
import express from 'express'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import { setTimeout as sleep } from 'node:timers/promises'

const app = express()
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1, fields: 10 },
  fileFilter: (req, file, cb) => cb(ALLOWED.includes(file.mimetype) ? null : new Error('BAD_TYPE'), true),
})`
        },
        {
          cmd: "مشروع ٣: الإرسال مرة واحدة",
          title: "تمنع الحجز يتكرر لو المستخدم داس مرتين أو النت فصل إزاي؟",
          desc: R`الإرسال بـ [[fetch]] و [[FormData]]، والسيرفر بيعمل الحجز ويرجّع رقمه. المشكلة: دبل كليك، أو النت يفصل بعد ما السيرفر عمل الحجز وقبل ما الرد يوصل، فالمستخدم يدوس تاني. النتيجة من غير حماية: حجزين.

خلصت يعني: (١) دبل كليك على «احجز» بيعمل حجز واحد بالظبط. (٢) الزرار بيقول «بيتبعت...» وعليه [[aria-disabled]]، والـ focus مبيضيعش. (٣) لو النت فصل: رسالة، والبيانات موجودة، و «احجز» تاني بيبعت بنفس [[Idempotency-Key]]. (٤) السيرفر: نفس المفتاح مرتين (حتى في نفس اللحظة) = حجز واحد ونفس الرد. (٥) السيرفر بيعيد كل الـ validation، وبيرفض لو المتصفح اتخطى. (٦) اختبارات Playwright لكل ده.

الدروس: [[Idempotency-Key]] و [[safe و idempotent]] في تاب «APIs متقدمة»، و [[idempotency]] في أسئلة انترفيو تاب «Backend بـ Node»، و [[validate(schema)]] في نفس التاب.`,
          example: R`form.addEventListener('submit', async e => {
  e.preventDefault()
  if (current !== last) { if (validateStep(current)) go(current + 1); return }
  if (sending) return
  sending = true
  submitBtn.setAttribute('aria-disabled', 'true')
  submitBtn.textContent = 'بيتبعت...'
  status.textContent = 'بنبعت الحجز...'
  try {
    const res = await fetch('/api/bookings', { method: 'POST', body: new FormData(form), headers: { 'Idempotency-Key': idempotencyKey } })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(body.error ?? 'حصلت مشكلة في السيرفر، جرّب تاني')
    form.hidden = true
    document.querySelector('#done').hidden = false
    document.querySelector('#booking-id').textContent = body.id
    document.querySelector('#done-title').focus()`,
          try: R`اكتب الـ submit listener، و [[server.js]] بـ Express و multer و [[Map]] للمفاتيح. اكتب اختبارات Playwright: دبل كليك = حجز واحد (اسأل السيرفر عن العدد قبل وبعد)، وطلبين API بنفس المفتاح في نفس اللحظة بـ [[Promise.all]] = حجز واحد ونفس الـ id، وبيانات غلط مباشرة للـ API = 400، والنت يفصل أول مرة ([[route.abort('internetdisconnected')]]) والتانية تنجح بنفس المفتاح.`,
          flag: "script",
          deep: {
            why: R`حجز مكرر معناه دكتور مستني مريضين في نفس الميعاد، وطلب مكرر في متجر معناه عميل دفع مرتين. و «اقفل الزرار» لوحده مش كفاية: الزرار بيحمي من الدبل كليك بس، مش من «النت فصل فدست تاني» ولا من تطبيق موبايل بيعمل retry لوحده. المفتاح اللي بيتبعت مع الطلب هو اللي بيخلي السيرفر يعرف إن ده نفس الطلب.`,
            how: R`في المتصفح: [[crypto.randomUUID()]] مرة واحدة لما الصفحة تفتح، يعني مفتاح لكل «محاولة حجز» مش لكل ضغطة. وكل إرسال بيبعته في [[Idempotency-Key]]. و [[sending]] بيمنع طلب تاني وطلب شغال. و [[aria-disabled]] بدل [[disabled]]: [[disabled]] بيشيل الـ focus من الزرار فمستخدم الكيبورد بيتوه، و [[aria-disabled]] بيقول لقارئ الشاشة إنه مقفول والـ JS هو اللي بيمنع.

لو الطلب فشل: [[TypeError]] من fetch معناه الشبكة، فالرسالة «النت فصل». والزرار يرجع شغال، والمفتاح هو هو. لو السيرفر كان عمل الحجز فعلًا، الطلب التاني هيرجّع نفس الرد بدل ما يعمل حجز جديد.

في السيرفر: [[Map]] من المفتاح لـ Promise بالنتيجة. أول طلب بيحط الـ Promise قبل ما يبدأ الشغل، فالطلب التاني اللي بيوصل في نفس اللحظة بيلاقيه ويستنى نفس النتيجة (ده اللي بيحمي من السباق). والنتايج اللي مش 201 بتتمسح، عشان لو البيانات كانت غلط، المستخدم يصلّح ويبعت بنفس المفتاح (Stripe بيعمل نفس الحكاية تقريبًا: الطلب اللي فشل في الـ validation مبيتحفظش).

الـ [[Map]] في الذاكرة للتجربة بس: بتضيع مع restart، ومش مشتركة بين أكتر من نسخة من السيرفر. في الإنتاج: جدول فيه المفتاح [[UNIQUE]] والرد، أو Redis بـ [[SET NX]] و TTL (درس [[connect-redis و lock]] في تاب «Backend بـ Node»)، ويتمسح بعد ٢٤ ساعة مثلًا.`,
            when: R`أي POST بيعمل حاجة مينفعش تتكرر: حجز، أو طلب، أو دفع، أو إرسال رسالة. وفي APIs بيستخدمها تطبيق موبايل على شبكة وحشة، ده شرط.`,
            mistakes: R`[[disabled]] على الزرار وخلاص، فمفيش حماية على السيرفر. أو مفتاح جديد مع كل ضغطة (كده ملوش فايدة). أو تحفظ الرد في الـ Map بعد ما الشغل يخلص، فطلبين في نفس اللحظة الاتنين يعدّوا الفحص. أو تحفظ الأخطاء كمان فالمستخدم ميعرفش يصلّح. أو الـ validation في المتصفح بس. وفي الانترفيو: «إزاي تمنع طلب يتكرر؟» الإجابة الكاملة فيها المفتاح من العميل، والتخزين بـ unique على السيرفر، ومسك السباق، والـ TTL.`
          },
          teach: R`## الفكرة: مفتاح واحد لكل محاولة حجز، والسيرفر بيرجّع نفس الرد لنفس المفتاح

المثال أول الـ submit listener في المتصفح، والـ solCode فيه [[server.js]] كامل واختبارات Playwright. هنفك الاتنين، ونكمّل الحتة اللي المثال واقف عندها ([[catch]] و [[finally]])، ونشغّل الاختبارات، ونثبت بـ [[curl]] إن ترتيب سطر واحد في السيرفر هو الفرق بين حجز واحد وحجزين. اتشغّل على Node 24.19 و Express 5.2 و multer 2.4 و Playwright 1.64 مع Chrome 154، والسيرفر على بورت 6037 بدل 4175.

---

## ١. قبل الـ listener

المثال بيستخدم ٣ حاجات متعرّفة فوقه:

~~~text form.js
const idempotencyKey = crypto.randomUUID()
const status = document.querySelector('#submit-status')
let sending = false
~~~

- [[crypto.randomUUID()]]: ID عشوائي زي [[3b2c...-...]]. بيتعمل **مرة واحدة** لما الصفحة تفتح، يعني مفتاح لكل «محاولة حجز» مش لكل ضغطة. (متاح في الصفحات اللي على https أو localhost بس.)
- [[status]]: الـ [[<p role="status">]] في الخطوة الأخيرة. [[role="status"]] = رسايل بتتقري من غير ما تقاطع.
- [[sending]]: فيه طلب شغال دلوقتي؟

## ٢. الـ listener (المثال)

~~~text
form.addEventListener('submit', async e => {
  e.preventDefault()
  if (current !== last) { if (validateStep(current)) go(current + 1); return }
  if (sending) return
  sending = true
~~~

- [[e.preventDefault()]]: امنع المتصفح يبعت الفورم ويفتح صفحة جديدة.
- Enter في خطوة قبل الأخيرة = «التالي» (المحطة اللي فاتت).
- [[if (sending) return]]: الضغطة التانية وفيه طلب شغال بتتجاهل. ده اللي بيحمي من الدبل كليك في المتصفح.

~~~text
  submitBtn.setAttribute('aria-disabled', 'true')
  submitBtn.textContent = 'بيتبعت...'
  status.textContent = 'بنبعت الحجز...'
~~~

[[aria-disabled]] مش [[disabled]]: [[disabled]] بيشيل الزرار من الـ focus، فالـ focus يقع على [[body]] ومستخدم الكيبورد يتوه. [[aria-disabled]] بيقول لقارئ الشاشة «مقفول» والزرار لسه عليه الـ focus، والمنع الفعلي من [[sending]].

~~~text
  try {
    const res = await fetch('/api/bookings', { method: 'POST', body: new FormData(form), headers: { 'Idempotency-Key': idempotencyKey } })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(body.error ?? 'حصلت مشكلة في السيرفر، جرّب تاني')
~~~

- [[body: new FormData(form)]]: كل الحقول والصورة. المتصفح بيحط [[Content-Type: multipart/form-data]] والـ boundary لوحده، فمتحطهوش بإيدك.
- [[headers: { 'Idempotency-Key': ... }]]: نفس المفتاح في كل محاولة.
- [[res.json().catch(() => ({}))]]: لو الرد مش JSON، object فاضي بدل error. و [[({})]] بين قوسين عشان arrow function ترجّع object.
- [[body.error ?? '...']]: رسالة السيرفر، ولو مفيش رسالة عامة.

~~~text
    form.hidden = true
    document.querySelector('#done').hidden = false
    document.querySelector('#booking-id').textContent = body.id
    document.querySelector('#done-title').focus()
~~~

نجح: خبّي الفورم، واظهر [[#done]]، والـ focus على عنوانه.

## ٣. باقي الـ listener

المثال واقف هنا. ده الجزء اللي كمّلنا بيه الحل وشغّلنا عليه الاختبارات:

~~~text form.js
  } catch (err) {
    status.textContent = err instanceof TypeError ? 'النت فصل. بياناتك لسه هنا، دوس «احجز» تاني.' : err.message
  } finally {
    sending = false
    submitBtn.removeAttribute('aria-disabled')
    submitBtn.textContent = 'احجز'
  }
})
~~~

- [[err instanceof TypeError]]: [[fetch]] بيرمي [[TypeError]] لما الشبكة نفسها تقع. غير كده الـ error اللي احنا رميناه برسالة السيرفر.
- [[finally]]: بيتنفذ في النجاح والفشل. الزرار يرجع شغال، والمفتاح **ما اتغيرش**.

وقت التجربة، بعد الضغطة وقبل الرد:

~~~text الناتج
during: بيتبعت... true | status: بنبعت الحجز...
done focus: H2#done-title "اتحجز. رقم الحجز <id>"
~~~

---

## ٤. السيرفر: الـ route

~~~text server.js
const bookings = []
const byKey = new Map() // Idempotency-Key -> Promise<{ status, body }>

app.use(express.static('public'))

app.post('/api/bookings', async (req, res) => {
  const key = req.get('Idempotency-Key') ?? ''
  if (!/^[\w-]{8,100}$/.test(key)) return res.status(400).json({ error: 'Idempotency-Key ناقص' })
  if (!byKey.has(key)) byKey.set(key, handle(req, res))
  const result = await byKey.get(key)
  if (result.status !== 201) byKey.delete(key)
  res.status(result.status).json(result.body)
})
~~~

- [[express.static('public')]]: ملفات الصفحة من فولدر [[public]].
- [[req.get('Idempotency-Key')]]: قيمة الـ header (من غير فرق كبير وصغير).
- [[/^[\w-]{8,100}$/]]: حروف وأرقام و [[_]] و [[-]]، من ٨ لـ ١٠٠. مفيش مفتاح = 400.
- **أهم سطرين**: لو المفتاح جديد، حط **الـ Promise** في الـ Map فورًا، قبل ما الشغل يخلص. وبعدين [[await]] عليه. الطلب التاني بنفس المفتاح، حتى لو وصل في نفس الملّي ثانية، هيلاقي الـ Promise ويستنى **نفس** النتيجة.
- [[result.status !== 201]]: لو فشل (بيانات غلط)، امسح المفتاح، عشان المستخدم يصلّح ويبعت بنفس المفتاح.

## ٥. [[handle]] و [[createBooking]]

~~~text
function handle(req, res) {
  return new Promise(resolve => upload.single('photo')(req, res, async err => {
    if (err) return resolve(err.code === 'LIMIT_FILE_SIZE' ? { status: 413, ... } : { status: 400, ... })
    resolve(await createBooking(req.body, req.file))
  }))
}
~~~

[[upload.single('photo')]] middleware عادي [[(req, res, next)]]. بننديه بإيدنا ونلف النتيجة في Promise، فالنتيجة دايمًا [[{ status, body }]] مش response مبعوت. ده اللي بيخلي النتيجة تتشارك بين الطلبين.

[[createBooking]] بتعيد **كل** الفحوص على السيرفر (الاسم ٣ حروف، والموبايل بنفس الـ regex، والتخصص والنوع من قايمة، واليوم مش قبل النهارده بتوقيت القاهرة)، وبعدين [[sleep(300)]] (شبه الكتابة في القاعدة) و [[randomUUID().slice(0, 8)]] رقم الحجز.

## ٦. التجربة بـ curl

~~~text الناتج
حجز سليم:                      201  {"id":"590d55f6"}
نفس المفتاح تاني (وبيانات غلط):      {"id":"590d55f6"}   ← نفس الرد، مفيش حجز جديد
عدد الحجوزات:                       {"count":1}
من غير مفتاح:                  400  {"error":"Idempotency-Key ناقص"}
name=x و phone=123:                 {"error":"فيه بيانات غلط","fields":{"name":"الاسم قصير","phone":"رقم الموبايل غلط",...}}
~~~

وطلبين **في نفس اللحظة** بنفس المفتاح ([[&]] في bash بيشغّل الاتنين مع بعض):

~~~text الناتج
{"id":"310eedbe"} 201 0.307624s
{"id":"310eedbe"} 201 0.295968s
~~~

نفس الـ id، والعدد زاد ١ بس. وبعدين غيّرنا السيرفر في نسخة تجريبية: الـ Map بتتملي **بعد** الشغل ([[const result = await handle(...)]] ثم [[byKey.set]]). نفس التجربة:

~~~text الناتج
{"id":"5bd0200b"} 201
{"id":"8734a260"} 201
{"count":2}
~~~

حجزين. الطلبين لقوا الـ Map فاضية لأن الأول لسه في الـ [[sleep(300)]]. ده السباق اللي حط الـ Promise بدري بيمنعه.

## ٧. الاختبارات

~~~bash
npx playwright test --reporter=list
~~~

~~~text الناتج
  ok 1 › empty step: summary gets focus and each field is described by its error (1.0s)
  ok 2 › radio and select errors on step 2, and back keeps the data (459ms)
  ok 3 › wrong file type is rejected with an announced message (517ms)
  ok 4 › double click on submit creates exactly one booking (1.4s)
  ok 5 › same Idempotency-Key twice in parallel on the API gives one booking (324ms)
  ok 6 › server rejects bad data even if the browser checks are bypassed (6ms)
  ok 7 › network error keeps the data and lets you retry with the same key (762ms)

  7 passed (9.1s)
~~~

أدوات جديدة فيها:

| الأداة | بتعمل إيه |
|---|---|
| [[{ page, request }]] | [[request]] بيكلّم الـ API مباشرة من غير متصفح |
| [[request.get('/api/bookings/count')]] | العدد قبل وبعد |
| [[dblclick()]] | دبل كليك حقيقي |
| [[Promise.all([send(), send()])]] | طلبين مع بعض |
| [[multipart: {...}]] | يبعت [[multipart/form-data]] زي [[FormData]] |
| [[route.abort('internetdisconnected')]] | أول طلب «النت فصل» |
| [[route.request().headers()['idempotency-key']]] | يسجّل المفتاح في كل محاولة، والاختبار بيتأكد إنهم زي بعض |

---

## الخلاصة

| الطبقة | الحماية |
|---|---|
| المتصفح | [[sending]] يمنع طلب تاني وطلب شغال، و [[aria-disabled]] من غير ما الـ focus يضيع |
| المتصفح | مفتاح واحد لكل محاولة، ونفسه بعد فشل الشبكة |
| السيرفر | الـ Promise في الـ Map **قبل** الشغل، فالطلبين المتزامنين بياخدوا نفس النتيجة |
| السيرفر | النتايج الفاشلة بتتمسح، والـ validation كله بيتعاد |
| الإنتاج | Map في الذاكرة بتضيع مع restart: جدول بـ [[UNIQUE]] أو Redis [[SET NX]] بـ TTL |`,
          lines: [
            R`الـ submit، سواء من الزرار أو Enter.`,
            R`امنع إرسال المتصفح العادي.`,
            R`لو مش آخر خطوة، ده «التالي» مش إرسال.`,
            R`لو فيه طلب شغال، متعملش حاجة.`,
            R`علّم إن فيه طلب شغال.`,
            R`قول لقارئ الشاشة إن الزرار مقفول، من غير ما الـ focus يضيع.`,
            R`الزرار يقول إنه شغال.`,
            R`رسالة في الـ [[role="status"]] بتتقري.`,
            R`الإرسال:`,
            R`كل الحقول والصورة في [[FormData]]، ونفس المفتاح في كل محاولة.`,
            R`اقرا الرد، ولو مش JSON اعتبره فاضي.`,
            R`لو الحالة مش 2xx، ارمي برسالة السيرفر.`,
            R`نجح: خبّي الفورم.`,
            R`اظهر رسالة النجاح.`,
            R`ورقم الحجز.`,
            R`والـ focus على الرسالة، فقارئ الشاشة يقراها.`
          ],
          sol: R`بالحل المرجعي، ٧ اختبارات Playwright عدّت: (١) الملخص والـ aria (مع axe)، (٢) الـ radio والرجوع، (٣) نوع الملف الغلط، (٤) دبل كليك: عدد الحجوزات زاد ١ بالظبط، (٥) طلبين API بنفس المفتاح بـ [[Promise.all]]: الأول 201، والاتنين نفس الـ JSON، والعدد زاد ١، (٦) [[{ name: 'x', phone: '123' }]] مباشرة: 400 و [[fields]] فيها [[name]] و [[phone]]، (٧) أول إرسال [[route.abort]]: الرسالة «النت فصل»، والتاني نجح، والمفتاحين زي بعض.

السيرفر بيعمل [[sleep(300)]] قبل ما يحفظ عشان يشبه الواقع ويخلي السباق يحصل فعلًا في الاختبار. لو شلت [[byKey.set]] قبل الشغل وحطيته بعده، اختبار الـ [[Promise.all]] بيقع بحجزين.

الحل فيه [[server.js]] كامل والاختبارات والـ config. والـ [[/api/bookings/count]] للاختبار بس: في مشروع حقيقي مكانه قاعدة الاختبار مش route مفتوح.`,
          solCode: R`// ── server.js ──
import express from 'express'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import { setTimeout as sleep } from 'node:timers/promises'

const app = express()
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1, fields: 10 },
  fileFilter: (req, file, cb) => cb(ALLOWED.includes(file.mimetype) ? null : new Error('BAD_TYPE'), true),
})
const bookings = []
const byKey = new Map() // Idempotency-Key -> Promise<{ status, body }>

app.use(express.static('public'))

app.post('/api/bookings', async (req, res) => {
  const key = req.get('Idempotency-Key') ?? ''
  if (!/^[\w-]{8,100}$/.test(key)) return res.status(400).json({ error: 'Idempotency-Key ناقص' })
  if (!byKey.has(key)) byKey.set(key, handle(req, res))
  const result = await byKey.get(key)
  if (result.status !== 201) byKey.delete(key) // الغلط ميتحفظش، عشان المستخدم يصلّح ويبعت بنفس المفتاح
  res.status(result.status).json(result.body)
})

function handle(req, res) {
  return new Promise(resolve => upload.single('photo')(req, res, async err => {
    if (err) return resolve(err.code === 'LIMIT_FILE_SIZE'
      ? { status: 413, body: { error: 'الصورة أكبر من 2 ميجا' } }
      : { status: 400, body: { error: err.message === 'BAD_TYPE' ? 'نوع الصورة مش مسموح' : 'الطلب مش سليم' } })
    resolve(await createBooking(req.body, req.file))
  }))
}

async function createBooking({ name = '', phone = '', email = '', specialty = '', type = '', date = '' }, file) {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' })
  const fields = {}
  if (name.trim().length < 3) fields.name = 'الاسم قصير'
  if (!/^01[0125]\d{8}$/.test(phone)) fields.phone = 'رقم الموبايل غلط'
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) fields.email = 'الإيميل غلط'
  if (!['derma', 'dental', 'peds'].includes(specialty)) fields.specialty = 'التخصص مش موجود'
  if (!['clinic', 'online'].includes(type)) fields.type = 'نوع الكشف غلط'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today) fields.date = 'اليوم غلط'
  if (Object.keys(fields).length) return { status: 400, body: { error: 'فيه بيانات غلط', fields } }
  await sleep(300) // شبه الكتابة في القاعدة ورفع الصورة
  const booking = { id: randomUUID().slice(0, 8), name, phone, specialty, type, date, photo: file ? file.size : 0 }
  bookings.push(booking)
  return { status: 201, body: { id: booking.id } }
}

app.get('/api/bookings/count', (req, res) => res.json({ count: bookings.length })) // للاختبار بس

app.listen(4175, () => console.log('http://localhost:4175'))

// ── playwright.config.js ──
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4175', ...devices['Pixel 7'] },
  webServer: { command: 'node server.js', url: 'http://localhost:4175', reuseExistingServer: false },
})

// ── tests/form.spec.js ──
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')
const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('en-CA')

async function fillAll(page) {
  await page.getByLabel('الاسم').fill('منى علي')
  await page.getByLabel('الموبايل').fill('01012345678')
  await page.getByRole('button', { name: 'التالي' }).click()
  await page.getByLabel('التخصص').selectOption('dental')
  await page.getByRole('radio', { name: 'أونلاين' }).check()
  await page.getByLabel('اليوم').fill(tomorrow)
  await page.getByRole('button', { name: 'التالي' }).click()
  await page.getByLabel('اختار صورة').setInputFiles({ name: 'rx.png', mimeType: 'image/png', buffer: png })
  await expect(page.getByRole('img', { name: /rx.png/ })).toBeVisible()
  await page.getByRole('button', { name: 'التالي' }).click()
}

test('empty step: summary gets focus and each field is described by its error', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'التالي' }).click()
  await expect(page.locator('#summary')).toBeFocused()
  await expect(page.locator('#summary-list li')).toHaveCount(2)
  const name = page.getByLabel('الاسم')
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  await expect(name).toHaveAccessibleDescription('اكتب اسمك')
  await expect(page.getByLabel('الموبايل')).toHaveAccessibleDescription(/11 رقم ويبدأ بـ 01 اكتب رقم الموبايل/)
  await page.getByRole('link', { name: 'اكتب اسمك' }).click()
  await expect(name).toBeFocused()
  await name.fill('منى')
  await expect(name).not.toHaveAttribute('aria-invalid')
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})

test('radio and select errors on step 2, and back keeps the data', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('الاسم').fill('منى علي')
  await page.getByLabel('الموبايل').fill('01012345678')
  await page.getByRole('button', { name: 'التالي' }).click()
  await expect(page.getByRole('heading', { name: /الخطوة 2 من 4/ })).toBeFocused()
  await page.getByRole('button', { name: 'التالي' }).click()
  await expect(page.locator('#summary-list')).toContainText('اختار نوع الكشف')
  await page.getByRole('button', { name: 'رجوع' }).click()
  await expect(page.getByLabel('الاسم')).toHaveValue('منى علي')
})

test('wrong file type is rejected with an announced message', async ({ page }) => {
  await page.goto('/')
  await fillAll(page)
  await page.getByRole('button', { name: 'رجوع' }).click()
  await page.getByLabel('اختار صورة').setInputFiles({ name: 'a.txt', mimeType: 'text/plain', buffer: Buffer.from('hi') })
  await expect(page.getByRole('alert')).toHaveText('الصورة لازم تبقى JPG أو PNG أو WebP')
  await expect(page.locator('#preview')).toBeHidden()
})

test('double click on submit creates exactly one booking', async ({ page, request }) => {
  const before = (await (await request.get('/api/bookings/count')).json()).count
  await page.goto('/')
  await fillAll(page)
  await expect(page.locator('#review')).toContainText('أسنان')
  await expect(page.locator('#review')).toContainText('rx.png')
  await page.getByRole('button', { name: 'احجز' }).dblclick()
  await expect(page.getByRole('heading', { name: /اتحجز/ })).toBeFocused()
  const after = (await (await request.get('/api/bookings/count')).json()).count
  expect(after - before).toBe(1)
})

test('same Idempotency-Key twice in parallel on the API gives one booking', async ({ request }) => {
  const before = (await (await request.get('/api/bookings/count')).json()).count
  const send = () => request.post('/api/bookings', {
    headers: { 'Idempotency-Key': 'test-key-123456' },
    multipart: { name: 'منى علي', phone: '01012345678', specialty: 'peds', type: 'clinic', date: tomorrow },
  })
  const [a, b] = await Promise.all([send(), send()])
  expect(a.status()).toBe(201)
  expect(await a.json()).toEqual(await b.json())
  expect((await (await request.get('/api/bookings/count')).json()).count - before).toBe(1)
})

test('server rejects bad data even if the browser checks are bypassed', async ({ request }) => {
  const res = await request.post('/api/bookings', { headers: { 'Idempotency-Key': 'bad-data-1234' }, multipart: { name: 'x', phone: '123' } })
  expect(res.status()).toBe(400)
  expect((await res.json()).fields).toMatchObject({ name: 'الاسم قصير', phone: 'رقم الموبايل غلط' })
})

test('network error keeps the data and lets you retry with the same key', async ({ page }) => {
  const keys = []
  let fail = true
  await page.route('**/api/bookings', route => {
    keys.push(route.request().headers()['idempotency-key'])
    if (fail) { fail = false; return route.abort('internetdisconnected') }
    return route.continue()
  })
  await page.goto('/')
  await fillAll(page)
  await page.getByRole('button', { name: 'احجز' }).click()
  await expect(page.getByRole('status')).toContainText('النت فصل')
  await page.getByRole('button', { name: 'احجز' }).click()
  await expect(page.getByRole('heading', { name: /اتحجز/ })).toBeVisible()
  expect(keys).toHaveLength(2)
  expect(keys[0]).toBe(keys[1])
})`
        }
      ]
    }
]);
