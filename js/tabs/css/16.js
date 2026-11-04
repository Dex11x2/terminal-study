// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "CSS الحديث و SEO",
      l: 3,
      n: "مكونات بتتأقلم مع مكانها، و selectors بتبص لتحت، ومتغيرات بتتحرك، وحركة ماشية مع الـ scroll، و HTML جوجل وواتساب فاهمينه",
      projects: [
        { lvl: 'صغير', t: R`اختيار باقة بـ :has()`, what: R`٣ كروت باقات، كل كارت [[<label>]] جواه [[<input type="radio">]] مخفي بصريًا بس (مش [[display: none]])، و [[label:has(input:checked)]] بيعلّمه بحد وعلامة صح، و [[:has(input:focus-visible)]] بيدّيه حلقة focus. والباقة المميزة حدها بيلف بـ [[@property --angle]] و [[conic-gradient]]. من درس :has() و @property.`, done: R`الأسهم بتنقل الاختيار بين الباقات، والمختار باين بحاجة غير اللون (علامة)، والحلقة بتظهر بالكيبورد بس، ومع reduce الحد واقف بس لسه باين (بفضل [[var(--angle, 0deg)]])، ومفيش ولا سطر JavaScript.` },
        { lvl: 'صغير', t: R`شريط قراية لمقال عربي`, what: R`شريط فوق مقال طويل بيتملي من اليمين للشمال مع الـ scroll بـ [[animation-timeline: scroll(root block)]] و [[transform: scaleX()]]، جوه [[@supports]]، وكل قسم في المقال بيظهر بـ [[view()]] و [[animation-range]]. من درس animation-timeline.`, done: R`في Chrome الشريط عند نص الصفحة نصه مليان (قيس [[getComputedStyle(bar).transform]])، وفي متصفح من غير دعم مفيش شريط مليان غلط والأقسام ظاهرة، وفي الإنجليزي بيتملي من الشمال، ومع reduce الأقسام ظاهرة من غير حركة.` },
        { lvl: 'متوسط', t: R`widgets لداشبورد بتتأقلم`, what: R`٤ widgets (رقم وإحصائية، ولستة آخر الطلبات، وكارت عميل، ورسم بأعمدة CSS) كل واحد container، وبيغيّر شكله على ٣ مقاسات بـ [[@container]] و [[cqi]] للخطوط. حطهم في grid ممكن تغيّر عرض أعمدته بـ [[resize: horizontal]] عشان تجرّب، والـ CSS كله nesting. بيجمع container queries و nesting و :has() (widget فاضي بيتخفي بـ [[:not(:has(li))]]).`, done: R`وانت بتسحب عرض العمود كل widget بيتقلب شكله لوحده، ومفيش ولا media query جوه ملفات الـ widgets، ومفيش [[resize]] listener في JavaScript، والـ widget الفاضي مختفي.` },
        { lvl: 'متوسط', t: R`باكدج SEO لصفحة كورس`, what: R`صفحة كورس متخيل فيها title و description و canonical و hreflang للنسختين و Open Graph و Twitter card و JSON-LD من نوع Course (و [[<]] بيتحوّل لـ [[<]] قبل ما يتحط في الـ script). وصورة الـ OG بتتولّد من صفحة HTML مقاسها 1200×630 بـ Playwright screenshot. وسكربت بيقرا الـ HTML ويطبع أي tag ناقص أو أطول من اللازم. من درس meta و Open Graph.`, done: R`السكربت بيطلّع صفر مشاكل، و Rich Results Test بيقرا الـ Course من غير errors، ومعاينة الكارت في أداة زي Sharing Debugger بتعرض الصورة والعنوان، ولو حطيت [[</script>]] جوه وصف الكورس الصفحة مبتتكسرش.` },
        { lvl: 'كبير', t: R`معمل الـ hero`, what: R`صفحة فيها ٤ أشكال hero لمنتج متخيل، كل واحد في سكشن: (١) زرار CTA حده بيلف بـ [[@property]] وحلقة تقدم بتتملي، (٢) لوجو بيعدّي عليه شعاع ضوء: اللوجو [[mask-image]] والخلفية gradient بيتحرك بـ [[@property --sweep]]، (٣) طبقات parallax بسرعات مختلفة بـ [[animation-timeline: view()]] من غير JavaScript، (٤) كروت مميزات بـ container queries وفلتر بـ [[:has()]]. كل سكشن ليه [[@supports]] بشكل ثابت سليم، و reduced motion، والـ CSS كله nesting وتوكنز من وحدة الثيم. بيجمع الوحدة دي مع الحركة والأداء.`, done: R`في Chrome الأربعة شغالين، وفي متصفح من غير scroll-driven animations (أو بـ [[@supports not]] متجرّب بإيدك) السكشن التالت ثابت ومقروء. Paint flashing بيوضّح الأجزاء اللي بتعمل repaint كل frame ومكتوب جنبها ليه مقبول. Lighthouse Performance ‏90 أو أكتر على Mobile. مع reduce مفيش حاجة بتتحرك لوحدها. وفيه جدول بكل ميزة: بتشتغل في أنهي متصفحات من MDN، والـ fallback بتاعها.`, ext: R`زوّد View Transitions بين الأشكال الأربعة (من الوحدة الجاية)، وانشر الصفحة، واكتب تدوينة قصيرة بالقياسات.` },
        { lvl: 'فكرة', t: R`ميزة CSS جديدة كل أسبوع`, what: R`كل أسبوع اختار ميزة CSS لسه جديدة (من «Interop» أو «New to the web» أو MDN)، واعمل لها demo صغير بيحل مشكلة حقيقية كنت بتحلها بـ JavaScript، ومعاه fallback و [[@supports]].`, done: R`٤ demos في repo واحد، كل واحد فيه README: المشكلة، والحل القديم، والحل الجديد، والمتصفحات اللي بتدعمه من MDN، وإيه اللي بيحصل في المتصفح اللي مش بيدعمه.`, ext: R`حوّلهم لصفحة واحدة بتقرا [[CSS.supports()]] وبتعرض لكل ميزة «شغالة عندك» ولا لأ.` },
      ],
      items: [
        {
          cmd: "container queries",
          title: "مكون يغيّر شكله حسب المكان اللي هو فيه",
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** [[.t { font-size: clamp(1rem, 4cqi, 1.5rem) }]] جوه containers عرضها 600 و 350 و 500px. الخط هيبقى كام في كل واحدة؟ وكام لو مفيش container خالص والشاشة 1280؟`, done: R`24 و 16 و 20px (‏4% من 600 = 24، ومن 350 = 14 فبيترفع لـ 16، ومن 500 = 20)، ومن غير container الـ [[cqi]] بيرجع لعرض الشاشة (4% من 1280 = 51) فبيتقص لـ 24. اتقاس كده في Chrome 156.`,
              sol: R`~~~html container-math.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>حساب cqi</title>
<style>
  body { margin: 0; }
  .box { container-type: inline-size; }
  .t   { font-size: clamp(1rem, 4cqi, 1.5rem); }
</style></head>
<body>
  <div class="box" style="width: 600px"><p class="t" id="a">كبيرة</p></div>
  <div class="box" style="width: 350px"><p class="t" id="b">ضيقة</p></div>
  <div class="box" style="width: 500px"><p class="t" id="c">وسط</p></div>
  <p class="t" id="d">من غير container</p>
  <script>
    for (const id of "abcd") console.log(id, getComputedStyle(document.getElementById(id)).fontSize);
  $__lt/script>
</body></html>
~~~

[[1cqi]] = 1% من عرض أقرب container ليه [[container-type]]. فـ [[4cqi]] = 4% من عرضه، و [[clamp(min, value, max)]] بيرجّع الـ value لو بين الحدين، وإلا الحد اللي عدّته:

- ‏600px: ‏4% = 24px، و 24 هو الحد الأقصى بالظبط (1.5rem).
- ‏350px: ‏4% = 14px، أقل من 1rem، فبيطلع 16px.
- ‏500px: ‏4% = 20px، جوه الحدين فبيفضل زي ما هو.
- من غير container: مفيش أب مؤهل، فالمتصفح بيرجع لعرض الشاشة: ‏4% من 1280 = 51.2px، فبيتقص لـ 24px.

الغلطة الشائعة: ناس بتفتكر إن [[cqi]] من غير container بيبقى صفر أو الخاصية بتتجاهل. لأ، بيحسب من الشاشة، فممكن تبان شغالة وهي بتحسب من حاجة تانية خالص.

~~~text الناتج (Chrome 156، شاشة 1280)
600px   => 24px
350px   => 16px
500px   => 20px
من غير container => 24px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** widget جوه [[display: flex]] عليه [[container-type: inline-size]] ومفيهوش عرض، فاختفى. صلّحه من غير ما تشيل الـ container.`, done: R`عرضه كان 0 (اتقاس)، وبعد [[flex: 1]] (أو [[inline-size: 100%]]) بقى عرض المساحة المتاحة (1264px في تجربتنا)، والـ [[@container]] اللي جواه بقى بيشتغل.`,
              sol: R`~~~html widget-fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>widget جوه flex</title>
<style>
  body { margin: 8px; }
  .row { display: flex; }
  .widget {
    container-type: inline-size;
    flex: 1;            /* السطر اللي كان ناقص */
    background: #eef2ff;
  }
  .inner { display: block; padding: 1rem; }
  @container (width > 40rem) {
    .inner { display: flex; gap: 1rem; justify-content: space-between; }
  }
</style></head>
<body>
  <div class="row">
    <section class="widget">
      <div class="inner"><span>المبيعات</span><strong>١٢٠٠ جنيه</strong></div>
    </section>
  </div>
</body></html>
~~~

[[container-type: inline-size]] بيعمل inline-size containment: عرض العنصر مبقاش بيتحسب من محتواه، عشان مفيش دايرة (المحتوى بيعتمد على العرض والعرض بيعتمد على المحتوى). جوه [[display: flex]] الابن من غير flex-grow بياخد عرض محتواه، ومع الـ containment المحتوى بيتحسب كأنه صفر، فالعرض بيبقى 0 والـ widget بيختفي.

[[flex: 1]] بيقوله «امتد في المساحة الفاضية»، فالعرض بقى جاي من الأب مش من المحتوى. ونفس الفكرة لو حطيت [[inline-size: 100%]]. ونفس المشكلة بتحصل مع [[position: absolute]] و [[float]] وأي حاجة عرضها بيتحدد من محتواها.

الغلطة الشائعة: تشيل [[container-type]] عشان العنصر يرجع يبان، فتكسر كل الـ [[@container]] اللي جواه.

~~~text الناتج (شاشة 1280، و body margin 8px)
من غير flex: 1  عرض الـ widget = 0px
بعد flex: 1     عرض الـ widget = 1264px
display بتاع .inner = flex (يعني الـ @container اشتغل)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت منتج واحد بيتحط في ٣ أماكن على نفس الشاشة: grid بـ ٤ أعمدة، و sidebar، و dialog عريض. ٣ أشكال بـ container queries بس: رأسي صغير، وأفقي من 28rem، و «مميز» من 48rem بصورة أكبر ووصف.`, done: R`لقطة واحدة فيها الـ ٣ أشكال في نفس الوقت، وملف الكارت مفيهوش ولا [[@media]]، ولو نقلت الكارت من مكان لمكان بيتغير لوحده.`,
              sol: R`~~~html product-card.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كارت في ٣ أماكن</title>
<style>
  body { margin: 1rem; font-family: system-ui, sans-serif; color: #1f2937; }
  .layout { display: grid; grid-template-columns: 1fr 18rem; gap: 1rem; }
  .grid4  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  dialog  { width: min(56rem, 90vw); padding: 1rem; border: 0; border-radius: 12px; }

  /* الكارت نفسه: مفيهوش ولا media query */
  .p-wrap { container-type: inline-size; }
  .p { display: grid; gap: .5rem; border: 1px solid #d1d5db; border-radius: 10px; padding: .75rem; }
  .p img { inline-size: 100%; height: auto; background: #c7d2fe; border-radius: 6px; }
  .p .desc { display: none; }
  .p h3 { margin: 0; font-size: 1rem; }

  @container (width >= 28rem) {
    .p { grid-template-columns: 8rem 1fr; align-items: center; }
  }
  @container (width >= 48rem) {
    .p { grid-template-columns: 22rem 1fr; }
    .p h3 { font-size: 1.75rem; }
    .p .desc { display: block; }
  }
</style></head>
<body>
  <template id="card">
    <div class="p-wrap"><article class="p">
      <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="سماعة لاسلكية" width="400" height="300">
      <div><h3>سماعة لاسلكية</h3><p class="desc">بطارية ٣٠ ساعة وعزل ضوضاء.</p><p>٩٠٠ جنيه</p></div>
    </article></div>
  </template>
  <div class="layout">
    <main><h1>المنتجات</h1><div class="grid4" data-n="4"></div>
      <button id="open">عرض مميز</button></main>
    <aside aria-label="مقترحات" data-n="1"></aside>
  </div>
  <dialog aria-label="عرض مميز" data-n="1"></dialog>
  <script>
    const tpl = document.getElementById("card");
    document.querySelectorAll("[data-n]").forEach(box => {
      for (let i = 0; i < box.dataset.n; i++) box.append(tpl.content.cloneNode(true));
    });
    document.getElementById("open").onclick = () => document.querySelector("dialog").showModal();
  $__lt/script>
</body></html>
~~~

كل شكل مربوط بعرض الـ [[.p-wrap]] مش عرض الشاشة، فنفس الـ HTML بياخد شكل مختلف حسب الخانة اللي اتحط فيها:

- [[.p-wrap]] هو الـ container، والكارت نفسه ([[.p]]) هو اللي بيتغيّر. العنصر مبيقدرش يسأل عن نفسه، فلازم wrapper حواليه.
- [[@container (width >= 28rem)]] بيقلب الـ grid عمودين، فالصورة جنب الكلام.
- [[@container (width >= 48rem)]] بيكبّر الصورة والعنوان ويظهر الوصف.
- مفيش [[@media]] في الملف خالص، فلو نقلت الكارت من sidebar لـ dialog بيتغير لوحده.

الغلطة الشائعة: تحط [[container-type]] على [[.p]] نفسه وتغيّر [[.p]] جوه الـ query، فالـ query بيدوّر على أب ومبيلاقيش.

~~~text الناتج (شاشة 1280: عرض الـ wrapper وأعمدة الكارت)
جوه الـ grid:    224px  ← 198px (رأسي)
جوه الـ sidebar: 288px  ← 262px (رأسي)
لو الـ aside بقى 500px: 128px 338px (أفقي)
جوه الـ dialog:  896px   ← 352px 510px (مميز، والوصف display: block)
عدد @media في الملف: 0
~~~` },
            { lvl: 'تحدي', t: R`**refactor:** مكوّن React بيعمل [[const isMobile = window.innerWidth < 768]] وبيرسم layout مختلف، ومعاه [[resize]] listener. ده بيعمل وميض ومشكلة hydration، ومبيعرفش لو المكوّن في sidebar ضيق على شاشة كبيرة. حوّله لـ container queries.`, done: R`مفيش [[innerWidth]] ولا resize listener في المكوّن ([[getEventListeners(window)]] في كونسول DevTools مفيهوش resize)، ومفيش تحذير hydration، والمكوّن صح في الـ sidebar والعمود العريض.`,
              sol: R`~~~jsx Product.jsx (بعد الـ refactor)
export function Product({ name, price }) {
  return (
    <div className="product-box">
      <article className="product">
        <img src="/p.webp" alt={name} width="400" height="300" />
        <div>
          <h3>{name}</h3>
          <p>{price}</p>
        </div>
      </article>
    </div>
  );
}
~~~

~~~css product.css
.product-box { container-type: inline-size; }
.product { display: grid; gap: 0.5rem; }
.product img { inline-size: 100%; height: auto; }

@container (width >= 30rem) {
  .product { grid-template-columns: 10rem 1fr; }
}
~~~

الكود القديم كان بيقرر الشكل من JavaScript، وده ٣ مشاكل مع بعض: السيرفر مفيهوش [[window]] فبيرسم شكل والمتصفح يرسم شكل تاني (hydration mismatch)، والمستخدم بيشوف وميض لحد ما الـ effect يشتغل، والمكوّن بيسأل عن الشاشة مش عن مكانه فبيطلع شكل الكمبيوتر جوه sidebar ضيق.

في الحل React بقى بيرسم نفس الـ HTML دايمًا: مفيش state ولا effect ولا listener، فاستحالة يحصل mismatch. والشكل كله اتنقل للـ CSS، والمتصفح بيعرفه قبل أول رسمة. [[.product-box]] هو الـ container و [[.product]] هو اللي بيتغير.

الغلطة الشائعة: تسيب [[useEffect]] و [[isMobile]] «للاحتياط» جنب الـ CSS، فترجع نفس المشكلة. ولو الشكلين فيهم محتوى مختلف جدًا (مش بس ترتيب)، ارسم الاتنين وأخفي واحد بالـ CSS.

~~~text الناتج (React 19 و Chrome 156، renderToString وبعدين hydrateRoot)
main عرضه 900px    ← أعمدة الكارت: 160px 732px
sidebar عرضه 280px ← أعمدة الكارت: 280px
resize listeners على window: 0
تحذيرات hydration في الكونسول: 0
~~~` },
          ],
          desc: R`الـ media query بتسأل عن عرض الشاشة، والـ container query بتسأل عن عرض الأب. فكارت واحد يبقى أفقي لما يتحط في main عريض، ورأسي لما يتحط في sidebar ضيق، على نفس الشاشة.

بتعلّم الأب بـ [[container-type: inline-size]]، وبعدين [[@container (width > 28rem) { ... }]]. وفي Tailwind v4 جاهزة: [[@container]] على الأب و [[@md:flex-row]] على الابن.`,
          example: R`<div className="@container">
  <article className="flex flex-col gap-4 @md:flex-row">
    <img className="w-full @md:w-48" src="/p.webp" alt="" width="400" height="300" />
    <h3 className="text-lg @lg:text-2xl">اسم المنتج</h3>
  </article>
</div>
// نفس الفكرة بـ CSS عادي
.card-wrap { container-type: inline-size; container-name: card; }
@container card (width > 28rem) {
  .card { display: flex; flex-direction: row; }
}
.card h3 { font-size: clamp(1rem, 4cqi, 1.5rem); }`,
          try: R`حط نفس الكارت مرتين: مرة في عمود عريض ومرة في sidebar عرضه 280px. على نفس الشاشة هتلاقي شكلين. غيّر [[@md:]] لـ [[md:]] وشوفهم بقوا نفس الشكل.`,
          flag: "script",
          deep: {
            why: R`مع المكونات (React و shadcn)، نفس الكارت بيتحط في أماكن كتير: صفحة، ومودال، و sidebar، و grid بـ 4 أعمدة. الـ media query مش عارفة هو فين، فكنت بتعمل variants أو props زي [[compact]]. الـ container query بتخلي المكون يتأقلم لوحده.`,
            how: R`[[container-type: inline-size]] بيقول للمتصفح «أولادي ممكن يسألوا عن عرضي». وفي المقابل العنصر ده عرضه مينفعش يعتمد على أولاده (وإلا حلقة: الابن بيغيّر شكله حسب عرض الأب، والأب عرضه حسب الابن). عشان كده الـ container محتاج عرض جاي من برا (block عادي أو خانة grid)، ولو هو inline أو flex item ملوش عرض ممكن يقع لصفر.

[[@container (width > 28rem)]] بتدوّر على أقرب جد container. ولو فيه containers جوه بعض، [[container-name]] بيحدد مين. وفي Tailwind: [[@container/sidebar]] و [[@md/sidebar:]].

وحدات جديدة: [[cqi]] و [[cqw]] (1% من عرض الـ container)، و [[cqb]] و [[cqh]] للارتفاع (محتاجين [[container-type: size]]، وفي Tailwind v4.3 [[@container-size]]).

المتصفحات كلها بتدعمها من 2023. و Tailwind v4 فيه مقاسات جاهزة من [[@3xs]] لـ [[@7xl]]، و [[@max-md:]] للأصغر.`,
            when: "مكونات بتتحط في أماكن بعروض مختلفة: كروت، و widgets في داشبورد، و sidebar بيتفتح ويتقفل. والـ layout العام للصفحة لسه media queries.",
            mistakes: R`تنسى [[@container]] على الأب فمفيش حاجة بتحصل ومفيش error. تحط container-type على عنصر عرضه جاي من محتواه فيقع. وتستخدمها لكل حاجة حتى الـ layout الأساسي اللي فعلًا بيعتمد على الشاشة.`
          },
          teach: R`## الكارت بيسأل «أبويا عرضه كام؟» مش «الشاشة عرضها كام؟»

المثال نفس الكارت مرتين: مرة بكلاسات Tailwind v4 ([[@container]] و [[@md:]])، ومرة بـ CSS عادي. حطينا نسخة Tailwind (4.3.3، Vite + React) في صفحة فيها عمود رئيسي عريض و sidebar عرضه 280px، والكارت في الاتنين، وقسنا في Chrome على شاشة 1280 وشاشة 600. ونسخة الـ CSS العادي في صفحة تانية بـ 3 حاويات 900 و 400 و 300px.

---

## ١. الأب: [[<div className="@container">]]

[[@container]] كلاس بيطلّع القاعدة دي (من الـ CSS بعد الـ build):

~~~text CSS ناتج
.\@container{container-type:inline-size}
~~~

[[container-type: inline-size]]: «أولادي يقدروا يسألوا عن عرضي». inline = اتجاه السطر، يعني العرض. والـ [[\@]] في اسم الكلاس لأن [[@]] لازم يتعمله escape جوه selector.

## ٢. الكارت: [[flex flex-col gap-4 @md:flex-row]]

- [[flex]]: [[display: flex]]، الأولاد جنب بعض أو تحت بعض.
- [[flex-col]]: تحت بعض (عمود).
- [[gap-4]]: مسافة 1rem = 16px بينهم.
- [[@md:flex-row]]: لما الـ **container** يبقى 28rem أو أكتر، جنب بعض (صف). القاعدة الناتجة:

~~~text CSS ناتج
@container (width>=28rem){ .\@md\:flex-row{flex-direction:row} }
~~~

[[@container (width>=28rem)]] زي [[@media]] بالظبط، بس الشرط على أقرب جد عليه [[container-type]]. و 28rem = 448px.

## ٣. الصورة والعنوان

- [[w-full @md:w-48]]: عرض كامل، ولما الـ container يعدّي 28rem عرضها [[calc(var(--spacing) * 48)]] = 12rem = 192px.
- [[width="400" height="300"]]: نسبة الصورة عشان المكان يتحجز (درس CLS). و [[alt=""]] = صورة زينة، قارئ الشاشة يتجاهلها.
- [[text-lg @lg:text-2xl]]: 18px، ولما الـ container يعدّي [[@lg]] = 32rem = 512px يبقى 24px.

## ٤. القياس

~~~text اتقاس في Chrome، شاشة 1280
العمود العريض:  container=984  flex-direction=row     img=192  h3=24px
الـ sidebar:     container=280  flex-direction=column  img=280  h3=18px
~~~

نفس الكارت، نفس الشاشة، شكلين. وبعد ما غيّرنا [[@md:flex-row]] لـ [[md:flex-row]] (من غير [[@]]، يعني media query على الشاشة):

~~~text اتقاس في Chrome
شاشة 1280:  العريض row  |  الـ sidebar row (الصورة اتحشرت لـ 206px)
شاشة 600:   العريض column  |  الـ sidebar column
~~~

[[md:]] بيبص على الشاشة (48rem = 768px)، فالاتنين بقوا زي بعض في كل شاشة، والـ sidebar بقى محشور على الشاشة الكبيرة.

---

## ٥. نفس الفكرة بـ CSS عادي

~~~text CSS
.card-wrap { container-type: inline-size; container-name: card; }
@container card (width > 28rem) {
  .card { display: flex; flex-direction: row; }
}
.card h3 { font-size: clamp(1rem, 4cqi, 1.5rem); }
~~~

- [[container-name: card]]: اسم للـ container، و [[@container card (...)]] بيسأل الـ container اللي اسمه card بس، حتى لو فيه containers تانية أقرب.
- [[width > 28rem]]: صيغة المقارنة الجديدة (range syntax)، أكبر من 448px.
- [[clamp(1rem, 4cqi, 1.5rem)]]: [[clamp(أقل, المفضّل, أكبر)]]. و [[cqi]] = 1% من عرض الـ container (container query inline). يعني الخط = 4% من عرض الكارت، بس مش أقل من 16px ولا أكتر من 24px.

~~~text اتقاس في Chrome
container 900px:  display=flex   h3=24px   (4% = 36 → اتقص لـ 24)
container 400px:  display=block  h3=16px   (4% = 16)
container 300px:  display=block  h3=16px   (4% = 12 → اترفع لـ 16)
~~~

### الفخ

حطينا [[.card-wrap]] كـ flex item من غير عرض (جوه [[display: flex]]) وفيه كلام: عرضه طلع **0**. لأن [[container-type: inline-size]] بيمنع العنصر ياخد عرضه من أولاده، فلو مفيش عرض جاي من برا بيقع.

## الخلاصة

| | media query | container query |
|---|---|---|
| بتسأل عن | الشاشة | أقرب أب عليه [[container-type]] |
| Tailwind | [[md:]] = 48rem | [[@md:]] = 28rem، و [[@lg:]] = 32rem |
| الوحدة | [[vw]] | [[cqi]] |
| الاستخدام | layout الصفحة | مكون بيتحط في أماكن مختلفة |

ومن غير [[@container]] على الأب، [[@md:]] مبيعملش أي حاجة ومفيش error.`,
          lines: [
            "الأب بقى container: أولاده يقدروا يسألوا عن عرضه.",
            R`الكارت: عمود، ولما الأب يبقى عريض كفاية ([[@md]]) يبقى صف.`,
            "الصورة عرضها كامل، وفي الوضع الأفقي 192px.",
            "العنوان يكبر لما الـ container يبقى أعرض.",
            R`قفلة الكارت ([[article]])؛ كل اللي جواه بيسأل عن عرض الـ div اللي فوقه.`,
            R`قفلة الـ container؛ عرضه جاي من مكانه في الصفحة (عمود عريض أو sidebar).`,
            "CSS: الأب container اسمه card.",
            "لما عرض الـ container ده (مش الشاشة) يعدّي 28rem...",
            "...الكارت يبقى flex في صف.",
            "قفلة.",
            R`[[cqi]] = 1% من عرض الـ container، فالخط بيكبر مع الكارت مش مع الشاشة.`
          ],
          sol: R`على شاشة واحدة: الكارت اللي في العمود العريض بيطلع أفقي (الصورة على جنب بعرض [[w-48]] = 12rem، والعنوان جنبها وخطه أكبر)، والكارت اللي في الـ sidebar بـ 280px بيطلع رأسي (الصورة فوق بعرض الكارت والعنوان تحتها). ده لأن [[@md]] في الـ container queries معناها «الحاوية نفسها من 28rem (448px) وأكبر»، والـ sidebar أصغر من كده. و [[@lg]] (32rem = 512px) هو اللي بيكبّر العنوان.

بعد ما تغيّر [[@md:]] لـ [[md:]]: الاتنين بقوا أفقي على الشاشة الكبيرة (والـ sidebar بقى محشور وشكله وحش)، والاتنين رأسي على الموبايل، لأن [[md:]] بتبص على عرض الشاشة كلها (48rem) مش على المكان.

لو الكارتين طلعوا رأسي حتى في العمود العريض، غالبًا نسيت [[@container]] على الأب (من غيره [[@md:]] ملهاش حاوية تقيسها). وخلي بالك إن العنصر اللي عليه [[container-type: inline-size]] ميقدرش ياخد عرضه من محتواه، فلو هو flex item من غير عرض ممكن يتقفل لصفر.`
        },
        {
          cmd: ":has()",
          title: "نسّق الأب حسب اللي جواه",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** كارت جواه [[<figure><img></figure>]]: [[.card:has(img)]] بيطابق؟ و [[.card:has(> img)]]؟ و [[h2:has(+ p)]] على h2 بعده div ثم p؟ و [[.list:not(:has(li))]] على [[<ul class="list">]] فيها تعليق HTML بس؟`, done: R`الأول آه (أي عمق)، والتاني لأ (ابن مباشر بس)، والتالت لأ (لازم p بعده على طول)، والرابع آه (التعليق مش عنصر). واتأكدت بـ [[element.matches()]] في الكونسول.`,
              sol: R`~~~html has-predict.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>:has توقّع</title></head>
<body>
  <div class="card"><figure><img src="a.webp" alt=""></figure></div>
  <h2>عنوان</h2><div>فاصل</div><p>فقرة</p>
  <ul class="list"><!-- فاضية --></ul>
  <script>
    const q = s => document.querySelector(s);
    console.log(q(".card").matches(".card:has(img)"));
    console.log(q(".card").matches(".card:has(> img)"));
    console.log(q("h2").matches("h2:has(+ p)"));
    console.log(q(".list").matches(".list:not(:has(li))"));
  $__lt/script>
</body></html>
~~~

- [[.card:has(img)]] آه: من غير combinator يعني «ابن على أي عمق»، والصورة جوه [[figure]] جوه الكارت.
- [[.card:has(> img)]] لأ: [[>]] يعني ابن مباشر بس، والابن المباشر هنا [[figure]].
- [[h2:has(+ p)]] لأ: [[+]] يعني الأخ اللي بعده على طول، واللي بعده [[div]] مش [[p]]. لو عايز «أي أخ بعده» اكتب [[~ p]].
- [[.list:not(:has(li))]] آه: التعليق مش عنصر، فمفيش [[li]] جواها.

الفكرة: اللي جوه [[:has()]] مكتوب نسبة للعنصر نفسه، زي ما تكون بتكمّل الـ selector من عنده.

الغلطة الشائعة: تفتكر [[:has(img)]] معناها ابن مباشر. ودي عكس [[>]] تمامًا.

~~~text الناتج (element.matches في Chrome 156)
.card:has(img)        true
.card:has(> img)      false
h2:has(+ p)           false
.list:not(:has(li))   true
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** اختيار طريقة دفع بكروت: كل كارت [[<label>]] فيه radio مخفي بصريًا بس، و [[label:has(input:checked)]] للحد والخلفية، و [[label:has(input:focus-visible)]] لحلقة focus، و [[label:has(input:disabled)]] باهت.`, done: R`الأسهم بتنقل بين الكروت، والمختار باين بعلامة مش لون بس، والـ disabled مبيتختارش ومش بيتوصل بـ Tab، والـ input لسه موجود لقارئ الشاشة (بيقول radio و checked).`,
              sol: R`~~~html pay.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>طريقة الدفع</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 1.5rem; color: #1f2937; }
  fieldset { border: 0; padding: 0; display: grid; gap: .75rem; max-width: 26rem; }
  legend { font-weight: 700; margin-block-end: .5rem; }
  label {
    position: relative; display: flex; justify-content: space-between;
    padding: 1rem; border: 2px solid #9ca3af; border-radius: 10px; cursor: pointer;
  }
  /* مخفي بصريًا بس: لسه بياخد focus وقارئ الشاشة بيقراه */
  label input { position: absolute; opacity: 0; inline-size: 1px; block-size: 1px; margin: 0; }
  label .tick { visibility: hidden; font-weight: 700; }

  label:has(input:checked) { border-color: #1d4ed8; background: #eff6ff; }
  label:has(input:checked) .tick { visibility: visible; }   /* علامة، مش لون بس */
  label:has(input:focus-visible) { outline: 3px solid #1d4ed8; outline-offset: 2px; }
  label:has(input:disabled) { opacity: .6; cursor: not-allowed; }
</style></head>
<body>
<main>
  <h1>إتمام الطلب</h1>
  <form>
    <fieldset>
      <legend>طريقة الدفع</legend>
      <label><span><input type="radio" name="pay" value="card" checked> بطاقة</span><span class="tick" aria-hidden="true">✓ مختار</span></label>
      <label><span><input type="radio" name="pay" value="wallet"> محفظة موبايل</span><span class="tick" aria-hidden="true">✓ مختار</span></label>
      <label><span><input type="radio" name="pay" value="cash" disabled> كاش (مش متاح)</span><span class="tick" aria-hidden="true">✓ مختار</span></label>
    </fieldset>
  </form>
</main>
</body></html>
~~~

الـ radio هو اللي شايل الحالة كلها، والـ CSS بس بيبص عليه من الأب:

- [[position: absolute; opacity: 0]] مش [[display: none]]: الـ [[display: none]] بيشيل الـ input من الـ Tab ومن شجرة الـ accessibility، فالكيبورد وقارئ الشاشة يضيعوا.
- [[label:has(input:checked)]] بيلوّن الكارت كله، و [[.tick]] علامة مكتوبة، عشان اللي مبيفرّقش الألوان يشوف الاختيار.
- [[label:has(input:focus-visible)]] هو اللي بيرسم الحلقة على الكارت، لأن الـ input نفسه مخفي.
- [[disabled]] على الـ radio بيطلّعه من الأسهم ومن Tab لوحده. الـ CSS بس بيبهّته.

الغلطة الشائعة: تبني الكروت بـ [[div]] و JavaScript، فتخسر الأسهم وقارئ الشاشة والفورم نفسه، وتكتبهم تاني بإيدك.

~~~text الناتج (Chrome 156)
Tab من أول الصفحة: وقف على card، و outline الكارت: solid 3px
سهم شمال: اتحدد wallet وحد الكارت rgb(29, 78, 216)
سهم شمال تاني: اتحدد card (الـ cash disabled فاتعدّى)
Tab بعدها: راح لـ BODY (مفيش وقفة تانية جوه المجموعة)
شجرة الـ accessibility: - group "طريقة الدفع": / - text: طريقة الدفع / - radio "بطاقة" [checked] / - text: بطاقة / - radio "محفظة موبايل" / - text: محفظة موبايل / - radio "كاش (مش متاح)" [disabled] / - text: كاش (مش متاح)
axe: 0 violations
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[body:has(dialog[open]) { overflow: hidden }]] بيمنع الـ scroll وراء المودال، بس على ويندوز الصفحة كلها بتتزق يمين وشمال لحظة الفتح لأن الـ scrollbar بيختفي. صلّحها بسطر واحد على html.`, done: R`استخدمت [[scrollbar-gutter: stable]] على html، و [[document.body.clientWidth]] قبل وبعد الفتح بقى نفس الرقم على ويندوز بـ scrollbar عادي (على الموبايل والماك الـ scrollbars طايرة فوق الصفحة فالمشكلة مبتبانش).`,
              sol: R`~~~css السطر اللي اتزوّد
html { scrollbar-gutter: stable; }

/* الموجود زي ما هو */
body:has(dialog[open]) { overflow: hidden; }
~~~

~~~html صفحة التجربة
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>scrollbar-gutter</title>
<style>
  html { scrollbar-gutter: stable; }
  body:has(dialog[open]) { overflow: hidden; }
  main { height: 300vh; }
</style></head>
<body>
  <main><button id="o">افتح</button></main>
  <dialog id="d" aria-label="تأكيد"><button onclick="d.close()">قفل</button></dialog>
  <script>
    o.onclick = () => { console.log(document.body.clientWidth); d.showModal(); console.log(document.body.clientWidth); };
  $__lt/script>
</body></html>
~~~

الـ scrollbar الكلاسيك على ويندوز بياخد حوالي 15px من عرض الصفحة. أول ما [[overflow: hidden]] يشتغل بيختفي، فالصفحة تكبر 15px وكل حاجة تتزق. ولما المودال يتقفل ترجع تتزق تاني.

[[scrollbar-gutter: stable]] على [[html]] بيحجز مكان الـ scrollbar دايمًا، سواء ظاهر أو لأ، فالعرض مبيتغيرش. لازم يتحط على html لأن ده العنصر اللي الـ scrollbar بتاعه هو scrollbar الصفحة.

الغلطة الشائعة: تحسب عرض الـ scrollbar بـ JavaScript وتحطه [[padding-inline-end]] على body. ده كان الحل القديم، سطور كتير وبيبوظ مع أي عنصر [[position: fixed]]. وغلطة في القياس: [[document.documentElement.clientWidth]] بيتغيّر حتى بعد التصليح (1265 ثم 1280) لأنه بيقيس الـ viewport من غير الـ scrollbar، مش عرض المحتوى. قيس [[document.body.clientWidth]] أو مكان زرار. ولو الـ scrollbar طاير فوق الصفحة (ماك وموبايل) المشكلة مبتبانش أصلًا.

~~~text الناتج (Chrome 156 على ويندوز، scrollbar عادي مش مخفي)
document.body.clientWidth قبل الفتح ← بعد الفتح
من غير scrollbar-gutter: 1249 ← 1264 (الصفحة اتزقت 15px)
بعد التصليح:             1249 ← 1249 (مفيش حركة)
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** فلتر أعمال بـ chips من غير JavaScript: كل chip radio، و [[.grid:has(#f-design:checked) .card:not([data-cat~="design"]) { display: none }]]. واعمله تاني بـ JavaScript (event وفلترة). قارن.`, done: R`النسختين بيفلتروا نفس الكروت، ونسخة :has() شغالة والـ JavaScript مقفول، وكتبت عدد السطور في الاتنين وإمتى الـ JavaScript لازم (فلاتر كتير متداخلة، أو حفظ الفلتر في الـ URL).`,
              sol: R`~~~html filter-css.html (من غير JavaScript)
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>فلتر بـ :has</title>
<style>
  .chips { display: flex; gap: .5rem; border: 0; padding: 0; }
  .chips label { padding: .25rem .75rem; border: 1px solid #6b7280; border-radius: 99px; }
  .chips label:has(:checked) { background: #1d4ed8; color: #fff; }
  .chips label:has(:focus-visible) { outline: 3px solid #1d4ed8; outline-offset: 2px; }
  .chips input { position: absolute; opacity: 0; }
  .grid:has(#f-design:checked) .card:not([data-cat~="design"]) { display: none; }
  .grid:has(#f-code:checked)   .card:not([data-cat~="code"])   { display: none; }
</style></head>
<body>
  <main class="grid">
    <h1>الأعمال</h1>
    <fieldset class="chips"><legend>النوع</legend>
      <label><input type="radio" name="f" id="f-all" checked> الكل</label>
      <label><input type="radio" name="f" id="f-design"> تصميم</label>
      <label><input type="radio" name="f" id="f-code"> كود</label>
    </fieldset>
    <article class="card" data-cat="design">لوجو</article>
    <article class="card" data-cat="code">متجر</article>
    <article class="card" data-cat="design code">موقع شخصي</article>
  </main>
</body></html>
~~~

~~~js نسخة JavaScript (نفس الـ HTML، من غير قواعد الإخفاء)
const cards = document.querySelectorAll(".card");
document.querySelector(".chips").addEventListener("change", e => {
  const cat = e.target.id.replace("f-", "");
  cards.forEach(c => { c.hidden = cat !== "all" && !c.dataset.cat.split(" ").includes(cat); });
});
~~~

في نسخة CSS، [[.grid:has(#f-design:checked)]] معناها «لو جوه الـ grid الـ radio ده متحدد»، وبعدين [[.card:not([data-cat~="design"])]] بتمسك الكروت اللي مفيهاش الكلمة دي. [[~=]] بيدوّر على كلمة كاملة في لستة مفصولة بمسافات، فكارت [[design code]] بيطابق الاتنين. الحالة هنا في الـ DOM نفسه (الـ radio)، فمفيش state تتزامن.

نسخة JavaScript أقصر في عدد القواعد لما الفلاتر تزيد، لأن CSS محتاج قاعدة لكل فلتر. عشان كده الـ JavaScript لازم لما تبقى الفلاتر كتير أو جاية من بيانات، أو متداخلة (نوع + سنة)، أو لازم تتحفظ في الـ URL عشان الرابط يتبعت.

الغلطة الشائعة: تحط [[display: none]] على الـ radios، فالكيبورد يضيع. وفي النسخة دي ترتيب الكروت في الـ HTML لازم يكون جوه نفس الأب [[.grid]] اللي فيه الـ radios، وإلا الـ selector مش هيوصل.

~~~text الناتج (Chrome 156، ٣ كروت)
النسخة      سطور المنطق   «تصميم»     «كود»       «تصميم» والـ JavaScript مقفول
:has()      2 + سطر لكل فلتر   2 كروت   2 كروت   2 كروت (فلترت)
JavaScript  4 ثابتة        2 كروت   2 كروت   3 كروت (مفلترتش)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** فورم تسجيل: [[.field:has(input:user-invalid)]] بيحمّر الـ label ويظهر رسالة، و [[form:has(:user-invalid) [type=submit]]] بيظهر جنبه «فيه حقول محتاجة تتصلّح»، والحقول المطلوبة ليها نجمة بـ [[:has(input:required)]].`, done: R`الألوان مبتظهرش قبل ما المستخدم يكتب ويخرج من الحقل ([[:user-invalid]] مش [[:invalid]])، والرسالة مربوطة بالحقل بـ [[aria-describedby]]، والنجمة [[aria-hidden]] والحقل عليه [[required]].`,
              sol: R`~~~html signup-has.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>تسجيل</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 1.5rem; color: #1f2937; }
  form { display: grid; gap: 1rem; max-width: 22rem; }
  .field { display: grid; gap: .25rem; }
  .field input { padding: .5rem; border: 1px solid #6b7280; border-radius: 6px; }
  .field .msg { display: none; color: #b91c1c; font-size: .9rem; }
  .field .star { display: none; color: #b91c1c; }

  .field:has(input:required) .star { display: inline; }
  .field:has(input:user-invalid) label { color: #b91c1c; }
  .field:has(input:user-invalid) input { border-color: #b91c1c; }
  .field:has(input:user-invalid) .msg { display: block; }

  .hint { display: none; color: #b91c1c; }
  form:has(:user-invalid) .hint { display: inline; }
</style></head>
<body>
<main>
  <h1>حساب جديد</h1>
  <form>
    <div class="field">
      <label for="mail">الإيميل <span class="star" aria-hidden="true">*</span></label>
      <input id="mail" type="email" required aria-describedby="mail-msg">
      <p class="msg" id="mail-msg">اكتب إيميل صحيح، زي mona@example.com</p>
    </div>
    <div class="field">
      <label for="nick">اسم الشهرة <span class="star" aria-hidden="true">*</span></label>
      <input id="nick">
    </div>
    <div><button type="submit">سجّل</button> <span class="hint">فيه حقول محتاجة تتصلّح</span></div>
  </form>
</main>
</body></html>
~~~

الفرق كله بين [[:invalid]] و [[:user-invalid]]: حقل مطلوب وفاضي هو [[:invalid]] من أول ما الصفحة تفتح، فلو استخدمته الفورم هتطلع حمرا قبل ما المستخدم يكتب حرف. [[:user-invalid]] مبيطابقش غير بعد ما المستخدم يتعامل مع الحقل ويخرج منه، أو يحاول يبعت.

- [[.field:has(input:user-invalid)]] بيوصل من الحقل للأب، فيقدر يلوّن الـ label ويظهر الرسالة، وده اللي كان مستحيل من غير [[:has()]].
- [[form:has(:user-invalid) .hint]] بيظهر الجملة جنب الزرار طول ما فيه حقل غلط.
- [[aria-describedby]] بيربط الرسالة بالحقل، فقارئ الشاشة بيقراها وهو واقف عليه.
- النجمة [[aria-hidden]] عشان متتقراش «نجمة»، والمعنى الحقيقي في [[required]]. وهي مكتوبة في الحقلين، و [[:has(input:required)]] هو اللي بيظهرها في المطلوب بس.

الغلطة الشائعة: تكتب [[.field input:invalid + .msg]] فالأحمر يظهر مع فتح الصفحة، أو تلوّن الـ border بس من غير نص، فمحدش يعرف إيه الغلط.

~~~text الناتج (Chrome 156)
أول ما الصفحة تفتح: الرسالة none، والجملة none، والنجمة inline (على الإيميل) و none (على الاسم)
بعد كتابة "abc" وخروج بـ Tab: لون الـ label rgb(185, 28, 28)، والرسالة block، والجملة inline
بعد ما اتصلّح لـ mona@example.com: الرسالة none
axe وهي غلط: 0 violations
~~~` },
          ],
          desc: R`[[:has()]] أول selector في CSS بيبص لتحت: [[.card:has(img)]] = الكارت اللي جواه صورة، و [[form:has(:user-invalid)]] = الفورم اللي فيه حقل غلط، و [[label:has(input:checked)]] = الـ label اللي الـ checkbox بتاعه متعلّم.

حاجات كانت محتاجة JavaScript أو class تتحط بإيدك بقت CSS بس.`,
          example: R`.card:has(img) { padding-top: 0; }
.field:has(input:user-invalid) label { color: var(--color-red-600); }
label:has(input:checked) { border-color: var(--color-brand); background: var(--color-brand-soft); }
body:has(dialog[open]) { overflow: hidden; }
.list:not(:has(li)) { display: none; }
h2:has(+ p) { margin-bottom: 0.5rem; }
// في Tailwind
<label className="rounded-lg border p-4 has-checked:border-brand has-[input:focus-visible]:ring-2">...</label>`,
          try: R`اعمل 3 كروت اختيار بـ radio جواهم، ونسّقهم بـ [[label:has(input:checked)]] من غير ولا سطر JavaScript. وبعدين جرّب [[body:has(dialog[open])]] مع [[<dialog>]] بتفتحه بـ [[showModal()]].`,
          flag: "script",
          deep: {
            why: R`CSS طول عمره بيبص من الأب للابن بس. فأي تنسيق للأب حسب حالة ابن (كارت متعلّم، أو فورم فيه غلط، أو صفحة فيها مودال) كان محتاج JavaScript يحط class. [[:has()]] هو الـ «parent selector» اللي الناس كانت مستنياه سنين.`,
            how: R`[[A:has(B)]] = A اللي جواه B (أي عمق). و [[A:has(> B)]] = ابن مباشر. و [[A:has(+ B)]] = A اللي بعده على طول B، فهي كمان «previous sibling selector». وتقدر تحط جواها أي selector: حالات ([[:checked]] و [[:focus-visible]] و [[:user-invalid]])، و [[:not()]].

الـ specificity بتاعتها = أتقل selector جواها. ومينفعش [[:has()]] جوه [[:has()]]، ولا pseudo-elements جواها.

الأداء: المتصفح لازم يعيد التقييم لما أي حاجة جوه العنصر تتغير. المتصفحات فيها تحسينات كتير، بس selectors واسعة زي [[body:has(...)]] أو [[:has()]] من غير حاجة قبلها بتخلي تغييرات كتير تعيد حساب الـ style. خلي الـ anchor ضيق ([[.card:has()]]).

مدعومة في كل المتصفحات من ديسمبر 2023. وفي Tailwind: [[has-checked:]] و [[has-[img]:pt-0]] و [[group-has-[...]:]] و [[peer-has-[...]:]].`,
            when: R`حالات مبنية على المحتوى أو التفاعل من غير state: كروت اختيار، و validation الفورم، و layout يتغير لو فيه sidebar ولا لأ ([[.layout:has(aside)]]).`,
            mistakes: R`تستخدمها بدل state محتاجه أصلًا في المنطق (هتحتاجه في JavaScript على أي حال). [[:has()]] على selectors واسعة جدًا في صفحة ضخمة بتتغير كتير. وتنسى إن [[body:has(dialog[open])]] مش هيشتغل مع مودال div معمول بإيدك (لازم [[<dialog>]] أو attribute انت عارفه).`
          },
          teach: R`## [[A:has(B)]] = «A اللي جواه B»

كل سطر في المثال قاعدة بتنسّق عنصر حسب حاجة جواه أو بعده. حطينا القواعد كلها في صفحة HTML واحدة مع الـ solCode (3 كروت radio و [[<dialog>]])، وضفنا عناصر تختبر الباقي، وقسنا كل حاجة بـ [[getComputedStyle]] في Chrome. ونسخة Tailwind بنيناها بـ Tailwind 4.3.3 وقرينا الـ CSS الناتج.

---

## ١. [[.card:has(img) { padding-top: 0; }]]

[[.card:has(img)]] = عنصر عليه كلاس card **وجواه** img في أي عمق. الكارت اللي فيه صورة الصورة بتلزق في حافته اللي فوق.

~~~text اتقاس في Chrome (والكروت كلها padding-top: 1rem في الأصل)
كارت فيه img:   padding-top = 0px
كارت من غيرها:  padding-top = 16px
~~~

## ٢. [[.field:has(input:user-invalid) label { color: ... }]]

من جوه لبرة:

1. [[input:user-invalid]]: حقل قيمته غلط (زي [[type="email"]] وفيه «abc»)، **بعد** ما المستخدم اتعامل معاه. الفرق عن [[:invalid]] إن [[:invalid]] بيتحقق من أول ما الصفحة تفتح والحقل لسه فاضي.
2. [[.field:has(...)]]: الـ div اللي جواه حقل زي ده.
3. [[ label]] (بعد مسافة): الـ label اللي جوه الـ field ده.

يعني الـ label اللي **قبل** الحقل بيحمر، وده اللي مكانش ينفع بـ [[peer]] لأنه بيشوف اللي بعده بس.

~~~text اتقاس في Chrome
كتبنا abc ولسه في الحقل:   لون الـ label = rgb(0, 0, 0)
دسنا Tab (سبنا الحقل):     لون الـ label = rgb(255, 0, 0)
~~~

## ٣. [[label:has(input:checked) { ... }]]

[[:checked]] = radio أو checkbox متعلّم. الـ label اللي الـ input بتاعه جواه ومتعلّم بياخد حدود وخلفية البراند. من الـ solCode:

~~~text اتقاس في Chrome (لون الـ border)
البداية:          أساسي lightgray   احترافي lightgray   فريق lightgray
دسنا «احترافي»:   أساسي lightgray   احترافي oklch(0.55 0.2 265)   فريق lightgray
دسنا «فريق»:      أساسي lightgray   احترافي lightgray   فريق oklch(0.55 0.2 265)
~~~

([[lightgray]] = rgb(211, 211, 211).) ولأن الـ 3 radios ليهم نفس [[name="plan"]]، اختيار واحد بيلغي التاني، والستايل بيتنقل معاه من غير ولا سطر JavaScript.

## ٤. [[body:has(dialog[open]) { overflow: hidden; }]]

- [[dialog[open]]]: [[[open]]] = attribute selector، الـ dialog اللي عليه attribute اسمه open. و [[showModal()]] بيحطه.
- [[overflow: hidden]] على الـ body: الصفحة اللي ورا متعملش scroll.

~~~text اتقاس في Chrome
قبل:             overflow = visible
بعد showModal:   overflow = hidden   (d.open = true)
بعد Escape:      overflow = visible
~~~

و [[<form method="dialog">]] في الـ solCode: زرار جوه فورم كده بيقفل الـ dialog من غير JavaScript.

## ٥. [[.list:not(:has(li)) { display: none; }]]

[[:not(X)]] = عكس X. يعني القايمة اللي **مفيهاش** ولا [[li]] تختفي.

~~~text اتقاس في Chrome
ul فاضية:     display = none
ul فيها li:   display = block
~~~

## ٦. [[h2:has(+ p) { margin-bottom: 0.5rem; }]]

[[+]] = «اللي بعده على طول» (adjacent sibling). فـ [[h2:has(+ p)]] = h2 اللي بعده مباشرة p. ده بيخلّي [[:has()]] كمان «previous sibling selector»: بتنسّق العنصر حسب اللي بعده.

~~~text اتقاس في Chrome (والـ h2 أصلًا margin-bottom: 2rem)
h2 بعده p:    8px
h2 بعده div:  32px
~~~

## ٧. نفس الكلام في Tailwind

~~~text JSX
<label className="rounded-lg border p-4 has-checked:border-brand has-[input:focus-visible]:ring-2">...</label>
~~~

الـ CSS اللي طلع:

~~~text CSS ناتج
.has-checked\:border-brand:has(:checked){border-color:var(--color-brand)}
.has-\[input\:focus-visible\]\:ring-2:has(:is(input:focus-visible)){ ... box-shadow ... }
~~~

- [[has-checked:]] جاهز = [[:has(:checked)]].
- [[has-[...]:]] = أي selector تكتبه بين [[[ ]]]، وهنا الحقل اللي جواه عليه focus بالكيبورد، فالكارت كله ياخد ring (حلقة بـ [[box-shadow]] عرضها 2px).

## الخلاصة

| القاعدة | تنسّق | لما |
|---|---|---|
| [[.card:has(img)]] | الكارت | جواه صورة |
| [[.field:has(input:user-invalid) label]] | الـ label | الحقل غلط بعد ما المستخدم ساب |
| [[label:has(input:checked)]] | الكارت | الـ radio متعلّم |
| [[body:has(dialog[open])]] | الصفحة | فيه dialog مفتوح |
| [[.list:not(:has(li))]] | القايمة | فاضية |
| [[h2:has(+ p)]] | العنوان | بعده فقرة على طول |

وكله CSS بس: المتصفح بيعيد تقييمه لوحده أول ما اللي جوه يتغير.`,
          lines: [
            "كارت فيه صورة: شيل الـ padding اللي فوق عشان الصورة تلزق في الحافة.",
            "الحقل غلط بعد ما المستخدم كتب: الـ label اللي قبله يحمر (ودا peer مكانش يعرف يعمله).",
            "كارت اختيار متعلّم: حدود وخلفية بلون البراند.",
            "لو فيه dialog مفتوح في الصفحة: امنع الـ scroll.",
            "قايمة مفيهاش ولا عنصر: اخفيها.",
            "عنوان بعده فقرة على طول: مسافة أقل.",
            R`نفس الفكرة في Tailwind: [[has-checked:]] و [[has-[...]:]].`
          ],
          sol: R`لما تختار radio: الكارت بتاعه بس الـ border بتاعه بقى بلون الـ brand وخلفيته فاتحة، ولما تختار واحد تاني الأول بيرجع رمادي والتاني ياخد الستايل، من غير JavaScript خالص. ولأن الـ input جوه الـ label، الضغط في أي حتة في الكارت بيختار.

مع [[<dialog>]]: قبل الفتح [[getComputedStyle(document.body).overflow]] ‏[[visible]]. بعد [[dialog.showModal()]] المتصفح بيحط [[open]] على الـ dialog، فالـ [[body:has(dialog[open])]] اتحققت والـ overflow بقى [[hidden]] والصفحة اللي ورا مبتعملش scroll. Escape بيقفل المودال والـ overflow بيرجع [[visible]] لوحده.

لو الستايل مش بيتطبق على الكارت، اتأكد إن الـ input جوه الـ label فعلًا (لو بـ [[for]] بس وبرا، [[:has]] مش هتلاقيه جواه). ولو الـ radios كلهم بيتختاروا مع بعض، ناسي نفس الـ [[name]] عليهم.`,
          solCode: R`<style>
  label { display: block; border: 2px solid lightgray; border-radius: 0.75rem; padding: 1rem; margin-block: 0.5rem; }
  label:has(input:checked) { border-color: oklch(0.55 0.2 265); background: oklch(0.95 0.03 265); }
  body:has(dialog[open]) { overflow: hidden; }
</style>
<label><input type="radio" name="plan" value="basic"> أساسي</label>
<label><input type="radio" name="plan" value="pro"> احترافي</label>
<label><input type="radio" name="plan" value="team"> فريق</label>
<button onclick="d.showModal()">افتح</button>
<dialog id="d"><p>أهلًا</p><form method="dialog"><button>اقفل</button></form></dialog>
<div style="height: 200vh"></div>`
        },
        {
          cmd: "CSS nesting",
          title: "قواعد جوه قواعد من غير Sass",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** جوه [[.card { }]] كتبنا [[&-title { color: red }]] (زي Sass) و [[h3 { color: green }]] من غير [[&]]. أنهي واحد هيشتغل؟`, done: R`[[h3]] اشتغلت (أخضر، يعني [[.card h3]])، و [[&-title]] مشتغلتش و [[.card-title]] فضل أسود: الـ nesting بتاع المتصفح مش بيلزّق نص زي Sass. اتقاس في Chrome 156.`,
              sol: R`~~~html nest.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>nesting توقّع</title>
<style>
  .card {
    &-title { color: red; }
    h3 { color: green; }
  }
</style></head>
<body>
  <main class="card">
    <h1 class="card-title">عنوان الكارت</h1>
    <h3>عنوان فرعي</h3>
  </main>
  <script>
    console.log(getComputedStyle(document.querySelector("h3")).color);
    console.log(getComputedStyle(document.querySelector(".card-title")).color);
  $__lt/script>
</body></html>
~~~

في الـ nesting بتاع المتصفح [[&]] بيمثّل الأب كـ selector كامل، مش كنص بيتلزق. فـ [[h3]] جوه [[.card]] معناها [[.card h3]] وبتشتغل (ومن غير [[&]] كمان). لكن [[&-title]] مش selector صحيح لأن المتصفح مبيكوّنش منها [[.card-title]]؛ القاعدة دي بتتجاهل كأنها مش موجودة.

في Sass الـ [[&]] نص بيتبدّل وقت الـ build، فـ [[&-title]] بتطلع [[.card-title]]. لو نقلت كود Sass زي ما هو هيبان إن «الـ nesting مش شغال» وهو فعلًا اللي مش شغال سطر الـ [[&-]] بس، ومفيش رسالة خطأ. الحل تكتب [[.card-title { }]] برا، على مستوى لوحدها.

الغلطة الشائعة: تستنى error في الكونسول. الـ CSS مبيطلّعش errors: اللي مبيفهمهوش بيعدّيه، ودوّر عليه في DevTools › Styles.

~~~text الناتج (Chrome 156)
h3           => rgb(0, 128, 0)  (أخضر: اشتغل)
.card-title  => rgb(0, 0, 0)  (لسه اللون الافتراضي: [[&-title]] اتجاهل)
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[.a, #b { & .c { color: red } }]] وبعدها [[.a .c.d { color: blue }]]. عنصر [[.c.d]] جوه [[.a]] لونه إيه؟ وليه؟`, done: R`أحمر، مع إن [[.a .c.d]] (0,3,0) شكله أقوى من [[.a .c]]. السبب إن الـ nesting بيتحوّل لـ [[:is(.a, #b) .c]]، و [[:is()]] بياخد specificity أقوى واحد في اللستة (الـ id)، فبقت (1,1,0). اتقاس في Chrome 156، والحل متحطش id جنب class في نفس القاعدة الأب.`,
              sol: R`~~~html nest-spec.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>specificity الـ nesting</title>
<style>
  .a, #b {
    & .c { color: red; }
  }
  .a .c.d { color: blue; }
</style></head>
<body>
  <main class="a"><h1 class="c d">لوني إيه؟</h1></main>
  <script>console.log(getComputedStyle(document.querySelector("h1")).color);$__lt/script>
</body></html>
~~~

اللون **أحمر**، ودي النقطة كلها:

1. المتصفح بيفك القاعدة المتداخلة كأنها [[:is(.a, #b) .c]].
2. [[:is()]] بياخد specificity **أقوى** عنصر في اللستة، حتى لو اللي طابق فعلًا هو الأضعف. فبيحسبها زي [[#b]]: ‏(1,0,0).
3. مع [[.c]] المجموع (1,1,0)، وده أقوى من [[.a .c.d]] اللي هو (0,3,0)، لأن خانة الـ id بتغلب أي عدد classes.

الحل مش إنك تزوّد classes: متحطش id جنب class في نفس الأب، أو افصلهم في قاعدتين، أو استخدم [[:where(#b)]] اللي وزنه صفر.

الغلطة الشائعة: تعدّ specificity الـ nesting زي Sass (Sass بيطلّع [[.a .c, #b .c]] كقاعدتين منفصلتين، فالعنصر اللي جوه [[.a]] بياخد (0,2,0) بس). نفس الكود بيدّي نتيجة مختلفة بين Sass والمتصفح.

~~~text الناتج (Chrome 156)
لون العنصر: rgb(255, 0, 0) (أحمر)
لو شيلت #b من الأب: rgb(0, 0, 255) (أزرق)
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** خد ملف SCSS صغير (كارت ونافبار) فيه nesting و [[&:hover]] و media جوه القاعدة، وحوّله لـ CSS عادي بالـ nesting بتاع المتصفح، واشيل Sass من المشروع.`, done: R`الصفحة شكلها زي ما هو (لقطة قبل وبعد)، ومفيش [[&-]] باقية، و [[npm ls sass]] بيقول مش موجود، والـ build بقى أسرع (رقم قبل وبعد).`,
              sol: R`~~~scss قبل: card.scss
.card {
  padding: 1rem;
  &:hover { background: #eef2ff; }
  &__title { font-size: 1.25rem; }
  @media (width >= 48rem) { padding: 2rem; }
}
.nav {
  display: flex;
  a { color: #1d4ed8; }
}
~~~

~~~css بعد: card.css (من غير Sass)
.card {
  padding: 1rem;
  &:hover { background: #eef2ff; }
  @media (width >= 48rem) { padding: 2rem; }
}
.card__title { font-size: 1.25rem; }  /* كانت &__title: لازم تطلع برا */
.nav {
  display: flex;
  a { color: #1d4ed8; }
}
~~~

~~~bash
npm uninstall sass
npm ls sass
~~~

معظم الملف بينتقل زي ما هو: [[&:hover]] شغالة، و [[@media]] جوه القاعدة شغالة، و [[a]] من غير [[&]] شغالة. الحاجة الوحيدة اللي لازم تتغيّر هي أي [[&-]] أو [[&__]] لأنها بتلزّق نص، فبتتكتب [[.card__title]] كاملة برا. دوّر عليها بـ [[grep -n "&[-_]" *.scss]].

بعد ما تخلص، امسح سطر Sass من الـ build وغيّر امتداد الملف. ومتاخدش كلام حد إن الشكل زي ما هو: قارن الـ computed styles قبل وبعد.

الغلطة الشائعة: تنسى إن Sass فيه حاجات تانية غير الـ nesting ([[$vars]] و [[@mixin]] و [[@use]]). دي لازم تتحول الأول لـ custom properties وكلاسات، قبل ما تشيل الباكدج.

~~~text الناتج (sass 1.x و Chrome 156، على نفس الـ HTML)
الفرق بين computed styles نسخة Sass ونسخة CSS: 0 خاصية من 3832 على العناصر الأربعة
وقت sass.compile قبل: 24.6ms  ← بعد: 0ms (مفيش خطوة build للـ CSS ده)
npm ls sass بعد الـ uninstall: $__bt-- (empty)
~~~` },
          ],
          desc: R`المتصفحات بقت بتفهم الـ nesting: بتكتب قواعد الأولاد والحالات جوه قاعدة الأب. و [[&]] = الأب نفسه: [[&:hover]] و [[&.active]] و [[.dark &]].

ومفيد مع Tailwind لما تكتب CSS مخصص في [[@utility]] أو [[@layer components]].`,
          example: R`.card {
  padding: 1rem;
  border-radius: var(--radius-card);
  & h3 { font-size: 1.25rem; }
  &:hover { box-shadow: var(--shadow-md); }
  &.is-featured { border: 2px solid var(--color-brand); }
  .dark & { background: var(--color-gray-900); }
  @media (width >= 48rem) {
    padding: 2rem;
  }
}`,
          try: R`انسخ الكود ده في ملف CSS عادي من غير أي أداة وافتحه في المتصفح: هيشتغل. وبعدين في DevTools › Styles شوف القاعدة المتداخلة ظاهرة إزاي.`,
          flag: "script",
          deep: {
            why: R`من غير nesting، كل حالة وكل ابن سطر منفصل بيكرر [[.card]]، والملف بيطول وبيبعد اللي مرتبط ببعض. Sass كان بيحل ده بس محتاج build. دلوقتي المتصفح نفسه بيفهمه.`,
            how: R`القاعدة المتداخلة بتتفهم كأنها [[:is(parent) child]]. [[& h3]] (أو [[h3]] لوحدها في المتصفحات الحديثة) = أي h3 جوه. و [[&:hover]] من غير مسافة = نفس العنصر. و [[.dark &]] = الـ & في الآخر، فالأب هو اللي جوه [[.dark]].

الفرق عن Sass: مينفعش تلزق كلام في [[&]] زي [[&__title]] (بتاعة BEM)، لأن المتصفح بيعامل & كـ selector كامل مش string. وبما إنها [[:is()]]، لو الأب فيه أكتر من selector ([[.a, #b { & p {} }]]) الـ specificity بتبقى بتاعة أتقلهم (الـ id هنا).

الـ media queries و [[@container]] و [[@supports]] ينفع يتحطوا جوه القاعدة ويتطبّقوا عليها. وتقدر تتداخل أكتر من مستوى، بس أكتر من 3 بيرجّعك لمشكلة الـ selectors الطويلة (درس specificity).

مدعومة في كل المتصفحات الحديثة من أواخر 2023. و Tailwind v4 بيدعمها في ملفات الـ CSS، وحتى جوه [[@utility]] (زي [[@media]] جوه [[container-app]] في مشروع حقيقي)، وبيفكّها وقت الـ build (بـ Lightning CSS) للمتصفحات الأقدم.`,
            when: R`CSS مخصص برا Tailwind: مكون معقد، أو [[@utility]] فيها حالات، أو CSS Modules. متعملش nesting عميق عشان «شكله منظم».`,
            mistakes: R`[[&-title]] أو [[&__title]] زي Sass ومش بيشتغل. تداخل 5 مستويات فالـ specificity تعلى من غير ما تاخد بالك. و [[.dark &]] وانت فاكرها [[&.dark]] (الأولى الكارت جوه dark، والتانية الكارت نفسه عليه dark).`
          },
          teach: R`## قاعدة واحدة للكارت، وجواها كل حالاته وأولاده

المثال قاعدة [[.card]] واحدة، وجواها قواعد أصغر: h3 اللي جوه، والـ hover، والكارت المميز، والكارت في الوضع الغامق، والشاشة الكبيرة. ده CSS عادي المتصفح بيفهمه من غير Sass ولا build. حطيناه في صفحة HTML (وعرّفنا المتغيرات اللي بيستخدمها: [[--radius-card]] ‏12px، و [[--shadow-md]]، و [[--color-brand]]، و [[--color-gray-900]])، وفيها 4 كروت: عادي فيه h3، و [[is-featured]]، وجوه [[.dark]]، وعليه [[.dark]] هو نفسه. وقسنا في Chrome على شاشة 800 وشاشة 600.

---

## ١. خصائص الكارت نفسه

~~~text CSS
.card {
  padding: 1rem;
  border-radius: var(--radius-card);
~~~

قبل أي قاعدة متداخلة: دي خصائص [[.card]] زي أي قاعدة عادية. قسناها: [[padding]] ‏16px على الشاشة الصغيرة، و [[border-radius]] ‏12px من المتغير.

## ٢. [[& h3 { font-size: 1.25rem; }]]

[[&]] = «الـ selector بتاع الأب»، هنا [[.card]]. والمسافة بعدها = «جوه». يعني [[.card h3]]. قسناه: الـ h3 بقى [[20px]] (1.25 × 16).

## ٣. [[&:hover { box-shadow: var(--shadow-md); }]]

[[&]] لازقة في [[:hover]] من غير مسافة = الكارت نفسه وقت الـ hover، يعني [[.card:hover]]. وقفنا بالماوس عليه:

~~~text اتقاس في Chrome
box-shadow = rgba(0, 0, 0, 0.1) 0px 4px 6px 0px
~~~

## ٤. [[&.is-featured { border: 2px solid var(--color-brand); }]]

برضه من غير مسافة = الكارت اللي عليه الكلاسين مع بعض: [[.card.is-featured]]. قسناه: [[2px solid oklch(0.55 0.2 265)]].

## ٥. [[.dark & { background: var(--color-gray-900); }]]

الـ [[&]] في **الآخر**: [[.dark .card]]، يعني كارت جوه عنصر عليه [[.dark]].

~~~text اتقاس في Chrome
كارت جوه <div class="dark">:   background = oklch(0.21 0.034 264.665)
كارت عليه class="card dark":   background = rgba(0, 0, 0, 0)   (شفاف، القاعدة متطبقتش)
~~~

ده الفرق بين [[.dark &]] (أبوه dark) و [[&.dark]] (هو نفسه dark).

## ٦. الـ media جوه القاعدة

~~~text CSS
  @media (width >= 48rem) {
    padding: 2rem;
  }
}
~~~

- [[@media]] جوه [[.card]] = القواعد اللي جواه للكارت نفسه، فبتكتب الخاصية على طول من غير selector.
- [[width >= 48rem]]: الصيغة الجديدة للـ media (range syntax) = [[min-width: 48rem]] = 768px.

~~~text اتقاس في Chrome
شاشة 800:  padding = 32px
شاشة 600:  padding = 16px
~~~

## ٧. المتصفح شايفها إزاي

قرينا القاعدة من [[document.styleSheets]] (الـ CSSOM، نفس اللي DevTools بيعرضه):

~~~text اتقاس في Chrome
.card
  & h3
  &:hover
  &.is-featured
  .dark &
  @media (width >= 48rem) { padding: 2rem }
~~~

يعني المتصفح محتفظ بيها متداخلة زي ما هي، مش بيفكها لقواعد منفصلة. وعشان كده DevTools › Styles بيوريك [[& h3]] وفوقها الأب [[.card]].

## الملخص

| المكتوب | يساوي | المسافة |
|---|---|---|
| [[& h3]] | [[.card h3]] | فيه: ابن جوه |
| [[&:hover]] | [[.card:hover]] | مفيش: نفس العنصر |
| [[&.is-featured]] | [[.card.is-featured]] | مفيش: نفس العنصر |
| [[.dark &]] | [[.dark .card]] | الأب هو اللي dark |
| [[@media (...) { padding }]] | [[@media (...) { .card { padding } }]] | |

## الخلاصة

- [[&]] = الأب كله كـ selector، مش كلام يتلزق ([[&__title]] بتاعة Sass مش بتشتغل).
- المسافة بعد [[&]] بتفرق: [[& .is-featured]] بمسافة = ابن جوه الكارت، ومش هتمسك الكارت نفسه.
- مستويين أو تلاتة بالكتير، وإلا الـ specificity بتعلى من غير ما تحس.`,
          lines: [
            R`القاعدة الأب [[.card]]، وكل اللي جواها بيتكتب بالنسبة ليها.`,
            R`خصائص الكارت نفسه بتتكتب عادي في الأول، قبل أي قاعدة جوّاها.`,
            R`تدوير الأركان من توكن [[--radius-card]] بدل رقم مكتوب بإيدك.`,
            R`أي h3 جوه الكارت = [[.card h3]].`,
            R`[[&]] لازقة = الكارت نفسه وقت الـ hover = [[.card:hover]].`,
            R`الكارت اللي عليه كمان [[is-featured]] = [[.card.is-featured]].`,
            R`[[&]] في الآخر: الكارت جوه [[.dark]] = [[.dark .card]].`,
            "media query جوه القاعدة: بتتطبق على الكارت نفسه.",
            "padding أكبر على الشاشات الكبيرة.",
            "قفلة الـ media.",
            "قفلة الكارت."
          ],
          sol: R`في Chrome أو Firefox أو Safari الحديثين الملف بيشتغل زي ما هو: الكارت padding بتاعه 16px، والـ h3 جواه 20px ([[1.25rem]])، والكارت اللي عليه [[is-featured]] ليه border 2px بلون الـ brand، ولو الكارت جوه عنصر عليه [[.dark]] خلفيته غامقة، ولما الشاشة تعدّي 768px الـ padding بيبقى 32px.

في Styles لما تختار الـ h3: هتلاقي القاعدة معروضة بـ [[& h3]] وفوقها سطر رمادي فيه [[.card]]، يعني DevTools بيوريك الأب اللي القاعدة متداخلة جواه. والـ [[@media]] بيظهر فوق الـ padding بتاعها كـ at-rule عادي.

لو مفيش حاجة اشتغلت، اتأكد إنك مش فاتح الملف بـ [[file://]] في متصفح قديم، وإن الـ [[var(--...)]] متعرّفة (المثال بيستخدم [[--radius-card]] و [[--shadow-md]] و [[--color-brand]]؛ لو مش متعرّفين القواعد دي بس هي اللي مش هتبان). وخلي بالك من المسافة: [[& h3]] معناها h3 جوه الكارت، و [[&.is-featured]] من غير مسافة معناها الكارت نفسه عليه الكلاس؛ لو كتبت [[& .is-featured]] بمسافة هتدوّر على ابن جواه وملهاش تأثير.`
        },
        {
          cmd: "@property",
          title: "متغير CSS بيتحرك: حد بيلف، ودايرة تقدّم بتتملي",
          desc: R`[[@property --angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }]] بيسجّل المتغير بنوع. من غيره المتصفح شايف [[--angle]] كلام، فمبيعرفش يحسب قيمة بين [[0deg]] و [[360deg]]: الحركة بتقفز مرة واحدة في نص المدة. مع التسجيل بقى زاوية، فـ [[transition]] و [[@keyframes]] بيحرّكوه بنعومة، وأي حاجة بتقرا [[var(--angle)]] (زي [[conic-gradient]]) بتتحرك معاه.

ده اللي بيعمل: حد ملوّن بيلف حوالين كارت «الباقة المميزة» من غير ما الكارت يلف، ودايرة تقدّم بـ [[conic-gradient]] بتتملي بـ transition، وشعاع ضوء بيعدّي على لوجو، وتدرّج لونه بيتحرك. كل ده كان محتاج JavaScript يغيّر المتغير كل frame.

التلات سطور لازم: [[syntax]] (النوع: [[<angle>]] أو [[<length>]] أو [[<percentage>]] أو [[<color>]] أو [[<number>]]...)، و [[inherits]] (الأولاد يورثوه ولا لأ)، و [[initial-value]] (لازمة لأي نوع غير [[*]]، ولو ناقصة القاعدة كلها بتتجاهل من غير ولا error). ومن JavaScript: [[CSS.registerProperty({ name, syntax, inherits, initialValue })]].

بيشتغل في Chrome و Edge من 85، و Safari من 16.4، و Firefox من 128 (Baseline من يوليو 2024، حسب MDN). كل اللي تحت اتجرّب في Chrome 156.`,
          example: R`@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.featured {
  border: 3px solid transparent;
  border-radius: 1rem;
  background:
    linear-gradient(var(--surface), var(--surface)) padding-box,
    conic-gradient(from var(--angle, 0deg), var(--brand), transparent 40%, var(--brand)) border-box;
  animation: spin 4s linear infinite;
}
@keyframes spin { to { --angle: 360deg; } }
@property --pct { syntax: "<percentage>"; inherits: true; initial-value: 0%; }
.ring {
  inline-size: 6rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(var(--brand) var(--pct), var(--line) 0);
  mask: radial-gradient(farthest-side, transparent 70%, #000 71%);
  transition: --pct 800ms ease-out;
}
.ring[data-done] { --pct: 72%; }
@media (prefers-reduced-motion: reduce) {
  .featured { animation: none; }
}`,
          try: R`حط كارت [[.featured]] ودايرة [[.ring]] في صفحة، وزرار بيعمل [[ring.toggleAttribute("data-done")]]. شوف الحد بيلف والدايرة بتتملي. وبعدين امسح بلوك [[@property --angle]]: الحد بقى بيعمل إيه؟ وامسح [[@property --pct]] ودوس الزرار.`,
          flag: "script",
          deep: {
            why: R`أشهر تأثيرين في صفحات الأسعار والداشبورد: حد ملوّن بيلف حوالين الكارت المميز، ودايرة تقدّم بتتملي لحد النسبة. قبل [[@property]] كان الحل يا إما عنصر [[::before]] مربع كبير بيلف ورا الكارت ومستخبي بـ [[overflow: hidden]]، يا إما JavaScript بيغيّر [[--pct]] في [[requestAnimationFrame]] كل frame. ودلوقتي سطرين CSS.`,
            how: R`المتغير العادي ([[--x]] من غير تسجيل) بيتخزن كنص (tokens)، والمتصفح مبيعرفش «نص المسافة» بين نصين، فالـ keyframes بتبدّل القيمة مرة واحدة عند 50% من المدة. قسناها: حركة من [[0deg]] لـ [[360deg]] في ٤ ثواني، المسجّل عند ثانية = [[90deg]] وعند ٣ = [[270deg]]، والمش مسجّل عند ثانية = [[0deg]] وعند ٣ = [[360deg]].

لما تسجّله بـ [[syntax: "<angle>"]] المتصفح بيعرف إن دي زاوية، فبيقدر يعمل interpolation. وكمان بيتحقق من القيمة: [[--angle: red]] على متغير مسجّل بيترفض والقيمة بتبقى الـ [[initial-value]] ([[0deg]])، ومع [[inherits: false]] الابن مبيورثش القيمة وبياخد الـ initial.

الحد اللي بيلف معمول بخلفيتين: [[linear-gradient]] بلون الكارت مقصوص على [[padding-box]] (جوه الحد)، و [[conic-gradient]] على [[border-box]] (لحد برا الحد). والحد نفسه شفاف، فاللي بيبان مكانه هو الـ conic. ولما [[--angle]] يتحرك، الـ conic بيلف والكارت والكلام ثابتين.

التكلفة: المتغير ده بيغيّر [[background]]، فالمتصفح بيعمل repaint للعنصر كل frame (Paint flashing بيبيّنه). على كارت أو اتنين مفيش مشكلة، على ٥٠ كارت في لستة على موبايل ضعيف تبقى مشكلة. حركة [[transform]] على [[::before]] بتتعمل في الـ compositor من غير paint، فلو هتكرر التأثير كتير قيس الاتنين.`,
            when: R`أي حاجة محتاجة تتحرك بين قيمتين ومش [[transform]] ولا [[opacity]]: زاوية gradient، ونسبة تقدّم، ولون بيتغير في [[color-mix()]]، وموضع شعاع ضوء. ولما تحب تبعت قيمة من JavaScript لـ CSS ([[el.style.setProperty("--pct", "72%")]]) والـ CSS هو اللي يعمل الحركة. ومش محتاجه لمتغير بيتغير فجأة ومش بيتحرك (توكنز الثيم مثلًا).`,
            mistakes: R`تنسى [[initial-value]]: القاعدة كلها بتتجاهل ومفيش error، والحركة ترجع تقفز (قسناها: من غير [[initial-value]] المتغير قبل [[red]] يعني مش متسجّل). تكتب [[syntax: <angle>]] من غير علامات تنصيص. تحرّك متغير [[inherits: true]] على عنصر فيه أولاد كتير فكلهم يتحسبوا تاني. وتنسى إن في متصفح من غير [[@property]] (أو مع [[animation: none]] في reduce) المتغير ممكن ميبقاش متعرّف، فـ [[conic-gradient]] كله بيبقى غلط والخلفية بتختفي: قسناها، [[background-image]] بقى [[none]] والحد اختفى. الحل [[var(--angle, 0deg)]] بقيمة احتياطية زي المثال.`
          },
          teach: R`## متغير ليه نوع، فالمتصفح يعرف يحرّكه

المثال فيه حاجتين: كارت «باقة مميزة» حده بيلف، ودايرة تقدّم بتتملي لحد 72%. حطيناهم في صفحة وشغّلناها في Chrome 156 من Playwright، ووقّفنا الحركة في لحظات معينة ([[animation.pause()]] و [[currentTime]]) وقرينا [[getComputedStyle(el).getPropertyValue("--angle")]].

---

## ١. من غير تسجيل: الحركة بتقفز

حركة من [[0deg]] لـ [[360deg]] في ٤ ثواني، على متغير مسجّل ومتغير مش مسجّل:

~~~text اتقاس في Chrome 156
مسجّل:      t=1s  --angle = 90deg     t=3s  --angle = 270deg
مش مسجّل:   t=1s  --b = 0deg          t=3s  --b = 360deg
~~~

المش مسجّل فضل [[0deg]] لحد نص المدة وبعدين قفز لـ [[360deg]]. المتصفح شايفه كلام، ومفيش «نص المسافة بين كلمتين»، فبيبدّل مرة واحدة عند 50%. والمسجّل ماشي بالظبط: ربع المدة = ربع اللفة.

## ٢. [[@property --angle { ... }]]

- [[syntax: "<angle>"]]: نوع القيمة، بين علامات تنصيص. أنواع تانية: [[<length>]] و [[<percentage>]] و [[<length-percentage>]] و [[<color>]] و [[<number>]] و [[<integer>]]، و [[*]] (أي حاجة، ودي مش بتتحرك).
- [[inherits: false]]: الأولاد مبيورثوش القيمة. قسناها: ابن جوه الكارت قرا [[--angle]] = [[0deg]] (الـ initial) والكارت نفسه [[90deg]].
- [[initial-value: 0deg]]: القيمة لو محدش حدد. ولو حد حط قيمة غلط ([[--angle: red]]) بترجع للـ initial: قسناها [[0deg]].

ومن غير [[initial-value]] (والنوع مش [[*]]) القاعدة كلها بتتجاهل. سجّلنا [[--nolen]] بـ [[<length>]] من غيرها، وحطينا فيه [[red]]: اتقبلت وطلعت [[red]]، يعني مفيش تسجيل أصلًا. ومن JavaScript المتصفح بيقولك على طول:

~~~text الـ Console
CSS.registerProperty({ name: "--z", syntax: "<length>", inherits: false })
SyntaxError: Failed to execute 'registerProperty' on 'CSS': An initial value must be provided if the syntax is not '*'

CSS.registerProperty(...)   ← نفس الاسم مرة تانية
InvalidModificationError: Failed to execute 'registerProperty' on 'CSS': The name provided has already been registered.
~~~

## ٣. الكارت المميز

### [[border: 3px solid transparent]] و [[border-radius: 1rem]]

حد شفاف عرضه 3px: مكانه محجوز بس مش باين، واللي هيبان فيه هو الخلفية اللي تحته.

### الخلفية: طبقتين

- [[linear-gradient(var(--surface), var(--surface)) padding-box]]: لون واحد (gradient من لون للونه) مقصوص على [[padding-box]]، يعني لحد جوه الحد بس. ده وش الكارت.
- [[conic-gradient(from var(--angle, 0deg), ...) border-box]]: تدرّج دايري بيبدأ من زاوية [[--angle]] وممدود لحد برا الحد. مش باين غير في الـ 3px بتوع الحد لأن الطبقة الأولى غطّت الباقي.
- [[var(--brand), transparent 40%, var(--brand)]]: لون البراند، وبعدين بيبهت لشفاف عند 40% من الدايرة، وبيرجع للبراند. فبيبان كأنه «ديل» نور بيلف.

### [[animation: spin 4s linear infinite]] و [[@keyframes spin { to { --angle: 360deg; } }]]

لفة كاملة كل ٤ ثواني بسرعة ثابتة. والـ keyframes بتحرّك المتغير نفسه، مش [[transform]]: الكارت والكلام ثابتين والـ gradient بس هو اللي بيلف.

## ٤. دايرة التقدّم

- [[@property --pct { syntax: "<percentage>"; inherits: true; initial-value: 0%; }]]: نسبة، و [[inherits: true]] عشان لو حطيتها على الأب الدايرة اللي جواه تقراها.
- [[inline-size: 6rem]] و [[aspect-ratio: 1]] و [[border-radius: 50%]]: مربع 96px بقى دايرة.
- [[conic-gradient(var(--brand) var(--pct), var(--line) 0)]]: لون البراند من 0 لحد [[--pct]]، وبعده على طول ([[0]] معناها «من نفس النقطة») لون الخط الرمادي.
- [[mask: radial-gradient(farthest-side, transparent 70%, #000 71%)]]: قناع دايري: الـ 70% اللي في النص شفاف (بيتشال)، والباقي باين. فبقت حلقة مش دايرة مليانة.
- [[transition: --pct 800ms ease-out]] و [[.ring[data-done] { --pct: 72%; }]]: لما الـ attribute يتحط، النسبة بتتحرك لـ 72%.

حطينا [[data-done]] ووقّفنا الـ transition في لحظات:

~~~text اتقاس في Chrome 156
t=0      --pct = 0%
t=200ms  --pct = 27.2259%
t=400ms  --pct = 49.2943%
t=800ms  --pct = 72%
~~~

في نص الوقت النسبة 49% مش 36%، لأن [[ease-out]] سريع في الأول وبيهدى. ونفس الكلام على متغير مش مسجّل: [[getAnimations().length]] = 0 والقيمة بقت [[72%]] على طول، يعني الدايرة اتملت مرة واحدة.

ودايرة التقدّم حاجة بتتقري: حط عليها [[role="progressbar"]] و [[aria-valuenow="72"]] و [[aria-valuemin="0"]] و [[aria-valuemax="100"]] واسم بـ [[aria-label]]، وغيّر [[aria-valuenow]] من JavaScript مع [[--pct]].

## ٥. reduced motion والمتصفحات القديمة

[[@media (prefers-reduced-motion: reduce) { .featured { animation: none; } }]]: الحد بيفضل باين وثابت. بس هنا فخ: لما الحركة تتلغي، أو في متصفح مش بيفهم [[@property]]، [[--angle]] ممكن ميبقاش ليه قيمة. جرّبنا [[conic-gradient(from var(--nope), ...)]] بمتغير مش متعرّف:

~~~text اتقاس في Chrome 156
background-image = none
~~~

الخلفية كلها اتلغت (مش الـ conic بس)، فالحد الشفاف بقى فاضي والكارت من غير لون. عشان كده المثال كاتب [[var(--angle, 0deg)]]: لو مفيش قيمة خد [[0deg]].

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[@property]] | بيدّي المتغير نوع، فيتحرك بنعومة ويترفض لو قيمته غلط |
| [[syntax]] و [[inherits]] و [[initial-value]] | التلاتة لازم، ومن غير الأخيرة القاعدة بتتجاهل |
| [[padding-box]] و [[border-box]] | خلفيتين: وش الكارت، والحد اللي بيلف |
| [[conic-gradient]] + [[mask]] | دايرة تقدّم حلقة |
| [[var(--x, قيمة)]] | احتياطي لو المتغير مش متعرّف |
| التكلفة | repaint كل frame، فقيس لو هتكرره كتير |`,
          lines: [
            R`بداية تسجيل متغير اسمه [[--angle]]؛ الاسم لازم يبدأ بشرطتين زي أي متغير CSS.`,
            R`نوعه زاوية، فالمتصفح يعرف يحسب أي قيمة بين [[0deg]] و [[360deg]].`,
            R`الأولاد مبيورثوش القيمة، فكل عنصر ليه زاويته لوحده.`,
            R`القيمة لو محدش حدد، أو لو حد حط قيمة غلط؛ ومن غيرها القاعدة كلها بتتجاهل.`,
            R`قفلة الـ [[@property]].`,
            R`الكارت المميز اللي حده هيلف.`,
            R`حد شفاف عرضه 3px: مكانه محجوز، واللي بيبان فيه الخلفية اللي تحته.`,
            R`أركان مدورة؛ الطبقتين بتوع الخلفية بيمشوا على نفس التدوير.`,
            R`الخلفية من طبقتين، الأولى هي اللي فوق.`,
            R`وش الكارت: لون واحد مقصوص على [[padding-box]]، يعني جوه الحد بس.`,
            R`تدرّج دايري بيبدأ من [[--angle]] (أو [[0deg]] لو مش متعرّف) وممدود لحد برا الحد، فبيبان في الـ 3px بس.`,
            R`لفة كاملة كل ٤ ثواني بسرعة ثابتة، على طول.`,
            R`قفلة الكارت.`,
            R`الحركة بتغيّر المتغير نفسه لحد [[360deg]]، مش [[transform]]، فالكارت والكلام ثابتين.`,
            R`متغير تاني نوعه نسبة، وبيتورث عشان ينفع يتحط على الأب.`,
            R`دايرة التقدّم: عنصر فاضي، والـ CSS هو اللي بيرسمها كلها.`,
            R`عرضها 6rem (96px)، وبالـ logical عشان العربي.`,
            R`[[aspect-ratio: 1]]: الارتفاع زي العرض، فبقت مربع.`,
            R`المربع بقى دايرة، لأن تدوير كل ركن نص العرض.`,
            R`لون البراند لحد النسبة، وبعدها على طول لون الخط الرمادي للباقي.`,
            R`قناع بيشيل الـ 70% اللي في النص، فالدايرة المليانة بقت حلقة.`,
            R`لما [[--pct]] يتغير، اتحرك له في 800ms بـ [[ease-out]].`,
            R`قفلة الدايرة.`,
            R`لما JavaScript يحط [[data-done]] النسبة بتبقى 72%، والـ transition بيحرّكها.`,
            R`لو المستخدم طالب حركة أقل من إعدادات النظام...`,
            R`...الحد يقف في مكانه، ويفضل باين بفضل الـ [[0deg]] الاحتياطي.`,
            R`قفلة الـ media.`
          ],
          sol: R`الحد بيلف حوالين الكارت بنعومة والكلام ثابت. ولما تدوس الزرار الدايرة بتتملي من 0 لـ 72% في 800ms، أسرع في الأول وبتهدى في الآخر. ولو دوست تاني بترجع لـ 0 بنفس الحركة.

لما تمسح [[@property --angle]]: الحد مبقاش بيلف، بيقف نص المدة على زاوية وبعدين يقفز للتانية (عند 50%)، لأن المتغير بقى نص والمتصفح مبيعرفش يحرّك نص. ولما تمسح [[@property --pct]]: الدايرة بتتملي مرة واحدة من غير حركة، و [[ring.getAnimations().length]] بيرجّع 0.

لو الحد مش باين خالص: اتأكد إن [[--surface]] و [[--brand]] متعرّفين (من غيرهم الخلفية بتتلغي كلها)، وإن الـ [[border]] شفاف مش [[none]]. ولو الحركة مش شغالة رغم التسجيل، دوّر على [[initial-value]]: من غيرها التسجيل بيتجاهل من غير error.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[@keyframes m { to { --x: 100px } }]] على عنصر [[--x: 0px]] في ٤ ثواني. قيمة [[--x]] كام عند ثانية وعند ٢.٥ ثانية لو المتغير مش مسجّل؟ وكام لو مسجّل بـ [[<length>]]؟ اكتب، وبعدين وقّف الحركة بـ [[el.getAnimations()[0].pause()]] و [[currentTime]] واقرا القيمة.`, done: R`مش مسجّل: [[0px]] ثم [[100px]] (قفزة عند ٢ ثانية). مسجّل: [[25px]] ثم [[62.5px]]. والقراية من [[getComputedStyle]] طابقت.`,
              sol: R`~~~html prop-math.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>@property توقّع</title>
<style>
  @keyframes m { to { --x: 100px; } }
  @property --y { syntax: "<length>"; inherits: false; initial-value: 0px; }
  @keyframes n { to { --y: 100px; } }
  .box { --x: 0px; animation: m 4s linear both; }
  .reg { animation: n 4s linear both; }
</style></head>
<body>
  <main>
    <h1>قيمة المتغير</h1>
    <div class="box" id="a">مش مسجّل</div>
    <div class="reg" id="b">مسجّل</div>
  </main>
  <script>
    function at(el, name, ms) {
      const an = el.getAnimations()[0];
      an.pause();
      an.currentTime = ms;
      return getComputedStyle(el).getPropertyValue(name);
    }
    console.log(at(a, "--x", 1000), at(a, "--x", 2500));
    console.log(at(b, "--y", 1000), at(b, "--y", 2500));
  $__lt/script>
</body></html>
~~~

المتغير العادي نص بالنسبة للمتصفح، فمبيعرفش يحسب قيمة في النص بين [[0px]] و [[100px]]. اللي بيحصل هو discrete animation: بيفضل على القيمة الأولى لحد نص المدة (ثانيتين من ٤) وبعدين يقفز.

[[@property]] بيقوله «ده طول»، فبيعمل interpolation عادي: عند ثانية (25% من المدة) 25px، وعند ٢٫٥ ثانية (62.5%) 62.5px.

[[el.getAnimations()[0]]] بيرجّع الحركة نفسها كـ object، و [[pause()]] بيوقفها، و [[currentTime]] بيوديها لملي ثانية معينة، فتقدر تقرا القيمة في أي لحظة من غير ما تستنى.

الغلطة الشائعة: تستخدم [[ease]] وتتوقع 25px عند ثانية. الـ [[linear]] هنا هو اللي بيخلّي الحساب نسبة بسيطة.

~~~text الناتج (Chrome 156)
مش مسجّل:  عند 1s = 0px   عند 2.5s = 100px
مسجّل:     عند 1s = 25px  عند 2.5s = 62.5px
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[@property --glow { syntax: "<color>"; inherits: false; }]] و [[.btn { --glow: transparent; transition: --glow .3s } .btn:hover { --glow: var(--brand) }]]، والظل بيظهر فجأة من غير حركة ومفيش ولا error.`, done: R`عرفت إن [[initial-value]] ناقصة فالقاعدة اتجاهلت، وبعد ما زوّدت [[initial-value: transparent]] الـ hover بقى بيعمل transition ([[btn.getAnimations().length]] = 1 وقت الـ hover).`,
              sol: R`~~~html glow.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>glow</title>
<style>
  :root { --brand: #1d4ed8; }
  @property --glow {
    syntax: "<color>";
    inherits: false;
    initial-value: transparent;   /* السطر الناقص */
  }
  .btn {
    --glow: transparent;
    transition: --glow .3s;
    box-shadow: 0 0 16px 4px var(--glow);
    padding: .75rem 1.5rem; border: 0; border-radius: 8px;
    background: var(--brand); color: #fff;
  }
  .btn:hover { --glow: var(--brand); }
</style></head>
<body>
  <main><h1>زرار بيلمع</h1><button class="btn">اشترك</button></main>
</body></html>
~~~

قاعدة [[@property]] لازم ٣ حاجات: [[syntax]] و [[inherits]] و [[initial-value]]. ناقص [[initial-value]] مع [[syntax]] غير [[*]]؟ القاعدة كلها بتتجاهل **من غير أي error**، فـ [[--glow]] بيرجع متغير نص عادي، والنص مبيتعملوش transition.

بعد ما زوّدت السطر، [[--glow]] بقى لون، فالمتصفح يقدر يحسب ألوان في النص، و [[box-shadow]] اللي بيقراه بيتغيّر كل frame. [[btn.getAnimations().length]] بيعد الـ transitions الشغالة دلوقتي.

الغلطة الشائعة: تغيّر [[transition]] لـ [[box-shadow .3s]] وتسيب الـ [[@property]] مكسور: هيشتغل هنا بس المتغير لسه مش متسجّل، وأي حاجة تانية بتعتمد عليه هتفضل بتقفز. ومتنساش إن [[initial-value]] لازم تكون قيمة ثابتة، فمينفعش [[var(--brand)]] فيها.

~~~text الناتج (Chrome 156، بعد 100ms من الـ hover)
من غير initial-value: getAnimations().length = 0
بعد التصليح:          getAnimations().length = 1، و box-shadow في النص: rgba(29, 78, 216, 0.682) 0px 0px 16px 4px
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** لوجو بيعدّي عليه شعاع ضوء: اللوجو SVG كـ [[mask-image]] على عنصر، وخلفيته [[linear-gradient(105deg, var(--fg) 40%, white 50%, var(--fg) 60%)]] بـ [[background-size: 300% 100%]]، والـ [[background-position]] بيتحرك بمتغير مسجّل [[--sweep]] من نوع [[<percentage>]].`, done: R`الشعاع بيعدّي كل ٣ ثواني من غير ما بداية التكرار تبان (الحركة بتبدأ وتخلص والشعاع برا اللوجو)، وفي العربي بيعدّي من الناحية التانية، ومع reduce اللوجو ثابت بلون واحد.`,
              sol: R`~~~html shine.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>لوجو بيلمع</title>
<style>
  @property --sweep { syntax: "<percentage>"; inherits: false; initial-value: 0%; }
  @keyframes sweep { to { --sweep: 100%; } }
  .logo {
    --fg: #1d4ed8;
    display: block; inline-size: 160px; block-size: 160px;
    background: linear-gradient(105deg, var(--fg) 40%, white 50%, var(--fg) 60%);
    background-size: 300% 100%;
    background-position: var(--sweep) 0;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48'/%3E%3C/svg%3E");
    mask-size: contain;
    animation: sweep 3s linear infinite;
  }
  .logo:dir(ltr) { animation-direction: reverse; }
  @media (prefers-reduced-motion: reduce) {
    .logo { animation: none; background: var(--fg); }
  }
</style></head>
<body>
  <main><h1>شركتنا</h1><div class="logo" role="img" aria-label="لوجو الشركة"></div></main>
</body></html>
~~~

الـ gradient حجمه 300% من العنصر، فالعنصر بيوري تلت الصورة بس في أي لحظة، والشعاع في نص الصورة (من 40% لـ 60%):

- عند [[--sweep: 0%]] الشباك على أول تلت (0–33%)، والشعاع مش جواه.
- عند [[50%]] الشباك على التلت الأوسط، والشعاع في النص.
- عند [[100%]] الشباك على آخر تلت، والشعاع خرج من الناحية التانية.

فالتكرار مبيبانش: أول frame وآخر frame نفس اللون. [[background-position]] مبيتحركش لوحده هنا، المتغير المسجّل [[--sweep]] هو اللي بيتحرك، وعشان كده لازم [[<percentage>]]. و [[mask-image]] بيقص الخلفية على شكل اللوجو.

الحركة من 0 لـ 100 بتمشي من اليمين للشمال، وده اتجاه القراية في العربي، و [[:dir(ltr)]] بيعكسها في الإنجليزي.

الغلطة الشائعة: [[background-size: 100%]]، فكل قيم [[background-position]] بالنسبة المئوية بتبقى نفس المكان ومفيش حركة خالص.

~~~text الناتج (Chrome 156)
إيقاف الحركة عند 0ms     background-position = 0% 0px  (الشعاع برا)
إيقاف الحركة عند 1500ms  background-position = 50% 0px  (الشعاع في النص)
إيقاف الحركة عند 2999ms  background-position = 99.9667% 0px  (الشعاع برا)
عدد الحركات مع reduce: 0، والخلفية: rgb(29, 78, 216)
في صفحة dir="ltr": animationDirection = reverse
axe: 0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** gauge لقياس السرعة بـ [[conic-gradient]] على نص دايرة ([[from -90deg]] و 180deg بس)، والإبرة [[rotate: calc(var(--val) * 1.8deg - 90deg)]]، و [[--val]] مسجّل [[<number>]] وبيتغير من JavaScript بـ transition، و [[role="meter"]] بـ [[aria-valuenow]].`, done: R`من الكونسول [[g.style.setProperty("--val", 80)]] الإبرة والقوس بيتحركوا مع بعض بنعومة، و [[aria-valuenow]] بيتحدّث معاه، وقيمة 150 بتتقص لـ 100 بـ [[clamp()]] جوه الـ calc.`,
              sol: R`~~~html gauge.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>gauge</title>
<style>
  @property --val { syntax: "<number>"; inherits: true; initial-value: 0; }
  .gauge {
    --val: 0;
    --safe: clamp(0, var(--val), 100);
    position: relative; inline-size: 240px; block-size: 120px; overflow: hidden;
    transition: --val .6s ease-out;
  }
  .arc {
    position: absolute; inset: 0 0 auto; block-size: 240px; border-radius: 50%;
    background: conic-gradient(from -90deg,
      #1d4ed8 calc(var(--safe) * 1.8deg),
      #d1d5db 0 180deg,
      transparent 0);
  }
  .needle {
    position: absolute; inset-block-end: 0; inset-inline-start: calc(50% - 2px);
    inline-size: 4px; block-size: 110px; background: #111827;
    transform-origin: bottom;
    rotate: calc(var(--safe) * 1.8deg - 90deg);
  }
</style></head>
<body>
  <main><h1>السرعة</h1>
    <div class="gauge" id="g" role="meter" aria-label="السرعة" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div class="arc"></div><div class="needle"></div>
    </div>
  </main>
  <script>
    const g = document.getElementById("g");
    new MutationObserver(() => {
      const v = Number(g.style.getPropertyValue("--val")) || 0;
      g.setAttribute("aria-valuenow", Math.min(100, Math.max(0, v)));
    }).observe(g, { attributes: true, attributeFilter: ["style"] });
  $__lt/script>
</body></html>
~~~

[[--val]] مسجّل [[<number>]] فالـ transition بيتحرك رقم رقم، وكل اللي بيقراه بيتحرك معاه من غير كود زيادة. و [[inherits: true]] لازم، عشان القوس والإبرة أولاد [[.gauge]] وبيورثوا القيمة اللي بتتغير.

- [[--safe: clamp(0, var(--val), 100)]] بيقص أي قيمة برا المدى، فـ 150 بتبقى 100، والحساب مكتوب في مكان واحد.
- النص دايرة 180 درجة، فالدرجة = القيمة × 1.8. [[from -90deg]] بيبدأ القوس من الشمال.
- الإبرة بتلف من [[-90deg]] (صفر) لـ [[90deg]] (100)، و [[transform-origin: bottom]] يخليها تلف حوالين قاعدتها.
- [[MutationObserver]] بيسمع لأي تغيير في [[style]]، فـ [[aria-valuenow]] بيتحدّث حتى لو حد غيّر القيمة من الكونسول.

الغلطة الشائعة: تكتب [[inherits: false]] (زي كل الأمثلة)، فالأولاد مبياخدوش القيمة خالص والعداد يفضل على الصفر. ولو الـ [[--val]] مش مسجّل، الإبرة هتقفز لأن الرقم هيبقى نص.

~~~text الناتج (Chrome 156)
setProperty("--val", 80):  بعد 150ms rotate = -28.0152deg (لسه بيتحرك)
                           في الآخر rotate = 54deg، و aria-valuenow = 80
setProperty("--val", 150): rotate = 90deg، و aria-valuenow = 100
axe: 0
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الحد اللي بيلف بطريقتين: [[@property]] زي المثال، و [[::before]] مربع أكبر من الكارت عليه [[conic-gradient]] ثابت وبيلف بـ [[transform: rotate()]] ومستخبي بـ [[overflow: hidden]]. حط ٣٠ كارت من كل نوع وشغّل Paint flashing و Performance.`, done: R`كتبت جدول: نسخة [[@property]] بتنوّر أخضر (repaint) كل frame، ونسخة الـ rotate مبتنوّرش لأنها transform، ووقت الـ Paint في Performance للنوعين. وقرار مكتوب: كارت أو اتنين [[@property]] أبسط، ولستة طويلة الـ rotate أرخص.`,
              sol: R`~~~html border-a.html (نسخة @property، وكرر الكارت ٣٠ مرة)
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>حد بيلف: @property</title>
<style>
  @property --a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
  @keyframes spin { to { --a: 360deg; } }
  .grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; }
  .card {
    block-size: 120px; border-radius: 12px; padding: 2px;
    background: conic-gradient(from var(--a), #1d4ed8, #f59e0b, #1d4ed8);
    animation: spin 3s linear infinite;
  }
  .card > div { block-size: 100%; border-radius: 10px; background: #fff; }
</style></head>
<body>
  <main><h1>30 كارت</h1><div class="grid" id="g"></div></main>
  <script>
    g.innerHTML = Array(30).fill('<div class="card"><div>كارت</div></div>').join("");
  $__lt/script>
</body></html>
~~~

~~~css border-b.css (نسخة الـ rotate: نفس الـ HTML)
.card { position: relative; overflow: hidden; block-size: 120px; border-radius: 12px; padding: 2px; }
.card::before {
  content: ""; position: absolute; inset: -60%; z-index: 0;
  background: conic-gradient(#1d4ed8, #f59e0b, #1d4ed8);
  animation: spin 3s linear infinite;
}
.card > div { position: relative; block-size: 100%; border-radius: 10px; background: #fff; }
@keyframes spin { to { transform: rotate(360deg); } }
~~~

في نسخة [[@property]] المتغير بيتغير، فالـ gradient لازم يترسم من الأول كل frame، على الـ main thread. في نسخة الـ rotate الـ gradient اترسم مرة واحدة في طبقة، والـ compositor بيلف الطبقة نفسها كل frame من غير ما يرسم حاجة.

جرّب بنفسك: DevTools › Rendering › Paint flashing: نسخة [[@property]] بتنوّر أخضر كل frame. والرقم من الـ trace تحت: عدد أحداث Paint قريب في النسختين، بس في نسخة الـ rotate كل حدث فاضي تقريبًا، فالوقت الكلي أقل بأكتر من 20 مرة.

القرار: كارت أو اتنين، [[@property]] أبسط وأقصر وقابل للتحريك مع متغيرات تانية. لستة طويلة، الـ rotate أرخص بكتير. [[overflow: hidden]] في النسخة التانية لازم عشان يقص المربع الكبير، و [[inset: -60%]] عشان الركن ميبانش فاضي وهو بيلف.

الغلطة الشائعة: تحكم بالعين على جهاز قوي وتقول «الاتنين ناعمين». الفرق بيظهر في وقت الـ Paint مش في شكل الحركة، وبيبان على موبايل ضعيف أو مع بطارية.

~~~text الناتج (Chrome 156، ٣٠ كارت، trace لمدة 3 ثواني)
النسخة      أحداث Paint   وقت Paint الكلي
@property   1804          492.6ms
rotate      2106          18.5ms
~~~` },
          ],
        },
        {
          cmd: "animation-timeline",
          title: "حركة ماشية مع الـ scroll: شريط القراية وكروت بتظهر، من غير JavaScript",
          desc: R`الحركة العادية ماشية بالوقت: 500ms وتخلص. [[animation-timeline]] بيربطها بالـ scroll بدل الوقت: [[scroll()]] = الصفحة (أو أي حاوية) نزلت قد إيه من 0% لـ 100%، و [[view()]] = العنصر ده فين في الشاشة: لسه داخل، ولا في النص، ولا خارج. فشريط «قريت قد إيه» فوق المقال، وكروت بتظهر وانت نازل، و parallax، كلهم CSS بس.

نفس [[@keyframes]] اللي تعرفها. الفرق: [[animation: grow linear both]] من غير مدة، وبعدها [[animation-timeline: scroll()]]. و [[animation-range: entry 0% cover 30%]] بيحدد الحركة تبدأ وتخلص إمتى: تبدأ أول ما العنصر يلمس تحت الشاشة، وتخلص لما يبقى عدّى 30% من رحلته فيها.

الترتيب مهم: الـ shorthand [[animation]] بيرجّع [[animation-timeline]] لـ [[auto]] (الوقت)، فلو كتبت الـ timeline الأول وبعده [[animation]]، الحركة بترجع وقت مدته صفر وبتقفز لآخرها.

بيشتغل في Chrome و Edge من 115، و Safari من 26، و Firefox لسه ورا flag (حسب MDN و caniuse وقت الكتابة)، يعني مش Baseline. فكل حاجة لازم تبقى سليمة من غيره: [[@supports]] للي ممكن يبوظ، والباقي بيبان في شكله النهائي. اتجرّب في Chrome 156.`,
          example: R`@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@supports (animation-timeline: scroll()) {
  .read-progress {
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    block-size: 4px;
    background: var(--brand);
    transform-origin: 0 50%;
    animation: grow linear both;
    animation-timeline: scroll(root block);
  }
  .read-progress:dir(rtl) { transform-origin: 100% 50%; }
}
@keyframes reveal { from { opacity: 0; translate: 0 2rem; } to { opacity: 1; translate: 0 0; } }
.card {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
@media (prefers-reduced-motion: reduce) {
  .card { animation: none; }
}`,
          try: R`اعمل صفحة طويلة فيها [[<div class="read-progress"></div>]] فوق، وكروت تحت بعض بـ [[.card]]. انزل ببطء وشوف الشريط والكروت. وبعدين بدّل ترتيب السطرين [[animation]] و [[animation-timeline]] جوه [[.read-progress]] واعمل refresh.`,
          flag: "script",
          deep: {
            why: R`شريط القراية، والعناصر اللي بتظهر مع الـ scroll، و parallax: في المشاريع الحقيقية كلهم كانوا JavaScript (scroll listener أو IntersectionObserver أو GSAP ScrollTrigger)، وده كود زيادة، وكل frame الـ main thread لازم يحسب، وأي شغل تاني على الـ main thread بيخلّي الحركة تتقطّع. ودلوقتي سطرين CSS، والمتصفح بيشغّل حركات [[transform]] و [[opacity]] دي في الـ compositor بعيد عن الـ main thread (حسب وثائق Chrome).`,
            how: R`أي animation ليها timeline: الافتراضي [[auto]] = وقت الصفحة (DocumentTimeline). [[scroll()]] بيعمل ScrollTimeline: 0% لما الحاوية فوق خالص و 100% لما توصل لآخرها. قسناها على صفحة الـ scroll بتاعها 2000px: عند 0 [[scaleX(0)]]، وعند 500 [[0.25]]، وعند 1000 [[0.5]]، وعند 2000 [[1]]، و [[effect.getComputedTiming().duration]] بقت [[100%]] مش وقت.

[[scroll(root block)]]: [[root]] = الصفحة نفسها (الـ viewport)، و [[block]] = الاتجاه الرأسي. والافتراضي [[nearest]] = أقرب أب بيعمل scroll، و [[inline]] للأفقي (carousel). و [[view()]] بيعمل ViewTimeline: تقدّم العنصر وهو بيعدّي في الـ scrollport. ورحلته اسمها ranges: [[entry]] (داخل من تحت)، و [[contain]] (جوه كله)، و [[exit]] (خارج من فوق)، و [[cover]] (من أول ما يلمس لحد ما يخرج خالص).

لو المتصفح مش فاهم [[animation-timeline]] بيتجاهل السطر، فالحركة بقت وقت ومدتها صفر و [[both]]: العنصر بيقفز للـ [[to]] على طول. للكروت ده كويس (ظاهرة)، لكن للشريط ده معناه شريط مليان على طول، وعشان كده هو جوه [[@supports]].`,
            when: R`أي حاجة حركتها المفروض «ماشية مع إيد المستخدم» على الـ scroll: شريط قراية، و reveal، و parallax خفيف، وهيدر بيصغر، وصورة بتكبر وهي داخلة، وتقدّم carousel أفقي. ومش لحاجة لازم تحصل مرة واحدة وتفضل (عدّاد بيعد لما يظهر): دي IntersectionObserver، لأن الـ scroll-driven بترجع لو رجعت لفوق.`,
            mistakes: R`تكتب [[animation-timeline]] قبل [[animation]] فالـ shorthand يمسحه (قسناها: الشريط بقى [[scaleX(1)]] من أول الصفحة، والـ timeline بقى DocumentTimeline ومدته 0). تحط مدة زي [[1s]] في الـ animation وتستغرب إنها مش فارقة (في الـ scroll timeline المدة ملهاش معنى، بس في المتصفح اللي مش بيدعم بتشتغل كحركة وقت عادية). تنسى [[@supports]] للحاجات اللي شكلها النهائي غلط. وتعمل [[overflow: hidden]] على أب في النص فـ [[scroll()]] بيلاقيه هو الـ scroller الأقرب بدل الصفحة.`
          },
          teach: R`## الحركة ماشية بالـ scroll مش بالوقت

المثال حاجتين: شريط فوق الصفحة بيتملي وانت بتقرا، وكروت بتظهر وهي داخلة الشاشة. حطيناهم في صفحة عربي ([[dir="rtl"]]) طولها بيدّي 2000px scroll، و viewport ‏800×600، وكارت ارتفاعه 200px بيبدأ عند 1200px من فوق، وعملنا scroll من Playwright لأماكن معينة وقرينا الـ computed style في Chrome 156.

---

## ١. [[@keyframes grow]]

من [[scaleX(0)]] (عرضه صفر) لـ [[scaleX(1)]] (عرضه كامل). [[transform]] عشان مفيش layout ولا paint، الـ compositor بيمطّه بس.

## ٢. [[@supports (animation-timeline: scroll())]]

القواعد اللي جوه بتتطبق بس لو المتصفح فاهم [[animation-timeline]]. ليه؟ لأن في المتصفح اللي مش فاهم، الحركة بتبقى وقت مدته صفر، فالشريط بيبان مليان على طول من أول الصفحة. جوه [[@supports]]، المتصفح اللي مش فاهم مش بيشوف الشريط أصلًا (div فاضي ملوش ارتفاع).

## ٣. الشريط

- [[position: fixed]] و [[inset-block-start: 0]] و [[inset-inline: 0]]: لازق فوق، من الحافة للحافة، بالـ logical.
- [[block-size: 4px]] و [[background: var(--brand)]]: خط رفيع بلون البراند.
- [[transform-origin: 0 50%]]: بيكبر من الشمال، و [[.read-progress:dir(rtl) { transform-origin: 100% 50%; }]] بيخليه يكبر من اليمين في العربي. ([[transform]] مش logical، فلازم تقلبه بإيدك.)
- [[animation: grow linear both]]: من غير مدة. [[linear]] عشان الشريط يمشي بنفس سرعة الـ scroll، و [[both]] عشان يفضل على آخر قيمة.
- [[animation-timeline: scroll(root block)]]: الوقت بقى الـ scroll الرأسي للصفحة.

~~~text اتقاس في Chrome 156 (الـ scroll من 0 لـ 2000)
scrollY=0     transform = matrix(0, 0, 0, 1, 0, 0)
scrollY=500   transform = matrix(0.25, 0, 0, 1, 0, 0)
scrollY=1000  transform = matrix(0.5, 0, 0, 1, 0, 0)
scrollY=2000  transform = matrix(1, 0, 0, 1, 0, 0)
timeline = ScrollTimeline، و duration = 100%
~~~

أول رقم في [[matrix]] هو الـ scaleX: ربع الـ scroll = ربع الشريط. ومكانه بعد 25% من الـ scroll:

~~~text اتقاس في Chrome 156، عرض الشاشة 800
dir=rtl:  الشريط من 600 لـ 800   (من اليمين)
dir=ltr:  الشريط من 0 لـ 200     (من الشمال)
~~~

### الفخ: الترتيب

كتبنا [[animation-timeline: scroll(root block);]] الأول وبعده [[animation: grow linear both;]]:

~~~text اتقاس في Chrome 156
scrollY=0     transform = matrix(1, 0, 0, 1, 0, 0)
scrollY=1000  transform = matrix(1, 0, 0, 1, 0, 0)
timeline = DocumentTimeline، و duration = 0
~~~

الشريط مليان من أول الصفحة. الـ shorthand [[animation]] بيصفّر كل الخصائص اللي تحته ومنها [[animation-timeline]]، فرجعت حركة وقت مدتها صفر. القاعدة: [[animation-timeline]] دايمًا بعد [[animation]].

## ٤. الكروت: [[view()]] و [[animation-range]]

- [[@keyframes reveal]]: من شفاف وتحت بـ 2rem (32px) لظاهر وفي مكانه. [[translate]] خاصية لوحدها غير [[transform]] (individual transform).
- [[animation-timeline: view()]]: التقدّم = مكان الكارت في الشاشة.
- [[animation-range: entry 0% cover 30%]]: تبدأ لما أول الكارت يلمس تحت الشاشة، وتخلص لما الكارت يعدّي 30% من رحلة [[cover]] (من أول ما يلمس لحد ما يخرج من فوق).

الحساب: الكارت عند 1200px والشاشة 600، فبيلمس تحت الشاشة عند scrollY = 600. ورحلة cover طولها 600 + 200 = 800px، و 30% منها 240، فالحركة بتخلص عند 840.

~~~text اتقاس في Chrome 156 (opacity / translate)
scrollY=500   0.00 / 0px 32px      لسه برا الشاشة
scrollY=600   0.00 / 0px 32px      لمس تحت الشاشة: البداية
scrollY=650   0.21 / 0px 25.33px   50 من 240 = 21%
scrollY=700   0.42 / 0px 18.67px
scrollY=800   0.83 / 0px 5.33px
scrollY=840   1.00 / 0px           الآخر
scrollY=1000  1.00 / 0px           both: فاضل ظاهر
~~~

ولو رجعت لفوق، الكارت بيختفي تاني: الحركة ماشية مع الـ scroll في الاتجاهين. ده الفرق عن IntersectionObserver اللي بيظهر مرة وخلاص.

### من غير دعم

شيلنا [[animation-timeline]] من كارت (زي ما متصفح مش فاهمه هيعمل): [[opacity]] طلعت [[1]] على طول. الكارت ظاهر في شكله النهائي، فمحتاجش [[@supports]].

## ٥. reduced motion

[[.card { animation: none; }]]: الكروت ظاهرة من غير حركة. قسناها مع reduce: [[opacity]] عند scrollY=500 = [[1]]. والشريط سبناه شغال: قسناه [[matrix(0.25, ...)]] مع reduce. هو مش حركة لوحده، بيتحرك بإيد المستخدم نفسه بالظبط، فمش بيعمل دوخة زي الـ parallax. لو موقعك فيه parallax حطه جنب [[.card]] في الـ media.

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[scroll(root block)]] | التقدّم = scroll الصفحة الرأسي |
| [[view()]] | التقدّم = مكان العنصر في الشاشة |
| [[animation-range]] | إمتى تبدأ وتخلص ([[entry]] و [[contain]] و [[exit]] و [[cover]]) |
| [[animation-timeline]] بعد [[animation]] | وإلا الـ shorthand يمسحه |
| [[@supports]] | للحاجات اللي شكلها النهائي غلط (الشريط) |
| [[:dir(rtl)]] | [[transform-origin]] مش logical |
| الدعم | Chrome و Edge 115، و Safari 26، و Firefox ورا flag (MDN) |`,
          lines: [
            R`حركة من عرض صفر لعرض كامل بـ [[scaleX]]، والـ compositor هو اللي بيمطّها.`,
            R`اللي جوه بيتطبق بس في متصفح فاهم [[animation-timeline]]، عشان الشريط ميبانش مليان غلط.`,
            R`شريط القراية اللي فوق الصفحة.`,
            R`ثابت في الشاشة مهما عملت scroll.`,
            R`لازق في أول الصفحة من فوق، بالـ logical.`,
            R`من الحافة للحافة في اتجاه السطر.`,
            R`خط رفيع ارتفاعه 4px بس، وبالـ logical عشان يمشي مع أي اتجاه كتابة.`,
            R`لونه لون البراند من التوكنز.`,
            R`بيكبر من الشمال في الإنجليزي.`,
            R`الحركة من غير مدة: [[linear]] عشان يمشي بسرعة الـ scroll، و [[both]] عشان يفضل على آخر قيمة.`,
            R`الوقت بقى scroll الصفحة الرأسي؛ ولازم ييجي بعد [[animation]] وإلا يتمسح.`,
            R`قفلة الشريط.`,
            R`في العربي بيكبر من اليمين، لأن [[transform-origin]] مش بيتقلب لوحده.`,
            R`قفلة الـ [[@supports]].`,
            R`الكارت بيبدأ شفاف ونازل 2rem وبيوصل ظاهر وفي مكانه.`,
            R`الكروت اللي هتظهر مع الـ scroll.`,
            R`نفس الحركة من غير مدة؛ في متصفح من غير دعم بتقفز لآخرها فالكارت يبان عادي.`,
            R`التقدّم = مكان الكارت في الشاشة، مش scroll الصفحة كلها.`,
            R`تبدأ أول ما الكارت يلمس تحت الشاشة، وتخلص بعد 30% من رحلته فيها.`,
            R`قفلة الكارت.`,
            R`لو المستخدم طالب حركة أقل من إعدادات النظام...`,
            R`...الكروت تبان على طول من غير حركة، والشريط فاضل لأنه بيتحرك بإيد المستخدم.`,
            R`قفلة الـ media.`
          ],
          sol: R`وانت نازل الشريط بيتملي بنفس النسبة اللي نزلتها: في نص الصفحة نصه مليان، وفي آخرها مليان كله، وفي العربي بيتملي من اليمين. والكروت كل واحد بيبدأ يظهر ويطلع أول ما يدخل من تحت، وبيكمّل لما يعدّي حوالي تلت الشاشة. ولو رجعت لفوق الكروت بتختفي تاني وتنزل.

لما بدّلت الترتيب ([[animation-timeline]] الأول): الشريط بقى مليان من أول الصفحة ومبيتحركش. الـ shorthand [[animation]] رجّع الـ timeline للوقت، والمدة صفر، فالحركة قفزت لآخرها.

لو مفيش أي حاجة بتتحرك: افتح الصفحة في Chrome أو Edge 115+ أو Safari 26+، و [[CSS.supports("animation-timeline: view()")]] في الكونسول لازم يرجّع [[true]]. ولو الشريط ثابت والكروت شغالة، غالبًا الصفحة مش هي اللي بتعمل scroll: فيه أب عليه [[overflow: auto]] و [[height: 100vh]]، فاستخدم [[scroll(nearest)]] أو انقل الـ scroll للصفحة.`,
          practice: [
            { lvl: 'سريع', t: R`**مسألة:** كارت ارتفاعه 300px بيبدأ عند 1500px من أول الصفحة، والشاشة ارتفاعها 700. بـ [[animation-range: entry 0% cover 50%]]، الحركة بتبدأ عند scrollY كام وبتخلص عند كام؟ احسب، وبعدين قيس بـ [[getComputedStyle(card).opacity]] عند الرقمين.`, done: R`البداية 800 (‏1500 − 700)، ورحلة cover ‏700 + 300 = 1000 ونصها 500، فالآخر عند 1300. والقياس: [[opacity]] صفر عند 800 وواحد عند 1300.`,
              sol: R`~~~html range.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>animation-range</title>
<style>
  body { margin: 0; }
  @keyframes show { from { opacity: 0; } to { opacity: 1; } }
  .card {
    position: absolute; inset-block-start: 1500px; inset-inline: 0; block-size: 300px;
    background: #bfdbfe;
    animation: show linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 50%;
  }
  .end { position: absolute; inset-block-start: 4000px; block-size: 1px; inline-size: 1px; }
</style></head>
<body>
  <main><h1>كارت</h1><div class="card" id="card">كارت</div><div class="end"></div></main>
</body></html>
~~~

الرحلة بتتحسب من مكان الكارت والشاشة:

- [[entry 0%]]: أول لحظة طرف الكارت العلوي يلمس أسفل الشاشة. الشاشة 700، والكارت عند 1500، فـ scrollY = ‏1500 − 700 = **800**.
- [[cover]]: من أول ما يدخل لحد ما يخرج خالص، يعني ارتفاع الشاشة + ارتفاع الكارت = ‏700 + 300 = 1000px.
- [[cover 50%]]: نص الرحلة، 500px بعد البداية: ‏800 + 500 = **1300**.

المهم إن كل [[%]] في الـ range من رحلته هو، مش من حجم الكارت.

الغلطة الشائعة: تفتكر [[entry 100%]] زي [[cover 50%]]. [[entry 100%]] معناها آخر الكارت دخل (800 + 300 = 1100)، و [[cover 50%]] معناها الكارت في نص الشاشة تقريبًا.

~~~text الناتج (Chrome 156، شاشة ارتفاعها 700)
scrollY = 800   opacity = 0.000
scrollY = 1050  opacity = 0.500
scrollY = 1300  opacity = 1.000
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[.hero-img { animation-timeline: view(); animation: zoom 1s ease-out both; }]] والصورة واقفة على آخر الحركة من غير ما تتحرك مع الـ scroll.`, done: R`بدّلت الترتيب فبقى [[animation]] الأول، والصورة بقت بتكبر مع الـ scroll، و [[img.getAnimations()[0].timeline]] بقى ViewTimeline مش DocumentTimeline. وعرفت إن الـ [[1s]] ملهاش لازمة هنا غير في المتصفح اللي مش بيدعم.`,
              sol: R`~~~css hero.css (بعد التصليح)
.hero-img {
  animation: zoom 1s ease-out both;  /* الـ shorthand الأول */
  animation-timeline: view();        /* وبعده الـ timeline */
}
@keyframes zoom { from { scale: 1; } to { scale: 1.3; } }
~~~

~~~html صفحة التجربة
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>hero</title>
<style>
  body { margin: 0; }
  .sp { block-size: 100vh; }
  .hero-img { display: block; inline-size: 300px; block-size: 200px; background: #93c5fd; }
  .hero-img { animation: zoom 1s ease-out both; animation-timeline: view(); }
  @keyframes zoom { from { scale: 1; } to { scale: 1.3; } }
</style></head>
<body>
  <main><h1>هيرو</h1><div class="sp"></div>
    <div class="hero-img" id="i" role="img" aria-label="صورة"></div>
    <div class="sp"></div><div class="sp"></div></main>
</body></html>
~~~

[[animation]] عبارة عن shorthand، وأي shorthand بيرجّع كل الخواص اللي تحته لقيمتها الافتراضية، و [[animation-timeline]] منهم (قيمته [[auto]]، يعني الوقت العادي). فلما كتبت [[animation-timeline: view()]] الأول، سطر [[animation]] اللي بعده مسحها، والحركة اشتغلت ثانية عادية ووقفت على آخرها.

بعد ما بدّلت الترتيب، الـ timeline هو اللي بيكسب. و [[1s]] ملهاش معنى هنا: الحركة مربوطة بالـ scroll مش بالوقت، بس خلّيها موجودة عشان أي متصفح مش بيدعم [[animation-timeline]] يعرض حركة عادية بدل ما يتجاهل الكل.

الغلطة الشائعة: تتحقق بعينك والصفحة واقفة. الـ [[timeline]] بيقولك الحقيقة: [[img.getAnimations()[0].timeline.constructor.name]].

~~~text الناتج (Chrome 156)
الترتيب الغلط:  timeline = DocumentTimeline، و scale عند scrollY 0 و 900 = 1.300 و 1.300
الترتيب الصح:   timeline = ViewTimeline، و scale عند scrollY 0 و 900 = 1.000 و 1.285
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** carousel أفقي بـ [[scroll-snap]] وتحته شريط تقدّم مربوط بالـ scroll الأفقي بتاعه: الـ carousel عليه [[scroll-timeline: --gallery inline]]، والأب المشترك عليه [[timeline-scope: --gallery]] عشان الشريط (أخوه مش ابنه) يقدر يستخدم [[animation-timeline: --gallery]].`, done: R`الشريط بيتملي وانت بتسحب الـ carousel بالماوس أو اللمس أو الأسهم، ومبيتأثرش بـ scroll الصفحة، وفي العربي بيتملي من اليمين، ومن غير [[timeline-scope]] الشريط مبيتحركش (جرّبت وشفت).`,
              sol: R`~~~html gallery.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>شريط تقدم</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 1rem; }
  .gallery { timeline-scope: --gallery; max-inline-size: 30rem; }
  .track {
    display: flex; gap: 1rem; overflow-x: auto; padding-block-end: .5rem;
    scroll-snap-type: x mandatory;
    scroll-timeline: --gallery inline;
  }
  .track > * { flex: 0 0 80%; block-size: 160px; scroll-snap-align: start;
    background: #bfdbfe; display: grid; place-items: center; border-radius: 10px; }
  .bar { block-size: 6px; background: #e5e7eb; margin-block-start: .5rem; }
  .bar i {
    display: block; block-size: 100%; background: #1d4ed8;
    transform-origin: inline-start;
    animation: fill linear both;
    animation-timeline: --gallery;
  }
  .bar i:dir(rtl) { transform-origin: right; }
  @keyframes fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
</style></head>
<body>
  <main><h1>الصور</h1>
    <section class="gallery" aria-label="معرض">
      <div class="track" id="t" tabindex="0" role="group" aria-label="الشرايح">
        <article>١</article><article>٢</article><article>٣</article><article>٤</article>
      </div>
      <div class="bar"><i id="b"></i></div>
    </section>
    <div style="block-size: 200vh"></div>
  </main>
</body></html>
~~~

الشريط أخو الـ carousel مش ابنه، و [[scroll-timeline]] بيتشاف من الأولاد بس. [[timeline-scope: --gallery]] على الأب المشترك بيرفع الاسم لفوق، فأي حد جوه الأب يقدر يستخدمه. والترتيب:

1. [[.track]] بيعرّف الـ timeline بالاسم على المحور الأفقي ([[inline]]).
2. [[.gallery]] بيوسّع مدى الاسم.
3. [[.bar i]] بيربط حركته بيه بـ [[animation-timeline: --gallery]].

[[transform-origin: right]] في العربي عشان الشريط يتملي من اليمين، لأن [[transform-origin]] مبيقبلش قيم logical. و [[tabindex="0"]] عشان الأسهم تحرّك الـ carousel من الكيبورد.

الغلطة الشائعة: تكتب [[--gallery]] على الـ carousel والشريط وتتوقع إنهم يتقابلوا. من غير [[timeline-scope]] الاسم مش بيتلاقي ومفيش error: الحركة بتبقى من غير timeline فالـ keyframes مبتتطبقش خالص، والشريط بيفضل مليان 100% مهما عملت scroll. يعني لو شفت شريط مليان وثابت، دوّر على الاسم.

~~~text الناتج (Chrome 156، scale الشريط)
scrollLeft = 0            scale = 0.000
نص الـ carousel           scale = 0.500
آخر الـ carousel          scale = 1.000
scroll الصفحة 500px       scale لسه = 1.000
من غير timeline-scope: أول الـ carousel scale = 1.000، وآخره scale = 1.000 (مبيتحركش)
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شريط القراية مرتين: مرة بـ [[animation-timeline]]، ومرة بـ JavaScript ([[scroll]] listener بيحسب النسبة ويكتبها في [[--p]] جوه [[requestAnimationFrame]]). شغّل Performance مع CPU 4x slowdown وانت بتعمل scroll، وفي الكونسول شغّل loop تقيل ثانيتين في النص.`, done: R`جدول: عدد سطور كل نسخة، ووقت الـ Scripting في كل frame، وإيه اللي حصل وقت الـ loop التقيل (نسخة JavaScript الشريط وقف لحد ما الـ loop خلص، ونسخة CSS كملت أو اتأثرت أقل، اكتب اللي شفته فعلًا عندك).`,
              sol: R`~~~html progress-css.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>شريط القراية</title>
<style>
  body { margin: 0; }
  article { block-size: 500vh; padding: 1rem; }
  .bar {
    position: fixed; inset: 0 0 auto; block-size: 6px; background: #1d4ed8;
    transform-origin: right;
    animation: grow linear both;
    animation-timeline: scroll(root block);
  }
  @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
</style></head>
<body>
  <div class="bar" id="b"></div>
  <main><h1>مقال</h1><article>نص طويل</article></main>
</body></html>
~~~

~~~js نسخة JavaScript (بدل الـ animation، و .bar عليه transform: scaleX(var(--p, 0)))
let queued = false;
addEventListener("scroll", () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    b.style.setProperty("--p", scrollY / max);
    queued = false;
  });
}, { passive: true });
~~~

نسخة CSS ٣ سطور وبتشتغل على الـ compositor: الـ scroll نفسه بيتعمل هناك، والحركة مربوطة بيه من غير ما الـ main thread يتدخل. نسخة JavaScript محتاجة listener و [[requestAnimationFrame]] وحساب، وكل ده على الـ main thread، فأي شغل تقيل بيوقّف الشريط.

[[{ passive: true }]] بيقول للمتصفح إنك مش هتعمل [[preventDefault]]، فالـ scroll ميستناش الكود. و [[queued]] بيمنع إنك تكتب أكتر من مرة في الـ frame الواحد.

الغلطة الشائعة: تحكم من رقم واحد. جزء Scripting اتقاس بالـ trace تحت. أما جزء الـ loop التقيل فشوفه بعينك: افتح الصفحة في Chrome عادي، وفي الكونسول شغّل [[setTimeout(() => { const t = performance.now(); while (performance.now() - t < 2000); }, 3000)]]، وأثناء الثلاث ثواني اعمل scroll بالعجلة. مقدرناش نقيسه أوتوماتيك: أي screenshot من أدوات الأتمتة بيستنى الـ main thread (استنى 2.2 ثانية)، فبيطلع نفس الرقم للنسختين، ده قيد في الأداة مش نتيجة.

~~~text الناتج (Chrome 156، CPU × 4، trace أثناء 40 خطوة scroll)
النسخة       سطور المنطق   وقت Scripting الكلي
CSS          3             0.0ms
JavaScript   9             16.9ms
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** parallax لهيرو بـ ٣ طبقات (سما، وجبال، وأرض) كل طبقة بتتحرك بـ [[translate]] بسرعة مختلفة مع [[view()]] على الهيرو نفسه و [[animation-range: exit]]، ومع reduce كلهم ثابتين، ومن غير دعم الهيرو شكله كامل وسليم.`, done: R`وانت نازل الطبقة البعيدة أبطأ من القريبة، ومفيش layout shift ولا فراغ بيبان على الأطراف، و reduce بيوقّفهم كلهم، و [[@supports not (animation-timeline: view())]] (أو تجربة في متصفح من غير دعم) الهيرو ثابت ومش ناقص حاجة.`,
              sol: R`~~~html parallax.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>parallax</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  .hero { position: relative; block-size: 100vh; overflow: clip; background: #bae6fd; }
  .layer { position: absolute; inset-inline: 0; inset-block-end: -10vh; }
  .sky      { block-size: 120vh; background: linear-gradient(#7dd3fc, #e0f2fe); }
  .mountain { block-size: 70vh; background: #64748b; clip-path: polygon(0 100%, 30% 20%, 55% 70%, 80% 10%, 100% 100%); }
  .ground   { block-size: 35vh; background: #166534; }
  h1 { position: relative; text-align: center; padding-block-start: 20vh; margin: 0; }
  .after { block-size: 150vh; padding: 1rem; }

  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .layer {
        animation: drift linear both;
        animation-timeline: --hero;
        animation-range: exit;
      }
      .hero { view-timeline-name: --hero; }
      .sky      { --d: 30vh; }
      .mountain { --d: 15vh; }
      .ground   { --d: 4vh; }
    }
  }
  @keyframes drift { to { translate: 0 var(--d); } }
</style></head>
<body>
  <main>
    <section class="hero">
      <div class="layer sky"></div><div class="layer mountain"></div><div class="layer ground"></div>
      <h1>رحلة للجبل</h1>
    </section>
    <section class="after"><h2>التفاصيل</h2><p>باقي الصفحة.</p></section>
  </main>
</body></html>
~~~

وانت نازل، الطبقة اللي بتتحرك **لتحت** أسرع هي اللي بتتحسب بعيدة، لأنها بتفضل قدامك وقت أطول: الصفحة طالعة لفوق، والطبقة نازلة عكسها، فسرعتها الظاهرة أقل. فالسما [[30vh]] (أبعد حاجة وأبطأ في الظاهر)، والأرض [[4vh]] (أقرب حاجة وماشية مع الصفحة تقريبًا).

- [[view-timeline-name: --hero]] هو [[view()]] بس باسم: نفس الـ view timeline على الهيرو، والاسم بيخلّي الطبقات اللي جواه تقراه، فالتلاتة بيتحركوا حسب مكان الهيرو نفسه، مش حسب مكان كل طبقة.
- [[animation-range: exit]] بيشغّل الحركة بس وهو خارج من الشاشة، فهو كامل وثابت أول ما تفتح.
- [[inset-block-end: -10vh]] بيطوّل الطبقات تحت، عشان لما تنزل ميبانش فراغ على الطرف.
- [[translate]] خاصية compositor فمفيش layout shift، و [[overflow: clip]] بيقص اللي طالع من غير ما يعمل scroll container.
- كل الحركة جوه [[@supports]] و [[prefers-reduced-motion: no-preference]]، فمن غير دعم أو مع reduce مفيش سطر واحد بيشتغل، والهيرو ثابت وكامل.

الغلطة الشائعة: [[animation-timeline: view()]] على كل طبقة: كل واحدة هتحسب رحلتها هي، فالطبقات الأطول تتحرك في وقت مختلف.

~~~text الناتج (Chrome 156، شاشة 800، ‏scrollY = 400)
translate في الوضع العادي: سما 0px 120px، جبال 0px 60px، أرض 0px 16px
نفس النقطة مع reduce: عدد الحركات 0
بعد إلغاء الدعم بـ CSS (@supports not): عدد الحركات 0، والـ h1 ظاهر true
layout shift أثناء الـ scroll: 0
scrollWidth − clientWidth: 0
axe: 0
~~~` },
          ],
        },
        {
          cmd: "meta و Open Graph",
          title: "شكل صفحتك في جوجل وفي واتساب",
          practice: [
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** سكربت Node بياخد URL لصفحة من موقعك، ويجيب الـ HTML بـ [[fetch]]، ويطلّع title و description و canonical وكل [[og:*]]، ويطبع تحذير لو title أطول من 60 حرف أو description أطول من 160 أو [[og:image]] مش URL كامل.`, done: R`على صفحتك بيطبع جدول بالقيم والتحذيرات، وعلى صفحة من غير tags بيقول «ناقص» لكل واحد، و URL غلط بيطبع رسالة مفهومة.`,
              sol: R`~~~js meta-check.mjs
const url = process.argv[2];
if (!url) { console.error("اكتب الرابط: node meta-check.mjs http://..."); process.exit(1); }

let html;
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
  html = await res.text();
} catch (e) {
  console.error($__btمقدرتش أجيب الصفحة: $__{e.message}$__bt);
  process.exit(1);
}

const attr = (tag, name) => tag.match(new RegExp($__bt$__{name}=["']([^"']*)["']$__bt, "i"))?.[1];
const tags = html.match(/<(meta|link)\b[^>]*>/gi) ?? [];
const metas = tags.map(t => ({ key: attr(t, "property") ?? attr(t, "name") ?? attr(t, "rel"), val: attr(t, "content") ?? attr(t, "href") }));
const get = k => metas.find(m => m.key === k)?.val;

const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
const row = { title, description: get("description"), canonical: get("canonical") };
for (const k of ["og:title", "og:description", "og:image", "og:url", "og:type"]) row[k] = get(k);

for (const [k, v] of Object.entries(row)) console.log(k.padEnd(14), v ?? "ناقص");

const warn = [];
if (title?.length > 60) warn.push($__bttitle طوله $__{title.length} (أطول من 60)$__bt);
if (row.description?.length > 160) warn.push($__btdescription طوله $__{row.description.length} (أطول من 160)$__bt);
if (row["og:image"] && !/^https?:\/\//.test(row["og:image"])) warn.push("og:image مش URL كامل");
warn.forEach(w => console.log("تحذير:", w));
~~~

[[fetch]] موجود في Node من غير مكتبات. الكود جوه [[try/catch]] عشان أي دومين غلط أو رد 404 يطبع جملة مفهومة بدل stack trace، و [[process.exit(1)]] عشان أي سكربت تاني يعرف إنه فشل.

[[attr]] بتطلّع قيمة attribute من نص الـ tag، بغض النظر عن ترتيب [[property]] و [[content]]. [[tags.map]] بيوحّد [[meta name]] و [[meta property]] و [[link rel]] في شكل واحد، فـ [[get("canonical")]] و [[get("og:image")]] بيشتغلوا بنفس الطريقة. و [[v ?? "ناقص"]] بيطبع الكلمة لو القيمة مش موجودة خالص.

الغلطة الشائعة: regex واحدة متوقعة [[property]] قبل [[content]]. مواقع كتير بتكتبهم بالعكس، فلازم تفصل الـ tag الأول وبعدين تطلّع كل attribute لوحده. ولو الصفحة بتتبني بـ JavaScript في المتصفح فالـ [[fetch]] مش هيشوف الـ tags، ولا فيسبوك هيشوفها.

~~~text الناتج (على صفحات تجربة بسيرفر محلي)
title          كورس كورس كورس كورس كورس كورس كورس كورس كورس كورس كورس كورس كورس كورس
description    كورس React من الصفر
canonical      https://shop.example/courses/react
og:title       كورس React
og:description ناقص
og:image       /og.png
og:url         ناقص
og:type        ناقص
تحذير: title طوله 69 (أطول من 60)
تحذير: og:image مش URL كامل
~~~

~~~text صفحة من غير tags
title          x
description    ناقص
canonical      ناقص
og:title       ناقص
og:description ناقص
og:image       ناقص
og:url         ناقص
og:type        ناقص
~~~

~~~text رابط غلط
مقدرتش أجيب الصفحة: HTTP 404
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** اللينك على واتساب طالع من غير صورة. الكود فيه [[<meta property="og:image" content="/og.png">]] والصورة PNG حجمها 3MB ومقاسها 4000×4000.`, done: R`الـ URL بقى كامل بـ https، والصورة 1200×630 وحجمها صغير، وأداة معاينة (Sharing Debugger أو opengraph.xyz) بتعرض الكارت بالصورة بعد «Scrape again».`,
              sol: R`~~~html الـ head بعد التصليح
<meta property="og:title" content="كورس React">
<meta property="og:description" content="من الصفر لأول مشروع حقيقي">
<meta property="og:image" content="https://shop.example/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="غلاف كورس React">
<meta property="og:url" content="https://shop.example/courses/react">
<meta property="og:type" content="website">
~~~

~~~js make-og.mjs (يحوّل الغلاف لـ 1200×630 بكروم)
import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent($__bt<body style="margin:0;display:grid;place-items:center;height:630px;
  background:#1d4ed8;color:#fff;font:700 72px system-ui" dir="rtl">كورس React</body>$__bt);
await p.screenshot({ path: "og.jpg", type: "jpeg", quality: 80 });
await b.close();
~~~

٣ مشاكل مع بعض، وأول واحدة هي اللي بتقتل الصورة:

1. [[/og.png]] مسار نسبي. الكراولر بتاع واتساب وفيسبوك بيقرا القيمة زي ما هي وعايزها URL كامل بـ [[https://]]، ومبيكمّلهاش من الدومين.
2. ‏3MB تقيلة: واتساب ممكن يتجاهل الصور الكبيرة (مفيش رقم رسمي ثابت، بس المتفق عليه أقل من 300KB–600KB).
3. ‏4000×4000 مربعة ومش النسبة المتوقعة. ‏1200×630 هو المقاس اللي Facebook بيوصي بيه ونسبته 1.91:1.

و [[og:image:width]] و [[height]] بيخلّوا المعاينة تترسم من أول مرة من غير ما الكراولر يحمّل الصورة الأول، و [[og:image:alt]] لقارئ الشاشة.

الغلطة الشائعة: تعدّل الصورة وتبعت اللينك تاني وتلاقيه لسه من غير صورة، فتفتكر إن التصليح مش شغال. الكراولرات بتعمل cache، فلازم «Scrape Again» في Sharing Debugger، أو جرّب برابط فيه [[?v=2]].

الـ Sharing Debugger محتاج صفحة منشورة على دومين حقيقي، فالخطوة دي من وثائق Meta ومتجربتش هنا. اللي اتجرّب هو توليد الصورة وقياسها.

~~~text الناتج (make-og.mjs، اتقرا من الملف)
المقاس: 1200×630
الحجم: 12.4KB (بدل 3MB)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** JSON-LD لصفحة كورس في [[<script type="application/ld+json">]] من object في JavaScript، وقبل ما تحطه حوّل كل [[<]] لـ [[\u003c]]. جرّب وصف فيه [[</script><script>alert(1)</script>]].`, done: R`Rich Results Test بيقرا الـ Course من غير errors، ومع الوصف الخبيث الصفحة مبتتكسرش ومفيش alert، ومن غير التحويل الـ script بيتقفل بدري (جرّبتها وشفت المشكلة).`,
              sol: R`~~~html course-ld.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كورس React</title></head>
<body>
  <main><h1>كورس React</h1></main>
  <script type="module">
    const course = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "كورس React",
      description: "$__lt/script><script>alert(1)$__lt/script>",
      provider: { "@type": "Organization", name: "أكاديمية حبّة" },
    };
    // الخطوة المهمة: بعد JSON.stringify، كل < بتتكتب كـ escape جوه الـ JSON
    const safe = JSON.stringify(course).replaceAll("<", "\u003c");
    window.jsonLd = $__bt<script type="application/ld+json">$__{safe}<\/script>$__bt;
    console.log(window.jsonLd);
  $__lt/script>
</body></html>
~~~

المشكلة في السيرفر اللي بيكتب الـ JSON جوه الـ HTML: الـ HTML parser مبيعرفش JSON، وأول [[$__lt/script>]] يقابله بيقفل الـ tag، حتى لو جوه نص. فلو الوصف جاي من مستخدم، أي حد يقدر يكتب سكربت بتاعه في الصفحة (Stored XSS).

[[replaceAll("<", ...)]] بيبدّل [[<]] بـ escape مكتوب كـ [[\u003c]]: ده JSON صحيح، و [[JSON.parse]] بيرجّعه [[<]] لما يتقري، بس الـ HTML parser مش شايف [[<]] خالص فمفيش [[$__lt/script>]]. جوجل بيقرا القيمة السليمة، والصفحة مبتتكسرش.

الغلطة الشائعة: [[encodeURIComponent]] أو تحويل لـ [[&lt;]]. الاتنين بيغيّروا النص نفسه، فجوجل هيقرا [[&lt;]] حرفيًا لأن جوه [[script]] الـ HTML entities مبتتفكش.

Rich Results Test محتاج صفحة أو كود بيتلزق في موقع جوجل، فالخطوة دي من الوثائق ومتجربتش هنا.

~~~text الناتج (Chrome 156، نفس الـ JSON اتكتب في HTML من السيرفر)
من غير escape:  عدد الـ alert = 1، والـ JSON اتقص: JSON.parse فشل
بعد escape:     عدد الـ alert = 0، و JSON.parse نجح، والوصف رجع: $__lt/script><script>alert(1)$__lt/script>
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة [[/courses/react?utm_source=x]] فيها canonical لـ [[/courses/react]]، وصفحة تانية فيها [[<meta name="robots" content="noindex">]] و canonical لنفسها، ونسخة عربي فيها hreflang للإنجليزي والإنجليزي مفيهاش hreflang للعربي. إيه اللي هيحصل في جوجل لكل واحدة؟`, done: R`الأولى بتتحسب صفحة واحدة مع الأصل، والتانية مش هتظهر (noindex بيكسب ووجود الاتنين رسالة متلخبطة)، والتالتة hreflang ممكن يتجاهل لأنه لازم يبقى في الاتجاهين. واتأكدت من وثائق Google Search Central.`,
              sol: R`~~~text الإجابة
الصفحة ١  /courses/react?utm_source=x  عليها canonical لـ /courses/react
          جوجل بيجمّع الإشارات على الرابط النضيف، ويعتبرهم صفحة واحدة.
          (canonical «إشارة قوية» مش أمر، بس هنا كل حاجة متفقة.)

الصفحة ٢  noindex و canonical لنفسها
          مش هتظهر في النتايج: noindex بيكسب.
          الاتنين مع بعض رسالة متلخبطة: canonical بيقول «دي الأصل»، و noindex بيقول «متفهرسهاش».

الصفحة ٣  عربي عليها hreflang للإنجليزي، والإنجليزي مفيهاش رجوع
          جوجل ممكن يتجاهل الـ hreflang ده: لازم يكون في الاتجاهين.
~~~

القاعدة وراء التلاتة: الـ tags دي توجيهات مش أوامر، وجوجل بيثق فيها لما تتفق مع بعض:

- [[canonical]] بتقول «دي النسخة اللي تتحسب»، عشان رابط فيه [[utm_source]] ميتحسبش صفحة مكررة.
- [[noindex]] بتقول «متحطهاش في النتايج». ولو حاطط [[noindex]] في صفحة، متحطش canonical لصفحة تانية كمان: الجوجل بيحذر من الجمع بينهم.
- [[hreflang]] لازم تأكيد من الناحيتين: كل نسخة تشاور على التانية وعلى نفسها، عشان أي موقع مقدرش يدّعي إنه ترجمة لموقعك.

الغلطة الشائعة: تحط [[noindex]] في صفحة ممنوعة في [[robots.txt]]. جوجل مبيقدرش يقرا الصفحة أصلًا، فمش هيشوف الـ [[noindex]]، وممكن تفضل ظاهرة في النتايج بالرابط بس.

الإجابات دي من وثائق Google Search Central (Consolidate duplicate URLs، و Block search indexing with noindex، و Localized versions of your pages)، لأن سلوك فهرسة جوجل مبيتجرّبش على الجهاز.

~~~text الناتج
١: صفحة واحدة في الفهرس  ٢: مش ظاهرة  ٣: الـ hreflang ممكن يتجاهل
~~~` },
          ],
          desc: R`[[<title>]] و [[<meta name="description">]] هما اللي بيظهروا في نتيجة جوجل. و [[<link rel="canonical">]] بيقول مين النسخة الأصلية من الصفحة. و Open Graph ([[og:title]] و [[og:image]]...) هو شكل الكارت لما حد يبعت اللينك على واتساب أو فيسبوك أو لينكدإن.

ومع ده الـ HTML نفسه: [[h1]] واحد واضح، وعناوين بالترتيب، و [[alt]] للصور، ولينكات حقيقية ([[<a href>]]) عشان جوجل يمشي فيها.`,
          example: R`<title>كورس React من الصفر | myapp</title>
<meta name="description" content="اتعلم React بمشاريع حقيقية: hooks و state و Next.js. 40 درس بالعربي.">
<link rel="canonical" href="https://example.com/courses/react">
<link rel="alternate" hreflang="en" href="https://example.com/en/courses/react">
<meta property="og:title" content="كورس React من الصفر">
<meta property="og:description" content="40 درس بالعربي بمشاريع حقيقية.">
<meta property="og:image" content="https://example.com/og/react.png">
<meta property="og:url" content="https://example.com/courses/react">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">`,
          try: R`اعمل deploy لصفحة فيها الـ tags دي وابعت اللينك لنفسك على واتساب، أو جرّبها في أي أداة OG preview. وفي Next.js افتح View Source وشوف الـ tags اللي اتولدت من [[metadata]].`,
          flag: "script",
          deep: {
            why: "جوجل بيقرا الـ HTML، مش بيشوف التصميم. والعنوان والوصف هما إعلانك المجاني في نتايج البحث. ومواقع كتير أغلب زوارها جايين من لينكات بتتبعت في واتساب والجروبات: لينك من غير صورة وعنوان شكله spam ومحدش بيدوس عليه.",
            how: R`جوجل بيعمل crawl: بيجيب الـ HTML (وبيشغّل JavaScript بس متأخر وبموارد محدودة)، فأهم حاجة المحتوى والـ meta يبقوا في الـ HTML الجاي من السيرفر، ودي ميزة الـ SSR والـ SSG في Next. وبيفهم الصفحة من الـ title والعناوين والكلام واللينكات الداخلية. و [[<a href>]] هو الطريقة المضمونة إنه يلاقي صفحاتك، مش [[onClick={() => router.push(...)}]].

الـ canonical بيحل مشكلة المحتوى المكرر: نفس الصفحة على [[/products?sort=price]] و [[/products]]. و [[hreflang]] بيربط نسخ اللغات ببعض، فكل مستخدم يشوف لغته في النتايج.

Open Graph بروتوكول من فيسبوك بقى standard: أي تطبيق بيعمل preview للينك (واتساب، وتليجرام، وسلاك، ولينكدإن) بيجيب الصفحة ويقرا [[og:*]]. الصورة لازم URL كامل (https)، ومقاسها حوالي 1200×630، وحجمها صغير. والتطبيقات بتعمل cache، فلو غيّرت الصورة ممكن تستنى أو تعيد الـ scrape.

في Next.js App Router مش بتكتب الـ tags دي بإيدك: [[export const metadata]] فيه [[title]] و [[description]] و [[openGraph]] و [[alternates]] (للـ canonical والـ languages)، أو [[generateMetadata]] للصفحات الديناميكية، وملف [[opengraph-image.tsx]] بيولّد الصورة بالكود. التفاصيل في تاب Next.js.`,
            when: R`كل صفحة عامة: الرئيسية، والمنتجات، والمقالات. صفحات الداشبورد والحساب مش محتاجاها، وبتاخد [[noindex]].`,
            mistakes: R`نفس الـ title والـ description في كل الصفحات. [[og:image]] بمسار نسبي ([[/og.png]]) فمش بتظهر. محتوى مهم بيتحمّل بـ JavaScript بس بعد الـ render. و h1 للوجو في كل صفحة والعنوان الحقيقي h2. وفي مشروع حقيقي الموقع كان بلغتين والـ metadata بتتجاب من ملفات الترجمة لكل locale، ودا صح، بس كان ناقصه [[alternates.languages]] (الـ hreflang) و [[openGraph]]، فجوجل مش رابط النسختين واللينك على واتساب من غير صورة.`
          },
          teach: R`## 10 سطور في الـ head محدش بيشوفها في الصفحة

السطور دي مبتظهرش جوه الصفحة. قارئها جوجل وواتساب وفيسبوك وX: بيجيبوا الـ HTML ويطلّعوا منه العنوان والوصف والصورة. حطيناهم في صفحة وفتحناها في Chrome: [[document.title]] بقى «كورس React من الصفر | myapp» (وده اللي في التاب)، والمتصفح مطلبش أي حاجة غير الصفحة نفسها، لا الصورة ولا الـ canonical. يعني دول معلومات للي بيقرا الـ HTML، مش للمتصفح. أما شكل الكارت في واتساب وجوجل فمن الـ docs بتاعتهم (محتاج صفحة منشورة على الإنترنت).

---

## ١. البحث (جوجل)

### [[<title>كورس React من الصفر | myapp</title>]]

العنوان في تاب المتصفح، وهو العنوان الأزرق في نتيجة جوجل. الكلمة المهمة الأول واسم الموقع في الآخر، عشان لو اتقص يتقص اسم الموقع. طوله هنا 27 حرف (قسناه بـ [[document.title.length]])، وجوجل بيقص اللي أطول من حوالي 60 حرف (بالعرض فعليًا، مش بالعدد).

### [[<meta name="description" content="...">]]

- [[<meta>]]: tag معلومات، ملوش قفلة.
- [[name="description"]]: نوع المعلومة، و [[content]]: قيمتها.
- ده الكلام الرمادي تحت العنوان في جوجل (لو جوجل اختاره، ممكن ياخد جملة من الصفحة بدله). هنا 68 حرف، والمعتاد لحد حوالي 150.

### [[<link rel="canonical" href="https://example.com/courses/react">]]

[[canonical]] = «النسخة الأصلية». لو نفس الصفحة بتفتح من [[?utm_source=...]] أو [[?sort=...]]، جوجل يحسبهم كلهم الصفحة دي وميقسّمش الترتيب عليهم. والـ URL كامل بـ https.

### [[<link rel="alternate" hreflang="en" href="...">]]

- [[alternate]]: نسخة تانية من نفس الصفحة.
- [[hreflang="en"]]: لغتها إنجليزي. فجوجل يعرض النسخة الإنجليزي للي بيدوّر بالإنجليزي. وكل نسخة المفروض تشاور على التانية.

---

## ٢. المشاركة (Open Graph)

الـ tags اللي بتبدأ بـ [[og:]] بتتكتب بـ [[property]] مش [[name]] (ده اللي البروتوكول بيطلبه). قرأناهم من الصفحة:

~~~text اتقرا في Chrome
og:title=كورس React من الصفر
og:description=40 درس بالعربي بمشاريع حقيقية.
og:image=https://example.com/og/react.png
og:url=https://example.com/courses/react
og:type=website
~~~

| الـ tag | بيظهر فين في الكارت |
|---|---|
| [[og:title]] | العنوان التقيل (من غير اسم الموقع: الدومين بيظهر لوحده) |
| [[og:description]] | سطر تحت العنوان، أقصر من وصف جوجل |
| [[og:image]] | الصورة الكبيرة، حوالي 1200×630، و URL كامل |
| [[og:url]] | الرابط الأصلي، زي canonical |
| [[og:type]] | نوع المحتوى: [[website]] أو [[article]]... |

ليه [[og:image]] لازم URL كامل؟ لأن سيرفر واتساب هو اللي بيجيب الصورة، مش المتصفح بتاعك، ومسار زي [[/og/react.png]] ملوش معنى عنده.

## ٣. X (تويتر)

### [[<meta name="twitter:card" content="summary_large_image">]]

نوع الكارت في X: [[summary_large_image]] = صورة كبيرة بعرض البوست (البديل [[summary]] = صورة صغيرة على جنب). العنوان والوصف والصورة بياخدهم من [[og:*]] لو مفيش [[twitter:title]] وأخواتها (من الـ docs بتاعة X).

---

## الملخص

| السطر | للمين | اتقاس |
|---|---|---|
| [[<title>]] | التاب وجوجل | [[document.title]] = 27 حرف |
| [[description]] | جوجل | 68 حرف |
| [[canonical]] | جوجل | مش request |
| [[hreflang]] | جوجل | مش request |
| [[og:*]] | واتساب وفيسبوك ولينكدإن وتليجرام | 5 tags، والصورة مش بتتحمّل في المتصفح |
| [[twitter:card]] | X | |

## الخلاصة

- العنوان والوصف لكل صفحة مختلفين: ده إعلانك في جوجل.
- [[og:image]] URL كامل بـ https، حوالي 1200×630.
- الـ tags لازم تبقى في الـ HTML اللي جاي من السيرفر (SSR أو SSG)، لأن البوتات اللي بتعمل preview (واتساب وفيسبوك) بتقرا الـ HTML ومبتستناش JavaScript.
- في Next.js بتكتبها في [[metadata]] وهو بيطلّعها.`,
          lines: [
            "العنوان في التاب وفي جوجل: الكلمة المهمة الأول، وحوالي 60 حرف عشان ميتقصّش.",
            "الوصف تحت العنوان في جوجل: مش بيأثر على الترتيب مباشرة، بس بيأثر على الضغط. حوالي 150 حرف.",
            R`الـ URL الأصلي: لو الصفحة ليها أكتر من رابط ([[?utm=...]] مثلًا)، جوجل يحسبهم صفحة واحدة.`,
            "النسخة الإنجليزي من نفس الصفحة، لموقع بلغتين.",
            "عنوان الكارت في واتساب وفيسبوك.",
            R`وصف قصير تحت العنوان في الكارت، وممكن يبقى غير الـ description بتاع جوجل.`,
            "صورة الكارت: حوالي 1200×630، و URL كامل مش نسبي.",
            R`الرابط الأصلي للصفحة، فكل المشاركات تتحسب على رابط واحد مش على كل نسخة بـ utm.`,
            R`نوع المحتوى: [[website]] لأي صفحة عادية، و [[article]] لمقال (وساعتها فيه tags زي وقت النشر).`,
            "في X (تويتر): كارت بصورة كبيرة، والباقي بياخده من og لو مفيش tags خاصة بيه."
          ],
          sol: R`على واتساب: اللينك بيطلع تحته كارت فيه الصورة من [[og:image]] (كبيرة بعرض الرسالة)، والعنوان «كورس React من الصفر» من [[og:title]] (مش من الـ [[<title>]])، والوصف «40 درس بالعربي بمشاريع حقيقية»، واسم الدومين. أدوات الـ preview (زي opengraph.xyz أو Facebook Sharing Debugger) بتوريك نفس الكلام وبتقولك لو فيه tag ناقص.

في Next.js، [[View Source]] لصفحة عاملة [[export const metadata]] بـ [[title]] و [[description]] و [[openGraph]] و [[alternates.canonical]]: هتلاقي [[<title>]] و [[<meta name="description">]] و [[<meta property="og:title">]] وأخواتها و [[<link rel="canonical">]] متولدين في الـ HTML نفسه. (في Next 15.2 وأحدث، الصفحات الـ dynamic ممكن تبعت الـ metadata متأخرة في الـ stream للمتصفحات العادية، بس البوتات بتاخدها في الـ head، فمتقلقش لو لقيتها تحت.)

لو الصورة مظهرتش: [[og:image]] لازم تبقى URL كامل بـ https مش مسار زي [[/og.png]]، ومتاحة من غير login، ومش تقيلة. ولو عدّلت الـ tags والـ preview لسه قديم، واتساب وفيسبوك بيعملوا cache؛ جرّب اللينك بـ [[?v=2]] أو استخدم «Scrape Again» في Sharing Debugger.`
        }
      ]
    }
]);
