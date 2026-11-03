// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الحركة",
      l: 3,
      n: "حركة سريعة وخفيفة على transform و opacity، وبتتلغي للي طالب كده",
      projects: [
        { lvl: 'صغير', t: R`مكتبة loaders`, what: R`تلات loaders بـ CSS بس: دايرة بتلف ([[border]] و [[@keyframes]] على [[transform: rotate]])، وتلات نقط بتنط ورا بعض ([[animation-delay: calc(var(--i) * 120ms)]])، و skeleton بـ shimmer. كل واحد جوه [[role="status"]] فيه «بيحمّل» لقارئ الشاشة. من درس transition و @keyframes.`, done: R`التلاتة بيتحركوا بـ transform و opacity بس (أو [[background-position]] للـ shimmer)، ومع [[prefers-reduced-motion]] كل واحد بيبقى شكل ثابت مفهوم ومفيش ولا حركة شغالة ([[document.getAnimations().length]] = 0)، وقارئ الشاشة بيقول «بيحمّل».` },
        { lvl: 'صغير', t: R`كارت بيتقلب`, what: R`كارت فريق عمل (صورة ورا اسم ونبذة) بيتقلب 3D: الحاوية [[perspective: 1000px]]، والكارت [[transform-style: preserve-3d]] و [[transition: transform .6s]]، والوشين [[backface-visibility: hidden]] والضهر [[rotateY(180deg)]]. بيتقلب مع [[:hover]] و [[:focus-within]]، وفيه زرار «اقلب» للموبايل. من درس transition و @keyframes.`, done: R`بيتقلب بالماوس وبالكيبورد وبالزرار، والضهر مش باين معكوس في أي لحظة، ومع reduced motion بيتبدّل الوشين بـ crossfade بدل اللفة، والكلام اللي ورا بيتقري لقارئ الشاشة.` },
        { lvl: 'متوسط', t: R`صفحة قصة لمحمصة بن متخيلة «حبّاية»`, what: R`صفحة طويلة: hero بيظهر بـ CSS keyframes (مش JavaScript)، وأقسام بتظهر بالتتابع مع الـ scroll بـ IntersectionObserver و [[unobserve]] بعد أول مرة و [[--i]] للـ stagger، وعدّادات أرقام بتعد لحد القيمة لما تظهر بـ [[requestAnimationFrame]] و [[tabular-nums]]، و marquee آراء العملاء بيقف مع hover و focus. والإخفاء بيحصل بس لو فيه كلاس [[js]] على html (سكربت صغير في الـ head بيحطه). بيجمع دروس الوحدة.`, done: R`مع JavaScript مقفول (DevTools › Disable JavaScript) كل المحتوى ظاهر. مع reduced motion مفيش حركة والعدّادات بتطلع بالرقم النهائي على طول والـ marquee لستة ثابتة. والـ hero بيبان من غير ما يستنى JavaScript (LCP في Lighthouse مش مستني الـ bundle).` },
        { lvl: 'متوسط', t: R`منيو مطعم بيتقلب زي الكتاب`, what: R`flipbook من ٦ صفحات: الحاوية [[perspective: 2400px]]، وكل ورقة [[transform-style: preserve-3d]] ليها وش وضهر [[backface-visibility: hidden]]، وبتتقلب بـ [[rotateY(-180deg)]] حوالين الكعب. في العربي الكتاب بيفتح من الناحية التانية ([[transform-origin]] بيتقلب مع [[dir]] بمتغير). زرارين «اللي بعدها» و«اللي قبلها» والأسهم في الكيبورد، و [[aria-live]] بيقول رقم الصفحة.`, done: R`الصفحات بتتقلب بالزراير والأسهم في الاتجاهين، وفي العربي من اليمين للشمال صح، ومفيش وش معكوس بيبان، و reduced motion بيبدّل الصفحات من غير لف، وقارئ الشاشة بيقول «صفحة ٣ من ٦».` },
        { lvl: 'كبير', t: R`معمل التأثيرات`, what: R`صفحة واحدة فيها ١٠ تأثيرات من اللي بيتكرر في المواقع الحقيقية، كل واحد في سكشن ليه شرح قصير: كارت spotlight (هالة بتتبع الماوس بـ [[--x]] و [[--y]] و [[radial-gradient]])، و tilt بيميل مع الماوس، و flip card، و marquee بيقف ومظبوط في RTL، ولوحة زجاج بـ [[backdrop-filter]] و fallback، و blobs بتتحرك ببطء بـ [[filter: blur()]]، و reveal بالتتابع، و عدّاد، و skeleton، وزرار مغناطيسي. فوق الصفحة لوحة فيها toggle «حركة أقل» بيقلب كلاس على html (غير إعداد النظام). وكل تأثير بيشتغل بالكيبورد أو ليه بديل. بيجمع الوحدة دي مع وحدة الثيم والـ Accessibility.`, done: R`في Performance وانت بتحرّك الماوس وبتعمل scroll، مفيش frames أطول من 16.7ms كتير (Frames track أخضر) ومفيش «Forced reflow». الـ toggle وإعداد النظام الاتنين بيوقّفوا كل الحركات. التأثيرات اللي بتتبع الماوس مبتشتغلش على اللمس ([[(hover: hover) and (pointer: fine)]]). axe صفر مشاكل. وفيه جدول في الصفحة: كل تأثير بيتحرك بإيه (transform أو opacity أو paint) وتكلفته.`, ext: R`زوّد لكل تأثير زرار «انسخ الكود»، وقيس الصفحة على CPU 6x slowdown وخفّف أتقل تأثير، وانشرها كـ portfolio piece.` },
        { lvl: 'فكرة', t: R`حركة بهوية`, what: R`اختار ٣ قيم حركة لهوية موقعك: مدة قصيرة وطويلة، و easing واحد ([[--ease: cubic-bezier(...)]])، ومسافة الطلوع. وطبّقهم على كل الحركات في موقعك عشان تبقى «عيلة واحدة»، وصمّم بديل هادي لكل حركة لـ reduced motion بدل ما تلغيها بس.`, done: R`كل الحركات في الموقع بتقرا من التوكنز دي ومفيش مدة مكتوبة بإيدك، ولكل حركة سطر في جدول: الأصل والبديل الهادي.`, ext: R`اعمل صفحة motion guide فيها كل حركة بمثال حي وزرار «شغّل تاني»، و DevTools › Animations panel لتبطيئها.` },
      ],
      items: [
        {
          cmd: "transition و @keyframes",
          title: "حركة ناعمة بالـ CSS بس",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مع [[transition: all 300ms]]، أنهي تغيير من دول هيتحرك بنعومة وأنهي هيقفز: [[opacity: 0 → 1]]، و [[transform: scale(.9) → none]]، و [[background-color]]، و [[display: none → block]]، و [[height: 0 → auto]]، و [[visibility: hidden → visible]]؟ اكتب، وجرّب كل واحد بكلاس بيتضاف.`, done: R`opacity و transform و background-color ناعمين، و display و [[height: auto]] بيقفزوا (محتاجين [[@starting-style]] و [[transition-behavior: allow-discrete]] و [[interpolate-size]] في درس لاحق)، و visibility بيتقلب مرة واحدة في أول أو آخر الـ transition. وفهمت ليه [[transition: all]] خطر: بيحرّك حاجات مكنتش قاصدها.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موقع حاطط [[@media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important } }]] بس، وفيه loader بـ [[infinite]]. فعّل reduce من DevTools › Rendering وبص على الـ loader، واطبع [[document.getAnimations()[0].effect.getComputedTiming().currentIteration]].`, done: R`الـ loader بيترعش بدل ما يقف، والرقم بيطلع بالآلاف (قسناه 10001 بعد 300ms في Chrome 156). بعد ما زوّدت [[animation-iteration-count: 1 !important]] الحركة خلصت و [[getAnimations()]] رجّعت لستة فاضية.` },
            { lvl: 'تطبيق', t: R`**أشكال:** اعمل ٣ حركات صغيرة من غير JavaScript: نقطة «مباشر» بتنبض بـ [[scale]] و [[opacity]] (ping)، ونجوم بتلمع كل واحدة بـ [[animation-delay]] مختلف من [[--i]]، و «موجة صوت» من ٥ أعمدة بـ [[scaleY]] و delays متدرجة.`, done: R`التلاتة شغالين بـ transform و opacity بس (مفيش width ولا height ولا top في الـ keyframes)، والأعمدة بتتحرك من تحت مش من النص ([[transform-origin: bottom]])، ومع reduce التلاتة واقفين في شكل مفهوم.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** shimmer للـ skeleton مرتين: مرة بـ [[@keyframes]] على [[background-position]]، ومرة بـ [[::after]] فيه gradient بيتحرك بـ [[translateX]]. شغّل DevTools › Rendering › Paint flashing.`, done: R`النسخة الأولى بتنوّر أخضر طول الوقت (repaint كل frame)، والتانية مبتنوّرش غير مرة في الأول لأن transform بيتعمل في الـ compositor. وكتبت إمتى الفرق ده يهم (لستة فيها ٢٠ skeleton على موبايل ضعيف).` },
            { lvl: 'تطبيق', t: R`**ابني:** scroll reveal: [[[data-reveal]]] بيبدأ [[opacity: 0; translate: 0 16px]] وبيظهر لما يدخل الشاشة بكلاس [[in]] من IntersectionObserver، وكل عنصر [[transition-delay: calc(var(--i) * 80ms)]]، و [[unobserve]] بعد أول ظهور. والإخفاء بيبدأ بس لو html عليه كلاس [[js]].`, done: R`مع JavaScript مقفول كل المحتوى ظاهر من الأول، ومعاه العناصر بتطلع ورا بعض مرة واحدة بس (الـ scroll لفوق وتحت مبيعيدهاش)، ومع reduce بتظهر من غير حركة.` },
            { lvl: 'تحدي', t: R`**مسألة:** marquee لوجوهات لا نهائي: المحتوى مكرر مرتين جوه [[display: flex; width: max-content]] و [[translateX(-50%)]] بيلف من غير ما يبان مكان الوصلة. وقّفه مع [[:hover]] و [[:focus-within]] بـ [[animation-play-state: paused]]، وظبّطه في RTL، ومع reduce خليه لستة بـ scroll أفقي عادي.`, done: R`مفيش نطة ولا فراغ عند نقطة التكرار في الاتجاهين، وفي RTL عملت keyframes تانية لـ [[translateX(50%)]] (لأن [[animation-direction: reverse]] بيعكس الوقت مش الاتجاه فبيبيّن فراغ)، والنسخة المكررة عليها [[aria-hidden="true"]] فقارئ الشاشة بيقرا اللوجوهات مرة واحدة.` },
          ],
          desc: R`[[transition]] بيحرّك التغيير بين حالتين: من العادي للـ hover مثلًا. و [[@keyframes]] بيعرّف حركة بمراحل تشتغل لوحدها (loader بيلف، أو عنصر بيطلع من تحت أول ما الصفحة تفتح) وبتتشغّل بـ [[animation]].

حرّك [[transform]] و [[opacity]] بس لو تقدر، دول المتصفح بيحرّكهم من غير ما يعيد حساب الصفحة. وأي حركة لازم تتلغي أو تخف مع [[prefers-reduced-motion]].`,
          example: R`.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgb(0 0 0 / 0.12); }
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.reveal { animation: fade-up 500ms ease-out both; animation-delay: calc(var(--i, 0) * 80ms); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}`,
          try: R`اعمل 6 كروت بـ [[.reveal]] و [[style="--i: 0"]] و 1 و 2... وشوفهم بيطلعوا ورا بعض. وبعدين من DevTools › Rendering فعّل [[prefers-reduced-motion: reduce]] واعمل refresh.`,
          flag: "script",
          deep: {
            why: "الحركة الصغيرة بتقول للمستخدم إيه اللي حصل (الكارت ده بيتضغط، والمنيو دي فتحت منين). بس الحركة التقيلة بتخلي الموقع يقطّع على الموبايل، والحركة الكبيرة (parallax و zoom) بتعمل دوخة حقيقية لناس عندهم مشاكل في الاتزان، ودول بيفعّلوا «reduce motion» في النظام.",
            how: R`المتصفح بيرسم كل frame على مراحل: Style (يحسب الـ CSS)، وبعدين Layout (يحسب أماكن ومقاسات كل حاجة)، وبعدين Paint (يلوّن البكسلات)، وبعدين Composite (يركّب الطبقات). تغيير [[width]] أو [[top]] أو [[margin]] بيعيد الـ Layout لكل اللي حواليه كل frame. تغيير [[background]] أو [[color]] بيعيد الـ Paint. أما [[transform]] و [[opacity]] فبيتعملوا في مرحلة الـ Composite غالبًا، على الـ GPU، فالحركة بتفضل ناعمة حتى لو الـ JavaScript مشغول.

[[transition: all]] بيحرّك أي خاصية تتغير، حتى اللي مش قصدك، فحدد الخصائص. والـ easing: [[ease-out]] للحاجات اللي بتدخل (سريع وبيهدى)، و [[ease-in]] للي بتخرج، والمدة للـ UI بين 150 و 300ms.

[[animation-fill-mode: both]] بيطبّق أول frame قبل ما الحركة تبدأ (مهم مع الـ delay) وآخر frame بعد ما تخلص.

في Tailwind: [[transition-transform duration-200 ease-out hover:-translate-y-1]]، و [[animate-spin]] و [[animate-pulse]] جاهزين، وتعمل حركة جديدة بـ [[--animate-fade-up]] في [[@theme]] ومعاها الـ keyframes. و [[motion-safe:]] و [[motion-reduce:]] للـ media query. وفي مشاريع حقيقية كان فيه [[@media (prefers-reduced-motion: reduce)]] بيوقف الحركات الزينة، ودا بالظبط الصح.`,
            when: "الـ hover والـ focus وفتح وقفل العناصر والتحميل. لو الحركة محتاجة تتبع state في React أو تشتغل والعنصر بيتشال من الصفحة، استخدم motion (الدرس الجاي).",
            mistakes: R`تحرّك [[height]] أو [[left]] فالموبايل يقطّع. [[transition: all 1s]]. حركات طويلة (أكتر من نص ثانية) على حاجات بتتكرر كتير. وتنسى reduced-motion، أو تحلها بـ [[animation: none]] على عنصر بيبدأ [[opacity: 0]] فيفضل مخفي للأبد.`
          },
          teach: R`## نوعين حركة: transition بين حالتين، و animation بمراحل

المثال 3 أجزاء: كارت بيطلع لفوق ناعم وقت الـ hover ([[transition]])، وكروت بتظهر ورا بعض أول ما الصفحة تفتح ([[@keyframes]] و [[animation]])، وقاعدة بتلغي الحركة للي طالب كده. حطيناه في صفحة HTML فيها كارت للـ hover و 6 كروت [[.reveal]] بـ [[--i]] من 0 لـ 5، وفي Chrome وقّفنا كل animation عند لحظة معينة ([[currentTime]]) وقرينا [[opacity]] و [[transform]] بـ [[getComputedStyle]]، فالأرقام تحت مضبوطة مش بالعين.

---

## ١. الـ transition

~~~text CSS
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
~~~

[[transition]] بيقول: «لو الخاصية دي اتغيرت، متنطش للقيمة الجديدة، اتحرك ليها». كل جزء مفصول بـ [[,]] خاصية لوحدها، وجواه 3 حاجات:

| الحتة | المعنى |
|---|---|
| [[transform]] | الخاصية اللي هتتحرك |
| [[200ms]] | المدة: ms = ميلي ثانية، يعني 0.2 ثانية |
| [[ease-out]] | شكل السرعة: سريع في الأول وبيهدى في الآخر |

~~~text CSS
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgb(0 0 0 / 0.12); }
~~~

- [[:hover]]: الحالة لما الماوس واقف على العنصر.
- [[translateY(-4px)]]: حرّكه على محور Y (رأسي) 4px. السالب = لفوق.
- [[box-shadow: 0 12px 24px ...]]: ظل: 0 إزاحة أفقية، و 12px لتحت، و 24px blur (قد إيه الظل ناعم ومفرود). و [[rgb(0 0 0 / 0.12)]] أسود بشفافية 12%.

### القياس

~~~text اتقاس في Chrome
بعد 100ms من الـ hover:   matrix(1, 0, 0, 1, 0, -3.01185)
بعد 350ms:                matrix(1, 0, 0, 1, 0, -4)    والظل rgba(0, 0, 0, 0.12) 0px 12px 24px 0px
~~~

[[getComputedStyle]] بيرجّع الـ transform كـ [[matrix(...)]]، وآخر رقم فيه هو الإزاحة الرأسية. في نص المدة (100 من 200ms) العنصر قطع 3 من 4 بكسل، مش 2، وده الـ [[ease-out]]: أغلب المسافة في الأول.

---

## ٢. الـ keyframes

~~~text CSS
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
~~~

- [[@keyframes fade-up]]: عرّف حركة اسمها [[fade-up]] (الاسم من اختيارك).
- [[from]] = البداية (0%): شفاف تمامًا ([[opacity: 0]]) و 16px تحت مكانه.
- [[to]] = النهاية (100%): ظاهر ([[opacity: 1]]) وفي مكانه ([[transform: none]]).
- المتصفح بيحسب كل اللي في النص لوحده. وممكن تكتب مراحل في النص زي [[50% { ... }]].

## ٣. تشغيلها

~~~text CSS
.reveal { animation: fade-up 500ms ease-out both; animation-delay: calc(var(--i, 0) * 80ms); }
~~~

[[animation]] اختصار لكذا خاصية:

| الحتة | الخاصية | المعنى |
|---|---|---|
| [[fade-up]] | [[animation-name]] | أنهي keyframes |
| [[500ms]] | [[animation-duration]] | نص ثانية |
| [[ease-out]] | [[animation-timing-function]] | شكل السرعة |
| [[both]] | [[animation-fill-mode]] | طبّق [[from]] قبل ما تبدأ و [[to]] بعد ما تخلص |

و [[animation-delay: calc(var(--i, 0) * 80ms)]] من جوه لبرة:

1. [[var(--i, 0)]]: قيمة المتغير [[--i]] اللي على العنصر ([[style="--i: 3"]])، ولو مش موجود [[0]] (القيمة بعد الفاصلة اسمها fallback).
2. [[calc(... * 80ms)]]: اضربها في 80ms. فالكارت 3 بيتأخر 240ms.

اللي Chrome حسبه لكل كارت:

~~~text اتقاس في Chrome (getComputedTiming)
0: delay=0    end=500
1: delay=80   end=580
2: delay=160  end=660
3: delay=240  end=740
4: delay=320  end=820
5: delay=400  end=900
~~~

يعني الكل بيخلص في 900ms. ودي الكروت في لحظات مختلفة (op = opacity، و ty = كام بكسل لسه تحت):

~~~text اتقاس في Chrome
t=0     كلهم op=0.00 ty=16
t=200   0:op=0.57 ty=6.9   1:op=0.36 ty=10.2   2:op=0.13 ty=13.9   3 و 4 و 5: op=0.00 ty=16
t=330   0:op=0.84   1:op=0.68   2:op=0.50   3:op=0.28   4:op=0.03   5:op=0.00
t=900   كلهم op=1.00 ty=0
~~~

الكروت 3 و 4 و 5 عند t=200 لسه **مخفيين تمامًا** (op=0) مع إن الحركة بتاعتهم مبدأتش. ده الـ [[both]]: بيطبّق الـ [[from]] وقت الـ delay. من غيره كانوا هيبانوا عادي وبعدين يختفوا فجأة ويبدأوا.

---

## ٤. reduced motion

~~~text CSS
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
~~~

- [[prefers-reduced-motion: reduce]]: بيتحقق لما المستخدم يفعّل «قلّل الحركة» من إعدادات النظام.
- [[*]] = أي عنصر، و [[*::before]] و [[*::after]] = العناصر الوهمية اللي الـ CSS بيعملها قبل وبعد المحتوى (مش بتتمسك بـ [[*]] لوحدها).
- [[0.01ms]] مش [[0]]: الحركة لسه بتشتغل وتخلص فورًا، فالعنصر بيوصل لحالة [[to]] وأحداث زي [[animationend]] بتحصل عادي.
- [[!important]]: يكسب أي قيمة تانية مكتوبة على العناصر.
- [[animation-iteration-count: 1]]: من غيرها أي حركة [[infinite]] (loader بيلف مثلًا) بتفضل شغالة بس كل لفة 0.01ms، فبتلف آلاف المرات في الثانية وتبان بتترعش. قسناها على spinner بـ [[infinite]] بعد 300ms: من غير السطر ده [[playState]] = [[running]] و [[currentIteration]] = 10001، ومعاه الحركة خلصت واختفت من [[document.getAnimations()]].
- [[scroll-behavior: auto]]: يلغي الـ smooth scroll اللي بيتحط على html، فالقفز لـ anchor بيبقى فوري.

عملنا emulate لـ reduce من Playwright:

~~~text اتقاس في Chrome مع reduce
timing:  0: dur=0.01 end=0.01   1: delay=80 end=80.01  ...  5: delay=400 end=400.01
t=200   0 و 1 و 2: op=1.00 ty=0     3 و 4 و 5: op=0.00 ty=16
t=330   0 لـ 4: op=1.00             5: op=0.00
hover بعد 100ms:  matrix(1, 0, 0, 1, 0, -4)   (وصل على طول)
transition-duration: 1e-05s
~~~

مفيش fade ولا طلوع، كل كارت بيظهر مرة واحدة. بس لسه ورا بعض بفرق 80ms، لأن القاعدة صفّرت الـ duration بس والـ delay شغال. و [[1e-05s]] هي 0.01ms مكتوبة بالثواني (1 × 10 أس سالب 5).

## الخلاصة

| الأداة | امتى |
|---|---|
| [[transition]] | تغيير بين حالتين بسبب حاجة حصلت (hover، focus، class اتضافت) |
| [[@keyframes]] + [[animation]] | حركة بمراحل بتشتغل لوحدها |
| [[both]] | العنصر ياخد شكل البداية وقت الـ delay |
| [[var(--i)]] في الـ delay | عناصر ورا بعض من غير ما تكتب قاعدة لكل واحد |
| [[prefers-reduced-motion]] | الحركة تخلص فورًا، والعنصر يوصل لشكله النهائي |

وحرّك [[transform]] و [[opacity]] بس: دول اللي المتصفح بيحرّكهم من غير ما يعيد حساب الـ layout.`,
          lines: [
            R`الكارت في حالته العادية، وهنا بيتكتب الـ transition مش في الـ hover، عشان الحركة تشتغل في الدخول والخروج.`,
            "لما الـ transform أو الظل يتغيروا، اتحرك في 200ms بـ ease-out (سريع في الأول وبيهدى).",
            "قفلة.",
            "الحالة التانية: يطلع 4px لفوق وظله يكبر. الـ transition هو اللي بيخليها ناعمة.",
            "حركة بمراحل اسمها fade-up.",
            "البداية: شفاف وتحت بـ 16px.",
            "النهاية: ظاهر وفي مكانه.",
            "قفلة.",
            R`شغّل الحركة نص ثانية، و [[both]] يخلي العنصر شفاف قبل ما تبدأ. و [[--i]] بيأخّر كل عنصر عن اللي قبله.`,
            "لو المستخدم طالب حركة أقل من إعدادات النظام...",
            R`...خلّي كل الحركات تخلص فورًا ومرة واحدة بس (حتى اللي [[infinite]])، والـ smooth scroll يبقى قفزة، فالعناصر تظهر في مكانها النهائي على طول.`,
            "قفلة."
          ],
          sol: R`الكروت الـ 6 بيطلعوا ورا بعض من تحت لفوق مع fade: الأول على طول، والتاني بعد 80ms، وهكذا لحد السادس بعد 400ms، فالكل بيخلص في حوالي 900ms. قبل ما دور الكارت ييجي بيبقى مخفي تمامًا (مش ظاهر وبعدين يختفي)، وده سبب [[both]]: بيطبّق الـ [[from]] وقت الـ delay.

بعد تفعيل [[prefers-reduced-motion: reduce]] و refresh: مفيش حركة خالص، كل كارت بيظهر مرة واحدة من غير fade ولا طلوع. بس هتلاحظ إنهم لسه بيظهروا ورا بعض بفرق 80ms، لأن الـ media query صفّرت الـ duration بس، والـ [[animation-delay]] لسه شغال (بعد 200ms مثلًا: الكروت اللي الـ delay بتاعها 0 و 80 و 160 ظاهرين، والـ 3 التانيين لأ). لو عايزهم يظهروا مع بعض، ضيف [[animation-delay: 0s !important]] في نفس القاعدة.

والـ hover على الكارت: بيطلع 4px لفوق وله ظل، في 200ms. مع reduced-motion بيتنقل على طول. لو الكروت فضلت مخفية للأبد، غالبًا كتبت [[animation: none]] في الـ reduce بدل تقليل الـ duration، فالعنصر فضل على [[opacity: 0]].`
        },
        {
          cmd: "motion",
          title: "حركة مربوطة بالـ state، ودخول وخروج العناصر",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في المثال، لو شلت [[<AnimatePresence>]] حركة الخروج هتحصل؟ ولو شلت [[key="panel"]]؟ ولو المستخدم مفعّل reduce و [[reducedMotion="user"]]، إيه اللي لسه بيتحرك؟`, done: R`من غير AnimatePresence العنصر بيختفي على طول من غير exit، ومن غير key الـ exit ممكن ميشتغلش صح لما العنصر يتبدّل بغيره، ومع reduce الـ [[y]] والـ [[layoutId]] اتلغوا والـ opacity بس فضلت. واتأكدت بـ DevTools › Rendering.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كل الأقسام عليها [[initial={{ opacity: 0 }}]] و [[whileInView]]، حتى الـ hero. فالـ HTML اللي جاي من السيرفر كله [[opacity: 0]]، ومفيش حاجة بتبان لحد ما الـ JavaScript يتحمّل. صلّح الـ hero بـ CSS keyframes ([[animation: fade-up .5s both]])، وسيب [[whileInView]] للي تحت أول شاشة بس.`, done: R`Lighthouse بيدّي LCP أحسن (رقم قبل وبعد)، ومع JavaScript مقفول الـ hero ظاهر، وفي View Source عنوان الـ hero مفيش عليه [[style="opacity:0"]].` },
            { lvl: 'تطبيق', t: R`**ابني:** زرار مغناطيسي: لما الماوس يقرب بيتحرك ناحيته بـ ٣٠٪ من المسافة بين المؤشر ومركز الزرار ([[useMotionValue]] و [[useSpring]] أو متغيرات CSS)، ويرجع مكانه لما يبعد. وبيتلغي على اللمس و reduce.`, done: R`على الديسكتوب بيتحرك بنعومة وبيرجع، وفي Device Toolbar (لمس) مبيتحركش خالص ([[matchMedia("(hover: hover) and (pointer: fine)")]] = [[false]])، ومع reduce واقف، والزرار لسه بيتضغط بالكيبورد عادي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لستة مهام بتتفلتر جوه [[AnimatePresence]] بـ [[key={i}]]. امسح المهمة التانية: الحركة بتحصل على آخر عنصر مش اللي اتمسح، والـ checkbox بتاع التالتة بيتنقل للتانية. صلّحه بـ id ثابت.`, done: R`بعد [[key={task.id}]] العنصر اللي اتمسح هو اللي بيعمل exit، والباقي بيتزحلق لمكانه بـ [[layout]]، والحالة المتعلّمة فاضلة مع المهمة الصح.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل build لصفحة فيها [[motion.div]] واحد، وبعدين غيّرها لـ [[m.div]] جوه [[<LazyMotion features={domAnimation}>]]. قارن حجم الـ JavaScript.`, done: R`حجم الـ chunk قبل وبعد من ناتج [[npm run build]] (أو Network في الصفحة)، والحركة شغالة زي ما هي، وكتبت إمتى الفرق يستاهل (صفحة landing بحركة أو اتنين).` },
          ],
          desc: R`مكتبة [[motion]] (اسمها زمان framer-motion) بتحوّل أي عنصر لـ [[<motion.div>]] بيقبل [[initial]] (البداية) و [[animate]] (يروح لفين) و [[exit]] (يعمل إيه وهو خارج). و [[<AnimatePresence>]] بيخلي العنصر يفضل في الصفحة لحد ما حركة الخروج تخلص، ودي حاجة CSS مش بيعرف يعملها.

و [[layout]] بيحرّك العنصر لوحده لما مكانه أو حجمه يتغير (قايمة اتفلترت، أو كارت كبر)، و [[layoutId]] بيحرّك عنصر من مكان لمكان (الخلفية تحت التاب المختار).`,
          example: R`import { AnimatePresence, motion, MotionConfig } from "motion/react";
<MotionConfig reducedMotion="user">
  <AnimatePresence>
    {open && (
      <motion.div key="panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>محتوى</motion.div>
    )}
  </AnimatePresence>
  {tabs.map((t) => (
    <button key={t} onClick={() => setActive(t)} className="relative isolate px-4 py-2">
      {active === t && <motion.span layoutId="tab-bg" className="absolute inset-0 -z-10 rounded-full bg-gray-100" />}
      {t}
    </button>
  ))}
</MotionConfig>`,
          try: R`اعمل زرار بيعمل toggle لـ open وشوف حركة الخروج. شيل AnimatePresence وشوف العنصر بيختفي فجأة. وبعدين في التابات دوس بسرعة بين تابين وشوف الخلفية بتتزحلق.`,
          flag: "script",
          deep: {
            why: R`CSS بيحرّك بين حالتين لعنصر موجود. بس في React العناصر بتظهر وتختفي من الـ DOM ([[{open && ...}]])، والعنصر اللي اتشال مفيش حاجة تحرّكه. وكمان حركة عنصر من مكان لمكان لما الـ layout يتغير مستحيلة تقريبًا بالـ CSS العادي. motion بيحل الاتنين.`,
            how: R`[[motion.div]] بيقرا [[animate]]، ولما القيم تتغير بيحرّكها (spring افتراضيًا للـ transform، و tween للباقي). الحركة شغالة بـ JavaScript، بس بتكتب [[transform]] و [[opacity]] مباشرة، وبتستخدم Web Animations API لما تقدر فتبقى على الـ GPU.

AnimatePresence: لما ابن يختفي من الـ render، بيحتفظ بآخر نسخة منه، يشغّل [[exit]]، ويشيله لما تخلص. عشان كده الابن المباشر لازم يبقى ليه [[key]] ثابت، والـ [[exit]] يبقى على motion component (هو نفسه أو أي حاجة جواه). [[mode="wait"]] يستنى القديم يخرج قبل ما الجديد يدخل، و [[mode="popLayout"]] يطلّع القديم من الـ layout فورًا فالباقي يتحرك مكانه (مع [[layout]]).

[[layout]] بيستخدم تقنية اسمها FLIP: بيقيس مكان العنصر قبل التغيير وبعده، ويحط [[transform]] يرجّعه لمكانه القديم، وبعدين يحرّك الـ transform لصفر. فالشكل بيتحرك بنعومة مع إن الـ layout الحقيقي اتغير مرة واحدة. و [[layoutId]] نفس الفكرة بين عنصرين مختلفين بنفس الاسم.

و [[MotionConfig reducedMotion="user"]] بيلغي حركات الـ transform والـ layout لوحده عند اللي مفعّل reduce motion، ويسيب الـ opacity. والـ package اتغير اسمه لـ [[motion]] والـ import من [[motion/react]]؛ المشاريع اللي فيها [[framer-motion]] شغالة عادي، والتنقل تغيير import. وأي مكون فيه motion لازم [["use client"]] في Next.`,
            when: "دخول وخروج (مودال، و toast، و dropdown لو مش Radix)، وقوايم بتتفلتر، والخلفية المتزحلقة تحت التاب، وحركة مربوطة بالـ scroll. للـ hover البسيط CSS أخف.",
            mistakes: R`AnimatePresence جوه الشرط بدل ما يبقى برّاه ([[{open && <AnimatePresence>...}]])، فيتشال هو كمان ومفيش exit. ابن من غير [[key]]. تحرّك [[width]] و [[height]] بدل [[layout]]. و motion.div حوالين مودال [[fixed]]، فالـ transform يحبسه (درس sticky و fixed). وفي مشروع حقيقي فلتر المشاريع كان [[AnimatePresence mode="popLayout"]] مع [[layout]] على الشبكة و [[layoutId]] على خلفية الفلتر المختار، ودا بالظبط الاستخدام الصح.`
          },
          teach: R`## عنصر بيخرج بحركة، وخلفية بتتزحلق بين التابات

المثال جزئين: panel بيظهر ويختفي بـ [[open]] ومعاه حركة دخول وخروج، و 3 تابات خلفية المختار فيهم بتتنقل بنعومة. حطيناه حرفيًا في تطبيق React + Tailwind (Vite، و motion 14.0)، ضفنا بس زرار [[toggle]] وتابات «الكل» و «ويب» و «موبايل»، وفي Chrome قرينا [[opacity]] و [[transform]] بتوع الـ panel في كل frame بعد الضغط (بـ [[requestAnimationFrame]]).

---

## ١. الـ import

~~~text JSX
import { AnimatePresence, motion, MotionConfig } from "motion/react";
~~~

3 حاجات من [[motion/react]] (الـ package اسمه [[motion]]، و [[/react]] = النسخة بتاعة React):

| الاسم | بيعمل إيه |
|---|---|
| [[motion]] | object فيه نسخة متحركة من كل عنصر HTML: [[motion.div]] و [[motion.span]]... |
| [[AnimatePresence]] | بيأخّر شيل العنصر من الـ DOM لحد ما حركة الخروج تخلص |
| [[MotionConfig]] | إعدادات لكل الحركات اللي جواه |

## ٢. [[<MotionConfig reducedMotion="user">]]

[[reducedMotion="user"]] = اتبع إعداد المستخدم. لو مفعّل «قلّل الحركة»، حركات الـ transform والـ layout تتلغي، والـ opacity تفضل. (القياس تحت.)

## ٣. الـ panel

~~~text JSX
<AnimatePresence>
  {open && (
    <motion.div key="panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>محتوى</motion.div>
  )}
</AnimatePresence>
~~~

- [[{open && (...)}]]: لو [[open]] true ارسم الـ div، ولو false مفيش حاجة.
- الأقواس المزدوجة [[{{ ... }}]]: الخارجية «JavaScript جوه JSX»، والداخلية object.
- [[initial={{ opacity: 0, y: 8 }}]]: شكله أول ما يتعمل: شفاف و 8px تحت. و [[y]] اختصار motion لـ [[translateY]].
- [[animate={{ opacity: 1, y: 0 }}]]: يروح لفين.
- [[exit={{ opacity: 0, y: 8 }}]]: يعمل إيه وهو خارج.
- [[transition={{ duration: 0.2 }}]]: المدة بالثواني هنا (0.2 = 200ms)، مش بالـ ms زي CSS.
- [[key="panel"]]: [[AnimatePresence]] بيعرف أولاده بالـ key. من غيره مش هيعرف إن ده نفس العنصر اللي خرج.

### القياس: الخروج مع AnimatePresence وبدونه

~~~text اتقاس في Chrome (الوقت بالـ ms بعد الضغطة: opacity / الإزاحة y)
مع AnimatePresence، قفل:
0: 0.99/y=0.13   48: 0.61/y=3.14   98: 0.31/y=5.56   147: 0.09/y=7.31   198: 0.00/y=8   207: GONE

من غير AnimatePresence، قفل:
0: GONE
~~~

مع [[AnimatePresence]] العنصر فضل في الـ DOM 200ms وهو بيختفي وينزل، وبعدين اتشال. من غيره اتشال في نفس اللحظة. أما الفتح فشغال في الحالتين (من 0.08/y=7.3 لـ 1.00/none في حوالي 190ms)، لأن [[initial]] و [[animate]] مش محتاجين حد يستنى.

## ٤. التابات

~~~text JSX
{tabs.map((t) => (
  <button key={t} onClick={() => setActive(t)} className="relative isolate px-4 py-2">
    {active === t && <motion.span layoutId="tab-bg" className="absolute inset-0 -z-10 rounded-full bg-gray-100" />}
    {t}
  </button>
))}
~~~

- [[tabs.map((t) => ...)]]: لكل اسم في الـ array اعمل زرار. و [[key={t}]] لازم في أي قايمة في React.
- [[relative]]: الزرار يبقى المرجع للـ span اللي [[absolute]] جواه.
- [[isolate]]: [[isolation: isolate]]، بيعمل stacking context جديد، فالـ [[-z-10]] (z-index سالب) يحط الخلفية ورا كلام الزرار بس، مش ورا الصفحة كلها.
- [[absolute inset-0]]: الـ span ماليّ الزرار كله ([[inset: 0]] = top و right و bottom و left كلهم 0).
- [[rounded-full bg-gray-100]]: كبسولة رمادي فاتح.
- [[{active === t && ...}]]: الخلفية موجودة في التاب المختار بس.
- [[layoutId="tab-bg"]]: الخلفية القديمة والجديدة بنفس الاسم، فـ motion بيعتبرهم نفس العنصر اتنقل.

### القياس

دسنا «موبايل» وقرينا الـ span الجديد كل 60ms:

~~~text اتقاس في Chrome
x=1220  transform: matrix(0.803, 0, 0, 1, 128.8, 0)
x=1144  transform: matrix(0.913, 0, 0, 1, 57.2, 0)
x=1096  transform: matrix(0.982, 0, 0, 1, 12.0, 0)
x=1088  transform: matrix(0.994, 0, 0, 1, 4.2, 0)
~~~

دي تقنية FLIP: الـ span اتحط فعلًا في مكانه الجديد، بس motion حطله [[transform]] يرجّعه لمكان وعرض القديم (إزاحة 128.8px و scale ‏0.80 لأن «الكل» أضيق من «موبايل»)، وبعدين بيصغّر الـ transform لحد صفر. أول رقم في الـ matrix هو الـ scale الأفقي، والخامس الإزاحة الأفقية.

## ٥. مع «قلّل الحركة»

عملنا emulate لـ [[prefers-reduced-motion: reduce]]:

~~~text اتقاس في Chrome مع reduce
فتح:   0: 0.05/none   48: 0.42/none   98: 0.72/none   188: 1.00/none
قفل:   0: 0.99/y=8    99: 0.31/y=8    199: 0.00/y=8   209: GONE
التاب: x=1084 transform: none   (اتنقل على طول)
~~~

الـ opacity لسه بتتحرك (fade عادي)، بس الـ [[y]] بقى في مكانه النهائي على طول، وخلفية التاب نطت من غير زحلقة. ده بالظبط [[reducedMotion="user"]].

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[initial]] → [[animate]] | حركة الدخول |
| [[exit]] + [[AnimatePresence]] + [[key]] | حركة الخروج، والعنصر يتشال بعدها |
| [[layoutId]] | عنصرين بنفس الاسم = عنصر واحد بيتنقل (FLIP) |
| [[MotionConfig reducedMotion="user"]] | الـ transform والـ layout يتلغوا للي طالب كده |

ولو الـ exit مش شغال: [[AnimatePresence]] لازم يبقى برا الشرط، والابن ليه [[key]].`,
          lines: [
            R`من [[motion/react]] (الـ package الجديد اسمه [[motion]]).`,
            R`[[reducedMotion="user"]]: لو المستخدم طالب حركة أقل، الـ transform والـ layout بيتلغوا لوحدهم والـ opacity تفضل.`,
            "بيراقب الأولاد: لما واحد يتشال، يستنى حركة الخروج بتاعته.",
            "لما open تبقى false العنصر هيتشال...",
            R`...بس الأول: يبدأ شفاف وتحت 8، ويطلع لمكانه، ولما يتشال ينزل ويختفي في 200ms. الـ [[key]] لازم.`,
            "قفلة الشرط.",
            R`قفلة [[AnimatePresence]]: اللي جواها بس هو اللي بيستنى حركة الخروج.`,
            R`لستة التابات، وكل تاب زرار بيغيّر [[active]] لما تدوس عليه.`,
            R`كل تاب. [[isolate]] عشان الخلفية اللي عليها [[-z-10]] تفضل جوه الزرار (درس z-index).`,
            R`الخلفية موجودة في التاب المختار بس، وبنفس الـ [[layoutId]]، فبتتزحلق من التاب القديم للجديد.`,
            R`اسم التاب نفسه، فوق الخلفية بسبب [[-z-10]] على الخلفية.`,
            R`قفلة الزرار؛ الـ [[relative]] اللي عليه هو اللي الخلفية [[absolute inset-0]] بتتحسب منه.`,
            "قفلة map.",
            R`قفلة [[MotionConfig]]؛ أي motion جوّاها بيحترم إعداد reduced motion.`
          ],
          sol: R`مع [[AnimatePresence]]: لما تقفل، العنصر بيعمل fade وبينزل 8px في 0.2 ثانية، وبعدين بس بيتشال من الـ DOM (لو فتحت Elements هتشوفه لسه موجود لحظة الحركة). ومع الفتح بيعمل العكس: بيطلع من تحت وبيظهر.

من غير [[AnimatePresence]]: الفتح لسه بيتحرك (الـ [[initial]] و [[animate]] شغالين)، بس القفل بيختفي فجأة، لأن React بيشيل العنصر على طول ومحدش بيستنى الـ [[exit]]. ده أشهر سبب إن «الـ exit مش شغال»، والسبب التاني إنك ناسي [[key]] ثابت على العنصر.

في التابات: لما تدوس على تاب تاني، الخلفية الرمادي بتتزحلق من التاب القديم للجديد بدل ما تختفي وتظهر، لأن الاتنين بنفس [[layoutId]]. ولو دوست بسرعة بين تابين، الحركة بتتقطع وتغيّر اتجاهها من مكانها الحالي من غير ما تنط. ومع reduce motion من النظام، [[reducedMotion="user"]] بيلغي حركات الـ transform والـ layout ويسيب الـ opacity.`
        },
        {
          cmd: "كلمة بتتبدّل في عنوان",
          title: "كلمة بتتغيّر جوه العنوان («بنعمل متاجر / مواقع / تطبيقات») من غير ما السطر يتهز أو يتكسر",
          desc: R`العنوان فيه كلمة بتتبدّل كل كام ثانية. لو غيّرت نص [[<span>]] بس، الكلمات اللي بعدها بتتحرك مع كل تبديل (الكلمة الأطول بتزقّها)، وعلى الموبايل السطر بيتكسر ويرجع. ولو حطيت الكلمات [[position: absolute]] فوق بعض (زي مكوّنات «GooeyText»)، مبتاخدش مكان خالص فبتركب على الكلام اللي بعدها وتخرج برا الشاشة.

الحل: [[display: inline-grid]] وكل الكلمات في **نفس الخلية** ([[grid-area: 1 / 1]])، فالخلية عرضها قد **أطول** كلمة، والمستخبي [[opacity: 0]]. العرض ثابت، والسطر مبيتهزش. ومعاها: [[prefers-reduced-motion]] يوقف التبديل، وقارئ الشاشة ياخد جملة ثابتة، وفلتر الـ gooey (لو عايزه) يشتغل وقت التبديل بس لأنه بيبوّظ الحروف العربي وهي واقفة.`,
          example: R`<h1>بنعمل <span class="swap" aria-hidden="true"><span class="on">متاجر</span><span>مواقع</span><span>تطبيقات موبايل</span></span><span class="sr-only">متاجر ومواقع وتطبيقات موبايل</span> بسرعة</h1>
.swap { display: inline-grid; vertical-align: bottom; }
.swap > span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .6s; }
.swap > span:not(.on) { opacity: 0; }
@media (prefers-reduced-motion: reduce) { .swap > span { transition: none; } }
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(next, 2500);`,
          lines: [
            R`العنوان: الكلمات التلاتة موجودة في الـ HTML جوه [[.swap]]، وواحدة بس عليها [[on]]. و [[aria-hidden]] يخلّي قارئ الشاشة يتجاهل الحتة المتحركة، و [[sr-only]] جملة ثابتة ليه بدالها (مستخبية من الشاشة).`,
            R`[[inline-grid]]: الـ span بيفضل جوه السطر زي كلمة، بس جواه grid. و [[vertical-align: bottom]] يخلّي قاعدته على نفس خط الكلام اللي جنبه.`,
            R`كل كلمة في الخلية الأولى ([[grid-area: 1 / 1]] = صف 1 وعمود 1)، فالكلمات فوق بعض والخلية عرضها قد أطولهم. و [[nowrap]] الكلمة متتكسرش جواها، و [[transition]] التبديل يبقى fade.`,
            R`أي كلمة مش [[on]] شفافة. لسه واخدة مكانها في الحساب (عكس [[display: none]])، وده اللي مثبّت العرض.`,
            R`لو المستخدم طالب «حركة أقل» من نظامه: من غير fade.`,
            R`والـ JavaScript: لو مش طالب حركة أقل بس، بدّل الكلمة كل ٢٫٥ ثانية ([[next]] بتشيل [[on]] من الحالية وتحطها على اللي بعدها). مع «حركة أقل» الكلمة الأولى بتفضل ثابتة.`,
          ],
          try: R`اعمل العنوان بـ ٣ طرق في صفحة واحدة: (١) span بيتغيّر نصه بـ [[textContent]]، (٢) كلمات [[position: absolute]] فوق بعض، (٣) [[inline-grid]]. بدّل الكلمات وقيس في Console عرض الـ span ومكان آخر كلمة في السطر ([[getBoundingClientRect().right]]) في كل حالة، على 900 و 360.`,
          flag: "script",
          teach: R`## العَرَض

عنوان الـ hero: «بنعمل **متاجر** بسرعة»، والكلمة الوسطانية بتتبدّل: متاجر، مواقع، تطبيقات موبايل. مع كل تبديل كلمة «بسرعة» بتتنطط يمين وشمال، وعلى الموبايل العنوان بيبقى سطر ساعة وسطرين ساعة فكل اللي تحته بيتهز. وجربنا مكوّن جاهز (GooeyText: كلمات فوق بعض بفلتر SVG بيعمل «blob» بينهم): الكلمة ركبت على «بسرعة» وطلعت برا الشاشة على الموبايل.

---

## المعمل

صفحة فيها ٣ عناوين بنفس الجملة و ٣ طرق، وخط [[system-ui]] عريض 40px، وسكربت Playwright (باكدج [[playwright-core]] 1.64.1 على Chrome 156) بيبدّل الكلمة ٣ مرات ويقيس: ارتفاع العنوان، وعرض الكلمة المتبدّلة، ومكان حافة كلمة «بسرعة» ([[end.x]])، و [[scrollWidth]].

~~~text الناتج على عرض 900
word 0: v1: h1=52 word=87 end.x=667 | v2: h1=52 word=0 end.x=754 | v3: h1=52 word=258 end.x=496
word 1: v1: h1=52 word=97 end.x=657 | v2: h1=52 word=0 end.x=754 | v3: h1=52 word=258 end.x=496
word 2: v1: h1=52 word=258 end.x=496 | v2: h1=52 word=0 end.x=754 | v3: h1=52 word=258 end.x=496
~~~

~~~text الناتج على عرض 360
word 0: v1: h1=52 word=87 end.x=127 | v2: h1=52 word=0 end.x=214 | v3: h1=156 word=258 end.x=336
word 1: v1: h1=104 word=97 end.x=336 | v2: h1=52 word=0 end.x=214 | v3: h1=156 word=258 end.x=336
word 2: v1: h1=104 word=252 end.x=218 | v2: h1=52 word=0 end.x=214 | v3: h1=156 word=258 end.x=336
~~~

## ١. الطريقة الساذجة (v1): span بيتغيّر نصه

- على 900: «بسرعة» اتحركت من 667 لـ 657 لـ 496: **171px** في تبديلة واحدة. ده layout shift في نص العنوان.
- على 360: ارتفاع العنوان 52 ثم 104 (سطر ثم سطرين). كل اللي تحت العنوان بيتزق 52px لتحت ويرجع. ودي بتتحسب في CLS (درس «CLS» في الفئة الجاية).

## ٢. كلمات absolute فوق بعض (v2، طريقة GooeyText)

- [[word=0]]: الـ span اللي شايل الكلمات **عرضه صفر**، لأن العناصر الـ absolute مبتاخدش مكان. فالسطر ثابت (end.x 754 دايمًا)، بس الكلمة مرسومة **فوق** «بسرعة».
- على 360 قسنا الصفحة لوحدها: [[scrollWidth=393]] والعنصر الخارج [[تطبيقات موبايل]]. الكلمة الطويلة خرجت برا الشاشة.

وفلتر الـ gooey نفسه:

~~~html
<filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
</filter>
~~~

- [[feGaussianBlur]]: يغبّش الحروف 4px.
- [[feColorMatrix]]: آخر سطر في الـ matrix بيحسب الشفافية الجديدة = الشفافية × 20 ناقص 8. يعني أي حتة شفافيتها أقل من حوالي 0.4 تختفي، والباقي يبقى مصمت. فالحروف المغبّشة اللي جنب بعض بتلزق في بعض كـ «blob».

ولما الفلتر ده متساب على العنوان **وهو واقف**، الحروف العربي العريضة اتلزقت في بعض والنقط ساحت (في اللقطة الكلمة بقت بقعة). يعني لو عايز التأثير ده، الفلتر يتحط بكلاس وقت التبديل بس (٦٠٠ms) ويتشال بعده.

## ٣. الحل (v3): [[inline-grid]] وكل الكلمات في خلية واحدة

~~~css
.swap { display: inline-grid; vertical-align: bottom; }
.swap > span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .6s; }
.swap > span:not(.on) { opacity: 0; }
~~~

- [[word=258]] ثابت في التلات تبديلات: عرض «تطبيقات موبايل»، أطول كلمة. الخلية بتاخد عرض أعرض حاجة جواها حتى لو شفافة.
- [[end.x=496]] ثابت على 900، و [[336]] ثابت على 360. «بسرعة» مبتتحركش.
- [[h1=156]] على 360 (٣ سطور) بس **ثابت**: العنوان أطول من الأول، بس مبيتهزش. والـ [[scrollWidth]] على 360 = 360 (مفيش scroll أفقي).

ليه [[opacity: 0]] مش [[display: none]] أو [[visibility]]؟ [[display: none]] بيشيل الكلمة من الحساب فالعرض يرجع يتغيّر. [[visibility: hidden]] كان هيشتغل كمان (بيسيب المكان)، بس [[opacity]] هي اللي بتتعمل لها transition ناعم.

### فخ: أطول كلمة أعرض من الشاشة

جربنا نفس الكود والعنوان بالحجم الافتراضي لـ [[<h1>]] (2em = 80px هنا): على 360 الـ [[.swap]] عرضه 516 و [[scrollWidth=540]]. لأن [[nowrap]] + أطول كلمة = عرض ثابت ممكن يبقى أكبر من الموبايل. الحل حجم خط بيصغر مع الشاشة:

~~~css
h1 { font-size: clamp(1.75rem, 8vw, 5rem); }
~~~

بعدها على 360: [[.swap]] بقى 186 و [[scrollWidth=360]]، وعلى 900: 465 و [[900]]. وفي الحالتين الارتفاع ثابت مع كل تبديل.

---

## ٤. الحركة المخففة وقارئ الشاشة

~~~js
const words = document.querySelectorAll(".swap > span");
let i = 0;
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    words[i].classList.remove("on");
    i = (i + 1) % words.length;
    words[i].classList.add("on");
  }, 2500);
}
~~~

- [[i = (i + 1) % words.length]]: الكلمة اللي بعدها، ولما توصل للآخر ترجع لـ 0.
- جربناه في Playwright بـ [[reducedMotion: "reduce"]]: ٤ قراءات على ٤ ثواني والكلمة «متاجر» في الأربعة. ومن غيره: متاجر، مواقع، تطبيقات موبايل، متاجر.

وقارئ الشاشة: كلمة بتتغيّر كل ٢٫٥ ثانية مع [[aria-live="polite"]] هتتقري كل مرة، وده مزعج في عنوان. عشان كده المثال حاطط [[aria-hidden="true"]] على الحتة المتحركة، وجملة ثابتة [[sr-only]] فيها التلات كلمات. لو التبديل معلومة مهمة وبطيء (مش ديكور)، ساعتها [[aria-live="polite"]] على الـ [[.swap]] نفسه وشيل [[aria-hidden]]. (ده من وثائق ARIA؛ ماجربناهوش على قارئ شاشة حقيقي.)

## ٥. العربي: [[letter-spacing]] و «scramble»

- قسنا الجملة العربي بـ [[letter-spacing: -0.025em]] (اللي [[tracking-tight]] بيعمله): العرض 352.7 بقى 350.7، يعني ٢px بس، والإنجليزي 321.7 بقى 306.7. و [[0.2em]] زوّد المسافات بين الكلمات بس، والحروف المتصلة فضلت متصلة. يعني Chrome 156 **مبيطبّقش** letter-spacing جوه الكلمة العربي. بس متعتمدش على ده في كل متصفح ونسخة: شيل [[tracking-*]] من العناوين العربي، لأنه مش بيعمل الشكل اللي انت عايزه أصلًا.
- تأثير «scramble» (حروف عشوائية بتتقلب لحد ما الكلمة تظهر) معمول للحروف اللاتيني: الحرف العربي شكله بيتغيّر حسب مكانه في الكلمة، فحروف عشوائية متصلة بتطلع شكل مكسور. خليه للإنجليزي بس. (دي قاعدة من الحالة الأصلية، ماقسناهاش.)

## الخلاصة

| الطريقة | السطر بيتهز؟ | بيركب على اللي بعده؟ | الموبايل |
|---|---|---|---|
| [[textContent]] بيتغيّر | أيوه (171px على 900) | لأ | الارتفاع بيتغيّر (52 و 104) |
| [[absolute]] فوق بعض | لأ | **أيوه** (عرضه صفر) | خارج برا الشاشة ([[393]]) |
| [[inline-grid]] و [[grid-area: 1 / 1]] | لأ | لأ | ثابت، بشرط حجم الخط يصغر |

> عرض الكلمة المتبدّلة = عرض أطولهم، من الأول. ده اللي بيخلّي السطر ثابت.`,
          deep: {
            why: R`العناوين المتحركة في الـ hero بتبقى أول حاجة الزائر يشوفها، وأي اهتزاز فيها بيبان رخيص وبيحرّك كل الصفحة (CLS). والطرق الجاهزة (absolute فوق بعض) بتحل الاهتزاز بأنها تشيل الكلمة من حساب العرض، فتكسر حاجة تانية: الركوب على الكلام، والخروج برا الشاشة.`,
            how: R`في الـ grid، الأطفال اللي ليهم نفس [[grid-area]] بيتحطوا فوق بعض في نفس الخلية، وعرض العمود بيتحسب من أعرض طفل ([[auto]] track بياخد max-content). و [[opacity: 0]] مبيشيلش العنصر من الـ layout، فالكلمات المستخبية لسه بتحدد العرض. و [[inline-grid]] بيخلّي الـ grid يقعد جوه السطر كأنه كلمة. وفلتر الـ gooey بيشتغل على الصورة المرسومة (بعد الـ layout)، فمبيأثرش على العرض بس بيأثر على شكل الحروف.`,
            when: R`أي نص بيتبدّل في مكانه: كلمة في عنوان، عدّاد، حالة زرار («احفظ» / «اتحفظ ✓»)، سعر بعملات مختلفة. نفس الفكرة: كل الحالات موجودة في نفس الخلية، والظاهر واحدة بس. ومش للنص الطويل اللي المفروض يلف على كذا سطر.`,
            mistakes: R`[[textContent]] بيتغيّر فالسطر يتهز. [[position: absolute]] فيركب ويخرج برا. [[display: none]] للكلمات المستخبية فالعرض يرجع يتغيّر. أطول كلمة [[nowrap]] بخط ثابت كبير فتخرج برا الموبايل. فلتر gooey متساب على النص وهو واقف. [[aria-live]] على تبديل كل ثانيتين. ومفيش [[prefers-reduced-motion]].`
          },
          sol: R`(١) [[textContent]]: على 900 حافة آخر كلمة بتتحرك مع كل تبديل (في المعمل 667 ثم 657 ثم 496)، وعلى 360 ارتفاع العنوان بيتغيّر (52 و 104). (٢) [[absolute]]: عرض الـ span صفر، والكلمة راكبة على اللي بعدها، وعلى 360 [[scrollWidth]] أكبر من 360. (٣) [[inline-grid]]: عرض الـ span ثابت = أطول كلمة (258 في المعمل)، وحافة آخر كلمة ثابتة، والارتفاع ثابت. ولو العنوان كبير والكلمة الطويلة خرجت برا 360، صغّر الخط بـ [[clamp()]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[.swap { display: inline-grid }]] فيه ٣ كلمات عرضها 87 و 97 و 258، وكلهم [[grid-area: 1 / 1]] والمستخبيين [[opacity: 0]]. عرض [[.swap]] كام؟ ولو المستخبيين [[display: none]] بدل [[opacity: 0]]؟ اكتب، وبعدين قيس بـ [[getBoundingClientRect().width]].`, done: R`كتبت 258 في الحالة الأولى، وفي التانية عرض الكلمة الظاهرة بس (87 أو 97 أو 258 حسب الظاهرة)، والقياس طابق.` },
            { lvl: 'تطبيق', t: R`**ابني:** الـ hero ده: عنوان فيه كلمة بتتبدّل بين ٤ كلمات (عربي)، وزرار تحت العنوان. اعمله بـ [[inline-grid]]، و [[prefers-reduced-motion]]، وجملة [[sr-only]]. اتأكد بـ Playwright إن مكان الزرار ([[getBoundingClientRect().top]]) ثابت في ٤ تبديلات على 1440 و 360.`, done: R`٨ أرقام لـ [[top]] الزرار: ٤ متساويين على 1440، و ٤ متساويين على 360، ومفيش scroll أفقي على 360.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<span class="w"></span>]] و [[setInterval(() => w.textContent = words[i++ % 3], 2000)]]، والكلام اللي بعد الكلمة بيتنطط. حوّله لـ [[inline-grid]] من غير ما تغيّر الكلمات ولا الوقت، وقيس [[right]] بتاع الكلمة اللي بعده قبل وبعد.`, done: R`قبل: ٣ قيم مختلفة لـ [[right]]. بعد: قيمة واحدة في الـ ٣ تبديلات.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس العنوان بخط 80px ثابت، وبـ [[clamp(1.75rem, 8vw, 5rem)]]. على 320 و 360 و 414: [[scrollWidth]] كام في كل حالة؟`, done: R`جدول ٣ عروض × حالتين: الخط الثابت فيه [[scrollWidth]] أكبر من العرض في واحدة على الأقل، و [[clamp]] مساوي للعرض في التلاتة.` },
            { lvl: 'تحدي', t: R`**أشكال:** اعمل تأثير gooey بالفلتر اللي في الدرس، بس الفلتر يتحط بكلاس [[morphing]] وقت التبديل بس (٦٠٠ms) ويتشال بعدها. خد لقطتين بـ Playwright: والعنوان واقف، ووسط التبديل. والعربي لازم يبقى مقري في اللقطة الأولى.`, done: R`لقطة الوقوف: الحروف والنقط واضحة ومفيش فلتر على العنصر ([[getComputedStyle(el).filter]] = [[none]]). لقطة التبديل: الكلمتين ملزوقين كـ blob، و [[filter]] فيها [[url]].` },
          ],
        }
      ]
    },
    {
      t: "الأداء",
      l: 3,
      n: "الصفحة تظهر بسرعة ومتتنطش، والـ JavaScript ميجبرش المتصفح يعيد الحساب على الفاضي",
      projects: [
        { lvl: 'صغير', t: R`صفحة مقال CLS بتاعها صفر`, what: R`صفحة مقال فيها صورة هيرو، و ٣ صور جوه الكلام، وفيديو مضمّن، ومكان إعلان، وخط من موقعك. احجز مكان كل حاجة ([[width]] و [[height]] و [[aspect-ratio]] و [[min-height]] وخط احتياطي مظبوط). من درس CLS.`, done: R`snippet الـ [[PerformanceObserver]] على [[layout-shift]] بيطبع صفر entries (أو مجموع أقل من 0.01) على Slow 4G و Disable cache، و Lighthouse بيقول CLS أقل من 0.05.` },
        { lvl: 'صغير', t: R`صياد الـ forced reflow`, what: R`خد صفحة فيها scroll handler أو loop بيقرا ويكتب مقاسات (اكتبها انت لو مفيش)، وسجّل Performance trace، ولاقي كل «Forced reflow» بالسطر بتاعه، وصلّحهم بالترتيب (اقرا الكل ثم اكتب الكل) أو CSS. من درس layout thrashing.`, done: R`الـ trace بعد التصليح مفيهوش ولا تحذير Forced reflow في الـ handler، والوقت بتاع الـ handler نزل لرقم مكتوب قبل وبعد.` },
        { lvl: 'متوسط', t: R`هيرو بيظهر في أقل من ثانيتين`, what: R`صفحة landing أول شاشة فيها صورة كبيرة وعنوان بخط عربي. اعمل: [[srcset]] و [[sizes]] و [[fetchpriority="high"]] للصورة (ومن غير [[loading="lazy"]] عليها)، و preload للخط الوحيد اللي في أول شاشة، و CSS أول شاشة inline والباقي ملف واحد صغير، و JavaScript بـ [[defer]]. بيجمع دروس الوحدة.`, done: R`Lighthouse (Mobile، Slow 4G) بيدّي LCP أقل من 2.5s و CLS أقل من 0.1 و TBT أقل من 200ms، وفي Network الصورة والخط أولويتهم High وبيبدأوا قبل ما الـ CSS الكبير يخلص، ومفيش تحذير «preloaded but not used».` },
        { lvl: 'متوسط', t: R`لستة ٢٠٠٠ منتج بتعمل scroll ناعم`, what: R`صفحة فيها ٢٠٠٠ كارت منتج. قيس وقت أول رسم ووقت الـ scroll، وبعدين حط [[content-visibility: auto]] و [[contain-intrinsic-size: auto 320px]] على كل كارت، والصور [[loading="lazy"]] و [[decoding="async"]] بمقاسات، وقيس تاني.`, done: R`جدول قبل وبعد: وقت الـ Rendering في Performance لأول تحميل، وعدد الصور اللي اتحمّلت في أول شاشة، وإن الـ scrollbar مبيتنطش لما توصل للكروت (بفضل [[contain-intrinsic-size]]).` },
        { lvl: 'كبير', t: R`إنقاذ صفحة بطيئة`, what: R`ابني صفحة فيها ٨ مشاكل أداء بقصد زي اللي بتتكرر في المشاريع: خط من غير [[font-display]] بـ [[@import]]، وصورة الهيرو [[loading="lazy"]]، وصور من غير مقاسات، و CSS 300KB نصه مش مستخدم، و scroll handler بيعمل layout thrashing، و [[filter: blur(80px)]] على عنصر قد الشاشة، و [[will-change]] على كل الكروت، وبانر بيتحط فوق الصفحة بعد ثانية. وبعدين شخّص كل واحدة بأداة (Lighthouse، و Performance، و Coverage، و Rendering › Paint flashing و Layer borders) وصلّحها. بيجمع الوحدة دي مع الحركة والصور.`, done: R`تقرير فيه لكل مشكلة: العَرَض، والأداة اللي كشفتها، والسبب، والتصليح، والرقم قبل وبعد. Lighthouse Performance من تحت الـ 50 لـ 90 أو أكتر على Mobile، والصفحة شكلها زي ما هو، والتقرير بيتعاد بنفس الخطوات على جهاز تاني بنفس النتيجة تقريبًا.`, ext: R`اعمل GitHub Action بيشغّل Lighthouse CI بـ budget ([[budget.json]]) ويوقّع الـ PR لو LCP أو CLS أو حجم الـ CSS عدّى الحد.` },
        { lvl: 'فكرة', t: R`قيس موقع بتستخدمه كل يوم`, what: R`اختار موقع بتفتحه كتير وبتحس إنه تقيل، وقيسه بـ Lighthouse و Performance (من غير ما تلمس الكود بتاعه)، وطلّع أكبر ٣ أسباب للبطء بأدلة، واكتب إزاي كنت هتصلّحهم.`, done: R`تقرير صفحة واحدة: ٣ مشاكل، ولكل واحدة لقطة من الأداة ورقم، والتصليح المقترح والمكسب المتوقع.`, ext: R`اعمل نسخة محلية صغيرة من الجزء البطيء وجرّب التصليح فعلًا وقيس الفرق.` },
      ],
      items: [
        {
          cmd: "CLS",
          title: "الصفحة بتتنط وانت بتقرا",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي تغيير من دول بيعمل layout shift: عنصر [[position: relative]] الـ [[top]] بتاعه اتغير من 0 لـ 40px، وعنصر عليه [[transform: translateY(40px)]]، و div ارتفاعه 80px اتحط في أول الـ body؟ اكتب، وبعدين جرّب بـ [[new PerformanceObserver(l => console.log(l.getEntries())).observe({ type: "layout-shift", buffered: true })]].`, done: R`[[top]] طلّع entry، و transform مطلّعش حاجة، والـ div اللي اتحط فوق طلّع entry قيمته أكبر (قسناها 0.022 في Chrome 156) لأنه زق كل اللي تحته. فالحركة بـ transform مبتأثرش على CLS.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** صفحة فيها ٣ صور من غير [[width]] و [[height]]. افتحها بـ Slow 4G و Disable cache وقيس CLS بالـ snippet أو Lighthouse، وبعدين زوّد المقاسات وقيس تاني.`, done: R`رقمين قبل وبعد، والبعد صفر أو قريب منه، وفي Performance › Layout Shifts مبقاش فيه مستطيلات على الصور.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** بانر «خصم ٢٠٪» بيتحط في أول الصفحة بـ JavaScript بعد ثانية من التحميل وبيزق كل حاجة لتحت. صلّحه بطريقتين: مكان محجوز بـ [[min-height]] من الأول، أو بانر [[position: fixed]] فوق المحتوى.`, done: R`الـ snippet بيطلّع صفر layout shifts من البانر في الطريقتين، والبانر لسه بيتقفل بزرار ليه اسم، وفي طريقة الـ fixed المحتوى اللي تحته مش مستخبي (فيه [[padding]] بنفس ارتفاعه أو البانر تحت).` },
            { lvl: 'تطبيق', t: R`**ابني:** لستة جاية من API وهمي بتتأخر 1.5 ثانية. وهي بتتحمّل اعرض skeleton بنفس مقاس الكارت الحقيقي (shimmer من درس الحركة)، والحاوية عليها [[aria-busy="true"]] لحد ما البيانات توصل.`, done: R`CLS صفر لحظة ما البيانات تيجي، وارتفاع الـ skeleton والكارت الحقيقي الفرق بينهم أقل من 4px، و [[aria-busy]] بقى [[false]] بعدها، والـ shimmer واقف مع reduce.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** استخدم مكتبة [[web-vitals]] (نسخة attribution) و [[onCLS(console.log, { reportAllChanges: true })]] على صفحة بتتنط، وطلّع من النتيجة العنصر اللي عمل أكبر shift ووقته.`, done: R`عرفت الـ selector من [[attribution.largestShiftTarget]] والوقت من [[attribution.largestShiftTime]]، وصلّحت العنصر ده بالذات، والرقم نزل تحت 0.1.` },
          ],
          desc: R`CLS (Cumulative Layout Shift) مقياس من جوجل لكمية الحركة المفاجئة للمحتوى: صورة اتحمّلت ودفعت الكلام، أو إعلان ظهر فوق الزرار. المطلوب [[0.1]] أو أقل.

الأسباب المشهورة: صور وفيديو و iframes من غير مقاسات، وخطوط بتتبدّل بمقاسات مختلفة، ومحتوى بيتحط فوق محتوى موجود (بانر كوكيز، أو إشعار) بعد ما الصفحة ترسم.`,
          example: R`<img src="/hero.webp" width="1200" height="600" alt="...">
<iframe src="https://example.com/embed/video" class="video" title="فيديو الشرح"></iframe>
<div class="ad-slot"></div>
<div class="skeleton"></div>
<style>
  img, video { max-width: 100%; height: auto; }
  .video { width: 100%; aspect-ratio: 16 / 9; }
  .ad-slot { min-height: 250px; }
  .skeleton { height: 7.5rem; border-radius: 0.75rem; background: whitesmoke; }
  .toast { position: fixed; bottom: 1rem; }
</style>`,
          try: R`افتح موقعك وفي DevTools › Performance اعمل record مع reload، ودوّر على Layout shifts (أو شغّل Lighthouse). وبعدين امسح width و height من صورة الهيرو، واعمل Slow 4G، وشوف الرقم بيزيد.`,
          flag: "script",
          deep: {
            why: R`انت داخل تدوس «إلغاء» والصفحة اتنطت فدست «تأكيد الدفع». CLS مش مجرد إزعاج، ده بيخلي الناس تدوس حاجات غلط، وجوجل بيحسبه ضمن Core Web Vitals (مع LCP و INP) اللي بتأثر على الترتيب.`,
            how: R`المتصفح بيسجّل كل مرة عنصر ظاهر يتحرك من مكانه بين frame والتاني من غير ما المستخدم يكون السبب. الـ score لكل shift = (نسبة الشاشة اللي اتأثرت) × (المسافة اللي اتحركتها كنسبة من الشاشة). والـ shifts القريبة من بعض بتتجمع في مجموعة (session window)، و CLS = أكبر مجموعة في عمر الصفحة.

الحركة اللي بتحصل في خلال 500ms بعد ضغطة من المستخدم (فتح accordion مثلًا) مش بتتحسب لأنها متوقعة. وحركات [[transform]] مش بتتحسب لأنها مش بتغيّر الـ layout، عشان كده الـ animations بتاعة transform آمنة.

الحلول كلها فكرة واحدة: احجز المكان قبل ما المحتوى يوصل. للصور: width و height (أو [[aspect-ratio]]). للخطوط: [[size-adjust]] للخط الاحتياطي (next/font بيعمله) أو [[font-display: optional]]. للمحتوى الديناميكي: skeleton بنفس المقاس، أو اعرضه في مكان مش هيزق حاجة. وفي Next.js، [[next/image]] بيجبرك على المقاسات، و [[loading.tsx]] بيعرض skeleton.

القياس: في المعمل Lighthouse و Performance panel. وفي الحقيقة من المستخدمين (field data): Search Console و PageSpeed Insights، أو مكتبة [[web-vitals]] بتبعت الأرقام للـ analytics بتاعك.`,
            when: "قبل أي launch، وبعد ما تضيف صور أو خطوط أو widgets من برا (شات، وإعلانات، و embeds).",
            mistakes: R`تقيس على جهازك بنت سريع ومفيش shift، والمستخدم على 4G بيشوف الصفحة بتتنط. بانر كوكيز بيزق الصفحة لتحت بدل ما يبقى fixed. و [[<Image fill>]] جوه أب ملوش ارتفاع.`
          },
          teach: R`## كل سطر في المثال بيحجز مكان قبل ما المحتوى يوصل

CLS بيزيد لما حاجة ظاهرة تتنقل من مكانها لوحدها. والمثال كله فكرة واحدة: كل حاجة ممكن توصل متأخر (صورة، أو فيديو، أو إعلان، أو بيانات) ليها مكان محجوز من الأول. حطيناه في صفحة فيها عنوان، وصورة هيرو 1200×600 السيرفر بيأخّرها 800ms، و 20 فقرة تحتها، وبعدهم الـ iframe والإعلان والـ skeleton. شاشة 1000×800 في Chrome، وجمعنا الـ CLS بـ [[PerformanceObserver]] على نوع [[layout-shift]] (نفس الأرقام اللي Lighthouse بيجمعها).

---

## ١. الصورة

~~~text HTML
<img src="/hero.webp" width="1200" height="600" alt="...">
~~~

~~~text CSS
img, video { max-width: 100%; height: auto; }
~~~

- [[width="1200" height="600"]]: مقاس الصورة الأصلي. المتصفح بيحسب منهم النسبة (1200 ÷ 600 = 2:1) قبل ما الصورة توصل.
- [[max-width: 100%]]: متعديش عرض الأب. الشاشة كانت 1000 والـ body ليه margin، فالصورة بقت 968px.
- [[height: auto]]: الارتفاع يتحسب من العرض والنسبة: 968 ÷ 2 = 484. من غيرها الـ [[height="600"]] كان هيفضل 600 والصورة تتمط.
- [[alt]]: وصف الصورة لقارئ الشاشة (ملوش علاقة بالـ CLS).

### القياس

~~~text اتقاس في Chrome (الصورة متأخرة 800ms)
مع width و height:
  قبل ما الصورة توصل:  img 968×484   أول فقرة top=584
  بعد ما وصلت:         img 968×484   أول فقرة top=584   CLS = 0

من غيرهم:
  قبل ما الصورة توصل:  img 0×0       أول فقرة top=114
  بعد ما وصلت:         img 968×484   أول فقرة top=584   CLS = 0.2323
~~~

من غير المقاسات، الكلام كان بادئ عند 114 ونط 470px لتحت مرة واحدة، والـ CLS طلع أكتر من ضعف الحد (0.1). الرقم ده بيتحسب تقريبًا كده: (قد إيه من الشاشة اتأثر) × (المسافة اللي اتحركها كنسبة من ارتفاع الشاشة)، فبيكبر مع كمية الكلام اللي تحت الصورة وقد إيه نطت.

---

## ٢. الـ iframe

~~~text HTML + CSS
<iframe src="https://example.com/embed/video" class="video" title="فيديو الشرح"></iframe>
.video { width: 100%; aspect-ratio: 16 / 9; }
~~~

- [[iframe]] صفحة جوه صفحتك (زي فيديو YouTube). مقاسه الافتراضي 300×150 مهما كان جواه.
- [[title]]: اسم الـ iframe لقارئ الشاشة.
- [[aspect-ratio: 16 / 9]]: الارتفاع = العرض × 9 ÷ 16. قسناه: [[972 × 548.5]]. المحتوى نفسه 968 (زي الصورة) و 968 × 9 ÷ 16 = 544.5، والـ iframe عليه border افتراضي 2px من كل ناحية فبيزوّد 4 على العرض والارتفاع.

## ٣. الإعلان والـ skeleton

~~~text CSS
.ad-slot { min-height: 250px; }
.skeleton { height: 7.5rem; border-radius: 0.75rem; background: whitesmoke; }
~~~

- [[min-height: 250px]]: الـ div فاضي، بس ارتفاعه 250 (قسناه: [[ad h=250]]). لما الإعلان يوصل بنفس المقاس مفيش حاجة تتزق. و [[min]] عشان لو الإعلان طلع أطول يكبر.
- [[.skeleton]]: مربع رمادي ([[whitesmoke]]) بارتفاع 7.5rem = 120px (قسناه: [[skeleton h=120]])، تقريبًا قد المحتوى الحقيقي. و [[border-radius: 0.75rem]] = 12px تدوير.

## ٤. الإشعار

~~~text CSS
.toast { position: fixed; bottom: 1rem; }
~~~

[[position: fixed]]: العنصر بيطلع من مكانه في الصفحة ويتثبّت في الشاشة، فلما يظهر مش بيزق حاجة. و [[bottom: 1rem]] = 16px من تحت. أظهرناه بعد التحميل: الـ CLS زاد [[0.0000]].

## ٥. [[<style>]] نفسه

الـ CSS في المثال جوه [[<style>]] في نفس الصفحة، فمتطبّق من أول رسمة. لو المقاسات دي كانت في ملف CSS بيتحمّل متأخر، الصورة كانت هتترسم من غير [[height: auto]] الأول وتتغير بعدين.

---

## الملخص

| المحتوى المتأخر | الحجز | اتقاس |
|---|---|---|
| صورة | [[width]] و [[height]] + [[height: auto]] | 968×484 من أول لحظة، CLS ‏0 (من غيرهم 0.2323) |
| iframe | [[aspect-ratio: 16 / 9]] | 972×548.5 |
| إعلان | [[min-height: 250px]] | 250 |
| بيانات من API | skeleton بنفس الارتفاع | 120 |
| إشعار | [[position: fixed]] | CLS زاد 0 |

## الخلاصة

- CLS = الحاجات اللي بتتنقل لوحدها، والحد الكويس 0.1.
- الحل دايمًا: احجز المكان قبل ما المحتوى يوصل.
- اختبر بنت بطيء أو صورة متأخرة: على نت سريع والصورة في الكاش مش هتشوف النطة.`,
          lines: [
            "width و height بيحجزوا مكان بنسبة 2:1 قبل ما الصورة توصل.",
            "iframe فيديو: ملوش مقاسات من نفسه.",
            "مكان إعلان أو widget بيتحمّل متأخر.",
            "مكان محتوى جاي من API.",
            R`بلوك [[<style>]] صغير فيه القواعد اللي بتحجز المكان (في مشروع حقيقي في ملف الـ CSS).`,
            "الصورة تصغر مع الشاشة والارتفاع يتحسب من النسبة، فالمكان المحجوز صح.",
            R`[[aspect-ratio]] بيحجز ارتفاع الفيديو من عرضه.`,
            "احجز أقل ارتفاع للإعلان حتى لو لسه فاضي.",
            "skeleton بنفس ارتفاع المحتوى الحقيقي تقريبًا، فلما البيانات توصل مفيش نطة.",
            R`الإشعارات [[fixed]]: بتظهر فوق الصفحة من غير ما تزق حاجة.`,
            R`قفلة الـ style؛ القواعد دي لازم تبقى في الـ CSS اللي بيتحمّل قبل الرسم مش بعده.`
          ],
          sol: R`في Performance بعد record مع reload: هتلاقي track اسمه Layout shifts (أو مربعات بنفسجي) عند اللحظة اللي الصورة وصلت فيها، ولما تدوس عليه يوريك العناصر اللي اتحركت. وفي Lighthouse الرقم تحت Cumulative Layout Shift؛ الكويس أقل من 0.1.

قست ده على صفحة فيها عنوان وصورة هيرو 1200×600 وكلام كتير تحتها، والصورة بتتأخر 800ms: مع [[width]] و [[height]] الـ CLS كان [[0]]، لأن المتصفح حجز مكان بنسبة 2:1 من الأول. من غيرهم الـ CLS طلع حوالي [[0.43]] (أكتر من 4 أضعاف الحد)، لأن الكلام كله نط لتحت مرة واحدة لما الصورة وصلت.

لو الرقم مزدش بعد ما مسحت المقاسات: غالبًا الصورة في الكاش فبتيجي فورًا، اعمل Disable cache. أو فيه [[aspect-ratio]] في الـ CSS بيحجز المكان بدل الـ attributes. وخلي بالك إن Lighthouse بيقيس التحميل بس؛ الـ shifts اللي بتحصل بعد ما المستخدم يعمل scroll بتبان في Web Vitals الحقيقية (CrUX) مش في Lighthouse.`
        },
        {
          cmd: "critical CSS",
          title: "ليه الصفحة بيضا ثانيتين قبل ما تظهر؟",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي واحد من دول بيوقّف أول رسم: [[<link rel="stylesheet" media="print">]]، و [[<link rel="stylesheet" media="(min-width: 2000px)">]] على شاشة 1280، و [[<script src>]] في الـ head من غير defer، و [[<script defer>]]، و [[<script type="module">]]، و [[@import]] جوه ملف CSS؟`, done: R`بيوقّف: السكربت العادي (بيوقف قراية الـ HTML)، و [[@import]] (سلسلة طلبات قبل الرسم). مش بيوقّف: print، والـ media اللي مش متطابقة (بتتحمّل بأولوية قليلة)، و defer، و module. واتأكدت من عمود Priority في Network و Lighthouse «Render-blocking resources».` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس الصفحة مرتين على Slow 4G: مرة بملف CSS واحد 200KB في الـ head، ومرة بـ CSS أول شاشة inline (أقل من 14KB) والباقي بيتحمّل من غير ما يوقّف ([[media="print"]] و [[onload="this.media='all'"]]).`, done: R`FCP قبل وبعد من Lighthouse أو Performance، والتانية أسرع، ومفيش «وميض» لما الـ CSS الكامل يوصل (الأول شاشة شكلها واحد في الحالتين).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صورة الهيرو عليها [[loading="lazy"]] «عشان الأداء». قيس LCP، وبعدين شيل الـ lazy وزوّد [[fetchpriority="high"]] (أو preload بـ [[imagesrcset]] لو الصورة background).`, done: R`LCP قبل وبعد من Lighthouse، وفي Network الصورة بقت أولويتها High وبتبدأ بدري في الـ waterfall، وباقي الصور اللي تحت لسه lazy.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عملت [[<link rel="preload" href="/f.woff2" as="font" type="font/woff2" crossorigin>]] بس مفيش CSS بيستخدم الخط ده. الكونسول هيقول إيه بعد التحميل؟`, done: R`Chrome 156 طلّع تحذير: «The resource http://…/f.woff2 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate [[as]] value and it is preloaded intentionally.» يعني preload غلط بيضيّع bandwidth من حاجات تانية.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** افتح DevTools › Coverage (من Command Menu) وسجّل وانت بتفتح الرئيسية بتاعتك. كام في المية من الـ CSS مش مستخدم؟ وأنهي ملف أسوأ؟`, done: R`رقم لكل ملف (Unused Bytes)، وعرفت إن الرقم ده لصفحة واحدة بس (الصفحات التانية ممكن تستخدم الباقي)، وطلعت بخطة: إيه يتقسم أو يتمسح.` },
          ],
          desc: R`المتصفح مش بيرسم أي حاجة لحد ما كل ملفات الـ CSS اللي في الـ head تتحمّل (render-blocking). فكل ملف CSS كبير أو بطيء أو جاي من سيرفر تاني بيأخّر أول ظهور للصفحة.

الحل: CSS صغير (Tailwind بيطلّع المستخدم بس)، والـ CSS الضروري لأول شاشة (critical CSS) يبقى أول حاجة أو inline، والباقي يتأجّل. و [[preload]] و [[preconnect]] للحاجات اللي هتحتاجها بدري.`,
          example: R`<head>
  <link rel="preconnect" href="https://cdn.example.com" crossorigin>
  <link rel="preload" href="/fonts/cairo-var.woff2" as="font" type="font/woff2" crossorigin>
  <style>header{height:4rem}.hero{min-height:60svh}</style>
  <link rel="stylesheet" href="/app.css">
  <link rel="stylesheet" href="/print.css" media="print">
  <script src="/app.js" defer></script>
</head>`,
          try: R`افتح DevTools › Network واعمل reload وبص على الـ Waterfall: شوف أول رسم حصل امتى بالنسبة لملفات الـ CSS. وبعدين في Lighthouse دوّر على تحذير الـ render-blocking requests.`,
          flag: "script",
          deep: {
            why: "لو المتصفح رسم الصفحة قبل الـ CSS، هتظهر HTML خام وبعدين تتقلب فجأة (FOUC). عشان كده بيستنى. بس ده معناه إن كل ميلي ثانية في تحميل الـ CSS هي ميلي ثانية الشاشة فيها بيضا، ودا بيأثر مباشرة على FCP و LCP.",
            how: R`المتصفح بيقرا الـ HTML، ولما يلاقي [[<link rel="stylesheet">]] بيبدأ تحميله ويكمّل قراية، بس مش بيرسم لحد ما الـ CSS كله يتحمّل ويتحلل. لو ملف CSS فيه [[@import]] لملف تاني، المتصفح مش هيعرف عنه غير بعد ما الأول يوصل، فبيبقى تحميل ورا تحميل. ودا ليه [[@import url()]] لخطوط خارجية جوه ملف CSS أبطأ من [[<link>]] في الـ head، وأبطأ بكتير من next/font.

[[media]] على الـ link بيخلّي الملفات اللي مش مطابقة (print مثلًا) تتحمّل بأولوية قليلة ومن غير ما توقف الرسم.

الـ critical CSS: تطلّع القواعد اللي أول شاشة محتاجاها وتحطها inline، والباقي يتحمّل بعدين. في مشروع Tailwind الـ CSS كله غالبًا عشرات الـ KB بعد الضغط، فالمكسب صغير ومش مستاهل التعقيد. و Next.js بيقسّم الـ CSS حسب الـ route، فكل صفحة بتحمّل الـ CSS بتاعها.

[[preconnect]] بيوفّر وقت الـ DNS والـ TCP والـ TLS مع سيرفر تاني (ممكن مئات الـ ms على الموبايل). و [[preload]] بيقول «هتحتاج الملف ده أكيد، ابدأ دلوقتي» بأولوية عالية، فاستخدمه لحاجة أو اتنين بس، وإلا كل حاجة بقت أولوية ومفيش حاجة أولوية.`,
            when: "صفحات الـ landing والصفحات اللي جاية من جوجل، واللي LCP بتاعها وحش. وأي موقع بيحمّل CSS أو خطوط من CDN خارجي.",
            mistakes: R`مكتبة CSS كاملة عشان كلاسين. [[@import]] جوه [[@import]]. preload لكل الخطوط والصور فالأولويات تبوظ. و CSS كل الصفحات في ملف واحد ضخم في مشروع PHP، فالصفحة الرئيسية بتحمّل تنسيق الداشبورد.`
          },
          teach: R`## الـ head بالترتيب اللي بيخلّي أول رسمة تيجي بدري

المثال [[<head>]] فيه 6 سطور، كل واحد بيقول للمتصفح حاجة عن الأولوية: افتح اتصال بدري، حمّل الخط بدري، ده CSS جاهز، ده CSS لازم تستناه، ده CSS متستناهوش، وده JavaScript متوقفش عشانه. حطيناه في صفحة على سيرفر محلي، وخلّينا السيرفر يأخّر [[app.css]] ثانية و [[print.css]] ثانيتين عشان نشوف مين بيوقف الرسم، وقرينا من Chrome أولوية كل request (من DevTools Protocol) ووقت أول رسمة (FCP = First Contentful Paint) من [[performance]].

---

## ١. [[<link rel="preconnect" href="https://cdn.example.com" crossorigin>]]

- [[rel]] = relation، نوع العلاقة بين الصفحة واللينك.
- [[preconnect]]: «هتحتاج السيرفر ده قريب، افتح الاتصال من دلوقتي». فتح اتصال جديد = DNS (يعرف الـ IP) + TCP (يفتح الخط) + TLS (التشفير بتاع https)، وده ممكن ياخد مئات الـ ms على موبايل.
- [[crossorigin]]: الاتصالات اللي بتجيب خطوط بتتعمل في وضع CORS، والمتصفح بيفصلها عن العادية. فلو هتجيب خطوط من السيرفر ده، الـ preconnect لازم يبقى بنفس الوضع، وإلا الاتصال اللي اتفتح مش هيتستخدم.

ده مش request، فمش هتلاقيه في قايمة الـ requests تحت.

## ٢. [[<link rel="preload" href="/fonts/cairo-var.woff2" as="font" type="font/woff2" crossorigin>]]

- [[preload]]: «حمّل الملف ده دلوقتي بأولوية عالية، هتحتاجه أكيد».
- [[as="font"]]: نوعه، عشان المتصفح يدّيه الأولوية الصح ويعيد استخدامه لما الـ CSS يطلبه.
- [[type="font/woff2"]]: لو المتصفح مبيدعمش النوع ده، ميحمّلوش.
- [[crossorigin]]: الخطوط دايمًا بتتطلب بـ CORS، حتى من نفس الموقع. من غيره الملف بيتحمّل مرتين.

من غير preload، المتصفح مش هيعرف إن فيه خط غير لما يقرا [[app.css]] ويلاقي [[@font-face]]، يعني بعد ما الـ CSS يوصل.

## ٣. [[<style>header{height:4rem}.hero{min-height:60svh}</style>]]

CSS جوه الصفحة نفسها (inline): مفيش request، فمتطبّق من أول رسمة. و [[60svh]] = 60% من ارتفاع الشاشة الصغير (s = small: لما شريط المتصفح في الموبايل ظاهر). قسناه: الهيدر [[64px]]، والهيرو [[432px]] (60% من شاشة ارتفاعها 720).

## ٤. [[<link rel="stylesheet" href="/app.css">]]

CSS عادي، و **render-blocking**: المتصفح مش هيرسم أي حاجة لحد ما يوصل.

## ٥. [[<link rel="stylesheet" href="/print.css" media="print">]]

[[media="print"]]: القواعد دي للطباعة بس. المتصفح لسه بيحمّله (لو المستخدم طبع)، بس بأولوية واطية ومن غير ما يوقف الرسم.

## ٦. [[<script src="/app.js" defer></script>]]

[[defer]]: حمّل الملف وانت بتكمّل قراية الـ HTML، ونفّذه بعد ما الـ HTML يخلص، بالترتيب. من غيره، الـ script في الـ head كان هيوقف قراية الصفحة لحد ما يتحمّل ويتنفذ.

---

## القياس

الأولوية اللي Chrome اداها لكل request (DevTools بيكتبها Highest و High و Low و Lowest، والـ protocol بيكتبها VeryHigh و High و Low و VeryLow):

~~~text اتقاس في Chrome
/crit.html            VeryHigh  Document
/fonts/cairo-var.woff2 High     Font        ← بدأ عند 76ms مع app.css
/app.css              VeryHigh  Stylesheet
/app.js               Low       Script
/print.css            VeryLow   Stylesheet
~~~

والأوقات (بالـ ms من أول الصفحة):

~~~text اتقاس في Chrome
app.css خلص:     1090
FCP:             1096    ← أول رسمة بعد app.css على طول
print.css خلص:   2098    ← بعد الرسم بثانية، ومأخّرهوش
app.js اتنفذ:    1092
~~~

- الصفحة فضلت بيضا لحد ما [[app.css]] وصل، حتى مع إن الـ HTML والـ [[<style>]] جاهزين من الأول. ده معنى render-blocking: كل ms في تحميل الـ CSS ده = ms شاشة بيضا.
- [[print.css]] خلص عند 2098 والرسم حصل عند 1096، يعني [[media="print"]] شالته من الطريق.
- الخط بدأ يتحمّل عند 76ms، نفس لحظة [[app.css]]، بدل ما يستنى لحد 1090.
- [[app.js]] برضه اتنفذ عند 1092 بعد [[app.css]]: المتصفح مش بينفّذ scripts قبل ما الـ CSS اللي قبلها يوصل (ممكن تكون بتقرا styles). يعني CSS بطيء بيأخّر الـ JavaScript كمان.

## الملخص

| السطر | بيوقف الرسم؟ | الأولوية | ليه |
|---|---|---|---|
| [[preconnect]] | لأ | (مش request) | يوفّر وقت فتح الاتصال |
| [[preload]] خط | لأ | High | الخط يبدأ مع الـ CSS مش بعده |
| [[<style>]] inline | لأ (جاهز) | مفيش request | أول شاشة متنسقة من أول رسمة |
| [[app.css]] | **أيوه** | VeryHigh | خليه صغير |
| [[print.css]] بـ [[media="print"]] | لأ | VeryLow | مش للشاشة |
| [[app.js]] بـ [[defer]] | لأ | Low | يتنفذ بعد الـ HTML |

## الخلاصة

- كل [[<link rel="stylesheet">]] عادي في الـ head = الشاشة بيضا لحد ما يوصل.
- [[media]] بيشيل الـ CSS اللي مش للشاشة من الطريق، و [[defer]] بيشيل الـ JS.
- [[preload]] و [[preconnect]] لحاجة أو اتنين مهمين بس.`,
          lines: [
            R`الـ [[<head>]]: كل اللي فيه بيتقري قبل ما المتصفح يرسم أي حاجة، فترتيبه بيفرق.`,
            "افتح الاتصال بسيرفر تاني بدري (DNS و TLS) قبل ما تحتاجه.",
            R`حمّل الخط الأساسي من الأول بدل ما المتصفح يكتشفه بعد ما يقرا الـ CSS. [[crossorigin]] لازم مع الخطوط حتى لو من نفس الموقع.`,
            "CSS أول شاشة inline: مفيش request.",
            "باقي الـ CSS: بيوقف الرسم، فخليه صغير.",
            R`CSS الطباعة: [[media="print"]] بيخليه يتحمّل من غير ما يوقف الرسم.`,
            R`الـ JS بـ [[defer]]: ميوقفش القراية ولا الرسم.`,
            R`قفلة الـ head؛ بعدها الـ body، وأول رسم بيحصل لما الـ CSS اللي فوق يخلص.`
          ],
          sol: R`في الـ Waterfall: ملف [[app.css]] بيتحمّل بأولوية Highest، وخط أول رسم (FCP، الخط الأخضر أو الأزرق في الـ Timeline) بيبقى بعد ما يخلص. يعني طول ما الملف ده بيتحمّل الصفحة بيضا. بطّأ النت لـ Slow 4G وهتشوف الفرق بوضوح: الصفحة البيضا بتطول قد مدة تحميل الـ CSS. أما [[print.css]] فبيتحمّل بأولوية Lowest ومش بيأخّر الرسم، لأن الـ [[media="print"]] مش متحققة على الشاشة.

الـ [[<style>]] اللي في الـ head متطبّق من غير request، فالهيدر والهيرو بياخدوا مقاسهم من أول رسمة. والـ font بتاع الـ preload بيظهر في أول الـ waterfall جنب الـ HTML بدل ما يستنى الـ CSS يتقري.

في Lighthouse هتلاقي «Render-blocking requests» (أو «Eliminate render-blocking resources» في النسخ الأقدم) وفيها [[app.css]] والوقت اللي ممكن توفّره. ولو لقيت ملف JavaScript فيها كمان، يبقى فيه [[<script>]] في الـ head من غير [[defer]] ولا [[async]].`
        },
        {
          cmd: "layout thrashing",
          title: "JavaScript بيخلي المتصفح يعيد حساب الصفحة مية مرة",
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** اعمل ١٠٠٠ [[.card]] وجرّب الطريقتين اللي في المثال، وحوّط كل واحدة بـ [[performance.now()]].`, done: R`رقمين: في Chrome 156 قسناهم 274.8ms للقراية والكتابة بالتبادل و 7.6ms للقراية كلها ثم الكتابة. وجهازك أرقامه مختلفة بس الفرق بنفس الحجم تقريبًا.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** هيدر بيصغر مع الـ scroll: الـ handler بيقرا [[scrollY]] و [[header.offsetHeight]] ويكتب [[style.height]] و [[style.padding]] في كل event. سجّل Performance وانت بتعمل scroll، وصلّحه: اقرا مرة، واكتب في [[requestAnimationFrame]]، وغيّر [[transform: scale]] بدل الارتفاع.`, done: R`الـ trace قبل فيه علامات بنفسجي «Forced reflow»، وبعد مفيش، والـ frames أقصر. وعارف إن فيه حل من غير JavaScript خالص بـ [[animation-timeline: scroll()]] في وحدة CSS الحديث.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** دوّر على gist «What forces layout / reflow» (Paul Irish)، وطلّع ٨ حاجات بتجبر layout غير [[offsetWidth]].`, done: R`لستة ٨ فيها مثلًا [[getComputedStyle()]] و [[scrollIntoView()]] و [[innerText]] و [[focus()]] و [[scrollTop]] و [[clientHeight]] و [[getClientRects()]] و [[window.innerHeight]]، وجنب كل واحدة إمتى بتستخدمها.` },
            { lvl: 'تطبيق', t: R`**ابني:** عدّاد أرقام بيعد من 0 لـ 12,500 في ثانية ونص لما يظهر (IntersectionObserver ثم [[requestAnimationFrame]])، بـ [[font-variant-numeric: tabular-nums]] و [[min-inline-size]] بعدد الحروف، و [[Intl.NumberFormat("ar-EG")]] للأرقام. ومع reduce يطلع الرقم النهائي على طول.`, done: R`العرض ثابت وهو بيعد (الكلام اللي جنبه مبيتهزش و layout-shift صفر)، ومفيش forced reflow في كل frame (مبتقراش مقاسات جوه الـ loop)، والرقم النهائي بيتقري لقارئ الشاشة مرة واحدة مش كل رقم.` },
          ],
          desc: R`لما تقرا مقاس من الـ DOM ([[offsetWidth]] أو [[getBoundingClientRect()]] أو [[scrollTop]]) بعد ما غيّرت style، المتصفح لازم يعيد حساب الـ layout فورًا عشان يديك رقم صح (forced reflow). ولو عملت ده جوه loop (اكتب، اقرا، اكتب، اقرا)، بيحسب الصفحة في كل لفة.

الحل: اقرا كل اللي محتاجه الأول، وبعدين اكتب كله. وأي حاجة بتتكرر مع الـ scroll أو الحركة حطها في [[requestAnimationFrame]].`,
          example: R`const cards = [...document.querySelectorAll(".card")];
// وحش: قراية وكتابة بالتبادل
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
// كويس: اقرا الكل، وبعدين اكتب الكل
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
// أحسن: CSS يعملها من غير JavaScript: .card { aspect-ratio: 4 / 3; }
window.addEventListener("scroll", () => requestAnimationFrame(updateHeader), { passive: true });`,
          try: R`اعمل صفحة فيها 500 div وشغّل النسخة الوحشة، وسجّل في DevTools › Performance: هتلاقي بلوكات Layout كتير وتحذير Forced reflow. شغّل النسخة الكويسة وقارن.`,
          flag: "script",
          deep: {
            why: "الـ JavaScript والـ layout شغالين على نفس الـ thread. كل reflow على صفحة كبيرة ممكن ياخد ملي ثواني، ولو اتكرر مية مرة في frame واحد، الصفحة بتقف والـ scroll بيقطّع، و INP (سرعة الاستجابة للضغط) بيبوظ.",
            how: R`المتصفح كسول بذكاء: لما تغيّر style، مش بيحسب على طول. بيعلّم إن الـ layout «قديم» ويستنى آخر الـ frame يحسب كل التغييرات مرة واحدة. بس لو طلبت رقم بيعتمد على الـ layout (offsetWidth و offsetTop و clientHeight و scrollHeight و getBoundingClientRect و getComputedStyle و scrollTop)، لازم يحسب حالًا، ودا الـ forced synchronous layout. لو كتبت بعده وقريت تاني يحسب تاني، ودا الـ thrashing.

الفرق بين reflow و repaint: الـ reflow (layout) = حساب أماكن ومقاسات العناصر، وممكن يأثر على الصفحة كلها. والـ repaint = رسم البكسلات من جديد من غير ما الأماكن تتغير (لون، وخلفية، وظل). والـ composite = تركيب الطبقات بس (transform و opacity). من الأغلى للأرخص.

[[requestAnimationFrame(fn)]] بينفّذ fn قبل الرسم الجاي مباشرة، فالكتابات بتتجمع في frame واحد. ولو الحدث بيتكرر كتير (scroll أو mousemove)، استخدم flag عشان متطلبش أكتر من rAF في الـ frame. و [[ResizeObserver]] و [[IntersectionObserver]] بيدّوك المقاسات والظهور من غير ما تقرا في loop.

وفي React: القراية بتبقى في [[useLayoutEffect]] (قبل الرسم) أو ref callback، مش في كل render.`,
            when: "أي كود بيقيس عناصر: masonry، أو sticky بـ JavaScript، أو animations يدوي، أو قوايم طويلة virtualized، وأي حاجة على scroll أو resize.",
            mistakes: R`تحسب مقاسات في scroll handler من غير rAF. تحرّك بـ [[top]] و [[left]] من JavaScript بدل transform. و [[getComputedStyle]] جوه loop. وفي مشروع حقيقي كان فيه handler على الـ scroll بيعمل [[setScrolled(window.scrollY > 8)]] مع [[passive: true]]: كويس، لأنه بيقرا رقم واحد رخيص ومش بيكتب في الـ DOM مباشرة، و React مش بيعيد الـ render غير لما القيمة تتغير فعلًا.`
          },
          teach: R`## نفس الشغل، مرة بـ 500 layout ومرة بـ layout واحد

المثال بيدّي كل كارت ارتفاع = عرضه × 0.75 (نسبة 4:3)، بطريقتين: واحدة بتخلط القراية والكتابة جوه الـ loop، وواحدة بتقرا الكل الأول وبعدين تكتب الكل. شغّلنا الـ solCode حرفيًا في Chrome (500 كارت، شاشة 1280 عرض) 3 مرات، وعدّينا عدد مرات الـ layout بـ [[LayoutCount]] من Chrome DevTools Protocol.

---

## ١. هات الكروت

~~~text JavaScript
const cards = [...document.querySelectorAll(".card")];
~~~

- [[document.querySelectorAll(".card")]]: كل العناصر اللي عليها كلاس [[card]]، بس بترجع NodeList مش array.
- [[[...]]]: الـ [[...]] (spread) بيفرد العناصر جوه array جديدة، عشان نقدر نستخدم [[map]] و [[forEach]] عليها براحتنا.

## ٢. الطريقة الوحشة

~~~text JavaScript
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
~~~

- [[for (const el of cards)]]: لف على الكروت واحد واحد، و [[el]] الكارت الحالي.
- [[el.offsetWidth]]: عرض العنصر بالبكسل كرقم صحيح (بالـ border والـ padding). ده **قراية** من الـ layout.
- [[* 0.75 + "px"]]: اضرب في 0.75، وزوّد [[px]] في الآخر فيبقى نص زي [[285.75px]].
- [[el.style.height = ...]]: ده **كتابة**: غيّرت style، فالـ layout بقى قديم.

المشكلة في الترتيب: لفة 1 كتبت height، لفة 2 بتقرا [[offsetWidth]]، فالمتصفح لازم يعيد حساب الـ layout الأول عشان يدّيك رقم صح (ده الـ forced reflow). وبعدين تكتب، واللفة اللي بعدها تقرا تاني... 500 مرة.

## ٣. الطريقة الكويسة

~~~text JavaScript
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
~~~

- [[cards.map((el) => el.offsetWidth)]]: [[map]] بيعمل array جديدة من نتيجة الدالة على كل عنصر، يعني array بالعروض. كله قراية، فأول قراية بتحسب الـ layout مرة، والباقي بيقرا من نفس الحساب.
- [[cards.forEach((el, i) => ...)]]: لف على الكروت، و [[i]] رقم الكارت (index) عشان نجيب عرضه من [[widths[i]]].
- الأقواس حوالين [[(el.style.height = ...)]]: الـ arrow function بترجع نتيجة الـ assignment، والأقواس بتوضح إن ده مقصود.
- كله كتابة، والمتصفح يحسب الـ layout مرة واحدة بعدها.

## ٤. القياس (الـ solCode)

في الـ solCode فيه سطرين زيادة للقياس: [[performance.now()]] بيرجّع الوقت بالـ ms بدقة كسور، فالفرق بين قبل وبعد = مدة الكود. و [[document.body.offsetHeight]] قراية فاضية بتجبر المتصفح يخلّص أي layout مستني، عشان الوقت يتحسب كامل.

~~~text الناتج في Chrome (3 مرات)
bad 123.7   good 2.5
bad 123.7   good 2.5
bad 227.6   good 6.2
~~~

~~~text اتقاس بـ LayoutCount
الوحشة:   500 layout
الكويسة:  1 layout
~~~

والنتيجة واحدة في الاتنين: كل كارت عرضه [[381]] (30% من عرض الـ body + الـ border) وارتفاعه [[285.75px]]. الوحشة أبطأ حوالي 37 مرة، و 124ms يعني أكتر من 7 frames (الـ frame في شاشة 60Hz حوالي 16.7ms) الصفحة واقفة فيهم.

## ٥. الـ CSS بدل كل ده

~~~text CSS
.card { aspect-ratio: 4 / 3; }
~~~

الارتفاع = العرض × 3 ÷ 4 = نفس الـ 0.75، والمتصفح بيحسبه في نفس الـ layout من غير أي JavaScript.

## ٦. الـ scroll

~~~text JavaScript
window.addEventListener("scroll", () => requestAnimationFrame(updateHeader), { passive: true });
~~~

- [[addEventListener("scroll", fn)]]: شغّل fn كل ما الصفحة تعمل scroll (ممكن عشرات المرات في الثانية).
- [[requestAnimationFrame(updateHeader)]]: متنفّذش دلوقتي، نفّذ قبل الرسمة الجاية. فالقراية والكتابة اللي في [[updateHeader]] بتتعمل مرة في الـ frame مع باقي التغييرات.
- [[{ passive: true }]]: وعد إن الـ handler مش هيعمل [[preventDefault()]]. على الـ scroll مش فارق، فايدته مع [[wheel]] و [[touchmove]].

## الخلاصة

| الحركة | بتكلّف |
|---|---|
| كتابة style | ولا حاجة لحد آخر الـ frame |
| قراية مقاس بعد كتابة | layout كامل فورًا |
| اكتب، اقرا، اكتب، اقرا | layout في كل لفة (500 هنا) |
| اقرا الكل، اكتب الكل | layout واحد |
| [[aspect-ratio]] | صفر JavaScript |`,
          lines: [
            "كل الكروت كـ array.",
            R`[[for...of]] على الكروت واحد واحد، وكل لفة فيها قراية وكتابة.`,
            R`بتقرا [[offsetWidth]] بعد ما كتبت height للكارت اللي قبله، فالمتصفح يعيد الـ layout كل لفة. 500 كارت = 500 reflow.`,
            "قفلة.",
            "القراية كلها مرة واحدة: layout واحد.",
            "الكتابة كلها بعدها: المتصفح يحسب مرة واحدة في الـ frame الجاي.",
            R`مع الـ scroll: حدّث في الـ frame الجاي بس. و [[passive]] هنا مش فارق لأن الـ scroll event مبيتلغيش أصلًا، فايدته الحقيقية مع [[wheel]] و [[touchmove]].`
          ],
          sol: R`النسخة الوحشة في Performance: بلوك Scripting طويل جواه عشرات أو مئات من البلوكات البنفسجي الصغيرة [[Layout]] ورا بعض، وعلى كتير منهم مثلث أحمر وتحذير «Forced reflow is a likely performance bottleneck». النسخة الكويسة: Layout واحد بس (أو اتنين) في الآخر.

قست الفرق على 500 div: الوحشة أخدت حوالي 125ms (يعني أكتر من 7 frames متعطلة، والصفحة بتهنّج)، والكويسة حوالي 4ms. أكتر من 30 مرة أسرع بنفس النتيجة بالظبط، والفرق بيزيد مع عدد العناصر. والأحسن من الاتنين [[aspect-ratio: 4 / 3]] في الـ CSS: صفر JavaScript.

لو مشفتش فرق، غالبًا العناصر بعرض ثابت ومش بيتأثروا ببعض، أو الجهاز سريع جدًا: زوّد العدد أو فعّل CPU throttling ‏(4x slowdown) في Performance.`,
          solCode: R`<style>.card { width: 30%; display: inline-block; border: 1px solid; }</style>
<body>
<script>
  document.body.insertAdjacentHTML("beforeend", '<div class="card">x</div>'.repeat(500));
  const cards = [...document.querySelectorAll(".card")];
  let t = performance.now();
  for (const el of cards) el.style.height = el.offsetWidth * 0.75 + "px";
  console.log("bad", performance.now() - t); // ~125ms
  cards.forEach((el) => (el.style.height = ""));
  document.body.offsetHeight;
  t = performance.now();
  const widths = cards.map((el) => el.offsetWidth);
  cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
  document.body.offsetHeight;
  console.log("good", performance.now() - t); // ~4ms
</script>`
        }
      ]
    }
]);
