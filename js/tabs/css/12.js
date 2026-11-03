// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Accessibility",
      l: 3,
      n: "الموقع لازم يشتغل بالكيبورد وقارئ الشاشة ولمن نظره ضعيف، ومعظم ده ببلاش لو الـ HTML صح",
      items: [
        {
          cmd: "aria",
          title: "لما HTML لوحده ميكفيش: قول لقارئ الشاشة الحالة",
          desc: R`القاعدة الأولى: لو فيه عنصر HTML بيعمل الحاجة، استخدمه ومتحطش aria. [[<button>]] أحسن من [[<div role="button">]].

aria للحاجات اللي HTML مش بيوصفها: [[aria-label]] اسم لعنصر ملوش كلام، و [[aria-expanded]] المنيو مفتوحة ولا لأ، و [[aria-controls]] الزرار ده بيتحكم في أنهي عنصر، و [[aria-current="page"]] اللينك ده الصفحة الحالية، و [[aria-describedby]] رسالة خطأ مربوطة بالحقل، و [[aria-live]] منطقة بتتغير ولازم تتقري.`,
          example: R`<button aria-expanded={open} aria-controls="mobile-menu" aria-label="القايمة" onClick={() => setOpen(!open)}>
  <Menu className="size-6" />
</button>
<nav id="mobile-menu" hidden={!open}>
  <a href="/" aria-current={pathname === "/" ? "page" : undefined}>الرئيسية</a>
</nav>
<input id="email" aria-invalid={!!error} aria-describedby="email-error" />
<p id="email-error">{error}</p>
<div role="status" aria-live="polite">{saved && "اتحفظ"}</div>`,
          try: R`شغّل قارئ الشاشة (Narrator على ويندوز بـ Ctrl+Win+Enter، أو VoiceOver على الماك بـ Cmd+F5) وافتح المنيو واقفلها بالكيبورد، واسمع بيقول إيه مع وبدون [[aria-expanded]].`,
          flag: "script",
          deep: {
            why: "قارئ الشاشة بيقرا شجرة الـ accessibility: لكل عنصر role (زرار، لينك، حقل)، و name (اسمه)، و state (مفتوح، متعلّم، غلط). الـ HTML الصح بيملاهم لوحده. بس الحاجات الديناميكية (منيو بتفتح، حفظ نجح، خطأ ظهر) محتاجة حد يقول لقارئ الشاشة، ودا شغل aria.",
            how: R`aria مبتغيّرش أي سلوك: [[role="button"]] على div مش بيخليه ياخد focus ولا يشتغل بـ Enter، بيغيّر اللي قارئ الشاشة بيقوله بس. عشان كده القاعدة المشهورة «no ARIA is better than bad ARIA»: aria غلط أسوأ من مفيش.

الاسم (accessible name) بيتحسب بالترتيب: [[aria-labelledby]]، وبعدين [[aria-label]]، وبعدين الـ [[<label>]] أو [[alt]] أو محتوى العنصر، وآخر حاجة [[title]]. فلو فيه كلام ظاهر، هو الاسم، ومتحطش [[aria-label]] مختلف عنه (اللي بيستخدم التحكم بالصوت بيقول الكلام اللي شايفه).

[[aria-live="polite"]] بيستنى قارئ الشاشة يخلص كلامه ويقرا التغيير، و [[assertive]] بيقاطع (للأخطاء المهمة بس). والمنطقة لازم تبقى موجودة في الصفحة قبل ما المحتوى يتغير، مش تتعمل مع الرسالة.

و [[aria-hidden="true"]] بيخفي عنصر وأولاده عن قارئ الشاشة، للزينة بس. متحطوش على حاجة بتاخد focus.`,
            when: "مكونات بتفتح وتقفل (منيو، و accordion، و tabs)، ورسايل بتظهر (toast، وأخطاء فورم، وحفظ)، وأزرار الأيقونات. وقبل ما تكتبها: فيه primitive (Radix) بيعملها؟",
            mistakes: R`[[role="button"]] على div بدل button. [[aria-label]] على [[<div>]] عادي (غالبًا مش بيتقري لأن الـ div ملوش role). [[aria-hidden]] على عنصر فيه لينك أو زرار. وفي مشروع حقيقي زرار المنيو على الموبايل كان عليه aria-label بس ومن غير [[aria-expanded]] و [[aria-controls]]، والمنيو [[{open && ...}]] من غير id.`
          },
          teach: R`## قارئ الشاشة بيقرا شجرة، و aria بتكتب فيها

المتصفح بيبني من الـ HTML شجرة تانية جنب الـ DOM اسمها **accessibility tree**. كل عنصر فيها ليه ٣ حاجات: **role** (هو إيه: زرار، لينك، حقل)، و **name** (اسمه اللي بيتقري)، و **state** (حالته: مفتوح، غلط، متعلّم). قارئ الشاشة مبيشوفش الشاشة، بيقرا الشجرة دي بس. و aria (اختصار Accessible Rich Internet Applications) attributes بتكتب في الشجرة دي ومبتغيّرش أي حاجة في الشكل ولا السلوك.

عشان نشوف ده بعينينا، حطينا المثال في صفحة React (Vite) وفتحناها في Chrome، وقرينا الشجرة من Chrome DevTools Protocol (نفس اللي بيظهر في DevTools › Elements › Accessibility). وضفنا زرارين للتجربة بس: واحد بيحط رسالة خطأ، وواحد بيعمل «اتحفظ».

---

## ١. زرار المنيو

~~~text JSX
<button aria-expanded={open} aria-controls="mobile-menu" aria-label="القايمة" onClick={() => setOpen(!open)}>
  <Menu className="size-6" />
</button>
~~~

نفكّه حتة حتة:

- [[<button>]]: زرار HTML حقيقي. بياخد focus بالـ Tab، وبيشتغل بـ Enter و Space، و role بتاعه button من غير ما تكتب حاجة. ده ليه القاعدة الأولى «استخدم العنصر الصح الأول».
- [[aria-label="القايمة"]]: الزرار جواه أيقونة بس، فملوش كلام يتقري. الـ attribute ده بيدّيله اسم.
- [[aria-expanded={open}]]: [[open]] متغير state في React (true أو false). React بيكتبه في الـ HTML كـ [[aria-expanded="true"]] أو [[="false"]]، فالحالة بتتحدّث مع كل ضغطة.
- [[aria-controls="mobile-menu"]]: «الزرار ده بيتحكم في العنصر اللي الـ id بتاعه mobile-menu».
- [[onClick={() => setOpen(!open)}]]: [[!open]] = عكس القيمة الحالية، فكل ضغطة بتقلبها.
- [[<Menu className="size-6" />]]: أيقونة من lucide-react. و [[size-6]] من Tailwind = عرض وارتفاع 1.5rem (24px).

الشجرة اللي Chrome طلّعها للزرار أول ما الصفحة فتحت:

~~~text accessibility tree (Chrome)
button name="القايمة" expanded=false
~~~

وبعد Tab ثم Enter:

~~~text accessibility tree (Chrome)
button name="القايمة" focused=true expanded=true controls="mobile-menu"
~~~

لاحظ إن [[controls]] مظهرش غير لما المنيو اتفتحت: وهي مقفولة العنصر نفسه مش موجود في الشجرة (تحت هتعرف ليه)، فمفيش حاجة يشاور عليها.

### الأيقونة اتخفت لوحدها

قرينا الـ attributes بتاعة الـ [[<svg>]] اللي lucide-react (نسخة 1.52) طلّعه:

~~~text
class=lucide lucide-menu size-6 aria-hidden=true
~~~

[[aria-hidden="true"]] معناها «شيل العنصر ده وكل اللي جواه من الشجرة». الأيقونة زينة، والاسم جاي من [[aria-label]] على الزرار، فمش محتاجين قارئ الشاشة يقول «graphic» قبله.

### الاسم بيتحسب منين؟

Chrome بيقول هو جاب الاسم منين، وده اللي طلع للينك «الرئيسية»:

| الترتيب | المصدر | النتيجة |
|---|---|---|
| ١ | [[aria-labelledby]] | مش موجود |
| ٢ | [[aria-label]] | مش موجود |
| ٣ | contents (الكلام اللي جوه) | «الرئيسية» ← ده الاسم |
| ٤ | [[title]] | اتجاهل (superseded) |

يعني أول مصدر موجود بيكسب. وده ليه مينفعش تحط [[aria-label]] مختلف عن كلام ظاهر: هيغطي عليه.

---

## ٢. المنيو نفسها

~~~text JSX
<nav id="mobile-menu" hidden={!open}>
  <a href="/" aria-current={pathname === "/" ? "page" : undefined}>الرئيسية</a>
</nav>
~~~

- [[<nav>]]: role بتاعه navigation (landmark)، وقارئ الشاشة يقدر يقفز له.
- [[id="mobile-menu"]]: نفس القيمة اللي في [[aria-controls]]، وده الربط بينهم.
- [[hidden={!open}]]: الـ attribute [[hidden]] بيخلّي [[display: none]]، فالعنصر بيختفي من الشاشة ومن الـ Tab ومن الشجرة مرة واحدة. قسناه: بعد الفتح [[nav.hidden]] بقت [[false]] و [[display]] بقى [[block]].
- [[aria-current={... ? "page" : undefined}]]: الـ [[? :]] اسمه ternary: لو المسار [[/]] القيمة [[page]]، وإلا [[undefined]]، و React مبيكتبش attribute قيمته undefined خالص. في الـ DOM طلع [[<a href="/" aria-current="page">الرئيسية</a>]]. قارئ الشاشة بيقول معاه «current page» (ده من docs قارئات الشاشة، الـ CDP مبيعرضش الخاصية دي في قايمته).

شكل الشجرة كلها بعد الفتح (من [[ariaSnapshot]] بتاع Playwright):

~~~text
- button "القايمة" [expanded]
- navigation:
  - link "الرئيسية":
    - /url: /
~~~

---

## ٣. الحقل ورسالة الخطأ

~~~text JSX
<input id="email" aria-invalid={!!error} aria-describedby="email-error" />
<p id="email-error">{error}</p>
~~~

- [[!!error]]: علامتين [[!]] بيحوّلوا أي قيمة لـ true أو false. نص فاضي [[""]] يبقى false، و «اكتب الإيميل» يبقى true.
- [[aria-invalid]]: الحقل ده قيمته غلط.
- [[aria-describedby="email-error"]]: الكلام اللي في العنصر ده هو **وصف** الحقل، بيتقري بعد اسمه.

قبل الخطأ وبعده:

~~~text accessibility tree (Chrome)
قبل:  textbox name="" desc=""             invalid="false"
بعد:  textbox name="" desc="اكتب الإيميل" invalid="true"
~~~

> لاحظ [[name=""]]: المثال مركّز على aria، فالحقل ملوش [[<label>]]. في الحقيقة لازم [[<label for="email">الإيميل</label>]]، وإلا قارئ الشاشة هيقول «edit text» من غير اسم. (درس «form و label».)

---

## ٤. منطقة الإعلان

~~~text JSX
<div role="status" aria-live="polite">{saved && "اتحفظ"}</div>
~~~

- [[role="status"]]: منطقة رسايل حالة.
- [[aria-live="polite"]]: أي تغيير في الكلام جواها يتقري لما قارئ الشاشة يخلص اللي بيقوله.
- [[{saved && "اتحفظ"}]]: لو [[saved]] true يتعرض الكلام، ولو false مبيتعرضش حاجة.

Chrome طلّعها كده من أول ما الصفحة فتحت وهي فاضية:

~~~text accessibility tree (Chrome)
status live="polite" atomic=true relevant="additions text"
~~~

[[atomic=true]] جت من الـ role لوحده: بتتقري كلها كوحدة. والمهم إن المنطقة **موجودة من الأول** فاضية، وبعد الضغط بقت [[status: اتحفظ]]. لو كانت بتتعمل مع الرسالة، قارئات شاشة كتير مش هتلحق تراقبها.

---

## ملخص الـ attributes

| attribute | بيكتب في الشجرة | مثال القيمة |
|---|---|---|
| [[aria-label]] | name | «القايمة» |
| [[aria-expanded]] | state | true / false |
| [[aria-controls]] | علاقة بعنصر تاني | id |
| [[aria-current]] | state | page |
| [[aria-invalid]] | state | true / false |
| [[aria-describedby]] | description | id الرسالة |
| [[aria-live]] | المنطقة تعلن تغييرها | polite / assertive |
| [[aria-hidden]] | يشيل العنصر من الشجرة | true |

## الخلاصة

- العنصر الصح الأول ([[<button>]] و [[<nav>]] و [[<label>]])، و aria للي HTML ميعرفش يقوله: الحالة والعلاقات.
- aria بتغيّر الشجرة بس، مش السلوك: [[role="button"]] على div مش هياخد focus.
- القيمة لازم تتحدّث مع الـ state ([[aria-expanded={open}]] مش ثابتة).
- منطقة [[aria-live]] تبقى موجودة قبل الرسالة.`,
          lines: [
            "زرار المنيو: بيقول مفتوحة ولا لأ، وبيتحكم في أنهي عنصر، واسمه إيه.",
            "الأيقونة (lucide v1 بيخفيها عن قارئ الشاشة لوحده).",
            "قفلة.",
            R`المنيو نفسها. [[hidden]] بيشيلها من الشاشة ومن الـ Tab ومن قارئ الشاشة.`,
            "لينك الصفحة الحالية: قارئ الشاشة بيقول «current page».",
            "قفلة.",
            "الحقل: غلط ولا لأ، ورسالة الخطأ بتاعته فين.",
            "الرسالة. قارئ الشاشة بيقراها بعد اسم الحقل.",
            "منطقة بتعلن التغييرات: لما «اتحفظ» تظهر بتتقري من غير ما الـ focus يتحرك."
          ],
          sol: R`مع [[aria-expanded]]: لما توصل للزرار بـ Tab، قارئ الشاشة بيقول حاجة زي «القايمة، زرار، مقفول» (Narrator بيقول collapsed، و VoiceOver بيقول «collapsed» أو «مطوي» حسب اللغة). اضغط Enter: بيقول «متفتح / expanded»، ولما تنزل بـ Tab تلاقي لينك «الرئيسية» ومعاه «current page» لو انت فيها. اضغط تاني: «مقفول».

من غير [[aria-expanded]]: بيقول «القايمة، زرار» بس، ولما تدوس مفيش أي كلام بيقولك إن حاجة اتفتحت؛ المستخدم مش عارف إن المنيو ظهرت ولا لأ غير لو كمّل Tab بالصدفة. ولو شلت [[aria-label]] كمان هيقول «زرار» من غير اسم، لأن الأيقونة لوحدها ملهاش كلام.

الصياغة بالظبط بتختلف من قارئ لقارئ ومن لغة لأخرى، المهم إن الحالة (expanded/collapsed) تتقال وتتغير. لو سمعت الحالة مش بتتغير، يبقى القيمة مش بتتحدّث مع الـ state (مثلًا كاتبها [[aria-expanded="true"]] ثابتة).`
        },
        {
          cmd: "focus-visible",
          title: "الموقع بيشتغل بالكيبورد لوحده؟",
          desc: R`جرّب موقعك بـ Tab و Shift+Tab و Enter و Space و Escape بس. كل حاجة بتتضغط لازم يتوصلها، والـ focus لازم يبقى باين، والترتيب منطقي.

[[:focus-visible]] بيظهر الـ outline لما المستخدم ماشي بالكيبورد بس، فمفيش سبب تشيله. و [[tabindex="0"]] بيدخّل عنصر في الـ Tab (نادرًا تحتاجه)، و [[tabindex="-1"]] بيخليه ياخد focus من الكود بس. ولينك «تخطى للمحتوى» كأول حاجة في الصفحة بيوفّر على مستخدم الكيبورد 20 Tab.`,
          example: R`<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:inset-s-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
  تخطى للمحتوى
</a>
<main id="main" tabIndex={-1}>...</main>
<button className="rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
// globals.css
:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }`,
          try: R`سيب الماوس وامشي في موقعك بالكيبورد بس: سجّل دخول، وافتح منيو، واقفل مودال. كل مرة الـ focus يختفي أو يروح مكان غريب اكتبها. وبعدين دوس Tab أول ما الصفحة تفتح وشوف لينك التخطي.`,
          flag: "script",
          deep: {
            why: R`ناس كتير مش بتستخدم ماوس: إعاقة حركية، أو نظر ضعيف مع قارئ شاشة، أو مبرمج بيحب الكيبورد. وأشهر غلطة [[outline: none]] على كل حاجة عشان «شكلها وحش»، فالموقع يبقى مستحيل من الكيبورد.`,
            how: R`الـ Tab بيمشي على العناصر اللي بتاخد focus لوحدها (a بـ href، و button، و input، و select، و textarea، و summary) بترتيبها في الـ HTML. [[tabindex="0"]] بيضيف أي عنصر للترتيب ده في مكانه الطبيعي. [[tabindex="-1"]] بيخليه يقبل [[element.focus()]] من غير ما يدخل الـ Tab. وأي رقم موجب ([[tabindex="3"]]) بيعمل ترتيب منفصل ويلخبط كل حاجة: متستخدموش.

[[:focus]] بتتطبق مع أي focus (ماوس أو كيبورد). [[:focus-visible]] المتصفح هو اللي بيقرر: لما تدوس بالماوس على زرار مبتظهرش، ولما تيجي بـ Tab بتظهر، وفي حقول الكتابة دايمًا بتظهر (لأنك هتكتب). فالـ outline موجود للي محتاجه ومش بيضايق الباقي.

إدارة الـ focus: لما تفتح مودال حط الـ focus جواه، ولما يقفل رجّعه للزرار. لما تمسح عنصر من قايمة، ودّي الـ focus للي بعده. لما تتنقل لصفحة في SPA، ودّيه للعنوان أو الـ main. و Radix بيعمل أول اتنين لوحده.

و attribute [[inert]] بيخلي جزء كامل من الصفحة مش بيتوصله ولا بيتقري، مفيد للمحتوى اللي ورا drawer مفتوح.`,
            when: R`مع كل مكون تفاعلي بتعمله: اختبره بالكيبورد قبل ما تقول خلص. و [[focus-visible:]] على كل زرار ولينك شكله مخصص.`,
            mistakes: R`[[outline: none]] من غير بديل. [[tabindex]] موجب. div بيتضغط ومش بيتوصله. مودال بيتقفل والـ focus يرجع لأول الصفحة. وفي Tailwind v4 [[outline-none]] بقى بيشيل الـ outline فعلًا، و [[outline-hidden]] هو اللي بيسيب outline شفاف يبان في وضع التباين العالي (forced colors) بتاع ويندوز.`
          },
          teach: R`## ٣ حاجات: لينك تخطي، ومكان يستقبل الـ focus، و outline يبان بالكيبورد بس

المثال فيه لينك «تخطى للمحتوى» مستخبي لحد ما ياخد focus، و [[<main>]] يقدر يستقبل الـ focus لما اللينك يتداس، وزرار عليه outline بلون البراند. حطيناه في صفحة React + Tailwind 4.3.3 (Vite) بـ [[dir="rtl"]] وشاشة 800×600، وضفنا قبل الـ main هيدر فيه لينكين عشان نشوف التخطي بيعدّي عليهم، ومشينا فيها بالكيبورد من Playwright في Chrome، وقسنا كل خطوة بـ [[getComputedStyle]] و [[getBoundingClientRect]].

---

## ١. لينك التخطي

~~~text JSX
<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:inset-s-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">
  تخطى للمحتوى
</a>
~~~

[[href="#main"]]: الـ [[#]] معناها «عنصر في نفس الصفحة الـ id بتاعه main». الضغط عليه بينزل للعنصر ده من غير تحميل صفحة.

### [[sr-only]]: مستخبي من الشاشة بس

sr = screen reader. القاعدة اللي Tailwind طلّعها (من ملف الـ CSS بعد الـ build):

~~~text CSS ناتج
.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}
~~~

يعني العنصر بقى ١×١ بكسل، و [[clip-path: inset(50%)]] قصّه لحد ما مفيش حاجة باينة. بس هو لسه موجود في الـ DOM، فقارئ الشاشة بيقراه والـ Tab بيوصله. ولو كنا استخدمنا [[display: none]] كان اختفى من الاتنين.

### [[focus:]]: كل اللي بعدها يتطبق وقت الـ focus بس

[[focus:X]] بتطلّع قاعدة على [[:focus]]. القواعد اللي طلعت:

| الكلاس | القاعدة |
|---|---|
| [[focus:not-sr-only]] | يرجّع كل حاجة: [[clip-path:none]] و [[width:auto]] و [[height:auto]] و [[position:static]]... |
| [[focus:fixed]] | [[position:fixed]]: مثبّت في الشاشة فوق أي حاجة |
| [[focus:top-2]] | [[top: calc(var(--spacing) * 2)]] = 0.5rem = 8px |
| [[focus:inset-s-2]] | [[inset-inline-start]] = 8px. الـ s = start: بداية السطر، يمين في العربي وشمال في الإنجليزي |
| [[focus:z-50]] | [[z-index: 50]]: فوق باقي الصفحة |
| [[focus:rounded]] | [[border-radius: .25rem]] |
| [[focus:bg-white]] | خلفية بيضا |
| [[focus:p-3]] | padding = 12px |

ليه [[fixed]] بيكسب [[static]] اللي جاي من [[not-sr-only]]؟ لأن Tailwind بيرتّب القواعد في الملف، و [[focus:fixed]] جاية بعدها.

### القياس

~~~text اتقاس في Chrome
وقت التحميل:   rect x=800 y=-1  1×1          position=absolute  clip=inset(50%)
بعد أول Tab:   rect x=667 y=8   124.6×48     position=fixed     clip=none  bg=rgb(255,255,255)  padding=12px  z=50
~~~

أول Tab اللينك ظهر فوق على اليمين: [[y=8]] من [[top-2]]، وحافته اليمين عند 792 يعني 8px من حافة الشاشة (800) من [[inset-s-2]]. والارتفاع 48 = سطر الكلام + 12px فوق و 12px تحت.

---

## ٢. الـ main

~~~text JSX
<main id="main" tabIndex={-1}>...</main>
~~~

- [[id="main"]]: الهدف بتاع [[#main]].
- [[tabIndex={-1}]]: في JSX بيتكتب [[tabIndex]] بحرف I كبير، وهو [[tabindex]] في HTML. القيمة [[-1]] معناها «يقبل focus من الكود أو من لينك، بس الـ Tab ميقفش عنده».

بعد Enter على لينك التخطي، ثم Tab:

~~~text اتقاس في Chrome
Enter:  activeElement = MAIN#main   location.hash = #main   (لينك التخطي رجع 1×1)
Tab:    activeElement = BUTTON#save
~~~

يعني الـ focus نفسه بقى على الـ main، والـ Tab اللي بعده بدأ من جواه وعدّى لينكين الهيدر.

وجربنا نفس الصفحة من غير [[tabIndex]] (HTML عادي): بعد Enter الصفحة نزلت، بس [[document.activeElement]] فضل [[BODY]]، يعني مفيش عنصر عليه focus وقارئ الشاشة مش هيقول إنه وصل حاجة. (الـ Tab الجاي في Chrome كمّل من الـ main برضه، لأن المتصفح بيفتكر «نقطة البداية»، بس ده مش كفاية لقارئ الشاشة.) فـ [[tabIndex={-1}]] هو اللي بيخلّي الـ focus يتنقل فعلًا.

---

## ٣. الزرار

~~~text JSX
<button className="rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
~~~

- [[rounded-lg]] تدوير 8px، و [[px-4]] padding 16px يمين وشمال، و [[py-2]] 8px فوق وتحت.
- [[focus-visible:]] زي [[focus:]] بس على [[:focus-visible]]. والقواعد اللي طلعت:

~~~text CSS ناتج
.focus-visible\:outline-2:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}
.focus-visible\:outline-offset-2:focus-visible{outline-offset:2px}
.focus-visible\:outline-brand:focus-visible{outline-color:var(--color-brand)}
~~~

[[outline-brand]] اشتغلت لأن الـ CSS فيه [[@theme { --color-brand: oklch(0.55 0.2 265); }]] (درس [[@theme]]). و [[outline-offset]] = مسافة بين الزرار والخط حواليه.

القياس بعد ما وصلنا للزرار بالـ Tab، وبعد ما دسنا عليه بالماوس:

| إزاي الـ focus جه | [[:focus]] | [[:focus-visible]] | الـ outline |
|---|---|---|---|
| Tab | true | true | [[solid 2px oklch(0.55 0.2 265)]] و offset 2px |
| ضغطة ماوس | true | false | [[none]] |

وده الفرق كله: المتصفح هو اللي بيقرر [[:focus-visible]]، وبيقول «أيوه» مع الكيبورد و «لأ» مع الماوس على الزراير. وفي حقول الكتابة بيقول «أيوه» دايمًا.

---

## ٤. نفس الفكرة بـ CSS عادي

~~~text globals.css
:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }
~~~

سطر [[// globals.css]] في المثال مجرد اسم الملف، والسطر اللي بعده CSS. الـ selector هنا [[:focus-visible]] لوحده من غير عنصر قبله، يعني «أي عنصر». [[outline]] اختصار لـ 3 خصائص مرة واحدة: العرض (2px) والشكل (solid) واللون. وبيطبق على الموقع كله، فمش محتاج تكتب كلاسات على كل زرار.

وجربنا كمان: الـ main لما بياخد focus من الكود بعد ضغطة ماوس، [[:focus-visible]] بتطلع false والـ outline [[none]]. ولو اتنقل له بالكيبورد (Enter على اللينك) بيبقى عليه outline، فلو مش عايزه على عنصر مش تفاعلي زي main أو h1 اشيله منه هو بس.

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[sr-only]] | يخبي من الشاشة ويسيب العنصر لقارئ الشاشة والـ Tab |
| [[focus:not-sr-only focus:fixed ...]] | يظهر لينك التخطي فوق في ركن البداية وقت الـ focus بس |
| [[tabIndex={-1}]] | الـ main يستقبل الـ focus من اللينك، والـ Tab الجاي يكمّل من جواه |
| [[focus-visible:outline-*]] | outline بالكيبورد بس |
| [[:focus-visible { outline: ... }]] | نفس الكلام للموقع كله بقاعدة واحدة |

ومتشيلش الـ outline من غير بديل: [[:focus-visible]] أصلًا مش هيضايق اللي بيستخدم الماوس.`,
          lines: [
            R`لينك التخطي: مخفي بـ [[sr-only]]، وأول ما ياخد focus بيظهر فوق في ركن البداية.`,
            "النص.",
            "قفلة.",
            R`المحتوى. [[tabIndex={-1}]] عشان الـ focus يتنقل له فعلًا لما تدوس اللينك.`,
            "زرار عليه outline واضح بلون البراند، لما ييجي من الكيبورد بس.",
            "أو قاعدة واحدة للموقع كله: أي عنصر ياخد focus من الكيبورد عليه outline."
          ],
          sol: R`دي تجربة ملهاش إجابة واحدة، بس النتيجة الكويسة شكلها قايمة زي دي: «بعد ما فتحت المودال الـ focus فضل ورا على الصفحة»، «زرار إغلاق المنيو مش بيتوصله»، «الـ dropdown بيفتح بالماوس بس»، «بعد ما المودال يقفل الـ focus بيروح لأول الصفحة»، «الـ outline مختفي على الزراير لأن فيه [[outline: none]] في الـ CSS»، «ترتيب الـ Tab بيقفز من الهيدر للفوتر بسبب [[tabindex]] موجب». كل واحدة منهم bug حقيقي تصلّحه.

أول ما الصفحة تفتح وتدوس Tab: لينك «تخطى للمحتوى» بيظهر فوق في الركن ناحية بداية السطر (يمين في العربي) على خلفية بيضا. Enter: الصفحة بتنزل للـ main والـ focus نفسه بيبقى عليه (ده سبب [[tabIndex={-1}]]: من غيره [[document.activeElement]] بيفضل الـ body)، والـ Tab اللي بعده بيبدأ من جوه المحتوى مش من الهيدر. ولو دوست عليه بالماوس (نادر) مش هيبان outline، بالكيبورد هتلاقي outline الـ brand بـ offset 2px.

لو لينك التخطي مظهرش، اتأكد إنه أول عنصر في الـ body فعلًا وإن مفيش حاجة قبله بتاخد الـ focus (زي بانر الكوكيز)، وإن [[focus:not-sr-only]] مكتوبة صح.`
        },
        {
          cmd: "contrast ratio",
          title: "الكلام الرمادي الفاتح اللي محدش بيعرف يقراه",
          desc: R`التباين نسبة بين إضاءة لون الكلام ولون الخلفية، من 1:1 (نفس اللون) لـ 21:1 (أسود على أبيض). WCAG AA بيطلب [[4.5:1]] للكلام العادي، و [[3:1]] للكلام الكبير (حوالي 24px، أو 18.5px bold) ولحدود الحقول والأيقونات المهمة.

أشهر مشكلة: [[text-gray-400]] على أبيض عشان «شيك». نسبته حوالي 2.6:1، يعني ساقط.`,
          example: R`.muted { color: var(--color-gray-500); }
.hint { color: var(--color-gray-400); }
.dark .muted { color: var(--color-gray-400); }
.input { border: 1px solid var(--color-gray-500); }
.btn-primary { background: var(--color-indigo-600); color: white; }
.on-image { background: rgb(0 0 0 / 0.55); color: white; }
@media (prefers-contrast: more) {
  .muted { color: var(--color-gray-700); }
}`,
          try: R`في Chrome DevTools اختار أي كلام، وفي Styles دوس على مربع اللون: هيقولك Contrast ratio وعلامة صح أو غلط لـ AA و AAA. وكمان Lighthouse › Accessibility بيطلّع كل العناصر اللي ساقطة.`,
          flag: "script",
          deep: {
            why: "مش بس لضعاف النظر: أي حد ماسك موبايل في الشمس، أو شاشة رخيصة، أو كبير في السن. الكلام الباهت أشهر مشكلة accessibility في المواقع (موجود في أغلب الصفحات حسب مسح WebAIM السنوي)، وأسهل واحدة تتحل.",
            how: R`النسبة = (L1 + 0.05) / (L2 + 0.05)، حيث L الـ relative luminance: إضاءة اللون محسوبة بأوزان للأحمر والأخضر والأزرق حسب حساسية العين. الأبيض 1 والأسود 0، فأقصى نسبة 21.

الحدود: AA للكلام العادي 4.5، وللكبير 3. وللعناصر اللي مش كلام (حدود حقل، أو أيقونة لوحدها بتعني حاجة، أو شكل الـ focus) 3. و AAA أعلى (7 و 4.5). الزراير الـ disabled مستثناة، بس الـ placeholder كلام ولازم يتقري.

الألوان بـ oklch بتسهّل: الـ L فيها قريبة من اللي العين شايفاه، ففرق كبير في L = تباين كبير غالبًا. في الرماديات (gray و slate و zinc و neutral و stone) على خلفية بيضا: 600 و 700 للكلام بأمان، و 500 على الحافة، و 400 وأفتح للزينة بس. أما الألوان الفاتحة بطبيعتها (yellow و amber و lime و green و emerald و teal و cyan و sky و orange) فحتى 600 بيسقط (بين 3:1 و 4:1 تقريبًا)، ومحتاجة 700 أو أغمق، فاتأكد بالأداة.

وفي الـ dark mode متقلبش الألوان بالظبط: أبيض صافي على أسود صافي بيتعب العين، الأحسن رمادي فاتح على رمادي غامق جدًا، ولسه فوق 4.5.`,
            when: "وقت اختيار الـ palette، ومع كل لون كلام جديد، وفي الوضعين الفاتح والغامق.",
            mistakes: "تختار الألوان من التصميم على شاشة غالية وتفتكرها واضحة. تعدّي الوضع الفاتح وتنسى الغامق. وتعتمد على اللون بس (حقل أحمر من غير رسالة، أو لينك لونه مختلف من غير underline): اللي عنده عمى ألوان مش هيشوف الفرق."
          },
          teach: R`## رقم واحد بيقولك الكلام مقروء ولا لأ

التباين (contrast ratio) رقم بين 1 و 21 بيقارن إضاءة لونين. المثال فيه ٦ قواعد CSS لونها مختار عشان تعدّي الحد، وواحدة ([[.hint]]) ساقطة عمدًا. حطينا المثال في صفحة HTML بقيم ألوان Tailwind v4 (من [[tailwindcss/theme.css]] نسخة 4.3.3)، وفي Chrome حوّلنا كل لون لـ RGB عن طريق canvas، وحسبنا النسبة بمعادلة WCAG نفسها.

---

## ١. المعادلة في سطرين

~~~text المعادلة
L = 0.2126 × R + 0.7152 × G + 0.0722 × B      (بعد ما R و G و B يتحوّلوا لقيم «خطية» من 0 لـ 1)
النسبة = (L الأفتح + 0.05) ÷ (L الأغمق + 0.05)
~~~

- [[L]] = relative luminance، يعني الإضاءة زي ما العين شايفاها. الأخضر واخد 0.7152 لأن العين أحسّ بيه، والأزرق 0.0722 بس.
- الأبيض L = 1 والأسود L = 0، فأقصى نسبة (1 + 0.05) ÷ (0 + 0.05) = **21**.
- الـ 0.05 موجودة عشان القسمة متبقاش على صفر.

والحدود في WCAG AA:

| العنصر | لازم يبقى على الأقل |
|---|---|
| كلام عادي | 4.5 |
| كلام كبير (حوالي 24px، أو 18.5px bold) | 3 |
| حدود حقل، أيقونة بتعني حاجة، شكل الـ focus | 3 |

---

## ٢. القواعد واحدة واحدة

### [[.muted { color: var(--color-gray-500); }]]

- [[var(--color-gray-500)]]: [[var()]] بتجيب قيمة متغير CSS، والمتغير ده من Tailwind قيمته [[oklch(55.1% 0.027 264.364)]].
- oklch طريقة لكتابة اللون بـ 3 أرقام: L الإضاءة (55.1%)، و C التشبع (0.027 = رمادي تقريبًا)، و H درجة اللون (264 = مايل للأزرق).

~~~text اتقاس في Chrome
gray-500  →  rgb(106, 114, 130)  →  على أبيض 4.84:1   ✓ AA للكلام العادي
~~~

### [[.hint { color: var(--color-gray-400); }]]

~~~text اتقاس في Chrome
gray-400  →  rgb(153, 161, 175)  →  على أبيض 2.6:1   ✗ حتى للكلام الكبير (محتاج 3)
~~~

ده «الرمادي الشيك» اللي في عنوان الدرس.

### [[.dark .muted { color: var(--color-gray-400); }]]

المسافة بين [[.dark]] و [[.muted]] معناها «[[.muted]] اللي جوه عنصر عليه [[.dark]]». القاعدة دي أتقل من [[.muted]] لوحدها (كلاسين مش واحد)، فبتكسب في الوضع الغامق. وعلى خلفية [[gray-950]]:

~~~text اتقاس في Chrome
gray-400 على gray-950 rgb(3, 7, 18)  →  7.74:1   ✓ (حتى AAA)
~~~

نفس اللون اللي ساقط على أبيض ناجح على غامق. التباين دايمًا **بين لونين**، مش صفة في لون لوحده.

### [[.input { border: 1px solid var(--color-gray-500); }]]

[[border]] اختصار: سُمك 1px، وشكل [[solid]] (خط متصل)، واللون. حد الحقل مش كلام، فمحتاج 3 بس، و gray-500 عامل 4.84. لو كان gray-400 (2.6) الحقل كان هيبان كأنه مش موجود.

### [[.btn-primary { background: var(--color-indigo-600); color: white; }]]

~~~text اتقاس في Chrome
indigo-600 → rgb(79, 57, 246)  مع أبيض  →  6.46:1   ✓
~~~

هنا الخلفية هي الغامقة والكلام هو الفاتح، والمعادلة مش فارق معاها مين فوق مين.

### [[.on-image { background: rgb(0 0 0 / 0.55); color: white; }]]

- [[rgb(0 0 0 / 0.55)]]: أسود، و [[/ 0.55]] = شفافية 55% (alpha). يعني طبقة سودا نص شفافة ورا الكلام.
- أسوأ حالة إن الصورة اللي تحتها بيضا خالص. خلطنا الطبقة على أبيض:

~~~text اتقاس في Chrome
فوق صورة بيضا:  rgb(115, 115, 115)  مع كلام أبيض  →  4.74:1  ✓
فوق صورة سودا:  rgb(0, 0, 0)        مع كلام أبيض  →  21:1    ✓
~~~

فمهما كانت الصورة الكلام فوق 4.5. لو قللت الـ 0.55 لـ 0.4 مثلًا، الحالة البيضا هتسقط.

### [[@media (prefers-contrast: more)]]

[[@media]] = طبّق القواعد اللي جوه لو الشرط اتحقق. و [[prefers-contrast: more]] بيتحقق لما المستخدم يطلب تباين أعلى من إعدادات النظام (زي Increase contrast في إعدادات الماك، حسب الـ docs؛ و DevTools › Rendering بيعمله emulate). عملنا emulate للإعداد ده من Playwright:

~~~text اتقاس في Chrome
عادي:              .muted = gray-500 → 4.84:1
prefers-contrast:  .muted = gray-700 → rgb(54, 65, 83) → 10.3:1
~~~

---

## ملخص الأرقام

| القاعدة | اللون | الخلفية | النسبة | الحكم |
|---|---|---|---|---|
| [[.muted]] | gray-500 | أبيض | 4.84 | AA ✓ |
| [[.hint]] | gray-400 | أبيض | 2.6 | ✗ |
| [[.dark .muted]] | gray-400 | gray-950 | 7.74 | AAA ✓ |
| [[.input]] (حد) | gray-500 | أبيض | 4.84 | ✓ (محتاج 3) |
| [[.btn-primary]] | أبيض | indigo-600 | 6.46 | AA ✓ |
| [[.on-image]] | أبيض | أسود 55% على أبيض | 4.74 | AA ✓ |
| [[prefers-contrast]] | gray-700 | أبيض | 10.3 | AAA ✓ |

## الخلاصة

- 4.5 للكلام العادي، و 3 للكبير وللحدود والأيقونات.
- النسبة بين لونين: gray-400 ساقط على أبيض وناجح على gray-950.
- كلام فوق صورة: طبقة غامقة نص شفافة، واحسب على أسوأ صورة (بيضا).
- متخمّنش: DevTools بيوريك الرقم لما تدوس على مربع اللون في Styles.`,
          lines: [
            "رمادي 500 على أبيض: حوالي 4.8:1، عدّى للكلام العادي.",
            "رمادي 400 على أبيض: حوالي 2.6:1، ساقط. حتى الـ placeholder المفروض يبقى مقروء.",
            "في الغامق الموضوع بيتقلب: 400 على خلفية شبه سودا بيعدّي.",
            "حدود الحقل محتاجة 3:1 عشان الحقل نفسه يبان: 500 على أبيض بيعدّي، و 400 لأ.",
            "زرار غامق وكلام أبيض: حوالي 6:1.",
            "كلام فوق صورة: طبقة غامقة ورا الكلام تضمن التباين مهما كانت الصورة.",
            "لو المستخدم طالب تباين أعلى من إعدادات النظام...",
            "...خلّي الكلام الباهت أغمق.",
            "قفلة."
          ],
          sol: R`الأرقام اللي هتشوفها على خلفية بيضا (بألوان Tailwind v4، قستها): [[gray-500]] حوالي 4.8:1، يعني AA ✓ للكلام العادي (محتاج 4.5) و AAA ✗ (محتاج 7). [[gray-400]] حوالي 2.6:1، ساقط في الاتنين، وحتى للكلام الكبير (محتاج 3). [[gray-700]] حوالي 10:1 وناجح في كله. والزرار [[indigo-600]] مع أبيض حوالي 6.5:1 ناجح AA. وفي الـ dark: [[gray-400]] على [[gray-950]] حوالي 7.7:1 وده ليه المثال بيستخدمه هناك.

Chrome بيوريك الرقم مع علامة ✓ أو ⚠ جنب AA و AAA، وخط أو اتنين على لوحة الألوان: أي لون تحت الخط ناجح. اسحب اللون لتحت الخط وشوف الرقم بيتغير. Lighthouse › Accessibility بيطلّع «Background and foreground colors do not have a sufficient contrast ratio» ومعاه كل العناصر الساقطة.

الغلط الشائع: تقيس placeholder أو كلام disabled وتفتكره مشكلة لازم تتحل؛ الـ disabled مستثنى من القاعدة، لكن الـ placeholder لو هو الـ label الوحيد يبقى لازم يعدّي. وبرضه Lighthouse مش بيعرف يقيس الكلام اللي فوق صورة، فده لازم تبص عليه بعينك. وفي موقع عربي خلي بالك: axe-core (اللي جوه Lighthouse) بيتخطى الكلام العربي المتصل في فحص التباين (بيفتكره أيقونة، شوف درس «axe و Lighthouse»)، فقيس بـ DevTools على العنصر نفسه.`
        }
      ]
    }
]);
