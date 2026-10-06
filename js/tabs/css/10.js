// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "widgets و scroll وميزات جديدة",
      l: 3,
      n: "accordion و tabs من غير مكتبة، و scroll مظبوط، وحركة بين الصفحات، وإزاي تعرف الميزة الجديدة تنفع ولا لسه",
      items: [
        {
          cmd: "details و summary",
          title: "accordion و FAQ من غير ولا سطر JavaScript",
          desc: R`[[<details>]] بيتفتح ويتقفل لوحده، و [[<summary>]] جواه هو الجزء اللي بتدوس عليه. والباقي بيظهر لما يتفتح. شغال بالماوس والكيبورد (Enter و Space)، وقارئ الشاشة بيقول «collapsed» و «expanded» من غير aria.

و [[open]] بيخليه مفتوح من الأول، و [[details[open] > summary]] في CSS للشكل وهو مفتوح. ولو اديت كذا details نفس [[name]]، يبقوا accordion حصري: فتح واحد بيقفل الباقي.`,
          example: R`<section aria-labelledby="faq-title">
  <h2 id="faq-title">أسئلة متكررة</h2>
  <details name="faq" open>
    <summary>التوصيل بياخد قد إيه؟</summary>
    <p>من يومين لـ 4 أيام عمل جوه القاهرة والجيزة.</p>
  </details>
  <details name="faq">
    <summary>أقدر أرجّع المنتج؟</summary>
    <p>أيوه، خلال 14 يوم وهو في علبته.</p>
  </details>
</section>
// styles.css
details { border-block-end: 1px solid var(--color-border); padding-block: 0.75rem; }
summary { cursor: pointer; font-weight: 600; }
details[open] > summary { margin-block-end: 0.5rem; color: var(--color-brand); }`,
          try: R`اعمل الـ FAQ بـ 4 أسئلة. امشي بـ Tab بس وافتح واقفل بـ Enter و Space. افتح سؤال والتاني مفتوح: حصل إيه؟ وبعدين شيل [[name]] وجرّب تاني. وأخيرًا اقفل كل الأسئلة ودوّر بـ Ctrl+F على كلمة في إجابة مقفولة.`,
          flag: "script",
          deep: {
            why: R`الـ FAQ والإعدادات المتقدمة و «اعرف أكتر» في كل موقع. ناس كتير بتعملها بـ useState و div و onClick، وبتنسى الكيبورد والـ aria-expanded. details بيعمل كل ده صح ببلاش، وبيشتغل حتى لو الـ JavaScript لسه متحمّلش.`,
            how: R`الـ summary بياخد focus لوحده، و role بتاعه عند قارئ الشاشة زرار بـ expanded أو collapsed. الـ [[open]] attribute بيتضاف ويتشال مع كل ضغطة، وفيه حدث [[toggle]] على الـ details لو محتاج تعمل حاجة (تحفظ الحالة مثلًا).

الـ [[name]] (accordion حصري) بقى مدعوم في كل المتصفحات الحديثة من 2024، والمتصفح القديم بيتجاهله فكل واحد بيتفتح لوحده، يعني progressive enhancement من غير ما حاجة تبوظ.

البحث في الصفحة (Ctrl+F) بيلاقي الكلام جوه details مقفول ويفتحه لوحده في Chrome ومتصفحات تانية، بعكس [[display: none]] اللي البحث مبيشوفوش.

السهم اللي جنب الـ summary هو [[::marker]] (أو [[::-webkit-details-marker]] في Safari القديم). وتقدر تشيله بـ [[list-style: none]] على الـ summary وتحط أيقونة بتلف مع [[details[open] summary]]. وتحريك الفتح والقفل بقى ممكن بـ [[::details-content]] و [[interpolate-size]]، بس لسه مش في كل المتصفحات، فخليه تحسين إضافي.`,
            when: R`FAQ، و «تفاصيل إضافية»، وفلاتر في sidebar على الموبايل، وأي محتوى بيتفتح ويتقفل وملوش علاقة بباقي الصفحة. ومش لمنيو التنقل ولا الـ dropdowns (بتتقفل لما تدوس برا، و details مبيعملش كده)، ولا للـ tabs.`,
            mistakes: R`زرار أو لينك جوه الـ summary (عنصر تفاعلي جوه عنصر تفاعلي). تعمل details كمنيو في الـ header وتستغرب إنه مبيتقفلش. تشيل الـ marker ومتحطش أي علامة إنه بيتفتح. و [[<h3>]] جوه الـ summary: مسموح، بس قارئات شاشة كتير بتقراه زرار وخلاص فالعنوان بيضيع من لستة العناوين، فلو العناوين مهمة للتنقل حط الـ h3 قبل الـ details.`
          },
          lines: [
            "الجزء كله ليه اسم من العنوان.",
            "العنوان.",
            R`سؤال مفتوح من الأول، و [[name="faq"]] بيربطه بالباقي.`,
            "الجزء اللي بيتداس عليه، وبياخد focus لوحده.",
            "الإجابة: بتبان بس وهو مفتوح.",
            "قفلة.",
            "سؤال تاني بنفس الـ name: فتحه بيقفل الأول.",
            "السؤال.",
            "الإجابة.",
            "قفلة.",
            "قفلة الـ section.",
            "خط بين الأسئلة ومسافة.",
            "السؤال شكله بيتداس.",
            "السؤال المفتوح بلون البراند ومسافة تحته."
          ],
          sol: R`بالكيبورد: Tab بيقف على كل summary، و Enter أو Space بيفتحوا ويقفلوا، وقارئ الشاشة بيقول «التوصيل بياخد قد إيه؟، button، expanded».

مع [[name="faq"]]: فتح السؤال التاني قفل الأول لوحده. من غير name: الاتنين يفضلوا مفتوحين.

Ctrl+F على كلمة في إجابة مقفولة: في Chrome و Edge الـ details بيتفتح لوحده ويظلل الكلمة. لو متصفحك مبيعملش كده، دي ميزة لسه بتتنشر، والباقي شغال عادي.`
        },
        {
          cmd: "roving tabindex",
          title: "tabs بتتحرك بالأسهم زي البرامج الحقيقية",
          desc: R`الـ tabs widget واحد: Tab بيدخله مرة واحدة ويطلع منه مرة واحدة، وجواه بتتحرك بالأسهم. عشان كده roving tabindex: الـ tab المختار بس عليه [[tabindex="0"]]، والباقي [[tabindex="-1"]]. ولما تدوس سهم، بتنقل الـ 0 والـ focus للي بعده.

الـ roles: [[tablist]] على الحاوية، و [[tab]] على كل زرار ومعاه [[aria-selected]] و [[aria-controls]]، و [[tabpanel]] على كل محتوى ومعاه [[aria-labelledby]].

وفي العربي (RTL) الأسهم بتتقلب: السهم الشمال هو «اللي بعده».`,
          example: R`const list = document.querySelector('[role=tablist]');
const tabs = [...list.querySelectorAll('[role=tab]')];
function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  }
  tab.focus();
}
list.addEventListener('keydown', (e) => {
  const i = tabs.indexOf(document.activeElement);
  const rtl = getComputedStyle(list).direction === 'rtl';
  const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
  if (step) select(tabs[(i + step + tabs.length) % tabs.length]);
  else if (e.key === 'Home') select(tabs[0]);
  else if (e.key === 'End') select(tabs.at(-1));
  else return;
  e.preventDefault();
});
list.addEventListener('click', (e) => {
  const t = e.target.closest('[role=tab]');
  if (t) select(t);
});`,
          try: R`اكتب الـ HTML بتاع 3 tabs (الحساب، والأمان، والفواتير) بالـ roles والـ attributes اللي في الشرح، وحط السكربت في صفحة [[dir="rtl"]]. دوس Tab: بيقف على كام tab؟ جرّب الأسهم و Home و End، وبعدين Tab تاني: راح فين؟`,
          flag: "script",
          deep: {
            why: R`لو كل tab بياخد Tab، مستخدم الكيبورد لازم يعدّي 8 tabs عشان يوصل للمحتوى. والأسهم هي اللي مستخدم قارئ الشاشة متوقعها، لأن ده سلوك الـ tabs في كل برنامج. ونفس الفكرة في toolbar، و radio group، و listbox، و menu، و grid.`,
            how: R`[[tabindex="-1"]] بيشيل العنصر من ترتيب الـ Tab بس بيسيبه يقبل [[focus()]] من الكود. فالـ widget كله بيبان في الـ Tab كعنصر واحد (اللي عليه 0)، ولما ترجع له بتلاقي آخر tab كنت عليه.

[[(i + step + tabs.length) % tabs.length]] بيلف: من الأخير للأول ومن الأول للأخير. و [[getComputedStyle(list).direction]] بيعرف الاتجاه من الـ CSS الحقيقي (موروث من [[dir]] على الـ html)، فنفس الكود يشتغل في العربي والإنجليزي.

ده «automatic activation»: السهم بيختار ويعرض على طول. لو عرض المحتوى تقيل (بيجيب بيانات)، الأحسن «manual activation»: السهم بينقل الـ focus بس، و Enter أو Space بيختار.

و [[hidden]] على الـ panels بيشيلهم من الشاشة وقارئ الشاشة. والـ tabpanel ممكن ياخد [[tabindex="0"]] لو مفيهوش أي عنصر بياخد focus، عشان Tab يوصل للمحتوى.

الـ combobox (حقل بحث بقايمة اقتراحات) أصعب بكتير: [[aria-activedescendant]]، والكتابة، والفلترة، والإعلان عن عدد النتايج. متكتبوش بإيدك: استخدم مكتبة headless زي React Aria أو Headless UI أو Base UI، ولو الاقتراحات بسيطة فيه [[<datalist>]] الأصلي.`,
            when: R`اكتب roving tabindex بإيدك لو مش بتستخدم مكتبة، أو عشان تفهم إيه اللي بيحصل. في مشروع React عادي استخدم Radix Tabs (أو shadcn Tabs) اللي عاملين كل ده صح، واعرف تختبرهم بالكيبورد.`,
            mistakes: R`كل الـ tabs [[tabindex="0"]]. الأسهم في RTL بالعكس. tabs من divs من غير roles. تعمل tabs بـ [[<a href="#">]] بتغيّر المحتوى (ده تنقل لو كل tab صفحة فعلًا، فيبقى nav عادي مش tabs). تنسى [[e.preventDefault()]] فالسهم يعمل scroll للصفحة كمان. وسؤال انترفيو: «إيه roving tabindex وليه؟» والإجابة: وقفة Tab واحدة للـ widget، والأسهم جواه، زي الـ radio group.`
          },
          lines: [
            "الحاوية.",
            "كل الـ tabs في مصفوفة.",
            "اختيار tab.",
            "لكل tab...",
            "...هو ده المختار؟",
            "aria-selected بـ true أو false.",
            "المختار بس عليه 0 والباقي -1: وقفة Tab واحدة.",
            "المحتوى بتاعه يبان والباقي يستخبى.",
            "قفلة الـ for.",
            "الـ focus على الـ tab الجديد.",
            "قفلة.",
            "الأسهم جوه الـ tablist.",
            "مكان الـ focus الحالي.",
            "الاتجاه الحقيقي من الـ CSS.",
            "في RTL اليمين = اللي قبله والشمال = اللي بعده.",
            "سهم: روح للي بعده أو قبله ولف في الآخر.",
            "Home: الأول.",
            "End: الأخير.",
            "أي زرار تاني: سيبه للمتصفح.",
            "منع الـ scroll بالأسهم.",
            "قفلة.",
            "الضغط بالماوس...",
            "...على أي tab...",
            "...يختاره.",
            "قفلة."
          ],
          sol: R`Tab من برا بيقف على «الحساب» بس (الوحيد اللي عليه 0). في [[dir="rtl"]]: السهم الشمال بيروح لـ «الأمان» والمحتوى بتاعه يظهر، والسهم اليمين يرجع (ومن الأول بيلف للأخير)، و Home و End للأول والآخر. و Tab بعد كده بيخرج من الـ tabs على طول للـ panel أو اللي بعده.

جربنا الكود ده في jsdom: بعد ArrowLeft في RTL الـ focus على t2 والـ tabIndex بقوا [[-1,0,-1]] والـ panel التاني ظهر.

لو كل tab واقف عليه Tab: نسيت [[tabindex="-1"]] على الباقي في الـ HTML. لو الأسهم بالعكس: الـ [[dir]] مش متحط، أو بتقرا [[document.dir]] بدل الـ CSS.`,
          solCode: R`<div role="tablist" aria-label="الإعدادات">
  <button type="button" role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" tabindex="0">الحساب</button>
  <button type="button" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">الأمان</button>
  <button type="button" role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1">الفواتير</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">بيانات الحساب...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>كلمة السر والـ 2FA...</div>
<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>الفواتير...</div>`
        },
        {
          cmd: "scroll-snap و scroll-margin",
          title: "carousel من CSS بس، وعنوان ميستخباش تحت الـ header",
          desc: R`[[scroll-snap-type: x mandatory]] على الحاوية و [[scroll-snap-align: start]] على العناصر: لما المستخدم يسيب الـ scroll، بيقف على أول كارت بالظبط بدل ما يقف في النص. carousel كامل بـ swipe على الموبايل من غير مكتبة.

و [[scroll-margin-top]] على العنصر بيسيب مسافة فوقه لما المتصفح يعمل scroll ليه (لينك [[#pricing]]، أو [[scrollIntoView]])، فالعنوان ميستخباش تحت الـ header الثابت. و [[scroll-padding-top]] على الـ html نفس الفكرة بس لكل العناصر مرة واحدة، وبيشمل الـ focus بالـ Tab.`,
          example: R`<ul class="carousel" tabindex="0" aria-label="منتجات مقترحة">
  <li><img src="/p/1.webp" alt="سماعة" width="300" height="300"></li>
  <li><img src="/p/2.webp" alt="ماوس" width="300" height="300"></li>
</ul>
// styles.css
.carousel { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scroll-padding-inline: 1rem; padding-inline: 1rem; }
.carousel > li { flex: 0 0 80%; scroll-snap-align: start; list-style: none; }
html { scroll-padding-top: 5rem; }
h2[id] { scroll-margin-top: 6rem; }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`,
          try: R`اعمل carousel بـ 6 كروت وافتحه في وضع الموبايل واسحب: بيقف فين؟ شيل [[scroll-snap-type]] واسحب تاني. وبعدين اعمل header ثابت ارتفاعه 64px ولينك لـ [[#faq]] تحت، ودوس عليه مع وبدون [[scroll-padding-top]].`,
          flag: "script",
          deep: {
            why: R`الـ carousels مكتبات JavaScript تقيلة عشان حاجة الـ CSS بيعملها أحسن (الـ swipe طبيعي وبنفس إحساس النظام). والـ header الثابت اللي بياكل العنوان اللي رحتله بلينك، أو الحقل اللي عليه focus، مشكلة في كل موقع تقريبًا، ودي قاعدة 2.4.11 في WCAG 2.2.`,
            how: R`[[mandatory]] بيجبر الوقوف على نقطة snap دايمًا، و [[proximity]] بيقف عليها بس لو قريب منها (أحسن لو العناصر أطول من الشاشة، لأن mandatory ممكن يمنعك تشوف نص عنصر طويل). و [[scroll-snap-align]] بيحدد نقطة الوقوف: [[start]] أو [[center]] أو [[end]]، وبتتقلب لوحدها في RTL لأنها logical.

[[scroll-padding-inline]] على الحاوية بيخلي نقطة الوقوف بعد مسافة من الحافة، فالكارت ميلزقش في الطرف. و [[flex: 0 0 80%]] بيخلي جزء من الكارت اللي بعده باين، ودا اللي بيقول للمستخدم «فيه حاجة كمان، اسحب».

[[overscroll-behavior-x: contain]] بيمنع إن الـ scroll لما يخلص يكمّل في الصفحة، أو يعمل «رجوع» في Safari و Chrome على الموبايل.

[[scroll-margin-top]] على العنصر و [[scroll-padding-top]] على الـ scroll container (هنا [[html]]) الاتنين بيتجمعوا. والـ [[scroll-behavior: smooth]] جوه [[prefers-reduced-motion: no-preference]] عشان اللي طالب حركة أقل ميتعبش.

و [[tabindex="0"]] على الـ carousel عشان مستخدم الكيبورد يقدر يعمل scroll بالأسهم (زي درس الجدول). ولو عايز أزرار «التالي والسابق»، [[scrollBy({ left: el.clientWidth })]] سطر واحد، والـ snap بيظبط الوقفة.`,
            when: R`carousel منتجات أو صور أو testimonials، و galleries، و onboarding screens على الموبايل. و scroll-padding-top في أي موقع فيه header ثابت. ولو محتاج autoplay أو loop لا نهائي أو thumbnails متزامنة، ساعتها مكتبة (Embla مثلًا).`,
            mistakes: R`[[mandatory]] مع عناصر أطول من الشاشة فالمستخدم ميعرفش يوصل لنصها. [[scroll-behavior: smooth]] من غير احترام reduced motion. carousel بيتحرك لوحده ومفيهوش إيقاف. كل الكروت بعرض 100% فالمستخدم مش عارف إن فيه غيرهم. و [[scroll-margin-top]] بقيمة ثابتة والـ header ارتفاعه بيتغير على الموبايل، فخليها CSS variable بارتفاع الـ header.`
          },
          lines: [
            "القايمة الأفقية: ليها اسم وبتاخد focus للـ scroll بالكيبورد.",
            "كارت.",
            "كارت.",
            "قفلة.",
            R`flex أفقي، و scroll أفقي، والوقوف إجباري على نقط الـ snap، والـ scroll ميكمّلش للصفحة، ونقطة الوقوف بعد 1rem من الحافة.`,
            "كل كارت 80% من العرض (فاللي بعده باين)، والوقوف على بدايته.",
            "أي scroll لعنصر (لينك # أو focus) يسيب 5rem للـ header الثابت.",
            "والعناوين اللي ليها id مسافة زيادة.",
            "scroll ناعم للينكات، بس للي مش طالب حركة أقل."
          ],
          sol: R`مع [[scroll-snap-type]]: لما تسيب إيدك في أي مكان، الـ carousel بيكمّل لحد ما بداية كارت تبقى على الحافة (بعد 1rem). من غيره: بيقف مكان ما سبته، ممكن في نص كارتين.

اللينك لـ [[#faq]] من غير scroll-padding: العنوان بيبقى تحت الـ header الثابت ومش باين. مع [[scroll-padding-top: 5rem]]: العنوان باين تحت الـ header على طول. ونفس الحكاية مع Tab على حقل تحت الـ header وانت طالع لفوق.

لو الـ snap مش شغال: اتأكد إن [[overflow-x: auto]] على نفس العنصر اللي عليه [[scroll-snap-type]]، وإن [[scroll-snap-align]] على الأولاد المباشرين.`
        },
        {
          cmd: "View Transitions",
          title: "حركة ناعمة بين حالتين أو صفحتين",
          desc: R`[[document.startViewTransition(update)]] بياخد صورة للصفحة قبل، ويشغّل الدالة اللي بتغيّر الـ DOM، وياخد صورة بعد، ويعمل crossfade بينهم. ولو عنصر ليه [[view-transition-name]] في الحالتين، بيتحرك ويكبر من مكانه القديم للجديد (صورة المنتج في اللستة بتطير لصفحة التفاصيل).

وبين صفحات حقيقية (MPA): [[@view-transition { navigation: auto; }]] في CSS الصفحتين، من غير JavaScript.

دي progressive enhancement: لو المتصفح مش بيدعمها، التغيير بيحصل عادي من غير حركة.`,
          example: R`function show(view) {
  const update = () => main.replaceChildren(view);
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
  document.startViewTransition(update);
}
// styles.css
.product-42 .thumb { view-transition-name: product-42; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; }
@view-transition { navigation: auto; }
@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none; } }`,
          try: R`اعمل لستة منتجات وصفحة تفاصيل في نفس الـ HTML، وبدّل بينهم بـ [[show()]]. جرّب من غير [[view-transition-name]]، وبعدين حطه على صورة المنتج في الحالتين بنفس الاسم. وفي DevTools › More tools › Animations بطّأ الحركة لـ 10% وشوف إيه اللي بيتحرك.`,
          flag: "script",
          deep: {
            why: R`الحركة بين الحالات بتوضح للمستخدم إيه اللي حصل: الصورة اللي داس عليها بقت الصورة الكبيرة، مش صفحة جديدة ظهرت فجأة. قبل كده ده كان محتاج مكتبات animation وحسابات أماكن بإيدك. دلوقتي سطر.`,
            how: R`المتصفح بيعمل snapshot للعناصر اللي ليها أسماء (والصفحة كلها اسمها [[root]])، ويبني شجرة pseudo-elements فوق الصفحة: [[::view-transition-group(name)]] جواه [[::view-transition-old]] و [[::view-transition-new]]. الـ group بيتحرك ويتغير مقاسه من المكان القديم للجديد، والـ old والـ new بيعملوا crossfade. وكله animations عادية تقدر تغيّرها في CSS.

[[view-transition-name]] لازم يبقى فريد في الصفحة وقت الحركة: لو عنصرين بنفس الاسم الحركة بتتلغي. عشان كده في اللستات بيتحط اسم لكل عنصر (inline style بالـ id)، أو بيتحط على العنصر اللي اتداس بس قبل الحركة.

الدعم: الـ same-document ([[startViewTransition]]) بقى في كل المتصفحات الأساسية من أواخر 2025. الـ cross-document ([[@view-transition]]) في Chrome و Edge و Safari، ولسه مش في كل المتصفحات وقت كتابة الدرس، فراجع caniuse. وفي الحالتين الكود بيشتغل عادي من غير الحركة لو مش مدعوم.

في React و Next: فيه شغل على مكون [[<ViewTransition>]] في React و flag تجريبي في Next.js، اتأكد من حالتهم في الدوكس بتاعة النسخة اللي عندك قبل ما تعتمد عليهم.`,
            when: R`لستة لتفاصيل، وتبديل الـ tabs أو الـ views، وتغيير ترتيب لستة، وفتح صورة كبيرة. وخليها قصيرة (200 لـ 300ms) وقليلة، واحترم reduced motion دايمًا.`,
            mistakes: R`نفس الـ view-transition-name على كذا عنصر فمفيش حركة خالص. حركة طويلة بتخلي الموقع يحس إنه بطيء. تنسى reduced motion. تستدعي [[startViewTransition]] من غير ما تتأكد إنه موجود فالموقع يقع في المتصفحات اللي مش بتدعمه. والدالة اللي جوه async وبتجيب بيانات من السيرفر: الصفحة بتبقى متجمدة لحد ما تخلص، فهات البيانات الأول وبعدين ابدأ الحركة.`
          },
          lines: [
            "بتعرض view جديد (لستة أو تفاصيل).",
            "التغيير نفسه: بدّل محتوى الـ main.",
            "المتصفح مش بيدعم، أو المستخدم طالب حركة أقل؟ غيّر من غير حركة.",
            "غير كده: غيّر جوه view transition.",
            "قفلة.",
            "صورة المنتج ليها نفس الاسم في اللستة والتفاصيل، فبتطير من مكان للتاني.",
            "الـ crossfade بتاع الصفحة كلها أسرع من الافتراضي.",
            "حركة بين الصفحات الحقيقية (لازم في الصفحتين ونفس الـ origin).",
            "اللي طالب حركة أقل: من غير animation."
          ],
          sol: R`من غير [[view-transition-name]]: الصفحة كلها بتعمل fade من اللستة للتفاصيل. مع الاسم على الصورة في الحالتين: الصورة بتتحرك وتكبر من مكانها في اللستة لمكانها في التفاصيل، والباقي fade. في Animations panel بـ 10% هتشوف الـ group بيتحرك والـ old والـ new بيتبدّلوا.

لو مفيش أي حركة: غالبًا الاسم متكرر (كل صور اللستة عليها نفس الاسم)، أو متصفحك مش بيدعم، أو إعداد reduce motion شغال في نظامك. ولو الصفحة وقفت ثانية قبل الحركة: الـ update فيه fetch، هات البيانات قبل.`
        },
        {
          cmd: "text-wrap",
          title: "عنوان سطره الأخير كلمة لوحدها",
          desc: R`[[text-wrap: balance]] بيوزّع كلام العنوان على السطور بالتساوي، بدل سطر مليان وسطر فيه كلمة واحدة. و [[text-wrap: pretty]] للفقرات: بيحاول ميخليش كلمة لوحدها في آخر سطر.

وفي Tailwind v4: [[text-balance]] و [[text-pretty]]. ومعاهم [[line-clamp-2]] لو عايز تقطع الكلام بعد سطرين بـ «…».`,
          example: R`h1, h2, h3 { text-wrap: balance; }
p, li, figcaption { text-wrap: pretty; }
.price { white-space: nowrap; }
.card-title { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
<h2 className="text-balance">عرض الصيف: خصم على كل السماعات والشواحن الأصلية</h2>
<p className="text-pretty max-w-prose">...</p>
<h3 className="line-clamp-2">اسم منتج طويل جدًا جاي من الداتابيز ومحدش عارف طوله</h3>`,
          try: R`اعمل عنوان طويل في كارت عرضه 20rem، وغيّر عرض الشاشة لحد ما السطر الأخير يبقى كلمة واحدة. ضيف [[text-wrap: balance]] وشوف الفرق. وبعدين في DevTools اكتب في Console [[CSS.supports('text-wrap', 'pretty')]].`,
          flag: "script",
          deep: {
            why: R`العناوين في الكروت والهيرو بتتقسم وحش على بعض الشاشات، والمصممين كانوا بيحطوا [[<br>]] بإيدهم (وده بيبوظ على شاشة تانية). سطر CSS بيحلها لكل المقاسات.`,
            how: R`[[balance]] بيجرب عروض مختلفة ويختار اللي يخلي السطور قريبة من بعض، وعشان ده مكلّف المتصفحات بتطبقه على عدد سطور محدود (في Chrome حوالي 6)، فهو للعناوين والكلام القصير بس. والصندوق نفسه عرضه مبيتغيرش، الكلام بس اللي بيتوزع جواه.

[[pretty]] أرخص: بيبص على آخر كام سطر ويحاول يتجنب كلمة لوحدها. ودعمه لسه مش في كل المتصفحات وقت كتابة الدرس، واللي مش بيدعمه بيتجاهله ويكسر عادي، فحطه من غير قلق.

[[white-space: nowrap]] على حاجة مينفعش تتقسم (سعر بعملته، رقم تليفون). و [[line-clamp]] بيقطع بعد عدد سطور ويحط «…»، والصيغة الـ [[-webkit-]] هي اللي شغالة في كل المتصفحات لحد دلوقتي، و Tailwind بيكتبها لك.

وكل ده بيشتغل مع العربي عادي لأنه بيكسر عند المسافات.`,
            when: R`balance: كل العناوين (ممكن في الـ base styles مرة واحدة). pretty: الفقرات والـ captions. line-clamp: عناوين الكروت ووصف المنتجات اللي طولها مش معروف.`,
            mistakes: R`balance على فقرات طويلة (مش هيشتغل أو هيبطّأ). [[<br>]] يدوي في العناوين. line-clamp من غير [[overflow: hidden]]. تقطع الكلام بـ JavaScript (substring) فيتقطع في نص كلمة، وقارئ الشاشة يقرا نص الكلام بس، مع line-clamp الكلام كله موجود وبيتقري.`
          },
          lines: [
            "كل العناوين: السطور متوازنة.",
            "الفقرات: من غير كلمة يتيمة في الآخر (لو المتصفح بيدعم).",
            "السعر ميتقسمش على سطرين.",
            "العنوان سطرين بالكتير وبعدين «…».",
            "نفس balance بـ Tailwind.",
            R`نفس pretty، و [[max-w-prose]] عرض مريح للقراية.`,
            "نفس القطع بعد سطرين بـ Tailwind."
          ],
          sol: R`من غير balance: على بعض العروض هتلاقي سطر مليان وتحته «الأصلية» لوحدها. مع balance: سطرين قريبين من بعض في الطول، وعرض الكارت زي ما هو.

[[CSS.supports('text-wrap', 'pretty')]] بيرجع true في Chrome و Edge (ومتصفحات تانية حسب النسخة)، ولو رجع false ده معناه إن المتصفح هيتجاهل السطر، مش إن الصفحة هتبوظ.

لو balance ملوش أي تأثير: غالبًا الكلام أطول من الحد اللي المتصفح بيطبقه عليه، أو العنصر [[display: inline]].`
        },
        {
          cmd: "Baseline و @supports",
          title: "الميزة دي أستخدمها ولا لسه؟ Baseline و caniuse و @supports",
          desc: R`Baseline علامة بتلاقيها في MDN و caniuse: «Newly available» يعني الميزة شغالة في آخر نسخة من Chrome و Edge و Firefox و Safari (ديسكتوب وموبايل)، و «Widely available» يعني عدّى على ده 30 شهر، فأغلب الناس عندهم نسخة بتدعمها.

caniuse.com بيدّيك التفاصيل: أنهي نسخة، ونسبة المستخدمين، والمشاكل المعروفة. و [[@supports]] في CSS (و [[CSS.supports()]] في JavaScript) بيسأل المتصفح نفسه: لو بتدعم الحاجة دي طبّق ده.

و browserslist (في [[package.json]]) بيقول لأدوات الـ build (autoprefixer و Lightning CSS و Babel وغيرهم) إنت بتدعم أنهي متصفحات، فيضيفوا fallbacks على قدها.`,
          example: R`.card { background: white; }
@supports (background: color-mix(in oklch, red, blue)) {
  .card { background: color-mix(in oklch, var(--color-brand) 8%, white); }
}
@supports not selector(:has(a)) {
  .has-fallback { display: block; }
}
if (CSS.supports('anchor-name', '--x')) document.documentElement.classList.add('has-anchor');
// package.json
"browserslist": ["baseline widely available"]`,
          try: R`في أي فولدر فيه Node شغّل [[npx browserslist "baseline widely available"]] و [[npx browserslist --coverage "baseline widely available"]] و [[npx browserslist "defaults"]]. وبعدين افتح MDN لـ [[text-wrap]] و [[:has()]] وبص على علامة Baseline فوق كل صفحة.`,
          flag: "script",
          deep: {
            why: R`كل شهر فيه ميزة CSS جديدة، وسؤال «أستخدمها في الشغل؟» كان محتاج تفتح caniuse وتحسب نسب. Baseline بتدّيك إجابة سريعة، و @supports بيخليك تستخدم الجديد النهارده من غير ما تكسر القديم. ودا بيتسأل في الانترفيو: «بتتعامل إزاي مع ميزة مش مدعومة في كل المتصفحات؟»`,
            how: R`progressive enhancement: اكتب الأساس اللي شغال في كل حتة الأول (خلفية بيضا)، وبعدين جوه [[@supports]] التحسين. المتصفح اللي مش فاهم الشرط بيتجاهل البلوك كله. و [[selector()]] جوه @supports بيسأل عن selector (زي [[:has()]]). و [[not]] للـ fallback.

في CSS أصلًا المتصفح بيتجاهل أي خاصية مش فاهمها، فكتير كفاية تكتب السطرين ورا بعض: [[color: red; color: oklch(...)]] والقديم ياخد الأول والجديد ياخد التاني. @supports بتحتاجها لما التحسين محتاج أكتر من خاصية أو بيغيّر الـ layout.

browserslist بيقبل queries زي [[defaults]] (أكتر من 0.5% استخدام وآخر نسختين ومتصفحات مش ميتة)، و [[baseline widely available]]، و [[baseline 2024]]. البيانات جاية من caniuse-lite، فحدّثها كل فترة بـ [[npx update-browserslist-db@latest]].

و Vite من نسخة 7 الـ build target الافتراضي بتاعه [[baseline-widely-available]]. و Tailwind v4 نفسه مبني على CSS حديث (cascade layers و [[@property]] و [[color-mix]])، فمحتاج متصفحات حديثة (Safari 16.4 و Chrome 111 و Firefox 128 تقريبًا وطالع)، ولو لازم تدعم أقدم من كده خليك على v3.`,
            when: R`قبل ما تستخدم أي ميزة CSS أو JavaScript جديدة في مشروع حقيقي: Widely available استخدمها عادي. Newly available استخدمها كتحسين مع fallback. لسه مش Baseline: @supports أو استنى. وحط browserslist في أول المشروع عشان كل الأدوات تتفق.`,
            mistakes: R`تستخدم ميزة لأنها شغالة في Chrome عندك (نص مستخدمين الموبايل في مصر وغيرها على Safari أو متصفحات قديمة). @supports على حاجة كل المتصفحات بتدعمها (كود زيادة على الفاضي). تنسى تحدّث caniuse-lite فالـ build يستهدف متصفحات قديمة. تكتب الـ fallback بعد الجديد (الترتيب مهم: الأساس الأول). وتفتكر إن autoprefixer بيضيف الميزة نفسها: هو بيضيف prefixes بس، مش polyfills.`
          },
          lines: [
            "الأساس: شغال في كل المتصفحات.",
            R`لو المتصفح بيدعم [[color-mix]]...`,
            "...خلفية فيها لمسة خفيفة من لون البراند.",
            "قفلة.",
            R`لو المتصفح مش بيدعم [[:has()]]...`,
            "...اعرض الـ fallback.",
            "قفلة.",
            R`نفس السؤال من JavaScript: لو بيدعم anchor positioning علّم الـ html بكلاس.`,
            "الأدوات كلها تستهدف المتصفحات اللي فيها الميزات المنتشرة من 30 شهر أو أكتر."
          ],
          sol: R`وقت كتابة الدرس (بيانات caniuse-lite في سبتمبر 2026)، [[baseline widely available]] طلّع 133 نسخة متصفح، أقدمها تقريبًا Chrome 123 و Firefox 124 و Safari 17.4، و [[--coverage]] قال إنهم حوالي 87% من المستخدمين في العالم. الأرقام عندك هتختلف حسب نسخة البيانات، ودا الطبيعي.

[[defaults]] بيطلّع لستة مختلفة: فيها متصفحات أقدم بكتير (زي Chrome 109 و Opera Mini) لأنه مبني على نسبة الاستخدام مش على الميزات.

في MDN: [[:has()]] عليه Baseline (متاح في كل المتصفحات الأساسية)، و [[text-wrap]] ممكن تلاقي قيمه مختلفة الحالة (balance منتشرة، و pretty لسه مش في كل حتة). ودا بالظبط المكان اللي تقرر منه: balance استخدمها عادي، و pretty كتحسين.`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتسأل في أي انترفيو frontend، بإجابة تقولها بصوتك في دقيقة",
      items: [
        {
          cmd: "4 طبقات و box-sizing",
          title: "اشرح الـ box model (Explain the CSS box model)",
          desc: R`كل عنصر صندوق من 4 طبقات من جوه لبرا: content و padding و border و margin. الـ width الافتراضي (content-box) بيحدد المحتوى بس، فالـ padding والـ border بيتزودوا عليه. مع [[border-box]] الـ width بيبقى العرض الكامل شامل الـ padding والـ border، ودا اللي بنحطه على كل حاجة في أي مشروع (و Tailwind بيعمله في الـ Preflight). الـ margin برا الحساب في الحالتين، والـ margin الرأسي بين عنصرين block بيعمل collapse: الأكبر بس اللي بيفضل.`,
          example: R`.box { width: 200px; padding: 20px; border: 5px solid; }
.box { box-sizing: content-box; }
.box { box-sizing: border-box; }`,
          try: R`افتح DevTools › Computed على أي عنصر، واشرح الأرقام اللي في رسمة الصندوق بصوت عالي كأنك في انترفيو.`,
          flag: "script",
          deep: {
            why: "سؤال أساسي بيختبر إنك فاهم ليه الحاجات بتطلع أعرض من المتوقع، وإنك مش بتحل كل حاجة بالتجربة.",
            how: "لو عايز تتميز: margin collapse مش بيحصل جوه flex و grid ولا في الاتجاه الأفقي، والـ padding بالنسبة المئوية بيتحسب من عرض الأب حتى الرأسي، والعناصر الـ inline بتتجاهل width و height والـ margin الرأسي.",
            when: R`أسئلة المتابعة: «إيه الـ margin collapse وإمتى مبيحصلش؟» و «inline و block و inline-block الفرق؟» و «[[width: 100%]] مع padding ليه بيعمل scroll أفقي؟».`,
            mistakes: "«الـ margin جزء من العرض». أو «border-box بيشيل الـ padding». أو نسيان إن الافتراضي content-box مش border-box."
          },
          lines: [
            "صندوق بعرض 200 و padding 20 و border 5.",
            "content-box: العرض الظاهر 200 + 40 + 10 = 250.",
            "border-box: العرض الظاهر 200، والمحتوى 150."
          ],
          sol: R`إجابة نموذجية على [[.box]] في المثال: «الرسمة فيها 4 طبقات من جوه لبرا: content، وبعدين padding، وبعدين border، وبعدين margin. مع [[content-box]] (الافتراضي) الـ 200 دي عرض المحتوى بس، فالعنصر على الشاشة 200 + 20×2 + 5×2 = 250px. مع [[border-box]] الـ 200 هي العرض الكلي لحد الـ border، فالمحتوى بيصغر لـ 200 − 40 − 10 = 150px. الـ margin برا الحساب في الحالتين، وهو مسافة بيني وبين اللي جنبي مش جزء من العنصر.»

نقط تزوّد بيها الإجابة: إن كل المشاريع الحديثة (و Tailwind في الـ preflight) بتعمل [[*, ::before, ::after { box-sizing: border-box }]] لأن الحساب بيبقى أسهل مع [[width: 50%]] و padding. وإن الـ margin الرأسي بين عنصرين block بيعمل collapse (بياخد الأكبر مش المجموع)، وده مش بيحصل جوه flex ولا grid. وإن [[offsetWidth]] بيرجع العرض لحد الـ border، و [[clientWidth]] من غير الـ border.

الغلط اللي يوقعك: تقول إن الـ margin داخل في الـ width مع border-box، أو تنسى الـ border في الحساب وتقول 240.`
        },
        {
          cmd: "(id, class, type)",
          title: "إزاي المتصفح بيقرر أنهي قاعدة تكسب؟ (How does CSS specificity work?)",
          desc: R`لما قاعدتين بيغيّروا نفس الخاصية على نفس العنصر، المتصفح بيبص الأول على [[!important]]، وبعدين الـ inline style، وبعدين الـ cascade layers، وبعدين الـ specificity، وآخر حاجة الترتيب في الكود. الـ specificity تلات خانات: عدد الـ ids، وبعدين الـ classes والـ attributes والـ pseudo-classes، وبعدين أنواع العناصر والـ pseudo-elements. بتتقارن خانة خانة، فـ id واحد يغلب أي عدد classes. و [[:where()]] وزنها صفر، والوراثة ملهاش وزن خالص.`,
          example: R`nav a { color: gray; }
.link { color: blue; }
nav .link:hover { color: navy; }
:where(nav) .link { color: teal; }`,
          try: R`اكتب 5 selectors على ورقة واحسب الـ specificity بتاعتهم، وبعدين اتأكد بإنك تقف عليهم في DevTools › Styles.`,
          flag: "script",
          deep: {
            why: "بيتسأل عشان يعرف هل بتفهم ليه CSS بيتصرف كده، ولا بتحط !important لحد ما يشتغل.",
            how: R`لو عايز تتميز: اذكر إن Tailwind v4 بيستخدم cascade layers، وإن أي CSS برا layer بيغلب الـ utilities مهما كانت الـ specificity. واذكر إن [[:is()]] و [[:not()]] و [[:has()]] وزنهم = أتقل حاجة جواهم.`,
            when: R`أسئلة المتابعة: «!important بيتعامل إزاي؟» و «إيه الـ cascade layers؟» و «[[:is()]] وزنها كام؟» و «إزاي تتجنب حروب الـ specificity في مشروع كبير؟» (BEM، أو utility-first، أو layers).`,
            mistakes: "«اللي مكتوب آخر بيكسب» على طول (ده آخر معيار بس). «11 class تغلب id» (لأ، الخانات مش بتتحوّل). «الـ inline style مينفعش يتغلب» (!important بيغلبه)."
          },
          lines: [
            "(0,0,2).",
            "(0,1,0): بتغلب اللي فوق.",
            "(0,2,1): class و pseudo-class ونوع.",
            R`(0,1,0): الـ where صفر، فزي [[.link]] بالظبط، والترتيب هو اللي يحسم.`
          ],
          sol: R`مثال محلول لـ 5 selectors (والأرقام دي بالظبط اللي DevTools بيظهرها لما تقف عليهم): [[nav a]] ‏(0,0,2)، و [[.link]] ‏(0,1,0)، و [[nav .link:hover]] ‏(0,2,1) لأن [[:hover]] pseudo-class بيتحسب زي الكلاس، و [[:where(nav) .link]] ‏(0,1,0) لأن [[:where]] بيصفّر اللي جواه، و [[#main .link::after]] ‏(1,1,1) لأن الـ pseudo-element بيتحسب زي الـ type.

الإجابة اللي تقولها: «المتصفح بيقارن 3 خانات بالترتيب (id، class/attribute/pseudo-class، type/pseudo-element)، زي رقم من 3 خانات من غير ما واحدة تفيض على التانية؛ 11 كلاس عمرهم ما يغلبوا id واحد. لو اتعادلوا، اللي جاي آخر في الملف يكسب. والـ inline style أقوى منهم كلهم، و [[!important]] بيقلب اللعبة. وقبل الـ specificity أصلًا بيبص على الـ origin والـ [[@layer]]: القاعدة اللي برا layer بتكسب أي قاعدة جوه layer.» وزوّد: [[:is()]] و [[:not()]] بياخدوا specificity أقوى حاجة جواهم، و [[:where()]] صفر، وده بيستخدم في المكتبات عشان تسهّل عليك تغطي عليها.

الغلط الشائع في الحساب: تعد [[:hover]] أو [[[type="email"]]] كـ type (هما خانة الكلاس)، أو تعد [[*]] و [[>]] (قيمتهم صفر).`
        },
        {
          cmd: "بُعد واحد وبُعدين",
          title: "إمتى تستخدم flex وإمتى grid؟ (Flexbox vs Grid)",
          desc: R`Flexbox للـ layout في بُعد واحد: صف أو عمود، والعناصر نفسها بتحدد حجمها، والمساحة بتتوزع حسب محتواها. Grid للـ layout في بُعدين: بتعرّف الصفوف والأعمدة من الأب، والعناصر بتتحط في الخانات، فالأعمدة بتفضل متصفة في كل الصفوف. عمليًا: flex للمكونات (navbar، وأيقونة جنب كلام، وزراير)، و grid للـ layout (الصفحة، وشبكة كروت، وفورم بعمودين). وغالبًا بستخدمهم مع بعض: grid للهيكل و flex جوه كل خانة.`,
          example: R`.nav { display: flex; justify-content: space-between; align-items: center; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }`,
          try: R`اعمل نفس شبكة الكروت مرة بـ [[flex-wrap]] ومرة بـ grid بـ 5 كروت، وشوف الفرق في الكارت الأخير. دي أحسن إجابة عملية تقولها.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار الأداة حسب المشكلة، مش حسب العادة.",
            how: R`لو عايز تتميز: flex «content-out» (المحتوى بيحدد المقاسات)، و grid «layout-in» (الأب بيحدد والمحتوى بيتحط). واذكر [[subgrid]] لما عايز كروت جوه grid عناوينها وأزرارها متصفة.`,
            when: R`أسئلة المتابعة: «ليه آخر سطر في كروت flex-wrap شكله غريب؟» و «إيه الفرق بين auto-fit و auto-fill؟» و «ليه [[flex: 1]] مش بيوزّع بالتساوي ساعات؟» (المحتوى و min-width: auto).`,
            mistakes: "«grid أحدث فهو أحسن»، أو «flex للموبايل و grid للديسكتوب». الاتنين مش بديل لبعض، والإجابة لازم تبقى عن الأبعاد ومين بيتحكم في المقاسات: المحتوى ولا الأب."
          },
          lines: [
            "flex: عناصر في صف، والمسافة بينهم.",
            "grid: شبكة أعمدة متساوية بتتأقلم مع العرض."
          ],
          sol: R`اللي هتشوفه بـ 5 كروت على شاشة تساع 4: مع [[flex-wrap]] و [[flex: 1 1 250px]] أول 4 في سطر، والخامس لوحده في السطر التاني وممطوط بعرض الشاشة كلها (قست ده على 1200px: الأربعة 288px والخامس 1200px). مع grid بـ [[repeat(auto-fit, minmax(250px, 1fr))]] الخامس بنفس عرض الباقيين وتحت الأول بالظبط، والباقي من السطر فاضي.

الإجابة النموذجية: «flex بيفكّر في بُعد واحد: كل سطر بيوزّع المساحة على عناصره لوحده ومش عارف حاجة عن السطر اللي تحته، عشان كده الأخير بيتمط. grid بيفكّر في بُعدين: الأعمدة متعرّفة على الأب، فكل العناصر بترص على نفس الخطوط. بستخدم flex لما المحتوى هو اللي يحدد المقاس (nav، أزرار جنب بعض، سطر صورة واسم وزرار)، و grid لما الـ layout هو اللي يحدد (شبكة كروت، layout الصفحة، فورم بـ label وinput متراصين).»

ونقطة زيادة: الاتنين مش بديل لبعض، وكتير بتلاقي grid للصفحة و flex جوه كل كارت. ولو حد قالك «flex للحاجات الصغيرة و grid للكبيرة» ده مش دقيق؛ المعيار بُعد واحد ولا اتنين.`
        },
        {
          cmd: "containing block",
          title: "إيه الفرق بين قيم position الخمسة؟",
          desc: R`[[static]] الافتراضي: العنصر في الـ flow و top و left ملهمش تأثير. [[relative]] في الـ flow ومكانه محجوز، وبيتزق بصريًا بس، وبيبقى مرجع لأولاده الـ absolute. [[absolute]] بيطلع من الـ flow ومكانه بيتحسب من أقرب جد positioned. [[fixed]] بيطلع من الـ flow ومكانه من الشاشة، فبيفضل ثابت مع الـ scroll. [[sticky]] بيتصرف relative لحد ما يوصل للحد اللي حددته ([[top: 0]]) وبعدين يلزق، جوه حدود أبوه بس.`,
          example: R`.parent { position: relative; }
.badge { position: absolute; top: 0; inset-inline-end: 0; }
.header { position: sticky; top: 0; }`,
          try: R`اعمل الـ 5 قيم على 5 مربعات في صفحة طويلة واعمل scroll، واشرح اللي بيحصل لكل واحد.`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل «العنصر راح فين؟» و «ليه الهيدر مش ثابت؟» سببها position، فبيتسأل كتير.",
            how: R`لو عايز تتميز: الـ containing block بتاع absolute هو أقرب جد positioned، بس [[transform]] أو [[filter]] على أي جد بيعمل containing block برضه، حتى للـ fixed. ودا سبب إن مودال fixed جوه عنصر متحرك بيتحبس، والحل portal.`,
            when: R`أسئلة المتابعة: «ليه الـ sticky مش شغال؟» (overflow على جد، أو مفيش top، أو الأب قد العنصر بالظبط). «ليه fixed جوه عنصر عليه transform بيتصرف غلط؟» و «z-index بيشتغل على مين؟».`,
            mistakes: "«absolute بيتحسب من الأب» (من أقرب جد positioned، مش الأب المباشر بالضرورة). «fixed دايمًا من الشاشة» (إلا لو جد عليه transform أو filter). ونسيان sticky خالص."
          },
          lines: [
            "الأب مرجع للـ absolute.",
            "الشارة في ركن النهاية فوق.",
            "الهيدر يلزق فوق وانت نازل."
          ],
          sol: R`اللي هتشوفه وانت بتعمل scroll: [[static]] بيمشي مع الصفحة، و [[top]] و [[z-index]] ملهمش أي تأثير عليه. [[relative]] بيمشي مع الصفحة برضه، بس متزحزح بالـ [[top]]/[[left]] عن مكانه الأصلي، والمكان الأصلي فاضي محجوز (اللي بعده مش بيطلع مكانه). [[absolute]] خرج من الـ flow خالص (اللي بعده طلع مكانه)، ومتحط بالنسبة لأقرب أب positioned، ولو مفيش بالنسبة لأول شاشة، وبيمشي مع الـ scroll. [[fixed]] ثابت في مكانه على الشاشة مهما عملت scroll. [[sticky]] بيمشي عادي لحد ما يوصل للـ [[top]] بتاعه، وبعدين بيلزق، ولما أبوه يخلص بيمشي معاه ويطلع.

الإجابة النموذجية بتلف حوالين كلمة containing block: «لكل عنصر فيه حد بيتحسب منه. للـ absolute هو أقرب جد مش static، للـ fixed هو الـ viewport، للـ sticky هو أقرب scroll container.» والفخ اللي يفرّقك: الـ fixed بيبطّل يبقى بالنسبة للشاشة لو أي جد عليه [[transform]] أو [[filter]] أو [[contain]]، وساعتها بيتصرف زي absolute جوه الجد ده. والـ sticky بيبطّل لو فيه جد عليه [[overflow: hidden]].`
        },
        {
          cmd: "mobile-first",
          title: "هتعمل الموقع responsive إزاي؟ (Responsive strategy)",
          desc: R`أبدأ بـ meta viewport، وبعدين أكتب الـ CSS الأساسي لأصغر شاشة، وأضيف بـ [[min-width]] media queries للأكبر، والـ breakpoints حسب المحتوى (لما الشكل يبوظ) مش حسب أجهزة. وبعتمد على layouts مرنة من نفسها: flex-wrap، و grid بـ auto-fit و minmax، ووحدات مرنة: rem و % و clamp للخطوط والمسافات، وصور بـ [[max-width: 100%]] و srcset. وللمكونات اللي بتتحط في أماكن مختلفة container queries. وبختبر على أجهزة حقيقية مش DevTools بس، وبتأكد من أهداف اللمس (حوالي 44px، وأقل حاجة 24 في WCAG 2.2) ومن إن مفيش حاجة مهمة معتمدة على hover.`,
          example: R`.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); }
h1 { font-size: clamp(1.75rem, 1rem + 3vw, 3rem); }
@media (width >= 64rem) { .layout { grid-template-columns: 16rem 1fr; } }`,
          try: R`خد صفحة من مشروع ليك، وافتحها على 320px و 768px و 1440px، واكتب كل مكان بيبوظ والـ breakpoint اللي هيحله.`,
          flag: "script",
          deep: {
            why: "بيختبر إن عندك منهج، مش «بظبط لحد ما يبان كويس».",
            how: "لو عايز تتميز: اذكر إن breakpoints بـ rem بتحترم إعداد خط المستخدم، وإن Tailwind v4 بيلف hover في (hover: hover)، وإنك بتعمل intrinsic layouts (auto-fit و clamp و container queries) فالـ media queries بتقل.",
            when: "أسئلة المتابعة: «الفرق بين mobile-first و desktop-first؟» و «إيه الـ breakpoints اللي بتستخدمها وليه؟» و «container queries ولا media queries؟» و «بتتعامل مع الصور إزاي؟».",
            mistakes: "«بستخدم Bootstrap أو Tailwind فهو responsive لوحده». أو إجابة كلها breakpoints لأجهزة معينة من غير layouts مرنة. أو نسيان الـ viewport meta."
          },
          lines: [
            "شبكة بتتأقلم مع أي عرض من غير breakpoints.",
            "عنوان بيكبر مع الشاشة بين حد أدنى وأقصى.",
            "breakpoint واحد للـ layout الكبير: sidebar ومحتوى."
          ],
          sol: R`نموذج لنتيجة التجربة (صفحة منتجات عادية): على 320: الـ nav اللينكات طالعة برا الشاشة ← محتاج منيو burger تحت 48rem. الجدول بيعمل scroll للصفحة كلها ← wrapper بـ [[overflow-x: auto]] (مش breakpoint). الـ h1 كبير ومكسّر كلمات ← [[clamp()]]. على 768: كارتين في السطر وفيه فراغ كبير ← [[auto-fit]] يحلها من غير breakpoint. على 1440: السطور طويلة جدًا في القراية ← [[max-width: 65ch]]. والـ sidebar محتاج يظهر جنب ← breakpoint عند 64rem.

الإجابة النموذجية: «ببدأ بالموبايل لأنه أصعب حالة، والـ CSS الأساسي من غير media query بيبقى للشاشة الصغيرة، وبزوّد بـ [[min-width]] لما الشكل يبوظ مش لما جهاز معين يظهر. أول ما أقدر أحلّها من غير breakpoint بعملها: [[auto-fit]] و [[clamp()]] و [[min()]] و flex-wrap. والـ breakpoints بالـ rem عشان تحترم خط المستخدم. ولو المكون بيتحط في أماكن بعروض مختلفة، container query أحسن من media query. وبختبر على جهاز حقيقي عشان dvh و الـ touch و الـ hover.»

الغلط اللي يبان في الإجابة: تعد breakpoints بأسماء أجهزة (iPhone و iPad)، أو تكتب الـ desktop الأول وتصلّح بـ [[max-width]] فالموبايل ينزّل CSS مش محتاجه ويكتب فوقه.`
        },
        {
          cmd: "rem من الـ root",
          title: "إيه الفرق بين px و em و rem؟ (px vs em vs rem)",
          desc: R`[[px]] وحدة ثابتة. [[rem]] مضروبة في font-size بتاع الـ root (html)، والافتراضي 16px، وبتتغير لو المستخدم كبّر الخط من إعدادات المتصفح. [[em]] مضروبة في font-size بتاع العنصر نفسه، وفي خاصية font-size نفسها بتاعة الأب، فبتتراكم لو العناصر جوه بعض. أنا بستخدم rem للخطوط والمسافات عشان تحترم إعدادات المستخدم وتفضل متناسقة، و em للحاجات اللي لازم تتناسب مع خط المكون نفسه زي padding الزرار أو أيقونة جنب كلام، و px للحاجات اللي لازم تفضل رفيعة زي الـ border.`,
          example: R`html { font-size: 100%; }
.btn { font-size: 1.125rem; padding: 0.5em 1em; border: 1px solid; }`,
          try: R`كبّر خط المتصفح من الإعدادات وافتح موقع ليك: اللي مكبرش مكتوب بـ px. دي إجابة عملية قوية في الانترفيو.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الوحدات، وبيفتح باب الـ accessibility.",
            how: R`لو عايز تتميز: Tailwind كله rem ([[--spacing: 0.25rem]])، والـ media queries بـ rem أو em بتتحسب من خط المتصفح الافتراضي مش من خط الـ html، و clamp بـ rem + vw عشان الـ zoom يفضل شغال.`,
            when: R`أسئلة المتابعة: «إيه مشكلة [[html { font-size: 62.5% }]]؟» و «الـ media queries بـ em بتتحسب من إيه؟» و «vw في الخطوط؟».`,
            mistakes: "«rem من الأب» (ده em). «px أسهل ومفيش فرق» (بيكسر تكبير الخط). «em دايمًا من الأب» (بس في font-size، وفي باقي الخصائص من العنصر نفسه)."
          },
          lines: [
            "الأساس 16، أو اللي المستخدم اختاره.",
            "الخط 18، والـ padding 9 و 18 من خط الزرار، والـ border بكسل ثابت."
          ],
          sol: R`اللي هتلاقيه بعد ما تخلي خط المتصفح Large (20px): الكلام اللي مكتوب بـ rem أو em كبر بنسبة 25%، واللي مكتوب بـ px فضل زي ما هو. غالبًا هتلاقي عناوين وأزرار كبرت وحاجات زي الـ footer أو badge صغيرة فضلت صغيرة، وده معناه إن فيه [[font-size: 12px]] في مكان.

الإجابة النموذجية: «[[px]] ثابت ومش بيحترم إعداد خط المستخدم. [[rem]] نسبة من خط الـ [[<html>]] (16px افتراضيًا، أو اللي المستخدم اختاره)، فالصفحة كلها بتكبر مع الإعداد ده. [[em]] نسبة من خط العنصر نفسه (أو الأب لو في [[font-size]])، فبيتراكم لو متداخل: [[0.9em]] جوه [[0.9em]] = 0.81. بستخدم rem للخط والمسافات العامة، و em للحاجات اللي لازم تتناسب مع خط العنصر زي padding الزرار ([[0.5em 1em]] في المثال بيكبر لوحده مع [[.btn-lg]])، و px للـ borders والظلال اللي مش لازم تكبر.»

والنقطة اللي بتفرّقك: متعملش [[html { font-size: 62.5% }]] عشان الحساب يبقى أسهل، ولو عملتها متكتبش [[font-size: 10px]] بدلها أبدًا، لأن الـ px على الـ html بيلغي إعداد المستخدم خالص. وإن الـ zoom (Ctrl +) بيكبّر px كمان، فهو مش الاختبار.`
        },
        {
          cmd: "توليد on-demand",
          title: "Tailwind بيشتغل إزاي من جوه؟ وإيه عيوبه؟",
          desc: R`Tailwind أداة build مش مكتبة runtime. بيعمل scan لملفات المشروع ويدوّر على أسماء كلاسات بيعرفها، ويطلّع CSS للي اتكتب بس، فالملف النهائي صغير مهما المشروع كبر. في v4 الإعداد في CSS: [[@import "tailwindcss"]] و [[@theme]] للتوكنز، والقيم متغيرات CSS، والناتج في cascade layers. والـ variants زي [[hover:]] و [[md:]] بتلف الكلاس في selector أو media query. العيوب: الـ HTML بيبقى مزحوم، والكلاسات لازم تتكتب كاملة (مينفعش تبنيها بـ string)، والتعارض بين الكلاسات محتاج tailwind-merge، والفريق محتاج يتفق على التوكنز عشان ميبقاش كله arbitrary values.`,
          example: R`<button className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-brand/90 md:px-6">حفظ</button>`,
          try: R`افتح CSS الناتج لمشروع Tailwind ودوّر على كلاس مش مستخدم: مش هتلاقيه. ودي الـ «on-demand» اللي تشرحها.`,
          flag: "script",
          deep: {
            why: "بيتسأل لأنه في كل مشروع حديث، والإجابة بتفرق بين اللي بيستخدمه واللي فاهمه.",
            how: R`لو عايز تتميز: الـ scan نصي مش بيفهم JavaScript، ودا سبب إن [[bg-$__{color}-500]] مش شغال. والـ utilities جوه [[@layer utilities]]، فأي CSS عادي برا layer بيغلبها. وإعادة الاستخدام بتبقى بمكونات React و cva، مش بـ [[@apply]] في كل حتة.`,
            when: R`أسئلة المتابعة: «بتعمل dark mode إزاي؟» و «إيه الفرق بين v3 و v4؟» و «إزاي بتعيد استخدام الستايلات؟» و «ليه مش CSS Modules؟».`,
            mistakes: "«Tailwind زي الـ inline styles» (لأ: فيه variants و media queries وتوكنز، والـ CSS بيتعمله cache). «بيطلّع كل الكلاسات وبعدين يمسح اللي مش مستخدم» (ده شكل قديم؛ دلوقتي بيولّد اللي محتاجه بس). و @apply في كل حتة فترجع لـ CSS عادي."
          },
          lines: [
            "كل كلاس قاعدة CSS صغيرة، و Tailwind بيطلّع دول بس."
          ],
          sol: R`اللي هتلاقيه: الكلاسات اللي في الـ HTML بس، زي [[.px-4]] و [[.md\:px-6]] جوه [[@media (width >= 48rem)]]، و [[.hover\:bg-brand\/90]] ملفوفة في [[@media (hover: hover)]]. لو دوّرت على [[.px-5]] أو [[.bg-red-500]] ومش مستخدمهم مش هتلاقيهم. ولما طلّعت CSS للزرار ده لوحده بـ Tailwind v4.3 الملف كله (بالـ reset والـ theme) كان حوالي 490 سطر مش آلاف، وأغلبه الـ preflight.

الإجابة النموذجية: «Tailwind بيعمل scan لملفات المشروع (في v4 أوتوماتيك، مع [[@source]] لو محتاج)، وبيدوّر على أي كلمة شكلها كلاس، ويولّد CSS للكلاسات دي بس. عشان كده الـ CSS النهائي صغير ومبيكبرش مع حجم المشروع قد ما بيكبر مع عدد الكلاسات المختلفة. العيوب: الـ HTML بيبقى مليان كلاسات وبيتقري بصعوبة، ومحتاج [[cn]]/tailwind-merge عشان التعارضات، والكلاسات المتركبة بالـ string زي [[$__btbg-$__{color}-500$__bt]] مبتتولدش لأن الـ scanner مش بيشغّل الكود، ومحتاج build step، وفيه منحنى تعلم للأسماء.»

والحل لمشكلة الكلاسات الديناميكية اللي تقوله: اكتب الأسماء كاملة في object ([[{ red: "bg-red-500", green: "bg-green-500" }]])، أو [[@source inline(...)]] لو لازم.`
        },
        {
          cmd: "semantic HTML أولًا",
          title: "إيه أهم حاجات الـ accessibility في الفرونت إند؟",
          desc: R`أبدأ بـ HTML صح: عناصر semantic، و button للأفعال و a للتنقل، و label لكل حقل، و alt للصور، وعناوين بالترتيب. ده بيدّي نص الـ accessibility ببلاش. بعدين الكيبورد: كل حاجة بتتوصل بـ Tab، والـ focus باين بـ focus-visible، والمودالات بتحبس الـ focus وبترجّعه. بعدين التباين: 4.5:1 للكلام العادي. و aria بس للحاجات اللي HTML مش بيوصفها: aria-expanded و aria-live و aria-label لأزرار الأيقونات. واحترام prefers-reduced-motion. وبختبر بالكيبورد وبـ Lighthouse أو axe، وأحيانًا بقارئ شاشة حقيقي.`,
          example: R`<button aria-label="إغلاق" onClick={close}><X aria-hidden="true" /></button>`,
          try: R`اعمل audit لصفحة من مشروعك بـ Lighthouse › Accessibility، وصلّح أول 3 مشاكل، واحكي عنهم في الانترفيو كمثال حقيقي.`,
          flag: "script",
          deep: {
            why: "شركات كتير عندها التزامات قانونية بالـ accessibility، والسؤال بيفرق بين اللي بيبني UI للماوس بس واللي بيبني لكل الناس.",
            how: "لو عايز تتميز: اذكر الـ accessibility tree والـ role/name/state، وإن primitives زي Radix بتحل focus trap و Escape والـ aria، وإن WCAG 2.2 AA هو المعيار المعتاد.",
            when: "أسئلة المتابعة: «الفرق بين aria-label و aria-labelledby؟» و «إزاي تعمل مودال accessible؟» و «إيه WCAG AA؟» و «بتختبر إزاي؟».",
            mistakes: R`«بحط aria على كل حاجة» (no ARIA is better than bad ARIA). «[[role="button"]] على div كفاية». «الـ accessibility للمكفوفين بس» (كيبورد، ونظر ضعيف، وعمى ألوان، وحساسية للحركة، وموبايل في الشمس).`
          },
          lines: [
            R`زرار أيقونة: اسمه من [[aria-label]]، والأيقونة زينة مخفية عن قارئ الشاشة.`
          ],
          sol: R`مثال لنتيجة حقيقية بعد audit (دي أشهر 3 مشاكل بتطلع): «Buttons do not have an accessible name» على زرار أيقونة ← ضفت [[aria-label]] وحطيت [[aria-hidden="true"]] على الأيقونة زي المثال. «Background and foreground colors do not have a sufficient contrast ratio» على كلام رمادي ← غيّرت [[gray-400]] لـ [[gray-600]]. «Form elements do not have associated labels» على حقل بحث ← ضفت [[<label>]] مخفي بـ [[sr-only]]. والسكور طلع من 78 لـ 96 مثلًا.

الإجابة النموذجية للسؤال: «أول حاجة HTML صح: button للزرار و a للينك و label لكل input و landmarks وعناوين بالترتيب، ودي بتحل أغلب المشاكل ببلاش. بعدها الكيبورد: كل حاجة توصلها بـ Tab، و focus ظاهر، ومودال بيحبس الـ focus ويرجّعه. بعدها الـ contrast، وبعدها alt للصور. و ARIA آخر حاجة، للحالات اللي HTML ملوش فيها زي [[aria-expanded]] و [[aria-live]]، لأن ARIA غلط أسوأ من مفيش ARIA.»

وقول إن Lighthouse بيلقط حوالي ثلث المشاكل بس، فبتكمّل بتجربة بالكيبورد وقارئ الشاشة. القصة الحقيقية بأرقام قبل وبعد هي اللي بتفرّق مش الكلام العام.`
        },
        {
          cmd: "احجز المكان",
          title: "إيه هو CLS وإزاي تقلله؟",
          desc: R`CLS مقياس من Core Web Vitals لحركة المحتوى المفاجئة وانت بتتفرج على الصفحة، والمطلوب 0.1 أو أقل. أشهر أسبابه صور و iframes من غير مقاسات، وخطوط بتتبدّل بمقاسات مختلفة، ومحتوى بيتحط فوق محتوى موجود زي البانرات والإعلانات. الحل في كلمة: احجز المكان قبل ما المحتوى يوصل: width و height أو aspect-ratio للصور والفيديو، و min-height أو skeleton للمحتوى الديناميكي، و size-adjust أو next/font للخطوط، والإشعارات fixed بدل ما تزق الصفحة. والحركة بـ transform مش بتتحسب، والتغيير اللي بيحصل بعد ضغطة المستخدم على طول مش بيتحسب.`,
          example: R`<img src="/hero.webp" width="1200" height="600" alt="...">`,
          try: R`شغّل Lighthouse على صفحة ليك واكتب الـ CLS، وصلّح سبب واحد، وقيس تاني. رقم قبل وبعد في الانترفيو بيفرق جدًا.`,
          flag: "script",
          deep: {
            why: "Core Web Vitals بتأثر على ترتيب جوجل وعلى تجربة المستخدم، فبتتسأل في أي انترفيو frontend.",
            how: "لو عايز تتميز: CLS = أكبر مجموعة shifts متقاربة (session window)، وكل shift = المساحة المتأثرة × المسافة. واذكر الفرق بين lab data (Lighthouse) و field data (Search Console و web-vitals).",
            when: "أسئلة المتابعة: «إيه باقي Core Web Vitals؟» (LCP أقل من 2.5 ثانية، و INP أقل من 200ms). «بتقيس في الحقيقة إزاي مش في المعمل؟» و «ليه CLS عالي عند المستخدمين وواطي عندك؟».",
            mistakes: "«CLS يعني الصفحة بطيئة» (ده LCP). «lazy loading بيقلل CLS» (لوحده لأ، وممكن يزوّده لو مفيش مقاسات). وتخلط INP مع FID القديم (FID اتشال سنة 2024 و INP بقى مكانه)."
          },
          lines: [
            "width و height بيحجزوا المكان بنسبة 2:1 قبل ما الصورة توصل."
          ],
          sol: R`نموذج لنتيجة: CLS قبل حوالي 0.4 (أحمر، الحد 0.1 للكويس و 0.25 للوحش) وسببه صورة الهيرو من غير أبعاد. بعد ما ضفت [[width]] و [[height]] بقى 0 تقريبًا. (قست ده على صفحة تجربة فيها هيرو 1200×600 بيتأخر 800ms: من 0.43 لـ 0.) الأسباب التانية المعتادة: الخط لما يتبدّل، وبانر أو إعلان بيتحط فوق المحتوى بعد التحميل، و iframe من غير [[aspect-ratio]]، و skeleton مقاسه مختلف عن المحتوى الحقيقي.

الإجابة النموذجية: «CLS بيقيس قد إيه المحتوى الظاهر اتحرك من غير ما المستخدم يعمل حاجة، ورقمه (مساحة اللي اتحرك × المسافة) من غير وحدة. بقلله بإني أحجز المكان قبل ما الحاجة توصل: width و height أو aspect-ratio للصور والفيديو، و min-height للإعلانات والحاجات اللي جاية من API، وخط بـ [[size-adjust]] أو next/font، وأي حاجة بتظهر فجأة تبقى fixed أو تحت المحتوى، والحركات بـ transform مش top.»

وقول الفرق بين lab (Lighthouse بيقيس التحميل بس) و field (CrUX من مستخدمين حقيقيين وبيعد الـ shifts طول عمر الصفحة)، وإن الـ shift اللي بيحصل خلال 500ms من ضغطة المستخدم مش بيتحسب.`
        },
        {
          cmd: "مراحل الرسم",
          title: "إيه الفرق بين reflow و repaint؟",
          desc: R`المتصفح بيرسم على مراحل: يحسب الـ styles، وبعدين layout (أو reflow): أماكن ومقاسات كل العناصر، وبعدين paint (أو repaint): يلوّن البكسلات، وبعدين composite: يركّب الطبقات. تغيير width أو margin أو إضافة عنصر بيعمل reflow، وممكن يأثر على الصفحة كلها، وبعده repaint. تغيير color أو background بيعمل repaint بس. و transform و opacity غالبًا composite بس، ودا ليه الحركات بتتعمل بيهم. والأخطر layout thrashing: قراية مقاس زي offsetHeight بعد كتابة style، فالمتصفح يعمل reflow فوري، ولو في loop بيتكرر مية مرة. الحل: اقرا الكل الأول وبعدين اكتب، أو requestAnimationFrame.`,
          example: R`el.style.width = "200px";
const h = el.offsetHeight;
el.style.transform = "translateX(10px)";`,
          try: R`سجّل في DevTools › Performance وانت بتحرّك عنصر بـ [[left]] مرة وبـ [[transform]] مرة، وقارن الـ Layout والـ Paint في كل حالة.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم ليه الموقع بيقطّع، مش بس إنه بيقطّع.",
            how: R`لو عايز تتميز: الخصائص اللي بتعمل forced reflow (offsetWidth و getBoundingClientRect و scrollTop و getComputedStyle)، و [[will-change]] بيرقّي العنصر لطبقة لوحده بس بياكل ذاكرة، و ResizeObserver و IntersectionObserver بدل القراية في loop.`,
            when: R`أسئلة المتابعة: «إزاي تكتشف ده في DevTools؟» (Performance وتحذير Forced reflow). «إيه [[will-change]] وإمتى تستخدمه؟» و «ليه animation لـ top أبطأ من translate؟».`,
            mistakes: "«repaint أغلى من reflow» (العكس، والـ reflow غالبًا بيجيب repaint معاه). «transform ببلاش» (على عناصر كتير أو كبيرة بياكل ذاكرة GPU). و will-change على كل حاجة."
          },
          lines: [
            "كتابة: بتخلي الـ layout قديم.",
            "قراية مقاس: reflow فوري (forced).",
            "transform: غالبًا composite بس."
          ],
          sol: R`اللي هتشوفه في Performance: مع [[left]] كل frame فيه Recalculate Style، وبعدين Layout (بنفسجي)، وبعدين Paint (أخضر)، وبعدين Composite. مع [[transform]] هتلاقي Recalculate Style و Composite Layers بس، ومفيش Layout ولا Paint لكل frame (لو العنصر اتعمله layer، ودا بيحصل تلقائي وقت الـ animation أو بـ [[will-change: transform]]). ولو فعّلت Rendering › Paint flashing، العنصر اللي بيتحرك بـ left هيبقى متلوّن أخضر طول الوقت، واللي بـ transform لأ.

الإجابة النموذجية: «المتصفح بيعمل Style، بعدين Layout (reflow: يحسب مكان ومقاس كل حاجة)، بعدين Paint (repaint: يرسم البكسلات)، بعدين Composite (يركّب الطبقات على الـ GPU). reflow بيحصل لما تغيّر حاجة ليها علاقة بالمقاس أو المكان (width و left و font-size وإضافة عنصر)، وبيجر وراه paint. repaint لوحده لما تغيّر شكل من غير مقاس (color و background). و transform و opacity بيتعملوا في الـ composite بس، وعشان كده هما اللي تحرّك بيهم.»

وفي المثال: السطر التاني ([[offsetHeight]]) بيجبر المتصفح يعمل layout حالًا عشان يرجّعلك رقم صح بعد ما غيّرت الـ width، ودا forced synchronous layout. لو اتكرر في loop يبقى layout thrashing.`
        },
        {
          cmd: "stacking context",
          title: "ليه z-index: 9999 مش بيطلّع العنصر فوق؟",
          desc: R`z-index بيتقارن بس بين عناصر في نفس الـ stacking context. أي عنصر positioned عليه z-index، أو عليه opacity أقل من 1، أو transform، أو filter، أو [[isolation: isolate]]، بيعمل context جديد، وكل اللي جواه بيترتب جواه، وبعدين الـ context كله بيتعامل كوحدة واحدة مع اللي برا. فابن عليه 9999 جوه أب عليه [[z-index: 1]] عمره ما هيطلع فوق أخو الأب اللي عليه 2. الحل إني أرفع العنصر اللي عامل الـ context، أو أطلّع العنصر برا خالص بـ portal، ودا اللي Radix بيعمله للمودالات والـ dropdowns.`,
          example: R`.header { position: relative; z-index: 1; }
.header .menu { position: absolute; z-index: 9999; }
.hero { position: relative; z-index: 2; }`,
          try: R`اعمل المثال ده وصلّحه بطريقتين: مرة برفع الـ header، ومرة بنقل القايمة برا الـ header. اشرح الفرق.`,
          flag: "script",
          deep: {
            why: "مشكلة بتحصل في كل مشروع، والسؤال بيفرق بين اللي بيزوّد أصفار واللي فاهم الطبقات.",
            how: R`لو عايز تتميز: اذكر إن animation بـ transform (framer-motion مثلًا) بتعمل context جديد فجأة، وإن [[isolation: isolate]] بيعمل context مقصود من غير z-index، وإن مشروع كبير محتاج scale ثابت للـ z-index.`,
            when: "أسئلة المتابعة: «إيه الحاجات اللي بتعمل stacking context؟» و «إيه isolation: isolate؟» و «إزاي تنظّم z-index في مشروع كبير؟».",
            mistakes: "«اللي رقمه أكبر فوق دايمًا». «z-index بيشتغل على أي عنصر» (محتاج positioned أو ابن flex أو grid)."
          },
          lines: [
            "الهيدر عمل context بـ 1.",
            "9999 بس جوه الهيدر، يعني بالنسبة للصفحة «1».",
            "الهيرو 2 فبيغطّي الهيدر والقايمة."
          ],
          sol: R`الطريقتين وإيه اللي هتشوفه: الأولى ترفع الهيدر: [[.header { z-index: 3 }]] (أي رقم أكبر من 2). القايمة بتظهر فوق الهيرو، بس خلي بالك إن الهيدر كله بقى فوق الهيرو، فلو الهيرو فيه حاجة المفروض تطلع فوق الهيدر (زي صورة طالعة لفوق) مش هتعرف. الطريقة التانية تطلّع القايمة من الهيدر في الـ DOM (بـ [[createPortal]] لـ [[document.body]] في React، أو تحط العنصر آخر الـ body)، وتحسب مكانها بـ JavaScript أو بـ CSS anchor positioning. ساعتها الـ 9999 بتاعتها بتتقارن مع الهيرو مباشرة وتكسب، والهيدر بيفضل 1.

الشرح النموذجي: «z-index بيتقارن بس بين الإخوات جوه نفس الـ stacking context. الهيدر بـ [[position]] و [[z-index: 1]] عمل context، فكل اللي جواه، حتى لو 9999، بيترسم كوحدة واحدة على مستوى 1، والهيرو على مستوى 2. الرفع بيغيّر ترتيب الوحدة كلها، والنقل بيطلّع القايمة من الوحدة خالص.» وده السبب إن Radix و shadcn بيحطوا الـ dropdown والـ dialog في Portal.

وقول إن فيه حاجات تانية بتعمل context من غير z-index: [[opacity]] أقل من 1، و [[transform]]، و [[filter]]، و [[isolation: isolate]]، و [[position: fixed]] و [[sticky]]. ولو القايمة بتتقص مش بتستخبى، يبقى ده [[overflow: hidden]] على الهيدر مش z-index، وده حلّه النقل بس.`,
          solCode: R`/* الطريقة 1: ارفع الـ context كله */
.header { position: relative; z-index: 3; }
.header .menu { position: absolute; z-index: 9999; }
.hero { position: relative; z-index: 2; }

/* الطريقة 2: القايمة برا الهيدر في الـ DOM (Portal) */
/* <body> <header class="header">...</header> <main class="hero">...</main> <div class="menu">...</div> </body> */
.header { position: relative; z-index: 1; }
.menu { position: fixed; top: 4rem; inset-inline-start: 1rem; z-index: 50; }
.hero { position: relative; z-index: 2; }`
        }
      ]
    }
]);
