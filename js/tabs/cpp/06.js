// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف نوع [[BankAccount]] فيه اسم صاحب الحساب ورصيده (مستخبيين)، ودالة سحب بتتأكد من المبلغ. والـ constructor والـ destructor بيطبعوا عشان تشوف إمتى الـ object بيتولد وبيموت. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
open Sara
balance=700 ok=0
open Omar
close Omar
end of main
close Sara
~~~

---

## ١. [[class BankAccount {]] و [[public:]]

- [[class]]: نوع جديد بيجمع داتا ودوال. الـ object = متغير من النوع ده.
- [[public:]]: كل اللي تحتها لحد الـ label الجاي متاح لأي حد من بره.

## ٢. الـ constructor والـ initializer list

~~~cpp
    BankAccount(const std::string &owner, double balance)
        : owner_(owner), balance_(balance) {
        std::cout << "open " << owner_ << '\n';
    }
~~~

- نفس اسم الـ class ومن غير نوع return: ده الـ constructor، بيتنادى لوحده لما object يتعمل.
- [[: owner_(owner), balance_(balance)]]: الـ member initializer list. النقطتين [[:]] بعد القوس، وبعدهم كل member وقيمته بين قوسين. الـ members بيتولدوا بالقيمة دي على طول، بدل ما يتولدوا فاضيين ويتغيّروا جوه [[{ }]].
- الـ members بيتعملوا بترتيب **تعريفهم** في الـ class. لو كتبنا الـ list بترتيب تاني ([[balance_]] الأول)، [[-Wall]] بينبّه:

~~~text الناتج
r.cpp:21:12: warning: 'BankAccount::balance_' will be initialized after [-Wreorder]
r.cpp:20:17: warning:   'std::string BankAccount::owner_' [-Wreorder]
~~~

## ٣. الـ destructor: [[~]]

~~~cpp
    ~BankAccount() { std::cout << "close " << owner_ << '\n'; }
~~~

[[~]] (tilde) + اسم الـ class. من غير parameters ومن غير return. بيتنادى لوحده لما الـ object يخرج من الـ scope بتاعه.

## ٤. [[withdraw]] و [[this]]

~~~cpp
    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance_) return false;
        this->balance_ -= amount;
        return true;
    }
~~~

- [[||]] = «أو»: لو المبلغ صفر أو سالب، **أو** أكبر من الرصيد، ارفض.
- [[this]]: pointer للـ object اللي الدالة اتنادت عليه. [[acc.withdraw(300)]] جواها [[this]] = [[&acc]]. ولأنه pointer بنستخدم [[->]]. [[this->balance_]] و [[balance_]] نفس الحاجة.

## ٥. [[double balance() const]]

الـ [[const]] بعد القوسين: «الدالة دي مش هتغيّر الـ object». الدرس الجاي كله عنها.

## ٦. [[private:]]

~~~cpp
private:
    std::string owner_;
    double balance_;
};
~~~

محدش من بره يقدر يلمسهم. جربنا [[acc.balance_ = 1e9;]] في main:

~~~text الناتج
p.cpp:32:9: error: 'double BankAccount::balance_' is private within this context
p.cpp:21:12: note: declared private here
p.cpp:32:9: note: field 'double BankAccount::balance_' can be accessed via 'double BankAccount::balance() const'
~~~

g++ حتى بيقترح الدالة اللي تقرا بيها. والـ [[_]] في آخر الأسماء عادة بس عشان تفرقها عن الـ parameters. والـ [[;]] بعد [[}]] لازمة.

---

## ٧. [[main]] سطر سطر

| السطر | اللي بيحصل | المطبوع |
|---|---|---|
| [[BankAccount acc("Sara", 1000);]] | الـ constructor | [[open Sara]] |
| [[acc.withdraw(300);]] | الرصيد 700 | |
| [[bool ok = acc.withdraw(5000);]] | أكبر من الرصيد: false | |
| [[std::cout << ... ok]] | bool بيتطبع 0 أو 1 | [[balance=700 ok=0]] |
| [[{ BankAccount temp("Omar", 50);]] | scope جديد | [[open Omar]] |
| [[}]] | temp خرج من الـ scope | [[close Omar]] |
| [[std::cout << "end of main\n";]] | | [[end of main]] |
| قفلة main | acc بيموت | [[close Sara]] |

ولاحظ إن ملناش [[BankAccount x;]] من غير قيم: أول ما كتبنا constructor بـ parameters، الـ constructor الفاضي اختفى:

~~~text الناتج
q.cpp:32:17: error: no matching function for call to 'BankAccount::BankAccount()'
~~~

---

## ٨. الـ solCode: [[Counter]]

~~~cpp
class Counter {
public:
    Counter() { ++count; }
    ~Counter() { --count; }
    static inline int count = 0;
};
~~~

- [[static]]: متغير **واحد** للـ class كله، مش واحد لكل object.
- [[inline]] (من C++17): يسمح تدّيله قيمة جوه الـ class على طول.
- [[Counter::count]]: بنوصله باسم الـ class.

~~~text الناتج
3
1
~~~

جوه الـ [[{ }]] فيه a و b و c = 3. بعد القفلة b و c ماتوا = 1.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| constructor | [[Name(params) : m1_(a), m2_(b) { }]] |
| destructor | [[~Name() { }]] |
| مين يوصل | [[public:]] و [[private:]] |
| الـ object نفسه | [[this->member]] |
| دالة بتقرا بس | [[T f() const]] |
| مشترك بين الكل | [[static inline int x = 0;]] |

- الـ object المحلي بيموت عند آخر الـ [[{ }]] بتاعته، والـ destructor بيتنادى لوحده.`,
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
          teach: R`## البرنامج بيعمل إيه؟

class [[Account]] فيه دوال بتقرا بس (const) ودالة بتغيّر، ودالة [[print]] بتاخد الحساب كـ [[const]] reference. وفي main أمثلة للـ [[const]] مع متغير ومع pointers. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
Sara: 200
3 bye Xbc
~~~

---

## ١. الـ class

~~~cpp
    explicit Account(const std::string &owner) : owner_(owner) {}
~~~

- [[explicit]]: الـ constructor ده بياخد parameter واحد، فمن غيرها C++ كانت هتسمح تحويل أوتوماتيك من string لـ Account (تبعت string لدالة عايزة Account وهي تعمل واحد لوحدها). مع [[explicit]] جربنا [[print(std::string("x"));]]:

~~~text الناتج
error: invalid initialization of reference of type 'const Account&' from expression of type 'std::string'
~~~

~~~cpp
    const std::string &owner() const { return owner_; }
~~~

فيها اتنين [[const]]، نقراها من الشمال:

| الحتة | معناها |
|---|---|
| [[const std::string &]] | بترجّع reference للاسم: من غير نسخ، واللي ياخده ميقدرش يغيّره |
| [[owner()]] | اسم الدالة |
| [[const]] بعد القوسين | الدالة نفسها مش هتغيّر أي member في الـ object |

~~~cpp
    int balance() const { return balance_; }
    void deposit(int amount) { balance_ += amount; }
~~~

[[balance]] بتقرا فـ const. [[deposit]] بتغيّر فمش const. و [[int balance_ = 0;]] تحت: قيمة افتراضية للـ member من غير constructor.

## ٢. [[print(const Account &a)]]

جوه [[print]]، [[a]] نوعه const، فمسموح تنادي عليه الدوال الـ const بس. جربنا ٢ من الـ try:

~~~text (1) a.deposit(10) جوه print
x.cpp:17:14: error: passing 'const Account' as 'this' argument discards qualifiers [-fpermissive]
x.cpp:9:10: note:   in call to 'void Account::deposit(int)'
~~~

~~~text (2) شلنا const من balance()
x.cpp:17:48: error: passing 'const Account' as 'this' argument discards qualifiers [-fpermissive]
x.cpp:8:9: note:   in call to 'int Account::balance()'
~~~

نفس الخطأ: [[this]] جوه أي دالة مش const نوعه [[Account *]]، و a نوعه const. فالنداء هيـ«شيل» الـ const (discards qualifiers)، وده ممنوع. الدرس: أي getter انساه من غير const، مش هتقدر تستخدمه من أي const reference.

---

## ٣. الـ pointers: اقرا من اليمين للشمال

~~~cpp
    const int max_retries = 3;
    const char *msg = "hello";
    char buf[] = "abc";
    char *const fixed = buf;
    fixed[0] = 'X';
    msg = "bye";
~~~

| التعريف | بالعربي (من اليمين) | الحروف تتغير؟ | الـ pointer يتغير؟ |
|---|---|---|---|
| [[const char *msg]] | msg pointer لـ char ثابت | لأ | آه |
| [[char *const fixed]] | fixed ثابت، pointer لـ char | آه | لأ |
| [[const char *const p]] | الاتنين ثابتين | لأ | لأ |

- [[fixed[0] = 'X']] مسموحة: buf بقت [[Xbc]].
- [[msg = "bye"]] مسموحة: msg بقى يشاور على نص تاني.

وباقي الـ try (كل واحدة لوحدها):

~~~text (3) max_retries = 4;
error: assignment of read-only variable 'max_retries'
~~~

~~~text (4) msg[0] = 'H';
error: assignment of read-only location '* msg'
~~~

~~~text (5) fixed = nullptr;
error: assignment of read-only variable 'fixed'
~~~

[[read-only location '* msg']] = المكان اللي msg بيشاور عليه (الحروف) ثابت. و [[read-only variable 'fixed']] = المتغير نفسه ثابت.

## ٤. آخر main

[[acc]] مش const، فـ [[deposit(200)]] مسموحة. و [[print(acc)]] بتبعته كـ const reference: object عادي يتبعت لـ const عادي، العكس هو الممنوع. والسطر الأخير: [[3 bye Xbc]].

---

## الخلاصة

| المكان | المعنى |
|---|---|
| [[const int x = 3;]] | متغير ميتغيرش |
| [[void f(const T &x)]] | من غير نسخ ومن غير تعديل |
| [[T get() const]] | الدالة مش هتغيّر الـ object، وتتنادى على const |
| [[const T &get() const]] | رجّع member من غير نسخ ومن غير تعديل |
| [[const char *]] / [[char *const]] | الحروف ثابتة / الـ pointer ثابت |

- [[discards qualifiers]] = بتنادي دالة مش const على حاجة const.`,
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
          teach: R`## البرنامج بيعمل إيه؟

class [[File]] بيفتح ملف في الـ constructor ويقفله في الـ destructor. ودالة [[save]] ليها ٣ مخارج، ومفيهاش ولا سطر بيقفل الملف، ومع ذلك الملف بيتقفل في كل مرة. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
file closed
file closed
done
~~~

---

## ١. الـ constructor: خد المورد

~~~cpp
    File(const char *path, const char *mode) : f_(std::fopen(path, mode)) {}
~~~

- [[<cstdio>]]: نسخة C++ من [[stdio.h]]، ودوالها جوه [[std::]] ([[std::fopen]] و [[std::fclose]] و [[std::fputs]]).
- [[f_(std::fopen(path, mode))]]: الملف بيتفتح وهو بيـ initialize الـ member. «الحصول على المورد = الإنشاء»، وده معنى الاسم RAII (Resource Acquisition Is Initialization).
- لو الفتح فشل، [[fopen]] بترجّع null، فـ [[f_]] بيبقى null.

## ٢. الـ destructor: رجّع المورد

~~~cpp
    ~File() {
        if (f_) {
            std::fclose(f_);
            std::cout << "file closed\n";
        }
    }
~~~

[[if (f_)]]: اقفل بس لو اتفتح. ده الحتة الوحيدة في البرنامج اللي فيها [[fclose]].

## ٣. [[= delete]]: ممنوع النسخ

~~~cpp
    File(const File &) = delete;
    File &operator=(const File &) = delete;
~~~

- الأول: الـ copy constructor ([[File b = a;]]).
- التاني: الـ copy assignment ([[b = a;]]). [[operator=]] هي دالة الـ [[=]] (operator overloading، ليها درس).
- [[= delete]]: «الدالة دي ممنوعة». لو اتنسخ، الاتنين هيقفلوا نفس الـ FILE مرتين. جربنا [[File g = f;]]:

~~~text الناتج
c.cpp:24:14: error: use of deleted function 'File::File(const File&)'
c.cpp:13:5: note: declared here
~~~

## ٤. باقي الـ class

~~~cpp
    bool ok() const { return f_ != nullptr; }
    void write(const char *text) { std::fputs(text, f_); }
private:
    std::FILE *f_;
~~~

[[nullptr]]: الـ null بتاعة C++، نوعها pointer مش رقم 0 (فمتتلخبطش مع overload بياخد int).

---

## ٥. [[save]]: ٣ مخارج

~~~cpp
bool save(const char *text) {
    File f("raii.txt", "w");
    if (!f.ok()) return false;
    if (text[0] == '\0') return false;
    f.write(text);
    return true;
}
~~~

| المخرج | إمتى | الملف |
|---|---|---|
| [[return false]] الأول | الفتح فشل | f_ null، مفيش حاجة تتقفل |
| [[return false]] التاني | النص فاضي ([[\0]] أول حرف) | بيتقفل لوحده |
| [[return true]] | كتب | بيتقفل لوحده |

الـ compiler بيحط نداء [[~File()]] قبل كل [[return]] بعد ما f اتعمل. وبرضه لو حصل exception (stack unwinding).

## ٦. [[main]]

- [[save("hello\n")]]: كتب وقفل = [[file closed]].
- [[save("")]]: رجع بدري = [[file closed]] برضه.
- لاحظ: بعد التشغيل [[raii.txt]] **فاضي** (جربناه بـ [[cat]]). ليه؟ النداء التاني فتحه بـ [["w"]]، و [["w"]] بتمسح محتوى الملف أول ما يتفتح، حتى لو مكتبتش حاجة بعدها.

---

## ٧. الـ solCode: [[Timer]]

~~~cpp
    explicit Timer(const char *name) : name_(name), start_(std::chrono::steady_clock::now()) {}
~~~

- [[<chrono>]]: مكتبة الوقت. [[steady_clock]] ساعة بتمشي لقدام بس (مش بتتأثر لو حد غيّر ساعة الجهاز)، فهي الصح للقياس.
- [[now()]] بترجّع [[time_point]]: لحظة.

~~~cpp
        auto end = std::chrono::steady_clock::now();
        auto us = std::chrono::duration_cast<std::chrono::microseconds>(end - start_).count();
~~~

من جوه لبرة: [[end - start_]] = مدة (duration)، و [[duration_cast<microseconds>]] = حوّلها microseconds، و [[.count()]] = الرقم نفسه. [[auto]] = الـ compiler يستنتج النوع.

~~~cpp
long long work() {
    Timer t("work");
    ...
    for (int i = 0; i < 10'000'000; ++i) sum += i % 7;
~~~

[[10'000'000]]: الـ [[']] فاصل أرقام للقراية بس (C++14). الـ Timer أول سطر، فبيموت آخر حاجة ويطبع الوقت كله. شغّلناه:

| الـ flags | الناتج |
|---|---|
| [[-O0]] (من غير optimization) | [[work took 11206 us]] |
| [[-O2]] | [[work took 5166 us]] ومرة تانية [[5349]] |

و [[29999994]] المجموع. الرقم بيتغير من تشغيل لتاني ومن جهاز لتاني، الفكرة إن القياس حصل من غير ولا سطر «وقّف الساعة».

---

## الخلاصة

| الفكرة | فين |
|---|---|
| خد المورد | الـ constructor |
| رجّعه | الـ destructor |
| ميتنسخش | [[= delete]] للـ copy |
| الـ object | متغير محلي، مش [[new]] |

- كل مخرج من الـ scope (return أو exception أو آخر [[}]]) بينادي الـ destructor لوحده.
- المكتبة القياسية كلها كده: [[std::string]] و [[std::vector]] و [[std::ofstream]] و [[std::lock_guard]] و [[std::unique_ptr]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

class [[Buffer]] بيحجز array على الـ heap بنفسه، فلازم يكتب الـ ٣ دوال (destructor و copy constructor و copy assignment) عشان النسخ يبقى صح. وجنبه [[Better]] اللي جواه vector ومكتبش ولا واحدة منهم، وبيتنسخ صح برضه. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra -g -fsanitize=address]] (ASan ساكت = مفيش أخطاء ذاكرة):

~~~text الناتج
7 99
99
1 100
~~~

---

## ١. الـ constructor والـ destructor

~~~cpp
    explicit Buffer(std::size_t n) : size_(n), data_(new int[n]()) {}
    ~Buffer() { delete[] data_; }
~~~

- [[std::size_t]] (من [[<cstddef>]]): نوع الأحجام، رقم موجب.
- [[new int[n]()]]: احجز n من الـ int على الـ heap. الـ [[()]] في الآخر بتصفّرهم، من غيرها القيم زبالة.
- [[delete[] data_]]: حرر الـ array. مع [[new[]]] لازم [[delete[]]] بالأقواس، ومع [[new T]] لـ object واحد [[delete p]].

## ٢. الـ copy constructor: نسخة جديدة

~~~cpp
    Buffer(const Buffer &other) : size_(other.size_), data_(new int[other.size_]) {
        std::copy(other.data_, other.data_ + size_, data_);
    }
~~~

- بيتنادى في [[Buffer b = a;]]: b لسه بيتولد.
- [[other.size_]]: مسموح توصل للـ private بتاع object تاني من نفس الـ class.
- [[new int[other.size_]]]: ذاكرة **جديدة** لـ b.
- [[std::copy(from, to, dest)]] (من [[<algorithm>]]): انسخ من [[other.data_]] لحد [[other.data_ + size_]] (العنوان اللي بعد آخر عنصر) جوه [[data_]].

## ٣. الـ copy assignment: object موجود يبقى نسخة

~~~cpp
    Buffer &operator=(const Buffer &other) {
        if (this == &other) return *this;
        int *fresh = new int[other.size_];
        std::copy(other.data_, other.data_ + other.size_, fresh);
        delete[] data_;
        data_ = fresh;
        size_ = other.size_;
        return *this;
    }
~~~

بيتنادى في [[a = b;]]: a عنده ذاكرة قديمة لازم تتحرر.

| السطر | ليه |
|---|---|
| [[if (this == &other)]] | [[a = a]]: لو مسحنا الأول، هننسخ من ذاكرة اتمسحت |
| [[new]] ثم [[copy]] الأول | لو [[new]] فشل (exception)، a لسه سليم |
| [[delete[] data_]] | حرر القديم بعد ما الجديد جاهز |
| [[return *this]] | [[*this]] = الـ object نفسه، عشان [[a = b = c]] تشتغل |

## ٤. [[int &at(...)]]

بترجّع reference للعنصر، فتقدر تكتب عليه: [[a.at(0) = 7]].

---

## ٥. [[main]]

| السطر | بينادي | النتيجة |
|---|---|---|
| [[Buffer a(3);]] | constructor | 0 0 0 |
| [[a.at(0) = 7;]] | | a[0]=7 |
| [[Buffer b = a;]] | copy constructor | b ذاكرة لوحده |
| [[b.at(0) = 99;]] | | a لسه 7 = [[7 99]] |
| [[a = b;]] | copy assignment | [[99]] |
| [[Better y = x;]] | copy constructor اللي الـ compiler عمله | بينسخ الـ vector صح |
| [[y.data[0] = 100;]] | | [[1 100]] |

[[Better x{{1, 2, 3}};]]: الأقواس الخارجية للـ struct، والداخلية للـ vector جواه.

---

## ٦. الـ try: امسح دوال النسخ

مسحنا الـ copy constructor والـ copy assignment، فالـ compiler عمل نسخ افتراضي بينسخ **الـ pointer** بس. شغلناه في ترمنال:

~~~text الناتج
99 99
99
1 100
~~~

[[99 99]]: a و b بيشاوروا على نفس الذاكرة، فتغيير b غيّر a. وفي آخر main:

~~~text ASan
==14==ERROR: AddressSanitizer: attempting double-free on 0x502000000010 in thread T0:
    #0 0x7f30d6c49128 in operator delete[](void*) (/usr/local/lib64/libasan.so.8+0xf6128)
    #1 0x401ad1 in Buffer::~Buffer() /tmp/n.cpp:9
    #2 0x401831 in main /tmp/n.cpp:33
...
freed by thread T0 here:
    #1 0x401ad1 in Buffer::~Buffer() /tmp/n.cpp:9
...
previously allocated by thread T0 here:
    #1 0x4019d5 in Buffer::Buffer(unsigned long) /tmp/n.cpp:8
SUMMARY: AddressSanitizer: double-free
~~~

نقرا التقرير: الـ destructor (سطر 9) عمل [[delete[]]] على عنوان اتحرر قبل كده من نفس الـ destructor (للـ object التاني)، والعنوان اتحجز في الـ constructor (سطر 8). يعني double free. ولما الناتج بيروح لـ pipe بدل ترمنال، ASan بيوقف البرنامج قبل ما الـ cout buffer يتفضى، فالسطور ممكن متظهرش.

## ٧. الـ try: rule of 0

~~~cpp
class Buffer {
public:
    explicit Buffer(std::size_t n) : data_(n) {}
    int &at(std::size_t i) { return data_[i]; }
private:
    std::vector<int> data_;
};
~~~

[[data_(n)]]: vector فيه n صفر. مفيش destructor ولا copy: الـ vector بيعرف ينسخ ويحرر نفسه، فالنسخ الافتراضي بقى صح. جربناه بنفس main وبـ ASan:

~~~text الناتج
7 99
99
~~~

---

## الخلاصة

| القاعدة | معناها |
|---|---|
| rule of 3 | كتبت destructor أو copy constructor أو copy assignment؟ اكتب التلاتة |
| rule of 5 | + move constructor و move assignment (C++11) |
| rule of 0 | خلي الـ members vector و string و unique_ptr، ومتكتبش ولا واحدة |

- النسخ الافتراضي بينسخ الـ pointer مش اللي بيشاور عليه، وده double free.`,
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
(الـ ASan بيوقف البرنامج، فالناتج اللي في الـ pipe ممكن يضيع؛ في الترمنال بيطلع [[99 99]] و [[99]] و [[1 100]] قبل التقرير.) ولو a و b كانوا بيشاوروا على ذاكرتين مختلفتين، [[a = b]] من غير copy assignment كانت هتضيّع ذاكرة a القديمة (leak). هنا هما أصلًا نفس الذاكرة.

نسخة الـ rule of 0: [[std::vector<int> data_;]] و [[explicit Buffer(std::size_t n) : data_(n) {}]] و [[int &at(std::size_t i) { return data_[i]; }]] وبس. نفس الناتج، والـ class بقى ٨ سطور بدل ٢١.`
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
          teach: R`## البرنامج بيعمل إيه؟

نوع [[Vec2]] (نقطة أو متجه فيه x و y)، وبنعرّفله [[+]] و [[*]] و [[+=]] و [[==]] و [[<<]]، فنكتب [[a + b * 2]] و [[std::cout << c]] زي الأرقام بالظبط. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
(7, 10) (4, 6)
true true
~~~

---

## ١. الفكرة: العملية = دالة

لما تكتب [[a + b]] و a و b من نوعك، الـ compiler بيحوّلها لـ [[a.operator+(b)]]. يعني [[operator+]] مجرد اسم دالة.

## ٢. [[operator+]] و [[operator*]]

~~~cpp
struct Vec2 {
    double x = 0, y = 0;
    Vec2 operator+(const Vec2 &o) const { return {x + o.x, y + o.y}; }
    Vec2 operator*(double k) const { return {x * k, y * k}; }
~~~

- [[struct]]: زي class بس كله public.
- [[double x = 0, y = 0;]]: قيم افتراضية.
- [[Vec2 operator+(const Vec2 &o) const]]:
  - [[Vec2]] الأولى: بترجّع نقطة **جديدة** (by value).
  - الطرف الشمال من [[+]] هو this (اللي [[x]] و [[y]] بتوعه)، والطرف اليمين هو [[o]].
  - [[const]] في الآخر: الجمع مش بيغيّر a.
- [[return {x + o.x, y + o.y};]]: الـ compiler عارف إن الـ return نوعه Vec2، فالـ [[{ }]] بتعمل Vec2 من القيمتين.

## ٣. [[operator+=]]

~~~cpp
    Vec2 &operator+=(const Vec2 &o) {
        x += o.x;
        y += o.y;
        return *this;
    }
~~~

عكس [[+]]: بيغيّر this (فمش const)، ويرجّع [[*this]] كـ reference ([[Vec2 &]]) زي ما [[+=]] بتاعة الأرقام بترجّع المتغير نفسه.

## ٤. [[operator==]] بـ [[= default]]

~~~cpp
    bool operator==(const Vec2 &o) const = default;
~~~

C++20: «قارن كل الـ members بالترتيب». ومن C++20 لما يبقى فيه [[==]]، [[a != b]] بتتحول لوحدها لـ [[!(a == b)]]. جربناه بـ [[-std=c++17]]:

~~~text الناتج
error: defaulted 'bool Vec2::operator==(const Vec2&) const' only available with '-std=c++20' or '-std=gnu++20'
error: no match for 'operator!=' (operand types are 'Vec2' and 'Vec2')
~~~

## ٥. [[operator<<]] بره الـ struct

~~~cpp
std::ostream &operator<<(std::ostream &os, const Vec2 &v) {
    return os << '(' << v.x << ", " << v.y << ')';
}
~~~

- في [[std::cout << c]] الطرف الشمال هو [[std::cout]] (نوعه [[std::ostream]])، مش Vec2. والـ member function شمالها دايمًا this، فلازم دالة عادية بـ parameterين.
- [[std::ostream &os]]: reference للـ stream (الـ stream مبيتنسخش).
- بترجّع [[os]] نفسه، عشان [[std::cout << c << ' ' << a]] تكمّل.

---

## ٦. [[main]]

~~~cpp
    Vec2 a{1, 2}, b{3, 4};
    Vec2 c = a + b * 2;
~~~

الأولويات زي الأرقام: [[*]] الأول. [[b * 2]] = (6, 8)، وبعدين [[a + (6, 8)]] = **(7, 10)**.

~~~cpp
    a += b;
    std::cout << c << ' ' << a << '\n';
~~~

a = (1+3, 2+4) = **(4, 6)**. السطر: [[(7, 10) (4, 6)]].

~~~cpp
    std::cout << std::boolalpha << (a == Vec2{4, 6}) << ' ' << (a != b) << '\n';
~~~

- [[std::boolalpha]]: اطبع [[true]]/[[false]] بدل 1/0.
- الأقواس حوالين [[a == Vec2{4, 6}]] لازمة، لأن [[<<]] أولويتها أعلى من [[==]].
- النتيجة [[true true]].

---

## ٧. الـ try و الـ solCode

جربنا [[2 * b]] مع النسخة اللي جوه الـ struct بس:

~~~text الناتج
a.cpp:22:16: error: no match for 'operator*' (operand types are 'int' and 'Vec2')
~~~

الشمال int، ومفيش دالة [[operator*(int/double, Vec2)]]. الحل دالة بره:

~~~cpp
Vec2 operator*(double k, const Vec2 &v) { return v * k; }
~~~

بتقلب الترتيب وتنادي النسخة اللي موجودة. و [[Money]]:

~~~cpp
std::ostream &operator<<(std::ostream &os, const Money &m) {
    long long abs_cents = m.cents < 0 ? -m.cents : m.cents;
    if (m.cents < 0) os << '-';
    os << abs_cents / 100 << '.' << (abs_cents % 100 < 10 ? "0" : "") << abs_cents % 100;
    return os << " EGP";
}
~~~

- الفلوس قروش في [[long long]] (رقم صحيح)، عشان [[double]] مبيعرفش يخزن 0.1 بالظبط.
- [[? :]]: «لو كذا يبقى ده، وإلا ده». أول سطر بيجيب القيمة المطلقة.
- [[/ 100]] = الجنيهات، و [[% 100]] = القروش (باقي القسمة).
- [[(... < 10 ? "0" : "")]]: لو القروش رقم واحد (5)، حط صفر قبلها عشان تبقى [[.05]] مش [[.5]].

~~~text الناتج
5 7
12.50 EGP
~~~

[[2 * b - Vec2{1, 1}]] = (6, 8) - (1, 1) = (5, 7). و 1000 + 250 = 1250 قرش = 12.50.

---

## الخلاصة

| العملية | الشكل | ترجّع |
|---|---|---|
| [[+]] و [[-]] و [[*]] | member، [[const]] | object جديد |
| [[+=]] | member، مش const | [[*this]] كـ [[T &]] |
| [[==]] (C++20) | [[= default]] | [[bool]]، و [[!=]] ببلاش |
| [[<<]] | دالة بره | [[std::ostream &]] |
| الشمال مش من نوعك | دالة بره | |`,
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
          teach: R`## البرنامج بيعمل إيه؟

أب اسمه [[Shape]] وابنين [[Circle]] و [[Rect]]، وكل ابن بيحسب مساحته بطريقته. ودالة [[report]] بتاخد أي Shape وتطبع مساحته الصح، ووقت التشغيل بتعرف هو دايرة ولا مستطيل. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
circle area=3.14159
rect area=6
total=9.14159
~~~

---

## ١. الأب [[Shape]]

~~~cpp
class Shape {
public:
    explicit Shape(const std::string &name) : name_(name) {}
    virtual ~Shape() = default;
    virtual double area() const { return 0; }
    const std::string &name() const { return name_; }
private:
    std::string name_;
};
~~~

- [[virtual double area() const]]: [[virtual]] معناها «لما حد ينادي area على Shape، شوف النوع **الحقيقي** للـ object وقت التشغيل ونادي نسخته». النسخة دي بترجّع 0 كقيمة افتراضية.
- [[virtual ~Shape() = default;]]: destructor virtual، و [[= default]] = «الـ compiler يكتبه بالشكل العادي». لازم في أي أب فيه virtual، عشان لو اتمسح ابن عن طريق [[Shape *]] يتنادى destructor الابن.
- [[name_]] private: حتى الأبناء ميوصلولوش مباشرة، بيستخدموا [[name()]].

## ٢. الابن [[Circle]]

~~~cpp
class Circle : public Shape {
public:
    explicit Circle(double r) : Shape("circle"), r_(r) {}
    double area() const override { return 3.14159 * r_ * r_; }
private:
    double r_;
};
~~~

- [[: public Shape]]: Circle بيورث من Shape، و [[public]] = اللي public في الأب يفضل public.
- [[: Shape("circle"), r_(r)]]: أول حاجة في الـ initializer list constructor الأب (الأب بيتبني الأول)، وبعدين الـ members بتاعة الابن.
- [[override]]: «أنا بغطي دالة virtual في الأب». مش ضرورية عشان الكود يشتغل، بس بتخلي الـ compiler يتأكد.
- πr² = 3.14159 × 1 × 1.

[[Rect]] نفس الشكل، بـ parameterين: 2 × 3 = 6.

## ٣. [[report]]

~~~cpp
void report(const Shape &s) {
    std::cout << s.name() << " area=" << s.area() << '\n';
}
~~~

- [[const Shape &s]]: reference لأي Shape، Circle أو Rect. مسموح لأن Circle «نوع من» Shape.
- [[s.area()]]: virtual، فبتتنادى نسخة النوع الحقيقي.

## ٤. [[main]]

~~~cpp
    std::vector<const Shape *> all = {&c, &r};
    double total = 0;
    for (const Shape *s : all) total += s->area();
~~~

- [[std::vector<const Shape *>]]: vector من pointers لـ Shape (const = مش هنغيّرهم). و [[&c]] و [[&r]] عناوينهم.
- [[s->area()]]: [[->]] لأن s pointer، والنداء virtual برضه. 3.14159 + 6 = **9.14159**.

---

## ٥. التجارب

### شلنا [[virtual]] (و [[override]])

~~~text الناتج
circle area=0
rect area=0
total=0
~~~

من غير virtual الـ compiler بيختار وقت الـ compile من نوع الـ reference (Shape)، فنسخة Shape اللي بترجّع 0. ومفيش ولا warning.

### [[area() override]] من غير [[const]] في Rect

~~~text الناتج
b.cpp:28:12: error: 'double Rect::area()' marked 'override', but does not override
~~~

[[area() const]] و [[area()]] دالتين مختلفتين. من غير [[override]] كان هيتعمل compile، و Rect هتطلع area=0 بهدوء. ده فايدة [[override]].

### slicing: لو [[report]] أخدت [[Shape s]] بالقيمة

جربنا [[void report(Shape s)]] بدل [[const Shape &s]]:

~~~text الناتج
circle area=0
rect area=0
total=9.14159
~~~

النسخ بالقيمة بيعمل Shape جديد وبيرمي جزء الابن (اتقص: sliced)، فـ area بقت بتاعة Shape. والـ total لسه صح لأنه بالـ pointers. فالـ polymorphism محتاج reference أو pointer.

### [[Square]] بيورث من [[Rect]]

~~~cpp
class Square : public Rect { public: explicit Square(double s) : Rect(s, s) {} };
~~~

[[Square q(2); report(q);]] طبعت [[rect area=4]]: المساحة صح (ورث area من Rect)، بس الاسم rect لأن Rect بيبعت [["rect"]] لـ Shape.

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[class B : public A]] | B بيورث من A |
| [[B(...) : A(...), m_(...)]] | ابني الأب الأول |
| [[virtual]] في الأب | النسخة بتتحدد وقت التشغيل |
| [[override]] في الابن | الـ compiler يتأكد إنك بتغطي فعلًا |
| [[virtual ~A() = default;]] | لازم في أي أب فيه virtual |
| [[const A &]] أو [[A *]] | لازمين للـ polymorphism، بالقيمة = slicing |`,
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
          teach: R`## البرنامج بيعمل إيه؟

[[Notifier]] interface: بيقول «أي notifier لازم يعرف يعمل send» من غير ما ينفّذها. ونوعين بينفّذوها (Email و SMS)، ودالة [[notify_all]] بتبعت لأي notifiers من غير ما تعرف نوعهم. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
[email to sara] your order shipped
[sms to sara] your order shipped
~~~

---

## ١. الـ interface

~~~cpp
class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void send(const std::string &to, const std::string &msg) = 0;
};
~~~

- [[virtual ~Notifier() = default;]]: destructor virtual زي أي أب فيه virtual.
- [[= 0]] في آخر الدالة: **pure virtual**. «مفيش تنفيذ هنا، والأبناء لازم ينفذوها». مفيش [[{ }]] خالص.
- class فيه pure virtual واحدة = **abstract**: مينفعش تعمل منه object. جربنا [[Notifier n;]] في main:

~~~text الناتج
a.cpp:32:14: error: cannot declare variable 'n' to be of abstract type 'Notifier'
a.cpp:5:7: note:   because the following virtual functions are pure within 'Notifier':
a.cpp:8:18: note:     'virtual void Notifier::send(const std::string&, const std::string&)'
~~~

الـ note بتقولك بالظبط أنهي دوال لسه من غير تنفيذ. ونفس الخطأ بيطلع لابن نسي ينفّذ send: جربنا [[class Half : public Notifier { };]] و [[Half h;]] = [[cannot declare variable 'h' to be of abstract type 'Half']].

## ٢. التنفيذين

~~~cpp
class EmailNotifier : public Notifier {
public:
    void send(const std::string &to, const std::string &msg) override {
        std::cout << "[email to " << to << "] " << msg << '\n';
    }
};
~~~

نفس الـ signature بالظبط + [[override]]. و [[SmsNotifier]] نفس الشكل بنص مختلف.

## ٣. [[notify_all]]

~~~cpp
void notify_all(const std::vector<Notifier *> &channels, const std::string &msg) {
    for (Notifier *n : channels) n->send("sara", msg);
}
~~~

- [[std::vector<Notifier *>]]: pointers للـ interface. الدالة مش عارفة فيه Email ولا SMS.
- [[const ... &]]: الـ vector نفسه مبيتنسخش ومبيتغيّرش (الـ notifiers اللي جواه ممكن يتغيّروا، الـ const على الـ vector بس).
- [[n->send(...)]]: virtual، فبتتنادى نسخة النوع الحقيقي.

## ٤. [[main]]

~~~cpp
    EmailNotifier email;
    SmsNotifier sms;
    notify_all({&email, &sms}, "your order shipped");
~~~

[[{&email, &sms}]]: قايمة عنوانين. الدالة مستنية [[std::vector<Notifier *>]]، فالـ compiler بيعمل vector مؤقت منها، و [[EmailNotifier *]] بيتحول لـ [[Notifier *]] لوحده لأنه ابنه.

---

## ٥. الـ solCode: [[FakeNotifier]]

~~~cpp
class FakeNotifier : public Notifier {
public:
    std::vector<std::string> sent;
    void send(const std::string &to, const std::string &msg) override {
        sent.push_back(to + ": " + msg);
    }
};
~~~

بدل ما يبعت، بيحفظ في [[sent]]. [[push_back]] = ضيف في الآخر. و [[notify_all]] نفسها متغيرتش ولا حرف:

~~~cpp
    FakeNotifier fake;
    notify_all({&fake}, "hello");
    std::cout << fake.sent.size() << ' ' << fake.sent[0] << '\n';
~~~

~~~text الناتج
1 sara: hello
~~~

ده اللي بيتعمل في الـ unit tests: الـ test بيتأكد إن الرسالة اتبعتت من غير ما يبعت SMS بجد.

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[virtual f() = 0;]] | pure virtual: من غير تنفيذ |
| abstract class | فيه pure virtual، مينفعش object منه |
| interface | كل دواله pure virtual ومفيش داتا |
| ابن مش منفّذ كله | abstract هو كمان |

- الكود اللي بيستخدم الـ interface ([[notify_all]]) مبيتغيرش لما تضيف نوع جديد.`,
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
