// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها، والـ backtick اكتبه $__bt.

TAB("career", {
  label: "الشغل والكارير",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/career && cd ~/lab/career
git init`,
  labText: "الأمثلة هنا ملفات حقيقية هتستخدمها: README، و CV، ورسايل، وشيت تقديمات، وعقد فريلانس. احفظ كل واحد في فولدر career، وخليه repo خاص على GitHub، وحدّثه كل شهر. الأرقام والمواقع والقوانين بتختلف من وقت للتاني ومن بلد للتاني، فاتأكد منها وقت ما تحتاجها.",
  levels: {"1":["تبان","تختار الـ stack اللي السوق بتاعك طالبه، و portfolio و GitHub و CV يخلّوا حد يفتح مشاريعك ويكلّمك"],"2":["تلاقي شغل","الشغل بييجي منين، و LinkedIn والرسايل، والـ remote لبرا، والفريلانس من أول عميل لحد ما تتقبض"],"3":["تمسك الشغل","تقيّم العرض وتتفاوض، وأول ٩٠ يوم، ومن junior لـ mid من غير ما تتحرق"]},
  categories: [
    {
      t: "تختار أنهي stack",
      l: 1,
      n: "السوق بيطلب إيه في مصر والخليج والـ remote، وتزوّد إيه بعد JS و React و Node، وتتأكد بنفسك في نص ساعة، والمرتبات بحذر",
      items: [
        {
          cmd: "خريطة السوق",
          title: "أنهي stack مطلوب أكتر في مصر والخليج والـ remote؟",
          desc: R`قبل ما تختار تتعلم إيه بعد كده، بص على اللي الشركات بتطلبه فعلًا في المكان اللي عايز تشتغل فيه. الجدولين في المثال ترتيب تقريبي (مين أكتر من مين)، مش أعداد: معمولين من نتايج بحث في مواقع الوظايف وصفحات المرتبات في ٢٠٢٥ و ٢٠٢٦، فاعتبرهم صورة لحظية مش حقيقة ثابتة.

الخلاصة: في مصر الـ backend بيتقسم تقريبًا بين .NET و Node (خصوصًا NestJS)، وبعدهم Java في البنوك، و Python (كتير منه data و AI)، و PHP في الـ agencies. وفي الـ frontend، React و Next في الأول، و Angular قوي في الشركات الكبيرة اللي شغالة .NET أو Java، و Flutter هو الاختيار الافتراضي للموبايل المحلي. في الخليج Java و .NET في الحكومة والبنوك، وكتير منها بيطلب ٣ لـ ٥ سنين خبرة. والـ remote: Node و TypeScript في الأول، وبعدهم Python (بسبب طلب الـ AI)، وفي الموبايل React Native أكتر من Flutter في الإعلانات الأمريكية.

والتحذيرات مهمة زي الجدول نفسه: مواقع الوظايف (Wuzzuf و LinkedIn و Bayt) كانت بتمنع القراية الآلية، فالترتيب مبني على snippets من نتايج البحث وصفحات Glassdoor و Wuzzuf Careers، مش على عدّ كل الإعلانات. والأعداد اللي ظهرت كانت صغيرة. ورقم زي نسبة استخدام Node في استبيان Stack Overflow ٢٠٢٥ (حوالي ٤٨.٧٪ من اللي جاوبوا، حسب اللي ظهر في نتايج البحث) بيقيس المبرمجين اللي بيستخدموه، مش عدد الوظايف. فالجدول يديك اتجاه، والدرس التالت («تتأكد بنفسك») يديك أرقامك انت.`,
          example: R`# BACKEND: approximate rank, from job-board search results 2025-2026 (not counts)
Rank | Egypt                     | Gulf (KSA, UAE)                      | Remote / freelance
1    | .NET (C#) ~ Node (NestJS) | Java/Spring ~ .NET (gov, banks)      | Node / TypeScript
2    | Java/Spring (banks)       | Python                               | Python / FastAPI (AI demand)
3    | Python (many data/AI)     | Node                                 | Java
4    | PHP/Laravel (agencies)    | PHP                                  | .NET, then PHP (strong on freelance sites)
# FRONTEND / MOBILE: same method, same caveats
Rank | Egypt                          | Gulf (KSA, UAE)        | Remote / freelance
1    | React / Next.js                | React / Next.js        | React (+ Next.js)
2    | Angular (with .NET/Java shops) | Angular                | React Native (2-6x Flutter in US postings)
3    | Flutter (local mobile default) | Flutter ~ React Native | Angular
4    | React Native, then Vue         | Vue                    | Flutter, then Vue
# Sources: Glassdoor Egypt pages (.NET, Node, Java, Python, PHP, React, Angular, React Native),
# Wuzzuf Careers, Stack Overflow Developer Survey 2025, devjobsscanner 2025, Upwork 2026 in-demand skills, Hays KSA 2025`,
          try: R`اختار سوق واحد بس هتقدّم فيه في الست شهور الجايين (مصر، أو الخليج، أو remote). اكتب من الجدولين أول اتنين backend وأول اتنين frontend أو موبايل في السوق ده، وجنب كل واحد: عندك منه إيه دلوقتي من التابات اللي خلّصتها، وناقصك إيه. وبعدين حط علامة استفهام جنب أي خانة مش مصدّقها، عشان تتأكد منها في درس «تتأكد بنفسك».`,
          flag: "script",
          deep: {
            why: "الـ junior اللي بيتعلم «أي حاجة trending» بيلاقي نفسه بيقدّم على وظايف مش موجودة في مدينته، أو بيتعلم stack مطلوب بس لناس عندها ٥ سنين. السوق المحلي والخليج والـ remote مختلفين جدًا، ونفس الـ stack ممكن يبقى الأول في واحد والرابع في التاني. معرفة الخريطة بتوفّر شهور.",
            how: R`الترتيب ده جه من تلات أنواع مصادر: صفحات المرتبات والوظايف (Glassdoor Egypt لكل stack، و Wuzzuf Careers)، وتقارير عامة عن الطلب (devjobsscanner ٢٠٢٥، وقايمة Upwork للمهارات المطلوبة ٢٠٢٦، و Hays KSA ٢٠٢٥)، واستبيان Stack Overflow ٢٠٢٥ للاستخدام. كل مصدر بيقيس حاجة مختلفة: عدد إعلانات، أو مرتبات مبلّغ عنها، أو استخدام. فالعلامة ~ معناها «قريبين من بعض ومش واضح مين أكتر».

اللي متقاس فعلًا: إن الـ stack ده بيظهر كتير في نتايج البحث والصفحات. واللي متقدّر: الترتيب الدقيق بين اللي جنب بعض، ونسبة الـ junior جوه كل stack. وأهم حاجة: الـ junior مش بيتنافس على كل السوق، بيتنافس على الإعلانات اللي بتقبل «0-2 years» في مدينته، والنسبة دي بتختلف جدًا من stack للتاني.

عشان كده الجدول بيقولك تبدأ تبص فين، مش تختار إيه. الاختيار في الدرس الجاي، والتأكيد بأرقامك انت في اللي بعده.`,
            when: "قبل ما تبدأ أي تاب جديد بعد الأساسيات، وكل ٦ شهور تقريبًا لأن السوق بيتحرك. ولو اتنقلت من مدينة لمدينة أو من محلي لـ remote، ارجعله.",
            mistakes: R`تتعامل مع الترتيب كأرقام مضبوطة («.NET أكتر من Node بـ ١٠٪»). تخلط بين «أكتر لغة مستخدمة» و «أكتر لغة ليها وظايف junior». تقرا ترتيب الـ remote وتقدّم محلي أو العكس. وتنسى إن كتير من وظايف الخليج بتطلب خبرة سنين، فمش كل إعلان هناك ينفعك دلوقتي.

وفي الانترفيو، لو اتسألت «ليه اخترت الـ stack ده؟»، الإجابة الضعيفة «عشان trending». الإجابة الأقوى: «بصيت على الإعلانات في السوق اللي بقدّم فيه، ولقيت إن كذا مطلوب مع كذا، فبنيت مشروع بيه».`
          },
          teach: R`## إزاي تقرا الجدولين

الجدولين مش أرقام، دول **ترتيب**. يعني الصف [[1]] معناه «ظهر أكتر في نتايج البحث» مش «فيه ١٠٠٠ وظيفة». فخلّينا نفك سطر واحد ونفهم كل حتة فيه:

~~~text سطر من جدول الـ backend
1    | .NET (C#) ~ Node (NestJS) | Java/Spring ~ .NET (gov, banks)      | Node / TypeScript
~~~

| الحتة | معناها |
|---|---|
| [[1]] | المركز الأول في السوق ده |
| [[Egypt]] و [[Gulf (KSA, UAE)]] و [[Remote / freelance]] | تلات أسواق مختلفة، وكل عمود بيتقرا لوحده |
| [[~]] | «قريبين من بعض ومش واضح مين أكتر» |
| [[/]] | نفس العيلة: [[Node / TypeScript]] يعني Node ومعاه TS |
| اللي بين قوسين | فين بيتطلب أكتر: [[(banks)]] البنوك، و [[(gov, banks)]] الحكومة والبنوك |

---

## ليه الأسواق التلاتة مختلفة

- **مصر:** شركات outsourcing وبنوك وشركات منتجات، فالـ backend متقسم بين .NET و Node، والـ frontend فيه Angular قوي لأنه بيتباع مع .NET و Java.
- **الخليج:** حكومة وبنوك أكتر، فـ Java و .NET فوق، وكتير من الإعلانات بتطلب ٣ لـ ٥ سنين.
- **الـ remote:** شركات ناشئة كتير شغالة TypeScript من الأول للآخر، فـ Node و React فوق.

---

## السطر الأخير: المصادر

~~~text
# Sources: Glassdoor Egypt pages ..., Stack Overflow Developer Survey 2025, ...
~~~

كل مصدر بيقيس حاجة مختلفة:

| نوع المصدر | بيقيس إيه | ينفع تستنتج منه |
|---|---|---|
| مواقع الوظايف والمرتبات | إعلانات ومرتبات مبلّغ عنها | الطلب في سوق معيّن |
| تقارير الطلب (devjobsscanner و Upwork و Hays) | الطلب العام | الاتجاه |
| استبيان Stack Overflow | مين **بيستخدم** إيه | شعبية، مش عدد وظايف |

عشان كده رقم زي «Node ٤٨.٧٪ في الاستبيان» ميتقريش «نص الوظايف Node».

---

## الخلاصة

- الجدول ترتيب تقريبي، مش أعداد.
- اقرا عمود السوق اللي هتقدّم فيه بس.
- [[~]] معناها «مش واضح مين أكتر».
- الأرقام الحقيقية بتاعتك هتطلع من درس «تتأكد بنفسك».`,
          lines: [
            "عناوين جدول الـ backend: الترتيب، وتلات أسواق.",
            "الأول: .NET و Node قريبين في مصر، و Java و .NET في الخليج، و Node/TS في الـ remote.",
            "التاني: Java في البنوك المصرية، و Python في الخليج و remote (طلب الـ AI بيزوّده).",
            "التالت: Python في مصر كتير منه data و AI مش web، و Node في الخليج، و Java في الـ remote.",
            "الرابع: PHP في الـ agencies المحلية، و .NET بعده PHP في الـ remote (والـ PHP قوي على مواقع الفريلانس).",
            "عناوين جدول الـ frontend والموبايل.",
            "React و Next في الأول في كل الأسواق.",
            "Angular تاني في مصر والخليج (مع شركات .NET و Java)، و React Native تاني في الـ remote.",
            "Flutter هو الموبايل الافتراضي المحلي، وقريب من React Native في الخليج.",
            "الأخير: Vue أقل في الأسواق التلاتة."
          ],
          sol: R`الناتج المتوقع ورقة فيها سوق واحد و ٤ stacks. مثال لحد خلّص «تاب React» و «تاب Backend بـ Node» وعايز يشتغل في مصر: backend: «.NET: ناقصني كله»، «Node: عندي». frontend: «React: عندي»، «Angular: ناقصني». يعني ناقصه ٢ من ٤، وده بيحدد الدرس الجاي.

لو اخترت remote، غالبًا هتلاقي إنك عندك أغلب اللي فوق (Node و TS و React)، والناقص عمق مش stack جديد، وإنجليزي («تاب إنجليزي للمبرمج: قراية وكتابة»).

الغلط الشائع: تكتب التلات أسواق مع بعض «عشان تفتح اختياراتك». ساعتها هتلاقي نفسك محتاج ٨ stacks، ومش هتخلّص ولا واحد. سوق واحد دلوقتي، والتاني بعد أول شغلانة.`
        },
        {
          cmd: "تزوّد إيه بعد JS",
          title: "خلّصت JS و TS و React و Node: أزوّد إيه دلوقتي؟",
          desc: R`لو خلّصت التابات الأساسية هنا (JavaScript و TypeScript و React و Node و SQL)، انت مش بتبدأ من الصفر: انت عندك stack كامل. السؤال مش «أتعلم إيه؟» لكن «أزوّد حاجة واحدة إيه عشان السوق اللي اخترته؟». والإجابة بتختلف حسب الهدف.

شغل في مصر أو الخليج في شركة: زوّد «تاب C# و .NET» وبعده «تاب Angular». الاتنين بيظهروا مع بعض كتير في الشركات الكبيرة والبنوك والحكومة، و TypeScript اللي اتعلمته بيخلّي Angular أسهل بكتير، و C# شبه TS في حاجات كتير. شغل remote أو فريلانس: متزوّدش stack جديد على طول، خش أعمق في Node و NestJS و Next.js (ارجع لـ «تاب Backend بـ Node» و «تاب Next.js»)، أو زوّد «تاب Python و FastAPI» لو عايز تقرّب من شغل الـ AI.

موبايل: «تاب React Native و Expo» بيستخدم React اللي انت عارفه، فهو أقصر طريق، ومطلوب في الـ remote. ولو هدفك وظايف موبايل محلية في مصر، «تاب Flutter و Dart» أكتر في الإعلانات هنا، بس لغة و UI جديدين. و «تاب Java و Spring Boot» للبنوك والخليج، مع تحذير: وظايف الـ junior فيه أقل والتعيين أبطأ. و «تاب PHP و MySQL» (مع Laravel) للفريلانس والـ agencies، بس الأجر غالبًا أقل.`,
          example: R`Target                       | Keep from this site          | Add next (one at a time)                 | Watch out
Egypt / Gulf company job     | TS, React, SQL, Git, Docker  | C# + ASP.NET Core, then Angular          | Many Gulf ads ask 3-5 years
Remote / freelance           | Node, TS, React, SQL         | Deeper Node/Nest/Next, or Python+FastAPI | English matters as much as the stack
Mobile, remote or React shop | React, TS                    | React Native + Expo                      | Fewer local Egyptian ads than Flutter
Mobile, Egyptian local jobs  | JS/TS basics, APIs           | Flutter + Dart                           | New language and a new UI model
Banks, telecom, Gulf gov     | SQL, OOP, TS                 | Java + Spring Boot                       | Fewer junior openings, slower hiring
Freelance for agencies       | SQL, HTML/CSS                | PHP + Laravel                            | Lower pay per project`,
          try: R`خد السوق اللي اخترته في درس «خريطة السوق» واختار صف واحد بس من الجدول. اكتب خطة ٨ أسابيع: أول ٤ أسابيع التاب الجديد لحد المستوى ٢، وتاني ٤ أسابيع مشروع واحد صغير بيه (مثلًا نفس مشروع عندك بالـ backend الجديد). وحدد إيه اللي «مش هتعمله» في الـ ٨ أسابيع دول.`,
          flag: "script",
          deep: {
            why: "أكبر غلطة في المرحلة دي إنك تتعلم ٣ stacks سطحي بدل واحد لحد ما تقدر تبني بيه. اللي بيفرز الـ CV عايز يشوف مشروع حقيقي بالـ stack اللي في الإعلان، مش قايمة أسماء. وكل حاجة اتعلمتها هنا (HTTP، و SQL، و Git، و Docker، و testing) بتتنقل مع أي stack، فالتاني بياخد وقت أقل بكتير من الأول.",
            how: R`ليه C# و Angular سوا: الاتنين من عالم الشركات الكبيرة، وبيتطلبوا مع بعض في إعلانات «full-stack .NET». و C# فيه classes و interfaces و generics و async/await، فلو فاهم TS هتحس إنك عارف نص اللغة. و Angular مبني على TypeScript من الأول.

ليه «أعمق» للـ remote: الشركات البرا بتقارنك بناس من كل الدنيا عندهم نفس الـ stack، فالفرق بيبقى في العمق: testing، و performance، و deploy، و system design بسيط. هنا «تاب APIs متقدمة» و «تاب Cloud و DevOps» بيفيدوا أكتر من لغة جديدة. والإنجليزي هنا جزء من الـ stack («تاب إنجليزي للمبرمج: كلام وانترفيو»).

React Native ولا Flutter: لو هدفك remote أو شركة شغالة React، React Native بيوفّر عليك لغة. لو هدفك إعلانات الموبايل المحلية في مصر، Flutter أكتر فيها حسب نتايج البحث. متتعلمش الاتنين في نفس الوقت.

Java و PHP: Java قوي في البنوك والخليج، بس الإعلانات اللي بتقبل junior أقل، فممكن تاخد وقت أطول لأول شغلانة. PHP و Laravel بيجيبوا شغل فريلانس بسرعة، بس السعر في الغالب أقل من Node أو .NET لنفس الشغل.`,
            when: "بعد ما تبقى قادر تبني مشروع full-stack كامل بالأساسيات ومنشور. لو لسه مش قادر، الـ stack الجديد مش هو اللي ناقصك.",
            mistakes: R`تبدأ .NET و Flutter و Python في نفس الشهر. تسيب JS/TS قبل ما تخلّص مشروع واحد كامل بيه. تختار Java عشان «المرتبات أعلى» من غير ما تبص كام إعلان junior فيه في مدينتك. تتعلم stack من غير مشروع، فيبقى مكتوب في الـ CV ومفيش دليل.

وفي الانترفيو: «ليه بتتعلم .NET وانت أساسك Node؟» إجابة كويسة: «السوق اللي بقدّم فيه طالبه، والمفاهيم (HTTP، و REST، و SQL، و DI) واحدة، وده مشروع عملته بيه».`
          },
          teach: R`## الجدول ده بيجاوب سؤال واحد

مش «أتعلم إيه؟»، لكن «أزوّد **حاجة واحدة** إيه للسوق اللي اخترته؟». كل صف هدف، وكل عمود بيجاوب سؤال:

| العمود | السؤال اللي بيجاوبه |
|---|---|
| [[Target]] | انت عايز تشتغل فين؟ |
| [[Keep from this site]] | إيه اللي عندك ومش هيضيع |
| [[Add next (one at a time)]] | تزوّد إيه، وبالترتيب |
| [[Watch out]] | التمن أو المخاطرة |

---

## نفك صف واحد

~~~text
Egypt / Gulf company job     | TS, React, SQL, Git, Docker  | C# + ASP.NET Core, then Angular          | Many Gulf ads ask 3-5 years
~~~

- **Keep:** TS و React و SQL و Git و Docker بيتنقلوا معاك لأي stack.
- **Add next:** [[C# + ASP.NET Core]] الأول، و [[then Angular]] بعده. كلمة [[then]] مهمة: مش الاتنين مع بعض.
- **Watch out:** الخليج كتير بيطلب خبرة، فده هدف طويل مش أول شغلانة.

وليه C# بالذات بعد TS؟ لأن الاتنين فيهم classes و interfaces و generics و [[async/await]] بنفس الفكرة تقريبًا، فهتحس إنك عارف نص اللغة.

---

## الصفوف بسرعة

| الهدف | تزوّد | ليه |
|---|---|---|
| remote وفريلانس | عمق في Node و Next، أو Python | المنافسة على العمق مش على اسم الـ stack |
| موبايل remote | React Native | بيستخدم React اللي عندك |
| موبايل محلي | Flutter | أكتر في الإعلانات المحلية، بس لغة جديدة (Dart) |
| بنوك وخليج | Java و Spring Boot | فرص junior أقل |
| agencies | PHP و Laravel | شغل سريع بأجر أقل |

---

## الخلاصة

- صف واحد، وتاب واحد، ومشروع واحد بيه.
- كل حاجة اتعلمتها هنا (HTTP و SQL و Git) بتتنقل، فالـ stack التاني أسرع من الأول.
- لو مش قادر تختار، ارجع لـ «تتأكد بنفسك» واعدّ الإعلانات.`,
          lines: [
            "عناوين الجدول: الهدف، واللي تحتفظ بيه، واللي تزوّده، والتحذير.",
            "مصر والخليج: C# و ASP.NET Core وبعدهم Angular (تاب C# و .NET، وتاب Angular).",
            "remote وفريلانس: عمق في Node و Nest و Next، أو Python و FastAPI.",
            "موبايل لشركات React أو remote: React Native بيستخدم React اللي عندك.",
            "موبايل محلي في مصر: Flutter أكتر في الإعلانات، بس لغة جديدة.",
            "البنوك والخليج: Java و Spring Boot، والـ junior فيه فرصه أقل.",
            "فريلانس مع agencies: PHP و Laravel، شغل سريع بأجر أقل."
          ],
          sol: R`الخطة الكويسة فيها صف واحد، وتاب واحد، ومشروع واحد، وقايمة «مش هعمل». مثال لحد اختار مصر:

أسبوع ١-٤: «تاب C# و .NET» لحد المستوى ٢. أسبوع ٥-٨: API الحجز بتاع مشروع العيادة بـ ASP.NET Core و PostgreSQL، بنفس الـ frontend بتاع React. مش هعمل: Angular (بعد ما أخلّص ده)، ولا Flutter، ولا كورسات جديدة.

لاحظ إنه مغيّرش الـ frontend: كده الـ CV فيه «React + .NET» بمشروع حقيقي، وده بيظهر في إعلانات. Angular ييجي بعد كده.

الغلط الشائع: الخطة فيها تابين أو أكتر في نفس الـ ٨ أسابيع، أو مفيهاش مشروع خالص. ولو لقيت نفسك مش قادر تختار صف، ارجع لدرس «تتأكد بنفسك» واعدّ الإعلانات، الرقم هيختار بدالك.`
        },
        {
          cmd: "تتأكد بنفسك",
          title: "تتأكد من السوق بنفسك في ٣٠ دقيقة إزاي؟",
          desc: R`الجداول اللي فاتت عامة. انت محتاج رقمك انت: في مدينتك، وللـ junior، النهارده. وده بياخد نص ساعة: تدوّر في Wuzzuf و LinkedIn Jobs (ولو الخليج: Bayt) بالفلاتر دي: المدينة أو «Remote»، والمستوى «Entry level» أو «Junior» أو «0-2 years»، وآخر ٣٠ يوم. وتكتب كلمات بحث عامة زي «software engineer» و «backend developer» و «frontend developer» و «mobile developer»، مش اسم stack، عشان متحيّزش النتيجة للحاجة اللي عايزها.

بعدين تفتح أول ٥٠ إعلان وتسجّل كل واحد سطر في شيت: الموقع، والمدينة، والـ stack الأساسي، والـ stack الإضافي، والخبرة المطلوبة، وهل مكتوب junior. والإعلان اللي بيطلب «٣+ سنين» سجّله برضه بس علّم عليه، لأنه بيوضّح إيه اللي مطلوب بس مش ليك دلوقتي.

ولو عايز تعدّ أسرع: انسخ وصف كل إعلان في ملف [[jobs.txt]]، وافصل بينهم بسطر فيه [[---]] بس، وشغّل السكربت اللي في المثال: بيعدّ كل stack اتذكر في كام إعلان. وده نفس فكرة «شيت التقديمات» (الدرس في «تدوّر على شغل»)، بس قبل ما تقدّم.`,
          example: R`// tally.mjs: node tally.mjs (reads jobs.txt if it exists, otherwise the 5 sample postings below)
import { existsSync, readFileSync } from "node:fs";
const sample = [
  "Junior .NET Developer - Cairo. C#, ASP.NET Core, SQL Server. Angular is a plus.",
  "Junior Backend Engineer (Node.js / NestJS), PostgreSQL, Docker.",
  "Frontend Developer: React, TypeScript, Next.js. React Native experience is a plus.",
  "Flutter Developer (Dart), Firebase, REST APIs. 1-2 years.",
  "Java Developer - Banking. Spring Boot, Oracle SQL, microservices. 3+ years."
].join("\n---\n");
const text = existsSync("jobs.txt") ? readFileSync("jobs.txt", "utf8") : sample;
const posts = text.split(/^---$/m).map(p => p.toLowerCase()).filter(p => p.trim());
const keywords = {
  ".NET / C#": /\.net\b|c#/,
  "Node / Nest": /node\.?js|nestjs|express/,
  "Java / Spring": /\bjava\b|spring/,
  "Python": /python|django|fastapi|flask/,
  "PHP / Laravel": /\bphp\b|laravel/,
  "React / Next": /react(?!\s*native)|next\.?js/,
  "Angular": /angular/,
  "Flutter": /flutter|\bdart\b/,
  "React Native": /react\s*native|\bexpo\b/,
  "SQL": /sql|postgres|mysql|oracle/,
  "3+ years": /\b[3-9]\+?\s*(years|yrs)/
};
const counts = Object.entries(keywords).map(([name, re]) => [name, posts.filter(p => re.test(p)).length]);
counts.sort((a, b) => b[1] - a[1]);
console.log(posts.length + " postings");
for (const [name, n] of counts) console.log(name.padEnd(14) + String(n).padStart(3) + String(Math.round((n / posts.length) * 100)).padStart(5) + "%");`,
          try: R`شغّل السكربت الأول من غير [[jobs.txt]] وشوف الناتج على الـ ٥ إعلانات المثال. وبعدين اعمل البحث بجد: ٥٠ إعلان من السوق اللي اخترته بالفلاتر اللي فوق، سجّلهم في شيت بالأعمدة اللي في الحل، وانسخ الأوصاف في [[jobs.txt]] وشغّل السكربت تاني. قارن الرقم بترتيب درس «خريطة السوق»: اتفقوا ولا لأ؟`,
          flag: "script",
          deep: {
            why: "أي تقرير عام (بما فيه الجداول في الدرس الأول) متوسط لناس كتير مش انت. ٥٠ إعلان في مدينتك وللمستوى بتاعك بيقولوا حاجة أدق بكتير، وبياخدوا نص ساعة. وكمان هتطلع منهم بقايمة كلمات تحطها في الـ CV (درس «ATS») وقايمة شركات تقدّم فيها.",
            how: R`ليه ٥٠: أقل من كده، إعلان أو اتنين بيقلبوا النتيجة. وأكتر من كده بيبقى تعب من غير فرق كبير لقرار زي ده. لو السوق صغير ومش لاقي ٥٠ junior، ده في حد ذاته معلومة.

الإعلانات المكررة: نفس الوظيفة بتتنشر على أكتر من موقع، ونفس الشركة بتنشر نفس الإعلان كل أسبوعين. شيل المكرر (نفس الشركة ونفس العنوان) قبل ما تعدّ.

الكلمات اللي تعدّها: الـ stack الأساسي (.NET، و Node، و Java، و Python، و PHP)، والـ frontend (React، و Angular، و Vue)، والموبايل (Flutter، و React Native)، والداتابيز (SQL Server، و PostgreSQL، و MongoDB)، والخبرة (0-2، و 3+)، وأي أداة بتتكرر (Docker، و Git، و Azure، و AWS).

السكربت بيعدّ «الإعلان اللي ذكر الكلمة» مش «عدد مرات الكلمة»، عشان إعلان بيكرر React عشر مرات ميتحسبش عشرة. والـ regex [[react(?!\s*native)]] معناه React مش متبوعة بـ Native، عشان متحسبش React Native كـ React. وهو عدّ تقريبي: إعلان مكتوب فيه «not Java» هيتحسب Java، فبص بعينك على الأرقام الغريبة.`,
            when: "قبل ما تختار تاب جديد، وقبل ما تكتب الـ CV، وكل ٣ لـ ٦ شهور. ولو فضلت شهر بتقدّم ومفيش ردود، اعدّ تاني: ممكن المطلوب اتغيّر.",
            mistakes: R`تدوّر باسم الـ stack اللي عايزه («Flutter jobs») فكل النتايج Flutter وتفتكر إنه الأكتر. تنسى فلتر المستوى فتعدّ إعلانات senior. تعدّ ١٠ إعلانات وتقرر. تعدّ نفس الإعلان ٣ مرات من ٣ مواقع. وتصدّق السكربت من غير ما تبص على ٥ إعلانات بعينك تتأكد إنه بيعدّ صح.`
          },
          teach: R`## السكربت بيعمل إيه في جملة

بيقرا إعلانات وظايف من ملف [[jobs.txt]] (أو ٥ إعلانات مثال لو الملف مش موجود)، ويعدّ كل stack اتذكر في **كام إعلان**، ويطبع العدد والنسبة. هنفكه حتة حتة. اتشغّل بـ Node 24 على ويندوز.

---

## ١. الاستيراد

~~~js
import { existsSync, readFileSync } from "node:fs";
~~~

- [[node:fs]] مكتبة الملفات اللي جاية مع Node (fs = file system). الـ [[node:]] قبلها بيقول «دي من Node نفسه، مش من npm».
- [[existsSync]] بيرجّع [[true]] لو الملف موجود. و [[readFileSync]] بيقرا الملف كله كنص. و [[Sync]] في الاسم معناها إنه بيستنى لحد ما يخلص.
- الملف اسمه [[.mjs]] عشان Node يفهم [[import]] من غير إعدادات (m = module).

---

## ٢. الإعلانات المثال

~~~js
const sample = [ "Junior .NET Developer ...", ... ].join("\n---\n");
~~~

مصفوفة فيها ٥ نصوص، و [[join]] بيلزقهم في نص واحد وبين كل اتنين سطر فيه [[---]] بس. ده نفس الشكل اللي هتكتب بيه [[jobs.txt]].

~~~js
const text = existsSync("jobs.txt") ? readFileSync("jobs.txt", "utf8") : sample;
~~~

[[? :]] اسمه ternary: «لو الشرط صح خد اللي بعد [[?]]، وإلا خد اللي بعد [[:]]». و [[utf8]] الترميز، عشان يرجع نص مش bytes.

---

## ٣. التقسيم

~~~js
const posts = text.split(/^---$/m).map(p => p.toLowerCase()).filter(p => p.trim());
~~~

من الشمال لليمين:

| الحتة | بتعمل إيه |
|---|---|
| [[split(/^---$/m)]] | تقسّم عند أي سطر هو [[---]] بس. [[^]] أول السطر و [[$]] آخره، و [[m]] (multiline) بتخلّيهم يشتغلوا على كل سطر مش أول وآخر النص كله |
| [[map(p => p.toLowerCase())]] | كل إعلان حروف صغيرة، عشان [[React]] و [[react]] يتعدّوا واحد |
| [[filter(p => p.trim())]] | تشيل أي حتة فاضية. [[trim]] بيشيل المسافات، والنص الفاضي بيتحسب false |

ليه الـ filter مهم؟ جرّبت التقسيم على نص بينتهي بسطر [[---]]:

~~~text الناتج
[ 'a\n', '\nb\n', '\n' ]
~~~

آخر حتة سطر فاضي، والـ filter بيشيلها، وإلا كان هيتحسب «إعلان» زيادة.

---

## ٤. قاموس الكلمات

كل سطر: اسم العمود، و regex بيدوّر عليه. أهم ٣ حيل فيه:

~~~js
"Java / Spring": /\bjava\b|spring/,
~~~

[[\b]] معناها «حد كلمة»، فـ [[java]] لازم تبقى كلمة لوحدها. جرّبتها: على [[javascript developer]] طلعت [[false]]، وعلى [[java developer]] طلعت [[true]]. من غيرها كل إعلان JavaScript كان هيتحسب Java. و [[|]] معناها «أو».

~~~js
"React / Next": /react(?!\s*native)|next\.?js/,
~~~

[[(?!...)]] اسمها negative lookahead: «react **مش** متبوعة بـ native». و [[\s*]] أي عدد مسافات. و [[\.?]] نقطة اختيارية، فـ [[nextjs]] و [[next.js]] الاتنين. على [[react native]] طلعت [[false]]، وعلى [[react, typescript]] طلعت [[true]].

~~~js
"3+ years": /\b[3-9]\+?\s*(years|yrs)/
~~~

رقم من ٣ لـ ٩، وبعده [[+]] اختيارية ([[\+]] لأن [[+]] لوحدها رمز في الـ regex)، وبعدها [[years]] أو [[yrs]]. على [[3+ years]] صح، وعلى [[1-2 years]] غلط.

---

## ٥. العدّ والترتيب

~~~js
const counts = Object.entries(keywords).map(([name, re]) => [name, posts.filter(p => re.test(p)).length]);
counts.sort((a, b) => b[1] - a[1]);
~~~

- [[Object.entries]] بيحوّل القاموس لأزواج [[[name, re]]].
- لكل زوج: [[posts.filter(p => re.test(p)).length]] = عدد الإعلانات اللي فيها تطابق. يعني إعلان ذكر React عشر مرات بيتحسب **مرة واحدة**.
- [[sort((a, b) => b[1] - a[1])]] من الأكبر للأصغر (لو [[b - a]] موجب، b ييجي الأول).

---

## ٦. الطباعة

~~~js
console.log(name.padEnd(14) + String(n).padStart(3) + String(Math.round((n / posts.length) * 100)).padStart(5) + "%");
~~~

[[padEnd(14)]] بيكمّل الاسم بمسافات لحد ١٤ حرف، و [[padStart(3)]] بيحط مسافات قبل الرقم لحد ٣ خانات، فالأعمدة تبقى تحت بعض. والنسبة [[n / posts.length * 100]] متقرّبة بـ [[Math.round]].

~~~text الناتج الحقيقي على الـ ٥ إعلانات
5 postings
SQL             3   60%
.NET / C#       1   20%
Node / Nest     1   20%
Java / Spring   1   20%
React / Next    1   20%
Angular         1   20%
Flutter         1   20%
React Native    1   20%
3+ years        1   20%
Python          0    0%
PHP / Laravel   0    0%
~~~

لاحظ إن إعلان الـ frontend اتحسب في [[React / Next]] و [[React Native]] الاتنين، لأن فيه الكلمتين. وده صح.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اقرا الإعلانات | [[existsSync]] و [[readFileSync]] |
| قسّمها | [[split(/^---$/m)]] و [[filter]] |
| لكل stack اعدّ الإعلانات | [[filter(p => re.test(p)).length]] |
| رتّب واطبع | [[sort]] و [[padEnd]] و [[padStart]] |

- العدّ «كام إعلان» مش «كام مرة».
- الـ regex تقريبي: إعلان مكتوب فيه «not Java» هيتحسب Java، فبص بعينك.
- ابحث بكلمات عامة ([[backend developer]]) مش باسم الـ stack اللي عايزه.`,
          lines: [
            "استيراد دوال قراية الملف من Node.",
            "بداية الـ ٥ إعلانات المثال.",
            "إعلان .NET فيه SQL و Angular كـ plus.",
            "إعلان Node و NestJS.",
            "إعلان frontend فيه React و Next و React Native.",
            "إعلان Flutter بسنة لسنتين خبرة.",
            "إعلان Java لبنك بيطلب ٣+ سنين.",
            "ربط الإعلانات بسطر --- زي ما هتعمل في jobs.txt.",
            "لو فيه jobs.txt اقراه، وإلا استخدم المثال.",
            "قسّم على سطور --- وحوّل لحروف صغيرة وشيل الفاضي.",
            "بداية قاموس الكلمات: اسم العمود والـ regex بتاعه.",
            ".NET أو C#.",
            "Node أو NestJS أو Express.",
            "Java كلمة لوحدها (عشان JavaScript متتحسبش) أو Spring.",
            "Python وأشهر frameworks بتاعته.",
            "PHP أو Laravel.",
            "React مش متبوعة بـ Native، أو Next.js.",
            "Angular.",
            "Flutter أو Dart.",
            "React Native أو Expo.",
            "أي داتابيز SQL.",
            "خبرة ٣ سنين أو أكتر: عشان تعرف كام إعلان مش ليك دلوقتي.",
            "نهاية القاموس.",
            "لكل كلمة: كام إعلان فيه تطابق.",
            "رتّب من الأكتر للأقل.",
            "اطبع عدد الإعلانات.",
            "اطبع كل كلمة وعددها ونسبتها."
          ],
          sol: R`على الـ ٥ إعلانات المثال الناتج:

[[5 postings]]
[[SQL               3   60%]]
[[.NET / C#         1   20%]]
... وكل الباقي ١ (٢٠٪)، ما عدا [[Python]] و [[PHP / Laravel]] صفر.

SQL في ٣ من ٥ لأنه بيتطلب مع أي backend، وده درس لوحده: SQL مش اختيار، ده أساسي. و React Native ظهر في إعلان الـ frontend كـ plus، والسكربت حسبه React و React Native الاتنين، وده صح.

على الـ ٥٠ إعلان بتوعك: متوقع الرقم يختلف عن الجدول في حاجة أو اتنين، وده الهدف. لو stack طلع في أقل من ١٠٪ من إعلانات الـ junior في مدينتك، فكّر مرتين قبل ما يبقى الاختيار الأول، مهما كان مشهور.

الغلط الشائع: كل الإعلانات طالعة «3+ years». يبقى غالبًا نسيت فلتر المستوى، أو السوق اللي اخترته فعلًا صعب على الـ junior (زي حاجات كتير في الخليج)، وده سبب تفكّر في سوق تاني كبداية. وتحت template للشيت، انسخه CSV وافتحه في Google Sheets أو Excel.`,
          solCode: R`id,site,company,title,city_or_remote,level,years_required,main_stack,extra_stack,database,mobile,english_required,salary_shown,link,notes
1,Wuzzuf,Example Co,Junior .NET Developer,Cairo,junior,0-2,.NET,Angular,SQL Server,,yes,no,https://...,Angular is a plus
2,LinkedIn,Example Co,Backend Engineer,Remote,junior,1-2,Node,NestJS,PostgreSQL,,yes,no,https://...,
3,Bayt,Example Co,Java Developer,Riyadh,mid,3+,Java,Spring Boot,Oracle,,yes,no,https://...,not for me yet
4,Wuzzuf,Example Co,Flutter Developer,Alexandria,junior,1-2,,,Firebase,Flutter,no,yes,https://...,`
        },
        {
          cmd: "المرتبات بحذر",
          title: "المرتبات تقريبًا كام؟ وليه متختارش الـ stack على المرتب بس؟",
          desc: R`الأرقام اللي تحت نطاقات تقريبية من مصادر عامة، مش وعد ولا سعر سوق مضبوط. وأغلبها self-reported (ناس كاتبة مرتبها بنفسها) أو من salary guides معمولة للخبرة مش للـ junior. وفي مصر بالذات الأرقام بالجنيه بتقدم بسرعة مع التضخم وتغيّر سعر الصرف، فرقم من سنة ممكن يبقى قليل النهارده.

تقريبًا: في مصر، junior backend حوالي ١٠ لـ ١٦ ألف جنيه في الشهر (Wuzzuf Careers)، ومن ٣ لـ ٥ سنين حوالي ٢٢ لـ ٤٠ ألف. في السعودية، المبرمج حوالي ٢٠ لـ ٣٥ ألف ريال (Hays KSA ٢٠٢٥، ودي أرقام لناس بخبرة مش junior). وفي الإمارات، mid-level حوالي ١٥ لـ ٢٢ ألف درهم. والـ remote واسع جدًا لدرجة إن أي رقم واحد هيضلّلك: بيعتمد على بلد الشركة، ونوع العقد، والعملة.

وليه متطاردش المرتب لوحده كـ junior: الفرق بين stacks في أول سنة غالبًا أصغر من الفرق بين شركة وشركة في نفس الـ stack. واللي بيرفع مرتبك في أول ٣ سنين هو إنك تتعيّن بسرعة وتتعلم في مكان فيه ناس أحسن منك وتبني خبرة تتحكي. stack «مرتباته أعلى» بس فيه ٣ إعلانات junior في مدينتك ممكن يأخّرك سنة، والسنة دي أغلى من أي فرق.`,
          example: R`Where / level                | Monthly, gross (approx.) | Source                                  | How much to trust it
Egypt, junior backend        | ~10k-16k EGP             | Wuzzuf Careers                          | medium: self-reported, EGP numbers age fast
Egypt, 3-5 years             | ~22k-40k EGP             | Wuzzuf Careers, Glassdoor Egypt pages   | medium: wide spread between companies
KSA, developer               | ~20k-35k SAR             | Hays KSA salary guide 2025              | low for juniors: the guide covers experienced hires
UAE, mid-level               | ~15k-22k AED             | salary-guide snippets (2025)            | low: not junior, housing may or may not be included
Remote, junior               | too wide to quote        | -                                       | depends on company country, contract and currency`,
          try: R`اجمع ٥ أرقام حقيقية بنفسك للسوق والمستوى بتوعك: إعلانات من الـ ٥٠ بتوع درس «تتأكد بنفسك» مكتوب فيها مرتب، وصفحة Wuzzuf Careers أو Glassdoor للـ stack، وتلات ناس بتعرفهم في نفس المستوى (اسأل عن نطاق، مش رقم بالظبط). اكتب النطاق اللي طلعلك جنب الصف المناسب في الجدول، وجنبه تاريخ النهارده.`,
          flag: "script",
          deep: {
            why: "الـ junior اللي عنده رقم في دماغه من فيديو أو بوست بيعمل غلطتين: يرفض عروض كويسة لأنها «أقل من السوق»، أو يختار stack على رقم معمول لناس بخبرة ٥ سنين. نطاق من مصادر متعددة مع تاريخ بيحميك من الاتنين، وبيفيدك وقت التفاوض (درس «التفاوض» في «العرض وأول شغل»).",
            how: R`اقرا كل رقم بسؤالين: «ده لمين؟» و «ده من إمتى؟». الـ salary guides زي Hays بتتعمل غالبًا من التعيينات اللي الشركة نفسها بتشتغل عليها، وأغلبها لناس بخبرة. و Wuzzuf و Glassdoor أرقام الناس اللي كتبت، فممكن تبقى قليلة العدد أو قديمة.

الـ gross مش الـ net: في مصر فيه تأمينات وضرايب بتتخصم. وفي الخليج فيه بدلات (سكن، ومواصلات) ساعات بتبقى جوه الرقم وساعات برا. فقارن نفس النوع بنفس النوع، وتفاصيل ده في درس «تقييم العرض».

ولو عايز رقم أدق من ده: الإعلانات اللي بتكتب المرتب، والناس اللي بتعرفهم، أحسن من أي موقع. وأغلب الناس بتقبل تقول نطاق لو سألت باحترام ووعدت إنه مش هيتقال لحد.`,
            when: "قبل أول تفاوض، وقبل ما تختار بين عرضين، ولما تفكر تغيّر stack عشان المرتب. ومتستخدموش في أول مكالمة مع HR كرقم نهائي: ده للتحضير.",
            mistakes: R`تاخد رقم الخليج لناس بخبرة وتتوقعه كـ junior. تقارن مرتب جنيه من سنتين بمرتب النهارده. تقارن gross بـ net. تختار Java عشان «بيدفعوا أكتر» وتلاقي مفيش junior. وتقول رقم في الانترفيو من غير ما تكون عارف النطاق، فتقول رقم أقل بكتير من اللي كانوا مستعدين يدفعوه.

وفي الانترفيو: لو اتسألت «expected salary» بدري، إجابة معقولة: «I'd like to understand the role and the full package first. Based on my research, roles like this are in the range of ...» بنطاق من أرقامك انت، مش من الجدول.`
          },
          teach: R`## كل صف بيتقرا بسؤالين: لمين؟ ومن إمتى؟

نفك صف واحد:

~~~text
KSA, developer               | ~20k-35k SAR             | Hays KSA salary guide 2025              | low for juniors: the guide covers experienced hires
~~~

| الحتة | معناها |
|---|---|
| [[KSA, developer]] | السوق والمستوى. «developer» هنا مش junior |
| [[~20k-35k SAR]] | [[~]] تقريبًا، و [[k]] ألف، و [[SAR]] ريال سعودي |
| [[Hays KSA salary guide 2025]] | المصدر وسنته |
| [[low for juniors]] | درجة الثقة لو انت junior: قليلة، لأن الـ guide لناس بخبرة |

---

## الكلمات في عنوان الجدول

- **Monthly:** في الشهر.
- **gross:** قبل أي خصم. العكس **net**: اللي بيوصل إيدك بعد التأمينات والضرايب. متقارنش gross بـ net.
- **self-reported:** ناس كتبت مرتبها بنفسها، فممكن يبقوا قليلين أو قديمين.

والعملات: [[EGP]] جنيه، و [[SAR]] ريال، و [[AED]] درهم.

---

## ليه صف الـ remote فاضي؟

~~~text
Remote, junior               | too wide to quote        | -
~~~

لأن الرقم بيعتمد على بلد الشركة، وشكل العقد (موظف ولا contractor)، والعملة. أي رقم واحد هنا هيضلّلك أكتر ما هيفيدك.

---

## الخلاصة

- الجدول نقطة بداية، والنطاق اللي تجمعه بنفسك من ٥ مصادر أصدق منه.
- اكتب جنب كل رقم **مصدره وتاريخه**.
- الفرق بين شركة وشركة في نفس الـ stack غالبًا أكبر من الفرق بين stack وstack.`,
          lines: [
            "عناوين الجدول: المكان والمستوى، والنطاق، والمصدر، ودرجة الثقة.",
            "junior backend في مصر: الرقم الأقرب ليك لو بتبدأ محلي.",
            "من ٣ لـ ٥ سنين في مصر: عشان تشوف الطريق رايح فين، مش رقم ليك دلوقتي.",
            "السعودية: من guide معمول لناس بخبرة، فمش رقم junior.",
            "الإمارات: mid-level، والبدلات ممكن تبقى جوه أو برا.",
            "الـ remote: أوسع من إن رقم واحد يعبّر عنه."
          ],
          sol: R`الناتج الكويس: صف واحد في الجدول جنبه نطاق من ٥ مصادر، وتاريخ. مثال: «Egypt, junior backend (.NET)، ١٢ لـ ١٨ ألف، من ٢ إعلانات + Wuzzuf Careers + ٢ صحاب، سبتمبر ٢٠٢٦». لو نطاقك طلع مختلف عن الجدول، صدّق نطاقك: هو أحدث وأقرب لك.

لو المصادر الـ ٥ مختلفة جدًا (مثلًا من ٨ لـ ٣٠ ألف)، ده طبيعي: الفرق بين الشركات في نفس الـ stack كبير. وده بالظبط السبب إن اختيار الشركة (وإنك تتعلم فيها) بيفرق أكتر من اختيار الـ stack عشان المرتب.

الغلط الشائع: تكتب رقم واحد من مصدر واحد. أو تجمع أرقام لمستوى أعلى من مستواك. أو تحط الأرقام من غير تاريخ، وبعد ٦ شهور متعرفش هي قديمة ولا لأ.`
        }
      ]
    }
  ]
});
