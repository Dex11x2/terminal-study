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
[[Type '"danger"' is not assignable to type '"ghost" | "outline" | "primary" | null | undefined'.]]
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
          lines: [
            R`يجهّز المشروع: [[components.json]]، و [[cn]] في lib/utils، ومتغيرات الألوان في الـ CSS.`,
            "نفسه بس بـ Radix بدل Base UI (الافتراضي الجديد)، ومكونات logical جاهزة للعربي.",
            "ينسخ كود المكونات دي في components/ui، ويسطّب الـ packages اللي محتاجاها.",
            "يرجّع النسخة الأصلية فوق نسختك. خد بالك: تعديلاتك هتروح.",
            "إعدادات shadcn: الـ style، والمكتبة، ومسارات الـ aliases، وملف الـ CSS.",
            "قبل ما تعمل commit، شوف الفرق بين نسختك والأصلية بعد الـ overwrite."
          ],
          sol: R`بعد [[init]] هتلاقي [[components.json]] و [[lib/utils.ts]] فيه [[cn]] بالظبط زي درس [[cn()]]، والـ globals.css اتضاف فيه متغيرات زي [[--radius]] و [[--primary]] و [[--background]]. بعد [[add button]] هتلاقي [[components/ui/button.tsx]] جواه [[const buttonVariants = cva(...)]] وفيه variants زي [[default]] و [[destructive]] و [[outline]] و [[secondary]] و [[ghost]] و [[link]]، وأحجام زي [[default]] و [[sm]] و [[lg]] و [[icon]]، والـ component بيعمل [[cn(buttonVariants({ variant, size, className }))]]. (الأسماء بالظبط ممكن تختلف حسب الـ style اللي اخترته في init.)

عشان تغيّر التدوير: فيه طريقتين. الأولى في button.tsx: غيّر [[rounded-md]] في الـ string الأساسي لـ [[rounded-full]] مثلًا، وخلي بالك إن بعض الأحجام ([[sm]] و [[lg]]) ممكن تكون كاتبة [[rounded-md]] تاني جواها، فلازم تغيّرها هي كمان وإلا هتلاقي الزراير الكبيرة والصغيرة لسه زي ما هي. التانية في globals.css: غيّر [[--radius]] على [[:root]]، ودي بتغيّر كل المكونات مش الزراير بس، لأن [[rounded-md]] و [[rounded-lg]] محسوبين منه.

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
            mistakes: R`تشيل [[Dialog.Title]] لأن التصميم مفيهوش عنوان، و Radix يطلّع تحذير في الكونسول: خليه وخبّيه بصريًا ([[sr-only]]). و [[asChild]] على مكون مش بيعدّي الـ props والـ ref للعنصر، فالزرار مش بيفتح حاجة. وفي مشروع حقيقي dropdown كان معمول بإيدك بـ [[mousedown]] على الـ document عشان يقفل لما تضغط برا: مفيش Escape ولا أسهم ولا إدارة focus، ودا بالظبط اللي DropdownMenu بيحله.`
          },
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

المودال المعمول بـ [[useState]] و div: Tab بيطلع من المودال على طول ويوصل لعناصر الصفحة اللي ورا (في تجربتي راح للـ body وبعدين لزرار الـ trigger ولينك تحت)، و Escape مش بيعمل أي حاجة، ولما يقفل الـ focus بيضيع على الـ body. كل ده انت كنت هتكتبه بإيدك. ولو Radix طلّع تحذير في الـ Console إن [[DialogContent]] محتاج [[DialogTitle]]، يبقى نسيت الـ Title؛ حطه ولو مخفي بـ [[VisuallyHidden]].`
        }
      ]
    },
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
    },
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
          lines: [
            R`لينك التخطي: مخفي بـ [[sr-only]]، وأول ما ياخد focus بيظهر فوق في ركن البداية.`,
            "النص.",
            "قفلة.",
            R`المحتوى. [[tabIndex={-1}]] عشان الـ focus يتنقل له فعلًا لما تدوس اللينك.`,
            "زرار عليه outline واضح بلون البراند، لما ييجي من الكيبورد بس.",
            "أو قاعدة واحدة للموقع كله: أي عنصر ياخد focus من الكيبورد عليه outline."
          ],
          sol: R`دي تجربة ملهاش إجابة واحدة، بس النتيجة الكويسة شكلها قايمة زي دي: «بعد ما فتحت المودال الـ focus فضل ورا على الصفحة»، «زرار إغلاق المنيو مش بيتوصله»، «الـ dropdown بيفتح بالماوس بس»، «بعد ما المودال يقفل الـ focus بيروح لأول الصفحة»، «الـ outline مختفي على الزراير لأن فيه [[outline: none]] في الـ CSS»، «ترتيب الـ Tab بيقفز من الهيدر للفوتر بسبب [[tabindex]] موجب». كل واحدة منهم bug حقيقي تصلّحه.

أول ما الصفحة تفتح وتدوس Tab: لينك «تخطى للمحتوى» بيظهر فوق في الركن ناحية بداية السطر (يمين في العربي) على خلفية بيضا. Enter: الصفحة بتنزل للـ main والـ Tab اللي بعده بيبدأ من جوه المحتوى مش من الهيدر، وده سبب [[tabIndex={-1}]] على الـ main. ولو دوست عليه بالماوس (نادر) مش هيبان outline، بالكيبورد هتلاقي outline الـ brand بـ offset 2px.

لو لينك التخطي مظهرش، اتأكد إنه أول عنصر في الـ body فعلًا وإن مفيش حاجة قبله بتاخد الـ focus (زي بانر الكوكيز)، وإن [[focus:not-sr-only]] مكتوبة صح.`
        },
        {
          cmd: "contrast ratio",
          title: "الكلام الرمادي الفاتح اللي محدش بيعرف يقراه",
          desc: R`التباين نسبة بين إضاءة لون الكلام ولون الخلفية، من 1:1 (نفس اللون) لـ 21:1 (أسود على أبيض). WCAG AA بيطلب [[4.5:1]] للكلام العادي، و [[3:1]] للكلام الكبير (حوالي 24px، أو 18.5px bold) ولحدود الحقول والأيقونات المهمة.

أشهر مشكلة: [[text-gray-400]] على أبيض عشان «شيك». نسبته حوالي 2.5:1، يعني ساقط.`,
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
          lines: [
            "رمادي 500 على أبيض: حوالي 4.8:1، عدّى للكلام العادي.",
            "رمادي 400 على أبيض: حوالي 2.5:1، ساقط. حتى الـ placeholder المفروض يبقى مقروء.",
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

الغلط الشائع: تقيس placeholder أو كلام disabled وتفتكره مشكلة لازم تتحل؛ الـ disabled مستثنى من القاعدة، لكن الـ placeholder لو هو الـ label الوحيد يبقى لازم يعدّي. وبرضه Lighthouse مش بيعرف يقيس الكلام اللي فوق صورة، فده لازم تبص عليه بعينك.`
        }
      ]
    },
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
          sol: R`لما جربنا الصفحة دي بـ axe-core: مسك [[image-alt]] (الصورة من غير alt) و [[button-name]] (الزرار اللي فيه أيقونة بس)، الاتنين critical. والتباين بيطلع violation في المتصفح الحقيقي ([[color-contrast]]، حوالي 2.3:1). يعني 3 من 5.

اللي فات: الـ input اللي عليه placeholder بس، axe بيعتبر الـ placeholder اسم فمبيقولش حاجة (مع إن الـ placeholder مش بديل للـ label، شوف درس «form و label»). والـ div اللي عليه onclick مبيظهرش خالص لأن الأداة مش عارفة إنه المفروض يبقى زرار.

Lighthouse بيطلّع نفس النتيجة تقريبًا، والـ score ممكن يفضل عالي. الدرس: 2 من 5 مشاكل حقيقية عدّوا من الأداة.`
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

والاختبار بيفشل برسالة زي: [[Unable to find an accessible element with the role "button" and name "حفظ"]] وتحتها «There are no accessible roles». ودا بالظبط اللي قارئ الشاشة شايفه: مفيش زرار.

الحل: [[<button type="button" onClick={save}>حفظ</button>]] والاختبار والـ lint الاتنين يعدّوا.`
        },
        {
          cmd: "كيبورد وقارئ شاشة",
          title: "الـ checklist اليدوي: كيبورد بس، و NVDA و VoiceOver",
          desc: R`الفحص اليدوي هو اللي بيمسك الباقي. أولًا الكيبورد (5 دقايق لكل صفحة): شيل الماوس، ودوس Tab من أول الصفحة لآخرها. كل حاجة بتتضغط بتتوصل؟ الـ focus باين دايمًا؟ الترتيب زي ترتيب القراية؟ Enter و Space بيشغّلوا الأزرار؟ Escape بيقفل المودال والـ focus بيرجع للزرار؟ مفيش مكان بتدخله ومتعرفش تخرج؟

ثانيًا قارئ الشاشة للمسارات المهمة (التسجيل، والدفع): NVDA على ويندوز (مجاني) مع Chrome أو Firefox، و VoiceOver على الماك والآيفون. اسمع: كل حاجة ليها اسم؟ العناوين بالترتيب؟ الأخطاء بتتقري؟

المثال تحت أهم الاختصارات عشان تبدأ.`,
          example: R`Tab / Shift+Tab           العنصر اللي بعده / قبله
Enter / Space            شغّل الزرار أو اللينك أو الـ checkbox
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
    },
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
