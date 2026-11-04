// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الصور والفيديو و SVG",
      l: 1,
      n: "صورة بتملا مكانها من غير ما تتمط، وصيغ حديثة بـ fallback، وفيديو و YouTube و SVG بيتصرفوا صح",
      projects: [
        { lvl: 'صغير', t: R`معرض صور مدينة متخيلة`, what: R`١٢ صورة بنسب مختلفة في شبكة auto-fit، كل واحدة [[aspect-ratio]] و [[object-fit: cover]] و [[width]] و [[height]] في الـ HTML و [[loading="lazy"]] (ما عدا أول صفين). من درس [[object-fit]].`, done: R`الشبكة مفيهاش قفزة وهي بتحمّل (Performance › Layout shifts فاضي أو قريب من صفر)، وكل الصور في الصف نفس الارتفاع، وعلى 360 مفيش scroll أفقي.` },
        { lvl: 'صغير', t: R`sprite أيقونات من ١٠`, what: R`ملف [[icons.svg]] فيه ١٠ [[<symbol>]] متنضّفين بـ svgo، وصفحة بتعرضهم بـ [[<use>]] بـ ٣ ألوان و ٣ مقاسات من غير ما تكرر أي path. من درس [[SVG]].`, done: R`تغيير [[color]] على الأب بيلوّن الأيقونات، والمقاسات 16 و 24 و 48 حادة، و grep على الصفحة مفيهوش أي [[<path]] برا الـ symbols.` },
        { lvl: 'متوسط', t: R`قبل وبعد لترميم صور قديمة`, what: R`سلايدر قبل وبعد: صورتين فوق بعض، والعليا [[clip-path: inset()]] من [[--pos]]، و range input شفاف للكيبورد واللمس، والصورة «قبل» [[filter: grayscale(.85) sepia(.25)]]، و [[touch-action: pan-y]] عشان الصفحة تفضل تعمل scroll على الموبايل. بيجمع [[object-fit]] و [[position: absolute]].`, done: R`الأسهم و Home و End بيحرّكوا الخط، والقيمة بتتقري لقارئ الشاشة ([[aria-valuetext]] زي «50٪»)، والسلايدر شغال في rtl من غير ما يتعكس غلط، وعلى 360 بتعمل scroll للصفحة وانت صباعك على الصورة.` },
        { lvl: 'متوسط', t: R`هيرو بـ art direction وفيديو بزرار إيقاف`, what: R`هيرو فيه [[<picture>]] بصورة عريضة للديسكتوب وطولية للموبايل بـ AVIF و WebP، وتحتها قسم فيه فيديو خلفية [[muted autoplay loop playsinline]] بزرار إيقاف ويحترم reduced motion، و YouTube facade. من دروس [[picture]] و [[video و iframe]].`, done: R`Network على 1280 و 390: ملف صورة واحد لكل مقاس، والـ iframe بتاع يوتيوب مش موجود قبل الضغط (٢ requests بس للـ facade)، وبعد الضغط الـ focus على الـ iframe، ومع reduce الفيديو واقف.` },
        { lvl: 'كبير', t: R`صفحة منتج سماعة متخيلة`, what: R`صفحة منتج كاملة: معرض صور (صورة كبيرة و thumbnails بـ [[object-fit]] والضغط بيبدّل)، و picture بصيغ حديثة للهيرو، وفيديو عرض بترجمة VTT عربي وإنجليزي، و YouTube facade لريفيو، وأيقونات sprite بـ currentColor، وتقييم بحلقة SVG، وكله في layout الوحدات اللي فاتت (grid و sticky للسعر). بيجمع الوحدة دي مع Flexbox و Grid و position.`, done: R`Lighthouse على موبايل: LCP أقل من 2.5 ثانية و CLS أقل من 0.1 (اكتب الأرقام)، والصورة الكبيرة [[fetchpriority="high"]] والباقي lazy، وكل صورة ليها alt مفيد أو [[alt=""]] لو زينة، والترجمة بتتغيّر من قايمة الفيديو، ومفيش scroll أفقي على 360، والصفحة شغالة لو JavaScript اتقفل (المعرض بيظهر أول صورة).`, ext: R`زوّد lightbox للصور بـ [[<dialog>]]، و zoom على الصورة الكبيرة بالماوس، وقارن LCP قبل وبعد [[fetchpriority]] على Slow 4G واكتب الفرق.` },
        { lvl: 'فكرة', t: R`mockup لوحة تحكم من غير ولا صورة`, what: R`اعمل «لقطة شاشة» لتطبيق متخيل جوه الهيرو بـ HTML و SVG بس: نافذة متصفح (٣ نقط وشريط عنوان)، و sidebar، وكروت أرقام، ورسم بياني [[<polyline>]]، و [[dir="ltr"]] على الأرقام. حاد على أي شاشة وبيتبدّل مع الثيم.`, done: R`الـ mockup مفيهوش ولا [[<img>]]، وبيتكبر من 360 لـ 1920 من غير ما يبوظ، وألوانه من CSS variables فلما تغيّر متغير بيتغيّر، وقارئ الشاشة بيقرا اسم واحد ليه ([[role="img"]] و [[aria-label]]).`, ext: R`حرّك الأرقام بـ count-up لما يظهر، وارسم الخط بـ [[stroke-dashoffset]]، واعمل نسخة dark، وقارن حجمها بلقطة PNG لنفس الشكل.` },
      ],
      items: [
        {
          cmd: "object-fit",
          title: "صورة الكارت تملا المكان من غير ما تتمط",
          desc: R`لما تدّي صورة عرض وارتفاع مش بنفس نسبتها، المتصفح بيمطّها. [[object-fit: cover]] بيخليها تملا المكان كله وتتقص من الأطراف، و [[contain]] بيخليها تبان كلها وتسيب فراغ (مناسب للّوجو وصور المنتجات اللي مينفعش حاجة منها تتقص).

و [[object-position]] بيحدد أنهي جزء يفضل باين لما تتقص: [[50% 20%]] يعني قريب من فوق، مفيد لصور الناس عشان الوش ميتقصش.

ومعاهم [[aspect-ratio]] عشان كل الكروت تبقى نفس الشكل مهما كانت الصور. وفي Tailwind: [[aspect-square]] و [[object-cover]] و [[object-top]].`,
          example: R`.card-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: 50% 20%;
}
.logo { width: 8rem; height: 4rem; object-fit: contain; }
<img class="card-img" src="/p/42.webp" width="800" height="600" alt="سماعة سودا">
<img className="aspect-square w-full object-cover object-top" src="/team/mona.webp" alt="منى، مديرة المبيعات" width="400" height="400" />
<div className="relative aspect-video"><Image src="/hero.webp" alt="" fill sizes="100vw" className="object-cover" /></div>`,
          try: R`حط صورة طولية (بورتريه) في صندوق [[aspect-ratio: 4 / 3]]، وفي DevTools غيّر [[object-fit]] بين [[fill]] و [[cover]] و [[contain]] و [[none]]. وبعدين مع cover غيّر [[object-position]] لـ [[top]] و [[bottom]] وشوف أنهي جزء بيختفي.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صورة بانوراما 1200 × 400 في صندوق 300 × 300. مع [[contain]]: الصورة هتترسم بمقاس كام، والفاضي فين وقد إيه؟ ومع [[cover]]: أنهي جزء هيتقص؟`, done: R`contain: الصورة 300 × 100 (صغرت لـ ربع)، وفاضي 100 فوق و 100 تحت. cover: الصورة اتكبّرت لـ 900 × 300 واتقص 300 من كل جنب، فالنص بس باين. وأكّدت بلقطة شاشة أو بلون أول وآخر سطر.`, sol: R`الحساب أولًا، وبعدين صفحة صغيرة تأكّده بلون أول وآخر الصورة.

~~~html predict.html
<!doctype html>
<meta charset="utf-8">
<title>contain و cover</title>
<style>
  img { display: block; width: 300px; height: 300px; margin-block-end: 1rem; background: #eee; }
</style>
<!-- بانوراما 1200×400: أخضر أول 300، وأزرق في النص، وأحمر آخر 300 -->
<img style="object-fit: contain" alt="contain" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'%3E%3Crect width='300' height='400' fill='green'/%3E%3Crect x='300' width='600' height='400' fill='blue'/%3E%3Crect x='900' width='300' height='400' fill='red'/%3E%3C/svg%3E">
<img style="object-fit: cover" alt="cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'%3E%3Crect width='300' height='400' fill='green'/%3E%3Crect x='300' width='600' height='400' fill='blue'/%3E%3Crect x='900' width='300' height='400' fill='red'/%3E%3C/svg%3E">
~~~

**contain:** المتصفح بيدوّر على أصغر تكبير يخلي الصورة كلها جوه الصندوق. العرض محتاج 300 ÷ 1200 = 0.25، والارتفاع محتاج 300 ÷ 400 = 0.75، فبياخد الأصغر (0.25). الصورة تبقى 300 × 100، والباقي من الارتفاع 200 يتقسم نصين: 100 فوق و 100 تحت.

**cover:** بياخد الأكبر (0.75) عشان الصندوق كله يتغطى. الصورة تبقى 900 × 300، والزيادة في العرض 600 تتقص نصين: 300 من كل جنب، لأن [[object-position]] الافتراضي [[50% 50%]].

**الغلطة الشائعة:** تفتكر إن cover «بيقص من تحت» زي ما بتشوف في الصور الطولية. القص دايمًا في الاتجاه الزايد: البانوراما زيادتها في العرض، فالأطراف هي اللي بتروح.

~~~text الناتج
                        contain                     cover
الصورة بعد التحجيم      300 × 100                   900 × 300
الفاضي أو المقصوص       100 فوق و 100 تحت          300 من كل جنب
لون (150, 50)           أبيض (خلفية)                أزرق
لون (150, 150)          أزرق                        أزرق
لون (2, 150)            أخضر (أول الصورة)           أزرق (الأخضر اتقص كله)
لون (297, 150)          أحمر (آخر الصورة)           أزرق (الأحمر اتقص كله)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة فريق لمكتبة متخيلة: ٨ كروت بصور مختلفة النسب (طولي وعرضي ومربع)، كل صورة [[aspect-ratio: 4 / 5]] و [[object-fit: cover]] و [[object-position: 50% 20%]]، والشبكة auto-fit.`, done: R`على 360 و 768 و 1280 كل الكروت في الصف نفس الارتفاع بالظبط (قيس [[height]] بتاع كل صورة)، ومفيش صورة متمطّطة، والوشوش باينة في الصور الطولية، ومفيش scroll أفقي.`, sol: R`~~~html team.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فريق مكتبة النور</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; background: #f4f1ea; color: #222; }
  .team { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr)); }
  .card { background: #fff; border-radius: .75rem; overflow: hidden; }
  .card img { display: block; width: 100%; height: auto;
              aspect-ratio: 4 / 5; object-fit: cover; object-position: 50% 20%; }
  .card h2 { margin: .5rem .75rem 0; font-size: 1rem; }
  .card p  { margin: 0 .75rem .75rem; color: #555; font-size: .875rem; }
</style>
</head>
<body>
<main>
<h1>فريق مكتبة النور</h1>
<ul class="team">
  <li class="card"><img data-size="600x900" width="600" height="900" alt="منى مبتسمة قدام رف كتب"><h2>منى</h2><p>مديرة المكتبة</p></li>
  <li class="card"><img data-size="900x600" width="900" height="600" alt="كريم ماسك كتاب"><h2>كريم</h2><p>الاستعارة</p></li>
  <li class="card"><img data-size="700x700" width="700" height="700" alt="سارة قدام الكمبيوتر"><h2>سارة</h2><p>الفهرسة</p></li>
  <li class="card"><img data-size="500x1000" width="500" height="1000" alt="عمر واقف على سلم الرفوف"><h2>عمر</h2><p>الرفوف</p></li>
  <li class="card"><img data-size="1200x500" width="1200" height="500" alt="هبة بتقرا للأطفال"><h2>هبة</h2><p>ركن الأطفال</p></li>
  <li class="card"><img data-size="800x800" width="800" height="800" alt="ياسر جنب ماكينة التصوير"><h2>ياسر</h2><p>النسخ</p></li>
  <li class="card"><img data-size="640x960" width="640" height="960" alt="نورا ماسكة صندوق كتب"><h2>نورا</h2><p>المشتريات</p></li>
  <li class="card"><img data-size="1000x700" width="1000" height="700" alt="طارق عند باب المكتبة"><h2>طارق</h2><p>الأمن</p></li>
</ul>
</main>
<script>
  // صور تجريبية عشان الصفحة تشتغل من غير ملفات: بدّلها بصورك الحقيقية
  document.querySelectorAll("img[data-size]").forEach((img, i) => {
    const [w, h] = img.dataset.size.split("x");
    const svg = $__bt<svg xmlns="http://www.w3.org/2000/svg" width="$__{w}" height="$__{h}"><rect width="100%" height="100%" fill="hsl($__{i * 45} 45% 70%)"/><circle cx="$__{w / 2}" cy="$__{h * 0.2}" r="$__{w * 0.14}" fill="#0005"/></svg>$__bt;
    img.src = "data:image/svg+xml," + encodeURIComponent(svg);
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:** الصور ملفاتها مختلفة (طولي وعرضي ومربع)، بس المقاس اللي بتاخده على الشاشة جاي من الـ CSS مش من الملف:

- [[grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr))]] بيحط أعمدة قد ما يقدر، كل عمود 10rem على الأقل. و [[min(100%, 10rem)]] بتحمي الموبايل الصغير أوي من الـ overflow.
- [[width: 100%]] الصورة بعرض الكارت، و [[aspect-ratio: 4 / 5]] بيحسب الارتفاع من العرض، فكل الصور في العمود نفس الارتفاع مهما كان شكل الملف.
- [[height: auto]] لازمة: من غيرها الـ [[height="900"]] اللي في الـ HTML بيكسب ويلغي الـ aspect-ratio.
- [[object-fit: cover]] بيملا المكان ويقص، و [[object-position: 50% 20%]] بيخلي الجزء الباين هو اللي عند 20% من فوق، وده مكان الوش في الصور الطولية.
- [[width]] و [[height]] في الـ HTML لسه موجودين عشان المتصفح يحجز مكان قبل ما الصورة تتحمّل.

**الغلطة الشائعة:** تسيب [[object-position]] على الافتراضي (النص)، فالصور الطولية تتقص من فوق ومن تحت بالتساوي والوش يروح نصه. جرّب تغيّرها لـ [[50% 50%]] وبص على الدايرة اللي في الصورة التجريبية.

~~~text الناتج
العرض    الأعمدة   عرض الصورة × ارتفاعها     scrollWidth  clientWidth
360      1         328 × 410                 360          360
768      4         172 × 215                 768          768
1280     7         164.56 × 205.7            1280         1280

كل الصور في الصف نفس الـ top. على 1280 بعض الأعمدة 164.58 × 205.72 بفرق 0.02px
من تقسيم العرض على 7، وده كسر بكسل مش بيتشاف.
axe: صفر مشاكل.
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<img src="/a.jpg" width="800" height="600" style="width: 100%; aspect-ratio: 1">]] جوه كارت عرضه 400، والمفروض يبقى مربع. قيس الارتفاع وصلّح.`, done: R`قبل: الارتفاع 600 (الـ [[height]] اللي في الـ HTML كسب على الـ aspect-ratio). بعد [[height: auto]]: 400 × 400، ومن غير ما تمسح [[width]] و [[height]] من الـ HTML (لسه محتاجهم لحجز المكان).`, sol: R`~~~html fix.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كارت مربع</title></head>
<body>
<div style="width: 400px">
  <img id="pic" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='teal'/%3E%3C/svg%3E"
       width="800" height="600" alt="صورة منتج"
       style="width: 100%; height: auto; aspect-ratio: 1; object-fit: cover">
</div>
</body>
</html>
~~~

التصليح كلمة واحدة: [[height: auto]] في الـ style. و [[object-fit: cover]] زيادة عشان الصورة 800 × 600 ماتتمطّش لما تتحط في صندوق مربع.

**ليه كان بايظ:** الـ [[height="600"]] في الـ HTML بيتحوّل لقاعدة CSS ضعيفة، بس لسه قيمة. و [[aspect-ratio]] بيشتغل بس لو واحد من البعدين [[auto]]. والعرض اتحدد والارتفاع اتحدد، فمفيش حاجة يحسبها، فالـ [[aspect-ratio: 1]] بيتجاهل في سكوت.

**الغلطة الشائعة:** تمسح [[width]] و [[height]] من الـ HTML عشان «بيبوظوا الدنيا». كده الشكل يتصلّح فعلًا، بس المتصفح مبقاش عارف نسبة الصورة قبل التحميل، فترجع قفزة الـ layout. سيبهم وزوّد [[height: auto]].

~~~text الناتج
                     العرض    الارتفاع
قبل (height من HTML)  400      600
بعد height: auto      400      400
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** ألبوم صور رحلة متخيلة على شكل polaroid: [[<figure>]] بإطار أبيض وظل، والصورة مربعة [[cover]]، و [[figcaption]] تحت، وكل صورة متلفّة زاوية مختلفة بـ [[:nth-child]] و [[rotate]].`, done: R`كل الصور نفس المقاس رغم إن الملفات مختلفة، والكروت متلفّة بـ ٣ زوايا على الأقل، والـ caption مقري، ولما تقف على كارت بيتعدل ([[rotate: 0deg]]) ويكبر شوية من غير ما يزق اللي جنبه.`, sol: R`~~~html album.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ألبوم رحلة الأقصر</title>
<style>
  body { margin: 0; padding: 2rem 1rem; background: #4a3f35; color: #fff; font-family: system-ui, sans-serif; }
  h1 { text-align: center; }
  .album { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; }
  .polaroid { margin: 0; width: 13rem; padding: .75rem .75rem 1.25rem; background: #fff;
              box-shadow: 0 .5rem 1rem #0006; transition: rotate .2s, scale .2s; }
  .polaroid:nth-child(3n + 1) { rotate: -4deg; }
  .polaroid:nth-child(3n + 2) { rotate: 2deg; }
  .polaroid:nth-child(3n)     { rotate: -1.5deg; }
  .polaroid:hover { rotate: 0deg; scale: 1.06; position: relative; z-index: 1; }
  .polaroid img { display: block; width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; }
  .polaroid figcaption { margin-top: .75rem; text-align: center; color: #333; }
  @media (prefers-reduced-motion: reduce) { .polaroid { transition: none; } }
</style>
</head>
<body>
<main>
<h1>رحلة الأقصر</h1>
<div class="album">
  <figure class="polaroid"><img data-size="1200x800" width="1200" height="800" alt="معبد الكرنك وقت الغروب"><figcaption>الكرنك</figcaption></figure>
  <figure class="polaroid"><img data-size="800x1200" width="800" height="1200" alt="عمود ضخم من تحت"><figcaption>عمود الكرنك</figcaption></figure>
  <figure class="polaroid"><img data-size="900x900" width="900" height="900" alt="مركب شراعي في النيل"><figcaption>فلوكة</figcaption></figure>
  <figure class="polaroid"><img data-size="1000x500" width="1000" height="500" alt="منطاد فوق البر الغربي"><figcaption>المنطاد</figcaption></figure>
  <figure class="polaroid"><img data-size="600x1000" width="600" height="1000" alt="مدخل مقبرة ملكية"><figcaption>وادي الملوك</figcaption></figure>
  <figure class="polaroid"><img data-size="1100x700" width="1100" height="700" alt="سوق الأقصر بالليل"><figcaption>السوق</figcaption></figure>
</div>
</main>
<script>
  // صور تجريبية عشان الصفحة تشتغل من غير ملفات: بدّلها بصورك الحقيقية
  document.querySelectorAll("img[data-size]").forEach((img, i) => {
    const [w, h] = img.dataset.size.split("x");
    const svg = $__bt<svg xmlns="http://www.w3.org/2000/svg" width="$__{w}" height="$__{h}"><rect width="100%" height="100%" fill="hsl($__{i * 45} 45% 70%)"/><circle cx="$__{w / 2}" cy="$__{h * 0.2}" r="$__{w * 0.14}" fill="#0005"/></svg>$__bt;
    img.src = "data:image/svg+xml," + encodeURIComponent(svg);
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- [[.polaroid]] عرضه ثابت 13rem، والـ padding من تحت أكبر عشان شكل الـ polaroid. و [[aspect-ratio: 1]] مع [[object-fit: cover]] بيخلي الملفات الستة (عرضي وطولي) كلها مربع 208 × 208.
- [[:nth-child(3n + 1)]] و [[3n + 2]] و [[3n]] بيوزّعوا ٣ زوايا بالتناوب، ومن غير ما تكتب class لكل كارت.
- [[rotate]] و [[scale]] هنا خصائص لوحدها (مش جوه [[transform]])، فـ transition بيحرّك كل واحدة لوحدها.
- الـ hover بيغيّر [[rotate]] و [[scale]] بس. الاتنين مبيأثروش على الـ layout، فالكارت اللي جنبه مش بيتحرك. و [[z-index: 1]] مع [[position: relative]] عشان الكارت المكبّر ييجي فوق جاره مش تحته.

**الغلطة الشائعة:** تكبّر الكارت بـ [[width]] في الـ hover. ده بيغيّر الـ layout فكل الكروت اللي بعده تتزق وتترعش. [[scale]] بيرسم بس ومبيحسبش مكان.

~~~text الناتج
عند 360 و 1280:
rotate للكروت الستة: -4deg, 2deg, -1.5deg, -4deg, 2deg, -1.5deg
كل صورة: 208 × 208
scrollWidth = clientWidth (مفيش scroll أفقي)

hover على الكارت الأول بعد 350ms:
rotate = 0deg ، scale = 1.06
offsetLeft للكارت اللي جنبه: 652 قبل و 652 بعد (متحركش)
axe: صفر مشاكل.
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الصورة مرة [[<img>]] بـ [[object-fit: cover]] ومرة [[div]] بـ [[background-image]] و [[background-size: cover]]. قارن في DevTools: اسم العنصر في Accessibility tree، وهل [[loading="lazy"]] ينفع، وهل [[srcset]] ينفع.`, done: R`عندك جدول ٣ صفوف: الـ img ليه اسم (الـ alt) والـ div ملوش، والـ img بيدعم lazy و srcset والـ div لأ (محتاج [[image-set()]] و JavaScript)، والشكل على الشاشة واحد. وكتبت إمتى الـ background مقبول (زينة بس).`, sol: R`~~~html compare.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>img ضد background</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .box { width: 300px; height: 200px; margin-block-end: 1rem; }
  img.box { display: block; object-fit: cover; }
  div.box { background-size: cover; background-position: center; }
  .spacer { height: 3000px; }
</style>
</head>
<body>
<img class="box" src="photo.jpg" alt="شارع المعز بالليل">
<div class="box" style="background-image: url(photo.jpg)"></div>

<div class="spacer"></div>

<!-- تحت الشاشة بكتير: مين هيتحمّل قبل ما توصله؟ -->
<img class="box" src="far-img.jpg" alt="قلعة صلاح الدين" loading="lazy">
<div class="box" style="background-image: url(far-bg.jpg)"></div>
</body>
</html>
~~~

حط جنبها ٣ صور باسم [[photo.jpg]] و [[far-img.jpg]] و [[far-bg.jpg]]، وشغّل الصفحة من سيرفر محلي ([[npx serve .]]) عشان Network يبان.

| المقارنة | [[<img>]] بـ object-fit | [[div]] بـ background |
|---|---|---|
| الاسم في Accessibility tree | image «شارع المعز بالليل» | مش موجود أصلًا (generic من غير اسم، فالـ tree بيتجاهله) |
| [[loading="lazy"]] | شغال: [[far-img.jpg]] مطلبش لحد الـ scroll | مفيش attribute زيه: [[far-bg.jpg]] اتحمّل مع الصفحة |
| [[srcset]] و [[sizes]] | شغالين، والمتصفح بيختار الملف | مفيش. أقرب حاجة [[image-set()]] بتاخد الكثافة بس، ومن غير [[sizes]] |

**إمتى الـ background مقبول:** لما الصورة زينة بحتة ومحدش هيخسر حاجة لو ماشافهاش: نقشة، أو تدرّج، أو خلفية قسم. لو الصورة محتوى (منتج أو شخص أو مكان)، [[<img>]] حتى لو الشكل واحد، لأن قارئ الشاشة ومحرك البحث والـ Print بيتعاملوا معاها، وصورة الـ LCP بتتعرف بدري.

**الغلطة الشائعة:** تحكم بالعين. الاتنين على الشاشة شبه بعض بالظبط، والفرق كله في اللي مش باين: الاسم والتحميل والملف المختار.

~~~text الناتج
Network قبل أي scroll:
/photo.jpg      (مرة واحدة: الاتنين نفس الملف)
/far-bg.jpg     اتحمّل رغم إنه تحت الشاشة بـ 3000px
far-img.jpg     لسه مطلبش

بعد scroll لآخر الصفحة:
/far-img.jpg    اتطلب دلوقتي

ariaSnapshot للصفحة:
- img "شارع المعز بالليل"
- img "قلعة صلاح الدين"
(الـ div ملوش أي سطر)
~~~` },
          ],
          deep: {
            why: R`كروت المنتجات والفريق والمقالات بتيجي صورها بمقاسات مختلفة من ناس مختلفة. من غير object-fit يا الصور تتمط (منظر مش احترافي خالص)، يا كل كارت بارتفاع مختلف والـ grid يبوظ.`,
            how: R`الـ [[<img>]] ليه صندوق (العرض والارتفاع اللي انت اديتهم) ومحتوى (الصورة نفسها بنسبتها). [[object-fit]] بيقول المحتوى يتحط إزاي جوه الصندوق: [[fill]] (الافتراضي) بيمطّه، و [[cover]] بيكبّره لحد ما يغطي الصندوق كله ويقص الزيادة، و [[contain]] بيصغّره لحد ما يبان كله، و [[none]] بيسيبه بمقاسه الأصلي، و [[scale-down]] زي contain بس عمره ما يكبّر الصورة.

[[object-position]] بنفس فكرة [[background-position]]: القيمة الافتراضية [[50% 50%]] (النص). لو القص بيقطع الوشوش، ارفعها لفوق.

الـ [[width]] و [[height]] في الـ HTML لسه مهمين عشان يحجزوا المكان (درس img)، بس خد بالك: الـ [[height]] اللي في الـ HTML المتصفح بيعامله كأنه [[height]] في CSS، فلو سبته، الصورة بتاخد ارتفاعه وتتجاهل الـ [[aspect-ratio]]. عشان كده لازم [[height: auto]] في CSS، و Tailwind بيحطها لكل الصور في الـ Preflight.

[[<Image fill>]] في Next.js بيخلي الصورة [[position: absolute]] وتملا أبوها، فالأب لازم يبقى [[relative]] وليه مقاس (هنا [[aspect-video]])، و [[object-cover]] بيمنع المط، و [[sizes]] ضروري عشان يختار الملف الصح.`,
            when: R`أي صورة في صندوق مقاسه ثابت: كروت، و avatars، وهيرو. contain للّوجو وصور المنتجات على خلفية بيضا اللي مينفعش حاجة منها تتقص. و [[object-fit]] بيشتغل كمان على [[<video>]].`,
            mistakes: R`[[height: 200px]] على صورة من غير object-fit فتتمط. [[background-image]] بدل [[<img>]] عشان تستخدم [[background-size: cover]]: كده ضاع الـ alt والـ lazy loading والـ srcset. [[<Image fill>]] والأب مش relative فالصورة تملا الصفحة كلها. و cover على لوجو فيتقص نصه.`
          },
          teach: R`## الصورة جوه صندوق مش بنفس نسبتها

أي [[<img>]] فيه حاجتين: **الصندوق** (المقاس اللي الـ CSS اداهوله) و**الصورة نفسها** بنسبتها الأصلية. لما النسبتين مختلفين، [[object-fit]] بيقرر الصورة تتحط إزاي. عشان نشوف ده بالأرقام، عملنا صورة طولية 600 × 900 مقسومة لـ ٩ شرايط ألوان، كل شريط 100px، مترقمين من 0 (فوق) لـ 8 (تحت). حطيناها في كارت عرضه 400، وصوّرنا الصورة في Chrome وقرينا لون أول سطر وآخر سطر فيها: كده نعرف أنهي جزء من الصورة باين.

---

## ١. [[.card-img]] سطر سطر

~~~text style.css
.card-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: 50% 20%;
}
~~~

- [[width: 100%]]: عرض الكارت = 400.
- [[height: auto]]: مهم جدًا. الـ HTML فيه [[height="600"]]، والمتصفح بيعامله كأنه CSS. جربنا من غير السطر ده: الصورة طلعت **400 × 600** والـ aspect-ratio اتجاهل. ومعاه: **400 × 300**.
- [[aspect-ratio: 4 / 3]]: الارتفاع = العرض × 3 ÷ 4 = 300.
- [[object-fit: cover]]: كبّر الصورة لحد ما تغطي الصندوق كله، واقصص الزيادة.
- [[object-position: 50% 20%]]: لو فيه قص، أنهي جزء يفضل باين. الرقم الأول أفقي والتاني رأسي.

### الحسبة بتاعة cover

الصورة 600 × 900 والصندوق 400 × 300. عشان تغطي العرض لازم تصغر لـ 400 ÷ 600 = ⅔، فتبقى 400 × 600. الارتفاع 600 والصندوق 300، يعني 300 بكسل زيادة لازم يتقصوا. و [[20%]] معناها: اقصص 20% من الزيادة من فوق والباقي من تحت.

| object-position | اللي باين من فوق لتحت |
|---|---|
| [[50% 50%]] (الافتراضي) | شريط 2 لـ 6 (النص) |
| [[50% 20%]] (المثال) | شريط 0 لـ 5 |
| [[top]] | شريط 0 لـ 4 |
| [[bottom]] | شريط 4 لـ 8 |

مع [[20%]] أول شريط (فوق خالص) باين، فلو صورة شخص، الراس مش هتتقص.

## ٢. القيم الخمسة على نفس الصورة

| object-fit | اللي حصل (متقاس) |
|---|---|
| [[fill]] (الافتراضي) | الـ ٩ شرايط كلهم باينين ومضغوطين: الصورة اتمطّت |
| [[cover]] | الصندوق مليان، وجزء من فوق وتحت اتقص |
| [[contain]] | الصورة كلها باينة (شريط 0 لـ 8)، والجنبين فاضيين أبيض |
| [[none]] | الصورة بمقاسها الأصلي في النص: شريط 3 لـ 5 بس |
| [[scale-down]] | زي contain، بس عمره ما يكبّر صورة صغيرة |

## ٣. [[.logo { width: 8rem; height: 4rem; object-fit: contain; }]]

صندوق 128 × 64 بالعرض، والصورة طولية. مع [[contain]]: النص فيه الصورة، والشمال واليمين فاضيين (أبيض). يعني اللوجو كله باين من غير قص ولا مط.

## ٤. نفس الكلام بـ HTML و Tailwind و Next

~~~text index.html
<img class="card-img" src="/p/42.webp" width="800" height="600" alt="سماعة سودا">
~~~

الـ [[width]] و [[height]] في الـ HTML بيدّوا المتصفح النسبة قبل ما الصورة تتحمّل، فيحجز المكان.

~~~text Tailwind
<img className="aspect-square w-full object-cover object-top" ... />
~~~

[[aspect-square]] = [[aspect-ratio: 1 / 1]]، و [[w-full]] = [[width: 100%]]، و [[object-cover]] و [[object-top]] نفس الخصائص. ومش محتاج [[h-auto]] لأن الـ Preflight بتاع Tailwind بيحط [[height: auto]] على كل الصور.

~~~text Next.js
<div className="relative aspect-video"><Image src="/hero.webp" alt="" fill sizes="100vw" className="object-cover" /></div>
~~~

[[fill]] بيخلي الصورة [[position: absolute]] و [[inset: 0]]، فبتملا الأب. عشان كده الأب [[relative]] (مرجع) و [[aspect-video]] (= 16 / 9، عشان يبقى ليه ارتفاع).

## الخلاصة

- [[cover]] للكروت والـ avatars (مليانة ومقصوصة)، و [[contain]] للّوجوهات (كاملة).
- [[object-position]] بيختار الجزء الباين، ورفعه لفوق بيحمي الوشوش.
- مع [[aspect-ratio]] على صورة فيها [[height]] في الـ HTML، اكتب [[height: auto]].`,
          lines: [
            R`صورة الكارت: القاعدة دي على كل [[<img>]] عليه الكلاس ده، ومقاسه هيتحدد من الكارت.`,
            R`[[width: 100%]]: الصورة بعرض الكارت كله، فلو الكارت 400 الصورة 400.`,
            R`[[height: auto]]: ألغي الارتفاع اللي جاي من [[height="600"]] في الـ HTML، عشان الـ aspect-ratio هو اللي يحسب الارتفاع.`,
            "كل الكروت نفس النسبة مهما كانت الصورة.",
            "املا الصندوق كله واقصص الزيادة بدل ما تمط.",
            "لو فيه قص، خلّي الجزء اللي فوق شوية باين (عشان الوشوش).",
            R`قفلة [[.card-img]]، والسطر الجاي للّوجو.`,
            R`لوجو: مقاس ثابت، و [[contain]] عشان يبان كله من غير قص.`,
            "الصورة في الـ HTML، ومقاسها الأصلي لحجز المكان.",
            "نفس الفكرة بـ Tailwind: مربع، ومليان، والقص من تحت.",
            R`Next Image بـ [[fill]]: الأب [[relative]] وليه نسبة، والصورة [[object-cover]].`
          ],
          sol: R`[[fill]]: الصورة الطولية اتمطت بالعرض والوشوش عريضة. [[cover]]: الصندوق مليان والصورة بنسبتها، بس اتقص جزء من فوق ومن تحت. [[contain]]: الصورة كلها باينة وفيه فراغ يمين وشمال. [[none]]: الصورة بحجمها الأصلي، غالبًا جزء صغير منها بس اللي باين.

مع cover و [[object-position: top]]: اللي فوق باين واللي تحت اتقص، و [[bottom]] العكس. لو التغيير ملوش أي تأثير، يبقى الصورة نسبتها قريبة من الصندوق أصلًا، جرّب صورة أطول.`
        },
        {
          cmd: "picture",
          title: "صورة مختلفة للموبايل، و AVIF مع fallback",
          desc: R`[[<picture>]] بيحط جواه كذا [[<source>]] وفي الآخر [[<img>]]. المتصفح بيمشي على الـ sources بالترتيب وياخد أول واحد ينفع (نوعه مدعوم و [[media]] بتاعته متحققة)، ويعرضه في الـ img. ولو ولا واحد نفع، بياخد الـ img نفسه.

استخدامين: صيغ حديثة ([[AVIF]] أصغر بكتير، وبعدها [[WebP]]، وبعدها JPEG للقديم)، و art direction: صورة مقصوصة مختلفة للموبايل (مش نفس الصورة أصغر، لأن ده شغل [[srcset]] في درس img).

الـ [[alt]] والـ [[width]] و [[height]] و [[loading]] والكلاسات كلها على الـ [[<img>]]، مش على picture.`,
          example: R`<picture>
  <source media="(max-width: 767px)" type="image/avif" srcset="/hero-mobile.avif" width="800" height="1000">
  <source media="(max-width: 767px)" type="image/webp" srcset="/hero-mobile.webp" width="800" height="1000">
  <source type="image/avif" srcset="/hero-800.avif 800w, /hero-1600.avif 1600w" sizes="100vw">
  <source type="image/webp" srcset="/hero-800.webp 800w, /hero-1600.webp 1600w" sizes="100vw">
  <img src="/hero-1600.jpg" width="1600" height="700" alt="عرض الصيف: خصم 30% على السماعات" fetchpriority="high">
</picture>`,
          try: R`حوّل صورة لـ AVIF و WebP (من squoosh.app أو [[npx sharp-cli]])، واعمل الـ picture. افتح DevTools › Network وفلتر على Img: شوف أنهي ملف اتحمّل على عرض كبير، وبعدين وضع الموبايل واعمل refresh. وقارن أحجام الملفات التلاتة.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** نفس الـ picture بتاع المثال بس الـ sources العامة (من غير [[media]]) جت **قبل** بتاعة الموبايل. على موبايل 390 أنهي ملف هيتحمّل؟ وبعدين شوف Network.`, done: R`اتحمّل [[hero-1600.avif]] أو [[hero-800.avif]] (صورة الديسكتوب العريضة) مش [[hero-mobile.avif]]، لأن المتصفح بياخد أول source ينفع، والعام بينفع دايمًا. ورجّعت الترتيب الصح.`, sol: R`~~~html wrong.html
<picture>
  <!-- العام الأول: غلط -->
  <source type="image/avif" srcset="/hero-800.avif 800w, /hero-1600.avif 1600w" sizes="100vw">
  <source type="image/webp" srcset="/hero-800.webp 800w, /hero-1600.webp 1600w" sizes="100vw">
  <source media="(max-width: 767px)" type="image/avif" srcset="/hero-mobile.avif" width="800" height="1000">
  <source media="(max-width: 767px)" type="image/webp" srcset="/hero-mobile.webp" width="800" height="1000">
  <img src="/hero-1600.jpg" width="1600" height="700" alt="عرض الصيف" fetchpriority="high">
</picture>
~~~

والتصليح: انقل سطرين [[media]] فوق، عشان الأكتر تحديدًا ييجي الأول.

**ليه:** المتصفح بيمشي على الـ [[<source>]] من فوق لتحت وبياخد **أول واحد ينفع**، ومبيكمّلش يدوّر على الأحسن. الـ source العام مفيهوش [[media]]، فبينفع على أي شاشة، فبيوقف عنده ومبيوصلش أبدًا لبتاع الموبايل. ده زي [[if]] و [[else if]]: الحالة العامة تتحط في الآخر.

على 390 بكثافة 1 الـ [[sizes="100vw"]] بيطلّب 390px، فبياخد [[hero-800.avif]]. على موبايل بكثافة 3 الطلب 1170px، فهتلاقيه [[hero-1600.avif]]. وفي الحالتين الصورة العريضة هي اللي نزلت مش الطولية.

**الغلطة الشائعة:** تستنى إن المتصفح يقرا كل الـ sources ويختار الأنسب. هو بيقف عند أول تطابق.

~~~text الناتج
الترتيب الغلط على 390:  /hero-800.avif     الصورة 390 × 243.75 (عريضة)
الترتيب الصح على 390:   /hero-mobile.avif  الصورة 390 × 487.5 (طولية 4:5)
الترتيب الصح على 1280:  /hero-1600.avif    الصورة 1280 × 800
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[<img srcset="/c-400.jpg 400w, /c-800.jpg 800w, /c-1600.jpg 1600w" sizes="(min-width: 64rem) 33vw, 100vw">]]. أنهي ملف هيتحمّل على: 1280 بكثافة 1، و 1280 بكثافة 2، و 390 بكثافة 3، و 390 بكثافة 1؟ احسب وبعدين جرّب (DevTools › Device Toolbar بيغيّر الـ DPR).`, done: R`1280×1: الصورة 33vw ≈ 422 → [[c-800]]. 1280×2: 845 → [[c-1600]]. 390×3: 1170 → [[c-1600]]. 390×1: 390 → [[c-400]]. وده اللي اتحمّل فعلًا في Chrome (اقفل الكاش بين كل تجربة عشان المتصفح ممكن يستخدم ملف أكبر متكاش).`, sol: R`~~~html srcset.html
<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>srcset</title>
<style>body { margin: 0 } img { display: block; max-width: 100%; height: auto }</style>
<img id="i" src="/c-800.jpg" alt=""
     srcset="/c-400.jpg 400w, /c-800.jpg 800w, /c-1600.jpg 1600w"
     sizes="(min-width: 64rem) 33vw, 100vw">
<!-- في الكونسول: i.currentSrc -->
~~~

**خطوات الحساب:**

1. [[sizes]]: هل العرض 1024px أو أكتر ([[64rem]])؟ لو أيوه الصورة [[33vw]]، ولو لأ [[100vw]].
2. اضرب المقاس في كثافة الشاشة (DPR): ده عدد البكسلات اللي الشاشة محتاجاها فعلًا.
3. المتصفح بياخد أنسب ملف من الـ [[srcset]] (الـ [[w]] معناها عرض الملف الحقيقي، مش عرض العرض على الشاشة).

| الشاشة | حجم الصورة | × الكثافة | الملف |
|---|---|---|---|
| 1280 × 1 | 33vw = 422.4 | 422 | [[c-800]] (الـ 400 أصغر من المطلوب) |
| 1280 × 2 | 422.4 | 845 | [[c-1600]] |
| 390 × 3 | 100vw = 390 | 1170 | [[c-1600]] |
| 390 × 1 | 390 | 390 | [[c-400]] |

**الغلطة الشائعة:** تنسى الكثافة، فتفتكر إن موبايل 390 هياخد الملف الصغير دايمًا. الموبايل الجديد بكثافة 3 بياخد أكبر ملف عندك. وغلطة تانية: تجرّب من غير ما تقفل الكاش، فالمتصفح يلاقي ملف أكبر متكاش ويستخدمه.

~~~text الناتج
1280 × 1 → /c-800.jpg    الصورة على الشاشة 422.39 × 264
1280 × 2 → /c-1600.jpg   الصورة على الشاشة 422.39 × 264
390  × 3 → /c-1600.jpg   الصورة على الشاشة 390 × 243.75
390  × 1 → /c-400.jpg    الصورة على الشاشة 390 × 243.75
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<picture><source type="image/avif" src="/hero.avif"><img src="/hero.jpg" alt="..."></picture>]]. الـ AVIF مبيتحمّلش أبدًا حتى في Chrome. ليه؟`, done: R`الـ [[<source>]] جوه picture بيقرا [[srcset]] بس، و [[src]] عليه بيتجاهل، فالمتصفح بيروح للـ img. بعد [[srcset="/hero.avif"]] الـ Network بيوري [[hero.avif]] بس.`, sol: R`~~~html fixed.html
<picture>
  <source type="image/avif" srcset="/hero.avif">
  <img src="/hero.jpg" alt="عرض الصيف">
</picture>
~~~

**السبب:** [[<source>]] عنده [[src]] فعلًا، بس ده بيتقري جوه [[<video>]] و [[<audio>]] بس. جوه [[<picture>]] المتصفح بيقرا [[srcset]] لا غير، فالـ source اللي مفيهوش [[srcset]] بيتجاهل كأنه مش موجود، ويروح للـ [[<img>]].

و [[<img>]] عكسه: [[src]] هو الـ fallback الإلزامي، فمتبدلوش بـ srcset هناك.

**الغلطة الشائعة:** تدوّر على error. مفيش ولا رسالة في الكونسول، والصورة ظاهرة عادي بالـ JPEG، فالمشكلة بتعيش سنين. الطريقة الوحيدة تعرف: Network أو [[document.querySelector("img").currentSrc]].

~~~text الناتج
بـ src:    اتحمّل /hero.jpg بس     currentSrc = .../hero.jpg
بـ srcset: اتحمّل /hero.avif بس    currentSrc = .../hero.avif
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** خد صورة واحدة وحوّلها بـ [[npx sharp-cli]] لـ AVIF و WebP و JPEG بمقاسين (800 و 1600)، ونسخة مقصوصة 4:5 للموبايل، واعمل picture فيه art direction والصيغ التلاتة.`, done: R`عندك جدول بأحجام الملفات الستة (AVIF الأصغر غالبًا)، وعلى 1280 اتحمّل ملف عريض واحد، وعلى 390 اتحمّل الملف الطولي، و [[getBoundingClientRect]] للصورة على 390 نسبته 4:5 من أول ما الصفحة فتحت (مفيش قفزة).`, sol: R`~~~bash
# من صورة أصلية photo.png (2000 × 1250)
npx sharp-cli -i photo.png -o hero-800.avif  --format avif resize 800
npx sharp-cli -i photo.png -o hero-1600.avif --format avif resize 1600
npx sharp-cli -i photo.png -o hero-800.webp  --format webp resize 800
npx sharp-cli -i photo.png -o hero-1600.webp --format webp resize 1600
npx sharp-cli -i photo.png -o hero-800.jpg   --format jpeg resize 800
npx sharp-cli -i photo.png -o hero-1600.jpg  --format jpeg resize 1600
# النسخة الطولية 4:5 للموبايل (800 × 1000 مقصوصة من النص)
npx sharp-cli -i photo.png -o hero-mobile.avif --format avif resize 800 1000 --fit cover
npx sharp-cli -i photo.png -o hero-mobile.webp --format webp resize 800 1000 --fit cover
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هيرو المحمصة</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  img { display: block; width: 100%; height: auto; }
</style>
</head>
<body>
<main>
  <picture>
    <source media="(max-width: 767px)" type="image/avif" srcset="/hero-mobile.avif" width="800" height="1000">
    <source media="(max-width: 767px)" type="image/webp" srcset="/hero-mobile.webp" width="800" height="1000">
    <source type="image/avif" srcset="/hero-800.avif 800w, /hero-1600.avif 1600w" sizes="100vw">
    <source type="image/webp" srcset="/hero-800.webp 800w, /hero-1600.webp 1600w" sizes="100vw">
    <img src="/hero-1600.jpg" width="1600" height="1000" alt="رفوف قهوة في محمصة" fetchpriority="high">
  </picture>
  <h1>محمصة النيل</h1>
</main>
</body>
</html>
~~~

**ليه الترتيب ده:** الموبايل الأول لأن [[media]] شرط أضيق، وجوه كل مجموعة AVIF قبل WebP (الأصغر قبل الأوسع دعمًا)، والـ [[<img>]] آخر حاجة كـ fallback ومكان الـ [[alt]] و [[fetchpriority]].

**ليه مفيش قفزة:** [[width="800" height="1000"]] على الـ source بيقول للمتصفح نسبة الصورة الطولية قبل ما تتحمّل، فبيحجز 4:5 على الموبايل، و 16:10 من الـ [[<img>]] على الديسكتوب.

**الغلطة الشائعة:** تنسى [[width]] و [[height]] على source الموبايل. كده المتصفح بيحجز نسبة الـ img العريضة، وأول ما الصورة الطولية توصل كل اللي تحتها يتزق لتحت.

~~~text الناتج
الملف             الحجم بالـ byte (صورة اختبار، صورتك أرقامها مختلفة)
hero-800.avif     12,979
hero-800.webp     13,824
hero-800.jpg      23,187
hero-1600.avif    28,695
hero-1600.webp    43,052
hero-1600.jpg     70,113

على 1280: اتحمّل /hero-1600.avif بس. الصندوق 1280 × 800.
على 390:  اتحمّل /hero-mobile.avif بس. الصندوق 390 × 487.5 = نسبة 0.8 (4:5)
          من أول ما الصفحة فتحت.
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من web.dev أو MDN: إيه اللي بيحصل لصورة الهيرو لو عليها [[loading="lazy"]]؟ وإمتى [[fetchpriority="high"]] يفرق؟ وبعدين جرّب الاتنين و Lighthouse على Slow 4G.`, done: R`كتبت إن lazy على صورة فوق الشاشة بيأخّر تحميلها لحد ما الـ layout يخلص فالـ LCP بيتأخر، و [[fetchpriority="high"]] بيقدّمها في الطابور. وعندك رقم LCP للحالتين من Lighthouse.`, sol: R`**إجابة نموذجية من web.dev و MDN:**

- [[loading="lazy"]] بيقول للمتصفح «استنى لحد ما تعرف الصورة دي قريبة من الشاشة». والمعلومة دي مش معروفة غير بعد ما الـ CSS ييجي والـ layout يتحسب، فالصورة بتفقد تحميلها البدري اللي الـ preload scanner كان بيعمله. لو الصورة دي عنصر الـ LCP، الـ LCP نفسه بيتأخر.
- [[fetchpriority="high"]] مبيغيّرش **هل** الصورة هتتحمّل، بيغيّر ترتيبها في الطابور. الصور اللي فوق الشاشة Chrome بيرفع أولويتها لوحده، بس بعد ما يعرف مكانها. الـ attribute بيقوله كده من الأول. بيفرق لما الصفحة فيها طلبات كتير بتتنافس على نت بطيء، ومفيش فرق تقريبًا في صفحة فيها صورة واحدة.

~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هيرو</title>
<meta name="description" content="تجربة LCP">
<style>body { margin: 0 } img { display: block; width: 100%; height: auto }</style>
</head>
<body>
<main>
  <!-- غيّر السطر ده بين loading="lazy" و fetchpriority="high" ومن غير أي حاجة.
       وزوّد CSS وكام سكربت defer في الـ head عشان الطلبات تتنافس زي صفحة حقيقية -->
  <img src="/hero.jpg" width="1600" height="1000" alt="رفوف قهوة" loading="lazy">
  <h1>محمصة</h1>
</main>
</body>
</html>
~~~

~~~bash
npx serve . -l 4000
npx lighthouse http://localhost:4000/test.html --quiet --only-categories=performance --throttling-method=devtools --output=json --output-path=lh.json
~~~

**الغلطة الشائعة:** تحط [[loading="lazy"]] على كل الصور بـ loop «عشان الأداء»، ومنها صورة الهيرو. القاعدة: اللي فوق الشاشة مش lazy، واللي تحتها lazy.

~~~text الناتج
الحالة                     LCP       Performance
loading="lazy"             7.7 s     68
من غير attribute           7.3 s     68 و 69
fetchpriority="high"       7.3 s     69

(Lighthouse 13.6 من الـ Node API بـ throttlingMethod: devtools، مرتين لكل حالة. الصفحة فيها
صورة 890KB و CSS وست سكربتات defer. الأرقام متكررة في المرتين.)
في صفحة صورة واحدة خفيفة مع المحاكاة الافتراضية مطلعش فرق مفيد، وده اللي
بيفسّر ليه التجربة لازم تبقى على صفحة فيها طلبات بتتنافس.
~~~` },
          ],
          deep: {
            why: R`صورة الهيرو غالبًا أكبر حاجة في الصفحة وهي اللي بتحدد LCP. نفس الصورة بـ AVIF ممكن تبقى نص حجم الـ WebP وأصغر بكتير من JPEG. وصورة عريضة 16:9 على موبايل طولي بتبقى شريط صغير الكلام اللي فيها مش باين، فمحتاج صورة مقصوصة تانية.`,
            how: R`المتصفح بيقرا [[type]] ويسأل نفسه: أعرف أفك الصيغة دي؟ لو لأ بيعدّي من غير ما يحمّل حاجة. وبيقرا [[media]] زي media query. أول source يعدّي الاتنين بيكسب، وجواه [[srcset]] و [[sizes]] بيشتغلوا عادي زي درس img. فالترتيب مهم: الأدق (موبايل + AVIF) الأول، والعام في الآخر.

[[width]] و [[height]] على الـ source: لما صورة الموبايل نسبتها مختلفة (4:5 بدل 16:9)، دول بيخلوا المتصفح يحجز المكان الصح ليها بدل ما يستخدم نسبة الـ img، فمفيش CLS.

AVIF بقت مدعومة في كل المتصفحات الحديثة، بس الـ fallback مش بيكلّف حاجة (المتصفح مبيحمّلش غير ملف واحد)، والـ encode بتاعها أبطأ، فاعملها وقت الـ build مش مع كل request.

في Next.js، [[<Image>]] بيحوّل الصيغة لوحده حسب اللي المتصفح بيقول إنه بيدعمه (WebP افتراضيًا، و AVIF لو ضفتها في [[images.formats]] في الـ config)، فمش محتاج picture عشان الصيغ. بس لـ art direction لسه محتاج picture أو [[getImageProps]].`,
            when: R`صور الهيرو والبانرات الكبيرة: صيغ حديثة دايمًا، و art direction لما الصورة فيها كلام أو تفاصيل هتضيع على الموبايل. الصور الصغيرة والأيقونات: مش محتاجة.`,
            mistakes: R`الـ [[alt]] أو الكلاس على [[<picture>]] بدل الـ img. الـ source العام قبل الخاص فالموبايل ياخد صورة الديسكتوب. picture لنفس الصورة بمقاسات مختلفة (ده srcset). تنسى الـ [[<img>]] جوه فمفيش صورة خالص. و [[src]] على [[<source>]] بدل [[srcset]] (الـ source مبيقراش src جوه picture).`
          },
          teach: R`## المتصفح بيختار ملف واحد من قايمة

[[<picture>]] نفسه مبيعرضش حاجة. هو بيدّي المتصفح قايمة اختيارات ([[<source>]])، والمتصفح ياخد **أول واحد** ينفعه ويحطه في الـ [[<img>]] اللي في الآخر. عشان نتأكد من ده، عملنا ملفات حقيقية بـ sharp (مكتبة Node لتحويل الصور) لصورة تجربة 1600 × 700، وفتحنا المثال في Chrome بمقاسات مختلفة، وسجلنا كل request للصور.

---

## ١. السطرين الأولانيين: الموبايل

~~~text index.html
<source media="(max-width: 767px)" type="image/avif" srcset="/hero-mobile.avif" width="800" height="1000">
<source media="(max-width: 767px)" type="image/webp" srcset="/hero-mobile.webp" width="800" height="1000">
~~~

- [[media]]: شرط زي media query. [[max-width: 767px]] = الشاشة 767 أو أصغر.
- [[type]]: صيغة الملف (اسمها MIME type). لو المتصفح مبيعرفش يفك [[image/avif]]، بيعدّي السطر من غير ما يحمّل حاجة.
- [[srcset]]: الملف (أو الملفات). جوه picture لازم [[srcset]] مش [[src]].
- [[width="800" height="1000"]]: نسبة الصورة دي (4:5)، عشان المتصفح يحجز مكان بالنسبة الصح.

## ٢. السطرين التانيين: الشاشات الكبيرة

~~~text index.html
<source type="image/avif" srcset="/hero-800.avif 800w, /hero-1600.avif 1600w" sizes="100vw">
<source type="image/webp" srcset="/hero-800.webp 800w, /hero-1600.webp 1600w" sizes="100vw">
~~~

- مفيش [[media]]، فبيشتغلوا على أي شاشة.
- [[800w]] = الملف ده عرضه 800 بكسل. والمتصفح بيختار مقاس حسب [[sizes]].
- [[sizes="100vw"]] = الصورة هتتعرض بعرض الشاشة كلها.

## ٣. الـ img: الاحتياطي والمكان اللي الصورة بتتعرض فيه

~~~text index.html
<img src="/hero-1600.jpg" width="1600" height="700" alt="عرض الصيف: خصم 30% على السماعات" fetchpriority="high">
~~~

لو ولا source نفع، الـ [[src]] بتاعه هو اللي بيتحمّل (JPEG، كل المتصفحات بتعرفه). و [[fetchpriority="high"]] = حمّلها بأولوية عالية لأنها أهم صورة فوق. والـ alt والمقاس هنا مش على picture.

---

## اللي اتحمّل فعلًا

| الشاشة | الملفات اللي اتطلبت | المقاس المعروض |
|---|---|---|
| 1200، كثافة 1 | [[/hero-1600.avif]] بس | 1200 × 525 |
| 1200، كثافة 2 | [[/hero-1600.avif]] بس | 1200 × 525 |
| 700 | [[/hero-mobile.avif]] بس | 700 × 875 |
| 390، كثافة 3 | [[/hero-mobile.avif]] بس | 390 × 487.5 |

- في كل حالة ملف **واحد** اتحمّل.
- على 1200 اختار 1600 مش 800: الصورة هتتعرض 1200 بكسل، والـ 800 أصغر من المطلوب.
- على 700 الصورة بقت طولية: 700 × 875 = نسبة 4:5 بتاعة صورة الموبايل، مش 1600 × 700. ده من الـ [[width]] و [[height]] اللي على الـ source.

ولما غيّرنا [[image/avif]] لصيغة وهمية (كأننا متصفح قديم مبيعرفش AVIF)، اتحمّل [[/hero-1600.webp]] بدالها.

## أحجام الملفات اللي عملناها

| الملف | الحجم |
|---|---|
| hero-1600.jpg | 268,494 byte |
| hero-1600.webp | 252,490 byte |
| hero-1600.avif | 107,321 byte |
| hero-800.avif | 11,614 byte |

الصورة دي متولّدة (ألوان متدرجة ونقط عشوائية)، فالفرق في صورة حقيقية بيختلف، بس الترتيب غالبًا كده: AVIF أصغر، وبعدها WebP، وبعدها JPEG.

## الخلاصة

- المتصفح بيمشي على الـ sources بالترتيب وياخد أول واحد [[type]] و [[media]] بتوعه ينفعوا، فالأدق الأول.
- [[srcset]] على الـ source، و [[alt]] والمقاس والكلاسات على الـ img.
- ملف واحد بس بيتحمّل، فالـ fallback ملوش تمن.`,
          lines: [
            R`بداية الـ [[<picture>]]: مبيعرضش حاجة لوحده، هو لستة اختيارات للمتصفح.`,
            R`موبايل وبيدعم AVIF: صورة مقصوصة طولي، ونسبتها الخاصة بـ width و height.`,
            "موبايل ومش بيدعم AVIF: نفس الصورة WebP.",
            R`شاشة كبيرة وبيدعم AVIF: مقاسين، والمتصفح يختار بـ [[sizes]].`,
            R`شاشة كبيرة ومش بيدعم AVIF: نفس المقاسين بصيغة WebP.`,
            R`آخر احتمال والمكان اللي الصورة بتتعرض فيه فعلًا: الـ alt والمقاس والأولوية هنا.`,
            R`قفلة الـ [[<picture>]]، والمتصفح هيحمّل ملف واحد بس من اللستة.`
          ],
          sol: R`على عرض كبير في Chrome: هتلاقي [[hero-1600.avif]] اتحمّل (الـ [[hero-800.avif]] بيتاخد بس لما الصورة هتتعرض 800 بكسل حقيقي أو أقل، يعني عرض الشاشة × الكثافة)، ومفيش WebP ولا JPEG. في وضع الموبايل بعد refresh: [[hero-mobile.avif]] والصورة بقت طولية. ملف واحد بس بيتحمّل في كل مرة.

الأحجام: غالبًا AVIF أصغر من WebP بشوية لنص، والاتنين أصغر بكتير من JPEG (الأرقام بتختلف حسب الصورة والجودة).

لو لقيت صورة الديسكتوب على الموبايل: الـ sources الخاصة بالموبايل لازم تيجي الأول. ولو مفيش حاجة اتحمّلت: اتأكد إنك كتبت [[srcset]] مش [[src]] على الـ source.`
        },
        {
          cmd: "video و iframe",
          title: "فيديو بيشتغل لوحده على الموبايل، و YouTube ميتقّلش الصفحة",
          desc: R`[[<video>]] محتاج [[controls]] عشان المستخدم يشغّل ويوقف، و [[poster]] صورة لحد ما يشتغل، و [[preload="metadata"]] عشان ميحمّلش الفيديو كله على الفاضي. والترجمة بـ [[<track kind="captions">]] وملف WebVTT.

فيديو خلفية بيشتغل لوحده لازم [[muted autoplay loop playsinline]]: المتصفحات بتمنع الـ autoplay بصوت، و iPhone من غير [[playsinline]] بيفتحه full screen.

و [[<iframe>]] (YouTube أو خريطة) لازم له [[title]] و [[loading="lazy"]]. وأحسن من كده: facade، يعني صورة الفيديو وزرار تشغيل، والـ iframe يتعمل بس لما المستخدم يدوس.`,
          example: R`<video controls preload="metadata" poster="/video/intro.jpg" width="1280" height="720">
  <source src="/video/intro.webm" type="video/webm">
  <source src="/video/intro.mp4" type="video/mp4">
  <track kind="captions" src="/video/intro.ar.vtt" srclang="ar" label="عربي" default>
</video>
<video autoplay muted loop playsinline poster="/hero.jpg" aria-hidden="true" src="/hero.mp4"></video>
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="شرح المنتج في دقيقتين" width="560" height="315" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
<button type="button" class="yt-facade" data-id="VIDEO_ID" aria-label="شغّل: شرح المنتج في دقيقتين" style="background-image: url(https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg)">▶</button>`,
          try: R`حط iframe يوتيوب عادي في صفحة، وافتح Network واعمل refresh: عدّ الـ requests والحجم. وبعدين بدّله بزرار الـ facade واكتب السكربت اللي لما تدوس عليه يحط الـ iframe مكانه ويشغّله، وقارن الـ Network تاني قبل الضغط.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** فيديو هيرو [[<video autoplay loop src="/hero.mp4">]] مبيشتغلش، ومفيش ولا error. صلّحه، واكتب الـ attributes الناقصة ليه.`, done: R`قبل: [[video.paused]] = [[true]] بعد التحميل. بعد [[muted]] و [[playsinline]] (و [[poster]] و [[aria-hidden="true"]] لأنه زينة): [[paused]] = [[false]]، وكتبت إن Chrome بيمنع autoplay بصوت في سكوت.`, sol: R`~~~html fixed.html
<video autoplay muted loop playsinline poster="/poster.jpg" aria-hidden="true" src="/hero.mp4"></video>
~~~

**كل attribute ليه شغله:**

- [[muted]]: الأهم. Chrome و Safari بيمنعوا تشغيل فيديو بصوت من غير ضغطة من المستخدم، بس بيسمحوا بالصامت.
- [[playsinline]]: على iPhone من غيره الفيديو بيفتح fullscreen أو مبيشتغلش في مكانه.
- [[poster]]: الصورة اللي بتبان قبل أول frame، ولو الـ autoplay اتمنع.
- [[aria-hidden="true"]]: فيديو زينة ملوش معنى لقارئ الشاشة.

**ليه مفيش error:** الـ attribute [[autoplay]] مجرد طلب، والمتصفح بيرفضه في سكوت. الـ error مش بيبان غير لو انت ناديت [[video.play()]] بإيدك، وقتها الـ Promise بيرفض بـ [[NotAllowedError]].

**الغلطة الشائعة:** الفيديو بيشتغل عندك وانت بتجرّب لأنك ضغطت في الصفحة قبلها أو بتعمل reload (Chrome بيحسب تفاعلك مع الموقع)، فتفتكر إنه سليم، وعند زائر جديد واقف. جرّب في Incognito.

~~~text الناتج
قبل (autoplay loop بس):
video.paused = true ، currentTime = 0

بعد muted و playsinline:
video.paused = false ، currentTime = 0.88 بعد 900ms

ولو ناديت play() من غير muted ومن غير ضغطة:
NotAllowedError: play() failed because the user didn't interact with the document first.
~~~

(اتقاس في Chrome بـ [[--autoplay-policy=document-user-activation-required]]، وده اللي زائر جديد بيقابله.)` },
            { lvl: 'تطبيق', t: R`**ابني:** فيديو خلفية للهيرو بزرار «إيقاف/تشغيل» عليه [[aria-pressed]]، ولو المستخدم مفعّل [[prefers-reduced-motion: reduce]] الفيديو ميشتغلش لوحده ويبان الـ poster.`, done: R`من DevTools › Rendering مع [[reduce]]: [[video.paused]] = [[true]] والـ poster ظاهر. من غيره بيشتغل، والزرار بيوقّفه ويغيّر [[aria-pressed]]، والزرار بيتوصل بالـ Tab وليه اسم.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>هيرو بفيديو خلفية</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  .hero { position: relative; isolation: isolate; display: grid; place-items: center;
          min-height: 60vh; color: #fff; background: #0b1120; overflow: hidden; }
  .hero video { position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; object-fit: cover; }
  .hero h1 { margin: 0; padding: 1rem; text-align: center; text-shadow: 0 1px 4px #000; }
  #toggle { position: absolute; inset-block-end: 1rem; inset-inline-end: 1rem; min-block-size: 2.75rem;
            padding-inline: 1rem; border: 0; border-radius: .5rem; background: #fff; color: #0b1120; font: inherit; }
</style>
</head>
<body>
<section class="hero">
  <video id="bg" muted loop playsinline preload="metadata" poster="poster.jpg" aria-hidden="true" tabindex="-1">
    <source src="hero.mp4" type="video/mp4">
  </video>
  <h1>قهوة مختصة بتتحمّص كل أسبوع</h1>
  <button id="toggle" type="button" aria-pressed="false">إيقاف الفيديو</button>
</section>
<script>
  const video = document.getElementById("bg");
  const btn = document.getElementById("toggle");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(isPaused) {
    btn.setAttribute("aria-pressed", String(isPaused));
    btn.textContent = isPaused ? "تشغيل الفيديو" : "إيقاف الفيديو";
  }
  show(reduce);
  if (!reduce) video.play().catch(() => show(true));

  btn.addEventListener("click", () => {
    if (video.paused) video.play(); else video.pause();
    show(video.paused);
  });
$__lt/script>
</body>
</html>
~~~

ملفات تجريبية لو معندكش فيديو:

~~~bash
ffmpeg -f lavfi -i testsrc2=size=640x360:rate=24 -t 10 -c:v libx264 -pix_fmt yuv420p hero.mp4
ffmpeg -i hero.mp4 -frames:v 1 poster.jpg
~~~

**الفكرة:** مفيش [[autoplay]] في الـ HTML خالص. الـ JavaScript هو اللي بيقرر: بيقرا [[matchMedia("(prefers-reduced-motion: reduce)")]]، ولو مش طالب حركة أقل بينادي [[video.play()]]. كده مع reduce الفيديو عمره ما بيبدأ والـ [[poster]] يفضل ظاهر.

- [[aria-pressed]] بيقول للقارئ «الزرار ده مضغوط ولا لأ». هنا [[true]] = الفيديو واقف، وكلمة الزرار بتتغيّر مع القيمة. دالة [[show()]] هي المكان الوحيد اللي بيغيّر الاتنين، عشان ميتلخبطوش.
- [[.catch(() => show(true))]]: لو المتصفح منع التشغيل (وضع توفير الطاقة مثلًا)، الزرار يقول «تشغيل» مش «إيقاف».
- [[tabindex="-1"]] و [[aria-hidden="true"]] على الفيديو: زينة، والزرار هو أول وقفة في Tab.

**الغلطة الشائعة:** تحط [[autoplay]] في الـ HTML وبعدين توقّف الفيديو بـ JavaScript لو reduce. كده الفيديو بيتحرك لحظة قبل الـ script، واللي طلب حركة أقل شاف حركة.

~~~text الناتج
من غير reduce:
video.paused = false ، aria-pressed = "false" ، الزرار «إيقاف الفيديو»
Tab → الزرار (id=toggle) ، Enter → paused = true ، aria-pressed = "true" ، «تشغيل الفيديو»

مع reduce (Rendering › prefers-reduced-motion):
video.paused = true والـ poster ظاهر ، aria-pressed = "true"
Enter → paused = false (المستخدم طلب بنفسه، فمسموح)
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اكتب ملف [[intro.ar.vtt]] لـ ٣ جمل (من 0 لـ 2، ومن 2 لـ 5، ومن 5 لـ 8 ثواني)، وبعدين امسح أول سطر [[WEBVTT]] وشوف بيحصل إيه.`, done: R`بالملف السليم [[video.textTracks[0].cues.length]] = 3 والترجمة بتبان. من غير [[WEBVTT]]: [[cues.length]] = 0 و [[track.readyState]] = 3 (ERROR)، يعني الملف كله اترفض في سكوت.`, sol: R`~~~text intro.ar.vtt
WEBVTT

00:00:00.000 --> 00:00:02.000
أهلًا بيك في جولة المتجر.

00:00:02.000 --> 00:00:05.000
هنا بنحمّص القهوة كل صباح.

00:00:05.000 --> 00:00:08.000
وهنا بنغلّفها ونبعتها لك.
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>ترجمة</title></head>
<body>
<video id="v" src="hero.mp4" controls>
  <track id="t" default kind="subtitles" srclang="ar" label="عربي" src="intro.ar.vtt">
</video>
<script>
  setTimeout(() => {
    console.log(v.textTracks[0].cues?.length, t.readyState);
  }, 800);
$__lt/script>
</body>
</html>
~~~

شغّلها من سيرفر ([[npx serve .]])، لأن المتصفح بيرفض يقرا ملف VTT من [[file://]].

**شكل الملف:** أول سطر لازم [[WEBVTT]] بالظبط، وبعده سطر فاضي، وكل جملة (cue) سطر توقيت [[بداية --> نهاية]] وبعده الكلام، وسطر فاضي بين كل cue والتاني.

**الأرقام بتعني إيه:** [[track.readyState]] فيه ٤ قيم: 0 لسه ماتحمّلش، و 1 بيتحمّل، و 2 جاهز، و 3 خطأ. لما تمسح [[WEBVTT]] المتصفح بيعتبر الملف كله مش VTT ويرفضه.

**الغلطة الشائعة:** تستنى رسالة في الكونسول. مفيش، الترجمة بس مبتظهرش. ولو الملف جاي من دومين تاني، الـ [[<video>]] محتاج [[crossorigin]] والسيرفر محتاج CORS.

~~~text الناتج
الملف السليم:         cues.length = 3 ، readyState = 2 (LOADED)
من غير سطر WEBVTT:    cues.length = 0 ، readyState = 3 (ERROR)
                      مفيش ولا رسالة error في الكونسول بخصوص الترجمة
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** iframe يوتيوب (أو خريطة) responsive بـ [[width: 100%; height: auto; aspect-ratio: 16 / 9]] بدل حيلة [[padding-top: 56.25%]] القديمة.`, done: R`على 360 ارتفاع الـ iframe 202.5 (= 360 × 9 ÷ 16)، وعلى 768 قد 432، ومفيش wrapper ولا [[position: absolute]] في الـ CSS، والـ iframe عليه [[title]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فيديو responsive</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  .embed { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0; }
</style>
</head>
<body>
<main>
<h1>جولة المحمصة</h1>
<iframe class="embed" src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
        title="جولة داخل المحمصة" loading="lazy" allowfullscreen></iframe>
</main>
</body>
</html>
~~~

بدّل [[VIDEO_ID]] برقم فيديو حقيقي عشان يشتغل.

**ليه الطريقة دي أحسن:** الحيلة القديمة كانت wrapper بـ [[padding-top: 56.25%]] و iframe جواه [[position: absolute]]، لأن الـ iframe مكانش بيعرف يحسب ارتفاعه من عرضه. دلوقتي [[aspect-ratio: 16 / 9]] بيعمل ده مباشرة، و [[height: auto]] بيسيبه يحسب.

- [[display: block]] بيشيل الفراغ الصغير اللي تحت العناصر الـ inline.
- [[border: 0]] بديل الـ [[frameborder]] القديم.
- [[title]] لازم: ده اسم الـ iframe لقارئ الشاشة، و axe بيطلّع [[frame-title]] لو ناقص.
- [[loading="lazy"]]: يوتيوب تقيل، فميتحمّلش غير لما يقرب.

**الغلطة الشائعة:** تكتب [[aspect-ratio]] وتسيب [[height="315"]] في الـ HTML اللي جاي من كود التضمين. نفس مشكلة الصور: الارتفاع المتحدد بيلغي النسبة.

~~~text الناتج
عرض الشاشة   iframe width   iframe height
360          360            202.5    (360 × 9 ÷ 16)
768          768            432
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** فيديو عندك (أو اعمله بـ ffmpeg) ٦٠ ثانية. حطه ٣ مرات بـ [[preload="none"]] و [[metadata]] و [[auto]]، وعدّ الـ bytes في Network قبل ما تدوس play.`, done: R`عندك ٣ أرقام: none قريب من صفر، و metadata أقل بكتير من auto، وكتبت ليه [[metadata]] الاختيار الافتراضي للفيديو اللي في نص الصفحة و [[none]] لفيديوهات كتير في صفحة واحدة.`, sol: R`~~~bash
# فيديو تجربة 60 ثانية بصوت، حوالي 4.3MB
ffmpeg -f lavfi -i testsrc2=size=640x360:rate=24 -f lavfi -i sine=frequency=330 -t 60 -c:v libx264 -pix_fmt yuv420p -b:v 500k -c:a aac -b:a 64k -movflags +faststart v.mp4
~~~

~~~html index.html
<!doctype html>
<meta charset="utf-8">
<title>preload</title>
<!-- جرّب واحد في المرة، وخد نسخة باسم مختلف من الملف لكل تجربة عشان الكاش -->
<video preload="none" src="v.mp4" controls></video>
<!-- <video preload="metadata" src="v.mp4" controls></video> -->
<!-- <video preload="auto" src="v.mp4" controls></video> -->
~~~

افتح DevTools › Network، و Disable cache، وشغّلها من سيرفر محلي، ومتدوسش play.

**بيحصل إيه:**

- [[none]]: ولا byte. مفيش حتى مدة الفيديو، فالـ controls بتبان فاضية لحد ما حد يدوس.
- [[metadata]]: المفروض «المدة والمقاس وأول frame بس»، بس المتصفح بياخد قدر من الـ buffer معاها. في التجربة دي 1.2MB.
- [[auto]]: المتصفح بيبدأ يحمّل كمية كبيرة وكأن المستخدم هيتفرج.

**ليه [[metadata]] الافتراضي للفيديو في نص الصفحة:** الزائر بيشوف المدة وأول frame، والصفحة مش بتدفع تمن الفيديو كله. و [[none]] لصفحة فيها فيديوهات كتير، لأن حتى metadata مضروبة في ٢٠ فيديو رقم كبير، وحط [[poster]] عشان متبقاش مربع أسود.

**الغلطة الشائعة:** تفتكر إن الأرقام ثابتة. Chrome بيغيّر كمية الـ buffer حسب النت، و [[-movflags +faststart]] بيفرق كمان (من غيره الـ metadata في آخر الملف فبيطلب طلبات زيادة).

~~~text الناتج
الملف كله: 4,279,184 byte

preload     الـ bytes قبل play     readyState     اللي اتخزّن (ثانية)
none        0                     0              0
metadata    1,245,184             4              17.5
auto        3,145,728             4              44.1

(سيرفر محلي من غير throttling، بعد 3 ثواني من الفتح)
~~~` },
          ],
          deep: {
            why: R`iframe يوتيوب واحد بيحمّل مئات الـ KB من JavaScript قبل ما حد يدوس play، وبيبطّأ الصفحة حتى لو محدش هيتفرج. والفيديو من غير poster بيبان مربع أسود. والفيديو من غير ترجمة مش مفهوم للصم، ولا لأي حد فاتح الموبايل في مواصلات من غير سماعة.`,
            how: R`الـ [[<source>]] جوه video زي picture: المتصفح ياخد أول نوع يعرف يشغّله. [[preload="none"]] مبيحمّلش حاجة، و [[metadata]] بيحمّل المدة وأول frame بس، و [[auto]] ممكن يحمّل كتير.

سياسة الـ autoplay: المتصفح بيسمح بالتشغيل التلقائي لو الفيديو [[muted]] (أو المستخدم اتفاعل مع الموقع قبل كده). و [[playsinline]] لـ iOS Safari. والفيديو اللي بيشتغل لوحده أكتر من 5 ثواني لازم يبقى فيه طريقة توقفه (WCAG)، وتحترم [[prefers-reduced-motion]] (متشغلوش لوحده).

ملف الـ VTT نص عادي: أول سطر [[WEBVTT]]، وبعدين لكل جملة سطر وقت [[00:00.000 --> 00:03.000]] وتحته الكلام. و [[kind="captions"]] (كل الصوت مكتوب) غير [[subtitles]] (ترجمة للغة تانية). ولو الـ VTT على domain تاني، الـ video محتاج [[crossorigin]] والسيرفر يبعت CORS.

الـ facade: زرار بصورة الفيديو من [[i.ytimg.com]]، ولما يتضغط تعمل iframe بـ [[?autoplay=1]] وتحطه مكانه. فيه مكتبة جاهزة اسمها [[lite-youtube-embed]]. و [[youtube-nocookie.com]] بيقلل الـ cookies لحد ما المستخدم يشغّل. وفي الحالتين الـ iframe محتاج [[title]] عشان قارئ الشاشة يعرف هو إيه.`,
            when: R`فيديو بتاعك (شرح، إعلان): [[<video>]] بـ controls و poster و captions. خلفية للهيرو: muted autoplay loop playsinline وقصير وخفيف، ومعاه زرار إيقاف. فيديو يوتيوب في صفحة فيها كذا فيديو أو في الـ landing: facade دايمًا.`,
            mistakes: R`autoplay من غير muted فمبيشتغلش ومفيش أي error. نسيان playsinline فالآيفون يفتحه full screen. فيديو 50MB في الهيرو على موبايل. iframe من غير title. 10 iframes يوتيوب في صفحة واحدة. فيديو خلفية ملوش زرار إيقاف ومبيحترمش reduced motion. وترجمة محروقة في الفيديو نفسه بدل track (مبتتكبرش ومبتتقفلش ومبتتدوّرش).`
          },
          teach: R`## ٣ طرق تحط فيديو في صفحة

فيديو بتاعك بأزرار تحكم، وفيديو خلفية بيشتغل لوحده، وفيديو يوتيوب. عشان نجرّب بجد، عملنا بـ ffmpeg فيديو تجربة 1280 × 720 مدته ٦ ثواني بصيغتين (WebM و MP4)، وصورة poster، وملف ترجمة، وفتحنا المثال في Chrome. وقرينا حالة كل فيديو من JavaScript: [[currentSrc]] (الملف اللي اختاره)، و [[paused]] (واقف؟)، و [[duration]] (المدة بالثواني).

---

## ١. الفيديو العادي

~~~text index.html
<video controls preload="metadata" poster="/video/intro.jpg" width="1280" height="720">
  <source src="/video/intro.webm" type="video/webm">
  <source src="/video/intro.mp4" type="video/mp4">
  <track kind="captions" src="/video/intro.ar.vtt" srclang="ar" label="عربي" default>
</video>
~~~

- [[controls]]: أزرار التشغيل والصوت والوقت بتاعة المتصفح.
- [[poster]]: صورة بتظهر لحد ما المستخدم يشغّل.
- [[preload="metadata"]]: حمّل المعلومات (المدة والمقاس) بس.
- [[width]] و [[height]]: النسبة، عشان يحجز المكان.
- [[<source>]]: زي picture، المتصفح بياخد أول [[type]] يعرف يشغّله. Chrome اختار [[/video/intro.webm]].
- [[<track kind="captions">]]: ملف ترجمة. [[srclang]] لغته، و [[label]] اسمه في القايمة، و [[default]] = مفعّل من الأول.

~~~text الناتج
currentSrc: /video/intro.webm   paused: true   duration: 6.008
textTracks[0]: captions، عربي، ar، mode: showing، 2 cues
~~~

[[showing]] = الترجمة ظاهرة، و 2 cues = الجملتين اللي في الملف.

### ملف الـ VTT

~~~text intro.ar.vtt
WEBVTT

00:00.000 --> 00:03.000
أهلًا، ده فيديو تجربة

00:03.000 --> 00:06.000
وده السطر التاني
~~~

أول سطر لازم [[WEBVTT]]. وكل جملة (اسمها cue) سطر وقت [[من --> لحد]] بالدقايق والثواني، وتحته الكلام، وسطر فاضي بينها.

### [[preload]] بيفرق قد إيه؟

جربنا فيديو WebM مدته 60 ثانية وحجمه حوالي 8 ميجا، وعدّينا الـ bytes اللي السيرفر المحلي بعتها في أول ٤ ثواني من غير ما حد يدوس play:

| preload | اللي اتبعت | المدة معروفة؟ |
|---|---|---|
| [[none]] | ولا byte | لأ (NaN) |
| [[metadata]] | حوالي 1.4 ميجا (أول 7.6 ثانية) | آه، 60 |
| [[auto]] | حوالي 5.5 ميجا (أول 26 ثانية) | آه، 60 |

يعني Chrome مع metadata بيحمّل حتة صغيرة من الأول مش المعلومات بس، بس أقل بكتير من auto.

## ٢. فيديو الخلفية

~~~text index.html
<video autoplay muted loop playsinline poster="/hero.jpg" aria-hidden="true" src="/hero.mp4"></video>
~~~

- [[autoplay]]: يشتغل لوحده. [[muted]]: من غير صوت. [[loop]]: يعيد لما يخلص.
- [[playsinline]]: على iPhone يشتغل مكانه في الصفحة مش full screen.
- [[aria-hidden="true"]]: قارئ الشاشة يتجاهله، لأنه زينة.

قارنّاه بنفس الفيديو بـ [[autoplay]] من غير [[muted]]:

| | paused بعد التحميل |
|---|---|
| [[autoplay muted]] | false (شغال) |
| [[autoplay]] لوحده | true (Chrome منعه) |

ومفيش أي error في الـ Console: الفيديو بيفضل واقف وخلاص.

## ٣. يوتيوب: iframe ضد facade

~~~text index.html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="شرح المنتج في دقيقتين" width="560" height="315" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
~~~

- [[<iframe>]] صفحة جوه صفحتك. [[title]] اسمها لقارئ الشاشة.
- [[loading="lazy"]]: متتحمّلش غير لما تقرب من الشاشة.
- [[allow]]: الصلاحيات اللي الصفحة اللي جوه تاخدها (تشغيل تلقائي، وفيديو محمي، وصورة جوه صورة).

~~~text index.html
<button type="button" class="yt-facade" data-id="VIDEO_ID" aria-label="شغّل: شرح المنتج في دقيقتين" style="background-image: url(https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg)">▶</button>
~~~

الـ facade زرار عادي خلفيته صورة الفيديو من [[i.ytimg.com]]، و [[data-id]] فيه رقم الفيديو، و [[aria-label]] اسم الزرار.

جربنا الاتنين بفيديو يوتيوب حقيقي، وعدّينا الـ requests في أول ٦ ثواني:

| | requests | الحجم تقريبًا |
|---|---|---|
| iframe عادي (الفيديو في الشاشة) | 15 (من 7 domains) | 1164 KB |
| facade قبل الضغط | 2 (الصفحة والصورة) | 24 KB |

### الـ solCode: إزاي الـ facade بيتحول iframe

- [[document.addEventListener('click', ...)]]: اسمع أي ضغطة في الصفحة.
- [[e.target.closest('.yt-facade')]]: الضغطة كانت على الزرار أو جواه؟ لو لأ [[return]].
- [[document.createElement('iframe')]]: اعمل iframe جديد.
- [[iframe.src = ...]]: الرابط مبني بـ template string: [[btn.dataset.id]] بيقرا [[data-id]]، و [[?autoplay=1]] = اشتغل على طول.
- [[title]] من [[aria-label]]، و [[allow]] و [[allowFullscreen]] والمقاس زي الـ iframe العادي.
- [[btn.replaceWith(iframe)]]: حط الـ iframe مكان الزرار.
- [[iframe.focus()]]: الـ focus كان على الزرار اللي اتشال، فحطه على الـ iframe عشان مستخدم الكيبورد ميتوهش.

بعد ما ضغطنا: الـ iframe اتعمل بالرابط [[...embed/VIDEO_ID?autoplay=1]] والـ title صح، و [[document.activeElement]] (العنصر اللي عليه الـ focus) بقى [[IFRAME]].

## الخلاصة

| الحالة | لازم |
|---|---|
| فيديو بتاعك | [[controls]] و [[poster]] و [[preload="metadata"]] و [[<track>]] |
| فيديو خلفية | [[autoplay muted loop playsinline]] و [[aria-hidden]] |
| يوتيوب | [[title]] و [[loading="lazy"]]، وأحسن facade |

- autoplay من غير muted بيتمنع في سكوت.`,
          lines: [
            "فيديو عادي: أزرار تحكم، ويحمّل المدة بس، وصورة لحد ما يشتغل، ومقاس عشان يحجز المكان.",
            "WebM الأول (أصغر غالبًا).",
            R`MP4 للمتصفحات اللي مبتشغّلش WebM (آخر احتمال قبل ما الفيديو ميشتغلش).`,
            R`الترجمة: ملف VTT بالعربي، و [[default]] مفعّلة من الأول.`,
            R`قفلة الـ [[<video>]] الأول، وبعده فيديو الخلفية.`,
            R`فيديو خلفية: بيشتغل لوحده لأنه [[muted]]، ومش full screen على الآيفون، ومخفي عن قارئ الشاشة لأنه زينة.`,
            R`يوتيوب عادي: [[nocookie]]، و [[title]] للـ accessibility، و [[lazy]] ميتحملش غير لما يقرب.`,
            "الـ facade: زرار بصورة الفيديو، والـ iframe بيتعمل بس لما يتضغط."
          ],
          sol: R`الـ iframe العادي: حوالي 15 request من كذا domain (JavaScript و CSS و fonts من يوتيوب) وحجم حوالي 1.1MB قبل ما تدوس play (ده اللي اتقاس في Chrome على فيديو حقيقي). الـ facade قبل الضغط: request واحد (الصورة، عشرات الـ KB). بعد الضغط: الـ iframe بيتحمّل ويشتغل على طول لأن فيه [[autoplay=1]].

لو الفيديو مشتغلش لوحده بعد الضغط: اتأكد إن [[allow]] فيه [[autoplay]]. ولو الـ focus ضاع بعد ما الزرار اتشال: حط الـ focus على الـ iframe الجديد.`,
          solCode: R`document.addEventListener('click', (e) => {
  const btn = e.target.closest('.yt-facade');
  if (!btn) return;
  const iframe = document.createElement('iframe');
  iframe.src = $__bthttps://www.youtube-nocookie.com/embed/$__{btn.dataset.id}?autoplay=1$__bt;
  iframe.title = btn.getAttribute('aria-label');
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.width = 560;
  iframe.height = 315;
  btn.replaceWith(iframe);
  iframe.focus();
});`
        },
        {
          cmd: "SVG",
          title: "SVG: inline ولا img؟ و currentColor و svgo",
          desc: R`[[<img src="logo.svg">]]: سهل وبيتكاش، بس الـ CSS بتاع صفحتك مش بيوصل جواه، فمتقدرش تغيّر لونه مع الـ hover أو الـ dark mode.

[[<svg>]] inline في الـ HTML: الـ CSS بيوصل لكل جزء فيه، و [[fill="currentColor"]] أو [[stroke="currentColor"]] بيخليه ياخد لون الكلام اللي حواليه ([[color]]). ده اللي lucide-react بيعمله.

وأي SVG طالع من Figma أو Illustrator فيه زبالة (metadata، و groups فاضية، وأرقام بـ 6 decimals). [[svgo]] بينضّفه وغالبًا بيصغّره للنص أو أقل.`,
          example: R`<img src="/logo.svg" alt="متجر النور" width="120" height="32">
<button type="button" class="icon-btn" aria-label="السلة">
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
</button>
<svg role="img" aria-labelledby="chart-t" viewBox="0 0 100 40"><title id="chart-t">المبيعات زادت 20% الشهر ده</title>...</svg>
// styles.css
.icon-btn { color: var(--color-gray-700); }
.icon-btn:hover { color: var(--color-brand); }`,
          try: R`صدّر أيقونة من Figma (أو خد أي SVG) وشغّل [[npx svgo icon.svg -o icon.min.svg]] وقارن الملفين. وبعدين حط نفس الأيقونة مرة كـ [[<img>]] ومرة inline جوه زرار عليه [[color: red]]: أنهي واحدة اتلوّنت؟`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[<svg width="48" height="48"><circle cx="12" cy="12" r="10"/></svg>]] اترسمت صغيرة في ركن الـ 48 بدل ما تملاها. صلّحها بخاصية واحدة.`, done: R`قبل: عرض الدايرة 20px. بعد [[viewBox="0 0 24 24"]]: عرضها 40px، لأن الرسمة بقت متحسوبة على لوحة 24 بتتمطّ على الـ 48.`, sol: R`~~~html fixed.html
<svg width="48" height="48" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
~~~

**الفرق:** [[width]] و [[height]] مقاس الـ SVG على الشاشة. و [[viewBox="0 0 24 24"]] مقاس اللوحة اللي الرسمة اترسمت عليها. لما الاتنين يختلفوا، الرسمة بتتكبّر عشان اللوحة تملا الشاشة: 48 ÷ 24 = ضعف.

من غير [[viewBox]]، كل وحدة في الرسمة = 1px، فدايرة نص قطرها 10 قطرها 20px، في ركن صندوق 48.

**الغلطة الشائعة:** تصلّحها بتغيير [[r]] و [[cx]] و [[cy]] لأرقام أكبر. ده بيخلي كل مقاس محتاج رسمة تانية، و [[viewBox]] بيخلي نفس الرسمة تشتغل بأي مقاس.

~~~text الناتج
قبل: عرض الدايرة 20px (في ركن الـ 48)
بعد: عرض الدايرة 40px (ماليّة الـ 48 مع هامش 4 من كل ناحية)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** sprite فيه ٦ أيقونات متخيلة بـ [[<symbol id="i-cart" viewBox="0 0 24 24">]] جوه [[<svg style="display: none">]] في أول الـ body، وكل زرار بيستخدم [[<svg><use href="#i-cart"/></svg>]] و [[stroke="currentColor"]].`, done: R`الستة أزرار بتتلوّن مع [[color]] بتاع الزرار (hover بيغيّرهم كلهم)، وكل زرار ليه [[aria-label]] والـ svg جواه [[aria-hidden="true"]]، وتعريف كل أيقونة موجود مرة واحدة بس في الـ HTML.`, sol: R`~~~html icons.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>sprite أيقونات</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .bar { display: flex; flex-wrap: wrap; gap: .5rem; }
  .icon-btn { display: grid; place-items: center; inline-size: 3rem; block-size: 3rem; padding: 0;
              border: 1px solid currentColor; border-radius: .5rem; background: none; color: #334155; cursor: pointer; }
  .icon-btn:hover { color: #0f766e; }
  .icon-btn:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
  .icon-btn svg { inline-size: 1.5rem; block-size: 1.5rem; fill: none; stroke: currentColor;
                  stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
</style>
</head>
<body>
<svg style="display: none">
  <symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 13h11l2-9H6"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20S3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12Z"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 5-7 8-7s7 2 8 7"/></symbol>
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 17V10a6 6 0 0 1 12 0v7l2 2H4Z"/><path d="M10 21h4"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19"/></symbol>
</svg>

<main>
<h1>أيقونات المتجر</h1>
<div class="bar">
  <button class="icon-btn" type="button" aria-label="السلة"><svg aria-hidden="true"><use href="#i-cart"/></svg></button>
  <button class="icon-btn" type="button" aria-label="المفضلة"><svg aria-hidden="true"><use href="#i-heart"/></svg></button>
  <button class="icon-btn" type="button" aria-label="بحث"><svg aria-hidden="true"><use href="#i-search"/></svg></button>
  <button class="icon-btn" type="button" aria-label="حسابي"><svg aria-hidden="true"><use href="#i-user"/></svg></button>
  <button class="icon-btn" type="button" aria-label="التنبيهات"><svg aria-hidden="true"><use href="#i-bell"/></svg></button>
  <button class="icon-btn" type="button" aria-label="قفل"><svg aria-hidden="true"><use href="#i-close"/></svg></button>
</div>
</main>
</body>
</html>
~~~

**ليه شغال:**

- [[<symbol>]] تعريف مبيترسمش لوحده، ومعاه [[viewBox]] بتاعه. و [[<use href="#i-cart">]] بيرسم نسخة منه في أي مكان، فكل أيقونة متعرّفة مرة واحدة ومستخدمة قد ما تحب.
- [[stroke: currentColor]] معناها «خد لون النص بتاع العنصر». الزرار [[color]] بتاعه يتغيّر في الـ hover، فالأيقونة تتغيّر معاه من غير سطر CSS زيادة.
- [[aria-label]] على الزرار هو الاسم، و [[aria-hidden="true"]] على الـ svg عشان القارئ ميحاولش يقراها.

**ملاحظة مهمة:** [[hidden]] مبيخبيش [[<svg>]]. الـ attribute ده بتاع عناصر HTML، والـ svg عنصر من namespace تاني، فـ Chrome سايبه [[display: inline]] وبياخد مكان 300 × 150 فاضي فوق الصفحة. عشان كده هنا [[style="display: none"]]، و [[<use>]] لسه بيشتغل عادي.

**الغلطة الشائعة:** تحط [[stroke="#333"]] أو [[fill="#333"]] جوه الـ [[<path>]]. اللون المكتوب على العنصر نفسه بيخلي الأيقونة متسمعش لـ currentColor، فتفضل بنفس اللون في الـ hover.

~~~text الناتج
stroke قبل الـ hover: rgb(51, 65, 85) ، وبعده: rgb(15, 118, 110)
symbol: 6 ، use: 6 ، paths برا الـ symbols: 0
الـ sprite حسابه display: none ومش واخد مكان (بـ hidden كان فيه حوالي 150px فاضيين فوق)
Tab الأول: focus على الزرار «السلة»

ariaSnapshot:
- button "السلة"
- button "المفضلة"
- button "بحث"
- button "حسابي"
- button "التنبيهات"
- button "قفل"
axe: صفر مشاكل.
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** حلقة تقدّم SVG: دايرة [[r="40"]] و [[stroke-dasharray]] = محيطها و [[stroke-dashoffset]] محسوب من [[--p]] بـ [[calc()]]، وملفوفة [[rotate(-90deg)]] عشان تبدأ من فوق، والرقم في النص.`, done: R`مع [[--p: 75]] الحلقة مكمّلة ٣ أرباع من فوق مع عقارب الساعة، و [[getComputedStyle]] بيقول dasharray ≈ 251.33 و dashoffset ≈ 62.83. ولما تغيّر [[--p]] من DevTools الحلقة بتتغيّر من غير JavaScript.`, sol: R`~~~html ring.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>حلقة تقدّم</title>
<style>
  body { margin: 2rem; font-family: system-ui, sans-serif; }
  .ring { --p: 75; --c: calc(2 * pi * 40); position: relative; inline-size: 10rem; block-size: 10rem; }
  .ring svg { display: block; inline-size: 100%; block-size: 100%; rotate: -90deg; }
  .ring circle { fill: none; stroke-width: 10; }
  .track { stroke: #e2e8f0; }
  .bar { stroke: #0f766e; stroke-linecap: round;
         stroke-dasharray: var(--c);
         stroke-dashoffset: calc(var(--c) * (100 - var(--p)) / 100);
         transition: stroke-dashoffset .3s; }
  .num { position: absolute; inset: 0; display: grid; place-items: center; font-size: 1.75rem; font-weight: 700; }
</style>
</head>
<body>
<main>
<h1>تقدّم الدورة</h1>
<div class="ring" role="img" aria-label="التقدم 75 في المية">
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle class="track" cx="50" cy="50" r="40"/>
    <circle class="bar" cx="50" cy="50" r="40"/>
  </svg>
  <span class="num" aria-hidden="true">75%</span>
</div>
</main>
</body>
</html>
~~~

غيّر [[--p]] من DevTools على [[.ring]] وشوف الحلقة بتتحرك.

**الحساب:** محيط الدايرة [[2 × π × 40]] ≈ 251.33.

- [[stroke-dasharray: var(--c)]] بيقول «الخط قطعة طولها المحيط كله، وبعدها فراغ قد المحيط».
- [[stroke-dashoffset]] بيزحلق القطعة. لو الـ offset = المحيط، القطعة كلها برا والحلقة فاضية. لو صفر، الحلقة مليانة.
- فالـ offset المطلوب هو الجزء الفاضي: [[c × (100 - p) / 100]]. مع 75: ربع المحيط، 62.83.
- [[rotate: -90deg]]: الدايرة في SVG بتبدأ من الساعة ٣، فبنلفّها عشان تبدأ من فوق.
- [[calc(2 * pi * 40)]]: الثابت [[pi]] جوه [[calc()]] بيغنيك عن كتابة الرقم.

الرقم في النص [[aria-hidden]]، والمعنى كله في [[role="img"]] و [[aria-label]] على الأب، عشان القارئ يقول جملة واحدة.

**الغلطة الشائعة:** تعكس الحساب وتكتب [[c × p / 100]]، فمع 75 يطلع ربع الحلقة بس مليان. الـ offset هو اللي **مش** مرسوم.

~~~text الناتج
--p: 75
stroke-dasharray  = calc(251.327px)
stroke-dashoffset = calc(62.8319px)
الحلقة ٣ أرباع مبتدية من فوق مع عقارب الساعة

--p: 30 من DevTools
stroke-dashoffset = calc(175.929px)   (من غير JavaScript)
axe: صفر مشاكل.
~~~` },
            { lvl: 'تطبيق', t: R`**أشكال:** خط تحت كلمة في عنوان كأنه مرسوم بالقلم: [[<path pathLength="1">]] و [[stroke-dasharray: 1]] و [[stroke-dashoffset]] من 1 لـ 0 بـ animation، ومعاه [[prefers-reduced-motion]].`, done: R`الخط بيترسم من البداية للنهاية مرة واحدة لما الصفحة تفتح، ومع [[reduce]] في Rendering بيبان مرسوم على طول من غير حركة، وفي rtl بيترسم من اليمين (اعكس الـ path أو استخدم [[scale: -1 1]]).`, sol: R`~~~html underline.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>خط بالقلم</title>
<style>
  body { margin: 2rem; font-family: system-ui, sans-serif; }
  h1 { font-size: 2.5rem; }
  .mark { position: relative; display: inline-block; }
  .mark svg { position: absolute; inset-inline: 0; inset-block-end: -.5em; inline-size: 100%; block-size: .5em;
              fill: none; stroke: #e11d48; stroke-width: 4; stroke-linecap: round; overflow: visible; }
  /* الـ path بيبدأ من شمال، فنقلبه في rtl عشان الرسم يبدأ من اليمين */
  :dir(rtl) .mark svg { scale: -1 1; }
  .mark path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw .9s ease-out .2s forwards; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @media (prefers-reduced-motion: reduce) {
    .mark path { animation: none; stroke-dashoffset: 0; }
  }
</style>
</head>
<body>
<h1>أحسن <span class="mark">قهوة<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 7 C 25 2, 60 2, 98 6"/></svg></span> في البلد</h1>
</body>
</html>
~~~

**ليه شغال:**

- [[pathLength="1"]] بيقول للمتصفح «اعتبر طول المسار 1»، مهما كان طوله الحقيقي. كده مش محتاج تحسب الطول.
- [[stroke-dasharray: 1]]: قطعة طولها المسار كله.
- [[stroke-dashoffset: 1]]: القطعة مزحلقة برا، فمفيش حاجة باينة. والـ animation بينزّلها لـ 0، فالخط بيترسم من أوله لآخره.
- [[forwards]] بيخلي الخط يفضل مرسوم بعد ما الحركة تخلص.
- [[preserveAspectRatio="none"]] عشان الرسمة تتمط على عرض الكلمة، أي كلمة.

**الـ rtl:** المسار مرسوم من الشمال لليمين، فالقلم في العربي هيمشي عكس اتجاه القراية. [[:dir(rtl) .mark svg { scale: -1 1; }]] بيعمل مراية للـ svg كله، فالرسم يبدأ من اليمين.

**reduce:** مش كفاية نلغي الحركة. لو لغيتها بس، الـ [[stroke-dashoffset: 1]] يفضل والخط مبيبانش خالص. لازم نرجّعها 0.

**الغلطة الشائعة:** تنسى [[pathLength]] وتكتب [[stroke-dasharray: 1]]، فيطلع خط منقّط بنقط طولها بكسل، مش خط بيترسم.

~~~text الناتج
stroke-dashoffset عند الفتح: 1px (الخط مش باين)
stroke-dashoffset بعد 1.4 ثانية: 0px (مرسوم تحت كلمة «قهوة»)
scale على الـ svg في rtl: -1 1
عرض الـ svg = عرض الكلمة بالظبط: 80.16px

مع reduce:
stroke-dashoffset = 0px ، document.getAnimations().length = 0 (مرسوم من غير حركة)
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[npx svgo --help]] لاقي الـ flag اللي بيشغّل التنضيف كذا لفة لحد ما الملف ميصغرش تاني، والـ flag اللي بيشتغل على فولدر كامل. وجرّبهم على ٥ أيقونات.`, done: R`لقيت [[--multipass]] و [[-f]] (أو [[--folder]])، وعندك جدول بحجم كل أيقونة قبل وبعد، ولسه كل أيقونة فيها [[viewBox]].`, sol: R`~~~bash
npx svgo --help
# الفولدر كله، والنتيجة في فولدر تاني، بكذا لفة
npx svgo -f icons-in -o icons-out --multipass
~~~

**الإجابة:** [[--multipass]] («Pass over SVGs multiple times to ensure all optimizations are applied») و [[-f]] أو [[--folder]] («Input folder, optimize and rewrite all *.svg files»). ومن غير [[-o]] بيكتب فوق الملفات الأصلية، فاديله فولدر تاني أو اعمل commit الأول.

**ليه كذا لفة:** تنضيف بيفتح الباب لتنضيف تاني. مثلًا مسح [[<g>]] فاضي بيخلّي attribute يتنقل للعنصر، فتطلع فرصة تقصير ماكانتش موجودة.

**الغلطة الشائعة:** تستخدم إعداد قديم بيمسح [[viewBox]]، فالأيقونة تبطل تتكبّر. في svgo 4 [[removeViewBox]] مش في الـ preset الافتراضي، وبرضه اتأكد بـ grep بعد التنضيف.

~~~bash
grep -L viewBox icons-out/*.svg    # المفروض ميطبعش حاجة
~~~

~~~text الناتج
الملف        قبل    لفة واحدة    --multipass    viewBox
bell.svg     891    260          258            موجود
cart.svg     957    396          396            موجود
heart.svg    860    276          276            موجود
search.svg   811    309          309            موجود
user.svg     871    321          321            موجود

(بالـ byte، svgo 4.1.0، أيقونات فيها metadata من برنامج رسم.)
الفرق بين لفة ولفات صغير هنا، بس في bell.svg طلعت 2 byte زيادة.
~~~` },
          ],
          deep: {
            why: R`الأيقونات في كل حتة: أزرار، ومنيو، وحالات. لو كل لون محتاج ملف SVG منفصل، هيبقى عندك 4 نسخ من كل أيقونة (عادي، و hover، و dark، و disabled). مع currentColor أيقونة واحدة بتاخد لون أي مكان تتحط فيه.`,
            how: R`الـ [[<img>]] بيعامل الـ SVG كصورة منفصلة: document لوحده، والـ CSS و JavaScript بتوع الصفحة مش بيوصلوله، والمتصفح بيكاشه زي أي صورة. الـ inline جزء من الـ DOM: [[:hover]] و CSS variables و [[currentColor]] كلهم بيشتغلوا، بس بيتقل حجم الـ HTML ومبيتكاش لوحده.

[[currentColor]] معناها «قيمة [[color]] في العنصر ده»، وبتتورث من الأب. فلو الـ path عليه [[fill="currentColor"]] والزرار [[color: red]]، الأيقونة حمرا.

الـ accessibility: أيقونة جوه زرار أو جنب كلام يبقى [[aria-hidden="true"]] والاسم على الزرار. SVG بيعني حاجة لوحده (رسم بياني، لوجو inline) ياخد [[role="img"]] واسم من [[<title>]] أو [[aria-label]].

svgo (نسخة 4) بيشيل الـ XML declaration والتعليقات والـ metadata والـ groups الفاضية ويقصّر الأرقام، وبيسيب [[viewBox]] و [[<title>]] افتراضيًا. والـ [[fill="#000"]] بيشيله لأن الأسود هو الافتراضي، وساعتها الأيقونة inline بتبقى سودا مش currentColor، فحط [[fill="currentColor"]] على الـ [[<svg>]] نفسه، أو اعمل [[svgo.config.mjs]] فيه plugin [[convertColors]] بـ [[currentColor: true]].

وفي React: الأيقونات من مكتبة (lucide-react) أو ملفات بتتحول لـ components بـ SVGR. واللوجو الكبير أو الرسومات التوضيحية [[<img>]] أحسن عشان الكاش.`,
            when: R`أيقونات بتتلوّن أو بتتحرك: inline أو مكتبة أيقونات. لوجو ثابت، ورسومات كبيرة، وصور مقالات: [[<img>]]. وأي SVG جاي من برنامج تصميم: svgo قبل ما يدخل المشروع.`,
            mistakes: R`SVG من غير [[viewBox]] فمبيتكبرش ولا بيصغر صح. لون ثابت [[fill="#333"]] جوه الأيقونة فمبتتلونش. [[<img src="icon.svg">]] وتستغرب ليه [[color]] مش شغال. SVG inline تقيل (خريطة، رسمة 200KB) بيتكرر في كل صفحة. أيقونة لوحدها في زرار من غير اسم. و SVG جاي من مستخدمين بيتحط inline: ممكن يكون فيه [[<script>]] (XSS)، فنضّفه أو اعرضه كـ img.`
          },
          teach: R`## SVG صورة مكتوبة كـ كود

SVG (Scalable Vector Graphics) ملف نصي فيه أشكال: دواير وخطوط ومسارات بأرقام. عشان كده بيتكبر لأي مقاس من غير ما يبوظ. وتقدر تحطه بطريقتين: كصورة بـ [[<img>]]، أو تلزق الكود نفسه في الـ HTML (inline). جربنا الاتنين في Chrome على زرار لونه أحمر، وقرينا لون الخط من [[getComputedStyle]] ومن صورة الشاشة نفسها.

---

## ١. اللوجو كـ img

~~~text index.html
<img src="/logo.svg" alt="متجر النور" width="120" height="32">
~~~

ملف منفصل، المتصفح بيكاشه، و [[alt]] اسمه. بس هو document مقفول: الـ CSS بتاع الصفحة مش بيدخل جواه.

## ٢. الأيقونة inline جوه زرار

~~~text index.html
<button type="button" class="icon-btn" aria-label="السلة">
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
</button>
~~~

- [[aria-label="السلة"]]: اسم الزرار لقارئ الشاشة، لأن مفيش كلام جواه.
- [[viewBox="0 0 24 24"]]: الرسمة مرسومة على لوحة 24 × 24. أي أرقام جوه بتتحسب على اللوحة دي، و [[width]] و [[height]] المقاس على الشاشة. لو كبّرتهم لـ 48 الرسمة تكبر معاهم.
- [[fill="none"]]: الأشكال من جوه فاضية. [[stroke="currentColor"]]: الخط حواليها بلون [[color]] بتاع الأب. [[stroke-width="2"]]: سُمك الخط.
- [[aria-hidden="true"]]: قارئ الشاشة يتجاهل الرسمة، والاسم على الزرار.
- [[<circle cx="9" cy="20" r="1" />]]: دايرة مركزها (9، 20) ونص قطرها 1. دول عجلتين السلة.
- [[<path d="...">]]: [[d]] أوامر رسم: [[M1 1]] = روح للنقطة (1، 1)، و [[h4]] = خط أفقي 4، و [[l2.7 13.4]] = خط للنقطة دي بالنسبة للحالية، و [[a]] = قوس (الركن المدوّر)، و [[L]] = خط لنقطة، و [[H6]] = خط أفقي لحد x = 6.

## ٣. اللون من CSS

~~~text style.css
.icon-btn { color: var(--color-gray-700); }
.icon-btn:hover { color: var(--color-brand); }
~~~

(الـ [[// styles.css]] في المثال مجرد عنوان بيقول الحتة دي في ملف CSS.)

~~~text الناتج: stroke بتاع الـ path
عادي:          oklch(0.373 0.034 259.733)   (رمادي غامق)
وقت الـ hover:  rgb(255, 0, 0)               (لون البراند في التجربة)
~~~

الأيقونة ملهاش ولا قاعدة CSS، بس [[currentColor]] بيقرا [[color]] من الزرار.

## ٤. SVG بيعني حاجة لوحده

~~~text index.html
<svg role="img" aria-labelledby="chart-t" viewBox="0 0 100 40"><title id="chart-t">المبيعات زادت 20% الشهر ده</title>...</svg>
~~~

[[role="img"]] = عامله كصورة، و [[aria-labelledby="chart-t"]] = اسمك هو الكلام اللي في العنصر اللي id بتاعه [[chart-t]]، يعني الـ [[<title>]]. قرينا شجرة الـ accessibility من Chrome، والرسمة ظهرت كده:

~~~text الناتج
image: المبيعات زادت 20% الشهر ده
~~~

---

## التجربة الأولى: svgo على ملف من برنامج تصميم

عملنا أيقونة السلة بالشكل اللي Illustrator بيصدّره (فيها [[<?xml>]] وتعليق البرنامج و [[<metadata>]] و [[<g>]] جوه [[<g>]] و [[fill="#000000"]] وأرقام زي [[9.000000]])، وشغلنا:

~~~powershell
npx svgo icon.svg -o icon.min.svg
~~~

[[npx]] بيشغّل أداة من npm من غير ما تسطّبها global، و [[-o]] = output: اسم الملف الجديد.

~~~text الناتج
icon.svg:
Done in 11 ms!
0.915 KiB - 67% = 0.302 KiB
~~~

~~~text icon.min.svg
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" viewBox="0 0 24 24"><title>السلة</title><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path fill="none" stroke="#000" stroke-width="2" d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
~~~

- من 937 byte لـ 309: الـ xml والتعليق والـ metadata والـ g اتشالوا، و [[9.000000]] بقت [[9]]، والـ path اتكتب أقصر.
- [[viewBox]] و [[<title>]] لسه موجودين.
- [[fill="#000000"]] على الدواير اتشال (الأسود هو الافتراضي)، و [[stroke="#000"]] على الـ path فضل.

## التجربة التانية: مين بيتلوّن؟

حطينا ٣ زراير عليهم [[color: red]]، وقرينا الألوان:

| جوه الزرار | النتيجة المتقاسة |
|---|---|
| الأيقونة inline بـ [[currentColor]] | stroke = rgb(255, 0, 0)، والبكسلات على الشاشة حمرا |
| [[<img src="icon.min.svg">]] | البكسلات سودا (0، 0، 0) |
| icon.min.svg ملزوق inline | stroke = rgb(0, 0, 0) و fill الدواير rgb(0, 0, 0) |

الـ img مقفول على الـ CSS. والملف المنضّف حتى لو inline فضل أسود، لأن الألوان مكتوبة جواه ([[stroke="#000"]]) أو مش موجودة خالص (افتراضي أسود). عشان كده الـ solCode بيستخدم plugin [[convertColors]] بـ [[currentColor: true]] يحوّل أي لون ثابت لـ [[currentColor]]. جربناه على نفس الملف: الـ path طلع [[stroke="currentColor"]]، بس الدواير طلعت من غير [[fill]] خالص (الـ [[#000000]] اتشال قبل ما يتحوّل)، يعني هتفضل سودا. فضيف [[fill="currentColor"]] على الـ [[<svg>]] نفسه، والدواير هتورثه.

## الخلاصة

| | [[<img>]] | inline |
|---|---|---|
| الكاش | آه | لأ (جزء من الـ HTML) |
| CSS و [[currentColor]] | مش بيوصلوا | بيشتغلوا |
| مناسب لـ | لوجو، رسومات كبيرة | أيقونات بتتلوّن |

- أيقونة جوه زرار: [[aria-hidden="true"]] عليها والاسم على الزرار. SVG بيعني حاجة: [[role="img"]] واسم.
- أي SVG من برنامج تصميم: svgo الأول، وبعدين [[currentColor]] بدل الألوان الثابتة.`,
          lines: [
            R`لوجو ثابت: [[<img>]] بيتكاش، ومقاس، و alt.`,
            R`زرار أيقونة: الاسم «السلة» على الزرار نفسه لأن مفيش كلام جواه.`,
            R`الأيقونة inline: الخطوط بلون الكلام ([[currentColor]])، ومخفية عن قارئ الشاشة لأن الزرار ليه اسم.`,
            R`عجلتين السلة: دايرتين نص قطرهم 1 عند (9، 20) و (18، 20) على لوحة الـ 24.`,
            R`جسم السلة: مسار [[d]] بأوامر رسم (روح، وخط، وقوس)، وده اللي بيتلوّن بالـ stroke.`,
            R`قفلة الـ [[<svg>]]: الرسمة كلها جوه الزرار.`,
            R`قفلة الزرار، وبعده SVG بيعني حاجة لوحده.`,
            R`SVG بيعني حاجة لوحده: [[role="img"]] واسمه من الـ [[<title>]].`,
            "لون الأيقونة هو لون الزرار.",
            "في الـ hover الزرار بيتلوّن، والأيقونة معاه من غير أي CSS ليها."
          ],
          sol: R`على أيقونة تجربة، svgo طبع حاجة زي [[Done in 14 ms! 0.449 KiB - 65.4% = 0.155 KiB]]. الملف الجديد سطر واحد: من غير [[<?xml>]] ولا التعليق بتاع البرنامج ولا [[<metadata>]] ولا الـ [[<g>]]، والأرقام اتقصّرت ([[7.000]] بقت [[7]])، والـ [[viewBox]] و [[<title>]] لسه موجودين.

الـ inline جوه الزرار الأحمر اتلوّن أحمر (لو فيه [[currentColor]])، والـ img فضل بلونه الأصلي، لأن الـ CSS مش بيدخل جوه الـ img.

لو الـ inline فضل أسود: الأيقونة فيها [[fill]] بلون ثابت أو svgo شال [[fill="#000"]] فبقت على الافتراضي (أسود). حط [[fill="currentColor"]] على الـ [[<svg>]].`,
          solCode: R`// svgo.config.mjs: أي لون ثابت في الأيقونة يبقى currentColor
export default {
  plugins: ['preset-default', { name: 'convertColors', params: { currentColor: true } }],
};`
        }
      ]
    }
]);
