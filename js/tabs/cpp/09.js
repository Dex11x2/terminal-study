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
          teach: R`## البرنامج بيعمل إيه؟

class [[Buffer]] بيطبع كلمة كل ما يتبني أو يتنسخ أو يتنقل، فتشوف بعينك إمتى C++ بتنسخ وإمتى بتنقل وإمتى مبتعملش ولا ده ولا ده. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
construct
copy
move
a.size=0 c.size=10
construct
d.size=1000
v[0] size=36 s now=""
~~~

---

## ١. التلات constructors

~~~cpp
    explicit Buffer(std::size_t n) : data_(n, 'x') { std::cout << "construct\n"; }
    Buffer(const Buffer &o) : data_(o.data_) { std::cout << "copy\n"; }
    Buffer(Buffer &&o) noexcept : data_(std::move(o.data_)) { std::cout << "move\n"; }
~~~

| الـ constructor | الـ parameter | بيعمل |
|---|---|---|
| العادي | [[std::size_t n]] | string فيه n حرف [['x']] |
| copy | [[const Buffer &o]] | ينسخ حروف o كلها |
| move | [[Buffer &&o]] | ياخد حروف o ويسيبه فاضي |

- [[&&]] هنا مش «و» المنطقية: ده **rvalue reference**، بيتربط بقيمة مؤقتة أو بحاجة اتعلّمت إنها ممكن تتنقل. الـ compiler بيختار نسخة [[&&]] لما يقدر.
- [[std::move(o.data_)]]: جوه الـ move constructor لازم نقول تاني «انقل الـ string» وإلا هيتنسخ، لأن [[o]] جوه الدالة ليه اسم فبيتعامل كـ lvalue.
- [[noexcept]]: «مش هترمي exception». مهمة للـ vector (تحت).

## ٢. copy و move في main

~~~cpp
    Buffer a(10);
    Buffer b = a;
    Buffer c = std::move(a);
~~~

- [[Buffer b = a;]]: a لسه هيتستخدم، فـ **copy**.
- [[std::move(a)]]: مبتنقلش حاجة لوحدها! هي cast: «اعتبر a ممكن يتنقل». فالـ compiler اختار الـ move constructor = **move**.
- بعدها: [[a.size=0 c.size=10]]. الـ 0 دي من libstdc++: المعيار بيقول a بقى «valid but unspecified»، تقدر تمسحه أو تديله قيمة جديدة، بس متعتمدش على قيمته.

## ٣. الـ return: مفيش ولا copy ولا move

~~~cpp
Buffer make_buffer() {
    Buffer b(1000);
    return b;
}
...
    Buffer d = make_buffer();
~~~

اتطبع [[construct]] بس. الـ compiler بنى b في مكان d على طول (copy elision، واسمها هنا NRVO = Named Return Value Optimization).

الـ try: [[return std::move(b);]]:

~~~text الناتج
a.cpp:20:21: warning: moving a local object in a return statement prevents copy elision [-Wpessimizing-move]
a.cpp:20:21: note: remove 'std::move' call
~~~

وبقى بيطبع [[construct]] وبعدها [[move]]: عملت شغل زيادة. [[pessimizing]] = عكس optimizing.

## ٤. move في vector

~~~cpp
    std::string s = "hello world, long enough to allocate";
    std::vector<std::string> v;
    v.push_back(std::move(s));
~~~

- النص 36 حرف (طويل كفاية إنه يتحجز على الـ heap؛ النصوص القصيرة في libstdc++ لحد 15 حرف بتتخزن جوه الـ object نفسه).
- [[push_back(std::move(s))]]: الـ string اتنقل جوه الـ vector من غير نسخ الحروف.
- [[\"]] جوه النص: علامة [["]] بتتطبع. و [[s now=""]] = s بقى فاضي (برضه سلوك libstdc++).

---

## ٥. الـ try: [[noexcept]] والـ vector

~~~cpp
    std::vector<Buffer> vec;
    vec.reserve(1);
    vec.emplace_back(5);
    vec.emplace_back(6);
~~~

التاني مش هيلاقي مكان، فالـ vector بيحجز مكان أكبر وينقل العنصر القديم:

| الـ move constructor | الناتج |
|---|---|
| بـ [[noexcept]] | [[construct]] [[construct]] [[move]] |
| من غير [[noexcept]] | [[construct]] [[construct]] [[copy]] |

ليه؟ الـ vector بيضمن إن لو حصل exception وهو بينقل، العناصر القديمة تفضل سليمة. move ممكن ترمي في النص يبقى نص العناصر اتنقلت وضاعت، فبيفضّل الـ copy الآمنة. فـ [[noexcept]] على الـ move constructor مش ديكور: من غيرها كل كبرة للـ vector بتنسخ.

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[T(T &&o) noexcept]] | move constructor: خد موارد o |
| [[std::move(x)]] | cast بس: «x ممكن يتنقل» |
| x بعد الـ move | سليم بس قيمته مش مضمونة |
| [[return local;]] | copy elision، متكتبش [[std::move]] |
| [[noexcept]] على الـ move | من غيرها الـ vector بينسخ |`,
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
          teach: R`## البرنامج بيعمل إيه؟

[[Player]] بيطبع لما يتعمل ولما يتمسح. الجزء الأول بـ [[unique_ptr]] (مالك واحد بيتنقل)، والتاني بـ [[shared_ptr]] (مالكين) و [[weak_ptr]] بيبص من غير ما يملك. مفيش ولا [[new]] ولا [[delete]] في البرنامج. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
create Sara
p empty? 1
destroy Sara
--
create Omar
use_count=2
alive: Omar
destroy Omar
expired? 1
~~~

---

## ١. [[Player]]

~~~cpp
    explicit Player(std::string n) : name(std::move(n)) { ... }
~~~

[[std::string n]] بالقيمة وبعدين [[std::move(n)]] جوه الـ member: النص بيتنسخ مرة واحدة بالكتير (لما يتبعت)، وبعدين بيتنقل.

## ٢. [[unique_ptr]]

~~~cpp
    {
        auto p = std::make_unique<Player>("Sara");
        std::unique_ptr<Player> q = std::move(p);
        std::cout << "p empty? " << (p == nullptr) << '\n';
    }
~~~

- [[std::make_unique<Player>("Sara")]] (من [[<memory>]]): بيعمل Player على الـ heap ويرجّعه جوه [[std::unique_ptr<Player>]]. الـ arguments بتروح للـ constructor.
- [[std::move(p)]]: الملكية اتنقلت لـ q، و p بقى [[nullptr]] (ده مضمون للـ unique_ptr): [[p empty? 1]].
- عند [[}]]: q بيموت، فبيمسح الـ Player: [[destroy Sara]].

النسخ ممنوع. جربنا [[std::unique_ptr<Player> r = q;]]:

~~~text الناتج
error: use of deleted function 'std::unique_ptr<_Tp, _Dp>::unique_ptr(const std::unique_ptr<_Tp, _Dp>&) [with _Tp = Player; _Dp = std::default_delete<Player>]'
~~~

الـ copy constructor بتاعه [[= delete]]، زي class الـ File في درس RAII. و [[_Dp = std::default_delete<Player>]] = اللي بيمسح، وهو [[delete]] عادي.

## ٣. [[shared_ptr]] و [[weak_ptr]]

~~~cpp
    std::weak_ptr<Player> watcher;
    {
        auto a = std::make_shared<Player>("Omar");
        auto b = a;
        watcher = a;
        std::cout << "use_count=" << a.use_count() << '\n';
        if (auto locked = watcher.lock()) std::cout << "alive: " << locked->name << '\n';
    }
    std::cout << "expired? " << watcher.expired() << '\n';
~~~

| السطر | العدّاد |
|---|---|
| [[make_shared]] | 1 |
| [[auto b = a;]] | نسخة: 2 |
| [[watcher = a;]] | weak مبيزوّدش: 2 |
| [[use_count()]] | بيطبع 2 |
| [[watcher.lock()]] | shared_ptr مؤقت: 3 جوه الـ if، و 2 بعده |
| [[}]] | b ثم a بيموتوا: 0، فـ [[destroy Omar]] |

- [[watcher]] متعرّف **بره** الـ scope عشان نسأله بعد ما الـ object مات.
- [[lock()]]: لو الـ object عايش بيرجّع shared_ptr ليه (فيضمن إنه ميموتش وانت بتستخدمه)، وإلا فاضي.
- [[locked->name]]: الـ smart pointer بيتعامل زي pointer عادي.
- [[expired()]] بعد الموت: true = 1.

---

## ٤. الـ try: دايرة بـ [[shared_ptr]]

~~~cpp
struct Node {
    const char *name;
    std::shared_ptr<Node> next;
    ...
};
    a->next = b;
    b->next = a;
~~~

a ماسك b و b ماسك a. لما المتغيرين a و b يموتوا، كل عقدة لسه عدّادها 1 (من التانية). مفيش [[destroy]] اتطبعت، و ASan ([[-fsanitize=address]] فيه LeakSanitizer):

~~~text الناتج
==47==ERROR: LeakSanitizer: detected memory leaks
Indirect leak of 40 byte(s) in 1 object(s) allocated from:
    #0 ... in operator new(unsigned long)
    #8 ... in std::shared_ptr<Node> std::make_shared<Node, char const (&) [2]>(...)
Indirect leak of 40 byte(s) in 1 object(s) allocated from:
SUMMARY: AddressSanitizer: 80 byte(s) leaked in 2 allocation(s).
~~~

40 byte لكل عقدة: [[make_shared]] بيحجز الـ Node (name 8 + next 16) والعدّادات (16) في حتة واحدة. و exit code بقى 1.

## ٥. الـ solCode: الحل بـ [[weak_ptr]]

~~~cpp
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;
...
    a->next = b;
    b->prev = a;
    std::cout << "b sees " << b->prev.lock()->name << '\n';
~~~

اتجاه واحد بيملك (next)، والتاني بيبص بس (prev). اتشغّل بـ ASan ومفيش leak:

~~~text الناتج
b sees a
destroy a
destroy b
~~~

a عدّاده 1 بس (المتغير)، فلما يموت a بيتمسح، ومعاه [[next]] اللي كان ماسك b، فـ b بيتمسح.

---

## الخلاصة

| النوع | المالك | بيتنسخ؟ | امتى |
|---|---|---|---|
| [[unique_ptr]] | واحد | لأ، بيتنقل بـ [[std::move]] | الافتراضي |
| [[shared_ptr]] | كتير، بعدّاد | آه | ملكية مشتركة فعلًا |
| [[weak_ptr]] | مش مالك | آه | يبص، ويكسر الدواير |

- اعمل بـ [[make_unique]] و [[make_shared]]، مش [[new]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيحسب factorial و جدول مربعات **وقت الـ compile**، ويتأكد من نتيجة بـ [[static_assert]] قبل ما البرنامج يتبني أصلًا، ويستخدم نفس دالة factorial وقت التشغيل كمان. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
120 720 16 1024
~~~

---

## ١. دالة [[constexpr]]

~~~cpp
constexpr int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; ++i) result *= i;
    return result;
}
~~~

دالة عادية بـ loop ومتغيرات، بس [[constexpr]] قدامها معناها: «ينفع تتنفذ وقت الـ compile لو الـ arguments معروفة ساعتها». ولو مش معروفة، بتتنفذ وقت التشغيل عادي.

## ٢. [[std::array]] وقت الـ compile

~~~cpp
constexpr std::array<int, 5> squares() {
    std::array<int, 5> a{};
    for (int i = 0; i < 5; ++i) a[i] = i * i;
    return a;
}
~~~

- [[a{}]]: كل العناصر صفر. لازم قيمة أولية جوه دالة constexpr.
- النتيجة [[0 1 4 9 16]]، و [[sq[4]]] = 16.

## ٣. [[consteval]]

~~~cpp
consteval int kb(int n) { return n * 1024; }
~~~

[[consteval]] (C++20) أشد: **لازم** وقت الـ compile، مفيش نسخة وقت تشغيل.

---

## ٤. [[main]]

~~~cpp
    constexpr int f5 = factorial(5);
    static_assert(f5 == 120, "factorial(5) must be 120");
~~~

- [[constexpr int f5]]: لازم تتحسب قبل التشغيل، فالـ compiler نفّذ factorial(5) بنفسه = 120.
- [[static_assert(شرط, "رسالة")]]: بيتفحص وقت الـ compile. غيّرناه لـ [[f5 == 121]]:

~~~text الناتج
a.cpp:20:22: error: static assertion failed: factorial(5) must be 120
a.cpp:20:22: note: the comparison reduces to '(120 == 121)'
~~~

الرسالة هي النص اللي كتبته زي ما هو، والـ note بتوريك القيم الحقيقية.

~~~cpp
    int runtime_n = 6;
    int f6 = factorial(runtime_n);
~~~

[[runtime_n]] متغير عادي (مش const)، فـ factorial هنا بتتنفذ وقت التشغيل = 720. بصينا على الـ assembly ([[g++ -S]] بيطلّع كود الـ assembly بدل البرنامج): فيه نداء واحد بس لـ factorial ([[call _Z9factoriali]]) وهو بتاع f6. f5 بقت رقم 120 محطوط جاهز.

~~~cpp
    constexpr auto sq = squares();
    std::array<char, kb(1)> buffer{};
~~~

- [[sq]]: الجدول كله اتعمل وقت الـ compile.
- [[std::array<char, kb(1)>]]: الحجم بين [[< >]] لازم ثابت وقت الـ compile، و [[kb(1)]] = 1024 ثابت. [[buffer.size()]] = 1024.

---

## ٥. الـ try

### [[kb(runtime_n)]]

~~~cpp
    int k = kb(runtime_n);
~~~

~~~text الناتج
b.cpp:22:15: error: call to consteval function 'kb(runtime_n)' is not a constant expression
b.cpp:22:15: error: the value of 'runtime_n' is not usable in a constant expression
b.cpp:21:9: note: 'int runtime_n' is not const
~~~

consteval مع قيمة وقت تشغيل = error. لو كانت [[constexpr]] كانت هتشتغل وقت التشغيل عادي.

### [[constexpr int big = factorial(13);]]

~~~text الناتج
c.cpp:22:34:   in 'constexpr' expansion of 'factorial(13)'
c.cpp:6:41: error: overflow in constant expression [-fpermissive]
    6 |     for (int i = 2; i <= n; ++i) result *= i;
~~~

13! = 6227020800، وأكبر int = 2147483647. الـ overflow في int undefined behavior، ووقت الـ compile الـ compiler ممنوع يقبل UB، فبيوقف ويوريك السطر. نفس الحساب وقت التشغيل كان هيطلع رقم غلط من غير ولا كلمة.

### [[static_assert(sizeof(void *) == 8, "64-bit only");]]

اتعمل compile عادي (x86-64: الـ pointer 8 bytes). على نظام 32-bit مش هيتبني.

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[constexpr]] متغير | لازم يتحسب وقت الـ compile |
| [[constexpr]] دالة | ينفع وقت الـ compile، وينفع وقت التشغيل |
| [[consteval]] دالة | وقت الـ compile بس |
| [[static_assert(cond, "msg")]] | شرط لو غلط البرنامج ميتبنيش |
| [[const]] | ثابت، بس ممكن يتحسب وقت التشغيل |

- وقت الـ compile الـ compiler بيمسك الـ UB (زي overflow) كـ error.`,
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
[[error: static assertion failed: factorial(5) must be 120]] (الرسالة هي النص اللي في الـ static_assert زي ما هو، حتى لو غيّرت الشرط بس)، وتحتها [[note: the comparison reduces to '(120 == 121)']].

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
          teach: R`## البرنامج بيعمل إيه؟

دالة [[is_command]] بتاخد أي نص ([[std::string]] أو literal) من غير نسخ عن طريق [[std::string_view]]، ودالة [[sum]] بتاخد vector أو array عادية من غير نسخ عن طريق [[std::span]]. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
1 0 help
10 60 5
~~~

---

## ١. [[std::string_view]]

~~~cpp
bool is_command(std::string_view s) { return !s.empty() && s.front() == '/'; }
~~~

- [[std::string_view]] (من [[<string_view>]]): pointer لأول حرف + طول. مش بيملك الحروف. حجمه طلع [[16]] byte ([[sizeof(std::string_view)]]).
- بيتبعت بالقيمة عادي (صغير).
- [[!s.empty() && s.front() == '/']]: مش فاضي **و** أوله [['/']]. الـ [[&&]] بتقف لو الأول false، فـ [[front()]] مبتتناداش على نص فاضي.

~~~cpp
    std::string line = "/help me please";
    std::string_view view = line;
    std::string_view word = view.substr(1, 4);
~~~

- [[view = line]]: نافذة على حروف line. مفيش نسخ.
- [[view.substr(1, 4)]]: من الحرف رقم 1، 4 حروف = [[help]]. ده string_view تاني على نفس الحروف. ([[substr]] بتاعة [[std::string]] كانت هتعمل string جديد.)

~~~cpp
    std::cout << is_command(line) << ' ' << is_command("plain") << ' ' << word << '\n';
~~~

- [[is_command(line)]]: string بيتحول لـ string_view ببلاش = 1.
- [[is_command("plain")]]: literal بيتحول من غير ما يتعمل [[std::string]] = 0.
- [[1 0 help]].

## ٢. [[std::span]]

~~~cpp
int sum(std::span<const int> values) {
    int total = 0;
    for (int v : values) total += v;
    return total;
}
~~~

- [[std::span<const int>]] (من [[<span>]]، C++20): pointer لأول عنصر + عدد. هو كمان 16 byte.
- [[const int]]: الدالة تقرا بس. [[std::span<int>]] لو هتعدّل.
- range-for شغال عليه زي أي container.

~~~cpp
    std::vector<int> v = {1, 2, 3, 4};
    int arr[] = {10, 20, 30};
    std::cout << sum(v) << ' ' << sum(arr) << ' ' << sum(std::span(v).subspan(1, 2)) << '\n';
~~~

| النداء | الـ span بيشاور على | المجموع |
|---|---|---|
| [[sum(v)]] | الـ vector كله | 10 |
| [[sum(arr)]] | array الـ C، والطول (3) اتعرف لوحده | 60 |
| [[std::span(v).subspan(1, 2)]] | من رقم 1، عنصرين: 2 و 3 | 5 |

في C كنت هتبعت [[int *arr, int n]]. هنا الطول جوه الـ span.

---

## ٣. الـ try: النافذة على حاجة ماتت

~~~cpp
    std::string_view bad = std::string("temp");
    std::cout << bad << '\n';
~~~

[[std::string("temp")]] مؤقت بيموت في آخر السطر، و bad لسه بيشاور عليه. gcc 14 بـ [[-Wall -Wextra]] مقالش حاجة. من غير sanitizer طبع [[temp]] صح بالصدفة. ومع نص طويل (35 حرف) طبع زبالة:

~~~text الناتج (cat -A بيبيّن الحروف الغريبة)
.M-^V^C^@^@^@^@^@M-~7M-^]9M-;^Mm$__btmporary string here$
~~~

بـ [[-fsanitize=address]]:

~~~text النص القصير
ERROR: AddressSanitizer: stack-use-after-scope on address 0x7e2957700090
READ of size 4 at 0x7e2957700090 thread T0
~~~

~~~text النص الطويل
ERROR: AddressSanitizer: heap-use-after-free on address 0x504000000010
~~~

الفرق: libstdc++ بتخزن النص لحد 15 حرف جوه الـ string object نفسه (على الـ stack هنا)، والأطول على الـ heap. في الحالتين الذاكرة مبقتش بتاعتك.

## ٤. الـ solCode: [[split]]

~~~cpp
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
~~~

- [[s.find(sep, start)]]: مكان أول sep من start، أو [[npos]] (أكبر رقم في size_t = «مش لاقي»).
- مش لاقي: الباقي كله كلمة أخيرة، ورجّع.
- لاقي: الكلمة من start لحد قبل الفاصل ([[pos - start]] حرف)، وكمّل بعده.
- ولا حرف اتنسخ: كل جزء نافذة على النص الأصلي.

~~~text الناتج
[a][bb][][ccc]
~~~

[[[]]] الفاضية من [[,,]]. والنص [["a,bb,,ccc"]] literal عايش طول البرنامج، فالـ views سليمة.

---

## الخلاصة

| | [[string_view]] | [[span<T>]] |
|---|---|---|
| بيشاور على | حروف | عناصر جنب بعض |
| بيقبل | string و literal و [[char *]] | vector و array و array الـ C |
| جزء منه | [[substr]] | [[subspan]] |
| بيملك؟ | لأ | لأ |

- الداتا الأصلية لازم تعيش أطول من الـ view.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيحط نفس الـ 5 مليون رقم في [[std::vector]] وفي [[std::list]]، ويجمعهم بنفس الدالة، ويقيس كل واحد خد كام millisecond. الفرق كله من مكان الداتا في الذاكرة. اتشغّل في [[gcc:14]] جوه Docker على AMD Ryzen 9 5900HX بـ [[g++ -std=c++20 -O2]]، ٣ مرات وكلهم نفس الأرقام:

~~~text الناتج
vector: 1 ms
list:   9 ms
same sum? 1
~~~

الأرقام عندك هتختلف حسب الجهاز، بس النسبة هي اللي تهمك.

---

## ١. دالة القياس [[ms]]

~~~cpp
template <typename F>
long long ms(F f) {
    auto start = std::chrono::steady_clock::now();
    f();
    auto end = std::chrono::steady_clock::now();
    return std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
}
~~~

- [[template <typename F>]]: F أي حاجة تتنادى (هنا lambda). كل lambda ليها نوع مختلف، فالـ template هو اللي يقبلهم.
- [[steady_clock::now()]] قبل وبعد [[f()]]، والفرق [[duration_cast<milliseconds>]] و [[.count()]] = الرقم.

## ٢. تجهيز الداتا

~~~cpp
    const int n = 5'000'000;
    std::vector<int> v;
    v.reserve(n);
    for (int i = 0; i < n; ++i) v.push_back(i % 100);
    std::list<int> l(v.begin(), v.end());
~~~

- [[5'000'000]]: الـ [[']] فاصل للقراية.
- [[reserve(n)]]: حجزة واحدة بدل ما الـ vector يكبر ويتنقل ~23 مرة.
- [[i % 100]]: أرقام من 0 لـ 99 عشان المجموع ميعدّيش.
- [[l(v.begin(), v.end())]]: list فيها نفس العناصر. كل عنصر في الـ list «node» محجوز لوحده (القيمة + pointer للي قبله + pointer للي بعده = 24 byte لـ int واحد في libstdc++ على 64-bit).

## ٣. القياس

~~~cpp
    std::cout << "vector: " << ms([&] { s1 = std::accumulate(v.begin(), v.end(), 0LL); }) << " ms\n";
~~~

- [[[&] { ... }]]: lambda من غير parameters (الأقواس [[()]] ممكن تتشال)، و [[[&]]] = تمسك كل المتغيرات بالـ reference، فتكتب في s1.
- [[0LL]]: بداية long long، فالمجموع long long.

### ليه الـ list أبطأ ٩ مرات؟

- الـ vector: الأرقام جنب بعض. الـ CPU بيقرا من الـ RAM سطور (cache line) حجمها 64 byte = 16 int مرة واحدة، وبيلاحظ إنك ماشي بالترتيب فيجيب اللي بعده بدري (prefetch).
- الـ list: كل خطوة لازم تقرا pointer الـ next **الأول** عشان تعرف تروح فين. الـ CPU ميقدرش يجيب بدري، وكل node ممكن يبقى في مكان بعيد.

---

## ٤. الـ try: [[-O0]]

~~~text الناتج بـ -O0
vector: 35 ms
list:   42 ms
same sum? 1
~~~

الاتنين أبطأ بكتير (الـ vector 35 مرة)، والفرق بينهم تقريبًا اختفى، لأن من غير optimization كل [[++it]] و [[*it]] نداء دالة حقيقي. فالقياس بـ [[-O0]] بيوريك حاجة مش هتحصل في البرنامج الحقيقي.

## ٥. الـ solCode: صف صف ولا عمود عمود

~~~cpp
    const int N = 4000;
    std::vector<int> m(N * N, 1);
~~~

matrix 4000 × 4000 متخزنة كـ vector واحد (16 مليون int = 64 ميجا)، صف ورا صف: العنصر [[(i, j)]] مكانه [[i * N + j]].

~~~cpp
        for (int j = 0; j < N; ++j) by_row += m[i * N + j];
...
        for (int j = 0; j < N; ++j) by_col += m[j * N + i];
~~~

| الطريقة | كل خطوة بتنط | الوقت ([[-O2]]، مرتين) |
|---|---|---|
| صف صف [[m[i * N + j]]] | 4 byte (العنصر اللي جنبه) | [[3 ms]] |
| عمود عمود [[m[j * N + i]]] | 16000 byte (صف كامل) | [[87 ms]] |

نفس عدد العمليات بالظبط، والعمود أبطأ حوالي ٢٩ مرة: كل قراية بتجيب cache line جديدة وتستخدم منها 4 byte بس من 64. و [[using ms = std::chrono::milliseconds;]] اسم أقصر للنوع. والسطر الأخير [[1]] = المجموعين متساويين.

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| قيس بـ [[-O2]] | [[-O0]] بيضلل |
| الداتا جنب بعض (vector و array) | cache lines و prefetch |
| لف بنفس ترتيب التخزين | كل byte في الـ cache line يتستخدم |
| [[reserve]] و [[const &]] | مفيش حجز ولا نسخ زيادة |
| الـ algorithm الأول | [[O(n²)]] مفيش optimization ينقذها |`,
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
    }
]);
