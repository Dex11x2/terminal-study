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
          teach: R`## الأوامر دي بتعمل إيه؟

المثال فيه طريقة تسطيب لكل نظام، وانت هتشغّل **الجزء بتاع نظامك بس**، وبعدين سطرين [[--version]] تتأكد بيهم. جزء Ubuntu اتجرّب فعلًا في [[docker run --rm ubuntu:24.04]] (container فاضي، فالـ [[sudo]] مش موجودة فيه لأنك أصلًا root). أجزاء Fedora والماك و MSYS2 من الـ docs الرسمية لكل واحد.

---

## ١. Ubuntu و Debian و WSL

### قبل التسطيب

~~~bash
gcc --version
~~~

~~~text الناتج على ubuntu:24.04 نضيف
bash: line 1: gcc: command not found
~~~

[[command not found]] يعني الـ shell دوّر على برنامج اسمه [[gcc]] في كل الفولدرات اللي في الـ [[PATH]] وملقاهوش.

### [[sudo apt update]]

- [[sudo]] (superuser do): نفّذ الأمر بصلاحيات الـ admin (root)، لأن التسطيب بيكتب في فولدرات النظام. هيطلب الباسورد بتاعك.
- [[apt]]: مدير الحزم (package manager) بتاع Ubuntu و Debian.
- [[update]]: مبيسطّبش حاجة. بينزّل **القايمة** الجديدة: أنهي حزم موجودة وآخر إصدار من كل واحدة. من غيرها ممكن apt يدوّر على إصدار اتشال من السيرفر.

### [[sudo apt install build-essential gdb]]

- [[install]]: سطّب الحزم اللي بعدها.
- [[build-essential]]: حزمة «فاضية» تقريبًا، شغلتها إنها تسحب معاها الحاجات اللازمة للبناء. لو سألت عليها:

~~~bash
dpkg -s build-essential | grep Depends
~~~

~~~text الناتج
Depends: libc6-dev | libc-dev, gcc (>= 4:12.3), g++ (>= 4:12.3), make, dpkg-dev (>= 1.17.11)
~~~

يعني: [[gcc]] و [[g++]] و [[make]] و [[libc6-dev]] (الـ headers زي [[stdio.h]] ومكتبة C نفسها). و [[dpkg -s]] بيعرض معلومات حزمة متسطّبة (s = status).
- [[gdb]]: الـ GNU debugger، ليه درس في آخر المستوى.

apt بيقولك قبل ما يبدأ هينزّل قد إيه:

~~~text الناتج (جزء)
1 upgraded, 151 newly installed, 0 to remove and 2 not upgraded.
Need to get 130 MB of archives.
After this operation, 441 MB of additional disk space will be used.
~~~

١٥١ حزمة لأن كل واحدة محتاجة حاجات تانية (dependencies). وعلى جهازك هيسألك [[Do you want to continue? [Y/n]]] فاكتب [[y]]. (في الـ container استخدمت [[-y]] عشان يوافق لوحده.)

### اتأكد

~~~bash
gcc --version
g++ --version
~~~

~~~text الناتج على ubuntu:24.04
gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0
g++ (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0
~~~

- [[13.3.0]] رقم إصدار GCC. اللي بين القوسين نسخة Ubuntu من الحزمة.
- و [[make --version]] طلع [[GNU Make 4.3]]، و [[gdb --version]] طلع [[GNU gdb (Ubuntu 15.1-1ubuntu1~24.04.1) 15.1]].
- الأمثلة في التاب ده اتجرّبت على صورة Docker الرسمية [[gcc:14]] اللي فيها [[gcc (GCC) 14.4.0]]. أي إصدار من 11 وطالع يكفي لـ C++20 اللي هنستخدمه.

---

## ٢. Fedora: [[sudo dnf install gcc gcc-c++ make gdb]]

[[dnf]] مدير الحزم بتاع Fedora (ومعاه RHEL و Rocky). مفيهوش [[build-essential]]، فبتكتب الأسامي بنفسك. والفرق المهم: g++ اسم حزمته هنا [[gcc-c++]]. (من الـ docs، مش متجرّب هنا.)

---

## ٣. macOS: [[xcode-select --install]]

بيفتح نافذة تسطيب «Command Line Tools for Xcode» (من غير Xcode الكبير). فيها [[clang]] و [[make]] و [[git]]. والفخ: الأمر [[gcc]] على الماك موجود بس بيشاور على clang. [[gcc --version]] هناك بيكتب [[Apple clang version ...]]. والـ debugger على الماك [[lldb]] مش gdb. (من الـ docs بتاعة Apple.)

---

## ٤. Windows من غير WSL: MSYS2

~~~bash
pacman -S mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-gdb
~~~

بيتكتب جوه نافذة «MSYS2 UCRT64» بعد تسطيب MSYS2 من msys2.org (من الـ docs بتاعة MSYS2، مش متجرّب هنا).

| الحتة | معناها |
|---|---|
| [[pacman]] | مدير الحزم (جاي من Arch Linux) |
| [[-S]] | sync: نزّل وسطّب |
| [[mingw-w64]] | gcc معمول يطلّع برامج Windows عادية ([[.exe]]) |
| [[ucrt]] | بيستخدم Universal C Runtime، مكتبة C الحديثة في Windows |
| [[x86_64]] | معالجات 64-bit |
| [[gcc]] / [[gdb]] | اسم الأداة في الآخر (حزمة gcc فيها g++ كمان) |

بعدها ضيف [[C:\msys64\ucrt64\bin]] للـ PATH وافتح ترمنال **جديد**، وجرّب [[gcc --version]] في PowerShell. لو قال [[is not recognized]] يبقى الـ PATH لسه مش متظبط.

والطريقة التالتة على Windows: Visual Studio Community مع «Desktop development with C++»، وده بيدّيك [[cl]] (MSVC) بتشغّله من «Developer PowerShell for VS». (من الـ docs بتاعة Microsoft.)

---

## الخلاصة

| النظام | الأمر | بيسطّب |
|---|---|---|
| Ubuntu / WSL | [[sudo apt install build-essential gdb]] | gcc 13 و g++ و make و gdb |
| Fedora | [[sudo dnf install gcc gcc-c++ make gdb]] | نفس الحاجات |
| macOS | [[xcode-select --install]] | clang (والأمر gcc = clang) |
| Windows | [[pacman -S mingw-w64-ucrt-x86_64-gcc]] في MSYS2 | gcc بيطلّع .exe |

- الاختبار في كل الحالات: [[gcc --version]] و [[g++ --version]] في ترمنال جديد.
- [[command not found]] أو [[is not recognized]] = مش متسطّب، أو مش في الـ PATH.`,
          lines: [
            "تحديث قايمة الحزم على Ubuntu أو Debian.",
            R`[[build-essential]] فيها gcc و g++ و make، و [[gdb]] الـ debugger.`,
            "نفس الحاجة على Fedora: gcc-c++ هو g++.",
            "على الماك: أدوات سطر الأوامر بتاعة Xcode، وفيها clang.",
            "على MSYS2: gcc و gdb من بيئة UCRT64.",
            "يطبع إصدار الـ C compiler، ولو طبع يبقى في الـ PATH.",
            "يطبع إصدار الـ C++ compiler."
          ],
          sol: R`على Ubuntu 24.04 هتلاقي حاجة زي:
[[gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0]]
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
          teach: R`## البرنامج بيعمل إيه؟

بيطبع سطر واحد ويخلص. بس السبع سطور دول هما الهيكل اللي كل برنامج C هتكتبه بيبدأ منه، فهنفكهم سطر سطر. كل اللي تحت اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0 على Linux x86-64).

---

## ١. التعليق

~~~c
// stdio.h فيه printf
~~~

[[//]] بداية تعليق لحد آخر السطر. الـ compiler بيرميه خالص، ده للي بيقرا الكود بس. وفيه شكل تاني بيمتد على كذا سطر: [[/* ... */]].

---

## ٢. [[#include <stdio.h>]]

~~~c
#include <stdio.h>
~~~

- [[#]] في أول السطر: ده مش كود C عادي، ده أمر للـ **preprocessor**، برنامج بيعدّي على الملف **قبل** الـ compile ويعمل شوية تبديلات نصية.
- [[include]]: «حط هنا محتوى الملف ده بالحرف». نسخ ولصق، مش أكتر.
- [[stdio.h]]: اختصار standard input/output، و [[.h]] يعني header: ملف فيه **تعريفات** الدوال (اسمها وأنواعها) من غير الكود بتاعها. منها [[printf]].
- [[< >]]: «دوّر على الملف في فولدرات النظام». لو كتبت [[" "]] بدلها ([[#include "my.h"]]) بيدوّر في فولدر ملفك الأول، ودي للـ headers بتاعتك.

ومن غير السطر ده الـ compiler مش هيعرف [[printf]] دي إيه.

---

## ٣. [[int main(void)]]

~~~c
int main(void) {
~~~

| الحتة | معناها |
|---|---|
| [[int]] | الدالة بترجّع رقم صحيح (integer) |
| [[main]] | الاسم. نظام التشغيل بيدوّر على الدالة دي بالاسم ده ويبدأ منها |
| [[(void)]] | قايمة الـ parameters. [[void]] يعني «فاضي»: مبتاخدش حاجة |
| [[{]] | بداية جسم الدالة |

في C لو كتبت [[()]] فاضية من غير [[void]] (قبل C23) معناها «عدد مش محدد من الـ parameters» مش «صفر»، عشان كده [[(void)]] أدق.

---

## ٤. [[printf]]

~~~c
    printf("Hello, World from C!\n");
~~~

- [[printf]]: print formatted. بتاخد نص بين علامتين مزدوجتين [[" "]] وتطبعه على الـ stdout (الشاشة عادةً).
- [[\n]]: الـ backslash ([[\]]) معناه «الحرف اللي بعدي ليه معنى خاص» (escape sequence). [[\n]] = newline، سطر جديد. من غيرها الـ prompt بتاع الترمنال بيطلع لازق في آخر الكلمة.
- [[;]]: آخر الـ statement. الـ compiler مبيعتمدش على السطور خالص، الـ [[;]] هي اللي بتقوله الجملة خلصت.
- المسافات الأربعة في أول السطر للقراية بس، الـ compiler مش فارق معاه.

---

## ٥. [[return 0;]] و [[}]]

~~~c
    return 0;
}
~~~

[[return]] بتخرج من الدالة وترجّع القيمة. ولأن دي [[main]]، الـ 0 بتروح لنظام التشغيل كـ **exit code**: 0 = «خلصت تمام» (الدرس بعد الجاي بيشرحه). و [[}]] قفلة الـ [[{]] بتاعة main.

---

## ٦. compile وتشغيل

~~~bash
gcc -std=c17 -Wall -Wextra main.c -o app
./app
echo $?
~~~

~~~text الناتج
Hello, World from C!
0
~~~

- [[gcc]]: الـ compiler. [[main.c]] الملف اللي هيترجمه.
- [[-std=c17]]: استخدم إصدار C17 من اللغة. [[-Wall -Wextra]]: شغّل warnings كتير (W = warning).
- [[-o app]]: اسم الملف التنفيذي اللي هيطلع (o = output). من غيرها بيتسمّى [[a.out]].
- [[./app]]: [[./]] يعني «من الفولدر اللي انا فيه»، لأن الترمنال على Linux مش بيدوّر في الفولدر الحالي لوحده. على Windows: [[.\app.exe]].
- [[echo $?]]: بيطبع الـ exit code بتاع آخر أمر، وطلع 0 اللي رجّعناه.

---

## ٧. لما تنسى الـ [[;]] (الـ try)

مسحت الـ [[;]] اللي بعد printf وعملت compile:

~~~text الناتج
main.c: In function 'main':
main.c:5:37: error: expected ';' before 'return'
    5 |     printf("Hello, World from C!\n")
      |                                     ^
      |                                     ;
    6 |     return 0;
      |     ~~~~~~
~~~

نقراها كده:

- [[main.c:5:37]]: الملف، السطر ٥، العمود ٣٧ (آخر سطر الـ printf بالظبط).
- [[error]]: خطأ، فمفيش ملف تنفيذي طلع. (الـ [[warning]] بيكمّل ويطلّع الملف.)
- [[expected ';' before 'return']]: «كنت مستني [[;]] قبل [[return]]». الـ compiler مكتشفش النقص غير لما شاف [[return]] بدأت.
- الـ [[^]] بتشاور على المكان، والسطر اللي تحتها فيه [[;]] بيقترح تحطها هناك، و [[~~~~~~]] تحت [[return]] الكلمة اللي كشفت الغلط.

القاعدة: لو الخطأ في سطر شكله سليم، بص على السطر اللي **قبله**.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[#include <stdio.h>]] | الـ preprocessor بيلزق تعريف printf |
| [[int main(void) {]] | البرنامج بيبدأ هنا، ويرجّع int |
| [[printf("...\n");]] | اطبع وانزل سطر |
| [[return 0;]] | exit code 0 = نجاح |

- [[#]] = preprocessor، و [[;]] = آخر الجملة، و C بتفرق بين [[printf]] و [[Printf]].
- [[gcc main.c -o app]] وبعدين [[./app]].`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

بتعمل نفس اللي [[gcc main.c -o app]] بيعمله، بس مرحلة مرحلة عشان تشوف كل مرحلة بتطلّع إيه. الملف هو Hello World بتاع الدرس اللي فات. كله اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0، Linux x86-64).

~~~text المراحل الأربعة
main.c  --(-E)-->  main.i  --(-S)-->  main.s  --(-c)-->  main.o  --(link)-->  app
 C          preprocess    C كبير    compile    assembly   assemble   machine code   link   ملف بيشتغل
~~~

---

## ١. [[gcc -E main.c -o main.i]]: الـ preprocess

- [[-E]]: «اعمل preprocess بس واقف». الـ preprocessor بيلزق محتوى [[stdio.h]] مكان الـ [[#include]]، ويشيل التعليقات.
- [[-o main.i]]: اكتب الناتج هنا. [[.i]] الامتداد المعتاد لـ C بعد الـ preprocess.

~~~bash
wc -l main.i
tail -8 main.i
~~~

~~~text الناتج
817 main.i
# 3 "main.c" 2


# 4 "main.c"
int main(void) {
    printf("Hello, World from C!\n");
    return 0;
}
~~~

- [[wc -l]] بيعدّ السطور (wc = word count، و [[-l]] = lines): ٨١٧ سطر من ملف كان ٧ سطور. كلهم تعريفات جت من [[stdio.h]] والـ headers اللي هو بيعملها include.
- الكود بتاعك في الآخر خالص، والتعليق اختفى.
- السطور اللي زي [[# 4 "main.c"]] علامات بيسيبها الـ preprocessor عشان الـ compiler يعرف كل سطر جه منين ويقولك رقم السطر الصح في رسايل الخطأ.

---

## ٢. [[gcc -S main.i -o main.s]]: الـ compile

- [[-S]]: «اعمل compile لحد الـ assembly وواقف». الـ assembly هي أوامر الـ CPU مكتوبة بأسامي يقدر بني آدم يقراها. هنا بتطلع أخطاء الكتابة والـ warnings.

~~~text أهم سطور main.s
.LC0:
	.string	"Hello, World from C!"
main:
	pushq	%rbp
	movq	%rsp, %rbp
	movl	$.LC0, %edi
	call	puts
	movl	$0, %eax
	popq	%rbp
	ret
~~~

مش مطلوب تحفظ assembly، بس اقرا الفكرة:

- [[.LC0]]: النص اتحط في مكان في الذاكرة ليه اسم. ولاحظ إن الـ [[\n]] اختفت من النص.
- [[movl $.LC0, %edi]]: حط عنوان النص في الـ register اللي أول argument بيتبعت فيه.
- [[call puts]]: هنا المفاجأة: انت كاتب [[printf]]، و gcc نادى [[puts]]. لأن printf بنص ثابت آخره [[\n]] ومفيهوش [[%]] زي [[puts]] بالظبط (puts بتطبع النص وتضيف سطر جديد لوحدها)، و puts أبسط وأسرع. عشان كده الـ [[\n]] اتشالت من النص.
- [[movl $0, %eax]] ثم [[ret]]: ده الـ [[return 0]]. القيمة اللي بترجع بتتحط في [[eax]].

---

## ٣. [[gcc -c main.s -o main.o]]: الـ assemble

- [[-c]]: «حوّل لـ object file وواقف من غير link».

~~~bash
file main.o
~~~

~~~text الناتج
main.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
~~~

- [[file]] أمر بيقولك نوع الملف من محتواه. [[ELF]] هو شكل الملفات التنفيذية على Linux.
- الكلمة المهمة [[relocatable]]: الملف فيه machine code بس لسه فيه «خرم»: [[puts]] مكانها مش معروف (هي في مكتبة C مش في ملفك). عشان كده مينفعش يتشغّل لوحده. حجمه ١٣٦٠ byte.

---

## ٤. [[gcc main.o -o app]]: الـ link

لما تدّي gcc ملف [[.o]] من غير [[-E]] ولا [[-S]] ولا [[-c]]، بيعمل link: بيجمع ملفات الـ [[.o]] ويربطها بمكتبة C (اللي فيها كود [[puts]])، ويسد الخرم.

~~~bash
./app
file app
~~~

~~~text الناتج
Hello, World from C!
app: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, not stripped
~~~

- [[executable]] بدل [[relocatable]]: ده ملف بيشتغل.
- [[dynamically linked]]: مكتبة C مش متنسخة جوه الملف، هي ملف منفصل على النظام بيتحمّل وقت التشغيل. عشان كده الملف صغير (١٥٦٨٨ byte).

ولو الـ linker ملقاش دالة في أي ملف ولا مكتبة، بيطلّع [[undefined reference to $__btfoo']]. ده خطأ link مش خطأ compile: الكود سليم، بس فيه حتة ناقصة في الأمر.

---

## ٥. كله مرة واحدة بالـ flags

~~~bash
gcc -std=c17 -Wall -Wextra -g main.c -o app
./app
~~~

| الـ flag | معناه |
|---|---|
| [[-std=c17]] | استخدم معيار C17 (فيه كمان [[c99]] و [[c11]] و [[c23]]) |
| [[-Wall]] | شغّل مجموعة warnings كبيرة (مش «كل» الـ warnings رغم الاسم) |
| [[-Wextra]] | warnings زيادة فوق [[-Wall]] |
| [[-g]] | حط أرقام السطور وأسماء المتغيرات جوه الملف عشان الـ debugger |
| [[-o app]] | اسم الناتج |

---

## ٦. [[gcc -std=c17 -O2 main.c -o app]]

[[-O2]] (حرف O كبير، يعني Optimize، مستوى 2): الـ compiler بيعيد ترتيب الكود ويشيل اللي ملوش لازمة عشان يبقى أسرع. الافتراضي [[-O0]] (من غير optimization) لأنه أسرع في الـ compile وأسهل في الـ debugging. في Hello World مفيش فرق يتشاف، لكن في الكود الحقيقي الفرق ممكن يبقى أضعاف.

---

## ٧. الـ try: [[int x;]] من غير [[-Wall]] ومعاه

ضفت [[int x;]] جوه main ومستخدمتوش:

~~~bash
gcc unused.c -o u && echo "no warning"
gcc -Wall unused.c -o u
~~~

~~~text الناتج
no warning
unused.c: In function 'main':
unused.c:4:9: warning: unused variable 'x' [-Wunused-variable]
    4 |     int x;
      |         ^
~~~

- من غير [[-Wall]]: ولا كلمة.
- مع [[-Wall]]: warning، والاسم بين [[[ ]]] ([[-Wunused-variable]]) هو الـ flag اللي مشغّل التحذير ده. لو عايز تقفله لوحده: [[-Wno-unused-variable]].
- ده warning مش error، فالملف طلع عادي.

---

## الخلاصة

| الأمر | بيقف بعد | الناتج |
|---|---|---|
| [[gcc -E]] | preprocess | [[.i]]: C فيه محتوى الـ headers |
| [[gcc -S]] | compile | [[.s]]: assembly |
| [[gcc -c]] | assemble | [[.o]]: machine code لسه مش بيشتغل |
| [[gcc x.o -o app]] | link | ملف تنفيذي |

- خطأ فيه [[error: expected ...]] = الكود. خطأ فيه [[undefined reference]] = الـ link.
- وانت بتطوّر: [[-std=c17 -Wall -Wextra -g]]. للتسليم: [[-O2]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيقرا الكلام اللي اليوزر كتبه بعد اسم البرنامج. لو مكتبش حاجة، بيطبع طريقة الاستخدام على مخرج الأخطاء ويرجّع exit code 1 (فشل). ولو كتب، بيسلّم على أول اسم ويقول عدد الـ arguments ويرجّع 0. كله اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra -g main.c -o app]].

---

## ١. الـ headers

~~~c
#include <stdio.h>
#include <stdlib.h>
~~~

- [[stdio.h]]: فيها [[printf]] و [[fprintf]] و [[stderr]].
- [[stdlib.h]] (standard library): فيها حاجات عامة كتير، اللي يهمنا منها هنا [[EXIT_SUCCESS]] (قيمتها 0) و [[EXIT_FAILURE]] (1).

---

## ٢. [[int main(int argc, char *argv[])]]

~~~c
int main(int argc, char *argv[]) {
~~~

المرة دي main بتاخد parameters، ونظام التشغيل هو اللي بيملاهم قبل ما البرنامج يبدأ:

| الحتة | معناها |
|---|---|
| [[int argc]] | argument count: عدد الكلمات، **واسم البرنامج منهم** |
| [[char *argv[]]] | argument vector: array من النصوص |
| [[char]] | حرف |
| [[*]] | pointer (عنوان). [[char *]] = عنوان أول حرف في نص، وده شكل النص في C |
| [[[]]] | array |

فلو كتبت [[./app Sara Ali]]:

~~~text اللي main بتستلمه
argc    = 3
argv[0] = "./app"
argv[1] = "Sara"
argv[2] = "Ali"
argv[3] = NULL
~~~

- الـ index بيبدأ من 0، فأول كلمة كتبتها هي [[argv[1]]].
- [[argv[argc]]] دايمًا [[NULL]] (عنوان فاضي، «مفيش»). جربتها: [[argv[argc] is NULL]].
- الأسامي [[argc]] و [[argv]] عُرف مش إجبار، بس كله بيستخدمها.
- الـ shell هو اللي بيقسّم على المسافات: [[./app "Mona Zaki"]] كلمة واحدة لأنها بين علامتين.

---

## ٣. الشرط: مفيش arguments

~~~c
    if (argc < 2) {
        fprintf(stderr, "usage: %s NAME...\n", argv[0]);
        return 1;
    }
~~~

- [[argc < 2]]: لو العدد 1 يبقى مفيش غير اسم البرنامج.
- [[fprintf]]: f = file. زي printf بس أول argument هو «فين تكتب». [[stderr]] (standard error) مخرج منفصل عن [[stdout]] للأخطاء. الاتنين بيظهروا على الشاشة، لكن الـ redirect بيفصلهم (تحت).
- [[%s]]: مكان نص، و [[argv[0]]] هو اسم البرنامج زي ما اليوزر كتبه، فالرسالة بتطلع صح حتى لو غيّرت اسم الملف.
- [[NAME...]]: العُرف في رسايل الاستخدام إن [[...]] معناها «واحد أو أكتر».
- [[return 1]]: اخرج بفشل. الكود اللي تحت مش هيتنفذ.

~~~bash
./app
echo $?
~~~

~~~text الناتج
usage: ./app NAME...
1
~~~

[[$?]] في bash = الـ exit code بتاع آخر أمر.

---

## ٤. السلام والنجاح

~~~c
    printf("Hello, %s! you passed %d argument(s)\n", argv[1], argc - 1);
    return EXIT_SUCCESS;
~~~

- [[%s]] تاخد [[argv[1]]]، و [[%d]] تاخد [[argc - 1]] (من غير اسم البرنامج).
- [[EXIT_SUCCESS]] هي 0، بس الاسم بيقول المعنى.

~~~bash
./app Sara Ali
echo $?
~~~

~~~text الناتج
Hello, Sara! you passed 2 argument(s)
0
~~~

---

## ٥. الـ exit code بيفيد في إيه؟

السكربتات بتقرّر على أساسه. [[&&]] بتنفّذ اللي بعدها لو اللي قبلها رجّع 0، و [[||]] لو رجّع غير 0:

~~~bash
./app Sara && echo ok
./app || echo failed
~~~

~~~text الناتج
Hello, Sara! you passed 1 argument(s)
ok
usage: ./app NAME...
failed
~~~

وعلى Linux الـ exit code بايت واحد (0 لـ 255): جربت [[return 256 + argc;]] وطلع [[exit=1]]، لأن 257 بيلف لـ 1. فمتعتمدش على أرقام أكبر من 255.

على Windows: في PowerShell بتشوفه بـ [[$LASTEXITCODE]] وفي CMD بـ [[%ERRORLEVEL%]] (من الـ docs، والبرنامج نفسه مش محتاج تغيير).

---

## ٦. الـ try: stdout و stderr

~~~bash
./app > out.txt
wc -c out.txt
~~~

~~~text الناتج
usage: ./app NAME...
0 out.txt
~~~

[[>]] بيحوّل الـ stdout بس للملف. رسالة الاستخدام على stderr، فطلعت على الشاشة، والملف فاضي (٠ byte، و [[wc -c]] بيعدّ الـ bytes). ولو عايز ترمي الأخطاء: [[2>/dev/null]] (الرقم 2 هو stderr).

---

## ٧. الـ solCode: كل الـ arguments

~~~c
    for (int i = 1; i < argc; i++) {
        printf("%d: %s\n", i, argv[i]);
    }
~~~

- [[for]] بيلف من [[i = 1]] (نسيب اسم البرنامج) طول ما [[i < argc]]، و [[i++]] تزوّد 1 كل لفة. الـ loops ليها درس بعد شوية.
- [[i < argc]] مش [[<=]]: آخر index صالح هو [[argc - 1]].

~~~bash
./app Sara Ali "Mona Zaki"
~~~

~~~text الناتج
1: Sara
2: Ali
3: Mona Zaki
~~~

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[argc]] | عدد الكلمات + اسم البرنامج |
| [[argv[0]]] | اسم البرنامج، و [[argv[1]]] أول كلمة |
| [[fprintf(stderr, ...)]] | رسايل الخطأ بعيد عن الناتج |
| [[return 0]] / [[EXIT_SUCCESS]] | نجاح |
| [[return 1]] / [[EXIT_FAILURE]] | فشل |
| [[echo $?]] | آخر exit code في bash |

- اتأكد من [[argc]] قبل ما تقرا [[argv[1]]].
- الـ exit code هو الطريقة الوحيدة اللي سكربت يعرف بيها إنك فشلت.`,
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
    }
  ]
});
