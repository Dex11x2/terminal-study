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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صورة بانوراما 1200 × 400 في صندوق 300 × 300. مع [[contain]]: الصورة هتترسم بمقاس كام، والفاضي فين وقد إيه؟ ومع [[cover]]: أنهي جزء هيتقص؟`, done: R`contain: الصورة 300 × 100 (صغرت لـ ربع)، وفاضي 100 فوق و 100 تحت. cover: الصورة اتكبّرت لـ 900 × 300 واتقص 300 من كل جنب، فالنص بس باين. وأكّدت بلقطة شاشة أو بلون أول وآخر سطر.` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة فريق لمكتبة متخيلة: ٨ كروت بصور مختلفة النسب (طولي وعرضي ومربع)، كل صورة [[aspect-ratio: 4 / 5]] و [[object-fit: cover]] و [[object-position: 50% 20%]]، والشبكة auto-fit.`, done: R`على 360 و 768 و 1280 كل الكروت في الصف نفس الارتفاع بالظبط (قيس [[height]] بتاع كل صورة)، ومفيش صورة متمطّطة، والوشوش باينة في الصور الطولية، ومفيش scroll أفقي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<img src="/a.jpg" width="800" height="600" style="width: 100%; aspect-ratio: 1">]] جوه كارت عرضه 400، والمفروض يبقى مربع. قيس الارتفاع وصلّح.`, done: R`قبل: الارتفاع 600 (الـ [[height]] اللي في الـ HTML كسب على الـ aspect-ratio). بعد [[height: auto]]: 400 × 400، ومن غير ما تمسح [[width]] و [[height]] من الـ HTML (لسه محتاجهم لحجز المكان).` },
            { lvl: 'تطبيق', t: R`**أشكال:** ألبوم صور رحلة متخيلة على شكل polaroid: [[<figure>]] بإطار أبيض وظل، والصورة مربعة [[cover]]، و [[figcaption]] تحت، وكل صورة متلفّة زاوية مختلفة بـ [[:nth-child]] و [[rotate]].`, done: R`كل الصور نفس المقاس رغم إن الملفات مختلفة، والكروت متلفّة بـ ٣ زوايا على الأقل، والـ caption مقري، ولما تقف على كارت بيتعدل ([[rotate: 0deg]]) ويكبر شوية من غير ما يزق اللي جنبه.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الصورة مرة [[<img>]] بـ [[object-fit: cover]] ومرة [[div]] بـ [[background-image]] و [[background-size: cover]]. قارن في DevTools: اسم العنصر في Accessibility tree، وهل [[loading="lazy"]] ينفع، وهل [[srcset]] ينفع.`, done: R`عندك جدول ٣ صفوف: الـ img ليه اسم (الـ alt) والـ div ملوش، والـ img بيدعم lazy و srcset والـ div لأ (محتاج [[image-set()]] و JavaScript)، والشكل على الشاشة واحد. وكتبت إمتى الـ background مقبول (زينة بس).` },
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** نفس الـ picture بتاع المثال بس الـ sources العامة (من غير [[media]]) جت **قبل** بتاعة الموبايل. على موبايل 390 أنهي ملف هيتحمّل؟ وبعدين شوف Network.`, done: R`اتحمّل [[hero-1600.avif]] أو [[hero-800.avif]] (صورة الديسكتوب العريضة) مش [[hero-mobile.avif]]، لأن المتصفح بياخد أول source ينفع، والعام بينفع دايمًا. ورجّعت الترتيب الصح.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[<img srcset="/c-400.jpg 400w, /c-800.jpg 800w, /c-1600.jpg 1600w" sizes="(min-width: 64rem) 33vw, 100vw">]]. أنهي ملف هيتحمّل على: 1280 بكثافة 1، و 1280 بكثافة 2، و 390 بكثافة 3، و 390 بكثافة 1؟ احسب وبعدين جرّب (DevTools › Device Toolbar بيغيّر الـ DPR).`, done: R`1280×1: الصورة 33vw ≈ 422 → [[c-800]]. 1280×2: 845 → [[c-1600]]. 390×3: 1170 → [[c-1600]]. 390×1: 390 → [[c-400]]. وده اللي اتحمّل فعلًا في Chrome (اقفل الكاش بين كل تجربة عشان المتصفح ممكن يستخدم ملف أكبر متكاش).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<picture><source type="image/avif" src="/hero.avif"><img src="/hero.jpg" alt="..."></picture>]]. الـ AVIF مبيتحمّلش أبدًا حتى في Chrome. ليه؟`, done: R`الـ [[<source>]] جوه picture بيقرا [[srcset]] بس، و [[src]] عليه بيتجاهل، فالمتصفح بيروح للـ img. بعد [[srcset="/hero.avif"]] الـ Network بيوري [[hero.avif]] بس.` },
            { lvl: 'تطبيق', t: R`**ابني:** خد صورة واحدة وحوّلها بـ [[npx sharp-cli]] لـ AVIF و WebP و JPEG بمقاسين (800 و 1600)، ونسخة مقصوصة 4:5 للموبايل، واعمل picture فيه art direction والصيغ التلاتة.`, done: R`عندك جدول بأحجام الملفات الستة (AVIF الأصغر غالبًا)، وعلى 1280 اتحمّل ملف عريض واحد، وعلى 390 اتحمّل الملف الطولي، و [[getBoundingClientRect]] للصورة على 390 نسبته 4:5 من أول ما الصفحة فتحت (مفيش قفزة).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من web.dev أو MDN: إيه اللي بيحصل لصورة الهيرو لو عليها [[loading="lazy"]]؟ وإمتى [[fetchpriority="high"]] يفرق؟ وبعدين جرّب الاتنين و Lighthouse على Slow 4G.`, done: R`كتبت إن lazy على صورة فوق الشاشة بيأخّر تحميلها لحد ما الـ layout يخلص فالـ LCP بيتأخر، و [[fetchpriority="high"]] بيقدّمها في الطابور. وعندك رقم LCP للحالتين من Lighthouse.` },
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
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** فيديو هيرو [[<video autoplay loop src="/hero.mp4">]] مبيشتغلش، ومفيش ولا error. صلّحه، واكتب الـ attributes الناقصة ليه.`, done: R`قبل: [[video.paused]] = [[true]] بعد التحميل. بعد [[muted]] و [[playsinline]] (و [[poster]] و [[aria-hidden="true"]] لأنه زينة): [[paused]] = [[false]]، وكتبت إن Chrome بيمنع autoplay بصوت في سكوت.` },
            { lvl: 'تطبيق', t: R`**ابني:** فيديو خلفية للهيرو بزرار «إيقاف/تشغيل» عليه [[aria-pressed]]، ولو المستخدم مفعّل [[prefers-reduced-motion: reduce]] الفيديو ميشتغلش لوحده ويبان الـ poster.`, done: R`من DevTools › Rendering مع [[reduce]]: [[video.paused]] = [[true]] والـ poster ظاهر. من غيره بيشتغل، والزرار بيوقّفه ويغيّر [[aria-pressed]]، والزرار بيتوصل بالـ Tab وليه اسم.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اكتب ملف [[intro.ar.vtt]] لـ ٣ جمل (من 0 لـ 2، ومن 2 لـ 5، ومن 5 لـ 8 ثواني)، وبعدين امسح أول سطر [[WEBVTT]] وشوف بيحصل إيه.`, done: R`بالملف السليم [[video.textTracks[0].cues.length]] = 3 والترجمة بتبان. من غير [[WEBVTT]]: [[cues.length]] = 0 و [[track.readyState]] = 3 (ERROR)، يعني الملف كله اترفض في سكوت.` },
            { lvl: 'تطبيق', t: R`**ابني:** iframe يوتيوب (أو خريطة) responsive بـ [[width: 100%; height: auto; aspect-ratio: 16 / 9]] بدل حيلة [[padding-top: 56.25%]] القديمة.`, done: R`على 360 ارتفاع الـ iframe 202.5 (= 360 × 9 ÷ 16)، وعلى 768 قد 432، ومفيش wrapper ولا [[position: absolute]] في الـ CSS، والـ iframe عليه [[title]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** فيديو عندك (أو اعمله بـ ffmpeg) ٦٠ ثانية. حطه ٣ مرات بـ [[preload="none"]] و [[metadata]] و [[auto]]، وعدّ الـ bytes في Network قبل ما تدوس play.`, done: R`عندك ٣ أرقام: none قريب من صفر، و metadata أقل بكتير من auto، وكتبت ليه [[metadata]] الاختيار الافتراضي للفيديو اللي في نص الصفحة و [[none]] لفيديوهات كتير في صفحة واحدة.` },
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
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[<svg width="48" height="48"><circle cx="12" cy="12" r="10"/></svg>]] اترسمت صغيرة في ركن الـ 48 بدل ما تملاها. صلّحها بخاصية واحدة.`, done: R`قبل: عرض الدايرة 20px. بعد [[viewBox="0 0 24 24"]]: عرضها 40px، لأن الرسمة بقت متحسوبة على لوحة 24 بتتمطّ على الـ 48.` },
            { lvl: 'تطبيق', t: R`**ابني:** sprite فيه ٦ أيقونات متخيلة بـ [[<symbol id="i-cart" viewBox="0 0 24 24">]] جوه [[<svg hidden>]] في أول الـ body، وكل زرار بيستخدم [[<svg><use href="#i-cart"/></svg>]] و [[stroke="currentColor"]].`, done: R`الستة أزرار بتتلوّن مع [[color]] بتاع الزرار (hover بيغيّرهم كلهم)، وكل زرار ليه [[aria-label]] والـ svg جواه [[aria-hidden="true"]]، وتعريف كل أيقونة موجود مرة واحدة بس في الـ HTML.` },
            { lvl: 'تطبيق', t: R`**أشكال:** حلقة تقدّم SVG: دايرة [[r="40"]] و [[stroke-dasharray]] = محيطها و [[stroke-dashoffset]] محسوب من [[--p]] بـ [[calc()]]، وملفوفة [[rotate(-90deg)]] عشان تبدأ من فوق، والرقم في النص.`, done: R`مع [[--p: 75]] الحلقة مكمّلة ٣ أرباع من فوق مع عقارب الساعة، و [[getComputedStyle]] بيقول dasharray ≈ 251.33 و dashoffset ≈ 62.83. ولما تغيّر [[--p]] من DevTools الحلقة بتتغيّر من غير JavaScript.` },
            { lvl: 'تطبيق', t: R`**أشكال:** خط تحت كلمة في عنوان كأنه مرسوم بالقلم: [[<path pathLength="1">]] و [[stroke-dasharray: 1]] و [[stroke-dashoffset]] من 1 لـ 0 بـ animation، ومعاه [[prefers-reduced-motion]].`, done: R`الخط بيترسم من البداية للنهاية مرة واحدة لما الصفحة تفتح، ومع [[reduce]] في Rendering بيبان مرسوم على طول من غير حركة، وفي rtl بيترسم من اليمين (اعكس الـ path أو استخدم [[scale: -1 1]]).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[npx svgo --help]] لاقي الـ flag اللي بيشغّل التنضيف كذا لفة لحد ما الملف ميصغرش تاني، والـ flag اللي بيشتغل على فولدر كامل. وجرّبهم على ٥ أيقونات.`, done: R`لقيت [[--multipass]] و [[-f]] (أو [[--folder]])، وعندك جدول بحجم كل أيقونة قبل وبعد، ولسه كل أيقونة فيها [[viewBox]].` },
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
