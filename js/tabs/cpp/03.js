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
    }
]);
