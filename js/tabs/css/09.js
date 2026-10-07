// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "مكونات بتتعاد: cn و cva و shadcn",
      l: 2,
      n: "cn بيدمج الكلاسات، و cva بيعمل variants، و shadcn بينسخ مكونات accessible جاهزة في مشروعك",
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

| [[isActive]] و [[disabled]] | الناتج |
|---|---|
| الاتنين [[true]] | [[px-4 py-2 bg-brand text-white opacity-50]] |
| الاتنين [[false]] | [[px-4 py-2]] |

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

| [[className]] | الناتج |
|---|---|
| [["text-red-600"]] | [[text-sm text-red-600]] (اللون اتغير والحجم فضل) |
| [["text-base"]] | [[text-gray-600 text-base]] (الحجم اتغير واللون فضل) |
| [[undefined]] | [[text-sm text-gray-600]] |

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
| [[rounded-lg]] | تدوير 8px |
| [[font-medium]] | وزن 500 |
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
| [[variants]] | جدول الاختيارات |
| [[compoundVariants]] | كلاسات لتركيبة معينة |
| [[defaultVariants]] | القيم لو محدش حدد |
| [[VariantProps]] | الأسماء المسموحة لـ TypeScript |
| [[cn(..., className)]] | يحل التعارض ويخلي اللي من برا يكسب |`,
          lines: [
            "نوع الـ props بتاعة أي عنصر HTML.",
            "استيراد cva والنوع.",
            "cn من الدرس اللي فات.",
            "الكلاسات اللي في كل الأشكال.",
            "الـ variants.",
            "الشكل: 3 اختيارات، كل واحد وكلاساته.",
            "الحجم: 3 اختيارات.",
            "قفلة variants.",
            "تركيبة معينة: outline و lg مع بعض بس ياخدوا border أتقل.",
            "لو محدش حدد: primary و md.",
            "قفلة.",
            R`props الزرار العادية + [[variant]] و [[size]] بأنواعهم من cva.`,
            "المكون.",
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
| [[src/lib/utils.ts]] | جديد |
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

| من غير [[--rtl]] | بـ [[--rtl]] |
|---|---|
| [[ml-auto]] | [[ms-auto]] |
| [[pl-7]] | [[ps-7]] |
| [[pr-8]] | [[pe-8]] |

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
| [[iconLibrary]] | [[lucide]] |
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
            "قفلة Content.",
            "قفلة Portal.",
            "قفلة Root."
          ],
          sol: R`أول ما تدوس «امسح»: المودال بيفتح والـ focus بيروح على أول عنصر ممكن يتوصله جواه (زرار «أيوه امسح»). اضغط Tab كذا مرة: الـ focus بيلف جوه المودال وعمره ما يخرج (في تجربتي 5 Tabs ورا بعض فضلوا على نفس الزرار لأنه الوحيد جواه). الـ Content عليه [[role="dialog"]] واسمه «متأكد؟» جاي من [[Dialog.Title]]، وباقي الصفحة عليها [[aria-hidden]] ومبتقبلش الماوس.

Escape: المودال بيقفل والـ focus بيرجع على زرار «امسح» نفسه، فقارئ الشاشة والكيبورد بيكمّلوا من نفس المكان.

المودال المعمول بـ [[useState]] و div: Tab بيطلع من المودال على طول ويوصل لعناصر الصفحة اللي ورا (في تجربتي راح للـ body وبعدين لزرار الـ trigger ولينك تحت)، و Escape مش بيعمل أي حاجة، ولما يقفل الـ focus بيضيع على الـ body. كل ده انت كنت هتكتبه بإيدك. ولو شلت الـ Title، الـ dialog بيظهر في الـ Accessibility tree من غير اسم (نسخ Radix القديمة كانت بتطلّع تحذير في الـ Console إن [[DialogContent]] محتاج [[DialogTitle]]، و radix-ui 1.7 مبقتش بتطلّعه)؛ حطه ولو مخفي بـ [[VisuallyHidden]] أو [[sr-only]].`
        }
      ]
    }
]);
