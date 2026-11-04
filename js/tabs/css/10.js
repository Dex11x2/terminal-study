// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "مكونات بتتعاد: cn و cva و shadcn",
      l: 2,
      n: "cn بيدمج الكلاسات، و cva بيعمل variants، و shadcn بينسخ مكونات accessible جاهزة في مشروعك",
      projects: [
        { lvl: 'صغير', t: R`cn من الصفر بالاختبارات`, what: R`اكتب [[cn]] بنفسك (clsx و twMerge)، وملف اختبارات فيه ١٠ حالات منهم حالة [[text-display]] المخصوص و [[extendTailwindMerge]]. من درس [[cn()]].`, done: R`[[node --test]] بيعدّي الـ ١٠، وفيه README سطرين بيقولوا إمتى تحتاج [[extendTailwindMerge]].` },
        { lvl: 'صغير', t: R`Badge بـ cva`, what: R`[[Badge]] بـ ٤ ألوان × شكلين، وكلها من توكنز، ومعاه [[className]] من برا عن طريق cn. من درس [[cva]].`, done: R`الـ ٨ تركيبات في صفحة واحدة، و TypeScript بيرفض قيمة مش موجودة، و [[className="px-1"]] بيكسب على padding الـ badge.` },
        { lvl: 'متوسط', t: R`Button kit بكل الحالات`, what: R`زرار بـ cva فيه ٤ أشكال × ٣ أحجام، وحالات hover و active و focus-visible و disabled و loading، و [[asChild]] بـ [[Slot]] عشان يبقى لينك من غير ما تكرر الكلاسات. من دروس [[cn()]] و [[cva]] و [[shadcn/ui]].`, done: R`صفحة بتعرض الـ ١٢ تركيبة × الحالات، و [[<Button asChild><a href="/x">]] بيطلع [[<a>]] حقيقي بنفس الشكل، واختبار التعارض (twMerge على كل تركيبة) بيعدّي.` },
        { lvl: 'متوسط', t: R`صفحة أسعار من بيانات`, what: R`array فيها ٣ باقات (اسم، وسعر شهري وسنوي، ومميزات، و [[highlighted]])، وكارت بـ cva و subgrid (درس [[subgrid]])، و toggle شهري وسنوي، وزرار الاشتراك بيفتح Dialog تأكيد. بيجمع [[cva]] و [[Dialog]].`, done: R`تغيير الـ array بس بيغيّر الصفحة كلها، والكروت متصفة، والـ Dialog بيرجّع الـ focus للزرار اللي فتحه، ومفيش scroll أفقي على 360.` },
        { lvl: 'كبير', t: R`مكتبة مكونات صغيرة بصفحة توثيق`, what: R`مشروع Vite + React + Tailwind v4 فيه: Button و Badge و Card و Input و Dialog و Sheet، كل واحد بـ cva و cn، وألوان من [[@theme inline]] بتشتغل في light و dark، وعربي وإنجليزي بـ utilities منطقية. وصفحة توثيق بتعرض كل variant وكوده، واختبارات لـ cn والـ variants، واختبار Playwright للـ Dialog والـ Sheet، وفحص axe على صفحة التوثيق. بيجمع الوحدة دي مع وحدة Tailwind.`, done: R`[[npm test]] بيعدّي (cn و variants و Playwright)، و axe على صفحة التوثيق صفر مشاكل في الثيمين، و [[npm run build]] بيعدّي من غير warnings، وكل مكون بيقبل [[className]] من برا وبيكسب، وفيه [[CHANGELOG.md]] بأول نسخة.`, ext: R`انشرها كـ registry لـ shadcn (ملف JSON لكل مكون)، وزوّد Combobox و Toast، و visual regression بلقطات Playwright بتفشل لو مكون اتغيّر شكله.` },
        { lvl: 'فكرة', t: R`design system بتاعك`, what: R`قرّر الهوية (ألوان وخطوط وتدوير ومسافات) واعمل منها مكتبة مكونات بالأسماء اللي تناسب مشروع حقيقي عندك، وانقل شاشة كاملة من مشروعك ليها.`, done: R`الشاشة المنقولة مفيهاش ولا كلاس لون أو تدوير مكتوب بإيدك برا المكونات، وفيه صفحة توثيق بتعرض كل مكون.`, ext: R`اعمل registry بتاعك (ملف JSON زي shadcn) عشان تضيف مكوناتك لأي مشروع بأمر واحد، وزوّد visual regression بلقطات Playwright.` },
      ],
      items: [
        {
          cmd: "cn()",
          title: "دمج الكلاسات من غير ما يتخانقوا",
          desc: R`[[cn()]] دالة صغيرة في كل مشروع shadcn: [[clsx]] بيجمّع الكلاسات ويشيل الشرطية اللي false، و [[twMerge]] بيحل التعارض: لو فيه [[px-4]] و [[px-6]] بيسيب الأخير بس.

ودي بتخلي المكون ياخد [[className]] من برا ويغلب الافتراضي بتاعه بأمان.`,
          example: R`// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// الاستخدام
cn("px-4 py-2", isActive && "bg-brand text-white", { "opacity-50": disabled });
cn("px-4 bg-gray-100", "px-6"); // "bg-gray-100 px-6"
cn("text-sm text-gray-600", className);`,
          try: R`في مشروع الـ lab سطّب [[clsx tailwind-merge]] واعمل [[cn]]. اطبع [[cn("p-2", "px-4")]] و [[cn("px-4", "p-2")]] وقارن: الأولى بتسيب الاتنين (px-4 بيغلب الجزء الأفقي بس)، والتانية بتسيب [[p-2]] بس.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج كل سطر قبل ما تشغّله: [[cn("p-4", "px-6")]]، و [[cn("px-6", "p-4")]]، و [[cn("mt-2", "my-4")]]، و [[cn("my-4", "mt-2")]]، و [[cn("a", 0 && "b", ["c", { d: true, e: false }])]].`, done: R`بـ clsx 2.1.1 و tailwind-merge 3.7.0: [["p-4 px-6"]]، و [["p-4"]]، و [["my-4"]]، و [["my-4 mt-2"]]، و [["a c d"]]. وفهمت إن الأخير بيكسب لو بيغطي اللي قبله كله، وإن الأدق بعد العام بيتساب (mt-2 بعد my-4 بيعدّل حتة منه بس).`, sol: R`~~~js lib/utils.mjs
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
~~~

~~~js predict.mjs
import { cn } from "./lib/utils.mjs";

console.log(cn("p-4", "px-6"));
console.log(cn("px-6", "p-4"));
console.log(cn("mt-2", "my-4"));
console.log(cn("my-4", "mt-2"));
console.log(cn("a", 0 && "b", ["c", { d: true, e: false }]));
~~~

~~~bash
npm i clsx@2.1.1 tailwind-merge@3.7.0
node predict.mjs
~~~

**القاعدة:** [[clsx]] بيجمّع القيم ويشيل الفاضي، و [[twMerge]] بيمشي من الآخر للأول ويحذف اللي اتغطى.

- [[cn("p-4", "px-6")]]: [[px-6]] أدق وجاي بعد [[p-4]]، فبيعدّل حتة منه بس. الاتنين يفضلوا.
- [[cn("px-6", "p-4")]]: [[p-4]] الأخير بيغطي كل الاتجاهات، فـ [[px-6]] مبقالهاش لزمة.
- [[cn("mt-2", "my-4")]]: نفس الكلام، [[my-4]] بيغطي فوق وتحت.
- [[cn("my-4", "mt-2")]]: [[mt-2]] بيعدّل فوق بس.
- الأخير: [[0 && "b"]] قيمته [[0]] فبيتشال، والـ array بيتفرد، والـ object بياخد المفاتيح اللي قيمتها true.

**الغلطة الشائعة:** تفتكر إن «الأخير بيكسب» معناها الأخير بس يفضل. لو الأخير أضيق من اللي قبله، الاتنين بيفضلوا، وده الصح.

~~~text الناتج
p-4 px-6
p-4
my-4
my-4 mt-2
a c d
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في [[@theme]] فيه [[--text-display: 3rem]]، والعنوان [[cn("text-white", "text-display")]] بيطلع أسود. اطبع الناتج وصلّح.`, done: R`[[cn]] رجّع [["text-display"]] بس: tailwind-merge مش عارف [[display]] حجم، فاعتبره لون ومسح [[text-white]]. بعد [[extendTailwindMerge({ extend: { theme: { text: ["display"] } } })]] الناتج [["text-white text-display"]]، و [[cn("text-lg", "text-display")]] بقت [["text-display"]].`, sol: R`~~~js fix.mjs
import { clsx } from "clsx";
import { twMerge, extendTailwindMerge } from "tailwind-merge";

// قبل: tailwind-merge العادي مش عارف إن display حجم خط
const before = (...i) => twMerge(clsx(i));
console.log(before("text-white", "text-display"));

// بعد: بنعرّفه على التوكن بتاعنا
const merge = extendTailwindMerge({ extend: { theme: { text: ["display"] } } });
const cn = (...i) => merge(clsx(i));
console.log(cn("text-white", "text-display"));
console.log(cn("text-lg", "text-display"));
~~~

**ليه [[text-white]] اتمسحت:** [[text-*]] في Tailwind معناه حاجتين: لون أو حجم. tailwind-merge بيعرف الأحجام المشهورة ([[text-lg]] وأخواتها)، بس [[--text-display]] توكن انت اللي عملته. فلما شاف [[text-display]] مش عارفها حجم، اعتبرها لون، فحذف اللون اللي قبلها.

**التصليح:** [[extendTailwindMerge]] بيقوله إن [[display]] حجم خط. دلوقتي [[text-white]] و [[text-display]] مش متعارضين، و [[text-lg]] و [[text-display]] متعارضين صح.

**الغلطة الشائعة:** تلف حوالين المشكلة وتحط [[!text-white]]. كده الباج فاضل لكل مكوّن تاني. وأي توكن custom في [[@theme]] من namespace بيتشارك معناه ([[text-]] و [[shadow-]] و [[rounded-]]) لازم تعرّفه لـ tailwind-merge. احفظ [[cn]] في مكان واحد.

~~~text الناتج
text-display                 ← قبل: text-white اتمسحت
text-white text-display      ← بعد
text-display                 ← text-lg و text-display: واحد بس، وده الصح
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** [[cn.test.mjs]] بـ [[node:test]] فيه ٦ حالات على الأقل: تعارض، وشرط false، و object، و array، و undefined، و variant زي [[hover:]] و [[md:]] مع بعض.`, done: R`[[node --test]] بيعدّي كله، وفيه حالة [[cn("hover:bg-gray-100", "hover:bg-gray-200", "md:bg-white")]] = [["hover:bg-gray-200 md:bg-white"]]، ولو كسرت cn (شيلت twMerge) ٣ اختبارات على الأقل بتفشل.`, sol: R`~~~js cn.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { cn } from "./lib/utils.mjs";

test("التعارض: الأخير بيكسب", () => {
  assert.equal(cn("p-2", "p-4"), "p-4");
});
test("شرط false بيتشال", () => {
  assert.equal(cn("a", false && "b", null, "c"), "a c");
});
test("object: المفاتيح اللي قيمتها true بس", () => {
  assert.equal(cn({ a: true, b: false, c: 1 }), "a c");
});
test("array متداخل", () => {
  assert.equal(cn(["a", ["b"]], "c"), "a b c");
});
test("undefined مبيطلعش كلمة undefined", () => {
  assert.equal(cn("a", undefined), "a");
});
test("كل variant ليه حسابه لوحده", () => {
  assert.equal(cn("hover:bg-gray-100", "hover:bg-gray-200", "md:bg-white"), "hover:bg-gray-200 md:bg-white");
});
test("اتنين variants مع بعض", () => {
  assert.equal(cn("md:hover:p-2", "md:hover:p-4"), "md:hover:p-4");
});
~~~

~~~bash
node --test cn.test.mjs
~~~

**ليه الحالات دي:** كل واحدة بتحرس سلوك مختلف. التعارض بيحرس [[twMerge]]، والباقي بيحرس [[clsx]]، وآخر حالتين بيتأكدوا إن كل variant ليه حسابه لوحده: [[hover:bg-gray-100]] مبتتعارضش مع [[md:bg-white]].

**جرّب تكسره:** شيل [[twMerge]] من [[cn]] وشغّل تاني. الاختبار اللي بيعدّي في كل الحالات مش اختبار.

**الغلطة الشائعة:** تكتب اختبار بيقارن النتيجة بنفس الدالة، زي [[assert.equal(cn("a"), cn("a"))]]. دايمًا اكتب القيمة المتوقعة بالحرف.

~~~text الناتج
cn سليم:
ℹ tests 7
ℹ pass 7
ℹ fail 0

بعد ما شيلت twMerge:
ℹ tests 7
ℹ pass 4
ℹ fail 3
✖ التعارض: الأخير بيكسب
✖ كل variant ليه حسابه لوحده
✖ اتنين variants مع بعض
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** component [[NavLink]] بياخد [[href]] و [[active]] و [[className]]: كلاسات أساسية، و [[active && "bg-brand text-white"]]، والـ className آخر حاجة. استخدمه في navbar وغيّر لون لينك واحد من برا.`, done: R`اللينك النشط بس عليه الخلفية، و [[aria-current="page"]] عليه، واللينك اللي اديته [[className="text-red-600"]] لونه اتغير والباقي زي ما هو، ومفيش لينك فيه كلاسين لون في الـ DOM.`, sol: R`~~~tsx NavLink.tsx
import { cn } from "./cn";

type Props = React.ComponentProps<"a"> & { active?: boolean };

export function NavLink({ active, className, ...props }: Props) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100",
        active && "bg-brand text-white hover:bg-brand",
        className
      )}
      {...props}
    />
  );
}
~~~

~~~tsx main.tsx
import { createRoot } from "react-dom/client";
import { NavLink } from "./NavLink";

createRoot(document.getElementById("root")!).render(
  <main>
  <h1 className="p-4 text-2xl font-bold">متجر النور</h1>
  <nav aria-label="الرئيسية" className="flex gap-2 p-4">
    <NavLink href="/" active>الرئيسية</NavLink>
    <NavLink href="/products">المنتجات</NavLink>
    <NavLink href="/offers" className="text-red-600">العروض</NavLink>
  </nav>
  </main>
);
~~~

و [[cn.ts]] بتاعك من الدرس، و [[in.css]] فيه [[--color-brand]].

**الترتيب في [[cn()]] هو المعنى:** الأساس الأول، وبعده حالة active، و [[className]] آخر حاجة. كده اللي بيستخدم المكوّن هو صاحب الكلمة الأخيرة. و twMerge بيشيل [[text-gray-700]] لما ييجي لون تاني، فمفيش كلاسين لون على نفس العنصر.

**[[aria-current="page"]]:** قارئ الشاشة بيقول «الصفحة الحالية». اللون لوحده ميقولش ده لحد مش شايف.

**[[undefined]] مش [[false]]:** لو كتبت [[aria-current={active}]] هيطلع [[aria-current="false"]] على كل لينك. [[undefined]] بيشيل الـ attribute.

**الغلطة الشائعة:** تحط [[className]] في الأول، فكلاسات الأساس تكسب ومحدش يقدر يغيّر حاجة من برا.

~~~text الناتج
الرئيسية   class: rounded-lg px-3 py-2 bg-brand text-white hover:bg-brand
           aria-current="page" ، اللون rgb(255, 255, 255)
المنتجات   class: rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100
العروض     class: rounded-lg px-3 py-2 hover:bg-gray-100 text-red-600
           (text-gray-700 اتشالت)

axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[clsx("px-6", "px-2")]] من غير twMerge: الـ div بيبقى عليه الكلاسين. اعمل build وقيس [[padding-left]]: أنهي واحد كسب؟ وليه مش «الأخير في الـ class»؟`, done: R`كسب [[px-6]] (24px) رغم إن [[px-2]] آخر حاجة في الـ class، لأن ترتيب الكلاسات في الـ HTML ملوش لازمة: اللي بيكسب الأخير في **ملف الـ CSS**، و Tailwind حاطط [[.px-6]] بعد [[.px-2]]. وده بالظبط اللي twMerge بيحله.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>مين كسب</title><link rel="stylesheet" href="out.css"></head>
<body>
<div id="a" class="px-6 px-2">px-6 الأول</div>
<div id="b" class="px-2 px-6">px-2 الأول</div>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css
~~~

**ليه مش «الأخير في الـ class»:** لما كلاسين ليهم نفس الـ specificity، اللي بيكسب هو اللي جاي أخيرًا في **ملف الـ CSS**. ترتيب الأسماء جوه attribute [[class]] ملوش أي معنى عند المتصفح، ده مجرد set.

والعنصرين هنا ترتيبهم مختلف في الـ HTML، والنتيجة واحدة، لأن [[.px-6]] جاية بعد [[.px-2]] في [[out.css]].

**عشان كده twMerge موجود:** بيشيل الكلاس المغلوب من الأول، فمش بتبقى تحت رحمة ترتيب الملف.

**الغلطة الشائعة:** تعكس الكلاسات في الـ HTML وتستغرب إن مفيش حاجة اتغيرت.

~~~text الناتج
class="px-6 px-2"   padding-left = 24px
class="px-2 px-6"   padding-left = 24px

مكان القاعدة في out.css: .px-2 عند 4641 ، .px-6 عند 4701
يعني px-6 بعدها، فبتكسب في الحالتين.
~~~` },
          ],
          deep: {
            why: R`لو مكون Button فيه [[px-4]] وانت عايز زرار معين [[px-6]]، والـ className بيتضاف جنبه، هيبقى عندك [[px-4 px-6]]. مين يكسب؟ مش اللي مكتوب آخر في الـ className، اللي مكتوب آخر في ملف الـ CSS الناتج، ودا مش في إيدك. twMerge بيشيل [[px-4]] خالص فمفيش خناقة.`,
            how: R`[[clsx]] مجرد تجميع: [[clsx("a", false && "b", { c: true, d: false }, ["e"])]] = [[a c e]]. مبيعرفش حاجة عن Tailwind.

[[twMerge]] عنده خريطة بكل مجموعات Tailwind: كل كلاس بيتصنف (padding-x، و background-color، و font-size...) ومعاه الـ variants بتاعته ([[hover:]] و [[md:]]). لما يلاقي اتنين في نفس المجموعة بنفس الـ variants، بيسيب الأخير. وبيفهم العلاقات: [[p-2]] بعد [[px-4]] يشيل px-4، بس [[px-4]] بعد [[p-2]] يسيبهم الاتنين.

الترتيب مهم: [[cn(defaults, className)]] عشان اللي جاي من برا يكسب. لو عكست، الافتراضي هيغلب اللي المستخدم طالبه.

tailwind-merge v3 لـ Tailwind v4 (و v2.6 لـ v3). الألوان الجديدة من [[@theme]] بيفهمها لوحده، بس أحجام خط أو مسافات بأسماء جديدة ([[--text-hero]]) لازم تعرّفه بيها بـ [[extendTailwindMerge]]، وإلا ممكن يفتكر [[text-hero]] لون ويشيل [[text-white]] اللي معاه.`,
            when: "أي مكون بياخد className من برا، وأي كلاسات شرطية. ولكلاسات ثابتة في مكان واحد، string عادي كفاية.",
            mistakes: R`template literal بدل cn: [[className={$__bt$__{base} $__{className}$__bt}]] فالتعارض مش بيتحل. وترتيب معكوس ([[cn(className, defaults)]]). وتوكن حجم خط مخصص من غير extendTailwindMerge، فيضيع اللون أو الحجم من غير سبب واضح.`
          },
          teach: R`## دالة من سطر واحد بتحل مشكلة حقيقية

[[cn]] بتاخد كلاسات بأي شكل (strings، وشروط، و objects) وترجّع string واحد نضيف مفيهوش كلاسين بيتخانقوا على نفس الخاصية. جربنا كل سطر في المثال بـ Node (clsx 2.1.1 و tailwind-merge 3.7.0)، والكلاسات نفسها في صفحة Vite بـ Tailwind 4.3.3 في Chrome.

---

## ١. المشكلة الأول: مين يكسب في [[px-6 px-4]]؟

حطينا الاتنين على نفس الـ div بترتيبين مختلفين وقرينا الـ padding:

~~~text getComputedStyle في Chrome
class="px-6 px-4"   paddingLeft = 24px
class="px-4 px-6"   paddingLeft = 24px
~~~

في الحالتين [[px-6]] كسب (24px)، حتى لما كان الأول في الـ class. ليه؟ لأن ترتيب الكلاسات جوه [[class]] ملوش أي لازمة في CSS. لما قاعدتين ليهم نفس الـ specificity (كلاس واحد)، اللي **مكتوبة آخر في ملف الـ CSS** هي اللي بتكسب. وده ملف الـ CSS اللي Tailwind طلّعه:

~~~text من الـ CSS الناتج
.px-4{padding-inline:calc(var(--spacing) * 4)}
.px-6{padding-inline:calc(var(--spacing) * 6)}
~~~

[[.px-6]] مكتوبة بعد [[.px-4]]، فهي اللي بتكسب دايمًا. يعني لو مكون فيه [[px-6]] افتراضي، وانت بعتله [[px-4]] من برا، طلبك هيتجاهل من غير أي error. ده بالظبط اللي [[cn]] جاية تحله.

---

## ٢. ملف [[lib/utils.ts]] سطر سطر

### [[import { clsx, type ClassValue } from "clsx";]]

- [[clsx]]: دالة من package اسمه clsx، شغلتها تجميع بس.
- [[type ClassValue]]: كلمة [[type]] قبل الاسم معناها «ده type بتاع TypeScript مش كود»، فبيتشال خالص من الـ JavaScript الناتج. و [[ClassValue]] هو النوع اللي بيوصف «أي حاجة clsx تقبلها»: string أو رقم أو [[null]] أو [[false]] أو object أو array منهم.

### [[import { twMerge } from "tailwind-merge";]]

[[twMerge]] من package اسمه tailwind-merge. دي اللي فاهمة Tailwind: بتعرف إن [[px-4]] و [[px-6]] الاتنين padding أفقي، فتشيل الأولاني.

### [[export function cn(...inputs: ClassValue[])]]

- [[export]]: عشان أي ملف تاني يقدر يعمل [[import { cn } from "@/lib/utils"]]. و [[@]] ده اختصار لفولدر [[src]] متعرّف في إعدادات المشروع.
- [[...inputs]]: الـ [[...]] هنا اسمها rest parameter، يعني «لمّ كل الـ arguments اللي هتيجي في array واحدة اسمها inputs». فتقدر تنادي [[cn("a")]] أو [[cn("a", "b", x)]] بأي عدد.
- [[: ClassValue[]]]: نوع الـ array دي: كل عنصر فيها [[ClassValue]]. و [[[]]] بعد النوع معناها «array من».

### [[return twMerge(clsx(inputs));]]

بيتقرا من جوه لبرة:

1. [[clsx(inputs)]]: يجمّع كل حاجة في string واحد ويشيل اللي قيمته false.
2. [[twMerge(...)]]: ياخد الـ string ده ويشيل الكلاسات اللي اتغلبت.

---

## ٣. [[clsx]] لوحده: تجميع

~~~text Node
clsx("a", false && "b", { c: true, d: false }, ["e"])   →   "a c e"
~~~

- [[false && "b"]]: الـ [[&&]] بيرجّع اللي على الشمال لو كان false، وإلا بيرجّع اللي على اليمين. فهنا رجّع [[false]]، و clsx بيتجاهله.
- [[{ c: true, d: false }]]: object كل key فيه كلاس، والقيمة شرطه. [[c]] قيمته true فدخل، و [[d]] لأ.
- [[["e"]]]: array بيتفرد.

## ٤. سطور الاستخدام

### السطر الأول: كلاسات شرطية

~~~text App.tsx
cn("px-4 py-2", isActive && "bg-brand text-white", { "opacity-50": disabled });
~~~

| [[isActive]] و [[disabled]] | الناتج | ليه |
|---|---|---|
| الاتنين [[true]] | [[px-4 py-2 bg-brand text-white opacity-50]] | الشرط والـ object الاتنين اتحققوا فاتضافوا |
| الاتنين [[false]] | [[px-4 py-2]] | [[false]] بيختفي، والمفتاح اللي قيمته false مبيتكتبش |

### السطر التاني: تعارض

~~~text Node
clsx("px-4 bg-gray-100", "px-6")   →   "px-4 bg-gray-100 px-6"
cn("px-4 bg-gray-100", "px-6")     →   "bg-gray-100 px-6"
~~~

clsx لوحده ساب الاتنين (والمتصفح هيختار حسب ترتيب ملف الـ CSS زي ما شفنا). [[cn]] شال [[px-4]] لأن [[px-6]] جه بعده في نفس المجموعة (padding أفقي). و [[bg-gray-100]] فضل لأنه مجموعة تانية (لون خلفية).

وفي الصفحة: [[cn("px-6", "px-4")]] طلّع [[class="px-4"]] و paddingLeft = **16px**. اللي جه آخر في الـ arguments كسب فعلًا، عكس الـ div اللي فوق.

### السطر التالت: النمط بتاع أي مكون

~~~text App.tsx
cn("text-sm text-gray-600", className);
~~~

[[className]] هو اللي جاي من برا (prop). بيتحط **آخر حاجة** عشان يكسب:

| [[className]] اللي جاي من برا | الناتج بعد cn |
|---|---|
| [["text-red-600"]] | [[text-sm text-red-600]] (اللون اتغير والحجم فضل) |
| [["text-base"]] | [[text-gray-600 text-base]] (الحجم اتغير واللون فضل) |
| [[undefined]] | [[text-sm text-gray-600]] (الافتراضي زي ما هو) |

لاحظ إن twMerge عارف إن [[text-sm]] حجم و [[text-gray-600]] لون، رغم إن الاتنين بيبدأوا بـ [[text-]].

---

## ٥. حالات بيفهمها twMerge

| النداء | الناتج | ليه |
|---|---|---|
| [[cn("p-2", "px-4")]] | [[p-2 px-4]] | [[px-4]] بيغطي الجنبين بس، و [[p-2]] لسه محتاجينه لفوق وتحت |
| [[cn("px-4", "p-2")]] | [[p-2]] | [[p-2]] بيغطي كل الاتجاهات، فـ [[px-4]] ملوش لازمة |
| [[cn("hover:bg-red-500", "bg-blue-500", "hover:bg-blue-500")]] | [[bg-blue-500 hover:bg-blue-500]] | التعارض بيتحسب لكل variant لوحده |
| [[cn("text-hero", "text-white")]] | [[text-white]] | twMerge مش عارف [[text-hero]]، فافتكره لون وشاله |

السطر الأخير هو الغلطة اللي في «أخطاء شائعة»: لو [[--text-hero]] حجم خط عملته في [[@theme]]، لازم تعرّفه لـ twMerge بـ [[extendTailwindMerge]].

> في مشروع shadcn جديد (CLI 4.21.3) هتلاقي [[lib/utils.ts]] سطر واحد: [[export { cn } from "cn"]]. ده package اسمه [[cn]] من shadcn بيعمل شغل clsx و twMerge مع بعض. جربنا عليه نفس النداءات اللي في الجدول وطلّع نفس النتايج بالظبط، فكل اللي فوق ينطبق عليه.

## الخلاصة

- ترتيب الكلاسات في [[class]] ملوش لازمة، اللي بيكسب ترتيب القواعد في ملف الـ CSS.
- [[clsx]] بيجمّع ويشيل الـ false، و [[twMerge]] بيشيل الكلاس اللي اتغلب في نفس المجموعة.
- دايمًا [[cn(defaults, className)]]: اللي من برا آخر حاجة.`,
          lines: [
            R`[[clsx]]: بيجمّع strings و objects و arrays ويشيل false و null و undefined.`,
            R`[[twMerge]]: بيفهم كلاسات Tailwind ويشيل المتعارض.`,
            "الدالة بتاخد أي عدد من الكلاسات بأي شكل.",
            "clsx الأول يجمّع، و twMerge بعده ينضّف.",
            "قفلة.",
            R`كلاس شرطي بـ [[&&]] و object: لو isActive بـ false الجزء ده بيختفي.`,
            R`تعارض: [[px-4]] و [[px-6]]، الأخير يكسب.`,
            R`النمط الأساسي: الافتراضي الأول، والـ [[className]] اللي جاي من برا آخر حاجة عشان يكسب.`
          ],
          sol: R`[[cn("p-2", "px-4")]] بيرجع [[p-2 px-4]]: الاتنين فضلوا، لأن [[px-4]] بيغطي الجزء الأفقي بس، والـ [[p-2]] لسه محتاجينه للرأسي، و tailwind-merge عارف إن اللي جاي بعد هو الأقوى. [[cn("px-4", "p-2")]] بيرجع [[p-2]] بس: الـ [[p-2]] جه بعد وبيغطي كل الاتجاهات، فالـ [[px-4]] ملوش لازمة.

جرّبت كمان: [[cn("px-4 bg-gray-100", "px-6")]] ← [[bg-gray-100 px-6]]، و [[cn("text-brand", "text-lg")]] ← [[text-brand text-lg]] (مش بيتخانقوا لأن واحد لون والتاني حجم). ولو [[cn]] رجّع الاتنين في [[cn("px-4", "px-6")]]، يبقى انت عامل [[clsx]] لوحده من غير [[twMerge]].

الغلط الشائع: تفتكر إن ترتيب الكلاسات في الـ HTML هو اللي بيحدد مين يكسب. في CSS اللي بيكسب هو ترتيب القواعد في ملف الـ CSS، مش في الـ class، وعشان كده محتاج twMerge يشيل الخسران من الأول.`,
          solCode: R`// cn.mjs  (npm i clsx tailwind-merge ثم node cn.mjs)
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const cn = (...inputs) => twMerge(clsx(inputs));
console.log(cn("p-2", "px-4"));              // p-2 px-4
console.log(cn("px-4", "p-2"));              // p-2
console.log(cn("px-4 bg-gray-100", "px-6")); // bg-gray-100 px-6
console.log(cn("text-brand", "text-lg"));    // text-brand text-lg`
        },
        {
          cmd: "cva",
          title: "زرار بأشكال وأحجام من غير if كتير",
          desc: R`[[cva]] (من class-variance-authority) بتعرّف مكون بكلاسات أساسية، و variants بأسماء (نوع وحجم)، وقيم افتراضية. بترجع دالة تدّيها [[{ variant: "outline", size: "sm" }]] وترجعلك الكلاسات.

ومعاها [[VariantProps]] بتطلّع الأنواع لـ TypeScript، فلو كتبت [[variant="outlinee"]] غلط الـ editor يعلّم عليها.`,
          example: R`import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50", {
  variants: {
    variant: { primary: "bg-brand text-white hover:bg-brand/90", outline: "border hover:bg-gray-50", ghost: "hover:bg-gray-100" },
    size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
  },
  compoundVariants: [{ variant: "outline", size: "lg", class: "border-2" }],
  defaultVariants: { variant: "primary", size: "md" },
});
type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}`,
          try: R`اعمل الزرار ده واستخدمه [[<Button variant="outline" size="lg">]]. وبعدين اكتب [[variant="danger"]] وشوف TypeScript بيعترض. ضيف danger للـ variants وشوفه قبله.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بـ [[buttonVariants]] بتاع الدرس: إيه ناتج [[({})]] و [[({ variant: "outline", size: "lg" })]] و [[({ size: null })]] و [[({ variant: "danger" })]]؟ شغّلهم بـ Node.`, done: R`الأول فيه primary و md. التاني فيه [[border]] و [[h-12 px-6 text-lg]] وفي الآخر [[border-2]] (الـ compound اشتغل). التالت مفيهوش ولا كلاس حجم ([[null]] بيلغي الافتراضي، و [[undefined]] لأ). الرابع مفيهوش ولا كلاس شكل ومفيش error: الاسم الغلط بيعدّي في سكوت، ودا سبب [[VariantProps]].`, sol: R`~~~js cva-base.mjs
import { cva } from "class-variance-authority";

export const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50", {
  variants: {
    variant: { primary: "bg-brand text-white hover:bg-brand/90", outline: "border hover:bg-gray-50", ghost: "hover:bg-gray-100" },
    size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
  },
  compoundVariants: [{ variant: "outline", size: "lg", class: "border-2" }],
  defaultVariants: { variant: "primary", size: "md" },
});
~~~

~~~js predict.mjs
import { buttonVariants as b } from "./cva-base.mjs";

console.log(b({}));
console.log(b({ variant: "outline", size: "lg" }));
console.log(b({ size: null }));
console.log(b({ variant: "danger" }));
~~~

**اللي بيحصل في كل سطر:**

1. [[({})]]: مفيش قيم، فـ [[defaultVariants]] بتتطبق: primary و md.
2. outline و lg: كلاسات الاتنين، وبعدها الـ compound اللي شرطه اتحقق ([[border-2]]).
3. [[({ size: null })]]: [[null]] معناها «مش عايز قيمة هنا»، فبيلغي الافتراضي. أما [[undefined]] فمعناها «مقلتش»، فالافتراضي يفضل.
4. [[({ variant: "danger" })]]: الاسم مش موجود، فمفيش كلاسات شكل ولا error في JavaScript. وده اللي [[VariantProps]] بيمسكه وقت الكتابة في TypeScript.

**الغلطة الشائعة:** تعتمد على الـ runtime يقولك الاسم غلط. الزرار هيطلع من غير لون في سكوت.

~~~text الناتج
(الجزء الأساسي «inline-flex ... disabled:opacity-50» متكرر في الأربعة، فاتشال هنا)

1. bg-brand text-white hover:bg-brand/90 h-10 px-4
2. border hover:bg-gray-50 h-12 px-6 text-lg border-2
3. bg-brand text-white hover:bg-brand/90
4. h-10 px-4
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** [[Badge]] بـ cva: [[tone]] (success و warning و danger و neutral) × [[look]] (soft و solid)، و compound لـ solid + danger يبقى [[font-bold]]، وألوان من توكنز [[@theme]].`, done: R`صفحة فيها الـ ٨ تركيبات، و TypeScript بيرفض [[tone="info"]]، وكل badge الكلام عليه مقري (contrast 4.5:1 أو أكتر في DevTools)، و [[solid danger]] بس اللي عريض.`, sol: R`~~~css in.css
@import "tailwindcss";

@theme {
  --color-success: #166534;
  --color-success-soft: #dcfce7;
  --color-warning: #92400e;
  --color-warning-soft: #fef3c7;
  --color-danger: #b91c1c;
  --color-danger-soft: #fee2e2;
  --color-neutral: #374151;
  --color-neutral-soft: #f3f4f6;
}
~~~

~~~tsx Badge.tsx
import { cva, type VariantProps } from "class-variance-authority";

const badge = cva("inline-flex items-center rounded-full px-3 py-1 text-sm", {
  variants: {
    tone: { success: "", warning: "", danger: "", neutral: "" },
    look: { soft: "", solid: "text-white" },
  },
  compoundVariants: [
    { tone: "success", look: "soft", class: "bg-success-soft text-success" },
    { tone: "warning", look: "soft", class: "bg-warning-soft text-warning" },
    { tone: "danger", look: "soft", class: "bg-danger-soft text-danger" },
    { tone: "neutral", look: "soft", class: "bg-neutral-soft text-neutral" },
    { tone: "success", look: "solid", class: "bg-success" },
    { tone: "warning", look: "solid", class: "bg-warning" },
    { tone: "danger", look: "solid", class: "bg-danger font-bold" },
    { tone: "neutral", look: "solid", class: "bg-neutral" },
  ],
  defaultVariants: { tone: "neutral", look: "soft" },
});

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badge>;

export function Badge({ tone, look, className, ...props }: BadgeProps) {
  return <span className={badge({ tone, look, className })} {...props} />;
}
~~~

~~~tsx main.tsx
import { createRoot } from "react-dom/client";
import { Badge } from "./Badge";

const tones = ["success", "warning", "danger", "neutral"] as const;
const looks = ["soft", "solid"] as const;

createRoot(document.getElementById("root")!).render(
  <main className="grid gap-3 p-6">
    <h1 className="text-2xl font-bold">الحالات</h1>
    {looks.map((look) => (
      <p key={look} className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <Badge key={tone} tone={tone} look={look}>{tone}</Badge>
        ))}
      </p>
    ))}
  </main>
);
~~~

**ليه compound لكل تركيبة:** اللون معتمد على الـ tone والـ look مع بعض، فكلاس زي [[bg-success]] مينفعش يتحط في variant واحد. فالـ variants فاضية، وبتعرّف الأسماء والـ types، والـ compound فيها الألوان. والكلاسات مكتوبة كاملة عشان Tailwind يشوفها.

**[[VariantProps]]** بيقرا الأسماء من الـ [[cva]] نفسها، فالـ TypeScript بيرفض أي اسم مش موجود من غير ما تكرر النوع.

**الغلطة الشائعة:** تختار لون التحذير [[#f59e0b]] مع كلام أبيض، فالتباين يقع تحت 3. عشان كده الـ warning هنا درجة غامقة، وقس كل واحدة بدل ما تثق في عينك.

~~~text الناتج
tone      soft       solid
success   6.49:1     7.13:1
warning   6.37:1     7.09:1
danger    5.30:1     6.47:1 (و font-weight: 700 ، لوحده)
neutral   9.37:1     10.31:1

tsc على <Badge tone="info">:
bad.tsx(2,25): error TS2322: Type '"info"' is not assignable to type
'"success" | "warning" | "danger" | "neutral" | null | undefined'.

axe صفر ، وعلى 360 مفيش scroll أفقي
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت باقة بـ cva: [[tone]] (plain و featured) و [[period]] (month و year)، و compound: featured + year = [[ring-2 ring-brand]]. والباقات جاية من array فيها [[highlighted]].`, done: R`[[plan({ tone: "featured", period: "year" })]] بيرجّع [["rounded-3xl p-8 bg-gray-950 text-white ring-2 ring-brand"]] (أو كلاساتك بنفس الترتيب)، والتلات باقات بتترسم من الـ array بـ map، وتغيير [[highlighted]] في الداتا بس بيغيّر أنهي واحدة مميزة.`, sol: R`~~~js plan.mjs
import { cva } from "class-variance-authority";

export const plan = cva("rounded-3xl p-8", {
  variants: {
    tone: { plain: "bg-white text-gray-950", featured: "bg-gray-950 text-white" },
    period: { month: "", year: "" },
  },
  compoundVariants: [{ tone: "featured", period: "year", class: "ring-2 ring-brand" }],
  defaultVariants: { tone: "plain", period: "month" },
});

const plans = [
  { name: "البداية", price: 99, highlighted: false },
  { name: "الاحترافية", price: 299, highlighted: true },
  { name: "الشركات", price: 999, highlighted: false },
];

for (const p of plans) {
  const tone = p.highlighted ? "featured" : "plain";
  console.log(p.name, "=>", plan({ tone, period: "year" }));
}
~~~

في React بتبقى:

~~~tsx Plans.tsx
{plans.map((p) => (
  <article key={p.name} className={plan({ tone: p.highlighted ? "featured" : "plain", period: "year" })}>
    <h2>{p.name}</h2>
    <p>{p.price} جنيه</p>
  </article>
))}
~~~

**الفكرة:** [[period]] variant قيمه فاضية، ووجوده بس عشان الـ compound يقدر يشترط عليه. و [[ring-2 ring-brand]] مبتظهرش غير لو الشرطين اتحققوا مع بعض.

**الداتا هي اللي بتقرر:** مفيش [[if]] جوه الـ JSX لكل باقة. تغيير [[highlighted]] من باقة لباقة سطر في الـ array.

**الغلطة الشائعة:** تكتب [[className={p.highlighted ? "bg-gray-950 ..." : "bg-white ..."}]] في كل مكان. كده الشكل متفرق، و cva بتجمّعه في مكان واحد.

~~~text الناتج
البداية => rounded-3xl p-8 bg-white text-gray-950
الاحترافية => rounded-3xl p-8 bg-gray-950 text-white ring-2 ring-brand
الشركات => rounded-3xl p-8 bg-white text-gray-950
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[<button className={buttonVariants({ variant, size, class: className })}>]] و [[size: { md: "px-6 ..." }]]، وحد بعت [[className="px-2"]] ومفيش أي تغيير. ليه؟ صلّح.`, done: R`cva بتلزق [[class]] في الآخر من غير ما تحل التعارض، فالعنصر عليه [[px-6 px-2]] و [[.px-6]] جاية بعد [[.px-2]] في الـ CSS فبتكسب (24px). بعد [[cn(buttonVariants({ variant, size }), className)]] الـ class فيه [[px-2]] بس والـ padding بقى 8px.`, sol: R`~~~tsx Button.tsx
import { cn } from "@/lib/utils";

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
~~~

**ليه مكانش بيتغيّر:** cva مش بتفهم Tailwind. لما تديها [[class]]، بتلزقها في آخر النص وخلاص. فالعنصر عليه [[px-6]] و [[px-2]] مع بعض، واللي بيكسب هو الأخير في ملف الـ CSS، وده [[px-6]].

**التصليح:** ناتج cva يعدّي على [[cn()]]، و twMerge يحذف [[px-6]] لأن [[px-2]] جاية بعدها.

**الغلطة الشائعة:** تفتكر إن [[class]] جوه cva بديل لـ [[cn]]. ده بيشتغل بس لو مفيش تعارض، وأول مرة يحصل تعارض مش هتلاقي أي رسالة.

~~~text الناتج
قبل:  class="rounded-lg px-6 py-2 px-2"   padding-left = 24px
بعد:  class="rounded-lg py-2 px-2"        padding-left = 8px
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لف على كل تركيبات [[variant]] × [[size]] في [[buttonVariants]]، ولكل واحدة تأكد إن [[twMerge(out) === out]] (يعني مفيش كلاسين بيتخانقوا جوه الـ variants نفسها).`, done: R`الاختبار بيقع من أول تشغيلة على [[outline × lg]] لأن [[border]] و [[border-2]] متعارضين، وبعد ما نقلت الـ border لـ compound بيعدّي على الـ ٩ تركيبات. ولما تزوّد [[px-5]] على variant (وهو أصلًا فيه px من الحجم) الاختبار بيفشل ويطبع التركيبات اللي فيها التعارض.`, sol: R`~~~js variants.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { twMerge } from "tailwind-merge";
import { buttonVariants } from "./cva-base.mjs";

const variants = ["primary", "outline", "ghost"];
const sizes = ["sm", "md", "lg"];

for (const variant of variants) {
  for (const size of sizes) {
    test($__bt$__{variant} × $__{size} مفيهاش كلاسين بيتخانقوا$__bt, () => {
      const out = buttonVariants({ variant, size });
      assert.equal(twMerge(out), out);
    });
  }
}
~~~

**الاختبار كشف مشكلة حقيقية من أول تشغيلة:** الزرار [[outline]] و [[lg]] فيه [[border]] من الـ variant و [[border-2]] من الـ compound، والاتنين بيتخانقوا على نفس الخاصية. فـ twMerge بيشيل [[border]] والناتج بيختلف.

في الزرار الحقيقي [[cn]] بيداري ده، بس الكلاس الزيادة لسه غلط. التصليح: [[border]] يتنقل لـ compound، عشان كل مقاس ياخد سُمك واحد:

~~~js cva-base-fixed.mjs
import { cva } from "class-variance-authority";

export const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50", {
  variants: {
    variant: { primary: "bg-brand text-white hover:bg-brand/90", outline: "hover:bg-gray-50", ghost: "hover:bg-gray-100" },
    size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
  },
  compoundVariants: [
    { variant: "outline", size: ["sm", "md"], class: "border" },
    { variant: "outline", size: "lg", class: "border-2" },
  ],
  defaultVariants: { variant: "primary", size: "md" },
});
~~~

**ليه الفكرة شغالة:** [[twMerge(out) === out]] معناها «مفيش حاجة تتحذف»، يعني مفيش كلاسين متعارضين. والاختبار بيلف بـ [[for]] فمحدش بينسى تركيبة، واسم كل test فيه التركيبة.

**الغلطة الشائعة:** تعدّل الاختبار لما يقع عشان يعدّي. هنا الاختبار كان صح، والكود هو اللي محتاج تصليح.

~~~text الناتج
buttonVariants بتاع الدرس:
ℹ tests 9 ، pass 8 ، fail 1
✖ outline × lg مفيهاش كلاسين بيتخانقوا
  actual:   ... hover:bg-gray-50 h-12 px-6 text-lg border-2
  expected: ... border hover:bg-gray-50 h-12 px-6 text-lg border-2

بعد نقل border للـ compound:
ℹ tests 9 ، pass 9 ، fail 0

بعد ما زوّدت px-5 على outline:
ℹ tests 9 ، pass 6 ، fail 3
✖ outline × sm ، outline × md ، outline × lg
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من README بتاع class-variance-authority: إزاي compound variant يطابق أكتر من قيمة (outline أو ghost مع بعض)؟ وإزاي تعمل variant boolean ([[disabled: true]])؟ جرّب الاتنين.`, done: R`لقيت إن القيمة في compound ممكن تبقى array ([[variant: ["outline", "ghost"]]])، وإن الـ boolean بيتكتب [[{ true: "opacity-50", false: "" }]]، و [[cva("x", { variants: { disabled: { true: "opacity-50", false: "" } } })({ disabled: true })]] رجّع [["x opacity-50"]].`, sol: R`~~~js try.mjs
import { cva } from "class-variance-authority";

const btn = cva("btn", {
  variants: {
    variant: { solid: "s", outline: "o", ghost: "g" },
    disabled: { true: "opacity-50", false: "" },
  },
  compoundVariants: [{ variant: ["outline", "ghost"], class: "bg-transparent" }],
});

console.log(btn({ variant: "outline" }));
console.log(btn({ variant: "ghost" }));
console.log(btn({ variant: "solid" }));
console.log(cva("x", { variants: { disabled: { true: "opacity-50", false: "" } } })({ disabled: true }));
~~~

**الإجابة من README بتاع class-variance-authority:**

- القيمة في compound ممكن تبقى array: [[variant: ["outline", "ghost"]]] معناها «أي واحدة منهم».
- الـ boolean variant بيتكتب بمفاتيح [[true]] و [[false]]. وبعد كده [[{ disabled: true }]] بتشتغل. واكتب [[false: ""]] لو حابب تحط [[defaultVariants]] لها.

**الغلطة الشائعة:** تكرر compound مرتين، مرة لـ outline ومرة لـ ghost. أو تنادي بالـ string [["true"]] بدل الـ boolean في TypeScript.

~~~text الناتج
btn o bg-transparent
btn g bg-transparent
btn s
x opacity-50
~~~` },
          ],
          deep: {
            why: "من غير cva، زرار بـ 3 أشكال و 3 أحجام بيبقى ternaries جوه ternaries في الـ className، وكل واحد يضيف شكل يكسر حاجة. cva بتخلي كل الاختيارات جدول واضح، والـ TypeScript بيقفل الأسماء.",
            how: R`cva مش بتعمل سحر: بتبني string. [[buttonVariants({ variant: "outline", size: "lg" })]] بترجع الـ base + كلاسات outline + كلاسات lg + أي compoundVariant اتطابقت. ومش بتحل التعارض بين الكلاسات، عشان كده بتتلف في [[cn]].

[[VariantProps<typeof buttonVariants>]] بيطلّع نوع فيه [[variant]] و [[size]] بالقيم المسموحة بس، فالمكون مش هيقبل غيرها.

ودا بالظبط شكل [[components/ui/button.tsx]] في shadcn: الـ cva اسمها [[buttonVariants]] ومتصدّرة، فتقدر تستخدمها على لينك ([[<Link className={buttonVariants({ variant: "outline" })}>]]) من غير ما تعمل زرار.

في React 19 الـ [[ref]] بقى prop عادي، فمش محتاج [[forwardRef]] زي النسخ القديمة من shadcn: [[...props]] بيعدّيه لوحده.`,
            when: "أي مكون UI ليه أشكال: Button و Badge و Alert و Input. لو المكون شكل واحد بس، cn كفاية.",
            mistakes: R`تبني كلاسات الـ variants بـ template فـ Tailwind ميشوفهاش. تنسى [[defaultVariants]] فالزرار من غير props يطلع من غير حجم. وفي مشروع حقيقي الـ Button كان لسه بـ [[forwardRef]] و [[displayName]] على React 19: شغال، بس كود زيادة ملوش لازمة.`
          },
          teach: R`## جدول اختيارات بيتحوّل لكلاسات

[[cva]] بتاخد منك الكلاسات اللي في كل الزراير، وجدول فيه كل شكل وكل حجم وكلاساته، وترجّعلك دالة: تدّيها [[{ variant, size }]] ترجّع الـ string. حطينا الكود ده بالظبط في مشروع Vite (Tailwind 4.3.3، و class-variance-authority 0.7.1، و TypeScript 6.0.3، و [[--color-brand]] متعرّف في [[@theme]])، وقسنا الزراير في Chrome.

---

## ١. الـ imports

~~~text Button.tsx
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
~~~

- [[import type]]: السطر كله types بس، بيتشال من الـ JavaScript الناتج.
- [[ComponentProps]]: type من React بيدّيك كل الـ props بتاعة عنصر HTML. [[ComponentProps<"button">]] = [[onClick]] و [[disabled]] و [[type]] و [[aria-label]] وكل اللي الـ [[<button>]] بياخده.
- [[cva]]: الدالة نفسها. والاسم اختصار class-variance-authority.
- [[VariantProps]]: type بيطلّع أسماء الـ variants وقيمها من الـ cva.
- [[cn]]: من الدرس اللي فات.

## ٢. [[cva(base, config)]]

~~~text Button.tsx
const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50", {
~~~

الـ argument الأول هو الـ **base**: كلاسات بتتحط على كل زرار مهما كان شكله:

| الكلاس | يعني |
|---|---|
| [[inline-flex items-center justify-center]] | الأيقونة والكلام جنب بعض وفي النص |
| [[gap-2]] | 8px بين الأيقونة والكلام |
| [[rounded-lg]] | تدوير الأركان 8px |
| [[font-medium]] | وزن الخط 500، أتقل من العادي |
| [[disabled:opacity-50]] | لو عليه [[disabled]] يبقى نص شفاف |

والتاني object فيه ٣ حاجات:

### [[variants]]

~~~text Button.tsx
variants: {
  variant: { primary: "bg-brand text-white hover:bg-brand/90", outline: "border hover:bg-gray-50", ghost: "hover:bg-gray-100" },
  size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
},
~~~

- [[variant]] و [[size]] أسامي انت اللي اخترتها، ودي هتبقى أسامي الـ props.
- جوه كل واحد: اسم الاختيار وكلاساته. [[primary]] و [[outline]] و [[ghost]] (شفاف من غير border).
- [[hover:bg-brand/90]]: الـ [[/90]] بعد اللون = نفس اللون بشفافية 90٪.
- [[h-9]] و [[h-10]] و [[h-12]] = ارتفاع 36 و 40 و 48px (كل وحدة 4px).

### [[compoundVariants]]

~~~text Button.tsx
compoundVariants: [{ variant: "outline", size: "lg", class: "border-2" }],
~~~

array من «تركيبات»: الكلاس [[border-2]] بيتضاف بس لو [[variant]] هو outline **و** [[size]] هو lg مع بعض.

### [[defaultVariants]]

~~~text Button.tsx
defaultVariants: { variant: "primary", size: "md" },
~~~

لو اللي بيستخدم الزرار محددش، دي القيم.

### بتطلّع إيه؟

ناديناها وطبعنا الناتج:

~~~text الناتج
buttonVariants()
→ inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50 bg-brand text-white hover:bg-brand/90 h-10 px-4

buttonVariants({ variant: "outline", size: "lg" })
→ inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50 border hover:bg-gray-50 h-12 px-6 text-lg border-2
~~~

الترتيب دايمًا: base، وبعدين كلاسات الـ variant، وبعدين الـ size، وفي الآخر الـ compound. ولاحظ إن التانية فيها [[border]] و [[border-2]] الاتنين: cva بتلزق بس، مش بتحل تعارض.

---

## ٣. الـ type

~~~text Button.tsx
type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
~~~

من جوه لبرة:

1. [[typeof buttonVariants]]: [[typeof]] هنا (في مكان type) معناها «هات الـ type بتاع المتغير ده».
2. [[VariantProps<...>]]: يطلّع منه [[{ variant?: "primary" | "outline" | "ghost" | null; size?: "sm" | "md" | "lg" | null }]]. الـ [[?]] = اختياري، والـ [[|]] = «واحد من دول».
3. [[&]]: بيدمج الاتنين: كل props الزرار العادية **و** variant و size.

جربنا [[<Button variant="danger">]] و [[<Button size="xl">]] وشغّلنا [[tsc]]:

~~~text الناتج
error TS2322: Type '"danger"' is not assignable to type '"primary" | "outline" | "ghost" | null | undefined'.
error TS2322: Type '"xl"' is not assignable to type '"sm" | "md" | "lg" | null | undefined'.
~~~

## ٤. المكون

~~~text Button.tsx
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
~~~

- [[{ className, variant, size, ...props }]]: destructuring. بيطلّع التلاتة دول بأساميهم، و [[...props]] = «كل الباقي» ([[onClick]] و [[disabled]] و [[id]]...).
- [[buttonVariants({ variant, size })]]: الكلاسات من الجدول. و [[{ variant, size }]] اختصار [[{ variant: variant, size: size }]].
- [[cn(..., className)]]: الـ className اللي من برا آخر حاجة عشان يكسب، و cn بتشيل المتعارض.
- [[{...props}]]: يفرد الباقي على الـ [[<button>]] الحقيقي.

## ٥. القياس في Chrome

| الاستخدام | الارتفاع | padding جنب | border | حجم الخط |
|---|---|---|---|---|
| [[<Button>]] | 40 | 16px | 0 | 16px |
| [[<Button variant="outline" size="lg">]] | 48 | 24px | **2px** | 18px |
| [[<Button variant="ghost" size="sm" className="px-8">]] | 36 | **32px** | 0 | 14px |
| [[<Button disabled>]] | 40 | 16px | 0 | 16px و opacity 0.5 |

- التاني: الـ class النهائي فيه [[border-2]] بس، لأن cn شالت [[border]].
- التالت: [[px-8]] اللي من برا شال [[px-3]] بتاع sm، فالـ padding بقى 32px.
- الـ primary لونه [[oklch(0.55 0.2 265)]]، ووقت الـ hover بقى نفس اللون بـ [[/ 0.9]] (الشفافية).

## الخلاصة

| الجزء | بيعمل إيه |
|---|---|
| base | كلاسات كل الأشكال |
| [[variants]] | جدول الاختيارات: كل اسم وكلاساته |
| [[compoundVariants]] | كلاسات لتركيبة معينة |
| [[defaultVariants]] | القيم لو محدش حدد |
| [[VariantProps]] | الأسماء المسموحة لـ TypeScript |
| [[cn(..., className)]] | يحل التعارض ويخلي اللي من برا يكسب |`,
          lines: [
            "نوع الـ props بتاعة أي عنصر HTML.",
            R`استيراد [[cva]] نفسها، والنوع [[VariantProps]] اللي بيطلّع أسماء الاختيارات لـ TypeScript.`,
            "cn من الدرس اللي فات.",
            "الكلاسات اللي في كل الأشكال.",
            R`بداية [[variants]]: كل مفتاح جواه اسم prop، وكل قيمة جواه اختيار بكلاساته.`,
            "الشكل: 3 اختيارات، كل واحد وكلاساته.",
            R`الحجم: 3 اختيارات (sm و md و lg)، كل واحد بارتفاع و padding وخط.`,
            "قفلة variants.",
            "تركيبة معينة: outline و lg مع بعض بس ياخدوا border أتقل.",
            "لو محدش حدد: primary و md.",
            "قفلة.",
            R`props الزرار العادية + [[variant]] و [[size]] بأنواعهم من cva.`,
            R`الـ component نفسه: بياخد [[className]] و [[variant]] و [[size]]، والباقي ([[...props]]) بيروح للـ button.`,
            "cva تطلّع الكلاسات، و cn تدمج معاها الـ className اللي من برا.",
            "قفلة."
          ],
          sol: R`[[<Button variant="outline" size="lg">]] بيطلع زرار شفاف ليه border وارتفاعه 48px. الكلاسات اللي بيولّدها [[buttonVariants]] بالترتيب: الأساسية، وبعدين [[border hover:bg-gray-50]]، وبعدين [[h-12 px-6 text-lg]]، وفي الآخر [[border-2]] من الـ compoundVariants. و [[cn]] بيشيل [[border]] لأن [[border-2]] بيغطيه، فالـ border بيبقى 2px.

[[variant="danger"]] قبل ما تضيفه: TypeScript بيعترض بالرسالة دي بالظبط:
[[Type '"danger"' is not assignable to type '"primary" | "outline" | "ghost" | null | undefined'.]] (ترتيب الأسماء في الرسالة ممكن يختلف حسب نسخة TypeScript)
بعد ما تضيف [[danger]] للـ variants الخطأ بيختفي من غير ما تلمس الـ type، لأن [[VariantProps]] بيقرا الأنواع من الـ cva نفسه. والزرار بيطلع أحمر بنفس ارتفاع md لأن الـ size الافتراضي md.

لو TypeScript مااعترضش على danger، غالبًا الـ props متعرّفة [[any]] أو انت شايل [[VariantProps]] من الـ type. ولو الزرار طلع من غير ستايل، يبقى الكلاسات زي [[bg-brand]] مش متعرّفة في الـ theme.`,
          solCode: R`variants: {
  variant: {
    primary: "bg-brand text-white hover:bg-brand/90",
    outline: "border hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  },
  size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
},
// <Button variant="danger">امسح</Button>
// → ... bg-red-600 text-white hover:bg-red-700 h-10 px-4`
        },
        {
          cmd: "shadcn/ui",
          title: "مكتبة مكونات بتنسخ الكود عندك بدل ما تسطّبه",
          desc: R`shadcn/ui مش package بتسطّبه وتستورد منه. هو CLI بينسخ كود المكون نفسه في مشروعك ([[components/ui/button.tsx]])، فالكود بقى بتاعك: تعدّله وتغيّر شكله براحتك.

كل مكون مبني على primitive جاهز للـ accessibility (Radix UI أو Base UI) + Tailwind + cva. ومن يوليو 2026 الـ init الجديد بيختار Base UI افتراضيًا، و [[-b radix]] لو عايز Radix. المشاريع القديمة على Radix مش محتاجة تتغير.`,
          example: R`npx shadcn@latest init
npx shadcn@latest init -b radix --rtl
npx shadcn@latest add button dialog dropdown-menu
npx shadcn@latest add button --overwrite
cat components.json
git diff components/ui/button.tsx`,
          try: R`في مشروع Next أو Vite نفّذ init و [[add button]]، وافتح [[components/ui/button.tsx]]: هتلاقي cva و cn اللي اتعلمتهم. غيّر التدوير الافتراضي وشوفه اتغير في كل الزراير.`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من [[npx shadcn@latest add --help]]: أنهي flag بيوريك اللي هيتكتب من غير ما يكتب حاجة؟ وأنهي flag بيقارن ملفك بالنسخة الأصلية؟`, done: R`لقيت [[--dry-run]] (معاينة من غير كتابة) و [[--diff [path]]] (يوريك الفرق لملف) و [[--view [path]]] (يعرض المحتوى). جرّبت [[--dry-run]] على مكون جديد ومفيش ملف اتغيّر ([[git status]] نضيف).`, sol: R`~~~bash
npx shadcn@latest add --help
npx shadcn@latest add badge --dry-run
git status --short
npx shadcn@latest add button --diff src/components/ui/button.tsx
~~~

**الإجابة:** [[--dry-run]] بيوريك اللي هيتكتب من غير ما يكتب. و [[--diff [path]]] بيقارن ملفك بالنسخة الأصلية. و [[--view [path]]] بيعرض المحتوى.

**ليه ده مهم:** الكود هنا بتاعك انت، فأي تحديث هيكتب فوق تعديلاتك. الـ flags دي بتخليك تشوف قبل ما تقرر.

**الغلطة الشائعة:** تشغّل [[add]] على طول على مكوّن عدّلته. استخدم [[--diff]] الأول.

~~~text الناتج
من --help (shadcn 4.23.0):
-o, --overwrite    overwrite existing files. (default: false)
--dry-run          preview changes without writing files. (default: false)
--diff [path]      show diff for a file.
--view [path]      show file contents.

add badge --dry-run:
├ Files (1) +1 new
│ + src\components\ui\badge.tsx  create
└ Run without --dry-run to apply.

git status --short: فاضي
add button --diff ...: (skip) No changes.
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** في [[components/ui/button.tsx]] زوّد prop اسمه [[loading]]: بيعرض spinner صغير ويعمل [[disabled]] و [[aria-busy="true"]]، من غير ما تبوّظ أي variant موجود.`, done: R`[[git diff components/ui/button.tsx]] مش بيلمس بلوك [[cva]] خالص (التغيير كله في الـ function)، وكل الـ variants القديمة بتترسم زي ما هي، والزرار وهو [[loading]] مبيتضغطش و Tab بيعدّيه، وقارئ الشاشة بيقول إنه busy.`, sol: R`ملف shadcn النهائي بعد التعديل (السطور المهمة في الـ function تحت [[cva]]، وبلوك [[cva]] نفسه زي ما هو):

~~~tsx components/ui/button.tsx
function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />
      )}
      {children}
    </ButtonPrimitive>
  );
}
~~~

**ليه كده:**

- [[disabled={disabled || loading}]]: الزرار الواقف مبيتضغطش ومبيوصلهوش Tab. واللي مبعوت [[disabled]] من برا لسه شغال.
- [[aria-busy]]: قيمته [[undefined]] لما مفيش تحميل، فالـ attribute بيختفي.
- الـ spinner [[aria-hidden]]: زينة، والاسم فضل من [[children]].
- [[motion-reduce:animate-none]]: اللي طالب حركة أقل يشوف دايرة واقفة.
- [[children]] طلعت من [[props]] عشان تترسم بعد الـ spinner.

**الغلطة الشائعة:** تعدّل بلوك [[cva]]، فأي merge مع نسخة shadcn الجديدة يتعقد. خلي تعديلاتك في الـ function.

ملحوظة: النسخة الأحدث من shadcn بتيجي بـ [[@base-ui/react]]، وفي نسخ تانية بـ Radix. الفكرة واحدة.

~~~text الناتج
git diff --numstat: 12 إضافة ، 2 مسح (سطر الـ type وسطر قفل العنصر)
مفيش سطر جوه بلوك cva اتلمس

الزرار وهو loading:
disabled = true ، aria-busy = "true" ، الـ spinner موجود
ضغطة عليه: onClick اشتغل 0 مرة
Tab: عادي ← outline ← اللينك (عدّى الزرار الواقف)

ariaSnapshot:
- button "عادي"
- button "outline"
- button "بيحفظ" [disabled]
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** اعمل commit للتعديل اللي فوق، وبعدين شغّل [[add button --overwrite]] واعمل [[git diff]]، وبعدين رجّع نسختك بـ [[git checkout -- components/ui/button.tsx]].`, done: R`الـ diff بعد الـ overwrite بيوري سطور الـ [[loading]] بتاعتك متشالة، وبعد [[git checkout]] الـ diff فاضي تاني. وكتبت قاعدة لنفسك: commit قبل أي [[--overwrite]].`, sol: R`~~~bash
git add -A && git commit -m "button: loading prop"
npx shadcn@latest add button --overwrite --yes
git diff --numstat -- components/ui/button.tsx
git checkout -- components/ui/button.tsx
git diff --stat -- components/ui/button.tsx
~~~

**ليه الـ commit أول خطوة:** [[--overwrite]] بيكتب نسخة shadcn الأصلية فوق ملفك. [[git diff]] بيقارن بآخر commit، و [[git checkout]] بيرجّع آخر commit. لو تعديلك مش متعمله commit، مفيش حاجة ترجع لها.

جرّبت الحالتين: من غير commit، سطور الـ [[loading]] راحت، و [[git diff]] طلع فاضي، فالتعديل ضاع ومفيش حاجة تقولك.

**القاعدة:** commit قبل أي [[--overwrite]]، أو استخدم [[--diff]] وادمج بإيدك.

**الغلطة الشائعة:** تشوف diff فاضي بعد overwrite وتفتكر إن مفيش حاجة حصلت.

~~~text الناتج
من غير commit قبل الـ overwrite:
الملف فيه loading؟  لأ
git diff:           فاضي (التعديل ضاع)

مع commit:
git diff --numstat:  2  12  components/ui/button.tsx
                     (2 سطر رجعوا، و 12 سطر بتوعك اتشالوا)
بعد git checkout:    الـ diff فاضي ، والملف فيه loading تاني
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميل بيسأل: «ليه shadcn بينسخ الكود في مشروعي بدل ما يبقى package أعمله update؟». اكتبله ٣ سطور فيهم ميزة وعيب وإمتى تختار مكتبة عادية.`, done: R`السطور فيها: الكود بتاعك تعدّله براحتك (ميزة)، والتحديثات مش بتوصلك لوحدها وانت اللي بتدمجها بـ diff (عيب)، ومكتبة جاهزة أحسن لو مش ناوي تغيّر الشكل وعايز تحديثات تلقائي.`, sol: R`**الإجابة النموذجية:**

> shadcn بينسخ كود الزرار في مشروعك، فتقدر تغيّر أي سطر من غير ما تحارب مكتبة أو تكتب override.
> العيب إن التحديثات مش بتوصلك لوحدها: انت اللي بتشغّل [[--diff]] وتدمج، والإصلاحات الأمنية وباجات الـ accessibility مسؤوليتك.
> لو مش ناوي تغيّر الشكل وعايز تحديثات بـ [[npm update]] بس، مكتبة عادية زي MUI أحسن.

**ليه الإجابة دي كاملة:** فيها ميزة (ملكية الكود)، وعيب حقيقي (مين بيتابع التحديث)، ومعيار قرار. الإجابة اللي فيها «أحسن لأنه مرن» بس مش بتساعد زميلك يقرر.

**الغلطة الشائعة:** تقول إن shadcn مكتبة. هو أداة بتنسخ كود، والـ primitives اللي تحته (Radix أو Base UI) هي اللي packages وبتتحدّث عادي.

~~~text الناتج
٣ سطور: ميزة ، وعيب ، وإمتى تختار مكتبة عادية.
~~~` },
          ],
          deep: {
            why: R`مكتبات المكونات التقليدية بتديك مكون جاهز، ولما تيجي تغيّر حاجة مش متوقعة بتحارب المكتبة: props مش موجودة، و CSS بيتغلب بالعافية، وترقية تكسر شكلك. shadcn بيقلب الفكرة: «ده مش component library، ده الطريقة اللي تبني بيها الـ library بتاعتك». بيديك نقطة بداية كويسة والكود كله قدامك.`,
            how: R`الـ CLI بيقرا [[components.json]] عشان يعرف يحط الملفات فين، والـ aliases ([[@/components]] و [[@/lib/utils]])، وأنهي style ومكتبة. بعدين بيجيب كود المكون من الـ registry (JSON فيه الكود والـ dependencies)، ويكتبه في مشروعك، ويسطّب اللي محتاجه (زي [[radix-ui]] أو Base UI).

المكون نفسه طبقتين: primitive بيعمل السلوك والـ accessibility (focus trap، و Escape، و aria، والكيبورد) من غير أي شكل، و Tailwind + cva فوقه للشكل. انت بتعدّل الطبقة التانية براحتك، والأولى غالبًا متلمسهاش.

الألوان في shadcn متغيرات CSS ([[--primary]] و [[--background]] و [[--border]]) متوصّلة بـ [[@theme inline]]، فالكلاسات [[bg-primary]] و [[text-muted-foreground]]، وتغيير الثيم كله بيبقى تغيير المتغيرات.

و [[--rtl]] في الـ init (أو [[shadcn migrate rtl]] لمشروع قايم) بيحوّل الكلاسات الـ physical في المكونات لـ logical ([[ml-4]] لـ [[ms-4]])، ودا مهم لأي موقع عربي.

المقابل: مفيش [[npm update]] للمكونات. لو shadcn صلّح bug، انت اللي بتجيبه ([[add]] تاني وتدمج بإيدك).`,
            when: "مشروع React أو Next عايز مكونات جاهزة ومحترمة للـ accessibility وشكلها بتاعك. لو عايز كل حاجة جاهزة ومش هتعدّل، مكتبة تقليدية ممكن تبقى أسرع.",
            mistakes: R`تعامل [[components/ui]] كأنه node_modules متلمسوش، وتعمل wrapper فوق wrapper عشان تغيّر حاجة بسيطة: عدّل الملف نفسه، ده الهدف. أو العكس: [[add --overwrite]] بعد ما عدّلت فتضيع تعديلاتك. وتنسخ مكونات من مشروع قديم (Radix و Tailwind v3) لمشروع جديد (Base UI و v4) فالكلاسات والـ imports تتلخبط.`
          },
          teach: R`## CLI بيكتب كود في مشروعك

كل أمر في المثال بيعدّل ملفات في مشروعك: [[init]] بيجهّز، و [[add]] بينسخ مكونات. شغّلنا الأوامر دي على مشروع Vite + React + Tailwind 4.3.3 فاضي (shadcn 4.21.3، أكتوبر 2026)، ومتابعين كل تغيير بـ git. في Vite الكود بيتحط تحت [[src/]]، فـ [[components/ui]] بتبقى [[src/components/ui]].

---

## ١. [[npx shadcn@latest init]]

- [[npx]]: بيشغّل أمر من package على npm من غير ما تسطّبه global. بينزّله في cache ويشغّله.
- [[shadcn@latest]]: اسم الـ package، و [[@latest]] = آخر نسخة، عشان تاخد آخر registry.
- [[init]]: الأمر الفرعي اللي بيجهّز المشروع.

أول سؤال بيسأله اختيار الـ preset (الشكل العام):

~~~text الناتج
? Which preset would you like to use?
>   Nova - Lucide / Geist
    Vega
    Maia
    ...
~~~

ولو عايز من غير أسئلة: [[-p nova]]. شغّلنا [[init -p nova -y]] ([[-y]] = متسألنيش أكد) وبصينا على [[components.json]]:

~~~text components.json
"style": "base-nova",
"rtl": false,
~~~

[[base-nova]] يعني المكونات مبنية على **Base UI**، واتسطّب [[@base-ui/react]]. ده الافتراضي الجديد.

## ٢. [[npx shadcn@latest init -b radix --rtl]]

- [[-b radix]]: [[-b]] اختصار [[--base]]، يعني المكتبة اللي تحت المكونات. القيم: [[base]] و [[radix]] و [[aria]].
- [[--rtl]]: المكونات تتكتب بكلاسات logical عشان العربي.

شغّلناه بـ [[-p nova -y]] وده اللي طلع:

~~~text الناتج
✔ Verifying framework. Found Vite.
✔ Validating Tailwind CSS. Found v4.
✔ Validating import alias.
✔ Writing components.json.
✔ Installing dependencies.
✔ Created 1 file:
  - src\lib\utils.ts
✔ Updating src\index.css
~~~

| الملف | اتغير إزاي |
|---|---|
| [[components.json]] | جديد: [["style": "radix-nova"]] و [["rtl": true]] والـ aliases |
| [[package.json]] | اتضاف [[radix-ui]] و [[class-variance-authority]] و [[lucide-react]] و [[cn]] و [[tw-animate-css]] وغيرهم |
| [[src/lib/utils.ts]] | ملف جديد فيه [[cn]] (تحت) |
| [[src/index.css]] | اتضاف [[@theme inline]] و متغيرات الألوان في [[:root]] و [[.dark]] |

وحاجة جديدة: [[src/lib/utils.ts]] طلع سطر واحد:

~~~text src/lib/utils.ts
export { cn } from "cn"
~~~

يعني الـ CLI الجديد مش بيكتب [[clsx]] و [[twMerge]] زي درس [[cn()]]، بيستخدم package اسمه [[cn]] من shadcn بيعمل نفس الشغل. جربنا عليه نفس أمثلة الدرس ده وطلّع نفس النتايج بالظبط ([[cn("px-4", "p-2")]] ← [[p-2]]). المشاريع القديمة فيها الشكل الأول، والاتنين نفس الفكرة.

## ٣. [[npx shadcn@latest add button dialog dropdown-menu]]

[[add]] وبعده أسامي المكونات، أي عدد:

~~~text الناتج
✔ Created 3 files:
  - src\components\ui\button.tsx
  - src\components\ui\dropdown-menu.tsx
  - src\components\ui\dialog.tsx
~~~

افتح [[button.tsx]] هتلاقي اللي اتعلمته:

~~~text src/components/ui/button.tsx (مختصر)
const buttonVariants = cva("group/button inline-flex ... rounded-lg ...", {
  variants: {
    variant: { default: ..., outline: ..., secondary: ..., ghost: ..., destructive: ..., link: ... },
    size: { default: "h-8 ...", xs: ..., sm: ..., lg: ..., icon: "size-8", ... },
  },
  defaultVariants: { variant: "default", size: "default" },
})
...
className={cn(buttonVariants({ variant, size, className }))}
~~~

نفس [[cva]] بتاع الدرس اللي فات، والألوان أسامي متغيرات ([[bg-primary]] و [[text-primary-foreground]]) مش ألوان ثابتة.

وأثر [[--rtl]]: عملنا [[add dropdown-menu]] في مشروع من غير [[--rtl]] وقارنّا:

| من غير [[--rtl]] | بـ [[--rtl]] | يعني |
|---|---|---|
| [[ml-auto]] | [[ms-auto]] | margin على البداية بدل الشمال |
| [[pl-7]] | [[ps-7]] | padding على البداية بدل الشمال |
| [[pr-8]] | [[pe-8]] | padding على النهاية بدل اليمين |

## ٤. [[npx shadcn@latest add button --overwrite]]

[[--overwrite]] (أو [[-o]]) = اكتب فوق الملف الموجود. جربنا: غيّرنا [[rounded-lg]] لـ [[rounded-full]] في button.tsx، و [[git diff --stat]] طلّع:

~~~text الناتج قبل
 src/components/ui/button.tsx | 2 +-
~~~

بعد [[add button --overwrite]]: الـ CLI قال [[Updated 1 file]]، و [[git diff --stat]] طلع **فاضي**. تعديلك راح.

## ٥. [[cat components.json]]

[[cat]] بيطبع الملف. ده ملف إعدادات shadcn، والـ CLI بيقراه في كل [[add]]:

| المفتاح | يعني |
|---|---|
| [[style]] | المكتبة والـ preset ([[radix-nova]]) |
| [[tailwind.css]] | ملف الـ CSS اللي هيحط فيه المتغيرات |
| [[iconLibrary]] | [[lucide]]: مكتبة الأيقونات اللي المكونات بتستورد منها |
| [[rtl]] | يكتب logical ولا لأ |
| [[aliases]] | [[@/components/ui]] و [[@/lib/utils]]: فين يحط الملفات وإزاي يعمل import |

(على ويندوز PowerShell: [[cat]] شغال كاسم تاني لـ [[Get-Content]].)

## ٦. [[git diff components/ui/button.tsx]]

بيوريك الفرق بين الملف دلوقتي وآخر commit: السطور اللي اتشالت بـ [[-]] واللي اتضافت بـ [[+]]. عشان كده اعمل commit **قبل** أي [[--overwrite]]، فتقدر تشوف اللي اتمسح وترجّعه.

---

## ٧. التدوير من مكان واحد

في [[index.css]] فيه [[--radius: 0.625rem]] (10px)، و [[rounded-lg]] طالع في الـ CSS كده:

~~~text من الـ CSS الناتج
.rounded-lg{border-radius:var(--radius)}
~~~

قسنا الزراير في Chrome، وبعدين غيّرنا [[--radius]] لـ [[1rem]]:

| الزرار | قبل | بعد [[--radius: 1rem]] |
|---|---|---|
| [[size="default"]] | 10px | 16px |
| [[size="lg"]] | 10px | 16px |
| [[size="sm"]] | 8px | 12px |

الـ sm مكتوب فيه [[rounded-[min(var(--radius-md),12px)]]]: يعني أصغر قيمة من الاتنين، فمش بيعدّي 12px.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[init]] | [[components.json]] و [[lib/utils.ts]] والمتغيرات والـ packages |
| [[init -b radix --rtl]] | نفسه بس Radix بدل Base UI، ومكونات logical |
| [[add <names>]] | ينسخ كود المكونات في [[components/ui]] |
| [[add <name> --overwrite]] | يكتب الأصلي فوق نسختك |

- الكود بقى بتاعك: عدّله في الملف نفسه.
- commit قبل أي [[--overwrite]].`,
          lines: [
            R`يجهّز المشروع: [[components.json]]، و [[cn]] في lib/utils، ومتغيرات الألوان في الـ CSS.`,
            "نفسه بس بـ Radix بدل Base UI (الافتراضي الجديد)، ومكونات logical جاهزة للعربي.",
            "ينسخ كود المكونات دي في components/ui، ويسطّب الـ packages اللي محتاجاها.",
            "يرجّع النسخة الأصلية فوق نسختك. خد بالك: تعديلاتك هتروح.",
            "إعدادات shadcn: الـ style، والمكتبة، ومسارات الـ aliases، وملف الـ CSS.",
            "قبل ما تعمل commit، شوف الفرق بين نسختك والأصلية بعد الـ overwrite."
          ],
          sol: R`بعد [[init]] هتلاقي [[components.json]] و [[lib/utils.ts]] فيه [[cn]] (في المشاريع القديمة بـ clsx و twMerge زي درس [[cn()]]، والـ CLI الجديد بيكتب [[export { cn } from "cn"]] من package بنفس الشغل)، والـ globals.css اتضاف فيه متغيرات زي [[--radius]] و [[--primary]] و [[--background]]. بعد [[add button]] هتلاقي [[components/ui/button.tsx]] جواه [[const buttonVariants = cva(...)]] وفيه variants زي [[default]] و [[destructive]] و [[outline]] و [[secondary]] و [[ghost]] و [[link]]، وأحجام زي [[default]] و [[sm]] و [[lg]] و [[icon]]، والـ component بيعمل [[cn(buttonVariants({ variant, size, className }))]]. (الأسماء بالظبط ممكن تختلف حسب الـ style اللي اخترته في init.)

عشان تغيّر التدوير: فيه طريقتين. الأولى في button.tsx: غيّر [[rounded-lg]] في الـ string الأساسي لـ [[rounded-full]] مثلًا، وخلي بالك إن بعض الأحجام ممكن تكون كاتبة تدوير تاني جواها (في style nova الـ [[sm]] و [[xs]] فيهم [[rounded-[min(var(--radius-md),12px)]]])، فلازم تغيّرها هي كمان وإلا هتلاقي الزراير الصغيرة لسه زي ما هي. التانية في globals.css: غيّر [[--radius]] على [[:root]]، ودي بتغيّر كل المكونات مش الزراير بس، لأن [[rounded-md]] و [[rounded-lg]] محسوبين منه (قستها: [[--radius: 1rem]] خلّى الزرار العادي 16px بدل 10px).

بعد التعديل، [[git diff components/ui/button.tsx]] بيوريك التغيير بتاعك. ولو عملت [[add button --overwrite]] بعدين هيمسحه، ودي النقطة اللي تفرّق shadcn عن مكتبة متسطبة: الكود بتاعك وانت المسؤول عنه.`
        },
        {
          cmd: "Dialog",
          title: "مودال بيحترم الكيبورد وقارئ الشاشة من غير ما تكتبه",
          desc: R`الـ primitives (Radix أو Base UI) بتديك مكونات من غير شكل بس سلوكها كامل: الـ Dialog بيحبس الـ focus جواه، و Escape بيقفله، والـ focus بيرجع للزرار اللي فتحه، والصفحة اللي ورا مبتعملش scroll.

انت بتركّب الأجزاء ([[Root]] و [[Trigger]] و [[Portal]] و [[Overlay]] و [[Content]] و [[Title]]) وتحط عليهم كلاسات Tailwind.`,
          example: R`import { Dialog } from "radix-ui";
<Dialog.Root>
  <Dialog.Trigger className="rounded-lg bg-red-600 px-4 py-2 text-white">امسح</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 w-[min(90vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6">
      <Dialog.Title className="text-lg font-bold">متأكد؟</Dialog.Title>
      <Dialog.Description>الحذف مش هيترجع.</Dialog.Description>
      <Dialog.Close onClick={onConfirm}>أيوه امسح</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
          try: R`افتح المودال واضغط Tab كذا مرة: الـ focus مش هيخرج برا. دوس Escape: هيقفل والـ focus يرجع لزرار «امسح». وقارن ده بمودال معمول بـ [[useState]] و div.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** المودال بتاع الدرس مفتوح وفيه زرارين. هتدوس Tab ٥ مرات: الـ focus هيروح فين؟ وبعد Escape هيبقى فين؟ جرّب بالكيبورد وراقب [[document.activeElement]].`, done: R`الـ focus لف بين الزرارين جوه المودال بس (في المعمل: yes و no و yes و no و yes) ومطلعش للصفحة، وبعد Escape المودال اتشال والـ focus رجع لزرار «امسح» اللي فتحه.`, sol: R`~~~tsx ConfirmDialog.tsx
import { Dialog } from "radix-ui";

export function ConfirmDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger id="open" className="rounded-lg bg-red-700 px-4 py-2 text-white">امسح</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[min(90vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6">
          <Dialog.Title className="text-lg font-bold">متأكد؟</Dialog.Title>
          <Dialog.Description>الحذف مش هيترجع.</Dialog.Description>
          <div className="mt-4 flex gap-2">
            <Dialog.Close id="yes" className="rounded-lg bg-red-700 px-4 py-2 text-white">أيوه امسح</Dialog.Close>
            <Dialog.Close id="no" className="rounded-lg border px-4 py-2">لأ</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
~~~

~~~tsx main.tsx
import { createRoot } from "react-dom/client";
import { ConfirmDialog } from "./ConfirmDialog";

createRoot(document.getElementById("root")!).render(
  <main className="p-6">
    <h1 className="mb-4 text-2xl font-bold">الملفات</h1>
    <a href="#before" className="me-4">لينك قبل</a>
    <ConfirmDialog />
    <a href="#after" className="ms-4">لينك بعد</a>
  </main>
);
~~~

**بيحصل إيه:**

- أول ما المودال يفتح، Radix بينقل الـ focus لأول عنصر جواه.
- Tab عند آخر عنصر بيرجع لأول عنصر، ولينك «قبل» و «بعد» مبيتوصلوش. ده الـ focus trap.
- Escape بيقفل، و Radix فاكر مين فتحه، فبيرجّع الـ focus لزرار «امسح».

لو الـ focus مرجعش، مستخدم الكيبورد هيلاقي نفسه في أول الصفحة ويبدأ من الأول.

**الغلطة الشائعة:** تعدّ ٥ ضغطات وتفتكر إنها هتوصل لعنصر برا لأن المودال فيه زرارين بس. اللف جوه هو المطلوب.

~~~text الناتج
بعد الفتح: yes
Tab 1: no
Tab 2: yes
Tab 3: no
Tab 4: yes
Tab 5: no
aria-expanded على الزرار: true

بعد Escape: عدد [role=dialog] = 0 ، document.activeElement = زرار «امسح»
~~~

(ابتدينا من yes، فآخر وقفة هنا no. لو ابتدى من no الترتيب بيتقلب.)` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** Dialog من غير [[Dialog.Title]]. Radix 1.8.1 مش بيطبع أي تحذير في الـ Console، بس فيه حاجة ناقصة. لاقيها في Elements وفي Accessibility tree وصلّح من غير ما العنوان يبان على الشاشة.`, done: R`الـ [[role="dialog"]] مفيهوش [[aria-labelledby]] والـ dialog ملوش اسم في Accessibility tree. بعد [[<VisuallyHidden.Root asChild><Dialog.Title>...</Dialog.Title></VisuallyHidden.Root>]] (أو Title عادي) الـ attribute رجع والاسم ظهر، والشكل متغيرش.`, sol: R`~~~tsx main.tsx
import { createRoot } from "react-dom/client";
import { Dialog, VisuallyHidden } from "radix-ui";

function Modal({ id, children }: { id: string; children?: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger id={id}>افتح {id}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content aria-describedby={undefined} className="fixed inset-10 bg-white p-6">
          {children}
          <p>هتحذف الملف؟</p>
          <Dialog.Close>قفل</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

createRoot(document.getElementById("root")!).render(
  <main>
    <Modal id="bad" />
    <Modal id="good">
      <VisuallyHidden.Root asChild>
        <Dialog.Title>تأكيد الحذف</Dialog.Title>
      </VisuallyHidden.Root>
    </Modal>
  </main>
);
~~~

**اللي ناقص:** من غير [[Dialog.Title]]، الـ [[role="dialog"]] مفيهوش [[aria-labelledby]]، فقارئ الشاشة بيقول «dialog» بس، والمستخدم مش عارف ده مودال إيه.

**التصليح:** [[VisuallyHidden.Root asChild]] بيخفي العنوان من الشاشة بس، ويفضل في شجرة الـ accessibility. Radix بيربطه بـ [[aria-labelledby]] لوحده.

**ليه مش [[display: none]]:** ده بيشيله من شجرة الـ accessibility كمان، فالاسم يرجع يختفي.

**الغلطة الشائعة:** تعتمد على الكونسول. في Radix 1.8.1 مفيش ولا تحذير، في dev ولا production. لازم تبص بنفسك على الشجرة.

~~~text الناتج
من غير Title:
aria-labelledby = null
Console: مفيش تحذير (dev و production)
ariaSnapshot:
- dialog:
  - paragraph: هتحذف الملف؟
  - button "قفل"

مع VisuallyHidden:
aria-labelledby = radix-_r_4_
ariaSnapshot:
- dialog "تأكيد الحذف":
  - heading "تأكيد الحذف" [level=2]
  - paragraph: هتحذف الملف؟
  - button "قفل"
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** مودال معمول بـ [[useState]] و div، ومودال Radix، و [[<dialog>]] أصلي بـ [[showModal()]]. لكل واحد: Tab ٣ مرات، و Escape، والـ focus بعد القفل.`, done: R`عندك جدول ٣ × ٣: الـ div الـ Tab طلع لعناصر الصفحة ورا و Escape ملوش أثر، و Radix محبوس و Escape بيقفل والـ focus راجع للزرار، و [[<dialog>]] الـ Tab مش بيوصل لعناصر الصفحة و Escape بيقفل والـ focus راجع للزرار اللي فتحه.`, sol: R`~~~tsx main.tsx
import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ConfirmDialog } from "./ConfirmDialog";

function DivModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button id="open-div" onClick={() => setOpen(true)}>div</button>
      {open && (
        <div id="m-div" className="fixed inset-10 bg-white p-6">
          <button id="div-1">أيوه</button>
          <button id="div-2" onClick={() => setOpen(false)}>لأ</button>
        </div>
      )}
    </>
  );
}

function NativeModal() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button id="open-native" onClick={() => ref.current?.showModal()}>dialog</button>
      <dialog id="m-native" ref={ref} className="m-auto p-6">
        <button id="nat-1">أيوه</button>
        <button id="nat-2" onClick={() => ref.current?.close()}>لأ</button>
      </dialog>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <main className="flex gap-3 p-6">
    <DivModal />
    <ConfirmDialog />
    <NativeModal />
    <a id="after" href="#after">عنصر في الصفحة ورا</a>
  </main>
);
~~~

و [[ConfirmDialog]] هو بتاع التمرين الأول.

**القراية:**

- **div بـ useState:** ده مجرد عنصر في الصفحة. Tab بيعدّيه ويكمّل على اللي وراه، و Escape ملوش معنى، والـ focus مبيتحركش لوحده.
- **Radix:** كل حاجة جاهزة.
- **[[<dialog>]] مع [[showModal()]]:** المتصفح بيعمل [[inert]] للصفحة ورا المودال، و Escape بيقفل، والـ focus بيرجع لوحده. الفرق عن Radix إن Tab ممكن يروح لشريط المتصفح قبل ما يرجع (BODY في القياس)، وده طبيعي.

**ازاي تختار:** [[<dialog>]] لو عايز من غير مكتبة، و Radix لو عندك حركات ومشروع React كبير ومحتاج [[asChild]]. والـ div لأ.

**الغلطة الشائعة:** تزوّد [[role="dialog"]] على div وتفتكر إنه بقى مودال. الـ role بيغيّر الاسم بس، مش السلوك.

~~~text الناتج
                 Tab 3 مرات                 بعد Escape             الـ focus بعد القفل
div              زرارين ثم عنصر في الصفحة    لسه مفتوح              اتحرك لعنصر تاني
Radix            yes no yes no              اتقفل                  زرار الفتح
<dialog>         nat-1 nat-2 BODY nat-1     اتقفل                  زرار الفتح
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** Sheet (درج جانبي) بـ Dialog: [[Dialog.Content]] [[fixed inset-y-0 inset-e-0 w-80]]، وداخل بحركة من ناحية النهاية بـ [[data-[state=open]:]] و [[rtl:]]، وفيه لينكات القايمة.`, done: R`في rtl الدرج بيطلع من الشمال وفي ltr من اليمين، و [[data-state]] على الـ Content بتبقى [[open]] وهو مفتوح، والصفحة اللي ورا مبتعملش scroll ([[overflow: hidden]] على الـ body)، والـ focus جوه الدرج.`, sol: R`~~~css in.css
@import "tailwindcss";

@theme {
  --animate-in-end: in-end 0.3s ease-out;
  --animate-in-end-rtl: in-end-rtl 0.3s ease-out;
  @keyframes in-end { from { translate: 100% 0; } }
  @keyframes in-end-rtl { from { translate: -100% 0; } }
}
~~~

~~~tsx main.tsx
import { createRoot } from "react-dom/client";
import { Dialog } from "radix-ui";

function Sheet() {
  return (
    <Dialog.Root>
      <Dialog.Trigger id="open" className="rounded-lg border px-4 py-2">القايمة</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 inset-e-0 w-80 max-w-full bg-white p-6 transition-transform duration-300
                     data-[state=open]:animate-in-end rtl:data-[state=open]:animate-in-end-rtl"
        >
          <Dialog.Title className="text-lg font-bold">القايمة</Dialog.Title>
          <nav className="mt-4 grid gap-2">
            <a href="/products">المنتجات</a>
            <a href="/offers">العروض</a>
            <a href="/contact">كلّمنا</a>
          </nav>
          <Dialog.Close className="mt-6 rounded-lg border px-4 py-2">قفل</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

createRoot(document.getElementById("root")!).render(
  <main className="p-6">
    <h1 className="mb-4 text-2xl font-bold">الرئيسية</h1>
    <Sheet />
    <div className="h-[200vh]"></div>
  </main>
);
~~~

**ليه شغال:**

- [[inset-y-0 inset-e-0]]: logical، يعني ناحية النهاية. في rtl شمال، وفي ltr يمين، من غير ولا سطر زيادة.
- الحركة بـ [[translate]]، وده مش logical، فمحتاج keyframes لكل اتجاه: [[100%]] في ltr و [[-100%]] في rtl.
- [[data-[state=open]:animate-in-end]]: Radix بيحط [[data-state]]، فالحركة بتشتغل وقت الفتح بس.
- [[rtl:data-[state=open]:animate-in-end-rtl]] بتكسب في العربي لأنها أخص.
- قفل الـ scroll و حبس الـ focus بييجوا من Dialog ببلاش.

**الغلطة الشائعة:** تكتب [[translate: 100% 0]] ثابتة، فالدرج في العربي يدخل من الناحية الغلط أو يطلع برا الشاشة. جرّب [[dir]] الاتنين.

~~~text الناتج
                 left    right    الحركة          data-state
rtl              0       320      in-end-rtl      open
ltr              960     1280     in-end          open

وهو مفتوح في الاتجاهين:
body: overflow hidden ، data-scroll-locked موجود
wheel على الصفحة: scrollY = 0
الـ focus جوه الدرج: true
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** بـ Playwright: افتح المودال بـ Enter، وتأكد إن [[aria-expanded="true"]] على الـ trigger، و Tab ٥ مرات والـ focus جوه [[[role="dialog"]]]، و Escape يرجّع الـ focus للـ trigger.`, done: R`الاختبار بيعدّي، ولما تبدّل Radix بـ div الاختبار بيفشل في خطوة الـ Tab بالظبط (يعني بيمسك المشكلة اللي اتعمل عشانها). ولو شلت [[Dialog.Portal]] لوحده لسه بيعدّي، لأن حبس الـ focus مش معتمد عليه.`, sol: R`~~~js dialog.spec.mjs
import { test, expect } from "@playwright/test";

test("المودال بيحبس الـ focus ويرجّعه", async ({ page }) => {
  await page.goto(process.env.URL);
  // includeHidden: Radix بيحط aria-hidden على الصفحة ورا المودال، فالزرار بيختفي من شجرة الـ accessibility
  const trigger = page.getByRole("button", { name: "امسح", exact: true, includeHidden: true });

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    await expect(page.locator('[role="dialog"] :focus')).toHaveCount(1);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
~~~

~~~bash
npm i -D @playwright/test@1.64.1
URL=http://localhost:4000/ npx playwright test
~~~

**ليه [[exact]] و [[includeHidden]]:**

- [[exact: true]]: من غيرها الاسم «امسح» بيطابق «أيوه امسح» كمان، فـ Playwright بيقع بـ strict mode violation.
- [[includeHidden: true]]: وقت ما المودال مفتوح، Radix بيحط [[aria-hidden]] على الصفحة ورا. الزرار خرج من شجرة الـ accessibility، فـ [[getByRole]] العادية مش بتلاقيه. يعني الفشل ده دليل إن المودال شغال صح.

**[[page.locator('[role="dialog"] :focus')]]** بيتأكد إن العنصر اللي عليه focus جوه المودال بعد كل Tab.

**الاختبار بيمسك إيه فعلًا:** لما بدّلت Radix بـ div، وقع في خطوة الـ Tab. ولما شيلت [[Dialog.Portal]] لسه عدّى، لأن حبس الـ focus مش معتمد على الـ Portal. الـ Portal شغلته مكان الرسم و [[z-index]]، فلو عايز تحرسه محتاج اختبار تاني.

**الغلطة الشائعة:** تستخدم [[waitForTimeout]] بعد كل ضغطة. [[expect]] بيستنى لوحده.

~~~text الناتج
Radix بتاع الدرس:     1 passed (1.3s)
من غير Dialog.Portal:  1 passed (1.2s)
div بدل Radix:         1 failed
  > await expect(page.locator('[role="dialog"] :focus')).toHaveCount(1);
~~~` },
          ],
          deep: {
            why: R`مودال «بسيط» بـ div و useState بيبان شغال بالماوس، بس: الـ Tab بيخرج للصفحة اللي ورا، و Escape مش شغال، والـ focus بيضيع بعد ما يقفل، وقارئ الشاشة مش عارف إن فيه dialog، والصفحة ورا بتعمل scroll. تظبيط ده كله صح عشرات السطور وحالات كتير، والـ primitives مكتوبة ومتجرّبة.`,
            how: R`الـ Dialog بيطبّق نمط الـ dialog بتاع WAI-ARIA: لما يفتح بيحط الـ focus جواه، وبيحبس الـ Tab و Shift+Tab جواه (focus trap)، وبيخفي باقي الصفحة عن قارئ الشاشة، وبيقفل الـ scroll بتاع الـ body. ولما يقفل بيرجّع الـ focus للـ Trigger. والـ Content عليه [[role="dialog"]] ومربوط بالعنوان والوصف لوحده.

الأجزاء بتتكلم مع بعض بـ React context جوه الـ Root، فتقدر تحط الـ Trigger في أي مكان جواه. و [[asChild]] على أي جزء بيخليه يلبس سلوكه على العنصر اللي جواه بدل ما يعمل عنصر جديد: [[<Dialog.Trigger asChild><Button>...</Button></Dialog.Trigger>]].

الحالة بتظهر كـ attribute: [[data-state="open"]] أو [[closed]]، فتعمل animations بـ Tailwind: [[data-[state=open]:opacity-100]].

ونفس الفكرة في DropdownMenu (أسهم الكيبورد، والبحث بأول حرف، والقفل لما تضغط برا)، و Popover، و Tooltip، و Tabs، و Select. وفي موقع عربي، [[Direction.Provider]] بـ [[dir="rtl"]] بيخلي أسهم الكيبورد في القوايم تمشي في الاتجاه الصح.`,
            when: "أي مودال أو dropdown أو popover أو tabs أو tooltip. متكتبش السلوك ده بنفسك إلا لو بتتعلم. وفي مشروع shadcn هتلاقيهم متغلّفين جاهزين في components/ui.",
            mistakes: R`تشيل [[Dialog.Title]] لأن التصميم مفيهوش عنوان، فالـ dialog يبقى من غير اسم وقارئ الشاشة يقول «dialog» وخلاص. نسخ Radix القديمة كانت بتطلّع تحذير في الكونسول، بس radix-ui 1.7 مبقتش بتطلّعه (جربناها)، فمحدش هينبهك: خليه وخبّيه بصريًا ([[sr-only]]). و [[asChild]] على مكون مش بيعدّي الـ props والـ ref للعنصر، فالزرار مش بيفتح حاجة. وفي مشروع حقيقي dropdown كان معمول بإيدك بـ [[mousedown]] على الـ document عشان يقفل لما تضغط برا: مفيش Escape ولا أسهم ولا إدارة focus، ودا بالظبط اللي DropdownMenu بيحله.`
          },
          teach: R`## أجزاء بتتكلم مع بعض

كل [[Dialog.Something]] في المثال قطعة ليها شغلانة، والـ [[Root]] بيربطهم. انت بتحط الشكل بكلاسات Tailwind، و Radix بيحط السلوك والـ attributes. حطينا المثال في مشروع Vite ([[radix-ui]] 1.7.0، و React 19.3، و Tailwind 4.3.3) جوه صفحة [[dir="rtl"]] عرضها 800 وطولها 600، و [[onConfirm]] دالة بتعدّ مرات الضغط، وجربنا بالكيبورد والماوس في Chrome.

---

## ١. [[import { Dialog } from "radix-ui";]]

[[radix-ui]] package واحد فيه كل الـ primitives. [[Dialog]] object جواه القطع كلها: [[Dialog.Root]] و [[Dialog.Trigger]] وهكذا. والنقطة معناها «القطعة اللي اسمها كذا جوه Dialog».

## ٢. [[<Dialog.Root>]]

مش بيرسم أي عنصر في الصفحة. شايل حالة «مفتوح ولا مقفول»، وبيدّيها لكل القطع اللي جواه (React context). عشان كده كل القطع لازم تبقى جواه.

## ٣. [[<Dialog.Trigger>]]

بيرسم [[<button>]] حقيقي. ده الـ HTML اللي طلع قبل وبعد الفتح:

~~~text attributes الزرار
مقفول:  type=button aria-haspopup=dialog aria-expanded=false data-state=closed
مفتوح:  type=button aria-haspopup=dialog aria-expanded=true  data-state=open  aria-controls=radix-_r_0_
~~~

| الـ attribute | يعني |
|---|---|
| [[type=button]] | لو جوه form ميبعتوش |
| [[aria-haspopup=dialog]] | قارئ الشاشة يقول إن الزرار بيفتح dialog |
| [[aria-expanded]] | مفتوح ولا لأ |
| [[data-state]] | نفس المعلومة للـ CSS: [[data-[state=open]:...]] في Tailwind |
| [[aria-controls]] | الـ id بتاع المودال اللي بيتحكم فيه |

## ٤. [[<Dialog.Portal>]]

كل اللي جواه بيترسم كآخر حاجة في [[<body>]] مش مكانه في الكود. قسنا: الأب بتاع المودال طلع [[BODY]]. ليه؟ لو أي أب فوقه عليه [[overflow: hidden]] أو [[transform]]، الـ [[fixed]] ممكن يتقص أو يتحسب من الأب ده بدل الشاشة. برا كل ده مفيش مشكلة.

## ٥. [[<Dialog.Overlay className="fixed inset-0 bg-black/50" />]]

- [[fixed]]: ثابت على الشاشة مش بيتحرك مع الـ scroll.
- [[inset-0]]: [[top]] و [[right]] و [[bottom]] و [[left]] كلهم 0، فبيغطي الشاشة كلها.
- [[bg-black/50]]: أسود بشفافية 50٪. في Chrome: [[oklab(0 0 0 / 0.5)]].

ضغطنا بالماوس على الخلفية برا الصندوق: المودال اتقفل.

## ٦. [[<Dialog.Content className="...">]]

الصندوق نفسه. الكلاسات:

| الكلاس | يعني |
|---|---|
| [[fixed top-1/2 left-1/2]] | الركن الفوقاني الشمال في نص الشاشة |
| [[-translate-x-1/2 -translate-y-1/2]] | ارجع نص عرضك ونص طولك، فالـ **نص** بتاعك يبقى في نص الشاشة |
| [[w-[min(90vw,28rem)]]] | العرض الأصغر من: 90٪ من عرض الشاشة، أو 28rem (448px) |
| [[rounded-xl bg-white p-6]] | تدوير، وأبيض، و padding 24px |

القياس: الصندوق [[x=176 y=238]] وعرضه 448 وطوله 124. الشاشة 800، و 90vw = 720 أكبر من 448، فالعرض 448. و (800 − 448) ÷ 2 = 176، يعني في النص بالظبط.

والـ attributes اللي Radix حطها عليه:

~~~text attributes الصندوق
role=dialog  id=radix-_r_0_  data-state=open  tabindex=-1
aria-labelledby=radix-_r_1_  aria-describedby=radix-_r_2_
~~~

- [[role=dialog]]: قارئ الشاشة يعرف إنه dialog.
- [[aria-labelledby]]: بيشاور على id الـ Title، فاسم الـ dialog = «متأكد؟».
- [[aria-describedby]]: بيشاور على الـ Description.
- [[tabindex=-1]]: يقدر ياخد focus بالكود من غير ما يدخل في ترتيب الـ Tab.

## ٧. [[Dialog.Title]] و [[Dialog.Description]]

الـ Title بيترسم [[<h2>]]، والـ Description [[<p>]]. ده الـ Accessibility tree اللي Chrome شايفه وهو مفتوح:

~~~text الناتج
- dialog "متأكد؟":
  - heading "متأكد؟" [level=2]
  - paragraph: الحذف مش هيترجع.
  - button "أيوه امسح"
~~~

وجربنا نشيل الـ Title: بقى [[- dialog:]] من غير اسم، ومفيش أي تحذير في الـ Console (radix-ui 1.7).

## ٨. [[<Dialog.Close onClick={onConfirm}>]]

زرار بيقفل المودال. و [[onClick]] بتاعك بيشتغل الأول: ضغطناه، المودال اتقفل، والعداد بقى 1، والـ focus رجع لزرار «امسح».

---

## ٩. السلوك اللي جه ببلاش

فتحنا بالكيبورد (Enter على «امسح») وقسنا:

| التجربة | النتيجة |
|---|---|
| الـ focus بعد الفتح | زرار «أيوه امسح» (أول حاجة ينفع تاخد focus جوه) |
| Tab خمس مرات | فضل على «أيوه امسح» كل مرة (الوحيد جوه) |
| Shift+Tab | نفس الزرار |
| [[#root]] (باقي الصفحة) | [[aria-hidden="true"]] و [[pointer-events: none]] |
| الـ body | [[overflow: hidden]] و [[data-scroll-locked]] |
| scroll بالماوس 500px | [[scrollY]] فضل 0 |
| Escape | المودال اتشال من الصفحة، والـ focus رجع لـ «امسح»، و [[aria-expanded=false]] |
| scroll بعد القفل | [[scrollY]] بقى 500 |

- **focus trap**: الـ Tab محبوس جوه المودال.
- [[aria-hidden]] على باقي الصفحة: قارئ الشاشة مش هيقرا اللي ورا.
- قفل الـ scroll: الصفحة اللي ورا متتحركش.
- رجوع الـ focus: الكيبورد يكمّل من نفس المكان.

## الخلاصة

| القطعة | بترسم | شغلتها |
|---|---|---|
| [[Root]] | ولا حاجة | الحالة |
| [[Trigger]] | [[<button>]] | يفتح، وعليه [[aria-expanded]] |
| [[Portal]] | ولا حاجة | يطلّع المودال لآخر الـ body |
| [[Overlay]] | [[<div>]] | الخلفية، والضغط عليها يقفل |
| [[Content]] | [[<div role="dialog">]] | الصندوق والـ focus trap |
| [[Title]] / [[Description]] | [[<h2>]] / [[<p>]] | اسم ووصف الـ dialog |
| [[Close]] | [[<button>]] | يقفل |

- متشيلش الـ Title: من غيره الـ dialog ملوش اسم، ومفيش تحذير ينبهك.
- انت بتكتب الشكل بس، والسلوك كله من Radix.`,
          lines: [
            R`الـ package الموحّد بتاع Radix (أو [[@radix-ui/react-dialog]] في المشاريع القديمة).`,
            R`الـ Root: شايل حالة مفتوح ومقفول. تقدر تتحكم فيها بـ [[open]] و [[onOpenChange]].`,
            R`زرار الفتح: [[<button>]] حقيقي عليه [[aria-expanded]].`,
            "بيطلّع المودال في آخر الـ body، برا أي transform أو overflow أو z-index ممكن يحبسه.",
            "الخلفية الغامقة، والضغط عليها بيقفل.",
            "صندوق المودال في نص الشاشة.",
            "العنوان: قارئ الشاشة بيقوله أول ما المودال يفتح.",
            "الوصف: بيتقري بعد العنوان.",
            "زرار بيقفل، وهنا كمان بينفّذ الحذف.",
            R`قفلة [[Dialog.Content]]: الـ focus هيفضل محبوس جوه اللي فوق ده بس.`,
            R`قفلة [[Dialog.Portal]]: كل اللي جواه اتنقل لآخر الـ body.`,
            R`قفلة [[Dialog.Root]]، وكده المودال كامل بسلوكه.`
          ],
          sol: R`أول ما تدوس «امسح»: المودال بيفتح والـ focus بيروح على أول عنصر ممكن يتوصله جواه (زرار «أيوه امسح»). اضغط Tab كذا مرة: الـ focus بيلف جوه المودال وعمره ما يخرج (في تجربتي 5 Tabs ورا بعض فضلوا على نفس الزرار لأنه الوحيد جواه). الـ Content عليه [[role="dialog"]] واسمه «متأكد؟» جاي من [[Dialog.Title]]، وباقي الصفحة عليها [[aria-hidden]] ومبتقبلش الماوس.

Escape: المودال بيقفل والـ focus بيرجع على زرار «امسح» نفسه، فقارئ الشاشة والكيبورد بيكمّلوا من نفس المكان.

المودال المعمول بـ [[useState]] و div: Tab بيطلع من المودال على طول ويوصل لعناصر الصفحة اللي ورا (في تجربتي راح للـ body وبعدين لزرار الـ trigger ولينك تحت)، و Escape مش بيعمل أي حاجة، ولما يقفل الـ focus بيضيع على الـ body. كل ده انت كنت هتكتبه بإيدك. ولو شلت الـ Title، الـ dialog بيظهر في الـ Accessibility tree من غير اسم (نسخ Radix القديمة كانت بتطلّع تحذير في الـ Console إن [[DialogContent]] محتاج [[DialogTitle]]، و radix-ui 1.7 مبقتش بتطلّعه)؛ حطه ولو مخفي بـ [[VisuallyHidden]] أو [[sr-only]].`
        }
      ]
    }
]);
