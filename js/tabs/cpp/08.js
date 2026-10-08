// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
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
          teach: R`## البرنامج بيعمل إيه؟

دالة [[max_of]] واحدة شغالة على vector من int ومن string، و class [[Box]] بيشيل أي نوع، ودالة [[twice]] مسموحة للأرقام بس بشرط (concept). اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
9
zoo
2.5 42 3
~~~

---

## ١. function template

~~~cpp
template <typename T>
T max_of(const std::vector<T> &items) {
    T best = items.front();
    for (const T &x : items)
        if (x > best) best = x;
    return best;
}
~~~

- [[template <typename T>]]: «اللي جاي قالب، و T نوع هيتعرف بعدين». [[typename]] ممكن تتكتب [[class]] بنفس المعنى.
- جوه الدالة T بيتعامل زي أي نوع: [[std::vector<T>]] و [[T best]].
- الشرط الوحيد اللي الكود محتاجه من T: إن [[>]] تشتغل عليه.

~~~cpp
    std::cout << max_of(std::vector<int>{3, 9, 2}) << '\n';
    std::cout << max_of(std::vector<std::string>{"pear", "apple", "zoo"}) << '\n';
~~~

الـ compiler شاف [[vector<int>]] فاستنتج T = int وعمل نسخة كاملة بـ int: **9**. وبعدين عمل نسخة تانية بـ string، و [[>]] بين strings أبجدية: **zoo**. يعني الـ template مش دالة واحدة وقت التشغيل: هي نسخ بيعملها الـ compiler لكل نوع اتنادت بيه.

## ٢. class template

~~~cpp
template <typename T>
class Box {
public:
    explicit Box(T value) : value_(value) {}
    T get() const { return value_; }
private:
    T value_;
};
~~~

[[Box<double> b(2.5);]]: النوع بين [[< >]]. ومن C++17 تقدر تكتب [[Box b(2.5);]] والـ compiler يستنتج double من الـ constructor. [[std::vector<int>]] نفسه class template بالشكل ده.

## ٣. concept

~~~cpp
template <typename T>
concept Number = std::integral<T> || std::floating_point<T>;

template <Number T>
T twice(T x) { return x * 2; }
~~~

- [[concept Number = ...]]: اسم لشرط على النوع، بيتحسب وقت الـ compile.
- [[std::integral<T>]] (من [[<concepts>]]): T رقم صحيح (int و long و char...). [[std::floating_point<T>]]: float أو double. و [[||]] = أو.
- [[template <Number T>]] بدل [[typename]]: T لازم يحقق Number.

[[twice(21)]] = 42 (T = int)، و [[twice(1.5)]] = 3 (T = double، والـ cout بيطبع [[3]] من غير [[.0]]).

---

## ٤. الـ try: [[twice(std::string("x"))]]

### مع الـ concept

~~~text الناتج
c.cpp:34:10: error: no matching function for call to 'twice(std::string)'
c.cpp:28:3: note: candidate: 'template<class T>  requires  Number<T> T twice(T)'
c.cpp:28:3: note:   template argument deduction/substitution failed:
c.cpp:28:3: note: constraints not satisfied
c.cpp:34:10:   required from here
c.cpp:25:9:   required for the satisfaction of 'Number<T>' [with T = std::__cxx11::basic_string<char, ...>]
c.cpp:25:35: note: no operand of the disjunction is satisfied
~~~

نقراها: الـ error على **سطر النداء** (34)، والسبب [[constraints not satisfied]]: الشرط Number مش متحقق، و [[no operand of the disjunction]] = ولا طرف من طرفين الـ [[||]] صح.

### من غير الـ concept ([[template <typename T>]])

~~~text الناتج
d.cpp: In instantiation of 'T twice(T) [with T = std::__cxx11::basic_string<char>]':
d.cpp:34:10:   required from here
d.cpp:28:25: error: no match for 'operator*' (operand types are 'std::__cxx11::basic_string<char>' and 'int')
   28 | T twice(T x) { return x * 2; }
~~~

هنا الـ compiler قبل النداء، وبدأ يعمل النسخة (instantiation)، ووقع **جوه** twice عند [[x * 2]]. في المثال ده الرسالة قصيرة (٧ سطور، ونسخة الـ concept ١٨)، بس في templates المكتبات اللي بتنادي templates تانية، بتبقى سلسلة [[required from]] طويلة. والـ concept بيقفل الباب عند النداء نفسه. و [[std::__cxx11::basic_string<char>]] ده الاسم الحقيقي لـ [[std::string]] جوه libstdc++.

---

## ٥. الـ solCode

~~~cpp
template <typename A, typename B>
struct Pair {
    A first;
    B second;
};
~~~

نوعين مختلفين. [[Pair<std::string, int> p{"age", 22};]] = [[age=22]].

~~~cpp
template <typename T>
void swap_values(T &a, T &b) {
    T tmp = a;
    a = b;
    b = tmp;
}
~~~

[[T &]] عشان نبدّل الأصل. [[swap_values(x, y)]] مع strings:

~~~text الناتج
age=22
right left
~~~

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[template <typename T>]] | اللي جاي قالب، T نوع |
| [[f(x)]] | الـ compiler يستنتج T |
| [[f<double>(x)]] / [[Box<double>]] | T محدد صريح |
| [[concept C = شرط;]] | اسم لشرط على النوع |
| [[template <C T>]] | T لازم يحقق C، والـ error عند النداء |

- كل نوع بتستخدمه بيتعمله نسخة كاملة وقت الـ compile.`,
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
(string مفيهوش ضرب في رقم). في المثال الصغير ده الـ error مش أطول (٧ سطور مع gcc 14، ونسخة الـ concept ١٨)، بس بيشاور على سطر جوه الـ template مش على النداء الغلط. ولما الـ template يبقى جوه مكتبة وبينادي templates تانية، الرسالة بتبقى سلسلة طويلة من [[required from]] قبل ما توصل لغلطتك، والـ concept بيوقفها عند النداء. ولاحظ اسم النوع الحقيقي لـ std::string جوه الـ compiler.`,
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
          teach: R`## البرنامج بيعمل إيه؟

دالة قسمة بترمي exception لو القاسم صفر، ودالة بتحوّل نص لسن وبترمي لو النص مش رقم أو السن مش منطقي. و main بتمسك الأخطاء وتطبعها بدل ما البرنامج يقع. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
2.5
invalid: division by zero
age 30
abc -> error: stoi
200 -> error: age must be 0..150
~~~

---

## ١. [[throw]]

~~~cpp
double divide(double a, double b) {
    if (b == 0) throw std::invalid_argument("division by zero");
    return a / b;
}
~~~

- [[std::invalid_argument]] (من [[<stdexcept>]]): نوع exception جاهز، والنص رسالته.
- [[throw]]: الدالة بتقف هنا، ومفيش [[return]]. التنفيذ بيطلع لبرة لحد أقرب [[catch]] مناسب.

## ٢. [[parse_age]]: نوعين أخطاء

~~~cpp
int parse_age(const std::string &text) {
    int age = std::stoi(text);
    if (age < 0 || age > 150) throw std::out_of_range("age must be 0..150");
    return age;
}
~~~

- [[std::stoi]] نفسها بترمي [[std::invalid_argument]] لو النص مش رقم (رسالتها [[stoi]] في libstdc++)، و [[std::out_of_range]] لو الرقم أكبر من int. جربنا [[std::stoi("99999999999")]]:

~~~text الناتج
terminate called after throwing an instance of 'std::out_of_range'
  what():  stoi
~~~

- وإحنا بنرمي [[out_of_range]] لو السن بره المدى.

---

## ٣. [[try]] و [[catch]]

~~~cpp
    try {
        std::cout << divide(10, 4) << '\n';
        std::cout << divide(1, 0) << '\n';
        std::cout << "never printed\n";
    } catch (const std::invalid_argument &e) {
        std::cout << "invalid: " << e.what() << '\n';
    }
~~~

| السطر | اللي حصل |
|---|---|
| [[divide(10, 4)]] | 2.5 واتطبعت |
| [[divide(1, 0)]] | throw: الـ [[cout]] بتاع السطر ده متنفّذش |
| [[never printed]] | اتنط، التنفيذ راح للـ catch على طول |
| [[catch (const std::invalid_argument &e)]] | النوع مطابق، فاتمسك |

- [[const ... &e]]: امسك بالـ reference: من غير نسخ، ومن غير slicing لو الـ exception نوعه ابن.
- [[e.what()]]: الرسالة.

## ٤. catch بالأب [[std::exception]]

~~~cpp
    for (std::string input : {"30", "abc", "200"}) {
        try {
            int age = parse_age(input);
            std::cout << "age " << age << '\n';
        } catch (const std::exception &e) {
            std::cout << input << " -> error: " << e.what() << '\n';
        }
    }
~~~

كل الأنواع الجاهزة بتورث من [[std::exception]]، فـ catch واحد بيمسك الاتنين:

| input | اللي رمى | الناتج |
|---|---|---|
| [["30"]] | محدش | [[age 30]] |
| [["abc"]] | [[stoi]]: invalid_argument | [[abc -> error: stoi]] |
| [["200"]] | إحنا: out_of_range | [[200 -> error: age must be 0..150]] |

والـ try جوه الـ loop، فالخطأ بيوقف اللفة دي بس والـ loop بيكمّل.

---

## ٥. الـ try: من غير catch

~~~text الناتج
terminate called after throwing an instance of 'std::invalid_argument'
  what():  division by zero
Aborted (core dumped)
~~~

exit code **134** = 128 + 6 (signal 6 = SIGABRT). و [[std::terminate]] بتقفل على طول. ولو الناتج رايح لملف أو pipe، سطر [[2.5]] نفسه ممكن يضيع لأن الـ buffer متفضاش قبل الـ abort.

## ٦. الـ solCode: exception بتاعك

~~~cpp
class InsufficientFunds : public std::runtime_error {
public:
    InsufficientFunds(double need, double have)
        : std::runtime_error("need " + std::to_string(need) + " but have " + std::to_string(have)) {}
};
~~~

- بيورث من [[std::runtime_error]]، فـ [[what()]] جاهزة.
- [[: std::runtime_error(...)]]: بنبعت الرسالة لـ constructor الأب.
- [[std::to_string(double)]]: بيكتب ٦ أرقام بعد العلامة.

~~~cpp
        acc.withdraw(30);
        acc.withdraw(500);
    } catch (const InsufficientFunds &e) {
~~~

الرصيد 100، سحب 30 فاضل 70، و 500 أكبر:

~~~text الناتج
cannot withdraw: need 500.000000 but have 70.000000
~~~

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[throw X("msg");]] | وقف وارمي |
| [[try { } catch (const X &e) { }]] | امسك النوع X وولاده |
| [[e.what()]] | الرسالة |
| [[catch (const std::exception &e)]] | أي exception قياسي، يتحط في الآخر |
| محدش مسك | [[terminate]] و exit 134 |

- وانت طالع بسبب exception، الـ destructors بتاعة كل الـ objects المحلية بتتنادى (RAII).`,
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
          teach: R`## البرنامج بيعمل إيه؟

دالة بتدوّر على اسم وترجّع مكانه، ولو مش موجود ترجّع «مفيش» ([[std::optional]]) بدل -1. وبعدين vector فيه قيم من ٣ أنواع ([[std::variant]])، ودالة بتطبع كل واحدة حسب نوعها. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
sara at 1
zed found? 0 fallback=-1
int 42
double 3.5
text hi
~~~

---

## ١. [[std::optional<int>]]

~~~cpp
std::optional<int> find_index(const std::vector<std::string> &v, const std::string &key) {
    for (std::size_t i = 0; i < v.size(); ++i)
        if (v[i] == key) return static_cast<int>(i);
    return std::nullopt;
}
~~~

- [[std::optional<int>]] (من [[<optional>]]): يا int يا ولا حاجة.
- [[std::size_t]]: نوع [[v.size()]] (موجب). استخدمناه عشان مقارنة int بـ size_t بتطلّع warning.
- [[static_cast<int>(i)]]: تحويل صريح لـ int. الـ cast بتاع C++، أوضح من [[(int)i]].
- [[return static_cast<int>(i);]]: الـ int بيتحول لـ optional فيه قيمة لوحده.
- [[std::nullopt]]: optional فاضي.

## ٢. استخدامه

~~~cpp
    if (auto i = find_index(names, "sara")) std::cout << "sara at " << *i << '\n';
~~~

- [[auto i = ...]] جوه الـ if: i موجود جوه الـ if بس.
- الـ optional في شرط = true لو فيه قيمة.
- [[*i]]: القيمة نفسها = 1.

~~~cpp
    auto missing = find_index(names, "zed");
    std::cout << "zed found? " << missing.has_value() << " fallback=" << missing.value_or(-1) << '\n';
~~~

- [[has_value()]]: false = 0.
- [[value_or(-1)]]: القيمة لو موجودة، وإلا -1.

الـ try: [[missing.value()]] من غير فحص:

~~~text الناتج
terminate called after throwing an instance of 'std::bad_optional_access'
  what():  bad optional access
~~~

[[value()]] بترمي لو فاضي. أما [[*missing]] على optional فاضي فمبترميش: undefined behavior.

---

## ٣. [[std::variant]]

~~~cpp
using Value = std::variant<int, double, std::string>;
~~~

- [[using Value = ...]]: اسم أقصر للنوع (زي typedef).
- [[std::variant<int, double, std::string>]] (من [[<variant>]]): قيمة **واحدة** نوعها واحد من التلاتة، وبيفتكر هو أنهي.

~~~cpp
void print(const Value &v) {
    if (std::holds_alternative<int>(v)) std::cout << "int " << std::get<int>(v) << '\n';
    else if (const double *d = std::get_if<double>(&v)) std::cout << "double " << *d << '\n';
    else std::cout << "text " << std::get<std::string>(v) << '\n';
}
~~~

| الدالة | بترجّع |
|---|---|
| [[std::holds_alternative<int>(v)]] | true لو شايل int |
| [[std::get<int>(v)]] | الـ int، وبترمي [[std::bad_variant_access]] لو شايل نوع تاني |
| [[std::get_if<double>(&v)]] | pointer للـ double، أو [[nullptr]]. لاحظ [[&v]] |

السطر التاني بيعرّف [[d]] جوه الـ if، و [[nullptr]] = false.

~~~cpp
    std::vector<Value> values = {42, 3.5, std::string("hi")};
~~~

[[std::string("hi")]] مكتوبة صريحة لأن [["hi"]] لوحده نوعه [[const char *]]، وده ممكن يتحول لـ bool أو string، فالأوضح نكتب النوع.

---

## ٤. الـ solCode

~~~cpp
std::optional<int> parse_int(const std::string &s) {
    try {
        return std::stoi(s);
    } catch (const std::exception &) {
        return std::nullopt;
    }
}
~~~

- بتحوّل exception لـ optional: اللي بينادي مش محتاج try.
- [[catch (const std::exception &)]] من غير اسم، لأننا مش هنستخدم الرسالة.

~~~cpp
    std::variant<int, double, std::string> v = 3.5;
    std::visit([](const auto &x) { std::cout << x << '\n'; }, v);
~~~

- [[std::visit(f, v)]]: نادي f بالقيمة اللي جوه بنوعها الحقيقي.
- [[const auto &x]] في lambda: lambda «generic»، الـ compiler بيعمل منها نسخة لكل نوع من التلاتة. كلهم بيتطبعوا بـ [[<<]] فنسخة واحدة في الكود كفاية.

~~~text الناتج
3.5
42 -1
~~~

---

## الخلاصة

| | [[optional<T>]] | [[variant<A, B, C>]] |
|---|---|---|
| بيشيل | T أو ولا حاجة | واحد من الأنواع |
| فيه قيمة؟ | [[if (opt)]] و [[has_value()]] | [[holds_alternative<A>(v)]] |
| خد القيمة | [[*opt]] و [[value()]] و [[value_or(x)]] | [[get<A>(v)]] و [[get_if<A>(&v)]] |
| لكل الحالات | | [[std::visit(f, v)]] |`,
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
• [[set(CMAKE_CXX_STANDARD 20)]]: C++20 (بيحط الـ flag المناسب للـ compiler: مع gcc بيبقى [[-std=gnu++20]] لأن الـ extensions شغالة افتراضيًا، ولو عايز [[-std=c++20]] بالظبط ضيف [[set(CMAKE_CXX_EXTENSIONS OFF)]]).
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
          teach: R`## الملف ده بيعمل إيه؟

[[CMakeLists.txt]] بيوصف المشروع: مكتبة اسمها [[core]] من [[src/todo.cpp]]، وبرنامج اسمه [[app]] من [[src/main.cpp]] بيستخدمها. و CMake بيحوّل الوصف ده لملفات build للجهاز اللي انت عليه. عملنا المشروع كله (ملفات الـ solCode) في [[gcc:14]] وسطبنا [[cmake]] جوه الـ container ([[apt-get install cmake]]، طلع 3.31.6).

شكل الفولدر:

~~~text todo/
todo/CMakeLists.txt
todo/include/todo.h
todo/src/todo.cpp
todo/src/main.cpp
~~~

---

## ١. الأول: الإصدار والمشروع

~~~cmake
cmake_minimum_required(VERSION 3.20)
project(todo LANGUAGES CXX)
~~~

- [[cmake_minimum_required]]: لو الـ CMake عندك أقدم من 3.20 يوقف برسالة واضحة.
- [[project(todo LANGUAGES CXX)]]: اسم المشروع، و [[CXX]] = C++ (لأن [[+]] مينفعش في الأسماء). ده السطر اللي بيدوّر على الـ compiler.

## ٢. إصدار C++

~~~cmake
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
~~~

- [[set(اسم قيمة)]]: بيدّي قيمة لمتغير CMake.
- [[CMAKE_CXX_STANDARD 20]]: C++20. شوفنا الأمر الحقيقي في [[compile_commands.json]]:

~~~text compile_commands.json (سطر main.cpp)
/usr/local/bin/c++  -I/p/todo/include -std=gnu++20 -Wall -Wextra -o CMakeFiles/app.dir/src/main.cpp.o -c /p/todo/src/main.cpp
~~~

لاحظ [[-std=gnu++20]] مش [[c++20]]: CMake بيشغّل extensions بتاعة gcc افتراضيًا. لو عايز المعيار بالظبط ضيف [[set(CMAKE_CXX_EXTENSIONS OFF)]].
- [[REQUIRED ON]]: لو الـ compiler مبيدعمش 20، error بدل ما ينزل لإصدار أقدم بهدوء.
- [[EXPORT_COMPILE_COMMANDS]]: الملف اللي فوق. الـ editors (clangd في VS Code مثلًا) بيقروه عشان يعرفوا الـ include paths والـ flags.

## ٣. المكتبة

~~~cmake
add_library(core src/todo.cpp)
target_include_directories(core PUBLIC include)
~~~

- [[add_library(core ...)]]: target اسمه core. افتراضيًا static library: طلعت [[libcore.a]].
- [[target_include_directories(... PUBLIC include)]]: بيضيف [[-I.../include]]. و [[PUBLIC]] = لـ core نفسها **ولأي حد** بيستخدمها. عشان كده [[-I/p/todo/include]] ظهرت في أمر main.cpp مع إننا مكتبناهاش لـ app.

| الكلمة | للـ target نفسه | للي بيستخدمه |
|---|---|---|
| [[PRIVATE]] | آه | لأ |
| [[PUBLIC]] | آه | آه |
| [[INTERFACE]] | لأ | آه |

## ٤. البرنامج

~~~cmake
add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE core)
target_compile_options(app PRIVATE -Wall -Wextra)
~~~

- [[add_executable]]: برنامج اسمه app.
- [[target_link_libraries(app PRIVATE core)]]: اربط core مع app، وخد الـ include بتاعها.
- [[target_compile_options]]: flags لـ app بس ([[-Wall -Wextra]] بتوع gcc و clang، و MSVC عنده [[/W4]]).

---

## ٥. التشغيل

### configure

~~~bash
cmake -S . -B build
~~~

[[-S .]] = الكود (source) في الفولدر الحالي، و [[-B build]] = حط الملفات المولّدة في [[build]]:

~~~text الناتج
-- The CXX compiler identification is GNU 14.4.0
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/local/bin/c++ - skipped
-- Detecting CXX compile features - done
-- Configuring done (0.3s)
-- Generating done (0.0s)
-- Build files have been written to: /p/todo/build
~~~

جوه [[build]]: [[Makefile]] (الافتراضي على Linux) و [[CMakeCache.txt]] (الإعدادات المحفوظة) و [[compile_commands.json]].

### build

~~~bash
cmake --build build
./build/app
~~~

~~~text الناتج
[ 25%] Building CXX object CMakeFiles/core.dir/src/todo.cpp.o
[ 50%] Linking CXX static library libcore.a
[ 50%] Built target core
[ 75%] Building CXX object CMakeFiles/app.dir/src/main.cpp.o
[100%] Linking CXX executable app
[100%] Built target app
2 done
~~~

[[cmake --build]] بينادي الأداة اللي اتولدت (make هنا) من غير ما تعرف هي إيه. core اتبنت الأول لأن app محتاجها. و [[2 done]] = عنصرين true من التلاتة.

### الـ try: عدّلنا main.cpp بس

~~~text الناتج
[ 50%] Built target core
[ 75%] Building CXX object CMakeFiles/app.dir/src/main.cpp.o
[100%] Linking CXX executable app
[100%] Built target app
~~~

ملف واحد اتعمله compile، و core متلمستش.

---

## ٦. الـ solCode: الملفات

- [[#pragma once]] في [[todo.h]]: متضمّنش الملف ده أكتر من مرة في نفس الـ compile.
- [[#include "todo.h"]] بـ [[" "]]: ملف من المشروع (اتلاقى بسبب [[-I include]])، و [[< >]] للمكتبات.
- [[for (bool done : items) if (done) ++n;]]: عدّ الـ true.

## ٧. على ويندوز (من الـ docs، متجربش هنا)

نفس الأمرين. لو Visual Studio متسطب، CMake بيختار generator بتاعه افتراضيًا ويعمل [[.sln]]، وبعدها [[cmake --build build --config Release]] والبرنامج في [[build\Release\app.exe]]. و [[-G Ninja]] بيختار Ninja على أي نظام.

---

## الخلاصة

| الأمر | بيعمل |
|---|---|
| [[project(x LANGUAGES CXX)]] | اسم المشروع ويلاقي الـ compiler |
| [[set(CMAKE_CXX_STANDARD 20)]] | إصدار C++ |
| [[add_library]] / [[add_executable]] | targets |
| [[target_include_directories]] / [[target_link_libraries]] | مين يشوف إيه |
| [[cmake -S . -B build]] | configure |
| [[cmake --build build]] | build |`,
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
    }
]);
