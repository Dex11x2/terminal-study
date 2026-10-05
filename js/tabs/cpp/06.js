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
]);
