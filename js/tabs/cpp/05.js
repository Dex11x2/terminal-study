// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
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
    }
]);
