// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "CSS الحديث و SEO",
      l: 3,
      n: "مكونات بتتأقلم مع مكانها، و selectors بتبص لتحت، و HTML جوجل وواتساب فاهمينه",
      items: [
        {
          cmd: "container queries",
          title: "مكون يغيّر شكله حسب المكان اللي هو فيه",
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
            "قفلة.",
            "قفلة.",
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
            "القاعدة الأب.",
            "خصائص الكارت نفسه.",
            "تدوير من توكن.",
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
          cmd: "meta و Open Graph",
          title: "شكل صفحتك في جوجل وفي واتساب",
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
            "وصف الكارت.",
            "صورة الكارت: حوالي 1200×630، و URL كامل مش نسبي.",
            "رابط الصفحة.",
            "نوع المحتوى.",
            "في X (تويتر): كارت بصورة كبيرة، والباقي بياخده من og لو مفيش tags خاصة بيه."
          ],
          sol: R`على واتساب: اللينك بيطلع تحته كارت فيه الصورة من [[og:image]] (كبيرة بعرض الرسالة)، والعنوان «كورس React من الصفر» من [[og:title]] (مش من الـ [[<title>]])، والوصف «40 درس بالعربي بمشاريع حقيقية»، واسم الدومين. أدوات الـ preview (زي opengraph.xyz أو Facebook Sharing Debugger) بتوريك نفس الكلام وبتقولك لو فيه tag ناقص.

في Next.js، [[View Source]] لصفحة عاملة [[export const metadata]] بـ [[title]] و [[description]] و [[openGraph]] و [[alternates.canonical]]: هتلاقي [[<title>]] و [[<meta name="description">]] و [[<meta property="og:title">]] وأخواتها و [[<link rel="canonical">]] متولدين في الـ HTML نفسه. (في Next 15.2 وأحدث، الصفحات الـ dynamic ممكن تبعت الـ metadata متأخرة في الـ stream للمتصفحات العادية، بس البوتات بتاخدها في الـ head، فمتقلقش لو لقيتها تحت.)

لو الصورة مظهرتش: [[og:image]] لازم تبقى URL كامل بـ https مش مسار زي [[/og.png]]، ومتاحة من غير login، ومش تقيلة. ولو عدّلت الـ tags والـ preview لسه قديم، واتساب وفيسبوك بيعملوا cache؛ جرّب اللينك بـ [[?v=2]] أو استخدم «Scrape Again» في Sharing Debugger.`
        }
      ]
    }
]);
