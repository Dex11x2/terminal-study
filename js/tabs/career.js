// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   deep     اختياري: why / how / when / mistakes
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
    },
    {
      t: "الـ portfolio والـ GitHub",
      l: 1,
      n: "مشاريع قليلة بس كل واحد بيثبت حاجة، و README بيبيع، وبروفايل GitHub نضيف، وتاريخ commits محترم، وموقع portfolio صفحة واحدة",
      items: [
        {
          cmd: "٢–٣ مشاريع",
          title: "أنهي مشاريع تستاهل تتحط في الـ portfolio؟ (ومش todo app تاني)",
          desc: R`اللي بيفرز الـ CV (recruiter أو tech lead) بيدّي مشاريعك دقيقة أو اتنين. في الدقيقة دي بيدوّر على دليل إنك تقدر تبني حاجة حقيقية تشتغل، مش إنك خلّصت كورسات. فـ ٢ أو ٣ مشاريع قوية أحسن بكتير من ١٠ مشاريع صغيرة: الكتير بيخبّي القوي.

المشروع يستاهل لو فيه أغلب دول: بيحل مشكلة لحد حقيقي (حتى لو محل قريبك أو عيادة)، ومنشور وليه live link، وفيه جزء صعب بجد (auth وأدوار، أو دفع، أو realtime، أو background jobs، أو منع تعارض في الداتابيز)، وفيه اختبارات و CI، وانت تقدر تشرح كل سطر فيه. وكل مشروع يثبت حاجة مختلفة: واحد UI قوي، وواحد backend وداتابيز، وواحد full-stack منشور.

المشاريع اللي في «تاب المشاريع» معمولة بالظبط للغرض ده. ونسخ الـ tutorials (Netflix clone، و todo، و weather app) مفيدة للتعلم، بس في الـ portfolio مبتثبتش حاجة، إلا لو زوّدت عليها حاجة كبيرة من عندك.`,
          example: R`Project                  | Real user?        | Live? | Hard part                          | Tests/CI | Explain every line? | Keep?
todo-app                 | no                | no    | none                               | no       | yes                 | no
clinic-booking           | yes, uncle's clinic | yes | no double booking (DB constraint)  | yes      | yes                 | YES
weather-dashboard        | no                | yes   | caching a slow external API        | no       | yes                 | maybe: add tests
netflix-clone (tutorial) | no                | yes   | copied from a video                | no       | partly              | no
shop-api                 | no                | yes   | auth, roles, payment webhooks      | yes      | yes                 | YES`,
          try: "اكتب كل المشاريع اللي عملتها في جدول زي ده بصراحة. اختار ٢ أو ٣ «YES» كل واحد بيثبت حاجة مختلفة. ولكل «maybe» اكتب الحاجة الناقصة بالظبط (live link؟ اختبارات؟ جزء صعب؟) وقدّر هتاخد قد إيه.",
          flag: "script",
          deep: {
            why: "الـ junior مالوش خبرة شغل يتحكم عليه بيها، فالمشاريع هي الخبرة. والسؤال اللي في دماغ اللي بيفرز: «لو اديته ticket حقيقي، هيعرف يخلّصه؟». مشروع منشور فيه auth ومنع تعارض واختبارات بيجاوب «آه». عشرة tutorials بيجاوبوا «مش عارف».",
            how: R`الجزء الصعب هو اللي هتتسأل فيه في الانترفيو، فاختاره بحيث يبقى حكاية: «كان فيه مشكلة إن مريضين يحجزوا نفس الميعاد في نفس الثانية، فحطيت unique constraint على (الدكتور، الميعاد) وبقيت أمسك الـ error وأرجّع رسالة». دي الحكاية اللي في درس «problem → decisions → results» في «تاب الانترفيو».

المستخدم الحقيقي مش لازم يبقى شركة: قريب عنده محل، أو جمعية، أو فريق الكورة بتاعك. حتى ١٠ يوزرز حقيقيين بيدّوك حاجات مستحيل تجيلك من tutorial: bugs حقيقية، وطلبات تعديل، ورقم تكتبه في الـ CV.

ولو كل مشاريعك tutorials، مش مشكلة، بس ابدأ واحد جديد: خد مشروع من «تاب المشاريع»، أو مشكلة لحد تعرفه، واقفله بـ live link واختبارات قبل ما تبدأ التاني.`,
            when: "قبل ما تكتب الـ CV أو تعمل موقع portfolio، لأن الاتنين مبنيين على الاختيار ده. وراجع الاختيار كل ما تخلّص مشروع أقوى: القديم يتشال من الـ pins.",
            mistakes: R`تحط كل حاجة عملتها عشان «تبان شغّال». تحط مشروع مش شغال (الـ live link بيرجّع 500، أو الـ free tier نام). تحط مشروع جماعي من غير ما تقول دورك انت إيه بالظبط. وتحط مشروع مش فاكر كوده: أول سؤال في الانترفيو «ليه عملت كذا هنا؟» هيكشفك.`
          },
          lines: [
            "الأعمدة: المعايير اللي بتفرّق مشروع portfolio عن تمرين.",
            "todo app: مفيش يوزر ولا جزء صعب. يتشال.",
            "مشروع حقيقي لعيادة، ومنشور، وفيه مشكلة حقيقية اتحلّت: ده أقوى مشروع.",
            "كويس بس ناقص اختبارات: ساعات شغل قليلة تحوّله لـ YES.",
            "tutorial منسوخ ومش فاهم كل سطر فيه: يتشال مهما كان شكله حلو.",
            "backend فيه auth وأدوار ودفع واختبارات: بيثبت حاجة مختلفة عن مشروع العيادة."
          ],
          sol: R`النتيجة الصح: ٢ أو ٣ مشاريع «YES» مختلفين عن بعض، ولكل «maybe» سطر فيه حاجة واحدة محددة («اختبارات للـ API بتاع الطقس، يومين»)، مش «أحسّنه».

لو طلعلك صفر YES، دي نتيجة مفيدة مش فشل: معناها إن أول خطوة في الكارير مشروع واحد جديد تقفله صح، مش CV. اختار واحد من «تاب المشاريع» أو مشكلة حقيقية لحد تعرفه.

الغلط الشائع: كل المشاريع طالعة YES. ارجع لعمود «Real user?» وعمود «Explain every line?» وكن صادق: لو مش هتقدر تشرح الـ auth بتاعه في الانترفيو، مش YES.`
        },
        {
          cmd: "README بيبيع",
          title: "الـ README اللي بيبيع المشروع فيه إيه؟",
          desc: R`الـ README هو صفحة المشروع. اللي بيفرز بيفتح الـ repo ويقرا أول ١٠ سطور، ولو مفهمش المشروع بيعمل إيه ومشافوش شغال، بيقفل. فالترتيب مهم: جملة واحدة المشروع بيعمل إيه ولمين، وبعدها على طول live link (ولو فيه login، حساب demo)، وصورة أو GIF قصير للـ flow الأساسي.

بعد كده الحاجات اللي بتفرّق مهندس عن منفّذ: الـ features مكتوبة كحاجات اليوزر يقدر يعملها، والأدوات ومعاها سبب اختيار كل واحدة، والقرارات والـ trade-offs (أصعب مشكلة واتحلت إزاي)، وإزاي أشغّله عندي بأوامر أنسخها، والاختبارات، والحاجات الناقصة اللي انت عارفها. الأخيرة دي بتبيّن إنك فاهم مشروعك مش بتخبّي.

نفس الفكرة في درس «README بالافتراضات» في «تاب الانترفيو» للـ take-home، بس هنا القارئ مستعجل أكتر، فالصورة والـ live link فوق.`,
          example: R`# Project name
One sentence: what it does and for whom.
**Live:** https://your-app.example.com · **Demo login:** demo@example.com / demo1234
![Main flow](docs/demo.gif)
## Features
- 3 to 5 bullets, each one something the user can do
## Tech and why
- Each tool with one reason you chose it
## Decisions and trade-offs
- The hardest problem and how you solved it
## Run locally
$__bt$__bt$__bt bash
cp .env.example .env && docker compose up -d db && npm ci && npm run dev
$__bt$__bt$__bt
## Tests
- npm test (and what is covered)
## Limitations and next steps
- What you know is missing, honestly`,
          try: R`اكتب README لأقوى مشروع عندك بالشكل ده، واعمل GIF للـ flow الأساسي (أي أداة screen recording، أقل من ١٥ ثانية). وبعدين ادّي الـ repo لحد مايعرفوش، واديله دقيقة واحدة: لازم يقولك المشروع بيعمل إيه، ويفتح الـ live link. وبعدين خليه يشغّله عنده من الـ README بس من غير ما تساعده.`,
          flag: "script",
          deep: {
            why: "الـ README بيشتغل وانت مش موجود. محدش هيفتح الكود عشان يعرف المشروع بيعمل إيه، وقليلين هيشغّلوه. الصورة والـ live link بيخلّوا حد يشوف شغلك في ١٠ ثواني، وجزء القرارات هو اللي بيطلّع أسئلة الانترفيو اللي انت جاهز لها أصلًا.",
            how: R`الجملة الأولى: فعل ومستخدم ومشكلة. «Online booking for a small clinic» أحسن من «A MERN stack web application». الـ stack مكانه تحت.

الـ GIF: ٥ لـ ١٥ ثانية للـ flow الأهم بس، وحطه في فولدر [[docs/]] في الـ repo عشان ميضيعش. ولو حجمه كبير، صورتين screenshots كفاية.

الـ demo login: حساب بصلاحيات محدودة وداتا وهمية، واعمل له reset دوري لو الناس ممكن تبوّظ الداتا. ومتحطش أبدًا باسورد حقيقي أو مفتاح API في الـ README.

«Run locally»: أوامر تتنسخ وتشتغل، وملف [[.env.example]] فيه كل المتغيرات بقيم وهمية. جرّبها بنفسك في فولدر جديد بعد [[git clone]]، لأن الغلطة الأشهر إن حاجة شغالة عندك بس بسبب ملف مش في الـ repo.

الـ Limitations: سطرين صادقين («Arabic UI only»، «No online payments yet») بيدّوا انطباع أحسن من إنك تدّعي إنه كامل، وبيدّوا الإنترفيوير سؤال سهل: «لو هتعمل الدفع، هتعمله إزاي؟».`,
            when: "لكل مشروع في الـ pins. وحدّثه مع كل ميزة كبيرة، وكل ما الـ live link يتغير.",
            mistakes: R`README الـ template الافتراضي بتاع create-react-app أو Next.js زي ما هو. live link بايظ. صور من نسخة قديمة. «Run locally» ناقص خطوة الداتابيز. قايمة ٢٠ technology من غير ولا سبب. و README طويل جدًا بيشرح الكود سطر سطر: ده مكانه تعليقات أو docs، مش أول صفحة.`
          },
          lines: [
            "جملة واحدة: بيعمل إيه ولمين. ده أهم سطر.",
            "الـ live link وحساب demo بصلاحيات محدودة وداتا وهمية.",
            "GIF قصير للـ flow الأساسي، محفوظ في الـ repo.",
            "الـ features كحاجات اليوزر يعملها، مش أسماء مكتبات.",
            "كل أداة ومعاها سبب: ده اللي بيطلّع أسئلة الانترفيو.",
            "أصعب مشكلة والحل: الجزء اللي بيفرّق مهندس عن منفّذ.",
            "بداية الـ code block.",
            "كل الأوامر من أول clone لحد ما يشتغل، ومجرّبة في فولدر جديد.",
            "نهاية الـ code block.",
            "إزاي تشغّل الاختبارات وبتغطي إيه.",
            "الناقص بصراحة: بيبيّن إنك فاهم مشروعك."
          ],
          sol: R`الـ README نجح لو الشخص في الدقيقة الأولى قال المشروع بيعمل إيه بكلامه هو، وفتح الـ live link. لو قال «ده موقع React» بس، يبقى الجملة الأولى محتاجة تتكتب تاني بمستخدم ومشكلة.

وفي التشغيل من الـ README، غالبًا هيقف في خطوة: متغير ناقص في [[.env.example]]، أو migration مش مكتوبة، أو نسخة Node مختلفة. كل وقفة هي سطر ناقص في الـ README، زوّده. ولو خلّص من غير ما يسألك، الـ README تمام.

تحت مثال مكتوب كامل لمشروع العيادة. الغلط الشائع: الـ Limitations فاضية، أو مكتوب فيها «more features».`,
          solCode: R`# Clinic Booking
Online booking for a small clinic: patients pick a free slot, the doctor sees the day's list.

**Live:** https://clinic-demo.example.com · **Demo login:** demo@example.com / demo1234

![Booking a slot](docs/booking.gif)

## Features
- Book, cancel and reschedule without calling the clinic
- No double booking, even when two patients click the same slot at the same second
- Doctor dashboard with today's appointments
- SMS reminder the evening before

## Tech and why
- Next.js + TypeScript: one codebase for pages and API, types shared end to end
- PostgreSQL + Prisma: relational data, and a unique constraint does the hard part
- Docker, Nginx and GitHub Actions on a small VPS: every push to main is tested and deployed

## Decisions and trade-offs
- Double booking is prevented by a unique index on (doctor_id, starts_at), not by checking first in code: a check-then-insert races under load.
- Reminders run in a background job, so a slow SMS provider never slows down booking.
- Slots are generated from working hours per day instead of stored for months ahead: less data, and changing hours is one setting.

## Run locally
$__bt$__bt$__bt bash
cp .env.example .env
docker compose up -d db
npm ci && npx prisma migrate dev && npm run seed && npm run dev
$__bt$__bt$__bt

## Tests
- npm test: 48 unit and integration tests, including two concurrent bookings for the same slot
- Run in GitHub Actions on every pull request

## Limitations and next steps
- Arabic UI only
- No online payment yet; patients pay at the clinic
- One clinic per deployment`
        },
        {
          cmd: "GitHub profile",
          title: "بروفايل GitHub: الـ profile README والـ pinned repos",
          desc: R`لما حد يدوس على لينك GitHub اللي في الـ CV بيشوف ٣ حاجات: الصورة والاسم والـ bio، وبعدين الـ profile README لو موجود، وبعدين الـ pinned repos. دي الـ ٥ ثواني بتوعك.

الـ profile README: repo عام اسمه نفس الـ username بتاعك بالظبط، وفيه [[README.md]]. GitHub بيعرضه فوق البروفايل أوتوماتيك. اكتب فيه مين انت في سطرين، و ٢ أو ٣ مشاريع بلينكات، وازاي يكلموك. من غير عداد زيارات ولا ٤٠ badge.

الـ pins: GitHub بيسمح بـ ٦ repos متثبّتة (Customize your pins). حط المشاريع اللي اخترتها في الدرس اللي فات بس، ولكل repo: description بجملة، ولينك الـ live في خانة الـ website، و topics. والـ repos القديمة اللي مش عايزها تبان: اعملها archive أو private. وخانة الـ contributions الخضرا متقلقش منها: محدش بيتعين بسببها.`,
          example: R`gh auth status
gh repo create YOUR_USERNAME --public --add-readme --clone -d "About me"
gh repo edit YOUR_USERNAME/clinic-booking -d "Online clinic booking with no double booking" -h https://clinic-demo.example.com --add-topic nextjs --add-topic postgresql
gh repo list --source --limit 100 --json name,description,homepageUrl --jq '.[] | select(.description == "" or .homepageUrl == "") | .name'
gh repo archive YOUR_USERNAME/old-tutorial-clone`,
          try: R`اعمل الـ profile README (غيّر [[YOUR_USERNAME]] باسمك)، واكتب فيه ٦ سطور بالكتير. وبعدين شغّل أمر [[gh repo list]] وصلّح كل repo من المشاريع المختارة طلع في النتيجة. وثبّت الـ pins من صفحة البروفايل. وفي الآخر افتح بروفايلك من متصفح private وبص عليه ٥ ثواني كأنك recruiter.`,
          deep: {
            why: "الـ CV بيقول انت عملت إيه، و GitHub المفروض يثبت ده. بروفايل فيه ٣٠ repo اسمهم test1 و my-app و untitled بيخلّي المشاريع القوية تضيع، واللي بيفرز مش هيدوّر.",
            how: R`[[gh auth status]] بيتأكد إنك مسجل دخول (لو لأ: [[gh auth login]]). و [[gh repo create]] باسم الـ username بيعمل الـ repo الخاص بالبروفايل، و [[--clone]] بينزّله عندك تعدّل الـ README وتعمل push.

[[gh repo edit]] بيظبط الـ description والـ homepage والـ topics من غير ما تفتح الإعدادات. والـ topics بتظهر كـ tags وبتخلّي الـ repo يطلع في البحث بالـ technology.

[[gh repo list --source]] بيجيب الـ repos بتاعتك من غير الـ forks، و [[--json]] مع [[--jq]] بيفلتر الناقصين. والـ archive بيخلّي الـ repo read-only وعليه علامة إنه قديم، من غير ما تمسحه.

الـ pins نفسها من الموقع: صفحة البروفايل، ثم «Customize your pins». وتقدر تثبّت repos من organizations انت مساهم فيها، ودي حاجة قوية لو ساهمت في open source.`,
            when: "مرة واحدة دلوقتي، وبعدين كل ما تخلّص مشروع يستاهل pin. وقبل ما تقدّم على أي وظيفة، افتح البروفايل كأنك غريب.",
            mistakes: R`صورة كرتون أو مفيش اسم حقيقي. الـ profile README مليان badges وإحصائيات ومفيهوش جملة مفيدة. pins لـ forks معملتش فيها حاجة. repos فيها [[.env]] أو مفاتيح API (راجع درس «commit history»). ومسح repos قديمة فيها تاريخ مهم بدل ما تعملها archive.`
          },
          lines: [
            "اتأكد إن gh مسجل دخول بحسابك.",
            "اعمل repo البروفايل: نفس اسم الـ username، عام، فيه README، وانزله عندك.",
            "ظبّط description ولينك live و topics لمشروع من المختارين.",
            "هات الـ repos بتاعتك (من غير forks) اللي ناقصها description أو لينك.",
            "اعمل archive لـ repo قديم: يفضل موجود بس واضح إنه مش شغال عليه."
          ],
          sol: R`بعد الـ push، افتح [[github.com/YOUR_USERNAME]]: المفروض الـ README يظهر فوق البروفايل في مربع لوحده. لو مظهرش، غالبًا الـ repo اسمه مختلف عن الـ username في حرف أو كابيتال، أو الـ repo private.

أمر [[gh repo list]] المفروض مايطلعش ولا واحد من المشاريع المختارة بعد ما تصلّحهم. لو طلّع repos قديمة كتير، دي مرشّحة للـ archive.

وفي نظرة الـ ٥ ثواني، المفروض تعرف: انت مين، وبتعمل إيه، وأقوى مشروع فين. تحت مثال للـ profile README. الغلط الشائع: README طويل بيحكي قصتك من الأول، أو فاضي غير «Hi there 👋».`,
          solCode: R`## Hi, I'm Mona 👋
Junior full-stack developer in Cairo. I build web apps that small businesses actually use.

- **Clinic Booking**: online booking for a real clinic, no double booking · [live](https://clinic-demo.example.com) · [code](https://github.com/mona/clinic-booking)
- **Shop API**: REST API with auth, roles and payment webhooks · [docs](https://shop-api.example.com/docs) · [code](https://github.com/mona/shop-api)

Stack: TypeScript, React, Next.js, Node.js, PostgreSQL, Docker
Reach me: mona@example.com · [LinkedIn](https://www.linkedin.com/in/mona-example) · [Portfolio](https://mona.example.com)`
        },
        {
          cmd: "commit history",
          title: "تاريخ commits شكله احترافي: إيه اللي بيبان منه؟",
          desc: R`ناس كتير بتفتح الـ commits مش الكود. وبيبان منها حاجات: commit واحد اسمه «initial commit» فيه المشروع كله بيوحي إنه منسوخ. ورسايل زي «fix» و «asd» و «final final 2» بتقول إنك مش متعود تشتغل في فريق. وملف [[.env]] أو [[node_modules]] جوه الـ repo بيقول إنك مش عارف أساسيات.

القواعد بسيطة: commit لكل خطوة منطقية واحدة، ورسالة بصيغة الأمر بتقول إيه اللي اتغير (و Conventional Commits زي [[feat:]] و [[fix:]] لو حابب)، و [[.gitignore]] من أول يوم. ونضّف تاريخك المحلي قبل الـ push (زي [[--amend]])، بس متعدّلش تاريخ اتعمله push وحد تاني بيشتغل عليه. التفاصيل في «تاب Git».`,
          example: R`git log --oneline -15
git log --stat -1
git add -p
git commit -m "feat(booking): prevent double booking with a unique index"
git commit --amend --no-edit
git log --all --oneline -- .env
git ls-files | grep -E "node_modules/|(^|/)\.env$"`,
          try: R`شغّل أول أمر وآخر أمرين على أقوى مشروع عندك. عدّ الرسايل اللي مبتقولش حاجة («fix»، «update»، «wip»). ولو الأمر السادس أو السابع طلّع أي حاجة، اعرف ليه وصلّحها. ومن النهارده، في المشروع الجاي، اكتب كل رسالة بحيث حد يفهم التغيير من السطر ده بس.`,
          deep: {
            why: "في الشغل الـ git log هو تاريخ المشروع، والناس بتدوّر فيه عشان تفهم «ليه السطر ده كده؟». اللي بيقرا تاريخك في الـ portfolio بيتخيّل إزاي هتشتغل في الـ repo بتاعه. والـ secrets المتسربة مش شكل بس: bots بتدوّر على مفاتيح في repos عامة باستمرار.",
            how: R`[[git log --oneline]] بيوريك الرسايل بس، وده اللي الناس بتشوفه. [[--stat -1]] بيوريك آخر commit لمس أنهي ملفات: لو commit اسمه «fix typo» ولمس ١٥ ملف، الرسالة كدابة.

[[git add -p]] بيعرض كل تغيير لوحده وتختار (y أو n)، فتقسّم شغل ساعتين لكذا commit منطقي بدل commit واحد فيه كل حاجة.

[[--amend --no-edit]] بيضيف اللي عملته [[add]] للـ commit الأخير من غير ما يغيّر رسالته: مثالي لـ «نسيت ملف». بس بيغيّر الـ hash، فمتستخدمهوش على commit اتعمله push لـ branch مشترك.

[[git log --all -- .env]] بيدوّر في كل التاريخ، حتى لو الملف اتمسح بعدين. لو طلّع commits، المفاتيح اللي فيه اعتبرها اتسربت: الغيها واعمل غيرها من لوحة الخدمة. مسحها من التاريخ خطوة تانية مش بديل. و [[git ls-files]] بيوريك الملفات المتتبّعة دلوقتي.`,
            when: "كل commit. والتنضيف (amend، أو rebase تفاعلي) قبل الـ push بس. وفي الشغل، الفريق غالبًا بيعمل squash merge، فعنوان الـ PR بيبقى هو الرسالة على main.",
            mistakes: R`تعمل [[git add .]] كل مرة فيدخل كل حاجة. تكتب الرسالة عن اللي انت عملته («worked on stuff») بدل اللي اتغير. تعمل force push على main عشان تنضّف. تمسح [[.env]] من الكود وتفتكر إن المشكلة اتحلت وهو لسه في التاريخ. وتعمل commits مزيفة عشان المربعات الخضرا: أي حد بيبص بجد بيلاحظ.`
          },
          lines: [
            "آخر ١٥ رسالة: ده اللي الناس بتشوفه في دقيقة.",
            "آخر commit لمس أنهي ملفات وبكام سطر.",
            "اختار التغييرات جزء جزء، عشان كل commit يبقى حاجة واحدة.",
            "رسالة بتقول إيه اللي اتغير، بصيغة Conventional Commits.",
            "ضيف اللي نسيته للـ commit الأخير من غير ما تغيّر رسالته (قبل الـ push بس).",
            "هل .env اتعمله commit في أي وقت، حتى لو اتمسح بعدين؟",
            "هل فيه node_modules أو .env متتبّعين دلوقتي؟ المفروض ميطلعش حاجة."
          ],
          sol: R`في مشروع نضيف: الأمرين الأخيرين ميطلعوش ولا سطر. لو [[git ls-files]] طلّع [[node_modules/]]، زوّده في [[.gitignore]] وشغّل [[git rm -r --cached node_modules]] واعمل commit. ولو [[.env]] ظهر في التاريخ، أول خطوة تغيير كل مفتاح فيه، مش مسح الملف.

وفي الرسايل، أغلب الناس بتلاقي نص رسايلها أو أكتر مبتقولش حاجة، وده عادي في المشاريع الشخصية. التاريخ القديم سيبه (إعادة كتابته مخاطرة ومش فارقة كتير)، والمهم الـ commits الجديدة تبقى زي «fix(auth): keep users logged in after token refresh».

الغلط الشائع: تحاول تعمل rebase لكل تاريخ المشروع عشان يبان حلو، وتبوّظ حاجة. اللي يفرق فعلًا: آخر ٣٠ commit شكلهم كويس، ومفيش secrets.`
        },
        {
          cmd: "portfolio site",
          title: "موقع portfolio بسيط: محتاج إيه بالظبط؟",
          desc: R`صفحة واحدة كفاية: اسمك وبتعمل إيه في جملة، و ٢ أو ٣ كروت للمشاريع (صورة، وجملة، والـ stack، ولينك Live ولينك Code)، ونبذة قصيرة، وإزاي يكلموك (إيميل، و LinkedIn، و GitHub)، ولينك للـ CV كـ PDF. سريعة، وشغالة على الموبايل، والصور ليها [[alt]]، والـ title والـ description مكتوبين عشان اللينك يبان كويس لما يتبعت.

الاستضافة ببلاش في أماكن كتير (GitHub Pages، و Vercel، و Netlify، و Cloudflare Pages، والشروط بتتغير فاتأكد). ودومين باسمك اختياري ورخيص نسبيًا، وبيبان احترافي في الـ CV. والأهم: متقضيش شهرين في animations. الموقع مش هو الـ portfolio، المشاريع هي. الموقع مجرد لافتة بتشاور عليها. ولو معندكش وقت، الـ GitHub profile README كفاية في الأول.`,
          example: R`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mona Adel · Full-stack Developer</title>
<meta name="description" content="Junior full-stack developer in Cairo: React, Node.js, PostgreSQL. Projects, CV and contact."></head>
<body>
<header><h1>Mona Adel</h1><p>Junior full-stack developer. I build web apps that small businesses actually use.</p></header>
<main>
<article>
<img src="clinic.webp" alt="Clinic booking: a patient picking a free slot" width="640" height="360" loading="lazy">
<h2>Clinic Booking</h2><p>Online booking for a real clinic, with no double booking. Next.js, PostgreSQL, Docker.</p>
<a href="https://clinic-demo.example.com">Live</a> · <a href="https://github.com/mona/clinic-booking">Code</a>
</article>
</main>
<footer><a href="mailto:mona@example.com">mona@example.com</a> · <a href="https://www.linkedin.com/in/mona-example">LinkedIn</a> · <a href="cv.pdf">CV (PDF)</a></footer>
</body>
</html>`,
          try: R`اعمل الصفحة دي لنفسك بمشاريعك (زوّد CSS بسيط من «تاب HTML و CSS»)، وارفعها على GitHub Pages أو أي استضافة static. وبعدين افتحها على الموبايل، وشغّل Lighthouse من DevTools، وابعت اللينك لنفسك على WhatsApp وشوف الـ preview.`,
          flag: "script",
          deep: {
            why: "لينك واحد في الـ CV وفي LinkedIn بيودّي لكل حاجة: المشاريع شغالة، والكود، والـ CV، وإزاي تكلمك. وكمان هو نفسه مشروع frontend صغير: لو بطيء أو بايظ على الموبايل، ده بيقول حاجة عن شغلك.",
            how: R`الـ HTML من غير framework كفاية جدًا لصفحة زي دي، وأسرع حاجة ممكنة. ولو عايز تستخدم Next.js أو Astro عشان تتعلم، تمام، بس النتيجة لازم تبقى static وسريعة.

[[width]] و [[height]] على الصورة بيمنعوا الصفحة تتنطط وهي بتحمّل (CLS)، و [[loading="lazy"]] للصور اللي تحت. وصيغة [[webp]] أو [[avif]] وحجم مناسب، مش صورة ٤MB.

الـ [[title]] والـ [[description]] هما اللي بيظهروا في Google وفي الـ preview. ولو عايز صورة في الـ preview لما اللينك يتبعت، زوّد وسوم Open Graph ([[og:title]] و [[og:image]]).

GitHub Pages: repo فيه [[index.html]]، ومن Settings ثم Pages اختار الـ branch. وبيبقى على [[username.github.io]]، أو دومينك لو ربطته.`,
            when: "بعد ما يبقى عندك مشروعين يستاهلوا على الأقل. قبل كده، وقتك في المشاريع أنفع.",
            mistakes: R`موقع فيه loader بياخد ٣ ثواني، أو animations بتتقل الموبايل. أقسام «Skills» فيها progress bars (React 85%). لينكات مشاريع بايظة. مفيش إيميل واضح. تصميم منسوخ من template مشهور زي ما هو. وتأجيل التقديم على الشغل لحد ما الموقع «يخلص».`
          },
          lines: [
            "نوع المستند: HTML5.",
            "لغة الصفحة إنجليزي، عشان قارئ الشاشة والترجمة.",
            "الـ charset، والـ viewport عشان الموبايل.",
            "العنوان اللي بيظهر في التاب وفي Google.",
            "الوصف اللي بيظهر في نتايج البحث وأحيانًا في الـ preview.",
            "بداية المحتوى.",
            "اسمك وجملة بتقول بتعمل إيه ولمين.",
            "المحتوى الأساسي: المشاريع.",
            "كارت مشروع.",
            "صورة بـ alt بيوصفها، ومقاساتها، وتتحمّل لما تقرّب.",
            "اسم المشروع وجملة ومعاها الـ stack.",
            "لينك الـ live ولينك الكود.",
            "نهاية الكارت.",
            "نهاية المحتوى.",
            "التواصل: إيميل و LinkedIn والـ CV.",
            "نهاية الـ body.",
            "نهاية الصفحة."
          ],
          sol: R`المفروض تفتح الصفحة على الموبايل من غير scroll عرضي، وكل لينك يفتح حاجة شغالة. و Lighthouse على صفحة زي دي المفروض يدّي أرقام عالية (غالبًا ٩٠ أو أكتر) في Performance و Accessibility و SEO. لو Performance قليل، أول مشتبه فيه حجم الصور. ولو Accessibility قليل، غالبًا [[alt]] ناقص أو ألوان النص مش واضحة على الخلفية.

في WhatsApp، المفروض يظهر الـ title. لو مفيش صورة في الـ preview، ده متوقع من غير [[og:image]]، زوّدها لو حابب.

الغلط الشائع: الصفحة شغالة عندك بس صورها مش ظاهرة بعد الرفع، عشان المسار فيه حروف كابيتال مختلفة (GitHub Pages بيفرّق بينهم) أو مسار بيبدأ بـ [[/]] والموقع في sub-folder.`
        }
      ]
    },
    {
      t: "الـ CV",
      l: 1,
      n: "صفحة واحدة بالإنجليزي، و bullets بأثر مش مهام، وتتقري صح في الـ ATS، والفرق بين CV لشركة محلية وشركة برا",
      items: [
        {
          cmd: "CV صفحة واحدة",
          title: "CV مطوّر junior: صفحة واحدة فيها إيه وبأنهي ترتيب؟",
          desc: R`صفحة واحدة، بالإنجليزي (ده الطبيعي لوظايف البرمجة في مصر وبرا)، والأحدث فوق. أول قراية للـ CV غالبًا ثواني، فالمهم يتلاقى من غير تدوير.

الترتيب للـ junior: الـ header (الاسم، والمسمى اللي بتقدّم عليه، والمدينة، والإيميل، والتليفون، ولينكات LinkedIn و GitHub والـ portfolio). وبعدين Summary من سطرين (اختياري). وبعدين Skills متقسّمة (Languages، و Frontend، و Backend، و Tools) وفيها بس اللي تقدر تتسأل فيه. وبعدين Projects، وده أهم قسم للـ junior، ويبقى قبل Experience لو خبرتك مش في البرمجة. وبعدين Experience (تدريب، وفريلانس، وأي شغل حقيقي). وبعدين Education والكورسات المهمة (برنامج تدريب طويل، مش كل كورس أونلاين). وفي الآخر Languages.`,
          example: R`MONA ADEL
Junior Full-stack Developer · Cairo, Egypt · mona@example.com · +20 100 000 0000
linkedin.com/in/mona-example · github.com/mona · mona.example.com
SUMMARY: 2 lines. What you build, your main stack, what you want next
SKILLS: Languages · Frontend · Backend · Databases · Tools (only what you can be interviewed on)
PROJECTS: 2 or 3, each with a live link, the stack and 2 or 3 impact bullets
EXPERIENCE: internships, freelance, part-time; role, company, dates, 2 or 3 bullets each
EDUCATION: degree, university, year; long training programs; GPA only if it helps
LANGUAGES: Arabic (native), English (professional working)`,
          try: R`اكتب الـ CV بتاعك بالترتيب ده في Google Docs أو Word (مش Canva بتصميم معقّد)، وخليه صفحة واحدة. وبعدين اطبعه أو صدّره PDF، واديه لحد ١٠ ثواني بس، واسأله: «أنا بعمل إيه؟ وأقوى مشروع ليا إيه؟». لو مجاوبش الاتنين، الترتيب أو الكلام محتاج يتعدّل.`,
          flag: "script",
          deep: {
            why: "على الإعلان الواحد بييجي CVs كتير، واللي بيفرز بيعمل مسح سريع: المسمى، والـ stack، والمشاريع. لو الحاجات دي مستخبية في الصفحة التانية أو وسط فقرة، بيعدّي. والصفحة الواحدة للـ junior بتجبرك تختار أقوى حاجاتك بس.",
            how: R`الـ header: لينكات تشتغل كـ hyperlinks في الـ PDF، ومن غير عنوان الشارع (المدينة كفاية). والمسمى يطابق الوظيفة: لو بتقدّم Frontend، اكتب Frontend.

الـ Summary: سطرين محددين («Junior full-stack developer building booking and e-commerce apps with React, Node.js and PostgreSQL. Looking for a team with strong code review.»). مش «Hard-working, passionate».

الـ Projects: كل مشروع سطر عنوان (الاسم، والـ stack، ولينك)، وتحته ٢ أو ٣ bullets بأثر (الدرس الجاي).

الـ Experience: حتى الشغل مش البرمجة ممكن يتكتب لو فيه حاجة قريبة (دعم فني، أو data entry عملت له أتمتة). والتواريخ بنفس الشكل في كل حتة (Mar 2025 – Aug 2025).

الـ Education: الكلية والسنة. ولو خريج جديد، التعليم ممكن يطلع فوق شوية. وبرامج التدريب الطويلة المعروفة في السوق عندك اذكرها باسمها.

الملف: PDF، واسمه [[Mona-Adel-CV.pdf]] مش [[cv_final_v3.pdf]].`,
            when: "قبل أول تقديم، وبعدين نسخة معدّلة لكل نوع وظيفة (Frontend، و Backend، و Full-stack)، وتحديث كل ما تخلّص مشروع أو تبدأ شغل.",
            mistakes: R`CV صفحتين أو تلاتة لـ junior. عمودين وأيقونات وصورة ودواير مهارات. Skills فيها ٣٠ حاجة منهم ١٠ جرّبتهم مرة. المشاريع من غير لينكات. إيميل مش احترافي ([[koko_2003@...]]). أخطاء إملائية في الإنجليزي (شغّل spell check). وتبعت ملف Word بدل PDF فالتنسيق يبوظ عند اللي فاتحه.`
          },
          lines: [
            "الاسم، أكبر حاجة في الصفحة.",
            "المسمى اللي بتقدّم عليه، والمدينة، والإيميل والتليفون.",
            "لينكات LinkedIn و GitHub والـ portfolio، تشتغل كـ hyperlinks.",
            "سطرين: بتعمل إيه، وبإيه، وعايز إيه.",
            "المهارات متقسّمة، واللي تقدر تتسأل فيه بس.",
            "المشاريع: أهم قسم للـ junior، ومعاها لينكات و bullets بأثر.",
            "الخبرة: أي شغل حقيقي، بنفس شكل التواريخ.",
            "التعليم وبرامج التدريب الطويلة.",
            "اللغات بمستوى صادق."
          ],
          sol: R`لو اللي قرا الـ CV قال في ١٠ ثواني «انت full-stack بـ React و Node، وعملت نظام حجز لعيادة»، الـ CV شغال. لو قال «انت خريج هندسة» بس، يبقى الـ Education واخد المساحة الأولى أو المشاريع مستخبية.

تحت مثال كامل لـ junior. لاحظ: مفيش كلمة «passionate»، وكل مشروع ليه لينك، والـ Skills قصيرة، والصفحة مش مليانة لآخرها.

الغلط الشائع: تحاول تملا الصفحة لآخر سطر بتصغير الخط لـ ٩. الأحسن تشيل أضعف bullet.`,
          solCode: R`MONA ADEL
Junior Full-stack Developer · Cairo, Egypt · mona@example.com · +20 100 000 0000
linkedin.com/in/mona-example · github.com/mona · mona.example.com

SUMMARY
Junior full-stack developer building booking and e-commerce apps with React, Node.js and PostgreSQL.
Looking for a product team with strong code review where I can own features end to end.

SKILLS
Languages: TypeScript, JavaScript, SQL, HTML, CSS
Frontend: React, Next.js, Tailwind CSS, React Testing Library
Backend: Node.js, Express, Prisma, REST APIs, JWT auth
Databases and tools: PostgreSQL, Redis, Docker, Git, GitHub Actions, Linux (Ubuntu), Nginx

PROJECTS
Clinic Booking · Next.js, TypeScript, PostgreSQL, Docker · clinic-demo.example.com
- Built online booking used by a real clinic (~40 appointments a week), replacing phone bookings.
- Prevented double booking under concurrent requests with a unique index and a retry-safe API.
- Set up CI/CD with GitHub Actions: 48 tests on every pull request, automatic deploy to a VPS.

Shop API · Express, Prisma, PostgreSQL, Jest · shop-api.example.com/docs
- Designed a REST API with role-based access (customer, staff, admin) and OpenAPI docs.
- Handled payment webhooks idempotently, so retried events never charge or ship twice.

EXPERIENCE
Freelance Web Developer · Self-employed · Mar 2025 – Present
- Delivered 3 websites for local businesses, from written scope to deploy and a monthly maintenance plan.

EDUCATION
B.Sc. Computer Science · Cairo University · 2025

LANGUAGES
Arabic (native) · English (professional working)`
        },
        {
          cmd: "bullets بأثر",
          title: "إزاي تكتب bullet بأثر مش قايمة مهام؟",
          desc: R`الـ bullet الضعيف بيوصف مسؤولية: «Responsible for the frontend». القوي بيقول عملت إيه، وبإيه، والنتيجة: فعل ماضي قوي (Built، و Designed، و Cut، و Automated)، وبعدين الحاجة، وبعدين الأداة أو الطريقة، وبعدين الأثر برقم أو بحاجة ملموسة. وفيه صيغة مشهورة بتتنسب لـ recruiters في Google: «Accomplished X, as measured by Y, by doing Z».

والـ junior بيقول «معنديش أرقام». عندك: أرقام تقدر تقيسها بنفسك. Lighthouse قبل وبعد، وزمن الـ response، وعدد الاختبارات، وحجم الـ bundle، وعدد اليوزرز الحقيقيين ولو ١٠، ووقت اتوفّر على حد. بس أبدًا متألّفش رقم: كل رقم في الـ CV سؤال في الانترفيو («قست الـ 1.6s دي إزاي؟»).`,
          example: R`Before: Responsible for the frontend of the project.
After:  Built the booking UI in React and TypeScript, used by ~40 patients a week at a local clinic.
Before: Worked on the backend using Node.js.
After:  Designed a REST API (Express, PostgreSQL) with role-based auth, covered by 60+ integration tests in CI.
Before: Improved website performance.
After:  Cut home page LCP from 4.1s to 1.6s (Lighthouse, mobile) by resizing images and caching API responses.
Before: Used Git and GitHub.
After:  (delete it: Git is expected; show it with a clean repo, not a bullet)`,
          try: R`خد ٥ bullets من الـ CV بتاعك (أو من المشاريع اللي اخترتها) واكتبهم تاني بالشكل ده. ولكل bullet مفيهوش رقم، اقيس رقم حقيقي النهارده: شغّل Lighthouse، أو عدّ الاختبارات بـ [[npm test]]، أو اسأل صاحب المحل كام واحد بيستخدمه.`,
          flag: "script",
          deep: {
            why: "مسؤولية زي «worked on backend» ممكن تبقى ساعتين أو سنة، ومبتفرّقش بينك وبين أي حد تاني. الأثر هو اللي بيفرّق، وهو اللي بيفتح أسئلة الانترفيو في حاجات انت عارفها كويس.",
            how: R`الأفعال: ابدأ كل bullet بفعل ماضي مختلف. Built، و Designed، و Implemented، و Automated، و Reduced، و Cut، و Migrated، و Replaced. وابعد عن «Helped with» و «Participated in» إلا لو ده فعلًا دورك، وساعتها قول الجزء بتاعك انت.

الأرقام اللي ينفع تقيسها لوحدك: Lighthouse (Performance، و LCP) قبل وبعد التحسين، وزمن الـ endpoint بـ [[curl -w]] (زي درس «DNS → TCP → TLS → HTTP → render» في «تاب الانترفيو»)، وعدد الاختبارات والـ coverage، وحجم الـ bundle، وعدد الـ queries في صفحة قبل وبعد حل N+1. واكتب إزاي قست بين قوسين لو مش واضح.

الأثر من غير رقم برضه ينفع لو ملموس: «replacing phone bookings»، أو «so retried payment events never charge twice». المهم يبقى نتيجة مش نشاط.

وكل bullet سطر واحد أو سطرين بالكتير، و ٢ لـ ٣ لكل مشروع. الأقوى الأول.`,
            when: "كل bullet في Projects و Experience. وفي LinkedIn نفس الـ bullets تقريبًا.",
            mistakes: R`أرقام متألّفة أو مبالغ فيها («improved performance by 300%») من غير ما تعرف تشرحها. bullets كلها بتبدأ بـ «Responsible for». قايمة أدوات في كل bullet («using React, Redux, Axios, Tailwind, ...») بدل ما تبقى في الـ Skills. وتحويل مشروع جماعي لـ «Built» كأنك عملته لوحدك: في الانترفيو هتتسأل عن جزء مش بتاعك.`
          },
          lines: [
            "قبل: مسؤولية، مفيهاش عملت إيه ولا النتيجة.",
            "بعد: فعل، والحاجة، والأداة، ومستخدمين حقيقيين.",
            "قبل: أداة من غير أي حاجة عملتها بيها.",
            "بعد: قرار تصميم (الأدوار)، ودليل على الجودة (اختبارات في CI).",
            "قبل: «حسّنت» من غير أي رقم.",
            "بعد: رقم قبل وبعد، وقست إزاي، وعملت إيه بالظبط.",
            "قبل: حاجة كل مطوّر المفروض يعرفها.",
            "بعد: تتشال. الـ bullet ده بياخد مكان حاجة أهم."
          ],
          sol: R`الـ bullet المكتوب صح بيعدّي الاختبار ده: لو شلت اسمك وحطيت اسم أي حد تاني من نفس الكورس، هيبقى لسه صح؟ لو آه، يبقى لسه مسؤولية مش أثر.

وفي القياس، أغلب الناس بتكتشف رقم كويس مكانتش واخدة بالها منه (عدد الاختبارات، أو Lighthouse عالي). ولو الرقم طلع وحش (LCP ٥ ثواني)، ده مش حاجة تخبيها: ده مشروع تحسين صغير هيطلّعلك bullet ممتاز بعد يومين.

تحت إعادة كتابة لـ bullets ضعيفة شائعة جدًا. الغلط الشائع: الـ bullet بقى ٣ سطور عشان تحط كل حاجة. سطر أو اتنين.`,
          solCode: R`Before: Developed a responsive e-commerce website.
After:  Built a responsive store (Next.js, Stripe test mode) with cart, checkout and order emails; Lighthouse mobile 94.

Before: Implemented authentication.
After:  Implemented email login with refresh-token rotation and rate-limited password reset (Express, Redis).

Before: Wrote unit tests.
After:  Added 35 unit and integration tests for pricing and coupons, catching 2 rounding bugs before release.

Before: Worked with a team of 4 students on a graduation project.
After:  Owned the backend of a 4-person graduation project: API design, PostgreSQL schema and deploy with Docker.

Before: Created an admin dashboard.
After:  Built an admin dashboard that replaced a shared Excel sheet, saving the owner ~3 hours a week on order tracking.`
        },
        {
          cmd: "ATS",
          title: "الـ ATS: إزاي الـ CV بتاعك يتقري صح من السيستم ومن الـ recruiter؟",
          desc: R`الـ ATS (applicant tracking system) هو السيستم اللي الشركة بتستقبل فيه التقديمات. بيحوّل الـ CV لنص ويحطه في خانات، والـ recruiter بيدوّر ويفلتر بالكلمات (React، و Node.js، و PostgreSQL). الخرافة المشهورة إن «السيستم بيرفض ٧٥٪ لوحده». غالبًا بني آدم هو اللي بيقرر، بس لو النص طلع بايظ أو الكلمات مش موجودة، انت مش هتطلع في البحث بتاعه أصلًا.

القواعد: PDF نصي (تقدر تحدد الكلام وتنسخه)، مش صورة ولا تصميم متحوّل لأشكال. عمود واحد. عناوين عادية (Experience، و Projects، و Skills). المعلومات المهمة مش جوه جداول أو أيقونات أو header الصفحة. واستخدم نفس الكلمات اللي في الإعلان لو هي صح عنك: لو مكتوب «PostgreSQL» متكتبش «Postgres» بس. وعدّل ترتيب المهارات والـ bullets لكل إعلان في ١٠ دقايق.`,
          example: R`sudo apt install poppler-utils
pdftotext -layout Mona-Adel-CV.pdf cv.txt
head -30 cv.txt
for k in React TypeScript Next.js Node.js PostgreSQL Docker REST Jest; do grep -qi -- "$k" cv.txt && echo "✓ $k" || echo "✗ $k"; done`,
          try: R`حوّل الـ CV بتاعك لنص بـ [[pdftotext]] (على ويندوز استخدم WSL). اقرا الناتج: الترتيب صح؟ فيه كلام ناقص أو حروف غريبة؟ وبعدين خد إعلان وظيفة حقيقي، وغيّر الكلمات في الـ loop لأهم ٨ حاجات في الإعلان، وشوف مين ناقص.`,
          deep: {
            why: "لو الـ CV شكله حلو بس النص جواه متلخبط، السيستم بيسجّل خانات فاضية أو غلط، والـ recruiter اللي بيدوّر بـ «React» مش هيلاقيك حتى لو React أقوى حاجة عندك. و [[pdftotext]] بيوريك تقريبًا اللي أي parser بسيط هيشوفه.",
            how: R`[[pdftotext]] من حزمة poppler-utils بيطلّع النص من الـ PDF، و [[-layout]] بيحاول يحافظ على الترتيب. لو الناتج فاضي، الـ PDF صورة (غالبًا متصدّر من أداة تصميم كـ image). ولو الأعمدة متداخلة (سطر من الشمال وسطر من اليمين)، ده اللي هيحصل في ATS كتير.

الـ loop بيدوّر على كل كلمة من غير فرق كابيتال وسمول ([[-i]])، و [[-q]] من غير طباعة، و [[--]] عشان لو الكلمة بدأت بـ [[-]]. ✗ معناها الكلمة مش موجودة: لو انت فعلًا عارفها، زوّدها في Skills أو في bullet بيثبتها. ولو مش عارفها، متزوّدهاش.

الـ tailoring: نسخة أساسية لكل نوع وظيفة، ولكل تقديم مهم: رتّب الـ Skills بحيث اللي في الإعلان يبقى الأول، وقدّم المشروع الأقرب للوظيفة، وخلّي المسمى في الـ header زي الإعلان. ١٠ دقايق مش ساعة.`,
            when: "قبل أول تقديم لأي CV جديد أو template جديد، وقبل كل تقديم مهم لتظبيط الكلمات.",
            mistakes: R`template من Canva بعمودين وأيقونات بدل الكلام (📧 بدل Email). كلمات بيضا مستخبية في الـ CV عشان «تضحك على الـ ATS»: الـ recruiter بيشوفها في النص وده بيقفل الموضوع. تحشي كل كلمات الإعلان حتى اللي متعرفهاش. واختصارات غير مشهورة، أو كتابة «JS» بس والإعلان «JavaScript».`
          },
          lines: [
            "تسطيب pdftotext (على Ubuntu أو WSL).",
            "طلّع النص من الـ PDF مع الحفاظ على الترتيب.",
            "اقرا أول ٣٠ سطر: ده تقريبًا اللي السيستم شايفه.",
            "لكل كلمة مهمة من الإعلان: ✓ لو موجودة في الـ CV، و ✗ لو ناقصة."
          ],
          sol: R`لو الـ CV معمول في Docs أو Word ومتصدّر PDF، الناتج المفروض يبقى نص نضيف بنفس الترتيب تقريبًا. لو طلع ملف فاضي، الـ PDF صورة، واعمله تاني من أداة نصية. ولو الكلام متداخل، عندك عمودين: حوّلهم لعمود واحد.

وفي الكلمات، غالبًا هتلاقي ١ لـ ٣ ✗. قسّمهم: حاجة انت عارفها ومش كاتبها (زوّدها فورًا، ويا سلام لو في bullet بدل Skills بس)، وحاجة مكتوبة بشكل مختلف («Postgres» بدل «PostgreSQL»، وده بيتحل بكتابة الاتنين أو صيغة الإعلان)، وحاجة متعرفهاش (سيبها، وحطها في قايمة التعلم لو بتتكرر في الإعلانات).

الغلط الشائع: كلمة زي [[Node.js]] بتطلع ✓ عشان الـ [[.]] في grep بتطابق أي حرف. مش مشكلة هنا، بس اعرف إنها regex.`
        },
        {
          cmd: "محلي ولا برا",
          title: "CV لشركة محلية ولا لشركة برا: إيه اللي يتشال وإيه اللي يتغير؟",
          desc: R`في الحالتين بالإنجليزي. CV بالعربي نادرًا ما هتحتاجه في وظيفة برمجة، إلا لو الجهة نفسها بتطلبه. الفرق في كام سطر.

الشركات المحلية في مصر كتير منها بتسأل عن موقف التجنيد للشباب (أدّى الخدمة، أو إعفاء، أو تأجيل)، وناس كتير بتحطه سطر في الـ CV عشان ميتسألش عليه، أو بيتطلب في استمارة التقديم. ولو برا أو remote: متحطش صورة ولا تاريخ ميلاد ولا الحالة الاجتماعية (في أسواق كتير زي أمريكا وإنجلترا ده مش متعارف عليه، وفي أسواق تانية أقل حساسية، فشوف السوق اللي بتقدّم فيه). واكتب المنطقة الزمنية وإنك متاح remote.

وفي كل الحالات شيل: الرقم القومي، والديانة، والعنوان بالشارع، و «References available upon request»، ونسب المهارات (React 80%)، و Microsoft Office، والصفات العامة («hard worker»). واللغات بمستوى صادق، لأن الانترفيو هيختبره.`,
          example: R`Both:          name, title, email, phone, LinkedIn, GitHub, portfolio, city and country
Local (Egypt): Military status: Completed / Exempted (men; many local companies ask)
Local (Egypt): phone as +20 1xx xxx xxxx, and "Cairo, Egypt" instead of a full address
Abroad/remote: "Cairo, Egypt (UTC+2, UTC+3 in summer) · Open to remote"
Abroad/remote: no photo, no date of birth, no marital status
Remove always: national ID, religion, "References available upon request", skill bars (React 80%)
Remove always: Microsoft Office, "hard-working", a generic objective paragraph
Languages:     Arabic (native), English (professional working): exact, the interview will test it`,
          try: R`اعمل نسختين من الـ CV: واحدة محلية وواحدة remote، بالفروق دي بس. وبعدين افتح إعلانين حقيقيين (واحد محلي وواحد remote) واقرا الـ requirements: هل فيه حاجة زي موقف التجنيد، أو ساعات overlap، أو مستوى إنجليزي محدد؟ زوّدها في النسخة المناسبة لو بتنطبق عليك.`,
          flag: "script",
          deep: {
            why: "كل سطر مالوش لازمة بياخد مكان من صفحة واحدة، وبعض السطور بتضر: صورة في CV لشركة في سوق مش متعود عليها ممكن تتشاف غريبة، وسؤال التجنيد لو متجاوبش في شركة محلية ممكن يأخّر الفرز. والشركة اللي برا أول قلقها في الـ junior: هل هيبقى متاح في ساعات شغلنا، وإنجليزيته كفاية؟",
            how: R`المنطقة الزمنية: مصر UTC+2 في الشتا و UTC+3 في الصيف (التوقيت الصيفي رجع من ٢٠٢٣). اكتبها كده، أو اكتب «Cairo (EET/EEST)». والشركة بتحسب منها ساعات الـ overlap (درس «remote لبرا»).

مستوى الإنجليزي: مصطلحات زي «professional working proficiency» (من مقياس LinkedIn) أو مستويات CEFR زي B2 و C1 لو عندك شهادة. متكتبش «fluent» لو بتتلخبط في الكلام.

موقف التجنيد: سطر قصير في آخر الـ CV أو جنب البيانات الشخصية. ولو «تأجيل»، اعرف هيخلص إمتى، لأنه هيتسأل.

الصورة في الشركات المحلية: شائعة ومش مشكلة غالبًا، بس مش ضرورية. لو حطيتها، تبقى صورة رسمية بسيطة.`,
            when: "أول ما تبدأ تقدّم في النوعين. وراجع الإعلان نفسه كل مرة: أحيانًا بيطلب حاجة صريحة (زي «must overlap 4 hours with CET»).",
            mistakes: R`نفس الـ CV بالصورة وتاريخ الميلاد لكل الشركات برا. «Fluent English» وانت محتاج تترجم في دماغك. تحط عنوانك الكامل ورقمك القومي. تنسى رمز الدولة في التليفون ([[+20]]) في الـ CV اللي رايح برا. وتكتب CV بالعربي لشركة برمجة لأنك «مرتاح أكتر».`
          },
          lines: [
            "الحاجات الثابتة في النسختين.",
            "موقف التجنيد: كتير من الشركات المحلية بتسأل عليه.",
            "التليفون برمز الدولة والمدينة بس.",
            "المنطقة الزمنية وإنك متاح remote: أول سؤال في دماغ الشركة اللي برا.",
            "حاجات شخصية مش متعارف عليها في أسواق كتير برا.",
            "حاجات تتشال من أي CV: مش آمنة أو مالهاش معنى.",
            "حشو بياخد مكان من غير ما يقول حاجة.",
            "مستوى اللغة بصدق."
          ],
          sol: R`المفروض النسختين يبقوا مختلفين في ٣ لـ ٥ سطور بس، والباقي واحد. لو لقيت نفسك بتكتب CV جديد من الأول، ده كتير.

في الإعلانات: الإعلان الـ remote غالبًا فيه حاجة عن الـ time zone أو «async communication» أو الإنجليزي. والمحلي أحيانًا فيه موقف التجنيد أو السن أو المنطقة (قريب من المكتب). اللي ينطبق عليك يروح في النسخة المناسبة، واللي مش بينطبق (زي مكان بعيد) قرار تقديم مش سطر CV.

الغلط الشائع: تنسى تحدّث النسختين لما تزوّد مشروع. خلي في فولدر career ملف واحد أساسي والنسختين منه.`
        }
      ]
    },
    {
      t: "تدوّر على شغل",
      l: 2,
      n: "الشغل الـ junior بييجي منين، والـ remote لشركات برا بواقعه، و LinkedIn، والرسايل اللي بيترد عليها، وشيت تتابع بيه كل تقديم",
      items: [
        {
          cmd: "الشغل بييجي منين",
          title: "الشغل الـ junior بييجي منين فعلًا؟",
          desc: R`بالترتيب من الأعلى في فرصة الرد للأقل غالبًا: الـ referral (حد جوه الشركة بيرشّحك)، وبعدين إنك تكلّم حد في الفريق أو الـ recruiter مباشرة، وبعدين التقديم من صفحة الـ careers بتاعة الشركة، وبعدين مواقع الوظايف (LinkedIn Jobs، ومواقع محلية زي Wuzzuf وغيره). والتقديم بدوسة زرار على ١٠٠ إعلان غالبًا أقل حاجة بتجيب ردود.

ومصادر تانية للـ junior: الـ internships (مدفوعة أو لأ، وخلي بالك من الـ unpaid الطويلة)، وبرامج التدريب الطويلة اللي بتنتهي بتوظيف أو علاقات (زي برامج حكومية ومبادرات معروفة، وشروطها ومواعيدها بتتغير كل سنة فتابعها)، والـ communities (جروبات، و Discord، و meetups، و GDG)، والـ open source (PRs مقبولة في مشروع معروف بتتذكر في الانترفيو)، والفريلانس اللي بيتحول شغل.

والـ referral مش واسطة: هو إن حد بيقول «شفت شغله، يستاهل انترفيو». وبييجي من ناس شافوا شغلك: زمايل كورس، ومنتورز، وناس في meetups، وناس قروا بوستاتك.`,
          example: R`Weekly job search plan (about 6 to 8 hours):
Mon: 5 targeted applications, each with a tailored CV and a short note (not 50 one-click applies)
Tue: 3 messages to engineers or recruiters at companies you applied to (templates in «رسالة باردة»)
Wed: 1 LinkedIn post about what you built or learned this week
Thu: 1 community event or online meetup; talk to 2 people, add them on LinkedIn
Fri: follow-ups due this week from the tracking sheet; update statuses
Sat: 2 hours on your strongest project (a feature, tests, or the README)
Every day: 20 min of «اختبرني» in «تاب الانترفيو» so you're ready when they call`,
          try: R`اكتب قايمة بـ ٢٠ شركة عايز تشتغل فيها (محلية وبرا)، ولكل واحدة: صفحة الـ careers، وحد واحد على الأقل شغال فيها على LinkedIn. وحط الجدول ده في الكاليندر بتاعك لأسبوعين، واعمل أول يوم النهارده.`,
          flag: "script",
          deep: {
            why: "الإعلان الواحد بييجي عليه تقديمات كتير جدًا، فالـ CV بتاعك بيبقى واحد من كومة. أي حاجة بتخلّي بني آدم يبص عليه بالاسم (ترشيح، أو رسالة، أو بوست شافه) بتنقلك من الكومة لأول القايمة. والـ junior أكتر واحد محتاج ده، لأن مفيش خبرة سابقة تلفت النظر لوحدها.",
            how: R`التقديم المستهدف: الإعلان يطابق ٦٠-٧٠٪ من المطلوب؟ قدّم، متستناش ١٠٠٪. عدّل الـ CV (درس «ATS»)، ولو فيه خانة note اكتب ٣ سطور: ليه الشركة دي، وأقرب مشروع ليك لشغلهم.

الـ referral: متطلبش من حد متعرفوش «ممكن refer؟» في أول رسالة. اسأل سؤال عن الفريق أو الشغل الأول، ولو الكلام مشي، اسأل لو ممكن يرشّحك، وابعتله الـ CV ولينك الإعلان بالظبط عشان تسهّل عليه. شركات كتير عندها مكافأة referral، فانت مش بتطلب خدمة كبيرة.

الأرقام: متوقع إن نسبة الردود تبقى قليلة، خصوصًا في التقديم البارد، ومحتاج عشرات التقديمات المستهدفة قبل انترفيوهات منتظمة. الأرقام بتختلف جدًا حسب السوق والوقت، فالمهم تقيس أرقامك انت (درس «شيت التقديمات») وتغيّر اللي مش شغال.

الـ internship: لو مدفوعة وفيها منتور، ممتازة حتى لو المرتب قليل. ولو unpaid، حدّد مدة قصيرة ومهام تعليمية واضحة، ومتقبلش «internship» هي في الحقيقة شغل كامل ببلاش لشهور.`,
            when: "أول ما يبقى عندك ٢ مشاريع قوية و CV جاهز. متستناش «لما أخلّص كمان كورس». والتقديم نفسه بيعلّمك إيه اللي السوق طالبه.",
            mistakes: R`١٠٠ تقديم بدوسة واحدة ومفيش ولا متابعة. تستنى الإعلان المثالي اللي بيطابقك ١٠٠٪. تطلب referral من حد متعرفوش في أول رسالة. تقدّم على senior roles «يمكن». وتوقف تذاكر وتبني خالص وانت بتقدّم، فتروح الانترفيو ناسي حاجات.`
          },
          lines: [
            "عنوان: الخطة الأسبوعية وقد إيه بتاخد.",
            "تقديمات قليلة مستهدفة، كل واحد بـ CV معدّل.",
            "رسايل لناس جوه الشركات: أعلى فرصة رد بعد الـ referral.",
            "بوست واحد: الناس بتعرفك قبل ما تقدّم.",
            "مكان فيه ناس: من هنا بتيجي الـ referrals.",
            "المتابعات من الشيت، في ميعادها.",
            "استمر تبني: المشروع اللي بيتحسن بيدّيك حاجة جديدة تحكيها.",
            "جاهزية الانترفيو كل يوم مش لما يتصلوا."
          ],
          sol: R`القايمة الكويسة فيها خليط: شركات منتجات محلية، وشركات outsourcing (بتوظف juniors أكتر غالبًا)، وشركات remote أو برا. ولو كل الـ ٢٠ شركات كبيرة مشهورة، زوّد شركات أصغر: فرصتك فيها أعلى وبتتعلم أسرع غالبًا.

ولو ملقتش حد شغال في شركة على LinkedIn، دوّر بـ «Software Engineer at CompanyName» أو شوف مين بيكتب في الـ engineering blog بتاعهم.

وبعد أسبوعين من الجدول، المفروض يكون عندك حوالي ١٠ تقديمات مستهدفة، و ٦ رسايل، وبوستين، ومتابعات في ميعادها. غالبًا الرد الأول هييجي من رسالة أو بوست مش من تقديم بارد. الغلط الشائع: الجدول بيتحول لتقديم بس، والرسايل والبوستات بتتأجل عشان محرجة.`
        },
        {
          cmd: "remote لبرا",
          title: "شغل remote لشركة برا: إيه الواقع اللي محدش بيقوله؟",
          desc: R`الـ remote لشركة برا ممكن يبقى فرصة كبيرة، بس فيه حاجات لازم تعرفها قبل ما تقبل. الأولى: ساعات الـ overlap. شركة في أوروبا فرقها معاك ساعة أو ساعتين، وشركة في أمريكا ممكن يبقى الـ standup بتاعها بالليل عندك، ولازم تقرر ده هيمشي معاك ولا لأ.

التانية: شكل التعاقد. يا موظف عن طريق شركة وسيطة (Employer of Record) بتعمل العقد نيابة عنهم، يا contractor مستقل بتبعت فاتورة كل شهر، يا عن طريق منصة. الـ contractor غالبًا مالوش تأمينات ولا إجازات مدفوعة ولا حماية من الإنهاء، فالمرتب لازم يعوّض ده.

التالتة: الفلوس. التحويل البنكي الدولي، أو خدمات دفع زي Payoneer وغيرها. والمتاح لمصر وشروطه ورسومه وسعر التحويل بيتغير، فاتأكد وقتها وجرّب بمبلغ صغير. والرابعة: الضرايب. الدخل ده عليه التزامات ضريبية في مصر في الغالب، والإجراءات بتتغير، فاسأل محاسب من الأول بدل ما تتفاجئ بعدين.`,
          example: R`for z in Europe/Berlin Europe/London America/New_York Asia/Dubai; do printf "%-18s " $z; TZ=$z date -d 'TZ="Africa/Cairo" 2026-10-05 10:00' '+%a %H:%M %Z'; done
TZ=America/New_York date -d 'TZ="Africa/Cairo" 2026-12-07 17:00' '+%a %H:%M %Z'`,
          try: R`اختار شركة remote حقيقية نفسك فيها، واعرف مقرها أو الـ time zone بتاع الفريق. احسب بالأمر ده: لو الـ standup بتاعهم ١٠ الصبح عندهم، هيبقى الساعة كام عندك؟ واكتب ٥ أسئلة هتسألها قبل ما تقبل أي عرض remote (العقد، والفلوس، والساعات، والأجهزة، والإنهاء).`,
          deep: {
            why: "ناس كتير بتقبل عرض remote عشان الرقم بالدولار، وبعد شهرين تكتشف إن الاجتماعات ٩ بالليل، وإن الفلوس بتوصل بعد أسبوعين وناقصة رسوم، وإنه مفيش تأمين، وإن العقد بيتلغي في أسبوع. معرفة الحاجات دي قبل القبول بتخليك تتفاوض عليها أو ترفض صح.",
            how: R`الـ overlap: أغلب الشركات بتطلب ٣ لـ ٤ ساعات مشتركة على الأقل. والتوقيت الصيفي في مصر وأوروبا وأمريكا بيبدأ ويخلص في أيام مختلفة، فالفرق بيتغير كام أسبوع في السنة. [[TZ="Africa/Cairo"]] جوه الـ date بيقول «الوقت ده بتوقيت القاهرة»، و [[TZ=]] قبل الأمر بيقول «اعرضه بتوقيت المدينة دي».

العقد: اسأل «Will I be an employee through an EOR or a contractor?». ولو contractor: مين بيدفع الأجهزة والنت؟ الإجازات مدفوعة؟ فترة الإخطار قبل الإنهاء كام؟ العملة إيه، والدفع إمتى، ومين بيتحمّل رسوم التحويل؟

الفلوس: حساب بنكي بالعملة الأجنبية بيحميك من التحويل الإجباري لو ده متاح في بنكك، واسأل البنك عن رسوم الاستلام. وخدمات الدفع بتختلف في الرسوم وسعر التحويل، فقارن بمبلغ صغير.

الضرايب والتأمينات: القوانين المصرية للدخل من برا بتتغير، وفيه أنظمة مختلفة للمهن الحرة. محاسب في ساعة استشارة أرخص بكتير من مشكلة بعدين.

والحياة: مكان شغل ثابت، ونت احتياطي (باقة موبايل)، وحل للكهربا لو بتقطع، وساعات تقفل فيها اللابتوب.`,
            when: "قبل ما تقدّم (تعرف الـ time zone ترضيك ولا لأ)، وفي مكالمة الـ recruiter (تسأل عن شكل العقد)، وقبل ما تمضي أي حاجة.",
            mistakes: R`تقارن المرتب بالدولار بمرتب محلي من غير ما تطرح التأمين والإجازات والرسوم والضرايب. تقبل overlap بالليل كل يوم وتفتكر إنك هتتعود. تشتغل من غير عقد مكتوب. تستلم الفلوس بطريقة واحدة بس من غير بديل. وتدّي بياناتك البنكية لـ «شركة» قبل ما تتأكد إنها حقيقية: فيه نصب كتير بعروض remote خيالية.`
          },
          lines: [
            "لكل مدينة: الساعة ١٠ الصبح بتوقيت القاهرة يوم ٥ أكتوبر تبقى كام عندهم.",
            "الساعة ٥ العصر بتوقيت القاهرة في ديسمبر تبقى كام في نيويورك؟ (١٠ الصبح، يعني ميعاد standup عندهم). غيّر الوقت والمدينة."
          ],
          sol: R`ناتج الأمر الأول يوم ٥ أكتوبر ٢٠٢٦ (مصر و أوروبا لسه على التوقيت الصيفي):

[[Europe/Berlin      Mon 09:00 CEST]]
[[Europe/London      Mon 08:00 BST]]
[[America/New_York   Mon 03:00 EDT]]
[[Asia/Dubai         Mon 11:00 +04]]

يعني أوروبا قريبة جدًا، ونيويورك ورا بـ ٧ ساعات: الـ standup الساعة ١٠ الصبح عندهم يبقى ٥ العصر عندك. والأمر التاني بيطلّع [[Mon 10:00 EST]]: يعني الساعة ٥ العصر في القاهرة في ديسمبر تبقى ١٠ الصبح في نيويورك. لو الأمر بيقول [[invalid date]]، انت على ماك (الـ date هناك مختلف)، استخدم WSL أو Linux.

والأسئلة الـ ٥ الكويسة: «Employee through an EOR or contractor?»، و «Currency, payment date and who pays transfer fees?»، و «Required overlap hours?»، و «Paid time off and public holidays?»، و «Notice period for termination on both sides?». الغلط الشائع: كل أسئلتك عن المرتب بس.`
        },
        {
          cmd: "LinkedIn",
          title: "بروفايل LinkedIn، وإنك تكتب عن اللي بتبنيه",
          desc: R`الـ recruiters بيدوّروا على LinkedIn بالكلمات، زي الـ ATS بالظبط. فالـ headline مش «Student at X» ولا «Aspiring developer». هي «Junior Full-stack Developer · React, Node.js, PostgreSQL». والـ About ٣ لـ ٤ سطور: بتبني إيه، وأقوى مشروع، وعايز إيه. والـ Featured فيها لينكات المشاريع والـ portfolio. والـ Experience والـ Projects نفس الـ bullets بتاعة الـ CV.

و «Open to work» ليها اختيار إنها تظهر للـ recruiters بس من غير الإطار الأخضر، وده كافي لناس كتير. والأهم من البروفايل: إنك تكتب. بوست قصير كل أسبوع عن حاجة بنيتها أو مشكلة حلّيتها، بصورة أو GIF. مش «أنا متحمس» ولا شهادات كورسات. ده بيخلّي ناس تعرفك قبل ما تقدّم، وبيجيب رسايل من recruiters أحيانًا.`,
          example: R`Headline: Junior Full-stack Developer · React, Next.js, Node.js, PostgreSQL · Open to remote
About: I build web apps that small businesses actually use.
About: Latest: online booking for a real clinic, with no double booking (Next.js, PostgreSQL, Docker).
About: Looking for a product team with strong code review. mona@example.com
Featured: Clinic Booking (live) · Shop API (docs) · Portfolio · CV
Post: What I built, the hard problem, how I solved it, one lesson, a GIF, and a link`,
          try: R`عدّل الـ headline والـ About والـ Featured بالشكل ده. وبعدين اكتب أول بوست عن أصعب مشكلة في أقوى مشروع عندك: ٦ لـ ١٠ سطور، وصورة أو GIF، ولينك. وبعد ما تنشره، ابعت طلب connection لـ ٥ ناس في شركات من قايمتك مع رسالة سطرين.`,
          flag: "script",
          deep: {
            why: "LinkedIn هو المكان اللي الـ recruiters بيدوّروا فيه قبل ما ينشروا إعلان، والمكان اللي أي حد هيفتحه بعد ما يشوف الـ CV. والبوستات هي أرخص طريقة للـ referral: المهندس اللي شاف بوستين ليك عن مشاكل حقيقية حلّيتها بيبقى مرتاح يرشّحك.",
            how: R`الـ headline: المسمى، وأهم ٣ لـ ٤ technologies، وحاجة زي «Open to remote» لو بتدوّر. دي الكلمات اللي بتطلع في البحث.

الـ About: مش سيرة ذاتية من الطفولة. بتبني إيه، ودليل (مشروع بلينك)، وعايز إيه، وإزاي يكلموك.

البوست: شكل بسيط بيشتغل. سطر أول يشد («Two patients booked the same slot at the same second. Here's how I fixed it.»)، والمشكلة، والحل بالتفصيل البسيط، ودرس واحد، وصورة أو GIF، واللينك (بعض الناس بيحطوه في أول comment). بالإنجليزي لو عايز توصل لشركات برا، وبالعربي تمام لو جمهورك محلي.

الـ connections: ناس في مجالك، وزمايل، وناس في الشركات اللي في قايمتك. والرسالة مع الطلب سطرين محددين («I read your post about migrating to Postgres; I'm working on something similar»).`,
            when: "البروفايل مرة ودلوقتي. والبوستات كل أسبوع أو اتنين طول ما انت بتدوّر، وبعد ما تتعين كمان بوتيرة أقل.",
            mistakes: R`headline «Student» أو «Seeking opportunities». بوستات شهادات كورسات بس. بوست كله hashtags ومفيهوش محتوى. تنسخ نفس البوست من ChatGPT بنفس الصيغة اللي الكل عرفها. طلبات connection لمئات الناس من غير رسالة. وبروفايل مختلف عن الـ CV في التواريخ أو المسميات.`
          },
          lines: [
            "الـ headline: المسمى والكلمات اللي الـ recruiter بيدوّر بيها.",
            "الـ About، سطر ١: بتعمل إيه.",
            "سطر ٢: أحدث دليل، مشروع حقيقي بالـ stack.",
            "سطر ٣: عايز إيه، وإزاي يكلموك.",
            "الـ Featured: لينكات يدوس عليها على طول.",
            "شكل البوست: مشكلة وحل ودرس ودليل."
          ],
          sol: R`البروفايل تمام لو حد دوّر على «Junior React developer Cairo» ممكن يلاقيك، ولو فتح بروفايلك عرف في ١٠ ثواني بتعمل إيه وفين الدليل.

والبوست الكويس بيبان زي اللي تحت: سطر أول فيه مشكلة حقيقية، ومفيش «I'm thrilled to announce». الـ reach في الأول هيبقى قليل (عشرات الـ views)، وده طبيعي. البوستات بتتراكم، والأثر الحقيقي إن الناس اللي هتكلمها بعدين هتلاقي عندك حاجة تتقري.

الغلط الشائع: تمسح البوست لو محدش عمله like. سيبه.`,
          solCode: R`Two patients booked the same 10:30 slot at the same second. Both got "Confirmed". 😬

My clinic booking app checked "is this slot free?" and then inserted the booking.
Under load, two requests passed the check before either inserted.

The fix wasn't more code. It was one line in the database:
a unique index on (doctor_id, starts_at).
Now the second insert fails, and the API returns "This slot was just taken, pick another".

Lesson: when two requests can race, let the database enforce the rule, not an if statement.

I wrote a test that fires both requests at once, so this can't come back.

Demo (GIF below) and code: github.com/mona/clinic-booking`
        },
        {
          cmd: "رسالة باردة",
          title: "رسالة لحد متعرفوش: إزاي تكتبها بحيث يرد؟",
          desc: R`الرسالة اللي بيترد عليها قصيرة (٤ لـ ٦ سطور)، ومكتوبة للشخص ده بالذات، وفيها طلب صغير وسهل. الناس مشغولة، فأي رسالة تحتاج مجهود عشان تتفهم أو تتجاوب بتتأجل وتتنسي.

الشكل: سطر إنت مين، وسطر ليه هو بالذات (بوست قراه، أو فريقه، أو حاجة في المنتج)، وسطر دليل (مشروع بلينك)، وطلب واحد صغير («هل الفريق بيعيّن juniors؟»، أو «ممكن ١٥ دقيقة أسألك عن الشغل عندكم؟»)، وشكر. ومتطلبش referral في أول رسالة لحد متعرفوش، ولا تبعت الـ CV من غير ما يطلبه، ولا «Hi» لوحدها وتستنى.

ومتابعة واحدة بعد أسبوع لو مفيش رد عادية ومقبولة. بعد كده سيبها.`,
          example: R`Hi Ahmed, I'm Mona, a junior full-stack developer in Cairo.
I read your post on moving your checkout to Next.js; the part about caching per user was really useful.
I built something close: a clinic booking app with Next.js and PostgreSQL, live at clinic-demo.example.com
I applied for the Junior Frontend role yesterday. Is the team open to juniors who haven't worked in a company yet?
Either way, thanks for sharing the post.`,
          try: R`اكتب ٣ رسايل حقيقية بالشكل ده لـ ٣ ناس في شركات من قايمتك: مهندس في الفريق، و recruiter، وحد في شركة متقدّمتش فيها لسه. كل رسالة لازم فيها حاجة محددة عن الشخص ده مش هتنفع لغيره. ابعتهم، وسجّلهم في شيت التقديمات بميعاد متابعة بعد أسبوع.`,
          flag: "script",
          deep: {
            why: "التقديم البارد بيحطك في كومة. الرسالة الكويسة بتخلّي بني آدم يبص على اسمك بالذات. وحتى لو الرد «مش بنعيّن دلوقتي»، بقى عندك حد يعرفك، وده بيتحول referral بعدين في أحيان كتير.",
            how: R`السطر المخصص هو اللي بيفرّق رسالتك عن رسايل الـ spam. اقرا بروفايله وآخر بوستاته، أو الـ engineering blog بتاع شركته، أو جرّب المنتج. ولو مفيش حاجة، اسم الفريق والمنتج كفاية.

الطلب الصغير: سؤال بـ آه أو لأ، أو ١٥ دقيقة. مش «ممكن تساعدني ألاقي شغل؟» (مجهود كبير ومش واضح).

للـ recruiter: أقصر، وفيها الوظيفة بالاسم أو رقمها، وأقرب مشروع ليها، وإنك قدّمت. ولو مفيش إعلان: «Are you hiring juniors for frontend this quarter?».

المتابعة: سطر واحد في نفس المحادثة بعد أسبوع («Just following up in case this got buried. Thanks!»). وبعدها سيبها، وخليك في الشيت.

والـ referral: بعد ما الكلام يمشي، «Would you be comfortable referring me? Here's the job link and my CV». وسهّل عليه: ابعتله نص قصير يقدر يلزقه عنك.`,
            when: "مع كل تقديم مهم (رسالة لحد في نفس الفريق)، وللشركات اللي معندهاش إعلانات بس نفسك فيها، وبعد meetup اتكلمت فيه مع حد.",
            mistakes: R`رسالة واحدة منسوخة لـ ٥٠ حد. رسالة طويلة فيها قصة حياتك. «Hi» لوحدها. تطلب referral من حد متكلمتوش قبل كده. تبعت الـ CV كـ attachment في أول رسالة. تتابع كل يومين. وتزعل لو محدش رد: نسبة الرد القليلة طبيعية.`
          },
          lines: [
            "مين انت في سطر.",
            "ليه هو بالذات: حاجة حقيقية قريتها منه.",
            "دليل: مشروع قريب من شغلهم بلينك.",
            "سياق وطلب صغير بـ آه أو لأ.",
            "شكر من غير ضغط."
          ],
          sol: R`الرسالة الكويسة لو شلت الاسم منها مبقتش تنفع لحد تاني. لو تنفع لأي مهندس في أي شركة، ارجع لسطر «ليه هو بالذات».

وتوقع إن رد أو اتنين من التلاتة يبقوا كويسين كنتيجة، وممكن صفر، ودي نتيجة عادية مش عليك. اللي يهم إنك تبعت كل أسبوع وتقيس. تحت نماذج للـ recruiter والمتابعة وطلب الـ referral.

الغلط الشائع: الطلب كبير («Can you help me get a job?») أو مش موجود خالص، فالشخص مش عارف يرد بإيه.`,
          solCode: R`To a recruiter:
Hi Sara, I just applied for the Junior Backend Developer role (#4521).
My closest work: a REST API with role-based auth and idempotent payment webhooks (shop-api.example.com/docs).
Happy to do a take-home or a short call whenever suits you. Thanks!

Follow-up (one week later, same thread):
Hi Sara, just following up in case this got buried. Still very interested in the role. Thanks!

Asking for a referral (after a good conversation):
Thanks again for the call yesterday, it made me even more interested in the team.
Would you be comfortable referring me for the Junior Frontend role? Job link: https://careers.example.com/jobs/123
Here's a short blurb you can paste: "Mona built a clinic booking app used by a real clinic (Next.js, PostgreSQL).
We talked about her project and she explained the trade-offs clearly." CV attached. No worries at all if not.`
        },
        {
          cmd: "شيت التقديمات",
          title: "شيت تتابع بيه التقديمات: وتعرف منه إيه اللي شغال",
          desc: R`لما التقديمات تعدّي ١٠، الدماغ بتنسى: قدّمت فين، وإمتى، وكلّمت مين، والمفروض أتابع إمتى. شيت بسيط (Google Sheets أو CSV) بيحل ده، وكمان بيدّيك أرقام: أنهي مصدر بيجيب ردود؟ أنهي نوع وظيفة بيوصل لانترفيو؟ ولو ٣٠ تقديم ومفيش ولا رد، المشكلة غالبًا في الـ CV أو في نوع الوظايف مش في حظك.

الأعمدة: التاريخ، والشركة، والوظيفة، والمصدر (referral، أو LinkedIn، أو careers page، أو موقع وظايف)، والحالة (applied، أو no reply، أو interview، أو rejected، أو offer)، والخطوة الجاية وميعادها.

والرفض جزء عادي من الشيت مش حاجة شخصية. سجّله، ولو وصلت لانترفيو اعمل له question log زي درس «بعد الرفض» في «تاب الانترفيو»، وكمّل.`,
          example: R`cat > applications.csv <<'EOF'
date,company,role,source,status,next_step,next_date
2026-09-01,Acme,Junior Frontend,referral,interview,technical round,2026-10-02
2026-09-03,Nile Soft,Junior Backend,LinkedIn,rejected,,
2026-09-05,Remote Co,Full-stack contract,careers page,applied,follow up,2026-09-19
2026-09-10,Delta Apps,Intern,job board,no reply,follow up,2026-09-24
EOF
cut -d, -f5 applications.csv | tail -n +2 | sort | uniq -c
awk -F, -v today="$(date +%F)" 'NR>1 && $7 != "" && $7 <= today {print $7, $2, $6}' applications.csv | sort
awk -F, 'NR>1 {n[$4]++} NR>1 && ($5=="interview" || $5=="offer") {ok[$4]++} END {for (s in n) print s ": " ok[s]+0 "/" n[s]}' applications.csv`,
          try: R`اعمل الملف ده بتقديماتك الحقيقية (أو افتحه في Google Sheets بنفس الأعمدة). شغّل الأوامر التلاتة. وحط تذكير أسبوعي (الجمعة مثلًا) تفتح فيه الشيت، وتعمل المتابعات اللي ميعادها جه، وتبص على آخر عمود: أنهي مصدر بيجيب انترفيوهات؟`,
          deep: {
            why: "من غير شيت: بتتابع مع ناس مرتين وناس لأ، وبتنسى انت قلت إيه في أنهي مكالمة، ومبتعرفش إيه اللي شغال. الأرقام بتحوّل «محدش بيرد عليّا» لحاجة تتصلح: «التقديم البارد ٠ من ١٥، والرسايل ٢ من ٥، يبقى أزوّد الرسايل».",
            how: R`الملف CSV عشان يتفتح في أي حاجة (Sheets، و Excel، والترمنال). وخلي القيم من غير فواصل جوه الخانة، لأن [[cut]] و [[awk]] هنا بيقسموا على الفاصلة بس. وفي Sheets، عمود الحالة خليه dropdown عشان متكتبش «Rejected» مرة و «rejected» مرة.

[[cut -d, -f5]] بياخد عمود الحالة، و [[tail -n +2]] بيشيل سطر العناوين، و [[sort | uniq -c]] بيعدّ كل حالة.

الـ awk التاني: [[-v today=...]] بيدّي تاريخ النهارده بصيغة YYYY-MM-DD، والتواريخ بالصيغة دي بتتقارن كنص صح. فبيطبع كل خطوة ميعادها جه أو فات.

الـ awk التالت: لكل مصدر ([[$4]]) بيعدّ التقديمات، وكام منهم وصل interview أو offer. والناتج نسبة لكل مصدر، ودي أهم حاجة في الشيت.`,
            when: "من أول تقديم. والمراجعة الأسبوعية ربع ساعة. ولما توصل لعرض، الشيت نفسه بيساعدك تقارن العروض وتعرف مين لسه مستني رد عشان تبلّغه.",
            mistakes: R`شيت فيه ٢٠ عمود متتملاش. تسجّل التقديم وتنسى تحدّث الحالة. متحطش ميعاد متابعة، فالمتابعة مبتحصلش. تشوف الأرقام وحشة وتكمّل بنفس الطريقة. وتمسح الـ rejected عشان متضايقش: هما جزء من الأرقام.`
          },
          lines: [
            "اعمل ملف CSV بالتقديمات.",
            "سطر العناوين: ٧ أعمدة.",
            "تقديم بـ referral وصل انترفيو.",
            "تقديم من LinkedIn اترفض.",
            "تقديم من صفحة الشركة، ومتابعة ميعادها فات.",
            "تقديم من موقع وظايف مفيهوش رد، ومتابعة ميعادها فات.",
            "نهاية الملف.",
            "كام تقديم في كل حالة.",
            "المتابعات اللي ميعادها جه أو فات النهارده، بالترتيب.",
            "لكل مصدر: كام تقديم وصل لانترفيو أو عرض من الإجمالي."
          ],
          sol: R`بالداتا اللي في المثال، ولو النهارده ٢٩ سبتمبر ٢٠٢٦:

الأمر الأول: حالة واحدة من كل نوع ([[1 applied]] و [[1 interview]] و [[1 no reply]] و [[1 rejected]]).

التاني: [[2026-09-19 Remote Co follow up]] و [[2026-09-24 Delta Apps follow up]]. متابعة الـ technical round مش طالعة لأن ميعادها ٢ أكتوبر لسه.

التالت: [[referral: 1/1]] وكل المصادر التانية [[0/1]] (الترتيب ممكن يختلف). حتى في ٤ سطور بس، الـ referral هو اللي جاب انترفيو، وده النمط اللي هتلاقيه غالبًا في شيتك الحقيقي.

لو الأمر الأول طلّع حالات زي [[Rejected]] و [[rejected]] لوحدهم، وحّد الكتابة. ولو التالت طلّع مصادر متقسمة غلط، غالبًا فيه فاصلة جوه خانة (زي «Cairo, Egypt»).`
        }
      ]
    },
    {
      t: "الفريلانس",
      l: 2,
      n: "أول عميل، و scope مكتوب قبل أي سطر كود، والتسعير بالساعة ولا بالمشروع، ومنع الـ scope creep، وإنك تتقبض، وعقد الصيانة بعدها",
      items: [
        {
          cmd: "أول عميل",
          title: "أول عميل فريلانس بييجي منين؟",
          desc: R`أول عميل غالبًا مش من منصة. من ناس تعرفك: قريب عنده محل أو عيادة، أو صاحب شغّال في شركة صغيرة محتاجة حاجة، أو بيزنس في منطقتك موقعه قديم أو مالوش موقع. والمنصات (عالمية زي Upwork، أو عربية زي مستقل وخمسات) بتنفع بس فيها منافسة كبيرة، وأول مشروع هناك أصعب حاجة لأن مفيش تقييمات.

والمفتاح: متعرضش «أعملك موقع». اعرض حل لمشكلة شايفها: «الحجز عندكم بالتليفون بس، وبيضيع مكالمات وقت الزحمة. أقدر أعملكم حجز أونلاين بسيط». وابدأ بمشروع صغير ومحدد (أسبوع أو اتنين) بدل «سيستم كامل». المشروع الصغير اللي يخلص كويس بيجيب التاني، وبيجيب ترشيح لعميل تالت.`,
          example: R`Arabic message to a local business you know, in your own words:
السلام عليكم يا دكتور، أنا منى، مطوّرة مواقع.
لاحظت إن الحجز عندكم بالتليفون بس، وإن الخط بيبقى مشغول وقت الزحمة.
عملت قبل كده نظام حجز أونلاين بسيط لعيادة: المريض يختار ميعاد فاضي، وحضرتك تشوف مواعيد اليوم.
ده لينك تجربة: clinic-demo.example.com
لو يناسبك، أقعد مع حضرتك ربع ساعة أفهم الحجز بيمشي إزاي عندكم، وأقولك التكلفة والمدة بالظبط.`,
          try: R`اكتب قايمة بـ ١٠ ناس أو بيزنس تعرفهم ممكن يحتاجوا حاجة (موقع، أو حجز، أو لوحة بدل Excel، أو أتمتة). لكل واحد اكتب المشكلة اللي شايفها في سطر، والحل الصغير اللي تقدر تعمله في أسبوعين. واختار أوضح ٣ وابعتلهم رسالة بالشكل ده.`,
          flag: "script",
          deep: {
            why: "الفريلانس بيدّي دخل وخبرة حقيقية وناس بتعتمد عليك، وده بيتكتب في الـ CV كـ Experience. بس أول عميل هو أصعب واحد، لأن مفيش تقييمات ولا portfolio عملاء. والناس اللي تعرفك بتديك الثقة اللي المنصة مش هتديهالك.",
            how: R`المشكلة قبل الحل: صاحب البيزنس مش مهتم بـ React، مهتم بمكالمات بتضيع، أو وقت في Excel، أو عملاء مش لاقيينه على Google. اكتب الرسالة بلغته هو.

المشروع الصغير الأول: صفحة حجز، أو لوحة طلبات، أو موقع صفحة واحدة بفورم. لو خلص في وقته وشغال، هو اللي هيطلب الخطوة الجاية. وبعدها اطلب منه testimonial سطرين وإذن تحطه في الـ portfolio.

المنصات: بروفايل بـ ٢ أو ٣ مشاريع حقيقية بلينكات، وعروض على مشاريع صغيرة وواضحة، وكل عرض مكتوب للمشروع ده بالذات (بتقول فهمت إيه وهتعمل إيه). والعمولات وقواعد كل منصة بتتغير، فاقرا شروطها الحالية قبل ما تبدأ.

والسعر في الأول: أقل من السوق شوية مفهوم عشان تبني تقييمات، بس مش ببلاش. الشغل ببلاش بيجيب عملاء مش محترمين الوقت.`,
            when: "بعد ما يبقى عندك مشروع أو اتنين تقدر توريهم، حتى قبل أول وظيفة. ولو انت موظف، اتأكد إن عقدك مش بيمنع شغل جانبي.",
            mistakes: R`تقبل «سيستم ERP كامل» كأول مشروع. تشتغل ببلاش «عشان الـ portfolio». تكتب رسالة كلها كلام تقني. تبعت نفس العرض على ٥٠ مشروع في منصة. تبدأ من غير اتفاق مكتوب (الدرس الجاي). وتشتغل مع قريب من غير فلوس واضحة فتخسر الشغل والعلاقة.`
          },
          lines: [
            "ملاحظة: الرسالة بالعربي لبيزنس محلي، بكلامك انت.",
            "تحية ومين انت، من غير ألقاب كبيرة.",
            "المشكلة اللي شايفها، بلغة صاحب البيزنس.",
            "دليل إنك عملت حاجة قريبة، بالنتيجة مش بالأدوات.",
            "لينك يجرّبه بنفسه.",
            "طلب صغير: ربع ساعة يشرحلك، وبعدها سعر ومدة."
          ],
          sol: R`القايمة الكويسة فيها ناس حقيقيين بأسماء، مش «مطاعم» أو «شركات». ولكل واحد مشكلة محددة شفتها بنفسك («المنيو صورة على Facebook ومش بتظهر في البحث»)، مش «محتاج موقع».

من ٣ رسايل، توقّع رد أو اتنين، وغالبًا واحد يقول «ابعتلي السعر». هنا متبعتش رقم على طول: اطلب الربع ساعة، لأن من غيرها هتسعّر حاجة مش فاهمها (درس «scope مكتوب» و «التسعير»).

الغلط الشائع: الحل اللي كتبته كبير (تطبيق موبايل وموقع ولوحة تحكم)، أو مش شايف مشكلة أصلًا وبتعرض «موقع» عشان هو ده اللي بتعرفه.`
        },
        {
          cmd: "scope مكتوب",
          title: "اتفاق مكتوب قبل أي سطر كود: فيه إيه؟",
          desc: R`أغلب مشاكل الفريلانس (العميل مش راضي، وشغل مالوش آخر، وفلوس متأخرة) بتبدأ من اتفاق بالكلام. الحل: صفحة أو اتنين مكتوبين والطرفين موافقين عليهم (رسالة إيميل أو WhatsApp بـ «موافق» أحسن من مفيش، وعقد ممضي أحسن). مش لازم لغة قانونية، لازم تبقى واضحة.

فيها: المشروع بيعمل إيه (الشاشات والمهام بالظبط)، واللي مش جزء منه (أهم قسم)، والمدة ومراحل التسليم، والسعر وطريقة الدفع (مقدّم ومراحل)، وعدد مرات التعديل، ومين بيدفع الاستضافة والدومين والخدمات الخارجية، ومين بيجيب المحتوى (الصور والنصوص)، وإيه اللي بيتسلّم في الآخر (الكود، والحسابات، والباسوردات) وإمتى، والدعم بعد التسليم لمدة قد إيه.

ده مش استشارة قانونية. ولو المبلغ كبير أو العميل شركة، اعرضه على محامي أو استخدم عقدهم وراجعه.`,
          example: R`# Project agreement: Online booking for Dr. Hany's clinic
## Scope (what's included)
- Patients book, cancel and reschedule a slot from a phone browser, in Arabic
- Doctor/admin page: today's appointments, working hours, days off
## Out of scope (quoted separately if needed)
- Online payment, mobile apps, SMS reminders, more than one clinic branch
## Timeline and delivery
- Milestone 1 (week 1): booking pages on a test link · Milestone 2 (week 2): admin page, launch
## Price and payment
- Fixed 24,500 EGP: 40% before starting, 30% at milestone 1, 30% at launch
## Revisions, content, costs
- 2 rounds of changes per milestone; the clinic provides texts and logo; domain and hosting paid by the clinic
## Handover and support
- After final payment: source code, admin and hosting access; 30 days of free bug fixes, then an optional maintenance plan`,
          try: R`اكتب اتفاق بالشكل ده لمشروع حقيقي أو من قايمة درس «أول عميل». أهم حاجة: قسم «Out of scope» فيه ٤ حاجات على الأقل العميل ممكن يفتكر إنها جوه. وبعدين اقراه كأنك العميل ودوّر على أي جملة ممكن تتفهم بطريقتين.`,
          flag: "script",
          deep: {
            why: "«موقع للعيادة» جملة بيتخيلها العميل حاجة وانت حاجة تانية. الاتفاق المكتوب بيطلّع الفرق ده قبل ما تشتغل مش بعد ما تخلّص. وكمان بيحميك في الدفع: فيه مراحل واضحة، فمش هتشتغل شهر وبعدين تسمع «مش عاجبني».",
            how: R`الـ Scope: اكتب حاجات تتشاف وتتجرّب («المريض يلغي الحجز من الموبايل»)، مش كلمات مطاطة («نظام حجز متكامل»). كل سطر ممكن يتقال عليه «اتعمل» أو «لأ».

الـ Out of scope: كل حاجة ممكن يفتكرها جوه وهي لأ. ده أهم قسم، لأنه اللي بيمنع الـ scope creep (الدرس بعد الجاي).

المراحل والدفع: المقدّم بيثبت إن العميل جاد وبيغطي وقتك في البداية. والمراحل بتربط الفلوس بحاجة تتسلم ويشوفها. والتسليم النهائي (الكود والحسابات) بعد آخر دفعة.

التعديلات: «جولتين تعديل لكل مرحلة» بيمنع دورة تعديلات مالهاش آخر. والتعديل هو تغيير في حاجة موجودة، والحاجة الجديدة مش تعديل.

التكاليف الخارجية: الدومين والاستضافة ورسوم الـ SMS وأي خدمة، الأفضل تبقى بحساب العميل وباسمه من الأول. كده لو انت مشيت، موقعه مش هيقع.`,
            when: "قبل أي مشروع مهما كان صغير، حتى لو قريبك. للمشروع الصغير جدًا رسالة بخمس سطور كفاية.",
            mistakes: R`تبدأ من غير مقدّم. تكتب scope عام ومفيش out of scope. تسجّل الدومين والاستضافة باسمك وعلى كارتك. تسلّم الكود والباسوردات قبل آخر دفعة. توعد «دعم مفتوح». ومتحددش مين بيجيب المحتوى، فتستنى صور العميل شهر والمشروع متوقف وانت اللي متأخر.`
          },
          lines: [
            "الـ Scope: كل سطر حاجة تتجرّب وتتقال «اتعملت».",
            "الأدمن: شاشات محددة، مش «لوحة تحكم كاملة».",
            "الـ Out of scope: الحاجات اللي ممكن يفتكرها جوه وهي لأ.",
            "المراحل: حاجة تتشاف على لينك تجربة في كل مرحلة.",
            "السعر الثابت ومقسوم على المراحل، ومقدّم قبل البداية.",
            "عدد التعديلات، ومين بيجيب المحتوى، ومين بيدفع الاستضافة.",
            "التسليم بعد آخر دفعة، ودعم لمدة محددة، وبعده عقد صيانة اختياري."
          ],
          sol: R`الاتفاق الكويس: كل سطر في الـ Scope حاجة ممكن تجرّبها وتقول «اتعملت» أو «لأ». لو فيه كلمة زي «متكامل» أو «احترافي» أو «سهل الاستخدام» من غير تفاصيل، دي جملة بتتفهم بطريقتين.

والـ Out of scope لمشروع حجز غالبًا فيه: الدفع أونلاين، والرسايل (SMS أو WhatsApp)، وتطبيق موبايل، وأكتر من فرع، ونقل بيانات المرضى القديمة، وكتابة المحتوى، والـ SEO المتقدم. لو محطتش «نقل البيانات القديمة»، غالبًا هتتطلب في آخر أسبوع.

الغلط الشائع: الاتفاق بيحمي العميل بس (مواعيد وغرامات عليك) ومفيهوش حاجة عنك (المقدّم، وإمتى المحتوى يوصل، وإيه اللي يحصل لو هو اتأخر).`
        },
        {
          cmd: "التسعير",
          title: "تسعّر بالساعة ولا بالمشروع؟ وتوصل للرقم إزاي؟",
          desc: R`بالساعة: العميل بيدفع على الوقت الفعلي. عادل للطرفين لما الـ scope مش واضح أو الشغل مستمر (صيانة، أو تعديلات، أو شغل مع فريق). بس العميل بيقلق من «مالهاش آخر»، وانت محتاج تسجّل الوقت بأمانة.

بالمشروع (fixed): رقم واحد لـ scope مكتوب. العميل بيحبه عشان عارف هيدفع كام. والمخاطرة عليك: لو قدّرت غلط، انت اللي بتدفع التمن. عشان كده الـ fixed محتاج scope مكتوب (الدرس اللي فات) وتقدير بجد.

الرقم: ابدأ من اللي محتاجه في الشهر، واقسمه على الساعات المدفوعة فعلًا (مش ١٦٠: جزء كبير من وقتك رسايل وبيع وتعلم ومشاريع مجاش منها فلوس). ده سعر ساعتك الأدنى. وقارنه بالسوق (منصات، وناس في نفس مستواك). وللـ fixed: قسّم المشروع لمهام وقدّر كل واحدة (زي درس «التقدير» في «تاب هندسة البرمجيات»)، وزوّد هامش للمجهول والمكالمات والتعديلات.`,
          example: R`// rate.mjs: node rate.mjs (example numbers only; use your own)
const monthlyTarget = 30000;
const billableHours = 80;
const hourly = Math.ceil(monthlyTarget / billableHours);
const tasks = { "pages and layout": 12, "admin dashboard": 16, "auth": 6, "payments": 10, "deploy and handover": 6 };
const hours = Object.values(tasks).reduce((a, b) => a + b, 0);
const buffer = 1.3;
const fixed = Math.ceil((hours * buffer * hourly) / 500) * 500;
console.log({ hourly, hours, fixed });
console.log("Deposit 40%:", fixed * 0.4, "| Milestone 30%:", fixed * 0.3, "| On delivery 30%:", fixed * 0.3);`,
          try: R`غيّر [[monthlyTarget]] للرقم اللي محتاجه فعلًا، و [[billableHours]] لرقم واقعي ليك. وبعدين خد المشروع اللي كتبت له اتفاق في الدرس اللي فات، وقسّمه لمهام في [[tasks]] بساعاتها. شغّل السكربت، وقارن الناتج بسعر مشروعين شبهه على منصة فريلانس أو من حد في المجال.`,
          flag: "script",
          deep: {
            why: "الـ junior غالبًا بيسعّر برقم «حاسس إنه مناسب» أو بأقل من اللي قدامه عشان ياخد الشغل، وبعد المشروع يكتشف إنه اشتغل بأقل من مرتب أي وظيفة. الحساب بيوريك الحد الأدنى اللي تحته انت بتخسر.",
            how: R`الساعات المدفوعة: لو بتشتغل فريلانس full-time، رقم زي ٦٠ لـ ١٠٠ ساعة مدفوعة في الشهر واقعي في الأول، والباقي بيروح في البحث عن عملاء ومكالمات وتعلم وإدارة. ولو بتشتغل جنب وظيفة، احسب الساعات اللي فعلًا عندك.

الهامش ([[buffer]]): ١.٢ لـ ١.٥ حسب المجهول. مشروع شبه حاجة عملتها قبل كده: هامش أقل. أول مرة تعمل دفع أونلاين: أكتر.

التقريب لأقرب ٥٠٠: الأرقام المدوّرة بتبان أكتر ثقة، ومفيش عميل بيفهم ليه ٢٤٣٧٥.

والسوق: السعر الأدنى بتاعك ممكن يطلع أعلى من اللي السوق بيدفعه لمستواك، وساعتها اختار: مشاريع أصغر، أو عملاء برا بعملة تانية، أو وظيفة مع فريلانس جانبي. وممكن يطلع أقل من السوق بكتير، وساعتها ارفع.

والضرايب والرسوم (عمولة المنصة، ورسوم التحويل) اطرحها من الرقم أو زوّدها عليه، متنساهاش.`,
            when: "قبل ما تبعت أي رقم. ولو عميل ضغط عليك برقم في المكالمة: «هبعتلك السعر مكتوب بكرة بعد ما أراجع التفاصيل» إجابة محترمة.",
            mistakes: R`تقول رقم في أول مكالمة. تحسب ١٦٠ ساعة مدفوعة. تسعّر fixed من غير scope مكتوب. تنسى وقت المكالمات والتعديلات والـ deploy. تنزّل السعر أول ما العميل يقول «غالي» بدل ما تشيل حاجة من الـ scope. وتشتغل بالساعة من غير ما تسجّل الوقت.`
          },
          lines: [
            "اللي محتاجه في الشهر (رقم مثال، حط رقمك).",
            "الساعات المدفوعة فعلًا في الشهر، مش كل ساعات الشغل.",
            "سعر الساعة الأدنى: تحته انت بتخسر.",
            "المهام وساعات كل واحدة، من التقدير.",
            "مجموع الساعات.",
            "هامش ٣٠٪ للمجهول والمكالمات والتعديلات.",
            "السعر الثابت، مقرّب لأقرب ٥٠٠.",
            "اطبع سعر الساعة والساعات والسعر الثابت.",
            "تقسيم الدفع: مقدّم ومرحلة وتسليم."
          ],
          sol: R`بالأرقام اللي في المثال الناتج:

[[{ hourly: 375, hours: 50, fixed: 24500 }]]
[[Deposit 40%: 9800 | Milestone 30%: 7350 | On delivery 30%: 7350]]

يعني ٥٠ ساعة شغل × ١.٣ هامش × ٣٧٥ للساعة = ٢٤٣٧٥، ومقرّبة ٢٤٥٠٠. لاحظ إن الهامش زوّد حوالي ٥٦٠٠ على الرقم: ده تمن المكالمات والتعديلات والمفاجآت اللي هتحصل فعلًا.

الأرقام دي مثال بس، مش سعر السوق. ولما تقارن بالمنصات، لو رقمك أعلى بكتير، راجع الـ scope (ممكن تشيل حاجة) أو نوع العملاء. ولو أقل بكتير، انت بتبيع نفسك رخيص.

الغلط الشائع: تحط [[billableHours]] = 160 فسعر الساعة يطلع صغير، وبعد شهر تلاقي نفسك بتشتغل ٢٠٠ ساعة عشان توصل للرقم.`
        },
        {
          cmd: "scope creep",
          title: "«ممكن بس تزوّد حاجة صغيرة؟»: تمنع الـ scope creep إزاي؟",
          desc: R`الـ scope creep هو إن المشروع بيكبر حاجة صغيرة ورا حاجة صغيرة من غير ما السعر أو الميعاد يتغيروا. كل طلب لوحده «٥ دقايق»، ومع بعض بقوا أسبوعين ببلاش، والمشروع اتأخر، وانت اللي شكلك وحش.

الحل مش إنك ترفض. الحل إن كل طلب جديد يعدّي على الاتفاق: جوه الـ scope؟ اعمله. برّه؟ قول «فكرة كويسة»، واكتب هيتكلف كام وهياخد قد إيه، وخلّي العميل يختار: يزوّده دلوقتي بسعره وميعاده، أو يأجّله لمرحلة تانية، أو يبدّله بحاجة من الـ scope بنفس الحجم. وكله مكتوب.`,
          example: R`Client: "Can you also add WhatsApp reminders? Should be quick."
Me (Arabic, in writing): فكرة ممتازة، والتذكير هيقلل المواعيد اللي بتضيع.
Me: ده مش من ضمن الاتفاق الحالي (مكتوب في «Out of scope»)، وبيحتاج حساب WhatsApp Business ورسوم رسايل.
Me: التقدير: يومين شغل، بـ 4,500 جنيه، والإطلاق يتأخر يومين. أو نعمله بعد الإطلاق كمرحلة تانية.
Me: أو لو التذكير أهم، ممكن نشيل صفحة الأجازات من المرحلة دي ونحط ده مكانها بنفس السعر.
Me: تحب نمشي بأنهي اختيار؟ وأول ما توافق هحدّث الاتفاق.`,
          try: R`اكتب ٣ ردود على طلبات حقيقية أو متخيلة: واحد جوه الـ scope (رد قصير: هعمله)، وواحد برّه وصغير فعلًا، وواحد برّه وكبير. في الاتنين الأخيرين لازم يبقى فيه سعر ومدة واختيارين على الأقل.`,
          flag: "script",
          deep: {
            why: "العميل غالبًا مش بيستغلك: هو فعلًا فاكر إن الحاجة صغيرة، لأنه مش شايف الشغل. الرد اللي فيه رقم ومدة بيوريه التمن الحقيقي، ويخليه هو اللي يقرر. ولو عملت كل حاجة ببلاش، هيتعوّد، وكل مشروع بعد كده هيبقى أصعب.",
            how: R`ابدأ بالموافقة على الفكرة، مش على الشغل: «فكرة ممتازة» بتخلّي الكلام تعاون مش خناقة.

ارجع للاتفاق: «مش من ضمن الاتفاق» مع إشارة للقسم. ده بيفصل الموضوع عنك: مش انت اللي رافض، ده اللي اتفقنا عليه.

اختيارات مش رفض: زوّدها بسعر ومدة، أو مرحلة تانية، أو بدّلها. العميل بيحب يختار.

اكتبها: كل تغيير اتوافق عليه يتكتب (تحديث للاتفاق، أو رسالة فيها «موافق على الاختيار الأول»). ولو الشغل بالساعة، الموضوع أسهل: «ده هيضيف تقريبًا ٦ ساعات» وخلاص.

والحاجات الصغيرة فعلًا (تغيير لون، أو كلمة) اعملها من غير ما تعمل منها قضية، بس خلّي بالك لو بقوا عشرة.`,
            when: "أول ما حاجة جديدة تتطلب، مش بعد ما تعملها. والأصعب: في آخر أسبوع قبل الإطلاق، لما العميل بيشوف المشروع شغال ويبدأ يتخيل حاجات.",
            mistakes: R`تقول «ماشي» في المكالمة عشان متحرجش، وبعدين تشتغلها بالليل. ترفض من غير بديل فالعميل يزعل. تطلب فلوس زيادة بعد ما عملتها من غير ما تقول الأول. تسيب التغيير بالكلام في مكالمة. وتعتبر كل طلب scope creep حتى لو هو جوه الاتفاق.`
          },
          lines: [
            "الطلب: حاجة «صغيرة» مش في الاتفاق.",
            "ابدأ بالموافقة على الفكرة وقيمتها للعميل.",
            "مش من ضمن الاتفاق، مع السبب، ومحتاجة حاجات من طرفه.",
            "اختيار ١: التمن والمدة وأثرها على الميعاد، أو اختيار ٢: مرحلة تانية.",
            "اختيار ٣: بدّل حاجة بنفس الحجم.",
            "هو اللي يختار، والاختيار يتكتب في الاتفاق."
          ],
          sol: R`الرد على الطلب اللي جوه الـ scope: قصير ومن غير أي تفاوض («أكيد، دي من ضمن المرحلة الأولى، هتكون جاهزة الخميس»). لو كتبت عليه فقرة، انت بتعقّد حاجة بسيطة.

الصغير البره: ممكن تعمله ببلاش مرة بس قول ده صراحة («دي برّه الاتفاق بس صغيرة، هعملها المرة دي»). كده العميل عارف إنها هدية مش حقه.

الكبير البره: لازم فيه رقم ومدة وأثر على الميعاد واختيارين. الغلط الشائع: الرد فيه «هشوف» أو «ممكن» من غير رقم، فالعميل بيفهمها «آه، ببلاش».`
        },
        {
          cmd: "تتقبض وتصون",
          title: "تتقبض إزاي؟ وإيه هو عقد الصيانة؟",
          desc: R`الفلوس: مقدّم قبل ما تبدأ (٣٠ لـ ٥٠٪ شائع)، ودفعات مربوطة بمراحل تتشاف، والتسليم النهائي (الكود والحسابات والباسوردات) بعد آخر دفعة. وفاتورة بسيطة لكل دفعة (رقم، وتاريخ، والمرحلة، والمبلغ، وطريقة الدفع)، وده بيفيد في الضرايب كمان. ولو الدفعة اتأخرت، رسالة مهذبة، وبعدها بتوقف الشغل على المرحلة الجاية لحد ما الدفعة توصل، وده مكتوب في الاتفاق من الأول.

المنصات (Upwork، و مستقل، و خمسات، وغيرهم) بتمسك الفلوس لحد التسليم (escrow)، وده بيحميك من إن العميل يختفي، مقابل عمولة. العمولات والشروط بتتغير، فاقراها. ومتنقلش العميل برّه المنصة لو شروطها بتمنع ده: حسابك ممكن يتقفل.

وبعد الإطلاق: الموقع محتاج تحديثات، و backups، ومراقبة، وتعديلات صغيرة. ده عقد صيانة شهري (retainer): مبلغ ثابت كل شهر مقابل حاجات محددة وعدد ساعات، والزيادة بالساعة. ده دخل ثابت ليك وراحة بال للعميل.`,
          example: R`Monthly maintenance plan: 2,000 EGP/month, 3-month minimum, cancel with 30 days' notice
Included: security and dependency updates, daily backups with a monthly restore test
Included: uptime monitoring; response within 1 working day, within 4 hours if the site is down
Included: up to 3 hours of small changes (texts, images, small fixes); unused hours don't carry over
Not included: new features and pages (quoted separately at 375 EGP/hour or a fixed price)
Invoice on the 1st of each month; payment within 7 days; work pauses if unpaid after 14 days`,
          try: R`اكتب عرض صيانة بالشكل ده لمشروع خلّصته أو هتخلّصه. حدد كل حاجة «Included» بحيث تقدر تعملها فعلًا (عندك monitoring؟ عندك backups اتجرّب الـ restore بتاعها؟). وبعدين اعمل template فاتورة بسيطة (Docs أو Sheets) فيها كل الخانات.`,
          flag: "script",
          deep: {
            why: "ناس كتير بتشتغل كويس وبتخسر في الفلوس: من غير مقدّم، ومن غير مراحل، وبتسلّم كل حاجة وبعدين تستنى. والصيانة بتحوّل عميل مرة واحدة لدخل شهري، وكل عميل صيانة مرضي بيرشّحك لغيره.",
            how: R`الفاتورة: رقم متسلسل (INV-2026-007)، واسمك وبيانات التواصل، واسم العميل، والتاريخ، والوصف («Milestone 1: booking pages»)، والمبلغ والعملة، وميعاد الدفع، وطريقة الدفع. Docs أو Sheets كفاية في الأول.

الـ escrow في المنصات: العميل بيحط الفلوس قبل ما تبدأ المرحلة، والمنصة بتحررها لما يوافق على التسليم. لو فيه خلاف، المنصة بتحكم بين الطرفين. عشان كده التواصل كله يبقى على المنصة.

الصيانة: اللي «Included» لازم يبقى عندك أدوات له: monitoring (خدمات uptime فيها خطط مجانية)، و backups أوتوماتيك، و restore اتجرّب (backup متجرّبش مش backup: شوف «تاب VPS»). و «unused hours don't carry over» بتمنع إن ساعات ٦ شهور تتجمع في طلب واحد كبير.

والمدة الأدنى (٣ شهور) وفترة الإلغاء بتدّي الطرفين استقرار.`,
            when: "الدفع: من أول مشروع. والصيانة: اعرضها قبل التسليم بأسبوع، لما العميل بيفكر «ولو حاجة باظت بعدين؟».",
            mistakes: R`تسلّم الكود والـ admin قبل آخر دفعة. «صيانة» من غير حدود فبقيت موظف ببلاش. تعد بـ backups ومتجربش restore أبدًا. تنقل عميل من المنصة لبرّاها وهي بتمنع ده. ومتعملش فواتير، فوقت الضرايب متعرفش دخلك كام.`
          },
          lines: [
            "السعر الشهري، وأقل مدة، وفترة الإلغاء.",
            "تحديثات أمان، و backups مع اختبار restore.",
            "مراقبة، ووقت رد محدد، وأسرع لو الموقع واقع.",
            "ساعات تعديلات صغيرة محدودة، ومبتتراكمش.",
            "المش داخل: الميزات الجديدة بسعر لوحدها.",
            "ميعاد الفاتورة والدفع، وإيه اللي يحصل لو اتأخر."
          ],
          sol: R`العرض الكويس كل سطر «Included» فيه انت عارف هتعمله إزاي بالظبط. لو كتبت «daily backups» ومعندكش سكربت أو خدمة بتعمله، شيله أو جهّزه الأول. نفس الكلام للـ monitoring ووقت الرد (هترد في ٤ ساعات وانت في شغلك التاني؟).

والفاتورة تمام لو فيها: رقم، وتاريخ، وطرفين، ووصف، ومبلغ بعملة، وميعاد، وطريقة دفع. لو ناقصها حاجة منهم، العميل هيسأل عليها وده بيأخر الدفع.

الغلط الشائع: سعر الصيانة قليل جدًا («٥٠٠ جنيه وأي حاجة تحتاجها»)، وبعد ٣ شهور العميل بيطلب ميزات كل أسبوع باسم الصيانة.`
        }
      ]
    },
    {
      t: "العرض وأول شغل",
      l: 3,
      n: "تقيّم العرض بأكتر من المرتب، وتتفاوض بأدب وبأرقام، وأول ٩٠ يوم، وتسأل صح، ومن junior لـ mid، ومن غير ما تتحرق",
      items: [
        {
          cmd: "تقييم العرض",
          title: "جالك عرض (أو اتنين): تقيّمه إزاي بأكتر من المرتب؟",
          desc: R`المرتب مهم، بس في أول شغل فيه حاجة أهم منه: هتتعلم قد إيه. فريق فيه seniors بيراجعوا كودك، وفيه code review و tests و CI، ومنتج حقيقي فيه يوزرز، ده بيطلّعك mid في وقت أقل بكتير من مكان بيدّيك أكتر شوية وانت لوحدك أو بتعمل نفس الحاجة كل يوم.

وفي المرتب نفسه: اعرف هو gross ولا net (في مصر بيتخصم منه تأمينات وضرايب، والفرق مش صغير، فاسأل عن الـ net). والعملة إيه. وفيه زيادة سنوية أو مراجعة بعد فترة الاختبار؟ وفيه bonus؟ والتأمين الطبي، والإجازات، والـ remote، والمواصلات أو بدل، والأجهزة، وساعات الشغل الحقيقية. والـ equity (أسهم) نادرة للـ junior في السوق ده، ولو موجودة في startup اعتبر قيمتها صفر في المقارنة.

ولو المعلومة مش موجودة في العرض، اسأل. سؤال «What's the net monthly amount?» أو «Who will I be working with day to day?» عادي جدًا.`,
          example: R`                    | Offer A: local product co. | Offer B: outsourcing agency
Net monthly         | 22,000 EGP                 | 25,000 EGP
Review / raise      | after probation, in writing | yearly, not specified
Team and mentoring  | 2 seniors review every PR  | often alone on client projects
Engineering         | tests, CI, staging         | varies by client, no CI on most
Product             | one product, real users     | many short projects, many stacks
Hours and remote    | 9-5, 2 days remote         | "flexible", deadlines at night
Benefits            | medical insurance, laptop  | medical insurance
Gut check after meeting the team | "I'd learn a lot" | "fast, but I'd be on my own"`,
          try: R`لو عندك عرض: اعمل الجدول ده بأرقامه الحقيقية، واكتب كل خانة ناقصة كسؤال هتبعته. ولو لسه: خد الوظيفتين اللي في شيت التقديمات الأقرب للعرض، واكتب الأسئلة اللي هتسألها لو جالك منهم عرض. وفي الحالتين، رتّب الصفوف حسب أهميتها ليك انت.`,
          flag: "script",
          deep: {
            why: "أول شغل بيحدد أول سنتين تلاتة في الكارير: العادات، والـ stack، ونوع المشاكل اللي اتعودت تحلها. والفرق بين عرضين في المرتب في أول شغل غالبًا أقل بكتير من فرق المرتب بعد سنتين بين حد اتعلّم كويس وحد لأ.",
            how: R`الـ net: اطلبه مكتوب أو احسبه تقريبيًا. التأمينات والضرايب في مصر ليهم شرايح وقواعد بتتغير، فاسأل الـ HR أو حد في نفس الشركة.

الفريق: اسأل «How many engineers are on the team, and who would review my code?» و «What does the first month usually look like for a junior?». الإجابات الغامضة («هتتعلم لوحدك، إحنا سريعين جدًا») معلومة.

الهندسة: اسأل عن الـ code review والاختبارات والـ deploy. ولو فيه فرصة تكلّم مهندس في الفريق قبل ما توافق، خدها.

فترة الاختبار: في مصر غالبًا ٣ شهور. اسأل هيحصل إيه بعدها (مراجعة؟ زيادة؟ عقد ثابت؟).

العرض مكتوب: قبل ما تستقيل من أي حاجة، أو ترفض عرض تاني، العرض لازم يبقى مكتوب وفيه المرتب وتاريخ البداية والمسمى (زي ما في درس «مراحل التوظيف» في «تاب الانترفيو»).

المقارنة: رتّب الصفوف حسب أهميتها ليك (التعلم الأول في أول شغل لناس كتير، والفلوس الأول لو عليك التزامات، وده قرار مشروع). وبعدين قرّر.`,
            when: "أول ما العرض يوصل، وقبل ما ترد بقبول. ومعظم الشركات بتديك كام يوم تفكر، فاطلبهم: «Could I have until Thursday to review it?».",
            mistakes: R`تقبل في نفس المكالمة من الفرحة. تقارن gross بـ net. تتجاهل «هتبقى لوحدك في المشروع» عشان الرقم أعلى شوية. تحسب الـ equity كفلوس. تستقيل على عرض بالكلام. وتقبل عرض وانت مستني رد من شركة تانية من غير ما تسألهم عن ميعادهم.`
          },
          lines: [
            "العناوين: العرضين جنب بعض.",
            "الـ net الشهري، مش الـ gross.",
            "المراجعة والزيادة: مكتوبة ولا كلام؟",
            "مين بيراجع كودك: أهم صف في أول شغل.",
            "الـ engineering practices: اختبارات و CI و staging.",
            "منتج واحد بيوزرز حقيقيين، ولا مشاريع قصيرة كتير.",
            "الساعات الحقيقية والـ remote.",
            "المزايا اللي ليها قيمة فلوس.",
            "الانطباع بعد ما قابلت الفريق: معلومة حقيقية مش رفاهية."
          ],
          sol: R`في المثال، العرض B أعلى بـ ٣٠٠٠، بس A فيه مراجعة لكل PR، واختبارات و CI، ومراجعة مرتب مكتوبة بعد فترة الاختبار. لـ junior بيدوّر يتعلم، A غالبًا الأحسن، والفرق في المرتب ممكن يتعوّض في أول مراجعة. ولو عليك التزامات مالية مبتستحملش الفرق، B قرار مفهوم بشرط تعوّض التعلم بنفسك (مراجعات من صحاب، ومشاريع جانبية باختبارات).

الجدول بتاعك تمام لو كل خانة فيها معلومة أو سؤال مكتوب هتبعته. ولو أكتر من ٣ خانات «مش عارف»، دي أسئلة لازم تتسأل قبل الرد.

الغلط الشائع: صف «Team and mentoring» فاضي، لأن ده السؤال اللي الناس بتتكسف تسأله، وهو أهم صف.`
        },
        {
          cmd: "التفاوض",
          title: "تتفاوض على المرتب بأدب وبأرقام: تقول إيه بالظبط؟",
          desc: R`التفاوض متوقع وعادي لو بأدب وبسبب، وأغلب الشركات مش بتسحب عرض عشان حد طلب زيادة معقولة. الأسوأ غالبًا إنهم يقولوا «ده أقصى حاجة عندنا».

قبل ما تتكلم: اعرف رينج السوق لمستواك ومدينتك (اسأل ناس في نفس المستوى، ومواقع الرواتب بتدّي فكرة بس مش دقيقة). وحدد ٣ أرقام لنفسك: الرقم اللي تتمناه، والرقم اللي تقبله مبسوط، والرقم اللي تحته هترفض. ولو اتسألت عن توقعاتك بدري، قول رينج أوله فوق رقمك الأدنى، أو اسأل عن الميزانية.

ولما العرض ييجي: اشكر، ووضّح إنك متحمس، واطلب رقم محدد بسبب مش شخصي (السوق، أو عرض تاني حقيقي، أو مهارة معينة محتاجينها). مش «عشان عندي إيجار». ولو المرتب مقفول، اتفاوض على حاجات تانية: مراجعة مكتوبة بعد ٣ أو ٦ شهور، أو يوم remote زيادة، أو ميزانية كورسات، أو تاريخ بداية.`,
          example: R`Thank you for the offer, I'm really excited about the team and the product.
Based on what I've seen for junior full-stack roles in Cairo and the skills you need for this role, I was expecting around 25,000 EGP net.
Is there flexibility to get closer to that number?
If the base is fixed, could we agree in writing on a salary review after the 3-month probation?
Either way, I'd love to make this work.`,
          try: R`اكتب الأرقام الـ ٣ بتوعك (المتمنّى، والمقبول، والأدنى) لوظيفة حقيقية، وبسبب كل رقم (مصدر السوق). وبعدين اكتب رسالة تفاوض بالشكل ده بأرقامك، وقولها بصوت عالي لصاحب يلعب دور الـ HR ويرد «ده أقصى حاجة عندنا». اتدرّب على الرد على الجملة دي بالذات.`,
          flag: "script",
          deep: {
            why: "أول مرتب هو الأساس اللي الزيادات بتتحسب عليه، وأحيانًا اللي الشركة الجاية بتقارن بيه. وفرق صغير في أول شغل بيتراكم. والتفاوض المحترم مش بيضايق الشركات، بالعكس ممكن يبيّن إنك بتعرف تتكلم عن قيمتك، وده جزء من الشغل.",
            how: R`الرقم المحدد أقوى من «ممكن أكتر شوية؟». اطلب رقم أعلى شوية من اللي عايزه، عشان النص بيتلاقوا فيه غالبًا.

الأسباب اللي بتشتغل: السوق («based on what I've seen for similar roles»)، وعرض تاني حقيقي («I have another offer at X, but I prefer your team because Y»)، ومهارة محددة في الإعلان عندك. ومتقولش عرض تاني مش موجود: لو طلبوا يشوفوه أو السوق صغير، هتتكشف.

الرد على «ده أقصى حاجة»: «I understand. Could we then agree on a review after probation, in writing?». وبعدين اسكت واستنى.

الحاجات غير المرتب: مراجعة مكتوبة بتاريخ، وتاريخ بداية مناسب، و remote، وميزانية تعلم، وأجهزة. أسهل على الشركة تدّيها أحيانًا.

وبعد ما توصلوا لاتفاق: اطلبه مكتوب، ومتفتحش التفاوض تاني. مرة واحدة بس.`,
            when: "بعد ما العرض يوصل ويبقى مكتوب، مش في أول مكالمة recruiter. والأحسن بالإيميل أو مكالمة وبعدها إيميل بيأكد.",
            mistakes: R`تقبل أول رقم من غير ما تسأل. تتفاوض بأسباب شخصية. تهدد بعرض تاني مش موجود. تتفاوض ٣ مرات. تقول رقم مرتب في أول مكالمة من غير ما تعرف السوق، أو ترفض تقول أي رقم خالص. تقبل مراجعة «هنشوف» من غير تاريخ مكتوب. وتكون عنيف أو متردد لدرجة إن الطلب يتفهم إنك مش مهتم.`
          },
          lines: [
            "شكر وحماس حقيقي: بيحط الطلب في سياق إنك عايز تيجي.",
            "رقم محدد، و net، وسبب من السوق والوظيفة مش ظروفك.",
            "سؤال مفتوح بدل مطالبة.",
            "بديل لو المرتب مقفول: مراجعة مكتوبة بتاريخ.",
            "قفلة بتقول إنك عايز توصلوا لاتفاق."
          ],
          sol: R`الأرقام الـ ٣ بتاعتك تمام لو كل واحد جنبه مصدر (٣ ناس في نفس المستوى، أو موقع رواتب، أو عرض تاني). لو الأرقام «من دماغي»، اسأل ناس الأول.

وفي التمثيل، أصعب لحظة الرد على «ده أقصى حاجة عندنا»: الرد الصح هادي ومعاه بديل («I understand. Could we agree in writing on a review after probation?»)، وبعدين سكوت. الغلط الشائع: تتراجع فورًا («لا لا خلاص تمام») أو تدخل في جدال عن ليه انت تستاهل.

وتحت نموذج إيميل يأكد الاتفاق بعد مكالمة. الغلط التاني الشائع: الاتفاق فضل بالكلام، وبعد ٣ شهور محدش فاكر «المراجعة بعد فترة الاختبار».`,
          solCode: R`Subject: Offer: Junior Full-stack Developer, confirming what we agreed

Hi Nour,

Thank you for the call today. To confirm what we agreed:
- Net monthly salary: 23,500 EGP starting November 1, 2026
- Salary review at the end of the 3-month probation (by February 1, 2027)
- 2 remote days a week and a company laptop

Could you please send the updated offer letter with these points?
I'm looking forward to joining the team.

Best regards,
Mona Adel`
        },
        {
          cmd: "أول ٩٠ يوم",
          title: "أول ٩٠ يوم في أول شغل: تعمل إيه؟",
          desc: R`أول ٣٠ يوم: تتعلم. شغّل المشروع عندك، واقرا الـ README والـ docs (وحدّث أي حاجة غلط لقيتها: ده أول PR ممتاز)، واعرف مين بيعمل إيه، واعمل ticket صغير أو اتنين. وأول ٦٠: تساهم. tickets حقيقية بالتدريج، و PRs صغيرة بتتراجع بسرعة، وتبدأ تفهم ليه الكود مكتوب كده. وأول ٩٠: تعتمد على نفسك في ميزة صغيرة من أولها لآخرها، وتبقى عارف مين تسأل في إيه.

الثقة بتتبني من حاجات صغيرة متكررة: بتخلّص اللي قلت عليه، أو بتقول بدري إنك هتتأخر. PRs صغيرة وواضحة (درس «PR يتراجع» في «تاب هندسة البرمجيات»). بتسأل بعد ما جربت، مش قبل ولا بعد يومين. وبتكتب اللي بتتعلمه.

واقرا في «تاب هندسة البرمجيات» قسم «الفريق» ودرس «codebase مش بتاعك»: هما كتير عن أول شهور في أي شغل.`,
          example: R`# worklog.md: one entry a day, 5 minutes before you close the laptop
## 2026-11-04
- Done: ran the project locally; fixed 2 wrong steps in README (PR #812, merged)
- Learned: orders go through a queue (BullMQ); the worker lives in apps/worker
- Stuck: seeding the DB fails on Windows; Karim says use WSL (added to README)
- Asked: Sara about the review rules: 1 approval, and CI must pass
- Tomorrow: pick a "good first issue" from the board, ask Sara which one`,
          try: R`اكتب خطة ٣٠-٦٠-٩٠ لأول شغل (أو للشغل الحالي لو اتعينت): ٣ حاجات قابلة للقياس في كل مرحلة. وابدأ [[worklog.md]] النهارده حتى لو لسه بتدوّر على شغل: اكتب إدخال عن اللي عملته في مشروعك. كمّل ١٠ أيام شغل.`,
          flag: "script",
          deep: {
            why: "أول ٣ شهور هي فترة الاختبار غالبًا، والانطباع اللي بيتكوّن فيها بيفضل. والـ junior مش متوقع منه يعرف كل حاجة. متوقع منه يتعلم بسرعة، ويبقى واضح، ومحدش يحتاج يلاحقه عشان يعرف هو فين.",
            how: R`أول أسبوع: شغّل المشروع، واعمل notes بكل حاجة وقفتك في الـ setup، وحوّلها لـ PR في الـ README. ده بيفيد الجاي بعدك، وبيعلّمك الـ workflow (branch، و PR، و review، و merge) على حاجة مفيهاش مخاطرة.

1:1 مع مديرك: لو مفيش واحدة منتظمة، اطلبها (كل أسبوع أو اتنين). اسأل: «What does a good first 3 months look like for me?». الإجابة دي هي معايير تقييمك، اكتبها.

الـ worklog: ٥ دقايق في آخر اليوم. خلصت إيه، واتعلمت إيه، ووقفت فين، وسألت مين، وبكرة إيه. بيفيدك في الـ standup (عندك الإجابة جاهزة)، وفي الـ 1:1، وفي المراجعة بعد فترة الاختبار، وفي تحديث الـ CV بعد سنة.

الأسماء: اعرف مين مسؤول عن إيه (الـ deploy، والداتابيز، والـ product). اعمل «map» صغيرة في الـ notes.

والتوقعات: اسأل عن الـ definition of done وقواعد الـ review من الأول، بدل ما تكتشفها في أول PR.`,
            when: "من أول يوم. والخطة اعرضها على مديرك في أول أسبوعين: «This is what I'm aiming for, does it match what you expect?».",
            mistakes: R`تحاول تبهر الكل بـ PR كبير في أول أسبوع. تسكت لما تقف عشان متبانش ضعيف. تسأل نفس السؤال مرتين لأنك مكتبتش الإجابة. تعيد كتابة حاجة «عشان مش عاجباك» قبل ما تفهم ليه هي كده. تشتغل كل يوم لحد بالليل عشان تثبت نفسك. ومتعرفش التقييم بعد فترة الاختبار بيتعمل على إيه.`
          },
          lines: [
            "خلصت إيه، ومعاه رقم الـ PR.",
            "اتعلمت إيه عن الكود أو المعمارية.",
            "وقفت فين واتحلّت إزاي، والحل اتكتب لغيرك.",
            "سألت مين عن إيه، عشان متسألش تاني.",
            "خطوة بكرة، وده بيبقى رد الـ standup."
          ],
          sol: R`الخطة الكويسة كل بند فيها يتقال عليه «حصل» أو «لأ»: «٣ PRs اتدمجت» مش «أفهم الكود». مثال: أول ٣٠: المشروع شغال عندي، و PR في الـ README، و ticket صغير اتدمج، وعارف مين بيعمل إيه. أول ٦٠: ٥ tickets اتدمجت، وأول review أعمله لحد. أول ٩٠: ميزة صغيرة من الـ ticket للـ production، وحضرت on-call أو shadowing لو فيه.

والـ worklog بعد ١٠ أيام: المفروض تقدر تفتحه وتعرف في دقيقة عملت إيه الأسبوعين دول. ولو فيه أيام «Done: nothing»، ده عادي في أيام الـ setup، بس اكتب «Stuck» بصراحة: ده اللي بيعلمك تسأل بدري.

الغلط الشائع: الـ worklog بيتساب بعد تالت يوم. خليه آخر حاجة قبل ما تقفل اللابتوب، أو تذكير في الكاليندر.`
        },
        {
          cmd: "تسأل صح",
          title: "تسأل إمتى وإزاي من غير ما تضيّع وقتك أو وقتهم؟",
          desc: R`الـ junior بيقع في غلطة من اتنين: يسأل كل خمس دقايق قبل ما يجرب، أو يفضل يومين واقف ومكسوف يسأل. التانية أسوأ بكتير: يومين ضايعين كان ممكن يتحلوا في ١٠ دقايق من حد عارف.

القاعدة الشائعة: جرّب لوحدك وقت محدد (١٥ لـ ٣٠ دقيقة لحاجة صغيرة، وأكتر شوية لحاجة كبيرة)، ودوّر في الكود والـ docs والـ Slack القديم. لو لسه واقف، اسأل، بس سؤال فيه كل حاجة: عايز تعمل إيه، وحصل إيه بالظبط (الـ error كامل)، وجرّبت إيه، وتخمينك إيه. ده بيخلّي الإجابة دقيقتين بدل ٢٠ دقيقة أسئلة ورا أسئلة.

واسأل في الـ channel العام بتاع الفريق مش في رسالة خاصة لو السؤال ينفع للكل: حد تاني ممكن يرد أسرع، والإجابة بتفضل موجودة للي بعدك. واكتب الإجابة في الـ notes أو الـ docs.`,
          example: R`Goal: run the order worker locally to test ticket #1432 (refund emails).
Problem: "npm run worker" exits right away with "Error: connect ECONNREFUSED 127.0.0.1:6379".
Tried: started Redis with "docker compose up -d redis"; "docker ps" shows it running, still the same error.
Tried: searched #backend: an old thread says REDIS_URL changed, but my .env already has redis://localhost:6379.
Guess: the worker reads a different env file? I see ".env.worker.example" in apps/worker.
Question: should I copy that file, or is there a script for it? (not blocked yet, will keep checking the config meanwhile)`,
          try: R`خد آخر مشكلة وقفتك (في أي مشروع) واكتب عنها سؤال بالشكل ده بالظبط، حتى لو حليتها. وبعدين اقراه كأنك senior مشغول: ينفع ترد في دقيقتين من غير ما تسأل ولا سؤال؟ لو لأ، إيه الناقص؟`,
          flag: "script",
          deep: {
            why: "وقت الـ senior غالي على الفريق، ووقتك كمان. السؤال المكتوب كويس بيحترم الاتنين، وبيبيّن إنك بتفكر مش بترمي المشكلة. وكتير جدًا بتلاقي الحل وانت بتكتب السؤال، لأن كتابة «جربت إيه» بتخليك تلاحظ حاجة فاتتك (نفس فكرة rubber duck debugging في درس «debugging method» في «تاب هندسة البرمجيات»).",
            how: R`الهدف الأول: ساعات الناس بتسأل عن الحل اللي في دماغها («إزاي أعمل X؟») والمشكلة الحقيقية Y، وفيه طريقة أسهل خالص. قول الهدف الحقيقي.

الـ error كامل ومنسوخ، مش «مش شغال». واللي جربته بالظبط (الأمر والنتيجة)، عشان محدش يقولك «جرّبت تشغّل Redis؟».

التخمين: حتى لو غلط، بيبيّن إنك بتفكر، وبيوجّه الإجابة.

«not blocked yet» أو «blocked»: بتقول للي بيقرا قد إيه السؤال مستعجل. ولو blocked، قول كده صراحة في الـ standup.

وبعد الإجابة: رد بـ «شكرًا، اشتغل» (عشان يعرف إنه اتحل)، واكتبه في الـ docs لو الغلطة ممكن تتكرر. السؤال الواحد مايتسألش مرتين.`,
            when: "كل ما توقف أكتر من الوقت اللي حددته. وفي أول أسابيع، اسأل أكتر من كده مش أقل: محدش متوقع إنك تعرف الـ setup الداخلي.",
            mistakes: R`«Hi» وتستنى الرد عشان تكتب السؤال. «مش شغال» من غير error. screenshot لكود بدل نص. تسأل في رسالة خاصة لنفس الشخص كل مرة. تفضل يوم كامل واقف في الـ setup. متقولش شكرًا ولا إن الموضوع اتحل. وتسأل «هو ده صح؟» على كود محطتوش في السؤال.`
          },
          lines: [
            "الهدف الحقيقي والـ ticket.",
            "الأمر اللي فشل والـ error كامل بالظبط.",
            "أول محاولة ونتيجتها.",
            "دوّرت فين قبل ما تسأل، ولقيت إيه.",
            "تخمينك، حتى لو مش متأكد.",
            "السؤال المحدد، وقد إيه انت مستعجل."
          ],
          sol: R`السؤال تمام لو فيه ٦ حاجات: الهدف، والـ error أو السلوك بالظبط، وجرّبت إيه (أمر ونتيجة)، ودوّرت فين، وتخمين، وسؤال واحد محدد. ولو الـ senior المتخيّل هيرد بسؤال زي «إيه الـ error؟» أو «جربت كذا؟»، الحاجة دي كانت ناقصة.

وغالبًا وانت بتكتب «جربت إيه» هتلاقي حاجة مجربتهاش، ومرات كتير دي بتحل المشكلة قبل ما تبعت. ده مش وقت ضايع: ده بالظبط فايدة الطريقة.

الغلط الشائع: السؤال طويل جدًا فيه قصة اليوم كله. خليه ٥ لـ ٦ سطور، والتفاصيل الزيادة (logs طويلة) في ملف أو thread.`
        },
        {
          cmd: "junior → mid",
          title: "إيه اللي بيفرّق الـ mid عن الـ junior؟ وتوصل له إزاي؟",
          desc: R`الفرق مش عدد السنين ولا عدد الـ technologies. الفرق في قد إيه محتاج حد جنبك. الـ junior بياخد ticket مقسّم وواضح ويخلّصه بمساعدة. الـ mid بياخد مشكلة (مش ticket) ويقسّمها بنفسه، ويقدّر وقتها بشكل معقول، ويسأل الأسئلة الصح بدري، ويسلّمها في الـ production، ويتابع بعدها إنها شغالة.

الحاجات اللي بتنقلك: الـ ownership (الميزة بتاعتك لحد ما اليوزر يستخدمها، مش لحد ما الـ PR يتدمج)، وإنك تراجع كود غيرك (بيعلمك أسرع من كتابة كودك)، والتقديرات اللي بتطلع قريبة، وإنك تفهم الـ product والبيزنس مش الكود بس، وإنك تساعد اللي أجدد منك.

وعشان حد يشوف ده، اكتبه. ملف «brag doc» بتحدّثه كل أسبوعين: عملت إيه، وأثره إيه، واتعلمت إيه. في المراجعة السنوية أو طلب الترقية، ده الدليل، ومحدش فاكر اللي انت عملته من ٨ شهور غيرك.`,
          example: R`# brag-doc.md: update every 2 weeks; use it for reviews, promotion talks and your CV
## 2027 Q1
- Owned "refund emails" end to end: split it into 4 tickets, shipped in 6 days (estimated 5-7), 0 incidents
- Found that checkout sent 14 DB queries per page; fixed N+1, p95 went from 900ms to 320ms
- Reviewed 23 PRs; my comment on the retry logic caught a double-charge bug before release
- Wrote the "local setup on Windows/WSL" doc; the last 2 new hires used it with no help
- Learning: Postgres indexes (EXPLAIN ANALYZE), gave a 15-min talk to the team`,
          try: R`ابدأ [[brag-doc.md]] النهارده. لو بتشتغل: املاه من آخر ٣ شهور (استخدم الـ worklog و [[git log --author]] والـ PRs المدمجة). لو لسه بتدوّر: املاه من مشاريعك. وبعدين اكتب ٣ حاجات «mid» ناقصاك من الدرس ده، وكل واحدة جنبها حاجة تعملها الشهر ده.`,
          flag: "script",
          deep: {
            why: "الترقية بتحصل لما حد يقدر يقول بثقة «بيشتغل كـ mid فعلًا». لو انت مستني حد يلاحظ لوحده، الشغل الكويس بيضيع وسط كل حاجة. والـ brag doc مش غرور: هو data لحد مشغول (مديرك) عشان يقدر يدافع عنك في اجتماع انت مش فيه.",
            how: R`الـ ownership: لما تاخد ميزة، اسأل «إزاي هنعرف إنها نجحت؟»، وبعد الـ deploy اتأكد من الـ logs أو الأرقام، وقول للفريق «شغالة، وده الرقم». دي خطوة الـ junior مش بيعملها.

الـ reviews: ابدأ تراجع PRs لغيرك حتى لو هتسأل أسئلة بس («ليه اخترت كذا؟»). ده بيعلمك الكود كله، وبيعلمك إزاي الـ seniors بيفكروا (درس «تعليق review» و «ترتيب المراجعة» في «تاب هندسة البرمجيات»).

التقديرات: قارن كل تقدير باللي حصل (درس «التقدير» في نفس التاب). بعد كام شهر هتعرف معامل التصحيح بتاعك.

الـ brag doc: أفعال وأرقام زي bullets الـ CV (درس «bullets بأثر»). ولما تيجي المراجعة، ابعته لمديرك قبلها بأسبوع.

والكلام الصريح: في الـ 1:1 اسأل «What would I need to show to be considered for mid-level?». الإجابة بتحوّل الترقية من حاجة غامضة لقايمة.`,
            when: "من أول شهر. والـ brag doc كل أسبوعين. وسؤال الترقية بعد ما تستقر (غالبًا بعد ٦ شهور لسنة)، مش في أول أسبوع.",
            mistakes: R`تفتكر إن الـ mid يعني تعرف frameworks أكتر. تستنى حد يدّيك ownership بدل ما تاخده في حاجة صغيرة. متراجعش كود حد «عشان أنا junior». تكتب الـ brag doc قبل المراجعة بيوم من الذاكرة. وتقارن نفسك بحد في شركة تانية مسماه «senior» بعد سنة: المسميات بتختلف جدًا بين الشركات.`
          },
          lines: [
            "ownership: قسّم، وقدّر، وسلّم، وتابع. كل ده بأرقام.",
            "مشكلة لقيتها بنفسك وحلّيتها، بقياس قبل وبعد.",
            "مراجعة كود غيرك، وأثرها.",
            "حاجة ساعدت بيها الفريق مش كود بس.",
            "اتعلمت إيه، وشاركته إزاي."
          ],
          sol: R`الـ brag doc الكويس كل سطر فيه فعل وأثر، وفيه رقم لو ممكن. ولو كتبت «worked on refunds»، ارجع لنفس أسئلة درس «bullets بأثر»: عملت إيه بالظبط؟ والنتيجة؟

ولو لسه بتدوّر، أغلب السطور هتيجي من المشاريع، وده تمام: نفس السطور هتدخل الـ CV و LinkedIn.

والـ ٣ حاجات الناقصة، الشائع عند ناس كتير: «مبراجعش كود حد»، و «تقديراتي بعيدة»، و «مبتابعش بعد الـ deploy». وكل واحدة ليها خطوة الشهر ده: «أراجع PR واحد في الأسبوع»، و «أكتب كل تقدير وأقارنه»، و «بعد كل deploy أبص على الـ logs ساعة». الغلط الشائع: الخطوة «أتعلم أكتر»، ودي مش خطوة.`
        },
        {
          cmd: "burnout والتعلم",
          title: "تكمّل تتعلم من غير ما تتحرق: إزاي؟",
          desc: R`البرمجة بتتغير بسرعة، والإحساس إنك «متأخر» ومحتاج تتعلم كل framework جديد بيطلع بيوصّل ناس كتير للـ burnout: تعب مستمر، ومفيش حماس، وحاسس إن مفيش حاجة بتخلص. ومع أول شغل، بتضاف ساعات شغل طويلة ورغبة تثبت نفسك.

الأساس: التعلم الأكبر بييجي من الشغل نفسه لو انت واعي له (كل مشكلة في الشغل درس). وفوقه: موضوع واحد كل فترة (شهر أو ربع سنة)، مرتبط بشغلك أو بالخطوة الجاية، بوقت ثابت صغير في الأسبوع، وبينتهي بحاجة (مشروع صغير، أو بوست، أو talk للفريق). مش ١٠ كورسات مفتوحين.

وحدود واضحة: ساعات شغل ليها آخر، وإجازات بتتاخد فعلًا، ونوم، وحاجة في حياتك مالهاش علاقة بالكمبيوتر. ولو لاحظت علامات burnout مستمرة (نوم وحش، وضيق من الشغل كله، وإحساس إنك مش قادر)، اتكلم مع مديرك، وخد إجازة، ولو الموضوع أكبر من كده، كلّم متخصص. ده مش ضعف.`,
          example: R`# learning.md: one topic per quarter, tied to work
Q4 2026 topic: PostgreSQL performance (why: checkout is slow, and I want to own the fix)
- Time: Tue and Thu 8-9 pm, Sat 2 hours; no learning on Fri
- Plan: «تاب PostgreSQL» + «تاب SQL و Prisma» → EXPLAIN ANALYZE on our 5 slowest queries → one index PR
- Done means: a PR that makes a real query faster, and a 15-min talk to the team
- Not this quarter: Rust, a new frontend framework, Kubernetes
Weekly check (Sunday, 5 min): slept well? worked late more than twice? still curious?`,
          try: R`اكتب [[learning.md]] للربع ده: موضوع واحد، وليه (مرتبط بشغلك أو بالوظيفة اللي عايزها)، ووقت ثابت في الكاليندر، و «Done means» حاجة تتسلّم، وقايمة «Not this quarter» فيها ٣ حاجات بتغريك. وحط الـ weekly check كتذكير كل أحد.`,
          flag: "script",
          deep: {
            why: "الكارير ماراثون: حد بيتعلم ساعتين في الأسبوع بانتظام لـ ٥ سنين بيسبق حد اتعلم ٦٠ ساعة في شهر واتحرق وبطّل. والـ burnout بيأثر على جودة الشغل نفسه، مش بس على مزاجك: أخطاء أكتر وقرارات أوحش.",
            how: R`الموضوع الواحد: اختاره من سؤال «إيه اللي لو عرفته، شغلي هيبقى أحسن أو أقرب للوظيفة الجاية؟». مش من اللي trending على السوشيال.

قايمة «Not this quarter»: بتقلل الإحساس إنك بتفوّت حاجة، لأنها مكتوبة ومش منسية، بس مش دلوقتي.

«Done means»: بتقفل الموضوع. من غيرها، التعلم بيبقى كورسات مفتوحة للأبد.

الـ weekly check: ٣ أسئلة بس. لو الإجابات وحشة أسبوعين ورا بعض، دي إشارة تقلل مش تزوّد. وخد الإجازات بتاعتك، ومتفتحش Slack فيها.

والشغل الزيادة: أحيانًا فيه أسبوع ضغط حقيقي (إطلاق، أو مشكلة في الإنتاج)، وده طبيعي. لو بقى كل أسبوع، ده موضوع تتكلم فيه في الـ 1:1 بأرقام («اشتغلت بعد ٨ بالليل ٩ أيام من آخر ١٤»)، مش حاجة تستحملها لوحدك.

والـ AI في التعلم: أداة ممتازة للشرح والأسئلة، بس الفهم بييجي من إنك تكتب وتغلط وتصلح بنفسك (شوف «تاب الذكاء الاصطناعي»).`,
            when: "من دلوقتي، مش لما تتحرق. والـ learning.md كل ربع سنة، والـ weekly check كل أسبوع.",
            mistakes: R`تبدأ ٥ كورسات في نفس الوقت. تتعلم كل ليلة بعد الشغل لحد الساعة ٢. تتعلم framework كل شهر عشان «الكل بيتكلم عنه». تحس بالذنب في أي يوم مذاكرتش فيه. تقارن نفسك بالناس على السوشيال. وتتجاهل علامات التعب لحد ما تبقى مش قادر تفتح اللابتوب.`
          },
          lines: [
            "الموضوع الواحد وليه، مرتبط بمشكلة حقيقية في الشغل.",
            "وقت ثابت وصغير، ويوم راحة.",
            "خطة: تابات الموقع، ثم تطبيق على شغلك، ثم PR.",
            "إمتى نقول خلص: حاجة تتسلّم.",
            "اللي مش هتتعلمه دلوقتي: مكتوب عشان متقلقش منه.",
            "مراجعة أسبوعية سريعة لعلامات الإرهاق."
          ],
          sol: R`الملف الكويس فيه موضوع واحد بس، وسبب مرتبط بحاجة حقيقية (مشكلة في الشغل، أو متطلب متكرر في الإعلانات اللي بتقدّم عليها، وده باين من شيت التقديمات ومن ✗ في درس «ATS»). ولو كتبت موضوعين أو تلاتة، اختار واحد وحط الباقي في «Not this quarter».

والوقت في الكاليندر لازم يبقى واقعي: لو شغلك ٩ ساعات ومواصلات ساعتين، ٣ ساعات في الأسبوع كويس جدًا. لو كتبت ساعتين كل يوم، غالبًا الخطة هتقع أول أسبوع وتحس بالذنب، وده عكس المطلوب.

والـ weekly check: لو أول أحد الإجابة «مش نايم كويس، واشتغلت بالليل ٤ مرات»، يبقى أول قرار تقلل مش تزوّد. الغلط الشائع: قايمة «Not this quarter» فاضية، يعني لسه ناوي تتعلم كل حاجة.`
        }
      ]
    }
  ]
});
