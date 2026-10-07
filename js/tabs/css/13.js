// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الحركة",
      l: 3,
      n: "حركة سريعة وخفيفة على transform و opacity، وبتتلغي للي طالب كده",
      items: [
        {
          cmd: "transition و @keyframes",
          title: "حركة ناعمة بالـ CSS بس",
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
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
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
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
~~~

- [[prefers-reduced-motion: reduce]]: بيتحقق لما المستخدم يفعّل «قلّل الحركة» من إعدادات النظام.
- [[*]] = أي عنصر، و [[*::before]] و [[*::after]] = العناصر الوهمية اللي الـ CSS بيعملها قبل وبعد المحتوى (مش بتتمسك بـ [[*]] لوحدها).
- [[0.01ms]] مش [[0]]: الحركة لسه بتشتغل وتخلص فورًا، فالعنصر بيوصل لحالة [[to]] وأحداث زي [[animationend]] بتحصل عادي.
- [[!important]]: يكسب أي قيمة تانية مكتوبة على العناصر.

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
            "الكارت.",
            "لما الـ transform أو الظل يتغيروا، اتحرك في 200ms بـ ease-out (سريع في الأول وبيهدى).",
            "قفلة.",
            "الحالة التانية: يطلع 4px لفوق وظله يكبر. الـ transition هو اللي بيخليها ناعمة.",
            "حركة بمراحل اسمها fade-up.",
            "البداية: شفاف وتحت بـ 16px.",
            "النهاية: ظاهر وفي مكانه.",
            "قفلة.",
            R`شغّل الحركة نص ثانية، و [[both]] يخلي العنصر شفاف قبل ما تبدأ. و [[--i]] بيأخّر كل عنصر عن اللي قبله.`,
            "لو المستخدم طالب حركة أقل من إعدادات النظام...",
            "...خلّي كل الحركات تخلص فورًا، فالعناصر تظهر في مكانها النهائي على طول.",
            "قفلة."
          ],
          sol: R`الكروت الـ 6 بيطلعوا ورا بعض من تحت لفوق مع fade: الأول على طول، والتاني بعد 80ms، وهكذا لحد السادس بعد 400ms، فالكل بيخلص في حوالي 900ms. قبل ما دور الكارت ييجي بيبقى مخفي تمامًا (مش ظاهر وبعدين يختفي)، وده سبب [[both]]: بيطبّق الـ [[from]] وقت الـ delay.

بعد تفعيل [[prefers-reduced-motion: reduce]] و refresh: مفيش حركة خالص، كل كارت بيظهر مرة واحدة من غير fade ولا طلوع. بس هتلاحظ إنهم لسه بيظهروا ورا بعض بفرق 80ms، لأن الـ media query صفّرت الـ duration بس، والـ [[animation-delay]] لسه شغال (بعد 200ms مثلًا: الكروت اللي الـ delay بتاعها 0 و 80 و 160 ظاهرين، والـ 3 التانيين لأ). لو عايزهم يظهروا مع بعض، ضيف [[animation-delay: 0s !important]] في نفس القاعدة.

والـ hover على الكارت: بيطلع 4px لفوق وله ظل، في 200ms. مع reduced-motion بيتنقل على طول. لو الكروت فضلت مخفية للأبد، غالبًا كتبت [[animation: none]] في الـ reduce بدل تقليل الـ duration، فالعنصر فضل على [[opacity: 0]].`
        },
        {
          cmd: "motion",
          title: "حركة مربوطة بالـ state، ودخول وخروج العناصر",
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
            "قفلة AnimatePresence.",
            "التابات.",
            R`كل تاب. [[isolate]] عشان الخلفية اللي عليها [[-z-10]] تفضل جوه الزرار (درس z-index).`,
            R`الخلفية موجودة في التاب المختار بس، وبنفس الـ [[layoutId]]، فبتتزحلق من التاب القديم للجديد.`,
            "اسم التاب.",
            "قفلة الزرار.",
            "قفلة map.",
            "قفلة."
          ],
          sol: R`مع [[AnimatePresence]]: لما تقفل، العنصر بيعمل fade وبينزل 8px في 0.2 ثانية، وبعدين بس بيتشال من الـ DOM (لو فتحت Elements هتشوفه لسه موجود لحظة الحركة). ومع الفتح بيعمل العكس: بيطلع من تحت وبيظهر.

من غير [[AnimatePresence]]: الفتح لسه بيتحرك (الـ [[initial]] و [[animate]] شغالين)، بس القفل بيختفي فجأة، لأن React بيشيل العنصر على طول ومحدش بيستنى الـ [[exit]]. ده أشهر سبب إن «الـ exit مش شغال»، والسبب التاني إنك ناسي [[key]] ثابت على العنصر.

في التابات: لما تدوس على تاب تاني، الخلفية الرمادي بتتزحلق من التاب القديم للجديد بدل ما تختفي وتظهر، لأن الاتنين بنفس [[layoutId]]. ولو دوست بسرعة بين تابين، الحركة بتتقطع وتغيّر اتجاهها من مكانها الحالي من غير ما تنط. ومع reduce motion من النظام، [[reducedMotion="user"]] بيلغي حركات الـ transform والـ layout ويسيب الـ opacity.`
        }
      ]
    },
    {
      t: "الأداء",
      l: 3,
      n: "الصفحة تظهر بسرعة ومتتنطش، والـ JavaScript ميجبرش المتصفح يعيد الحساب على الفاضي",
      items: [
        {
          cmd: "CLS",
          title: "الصفحة بتتنط وانت بتقرا",
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
            "CSS.",
            "الصورة تصغر مع الشاشة والارتفاع يتحسب من النسبة، فالمكان المحجوز صح.",
            R`[[aspect-ratio]] بيحجز ارتفاع الفيديو من عرضه.`,
            "احجز أقل ارتفاع للإعلان حتى لو لسه فاضي.",
            "skeleton بنفس ارتفاع المحتوى الحقيقي تقريبًا، فلما البيانات توصل مفيش نطة.",
            R`الإشعارات [[fixed]]: بتظهر فوق الصفحة من غير ما تزق حاجة.`,
            "قفلة."
          ],
          sol: R`في Performance بعد record مع reload: هتلاقي track اسمه Layout shifts (أو مربعات بنفسجي) عند اللحظة اللي الصورة وصلت فيها، ولما تدوس عليه يوريك العناصر اللي اتحركت. وفي Lighthouse الرقم تحت Cumulative Layout Shift؛ الكويس أقل من 0.1.

قست ده على صفحة فيها عنوان وصورة هيرو 1200×600 وكلام كتير تحتها، والصورة بتتأخر 800ms: مع [[width]] و [[height]] الـ CLS كان [[0]]، لأن المتصفح حجز مكان بنسبة 2:1 من الأول. من غيرهم الـ CLS طلع حوالي [[0.43]] (أكتر من 4 أضعاف الحد)، لأن الكلام كله نط لتحت مرة واحدة لما الصورة وصلت.

لو الرقم مزدش بعد ما مسحت المقاسات: غالبًا الصورة في الكاش فبتيجي فورًا، اعمل Disable cache. أو فيه [[aspect-ratio]] في الـ CSS بيحجز المكان بدل الـ attributes. وخلي بالك إن Lighthouse بيقيس التحميل بس؛ الـ shifts اللي بتحصل بعد ما المستخدم يعمل scroll بتبان في Web Vitals الحقيقية (CrUX) مش في Lighthouse.`
        },
        {
          cmd: "critical CSS",
          title: "ليه الصفحة بيضا ثانيتين قبل ما تظهر؟",
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
            "الـ head.",
            "افتح الاتصال بسيرفر تاني بدري (DNS و TLS) قبل ما تحتاجه.",
            R`حمّل الخط الأساسي من الأول بدل ما المتصفح يكتشفه بعد ما يقرا الـ CSS. [[crossorigin]] لازم مع الخطوط حتى لو من نفس الموقع.`,
            "CSS أول شاشة inline: مفيش request.",
            "باقي الـ CSS: بيوقف الرسم، فخليه صغير.",
            R`CSS الطباعة: [[media="print"]] بيخليه يتحمّل من غير ما يوقف الرسم.`,
            R`الـ JS بـ [[defer]]: ميوقفش القراية ولا الرسم.`,
            "قفلة."
          ],
          sol: R`في الـ Waterfall: ملف [[app.css]] بيتحمّل بأولوية Highest، وخط أول رسم (FCP، الخط الأخضر أو الأزرق في الـ Timeline) بيبقى بعد ما يخلص. يعني طول ما الملف ده بيتحمّل الصفحة بيضا. بطّأ النت لـ Slow 4G وهتشوف الفرق بوضوح: الصفحة البيضا بتطول قد مدة تحميل الـ CSS. أما [[print.css]] فبيتحمّل بأولوية Lowest ومش بيأخّر الرسم، لأن الـ [[media="print"]] مش متحققة على الشاشة.

الـ [[<style>]] اللي في الـ head متطبّق من غير request، فالهيدر والهيرو بياخدوا مقاسهم من أول رسمة. والـ font بتاع الـ preload بيظهر في أول الـ waterfall جنب الـ HTML بدل ما يستنى الـ CSS يتقري.

في Lighthouse هتلاقي «Render-blocking requests» (أو «Eliminate render-blocking resources» في النسخ الأقدم) وفيها [[app.css]] والوقت اللي ممكن توفّره. ولو لقيت ملف JavaScript فيها كمان، يبقى فيه [[<script>]] في الـ head من غير [[defer]] ولا [[async]].`
        },
        {
          cmd: "layout thrashing",
          title: "JavaScript بيخلي المتصفح يعيد حساب الصفحة مية مرة",
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
            "لف عليهم.",
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
