// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "اختبار الـ accessibility",
      l: 3,
      n: "WCAG 2.2 AA هو المعيار، والأدوات الأوتوماتيك بتمسك جزء، والباقي بالكيبورد وقارئ الشاشة",
      items: [
        {
          cmd: "WCAG 2.2",
          title: "WCAG 2.2 AA يعني إيه بالظبط؟",
          desc: R`WCAG قواعد من W3C بتقول الموقع يبقى accessible إزاي. متقسمة على 4 مبادئ اسمها POUR: Perceivable (تقدر تدرك المحتوى: alt، وترجمة، وتباين)، و Operable (تقدر تستخدمه: كيبورد، ووقت كفاية، ومفيش حاجة بتومض)، و Understandable (مفهوم: لغة الصفحة، وأخطاء واضحة، وسلوك متوقع)، و Robust (شغال مع قارئات الشاشة: HTML سليم و role و name).

كل مبدأ تحته success criteria، ولكل واحد مستوى: A (الحد الأدنى)، و AA (اللي العقود والقوانين بتطلبه)، و AAA (أعلى، ومحدش بيطلبه على الموقع كله). فـ «WCAG 2.2 AA» معناها كل قواعد A و AA في نسخة 2.2.

نسخة 2.2 (أكتوبر 2023) زوّدت 9 قواعد، منهم 6 في A و AA: الـ focus ميستخباش ورا header ثابت، وبديل للسحب (dragging)، وأهداف اللمس 24×24 على الأقل، والمساعدة في نفس المكان في كل صفحة، ومتطلبش نفس البيانات مرتين، وتسجيل الدخول من غير اختبار ذاكرة (تسمح بالـ paste ومديري كلمات السر). وشالت قاعدة Parsing القديمة.`,
          example: R`html { scroll-padding-top: 5rem; }
.icon-btn { min-inline-size: 24px; min-block-size: 24px; }
<a href="/help" class="help-link">مساعدة</a>
<label><input type="checkbox" name="billing_same" checked> عنوان الفاتورة هو نفس عنوان الشحن</label>
<input type="password" name="password" autocomplete="current-password">
<button type="button" aria-label="انقل لفوق">↑</button>`,
          try: R`خد صفحة من مشروعك وامشي على الـ 6 قواعد الجديدة: دوس Tab تحت الـ header الثابت (الـ focus بيستخبى؟)، وقيس أصغر زرار أيقونة في DevTools، ودوّر على أي حاجة بتتسحب (ترتيب، slider)، وشوف لينك المساعدة في نفس المكان في كل صفحة؟ وفي الـ checkout بتطلب العنوان مرتين؟ وفي تسجيل الدخول جرّب تعمل paste في الباسورد.`,
          flag: "script",
          deep: {
            why: R`العملاء الكبار والحكومات والبنوك بيطلبوا WCAG AA في العقد. وفيه قوانين: الـ European Accessibility Act بقى مطبّق من يونيو 2025 على منتجات وخدمات كتير بتتباع في أوروبا (متاجر، وبنوك، وتذاكر)، وفي أمريكا قضايا الـ ADA على المواقع كتير. والقوانين دي غالبًا بتشاور على WCAG 2.1 AA (بشكل مباشر أو من خلال مواصفات زي EN 301 549)، و 2.2 متوافقة معاها، فلو اشتغلت على 2.2 AA انت مغطي الاتنين. وسؤال «تعرف إيه عن WCAG؟» بيتسأل في انترفيوهات الفرونت.`,
            how: R`القواعد الجديدة في 2.2 بأرقامها: 2.4.11 Focus Not Obscured (Minimum) في AA: العنصر اللي عليه focus ميبقاش مستخبي كله ورا sticky header أو cookie banner، والحل [[scroll-padding-top]] بارتفاع الـ header. و 2.5.7 Dragging Movements في AA: أي حاجة بتتعمل بالسحب ليها بديل بضغطة (أزرار فوق وتحت للترتيب). و 2.5.8 Target Size (Minimum) في AA: أي هدف بيتضغط 24×24 CSS px على الأقل أو حواليه مسافة كفاية (مع استثناءات زي اللينكات جوه الكلام). و 3.2.6 Consistent Help في A: لو فيه مساعدة (تواصل، شات) تبقى في نفس الترتيب في كل الصفحات. و 3.3.7 Redundant Entry في A: متطلبش من المستخدم يكتب حاجة كتبها قبل كده في نفس العملية (اعرضها أو خليه يختارها). و 3.3.8 Accessible Authentication (Minimum) في AA: متطلبش تذكّر أو حل لغز عشان يدخل، يعني اسمح بالـ paste و autocomplete ومديري كلمات السر، و CAPTCHA بصور لازم ليها بديل.

وفيه 3 في AAA: 2.4.12 (الـ focus ميستخباش خالص)، و 2.4.13 Focus Appearance (شكل الـ focus بمقاس وتباين محددين)، و 3.3.9 (دخول من غير أي اختبار حتى التعرف على صور).

و 4.1.1 Parsing اتشالت لأن المتصفحات وقارئات الشاشة بقت بتتعامل مع الـ HTML الغلط بنفس الطريقة.

POUR مش checklist، هي طريقة تفكير: لكل مكون اسأل: حد أعمى يدركه؟ حد من غير ماوس يستخدمه؟ حد مشتت يفهمه؟ وقارئ الشاشة يعرف هو إيه؟`,
            when: R`في بداية المشروع (التصميم بيحدد التباين وأحجام الأزرار)، وفي كل review لمكون جديد، وقبل أي تسليم لعميل كبير. والمعيار العملي: 2.2 AA.`,
            mistakes: R`تفتكر AAA هو الهدف فتيأس، أو A كفاية فتسقط في عقد. تمنع الـ paste في حقل الباسورد «للأمان» (بيكسر 3.3.8 وبيخلي الناس تختار باسوردات أضعف). header ثابت بياكل الحقل اللي عليه الـ focus. أيقونات 16px من غير مساحة حواليها. و «الموقع accessible عشان Lighthouse 100»: ده مش WCAG. وفي الانترفيو: «AA ولا AAA؟» الإجابة AA، و AAA لأجزاء معينة لو المستخدمين محتاجينها.`
          },
          teach: R`## كل سطر في المثال = قاعدة من الجديد في 2.2

الأرقام زي [[2.4.11]] هي أرقام القواعد (success criteria) في WCAG: الرقم الأول المبدأ (1 Perceivable، و 2 Operable، و 3 Understandable، و 4 Robust)، والتاني الـ guideline، والتالت القاعدة نفسها. المثال سطرين CSS وأربع عناصر HTML، كل واحد بيحل قاعدة. حطيناهم في صفحة فيها header ثابت ارتفاعه 5rem و 30 حقل، وجربناها في Chrome من Playwright.

---

## ١. 2.4.11 Focus Not Obscured: [[html { scroll-padding-top: 5rem; }]]

- [[html]]: الـ selector هو العنصر الجذر، لأنه هو اللي بيعمل scroll للصفحة.
- [[scroll-padding-top]]: «لما المتصفح يعمل scroll عشان يوريك عنصر، اعتبر إن أول 5rem من فوق مش موجودين». 5rem = 80px (الـ rem = حجم خط الـ html، 16px افتراضيًا).
- القيمة لازم تبقى قد ارتفاع الـ header الثابت أو أكتر.

جربنا لينك لـ [[#f10]] و [[scrollIntoView()]]، ودول بيحطوا العنصر في أول الشاشة:

~~~text اتقاس في Chrome (header ارتفاعه 80px)
من غير scroll-padding-top:   الحقل top = 0    ← مستخبي كله ورا الـ header
مع scroll-padding-top: 5rem: الحقل top = 80   ← تحت الـ header على طول
~~~

ومع الـ Tab نفسه: Chrome بيحط الحقل اللي خد focus في نص الشاشة لو كان برا الشاشة، فاتنقل من top=289 لـ top=329 لما ضفنا الـ padding (النص اتحسب من المساحة الباقية بعد الـ 80px). يعني القاعدة دي بتحمي كل الطرق اللي المتصفح بيعمل بيها scroll لعنصر.

---

## ٢. 2.5.8 Target Size: [[.icon-btn { min-inline-size: 24px; min-block-size: 24px; }]]

- [[min-inline-size]]: أقل عرض، بس بالاسم «المنطقي»: inline = اتجاه الكلام (أفقي في العربي والإنجليزي).
- [[min-block-size]]: أقل ارتفاع (block = الاتجاه اللي السطور بتنزل فيه).
- ليه مش [[min-width]]؟ نفس النتيجة في صفحة أفقية، بس الأسماء المنطقية بتفضل صح لو الكتابة رأسي.

عملنا زرار [[↑]] من غير padding وخطه 10px، مرة بالكلاس ومرة من غيره:

~~~text اتقاس في Chrome
مع .icon-btn:   24.0 × 24.0
من غيره:        5.0 × 10.0
~~~

5×10 بكسل هدف مستحيل تدوس عليه بصباعك. الـ 24 هي الحد الأدنى في AA (والـ 44 اللي بتسمع عنها في AAA وفي توصيات Apple).

---

## ٣. 3.2.6 Consistent Help: [[<a href="/help" class="help-link">مساعدة</a>]]

سطر HTML عادي: لينك للمساعدة. القاعدة مش في الكود نفسه، في **مكانه**: لو موقعك فيه مساعدة، تبقى في نفس الترتيب في كل الصفحات (مثلًا دايمًا آخر حاجة في الـ header). فالمكان الطبيعي للسطر ده هو الـ layout المشترك، مش كل صفحة لوحدها.

---

## ٤. 3.3.7 Redundant Entry: الـ checkbox

~~~text HTML
<label><input type="checkbox" name="billing_same" checked> عنوان الفاتورة هو نفس عنوان الشحن</label>
~~~

- [[<label>]] حوالين الـ input: الكلام اللي جواه بقى اسم الـ checkbox، والضغط على الكلام بيعلّم المربع.
- [[name="billing_same"]]: الاسم اللي بيتبعت مع الفورم.
- [[checked]]: attribute من غير قيمة = متعلّم من الأول.

شجرة الـ accessibility في Chrome:

~~~text
- checkbox "عنوان الفاتورة هو نفس عنوان الشحن" [checked]
~~~

الفكرة: المستخدم كتب عنوان الشحن خلاص، فمتطلبوش تاني. ده أسهل كتير على أي حد، ومهم جدًا لحد بيكتب ببطء أو بيتلخبط.

---

## ٥. 3.3.8 Accessible Authentication: الباسورد

~~~text HTML
<input type="password" name="password" autocomplete="current-password">
~~~

- [[type="password"]]: الحروف بتظهر نقط.
- [[autocomplete="current-password"]]: بيقول للمتصفح ولمدير كلمات السر «ده باسورد موجود، املاه». ولو صفحة إنشاء حساب: [[new-password]] (فيقترح باسورد جديد).
- اللي **مش** موجود مهم بنفس القدر: مفيش [[onpaste]] بيمنع اللصق. منع الـ paste بيجبر المستخدم يفتكر الباسورد ويكتبه، وده بالظبط «اختبار الذاكرة» اللي القاعدة بتمنعه.

---

## ٦. 2.5.7 Dragging Movements: زرار بدل السحب

~~~text HTML
<button type="button" aria-label="انقل لفوق">↑</button>
~~~

- [[type="button"]]: من غيرها الزرار جوه فورم بيبقى submit افتراضيًا ويبعت الفورم.
- [[aria-label="انقل لفوق"]]: السهم لوحده مش اسم مفهوم. شجرة Chrome:

~~~text
مع aria-label:  button "انقل لفوق"
من غيره:        button "↑"
~~~

لو قايمة بتترتب بالسحب، الزرار ده (ومعاه «انقل لتحت») بيخلّي اللي مبيعرفش يسحب (رعشة في الإيد، أو كيبورد بس) يرتّب برضه.

---

## الملخص

| السطر | القاعدة | المستوى | الفكرة |
|---|---|---|---|
| [[scroll-padding-top: 5rem]] | 2.4.11 | AA | الـ focus ميستخباش ورا header ثابت |
| [[min-inline-size: 24px]] | 2.5.8 | AA | الهدف 24×24 على الأقل |
| لينك المساعدة | 3.2.6 | A | نفس المكان في كل صفحة |
| checkbox «نفس العنوان» | 3.3.7 | A | متطلبش نفس البيانات مرتين |
| [[autocomplete]] ومن غير منع paste | 3.3.8 | AA | دخول من غير اختبار ذاكرة |
| زرار «انقل لفوق» | 2.5.7 | AA | بديل بضغطة لأي سحب |

## الخلاصة

- «WCAG 2.2 AA» = كل قواعد A و AA في النسخة 2.2، والقواعد الست دي هي الجديد فيها على مستوى A و AA.
- أغلبها سطر واحد: [[scroll-padding-top]]، و min size، و [[autocomplete]]، و زرار بديل.
- القواعد عن تجربة المستخدم، مش عن الكود: لينك المساعدة صح أو غلط حسب مكانه.`,
          lines: [
            R`2.4.11: لما Tab ينقلك لعنصر تحت الـ header الثابت، المتصفح يسيب 5rem فوقه فميستخباش.`,
            "2.5.8: أي زرار أيقونة 24×24 على الأقل.",
            "3.2.6: لينك المساعدة في نفس المكان في كل صفحة (في الـ header أو الـ footer).",
            "3.3.7: متطلبش العنوان مرتين، خليه يختار «نفس العنوان».",
            R`3.3.8: [[autocomplete]] ومفيش منع للـ paste، فمدير كلمات السر يشتغل.`,
            "2.5.7: أزرار تنقل العنصر كبديل للسحب."
          ],
          sol: R`النتيجة المعتادة في أول مرة: الـ focus بيستخبى ورا الـ header لما تعمل Tab وانت نازل (الحل [[scroll-padding-top]] بارتفاع الـ header على [[html]])، وفيه أزرار أيقونات أصغر من 24px (زرار قفل المودال أو أيقونات الجدول غالبًا)، وقوايم بتترتب بالسحب بس من غير أزرار.

في تسجيل الدخول: لو الـ paste اتمنع (فيه [[onPaste={e => e.preventDefault()}]] أو مكتبة بتعمل كده) ده سقوط في 3.3.8، شيله. ولو الـ checkout بيطلب عنوان الفاتورة والشحن كل واحد لوحده من غير اختيار «نفس العنوان»، ده 3.3.7.

لو ملقيتش حاجة خالص، جرّب على الموبايل: أغلب مشاكل 2.5.8 بتبان هناك.`
        },
        {
          cmd: "axe و Lighthouse",
          title: "الفحص الأوتوماتيك: بيمسك إيه وبيفوّت إيه؟",
          desc: R`axe DevTools (extension من Deque) و Lighthouse › Accessibility (جوه Chrome DevTools، وبيستخدم axe-core من جوه) بيفحصوا الصفحة في ثواني: صور من غير alt، وحقول من غير label، وتباين ضعيف، وأزرار ملهاش اسم، و ids متكررة، و aria غلط، وصفحة من غير [[lang]].

بس بيفوّتوا كتير: مبيعرفوش الـ alt ده بيوصف الصورة صح ولا لأ، ولا ترتيب الـ focus منطقي، ولا فيه keyboard trap، ولا الـ div اللي عليه onClick المفروض يبقى زرار. الأرقام المشهورة إن الأدوات دي بتغطي جزء بس من قواعد WCAG (أقل من النص في أغلب التقديرات)، فـ Lighthouse 100 مش معناها إن الموقع accessible.

وتقدر تشغّل axe في الاختبارات نفسها (Playwright مثلًا) عشان أي مشكلة واضحة متدخلش الـ main تاني.`,
          example: R`import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('الصفحة الرئيسية مفيهاش مشاكل a11y واضحة', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});`,
          try: R`اعمل صفحة فيها 5 مشاكل: [[<input placeholder="ابحث">]] من غير label، و [[<img src="a.png">]] من غير alt، و [[<button>]] جواه أيقونة SVG بس، وكلام [[color: #aaa]] على أبيض، و [[<div onclick="save()">حفظ</div>]]. شغّل axe DevTools و Lighthouse › Accessibility، وعدّ كل واحد مسك كام من الـ 5. أو من التيرمنال: [[npx lighthouse http://localhost:5173 --only-categories=accessibility --view]].`,
          flag: "script",
          deep: {
            why: R`الفحص الأوتوماتيك رخيص وسريع ومبيتعبش، فبيمسك المشاكل الواضحة قبل ما توصل لحد. بس لو اعتمدت عليه لوحده هتفتكر إنك خلصت وانت لسه في النص، ودا اللي بيحصل في مشاريع كتير: score أخضر وموقع مستحيل بالكيبورد.`,
            how: R`axe-core بيمشي على الـ DOM ويطبق قواعد (rules) ليها tags زي [[wcag2a]] و [[wcag2aa]] و [[wcag22aa]] و [[best-practice]]. كل قاعدة بتطلّع violations (غلط أكيد) أو incomplete (محتاج إنسان يبص، زي تباين الكلام فوق صورة أو gradient). و axe قاصد يبقى «zero false positives»: لو قال غلط يبقى غلط، بس ده معناه إنه بيسكت عن حاجات مش متأكد منها.

Lighthouse بيشغّل جزء من قواعد axe ويحسب score بأوزان. الـ score ده للمتابعة بس: مشكلة واحدة critical (زرار الدفع ملوش اسم) ممكن تسيب الـ score فوق 90.

اللي مستحيل على أداة: الـ alt مناسب؟ ([[alt="صورة"]] بيعدّي). العنوان بيوصف المحتوى؟ ترتيب الـ Tab منطقي؟ المودال بيرجّع الـ focus؟ div عليه onClick (الأداة شايفة div عادي فيه كلام، والـ listener مش باين في الـ HTML). المحتوى بيتقري بترتيب منطقي بعد CSS grid؟

في الـ CI: [[@axe-core/playwright]] مع [[withTags]] بيمنع أي regression واضحة. وفي React فيه كمان axe في اختبارات Vitest (الدرس الجاي).`,
            when: R`axe DevTools وانت بتشتغل على أي صفحة جديدة. Lighthouse قبل الـ release. و axe في Playwright على أهم الصفحات (الرئيسية، والتسجيل، والدفع) في كل PR. وبعد كل ده، الفحص اليدوي (بعد درسين).`,
            mistakes: R`Lighthouse 100 = تمام. تتجاهل الـ incomplete أو «Needs review» (غالبًا فيها التباين الحقيقي). تفحص الصفحة وهي مقفولة بس (المودال والمنيو المفتوحة ليهم مشاكل تانية، افتحهم وافحص تاني). تحط [[disableRules]] عشان الاختبار يعدّي. وفي الانترفيو: «بتختبر الـ accessibility إزاي؟» لو قلت Lighthouse بس ده ضعيف: قول أوتوماتيك (axe في CI) + lint + كيبورد يدوي + قارئ شاشة للمسارات المهمة.`
          },
          teach: R`## اختبار Playwright بيفتح الصفحة ويشغّل axe عليها

المثال اختبار واحد: افتح الصفحة، شغّل axe-core بقواعد WCAG من A لـ 2.2 AA، واتأكد إن مفيش ولا مخالفة. شغّلناه حرفيًا ([[@playwright/test]] 1.63 و [[@axe-core/playwright]] 4.13 على Chrome) على صفحتين: صفحة سليمة، وصفحة فيها الـ 5 مشاكل اللي في «جرّب».

---

## ١. الـ imports

~~~text a11y.spec.mjs
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
~~~

- [[{ test, expect }]]: الأقواس دي معناها «هات الحاجتين دول بالاسم» من الباكدج. [[test]] بيعرّف اختبار، و [[expect]] بيتأكد من قيمة.
- [[AxeBuilder]] من غير أقواس: ده الـ default export، الحاجة الأساسية اللي الباكدج بيطلّعها. اسمه Builder لأنك بتبني الإعداد خطوة خطوة وبعدين تشغّله.

## ٢. الاختبار

~~~text
test('الصفحة الرئيسية مفيهاش مشاكل a11y واضحة', async ({ page }) => {
~~~

- أول argument: اسم الاختبار، بيظهر في النتيجة.
- [[async ({ page }) => {]]: دالة [[async]] (جواها [[await]]). و Playwright بيدّيها object فيه حاجات جاهزة اسمها fixtures، و [[{ page }]] بيطلّع منه تاب متصفح جديد.
- [[a11y]] اختصار accessibility: 11 حرف بين الـ a والـ y.

## ٣. فتح الصفحة

~~~text
await page.goto('/');
~~~

[[await]] = استنى لحد ما الصفحة تحمّل. و [[/]] مسار نسبي، بيتركّب على [[baseURL]] اللي في [[playwright.config]] (عندنا كان سيرفر محلي على [[http://localhost:47913]]).

## ٤. تشغيل axe (السطور 5 لـ 7)

~~~text
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  .analyze();
~~~

من جوه لبرة:

1. [[new AxeBuilder({ page })]]: اعمل builder مربوط بالتاب ده.
2. [[.withTags([...])]]: شغّل القواعد اللي عليها التاجات دي بس. كل تاج = نسخة ومستوى:

| التاج | يعني |
|---|---|
| [[wcag2a]] و [[wcag2aa]] | قواعد WCAG 2.0 مستوى A و AA |
| [[wcag21a]] و [[wcag21aa]] | اللي اتزاد في 2.1 |
| [[wcag22aa]] | اللي اتزاد في 2.2 (زي [[target-size]]) |

ومن غير [[best-practice]]: دي قواعد كويسة بس مش جزء من WCAG، فممكن توقّع الاختبار على حاجة مش مطلوبة قانونًا.

3. [[.analyze()]]: بيحقن axe-core في الصفحة ويشغّله ويرجّع النتيجة. النقط اللي في أول السطور معناها إن كل method بترجّع نفس الـ builder، فبتكمّل عليه (method chaining).

[[results]] فيه أربع قوايم: [[violations]] (غلط أكيد)، و [[incomplete]] (محتاج إنسان)، و [[passes]]، و [[inapplicable]] (القاعدة ملهاش عناصر تفحصها).

## ٥. الحكم

~~~text
expect(results.violations).toEqual([]);
~~~

[[toEqual([])]] = لازم تبقى array فاضية. لو فيها حاجة، الاختبار بيقع ويطبع الفرق.

---

## النتيجة على الصفحة السليمة

~~~text الناتج (Playwright)
  ok 1 a11y.spec.mjs:3:1 › الصفحة الرئيسية مفيهاش مشاكل a11y واضحة (1.5s)
  1 passed (2.7s)
~~~

## النتيجة على صفحة الـ 5 مشاكل

~~~text الناتج (مختصر)
violations: button-name (critical, 1 عنصر), image-alt (critical, 1 عنصر)

Error: expect(received).toEqual(expected) // deep equality
- Expected  -   1
+ Received  + 173
+     "id": "button-name",
+     "impact": "critical",
+     "message": "Element does not have inner text that is visible to screen readers",
~~~

الـ 173 سطر دول تفاصيل كل مخالفة: العنصر، وليه، ولينك [[helpUrl]] بيشرح الحل.

| المشكلة | axe مسكها؟ |
|---|---|
| [[<img src="a.png">]] من غير alt | ✓ [[image-alt]] |
| [[<button>]] جواه SVG بس | ✓ [[button-name]] |
| [[<input placeholder="ابحث">]] من غير label | ✗ بيعتبر الـ placeholder اسم |
| [[<div onclick>]] | ✗ شايفه div عادي فيه كلام |
| [[color: #aaa]] على أبيض | ✗ لو الكلام عربي، ✓ لو إنجليزي |

### ليه التباين اتفوّت في الكلام العربي؟

جربنا [[<p style="color:#aaa">]] بكلام إنجليزي: axe طلّع [[color-contrast]] بنسبة 2.32. وبنفس الصفحة بكلام عربي متصل: ولا violation ولا incomplete. ولما سألنا axe نفسه ([[axe.commons.text.isIconLigature]]) عن الكلام «كلام باهت» قال [[true]]، وعن «ك ل ا م» (حروف منفصلة) قال [[false]]. يعني الحروف العربية المتصلة شكلها عنده زي أيقونة من خط أيقونات (icon ligature)، فبيتخطاها. ولقينا نفس الحاجة في Lighthouse 13.5:

~~~text Lighthouse › Accessibility على نفس الصفحة
كلام عربي:     score 75   فشل: button-name, image-alt         (color-contrast ناجح!)
كلام إنجليزي:  score 67   فشل: button-name, color-contrast, image-alt
~~~

فالـ score العالي على موقع عربي مش ضمان للتباين: قيسه بإيدك.

---

## Lighthouse من الترمنال

~~~bash
npx lighthouse http://localhost:5173 --only-categories=accessibility --view
~~~

- [[npx lighthouse]]: شغّل Lighthouse من npm من غير تسطيب دايم.
- [[--only-categories=accessibility]]: الـ accessibility بس (من غير Performance و SEO...).
- [[--view]]: افتح التقرير في المتصفح بعد ما يخلص. (احنا استخدمنا [[--output=json]] عشان نقرا الأرقام.)

## الخلاصة

- [[AxeBuilder]] + [[withTags]] + [[analyze]] + [[toEqual([])]] = اختبار بيوقّع أي مشكلة a11y واضحة في الـ CI.
- الأداة بتمسك اللي ملوش اسم أو alt بثقة، وبتفوّت المعنى (placeholder بدل label، و div بدل button).
- في المواقع العربي، فحص التباين الأوتوماتيك ممكن يسكت تمامًا.`,
          lines: [
            "Playwright.",
            "axe مخصوص لـ Playwright.",
            "اختبار للصفحة الرئيسية.",
            "افتح الصفحة (الـ baseURL في الـ config).",
            "شغّل axe على الصفحة المفتوحة...",
            "...بقواعد WCAG من A لـ 2.2 AA بس (من غير best-practice).",
            "...وارجع النتيجة.",
            "أي violation يوقّع الاختبار ويطبع العناصر والسبب.",
            "قفلة."
          ],
          sol: R`لما جربنا الصفحة دي بـ axe-core: مسك [[image-alt]] (الصورة من غير alt) و [[button-name]] (الزرار اللي فيه أيقونة بس)، الاتنين critical. والتباين بيطلع violation ([[color-contrast]]، 2.32:1) **لو الكلام إنجليزي بس**: جربنا [[#aaa]] على كلام عربي متصل («كلام باهت») و axe-core (4.13 و 4.14) مقالش حاجة خالص، لأنه بيفتكر الحروف العربية المتصلة icon ligature (زي أيقونات الخطوط) فبيتخطاها، و Lighthouse 13.5 علّم الـ audit ناجح. يعني على كلام إنجليزي 3 من 5، وعلى كلام عربي 2 من 5، فالتباين في موقع عربي لازم تقيسه بإيدك من DevTools.

اللي فات: الـ input اللي عليه placeholder بس، axe بيعتبر الـ placeholder اسم فمبيقولش حاجة (مع إن الـ placeholder مش بديل للـ label، شوف درس «form و label»). والـ div اللي عليه onclick مبيظهرش خالص لأن الأداة مش عارفة إنه المفروض يبقى زرار.

Lighthouse 13.5 طلّع نفس النتيجة: score ‏75 للصفحة العربي (فشل [[button-name]] و [[image-alt]] بس)، و 67 لنفس الصفحة بكلام إنجليزي (زائد [[color-contrast]]). الدرس: 2 أو 3 من 5 مشاكل حقيقية عدّوا من الأداة.`
        },
        {
          cmd: "jsx-a11y و getByRole",
          title: "امسك غلط الـ accessibility وانت بتكتب وفي الاختبارات",
          desc: R`[[eslint-plugin-jsx-a11y]] بيقرا الـ JSX وانت بتكتب ويطلّع error على [[<img>]] من غير alt، و [[<div onClick>]] من غير كيبورد، و [[<a href="#" onClick>]] المفروض يبقى زرار. (إعداد ESLint نفسه في «تاب فحص الكود».)

وفي الاختبارات، Testing Library بتدوّر على العناصر زي قارئ الشاشة: [[getByRole('button', { name: 'حفظ' })]]. لو الاختبار مش لاقي الزرار بالطريقة دي، يبقى قارئ الشاشة كمان مش لاقيه، فالاختبار نفسه بقى اختبار accessibility.

ومع [[user-event]] تقدر تعمل [[user.tab()]] وتتأكد إن الـ focus راح المكان الصح.`,
          example: R`// eslint.config.mjs
import jsxA11y from 'eslint-plugin-jsx-a11y';
export default [jsxA11y.flatConfigs.recommended];
// Signup.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { expect, test } from 'vitest';
test('الخطأ مربوط بالحقل والفورم بيتوصل بالكيبورد', async () => {
  const user = userEvent.setup();
  const { container } = render(<Signup />);
  const email = screen.getByRole('textbox', { name: 'الإيميل' });
  await user.tab();
  expect(email).toHaveFocus();
  await user.click(screen.getByRole('button', { name: 'سجّل' }));
  expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(email).toHaveAccessibleDescription('اكتب الإيميل');
  expect((await axe.run(container)).violations).toEqual([]);
});`,
          try: R`في مشروع React فيه ESLint، ركّب [[npm i -D eslint-plugin-jsx-a11y]] وضيفه للـ config، واكتب component فيه [[<div onClick={save}>حفظ</div>]] و [[<img src="x.png" />]] و [[<a href="#" onClick={save}>حفظ</a>]] و [[<input placeholder="ابحث" />]] وشغّل [[npx eslint]]. وبعدين اكتب اختبار فيه [[screen.getByRole('button', { name: 'حفظ' })]] على نفس الـ component واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`أرخص وقت تصلّح فيه غلط accessibility هو وانت بتكتب السطر. الـ lint بيمسك الغلطات المتكررة (div بيتضغط، img من غير alt) قبل الـ commit، والاختبارات بـ getByRole بتضمن إن المكون لسه ليه اسم و role صح بعد أي refactor.`,
            how: R`jsx-a11y تحليل ثابت: بيشوف الكود مش الصفحة. فبيعرف إن [[<div onClick>]] ملوش [[onKeyDown]] ولا role، بس ميعرفش لو [[<Button>]] بتاعك بيطلّع div ولا button (إلا لو عرّفته في [[settings]] بتاعت components). و [[recommended]] مبيشغّلش كل القواعد، مثلًا حقل عليه placeholder بس بيعدّي.

[[getByRole]] بيحسب الـ role والـ accessible name بنفس قواعد المتصفح (من الـ label، و aria-label، والمحتوى). و [[textbox]] للـ input العادي، و [[spinbutton]] لـ number، و [[combobox]] لـ select، و [[checkbox]] و [[radio]] و [[group]] لـ fieldset، و [[columnheader]] لـ th. وترتيب أولوية الـ queries في دوكس Testing Library: [[getByRole]] الأول، و [[getByLabelText]]، وفي الآخر خالص [[getByTestId]].

[[toHaveFocus]] و [[toHaveAccessibleDescription]] من [[@testing-library/jest-dom]]، وبتتفعل بـ [[import '@testing-library/jest-dom/vitest']] في ملف الـ setup. و [[axe.run(container)]] على الـ container مش الـ body، عشان قواعد الصفحة الكاملة (زي landmarks) متطلعش على component لوحده.

و Next.js بيجي ومعاه جزء من قواعد jsx-a11y في [[eslint-config-next]] كـ warnings، فلو عايز الـ recommended كاملة ضيف الـ plugin صريح. ولو npm اشتكى من peer dependency مع نسخة ESLint أحدث من اللي الـ plugin معلن إنه بيدعمها، شوف صفحة الـ plugin قبل ما تستخدم [[--legacy-peer-deps]] (في تجربتنا مع ESLint 10 اشتغل عادي).`,
            when: R`jsx-a11y في أي مشروع React من أول يوم، ومع lint-staged قبل الـ commit («تاب فحص الكود»). getByRole في كل اختبار component. و axe في الاختبارات للمكونات المعقدة (فورمات، ومودالات، وجداول).`,
            mistakes: R`[[getByTestId]] في كل حتة: الاختبار بيعدّي حتى لو الزرار ملوش اسم. تطفي قاعدة jsx-a11y بـ [[eslint-disable]] بدل ما تصلّح. تفتكر إن الـ lint بيشوف الـ components بتاعتك من جوه. [[fireEvent.click]] بدل [[user-event]] (مبيعملش focus ولا keyboard زي المستخدم). وفي الانترفيو: «ليه getByRole أحسن من getByTestId؟» لأنه بيختبر اللي المستخدم (وقارئ الشاشة) شايفه، ولو فشل يبقى فيه مشكلة حقيقية.`
          },
          teach: R`## ملفين: إعداد ESLint، واختبار بيدوّر زي قارئ الشاشة

المثال فيه ملف [[eslint.config.mjs]] بيشغّل قواعد jsx-a11y، وملف اختبار [[Signup.test.jsx]] بيرسم فورم ويمشي فيه بالكيبورد ويتأكد من الـ aria. نفّذناهم حرفيًا: ESLint 9.39 و eslint-plugin-jsx-a11y 6.10، و Vitest 5 بـ jsdom و Testing Library، على component [[Signup]] كتبناه (label «الإيميل» مربوط بالحقل، وزرار «سجّل»، ولو الحقل فاضي رسالة «اكتب الإيميل»).

---

## ١. [[eslint.config.mjs]]

~~~text eslint.config.mjs
import jsxA11y from 'eslint-plugin-jsx-a11y';
export default [jsxA11y.flatConfigs.recommended];
~~~

- [[.mjs]]: ملف JavaScript بصيغة الـ modules ([[import]] و [[export]]).
- [[jsxA11y.flatConfigs.recommended]]: الـ plugin جايب إعدادات جاهزة. [[flatConfigs]] = بصيغة الـ flat config الجديدة (ملف واحد فيه array)، و [[recommended]] = مجموعة القواعد المقترحة.
- [[export default [ ... ]]]: الـ config عبارة عن array، كل عنصر فيها object إعدادات، و ESLint بيدمجهم بالترتيب.

### حاجة اكتشفناها وانت بتجرّب

بالسطر ده لوحده [[npx eslint src]] قال «all of the files matching the glob pattern "src" are ignored». السبب إن ESLint 9 من غير [[files]] بيفحص [[.js]] و [[.mjs]] و [[.cjs]] بس، و [[.jsx]] لأ. في مشروع حقيقي الـ config فيه أصلًا عنصر بيحدد الملفات (ده معنى «ضيفه جنب باقي الإعدادات»)، ولو مفيش ضيف:

~~~text eslint.config.mjs
export default [{ files: ['**/*.{js,jsx}'] }, jsxA11y.flatConfigs.recommended];
~~~

[[**/*.{js,jsx}]]: [[**]] أي فولدر بأي عمق، و [[{js,jsx}]] الامتدادين دول.

### الناتج على component «جرّب»

~~~text الناتج (npx eslint src)
4:7  error  Visible, non-interactive elements with click handlers must have at least one keyboard listener   jsx-a11y/click-events-have-key-events
4:7  error  Avoid non-native interactive elements...                                                     jsx-a11y/no-static-element-interactions
5:7  error  img elements must have an alt prop...                                                         jsx-a11y/alt-text
6:7  error  Anchor used as a button...                                                                    jsx-a11y/anchor-is-valid
✖ 4 problems (4 errors, 0 warnings)
~~~

[[4:7]] = السطر 4 والعمود 7. الـ div خد غلطتين (مفيش keyboard، ومفيش role)، والـ img غلطة، واللينك اللي [[href="#"]] غلطة. والـ [[<input placeholder="ابحث">]] عدّى.

---

## ٢. الـ imports في الاختبار

~~~text Signup.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { expect, test } from 'vitest';
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[render]] | يرسم الـ component في DOM وهمي (jsdom) |
| [[screen]] | يدوّر في الـ DOM ده ([[getByRole]] وأخواتها) |
| [[userEvent]] | يقلّد المستخدم: Tab وضغطات وكتابة، بالترتيب الحقيقي للأحداث |
| [[axe]] | axe-core نفسه، من غير Playwright |
| [[expect]] و [[test]] | من Vitest |

والـ matchers زي [[toHaveFocus]] مش من Vitest، من [[@testing-library/jest-dom]]، واتفعّلت بسطر [[import '@testing-library/jest-dom/vitest';]] في ملف setup، مع [[environment: 'jsdom']] في [[vitest.config]].

## ٣. التجهيز

~~~text
const user = userEvent.setup();
const { container } = render(<Signup />);
~~~

- [[userEvent.setup()]]: جهّز «مستخدم» واحد للاختبار كله.
- [[render]] بيرجّع object، و [[{ container }]] بياخد منه الـ div اللي الـ component اترسم جواه.

## ٤. هات الحقل زي قارئ الشاشة

~~~text
const email = screen.getByRole('textbox', { name: 'الإيميل' });
~~~

[[textbox]] = الـ role بتاع [[<input type="email">]]، و [[name]] = الاسم المحسوب من الـ label. جربنا نشيل [[htmlFor]] من الـ label:

~~~text الناتج من غير ربط الـ label
TestingLibraryElementError: Unable to find an accessible element with the role "textbox" and name "الإيميل"
Here are the accessible roles:
  textbox:
  Name "":
~~~

يعني الحقل موجود بس اسمه فاضي، وده بالظبط اللي قارئ الشاشة كان هيقوله.

## ٥. الكيبورد

~~~text
await user.tab();
expect(email).toHaveFocus();
~~~

[[user.tab()]] = دوسة Tab واحدة من أول الصفحة. والحقل لازم يبقى أول حاجة بتاخد focus. لو حد حط قبله لينك أو زرار، الاختبار يقع.

## ٦. الغلط

~~~text
await user.click(screen.getByRole('button', { name: 'سجّل' }));
expect(email).toHaveAttribute('aria-invalid', 'true');
expect(email).toHaveAccessibleDescription('اكتب الإيميل');
~~~

- دوس «سجّل» والحقل فاضي.
- [[toHaveAttribute('aria-invalid', 'true')]]: الحقل اتعلّم غلط. أول مرة الـ component بتاعنا كان فيه bug فطلع: [[Expected aria-invalid="true" / Received aria-invalid="false"]]. الاختبار مسكه.
- [[toHaveAccessibleDescription]]: الوصف المحسوب من [[aria-describedby]] هو نص الرسالة. لو الـ id غلط أو الـ attribute ناقص، يقع.

## ٧. axe على الـ component

~~~text
expect((await axe.run(container)).violations).toEqual([]);
~~~

من جوه لبرة: [[axe.run(container)]] افحص الـ div ده بس، و [[await]] استنى النتيجة، و [[( ... ).violations]] خد قايمة المخالفات، و [[toEqual([])]] لازم تبقى فاضية.

### النتيجة

~~~text الناتج (npx vitest run)
Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

السطر الأول تحذير من jsdom: axe بيحاول يستخدم canvas (لفحوصات زي التباين)، و jsdom مفيهوش canvas ولا layout حقيقي. فالتباين والمقاسات مش بتتفحص في jsdom أصلًا، دي شغلة Playwright في متصفح حقيقي (الدرس اللي فات).

---

## getByRole و getByTestId

جربنا [[getByRole('button', { name: 'حفظ' })]] على component «جرّب» (div و img ولينك و input):

~~~text الناتج
Unable to find an accessible element with the role "button" and name "حفظ"
Here are the accessible roles:
  img:      Name ""
  link:     Name "حفظ"
  textbox:  Name ""
~~~

مفيش button خالص: الـ div ملوش role. ولاحظ إن الـ placeholder مطلعش اسم للـ textbox هنا. [[getByTestId]] كان هيلاقي الـ div عادي والاختبار يعدّي، وده سبب ترتيب الأولوية: role الأول.

## الخلاصة

| الأداة | بتشوف | بتمسك |
|---|---|---|
| jsx-a11y | الكود وانت بتكتب | div بيتضغط، img من غير alt، لينك بيشتغل زرار |
| [[getByRole]] | الـ role والاسم المحسوب | label مش مربوط، زرار من غير اسم |
| [[user.tab()]] + [[toHaveFocus]] | ترتيب الـ focus | عنصر دخل قبل الحقل |
| [[axe.run(container)]] | قواعد axe في jsdom | aria غلط (من غير تباين) |`,
          lines: [
            R`الـ recommended من jsx-a11y بصيغة الـ flat config (ESLint 9 وطالع).`,
            "مصفوفة الإعدادات (ضيفه جنب باقي الإعدادات بتاعتك).",
            "Testing Library لـ React.",
            "user-event: كيبورد وماوس زي المستخدم الحقيقي.",
            "axe-core نفسه.",
            R`Vitest (أو فعّل [[globals: true]] في الـ config).`,
            "الاختبار.",
            "جهّز user-event.",
            "ارسم الفورم.",
            R`هات الحقل بالـ role والاسم زي قارئ الشاشة. لو الـ label مش مربوط، السطر ده بيفشل.`,
            "دوس Tab.",
            "الـ focus لازم يبقى على الإيميل (أول حقل).",
            "دوس سجّل والحقل فاضي.",
            R`الحقل بقى [[aria-invalid]].`,
            R`والرسالة مربوطة بيه بـ [[aria-describedby]].`,
            "ومفيش أي مخالفة axe في الـ component.",
            "قفلة."
          ],
          sol: R`[[npx eslint]] بيطلّع 4 errors: [[click-events-have-key-events]] و [[no-static-element-interactions]] على الـ div، و [[alt-text]] على الـ img، و [[anchor-is-valid]] على اللينك (رسالته «Anchor used as a button»). والـ input اللي عليه placeholder بس عدّى، لأن القاعدة بتاعته مش في الـ recommended.

والاختبار بيفشل برسالة زي: [[Unable to find an accessible element with the role "button" and name "حفظ"]] وتحتها «Here are the accessible roles:» وفيها [[img]] باسم فاضي، و [[link]] اسمه «حفظ»، و [[textbox]] باسم فاضي (الـ placeholder مش اسم هنا)، ومفيش [[button]] خالص لأن الـ div ملوش role. ولو الـ component فيه الـ div بس، الرسالة بتبقى «There are no accessible roles». ودا بالظبط اللي قارئ الشاشة شايفه: مفيش زرار.

الحل: [[<button type="button" onClick={save}>حفظ</button>]] والاختبار والـ lint الاتنين يعدّوا.`
        },
        {
          cmd: "كيبورد وقارئ شاشة",
          title: "الـ checklist اليدوي: كيبورد بس، و NVDA و VoiceOver",
          desc: R`الفحص اليدوي هو اللي بيمسك الباقي. أولًا الكيبورد (5 دقايق لكل صفحة): شيل الماوس، ودوس Tab من أول الصفحة لآخرها. كل حاجة بتتضغط بتتوصل؟ الـ focus باين دايمًا؟ الترتيب زي ترتيب القراية؟ Enter و Space بيشغّلوا الأزرار؟ Escape بيقفل المودال والـ focus بيرجع للزرار؟ مفيش مكان بتدخله ومتعرفش تخرج؟

ثانيًا قارئ الشاشة للمسارات المهمة (التسجيل، والدفع): NVDA على ويندوز (مجاني) مع Chrome أو Firefox، و VoiceOver على الماك والآيفون. اسمع: كل حاجة ليها اسم؟ العناوين بالترتيب؟ الأخطاء بتتقري؟

المثال تحت أهم الاختصارات عشان تبدأ.`,
          example: R`Tab / Shift+Tab           العنصر اللي بعده / قبله
Enter / Space            Enter: الزرار واللينك، Space: الزرار والـ checkbox
Esc                      اقفل المودال أو المنيو
NVDA: Ctrl+Alt+N         شغّل NVDA (ويندوز)
NVDA: H / Shift+H        العنوان اللي بعده / قبله
NVDA: D                  الـ landmark اللي بعده (main و nav)
NVDA: Insert+F7          لستة كل اللينكات والعناوين
NVDA: Ctrl               اسكت
Mac: Cmd+F5              شغّل واقفل VoiceOver
Mac: Ctrl+Option+←/→     العنصر اللي قبله / بعده
Mac: Ctrl+Option+Space   اضغط على العنصر
Mac: Ctrl+Option+U       الـ rotor: لستة العناوين واللينكات والحقول`,
          try: R`خد صفحة التسجيل في مشروعك واعمل الـ checklist بالكيبورد بس، واكتب كل مشكلة. وبعدين شغّل NVDA أو VoiceOver وسجّل حساب من غير ما تبص على الشاشة (أو غمّض عينك): دوس H عشان تعرف الصفحة فيها إيه، وبعدين املا الفورم واغلط عمدًا في الإيميل.`,
          flag: "keys",
          deep: {
            why: R`حوالي نص قواعد WCAG محتاجة حكم إنسان. والمستخدم الحقيقي بيستخدم الموقع بقارئ شاشة ومتصفح معين، والأداة مبتسمعش اللي هو بيسمعه. خمس دقايق كيبورد بتلاقي مشاكل أكتر من أي أداة.`,
            how: R`checklist الكيبورد الكامل: (1) لينك «تخطى للمحتوى» أول Tab. (2) كل عنصر تفاعلي بيتوصل ومفيش حاجة مش تفاعلية بتاخد focus على الفاضي. (3) الـ focus ظاهر وتباينه واضح ومش مستخبي ورا header. (4) ترتيب الـ Tab زي ترتيب القراية (من اليمين لليسار في العربي، ومن فوق لتحت). (5) المنيو والـ dropdown بيفتحوا بـ Enter ويقفلوا بـ Esc. (6) المودال بيحبس الـ focus جواه ويرجّعه بعد ما يقفل. (7) مفيش keyboard trap (حتة بتدخلها ومتعرفش تخرج، زي iframe أو editor). (8) الـ tabs والـ radio بتتحرك بالأسهم.

قارئ الشاشة بيشتغل في وضعين: browse mode (بتقرا الصفحة بالأسهم وبحروف زي H للعناوين و K للينكات و F للحقول و B للأزرار و T للجداول)، و focus mode (لما تدخل حقل، الحروف بتتكتب فيه). NVDA بيبدّل لوحده، و Insert هو «مفتاح NVDA» (أو Caps Lock في إعداد laptop).

VoiceOver: الـ VO هو Ctrl+Option، و الـ rotor (VO+U) بيدّيك لستة بالعناوين واللينكات والحقول والـ landmarks، تتنقل بينهم بالأسهم يمين وشمال. على الآيفون: من Settings › Accessibility، وبتتنقل بـ swipe يمين وشمال و double tap للضغط.

التركيبات الشائعة: NVDA + Chrome أو Firefox، و JAWS + Chrome (مدفوع وشائع في الشركات)، و VoiceOver + Safari، و TalkBack + Chrome على أندرويد. اختبر على اتنين على الأقل لو المشروع مهم.

واسمع لـ: اسم كل زرار (مش «button» بس)، والـ state (expanded، checked، invalid)، والرسايل الديناميكية (اتحفظ، خطأ) بتتقري من غير ما تدور عليها.`,
            when: R`الكيبورد: قبل ما تقفل أي PR فيه UI. قارئ الشاشة: للمسارات المهمة قبل الـ release، وأي مكون مخصص (combobox، و tabs، و date picker).`,
            mistakes: R`تختبر VoiceOver مع Chrome (التركيبة مش مستقرة، استخدم Safari). تشغّل قارئ الشاشة وانت بتبص على الشاشة فتشوف اللي هو مبيقولوش. تختبر بالماوس جنب الكيبورد. تنسى الموبايل (TalkBack و VoiceOver على iOS بيتصرفوا مختلف). وتقرر «محدش من مستخدمينا بيستخدم قارئ شاشة» من غير ما تعرف، لأن محدش بيقولك.`
          },
          teach: R`## المثال مش كود: دي لستة اختصارات

كل سطر في المثال: الاختصار على الشمال، وبيعمل إيه على اليمين. التلات سطور الأولى مفاتيح المتصفح نفسه، وده اللي هتختبر بيه أي صفحة. وبعدها NVDA (قارئ شاشة مجاني لويندوز)، وبعدها VoiceOver (جوه الماك). مفاتيح المتصفح جربناها في Chrome على صفحة فيها لينك وزرار و checkbox و [[<dialog>]]. أما اختصارات NVDA و VoiceOver فمن الـ docs الرسمية بتاعتهم (مش متجرّبة هنا: محتاجة قارئ الشاشة شغال على جهاز حقيقي).

---

## ١. مفاتيح المتصفح (اتجرّبت في Chrome)

### [[Tab]] و [[Shift+Tab]]

~~~text اتقاس في Chrome
Tab × 4:      لينك > زرار > checkbox > زرار «افتح»
Shift+Tab:    رجع للـ checkbox
~~~

[[Tab]] = العنصر اللي بعده، و [[Shift+Tab]] = اللي قبله، بترتيب الـ HTML. (الـ [[+]] في الاختصار معناها «دوس الاتنين مع بعض».)

### [[Enter]] و [[Space]]: مش نفس الحاجة

جربنا كل مفتاح على كل عنصر:

| العنصر | Enter | Space |
|---|---|---|
| [[<button>]] | اتضغط | اتضغط |
| [[<a href>]] | اتضغط واتنقل لـ [[#target]] | **ما اتضغطش**، الصفحة عملت scroll |
| [[<input type="checkbox">]] | **ما اتعلّمش** | اتعلّم |

يعني اللينك بيتفتح بـ Enter بس، والـ checkbox بيتعلّم بـ Space بس، والزرار بالاتنين. وده مفيد في الاختبار: لو عامل «زرار» بـ div أو لينك ومش بيشتغل بـ Space، يبقى مش زرار حقيقي.

### [[Esc]]

فتحنا [[<dialog>]] بـ [[showModal()]]: الـ focus راح لأول زرار جواه. دسنا Escape: الـ dialog اتقفل والـ focus رجع لزرار «افتح» لوحده. ده السلوك اللي لازم أي مودال معمول بإيدك يقلّده.

---

## ٢. NVDA على ويندوز (من الـ docs)

| الاختصار | بيعمل إيه | ليه مهم |
|---|---|---|
| [[Ctrl+Alt+N]] | يشغّل NVDA | اختصار بيتعمل وقت التسطيب لو سبت الاختيار ده |
| [[H]] و [[Shift+H]] | العنوان اللي بعده / قبله | أسرع طريقة تعرف الصفحة فيها إيه، زي ما المستخدم الحقيقي بيعمل |
| [[D]] | الـ landmark اللي بعده | landmark = أجزاء الصفحة الكبيرة: [[<main>]] و [[<nav>]] و [[<header>]] |
| [[Insert+F7]] | Elements List | لستة باللينكات والعناوين والـ landmarks في شباك واحد |
| [[Ctrl]] | اسكت | بيوقف الكلام الحالي بس، مش NVDA |

- الحروف لوحدها (H و D) شغالة في **browse mode**: لما تكون بتقرا الصفحة. ولما تدخل حقل كتابة NVDA بيتنقل لـ **focus mode**، والحروف بتتكتب في الحقل.
- [[Insert]] هو «مفتاح NVDA»، وفي إعداد اللابتوب ممكن يبقى [[Caps Lock]].

---

## ٣. VoiceOver على الماك (من الـ docs)

| الاختصار | بيعمل إيه |
|---|---|
| [[Cmd+F5]] | يشغّل ويقفل VoiceOver |
| [[Ctrl+Option+←]] و [[→]] | العنصر اللي قبله / بعده |
| [[Ctrl+Option+Space]] | اضغط على العنصر الحالي |
| [[Ctrl+Option+U]] | الـ rotor |

- [[Cmd]] = مفتاح Command (⌘)، و [[Option]] = ⌥.
- [[Ctrl+Option]] بيتسمّى **VO** في docs بتاعة Apple، فـ [[VO+U]] = [[Ctrl+Option+U]].
- الـ **rotor** قايمة بتلف فيها بالأسهم يمين وشمال بين أنواع: العناوين، واللينكات، والحقول، والـ landmarks، وبالأسهم فوق وتحت جوه النوع.

---

## ٤. مقارنة سريعة

| عايز | المتصفح لوحده | NVDA | VoiceOver |
|---|---|---|---|
| العنصر اللي بعده | [[Tab]] | [[Tab]] أو السهم لتحت | [[VO+→]] |
| اضغط | [[Enter]] / [[Space]] | [[Enter]] | [[VO+Space]] |
| العناوين | مفيش | [[H]] | الـ rotor |
| لستة بكل حاجة | مفيش | [[Insert+F7]] | [[VO+U]] |
| اسكت | | [[Ctrl]] | [[Ctrl]] |

## الخلاصة

- Tab و Shift+Tab للتنقل، و Enter للينك والزرار، و Space للزرار والـ checkbox، و Esc للقفل والـ focus يرجع مكانه.
- في قارئ الشاشة: [[H]] (أو الـ rotor) أول حاجة، عشان تشوف الصفحة زي ما المستخدم الكفيف بيشوفها.
- اختبر بعينك مقفولة أو الشاشة مطفية، وإلا هتشوف اللي قارئ الشاشة مقالوش.`,
          lines: [
            "التنقل للأمام وللخلف.",
            "التشغيل.",
            "القفل.",
            "تشغيل NVDA (لو اخترت الاختصار ده وقت التسطيب).",
            "القفز بين العناوين: أسرع طريقة تعرف الصفحة فيها إيه.",
            "القفز بين أجزاء الصفحة الأساسية.",
            "Elements List: كل اللينكات أو العناوين في لستة واحدة.",
            "إسكات الكلام الحالي.",
            "VoiceOver على الماك.",
            "التنقل بين العناصر (VO = Ctrl+Option).",
            "تفعيل العنصر الحالي.",
            "الـ rotor: قوايم بالعناوين واللينكات والحقول."
          ],
          sol: R`المشاكل اللي غالبًا هتلاقيها في صفحة تسجيل: لينك التخطي مش موجود، وزرار «إظهار الباسورد» أيقونة من غير اسم (قارئ الشاشة بيقول «button» بس)، والأخطاء بتظهر تحت بالأحمر ومحدش بيقراها (ناقص [[aria-describedby]] أو [[aria-live]])، والـ focus فاضل على زرار التسجيل بعد الغلط بدل ما يروح للحقل الغلط.

ولو دوست H ومسمعتش أي عنوان، أو سمعت «heading level 3» من غير h1، يبقى هيكل العناوين محتاج تظبيط (درس semantic HTML).

الغلط الشائع في التجربة نفسها: تبص على الشاشة وتفتكر إن كله تمام. لو مش قادر تغمّض، اطفي الشاشة (في NVDA فيه Screen Curtain، و VoiceOver فيه Screen Curtain بـ VO+Fn+Shift+-).`
        },
        {
          cmd: "إعلان تغيير الصفحة",
          title: "SPA بتغيّر الصفحة وقارئ الشاشة ساكت",
          desc: R`في موقع عادي، كل لينك بيحمّل صفحة جديدة وقارئ الشاشة بيقول عنوانها. في SPA (React Router مثلًا)، اللينك بيغيّر المحتوى بـ JavaScript: مفيش page load، فقارئ الشاشة ساكت، والـ focus فاضل على اللينك اللي اتداس (أو راح لأول الصفحة). المستخدم مش عارف إن حاجة اتغيرت.

الحل: غيّر [[document.title]]، وانقل الـ focus لعنوان الصفحة الجديدة ([[<h1 tabIndex={-1}>]])، أو أعلن التغيير في منطقة [[aria-live]].

و Next.js App Router عامل ده لوحده: فيه route announcer بيقرا [[document.title]]، ولو مفيش يقرا أول [[<h1>]]، ولو مفيش يقرا الـ URL. فكل صفحة لازم ليها title مختلف ومفهوم (من [[metadata]]).`,
          example: R`import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
export function RouteFocus() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    const h1 = document.querySelector('main h1');
    if (!h1) return;
    h1.tabIndex = -1;
    h1.focus();
  }, [pathname]);
  return null;
}
// في الـ layout: <main><Outlet /></main><RouteFocus />
// وفي كل صفحة (React 19 بينقلها للـ head لوحده):
<title>المنتجات | متجر النور</title>`,
          try: R`في مشروع React Router، شغّل قارئ الشاشة واتنقل بين صفحتين بلينك في الـ nav: قال حاجة؟ وبعدين حط [[<RouteFocus />]] في الـ layout و [[<title>]] في كل صفحة وجرّب تاني. وفي Next.js شيل الـ [[title]] من [[metadata]] بتاعت صفحة وشوف الـ announcer بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`ده من أشهر مشاكل الـ SPAs وأقلها ملاحظة، لأن اللي بيبص على الشاشة شايف الصفحة اتغيرت. المستخدم الكفيف بيدوس «المنتجات» ومبيسمعش حاجة، فيفتكر اللينك مش شغال ويدوس تاني، أو الـ focus يفضل في الـ nav فيضطر يعدّي 30 عنصر عشان يوصل للمحتوى الجديد.`,
            how: R`فيه طريقتين والاتنين مقبولين. (1) نقل الـ focus: [[tabIndex={-1}]] بيخلي الـ h1 ياخد focus من الكود ومش بيدخل الـ Tab، وقارئ الشاشة بيقرا العنوان لما الـ focus يوصله، والـ Tab اللي بعده بيكمّل من المحتوى الجديد. عيبها إن الـ focus بيبعد عن الـ nav. (2) إعلان: منطقة [[<div aria-live="polite" className="sr-only">]] موجودة في الـ layout من الأول، ولما الـ route يتغير تحط فيها «اتنقلت لـ: المنتجات». الـ focus فاضل مكانه، وده اللي Next.js بيعمله.

أول تحميل للصفحة مش محتاج أي حاجة (المتصفح بيعلن الصفحة لوحده)، عشان كده [[prev]] بيبدأ بالمسار الحالي: من غيره الـ focus هيتنقل للـ h1 أول ما الموقع يفتح ويعدّي لينك التخطي. والمقارنة بالمسار أأمن من flag «أول مرة»، لأن React StrictMode بيشغّل الـ effect مرتين في الـ development، والـ flag كان هينقل الـ focus في التانية.

المكون ده لازم يبقى في الـ layout اللي فاضل ثابت بين الصفحات، مش جوه كل صفحة: لو جوه الصفحة، كل تنقل بيعمل نسخة جديدة منه والـ ref بيبدأ من الأول فمش هيعرف إن المسار اتغير. والـ effect بتاع الأب بيشتغل بعد ما الصفحة الجديدة اترسمت، فالـ h1 بيبقى موجود. لو الصفحة بتحمّل بياناتها بعد كده (loading)، انقل الـ focus بعد ما المحتوى يظهر.

والـ outline على الـ h1 لما ياخد focus من الكود: ممكن تشيله بـ [[h1:focus { outline: none }]] لأنه مش عنصر تفاعلي، بس أي عنصر بيتضغط لازم الـ outline يفضل.

وخلي الـ title فيه اسم الصفحة الأول واسم الموقع بعده، عشان اللي بيسمع يعرف الصفحة من أول كلمة، وعشان التابات في المتصفح.`,
            when: R`أي SPA فيها client-side routing: React Router، و TanStack Router، و Vue Router. وفي Next.js: اتأكد إن كل صفحة ليها [[title]] مختلف، وخلاص. وكمان لما محتوى كبير يتغير من غير تغيير الـ URL (خطوة جديدة في wizard): نفس الفكرة.`,
            mistakes: R`كل الصفحات نفس الـ title («متجر النور») فالـ announcer بيقول نفس الكلمة كل مرة. نقل الـ focus في أول تحميل. نقل الـ focus للـ [[<body>]] أو لـ div ملوش اسم فقارئ الشاشة يقول «blank». عمل منطقة aria-live مع الرسالة (لازم تبقى موجودة قبل ما المحتوى يتغير). وتنقل الـ focus وتعلن في نفس الوقت فالمستخدم يسمع الكلام مرتين.`
          },
          teach: R`## component صغير بينقل الـ focus للعنوان كل ما الصفحة تتغير

[[RouteFocus]] مبيرسمش أي حاجة. شغلته كلها: كل ما الـ URL يتغير، يدوّر على [[<h1>]] الصفحة الجديدة ويحط عليه الـ focus، فقارئ الشاشة يقول اسم الصفحة. حطيناه حرفيًا في تطبيق React 19.3 و react-router 8.4 (Vite، build production، جوه [[StrictMode]])، بـ layout فيه nav بلينكين و [[<main><Outlet /></main>]]، وصفحتين كل واحدة فيها [[<title>]] و [[<h1>]]، وجربناه في Chrome من Playwright مرة بالـ component ومرة من غيره.

---

## ١. الـ imports

~~~text
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
~~~

- [[useEffect]]: hook بيشغّل كود **بعد** ما React يرسم.
- [[useRef]]: صندوق بيفضل محتفظ بقيمته بين الـ renders، وتغييره مش بيعمل render جديد.
- [[useLocation]]: بيرجّع مكان الصفحة الحالي (المسار وغيره). من v7 بيتعمله import من [[react-router]] على طول (زمان كان [[react-router-dom]]).

## ٢. المسار الحالي وآخر مسار شفناه

~~~text
export function RouteFocus() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
~~~

- [[{ pathname }]]: خد خانة [[pathname]] بس من الـ object، زي [[/products]].
- [[useRef(pathname)]]: القيمة الأولى بس هي اللي بتتحط. فـ [[prev.current]] بيبدأ بالمسار اللي الموقع فتح عليه، ومش بيتغير لوحده بعد كده.

## ٣. الـ effect

~~~text
useEffect(() => {
  if (prev.current === pathname) return;
  prev.current = pathname;
  ...
}, [pathname]);
~~~

- [[[pathname]]] في الآخر = الـ dependencies: الـ effect بيشتغل أول مرة، وبعدين بس لما [[pathname]] يتغير.
- [[if (prev.current === pathname) return;]]: [[===]] مقارنة. لو المسار زي آخر واحد، اخرج من غير ما تعمل حاجة. وده بيحصل في حالتين: أول تحميل للموقع، والتشغيل التاني اللي [[StrictMode]] بيعمله في الـ development.
- [[prev.current = pathname;]]: افتكر المسار الجديد.

## ٤. نقل الـ focus

~~~text
const h1 = document.querySelector('main h1');
if (!h1) return;
h1.tabIndex = -1;
h1.focus();
~~~

- [[document.querySelector('main h1')]]: أول [[h1]] جوه [[main]] (المسافة = «جوه»). لو مفيش بيرجّع [[null]].
- [[if (!h1) return;]]: [[!]] = «مش». لو ملقيناش عنوان، متعملش حاجة بدل ما الكود يقع.
- [[h1.tabIndex = -1]]: العنوان مش عنصر تفاعلي، فمبيقبلش focus. [[-1]] بتخليه يقبله من الكود، من غير ما يدخل ترتيب الـ Tab.
- [[h1.focus()]]: حط الـ focus عليه، وقارئ الشاشة بيقرا اللي عليه الـ focus.

## ٥. [[return null;]]

الـ component لازم يرجّع حاجة يرسمها، و [[null]] = ولا حاجة.

## ٦. مكانه والـ title

~~~text
// في الـ layout: <main><Outlet /></main><RouteFocus />
<title>المنتجات | متجر النور</title>
~~~

- [[<Outlet />]]: المكان اللي react-router بيحط فيه الصفحة الحالية جوه الـ layout.
- [[<RouteFocus />]] في الـ layout مش في الصفحة: الـ layout فاضل ثابت، فالـ ref بتاعه بيفتكر المسار القديم.
- [[<title>]] جوه الصفحة: React 19 بينقله للـ [[<head>]] لوحده.

---

## القياس

| | بعد التحميل | بعد Enter على «المنتجات» | الـ Tab الجاي |
|---|---|---|---|
| مع RouteFocus | الـ focus على الـ body | الـ focus على [[H1 المنتجات]] و [[tabindex="-1"]] | زرار «أول منتج» |
| من غيره | الـ focus على الـ body | الـ focus فاضل على [[A المنتجات]] (اللينك اللي في الـ nav) | زرار «أول منتج» |

وفي الحالتين [[document.title]] اتغير من «الرئيسية | متجر النور» لـ «المنتجات | متجر النور»، والـ URL بقى [[/products]]. يعني:

- أول تحميل: الـ focus متحركش (الـ [[prev]] شغال صح، ولينك التخطي هيفضل أول Tab).
- من غير RouteFocus: الـ focus فاضل على لينك الـ nav، فقارئ الشاشة مش هيقول إن حاجة اتغيرت. (هنا الـ Tab الجاي وصل للمحتوى بسرعة لأن «المنتجات» آخر لينك في الـ nav؛ في nav فيه 30 لينك كان هيعدّي عليهم كلهم.)
- مع RouteFocus: قارئ الشاشة بيقرا العنوان («المنتجات، heading level 1» في NVDA، حسب الـ docs).

## الخلاصة

| السطر | ليه |
|---|---|
| [[useRef(pathname)]] | أول تحميل ميتحسبش تنقل |
| [[if (prev.current === pathname) return]] | ولا تشغيل StrictMode التاني |
| [[querySelector('main h1')]] | العنوان الحقيقي للصفحة الجديدة |
| [[tabIndex = -1]] + [[focus()]] | قارئ الشاشة يقراه، والـ Tab يكمّل من المحتوى |
| في الـ layout | عشان الـ ref يفضل فاكر |
| [[<title>]] لكل صفحة | التاب، و announcer بتاع Next.js، والسجل |`,
          lines: [
            "hooks من React.",
            "الـ URL الحالي من React Router (v7 بيتعمله import من react-router).",
            "مكون بيتحط مرة واحدة في الـ layout ومبيرسمش حاجة.",
            "المسار الحالي: بيتغير مع كل تنقل.",
            "آخر مسار شفناه، وبيبدأ بالحالي عشان أول تحميل ميتحسبش تنقل.",
            "بعد كل render...",
            "...لو المسار متغيرش (أول تحميل، أو تشغيل StrictMode التاني) متعملش حاجة.",
            "سجّل المسار الجديد.",
            "العنوان الرئيسي للصفحة الجديدة.",
            "مفيش؟ اخرج.",
            "خليه يقبل focus من الكود من غير ما يدخل الـ Tab.",
            "حط الـ focus عليه، فقارئ الشاشة يقول «المنتجات، heading level 1».",
            "بيتنفذ لما المسار يتغير بس.",
            "مبيرسمش حاجة.",
            "قفلة.",
            R`عنوان كل صفحة: React 19 بينقل [[<title>]] للـ head لوحده، فالتاب وقارئ الشاشة يعرفوا الصفحة.`
          ],
          sol: R`من غير RouteFocus: لما تدوس لينك في الـ nav، NVDA أو VoiceOver ممكن ميقولوش حاجة خالص، أو يقروا اللينك تاني، والـ Tab اللي بعده بيكمّل في الـ nav. مع RouteFocus: بتسمع «المنتجات، heading level 1» على طول، والـ Tab اللي بعده بيروح لأول حاجة في المحتوى الجديد، وعنوان التاب بقى «المنتجات | متجر النور».

جربناه في اختبار (Vitest و React Testing Library و MemoryRouter جوه StrictMode): أول ما الصفحة تفتح الـ focus فاضل على الـ body، وبعد الضغط على «المنتجات» الـ focus على الـ h1 و [[document.title]] اتغير.

في Next.js من غير title: الـ announcer بيقرا أول [[<h1>]]، ولو مفيش بيقرا المسار. ولو كل الصفحات ورثت نفس الـ title من الـ layout، هيقول نفس الاسم في كل صفحة.

الغلط الشائع: تحط المكون جوه كل صفحة بدل الـ layout، فمبيحصلش أي حاجة (كل صفحة بتعمل نسخة جديدة والـ ref بيبدأ بالمسار الجديد).`
        }
      ]
    }
]);
