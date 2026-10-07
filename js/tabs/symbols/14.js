// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "رموز C و C++",
      l: 3,
      n: "* و & للمؤشرات والـ references، و -> و :: و <<، و #include و ~ و <T>: رموز بتخوّف المبتدئ وهي بسيطة لو اتشرحت",
      items: [
        {
          cmd: "int *p  و  *p",
          title: "النجمة * في C و C++: في التعريف يعني «مؤشر» (pointer)، وقبل متغير موجود يعني «روح للعنوان وهات القيمة»",
          desc: R`المؤشر (pointer) متغير بيشيل عنوان مكان في الذاكرة بدل قيمة. [[int *p]] معناها p مؤشر لـ int. ولما تكتب [[*p]] بعد كده (من غير نوع قبلها) معناها «القيمة اللي في العنوان ده» (dereference). وتقدر تغيّرها: [[*p = 10]] بتغيّر المتغير الأصلي.

يعني نفس النجمة ليها معنيين حسب المكان: مع نوع في التعريف = نوع مؤشر، ومن غير نوع = ادخل للقيمة. ومعنى تالت بين رقمين = ضرب.

المؤشر الفاضي في C++ [[nullptr]] وفي C [[NULL]]، ولو عملت [[*p]] على مؤشر فاضي البرنامج بيقع بـ [[Segmentation fault]].`,
          example: R`#include <stdio.h>
int main(void) {
    int x = 5;
    int *p = &x;
    *p = 10;
    printf("%d %d\n", x, *p);
    return 0;
}`,
          flag: "script",
          try: R`على [[onlinegdb.com]] أو [[godbolt.org]] (أو بـ [[gcc a.c && ./a.out]] لو عندك gcc) شغّل المثال. بعدين ضيف سطر [[printf("%p\n", (void *)p);]] عشان تشوف العنوان نفسه.`,
          deep: {
            why: R`C و C++ بيتعاملوا مع الذاكرة مباشرة، والمؤشرات هي الطريقة اللي دالة تعدّل بيها متغير من برة، وتتعامل مع arrays ونصوص و memory بتتحجز وقت التشغيل.`,
            how: R`كل متغير له مكان في الذاكرة ليه عنوان (رقم). [[&x]] بتجيب العنوان، والمؤشر بيشيله، و [[*p]] بتقرا أو تكتب في المكان ده. ونوع المؤشر ([[int *]]) بيقول للـ compiler كام byte يقرا من هناك.`,
            when: R`في C: تمرير متغيرات لدوال عشان تتعدل، والـ arrays والنصوص، و [[malloc]]. في C++ الحديث استخدم references و [[std::unique_ptr]] بدل المؤشرات الخام أغلب الوقت.`,
            mistakes: R`[[int* a, b;]] بتعمل a مؤشر و b int عادي (النجمة لازقة في الاسم مش النوع). ومؤشر من غير قيمة أولية بيشاور على عنوان عشوائي. وترجّع عنوان متغير محلي من دالة فيبقى مؤشر لحاجة ماتت.`
          },
          teach: R`## الفكرة: متغير شايل عنوان، والنجمة بتفتح العنوان

كل متغير في البرنامج قاعد في مكان في الذاكرة، والمكان ده ليه رقم اسمه العنوان (address). المؤشر (pointer) متغير قيمته عنوان. المثال اتعمله compile بـ gcc 14.4 واتشغّل جوه Docker (صورة [[gcc:14]] على لينكس).

---

## ١. سطر بسطر

~~~c
#include <stdio.h>
int main(void) {
~~~

- [[#include <stdio.h>]]: هات تعريفات مكتبة الدخل والخرج (std = standard، و io = input/output)، ومنها [[printf]].
- [[int main(void)]]: الدالة اللي البرنامج بيبدأ منها. [[int]] يعني بترجّع رقم لنظام التشغيل، و [[void]] جوه الأقواس يعني مبتاخدش arguments.

~~~c
    int x = 5;
~~~

متغير عادي نوعه [[int]] قيمته 5، قاعد في عنوان ما في الذاكرة.

~~~c
    int *p = &x;
~~~

هنا النجمة جت **مع نوع** في تعريف:

| الحتة | معناها |
|---|---|
| [[int *]] | نوع: «مؤشر لـ int» |
| [[p]] | اسم المؤشر |
| [[&x]] | عنوان x (درس [[&]] الجاي) |

فـ p دلوقتي شايلة عنوان x مش الرقم 5. عشان نشوف ده ضفنا سطر [[printf("&x=%p p=%p\n", (void *)&x, (void *)p);]]:

~~~text الناتج
&x=0x7ffd3d0f27ac p=0x7ffd3d0f27ac
~~~

الرقمين نفس العنوان. [[%p]] بتطبع عنوان بالـ hex ([[0x]] في الأول)، والرقم بيتغير كل تشغيلة لأن نظام التشغيل بيحط البرنامج في مكان مختلف كل مرة (ASLR).

~~~c
    *p = 10;
~~~

هنا النجمة **من غير نوع** قبلها، فمعناها dereference: «روح للعنوان اللي في p، واكتب هناك 10». والعنوان ده هو x، فـ x نفسها بقت 10.

~~~c
    printf("%d %d\n", x, *p);
    return 0;
}
~~~

- [[printf]] بتطبع النص وبتبدّل كل [[%d]] (decimal، رقم صحيح) بالقيمة اللي عليها الدور، و [[\n]] سطر جديد.
- [[*p]] هنا قراية: «هات القيمة اللي في العنوان».
- [[return 0]]: صفر لنظام التشغيل يعني «خلصت بنجاح».

~~~text الناتج
10 10
~~~

x اتغيرت من غير ما نكتب اسمها، من خلال p.

---

## ٢. النجمة ليها ٣ معاني

| الكود | المعنى |
|---|---|
| [[int *p]] | تعريف: p مؤشر لـ int |
| [[*p = 10]] أو [[*p]] | dereference: القيمة اللي في العنوان |
| [[3 * 4]] | ضرب (طبعت [[12]]) |

### فخ: النجمة لازقة في الاسم

~~~c
int* a, b;
printf("sizeof a=%zu sizeof b=%zu\n", sizeof a, sizeof b);
~~~

~~~text الناتج
sizeof a=8 sizeof b=4
~~~

[[sizeof]] بيقول المتغير حجمه كام byte. a مؤشر (٨ bytes على نظام 64-bit) و b طلع int عادي (٤ bytes)، رغم إن [[int*]] مكتوبة لازقة في النوع. عشان كده الأوضح تكتب [[int *a]].

---

## ٣. المؤشر الفاضي

~~~c
int *q = NULL;
return *q;
~~~

~~~text الناتج
Segmentation fault (core dumped)
~~~

[[NULL]] معناه «مش بيشاور على حاجة». ولما حاولنا نقرا منه، نظام التشغيل قفل البرنامج، و exit code بقى [[139]] (128 + رقم الإشارة SIGSEGV اللي هو 11). وفي C++ المؤشر الفاضي اسمه [[nullptr]].

---

## الخلاصة

| | معناه |
|---|---|
| [[x]] | القيمة (5) |
| [[&x]] | عنوان x |
| [[int *p = &x]] | p شايلة عنوان x |
| [[p]] | العنوان |
| [[*p]] | القيمة اللي في العنوان، قراية أو كتابة |`,
          lines: [
            R`مكتبة الطباعة [[printf]].`,
            R`الدالة الرئيسية.`,
            R`متغير عادي قيمته 5.`,
            R`[[int *]] نوع «مؤشر لـ int»، وبيشيل عنوان x اللي [[&]] جابته.`,
            R`[[*p]] من غير نوع: روح للعنوان واكتب 10، فـ x نفسها بقت 10.`,
            R`اطبع: [[10 10]].`,
            R`0 يعني البرنامج خلص بنجاح.`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[10 10]]. وسطر [[%p]] بيطبع عنوان زي [[0x7ffd5e8c3a4c]] (بيتغير كل مرة).`
        },
        {
          cmd: "&x  و  int &r",
          title: "علامة & في C و C++: قبل متغير تجيب عنوانه، وفي تعريف C++ بعد النوع يعني reference (اسم تاني لنفس المتغير)",
          desc: R`[[&x]] (address-of) بترجّع عنوان x في الذاكرة، ودي اللي بتحطها في مؤشر: [[int *p = &x]]. وفي C بتشوفها في [[scanf("%d", &age)]] عشان scanf تكتب في age.

في C++ بس، [[int &r = x]] (مع النوع في التعريف) معناها r مش متغير جديد، دي اسم تاني (reference) لـ x نفسها. أي تغيير في r بيغيّر x. وأشهر استخدام: parameters الدوال [[void inc(int &n)]] عشان الدالة تعدّل المتغير الأصلي، و [[const std::string &s]] عشان متتعملش نسخة.

ومعاني تانية لنفس الرمز: [[a & b]] bitwise AND، و [[&&]] منطق. وفي C++ الحديث [[T&&]] بعد نوع اسمها rvalue reference، ودي موضوع متقدم (move semantics).`,
          example: R`#include <iostream>
void inc(int &n) { n++; }
int main() {
    int x = 5;
    int &r = x;
    r = 7;
    inc(x);
    std::cout << x << " " << &x << "\n";
}`,
          flag: "script",
          try: R`شغّل المثال على [[godbolt.org]] أو [[onlinegdb.com]] (اختار C++). بعدين شيل [[&]] من [[int &n]] في inc وشغّل تاني وقارن الرقم.`,
          deep: {
            why: R`من غير [[&]] الدوال في C و C++ بتاخد نسخة، فأي تعديل جوه الدالة بيضيع. والنسخ لـ objects كبيرة (vector فيه مليون عنصر) بطيء جدًا.`,
            how: R`الـ reference لازم تتربط بمتغير وقت تعريفها ومش بتتغير بعد كده، ومفيش reference فاضية. الـ compiler غالبًا بيطبقها كمؤشر من جوه، بس انت بتستخدمها كأنها المتغير نفسه من غير [[*]].`,
            when: R`[[const T&]] لأي parameter كبير مش هتعدّله. [[T&]] لما الدالة لازم تعدّل. و [[&x]] لما محتاج مؤشر صراحة (APIs بتاعة C).`,
            mistakes: R`تخلط بين [[&]] في التعريف (reference) و [[&]] في الاستخدام (عنوان). وترجّع reference لمتغير محلي من دالة. وتنسى [[&]] في [[scanf]] فالبرنامج يقع.`
          },
          teach: R`## الفكرة: [[&]] قبل متغير = عنوانه، و [[&]] بعد نوع = اسم تاني

نفس الرمز ليه معنيين حسب مكانه. المثال C++، اتعمله compile بـ g++ 14.4 واتشغّل جوه Docker (صورة [[gcc:14]] على لينكس).

---

## ١. سطر بسطر

~~~cpp
#include <iostream>
~~~

مكتبة الدخل والخرج في C++ (i = input، o = output، stream = سيل بيانات)، ومنها [[std::cout]].

~~~cpp
void inc(int &n) { n++; }
~~~

- [[void]]: الدالة مبترجّعش قيمة.
- [[int &n]]: الـ [[&]] **بعد النوع في تعريف**: n مش نسخة، n reference، يعني اسم تاني للمتغير اللي اتبعت.
- [[n++]]: زوّد n واحد، ولأن n هي المتغير الأصلي، الأصلي هو اللي بيزيد.

~~~cpp
int main() {
    int x = 5;
    int &r = x;
    r = 7;
~~~

- [[int &r = x]]: r اسم تاني لـ x نفسها. مفيش متغير جديد ولا نسخة.
- [[r = 7]]: بنكتب في r، يعني بنكتب في x. x بقت 7.

~~~cpp
    inc(x);
~~~

inc استلمت x نفسها (عن طريق n)، وزودتها: x بقت 8.

~~~cpp
    std::cout << x << " " << &x << "\n";
}
~~~

- [[std::cout <<]]: ابعت للشاشة (درس [[cout <<]]).
- [[&x]] هنا **قبل متغير في استخدام**: عنوان x في الذاكرة.

~~~text الناتج
8 0x7ffef2b7d574
~~~

[[8]] = 5 → 7 من r → 8 من inc. والعنوان بالـ hex وبيتغير كل تشغيلة.

---

## ٢. r فعلًا هي x؟

ضفنا سطر [[std::cout << x << " " << r << " " << (&r == &x) << "\n";]] بعد [[r = 7]]:

~~~text الناتج
7 7 1
~~~

عنوان r هو هو عنوان x ([[1]] يعني true). مفيش غير متغير واحد بأسمين.

---

## ٣. من غير [[&]] في inc

غيرنا [[void inc(int &n)]] لـ [[void inc(int n)]]:

~~~text الناتج
7 0x7ffd029d36d4
~~~

n بقت **نسخة** من x، فالزيادة حصلت في النسخة وضاعت لما الدالة خلصت، و x فضلت 7.

---

## ٤. كل معاني [[&]]

| الكود | فين | معناه |
|---|---|---|
| [[&x]] | قبل متغير | عنوانه (C و C++) |
| [[int &r = x]] | بعد نوع في تعريف | reference، اسم تاني (C++ بس) |
| [[const std::string &s]] | parameter | reference من غير نسخ ومن غير تعديل |
| [[6 & 3]] | بين رقمين | bitwise AND، طبعت [[2]] (110 و 011 = 010) |
| [[a && b]] | بين شرطين | AND منطقي |

وفي C اللي مفيهاش references، [[scanf("%d", &age)]] بتاخد عنوان age عشان تكتب فيه.

---

## الخلاصة

- [[&]] **قبل** اسم متغير: «هات عنوانه».
- [[&]] **بعد** نوع في تعريف: «ده اسم تاني لمتغير موجود».
- reference لازم تتربط وقت تعريفها، ومبتتغيرش، ومفيش reference فاضية.`,
          lines: [
            R`مكتبة cout.`,
            R`[[int &n]]: reference، فـ [[n++]] بتزوّد المتغير الأصلي.`,
            R`main.`,
            R`x بـ 5.`,
            R`r اسم تاني لـ x، مش نسخة.`,
            R`تغيير r غيّر x: بقت 7.`,
            R`inc زوّدت x الأصلية: بقت 8.`,
            R`اطبع x (8) وعنوانها بـ [[&x]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[8]] وبعده عنوان زي [[0x7ffc...]]. من غير [[&]] في inc الدالة بتاخد نسخة، فالناتج يبقى [[7]].`
        },
        {
          cmd: "p->name",
          title: "السهم -> في C و C++: ادخل لخانة جوه struct أو object من خلال مؤشر",
          desc: R`لو عندك struct عادي بتكتب [[user.name]] بالنقطة. لو عندك مؤشر للـ struct بتكتب [[p->name]]. السهم ده اختصار لـ [[(*p).name]]: روح للعنوان، وبعدين خد الخانة.

في C++ نفس الحكاية مع الكلاسات والـ smart pointers: [[ptr->greet()]]، و [[this->name]] جوه الـ methods (this مؤشر للـ object الحالي).

والسهم ده غير [[->]] في PHP (بيعمل نفس الوظيفة تقريبًا: يدخل جوه object)، وغير [[->]] في Python و Rust و Swift (نوع الراجع)، وغير [[->]] في Java و Kotlin (lambda). نفس الرمز، معاني كتير.`,
          example: R`struct User { char name[20]; int age; };
struct User u = { "Ali", 20 };
struct User *p = &u;
printf("%s\n", u.name);
printf("%d\n", p->age);
p->age = 21;`,
          flag: "script",
          try: R`على [[onlinegdb.com]] حط السطور دي جوه main (مع [[#include <stdio.h>]] فوق). بعدين جرّب [[p.age]] بالنقطة واقرا الـ error.`,
          deep: {
            why: R`أي كود C فيه structs بيتعامل بالمؤشرات (linked lists، trees، أي داتا بتتحجز بـ malloc). من غير ما تفهم السهم مش هتقرا أي كود فيه.`,
            how: R`[[p->x]] الـ compiler بيترجمها لـ [[(*p).x]]. الأقواس مهمة لأن [[*p.x]] معناها [[*(p.x)]] (النقطة أولويتها أعلى)، عشان كده عملوا السهم.`,
            when: R`النقطة مع المتغير نفسه، والسهم مع المؤشر. وفي C++ مع [[std::unique_ptr]] و [[std::shared_ptr]] و iterators.`,
            mistakes: R`[[p.age]] مع مؤشر: gcc 14 بيقول [[error: 'p' is a pointer; did you mean to use '->'?]] (و gcc الأقدم بيقول [[request for member 'age' in something not a structure or union]]). و [[u->age]] مع struct مش مؤشر. و [[p->]] على مؤشر NULL فيقع.`
          },
          teach: R`## الفكرة: النقطة مع الحاجة نفسها، والسهم مع عنوانها

struct (من structure) نوع بتعمله بنفسك فيه كذا خانة (field). لو عندك المتغير نفسه بتوصل للخانة بـ [[.]]، ولو عندك مؤشر ليه بـ [[->]]. المثال سطور جوه main، حطيناها في برنامج كامل بـ [[#include <stdio.h>]] واتعمله compile بـ gcc 14.4 جوه Docker ([[gcc:14]]).

---

## ١. سطر بسطر

~~~c
struct User { char name[20]; int age; };
~~~

- [[struct User]]: نوع جديد اسمه User.
- [[char name[20]]]: خانة نص، array من ٢٠ حرف ([[char]] = حرف واحد).
- [[int age]]: خانة رقم.

~~~c
struct User u = { "Ali", 20 };
~~~

متغير u من النوع ده، والقيم بالترتيب: name بـ "Ali" و age بـ 20.

~~~c
struct User *p = &u;
~~~

p مؤشر لـ User (النجمة في التعريف)، شايل عنوان u ([[&u]]).

~~~c
printf("%s\n", u.name);
printf("%d\n", p->age);
~~~

~~~text الناتج
Ali
20
~~~

- [[u.name]]: u هو الـ struct نفسه، فـ نقطة. و [[%s]] في printf معناها «اطبع نص».
- [[p->age]]: p عنوان، فـ سهم. يعني «روح للعنوان اللي في p، وهات خانة age».

~~~c
p->age = 21;
~~~

بنكتب من خلال المؤشر، فـ u الأصلي اتغير. ضفنا سطر يطبع التلات طرق:

~~~c
printf("%d %d %d\n", u.age, (*p).age, p->age);
~~~

~~~text الناتج
21 21 21
~~~

---

## ٢. السهم اختصار لإيه؟

[[p->age]] هي بالظبط [[(*p).age]]:

1. [[*p]]: روح للعنوان، هات الـ struct.
2. [[.age]]: خد منه الخانة.

الأقواس لازمة لأن [[.]] أولويتها أعلى من [[*]]، فـ [[*p.age]] كانت هتتفهم [[*(p.age)]] وده غلط. عشان كده اتعمل السهم.

---

## ٣. لو استخدمت النقطة مع مؤشر

~~~c
printf("%d\n", p.age);
~~~

~~~text الناتج (gcc 14)
c3b.c:6:17: error: 'p' is a pointer; did you mean to use '->'?
    6 | printf("%d\n", p.age);
      |                 ^
      |                 ->
~~~

gcc عرف إن p مؤشر واقترح عليك [[->]] بنفسه.

---

## الخلاصة

| عندك | تكتب |
|---|---|
| الـ struct نفسه ([[u]]) | [[u.age]] |
| مؤشر ليه ([[p]]) | [[p->age]] = [[(*p).age]] |
| جوه method في C++ | [[this->name]] (this مؤشر للـ object) |

و [[->]] هنا غير [[->]] بتاعة Python و Swift (نوع الراجع) و Java (lambda).`,
          lines: [
            R`struct فيه اسم وعمر.`,
            R`متغير struct.`,
            R`مؤشر بيشيل عنوان u.`,
            R`مع المتغير نفسه: نقطة.`,
            R`مع المؤشر: سهم، نفس [[(*p).age]].`,
            R`تعديل من خلال المؤشر بيغيّر u الأصلي.`
          ],
          sol: R`هيطبع [[Ali]] ثم [[20]]. و [[p.age]] بيطلع compile error لأن p مؤشر مش struct، و gcc 14 بيقول [[error: 'p' is a pointer; did you mean to use '->'?]] ويقترح عليك [[->]] بنفسه.`
        },
        {
          cmd: "std::cout",
          title: "النقطتين المزدوجة :: في C++: «اللي جوه»، namespace أو class، زي std::cout",
          desc: R`[[::]] (scope resolution) معناها «الحاجة دي اللي جوه ده». [[std::cout]] يعني cout اللي جوه namespace اسمه std (المكتبة القياسية). و [[std::vector<int>]] و [[std::string]] نفس الفكرة.

ومع الكلاسات: [[User::count]] خانة static في الكلاس، و [[void User::greet() {...}]] تعريف method برة الكلاس (غالبًا في ملف [[.cpp]] منفصل عن [[.h]]).

[[using namespace std;]] بتخليك تكتب [[cout]] من غير [[std::]]، بس متحطهاش في ملفات [[.h]] عشان بتتنقل لكل ملف بيعمل include. ونفس الرمز [[::]] في PHP و Rust بنفس الفكرة تقريبًا، وفي Java و Kotlin معناه method reference (درس تاني).`,
          example: R`#include <iostream>
#include <string>
class User {
public:
    static int count;
    void greet();
};
int User::count = 0;
void User::greet() { std::cout << "hi\n"; }`,
          flag: "script",
          try: R`اكتب برنامج صغير فيه [[cout << "hi";]] من غير [[std::]] ومن غير using، واقرا الـ error. بعدين صلّحه مرة بـ [[std::]] ومرة بـ [[using namespace std;]].`,
          deep: {
            why: R`الـ namespaces بتمنع تصادم الأسماء: مكتبتين فيهم دالة اسمها [[sort]] مش هيتخانقوا. وكل كود C++ بتقراه مليان [[std::]].`,
            how: R`الـ compiler بيدوّر على الاسم جوه الـ scope اللي قبل [[::]] بس. و [[::name]] لوحدها في الأول معناها الـ global scope.`,
            when: R`[[std::]] في أي حاجة من المكتبة القياسية. و [[Class::]] لتعريف الـ methods برة الكلاس وللخانات الـ static.`,
            mistakes: R`تنسى [[std::]] فيطلع [[error: 'cout' was not declared in this scope]] (و gcc بيقولك [[did you mean 'std::cout'?]]). وتكتب [[using namespace std;]] في header. وتكتب [[std.cout]] بالنقطة.`
          },
          teach: R`## الفكرة: [[A::b]] = «b اللي جوه A»

[[::]] اسمها scope resolution operator. الشمال اسم «مكان» (namespace أو class)، واليمين حاجة جواه. المثال تعريف كلاس من غير main، فضفنا له main صغيرة عشان يشتغل، واتعمله compile بـ g++ 14.4 جوه Docker ([[gcc:14]]).

---

## ١. سطر بسطر

~~~cpp
#include <iostream>
#include <string>
~~~

مكتبة الدخل والخرج ([[std::cout]])، ومكتبة النصوص ([[std::string]]). (المثال مش بيستخدم string، هي موجودة عشان شكل الملف المعتاد.)

~~~cpp
class User {
public:
    static int count;
    void greet();
};
~~~

- [[class User { ... };]]: تعريف كلاس. لاحظ [[;]] بعد القوس الأخير، لازمة في C++.
- [[public:]]: اللي بعدها مسموح يتوصل له من برة الكلاس.
- [[static int count;]]: خانة [[static]] يعني نسخة واحدة للكلاس كله، مش نسخة لكل object.
- [[void greet();]]: إعلان عن method من غير جسم. الجسم هيتكتب برة.

~~~cpp
int User::count = 0;
~~~

[[User::count]]: «count اللي جوه User». الخانة الـ static لازم تتعرّف وتاخد قيمة مرة واحدة برة الكلاس، و [[::]] بتقول للـ compiler دي بتاعة مين.

~~~cpp
void User::greet() { std::cout << "hi\n"; }
~~~

- [[User::greet]]: جسم الـ method greet بتاعة User، مكتوب برة الكلاس. ده الشكل المعتاد لما الكلاس في [[.h]] والأجسام في [[.cpp]].
- [[std::cout]]: «cout اللي جوه namespace اسمه std». و std (من standard) هو المكان اللي المكتبة القياسية كلها فيه.

---

## ٢. نشغّله

ضفنا main دي:

~~~cpp
int main() {
    User u;
    u.greet();
    User::count++;
    std::cout << User::count << "\n";
}
~~~

~~~text الناتج
hi
1
~~~

- [[u.greet()]]: method على object، فـ نقطة.
- [[User::count++]]: الخانة الـ static بتتوصل من اسم الكلاس نفسه بـ [[::]]، من غير object.

---

## ٣. من غير [[std::]]

~~~cpp
#include <iostream>
int main() {
    cout << "hi";
}
~~~

~~~text الناتج (g++ 14)
c4b.cpp:3:5: error: 'cout' was not declared in this scope; did you mean 'std::cout'?
~~~

cout موجودة بس جوه std، والـ compiler مش هيدوّر جوه std لوحده. الحل يا [[std::cout]]، يا سطر [[using namespace std;]] فوق، وجربنا التاني وطبع [[hi]].

### [[::]] لوحدها في الأول

~~~cpp
int x = 1;
int main() {
    int x = 2;
    std::cout << x << " " << ::x << "\n";
}
~~~

~~~text الناتج
2 1
~~~

[[x]] هي اللي جوه main، و [[::x]] (من غير حاجة على الشمال) يعني «x اللي في الـ global scope».

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[std::cout]] | cout جوه namespace std |
| [[User::count]] | خانة static جوه الكلاس |
| [[void User::greet() {...}]] | جسم method مكتوب برة الكلاس |
| [[::x]] | x اللي في الـ global scope |
| [[u.greet()]] | object، فـ نقطة مش [[::]] |

و [[::]] في Java و Kotlin معناها method reference، فكرة تانية خالص.`,
          lines: [
            R`مكتبة الدخل والخرج.`,
            R`مكتبة النصوص.`,
            R`كلاس.`,
            R`الحاجات اللي بعدها عامة.`,
            R`خانة static: واحدة للكلاس كله.`,
            R`تعريف الـ method من غير جسم.`,
            R`قفلة الكلاس.`,
            R`[[User::count]]: إعطاء قيمة للخانة الـ static برة الكلاس.`,
            R`[[User::greet]]: جسم الـ method برة الكلاس، و [[std::cout]] جواها.`
          ],
          sol: R`من غير [[std::]] هيطلع [[error: 'cout' was not declared in this scope]] ومعاه اقتراح [[std::cout]]. وبأي واحد من الحلين البرنامج هيطبع [[hi]].`
        },
        {
          cmd: "#include <>  و  \"\"",
          title: "الـ #include في C و C++: <file> من مكتبات النظام، و \"file\" من ملفات مشروعك الأول",
          desc: R`[[#include]] بتنسخ محتوى ملف header جوه ملفك قبل الـ compile. [[#include <stdio.h>]] بالأقواس الزاوية معناها «دوّر في فولدرات مكتبات النظام والـ compiler». [[#include "user.h"]] بعلامات التنصيص معناها «دوّر جنب الملف ده الأول، ولو ملقتش دوّر في مكتبات النظام».

العرف: [[<>]] للمكتبة القياسية والمكتبات المتسطّبة، و [[""]] لملفاتك انت.

والـ [[#]] هنا مش تعليق: كل سطر بادئ بـ [[#]] في C و C++ أمر للـ preprocessor، زي [[#define]] و [[#ifndef]] و [[#pragma once]]. وفي C++ مكتبات C بتتكتب من غير [[.h]] وبـ c في الأول: [[<cstdio>]].`,
          example: R`#include <stdio.h>
#include <vector>
#include "user.h"
#define MAX 100
#pragma once`,
          flag: "script",
          try: R`اعمل ملف [[user.h]] فيه [[int add(int a, int b);]] وملف [[main.c]] فيه [[#include <user.h>]]. لو عندك gcc اعمل [[gcc -c main.c]] واقرا الـ error، وبعدين غيّرها لـ [["user.h"]].`,
          deep: {
            why: R`مشروع C أو C++ متقسم لملفات، والـ headers هي اللي بتعرّف كل ملف باللي في التاني. والخلط بين النوعين بيطلع [[No such file or directory]].`,
            how: R`الـ preprocessor بيشتغل قبل الـ compiler ويبدّل سطر الـ include بمحتوى الملف حرفيًا. مسارات البحث تقدر تزوّدها بـ [[-I]] للـ compiler، وفي CMake بـ [[target_include_directories]].`,
            when: R`[[<>]] لـ [[<iostream>]] و [[<vector>]] و [[<QWidget>]]. [[""]] لـ headers مشروعك. و [[#pragma once]] أو include guards في أول كل header عشان ميتنسخش مرتين.`,
            mistakes: R`[[#include <user.h>]] لملفك فميتلقاش. وتعمل include لملف [[.c]] أو [[.cpp]] بدل [[.h]]. وتنسى include guard فيطلع [[redefinition]]. وتحط [[;]] في آخر سطر [[#include]] أو [[#define]].`
          },
          teach: R`## الفكرة: [[#]] أمر للـ preprocessor، و [[<>]] أو [[""]] بتقول يدوّر فين

قبل الـ compile فيه خطوة اسمها preprocessor: بتقرا كل سطر بادئ بـ [[#]] وتنفّذه، زي «انسخ الملف ده هنا» أو «بدّل الكلمة دي بالرقم ده». السطور دي **مش تعليقات**. جربنا كل حاجة بـ gcc و g++ 14.4 جوه Docker ([[gcc:14]]).

---

## ١. سطر بسطر

~~~cpp
#include <stdio.h>
~~~

- [[#include]]: «حط محتوى الملف ده مكان السطر ده».
- [[<stdio.h>]]: الأقواس الزاوية معناها «دوّر في فولدرات مكتبات النظام والـ compiler». و [[.h]] (من header) ملف فيه **إعلانات**: أسماء الدوال وأنواعها من غير أجسامها.

~~~cpp
#include <vector>
~~~

header من مكتبة C++ القياسية. مكتبات C++ مفيش في اسمها [[.h]]، ومكتبات C لما تستخدمها في C++ ليها اسم تاني بـ c في الأول: [[<cstdio>]] بدل [[<stdio.h>]].

~~~cpp
#include "user.h"
~~~

علامات التنصيص: «دوّر **جنب الملف ده** الأول، ولو ملقتش دوّر في مكتبات النظام». ده لملفات مشروعك.

~~~cpp
#define MAX 100
~~~

[[#define]]: بدّل كل كلمة MAX في الملف بـ 100 قبل الـ compile. ومفيش [[=]] ولا [[;]].

~~~cpp
#pragma once
~~~

[[#pragma once]]: «متعملش include للملف ده أكتر من مرة». مكانها **أول سطر في ملف header**، مش في الملف الرئيسي. لما حطيناها في ملف [[.cpp]] زي المثال، g++ حذّر:

~~~text الناتج
c5.cpp:5:9: warning: #pragma once in main file
~~~

---

## ٢. [[<>]] ضد [[""]] بتجربة

عملنا فولدر فيه ملفين:

~~~text الملفات
user.h        فيه:  int add(int a, int b);
main_angle.c  فيه:  #include <user.h>
~~~

~~~bash
gcc -c main_angle.c
~~~

~~~text الناتج
main_angle.c:1:10: fatal error: user.h: No such file or directory
    1 | #include <user.h>
      |          ^~~~~~~~
compilation terminated.
~~~

[[-c]] يعني compile بس من غير ما تعمل برنامج نهائي. الملف جنبه بالظبط، بس [[<>]] مدورتش هنا، دورت في فولدرات النظام بس. لما غيرناها لـ [[#include "user.h"]] الـ compile عدّى.

---

## ٣. نشوف شغل الـ preprocessor بعينك

[[g++ -E]] بيوقف بعد الـ preprocessor ويطبع الملف بعد التبديل. عملنا ملف فيه السطور دي وتحتها [[int main() { printf("%d\n", MAX); }]]، وآخر سطر طلع:

~~~text الناتج (g++ -E، آخر سطر)
int main() { printf("%d\n", 100); }
~~~

MAX اختفت وبقت 100 قبل ما الـ compiler يشوف الكود. وفوقها آلاف السطور: ده محتوى [[stdio.h]] و [[vector]] اللي اتنسخ. والبرنامج نفسه طبع [[100]].

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[#include <x>]] | انسخ x من مكتبات النظام |
| [[#include "x"]] | انسخ x من جنب الملف الأول، وبعدين النظام |
| [[#define A 5]] | بدّل A بـ 5 في كل الملف |
| [[#pragma once]] | في أول header: متتنسخش مرتين |

ولو مكتبتك في فولدر تاني: [[gcc -I path/to/include]] بيزوّد مكان يدوّر فيه.`,
          lines: [
            R`header من مكتبة C القياسية.`,
            R`header من مكتبة C++ القياسية (من غير [[.h]]).`,
            R`header من مشروعك، بيتدوّر عليه جنب الملف الأول.`,
            R`[[#define]]: الـ preprocessor بيبدّل كل MAX بـ 100 قبل الـ compile.`,
            R`[[#pragma once]] في أول header: متنسخنيش أكتر من مرة.`
          ],
          sol: R`مع [[<user.h>]] ← [[fatal error: user.h: No such file or directory]] لأن gcc مدوّرش جنب الملف. مع [["user.h"]] الـ compile بيعدّي.`
        },
        {
          cmd: "cout <<  و  cin >>",
          title: "الـ << و >> مع cout و cin في C++: « ابعت للشاشة » و « اقرا من الكيبورد »، وأصلهم shift",
          desc: R`في C++ [[std::cout << "Hi" << name]] معناها «ابعت Hi وبعدها name للشاشة»، والسهم بيشاور ناحية cout يعني البيانات رايحة لها. و [[std::cin >> age]] معناها «اقرا من الكيبورد وحطه في age»، والسهم رايح ناحية المتغير.

الرمزين أصلًا bit shift ([[1 << 3]] بـ 8)، بس C++ عاملهم overload مع الـ streams. وتقدر تسلسلهم لأن كل [[<<]] بترجّع cout تاني.

[[std::endl]] سطر جديد ومعاه flush (بطيء شوية)، و [[\n]] سطر جديد بس. و [[cin >> name]] بتقف عند أول مسافة، فلو عايز سطر كامل [[std::getline(std::cin, name)]].`,
          example: R`#include <iostream>
#include <string>
int main() {
    std::string name;
    int age;
    std::cout << "اسمك؟ ";
    std::cin >> name >> age;
    std::cout << "أهلًا " << name << "، عندك " << age << "\n";
}`,
          flag: "script",
          try: R`شغّل المثال على [[onlinegdb.com]] واكتب [[Ali 20]]. بعدين اكتب [[Ali Hassan 20]] ولاحظ إن الـ age باظت، وفكّر ليه.`,
          deep: {
            why: R`أول برنامج C++ هتكتبه فيه cout و cin، وكل مسائل الـ competitive programming بتقرا بـ cin.`,
            how: R`[[operator<<]] متعرّفة لكل نوع أساسي، فـ cout بتعرف تطبع int و string. و [[>>]] بتتخطى المسافات وتقرا لحد المسافة الجاية، وبتحوّل للنوع المطلوب. ولو فشلت (حرف في مكان رقم) بتحط cin في حالة fail.`,
            when: R`برامج الترمنال والتمارين. في المشاريع الكبيرة غالبًا بتستخدم مكتبة logging أو [[std::format]] و [[std::print]] في C++ الأحدث.`,
            mistakes: R`تعكس الأسهم: [[cin << x]] أو [[cout >> x]]. وتستخدم [[cin >> name]] لاسم فيه مسافة. وتخلط [[cin >>]] مع [[getline]] فالـ getline تقرا السطر الفاضي اللي فاضل (حل: [[std::cin.ignore()]]).`
          },
          teach: R`## الفكرة: السهم بيشاور على اتجاه البيانات

[[std::cout]] (من character output) هي الشاشة، و [[std::cin]] (character input) هي الكيبورد. [[<<]] بتبعت **ناحية** cout، و [[>>]] بتسحب **من** cin لمتغير. المثال اتعمله compile بـ g++ 14.4 واتشغّل جوه Docker ([[gcc:14]])، وبعتنا له الكلام اللي المفروض يتكتب بالكيبورد عن طريق [[echo "Ali 20" | ./c6]].

---

## ١. سطر بسطر

~~~cpp
#include <iostream>
#include <string>
int main() {
    std::string name;
    int age;
~~~

- [[<iostream>]] فيها cout و cin، و [[<string>]] فيها [[std::string]] (نص).
- [[std::string name;]] و [[int age;]]: متغيرين فاضيين، هيتملوا من الكيبورد.

~~~cpp
    std::cout << "اسمك؟ ";
~~~

[[<<]]: النص رايح **لـ** cout، يعني بيتطبع. ومفيش [[\n]]، فاللي هيتكتب هيبقى على نفس السطر.

~~~cpp
    std::cin >> name >> age;
~~~

[[>>]]: من cin **لـ** المتغير. و cin بتقرا كلمة كلمة (لحد أول مسافة أو سطر جديد)، وبتحوّل للنوع المطلوب:

1. [[cin >> name]]: أول كلمة ([[Ali]]) راحت name.
2. وده بيرجّع cin نفسها، فـ [[>> age]] بتكمّل: الكلمة الجاية ([[20]]) اتحولت لرقم وراحت age.

~~~cpp
    std::cout << "أهلًا " << name << "، عندك " << age << "\n";
}
~~~

نفس فكرة التسلسل: كل [[<<]] بتطبع حتة وترجّع cout، فاللي بعدها بيكمّل. [[\n]] سطر جديد في الآخر.

~~~text الناتج (الإدخال Ali 20)
اسمك؟ أهلًا Ali، عندك 20
~~~

(الإدخال نفسه مبانش جنب «اسمك؟» لأنه جه من pipe مش من كيبورد.)

---

## ٢. لو الاسم فيه مسافة

~~~text الناتج (الإدخال Ali Hassan 20)
اسمك؟ أهلًا Ali، عندك 0
~~~

1. [[cin >> name]] وقفت عند أول مسافة: name = [[Ali]].
2. [[cin >> age]] لقت [[Hassan]]، ودي مش رقم، ففشلت. ومن C++11 لما القراية تفشل المتغير بياخد [[0]]، و cin بتدخل حالة fail وتبطّل تقرا أي حاجة بعد كده.

الحل للنص اللي فيه مسافات: [[std::getline(std::cin, name)]] بتقرا السطر كله.

---

## ٣. الرمزين أصلهم shift

~~~cpp
std::cout << (1 << 3) << " " << (16 >> 2) << "\n";
~~~

~~~text الناتج
8 4
~~~

مع أرقام، [[<<]] بتزق الـ bits لليسار ([[1 << 3]] = 1 × 2 × 2 × 2 = 8)، و [[>>]] لليمين ([[16 >> 2]] = 16 ÷ 4 = 4). C++ عمل overload للرمزين مع cout و cin عشان يبقى شكلهم سهم. والأقواس حوالين [[(1 << 3)]] لازمة، من غيرها cout هتطبع 1 وبعدين 3.

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[cout << x]] | اطبع x |
| [[cout << a << b]] | اطبع a وبعدها b |
| [[cin >> x]] | اقرا كلمة واحدة في x |
| [[getline(cin, s)]] | اقرا سطر كامل |
| [[1 << 3]] مع أرقام | shift = 8 |`,
          lines: [
            R`مكتبة cout و cin.`,
            R`مكتبة string.`,
            R`main.`,
            R`متغير نص.`,
            R`متغير رقم.`,
            R`[[<<]]: النص رايح للشاشة.`,
            R`[[>>]]: اقرا كلمة في name ورقم في age.`,
            R`سلسلة [[<<]] بتطبع كذا حاجة ورا بعض.`,
            R`قفلة main.`
          ],
          sol: R`مع [[Ali 20]] ← [[أهلًا Ali، عندك 20]]. مع [[Ali Hassan 20]] الـ name بقت Ali بس، والـ cin حاول يقرا Hassan كرقم ففشل، والـ age بقت 0.`
        },
        {
          cmd: "~ClassName()",
          title: "الـ tilde ~ قبل اسم الكلاس في C++: الـ destructor، الدالة اللي بتشتغل لوحدها لما الـ object يموت",
          desc: R`في C++ الدالة اللي اسمها نفس اسم الكلاس هي الـ constructor (بتشتغل وقت الإنشاء)، ونفس الاسم وقبله [[~]] هو الـ destructor: بيشتغل لوحده لما الـ object يخرج من الـ scope أو يتمسح بـ [[delete]].

وظيفته ينضّف: يقفل ملف، يرجّع ذاكرة، يفك lock. والفكرة دي اسمها RAII: الحاجة بتتحجز في الـ constructor وتترجع في الـ destructor، فمفيش حاجة تتنسي.

نفس الرمز [[~]] برة الكلاسات معناه bitwise NOT ([[~5]] بـ -6). وفي لينكس [[~]] الـ home. وفي C# [[~ClassName()]] اسمها finalizer وبيشغّلها الـ garbage collector في وقت مش معروف.`,
          example: R`#include <iostream>
class File {
public:
    File()  { std::cout << "open\n"; }
    ~File() { std::cout << "close\n"; }
};
int main() {
    { File f; std::cout << "using\n"; }
    std::cout << "after\n";
}`,
          flag: "script",
          try: R`شغّل المثال على [[onlinegdb.com]] وتوقّع ترتيب السطور الأربعة قبل ما تشوف الناتج.`,
          deep: {
            why: R`ده أهم فكرة في C++: الموارد بتتنضف لوحدها بشكل مضمون، حتى لو حصل exception. وعليها مبنيين [[std::vector]] و [[std::unique_ptr]] و [[std::lock_guard]].`,
            how: R`الـ compiler بيحط نداء الـ destructor أوتوماتيك عند قفلة [[}]] للـ scope اللي فيه الـ object، بالعكس من ترتيب الإنشاء. للـ objects اللي اتعملت بـ [[new]] لازم [[delete]]، وعشان كده الأحسن smart pointers.`,
            when: R`أي كلاس ماسك مورد (ملف، socket، ذاكرة). ولو الكلاس هيتورث منه ومعاك مؤشرات للأب، خلّي الـ destructor [[virtual]].`,
            mistakes: R`تنادي الـ destructor بإيدك. وتنسى [[virtual]] في كلاس أب فـ destructor الابن ميشتغلش. وتستخدم [[new]] من غير [[delete]] فيحصل memory leak.`
          },
          teach: R`## الفكرة: [[~]] قبل اسم الكلاس = الدالة اللي بتشتغل وقت الموت

الـ constructor دالة اسمها نفس اسم الكلاس، بتشتغل لوحدها لما الـ object يتعمل. والـ destructor نفس الاسم وقبله [[~]]، بيشتغل لوحده لما الـ object يخرج من الـ scope. المثال اتعمله compile بـ g++ 14.4 واتشغّل جوه Docker ([[gcc:14]]).

---

## ١. سطر بسطر

~~~cpp
#include <iostream>
class File {
public:
~~~

كلاس اسمه File، و [[public:]] يعني اللي تحتها مسموح من برة.

~~~cpp
    File()  { std::cout << "open\n"; }
~~~

الـ constructor: نفس اسم الكلاس، من غير نوع راجع خالص (ولا حتى [[void]]). هنا بيطبع [[open]]، وفي برنامج حقيقي بيفتح الملف.

~~~cpp
    ~File() { std::cout << "close\n"; }
};
~~~

الـ destructor: [[~File]]. مبياخدش arguments ومبيرجّعش حاجة، وانت **مبتناديهوش** بنفسك.

~~~cpp
int main() {
    { File f; std::cout << "using\n"; }
    std::cout << "after\n";
}
~~~

- الأقواس [[{ }]] جوه main عاملة بلوك (scope) صغير.
- [[File f;]]: object اسمه f اتعمل، فالـ constructor اشتغل.
- [[}]] بتاعة البلوك: f خرج من الـ scope، فالـ destructor اشتغل لوحده.
- بعدها [[after]].

~~~text الناتج
open
using
close
after
~~~

[[close]] اتطبعت **قبل** [[after]]، عند قفلة البلوك بالظبط، من غير أي سطر بيقول «اقفل».

---

## ٢. أكتر من object، وبـ new

غيرنا الكلاس ياخد اسم، وجربنا:

~~~cpp
int main() {
    File a("a");
    File b("b");
    File *h = new File("heap");
    delete h;
    std::cout << "end of main\n";
}
~~~

~~~text الناتج
open a
open b
open heap
close heap
end of main
close b
close a
~~~

- a و b ماتوا عند آخر main **بعكس ترتيب الإنشاء**: b الأول وبعدين a.
- [[new]] بيعمل object بيعيش لحد ما تقول له [[delete]] بنفسك. لو نسيت delete، [[close heap]] مكانتش هتتطبع خالص، وده memory leak. عشان كده C++ الحديث بيستخدم [[std::unique_ptr]] اللي بيعمل delete لوحده في الـ destructor بتاعه.

---

## ٣. [[~]] برة الكلاسات

~~~cpp
std::cout << ~5 << "\n";
~~~

~~~text الناتج
-6
~~~

قبل رقم، [[~]] هي bitwise NOT: بتقلب كل الـ bits، و [[~n]] دايمًا بتساوي [[-n - 1]].

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[File()]] | constructor: وقت الإنشاء |
| [[~File()]] | destructor: وقت الخروج من الـ scope أو [[delete]] |
| [[~5]] | bitwise NOT = -6 |

والفكرة دي اسمها RAII: المورد بيتحجز في الـ constructor ويتساب في الـ destructor، فمستحيل تنساه.`,
          lines: [
            R`مكتبة cout.`,
            R`كلاس.`,
            R`عام.`,
            R`constructor: نفس اسم الكلاس.`,
            R`destructor: [[~]] قبل الاسم.`,
            R`قفلة الكلاس.`,
            R`main.`,
            R`بلوك: f بيتعمل جواه وبيموت عند [[}]].`,
            R`بعد البلوك.`,
            R`قفلة main.`
          ],
          sol: R`الترتيب: [[open]] ثم [[using]] ثم [[close]] (عند قفلة البلوك) ثم [[after]].`
        },
        {
          cmd: "template <typename T>",
          title: "الأقواس الزاوية < > في C++: templates، كود واحد بيشتغل مع أي نوع، زي vector<int>",
          desc: R`[[std::vector<int>]] معناها vector من الأرقام، و [[std::map<std::string, int>]] مفاتيحه نصوص وقيمه أرقام. الـ [[<>]] بعد اسم بتاخد نوع.

وتكتب بنفسك: [[template <typename T> T maxOf(T a, T b)]]: دالة واحدة الـ compiler بيعمل منها نسخة لكل نوع بتستخدمه بيه. ده المقابل لـ generics في TypeScript و Java.

و [[<>]] في C++ كمان في [[#include <...>]] و [[static_cast<int>(x)]] (تحويل نوع)، وبين رقمين [[<]] و [[>]] مقارنة. وفي C++ قديم (قبل 11) [[vector<vector<int>>]] كانت error لأن [[>>]] اتفهمت shift، فكانوا بيكتبوا [[> >]] بمسافة.`,
          example: R`#include <vector>
#include <map>
template <typename T>
T maxOf(T a, T b) { return a > b ? a : b; }
std::vector<int> nums = {3, 1, 2};
std::map<std::string, int> ages;
double d = static_cast<double>(7) / 2;`,
          flag: "script",
          try: R`على [[godbolt.org]] اكتب دالة [[maxOf]] ونادي [[maxOf(3, 7)]] و [[maxOf(2.5, 1.5)]]. بعدين جرّب [[maxOf(3, 2.5)]] واقرا الـ error.`,
          deep: {
            why: R`كل المكتبة القياسية (STL) templates. ولو مش فاهمها مش هتفهم رسايل الـ errors الطويلة اللي C++ مشهورة بيها.`,
            how: R`وقت الـ compile، كل مرة تستخدم template بنوع جديد الـ compiler بيولّد نسخة كاملة للنوع ده (instantiation). عشان كده كود الـ templates لازم يبقى في الـ header.`,
            when: R`استخدامها كل يوم مع containers. كتابتها لما عندك دالة أو كلاس منطقه واحد لأنواع مختلفة.`,
            mistakes: R`[[maxOf(3, 2.5)]]: T مش عارف يبقى int ولا double فيطلع [[no matching function]]، حدّد [[maxOf<double>(3, 2.5)]]. وتحط تعريف الـ template في [[.cpp]] فيطلع linker error.`
          },
          teach: R`## الفكرة: [[<النوع>]] بعد اسم = «ده نسخة للنوع ده»

الـ template كود مكتوب مرة واحدة بنوع لسه مش معروف (اسمه هنا T)، والـ compiler بيعمل منه نسخة لكل نوع بتستخدمه. والأقواس الزاوية [[< >]] هي المكان اللي بيتحط فيه النوع. المثال مش فيه main، فضفنا له main صغيرة، واتعمله compile بـ g++ 14.4 جوه Docker ([[gcc:14]]).

---

## ١. سطر بسطر

~~~cpp
#include <vector>
#include <map>
~~~

[[vector]] array بيكبر لوحده، و [[map]] قاموس مفتاح وقيمة. (ضفنا كمان [[<string>]] و [[<iostream>]] عشان [[std::string]] والطباعة.)

~~~cpp
template <typename T>
T maxOf(T a, T b) { return a > b ? a : b; }
~~~

| الحتة | معناها |
|---|---|
| [[template <typename T>]] | الدالة اللي جاية template، و T اسم لنوع هيتحدد بعدين |
| [[T maxOf(T a, T b)]] | بتاخد اتنين من النوع T وبترجّع T |
| [[a > b ? a : b]] | لو a أكبر رجّع a، غير كده b (الـ ternary) |

~~~cpp
std::vector<int> nums = {3, 1, 2};
std::map<std::string, int> ages;
~~~

- [[vector<int>]]: vector عناصره [[int]].
- [[map<std::string, int>]]: نوعين بفصلة: المفتاح نص، والقيمة رقم.

~~~cpp
double d = static_cast<double>(7) / 2;
~~~

[[static_cast<double>(7)]]: حوّل 7 لـ [[double]] (رقم بكسر). [[< >]] هنا برضه بتاخد النوع. ولأن واحد من الرقمين بقى double، القسمة بقت عشري.

---

## ٢. نشغّله

~~~cpp
std::cout << maxOf(3, 7) << " " << maxOf(2.5, 1.5) << " " << maxOf<double>(3, 2.5) << "\n";
std::cout << nums.size() << " " << nums[0] << " " << d << " " << 7 / 2 << "\n";
ages["Ali"] = 20;
std::cout << ages["Ali"] << " " << ages.size() << "\n";
std::cout << maxOf<std::string>("apple", "banana") << "\n";
~~~

~~~text الناتج
7 2.5 3
3 3 3.5 3
20 1
banana
~~~

- [[maxOf(3, 7)]]: الـ compiler شاف int فعمل نسخة [[maxOf<int>]]: [[7]].
- [[maxOf(2.5, 1.5)]]: نسخة [[double]]: [[2.5]].
- [[maxOf<double>(3, 2.5)]]: حددنا T بنفسنا، فالـ 3 اتحولت 3.0، والأكبر [[3]].
- [[d]] بقت [[3.5]]، لكن [[7 / 2]] بين intين [[3]] (الكسر اتشال).
- [[ages["Ali"] = 20]]: حطينا مفتاح وقيمة.
- مع [[std::string]]، [[>]] بتقارن أبجديًا: banana بعد apple.

---

## ٣. لو الأنواع مختلفة

~~~cpp
maxOf(3, 2.5)
~~~

~~~text الناتج (g++ 14، مختصر)
error: no matching function for call to 'maxOf(int, double)'
note:   deduced conflicting types for parameter 'T' ('int' and 'double')
~~~

T لازم تبقى نوع واحد، والـ compiler لقاها int من الأول و double من التاني. الحل: [[maxOf<double>(3, 2.5)]] زي ما عملنا.

---

## ٤. [[>>]] في C++ القديم

~~~cpp
std::vector<std::vector<int>> g;
~~~

مع [[-std=c++03]]:

~~~text الناتج
error: '>>' should be '> >' within a nested template argument list
~~~

قبل C++11 الـ [[>>]] كانت بتتقري shift، فكانوا بيكتبوا [[> >]] بمسافة. من C++11 عدّت عادي.

---

## الخلاصة

| الكود | [[< >]] هنا معناها |
|---|---|
| [[template <typename T>]] | تعريف نوع متغير اسمه T |
| [[vector<int>]] | نسخة من vector للـ int |
| [[maxOf<double>(...)]] | حدد T بنفسك |
| [[static_cast<double>(x)]] | النوع اللي هتحوّل له |
| [[#include <vector>]] | مكتبة من النظام |
| [[a < b]] | مقارنة عادية |`,
          lines: [
            R`مكتبة vector.`,
            R`مكتبة map.`,
            R`T نوع هيتحدد وقت النداء.`,
            R`دالة بتشتغل مع أي نوع فيه [[>]].`,
            R`vector من الأرقام.`,
            R`map من نص لرقم.`,
            R`[[static_cast<double>]] تحويل نوع، فالقسمة بقت عشري: 3.5.`
          ],
          sol: R`[[maxOf(3, 7)]] ← [[7]]. [[maxOf(2.5, 1.5)]] ← [[2.5]]. [[maxOf(3, 2.5)]] ← error فيه [[deduced conflicting types for parameter 'T' ('int' and 'double')]].`
        }
      ]
    }
]);
