// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الثيم والعربي والخطوط والأيقونات",
      l: 2,
      n: "dark mode من غير وميض، ومكونات بتتقلب لوحدها في العربي، وخط بيتحمّل صح، وأيقونات ليها اسم",
      items: [
        {
          cmd: "dark mode",
          title: "وضع غامق بزرار ومن غير وميض",
          desc: R`في Tailwind v4 الـ [[dark:]] افتراضيًا بيتبع نظام التشغيل. عشان تخليه بزرار، غيّر الـ variant يبقى على كلاس: [[@custom-variant dark (&:where(.dark, .dark *));]]، وبعدين [[<html class="dark">]] يقلب كل حاجة.

و [[next-themes]] في Next.js بيعمل الباقي: بيحط الكلاس، ويحفظ الاختيار في localStorage، ويتبع النظام لو المستخدم مختارش، ويشغّل script صغير قبل الرسم فمفيش وميض أبيض.`,
          example: R`// globals.css
@custom-variant dark (&:where(.dark, .dark *));
// app/layout.tsx
import { ThemeProvider } from "next-themes";
<html lang="ar" dir="rtl" suppressHydrationWarning>
  <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </body>
</html>
// theme-toggle.tsx ("use client")
const { resolvedTheme, setTheme } = useTheme();
<button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>غيّر الثيم</button>`,
          try: R`طبّق ده في مشروع Next، واختار dark واعمل refresh: مفيش وميض أبيض. وفي DevTools › Application › Local Storage شوف مفتاح [[theme]]. وبعدين امسح [[suppressHydrationWarning]] وشوف التحذير في الكونسول.`,
          flag: "script",
          deep: {
            why: "المستخدمين متوقعين dark mode، وأي موقع بيفتح أبيض ثانية وبعدين يغمق بيبان مكسور. المشكلة إن السيرفر مش عارف اختيار المستخدم (محفوظ في المتصفح)، فلازم حاجة تحط الكلاس قبل ما الصفحة تترسم.",
            how: R`[[@custom-variant dark (&:where(.dark, .dark *))]] بيغيّر معنى [[dark:bg-x]] لـ «لو العنصر نفسه أو جد ليه عليه [[.dark]]». و [[:where]] عشان الـ variant ميزودش specificity، فـ [[dark:bg-x]] يفضل بنفس وزن أي utility (كلاس واحد). ولو بتستخدم attribute: [[&:where([data-theme=dark], [data-theme=dark] *)]].

next-themes بيحقن [[<script>]] صغير في أول الصفحة بيتنفذ قبل الرسم: بيقرا localStorage (أو [[prefers-color-scheme]] لو system) ويحط الكلاس على html، وكمان [[color-scheme]] عشان الـ scrollbars وحقول الفورم تغمق هي كمان. بس السيرفر رسم html من غير الكلاس، فـ React هيلاقي فرق وقت الـ hydration، و [[suppressHydrationWarning]] بيسكّت التحذير ده على العنصر ده بس.

أي حاجة شكلها بيعتمد على الثيم في JavaScript (أيقونة شمس أو قمر) مش معروفة على السيرفر. فالمكون لازم يستنى لحد ما يتعمل mount: [[useEffect(() => setMounted(true), [])]]، وقبلها يعرض placeholder بنفس المقاس.

الطريقة الأنضف من [[dark:]] على كل عنصر: متغيرات. [[:root { --bg: white }]] و [[.dark { --bg: black }]] وتوكن [[--color-bg]] في [[@theme inline]]، فتكتب [[bg-bg]] بس وهو يتغير لوحده، ودا اللي shadcn بيعمله.

وفيه حل من غير script خالص: cookie فيها الثيم، والسيرفر يحط الكلاس في الـ HTML نفسه. في مشروع حقيقي كان كده: الـ layout بيقرا الـ cookie ويحط [[data-theme]] على html، فمفيش وميض ولا فرق hydration.`,
            when: R`أي موقع أو داشبورد. ولو الموقع landing بسيط، [[dark:]] الافتراضي اللي بيتبع النظام ممكن يكفي من غير زرار.`,
            mistakes: R`تنسى [[suppressHydrationWarning]]. تعرض أيقونة الثيم من غير mounted فتظهر غلط وبعدين تتقلب. تكتب [[darkMode: "class"]] في tailwind.config.js في مشروع v4 ومفيش حاجة بتحصل: v4 مش بيقرا الملف ده غير بـ [[@config]]. و [[dark:]] على كل عنصر في المشروع بدل متغيرات، فأي لون جديد يتنسي في وضع من الاتنين.`
          },
          teach: R`## كلاس على [[<html>]] بيقلب الصفحة كلها

الفكرة كلها: [[dark:]] يشتغل لما يبقى فيه كلاس [[dark]] فوق، و next-themes هو اللي بيحط الكلاس ده ويشيله ويفتكره. حطينا المثال في مشروع Next.js 16.4 (Tailwind 4.3.3، و next-themes 0.4.6)، وعملنا build وفتحناه في Chrome مرة والجهاز light ومرة dark (Playwright بيحاكي إعداد النظام).

---

## ١. [[globals.css]]: [[@custom-variant dark (&:where(.dark, .dark *));]]

- [[@custom-variant]]: أمر Tailwind v4 بيعرّف variant جديد (أو يغيّر واحد موجود). اسمه هنا [[dark]].
- [[&]]: العنصر اللي عليه الكلاس نفسه.
- [[:where(.dark, .dark *)]]: «العنصر لو عليه [[.dark]]، أو لو جوه حد عليه [[.dark]]». والمسافة قبل [[*]] = «جوه، في أي عمق».
- [[:where()]] specificity بتاعها صفر، فالكلاس يفضل بوزن كلاس واحد زي أي utility.

القاعدة اللي طلعت في الـ CSS:

~~~text من الـ CSS الناتج
.dark\:bg-gray-950:where(.dark,.dark *){background-color:var(--color-gray-950)}
~~~

ومن غير السطر ده، [[dark:]] في v4 بيتبع [[prefers-color-scheme]] بتاع الجهاز، والزرار مش هيأثر.

## ٢. [[app/layout.tsx]]

### [[import { ThemeProvider } from "next-themes";]]

package بيدير الثيم: يحط الكلاس، ويحفظ الاختيار، ويقرا إعداد الجهاز.

### [[<html lang="ar" dir="rtl" suppressHydrationWarning>]]

[[lang]] و [[dir]] للعربي. و [[suppressHydrationWarning]] هنتكلم عنه في الخطوة ٥.

### [[<body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">]]

لونين لكل حاجة: [[bg-white]] و [[text-gray-900]] في العادي، و [[dark:bg-gray-950]] و [[dark:text-gray-100]] لما [[.dark]] تبقى على html.

### [[<ThemeProvider ...>]]

| الـ prop | يعني |
|---|---|
| [[attribute="class"]] | حط الثيم ككلاس على html ([[class="dark"]]). البديل [[data-theme]] |
| [[defaultTheme="system"]] | لو المستخدم لسه مختارش، امشي على الجهاز |
| [[enableSystem]] | اسمح بـ [[system]] كاختيار |
| [[disableTransitionOnChange]] | وقف كل الـ transitions لحظة التبديل، عشان كل لون ميتحركش لوحده |

و [[{children}]] = الصفحة نفسها.

## ٣. [[theme-toggle.tsx]]

الملف لازم يبدأ بـ [["use client"]] لأن الزرار فيه [[onClick]] و hook، ودول بيشتغلوا في المتصفح بس.

- [[const { resolvedTheme, setTheme } = useTheme();]]: [[useTheme]] hook بيرجّع object، والـ [[{ }]] بتطلّع منه اتنين بأساميهم.
- [[resolvedTheme]]: الثيم الفعلي، [[light]] أو [[dark]]. حتى لو الاختيار [[system]]، ده بيقولك النتيجة.
- [[setTheme("dark")]]: يغيّر الثيم ويحفظه.
- [[resolvedTheme === "dark" ? "light" : "dark"]]: الـ [[? :]] اسمه ternary: «لو dark خليه light، وإلا خليه dark».

---

## ٤. اللي حصل في المتصفح

### الجهاز light، أول مرة

~~~text الناتج
html class   = "...variable light"
html style   = "color-scheme: light;"
localStorage theme = null
body background    = rgb(255, 255, 255)
~~~

([[...variable]] ده كلاس الخط من درس next/font، ملوش علاقة.) ومفيش [[theme]] في localStorage لأن المستخدم لسه مختارش، فالثيم جاي من الجهاز.

### ضغطنا الزرار

~~~text الناتج
html class   = "...variable dark"
html style   = "color-scheme: dark;"
localStorage theme = "dark"
body background    = lab(1.90334 0.278696 -5.48866)    ← gray-950
~~~

[[color-scheme: dark]] بيقول للمتصفح يغمّق حاجاته هو كمان: الـ scrollbar وحقول الفورم.

### refresh

الكلاس كان [[dark]] و [[color-scheme: dark]] **قبل** ما الصفحة تخلص تحميل (قسناه لحظة [[readyState = "interactive"]]، قبل ما React يشتغل). يعني مفيش لحظة بيضا.

### الجهاز dark، أول مرة

فتح [[dark]] لوحده من غير ما نضغط حاجة. ضغطنا الزرار: بقى [[light]] واتحفظ، ومع إن الجهاز لسه dark الخلفية بيضا. ده بالظبط شغل [[@custom-variant]]: [[dark:]] بقى بيسمع للكلاس مش للجهاز.

### إزاي مفيش وميض؟

الـ HTML اللي جاي من السيرفر:

~~~text الناتج
<html lang="ar" dir="rtl" class="pW5XIG_variable">
<body class="..."><div hidden=""></div><script>(...)("class","theme","system",null,["light","dark"],null,true,true)</script>
~~~

السيرفر مش عارف اختيارك، فبعت html **من غير** dark. بس أول حاجة في الـ body [[<script>]] صغير بيتنفّذ قبل ما أي حاجة تترسم: بيقرا [[localStorage.getItem("theme")]]، ولو مفيش أو [[system]] بيسأل [[matchMedia("(prefers-color-scheme: dark)")]]، ويحط الكلاس والـ [[color-scheme]] على html.

## ٥. [[suppressHydrationWarning]]

React لما بيشتغل في المتصفح (hydration) بيقارن الـ HTML اللي جه من السيرفر باللي هو كان هيرسمه. والـ script غيّر html قبله. شلنا الـ prop وشغّلنا [[next dev]] والجهاز dark:

~~~text الـ Console
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
  <html
    lang="ar"
    dir="rtl"
+   className="cairo_..._variable"
-   className="cairo_..._variable dark"
-   style={{color-scheme:"dark"}}
  >
~~~

[[+]] = اللي React متوقعه، و [[-]] = اللي لقاه فعلًا. الفرق في [[className]] و [[style]] بتوع html بس، ودول متوقعين. رجّعنا الـ prop: الخطأ اختفى. وهو بيسكّت html نفسه بس، مش اللي جواه.

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[@custom-variant dark (...)]] | [[dark:]] يسمع للكلاس مش للجهاز |
| [[attribute="class"]] | next-themes يحط [[class="dark"]] على html |
| [[defaultTheme="system"]] + [[enableSystem]] | من غير اختيار: زي الجهاز |
| الـ script في أول الـ body | يحط الكلاس قبل الرسم، فمفيش وميض |
| [[localStorage.theme]] | الاختيار المحفوظ |
| [[suppressHydrationWarning]] | يسكّت فرق html المتوقع |
| [[resolvedTheme]] | الثيم الفعلي للزرار |`,
          lines: [
            R`[[dark:]] يشتغل لما [[.dark]] تبقى على العنصر أو أي جد ليه، بدل ما يتبع النظام.`,
            "المكتبة.",
            R`[[suppressHydrationWarning]] لأن next-themes هيحط كلاس على html قبل React، فالسيرفر والمتصفح هيختلفوا في الحتة دي بس.`,
            "ألوان الوضعين.",
            R`[[attribute="class"]] يحط [[.dark]]، والافتراضي النظام، و [[disableTransitionOnChange]] يمنع كل الـ transitions تشتغل مع بعض وقت التبديل.`,
            "الصفحة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`[[resolvedTheme]] = الثيم الفعلي (لو system بيقولك light ولا dark).`,
            "زرار بيقلب."
          ],
          sol: R`بعد ما تختار dark وتعمل refresh: الصفحة بتفتح غامقة من أول frame، من غير ولا لمحة بيضا. لو فتحت Elements هتلاقي على [[<html>]] ‏[[class="dark"]] ومعاها [[style="color-scheme: dark;"]]، ودول اتحطوا بـ script صغير next-themes بيحطه قبل ما الصفحة تترسم. وفي Application › Local Storage هتلاقي مفتاح [[theme]] وقيمته [[dark]] (أو [[light]]، ولو لسه مختارتش هتلاقيه مش موجود أو [[system]]).

لما تمسح [[suppressHydrationWarning]] وتعمل refresh وانت على dark: في الـ Console خطأ hydration من React بيقول إن attributes الـ HTML اللي جاي من السيرفر مش زي اللي على العميل، وهتلاقي فيه [[class]] و [[style]] بتوع الـ html. ده لأن السيرفر بعت html من غير class، والـ script غيّرها قبل React. الـ prop ده بيسكّت التحذير للعنصر ده بس، مش لأولاده.

لو لسه فيه وميض أبيض: اتأكد إن [[@custom-variant dark]] مكتوب (من غيره [[dark:]] بيشتغل على ثيم الجهاز مش على الكلاس)، وإن [[attribute="class"]] على الـ provider. ولو الزرار مش بيعمل حاجة أول مرة، غالبًا بتقرا [[theme]] (اللي ممكن يبقى [[system]]) بدل [[resolvedTheme]].`
        },
        {
          cmd: "logical properties",
          title: "مكون واحد يشتغل عربي وإنجليزي من غير rtl: في كل حتة",
          desc: R`بدل [[left]] و [[right]] استخدم start و end: [[ms-4]] (margin-inline-start) بدل [[ml-4]]، و [[pe-2]] بدل [[pr-2]]، و [[text-start]] بدل [[text-left]]، و [[inset-s-0]] بدل [[left-0]]، و [[rounded-s-lg]] و [[border-e]]. دول بيتقلبوا لوحدهم مع [[dir]].

والحاجات اللي ليها اتجاه (سهم «التالي»، أيقونة رجوع) اقلبها بـ [[rtl:-scale-x-100]]. أما أيقونة زي البحث أو الساعة فسيبها.`,
          example: R`<div className="flex items-center gap-3 ps-4 pe-2">
  <img className="size-10 rounded-full" src="/u.jpg" alt="" />
  <p className="text-start">محمد</p>
  <span className="ms-auto">من 5 دقايق</span>
</div>
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
<aside className="border-e ps-6">...</aside>
<span className="absolute top-2 inset-e-2">جديد</span>
<span dir="ltr">+20 100 000 0000</span>`,
          try: R`اعمل المكون ده وقلّب [[dir]] على html بين rtl و ltr: كل حاجة هتتقلب صح. بعدين غيّر [[ms-auto]] لـ [[ml-auto]] وشوف الوقت لزق في الناحية الغلط في العربي.`,
          flag: "script",
          deep: {
            why: R`موقع عربي وإنجليزي بـ left و right معناه نسختين من كل مكون، أو [[rtl:]] على كل عنصر. الـ logical properties بتخلي الكود يوصف «البداية والنهاية» مش «الشمال واليمين»، والمتصفح يحوّلهم حسب اتجاه الصفحة.`,
            how: R`في CSS: [[margin-inline-start]] و [[padding-inline-end]] و [[inset-inline-start]] و [[border-inline-end]] و [[text-align: start]]. الـ inline = اتجاه الكتابة (أفقي في العربي والإنجليزي)، والـ block = الاتجاه العمودي عليه (فوق وتحت). فـ [[margin-block]] = فوق وتحت، و [[padding-inline]] = الجنبين.

في Tailwind: [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] و [[inset-s-*]] و [[inset-e-*]] و [[rounded-s-*]] و [[rounded-e-*]] و [[border-s]] و [[border-e]] و [[text-start]] و [[text-end]]. و [[mx-*]] و [[px-*]] أصلًا متماثلين فمش فارقين. ([[start-*]] و [[end-*]] للـ position بقوا deprecated من v4.2 لصالح [[inset-s-*]] و [[inset-e-*]].)

اللي مش بيتقلب لوحده: [[translate-x]] (الرقم الموجب دايمًا يمين)، و [[rotate]]، والـ gradients ([[bg-linear-to-r]])، والظل اللي ليه إزاحة أفقية، و [[background-position]]. دول محتاجين [[rtl:]]: [[rtl:-translate-x-1]] أو [[rtl:bg-linear-to-l]].

الأيقونات: اللي معناها اتجاه (أسهم التالي والسابق، ورجوع، وإرسال، والـ chevrons في الـ breadcrumb) بتتقلب. واللي بتمثل حاجة حقيقية (ساعة، وبحث، و play في مشغل فيديو، وعلامة صح) متتقلبش. في مشروع حقيقي أيقونات الأسهم كلها كانت [[rtl:-scale-x-100]]، والحركة عند الـ hover [[rtl:group-hover:-translate-x-1]]، والأرقام والأوقات عليها [[dir="ltr"]]. و shadcn فيه [[--rtl]] بيحوّل مكوناته لـ logical لوحده.`,
            when: "أي مشروع ممكن يبقى فيه عربي، حتى لو دلوقتي إنجليزي بس. عوّد إيدك على ms و pe من الأول، مفيش أي تكلفة.",
            mistakes: R`[[ml-2]] للمسافة بين أيقونة وكلام، وفي العربي الأيقونة تلزق في الكلام والمسافة تروح الناحية التانية (أحسن [[gap-2]] على الأب). تقلب كل الأيقونات فالساعة تلف بالعكس. و [[translate-x]] في animation أو toggle من غير [[rtl:]]. وساعات الحل المقبول [[dir="ltr"]] على العنصر ده بس، لو شكله مش مرتبط باللغة.`
          },
          teach: R`## «البداية» و «النهاية» بدل «شمال» و «يمين»

كل كلاس في المثال بيقول «من ناحية البداية» أو «من ناحية النهاية»، والمتصفح بيعرف البداية فين من [[dir]]: في [[rtl]] البداية يمين، وفي [[ltr]] شمال. حطينا المثال في صفحة Vite (Tailwind 4.3.3) جوه صندوق عرضه 600 و [[relative]]، و [[ArrowRight]] من lucide-react، وقسنا كل حاجة في Chrome مرة بـ [[dir="rtl"]] على html ومرة [[ltr]]. الأرقام تحت مكان العنصر من الطرف الشمال للصندوق (من - لـ).

---

## ١. الكلاسات بتطلّع إيه في CSS

~~~text من الـ CSS الناتج
.ps-4{padding-inline-start:calc(var(--spacing) * 4)}
.pe-2{padding-inline-end:calc(var(--spacing) * 2)}
.ms-auto{margin-inline-start:auto}
.ml-auto{margin-left:auto}
.text-start{text-align:start}
.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}
.inset-e-2{inset-inline-end:calc(var(--spacing) * 2)}
~~~

- **inline** = اتجاه السطر (الجنبين). و **block** = فوق وتحت.
- [[s]] = start (البداية)، و [[e]] = end (النهاية).
- [[ml-auto]] الوحيد اللي فيه [[left]] صريحة، فمش بيتقلب.

## ٢. الصف: [[<div className="flex items-center gap-3 ps-4 pe-2">]]

- [[flex items-center]]: العناصر جنب بعض ومتوسّطين رأسيًا. والـ flex نفسه بيمشي مع [[dir]]: أول عنصر عند البداية.
- [[gap-3]]: 12px بين كل عنصرين، من غير ما تحدد ناحية.
- [[ps-4]] و [[pe-2]]: 16px من البداية و 8px من النهاية.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[padding-right]] | 16px | 8px |
| [[padding-left]] | 8px | 16px |

## ٣. الصورة والاسم والوقت

~~~text App.tsx
<img className="size-10 rounded-full" src="/u.jpg" alt="" />
<p className="text-start">محمد</p>
<span className="ms-auto">من 5 دقايق</span>
~~~

- [[size-10]]: 40×40px. و [[rounded-full]]: دايرة. و [[alt=""]]: صورة للزينة، قارئ الشاشة يتجاهلها.
- [[text-start]]: الكلام على ناحية البداية. القيمة المحسوبة فضلت [[start]] في الحالتين، والمتصفح بيترجمها.
- [[ms-auto]]: margin من ناحية البداية بـ [[auto]]. في الـ flex الـ [[auto]] بياكل كل المساحة الفاضية، فبيزق العنصر لآخر الصف.

| العنصر | [[rtl]] | [[ltr]] |
|---|---|---|
| الصورة | 543 - 583 (يمين) | 17 - 57 (شمال) |
| «محمد» | 495 - 531 | 69 - 105 |
| الوقت بـ [[ms-auto]] | **9 - 84** (أقصى الشمال) | 516 - 591 (أقصى اليمين) |
| الوقت بـ [[ml-auto]] | **460 - 535** (لازق في الاسم) | 516 - 591 |

السطر الأخير هو الغلطة: [[ml-auto]] في [[ltr]] بيدّي نفس النتيجة بالظبط، فاللي بيجرّب بالإنجليزي بس مش هيشوف المشكلة. في [[rtl]] الـ margin الشمال زق الوقت يمين ناحية الاسم.

## ٤. زرار التالي: [[rtl:-scale-x-100]]

~~~text App.tsx
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
~~~

- [[ArrowRight]]: سهم بيشاور يمين، يعني «لقدام» في الإنجليزي.
- [[-scale-x-100]]: [[scale-x]] = تكبير على المحور الأفقي، و [[100]] = 100٪، والسالب = اعكسه مراية.
- [[rtl:]]: بس لما الصفحة RTL.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[scale]] المحسوب | [[-1 1]] (معكوس، بيشاور شمال) | [[none]] |

والـ selector اللي طلع في Tailwind 4.3.3:

~~~text من الـ CSS الناتج
.rtl\:-scale-x-100:where(:is(:lang(ar),:lang(he),:lang(fa),...),[dir=rtl],[dir=rtl] *){...}
~~~

يعني [[rtl:]] بيشتغل لو العنصر جوه [[dir="rtl"]] **أو** جوه [[lang]] لغة بتتكتب من اليمين (عربي، عبري، فارسي...). عشان كده خلي [[lang]] و [[dir]] على html متفقين.

## ٥. [[<aside className="border-e ps-6">]]

خط فاصل على ناحية النهاية، و 24px padding من البداية:

| | [[rtl]] | [[ltr]] |
|---|---|---|
| border شمال / يمين | 1px / 0 | 0 / 1px |
| padding شمال / يمين | 0 / 24px | 24px / 0 |

## ٦. الشارة: [[absolute top-2 inset-e-2]]

- [[absolute]]: مكانها محسوب من أقرب أب [[relative]] (الصندوق).
- [[top-2]]: 8px من فوق.
- [[inset-e-2]]: 8px من ناحية النهاية ([[inset-inline-end]]).

| | [[rtl]] | [[ltr]] |
|---|---|---|
| مكانها | 9 - 40 (الركن الشمال) | 560 - 591 (الركن اليمين) |
| [[left]] المحسوب | 8px | 559.266px |
| [[right]] المحسوب | 559.266px | 8px |

## ٧. [[<span dir="ltr">+20 100 000 0000</span>]]

جربنا نفس الرقم جوه سطر عربي مرتين، وقرينا ترتيب الحروف على الشاشة من الشمال لليمين:

~~~text الناتج
من غير dir:    0000 000 100 20+
dir="ltr":     +20 100 000 0000
~~~

من غير [[dir]]، المتصفح اعتبر كل مجموعة أرقام حتة لوحدها في سطر RTL، فرتّبهم من اليمين للشمال والـ [[+]] راحت للآخر. [[dir="ltr"]] على العنصر ده بس بيخليه يتكتب شمال ليمين صح.

## الخلاصة

| بدل | استخدم | CSS |
|---|---|---|
| [[ml-*]] / [[mr-*]] | [[ms-*]] / [[me-*]] | [[margin-inline-start/end]] |
| [[pl-*]] / [[pr-*]] | [[ps-*]] / [[pe-*]] | [[padding-inline-start/end]] |
| [[left-*]] / [[right-*]] | [[inset-s-*]] / [[inset-e-*]] | [[inset-inline-start/end]] |
| [[border-l]] / [[border-r]] | [[border-s]] / [[border-e]] | [[border-inline-start/end]] |
| [[text-left]] / [[text-right]] | [[text-start]] / [[text-end]] | [[text-align: start/end]] |

- الأيقونات اللي معناها اتجاه: [[rtl:-scale-x-100]].
- جرّب دايمًا في الاتجاهين، لأن الغلط مش بيبان في [[ltr]].`,
          lines: [
            "padding من البداية 16 ومن النهاية 8. في العربي البداية يمين.",
            "الصورة.",
            "الكلام محاذي للبداية مهما كانت اللغة.",
            R`[[ms-auto]] يزق الوقت لآخر الصف: شمال في العربي، يمين في الإنجليزي.`,
            "قفلة.",
            "زرار التالي.",
            R`السهم لليمين في الإنجليزي، و [[rtl:-scale-x-100]] يقلبه مراية في العربي.`,
            "قفلة.",
            "خط فاصل على ناحية النهاية، و padding من البداية.",
            R`شارة في ركن النهاية فوق. [[inset-e-2]] من v4.2 بدل [[end-2]].`,
            "رقم التليفون LTR جوه صفحة عربي."
          ],
          sol: R`مع [[dir="rtl"]]: الصورة على اليمين وجنبها «محمد»، و «من 5 دقايق» لازقة في أقصى الشمال، والـ padding الأكبر (16px) ناحية اليمين، وسهم «التالي» معكوس بيشاور شمال، والـ border بتاع الـ aside على الشمال، والشارة «جديد» في الركن الشمال فوق. قلّب لـ [[ltr]]: كل ده اتعكس (الصورة شمال، والوقت أقصى اليمين، والسهم يمين)، من غير ولا [[rtl:]] ولا سطر زيادة. رقم التليفون بيفضل [[+20 100 000 0000]] في الحالتين.

بعد ما تغيّر [[ms-auto]] لـ [[ml-auto]] في العربي: «من 5 دقايق» بقت لازقة في «محمد» والفراغ كله راح على الطرف الشمال. قست ده في صفحة عرضها 600: مع [[ms-auto]] الوقت كان من 8 لـ 82px (أقصى الشمال)، ومع [[ml-auto]] بقى من 409 لـ 483 جنب الاسم. لأن [[ml-auto]] = [[margin-left]] دايمًا، والوقت في rtl آخر عنصر وعلى الشمال أصلًا، فالـ margin زقّه لليمين ناحية الاسم. في الـ ltr التغيير مش هيبان لأن start = left، وده بالظبط ليه الغلط ده بيعدّي على اللي بيجرّب بالإنجليزي بس.`
        },
        {
          cmd: "next/font",
          title: "خط عربي بيتحمّل بسرعة ومن غير ما الصفحة تتنط",
          desc: R`[[next/font/google]] بينزّل الخط وقت الـ build ويخدمه من موقعك (مفيش request لجوجل)، وبيعمل خط احتياطي مقاساته مظبوطة فالكلام ميتنطش لما الخط الحقيقي يوصل. و [[variable]] بيطلّعه كمتغير CSS تربطه بـ Tailwind.

برا Next بتكتب [[@font-face]] بنفسك: ملف [[woff2]] من موقعك، و [[font-display: swap]] عشان الكلام يظهر بخط النظام لحد ما خطك يتحمّل.`,
          example: R`// app/layout.tsx
import { Cairo } from "next/font/google";
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
<html lang="ar" dir="rtl" className={cairo.variable}>
// globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
// من غير Next
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}`,
          try: R`حط Cairo بـ next/font، وافتح Network وفلتر على Font: هتلاقي ملف woff2 جاي من [[/_next/static/media]] مش من جوجل. وبعدين بطّأ النت (Slow 4G) واعمل refresh وشوف الكلام بيظهر بخط النظام وبعدين يتبدّل.`,
          flag: "script",
          deep: {
            why: "الخط تقل خفي: ملف أو اتنين، وكل واحد عشرات الـ KB، ولو جاي من سيرفر تاني بعد ما الـ CSS يتحمّل بيتأخر أكتر. والصفحة يا إما تفضل من غير كلام، يا إما الكلام يظهر بخط وبعدين يتبدّل ويتنط لأن المقاسات مختلفة (CLS).",
            how: R`[[font-display]] بيحدد المتصفح يعمل إيه لحد ما الخط يوصل: [[block]] يخفي الكلام شوية، و [[swap]] يعرضه بالخط الاحتياطي على طول ويبدّل أول ما يوصل، و [[optional]] يستنى لحظة، ولو الخط موصلش يكمّل بالاحتياطي في الصفحة دي (مفيش تبديل خالص). next/font الافتراضي swap.

مشكلة swap: الخط الاحتياطي (Arial مثلًا) عرض حروفه وارتفاع سطوره مختلف، فلما يتبدّل الفقرات بتطول أو تقصر والصفحة تتنط. next/font بيحل ده بـ [[adjustFontFallback]] (شغال افتراضيًا): بيعمل [[@font-face]] للخط الاحتياطي بـ [[size-adjust]] وقيم محسوبة، بحيث يبقى قد خطك تقريبًا.

[[subsets]] بيحدد أنهي subsets يتعملها preload. الباقي بيتخدم من موقعك برضه، والمتصفح بيحمّله بس لو الصفحة فيها حروف منه (unicode-range). والـ variable fonts ملف واحد لكل الأوزان بدل ملف لكل وزن. و [[--font-sans]] في Tailwind هو الخط الافتراضي للصفحة كلها (الـ Preflight بيحطه على html)، فتغييره بيغيّر الموقع كله.

و [[@import url(...)]] لخط من سيرفر خارجي جوه ملف الـ CSS أسوأ حالة: المتصفح لازم يحمّل الـ CSS بتاعك، ويلاقي الـ import، ويحمّل CSS الخط، ويلاقي ملف الخط، ويحمّله. سلسلة requests واحد ورا التاني.`,
            when: R`في Next دايمًا next/font. في Vite أو PHP: [[@font-face]] بملفات woff2 عندك، و [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للخط الأساسي بس.`,
            mistakes: R`في مشروع حقيقي كان globals.css بيبدأ بـ [[@import url("https://fonts.example.com/...")]] لخط لاتيني جنب خطوط next/font: request خارجي بيوقف الرسم، وكان ممكن يتنقل لـ [[next/font/local]]. وتحمّل 6 أوزان وانت بتستخدم 2. وتنسى subset الـ [[arabic]] فملف العربي ميتعملوش preload: الكلام يظهر بخط النظام الأول ويتبدّل متأخر (الملف بيتحمّل من موقعك برضه، بس بعد ما المتصفح يكتشف إنه محتاجه).`
          },
          teach: R`## الخط بقى ملف من موقعك

[[next/font]] بينزّل الخط من Google **وقت الـ build**، ويحطه جوه مشروعك، ويكتب الـ [[@font-face]] لوحده. والمستخدم بياخد الخط من سيرفرك انت. حطينا الجزء الأول في مشروع Next.js 16.4 (Tailwind 4.3.3) وعملنا build وفتحناه في Chrome، والجزء التاني ([[@font-face]] بإيدك) في صفحة Vite.

---

## ١. [[import { Cairo } from "next/font/google";]]

كل خط في Google Fonts ليه function بنفس اسمه. ولو الاسم فيه مسافة بتبقى [[_]]: [[Noto_Kufi_Arabic]].

## ٢. [[const cairo = Cairo({ ... });]]

| الخيار | يعني |
|---|---|
| [[subsets: ["arabic", "latin"]]] | أنهي أجزاء من الخط يتعملها preload (تحت) |
| [[variable: "--font-cairo"]] | اعمل متغير CSS بالاسم ده فيه اسم الخط |
| [[display: "swap"]] | [[font-display: swap]]: اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل |

Cairo خط **variable**: ملف واحد فيه كل الأوزان، فمش محتاج [[weight]]. وده باين في الـ CSS اللي اتولّد: [[font-weight:200 1000]].

## ٣. [[<html lang="ar" dir="rtl" className={cairo.variable}>]]

[[cairo.variable]] اسم كلاس اتولّد وقت الـ build. في الـ HTML طلع [[class="pW5XIG_variable"]]، والـ CSS بتاعه:

~~~text من الـ CSS الناتج
.pW5XIG_variable{--font-cairo:"Cairo", "Cairo Fallback"}
~~~

يعني الكلاس ده بس بيعرّف المتغير على html، ومش بيغيّر أي خط لوحده.

## ٤. [[globals.css]]: [[@theme inline]]

~~~text globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
~~~

- [[--font-sans]] هو الخط الافتراضي في Tailwind، والـ Preflight بيحطه على [[html]]، فالموقع كله بياخده.
- [[var(--font-cairo)]]: هات قيمة المتغير اللي next/font عمله.
- [[system-ui, sans-serif]]: لو مفيش، خط النظام.
- [[inline]]: Tailwind يحط القيمة نفسها مكان ما بتتستخدم بدل [[var(--font-sans)]]. في الـ CSS الناتج لقينا [[--default-font-family:var(--font-cairo), system-ui, sans-serif]]، ومفيش [[--font-sans]] خالص. ده المطلوب لما قيمة في الـ theme بتشاور على متغير تاني: المتغير يتقري في مكان الاستخدام.

والنتيجة المحسوبة على الفقرة:

~~~text getComputedStyle
font-family: Cairo, "Cairo Fallback", system-ui, sans-serif
~~~

## ٥. اللي حصل وقت الـ build

next/font كتب 4 [[@font-face]]. ٣ لـ Cairo، كل واحد لجزء من الحروف، وواحد للخط الاحتياطي:

| الملف | الحروف ([[unicode-range]]) | preload |
|---|---|---|
| [[9ff27b8a0a8f3dc0-s.p....woff2]] | العربي ([[U+6??]]...) | أيوه |
| [[d41831e24743a3c1-s.p....woff2]] | اللاتيني الأساسي ([[U+??]]...) | أيوه |
| [[a5b03b231ce290a0-s....woff2]] | latin-ext (حروف أوروبية زيادة) | لأ |

- [[unicode-range]]: المتصفح بيحمّل الملف بس لو الصفحة فيها حروف من المدى ده.
- الـ [[.p.]] في الاسم = عليه [[<link rel="preload">]] في الـ head. اللي في [[subsets]] بس هما اللي اتعملهم preload.

والخط الاحتياطي:

~~~text من الـ CSS الناتج
@font-face{font-family:Cairo Fallback;src:local(Arial);ascent-override:137.65%;descent-override:60.32%;line-gap-override:0.0%;size-adjust:94.66%}
~~~

ده Arial اللي على الجهاز ([[local(Arial)]])، بس متعدّل: [[size-adjust:94.66%]] بيصغّر حروفه، و [[ascent-override]] و [[descent-override]] بيظبطوا ارتفاع السطر، عشان مقاساته تبقى قريبة من Cairo. فلما Cairo يوصل ويتبدّل، الكلام ميتنطش.

## ٦. في Chrome

~~~text الـ Network (نوع font)
/_next/static/media/9ff27b8a0a8f3dc0-s.p.40_3w74kn95bo.woff2
/_next/static/media/d41831e24743a3c1-s.p.08tn9snzkmifr.woff2
~~~

- ملفين بس اتحمّلوا: العربي واللاتيني، لأن الصفحة فيها عربي وكلمة Hello. الـ latin-ext متحمّلش.
- الاتنين من [[localhost]]، ومفيش ولا request لـ [[fonts.googleapis.com]] أو [[fonts.gstatic.com]].
- في الـ head لقينا [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للملفين دول.
- Chrome قال إن الكلام اترسم فعلًا بخط [[Cairo]] (custom).

---

## ٧. من غير Next: [[@font-face]] بإيدك

~~~text globals.css
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}
~~~

- [[font-family: "Cairo"]]: الاسم اللي هتكتبه بعدين في [[font-family]]. انت اللي بتختاره.
- [[src: url(...) format("woff2")]]: الملف من موقعك، و [[woff2]] أصغر صيغة خطوط.
- [[font-weight: 200 1000]]: الملف ده بيغطي كل الأوزان من 200 لـ 1000 (variable).
- [[font-display: swap]]: نفس الكلام اللي فوق.

جربناه في صفحة Vite، وأخّرنا ملف الخط ثانيتين عمدًا:

| الوقت | الخط اللي اترسم بيه الكلام | حالة الخط |
|---|---|---|
| 208ms | Segoe UI (خط ويندوز) | [[loading]] |
| 2340ms | Cairo | [[loaded]] |

يعني الكلام ظهر على طول بخط النظام، واتبدّل لما Cairo وصل. ده [[swap]]. بس هنا مفيش [[Cairo Fallback]] متظبط، فلو المقاسات مختلفة الكلام ممكن يتنط وقت التبديل، وده اللي next/font بيحله لوحده.

## الخلاصة

| | next/font | [[@font-face]] بإيدك |
|---|---|---|
| الملف | بينزل وقت الـ build ويتخدم من موقعك | انت بتحطه في [[public/fonts]] |
| preload | لوحده للـ [[subsets]] | [[<link rel="preload">]] بإيدك |
| خط احتياطي متظبط | لوحده ([[size-adjust]]) | مش موجود إلا لو كتبته |
| الربط بـ Tailwind | [[variable]] + [[--font-sans]] | [[--font-sans: "Cairo", ...]] |

- متنساش [[arabic]] في [[subsets]]، وإلا ملف العربي ميتعملوش preload.
- مفيش [[<link>]] لـ Google Fonts ولا [[@import url(...)]].`,
          lines: [
            R`أي خط من Google Fonts كـ function (المسافة في الاسم بتبقى [[_]]).`,
            R`الـ subsets اللي هيتعملها preload (العربي واللاتيني)، والباقي بيتخدم من موقعك برضه بس مش بيتحمّل غير لو اتستخدم. ومتغير CSS اسمه [[--font-cairo]]. Cairo خط variable فمش محتاج weights.`,
            "الكلاس بيعرّف المتغير على html.",
            R`Tailwind: [[font-sans]] يبقى Cairo.`,
            "Cairo الأول، ولو محمّلش خط النظام.",
            R`قفلة. [[inline]] لأنه بيشاور على متغير.`,
            "برا Next: تعريف الخط بإيدك.",
            R`الاسم اللي هتستخدمه في [[font-family]].`,
            "ملف woff2 من موقعك (أصغر صيغة).",
            "ملف variable واحد فيه كل الأوزان من 200 لـ 1000.",
            "اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل.",
            "قفلة."
          ],
          sol: R`في Network بفلتر Font: هتلاقي ملف أو اتنين [[.woff2]] بأسماء فيها hash زي [[/_next/static/media/xxxxxxxx-s.p.woff2]]، والدومين هو دومين موقعك (localhost:3000)، ومفيش ولا request لـ [[fonts.googleapis.com]] ولا [[fonts.gstatic.com]]. Next نزّل الخط وقت الـ build وبيقدّمه من عندك. والـ [[.p.]] في الاسم معناها إن عليه preload في الـ head.

مع Slow 4G وrefresh: الكلام بيظهر الأول بخط النظام وبعد ثانية أو اتنين بيتبدّل لـ Cairo (ده الـ [[swap]]). والنطّة وقت التبديل صغيرة جدًا، لأن next/font بيعمل خط fallback اسمه زي [[Cairo Fallback]] معدّل بـ [[size-adjust]] عشان مقاساته تبقى قريبة من Cairo. هتلاقيه في Computed › font-family.

لو لقيت request لجوجل، يبقى فيه [[<link>]] لـ Google Fonts لسه في الـ layout أو [[@import url(...)]] في الـ CSS، امسحهم. ولو الخط متطبقش خالص، غالبًا [[--font-sans]] مش بيقرا [[var(--font-cairo)]] أو الـ [[className={cairo.variable}]] مش على [[<html>]].`
        },
        {
          cmd: "lucide-react",
          title: "أيقونات SVG كمكونات React",
          desc: R`في [[lucide-react]] كل أيقونة مكون: [[<Search />]] و [[<Menu />]] و [[<ChevronLeft />]]. بتستورد اللي محتاجه بس، والباقي مش بيدخل الـ bundle. الحجم بـ [[size-4]]، واللون بياخد [[currentColor]] فبيمشي مع [[text-*]].

ومن v1 الأيقونات عليها [[aria-hidden]] افتراضيًا، فلو الزرار أيقونة بس، لازم تدّي الزرار نفسه اسم بـ [[aria-label]].`,
          example: R`import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />
<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />`,
          try: R`اعمل زرار أيقونة بس من غير [[aria-label]] وافتح DevTools › Elements › Accessibility: اسمه فاضي. ضيف الـ label وشوف الاسم ظهر. وبعدين غيّر [[text-brand]] لـ [[text-red-600]] وشوف الأيقونة اتغيرت معاه.`,
          flag: "script",
          deep: {
            why: "الأيقونات كصور PNG بتتشوّه لما تكبر ومش بتاخد لون الكلام. وكـ font icons بتحمّل الخط كله عشان 10 أيقونات، وقارئ الشاشة ساعات يقرا حروف غريبة. SVG inline كمكون بيحل الاتنين: حاد في أي حجم، ولونه [[currentColor]]، وبتحمّل اللي بتستخدمه بس.",
            how: R`كل مكون بيرسم [[<svg>]] بـ [[viewBox="0 0 24 24"]] و [[stroke="currentColor"]] و [[fill="none"]]. [[currentColor]] معناها «لون الكلام بتاع العنصر»، فـ [[text-*]] على الأيقونة أو أي أب ليها بيلوّنها. والحجم الافتراضي 24، و [[size-4]] بيغلبه من الـ CSS.

[[strokeWidth]] بيغيّر سُمك الخط، وبيكبر مع الأيقونة. و [[absoluteStrokeWidth]] بيخليه ثابت بالبكسل مهما الأيقونة كبرت.

Tree-shaking: [[import { Search } from "lucide-react"]] مع bundler حديث بيدخّل Search بس. بس لو عملت [[import * as Icons]] واخترت بالاسم وقت التشغيل، الـ bundler مش هيعرف ويدخّل الكل (آلاف الأيقونات).

lucide v1 (2026): شال أيقونات البراندات (GitHub وفيسبوك وغيرهم)، وشال أسماء قديمة كانت متسابة كـ aliases (فلو import مش لاقي أيقونة دوّر على اسمها الجديد)، وبقى بيحط [[aria-hidden="true"]] على الأيقونات لوحده. ولو محتاج شعارات: Simple Icons أو SVG من البراند نفسه.`,
            when: "أي أيقونة UI في React. و shadcn بيستخدمه افتراضيًا.",
            mistakes: R`زرار أيقونة من غير اسم: قارئ الشاشة يقول «button» وخلاص. [[<Menu />]] من غير حجم جنب كلام صغير فيبان ضخم. وفي مشروع حقيقي زرار المنيو على الموبايل كان عليه [[aria-label="Toggle menu"]] كويس، بس ناقصه [[aria-expanded]] فقارئ الشاشة مش عارف القايمة مفتوحة ولا مقفولة (درس aria).`
          },
          teach: R`## كل أيقونة component بيرسم [[<svg>]]

[[<Search />]] مش صورة بتتحمّل: ده component بيرسم [[<svg>]] جوه الصفحة نفسها. حطينا المثال في صفحة Vite ([[lucide-react]] 1.52، و Tailwind 4.3.3، و [[--color-brand]] متعرّف) وقسنا في Chrome، وزودنا زرار تالت فيه [[<Menu />]] من غير [[aria-label]] للمقارنة.

---

## ١. [[import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";]]

بتستورد كل أيقونة باسمها. والأسامي PascalCase (كل كلمة أولها كابيتال) لأنها components.

وده بيفرق في الحجم. عملنا build لـ ٣ صفحات صغيرة بـ Vite وقارنّا ملف الـ JavaScript:

| الصفحة | حجم الـ JS |
|---|---|
| React بس، من غير أيقونات | 219.53 kB |
| [[import { Search, Menu }]] | 222.99 kB |
| [[import * as Icons]] واختيار الأيقونة بالاسم وقت التشغيل | **984.15 kB** |

الاستيراد بالاسم زوّد 3.5 kB بس. لكن [[import * as Icons]] مع [[Icons[name]]] دخّل كل الأيقونات، لأن الـ bundler مش عارف وقت الـ build انت هتختار أنهي واحدة. ده اسمه tree-shaking: الـ bundler بيشيل الكود اللي محدش استخدمه، بس لازم يقدر يشوف ده من الكود.

## ٢. الـ SVG اللي بيطلع

ده اللي [[<Search className="size-4" />]] رسمه:

~~~text الناتج
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
     class="lucide lucide-search size-4" aria-hidden="true">
  <path d="m21 21-4.34-4.34"></path>
  <circle cx="11" cy="11" r="8"></circle>
</svg>
~~~

| الـ attribute | يعني |
|---|---|
| [[width="24" height="24"]] | الحجم الافتراضي 24px |
| [[viewBox="0 0 24 24"]] | الرسمة مرسومة على شبكة 24×24، وبتكبر وتصغر من غير ما تبوظ |
| [[fill="none"]] | مفيش تلوين جوه الأشكال، خطوط بس |
| [[stroke="currentColor"]] | لون الخط = لون الكلام ([[color]]) بتاع العنصر |
| [[stroke-width="2"]] | تخانة الخط 2 من 24 |
| [[aria-hidden="true"]] | قارئ الشاشة يتجاهلها. lucide v1 بيحطه لوحده |

و [[className]] بتاعك اتضاف جنب [[lucide lucide-search]].

## ٣. الزرار الأول: أيقونة وكلام

~~~text App.tsx
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
~~~

- [[inline-flex items-center gap-2]]: الأيقونة والكلمة جنب بعض، في النص رأسيًا، و 8px بينهم.
- [[text-brand]] على الزرار: لون الكلام. والأيقونة جوه الزرار، فـ [[currentColor]] بتاعها بياخد نفس اللون.
- [[size-4]]: 16×16. الـ CSS بيغلب [[width="24"]] اللي على الـ svg.

القياس: الأيقونة 16px و [[stroke]] بتاعها [[oklch(0.55 0.2 265)]]، نفس لون الـ brand. غيّرنا [[text-brand]] لـ [[text-red-600]]: الكلام والأيقونة الاتنين بقوا [[oklch(0.577 0.245 27.325)]].

## ٤. الزرار التاني: أيقونة بس

~~~text App.tsx
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
~~~

- [[aria-label]]: اسم الزرار لقارئ الشاشة، لأن مفيش كلام جواه والأيقونة [[aria-hidden]].
- [[md:hidden]]: مستخبي من 768px وطالع. على عرض 800 الزرار كان [[display: none]]، وعلى 375 ظهر 24×24.
- [[size-6]] = 24px. و [[strokeWidth={1.5}]] = خط أرفع من الافتراضي، وطلع على الـ svg [[stroke-width="1.5"]].

الـ Accessibility tree على عرض 375:

~~~text الناتج
- button "بحث"
- button "افتح القايمة"
- button
~~~

التالت هو اللي زودناه من غير [[aria-label]]: [[button]] من غير اسم. قارئ الشاشة هيقول «button» وخلاص.

## ٥. [[<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />]]

- [[ChevronLeft]]: سهم صغير بيشاور شمال، يعني «التالي» في صفحة عربي.
- [[shrink-0]]: في flex ميتصغرش لو الكلام اللي جنبه طويل.
- [[ltr:rotate-180]]: في صفحة إنجليزي لفّه نص لفة فيشاور يمين.

| [[lang]] و [[dir]] على html | [[rotate]] المحسوب |
|---|---|
| [[ar]] و [[rtl]] | [[none]] (شمال) |
| [[en]] و [[ltr]] | [[180deg]] (يمين) |

## ٦. [[<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />]]

- [[animate-spin]]: animation اسمها [[spin]] مدتها 1s، بتلف على طول.
- [[motion-reduce:hidden]]: لو المستخدم مفعّل «حركة أقل» في نظامه ([[prefers-reduced-motion: reduce]])، اخفيها.

حاكينا الإعداد ده في Chrome: الأيقونة بقت [[display: none]] ومقاسها 0×0.

## الخلاصة

| عايز | اكتب |
|---|---|
| الحجم | [[size-4]] أو [[size-6]] |
| اللون | [[text-*]] على الأيقونة أو أي أب |
| تخانة الخط | [[strokeWidth={1.5}]] |
| زرار أيقونة بس | [[aria-label]] على الزرار |
| حجم bundle صغير | [[import { Name }]] مش [[import *]] |

- الأيقونة [[aria-hidden]] لوحدها، فالاسم لازم ييجي من الزرار.
- متلوّنهاش بـ [[fill-*]]: دي خطوط، لونها [[stroke]].`,
          lines: [
            "استورد الأيقونات بالاسم. اللي مش مستورد مش بيدخل الـ bundle.",
            R`زرار فيه أيقونة وكلام: اللون من [[text-brand]] بيوصل للأيقونة.`,
            "16px، والكلام اللي جنبها هو اسم الزرار.",
            "قفلة.",
            R`زرار أيقونة بس: [[aria-label]] هو اسمه لقارئ الشاشة.`,
            "الأيقونة نفسها مخفية عن قارئ الشاشة، وخطها أرفع من الافتراضي (2).",
            "قفلة.",
            R`سهم «التالي» في صفحة عربي بيشاور شمال، وفي الإنجليزي بيلف لليمين. و [[shrink-0]] عشان ميتزنقش جنب كلام طويل.`,
            "loader بيلف، ويختفي عند اللي طالبين حركة أقل."
          ],
          sol: R`زرار الأيقونة من غير [[aria-label]]: في Accessibility pane هتلاقي Role [[button]] و Name فاضي، وقارئ الشاشة بيقول «button» بس، و Lighthouse بيطلّعه في «Buttons do not have an accessible name». بعد [[aria-label="افتح القايمة"]] الـ Name بقى «افتح القايمة» وجنبه إنه جاي من [[aria-label]].

لما تغيّر [[text-brand]] لـ [[text-red-600]] على الزرار: الأيقونة والكلمة الاتنين بقوا أحمر مع بعض، لأن الـ SVG بتاع lucide مرسوم بـ [[stroke="currentColor"]]، يعني بياخد لون الـ [[color]] من الأب. لو فتحت الـ SVG في Elements هتلاقي [[stroke="currentColor"]] و [[fill="none"]].

الغلط الشائع: تحاول تلوّن الأيقونة بـ [[fill-red-600]] فتطلع مليانة ومشوّهة، لأن lucide أيقونات خطوط. اللون بالـ [[text-*]] والتخانة بـ [[strokeWidth]].`
        }
      ]
    }
]);
