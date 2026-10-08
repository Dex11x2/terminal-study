// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
    {
      t: "struct والملفات والمشاريع والـ debugging",
      l: 1,
      n: "تجمع داتا في struct، وتقرا وتكتب ملفات، وتقسم المشروع لملفات بـ make، وتفهم الـ undefined behavior وتمسكه بـ gdb والـ sanitizers",
      items: [
        {
          cmd: "struct و typedef",
          title: "struct في C: إزاي تجمع كذا متغير في نوع واحد، والفرق بين . و ->",
          desc: R`[[struct]] بيعمل نوع جديد فيه كذا حقل (field)، كل واحد بنوعه، زي طالب ليه اسم وسن ومعدل:
[[struct Student { char name[32]; int age; double gpa; };]]
ومن غير typedef، كل مرة هتكتب [[struct Student s;]].

[[typedef]] بيدّي نوع موجود اسم جديد. [[typedef struct { ... } Student;]] معناها «سمّي الـ struct ده Student»، فتكتب [[Student s;]] على طول.

الوصول للحقول:
• [[s.age]]: النقطة لما يكون عندك المتغير نفسه.
• [[p->age]]: السهم لما يكون عندك pointer للـ struct. هي اختصار لـ [[(*p).age]]: روح للعنوان وبعدين هات الحقل.

حاجات لازم تعرفها:
• [[Student b = a;]] بتنسخ كل الحقول، وحتى الـ array اللي جوه. فـ b نسخة مستقلة.
• الـ struct بيتبعت للدالة بالقيمة (نسخة) زي أي متغير. فلو الدالة لازم تغيّره، أو هو كبير ومش عايز تنسخه، ابعت pointer: [[birthday(&a)]]. ولو هتقرا بس: [[const Student *]].
• تقدر تعمل array من structs: [[Student group[2]]].
• الحجم ممكن يبقى أكبر من مجموع الحقول، لأن الـ compiler بيزوّد bytes فاضية (padding) عشان كل حقل يبدأ في عنوان مناسب لنوعه.`,
          example: R`#include <stdio.h>
#include <string.h>

typedef struct {
    char name[32];
    int age;
    double gpa;
} Student;

void birthday(Student *s) {
    s->age++;
}

int main(void) {
    Student a = {"Sara", 21, 3.4};
    Student b = a;
    strcpy(b.name, "Omar");
    birthday(&a);
    printf("%s %d %.1f\n", a.name, a.age, a.gpa);
    printf("%s %d\n", b.name, b.age);
    Student group[2] = {{"Ali", 20, 2.9}, {"Mona", 22, 3.8}};
    for (int i = 0; i < 2; i++) printf("%s ", group[i].name);
    printf("\nsizeof(Student)=%zu\n", sizeof(Student));
    return 0;
}`,
          try: R`اعمل struct اسمه [[Product]] فيه اسم وسعر وكمية، واعمل array من ٣ منتجات، واكتب دالة [[double total_value(const Product *items, int n)]] ترجّع مجموع (السعر × الكمية). وبعدين جرّب ترتيب حقول [[Student]]: حط [[int age]] الأول وبعده [[double gpa]] وبعده الاسم، والحجم اتغيّر؟`,
          flag: "script",
          deep: {
            why: R`أي داتا حقيقية ليها أكتر من حقل: مستخدم، طلب، نقطة في لعبة، packet في الشبكة. الـ struct بيخليك تتعامل معاها كوحدة واحدة، وهو الأساس اللي الـ class في C++ اتبنت عليه (في C++ الـ struct والـ class تقريبًا نفس الحاجة).`,
            how: R`الحقول بتتخزن ورا بعض بنفس ترتيب كتابتها. الـ [[double]] محتاج يبدأ في عنوان بيقبل القسمة على 8، فبعد [[name]] (32) و [[age]] (4) = 36، الـ compiler بيحط 4 bytes فاضية عشان gpa يبدأ عند 40. فالحجم 48 مش 44.

[[s->age++]]: السهم أولويته أعلى من [[++]]، فهي بتزوّد الحقل مش الـ pointer.

[[{"Sara", 21, 3.4}]] بتملي الحقول بالترتيب. ومن C99 تقدر تسمّيهم: [[{.age = 21, .name = "Sara"}]]، وده أوضح والحقول اللي مكتبتهاش بتبقى صفر.`,
            when: R`كل ما يكون عندك داتا متعلقة ببعض. وابعته لأي دالة بـ pointer ([[const]] لو للقراية) بدل ما تنسخه، خصوصًا لو كبير.`,
            mistakes: R`تستخدم [[.]] مع pointer أو [[->]] مع متغير عادي: الـ compiler بيقولك وغالبًا بيقترح الصح. وتبعت struct بالقيمة لدالة بتعدّله وتستغرب إن الأصل متغيرش. وتنسخ struct فيه pointer وتفتكر إن النسخ عمل نسخة من الداتا اللي الـ pointer بيشاور عليها: النسخ بينسخ العنوان بس (shallow copy). ودي نفس المشكلة اللي C++ حلّتها بالـ copy constructor (rule of 3).`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف نوع جديد [[Student]] فيه اسم وسن ومعدل، ويعمل طالبة وينسخها ويغيّر اسم النسخة، ويزوّد سن الأصل بدالة بتاخد pointer، ويعمل array من طالبين، ويطبع حجم الـ struct. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]].

~~~text الناتج
Sara 22 3.4
Omar 21
Ali Mona 
sizeof(Student)=48
~~~

---

## ١. [[typedef struct { ... } Student;]]

~~~c
typedef struct {
    char name[32];
    int age;
    double gpa;
} Student;
~~~

نفكّها من جوه لبرة:

- [[struct { ... }]]: نوع جديد فيه ٣ حقول (fields)، كل حقل نوعه واسمه و [[;]].
- [[typedef النوع الاسم;]]: «اديني اسم تاني للنوع ده». هنا الاسم [[Student]].
- النتيجة: تكتب [[Student a;]] على طول. من غير typedef كنت هتكتب [[struct Student { ... };]] وبعدين [[struct Student a;]] في كل مكان.
- الـ [[;]] بعد [[}]] لازمة.

---

## ٢. [[Student a = {"Sara", 21, 3.4};]]

القيم الأولية بنفس ترتيب الحقول: name ثم age ثم gpa. والنص [["Sara"]] بيتنسخ جوه الـ array [[name]].

---

## ٣. النسخ بـ [[=]]

~~~c
    Student b = a;
    strcpy(b.name, "Omar");
~~~

- [[Student b = a;]]: بينسخ **كل** bytes الـ struct، حتى الـ 32 حرف بتوع الاسم. b نسخة مستقلة.
- [[b.name]]: النقطة [[.]] = «الحقل name من b».
- [[strcpy(b.name, "Omar")]]: انسخ النص في الـ array. (مينفعش [[b.name = "Omar"]]: جربتها وطلع [[error: assignment to expression with array type]]، لأن الـ array مبتتعيّنش بـ [[=]].) الـ 32 byte كفاية لـ Omar، فـ strcpy آمنة هنا.
- [[a.name]] لسه Sara.

---

## ٤. الدالة و [[->]]

~~~c
void birthday(Student *s) {
    s->age++;
}
~~~

- [[Student *s]]: الدالة بتاخد **عنوان** الطالب، عشان تغيّر الأصل مش نسخة (نفس فكرة [[swap]]).
- [[s->age]]: السهم = «روح للـ struct اللي s بيشاور عليه، وهات age». اختصار لـ [[(*s).age]] (الأقواس لازمة لأن النقطة أولويتها أعلى من النجمة).
- [[s->age++]]: [[->]] أولويته أعلى من [[++]]، فالزيادة على الحقل.

~~~c
    birthday(&a);
    printf("%s %d %.1f\n", a.name, a.age, a.gpa);
    printf("%s %d\n", b.name, b.age);
~~~

~~~text الناتج
Sara 22 3.4
Omar 21
~~~

a بقت 22. و b لسه 21 لأنها اتنسخت **قبل** birthday، وبقى اسمها Omar.

ولو كتبت [[s.age++]] على pointer:

~~~text الناتج
L6dot.c:11:6: error: 's' is a pointer; did you mean to use '->'?
   11 |     s.age++;
      |      ^
      |      ->
~~~

gcc بيقولك الصح بنفسه.

---

## ٥. array من structs

~~~c
    Student group[2] = {{"Ali", 20, 2.9}, {"Mona", 22, 3.8}};
    for (int i = 0; i < 2; i++) printf("%s ", group[i].name);
~~~

- كل عنصر قيمه بين [[{ }]] جوه الـ [[{ }]] الكبيرة.
- [[group[i].name]]: الأول [[group[i]]] (طالب)، وبعدين [[.name]] منه.

~~~text الناتج
Ali Mona 
~~~

---

## ٦. الحجم والـ padding

~~~c
    printf("\nsizeof(Student)=%zu\n", sizeof(Student));
~~~

الـ [[\n]] في الأول بتقفل سطر الأسماء. والحجم:

~~~text الناتج
sizeof(Student)=48
~~~

ليه 48 والحقول 32 + 4 + 8 = 44؟

| الحقل | يبدأ عند byte | الحجم |
|---|---|---|
| [[name]] | 0 | 32 |
| [[age]] | 32 | 4 |
| (فاضي: padding) | 36 | 4 |
| [[gpa]] | 40 | 8 |

الـ [[double]] على x86-64 بيحب يبدأ عند عنوان بيقبل القسمة على 8 (alignment)، والـ CPU بيقراه أسرع كده. فالـ compiler ساب 4 byte فاضيين بعد age عشان gpa يبدأ عند 40.

### الـ try: غيّر الترتيب

| الترتيب | الحجم |
|---|---|
| [[name, age, gpa]] (الأصلي) | 48 |
| [[age, gpa, name]] | 48: 4 + 4 فاضيين + 8 + 32 |
| [[gpa, age, name]] | 48: 8 + 4 + 32 = 44، ويتكمّل لـ 48 |

الحالة التالتة: الـ struct كله لازم حجمه يقبل القسمة على 8، عشان في array منه كل [[gpa]] يفضل على 8. فالـ compiler بيزوّد 4 في **الآخر**. الحجم مفرقش هنا، بس في structs تانية ترتيب الحقول من الأكبر للأصغر بيوفّر.

---

## ٧. الـ solCode: [[total_value]]

~~~c
typedef struct {
    char name[32];
    double price;
    int qty;
} Product;

double total_value(const Product *items, int n) {
    double total = 0;
    for (int i = 0; i < n; i++) total += items[i].price * items[i].qty;
    return total;
}
~~~

- [[const Product *items]]: عنوان أول منتج، و [[const]] لأننا بنقرا بس. ومبنسخش الـ structs (كل واحد 48 byte).
- [[items[i]]] منتج (مش pointer)، فبعده [[.]] مش [[->]].
- في main: [[{{"pen", 5.5, 10}, {"book", 80, 2}, {"bag", 250, 1}}]] = 55 + 160 + 250.

~~~text الناتج
total=465.00
~~~

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[typedef struct { ... } T;]] | نوع جديد اسمه T |
| [[T a = {...};]] | قيم بالترتيب |
| [[a.field]] | حقل من متغير |
| [[p->field]] | حقل من pointer = [[(*p).field]] |
| [[T b = a;]] | نسخة كاملة |
| [[f(&a)]] و [[void f(T *p)]] | الدالة تعدّل الأصل |

- الحجم ممكن يزيد عن مجموع الحقول (padding).`,
          lines: [
            "فيها printf.",
            R`فيها [[strcpy]].`,
            R`[[typedef struct]]: نوع جديد من غير اسم، وهنسميه تحت.`,
            "حقل: array حروف للاسم.",
            "حقل: السن.",
            "حقل: المعدل.",
            R`اسم النوع: [[Student]].`,
            R`الدالة بتاخد pointer عشان تعدّل الأصل.`,
            R`[[->]]: الحقل age من الـ struct اللي s بيشاور عليه، وزوّده 1.`,
            "قفلة الدالة.",
            "بداية main.",
            "قيم أولية بنفس ترتيب الحقول.",
            "نسخة كاملة مستقلة، حتى الـ array اللي جوه.",
            R`نغيّر اسم النسخة بس. [[.]] لأن b متغير مش pointer.`,
            "نبعت عنوان a.",
            "a اتغيّرت: السن 22.",
            "b لسه 21، واسمها Omar.",
            "array من structs.",
            R`[[group[i].name]]: العنصر رقم i، وبعدين حقل الاسم.`,
            R`الحجم 48 مش 44 بسبب الـ padding.`,
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[Sara 22 3.4]]
[[Omar 21]]
[[Ali Mona ]]
[[sizeof(Student)=48]]

لو رتبت [[int age; double gpa; char name[32];]] الحجم بيفضل 48 (4 + 4 padding + 8 + 32). ولو [[double gpa; int age; char name[32];]] = 8 + 4 + 32 = 44، وبعدين الـ compiler بيكمّل لـ 48 عشان الـ array من الـ structs كل عنصر فيها يبدأ صح. القاعدة العملية: رتّب الحقول من الأكبر للأصغر لو الحجم يفرق معاك.

[[total_value]]: loop على [[items[i].price * items[i].qty]].`,
          solCode: R`#include <stdio.h>

typedef struct {
    char name[32];
    double price;
    int qty;
} Product;

double total_value(const Product *items, int n) {
    double total = 0;
    for (int i = 0; i < n; i++) total += items[i].price * items[i].qty;
    return total;
}

int main(void) {
    Product items[3] = {{"pen", 5.5, 10}, {"book", 80, 2}, {"bag", 250, 1}};
    printf("total=%.2f\n", total_value(items, 3));
    return 0;
}`
        },
        {
          cmd: "enum و #define و const",
          title: "enum و #define و const: إزاي تسمّي الثوابت، وليه الـ macro محتاج أقواس؟",
          desc: R`الأرقام اللي ملهاش اسم في الكود (magic numbers) صعب تتفهم وصعب تتغير. عندك ٣ طرق تسمّيها:

[[#define MAX_USERS 100]]: أمر للـ preprocessor. قبل الـ compile، أي [[MAX_USERS]] في الكود بيتبدّل بـ [[100]] نصيًا، كأنك عملت find and replace. ملوش نوع، والـ debugger مبيشوفوش.

الـ macro بـ parameters: [[#define SQUARE(x) ((x) * (x))]]. ده برضه تبديل نص، وعشان كده الأقواس مهمة: [[SQUARE_BAD(1 + 2)]] بتتحول لـ [[1 + 2 * 1 + 2]] = 5 مش 9.

[[const int limit = 3;]]: متغير عادي ليه نوع، بس مينفعش يتغير بعد ما تديله قيمة. الـ compiler بيمنعك لو حاولت.

[[enum]]: مجموعة أسماء ليها أرقام صحيحة. [[enum Color { RED, GREEN, BLUE };]] تلقائيًا RED = 0 و GREEN = 1 و BLUE = 2، وتقدر تحدد القيم بنفسك [[BANNED = 9]]. مناسب لأي حاجة ليها حالات محددة: لون، أو حالة طلب، أو اتجاه.

ميزة enum مع switch: لو نسيت حالة، gcc بـ [[-Wall]] بيقولك ([[-Wswitch]]).`,
          example: R`#include <stdio.h>

#define MAX_USERS 100
#define SQUARE_BAD(x) x * x
#define SQUARE(x) ((x) * (x))

enum Color { RED, GREEN, BLUE };
enum Status { ACTIVE = 1, BANNED = 9 };

const char *color_name(enum Color c) {
    switch (c) {
        case RED: return "red";
        case GREEN: return "green";
        case BLUE: return "blue";
    }
    return "unknown";
}

int main(void) {
    const int limit = 3;
    enum Color c = GREEN;
    printf("MAX_USERS=%d limit=%d\n", MAX_USERS, limit);
    printf("c=%d name=%s banned=%d\n", c, color_name(c), BANNED);
    printf("SQUARE_BAD(1 + 2)=%d SQUARE(1 + 2)=%d\n", SQUARE_BAD(1 + 2), SQUARE(1 + 2));
    return 0;
}`,
          try: R`ضيف [[YELLOW]] للـ enum ومتضيفهاش في الـ switch، واعمل compile بـ [[-Wall]]. وبعدين جرّب [[limit = 5;]]. وآخر حاجة: اعمل [[int i = 2;]] واطبع [[SQUARE(i++)]] وشوف [[i]] بقت كام، و gcc قال إيه.`,
          flag: "script",
          deep: {
            why: R`الثوابت المسمّاة بتخلي الكود يتقري ([[if (status == BANNED)]] بدل [[if (status == 9)]])، وتغيّر القيمة من مكان واحد. والـ macros موجودة في كل كود C قديم وجديد، فلازم تعرف مشاكلها.`,
            how: R`الـ preprocessor مبيفهمش C، بيبدّل نص وبس. شوف بنفسك بـ [[gcc -E]]: هتلاقي [[SQUARE_BAD(1 + 2)]] بقت [[1 + 2 * 1 + 2]].

[[SQUARE(i++)]] بتتحول لـ [[((i++) * (i++))]]: i بتزيد مرتين في نفس الجملة، وده undefined behavior. ودي مشكلة مفيش أقواس تحلها، والحل دالة عادية ([[static inline int square(int x)]]).

الـ enum في C مجرد int بأسماء، فـ [[enum Color c = 42;]] بتعدّي. C++ عملت [[enum class]] اللي مبيتحولش لـ int لوحده.

[[#ifndef]] و [[#define]] و [[#endif]] في الـ headers (الدرس بعد الجاي) برضه أوامر preprocessor بتشتغل بنفس الفكرة.`,
            when: R`[[enum]] لأي مجموعة حالات. [[const]] للثوابت العادية (في C++ استخدم [[constexpr]]). و [[#define]] للحاجات اللي محتاجة preprocessor فعلًا: include guards، وثوابت حجم array في C القديم، وكود مختلف حسب النظام ([[#ifdef _WIN32]]).`,
            mistakes: R`macro من غير أقواس حوالين كل parameter وحوالين الناتج. وتحط [[;]] في آخر [[#define]]: [[#define MAX 100;]] بتحط الـ [[;]] في كل مكان. وتبعت حاجة ليها أثر جانبي ([[i++]] أو نداء دالة) لـ macro فتتنفذ مرتين. وتنسى حالة في switch على enum وتتجاهل الـ warning.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيورّيك ٣ طرق تدّي اسم لثابت: [[#define]] و [[const]] و [[enum]]، ودالة بتحوّل لون من الـ enum لاسمه بـ switch، ومقارنة بين macro من غير أقواس وواحد بأقواس. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]].

~~~text الناتج
MAX_USERS=100 limit=3
c=1 name=green banned=9
SQUARE_BAD(1 + 2)=5 SQUARE(1 + 2)=9
~~~

---

## ١. [[#define]]

~~~c
#define MAX_USERS 100
#define SQUARE_BAD(x) x * x
#define SQUARE(x) ((x) * (x))
~~~

- [[#define الاسم النص]]: أمر للـ preprocessor (زي [[#include]]): «أي مكان فيه الاسم ده، حط النص ده بداله» قبل الـ compile. مفيش [[=]] ولا [[;]].
- [[SQUARE_BAD(x)]]: macro بياخد parameter. الـ [[x]] بيتبدّل باللي بين القوسين **كنص** زي ما هو.
- العُرف إن أسماء الـ macros بحروف كبيرة، عشان تعرفها لما تشوفها.

---

## ٢. [[enum]]

~~~c
enum Color { RED, GREEN, BLUE };
enum Status { ACTIVE = 1, BANNED = 9 };
~~~

- [[enum Color]]: نوع جديد قيمه أسماء. أول اسم بياخد 0 والباقي يزيد 1: RED = 0، GREEN = 1، BLUE = 2.
- [[ACTIVE = 1, BANNED = 9]]: تقدر تحدد الأرقام بنفسك.
- في C الـ enum مجرد int بأسماء، فبيتطبع بـ [[%d]].

---

## ٣. [[color_name]]: switch على enum

~~~c
const char *color_name(enum Color c) {
    switch (c) {
        case RED: return "red";
        case GREEN: return "green";
        case BLUE: return "blue";
    }
    return "unknown";
}
~~~

- [[const char *]]: بترجّع عنوان نص ثابت للقراية بس.
- [[enum Color c]]: الـ parameter نوعه الـ enum (لاحظ إن [[enum]] جزء من اسم النوع في C، إلا لو عملت typedef).
- [[case RED: return "red";]]: الـ [[return]] بتخرج من الدالة كلها، فمش محتاج [[break]].
- [[return "unknown";]] بعد الـ switch: لو جت قيمة مش من الـ ٣ (C بتسمح بـ [[enum Color c = 42;]])، ولو شلت السطر ده gcc بينبّه: [[warning: control reaches end of non-void function [-Wreturn-type]]].

### الـ try: لون رابع

ضفت [[YELLOW]] للـ enum ومحطتهاش في الـ switch:

~~~text الناتج
L7y.c: In function 'color_name':
L7y.c:11:5: warning: enumeration value 'YELLOW' not handled in switch [-Wswitch]
   11 |     switch (c) {
      |     ^~~~~~
~~~

دي ميزة الـ enum: [[-Wall]] بيعرف كل القيم وبيقولك لو نسيت واحدة. ولو كان فيه [[default:]] مكانش هينبّه.

---

## ٤. [[const]]

~~~c
    const int limit = 3;
~~~

متغير عادي ليه نوع واسم، بس **مينفعش يتغيّر** بعد القيمة الأولى. جربت [[limit = 5;]]:

~~~text الناتج
L7c.c:22:11: error: assignment of read-only variable 'limit'
~~~

[[read-only]] = للقراية بس. وده error مش warning: الملف مبيطلعش.

---

## ٥. الطباعة

~~~c
    enum Color c = GREEN;
    printf("MAX_USERS=%d limit=%d\n", MAX_USERS, limit);
    printf("c=%d name=%s banned=%d\n", c, color_name(c), BANNED);
~~~

~~~text الناتج
MAX_USERS=100 limit=3
c=1 name=green banned=9
~~~

[[c]] بـ [[%d]] طلع 1 (GREEN)، و [[color_name(c)]] رجّعت [[green]].

---

## ٦. ليه الـ macro محتاج أقواس

~~~c
    printf("SQUARE_BAD(1 + 2)=%d SQUARE(1 + 2)=%d\n", SQUARE_BAD(1 + 2), SQUARE(1 + 2));
~~~

شفت السطر ده بعد الـ preprocessor بـ [[gcc -E]]:

~~~text الناتج (gcc -E)
    printf("SQUARE_BAD(1 + 2)=%d SQUARE(1 + 2)=%d\n", 1 + 2 * 1 + 2, ((1 + 2) * (1 + 2)));
~~~

- الـ [[MAX_USERS]] في السطر اللي قبله بقت [[100]] حرفيًا.
- [[SQUARE_BAD(1 + 2)]] بقت [[1 + 2 * 1 + 2]]: الضرب الأول، فـ 1 + 2 + 2 = **5**.
- [[SQUARE(1 + 2)]] بقت [[((1 + 2) * (1 + 2))]] = **9**.
- أقواس حوالين كل [[x]] عشان الـ argument يتحسب الأول، وأقواس حوالين الكل عشان لو كتبت [[10 / SQUARE(2)]] متتلخبطش مع اللي حواليه.
- النص جوه [[" "]] متغيّرش: الـ preprocessor مبيلمسش النصوص.

~~~text الناتج
SQUARE_BAD(1 + 2)=5 SQUARE(1 + 2)=9
~~~

### الـ try: [[SQUARE(i++)]]

~~~c
    int i = 2;
    int r = SQUARE(i++);
~~~

~~~text الناتج
warning: operation on 'i' may be undefined [-Wsequence-point]
SQUARE(i++)=6 i=4
~~~

بقت [[((i++) * (i++))]]: i زادت **مرتين** في نفس الجملة، وده undefined behavior. هنا طلع 2 × 3 = 6 و i = 4 (بـ [[-O0]] و [[-O2]])، بس مش مضمون على compiler تاني. ومفيش أقواس تحل ده: الحل دالة عادية.

---

## الخلاصة

| الطريقة | ليها نوع؟ | إمتى |
|---|---|---|
| [[#define N 100]] | لأ، تبديل نص | include guards وحاجات الـ preprocessor |
| [[const int n = 100;]] | أيوه | ثابت عادي |
| [[enum { A, B, C }]] | int بأسماء | مجموعة حالات، ومع switch |

- macro بـ parameters: أقواس حوالين كل parameter وحوالين الناتج، ومتبعتلوش [[i++]].
- [[gcc -E]] بيورّيك الكود بعد التبديل.`,
          lines: [
            "فيها printf.",
            R`ثابت بالـ preprocessor: كل MAX_USERS هتبقى 100.`,
            "macro غلط: من غير أقواس.",
            "macro صح: أقواس حوالين x وحوالين الناتج.",
            "enum: RED = 0 و GREEN = 1 و BLUE = 2.",
            "قيم محددة بإيدك.",
            R`دالة بترجّع اسم اللون. [[const char *]] = نص للقراية بس.`,
            "switch على enum.",
            R`[[return]] جوه case بتخرج من الدالة، فمش محتاج break.`,
            "اللون الأخضر.",
            "الأزرق.",
            "قفلة الـ switch.",
            "احتياطي لو جت قيمة مش في الـ enum.",
            "قفلة الدالة.",
            "بداية main.",
            R`[[const]]: مينفعش تتغير.`,
            "متغير من نوع الـ enum.",
            "الـ macro اتبدّل بـ 100 قبل الـ compile.",
            "الـ enum قيمته رقم: GREEN = 1.",
            "5 و 9: الفرق كله في الأقواس.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[MAX_USERS=100 limit=3]]
[[c=1 name=green banned=9]]
[[SQUARE_BAD(1 + 2)=5 SQUARE(1 + 2)=9]]

مع [[YELLOW]] من غير case:
[[warning: enumeration value 'YELLOW' not handled in switch [-Wswitch]]]

[[limit = 5;]]:
[[error: assignment of read-only variable 'limit']]

[[SQUARE(i++)]]: gcc بـ [[-Wall]] بيقول [[operation on 'i' may be undefined [-Wsequence-point]]]. والناتج اللي هتشوفه (غالبًا 6 و i بقت 4) مش مضمون، ممكن يختلف مع compiler أو optimization تاني.`
        },
        {
          cmd: "file I/O في C",
          title: "إزاي تكتب في ملف وتقرا منه سطر سطر في C (fopen و fprintf و fgets و fclose)؟",
          desc: R`الملفات في C بتتعامل معاها عن طريق [[FILE *]]: pointer لـ struct بتديره المكتبة، وانت مش محتاج تعرف جواه إيه.

• [[fopen(path, mode)]]: بتفتح الملف وترجّع [[FILE *]]، أو [[NULL]] لو فشلت (الملف مش موجود، أو مفيش صلاحية). الـ modes: [["r"]] قراية، و [["w"]] كتابة (بتمسح القديم أو تعمل ملف جديد)، و [["a"]] إضافة في الآخر. ولو ملف binary زوّد [[b]]: [["rb"]].
• [[fprintf(f, ...)]]: زي printf بالظبط بس بتكتب في الملف.
• [[fgets(buf, size, f)]]: بتقرا سطر كامل (لحد [[\n]]) أو لحد size - 1 حرف، وبتحط [[\0]] في الآخر. بترجّع [[NULL]] لما الملف يخلص. ودي الطريقة الآمنة لقراية أي input نصي.
• [[fclose(f)]]: بتقفل الملف. لازم، لأن الكتابة بتتجمع في buffer في الذاكرة، ومش بتتكتب على الديسك فعلًا غير لما الـ buffer يتملي أو تقفل.
• [[perror("msg")]]: بتطبع رسالتك وبعدها سبب آخر خطأ من النظام، زي [[No such file or directory]].

[[fgets]] بتسيب الـ [[\n]] في آخر السطر. [[strcspn(line, "\n")]] بترجّع مكان أول [[\n]] (أو طول النص لو مفيش)، فـ [[line[strcspn(line, "\n")] = '\0';]] بتشيله.

[[stdin]] و [[stdout]] و [[stderr]] نفسهم [[FILE *]] جاهزين، فـ [[fgets(buf, sizeof buf, stdin)]] بتقرا سطر من الكيبورد.`,
          example: R`#include <stdio.h>
#include <string.h>

int main(void) {
    FILE *out = fopen("notes.txt", "w");
    if (out == NULL) {
        perror("fopen notes.txt");
        return 1;
    }
    fprintf(out, "buy milk\n");
    fprintf(out, "study pointers\n");
    fclose(out);

    FILE *in = fopen("notes.txt", "r");
    if (in == NULL) {
        perror("fopen notes.txt");
        return 1;
    }
    char line[128];
    int n = 0;
    while (fgets(line, sizeof line, in) != NULL) {
        line[strcspn(line, "\n")] = '\0';
        printf("%d: %s\n", ++n, line);
    }
    fclose(in);
    return 0;
}`,
          try: R`غيّر [["w"]] لـ [["a"]] وشغّل البرنامج ٣ مرات: الملف بقى فيه كام سطر؟ وغيّر اسم ملف القراية لـ [[missing.txt]] وشوف رسالة perror. وبعدين اكتب برنامج [[mywc]] بياخد اسم ملف من [[argv[1]]] ويطبع عدد السطور والكلمات والحروف (زي أمر [[wc]]).`,
          flag: "script",
          deep: {
            why: "أي برنامج حقيقي بيقرا config أو بيحفظ داتا أو بيكتب logs. وطريقة الـ FILE * و fgets هي نفسها اللي هتلاقيها في كود C في كل حتة، و C++ بنت عليها ifstream و ofstream.",
            how: R`الـ [[FILE]] جواه buffer: [[fprintf]] بتكتب في الذاكرة، والمكتبة بتبعت للنظام لما الـ buffer يتملي أو تعمل [[fflush]] أو [[fclose]]. عشان كده لو البرنامج وقع قبل fclose ممكن آخر كلام ميتكتبش.

[[sizeof line]] من غير أقواس مسموحة مع متغير (مع نوع لازم أقواس: [[sizeof(int)]]).

على Windows الـ mode النصي بيحوّل [[\n]] لـ [[\r\n]] وهو بيكتب ويرجّعها وهو بيقرا، والـ [["b"]] بتلغي التحويل ده. على Linux مفيش فرق.`,
            when: R`[[fgets]] لأي قراية نصية سطر سطر (حتى من الكيبورد بدل scanf). [[fread]] و [[fwrite]] للملفات الـ binary. ولو هتعمل parsing جامد (CSV أو JSON) استخدم مكتبة.`,
            mistakes: R`متتشيّكش إن fopen رجّعت NULL، فأول fprintf توقع البرنامج. وتنسى fclose: ممكن الداتا متتكتبش، والبرنامج يخلص الـ file handles لو بيفتح ملفات كتير. وتفتح بـ [["w"]] ملف كنت عايز تضيف عليه فيتمسح. وتستخدم [[while (!feof(f))]] كشرط للـ loop: بتلف لفة زيادة. الصح تتشيّك على اللي fgets رجّعته.`
          },
          teach: R`## البرنامج بيعمل إيه؟

جزئين: الأول بيفتح [[notes.txt]] للكتابة ويكتب فيه سطرين ويقفله. التاني بيفتح نفس الملف للقراية ويقرا سطر سطر ويطبع كل سطر برقمه. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]].

~~~text الناتج
1: buy milk
2: study pointers
~~~

---

## ١. [[fopen]] للكتابة

~~~c
    FILE *out = fopen("notes.txt", "w");
    if (out == NULL) {
        perror("fopen notes.txt");
        return 1;
    }
~~~

- [[FILE]]: نوع (struct) معرّف في [[stdio.h]]، فيه كل حاجة عن الملف المفتوح: مكانه، والـ buffer، وإنت واقف فين. انت عمرك ما بتلمس جواه، بتمسك pointer ليه بس: [[FILE *]].
- [[fopen("notes.txt", "w")]]: افتح الملف ده (المسار نسبي للفولدر اللي انت شغّال منه). و [["w"]] = write: لو موجود **يتمسح** محتواه، ولو مش موجود يتعمل.
- لو فشلت (مفيش صلاحية، فولدر مش موجود) بترجّع [[NULL]].
- [[perror("...")]] (print error): بتطبع على stderr كلامك وبعده [[:]] وسبب آخر خطأ من النظام بالإنجليزي.

| الـ mode | معناه | لو الملف مش موجود |
|---|---|---|
| [["r"]] | قراية | [[NULL]] |
| [["w"]] | كتابة من الأول (يمسح القديم) | يتعمل |
| [["a"]] | append: كتابة في الآخر | يتعمل |
| [["rb"]] / [["wb"]] | نفس الكلام لملف binary | |

---

## ٢. الكتابة والقفل

~~~c
    fprintf(out, "buy milk\n");
    fprintf(out, "study pointers\n");
    fclose(out);
~~~

- [[fprintf(out, ...)]]: زي printf بالظبط، بس أول argument هو الملف.
- [[fclose(out)]]: اقفل. الكتابة بتتجمع في buffer في الذاكرة، و fclose هي اللي بتضمن إنها اتبعتت للنظام.

بصيت على الملف بـ [[cat -A notes.txt]] ([[-A]] بيورّي الحروف المخفية، و [[$]] = آخر سطر):

~~~text الناتج
buy milk$
study pointers$
~~~

---

## ٣. القراية سطر سطر

~~~c
    FILE *in = fopen("notes.txt", "r");
    ...
    char line[128];
    int n = 0;
    while (fgets(line, sizeof line, in) != NULL) {
~~~

- [["r"]]: افتح للقراية. (والـ if بعدها نفس فحص الـ NULL.)
- [[char line[128]]]: buffer للسطر.
- [[fgets(line, sizeof line, in)]] (file get string): اقرا من [[in]] لحد [[\n]] (وبتاخدها معاها) أو لحد 127 حرف، وحط [[\0]] في الآخر. عمرها ما بتكتب أكتر من [[sizeof line]].
- [[sizeof line]] من غير أقواس: مسموح مع متغير، ومع اسم نوع لازم أقواس.
- بترجّع [[NULL]] لما الملف يخلص، فالـ while بتقف.

---

## ٤. شيل الـ [[\n]]

~~~c
        line[strcspn(line, "\n")] = '\0';
~~~

من جوه لبرة:

- [[strcspn(line, "\n")]] (من [[string.h]]): بتعدّ الحروف من أول السطر لحد أول حرف من [["\n"]]. في [[buy milk\n]] بترجّع 8 (مكان الـ [[\n]]). ولو مفيش [[\n]] (آخر سطر من غير Enter) بترجّع طول النص، يعني مكان الـ [[\0]] أصلًا، فمفيش ضرر.
- [[line[8] = '\0']]: حط نهاية النص مكان الـ [[\n]].

من غيرها كل سطر هيطبع سطر فاضي بعده (الـ [[\n]] بتاعته + الـ [[\n]] بتاعة printf).

---

## ٥. الطباعة والقفل

~~~c
        printf("%d: %s\n", ++n, line);
    }
    fclose(in);
~~~

[[++n]] قبل الاسم: زوّد الأول وبعدين استخدم، فأول سطر رقمه 1.

---

## ٦. الـ try

### [["a"]] بدل [["w"]]، ٣ مرات

~~~text الناتج
$ wc -l notes.txt
6 notes.txt
~~~

[["a"]] بيضيف في الآخر، فكل تشغيل زوّد سطرين: 3 × 2 = 6.

### ملف مش موجود

~~~text الناتج
fopen missing.txt: No such file or directory
exit=1
~~~

الكلام اللي قبل [[:]] من عندك، و [[No such file or directory]] من النظام (الخطأ اللي اسمه ENOENT).

---

## ٧. الـ solCode: [[mywc]]

~~~c
    FILE *f = fopen(argv[1], "r");
    if (!f) {
        perror(argv[1]);
        return 1;
    }
    long lines = 0, words = 0, chars = 0;
    int c, in_word = 0;
    while ((c = fgetc(f)) != EOF) {
        chars++;
        if (c == '\n') lines++;
        if (isspace(c)) in_word = 0;
        else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
~~~

- [[fgetc(f)]]: اقرا حرف واحد. بترجّع [[int]] مش [[char]]، عشان تقدر ترجّع [[EOF]] (قيمة خاصة، غالبًا -1) لما الملف يخلص، من غير ما تتلخبط مع أي حرف حقيقي. عشان كده [[int c]].
- [[(c = fgetc(f)) != EOF]]: اقرا وحط في c، وبعدين قارن. الأقواس الداخلية لازمة لأن [[!=]] أولويتها أعلى من [[=]].
- [[isspace(c)]] من [[ctype.h]]: صح لو مسافة أو Tab أو [[\n]].
- [[in_word]]: علامة «أنا جوه كلمة». كلمة جديدة تبدأ لما نلاقي حرف مش مسافة وإحنا مش جوه كلمة.
- [[%ld]]: لـ [[long]].

قارنته بـ [[wc]] الحقيقي:

~~~text الناتج
$ ./mywc notes.txt
2 4 24 notes.txt
$ wc notes.txt
 2  4 24 notes.txt
$ ./mywc t.txt
3 6 30 t.txt
$ wc t.txt
 3  6 30 t.txt
~~~

([[t.txt]] فيه مسافتين ورا بعض و Tab وسطر فاضي وآخر سطر من غير [[\n]]، فالسطور 3 مش 4: wc بيعدّ الـ [[\n]].) ومن غير اسم ملف: [[usage: ./mywc FILE]]، وملف مش موجود: [[nope.txt: No such file or directory]]، والاتنين exit 1.

---

## الخلاصة

| الدالة | بتعمل إيه | بترجّع لما تفشل/تخلص |
|---|---|---|
| [[fopen(path, mode)]] | تفتح | [[NULL]] |
| [[fprintf(f, ...)]] | تكتب منسّق | |
| [[fgets(buf, size, f)]] | سطر | [[NULL]] |
| [[fgetc(f)]] | حرف (int) | [[EOF]] |
| [[fclose(f)]] | تقفل وتكتب الباقي | |
| [[perror(msg)]] | سبب الخطأ | |

- [["w"]] بيمسح، [["a"]] بيضيف.
- الـ loop على اللي fgets أو fgetc رجّعته، مش على [[feof]].`,
          lines: [
            "فيها FILE و fopen و fprintf و fgets.",
            R`فيها [[strcspn]].`,
            "بداية main.",
            R`افتح للكتابة. [["w"]] بتمسح أي محتوى قديم.`,
            "لو الفتح فشل.",
            "اطبع السبب من النظام.",
            "اخرج بفشل.",
            "قفلة الـ if.",
            "اكتب سطر في الملف.",
            "سطر تاني.",
            "اقفل: الكلام بيتكتب على الديسك فعلًا هنا.",
            R`افتح نفس الملف للقراية.`,
            "لو فشل.",
            "السبب.",
            "خروج.",
            "قفلة الـ if.",
            "buffer للسطر.",
            "عدّاد السطور.",
            R`اقرا سطر سطر لحد ما [[fgets]] ترجّع NULL (الملف خلص).`,
            R`شيل الـ [[\n]] من آخر السطر.`,
            R`[[++n]] بتزوّد الأول وبعدين تطبع: 1 ثم 2.`,
            "قفلة الـ while.",
            "اقفل ملف القراية.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[1: buy milk]]
[[2: study pointers]]

مع [["a"]] الملف بيكبر ٢ سطر كل تشغيل، فبعد ٣ مرات فيه ٦ سطور، والبرنامج بيطبعهم كلهم.

مع [[missing.txt]]:
[[fopen missing.txt: No such file or directory]]

[[mywc]]: لف بـ [[fgetc]] حرف حرف: زوّد الحروف كل مرة، والسطور لما تقابل [[\n]]، والكلمات لما تقابل حرف مش مسافة بعد مسافة. قارن ناتجك بـ [[wc file.txt]].`,
          solCode: R`#include <ctype.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "usage: %s FILE\n", argv[0]);
        return 1;
    }
    FILE *f = fopen(argv[1], "r");
    if (!f) {
        perror(argv[1]);
        return 1;
    }
    long lines = 0, words = 0, chars = 0;
    int c, in_word = 0;
    while ((c = fgetc(f)) != EOF) {
        chars++;
        if (c == '\n') lines++;
        if (isspace(c)) in_word = 0;
        else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    fclose(f);
    printf("%ld %ld %ld %s\n", lines, words, chars, argv[1]);
    return 0;
}`
        },
        {
          cmd: "أكتر من ملف و make",
          title: "إزاي تقسم برنامج C على أكتر من ملف (.h و .c)، وتعمله build بـ make؟",
          desc: R`لما البرنامج يكبر بتقسمه:
• ملف header ([[.h]]): فيه الـ prototypes والـ structs والثوابت، يعني «إيه اللي الملف ده بيقدّمه».
• ملف source ([[.c]]): فيه جسم الدوال نفسها.
• أي ملف عايز يستخدم الدوال دي بيعمل [[#include "math_utils.h"]]. علامات التنصيص [[" "]] (بدل [[< >]]) معناها «دوّر في فولدر المشروع الأول».

include guard: لو الـ header اتعمله include مرتين (ملف بيعمل include لملف بيعمل include لنفس الـ header)، التعريفات هتتكرر والـ compiler يزعّق. الحل ٣ سطور:
• [[#ifndef MATH_UTILS_H]]: لو الاسم ده مش متعرّف...
• [[#define MATH_UTILS_H]]: عرّفه، وكمّل الملف.
• [[#endif]]: آخر الملف.
تاني مرة الاسم هيبقى متعرّف، فالملف كله هيتنط. وفيه بديل أقصر بتدعمه كل الـ compilers المشهورة: [[#pragma once]] في أول الملف.

الـ build: كل [[.c]] بيتعمله compile لوحده لـ [[.o]]، وبعدين link:
[[gcc -c main.c]] و [[gcc -c math_utils.c]] و [[gcc main.o math_utils.o -o app]]
أو مرة واحدة: [[gcc main.c math_utils.c -o app]].

[[make]] بيعمل ده لوحده من ملف اسمه [[Makefile]]، وبيعيد بس الملفات اللي اتغيّرت. كل قاعدة شكلها:
[[target: dependencies]]
وتحتها الأمر، والسطر ده لازم يبدأ بـ Tab حقيقي مش مسافات.`,
          example: R`// ===== math_utils.h =====
#ifndef MATH_UTILS_H
#define MATH_UTILS_H
int add(int a, int b);
int clamp(int x, int lo, int hi);
#endif
// ===== math_utils.c =====
#include "math_utils.h"
int add(int a, int b) { return a + b; }
int clamp(int x, int lo, int hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}
// ===== main.c =====
#include <stdio.h>
#include "math_utils.h"
int main(void) {
    printf("%d %d\n", add(2, 3), clamp(150, 0, 100));
    return 0;
}`,
          try: R`اعمل الـ ٣ ملفات في فولدر واحد واعمل build بأمر gcc واحد. وبعدين اكتب [[Makefile]] فيه قاعدة لـ app وقاعدة لكل [[.o]] وقاعدة [[clean]]، وشغّل [[make]] مرتين: التانية عملت إيه؟ وبعدين اعمل [[touch math_utils.c]] و [[make]]. وآخر حاجة: اعمل build من غير [[math_utils.c]] في الأمر: الخطأ ده compile ولا link؟`,
          flag: "script",
          deep: {
            why: R`مفيش مشروع حقيقي في ملف واحد. والتقسيم ده بيخلّي الـ build أسرع (بتعيد compile للي اتغيّر بس)، وبيفصل «الواجهة» (الـ header) عن «التنفيذ» (الـ .c)، وده نفس شكل أي مكتبة C بتستخدمها.`,
            how: R`[[#include]] بتنسخ الـ header جوه كل ملف [[.c]] بيطلبه. فالـ prototypes بتوصل لكل ملف، بس جسم الدالة موجود في ملف واحد بس ([[math_utils.o]])، والـ linker هو اللي بيوصّل النداء بالتعريف. لو جسم الدالة في الـ header، وملفين عملوا include ليه، الـ linker هيلاقي الدالة مرتين: [[multiple definition of $__btadd']].

[[make]] بيقارن وقت تعديل الملف بوقت تعديل الـ dependencies بتاعته. لو أي dependency أحدث، بيعيد الأمر. عشان كده [[main.o]] لازم يعتمد على [[math_utils.h]] كمان: لو غيّرت الـ header لازم main.c يتعمله compile تاني.

[[$(CC)]] و [[$(CFLAGS)]] متغيرات في الـ Makefile، و [[.PHONY: clean]] معناها إن clean مش اسم ملف.`,
            when: R`أول ما البرنامج يعدّي كام مية سطر، أو فيه جزء ممكن يتستخدم في برنامج تاني. make كويس للمشاريع الصغيرة وموجود في كل حتة. للمشاريع الأكبر أو اللي لازم تشتغل على Windows كمان، CMake (المستوى ٢).`,
            mistakes: R`تحط جسم دالة (مش prototype) في الـ header. وتنسى الـ include guard. وتعمل [[#include "math_utils.c"]]: بتعمل include لملفات [[.h]] بس. ومسافات بدل Tab في الـ Makefile: [[missing separator]]. وتنسى ملف في أمر الـ link: [[undefined reference to $__btclamp']].`
          },
          teach: R`## المثال بيعمل إيه؟

المثال **٣ ملفات** في صندوق واحد، والسطور اللي زي [[// ===== math_utils.h =====]] بتقولك كل حتة تتحط في أنهي ملف: header فيه شكل دالتين، و [[.c]] فيه جسمهم، و [[main.c]] بيستخدمهم. وبعدين بنعمل build بـ gcc ومرة بـ make. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0، و make جاية مع الصورة).

---

## ١. [[math_utils.h]]: الواجهة

~~~c
#ifndef MATH_UTILS_H
#define MATH_UTILS_H
int add(int a, int b);
int clamp(int x, int lo, int hi);
#endif
~~~

- السطرين اللي في النص prototypes بس: «فيه دالة اسمها add بتاخد int و int وبترجّع int». مفيش جسم.
- الـ include guard (التلات سطور اللي بتبدأ بـ [[#]]):
  - [[#ifndef MATH_UTILS_H]]: if not defined. «لو الاسم ده لسه محدش عرّفه، كمّل. غير كده اتنط لحد [[#endif]]».
  - [[#define MATH_UTILS_H]]: عرّف الاسم. مش محتاج قيمة، المهم إنه بقى متعرّف.
  - [[#endif]]: آخر الـ if.
- النتيجة: أول [[#include]] للملف بيدخل، وأي include تاني في نفس الـ [[.c]] بيلاقي الاسم متعرّف فيتنط. الاسم نفسه أي حاجة فريدة، والعُرف اسم الملف بحروف كبيرة.

---

## ٢. [[math_utils.c]]: التنفيذ

~~~c
#include "math_utils.h"
int add(int a, int b) { return a + b; }
int clamp(int x, int lo, int hi) {
    if (x < lo) return lo;
    if (x > hi) return hi;
    return x;
}
~~~

- [[#include "math_utils.h"]]: الملف بيعمل include للـ header بتاعه، عشان لو الـ prototype والتعريف اختلفوا (نوع parameter مثلًا) الـ compiler يقولك.
- [[" "]] بدل [[< >]]: دوّر في فولدر الملف الأول، وبعدين فولدرات النظام.
- [[clamp]]: «حط x جوه الحدود»: لو أقل من [[lo]] رجّع lo، لو أكبر من [[hi]] رجّع hi، غير كده x زي ما هو.

---

## ٣. [[main.c]]

~~~c
#include <stdio.h>
#include "math_utils.h"
int main(void) {
    printf("%d %d\n", add(2, 3), clamp(150, 0, 100));
    return 0;
}
~~~

main.c مشافش جسم add ولا clamp، شاف الـ prototypes بس، وده كفاية للـ compile.

---

## ٤. build بأمر واحد

~~~bash
gcc -std=c17 -Wall -Wextra main.c math_utils.c -o app
./app
~~~

~~~text الناتج
5 100
~~~

[[add(2, 3)]] = 5، و [[clamp(150, 0, 100)]] = 100 (150 أكبر من الحد). وgcc هنا عمل compile لكل [[.c]] لوحده، وبعدين link للاتنين.

### من غير [[math_utils.c]]

~~~bash
gcc -std=c17 -Wall -Wextra main.c -o app2
~~~

~~~text الناتج
/usr/bin/ld: /tmp/ccYj9jg6.o: in function $__btmain':
main.c:(.text+0x19): undefined reference to $__btclamp'
/usr/bin/ld: main.c:(.text+0x2a): undefined reference to $__btadd'
collect2: error: ld returned 1 exit status
~~~

ده خطأ **link**: main.c اتعمله compile من غير مشاكل (الـ prototypes موجودة)، وبعدين [[ld]] (الـ linker) دوّر على جسم clamp و add في كل الملفات ملقاهمش. [[/tmp/ccYj9jg6.o]] ملف [[.o]] مؤقت عمله gcc، و [[collect2]] البرنامج اللي gcc بيشغّل بيه الـ linker.

---

## ٥. الـ Makefile (الـ solCode)

~~~text Makefile
CC = gcc
CFLAGS = -std=c17 -Wall -Wextra -g

app: main.o math_utils.o
	$(CC) $(CFLAGS) main.o math_utils.o -o app

main.o: main.c math_utils.h
	$(CC) $(CFLAGS) -c main.c

math_utils.o: math_utils.c math_utils.h
	$(CC) $(CFLAGS) -c math_utils.c

clean:
	rm -f *.o app

.PHONY: clean
~~~

- [[CC = gcc]] و [[CFLAGS = ...]]: متغيرات. [[$(CC)]] بيتبدّل بقيمتها. (CC = C compiler، و CFLAGS = الـ flags.) لو عايز تغيّر الـ compiler بتغيّره في سطر واحد.
- كل قاعدة: [[target: dependencies]] وتحتها الأمر اللي بيعمل الـ target. والأمر **لازم** يبدأ بـ Tab حقيقي.
- [[app: main.o math_utils.o]]: «app محتاج الملفين دول». make بيعمل الـ dependencies الأول.
- [[main.o: main.c math_utils.h]]: الـ header في الـ dependencies، عشان لو اتغيّر main.c يتعمله compile تاني.
- [[-c]]: compile لـ [[.o]] من غير link (درس compile و link).
- [[clean]]: قاعدة ملهاش dependencies، بتمسح الناتج. و [[.PHONY: clean]] بتقول لـ make إن clean مش اسم ملف، فتتنفذ دايمًا حتى لو فيه ملف اسمه clean.
- أول قاعدة في الملف ([[app]]) هي اللي [[make]] لوحده بيعملها.

---

## ٦. [[make]] مرتين

~~~text أول make
gcc -std=c17 -Wall -Wextra -g -c main.c
gcc -std=c17 -Wall -Wextra -g -c math_utils.c
gcc -std=c17 -Wall -Wextra -g main.o math_utils.o -o app
~~~

make بيطبع كل أمر قبل ما ينفّذه. عمل الـ [[.o]] الاتنين الأول وبعدين الـ link.

~~~text تاني make
make: 'app' is up to date.
~~~

make بيقارن **وقت التعديل**: app أحدث من main.o و math_utils.o، وهما أحدث من الـ [[.c]] والـ [[.h]]، فمفيش حاجة تتعمل.

### بعد [[touch math_utils.c]]

[[touch]] بيحدّث وقت تعديل الملف من غير ما يغيّره:

~~~text الناتج
gcc -std=c17 -Wall -Wextra -g -c math_utils.c
gcc -std=c17 -Wall -Wextra -g main.o math_utils.o -o app
~~~

math_utils.c بس اتعمله compile، و main.o اتساب، وبعدين link. في مشروع فيه مية ملف ده الفرق بين ثانية ودقايق.

### [[make clean]]

~~~text الناتج
rm -f *.o app
~~~

وفضلت الملفات الأصلية بس.

### مسافات بدل Tab

غيّرت الـ Tab لـ ٤ مسافات:

~~~text الناتج
Makefile.sp:5: *** missing separator.  Stop.
~~~

السطر 5 هو أول أمر. الرسالة مش واضحة، بس معناها دايمًا تقريبًا «فيه مسافات مكان Tab».

---

## الخلاصة

| الملف | فيه |
|---|---|
| [[.h]] | prototypes و structs وثوابت، جوه include guard |
| [[.c]] | جسم الدوال، وبيعمل include للـ [[.h]] بتاعه |
| [[Makefile]] | [[target: deps]] + أمر بـ Tab |

- [[undefined reference]] = ملف [[.c]] ناقص في أمر الـ link.
- make بيعيد بس اللي dependencies بتاعته اتغيّرت.`,
          lines: [
            R`[[#ifndef]]: لو الاسم ده لسه متعرّفش (أول مرة الملف يتقري)...`,
            R`[[#define]]: عرّفه، عشان تاني مرة الملف يتنط.`,
            "prototype: الملفات التانية تعرف شكل add.",
            "prototype لـ clamp.",
            R`[[#endif]]: قفلة الـ [[#ifndef]].`,
            R`الـ .c بيعمل include للـ header بتاعه، عشان الـ compiler يتأكد إن التعريف زي الـ prototype.`,
            "جسم add في سطر واحد.",
            "جسم clamp.",
            "لو أقل من الحد الأدنى رجّع الحد.",
            "لو أكبر من الأعلى رجّع الأعلى.",
            "غير كده رجّعه زي ما هو.",
            "قفلة clamp.",
            R`[[< >]]: header من النظام.`,
            R`[[" "]]: header من المشروع.`,
            "main.",
            "بتنادي الدوال اللي متعرّفة في ملف تاني.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`[[gcc -std=c17 -Wall -Wextra main.c math_utils.c -o app && ./app]] بيطبع [[5 100]].

أول [[make]] بيعمل compile للملفين و link. التانية بتقول [[make: 'app' is up to date.]]. وبعد [[touch math_utils.c]]، make بيعيد compile لـ math_utils.c بس، وبعدين link.

من غير [[math_utils.c]]: ده خطأ link، لأن main.c نفسه اتعمله compile تمام (الـ prototype موجود):
[[undefined reference to $__btadd']]
[[collect2: error: ld returned 1 exit status]]
([[ld]] هو الـ linker.)

الـ Makefile (السطور اللي تحت كل قاعدة لازم تبدأ بـ Tab):`,
          solCode: R`CC = gcc
CFLAGS = -std=c17 -Wall -Wextra -g

app: main.o math_utils.o
	$(CC) $(CFLAGS) main.o math_utils.o -o app

main.o: main.c math_utils.h
	$(CC) $(CFLAGS) -c main.c

math_utils.o: math_utils.c math_utils.h
	$(CC) $(CFLAGS) -c math_utils.c

clean:
	rm -f *.o app

.PHONY: clean`
        },
        {
          cmd: "undefined behavior",
          title: "يعني إيه undefined behavior، وليه البرنامج الغلط ممكن يشتغل عادي؟ (segfault و buffer overflow و use after free)",
          desc: R`معيار C (و C++) فيه حاجات بيقول عليها «undefined behavior» (UB): لو حصلت، اللغة مش ملزمة بأي نتيجة. البرنامج ممكن يقع، أو يطلّع رقم غلط، أو يشتغل عادي خالص، أو يتصرف كويس على جهازك ويقع عند العميل. والـ compiler مسموحله يفترض إن الـ UB عمره ما هيحصل، ويعمل optimization على الأساس ده.

أشهرهم:
• القراية أو الكتابة بره حدود array (buffer overflow).
• [[*]] على [[NULL]] أو على pointer ملوش قيمة.
• استخدام ذاكرة بعد [[free]] (use after free)، أو free مرتين.
• متغير محلي بتقرا قيمته قبل ما تديله قيمة.
• overflow في [[int]] (signed). في unsigned مش UB، بيلف.
• القسمة على صفر في الأرقام الصحيحة.
• تغيير متغير مرتين في نفس الجملة ([[i = i++]]).

segmentation fault (segfault): نظام التشغيل بيقفل البرنامج لأنه لمس ذاكرة مش بتاعته. ده أحسن نتيجة ممكنة للـ UB، لأنه بيقولك فيه مشكلة. الأسوأ إن البرنامج يكمّل بداتا بايظة.

المثال برنامج فيه ٤ أخطاء، بتختار واحد منهم برقم من الترمنال. [[atoi]] بتحوّل نص لرقم ([["2"]] لـ 2).`,
          example: R`#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int main(int argc, char *argv[]) {
    int which = argc > 1 ? atoi(argv[1]) : 0;
    int arr[3] = {1, 2, 3};
    int *p = NULL;
    char *name = malloc(8);
    int big = INT_MAX;
    if (which == 1) printf("arr[3] = %d\n", arr[which + 2]);
    if (which == 2) *p = 42;
    if (which == 3) {
        free(name);
        name[0] = 'X';
        return 0;
    }
    if (which == 4) printf("INT_MAX + 4 = %d\n", big + which);
    printf("done (case %d)\n", which);
    free(name);
    return 0;
}`,
          try: R`اعمل compile بـ [[gcc -std=c17 -Wall -Wextra -g ub.c -o ub]] واقرا الـ warning. وبعدين شغّل [[./ub 1]] و [[./ub 2]] و [[./ub 3]] و [[./ub 4]]، وبعد كل واحد [[echo $?]]. مين وقع ومين كمّل عادي؟ وبعدين اعمل compile تاني بـ [[-O2]] وشغّل [[./ub 1]]: نفس الرقم؟ (احتفظ بالملف ده للدرس الجاي).`,
          flag: "script",
          deep: {
            why: R`ده أهم فرق بين C/C++ واللغات اللي بتحميك. في Python لو قريت بره الـ list بيطلع [[IndexError]] على طول. في C البرنامج بيكمّل، والغلط ممكن يبان بعد ساعات في مكان تاني، أو ميبانش غير لما حد يستغله. أغلب الثغرات الأمنية الكبيرة في برامج C و C++ (زي Heartbleed في OpenSSL سنة ٢٠١٤) أخطاء ذاكرة من النوع ده.`,
            how: R`ليه اللغة بتسيبها undefined بدل ما تمنعها؟ عشان المنع بيكلّف: فحص حدود في كل وصول لـ array، وفحص overflow في كل جمع. C اختارت السرعة وسابت المسؤولية للمبرمج.

والـ compiler بيستغل ده: لو كتبت [[if (x + 1 < x)]] عشان تمسك الـ overflow، الـ compiler ممكن يشيل الشرط خالص، لأن x + 1 في int «مينفعش» يبقى أقل من x من غير UB. عشان كده النتايج بتتغير بين [[-O0]] و [[-O2]].

case 1 هنا بيقرا الـ int اللي بعد الـ array في الـ stack بالصدفة (ممكن يكون big أو أي حاجة). case 2 segfault. case 3 غالبًا بيعدّي بهدوء، لأن الذاكرة المحررة لسه مع البرنامج. case 4 بيلف لسالب على x86 في الغالب، بس ده مش مضمون.`,
            when: R`في كل سطر C و C++ بتكتبه. والدفاع: [[-Wall -Wextra]] دايمًا، والـ sanitizers وانت بتجرّب (الدرس الجاي)، وفحص الحدود والـ NULL بنفسك، وفي C++ استخدام [[std::vector]] و [[std::string]] و smart pointers بدل الـ pointers الخام.`,
            mistakes: R`تفتكر إن «البرنامج اشتغل» معناها إنه صح. وتقول «على جهازي شغال». وتحاول تمسك signed overflow بعد ما يحصل بدل ما تمنعه قبلها ([[if (a > INT_MAX - b)]]). وتعتمد على قيمة متغير ملوش قيمة أولية لأنها «طلعت صفر» مرة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

برنامج فيه ٤ غلطات undefined behavior، وكل تشغيلة بتختار واحدة برقم من الترمنال: قراية بره array، و [[*]] على NULL، وكتابة بعد [[free]]، و overflow في int. الهدف تشوف بعينك إن ٣ منهم البرنامج «اشتغل» فيهم عادي. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra -g ub.c -o ub]].

---

## ١. التجهيز

~~~c
#include <limits.h>

int main(int argc, char *argv[]) {
    int which = argc > 1 ? atoi(argv[1]) : 0;
    int arr[3] = {1, 2, 3};
    int *p = NULL;
    char *name = malloc(8);
    int big = INT_MAX;
~~~

- [[atoi(argv[1])]] (ASCII to integer، من [[stdlib.h]]): بتحوّل النص [["2"]] للرقم 2. ولو النص مش رقم بترجّع 0 من غير ما تقولك (عشان كده في كود حقيقي [[strtol]] أحسن).
- [[argc > 1 ? ... : 0]]: لو مفيش argument، which = 0 ومفيش غلطة هتحصل.
- [[arr]] فيها 3 عناصر: الـ indexes المسموحة 0 و 1 و 2 بس.
- [[p]] = NULL، و [[name]] = 8 byte على الـ heap، و [[big]] = أكبر int.

---

## ٢. case 1: قراية بره الـ array

~~~c
    if (which == 1) printf("arr[3] = %d\n", arr[which + 2]);
~~~

[[which + 2]] = 3، يعني [[arr[3]]]: العنصر الرابع في array فيها ٣. الـ index مكتوب كحساب عشان الـ compiler ميكتشفهاش وقت الـ compile.

~~~text ./ub 1
arr[3] = 2147483647
done (case 1)
exit=0
~~~

قرا [[2147483647]] = قيمة [[big]] اللي الـ compiler حطها في الـ stack جنب الـ array بالصدفة. البرنامج كمّل وطبع done وخرج بـ 0 كأن كله تمام.

ونفس الكود بـ [[-O2]] شغّلته مرتين: [[arr[3] = 1750686696]] ومرة [[arr[3] = -2036542136]]. الـ optimization غيّر مكان المتغيرات، فبقى بيقرا زبالة مختلفة كل مرة.

---

## ٣. case 2: [[*]] على NULL

~~~c
    if (which == 2) *p = 42;
~~~

~~~text ./ub 2
Segmentation fault (core dumped)
exit=139
~~~

- [[*p = 42]]: اكتب في العنوان 0. النظام مش بيسمح بالعنوان ده خالص، فبعت للبرنامج إشارة [[SIGSEGV]] (segmentation violation) وقفله.
- [[core dumped]]: النظام ممكن يحفظ صورة من ذاكرة البرنامج لحظة الوقوع (core file) عشان تفتحها في gdb بعدين.
- [[139]] = 128 + 11، و 11 رقم SIGSEGV. أي exit code أكبر من 128 معناه «اتقفل بإشارة رقم (الكود − 128)».
- ده **أحسن** نتيجة للـ UB: على الأقل عرفت.

---

## ٤. case 3: use after free

~~~c
    if (which == 3) {
        free(name);
        name[0] = 'X';
        return 0;
    }
~~~

- [[free(name)]] رجّع الذاكرة، وبعدها [[name[0] = 'X']] كتب فيها.
- [[return 0]] جوه الـ if عشان البرنامج ميوصلش للـ [[free(name)]] اللي تحت ويعمل free تانية (double free).

~~~text ./ub 3
exit=0
~~~

ولا كلمة. الذاكرة المحررة لسه مع مكتبة C ومرجعتش للنظام، فمحدش اشتكى. في برنامج حقيقي الـ malloc الجاية ممكن تدّي نفس المكان لحاجة تانية، والـ X تبوّظها.

بس gcc 14 مسكها وقت الـ compile:

~~~text الـ warning
ub.c:15:17: warning: pointer 'name' used after 'free' [-Wuse-after-free]
   15 |         name[0] = 'X';
      |         ~~~~~~~~^~~~~
ub.c:14:9: note: call to 'free' here
   14 |         free(name);
~~~

---

## ٥. case 4: signed overflow

~~~c
    if (which == 4) printf("INT_MAX + 4 = %d\n", big + which);
~~~

~~~text ./ub 4
INT_MAX + 4 = -2147483645
done (case 4)
exit=0
~~~

[[2147483647 + 4]] مش داخل في int. على x86 الـ CPU بيلف (زي الـ unsigned): [[INT_MIN + 3]] = [[-2147483648 + 3]] = [[-2147483645]]. بس اللغة **مش** بتضمن ده، والـ compiler مسموحله يفترض إنه مش هيحصل ويعمل optimization على الأساس ده.

---

## ٦. النهاية العادية

~~~c
    printf("done (case %d)\n", which);
    free(name);
    return 0;
~~~

لو وصلنا هنا يبقى البرنامج كمّل. و [[./ub]] من غير رقم بيطبع [[done (case 0)]].

---

## ٧. الخلاصة: مين وقع؟

| case | الغلط | اللي حصل (gcc 14، [[-O0]]) | exit |
|---|---|---|---|
| 1 | قراية [[arr[3]]] | طبع رقم من الذاكرة اللي جنبها | 0 |
| 2 | [[*NULL = 42]] | Segmentation fault | 139 |
| 3 | كتابة بعد free | ولا حاجة | 0 |
| 4 | [[INT_MAX + 4]] | رقم سالب | 0 |

- ٣ من ٤ «اشتغلوا». «البرنامج اشتغل» مش معناها إنه صح.
- النتيجة بتتغيّر مع [[-O2]] ومع compiler أو جهاز تاني.
- الدرس الجاي: gdb بيوريك case 2 وقع فين، والـ sanitizers بيخلّوا 1 و 3 و 4 يتمسكوا عند السطر بالظبط. احتفظ بـ [[ub.c]].`,
          lines: [
            "فيها printf.",
            R`فيها [[atoi]] و [[malloc]] و [[free]].`,
            R`فيها [[INT_MAX]].`,
            "main بـ arguments.",
            R`الرقم من الترمنال، و 0 لو مفيش. [[atoi]] بتحوّل النص لرقم.`,
            "array من ٣: الـ indexes المسموحة 0 و 1 و 2.",
            "pointer مش بيشاور على حاجة.",
            "8 bytes على الـ heap.",
            "أكبر int.",
            "case 1: index 3 بره الـ array (buffer overflow في القراية).",
            R`case 2: [[*]] على NULL.`,
            "case 3.",
            "حرر الذاكرة...",
            "...واكتب فيها بعد كده (use after free).",
            "اخرج (عشان متعملش free تاني).",
            "قفلة.",
            "case 4: signed overflow.",
            "لو وصلنا هنا يبقى البرنامج كمّل.",
            "free عادية.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الـ warning وقت الـ compile (gcc 14 لقى case 3 لوحده):
[[warning: pointer 'name' used after 'free' [-Wuse-after-free]]]

اللي حصل عندي (gcc 14، Linux، [[-O0]]):
• [[./ub 1]]: طبع [[arr[3] = 2147483647]] (قرا big اللي جنب الـ array بالصدفة) و [[done (case 1)]]، و exit code 0. البرنامج «اشتغل».
• [[./ub 2]]: [[Segmentation fault (core dumped)]] و exit code 139 (128 + رقم الإشارة SIGSEGV اللي هو 11).
• [[./ub 3]]: ولا حاجة، exit code 0. كتب في ذاكرة محررة ومحدش اشتكى.
• [[./ub 4]]: [[INT_MAX + 4 = -2147483645]] و done.

بـ [[-O2]]، [[./ub 1]] طبع رقم تاني خالص (عندي [[-2007785912]]). نفس الكود، رقم مختلف: ده الـ UB. الأرقام عندك ممكن تختلف، والمهم إن ٣ من الـ ٤ أخطاء عدّوا من غير crash.`
        },
        {
          cmd: "gdb و sanitizers",
          title: "إزاي تعرف البرنامج وقع فين بـ gdb، وتمسك أخطاء الذاكرة بـ -fsanitize=address؟",
          desc: R`أداتين لازم تتعلمهم بدري:

١. gdb (الـ debugger): بيشغّل برنامجك تحت المراقبة. لو وقع، بيوقف عند السطر اللي وقع فيه ويوريك المتغيرات. ولازم تعمل compile بـ [[-g]] (عشان يعرف أرقام السطور والأسماء) و [[-O0]] (عشان المتغيرات متتشالش).

أهم أوامره:
• [[run]] (أو [[r]]): شغّل. و [[gdb --args ./app 2]] بتدّيله الـ arguments.
• [[bt]] (backtrace): مين نادى مين لحد السطر اللي وقع فيه.
• [[print x]] (أو [[p x]]): قيمة متغير. و [[info locals]]: كل المتغيرات المحلية.
• [[break file.c:12]] (أو [[b]]): وقّف عند سطر معيّن قبل ما يتنفذ. و [[next]] ([[n]]): السطر اللي بعده. و [[step]] ([[s]]): ادخل جوه الدالة. و [[continue]] ([[c]]): كمّل.
• [[quit]]: اخرج.
على الماك الـ debugger اسمه [[lldb]] وأوامره قريبة، وفي VS Code الاتنين بيشتغلوا من زرار Run and Debug.

٢. الـ sanitizers: الـ compiler بيحط فحوصات جوه البرنامج نفسه وقت التشغيل. [[-fsanitize=address]] (ASan) بيمسك الكتابة والقراية بره الحدود، والـ use after free، والـ leaks على Linux. و [[-fsanitize=undefined]] (UBSan) بيمسك signed overflow والقسمة على صفر وحاجات تانية. البرنامج بيبقى أبطأ (حوالي الضعف مع ASan)، فده للتطوير والـ tests بس.

الفرق المهم: من غيرهم، الـ UB ممكن ميبانش (زي case 1 و 3 في الدرس اللي فات). معاهم، البرنامج بيقف عند أول غلط ويقولك السطر بالظبط.`,
          example: R`# compile بمعلومات للـ debugger ومن غير optimization
gcc -std=c17 -Wall -Wextra -g -O0 ub.c -o ub
gdb --args ./ub 2
(gdb) run
(gdb) bt
(gdb) print p
(gdb) info locals
(gdb) quit
# نفس الملف مع ASan و UBSan
gcc -std=c17 -g -fsanitize=address,undefined ub.c -o ub_asan
./ub_asan 1
./ub_asan 3
./ub_asan 4`,
          try: R`استخدم ملف [[ub.c]] من الدرس اللي فات. اعمل الخطوات دي واقرا كل ناتج. وبعدين في gdb جرّب [[break ub.c:11]] قبل [[run]]، وبعدين [[print arr]] و [[print which]] و [[next]]. وآخر حاجة: شغّل برنامج الـ realloc من درس malloc بعد ما تمسح الـ free، بـ [[-fsanitize=address]].`,
          deep: {
            why: R`من غير debugger هتقعد تحط [[printf]] في كل حتة عشان تعرف وقع فين. ومن غير sanitizers أخطاء الذاكرة اللي مش بتوقع البرنامج هتفضل مستخبية لحد ما تظهر في مكان تاني. الأداتين دول بيوفّروا ساعات، وبيخلّوا الـ UB اللي في الدرس اللي فات يبان على طول.`,
            how: R`[[-g]] بيحط جدول جوه الملف التنفيذي يربط كل عنوان في الكود بالسطر والملف، وده اللي gdb بيقراه. ASan بيحجز مساحات «ممنوعة» (redzones) حوالين كل array وكل malloc، ويعلّم الذاكرة المحررة إنها ممنوعة لفترة، وبيحط فحص قبل كل قراية وكتابة. لو لمست مساحة ممنوعة بيوقف ويطبع: نوع الغلط، والسطر، ومين حجز الذاكرة دي ومين حررها.

ASan و UBSan متاحين في gcc و clang على Linux و Mac، و ASan في MSVC كمان ([[/fsanitize=address]]). الـ leak detection جزء من ASan على Linux، وعلى الماك مش متاح افتراضيًا.`,
            when: R`gdb لما البرنامج يقع أو يطلّع ناتج غلط ومش فاهم ليه. الـ sanitizers طول ما انت بتطوّر وفي الـ tests: اعمل لنفسك أمر build بيهم واستخدمه على طول. ولو برنامج مالتي threads، فيه [[-fsanitize=thread]] (المستوى ٣).`,
            mistakes: R`تعمل debug لنسخة متعملها compile بـ [[-O2]] من غير [[-g]]: مفيش أرقام سطور والمتغيرات «optimized out». وتشغّل الـ sanitizers مع [[valgrind]] في نفس الوقت (مينفعش). وتسلّم نسخة فيها [[-fsanitize]]: أبطأ، ومش معمولة للإنتاج. وتتجاهل أول error وتدوّر على اللي بعده: أول واحد غالبًا هو السبب.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

بتاخد [[ub.c]] بتاع الدرس اللي فات وتعمل حاجتين: تشغّل case 2 جوه gdb عشان تعرف وقع فين وإيه قيم المتغيرات ساعتها، وتعمل compile بالـ sanitizers عشان case 1 و 3 و 4 اللي كانوا بيعدّوا بهدوء يتمسكوا. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0)، و gdb اتسطّب جوه الـ container بـ [[apt-get install gdb]] وطلع [[GNU gdb (Debian 16.3-1) 16.3]]. الأوامر اللي بتبدأ بـ [[(gdb)]] بتتكتب جوه gdb بعد ما يفتح، مش في الترمنال.

---

## ١. compile للـ debugger

~~~bash
gcc -std=c17 -Wall -Wextra -g -O0 ub.c -o ub
~~~

- [[-g]]: حط جوه الملف جدول بيربط كل عنوان في الكود بالملف ورقم السطر، وأسماء المتغيرات وأنواعها. من غيره gdb هيوريك عناوين hex بس.
- [[-O0]]: من غير optimization، عشان كل متغير يفضل موجود في مكانه وكل سطر يتنفذ بترتيبه. مع [[-O2]] هتشوف [[<optimized out>]] مكان قيم كتير.

---

## ٢. [[gdb --args ./ub 2]]

- [[gdb]]: الـ GNU debugger.
- [[--args]]: «اللي بعدي هو البرنامج والـ arguments بتاعته». من غيرها gdb هيفتكر الـ [[2]] اسم ملف core أو رقم process يتعلّق بيه، مش argument للبرنامج.
- بيفتح ويستنى أوامرك عند [[(gdb)]]. البرنامج لسه مبدأش.

---

## ٣. [[(gdb) run]]

شغّل البرنامج لحد ما يخلص أو يقع:

~~~text الناتج
Program received signal SIGSEGV, Segmentation fault.
0x00000000004011e7 in main (argc=2, argv=0x7ffd312cc708) at ub.c:12
12	    if (which == 2) *p = 42;
~~~

- [[SIGSEGV]]: نفس الإشارة اللي قفلت البرنامج في الدرس اللي فات، بس gdb مسكها ووقّف البرنامج **مكانه** بدل ما يموت.
- [[0x00000000004011e7]]: عنوان التعليمة اللي وقعت.
- [[in main (argc=2, argv=...)]]: جوه أنهي دالة، وقيم الـ parameters بتاعتها.
- [[at ub.c:12]] والسطر نفسه تحتها: ده اللي [[-g]] بيدّيهولك.

وفي Docker طلع قبلها [[warning: Error disabling address space randomization: Operation not permitted]]: gdb بيحاول يقفل الـ ASLR عشان العناوين تبقى ثابتة بين التشغيلات، والـ container مش سامح. مش مشكلة، العناوين بس هتتغيّر.

---

## ٤. [[(gdb) bt]]

[[bt]] = backtrace: سلسلة النداءات من الدالة اللي وقعت لحد main.

~~~text الناتج
#0  0x00000000004011e7 in main (argc=2, argv=0x7ffd312cc708) at ub.c:12
~~~

هنا سطر واحد ([[#0]]) لأن الوقوع جوه main نفسها. لو كان جوه دالة جوه دالة، كنت هتشوف [[#0]] الدالة اللي وقعت و [[#1]] اللي نادتها وهكذا لحد main. ده أول أمر تكتبه بعد أي crash.

---

## ٥. [[(gdb) print p]]

~~~text الناتج
$1 = (int *) 0x0
~~~

- [[print]] (أو [[p]]): اطبع قيمة أي متغير أو تعبير (تقدر تكتب [[print which + 1]] أو [[print arr[1]]]).
- [[$1]]: gdb بيدّي كل نتيجة رقم عشان ترجعلها ([[print $1]]).
- [[(int *) 0x0]]: نوعه [[int *]] وقيمته 0، يعني NULL. السبب واضح.

---

## ٦. [[(gdb) info locals]]

كل المتغيرات المحلية في الدالة الحالية مرة واحدة:

~~~text الناتج
which = 2
arr = {1, 2, 3}
p = 0x0
name = 0x168042a0 ""
big = 2147483647
~~~

gdb بيعرف يطبع الـ array كلها، والـ [[char *]] كعنوان ونص ([[""]] لأن malloc رجّعت ذاكرة أول byte فيها صفر بالصدفة). وبعدها [[quit]] (أو [[q]]) يقفل gdb، وهيسألك لو البرنامج لسه شغال.

---

## ٧. الـ try: breakpoint وخطوة خطوة

~~~text جوه gdb --args ./ub 1
(gdb) break ub.c:11
(gdb) run
(gdb) print arr
(gdb) print which
(gdb) next
(gdb) next
(gdb) continue
~~~

~~~text الناتج
Breakpoint 1 at 0x4011ba: file ub.c, line 11.
Breakpoint 1, main (argc=2, argv=0x7ffedd9bd7c8) at ub.c:11
11	    if (which == 1) printf("arr[3] = %d\n", arr[which + 2]);
$1 = {1, 2, 3}
$2 = 1
12	    if (which == 2) *p = 42;
13	    if (which == 3) {
arr[3] = 2147483647
done (case 1)
[Inferior 1 (process 216) exited normally]
~~~

- [[break ub.c:11]] (أو [[b]]): وقّف **قبل** تنفيذ السطر 11.
- [[run]]: البرنامج وقف عند السطر 11، فقدرت تشوف arr و which قبل الغلطة.
- [[next]] (أو [[n]]): نفّذ السطر الحالي وقف عند اللي بعده. لاحظ إن [[arr[3] = ...]] اتطبعت متأخر: الـ printf كتبت في buffer، والـ buffer طلع لما البرنامج خلص.
- [[continue]] (أو [[c]]): كمّل لحد breakpoint تاني أو النهاية. [[Inferior 1]] اسم gdb للبرنامج اللي بيراقبه، و [[exited normally]] = خرج بـ 0. يعني gdb لوحده مش هيمسك case 1، محتاج sanitizer.

---

## ٨. compile بالـ sanitizers

~~~bash
gcc -std=c17 -g -fsanitize=address,undefined ub.c -o ub_asan
~~~

- [[-fsanitize=address]] (ASan): بيحط مناطق ممنوعة حوالين كل array وكل malloc، ويعلّم الذاكرة المحررة، ويفحص قبل كل قراية وكتابة.
- [[undefined]] (UBSan): بيفحص الـ overflow والـ index بره الحدود (لو الحجم معروف) والقسمة على صفر وغيرهم.
- [[-g]] عشان التقارير تقول السطر.

### [[./ub_asan 1]]

~~~text الناتج (مختصر)
ub.c:11:48: runtime error: index 3 out of bounds for type 'int [3]'
==224==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x731dbbd0002c ...
READ of size 4 at 0x731dbbd0002c thread T0
    #0 0x40153d in main /w/ub.c:11
  This frame has 1 object(s):
    [32, 44) 'arr' (line 7) <== Memory access at offset 44 overflows this variable
SUMMARY: AddressSanitizer: stack-buffer-overflow /w/ub.c:11 in main
exit=1
~~~

- أول سطر من UBSan: السطر 11 العمود 48، و index 3 في array نوعها [[int [3]]].
- بعدها ASan: [[stack-buffer-overflow]] (array على الـ stack اتعدّت)، [[READ of size 4]] = قراية int.
- [[#0 ... /w/ub.c:11]]: الـ backtrace زي [[bt]] في gdb.
- [[[32, 44) 'arr' (line 7)]]: arr في الـ bytes من 32 لـ 43، والقراية كانت عند 44: أول byte بعدها بالظبط.
- ASan **وقّف** البرنامج (مفيش done) وخرج بـ 1. وتحت التقرير جدول «Shadow bytes» طويل، ده تفاصيل داخلية تقدر تتجاهلها.

### [[./ub_asan 3]]

~~~text الناتج (مختصر)
==225==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 ...
WRITE of size 1 at 0x502000000010 thread T0
    #0 0x401621 in main /w/ub.c:15
freed by thread T0 here:
    #1 0x4015d7 in main /w/ub.c:14
previously allocated by thread T0 here:
    #1 0x40141d in main /w/ub.c:9
exit=1
~~~

ده أقوى تقرير: الكتابة حصلت فين (سطر 15، byte واحد = [['X']])، والذاكرة اتحررت فين (سطر 14)، واتحجزت فين أصلًا (سطر 9). القصة كلها.

### [[./ub_asan 4]]

~~~text الناتج
ub.c:18:21: runtime error: signed integer overflow: 2147483647 + 4 cannot be represented in type 'int'
INT_MAX + 4 = -2147483645
done (case 4)
exit=0
~~~

UBSan بيطبع التحذير **ويكمّل** افتراضيًا (عشان كده done اتطبعت و exit 0). لو عايزه يقف: [[-fno-sanitize-recover=undefined]] (جربتها: نفس الرسالة، ومفيش done، و exit 1).

---

## ٩. الـ leak (آخر الـ try)

برنامج الـ realloc من درس malloc من غير [[free]]، بـ [[-fsanitize=address]]، طلّع [[ERROR: LeakSanitizer: detected memory leaks]] و [[Direct leak of 512 byte(s)]] بالسطر اللي حجز (التفاصيل في درس malloc).

---

## الخلاصة

| الأداة | الأمر | بتمسك |
|---|---|---|
| gdb | [[gcc -g -O0]] ثم [[gdb --args ./app ...]] | crash: فين، ومين نادى، والقيم |
| ASan | [[-fsanitize=address]] | بره الحدود، use after free، double free، leaks |
| UBSan | [[-fsanitize=undefined]] | signed overflow، index، قسمة على صفر |

| أمر gdb | اختصار | معناه |
|---|---|---|
| [[run]] | [[r]] | شغّل |
| [[bt]] | | سلسلة النداءات |
| [[print x]] | [[p x]] | قيمة |
| [[info locals]] | | كل المتغيرات المحلية |
| [[break f.c:12]] | [[b]] | وقّف قبل السطر |
| [[next]] / [[step]] | [[n]] / [[s]] | السطر الجاي / ادخل جوه الدالة |
| [[continue]] | [[c]] | كمّل |
| [[quit]] | [[q]] | اخرج |

- على الماك [[lldb]] بأوامر قريبة، وعلى Windows مع MSVC الـ ASan بـ [[/fsanitize=address]] (من الـ docs).
- الـ sanitizers للتطوير والـ tests، مش للنسخة اللي بتسلّمها.`,
          lines: [
            R`[[-g]] لأرقام السطور، و [[-O0]] عشان المتغيرات متتشالش.`,
            R`افتح البرنامج في gdb، و [[--args]] بتدّيله argument 2.`,
            "جوه gdb: شغّل. هيقف عند الـ segfault.",
            R`[[bt]]: إحنا فين ومين نادانا.`,
            "قيمة p: هتلاقيه 0x0 يعني NULL.",
            "كل المتغيرات المحلية مرة واحدة.",
            "اخرج من gdb.",
            R`compile مع ASan و UBSan. البرنامج هيبقى أبطأ وأكبر.`,
            "case 1: القراية بره الـ array.",
            "case 3: use after free.",
            "case 4: signed overflow."
          ],
          sol: R`gdb مع case 2:
[[Program received signal SIGSEGV, Segmentation fault.]]
[[0x00000000004011e7 in main (argc=2, argv=0x7fffffffdad8) at ub.c:12]]
[[12	    if (which == 2) *p = 42;]]
و [[print p]] بيطبع [[(int *) 0x0]]، و [[info locals]] بيطبع [[which = 2]] و [[arr = {1, 2, 3}]] و [[p = 0x0]] والباقي.

مع الـ sanitizers (مختصر):
[[./ub_asan 1]]:
[[ub.c:11:48: runtime error: index 3 out of bounds for type 'int [3]']]
[[ERROR: AddressSanitizer: stack-buffer-overflow ... READ of size 4]]
[[#0 0x40153d in main /src/ub.c:11]]

[[./ub_asan 3]]:
[[ERROR: AddressSanitizer: heap-use-after-free ... WRITE of size 1]]
وتحتها «freed by thread T0 here» بالسطر 14 اللي عمل free.

[[./ub_asan 4]]:
[[ub.c:18:21: runtime error: signed integer overflow: 2147483647 + 4 cannot be represented in type 'int']]

الأخطاء اللي كانت بتعدّي بهدوء بقت بتقف عند السطر بالظبط. وبرنامج الـ realloc من غير free بيطلّع [[ERROR: LeakSanitizer: detected memory leaks]].`
        }
      ]
    }
]);
