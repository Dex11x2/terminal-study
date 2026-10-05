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
