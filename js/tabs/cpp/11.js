// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
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
          teach: R`## الأوامر دي بتعمل إيه؟

٤ طرق تمسك بيها أخطاء: build بـ ASan و UBSan، وbuild تاني بـ TSan، و valgrind على build عادي، وأدوات بتقرا الكود من غير تشغيل (clang-tidy و cppcheck). جربناهم كلهم في [[gcc:14]] على برنامج فيه الـ ٣ أخطاء بتوع الـ try، وسطبنا جوه الـ container ([[apt-get install valgrind cppcheck clang-tidy]]): valgrind-3.24.0 و Cppcheck 2.17.1 و clang-tidy من LLVM 19.1.7.

~~~cpp main.cpp
int *make_buffer() {
    int *leak = new int[10];
    leak[0] = 1;
    return leak;
}

int main() {
    int *p = make_buffer();
    std::vector<int> v = {1, 2, 3};
    std::cout << v[v.size()] << '\n';
    int shared = 0;
    std::thread a([&] { for (int i = 0; i < 100000; ++i) ++shared; });
    std::thread b([&] { for (int i = 0; i < 100000; ++i) ++shared; });
    a.join();
    b.join();
    std::cout << p[0] << ' ' << shared << '\n';
}
~~~

الأخطاء: [[new[]]] من غير [[delete[]]] (leak)، و [[v[3]]] في vector فيه 3 (بره الحدود)، و [[++shared]] من threadين (data race).

---

## ١. ASan + UBSan

~~~bash
g++ -std=c++20 -g -O1 -fno-omit-frame-pointer -fsanitize=address,undefined main.cpp -o app_asan
./app_asan
~~~

| الـ flag | ليه |
|---|---|
| [[-g]] | أسامي الملفات وأرقام السطور في التقرير |
| [[-O1]] | البرنامج ميبقاش بطيء أوي، والسطور لسه دقيقة |
| [[-fno-omit-frame-pointer]] | الـ stack trace يبقى كامل |
| [[-fsanitize=address,undefined]] | الاتنين مع بعض |

~~~text الناتج
==301==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50200000001c
READ of size 4 at 0x50200000001c thread T0
    #0 0x4032ba in main /w/x/san/main.cpp:14
0x50200000001c is located 0 bytes after 12-byte region [0x502000000010,0x50200000001c)
allocated by thread T0 here:
    #0 0x78c0e7ec95b8 in operator new(unsigned long)
    #1 0x402fe6 in std::__new_allocator<int>::allocate(...)
SUMMARY: AddressSanitizer: heap-buffer-overflow /w/x/san/main.cpp:14 in main
Shadow bytes around the buggy address:
=>0x502000000000: fa fa 00[04]fa fa ...
~~~

- [[READ of size 4]] في سطر 14: قراية int.
- [[0 bytes after 12-byte region]]: الـ vector 3 × 4 = 12 byte، والقراية بعده على طول.
- الـ shadow bytes: [[00]] = 8 byte سليمة، و [[04]] = 4 سليمة بس، و [[fa]] = منطقة ممنوعة حوالين الحجز. الأقواس [[[04]]] على مكان الغلط.

ASan بيقف عند أول غلط. صلّحنا لـ [[v[v.size() - 1]]] وشغلنا تاني:

~~~text الناتج
==310==ERROR: LeakSanitizer: detected memory leaks
Direct leak of 40 byte(s) in 1 object(s) allocated from:
    #0 0x781ec37a0718 in operator new[](unsigned long)
    #1 0x402cf8 in make_buffer() /tmp/m2.cpp:6
    #2 0x402e40 in main /tmp/m2.cpp:12
SUMMARY: AddressSanitizer: 40 byte(s) leaked in 1 allocation(s).
~~~

40 byte = 10 × 4، واتحجزت في سطر 6. والـ race؟ ASan مش بيدوّر عليه أصلًا.

> بديل أرخص لأخطاء الحدود في الـ STL: [[-D_GLIBCXX_ASSERTIONS]] بيخلي libstdc++ تتشيّك على [[[ ]]]. جربناه على build عادي: [[stl_vector.h:1143: ... Assertion '__n < this->size()' failed.]]

## ٢. TSan

~~~bash
g++ -std=c++20 -g -O1 -fsanitize=thread main.cpp -o app_tsan
./app_tsan
~~~

مبيتجمعش مع ASan، فـ build لوحده. (جوه Docker محتاج [[setarch $(uname -m) -R ./app_tsan]] والـ container بـ [[--security-opt seccomp=unconfined]]، الشرح في درس threads.)

~~~text الناتج
WARNING: ThreadSanitizer: data race (pid=328)
  Read of size 4 at 0x7fffffffe99c by thread T2:
    #0 operator() /w/x/san/main.cpp:17
  Previous write of size 4 at 0x7fffffffe99c by thread T1:
    #0 operator() /w/x/san/main.cpp:16
SUMMARY: ThreadSanitizer: data race /w/x/san/main.cpp:17 in operator()
~~~

thread T2 (سطر 17) قرا shared، و T1 (سطر 16) كتبه من غير قفل. [[operator()]] = جسم الـ lambda.

## ٣. valgrind

~~~bash
g++ -std=c++20 -g -O0 main.cpp -o app_dbg
valgrind --leak-check=full ./app_dbg
~~~

build عادي خالص، و valgrind بيشغّله جوه CPU افتراضي:

~~~text الناتج
==340== Invalid read of size 4
==340==    at 0x401303: main (main.cpp:14)
==340==  Address 0x4df00fc is 0 bytes after a block of size 12 alloc'd
...
1 200000
==340== HEAP SUMMARY:
==340==     in use at exit: 40 bytes in 1 blocks
==340==   total heap usage: 8 allocs, 7 frees, 78,516 bytes allocated
==340== 40 bytes in 1 blocks are definitely lost in loss record 1 of 1
==340==    by 0x401227: make_buffer() (main.cpp:6)
==340== LEAK SUMMARY:
==340==    definitely lost: 40 bytes in 1 blocks
==340== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
~~~

لقى الاتنين في تشغيلة واحدة ومكملش وقف. [[definitely lost]] = مفيش أي pointer باقي للذاكرة دي. والـ race؟ valgrind (أداة memcheck الافتراضية) مش بيدوّر عليه، و [[shared]] طلعت 200000 بالصدفة لأن valgrind بيشغّل thread واحد في المرة.

## ٤. التحليل الساكن

~~~bash
clang-tidy main.cpp -- -std=c++20
~~~

[[--]] معناها «مفيش compile_commands.json، والـ flags أهي».

~~~text الناتج
main.cpp:20:5: warning: Potential leak of memory pointed to by 'p' [clang-analyzer-cplusplus.NewDeleteLeaks]
main.cpp:12:14: note: Calling 'make_buffer'
main.cpp:6:17: note: Memory is allocated
main.cpp:12:14: note: Returned allocated memory
~~~

تتبّع المسار: اتحجزت في سطر 6، ورجعت لـ main، ومحدش حررها.

~~~bash
cppcheck --enable=warning,performance main.cpp
~~~

~~~text الناتج
main.cpp:14:19: error: Out of bounds access in 'v[v.size()]', if 'v' size is 3 and 'v.size()' is 3 [containerOutOfBounds]
main.cpp:14:18: error: Out of bounds access of v, index 'v.size()' is out of bounds. [containerOutOfBoundsIndexExpression]
~~~

cppcheck لقى الحدود بس، وفاته الـ leak لأن الـ pointer بيخرج من الدالة. لما خلينا الحجز محلي في دالة ([[int *leak = new int[10];]] من غير return) لقاه: [[error: Memory leak: leak [memleak]]]. ولا أداة ساكنة منهم لقت الـ race.

---

## الخلاصة

| الأداة | بتمسك | التكلفة |
|---|---|---|
| ASan ([[-fsanitize=address]]) | حدود، use after free، double free، leaks | حوالي الضعف، build جديد |
| UBSan ([[-fsanitize=undefined]]) | overflow، قسمة على صفر، shifts | قليلة، مع ASan |
| TSan ([[-fsanitize=thread]]) | data races | بطيء، build لوحده |
| valgrind | ذاكرة و leaks من غير build جديد | بطيء جدًا، Linux |
| clang-tidy و cppcheck | من غير تشغيل | كل أداة بتلاقي حاجات مختلفة |

- مفيش أداة واحدة بتمسك كله: ASan+UBSan في الـ tests، و TSan للكود اللي فيه threads.`,
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
          teach: R`## الملف ده بيعمل إيه؟

ملف tests بـ GoogleTest فيه ٣ tests لدالتين [[clamp]] و [[add]]. كل test بينادي الدالة بقيمة معروفة ويتأكد من الناتج. عملنا المشروع كامل في [[gcc:14]] (سطبنا [[cmake]] جوه الـ container، و GoogleTest v1.15.2 نزل لوحده بـ FetchContent):

~~~text الفولدر
mathlib/CMakeLists.txt      (الـ solCode)
mathlib/math_utils.h
mathlib/math_utils.cpp
mathlib/math_tests.cpp      (المثال)
~~~

و [[math_utils.cpp]] نفس دوال درس make:

~~~cpp
int add(int a, int b) { return a + b; }
int clamp(int x, int lo, int hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}
~~~

---

## ١. ملف الـ tests

~~~cpp
#include <gtest/gtest.h>
#include "math_utils.h"
~~~

[[gtest/gtest.h]]: GoogleTest. و [["math_utils.h"]]: الدوال اللي هنختبرها.

~~~cpp
TEST(Clamp, KeepsValueInRange) {
    EXPECT_EQ(clamp(5, 0, 10), 5);
}
~~~

- [[TEST(Suite, Name)]]: macro بيعمل test. [[Clamp]] اسم المجموعة، و [[KeepsValueInRange]] اسم الـ test (جملة بتقول بيختبر إيه). الاتنين من غير مسافات.
- [[EXPECT_EQ(actual, expected)]]: لازم يتساووا. لو لأ، بيسجّل فشل ويكمّل الـ test.
- مفيش [[main]]: [[GTest::gtest_main]] بيجيبها.

~~~cpp
TEST(Clamp, CutsAtEdges) {
    EXPECT_EQ(clamp(-3, 0, 10), 0);
    EXPECT_EQ(clamp(42, 0, 10), 10);
}

TEST(Add, HandlesNegatives) {
    EXPECT_EQ(add(-2, -3), -5);
}
~~~

test فيه أكتر من EXPECT: الحدين. وsuite تانية لـ add.

---

## ٢. الـ solCode: [[CMakeLists.txt]]

~~~cmake
add_library(math_utils math_utils.cpp)
target_include_directories(math_utils PUBLIC .)
~~~

الكود في library، عشان البرنامج والـ tests يستخدموه. [[.]] = الفولدر الحالي فيه الـ header.

~~~cmake
include(FetchContent)
FetchContent_Declare(googletest
  URL https://github.com/google/googletest/archive/refs/tags/v1.15.2.tar.gz)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)
~~~

- [[include(FetchContent)]]: حمّل الـ module ده من CMake.
- [[FetchContent_Declare]]: اسم + منين تنزل (أرشيف إصدار ثابت، عشان الـ build ميتغيرش لوحده).
- [[gtest_force_shared_crt]]: لـ MSVC على ويندوز بس (يستخدم نفس الـ runtime بتاع مشروعك)، ومالوش أثر على Linux.
- [[FetchContent_MakeAvailable]]: نزّل وضيفه للمشروع. targets زي [[GTest::gtest_main]] بقت موجودة.

~~~cmake
enable_testing()
add_executable(math_tests math_tests.cpp)
target_link_libraries(math_tests PRIVATE math_utils GTest::gtest_main)
include(GoogleTest)
gtest_discover_tests(math_tests)
~~~

- [[enable_testing()]]: شغّل CTest.
- [[gtest_discover_tests]]: بعد الـ build بيسأل البرنامج «فيك tests إيه؟» ويسجّل كل واحد عند CTest لوحده.

---

## ٣. التشغيل

~~~bash
cmake -S . -B build
cmake --build build -j8
ctest --test-dir build --output-on-failure
~~~

[[-j8]]: 8 ملفات في نفس الوقت (GoogleTest نفسه بيتبني أول مرة). و [[--test-dir build]]: الـ tests فين. و [[--output-on-failure]]: اطبع ناتج الـ test اللي فشل بس.

~~~text الناتج
Test project /p/build
    Start 1: Clamp.KeepsValueInRange
1/3 Test #1: Clamp.KeepsValueInRange ..........   Passed    0.01 sec
    Start 2: Clamp.CutsAtEdges
2/3 Test #2: Clamp.CutsAtEdges ................   Passed    0.00 sec
    Start 3: Add.HandlesNegatives
3/3 Test #3: Add.HandlesNegatives .............   Passed    0.00 sec

100% tests passed, 0 tests failed out of 3
~~~

وتقدر تشغّل البرنامج نفسه: [[./build/math_tests]] بيطبع [[[  PASSED  ] 3 tests.]].

## ٤. الـ try: بوّظنا clamp

غيّرنا [[if (x < lo) return lo;]] لـ [[return hi;]]، و build، و ctest:

~~~text الناتج
2/3 Test #2: Clamp.CutsAtEdges ................***Failed    0.00 sec
[ RUN      ] Clamp.CutsAtEdges
/p/math_tests.cpp:9: Failure
Expected equality of these values:
  clamp(-3, 0, 10)
    Which is: 10
  0
[  FAILED  ] Clamp.CutsAtEdges (0 ms)
...
67% tests passed, 1 tests failed out of 3
The following tests FAILED:
	  2 - Clamp.CutsAtEdges (Failed)
Errors while running CTest
~~~

نقرا الفشل: السطر 9، الطرف الأول [[clamp(-3, 0, 10)]] طلع **10**، والمتوقع **0**. والـ exit code بتاع ctest بقى **8** (مش صفر)، وده اللي بيخلي CI (زي GitHub Actions) يعلّم الـ build إنه فشل.

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[TEST(Suite, Name) { }]] | test |
| [[EXPECT_EQ(a, b)]] | لازم يتساووا، وكمّل لو فشل |
| [[ASSERT_EQ(a, b)]] | نفس الحاجة بس وقّف الـ test |
| [[FetchContent_*]] | نزّل GoogleTest مع الـ configure |
| [[gtest_discover_tests]] | سجّل الـ tests عند CTest |
| [[ctest --test-dir build --output-on-failure]] | شغّلهم كلهم |`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

بتنزّل vcpkg، وتقوله «المشروع ده محتاج مكتبة fmt»، وبعدين CMake وهو بيعمل configure بيخلي vcpkg ينزّل fmt ويعملها build ويوصّلها بمشروعك. جربنا الخطوات كلها في [[gcc:14]] (سطبنا جوه الـ container اللي vcpkg محتاجه: [[cmake git curl zip unzip tar pkg-config ninja-build]]) على مشروع صغير:

~~~cmake CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(app LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
find_package(fmt CONFIG REQUIRED)
add_executable(app main.cpp)
target_link_libraries(app PRIVATE fmt::fmt)
~~~

~~~cpp main.cpp
#include <fmt/core.h>
int main() { fmt::print("{} + {} = {}\n", 2, 3, 5); }
~~~

---

## ١. نزّل vcpkg وجهّزه (مرة واحدة)

~~~bash
git clone https://github.com/microsoft/vcpkg.git
./vcpkg/bootstrap-vcpkg.sh
~~~

- الـ clone بيجيب «الكتالوج»: وصفة لكل مكتبة (port). إحنا عملنا [[--depth 1]] (آخر نسخة بس من غير التاريخ) عشان أصغر، والأمر الكامل اللي في المثال هو المعتاد.
- [[bootstrap-vcpkg.sh]]: بينزّل البرنامج [[vcpkg]] نفسه جوه الفولدر. على ويندوز [[bootstrap-vcpkg.bat]] (من الـ docs).

## ٢. وصّف الـ dependencies

~~~bash
./vcpkg/vcpkg new --application
./vcpkg/vcpkg add port fmt
~~~

- [[new --application]]: بيعمل ملفين في مشروعك. و [[--application]] = ده برنامج مش مكتبة هتتنشر.
- [[add port fmt]]: بيضيف fmt:

~~~text vcpkg.json
{
  "dependencies": [
    "fmt"
  ]
}
~~~

~~~text vcpkg-configuration.json
{
  "default-registry": {
    "kind": "git",
    "baseline": "2750401336fb7c95f6619657a46a7e798661341c",
    "repository": "https://github.com/microsoft/vcpkg"
  }
}
~~~

[[baseline]]: commit معيّن من الكتالوج. كل مكتبة بتتثبّت على الإصدار اللي كان في الـ commit ده، فأي حد يعمل build لمشروعك ياخد نفس الإصدارات. ده «manifest mode»: الملفين بيتعملهم commit مع الكود، زي [[package.json]] في npm.

## ٣. configure بالـ toolchain

~~~bash
cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE=vcpkg/scripts/buildsystems/vcpkg.cmake
~~~

[[-D]] بيدّي قيمة لمتغير CMake. و [[CMAKE_TOOLCHAIN_FILE]] ملف بيتقري قبل أي حاجة، و vcpkg بيستغله: يقرا [[vcpkg.json]]، وينزّل ويبني كل dependency، ويقول لـ [[find_package]] تدوّر فين.

~~~text الناتج (آخره)
Packages installed in this vcpkg installation declare the following licenses:
MIT
The package fmt provides CMake targets:

    find_package(fmt CONFIG REQUIRED)
    target_link_libraries(main PRIVATE fmt::fmt)
...
Completed submission of fmt:x64-linux@12.2.0#1 to 1 binary cache(s) in 105 ms (1/1)
All requested installations completed successfully in: 13 s
-- Running vcpkg install - done
-- The CXX compiler identification is GNU 14.4.0
-- Configuring done (222.1s)
-- Build files have been written to: /p/build
~~~

- [[fmt:x64-linux@12.2.0#1]]: المكتبة، والـ triplet ([[x64-linux]] = المعالج والنظام)، والإصدار من الـ baseline.
- vcpkg بنفسه بيقولك سطرين CMake تستخدمهم، وهما اللي في [[CMakeLists.txt]] بتاعنا.
- [[binary cache]]: نسخة مبنية اتحفظت (في [[~/.cache/vcpkg]] على Linux)، فالمرة الجاية في أي مشروع مش هيبنيها تاني.
- الـ 222 ثانية أغلبها أول مرة: تنزيل الأدوات اللي vcpkg بيستخدمها والكتالوج. الـ build نفسه لـ fmt خد 13 ثانية.

## ٤. build وتشغيل

~~~bash
cmake --build build
./build/app
~~~

~~~text الناتج
[ 50%] Building CXX object CMakeFiles/app.dir/main.cpp.o
[100%] Linking CXX executable app
[100%] Built target app
2 + 3 = 5
~~~

[[fmt::print]]: [[{}]] مكان كل قيمة بالترتيب، والنوع بيتعرف لوحده.

---

## ٥. الـ try: FetchContent الأسهل

~~~cmake
include(FetchContent)
FetchContent_Declare(fmt GIT_REPOSITORY https://github.com/fmtlib/fmt GIT_TAG 11.0.2)
FetchContent_MakeAvailable(fmt)
add_executable(app main.cpp)
target_link_libraries(app PRIVATE fmt::fmt)
~~~

من غير vcpkg خالص، بينزّل fmt من Git (الـ tag [[11.0.2]]) ويبنيها كأنها جزء من مشروعك. اتشغّل وطبع [[2 + 3 = 5]]. وفي نفس البرنامج جربنا [[std::format]] من [[<format>]] (C++20) مع gcc 14: [[std::cout << std::format("{} + {} = {}\n", 2, 3, 5);]] طبع نفس السطر من غير أي مكتبة.

## ٦. Conan (من الـ docs، متجربش هنا)

نفس الفكرة بأداة Python: [[conanfile.txt]] فيه [[[requires]]] و [[fmt/11.0.2]]، وبعدين [[conan install . --build=missing]]، وبيطلّع toolchain file تديه لـ CMake.

---

## الخلاصة

| الطريقة | الـ dependencies في | مناسبة لـ |
|---|---|---|
| vcpkg (manifest) | [[vcpkg.json]] + baseline | مشاريع فيها مكتبات كتير، و ويندوز |
| Conan | [[conanfile.txt]] | شركات، binaries جاهزة |
| FetchContent | [[CMakeLists.txt]] | مكتبة أو اتنين صغيرين |
| [[apt install]] | النظام | تجربة سريعة على Linux |

- في كل الحالات: [[find_package(x CONFIG REQUIRED)]] و [[target_link_libraries(app PRIVATE x::x)]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

القالب بتاع المسابقات: بيقرا n وبعدين n رقم، ويرتّبهم، ويطبع الأصغر والأكبر والمجموع. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -O2 -Wall -Wextra]]:

~~~bash
printf "5\n3 1 4 1 5\n" | ./app
~~~

~~~text الناتج
1 5 14
~~~

[[printf]] هنا أمر الـ shell: بيطبع النص (و [[\n]] سطر جديد)، و [[|]] بتبعته كـ input للبرنامج، كأنك كتبته بإيدك.

---

## ١. أول سطرين

~~~cpp
#include <bits/stdc++.h>
using namespace std;
~~~

- [[bits/stdc++.h]]: ملف جوه libstdc++ (مكتبة gcc) بيعمل include لكل حاجة. مش موجود في MSVC ولا في clang على الماك، وبيبطّأ الـ compile. للمسابقة بس.
- [[using namespace std;]]: تكتب [[vector]] بدل [[std::vector]].

## ٢. الـ fast IO

~~~cpp
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
~~~

| السطر | بيعمل |
|---|---|
| [[ios::sync_with_stdio(false)]] | cin و cout ميتزامنوش مع scanf و printf، فيستخدموا buffer بتاعهم. بعدها متخلطش الاتنين |
| [[cin.tie(nullptr)]] | cin مبقاش «مربوط» بـ cout، فمش بيعمل flush لـ cout قبل كل قراية |

### الـ try: قسنا الفرق

~~~bash
seq 1000000 | sed '1i 1000000' > big.txt
time ./app < big.txt
~~~

[[seq 1000000]] بيطبع الأرقام من 1 لمليون، و [[sed '1i 1000000']] بيحط سطر «1000000» (الـ n) في الأول. و [[<]] الملف هو الـ input. و [[time]] بيقيس:

| النسخة | [[real]] (مرتين) |
|---|---|
| بالسطرين | [[0.055s]] و [[0.055s]] |
| من غيرهم | [[0.228s]] و [[0.208s]] |

حوالي ٤ مرات أبطأ لمجرد القراية. والناتج نفسه في الحالتين: [[1 1000000 500000500000]].

## ٣. القراية

~~~cpp
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
~~~

- [[vector<long long> a(n)]]: n خانة.
- [[auto &x]]: الـ [[&]] لازمة عشان [[cin >> x]] تكتب في العنصر نفسه مش نسخة.
- [[long long]]: المجموع هنا 500000500000، أكبر من int (حوالي 2.1 مليار) بـ 230 مرة. بـ int كان هيطلع رقم غلط (overflow).

## ٤. الحساب

~~~cpp
    sort(a.begin(), a.end());
    long long sum = accumulate(a.begin(), a.end(), 0LL);
    cout << a.front() << ' ' << a.back() << ' ' << sum << '\n';
~~~

- بعد [[sort]]: [[front()]] الأصغر و [[back()]] الأكبر.
- [[0LL]]: بداية long long. لو [[0]] الجمع هيبقى int ويعمل overflow حتى لو العناصر long long.
- [['\n']] مش [[endl]]: endl بتعمل flush كل سطر.

---

## ٥. الـ solCode: Two Sum

~~~cpp
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
~~~

- [[seen]]: كل رقم شفناه → مكانه.
- لكل x: هل شفنا قبل كده [[target - x]]؟ لو آه، الاتنين مجموعهم target، اطبع المكانين.
- لو لأ: خزّن x. ولو خلصنا من غير ما نلاقي: [[-1]].
- [[O(n)]]: لفة واحدة، وكل [[find]] [[O(1)]] في المتوسط. الحل التاني (كل زوجين) [[O(n²)]].

~~~text الناتج
$ printf "4 9\n2 7 11 15\n" | ./ts
0 1
$ printf "3 100\n1 2 3\n" | ./ts
-1
~~~

2 + 7 = 9، في المكان 0 و 1.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[bits/stdc++.h]] و [[using namespace std;]] | سرعة كتابة، للمسابقات بس |
| [[sync_with_stdio(false)]] و [[cin.tie(nullptr)]] | قراية أسرع حوالي ٤ مرات هنا |
| [[long long]] و [[0LL]] | الأرقام بتعدّي int |
| [['\n']] | من غير flush كل سطر |

- حوالي 10^8 عملية في الثانية: n = 10^5 محتاج [[O(n log n)]] أو أحسن.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيقلّد register في microcontroller: متغير 8 bits، كل bit فيه بيتحكم في حاجة (bit 3 لمبة، bit 5 موتور). بيشغّل الاتنين، ويطفي الموتور، ويقرا حالتهم. ده شكل كود الـ embedded اليومي. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
reg=0x08 led=1 motor=0
~~~

---

## ١. الـ register

~~~cpp
    std::uint8_t reg = 0b0000'0000;
~~~

- [[std::uint8_t]] (من [[<cstdint>]]): unsigned int حجمه 8 bits بالظبط (0 لـ 255). في الـ embedded الحجم لازم يبقى معروف بالظبط، فبنستخدم الأنواع دي مش [[int]].
- [[0b]]: رقم مكتوب binary. و [[']] فاصل للقراية بس.

## ٢. الـ masks

~~~cpp
    constexpr std::uint8_t LED = 1u << 3;
    constexpr std::uint8_t MOTOR = 1u << 5;
~~~

- [[1u]]: الرقم 1 unsigned.
- [[<< 3]]: زق الـ 1 تلات خانات شمال:

| الاسم | الحساب | binary | hex |
|---|---|---|---|
| [[LED]] | [[1u << 3]] = 8 | [[0000'1000]] | [[0x08]] |
| [[MOTOR]] | [[1u << 5]] = 32 | [[0010'0000]] | [[0x20]] |

- [[constexpr]]: ثوابت وقت الـ compile.

## ٣. التشغيل والإطفاء

~~~cpp
    reg |= LED;
    reg |= MOTOR;
    reg &= static_cast<std::uint8_t>(~MOTOR);
~~~

| السطر | العملية | reg بعدها |
|---|---|---|
| [[reg |= LED]] | OR: شغّل bit 3، والباقي زي ما هو | [[0000'1000]] |
| [[reg |= MOTOR]] | شغّل bit 5 | [[0010'1000]] |
| [[reg &= ~MOTOR]] | [[~MOTOR]] = [[1101'1111]]، و AND بيطفي bit 5 بس | [[0000'1000]] |

- [[~]]: اقلب كل الـ bits. وعلى uint8_t النتيجة بتتحول لـ int الأول (32 bit: [[0xFFFFFFDF]])، فالـ [[static_cast<std::uint8_t>]] بترجّعها 8 bits وتوضّح إنك قاصد.

## ٤. القراية والطباعة

~~~cpp
    bool led_on = reg & LED;
    std::printf("reg=0x%02X led=%d motor=%d\n", reg, led_on, (reg & MOTOR) != 0);
~~~

- [[reg & LED]]: AND مع الـ mask = 8 لو الـ bit شغال و 0 لو لأ. والتحويل لـ bool = true.
- [[%02X]]: hex بحروف كبيرة، رقمين، وصفر في الأول لو محتاج: [[08]].
- [[(reg & MOTOR) != 0]]: الأقواس لازمة لأن [[!=]] أولويتها أعلى من [[&]].

النتيجة [[reg=0x08 led=1 motor=0]].

---

## ٥. الـ solCode: [[toggle]]

~~~cpp
void toggle(std::uint8_t &reg, std::uint8_t mask) { reg ^= mask; }
~~~

- [[^]] (XOR): الـ bit بيتقلب لو الـ mask فيه 1: 0 يبقى 1، و 1 يبقى 0.
- [[std::uint8_t &reg]]: reference عشان نغيّر الأصل.

~~~text الناتج
0x08
0x00
~~~

أول مرة شغّل bit 3، وتاني مرة طفاه.

---

## الخلاصة

| العملية | الكود |
|---|---|
| mask للـ bit رقم n | [[1u << n]] |
| شغّل | [[reg |= mask]] |
| اطفي | [[reg &= ~mask]] |
| اقلب | [[reg ^= mask]] |
| شغال؟ | [[(reg & mask) != 0]] |

- في الـ register الحقيقي بيبقى [[volatile]] على عنوان ثابت، عشان الـ compiler ميشيلش القراية والكتابة (من الـ docs، ده محتاج هاردوير).`,
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
          teach: R`## البرنامج بيعمل إيه؟

٣ أسئلة إنترفيو في كود واحد: slicing (نفس الـ object بيتنادى بالقيمة ومرة بالـ reference)، و [[sizeof]] على array وعلى pointer، و reference بيغيّر المتغير الأصلي. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
Base
Derived
20 8
7
~~~

---

## ١. slicing

~~~cpp
struct Base {
    virtual ~Base() = default;
    virtual void hi() const { std::cout << "Base\n"; }
};

struct Derived : Base {
    void hi() const override { std::cout << "Derived\n"; }
};

void by_value(Base b) { b.hi(); }
void by_ref(const Base &b) { b.hi(); }
~~~

- [[struct Derived : Base]]: في struct الوراثة public افتراضيًا.
- [[by_value(d)]]: الـ parameter نوعه [[Base]] بالقيمة، فبيتعمل Base **جديد** نسخة من جزء الأب بس في d. الجزء بتاع Derived اتقص (sliced)، و b بقى Base حقيقي، فـ [[hi()]] = **Base**.
- [[by_ref(d)]]: reference لنفس d، والنداء virtual بيشوف النوع الحقيقي = **Derived**.

## ٢. [[sizeof]]

~~~cpp
    int arr[5] = {};
    int *p = arr;
    std::cout << sizeof(arr) << ' ' << sizeof(p) << '\n';
~~~

- [[int arr[5] = {}]]: 5 أصفار.
- [[sizeof(arr)]] = 5 × 4 = **20**: الـ array كلها.
- [[sizeof(p)]] = **8**: حجم عنوان على 64-bit، أيًا كان بيشاور على إيه.
- [[int *p = arr;]]: الـ array بتتحول لـ pointer لأول عنصر (decay). وده نفس اللي بيحصل لما تبعتها لدالة، فـ [[sizeof]] جوه الدالة بيبقى 8.

## ٣. reference

~~~cpp
    int i = 5;
    int &r = i;
    r = 7;
~~~

r اسم تاني لـ i، فـ i بقت **7**.

---

## ٤. الـ try: جربنا الإجابات

### [[delete]] على حاجة اتعملت بـ [[new[]]]

~~~cpp
int main() { int *p = new int[4]; delete p; }
~~~

~~~text g++ -Wall
warning: 'void operator delete(void*, long unsigned int)' called on pointer returned from a mismatched allocation function [-Wmismatched-new-delete]
~~~

~~~text ASan
ERROR: AddressSanitizer: alloc-dealloc-mismatch (operator new [] vs operator delete) on 0x502000000010
~~~

undefined behavior: لازم [[delete[]]] مع [[new[]]].

### [[i++ + ++i]]

~~~text الناتج
b.cpp:2:34: warning: operation on 'i' may be undefined [-Wsequence-point]
4
~~~

طبع 4 مع gcc، بس i اتعدّلت مرتين في نفس الـ expression من غير ترتيب محدد = UB، و compiler تاني ممكن يطلّع رقم تاني.

### السؤال ٣: الـ destructor مش virtual

جربنا [[Base]] فيه دالة virtual و destructor عادي، و [[Base *p = new Derived; delete p;]]:

~~~text الناتج
c.cpp:4:37: warning: deleting object of polymorphic class type 'Base' which has non-virtual destructor might cause undefined behavior [-Wdelete-non-virtual-dtor]
~Base
~~~

[[~Derived]] متناداش خالص. لو Derived كان ماسك ذاكرة أو ملف، كان ضاع.

### باقي الإجابات

| السؤال | الإجابة |
|---|---|
| new/delete مقابل malloc/free | new بتنادي الـ constructor وبترمي [[std::bad_alloc]]، و malloc بتحجز bytes وترجّع NULL. متخلطش |
| الـ destructor للعناصر في vector | بيتنادى لكل عنصر عند [[erase]] و [[pop_back]] و [[clear]] ولما الـ vector نفسه يموت |

---

## الخلاصة

| السؤال | جملة واحدة |
|---|---|
| slicing | نسخ ابن في متغير نوعه الأب بالقيمة بيقص الابن |
| [[sizeof]] array مقابل pointer | الـ array كلها مقابل 8 |
| reference | اسم تاني، مش null، مبيتغيرش |
| virtual destructor | من غيره [[delete basePtr]] مش بينادي destructor الابن |
| [[delete]] مع [[new[]]] | UB، استخدم [[delete[]]] (أو vector) |
| [[i++ + ++i]] | UB، و [[-Wall]] بيقولك |`,
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
          teach: R`## البرنامج بيعمل إيه؟

أداة سطر أوامر: [[wordfreq FILE [TOP]]] بتقرا ملف، وتعد كل كلمة بعد ما تصغّر حروفها وتشيل علامات الترقيم، وتطبع أكتر TOP كلمة. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra -O2 main.cpp -o wordfreq]]:

~~~bash
echo "The cat and the dog. The END, the end!" > text.txt
./wordfreq text.txt 3
~~~

~~~text الناتج
4 the
2 end
1 and
~~~

---

## ١. [[normalize]]

~~~cpp
std::string normalize(const std::string &word) {
    std::string out;
    for (unsigned char c : word)
        if (std::isalpha(c)) out += static_cast<char>(std::tolower(c));
    return out;
}
~~~

- [[unsigned char c]]: [[isalpha]] و [[tolower]] (من [[<cctype>]]) لازم ياخدوا قيمة موجبة. لو char سالب (حروف بره ASCII زي العربي في UTF-8) = undefined behavior، فبنلف بـ unsigned char.
- [[std::isalpha(c)]]: حرف إنجليزي؟ العلامات زي [[.]] و [[,]] و [[!]] بتتشال.
- [[std::tolower(c)]] بترجّع int، فـ [[static_cast<char>]] قبل ما نلزقه.
- [["END,"]] بتبقى [["end"]].

## ٢. [[main]] و الـ arguments

~~~cpp
int main(int argc, char *argv[]) {
    if (argc < 2) {
        std::cerr << "usage: " << argv[0] << " FILE [TOP]\n";
        return 1;
    }
~~~

- [[argc]]: عدد الكلمات في الأمر بما فيهم اسم البرنامج. و [[argv[0]]] اسم البرنامج، و [[argv[1]]] الملف.
- [[std::cerr]]: stderr، للأخطاء (مبيروحش لو عملت [[>]] للناتج).
- [[return 1]]: exit code غير صفر = فشل.

~~~text ./wordfreq لوحده
usage: ./wordfreq FILE [TOP]
[exit 1]
~~~

~~~cpp
    std::ifstream in(argv[1]);
    if (!in) {
        std::cerr << "cannot open " << argv[1] << '\n';
        return 1;
    }
~~~

[[std::ifstream]] (من [[<fstream>]]): بيفتح الملف للقراية، وبيقفله لوحده (RAII). و [[!in]] = الفتح فشل:

~~~text ./wordfreq missing.txt
cannot open missing.txt
[exit 1]
~~~

~~~cpp
    std::size_t top = argc > 2 ? std::stoul(argv[2]) : 5;
~~~

لو فيه argument تالت حوّله لرقم بـ [[std::stoul]] (string to unsigned long)، وإلا 5. و stoul بترمي لو مش رقم، ومحدش ماسكها:

~~~text ./wordfreq text.txt abc
terminate called after throwing an instance of 'std::invalid_argument'
  what():  stoul
[exit 134]
~~~

ده الـ bug اللي المفروض تصلحه في خطوة التقسيم (try و catch، أو [[std::from_chars]]).

## ٣. العدّ

~~~cpp
    std::unordered_map<std::string, int> freq;
    std::string word;
    while (in >> word) {
        std::string w = normalize(word);
        if (!w.empty()) ++freq[w];
    }
~~~

- [[in >> word]]: كلمة كلمة لحد آخر الملف (بيقف عند المسافات والسطور).
- [[if (!w.empty())]]: كلمة كانت علامات بس (زي [["--"]]) بقت فاضية، فمتتعدّش.
- [[++freq[w]]]: لو جديدة بتبدأ من 0.

## ٤. الترتيب

~~~cpp
    std::vector<std::pair<std::string, int>> rows(freq.begin(), freq.end());
    std::sort(rows.begin(), rows.end(), [](const auto &a, const auto &b) {
        return a.second != b.second ? a.second > b.second : a.first < b.first;
    });
~~~

- الـ unordered_map ميترتبش، فبننسخ أزواجه في vector.
- الـ lambda: لو العدد مختلف، الأكبر الأول. لو متساوي، الأبجدي الأول. من غير الشرط التاني الكلمات اللي ليها نفس العدد هتطلع بترتيب الـ hash، ويتغير من مكتبة لمكتبة.
- [[const auto &]] في lambda: generic lambda، النوع [[std::pair<std::string, int>]].

## ٥. الطباعة

~~~cpp
    for (std::size_t i = 0; i < rows.size() && i < top; ++i)
        std::cout << rows[i].second << ' ' << rows[i].first << '\n';
~~~

[[i < rows.size()]] عشان لو TOP أكبر من عدد الكلمات. ومن غير TOP (يعني 5):

~~~text ./wordfreq text.txt
4 the
2 end
1 and
1 cat
1 dog
~~~

the ٤ مرات (The و the و The و the)، و end مرتين (END, و end!)، وبعدين الـ ٣ اللي مرة واحدة أبجديًا.

---

## ٦. الـ solCode: الـ header بعد التقسيم

~~~cpp
std::string normalize(const std::string &word);
std::unordered_map<std::string, int> count_words(std::istream &in);
std::vector<std::pair<std::string, int>> top_n(const std::unordered_map<std::string, int> &freq,
                                               std::size_t n);
~~~

- [[count_words(std::istream &in)]]: بتاخد أي stream مش ملف بس. في الـ tests تبعتلها [[std::istringstream]] فيه نص، من غير ملفات.
- [[top_n]]: الترتيب والقص، وبترجّع النتيجة بدل ما تطبعها، فتقدر تختبرها بـ [[EXPECT_EQ]].
- اتعمله [[-fsyntax-only]] (فحص من غير build) واتقبل.

---

## الخلاصة

| الحتة | اللي اتعلمته فيها |
|---|---|
| [[argc]] و [[argv]] و [[std::cerr]] و [[return 1]] | أداة سطر أوامر محترمة |
| [[std::ifstream]] و [[if (!in)]] | ملف بـ RAII |
| [[unsigned char]] مع [[<cctype>]] | تجنب UB |
| [[unordered_map]] ثم [[vector]] و [[sort]] | عدّ وبعدين ترتيب ثابت |
| [[std::stoul]] من غير catch | crash، صلّحه |`,
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
]);
