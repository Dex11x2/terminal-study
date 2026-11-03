// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "مشروع كامل: landing page وفورم تسجيل",
      l: 3,
      time: R`حوالي ١٠ ساعات على كذا يوم: ساعة للصورة الكبيرة والمعمل، وساعة لكل قسم من الأقسام، وساعتين للفورم، وساعتين للفحوصات والنشر`,
      goal: [
        R`تبني صفحة هبوط كاملة لمحمصة بن مخترعة اسمها «حبّة» من فولدر فاضي، بـ HTML و CSS حديث وشوية JavaScript، من غير framework ولا build step: header لازق وزجاجي، و hero، ومميزات bento، وآراء، وأسعار بتبديل شهري وسنوي، وأسئلة، و CTA، و footer.`,
        R`تعمل ألوان بـ tokens فيها وضع فاتح وغامق في سطر واحد لكل لون ([[light-dark()]])، بتمشي ورا إعداد الجهاز لوحدها، ومن غير وميض لما اليوزر يختار، وكل زوج ألوان متقاس تباينه.`,
        R`تبني فورم تسجيل accessible: label لكل خانة، ورسايل غلط بالعربي مربوطة بـ [[aria-describedby]]، وملخص أخطاء بـ [[role="alert"]]، وموبايل بيقبل الأرقام العربي، وقواعد كلمة سر، وزرار إرسال مبيبعتش مرتين.`,
        R`تقيس بدل ما تخمّن: مصفوفة ٦ مقاسات من غير scroll أفقي، و CLS صفر حتى والصور بطيئة، و axe صفر violations في الوضعين وعلى الموبايل، ومشي بالكيبورد بس على ٣١ وقفة، وفحص HTML بيشتغل في CI من غير متصفح.`,
        R`تنشرها على GitHub Pages من غير ما المسارات تقع، وتحكي الغلطات الحقيقية اللي حصلت وانت بتبنيها (١٤ غلطة) وإزاي كل واحدة اتمسكت برقم.`,
      ],
      use: {
        prog: R`ده أول مشروع في التاب بيجمع كل الوحدات اللي فاتت في صفحة واحدة شغالة: semantic HTML، والـ cascade، والمتغيرات، و grid، و sticky، والصور، والثيم والعربي، والـ accessibility، والحركة، والأداء، و CSS الحديث ([[:has()]] و [[light-dark()]] و [[details name]]).`,
        work: R`صفحة الهبوط هي أكتر شغلانة front-end بتتطلب من فريلانسر أو شركة ناشئة: «عايزين صفحة تعرّف المنتج وفيها فورم تسجيل». اللي بيفرّقك مش الشكل، هو إنك تسلّمها ومعاها أرقام: «صفر scroll أفقي من ٣٢٠ لـ ١٤٤٠، و axe صفر، و CLS صفر، وبتشتغل من غير JS».`,
        cs: R`progressive enhancement (الصفحة شغالة من غير JS والـ JS بيزوّد بس)، و single source of truth للألوان (tokens)، والتحقق على الحدود (المتصفح بيساعد والسيرفر بيقرر)، والقياس الأوتوماتيك كاختبار (لو الرقم وقع، الـ CI يقع).`,
      },
      lab: R`mkdir habba-landing && cd habba-landing
npm init -y
npm i -D playwright-core@1.64.1 @axe-core/playwright@4.14.0
mkdir css js img tools
node tools/serve.mjs 5173`,
      projects: [
        { lvl: 'صغير', t: R`صفحة «قصتنا» لنفس المحمصة`, what: R`صفحة تانية [[story.html]] بنفس [[tokens.css]] و [[site.css]] من غير ولا لون جديد: خطوات «من المزرعة للفنجان» كـ [[<ol>]] عمودي، كل خطوة ليها رقم في دايرة بـ [[::before]] و [[counter()]]، وخط واصل بينهم بـ [[border-inline-start]] عشان يتقلب لوحده لو الصفحة بقت LTR، وصورة واحدة بـ [[width]] و [[height]] و [[loading="lazy"]]. لينك ليها من الـ footer. من دروس «الألوان والثيم والعربي» و «الأسئلة والـ CTA والـ footer».`, done: R`[[node tools/lint.mjs story.html]] بيقول [[0 problems]]، و [[matrix.mjs]] عليها [[OK]] في الـ ٦ مقاسات، و axe صفر في الوضعين، و [[grep -c "#[0-9a-f]\{6\}" css/story.css]] (لو عملت ملف) بيطلّع صفر: كل الألوان من الـ tokens.` },
        { lvl: 'صغير', t: R`اختيار تالت في الأسعار: كل ٣ شهور`, what: R`زوّد radio تالت «كل ٣ شهور» في [[fieldset.billing]] وسعر تالت في كل باقة ([[<span class="q">]])، والإظهار بـ [[:has()]] زي الاتنين التانيين من غير JS. التوفير مكتوب جنب الاختيار ومتحسوب صح (٣ شهور بسعر ٢٫٧ شهر مثلًا). من درس «المميزات والآراء والأسعار».`, done: R`بالكيبورد بس: Tab للمجموعة والسهمين بيلفّوا على التلاتة (في RTL السهم الشمال بيروح للي بعده)، وكل مرة السعر الظاهر في الـ ٣ باقات هو الصح، والـ JS مقفول (Network request blocking على [[*.js]]) والتبديل لسه شغال.` },
        { lvl: 'متوسط', t: R`نسخة إنجليزي LTR من نفس الصفحة`, what: R`[[en/index.html]] بنفس الـ CSS بالظبط و [[lang="en" dir="ltr"]]، ولينك بين النسختين بـ [[hreflang]] في الـ head وزرار لغة في الـ header. القاعدة: ولا سطر [[[dir=rtl]]] ولا [[left]] ولا [[right]] في الـ CSS؛ كل اللي محتاج يتقلب يتقلب لوحده من الـ logical properties. الحاجات اللي مش logical (اتجاه سهم، [[translate]] في القايمة) تتعالج بـ [[:dir(rtl)]] لو لزم. من دروس «الـ header والـ hero» ووحدة «الثيم والعربي».`, done: R`[[grep -nE "\b(left|right)\b" css/*.css]] بيطلّع صفر سطور، والـ matrix و axe و lint نضاف على النسختين، والأرقام في الأسعار في النسخة الإنجليزي لاتيني من [[toLocaleString("en")]]، ولقطة شاشة للنسختين جنب بعض بتوضح إن كل حاجة اتقلبت.` },
        { lvl: 'متوسط', t: R`فورم حجز موعد لعيادة أسنان متخيلة`, what: R`نفس طريقة فورم التسجيل على فورم حجز: الاسم، والموبايل (نفس [[normalizeDigits]])، و [[<input type="date">]] أقل قيمة فيه النهارده بتوقيت الجهاز (مش [[toISOString()]] اللي بيرجع UTC)، و [[<select>]] للمواعيد المتاحة، وملاحظات [[<textarea maxlength="300">]] بعدّاد حروف بـ [[aria-live="polite"]] بيتكلم كل ٥٠ حرف بس. رسايل عربي لكل حالة. من درس «فورم تسجيل accessible».`, done: R`[[form-test.mjs]] نسخة ليك فيها ٨ حالات PASS على الأقل، منها: تاريخ امبارح بيترفض برسالة عربي، والنهارده بيتقبل حتى الساعة ١١:٣٠ بالليل (جرّب بـ [[context.clock]] أو [[timezoneId: "Africa/Cairo"]] في Playwright)، و axe صفر والفورم مليان أخطاء.` },
        { lvl: 'كبير', t: R`الصفحة بـ backend حقيقي و CI أخضر`, what: R`استبدل الـ API التجريبي في [[serve.mjs]] بسيرفر حقيقي (Express من تاب «Backend بـ Node» أو FastAPI): [[POST /api/signup]] بيتحقق تاني بنفس القواعد (مش بيصدّق المتصفح)، وبيحفظ في SQLite بـ unique على الإيميل (ده اللي بيرجّع 409)، وباسورد متشفّر بـ argon2 أو bcrypt، و rate limit بسيط (٥ طلبات في الدقيقة لكل IP)، ولوج من غير الباسورد. و GitHub Actions بيشغّل [[npm run lint]] و [[npm test]] (السيرفر في الخلفية) على كل push، والـ static على Pages والـ API على أي استضافة Node.`, done: R`[[curl -X POST]] بقيم غلط بيرجّع 400 ومعاه [[{ field, message }]] زي ما الفورم مستني، والإيميل المكرر 409، والطلب السادس في الدقيقة 429، والـ workflow أخضر وبيقع لو حد رجّع [[minmax(320px, 1fr)]] أو شال [[width]] من صورة الـ hero، والرابطين شغالين.`, ext: R`زوّد تأكيد الإيميل: لينك فيه token صالح ساعة، والحساب [[pending]] لحد ما يتضغط، وصفحة [[confirm.html]] بتقول النتيجة. ولوحة صغيرة للمحمصة بعدد المشتركين لكل باقة.` },
        { lvl: 'كبير', t: R`نفس الصفحة بـ Tailwind v4 و Vite، وقارن بالأرقام`, what: R`ابني نفس الصفحة بالظبط بـ Vite و Tailwind v4: الـ tokens في [[@theme]] بنفس [[light-dark()]]، والأزرار بـ [[@utility]] أو classes، ونفس الـ HTML تقريبًا. وبعدين شغّل نفس أدوات القياس الست على النسختين وطلّع جدول: حجم الـ CSS (raw و gzip)، و FCP و LCP بنفس الـ throttling، وعدد سطور الكود اللي كتبته، والوقت اللي أخدته. من وحدة «Tailwind» ودرس «مصفوفة المقاسات والأداء».`, done: R`جدول بأرقام حقيقية من [[perf.mjs]] (٣ مرات لكل نسخة)، و axe و matrix نضاف على الاتنين، وفقرة بتقول إمتى هتختار كل واحدة لمشروع جديد ومبنية على الأرقام مش على الرأي.`, ext: R`زوّد نسخة تالتة بـ Astro (صفحة static بتطلع HTML من غير JS) وقارن نفس الأرقام.` },
        { lvl: 'فكرة', t: R`صفحة هبوط لحاجة بتعرفها`, what: R`اختار مشروع حقيقي حواليك (ورشة، أو درس خصوصي، أو جيم، أو متجر صغير على الانستجرام)، واكتب انت الأقسام اللي محتاجها (مش لازم نفس السبعة) والفورم اللي يخدمه (حجز، أو طلب، أو اشتراك). نفس القواعد: tokens، ومن غير وميض، و RTL سليم، وكل رقم متقاس.`, done: R`صاحب المشروع فتحها من موبايله وقدر يبعت الفورم، والـ ٦ أدوات نضاف، وفي الـ README جدول «قبل وبعد» لأي غلطة قابلتها.`, ext: R`حطها في الـ portfolio بصفحة دراسة حالة: المشكلة، والأقسام وليه، والقياسات، والغلطات اللي اتصلّحت، ورابط الكود.` },
      ],
      n: R`build-along: صفحة هبوط لمحمصة بن مخترعة («حبّة») بتتبني من فولدر فاضي في ٨ خطوات. ١٩٩ سطر HTML، و ٢٠٦ سطر CSS في ٣ ملفات، و ١٧٥ سطر JS في ٤ ملفات، و ٦ أدوات قياس بـ Node و Chrome. الأرقام النهائية: صفر scroll أفقي من ٣٢٠ لـ ١٤٤٠، و CLS صفر، و axe صفر، و ٨ اختبارات فورم PASS، والصفحة كلها حوالي ٤٤ كيلو على الموبايل.`,
      items: [
        {
          cmd: "landing page: الصورة الكبيرة",
          title: "صفحة هبوط لمحمصة بن من فولدر فاضي: بتعمل إيه، وأقسامها، وملفاتها، وليه HTML و CSS من غير framework",
          learn: R`تشوف المشروع كله قبل ما تكتب سطر: الصفحة بتخدم مين، وأقسامها بالترتيب، وكل ملف شغلته، وليه كل أداة اتختارت.`,
          out: R`فولدر فيه سيرفر صغير، وهيكل [[index.html]] بالأقسام السبعة اللي الـ lint بيقول عليه [[0 problems]]، وأدوات القياس متسطّبة.`,
          desc: R`أول خطوة في أي صفحة هبوط مش الألوان، هي **الهيكل**: الزائر جاي يعرف إيه، وهيقتنع بإيه، وهيضغط فين. هنا بنرسم الصفحة كلها، ونختار الأدوات وليه، ونبني المعمل (سيرفر Node صغير، وصور الـ hero، وأدوات القياس)، ونكتب هيكل HTML فيه الأقسام السبعة من غير أي CSS.

المشروع: صفحة لمحمصة بن مخترعة اسمها «حبّة» بتبيع اشتراك شهري في بن طازة. الهدف الوحيد للصفحة إن الزائر يفتح حساب من فورم التسجيل في آخرها، وكل قسم قبله بيرد على سؤال في دماغه: «ده إيه؟» (hero)، و «ليه انتوا؟» (المميزات)، و «حد جرّب؟» (الآراء)، و «بكام؟» (الأسعار)، و «طب لو...؟» (الأسئلة)، و «طب يلا» (CTA والفورم).

الخطوات الجاية كل واحدة بتبني جزء وتقيسه: الألوان والثيم والعربي، وبعدين الـ header والـ hero، والمميزات والآراء والأسعار، والأسئلة والـ CTA والـ footer والحركة، والفورم، وفي الآخر مصفوفة المقاسات والأداء، وفحص الـ accessibility والنشر. وكل غلطة حصلت في البناء الحقيقي مكتوبة في الخطوة بتاعتها، بالرقم قبل وبعد.`,
          example: R`<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>محمصة حبّة</title></head>
<body>
<a class="skip" href="#main">اتخطّى للمحتوى</a>
<header class="top"><a class="logo" href="#hero">حبّة</a> <nav aria-label="الرئيسية"><a href="#features">ليه حبّة</a> <a href="#pricing">الأسعار</a> <a href="#faq">أسئلة</a></nav></header>
<main id="main">
  <section id="hero"><h1>بن طازة يوصلك قبل ما يبرد حماسك</h1></section>
  <section id="features"><h2>بن بتعرف هو جه منين</h2></section>
  <section id="reviews"><h2>اللي جرّبوا بيقولوا إيه</h2></section>
  <section id="pricing"><h2>اختار الكمية اللي تكفيك</h2></section>
  <section id="faq"><h2>أسئلة بتتسأل كتير</h2></section>
  <section class="cta"><h2>أول كيس بنص التمن</h2></section>
  <section id="signup"><h2>افتح حسابك في دقيقة</h2></section>
</main>
<footer class="foot"><p>محمصة صغيرة بتحمّص كل خميس.</p></footer>
</body>
</html>`,
          lines: [
            R`بيقول للمتصفح إن ده HTML حديث (standards mode). من غيره الصفحة بتشتغل في quirks mode والـ box model بيتغيّر (درس [[<!doctype html>]]).`,
            R`[[lang="ar"]] عشان قارئ الشاشة ينطق عربي والمتصفح يختار خط وقواعد كسر سطور عربي، و [[dir="rtl"]] عشان الصفحة كلها (وكل grid و flex جواها) تمشي من اليمين.`,
            R`الـ head في سطر واحد: [[charset]] قبل أي نص عربي، و [[viewport]] عشان الموبايل ميعرضش الصفحة كأنها ٩٨٠ بكسل، و [[title]] اللي بيظهر في التاب وفي نتايج جوجل.`,
            R`بداية جسم الصفحة: كل اللي بيتشاف جوه الـ body، والـ head فوق ده معلومات بس.`,
            R`skip link: أول حاجة الكيبورد بيقابلها، بتنقله للمحتوى على طول من غير ما يعدّي على روابط الـ header كل مرة. هيستخبى بـ CSS لحد ما ياخد focus.`,
            R`[[<header>]] بيبقى landmark اسمه banner، وجواه لوجو بيرجّع لأول الصفحة و [[<nav>]] ليه [[aria-label]] عشان الصفحة فيها nav تاني في الـ footer.`,
            R`[[<main>]] واحد بس في الصفحة، وليه [[id="main"]] عشان الـ skip link يوصله.`,
            R`كل قسم [[<section>]] بـ [[id]] (هدف لينكات الـ nav) وجواه عنوان. الـ hero بس فيه [[h1]]، لأن الصفحة ليها عنوان رئيسي واحد.`,
            R`المميزات: قسم بيرد على «ليه انتوا؟»، وعنوانه [[h2]] تحت الـ h1 على طول من غير ما ننط مستوى.`,
            R`الآراء: قسم «حد جرّب قبلي؟»، وهيبقى جواه [[figure]] و [[blockquote]] في خطوته.`,
            R`الأسعار: الهدف اللي لينك «الأسعار» في الـ nav بيوديله، وهيبقى فيه التبديل الشهري والسنوي.`,
            R`الأسئلة: قسم «طب لو...؟»، وهيتبني بـ [[details]] و [[summary]] من غير JS.`,
            R`الـ CTA ملوش [[id]] لأن مفيش لينك بيوديله، هو مجرد شريط بيزق الزائر للفورم.`,
            R`آخر قسم: فورم التسجيل، وهو الهدف اللي كل زراير «اشترك» في الصفحة بتوديله.`,
            R`هنا المحتوى الأساسي خلص، وكل اللي بعد كده مش جزء من الـ main.`,
            R`[[<footer>]] بره الـ main بيبقى landmark اسمه contentinfo، وفيه تعريف قصير بالمحمصة.`,
            R`قفلة الـ body: مفيش أي محتوى بيتكتب بعدها.`,
            R`قفلة الـ html: نهاية الملف كله.`,
          ],
          try: R`ابني المعمل زي الشرح: الفولدر، و [[npm i -D]] للأداتين، و [[serve.mjs]]، و [[make-img.mjs]] للصور. حط الهيكل ده في [[index.html]] وشغّل [[node tools/serve.mjs 5173]] وافتح [[http://127.0.0.1:5173/]]. وبعدين شغّل [[node tools/lint.mjs index.html]] (الكود في درس «فحص accessibility والنشر») وشوف الشجرة في تاب Accessibility في DevTools: كام landmark، وكام عنوان من كل مستوى؟`,
          sol: R`[[lint.mjs]] على الهيكل ده بيطبع [[OK: 30 tags, 7 ids, 0 problems]]. وشجرة الـ accessibility (اتطبعت بـ [[ariaSnapshot()]] من Playwright) فيها [[banner]] وجواه [[navigation "الرئيسية"]]، و [[main]] فيه h1 واحد و ٦ h2، و [[contentinfo]]. لو لقيت h2 قبل الـ h1 أو [[main]] مش موجود، راجع إنك حطيت الأقسام جوه [[<main>]] والـ h1 في أول section.`,
          solCode: R`// tools/outline.mjs: شجرة العناوين والـ landmarks زي ما قارئ الشاشة شايفها
import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.goto(process.argv[2]);
const snap = await page.locator("body").ariaSnapshot();
console.log(snap.split("\n").filter((l) => /banner|navigation|main|contentinfo|heading|region/.test(l)).join("\n"));
await browser.close();`,
          flag: "script",
          deep: {
            why: R`أغلب صفحات الهبوط اللي بتقع بتقع من الهيكل مش من الألوان: قسم أسعار قبل ما الزائر يفهم المنتج، أو فورم في النص قبل ما يقتنع، أو ٣ زراير بتقول حاجات مختلفة. لما ترسم الأقسام كأسئلة في دماغ الزائر بالترتيب، كل قسم ليه وظيفة وتقدر تقيسه (حد بيضغط «الأسعار» من الـ nav؟). وكمان الهيكل الصح من الأول هو اللي بيخلّي قارئ الشاشة والكيبورد وجوجل يفهموا الصفحة من غير ولا سطر ARIA زيادة.`,
            how: R`المتصفح بيبني من الـ HTML شجرة DOM، ومنها شجرة accessibility: [[<header>]] اللي مش جوه section أو article بيبقى [[banner]]، و [[<main>]] بيبقى [[main]]، و [[<footer>]] بره الـ main بيبقى [[contentinfo]]، و [[<nav>]] بيبقى [[navigation]] باسمه من [[aria-label]]. قارئ الشاشة بيتنقل بالـ landmarks والعناوين (في NVDA حرف D للـ landmarks و H للعناوين)، فالترتيب h1 ثم h2 هو فهرس الصفحة عنده. والـ [[id]] على كل section هو اللي بيخلّي [[href="#pricing"]] يقفز للقسم، وفي خطوة الـ header هنزوّد [[scroll-margin-top]] عشان العنوان ميستخباش تحت الـ header اللازق. والـ [[section]] بيبقى [[region]] في الشجرة بس لما يبقى ليه اسم ([[aria-labelledby]] على الـ h2 بتاعه)، وده اللي هنعمله في الصفحة النهائية.`,
            when: R`أي صفحة هبوط أو صفحة منتج أو صفحة حملة، وأي صفحة طويلة الزائر بيقراها من فوق لتحت ويتنقل فيها بالـ nav. ولو المشروع فيه صفحات كتير وداتا بتتغيّر (لوحة تحكم، متجر فيه آلاف المنتجات)، يبقى framework زي Next أو Astro أنسب، والجدول تحت بيقول إمتى بالظبط.`,
            mistakes: R`تبدأ بالـ CSS قبل ما الأقسام تبقى واضحة، فتلاقي نفسك بتنقل أقسام وتعيد تصميمها. أو تحط [[div]] لكل حاجة فالشجرة متبقاش فيها landmarks. أو h1 في الـ header (اللوجو) و h1 تاني في الـ hero. أو [[id]] بمسافة أو بحروف عربي في لينكات الـ nav (بيشتغل بس بيتكتب في الـ URL مشفّر ومش مقروء). أو تنسى [[dir="rtl"]] فالـ grid والـ flex يتعكسوا وتقعد تصلّحهم بـ [[left]] و [[right]].`
          },
          teach: R`## الصورة الكبيرة

**بنبني إيه:** صفحة واحدة طويلة لمحمصة مخترعة اسمها «حبّة» بتبيع اشتراك شهري في بن محموص طازة. صفحة هبوط (landing page) يعني صفحة هدفها حاجة واحدة: الزائر يعمل حاجة (هنا: يفتح حساب). مش موقع فيه ١٠ صفحات.

**لمين:** زائر جاي من إعلان أو من لينك على الموبايل في الغالب، عايز يعرف في ثواني: ده إيه، وبكام، وينفع أجرّب.

**الأقسام بالترتيب، وكل قسم بيرد على سؤال:**

~~~text الصفحة من فوق لتحت
┌──────────────────────────────────────────────┐
│ header لازق: لوجو  ·  روابط  ·  ثيم  ·  اشترك │  «أنا فين؟»
├──────────────────────────────────────────────┤
│ hero: عنوان + سطر + زرارين  │  صورة فنجان    │  «ده إيه؟»
├──────────────────────────────────────────────┤
│ المميزات: bento (كارت كبير + ٣ صغيرين)        │  «ليه انتوا؟»
├──────────────────────────────────────────────┤
│ الآراء: ٣ كروت figure/blockquote              │  «حد جرّب؟»
├──────────────────────────────────────────────┤
│ الأسعار: [شهري | سنوي] + ٣ باقات، الوسطى مميزة │  «بكام؟»
├──────────────────────────────────────────────┤
│ الأسئلة: ٤ details واحد بس مفتوح              │  «طب لو...؟»
├──────────────────────────────────────────────┤
│ CTA: «أول كيس بنص التمن»                      │  «يلا»
├──────────────────────────────────────────────┤
│ الفورم: اسم، إيميل، موبايل، كلمة سر، باقة     │  الهدف
├──────────────────────────────────────────────┤
│ footer: روابط + تواصل + الاسم كبير وباهت      │
└──────────────────────────────────────────────┘
~~~

**البيانات بتمشي إزاي:** كل زرار «اشترك» و «اختار الباقة» لينك لـ [[#signup]]. زرار الباقة كمان بيملا خانة الباقة في الفورم. الفورم بيتحقق في المتصفح، وبعدين بيبعت [[POST api/signup]] للسيرفر، والسيرفر بيرد بـ 201 (تمام) أو 409 (الإيميل عليه حساب) والفورم بيعرض الرد في مكانه.

~~~text المتصفح والسيرفر
 المتصفح                                   tools/serve.mjs (Node 24)
 ┌─────────────────────────┐   GET  /      ┌────────────────────────────┐
 │ index.html + css + js   │ ────────────▶ │ ملفات static من الفولدر     │
 │                         │               │                            │
 │ فورم ── تحقق في المتصفح │   POST        │ api/signup: بعد ٨٠٠ms       │
 │        └───────────────▶│ ────────────▶ │  201 { ok } أو 409 { field }│
 └─────────────────────────┘               └────────────────────────────┘
        ▲ playwright-core + Chrome المتسطّب: matrix و perf و a11y و form-test
~~~

---

## ليه الأدوات دي تحديدًا؟

| الحاجة | اخترنا | البدايل | ليه ده هنا | إمتى تختار البديل |
|---|---|---|---|---|
| الصفحة | HTML و CSS عادي وشوية JS | React أو Vue، أو Next أو Astro | صفحة واحدة ومحتوى ثابت تقريبًا: مفيش state معقد ولا داتا من API. framework كان هيزوّد JS لازم يتحمّل ويشتغل عشان صفحة كلها نص | لو فيه صفحات كتير بتتشارك components، أو محتوى من CMS، يبقى Astro (بيطلع HTML من غير JS) أو Next |
| التنسيق | CSS حديث بإيدنا (tokens و [[:has()]] و [[light-dark()]]) | Tailwind | عايزين نشوف كل سطر بيعمل إيه، والصفحة كلها ٢٠٦ سطر CSS | لو فريق كبير أو المشروع هيكبر لعشرات الصفحات، Tailwind بيمنع CSS يكبر من غير حساب (فيه مشروع «كبير» بيقارن الاتنين بالأرقام) |
| البناء | من غير build step | Vite | الملفات بتتخدم زي ما هي، فمفيش حاجة بين اللي كتبته واللي المتصفح شايفه، والنشر نسخ ملفات بس | لو عايز تقسيم ملفات JS كتير، أو TypeScript، أو تصغير الملفات لوحده: Vite |
| الخط | خطوط الجهاز ([[system-ui]] و Segoe UI و Tahoma و Geeza Pro) | خط ويب عربي (Google Fonts أو ملف woff2) | صفر كيلو تحميل، وصفر layout shift من تبديل الخط، والعربي بيتقري كويس على ويندوز وأندرويد والماك | لو الهوية محتاجة خط معيّن: woff2 subset لوحده مع [[font-display: swap]] و preload، وقيس الـ CLS بعدها |
| الوضع الغامق | [[light-dark()]] في كل token | [[[data-theme=dark]]] بيعيد كل الألوان، أو [[@media (prefers-color-scheme)]] | لون واحد = سطر واحد فيه القيمتين، وإعداد الجهاز بيشتغل من CSS لوحده من غير JS | لو لازم تدعم متصفحات أقدم من ٢٠٢٤ بالوضعين (احنا بندّيهم الفاتح بس بـ [[@supports]]) |
| التبديل الشهري/السنوي | radio و [[:has()]] من غير JS | JS بيغيّر النص | بيشتغل لو الـ JS وقع، والكيبورد والأسهم شغالين مجانًا من الـ radio | لو الأسعار جاية من API ولازم تتحسب |
| الأسئلة | [[<details name="faq">]] | accordion بـ JS و [[aria-expanded]] | الكيبورد وقارئ الشاشة شغالين من غير كود، و [[name]] بيقفل اللي مفتوح لوحده | لو محتاج حركة فتح معقدة أو تحكم من بره |
| التحقق في الفورم | Constraint Validation API ورسايل بإيدنا | مكتبة زي zod أو yup | المتصفح بيقول نوع الغلط ([[validity.typeMismatch]]...) ببلاش، واحنا بنكتب الرسالة بالعربي | لو نفس قواعد التحقق لازم تتشارك بين المتصفح والسيرفر بـ TypeScript |
| السيرفر في المعمل | [[node:http]] في ٤٢ سطر | [[npx serve]] أو Vite dev server | محتاجين نأخّر الصور قصد ([[SLOW_IMG]])، ونقلّد GitHub Pages تحت مسار فرعي، و API تجريبي للفورم | لو مش محتاج الحاجات دي، [[npx serve]] كفاية |
| القياس | [[playwright-core]] مع Chrome المتسطّب ([[channel: "chrome"]]) | Lighthouse، أو Puppeteer، أو [[playwright]] الكامل | مبينزّلش متصفح (الـ node_modules كلها ١٧ ميجا في المعمل)، وفيه CDP للـ throttling، وبيشغّل axe | Lighthouse لو عايز تقرير كامل بدرجات تديه لعميل |
| الـ accessibility | [[@axe-core/playwright]] ومشي بالكيبورد بسكربت | axe DevTools في المتصفح بإيدك | نفس الفحص كل مرة وفي CI، على الوضعين وعلى الموبايل | الإضافة بإيدك وانت بتصمم، والسكربت قبل النشر |
| النشر | GitHub Pages | Netlify أو Vercel أو Cloudflare Pages | مجاني، ومن نفس الريبو، والصفحة static | لو محتاج API جنب الصفحة (Functions) أو preview لكل PR: Netlify أو Vercel |

---

## الهيكل

~~~text habba-landing/
habba-landing/
├── index.html            الصفحة كلها (١٩٩ سطر)
├── css/
│   ├── tokens.css        الألوان والمسافات والخطوط (المصدر الوحيد للقيم)
│   ├── site.css          الأقسام بالترتيب، والمقاسات في آخره
│   └── form.css          الفورم بس
├── js/
│   ├── theme.js          ٩ سطور في الـ head: الثيم المحفوظ قبل أول رسمة
│   ├── site.js           زرار الثيم، وقايمة الموبايل، والظهور مع السكرول
│   ├── digits.js         دوال صافية: الأرقام العربي وقواعد كلمة السر
│   └── form.js           التحقق والرسايل والإرسال
├── img/
│   ├── hero-600.webp, hero-1200.webp, hero-600.jpg, hero-1200.jpg
│   └── icon.svg          أيقونة التاب
├── tools/                مش بيتنشر للزائر، بس بيترفع في الريبو
│   ├── serve.mjs         سيرفر المعمل + API تجريبي
│   ├── make-img.mjs      بيرسم صورة الـ hero في Chrome
│   ├── lint.mjs          فحص HTML من غير متصفح (CI)
│   ├── contrast.mjs      نسب التباين لكل الـ tokens
│   ├── matrix.mjs        ٦ مقاسات ومفيش scroll أفقي
│   ├── perf.mjs          FCP و LCP و CLS ووميض الثيم
│   ├── a11y.mjs          axe + الكيبورد + القفز للأقسام
│   └── form-test.mjs     بيسوق الفورم زي يوزر
├── package.json          devDependencies وأوامر npm
└── .gitignore            node_modules
~~~

---

## الخطوة ٠: المعمل

~~~bash
mkdir habba-landing && cd habba-landing
npm init -y
npm i -D playwright-core@1.64.1 @axe-core/playwright@4.14.0
mkdir css js img tools
~~~

~~~text الناتج (Node 24 على ويندوز)
added 3 packages, and audited 4 packages in 3s

found 0 vulnerabilities
~~~

- [[playwright-core]] هو Playwright من غير المتصفحات المتحمّلة معاه، فبنقوله [[channel: "chrome"]] يستخدم Chrome المتسطّب عندك. لو مفيش Chrome: [[npx playwright install chromium]] واشيل [[channel]].
- النسخ مكتوبة بالظبط ([[@1.64.1]]) عشان اللي بيقرا بعد سنة يجيب نفس السلوك.
- في [[package.json]] زوّد [[type: "module"]] عشان [[import]] تشتغل في ملفات [[tools/]]، وأوامر:

~~~json package.json
{
  "name": "habba-landing",
  "version": "1.0.0",
  "scripts": {
    "serve": "node tools/serve.mjs 5173",
    "lint": "node tools/lint.mjs index.html && node tools/contrast.mjs",
    "test": "node tools/form-test.mjs && node tools/matrix.mjs && node tools/a11y.mjs"
  },
  "type": "module",
  "devDependencies": {
    "@axe-core/playwright": "^4.14.0",
    "playwright-core": "^1.64.1"
  },
  "private": true
}
~~~

[[npm test]] محتاج السيرفر شغال في ترمنال تاني ([[npm run serve]]).

### السيرفر

~~~javascript tools/serve.mjs
// سيرفر static صغير للمعمل: node tools/serve.mjs [port] [base]
// base بيقلّد GitHub Pages لمشروع: الموقع بيتخدم تحت /اسم-الريبو/ مش تحت /
// SLOW_IMG=1500 بيأخّر الصور ١٫٥ ثانية (زي CDN بطيء) عشان الـ layout shift يبان
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const port = Number(process.argv[2] || 5173);
const base = process.argv[3] || "/";
const slowImg = Number(process.env.SLOW_IMG || 0);
const root = path.resolve(".");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json" };
http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  let p = decodeURIComponent(url.pathname);
  if (req.method === "POST" && p === base + "api/signup") {        // API تجريبي للفورم
    let body = "";
    req.on("data", (c) => { body += c; });
    req.on("end", () => {
      const f = new URLSearchParams(body);
      console.log("POST signup", f.get("email"), f.get("plan"));      // من غير الباسورد في اللوج
      const taken = (f.get("email") || "").startsWith("taken@");
      setTimeout(() => {
        res.writeHead(taken ? 409 : 201, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(taken ? { field: "email", message: "الإيميل ده عليه حساب، جرّب تدخل بيه" } : { ok: true }));
      }, 800);
    });
    return;
  }
  if (!p.startsWith(base)) { console.log("404", req.url); res.writeHead(404); return res.end("not found"); }
  p = "/" + p.slice(base.length);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, p);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    console.log("404", req.url);
    res.writeHead(404, { "content-type": "text/plain" }); return res.end("not found");
  }
  const send = () => {
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-cache" });
    fs.createReadStream(file).pipe(res);
  };
  if (slowImg && p.startsWith("/img/")) setTimeout(send, slowImg); else send();
}).listen(port, "127.0.0.1", () => console.log("http://127.0.0.1:" + port + base));
~~~

- [[process.argv[2]]] أول كلمة بعد اسم الملف (البورت)، و [[process.argv[3]]] التانية (المسار الأساسي). [[process.env.SLOW_IMG]] متغير بيئة: [[SLOW_IMG=1500 node tools/serve.mjs 5174]] في bash، و [[$env:SLOW_IMG=1500; node tools/serve.mjs 5174]] في PowerShell.
- [[new URL(req.url, "http://x")]] بيفك الرابط عشان ناخد [[pathname]] من غير [[?query]]، و [[decodeURIComponent]] بيرجّع أي حروف مشفّرة.
- الـ API: لو الطلب [[POST]] على [[api/signup]] بنجمع الـ body حتة حتة ([[data]]) ونفكه بـ [[URLSearchParams]] (نفس شكل الفورم). الإيميل اللي بيبدأ بـ [[taken@]] بيرجع 409 عشان نجرّب حالة «الإيميل عليه حساب». واللوج مفيهوش الباسورد أبدًا.
- [[!file.startsWith(root)]] بيمنع حد يطلب [[/../../]] ويقرا ملفات بره الفولدر.
- [[cache-control: no-cache]] عشان كل تعديل يبان من غير ما تمسح الكاش.
- [[setTimeout(send, slowImg)]] بيأخّر الصور بس، فالـ HTML والـ CSS بيوصلوا عادي والصورة متأخرة: ده بالظبط الموقف اللي الـ layout shift بيبان فيه.

~~~text node tools/serve.mjs 5173
http://127.0.0.1:5173/
~~~

### صورة الـ hero من غير برنامج صور

بدل ما ننزّل صورة من النت (حقوق، وحجم مش معروف)، بنرسمها على [[canvas]] جوه Chrome ونحفظها بـ [[toDataURL]] بصيغتين ومقاسين:

~~~javascript tools/make-img.mjs
// بيرسم صورة الـ hero على canvas في Chrome ويحفظها webp و jpg بمقاسين، من غير أي مكتبة صور
import { chromium } from "playwright-core";
import fs from "node:fs";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.setContent("<canvas id=c></canvas>");
for (const w of [1200, 600]) {
  const out = await page.evaluate((w) => {
    const h = Math.round(w * 0.75), c = document.getElementById("c");
    c.width = w; c.height = h;
    const x = c.getContext("2d"), s = w / 1200;
    const g = x.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#f6e3cf"); g.addColorStop(1, "#d9a77c");
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {               // حبات بن عشوائية بس ثابتة (نفس الـ seed)
      const px = (i * 173) % w, py = (i * 97) % h, r = (14 + (i % 5) * 4) * s;
      x.save(); x.translate(px, py); x.rotate(i);
      x.fillStyle = i % 3 ? "#5b3216" : "#7a4520";
      x.beginPath(); x.ellipse(0, 0, r, r * 0.68, 0, 0, Math.PI * 2); x.fill();
      x.strokeStyle = "#2e180a"; x.lineWidth = 3 * s;
      x.beginPath(); x.moveTo(-r * 0.8, 0); x.quadraticCurveTo(0, r * 0.3, r * 0.8, 0); x.stroke();
      x.restore();
    }
    const cx = 600 * s;                          // الفنجان: طبق، وجسم، وودن، وسطح القهوة، وبخار
    x.fillStyle = "#fffaf4"; x.beginPath(); x.ellipse(cx, 690 * s, 300 * s, 55 * s, 0, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(cx - 200 * s, 380 * s); x.lineTo(cx + 200 * s, 380 * s);
    x.quadraticCurveTo(cx + 190 * s, 660 * s, cx, 670 * s); x.quadraticCurveTo(cx - 190 * s, 660 * s, cx - 200 * s, 380 * s); x.fill();
    x.lineWidth = 34 * s; x.strokeStyle = "#fffaf4";
    x.beginPath(); x.arc(cx + 215 * s, 480 * s, 70 * s, -Math.PI / 2, Math.PI / 2); x.stroke();
    x.fillStyle = "#3a2111"; x.beginPath(); x.ellipse(cx, 385 * s, 195 * s, 38 * s, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "rgba(255,250,244,.85)"; x.lineWidth = 10 * s; x.lineCap = "round";
    for (const dx of [-70, 0, 70]) { x.beginPath(); x.moveTo(cx + dx * s, 320 * s); x.bezierCurveTo(cx + (dx - 40) * s, 270 * s, cx + (dx + 40) * s, 230 * s, cx + dx * s, 180 * s); x.stroke(); }
    return { webp: c.toDataURL("image/webp", 0.78), jpg: c.toDataURL("image/jpeg", 0.8) };
  }, w);
  for (const [ext, url] of Object.entries(out)) {
    const buf = Buffer.from(url.split(",")[1], "base64");
    fs.writeFileSync("img/hero-" + w + "." + ext, buf);
    console.log("img/hero-" + w + "." + ext, Math.round(buf.length / 1024) + "KB");
  }
}
await browser.close();
~~~

~~~text node tools/make-img.mjs
img/hero-1200.webp 22KB
img/hero-1200.jpg 47KB
img/hero-600.webp 10KB
img/hero-600.jpg 19KB
~~~

- [[page.evaluate(fn, w)]] بيشغّل الـ function جوه الصفحة (مش في Node)، و [[w]] بيتبعت كـ argument لأن الكود جوه مش شايف متغيرات Node.
- [[toDataURL("image/webp", 0.78)]] بيرجّع الصورة نص [[data:image/webp;base64,...]]، والـ [[0.78]] الجودة. [[split(",")[1]]] بياخد اللي بعد الفاصلة، و [[Buffer.from(..., "base64")]] بيرجّعه bytes نكتبهم في ملف.
- لاحظ الأرقام: webp أصغر من jpg بأكتر من النص (٢٢ مقابل ٤٧ كيلو) لنفس الصورة، فده اللي هيتبعت لأي متصفح حديث، والـ jpg للقديم بس عن طريق [[<picture>]].
- [[(i * 173) % w]] بدل [[Math.random()]]: نفس الحبات في نفس المكان كل مرة، فالصورة متتغيّرش لو شغّلت السكربت تاني ومتعملش diff في git.

---

## الخطة: كل خطوة بتبني إيه وبتتقاس بإيه

| الخطوة (الدرس) | بتبني | الرقم اللي بيقول إنها خلصت |
|---|---|---|
| الصورة الكبيرة | المعمل والهيكل | lint بيقول [[0 problems]]، والشجرة فيها h1 واحد و ٦ h2 |
| الألوان والثيم والعربي | [[tokens.css]] و [[theme.js]] والأساس | ٢٦ زوج ألوان كلهم فوق ٤٫٥، والثيم بيتحط قبل أول رسمة |
| الـ header والـ hero | header لازق زجاجي، وقايمة موبايل، و hero | القايمة مقفولة على ٣٦٠ وبتفتح بـ [[aria-expanded]]، و CLS صفر والصورة متأخرة ١٫٥ ثانية |
| المميزات والآراء والأسعار | bento، وكروت آراء، وأسعار بـ [[:has()]] | الأسهم بتبدّل السعر من غير JS، ومفيش overflow على ٣٢٠ |
| الأسئلة والـ CTA والـ footer والحركة | [[details name]]، والـ footer، والظهور مع السكرول | واحد بس مفتوح، و ٠ عناصر مستخبية لو الـ JS وقع |
| فورم تسجيل accessible | الفورم كله | [[form-test.mjs]]: ٨ PASS |
| مصفوفة المقاسات والأداء | [[matrix.mjs]] و [[perf.mjs]] | ٦ مقاسات OK، و CLS صفر، والثيم قبل أول رسمة |
| فحص accessibility والنشر | [[a11y.mjs]] و [[lint.mjs]] والنشر | axe صفر في ٣ حالات، و ٣١ وقفة كيبورد كلها ظاهرة، وصفر طلبات فاشلة تحت مسار فرعي |

---

## خلاصة

- ارسم الأقسام كأسئلة في دماغ الزائر بالترتيب، وخلّي كل الزراير توصل لهدف واحد ([[#signup]]).
- الهيكل الصح ([[header]] و [[nav]] و [[main]] و [[section]] بعنوان و [[footer]]) بيدّيك landmarks وفهرس عناوين من غير ARIA زيادة.
- كل أداة في الجدول ليها سبب وليها «إمتى تختار البديل»، فلو مشروعك مختلف (صفحات كتير، API، فريق كبير) القرار ممكن يتغيّر.
- المعمل نفسه جزء من المشروع: سيرفر بيقدر يأخّر الصور ويقلّد GitHub Pages، وأدوات قياس بتطلّع نفس الرقم كل مرة.`,
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه الـ CTA section ملوش [[id]] وكل الأقسام التانية ليها، وليه الـ h1 في الـ hero مش في اللوجو.`, done: R`الشرح بيقول إن الـ [[id]] هدف لينك ومفيش لينك بيودّي للـ CTA، وإن الصفحة ليها عنوان رئيسي واحد بيوصف محتواها (اللوجو اسم مش عنوان)، وزميلك قدر يقول من غير ما يبص الـ h1 بتاع صفحة «عن المحمصة» هيبقى إيه.` },
            { lvl: 'تطبيق', t: R`**ابني:** نفس الهيكل لموضوع تاني (جيم أو مكتبة أو مدرسة لغات متخيلة): ٧ أقسام بأسئلة مختلفة تناسبه. اكتب السؤال اللي كل قسم بيرد عليه كتعليق HTML فوقه.`, done: R`[[lint.mjs]] عليه [[0 problems]]، وشجرة الـ accessibility فيها banner و main و contentinfo و h1 واحد، وكل قسم فوقه تعليق [[<!-- «...؟» -->]] بسؤال مختلف.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الهيكل ده «شغال»: [[<div class="header"><h1>حبّة</h1></div><div class="main"><h1>بن طازة</h1><a href="#Pricing">الأسعار</a><div id="pricing">...</div></div>]]. لقيلو ٤ مشاكل قبل ما تفتح DevTools، وبعدين أثبت كل واحدة.`, done: R`لقيت: مفيش landmarks (div بدل header و main)، و h1 اتنين، واللينك [[#Pricing]] مش هيلاقي [[id="pricing"]] لأن الـ id حساس لحالة الحروف، ومفيش [[lang]] و [[dir]]. وبعد التصليح الـ lint صفر واللينك بيقفز.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** شغّلت [[node tools/serve.mjs 5173 /habba-landing/]] وفتحت [[http://127.0.0.1:5173/]]. هيرجع إيه؟ وفتحت [[http://127.0.0.1:5173/habba-landing/css/site.css]]؟ جرّب في PowerShell، وبعدين نفس الأمر في Git Bash.`, done: R`الأول 404 (بره الـ base)، والتاني 200. وفي Git Bash لاحظت إن السيرفر طبع [[http://127.0.0.1:5173C:/Program Files/Git/habba-landing/]] وكل حاجة بقت 404، لأن Git Bash حوّل [[/habba-landing/]] لمسار ويندوز، والحل [[MSYS_NO_PATHCONV=1]] قبل الأمر.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** عدّل [[make-img.mjs]] يطلّع كمان AVIF ([[toDataURL("image/avif")]]) وقارن الأحجام بالـ ٣ صيغ والمقاسين. لو Chrome مرجّعش AVIF، اعرف ليه من الناتج نفسه.`, done: R`عندك جدول بالأحجام، ولاحظت إن [[toDataURL]] بيرجّع [[data:image/png]] لو الصيغة مش مدعومة في الـ canvas (اكتب الـ prefix اللي رجع فعلًا)، فعرفت إن الـ AVIF محتاج أداة زي sharp أو squoosh مش الـ canvas.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Playwright عن [[ariaSnapshot]] اعرف إزاي تخلي [[outline.mjs]] يطلع الشجرة كـ YAML كاملة، واكتب اختبار بـ [[expect(locator).toMatchAriaSnapshot()]] بيتأكد إن الـ main فيه h1 واحد و ٦ h2 بالظبط.`, done: R`عندك اختبار بيعدّي على الهيكل، وبيقع لو غيّرت أي h2 لـ h3 أو مسحت قسم، ومكتوب الرسالة اللي ظهرت لما وقع.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const html = '<header><nav><a href="#features">ليه</a><a href="#reviews">آراء</a><a href="#pricing">الأسعار</a><a href="#faq">أسئلة</a></nav></header>' +
  '<main id="main"><section id="hero"><h1>بن طازة</h1></section><section id="features"><h2>ليه</h2></section><section id="reviews"><h2>آراء</h2></section>' +
  '<section id="pricing"><h2>الأسعار</h2></section><section id="faq"><h2>أسئلة</h2></section><section class="cta"><h2>جرّب</h2></section><section id="signup"><h2>اشترك</h2></section></main>';
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const sections = [...html.matchAll(/<section\b([^>]*)>\s*<(h[12])/g)];
const links = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
console.log("sections: " + sections.length + ", with id: " + sections.filter((s) => /\sid=/.test(s[1])).length);
console.log("h1: " + (html.match(/<h1\b/g) || []).length);
console.log("nav links: " + links.length + ", broken: " + links.filter((l) => !ids.has(l)).length);`, expect: [R`sections: 7, with id: 6`, R`h1: 1`, R`nav links: 4, broken: 0`] },
          ],
        },
        {
          cmd: "landing page: الألوان والثيم والعربي",
          title: "tokens بـ light-dark()، ووضع غامق بيمشي ورا الجهاز ومن غير وميض، وطباعة عربي سليمة: وكل لون متقاس تباينه",
          learn: R`تعمل كل ألوان الصفحة ومسافاتها في ملف واحد، والوضع الغامق في نفس السطر، وتمنع وميض الثيم، وتقيس التباين بسكربت بدل العين.`,
          out: R`[[tokens.css]] و [[theme.js]] وأول جزء من [[site.css]]، و [[contrast.mjs]] بيقول إن ٢٦ زوج ألوان كلهم من ٤٫٥٤ لـ ١٦٫٥٥.`,
          desc: R`قبل أي قسم، بنكتب **الـ tokens**: كل لون ومسافة وخط وظل في الصفحة متغير CSS في [[tokens.css]]، وكل حتة في الصفحة بتقرا منه بس. كل لون مكتوب مرة واحدة بقيمتين: [[--bg: light-dark(#fbf7f2, #16110d)]]، الأولى للفاتح والتانية للغامق، والمتصفح بيختار حسب [[color-scheme]]. فالوضع الغامق بيشتغل من إعداد الجهاز لوحده من غير JS، ولو اليوزر داس على زرار الثيم بنحط [[data-theme]] على الـ html بيغيّر [[color-scheme]] بس.

ومشكلتين بنحلهم بالقياس:
• **الوميض:** النسخة الأولى كانت بتقرا الثيم المحفوظ في [[site.js]] اللي عليه [[defer]]. على سيرفر سريع الثيم اتحط قبل أول رسمة (٤٤٦ مقابل ١١١٦ms) فمكانش باين، بس لما الصور اتأخرت أول رسمة جت أبدر والثيم اتحط **بعدها** (٤٨٤ مقابل ٤٦٤ms): الصفحة بتظهر فاتح وبعدين تقلب غامق. الحل ٩ سطور في [[theme.js]] في الـ head من غير [[defer]]: الثيم بقى بيتحط عند ٣٥٨–٣٦٧ms وأول رسمة ٥١٢–٥٤٤ms.
• **التباين:** الرمادي الأول للنص الثانوي ([[#8f7f72]]) كان ٣٫٨٥ على الأبيض، و axe مسك ١٠ عناصر. ولون الزرار الأول ([[#c0622f]]) تحت الأبيض كان ٤٫١٨. [[contrast.mjs]] بيحسب كل زوج مستخدم في الوضعين ويقع لو أي واحد تحت ٤٫٥.

وكمان الطباعة العربي: خطوط الجهاز (صفر تحميل)، و [[line-height: 1.8]] للفقرات، و [[letter-spacing: 0]] للعربي (اتقاس: نفس [[-.02em]] قصّر سطر إنجليزي ١١٫٥ بكسل وسطر عربي ١٫٩ بكسل بس، يعني التأثير مش متساوي)، والأرقام العربي في الأسعار والإنجليزي في الموبايل والإيميل.`,
          example: R`:root {
  color-scheme: light dark;
  --bg: light-dark(#fbf7f2, #16110d);
  --ink: light-dark(#1f1712, #f2e9e0);
  --brand: light-dark(#a3501f, #ee8c58);
}
:root[data-theme="dark"] { color-scheme: dark; }
body { background: var(--bg); color: var(--ink); }`,
          lines: [
            R`[[:root]] هو عنصر [[<html>]] بس بـ specificity أعلى من [[html]] (زي class)، والمتغيرات اللي بتتعرف هنا بتتورث لكل الصفحة.`,
            R`[[color-scheme: light dark]] بيقول للمتصفح الصفحة بتدعم الاتنين، فيختار حسب إعداد الجهاز، ومعاه scrollbar و inputs و [[light-dark()]] كلهم.`,
            R`لون الخلفية: [[light-dark(فاتح, غامق)]] بترجع القيمة الأولى لو الـ color-scheme المستخدم فاتح والتانية لو غامق. سطر واحد بدل بلوكين.`,
            R`لون النص الأساسي بنفس الطريقة: شبه أسود على الفاتح، وكريمي على الغامق، والتباين ١٦٫٥٥ و ١٥٫٦٣.`,
            R`لون البراند: البرتقالي الغامق في الفاتح، وأفتح في الغامق عشان يتقري على الخلفية الغامقة (٧٫٦١ بدل ما يبقى نفس اللون ويبوظ).`,
            R`قفلة بلوك الـ tokens: كل اللي فوق متغيرات مش ستايلات، فمش بيغيّروا شكل حاجة لوحدهم.`,
            R`لو اليوزر اختار الغامق بالزرار، [[data-theme="dark"]] بيجبر [[color-scheme]] على dark، فكل [[light-dark()]] في الصفحة ترجع القيمة التانية حتى لو الجهاز فاتح.`,
            R`الاستخدام: أي عنصر بيقرا [[var(--bg)]] و [[var(--ink)]] بس، ومفيش ولا hex في أي ملف غير [[tokens.css]].`,
          ],
          try: R`اعمل [[tokens.css]] و [[theme.js]] من الشرح، وصفحة فيها فقرة وزرار. من DevTools افتح Rendering (من قايمة ⋮ › More tools) وغيّر «Emulate CSS media feature prefers-color-scheme» بين light و dark من غير ما تعمل refresh. بعدين في الـ Console اكتب [[localStorage.setItem("theme","light")]] وريفريش والجهاز على dark. وفي الآخر شغّل [[node tools/contrast.mjs]] وغيّر [[muted]] الفاتح لـ [[#8f7f72]] وشوف إيه اللي هيقع.`,
          sol: R`الألوان بتتقلب لحظيًا مع Rendering (من غير refresh) لأن [[light-dark()]] بيتحسب من [[color-scheme]] كل مرة. ولما [[theme]] محفوظ [[light]] الصفحة بتفضل فاتح رغم إن الجهاز dark، لأن [[theme.js]] حط [[data-theme="light"]] قبل الرسم. و [[contrast.mjs]] بـ [[#8f7f72]] بيطبع [[light  muted on surface 3.86 FAIL]] و [[muted on bg 3.61]] و [[muted on alt]] أقل، ويخرج بـ 1.`,
          flag: "script",
          deep: {
            why: R`لما اللون مكتوب في ٢٠ مكان، أي تعديل (البراند غمّق، أو التباين وقع) معناه تدوّر وتصلّح ٢٠ مرة وتنسى واحدة. الـ tokens بتخلّي القرار في مكان واحد. والوضع الغامق بقى متوقع من اليوزر، وأوحش حاجة فيه هي الوميض: الصفحة تظهر بيضا نص ثانية في أوضة ضلمة وبعدين تقلب. وكمان التباين مش ذوق: WCAG بيطلب ٤٫٥ للنص العادي، وتحت كده ناس كتير (نظر ضعيف، شمس على الموبايل) مش هتقرا.`,
            how: R`المتغير في CSS بيخزّن الكلام زي ما هو، و [[light-dark()]] جواه بتتحل في مكان الاستخدام حسب [[color-scheme]] المستخدم على العنصر ده (وهو بيتورث من الـ html)، فلما [[data-theme]] يغيّر [[color-scheme]] على الـ root كل الألوان بتتقلب مرة واحدة. والوميض بيحصل لأن [[defer]] و [[type="module"]] بيشتغلوا بعد ما الـ HTML يتقري، والمتصفح ممكن يرسم أول مرة قبلها لو الـ CSS وصل بدري. السكربت العادي في الـ head (من غير defer) بيوقّف قراية الـ HTML لحد ما يخلص، فبيشتغل قبل أي رسمة أكيد، وعشان كده لازم يبقى صغير جدًا (٩ سطور). والتباين بيتحسب من الـ relative luminance لكل لون: كل قناة تتحول من sRGB لخطّية، وبعدين [[0.2126R + 0.7152G + 0.0722B]]، والنسبة [[(الأفتح + 0.05) / (الأغمق + 0.05)]].`,
            when: R`أي مشروع فيه أكتر من صفحة أو أكتر من لون، حتى لو مش ناوي تعمل غامق دلوقتي (لما تحب تعمله هيبقى سطر في كل token). و [[light-dark()]] بقى Baseline من ٢٠٢٤ (Chrome 123 و Firefox 120 و Safari 17.5 حسب الوثائق)، ولو جمهورك على أجهزة أقدم بكتير استخدم [[[data-theme]]] بيعيد الألوان، وده موجود في وحدة «الثيم والعربي».`,
            mistakes: R`ألوان hex جوه الكومبوننتات (زي header زجاجي بـ [[rgb(251 247 242 / .72)]] ثابت: في الغامق بقى أبيض شفاف والنص عليه تباينه ١٫٦٦، اتقاس في الخطوة الجاية). أو سكربت الثيم بـ [[defer]] أو في آخر الـ body. أو [[localStorage]] من غير try/catch (بيرمي في بعض أوضاع الخصوصية والـ iframes). أو تقلب الألوان حرفيًا للغامق (البرتقالي الغامق على أسود تباينه ضعيف، فبتفتّحه). أو [[letter-spacing]] سالب على عناوين عربي.`
          },
          teach: R`## الفكرة: كل قيمة في مكان واحد

الـ token متغير CSS ليه اسم بيقول **وظيفته** مش شكله: [[--muted]] (نص ثانوي) مش [[--gray-500]]. لو بكرة البراند اتغيّر، بتغيّر سطر واحد، وكل زرار وعنوان ولينك بيتغيّر معاه.

---

## tokens.css كامل

~~~css css/tokens.css
/* الألوان: كل token ليه قيمة للفاتح وقيمة للغامق في سطر واحد بـ light-dark() */
:root {
  color-scheme: light dark;
  --bg:         light-dark(#fbf7f2, #16110d);
  --surface:    light-dark(#ffffff, #211912);
  --alt:        light-dark(#f3ebe1, #1b1510);
  --ink:        light-dark(#1f1712, #f2e9e0);
  --muted:      light-dark(#6b5c50, #b5a698);
  --line:       light-dark(#e7dccf, #3a2e25);
  --brand:      light-dark(#a3501f, #ee8c58);
  --brand-ink:  light-dark(#ffffff, #1a0f08);
  --brand-soft: light-dark(#f7e3d6, #3a2316);
  --cta-bg:     light-dark(#2b1a10, #f2e1cf);
  --cta-ink:    light-dark(#fbf1e7, #23160d);
  --err:        light-dark(#b42318, #ff8f80);
  --ok:         light-dark(#1d6b3a, #74d39d);
  --shadow-c:   light-dark(rgb(31 23 18 / .16), rgb(0 0 0 / .55));
  --ring:       0 0 0 3px var(--bg), 0 0 0 6px var(--brand);

  --r-sm: 8px;
  --r: 16px;
  --r-lg: 28px;
  --shadow: 0 1px 2px var(--shadow-c), 0 10px 30px -12px var(--shadow-c);
  --gutter: clamp(16px, 4vw, 40px);
  --space: clamp(56px, 9vw, 112px);
  --nav-h: 64px;
  --ease: cubic-bezier(.22, .7, .2, 1);
  --font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif;
  --z-header: 100;
  --z-skip: 200;
}
/* اختيار اليوزر بيغلب إعداد الجهاز */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }

/* متصفح قديم مبيفهمش light-dark(): ياخد الفاتح بس بدل ما الألوان كلها تبوظ */
@supports not (color: light-dark(#000, #fff)) {
  :root {
    --bg: #fbf7f2; --surface: #ffffff; --alt: #f3ebe1; --ink: #1f1712; --muted: #6b5c50; --line: #e7dccf;
    --brand: #a3501f; --brand-ink: #ffffff; --brand-soft: #f7e3d6; --cta-bg: #2b1a10; --cta-ink: #fbf1e7; --err: #b42318; --ok: #1d6b3a;
    --shadow-c: rgb(31 23 18 / .16);
  }
}
~~~

### الألوان: كل اسم بيقول بيتستخدم فين

| token | بيتستخدم في | ملاحظة |
|---|---|---|
| [[--bg]] و [[--surface]] و [[--alt]] | خلفية الصفحة، والكروت، والأقسام اللي بالتبادل | تلات درجات قريبة عشان الأقسام تتفصل من غير خطوط |
| [[--ink]] و [[--muted]] | النص الأساسي والنص الثانوي | [[--muted]] اتغمّق من [[#8f7f72]] لـ [[#6b5c50]] بعد ما التباين وقع (تحت) |
| [[--brand]] و [[--brand-ink]] | الزرار الأساسي والنص اللي عليه | [[--brand-ink]] أبيض في الفاتح وشبه أسود في الغامق، لأن البراند في الغامق فاتح |
| [[--brand-soft]] | خلفية الكارت الكبير والأفاتار والبادج | درجة فاتحة جدًا من البراند، والنص عليها [[--ink]] (١٤٫٢٢) |
| [[--cta-bg]] و [[--cta-ink]] | شريط الـ CTA المقلوب | في الغامق بيبقى فاتح، فبيفضل «مقلوب» عن باقي الصفحة في الوضعين |
| [[--err]] و [[--ok]] | رسايل الفورم | ألوان وظيفية متتغيرش مع البراند، وكل واحدة فوق ٦٫٥ على الكارت |
| [[--shadow-c]] | لون الظل | [[light-dark()]] بتشتغل جوه أي قيمة لون، حتى لو هتتحط جوه [[box-shadow]] |
| [[--ring]] | حلقة الـ focus في الفورم | حلقتين: واحدة بلون الخلفية وبعدها البراند، فبتبان على أي خلفية |

### الباقي: مقاسات ومسافات وحركة

- [[--r-sm]] و [[--r]] و [[--r-lg]]: ٣ درجات انحناء بس. الكروت [[--r]]، والكروت الكبيرة والصور [[--r-lg]]، والخانات [[--r-sm]].
- [[--shadow]]: ظلين فوق بعض، واحد صغير حاد ([[0 1px 2px]]) بيرسم الحافة وواحد كبير ناعم ([[0 10px 30px -12px]]) بيدي العمق. الـ [[-12px]] (spread سالب) بيخلّي الظل الكبير أصغر من الكارت فميطلعش على الجناب.
- [[--gutter: clamp(16px, 4vw, 40px)]]: المسافة على الجناب. [[clamp(أقل, مفضّل, أكتر)]]: ٤٪ من عرض الشاشة، بس مش أقل من ١٦ ولا أكتر من ٤٠. على ٣٦٠ بتبقى ١٦، وعلى ١٤٤٠ بتبقى ٤٠.
- [[--space]]: المسافة فوق وتحت كل قسم بنفس الفكرة، من ٥٦ لـ ١١٢. إيقاع واحد للصفحة كلها.
- [[--nav-h]]: ارتفاع الـ header، وهنستخدمه في [[scroll-margin-top]] عشان القفز للأقسام.
- [[--ease]]: منحنى حركة واحد لكل الصفحة، بيبدأ سريع ويهدى في الآخر.
- [[--z-header]] و [[--z-skip]]: طبقات بأسامي بدل [[z-index: 9999]]. الـ skip link فوق الـ header.

### ليه light-dark() مش بلوك غامق كامل

النسخة الأولى كانت كده:

~~~css الطريقة القديمة (النسخة الأولى)
:root { --bg: #fbf7f2; --ink: #1f1712; /* ... ١٣ لون */ }
:root[data-theme="dark"] { --bg: #16110d; --ink: #f2e9e0; /* ... نفس الـ ١٣ تاني */ }
~~~

اتنين مشاكل اتقاسوا:
1. **إعداد الجهاز متجاهَل:** Chrome بـ [[colorScheme: "dark"]] (زي موبايل على الوضع الليلي) والنسخة الأولى خلفيتها [[rgb(251, 247, 242)]] (فاتح) وزرار الثيم [[aria-pressed="false"]]. النسخة النهائية خلفيتها [[rgb(22, 17, 13)]] والزرار [[true]]، من غير JS.
2. **كل لون في مكانين:** لو زوّدت لون ونسيته في البلوك التاني، الغامق يبقى فيه لون فاتح لوحده.

والـ [[@supports not (color: light-dark(#000, #fff))]] في آخر الملف: متصفح قديم مبيفهمش [[light-dark()]] هيعتبر كل token قيمته غلط، والصفحة تبقى من غير ألوان خالص. البلوك ده بيدّيله الفاتح بس، وده مقبول.

---

## theme.js: الثيم قبل أول رسمة

~~~javascript js/theme.js
// بيتحمّل في الـ head من غير defer: بيشتغل قبل أول رسمة، فمفيش وميض
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") root.dataset.theme = t;
  } catch (e) {}
})();
~~~

~~~html index.html (الـ head كامل)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محمصة حبّة: بن طازة يوصلك كل شهر</title>
<meta name="description" content="اشتراك شهري في بن محموص طازة من محمصة حبّة: اختار التحميصة والطحنة، ويوصلك لحد الباب.">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="img/icon.svg" type="image/svg+xml">
<script src="js/theme.js"></script>
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/site.css">
<link rel="stylesheet" href="css/form.css">
<script type="module" src="js/site.js"></script>
<script type="module" src="js/form.js"></script>
</head>
~~~

~~~html img/icon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#a3501f"/><ellipse cx="32" cy="32" rx="14" ry="20" fill="#fff4ea" transform="rotate(30 32 32)"/><path d="M24 18c8 8 8 20 16 28" stroke="#a3501f" stroke-width="4" fill="none" stroke-linecap="round"/></svg>
~~~

- [[<title>]] و [[description]]: اللي بيظهر في التاب وفي نتايج البحث وفي معاينة اللينك لما يتبعت في شات.
- [[<meta name="color-scheme" content="light dark">]]: نفس معنى [[color-scheme]] في الـ CSS بس المتصفح بيعرفه **قبل** ما ملف الـ CSS يوصل، فلو الجهاز غامق خلفية الصفحة الفاضية بتبقى غامقة من أول لحظة بدل أبيض (حسب مواصفة HTML).
- [[<link rel="icon">]] بـ SVG: أيقونة التاب ملف واحد صغير بيتكبّر على أي شاشة. من غيرها المتصفح بيطلب [[/favicon.ico]] لوحده (النسخة الأولى كانت بتطلّع ٤٠٤ في الـ Console كل مرة).
- الترتيب: [[theme.js]] (يوقّف القراية ثواني) ثم الـ ٣ ملفات CSS (بيتحمّلوا مع بعض) ثم الـ modules (بيستنوا آخر الـ HTML ومش بيوقّفوا حاجة).

- [[(function () { ... })()]]: function بتشتغل على طول (IIFE)، عشان [[root]] و [[t]] ميبقوش متغيرات عامة على [[window]]. ده سكربت عادي مش module، فأي [[var]] بره function كان هيتحط على [[window]].
- [[root.classList.add("js")]]: علامة إن الـ JS شغال. الـ CSS بيخفي العناصر اللي بتظهر مع السكرول بس لو [[.js]] موجودة، فلو الـ JS وقع مفيش حاجة مستخبية (درس «الأسئلة والـ CTA والـ footer والحركة»).
- [[try { ... } catch (e) {}]]: [[localStorage]] ممكن يرمي (Safari في الـ private mode القديم، أو iframe بـ cookies مقفولة)، ومن غير try سكربت في الـ head بيرمي = كل اللي بعده في نفس الملف ميشتغلش.
- [[t === "light" || t === "dark"]]: منكتبش أي قيمة جاية من التخزين في الـ DOM من غير ما نتأكد إنها واحدة من المتوقع.
- [[root.dataset.theme = t]] بيحط [[data-theme="dark"]] على [[<html>]]، والسطر [[:root[data-theme="dark"]]] في الـ CSS بيغيّر [[color-scheme]].
- مكانه قبل الـ CSS ومن غير [[defer]]: السكربت ده بيوقّف قراية الـ HTML لحد ما يتحمّل ويشتغل. ده بيأخّر كل حاجة شوية، فلازم يفضل ٩ سطور. وكل الـ JS التاني [[type="module"]] (بيستنى لحد آخر الـ HTML).

### زرار الثيم (أول جزء في site.js)

~~~javascript js/site.js (١)
// ١. زرار الثيم: اختيار اليوزر بيتحفظ، ولو مفيش اختيار بنمشي ورا إعداد الجهاز
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-btn");
const osDark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");
const paintBtn = () => themeBtn.setAttribute("aria-pressed", String(current() === "dark"));
themeBtn.addEventListener("click", () => {
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  paintBtn();
});
osDark.addEventListener("change", paintBtn);
paintBtn();
~~~

- [[matchMedia("(prefers-color-scheme: dark)")]] بيرجّع object فيه [[.matches]] (true لو الجهاز غامق) وبيبعت [[change]] لما اليوزر يغيّر إعداد الجهاز والصفحة مفتوحة.
- [[current()]]: الثيم الفعلي = اختيار اليوزر لو موجود، وإلا إعداد الجهاز. من غيرها الزرار أول ضغطة كان هيعمل «غامق» على صفحة غامقة أصلًا.
- الزرار [[aria-pressed]] (toggle button): قارئ الشاشة بيقول «الوضع الغامق، زرار، مضغوط» أو «مش مضغوط». الكلمة على الزرار ثابتة («الوضع الغامق») والحالة في [[aria-pressed]]، بدل ما النص يتغيّر لـ «الوضع الفاتح» واليوزر يتلخبط هو بيقول الحالة ولا الأمر.

### قياس الوميض

[[perf.mjs]] (الكود كامل في درس «مصفوفة المقاسات والأداء») بيحفظ [[theme=dark]] في الـ localStorage، وبيعمل reload على شبكة بطيئة (150ms و 1.6Mbps و CPU أبطأ ٤ مرات)، وبيسجّل وقتين: إمتى [[data-theme]] اتحط (بـ [[MutationObserver]] بيبدأ قبل أي سكربت في الصفحة)، وإمتى أول رسمة ([[first-contentful-paint]]). لو الثيم بعد أول رسمة يبقى فيه وميض.

| النسخة | السيرفر | الثيم اتحط عند | أول رسمة | النتيجة |
|---|---|---|---|---|
| الأولى ([[defer]] في site.js) | عادي | ٤٤٣–٤٦٤ms | ١٠٨٠–١١٢٠ms | قبل أول رسمة بالصدفة |
| الأولى | الصور متأخرة ١٫٥ ثانية | ٤٧٩–٤٩٧ms | ٤٥٦–٤٦٨ms | **بعد أول رسمة: وميض** |
| النهائية ([[theme.js]] في الـ head) | عادي | ٣٥٤–٣٧٦ms | ١٠٥٢–١١٤٤ms | قبل أول رسمة |
| النهائية | الصور متأخرة ١٫٥ ثانية | ٣٥٨–٣٦٧ms | ٥١٢–٥٤٤ms | قبل أول رسمة |

> الدرس هنا: «جرّبته ومفيش وميض» مش دليل. نفس الكود بيومض أو لأ حسب مين يوصل الأول، الـ CSS ولا الـ script. القياس في الظروف الوحشة (هنا: صور بطيئة خلّت أول رسمة تيجي أبدر) هو اللي كشفه. ولاحظ إن أول رسمة في النهائية بقت أبطأ ٥٠–٨٠ms في الظرف ده: ده تمن السكربت اللي بيوقّف القراية، وعشان كده صغير.

---

## التباين: سكربت بدل العين

~~~javascript tools/contrast.mjs
// نسبة التباين بين أزواج الـ tokens في الوضعين (WCAG 2): node tools/contrast.mjs
// كل لون "#rrggbb"؛ النص العادي محتاج 4.5 والنص الكبير والأيقونات 3
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const themes = {
  light: { bg: "#fbf7f2", surface: "#ffffff", alt: "#f3ebe1", ink: "#1f1712", muted: "#6b5c50", brand: "#a3501f", "brand-ink": "#ffffff", "brand-soft": "#f7e3d6", "cta-bg": "#2b1a10", "cta-ink": "#fbf1e7", err: "#b42318", ok: "#1d6b3a" },
  dark: { bg: "#16110d", surface: "#211912", alt: "#1b1510", ink: "#f2e9e0", muted: "#b5a698", brand: "#ee8c58", "brand-ink": "#1a0f08", "brand-soft": "#3a2316", "cta-bg": "#f2e1cf", "cta-ink": "#23160d", err: "#ff8f80", ok: "#74d39d" },
};
const pairs = [["ink", "bg"], ["muted", "bg"], ["muted", "surface"], ["muted", "alt"], ["brand", "bg"], ["brand", "surface"], ["brand-ink", "brand"], ["brand", "brand-soft"], ["ink", "brand-soft"], ["cta-ink", "cta-bg"], ["bg", "ink"], ["err", "surface"], ["ok", "surface"]];
let fail = 0;
for (const [name, t] of Object.entries(themes)) for (const [fg, bg] of pairs) {
  const r = ratio(t[fg], t[bg]);
  if (r < 4.5) fail++;
  console.log(name.padEnd(6), (fg + " on " + bg).padEnd(26), r.toFixed(2), r >= 4.5 ? "OK" : "FAIL");
}
process.exit(fail ? 1 : 0);
~~~

- [[hex.slice(i, i + 2)]] بياخد كل قناة ([[fb]] و [[f7]] و [[f2]])، و [[parseInt(..., 16)]] بيحوّلها من hex لرقم من ٠ لـ ٢٥٥، والقسمة على ٢٥٥ بتخليها من ٠ لـ ١.
- [[c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4]]: تحويل sRGB لقيمة خطّية (الشاشة مش بتعرض الأرقام بالتساوي). [[**]] أُس.
- [[0.2126 * r + 0.7152 * g + 0.0722 * b]]: العين بتحس بالأخضر أكتر بكتير من الأزرق، فده وزن كل قناة في «الإضاءة».
- [[sort((p, q) => q - p)]] عشان الأفتح يبقى فوق القسمة دايمًا، فالنسبة من ١ لـ ٢١.
- [[pairs]] الأزواج **المستخدمة فعلًا** في الصفحة بس. التباين بيتقاس للون على الخلفية اللي هيتحط عليها، مش كل لون مع كل لون.
- [[process.exit(fail ? 1 : 0)]]: كود خروج 1 لو فيه زوج واقع، فـ [[npm run lint]] يقع وكمان الـ CI.

~~~text node tools/contrast.mjs (النهائي)
light  ink on bg                  16.55 OK
light  muted on bg                6.02 OK
light  muted on surface           6.42 OK
light  muted on alt               5.43 OK
light  brand on bg                5.29 OK
light  brand on surface           5.64 OK
light  brand-ink on brand         5.64 OK
light  brand on brand-soft        4.54 OK
light  ink on brand-soft          14.22 OK
light  cta-ink on cta-bg          14.97 OK
light  bg on ink                  16.55 OK
light  err on surface             6.57 OK
light  ok on surface              6.53 OK
dark   ink on bg                  15.63 OK
dark   muted on bg                7.92 OK
dark   muted on surface           7.32 OK
dark   muted on alt               7.64 OK
dark   brand on bg                7.61 OK
dark   brand on surface           7.03 OK
dark   brand-ink on brand         7.64 OK
dark   brand on brand-soft        5.96 OK
dark   ink on brand-soft          12.23 OK
dark   cta-ink on cta-bg          13.80 OK
dark   bg on ink                  15.63 OK
dark   err on surface             7.83 OK
dark   ok on surface              9.52 OK
~~~

**النسخة الأولى:** [[--muted: #8f7f72]] كان ٣٫٨٦ على الأبيض و ٣٫٦١ على [[--bg]]، و [[--brand: #c0622f]] تحت نص أبيض ٤٫١٨. axe لقى ١٠ عناصر بتقول [[Element has insufficient color contrast of 3.85 (foreground color: #8f7f72, background color: #ffffff...)]]. الحل غمّقنا الاتنين ([[#6b5c50]] و [[#a3501f]]) لحد ما بقوا فوق ٤٫٥ في كل مكان بيتحطوا فيه، والشكل لسه نفس العيلة.

وفيه زوج **مش في اللستة قصد**: [[brand on ink]] (البراند على الأسود) ٣٫١٣ في الفاتح و ٢٫٠٥ في الغامق. فلما كلمة «شهرين ببلاش» البرتقالي بتبقى جوه زرار متختار خلفيته [[--ink]]، بنخليها تاخد لون النص ([[color: inherit]]) بدل البراند (درس «المميزات والآراء والأسعار»).

---

## الطباعة العربي

### الخط: خطوط الجهاز

[[--font: system-ui, "Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", sans-serif]]: المتصفح بياخد أول خط موجود عنده فيه الحرف. [[system-ui]] خط النظام (Segoe UI على ويندوز، وعلى أندرويد Roboto ومعاه Noto Sans Arabic للعربي)، و Tahoma احتياطي قديم فيه عربي على كل ويندوز، و Geeza Pro خط العربي على الماك و iOS. النتيجة: [[perf.mjs]] مبيعدّش ولا byte تحت «font»، ومفيش layout shift من تبديل خط.

### line-height و letter-spacing

~~~css من site.css
body { font-size: 1.0625rem; line-height: 1.8; }
h1, h2, h3 { line-height: 1.35; text-wrap: balance; }
p { text-wrap: pretty; }
:lang(ar) { letter-spacing: 0; }
~~~

- [[line-height: 1.8]] للفقرات: الحروف العربي ليها أجزاء فوق وتحت السطر (النقط والحركات والياء والميم)، ومحتاجة مسافة أكتر من اللاتيني (١٫٥ كفاية للإنجليزي عادة). العناوين أقل (١٫٣٥) عشان العنوان على سطرين ميبقاش مفكك.
- [[text-wrap: balance]]: المتصفح بيوزّع كلام العنوان على السطور بالتساوي، بدل سطر طويل وكلمة لوحدها تحت. و [[pretty]] للفقرات بيمنع كلمة لوحدها في آخر سطر.
- [[:lang(ar) { letter-spacing: 0; }]]: اتقاس في Chrome 156 بخط 48px:

| النص | [[letter-spacing: 0]] | [[-.02em]] | الفرق |
|---|---|---|---|
| «بن طازة يوصلك» | ٣١١٫٠px | ٣٠٩٫١px | ١٫٩px بس |
| «Fresh coffee» | ٢٧٣٫٥px | ٢٦٢٫٠px | ١١٫٥px |

Chrome 156 مبيكسرش وصل الحروف العربي (لقطة بـ [[.1em]] الحروف فضلت متصلة)، بيزوّد المسافة بس بين الحروف اللي مش بتتوصل أصلًا (زي «ز» و «ة»)، فالكلمة بتبان مفككة في حتت وفي حتت لأ. ومن الوثائق: مواصفة CSS Text بتقول المتصفح ميكسرش الوصل في الخطوط المتصلة، ومش كل المتصفحات والإصدارات ملتزمة بده. فبنصفّره للعربي ونستخدم التتبّع السالب للإنجليزي بس لو احتجناه.

### الأرقام والكلام الإنجليزي جوه العربي

- الأسعار بأرقام عربي («٢٤٠ جنيه») لأنها جزء من جملة عربي.
- الموبايل والإيميل [[dir="ltr"]] على الـ input (اليوزر بيكتب من الشمال)، وفي النص بيتحطوا جوه [[<bdi dir="ltr">01012345678</bdi>]]: [[bdi]] بيعزل الجزء ده عن اتجاه الجملة، فالأرقام والعلامات اللي جنبها متتلخبطش.
- [[font-variant-numeric: tabular-nums]] في الأسعار: كل الأرقام بنفس العرض، فلما السعر يتبدّل من شهري لسنوي العمود ميتنططش.

---

## site.css (١): الأساس

~~~css css/site.css (١)
/* ١. الأساس */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.8; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { line-height: 1.35; margin: 0 0 .5em; text-wrap: balance; }
p { margin: 0 0 1em; text-wrap: pretty; }
a { color: inherit; }
:lang(ar) { letter-spacing: 0; }
.wrap { width: 100%; max-width: 72rem; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 44rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 3px; }
[id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.skip { position: absolute; inset-inline-start: 8px; top: 8px; z-index: var(--z-skip); background: var(--ink); color: var(--bg); padding: 8px 14px; border-radius: var(--r-sm); translate: 0 -200%; }
.skip:focus { translate: 0 0; }
~~~

- [[box-sizing: border-box]] على كل حاجة (وعلى [[::before]] و [[::after]]): الـ width بيشمل الـ padding والـ border، فـ [[width: 100%]] مع padding مبيطلعش بره.
- [[scroll-behavior: smooth]]: القفز للأقسام بيتحرك بنعومة. وبيتلغي تحت [[prefers-reduced-motion: reduce]] (درس الحركة). و [[-webkit-text-size-adjust: 100%]] بيمنع iOS يكبّر الخط لوحده لما الموبايل يتلف.
- [[font-size: 1.0625rem]] = ١٧ بكسل لو إعداد المتصفح ١٦: العربي على الموبايل بيتقري أحسن شوية فوق ١٦. وبالـ rem عشان لو اليوزر كبّر الخط في إعدادات المتصفح الصفحة تكبر معاه.
- [[img { max-width: 100%; height: auto; display: block; }]]: الصورة متعديش عرض اللي حواليها، والطول بيتحسب من النسبة، و [[block]] بيشيل المسافة الصغيرة تحت الصورة اللي بتيجي من إنها inline على الـ baseline.
- [[.wrap]]: عرض أقصى ٧٢rem (١١٥٢px) في النص، و [[margin-inline: auto]] و [[padding-inline]] logical: بيشتغلوا يمين وشمال في RTL و LTR من غير تعديل.
- [[:focus-visible]]: حلقة الـ focus تظهر للكيبورد بس (مش لما تضغط بالماوس)، بلون البراند و ٣ بكسل وبعيدة ٣ بكسل عن العنصر، لكل عنصر في الصفحة مرة واحدة.
- [[[id] { scroll-margin-top: ... }]]: أي عنصر ليه id، لما تقفز له، بيقف تحت الـ header مش وراه (التفاصيل في الخطوة الجاية).
- [[.sr-only]]: بيخفي الكلام من الشاشة بس قارئ الشاشة بيقراه (هنستخدمه للـ legend بتاع الأسعار). [[clip-path: inset(50%)]] بيقص العنصر لحد ما ميفضلش منه حاجة، وده الأحدث من [[clip: rect(0 0 0 0)]].
- [[.skip]]: الـ skip link فوق في الركن ([[inset-inline-start]] = يمين في RTL)، ومتزحلق لفوق بره الشاشة بـ [[translate: 0 -200%]]، ولما ياخد focus بيرجع. [[translate]] لوحدها (من غير [[transform:]]) خاصية جديدة بتتحرك من غير ما تمسح أي [[transform]] تاني.

---

## الغلطات اللي حصلت في الخطوة دي

| الغلطة | اتمسكت إزاي | الرقم قبل | التصليح | الرقم بعد |
|---|---|---|---|---|
| الثيم في [[site.js]] بـ [[defer]] | [[perf.mjs]] والصور متأخرة | الثيم عند ٤٨٤ms وأول رسمة ٤٦٤ms (وميض) | [[theme.js]] في الـ head من غير defer | الثيم عند ٣٥٨–٣٦٧ms قبل أول رسمة |
| الوضع الغامق متجاهل إعداد الجهاز | Chrome بـ [[colorScheme: "dark"]] | الخلفية [[rgb(251, 247, 242)]] | [[light-dark()]] و [[color-scheme]] | [[rgb(22, 17, 13)]] من غير JS |
| [[--muted]] فاتح زيادة | axe و [[contrast.mjs]] | ٣٫٨٥، و ١٠ عناصر | [[#6b5c50]] | ٦٫٤٢، وصفر عناصر |
| البراند تحت نص أبيض | [[contrast.mjs]] | ٤٫١٨ | [[#a3501f]] | ٥٫٦٤ |

---

## خلاصة

- كل قيمة في [[tokens.css]] باسم وظيفتها، وكل لون فيه الوضعين في سطر واحد بـ [[light-dark()]]، والـ [[@supports]] بيحمي المتصفحات القديمة.
- الثيم المحفوظ يتقري في سكربت صغير في الـ head من غير defer، والباقي module.
- التباين بيتقاس لكل زوج مستخدم فعلًا، بسكربت بيقع في الـ CI.
- العربي: خطوط الجهاز، و [[line-height]] أكبر، ومفيش [[letter-spacing]]، والأرقام والإيميل جوه [[bdi]] أو [[dir="ltr"]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها [[:root { color-scheme: light dark; --bg: light-dark(white, black); }]] و [[.card { color-scheme: dark; background: var(--bg); }]]. الجهاز على الفاتح: خلفية الكارت هتبقى إيه؟ وخلفية الصفحة؟ جرّب.`, done: R`كتبت توقعك، وجرّبت: الكارت أسود والصفحة بيضا، لأن [[light-dark()]] بتتحل حسب [[color-scheme]] على العنصر اللي بيستخدمها مش على المكان اللي اتعرّف فيه المتغير. وعرفت إن ده بيخليك تعمل قسم غامق جوه صفحة فاتحة بسطر واحد.` },
            { lvl: 'تطبيق', t: R`**ابني:** ثيم تالت «ورقي» (بيج ونص بني) بـ [[data-theme="paper"]]. فكّر: [[light-dark()]] فيها قيمتين بس، فهتعمل التالت إزاي من غير ما تكرر كل الـ tokens؟`, done: R`الثيم التالت بيعيد تعريف الـ tokens اللي بتتغيّر بس في [[:root[data-theme="paper"]]] (مع [[color-scheme: light]])، والزرار بيلف على التلاتة، و [[contrast.mjs]] فيه [[paper]] كتالت ثيم وكل الأزواج OK.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ده سكربت الثيم في الـ head: [[<script defer src="theme.js"></script>]] وجواه [[const t = localStorage.getItem("theme"); document.documentElement.dataset.theme = t;]]. لقيله ٣ مشاكل، وصلّحهم، وأثبت بـ [[perf.mjs]].`, done: R`المشاكل: [[defer]] (وميض، ثبّته بالقياس والصور متأخرة)، ومفيش try/catch، وبيكتب أي قيمة حتى [[null]] (فـ [[data-theme="null"]] لو مفيش حاجة محفوظة). وبعد التصليح [[perf.mjs]] بيقول [[before first paint]] في الظرفين.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** خد ٥ ألوان من أي موقع بتحبه (DevTools › Elements › Computed › color و background-color للنص الثانوي والزراير)، وحطهم في [[contrast.mjs]] كثيم تالت. كام زوج واقع؟`, done: R`عندك جدول بالأزواج الخمسة ونسبهم، ولكل واحد تحت ٤٫٥ اقترحت لون أغمق أو أفتح بأقل تغيير يعدّي (جرّب بـ [[ratio()]] لحد ما يعدّي) وكتبت النسبة الجديدة.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[fixContrast(fg, bg, target = 4.5)]]: بتغمّق أو تفتّح [[fg]] بخطوات صغيرة (مثلًا امزجه مع أسود أو أبيض ٢٪ كل مرة) لحد ما النسبة توصل للهدف، وترجع اللون الجديد. جرّبها على [[#8f7f72]] على [[#ffffff]].`, done: R`[[fixContrast("#8f7f72", "#ffffff")]] بترجع لون نسبته بين ٤٫٥ و ٤٫٦ (مش أغمق من اللازم)، وبتشتغل للاتجاهين (نص فاتح على خلفية غامقة بتفتّحه)، وكتبت ٣ اختبارات ليها.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN عن [[light-dark()]] اعرف: بتقبل غير الألوان (زي صورتين أو طولين)؟ ولو [[color-scheme: normal]] على الـ root، هترجع أنهي قيمة؟`, done: R`كتبت الإجابتين ومعاهم رابط الصفحة ونسخة المتصفح اللي جرّبت عليها، وجرّبت إجابة التانية بإيدك: [[color-scheme: normal]] على الـ root والجهاز غامق، وشوفت أنهي قيمة رجعت في Computed.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const rows = [["v1 muted on surface", "#8f7f72", "#ffffff"], ["v1 brand-ink on brand", "#ffffff", "#c0622f"], ["final muted on surface", "#6b5c50", "#ffffff"], ["final brand-ink on brand", "#ffffff", "#a3501f"], ["dark muted on surface", "#b5a698", "#211912"], ["brand on ink", "#a3501f", "#1f1712"]];
for (const [label, fg, bg] of rows) { const r = ratio(fg, bg); console.log(label + " " + r.toFixed(2) + " " + (r >= 4.5 ? "OK" : "FAIL")); }`, expect: [R`v1 muted on surface 3.86 FAIL`, R`v1 brand-ink on brand 4.18 FAIL`, R`final muted on surface 6.42 OK`, R`final brand-ink on brand 5.64 OK`, R`dark muted on surface 7.32 OK`, R`brand on ink 3.13 FAIL`] },
          ],
        },
        {
          cmd: "landing page: الـ header والـ hero",
          title: "header لازق وزجاجي ليه fallback، وقايمة موبايل بـ aria-expanded و Esc، و hero بصورة مبتعملش layout shift",
          learn: R`تبني أول شاشة يشوفها الزائر: header فوق دايمًا وشفاف وبيتقري في الوضعين، وقايمة موبايل بتتفتح وتتقفل صح بالكيبورد، و hero عنوانه بيكبر مع الشاشة وصورته محجوز مكانها.`,
          out: R`الـ header والـ hero في [[index.html]]، والأجزاء ٢ و ٣ و ٤ و ١٠ من [[site.css]]، والجزء ٢ من [[site.js]]. والقياس: القايمة مقفولة على ٣٦٠ لحد ما تتضغط، و CLS صفر والصور متأخرة ١٫٥ ثانية.`,
          desc: R`أول شاشة هي اللي بتقرر الزائر هيكمل ولا لأ. هنا بنبني الـ **header**: لازق فوق بـ [[position: sticky]]، وخلفيته زجاجية بـ [[backdrop-filter]] ولونها من الـ tokens (فبتشتغل في الغامق)، وليه fallback بـ [[@supports]]، وعلى الموبايل الروابط بتستخبى ورا زرار «القايمة» عليه [[aria-expanded]] و [[aria-controls]] و Esc بيقفلها ويرجّع الـ focus. وبعده الـ **hero**: عنوان بـ [[clamp()]]، وزرارين، وصورة بـ [[<picture>]] و [[srcset]] و [[sizes]] و [[width]] و [[height]] و [[fetchpriority="high"]].

النسخة الأولى كان فيها ٥ غلطات حقيقية، وكل واحدة اتمسكت برقم:
• القايمة كانت مكتوب عليها [[hidden]] والـ CSS بيقول [[display: flex]]، فعلى ٣٦٠ كانت **مفتوحة على طول** (٢٢٦ بكسل فوق الصفحة) لأن [[display]] في الـ CSS بيغلب [[hidden]].
• خلفية الـ header كانت [[rgb(251 247 242 / .72)]] ثابتة، ففي الغامق النص الفاتح بقى على زجاج فاتح: axe قال تباين **١٫٦٦**.
• صورة الـ hero من غير [[width]] و [[height]]: لما الصورة اتأخرت ١٫٥ ثانية الـ CLS كان **٠٫٠٩٥٧** على ٣٦٠ و **٠٫٠٥٥٥** على ١٤٤٠. بعد المقاس: **صفر**.
• [[const top = ...]] في سكربت عادي وقّع الملف كله بـ [[Identifier 'top' has already been declared]]، لأن [[window.top]] موجود أصلًا.
• زرار «اشترك» كان المفروض يستخبى على الموبايل، بس قاعدة [[.btn]] جت **بعد** الـ media query في الملف وغلبتها، فعلى ٣٢٠ الصفحة بقت أعرض من الشاشة بـ ٣١ بكسل.`,
          example: R`.top { position: sticky; top: 0; z-index: var(--z-header); }
.top { background: color-mix(in srgb, var(--bg) 78%, transparent); backdrop-filter: blur(14px); }
@supports not (backdrop-filter: blur(1px)) { .top { background: var(--bg); } }
.js .top.open .nav-links { display: flex; }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
<img src="img/hero-1200.jpg" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة سادة على طبق">`,
          lines: [
            R`الـ header بيمشي مع الصفحة لحد ما يوصل لأول الشاشة ([[top: 0]]) ويلزق هناك، وطبقته من token ([[100]]) عشان ميتغطاش بكروت فيها [[transform]].`,
            R`خلفية من لون الصفحة بشفافية ٧٨٪ بـ [[color-mix()]] (فبتتقلب مع الثيم لوحدها)، و [[backdrop-filter: blur(14px)]] بيغبّش اللي وراه فالنص يتقري.`,
            R`لو المتصفح مبيدعمش [[backdrop-filter]]، الخلفية تبقى معتمة بلون الصفحة، لأن الشفاف من غير blur بيخلّي الكلام فوق كلام.`,
            R`على الموبايل الروابط مستخبية، وبتظهر بس لما الـ header عليه class [[open]] (الزرار بيحطها)، وبس لو الـ JS شغال ([[.js]]).`,
            R`العنوان بيكبر مع عرض الشاشة: [[2rem]] على الأقل (٣٢px)، و [[3.6rem]] أقصى حاجة، وفي النص [[1.2rem + 4vw]] بيتغيّر بنعومة.`,
            R`الصورة ليها [[width]] و [[height]] (النسبة ٤:٣) فالمتصفح بيحجز مكانها قبل ما تيجي، و [[fetchpriority="high"]] بيقدّمها على الصور التانية، و [[alt]] بيوصف اللي فيها.`,
          ],
          try: R`ابني الـ header والـ hero من الشرح. افتح الصفحة على Device Toolbar بعرض ٣٦٠: القايمة لازم تبقى مقفولة. دوس Tab لحد زرار «القايمة» و Enter، وبعدين Tab جوه الروابط، و Esc. فين الـ focus؟ وبعدين اقفل الـ JS (DevTools › Settings › Debugger › Disable JavaScript) واعمل refresh: الروابط بتبان؟ وفي الآخر شغّل السيرفر بـ [[SLOW_IMG=1500]] وامسح [[width]] و [[height]] من الصورة وشوف الـ CLS في Performance.`,
          sol: R`القايمة مقفولة ([[aria-expanded="false"]] وصفر روابط ظاهرة)، و Enter بيفتحها ([[true]] و ٤ روابط)، و Esc بيقفلها والـ focus بيرجع على زرار «القايمة» (اتقاس: [[{"expanded":"false","shown":0,"focus":"menu-btn"}]]). ومن غير JS الروابط الأربعة ظاهرة جنب بعض (لأن كل قواعد الإخفاء متعلّقة بـ [[.js]]) والزرار مستخبي. ومن غير [[width]] و [[height]] والصور بطيئة، Performance بيورّي Layout shift لما الصورة توصل، و [[perf.mjs]] بيقول [[CLS 0.0957]] على ٣٦٠.`,
          flag: "script",
          deep: {
            why: R`الـ header اللازق بيخلّي الـ CTA («اشترك») والـ nav موجودين في أي مكان في الصفحة الطويلة. بس هو كمان أكتر حتة بتتكسر: بيغطي العناوين لما تقفز، وبيبقى مش مقروء في الغامق، والقايمة على الموبايل بتتقفل بالماوس بس. والـ hero هو أكبر حاجة في أول شاشة، فصورته غالبًا هي الـ LCP، ولو مكانها مش محجوز كل اللي تحتها بيتنطط لما توصل، والزائر بيضغط على حاجة غلط.`,
            how: R`[[position: sticky]] بيخلّي العنصر عادي لحد ما يوصل لـ [[top: 0]] في الـ scroll container بتاعه، وبعدين يلزق. أي أب فيه [[overflow: hidden]] أو [[auto]] بيبقى هو الـ scroll container فالـ sticky يبطّل (عشان كده الـ footer بـ [[overflow: clip]] مش hidden). [[backdrop-filter]] بيطبّق الـ blur على اللي **ورا** العنصر، فلازم الخلفية تبقى شفافة. [[hidden]] attribute ستايله في المتصفح [[display: none]] بأقل أولوية، فأي [[display]] تكتبه انت بيغلبه، وده اللي كسّر القايمة. والصورة: لما [[width]] و [[height]] مكتوبين، المتصفح بيحسب [[aspect-ratio]] منهم قبل ما يحمّل، ومع [[height: auto]] في الـ CSS الصورة بتاخد عرض العمود وطول متحسوب. و [[srcset]] بيقول الملفات المتاحة بعرضها ([[600w]])، و [[sizes]] بيقول الصورة هتتعرض بكام ([[50vw]] على الديسكتوب و [[100vw]] على الموبايل)، فالمتصفح بيختار أصغر ملف كفاية: على ٣٦٠ اتحمّل [[hero-600.webp]] (١٠ كيلو) وعلى ١٤٤٠ [[hero-1200.webp]] (٢٢ كيلو).`,
            when: R`أي صفحة طويلة فيها nav. والقايمة بالشكل ده (زرار بيظهر/يخفي لستة روابط) مناسبة لحد ٦ أو ٧ روابط؛ لو أكتر أو فيها قوايم فرعية، استخدم [[<dialog>]] أو popover (وحدة «widgets و scroll»). والـ glass مناسب لو تحته محتوى بيتحرك؛ لو الصفحة كلها لون واحد، خلفية معتمة أبسط وأخف.`,
            mistakes: R`[[hidden]] مع [[display]] في الـ CSS. أو تعمل القايمة [[position: fixed]] وتنسى [[inert]] أو الكيبورد بيروح وراها. أو تخفي الروابط بـ [[opacity: 0]] (بتفضل بتاخد Tab). أو [[z-index: 9999]]. أو صورة الـ hero [[loading="lazy"]] (بتتأخر لأنها أهم صورة). أو [[sizes]] غلط فالموبايل ينزّل ١٢٠٠. أو [[overflow-x: hidden]] على [[body]] عشان تخفي overflow، فالـ sticky يبطّل. أو تحط الـ media queries في نص الملف فقاعدة بعدها تغلبها.`
          },
          teach: R`## الـ header

~~~html index.html (الـ header)
<header class="top">
  <div class="wrap top-row">
    <a class="logo" href="#hero" aria-label="محمصة حبّة، الرئيسية">حبّة</a>
    <nav class="nav" aria-label="الرئيسية">
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">القايمة</button>
      <ul id="nav-links" class="nav-links">
        <li><a href="#features">ليه حبّة</a></li>
        <li><a href="#reviews">آراء</a></li>
        <li><a href="#pricing">الأسعار</a></li>
        <li><a href="#faq">أسئلة</a></li>
      </ul>
    </nav>
    <button class="theme-btn" type="button" aria-pressed="false">الوضع الغامق</button>
    <a class="btn btn-primary top-cta" href="#signup">اشترك</a>
  </div>
</header>
~~~

- اللوجو لينك لأول الصفحة و [[aria-label]] بيدّيله اسم كامل («محمصة حبّة، الرئيسية») بدل كلمة «حبّة» لوحدها.
- زرار القايمة **جوه** الـ nav وقبل اللستة: لما اليوزر يفتحها، أول Tab بعد الزرار بيدخل في الروابط على طول. [[aria-controls="nav-links"]] بيقول الزرار ده بيتحكم في العنصر اللي الـ id بتاعه [[nav-links]]، و [[aria-expanded]] بيقول هي مفتوحة ولا لأ.
- مفيش [[hidden]] على اللستة في الـ HTML: لو الـ JS وقع، الروابط ظاهرة. الإخفاء في الـ CSS بس وبشرط [[.js]].
- كل [[<button>]] عليه [[type="button"]]: الزرار من غير type جوه form بيبقى submit، ومش جوه form مش فارقة بس الـ lint بيطلبها عشان العادة.

~~~css css/site.css (٢ و ٣)
/* ٢. الـ header: لازق فوق وزجاجي */
.top { position: sticky; top: 0; z-index: var(--z-header); background: color-mix(in srgb, var(--bg) 78%, transparent); -webkit-backdrop-filter: saturate(1.4) blur(14px); backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid var(--line); }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .top { background: var(--bg); } }
.top-row { display: flex; align-items: center; gap: 16px; min-height: var(--nav-h); }
.logo { font-weight: 800; font-size: 1.5rem; text-decoration: none; color: var(--brand); margin: 0; }
.nav { margin-inline-start: auto; }
.nav-links { display: flex; flex-wrap: wrap; gap: 4px 24px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding-block: 10px; text-decoration: none; }
.nav-links a:hover { color: var(--brand); }
.menu-btn, .theme-btn { font: inherit; background: none; border: 1px solid var(--line); color: var(--ink); border-radius: 999px; min-height: 44px; padding: 6px 16px; cursor: pointer; }
.menu-btn { display: none; }

/* ٣. الأزرار: الـ variant بيغيّر متغيرين بس */
.btn { --b-bg: var(--surface); --b-fg: var(--ink); display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 10px 22px; border-radius: 999px; border: 1px solid transparent; background: var(--b-bg); color: var(--b-fg); font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; transition: translate .2s var(--ease), box-shadow .2s var(--ease); }
.btn:hover { translate: 0 -2px; }
.btn-primary { --b-bg: var(--brand); --b-fg: var(--brand-ink); box-shadow: 0 10px 24px -12px var(--brand); }
.btn-ghost { --b-bg: transparent; border-color: var(--line); }
.btn-light { --b-bg: var(--cta-ink); --b-fg: var(--cta-bg); }
~~~

### الـ header سطر سطر

- [[color-mix(in srgb, var(--bg) 78%, transparent)]]: بيخلط لون الخلفية مع شفاف، فالنتيجة نفس اللون بـ ٧٨٪ opacity. ولأن [[--bg]] نفسه [[light-dark()]]، الزجاج فاتح في الفاتح وغامق في الغامق. ده التصليح لغلطة الـ ١٫٦٦.
- [[saturate(1.4) blur(14px)]]: الـ blur بيغبّش اللي ورا، و [[saturate]] بيزوّد الألوان اللي بتبان من ورا الزجاج عشان ميبقاش رمادي باهت. و [[-webkit-backdrop-filter]] لنسخ Safari قبل ١٨.
- [[@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))]]: الشرط بيتحقق لو المتصفح **مبيفهمش ولا واحدة** منهم. ساعتها الخلفية معتمة.
- [[.nav { margin-inline-start: auto; }]]: في flex، الـ margin الـ auto بياخد كل المسافة الفاضية، فالـ nav والزراير اللي بعده بيروحوا للناحية التانية من اللوجو. [[inline-start]] = يمين في RTL، فالمسافة يمين الـ nav يعني بينه وبين اللوجو.
- [[flex-wrap: wrap]] و [[gap: 4px 24px]]: لو الروابط كتير على تابلت ضيق بتنزل سطر تاني بدل ما تطلع بره، والـ gap الأول بين السطور والتاني بين الروابط.
- [[.nav-links a { display: block; padding-block: 10px; }]]: اللينك نفسه أطول (٤٤ بكسل تقريبًا مع الخط)، فالمساحة اللي تتضغط أكبر من الكلمة.
- [[min-height: 44px]] للزراير: أقل مساحة لمس مريحة (WCAG 2.2 بيطلب ٢٤ على الأقل، و ٤٤ هو الرقم الشائع من إرشادات iOS).

### الأزرار: variant = متغيرين

[[.btn]] بيقرا [[--b-bg]] و [[--b-fg]]، وكل variant بيغيّرهم بس: [[.btn-primary]] بيحطهم براند، و [[.btn-ghost]] شفاف بحدود. فمفيش variant بيكرر [[padding]] و [[border-radius]] و [[font]]. و [[translate: 0 -2px]] في الـ hover بيرفع الزرار ٢ بكسل من غير ما يلمس [[transform]]. و [[font: inherit]] لأن الـ button والـ input مبيورثوش الخط لوحدهم.

---

## قايمة الموبايل

~~~css css/site.css (١٠: آخر الملف)
/* ١٠. المقاسات: في آخر الملف عشان تغلب اللي فوق */
@media (min-width: 960px) {
  .hero-grid { grid-template-columns: 1.05fr .95fr; }
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
@media (max-width: 760px) {
  .js .menu-btn { display: inline-block; }
  .js .nav-links { display: none; position: absolute; inset-inline: 0; top: 100%; flex-direction: column; gap: 0; padding: 8px var(--gutter) 16px; background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: var(--shadow); }
  .js .top.open .nav-links { display: flex; }
  .top-cta { display: none; }
}
~~~

~~~javascript js/site.js (٢)
// ٢. قايمة الموبايل: aria-expanded، و Esc بيقفل ويرجّع الـ focus للزرار
const header = document.querySelector(".top");
const menuBtn = document.querySelector(".menu-btn");
const setMenu = (open) => {
  header.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
document.getElementById("nav-links").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
});
matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
~~~

- [[.js .nav-links { display: none; position: absolute; ... top: 100%; }]]: تحت ٧٦٠ الروابط مستخبية، ولما تظهر بتبقى لوحة تحت الـ header بالظبط ([[top: 100%]] من الـ header لأنه أقرب أب positioned، و sticky بيتحسب positioned). [[inset-inline: 0]] = من الحافة للحافة.
- [[.js .top.open .nav-links { display: flex; }]]: specificity أعلى من اللي قبلها (٣ classes)، فبتغلبها لما [[open]] تتحط.
- [[header.classList.toggle("open", open)]]: التاني [[true]] أو [[false]] بيقول حط أو شيل، مش «اقلب».
- [[String(open)]]: [[aria-expanded]] قيمته نص [["true"]] أو [["false"]]، و [[setAttribute]] بيحوّل أي حاجة نص، بس بنكتبها صريحة.
- الضغط على أي لينك بيقفل القايمة: [[e.target.closest("a")]] بيلاقي اللينك حتى لو الضغطة على حاجة جواه. وده event واحد على اللستة بدل واحد لكل لينك (event delegation).
- Esc: بيقفل **ويرجّع الـ focus للزرار**، عشان اليوزر ميتوهش (الـ focus كان على لينك اختفى).
- [[matchMedia("(min-width: 761px)")]]: لو الشاشة كبرت والقايمة مفتوحة (تابلت اتلف)، بنقفلها عشان [[aria-expanded]] ميفضلش [[true]] والقايمة مش ظاهرة.

### القياس على ٣٦٠

~~~text قبل الضغط، وبعده، و Tab + Esc، وبعد لينك
start       {"expanded":"false","shown":0,"focus":"BODY"}
after click {"expanded":"true","shown":4,"focus":"menu-btn"}
Tab+Esc     {"expanded":"false","shown":0,"focus":"menu-btn"}
link click  {"expanded":"false","shown":0,"focus":"BODY"}
~~~

ولو الـ JS وقع (اتقاس بإن طلبات [[*.js]] اتمنعت): الـ ٤ روابط ظاهرة.

### الغلطة: [[hidden]] والـ CSS

النسخة الأولى كانت [[<ul id="nav-links" class="nav-links" hidden>]] والـ JS بيعمل [[links.hidden = !open]]. والنتيجة على ٣٦٠:

~~~text النسخة الأولى على ٣٦٠
{ hidden: true, display: 'flex', h: 226, coversH1: 'menu on top of page' }
~~~

[[hidden]] بيقول [[true]] بس [[display]] المحسوب [[flex]]، والقايمة ٢٢٦ بكسل فوق أول الصفحة. السبب: المتصفح بيترجم [[hidden]] لـ [[display: none]] في ستايلات المتصفح نفسه، و [[.nav-links { display: flex; }]] بتاعتك أقوى منها. والغريب إن على الديسكتوب «اشتغلت» (الروابط ظاهرة زي ما احنا عايزين) بالصدفة لنفس السبب. الحلين: [[[hidden] { display: none !important; }]] في أول الـ CSS، أو (اللي عملناه) منستخدمش [[hidden]] هنا خالص ونخلّي الـ CSS هو اللي يقرر حسب class.

### الغلطة: [[const top]]

أول نسخة من [[site.js]] كانت سكربت عادي بـ [[defer]] وفيها [[const top = document.querySelector(".top");]]. الـ Console:

~~~text
Identifier 'top' has already been declared
~~~

وولا سطر في الملف اشتغل (لا زرار الثيم ولا القايمة). في السكربت العادي، المتغيرات اللي بره أي function بتبقى في الـ scope العام، و [[window.top]] (الـ window اللي فوق لو الصفحة جوه iframe) موجود ومينفعش يتعرّف تاني. نفس الكلام مع [[name]] و [[status]] و [[parent]]. الحل اللي عملناه: كل الـ JS بقى [[<script type="module">]] (كل ملف ليه scope لوحده، وبيستنى زي [[defer]])، وسمّينا المتغير [[header]]. والـ module كمان صلّح غلطة تانية: [[form.js]] كان فيه [[export]] ووقع بـ [[Unexpected token 'export']].

بس الـ module ليه تمن: الصفحة مبقتش تشتغل لو فتحت [[index.html]] بدبل كليك (من [[file://]]):

~~~text Console على file://
Access to script at 'file:///C:/Users/you/habba-landing/js/site.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

فلازم سيرفر ([[npm run serve]])، وده كده كده اللي هيحصل على GitHub Pages.

---

## الـ hero

~~~html index.html (الـ hero)
<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow">تحميص كل خميس</p>
      <h1 id="hero-title">بن طازة <span class="accent">يوصلك</span> قبل ما يبرد حماسك</h1>
      <p class="lead">بنحمّص على دفعات صغيرة، ونبعتلك الكيس في خلال ٤٨ ساعة من التحميص. اختار التحميصة والطحنة، وغيّرهم أو وقّف في أي وقت.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#signup">ابدأ اشتراكك</a>
        <a class="btn btn-ghost" href="#pricing">شوف الأسعار</a>
      </div>
    </div>
    <picture class="hero-pic">
      <source type="image/webp" srcset="img/hero-600.webp 600w, img/hero-1200.webp 1200w" sizes="(min-width: 960px) 50vw, 100vw">
      <img src="img/hero-1200.jpg" srcset="img/hero-600.jpg 600w, img/hero-1200.jpg 1200w" sizes="(min-width: 960px) 50vw, 100vw" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة سادة على طبق، وحواليه حبات بن محموصة">
    </picture>
  </div>
</section>
~~~

~~~css css/site.css (٤)
/* ٤. الـ hero */
.hero { padding-block: clamp(40px, 7vw, 96px); background: radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%), radial-gradient(50% 60% at 10% 90%, var(--alt), transparent 70%); }
.hero-grid { display: grid; gap: 40px; align-items: center; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 2px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: .875rem; color: var(--muted); background: var(--surface); }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--brand); }
h1 { font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); }
.accent { color: var(--brand); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 36rem; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.hero-pic img { border-radius: var(--r-lg); box-shadow: var(--shadow); }
~~~

### سطر سطر

- [[aria-labelledby="hero-title"]] على الـ section: بيدّيه اسم من الـ h1، فيبقى [[region]] في شجرة الـ accessibility (من غير اسم الـ section مبيبقاش landmark).
- الـ eyebrow: سطر صغير فوق العنوان بنقطة بلون البراند ([[::before]] بـ [[content: ""]] و [[border-radius: 50%]]). [[inline-flex]] عشان ياخد عرض كلامه بس.
- [[<span class="accent">]] حوالين كلمة «يوصلك» بلون البراند. منستخدمش gradient text على العربي ([[background-clip: text]]): على خط متصل بيبان متقطع في بعض الخطوط.
- [[radial-gradient(60% 50% at 85% 10%, var(--brand-soft), transparent 70%)]]: بقعة لون بيضاوي (٦٠٪ عرض و ٥٠٪ طول) مركزها فوق على الشمال ([[85%]] من الشمال)، بتبهت لحد ما تبقى شفافة عند ٧٠٪. واتنين فوق بعض بفاصلة = خلفية ناعمة من غير صورة. لاحظ إن [[at 85% 10%]] مش logical: في LTR هتبقى في نفس المكان من الشمال. لو مهم، اعكسها بـ [[:dir(ltr)]].
- [[.hero-grid]] عمود واحد على الموبايل، و ٢ من ٩٦٠ وطالع ([[1.05fr .95fr]]: النص أعرض سنة). في RTL العمود الأول يمين، فالنص يمين والصورة شمال من غير أي تعديل.
- [[<picture>]] و [[<source type="image/webp">]]: المتصفح اللي بيفهم webp بياخد الـ source، والقديم بياخد [[<img>]] (jpg). و [[sizes]] نفسه في الاتنين.
- [[width="1200" height="900"]]: النسبة بس اللي مهمة (٤:٣)، والـ CSS ([[max-width: 100%; height: auto]]) بيصغّرها.
- [[fetchpriority="high"]]: الصورة دي أهم صورة في أول شاشة. ومفيش [[loading="lazy"]] عليها أبدًا.

### القياس: CLS والصورة متأخرة

[[perf.mjs]] على السيرفر بـ [[SLOW_IMG=1500]] (الصور بتتأخر ١٫٥ ثانية، والـ HTML والـ CSS عادي):

| النسخة | العرض | CLS | العناصر اللي اتحركت |
|---|---|---|---|
| من غير [[width]] و [[height]] | ٣٦٠ | ٠٫٠٩٥٧ | [[SECTION.block]] و [[P.eyebrow]] |
| من غير [[width]] و [[height]] | ١٤٤٠ | ٠٫٠٥٥٥ | [[SECTION.block]] و [[PICTURE.hero-pic]] |
| بـ [[width]] و [[height]] | ٣٦٠ و ١٤٤٠ | ٠٫٠٠٠٠ | ولا حاجة |

نفس القياس على السيرفر العادي كان صفر للنسختين، لأن الصورة (١٠ كيلو) وصلت قبل أول رسمة. يعني «جرّبتها ومفيش حاجة بتتنطط» على جهازك وشبكتك مش دليل؛ أبطأ شبكة هي اللي بتقول.

### جرّبنا preload ومفرقش

فكرة شائعة: [[<link rel="preload" as="image" imagesrcset="..." fetchpriority="high">]] في الـ head يخلّي الصورة تيجي أبدر. اتقاس ٣ مرات على ٣٦٠: من غيره LCP ١٠٧٦–١١١٢ms، ومعاه ١١١٢–١١٣٦ms. مفرقش (أو أسوأ سنة) لأن الصورة مكتوبة في الـ HTML نفسه والمتصفح بيلاقيها بدري (الـ preload scanner)، والـ preload بيفيد لما الصورة مخبية: background في CSS، أو بتتحط بـ JS. فشلناه.

### الغلطة: ترتيب الـ media queries

أول نسخة من الـ CSS كان فيها الـ media query بتاع الـ header **جنب** الـ header، قبل قسم الأزرار:

~~~css النسخة الأولى (بالترتيب ده في الملف)
@media (max-width: 760px) { .top-cta { display: none; } }
/* ... */
.btn { display: inline-flex; /* ... */ }
~~~

[[.top-cta]] و [[.btn]] نفس الـ specificity (class واحدة)، فاللي **بعد** في الملف يكسب، والـ media query مش بتدّي أولوية. فزرار «اشترك» فضل ظاهر على الموبايل، وعلى ٣٢٠ الـ header بقى أعرض من الشاشة. [[matrix.mjs]] (درس «مصفوفة المقاسات والأداء») طبع:

~~~text
320   BROKEN +31px  a.btn.btn-primary.top-cta 90px | article.plan 320px | ...
~~~

التصليح: كل الـ media queries في آخر الملف (القسم ١٠)، فبتيجي بعد كل القواعد العادية. وده كمان بيخلّيك تشوف كل «المقاسات» في مكان واحد.

---

## الغلطات اللي حصلت في الخطوة دي

| الغلطة | اتمسكت إزاي | قبل | بعد |
|---|---|---|---|
| [[hidden]] مع [[display: flex]] | سكربت على ٣٦٠ | القايمة مفتوحة، ٢٢٦px فوق الصفحة | مقفولة لحد الضغط |
| خلفية الـ header ثابتة فاتحة | axe في الغامق | تباين ١٫٦٦ على لينكات الـ nav | صفر violations |
| [[const top]] في سكربت عادي | Console | [[Identifier 'top' has already been declared]] | module، ومتغير اسمه [[header]] |
| صورة من غير مقاس | [[perf.mjs]] والصور بطيئة | CLS ٠٫٠٩٥٧ | صفر |
| media query قبل [[.btn]] | [[matrix.mjs]] على ٣٢٠ | +٣١px | صفر |

---

## خلاصة

- sticky + خلفية من الـ tokens بـ [[color-mix()]] + [[@supports]] للـ blur = header بيتقري في الوضعين وفي المتصفحات القديمة.
- القايمة: زرار بـ [[aria-expanded]] و [[aria-controls]]، والإخفاء بـ class في الـ CSS بشرط [[.js]]، و Esc بيقفل ويرجّع الـ focus.
- [[hidden]] بيخسر قدام أي [[display]] بتكتبه.
- صورة الـ hero: [[width]] و [[height]] و [[srcset]] و [[sizes]] و [[fetchpriority="high"]]، ومن غير lazy، والقياس بصور متأخرة.
- الـ media queries في آخر الملف.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<p hidden class="note">مرحبا</p>]] و [[.note { display: block; }]]. الفقرة هتبان؟ و [[document.querySelector(".note").hidden]] هيرجّع إيه؟ جرّب، وبعدين زوّد [[[hidden] { display: none !important; }]].`, done: R`توقعت صح إنها هتبان و [[hidden]] لسه [[true]]، وبعد القاعدة اختفت. وكتبت ليه: ستايل المتصفح لـ [[hidden]] أضعف من أي قاعدة بتكتبها.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** header بـ [[position: sticky; top: 0]] ومش لازق خالص. الأب [[<div class="page" style="overflow: hidden">]]. لقيت ليه من Computed، وصلّحه من غير ما تشيل الـ overflow الأفقي اللي الـ page محتاجه.`, done: R`لقيت إن [[overflow: hidden]] على الأب عمله scroll container فالـ sticky لازق جوه الـ div مش في الصفحة، وبدّلته بـ [[overflow-x: clip]] (بيقص من غير ما يعمل scroll container) والـ header لزق، وأثبت بـ [[getBoundingClientRect().top]] = ٠ بعد سكرول ١٠٠٠.` },
            { lvl: 'تطبيق', t: R`**ابني:** خلّي الـ header يتغيّر بعد أول ٨٠ بكسل سكرول: ظل أوضح وارتفاع أقل (٥٦ بدل ٦٤). من غير scroll listener: استخدم [[IntersectionObserver]] على عنصر [[<div class="sentinel">]] فوق الصفحة.`, done: R`الـ header بياخد class [[scrolled]] لما الـ sentinel يخرج من الشاشة ويشيلها لما يرجع، ومفيش [[addEventListener("scroll")]] في الكود، و [[--nav-h]] اتغيّر بالـ class فالـ [[scroll-margin-top]] لسه مظبوط (القفز للأقسام الـ h2 تحت الـ header).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل السيرفر بـ [[SLOW_IMG=1500]] وقيس الـ CLS بـ ٣ نسخ من الصورة: من غير مقاس، وبـ [[width]] و [[height]]، ومن غير مقاس بس [[aspect-ratio: 4 / 3]] في الـ CSS على [[.hero-pic img]]. على ٣٦٠ و ١٤٤٠.`, done: R`جدول ٦ أرقام من [[perf.mjs]]، والنسختين التانية والتالتة صفر، وكتبت ليه الـ HTML أحسن (المتصفح بيعرفه قبل ما الـ CSS يوصل، والـ CSS ممكن يتأخر).` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** سكربت Playwright بيفتح الصفحة على ٣٦٠ ويتأكد من ٥ حاجات: القايمة مقفولة، و Enter على الزرار بيفتحها و [[aria-expanded]] بقى [[true]]، و Esc بيقفلها والـ focus على الزرار، والضغط على لينك بيقفلها، ولما العرض يبقى ١٠٢٤ والقايمة مفتوحة بتتقفل.`, done: R`السكربت بيطبع ٥ PASS على الصفحة النهائية، ولما ترجّع [[hidden]] مع [[display: flex]] أول اختبار بيقع، ولما تشيل [[menuBtn.focus()]] اختبار Esc بيقع.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف إيه الفرق بين [[aria-expanded]] على زرار بيفتح قايمة و [[aria-haspopup="menu"]]، وليه القايمة دي **مش** [[role="menu"]] رغم إن اسمها «القايمة».`, done: R`كتبت إن [[role="menu"]] لقوايم أوامر زي برامج الكمبيوتر وبيغيّر الكيبورد (أسهم بدل Tab)، وإن لستة روابط تنقل جوه nav مش menu، فـ [[aria-expanded]] على زرار عادي كفاية، ومعاك رابط المصدر.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const imgs = {
  v1: '<img src="/img/hero-1200.jpg" srcset="/img/hero-600.jpg 600w, /img/hero-1200.jpg 1200w" alt="فنجان قهوة">',
  final: '<img src="img/hero-1200.jpg" srcset="img/hero-600.jpg 600w, img/hero-1200.jpg 1200w" width="1200" height="900" fetchpriority="high" alt="فنجان قهوة">',
};
for (const [name, tag] of Object.entries(imgs)) {
  const has = (a) => tag.includes(' ' + a + '="');
  const missing = ["alt", "width", "height"].filter((a) => !has(a));
  const lazy = /loading="lazy"/.test(tag);
  const rooted = [...tag.matchAll(/(?:src|srcset)="([^"]+)"/g)].flatMap((m) => m[1].split(",")).filter((u) => u.trim().startsWith("/")).length;
  console.log(name + ": missing=" + (missing.join(",") || "none") + " lazy=" + lazy + " rooted-paths=" + rooted + " high-priority=" + /fetchpriority="high"/.test(tag));
}`, expect: [R`v1: missing=width,height lazy=false rooted-paths=3 high-priority=false`, R`final: missing=none lazy=false rooted-paths=0 high-priority=true`] },
          ],
        },
        {
          cmd: "landing page: المميزات والآراء والأسعار",
          title: "bento بـ grid، وآراء بـ figure و blockquote، وأسعار بتبديل شهري وسنوي بـ :has() من غير JS، والباقة المميزة مقلوبة الألوان",
          learn: R`تبني نص الصفحة اللي بيقنع: شبكة مميزات بأحجام مختلفة من غير ما تكسر الموبايل، وآراء بـ HTML صح، وجدول أسعار بيتبدّل بالكيبورد والماوس من غير ولا سطر JS.`,
          out: R`أقسام المميزات والآراء والأسعار في [[index.html]]، والجزء ٥ و ٦ من [[site.css]]، والجزء ٣ من [[site.js]]. والقياس: السهم في RTL بيبدّل لـ «سنوي» والـ ٣ أسعار اتغيّروا، ومفيش overflow على ٣٢٠.`,
          desc: R`التلات أقسام دول بيردّوا على «ليه انتوا؟» و «حد جرّب؟» و «بكام؟».

• **المميزات (bento):** ٤ كروت في [[grid]]. على الموبايل عمود واحد، ومن ٩٦٠ وطالع ٣ أعمدة: كارت كبير ملون واخد صفين ([[grid-row: span 2]])، وكارتين صغيرين، وكارت عريض واخد عمودين ([[grid-column: span 2]]). اتقاس على ١٢٨٠: الكبير يمين ٣٤٧×٢٨١، والعريض ٧٠٩ بكسل تحت الصغيرين. وفي RTL الكبير بيروح يمين لوحده لأن الـ grid بيمشي مع [[dir]].
• **الآراء:** كل رأي [[<figure>]] فيه [[<blockquote>]] (الكلام) و [[<figcaption>]] (مين قاله) وأفاتار بأول حرف من الاسم [[aria-hidden="true"]] عشان قارئ الشاشة ميقولش «م» قبل «منى».
• **الأسعار:** مجموعة radio («شهري» و «سنوي») في [[<fieldset>]]، والأسعار التلاتة مكتوبين في الـ HTML بالنسختين، والـ CSS بيعرض واحدة بس بـ [[.block:has([value="yearly"]:checked) .price .m { display: none; }]]. الكيبورد شغال ببلاش من الـ radio: Tab للمجموعة، والسهم يبدّل (في RTL السهم الشمال بيروح للي بعده)، واتقاس إن الأسعار بقت [[٢٤٠٠ جنيه / سنة]] و [[٤٤٠٠]] و [[٨٢٠٠]]. والباقة الوسطى مقلوبة الألوان ([[background: var(--ink)]]) وزرارها مقلوب كمان.

غلطة اتمسكت هنا: الأسعار كانت [[minmax(320px, 1fr)]]، وعلى موبايل ٣٢٠ (المساحة ٢٨٨ بعد الـ gutter) كل كارت بقى ٣٢٠ والصفحة أعرض من الشاشة. التصليح [[minmax(min(100%, 280px), 1fr)]].`,
          example: R`.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.big { grid-row: span 2; }
.price .y { display: none; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.featured { background: var(--ink); color: var(--bg); }`,
          lines: [
            R`شبكة أعمدتها بتتحسب لوحدها: كل عمود ٢٤٠ على الأقل ويتمط ([[1fr]])، و [[min(100%, 240px)]] بيمنع العمود يبقى أعرض من الشاشة لو هي أصغر من ٢٤٠.`,
            R`الكارت الكبير بياخد صفين في الطول (على الديسكتوب بس، القاعدة جوه media query في آخر الملف).`,
            R`السعر السنوي مستخبي في الأول، والشهري ظاهر.`,
            R`لو جوه القسم ده فيه radio قيمته [[yearly]] ومتختار، اخفي كل الأسعار الشهري. [[:has()]] بيخلّي الأب يتستايل حسب ابن جواه.`,
            R`ونفس الشرط بيظهر الأسعار السنوي، فمفيش ولا سطر JS بيبدّل الأسعار.`,
            R`الـ radio نفسه شفاف ومش باين، فلما ياخد focus من الكيبورد الحلقة بتترسم على الـ label اللي حواليه بدله.`,
            R`الباقة المميزة: خلفيتها لون النص ونصها لون الخلفية، فبتبان مقلوبة في الوضعين (في الغامق بتبقى فاتحة).`,
          ],
          try: R`ابني الأقسام التلاتة. على عرض ١٢٨٠ شوف الـ bento في DevTools (Elements › الشبكة، وفعّل grid overlay من البادج اللي جنب [[.bento]]): الكبير فين؟ وبعدين Tab لحد «شهري» ودوس السهم الشمال مرة، والسهم اليمين مرة. الأسعار اتغيّرت؟ واقفل الـ JS وكرر. وفي الآخر غيّر [[minmax(min(100%, 280px), 1fr)]] لـ [[minmax(320px, 1fr)]] وشوف ٣٢٠ في Device Toolbar.`,
          sol: R`الـ overlay بيورّي ٣ أعمدة وصفين، والكبير في العمود الأول (يمين) واخد الصفين، والعريض تحت الصغيرين واخد عمودين. السهم الشمال في RTL بيروح لـ «سنوي» والأسعار بقت [[٢٤٠٠ جنيه / سنة]] و [[٤٤٠٠ جنيه / سنة]] و [[٨٢٠٠ جنيه / سنة]]، واليمين بيرجّع شهري، ومن غير JS نفس الكلام بالظبط. وبـ [[minmax(320px, 1fr)]] على ٣٢٠ فيه scroll أفقي، و [[matrix.mjs]] بيقول [[article.plan 320px]] في العناصر الخارجة.`,
          flag: "script",
          deep: {
            why: R`الأقسام دي هي اللي فيها «المعلومة»، والزائر بيقارن فيها. الـ bento بيدّي أهمية مختلفة لكل ميزة (الكبير = الأهم) من غير ما تكتب «الأهم». والآراء من غير HTML صح بتبقى كلام في div محدش يعرف مين قاله. والأسعار لو التبديل فيها معتمد على JS وحصل خطأ في أي سكربت، الزائر يشوف أسعار غلط أو مفيش أسعار خالص في أهم قسم في الصفحة.`,
            how: R`[[repeat(auto-fit, minmax(X, 1fr))]]: المتصفح بيحط أكبر عدد أعمدة كل واحد فيهم X على الأقل، وبيمطّهم لحد ما يملوا. [[auto-fit]] بيلم الأعمدة الفاضية، فلو عندك ٣ كروت بس على شاشة تساع ٤، التلاتة بيتمطوا. و [[min(100%, X)]] جوه [[minmax]] بيحل مشكلة الشاشة الأضيق من X. [[:has()]] selector بيختار العنصر لو جواه حاجة بتطابق، فـ [[.block:has([value="yearly"]:checked)]] = «القسم اللي جواه radio سنوي متختار»، ومنه بننزل لـ [[.price .m]]. والـ radio بيدّي سلوك كيبورد جاهز: Tab بيدخل المجموعة على المتختار، والأسهم بتتحرك بين الاختيارات وبتختار وهي ماشية، و [[name]] واحد بيخلّي اختيار واحد بس. وفي RTL المتصفح بيعكس معنى الأسهم الأفقية.`,
            when: R`bento لما المميزات مش متساوية في الأهمية أو عندك صورة/رسمة لميزة واحدة. والتبديل بـ [[:has()]] لما كل القيم معروفة وقت كتابة الصفحة (٣ باقات ثابتة)؛ لو الأسعار بتتحسب (عملة، أو كوبون، أو عدد مستخدمين) يبقى JS. و [[:has()]] Baseline من ديسمبر ٢٠٢٣ (حسب الوثائق)، فلو المتصفح القديم مبيفهمهوش هيعرض الشهري بس، وده سلوك مقبول.`,
            mistakes: R`[[minmax(320px, 1fr)]] من غير [[min(100%, ...)]] (اتقاس: +٣١px على ٣٢٠ مع غلطة تانية). أو [[body:has(...)]] على الصفحة كلها (أي radio قيمته yearly في أي حتة هيأثر). أو [[display: none]] على الـ radio نفسه (بيخرج من الكيبورد وقارئ الشاشة). أو نص بلون البراند على الكارت المقلوب (٣٫١٣). أو أفاتار بالحرف من غير [[aria-hidden]]. أو [[<div class="quote">]] بدل [[blockquote]]. أو [[grid-template-areas]] بأسامي ثابتة لعدد كروت ممكن يتغيّر.`
          },
          teach: R`## المميزات: bento

~~~html index.html (المميزات)
<section id="features" class="block" aria-labelledby="features-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">ليه حبّة</p><h2 id="features-title">بن بتعرف هو جه منين</h2><p>كل كيس عليه تاريخ التحميص والمزرعة ودرجة التحميص، ومفيش حاجة مستنية على رف.</p></header>
    <div class="bento">
      <article data-reveal class="card big"><h3>طازة بجد</h3><p>بنحمّص يوم الخميس ونشحن السبت. الكيس بيوصلك وعمر البن أقل من ٣ أيام.</p></article>
      <article data-reveal class="card"><h3>طحنة على مقاس جهازك</h3><p>إسبريسو أو فرنساوي أو V60 أو حبوب كاملة.</p></article>
      <article data-reveal class="card"><h3>وقّف وقت ما تحب</h3><p>من غير عقد ومن غير مكالمات، زرار واحد في حسابك.</p></article>
      <article data-reveal class="card wide"><h3>توصيل لحد الباب</h3><p>القاهرة والجيزة في يومين، وباقي المحافظات في ٤ أيام.</p></article>
    </div>
  </div>
</section>
~~~

- [[<header class="sec-head">]] جوه الـ section: رأس القسم (eyebrow وعنوان وسطر). [[header]] جوه [[section]] مش بيبقى banner، فمفيش مشكلة إن فيه أكتر من واحد.
- كل ميزة [[<article>]] و [[h3]]: العناوين بالترتيب h1 ثم h2 ثم h3، وقارئ الشاشة بيقدر يقفز من ميزة للتانية.
- [[data-reveal]]: علامة للظهور مع السكرول (درس «الأسئلة والـ CTA والـ footer والحركة»).

~~~css css/site.css (٥)
/* ٥. الأقسام */
.block { padding-block: var(--space); }
.alt { background: var(--alt); }
.sec-head { max-width: 40rem; margin: 0 auto 40px; text-align: center; }
.sec-head h2 { font-size: clamp(1.6rem, 1.1rem + 2vw, 2.4rem); }
.sec-head p:last-child { color: var(--muted); }

.bento { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 24px; box-shadow: var(--shadow); }
.card p { color: var(--muted); margin: 0; }
.big { background: var(--brand-soft); }
.big p { color: var(--ink); }

.reviews { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); }
.review { margin: 0; background: var(--surface); border-radius: var(--r); padding: 24px; border: 1px solid var(--line); }
.review blockquote { margin: 0 0 16px; font-size: 1.1rem; }
.review blockquote p::before { content: "”"; color: var(--brand); font-size: 2rem; line-height: 0; vertical-align: -.4em; margin-inline-end: 4px; }
.review figcaption { display: flex; align-items: center; gap: 10px; color: var(--muted); }
.avatar { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--brand-soft); color: var(--brand); font-weight: 800; }
~~~

- [[.block]] و [[.alt]]: كل قسم نفس المسافة ([[--space]])، والأقسام اللي بالتبادل خلفيتها [[--alt]]، فالعين بتفصل الأقسام من غير خطوط.
- [[.sec-head]]: [[max-width: 40rem]] عشان السطر ميبقاش طويل يتعب العين، و [[margin: 0 auto 40px]] بيوسّطه ويسيب ٤٠ تحته. [[p:last-child]] = الفقرة اللي في الآخر (الوصف) رمادي، والـ eyebrow ليه ستايله.
- الـ bento: [[auto-fit]] و [[minmax(min(100%, 240px), 1fr)]] على الموبايل والتابلت، والـ ٣ أعمدة و [[span]] في media query آخر الملف (القسم ١٠ في الدرس اللي فات):

~~~css من القسم ١٠
@media (min-width: 960px) {
  .bento { grid-template-columns: repeat(3, 1fr); }
  .big { grid-row: span 2; }
  .wide { grid-column: span 2; }
}
~~~

ليه مش [[auto-fit]] على الديسكتوب كمان؟ لأن [[span 2]] مع عدد أعمدة متغيّر ممكن يسيب خانات فاضية. ٣ أعمدة ثابتة = تحكم كامل في الشكل. والترتيب: الكبير أول عنصر فبياخد العمود الأول (يمين في RTL) والصفين، والصغيرين جنبه، والعريض في الصف التاني في العمودين اللي فاضيين. اتقاس على ١٢٨٠:

~~~text مكان كل كارت (left,top وعرض×طول)
card big 829,... 347x281
card 467,... 347x148
card 104,... 347x148
card wide 104,... 709x117
~~~

- [[.big p { color: var(--ink); }]]: على خلفية [[--brand-soft]] النص الأسود ١٤٫٢٢، والرمادي هناك كان هيبقى أقل.

---

## الآراء

~~~html index.html (الآراء)
<section id="reviews" class="block alt" aria-labelledby="reviews-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">آراء</p><h2 id="reviews-title">اللي جرّبوا بيقولوا إيه</h2></header>
    <div class="reviews">
      <figure data-reveal class="review"><blockquote><p>أول مرة أعرف إن البن ليه طعم فواكه. بقيت أستنى الكيس كل شهر.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">م</span>منى، مهندسة</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>الطحنة مظبوطة على جهاز الإسبريسو بتاعي، ومحتاجتش أعدّل حاجة.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">ك</span>كريم، صاحب كافيه صغير</figcaption></figure>
      <figure data-reveal class="review"><blockquote><p>وقّفت الاشتراك شهر وأنا مسافرة ورجّعته بضغطة. ده اللي كنت عايزاه.</p></blockquote><figcaption><span class="avatar" aria-hidden="true">س</span>سلمى، مدرّسة</figcaption></figure>
    </div>
  </div>
</section>
~~~

- [[figure]] = وحدة لوحدها، و [[blockquote]] = كلام منقول، و [[figcaption]] = مين. ده الشكل اللي الـ HTML spec بيقترحه للاقتباس بمصدره (مش [[<cite>]]، لأن cite لاسم عمل زي كتاب مش لاسم شخص).
- الأفاتار حرف مش صورة: صفر طلبات زيادة، وبلون البراند على [[--brand-soft]]. [[flex: none]] بيمنعه يتضغط لو الاسم طويل، و [[place-items: center]] بيوسّط الحرف في الدايرة.
- علامة الاقتباس [[”]] بـ [[::before]] عشان مش جزء من الكلام (قارئ الشاشة ممكن يقراها؛ لو عايز تمنع ده خليها صورة SVG في الخلفية). [[line-height: 0]] و [[vertical-align: -.4em]] عشان العلامة الكبيرة متكبّرش السطر.
- الآراء هنا مخترعة للمعمل. في صفحة حقيقية متكتبش آراء مش حقيقية: ده تضليل للزائر.

---

## الأسعار

~~~html index.html (الأسعار)
<section id="pricing" class="block" aria-labelledby="pricing-title">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow">الأسعار</p><h2 id="pricing-title">اختار الكمية اللي تكفيك</h2></header>
    <fieldset class="billing">
      <legend class="sr-only">طريقة الدفع</legend>
      <label><input type="radio" name="billing" value="monthly" checked> شهري</label>
      <label><input type="radio" name="billing" value="yearly"> سنوي <span class="save">شهرين ببلاش</span></label>
    </fieldset>
    <div class="plans">
      <article data-reveal class="plan">
        <h3>تجربة</h3><p class="plan-sub">كيس ٢٥٠ جرام</p>
        <p class="price"><span class="m">٢٤٠ جنيه <small>/ شهر</small></span><span class="y">٢٤٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>تحميصة واحدة تختارها</li><li>توصيل مجاني</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="trial">اختار تجربة</a>
      </article>
      <article data-reveal class="plan featured">
        <p class="badge">الأكتر طلبًا</p>
        <h3>البيت</h3><p class="plan-sub">كيسين ٢٥٠ جرام</p>
        <p class="price"><span class="m">٤٤٠ جنيه <small>/ شهر</small></span><span class="y">٤٤٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>تحميصتين مختلفتين</li><li>توصيل مجاني</li><li>كوباية قياس هدية</li></ul>
        <a class="btn btn-primary" href="#signup" data-plan="home">اختار البيت</a>
      </article>
      <article data-reveal class="plan">
        <h3>المكتب</h3><p class="plan-sub">كيلو كامل</p>
        <p class="price"><span class="m">٨٢٠ جنيه <small>/ شهر</small></span><span class="y">٨٢٠٠ جنيه <small>/ سنة</small></span></p>
        <ul><li>٤ تحميصات</li><li>توصيل مجاني</li><li>فاتورة باسم الشركة</li></ul>
        <a class="btn btn-ghost" href="#signup" data-plan="office">اختار المكتب</a>
      </article>
    </div>
  </div>
</section>
~~~

~~~css css/site.css (٦)
/* ٦. الأسعار: التبديل بـ :has() من غير JS */
.billing { display: flex; justify-content: center; gap: 4px; border: 1px solid var(--line); border-radius: 999px; padding: 4px; width: fit-content; margin: 0 auto 32px; }
.billing label { position: relative; padding: 6px 18px; border-radius: 999px; cursor: pointer; }
.billing input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.billing label:has(:checked) { background: var(--ink); color: var(--bg); }
.billing label:has(:focus-visible) { outline: 3px solid var(--brand); outline-offset: 2px; }
.save { font-size: .8rem; color: var(--brand); }
.billing label:has(:checked) .save { color: inherit; }
.plans { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); align-items: start; }
.plan { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 28px; display: grid; gap: 8px; }
.plan h3, .plan-sub { margin: 0; }
.plan-sub { color: var(--muted); }
.price { font-size: 2rem; font-weight: 800; margin: 8px 0; font-variant-numeric: tabular-nums; }
.price small { font-size: 1rem; font-weight: 400; color: var(--muted); }
.price .y { display: none; }
.block:has([value="yearly"]:checked) .price .m { display: none; }
.block:has([value="yearly"]:checked) .price .y { display: inline; }
.plan ul { padding-inline-start: 20px; margin: 0 0 12px; }
.featured { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.featured .plan-sub, .featured small { color: inherit; opacity: .85; }
.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); box-shadow: none; }
.badge { justify-self: start; margin: 0; background: var(--brand-soft); color: var(--ink); border-radius: 999px; padding: 0 12px; font-size: .85rem; }
~~~

### التبديل سطر سطر

- [[<fieldset>]] و [[<legend>]]: بيجمعوا الـ radios تحت اسم («طريقة الدفع»)، وقارئ الشاشة بيقول الاسم لما تدخل المجموعة. الـ legend مخفي بصريًا بـ [[.sr-only]] لأن الشكل نفسه واضح.
- [[.billing { width: fit-content; margin: 0 auto 32px; }]]: الكبسولة بعرض محتواها بس وفي النص.
- [[.billing input { position: absolute; inset: 0; opacity: 0; }]]: الـ radio مغطّي الـ label كله وشفاف. ليه مش [[display: none]]؟ لأن العنصر المستخبي بـ display مبياخدش focus، فالكيبورد مكانش هيقدر يوصل للاختيار، وقارئ الشاشة مش هيلاقيه.
- [[label:has(:checked)]]: الـ label اللي جواه الـ radio المتختار بيبقى خلفيته [[--ink]]، فالاختيار باين.
- [[label:has(:focus-visible)]]: الحلقة على الـ label لما الـ radio ياخد focus بالكيبورد. من غيرها اللي بيتنقل بالكيبورد مش هيعرف هو فين (الـ radio شفاف).
- [[.billing label:has(:checked) .save { color: inherit; }]]: «شهرين ببلاش» بلون البراند، بس لما «سنوي» يتختار الخلفية بتبقى [[--ink]] والبراند عليها ٣٫١٣ (درس الألوان). فبتاخد لون الـ label.
- [[.block:has([value="yearly"]:checked)]]: الشرط على القسم بس. أول نسخة كانت [[body:has(input[value="yearly"]:checked)]]: بتشتغل، بس أي radio في أي حتة قيمته [[yearly]] (مثلًا في الفورم بعدين) هيقلب الأسعار.
- [[font-variant-numeric: tabular-nums]]: كل رقم نفس العرض، فـ «٢٤٠» و «٢٤٠٠» بيتبدّلوا من غير ما السطر يتنطط. ([[.price]] فيها السعرين، واحد بس [[display]] منهم.)

### الكيبورد: اتقاس

~~~text Tab لـ «شهري» وبعدين ArrowLeft (RTL)
monthly: [ '٢٤٠ جنيه / شهر', '٤٤٠ جنيه / شهر', '٨٢٠ جنيه / شهر' ]
after ArrowLeft: yearly [ '٢٤٠٠ جنيه / سنة', '٤٤٠٠ جنيه / سنة', '٨٢٠٠ جنيه / سنة' ]
~~~

السهم الشمال في صفحة RTL بيروح للاختيار **اللي بعده** (سنوي)، لأن المتصفح بيعكس الأسهم الأفقية مع [[dir]]. واتجرّب كمان والـ JS ممنوع (طلبات [[*.js]] اتقفلت): نفس النتيجة.

### الأرقام: مكتوبة ولا متحسوبة؟

الأسعار مكتوبة بإيدنا في الـ HTML بأرقام عربي (السنة = ١٠ شهور، فـ «شهرين ببلاش»). لو هتتحسب بـ JS (مثلًا من API)، اكتبها كده:

~~~javascript
const fmt = (n) => n.toLocaleString("ar-EG", { useGrouping: false });
console.log(fmt(240 * 10));                  // ٢٤٠٠
console.log((2400).toLocaleString("ar-EG"));  // ٢٬٤٠٠ (فيه فاصل آلاف عربي)
~~~

[[useGrouping: false]] بيشيل فاصل الآلاف («٢٬٤٠٠») لو مش عايزه في الأرقام الصغيرة. ومتستخدمش [[toLocaleString()]] من غير لغة: هيطلع بلغة جهاز الزائر (إنجليزي على جهاز إنجليزي).

### الباقة المميزة

- [[.featured]]: الخلفية [[--ink]] والنص [[--bg]]، فمقلوبة في الوضعين (١٦٫٥٥ في الفاتح و ١٥٫٦٣ في الغامق).
- [[.featured .btn-primary { --b-bg: var(--bg); --b-fg: var(--ink); }]]: الزرار جواها كمان مقلوب. ده فايدة الـ variant بالمتغيرات: سطر واحد بيغيّر لون الزرار في سياق معيّن.
- [[.badge]] «الأكتر طلبًا» على [[--brand-soft]] بنص [[--ink]]: ١٤٫٢٢ وبيبان على الخلفية الغامقة. [[justify-self: start]] عشان البادج ياخد عرض كلمته بس جوه الـ grid.
- [[.plans { align-items: start; }]]: كل كارت بطول محتواه، فالمميزة بتبان أطول (فيها ٣ مميزات) بدل ما الكل يتمط لنفس الطول.

### زرار «اختار الباقة» بيملا الفورم

~~~javascript js/site.js (٣)
// ٣. زرار «اختار الباقة» بيملا الباقة في الفورم
document.querySelectorAll("[data-plan]").forEach((a) => a.addEventListener("click", () => {
  document.getElementById("plan").value = a.dataset.plan;
}));
~~~

اللينك نفسه [[href="#signup"]] بيقفز للفورم (من غير JS كمان)، والـ JS بيزوّد إنه يختار الباقة في الـ [[<select>]]. [[a.dataset.plan]] = قيمة [[data-plan]]. اتقاس بعد الضغط على «اختار البيت»: [[{ plan: 'home', hash: '#signup', signupTop: 80 }]]: الباقة اتختارت، والقسم وقف عند ٨٠ بكسل (٦٤ ارتفاع الـ header + ١٦) بسبب [[scroll-margin-top]].

---

## الغلطة: [[minmax(320px, 1fr)]]

النسخة الأولى: [[.plans { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }]]. على ٣٦٠ الـ gutter ١٦ من كل ناحية = ٣٢٨ بكسل متاحة، فـ ٣٢٠ عدّت وكله «OK». على ٣٢٠ المتاح ٢٨٨، والكارت مصمم إنه ٣٢٠ على الأقل:

~~~text matrix.mjs على النسخة الأولى
320   BROKEN +31px  a.btn.btn-primary.top-cta 90px | article.plan 320px | article.plan.featured 320px | article.plan 320px
360   OK
~~~

(الـ +٣١ هي أعرض حاجة، وهي الـ header من غلطة الدرس اللي فات.) التصليح [[minmax(min(100%, 280px), 1fr)]]: العمود أقل حاجة ٢٨٠، **أو** عرض الشاشة لو أصغر. بعدها ٣٢٠ بقت [[OK]].

---

## خلاصة

- bento: [[auto-fit]] و [[minmax(min(100%, X), 1fr)]] للموبايل، وأعمدة ثابتة و [[span]] للديسكتوب.
- الآراء: [[figure]] و [[blockquote]] و [[figcaption]]، والزخرفة [[aria-hidden]].
- التبديل: radio شفاف فوق الـ label (مش display none) + [[:has(:checked)]] للأسعار + [[:has(:focus-visible)]] للحلقة، والشرط على القسم مش الـ body.
- الكارت المقلوب: متغيرين، وزرار مقلوب بسطر، ومفيش براند على [[--ink]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ كروت في [[repeat(auto-fit, minmax(200px, 1fr))]] على عرض ١٠٠٠ (من غير gap). كام عمود، وعرض كل كارت؟ وبـ [[auto-fill]] بدل [[auto-fit]]؟ جرّب وقيس بـ [[getBoundingClientRect().width]].`, done: R`كتبت توقعك وجرّبت: [[auto-fit]] = ٣ كروت كل واحد حوالي ٣٣٣، و [[auto-fill]] = ٥ أعمدة (٢ فاضيين) والكروت ٢٠٠ بس، وفهمت إن الفرق بيبان لما الكروت أقل من الأعمدة اللي تساعها الشاشة.` },
            { lvl: 'تطبيق', t: R`**ابني:** شريط «كام شخص بيوفّر» تحت التبديل بيقول «السنوي بيوفّرلك ٤٨٠ جنيه في باقة تجربة» ويتغيّر مع الاختيار، بـ CSS بس: الجملتين في الـ HTML و [[:has()]] بيعرض واحدة.`, done: R`الجملة بتتغيّر مع الكيبورد والماوس ومن غير JS، والأرقام صح (التوفير = شهرين = ٤٨٠ و ٨٨٠ و ١٦٤٠ في الـ ٣ باقات)، و axe صفر.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيخفي الـ radios: [[.billing input { display: none; }]] و [[.billing label:has(:checked) { background: var(--ink); }]]. بالماوس شغال. جرّبه بالكيبورد وبقارئ الشاشة (NVDA أو VoiceOver أو تاب Accessibility)، واكتب إيه اللي اتكسر وصلّحه.`, done: R`كتبت إن Tab بيعدّي المجموعة كلها وإن شجرة الـ accessibility مفيهاش radio، وصلّحت بالـ radio الشفاف المتغطي على الـ label، والحلقة ظاهرة بـ [[:has(:focus-visible)]].` },
            { lvl: 'تحدي', t: R`**refactor:** الأسعار مكتوبة مرتين في الـ HTML (شهري وسنوي). اعملها مرة واحدة: كل باقة فيها [[data-monthly="240"]] بس، والسعر بيتحسب ويتكتب بـ JS بـ [[toLocaleString("ar-EG", { useGrouping: false })]]، ومع ذلك لو الـ JS وقع الشهري يفضل ظاهر.`, done: R`الـ HTML فيه السعر الشهري بس كنص (عشان من غير JS)، والـ JS بيحسب السنوي، والتبديل شغال بالكيبورد، والـ JS ممنوع = شهري ظاهر والتبديل مستخبي (مفيش زرار بيعمل حاجة غلط)، وكتبت ليه ده أحسن أو أوحش من الطريقة اللي في الدرس.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN اعرف إمتى [[:has()]] بيبقى «forgiving» ومين لأ: لو كتبت [[.block:has(:checked, :unknown-thing)]] القاعدة كلها هتتلغي ولا الجزء الغلط بس؟`, done: R`كتبت الإجابة ومعاها المصدر، وجرّبتها في Chrome بإنك لقيت القاعدة في Styles (اتطبّقت ولا اتشطبت).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** حوّل جدول أسعار ٣ باقات لـ JSON ([[name]] و [[monthly]] و [[features]] و [[featured]])، واكتب function بتولّد نفس HTML الأسعار من الـ JSON، وقارن الناتج بالـ HTML اللي في الدرس.`, done: R`الـ function بترجّع HTML لما تحطه مكان القسم الصفحة شكلها نفس الشكل، والأرقام العربي طالعة من [[toLocaleString]] مش مكتوبة، و [[featured: true]] بيحط الـ class والبادج.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const plans = [["تجربة", 240], ["البيت", 440], ["المكتب", 820]];
const fmt = (n) => n.toLocaleString("ar-EG", { useGrouping: false });
for (const [name, m] of plans) console.log(name + ": " + fmt(m) + " / شهر، " + fmt(m * 10) + " / سنة، والتوفير " + fmt(m * 2));
console.log("grouped: " + (2400).toLocaleString("ar-EG"));
const css = ".plans { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }";
const need = Number(css.match(/minmax\((\d+)px/)[1]), room = 320 - 2 * 16;
console.log("minmax " + need + "px on a 320 phone with " + room + "px: " + (need > room ? "overflow " + (need - room) + "px" : "fits"));`, expect: [R`تجربة: ٢٤٠ / شهر، ٢٤٠٠ / سنة، والتوفير ٤٨٠`, R`البيت: ٤٤٠ / شهر، ٤٤٠٠ / سنة، والتوفير ٨٨٠`, R`المكتب: ٨٢٠ / شهر، ٨٢٠٠ / سنة، والتوفير ١٦٤٠`, R`grouped: ٢٬٤٠٠`, R`minmax 320px on a 320 phone with 288px: overflow 32px`] },
          ],
        },
        {
          cmd: "landing page: الأسئلة والـ CTA والـ footer والحركة",
          title: "أسئلة بـ details name واحد بس مفتوح من غير JS، و CTA، و footer باسم المحمصة عملاق، وظهور مع السكرول ميخبيش المحتوى لو الـ JS وقع",
          learn: R`تكمّل الصفحة لآخرها: أسئلة بتتفتح بالكيبورد من غير كود، وشريط CTA، و footer، وحركة ظهور بتحترم «حركة أقل» وبتفضل الصفحة مقروءة لو أي سكربت فشل.`,
          out: R`أقسام الأسئلة والـ CTA والـ footer في [[index.html]]، والأجزاء ٧ و ٨ و ٩ من [[site.css]]، والجزء ٤ من [[site.js]]. والقياس: صفر عناصر مستخبية لو الـ JS وقع (كانوا ١٠)، والـ footer لينكاته بتتضغط.`,
          desc: R`آخر أقسام الصفحة:

• **الأسئلة:** كل سؤال [[<details name="faq">]] و [[<summary>]]. الـ [[name]] نفسه على الأربعة بيخليهم مجموعة: لما تفتح واحد، اللي كان مفتوح بيتقفل لوحده (اتقاس: فتحنا التاني، والأول اتقفل). الكيبورد (Tab و Enter و Space) وقارئ الشاشة («مطوي/مفرود») شغالين من غير ولا سطر JS. والعلامة [[+]] بتلف ٤٥ درجة فتبقى [[×]].
• **الـ CTA:** صندوق ألوانه مقلوبة ([[--cta-bg]] و [[--cta-ink]]) فيه جملة وزرار للفورم.
• **الـ footer:** ٣ أعمدة بتنزل تحت بعض، واسم المحمصة عملاق وباهت تحتهم. **غلطة اتمسكت:** الاسم الكبير ده (خطه ٢٦٠ بكسل) كان راكب فوق لينكات الـ footer: [[elementFromPoint]] على لينك «أسئلة» رجّع [[P.wordmark]] مش اللينك، يعني الضغطة بتروح للزخرفة. التصليح [[pointer-events: none]].
• **الظهور مع السكرول:** الكروت بتظهر بـ fade لما توصلها. القاعدة: الـ CSS بيخفيها بس لو [[.js]] موجودة على الـ html **و** اليوزر مش طالب حركة أقل. النسخة الأولى كانت بتخفيها على طول، فلما منعنا ملفات الـ JS: **١٠ عناصر** فضلت مخفية للأبد. النهائي: **صفر**. ومع [[prefers-reduced-motion: reduce]]: صفر مخفي من الأول، والـ smooth scroll بيتقفل.`,
          example: R`<details name="faq" open><summary>البن بيفضل طازة لحد إمتى؟</summary><p>أحسن طعم من اليوم الرابع لحد الأسبوع الرابع.</p></details>
<details name="faq"><summary>أقدر أغيّر التحميصة كل شهر؟</summary><p>أيوه، من حسابك قبل يوم الأربع.</p></details>
details[open] summary::after { rotate: 45deg; }
.wordmark { font-size: clamp(80px, 22vw, 260px); opacity: .08; pointer-events: none; }
@media (prefers-reduced-motion: no-preference) { .js [data-reveal] { opacity: 0; translate: 0 16px; } }
.js [data-reveal].in { opacity: 1; translate: 0 0; }`,
          lines: [
            R`أول سؤال: [[open]] عشان يبقى مفتوح في الأول (الزائر يعرف إن دي أسئلة بتتفتح)، و [[name="faq"]] بيدخّله في المجموعة.`,
            R`تاني سؤال في نفس المجموعة ([[name]] نفسه)، فلما يتفتح الأول بيتقفل لوحده من غير JS.`,
            R`لما الـ details يبقى مفتوح، علامة الـ [[+]] اللي في [[::after]] بتلف ٤٥ درجة فتبقى [[×]]. [[rotate]] خاصية لوحدها من غير [[transform]].`,
            R`اسم المحمصة العملاق في الـ footer: بيكبر مع الشاشة لحد ٢٦٠، باهت ٨٪، و [[pointer-events: none]] عشان ميغطيش اللينكات اللي فوقه.`,
            R`الإخفاء قبل الظهور: بشرطين، اليوزر مش طالب حركة أقل، و [[.js]] على الـ html (يعني [[theme.js]] اشتغل). لو أي شرط ناقص، الكروت ظاهرة عادي.`,
            R`لما الـ JS يحط class [[in]] (العنصر دخل الشاشة)، الكارت بيرجع لمكانه وبيظهر بـ transition.`,
          ],
          try: R`ابني الأقسام التلاتة والحركة. افتح الأسئلة بالكيبورد بس (Tab و Enter): لما تفتح التاني، الأول بيحصله إيه؟ وفي DevTools › Rendering فعّل «prefers-reduced-motion: reduce» واعمل refresh: الكروت بتظهر بحركة؟ وبعدين في Network › Request blocking زوّد [[*.js]] واعمل refresh واعمل سكرول للآخر: فيه قسم فاضي؟ وآخر حاجة: في Console على لينك «أسئلة» في الـ footer اكتب [[document.elementFromPoint(x, y)]] بإحداثيات وسطه.`,
          sol: R`فتح التاني قفل الأول (اتقاس: [[open at start: [ 'البن بيفضل طازة لحد إمتى؟' ]]] وبعد الضغط [[after 2nd: [ 'أقدر أغيّر التحميصة كل شهر؟' ]]]). مع reduce الكروت ظاهرة من الأول ([[hiddenAtLoad: 0]] بدل ١٠) و [[scroll-behavior]] بقى [[auto]]. ومع منع الـ JS مفيش قسم فاضي (صفر مخفي). و [[elementFromPoint]] بيرجّع اللينك نفسه ([[A]])؛ لو شلت [[pointer-events: none]] هيرجّع [[P.wordmark]].`,
          flag: "script",
          deep: {
            why: R`الأسئلة بتشيل الاعتراضات الأخيرة قبل الفورم، ولو مخفية ورا JS بايظ الزائر مش هيشوفها. الحركة بتدّي إحساس إن الصفحة حية، بس كل حركة ليها تمن: ناس بيدوخوا من الحركة (vestibular disorders) وبيطلبوا من النظام حركة أقل، وأي إخفاء معتمد على JS بيحوّل خطأ صغير في سكربت لصفحة فاضية. والـ footer هو آخر مكان الزائر بيدوّر فيه على «تواصل»، فلينكاته لازم تتضغط فعلًا.`,
            how: R`[[details]] عنصر HTML ليه حالة ([[open]]) والمتصفح بيقلبها لما [[summary]] يتضغط أو ياخد Enter أو Space، وبيقول لقارئ الشاشة الحالة. و [[name]] (ميزة جديدة، Baseline ٢٠٢٤ حسب الوثائق) بيخلي details بنفس الاسم مجموعة exclusive زي radio. والظهور: [[IntersectionObserver]] بيبلّغ لما العنصر يدخل الشاشة (أو يقرب منها حسب [[rootMargin]])، فبنحط [[in]] ونبطّل نراقبه ([[unobserve]]). الـ observer بيتحسب في كل frame، فلو العنصر عدّى الشاشة كلها بين frame والتاني (سكرول سريع جدًا) مش هيتحسب، وهيفضل مخفي لحد ما ترجعله. و [[pointer-events: none]] بيخلّي الضغط يعدّي من العنصر للي تحته، لأن الـ hit testing بيختار أعلى عنصر في المكان ده حتى لو شفاف.`,
            when: R`[[details]] لأي محتوى «اختياري تفتحه» (أسئلة، تفاصيل، شروط). لو عايز حركة فتح ناعمة لازم CSS أحدث ([[::details-content]] و [[interpolate-size]]) أو JS. والظهور مع السكرول لصفحات تسويق بس، مش لنص مقال أو جدول بيانات حد بيدوّر فيه. واختبر دايمًا بـ ٣ حالات: عادي، و reduce، و JS ممنوع.`,
            mistakes: R`[[[data-reveal] { opacity: 0 }]] من غير [[.js]] (اتقاس: ١٠ عناصر مخفية للأبد لو السكربت وقع). أو حركة من غير [[prefers-reduced-motion]]. أو accordion بـ [[div]] و [[onclick]] (مفيش كيبورد ولا حالة لقارئ الشاشة). أو [[list-style: none]] على summary من غير ما تشيل [[::-webkit-details-marker]] (Safari بيفضل يرسم المثلث). أو زخرفة كبيرة فوق محتوى من غير [[pointer-events: none]]. أو [[will-change: transform]] على كل كارت «للأداء» (بيعمل layer لكل واحد وياكل ذاكرة).`
          },
          teach: R`## الأسئلة

~~~html index.html (الأسئلة)
<section id="faq" class="block alt" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">أسئلة</p><h2 id="faq-title">أسئلة بتتسأل كتير</h2></header>
    <details name="faq" open><summary>البن بيفضل طازة لحد إمتى؟</summary><p>أحسن طعم من اليوم الرابع لحد الأسبوع الرابع بعد التحميص. الكيس فيه صمام بيطلّع الغاز ومبيدخلش هوا.</p></details>
    <details name="faq"><summary>أقدر أغيّر التحميصة كل شهر؟</summary><p>أيوه، من حسابك قبل يوم الأربع، والتغيير بيتطبق على الشحنة الجاية.</p></details>
    <details name="faq"><summary>لو مش عاجبني الطعم؟</summary><p>ابعتلنا في خلال أسبوع من الاستلام ونبدّل الكيس بتحميصة تانية مجانًا.</p></details>
    <details name="faq"><summary>بتوصلوا فين؟</summary><p>كل المحافظات. القاهرة والجيزة في يومين، والباقي في ٤ أيام.</p></details>
  </div>
</section>
~~~

~~~css css/site.css (٧)
/* ٧. الأسئلة */
details { border-bottom: 1px solid var(--line); padding-block: 8px; }
summary { cursor: pointer; font-weight: 700; padding-block: 8px; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
summary::-webkit-details-marker { display: none; }
summary::after { content: "+"; flex: none; font-size: 1.4rem; line-height: 1; color: var(--brand); transition: rotate .2s var(--ease); }
details[open] summary::after { rotate: 45deg; }
details p { color: var(--muted); }
~~~

- [[.narrow]] (٤٤rem): الأسئلة نص طويل، فالعمود أضيق من باقي الصفحة عشان السطر يتقري.
- [[summary { list-style: none; display: flex; justify-content: space-between; }]]: بنشيل المثلث الافتراضي ونحط علامتنا في الطرف التاني. في RTL [[space-between]] بيحط السؤال يمين والعلامة شمال لوحده.
- [[summary::-webkit-details-marker { display: none; }]]: Safari بيرسم المثلث بطريقة قديمة مبتتشالش بـ [[list-style]] لوحده.
- [[summary::after { content: "+"; flex: none; }]]: [[flex: none]] عشان لو السؤال طويل ونزل سطرين، العلامة متتضغطش.
- [[details[open] summary::after { rotate: 45deg; }]] و [[transition: rotate .2s]]: الـ [[+]] بتلف ربع لفة إلا شوية فتبقى [[×]]. الحركة على العلامة بس؛ فتح المحتوى نفسه فوري (حركته محتاجة [[::details-content]] اللي لسه مش في كل المتصفحات).

### القياس

~~~text فتحنا التاني بالضغط على الـ summary
open at start: [ 'البن بيفضل طازة لحد إمتى؟' ]
after 2nd: [ 'أقدر أغيّر التحميصة كل شهر؟' ]
~~~

متصفح مبيدعمش [[name]] على details (قبل ٢٠٢٤) هيسيب أكتر من واحد مفتوح، وده سلوك مقبول (مفيش حاجة بتبوظ).

---

## الـ CTA

~~~html index.html (الـ CTA)
<section class="cta" aria-labelledby="cta-title">
  <div class="wrap">
    <div class="cta-box">
      <h2 id="cta-title">أول كيس بنص التمن</h2>
      <p>للمشتركين الجداد لحد آخر الشهر.</p>
      <a class="btn btn-light" href="#signup">عايز أجرّب</a>
    </div>
  </div>
</section>
~~~

- [[.wrap]] بره و [[.cta-box]] جوه: الـ wrap بيدّي العرض والـ gutter، والصندوق جواه بالخلفية والزوايا. أول نسخة كانت [[class="wrap cta-box"]] على نفس العنصر، والخلفية بتملا الـ padding كمان، فعلى الموبايل الصندوق الغامق كان لازق في حافتين الشاشة من غير أي مسافة. فصلناهم: الـ wrap بيسيب الـ gutter، والصندوق جواه ليه [[padding]] بتاعه.
- [[.btn-light]]: الزرار بـ [[--cta-ink]] خلفية و [[--cta-bg]] نص، يعني مقلوب جوه الصندوق المقلوب.

---

## الـ footer

~~~html index.html (الـ footer)
<footer class="foot">
  <div class="wrap foot-grid">
    <div><p class="logo">حبّة</p><p>محمصة صغيرة بتحمّص كل خميس.</p></div>
    <nav aria-label="روابط الموقع"><ul><li><a href="#features">ليه حبّة</a></li><li><a href="#pricing">الأسعار</a></li><li><a href="#faq">أسئلة</a></li></ul></nav>
    <div><p>تواصل</p><p><a href="mailto:hello@habba.example" dir="ltr">hello@habba.example</a></p></div>
  </div>
  <p class="wordmark" aria-hidden="true">حبّة</p>
</footer>
~~~

~~~css css/site.css (٨)
/* ٨. الـ CTA والـ footer */
.cta { padding-block: 24px; }
.cta-box { background: var(--cta-bg); color: var(--cta-ink); border-radius: var(--r-lg); padding: 56px var(--gutter); text-align: center; }
.foot { border-top: 1px solid var(--line); padding-top: 48px; overflow: clip; }
.foot-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); }
.foot ul { list-style: none; padding: 0; margin: 0; }
.foot a { display: inline-block; padding-block: 6px; text-decoration: none; }
.wordmark { font-size: clamp(80px, 22vw, 260px); font-weight: 900; line-height: .8; text-align: center; color: var(--brand); opacity: .08; margin: 24px 0 -0.2em; pointer-events: none; user-select: none; }
~~~

- [[<nav aria-label="روابط الموقع">]]: تاني nav في الصفحة، فلازم اسم مختلف عن «الرئيسية» عشان قارئ الشاشة يفرّق بينهم.
- الإيميل [[dir="ltr"]] و [[.example]]: الدومين [[example]] محجوز للأمثلة ومش هيروح لحد حقيقي.
- [[overflow: clip]] على الـ footer: الاسم العملاق بيطلع تحت بـ [[margin-bottom: -0.2em]] والـ clip بيقصه. ليه مش [[hidden]]؟ [[hidden]] بيخلّي العنصر scroll container (ممكن يتسكرل بالكود أو بالكيبورد في حالات)، و [[clip]] بيقص وبس.
- [[.wordmark]]: [[clamp(80px, 22vw, 260px)]] بيخليه يملا العرض تقريبًا على أي شاشة، و [[line-height: .8]] بيقرّب السطور، و [[opacity: .08]] بيخليه زخرفة باهتة، و [[aria-hidden="true"]] عشان قارئ الشاشة ميقولش «حبّة» تالت مرة.

### الغلطة: الاسم العملاق فوق اللينكات

[[a11y.mjs]] (درس «فحص accessibility والنشر») بيعدّي بالكيبورد على كل عنصر وبيسأل [[document.elementFromPoint]] عن وسطه: العنصر اللي تحت النقطة دي هو هو؟ على لينك «أسئلة» في الـ footer:

~~~text قبل
{ r: [ 772, 625, 38, 43 ], vh: 900, hit: 'P.wordmark' }
~~~

الـ [[p]] صندوقه الحقيقي تحت اللينكات، بس الحروف بخط ٢٦٠ و [[line-height: .8]] أطول من السطر، والـ hit testing بيحسب مساحة الحروف كمان، فالجزء اللي فوق راكب على عمود اللينكات. الماوس كان بيضغط على زخرفة. بعد [[pointer-events: none]]:

~~~text بعد
{ r: [ 772, 625, 38, 43 ], vh: 900, hit: 'A.' }
~~~

و [[user-select: none]] عشان تحديد النص بالماوس ميمسكش الكلمة الكبيرة.

---

## الحركة: ظهور مع السكرول

~~~css css/site.css (٩)
/* ٩. الظهور مع السكرول: بس لو الـ JS شغال واليوزر مش طالب حركة أقل */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; translate: 0 16px; transition: opacity .6s var(--ease), translate .6s var(--ease); }
  .js [data-reveal].in { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
~~~

~~~javascript js/site.js (٤)
// ٤. الظهور مع السكرول (الـ CSS بيخفي بس لو .js موجودة والحركة مسموحة)
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
~~~

### سطر سطر

- [[@media (prefers-reduced-motion: no-preference)]]: القواعد جواه بتتطبّق بس لو اليوزر **مش** طالب حركة أقل. الإعداد ده من النظام (ويندوز: Settings › Accessibility › Visual effects › Animation effects؛ والماك و iOS: Reduce motion؛ وأندرويد: Remove animations).
- [[.js [data-reveal]]]: الشرط التاني. [[.js]] بيتحط من [[theme.js]] في الـ head، فلو الـ JS مقفول أو الملفات وقعت، الـ selector ده مبيطابقش حاجة والكروت ظاهرة.
- [[translate: 0 16px]] ثم [[0 0]]: الكارت بيطلع ١٦ بكسل من تحت. [[opacity]] و [[translate]] بس، لأن الاتنين بيتحرّكوا من غير ما المتصفح يعيد حساب الـ layout (درس «مراحل الرسم»).
- [[transition-duration: .01ms !important]] تحت reduce: أي transition أو animation في الصفحة بتخلص فورًا. [[.01ms]] مش [[0]] عشان أي كود مستني [[transitionend]] يفضل يتنده. والـ [[!important]] هنا مقبول لأنه تفضيل يوزر لازم يغلب أي حاجة.
- [[rootMargin: "0px 0px -10% 0px"]]: بنصغّر «الشاشة» من تحت ١٠٪، فالكارت بيظهر لما يدخل شوية مش أول ما بكسل منه يلمس الحافة.
- [[io.unobserve(e.target)]]: كل كارت بيظهر مرة واحدة، ومش بيستخبى تاني لو طلعت فوقه.

### القياس: ٣ حالات

| الحالة | النسخة الأولى | النهائية |
|---|---|---|
| عادي، بعد سكرول للآخر | ٠ مخفي | ٠ مخفي |
| ملفات [[*.js]] ممنوعة (route abort في Playwright) | **١٠ مخفيين للأبد** | ٠ |
| [[reducedMotion: "reduce"]] أول ما الصفحة تفتح | مكانتش بتحترمه | ٠ مخفي، و [[scroll-behavior: auto]] |

النسخة الأولى كانت [[[data-reveal] { opacity: 0; }]] من غير أي شرط. الـ JS ممكن «يقع» من غير ما تقصد: ملف اتمسح في النشر، أو مسار غلط (درس النشر)، أو خطأ في أول سطر ([[Identifier 'top' has already been declared]] اللي حصل فعلًا)، أو إضافة في المتصفح بتمنع سكربتات.

### الغلطة التانية: السكرول السريع

وانا بقيس، لفيت على الصفحة بسكرول بخطوات ٤٠٠ بكسل وبينهم وقت قصير، وعدّيت كام عنصر فضل مستخبي:

~~~text الوقت بين كل خطوة ← عدد العناصر اللي متظهرتش
30ms/step: 7 of 10 never revealed
50ms/step: 0 of 10 never revealed
150ms/step: 0 of 10 never revealed
~~~

الـ observer بيتحسب مرة في كل frame، فلو عنصر دخل وطلع بين frame والتاني مبيتشافش. لليوزر ده معناه: لو نط من فوق لتحت بسرعة (أو بلينك [[#signup]])، الكروت اللي عدّى عليها لسه مخفية لما يرجع لها، وبتظهر ساعتها. مش كارثة، بس عشان كده **مننفعش نخفي محتوى مهم** بالطريقة دي، وعشان كده كمان أدوات الاختبار لازم تستنى كفاية (هنرجع للنقطة دي في فحص الـ accessibility: axe بيتجاهل العناصر المخفية).

---

## خلاصة

- [[details name]] = accordion بواحد مفتوح من غير JS وبكيبورد وقارئ شاشة جاهزين.
- زخرفة كبيرة = [[aria-hidden]] و [[pointer-events: none]]، واتأكد بـ [[elementFromPoint]].
- [[overflow: clip]] بدل [[hidden]] لما عايز تقص بس.
- الحركة: الإخفاء بشرط [[.js]] **و** [[no-preference]]، و [[opacity]] و [[translate]] بس، واختبر ٣ حالات.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ details، أول اتنين [[name="a"]] والتالت [[name="b"]]، والأول والتالت [[open]]. افتح التاني: كام واحد هيفضل مفتوح، وأنهي؟ جرّب.`, done: R`اتنين مفتوحين: التاني والتالت، لأن الأول بس في نفس المجموعة مع التاني فاتقفل، والتالت مجموعة لوحده. وكتبت إن المجموعة بالـ name مش بالترتيب ولا بالمكان.` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد على قسم الأسئلة JSON-LD من نوع [[FAQPage]] في [[<script type="application/ld+json">]] بيتولّد من الـ details نفسها بسكربت Node صغير وقت الكتابة (مش في المتصفح)، عشان النص ميتكتبش مرتين بإيدك.`, done: R`السكربت بيطبع JSON صالح ([[JSON.parse]] بيعدّي) فيه ٤ [[Question]] بنفس النصوص بالظبط، والـ Rich Results Test أو الـ Schema validator بيقرا الـ ٤ من غير أخطاء.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شريط شعارات بيتحرك ([[@keyframes slide { to { transform: translateX(-50%); } }]]) في صفحة RTL، وحد كتب [[animation-direction: reverse]] عشان «يمشي في الاتجاه التاني». الشريط بيسيب فراغ وبيطلع بره. صلّحه، وزوّد إيقاف عند الـ hover والـ focus، واحترم reduce.`, done: R`عرفت إن [[reverse]] بيعكس الزمن مش المكان، وعملت keyframes لـ RTL بـ [[translateX(50%)]] (أو [[:dir(rtl)]])، والشريط ماشي من غير فراغ، و [[animation-play-state: paused]] عند [[:hover]] و [[:focus-within]]، ومع reduce واقف، والنسخة المكررة عليها [[aria-hidden]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل نسخة من الظهور بـ [[animation-timeline: view()]] من غير JS خالص، وقارنها بالـ IntersectionObserver في ٣ حالات: سكرول سريع (خطوات ٣٠ms)، و JS ممنوع، و reduce. سجّل عدد العناصر المخفية في كل حالة للنسختين.`, done: R`جدول ٦ أرقام، ولاحظت إن نسخة [[view()]] مبتعلقش مخفية في السكرول السريع لأنها مربوطة بمكان السكرول مش بحدث، وكتبت إن الدعم لسه مش في كل المتصفحات وحطيتها جوه [[@supports (animation-timeline: view())]].` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** سكربت Playwright بيعمل ٣ صفحات: عادية، وبـ [[reducedMotion: "reduce"]]، وبـ [[page.route("**/*.js", r => r.abort())]]، ولكل واحدة بيعد العناصر اللي [[opacity]] بتاعتها [[0]] أول ما الصفحة تفتح وبعد سكرول للآخر. لازم يقع على النسخة الأولى ويعدّي على النهائية.`, done: R`على النهائية بيطبع [[10/0]] و [[0/0]] و [[0/0]] (قبل/بعد السكرول) ويخرج 0، وعلى نسخة من غير [[.js]] في الـ selector بيطبع [[10/10]] في حالة الـ JS الممنوع ويخرج 1.` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب [[.wordmark { position: absolute; z-index: -1; }]] بدل [[pointer-events: none]] عشان «ينزّل» الاسم تحت اللينكات. ده هيصلّح المشكلة؟ وإيه اللي ممكن يبوظ؟ اكتب ٣ سطور.`, done: R`كتبت إن [[z-index: -1]] ممكن يحطه ورا خلفية الـ footer نفسها فيختفي (لو الـ footer مش عامل stacking context)، وإن [[position: absolute]] بيطلّعه من الـ flow فالـ footer يقصر، وإن [[pointer-events]] بيحل المشكلة الحقيقية (الضغط) من غير ما يغيّر الشكل.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const faq = '<details name="faq" open><summary>البن بيفضل طازة لحد إمتى؟</summary><p>...</p></details>' +
  '<details name="faq"><summary>أقدر أغيّر التحميصة؟</summary><p>...</p></details>' +
  '<details name="faq"><summary>لو مش عاجبني الطعم؟</summary><p>...</p></details>' +
  '<details><summary>بتوصلوا فين؟</summary><p>...</p></details>';
const all = [...faq.matchAll(/<details\b([^>]*)>\s*<summary>([^<]*)<\/summary>/g)];
const names = new Set(all.map((d) => (d[1].match(/name="([^"]*)"/) || [])[1] || "(none)"));
console.log("details: " + all.length + ", open: " + all.filter((d) => /\sopen\b/.test(d[1])).length);
console.log("names: " + [...names].join(" "));
for (const d of all) if (!/name="faq"/.test(d[1])) console.log("not in the group: " + d[2]);
const css = "[data-reveal] { opacity: 0; }\n@media (prefers-reduced-motion: no-preference) { .js [data-reveal] { opacity: 0; } }";
const unsafe = css.split("\n").filter((l) => /opacity:\s*0\b/.test(l) && !/\.js\b/.test(l));
console.log("hidden without .js guard: " + unsafe.length);`, expect: [R`details: 4, open: 1`, R`names: faq (none)`, R`not in the group: بتوصلوا فين؟`, R`hidden without .js guard: 1`] },
          ],
        },
        {
          cmd: "landing page: فورم تسجيل accessible",
          title: "فورم تسجيل accessible: label لكل خانة، ورسايل غلط بالعربي مربوطة بـ aria-describedby، وملخص بـ role=alert، وموبايل بيقبل الأرقام العربي، وزرار مبيبعتش مرتين",
          learn: R`تبني فورم الشخص اللي بيستخدم الكيبورد أو قارئ الشاشة أو موبايل بكيبورد عربي يقدر يملاه ويفهم غلطه ويصلّحه، والمتصفح بيقول نوع الغلط وانت بتكتب الرسالة.`,
          out: R`الفورم في [[index.html]]، و [[form.css]]، و [[digits.js]] (دوال صافية بتتختبر في Node)، و [[form.js]]، و [[form-test.mjs]] بيطبع ٨ PASS، و axe صفر والفورم فيه ٦ أخطاء ظاهرة في الوضعين.`,
          desc: R`الفورم هو هدف الصفحة كلها. «accessible» هنا معناها حاجات محددة بتتقاس:
• كل خانة ليها [[<label for>]] (الضغط على الكلمة بيركّز في الخانة، وقارئ الشاشة بيقول الاسم).
• الإرشاد والغلط مربوطين بالخانة بـ [[aria-describedby="phone-hint phone-err"]]، فقارئ الشاشة بيقول «الموبايل، زي 01012345678… اكتب رقم الموبايل» لما تقف عليها، والخانة الغلط عليها [[aria-invalid="true"]].
• لما تبعت وفيه أخطاء: ملخص بـ [[role="alert"]] بيتقري لوحده («فيه ٦ خانات محتاجة تتصلّح») وكل غلط لينك للخانة بتاعته، والـ focus بيروح لأول خانة غلط.
• رسالة النجاح في [[role="status"]] (بتتقري من غير ما تقطع الكلام).

والحاجات اللي اتمسكت بالقياس:
• [[pattern="(\+20|0)1[0125][0-9-]{8,9}"]] (اتجرّب على regex101 واشتغل) **مبيشتغلش في Chrome**: المتصفح بيترجم الـ pattern بالـ flag [[v]] اللي بيمنع [[-]] من غير escape جوه [[[ ]]]، فبيتجاهله ويكتب في الـ Console [[Pattern attribute value ... is not a valid regular expression]]، والنتيجة إن [[123]] بقى رقم صح.
• رسايل المتصفح بلغة **المتصفح** مش الصفحة: حتى بـ [[locale: "ar-EG"]] الرسالة [[Please fill out this field.]]. فبناخد نوع الغلط من [[validity]] ونكتب الرسالة بالعربي في مكانها.
• الكيبورد العربي بيكتب [[٠١٠١٢٣٤٥٦٧٨]]، والـ pattern [[[0-9]]] بيرفضه. [[normalizeDigits]] بتحوّل الأرقام العربي والفارسي لإنجليزي وبتشيل المسافات والشُرط قبل التحقق.
• [[minlength]] مبيتحسبش لو القيمة اتحطت بالكود ([[tooShort: false]]) وبيتحسب لو اتكتبت ([[true]])، فبنقيس الطول بإيدنا كمان.
• [[disabled]] على زرار الإرسال بيطلّعه من الـ Tab (اتقاس: Tab من الخانة اللي قبله نط للي بعده)، فاستخدمنا [[aria-disabled="true"]] و flag بيمنع الإرسال التاني: ضغطتين = طلب [[POST]] واحد.`,
          example: R`<label for="phone">الموبايل</label>
<p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
<input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
<p id="phone-err" class="err"></p>
<div id="form-errors" class="summary" role="alert" hidden></div>
<p id="form-status" class="form-status" role="status"></p>`,
          lines: [
            R`[[for="phone"]] بيربط الكلمة بالخانة اللي [[id]] بتاعها [[phone]]: الضغط عليها بيركّز في الخانة، وقارئ الشاشة بيقول «الموبايل» قبل أي حاجة.`,
            R`إرشاد ظاهر قبل الخانة (مش placeholder بيختفي أول ما تكتب)، والرقم جوه [[<bdi dir="ltr">]] عشان يتعرض صح وسط جملة عربي.`,
            R`[[type="tel"]] و [[inputmode="tel"]] = كيبورد أرقام على الموبايل، و [[autocomplete="tel"]] = المتصفح يقترح رقمك، و [[dir="ltr"]] = الأرقام تتكتب من الشمال، و [[pattern]] صالح مع الـ flag [[v]]، و [[aria-describedby]] بيربط الإرشاد والغلط بالترتيب.`,
            R`مكان رسالة الغلط: فاضي في الأول (ومستخبي بـ [[:empty]] في الـ CSS)، والـ JS بيكتب فيه الرسالة العربي.`,
            R`ملخص الأخطاء: [[role="alert"]] = قارئ الشاشة بيقراه أول ما يظهر من غير ما الـ focus يروحله، و [[hidden]] في الأول.`,
            R`رسالة النتيجة: [[role="status"]] = بتتقري لما تتغيّر بس بعد ما قارئ الشاشة يخلّص اللي بيقوله (polite).`,
          ],
          try: R`ابني الفورم كله من الشرح وشغّل [[npm run serve]]. ابعته فاضي: الـ focus راح فين، والملخص بيقول إيه؟ اكتب الموبايل بالأرقام العربي ([[٠١٠١٢٣٤٥٦٧٨]]) واطلع من الخانة. جرّب كلمة سر [[abcdefgh]]. املاه صح وادوس الزرار مرتين بسرعة وشوف Network. ابعت بإيميل بيبدأ بـ [[taken@]]. وفي الآخر غيّر الـ pattern لـ [[[0-9-]]] وشوف الـ Console.`,
          sol: R`فاضي: الـ focus على «الاسم»، والملخص [[فيه ٦ خانات محتاجة تتصلّح:]] وتحته ٦ لينكات، و ٦ خانات عليها [[aria-invalid="true"]]. الأرقام العربي بقت [[01012345678]] بعد الخروج من الخانة والخانة صح. [[abcdefgh]]: [[كلمة السر محتاجة حرف ورقم]] والقايمة فيها ✓ على «٨ حروف» و «حرف» بس. ضغطتين = طلب POST واحد، والزرار كتب [[بنفتح الحساب…]]، وبعد ٨٠٠ms [[تمام! بعتنالك رسالة تأكيد على ...]]. [[taken@]]: [[الإيميل ده عليه حساب، جرّب تدخل بيه]] تحت الإيميل والـ focus عليه. و [[[0-9-]]]: الـ Console فيه [[Invalid character class]] و [[123]] بيعدّي.`,
          solCode: R`node tools/form-test.mjs
PASS empty: 6 invalid, focus on name
   summary: فيه ٦ خانات محتاجة تتصلّح: / اكتب اسمك / اكتب إيميلك / اكتب رقم الموبايل / اختار كلمة سر / اختار باقة / لازم توافق على الشروط عشان نكمل
PASS arabic digits normalized and valid
PASS short phone message
PASS password needs a digit
PASS rules list shows len,letter
PASS busy state while sending
PASS one POST only
   status: تمام! بعتنالك رسالة تأكيد على mona@example.com
PASS 409 → error on email and focus
   email-err: الإيميل ده عليه حساب، جرّب تدخل بيه`,
          flag: "script",
          deep: {
            why: R`الفورم هو المكان اللي الزائر بيتحول فيه لعميل، وأكتر حتة بيحصل فيها «أنا مش عارف الغلط فين» فيقفل الصفحة. رسالة إنجليزي في صفحة عربي، أو لون أحمر بس من غير كلام، أو غلط بيظهر من غير ما قارئ الشاشة يعرف، أو كيبورد عربي بيكتب أرقام مترفضة، كلها بتخسّر ناس. وكمان التحقق في المتصفح مش أمان: أي حد يقدر يبعت الطلب من غير الصفحة، فالسيرفر لازم يتحقق تاني بنفس القواعد (والـ API التجريبي هنا بيرجّع 409 للإيميل المكرر عشان نتعامل مع رد السيرفر).`,
            how: R`كل input ليه [[validity]] (ValidityState) فيه flags: [[valueMissing]] (required وفاضي)، و [[typeMismatch]] (إيميل مش إيميل)، و [[patternMismatch]]، و [[tooShort]]، و [[customError]] (لو [[setCustomValidity("...")]] اتنده بنص مش فاضي). [[novalidate]] على الفورم بيمنع الفقاعات الإنجليزي بتاعة المتصفح، بس الـ validity لسه بيتحسب، فبنقراه ونختار الرسالة. الـ [[pattern]] المتصفح بيحطه جوه [[^(?:...)$]] ويترجمه بالـ flag [[v]] (حسب مواصفة HTML الحديثة)، والـ [[v]] أصرم من [[u]]: الحروف [[( ) [ ] { } / - \ |]] جوه [[[ ]]] لازم يتعمل لها escape. و [[aria-describedby]] بيخلّي قارئ الشاشة يقرا نص العناصر دي بعد الاسم والنوع، بالترتيب اللي مكتوبة بيه. و [[role="alert"]] live region «assertive» بيتقري أول ما يتغيّر محتواه، و [[role="status"]] «polite».`,
            when: R`أي فورم: تسجيل، ودخول، وحجز، ودفع، وتواصل. نفس الطريقة بالظبط (validity + رسالة بإيدك + describedby + ملخص) بتشتغل في React و Vue، بس بتربط الحالة بالـ state. ولو الفورم كبير ومتعدد الخطوات، أو القواعد لازم تبقى نفسها في السيرفر والمتصفح، يبقى مكتبة schema (zod مثلًا) بتولّد القواعد للاتنين.`,
            mistakes: R`placeholder بدل label (بيختفي وانت بتكتب، وتباينه ضعيف). أو الغلط بالأحمر بس. أو رسالة الغلط بتظهر وانت لسه بتكتب أول حرف (بنظهرها بعد [[blur]]، وبعد كده بتتحدث مع كل حرف لحد ما تتصلّح). أو [[pattern]] بـ [[-]] من غير escape. أو [[type="number"]] للموبايل (بيشيل الصفر اللي في الأول وبيقبل [[e]]). أو [[disabled]] على الزرار وقت الإرسال. أو [[innerHTML]] برسالة جاية من السيرفر (XSS لو السيرفر رجّع كلام يوزر). أو [[autocomplete="off"]] على كلمة السر (بيمنع مدير كلمات السر). أو تسجيل الباسورد في اللوج.`
          },
          teach: R`## الفورم كامل

~~~html index.html (الفورم)
<section id="signup" class="block" aria-labelledby="signup-title">
  <div class="wrap narrow">
    <header class="sec-head"><p class="eyebrow">اشترك</p><h2 id="signup-title">افتح حسابك في دقيقة</h2></header>
    <form id="signup-form" class="form" action="api/signup" method="post" novalidate>
      <p class="hint">كل الخانات مطلوبة.</p>
      <div id="form-errors" class="summary" role="alert" hidden></div>

      <div class="field">
        <label for="name">الاسم</label>
        <input id="name" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="name-err">
        <p id="name-err" class="err"></p>
      </div>
      <div class="field">
        <label for="email">الإيميل</label>
        <p id="email-hint" class="hint">هنبعتلك عليه رسالة التأكيد.</p>
        <input id="email" name="email" type="email" autocomplete="email" dir="ltr" required aria-describedby="email-hint email-err">
        <p id="email-err" class="err"></p>
      </div>
      <div class="field">
        <label for="phone">الموبايل</label>
        <p id="phone-hint" class="hint">زي <bdi dir="ltr">01012345678</bdi>، والأرقام العربي تنفع.</p>
        <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr" required pattern="(\+20|0)1[0125][0-9]{8}" aria-describedby="phone-hint phone-err">
        <p id="phone-err" class="err"></p>
      </div>
      <div class="field">
        <label for="password">كلمة السر</label>
        <div class="pw">
          <input id="password" name="password" type="password" autocomplete="new-password" required minlength="8" aria-describedby="pw-rules password-err">
          <button class="pw-toggle" type="button" aria-controls="password" aria-pressed="false">اظهرها</button>
        </div>
        <ul id="pw-rules" class="rules">
          <li data-rule="len">٨ حروف على الأقل</li>
          <li data-rule="letter">حرف واحد على الأقل</li>
          <li data-rule="digit">رقم واحد على الأقل</li>
        </ul>
        <p id="password-err" class="err"></p>
      </div>
      <div class="field">
        <label for="plan">الباقة</label>
        <select id="plan" name="plan" required aria-describedby="plan-err">
          <option value="">اختار باقة</option>
          <option value="trial">تجربة (٢٤٠ جنيه في الشهر)</option>
          <option value="home">البيت (٤٤٠ جنيه في الشهر)</option>
          <option value="office">المكتب (٨٢٠ جنيه في الشهر)</option>
        </select>
        <p id="plan-err" class="err"></p>
      </div>
      <div class="field check">
        <input id="terms" name="terms" type="checkbox" required aria-describedby="terms-err">
        <label for="terms">موافق على شروط الاشتراك</label>
        <p id="terms-err" class="err"></p>
      </div>
      <button class="btn btn-primary submit" type="submit">افتح الحساب</button>
      <p id="form-status" class="form-status" role="status"></p>
    </form>
  </div>
</section>
~~~

### الـ HTML حتة حتة

- [[action="api/signup" method="post"]]: من غير JS الفورم بيتبعت عادي للسيرفر (progressive enhancement)، و [[action]] مسار نسبي (مش [[/api/signup]]) عشان يشتغل تحت مسار فرعي.
- [[novalidate]]: بيقفل فقاعات المتصفح (الإنجليزي) وقت الإرسال، بس المتصفح لسه بيحسب [[validity]] لكل خانة. لو الـ JS وقع، الفورم هيتبعت من غير تحقق في المتصفح، والسيرفر لازم يتحقق (وده لازم كده كده).
- [[autocomplete]] بقيم المواصفة ([[name]] و [[email]] و [[tel]] و [[new-password]]): المتصفح ومدير كلمات السر بيملوا ويولّدوا كلمة سر قوية. [[new-password]] بالذات بيقول «ده تسجيل مش دخول».
- الإيميل والموبايل [[dir="ltr"]]: الكلام اللاتيني بيتكتب وبيتعرض من الشمال، والـ label والإرشاد عربي عادي.
- [[minlength="2"]] و [[minlength="8"]]: المتصفح بيعرف الحد، واحنا بنقيسه بإيدنا كمان (تحت).
- كلمة السر جوه [[.pw]] مع زرار «اظهرها»: [[aria-controls="password"]] و [[aria-pressed]]. و [[aria-describedby="pw-rules password-err"]] بيقرا القواعد التلاتة والغلط.
- [[<select required>]] أول [[<option value="">]]: الاختيار الفاضي بيخلّي [[valueMissing]] لحد ما اليوزر يختار. والأسعار مكتوبة في كل اختيار عشان اليوزر ميرجعش للأسعار.
- الـ checkbox قبل الـ label (عادي في RTL و LTR)، و [[.check]] بيحطهم جنب بعض.
- [[type="submit"]] صريح، و [[role="status"]] للنتيجة بعده.

~~~css css/form.css
.form { display: grid; gap: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); padding: clamp(20px, 4vw, 36px); }
.field { display: grid; gap: 6px; }
.field label { font-weight: 700; }
.hint { margin: 0; font-size: .9rem; color: var(--muted); }
.field input, .field select { font: inherit; min-height: 48px; padding: 10px 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: var(--bg); color: var(--ink); width: 100%; }
.field input:focus-visible, .field select:focus-visible { outline: none; box-shadow: var(--ring); }
.field [aria-invalid="true"] { border-color: var(--err); border-width: 2px; }
.err { margin: 0; color: var(--err); font-weight: 700; font-size: .95rem; }
.err:empty { display: none; }
.err::before { content: "⚠ "; }

.pw { display: flex; gap: 8px; }
.pw input { flex: 1; min-width: 0; }
.pw-toggle { flex: none; font: inherit; min-height: 48px; padding-inline: 14px; border: 1px solid var(--muted); border-radius: var(--r-sm); background: none; color: var(--ink); cursor: pointer; }
.rules { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; font-size: .9rem; color: var(--muted); }
.rules li::before { content: "○ "; }
.rules li.ok { color: var(--ok); }
.rules li.ok::before { content: "✓ "; }

.check { grid-template-columns: auto 1fr; align-items: center; column-gap: 10px; }
.check input { width: 22px; height: 22px; min-height: 0; accent-color: var(--brand); }
.check .err { grid-column: 1 / -1; }

.summary { border: 2px solid var(--err); border-radius: var(--r-sm); padding: 12px 16px; }
.summary p { margin: 0 0 6px; font-weight: 700; }
.summary ul { margin: 0; padding-inline-start: 20px; }
.summary a { color: var(--err); font-weight: 700; }

.submit[aria-disabled="true"] { opacity: .7; cursor: progress; }
.form-status { margin: 0; font-weight: 700; }
.form-status.bad { color: var(--err); }
.form-status.good { color: var(--ok); }
~~~

- حدود الخانات [[--muted]] مش [[--line]]: WCAG بيطلب حدود الخانة تبان بتباين ٣ على الأقل (عشان تعرف فين تكتب)، و [[--line]] كان فاتح زيادة.
- [[:focus-visible { outline: none; box-shadow: var(--ring); }]]: الحلقة حلقتين (لون الخلفية ثم البراند) بتبان على أي خلفية. النسخة الأولى كانت [[:focus { outline: none; border-color: var(--brand); }]]: [[a11y.mjs]] لقى **٥ خانات من غير حلقة focus** (تغيير لون الحد بس صعب يتشاف).
- [[[aria-invalid="true"]]]: الخانة الغلط حدودها أحمر و ٢ بكسل. اللون مش لوحده: فيه كلام تحتها وعلامة [[⚠]].
- [[.err:empty { display: none; }]]: مكان الرسالة موجود دايمًا في الـ HTML (عشان [[aria-describedby]] يلاقيه) بس مبياخدش مساحة وهو فاضي.
- [[.pw input { flex: 1; min-width: 0; }]]: من غير [[min-width: 0]] الـ input ليه عرض أدنى من المتصفح وممكن يزق الزرار بره على ٣٢٠.
- [[accent-color: var(--brand)]]: لون الـ checkbox المتعلّم من البراند من غير ما نرسم checkbox بإيدنا.
- [[.check .err { grid-column: 1 / -1; }]]: رسالة الغلط تحت الـ checkbox والكلام بعرض الاتنين.

---

## digits.js: دوال صافية

~~~javascript js/digits.js
// دوال صافية (من غير DOM): بتتختبر في Node لوحدها
// الأرقام العربي (٠-٩) والفارسي (۰-۹) لأرقام إنجليزي، ومن غير مسافات وشُرط
export const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");

// قواعد كلمة السر: كل قاعدة function بترجّع true لو اتحققت
export const rules = {
  len: (v) => v.length >= 8,
  letter: (v) => /\p{L}/u.test(v),
  digit: (v) => /[0-9]/.test(normalizeDigits(v)),
};
~~~

- [[٠-٩]]: كود الحروف من «٠» لـ «٩» (Arabic-Indic digits)، و [[۰-۹]] من «۰» لـ «۹» (الفارسي، بيطلع من بعض الكيبوردات). [[d.charCodeAt(0) - 0x0660]] بيطلّع رقم من ٠ لـ ٩، و [[String()]] بيرجّعه حرف.
- [[.replace(/[\s-]/g, "")]]: بيشيل المسافات والشُرط، فـ [[010 1234 5678]] و [[010-1234-5678]] بيبقوا [[01012345678]].
- [[/\p{L}/u]]: أي حرف في أي لغة (عربي أو إنجليزي)، مش [[[a-z]]] بس. محتاج الـ flag [[u]].
- القاعدة [[digit]] بتشيّك بعد [[normalizeDigits]]، فـ «قهوة٢٠٢٦xx» فيها رقم.
- ملف لوحده من غير [[document]] = تقدر تختبره في Node (الـ [[ci]] بتاع الدرس ده بيعمل كده).

### الـ pattern اللي اشتغل على regex101 ووقع في Chrome

~~~text Console في Chrome 156 (النسخة الأولى)
Pattern attribute value (\+20|0)1[0125][0-9-]{8,9} is not a valid regular expression: Uncaught SyntaxError: Failed to read the 'patternMismatch' property from 'ValidityState': Invalid regular expression: /(\+20|0)1[0125][0-9-]{8,9}/v: Invalid character class
~~~

~~~text نفس الـ pattern في Node بالـ flag u وبالـ flag v
u (\+20|0)1[0125][0-9-]{8,9} ok 01012345678=true +201012345678=true 123=false 0101234567=false
v (\+20|0)1[0125][0-9-]{8,9} ERROR Invalid regular expression: /^(?:(\+20|0)1[0125][0-9-]{8,9})$/v: Invalid character class
u (\+20|0)1[0125][0-9]{8} ok 01012345678=true +201012345678=true 123=false 0101234567=false
v (\+20|0)1[0125][0-9]{8} ok 01012345678=true +201012345678=true 123=false 0101234567=false
~~~

بـ [[u]] (اللي regex101 ومعظم المواقع بتستخدمه) الـ [[-]] في آخر [[[0-9-]]] حرف عادي. بـ [[v]] (اللي Chrome بيستخدمه للـ pattern) لازم [[\-]]. ولما الـ pattern غلط، المتصفح **مبيقولش للزائر** حاجة: بيعتبر الخانة صح، و [[123]] عدّى. الحل: منحطش شُرط ومسافات في الـ pattern خالص، وننضّفهم بـ [[normalizeDigits]] قبل التحقق. والـ [[lint.mjs]] (درس النشر) بيجرّب كل [[pattern]] في الصفحة بـ [[new RegExp(..., "v")]] عشان الغلطة دي متعديش تاني.

وبعد التصليح، من غير normalize، القيم دي اتقاست مباشرة على الخانة:

~~~text phone.validity.patternMismatch بالـ pattern الصح
'٠١٠١٢٣٤٥٦٧٨': 'patternMismatch'
'01012345678': 'ok'
'010 1234 5678': 'patternMismatch'
'123': 'patternMismatch'
~~~

يعني رقم صح بكيبورد عربي كان هيترفض. بعد [[blur]] الخانة بقت [[01012345678]].

---

## form.js

~~~javascript js/form.js
// فورم التسجيل: الـ Constraint API بيقول إيه الغلط، واحنا بنكتب الرسالة بالعربي في مكانها
import { normalizeDigits, rules } from "./digits.js";

const form = document.getElementById("signup-form");
const summary = document.getElementById("form-errors");
const status = document.getElementById("form-status");
const submit = form.querySelector(".submit");
const pw = document.getElementById("password");
const phone = document.getElementById("phone");

const messages = {
  name: { valueMissing: "اكتب اسمك", tooShort: "الاسم لازم يبقى حرفين على الأقل" },
  email: { valueMissing: "اكتب إيميلك", typeMismatch: "الإيميل ناقصه حاجة، زي name@example.com" },
  phone: { valueMissing: "اكتب رقم الموبايل", patternMismatch: "الرقم لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويبقى ١١ رقم" },
  password: { valueMissing: "اختار كلمة سر", tooShort: "كلمة السر لازم تبقى ٨ حروف على الأقل", customError: "كلمة السر محتاجة حرف ورقم" },
  plan: { valueMissing: "اختار باقة" },
  terms: { valueMissing: "لازم توافق على الشروط عشان نكمل" },
};
const order = ["valueMissing", "typeMismatch", "patternMismatch", "tooShort", "customError"];

function messageFor(el) {
  const m = messages[el.name] || {};
  // minlength مبيتحسبش لو القيمة اتحطت من JS (مش من الكيبورد)، فبنقيسها بإيدنا كمان
  const key = order.find((k) => el.validity[k]) || (el.value && el.value.length < el.minLength ? "tooShort" : "");
  return key ? (m[key] || el.validationMessage) : "";
}

function check(el) {
  if (el === pw) pw.setCustomValidity(pw.value && !(rules.letter(pw.value) && rules.digit(pw.value)) ? "x" : "");
  const msg = messageFor(el);
  document.getElementById(el.id + "-err").textContent = msg;
  if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  return !msg;
}

const fields = [...form.elements].filter((el) => el.name && el.willValidate);
phone.addEventListener("blur", () => { phone.value = normalizeDigits(phone.value); });
for (const el of fields) {
  el.addEventListener("blur", () => { if (el.value || el.hasAttribute("aria-invalid")) check(el); });
  el.addEventListener("input", () => { if (el.hasAttribute("aria-invalid")) check(el); });
}
pw.addEventListener("input", () => {
  for (const li of form.querySelectorAll("[data-rule]")) li.classList.toggle("ok", rules[li.dataset.rule](pw.value));
});
const toggle = form.querySelector(".pw-toggle");
toggle.addEventListener("click", () => {
  const show = pw.type === "password";
  pw.type = show ? "text" : "password";
  toggle.setAttribute("aria-pressed", String(show));
  toggle.textContent = show ? "اخفيها" : "اظهرها";
});

function showSummary(bad) {
  const title = document.createElement("p");
  title.textContent = bad.length === 1 ? "فيه خانة واحدة محتاجة تتصلّح:" : "فيه " + bad.length.toLocaleString("ar-EG") + " خانات محتاجة تتصلّح:";
  const list = document.createElement("ul");
  for (const el of bad) {
    const a = document.createElement("a");
    a.href = "#" + el.id;
    a.textContent = document.getElementById(el.id + "-err").textContent;
    const li = document.createElement("li");
    li.append(a);
    list.append(li);
  }
  summary.replaceChildren(title, list);
  summary.hidden = false;
}
summary.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a) { e.preventDefault(); document.querySelector(a.getAttribute("href")).focus(); }
});

function setBusy(on) {
  form.toggleAttribute("aria-busy", on);
  if (on) submit.setAttribute("aria-disabled", "true"); else submit.removeAttribute("aria-disabled");
  submit.textContent = on ? "بنفتح الحساب…" : "افتح الحساب";
}

let busy = false;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (busy) return;
  phone.value = normalizeDigits(phone.value);
  const bad = fields.filter((el) => !check(el));
  if (bad.length) { showSummary(bad); bad[0].focus(); return; }
  summary.hidden = true;
  busy = true;
  setBusy(true);
  status.className = "form-status";
  status.textContent = "";
  try {
    const res = await fetch(form.action, { method: "POST", body: new URLSearchParams(new FormData(form)) });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      status.className = "form-status good";
      status.textContent = "تمام! بعتنالك رسالة تأكيد على " + form.elements.email.value;
      form.reset();
      form.querySelectorAll(".ok").forEach((li) => li.classList.remove("ok"));
    } else if (data.field && form.elements[data.field]) {
      const el = form.elements[data.field];
      document.getElementById(el.id + "-err").textContent = data.message;
      el.setAttribute("aria-invalid", "true");
      el.focus();
    } else {
      throw new Error("HTTP " + res.status);
    }
  } catch {
    status.className = "form-status bad";
    status.textContent = "مقدرناش نوصل للسيرفر، اتأكد من النت وجرّب تاني.";
  } finally {
    busy = false;
    setBusy(false);
  }
});
~~~

### الرسايل: من نوع الغلط للكلام

- [[messages]]: لكل خانة (بالـ [[name]]) رسالة لكل نوع غلط ممكن يحصل لها. رسايل بتقول **تعمل إيه**، مش «القيمة غير صالحة».
- [[order]]: لو فيه أكتر من غلط (خانة فاضية كمان بتبقى [[tooShort]]؟ لأ، بس ممكن [[valueMissing]] و [[customError]] مع بعض)، بنعرض أهمهم الأول.
- [[order.find((k) => el.validity[k])]]: أول flag قيمته [[true]]. وبعده [[|| (el.value && el.value.length < el.minLength ? "tooShort" : "")]]: الحالة اللي المتصفح مبيمسكهاش (تحت).
- [[m[key] || el.validationMessage]]: لو نسينا رسالة لنوع، نرجع لرسالة المتصفح بدل ما الغلط يعدّي ساكت.

~~~text el.validationMessage في Chrome بـ locale: "ar-EG"
nameMsg: "Please fill out this field."
emailMsg: "Please enter a part following '@'. 'mona@' is incomplete."
~~~

رسايل المتصفح بلغة واجهة المتصفح نفسه مش بلغة الصفحة ولا [[navigator.language]] (اللي كان [[ar-EG]] في نفس الاختبار). عشان كده كاتبينها بإيدنا.

### [[minlength]] والقيمة اللي بتتحط بالكود

~~~text نفس الخانة، حرف واحد
value= from JS : {"tooShort":false,"valid":true}
typed (fill)   : {"tooShort":true,"valid":false}
~~~

المواصفة بتقول [[tooShort]] بيتحسب بس لو القيمة اتغيّرت من اليوزر. فلو مدير كلمات سر أو إضافة أو كود حطّ قيمة قصيرة، الخانة «صح». السطر اللي في [[messageFor]] بيقيس الطول بإيدنا للحالة دي. ودي كمان فخ في الاختبارات: [[el.value = "م"]] في اختبار مش هيطلّع الغلط، و [[page.fill()]] بيطلّعه.

### إمتى الغلط يظهر

- [[blur]] (خرجت من الخانة) و فيها قيمة: بنتحقق. مش وانت بتكتب أول حرف، لأن «الإيميل ناقصه حاجة» وانت لسه بتكتب [[m]] مزعجة.
- [[input]] (بتكتب) **و** الخانة عليها غلط: بنتحقق مع كل حرف، فالرسالة بتختفي أول ما تتصلّح.
- الإرسال: كل الخانات مرة واحدة.

### الملخص والـ focus

- [[showSummary]] بتبني الملخص بـ [[createElement]] و [[textContent]] مش [[innerHTML]]: الرسايل دي من عندنا، بس رسالة السيرفر ([[data.message]]) بتتكتب بنفس الطريقة، ولو جه فيها [[<img onerror>]] من يوزر هتتعرض كلام مش كود.
- [[summary.hidden = false]] جوه [[role="alert"]]: قارئ الشاشة بيقرا «فيه ٦ خانات محتاجة تتصلّح» أول ما يظهر.
- [[bad[0].focus()]]: الـ focus على أول خانة غلط، فقارئ الشاشة بيقرا اسمها والإرشاد والغلط ([[aria-describedby]])، واللي بيكتب بالكيبورد بيصلّح على طول.
- لينكات الملخص: [[e.preventDefault()]] و [[.focus()]] على الخانة، لأن القفز لـ [[#id]] لوحده بيعمل scroll بس من غير focus.
- [[bad.length.toLocaleString("ar-EG")]] = «٦» مش «6» في جملة عربي، وخانة واحدة ليها جملة مفرد.

### الإرسال: مرة واحدة بس

- [[busy]]: flag بيرجّع من الـ handler لو فيه طلب شغال، فضغطتين = طلب واحد (اتقاس بعدد الـ POST في Playwright).
- [[aria-disabled="true"]] مش [[disabled]]:

~~~text Tab من الخانة اللي قبل الزرار
disabled       Tab from input lands on: z
aria-disabled  Tab from input lands on: d
~~~

[[disabled]] بيطلّع الزرار من ترتيب الـ Tab، فاللي بيستخدم الكيبورد أو قارئ الشاشة مش هيلاقيه وهو بيتبعت، ومش هيسمع «بنفتح الحساب…». [[aria-disabled]] بيسيبه في مكانه ويقول «unavailable»، والـ [[busy]] هو اللي بيمنع.
- [[form.toggleAttribute("aria-busy", on)]]: الفورم «مشغول» لحد ما الرد يوصل.
- [[new URLSearchParams(new FormData(form))]]: [[FormData]] بيجمع كل الخانات اللي ليها [[name]]، و [[URLSearchParams]] بيحوّلها لنفس شكل الفورم العادي ([[name=...&email=...]]) اللي السيرفر بيفكه.
- [[res.json().catch(() => ({}))]]: لو الرد مش JSON (مثلًا صفحة 404 HTML) منقعش، نعتبره فاضي.
- [[data.field]]: السيرفر بيقول الغلط في أنهي خانة ([[{ field: "email", message: "..." }]])، فبنحطه تحتها ونركّز عليها. ده شكل متفق عليه بين الفورم والسيرفر.
- [[catch]]: أي حاجة تانية (مفيش نت، أو 500، أو 405 من استضافة static) = رسالة واحدة واضحة في [[role="status"]] اتجرّب بإن Playwright رجّع للطلب [[405]] وصفحة HTML بدل JSON ([[page.route]] و [[fulfill]]): الحالة بقت [[form-status bad]] والرسالة دي ظهرت والزرار رجع «افتح الحساب». وده اللي هيحصل على GitHub Pages لحد ما توصل الفورم بـ backend حقيقي، لأنها ملفات static بس ومفيش كود بتاعك بيستقبل POST.
- [[finally]]: الزرار بيرجع لحالته في كل الحالات، حتى لو حصل خطأ.

---

## form-test.mjs: بيسوق الفورم زي يوزر

~~~javascript tools/form-test.mjs
// بيسوق الفورم زي يوزر حقيقي: node tools/form-test.mjs http://127.0.0.1:5173/
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ locale: "ar-EG" });
const posts = [];
page.on("request", (r) => { if (r.method() === "POST") posts.push(r.url()); });
await page.goto(url);
const state = () => page.evaluate(() => ({
  focused: document.activeElement.id || document.activeElement.tagName,
  invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.id).join(","),
  summary: document.getElementById("form-errors").hidden ? "" : document.getElementById("form-errors").innerText.replace(/\n+/g, " / "),
}));
let fail = 0;
const expect = (label, ok, got) => { console.log(ok ? "PASS" : "FAIL", label, ok ? "" : "→ " + JSON.stringify(got)); if (!ok) fail++; };

// ١. إرسال فاضي
await page.click(".submit");
let s = await state();
expect("empty: 6 invalid, focus on name", s.invalid.split(",").length === 6 && s.focused === "name", s);
console.log("   summary:", s.summary);
// ٢. رقم بالأرقام العربي
await page.fill("#phone", "٠١٠١٢٣٤٥٦٧٨");
await page.locator("#phone").blur();
const phone = await page.evaluate(() => { const el = document.getElementById("phone"); return { v: el.value, ok: el.validity.valid }; });
expect("arabic digits normalized and valid", phone.v === "01012345678" && phone.ok, phone);
// ٣. رقم قصير
await page.fill("#phone", "0101234");
await page.locator("#phone").blur();
expect("short phone message", (await page.textContent("#phone-err")).includes("١١ رقم"), await page.textContent("#phone-err"));
// ٤. باسورد من غير رقم
await page.fill("#password", "abcdefgh");
await page.locator("#password").blur();
const pwErr = await page.textContent("#password-err");
expect("password needs a digit", pwErr === "كلمة السر محتاجة حرف ورقم", pwErr);
const ruleOk = await page.$$eval("[data-rule].ok", (l) => l.map((x) => x.dataset.rule).join(","));
expect("rules list shows len,letter", ruleOk === "len,letter", ruleOk);
// ٥. كله صح، والضغط مرتين
await page.fill("#name", "منى");
await page.fill("#email", "mona@example.com");
await page.fill("#phone", "01012345678");
await page.fill("#password", "bunn2026");
await page.selectOption("#plan", "home");
await page.check("#terms");
await page.click(".submit");
await page.click(".submit", { force: true });
const during = await page.evaluate(() => ({ text: document.querySelector(".submit").textContent, aria: document.querySelector(".submit").getAttribute("aria-disabled"), focused: document.activeElement.className }));
expect("busy state while sending", during.text === "بنفتح الحساب…" && during.aria === "true" && during.focused.includes("submit"), during);
await page.waitForFunction(() => document.getElementById("form-status").textContent);
expect("one POST only", posts.length === 1, posts);
console.log("   status:", await page.textContent("#form-status"));
// ٦. إيميل عليه حساب (السيرفر بيرجّع 409)
await page.fill("#name", "منى"); await page.fill("#email", "taken@example.com"); await page.fill("#phone", "01012345678");
await page.fill("#password", "bunn2026"); await page.selectOption("#plan", "home"); await page.check("#terms");
await page.click(".submit");
await page.waitForFunction(() => document.getElementById("email-err").textContent);
s = await state();
expect("409 → error on email and focus", s.focused === "email" && s.invalid === "email", s);
console.log("   email-err:", await page.textContent("#email-err"));
await browser.close();
process.exit(fail ? 1 : 0);
~~~

- [[page.on("request", ...)]] بيعد كل طلب [[POST]]، فاختبار «طلب واحد بس» رقم مش إحساس.
- [[page.click(".submit", { force: true })]]: التانية بـ [[force]] عشان Playwright ميستناش الزرار «يبقى enabled» (لو كان [[disabled]] كان هيستنى ويقع بـ timeout).
- [[page.waitForFunction(() => ...textContent)]]: بيستنى لحد ما الرد يوصل ويتكتب، بدل [[waitForTimeout(1000)]] اللي ممكن يبقى قليل أو كتير.
- اختبار الأرقام العربي بـ [[page.fill]] و [[blur()]]: نفس اللي اليوزر بيعمله، فالـ [[blur]] handler بيتنده.

ومعاه axe على الفورم وفيه الـ ٦ أخطاء ظاهرة (الألوان الحمرا لازم تعدّي التباين هي كمان):

~~~text axe على #signup-form بعد إرسال فاضي
light form with 6 errors → violations: 0 | phone description: زي 01012345678، والأرقام العربي تنفع. | اكتب رقم الموبايل
dark form with 6 errors → violations: 0 | phone description: زي 01012345678، والأرقام العربي تنفع. | اكتب رقم الموبايل
~~~

الـ «description» هو اللي قارئ الشاشة بيقراه بعد «الموبايل، خانة تعديل»: الإرشاد ثم الغلط، بنفس ترتيب [[aria-describedby]].

---

## الأمان: المتصفح بيساعد، والسيرفر بيقرر

- كل اللي فوق ممكن يتعدّى: DevTools، أو [[curl -X POST]] من غير الصفحة. فالسيرفر لازم يتحقق من نفس القواعد ويرجّع [[{ field, message }]] بنفس الشكل (مشروع «كبير» في الوحدة).
- الـ API التجريبي بيكتب في اللوج الإيميل والباقة **من غير الباسورد**: [[POST signup mona@example.com home]].
- كلمة السر بتتبعت على HTTPS بس (GitHub Pages HTTPS افتراضي)، وبتتخزن hash (argon2 أو bcrypt) على السيرفر، أبدًا نص.

---

## الغلطات اللي حصلت في الخطوة دي

| الغلطة | اتمسكت إزاي | قبل | بعد |
|---|---|---|---|
| [[[0-9-]]] في الـ pattern | Console و [[lint.mjs]] | [[123]] صح | [[patternMismatch]]، والـ lint بيجرّب كل pattern بـ [[v]] |
| رسايل المتصفح | [[validationMessage]] بـ [[ar-EG]] | [[Please fill out this field.]] | «اكتب اسمك» |
| أرقام عربي | [[validity]] بالـ pattern الصح | [[patternMismatch]] لرقم صح | [[normalizeDigits]] = صح |
| [[minlength]] بالكود | [[tooShort]] قبل وبعد fill | [[false]] | بنقيس الطول بإيدنا |
| [[:focus]] بلون الحد بس | [[a11y.mjs]] | ٥ خانات من غير حلقة | صفر |
| [[export]] في سكربت عادي | Console | [[Unexpected token 'export']] | [[type="module"]] |
| [[browser.newPage()]] مع axe | الاختبار نفسه وقع | [[Error: Please use browser.newContext()]] | [[newContext()]] ثم [[newPage()]] |

---

## خلاصة

- label لكل خانة، وإرشاد ظاهر، ومكان غلط موجود دايمًا، والتلاتة مربوطين بـ [[for]] و [[aria-describedby]].
- [[novalidate]] + [[validity]] + رسالة عربي لكل نوع + [[aria-invalid]].
- ملخص [[role="alert"]] ولينكات بتركّز، و focus على أول غلط، ونتيجة في [[role="status"]].
- pattern من غير [[-]] و normalize للأرقام العربي، واختبر الـ pattern بالـ flag [[v]].
- إرسال واحد بـ flag و [[aria-disabled]]، ورد السيرفر بيرجع للخانة بتاعته، والسيرفر بيتحقق تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[<input type="email" required>]] فيه [[mona@site]] (من غير [[.com]]). [[validity.typeMismatch]] هيرجّع إيه؟ وفي [[<input type="url">]] [[example.com]] من غير [[https://]]؟ جرّب في الـ Console.`, done: R`كتبت توقعك، وجرّبت: [[mona@site]] إيميل صح عند المتصفح (المواصفة مبتطلبش نقطة في الدومين)، و [[example.com]] في url غلط. وكتبت إن ده سبب إن السيرفر لازم يتحقق بقواعده.` },
            { lvl: 'تطبيق', t: R`**ابني:** خانة «تأكيد كلمة السر» بتتحقق إنها زي الأولى بـ [[setCustomValidity]] ورسالة عربي، ومتظهرش غلط قبل ما اليوزر يخرج منها، وتتحدث لو غيّر الأولى بعدها.`, done: R`[[form-test.mjs]] فيه ٣ حالات جديدة PASS: مختلفة = «كلمتين السر مش زي بعض»، ومتطابقة = صح، وتغيير الأولى بعد ما التانية صح بيرجّع الغلط على التانية، و axe صفر.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<input placeholder="الإيميل" style="border-color: red">]] و [[<span class="error">مطلوب</span>]] تحتها من غير أي ربط، والزرار [[<div onclick="send()">إرسال</div>]]. صلّح كل حاجة وأثبت بـ axe وبـ Tab.`, done: R`فيه label بـ for، و [[aria-describedby]] بيربط الغلط، و [[aria-invalid]] بدل اللون بس، والزرار [[<button type="submit">]] بيوصله Tab ويشتغل بـ Enter و Space، و axe صفر، وكتبت ٤ أسباب للتغيير.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[normalizePhone(s)]] أشمل: بتقبل [[+20 10 1234 5678]] و [[0020...]] و [[(010) 1234-5678]] و الأرقام العربي، وترجع دايمًا [[01xxxxxxxxx]] أو [[null]] لو مش رقم موبايل مصري. واكتب ١٠ اختبارات في Node بـ [[node:test]] و [[assert]].`, done: R`[[node --test]] بيطبع ١٠ pass، منها: [[0020]] بيتحول، و [[+2010]] بيتحول، و [[٠١٣...]] بيرجّع null (مفيش 013)، و [[010123]] قصير بيرجّع null.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل [[form-test.mjs]] مرتين: مرة عادي، ومرة بعد ما تغيّر [[aria-disabled]] لـ [[submit.disabled = on]] في [[setBusy]]. إيه اللي اتغيّر في الناتج؟ ولو اختبار وقع، ليه بالظبط؟`, done: R`كتبت إن اختبار «busy state» اتغيّر لأن الـ focus مبقاش على الزرار أو إن [[click]] التانية بـ [[force]] معملتش حاجة، ورجعت للكود الأصلي وكل حاجة PASS، ومعاك الناتجين.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من مواصفة HTML (أو MDN) عن [[autocomplete]]: إيه الفرق بين [[current-password]] و [[new-password]] و [[one-time-code]]؟ وفين كل واحدة تتحط؟`, done: R`كتبت التلاتة: الدخول [[current-password]]، والتسجيل وتغيير كلمة السر [[new-password]] (المتصفح بيقترح كلمة قوية)، وكود الـ SMS [[one-time-code]] (iOS وأندرويد بيقترحوه من الرسالة)، ومعاك الرابط.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const normalizeDigits = (s) => s
  .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
  .replace(/[\s-]/g, "");
const rules = { len: (v) => v.length >= 8, letter: (v) => /\p{L}/u.test(v), digit: (v) => /[0-9]/.test(normalizeDigits(v)) };
for (const p of ["([+]20|0)1[0125][0-9-]{8,9}", "([+]20|0)1[0125][0-9]{8}"]) {
  try { new RegExp("^(?:" + p + ")$", "v"); console.log("v flag ok: " + p); }
  catch (e) { console.log("v flag error: Invalid character class? " + /Invalid character class/.test(e.message)); }
}
const phone = new RegExp("^(?:([+]20|0)1[0125][0-9]{8})$", "v");
for (const raw of ["٠١٠١٢٣٤٥٦٧٨", "010 1234 5678", "۰۱۱۲۳۴۵۶۷۸۹", "+201512345678", "0131234567", "123"]) {
  const v = normalizeDigits(raw);
  console.log(raw + " -> " + v + " " + (phone.test(v) ? "valid" : "invalid"));
}
for (const pw of ["abcdefgh", "bunn2026", "قهوة٢٠٢٦xx", "1234567"]) console.log(pw + ": " + Object.entries(rules).filter(([, f]) => f(pw)).map(([k]) => k).join(","));`, expect: [R`v flag error: Invalid character class? true`, R`v flag ok: ([+]20|0)1[0125][0-9]{8}`, R`٠١٠١٢٣٤٥٦٧٨ -> 01012345678 valid`, R`010 1234 5678 -> 01012345678 valid`, R`۰۱۱۲۳۴۵۶۷۸۹ -> 01123456789 valid`, R`+201512345678 -> +201512345678 valid`, R`0131234567 -> 0131234567 invalid`, R`123 -> 123 invalid`, R`abcdefgh: len,letter`, R`bunn2026: len,letter,digit`, R`قهوة٢٠٢٦xx: len,letter,digit`, R`1234567: digit`] },
          ],
        },
        {
          cmd: "landing page: مصفوفة المقاسات والأداء",
          title: "مصفوفة ٦ مقاسات من ٣٢٠ لـ ١٤٤٠ من غير scroll أفقي، و FCP و LCP و CLS ووميض الثيم بـ Chrome على شبكة بطيئة، وتجارب «تحسين» مفرقتش",
          learn: R`تحوّل «شغالة على الموبايل؟» و «سريعة؟» لسكربتين بيطبعوا أرقام ويخرجوا بـ 1 لو فيه مشكلة، وتعرف تقرا الأرقام دي وتفرّق بين تحسين حقيقي وصدفة.`,
          out: R`[[matrix.mjs]] (٦ مقاسات، والعناصر الخارجة باسمها) و [[perf.mjs]] (شبكة ١٥٠ms و 1.6Mbps و CPU أبطأ ٤ مرات). النهائي: ٦ [[OK]]، و LCP حوالي ١٫١ ثانية، و CLS صفر حتى والصور بطيئة، والثيم قبل أول رسمة، والصفحة ٤٤ كيلو على ٣٦٠.`,
          desc: R`البناء خلص. دلوقتي **بنقيس الصفحة كلها** بأداتين:

• **[[matrix.mjs]]:** بيفتح الصفحة على ٣٢٠ و ٣٦٠ و ٤١٤ و ٧٦٨ و ١٠٢٤ و ١٤٤٠، ويعمل سكرول للآخر (عشان كل حاجة تظهر)، ويقارن [[scrollWidth]] بعرض الشاشة، ولو فيه زيادة بيطبع أول ٤ عناصر خارجة باسم الـ tag والـ class والعرض. النسخة الأولى: الـ ٥ مقاسات المطلوبة (٣٦٠ لـ ١٤٤٠) كلهم [[OK]]، وده كان هيعدّي. زودنا ٣٢٠ (أصغر موبايل منتشر، وهو كمان العرض اللي WCAG بيطلب الصفحة تشتغل عليه من غير scroll أفقي لما حد يكبّر ٤٠٠٪) فطلع [[BROKEN +31px]] بسببين: زرار «اشترك» اللي كان المفروض يستخبى (ترتيب الـ CSS)، وكروت الأسعار [[minmax(320px)]]. النهائي: الـ ٦ [[OK]].
• **[[perf.mjs]]:** بيقيس FCP (أول رسمة) و LCP (أكبر عنصر اترسم وإمتى) و CLS (مجموع التنطيط) ووقت الثيم وحجم كل نوع ملفات، على شبكة بطيئة متعرّفة في السكربت. على السيرفر العادي الاتنين (الأولى والنهائية) LCP حوالي ١٫١ ثانية و CLS صفر، يعني الفرق مش باين. على سيرفر الصور فيه متأخرة ١٫٥ ثانية: الأولى CLS **٠٫٠٩٥٧** ووميض في الثيم، والنهائية **صفر** ومن غير وميض.

وجرّبنا تحسينين مشهورين وطلعوا **مفرقوش**: دمج الـ ٣ ملفات CSS في ملف واحد (FCP ١١١٦–١١٤٤ مقابل ١٠٧٦–١١٠٤ms من غير دمج)، و preload لصورة الـ hero (١١١٢–١١٣٦ مقابل ١٠٧٦–١١١٢ms). فمعملناهمش. القاعدة: كل «تحسين» بيتقاس ٣ مرات قبل ما يدخل.`,
          example: R`node tools/serve.mjs 5173
SLOW_IMG=1500 node tools/serve.mjs 5174
node tools/matrix.mjs http://127.0.0.1:5173/
node tools/perf.mjs http://127.0.0.1:5173/ 360
node tools/perf.mjs http://127.0.0.1:5174/ 1440
node tools/matrix.mjs http://127.0.0.1:5173/ && echo "no horizontal scroll"`,
          lines: [
            R`السيرفر العادي على [[5173]] في ترمنال لوحده (بيفضل شغال لحد [[Ctrl+C]]).`,
            R`سيرفر تاني على [[5174]] الصور فيه بتتأخر ١٥٠٠ms. في PowerShell: [[$env:SLOW_IMG=1500; node tools/serve.mjs 5174]] (وبعدين [[Remove-Item Env:SLOW_IMG]] عشان ميفضلش للأوامر اللي بعده).`,
            R`المصفوفة: ٦ أسطر، [[OK]] أو [[BROKEN +Npx]] ومعاه العناصر الخارجة، وكود خروج 1 لو أي مقاس مكسور.`,
            R`الأداء على عرض ٣٦٠ (الرقم بعد الرابط هو العرض)، والناتج FCP و LCP وعنصره و CLS ووقت الثيم والأحجام.`,
            R`نفس القياس على ١٤٤٠ والصور متأخرة: ده الظرف اللي كشف الـ CLS والوميض في النسخة الأولى.`,
            R`[[&&]] بيكمّل بس لو المصفوفة خرجت بـ 0، فده شكل الأمر في CI أو قبل ما تعمل push.`,
          ],
          try: R`شغّل السيرفرين والأداتين على نسختك. وبعدين اكسرها قصد بحاجة من دول واحدة واحدة وشوف المصفوفة بتمسكها في أنهي مقاس: [[width: 100vw]] على الـ CTA، و [[minmax(320px, 1fr)]] في الأسعار، و [[white-space: nowrap]] على الإيميل في الـ footer، و [[.top-cta { display: none }]] قبل [[.btn]]. وقيس [[perf.mjs]] ٣ مرات على كل سيرفر واكتب أقل وأكبر رقم.`,
          sol: R`[[minmax(320px)]] بيقع على ٣٢٠ بس وبيطبع [[article.plan 320px]]. [[100vw]] على ويندوز (scrollbar عرضه ١٥ بكسل تقريبًا في Chrome العادي) بيبقى أعرض من الصفحة على الديسكتوب، وفي الـ headless (من غير scrollbar ظاهر) ممكن ميبانش: لو مبانش، ده نفسه درس إن الأداة ليها حدود. الإيميل بـ [[nowrap]] بيقع لو الإيميل أطول من العمود. وترتيب [[.top-cta]] بيقع على ٣٢٠ بـ [[a.btn.btn-primary.top-cta 90px]]. والأداء: الأرقام بتتحرك ٣٠–٧٠ms بين المرات، فأي فرق أصغر من كده بين نسختين مش فرق.`,
          flag: "script",
          deep: {
            why: R`«بصيت عليها على موبايلي وشغالة» معناها مقاس واحد وشبكة واحدة وجهاز واحد. الـ scroll الأفقي على الموبايل من أكتر الحاجات اللي بتخلّي الصفحة تبان «بايظة»، وبيجي من عنصر واحد عرضه ثابت. والأداء على شبكة سريعة وجهاز قوي بيدّيك أرقام حلوة مش حقيقية. السكربتين دول بيخلّوا كل push يتقاس بنفس الطريقة، فلو حد زوّد صورة من غير مقاس أو [[min-width: 400px]]، الـ CI يقع قبل ما زبون يشوفها.`,
            how: R`المصفوفة: [[document.documentElement.scrollWidth]] هو عرض كل المحتوى، و [[clientWidth]] عرض الشاشة من غير scrollbar، والفرق بينهم = الـ scroll الأفقي. وبعدين بنعدّي على كل عنصر ونشوف [[getBoundingClientRect()]]: لو [[right]] أكبر من العرض أو [[left]] أقل من صفر (مهمة في RTL، العنصر بيطلع من الشمال). الأداء: [[PerformanceObserver]] بيسمع لـ [[paint]] (FCP) و [[largest-contentful-paint]] (كل مرة عنصر أكبر يترسم، والأخير هو الـ LCP) و [[layout-shift]] (كل تنطيط بقيمته والعناصر اللي اتحركت، ومن غيرها اللي بعد ضغطة يوزر [[hadRecentInput]]). وبيتسجّلوا من [[addInitScript]] عشان يبدأوا قبل أي كود في الصفحة. والـ throttling من CDP: [[Network.emulateNetworkConditions]] (تأخير كل طلب وسرعة التحميل) و [[Emulation.setCPUThrottlingRate]] (الـ CPU أبطأ ٤ مرات).`,
            when: R`قبل أي تسليم، وفي CI على كل push، وبعد أي تغيير في الـ layout أو الصور أو الخطوط. وللأرقام اللي هتقولها لعميل، اعمل كمان Lighthouse أو PageSpeed Insights (فيهم بيانات CrUX من يوزرز حقيقيين لو الموقع عليه زيارات)، لأن سكربتك بيقيس معمل مش ميدان.`,
            mistakes: R`تقيس ٣٦٠ لحد ١٤٤٠ بس فـ ٣٢٠ يعدّي. أو تقيس من غير سكرول فالعناصر اللي بتظهر مع السكرول متتحسبش. أو [[overflow-x: hidden]] على الـ body بدل ما تلاقي العنصر (بيخبّي العرض، وبيكسر الـ sticky). أو تقيس الأداء مرة واحدة وتقول «أسرع ٤٠ms». أو تقيس على شبكة سريعة بس. أو [[scroll-behavior: smooth]] في الصفحة والسكربت بيعمل [[scrollTo]] عادي (بيتحرك بنعومة ومش بيوصل في الوقت). أو تنسى إن الـ headless مفيهوش scrollbar فـ [[100vw]] ممكن ميتمسكش.`
          },
          teach: R`## matrix.mjs

~~~javascript tools/matrix.mjs
// مصفوفة المقاسات: node tools/matrix.mjs http://127.0.0.1:5173/
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const widths = [320, 360, 414, 768, 1024, 1440];
const browser = await chromium.launch({ channel: "chrome" });
let bad = 0;
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 150)); } scrollTo({ top: 0, behavior: "instant" }); });
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [...document.querySelectorAll("body *")].filter((el) => {
      const b = el.getBoundingClientRect();
      return b.width && (b.right > vw + 0.5 || b.left < -0.5);
    }).map((el) => el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : "") + " " + Math.round(el.getBoundingClientRect().width) + "px");
    return { overflow: document.documentElement.scrollWidth - vw, out: out.slice(0, 4) };
  });
  console.log(String(w).padEnd(5), r.overflow > 0 ? "BROKEN +" + r.overflow + "px  " + r.out.join(" | ") : "OK");
  if (r.overflow > 0) bad++;
  await page.close();
}
await browser.close();
process.exit(bad ? 1 : 0);
~~~

### سطر سطر

- [[widths]]: الخمسة اللي في الطلب (٣٦٠ و ٤١٤ و ٧٦٨ و ١٠٢٤ و ١٤٤٠) + ٣٢٠. لو عندك media query عند ٧٦٠، زوّد ٧٦٠ و ٧٦١ (الحد من الناحيتين).
- [[browser.newPage({ viewport: { width: w, height: 800 } })]]: صفحة جديدة لكل مقاس عشان مفيش حاجة تفضل من المقاس اللي قبله (القايمة مفتوحة مثلًا).
- السكرول: خطوات ٤٠٠ بكسل، و [[behavior: "instant"]]، و ١٥٠ms بين كل خطوة. **ليه كل ده؟** الصفحة عليها [[scroll-behavior: smooth]]، فـ [[scrollTo(0, y)]] العادي كان بيبدأ حركة ناعمة والخطوة اللي بعدها تقطعها قبل ما توصل، وبخطوات ٣٠ms ٧ عناصر من ١٠ عمرهم ما ظهروا (اتقاس في درس الحركة). [[instant]] بيتجاهل الـ smooth، و ١٥٠ms بيدّي الـ IntersectionObserver frames كفاية.
- [[document.documentElement.clientWidth]]: عرض الشاشة من غير الـ scrollbar. ([[innerWidth]] بيشمله.)
- [[b.right > vw + 0.5 || b.left < -0.5]]: نص بكسل سماح للتقريب. و [[left < 0]] مهمة جدًا في RTL: العنصر العريض بيطلع من **الشمال** والصفحة بتتسكرل للشمال.
- [[el.className && typeof el.className === "string"]]: عناصر SVG [[className]] بتاعها object مش نص، فبنتجاهله عشان [[.trim()]] ميقعش.
- [[out.slice(0, 4)]]: أول ٤ بس. أول واحد غالبًا هو السبب، واللي جواه أو جنبه بيطلع معاه.
- [[process.exit(bad ? 1 : 0)]]: كود خروج للـ CI و [[&&]].

### القياس

~~~text النسخة الأولى
320   BROKEN +31px  a.btn.btn-primary.top-cta 90px | article.plan 320px | article.plan.featured 320px | article.plan 320px
360   OK
414   OK
768   OK
1024  OK
1440  OK
~~~

~~~text النهائية
320   OK
360   OK
414   OK
768   OK
1024  OK
1440  OK
~~~

السببين اتشرحوا في خطواتهم: ترتيب الـ media query في «الـ header والـ hero»، و [[minmax(320px)]] في «المميزات والآراء والأسعار». الملاحظة المهمة: لو المصفوفة كانت المقاسات الخمسة اللي في الطلب بس، النسخة الأولى كانت هتطلع «كلها OK».

### المصفوفة مش بتمسك إيه

- القايمة مفتوحة (السكربت بيقيس الصفحة زي ما بتفتح). [[a11y.mjs]] بيفتحها على ٣٦٠ ويشغّل axe.
- [[100vw]] على ويندوز بـ scrollbar ظاهر: الـ headless Chrome مفيهوش scrollbar بياخد مساحة، فـ [[100vw]] و [[100%]] نفس الرقم. اكشفها بـ [[grep 100vw css/*.css]] (الـ [[ci]] بتاع الدرس ده بيعمل كده).
- الارتفاع: موبايل بالعرض (٨٠٠×٣٦٠) أو شاشة قصيرة. زوّد [[{ width: 800, height: 360 }]] لو الـ hero فيه [[100vh]].
- تكبير الخط من إعدادات الموبايل (٢٠٠٪): جرّبه بـ [[document.documentElement.style.fontSize = "200%"]] قبل القياس، لأن كل مقاساتنا بالـ rem.

---

## perf.mjs

~~~javascript tools/perf.mjs
// الأداء: node tools/perf.mjs http://127.0.0.1:5173/ [width]
// شبكة بطيئة متعرّفة هنا (150ms و 1.6Mbps) و CPU أبطأ ٤ مرات، زي موبايل متوسط
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const width = Number(process.argv[3] || 360);
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width, height: 800 } });
await ctx.addInitScript(() => {
  window.__m = { cls: 0, shifts: [], lcp: 0, lcpEl: "", fcp: 0, themeAt: null };
  new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) { window.__m.cls += e.value; window.__m.shifts.push(e.sources.map((s) => s.node?.nodeName + "." + (s.node?.className || "")).join(",")); } })).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) => l.getEntries().forEach((e) => { window.__m.lcp = e.startTime; window.__m.lcpEl = e.element ? e.element.nodeName + (e.url ? " " + e.url.split("/").pop() : "") : ""; })).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.name === "first-contentful-paint") window.__m.fcp = e.startTime; })).observe({ type: "paint", buffered: true });
  new MutationObserver(() => { if (document.documentElement?.dataset.theme && window.__m.themeAt === null) window.__m.themeAt = performance.now(); }).observe(document, { attributes: true, subtree: true, attributeFilter: ["data-theme"] });
});
const page = await ctx.newPage();
await page.goto(url);
await page.evaluate(() => localStorage.setItem("theme", "dark"));
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.enable");
await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
const bytes = {};
page.on("response", async (r) => { try { const b = await r.body(); const t = r.request().resourceType(); bytes[t] = (bytes[t] || 0) + b.length; } catch {} });
await page.reload({ waitUntil: "load" });
await page.waitForTimeout(1500);
const m = await page.evaluate(() => window.__m);
console.log("width", width);
console.log("FCP", Math.round(m.fcp) + "ms", " LCP", Math.round(m.lcp) + "ms", m.lcpEl);
console.log("CLS", m.cls.toFixed(4), m.shifts.length ? "shifts: " + m.shifts.join(" | ") : "");
console.log("theme set at", m.themeAt === null ? "never" : Math.round(m.themeAt) + "ms", m.themeAt !== null && m.themeAt > m.fcp ? "AFTER first paint (flash)" : "before first paint");
console.log("bytes", Object.entries(bytes).map(([k, v]) => k + " " + Math.round(v / 1024) + "KB").join(", "));
await browser.close();
~~~

### سطر سطر

- [[ctx.addInitScript(fn)]]: الـ function دي بتشتغل في كل صفحة **قبل** أي سكربت في الصفحة نفسها، حتى قبل [[theme.js]]. فالـ observers بيبدأوا من أول لحظة.
- [[buffered: true]]: بيجيب كمان الـ entries اللي حصلت قبل ما الـ observer يتعمل.
- [[layout-shift]]: كل entry فيه [[value]] (التنطيط ده قد إيه) و [[sources]] (العناصر اللي اتحركت). [[hadRecentInput]] = التنطيط حصل بعد ضغطة يوزر في خلال نص ثانية، ودي مش بتتحسب في CLS (اليوزر عارف إنه ضغط).
- [[largest-contentful-paint]]: بيتبعت كل مرة عنصر أكبر من اللي قبله يترسم، فبنحفظ الأخير. [[e.url]] لو العنصر صورة، فبنطبع اسم الملف.
- [[MutationObserver]] على [[document]] بـ [[subtree: true]]: وقت ما الـ init script بيشتغل [[documentElement]] ممكن يكون لسه مش موجود، فبنراقب الـ document كله ونسأل بـ [[?.]] (أول نسخة راقبت [[documentElement]] على طول وطبعت [[theme set at never]] رغم إن الثيم اتحط).
- أول [[goto]] وبعدين [[localStorage.setItem("theme", "dark")]] وبعدين [[reload]]: عشان التحميل اللي بنقيسه فيه ثيم محفوظ، وده الموقف اللي الوميض بيحصل فيه.
- [[latency: 150]] (ms لكل طلب) و [[1.6 * 1024 * 1024 / 8]] (bytes في الثانية = 1.6 ميجابت): شبكة موبايل متوسطة، **متعرّفة في السكربت** (مش preset بإسم)، فأي حد يشغّله يعرف بالظبط إيه اللي اتقاس.
- [[setCPUThrottlingRate({ rate: 4 })]]: الـ CPU أبطأ ٤ مرات من جهازك، قريب من موبايل متوسط.
- [[r.body()]]: حجم الملف بعد فك الضغط. لو السيرفر بيضغط (gzip)، اللي اتنقل على الشبكة أقل.

### الأرقام (٣ مرات لكل حالة)

| السيرفر | النسخة | العرض | FCP | LCP (العنصر) | CLS | الثيم |
|---|---|---|---|---|---|---|
| عادي | الأولى | ٣٦٠ | ١٠٨٤–١١١٦ms | نفسه ([[hero-600.webp]]) | ٠ | قبل أول رسمة |
| عادي | النهائية | ٣٦٠ | ١٠٥٢–١١٢٤ms | نفسه ([[hero-600.webp]]) | ٠ | قبل أول رسمة |
| عادي | الأولى | ١٤٤٠ | ١٠٨٠–١١٢٠ms | نفسه ([[hero-1200.webp]]) | ٠ | قبل أول رسمة |
| عادي | النهائية | ١٤٤٠ | ١١٠٤–١١٤٤ms | نفسه ([[hero-1200.webp]]) | ٠ | قبل أول رسمة |
| صور متأخرة | الأولى | ٣٦٠ | ٤٦٤–٤٦٨ms | ١٧٦٠–١٧٧٦ms | **٠٫٠٩٥٧** | **بعد أول رسمة** |
| صور متأخرة | النهائية | ٣٦٠ | ٥٢٠–٥٤٤ms | ١٩٤٤–١٩٥٦ms | ٠ | قبل أول رسمة |
| صور متأخرة | الأولى | ١٤٤٠ | ٤٥٦ms | ١٨٣٢–١٨٤٨ms | **٠٫٠٥٥٥** | **بعد أول رسمة** |
| صور متأخرة | النهائية | ١٤٤٠ | ٥١٢–٥٢٨ms | ٢٠٠٠–٢٠١٦ms | ٠ | قبل أول رسمة |

### إزاي تقرا الجدول

- **على السيرفر العادي الاتنين زي بعض.** FCP = LCP لأن صورة الـ hero صغيرة (١٠ أو ٢٢ كيلو) وبتوصل قبل ما الـ CSS يخلص، فأول رسمة فيها الصورة. يعني الـ «بطء» هنا هو إن الرسم بيستنى الـ CSS (render-blocking) على شبكة كل طلب فيها ١٥٠ms.
- **الصور متأخرة:** أول رسمة بقت أبدر بكتير (الـ CSS مش مستني حاجة)، فالـ LCP بقى = وقت الصورة (١٥٠٠ + الشبكة). النسخة الأولى CLS ووميض، والنهائية لأ. **والنهائية LCP أبطأ ١٨٠ms تقريبًا** في الظرف ده: أول رسمة أبطأ ٦٠ms تقريبًا (سكربت الثيم في الـ head بيوقّف القراية) والصورة بتيجي بعدها. ده تمن حقيقي دفعناه عشان مفيش وميض ولا تنطيط، ولو LCP ده مهم جدًا ممكن تجرّب تحط [[theme.js]] inline (بيوفّر طلب، بس محتاج CSP يسمح بيه بـ hash).
- **الفرق بين المرات ٣٠–٧٠ms**، فأي «تحسين» أصغر من كده مش متقاس.

### الأحجام

~~~text bytes (على ٣٦٠، بعد فك الضغط)
الأولى:    document 10KB, stylesheet 9KB, script 1KB, image 10KB
النهائية:  document 13KB, script 8KB, stylesheet 13KB, image 10KB, other 0KB
~~~

النهائية أكبر ١٤ كيلو (الفورم والرسايل والتحقق) وبرضه صفر خطوط ويب و ٤٤ كيلو للصفحة كلها. على ١٤٤٠ الصورة ٢٢ كيلو بدل ١٠ ([[srcset]] اختار [[hero-1200.webp]]). و [[other 0KB]] هي [[icon.svg]] (أقل من كيلو). النسخة الأولى كانت بتطلب [[/favicon.ico]] لوحدها وبيرجع ٤٠٤ في الـ Console؛ [[<link rel="icon">]] شالها.

### تجارب مفرقتش

| التجربة | من غيرها | معاها | القرار |
|---|---|---|---|
| دمج [[tokens.css]] و [[site.css]] و [[form.css]] في ملف | FCP ١٠٧٦–١١٠٤ms | ١١١٦–١١٤٤ms | مش هنعمله: الـ ٣ ملفات بيتحمّلوا مع بعض، والدمج مقلّلش حاجة |
| [[<link rel="preload" as="image" imagesrcset>]] لصورة الـ hero | LCP ١٠٧٦–١١١٢ms | ١١١٢–١١٣٦ms | مش هنعمله: الصورة في الـ HTML والمتصفح بيلاقيها بدري لوحده |

الاتنين نصايح صح في مواقف تانية (عشرات ملفات CSS على HTTP/1، أو صورة background في CSS). هنا اتقاسوا ومفرقوش، فمدخلوش. الكود اللي ملوش أثر متقاس = حاجة زيادة تتصان.

---

## خلاصة

- المصفوفة: ٣٢٠ لازم تبقى فيها، وسكرول للآخر بـ [[instant]] قبل القياس، و [[left < 0]] في RTL، وكود خروج.
- الأداء: شبكة و CPU متعرّفين في السكربت، و observers من [[addInitScript]]، و ٣ مرات لكل حالة، وظرف وحش (صور متأخرة) جنب الظرف العادي.
- اقرا الأرقام: FCP = LCP معناها الرسم مستني الـ CSS، وأي فرق أصغر من التذبذب مش فرق، وكل تحسين يتقاس قبل ما يدخل.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة RTL فيها [[.badge { position: absolute; inset-inline-start: -20px; }]]. هيبقى فيه scroll أفقي؟ ومن أنهي ناحية؟ والفلتر اللي بيشيّك [[b.right > vw]] بس هيلاقيه؟ جرّب بـ [[matrix.mjs]] قبل وبعد ما تشيل [[b.left < -0.5]].`, done: R`كتبت إن [[inline-start]] في RTL = يمين، فالبادج بيطلع من اليمين (ومفيش scroll، لأن اللي بيطلع من الناحية اللي الصفحة بتبدأ منها بيتقص)، وجرّبت [[inset-inline-end]] بدلها فطلع من الشمال والمصفوفة لقته بـ [[left < 0]] بس.` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد على [[matrix.mjs]] إنه يقرا كل [[min-width]] و [[max-width]] من ملفات الـ CSS ويضيف الحدين لكل واحد (مثلًا ٧٦٠ و ٧٦١، و ٩٥٩ و ٩٦٠) على المقاسات، مترتبين ومن غير تكرار.`, done: R`السكربت بيطبع [[widths: 320 360 414 760 761 768 959 960 1024 1440]] على المشروع ده، وبيقيسهم كلهم، وكلهم OK.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زميلك صلّح scroll أفقي على الموبايل بـ [[html, body { overflow-x: hidden; }]] والمصفوفة بقت OK. ليه ده مش تصليح؟ أثبت بحاجتين اتكسروا في الصفحة دي.`, done: R`أثبت إن الـ header مبقاش لازق (بعد سكرول ١٠٠٠ [[getBoundingClientRect().top]] مش صفر)، وإن العنصر العريض لسه موجود ومقصوص (المحتوى بتاعه مش باين)، ورجعت شلت السطر ولقيت العنصر بالمصفوفة وصلّحته هو.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** خلّي الصفحة تستخدم خط ويب عربي (أي ملف woff2 عندك أو من Google Fonts) مرة بـ [[font-display: swap]] ومرة [[block]] ومرة [[optional]]، وقيس بـ [[perf.mjs]] على ٣٦٠: FCP و LCP و CLS والـ bytes تحت [[font]]، ٣ مرات لكل واحدة. وقارن بخطوط الجهاز.`, done: R`جدول ٤ صفوف بأرقام حقيقية (أقل–أكبر)، ومكتوب فيه أنهي واحدة عملت CLS (غالبًا swap لو مقاسات الخط مختلفة) وأنهي أخّرت FCP، وقرارك لو العميل مصمم على خط معيّن.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** حوّل [[perf.mjs]] لاختبار بيقع: CLS أكبر من ٠٫٠١ على أي عرض، أو الثيم بعد أول رسمة، أو LCP أكبر من ٢٥٠٠ms، على السيرفرين. شغّله على نسختك، وبعدين امسح [[width]] و [[height]] من الصورة.`, done: R`على النسخة النهائية ٤ PASS (عرضين × سيرفرين)، ومن غير المقاس الصورة بيقع على سيرفر الصور المتأخرة بس ويطبع الـ CLS والعناصر، وده بيثبت ليه الظرف الوحش لازم يبقى في الاختبار.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من وثائق Chrome DevTools: الـ preset اللي اسمه «Slow 4G» في Network throttling قيمه كام (latency و download)؟ وقارنها بالقيم اللي في [[perf.mjs]]. ليه أحسن تكتب القيم في السكربت بدل اسم الـ preset؟`, done: R`كتبت القيم من الوثائق بالمصدر، وكتبت إن القيم المكتوبة بتفضل ثابتة لو Chrome غيّر الـ presets (حصل قبل كده إنها اتغيّرت أساميها وقيمها)، فالقياس يتقارن بنفسه على مدار شهور.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const css = ".plans { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }\n" +
  ".bento { grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }\n" +
  ".band { width: 100vw; }\n.hero { min-height: 100vh; }\n.top-cta { display: none; }\n";
const narrowest = 320, gutter = 16 * 2;
for (const m of css.matchAll(/minmax\((\d+)px/g)) console.log("risky minmax(" + m[1] + "px): needs " + m[1] + "px, a 320 phone has " + (narrowest - gutter) + "px");
for (const m of css.matchAll(/minmax\(min\(100%,\s*(\d+)px\)/g)) console.log("safe minmax(min(100%, " + m[1] + "px))");
for (const m of css.matchAll(/([.\w-]+)\s*\{[^}]*\b100vw\b/g)) console.log("100vw on " + m[1] + ": wider than the page when there is a scrollbar");
for (const m of css.matchAll(/([.\w-]+)\s*\{[^}]*\b100vh\b/g)) console.log("100vh on " + m[1] + ": use 100svh or 100dvh on phones");
const runs = { before: [1076, 1104, 1080], after: [1116, 1144, 1116] };
const span = (a) => Math.max(...a) - Math.min(...a);
const gap = Math.min(...runs.after) - Math.max(...runs.before);
console.log("merge css: noise " + Math.max(span(runs.before), span(runs.after)) + "ms, gap " + gap + "ms -> " + (gap > Math.max(span(runs.before), span(runs.after)) ? "slower" : "no clear difference"));`, expect: [R`risky minmax(320px): needs 320px, a 320 phone has 288px`, R`safe minmax(min(100%, 240px))`, R`100vw on .band: wider than the page when there is a scrollbar`, R`100vh on .hero: use 100svh or 100dvh on phones`, R`merge css: noise 28ms, gap 12ms -> no clear difference`] },
          ],
        },
        {
          cmd: "landing page: فحص accessibility والنشر والغلطات",
          title: "axe صفر في ٣ حالات، ومشي بالكيبورد بس على ٣١ وقفة، وفحص HTML من غير متصفح للـ CI، والنشر على GitHub Pages تحت مسار فرعي، وكل الغلطات اللي حصلت",
          learn: R`تثبت إن الصفحة شغالة لكل الناس بأرقام، وتنشرها من غير ما المسارات تقع، وتراجع كل غلطة حصلت في المشروع كطريقة تفكير تنفع في أي مشروع جاي.`,
          out: R`[[a11y.mjs]] بيطبع صفر violations في الفاتح والغامق والموبايل والقايمة مفتوحة، و ٣١ وقفة كيبورد كلها بحلقة ومش مستخبية، و [[lint.mjs]] بيطبع [[0 problems]]، والصفحة بتتحمّل كاملة تحت [[/habba-landing/]] بصفر طلبات فاشلة.`,
          desc: R`آخر خطوة: **نثبت** إن الصفحة accessible و **ننشرها**.

• **[[a11y.mjs]]:** axe (مكتبة بتفحص قواعد WCAG في الصفحة وهي شغالة) على ٣ حالات: فاتح ١٢٨٠، وغامق ١٢٨٠، و ٣٦٠ والقايمة مفتوحة. وبعدين **مشي بالكيبورد بس**: Tab لحد ما يرجع لأول عنصر، ولكل وقفة بيسأل: عليها حلقة focus ظاهرة؟ ومش مستخبية تحت حاجة ([[elementFromPoint]])؟ وفي الآخر بيضغط لينكات الـ nav ويتأكد إن عنوان القسم تحت الـ header مش وراه. النسخة الأولى: تباين واقع في الفاتح (١٠ عناصر) والغامق (٢)، و ٥ خانات من غير حلقة. النهائية: **صفر** في كل حاجة.
• **[[lint.mjs]]:** فحص للـ HTML من غير متصفح، في ٣٦ سطر Node، بيشتغل في CI في ثانية: h1 واحد، و ids مش متكررة، وكل لينك [[#x]] ليه هدف، وكل [[aria-describedby]] بيشاور على حاجة موجودة، وكل خانة ليها label، وكل [[pattern]] صالح بالـ flag [[v]]، وكل صورة ليها مقاس، ومفيش مسار بيبدأ بـ [[/]]. النسخة الأولى: **١٢ مشكلة**. النهائية: **صفر**.
• **النشر:** GitHub Pages بيخدم مشروعك تحت [[https://اسمك.github.io/اسم-الريبو/]] مش تحت [[/]]. النسخة الأولى كانت مساراتها [[/css/site.css]]، فلما اتخدمت تحت [[/habba-landing/]] في المعمل: **٦ طلبات ٤٠٤** والصفحة طلعت من غير CSS خالص. بعد المسارات النسبية: **صفر**.

وفي الآخر جدول بكل الغلطات اللي حصلت في المشروع (١٤ غلطة في الصفحة و ٦ في أدوات القياس نفسها)، وإزاي الصفحة تكبر، وبتتكلّف كام، وإزاي تخليها بتاعتك.`,
          example: R`node tools/lint.mjs index.html
node tools/a11y.mjs http://127.0.0.1:5173/
MSYS_NO_PATHCONV=1 node tools/serve.mjs 5180 /habba-landing/
git init -b main && git add . && git commit -m "habba landing page"
gh repo create habba-landing --public --source=. --push
gh api -X POST "repos/{owner}/{repo}/pages" -f "source[branch]=main" -f "source[path]=/"`,
          lines: [
            R`فحص الـ HTML من غير متصفح: بيطبع كل مشكلة في سطر [[FAIL]]، وفي الآخر [[OK: 226 tags, 33 ids, 0 problems]]، وكود خروج 1 لو فيه مشكلة.`,
            R`axe في ٣ حالات ومشي الكيبورد والقفز للأقسام (السيرفر لازم يبقى شغال)، وكود خروج 1 لو أي رقم مش صفر.`,
            R`السيرفر بيقلّد GitHub Pages: الصفحة تحت [[/habba-landing/]]. [[MSYS_NO_PATHCONV=1]] في Git Bash بس: من غيرها Git Bash بيحوّل [[/habba-landing/]] لـ [[C:/Program Files/Git/habba-landing/]] (حصل فعلًا). في PowerShell اكتب الأمر من غيرها.`,
            R`ريبو git محلي على [[main]] وأول commit (اتشغّل في المعمل). الـ [[.gitignore]] فيه [[node_modules/]] عشان ١٧ ميجا متترفعش.`,
            R`من الوثائق (متشغّلش هنا، عشان مفيش ريبو حقيقي يتعمل): بيعمل ريبو عام على GitHub بنفس الاسم ويربطه ويرفع الـ commit. محتاج [[gh auth login]] الأول.`,
            R`من الوثائق: بيفعّل Pages من فرع [[main]] والفولدر الرئيسي. [[{owner}]] و [[{repo}]] بيتملوا لوحدهم من الريبو اللي انت فيه. ونفس الحاجة من الموقع: Settings › Pages › Deploy from a branch › main و [[/ (root)]].`,
          ],
          try: R`شغّل [[lint.mjs]] و [[a11y.mjs]] على نسختك وصلّح لحد ما الاتنين صفر. وبعدين امشي على الصفحة بالكيبورد بس بإيدك من أول الـ skip link لآخر لينك في الـ footer، واكتب أي وقفة مكانتش متوقعة. شغّل السيرفر تحت [[/habba-landing/]] وافتح Network: فيه ٤٠٤؟ وفي الآخر اعمل الريبو والـ Pages (لو عندك حساب) وافتح الرابط من موبايلك.`,
          sol: R`[[lint.mjs]]: [[OK: 226 tags, 33 ids, 0 problems]]. [[a11y.mjs]]: [[violations: 0]] تلات مرات، و [[keyboard stops: 31  no focus ring: 0  hidden under header: 0]]، و ٤ قفزات [[h2 top 239]] أو [[240]] و [[header bottom 65]] كلهم [[ok]]. تحت المسار الفرعي: صفر ٤٠٤ والخلفية [[rgb(251, 247, 242)]]. ولو حطيت أي مسار بيبدأ بـ [[/]]، الـ lint بيقول [[بيبدأ بـ / وهيقع على GitHub Pages]] قبل ما تنشر. والرابط الحقيقي بيبقى [[https://<اسمك>.github.io/habba-landing/]] بعد دقيقة أو اتنين من تفعيل Pages (حسب الوثائق).`,
          solCode: R`node tools/a11y.mjs http://127.0.0.1:5173/
light 1280             violations: 0
dark 1280              violations: 0
light 360 menu open    violations: 0
keyboard stops: 31  no focus ring: 0  hidden under header: 0
jump #features  h2 top 240 header bottom 65 ok
jump #reviews   h2 top 239 header bottom 65 ok
jump #pricing   h2 top 240 header bottom 65 ok
jump #faq       h2 top 240 header bottom 65 ok`,
          flag: "script",
          deep: {
            why: R`«accessible» من غير رقم كلام. axe بيمسك المشاكل اللي تتقاس أوتوماتيك (تباين، وأسماء ناقصة، و ARIA غلط، و landmarks)، وده جزء بس من المشاكل (الرقم بيختلف حسب الدراسة والأداة)، والباقي محتاج حد يمشي بالكيبورد ويسمع قارئ الشاشة، فالسكربت بيعمل الجزء اللي بيتعمل أوتوماتيك كل مرة، وانت بتعمل الباقي مرة قبل التسليم. والنشر على GitHub Pages بالذات بيكسر أي مسار بيبدأ بـ [[/]]، وده بيبان بس بعد النشر لو مقلدتش المسار الفرعي في المعمل.`,
            how: R`[[@axe-core/playwright]] بيحقن axe-core في الصفحة ويشغّله على الـ DOM الحالي بالستايلات المحسوبة، وبيرجّع [[violations]] (كل قاعدة وقعت وعلى أنهي عناصر). بيتجاهل العناصر المخفية ([[display: none]] أو [[opacity: 0]] أو بره الـ accessibility tree)، وعشان كده لازم كل حاجة تظهر قبل الفحص. مشي الكيبورد: [[page.keyboard.press("Tab")]] زي اليوزر، و [[document.activeElement]] هو العنصر اللي عليه الـ focus، و [[getComputedStyle]] بيقول فيه [[outline]] أو [[box-shadow]]، و [[elementFromPoint(x, y)]] بيرجّع أعلى عنصر في النقطة دي، فلو مش هو العنصر (أو جواه) يبقى فيه حاجة فوقه. والـ lint: regex بيلقط كل tag وصفاته، وبيبني [[Set]] من الـ ids وبيقارن. والمسار النسبي [[css/site.css]] بيتحسب من مكان الصفحة، فتحت [[/habba-landing/]] بيبقى [[/habba-landing/css/site.css]]، والمطلق [[/css/site.css]] بيروح لجذر الدومين.`,
            when: R`[[lint.mjs]] على كل push (ثانية واحدة ومن غير متصفح). و [[a11y.mjs]] و [[matrix.mjs]] و [[form-test.mjs]] قبل كل نشر وفي CI (محتاجين Chrome والسيرفر). والمشي بالكيبورد بإيدك وقارئ شاشة (NVDA على ويندوز ببلاش، أو VoiceOver على الماك والموبايل) مرة قبل التسليم وبعد أي تغيير كبير في الشكل. و GitHub Pages لأي صفحة static؛ لو محتاج API أو redirects أو headers (CSP مثلًا)، يبقى Netlify أو Cloudflare Pages أو سيرفر.`,
            mistakes: R`تفحص بـ axe والكروت لسه مخفية (axe بيتجاهلها فيقول صفر). أو تفحص الفاتح بس. أو تثق في «axe صفر» من غير مشي بالكيبورد (مثلًا الاسم العملاق فوق لينكات الـ footer axe مقالش عليه حاجة). أو تكتب فحص بيطلّع false positive (الـ skip link «تحت الـ header» وهو فوقه) وتصدّقه. أو مسارات بتبدأ بـ [[/]]. أو ترفع [[node_modules]]. أو تقول «اتنشرت» من غير ما تفتح الرابط من جهاز تاني.`
          },
          teach: R`## a11y.mjs

~~~javascript tools/a11y.mjs
// accessibility: node tools/a11y.mjs http://127.0.0.1:5173/
// axe على الوضعين وعلى الموبايل والقايمة مفتوحة، وبعدين مشي بالكيبورد بس
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome" });
let total = 0;
async function scan(label, setup, viewport = { width: 1280, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await setup(page);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 150)); } scrollTo({ top: 0, behavior: "instant" }); });
  await page.waitForTimeout(700);
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
  console.log(label.padEnd(22), "violations:", r.violations.length);
  for (const v of r.violations) console.log("   ", v.id, "x" + v.nodes.length, "→", v.nodes[0].target.join(" "), v.nodes[0].any[0]?.message?.slice(0, 110) || "");
  total += r.violations.length;
  await ctx.close();
}
await scan("light 1280", async () => {});
await scan("dark 1280", async (p) => { await p.evaluate(() => localStorage.setItem("theme", "dark")); await p.reload(); });
await scan("light 360 menu open", async (p) => { await p.click(".menu-btn"); }, { width: 360, height: 800 });
// الكيبورد: Tab لحد ما نرجع لأول عنصر، ونشوف كل عنصر عليه focus ظاهر ومش مستخبي تحت الـ header
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });   // من غير smooth scroll، عشان نقيس بعد ما الصفحة تقف
await page.goto(url, { waitUntil: "load" });
const seen = [];
for (let i = 0; i < 60; i++) {
  await page.keyboard.press("Tab");
  await page.waitForTimeout(50);
  const f = await page.evaluate(() => {
    const el = document.activeElement; if (!el || el === document.body) return null;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const ring = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0 || cs.boxShadow !== "none";
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(r.height / 2, 10));
    const hidden = !hit || !(el === hit || el.contains(hit) || hit.contains(el));
    return { name: el.tagName.toLowerCase() + " " + (el.getAttribute("aria-label") || el.textContent || el.name || "").trim().slice(0, 24), ring, hidden };
  });
  if (!f || (seen.length && f.name === seen[0].name)) break;
  seen.push(f);
}
const noRing = seen.filter((s) => !s.ring), under = seen.filter((s) => s.hidden);
console.log("keyboard stops:", seen.length, " no focus ring:", noRing.length, " hidden under header:", under.length);
for (const s of [...noRing, ...under]) console.log("   ", s.name, s.ring ? "" : "(no ring)", s.hidden ? "(under header)" : "");
// لينكات الـ nav: بعد القفزة، عنوان القسم لازم يبان تحت الـ header مش وراه
let covered = 0;
for (const href of ["#features", "#reviews", "#pricing", "#faq"]) {
  await page.click('.nav-links a[href="' + href + '"]');
  await page.waitForTimeout(300);
  const r = await page.evaluate((h) => ({ head: Math.round(document.querySelector(h + " h2").getBoundingClientRect().top), bar: Math.round(document.querySelector(".top").getBoundingClientRect().bottom) }), href);
  if (r.head < r.bar) covered++;
  console.log("jump", href.padEnd(10), "h2 top", r.head, "header bottom", r.bar, r.head < r.bar ? "COVERED" : "ok");
}
under.length += covered;
await browser.close();
process.exit(total + noRing.length + under.length ? 1 : 0);
~~~

### سطر سطر

- [[scan(label, setup, viewport)]]: كل حالة في [[newContext]] لوحده (localStorage فاضي، ومقاس جديد). [[setup]] function بتجهّز الحالة: الغامق بيحط [[theme=dark]] ويعمل reload، والموبايل بيضغط زرار القايمة.
- [[new AxeBuilder({ page })]]: الـ page لازم تكون من [[browser.newContext()]]. أول مرة كتبت [[browser.newPage()]] على طول ووقع بـ [[Error: Please use browser.newContext()]].
- [[withTags([...])]]: القواعد اللي هتتفحص: WCAG 2.0 و 2.1 و 2.2 مستوى A و AA، و [[best-practice]] (حاجات مش في WCAG بس axe بيوصي بيها، زي landmark لكل محتوى).
- [[v.nodes[0].target]]: الـ selector لأول عنصر واقع، و [[any[0].message]] الرسالة بالنص (زي [[Element has insufficient color contrast of 3.85...]]).
- مشي الكيبورد: [[emulateMedia({ reducedMotion: "reduce" })]] عشان [[scroll-behavior: smooth]] يتقفل، وإلا Tab بيعمل سكرول ناعم والقياس بيحصل والعنصر لسه بيتحرك ([[elementFromPoint]] بيرجّع null للعناصر اللي بره الشاشة؛ أول تشغيل من غيرها قال ٢١ عنصر «مستخبي»).
- [[f.name === seen[0].name]]: لما نرجع لأول عنصر (Tab لف الصفحة كلها) نوقف. و ٦٠ حد أقصى عشان لو فيه focus trap السكربت ميلفّش للأبد.
- [[ring]]: فيه [[outline]] حقيقي (مش [[none]] ولا عرضه صفر) **أو** [[box-shadow]]. تغيير لون الـ border لوحده مش بيتحسب، وده اللي مسك الـ ٥ خانات في النسخة الأولى.
- [[elementFromPoint(وسط العنصر)]]: أعلى عنصر في النقطة دي. لو مش العنصر نفسه أو حاجة جواه أو حاجة شايلاه، يبقى فيه حاجة فوقه (header، أو زخرفة، أو modal).
- القفز: الضغط على لينكات الـ nav وقياس [[top]] بتاع الـ h2 مقابل [[bottom]] بتاع الـ header.

### النتايج

~~~text النسخة الأولى
light 1280             violations: 1
    color-contrast x10 → .card:nth-child(3) > p Element has insufficient color contrast of 3.85 (foreground color: #8f7f72, background color: #ffffff, font si
dark 1280              violations: 1
    color-contrast x2 → a[href$="#reviews"] Element has insufficient color contrast of 1.66 (foreground color: #f2e9e0, background color: #bbb7b2, font si
light 360 menu open    violations: 0
keyboard stops: 29  no focus ring: 5  hidden under header: 1
    input name (no ring)
    input email (no ring)
    input phone (no ring)
    input password (no ring)
    input terms (no ring)
    a اتخطّى للمحتوى  (under header)
~~~

~~~text النهائية
light 1280             violations: 0
dark 1280              violations: 0
light 360 menu open    violations: 0
keyboard stops: 31  no focus ring: 0  hidden under header: 0
jump #features  h2 top 240 header bottom 65 ok
jump #reviews   h2 top 239 header bottom 65 ok
jump #pricing   h2 top 240 header bottom 65 ok
jump #faq       h2 top 240 header bottom 65 ok
~~~

الوقفات زادت من ٢٩ لـ ٣١ لأن الفورم النهائي فيه زرار «اظهرها» و [[<select>]] الباقة.

### الغلطات اللي كانت في أدوات القياس نفسها

ده الجزء اللي محدش بيحكيه: السكربتات نفسها غلطت كذا مرة، وكل مرة الرقم كان غلط بثقة.

| الغلطة في الأداة | الرقم الغلط | السبب | التصليح |
|---|---|---|---|
| [[scrollTo(0, y)]] عادي والصفحة smooth | axe قال تباين ١٫٧ على [[.card h3]] ([[#c6c1bc]] على [[#fcf9f5]]) | الكروت كانت لسه بتظهر (opacity في النص) أو عمرها ما ظهرت، فـ axe حسب لون باهت أو اتجاهلها | [[behavior: "instant"]] |
| خطوة سكرول ٣٠ms | ٧ من ١٠ عناصر مظهروش، والعدد بتاع axe اتغيّر ٩ ثم ٥ ثم ١٠ بين التشغيلات | الـ observer مبيلحقش | ١٥٠ms بين كل خطوة، والعدد ثبت |
| «تحت الـ header» = [[top]] أقل من آخر الـ header | الـ skip link «مستخبي» | الـ skip link فوق الـ header ([[z-index: 200]])، والحساب بالأرقام مش بيعرف مين فوق مين | [[elementFromPoint]] |
| Tab والصفحة smooth | ٢١ عنصر «مستخبي» | العنصر كان لسه بيتسكرل له | [[reducedMotion: "reduce"]] في الاختبار |
| [[documentElement]] في [[addInitScript]] | [[theme set at never]] | الـ html لسه متعملش وقت ما السكربت بيشتغل | المراقبة على [[document]] بـ [[subtree]] |
| [[browser.newPage()]] مع axe | [[Error: Please use browser.newContext()]] | المكتبة محتاجة context تعمل فيه صفحة مساعدة | [[newContext()]] |

> القاعدة: لما أداة قياس تطلّع رقم غريب (أو رقم بيتغيّر بين تشغيلتين)، شك في الأداة الأول. وجرّب الأداة على حاجة انت عارف إجابتها (نسخة مكسورة قصد) قبل ما تصدّقها على النسخة السليمة.

---

## lint.mjs: فحص من غير متصفح

~~~javascript tools/lint.mjs
// فحص الـ HTML من غير متصفح (بيشتغل في CI): node tools/lint.mjs index.html
import fs from "node:fs";
const html = fs.readFileSync(process.argv[2] || "index.html", "utf8");
const tags = [...html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/gi)].map((m) => {
  const attrs = {};
  for (const a of m[2].matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) attrs[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? "";
  return { tag: m[1].toLowerCase(), attrs };
});
const problems = [];
const bad = (msg) => problems.push(msg);
const ids = tags.map((t) => t.attrs.id).filter(Boolean);
const idSet = new Set(ids);

const root = tags.find((t) => t.tag === "html");
if (!root?.attrs.lang || !root?.attrs.dir) bad("<html> محتاج lang و dir");
const h1 = tags.filter((t) => t.tag === "h1").length;
if (h1 !== 1) bad("لازم h1 واحد بالظبط، لقيت " + h1);
for (const id of idSet) if (ids.filter((x) => x === id).length > 1) bad("id متكرر: " + id);
const forIds = new Set(tags.filter((t) => t.tag === "label" && t.attrs.for).map((t) => t.attrs.for));
for (const t of tags) {
  const a = t.attrs;
  if (a.href?.startsWith("#") && a.href.length > 1 && !idSet.has(a.href.slice(1))) bad("لينك لـ " + a.href + " ومفيش id بالاسم ده");
  for (const k of ["aria-describedby", "aria-controls", "aria-labelledby"]) if (a[k]) for (const id of a[k].split(/\s+/)) if (!idSet.has(id)) bad(k + " بيشاور على " + id + " ومش موجود");
  if (["input", "select", "textarea"].includes(t.tag) && !["hidden", "submit", "button"].includes(a.type)) {
    const labelled = (a.id && forIds.has(a.id)) || a["aria-label"] || a["aria-labelledby"] || t.tag === "input" && a.type === "radio";
    if (!labelled) bad(t.tag + (a.name ? " name=" + a.name : "") + " من غير label");
  }
  if (a.pattern !== undefined) { try { new RegExp("^(?:" + a.pattern + ")$", "v"); } catch (e) { bad("pattern مش شغال في المتصفح (v flag): " + a.pattern + " ← " + e.message); } }
  if (t.tag === "img" && (a.alt === undefined || !a.width || !a.height)) bad("img محتاجة alt و width و height: " + a.src);
  if (t.tag === "button" && !a.type) bad("button من غير type (جوه form هيبقى submit)");
  for (const k of ["href", "src", "action"]) if (a[k]?.startsWith("/") && !a[k].startsWith("//")) bad(k + "=\"" + a[k] + "\" بيبدأ بـ / وهيقع على GitHub Pages");
  if (a.srcset) for (const part of a.srcset.split(",")) if (part.trim().startsWith("/")) bad("srcset فيه مسار بيبدأ بـ /: " + part.trim());
}
for (const p of problems) console.log("FAIL", p);
console.log(problems.length ? problems.length + " problems" : "OK: " + tags.length + " tags, " + idSet.size + " ids, 0 problems");
process.exit(problems.length ? 1 : 0);
~~~

- [[/<([a-z][a-z0-9]*)\b([^>]*)>/gi]]: أي opening tag (اسم بيبدأ بحرف) وكل اللي جواه لحد [[>]]. مش parser كامل (مثلًا [[>]] جوه قيمة attribute هيلخبطه)، بس كفاية لصفحة احنا كاتبينها.
- الـ regex التاني بيلقط كل attribute بأشكاله التلاتة ([["..."]] و [['...']] ومن غير تنصيص) أو من غير قيمة ([[required]])، و [[??]] بياخد أول قيمة مش [[undefined]].
- [[root?.attrs]]: [[?.]] عشان لو مفيش [[<html>]] خالص منقعش.
- الـ radio معتبر ليه label لو جوه label (الـ regex مش بيشوف «جوه»، فده تبسيط مكتوب في الكود).
- [[new RegExp("^(?:" + a.pattern + ")$", "v")]]: نفس اللي المتصفح بيعمله بالظبط، فلو وقع هنا هيقع هناك.
- [[!a[k].startsWith("//")]]: [[//cdn.example/x.js]] مسار لدومين تاني (protocol-relative)، مش مسار على الدومين بتاعك.

~~~text النسخة الأولى
FAIL href="/css/tokens.css" بيبدأ بـ / وهيقع على GitHub Pages
FAIL href="/css/site.css" بيبدأ بـ / وهيقع على GitHub Pages
FAIL href="/css/form.css" بيبدأ بـ / وهيقع على GitHub Pages
FAIL src="/js/site.js" بيبدأ بـ / وهيقع على GitHub Pages
FAIL src="/js/form.js" بيبدأ بـ / وهيقع على GitHub Pages
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-600.webp 600w
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-1200.webp 1200w
FAIL img محتاجة alt و width و height: /img/hero-1200.jpg
FAIL src="/img/hero-1200.jpg" بيبدأ بـ / وهيقع على GitHub Pages
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-600.jpg 600w
FAIL srcset فيه مسار بيبدأ بـ /: /img/hero-1200.jpg 1200w
FAIL pattern مش شغال في المتصفح (v flag): (\+20|0)1[0125][0-9-]{8,9} ← Invalid regular expression: /^(?:(\+20|0)1[0125][0-9-]{8,9})$/v: Invalid character class
12 problems
~~~

~~~text النهائية
OK: 226 tags, 33 ids, 0 problems
~~~

---

## النشر على GitHub Pages

### ١. قلّد المسار الفرعي في المعمل

صفحة مشروع على GitHub Pages بتتخدم تحت [[https://<اسمك>.github.io/<اسم-الريبو>/]]. [[serve.mjs]] بياخد الـ base كـ argument تاني:

~~~bash Git Bash
MSYS_NO_PATHCONV=1 node tools/serve.mjs 5180 /habba-landing/
~~~

~~~powershell PowerShell
node tools/serve.mjs 5180 /habba-landing/
~~~

من غير [[MSYS_NO_PATHCONV=1]] في Git Bash، السيرفر طبع:

~~~text
http://127.0.0.1:5178C:/Program Files/Git/habba-landing/
~~~

Git Bash شاف argument بيبدأ بـ [[/]] واعتبره مسار لينكس وحوّله لمسار ويندوز جوه فولدر Git، فكل الطلبات بقت ٤٠٤.

~~~text Playwright: كل طلب فشل والـ background بتاع الـ body
http://127.0.0.1:5179/habba-landing/ → failed: 6 404 /css/tokens.css, 404 /css/site.css, 404 /css/form.css, 404 /img/hero-1200.webp, 404 /js/site.js, 404 /js/form.js | body bg: rgba(0, 0, 0, 0)
http://127.0.0.1:5180/habba-landing/ → failed: 0  | body bg: rgb(251, 247, 242)
~~~

الأولى (مسارات [[/css/...]]) الصفحة طلعت نص أسود على أبيض من غير ولا ستايل ولا JS. النهائية (مسارات [[css/...]]) صفر.

### ٢. git

~~~bash
git init -b main
git add .
git commit -m "habba landing page"
~~~

~~~text .gitignore
node_modules/
*.png
~~~

على ويندوز أول [[git add]] طلّع لكل ملف: [[warning: in the working copy of 'css/site.css', LF will be replaced by CRLF the next time Git touches it]]. ملف [[.gitattributes]] بيحل ده لكل الناس اللي هتشتغل على الريبو (مش إعداد على جهازك بس)، وبعده التحذير اختفى:

~~~text .gitattributes
* text=auto eol=lf
*.webp binary
*.jpg binary
~~~

[[eol=lf]]: كل الملفات النصية بـ LF في الريبو وفي الفولدر، و [[binary]] للصور عشان git ميحاولش يغيّر فيها حاجة.

~~~text git log --stat (من المعمل، أول commit)
e21993c habba landing page
 25 files changed, 982 insertions(+)
~~~

### ٣. الريبو والـ Pages (من الوثائق)

الخطوات دي **متشغّلتش في المعمل** عشان مفيش ريبو حقيقي يتعمل للدرس. هي من وثائق GitHub و [[gh]]:

~~~bash
gh auth login
gh repo create habba-landing --public --source=. --push
gh api -X POST "repos/{owner}/{repo}/pages" -f "source[branch]=main" -f "source[path]=/"
gh api "repos/{owner}/{repo}/pages" --jq .html_url
~~~

- [[gh repo create ... --source=. --push]]: بيعمل الريبو على GitHub من الفولدر الحالي، ويضيف [[origin]]، ويرفع.
- [[gh api -X POST .../pages]]: بيفعّل Pages من فرع [[main]] والجذر. ولو عملته من الموقع: Settings › Pages › Build and deployment › Source: Deploy from a branch › [[main]] و [[/ (root)]] › Save.
- آخر أمر بيطبع الرابط. أول نشر بياخد دقيقة أو اتنين، وكل push بعد كده بينشر لوحده.
- الفولدر [[tools/]] هيتنشر هو كمان (مفيهوش أسرار، فمفيش ضرر). لو عايز تنشر الصفحة بس: انقل الصفحة لفولدر [[site/]] وانشره بـ GitHub Actions ([[actions/upload-pages-artifact]] و [[actions/deploy-pages]]، من الوثائق).

### ٤. CI (من الوثائق)

~~~yaml .github/workflows/check.yml
name: check
on: push
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm ci
      - run: npm run lint
      - run: node tools/serve.mjs 5173 &
      - run: npm test
~~~

- [[npm ci]]: بيسطّب من [[package-lock.json]] بالظبط (نفس النسخ اللي اتقاست).
- [[npm run lint]] = [[lint.mjs]] و [[contrast.mjs]]، من غير متصفح.
- [[node tools/serve.mjs 5173 &]]: السيرفر في الخلفية في نفس الـ job، و [[npm test]] (الفورم والمصفوفة والـ a11y) بيكلمه.
- [[playwright-core]] بـ [[channel: "chrome"]] محتاج Google Chrome متسطّب، وصور ubuntu في GitHub Actions فيها Chrome جاهز (حسب وثائق runner images). لو مش موجود: [[npx playwright install chrome]].

---

## كل الغلطات اللي حصلت في الصفحة

| # | الغلطة | الخطوة | اتمسكت بـ | قبل | بعد |
|---|---|---|---|---|---|
| ١ | الثيم في سكربت [[defer]] | الألوان والثيم | [[perf.mjs]] والصور متأخرة | الثيم بعد أول رسمة (وميض) | قبلها بـ ١٥٠ms |
| ٢ | الغامق متجاهل إعداد الجهاز | الألوان والثيم | Chrome بـ [[colorScheme: dark]] | خلفية فاتحة | غامقة من غير JS |
| ٣ | [[--muted]] فاتح | الألوان والثيم | axe و [[contrast.mjs]] | ٣٫٨٥ و ١٠ عناصر | ٦٫٤٢ |
| ٤ | البراند تحت الأبيض | الألوان والثيم | [[contrast.mjs]] | ٤٫١٨ | ٥٫٦٤ |
| ٥ | [[hidden]] مع [[display: flex]] | الـ header | سكربت على ٣٦٠ | القايمة مفتوحة ٢٢٦px | مقفولة |
| ٦ | زجاج الـ header لونه ثابت | الـ header | axe في الغامق | ١٫٦٦ | صفر violations |
| ٧ | [[const top]] في سكربت عادي | الـ header | Console | الملف كله واقف | module |
| ٨ | صورة الـ hero من غير مقاس | الـ hero | [[perf.mjs]] والصور متأخرة | CLS ٠٫٠٩٥٧ | ٠ |
| ٩ | media query قبل [[.btn]] | الـ header / المقاسات | [[matrix.mjs]] على ٣٢٠ | +٣١px | ٠ |
| ١٠ | [[minmax(320px)]] في الأسعار | الأسعار | [[matrix.mjs]] على ٣٢٠ | [[article.plan 320px]] | ٠ |
| ١١ | الإخفاء مع السكرول من غير [[.js]] | الحركة | JS ممنوع | ١٠ عناصر مخفية للأبد | ٠ |
| ١٢ | الاسم العملاق فوق لينكات الـ footer | الـ footer | [[elementFromPoint]] | [[P.wordmark]] | [[A]] |
| ١٣ | [[[0-9-]]] في الـ pattern | الفورم | Console و lint | [[123]] صح | مرفوض |
| ١٤ | مسارات بتبدأ بـ [[/]] | النشر | سيرفر بـ base | ٦ طلبات ٤٠٤ | ٠ |

وكمان من غير رقم واحد بس اتمسكوا: رسايل المتصفح الإنجليزي (اتقاست بالنص)، والأرقام العربي المرفوضة، و [[minlength]] مع القيمة من الكود، والحلقة اللي كانت لون حد بس (٥ خانات)، و [[favicon.ico]] الـ ٤٠٤ في الـ Console.

**الطريقة اللي بتتكرر في الـ ١٤:** كل غلطة كانت «شغالة» على جهازي وفي الظرف العادي. اللي كشفها ظرف معيّن: مقاس أصغر بـ ٤٠ بكسل، أو صور متأخرة، أو الوضع الغامق، أو JS واقع، أو كيبورد عربي، أو مسار فرعي. فالاختبار الحقيقي = تعدّد الظروف، مش تكرار نفس الظرف.

---

## بعد ما يخلص

### بيكبر إزاي

- **صفحات أكتر** (قصتنا، والباقات بالتفصيل، والمدونة): الـ header والـ footer هيتكرروا. لحد ٣ أو ٤ صفحات انسخهم، وبعد كده مولّد static (Astro أو Eleventy) بيعمل HTML من templates من غير ما يضيف JS للزائر.
- **إنجليزي:** نفس الـ CSS بالظبط لأنه كله logical، وصفحة [[en/]] بـ [[lang="en" dir="ltr"]] و [[hreflang]] (مشروع «متوسط» في الوحدة).
- **الفورم حقيقي:** API بيتحقق تاني ويحفظ (تاب «Backend بـ Node» أو «Python و FastAPI»)، وساعتها الصفحة على Pages والـ API على سيرفر، و CORS بيسمح للدومين بتاعك بس.
- **أرقام اليوزرز الحقيقيين:** [[web-vitals]] بيبعت LCP و CLS و INP من الزوار لـ endpoint عندك، فتعرف الأداء في الميدان مش في المعمل بس. ومن غير cookies أو بيانات شخصية لو مش محتاجها.

### بيتكلّف كام (تقريبًا، من صفحات الأسعار وقت الكتابة)

| الحاجة | التكلفة |
|---|---|
| GitHub Pages | ببلاش لريبو عام، وفيه حدود استخدام مكتوبة في الوثائق (حجم الموقع والترافيك الشهري) كفاية لصفحة زي دي بكتير |
| دومين خاص ([[habba.example]] مثلًا بدومين حقيقي) | حوالي ١٠ لـ ٢٠ دولار في السنة حسب الامتداد، و Pages بيدعم دومين خاص و HTTPS ببلاش |
| API للفورم على سيرفر صغير | من حوالي ٥ دولار في الشهر (VPS صغير)، أو ببلاش على خطط مجانية لخدمات serverless بحدود |
| الإيميلات (تأكيد التسجيل) | خدمات الإيميل فيها خطط مجانية بعدد محدود في اليوم، وبعدها بالاستخدام |

### خليه بتاعك

- غيّر المحمصة لحاجة تعرفها (مشروع «فكرة» في الوحدة): الأقسام كأسئلة الزائر بتاعك انت.
- غيّر الـ tokens بس وشوف الصفحة كلها بتتغيّر: براند جديد = ٢٠ سطر في ملف واحد، و [[contrast.mjs]] بيقولك لو حاجة وقعت.
- زوّد قسم واحد مش موجود (عدّاد مشتركين بـ [[IntersectionObserver]]، أو مقارنة قبل وبعد بـ [[<input type="range">]] و [[clip-path]]) وطبّق عليه نفس القواعد: يشتغل من غير JS، ويحترم reduce، ويعدّي الـ ٦ أدوات.
- اكتب README فيه جدول «قبل وبعد» للغلطات اللي قابلتك انت، بالأرقام. ده اللي بيفرّق الـ portfolio.

---

## خلاصة

- axe في كل الحالات (فاتح وغامق وموبايل وقايمة مفتوحة) **بعد** ما كل حاجة تظهر، ومعاه مشي بالكيبورد بيسأل عن الحلقة وعن [[elementFromPoint]]، وقفز للأقسام.
- فحص HTML من غير متصفح بيمسك المسارات والـ pattern والـ labels والصور في ثانية.
- اختبر أدوات القياس نفسها على نسخة مكسورة قبل ما تصدّق «صفر».
- GitHub Pages = مسار فرعي، فمسارات نسبية واختبرها بسيرفر بـ base قبل النشر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة تحت [[https://user.github.io/shop/]] فيها [[<img src="./img/a.webp">]] و [[<img src="img/b.webp">]] و [[<img src="/img/c.webp">]] و [[<img src="../img/d.webp">]]. كل واحدة هتطلب أنهي رابط بالظبط؟ وأنهي هتقع؟`, done: R`كتبت الأربعة: الأولى والتانية [[/shop/img/...]] (شغالين)، والتالتة [[/img/c.webp]] من جذر الدومين (٤٠٤)، والرابعة [[/img/d.webp]] برضه لأن [[..]] من [[/shop/]] بيطلع للجذر (٤٠٤). واتأكدت بـ [[new URL("../img/d.webp", "https://user.github.io/shop/").href]] في الـ Console.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شغّل [[a11y.mjs]] على النسخة الأولى من أي صفحة عندك (أو ارجع [[--muted]] لـ [[#8f7f72]] و [[:focus]] لـ [[outline: none]]). صلّح كل violation بأقل تغيير، وسجّل قبل وبعد لكل واحدة في جدول.`, done: R`جدول فيه كل قاعدة ([[color-contrast]] وغيرها) وعدد العناصر قبل وبعد، و [[a11y.mjs]] بيخرج بـ 0 في الآخر، ومفيش تصليح بـ [[aria-hidden]] على حاجة مهمة عشان «axe يسكت».` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** زوّد على [[lint.mjs]] ٣ فحوصات: كل [[<a target="_blank">]] لازم عليه [[rel]] فيه [[noopener]]، وكل [[<img>]] جوه [[<picture>]] الـ [[sizes]] بتاعها زي الـ [[<source>]]، ومفيش [[tabindex]] أكبر من صفر. واعمل HTML فيه الـ ٣ غلطات وأثبت إن كل واحد بيقع لوحده.`, done: R`على [[index.html]] لسه [[0 problems]]، وعلى ملف الغلطات بيطبع ٣ [[FAIL]] مختلفين بالسبب، ولما تصلّح واحدة بتختفي هي بس.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** امشي على الصفحة بقارئ شاشة حقيقي (NVDA على ويندوز أو VoiceOver على الماك أو TalkBack على أندرويد): افتح القايمة، وبدّل الأسعار للسنوي، وافتح سؤال، وابعت الفورم فاضي وصلّحه. اكتب كل جملة قالها في كل خطوة، وقارنها باللي توقعته من الكود.`, done: R`عندك جدول ٥ خطوات: اللي توقعته واللي اتقال فعلًا، وأي فرق (مثلًا ترتيب قراية [[aria-describedby]] أو إن [[role="alert"]] اتقري مرتين) مكتوب سببه وهل محتاج تصليح.` },
            { lvl: 'تطبيق', t: R`**ابني:** workflow في GitHub Actions بيشغّل [[npm run lint]] على كل push، و [[npm test]] (والسيرفر في الخلفية)، ويرفع الصفحة على Pages بـ [[actions/deploy-pages]] بس لو الاتنين نجحوا. ريبو تجربة بتاعك.`, done: R`الـ workflow أخضر، والرابط شغال، ولما تعمل commit فيه [[minmax(320px, 1fr)]] الـ job يقع على [[matrix.mjs]] والنشر ميحصلش، والرابط يفضل على النسخة القديمة السليمة.` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك قالك «axe قال صفر، يبقى الصفحة accessible». اكتبله ٣ سطور فيهم ٣ حاجات من المشروع ده axe مقالش عليها حاجة واتمسكت بطريقة تانية.`, done: R`الـ ٣ من الحاجات دي: الاسم العملاق فوق لينكات الـ footer ([[elementFromPoint]])، والكروت المخفية لو الـ JS وقع (اختبار JS ممنوع)، وحلقة الـ focus اللي كانت لون حد بس (مشي الكيبورد)، والقايمة اللي كانت مفتوحة على طول (سكربت على ٣٦٠).` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`const html = '<!doctype html><html lang="ar"><head><link rel="stylesheet" href="/css/site.css"><script src="/js/site.js" defer></script></head><body>' +
  '<a href="#pricing">الأسعار</a><h1>بن طازة</h1><img src="/img/hero-1200.jpg" alt="فنجان قهوة">' +
  '<form><input id="email" type="email" placeholder="الإيميل"><input id="phone" type="tel" pattern="(\\+20|0)1[0125][0-9-]{8,9}" aria-describedby="phone-err"><button>ابعت</button></form></body></html>';
const tags = [...html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/gi)].map((m) => {
  const attrs = {};
  for (const a of m[2].matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) attrs[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? "";
  return { tag: m[1].toLowerCase(), attrs };
});
const problems = [];
const ids = new Set(tags.map((t) => t.attrs.id).filter(Boolean));
const root = tags.find((t) => t.tag === "html");
if (!root.attrs.lang || !root.attrs.dir) problems.push("html needs lang and dir");
const forIds = new Set(tags.filter((t) => t.tag === "label" && t.attrs.for).map((t) => t.attrs.for));
for (const t of tags) {
  const a = t.attrs;
  if (a.href?.startsWith("#") && a.href.length > 1 && !ids.has(a.href.slice(1))) problems.push("link to " + a.href + " has no target");
  if (a["aria-describedby"]) for (const id of a["aria-describedby"].split(/\s+/)) if (!ids.has(id)) problems.push("aria-describedby points to missing " + id);
  if (t.tag === "input" && !((a.id && forIds.has(a.id)) || a["aria-label"])) problems.push("input #" + a.id + " has no label");
  if (a.pattern !== undefined) { try { new RegExp("^(?:" + a.pattern + ")$", "v"); } catch { problems.push("pattern breaks with the v flag: " + a.pattern); } }
  if (t.tag === "img" && (!a.width || !a.height)) problems.push("img without width/height: " + a.src);
  if (t.tag === "button" && !a.type) problems.push("button without type");
  for (const k of ["href", "src"]) if (a[k]?.startsWith("/") && !a[k].startsWith("//")) problems.push(k + "=" + a[k] + " breaks under /repo-name/");
}
for (const p of problems) console.log("FAIL " + p);
console.log(problems.length + " problems");
console.log("resolved: " + new URL("css/site.css", "https://user.github.io/habba-landing/").pathname + " vs " + new URL("/css/site.css", "https://user.github.io/habba-landing/").pathname);`, expect: [R`FAIL html needs lang and dir`, R`FAIL href=/css/site.css breaks under /repo-name/`, R`FAIL link to #pricing has no target`, R`FAIL img without width/height: /img/hero-1200.jpg`, R`FAIL input #email has no label`, R`FAIL aria-describedby points to missing phone-err`, R`FAIL pattern breaks with the v flag: (\+20|0)1[0125][0-9-]{8,9}`, R`FAIL button without type`, R`11 problems`, R`resolved: /habba-landing/css/site.css vs /css/site.css`] },
          ],
        },
      ]
    }
]);
