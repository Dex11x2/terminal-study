// تاب C و C++
// كل درس: cmd (فريد، والتقدم محفوظ بيه) و title و desc و example و try و flag و deep و lines و sol و solCode.
// الأمثلة كود حقيقي بيتعمله compile: التعليقات بـ // بس (سطر بيبدأ بـ # في C هو أمر preprocessor).
// اتجرّبت على gcc 14 (g++ -std=c++20 -Wall -Wextra و gcc -std=c17 -Wall -Wextra) على Linux x86-64.
TAB("cpp", {
  label: "C و C++",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/cpp && cd ~/lab/cpp
gcc -std=c17 -Wall -Wextra -g main.c -o app && ./app
g++ -std=c++20 -Wall -Wextra -g main.cpp -o app && ./app`,
  labText: "اعمل فولدر lab/cpp وحط فيه ملف لكل درس. اعمل compile دايمًا بـ -Wall -Wextra واقرا كل warning: في C و C++ الـ warning غالبًا bug لسه مظهرش. ولو حاجة وقعت أو طلعت أرقام غريبة، اعمل compile تاني بـ -g -fsanitize=address,undefined وشغّل تاني (درس «gdb و sanitizers»).",
  levels: {
    "1": ["C من الصفر", "تسطيب الـ compiler و compile و link، والأنواع و printf و scanf، والشروط والـ loops والدوال، والـ arrays والـ strings، والـ pointers و malloc و free، و struct و enum، والملفات، و make، والـ undefined behavior و gdb"],
    "2": ["C++", "من C لـ C++: references و const و overloading، والـ classes و RAII و rule of 0/3/5، والوراثة و virtual، والـ STL (vector و map و set) والـ iterators والـ algorithms والـ lambdas، والـ templates والـ exceptions و optional و variant، و CMake"],
    "3": ["C++ الحديثة والشغل", "move semantics و smart pointers و constexpr و string_view و span، والأداء والـ cache، والـ threads و mutex و atomic، والـ sanitizers والـ unit tests والمكتبات الخارجية، و C++ في المسابقات، والشغل، وأسئلة الانترفيو، ومشروع ختامي"]
  },
  categories: [
    {
      t: "تجهيز الجهاز وأول برنامج",
      l: 1,
      n: "تسطّب compiler، وتكتب أول برنامج، وتفهم إيه اللي بيحصل من الكود لحد الملف اللي بيشتغل",
      items: [
        {
          cmd: "تسطيب compiler",
          title: "إزاي تسطّب compiler لـ C و C++ على Linux و Mac و Windows؟",
          desc: R`C و C++ لغات بتتعمل [[compile]]: فيه برنامج اسمه [[compiler]] بياخد الكود اللي انت كاتبه ويحوّله لملف تنفيذي (executable) فيه أوامر الـ CPU نفسها. عشان كده أول حاجة محتاجها compiler، مش محرر كود بس.

أشهر ٣ compilers:
• [[gcc]] و [[g++]]: من مشروع GNU. [[gcc]] لـ C و [[g++]] لـ C++. ده الافتراضي على Linux، وهو اللي هنستخدمه في التاب ده.
• [[clang]] و [[clang++]]: من مشروع LLVM. الافتراضي على Mac، ورسايل الأخطاء بتاعته واضحة.
• [[MSVC]] (الأمر [[cl]]): بتاع Microsoft، بييجي مع Visual Studio على Windows.

الكود نفسه واحد في الـ ٣، والفرق في الـ flags وفي شوية تفاصيل.

على Windows عندك ٣ طرق:
• [[WSL]]: Linux جوه Windows (فيه تاب كامل ليه). أسهل طريقة، وكل أوامر التاب ده هتشتغل زي ما هي.
• [[MSYS2]]: بتنزّله من msys2.org، تفتح «MSYS2 UCRT64» وتسطّب gcc بـ [[pacman]]. وبعدين تضيف [[C:\msys64\ucrt64\bin]] للـ PATH عشان PowerShell و VS Code يشوفوه.
• Visual Studio Community: وانت بتسطّبه اختار «Desktop development with C++». ده بيدّيك MSVC و debugger قوي.

في الأمثلة هنطبع إنجليزي جوه البرامج، لأن Console بتاع Windows ساعات بيبوّظ الحروف العربي. التعليقات في الكود عربي عادي.`,
          example: R`# Ubuntu و Debian و WSL: gcc و g++ و make مرة واحدة، و gdb للـ debugging
sudo apt update
sudo apt install build-essential gdb
# Fedora
sudo dnf install gcc gcc-c++ make gdb
# macOS: بيسطّب clang (والأمر gcc على الماك بيشاور على clang)
xcode-select --install
# Windows من غير WSL: جوه «MSYS2 UCRT64» بعد ما تسطّب MSYS2
pacman -S mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-gdb
# اتأكد إن كله اتسطّب
gcc --version
g++ --version`,
          try: R`سطّب الـ compiler بالطريقة اللي تناسب جهازك، وبعدين افتح ترمنال جديد واكتب [[gcc --version]] و [[g++ --version]]. لو طلع رقم إصدار يبقى تمام. لو طلع [[command not found]] (أو «is not recognized» على Windows) اعرف السبب واتصرف.`,
          deep: {
            why: "من غير compiler مفيش C ولا C++ أصلًا. وكتير من المبتدئين بيضيّعوا أول يوم في مشاكل تسطيب وPATH، فخلّص الخطوة دي صح مرة واحدة وبعدها ركّز على اللغة.",
            how: R`[[build-essential]] على Ubuntu حزمة بتسطّب gcc و g++ و make والـ headers بتاعة المكتبة القياسية مرة واحدة. على الماك [[xcode-select --install]] بيسطّب أدوات سطر الأوامر بتاعة Xcode، وفيها clang. والأمر [[gcc]] على الماك اسمه بس gcc، بس هو clang من جوه ([[gcc --version]] هتقولك ده).

على MSYS2 فيه أكتر من بيئة (MSYS و MINGW64 و UCRT64 و CLANG64). [[UCRT64]] هي اللي بيوصوا بيها دلوقتي لأنها بتستخدم مكتبة C الحديثة بتاعة Windows، والحزم اسمها بيبدأ بـ [[mingw-w64-ucrt-x86_64-]].`,
            when: R`مرة واحدة على كل جهاز. ولو بتشتغل في فريق، اتفقوا على compiler وإصدار، عشان مش كل ميزة في C++20 و C++23 موجودة في كل الإصدارات القديمة.`,
            mistakes: R`تسطّب MSYS2 وتنسى تضيف [[C:\msys64\ucrt64\bin]] للـ PATH، فـ VS Code يقولك gcc مش موجود. وتسطّب VS Code وتفتكر إنه فيه compiler: VS Code محرر بس، والـ extension بتاعة C++ محتاجة compiler متسطّب لوحده. وعلى الماك تكتب [[g++]] وتفتكره GNU g++، وهو clang.`
          },
          lines: [
            "تحديث قايمة الحزم على Ubuntu أو Debian.",
            R`[[build-essential]] فيها gcc و g++ و make، و [[gdb]] الـ debugger.`,
            "نفس الحاجة على Fedora: gcc-c++ هو g++.",
            "على الماك: أدوات سطر الأوامر بتاعة Xcode، وفيها clang.",
            "على MSYS2: gcc و gdb من بيئة UCRT64.",
            "يطبع إصدار الـ C compiler، ولو طبع يبقى في الـ PATH.",
            "يطبع إصدار الـ C++ compiler."
          ],
          sol: R`على Linux هتلاقي حاجة زي:
[[gcc (Ubuntu 13.2.0-23ubuntu4) 13.2.0]]
الرقم عندك ممكن يختلف، والمهم إنه يكون 11 أو أحدث عشان C++20 يشتغل كويس.

لو طلع [[gcc: command not found]] يبقى التسطيب مخلصش أو الحزمة مش متسطّبة. على Windows لو PowerShell قالك «is not recognized» بعد MSYS2، يبقى الـ PATH: ضيف [[C:\msys64\ucrt64\bin]] من «Edit the system environment variables» وافتح ترمنال جديد (الترمنال القديم مش بيشوف التغيير).`
        },
        {
          cmd: "مقدمة C وكتابة أول برنامج",
          title: "أول برنامج C: يعني إيه #include و main و printf و return 0؟",
          desc: R`لغة C اتعملت في أوائل السبعينات في Bell Labs عشان يكتبوا بيها نظام Unix. لحد النهارده هي لغة نواة Linux، وأغلب أنظمة التشغيل، والـ firmware في الأجهزة الصغيرة، ومفسّر Python الرسمي (CPython). والـ syntax بتاعها (الأقواس [[{ }]] والـ [[;]] و [[for]]) اتنقل لـ C++ و Java و C# و JavaScript، فلو فهمت C هتقرا لغات كتير بسهولة.

C لغة صغيرة وقريبة من الجهاز: مفيش garbage collector، والذاكرة انت اللي بتديرها. ده بيخليها سريعة وخفيفة، وبيخلي أخطاءها أخطر.

أول برنامج، حتة حتة:
• [[#include <stdio.h>]]: السطر اللي بيبدأ بـ [[#]] أمر للـ preprocessor (مرحلة قبل الـ compile). [[#include]] معناها «حط محتوى الملف ده هنا». و [[stdio.h]] ملف header فيه تعريف [[printf]]. الأقواس [[< >]] معناها «دوّر عليه في ملفات النظام».
• [[int main(void)]]: الدالة اللي البرنامج بيبدأ منها. [[int]] معناها إنها بترجّع رقم صحيح، و [[void]] جوه القوسين معناها «مبتاخدش حاجة».
• [[{ }]]: بداية ونهاية جسم الدالة.
• [[printf("...\n")]]: بتطبع نص. [[\n]] معناها سطر جديد.
• [[;]]: آخر كل جملة (statement). لو نسيتها الـ compiler مش هيكمّل.
• [[return 0;]]: البرنامج بيرجّع 0 لنظام التشغيل، ومعناها «خلصت من غير مشاكل».`,
          example: R`// stdio.h فيه printf
#include <stdio.h>

int main(void) {
    printf("Hello, World from C!\n");
    return 0;
}`,
          try: R`اعمل ملف [[main.c]] وحط فيه الكود، وبعدين في الترمنال: [[gcc main.c -o app]] وشغّله بـ [[./app]] (على Windows: [[.\app.exe]]). بعدين امسح الـ [[;]] اللي بعد printf واعمل compile تاني، واقرا رسالة الخطأ: بتقول إيه، وفي أنهي سطر؟`,
          flag: "script",
          deep: {
            why: R`كل برنامج C بيبدأ من نفس الهيكل ده. وفهمك إن [[#include]] مجرد «نسخ ولصق» قبل الـ compile، وإن [[main]] بترجّع رقم لنظام التشغيل، هيفرق معاك لما تكتب برامج أكبر وتربطها بسكربتات.`,
            how: R`[[gcc main.c -o app]] بيعمل ٤ حاجات ورا بعض: الـ preprocessor بيحط محتوى [[stdio.h]] مكان الـ [[#include]]، والـ compiler بيحوّل الكود لـ assembly، والـ assembler بيحوّله لـ machine code، والـ linker بيربطه بمكتبة C ويطلّع [[app]]. الدرس الجاي بيعمل المراحل دي واحدة واحدة.

[[-o app]] اسم الملف اللي هيطلع. لو مكتبتهاش، gcc بيسمّيه [[a.out]] (و [[a.exe]] على Windows).`,
            when: "مع كل برنامج جديد. ومن هنا ورايح استخدم دايمًا -Wall -Wextra (هتيجي في الدرس الجاي) عشان الـ compiler ينبّهك على الغلط بدري.",
            mistakes: R`تنسى [[;]]، أو تكتب [[Printf]] بحرف كبير (C بتفرق بين الكبير والصغير)، أو تنسى [[\n]] فالـ prompt بتاع الترمنال يطلع لازق في آخر الكلام. وتشغّل [[app]] من غير [[./]] على Linux: الترمنال مش بيدوّر في الفولدر الحالي، فلازم تقوله [[./app]].`
          },
          lines: [
            R`[[#include]] بيحط محتوى [[stdio.h]] هنا قبل الـ compile، وفيه تعريف [[printf]].`,
            R`[[main]]: البرنامج بيبدأ من هنا، وبترجّع [[int]] ومبتاخدش حاجة ([[void]]).`,
            R`بتطبع النص، و [[\n]] بتنزل سطر جديد.`,
            R`رجّع 0 لنظام التشغيل: «نجحت».`,
            "قفلة الدالة."
          ],
          sol: R`الناتج:
[[Hello, World from C!]]

ولما مسحت الـ [[;]]، gcc 14 بيقول حاجة زي:
[[main.c:5:37: error: expected ';' before 'return']]
الأرقام [[5:37]] معناها السطر الخامس، العمود ٣٧ (آخر سطر الـ printf)، وتحتها بيرسم [[^]] مكان الغلط ويقترح [[;]]. الـ compiler مكتشفش النقص غير لما لقى [[return]] بدأت، عشان كده بيقول «before 'return'». gcc هنا شاور على السطر الصح، بس في أخطاء تانية كتير (قوس ناقص مثلًا) الرسالة بتطلع في سطر بعد الغلط الحقيقي. فلو رسالة الخطأ في سطر شكله سليم، بص على اللي قبله.`
        },
        {
          cmd: "compile و link",
          title: "إيه اللي بيحصل لما تكتب gcc main.c؟ (preprocess و compile و assemble و link) وأهم الـ flags",
          desc: R`الأمر [[gcc main.c -o app]] شكله خطوة واحدة، بس هو ٤ مراحل:

1. Preprocess: بيتعامل مع السطور اللي بتبدأ بـ [[#]]: بيحط محتوى الـ headers، ويبدّل الـ [[#define]]. الناتج ملف C كبير ([[main.i]]).
2. Compile: بيحوّل C لـ assembly ([[main.s]])، وهنا بتطلع أغلب أخطاء الكتابة والـ warnings.
3. Assemble: بيحوّل الـ assembly لـ machine code في ملف اسمه object file ([[main.o]]). الملف ده لسه مش بيشتغل لوحده.
4. Link: الـ linker بيجمع ملفات الـ [[.o]] ويربطها بالمكتبات (زي مكتبة C اللي فيها كود [[printf]] نفسه) ويطلّع الملف التنفيذي.

ليه ده يهمك؟ لأن الأخطاء نوعين: خطأ compile ([[error: expected ';']]) معناه الكود نفسه غلط، وخطأ link ([[undefined reference to $__btfoo']]) معناه الكود سليم بس الدالة مش لاقي تعريفها في أي ملف. ولما مشروعك يبقى ملفات كتير، كل ملف بيتعمله compile لوحده لـ [[.o]]، والـ link في الآخر.

الـ flags اللي هتستخدمها كل يوم:
• [[-std=c17]] أو [[-std=c++20]]: أنهي إصدار من اللغة.
• [[-Wall -Wextra]]: شغّل warnings كتير مقفولة افتراضيًا. كتير منها bugs حقيقية.
• [[-g]]: حط معلومات للـ debugger (أرقام السطور وأسماء المتغيرات).
• [[-O0]] و [[-O2]]: مستوى الـ optimization. [[-O0]] (الافتراضي) للتطوير، و [[-O2]] للنسخة اللي هتسلّمها.
• [[-Werror]]: اعتبر كل warning خطأ. مفيد في CI.`,
          example: R`# المراحل الأربعة واحدة واحدة
gcc -E main.c -o main.i
gcc -S main.i -o main.s
gcc -c main.s -o main.o
gcc main.o -o app
# كله مرة واحدة، بالـ flags اللي هتستخدمها وانت بتطوّر
gcc -std=c17 -Wall -Wextra -g main.c -o app
./app
# نسخة سريعة للتسليم
gcc -std=c17 -O2 main.c -o app`,
          try: R`على برنامج Hello World اعمل المراحل الأربعة. افتح [[main.i]] وشوف عدد سطوره بـ [[wc -l main.i]] (كله جه من [[stdio.h]]). افتح [[main.s]] وشوف الـ assembly. وبعدين في [[main.c]] اكتب [[int x;]] جوه main ومتستخدمهوش، واعمل compile مرة من غير [[-Wall]] ومرة بيها: إيه الفرق؟`,
          deep: {
            why: R`لما تفهم المراحل، رسايل الخطأ بتبقى مفهومة: [[undefined reference]] مش غلطة في الكود اللي قدامك، دي غلطة link (ملف ناقص في الأمر، أو مكتبة ناقصة). ومن غير [[-Wall -Wextra]] الـ compiler بيسكت عن حاجات كتير بتبقى bugs.`,
            how: R`[[-E]] توقف بعد الـ preprocess، و [[-S]] بعد الـ compile، و [[-c]] بعد الـ assemble. ولما تدّي gcc ملف [[.o]] بس، بيعمل link بس. ونفس الكلام لـ [[g++]] مع C++. الفرق إن g++ بيربط مكتبة C++ القياسية تلقائيًا، فلو عملت link لكود C++ بـ gcc هتلاقي [[undefined reference to $__btstd::cout']].

الـ optimization بيغيّر الكود اللي بيطلع جامد: [[-O2]] ممكن يشيل متغيرات ويدمج دوال، وده بيخلي الـ debugging أصعب، وساعات بيظهر bugs كانت مستخبية (غالبًا undefined behavior، ليه درس لوحده).`,
            when: R`[[-Wall -Wextra -g]] طول ما انت بتطوّر. [[-O2]] للنسخة النهائية أو لما تقيس السرعة. والمراحل اليدوية دي مرة عشان تفهم، بعد كده [[make]] و CMake بيعملوها عنك.`,
            mistakes: R`تقيس سرعة برنامجك وهو متعمله compile من غير [[-O2]] وتطلع باستنتاجات غلط. وتتجاهل الـ warnings لأن «البرنامج اشتغل». وتحط [[-o main.c]] بالغلط فـ gcc يكتب الملف التنفيذي فوق الكود بتاعك ويمسحه: خلي بالك من الاسم اللي بعد [[-o]].`
          },
          lines: [
            R`[[-E]]: preprocess بس، والناتج C كبير فيه محتوى stdio.h.`,
            R`[[-S]]: compile لـ assembly.`,
            R`[[-c]]: assemble لـ object file، لسه مش بيشتغل.`,
            "link: بيربط الـ .o بمكتبة C ويطلّع ملف تنفيذي.",
            R`كله مرة واحدة: C17، و warnings كتير، و [[-g]] للـ debugger.`,
            "تشغيل.",
            R`[[-O2]]: optimization للنسخة النهائية.`
          ],
          sol: R`[[main.i]] بيطلع حوالي ٨٠٠ سطر على Linux مع glibc (عندي ٨١٧ مع gcc 14، والرقم بيختلف حسب النظام)، وكلهم من [[stdio.h]] والملفات اللي هو عامل لها include. سطرين بتوعك في الآخر خالص.

في [[main.s]] هتلاقي حاجات زي [[call puts]]: gcc شاف إن [[printf]] بنص ثابت آخره [[\n]] ممكن يبقى [[puts]] الأسرع، وبدّلها لوحده.

ومع [[int x;]]: من غير [[-Wall]] مفيش ولا كلمة. مع [[-Wall]]:
[[warning: unused variable 'x' [-Wunused-variable]]]
الـ warning ده بسيط، بس نفس الـ flag بيمسك حاجات خطيرة زي متغير بتستخدمه قبل ما تديله قيمة.`
        },
        {
          cmd: "main و exit code",
          title: "البرنامج بياخد arguments إزاي (argc و argv)، والرقم اللي main بترجّعه بيروح فين؟",
          desc: R`[[main]] ليها شكلين: [[int main(void)]] لو مش محتاج حاجة من الترمنال، و [[int main(int argc, char *argv[])]] لو عايز الكلام اللي اليوزر كتبه بعد اسم البرنامج.

• [[argc]] (argument count): عدد الكلمات، واسم البرنامج نفسه محسوب منهم. فـ [[./app Sara Ali]] يبقى [[argc]] بـ 3.
• [[argv]] (argument vector): array من النصوص. [[argv[0]]] اسم البرنامج، و [[argv[1]]] أول كلمة بعده، وهكذا. النوع [[char *argv[]]] معناه «array من pointers لحروف»، وده شكل النص في C. هنفهم الـ [[*]] كويس في درس الـ pointers، دلوقتي اعتبر [[argv[1]]] نص.

الرقم اللي [[main]] بترجّعه اسمه exit code، ونظام التشغيل بيحفظه:
• [[0]] معناها نجاح، وأي رقم تاني (1 لحد 255 على Linux) معناها فشل، وانت اللي بتحدد معنى كل رقم.
• في bash بتشوفه بـ [[echo $?]] بعد البرنامج على طول.
• السكربتات و Makefile و CI بيعتمدوا عليه: [[./app && echo ok]] بتطبع ok بس لو رجع 0.
• [[stdlib.h]] فيها [[EXIT_SUCCESS]] و [[EXIT_FAILURE]] لو عايز أسماء بدل الأرقام.

وفيه [[fprintf(stderr, ...)]]: زي printf بس بيكتب على stderr (مخرج الأخطاء) بدل stdout، عشان رسايل الخطأ متختلطش بالناتج لو حد عمله redirect لملف.`,
          example: R`#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "usage: %s NAME...\n", argv[0]);
        return 1;
    }
    printf("Hello, %s! you passed %d argument(s)\n", argv[1], argc - 1);
    return EXIT_SUCCESS;
}`,
          try: R`اعمل compile وشغّل [[./app]] من غير حاجة، وبعدها على طول [[echo $?]]. وبعدين [[./app Sara Ali]] و [[echo $?]]. وجرّب [[./app > out.txt]]: رسالة الـ usage طلعت على الشاشة ولا راحت في الملف؟ وبعدين عدّل البرنامج يطبع كل الـ arguments بـ loop من [[1]] لحد [[argc - 1]].`,
          flag: "script",
          deep: {
            why: "أي أداة سطر أوامر محترمة (git و gcc نفسه) بتاخد arguments وبترجّع exit code. ولو برنامجك هيتنادى من سكربت أو CI، الـ exit code هو الطريقة الوحيدة اللي السكربت يعرف بيها إنك فشلت.",
            how: R`نظام التشغيل بيحط الكلمات في الذاكرة قبل ما [[main]] تبدأ، وبيدّيلك عددها وعناوينها. [[argv[argc]]] دايمًا [[NULL]] (ولا حاجة). ولما [[main]] ترجّع، مكتبة C بتنادي [[exit]] بالرقم ده، والـ shell بيحفظه في [[$?]].

على Linux الـ exit code بايت واحد، فـ [[return 256]] بتوصل 0. وفي C99 وما بعدها، لو [[main]] خلصت من غير [[return]] كأنها رجّعت 0، بس اكتبها صريحة.`,
            when: R`كل ما برنامجك ياخد input من الترمنال (اسم ملف، رقم، option). ولو الـ options كتير ([[-v]] و [[--output]]) استخدم [[getopt]] على Linux، أو مكتبة في C++ زي CLI11.`,
            mistakes: R`تقرا [[argv[1]]] من غير ما تتأكد إن [[argc]] على الأقل 2: لو اليوزر مكتبش حاجة، [[argv[1]]] بـ [[NULL]] والبرنامج هيقع. وترجّع 0 حتى لو حصل خطأ، فالسكربت يكمّل كأن كله تمام. وتطبع رسايل الخطأ بـ [[printf]] فتروح في ملف الناتج.`
          },
          lines: [
            R`فيها [[printf]] و [[fprintf]] و [[stderr]].`,
            R`فيها [[EXIT_SUCCESS]] و [[EXIT_FAILURE]].`,
            R`[[main]] بتاخد عدد الكلمات والكلمات نفسها.`,
            "لو اليوزر مكتبش ولا كلمة بعد اسم البرنامج.",
            R`رسالة استخدام على stderr، و [[argv[0]]] اسم البرنامج زي ما اتكتب.`,
            "exit code 1: فشل.",
            "قفلة الـ if.",
            R`أول كلمة، وعدد الكلمات من غير اسم البرنامج.`,
            R`[[EXIT_SUCCESS]] هي 0.`,
            "قفلة main."
          ],
          sol: R`[[./app]] لوحده بيطبع [[usage: ./app NAME...]] و [[echo $?]] بتطبع [[1]].
[[./app Sara Ali]] بيطبع [[Hello, Sara! you passed 2 argument(s)]] و [[echo $?]] بتطبع [[0]].
مع [[./app > out.txt]] رسالة الـ usage بتظهر على الشاشة والملف بيفضل فاضي، لأن [[>]] بيحوّل stdout بس، والرسالة على stderr.`,
          solCode: R`#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "usage: %s NAME...\n", argv[0]);
        return 1;
    }
    for (int i = 1; i < argc; i++) {
        printf("%d: %s\n", i, argv[i]);
    }
    return 0;
}`
        }
      ]
    },
    {
      t: "الأنواع والإدخال والإخراج والتحكم",
      l: 1,
      n: "الأنواع وأحجامها، و printf و scanf، والعمليات، والشروط والـ loops، والدوال",
      items: [
        {
          cmd: "المتغيرات والأنواع في C",
          title: "أنواع C (int و double و char و unsigned) حجمها كام، ويحصل إيه لما رقم يعدّي الحد؟",
          desc: R`في C لازم تقول نوع كل متغير قبل ما تستخدمه، والنوع بيحدد حاجتين: المتغير بياخد كام byte في الذاكرة، والـ bits دي تتقري إزاي.

الأنواع الأساسية (الأحجام دي على Linux و Mac 64-bit، وهي الأشهر):
• [[char]]: byte واحد. حرف واحد بين علامتين مفردتين [['A']]، وهو في الحقيقة رقم (كود الحرف: [['A']] = 65).
• [[int]]: غالبًا 4 bytes، من حوالي -2.1 مليار لـ +2.1 مليار.
• [[long]]: 8 bytes على Linux و Mac، بس 4 على Windows. عشان كده لو محتاج 8 bytes أكيد استخدم [[long long]].
• [[double]]: رقم عشري 8 bytes، ودقته حوالي ١٥ رقم. و [[float]] 4 bytes ودقته حوالي ٧ أرقام، فاستخدم [[double]] إلا لو عندك سبب.
• [[unsigned int]]: نفس حجم [[int]] بس من غير سالب: من 0 لحوالي 4.2 مليار.

[[sizeof(x)]] بترجّع حجم نوع أو متغير بالـ bytes، والنوع اللي بترجّعه [[size_t]] وبيتطبع بـ [[%zu]].

لو محتاج حجم مضمون استخدم [[stdint.h]]: [[int32_t]] و [[int64_t]] و [[uint8_t]] حجمهم ثابت على أي جهاز. ودي اللي بتشوفها في كود الشبكات والملفات والـ embedded.

لما الرقم يعدّي الحد (overflow):
• [[unsigned]]: بيلف. [[0u - 1]] بتبقى أكبر رقم ([[4294967295]] لو 4 bytes). ده سلوك مضمون.
• [[signed]] زي [[int]]: ده undefined behavior، يعني اللغة مبتقولش يحصل إيه، والـ compiler مسموحله يفترض إنه مش هيحصل أصلًا. ليه درس لوحده في آخر المستوى.

وخلي بالك من القسمة: [[7 / 2]] بين رقمين صحاح بـ [[3]] (الكسر بيتشال)، و [[7.0 / 2]] بـ [[3.5]].`,
          example: R`#include <stdio.h>
#include <limits.h>

int main(void) {
    int age = 22;
    double price = 19.99;
    char grade = 'A';
    unsigned int u = 0;
    long long big = 3000000000LL;
    printf("age=%d price=%.2f grade=%c (code %d)\n", age, price, grade, grade);
    printf("sizeof: char=%zu int=%zu long=%zu double=%zu\n",
           sizeof(char), sizeof(int), sizeof(long), sizeof(double));
    printf("INT_MAX=%d big=%lld\n", INT_MAX, big);
    u = u - 1;
    printf("0u - 1 = %u\n", u);
    printf("7 / 2 = %d, 7.0 / 2 = %.1f\n", 7 / 2, 7.0 / 2);
    return 0;
}`,
          try: R`ضيف [[printf("%zu %zu\n", sizeof(float), sizeof(long long));]] وشوف الحجم. وبعدين اعمل [[int x = 3000000000;]] واطبعها، واعمل compile بـ [[-Wall -Wextra]] ومرة تانية بـ [[-Wall -Wextra -Wconversion]]: الـ compiler قال إيه في كل مرة، و x طلعت كام؟ وجرّب [[printf("%d\n", 0.1 + 0.2 == 0.3);]] واشرح الناتج.`,
          flag: "script",
          deep: {
            why: "في لغات زي Python الرقم بيكبر لوحده ومبتفكرش في حجمه. في C الحجم ثابت، ولو عدّيته الرقم يلف أو البرنامج يبقى فيه undefined behavior. أخطاء زي دي حصلت في برامج حقيقية: عدّادات لفّت لسالب، وحسابات فلوس ضاعت فيها كسور.",
            how: R`الأرقام الصحيحة السالبة بتتخزن بطريقة اسمها two's complement، والعشرية بمعيار IEEE 754 (bits للإشارة، و bits للأس، و bits للرقم نفسه). فلو طبعت [[double]] بـ [[%d]]، printf هتقرا bits غلط وتطلع رقم مالوش معنى، والـ compiler بـ [[-Wall]] بينبّهك.

[[INT_MAX]] من [[limits.h]]: أكبر قيمة لـ [[int]] على جهازك. واللاحقة [[LL]] في [[3000000000LL]] معناها «الرقم ده long long»، و [[u]] في [[0u]] معناها unsigned.

[[0.1 + 0.2]] مش بالظبط [[0.3]] لأن 0.1 مالهاش تمثيل دقيق في binary، زي ما 1/3 مالهاش تمثيل دقيق في العشري. عشان كده متقارنش أرقام عشرية بـ [[==]]، وللفلوس خزّن قروش في رقم صحيح.`,
            when: R`[[int]] للأعداد العادية، و [[long long]] أو [[int64_t]] لأي حاجة ممكن تعدّي ٢ مليار (IDs، وأوقات بالـ milliseconds، ومجاميع)، و [[double]] للحسابات العشرية، و [[size_t]] للأحجام والـ indexes، و [[uint8_t]] للـ bytes الخام.`,
            mistakes: R`تجمع أرقام كبيرة في [[int]] فتعدّي الحد من غير ما تاخد بالك. وتقارن [[int]] سالب بـ [[unsigned]]: السالب بيتحول لـ unsigned ويبقى رقم ضخم، فـ [[-1 < 1u]] بتطلع false. و [[-Wextra]] بينبّهك على المقارنة دي. وتكتب [[char c = "A";]] بعلامتين مزدوجتين: ده نص مش حرف.`
          },
          lines: [
            R`فيها [[printf]].`,
            R`فيها [[INT_MAX]] وحدود الأنواع.`,
            "بداية main.",
            R`رقم صحيح عادي.`,
            R`رقم عشري بدقة double.`,
            R`حرف واحد بين علامتين مفردتين. في الذاكرة هو الرقم 65.`,
            "unsigned: مفيش سالب.",
            R`[[long long]]: 8 bytes، فيشيل 3 مليار. اللاحقة [[LL]] بتقول نوع الرقم.`,
            R`[[%d]] لـ int، و [[%.2f]] لـ double برقمين عشريين، و [[%c]] بيطبع الحرف، و [[%d]] على نفس الحرف بتطبع كوده.`,
            R`[[%zu]] للـ [[size_t]] اللي [[sizeof]] بترجّعه.`,
            "كمالة نفس السطر: الأحجام بالـ bytes.",
            R`أكبر int، و [[%lld]] لـ long long.`,
            "0 ناقص 1 في unsigned: بيلف لأكبر قيمة.",
            R`[[%u]] لـ unsigned.`,
            "قسمة صحيحة بتشيل الكسر، وقسمة فيها double بتحتفظ بيه.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج على Linux 64-bit:
[[age=22 price=19.99 grade=A (code 65)]]
[[sizeof: char=1 int=4 long=8 double=8]]
[[INT_MAX=2147483647 big=3000000000]]
[[0u - 1 = 4294967295]]
[[7 / 2 = 3, 7.0 / 2 = 3.5]]
على Windows هتلاقي [[long=4]].

[[sizeof(float)]] بـ 4 و [[sizeof(long long)]] بـ 8.

[[int x = 3000000000;]] بـ [[-Wall -Wextra]] بس في C: ولا كلمة (gcc 14)، والـ x بقت [[-1294967296]] بهدوء. ومع [[-Wconversion]]:
[[warning: conversion from 'long int' to 'int' changes value from '3000000000' to '-1294967296' [-Wconversion]]]
يعني [[-Wall]] مش «كل الـ warnings» زي ما اسمه بيقول. [[-Wconversion]] بيطلّع warnings كتير في الكود الكبير، بس يستاهل تجرّبه على كودك وانت بتتعلم.

و [[0.1 + 0.2 == 0.3]] بتطبع [[0]] (يعني false)، لأن الناتج الحقيقي [[0.30000000000000004]].`
        },
        {
          cmd: "printf و scanf",
          title: "إزاي تطبع بتنسيق (%d و %.2f و %s و %5d) وتقرا input من اليوزر بـ scanf صح؟",
          desc: R`[[printf]] بتاخد نص فيه أماكن فاضية بتبدأ بـ [[%]] (اسمها format specifiers)، وبعده القيم بالترتيب. لازم كل specifier يطابق نوع القيمة بتاعته:
• [[%d]]: int. و [[%ld]]: long. و [[%lld]]: long long. و [[%u]]: unsigned.
• [[%f]]: double (و float بيتحول لـ double تلقائيًا). [[%.2f]] معناها رقمين بعد العلامة.
• [[%c]]: حرف. و [[%s]]: نص. و [[%p]]: عنوان في الذاكرة.
• [[%zu]]: size_t (اللي sizeof و strlen بيرجّعوه).
• [[%x]]: hex، و [[%o]]: octal، و [[%%]]: علامة % نفسها.

وفيه عرض ومحاذاة: [[%5d]] معناها اطبع في ٥ خانات من اليمين، و [[%-5d]] من الشمال، و [[%05d]] كمّل بأصفار.

[[scanf]] العكس: بتقرا من الكيبورد حسب نفس الرموز، وبتكتب في متغيرات. وعشان تكتب فيها لازم تديها عنوان المتغير مش قيمته، وده معنى [[&]] في [[&age]] (الـ address-of operator، هنفهمه بالتفصيل في درس الـ pointers). الـ array زي [[name]] مش محتاجة [[&]] لأن اسمها نفسه بيتحول لعنوان.

فروق مهمة عن printf:
• في scanf، [[%lf]] لـ double و [[%f]] لـ float. في printf الاتنين [[%f]].
• [[%31s]] معناها اقرا كلمة لحد ٣١ حرف بس (الـ buffer 32 والحرف الأخير للـ [[\0]]). [[%s]] من غير حد ممكن تكتب بره الـ array.
• [[%s]] بتقف عند أول مسافة، فبتقرا كلمة مش سطر. للسطر كامل استخدم [[fgets]] (في درس الملفات).
• scanf بترجّع عدد القيم اللي قدرت تقراها. لو اليوزر كتب حروف مكان رقم هترجّع أقل، فلازم تتشيّك عليها.`,
          example: R`#include <stdio.h>

int main(void) {
    char name[32];
    int age;
    double height;
    printf("name age height: ");
    if (scanf("%31s %d %lf", name, &age, &height) != 3) {
        printf("bad input\n");
        return 1;
    }
    printf("%s is %d years old and %.2f m tall\n", name, age, height);
    printf("[%5d] [%-5d] [%05d]\n", age, age, age);
    printf("hex %x, octal %o, char %c, percent %%\n", 255, 8, 65);
    return 0;
}`,
          try: R`شغّله واكتب [[Sara 22 1.65]]. وبعدين جرّب من غير ما تكتب بإيدك: [[echo "Ali 30 1.8" | ./app]]. وبعدين اكتب [[abc]] مكان العمر. وآخر حاجة: امسح الـ [[&]] اللي قبل [[age]] واعمل compile بـ [[-Wall]]: إيه اللي حصل؟`,
          flag: "script",
          deep: {
            why: R`printf موجودة في كل كود C، وأخطاء الـ format من أشهر الـ bugs: specifier غلط بيطبع زبالة أو يوقع البرنامج. و scanf من غير حد ومن غير ما تشيّك القيمة اللي بترجعها بتعمل bugs وثغرات أمنية.`,
            how: R`printf مبتعرفش أنواع القيم اللي بعتّها، هي بتصدّق الـ specifier وتقرا bytes على أساسه. عشان كده gcc بـ [[-Wall]] بيقارن الـ specifiers بالقيم وقت الـ compile وينبّهك ([[-Wformat]]).

scanf بتتخطى المسافات والـ Enter قبل الأرقام وقبل [[%s]]، وبتقف عند أول حرف مينفعش. والحاجة اللي مقرتهاش بتفضل مستنية في الـ input للـ scanf اللي بعدها، وده سبب إن برامج المبتدئين ساعات «بتتجنن» بعد input غلط.`,
            when: R`printf في أي طباعة. scanf في التمارين والمسابقات. في برامج حقيقية الأحسن تقرا سطر كامل بـ [[fgets]] وبعدين تحلله بـ [[sscanf]] أو [[strtol]]، عشان تتحكم في الأخطاء.`,
            mistakes: R`تنسى [[&]] في scanf، فبتبعت قيمة المتغير (زبالة) كأنها عنوان، والبرنامج يقع. وتستخدم [[%f]] لـ double في scanf بدل [[%lf]]. وتكتب [[%s]] من غير حد. ومتشيّكش على القيمة اللي scanf رجّعتها، فتكمّل بمتغير ملوش قيمة.`
          },
          lines: [
            R`فيها printf و scanf.`,
            "بداية main.",
            R`array من 32 حرف للاسم (31 حرف + [[\0]] في الآخر).`,
            "العمر.",
            "الطول.",
            R`سؤال من غير [[\n]] عشان اليوزر يكتب على نفس السطر.`,
            R`اقرا ٣ قيم. الـ array من غير [[&]]، والباقي بـ [[&]]. ولو مقرتش ٣ يبقى فيه مشكلة.`,
            "رسالة خطأ.",
            "exit code 1.",
            "قفلة الـ if.",
            R`طباعة نص ورقم و double برقمين عشريين.`,
            R`عرض ٥ من اليمين، ومن الشمال، وبأصفار.`,
            R`hex و octal، و [[%c]] على 65 بتطبع A، و [[%%]] بتطبع %.`,
            "نجاح.",
            "قفلة main."
          ],
          sol: R`مع [[Sara 22 1.65]]:
[[name age height: Sara is 22 years old and 1.65 m tall]]
[[[   22] [22   ] [00022]]]
[[hex ff, octal 10, char A, percent %]]
(أول سطر لازق في السؤال لأن السؤال ملوش [[\n]]، ولو كتبت بإيدك الـ Enter بتاعك هو اللي هيفصل).

مع [[abc]] مكان العمر: scanf قرت الاسم بس ورجّعت 1، فالبرنامج طبع [[bad input]] ورجع 1.

من غير [[&]] قبل age:
[[warning: format '%d' expects argument of type 'int *', but argument 3 has type 'int' [-Wformat=]]]
ولو شغّلته غالبًا هيقع بـ [[Segmentation fault]]، لأن scanf كتبت في عنوان عشوائي.`
        },
        {
          cmd: "العمليات في C",
          title: "العمليات في C: القسمة الصحيحة و % و ++ و += والمقارنة و && و || و ! والـ bits",
          desc: R`العمليات الحسابية: [[+]] و [[-]] و [[*]] و [[/]] و [[%]] (باقي القسمة). القسمة بين رقمين صحاح بتشيل الكسر، فـ [[17 / 5]] بـ 3 و [[17 % 5]] بـ 2. ولو عايز كسر حوّل واحد منهم لـ double: [[(double)a / b]]. الـ [[(double)]] دي اسمها cast: «اعتبر القيمة دي من النوع ده».

الاختصارات: [[x += 5]] زي [[x = x + 5]]، ونفس الكلام لـ [[-=]] و [[*=]] و [[/=]]. و [[x++]] بتزوّد 1، و [[x--]] بتنقّص 1.

المقارنة: [[==]] (يساوي) و [[!=]] (مش بيساوي) و [[<]] و [[>]] و [[<=]] و [[>=]]. في C مفيش نوع boolean قديم، فالمقارنة بترجّع [[int]]: 1 لو صح و 0 لو غلط. وأي رقم غير 0 بيتحسب «صح» في if. (من C99 فيه [[bool]] في [[stdbool.h]]، وفي C23 بقت جزء من اللغة.)

المنطق:
• [[&&]] (و): صح لو الاتنين صح. ولو الأول غلط، التاني مش بيتحسب خالص (short-circuit).
• [[||]] (أو): صح لو واحد منهم صح. ولو الأول صح، التاني مش بيتحسب.
• [[!]] (لأ): بتعكس.

عمليات الـ bits (بتشتغل على كل bit لوحده، ومهمة في الـ embedded والشبكات):
• [[&]] (AND)، و [[|]] (OR)، و [[^]] (XOR)، و [[~]] (بتقلب كل الـ bits).
• [[<<]] و [[>>]]: بتزق الـ bits شمال أو يمين. [[1 << 4]] = 16.
خلي بالك إن [[&]] الواحدة هنا غير [[&&]]، وغير [[&]] اللي قبل اسم متغير في scanf: نفس الرمز ليه معاني مختلفة حسب مكانه.`,
          example: R`#include <stdio.h>

int main(void) {
    int a = 17, b = 5;
    printf("%d %d %d %d %d\n", a + b, a - b, a * b, a / b, a % b);
    printf("%.2f\n", (double)a / b);
    int x = 10;
    x += 5;
    x++;
    printf("x=%d\n", x);
    int ok = (a > b) && (b != 0);
    int either = (a < 0) || (b == 5);
    printf("ok=%d either=%d not=%d\n", ok, either, !ok);
    printf("bits: %d %d %d %d %d\n", 6 & 3, 6 | 3, 6 ^ 3, 1 << 4, ~0);
    return 0;
}`,
          try: R`احسب في دماغك الأول وبعدين شغّل: [[-7 / 2]] و [[-7 % 2]] و [[10 / 3 * 3]] و [[2 + 3 * 4]]. وبعدين اكتب برنامج بياخد رقم ويطبع هل هو زوجي ولا فردي بـ [[%]]، ومرة تانية بـ [[&]].`,
          flag: "script",
          deep: {
            why: R`القسمة الصحيحة و [[%]] بيتسألوا في كل انترفيو وكل مسألة (أرقام الخانات، الزوجي والفردي، اللف على array). والـ short-circuit بتاع [[&&]] هو اللي بيخلّي [[p != NULL && p->x > 0]] آمنة.`,
            how: R`الأولوية زي الرياضة: [[*]] و [[/]] و [[%]] قبل [[+]] و [[-]]، والمقارنة بعدهم، وبعدين [[&&]] وبعدين [[||]]. لو مش متأكد حط أقواس، دي مش عيب.

القسمة على صفر في الأرقام الصحيحة undefined behavior (غالبًا البرنامج بيقع)، وفي الـ double بتدّي [[inf]] أو [[nan]].

[[~0]]: الصفر كل الـ bits بتاعته 0، فلما تقلبهم يبقوا كلهم 1، ودي -1 في two's complement.

[[x++]] و [[++x]]: الاتنين بيزوّدوا 1. الفرق لو استخدمت القيمة في نفس الجملة: [[x++]] بترجّع القيمة القديمة و [[++x]] الجديدة. ولو كتبت [[x = x++]] أو [[i++ + i++]] ده undefined behavior: متعملهاش.`,
            when: R`[[%]] للزوجي والفردي واللف (index بيرجع للأول). و [[&&]] و [[||]] في كل شرط. والـ bits في الـ flags والـ permissions والـ registers في الـ embedded، و [[x & 1]] للزوجي والفردي.`,
            mistakes: R`[[if (x = 5)]] بدل [[if (x == 5)]]: دي تخصيص، والشرط دايمًا صح. [[-Wall]] بينبّهك. وتستخدم [[&]] بدل [[&&]] في شرط فتخسر الـ short-circuit. و [[1 / 2]] بتطلع 0 مش 0.5. و [[a + b]] على int ممكن تعدّي الحد من غير أي رسالة.`
          },
          lines: [
            "فيها printf.",
            "بداية main.",
            "رقمين صحاح.",
            R`جمع وطرح وضرب، وقسمة صحيحة (3)، وباقي القسمة (2).`,
            R`[[(double)]] cast: القسمة بقت عشرية، 3.40.`,
            "متغير جديد.",
            R`[[+=]]: x بقت 15.`,
            R`[[++]]: x بقت 16.`,
            "طباعة x.",
            R`[[&&]]: الاتنين صح، فالنتيجة 1.`,
            R`[[||]]: الأول غلط بس التاني صح، فالنتيجة 1.`,
            R`[[!]] بتعكس: [[!1]] = 0.`,
            R`AND و OR و XOR على bits الـ 6 والـ 3، وزق 1 أربع خانات، و [[~0]] = -1.`,
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[22 12 85 3 2]]
[[3.40]]
[[x=16]]
[[ok=1 either=1 not=0]]
[[bits: 2 7 5 16 -1]]
(6 = 110 و 3 = 011: الـ AND = 010 = 2، والـ OR = 111 = 7، والـ XOR = 101 = 5.)

[[-7 / 2]] = -3 (C بتقرّب ناحية الصفر)، و [[-7 % 2]] = -1 (الباقي بياخد إشارة الأول)، و [[10 / 3 * 3]] = 9 (القسمة الأول بتدّي 3)، و [[2 + 3 * 4]] = 14.

ولأن [[-7 % 2]] بـ -1 مش 1، الفحص الصح للفردي [[n % 2 != 0]] مش [[n % 2 == 1]]. والطريقة التانية [[n & 1]] بتدّي 1 للفردي حتى مع السالب.`,
          solCode: R`#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%d is %s\n", n, n % 2 != 0 ? "odd" : "even");
    printf("with &: %s\n", (n & 1) ? "odd" : "even");
    return 0;
}`
        },
        {
          cmd: "if و switch و loops في C",
          title: "الشروط والتكرار في C: if و switch و for و while و do-while و break و continue",
          desc: R`[[if (شرط) { ... }]] بتنفّذ الـ block لو الشرط مش صفر، و [[else if]] شرط تاني لو الأول منفعش، و [[else]] لو ولا واحد نفع.

[[switch (x)]] بيقارن قيمة صحيحة (int أو char أو enum) بقيم ثابتة. كل [[case]] قيمة، والتنفيذ بيبدأ من الـ case المطابق ويكمّل لتحت لحد ما يلاقي [[break]]. ده اسمه fall-through، ومفيد لو كذا قيمة ليها نفس الكود (زي 5 و 6 في المثال)، ومصيبة لو نسيت break. و [[default]] لو ولا case نفع. ومينفعش switch على نصوص في C.

الـ loops:
• [[for (init; condition; step)]]: لما تعرف هتلف كام مرة. [[for (int i = 1; i <= 5; i++)]] = ابدأ من 1، وطول ما i أقل من أو بيساوي 5، وزوّد 1 كل لفة.
• [[while (condition)]]: لما مش عارف عدد اللفات. بيفحص الشرط الأول، فممكن ميلفش ولا مرة.
• [[do { ... } while (condition);]]: بيلف مرة على الأقل، وبعدين يفحص. لاحظ الـ [[;]] في الآخر.
• [[break]]: اخرج من الـ loop (أو الـ switch) خالص.
• [[continue]]: سيب باقي اللفة دي وروح على اللي بعدها.

لو الـ block سطر واحد ممكن تشيل [[{ }]] زي [[while (n < 100) n *= 3;]]، بس حطها لو فيه أي شك.`,
          example: R`#include <stdio.h>

int main(void) {
    int score = 73;
    if (score >= 85) {
        printf("excellent\n");
    } else if (score >= 65) {
        printf("good\n");
    } else {
        printf("try again\n");
    }
    int day = 5;
    switch (day) {
        case 5:
        case 6:
            printf("weekend\n");
            break;
        default:
            printf("work day\n");
    }
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        printf("%d ", i);
    }
    printf("\n");
    int n = 1;
    while (n < 100) n *= 3;
    printf("first power of 3 >= 100: %d\n", n);
    int tries = 0;
    do {
        tries++;
    } while (tries < 0);
    printf("do-while ran %d time\n", tries);
    return 0;
}`,
          try: R`اكتب برنامج FizzBuzz: اطبع الأرقام من 1 لـ 15، بس لو الرقم بيقبل القسمة على 3 اطبع Fizz، وعلى 5 اطبع Buzz، وعلى الاتنين FizzBuzz. وبعدين امسح الـ [[break]] اللي في الـ switch وشغّل: اتطبع إيه؟`,
          flag: "script",
          deep: {
            why: "الشروط والـ loops هما المنطق كله. وأغلب أخطاء المبتدئين هنا: loop بيلف مرة زيادة أو ناقصة (off-by-one)، أو loop مبيخلصش، أو switch من غير break.",
            how: R`الـ [[for]] ده اختصار لـ while: الجزء الأول بيتنفذ مرة، والشرط قبل كل لفة، والخطوة بعد كل لفة. والمتغير اللي بتعرّفه جوه [[for (int i ...)]] بيبقى موجود جوه الـ loop بس (من C99).

الـ switch ممكن الـ compiler يحوّله لجدول قفز (jump table) فيبقى أسرع من سلسلة if لو الحالات كتير. و gcc بـ [[-Wall]] بينبّهك لو عامل switch على enum ونسيت قيمة. و [[-Wimplicit-fallthrough]] (في [[-Wextra]]) بينبّهك لو case فيه كود ومفيش break، وبيعديها لو الـ case فاضي زي 5 هنا.`,
            when: R`for لما العدد معروف (اللف على array). while لما بتستنى حاجة (قراية لحد آخر الملف). do-while لما لازم تنفّذ مرة الأول (منيو بيظهر وبعدين تسأل اليوزر). switch لقيمة واحدة بتتقارن بثوابت كتير.`,
            mistakes: R`[[for (i = 0; i <= n; i++)]] على array حجمها n: آخر لفة بتقرا بره الـ array. و [[;]] بعد الـ for أو الـ if بالغلط: [[for (...);]] بيلف على ولا حاجة، والـ block اللي تحته بيتنفذ مرة. و while مبتغيرش الشرط جواها، فتلف للأبد (اقفلها بـ Ctrl+C).`
          },
          lines: [
            "فيها printf.",
            "بداية main.",
            "الدرجة.",
            "أول شرط: الأعلى الأول.",
            "مش هيتنفذ: 73 أقل من 85.",
            "تاني شرط: 73 >= 65 صح.",
            "ده اللي هيتطبع.",
            R`[[else]]: لو ولا شرط نفع.`,
            "مش هيتنفذ.",
            "قفلة الـ if.",
            "يوم في الأسبوع كرقم.",
            R`[[switch]] بيقارن day بكل case.`,
            "case فاضي: بيكمّل على اللي تحته (fall-through مقصود).",
            "5 و 6 الاتنين بيوصلوا هنا.",
            "بيتطبع.",
            R`[[break]]: اخرج من الـ switch.`,
            R`[[default]]: لو ولا case نفع.`,
            "أي يوم تاني.",
            "قفلة الـ switch.",
            "loop من 1 لـ 5.",
            R`[[continue]]: سيب 3 وروح للي بعدها.`,
            "اطبع الرقم ومسافة.",
            "قفلة الـ for.",
            "سطر جديد بعد الأرقام.",
            "نبدأ من 1.",
            R`[[while]]: اضرب في 3 طول ما أقل من 100: 3 ثم 9 ثم 27 ثم 81 ثم 243.`,
            "اطبع 243.",
            "عدّاد.",
            R`[[do]]: نفّذ الأول.`,
            "زوّد العدّاد.",
            R`وبعدين افحص: [[1 < 0]] غلط، فوقف بعد لفة واحدة.`,
            "اطبع 1.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[good]]
[[weekend]]
[[1 2 4 5 ]]
[[first power of 3 >= 100: 243]]
[[do-while ran 1 time]]

لما تمسح الـ break، الـ case 5 بيكمّل لتحت لحد الـ default، فبيطبع [[weekend]] وبعدها [[work day]]. و [[-Wextra]] بينبّهك: [[this statement may fall through]].

FizzBuzz: الترتيب مهم، افحص 15 (أو [[i % 3 == 0 && i % 5 == 0]]) الأول، وإلا الـ 15 هتطلع Fizz بس.`,
          solCode: R`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 15; i++) {
        if (i % 15 == 0) printf("FizzBuzz\n");
        else if (i % 3 == 0) printf("Fizz\n");
        else if (i % 5 == 0) printf("Buzz\n");
        else printf("%d\n", i);
    }
    return 0;
}`
        },
        {
          cmd: "الدوال والـ prototypes",
          title: "الدوال في C: إزاي تعرّف دالة، وليه محتاج prototype، وليه الدالة مبتغيّرش المتغير اللي بعتّه؟",
          desc: R`الدالة في C شكلها: نوع اللي بترجّعه، والاسم، والـ parameters بأنواعها، وجسمها:
[[int square(int x) { return x * x; }]]
ولو مبترجّعش حاجة نوعها [[void]].

الـ compiler بيقرا الملف من فوق لتحت. لو [[main]] بتنادي [[square]] وهي متعرّفة تحت، لازم الـ compiler يكون عارف شكلها قبل ما يوصل للنداء. عشان كده بنكتب فوق prototype (أو declaration): سطر فيه شكل الدالة من غير جسمها، وآخره [[;]]:
[[int square(int x);]]
والـ prototypes دي هي اللي بتتحط في ملفات الـ header ([[.h]]) لما المشروع يبقى أكتر من ملف.

أهم حاجة في الدرس: C بتبعت نسخة من القيمة (pass by value). لما تنادي [[try_change(n)]]، الدالة بتاخد x جديد قيمته زي n، وأي تغيير في x بيفضل جوه الدالة. عشان دالة تغيّر متغير عندك لازم تبعتلها عنوانه، وده أول استخدام حقيقي للـ pointers (بعد كام درس).

والدالة ممكن تنادي نفسها (recursion)، بشرط يكون فيه حالة توقف.`,
          example: R`#include <stdio.h>

int square(int x);
void try_change(int x);

int main(void) {
    int n = 4;
    printf("square(%d) = %d\n", n, square(n));
    try_change(n);
    printf("n after try_change: %d\n", n);
    return 0;
}

int square(int x) {
    return x * x;
}

void try_change(int x) {
    x = 100;
    printf("inside: x = %d\n", x);
}`,
          try: R`امسح سطر الـ prototype بتاع [[square]] واعمل compile بـ [[-std=c17 -Wall]]: إيه الرسالة؟ وبعدين اكتب دالة [[long long factorial(int n)]] بالـ recursion، واطبع factorial من 1 لـ 20. وجرّب تحسبها لـ 25: الناتج منطقي؟`,
          flag: "script",
          deep: {
            why: R`الدوال بتقسم البرنامج لحتت صغيرة ليها أسماء وتقدر تختبرها لوحدها. وفهم pass by value هو اللي هيخليك تفهم ليه C محتاجة pointers، وليه C++ ضافت references.`,
            how: R`لما تنادي دالة، بيتحجز لها جزء من الـ stack (اسمه stack frame) فيه الـ parameters والمتغيرات المحلية بتاعتها، وبيتشال لما ترجع. عشان كده x في [[try_change]] متغير تاني خالص في مكان تاني، وبيختفي بعد ما الدالة تخلص.

والـ recursion كل نداء بياخد frame جديد. لو مفيش حالة توقف، الـ stack بيخلص (غالبًا كام ميجا) والبرنامج يقع بـ stack overflow.

[[static]] قبل دالة معناها «الدالة دي متشافش غير جوه الملف ده»، وده بيتعمل للدوال المساعدة الداخلية.`,
            when: R`أي كود بيتكرر أو له اسم واضح يبقى دالة. والقاعدة: الدالة تعمل حاجة واحدة. والـ prototype فوق في الملف، أو في header لو هتستخدمها من ملف تاني.`,
            mistakes: R`تفتكر إن الدالة غيّرت المتغير بتاعك وهي غيّرت نسخة. وتنسى [[return]] في دالة مش void: الناتج زبالة، و [[-Wall]] بينبّهك بـ [[control reaches end of non-void function]]. وترجّع عنوان متغير محلي من دالة: المتغير مات لما الدالة رجعت.`
          },
          lines: [
            "فيها printf.",
            R`prototype: [[square]] بتاخد int وبترجّع int. آخره [[;]] ومن غير جسم.`,
            R`prototype: [[try_change]] مبترجّعش حاجة ([[void]]).`,
            "بداية main.",
            "متغير محلي.",
            R`نداء [[square]]: الـ 4 بتتنسخ في x جوه الدالة.`,
            R`نبعت n، والدالة بتاخد نسخة منها.`,
            "n لسه 4.",
            "نجاح.",
            "قفلة main.",
            R`تعريف [[square]]: نفس الشكل بتاع الـ prototype.`,
            "رجّع x في x.",
            "قفلة.",
            R`تعريف [[try_change]].`,
            "بتغيّر النسخة بتاعتها بس.",
            "جوه الدالة x بقت 100.",
            "قفلة."
          ],
          sol: R`الناتج:
[[square(4) = 16]]
[[inside: x = 100]]
[[n after try_change: 4]]

من غير الـ prototype، gcc 14 بيرفض:
[[error: implicit declaration of function 'square' [-Wimplicit-function-declaration]]]
(compilers أقدم كانت بتطلّعها warning بس وتكمّل، وده كان بيعمل bugs.)

[[factorial(20)]] = 2432902008176640000 وده لسه داخل في long long. [[factorial(25)]] بيعدّي الحد (أكبر long long حوالي 9.2 × 10^18)، فالناتج بيطلع رقم غلط. ده signed overflow، يعني undefined behavior.`,
          solCode: R`#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(void) {
    for (int i = 1; i <= 20; i++) {
        printf("%d! = %lld\n", i, factorial(i));
    }
    return 0;
}`
        }
      ]
    },
    {
      t: "الـ Arrays والـ Strings والـ Pointers",
      l: 1,
      n: "أهم جزء في C: الذاكرة شكلها إيه، والـ array والنص والـ pointer علاقتهم ببعض، و malloc و free",
      items: [
        {
          cmd: "arrays في C",
          title: "الـ array في C: إزاي تعرّفها وتعرف طولها، وليه C مش بتمنعك تقرا بره حدودها؟",
          desc: R`الـ array مجموعة عناصر من نفس النوع جنب بعض في الذاكرة. [[int marks[5];]] بتحجز مكان لـ 5 أرقام صحاح ورا بعض (20 byte لو الـ int بـ 4).

• الـ index بيبدأ من 0: أول عنصر [[marks[0]]] وآخر عنصر [[marks[4]]].
• الأقواس المربعة [[[ ]]] في التعريف بتقول الحجم، وفي الاستخدام بتقول رقم العنصر.
• القيم الأولية بين [[{ }]]: [[int marks[5] = {90, 75, 60, 85, 70};]]. ولو كتبت قيم أقل، الباقي بيبقى صفر، فـ [[int zeros[4] = {0};]] كلها أصفار. ومن غير قيم أولية خالص، الـ array المحلية فيها زبالة.
• الطول: C مش بتحفظ طول الـ array في أي حتة. جوه نفس الدالة اللي عرّفتها تقدر تحسبه: [[sizeof(marks) / sizeof(marks[0])]] = حجمها كله ÷ حجم عنصر واحد.
• لما تبعت array لدالة، اللي بيتبعت عنوان أول عنصر بس، فالدالة متعرفش الطول، ولازم تبعته معاها. عشان كده [[average(marks, len)]].
• [[const int arr[]]] في الـ parameter معناها «الدالة دي هتقرا بس، مش هتغيّر».

وأهم تحذير: C مش بتتشيّك على الحدود. [[marks[5]]] أو [[marks[100]]] هتتعمل compile وتشتغل وتقرا (أو تكتب) في ذاكرة مش بتاعتك. ده اسمه buffer overflow، ومن أشهر أسباب الثغرات الأمنية في التاريخ.

وفيه arrays بأكتر من بُعد: [[int grid[2][3]]] صفين في كل صف ٣ عناصر، و [[grid[1][2]]] الصف التاني العنصر التالت.`,
          example: R`#include <stdio.h>

double average(const int arr[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) {
        sum += arr[i];
    }
    return (double)sum / len;
}

int main(void) {
    int marks[5] = {90, 75, 60, 85, 70};
    int len = sizeof(marks) / sizeof(marks[0]);
    marks[2] = 65;
    printf("len=%d first=%d last=%d\n", len, marks[0], marks[len - 1]);
    printf("average=%.1f\n", average(marks, len));
    int zeros[4] = {0};
    printf("zeros[3]=%d\n", zeros[3]);
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("grid[1][2]=%d\n", grid[1][2]);
    return 0;
}`,
          try: R`اكتب دالة [[int max_of(const int arr[], int len)]] ترجّع أكبر عنصر، ودالة [[void reverse(int arr[], int len)]] تقلب الـ array في مكانها. وجرّب جوه [[average]] تطبع [[sizeof(arr)]]: طلع كام، وليه مش 20؟`,
          flag: "script",
          deep: {
            why: "الـ array أبسط وأسرع هيكل بيانات: العناصر جنب بعض، فالوصول لأي عنصر بالـ index خطوة واحدة، والـ CPU بيحب يقرا ذاكرة متتالية. vector في C++ و list في Python و array في JS كلهم مبنيين على نفس الفكرة.",
            how: R`[[marks[i]]] الـ compiler بيحسبها: عنوان أول عنصر + i × حجم العنصر. مفيش أي فحص إن i أقل من الطول، لأن ده هيكلّف وقت في كل وصول، و C اختارت السرعة وسابت المسؤولية عليك.

جوه [[average]]، [[arr]] مش array، ده pointer لأول عنصر (الدرس الجاي بعد الـ strings بيشرح ده). عشان كده [[sizeof(arr)]] جوه الدالة بيدّيك حجم pointer (8) مش حجم الـ array. و gcc بينبّهك لو كتبتها: [[-Wsizeof-array-argument]].`,
            when: R`array ثابتة الحجم لما تعرف الحجم وقت الكتابة (أيام الأسبوع، grid صغيرة). ولو الحجم بيتحدد وقت التشغيل أو بيكبر، [[malloc]] (آخر الكاتيجوري دي)، أو في C++ [[std::vector]].`,
            mistakes: R`[[for (i = 0; i <= len; i++)]]: الـ [[<=]] بتقرا عنصر زيادة بره الـ array. وتحسب الطول بـ sizeof جوه دالة استلمت الـ array. وتنسى تدي قيم أولية فتلاقي أرقام غريبة. وتعمل array محلية ضخمة ([[int big[10000000];]]) فالـ stack يخلص والبرنامج يقع: الحاجات الكبيرة مكانها malloc.`
          },
          lines: [
            "فيها printf.",
            R`الدالة بتاخد الـ array (عنوانها في الحقيقة) وطولها. و [[const]] = مش هتغيّرها.`,
            "مجموع.",
            "لف على كل index من 0 لـ len - 1.",
            R`[[arr[i]]] العنصر رقم i.`,
            "قفلة الـ for.",
            R`cast لـ double عشان القسمة متشيلش الكسر.`,
            "قفلة الدالة.",
            "بداية main.",
            "array من ٥ أرقام بقيم أولية.",
            "الطول = الحجم كله ÷ حجم عنصر واحد = 20 ÷ 4 = 5.",
            "تغيير العنصر التالت (index 2).",
            R`أول عنصر index 0، وآخر عنصر [[len - 1]].`,
            "نبعت الـ array وطولها للدالة.",
            "قيمة واحدة والباقي أصفار تلقائيًا.",
            "آخر عنصر صفر.",
            "array بُعدين: صفين × ٣ أعمدة.",
            "الصف التاني (1)، العمود التالت (2) = 6.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[len=5 first=90 last=70]]
[[average=77.0]]
[[zeros[3]=0]]
[[grid[1][2]=6]]
(المتوسط: 90 + 75 + 65 + 85 + 70 = 385 ÷ 5 = 77.)

[[sizeof(arr)]] جوه الدالة بـ 8 على جهاز 64-bit: ده حجم pointer، لأن الـ array اتبعتت كعنوان أول عنصر. ومع [[-Wall]]، gcc بينبّهك:
[[warning: 'sizeof' on array function parameter 'arr' will return size of 'const int *']]

[[reverse]] بتبدّل أول عنصر مع آخر عنصر، والتاني مع اللي قبل الأخير، لحد ما يتقابلوا في النص.`,
          solCode: R`#include <stdio.h>

int max_of(const int arr[], int len) {
    int best = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] > best) best = arr[i];
    }
    return best;
}

void reverse(int arr[], int len) {
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}

int main(void) {
    int a[5] = {4, 9, 1, 7, 3};
    printf("max=%d\n", max_of(a, 5));
    reverse(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}`
        },
        {
          cmd: "strings في C",
          title: "النص في C مجرد array من char آخرها '\\0': يعني إيه، وإزاي تنسخ وتقارن من غير ما تعدّي الحدود؟",
          desc: R`C معندهاش نوع string. النص هو array من [[char]] وآخرها حرف خاص قيمته صفر: [['\0']] (اسمه null terminator). كل الدوال اللي بتتعامل مع النصوص بتمشي حرف حرف لحد ما تقابل الصفر ده، وكده بتعرف النص خلص فين.

[[char name[] = "Sara";]] بتحجز 5 bytes مش 4: [['S' 'a' 'r' 'a' '\0']]. عشان كده:
• [[strlen(name)]] بـ 4: بتعد الحروف لحد الـ [[\0]].
• [[sizeof(name)]] بـ 5: حجم الـ array كلها.

دوال [[string.h]] الأشهر:
• [[strlen(s)]]: الطول.
• [[strcmp(a, b)]]: بترجّع 0 لو متساويين، وسالب أو موجب حسب الترتيب الأبجدي. [[==]] بين نصين بتقارن العناوين مش الحروف، فمتستخدمهاش.
• [[strcpy(dst, src)]]: بتنسخ من غير ما تعرف حجم dst، فلو src أطول بتكتب بره الـ array. ودي من أخطر الدوال.
• [[strcat]]: بتلزق نص في آخر نص، ونفس الخطر.

الطريقة الآمنة للنسخ والتركيب: [[snprintf(buf, sizeof(buf), "...", ...)]]. بتكتب لحد الحجم اللي اديته بالظبط، وبتحط [[\0]] دايمًا، وبترجّع الطول اللي كانت محتاجاه. فلو الرقم ده أكبر من أو بيساوي حجم الـ buffer، يبقى النص اتقص.

[[char *s = "Sara";]] (بالنجمة) حاجة تانية: ده pointer لنص ثابت في ذاكرة للقراية بس. لو حاولت تغيّر حرف فيه، البرنامج غالبًا هيقع. لو عايز تعدّل، استخدم [[char s[] = "Sara";]].`,
          example: R`#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
    const char *full = argc > 1 ? argv[1] : "Sara Mohamed";
    char name[] = "Sara";
    printf("strlen=%zu sizeof=%zu\n", strlen(name), sizeof(name));
    printf("name[4] = %d\n", name[4]);
    char greeting[32];
    snprintf(greeting, sizeof(greeting), "Hello, %s!", name);
    printf("%s\n", greeting);
    char small[8];
    int needed = snprintf(small, sizeof(small), "%s", full);
    printf("small=\"%s\" needed=%d\n", small, needed);
    if (strcmp(name, "Sara") == 0) {
        printf("same text\n");
    }
    name[0] = 's';
    printf("%s\n", name);
    return 0;
}`,
          try: R`شغّله من غير arguments، وبعدين [[./app Ali]]. وبعدين اكتب دالة [[int count_char(const char *s, char c)]] تعد حرف معيّن في نص بـ loop لحد الـ [[\0]] (من غير strlen). وجرّب تشيل الـ [[\0]] من آخر نص بإيدك: [[char bad[4] = {'a','b','c','d'};]] واطبعه بـ [[%s]]: إيه اللي اتطبع؟`,
          flag: "script",
          deep: {
            why: R`كل نص في C (أسماء ملفات، input، رسايل شبكة) هو array حروف. وأشهر ثغرات أمنية في التاريخ جت من نسخ نص أطول من الـ buffer بـ [[strcpy]] أو [[gets]] (اتشالت من اللغة خالص في C11 لأنها مينفعش تستخدم بأمان).`,
            how: R`[[strlen]] بتلف من أول حرف لحد ما تلاقي byte قيمته 0، فهي [[O(n)]] كل مرة تناديها. فمتحطهاش في شرط for على نص طويل: [[for (i = 0; i < strlen(s); i++)]] بتحسب الطول في كل لفة.

لو نص ملوش [[\0]]، [[printf("%s")]] و [[strlen]] هيكمّلوا يقروا في الذاكرة اللي بعده لحد ما يلاقوا صفر بالصدفة، فهتشوف حروف غريبة أو البرنامج يقع.

[[%s]] في [[snprintf]] بتاخد عنوان أول حرف، وبتفضل تنسخ لحد الـ [[\0]] أو لحد ما الـ buffer يخلص.`,
            when: R`[[snprintf]] لأي نسخ أو تركيب. [[strcmp]] للمقارنة. [[strncmp(a, b, n)]] لمقارنة أول n حرف (زي «النص بيبدأ بـ...»). و [[fgets]] لقراية سطر (درس الملفات). وفي C++ استخدم [[std::string]] وارتاح من كل ده.`,
            mistakes: R`[[if (name == "Sara")]] بتقارن عناوين، استخدم [[strcmp]]. و [[char s[4] = "Sara";]]: مفيش مكان للـ [[\0]]. و [[strcpy]] من غير ما تتأكد من الطول. وتغيّر حرف في [[char *s = "..."]]. وتنسى إن [[strlen]] مش بتعد الـ [[\0]]، فتعمل [[malloc(strlen(s))]] وتنسى الـ +1.`
          },
          lines: [
            "فيها printf و snprintf.",
            R`فيها [[strlen]] و [[strcmp]].`,
            "main بـ arguments.",
            R`نص من الترمنال لو موجود، وإلا نص ثابت. الـ [[?]] و [[:]] (ternary): لو الشرط صح خد الأولى، وإلا التانية.`,
            R`array من 5: أربع حروف + [[\0]].`,
            R`[[strlen]] بتعد لحد الصفر (4)، و [[sizeof]] حجم الـ array (5).`,
            R`العنصر الخامس هو الـ [[\0]]، وقيمته 0.`,
            "buffer كبير كفاية.",
            R`[[snprintf]]: اكتب نص منسّق، ومتعدّيش 32 byte.`,
            "Hello, Sara!",
            "buffer صغير: 7 حروف + الصفر.",
            "بتكتب اللي يلحق، وبترجّع الطول اللي كانت محتاجاه.",
            R`النص اتقص، والرقم المرجّع بيقولك كان محتاج كام. و [[\"]] علامة تنصيص جوه النص.`,
            R`[[strcmp]] بترجّع 0 لو النصين زي بعض.`,
            "بيتطبع.",
            "قفلة الـ if.",
            "تعديل حرف: مسموح لأن name array مش نص ثابت.",
            "بقت sara.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`من غير arguments:
[[strlen=4 sizeof=5]]
[[name[4] = 0]]
[[Hello, Sara!]]
[[small="Sara Mo" needed=12]]
[[same text]]
[[sara]]

[[needed=12]] و الـ buffer 8، يعني النص اتقص: 7 حروف + [[\0]]. مع [[./app Ali]] السطر بيبقى [[small="Ali" needed=3]].

النص اللي ملوش [[\0]] بيطبع abcd وبعدها حروف عشوائية أو مفيش حاجة زيادة، حسب اللي في الذاكرة بعده بالصدفة. ده undefined behavior.`,
          solCode: R`#include <stdio.h>

int count_char(const char *s, char c) {
    int count = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == c) count++;
    }
    return count;
}

int main(void) {
    printf("%d\n", count_char("banana", 'a'));
    return 0;
}`
        },
        {
          cmd: "المؤشرات Pointers والذاكرة",
          title: "الـ pointer يعني إيه؟ & بتجيب العنوان و * بتروح للعنوان، بالرسم",
          desc: R`الذاكرة (RAM) عبارة عن bytes كتير ورا بعض، وكل byte ليه رقم اسمه العنوان (address)، زي رقم الشقة في عمارة. أي متغير عندك قاعد في عنوان معيّن.

الـ pointer متغير عادي، بس القيمة اللي جواه عنوان متغير تاني.

رمزين لازم تفرق بينهم:
• [[&x]] (الـ address-of operator): «عنوان x فين؟».
• [[*p]] (الـ dereference operator): «روح للعنوان اللي في p، وهات (أو غيّر) اللي هناك».
• والنجمة في التعريف [[int *p]] معناها حاجة تالتة: «p نوعه pointer لـ int». مش عملية.

بعد [[int score = 100;]] و [[int *ptr = &score;]] الذاكرة شكلها كده (العناوين مثال):

[[  العنوان        الاسم     القيمة]]
[[  0x7ffc1000     score     100]]
[[  0x7ffc1008     ptr       0x7ffc1000]]

• [[ptr]] قيمته [[0x7ffc1000]] (عنوان score).
• [[*ptr]] = روح لـ [[0x7ffc1000]] وهات اللي هناك = 100.
• [[*ptr = 250;]] = روح لـ [[0x7ffc1000]] واكتب 250. فـ score نفسه بقى 250، من غير ما تكتب اسمه.

وده بيحل مشكلة الدرس اللي فات: الدالة بتاخد نسخة، فلو عايزها تغيّر متغير عندك ابعتلها عنوانه، وهي تروح للعنوان وتغيّر. ده اللي [[swap(&x, &y)]] بتعمله، وده نفس سبب [[&]] في [[scanf]].

[[NULL]] عنوان خاص معناه «مش بشاور على حاجة». اعمل أي pointer مش جاهز بـ [[NULL]]، واتشيّك عليه قبل ما تعمل [[*]].`,
          example: R`#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int score = 100;
    int *ptr = &score;
    printf("score=%d *ptr=%d\n", score, *ptr);
    printf("&score=%p ptr=%p\n", (void *)&score, (void *)ptr);
    *ptr = 250;
    printf("score after *ptr = 250: %d\n", score);
    int x = 1, y = 2;
    swap(&x, &y);
    printf("x=%d y=%d\n", x, y);
    int *nothing = NULL;
    if (nothing == NULL) printf("nothing points nowhere\n");
    return 0;
}`,
          try: R`ارسم على ورقة الذاكرة بعد كل سطر في main. وبعدين اكتب دالة [[void min_max(const int arr[], int len, int *min, int *max)]] بترجّع قيمتين عن طريق الـ pointers، وناديها من main. وآخر حاجة: اعمل [[int *bad;]] من غير قيمة واكتب [[*bad = 5;]]، واعمل compile بـ [[-Wall]] وشغّل.`,
          flag: "script",
          deep: {
            why: R`الـ pointers هي اللي بتخلي C تعمل أي حاجة: دالة تغيّر متغيراتك، وتبعت حاجة كبيرة لدالة من غير ما تنسخها (تبعت عنوانها بس، 8 bytes)، وتحجز ذاكرة وقت التشغيل (malloc)، وتبني linked lists و trees. وكل لغة تانية فيها نفس الفكرة بس مستخبية: الـ object في Java و JS بيتبعت كـ reference، وده pointer من جوه.`,
            how: R`الـ pointer على جهاز 64-bit حجمه 8 bytes مهما كان نوع اللي بيشاور عليه. النوع ([[int *]] أو [[double *]]) بيقول للـ compiler حاجتين: لما تعمل [[*p]] يقرا كام byte ويفسّرهم إزاي، ولما تعمل [[p + 1]] يتحرك كام byte (الدرس الجاي).

[[%p]] بتطبع عنوان، ومحتاجة [[void *]]، عشان كده الـ cast [[(void *)]]. و [[void *]] معناها «pointer لأي حاجة، من غير نوع».

العنوان بيتغيّر كل مرة تشغّل البرنامج، لأن نظام التشغيل بيحط الـ stack في مكان عشوائي (ASLR) عشان يصعّب الاختراق.

[[NULL]] في الحقيقة عنوان 0، ونظام التشغيل مش بيسمح لأي برنامج يقرا أو يكتب هناك. عشان كده [[*NULL]] بيقع على طول بـ Segmentation fault بدل ما يبوّظ حاجة بهدوء.`,
            when: R`لما دالة لازم تغيّر متغير عند اللي ناداها، أو ترجّع أكتر من قيمة. ولما تبعت struct أو array كبيرة لدالة (ابعت [[const T *]] لو هتقرا بس). وفي كل ذاكرة ديناميكية وهياكل بيانات مترابطة.`,
            mistakes: R`pointer من غير قيمة أولية (wild pointer) وتعمل عليه [[*]]: بيكتب في مكان عشوائي. و [[*]] على [[NULL]]: segfault. وترجّع عنوان متغير محلي من دالة (dangling pointer): المتغير اتمسح لما الدالة خلصت. وتلخبط بين [[int *p]] في التعريف و [[*p]] في الاستخدام. وتكتب [[int* a, b;]] وتفتكر الاتنين pointers: b هنا int عادي.`
          },
          lines: [
            "فيها printf.",
            R`[[swap]] بتاخد عنوانين لـ int.`,
            R`[[*a]]: روح للعنوان اللي في a وهات القيمة (1)، واحفظها.`,
            R`حط في عنوان a القيمة اللي في عنوان b.`,
            "وحط في عنوان b القيمة القديمة.",
            "قفلة swap.",
            "بداية main.",
            "متغير عادي في عنوان ما.",
            R`[[int *]] = pointer لـ int، و [[&score]] = عنوان score.`,
            R`[[*ptr]] بتروح للعنوان وتجيب 100.`,
            R`[[&score]] و ptr نفس العنوان. [[%p]] محتاجة [[void *]].`,
            "اكتب 250 في العنوان اللي ptr بيشاور عليه، يعني في score.",
            "score بقى 250.",
            "متغيرين.",
            R`نبعت عناوينهم مش قيمهم، فـ swap تقدر تغيّرهم.`,
            "اتبدّلوا: x=2 y=1.",
            R`[[NULL]]: pointer مش بيشاور على حاجة.`,
            R`اتشيّك قبل ما تعمل [[*]].`,
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج (العنوان عندك هيختلف، وهيتغيّر كل مرة):
[[score=100 *ptr=100]]
[[&score=0x7fff96a249fc ptr=0x7fff96a249fc]]
[[score after *ptr = 250: 250]]
[[x=2 y=1]]
[[nothing points nowhere]]

[[min_max]] بتكتب في [[*min]] و [[*max]]، والنداء [[min_max(a, 5, &lo, &hi)]].

[[*bad = 5;]] مع [[-Wall]]: [[warning: 'bad' is used uninitialized [-Wuninitialized]]]، والبرنامج ممكن يقع بـ [[Segmentation fault]]، وممكن ميقعش ويكتب في مكان عشوائي بهدوء (ده اللي حصل عندي على gcc 14: كمّل عادي). والحالة التانية أسوأ، لأن الغلط بيبان بعدين في مكان ملوش علاقة.`,
          solCode: R`#include <stdio.h>

void min_max(const int arr[], int len, int *min, int *max) {
    *min = arr[0];
    *max = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int a[5] = {4, 9, 1, 7, 3};
    int lo, hi;
    min_max(a, 5, &lo, &hi);
    printf("min=%d max=%d\n", lo, hi);
    return 0;
}`
        },
        {
          cmd: "pointer arithmetic",
          title: "يعني إيه p + 1 في الـ pointers، وليه arr[i] هي نفسها *(arr + i)؟",
          desc: R`لما تزوّد رقم على pointer، هو مبيزيدش bytes، بيزيد عناصر. لو [[p]] من نوع [[int *]] و الـ int بـ 4 bytes، يبقى [[p + 1]] العنوان اللي بعده بـ 4 bytes، يعني العنصر اللي بعده.

ومن هنا: [[arr[i]]] في C معناها بالظبط [[*(arr + i)]]: روح لأول عنصر، واتحرك i عناصر، وهات اللي هناك. الأقواس المربعة مجرد اختصار.

array decay: اسم الـ array في أغلب الأماكن بيتحول لوحده لـ pointer لأول عنصر. فـ [[int *p = arr;]] صح من غير [[&]]، ولما تبعت array لدالة اللي بيتبعت pointer. وده سبب إن الدالة متعرفش الطول، وسبب إن [[scanf("%s", name)]] من غير [[&]].

بس الـ array مش pointer:
• [[sizeof(arr)]] حجم الـ array كلها (16 لـ 4 أرقام)، و [[sizeof(p)]] حجم الـ pointer (8).
• [[p++]] مسموح، و [[arr++]] لأ: الـ array مكانها ثابت.

عمليات مسموحة: pointer + رقم، و pointer - pointer (عدد العناصر بينهم، لو الاتنين في نفس الـ array)، والمقارنة ([[it != arr + 4]]). و [[arr + 4]] (واحد بعد الآخر) مسموح تحسبه وتقارن بيه، بس متعملوش [[*]].`,
          example: R`#include <stdio.h>

int sum(const int *p, int len) {
    int total = 0;
    for (int i = 0; i < len; i++) total += *(p + i);
    return total;
}

int main(void) {
    int arr[4] = {10, 20, 30, 40};
    int *p = arr;
    printf("%d %d %d\n", *p, *(p + 1), p[2]);
    printf("bytes from p to p+1: %td\n", (char *)(p + 1) - (char *)p);
    p++;
    printf("after p++: %d\n", *p);
    printf("sizeof(arr)=%zu sizeof(p)=%zu\n", sizeof(arr), sizeof(p));
    printf("sum=%d\n", sum(arr, 4));
    for (int *it = arr; it != arr + 4; it++) printf("%d ", *it);
    printf("\n");
    return 0;
}`,
          try: R`اكتب [[size_t my_strlen(const char *s)]] بالـ pointers بس، من غير [[[ ]]] ولا index: امشي بـ pointer لحد ما [[*s]] تبقى [['\0']]، والطول هو الفرق بين الـ pointer في الآخر وفي الأول. وجرّب تطبع [[3[arr]]]: ليه بتشتغل؟`,
          flag: "script",
          deep: {
            why: R`ده اللي بيخلي الـ arrays سريعة، وده اللي ورا الـ iterators في C++ (فكرتها نفس فكرة [[it != arr + 4]] بالظبط). ولو فهمت الدرس ده هتفهم ليه الدوال محتاجة الطول، وليه الـ buffer overflow سهل يحصل.`,
            how: R`[[p + i]] الـ compiler بيحسبها: العنوان + i × [[sizeof(*p)]]. عشان كده النوع مهم: [[char *]] بيتحرك byte، و [[int *]] أربعة، و [[double *]] تمانية. وفي المثال عملنا cast لـ [[char *]] عشان نشوف المسافة بالـ bytes.

الفرق بين pointerين نوعه [[ptrdiff_t]] وبيتطبع بـ [[%td]].

ولأن [[a[b]]] معناها [[*(a + b)]] والجمع بيقبل الترتيب، [[3[arr]]] هي [[*(3 + arr)]] = [[arr[3]]]. معلومة غريبة للانترفيو، متكتبهاش في كود حقيقي.`,
            when: R`قراية كود C الحقيقي (المكتبات، نواة Linux) مليانة pointer arithmetic. في كودك استخدم [[arr[i]]] لأنها أوضح، والـ pointers لما تمشي على buffer (parsing لنص أو بروتوكول). وفي C++ الـ iterators والـ [[std::span]] بيدّوك نفس الفكرة بأمان أكتر.`,
            mistakes: R`تفتكر إن [[p + 1]] بتزوّد byte واحد. وتعمل [[*]] على [[arr + len]] (واحد بعد الآخر). وتطرح pointers من arrays مختلفة. وتعمل [[sizeof]] على pointer وتفتكره حجم الـ array. وتعدّل الـ pointer الأصلي اللي جالك من malloc ([[p++]]) وبعدين تعمل [[free(p)]] على العنوان الجديد: لازم free على نفس العنوان اللي malloc رجّعته.`
          },
          lines: [
            "فيها printf.",
            R`نفس الدالة بتاعة الـ array، بس مكتوبة كـ pointer صريح.`,
            "مجموع.",
            R`[[*(p + i)]] = العنصر رقم i، زي [[p[i]]] بالظبط.`,
            "رجّع المجموع.",
            "قفلة الدالة.",
            "بداية main.",
            "array من ٤ أرقام.",
            R`اسم الـ array بيتحول لعنوان أول عنصر، من غير [[&]].`,
            R`أول عنصر، والتاني بالـ arithmetic، والتالت بالأقواس.`,
            R`المسافة بين p و p+1 بالـ bytes = حجم int.`,
            "الـ pointer اتحرك عنصر واحد.",
            "بقى بيشاور على 20.",
            "الـ array 16 byte، والـ pointer 8.",
            "نبعت الـ array، واللي بيتبعت عنوان أول عنصر.",
            R`لف بالـ pointer: من أول عنصر لحد «واحد بعد الآخر».`,
            "سطر جديد.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[10 20 30]]
[[bytes from p to p+1: 4]]
[[after p++: 20]]
[[sizeof(arr)=16 sizeof(p)=8]]
[[sum=100]]
[[10 20 30 40 ]]

[[my_strlen]]: احفظ البداية، وامشي لحد الصفر، واطرح.
[[3[arr]]] بتطبع 40، لأنها [[*(3 + arr)]] = [[*(arr + 3)]].`,
          solCode: R`#include <stdio.h>
#include <stddef.h>

size_t my_strlen(const char *s) {
    const char *start = s;
    while (*s != '\0') s++;
    return (size_t)(s - start);
}

int main(void) {
    printf("%zu\n", my_strlen("pointer"));
    return 0;
}`
        },
        {
          cmd: "إدارة الذاكرة: malloc و free",
          title: "malloc و calloc و realloc و free: إمتى تحجز من الـ heap، والفرق بينه وبين الـ stack",
          desc: R`لحد دلوقتي كل المتغيرات كانت على الـ stack: الـ compiler بيعرف حجمها وقت الـ compile، وبتتمسح لوحدها لما الدالة تخلص. ده سريع جدًا، بس ليه حدود:
• الحجم لازم يبقى معروف (أو صغير)، والـ stack نفسه صغير (غالبًا ٨ ميجا على Linux و ١ ميجا على Windows).
• المتغير بيموت مع الدالة، فمينفعش ترجّع array محلية.

الـ heap مساحة كبيرة تحجز منها وقت التشغيل بالحجم اللي محتاجه، والذاكرة دي بتفضل موجودة لحد ما انت تقول. الدوال في [[stdlib.h]]:
• [[malloc(bytes)]]: احجز عدد bytes، والقيم جواها زبالة. بترجّع pointer لأول byte، أو [[NULL]] لو مفيش ذاكرة.
• [[calloc(count, size)]]: احجز count عنصر وصفّرهم.
• [[realloc(p, new_bytes)]]: كبّر أو صغّر حجز قديم. ممكن ينقله لمكان تاني ويرجّع عنوان جديد، أو [[NULL]] لو فشل (والقديم لسه سليم).
• [[free(p)]]: رجّع الذاكرة. بعدها p بيشاور على حاجة مش بتاعتك.

القاعدة: كل malloc أو calloc ليها free واحدة بالظبط. لو نسيت يبقى memory leak (البرنامج بياكل ذاكرة ومبيرجعهاش). ولو عملت free مرتين (double free) أو استخدمت الذاكرة بعد free (use after free) ده undefined behavior، وغالبًا ثغرة أمنية.

[[n * sizeof *arr]]: [[sizeof *arr]] = حجم العنصر اللي arr بيشاور عليه. أحسن من [[sizeof(int)]] لأن لو غيّرت نوع arr بعدين الحجم هيتظبط لوحده.`,
          example: R`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 3;
    int *arr = malloc(n * sizeof *arr);
    if (arr == NULL) {
        fprintf(stderr, "out of memory\n");
        return 1;
    }
    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    int *bigger = realloc(arr, 5 * sizeof *arr);
    if (bigger == NULL) {
        free(arr);
        return 1;
    }
    arr = bigger;
    arr[3] = 40;
    arr[4] = 50;
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\n");
    int *zeros = calloc(4, sizeof *zeros);
    if (!zeros) {
        free(arr);
        return 1;
    }
    printf("calloc gives zeros: %d %d\n", zeros[0], zeros[3]);
    free(zeros);
    free(arr);
    arr = NULL;
    return 0;
}`,
          try: R`اكتب برنامج يقرا أرقام من الـ input لحد ما يخلص (scanf ترجّع حاجة غير 1)، ويخزنهم في array بتكبر لوحدها: ابدأ بسعة 4، ولما تتملي اعمل realloc بالضعف. في الآخر اطبع العدد والمجموع واعمل free. جرّبه بـ [[seq 1 100 | ./app]]. وبعدين امسح الـ free واعمل compile بـ [[-fsanitize=address]]: إيه اللي اتطبع في الآخر؟`,
          flag: "script",
          deep: {
            why: "أي برنامج حقيقي بيتعامل مع داتا حجمها مش معروف مسبقًا: ملف، أو طلبات من الشبكة، أو صورة. والـ heap هو المكان الوحيد لده في C. وأخطاء الذاكرة (leaks و use after free و double free) من أشهر أسباب الـ crashes والثغرات في برامج C و C++، عشان كده C++ عملت RAII و smart pointers (المستوى ٢ و ٣).",
            how: R`[[malloc]] مش بتكلم نظام التشغيل كل مرة: مكتبة C عندها مدير ذاكرة بياخد chunks كبيرة من النظام ويقسمها. وبيحفظ قبل كل حجز حجمه، وده اللي بيخلي [[free(p)]] تعرف تحرر كام من غير ما تقولها.

[[realloc]] لو فيه مكان فاضي بعد الحجز بتكبّره في مكانه، ولو مفيش بتحجز مكان جديد وتنسخ وتحرر القديم. عشان كده لازم تاخد العنوان اللي رجع. والتكبير بالضعف (مش +1 كل مرة) بيخلي متوسط تكلفة الإضافة ثابت، وده نفس اللي [[std::vector]] بيعمله.

لما البرنامج يخلص، نظام التشغيل بياخد كل ذاكرته. بس في برنامج شغال طول الوقت (سيرفر، لعبة) الـ leak بيتراكم لحد ما الذاكرة تخلص.`,
            when: R`لما الحجم بيتحدد وقت التشغيل، أو كبير على الـ stack، أو الداتا لازم تعيش بعد ما الدالة اللي عملتها تخلص. وفي C++ متستخدمش malloc خالص تقريبًا: [[std::vector]] و [[std::string]] و [[std::make_unique]] بيعملوا الحجز والتحرير لوحدهم.`,
            mistakes: R`[[arr = realloc(arr, ...)]] مباشرة: لو فشلت، arr بقى NULL وضاع عنوان الذاكرة القديمة (leak). ومتتشيّكش على NULL. و [[malloc(n)]] بدل [[malloc(n * sizeof *arr)]]: حجزت n bytes مش n عنصر. و free مرتين، أو استخدام بعد free. والحل البسيط: [[arr = NULL;]] بعد free، لأن [[free(NULL)]] مسموحة ومبتعملش حاجة.`
          },
          lines: [
            "فيها printf.",
            R`فيها [[malloc]] و [[calloc]] و [[realloc]] و [[free]].`,
            "بداية main.",
            "عدد العناصر، ممكن ييجي من اليوزر.",
            R`احجز n × حجم int من الـ heap. [[sizeof *arr]] = حجم اللي arr بيشاور عليه.`,
            R`malloc بترجّع [[NULL]] لو مفيش ذاكرة.`,
            "رسالة على stderr.",
            "اخرج بفشل.",
            "قفلة الـ if.",
            R`نستخدمها زي array عادية: 10 و 20 و 30.`,
            R`كبّر لـ 5 عناصر. النتيجة في متغير جديد عشان لو فشلت منضيّعش arr.`,
            "realloc فشلت.",
            "القديم لسه سليم، فنحرره.",
            "ونخرج.",
            "قفلة الـ if.",
            "نجحت: خد العنوان الجديد (ممكن يكون اتنقل).",
            "العناصر الجديدة فيها زبالة، فنملاها.",
            "العنصر الأخير.",
            "اطبع الخمسة.",
            "سطر جديد.",
            R`[[calloc]]: 4 عناصر متصفّرة.`,
            R`[[!zeros]] = لو NULL.`,
            "متنساش الحجز التاني قبل ما تخرج.",
            "اخرج بفشل.",
            "قفلة الـ if.",
            "calloc بتضمن أصفار.",
            "free لكل حجز.",
            R`وده كمان. ولاحظ إن [[free]] على العنوان اللي رجع من realloc.`,
            "عشان أي استخدام بالغلط بعد كده يبقى NULL واضح.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[10 20 30 40 50 ]]
[[calloc gives zeros: 0 0]]

برنامج الـ array اللي بتكبر مع [[seq 1 100 | ./app]] لازم يطبع [[count=100 sum=5050]].

ولما تمسح الـ free وتعمل compile بـ [[-g -fsanitize=address]]، في آخر التشغيل بيطلع تقرير LeakSanitizer:
[[ERROR: LeakSanitizer: detected memory leaks]]
[[Direct leak of 512 byte(s) in 1 object(s) allocated from:]]
ومعاه السطر اللي اتعمل فيه الحجز. (الـ 512 = سعة 128 × 4 bytes، لأن السعة اتضاعفت 4 ثم 8 ... لحد 128.)`,
          solCode: R`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t count = 0, cap = 4;
    int *nums = malloc(cap * sizeof *nums);
    if (!nums) return 1;
    int x;
    while (scanf("%d", &x) == 1) {
        if (count == cap) {
            cap *= 2;
            int *bigger = realloc(nums, cap * sizeof *nums);
            if (!bigger) {
                free(nums);
                return 1;
            }
            nums = bigger;
        }
        nums[count++] = x;
    }
    long long sum = 0;
    for (size_t i = 0; i < count; i++) sum += nums[i];
    printf("count=%zu sum=%lld\n", count, sum);
    free(nums);
    return 0;
}`
        }
      ]
    },
    {
      t: "struct والملفات والمشاريع والـ debugging",
      l: 1,
      n: "تجمع داتا في struct، وتقرا وتكتب ملفات، وتقسم المشروع لملفات بـ make، وتفهم الـ undefined behavior وتمسكه بـ gdb والـ sanitizers",
      items: [
        {
          cmd: "struct و typedef",
          title: "struct في C: إزاي تجمع كذا متغير في نوع واحد، والفرق بين . و ->",
          desc: R`[[struct]] بيعمل نوع جديد فيه كذا حقل (field)، كل واحد بنوعه، زي طالب ليه اسم وسن ومعدل:
[[struct Student { char name[32]; int age; double gpa; };]]
ومن غير typedef، كل مرة هتكتب [[struct Student s;]].

[[typedef]] بيدّي نوع موجود اسم جديد. [[typedef struct { ... } Student;]] معناها «سمّي الـ struct ده Student»، فتكتب [[Student s;]] على طول.

الوصول للحقول:
• [[s.age]]: النقطة لما يكون عندك المتغير نفسه.
• [[p->age]]: السهم لما يكون عندك pointer للـ struct. هي اختصار لـ [[(*p).age]]: روح للعنوان وبعدين هات الحقل.

حاجات لازم تعرفها:
• [[Student b = a;]] بتنسخ كل الحقول، وحتى الـ array اللي جوه. فـ b نسخة مستقلة.
• الـ struct بيتبعت للدالة بالقيمة (نسخة) زي أي متغير. فلو الدالة لازم تغيّره، أو هو كبير ومش عايز تنسخه، ابعت pointer: [[birthday(&a)]]. ولو هتقرا بس: [[const Student *]].
• تقدر تعمل array من structs: [[Student group[2]]].
• الحجم ممكن يبقى أكبر من مجموع الحقول، لأن الـ compiler بيزوّد bytes فاضية (padding) عشان كل حقل يبدأ في عنوان مناسب لنوعه.`,
          example: R`#include <stdio.h>
#include <string.h>

typedef struct {
    char name[32];
    int age;
    double gpa;
} Student;

void birthday(Student *s) {
    s->age++;
}

int main(void) {
    Student a = {"Sara", 21, 3.4};
    Student b = a;
    strcpy(b.name, "Omar");
    birthday(&a);
    printf("%s %d %.1f\n", a.name, a.age, a.gpa);
    printf("%s %d\n", b.name, b.age);
    Student group[2] = {{"Ali", 20, 2.9}, {"Mona", 22, 3.8}};
    for (int i = 0; i < 2; i++) printf("%s ", group[i].name);
    printf("\nsizeof(Student)=%zu\n", sizeof(Student));
    return 0;
}`,
          try: R`اعمل struct اسمه [[Product]] فيه اسم وسعر وكمية، واعمل array من ٣ منتجات، واكتب دالة [[double total_value(const Product *items, int n)]] ترجّع مجموع (السعر × الكمية). وبعدين جرّب ترتيب حقول [[Student]]: حط [[int age]] الأول وبعده [[double gpa]] وبعده الاسم، والحجم اتغيّر؟`,
          flag: "script",
          deep: {
            why: R`أي داتا حقيقية ليها أكتر من حقل: مستخدم، طلب، نقطة في لعبة، packet في الشبكة. الـ struct بيخليك تتعامل معاها كوحدة واحدة، وهو الأساس اللي الـ class في C++ اتبنت عليه (في C++ الـ struct والـ class تقريبًا نفس الحاجة).`,
            how: R`الحقول بتتخزن ورا بعض بنفس ترتيب كتابتها. الـ [[double]] محتاج يبدأ في عنوان بيقبل القسمة على 8، فبعد [[name]] (32) و [[age]] (4) = 36، الـ compiler بيحط 4 bytes فاضية عشان gpa يبدأ عند 40. فالحجم 48 مش 44.

[[s->age++]]: السهم أولويته أعلى من [[++]]، فهي بتزوّد الحقل مش الـ pointer.

[[{"Sara", 21, 3.4}]] بتملي الحقول بالترتيب. ومن C99 تقدر تسمّيهم: [[{.age = 21, .name = "Sara"}]]، وده أوضح والحقول اللي مكتبتهاش بتبقى صفر.`,
            when: R`كل ما يكون عندك داتا متعلقة ببعض. وابعته لأي دالة بـ pointer ([[const]] لو للقراية) بدل ما تنسخه، خصوصًا لو كبير.`,
            mistakes: R`تستخدم [[.]] مع pointer أو [[->]] مع متغير عادي: الـ compiler بيقولك وغالبًا بيقترح الصح. وتبعت struct بالقيمة لدالة بتعدّله وتستغرب إن الأصل متغيرش. وتنسخ struct فيه pointer وتفتكر إن النسخ عمل نسخة من الداتا اللي الـ pointer بيشاور عليها: النسخ بينسخ العنوان بس (shallow copy). ودي نفس المشكلة اللي C++ حلّتها بالـ copy constructor (rule of 3).`
          },
          lines: [
            "فيها printf.",
            R`فيها [[strcpy]].`,
            R`[[typedef struct]]: نوع جديد من غير اسم، وهنسميه تحت.`,
            "حقل: array حروف للاسم.",
            "حقل: السن.",
            "حقل: المعدل.",
            R`اسم النوع: [[Student]].`,
            R`الدالة بتاخد pointer عشان تعدّل الأصل.`,
            R`[[->]]: الحقل age من الـ struct اللي s بيشاور عليه، وزوّده 1.`,
            "قفلة الدالة.",
            "بداية main.",
            "قيم أولية بنفس ترتيب الحقول.",
            "نسخة كاملة مستقلة، حتى الـ array اللي جوه.",
            R`نغيّر اسم النسخة بس. [[.]] لأن b متغير مش pointer.`,
            "نبعت عنوان a.",
            "a اتغيّرت: السن 22.",
            "b لسه 21، واسمها Omar.",
            "array من structs.",
            R`[[group[i].name]]: العنصر رقم i، وبعدين حقل الاسم.`,
            R`الحجم 48 مش 44 بسبب الـ padding.`,
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[Sara 22 3.4]]
[[Omar 21]]
[[Ali Mona ]]
[[sizeof(Student)=48]]

لو رتبت [[int age; double gpa; char name[32];]] الحجم بيفضل 48 (4 + 4 padding + 8 + 32). ولو [[double gpa; int age; char name[32];]] = 8 + 4 + 32 = 44، وبعدين الـ compiler بيكمّل لـ 48 عشان الـ array من الـ structs كل عنصر فيها يبدأ صح. القاعدة العملية: رتّب الحقول من الأكبر للأصغر لو الحجم يفرق معاك.

[[total_value]]: loop على [[items[i].price * items[i].qty]].`,
          solCode: R`#include <stdio.h>

typedef struct {
    char name[32];
    double price;
    int qty;
} Product;

double total_value(const Product *items, int n) {
    double total = 0;
    for (int i = 0; i < n; i++) total += items[i].price * items[i].qty;
    return total;
}

int main(void) {
    Product items[3] = {{"pen", 5.5, 10}, {"book", 80, 2}, {"bag", 250, 1}};
    printf("total=%.2f\n", total_value(items, 3));
    return 0;
}`
        },
        {
          cmd: "enum و #define و const",
          title: "enum و #define و const: إزاي تسمّي الثوابت، وليه الـ macro محتاج أقواس؟",
          desc: R`الأرقام اللي ملهاش اسم في الكود (magic numbers) صعب تتفهم وصعب تتغير. عندك ٣ طرق تسمّيها:

[[#define MAX_USERS 100]]: أمر للـ preprocessor. قبل الـ compile، أي [[MAX_USERS]] في الكود بيتبدّل بـ [[100]] نصيًا، كأنك عملت find and replace. ملوش نوع، والـ debugger مبيشوفوش.

الـ macro بـ parameters: [[#define SQUARE(x) ((x) * (x))]]. ده برضه تبديل نص، وعشان كده الأقواس مهمة: [[SQUARE_BAD(1 + 2)]] بتتحول لـ [[1 + 2 * 1 + 2]] = 5 مش 9.

[[const int limit = 3;]]: متغير عادي ليه نوع، بس مينفعش يتغير بعد ما تديله قيمة. الـ compiler بيمنعك لو حاولت.

[[enum]]: مجموعة أسماء ليها أرقام صحيحة. [[enum Color { RED, GREEN, BLUE };]] تلقائيًا RED = 0 و GREEN = 1 و BLUE = 2، وتقدر تحدد القيم بنفسك [[BANNED = 9]]. مناسب لأي حاجة ليها حالات محددة: لون، أو حالة طلب، أو اتجاه.

ميزة enum مع switch: لو نسيت حالة، gcc بـ [[-Wall]] بيقولك ([[-Wswitch]]).`,
          example: R`#include <stdio.h>

#define MAX_USERS 100
#define SQUARE_BAD(x) x * x
#define SQUARE(x) ((x) * (x))

enum Color { RED, GREEN, BLUE };
enum Status { ACTIVE = 1, BANNED = 9 };

const char *color_name(enum Color c) {
    switch (c) {
        case RED: return "red";
        case GREEN: return "green";
        case BLUE: return "blue";
    }
    return "unknown";
}

int main(void) {
    const int limit = 3;
    enum Color c = GREEN;
    printf("MAX_USERS=%d limit=%d\n", MAX_USERS, limit);
    printf("c=%d name=%s banned=%d\n", c, color_name(c), BANNED);
    printf("SQUARE_BAD(1 + 2)=%d SQUARE(1 + 2)=%d\n", SQUARE_BAD(1 + 2), SQUARE(1 + 2));
    return 0;
}`,
          try: R`ضيف [[YELLOW]] للـ enum ومتضيفهاش في الـ switch، واعمل compile بـ [[-Wall]]. وبعدين جرّب [[limit = 5;]]. وآخر حاجة: اعمل [[int i = 2;]] واطبع [[SQUARE(i++)]] وشوف [[i]] بقت كام، و gcc قال إيه.`,
          flag: "script",
          deep: {
            why: R`الثوابت المسمّاة بتخلي الكود يتقري ([[if (status == BANNED)]] بدل [[if (status == 9)]])، وتغيّر القيمة من مكان واحد. والـ macros موجودة في كل كود C قديم وجديد، فلازم تعرف مشاكلها.`,
            how: R`الـ preprocessor مبيفهمش C، بيبدّل نص وبس. شوف بنفسك بـ [[gcc -E]]: هتلاقي [[SQUARE_BAD(1 + 2)]] بقت [[1 + 2 * 1 + 2]].

[[SQUARE(i++)]] بتتحول لـ [[((i++) * (i++))]]: i بتزيد مرتين في نفس الجملة، وده undefined behavior. ودي مشكلة مفيش أقواس تحلها، والحل دالة عادية ([[static inline int square(int x)]]).

الـ enum في C مجرد int بأسماء، فـ [[enum Color c = 42;]] بتعدّي. C++ عملت [[enum class]] اللي مبيتحولش لـ int لوحده.

[[#ifndef]] و [[#define]] و [[#endif]] في الـ headers (الدرس بعد الجاي) برضه أوامر preprocessor بتشتغل بنفس الفكرة.`,
            when: R`[[enum]] لأي مجموعة حالات. [[const]] للثوابت العادية (في C++ استخدم [[constexpr]]). و [[#define]] للحاجات اللي محتاجة preprocessor فعلًا: include guards، وثوابت حجم array في C القديم، وكود مختلف حسب النظام ([[#ifdef _WIN32]]).`,
            mistakes: R`macro من غير أقواس حوالين كل parameter وحوالين الناتج. وتحط [[;]] في آخر [[#define]]: [[#define MAX 100;]] بتحط الـ [[;]] في كل مكان. وتبعت حاجة ليها أثر جانبي ([[i++]] أو نداء دالة) لـ macro فتتنفذ مرتين. وتنسى حالة في switch على enum وتتجاهل الـ warning.`
          },
          lines: [
            "فيها printf.",
            R`ثابت بالـ preprocessor: كل MAX_USERS هتبقى 100.`,
            "macro غلط: من غير أقواس.",
            "macro صح: أقواس حوالين x وحوالين الناتج.",
            "enum: RED = 0 و GREEN = 1 و BLUE = 2.",
            "قيم محددة بإيدك.",
            R`دالة بترجّع اسم اللون. [[const char *]] = نص للقراية بس.`,
            "switch على enum.",
            R`[[return]] جوه case بتخرج من الدالة، فمش محتاج break.`,
            "اللون الأخضر.",
            "الأزرق.",
            "قفلة الـ switch.",
            "احتياطي لو جت قيمة مش في الـ enum.",
            "قفلة الدالة.",
            "بداية main.",
            R`[[const]]: مينفعش تتغير.`,
            "متغير من نوع الـ enum.",
            "الـ macro اتبدّل بـ 100 قبل الـ compile.",
            "الـ enum قيمته رقم: GREEN = 1.",
            "5 و 9: الفرق كله في الأقواس.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[MAX_USERS=100 limit=3]]
[[c=1 name=green banned=9]]
[[SQUARE_BAD(1 + 2)=5 SQUARE(1 + 2)=9]]

مع [[YELLOW]] من غير case:
[[warning: enumeration value 'YELLOW' not handled in switch [-Wswitch]]]

[[limit = 5;]]:
[[error: assignment of read-only variable 'limit']]

[[SQUARE(i++)]]: gcc بـ [[-Wall]] بيقول [[operation on 'i' may be undefined [-Wsequence-point]]]. والناتج اللي هتشوفه (غالبًا 6 و i بقت 4) مش مضمون، ممكن يختلف مع compiler أو optimization تاني.`
        },
        {
          cmd: "file I/O في C",
          title: "إزاي تكتب في ملف وتقرا منه سطر سطر في C (fopen و fprintf و fgets و fclose)؟",
          desc: R`الملفات في C بتتعامل معاها عن طريق [[FILE *]]: pointer لـ struct بتديره المكتبة، وانت مش محتاج تعرف جواه إيه.

• [[fopen(path, mode)]]: بتفتح الملف وترجّع [[FILE *]]، أو [[NULL]] لو فشلت (الملف مش موجود، أو مفيش صلاحية). الـ modes: [["r"]] قراية، و [["w"]] كتابة (بتمسح القديم أو تعمل ملف جديد)، و [["a"]] إضافة في الآخر. ولو ملف binary زوّد [[b]]: [["rb"]].
• [[fprintf(f, ...)]]: زي printf بالظبط بس بتكتب في الملف.
• [[fgets(buf, size, f)]]: بتقرا سطر كامل (لحد [[\n]]) أو لحد size - 1 حرف، وبتحط [[\0]] في الآخر. بترجّع [[NULL]] لما الملف يخلص. ودي الطريقة الآمنة لقراية أي input نصي.
• [[fclose(f)]]: بتقفل الملف. لازم، لأن الكتابة بتتجمع في buffer في الذاكرة، ومش بتتكتب على الديسك فعلًا غير لما الـ buffer يتملي أو تقفل.
• [[perror("msg")]]: بتطبع رسالتك وبعدها سبب آخر خطأ من النظام، زي [[No such file or directory]].

[[fgets]] بتسيب الـ [[\n]] في آخر السطر. [[strcspn(line, "\n")]] بترجّع مكان أول [[\n]] (أو طول النص لو مفيش)، فـ [[line[strcspn(line, "\n")] = '\0';]] بتشيله.

[[stdin]] و [[stdout]] و [[stderr]] نفسهم [[FILE *]] جاهزين، فـ [[fgets(buf, sizeof buf, stdin)]] بتقرا سطر من الكيبورد.`,
          example: R`#include <stdio.h>
#include <string.h>

int main(void) {
    FILE *out = fopen("notes.txt", "w");
    if (out == NULL) {
        perror("fopen notes.txt");
        return 1;
    }
    fprintf(out, "buy milk\n");
    fprintf(out, "study pointers\n");
    fclose(out);

    FILE *in = fopen("notes.txt", "r");
    if (in == NULL) {
        perror("fopen notes.txt");
        return 1;
    }
    char line[128];
    int n = 0;
    while (fgets(line, sizeof line, in) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        printf("%d: %s\n", ++n, line);
    }
    fclose(in);
    return 0;
}`,
          try: R`غيّر [["w"]] لـ [["a"]] وشغّل البرنامج ٣ مرات: الملف بقى فيه كام سطر؟ وغيّر اسم ملف القراية لـ [[missing.txt]] وشوف رسالة perror. وبعدين اكتب برنامج [[mywc]] بياخد اسم ملف من [[argv[1]]] ويطبع عدد السطور والكلمات والحروف (زي أمر [[wc]]).`,
          flag: "script",
          deep: {
            why: "أي برنامج حقيقي بيقرا config أو بيحفظ داتا أو بيكتب logs. وطريقة الـ FILE * و fgets هي نفسها اللي هتلاقيها في كود C في كل حتة، و C++ بنت عليها ifstream و ofstream.",
            how: R`الـ [[FILE]] جواه buffer: [[fprintf]] بتكتب في الذاكرة، والمكتبة بتبعت للنظام لما الـ buffer يتملي أو تعمل [[fflush]] أو [[fclose]]. عشان كده لو البرنامج وقع قبل fclose ممكن آخر كلام ميتكتبش.

[[sizeof line]] من غير أقواس مسموحة مع متغير (مع نوع لازم أقواس: [[sizeof(int)]]).

على Windows الـ mode النصي بيحوّل [[\n]] لـ [[\r\n]] وهو بيكتب ويرجّعها وهو بيقرا، والـ [["b"]] بتلغي التحويل ده. على Linux مفيش فرق.`,
            when: R`[[fgets]] لأي قراية نصية سطر سطر (حتى من الكيبورد بدل scanf). [[fread]] و [[fwrite]] للملفات الـ binary. ولو هتعمل parsing جامد (CSV أو JSON) استخدم مكتبة.`,
            mistakes: R`متتشيّكش إن fopen رجّعت NULL، فأول fprintf توقع البرنامج. وتنسى fclose: ممكن الداتا متتكتبش، والبرنامج يخلص الـ file handles لو بيفتح ملفات كتير. وتفتح بـ [["w"]] ملف كنت عايز تضيف عليه فيتمسح. وتستخدم [[while (!feof(f))]] كشرط للـ loop: بتلف لفة زيادة. الصح تتشيّك على اللي fgets رجّعته.`
          },
          lines: [
            "فيها FILE و fopen و fprintf و fgets.",
            R`فيها [[strcspn]].`,
            "بداية main.",
            R`افتح للكتابة. [["w"]] بتمسح أي محتوى قديم.`,
            "لو الفتح فشل.",
            "اطبع السبب من النظام.",
            "اخرج بفشل.",
            "قفلة الـ if.",
            "اكتب سطر في الملف.",
            "سطر تاني.",
            "اقفل: الكلام بيتكتب على الديسك فعلًا هنا.",
            R`افتح نفس الملف للقراية.`,
            "لو فشل.",
            "السبب.",
            "خروج.",
            "قفلة الـ if.",
            "buffer للسطر.",
            "عدّاد السطور.",
            R`اقرا سطر سطر لحد ما [[fgets]] ترجّع NULL (الملف خلص).`,
            R`شيل الـ [[\n]] من آخر السطر.`,
            R`[[++n]] بتزوّد الأول وبعدين تطبع: 1 ثم 2.`,
            "قفلة الـ while.",
            "اقفل ملف القراية.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[1: buy milk]]
[[2: study pointers]]

مع [["a"]] الملف بيكبر ٢ سطر كل تشغيل، فبعد ٣ مرات فيه ٦ سطور، والبرنامج بيطبعهم كلهم.

مع [[missing.txt]]:
[[fopen missing.txt: No such file or directory]]

[[mywc]]: لف بـ [[fgetc]] حرف حرف: زوّد الحروف كل مرة، والسطور لما تقابل [[\n]]، والكلمات لما تقابل حرف مش مسافة بعد مسافة. قارن ناتجك بـ [[wc file.txt]].`,
          solCode: R`#include <ctype.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "usage: %s FILE\n", argv[0]);
        return 1;
    }
    FILE *f = fopen(argv[1], "r");
    if (!f) {
        perror(argv[1]);
        return 1;
    }
    long lines = 0, words = 0, chars = 0;
    int c, in_word = 0;
    while ((c = fgetc(f)) != EOF) {
        chars++;
        if (c == '\n') lines++;
        if (isspace(c)) in_word = 0;
        else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    fclose(f);
    printf("%ld %ld %ld %s\n", lines, words, chars, argv[1]);
    return 0;
}`
        },
        {
          cmd: "أكتر من ملف و make",
          title: "إزاي تقسم برنامج C على أكتر من ملف (.h و .c)، وتعمله build بـ make؟",
          desc: R`لما البرنامج يكبر بتقسمه:
• ملف header ([[.h]]): فيه الـ prototypes والـ structs والثوابت، يعني «إيه اللي الملف ده بيقدّمه».
• ملف source ([[.c]]): فيه جسم الدوال نفسها.
• أي ملف عايز يستخدم الدوال دي بيعمل [[#include "math_utils.h"]]. علامات التنصيص [[" "]] (بدل [[< >]]) معناها «دوّر في فولدر المشروع الأول».

include guard: لو الـ header اتعمله include مرتين (ملف بيعمل include لملف بيعمل include لنفس الـ header)، التعريفات هتتكرر والـ compiler يزعّق. الحل ٣ سطور:
• [[#ifndef MATH_UTILS_H]]: لو الاسم ده مش متعرّف...
• [[#define MATH_UTILS_H]]: عرّفه، وكمّل الملف.
• [[#endif]]: آخر الملف.
تاني مرة الاسم هيبقى متعرّف، فالملف كله هيتنط. وفيه بديل أقصر بتدعمه كل الـ compilers المشهورة: [[#pragma once]] في أول الملف.

الـ build: كل [[.c]] بيتعمله compile لوحده لـ [[.o]]، وبعدين link:
[[gcc -c main.c]] و [[gcc -c math_utils.c]] و [[gcc main.o math_utils.o -o app]]
أو مرة واحدة: [[gcc main.c math_utils.c -o app]].

[[make]] بيعمل ده لوحده من ملف اسمه [[Makefile]]، وبيعيد بس الملفات اللي اتغيّرت. كل قاعدة شكلها:
[[target: dependencies]]
وتحتها الأمر، والسطر ده لازم يبدأ بـ Tab حقيقي مش مسافات.`,
          example: R`// ===== math_utils.h =====
#ifndef MATH_UTILS_H
#define MATH_UTILS_H
int add(int a, int b);
int clamp(int x, int lo, int hi);
#endif
// ===== math_utils.c =====
#include "math_utils.h"
int add(int a, int b) { return a + b; }
int clamp(int x, int lo, int hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}
// ===== main.c =====
#include <stdio.h>
#include "math_utils.h"
int main(void) {
    printf("%d %d\n", add(2, 3), clamp(150, 0, 100));
    return 0;
}`,
          try: R`اعمل الـ ٣ ملفات في فولدر واحد واعمل build بأمر gcc واحد. وبعدين اكتب [[Makefile]] فيه قاعدة لـ app وقاعدة لكل [[.o]] وقاعدة [[clean]]، وشغّل [[make]] مرتين: التانية عملت إيه؟ وبعدين اعمل [[touch math_utils.c]] و [[make]]. وآخر حاجة: اعمل build من غير [[math_utils.c]] في الأمر: الخطأ ده compile ولا link؟`,
          flag: "script",
          deep: {
            why: R`مفيش مشروع حقيقي في ملف واحد. والتقسيم ده بيخلّي الـ build أسرع (بتعيد compile للي اتغيّر بس)، وبيفصل «الواجهة» (الـ header) عن «التنفيذ» (الـ .c)، وده نفس شكل أي مكتبة C بتستخدمها.`,
            how: R`[[#include]] بتنسخ الـ header جوه كل ملف [[.c]] بيطلبه. فالـ prototypes بتوصل لكل ملف، بس جسم الدالة موجود في ملف واحد بس ([[math_utils.o]])، والـ linker هو اللي بيوصّل النداء بالتعريف. لو جسم الدالة في الـ header، وملفين عملوا include ليه، الـ linker هيلاقي الدالة مرتين: [[multiple definition of $__btadd']].

[[make]] بيقارن وقت تعديل الملف بوقت تعديل الـ dependencies بتاعته. لو أي dependency أحدث، بيعيد الأمر. عشان كده [[main.o]] لازم يعتمد على [[math_utils.h]] كمان: لو غيّرت الـ header لازم main.c يتعمله compile تاني.

[[$(CC)]] و [[$(CFLAGS)]] متغيرات في الـ Makefile، و [[.PHONY: clean]] معناها إن clean مش اسم ملف.`,
            when: R`أول ما البرنامج يعدّي كام مية سطر، أو فيه جزء ممكن يتستخدم في برنامج تاني. make كويس للمشاريع الصغيرة وموجود في كل حتة. للمشاريع الأكبر أو اللي لازم تشتغل على Windows كمان، CMake (المستوى ٢).`,
            mistakes: R`تحط جسم دالة (مش prototype) في الـ header. وتنسى الـ include guard. وتعمل [[#include "math_utils.c"]]: بتعمل include لملفات [[.h]] بس. ومسافات بدل Tab في الـ Makefile: [[missing separator]]. وتنسى ملف في أمر الـ link: [[undefined reference to $__btclamp']].`
          },
          lines: [
            R`[[#ifndef]]: لو الاسم ده لسه متعرّفش (أول مرة الملف يتقري)...`,
            R`[[#define]]: عرّفه، عشان تاني مرة الملف يتنط.`,
            "prototype: الملفات التانية تعرف شكل add.",
            "prototype لـ clamp.",
            R`[[#endif]]: قفلة الـ [[#ifndef]].`,
            R`الـ .c بيعمل include للـ header بتاعه، عشان الـ compiler يتأكد إن التعريف زي الـ prototype.`,
            "جسم add في سطر واحد.",
            "جسم clamp.",
            "لو أقل من الحد الأدنى رجّع الحد.",
            "لو أكبر من الأعلى رجّع الأعلى.",
            "غير كده رجّعه زي ما هو.",
            "قفلة clamp.",
            R`[[< >]]: header من النظام.`,
            R`[[" "]]: header من المشروع.`,
            "main.",
            "بتنادي الدوال اللي متعرّفة في ملف تاني.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`[[gcc -std=c17 -Wall -Wextra main.c math_utils.c -o app && ./app]] بيطبع [[5 100]].

أول [[make]] بيعمل compile للملفين و link. التانية بتقول [[make: 'app' is up to date.]]. وبعد [[touch math_utils.c]]، make بيعيد compile لـ math_utils.c بس، وبعدين link.

من غير [[math_utils.c]]: ده خطأ link، لأن main.c نفسه اتعمله compile تمام (الـ prototype موجود):
[[undefined reference to $__btadd']]
[[collect2: error: ld returned 1 exit status]]
([[ld]] هو الـ linker.)

الـ Makefile (السطور اللي تحت كل قاعدة لازم تبدأ بـ Tab):`,
          solCode: R`CC = gcc
CFLAGS = -std=c17 -Wall -Wextra -g

app: main.o math_utils.o
	$(CC) $(CFLAGS) main.o math_utils.o -o app

main.o: main.c math_utils.h
	$(CC) $(CFLAGS) -c main.c

math_utils.o: math_utils.c math_utils.h
	$(CC) $(CFLAGS) -c math_utils.c

clean:
	rm -f *.o app

.PHONY: clean`
        },
        {
          cmd: "undefined behavior",
          title: "يعني إيه undefined behavior، وليه البرنامج الغلط ممكن يشتغل عادي؟ (segfault و buffer overflow و use after free)",
          desc: R`معيار C (و C++) فيه حاجات بيقول عليها «undefined behavior» (UB): لو حصلت، اللغة مش ملزمة بأي نتيجة. البرنامج ممكن يقع، أو يطلّع رقم غلط، أو يشتغل عادي خالص، أو يتصرف كويس على جهازك ويقع عند العميل. والـ compiler مسموحله يفترض إن الـ UB عمره ما هيحصل، ويعمل optimization على الأساس ده.

أشهرهم:
• القراية أو الكتابة بره حدود array (buffer overflow).
• [[*]] على [[NULL]] أو على pointer ملوش قيمة.
• استخدام ذاكرة بعد [[free]] (use after free)، أو free مرتين.
• متغير محلي بتقرا قيمته قبل ما تديله قيمة.
• overflow في [[int]] (signed). في unsigned مش UB، بيلف.
• القسمة على صفر في الأرقام الصحيحة.
• تغيير متغير مرتين في نفس الجملة ([[i = i++]]).

segmentation fault (segfault): نظام التشغيل بيقفل البرنامج لأنه لمس ذاكرة مش بتاعته. ده أحسن نتيجة ممكنة للـ UB، لأنه بيقولك فيه مشكلة. الأسوأ إن البرنامج يكمّل بداتا بايظة.

المثال برنامج فيه ٤ أخطاء، بتختار واحد منهم برقم من الترمنال. [[atoi]] بتحوّل نص لرقم ([["2"]] لـ 2).`,
          example: R`#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int main(int argc, char *argv[]) {
    int which = argc > 1 ? atoi(argv[1]) : 0;
    int arr[3] = {1, 2, 3};
    int *p = NULL;
    char *name = malloc(8);
    int big = INT_MAX;
    if (which == 1) printf("arr[3] = %d\n", arr[which + 2]);
    if (which == 2) *p = 42;
    if (which == 3) {
        free(name);
        name[0] = 'X';
        return 0;
    }
    if (which == 4) printf("INT_MAX + 4 = %d\n", big + which);
    printf("done (case %d)\n", which);
    free(name);
    return 0;
}`,
          try: R`اعمل compile بـ [[gcc -std=c17 -Wall -Wextra -g ub.c -o ub]] واقرا الـ warning. وبعدين شغّل [[./ub 1]] و [[./ub 2]] و [[./ub 3]] و [[./ub 4]]، وبعد كل واحد [[echo $?]]. مين وقع ومين كمّل عادي؟ وبعدين اعمل compile تاني بـ [[-O2]] وشغّل [[./ub 1]]: نفس الرقم؟ (احتفظ بالملف ده للدرس الجاي).`,
          flag: "script",
          deep: {
            why: R`ده أهم فرق بين C/C++ واللغات اللي بتحميك. في Python لو قريت بره الـ list بيطلع [[IndexError]] على طول. في C البرنامج بيكمّل، والغلط ممكن يبان بعد ساعات في مكان تاني، أو ميبانش غير لما حد يستغله. أغلب الثغرات الأمنية الكبيرة في برامج C و C++ (زي Heartbleed في OpenSSL سنة ٢٠١٤) أخطاء ذاكرة من النوع ده.`,
            how: R`ليه اللغة بتسيبها undefined بدل ما تمنعها؟ عشان المنع بيكلّف: فحص حدود في كل وصول لـ array، وفحص overflow في كل جمع. C اختارت السرعة وسابت المسؤولية للمبرمج.

والـ compiler بيستغل ده: لو كتبت [[if (x + 1 < x)]] عشان تمسك الـ overflow، الـ compiler ممكن يشيل الشرط خالص، لأن x + 1 في int «مينفعش» يبقى أقل من x من غير UB. عشان كده النتايج بتتغير بين [[-O0]] و [[-O2]].

case 1 هنا بيقرا الـ int اللي بعد الـ array في الـ stack بالصدفة (ممكن يكون big أو أي حاجة). case 2 segfault. case 3 غالبًا بيعدّي بهدوء، لأن الذاكرة المحررة لسه مع البرنامج. case 4 بيلف لسالب على x86 في الغالب، بس ده مش مضمون.`,
            when: R`في كل سطر C و C++ بتكتبه. والدفاع: [[-Wall -Wextra]] دايمًا، والـ sanitizers وانت بتجرّب (الدرس الجاي)، وفحص الحدود والـ NULL بنفسك، وفي C++ استخدام [[std::vector]] و [[std::string]] و smart pointers بدل الـ pointers الخام.`,
            mistakes: R`تفتكر إن «البرنامج اشتغل» معناها إنه صح. وتقول «على جهازي شغال». وتحاول تمسك signed overflow بعد ما يحصل بدل ما تمنعه قبلها ([[if (a > INT_MAX - b)]]). وتعتمد على قيمة متغير ملوش قيمة أولية لأنها «طلعت صفر» مرة.`
          },
          lines: [
            "فيها printf.",
            R`فيها [[atoi]] و [[malloc]] و [[free]].`,
            R`فيها [[INT_MAX]].`,
            "main بـ arguments.",
            R`الرقم من الترمنال، و 0 لو مفيش. [[atoi]] بتحوّل النص لرقم.`,
            "array من ٣: الـ indexes المسموحة 0 و 1 و 2.",
            "pointer مش بيشاور على حاجة.",
            "8 bytes على الـ heap.",
            "أكبر int.",
            "case 1: index 3 بره الـ array (buffer overflow في القراية).",
            R`case 2: [[*]] على NULL.`,
            "case 3.",
            "حرر الذاكرة...",
            "...واكتب فيها بعد كده (use after free).",
            "اخرج (عشان متعملش free تاني).",
            "قفلة.",
            "case 4: signed overflow.",
            "لو وصلنا هنا يبقى البرنامج كمّل.",
            "free عادية.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الـ warning وقت الـ compile (gcc 14 لقى case 3 لوحده):
[[warning: pointer 'name' used after 'free' [-Wuse-after-free]]]

اللي حصل عندي (gcc 14، Linux، [[-O0]]):
• [[./ub 1]]: طبع [[arr[3] = 2147483647]] (قرا big اللي جنب الـ array بالصدفة) و [[done (case 1)]]، و exit code 0. البرنامج «اشتغل».
• [[./ub 2]]: [[Segmentation fault (core dumped)]] و exit code 139 (128 + رقم الإشارة SIGSEGV اللي هو 11).
• [[./ub 3]]: ولا حاجة، exit code 0. كتب في ذاكرة محررة ومحدش اشتكى.
• [[./ub 4]]: [[INT_MAX + 4 = -2147483645]] و done.

بـ [[-O2]]، [[./ub 1]] طبع رقم تاني خالص (عندي [[-2007785912]]). نفس الكود، رقم مختلف: ده الـ UB. الأرقام عندك ممكن تختلف، والمهم إن ٣ من الـ ٤ أخطاء عدّوا من غير crash.`
        },
        {
          cmd: "gdb و sanitizers",
          title: "إزاي تعرف البرنامج وقع فين بـ gdb، وتمسك أخطاء الذاكرة بـ -fsanitize=address؟",
          desc: R`أداتين لازم تتعلمهم بدري:

١. gdb (الـ debugger): بيشغّل برنامجك تحت المراقبة. لو وقع، بيوقف عند السطر اللي وقع فيه ويوريك المتغيرات. ولازم تعمل compile بـ [[-g]] (عشان يعرف أرقام السطور والأسماء) و [[-O0]] (عشان المتغيرات متتشالش).

أهم أوامره:
• [[run]] (أو [[r]]): شغّل. و [[gdb --args ./app 2]] بتدّيله الـ arguments.
• [[bt]] (backtrace): مين نادى مين لحد السطر اللي وقع فيه.
• [[print x]] (أو [[p x]]): قيمة متغير. و [[info locals]]: كل المتغيرات المحلية.
• [[break file.c:12]] (أو [[b]]): وقّف عند سطر معيّن قبل ما يتنفذ. و [[next]] ([[n]]): السطر اللي بعده. و [[step]] ([[s]]): ادخل جوه الدالة. و [[continue]] ([[c]]): كمّل.
• [[quit]]: اخرج.
على الماك الـ debugger اسمه [[lldb]] وأوامره قريبة، وفي VS Code الاتنين بيشتغلوا من زرار Run and Debug.

٢. الـ sanitizers: الـ compiler بيحط فحوصات جوه البرنامج نفسه وقت التشغيل. [[-fsanitize=address]] (ASan) بيمسك الكتابة والقراية بره الحدود، والـ use after free، والـ leaks على Linux. و [[-fsanitize=undefined]] (UBSan) بيمسك signed overflow والقسمة على صفر وحاجات تانية. البرنامج بيبقى أبطأ (حوالي الضعف مع ASan)، فده للتطوير والـ tests بس.

الفرق المهم: من غيرهم، الـ UB ممكن ميبانش (زي case 1 و 3 في الدرس اللي فات). معاهم، البرنامج بيقف عند أول غلط ويقولك السطر بالظبط.`,
          example: R`# compile بمعلومات للـ debugger ومن غير optimization
gcc -std=c17 -Wall -Wextra -g -O0 ub.c -o ub
gdb --args ./ub 2
(gdb) run
(gdb) bt
(gdb) print p
(gdb) info locals
(gdb) quit
# نفس الملف مع ASan و UBSan
gcc -std=c17 -g -fsanitize=address,undefined ub.c -o ub_asan
./ub_asan 1
./ub_asan 3
./ub_asan 4`,
          try: R`استخدم ملف [[ub.c]] من الدرس اللي فات. اعمل الخطوات دي واقرا كل ناتج. وبعدين في gdb جرّب [[break ub.c:11]] قبل [[run]]، وبعدين [[print arr]] و [[print which]] و [[next]]. وآخر حاجة: شغّل برنامج الـ realloc من درس malloc بعد ما تمسح الـ free، بـ [[-fsanitize=address]].`,
          deep: {
            why: R`من غير debugger هتقعد تحط [[printf]] في كل حتة عشان تعرف وقع فين. ومن غير sanitizers أخطاء الذاكرة اللي مش بتوقع البرنامج هتفضل مستخبية لحد ما تظهر في مكان تاني. الأداتين دول بيوفّروا ساعات، وبيخلّوا الـ UB اللي في الدرس اللي فات يبان على طول.`,
            how: R`[[-g]] بيحط جدول جوه الملف التنفيذي يربط كل عنوان في الكود بالسطر والملف، وده اللي gdb بيقراه. ASan بيحجز مساحات «ممنوعة» (redzones) حوالين كل array وكل malloc، ويعلّم الذاكرة المحررة إنها ممنوعة لفترة، وبيحط فحص قبل كل قراية وكتابة. لو لمست مساحة ممنوعة بيوقف ويطبع: نوع الغلط، والسطر، ومين حجز الذاكرة دي ومين حررها.

ASan و UBSan متاحين في gcc و clang على Linux و Mac، و ASan في MSVC كمان ([[/fsanitize=address]]). الـ leak detection جزء من ASan على Linux، وعلى الماك مش متاح افتراضيًا.`,
            when: R`gdb لما البرنامج يقع أو يطلّع ناتج غلط ومش فاهم ليه. الـ sanitizers طول ما انت بتطوّر وفي الـ tests: اعمل لنفسك أمر build بيهم واستخدمه على طول. ولو برنامج مالتي threads، فيه [[-fsanitize=thread]] (المستوى ٣).`,
            mistakes: R`تعمل debug لنسخة متعملها compile بـ [[-O2]] من غير [[-g]]: مفيش أرقام سطور والمتغيرات «optimized out». وتشغّل الـ sanitizers مع [[valgrind]] في نفس الوقت (مينفعش). وتسلّم نسخة فيها [[-fsanitize]]: أبطأ، ومش معمولة للإنتاج. وتتجاهل أول error وتدوّر على اللي بعده: أول واحد غالبًا هو السبب.`
          },
          lines: [
            R`[[-g]] لأرقام السطور، و [[-O0]] عشان المتغيرات متتشالش.`,
            R`افتح البرنامج في gdb، و [[--args]] بتدّيله argument 2.`,
            "جوه gdb: شغّل. هيقف عند الـ segfault.",
            R`[[bt]]: إحنا فين ومين نادانا.`,
            "قيمة p: هتلاقيه 0x0 يعني NULL.",
            "كل المتغيرات المحلية مرة واحدة.",
            "اخرج من gdb.",
            R`compile مع ASan و UBSan. البرنامج هيبقى أبطأ وأكبر.`,
            "case 1: القراية بره الـ array.",
            "case 3: use after free.",
            "case 4: signed overflow."
          ],
          sol: R`gdb مع case 2:
[[Program received signal SIGSEGV, Segmentation fault.]]
[[0x00000000004011e7 in main (argc=2, argv=0x7fffffffdad8) at ub.c:12]]
[[12	    if (which == 2) *p = 42;]]
و [[print p]] بيطبع [[(int *) 0x0]]، و [[info locals]] بيطبع [[which = 2]] و [[arr = {1, 2, 3}]] و [[p = 0x0]] والباقي.

مع الـ sanitizers (مختصر):
[[./ub_asan 1]]:
[[ub.c:11:48: runtime error: index 3 out of bounds for type 'int [3]']]
[[ERROR: AddressSanitizer: stack-buffer-overflow ... READ of size 4]]
[[#0 0x40153d in main /src/ub.c:11]]

[[./ub_asan 3]]:
[[ERROR: AddressSanitizer: heap-use-after-free ... WRITE of size 1]]
وتحتها «freed by thread T0 here» بالسطر 14 اللي عمل free.

[[./ub_asan 4]]:
[[ub.c:18:21: runtime error: signed integer overflow: 2147483647 + 4 cannot be represented in type 'int']]

الأخطاء اللي كانت بتعدّي بهدوء بقت بتقف عند السطر بالظبط. وبرنامج الـ realloc من غير free بيطلّع [[ERROR: LeakSanitizer: detected memory leaks]].`
        }
      ]
    },
    {
      t: "من C لـ C++",
      l: 2,
      n: "نفس قوة C بأدوات أأمن: std::cout و std::string و namespaces، والـ references بدل الـ pointers في أغلب الأماكن، و overloading",
      items: [
        {
          cmd: "مقدمة C++ والفرق عن C",
          title: "أول برنامج C++: iostream و std::cout و std::cin و std::string، و :: و << و >> معناهم إيه؟",
          desc: R`C++ بدأت في الثمانينات كـ «C مع classes»، ودلوقتي لغة كبيرة بإصدار جديد كل ٣ سنين (C++11 و 14 و 17 و 20 و 23). أغلب كود C بيتعمله compile كـ C++، بس الـ C++ الحديثة بتتكتب بشكل مختلف: بدل الـ arrays والـ char arrays و malloc بتستخدم أنواع جاهزة بتدير ذاكرتها لوحدها.

حاجات جديدة في أول برنامج:
• [[#include <iostream>]]: مكتبة الإدخال والإخراج بتاعة C++. الـ headers القياسية في C++ ملهاش [[.h]].
• [[std::]]: كل حاجة في المكتبة القياسية جوه namespace اسمه [[std]]. الـ namespace زي «اسم العيلة» عشان الأسماء متتخبطش. و [[::]] (اسمها scope resolution) معناها «من جوه»: [[std::cout]] = cout اللي جوه std.
• [[std::cout << x]]: اطبع x. [[<<]] هنا مش زق bits، دي «ابعت لـ». وتقدر تسلسلها: [[std::cout << "a" << 5 << '\n';]].
• [[std::cin >> x]]: اقرا في x، من غير [[&]] ومن غير format specifiers: النوع بيتعرف لوحده.
• [[std::string]]: نص بجد. بيكبر لوحده، و [[+]] بتلزق، و [[==]] بتقارن الحروف، و [[.size()]] الطول. مفيش [[\0]] تقلق منها ولا buffer overflow.
• [[namespace shop { ... }]]: تعمل namespace بتاعك، وتنادي اللي جواه بـ [[shop::with_tax]].

وفي C++ مش لازم تكتب [[void]] في [[main()]]، و [[main]] لو خلصت من غير return بترجّع 0.

بتعمل compile بـ [[g++]] بدل [[gcc]]، وبتحدد الإصدار: [[g++ -std=c++20 -Wall -Wextra main.cpp -o app]].`,
          example: R`#include <iostream>
#include <string>

namespace shop {
double with_tax(double price) { return price * 1.14; }
}

int main() {
    std::string name;
    int qty = 0;
    std::cout << "name and quantity: ";
    std::cin >> name >> qty;
    std::string msg = "Hi " + name + "!";
    std::cout << msg << " length=" << msg.size() << '\n';
    std::cout << "total: " << shop::with_tax(100.0) * qty << '\n';
    return 0;
}`,
          try: R`شغّله واكتب [[Sara 2]]. وبعدين جرّب تقرا سطر كامل فيه مسافات بـ [[std::getline(std::cin, name);]] بدل [[std::cin >> name]]. وجرّب [[std::string a = "10"; std::cout << a + a;]] و [[std::stoi(a) + std::stoi(a)]]: إيه الفرق؟`,
          flag: "script",
          deep: {
            why: R`C++ هي لغة محركات الألعاب (Unreal) والمتصفحات (Chrome و Firefox) وقواعد البيانات (MySQL و MongoDB) والتداول السريع والـ embedded الأكبر، وجزء كبير من مكتبات الـ AI من جوه (PyTorch و TensorFlow مكتوبين بـ C++ تحت Python). وبتدّيك سرعة C مع أدوات بتقلل أخطاء الذاكرة لو استخدمتها صح.`,
            how: R`[[std::cout]] object من نوع [[std::ostream]]، والـ [[<<]] دالة متعرّفة ليه (operator overloading، ليها درس). كل [[<<]] بترجّع الـ stream نفسه، فتقدر تكمّل [[<<]] بعدها. وده سبب إن السلسلة شغالة.

[[std::string]] جواه pointer لحروف على الـ heap (أو جوه الـ object نفسه لو النص قصير)، وطول، وسعة. لما بيتمسح بيحرر الذاكرة لوحده (RAII، ليها درس).

[[std::endl]] بتنزل سطر وكمان بتعمل flush للـ buffer، وده أبطأ لو بتطبع كتير. [['\n']] بتنزل سطر بس، فاستخدمها إلا لو محتاج flush.

[[using namespace std;]] بتخليك تكتب [[cout]] من غير [[std::]]. مقبولة في ملف [[.cpp]] صغير أو مسابقة، بس متحطهاش في header أبدًا: كل اللي هيعمل include للـ header هيورثها، والأسماء هتتخبط.`,
            when: R`لما محتاج سرعة وتحكم في الذاكرة بس عايز أدوات أعلى من C: ألعاب، وأنظمة، و desktop apps (Qt)، ومكتبات سريعة. ولو مشروع C قديم، ممكن تدخل C++ فيه تدريجيًا.`,
            mistakes: R`تعمل compile لكود C++ بـ [[gcc]] بدل [[g++]]: خطأ link بأسماء غريبة لأن مكتبة C++ متربطتش. وتكتب [[std::cin >> name]] وتفتكر إنها هتقرا اسم فيه مسافة: بتقف عند أول مسافة. وتخلط [[cin >>]] مع [[getline]]: الـ Enter اللي بعد الرقم بيفضل، فـ getline اللي بعدها بترجع سطر فاضي. والحل [[std::cin >> std::ws]] قبل getline.`
          },
          lines: [
            R`[[iostream]]: فيها [[std::cout]] و [[std::cin]].`,
            R`[[string]]: فيها [[std::string]].`,
            R`[[namespace]] بتاعنا اسمه shop.`,
            "دالة جوه الـ namespace.",
            "قفلة الـ namespace.",
            R`[[main()]] في C++ من غير void.`,
            R`نص فاضي بيكبر لوحده.`,
            "رقم بقيمة أولية.",
            R`[[<<]] = ابعت النص ده لـ cout (الشاشة).`,
            R`[[>>]] = اقرا من cin في name وبعدين في qty. النوع بيتعرف لوحده.`,
            R`[[+]] بتلزق النصوص، والنتيجة string جديد.`,
            R`سلسلة [[<<]]، و [[.size()]] الطول، و [['\n']] سطر جديد.`,
            R`[[shop::with_tax]] = with_tax اللي جوه shop.`,
            "نجاح.",
            "قفلة main."
          ],
          sol: R`مع [[Sara 2]]:
[[name and quantity: Hi Sara! length=8]]
[[total: 228]]
([[228]] من غير كسور لأن cout بيطبع لحد ٦ أرقام مهمة افتراضيًا.)

[[a + a]] بتطبع [[1010]] (لزق نصوص)، و [[std::stoi(a) + std::stoi(a)]] بتطبع [[20]] (std::stoi بتحوّل نص لـ int).

مع [[std::getline(std::cin, name)]] الاسم ممكن يبقى «Sara Ahmed» كله.`
        },
        {
          cmd: "references",
          title: "الـ reference (int &) في C++: اسم تاني لنفس المتغير، وإمتى تستخدمه بدل الـ pointer؟",
          desc: R`الـ reference اسم تاني (alias) لمتغير موجود. [[int &alias = s;]] معناها «alias هو s نفسه». أي حاجة تعملها في alias بتحصل في s، ومفيش نسخة.

نفس الرمز [[&]] بقى ليه ٣ معاني، والمكان هو اللي بيفرق:
• في تعريف نوع: [[int &r = x;]] = r reference لـ x.
• قبل متغير في expression: [[&x]] = عنوان x (زي C).
• بين قيمتين: [[a & b]] = AND على الـ bits.

ليه references؟ عشان تبعت حاجة لدالة من غير ما تتنسخ، أو عشان الدالة تغيّرها، من غير نجوم:
• [[void add_bonus(int &salary)]]: الدالة بتغيّر المتغير الأصلي. والنداء [[add_bonus(s)]] عادي من غير [[&]].
• [[int total(const std::vector<int> &v)]]: الـ vector مش بيتنسخ (ممكن يكون مليون عنصر)، و [[const]] بتمنع الدالة تغيّره. ده أشهر شكل parameter في C++: [[const T &]].

الفرق بين reference و pointer:
• الـ reference لازم يتربط بمتغير أول ما يتعرّف، ومينفعش يبقى فاضي (مفيش null reference).
• مينفعش تغيّره يشاور على متغير تاني بعد كده.
• مش محتاج [[*]] ولا [[->]].
• الـ pointer ممكن يبقى [[nullptr]] (الـ NULL بتاعة C++) وممكن يتغيّر. فاستخدمه لما «مفيش قيمة» حالة طبيعية.

[[std::vector<int>]]: array بتكبر لوحدها، وليها درس. الأقواس [[< >]] هنا معناها «vector من int» (template، ليها درس). و [[for (int x : v)]] معناها «لكل عنصر x في v» (range-for).`,
          example: R`#include <iostream>
#include <vector>

void add_bonus(int &salary) { salary += 500; }
void add_bonus_ptr(int *salary) {
    if (salary) *salary += 500;
}
long long total(const std::vector<int> &v) {
    long long sum = 0;
    for (int x : v) sum += x;
    return sum;
}

int main() {
    int s = 5000;
    int &alias = s;
    alias += 1;
    add_bonus(s);
    add_bonus_ptr(&s);
    std::cout << "s=" << s << '\n';
    std::vector<int> big(1000000, 1);
    std::cout << "total=" << total(big) << '\n';
}`,
          try: R`اكتب [[void swap_ref(int &a, int &b)]] وقارنها بـ swap بتاعة درس الـ pointers. وبعدين شيل الـ [[&]] من parameter بتاع [[add_bonus]] وشغّل: s بقت كام؟ وجرّب [[int &r;]] من غير قيمة وشوف الـ compiler قال إيه. وجرّب جوه [[total]] تكتب [[v.push_back(1);]].`,
          flag: "script",
          deep: {
            why: R`في C لما بتبعت struct كبير لدالة يا إما تنسخه (بطيء) يا إما تبعت pointer (ممكن يبقى NULL ومحتاج نجوم). الـ [[const T &]] بتدّيك الاتنين: من غير نسخ، ومن غير null، وبنفس شكل المتغير العادي. وهتشوفها في كل كود C++ تقريبًا.`,
            how: R`الـ compiler غالبًا بينفّذ الـ reference كعنوان من جوه (زي pointer)، بس اللغة بتمنعك تعمل عليه arithmetic أو تخليه null. فالتكلفة هي نفسها تكلفة pointer: 8 bytes بدل نسخ الـ vector كله (4 مليون byte هنا).

[[const int &r = 5;]] مسموحة: الـ compiler بيعمل متغير مؤقت ويطوّل عمره. بس [[int &r = 5;]] لأ، لأن مينفعش تغيّر الرقم 5.

للأنواع الصغيرة (int و double و char و pointers) ابعت بالقيمة عادي، نسخها أرخص من الـ reference.`,
            when: R`[[const T &]] لأي parameter نوعه كبير (string و vector و classes) وانت هتقرا بس. [[T &]] لما الدالة لازم تغيّره (out parameter)، بس الأحسن ترجّع قيمة لو تقدر. pointer لما الحاجة ممكن متبقاش موجودة ([[nullptr]]).`,
            mistakes: R`ترجّع reference لمتغير محلي من دالة ([[int &f() { int x = 1; return x; }]]): الـ x بيموت والـ reference بيشاور على زبالة (dangling reference). و [[-Wall]] بينبّهك. وتنسى [[const]] فالدالة متقبلش قيم مؤقتة زي [[total({1, 2, 3})]]. وتفتكر إن [[alias = other;]] بتخلي alias يشاور على other: هي بتنسخ قيمة other جوه s.`
          },
          lines: [
            "فيها std::cout.",
            R`فيها [[std::vector]].`,
            R`[[int &]]: الدالة بتاخد المتغير الأصلي نفسه.`,
            "نفس الفكرة بالـ pointer زي C.",
            "لازم تتشيّك على null، ولازم نجمة.",
            "قفلة.",
            R`[[const &]]: من غير نسخ، ومن غير تعديل. long long عشان المجموع.`,
            "مجموع.",
            R`range-for: لكل عنصر x في v.`,
            "رجّع المجموع.",
            "قفلة.",
            "main.",
            "متغير عادي.",
            R`[[alias]] اسم تاني لـ s نفسه.`,
            "s بقت 5001.",
            R`النداء عادي من غير [[&]]، و s بقت 5501.`,
            R`مع الـ pointer لازم [[&s]]. s بقت 6001.`,
            "اطبع.",
            "مليون عنصر كلهم 1 (4 ميجا تقريبًا).",
            "الـ vector مش بيتنسخ: اللي بيتبعت reference.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[s=6001]]
[[total=1000000]]

من غير [[&]] في [[add_bonus]]: الدالة بتاخد نسخة، فـ s بتبقى [[5501]] (1 من alias و 500 من الـ pointer بس).

[[int &r;]]:
[[error: 'r' declared as reference but not initialized]]

[[v.push_back(1)]] جوه total:
[[error: passing 'const std::vector<int>' as 'this' argument discards qualifiers]]
يعني الـ const منعتك تغيّر الـ vector، وده المطلوب.`,
          solCode: R`#include <iostream>

void swap_ref(int &a, int &b) {
    int tmp = a;
    a = b;
    b = tmp;
}

int main() {
    int x = 1, y = 2;
    swap_ref(x, y);
    std::cout << x << ' ' << y << '\n';
}`
        },
        {
          cmd: "overloading و default args",
          title: "إزاي تعمل كذا دالة بنفس الاسم (overloading) وparameters ليها قيمة افتراضية في C++؟",
          desc: R`في C كل دالة لازم ليها اسم مختلف ([[abs]] و [[labs]] و [[fabs]]). في C++ تقدر تعمل كذا دالة بنفس الاسم طالما الـ parameters مختلفة في العدد أو النوع. ده اسمه function overloading، والـ compiler بيختار المناسبة من الـ arguments اللي بعتّها:
• [[area(4)]]: int واحد، فبتروح لـ [[area(int side)]].
• [[area(3, 5)]]: اتنين int.
• [[area(1.0)]]: double.

نوع الـ return لوحده مش كفاية: مينفعش دالتين يفرقوا في نوع اللي بيرجع بس.

default arguments: parameter ليه قيمة لو محدش بعتها:
[[std::string greet(const std::string &name, const std::string &greeting = "Hello")]]
فـ [[greet("Sara")]] = [[greet("Sara", "Hello")]]. والـ parameters اللي ليها default لازم تبقى في الآخر.

ودي نفس الفكرة اللي بتخلي [[std::cout <<]] تطبع int و double و string: كذا نسخة من [[<<]] لكل نوع.`,
          example: R`#include <iostream>
#include <string>

int area(int side) { return side * side; }
int area(int w, int h) { return w * h; }
double area(double r) { return 3.14159 * r * r; }

std::string greet(const std::string &name, const std::string &greeting = "Hello") {
    return greeting + ", " + name;
}

int main() {
    std::cout << area(4) << ' ' << area(3, 5) << ' ' << area(1.0) << '\n';
    std::cout << greet("Sara") << " | " << greet("Omar", "Welcome") << '\n';
}`,
          try: R`ضيف [[area(2.5f)]] (float) و [[area(2L)]] (long) وشغّل: أنهي نسخة اتنادت، وفيه واحدة منهم الـ compiler رفضها؟ ليه؟ وبعدين اكتب [[print]] بـ ٣ overloads: لـ int و double و [[const std::string &]].`,
          flag: "script",
          deep: {
            why: R`بتخلي الـ API بتاعك طبيعي: اسم واحد للفكرة الواحدة. والمكتبة القياسية كلها مبنية على كده ([[std::to_string]] ليها نسخة لكل نوع رقم). ولو هتفهم رسايل الخطأ بتاعة C++ لازم تعرف الـ overload resolution، لأن نص الأخطاء الطويلة غالبًا «مش لاقي نسخة مناسبة، والنسخ اللي جربتها هي ...».`,
            how: R`الـ compiler بيدّي كل دالة اسم داخلي فيه أنواع الـ parameters (name mangling)، فـ [[area(int)]] و [[area(double)]] اسمهم مختلف في الـ object file. شوفه بـ [[nm app]]: هتلاقي حاجات زي [[_Z4areai]] و [[_Z4aread]]. عشان كده لو هتنادي دالة C++ من C لازم [[extern "C"]].

اختيار الـ overload: تطابق تام الأول، وبعدين promotions (زي float لـ double، و char لـ int)، وبعدين conversions (زي long لـ int أو double). لو لقى أكتر من واحدة في نفس الدرجة: [[ambiguous]].`,
            when: R`نفس العملية على أنواع مختلفة (area و print و parse). default args لما فيه parameter أغلب الناس هتسيبه على قيمة واحدة. ولو النسخ كلها نفس الكود بنوع مختلف، استخدم template بدل ما تكرر (ليها درس).`,
            mistakes: R`overloads بتعمل حاجات مختلفة في المعنى تحت نفس الاسم: بتلخبط. وتجمع overload و default args بشكل يخلي النداء ambiguous ([[f(int)]] و [[f(int, int = 0)]] ونداء [[f(1)]]). وتحط الـ default في التعريف والـ prototype الاتنين: يتحط في الـ declaration (الـ header) بس.`
          },
          lines: [
            "فيها cout.",
            "فيها std::string.",
            "نسخة بـ int واحد: مربع.",
            "نسخة بـ اتنين int: مستطيل.",
            "نسخة بـ double: دايرة.",
            R`الـ parameter التاني ليه قيمة افتراضية [["Hello"]].`,
            R`[[+]] بين strings بتلزق.`,
            "قفلة.",
            "main.",
            "الـ compiler بيختار حسب الـ arguments: 16 و 15 و 3.14159.",
            R`من غير التاني بياخد [["Hello"]]، ومعاه بياخد اللي بعتّه.`,
            "قفلة main."
          ],
          sol: R`الناتج:
[[16 15 3.14159]]
[[Hello, Sara | Welcome, Omar]]

[[area(2.5f)]] بتروح لنسخة الـ double (float لـ double اسمها promotion، أحسن من التحويل لـ int) وبتطبع [[19.6349]].
[[area(2L)]] بيرفضها:
[[error: call of overloaded 'area(long int)' is ambiguous]]
لأن long لـ int و long لـ double الاتنين conversion في نفس الدرجة، فالـ compiler مش عارف يختار. الحل [[area(2)]] أو [[area(static_cast<int>(x))]].`,
          solCode: R`#include <iostream>
#include <string>

void print(int x) { std::cout << "int: " << x << '\n'; }
void print(double x) { std::cout << "double: " << x << '\n'; }
void print(const std::string &s) { std::cout << "string: " << s << '\n'; }

int main() {
    print(5);
    print(2.5);
    print(std::string("hi"));
}`
        }
      ]
    },
    {
      t: "الـ Classes والـ OOP",
      l: 2,
      n: "class و constructor و destructor، و const، و RAII اللي هي أهم فكرة في C++، و rule of 0/3/5، و operators، والوراثة و virtual",
      items: [
        {
          cmd: "الـ Classes والـ OOP في C++",
          title: "class في C++: constructor و member initializer list و this و private و destructor (~)",
          desc: R`الـ class بيجمع داتا والدوال اللي بتشتغل عليها في نوع واحد. الداتا اسمها members، والدوال اسمها member functions (أو methods).

• [[public:]] و [[private:]]: مين يقدر يوصل. الـ public متاح لأي حد، والـ private جوه الـ class بس. الفكرة (encapsulation) إن الرصيد ميتغيرش غير من [[withdraw]] اللي بتتشيّك على القيمة، مش [[acc.balance_ = -500]] من بره.
• الـ constructor: دالة بنفس اسم الـ class ومن غير نوع return، بتتنادى لوحدها لما الـ object يتعمل.
• الـ member initializer list: [[: owner_(owner), balance_(balance)]] بعد قوس الـ constructor وقبل [[{]]. بتدّي الـ members قيمتهم أول ما يتعملوا، بدل ما يتعملوا فاضيين ويتغيّروا جوه [[{ }]]. استخدمها دايمًا. والـ members بيتعملوا بترتيب تعريفهم في الـ class مش بترتيب الـ list.
• الـ destructor: [[~BankAccount()]]. علامة [[~]] (tilde) قبل اسم الـ class. بيتنادى لوحده لما الـ object يموت: لما يخرج من الـ scope بتاعه (الـ [[{ }]] اللي اتعرّف جواها).
• [[this]]: pointer للـ object اللي الدالة اتنادت عليه. [[this->balance_]] زي [[balance_]] بالظبط، بتحتاجها لو فيه parameter بنفس الاسم. ولأنه pointer بنستخدم [[->]].
• [[double balance() const]]: الـ [[const]] بعد القوسين معناها «الدالة دي مش هتغيّر الـ object». الدرس الجاي كله عنها.
• الـ [[_]] في آخر [[owner_]] مجرد عادة عشان تفرق الـ members عن الـ parameters.

[[struct]] في C++ زي [[class]] بالظبط، الفرق الوحيد إن الـ struct كله public افتراضيًا والـ class كله private. العادة: struct للداتا البسيطة، و class لما فيه قواعد لازم تتحمي.`,
          example: R`#include <iostream>
#include <string>

class BankAccount {
public:
    BankAccount(const std::string &owner, double balance)
        : owner_(owner), balance_(balance) {
        std::cout << "open " << owner_ << '\n';
    }
    ~BankAccount() { std::cout << "close " << owner_ << '\n'; }

    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance_) return false;
        this->balance_ -= amount;
        return true;
    }
    double balance() const { return balance_; }

private:
    std::string owner_;
    double balance_;
};

int main() {
    BankAccount acc("Sara", 1000);
    acc.withdraw(300);
    bool ok = acc.withdraw(5000);
    std::cout << "balance=" << acc.balance() << " ok=" << ok << '\n';
    {
        BankAccount temp("Omar", 50);
    }
    std::cout << "end of main\n";
}`,
          try: R`اتوقع ترتيب السطور قبل ما تشغّل، وبعدين شغّل وقارن. وبعدين ضيف [[void deposit(double amount)]] بترفض أي مبلغ سالب، وجرّب من main تكتب [[acc.balance_ = 1e9;]]: إيه اللي حصل؟ وآخر حاجة: اعمل class [[Counter]] بيعد هو اتعمل منه كام object دلوقتي (زوّد في الـ constructor وقلّل في الـ destructor) باستخدام [[static int count;]].`,
          flag: "script",
          deep: {
            why: R`الـ class بيخليك تحط القواعد جنب الداتا: مفيش رصيد سالب، ومفيش ملف مفتوح من غير ما يتقفل. ومن غير الـ destructor مكنش هيبقى فيه RAII، وهي الفكرة اللي C++ كلها قايمة عليها (الدرس بعد الجاي).`,
            how: R`الـ object المحلي ([[BankAccount acc(...)]]) بيتعمل على الـ stack زي أي متغير. الـ member functions مش بتتخزن جوه كل object: هي دوال عادية بتاخد [[this]] كـ parameter مستخبي. فـ [[acc.withdraw(300)]] كأنها [[withdraw(&acc, 300)]].

الـ destructor بيتنادى أوتوماتيك عند آخر الـ scope، بالعكس من ترتيب الإنشاء: آخر واحد اتعمل أول واحد يموت. فلو فيه objects كتير، الأخير بيتقفل الأول. وده مضمون حتى لو خرجت بـ return أو حصل exception.

لو مكتبتش constructor خالص، الـ compiler بيعمل واحد افتراضي. لكن أول ما تكتب واحد بـ parameters، الافتراضي بيختفي، فـ [[BankAccount x;]] مش هتتعمل compile.`,
            when: R`أي حاجة ليها حالة وقواعد: حساب، اتصال، ملف، لاعب في لعبة. ولو مجرد داتا من غير قواعد (نقطة x و y) استخدم struct بحقول public وخلاص.`,
            mistakes: R`تدّي القيم جوه [[{ }]] بدل الـ initializer list: الـ members بيتعملوا مرتين، ولو member نوعه const أو reference مش هيتعمل compile أصلًا. وترتيب الـ initializer list مختلف عن ترتيب تعريف الـ members: [[-Wall]] بينبّهك ([[-Wreorder]]). وتعمل كل حاجة public فالـ class ملوش لازمة. وتنسى [[;]] بعد قفلة الـ class: [[};]].`
          },
          lines: [
            "cout.",
            "string.",
            R`تعريف class اسمه BankAccount.`,
            R`[[public:]]: اللي تحت متاح لأي حد.`,
            "الـ constructor: نفس اسم الـ class ومن غير نوع return.",
            R`member initializer list: owner_ و balance_ بياخدوا قيمهم أول ما يتعملوا.`,
            "جسم الـ constructor: رسالة.",
            "قفلة الـ constructor.",
            R`الـ destructor بـ [[~]]: بيتنادى لوحده لما الـ object يموت.`,
            "دالة بترجّع نجح ولا لأ.",
            "ارفض المبلغ الغلط أو الأكبر من الرصيد.",
            R`[[this->]]: الـ member بتاع الـ object ده. زي [[balance_]] بالظبط.`,
            "نجح.",
            "قفلة.",
            R`[[const]]: الدالة دي بتقرا بس.`,
            R`[[private:]]: محدش من بره يوصل للي تحت.`,
            "اسم صاحب الحساب.",
            "الرصيد.",
            R`قفلة الـ class، ولاحظ الـ [[;]].`,
            "main.",
            R`object على الـ stack: الـ constructor اتنادى، وطبع open Sara.`,
            "سحب 300: الرصيد 700.",
            "5000 أكبر من الرصيد: false.",
            R`bool بيتطبع 0 أو 1.`,
            R`[[{]]: scope جديد.`,
            "object تاني: open Omar.",
            R`[[}]]: temp بيموت هنا، فبيطبع close Omar.`,
            "بيتطبع قبل ما acc يموت.",
            "آخر main: acc بيموت، close Sara."
          ],
          sol: R`الناتج:
[[open Sara]]
[[balance=700 ok=0]]
[[open Omar]]
[[close Omar]]
[[end of main]]
[[close Sara]]

[[acc.balance_ = 1e9;]]:
[[error: 'double BankAccount::balance_' is private within this context]]

الـ Counter: [[static int count;]] جوه الـ class معناها متغير واحد مشترك بين كل الـ objects مش واحد لكل object، ولازم يتعرّف بره ([[int Counter::count = 0;]]) أو تكتبه [[static inline int count = 0;]] جوه الـ class من C++17.`,
          solCode: R`#include <iostream>

class Counter {
public:
    Counter() { ++count; }
    ~Counter() { --count; }
    static inline int count = 0;
};

int main() {
    Counter a;
    {
        Counter b, c;
        std::cout << Counter::count << '\n';
    }
    std::cout << Counter::count << '\n';
}`
        },
        {
          cmd: "const",
          title: "const correctness: const في المتغيرات والـ parameters والـ member functions والـ pointers",
          desc: R`[[const]] وعد: «القيمة دي مش هتتغير». والـ compiler بيلزمك بيه، فأي محاولة تغيّر حاجة const بتبقى error وقت الـ compile مش bug وقت التشغيل.

أماكنها:
• متغير: [[const int max_retries = 3;]].
• parameter: [[void print(const Account &a)]]: الدالة بتاخد الـ object من غير نسخ، ومش هتغيّره. ده الشكل اللي هتكتبه أكتر حاجة.
• member function: [[int balance() const]]: الـ [[const]] بعد القوسين معناها «الدالة دي مش هتغيّر أي member». والمهم: على object من نوع const (أو const reference) تقدر تنادي الدوال الـ const بس. فلو نسيت تكتبها على getter، [[print]] مش هتقدر تناديه.
• return: [[const std::string &owner() const]]: رجّع الاسم من غير نسخ، ومن غير ما حد يغيّره.

مع الـ pointers فيه حاجتين ممكن يبقوا const، والقاعدة: اقرا من اليمين للشمال:
• [[const char *msg]]: pointer لـ char ثابت. الحروف متتغيرش، بس msg نفسه ممكن يشاور على نص تاني.
• [[char *const fixed]]: pointer ثابت لـ char. مش هيشاور على حاجة تانية، بس الحروف تتغير.
• [[const char *const p]]: الاتنين.

const correctness يعني: كل حاجة مش هتتغير اكتبها const من الأول. بتمنع bugs، وبتوضّح نيتك لأي حد بيقرا الكود.`,
          example: R`#include <iostream>
#include <string>

class Account {
public:
    explicit Account(const std::string &owner) : owner_(owner) {}
    const std::string &owner() const { return owner_; }
    int balance() const { return balance_; }
    void deposit(int amount) { balance_ += amount; }

private:
    std::string owner_;
    int balance_ = 0;
};

void print(const Account &a) {
    std::cout << a.owner() << ": " << a.balance() << '\n';
}

int main() {
    const int max_retries = 3;
    const char *msg = "hello";
    char buf[] = "abc";
    char *const fixed = buf;
    fixed[0] = 'X';
    msg = "bye";
    Account acc("Sara");
    acc.deposit(200);
    print(acc);
    std::cout << max_retries << ' ' << msg << ' ' << buf << '\n';
}`,
          try: R`جرّب واحدة واحدة واقرا الـ error: (1) جوه [[print]] اكتب [[a.deposit(10);]]. (2) شيل [[const]] من [[int balance() const]]. (3) [[max_retries = 4;]]. (4) [[msg[0] = 'H';]]. (5) [[fixed = nullptr;]]. وفي كل مرة قول ليه الـ compiler رفض.`,
          flag: "script",
          deep: {
            why: "الـ bugs اللي بتمنعها وقت الـ compile أرخص بكتير من اللي بتلاقيها وقت التشغيل. و const بتقول للي بيقرا: «مفيش حاجة هنا بتتغير»، فبيقرا أسرع. وفي الانترفيو بيسألوا عن const member functions وعن الفرق بين const char * و char *const.",
            how: R`[[this]] جوه دالة const نوعه [[const Account *]]، فأي محاولة تغيّر member بتبقى تغيير في حاجة const. وعشان كده [[const Account &a]] متقدرش تنادي [[deposit]]: نوع this مش هيتطابق.

[[explicit]] قبل constructor بـ parameter واحد بتمنع التحويل الأوتوماتيك: من غيرها، [[print(std::string("Ali"))]] كانت هتتعمل compile بإنها تعمل Account مؤقت من النص بهدوء. خليها عادة لأي constructor بـ parameter واحد.

[[int balance_ = 0;]] جوه الـ class اسمها default member initializer: قيمة افتراضية لو الـ constructor مدهاش قيمة.

وفيه [[mutable]]: member ممكن يتغير حتى جوه دالة const (زي cache أو mutex). استخدمها نادرًا.`,
            when: R`دايمًا. أي parameter كبير ومش هيتغير [[const T &]]. أي member function مبتغيرش حاجة [[const]]. أي متغير محلي مش هيتغير [[const]]. والثوابت اللي معروفة وقت الـ compile [[constexpr]] (المستوى ٣).`,
            mistakes: R`تنسى [[const]] على الـ getters، فتكتشف المشكلة لما تبعت الـ object كـ [[const &]] وتلاقي كل حاجة مرفوضة. وتستخدم [[const_cast]] عشان تشيل const وتسكت الـ compiler: غالبًا ده bug. وتلخبط [[const char *]] مع [[char *const]]. وترجّع [[const]] by value ([[const std::string name()]]): ملهاش فايدة وبتمنع الـ move.`
          },
          lines: [
            "cout.",
            "string.",
            "class.",
            "public.",
            R`[[explicit]]: مفيش تحويل أوتوماتيك من string لـ Account.`,
            R`بترجّع reference ثابت: من غير نسخ ومن غير تعديل. والـ [[const]] الأخيرة: الدالة مبتغيّرش الـ object.`,
            "getter: const.",
            "بتغيّر الرصيد، فمش const.",
            "private.",
            "الاسم.",
            "قيمة افتراضية 0.",
            "قفلة الـ class.",
            R`[[const Account &]]: من غير نسخ، ومش هتتغيّر.`,
            "مسموح: الاتنين const.",
            "قفلة.",
            "main.",
            "ثابت.",
            "pointer لحروف ثابتة.",
            "array عادية تتغير.",
            R`[[char *const]]: الـ pointer نفسه ثابت.`,
            "مسموح: الحروف مش const.",
            "مسموح: msg نفسه مش const، بس اللي بيشاور عليه const.",
            "object عادي.",
            "deposit مسموحة عليه.",
            "يتبعت كـ const reference.",
            "اطبع.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[Sara: 200]]
[[3 bye Xbc]]

الأخطاء (gcc 14):
(1) [[a.deposit(10)]]: [[passing 'const Account' as 'this' argument discards qualifiers]]
(2) من غير const على balance: نفس الخطأ، بس عند [[a.balance()]] جوه print.
(3) [[assignment of read-only variable 'max_retries']]
(4) [[assignment of read-only location '* msg']]
(5) [[assignment of read-only variable 'fixed']]

«discards qualifiers» معناها: «كنت هتشيل الـ const عشان تنادي الدالة دي، وده ممنوع».`
        },
        {
          cmd: "RAII",
          title: "RAII: ليه الـ destructor هو أهم فكرة في C++، وإزاي بيمنع الـ leaks؟",
          desc: R`RAII اختصار Resource Acquisition Is Initialization، والاسم صعب بس الفكرة بسيطة:
• أي مورد (ذاكرة، ملف، اتصال، lock) تاخده في الـ constructor بتاع object.
• وترجّعه في الـ destructor بتاعه.
• والـ object نفسه متغير محلي عادي.

النتيجة: لما الـ object يخرج من الـ scope بأي طريقة (آخر الدالة، [[return]] في النص، exception)، الـ destructor بيتنادى لوحده والمورد يرجع. مفيش [[fclose]] أو [[free]] تنساها.

قارن بـ C: لو الدالة فيها ٣ أماكن بترجع منها، لازم تحط [[fclose]] قبل كل [[return]]، ولو نسيت واحدة يبقى leak.

المكتبة القياسية كلها RAII: [[std::string]] و [[std::vector]] بيحرروا ذاكرتهم، و [[std::ifstream]] و [[std::ofstream]] بيقفلوا الملف، و [[std::lock_guard]] بيفك الـ mutex، و [[std::unique_ptr]] بيمسح الـ object. فلو كتبت C++ حديثة صح، نادرًا هتكتب [[delete]] أو [[fclose]] بإيدك.

في المثال class صغير بيلف [[FILE *]] بتاع C. [[nullptr]] هي الـ NULL بتاعة C++، ونوعها pointer فعلًا مش رقم 0. والسطرين اللي فيهم [[= delete]] بيمنعوا نسخ الـ object (لو اتنسخ، الاتنين هيقفلوا نفس الملف). الدرس الجاي بيشرح ليه.`,
          example: R`#include <cstdio>
#include <iostream>

class File {
public:
    File(const char *path, const char *mode) : f_(std::fopen(path, mode)) {}
    ~File() {
        if (f_) {
            std::fclose(f_);
            std::cout << "file closed\n";
        }
    }
    File(const File &) = delete;
    File &operator=(const File &) = delete;
    bool ok() const { return f_ != nullptr; }
    void write(const char *text) { std::fputs(text, f_); }

private:
    std::FILE *f_;
};

bool save(const char *text) {
    File f("raii.txt", "w");
    if (!f.ok()) return false;
    if (text[0] == '\0') return false;
    f.write(text);
    return true;
}

int main() {
    save("hello\n");
    save("");
    std::cout << "done\n";
}`,
          try: R`اكتب نفس [[save]] بـ C (fopen و fclose) وعدّ كام [[fclose]] محتاجها عشان متسيبش الملف مفتوح. وبعدين اعمل class [[Timer]] بيحفظ الوقت في الـ constructor ([[std::chrono::steady_clock::now()]]) ويطبع الوقت اللي عدّى في الـ destructor، وحطه في أول دالة عشان تقيس هي بتاخد قد إيه.`,
          flag: "script",
          deep: {
            why: R`أغلب الـ leaks والـ crashes في C جاية من «نسيت أحرر» أو «حررت مرتين». RAII بيخلي التحرير أوتوماتيك ومضمون، والـ compiler هو اللي بيحط النداء مش انت. وده سبب إن C++ مش محتاجة garbage collector: الذاكرة والموارد بترجع في لحظة معروفة بالظبط، مش «وقت ما الـ GC يقرر».`,
            how: R`الـ compiler بيحط نداء الـ destructor في كل مخرج من الـ scope: آخر [[{ }]]، وقبل كل [[return]]، وفي مسار الـ exception (stack unwinding: لما exception يطلع، كل الـ objects المحلية في كل الدوال اللي بيعدّي عليها بيتنادى الـ destructor بتاعها بالعكس).

في المثال، [[save("")]] بترجع false من سطر الشرط قبل ما تكتب، ومع ذلك الملف بيتقفل وبيتطبع [[file closed]]. في الـ C كنت محتاج fclose قبل الـ return ده.

الـ destructor ممنوع يرمي exception (افتراضيًا هو [[noexcept]])، لأنه ممكن يتنادى وفيه exception تاني طالع، والبرنامج هيتقفل.`,
            when: R`كل مورد لازم يترجّع. ولو المكتبة القياسية فيها wrapper جاهز استخدمه ([[std::fstream]] و [[std::unique_ptr]] و [[std::lock_guard]] و [[std::jthread]]). اكتب class RAII بنفسك بس لمورد من مكتبة C (زي FILE أو handle من SQLite أو socket).`,
            mistakes: R`تعمل الـ object بـ [[new]] وتنسى [[delete]]: كده الـ destructor مش هيتنادى، والـ RAII ضاع. الـ objects تبقى محلية، أو جوه smart pointer. وتسيب class RAII يتنسخ فاتنين يقفلوا نفس المورد (double close / double free). وتكتب [[File("x.txt", "w");]] من غير اسم: ده object مؤقت بيموت في نفس السطر.`
          },
          lines: [
            R`[[cstdio]]: نسخة C++ من stdio.h، وفيها [[std::fopen]].`,
            "cout.",
            "class بيلف FILE.",
            "public.",
            "الـ constructor بيفتح الملف (الحصول على المورد = الإنشاء).",
            "الـ destructor.",
            "لو الملف اتفتح...",
            "...اقفله. ده بيحصل لوحده.",
            "رسالة عشان نشوف إمتى.",
            "قفلة الـ if.",
            "قفلة الـ destructor.",
            R`[[= delete]]: ممنوع النسخ (copy constructor).`,
            "وممنوع النسخ بالـ = (copy assignment).",
            R`[[nullptr]]: الـ null بتاعة C++.`,
            "كتابة نص.",
            "private.",
            "الـ FILE pointer.",
            "قفلة الـ class.",
            "دالة بتحفظ نص.",
            "object محلي: الملف اتفتح.",
            "لو الفتح فشل ارجع، ومفيش حاجة تتقفل.",
            "مخرج مبكر: الملف هيتقفل لوحده هنا برضه.",
            "اكتب.",
            "مخرج عادي: f بيموت والملف بيتقفل.",
            "قفلة.",
            "main.",
            "file closed.",
            "رجعت بدري، و file closed برضه.",
            "done.",
            "قفلة main: مفيش return، و main في C++ بترجّع 0 لوحدها."
          ],
          sol: R`الناتج:
[[file closed]]
[[file closed]]
[[done]]

الـ [[file closed]] التانية من النداء اللي رجع بدري: الملف اتقفل مع إن مفيش ولا سطر بيقفله في المسار ده.

نسخة C محتاجة [[fclose]] قبل كل [[return]] بعد الفتح الناجح (٢ هنا)، وكل مخرج جديد هتضيفه بعدين محتاج واحدة كمان.

الـ Timer:`,
          solCode: R`#include <chrono>
#include <iostream>

class Timer {
public:
    explicit Timer(const char *name) : name_(name), start_(std::chrono::steady_clock::now()) {}
    ~Timer() {
        auto end = std::chrono::steady_clock::now();
        auto us = std::chrono::duration_cast<std::chrono::microseconds>(end - start_).count();
        std::cout << name_ << " took " << us << " us\n";
    }

private:
    const char *name_;
    std::chrono::steady_clock::time_point start_;
};

long long work() {
    Timer t("work");
    long long sum = 0;
    for (int i = 0; i < 10'000'000; ++i) sum += i % 7;
    return sum;
}

int main() {
    std::cout << work() << '\n';
}`
        },
        {
          cmd: "rule of 0/3/5",
          title: "rule of 3 و 5 و 0: إمتى تكتب copy constructor و destructor بنفسك، وإمتى متكتبهمش خالص؟",
          desc: R`لما تنسخ object ([[Buffer b = a;]] أو تبعته بالقيمة)، C++ بتعمل copy constructor افتراضي بينسخ كل member زي ما هو. ده تمام لـ int و string و vector. بس لو فيه member هو pointer لذاكرة انت حجزتها، النسخ الافتراضي بينسخ العنوان بس: الاتنين بيشاوروا على نفس الذاكرة، وكل واحد destructor بتاعه هيعمل [[delete]]، فتبقى double free.

[[new int[n]()]] بتحجز array على الـ heap (زي malloc بس بتعمل constructors)، و [[delete[] p]] بتحررها. ولـ object واحد: [[new T]] و [[delete p]].

rule of 3: لو كتبت واحدة من الـ ٣ دول بنفسك، غالبًا محتاج التلاتة:
• destructor ([[~Buffer()]]).
• copy constructor ([[Buffer(const Buffer &other)]]): بيعمل object جديد نسخة من other.
• copy assignment ([[Buffer &operator=(const Buffer &other)]]): بيخلي object موجود نسخة من other ([[a = b;]]).
وفي C++11 اتضاف اتنين للـ move ([[Buffer(Buffer &&)]] و [[operator=(Buffer &&)]])، فبقت rule of 5. الـ move ليه درس في المستوى ٣.

rule of 0 (اللي المفروض تعمله غالبًا): متكتبش ولا واحدة. خلي الـ members أنواع بتدير نفسها ([[std::vector]] و [[std::string]] و [[std::unique_ptr]])، والـ compiler هيعمل الـ ٥ صح لوحده. [[struct Better { std::vector<int> data; };]] بيتنسخ صح من غير ولا سطر.

[[std::copy(from, to, dest)]] من [[<algorithm>]] بتنسخ عناصر من مدى لمكان تاني. و [[std::size_t]] نوع الأحجام (زي size_t في C).`,
          example: R`#include <algorithm>
#include <cstddef>
#include <iostream>
#include <vector>

class Buffer {
public:
    explicit Buffer(std::size_t n) : size_(n), data_(new int[n]()) {}
    ~Buffer() { delete[] data_; }
    Buffer(const Buffer &other) : size_(other.size_), data_(new int[other.size_]) {
        std::copy(other.data_, other.data_ + size_, data_);
    }
    Buffer &operator=(const Buffer &other) {
        if (this == &other) return *this;
        int *fresh = new int[other.size_];
        std::copy(other.data_, other.data_ + other.size_, fresh);
        delete[] data_;
        data_ = fresh;
        size_ = other.size_;
        return *this;
    }
    int &at(std::size_t i) { return data_[i]; }

private:
    std::size_t size_;
    int *data_;
};

struct Better {
    std::vector<int> data;
};

int main() {
    Buffer a(3);
    a.at(0) = 7;
    Buffer b = a;
    b.at(0) = 99;
    std::cout << a.at(0) << ' ' << b.at(0) << '\n';
    a = b;
    std::cout << a.at(0) << '\n';
    Better x{{1, 2, 3}};
    Better y = x;
    y.data[0] = 100;
    std::cout << x.data[0] << ' ' << y.data[0] << '\n';
}`,
          try: R`امسح الـ copy constructor والـ copy assignment من Buffer، واعمل compile بـ [[-g -fsanitize=address]] وشغّل: إيه اللي حصل وليه؟ وبعدين حوّل Buffer لـ rule of 0: خلي [[data_]] نوعه [[std::vector<int>]] وامسح الـ destructor والـ copy functions، واتأكد إن الناتج زي ما هو.`,
          flag: "script",
          deep: {
            why: "ده أشهر bug في C++ القديمة، وأشهر سؤال انترفيو في الـ OOP بتاعها. ولما تفهمه هتفهم ليه C++ الحديثة بتقول: متمسكش pointer بيملك ذاكرة بإيدك، خليه vector أو unique_ptr.",
            how: R`[[Buffer b = a;]] بتنادي الـ copy constructor (object جديد). [[a = b;]] بتنادي الـ copy assignment (a موجود قبل كده، فلازم يحرر ذاكرته القديمة الأول).

ليه الـ assignment بيحجز الجديد وينسخ الأول وبعدين يحرر القديم؟ عشان لو [[new]] رمت exception (مفيش ذاكرة)، الـ object يفضل سليم. ولو عملت delete الأول ورمت، [[data_]] هيبقى بيشاور على ذاكرة محررة. وفيه أسلوب مشهور اسمه copy-and-swap بيعمل نفس الحاجة بشكل أقصر.

[[if (this == &other)]]: حماية من [[a = a;]]. من غيرها كنت هتحرر الذاكرة وبعدين تنسخ منها.

لو كتبت destructor بس، الـ compiler لسه بيعمل copy constructor افتراضي (بينسخ الـ pointer). ده سبب القاعدة.

[[= delete]] (اللي في درس RAII) هو الحل لو الـ object مينفعش يتنسخ أصلًا.`,
            when: R`rule of 0 في ٩٥٪ من الـ classes. rule of 5 بس لو بتكتب class بيدير مورد بنفسه (container خاص بيك، أو wrapper لـ handle من مكتبة C)، ويبقى صغير ومعمول للحاجة دي بس، والباقي يستخدمه.`,
            mistakes: R`تكتب destructor فيه [[delete]] وتسيب الـ copy الافتراضي. و [[delete]] بدل [[delete[]]] على حاجة اتعملت بـ [[new[]]] (undefined behavior). وتنسى [[return *this;]] في الـ assignment. وتنسى حالة [[a = a]].`
          },
          lines: [
            R`[[std::copy]].`,
            R`[[std::size_t]].`,
            "cout.",
            "vector.",
            "class بيدير ذاكرة بنفسه.",
            "public.",
            R`[[new int[n]()]]: احجز n عنصر على الـ heap وصفّرهم.`,
            R`destructor: [[delete[]]] للـ array.`,
            "copy constructor: احجز ذاكرة جديدة بنفس الحجم...",
            "...وانسخ العناصر. دلوقتي كل واحد ليه ذاكرته.",
            "قفلة.",
            "copy assignment: a موجود فعلًا.",
            R`[[a = a]]: متعملش حاجة.`,
            "احجز الجديد الأول.",
            "انسخ فيه.",
            "وبعدين حرر القديم.",
            "خد الجديد.",
            "والحجم.",
            R`رجّع الـ object نفسه، عشان [[a = b = c]] تشتغل.`,
            "قفلة.",
            R`بترجّع [[int &]] فتقدر تكتب [[a.at(0) = 7]].`,
            "private.",
            "الحجم.",
            "الـ pointer اللي بيملك الذاكرة.",
            "قفلة.",
            R`rule of 0: الـ vector بيدير نفسه.`,
            "member واحد.",
            "قفلة.",
            "main.",
            "3 أصفار.",
            "أول عنصر 7.",
            "copy constructor: b ليه ذاكرته.",
            "تغيير b مش بيأثر على a.",
            "7 99.",
            "copy assignment.",
            "99.",
            "Better بقيم أولية.",
            "نسخ صح من غير ما نكتب حاجة.",
            "تغيير النسخة بس.",
            "1 100.",
            "قفلة main: a و b بيموتوا، وكل واحد بيحرر ذاكرته هو."
          ],
          sol: R`الناتج:
[[7 99]]
[[99]]
[[1 100]]

لما تمسح الـ copy functions: [[b = a]] بتنسخ الـ pointer بس، فـ [[b.at(0) = 99]] بتغيّر a كمان (السطر الأول بيطلع [[99 99]])، وفي الآخر الـ destructors الاتنين بيعملوا [[delete[]]] على نفس العنوان. ASan بيقول:
[[ERROR: AddressSanitizer: attempting double-free]]
وفي حالة [[a = b]] كمان الذاكرة القديمة بتاعة a ضاعت (leak).

نسخة الـ rule of 0: [[std::vector<int> data_;]] و [[explicit Buffer(std::size_t n) : data_(n) {}]] و [[int &at(std::size_t i) { return data_[i]; }]] وبس. نفس الناتج، وأقل بـ ١٥ سطر.`
        },
        {
          cmd: "operator overloading",
          title: "operator overloading: إزاي تخلي + و == و << يشتغلوا على الـ class بتاعك؟",
          desc: R`في C++ تقدر تعرّف معنى العمليات ([[+]] و [[==]] و [[<<]] و [[[]]] وغيرهم) لأنواعك. [[a + b]] على objects بتتحول لنداء دالة اسمها [[operator+]].

شكلين:
• member function: [[Vec2 operator+(const Vec2 &o) const]]. الطرف الشمال هو this، والطرف اليمين هو o.
• دالة عادية بره الـ class: لازم لما الطرف الشمال مش من نوعك. أشهر مثال [[<<]] للطباعة: الشمال [[std::ostream]] (زي cout)، فلازم [[std::ostream &operator<<(std::ostream &os, const Vec2 &v)]]، وترجّع [[os]] عشان السلسلة تكمّل.

قواعد عملية:
• [[+]] بترجّع object جديد (by value)، ومتغيّرش الطرفين، فهي [[const]].
• [[+=]] بتغيّر this وترجّع [[*this]] كـ reference.
• [[==]] في C++20: [[bool operator==(const Vec2 &o) const = default;]] بتقارن كل الـ members لوحدها، والـ [[!=]] بتيجي معاها ببلاش.
• خلي المعنى طبيعي: [[+]] تجمع، مش تمسح ملف.

[[return {x + o.x, y + o.y};]]: الأقواس [[{ }]] بتعمل Vec2 جديد من القيم دي، لأن الـ compiler عارف نوع الـ return.`,
          example: R`#include <iostream>

struct Vec2 {
    double x = 0, y = 0;
    Vec2 operator+(const Vec2 &o) const { return {x + o.x, y + o.y}; }
    Vec2 operator*(double k) const { return {x * k, y * k}; }
    Vec2 &operator+=(const Vec2 &o) {
        x += o.x;
        y += o.y;
        return *this;
    }
    bool operator==(const Vec2 &o) const = default;
};

std::ostream &operator<<(std::ostream &os, const Vec2 &v) {
    return os << '(' << v.x << ", " << v.y << ')';
}

int main() {
    Vec2 a{1, 2}, b{3, 4};
    Vec2 c = a + b * 2;
    a += b;
    std::cout << c << ' ' << a << '\n';
    std::cout << std::boolalpha << (a == Vec2{4, 6}) << ' ' << (a != b) << '\n';
}`,
          try: R`ضيف [[operator-]] و [[operator*]] تانية بتاخد [[double]] على الشمال ([[2 * b]] بدل [[b * 2]]): لازم تبقى برا الـ struct، ليه؟ وبعدين اعمل struct [[Money]] بيخزن قروش في [[long long]]، بـ [[+]] و [[<<]] بيطبع [[12.50 EGP]].`,
          flag: "script",
          deep: {
            why: R`عشان أنواعك تبقى طبيعية زي الأنواع المدمجة: [[a + b * 2]] أوضح بكتير من [[add(a, scale(b, 2))]]، خصوصًا في الرياضة والجرافيكس والفلوس. والمكتبة القياسية معتمدة عليه: [[std::string]] بـ [[+]]، و [[std::cout]] بـ [[<<]]، والـ iterators بـ [[*]] و [[++]]، و [[std::sort]] بتستخدم [[<]].`,
            how: R`[[a + b * 2]] بتتحول لـ [[a.operator+(b.operator*(2))]]، بنفس أولوية العمليات العادية: مقدرش تغيّر الأولوية ولا تعمل operator جديد.

[[b * 2]] بتشتغل لأن b على الشمال. لكن [[2 * b]]: الشمال double، و double مش class عشان تضيفله member. فلازم دالة عادية [[Vec2 operator*(double k, const Vec2 &v)]].

[[std::boolalpha]] بتخلي cout يطبع true و false بدل 1 و 0.

في C++20 فيه كمان [[operator<=>]] (اسمها spaceship) بتعرّف [[<]] و [[>]] و [[<=]] و [[>=]] مرة واحدة، و [[= default]] عليها بتقارن الـ members بالترتيب.`,
            when: R`أنواع رياضية (vectors و matrices و أرقام كبيرة و فلوس)، و [[<<]] لأي نوع عايز تطبعه، و [[==]] لأي نوع هتقارنه أو تحطه في container. ولو المعنى مش واضح لأي حد هيقرا، اعمل دالة باسم.`,
            mistakes: R`[[+]] بتغيّر الطرف الشمال. و [[+=]] بترجّع by value بدل reference. و [[<<]] مش بترجّع الـ stream فالسلسلة متكمّلش. وتعمل [[==]] و [[!=]] بمنطق مختلف في C++ قبل 20. وتعمل [[&&]] أو [[||]] overload: بتخسر الـ short-circuit.`
          },
          lines: [
            "cout.",
            "struct: كله public.",
            "قيم افتراضية 0.",
            "a + b: نقطة جديدة، والطرفين مش بيتغيروا.",
            "ضرب في رقم.",
            R`[[+=]] بتغيّر this...`,
            "x.",
            "y.",
            R`...وترجّع الـ object نفسه كـ reference.`,
            "قفلة.",
            R`C++20: [[==]] بتقارن كل الـ members، و [[!=]] معاها.`,
            "قفلة الـ struct.",
            R`[[<<]] بره الـ struct لأن الشمال ostream.`,
            "اطبع وارجع الـ stream نفسه.",
            "قفلة.",
            "main.",
            "نقطتين.",
            R`الضرب الأول: (6, 8)، وبعدين الجمع: (7, 10).`,
            "a بقت (4, 6).",
            R`[[<<]] بتاعتنا بتطبع الشكل ده.`,
            R`[[boolalpha]]: true/false بدل 1/0.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[(7, 10) (4, 6)]]
[[true true]]

[[2 * b]] لازم برا، لأن الـ member function الطرف الشمال بتاعها دايمًا this، والشمال هنا double:`,
          solCode: R`#include <iostream>

struct Vec2 {
    double x = 0, y = 0;
    Vec2 operator-(const Vec2 &o) const { return {x - o.x, y - o.y}; }
    Vec2 operator*(double k) const { return {x * k, y * k}; }
};

Vec2 operator*(double k, const Vec2 &v) { return v * k; }

struct Money {
    long long cents = 0;
    Money operator+(const Money &o) const { return {cents + o.cents}; }
};

std::ostream &operator<<(std::ostream &os, const Money &m) {
    long long abs_cents = m.cents < 0 ? -m.cents : m.cents;
    if (m.cents < 0) os << '-';
    os << abs_cents / 100 << '.' << (abs_cents % 100 < 10 ? "0" : "") << abs_cents % 100;
    return os << " EGP";
}

int main() {
    Vec2 b{3, 4};
    Vec2 d = 2 * b - Vec2{1, 1};
    std::cout << d.x << ' ' << d.y << '\n';
    std::cout << Money{1000} + Money{250} << '\n';
}`
        },
        {
          cmd: "inheritance و virtual",
          title: "الوراثة و virtual و override: إزاي reference للأب ينادي دالة الابن (polymorphism)؟",
          desc: R`الوراثة: [[class Circle : public Shape]] معناها Circle «نوع من» Shape: بياخد كل members و دوال Shape ويزوّد عليهم. والـ [[:]] هنا معناها «بيورث من»، و [[public]] معناها إن الـ public في الأب يفضل public.

الـ constructor بتاع الابن لازم ينادي constructor الأب في الـ initializer list: [[Circle(double r) : Shape("circle"), r_(r) {}]].

polymorphism: دالة بتاخد [[const Shape &]] تقدر تبعتلها Circle أو Rect. السؤال: لما تنادي [[s.area()]] أنهي نسخة هتشتغل؟
• من غير [[virtual]]: نسخة Shape دايمًا، لأن الـ compiler بيقرر من نوع الـ reference (Shape).
• مع [[virtual]] في الأب: بيتقرر وقت التشغيل من النوع الحقيقي للـ object، فـ Circle بتنادي area بتاعتها.

• [[override]] في الابن: بتقول للـ compiler «أنا قاصد أغطي دالة virtual في الأب». لو غلطت في الاسم أو الـ parameters أو نسيت [[const]]، بيطلّع error بدل ما يعمل دالة جديدة بهدوء. اكتبها دايمًا.
• [[virtual ~Shape() = default;]]: أي class فيه دالة virtual لازم الـ destructor بتاعه يبقى virtual. وإلا لو مسحت Circle عن طريق [[Shape *]]، الـ destructor بتاع Circle مش هيتنادى.
• [[protected:]]: متاح للأبناء ومش متاح لأي حد تاني.

[[std::vector<const Shape *>]]: vector من pointers للأب، وكل عنصر بيشاور على نوع مختلف. ده الاستخدام الكلاسيكي.`,
          example: R`#include <iostream>
#include <string>
#include <vector>

class Shape {
public:
    explicit Shape(const std::string &name) : name_(name) {}
    virtual ~Shape() = default;
    virtual double area() const { return 0; }
    const std::string &name() const { return name_; }

private:
    std::string name_;
};

class Circle : public Shape {
public:
    explicit Circle(double r) : Shape("circle"), r_(r) {}
    double area() const override { return 3.14159 * r_ * r_; }

private:
    double r_;
};

class Rect : public Shape {
public:
    Rect(double w, double h) : Shape("rect"), w_(w), h_(h) {}
    double area() const override { return w_ * h_; }

private:
    double w_, h_;
};

void report(const Shape &s) {
    std::cout << s.name() << " area=" << s.area() << '\n';
}

int main() {
    Circle c(1);
    Rect r(2, 3);
    report(c);
    report(r);
    std::vector<const Shape *> all = {&c, &r};
    double total = 0;
    for (const Shape *s : all) total += s->area();
    std::cout << "total=" << total << '\n';
}`,
          try: R`شيل كلمة [[virtual]] من [[area]] في Shape (ومعاها override في الابنين) وشغّل: إيه اللي اتغيّر؟ ورجّعها، وفي Rect غيّر [[area() const override]] لـ [[area() override]] (من غير const): إيه الـ error؟ وبعدين ضيف class [[Square]] بيورث من Rect.`,
          flag: "script",
          deep: {
            why: R`ده أساس الـ OOP: كود بيتعامل مع «أي Shape» من غير ما يعرف كل الأنواع. تضيف نوع جديد من غير ما تلمس [[report]]. ومحركات الألعاب و GUI frameworks (Qt) مبنية بالشكل ده.`,
            how: R`كل class فيه دالة virtual بيبقى ليه جدول (vtable) فيه عناوين الدوال الـ virtual بتاعته، وكل object فيه pointer مستخبي للجدول ده (vptr، غالبًا 8 bytes زيادة). [[s.area()]] بتتحول لـ «روح للجدول بتاع الـ object وهات عنوان area». ده اسمه dynamic dispatch، وتكلفته pointer زيادة في كل object، ونداء غير مباشر الـ compiler مش دايمًا يقدر يعمله inline.

object slicing: لو بعت Circle بالقيمة لدالة بتاخد [[Shape]] (مش reference)، الجزء بتاع Circle بيتقص، واللي بيوصل Shape بس، فـ area بتاعة Shape هي اللي هتشتغل. عشان كده polymorphism لازم reference أو pointer.

[[final]] على class أو دالة بتمنع حد يورث منها أو يغطيها.`,
            when: R`لما عندك أنواع مختلفة بتشترك في نفس الواجهة، والنوع بيتحدد وقت التشغيل (أشكال في رسمة، أعداء في لعبة، طرق دفع). ولو الأنواع معروفة وقليلة فكّر في [[std::variant]]، ولو بتدوّر على إعادة استخدام كود بس، الـ composition (class جواه object من التاني) غالبًا أحسن من الوراثة.`,
            mistakes: R`تنسى [[virtual]] على الـ destructor. وتنسى [[override]] فتعمل دالة جديدة بالغلط (اسم مختلف حرف أو const ناقصة). وتبعت بالقيمة فيحصل slicing. وتنادي دالة virtual من constructor الأب وتستنى نسخة الابن: وقت constructor الأب الـ object لسه Shape بس.`
          },
          lines: [
            "cout.",
            "string.",
            "vector.",
            "الأب.",
            "public.",
            "constructor بياخد الاسم.",
            R`destructor virtual: لازم في أي أب فيه virtual.`,
            R`[[virtual]]: النسخة اللي هتشتغل بتتحدد من النوع الحقيقي.`,
            "دالة عادية مشتركة.",
            "private: حتى الأبناء ميشوفوهاش مباشرة.",
            "الاسم.",
            "قفلة.",
            R`[[: public Shape]]: Circle بيورث من Shape.`,
            "public.",
            "نادي constructor الأب الأول، وبعدين الـ member بتاعك.",
            R`[[override]]: بغطي area بتاعة الأب.`,
            "private.",
            "نص القطر.",
            "قفلة.",
            "ابن تاني.",
            "public.",
            "نفس الفكرة.",
            "مساحة المستطيل.",
            "private.",
            "العرض والطول.",
            "قفلة.",
            R`بتاخد أي Shape بـ reference، فمفيش slicing.`,
            "area هنا بتشتغل نسخة النوع الحقيقي.",
            "قفلة.",
            "main.",
            "دايرة نص قطرها 1.",
            "مستطيل 2 × 3.",
            "circle area=3.14159.",
            "rect area=6.",
            "vector من pointers للأب، كل واحد بيشاور على نوع.",
            "مجموع.",
            R`[[->]] لأن s pointer، والنداء virtual.`,
            "total=9.14159.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[circle area=3.14159]]
[[rect area=6]]
[[total=9.14159]]

من غير [[virtual]]: كل حاجة بتطلع [[area=0]] و [[total=0]]، لأن الـ compiler بيختار من نوع الـ reference (Shape).

من غير [[const]] في Rect مع [[override]]:
[[error: 'double Rect::area()' marked 'override', but does not override]]
لأن [[area() const]] و [[area()]] دالتين مختلفتين. من غير override كانت هتتعمل compile، و report كانت هتنادي نسخة Shape بهدوء.

Square: [[class Square : public Rect { public: explicit Square(double s) : Rect(s, s) {} };]]. بس الاسم هيطلع rect: لو عايز «square» محتاج constructor في Rect بياخد الاسم.`
        },
        {
          cmd: "abstract classes",
          title: "الـ abstract class والـ pure virtual (= 0): إزاي تعمل interface في C++؟",
          desc: R`أحيانًا الأب مالوش معنى لوحده: مفيش «Notifier» عام، فيه Email و SMS. فبتعمل الدالة pure virtual:
[[virtual void send(...) = 0;]]
الـ [[= 0]] معناها «مفيش تنفيذ هنا، وكل ابن لازم ينفّذها».

أي class فيه دالة pure virtual واحدة على الأقل اسمه abstract class: مينفعش تعمل منه object ([[Notifier n;]] بتبقى error). بتستخدمه كـ reference أو pointer بس.

لو كل دواله pure virtual ومفيش داتا، يبقى interface: «عقد» بيقول أي حد عايز يبقى Notifier لازم يعرف يعمل send. C++ معندهاش كلمة interface زي Java و C#، وده الشكل بتاعه.

الفايدة: الكود اللي بيستخدم الـ interface ([[notify_all]]) مش بيعرف ولا بيهتم بالأنواع الحقيقية. تقدر تضيف [[WhatsAppNotifier]] بكرة من غير ما تغيّر notify_all، وتقدر في الـ tests تبعت [[FakeNotifier]] بيسجّل الرسايل بدل ما يبعتها فعلًا.

[[{&email, &sms}]]: قايمة عناوين بتتحول لـ [[std::vector<Notifier *>]] اللي الدالة مستنياه.`,
          example: R`#include <iostream>
#include <string>
#include <vector>

class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void send(const std::string &to, const std::string &msg) = 0;
};

class EmailNotifier : public Notifier {
public:
    void send(const std::string &to, const std::string &msg) override {
        std::cout << "[email to " << to << "] " << msg << '\n';
    }
};

class SmsNotifier : public Notifier {
public:
    void send(const std::string &to, const std::string &msg) override {
        std::cout << "[sms to " << to << "] " << msg << '\n';
    }
};

void notify_all(const std::vector<Notifier *> &channels, const std::string &msg) {
    for (Notifier *n : channels) n->send("sara", msg);
}

int main() {
    EmailNotifier email;
    SmsNotifier sms;
    notify_all({&email, &sms}, "your order shipped");
}`,
          try: R`جرّب [[Notifier n;]] في main واقرا الـ error. وبعدين اعمل [[FakeNotifier]] بيحفظ الرسايل في [[std::vector<std::string> sent;]] بدل ما يطبعها، وابعته لـ notify_all، واطبع [[sent.size()]] بعدها. ده بالظبط اللي بيتعمل في الـ unit tests.`,
          flag: "script",
          deep: {
            why: R`الـ interfaces بتفصل «إيه» عن «إزاي». الكود الأساسي يعتمد على الـ interface، والتفاصيل (إيميل، SMS، قاعدة بيانات) تتغير أو تتبدّل في الـ tests. ودي فكرة dependency inversion اللي في تاب هندسة البرمجيات.`,
            how: R`الـ vtable بتاع Notifier فيه خانة لـ send من غير عنوان دالة حقيقي، فالـ compiler بيمنع أي object منه. وكل ابن بيملا الخانة. ولو ابن نسي ينفّذ دالة pure virtual، بيبقى هو كمان abstract، والـ error بيطلع لما تحاول تعمل منه object.

ممكن دالة pure virtual يبقى ليها جسم برضه، والأبناء ينادوه بـ [[Notifier::send(...)]]، بس ده نادر.

البديل من غير virtual خالص: templates أو [[concepts]] (C++20)، والنوع بيتحدد وقت الـ compile، وده أسرع بس كل نوع بيعمل نسخة من الكود.`,
            when: R`أي حتة فيها أكتر من تنفيذ لنفس الدور: طرق دفع، و storage (ملف أو سحابة)، و loggers، و plugins. وفي أي حاجة بتكلم العالم الخارجي وعايز تعمل لها fake في الـ tests.`,
            mistakes: R`تنسى الـ virtual destructor في الـ interface. وتحط داتا كتير في الـ interface فيبقى أب تقيل. وتعمل interface لحاجة ليها تنفيذ واحد بس «احتياطي»: كود زيادة من غير فايدة. وتنسى [[override]] في الأبناء.`
          },
          lines: [
            "cout.",
            "string.",
            "vector.",
            "الـ interface.",
            "public.",
            "virtual destructor.",
            R`[[= 0]]: pure virtual. مفيش تنفيذ، وكل ابن لازم يعمله.`,
            "قفلة.",
            "تنفيذ أول.",
            "public.",
            "ينفّذ send.",
            "بيطبع كأنه إيميل.",
            "قفلة الدالة.",
            "قفلة.",
            "تنفيذ تاني.",
            "public.",
            "send.",
            "بيطبع كأنه SMS.",
            "قفلة الدالة.",
            "قفلة.",
            "بتاخد أي Notifiers من غير ما تعرف نوعهم.",
            "لكل واحد: نادي send، والنسخة بتتحدد وقت التشغيل.",
            "قفلة.",
            "main.",
            "object حقيقي.",
            "تاني.",
            R`[[{&email, &sms}]] بتعمل vector من pointers.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[[email to sara] your order shipped]]
[[[sms to sara] your order shipped]]

[[Notifier n;]]:
[[error: cannot declare variable 'n' to be of abstract type 'Notifier']]
وتحتها [[note: because the following virtual functions are pure within 'Notifier']].

الـ FakeNotifier:`,
          solCode: R`#include <iostream>
#include <string>
#include <vector>

class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void send(const std::string &to, const std::string &msg) = 0;
};

class FakeNotifier : public Notifier {
public:
    std::vector<std::string> sent;
    void send(const std::string &to, const std::string &msg) override {
        sent.push_back(to + ": " + msg);
    }
};

void notify_all(const std::vector<Notifier *> &channels, const std::string &msg) {
    for (Notifier *n : channels) n->send("sara", msg);
}

int main() {
    FakeNotifier fake;
    notify_all({&fake}, "hello");
    std::cout << fake.sent.size() << ' ' << fake.sent[0] << '\n';
}`
        }
      ]
    },
    {
      t: "الـ STL: containers و iterators و algorithms",
      l: 2,
      n: "المكتبة القياسية: vector و map و set و unordered_map و deque و array، والـ iterators، والـ algorithms والـ lambdas، و auto و structured bindings",
      items: [
        {
          cmd: "الـ std::vector في C++",
          title: "std::vector: array بتكبر لوحدها (push_back و at و size و reserve و erase)",
          desc: R`[[std::vector<T>]] أهم container في C++، واختيارك الافتراضي لأي «قايمة». array على الـ heap بتكبر لوحدها وبتحرر نفسها (RAII)، والعناصر جنب بعض في الذاكرة زي array الـ C بالظبط.

[[< >]] بعد اسم الـ container بتقول نوع العناصر: [[std::vector<int>]] و [[std::vector<std::string>]].

أهم العمليات:
• [[v.push_back(x)]]: ضيف في الآخر. و [[v.emplace_back(args)]]: نفس الفكرة بس بيبني العنصر في مكانه من الـ arguments (مفيد مع الـ objects).
• [[v.size()]]: عدد العناصر. و [[v.empty()]]: فاضي ولا لأ.
• [[v[i]]]: العنصر رقم i من غير فحص حدود (سريع، و UB لو بره).
• [[v.at(i)]]: نفس الحاجة بس بتتشيّك، ولو بره بترمي exception ([[std::out_of_range]]).
• [[v.front()]] و [[v.back()]]: أول وآخر عنصر.
• [[v.pop_back()]]: شيل الأخير.
• [[v.erase(v.begin() + i)]]: شيل العنصر رقم i. [[v.begin()]] iterator لأول عنصر (الـ iterators ليها درس).
• [[v.reserve(n)]]: احجز مكان لـ n عنصر مقدمًا من غير ما تضيف. و [[v.capacity()]]: المكان المحجوز فعلًا.
• [[std::vector<int> v(5, 0)]]: خمس عناصر كلهم 0. خلي بالك: الأقواس [[( )]] غير [[{ }]]، فـ [[std::vector<int> v{5, 0}]] = عنصرين: 5 و 0.

و vector جوه vector = جدول: [[std::vector<std::vector<int>> grid(3, std::vector<int>(4, 0));]] تلات صفوف في كل صف ٤ أصفار.`,
          example: R`#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {5, 3, 8};
    v.push_back(1);
    v.emplace_back(9);
    std::cout << "size=" << v.size() << " front=" << v.front() << " back=" << v.back() << '\n';
    v[0] = 50;
    std::cout << "at(1)=" << v.at(1) << '\n';
    v.erase(v.begin() + 1);
    v.pop_back();
    for (int x : v) std::cout << x << ' ';
    std::cout << '\n';
    std::vector<int> big;
    big.reserve(1000);
    std::cout << "size=" << big.size() << " capacity=" << big.capacity() << '\n';
    std::vector<std::vector<int>> grid(2, std::vector<int>(3, 7));
    std::cout << "grid " << grid.size() << "x" << grid[0].size() << " = " << grid[1][2] << '\n';
}`,
          try: R`اعمل vector فاضي، وضيف فيه الأرقام من 1 لـ 20 بـ push_back، واطبع [[size]] و [[capacity]] بعد كل إضافة: إمتى الـ capacity بتتغير، وبكام؟ وبعدين اطبع [[v.at(100)]]، وبعدين [[v[100]]] واعمل compile بـ [[-fsanitize=address]].`,
          flag: "script",
          deep: {
            why: R`vector بيحل كل مشاكل الـ array في C: بيعرف طوله، وبيكبر لوحده، وبيحرر نفسه، وبيتنسخ صح، وبيتبعت لدالة بـ [[const &]] من غير ما يضيع الطول. ولأن العناصر جنب بعض، اللف عليه أسرع من أغلب الـ containers التانية بفرق كبير (درس الأداء في المستوى ٣). القاعدة المشهورة: استخدم vector إلا لو عندك سبب.`,
            how: R`جوه الـ vector ٣ حاجات: pointer للعناصر على الـ heap، والـ size، والـ capacity. لما الـ size يوصل للـ capacity و تعمل push_back، بيحجز مكان أكبر (في libstdc++ بتاع gcc ضعف القديم)، وينقل العناصر، ويحرر القديم. عشان كده push_back متوسطها [[O(1)]] (amortized) مع إن مرة كل فين وفين بتبقى [[O(n)]].

ونتيجة النقل ده: أي pointer أو reference أو iterator لعنصر في الـ vector بيبقى باظ بعد push_back لو حصل نقل. ده اسمه iterator invalidation.

[[erase]] من النص [[O(n)]] لأنه بيزق كل اللي بعده خطوة. ومن الآخر ([[pop_back]]) [[O(1)]].`,
            when: R`أي قايمة. لو عارف الحجم التقريبي اعمل [[reserve]] عشان توفّر النقل. ولو الحجم ثابت ومعروف وقت الـ compile ممكن [[std::array]]. ولو بتضيف وتشيل من الأول كتير [[std::deque]].`,
            mistakes: R`تحتفظ بـ pointer أو reference لعنصر وبعدين تعمل push_back. وتعمل erase جوه range-for على نفس الـ vector (درس الـ iterators). وتستخدم [[v[i]]] بـ i ممكن يبقى بره، والأحسن [[at]] وانت بتطوّر. و [[for (int i = 0; i < v.size(); i++)]]: مقارنة int بـ unsigned و [[-Wextra]] بينبّهك، استخدم range-for أو [[std::size_t]]. و [[reserve]] مش بتغيّر الـ size: [[v[0]]] بعدها لسه UB.`
          },
          lines: [
            "cout.",
            R`[[vector]].`,
            "main.",
            R`[[std::vector<int>]] بقيم أولية.`,
            "ضيف في الآخر.",
            "نفس الفكرة: بيبني العنصر في مكانه.",
            "size=5 front=5 back=9.",
            R`[[[ ]]] من غير فحص.`,
            R`[[at]] بفحص الحدود. at(1)=3.`,
            R`شيل العنصر رقم 1 (3). [[v.begin() + 1]] = iterator للعنصر التاني.`,
            "شيل الأخير (9).",
            "اللي فاضل: 50 8 1.",
            "سطر جديد.",
            "vector فاضي.",
            "احجز مكان لـ 1000 من غير ما تضيف.",
            "size=0 و capacity=1000.",
            "جدول: صفين، كل صف ٣ عناصر قيمتهم 7.",
            R`[[grid[1][2]]]: الصف التاني العنصر التالت.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[size=5 front=5 back=9]]
[[at(1)=3]]
[[50 8 1 ]]
[[size=0 capacity=1000]]
[[grid 2x3 = 7]]

الـ capacity مع gcc بتمشي 1 ثم 2 ثم 4 ثم 8 ثم 16 ثم 32: بتتضاعف لما تتملي (المعيار مش بيحدد الرقم، و MSVC بيزوّد ١.٥ مرة).

[[v.at(100)]] بترمي exception، ولو محدش مسكه البرنامج بيقف:
[[terminate called after throwing an instance of 'std::out_of_range']]
[[what():  vector::_M_range_check: __n (which is 100) >= this->size() (which is 20)]]

[[v[100]]] من غير sanitizer ممكن تطبع أي رقم وتكمّل. مع ASan: [[heap-buffer-overflow]].`
        },
        {
          cmd: "الـ map و unordered_map في C++",
          title: "std::map و std::unordered_map: تخزين key و value، والفرق بينهم، وفخ الـ []",
          desc: R`الـ map بيخزن أزواج: key و value، وتوصل للقيمة بالـ key بسرعة. زي object في JS أو dict في Python.

[[std::map<std::string, int> stock]]: المفتاح string والقيمة int.
• [[stock["book"] = 3;]]: ضيف أو عدّل.
• [[stock["pen"] += 2;]]: عدّل.
• [[stock.count("laptop")]]: 1 لو موجود و 0 لو لأ. وفي C++20 [[stock.contains("laptop")]] أوضح.
• [[stock.find("apple")]]: بترجّع iterator. لو مش موجود بيساوي [[stock.end()]]. والـ iterator بيشاور على pair: [[it->first]] المفتاح و [[it->second]] القيمة.
• [[stock.erase("pen")]]: امسح.
• اللف: [[for (const auto &p : stock)]] كل p فيه [[.first]] و [[.second]]. ([[auto]] = «الـ compiler يعرف النوع لوحده»، ليها درس.)

الفرق:
• [[std::map]]: المفاتيح مترتبة دايمًا (أبجديًا هنا)، والعمليات [[O(log n)]]. مبني على شجرة (red-black tree).
• [[std::unordered_map]]: مفيش ترتيب، والعمليات [[O(1)]] في المتوسط. مبني على hash table. أسرع في أغلب الحالات.

الفخ المشهور: [[m[key]]] لو المفتاح مش موجود بتضيفه بقيمة افتراضية (0 للأرقام، و "" للنصوص) وبعدين ترجّعها. فمجرد إنك «تبص» على مفتاح مش موجود بـ [[[ ]]] بيغيّر الـ map. للقراية بس استخدم [[find]] أو [[contains]] أو [[at]] (بترمي exception لو مش موجود).

وده بالظبط اللي بيخلي العدّ سهل: [[words[w]++]] لو w جديد بيبدأ من 0 ويبقى 1.`,
          example: R`#include <iostream>
#include <map>
#include <string>
#include <unordered_map>

int main() {
    std::map<std::string, int> stock = {{"pen", 10}, {"apple", 5}};
    stock["book"] = 3;
    stock["pen"] += 2;
    for (const auto &p : stock) std::cout << p.first << '=' << p.second << ' ';
    std::cout << '\n';
    std::cout << "laptop? " << stock.count("laptop") << '\n';
    auto it = stock.find("apple");
    if (it != stock.end()) std::cout << "apple " << it->second << '\n';
    std::unordered_map<std::string, int> words;
    for (std::string w : {"a", "b", "a", "c", "a"}) words[w]++;
    std::cout << "a appears " << words["a"] << " times, size=" << words.size() << '\n';
    int ghost = stock["ghost"];
    std::cout << "after [ghost]: size=" << stock.size() << " value=" << ghost << '\n';
}`,
          try: R`اكتب برنامج يقرا كلام من الـ input لحد ما يخلص ([[while (std::cin >> w)]]) ويطبع كل كلمة وعدد مراتها مترتبة أبجديًا. جرّبه بـ [[echo "to be or not to be" | ./app]]. وبعدين بدّل الـ map بـ unordered_map: الترتيب اتغيّر؟ وبعدين اطبع [[stock.at("ghost2")]].`,
          flag: "script",
          deep: {
            why: R`العدّ والتجميع والبحث بالـ key موجودين في كل برنامج تقريبًا، ونص مسائل الانترفيو بتتحل بـ hash map (two sum، و anagrams، و أول حرف مش متكرر). وفهم الفرق بين الشجرة والـ hash بيتسأل.`,
            how: R`[[std::map]] شجرة متوازنة: كل عنصر node لوحده على الـ heap، وكل بحث بينزل من الجذر، فـ [[O(log n)]]. والترتيب بيتحدد بـ [[<]] على المفتاح، فأي نوع ليه [[<]] ينفع مفتاح.

[[std::unordered_map]] array من «buckets». المفتاح بيعدّي على دالة hash تطلّع رقم، والرقم بيحدد الـ bucket. المتوسط [[O(1)]]، بس لو مفاتيح كتير وقعت في نفس الـ bucket ممكن يبقى [[O(n)]]. ولما يتملي بيعمل rehash (يكبر ويوزّع تاني). والمفتاح محتاج hash و [[==]]: الأنواع المدمجة و string جاهزين، ولـ struct بتاعك لازم تكتب hash.

اللف على [[unordered_map]] ترتيبه مش مضمون، وممكن يتغير بين تشغيل وتشغيل أو بين compilers.`,
            when: R`unordered_map كاختيار افتراضي للبحث والعدّ. map لما محتاج ترتيب (تطبع مترتب، أو أصغر مفتاح أكبر من x بـ [[lower_bound]]). ولو المفاتيح أرقام صغيرة من 0 لـ n، vector عادي أسرع من الاتنين.`,
            mistakes: R`تستخدم [[m[key]]] عشان تتشيّك على وجود مفتاح فتضيفه بالغلط. وتعتمد على ترتيب unordered_map. وتعمل [[m[key]]] على map نوعه [[const]]: مش هتتعمل compile لأن [[[ ]]] ممكن تضيف، استخدم [[at]] أو [[find]]. وتمسح عناصر وانت بتلف عليها بالـ range-for.`
          },
          lines: [
            "cout.",
            R`[[std::map]].`,
            "string.",
            R`[[std::unordered_map]].`,
            "main.",
            "map: المفتاح string والقيمة int، بقيم أولية.",
            R`ضيف مفتاح جديد بـ [[[ ]]].`,
            "عدّل قيمة موجودة: 12.",
            R`اللف بيطلع مترتب أبجديًا. p فيه first و second.`,
            "سطر جديد.",
            R`[[count]]: 0 لأن laptop مش موجود.`,
            R`[[find]] بترجّع iterator، أو [[end()]] لو مش موجود.`,
            R`[[it->second]]: القيمة. السهم لأن الـ iterator بيتصرف زي pointer.`,
            "hash map للعدّ.",
            R`[[words[w]++]]: الكلمة الجديدة بتبدأ من 0.`,
            "a ظهرت 3 مرات، و 3 كلمات مختلفة.",
            R`الفخ: [[[ ]]] على مفتاح مش موجود بتضيفه بـ 0.`,
            "الـ size بقى 4 بدل 3.",
            "قفلة."
          ],
          sol: R`الناتج:
[[apple=5 book=3 pen=12 ]]
[[laptop? 0]]
[[apple 5]]
[[a appears 3 times, size=3]]
[[after [ghost]: size=4 value=0]]

عدّ الكلمات مع [[echo "to be or not to be"]] بالـ map:
[[be 2]] و [[not 1]] و [[or 1]] و [[to 2]] مترتبين. بالـ unordered_map نفس الأرقام بترتيب تاني.

[[stock.at("ghost2")]] بترمي [[std::out_of_range]] برسالة [[map::at]].`,
          solCode: R`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> count;
    std::string w;
    while (std::cin >> w) count[w]++;
    for (const auto &[word, n] : count) std::cout << word << ' ' << n << '\n';
}`
        },
        {
          cmd: "set و deque و array",
          title: "containers تانية: std::array و std::set و std::deque و priority_queue، إمتى كل واحد؟",
          desc: R`غير vector و map، فيه containers لحالات معينة:

• [[std::array<int, 3>]]: array بحجم ثابت معروف وقت الـ compile (الرقم جزء من النوع). زي array الـ C بالظبط في السرعة والمكان (على الـ stack)، بس بتعرف حجمها ([[.size()]])، وبتتنسخ، وبتتبعت لدالة من غير ما تتحول لـ pointer.
• [[std::set<int>]]: مجموعة من غير تكرار ومترتبة. [[insert]] و [[erase]] و [[contains]] (C++20) [[O(log n)]]. و [[std::unordered_set]] نفس الفكرة من غير ترتيب و [[O(1)]] في المتوسط.
• [[std::deque<int>]]: «double-ended queue». زي vector بس الإضافة والشيل من الأول ([[push_front]] و [[pop_front]]) [[O(1)]] كمان.
• [[std::priority_queue<int>]]: heap. [[top()]] دايمًا أكبر عنصر، و [[push]] و [[pop]] [[O(log n)]]. ولو عايز الأصغر: [[std::priority_queue<int, std::vector<int>, std::greater<int>>]].
• [[std::stack]] و [[std::queue]]: واجهات بسيطة (adapters) فوق deque: stack بيطلع آخر واحد دخل (LIFO)، و queue أول واحد دخل (FIFO).
• [[std::list]]: linked list. نادرًا ما بيبقى الاختيار الصح (درس الأداء).

القاعدة: ابدأ بـ vector. لو محتاج «موجود ولا لأ» بسرعة: unordered_set. لو محتاج ترتيب ومن غير تكرار: set. لو بتشيل من الأول: deque. لو دايمًا عايز الأكبر أو الأصغر: priority_queue.`,
          example: R`#include <array>
#include <deque>
#include <iostream>
#include <queue>
#include <set>

int main() {
    std::array<int, 3> rgb = {255, 128, 0};
    std::cout << "rgb size=" << rgb.size() << " g=" << rgb[1] << '\n';
    std::set<int> s = {5, 1, 5, 3};
    s.insert(2);
    for (int x : s) std::cout << x << ' ';
    std::cout << "| has 3? " << s.contains(3) << '\n';
    std::deque<int> d = {2, 3};
    d.push_front(1);
    d.push_back(4);
    d.pop_front();
    std::cout << "deque front=" << d.front() << " back=" << d.back() << '\n';
    std::priority_queue<int> pq;
    for (int x : {4, 9, 1}) pq.push(x);
    std::cout << "max=" << pq.top() << '\n';
    pq.pop();
    std::cout << "next=" << pq.top() << '\n';
}`,
          try: R`اكتب دالة بتاخد [[std::vector<int>]] وترجّع عدد الأرقام المختلفة فيها بـ [[std::unordered_set]] (من غير sort). وبعدين استخدم priority_queue بالأصغر عشان تطبع أصغر ٣ أرقام من [[{7, 2, 9, 4, 1, 8}]].`,
          flag: "script",
          deep: {
            why: "اختيار الـ container الصح بيحوّل حل O(n²) لـ O(n log n) أو O(n)، وده بالظبط اللي بيتقاس في انترفيوهات الـ DSA. ومعرفة إن set مترتبة و unordered_set لأ، وإن priority_queue بتطلّع الأكبر افتراضيًا، بتوفّر bugs.",
            how: R`[[std::array]] مجرد struct جواه array الـ C، فمفيش أي تكلفة زيادة. [[std::set]] شجرة زي map بس من غير values. [[std::deque]] مقسوم chunks صغيرة، فالإضافة من الطرفين رخيصة، بس العناصر مش كلها جنب بعض. [[std::priority_queue]] binary heap جوه vector: الأكبر في الأول، وكل push أو pop بيصلّح الترتيب في [[O(log n)]].

[[std::greater<int>]] function object بيعمل [[a > b]]، فلما تديه للـ priority_queue الترتيب بيتعكس.`,
            when: R`array لحجم ثابت صغير (ألوان، إحداثيات، جدول ثابت). set لـ «مجموعة مترتبة من غير تكرار». deque لـ sliding window أو queue بتشيل من الأول. priority_queue لـ Dijkstra و «أكبر k عنصر» و الـ scheduling.`,
            mistakes: R`تستخدم [[std::list]] عشان «الإضافة في النص O(1)» وتنسى إن الوصول للنص نفسه [[O(n)]] والـ cache بيكرهها. وتفتكر إن priority_queue بتطلّع الأصغر (زي heapq في Python): هي بتطلّع الأكبر. وتعمل [[std::array<int, n>]] و n متغير: لازم ثابت وقت الـ compile.`
          },
          lines: [
            R`[[std::array]].`,
            R`[[std::deque]].`,
            "cout.",
            R`[[std::priority_queue]].`,
            R`[[std::set]].`,
            "main.",
            R`array حجمها 3 (جزء من النوع).`,
            "بتعرف حجمها.",
            "set: التكرار بيتشال، والترتيب أوتوماتيك.",
            "ضيف 2.",
            "1 2 3 5 مترتبين.",
            R`[[contains]] (C++20): 1.`,
            "deque.",
            "ضيف في الأول.",
            "وفي الآخر.",
            "شيل من الأول.",
            "front=2 back=4.",
            "heap: الأكبر فوق.",
            "ضيف 3 أرقام.",
            "max=9.",
            "شيل الأكبر.",
            "اللي بعده 4.",
            "قفلة."
          ],
          sol: R`الناتج:
[[rgb size=3 g=128]]
[[1 2 3 5 | has 3? 1]]
[[deque front=2 back=4]]
[[max=9]]
[[next=4]]

عدد المختلفين: [[std::unordered_set<int> seen(v.begin(), v.end()); return seen.size();]].
أصغر ٣ من [[{7, 2, 9, 4, 1, 8}]]: [[1 2 4]].`,
          solCode: R`#include <functional>
#include <iostream>
#include <queue>
#include <unordered_set>
#include <vector>

std::size_t count_distinct(const std::vector<int> &v) {
    std::unordered_set<int> seen(v.begin(), v.end());
    return seen.size();
}

int main() {
    std::cout << count_distinct({1, 2, 2, 3, 3, 3}) << '\n';
    std::priority_queue<int, std::vector<int>, std::greater<int>> pq;
    for (int x : {7, 2, 9, 4, 1, 8}) pq.push(x);
    for (int i = 0; i < 3; ++i) {
        std::cout << pq.top() << ' ';
        pq.pop();
    }
    std::cout << '\n';
}`
        },
        {
          cmd: "auto و structured bindings",
          title: "auto و range-for و structured bindings (auto [a, b]) و std::pair و std::tuple",
          desc: R`[[auto]]: الـ compiler يستنتج النوع من القيمة. [[auto x = 5;]] = int، و [[auto it = m.find(k);]] بدل [[std::map<std::string, int>::iterator it]]. النوع لسه ثابت وقت الـ compile، دي مش variable زي JS.

بس [[auto]] بتنسخ: [[auto s = name;]] نسخة. لو مش عايز نسخة: [[const auto &s = name;]]. ونفس الكلام في الـ range-for:
• [[for (auto x : v)]]: نسخة من كل عنصر (تمام للأرقام).
• [[for (const auto &x : v)]]: من غير نسخ ومن غير تعديل (للـ strings والـ objects).
• [[for (auto &x : v)]]: من غير نسخ وتقدر تعدّل العناصر.

[[std::pair<A, B>]]: قيمتين مع بعض، [[.first]] و [[.second]]. و [[std::tuple<A, B, C>]]: أي عدد، وتوصل بـ [[std::get<0>(t)]].

structured bindings (C++17): تفك pair أو tuple أو struct لمتغيرات بأسماء في سطر واحد:
• [[auto [lo, hi] = min_max(9, 4);]]
• [[for (const auto &[name, score] : scores)]]: كل عنصر في الـ map بقى [[name]] و [[score]] بدل [[p.first]] و [[p.second]].

ودي طريقة نضيفة ترجّع بيها أكتر من قيمة من دالة: رجّع pair أو tuple أو struct، وفكّه عند النداء.`,
          example: R`#include <iostream>
#include <map>
#include <string>
#include <tuple>
#include <utility>

std::pair<int, int> min_max(int a, int b) {
    if (a < b) return {a, b};
    return {b, a};
}

std::tuple<std::string, int, bool> load_user() {
    return {"Sara", 22, true};
}

int main() {
    auto [lo, hi] = min_max(9, 4);
    std::cout << lo << ' ' << hi << '\n';
    auto [name, age, active] = load_user();
    std::cout << name << ' ' << age << ' ' << active << '\n';
    std::map<std::string, int> score = {{"ali", 7}, {"mona", 9}};
    for (auto &[who, pts] : score) pts += 1;
    for (const auto &[who, pts] : score) std::cout << who << ':' << pts << ' ';
    std::cout << '\n';
    auto p = std::make_pair(1, 2.5);
    std::cout << p.first << ' ' << p.second << ' ' << std::get<0>(load_user()) << '\n';
}`,
          try: R`غيّر [[for (auto &[who, pts] : score)]] لـ [[for (auto [who, pts] : score)]] (من غير [[&]]): الأرقام لسه بتزيد؟ ليه؟ وبعدين اكتب struct [[Stats { int min; int max; double avg; };]] ودالة بترجّعه من vector، وفكّه بـ [[auto [mn, mx, avg] = stats(v);]].`,
          flag: "script",
          deep: {
            why: R`أنواع C++ ممكن تبقى طويلة جدًا (خصوصًا مع الـ iterators والـ templates)، و auto بتخلي الكود يتقري. والـ structured bindings بتخلي اللف على map ورجوع أكتر من قيمة واضحين، بدل [[.first]] و [[.second]] اللي محدش فاكر مين فيهم إيه.`,
            how: R`[[auto]] بتتبع نفس قواعد الـ templates: بتشيل الـ [[&]] والـ [[const]] من القيمة. فـ [[auto x = some_const_ref;]] بتعمل نسخة عادية. عشان كده لازم تكتب [[auto &]] أو [[const auto &]] بإيدك.

structured binding بيعمل object واحد مستخبي، والأسماء بتبقى أسماء لأجزائه. فـ [[auto &[who, pts]]] الـ object المستخبي reference للعنصر الأصلي، و pts بيشاور على الـ value جوه الـ map فعلًا. ومن غير [[&]] بيبقى نسخة.

عناصر الـ map نوعها [[std::pair<const std::string, int>]]: المفتاح const، فـ [[who]] مينفعش يتغير حتى مع [[&]].`,
            when: R`[[auto]] لما النوع واضح من السطر نفسه أو طويل ومش مهم (iterators و lambdas). اكتب النوع صريح لو بيوضّح المعنى ([[int count = 0;]]). و structured bindings في أي لف على map، وأي دالة بترجّع أكتر من قيمة.`,
            mistakes: R`[[for (auto x : v)]] على vector من strings كبيرة: نسخة كل لفة. و [[auto x = {1, 2};]] نوعها [[std::initializer_list<int>]] مش vector. وتستخدم tuple بـ ٥ قيم: الأحسن struct بأسماء. وتفتكر إن [[auto]] بتخلي المتغير يغيّر نوعه بعدين.`
          },
          lines: [
            "cout.",
            "map.",
            "string.",
            R`[[std::tuple]].`,
            R`[[std::pair]].`,
            "دالة بترجّع قيمتين في pair.",
            R`[[{a, b}]] بيعمل pair.`,
            "الترتيب العكسي.",
            "قفلة.",
            "tuple بـ ٣ أنواع مختلفة.",
            "بيعمل tuple من القيم.",
            "قفلة.",
            "main.",
            R`structured binding: فك الـ pair لاسمين.`,
            "4 9.",
            "فك tuple لـ ٣ أسماء.",
            R`Sara 22 1 (bool بيتطبع 1).`,
            "map.",
            R`[[auto &]]: pts reference للقيمة جوه الـ map، فالتعديل حقيقي.`,
            R`[[const auto &]]: قراية بس من غير نسخ.`,
            "سطر جديد.",
            R`[[make_pair]]: النوع اتستنتج pair<int, double>.`,
            R`[[std::get<0>]]: أول عنصر في الـ tuple.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[4 9]]
[[Sara 22 1]]
[[ali:8 mona:10 ]]
[[1 2.5 Sara]]

من غير [[&]] الأرقام مش بتزيد (هتطبع [[ali:7 mona:9]])، لأن pts بقى نسخة من القيمة، والتعديل حصل في النسخة. و gcc 14 بـ [[-Wall -Wextra]] مبيقولش ولا كلمة، فالغلطة دي لازم تاخد بالك منها بنفسك.`,
          solCode: R`#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

struct Stats {
    int min;
    int max;
    double avg;
};

Stats stats(const std::vector<int> &v) {
    auto [mn, mx] = std::minmax_element(v.begin(), v.end());
    double avg = std::accumulate(v.begin(), v.end(), 0.0) / v.size();
    return {*mn, *mx, avg};
}

int main() {
    auto [mn, mx, avg] = stats({4, 8, 1, 7});
    std::cout << mn << ' ' << mx << ' ' << avg << '\n';
}`
        },
        {
          cmd: "iterators",
          title: "الـ iterators: begin و end و ++it و *it، وإزاي تمسح من container وانت بتلف عليه",
          desc: R`الـ iterator «إصبع» بيشاور على عنصر في container، وبيتصرف زي pointer:
• [[*it]]: العنصر نفسه. و [[it->member]] لو العنصر struct أو pair.
• [[++it]]: العنصر اللي بعده.
• [[v.begin()]]: أول عنصر. و [[v.end()]]: «واحد بعد الآخر»، مش عنصر حقيقي، فمتعملش عليه [[*]]. بيستخدم كعلامة نهاية بس.
• [[v.rbegin()]] و [[v.rend()]]: نفس الفكرة بالعكس.

ده نفس اللف بالـ pointers اللي في درس pointer arithmetic في C بالظبط: [[for (int *it = arr; it != arr + 4; it++)]]. الـ iterators عمّموا الفكرة على كل الـ containers، حتى اللي عناصرها مش جنب بعض زي map و list. والـ range-for ([[for (int x : v)]]) بيتحول لـ loop بالـ iterators من جوه.

مش كل الـ iterators زي بعض:
• vector و array و deque: random access. تقدر تعمل [[it + 2]] و [[it - v.begin()]] (المسافة).
• list و map و set: bidirectional، [[++]] و [[--]] بس.

المسح وانت بتلف: [[v.erase(it)]] بتبوّظ الـ iterator ده (وأي iterator بعده في الـ vector). عشان كده erase بترجّع iterator للعنصر اللي بعد اللي اتمسح، وتكمّل منه. ومتزودش [[++it]] في اللفة دي.

وفي C++20 فيه [[std::erase_if(v, condition)]] بتعمل الحكاية دي كلها في سطر.`,
          example: R`#include <iostream>
#include <list>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 30, 40};
    for (auto it = v.begin(); it != v.end(); ++it) std::cout << *it << ' ';
    std::cout << '\n';
    auto it = v.begin() + 2;
    std::cout << "*it=" << *it << " index=" << (it - v.begin()) << '\n';
    for (auto r = v.rbegin(); r != v.rend(); ++r) std::cout << *r << ' ';
    std::cout << '\n';
    for (auto e = v.begin(); e != v.end();) {
        if (*e % 20 == 0) e = v.erase(e);
        else ++e;
    }
    for (int x : v) std::cout << x << ' ';
    std::cout << '\n';
    std::list<int> l = {1, 2, 3};
    auto li = l.begin();
    ++li;
    l.insert(li, 99);
    for (int x : l) std::cout << x << ' ';
    std::cout << '\n';
}`,
          try: R`اكتب نفس loop المسح بس بـ range-for ([[for (int x : v) if (...) v.erase(...)]]) واعمل compile بـ [[-fsanitize=address]]: إيه اللي حصل؟ وبعدين اعمل نفس المسح بسطر واحد بـ [[std::erase_if(v, [](int x) { return x % 20 == 0; });]]. وجرّب [[auto li2 = l.begin() + 1;]] على الـ list.`,
          flag: "script",
          deep: {
            why: R`الـ iterators هما اللغة المشتركة بين الـ containers والـ algorithms: [[std::sort(v.begin(), v.end())]] مش عارفة إنها شغالة على vector، هي شايفة iterators بس. فلو فهمتهم، المكتبة كلها هتبقى مفهومة. وأخطاء الـ iterator invalidation من أشهر أسباب الـ crashes في C++.`,
            how: R`في vector، الـ iterator غالبًا pointer مغلّف، فمفيش تكلفة. في map، الـ iterator بيشاور على node في الشجرة، و [[++]] بيمشي للعنصر اللي بعده بالترتيب.

الـ invalidation: vector لما يكبر بينقل كل العناصر، فكل الـ iterators القديمة بتبوّظ. وerase بيزق اللي بعده خطوة. في list و map، المسح بيبوّظ الـ iterator بتاع العنصر الممسوح بس، والإضافة مش بتبوّظ حاجة.

[[++it]] مقابل [[it++]]: الاتنين بيمشوا خطوة. [[it++]] بيرجّع نسخة من القديم، فلو مش محتاجها [[++it]] أنظف، وده سبب إنك هتشوفها كتير في كود C++.`,
            when: R`الـ range-for لما بتلف على كل حاجة من غير تعديل الـ container. الـ iterators الصريحة لما تمسح أو تضيف وانت بتلف، أو تلف على جزء، أو تبعت مدى لـ algorithm. وفي C++20 الـ ranges ([[std::ranges::sort(v)]]) بتخبي begin و end.`,
            mistakes: R`[[*v.end()]]. و erase جوه range-for. وتحتفظ بـ iterator بعد push_back. وتقارن iterators من containers مختلفة. و [[it + 2]] على list أو map: مش هتتعمل compile، استخدم [[std::next(it, 2)]].`
          },
          lines: [
            "cout.",
            R`[[std::list]]: linked list.`,
            "vector.",
            "main.",
            "4 عناصر.",
            R`لف بالـ iterator: من begin لحد end، و [[*it]] العنصر.`,
            "سطر جديد.",
            "iterator للعنصر التالت.",
            "30، والمسافة من البداية 2.",
            "لف بالعكس.",
            "سطر جديد.",
            R`loop من غير [[++e]] في الهيدر، عشان المسح بيتحكم فيها.`,
            R`[[erase]] بترجّع iterator للعنصر اللي بعد الممسوح.`,
            "لو مفيش مسح امشي خطوة.",
            "قفلة.",
            "اللي فاضل: 10 30.",
            "سطر جديد.",
            "linked list.",
            "iterator لأول عنصر.",
            R`[[++]] بس: list مفيهاش [[+ 1]].`,
            "insert قبل العنصر اللي li بيشاور عليه.",
            "1 99 2 3.",
            "سطر جديد.",
            "قفلة."
          ],
          sol: R`الناتج:
[[10 20 30 40 ]]
[[*it=30 index=2]]
[[40 30 20 10 ]]
[[10 30 ]]
[[1 99 2 3 ]]

المسح جوه range-for ([[for (int x : v) if (x % 20 == 0) v.erase(std::find(v.begin(), v.end(), x));]]): undefined behavior. عندي طبع [[10]] بس بدل [[10 30]]، ومن غير أي error حتى مع ASan، لأن erase مش بتحرر ذاكرة الـ vector فمفيش حاجة «ممنوعة» اتلمست. السبب إن الـ range-for ماسك iterator ومستني end قديمة، وبعد الـ erase العناصر اتزقت فبيفوّت عناصر ويقرا بعد الآخر الجديد. الغلط الصامت ده أسوأ من crash.

[[l.begin() + 1]] على list:
[[error: no match for 'operator+']]
الحل [[std::next(l.begin(), 1)]].`
        },
        {
          cmd: "algorithms و lambdas",
          title: "std::sort و find و count_if و transform و accumulate مع الـ lambdas ([](int x) { ... })",
          desc: R`[[<algorithm>]] و [[<numeric>]] فيهم أكتر من ١٠٠ دالة جاهزة شغالة على أي مدى [[(begin, end)]]. بدل ما تكتب loop كل مرة، بتنادي اسم بيقول انت بتعمل إيه:
• [[std::sort(b, e)]]: ترتيب [[O(n log n)]].
• [[std::find(b, e, value)]]: بترجّع iterator لأول عنصر بيساوي value، أو e لو مش موجود.
• [[std::count_if(b, e, pred)]]: كام عنصر الشرط صح عليه.
• [[std::transform(b, e, out, f)]]: طبّق f على كل عنصر واكتب الناتج في out.
• [[std::accumulate(b, e, init)]] (من numeric): المجموع. ونوع init بيحدد نوع النتيجة: [[0]] int، و [[0LL]] long long، و [[0.0]] double.
• وفيه [[min_element]] و [[max_element]] و [[reverse]] و [[unique]] و [[binary_search]] و [[any_of]] و [[all_of]] وغيرهم.

الـ lambda دالة صغيرة من غير اسم بتكتبها مكان ما هتستخدمها:
[[[](int x) { return x > 4; }]]
• [[[ ]]]: الـ capture list: متغيرات من بره الـ lambda عايزها جوه. فاضية = مش محتاج حاجة.
• [[[factor]]]: خد نسخة من factor.
• [[[&calls]]]: خد calls بالـ reference، فالتعديل جوه بيأثر بره.
• [[[=]]] كله نسخ، و [[[&]]] كله reference.
• بعد كده parameters و جسم زي أي دالة.

مع [[std::sort]] تقدر تدي lambda بتقارن عنصرين وترجّع true لو الأول يتحط الأول: [[[](const Product &a, const Product &b) { return a.price > b.price; }]] = من الأغلى للأرخص.`,
          example: R`#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

struct Product {
    std::string name;
    double price;
};

int main() {
    std::vector<int> v = {5, 2, 9, 1, 7};
    std::sort(v.begin(), v.end());
    auto it = std::find(v.begin(), v.end(), 7);
    std::cout << "7 at index " << (it - v.begin()) << '\n';
    int sum = std::accumulate(v.begin(), v.end(), 0);
    auto big = std::count_if(v.begin(), v.end(), [](int x) { return x > 4; });
    std::cout << "sum=" << sum << " big=" << big << '\n';
    int factor = 10;
    std::vector<int> scaled(v.size());
    std::transform(v.begin(), v.end(), scaled.begin(), [factor](int x) { return x * factor; });
    std::cout << scaled.front() << ".." << scaled.back() << '\n';
    std::vector<Product> items = {{"pen", 5}, {"bag", 120}, {"book", 60}};
    std::sort(items.begin(), items.end(),
              [](const Product &a, const Product &b) { return a.price > b.price; });
    for (const auto &p : items) std::cout << p.name << ' ';
    std::cout << '\n';
    int calls = 0;
    auto counter = [&calls]() { ++calls; };
    counter();
    counter();
    std::cout << "calls=" << calls << '\n';
}`,
          try: R`على [[items]]: (1) رتّبهم بالاسم أبجديًا. (2) اعرف هل فيه منتج أغلى من 100 بـ [[std::any_of]]. (3) احسب مجموع الأسعار بـ accumulate (خلي بالك من نوع الـ init). وبعدين غيّر [[[&calls]]] لـ [[[calls]]]: إيه اللي حصل؟`,
          flag: "script",
          deep: {
            why: R`[[std::count_if(..., x > 4)]] بتقول «بعدّ اللي أكبر من 4» من أول نظرة، والـ loop بإيدك محتاج تقراه كله عشان تفهمه. والـ algorithms متختبرة كويس ومحسّنة: [[std::sort]] في gcc مثلًا introsort (quicksort بيتحول لـ heapsort لو الحالة وحشة)، فمضمون [[O(n log n)]].`,
            how: R`الـ lambda الـ compiler بيحوّلها لـ class صغير مستخبي جواه الـ captures كـ members، و [[operator()]] فيه جسمها. فـ [[[factor](int x) { ... }]] كأنها object جواه نسخة من factor. وعشان النوع معروف وقت الـ compile، الـ compiler يقدر يعملها inline جوه sort، فبتبقى أسرع غالبًا من [[qsort]] بتاعة C اللي بتاخد pointer لدالة.

الـ capture بالنسخة بتاخد القيمة وقت ما الـ lambda اتعملت، والنسخة جوه const افتراضيًا (عشان تعدّلها لازم [[mutable]]). الـ capture بالـ reference لازم المتغير الأصلي يفضل عايش طول ما الـ lambda ممكن تتنادى.

[[std::count_if]] بترجّع [[std::ptrdiff_t]] مش int، عشان كده [[auto big]].`,
            when: R`أي loop ليه اسم معروف (بحث، عدّ، ترتيب، تحويل، مجموع). اكتب loop بإيدك لو المنطق مش بيتطابق مع algorithm واضح. والـ lambdas في الـ algorithms، والـ callbacks، والـ threads (المستوى ٣). وفي C++20 فيه نسخ ranges: [[std::ranges::sort(v)]] من غير begin و end.`,
            mistakes: R`[[std::accumulate(v.begin(), v.end(), 0)]] على vector من double: الـ init int، فكل جمع بيتقرّب لـ int. استخدم [[0.0]]. و [[std::transform]] لـ vector فاضي من غير ما تحجز مكان (اعمله بالحجم، أو استخدم [[std::back_inserter]]). و lambda بتعمل capture بالـ reference لمتغير محلي وبتعيش بعده (dangling). ودالة مقارنة في sort بترجّع [[<=]] بدل [[<]]: undefined behavior وممكن يقع.`
          },
          lines: [
            R`[[sort]] و [[find]] و [[count_if]] و [[transform]].`,
            "cout.",
            R`[[accumulate]].`,
            "string.",
            "vector.",
            "struct.",
            "الاسم.",
            "السعر.",
            "قفلة.",
            "main.",
            "أرقام مش مترتبة.",
            "رتّب: 1 2 5 7 9.",
            "دوّر على 7.",
            "المسافة من البداية: 3.",
            R`المجموع، و [[0]] = int.`,
            R`lambda من غير captures: كام واحد أكبر من 4؟ (3).`,
            "sum=24 big=3.",
            "متغير هنستخدمه جوه lambda.",
            "vector بنفس الحجم عشان transform تكتب فيه.",
            R`[[[factor]]]: خد نسخة من factor جوه الـ lambda.`,
            "10..90.",
            "vector من structs.",
            "رتّب بدالة مقارنة...",
            "...الأغلى الأول.",
            "bag book pen.",
            "سطر جديد.",
            "عدّاد.",
            R`[[[&calls]]]: بالـ reference، فالتعديل بيوصل لـ calls الأصلي.`,
            "نداء.",
            "نداء.",
            "calls=2.",
            "قفلة."
          ],
          sol: R`الناتج:
[[7 at index 3]]
[[sum=24 big=3]]
[[10..90]]
[[bag book pen ]]
[[calls=2]]

بالاسم: [[[](const Product &a, const Product &b) { return a.name < b.name; }]] = [[bag book pen]] (صدفة نفس الترتيب هنا).
[[std::any_of(items.begin(), items.end(), [](const Product &p) { return p.price > 100; })]] = true.
المجموع: [[std::accumulate(..., 0.0, [](double s, const Product &p) { return s + p.price; })]] = 185.

مع [[[calls]]] بالنسخة: [[error: increment of read-only variable 'calls']]، لأن النسخة جوه الـ lambda const. ولو حطيت [[mutable]] هتتعمل compile بس calls بره هتفضل 0.`
        }
      ]
    },
    {
      t: "templates و errors و CMake",
      l: 2,
      n: "كود generic بالـ templates و concepts، والأخطاء بالـ exceptions و optional و variant، وتنظيم المشروع بـ CMake",
      items: [
        {
          cmd: "القوالب Templates والبرمجة العامة",
          title: "الـ templates: دالة أو class واحدة تشتغل مع أي نوع، و concepts بتحدد الأنواع المسموحة",
          desc: R`لو كتبت [[max_of]] لـ int، وبعدين محتاجها لـ double و string، مش هتكتبها ٣ مرات. الـ template «قالب» الـ compiler بيعمل منه نسخة لكل نوع بتستخدمه:
[[template <typename T>]]
[[T max_of(const std::vector<T> &items) { ... }]]
• [[template <typename T>]]: اللي جاي ده قالب، و T اسم لنوع لسه مش معروف.
• لما تنادي [[max_of(std::vector<int>{...})]]، الـ compiler بيستنتج إن T = int ويعمل نسخة بـ int.
• وتقدر تحدده صريح: [[max_of<double>(...)]].

الـ class template بنفس الفكرة: [[Box<double> b(2.5);]] وهنا لازم تكتب النوع بين [[< >]] (أو تسيب الـ compiler يستنتجه من الـ constructor في C++17). [[std::vector<int>]] و [[std::map<K, V>]] نفسهم class templates.

المشكلة: الـ template بيقبل أي نوع، ولو النوع مينفعش (مفيهوش [[>]] مثلًا) الـ error بيطلع من جوه الـ template، وبيبقى طويل ومش مفهوم.

الحل في C++20: concepts. شرط على النوع بيتفحص عند النداء:
[[template <typename T> concept Number = std::integral<T> || std::floating_point<T>;]]
[[template <Number T> T twice(T x)]]
لو بعت string، الـ error بيبقى سطرين واضحين: «الشرط Number مش متحقق».`,
          example: R`#include <concepts>
#include <iostream>
#include <string>
#include <vector>

template <typename T>
T max_of(const std::vector<T> &items) {
    T best = items.front();
    for (const T &x : items)
        if (x > best) best = x;
    return best;
}

template <typename T>
class Box {
public:
    explicit Box(T value) : value_(value) {}
    T get() const { return value_; }

private:
    T value_;
};

template <typename T>
concept Number = std::integral<T> || std::floating_point<T>;

template <Number T>
T twice(T x) { return x * 2; }

int main() {
    std::cout << max_of(std::vector<int>{3, 9, 2}) << '\n';
    std::cout << max_of(std::vector<std::string>{"pear", "apple", "zoo"}) << '\n';
    Box<double> b(2.5);
    std::cout << b.get() << ' ' << twice(21) << ' ' << twice(1.5) << '\n';
}`,
          try: R`ضيف [[twice(std::string("x"))]] واقرا الـ error. وبعدين شيل [[Number]] وخليها [[template <typename T>]] وجرّب نفس النداء: الـ error بقى أطول؟ وبعدين اكتب template [[Pair<A, B>]] بسيط فيه [[first]] و [[second]]، ودالة [[swap_values]] template.`,
          flag: "script",
          deep: {
            why: R`المكتبة القياسية كلها templates: كل container وكل algorithm بيشتغل مع أي نوع وبنفس سرعة الكود المكتوب بإيدك، لأن الـ compiler بيعمل نسخة خاصة لكل نوع (مش زي generics في Java اللي بتشيل النوع وقت التشغيل). وانت هتستخدم templates كل يوم حتى لو مش هتكتبها كتير.`,
            how: R`الـ template مش كود لوحده، ده وصفة. الكود الحقيقي بيتولد لما تستخدمه بنوع (instantiation). عشان كده الـ templates لازم جسمها كله يبقى في الـ header: الملف اللي بيستخدمها لازم يشوف الوصفة كاملة عشان يولّد النسخة.

الضريبة: كل نوع = نسخة، فالملف التنفيذي بيكبر والـ compile بيبطأ لو الـ templates كتير.

[[std::integral<T>]] و [[std::floating_point<T>]] concepts جاهزة في [[<concepts>]]. وفيه كتابة أقصر في C++20: [[auto twice(Number auto x)]].

[[typename]] و [[class]] جوه [[template < >]] نفس المعنى.`,
            when: R`لما نفس المنطق بالظبط بيشتغل مع أنواع مختلفة: containers، و algorithms، و wrappers. مش لأي دالة «احتياطي». وضيف concepts لأي template عام عشان الأخطاء تبقى مفهومة.`,
            mistakes: R`تحط تعريف دالة template في [[.cpp]] والـ prototype في الـ header: [[undefined reference]] وقت الـ link. وتكتب templates معقدة لحاجة نوعين بس، والـ overloading كان أبسط. وتستسلم قدام error template طويل: دوّر على أول سطر فيه «required from here» في ملفك انت، وعلى كلمة [[error]] الأولى.`
          },
          lines: [
            R`[[concepts]]: فيها std::integral و std::floating_point.`,
            "cout.",
            "string.",
            "vector.",
            R`[[template <typename T>]]: T نوع هيتحدد وقت الاستخدام.`,
            "دالة بتشتغل على vector من أي نوع.",
            "أول عنصر.",
            "لف على الكل.",
            R`محتاجة [[>]] على T.`,
            "رجّع الأكبر.",
            "قفلة.",
            "class template.",
            "class.",
            "public.",
            "constructor.",
            "getter.",
            "private.",
            "member من النوع T.",
            "قفلة.",
            R`concept: شرط على T.`,
            "رقم صحيح أو عشري.",
            R`[[Number T]] بدل [[typename T]]: النوع لازم يحقق الشرط.`,
            "دالة صغيرة.",
            "main.",
            "T = int: 9.",
            R`T = std::string: الأكبر أبجديًا zoo.`,
            R`[[Box<double>]]: النوع صريح.`,
            "2.5 و 42 و 3.",
            "قفلة."
          ],
          sol: R`الناتج:
[[9]]
[[zoo]]
[[2.5 42 3]]

[[twice(std::string("x"))]] مع concept:
[[error: no matching function for call to 'twice(std::string)']]
وتحتها [[note: constraints not satisfied]] و [[note: no operand of the disjunction is satisfied]] (يعني ولا شرط من اللي بينهم [[||]] اتحقق). واضح: النوع مش Number.

من غير concept: الـ error بيطلع من جوه [[twice]] نفسها:
[[error: no match for 'operator*' (operand types are 'std::__cxx11::basic_string<char>' and 'int')]]
(string مفيهوش ضرب في رقم)، ومعاه سطور كتير عن كل نسخ [[operator*]] اللي جرّبها. ولاحظ اسم النوع الحقيقي لـ std::string جوه الـ compiler.`,
          solCode: R`#include <iostream>
#include <string>

template <typename A, typename B>
struct Pair {
    A first;
    B second;
};

template <typename T>
void swap_values(T &a, T &b) {
    T tmp = a;
    a = b;
    b = tmp;
}

int main() {
    Pair<std::string, int> p{"age", 22};
    std::cout << p.first << '=' << p.second << '\n';
    std::string x = "left", y = "right";
    swap_values(x, y);
    std::cout << x << ' ' << y << '\n';
}`
        },
        {
          cmd: "exceptions",
          title: "الـ exceptions: throw و try و catch، وليه تمسك بـ const &، وإمتى noexcept",
          desc: R`لما دالة تلاقي مشكلة متقدرش تحلها (input غلط، ملف مش موجود)، تقدر «ترمي» exception بدل ما ترجّع رقم خطأ:
[[throw std::invalid_argument("division by zero");]]
التنفيذ بيقف في نفس اللحظة، ويطلع من الدوال واحدة ورا التانية لحد ما يلاقي [[try]] ليه [[catch]] مناسب:
[[try { ... } catch (const std::invalid_argument &e) { ... }]]
• [[e.what()]]: الرسالة اللي اتبعتت مع الـ throw.
• امسك بـ [[const &]] دايمًا: من غير نسخ، ومن غير slicing (لو مسكت بالقيمة كنوع الأب، الجزء بتاع الابن بيتقص).
• الـ catch بيتفحص بالترتيب، فحط الأنواع المحددة الأول والعامة ([[std::exception]]) في الآخر.
• [[catch (...)]] بيمسك أي حاجة، بس مش هتعرف هي إيه.

الأنواع الجاهزة في [[<stdexcept>]]: [[std::invalid_argument]] و [[std::out_of_range]] و [[std::runtime_error]] و [[std::logic_error]]، وكلهم بيورثوا من [[std::exception]]. والمكتبة نفسها بترمي: [[std::stoi("abc")]] بترمي invalid_argument، و [[v.at(99)]] بترمي out_of_range، و [[new]] لو الذاكرة خلصت بترمي [[std::bad_alloc]].

لو exception طلع ومحدش مسكه، البرنامج بيتقفل بـ [[std::terminate]].

وهنا RAII بيبان: وانت طالع من الدوال بسبب الـ exception، كل الـ objects المحلية بيتنادى الـ destructor بتاعها، فالملفات بتتقفل والذاكرة بترجع.

[[noexcept]] بعد دالة: «الدالة دي مش هترمي». لو رمت رغم كده، terminate على طول. مهمة جدًا لـ move constructors (المستوى ٣).`,
          example: R`#include <iostream>
#include <stdexcept>
#include <string>

double divide(double a, double b) {
    if (b == 0) throw std::invalid_argument("division by zero");
    return a / b;
}

int parse_age(const std::string &text) {
    int age = std::stoi(text);
    if (age < 0 || age > 150) throw std::out_of_range("age must be 0..150");
    return age;
}

int main() {
    try {
        std::cout << divide(10, 4) << '\n';
        std::cout << divide(1, 0) << '\n';
        std::cout << "never printed\n";
    } catch (const std::invalid_argument &e) {
        std::cout << "invalid: " << e.what() << '\n';
    }
    for (std::string input : {"30", "abc", "200"}) {
        try {
            int age = parse_age(input);
            std::cout << "age " << age << '\n';
        } catch (const std::exception &e) {
            std::cout << input << " -> error: " << e.what() << '\n';
        }
    }
}`,
          try: R`شيل الـ try و catch اللي حوالين [[divide(1, 0)]] وشغّل: البرنامج قال إيه، و exit code كام؟ وبعدين اكتب class [[InsufficientFunds]] بيورث من [[std::runtime_error]] وارميه من [[withdraw]] في حساب بنكي وامسكه في main. وجرّب [[std::stoi("99999999999")]].`,
          flag: "script",
          deep: {
            why: R`في C كل دالة بترجّع كود خطأ، وكل نداء محتاج [[if]]، ولو نسيت واحدة الغلط بيعدّي بهدوء. الـ exception مينفعش يتنسي: لو محدش مسكه البرنامج بيقف. وبتفصل الكود العادي عن كود الأخطاء.`,
            how: R`لما exception يترمي، الـ runtime بيعمل stack unwinding: بيرجع frame frame، وفي كل frame بينادي الـ destructors بتاعة الـ objects المحلية، لحد ما يلاقي catch مطابق.

في الـ compilers الحديثة (zero-cost model)، الكود اللي مبيرميش مالوش تقريبًا أي تكلفة وقت التشغيل. بس الرمي نفسه بطيء (ممكن آلاف المرات أبطأ من return عادي). عشان كده الـ exceptions للحالات الاستثنائية فعلًا، مش للتحكم العادي في الـ flow.

ملحوظة عن الترتيب: [[std::cout << "age " << parse_age(input)]] كانت هتطبع [[age]] الأول وبعدين ترمي، لأن [[<<]] بتتنفذ من الشمال لليمين (من C++17). عشان كده حسبنا القيمة في متغير الأول.

بعض المشاريع (ألعاب، و embedded، وجوجل في كود C++ قديم عندها) بتقفل الـ exceptions خالص ([[-fno-exceptions]]) وبتستخدم error codes أو [[std::expected]] (C++23).`,
            when: R`للأخطاء اللي الدالة متقدرش تتعامل معاها والنداء اللي فوقها هو اللي يقرر (ملف مش موجود، داتا بايظة، invariant اتكسر). مش لحاجة متوقعة تحصل كتير (زي «المستخدم مش موجود» في بحث): دي [[std::optional]] (الدرس الجاي).`,
            mistakes: R`[[catch (std::exception e)]] بالقيمة: نسخ و slicing. و [[catch (...)]] وتبلع الخطأ من غير ما تسجّله. وترمي من destructor. وتستخدم exceptions كـ if عادي في loop سريع. وترمي pointer ([[throw new X]]): ارمي object.`
          },
          lines: [
            "cout.",
            R`[[stdexcept]]: أنواع الـ exceptions الجاهزة.`,
            R`string و [[std::stoi]].`,
            "دالة ممكن ترمي.",
            R`[[throw]]: وقف هنا واطلع لحد أقرب catch.`,
            "لو مفيش مشكلة.",
            "قفلة.",
            "دالة تانية.",
            R`[[std::stoi]] نفسها بترمي invalid_argument لو النص مش رقم.`,
            "ارمي لو الرقم بره الحدود.",
            "رجّع.",
            "قفلة.",
            "main.",
            R`[[try]]: الكود اللي ممكن يرمي.`,
            "2.5.",
            "بترمي، فالسطر ده مش هيكمّل.",
            "مش هيتطبع.",
            R`[[catch]] بـ [[const &]]: النوع لازم يطابق.`,
            R`[[what()]]: الرسالة.`,
            "قفلة.",
            "لف على ٣ نصوص.",
            "try لكل واحد.",
            "احسب الأول (عشان مفيش حاجة تتطبع لو رمت).",
            "اطبع لو نجحت.",
            R`[[std::exception]]: الأب، بيمسك الاتنين.`,
            "اطبع الرسالة.",
            "قفلة الـ catch.",
            "قفلة الـ for.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[2.5]]
[[invalid: division by zero]]
[[age 30]]
[[abc -> error: stoi]]
[[200 -> error: age must be 0..150]]
(رسالة [[stoi]] دي من libstdc++ بتاع gcc. مع compilers تانية ممكن تختلف.)

من غير try حوالين divide:
[[terminate called after throwing an instance of 'std::invalid_argument']]
[[what():  division by zero]]
والبرنامج بيقف بـ [[Aborted]] و exit code 134.

[[std::stoi("99999999999")]] بترمي [[std::out_of_range]] لأن الرقم مش داخل في int.`,
          solCode: R`#include <iostream>
#include <stdexcept>
#include <string>

class InsufficientFunds : public std::runtime_error {
public:
    InsufficientFunds(double need, double have)
        : std::runtime_error("need " + std::to_string(need) + " but have " + std::to_string(have)) {}
};

class Account {
public:
    void withdraw(double amount) {
        if (amount > balance_) throw InsufficientFunds(amount, balance_);
        balance_ -= amount;
    }

private:
    double balance_ = 100;
};

int main() {
    Account acc;
    try {
        acc.withdraw(30);
        acc.withdraw(500);
    } catch (const InsufficientFunds &e) {
        std::cout << "cannot withdraw: " << e.what() << '\n';
    }
}`
        },
        {
          cmd: "optional و variant",
          title: "std::optional لقيمة ممكن متبقاش موجودة، و std::variant لقيمة من كذا نوع",
          desc: R`[[std::optional<T>]] (C++17): يا فيه قيمة من نوع T، يا مفيش. بدل ما ترجّع -1 أو [[nullptr]] أو ترمي exception لما مفيش نتيجة:
• [[return std::nullopt;]]: مفيش.
• [[return 5;]]: فيه.
• [[if (auto i = find_index(...))]]: الـ optional بيتحول لـ true لو فيه قيمة. والقيمة نفسها بـ [[*i]].
• [[opt.has_value()]] و [[opt.value()]] (بترمي لو فاضي) و [[opt.value_or(-1)]] (قيمة احتياطية).

[[if (auto i = f(); i)]] أو [[if (auto i = f())]]: متغير بيتعرّف جوه الـ if، وموجود جوه الـ if بس.

[[std::variant<int, double, std::string>]] (C++17): قيمة واحدة بس نوعها واحد من دول. زي union في TypeScript أو enum بداتا في Rust. وبيعرف هو شايل أنهي نوع دلوقتي:
• [[std::holds_alternative<int>(v)]]: شايل int؟
• [[std::get<int>(v)]]: هات الـ int (وبترمي لو شايل حاجة تانية).
• [[std::get_if<double>(&v)]]: pointer للـ double لو موجود، أو [[nullptr]].
• [[std::visit(f, v)]]: نادي f بالنوع اللي جوه، أيًا كان.

[[static_cast<int>(i)]]: تحويل صريح من نوع لنوع (هنا من size_t لـ int). ده الـ cast بتاع C++، وأوضح وأأمن من [[(int)i]] بتاع C.`,
          example: R`#include <iostream>
#include <optional>
#include <string>
#include <variant>
#include <vector>

std::optional<int> find_index(const std::vector<std::string> &v, const std::string &key) {
    for (std::size_t i = 0; i < v.size(); ++i)
        if (v[i] == key) return static_cast<int>(i);
    return std::nullopt;
}

using Value = std::variant<int, double, std::string>;

void print(const Value &v) {
    if (std::holds_alternative<int>(v)) std::cout << "int " << std::get<int>(v) << '\n';
    else if (const double *d = std::get_if<double>(&v)) std::cout << "double " << *d << '\n';
    else std::cout << "text " << std::get<std::string>(v) << '\n';
}

int main() {
    std::vector<std::string> names = {"ali", "sara", "omar"};
    if (auto i = find_index(names, "sara")) std::cout << "sara at " << *i << '\n';
    auto missing = find_index(names, "zed");
    std::cout << "zed found? " << missing.has_value() << " fallback=" << missing.value_or(-1) << '\n';
    std::vector<Value> values = {42, 3.5, std::string("hi")};
    for (const auto &v : values) print(v);
}`,
          try: R`اطبع [[missing.value()]] من غير ما تتشيّك: إيه اللي حصل؟ وبعدين اكتب [[print]] تاني بـ [[std::visit]] و lambda واحدة: [[std::visit([](const auto &x) { std::cout << x << '\n'; }, v);]]. وآخر حاجة: اعمل دالة [[std::optional<int> parse_int(const std::string &s)]] ترجّع nullopt بدل ما ترمي (استخدم try و catch حوالين stoi جواها).`,
          flag: "script",
          deep: {
            why: R`«مفيش نتيجة» حالة عادية جدًا (بحث مالقاش، config مش موجود). لو رجّعت -1 لازم كل اللي بينادي يفتكر إن -1 معناها كده. و nullptr ممكن يتعمله dereference بالغلط. الـ optional بيكتب الاحتمال في النوع نفسه، فالـ compiler والقارئ الاتنين عارفين إن القيمة ممكن متبقاش موجودة.`,
            how: R`[[std::optional<T>]] جواه مكان لـ T و bool بيقول فيه ولا لأ. مفيش heap ولا pointers. [[*opt]] من غير فحص على optional فاضي undefined behavior، و [[.value()]] بترمي [[std::bad_optional_access]].

[[std::variant]] جواه مكان يكفي أكبر نوع فيهم + رقم بيقول النوع الحالي. وأأمن من [[union]] بتاع C لأنه بيعرف هو شايل إيه، وبينادي الـ destructor الصح.

[[using Value = ...;]] اسم مستعار للنوع (زي typedef بس أوضح).

[[std::visit]] مع lambda فيها [[auto]] بيعمل نسخة من الـ lambda لكل نوع في الـ variant وقت الـ compile.`,
            when: R`optional لأي «ممكن يبقى مفيش». variant لما القيمة واحدة من مجموعة أنواع محددة: token في parser، أو رسالة من أنواع مختلفة، أو نتيجة يا نجاح يا خطأ (وفي C++23 فيه [[std::expected<T, E>]] معمول للحالة دي بالظبط).`,
            mistakes: R`[[*opt]] من غير ما تتشيّك. و [[std::optional<T &>]]: مش مسموح (لحد C++26)، استخدم pointer. وتستخدم variant مكان الوراثة لما الأنواع هتزيد كتير. و [[std::get<double>(v)]] والقيمة int: [[std::bad_variant_access]].`
          },
          lines: [
            "cout.",
            R`[[std::optional]].`,
            "string.",
            R`[[std::variant]].`,
            "vector.",
            "بترجّع optional: يا index يا مفيش.",
            R`[[std::size_t]] عشان المقارنة مع [[size()]] تبقى من نفس النوع.`,
            R`لقيناه: رجّع الـ index. [[static_cast<int>]] تحويل صريح.`,
            R`[[std::nullopt]]: مفيش.`,
            "قفلة.",
            R`[[using]]: اسم قصير للنوع.`,
            "دالة بتطبع أي Value.",
            R`لو int: [[std::get<int>]].`,
            R`[[get_if]]: pointer لو double، و nullptr لو لأ.`,
            "غير كده string.",
            "قفلة.",
            "main.",
            "أسماء.",
            R`الـ optional بيتحول لـ true لو فيه قيمة، و [[*i]] القيمة.`,
            "بحث مش هيلاقي.",
            R`[[has_value]]: 0، و [[value_or]]: القيمة الاحتياطية -1.`,
            "vector فيه ٣ أنواع مختلفة.",
            "كل واحد بيتطبع حسب نوعه.",
            "قفلة."
          ],
          sol: R`الناتج:
[[sara at 1]]
[[zed found? 0 fallback=-1]]
[[int 42]]
[[double 3.5]]
[[text hi]]

[[missing.value()]]:
[[terminate called after throwing an instance of 'std::bad_optional_access']]
[[what():  bad optional access]]`,
          solCode: R`#include <iostream>
#include <optional>
#include <stdexcept>
#include <string>
#include <variant>

std::optional<int> parse_int(const std::string &s) {
    try {
        return std::stoi(s);
    } catch (const std::exception &) {
        return std::nullopt;
    }
}

int main() {
    std::variant<int, double, std::string> v = 3.5;
    std::visit([](const auto &x) { std::cout << x << '\n'; }, v);
    std::cout << parse_int("42").value_or(-1) << ' ' << parse_int("abc").value_or(-1) << '\n';
}`
        },
        {
          cmd: "CMake",
          title: "CMake: إزاي تعمل build لمشروع C++ على أي نظام بـ CMakeLists.txt وفولدر build",
          desc: R`make كويس، بس الـ Makefile بيتكتب لـ compiler ونظام معيّن. CMake طبقة فوقه: بتكتب وصف المشروع مرة واحدة في [[CMakeLists.txt]]، و CMake يولّد ملفات الـ build المناسبة للجهاز (Makefile على Linux، أو Ninja، أو مشروع Visual Studio على Windows). وده الشكل اللي أغلب مشاريع ومكتبات C++ المفتوحة بتستخدمه، و VS Code (extension اسمها CMake Tools) و CLion و Visual Studio بيفهموه مباشرة.

أهم الأوامر في [[CMakeLists.txt]]:
• [[cmake_minimum_required(VERSION 3.20)]]: أقل إصدار CMake.
• [[project(todo LANGUAGES CXX)]]: اسم المشروع ولغته (CXX = C++).
• [[set(CMAKE_CXX_STANDARD 20)]]: C++20 (بيحط [[-std=c++20]] أو الـ flag المناسب للـ compiler).
• [[add_executable(app src/main.cpp)]]: target اسمه app من الملفات دي.
• [[add_library(core src/todo.cpp)]]: مكتبة من ملفات.
• [[target_include_directories(core PUBLIC include)]]: فولدر الـ headers. [[PUBLIC]] معناها إن اللي هيستخدم core هيشوف الفولدر ده كمان.
• [[target_link_libraries(app PRIVATE core)]]: app بيستخدم core.
• [[target_compile_options(app PRIVATE -Wall -Wextra)]]: flags للـ target ده.

الـ build نفسه بيبقى في فولدر لوحده (out-of-source)، عشان الملفات المولّدة متختلطش بالكود:
[[cmake -S . -B build]] (configure: اقرا CMakeLists.txt وولّد في build)
[[cmake --build build]] (build)
[[./build/app]]

شكل المشروع:
[[todo/CMakeLists.txt]]
[[todo/include/todo.h]]
[[todo/src/todo.cpp]]
[[todo/src/main.cpp]]`,
          example: R`cmake_minimum_required(VERSION 3.20)
project(todo LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_library(core src/todo.cpp)
target_include_directories(core PUBLIC include)

add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE core)
target_compile_options(app PRIVATE -Wall -Wextra)`,
          try: R`سطّب CMake ([[sudo apt install cmake]] أو [[brew install cmake]] أو من cmake.org). اعمل المشروع ده: [[include/todo.h]] فيها [[int count_done(const std::vector<bool> &items);]]، و [[src/todo.cpp]] فيها تنفيذها، و [[src/main.cpp]] بتناديها. وبعدين [[cmake -S . -B build]] و [[cmake --build build]] و [[./build/app]]. وبعدين عدّل main.cpp بس واعمل build تاني: كام ملف اتعمله compile؟`,
          flag: "script",
          deep: {
            why: R`أي مشروع C++ حقيقي، وأي مكتبة هتنزّلها من GitHub، غالبًا فيه [[CMakeLists.txt]]. فلازم تعرف تقراه وتعمل build. وهو اللي بيخلّي نفس المشروع يتبني على Linux و Mac و Windows من غير ما تكتب ٣ Makefiles.`,
            how: R`CMake بيشتغل على مرحلتين: configure ([[cmake -S . -B build]]) بيدوّر على الـ compiler ويقرا الوصف ويولّد ملفات build، و build ([[cmake --build build]]) بينادي make أو ninja أو MSBuild. ومن هنا ورايح أي تعديل في الكود محتاج [[cmake --build build]] بس، وهو بيعيد compile للي اتغيّر.

[[CMAKE_EXPORT_COMPILE_COMMANDS]] بيطلّع [[build/compile_commands.json]]: ملف فيه أمر الـ compile بتاع كل ملف، وده اللي clangd و clang-tidy بيقروه عشان الـ autocomplete والتحليل يبقوا مظبوطين.

[[PUBLIC]] و [[PRIVATE]] و [[INTERFACE]] بيحددوا الإعداد بيعدّي للي بيستخدم الـ target ولا لأ. ده أسلوب «modern CMake»: كل حاجة على target مش global.

نوع الـ build: [[cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug]] (أو [[Release]]) بيحط [[-g]] أو [[-O3]] لوحده.`,
            when: R`أي مشروع C++ فيه أكتر من ملفين، أو لازم يتبني على أكتر من نظام، أو بيستخدم مكتبات خارجية. ولو بتتعلم ملف واحد، [[g++]] مباشرة أسهل.`,
            mistakes: R`تشغّل [[cmake .]] في فولدر الكود نفسه فيتملي ملفات مولّدة. وتستخدم أسلوب CMake القديم ([[include_directories]] و [[set(CMAKE_CXX_FLAGS ...)]] global) اللي هتلاقيه في tutorials قديمة. وتحط [[-Wall -Wextra]] كده لـ MSVC: هو بيفهم [[/W4]]، فاستخدم [[if(MSVC)]] أو generator expression. وتنسى تضيف ملف [[.cpp]] جديد في [[add_executable]] أو [[add_library]] فيطلع undefined reference.`
          },
          lines: [
            "أقل إصدار CMake مطلوب.",
            "اسم المشروع، واللغة C++.",
            "استخدم C++20.",
            "ولو الـ compiler مش بيدعمه وقّف بخطأ بدل ما تنزل لإصدار أقدم.",
            R`ولّد [[compile_commands.json]] للـ editors والأدوات.`,
            R`مكتبة اسمها core من [[src/todo.cpp]].`,
            R`الـ headers في [[include]]، و PUBLIC: أي حد يستخدم core يشوفها.`,
            R`البرنامج نفسه اسمه app.`,
            "app بيستخدم core.",
            R`warnings للـ target ده (gcc و clang).`
          ],
          sol: R`أول build:
[[cmake -S . -B build]] بيطبع حاجات زي [[The CXX compiler identification is GNU 14.x]] وفي الآخر [[Build files have been written to: .../build]].
[[cmake --build build]] بيعمل compile لـ [[todo.cpp]] و [[main.cpp]] وبيطبع [[Built target core]] و [[Built target app]].

بعد تعديل main.cpp بس: ملف واحد اتعمله compile ([[main.cpp.o]]) وبعدين link، و core مش بيتلمس.

الملفات:`,
          solCode: R`// include/todo.h
#pragma once
#include <vector>
int count_done(const std::vector<bool> &items);

// src/todo.cpp
#include "todo.h"
int count_done(const std::vector<bool> &items) {
    int n = 0;
    for (bool done : items)
        if (done) ++n;
    return n;
}

// src/main.cpp
#include <iostream>
#include "todo.h"
int main() {
    std::cout << count_done({true, false, true}) << " done\n";
}`
        }
      ]
    },
    {
      t: "C++ الحديثة: الذاكرة والأداء",
      l: 3,
      n: "move semantics و copy elision، و smart pointers بدل new و delete، و constexpr، و string_view و span، وإزاي تكتب كود سريع فعلًا",
      items: [
        {
          cmd: "الـ Move Semantics و std::move",
          title: "move semantics: يعني إيه && و std::move، وليه return by value مش بينسخ (copy elision)؟",
          desc: R`لما تنسخ string فيه مليون حرف، الحروف كلها بتتنسخ. بس لو الأصل مش هيتستخدم تاني (متغير مؤقت، أو حاجة خلصت منها)، مفيش داعي للنسخ: خد الـ pointer اللي جواه وسيبه فاضي. ده الـ move: «انقل الملكية» بدل «اعمل نسخة».

[[T &&]] (اسمها rvalue reference، والـ [[&&]] هنا مش «و» المنطقية): reference بيتربط بقيمة مؤقتة أو بحاجة انت قلت إنها ممكن تتنقل. ومنها:
• move constructor: [[Buffer(Buffer &&o) noexcept]]: بياخد موارد o ويسيب o فاضي بس سليم.
• move assignment: [[Buffer &operator=(Buffer &&o) noexcept]].
ودول مع الـ copy constructor والـ copy assignment والـ destructor = الـ rule of 5. ولو الـ members بتاعتك string و vector (rule of 0) الـ compiler بيعمل الـ move لوحده صح.

[[std::move(x)]] مبتنقلش حاجة لوحدها! هي cast بس: «اعتبر x حاجة ممكن تتنقل». النقل الفعلي بيحصل في الـ move constructor أو الـ assignment اللي هيتنادى بعدها. وبعد الـ move، x في حالة «valid but unspecified»: سليم تقدر تمسحه أو تديله قيمة جديدة، بس متعتمدش على قيمته.

copy elision: لما دالة بترجّع object بالقيمة، الـ compiler غالبًا بيبنيه في مكانه النهائي عند اللي نادى على طول، من غير copy ولا move. من C++17 ده مضمون لما ترجّع قيمة مؤقتة ([[return Buffer(10);]])، و gcc و clang بيعملوه عمليًا في [[return b;]] كمان (اسمها NRVO). عشان كده رجّع vector أو string بالقيمة عادي، ومتكتبش [[return std::move(b);]]: بتمنع الـ elision.`,
          example: R`#include <cstddef>
#include <iostream>
#include <string>
#include <utility>
#include <vector>

class Buffer {
public:
    explicit Buffer(std::size_t n) : data_(n, 'x') { std::cout << "construct\n"; }
    Buffer(const Buffer &o) : data_(o.data_) { std::cout << "copy\n"; }
    Buffer(Buffer &&o) noexcept : data_(std::move(o.data_)) { std::cout << "move\n"; }
    std::size_t size() const { return data_.size(); }

private:
    std::string data_;
};

Buffer make_buffer() {
    Buffer b(1000);
    return b;
}

int main() {
    Buffer a(10);
    Buffer b = a;
    Buffer c = std::move(a);
    std::cout << "a.size=" << a.size() << " c.size=" << c.size() << '\n';
    Buffer d = make_buffer();
    std::cout << "d.size=" << d.size() << '\n';
    std::string s = "hello world, long enough to allocate";
    std::vector<std::string> v;
    v.push_back(std::move(s));
    std::cout << "v[0] size=" << v[0].size() << " s now=\"" << s << "\"\n";
}`,
          try: R`غيّر [[return b;]] لـ [[return std::move(b);]] واعمل compile بـ [[-Wall -Wextra]]: إيه اللي اتطبع، والـ compiler قال إيه؟ وبعدين امسح [[noexcept]] من الـ move constructor، واعمل [[std::vector<Buffer> vec; vec.reserve(1);]] وبعدها [[vec.emplace_back(5); vec.emplace_back(6);]]: لما الـ vector كبر، نقل العناصر بـ copy ولا move؟ ورجّع noexcept وجرّب تاني.`,
          flag: "script",
          deep: {
            why: R`قبل C++11، رجوع vector كبير من دالة أو إضافة string لـ vector كان ممكن ينسخ كل حاجة، فالناس كانت بتلف حوالين ده بـ pointers و out parameters. الـ move خلّى الكود الطبيعي (رجّع بالقيمة، ابعت بالقيمة لو هتحتفظ بيها) سريع. وده من أهم أسئلة انترفيو C++ الحديثة.`,
            how: R`الـ move بتاع [[std::string]] أو [[std::vector]] بينسخ ٣ حاجات (pointer و size و capacity) ويصفّرهم في الأصل، فبيبقى [[O(1)]] مهما الحجم. الـ copy بيحجز وينسخ كل العناصر، [[O(n)]].

[[noexcept]] مهمة: لما vector بيكبر وبينقل العناصر، لو الـ move ممكن يرمي exception في النص، الـ vector هيبقى نص منقول ونص لأ. عشان كده الـ vector بيستخدم الـ move بس لو هو [[noexcept]]، وإلا بيرجع للـ copy الآمن والأبطأ.

[[std::move(o.data_)]] جوه الـ move constructor: o نفسه نوعه [[Buffer &&]]، بس جوه الدالة ليه اسم، وأي حاجة ليها اسم بتتعامل كـ lvalue. فلازم [[std::move]] تاني عشان الـ string يتنقل مش يتنسخ.

الـ string القصير (حوالي ١٥ حرف في libstdc++) بيتخزن جوه الـ object نفسه من غير heap (small string optimization)، فالـ move بتاعه نسخ عادي. عشان كده النص في المثال طويل.`,
            when: R`لما تحط object في container ومش هتستخدمه تاني ([[v.push_back(std::move(s))]])، أو تبعته لـ constructor هيحتفظ بيه ([[: name_(std::move(name))]] لو الـ parameter by value)، أو تنقل ملكية [[unique_ptr]] (الدرس الجاي). ومش في [[return local;]].`,
            mistakes: R`تستخدم المتغير بعد [[std::move]] كأن قيمته لسه موجودة. و [[return std::move(local);]]. و [[std::move]] على [[const]] object: بيتنسخ بهدوء لأن الـ move محتاج يغيّر الأصل. وتكتب move constructor من غير [[noexcept]]. وتفتكر إن [[std::move]] لوحدها بتعمل حاجة.`
          },
          lines: [
            R`[[std::size_t]].`,
            "cout.",
            "string.",
            R`[[std::move]].`,
            "vector.",
            "class بيطبع كل عملية عشان نشوفها.",
            "public.",
            "constructor عادي: string فيه n حرف.",
            "copy constructor: نسخة كاملة.",
            R`move constructor: [[Buffer &&]] و [[noexcept]]، وبيخطف الـ string بتاع o.`,
            "الحجم.",
            "private.",
            "member واحد.",
            "قفلة.",
            "دالة بترجّع بالقيمة.",
            "object محلي.",
            "مفيش copy ولا move هنا: NRVO.",
            "قفلة.",
            "main.",
            "construct.",
            "copy: a لسه هيتستخدم.",
            R`[[std::move]]: «a مش محتاجه»، فالـ move constructor هو اللي اتنادى.`,
            "a بقى فاضي (في libstdc++)، و c خد الـ 10.",
            "construct بس، من غير copy ولا move.",
            "1000.",
            "نص طويل كفاية عشان يبقى على الـ heap.",
            "vector فاضي.",
            "الـ string اتنقل جوه الـ vector من غير نسخ الحروف.",
            R`s بقى فاضي. [[\"]] علامة تنصيص جوه النص.`,
            "قفلة."
          ],
          sol: R`الناتج مع gcc 14:
[[construct]]
[[copy]]
[[move]]
[[a.size=0 c.size=10]]
[[construct]]
[[d.size=1000]]
[[v[0] size=36 s now=""]]
([[construct]] التانية لوحدها: مفيش copy ولا move في الـ return. و [[a.size=0]] حاجة بتعملها libstdc++، المعيار مش بيضمنها.)

مع [[return std::move(b);]]: بيطبع [[move]] بعد construct، و gcc بيقول:
[[warning: moving a local object in a return statement prevents copy elision [-Wpessimizing-move]]]

من غير [[noexcept]]: لما الـ vector كبر من 1 لـ 2 بيطبع [[copy]] للعنصر القديم. مع noexcept بيطبع [[move]].`
        },
        {
          cmd: "Smart Pointers: الذاكرة الذكية",
          title: "unique_ptr و shared_ptr و weak_ptr: إزاي تستغنى عن new و delete",
          desc: R`في C++ الحديثة نادرًا ما بتكتب [[new]] و [[delete]] بإيدك. بدلهم smart pointers من [[<memory>]]: objects بتمسك pointer وبتمسحه في الـ destructor بتاعها (RAII).

[[std::unique_ptr<T>]]: مالك واحد بس.
• بتعمله بـ [[std::make_unique<Player>("Sara")]].
• مينفعش يتنسخ (لأن كده هيبقى فيه مالكين)، بس ينفع يتنقل بـ [[std::move]]، والأصل بيبقى [[nullptr]].
• لما يموت، الـ object بيتمسح. حجمه زي pointer عادي ومفيش أي تكلفة زيادة.
• ده اختيارك الافتراضي لأي object على الـ heap.

[[std::shared_ptr<T>]]: أكتر من مالك.
• [[std::make_shared<Player>("Omar")]]. وكل نسخة بتزوّد عدّاد (reference count)، و [[use_count()]] بيقولك العدد.
• الـ object بيتمسح لما آخر shared_ptr يموت.
• أتقل: العدّاد atomic (عشان الـ threads) وبيتحجز معاه block إضافي.

[[std::weak_ptr<T>]]: بيبص على object بيملكه shared_ptr من غير ما يزوّد العدّاد.
• [[w.lock()]] بيرجّع shared_ptr لو الـ object لسه عايش، أو فاضي لو اتمسح.
• [[w.expired()]]: اتمسح ولا لأ.
• فايدته الأساسية: كسر الدواير. لو A ماسك shared_ptr لـ B و B ماسك shared_ptr لـ A، العدّاد عمره ما هيوصل صفر والاتنين هيفضلوا للأبد (leak). خلي واحد فيهم weak_ptr.

الـ smart pointer بيتعامل زي pointer عادي: [[p->name]] و [[*p]] و [[if (p)]].`,
          example: R`#include <iostream>
#include <memory>
#include <string>
#include <utility>

struct Player {
    std::string name;
    explicit Player(std::string n) : name(std::move(n)) { std::cout << "create " << name << '\n'; }
    ~Player() { std::cout << "destroy " << name << '\n'; }
};

int main() {
    {
        auto p = std::make_unique<Player>("Sara");
        std::unique_ptr<Player> q = std::move(p);
        std::cout << "p empty? " << (p == nullptr) << '\n';
    }
    std::cout << "--\n";
    std::weak_ptr<Player> watcher;
    {
        auto a = std::make_shared<Player>("Omar");
        auto b = a;
        watcher = a;
        std::cout << "use_count=" << a.use_count() << '\n';
        if (auto locked = watcher.lock()) std::cout << "alive: " << locked->name << '\n';
    }
    std::cout << "expired? " << watcher.expired() << '\n';
}`,
          try: R`جرّب [[std::unique_ptr<Player> r = q;]] (نسخ) واقرا الـ error. وبعدين اعمل struct [[Node]] فيه [[std::shared_ptr<Node> next;]] واعمل عقدتين بيشاوروا على بعض (دايرة)، وحط رسالة في الـ destructor: اتطبعت؟ شغّله بـ [[-fsanitize=address]]. وبعدين صلّحه بإنك تخلي واحد فيهم [[std::weak_ptr]].`,
          flag: "script",
          deep: {
            why: R`الـ [[new]] و [[delete]] بإيدك هما مصدر الـ leaks والـ double free والـ use after free في C++. الـ unique_ptr بيلغي المشكلة دي من غير ما يكلّفك أي سرعة، وبيوضّح في النوع نفسه مين المالك. وأغلب الـ coding guidelines (زي C++ Core Guidelines) بتقول: «متكتبش new و delete خالص».`,
            how: R`[[unique_ptr]] جواه pointer واحد، والـ destructor بيعمل delete. الـ copy constructor بتاعه [[= delete]]، والـ move بينقل الـ pointer ويصفّر الأصل. ده بالظبط الـ rule of 5 اللي اتعلمته، بس مكتوب مرة واحدة في المكتبة.

[[shared_ptr]] جواه pointerين: واحد للـ object وواحد لـ control block فيه عدّادين (strong و weak). [[make_shared]] بيحجز الـ object والـ control block في حجز واحد، فأسرع من [[std::shared_ptr<T>(new T)]].

الـ [[weak_ptr]] بيزوّد الـ weak count بس. الـ object بيتمسح لما الـ strong يوصل صفر، والـ control block لما الاتنين يوصلوا صفر.

ممكن تدّي unique_ptr دالة مسح مخصوصة (custom deleter)، فيلف حاجات C زي [[FILE *]]: [[std::unique_ptr<FILE, decltype(&fclose)> f(fopen("x", "r"), &fclose);]].`,
            when: R`unique_ptr لأي object على الـ heap ليه مالك واحد واضح (وده أغلب الحالات)، ولـ polymorphism ([[std::vector<std::unique_ptr<Shape>>]]). shared_ptr لما الملكية مشتركة فعلًا ومش واضح مين هيخلص الأخير (cache، أو graph). weak_ptr للـ observers والـ back pointers (الابن بيشاور على الأب). وpointer عادي ([[T *]]) أو reference لما بتستخدم الـ object من غير ما تملكه.`,
            mistakes: R`shared_ptr في كل حتة «احتياطي»: أبطأ، وبيخبي مين المالك. ودواير shared_ptr. وتعمل [[std::shared_ptr<T>(raw)]] مرتين من نفس الـ raw pointer: عدّادين منفصلين، فـ double delete. وتعمل [[delete p.get()]]. وتبعت [[const std::shared_ptr<T> &]] لدالة مش محتاجة ملكية: ابعت [[T &]] أو [[T *]].`
          },
          lines: [
            "cout.",
            R`[[<memory>]]: كل الـ smart pointers.`,
            "string.",
            R`[[std::move]].`,
            "struct بيطبع إمتى بيتعمل وإمتى بيموت.",
            "الاسم.",
            R`الـ parameter by value، وبعدين move جوه الـ member.`,
            "الـ destructor.",
            "قفلة.",
            "main.",
            "scope.",
            R`[[make_unique]]: object على الـ heap، و p مالكه الوحيد.`,
            R`نقل الملكية لـ q. [[unique_ptr]] مينفعش يتنسخ.`,
            "p بقى nullptr: 1.",
            "q بيموت هنا، فـ Sara بتتمسح.",
            "فاصل.",
            "weak_ptr فاضي.",
            "scope.",
            R`[[make_shared]]: العدّاد 1.`,
            "نسخة: العدّاد 2.",
            "watcher بيبص من غير ما يزوّد العدّاد.",
            "use_count=2.",
            R`[[lock()]]: shared_ptr مؤقت لو لسه عايش.`,
            "a و b بيموتوا، العدّاد صفر، و Omar بيتمسح.",
            "expired=1.",
            "قفلة."
          ],
          sol: R`الناتج:
[[create Sara]]
[[p empty? 1]]
[[destroy Sara]]
[[--]]
[[create Omar]]
[[use_count=2]]
[[alive: Omar]]
[[destroy Omar]]
[[expired? 1]]

نسخ الـ unique_ptr:
[[error: use of deleted function 'std::unique_ptr<...>::unique_ptr(const std::unique_ptr<...> &)']] (بالأنواع الكاملة)

الدايرة بـ shared_ptr: الـ destructors مش بتتنادى خالص، و ASan بيقول [[ERROR: LeakSanitizer: detected memory leaks]]. مع weak_ptr في اتجاه واحد، الاتنين بيتمسحوا.`,
          solCode: R`#include <iostream>
#include <memory>

struct Node {
    const char *name;
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;
    explicit Node(const char *n) : name(n) {}
    ~Node() { std::cout << "destroy " << name << '\n'; }
};

int main() {
    auto a = std::make_shared<Node>("a");
    auto b = std::make_shared<Node>("b");
    a->next = b;
    b->prev = a;
    std::cout << "b sees " << b->prev.lock()->name << '\n';
}`
        },
        {
          cmd: "constexpr",
          title: "constexpr و consteval و static_assert: إزاي تخلي الـ compiler يحسب وقت الـ compile",
          desc: R`[[constexpr]] على متغير: «القيمة دي لازم تتحسب وقت الـ compile». على دالة: «الدالة دي ينفع تتنفذ وقت الـ compile لو الـ arguments معروفة وقتها، وينفع وقت التشغيل عادي لو مش معروفة».

• [[constexpr int f5 = factorial(5);]]: الـ compiler بيحسب 120 ويحطها في البرنامج كرقم ثابت. مفيش أي حساب وقت التشغيل.
• [[int f6 = factorial(runtime_n);]]: نفس الدالة، بس هنا بتتنفذ وقت التشغيل لأن runtime_n مش معروف قبلها.
• [[consteval]] (C++20): الدالة لازم تتنفذ وقت الـ compile بس. لو ناديتها بقيمة وقت تشغيل، error.
• [[static_assert(condition, "msg")]]: شرط بيتفحص وقت الـ compile. لو غلط، البرنامج مش هيتعمل compile أصلًا. مفيد تتأكد من افتراضات زي حجم نوع.

بقيت دوال constexpr تقدر تعمل حاجات كتير: loops و if ومتغيرات محلية، وفي C++20 حتى [[std::vector]] و [[std::string]] جواها (بشرط تتمسح قبل ما الدالة تخلص). و [[std::array]] بيتعمل كله وقت الـ compile.

الفرق عن [[const]]: [[const int x = read_input();]] مسموح (ثابت بعد ما يتحسب وقت التشغيل). [[constexpr int x = read_input();]] لأ: لازم معروف قبل التشغيل.`,
          example: R`#include <array>
#include <iostream>

constexpr int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; ++i) result *= i;
    return result;
}

constexpr std::array<int, 5> squares() {
    std::array<int, 5> a{};
    for (int i = 0; i < 5; ++i) a[i] = i * i;
    return a;
}

consteval int kb(int n) { return n * 1024; }

int main() {
    constexpr int f5 = factorial(5);
    static_assert(f5 == 120, "factorial(5) must be 120");
    int runtime_n = 6;
    int f6 = factorial(runtime_n);
    constexpr auto sq = squares();
    std::array<char, kb(1)> buffer{};
    std::cout << f5 << ' ' << f6 << ' ' << sq[4] << ' ' << buffer.size() << '\n';
}`,
          try: R`غيّر الـ static_assert لـ [[f5 == 121]] واعمل compile. وبعدين جرّب [[kb(runtime_n)]]. وبعدين اعمل [[constexpr int big = factorial(13);]]: إيه اللي حصل وليه؟ (factorial(13) أكبر من int). وآخر حاجة: اكتب [[static_assert(sizeof(void *) == 8, "64-bit only");]].`,
          flag: "script",
          deep: {
            why: "أي حساب بيتعمل وقت الـ compile مبيكلّفش وقت تشغيل خالص: جداول lookup، وثوابت رياضية، وأحجام buffers، و parsing لحاجات ثابتة. وكمان الـ compiler بيمسك أخطاء: الـ undefined behavior جوه حساب constexpr بيبقى compile error بدل bug صامت.",
            how: R`الـ compiler فيه interpreter صغير بينفّذ الدوال الـ constexpr. ولأن الـ UB ممنوع جواه، overflow في [[factorial(13)]] وهو constexpr بيوقف الـ compile بـ error. نفس الدالة وقت التشغيل كانت هتطلّع رقم غلط بهدوء.

[[constexpr]] على دالة مجرد إذن، مش إجبار: لو ناديتها في مكان مش محتاج ثابت وقت compile، الـ compiler ممكن ينفّذها وقت التشغيل. عشان تجبره: خزّن النتيجة في متغير [[constexpr]]، أو استخدم [[consteval]].

[[std::array<char, kb(1)>]]: حجم الـ array لازم ثابت وقت الـ compile، و consteval بتضمن ده.

وفيه [[if constexpr]] جوه الـ templates: فرع بيتشال خالص وقت الـ compile حسب النوع.`,
            when: R`للثوابت ([[constexpr]] بدل [[#define]] و [[const]] لأي ثابت معروف)، وجداول بتتحسب مرة، وفحوصات [[static_assert]] على افتراضاتك (حجم struct في بروتوكول، أو template بنوع غلط). متحوّلش كل حاجة لـ constexpr: الـ compile بيبطأ.`,
            mistakes: R`تفتكر إن الدالة الـ constexpr دايمًا بتتحسب وقت الـ compile. وتستخدم [[const]] وانت محتاج ثابت compile-time (حجم array عام مثلًا). وتعمل static_assert برسالة مش واضحة. وتحط حسابات تقيلة جدًا في constexpr فالـ compile ياخد دقايق.`
          },
          lines: [
            R`[[std::array]].`,
            "cout.",
            R`[[constexpr]]: ينفع وقت الـ compile أو وقت التشغيل.`,
            "متغير محلي.",
            "loop عادي جوه constexpr.",
            "رجّع.",
            "قفلة.",
            "constexpr بترجّع array كاملة.",
            R`[[{}]]: كله أصفار.`,
            "املاه بالمربعات.",
            "رجّع.",
            "قفلة.",
            R`[[consteval]]: وقت الـ compile بس.`,
            "main.",
            "اتحسبت وقت الـ compile: 120 ثابتة جوه البرنامج.",
            R`[[static_assert]]: لو غلط، مفيش compile.`,
            "قيمة وقت تشغيل.",
            "نفس الدالة وقت التشغيل: 720.",
            "الـ array اتملت وقت الـ compile.",
            R`حجم array لازم ثابت: [[kb(1)]] = 1024.`,
            "120 720 16 1024.",
            "قفلة."
          ],
          sol: R`الناتج:
[[120 720 16 1024]]

[[f5 == 121]]:
[[error: static assertion failed: factorial(5) must be 121]] (أو الرسالة اللي كتبتها).

[[kb(runtime_n)]]:
[[error: call to consteval function 'kb(runtime_n)' is not a constant expression]] وبعدها إن runtime_n مش ثابت.

[[constexpr int big = factorial(13);]]: الـ compile بيقف بـ error فيه [[overflow in constant expression]]، لأن 13! = 6227020800 أكبر من int. نفس الدالة وقت التشغيل كانت هترجّع رقم غلط من غير أي رسالة.`
        },
        {
          cmd: "string_view و span",
          title: "std::string_view و std::span: تبص على نص أو array من غير ما تنسخهم",
          desc: R`لو عندك دالة بتقرا نص بس، تبعته إزاي؟
• [[const std::string &]]: كويس، بس لو اللي بينادي معاه [["literal"]] أو [[char *]]، بيتعمل std::string مؤقت (ممكن حجز heap) عشان يتبعت.
• [[std::string_view]] (C++17): «نافذة» على حروف موجودة في مكان تاني: pointer وطول بس (16 byte)، من غير ملكية ومن غير نسخ. بيقبل std::string و literal و [[char *]] كلهم ببلاش. و [[sv.substr(1, 7)]] بترجّع string_view تاني من غير نسخ (substr بتاعة std::string بتعمل string جديد).

ونفس الفكرة للـ arrays: [[std::span<const int>]] (C++20) «نافذة» على عناصر جنب بعض: pointer وعدد. بيقبل [[std::vector]] و [[std::array]] و array الـ C العادية من غير ما تبعت الطول لوحده. وده بيحل مشكلة «الدالة متعرفش طول الـ array» من C بشكل نضيف. و [[s.subspan(1, 2)]] جزء منه.

[[std::span<const int>]] للقراية بس، و [[std::span<int>]] لو الدالة هتعدّل العناصر.

القاعدة المهمة: الاتنين مش بيملكوا الداتا. لو الداتا الأصلية ماتت أو اتنقلت، الـ view بيبقى بيشاور على ذاكرة مش بتاعته (dangling).`,
          example: R`#include <iostream>
#include <span>
#include <string>
#include <string_view>
#include <vector>

bool is_command(std::string_view s) { return !s.empty() && s.front() == '/'; }

int sum(std::span<const int> values) {
    int total = 0;
    for (int v : values) total += v;
    return total;
}

int main() {
    std::string line = "/help me please";
    std::string_view view = line;
    std::string_view word = view.substr(1, 4);
    std::cout << is_command(line) << ' ' << is_command("plain") << ' ' << word << '\n';
    std::vector<int> v = {1, 2, 3, 4};
    int arr[] = {10, 20, 30};
    std::cout << sum(v) << ' ' << sum(arr) << ' ' << sum(std::span(v).subspan(1, 2)) << '\n';
}`,
          try: R`اكتب دالة [[std::vector<std::string_view> split(std::string_view s, char sep)]] بتقسم نص من غير ما تنسخ ولا كلمة. وبعدين جرّب الغلطة المشهورة: [[std::string_view bad = std::string("temp");]] واطبع bad، واعمل compile بـ [[-fsanitize=address]].`,
          flag: "script",
          deep: {
            why: R`الـ parsing (logs، و CSV، و HTTP headers) فيه تقطيع نصوص كتير. لو كل قطعة std::string جديد، البرنامج بيقضي وقته في الحجز والنسخ. string_view بيخلي التقطيع ببلاش. و span بيخلي الدوال تقبل أي «عناصر جنب بعض» بنوع واحد بدل [[(const int *p, int len)]] اللي سهل تغلط فيه.`,
            how: R`[[std::string_view]] = [[const char *]] + [[size_t]]. الـ substr بتحرك الـ pointer وتغيّر الطول بس، [[O(1)]]. ومش لازم آخره [[\0]]، فمتبعتهوش لدالة C مستنية [[\0]] ([[printf("%s")]] أو [[fopen]]): استخدم [[std::string(sv)]] الأول.

[[std::span<T>]] = [[T *]] + عدد. [[std::span(v)]] بيستنتج النوع من الـ vector (CTAD). وفيه نوع بحجم ثابت [[std::span<int, 3>]] الحجم فيه جزء من النوع.

ابعتهم بالقيمة (مش بـ reference): حجمهم صغير ونسخهم أرخص.`,
            when: R`string_view لأي parameter بيقرا نص بس ومش هيحتفظ بيه. span لأي parameter بيقرا أو يعدّل عناصر مش هيحتفظ بيها. ولو هتحتفظ بالداتا (member في class) خليها std::string أو std::vector.`,
            mistakes: R`ترجّع string_view لـ string محلي أو مؤقت (dangling). وتخزن string_view كـ member والنص الأصلي يتغير أو يموت. وتبعت [[sv.data()]] لدالة C مستنية [[\0]]. وتعمل push_back على الـ vector وفيه span شايف عناصره: الـ vector ممكن يتنقل.`
          },
          lines: [
            "cout.",
            R`[[std::span]] (C++20).`,
            "string.",
            R`[[std::string_view]] (C++17).`,
            "vector.",
            R`بتقبل string أو literal من غير نسخ. [[front()]] أول حرف.`,
            R`[[std::span<const int>]]: أي عناصر int جنب بعض، للقراية.`,
            "مجموع.",
            "range-for شغال على span.",
            "رجّع.",
            "قفلة.",
            "main.",
            "string عادي.",
            "view على نفس الحروف، من غير نسخ.",
            R`[[substr]] على view: view تاني على كلمة help، من غير نسخ.`,
            "1 0 help.",
            "vector.",
            "array بتاعة C.",
            R`نفس الدالة بتقبل الاتنين. و [[subspan(1, 2)]] = العنصرين 2 و 3.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[1 0 help]]
[[10 60 5]]

[[split]] بترجّع views على نفس النص الأصلي، فالنص لازم يفضل عايش طول ما بتستخدم النتيجة.

[[std::string_view bad = std::string("temp");]]: الـ string المؤقت بيموت في آخر السطر، و bad بيشاور على ذاكرة مش بتاعته. gcc 14 بـ [[-Wall -Wextra]] مقالش ولا كلمة، والنسخة العادية ممكن تطبع temp عادي بالصدفة. ASan مسكه وقت التشغيل:
[[ERROR: AddressSanitizer: stack-use-after-scope]]
(النص القصير متخزن جوه الـ string object نفسه على الـ stack. لو النص طويل هيبقى على الـ heap والخطأ هيبقى [[heap-use-after-free]].)`,
          solCode: R`#include <iostream>
#include <string_view>
#include <vector>

std::vector<std::string_view> split(std::string_view s, char sep) {
    std::vector<std::string_view> parts;
    std::size_t start = 0;
    while (true) {
        std::size_t pos = s.find(sep, start);
        if (pos == std::string_view::npos) {
            parts.push_back(s.substr(start));
            return parts;
        }
        parts.push_back(s.substr(start, pos - start));
        start = pos + 1;
    }
}

int main() {
    for (auto part : split("a,bb,,ccc", ',')) std::cout << '[' << part << ']';
    std::cout << '\n';
}`
        },
        {
          cmd: "الأداء و cache",
          title: "إزاي تكتب C++ سريع فعلًا: اقيس الأول، والـ cache، و reserve، ومتنسخش من غير داعي",
          desc: R`أول قاعدة: متخمنش، اقيس. الحاجة اللي شكلها بطيئة غالبًا مش هي. اعمل compile بـ [[-O2]] (القياس من غير optimization مالوش معنى)، وقيس بـ [[std::chrono::steady_clock]] أو أداة profiling زي [[perf]] على Linux.

أهم أسباب البطء في الواقع:
• الذاكرة مش الحسابات. الـ CPU بيقرا الذاكرة على شكل سطور (cache lines، غالبًا 64 byte) ويحطها في cache صغير سريع. قراية من الـ cache بتاخد كام nanosecond، ومن الـ RAM حوالي ١٠٠. فلو الداتا جنب بعض (vector، array) كل سطر بيجيب كذا عنصر مرة واحدة، والـ CPU كمان بيتوقع العنصر الجاي ويجيبه بدري (prefetch). لو الداتا متفرقة (list، map، pointers لـ objects متفرقة) كل عنصر ممكن يبقى رحلة للـ RAM.
• نسخ من غير داعي: parameter بالقيمة لـ string أو vector، و [[for (auto x : big_strings)]] من غير [[&]]، ورجوع نسخ.
• حجز كتير: [[push_back]] من غير [[reserve]] في loop كبير، أو strings مؤقتة في loop.
• الـ algorithm نفسه: [[O(n²)]] عمرها ما هتبقى سريعة مهما عملت optimization.

في المثال بنقارن مجموع 5 مليون رقم في vector وفي list (نفس الأرقام ونفس العملية بالظبط). [[std::chrono]] للقياس، و [[template <typename F>]] عشان [[ms]] تقبل أي lambda، و [[[&]]] عشان الـ lambda تكتب في s1 و s2.`,
          example: R`#include <chrono>
#include <iostream>
#include <list>
#include <numeric>
#include <vector>

template <typename F>
long long ms(F f) {
    auto start = std::chrono::steady_clock::now();
    f();
    auto end = std::chrono::steady_clock::now();
    return std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
}

int main() {
    const int n = 5'000'000;
    std::vector<int> v;
    v.reserve(n);
    for (int i = 0; i < n; ++i) v.push_back(i % 100);
    std::list<int> l(v.begin(), v.end());
    long long s1 = 0, s2 = 0;
    std::cout << "vector: " << ms([&] { s1 = std::accumulate(v.begin(), v.end(), 0LL); }) << " ms\n";
    std::cout << "list:   " << ms([&] { s2 = std::accumulate(l.begin(), l.end(), 0LL); }) << " ms\n";
    std::cout << "same sum? " << (s1 == s2) << '\n';
}`,
          try: R`اعمل compile بـ [[-O2]] وشغّل كذا مرة. وبعدين بـ [[-O0]]: الأرقام اتغيّرت قد إيه؟ وبعدين جرّب تجربة الـ cache الكلاسيكية: matrix [[std::vector<int>]] بحجم 4000 × 4000، واجمعها مرة صف صف ([[m[i * N + j]]]) ومرة عمود عمود ([[m[j * N + i]]]).`,
          flag: "script",
          deep: {
            why: R`الناس بتختار C++ عشان السرعة. لو كتبتها زي Java (pointers لـ objects في كل حتة، و shared_ptr في كل حاجة، ونسخ في كل parameter) هتاخد تعقيد C++ من غير سرعتها. وأسئلة الأداء (vector مقابل list، و cache، و reserve) بتتسأل في انترفيوهات الألعاب والـ HFT والـ systems.`,
            how: R`في الـ list، كل عنصر node لوحده على الـ heap فيه القيمة و pointerين. الـ nodes اتعملت ورا بعض هنا فممكن تبقى قريبة من بعض، بس كل خطوة لسه محتاجة تقرا pointer الأول عشان تعرف تروح فين، فالـ CPU مش بيقدر يجيب اللي بعده بدري. في الـ vector العناصر متلاصقة، والـ compiler بـ [[-O2]] كمان بيستخدم أوامر SIMD (يجمع كذا رقم في أمر واحد).

الـ matrix صف صف بيقرا الذاكرة بالترتيب. عمود عمود كل قراية بتنط 4000 × 4 bytes، فكل عنصر في cache line جديد.

حاجات تانية مهمة: [[reserve]] لما تعرف الحجم. [[emplace_back]] بدل بناء object وبعدين نسخه. [[std::string_view]] و [[const &]] للقراية. و [[std::unordered_map]] بدل map لو مش محتاج ترتيب. وابعت الحاجات الصغيرة بالقيمة.

أدوات: [[perf stat ./app]] و [[perf record]] على Linux، و Visual Studio Profiler على Windows، و Instruments على Mac، و Google Benchmark للـ micro-benchmarks (عشان الـ compiler ميشيلش الكود اللي بتقيسه).`,
            when: R`بعد ما الكود يبقى صح، ولما فيه مشكلة سرعة مقاسة فعلًا. ابدأ بالـ algorithm وبعدين شكل الداتا وبعدين التفاصيل. واختار vector كاختيار افتراضي من الأول عشان متحتاجش تغيّر بعدين.`,
            mistakes: R`تقيس بـ [[-O0]]. وتقيس مرة واحدة (أول تشغيل فيه cache بارد). والـ compiler يشيل الكود اللي بتقيسه لأن نتيجته مش مستخدمة (عشان كده المثال بيطبع [[s1 == s2]]). وتعمل micro-optimization لكود بياخد ١٪ من الوقت. وتستخدم list عشان «الإضافة O(1)».`
          },
          lines: [
            R`[[std::chrono]]: الوقت.`,
            "cout.",
            "list.",
            "accumulate.",
            "vector.",
            R`template: [[ms]] بتقبل أي حاجة تتنادى.`,
            "بترجّع الوقت بالـ milliseconds.",
            R`[[steady_clock]]: ساعة مبتتغيرش لو حد غيّر وقت الجهاز.`,
            "نفّذ الحاجة اللي بنقيسها.",
            "الوقت بعدها.",
            "الفرق بالـ milliseconds.",
            "قفلة.",
            "main.",
            R`5 مليون. [[']] فاصل للقراية بس (C++14).`,
            "vector.",
            "احجز مرة واحدة.",
            "املاه.",
            "list بنفس الأرقام.",
            "النتايج.",
            R`[[[&]]]: الـ lambda بتكتب في s1 الأصلي.`,
            "نفس العملية على الـ list.",
            "نطبع النتيجة عشان الـ compiler ميشيلش الحساب.",
            "قفلة."
          ],
          sol: R`مع [[-O2]] عندي (gcc 14 جوه Docker، والأرقام عندك هتختلف):
[[vector: 2 ms]]
[[list:   14 ms]]
[[same sum? 1]]
الـ list أبطأ حوالي ٥ لـ ٧ مرات هنا، والفرق بيكبر لو الـ nodes متفرقة في الذاكرة (لو اتعملت وسط حجوزات تانية، أو بعد مسح وإضافة كتير).

مع [[-O0]] عندي [[vector: 88 ms]] و [[list: 98 ms]]: الاتنين أبطأ بكتير والفرق تقريبًا اختفى، لأن من غير optimization كل حاجة بطيئة. عشان كده القياس من غير [[-O2]] بيضلل.

الـ matrix عندي: [[rows: 8 ms]] و [[cols: 104 ms]]، يعني عمود عمود أبطأ حوالي ١٣ مرة، مع إن العمليات هي هي بالظبط.`,
          solCode: R`#include <chrono>
#include <iostream>
#include <vector>

int main() {
    const int N = 4000;
    std::vector<int> m(N * N, 1);
    long long by_row = 0, by_col = 0;
    auto t0 = std::chrono::steady_clock::now();
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j) by_row += m[i * N + j];
    auto t1 = std::chrono::steady_clock::now();
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j) by_col += m[j * N + i];
    auto t2 = std::chrono::steady_clock::now();
    using ms = std::chrono::milliseconds;
    std::cout << "rows: " << std::chrono::duration_cast<ms>(t1 - t0).count() << " ms\n";
    std::cout << "cols: " << std::chrono::duration_cast<ms>(t2 - t1).count() << " ms\n";
    std::cout << (by_row == by_col) << '\n';
}`
        }
      ]
    },
    {
      t: "الـ Concurrency: threads و mutex و atomic",
      l: 3,
      n: "تشغّل كذا حاجة في نفس الوقت، وتمنع الـ data races بـ mutex و atomic، و async و future",
      items: [
        {
          cmd: "threads و mutex",
          title: "std::thread و join و data race، وإزاي تحمي متغير مشترك بـ mutex و lock_guard",
          desc: R`الـ thread مسار تنفيذ مستقل جوه نفس البرنامج. كل الـ threads بيشوفوا نفس الذاكرة، وده اللي بيخليهم سريعين ومشكلتهم في نفس الوقت.

• [[std::thread t(f);]]: ابدأ thread جديد بينفّذ f (دالة أو lambda) على طول، بالتوازي مع main.
• [[t.join()]]: استنى الـ thread ده لحد ما يخلص. لازم تعمل join (أو [[detach]]) قبل ما الـ [[std::thread]] object يموت، وإلا البرنامج كله بيتقفل بـ [[std::terminate]].
• [[std::jthread]] (C++20): نفس الحاجة بس بيعمل join لوحده في الـ destructor (RAII). استخدمه لو الـ compiler بيدعمه.

data race: لو أكتر من thread بيكتبوا (أو واحد بيكتب وواحد بيقرا) نفس المتغير في نفس الوقت من غير حماية، ده undefined behavior. [[++counter]] شكلها خطوة واحدة، بس هي ٣: اقرا، زوّد، اكتب. لو اتنين قروا نفس القيمة في نفس الوقت، واحدة من الزيادتين بتضيع.

الحل الأساسي: [[std::mutex]] (اختصار mutual exclusion): قفل، thread واحد بس يمسكه في نفس الوقت.
• [[std::lock_guard<std::mutex> lock(m);]]: بيقفل في الـ constructor ويفتح في الـ destructor (RAII). فالقفل بيتفك لوحده آخر الـ scope حتى لو حصل exception.
• متستخدمش [[m.lock()]] و [[m.unlock()]] بإيدك: لو نسيت unlock أو حصل exception، كل الـ threads التانية هتستنى للأبد.
• [[std::scoped_lock]] (C++17) بيقفل أكتر من mutex مرة واحدة من غير deadlock.

[[emplace_back(work)]]: بيعمل thread جديد جوه الـ vector على طول. وعلى Linux مع compilers قديمة كنت محتاج [[-pthread]] في أمر الـ compile، وزيادة الاحتياط مش هتضر.`,
          example: R`#include <iostream>
#include <mutex>
#include <thread>
#include <vector>

int main() {
    long long counter = 0;
    std::mutex m;
    auto work = [&] {
        for (int i = 0; i < 100000; ++i) {
            std::lock_guard<std::mutex> lock(m);
            ++counter;
        }
    };
    std::vector<std::thread> threads;
    for (int t = 0; t < 4; ++t) threads.emplace_back(work);
    for (auto &th : threads) th.join();
    std::cout << "counter=" << counter << '\n';
}`,
          try: R`امسح سطر الـ lock_guard وشغّل ٥ مرات: النتيجة كام كل مرة؟ (اعمل compile بـ [[-O0]] عشان الـ compiler ميجمعش الـ loop كله في خطوة). وبعدين اعمل compile بـ [[-g -fsanitize=thread]] وشغّل. وبعدين رجّع الـ lock وقيس الوقت مقارنة بـ thread واحد بيعمل 400000 زيادة: أسرع ولا أبطأ؟ ليه؟`,
          flag: "script",
          deep: {
            why: R`الأجهزة دلوقتي فيها كذا core، والـ thread الواحد بيستخدم واحد بس. السيرفرات والألعاب وأي معالجة تقيلة بتقسم الشغل على threads. وأخطاء الـ threads (races و deadlocks) من أصعب الـ bugs: بتظهر مرة من ألف، وبتختفي لما تحط printf. عشان كده لازم تفهم القواعد كويس.`,
            how: R`الـ thread بيتعمل عن طريق نظام التشغيل (pthreads على Linux). [[std::thread t(f)]] بيبدأ على طول. الـ lambda بـ [[[&]]] بتشوف counter و m بالـ reference، فكل الـ threads بيشتغلوا على نفس المتغيرات.

الـ mutex بيضمن إن الكود بين القفل والفتح (critical section) بيتنفذ من thread واحد في المرة، وكمان إن اللي كتبه thread قبل ما يفتح القفل بيبان لأي thread بيقفله بعده (memory ordering).

الـ lock في كل لفة غالي: الـ threads بيقضوا وقتهم بيستنوا بعض، فالنسخة دي غالبًا أبطأ من thread واحد. الحل الحقيقي: كل thread يعدّ في متغير محلي بتاعه، ويضيف للمجموع مرة واحدة في الآخر بالـ lock.

deadlock: thread ماسك A ومستني B، وتاني ماسك B ومستني A. الاتنين هيستنوا للأبد. الحل: اقفل دايمًا بنفس الترتيب، أو [[std::scoped_lock(a, b)]].`,
            when: R`لما الشغل ممكن يتقسم لحتت مستقلة (معالجة صور، ملفات كتير، requests)، أو لما محتاج حاجة تشتغل في الخلفية من غير ما توقف الـ UI. ولو الشغل صغير، تكلفة إنشاء الـ threads أكبر من الفايدة. وللحاجات المتكررة استخدم thread pool بدل thread جديد كل مرة.`,
            mistakes: R`تنسى [[join]] فالبرنامج يقع. والـ lambda تعمل capture بالـ reference لمتغير محلي والـ thread يعيش بعده. وتحمي الكتابة بـ mutex وتقرا من غيره. وتعمل lock جوه lock على نفس الـ mutex (deadlock مع نفسك). وتفتكر إن «اشتغلت ١٠ مرات صح» معناها مفيش race: استخدم [[-fsanitize=thread]].`
          },
          lines: [
            "cout.",
            R`[[std::mutex]] و [[std::lock_guard]].`,
            R`[[std::thread]].`,
            "vector.",
            "main.",
            "المتغير المشترك.",
            "القفل اللي بيحميه.",
            R`[[[&]]]: الـ lambda بتشوف counter و m الأصليين.`,
            "100 ألف زيادة.",
            "اقفل. هيتفك لوحده آخر اللفة.",
            "thread واحد بس في المرة يوصل هنا.",
            "قفلة الـ for.",
            "قفلة الـ lambda.",
            "vector من threads.",
            "ابدأ ٤ threads، كلهم بينفذوا work في نفس الوقت.",
            R`[[join]]: استنى كل واحد يخلص.`,
            "400000 بالظبط.",
            "قفلة."
          ],
          sol: R`الناتج:
[[counter=400000]]

من غير الـ lock وبـ [[-O0]]، ٥ تشغيلات عندي طلّعت: [[223691]] و [[303699]] و [[400000]] و [[307926]] و [[322118]]. الفرق عن 400000 هو الزيادات اللي ضاعت. ولاحظ إن مرة منهم طلعت صح بالصدفة: عشان كده «اشتغلت مرة» مش دليل على حاجة.

مع [[-fsanitize=thread]]:
[[WARNING: ThreadSanitizer: data race]]
وتحتها مكان الكتابتين اللي حصلوا في نفس الوقت. (على بعض إصدارات Linux الحديثة TSan ممكن يقع بـ [[unexpected memory mapping]]: شغّله بـ [[setarch $(uname -m) -R ./app]].)

نسخة الـ lock غالبًا أبطأ من thread واحد، لأن الـ ٤ threads بيقضوا أغلب وقتهم مستنيين القفل. الأحسن كل thread يعدّ لوحده:`,
          solCode: R`#include <iostream>
#include <mutex>
#include <thread>
#include <vector>

int main() {
    long long counter = 0;
    std::mutex m;
    std::vector<std::thread> threads;
    for (int t = 0; t < 4; ++t) {
        threads.emplace_back([&] {
            long long local = 0;
            for (int i = 0; i < 100000; ++i) ++local;
            std::lock_guard<std::mutex> lock(m);
            counter += local;
        });
    }
    for (auto &th : threads) th.join();
    std::cout << "counter=" << counter << '\n';
}`
        },
        {
          cmd: "atomic و async",
          title: "std::atomic لعدّاد من غير mutex، و std::async و std::future عشان ترجّع نتيجة من thread",
          desc: R`[[std::atomic<int>]]: متغير عملياته البسيطة ([[++]] و [[+=]] و load و store) بتحصل كخطوة واحدة مينفعش تتقطع. فـ [[hits++]] من كذا thread آمنة من غير mutex. أسرع من الـ mutex للحاجات البسيطة (عدّاد، flag)، بس بتحمي متغير واحد بس. لو محتاج تغيّر متغيرين مع بعض كوحدة، ارجع للـ mutex.

[[std::async(std::launch::async, f, args...)]]: شغّل f في thread تاني، وارجع على طول بـ [[std::future]]. الـ future «وعد» بنتيجة هتيجي.
• [[fut.get()]]: استنى لحد ما النتيجة تيجي ورجّعها. ولو f رمت exception، get بترميه هنا.
• [[std::launch::async]]: لازم thread جديد. من غيرها، الـ implementation ممكن تأجّل التنفيذ لحد ما تنادي get (lazy)، وده غالبًا مش اللي انت عايزه.

ده أسهل من thread و mutex لما الفكرة «احسب حاجة في الخلفية وهات النتيجة». في المثال بنقسم مجموع مليون رقم نصين: نص في thread تاني بـ async، والنص التاني في الـ thread الحالي، وبعدين نجمعهم.

[[std::cref(v)]] من [[<functional>]]: async بتنسخ الـ arguments افتراضيًا (عشان الأمان)، و cref بتقولها «ابعت const reference». لازم الـ v يفضل عايش لحد ما get ترجع.`,
          example: R`#include <atomic>
#include <functional>
#include <future>
#include <iostream>
#include <numeric>
#include <thread>
#include <vector>

long long sum_range(const std::vector<int> &v, std::size_t from, std::size_t to) {
    return std::accumulate(v.begin() + from, v.begin() + to, 0LL);
}

int main() {
    std::atomic<int> hits{0};
    std::vector<std::thread> ts;
    for (int t = 0; t < 4; ++t)
        ts.emplace_back([&hits] { for (int i = 0; i < 50000; ++i) hits++; });
    for (auto &t : ts) t.join();
    std::cout << "hits=" << hits << '\n';

    std::vector<int> v(1'000'000, 1);
    std::size_t half = v.size() / 2;
    auto left = std::async(std::launch::async, sum_range, std::cref(v), 0, half);
    long long right = sum_range(v, half, v.size());
    std::cout << "total=" << left.get() + right << '\n';
}`,
          try: R`غيّر [[std::atomic<int>]] لـ [[int]] عادي وشغّل كذا مرة بـ [[-O0]]. وبعدين خلي [[sum_range]] ترمي [[std::runtime_error]] لو from أكبر من 0، وامسك الـ exception حوالين [[left.get()]]. وآخر حاجة: قسّم المجموع على عدد الـ cores بتاعك ([[std::thread::hardware_concurrency()]]) بـ vector من futures.`,
          flag: "script",
          deep: {
            why: R`أغلب استخدامات الـ threads في الواقع: «اعمل الحتة دي في الخلفية وهات النتيجة» أو «عدّاد مشترك». async و atomic بيغطوا الحالتين دول بكود أقصر وأخطاء أقل من thread و mutex بإيدك.`,
            how: R`الـ atomic بيستخدم أوامر CPU خاصة (زي [[lock xadd]] على x86) بتعمل القراية والتعديل والكتابة كعملية واحدة. افتراضيًا بترتيب الذاكرة الأقوى ([[memory_order_seq_cst]])، وفيه ترتيبات أضعف وأسرع للخبراء ([[relaxed]] و [[acquire]] و [[release]]): متلمسهاش غير لو فاهم كويس.

[[std::async]] بيعمل thread، ولما الـ future يتمسح بيستنى الـ thread يخلص (لو جه من async). يعني لو تجاهلت الـ future اللي async رجّعته، السطر هيستنى لحد ما الشغل يخلص، فمش هيبقى «في الخلفية».

الـ exception اللي بيترمي جوه الـ thread بيتخزن في الـ future، وبيترمي تاني في الـ thread اللي بينادي [[get]].

[[get]] تتنادى مرة واحدة بس. ولو محتاج كذا حد يستنى نفس النتيجة: [[std::shared_future]].`,
            when: R`atomic لعدّادات و flags (زي «وقف الشغل» من thread تاني). async لمهام مستقلة ليها نتيجة. thread و mutex لما فيه حالة مشتركة معقدة. وللشغل الكبير على داتا كتير، فيه parallel algorithms في C++17 ([[std::reduce(std::execution::par, ...)]]) ومكتبات زي Intel TBB و OpenMP.`,
            mistakes: R`تفتكر إن atomic على متغيرين بيخليهم atomic مع بعض. وتتجاهل الـ future بتاع async فتلاقي الكود بقى sequential. وتستخدم async من غير [[std::launch::async]]. وتنادي [[get]] مرتين. وتبعت reference لحاجة هتموت قبل ما الـ thread يخلص.`
          },
          lines: [
            R`[[std::atomic]].`,
            R`[[std::cref]].`,
            R`[[std::async]] و [[std::future]].`,
            "cout.",
            "accumulate.",
            "thread.",
            "vector.",
            "مجموع جزء من الـ vector.",
            R`[[v.begin() + from]]: iterator للبداية. و [[0LL]] عشان المجموع long long.`,
            "قفلة.",
            "main.",
            R`عدّاد atomic بقيمة 0.`,
            "threads.",
            "٤ threads...",
            R`...كل واحد بيزوّد 50 ألف مرة. [[hits++]] آمنة من غير mutex.`,
            "استنى الكل.",
            "200000 بالظبط.",
            "مليون عنصر قيمتهم 1.",
            "النص.",
            R`النص الأول في thread تاني. [[cref]]: من غير نسخ الـ vector.`,
            "النص التاني في الـ thread الحالي في نفس الوقت.",
            R`[[get()]]: استنى نتيجة الـ thread التاني واجمع. 1000000.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[hits=200000]]
[[total=1000000]]

مع [[int]] عادي وبـ [[-O0]]: عندي [[hits=124193]] و [[189660]] و [[163307]] في ٣ تشغيلات (data race). الـ total فضل 1000000 لأن الجزء ده ملوش متغير مشترك بيتكتب.

الـ exception: [[try { left.get(); } catch (const std::exception &e) { ... }]]. الـ exception اترمى في الـ thread التاني، واتنقل جوه الـ future، واترمى تاني عند get.

التقسيم على كل الـ cores:`,
          solCode: R`#include <future>
#include <iostream>
#include <numeric>
#include <thread>
#include <vector>

int main() {
    std::vector<int> v(10'000'000, 1);
    unsigned parts = std::thread::hardware_concurrency();
    if (parts == 0) parts = 4;
    std::size_t chunk = v.size() / parts;
    std::vector<std::future<long long>> futures;
    for (unsigned p = 0; p < parts; ++p) {
        auto from = v.begin() + p * chunk;
        auto to = (p + 1 == parts) ? v.end() : from + chunk;
        futures.push_back(std::async(std::launch::async, [from, to] {
            return std::accumulate(from, to, 0LL);
        }));
    }
    long long total = 0;
    for (auto &f : futures) total += f.get();
    std::cout << parts << " parts, total=" << total << '\n';
}`
        }
      ]
    },
    {
      t: "الأدوات والشغل",
      l: 3,
      n: "sanitizers و valgrind والتحليل، والـ unit tests، والمكتبات الخارجية، و C++ في المسابقات، والشغل فين، وأسئلة الانترفيو، ومشروع ختامي",
      items: [
        {
          cmd: "sanitizers و valgrind",
          title: "ASan و UBSan و TSan و valgrind و clang-tidy: إزاي تمسك أخطاء الذاكرة والـ threads قبل ما توصل للمستخدم",
          desc: R`في المستوى ١ استخدمت [[-fsanitize=address,undefined]]. دي الصورة الكاملة:

الـ sanitizers (بتتحط وقت الـ compile، والبرنامج بيفحص نفسه وهو شغال):
• AddressSanitizer ([[-fsanitize=address]]): القراية والكتابة بره الحدود (stack و heap و globals)، والـ use after free، والـ double free، والـ leaks على Linux. البرنامج بيبطأ حوالي الضعف.
• UndefinedBehaviorSanitizer ([[-fsanitize=undefined]]): signed overflow، والقسمة على صفر، والـ shift الغلط، و NULL dereference، والـ cast الغلط بين أنواع. تكلفته قليلة، وبيتجمع مع ASan عادي.
• ThreadSanitizer ([[-fsanitize=thread]]): الـ data races. مبيتجمعش مع ASan، فبتعمل build لوحده. أبطأ بكتير (٥ لـ ١٥ مرة).
• MemorySanitizer ([[-fsanitize=memory]]): قراية ذاكرة ملهاش قيمة أولية. clang بس.
مع أي sanitizer: [[-g]] عشان أرقام السطور، و [[-fno-omit-frame-pointer]] عشان الـ stack traces تبقى كاملة، و [[-O1]] عشان ميبقاش بطيء أوي.

valgrind: بيشغّل البرنامج العادي (من غير ما تعمل compile تاني) جوه CPU افتراضي ويراقب كل وصول للذاكرة. أبطأ بكتير (١٠ لـ ٥٠ مرة)، بس مفيد لما مش قادر تعمل compile تاني (مكتبة جاهزة) أو عشان [[--leak-check=full]]. على Linux بس عمليًا، ومبيشتغلش مع الـ sanitizers في نفس الوقت.

التحليل الساكن (من غير تشغيل، بيقرا الكود):
• [[clang-tidy]]: مئات الفحوصات (bugs، وأسلوب C++ حديث، وأداء). بيحتاج [[compile_commands.json]] (من CMake) أو [[--]] وبعدها الـ flags.
• [[cppcheck]]: خفيف وسهل.
• [[-Wall -Wextra -Wpedantic -Wshadow -Wconversion]]: الـ compiler نفسه أرخص أداة تحليل.`,
          example: R`# ASan + UBSan: الأساسي وانت بتطوّر وفي الـ tests
g++ -std=c++20 -g -O1 -fno-omit-frame-pointer -fsanitize=address,undefined main.cpp -o app_asan
./app_asan
# TSan للـ threads: build لوحده
g++ -std=c++20 -g -O1 -fsanitize=thread main.cpp -o app_tsan
./app_tsan
# valgrind على build عادي من غير sanitizers
g++ -std=c++20 -g -O0 main.cpp -o app_dbg
valgrind --leak-check=full ./app_dbg
# تحليل ساكن
clang-tidy main.cpp -- -std=c++20
cppcheck --enable=warning,performance main.cpp`,
          try: R`اكتب برنامج صغير فيه ٣ أخطاء: دالة بتعمل [[new int[10]]] ومبتعملش delete، وقراية [[v[v.size()]]] من [[std::vector<int> v = {1, 2, 3};]]، و race بين threadين بيزوّدوا نفس الـ int. اعمل build بـ ASan و UBSan وشغّل: مسك أنهي أخطاء؟ صلّح اللي مسكه وشغّل تاني. وبعدين build بـ TSan. وبعدين شغّل النسخة العادية تحت valgrind (لو على Linux)، وجرّب clang-tidy و cppcheck عليه.`,
          deep: {
            why: R`أخطاء الذاكرة والـ races ممكن تفضل مستخبية شهور وبعدين تظهر عند العميل أو تبقى ثغرة. الـ sanitizers بيحوّلوها لـ crash واضح بالسطر في أول مرة الكود يتنفذ. والشركات اللي بتكتب C++ بجد (Google و Mozilla و Microsoft) بتشغّلهم في الـ CI على كل الـ tests، وبيعملوا fuzzing معاهم (أداة بتولّد inputs عشوائية بالملايين، زي libFuzzer).`,
            how: R`ASan بيحط redzones حوالين كل حجز ويعلّمها «ممنوعة» في shadow memory (byte لكل ٨ bytes من الذاكرة الحقيقية)، وبيحط فحص قبل كل load و store. TSan بيسجّل لكل وصول للذاكرة مين وصل وإمتى (vector clocks) ويكتشف لو وصولين مش مرتبين بقفل أو atomic.

valgrind (أداته الافتراضية memcheck) بيترجم كود البرنامج وهو شغال ويضيف فحوصات لكل instruction، فمحتاجش compile تاني، بس بطيء جدًا.

الـ sanitizers بيمسكوا الأخطاء في الكود اللي اتنفذ بس. عشان كده محتاجين tests كويسة تغطي الحالات.`,
            when: R`ASan و UBSan: دايمًا وانت بتطوّر، وفي كل CI. TSan: لأي كود فيه threads، في build لوحده في الـ CI. valgrind: لما الـ sanitizers مش متاحة. clang-tidy: في الـ editor (clangd بيشغّله لوحده) وفي الـ CI.`,
            mistakes: R`تجمع ASan مع TSan في نفس الـ build (مينفعش). وتشغّل valgrind على build فيه ASan. وتسلّم نسخة الإنتاج بـ sanitizers. وتشوف أول error وتقول «ده من مكتبة» وتتجاهله: غالبًا الغلط عندك وظهر هناك. و TSan يقع على Linux حديث بـ [[unexpected memory mapping]]: الحل [[setarch $(uname -m) -R ./app_tsan]] أو تحديث الـ compiler.`
          },
          lines: [
            "build بـ ASan و UBSan، و -O1 عشان السرعة، و frame pointers عشان الـ traces.",
            "شغّل: لو فيه خطأ بيقف ويطبع التقرير.",
            "build منفصل بـ TSan.",
            "شغّل: بيطبع data race لو فيه.",
            "build عادي للـ valgrind.",
            R`[[--leak-check=full]]: تفاصيل كل leak ومكان الحجز.`,
            R`clang-tidy، والـ flags بعد [[--]].`,
            R`cppcheck بفحوصات الـ warnings والأداء.`
          ],
          sol: R`ASan بيقف عند أول غلط:
[[ERROR: AddressSanitizer: heap-buffer-overflow ... READ of size 4]] (الـ [[v[v.size()]]]).
بعد ما تصلحه وتشغّل تاني، الـ leak بيظهر في الآخر:
[[ERROR: LeakSanitizer: detected memory leaks]]
[[Direct leak of 40 byte(s) in 1 object(s) allocated from:]] (10 × 4 bytes).
والـ race: ASan مش بيشوفه، ده شغل TSan:
[[WARNING: ThreadSanitizer: data race]] ومعاه سطر الكتابتين ورقم الـ thread.

(مع [[-D_GLIBCXX_ASSERTIONS]] مكتبة gcc نفسها بتتشيّك على [[[ ]]] في الـ vector وتوقف بـ [[Assertion '__n < this->size()' failed]]. فلاج مفيد في الـ debug builds من غير تكلفة ASan.)

valgrind على النسخة العادية بيلاقي الاتنين مرة واحدة:
[[Invalid read of size 4]]
[[definitely lost: 40 bytes in 1 blocks]]

clang-tidy بالإعدادات الافتراضية (clang-analyzer) لقى الـ leak:
[[warning: Potential leak of memory pointed to by 'leak' [clang-analyzer-cplusplus.NewDeleteLeaks]]]
ولو شغّلت [[-checks='modernize-*,bugprone-*,performance-*']] هتلاقي اقتراحات كتير منها مش مهم (زي [[modernize-use-trailing-return-type]])، فاختار الفحوصات اللي تناسب فريقك في ملف [[.clang-tidy]].
و cppcheck لقى الاتنين: [[Memory leak: leak [memleak]]] و [[Out of bounds access in 'v[v.size()]']].`
        },
        {
          cmd: "unit testing",
          title: "unit tests في C++ بـ GoogleTest و CTest: إزاي تختبر دوالك وتشغّلهم بأمر واحد",
          desc: R`الـ unit test كود صغير بينادي دالة بـ input معروف ويتأكد من الناتج. أشهر مكتبتين في C++: GoogleTest و Catch2. الاتنين شبه بعض، وهنا GoogleTest لأنها الأكتر انتشارًا في الشركات.

• [[TEST(SuiteName, TestName) { ... }]]: test جديد. الـ suite اسم للمجموعة (غالبًا اسم الدالة أو الـ class).
• [[EXPECT_EQ(a, b)]]: لازم a = b. لو لأ، بيسجّل فشل ويكمّل باقي الـ test.
• [[ASSERT_EQ(a, b)]]: نفس الحاجة بس بيوقف الـ test ده لو فشل. استخدمه لما اللي بعده مالوش معنى (زي pointer طلع null).
• وفيه [[EXPECT_TRUE]] و [[EXPECT_NE]] و [[EXPECT_LT]] و [[EXPECT_NEAR(a, b, eps)]] للأرقام العشرية، و [[EXPECT_THROW(stmt, Type)]].

بتجيب المكتبة بـ CMake [[FetchContent]]: بتنزّلها من GitHub وقت الـ configure وتعملها build مع مشروعك، من غير تسطيب. وبعدين [[gtest_discover_tests]] بتسجّل كل test عند CTest (أداة الـ tests اللي جاية مع CMake)، فتشغّل كله بـ [[ctest --test-dir build]].

الكود اللي هتختبره لازم يبقى في library ([[add_library]]) عشان البرنامج والـ tests الاتنين يستخدموه. وده سبب تاني إن [[main]] تبقى صغيرة وكل المنطق في دوال.

المثال ملف الـ tests لدالة [[clamp]] من درس الـ make. و [[gtest/gtest.h]] بتيجي من GoogleTest، و [[gtest_main]] بيدّيك main جاهزة.`,
          example: R`#include <gtest/gtest.h>
#include "math_utils.h"

TEST(Clamp, KeepsValueInRange) {
    EXPECT_EQ(clamp(5, 0, 10), 5);
}

TEST(Clamp, CutsAtEdges) {
    EXPECT_EQ(clamp(-3, 0, 10), 0);
    EXPECT_EQ(clamp(42, 0, 10), 10);
}

TEST(Add, HandlesNegatives) {
    EXPECT_EQ(add(-2, -3), -5);
}`,
          try: R`اعمل مشروع CMake فيه [[math_utils.h]] و [[math_utils.cpp]] (نفس الدوال بتاعة درس make بس بـ C++)، وملف الـ tests ده، و [[CMakeLists.txt]] اللي في الحل. وبعدين [[cmake -S . -B build]] و [[cmake --build build]] و [[ctest --test-dir build --output-on-failure]]. وبعدين بوّظ clamp بالقصد (رجّع hi لما x أقل من lo) وشغّل تاني واقرا رسالة الفشل.`,
          flag: "script",
          deep: {
            why: R`في C++ الـ compile بياخد وقت والـ bugs ممكن تبقى صامتة (UB)، فالـ tests مع الـ sanitizers هما شبكة الأمان. وأي شركة بتكتب C++ هتطلب منك تكتب tests مع الكود، والـ refactoring من غير tests مخاطرة.`,
            how: R`[[TEST]] macro بيعمل class صغير ويسجّله في قايمة عامة قبل ما main تبدأ. [[gtest_main]] فيها main بتلف على القايمة وتشغّل كل test وتطبع النتيجة، وترجّع exit code غير صفر لو فيه فشل (عشان الـ CI يعرف).

[[gtest_discover_tests]] بتشغّل البرنامج بعد الـ build بـ [[--gtest_list_tests]] عشان تعرف أسماء الـ tests وتسجّلهم عند CTest واحد واحد، فتقدر تشغّل test لوحده: [[ctest --test-dir build -R Clamp]].

الـ FetchContent بينزّل إصدار محدد ([[GIT_TAG v1.15.2]])، فكل اللي في الفريق بيستخدموا نفس الإصدار.`,
            when: R`لأي منطق مهم أو معقد، ولأي bug صلحته (اكتب test بيفشل الأول وبعدين صلّح). وشغّلهم مع ASan و UBSan في الـ CI. Catch2 بديل كويس لو عايز header-light وأسلوب أقرب لـ BDD.`,
            mistakes: R`كل المنطق جوه [[main]] فمتقدرش تختبره. و tests بتعتمد على بعض أو على ترتيب التشغيل. و [[EXPECT_EQ]] على doubles بدل [[EXPECT_NEAR]]. وتختبر الحالة السعيدة بس من غير الحدود (0، و سالب، و فاضي، والحد نفسه). وتنسى [[enable_testing()]] فـ ctest يقول «No tests were found».`
          },
          lines: [
            "GoogleTest.",
            "الدوال اللي هنختبرها.",
            R`[[TEST]]: suite اسمها Clamp و test اسمه KeepsValueInRange.`,
            "5 بين 0 و 10 فبترجع زي ما هي.",
            "قفلة.",
            "test تاني.",
            "أقل من الحد الأدنى.",
            "أكبر من الحد الأعلى.",
            "قفلة.",
            "suite تانية.",
            "جمع أرقام سالبة.",
            "قفلة."
          ],
          sol: R`[[ctest --test-dir build --output-on-failure]]:
[[100% tests passed, 0 tests failed out of 3]]

بعد ما تبوّظ clamp:
[[Expected equality of these values:]]
[[  clamp(-3, 0, 10)]]
[[    Which is: 10]]
[[  0]]
و [[67% tests passed, 1 tests failed out of 3]]، و ctest بيرجّع exit code غير صفر.

الـ [[CMakeLists.txt]] (محتاج إنترنت أول مرة عشان ينزّل GoogleTest):`,
          solCode: R`cmake_minimum_required(VERSION 3.20)
project(mathlib LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(math_utils math_utils.cpp)
target_include_directories(math_utils PUBLIC .)

include(FetchContent)
FetchContent_Declare(googletest
  URL https://github.com/google/googletest/archive/refs/tags/v1.15.2.tar.gz)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

enable_testing()
add_executable(math_tests math_tests.cpp)
target_link_libraries(math_tests PRIVATE math_utils GTest::gtest_main)
include(GoogleTest)
gtest_discover_tests(math_tests)`
        },
        {
          cmd: "vcpkg و Conan",
          title: "إزاي تستخدم مكتبة خارجية في C++ (fmt مثلًا) بـ vcpkg أو Conan أو FetchContent؟",
          desc: R`C++ ملهاش package manager رسمي زي npm أو pip، وده من أكتر الحاجات اللي بتتعب الجدد. الاختيارات المشهورة:

• vcpkg (من Microsoft): أكبر كتالوج تقريبًا، وبيتكامل مع CMake بـ toolchain file، وشغال على Windows و Linux و Mac. في manifest mode بتكتب الـ dependencies في [[vcpkg.json]] جوه المشروع، و CMake بينزّلها ويعملها build وقت الـ configure.
• Conan: مكتوب بـ Python، مرن جدًا وبيدعم binaries جاهزة، ومنتشر في الشركات. الـ dependencies في [[conanfile.txt]] أو [[conanfile.py]].
• CMake [[FetchContent]]: بينزّل الكود من Git ويعمله build مع مشروعك. ممتاز للمكتبات الصغيرة (زي GoogleTest في الدرس اللي فات)، بس كل مكتبة بتتعمل build من الأول.
• مدير حزم النظام ([[apt install libfmt-dev]]): سهل على Linux، بس الإصدار بيبقى على مزاج التوزيعة، ومش موجود بنفس الشكل على Windows.

وفي الحالات كلها، CMake بيلاقي المكتبة بـ [[find_package(fmt CONFIG REQUIRED)]] وبتربطها بـ [[target_link_libraries(app PRIVATE fmt::fmt)]].

المثال بـ vcpkg: [[fmt]] مكتبة تنسيق نصوص مشهورة (نسخة منها دخلت المعيار كـ [[std::format]] في C++20).`,
          example: R`# مرة واحدة: نزّل vcpkg وجهّزه
git clone https://github.com/microsoft/vcpkg.git
./vcpkg/bootstrap-vcpkg.sh
# جوه مشروعك: اعمل vcpkg.json وضيف fmt
./vcpkg/vcpkg new --application
./vcpkg/vcpkg add port fmt
# configure بالـ toolchain بتاع vcpkg (بينزّل fmt ويعمله build هنا)
cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE=vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build
./build/app`,
          try: R`جرّب الطريقة الأسهل الأول: FetchContent لـ fmt ([[FetchContent_Declare(fmt GIT_REPOSITORY https://github.com/fmtlib/fmt GIT_TAG 11.0.2)]] و [[FetchContent_MakeAvailable(fmt)]] و [[target_link_libraries(app PRIVATE fmt::fmt)]])، واطبع [[fmt::print("{} + {} = {}\n", 2, 3, 5);]]. وبعدين جرّب vcpkg بالأوامر اللي فوق على نفس المشروع.`,
          deep: {
            why: R`أي مشروع حقيقي محتاج مكتبات: JSON، و HTTP، و logging، و قواعد بيانات. ولو مش عارف تضيف مكتبة، هتكتب كل حاجة بإيدك أو هتنسخ كود في مشروعك. والانترفيوهات بتسأل «بتدير الـ dependencies إزاي في C++؟».`,
            how: R`[[CMAKE_TOOLCHAIN_FILE]] بيخلي vcpkg يتدخل قبل ما CMake يبدأ: بيقرا [[vcpkg.json]]، وينزّل كل dependency ويعملها build للـ compiler والنظام بتوعك، ويحطها في مكان CMake يلاقيه بـ [[find_package]]. وبيعمل cache للـ builds فالمرة التانية سريعة.

Conan بيعمل نفس الحاجة بخطوة منفصلة: [[conan install . --output-folder=build --build=missing]] بيطلّع toolchain file، وبعدين CMake بيستخدمه. و [[conan profile detect]] مرة واحدة الأول.

[[vcpkg new --application]] بيعمل [[vcpkg.json]] و [[vcpkg-configuration.json]]، و [[vcpkg add port fmt]] بيضيف fmt للـ dependencies. وتعمل commit للملفين دول مع المشروع.`,
            when: R`مكتبة أو اتنين صغيرين: FetchContent. مشروع فيه dependencies كتير أو لازم يتبني على Windows: vcpkg أو Conan (حسب اللي الفريق بيستخدمه). وفي الشركات الكبيرة ممكن تلاقي build systems تانية خالص (Bazel مثلًا).`,
            mistakes: R`تنسخ ملفات المكتبة في مشروعك وتنسى إصدارها. وتخلط مكتبات اتعملت build بـ compiler أو إعدادات مختلفة (خصوصًا Debug و Release على MSVC). وتنسى [[CMAKE_TOOLCHAIN_FILE]] فـ find_package مش لاقي حاجة. وتمسح فولدر build وتستغرب إن الـ configure بقى بطيء: هو بيعيد build للمكتبات.`
          },
          lines: [
            "نزّل vcpkg نفسه.",
            "جهّز الأداة (على Windows: bootstrap-vcpkg.bat).",
            R`اعمل [[vcpkg.json]] للمشروع.`,
            "ضيف fmt كـ dependency.",
            "configure: vcpkg بينزّل fmt ويعمله build.",
            "build.",
            "شغّل."
          ],
          sol: R`مع FetchContent وأول configure (محتاج إنترنت) بينزّل fmt، والبرنامج بيطبع:
[[2 + 3 = 5]]

الـ CMakeLists.txt مع vcpkg فيه [[find_package(fmt CONFIG REQUIRED)]] و [[target_link_libraries(app PRIVATE fmt::fmt)]]، و vcpkg.json فيه:
[[{ "dependencies": [ "fmt" ] }]]

ولو بتستخدم C++20 أو أحدث مع compiler حديث، [[std::format]] من [[<format>]] بيعمل التنسيق ده من غير مكتبة خارجية خالص.`
        },
        {
          cmd: "C++ في المسابقات",
          title: "C++ في المسابقات و LeetCode: fast IO و bits/stdc++.h و long long، وإيه اللي متعملوش في الشغل",
          desc: R`أغلب المشاركين في Codeforces و ICPC بيستخدموا C++: سريعة، والـ STL فيها كل هياكل البيانات المطلوبة جاهزة، والـ time limits غالبًا محسوبة عليها. وده نفس سبب إنها اختيار كويس لانترفيوهات الـ DSA (فيه تاب DSA كامل للمسائل نفسها).

القالب المشهور وكل سطر فيه:
• [[#include <bits/stdc++.h>]]: header داخلي في libstdc++ بتاع gcc بيعمل include لكل المكتبة القياسية. مريح في المسابقة، بس: مش جزء من المعيار، ومش موجود في MSVC ولا في clang على الماك (libc++)، وبيبطّأ الـ compile.
• [[using namespace std;]]: عشان متكتبش [[std::]]. مقبول في ملف مسابقة.
• [[ios::sync_with_stdio(false);]]: بيفصل cin و cout عن printf و scanf، فبيبقوا أسرع بكتير. بعدها متخلطش الاتنين.
• [[cin.tie(nullptr);]]: cin مش هيعمل flush لـ cout قبل كل قراية.
• [[long long]]: أرقام المسابقات بتعدّي 2 مليار بسهولة (مجموع 10^5 رقم كل واحد 10^9). overflow في int أشهر سبب «Wrong Answer».
• [['\n']] بدل [[endl]]: endl بيعمل flush كل سطر، وده بطيء جدًا مع مليون سطر.

قاعدة الوقت التقريبية: حوالي 10^8 عملية بسيطة في الثانية. لو n = 10^5 يبقى [[O(n²)]] = 10^10 كتير، ومحتاج [[O(n log n)]].`,
          example: R`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    long long sum = accumulate(a.begin(), a.end(), 0LL);
    cout << a.front() << ' ' << a.back() << ' ' << sum << '\n';
}`,
          try: R`شغّله بـ [[printf "5\n3 1 4 1 5\n" | ./app]]. وبعدين اعمل ملف فيه مليون رقم ([[seq 1000000 | sed '1i 1000000' > big.txt]]) وقيس [[time ./app < big.txt]] مرة بالسطرين بتوع الـ sync و tie ومرة من غيرهم. وبعدين حل مسألة Two Sum بـ unordered_map في نفس القالب.`,
          flag: "script",
          deep: {
            why: R`لو هتعمل competitive programming أو تذاكر DSA للانترفيو، C++ و STL هيوفّروا عليك كتير. بس لازم تعرف إن الأسلوب ده للمسابقات بس: نفس الحاجات دي في كود شغل حقيقي بتبقى عادات وحشة.`,
            how: R`من غير [[sync_with_stdio(false)]]، الـ cin و cout لازم يفضلوا متزامنين مع stdio بتاع C، فكل عملية بتعدّي بطبقة زيادة. ومن غير [[tie(nullptr)]]، كل [[cin >>]] بيعمل flush لـ cout الأول عشان الـ prompts تظهر قبل الـ input، وده مش محتاجه في مسألة.

[[0LL]] في accumulate عشان الجمع يبقى long long من الأول. لو حطيت [[0]] المجموع int حتى لو العناصر long long.

[[for (auto &x : a) cin >> x;]]: [[&]] عشان تكتب في العنصر نفسه مش نسخة.`,
            when: R`في المسابقات و LeetCode والتمارين. وفي الشغل: includes محددة، و [[std::]] صريحة (أو using لحاجات محددة جوه دالة)، ومتغيرات بأسماء، ومن غير macros زي [[#define ll long long]].`,
            mistakes: R`int بدل long long. و endl في loop كبير. وتخلط cin مع scanf بعد sync_with_stdio(false). و bits/stdc++.h وانت على الماك بـ clang ([[file not found]]). وتحط القالب ده في مشروع حقيقي أو في header.`
          },
          lines: [
            "كل المكتبة القياسية (gcc بس).",
            R`من غير [[std::]] (للمسابقات بس).`,
            "main.",
            "IO أسرع: افصل عن stdio بتاع C.",
            "متعملش flush لـ cout قبل كل قراية.",
            "عدد العناصر.",
            "اقراه.",
            R`[[long long]] احتياطي من الـ overflow.`,
            R`[[auto &]]: اقرا جوه العناصر نفسها.`,
            "رتّب.",
            R`مجموع بـ [[0LL]].`,
            R`أصغر وأكبر ومجموع، و [['\n']] مش endl.`,
            "قفلة."
          ],
          sol: R`مع [[5]] و [[3 1 4 1 5]]:
[[1 5 14]]

قراية مليون رقم بـ [[-O2]]: عندي مع السطرين [[real 0m0.116s]]، ومن غيرهم [[real 0m0.363s]]، يعني ٣ مرات أبطأ لمجرد القراية. الأرقام عندك هتختلف، والفرق بيكبر مع input أكبر.

Two Sum: لكل عنصر x، دوّر على [[target - x]] في unordered_map من قبل كده، ولو مش موجود خزّن x و index بتاعه. [[O(n)]].`,
          solCode: R`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long target;
    cin >> n >> target;
    unordered_map<long long, int> seen;
    for (int i = 0; i < n; ++i) {
        long long x;
        cin >> x;
        auto it = seen.find(target - x);
        if (it != seen.end()) {
            cout << it->second << ' ' << i << '\n';
            return 0;
        }
        seen[x] = i;
    }
    cout << "-1\n";
}`
        },
        {
          cmd: "شغل C و C++",
          title: "C و C++ بيشتغلوا فين في سوق العمل (embedded و ألعاب و systems و HFT)، وتحضّر لكل مجال إزاي؟",
          desc: R`C و C++ مش لغات الـ web العادية، فالوظايف أقل عددًا من JavaScript أو Java أو C#، بس في مجالات ليها طابع خاص والمنافسة فيها على المهارة. الصورة بصراحة:

• Embedded و IoT و automotive: الـ firmware بتاع الأجهزة (microcontrollers زي STM32 و ESP32)، والعربيات، والأجهزة الطبية. C هي الأساس، و C++ بتزيد. في مصر فيه شركات automotive و embedded معروفة بتوظّف خريجين (هندسة اتصالات وكهرباء وحاسبات). المطلوب: C كويسة، و bits و registers، و RTOS، و قراية datasheets، وغالبًا شوية إلكترونيات. المثال بيوريك شكل الكود ده: تشغيل وإطفاء «pins» في register بعمليات الـ bits.
• الألعاب: Unreal Engine بـ C++، ومحركات خاصة في الاستوديوهات الكبيرة. المطلوب: C++ قوية، والرياضة (vectors و matrices)، والأداء والذاكرة. السوق المحلي صغير ومعظمه remote أو بره.
• Systems و infrastructure: قواعد بيانات، ومتصفحات، و compilers، وأنظمة تشغيل، و networking. شركات كبيرة ومشاريع open source.
• HFT والتداول السريع: C++ للـ latency المنخفضة جدًا. رواتب عالية جدًا، ومنافسة صعبة، وأغلبها في لندن ونيويورك وشيكاغو وأمستردام.
• Desktop و Qt: برامج زي أدوات الهندسة والتصميم والبرامج الطبية.
• AI و HPC: الـ kernels والـ inference engines تحت Python (CUDA بتتكتب بـ C++).

نصايح عملية:
• اختار مجال واحد واعمل فيه مشروع حقيقي على GitHub (driver صغير على ESP32، أو لعبة صغيرة بـ SFML أو raylib، أو key-value store بـ sockets).
• الانترفيوهات بتركز على: الذاكرة والـ pointers، و RAII، و virtual، و move، والـ threads، و DSA، وفي الـ embedded: الـ bits والـ interrupts و volatile.
• Rust بتدخل في نفس المجالات دي (خصوصًا systems)، فممكن تبقى خطوتك الجاية بعد C++.`,
          example: R`#include <cstdint>
#include <cstdio>

int main() {
    std::uint8_t reg = 0b0000'0000;
    constexpr std::uint8_t LED = 1u << 3;
    constexpr std::uint8_t MOTOR = 1u << 5;
    reg |= LED;
    reg |= MOTOR;
    reg &= static_cast<std::uint8_t>(~MOTOR);
    bool led_on = reg & LED;
    std::printf("reg=0x%02X led=%d motor=%d\n", reg, led_on, (reg & MOTOR) != 0);
}`,
          try: R`اتوقع الناتج الأول وبعدين شغّل. وبعدين ضيف دالة [[toggle(reg, mask)]] بتقلب bit بـ [[^=]]. وبعدين ادخل على موقع وظايف وابحث عن «Embedded Software Engineer» و «C++ Developer» في بلدك، واكتب أكتر ٥ مهارات اتكررت في الإعلانات.`,
          flag: "script",
          deep: {
            why: R`عشان تقرر بوعي: لو هدفك أول شغل بسرعة في السوق المحلي، الـ web أو الموبايل غالبًا أسرع. لو بتحب الهاردوير أو الألعاب أو الأداء، C و C++ بيفتحوا مجالات أقل زحمة وبتقدّر العمق. ومعرفة C كويس بتفيدك في أي مجال تاني، لأنك هتفهم إيه اللي بيحصل تحت اللغات العالية.`,
            how: R`الـ register في الـ microcontroller عنوان ذاكرة ثابت، كل bit فيه بيتحكم في حاجة (pin شغال أو لأ). [[reg |= LED]] بتشغّل bit واحد من غير ما تلمس الباقي، و [[reg &= ~MOTOR]] بتطفيه، و [[reg & LED]] بتسأل عليه. في الجهاز الحقيقي reg بيبقى [[volatile]] pointer لعنوان من الـ datasheet، عشان الـ compiler ميشيلش القراية والكتابة.

[[0b0000'0000]]: رقم binary (C++14)، والـ [[']] للقراية بس. [[%02X]]: hex بحروف كبيرة في خانتين.

[[static_cast<std::uint8_t>(~MOTOR)]]: [[~]] على uint8_t بيحوّله لـ int الأول (integer promotion)، فبنرجّعه لـ uint8_t صريح عشان الـ warnings.`,
            when: "اقرا الدرس ده قبل ما تستثمر شهور في C++ عشان شغل. ولو قررت، رجّع للمستويات اللي فاتت بعين المجال اللي اخترته، وشوف تاب «الشغل والكارير» عشان الـ CV والانترفيوهات.",
            mistakes: "تتعلم C++ «عشان أقوى لغة» من غير هدف. وتبني CV كله تمارين من غير مشروع حقيقي في المجال. وتتجاهل الأساسيات (pointers و الذاكرة و DSA) وتركز على أحدث features. وفي الـ embedded: تتعلم من غير ما تمسك board حقيقي.",
          },
          lines: [
            R`[[std::uint8_t]]: byte من غير إشارة.`,
            R`[[std::printf]].`,
            "main.",
            R`register وهمي 8 bits، كله أصفار. [[0b]] = binary.`,
            "mask للـ bit رقم 3.",
            "mask للـ bit رقم 5.",
            R`[[|=]]: شغّل الـ LED.`,
            "شغّل الموتور.",
            R`[[&= ~]]: اطفي الموتور بس. [[~]] بتقلب الـ mask.`,
            R`[[&]]: الـ LED شغال؟`,
            "reg=0x08 led=1 motor=0.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[reg=0x08 led=1 motor=0]]
(الـ bit رقم 3 = 8 = 0x08، والموتور اتطفى.)

[[toggle]]: [[reg ^= mask;]]. أول مرة بتشغّل الـ bit وتاني مرة بتطفيه.

المهارات اللي هتتكرر غالبًا في إعلانات الـ embedded: C، و C++، و RTOS، و communication protocols (UART و SPI و I2C و CAN)، و Git، و debugging على الهاردوير. وفي إعلانات C++ العامة: C++17/20، و STL، و multithreading، و Linux، و CMake، و design patterns.`,
          solCode: R`#include <cstdint>
#include <cstdio>

void toggle(std::uint8_t &reg, std::uint8_t mask) { reg ^= mask; }

int main() {
    std::uint8_t reg = 0;
    toggle(reg, 1u << 3);
    std::printf("0x%02X\n", reg);
    toggle(reg, 1u << 3);
    std::printf("0x%02X\n", reg);
}`
        },
        {
          cmd: "أسئلة إنترفيو C و C++",
          title: "أشهر أسئلة انترفيو C و C++: slicing و sizeof و pointer مقابل reference و virtual destructor و الـ stack والـ heap",
          desc: R`أسئلة بتيجي كتير، وإجابتها المختصرة (كل واحدة ليها درس في التاب لو محتاج تفاصيل):

١. الفرق بين pointer و reference؟ الـ reference لازم يتربط أول ما يتعرّف، ومينفعش يبقى null، ومينفعش يتغيّر يشاور على حاجة تانية. الـ pointer متغير فيه عنوان، ممكن null وممكن يتغيّر وليه arithmetic.
٢. الـ stack والـ heap؟ الـ stack للمتغيرات المحلية: سريع وصغير وبيتمسح لوحده مع الدالة. الـ heap للحجز الديناميكي: كبير، وانت (أو RAII) المسؤول عن تحريره.
٣. ليه الـ destructor بتاع الأب لازم virtual؟ عشان [[delete basePtr]] على object من نوع الابن ينادي destructor الابن. من غيرها undefined behavior وغالبًا leak.
٤. object slicing؟ لما تنسخ object ابن في متغير نوعه الأب (بالقيمة)، الجزء بتاع الابن بيتقص، والـ virtual بيرجع لنسخة الأب. الحل: reference أو pointer.
٥. [[sizeof(arr)]] مقابل [[sizeof(ptr)]]؟ الأول حجم الـ array كلها، والتاني حجم pointer (8 على 64-bit). وجوه دالة الـ array بقت pointer.
٦. RAII و rule of 0/3/5؟ المورد بيتاخد في الـ constructor ويترجّع في الـ destructor. ولو كتبت واحدة من (destructor و copy و move) غالبًا محتاج الخمسة، والأحسن متكتبش ولا واحدة (rule of 0).
٧. [[std::move]] بتعمل إيه؟ ولا حاجة لوحدها: cast لـ rvalue reference. الـ move الحقيقي في الـ move constructor أو assignment.
٨. unique_ptr مقابل shared_ptr؟ مالك واحد ومن غير تكلفة، مقابل ملكية مشتركة بعدّاد. وweak_ptr لكسر الدواير.
٩. vector مقابل list؟ vector تقريبًا دايمًا أسرع عمليًا بسبب الـ cache، حتى في حالات الـ list المفروض تكسب فيها نظريًا.
١٠. [[const]] بعد دالة member؟ الدالة مبتغيّرش الـ object، وده اللي بيخليها تتنادى على const objects.
١١. الـ virtual بيشتغل إزاي؟ vtable لكل class و vptr في كل object، والنداء بيتحدد وقت التشغيل.
١٢. undefined behavior؟ حاجات المعيار مش بيحدد نتيجتها (overflow في signed، و out of bounds، و use after free). البرنامج ممكن يعمل أي حاجة، والـ compiler بيفترض إنها مش هتحصل.

المثال فيه ٣ منهم في كود: slicing، و sizeof، و reference.`,
          example: R`#include <iostream>

struct Base {
    virtual ~Base() = default;
    virtual void hi() const { std::cout << "Base\n"; }
};

struct Derived : Base {
    void hi() const override { std::cout << "Derived\n"; }
};

void by_value(Base b) { b.hi(); }
void by_ref(const Base &b) { b.hi(); }

int main() {
    Derived d;
    by_value(d);
    by_ref(d);
    int arr[5] = {};
    int *p = arr;
    std::cout << sizeof(arr) << ' ' << sizeof(p) << '\n';
    int i = 5;
    int &r = i;
    r = 7;
    std::cout << i << '\n';
}`,
          try: R`اتوقع الناتج سطر سطر قبل ما تشغّل. وبعدين جاوب بصوت عالي من غير ما تبص: إيه الفرق بين [[new]]/[[delete]] و [[malloc]]/[[free]]؟ وإيه اللي ممكن يحصل لو عملت [[delete]] على حاجة اتعملت بـ [[new[]]]؟ وليه [[i++ + ++i]] غلط؟ وامتى الـ destructor بيتنادى للـ objects جوه vector؟`,
          flag: "script",
          deep: {
            why: R`انترفيوهات C++ بتختبر إنك فاهم إيه اللي بيحصل في الذاكرة، مش بس الـ syntax. والأسئلة دي بتتكرر لأنها بتفرق بين حد بيكتب C++ زي Java وحد فاهمها. الإجابة المختصرة الواضحة مع مثال صغير أحسن من الإجابة الطويلة.`,
            how: R`[[by_value(d)]] بتعمل Base جديد بالـ copy constructor بتاع Base من الجزء Base اللي في d، فالـ object اللي جوه الدالة Base فعلًا والـ vptr بتاعه بيشاور على جدول Base، فبيطبع Base.

[[new]] مقابل [[malloc]]: new بتحجز وتنادي الـ constructor، وبترمي [[std::bad_alloc]] لو فشلت، ونوعها صح من غير cast. delete بتنادي الـ destructor وتحرر. ومينفعش تخلطهم ([[free]] على حاجة من new = UB). و [[delete]] على [[new[]]] = UB، لازم [[delete[]]].

الـ vector بينادي destructor كل عنصر لما يتمسح، أو لما تعمل erase أو pop_back أو clear.`,
            when: "راجع الدرس ده قبل أي انترفيو C أو C++. ولكل سؤال جاوب بجملة، وبعدين مثال كود صغير (زي المثال هنا)، وبعدين الحالة اللي بيفرق فيها في الواقع.",
            mistakes: R`تحفظ الإجابات من غير ما تجرّبها في كود. وتقول «reference هو pointer» من غير الفروق. وتقول إن [[std::move]] بتنقل. وتنسى الـ virtual destructor في أي سؤال تصميم فيه وراثة. وتقول إن الـ UB «بيوقع البرنامج»: ممكن ميوقعوش خالص.`
          },
          lines: [
            "cout.",
            "أب فيه virtual.",
            "virtual destructor.",
            "دالة virtual.",
            "قفلة.",
            "ابن.",
            "override.",
            "قفلة.",
            "بالقيمة: slicing.",
            "بالـ reference: polymorphism.",
            "main.",
            "object ابن.",
            "Base: اتقص.",
            "Derived.",
            "array من ٥ int كلهم صفر.",
            "pointer لأول عنصر.",
            "20 و 8.",
            "متغير.",
            "reference ليه.",
            "التعديل بيوصل لـ i.",
            "7.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[Base]]
[[Derived]]
[[20 8]]
[[7]]

إجابات سريعة:
• new و delete: بينادوا constructor و destructor، وبيرموا exception، ومن غير cast. malloc و free: bytes بس. ومينفعش تخلطهم.
• [[delete]] على [[new[]]]: undefined behavior (غالبًا destructor واحد بس بيتنادى أو crash).
• [[i++ + ++i]]: تعديل i مرتين من غير ترتيب محدد = UB.
• الـ vector بينادي destructor كل عنصر لما يتمسح أو يعمل erase أو pop_back أو clear.`
        },
        {
          cmd: "مشروع ختامي",
          title: "مشروع ختامي: أداة سطر أوامر بتعد الكلمات في ملف وتطبع الأكثر تكرارًا",
          desc: R`المشروع ده بيجمع أغلب اللي اتعلمته في أداة حقيقية صغيرة: [[wordfreq FILE [TOP]]] بتقرا ملف نصي، وتعد كل كلمة (من غير فرق بين الحروف الكبيرة والصغيرة، ومن غير علامات الترقيم)، وتطبع أكتر TOP كلمة (افتراضيًا 5).

اللي مستخدم فيه:
• [[argc]] و [[argv]] والـ exit codes، و [[std::cerr]] للأخطاء (زي stderr في C).
• [[std::ifstream]]: ملف بـ RAII، بيتقفل لوحده. و [[if (!in)]] بتتشيّك إن الفتح نجح.
• [[std::stoul]]: نص لـ unsigned long، وبترمي لو مش رقم.
• [[std::unordered_map]] للعدّ، و [[std::vector<std::pair<...>>]] عشان نرتب.
• [[std::sort]] بـ lambda: الأكثر تكرارًا الأول، ولو متساويين أبجديًا (عشان الناتج يبقى ثابت).
• [[std::isalpha]] و [[std::tolower]] من [[<cctype>]]، مع [[unsigned char]] (لازم، لأن تمرير char سالب ليهم undefined behavior).

بعد ما يشتغل، الخطوات اللي بتحوّله من تمرين لمشروع تحطه في الـ CV موجودة في «جرّب».`,
          example: R`#include <algorithm>
#include <cctype>
#include <fstream>
#include <iostream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

std::string normalize(const std::string &word) {
    std::string out;
    for (unsigned char c : word)
        if (std::isalpha(c)) out += static_cast<char>(std::tolower(c));
    return out;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        std::cerr << "usage: " << argv[0] << " FILE [TOP]\n";
        return 1;
    }
    std::ifstream in(argv[1]);
    if (!in) {
        std::cerr << "cannot open " << argv[1] << '\n';
        return 1;
    }
    std::size_t top = argc > 2 ? std::stoul(argv[2]) : 5;
    std::unordered_map<std::string, int> freq;
    std::string word;
    while (in >> word) {
        std::string w = normalize(word);
        if (!w.empty()) ++freq[w];
    }
    std::vector<std::pair<std::string, int>> rows(freq.begin(), freq.end());
    std::sort(rows.begin(), rows.end(), [](const auto &a, const auto &b) {
        return a.second != b.second ? a.second > b.second : a.first < b.first;
    });
    for (std::size_t i = 0; i < rows.size() && i < top; ++i)
        std::cout << rows[i].second << ' ' << rows[i].first << '\n';
}`,
          try: R`اعمل ملف [[text.txt]] فيه [[The cat and the dog. The END, the end!]] وشغّل [[./wordfreq text.txt 3]]. وبعدين حوّله لمشروع: (1) قسّمه: [[wordfreq.h]] و [[wordfreq.cpp]] فيهم [[normalize]] ودالة [[count_words(std::istream &)]] ودالة [[top_n]]، و [[main.cpp]] صغيرة. (2) CMakeLists.txt فيه library و app. (3) GoogleTest لـ normalize و top_n (بما فيهم الحالات: ملف فاضي، و TOP أكبر من عدد الكلمات). (4) build بـ ASan و UBSan وشغّل الـ tests. (5) ارفعه على GitHub بـ README فيه أمثلة تشغيل.`,
          flag: "script",
          deep: {
            why: "المشاريع الصغيرة الكاملة (مقسومة، وليها build و tests و README) بتوري إنك تعرف تشتغل زي مهندس، مش بس تحل تمارين. والمشروع ده صغير كفاية تخلصه في يوم أو اتنين، وفيه أغلب أساسيات C++ الحديثة.",
            how: R`[[in >> word]] بيقرا كلمة لحد المسافة، فـ «dog.» و «END,» بيوصلوا بعلامات الترقيم، و normalize بتشيلها. الـ loop بيقف لما القراية تفشل (آخر الملف).

[[rows(freq.begin(), freq.end())]]: بيعمل vector من كل أزواج الـ map مرة واحدة، لأن unordered_map مينفعش يترتب.

الـ lambda بتاعة الـ sort فيها [[const auto &]]: generic lambda (C++14) بتشتغل مع أي نوع. والشرط: لو العدد مختلف رتّب بالعدد تنازليًا، ولو متساوي رتّب بالكلمة أبجديًا. ومن غير الشرط التاني الترتيب هيختلف من تشغيل لتاني (unordered_map مالوش ترتيب)، والـ tests مش هتبقى ثابتة.

لو الملف كبير جدًا وعايز أسرع: اقرا الملف كله مرة واحدة وقطّعه بـ string_view، و [[reserve]] للـ map، و [[std::partial_sort]] بدل sort لما TOP صغير.`,
            when: "بعد ما تخلص المستويين ١ و ٢ ومعظم ٣. وبعدها اعمل مشروع في المجال اللي اخترته من درس «شغل C و C++»: لعبة صغيرة، أو firmware على board، أو سيرفر TCP بسيط.",
            mistakes: R`تحط كل حاجة في main فمتقدرش تختبر. وتنسى [[unsigned char]] مع isalpha. وتستخدم [[std::map]] وتفتكره مترتب بالعدد (هو مترتب بالمفتاح). ومتتعاملش مع TOP غلط (حروف مكان رقم): [[stoul]] هترمي exception، فامسكه وارجع برسالة واضحة. وترفع المشروع من غير README ولا tests.`
          },
          lines: [
            "sort.",
            "isalpha و tolower.",
            R`[[std::ifstream]].`,
            R`cout و [[cerr]].`,
            "string.",
            "unordered_map.",
            "pair.",
            "vector.",
            "بتشيل أي حاجة مش حرف وبتصغّر الحروف.",
            "النتيجة.",
            R`[[unsigned char]]: لازم مع دوال cctype.`,
            "حرف؟ ضيفه صغير.",
            "رجّع.",
            "قفلة.",
            "main بـ arguments.",
            "لو مفيش اسم ملف.",
            R`رسالة استخدام على [[std::cerr]].`,
            "exit code 1.",
            "قفلة.",
            "افتح الملف (RAII: هيتقفل لوحده).",
            "لو الفتح فشل.",
            "رسالة.",
            "exit code 1.",
            "قفلة.",
            R`TOP من الـ argument التالت، أو 5. [[stoul]] بترمي لو مش رقم.`,
            "عدّاد الكلمات.",
            "الكلمة الحالية.",
            "اقرا كلمة كلمة لحد آخر الملف.",
            "نضّفها.",
            "عدّها لو فاضل فيها حروف.",
            "قفلة.",
            "انسخ الأزواج في vector عشان نرتب.",
            "رتّب بـ lambda...",
            "...العدد الأكبر الأول، ولو متساويين أبجديًا.",
            "قفلة الـ lambda والـ sort.",
            "اطبع أول TOP (أو أقل لو الكلمات أقل).",
            "العدد والكلمة.",
            "قفلة main."
          ],
          sol: R`مع [[The cat and the dog. The END, the end!]] و TOP = 3:
[[4 the]]
[[2 end]]
[[1 and]]
(الـ the أربع مرات بعد التصغير، و end مرتين بعد شيل الـ «,» والـ «!»، وبعدين and و cat و dog كلهم مرة، و and أول واحدة أبجديًا.)

[[./wordfreq]] لوحده: رسالة الـ usage و exit code 1. [[./wordfreq missing.txt]]: [[cannot open missing.txt]] و exit code 1. [[./wordfreq text.txt abc]]: [[std::invalid_argument]] من stoul وهيقفل البرنامج، وده اللي المفروض تصلحه في خطوة التقسيم.

شكل الـ header بعد التقسيم:`,
          solCode: R`// wordfreq.h
#pragma once
#include <cstddef>
#include <istream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

std::string normalize(const std::string &word);
std::unordered_map<std::string, int> count_words(std::istream &in);
std::vector<std::pair<std::string, int>> top_n(const std::unordered_map<std::string, int> &freq,
                                               std::size_t n);`
        }
      ]
    }
  ]
});
