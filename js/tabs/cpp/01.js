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
    }
  ]
});
