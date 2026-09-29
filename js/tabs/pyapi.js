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

TAB("pyapi", {
  label: "Python و FastAPI",
  prompt: "$ ",
  lab: R`python3 -m venv .venv && source .venv/bin/activate
pip install "fastapi[standard]"
fastapi dev main.py`,
  labText: "تاب Python بيغطي venv و pip و pytest؛ هنا اللغة نفسها وبناء API. fastapi dev بيفتح docs تفاعلية على /docs.",
  levels: {"1":["اللغة","الأنواع، و lists و dicts، والدوال، والـ classes، والـ modules"],"2":["FastAPI","routes و pydantic و dependencies و errors و async"],"3":["الإنتاج والانترفيو","قاعدة بيانات، و background tasks، و httpx، والأداء، وأسئلة الانترفيو"]},
  categories: []
});
