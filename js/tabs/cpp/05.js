// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
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
          teach: R`## البرنامج بيعمل إيه؟

بيسألك عن اسم وكمية، ويرحّب بيك ويطبع طول رسالة الترحيب، وبعدين يحسب سعر ١٠٠ جنيه بالضريبة (١٤٪) مضروب في الكمية. اتشغّل في [[docker run --rm gcc:14]] (g++ 14.4.0) بـ [[g++ -std=c++20 -Wall -Wextra]]، وكتبنا [[Sara 2]]:

~~~text الناتج
name and quantity: Hi Sara! length=8
total: 228
~~~

---

## ١. السطور اللي فوق: [[#include]]

~~~cpp
#include <iostream>
#include <string>
~~~

- [[#include]]: «حط محتوى الملف ده هنا قبل الـ compile» (زي C بالظبط).
- [[<iostream>]]: i = input و o = output و stream = «مجرى» بيانات. فيها [[std::cout]] (الشاشة) و [[std::cin]] (الكيبورد).
- [[<string>]]: فيها النوع [[std::string]].
- الـ headers القياسية في C++ من غير [[.h]]. ولو نسيت الـ include، g++ بيقولك تحطه فين:

~~~text g++ لما شلنا #include <iostream>
n.cpp:1:18: error: 'cout' is not a member of 'std'
n.cpp:1:1: note: 'std::cout' is defined in header '<iostream>'; this is probably fixable by adding '#include <iostream>'
~~~

---

## ٢. [[namespace shop { ... }]]

~~~cpp
namespace shop {
double with_tax(double price) { return price * 1.14; }
}
~~~

- [[namespace]]: «صندوق أسماء». الدالة اسمها الكامل بقى [[shop::with_tax]]، فلو مكتبة تانية فيها [[with_tax]] الاسمين ميتخبطوش.
- [[double]]: رقم بكسور. [[price * 1.14]] = السعر + ١٤٪.
- القفلة [[}]] من غير [[;]] (عكس الـ struct).

---

## ٣. جوه [[main]]

~~~cpp
int main() {
    std::string name;
    int qty = 0;
~~~

- [[int main()]]: في C++ الأقواس الفاضية معناها «مفيش parameters» (في C كنا بنكتب [[void]]).
- [[std::string name;]]: نص فاضي. [[std]] هو الـ namespace بتاع المكتبة القياسية كلها، و [[::]] (اسمها scope resolution) معناها «اللي جوه». يعني string اللي جوه std.
- [[int qty = 0;]]: قيمة أولية، عشان لو القراية فشلت نعرف القيمة.

### الطباعة: [[<<]]

~~~cpp
    std::cout << "name and quantity: ";
~~~

[[std::cout]] (c = character و out = خارج) هو الشاشة. و [[<<]] معناها «ابعت لـ»، والسهم بيشاور ناحية الـ cout: النص رايح للشاشة. مفيش [[%d]] ولا [[%s]] زي printf: النوع بيتعرف لوحده.

### القراية: [[>>]]

~~~cpp
    std::cin >> name >> qty;
~~~

السهم عكس: البيانات طالعة من [[std::cin]] (الكيبورد) رايحة لـ name وبعدين لـ qty. ومن غير [[&]] زي scanf. و [[>>]] بتقرا كلمة واحدة، بتقف عند أول مسافة. جرّبنا [[Sara Ahmed 2]]:

~~~text الناتج
name and quantity: Hi Sara! length=8
total: 0
~~~

name أخدت Sara بس، وبعدين qty حاولت تقرا [[Ahmed]] كرقم ففشلت، والـ stream بيحط 0 في المتغير لما القراية تفشل (من C++11)، فالـ total بقى 0.

### [[std::string]] والـ [[+]]

~~~cpp
    std::string msg = "Hi " + name + "!";
    std::cout << msg << " length=" << msg.size() << '\n';
~~~

- [[+]] بين string ونص بتلزقهم وتعمل string جديد: [["Hi Sara!"]].
- [[msg.size()]]: الطول = 8 حروف (H و i ومسافة و Sara و !). النقطة [[.]] معناها «دالة جوه الـ object ده».
- سلسلة [[<<]] شغالة لأن كل [[<<]] بترجّع [[std::cout]] نفسه، فاللي بعدها بيكمّل عليه.
- [['\n']]: حرف سطر جديد. أسرع من [[std::endl]] اللي بتنزل سطر وتعمل flush كمان.

### النداء من جوه namespace

~~~cpp
    std::cout << "total: " << shop::with_tax(100.0) * qty << '\n';
    return 0;
}
~~~

[[shop::with_tax(100.0)]] = 114، مضروب في 2 = 228. والـ cout بيطبع 228 من غير [[.000000]] لأنه افتراضيًا بيطبع لحد ٦ أرقام مهمة ويشيل الأصفار اللي في الآخر.

---

## ٤. الـ try

~~~cpp
std::string a = "10";
std::cout << a + a << '\n' << std::stoi(a) + std::stoi(a) << '\n';
std::string name;
std::getline(std::cin, name);
~~~

~~~text الناتج (مع إدخال Sara Ahmed)
1010
20
[Sara Ahmed]
~~~

- [[a + a]] لزق نصوص = [[1010]]. [[std::stoi]] (string to int) بتحوّل النص لرقم، فالجمع بقى [[20]].
- [[std::getline(std::cin, name)]]: بتقرا السطر كله لحد الـ Enter، بالمسافات.

---

## ٥. [[g++]] مش [[gcc]]

لو عملت compile لنفس الملف بـ [[gcc]]:

~~~text الناتج
undefined reference to $__btstd::cout'
~~~

الكود اتعمله compile، بس الـ linker مربطش مكتبة C++ القياسية (libstdc++)، و [[g++]] بيربطها لوحده. والـ flags: [[-std=c++20]] = إصدار اللغة، و [[-Wall -Wextra]] = كل التحذيرات المهمة.

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[#include <iostream>]] | cout و cin |
| [[std::cout << x]] | اطبع x |
| [[std::cin >> x]] | اقرا كلمة في x |
| [[std::getline(std::cin, s)]] | اقرا سطر كامل |
| [[std::string]] و [[+]] و [[.size()]] | نص بيكبر لوحده، لزق، طول |
| [[a::b]] | b اللي جوه a |
| [[g++ -std=c++20 -Wall -Wextra]] | الـ compile الصح |

- [[>>]] بتقف عند المسافة، ولما تفشل بتحط 0.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيزوّد مرتب s بـ ٣ طرق: من خلال اسم تاني ليه (reference)، ومن خلال دالة بتاخد reference، ومن خلال دالة بتاخد pointer زي C. وبعدين يجمع vector فيه مليون عنصر من غير ما ينسخه. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
s=6001
total=1000000
~~~

---

## ١. [[void add_bonus(int &salary)]]

~~~cpp
void add_bonus(int &salary) { salary += 500; }
~~~

- [[int &]]: «reference لـ int». الـ parameter مش نسخة، ده اسم تاني للمتغير اللي اتبعت.
- [[salary += 500]]: بتزوّد المتغير الأصلي نفسه. مفيش [[*]] زي الـ pointer.

## ٢. نفس الفكرة بالـ pointer

~~~cpp
void add_bonus_ptr(int *salary) {
    if (salary) *salary += 500;
}
~~~

- [[int *salary]]: عنوان. ممكن يبقى null، فلازم [[if (salary)]] قبل الاستخدام.
- [[*salary]]: النجمة «روح للعنوان». ده الفرق: الـ reference مبيبقاش فاضي أبدًا ومش محتاج نجوم.

## ٣. [[const std::vector<int> &v]]

~~~cpp
long long total(const std::vector<int> &v) {
    long long sum = 0;
    for (int x : v) sum += x;
    return sum;
}
~~~

- [[std::vector<int>]]: array بتكبر لوحدها، و [[<int>]] نوع العناصر.
- [[&]]: الـ vector مش بيتنسخ (مليون int = حوالي 4 ميجا). اللي بيتبعت في الحقيقة عنوان (8 bytes).
- [[const]]: الدالة متقدرش تغيّره. جربنا نكتب [[v.push_back(1);]] جواها:

~~~text الناتج
error: passing 'const std::vector<int>' as 'this' argument discards qualifiers [-fpermissive]
~~~

يعني «انت بتنادي دالة بتغيّر على حاجة const». [[discards qualifiers]] = هتشيل الـ const، وده ممنوع.
- [[for (int x : v)]]: range-for، «لكل عنصر x في v».
- [[long long]]: عشان المجموع ميعدّيش حدود الـ int في vectors أكبر.

---

## ٤. [[main]] خطوة خطوة

~~~cpp
    int s = 5000;
    int &alias = s;
    alias += 1;
~~~

[[int &alias = s;]] هنا الـ [[&]] في **تعريف** نوع، فمعناها reference. alias و s نفس الخانة في الذاكرة، فـ s بقت **5001**.

~~~cpp
    add_bonus(s);
    add_bonus_ptr(&s);
~~~

| السطر | شكل النداء | s بعده |
|---|---|---|
| [[add_bonus(s)]] | عادي من غير [[&]] | 5501 |
| [[add_bonus_ptr(&s)]] | [[&s]] = عنوان s (نفس معنى C) | 6001 |

لاحظ إن [[&]] ليها معنيين هنا: في [[int &alias]] (نوع) = reference، و في [[&s]] (قبل متغير) = العنوان.

~~~cpp
    std::vector<int> big(1000000, 1);
    std::cout << "total=" << total(big) << '\n';
~~~

[[big(1000000, 1)]]: مليون عنصر قيمة كل واحد 1، فالمجموع 1000000.

---

## ٥. تجارب الـ try

شلنا الـ [[&]] من [[add_bonus]] ([[void add_bonus(int salary)]]): الدالة بقت بتزوّد نسخة وبترميها، فـ s طلعت **5501** (5000 + 1 من alias + 500 من الـ pointer بس).

[[int &r;]] من غير قيمة:

~~~text الناتج
error: 'r' declared as reference but not initialized
~~~

الـ reference لازم يتربط بحاجة وقت التعريف.

والغلطة المشهورة: ترجّع reference لمتغير محلي. [[-Wall]] بيمسكها:

~~~text الناتج
dg.cpp:1:30: warning: reference to local variable 'x' returned [-Wreturn-local-addr]
    1 | int &f() { int x = 1; return x; }
~~~

x بتموت لما الدالة تخلص، فالـ reference بيشاور على مكان مات (dangling).

## ٦. الـ solCode: [[swap_ref]]

~~~cpp
void swap_ref(int &a, int &b) {
    int tmp = a;
    a = b;
    b = tmp;
}
~~~

نفس swap بتاعة الـ pointers من غير [[*]]، والنداء [[swap_ref(x, y)]] من غير [[&]]:

~~~text الناتج
2 1
~~~

---

## الخلاصة

| الشكل | معناه | إمتى |
|---|---|---|
| [[T &x]] | اسم تاني، الدالة بتغيّر الأصل | out parameter |
| [[const T &x]] | من غير نسخ ومن غير تعديل | parameter كبير (string و vector) |
| [[T *x]] | عنوان ممكن يبقى [[nullptr]] | لما «مفيش قيمة» حالة عادية |
| [[&x]] في expression | عنوان x | زي C |

- الـ reference لازم قيمة وقت التعريف، ومبيتغيّرش يشاور على حاجة تانية.`,
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
          teach: R`## البرنامج بيعمل إيه؟

٣ دوال اسمهم كلهم [[area]] (مربع ومستطيل ودايرة)، والـ compiler بيختار واحدة حسب اللي بتبعته. ودالة [[greet]] ليها parameter بقيمة افتراضية. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
16 15 3.14159
Hello, Sara | Welcome, Omar
~~~

---

## ١. التلات نسخ

~~~cpp
int area(int side) { return side * side; }
int area(int w, int h) { return w * h; }
double area(double r) { return 3.14159 * r * r; }
~~~

| النسخة | بتفرق في | النداء اللي بيروحلها |
|---|---|---|
| [[area(int)]] | parameter واحد int | [[area(4)]] = 16 |
| [[area(int, int)]] | **عدد** الـ parameters | [[area(3, 5)]] = 15 |
| [[area(double)]] | **نوع** الـ parameter | [[area(1.0)]] = 3.14159 |

الشرط: الـ parameters تفرق في العدد أو النوع. نوع الـ return لوحده مش كفاية، لأن وقت النداء الـ compiler بيبص على الـ arguments بس.

### إزاي التلاتة عايشين بنفس الاسم؟

الـ compiler بيدّي كل نسخة اسم داخلي فيه أنواعها (name mangling). عملنا [[g++ -c]] وبصينا بـ [[nm]] (بيعرض الأسماء جوه الـ object file):

~~~text nm o.o
0000000000000022 T _Z4aread
0000000000000000 T _Z4areai
000000000000000f T _Z4areaii
~~~

[[_Z]] بداية اسم C++، و [[4area]] = اسم طوله ٤، وبعده الأنواع: [[i]] = int، و [[ii]] = int و int، و [[d]] = double. و [[nm -C]] (C = demangle) بيرجّعهم مقروءين: [[area(int)]] و [[area(int, int)]] و [[area(double)]]. و [[T]] معناها الدالة موجودة في قسم الكود (text).

---

## ٢. default argument

~~~cpp
std::string greet(const std::string &name, const std::string &greeting = "Hello") {
    return greeting + ", " + name;
}
~~~

- [[const std::string &]]: string من غير نسخ ومن غير تعديل (درس references).
- [[= "Hello"]]: لو النداء مبعتش التاني، خده [["Hello"]].
- الـ parameters اللي ليها default لازم تبقى **في الآخر**: مينفعش [[greet(name = "x", greeting)]].

~~~cpp
    std::cout << greet("Sara") << " | " << greet("Omar", "Welcome") << '\n';
~~~

[[greet("Sara")]] كأنها [[greet("Sara", "Hello")]]، فالناتج [[Hello, Sara | Welcome, Omar]].

---

## ٣. الـ try: [[area(2.5f)]] و [[area(2L)]]

[[2.5f]]: الـ [[f]] معناها float. مفيش نسخة float، بس float لـ double اسمها **promotion** (ترقية من غير خسارة)، وده أحسن من أي تحويل تاني:

~~~text الناتج
19.6349
~~~

[[2L]]: الـ [[L]] معناها long. long لـ int و long لـ double الاتنين **conversion** في نفس الدرجة:

~~~text الناتج
b.cpp:13:22: error: call of overloaded 'area(long int)' is ambiguous
   13 |     std::cout << area(2L) << std::endl;
b.cpp:4:5: note: candidate: 'int area(int)'
b.cpp:6:8: note: candidate: 'double area(double)'
~~~

[[ambiguous]] = «مش عارف أختار». والـ [[note: candidate]] هي النسخ اللي جربها. ده شكل أغلب أخطاء الـ overloads في C++.

ترتيب الاختيار:

| الدرجة | مثال |
|---|---|
| ١. تطابق تام | int لـ int |
| ٢. promotion | float لـ double، char لـ int |
| ٣. conversion | long لـ int، long لـ double، int لـ double |

## ٤. الـ solCode: [[print]]

~~~cpp
void print(int x) { std::cout << "int: " << x << '\n'; }
void print(double x) { std::cout << "double: " << x << '\n'; }
void print(const std::string &s) { std::cout << "string: " << s << '\n'; }
~~~

~~~text الناتج
int: 5
double: 2.5
string: hi
~~~

[[print(std::string("hi"))]] مكتوبة كده عشان [["hi"]] لوحدها نوعها [[const char *]]، فيبقى أوضح إننا عايزين نسخة الـ string.

---

## الخلاصة

- نفس الاسم مسموح لو الـ parameters مختلفة في العدد أو النوع، مش الـ return.
- الـ compiler بيختار: تطابق تام، ثم promotion، ثم conversion. تعادل = [[ambiguous]].
- الـ default args في آخر الـ parameters، وفي الـ declaration بس.`,
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
    }
]);
