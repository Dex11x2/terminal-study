// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("next", {
  label: "Next.js",
  prompt: "$ ",
  lab: R`npx create-next-app@latest next-lab
cd next-lab
npm run dev`,
  labText: "create-next-app بيسألك أسئلة: اختار TypeScript و Tailwind و App Router. كل تجارب التاب ده على المشروع ده.",
  levels: {"1":["الأساس","routing بالفولدرات، و layouts، و server و client components"],"2":["الداتا","fetching، والكاش، و server actions، و route handlers، و auth، و middleware"],"3":["الإنتاج والانترفيو","SEO و metadata، و i18n، والأداء، والنشر، وأسئلة الانترفيو"]},
  categories: []
});
