// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
    {
      t: "الـ Arrays والـ Strings والـ Pointers",
      l: 1,
      n: "أهم جزء في C: الذاكرة شكلها إيه، والـ array والنص والـ pointer علاقتهم ببعض، و malloc و free",
      items: [
        {
          cmd: "arrays في C",
          title: "الـ array في C: إزاي تعرّفها وتعرف طولها، وليه C مش بتمنعك تقرا بره حدودها؟",
          desc: R`الـ array مجموعة عناصر من نفس النوع جنب بعض في الذاكرة. [[int marks[5];]] بتحجز مكان لـ 5 أرقام صحاح ورا بعض (20 byte لو الـ int بـ 4).

• الـ index بيبدأ من 0: أول عنصر [[marks[0]]] وآخر عنصر [[marks[4]]].
• الأقواس المربعة [[[ ]]] في التعريف بتقول الحجم، وفي الاستخدام بتقول رقم العنصر.
• القيم الأولية بين [[{ }]]: [[int marks[5] = {90, 75, 60, 85, 70};]]. ولو كتبت قيم أقل، الباقي بيبقى صفر، فـ [[int zeros[4] = {0};]] كلها أصفار. ومن غير قيم أولية خالص، الـ array المحلية فيها زبالة.
• الطول: C مش بتحفظ طول الـ array في أي حتة. جوه نفس الدالة اللي عرّفتها تقدر تحسبه: [[sizeof(marks) / sizeof(marks[0])]] = حجمها كله ÷ حجم عنصر واحد.
• لما تبعت array لدالة، اللي بيتبعت عنوان أول عنصر بس، فالدالة متعرفش الطول، ولازم تبعته معاها. عشان كده [[average(marks, len)]].
• [[const int arr[]]] في الـ parameter معناها «الدالة دي هتقرا بس، مش هتغيّر».

وأهم تحذير: C مش بتتشيّك على الحدود. [[marks[5]]] أو [[marks[100]]] هتتعمل compile وتشتغل وتقرا (أو تكتب) في ذاكرة مش بتاعتك. ده اسمه buffer overflow، ومن أشهر أسباب الثغرات الأمنية في التاريخ.

وفيه arrays بأكتر من بُعد: [[int grid[2][3]]] صفين في كل صف ٣ عناصر، و [[grid[1][2]]] الصف التاني العنصر التالت.`,
          example: R`#include <stdio.h>

double average(const int arr[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) {
        sum += arr[i];
    }
    return (double)sum / len;
}

int main(void) {
    int marks[5] = {90, 75, 60, 85, 70};
    int len = sizeof(marks) / sizeof(marks[0]);
    marks[2] = 65;
    printf("len=%d first=%d last=%d\n", len, marks[0], marks[len - 1]);
    printf("average=%.1f\n", average(marks, len));
    int zeros[4] = {0};
    printf("zeros[3]=%d\n", zeros[3]);
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("grid[1][2]=%d\n", grid[1][2]);
    return 0;
}`,
          try: R`اكتب دالة [[int max_of(const int arr[], int len)]] ترجّع أكبر عنصر، ودالة [[void reverse(int arr[], int len)]] تقلب الـ array في مكانها. وجرّب جوه [[average]] تطبع [[sizeof(arr)]]: طلع كام، وليه مش 20؟`,
          flag: "script",
          deep: {
            why: "الـ array أبسط وأسرع هيكل بيانات: العناصر جنب بعض، فالوصول لأي عنصر بالـ index خطوة واحدة، والـ CPU بيحب يقرا ذاكرة متتالية. vector في C++ و list في Python و array في JS كلهم مبنيين على نفس الفكرة.",
            how: R`[[marks[i]]] الـ compiler بيحسبها: عنوان أول عنصر + i × حجم العنصر. مفيش أي فحص إن i أقل من الطول، لأن ده هيكلّف وقت في كل وصول، و C اختارت السرعة وسابت المسؤولية عليك.

جوه [[average]]، [[arr]] مش array، ده pointer لأول عنصر (الدرس الجاي بعد الـ strings بيشرح ده). عشان كده [[sizeof(arr)]] جوه الدالة بيدّيك حجم pointer (8) مش حجم الـ array. و gcc بينبّهك لو كتبتها: [[-Wsizeof-array-argument]].`,
            when: R`array ثابتة الحجم لما تعرف الحجم وقت الكتابة (أيام الأسبوع، grid صغيرة). ولو الحجم بيتحدد وقت التشغيل أو بيكبر، [[malloc]] (آخر الكاتيجوري دي)، أو في C++ [[std::vector]].`,
            mistakes: R`[[for (i = 0; i <= len; i++)]]: الـ [[<=]] بتقرا عنصر زيادة بره الـ array. وتحسب الطول بـ sizeof جوه دالة استلمت الـ array. وتنسى تدي قيم أولية فتلاقي أرقام غريبة. وتعمل array محلية ضخمة ([[int big[10000000];]]) فالـ stack يخلص والبرنامج يقع: الحاجات الكبيرة مكانها malloc.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل array فيها ٥ درجات، يغيّر واحدة، يحسب الطول، ويبعتها لدالة تحسب المتوسط. وبعدين يورّيك array بأصفار تلقائية و array بُعدين. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]].

~~~text الناتج كله
len=5 first=90 last=70
average=77.0
zeros[3]=0
grid[1][2]=6
~~~

---

## ١. التعريف والقيم الأولية

~~~c
    int marks[5] = {90, 75, 60, 85, 70};
~~~

- [[int]]: نوع كل عنصر. كلهم لازم نفس النوع.
- [[marks[5]]]: الاسم، و [[[5]]] في التعريف = **عدد** العناصر. الحجم لازم يبقى معروف هنا.
- [[{90, 75, ...}]]: القيم بالترتيب بين أقواس معقوفة.

في الذاكرة الخمسة جنب بعض، كل واحد 4 bytes، فالـ array كلها 20 byte:

~~~text marks في الذاكرة
index:   [0]  [1]  [2]  [3]  [4]
value:    90   75   60   85   70
~~~

---

## ٢. الطول بـ [[sizeof]]

~~~c
    int len = sizeof(marks) / sizeof(marks[0]);
~~~

- [[sizeof(marks)]]: حجم الـ array كلها بالـ bytes = 20.
- [[sizeof(marks[0])]]: حجم عنصر واحد = 4.
- 20 ÷ 4 = **5**. C مش بتحفظ الطول في أي حتة، فده الحساب الوحيد، وبيشتغل بس في نفس المكان اللي الـ array متعرّفة فيه (تحت هتشوف ليه).

---

## ٣. القراية والكتابة بالـ index

~~~c
    marks[2] = 65;
    printf("len=%d first=%d last=%d\n", len, marks[0], marks[len - 1]);
~~~

- [[marks[2]]] في الاستخدام = العنصر رقم 2، وده **التالت** لأن العد من 0. الـ 60 بقت 65.
- [[marks[0]]] أول عنصر (90)، و [[marks[len - 1]]] آخر عنصر = [[marks[4]]] (70). مفيش [[marks[5]]].

~~~text الناتج
len=5 first=90 last=70
~~~

---

## ٤. الـ array جوه دالة

~~~c
double average(const int arr[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) {
        sum += arr[i];
    }
    return (double)sum / len;
}
~~~

- [[const int arr[]]]: الدالة بتستلم array من int. [[[]]] فاضية لأن الحجم مش بيوصل أصلًا. و [[const]] وعد إن الدالة مش هتغيّر العناصر (لو حاولت، الـ compiler يرفض).
- [[int len]]: لازم الطول ييجي معاها كـ parameter منفصل.
- الـ loop من [[i = 0]] طول ما [[i < len]]: يعني 0 لـ 4. [[sum += arr[i]]] بيجمع.
- [[(double)sum / len]]: cast عشان القسمة تبقى عشرية.

~~~c
    printf("average=%.1f\n", average(marks, len));
~~~

المجموع: 90 + 75 + 65 + 85 + 70 = 385، ÷ 5 = [[77.0]].

### ليه الدالة محتاجة [[len]]؟ (الـ try)

ضفت [[sizeof(arr)]] جوه الدالة و [[sizeof(marks)]] في main:

~~~text الناتج
L1try.c:4:46: warning: 'sizeof' on array function parameter 'arr' will return size of 'const int *' [-Wsizeof-array-argument]
sizeof(marks) in main=20
sizeof(arr) inside=8
~~~

لما بتبعت array لدالة، اللي بيتبعت **عنوان أول عنصر** بس (pointer)، مش الـ 20 byte. فـ [[sizeof(arr)]] جوه الدالة = حجم عنوان = 8 على جهاز 64-bit. و gcc بنفسه بيقولك إن [[arr]] هنا [[const int *]] (الـ [[*]] = pointer، ليه درس بعد الجاي).

---

## ٥. الأصفار التلقائية

~~~c
    int zeros[4] = {0};
    printf("zeros[3]=%d\n", zeros[3]);
~~~

إديت قيمة واحدة، والباقي بيتملى أصفار لوحده: [[zeros[3]=0]]. لكن لو مكتبتش [[= {...}]] خالص، الـ array المحلية فيها زبالة (اللي كان في الذاكرة قبلها).

---

## ٦. array بُعدين

~~~c
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("grid[1][2]=%d\n", grid[1][2]);
~~~

- [[[2][3]]]: صفين، كل صف ٣ عناصر. والقيم صف صف، كل صف بين [[{ }]].

~~~text grid
         [0]  [1]  [2]
row [0]:  1    2    3
row [1]:  4    5    6
~~~

[[grid[1][2]]] = الصف التاني، العمود التالت = [[6]]. وفي الذاكرة الستة ورا بعض: صف 0 كله وبعده صف 1.

---

## ٧. القراية بره الحدود

ضفت [[printf("%d\n", marks[5]);]] (عنصر مش موجود):

- بـ [[-Wall -Wextra]] بس: ولا warning، والبرنامج طبع [[0]] بهدوء، رقم من ذاكرة مش بتاعته.
- بـ [[-fsanitize=address,undefined]]:

~~~text الناتج
L1try.c:16:25: runtime error: index 5 out of bounds for type 'int [5]'
~~~

C مش بتتشيّك على الحدود عشان السرعة، فالـ sanitizer هو اللي بيمسكها وقت التطوير (ليه درس في آخر الكاتيجوري).

---

## ٨. الـ solCode

### [[max_of]]

~~~c
int max_of(const int arr[], int len) {
    int best = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] > best) best = arr[i];
    }
    return best;
}
~~~

ابدأ بأول عنصر كأنه الأكبر، ولف من التاني ([[i = 1]])، وأي عنصر أكبر يبقى هو الجديد.

### [[reverse]]

~~~c
void reverse(int arr[], int len) {
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}
~~~

- مفيش [[const]] لأنها بتغيّر.
- الـ for فيها متغيرين: [[i]] من الأول و [[j]] من الآخر. الفاصلة [[,]] بتسمح بأكتر من حاجة في البداية والخطوة. وبيقفوا لما يتقابلوا ([[i < j]]).
- التبديل بمتغير مؤقت [[tmp]]: لو كتبت [[arr[i] = arr[j]]] على طول، القيمة القديمة هتضيع.
- الدالة بتغيّر الـ array الأصلية، لأن اللي اتبعت عنوانها مش نسخة منها (عكس الـ int في درس الدوال).

~~~text الناتج مع {4, 9, 1, 7, 3}
max=9
3 7 1 9 4 
~~~

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| تعريف | [[int a[5] = {1, 2, 3, 4, 5};]] |
| أول / آخر | [[a[0]]] / [[a[len - 1]]] |
| الطول (في نفس المكان بس) | [[sizeof(a) / sizeof(a[0])]] |
| لدالة | [[f(a, len)]] و [[void f(const int a[], int len)]] |
| بُعدين | [[int g[2][3]]] و [[g[row][col]]] |

- الـ index من 0 لـ [[len - 1]]، و [[i < len]] مش [[<=]].
- C مبتمنعكش تعدّي الحدود: الـ sanitizer بيمسكها.`,
          lines: [
            "فيها printf.",
            R`الدالة بتاخد الـ array (عنوانها في الحقيقة) وطولها. و [[const]] = مش هتغيّرها.`,
            "مجموع.",
            "لف على كل index من 0 لـ len - 1.",
            R`[[arr[i]]] العنصر رقم i.`,
            "قفلة الـ for.",
            R`cast لـ double عشان القسمة متشيلش الكسر.`,
            "قفلة الدالة.",
            "بداية main.",
            "array من ٥ أرقام بقيم أولية.",
            "الطول = الحجم كله ÷ حجم عنصر واحد = 20 ÷ 4 = 5.",
            "تغيير العنصر التالت (index 2).",
            R`أول عنصر index 0، وآخر عنصر [[len - 1]].`,
            "نبعت الـ array وطولها للدالة.",
            "قيمة واحدة والباقي أصفار تلقائيًا.",
            "آخر عنصر صفر.",
            "array بُعدين: صفين × ٣ أعمدة.",
            "الصف التاني (1)، العمود التالت (2) = 6.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[len=5 first=90 last=70]]
[[average=77.0]]
[[zeros[3]=0]]
[[grid[1][2]=6]]
(المتوسط: 90 + 75 + 65 + 85 + 70 = 385 ÷ 5 = 77.)

[[sizeof(arr)]] جوه الدالة بـ 8 على جهاز 64-bit: ده حجم pointer، لأن الـ array اتبعتت كعنوان أول عنصر. ومع [[-Wall]]، gcc بينبّهك:
[[warning: 'sizeof' on array function parameter 'arr' will return size of 'const int *']]

[[reverse]] بتبدّل أول عنصر مع آخر عنصر، والتاني مع اللي قبل الأخير، لحد ما يتقابلوا في النص.`,
          solCode: R`#include <stdio.h>

int max_of(const int arr[], int len) {
    int best = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] > best) best = arr[i];
    }
    return best;
}

void reverse(int arr[], int len) {
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}

int main(void) {
    int a[5] = {4, 9, 1, 7, 3};
    printf("max=%d\n", max_of(a, 5));
    reverse(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}`
        },
        {
          cmd: "strings في C",
          title: "النص في C مجرد array من char آخرها '\\0': يعني إيه، وإزاي تنسخ وتقارن من غير ما تعدّي الحدود؟",
          desc: R`C معندهاش نوع string. النص هو array من [[char]] وآخرها حرف خاص قيمته صفر: [['\0']] (اسمه null terminator). كل الدوال اللي بتتعامل مع النصوص بتمشي حرف حرف لحد ما تقابل الصفر ده، وكده بتعرف النص خلص فين.

[[char name[] = "Sara";]] بتحجز 5 bytes مش 4: [['S' 'a' 'r' 'a' '\0']]. عشان كده:
• [[strlen(name)]] بـ 4: بتعد الحروف لحد الـ [[\0]].
• [[sizeof(name)]] بـ 5: حجم الـ array كلها.

دوال [[string.h]] الأشهر:
• [[strlen(s)]]: الطول.
• [[strcmp(a, b)]]: بترجّع 0 لو متساويين، وسالب أو موجب حسب الترتيب الأبجدي. [[==]] بين نصين بتقارن العناوين مش الحروف، فمتستخدمهاش.
• [[strcpy(dst, src)]]: بتنسخ من غير ما تعرف حجم dst، فلو src أطول بتكتب بره الـ array. ودي من أخطر الدوال.
• [[strcat]]: بتلزق نص في آخر نص، ونفس الخطر.

الطريقة الآمنة للنسخ والتركيب: [[snprintf(buf, sizeof(buf), "...", ...)]]. بتكتب لحد الحجم اللي اديته بالظبط، وبتحط [[\0]] دايمًا، وبترجّع الطول اللي كانت محتاجاه. فلو الرقم ده أكبر من أو بيساوي حجم الـ buffer، يبقى النص اتقص.

[[char *s = "Sara";]] (بالنجمة) حاجة تانية: ده pointer لنص ثابت في ذاكرة للقراية بس. لو حاولت تغيّر حرف فيه، البرنامج غالبًا هيقع. لو عايز تعدّل، استخدم [[char s[] = "Sara";]].`,
          example: R`#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
    const char *full = argc > 1 ? argv[1] : "Sara Mohamed";
    char name[] = "Sara";
    printf("strlen=%zu sizeof=%zu\n", strlen(name), sizeof(name));
    printf("name[4] = %d\n", name[4]);
    char greeting[32];
    snprintf(greeting, sizeof(greeting), "Hello, %s!", name);
    printf("%s\n", greeting);
    char small[8];
    int needed = snprintf(small, sizeof(small), "%s", full);
    printf("small=\"%s\" needed=%d\n", small, needed);
    if (strcmp(name, "Sara") == 0) {
        printf("same text\n");
    }
    name[0] = 's';
    printf("%s\n", name);
    return 0;
}`,
          try: R`شغّله من غير arguments، وبعدين [[./app Ali]]. وبعدين اكتب دالة [[int count_char(const char *s, char c)]] تعد حرف معيّن في نص بـ loop لحد الـ [[\0]] (من غير strlen). وجرّب تشيل الـ [[\0]] من آخر نص بإيدك: [[char bad[4] = {'a','b','c','d'};]] واطبعه بـ [[%s]]: إيه اللي اتطبع؟`,
          flag: "script",
          deep: {
            why: R`كل نص في C (أسماء ملفات، input، رسايل شبكة) هو array حروف. وأشهر ثغرات أمنية في التاريخ جت من نسخ نص أطول من الـ buffer بـ [[strcpy]] أو [[gets]] (اتشالت من اللغة خالص في C11 لأنها مينفعش تستخدم بأمان).`,
            how: R`[[strlen]] بتلف من أول حرف لحد ما تلاقي byte قيمته 0، فهي [[O(n)]] كل مرة تناديها. فمتحطهاش في شرط for على نص طويل: [[for (i = 0; i < strlen(s); i++)]] بتحسب الطول في كل لفة.

لو نص ملوش [[\0]]، [[printf("%s")]] و [[strlen]] هيكمّلوا يقروا في الذاكرة اللي بعده لحد ما يلاقوا صفر بالصدفة، فهتشوف حروف غريبة أو البرنامج يقع.

[[%s]] في [[snprintf]] بتاخد عنوان أول حرف، وبتفضل تنسخ لحد الـ [[\0]] أو لحد ما الـ buffer يخلص.`,
            when: R`[[snprintf]] لأي نسخ أو تركيب. [[strcmp]] للمقارنة. [[strncmp(a, b, n)]] لمقارنة أول n حرف (زي «النص بيبدأ بـ...»). و [[fgets]] لقراية سطر (درس الملفات). وفي C++ استخدم [[std::string]] وارتاح من كل ده.`,
            mistakes: R`[[if (name == "Sara")]] بتقارن عناوين، استخدم [[strcmp]]. و [[char s[4] = "Sara";]]: مفيش مكان للـ [[\0]]. و [[strcpy]] من غير ما تتأكد من الطول. وتغيّر حرف في [[char *s = "..."]]. وتنسى إن [[strlen]] مش بتعد الـ [[\0]]، فتعمل [[malloc(strlen(s))]] وتنسى الـ +1.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيورّيك إن النص في C array حروف آخرها صفر: يقيس الطول بطريقتين، ويطبع الصفر المخفي، ويركّب نص بأمان بـ [[snprintf]]، ويحاول يحط نص طويل في buffer صغير ويقولك اتقص، ويقارن نصين، ويغيّر حرف. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]].

~~~text الناتج من غير arguments
strlen=4 sizeof=5
name[4] = 0
Hello, Sara!
small="Sara Mo" needed=12
same text
sara
~~~

---

## ١. [[string.h]]

~~~c
#include <string.h>
~~~

فيها دوال النصوص: [[strlen]] و [[strcmp]] و [[strcpy]] و [[strcat]] وغيرهم. ([[snprintf]] من [[stdio.h]].)

---

## ٢. النص اللي هنقصّه

~~~c
    const char *full = argc > 1 ? argv[1] : "Sara Mohamed";
~~~

من جوه لبرة:

- [[argc > 1 ? argv[1] : "Sara Mohamed"]]: الـ ternary operator. [[شرط ? أ : ب]] = لو اليوزر كتب argument خد [[argv[1]]]، غير كده خد النص الثابت.
- [[const char *full]]: [[full]] عنوان أول حرف في نص ([[char *]])، و [[const]] = مش هنغيّر حروفه من خلاله. النص [[" "]] في الكود متخزّن في ذاكرة للقراية بس، عشان كده [[const]] مناسبة.

---

## ٣. [[char name[] = "Sara";]]

~~~c
    char name[] = "Sara";
    printf("strlen=%zu sizeof=%zu\n", strlen(name), sizeof(name));
    printf("name[4] = %d\n", name[4]);
~~~

- [[[]]] فاضية: الـ compiler بيعدّ الحروف ويحدد الحجم لوحده. والنص بيتنسخ **جوه** الـ array، فتقدر تعدّله.
- الحجم 5 مش 4:

~~~text name في الذاكرة
index:  [0]  [1]  [2]  [3]  [4]
char:   'S'  'a'  'r'  'a'  '\0'
~~~

- [[strlen(name)]]: بتمشي حرف حرف لحد ما تلاقي الـ [[\0]] ومبتعدّهوش: 4.
- [[sizeof(name)]]: حجم الـ array كلها بالصفر: 5.
- [[name[4]]] بـ [[%d]]: الـ [[\0]] قيمته [[0]]. (مش الحرف '0' اللي كوده 48، ده byte قيمته صفر.)

~~~text الناتج
strlen=4 sizeof=5
name[4] = 0
~~~

---

## ٤. [[snprintf]]: تركيب نص بأمان

~~~c
    char greeting[32];
    snprintf(greeting, sizeof(greeting), "Hello, %s!", name);
    printf("%s\n", greeting);
~~~

[[snprintf]] زي printf، بس بتكتب في array بدل الشاشة (s = string، و n = بحد أقصى):

| الـ argument | هنا | معناه |
|---|---|---|
| ١ | [[greeting]] | فين تكتب |
| ٢ | [[sizeof(greeting)]] | أقصى عدد bytes (32)، **بالـ** [[\0]] |
| ٣ | [[Hello, %s!]] | الـ format زي printf |
| ٤ | [[name]] | القيمة اللي مكان [[%s]] |

~~~text الناتج
Hello, Sara!
~~~

---

## ٥. لما النص أطول من الـ buffer

~~~c
    char small[8];
    int needed = snprintf(small, sizeof(small), "%s", full);
    printf("small=\"%s\" needed=%d\n", small, needed);
~~~

- [[small]] 8 bytes: يعني 7 حروف + [[\0]] بالكتير.
- [[full]] = [[Sara Mohamed]] (12 حرف). snprintf كتبت أول 7 ([[Sara Mo]]) وحطت [[\0]]، ومكتبتش ولا byte بره.
- اللي بترجّعه = الطول **اللي كانت محتاجاه** (12). فالقاعدة: لو [[needed >= sizeof(small)]] يبقى النص اتقص.
- [[\"]] جوه النص: علامة تنصيص عادية بتتطبع، والـ [[\]] بيمنعها تقفل النص.

~~~text الناتج
small="Sara Mo" needed=12
~~~

ومع [[./app Ali]]: [[small="Ali" needed=3]]، لأن Ali لحقت.

---

## ٦. [[strcmp]]: المقارنة

~~~c
    if (strcmp(name, "Sara") == 0) {
        printf("same text\n");
    }
~~~

[[strcmp]] بتقارن حرف حرف، وبترجّع **0** لو متطابقين، وسالب لو الأول قبل التاني أبجديًا، وموجب لو بعده. عشان كده [[== 0]].

وليه مش [[==]] على طول؟ جربت [[if (name == "Sara")]]:

~~~text الناتج
warning: comparison with string literal results in unspecified behavior [-Waddress]
not equal
~~~

[[==]] بين نصين بتقارن **العناوين** (الـ array في مكان، والنص الثابت في مكان تاني)، مش الحروف. فطلعت not equal رغم إن الكلام واحد.

---

## ٧. تعديل حرف

~~~c
    name[0] = 's';
    printf("%s\n", name);
~~~

[[name]] array بتاعتك، فالتعديل مسموح: [[sara]]. لكن جربت نفس الكلام على [[char *s = "Sara";]] وبعدين [[s[0] = 's';]]: من غير ولا warning، والبرنامج وقع بـ [[Segmentation fault]] (exit code 139)، لأن [[s]] بيشاور على النص الثابت اللي في ذاكرة للقراية بس.

---

## ٨. الـ try: نص من غير [[\0]]

~~~c
    char bad[4] = {'a', 'b', 'c', 'd'};
    printf("[%s]\n", bad);
~~~

- عادي: طبع [[[abcd]]]. بالصدفة الـ byte اللي بعد الـ array كان صفر. ممكن على جهاز تاني أو بـ flags تانية تشوف حروف غريبة بعدها.
- بـ [[-fsanitize=address]]:

~~~text الناتج
==110==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7f7521a00024 ...
READ of size 5 at 0x7f7521a00024 thread T0
    #3 0x40123d in main /w/L2bad.c:5
~~~

printf قرت **5** bytes من array حجمها 4، لأنها كانت بتدوّر على الصفر. والسطر [[L2bad.c:5]] هو الـ printf.

وكمان [[char s4[4] = "Sara";]] في C بتتعمل compile من غير ولا warning: الـ 4 حروف دخلت والـ [[\0]] اتساب بره. (في C++ ده error.)

---

## ٩. الـ solCode: [[count_char]]

~~~c
int count_char(const char *s, char c) {
    int count = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == c) count++;
    }
    return count;
}
~~~

- [[const char *s]]: النص جاي كعنوان أول حرف، و [[const]] لأننا بنقرا بس.
- الشرط [[s[i] != '\0']] بدل [[i < len]]: كمّل لحد الصفر. ده نفس اللي [[strlen]] بتعمله من جوه.
- [['a']] بعلامة مفردة = حرف واحد، و [["a"]] بمزدوجة = نص (حرفين: a و [[\0]]).

[[count_char("banana", 'a')]] طبعت [[3]].

---

## الخلاصة

| عايز | استخدم | متستخدمش |
|---|---|---|
| الطول | [[strlen(s)]] | [[sizeof]] على pointer |
| تقارن | [[strcmp(a, b) == 0]] | [[a == b]] |
| تنسخ أو تركّب | [[snprintf(buf, sizeof(buf), ...)]] | [[strcpy]] و [[strcat]] من غير ما تحسب |
| نص تعدّله | [[char s[] = "..."]] | [[char *s = "..."]] |

- النص = حروف + [[\0]]، فالحجم = الطول + 1.
- [[snprintf]] بترجّع الطول المطلوب: لو [[>=]] حجم الـ buffer يبقى اتقص.`,
          lines: [
            "فيها printf و snprintf.",
            R`فيها [[strlen]] و [[strcmp]].`,
            "main بـ arguments.",
            R`نص من الترمنال لو موجود، وإلا نص ثابت. الـ [[?]] و [[:]] (ternary): لو الشرط صح خد الأولى، وإلا التانية.`,
            R`array من 5: أربع حروف + [[\0]].`,
            R`[[strlen]] بتعد لحد الصفر (4)، و [[sizeof]] حجم الـ array (5).`,
            R`العنصر الخامس هو الـ [[\0]]، وقيمته 0.`,
            "buffer كبير كفاية.",
            R`[[snprintf]]: اكتب نص منسّق، ومتعدّيش 32 byte.`,
            "Hello, Sara!",
            "buffer صغير: 7 حروف + الصفر.",
            "بتكتب اللي يلحق، وبترجّع الطول اللي كانت محتاجاه.",
            R`النص اتقص، والرقم المرجّع بيقولك كان محتاج كام. و [[\"]] علامة تنصيص جوه النص.`,
            R`[[strcmp]] بترجّع 0 لو النصين زي بعض.`,
            "بيتطبع.",
            "قفلة الـ if.",
            "تعديل حرف: مسموح لأن name array مش نص ثابت.",
            "بقت sara.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`من غير arguments:
[[strlen=4 sizeof=5]]
[[name[4] = 0]]
[[Hello, Sara!]]
[[small="Sara Mo" needed=12]]
[[same text]]
[[sara]]

[[needed=12]] و الـ buffer 8، يعني النص اتقص: 7 حروف + [[\0]]. مع [[./app Ali]] السطر بيبقى [[small="Ali" needed=3]].

النص اللي ملوش [[\0]] بيطبع abcd وبعدها حروف عشوائية أو مفيش حاجة زيادة، حسب اللي في الذاكرة بعده بالصدفة. ده undefined behavior.`,
          solCode: R`#include <stdio.h>

int count_char(const char *s, char c) {
    int count = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == c) count++;
    }
    return count;
}

int main(void) {
    printf("%d\n", count_char("banana", 'a'));
    return 0;
}`
        },
        {
          cmd: "المؤشرات Pointers والذاكرة",
          title: "الـ pointer يعني إيه؟ & بتجيب العنوان و * بتروح للعنوان، بالرسم",
          desc: R`الذاكرة (RAM) عبارة عن bytes كتير ورا بعض، وكل byte ليه رقم اسمه العنوان (address)، زي رقم الشقة في عمارة. أي متغير عندك قاعد في عنوان معيّن.

الـ pointer متغير عادي، بس القيمة اللي جواه عنوان متغير تاني.

رمزين لازم تفرق بينهم:
• [[&x]] (الـ address-of operator): «عنوان x فين؟».
• [[*p]] (الـ dereference operator): «روح للعنوان اللي في p، وهات (أو غيّر) اللي هناك».
• والنجمة في التعريف [[int *p]] معناها حاجة تالتة: «p نوعه pointer لـ int». مش عملية.

بعد [[int score = 100;]] و [[int *ptr = &score;]] الذاكرة شكلها كده (العناوين مثال):

[[  العنوان        الاسم     القيمة]]
[[  0x7ffc1000     score     100]]
[[  0x7ffc1008     ptr       0x7ffc1000]]

• [[ptr]] قيمته [[0x7ffc1000]] (عنوان score).
• [[*ptr]] = روح لـ [[0x7ffc1000]] وهات اللي هناك = 100.
• [[*ptr = 250;]] = روح لـ [[0x7ffc1000]] واكتب 250. فـ score نفسه بقى 250، من غير ما تكتب اسمه.

وده بيحل مشكلة الدرس اللي فات: الدالة بتاخد نسخة، فلو عايزها تغيّر متغير عندك ابعتلها عنوانه، وهي تروح للعنوان وتغيّر. ده اللي [[swap(&x, &y)]] بتعمله، وده نفس سبب [[&]] في [[scanf]].

[[NULL]] عنوان خاص معناه «مش بشاور على حاجة». اعمل أي pointer مش جاهز بـ [[NULL]]، واتشيّك عليه قبل ما تعمل [[*]].`,
          example: R`#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int score = 100;
    int *ptr = &score;
    printf("score=%d *ptr=%d\n", score, *ptr);
    printf("&score=%p ptr=%p\n", (void *)&score, (void *)ptr);
    *ptr = 250;
    printf("score after *ptr = 250: %d\n", score);
    int x = 1, y = 2;
    swap(&x, &y);
    printf("x=%d y=%d\n", x, y);
    int *nothing = NULL;
    if (nothing == NULL) printf("nothing points nowhere\n");
    return 0;
}`,
          try: R`ارسم على ورقة الذاكرة بعد كل سطر في main. وبعدين اكتب دالة [[void min_max(const int arr[], int len, int *min, int *max)]] بترجّع قيمتين عن طريق الـ pointers، وناديها من main. وآخر حاجة: اعمل [[int *bad;]] من غير قيمة واكتب [[*bad = 5;]]، واعمل compile بـ [[-Wall]] وشغّل.`,
          flag: "script",
          deep: {
            why: R`الـ pointers هي اللي بتخلي C تعمل أي حاجة: دالة تغيّر متغيراتك، وتبعت حاجة كبيرة لدالة من غير ما تنسخها (تبعت عنوانها بس، 8 bytes)، وتحجز ذاكرة وقت التشغيل (malloc)، وتبني linked lists و trees. وكل لغة تانية فيها نفس الفكرة بس مستخبية: الـ object في Java و JS بيتبعت كـ reference، وده pointer من جوه.`,
            how: R`الـ pointer على جهاز 64-bit حجمه 8 bytes مهما كان نوع اللي بيشاور عليه. النوع ([[int *]] أو [[double *]]) بيقول للـ compiler حاجتين: لما تعمل [[*p]] يقرا كام byte ويفسّرهم إزاي، ولما تعمل [[p + 1]] يتحرك كام byte (الدرس الجاي).

[[%p]] بتطبع عنوان، ومحتاجة [[void *]]، عشان كده الـ cast [[(void *)]]. و [[void *]] معناها «pointer لأي حاجة، من غير نوع».

العنوان بيتغيّر كل مرة تشغّل البرنامج، لأن نظام التشغيل بيحط الـ stack في مكان عشوائي (ASLR) عشان يصعّب الاختراق.

[[NULL]] في الحقيقة عنوان 0، ونظام التشغيل مش بيسمح لأي برنامج يقرا أو يكتب هناك. عشان كده [[*NULL]] بيقع على طول بـ Segmentation fault بدل ما يبوّظ حاجة بهدوء.`,
            when: R`لما دالة لازم تغيّر متغير عند اللي ناداها، أو ترجّع أكتر من قيمة. ولما تبعت struct أو array كبيرة لدالة (ابعت [[const T *]] لو هتقرا بس). وفي كل ذاكرة ديناميكية وهياكل بيانات مترابطة.`,
            mistakes: R`pointer من غير قيمة أولية (wild pointer) وتعمل عليه [[*]]: بيكتب في مكان عشوائي. و [[*]] على [[NULL]]: segfault. وترجّع عنوان متغير محلي من دالة (dangling pointer): المتغير اتمسح لما الدالة خلصت. وتلخبط بين [[int *p]] في التعريف و [[*p]] في الاستخدام. وتكتب [[int* a, b;]] وتفتكر الاتنين pointers: b هنا int عادي.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل pointer بيشاور على متغير، ويقرا ويكتب في المتغير عن طريقه، ويطبع العنوان نفسه. وبعدين دالة [[swap]] بتبدّل متغيرين في main لأنها خدت عناوينهم، و pointer بـ [[NULL]]. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]].

~~~text الناتج (العناوين بتتغيّر كل تشغيلة)
score=100 *ptr=100
&score=0x7ffe68e84cfc ptr=0x7ffe68e84cfc
score after *ptr = 250: 250
x=2 y=1
nothing points nowhere
~~~

---

## ١. متغير و pointer عليه

~~~c
    int score = 100;
    int *ptr = &score;
~~~

السطر التاني من جوه لبرة:

- [[&score]]: [[&]] هنا اسمها address-of: «هات **عنوان** score في الذاكرة» (مش قيمته).
- [[int *ptr]]: النجمة في **التعريف** معناها «ptr نوعه pointer لـ int»، يعني متغير شايل عنوان مكان فيه int.
- [[=]]: حط العنوان في ptr.

~~~text الذاكرة بعد السطرين
العنوان           الاسم    القيمة
0x7ffe68e84cfc    score    100
(مكان تاني)       ptr      0x7ffe68e84cfc
~~~

---

## ٢. [[*ptr]]: روح للعنوان

~~~c
    printf("score=%d *ptr=%d\n", score, *ptr);
~~~

- [[*ptr]] في **الاستخدام** (مش في التعريف) اسمها dereference: «روح للعنوان اللي جوه ptr وهات اللي هناك» = 100.
- نفس الرمز [[*]] ليه ٣ معاني: ضرب ([[a * b]])، وتعريف pointer ([[int *p]])، و dereference ([[*p]]).

~~~text الناتج
score=100 *ptr=100
~~~

---

## ٣. طباعة العنوان بـ [[%p]]

~~~c
    printf("&score=%p ptr=%p\n", (void *)&score, (void *)ptr);
~~~

- [[%p]]: اطبع pointer (عنوان) بالـ hex.
- [[(void *)]]: cast لـ «pointer من غير نوع»، لأن [[%p]] متعرّفة إنها بتاخد [[void *]].
- الاتنين نفس الرقم: ptr شايل عنوان score بالظبط.
- [[0x]] = الرقم hex، و [[0x7ffe...]] أرقام عالية لأن الـ stack (مكان المتغيرات المحلية) على Linux في آخر الذاكرة.

شغّلته مرتين كمان وطلع [[0x7ffcaf9684dc]] ومرة [[0x7ffe3adf7dec]]: نظام التشغيل بيحط الـ stack في مكان عشوائي كل مرة (ASLR = Address Space Layout Randomization) عشان يصعّب الاختراق.

---

## ٤. الكتابة عن طريق الـ pointer

~~~c
    *ptr = 250;
    printf("score after *ptr = 250: %d\n", score);
~~~

[[*ptr]] على **شمال** [[=]]: «روح للعنوان واكتب هناك 250». والعنوان ده هو score، فـ score بقت 250 من غير ما نكتب اسمها.

~~~text الناتج
score after *ptr = 250: 250
~~~

---

## ٥. [[swap]]: دالة بتغيّر متغيرات main

~~~c
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
~~~

~~~c
    int x = 1, y = 2;
    swap(&x, &y);
~~~

- [[swap(&x, &y)]]: بنبعت **العناوين**. الدالة لسه بتاخد نسخة، بس نسخة من العنوان، والعنوان النسخة بيشاور على نفس المكان.
- [[int *a, int *b]]: a فيه عنوان x، و b فيه عنوان y.

| السطر | بيعمل إيه | x | y | tmp |
|---|---|---|---|---|
| قبل | | 1 | 2 | |
| [[int tmp = *a;]] | اقرا اللي في عنوان x | 1 | 2 | 1 |
| [[*a = *b;]] | اكتب في x اللي في y | 2 | 2 | 1 |
| [[*b = tmp;]] | اكتب في y القديم | 2 | 1 | 1 |

~~~text الناتج
x=2 y=1
~~~

قارنها بـ [[try_change]] في درس الدوال: هناك بعتنا القيمة فمتغيرتش. ونفس السبب ورا [[&]] في [[scanf("%d", &n)]].

---

## ٦. [[NULL]]

~~~c
    int *nothing = NULL;
    if (nothing == NULL) printf("nothing points nowhere\n");
~~~

[[NULL]] قيمة خاصة = «مش بشاور على حاجة». اعمل بيها أي pointer لسه ملوش مكان، واتشيّك عليها قبل [[*]]. جربت [[*p]] على NULL:

~~~text الناتج
Segmentation fault (core dumped)
exit=139
~~~

النظام مش بيسمح لأي برنامج يلمس العنوان 0، فالبرنامج بيقع على طول بدل ما يبوّظ حاجة بهدوء.

---

## ٧. الـ try: pointer من غير قيمة

~~~c
    int *bad;
    *bad = 5;
~~~

~~~text الناتج من gcc -Wall
L3bad.c:5:10: warning: 'bad' is used uninitialized [-Wuninitialized]
    5 |     *bad = 5;
      |     ~~~~~^~~
~~~

- [[bad]] فيه أي زبالة، و [[*bad = 5]] بيكتب في عنوان عشوائي (wild pointer).
- من غير optimization البرنامج طبع [[wrote 5]] وخرج بـ 0 كأن مفيش حاجة. ونفس الكود بـ [[-O2]] وقع بـ Segmentation fault (exit 139). نفس الغلطة، سلوكين مختلفين: ده شكل الـ undefined behavior، والنوع اللي «بيشتغل» أخطر.

وفخ تاني من الـ mistakes: [[int* a, b;]]. جربت [[sizeof(a)]] و [[sizeof(b)]]: طلعوا [[8 4]]. النجمة بتمسك في a بس، و b طلع int عادي.

---

## ٨. الـ solCode: [[min_max]]

~~~c
void min_max(const int arr[], int len, int *min, int *max) {
    *min = arr[0];
    *max = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}
~~~

- الدالة محتاجة ترجّع **قيمتين**، و [[return]] بترجّع واحدة. فبتاخد عنوانين وتكتب فيهم.
- [[*min = arr[0]]]: اكتب في المتغير اللي في main.
- في main: [[int lo, hi;]] و [[min_max(a, 5, &lo, &hi);]].

~~~text الناتج مع {4, 9, 1, 7, 3}
min=1 max=9
~~~

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[int *p]] (تعريف) | p شايل عنوان int |
| [[&x]] | عنوان x |
| [[*p]] (استخدام) | اللي في العنوان: قراية أو كتابة |
| [[%p]] + [[(void *)]] | طباعة عنوان |
| [[NULL]] | مش بشاور على حاجة |

- عشان دالة تغيّر متغيرك: ابعت [[&x]] واستلم [[int *]].
- أي pointer: يا عنوان حقيقي يا [[NULL]]، ومتعملش [[*]] على NULL.`,
          lines: [
            "فيها printf.",
            R`[[swap]] بتاخد عنوانين لـ int.`,
            R`[[*a]]: روح للعنوان اللي في a وهات القيمة (1)، واحفظها.`,
            R`حط في عنوان a القيمة اللي في عنوان b.`,
            "وحط في عنوان b القيمة القديمة.",
            "قفلة swap.",
            "بداية main.",
            "متغير عادي في عنوان ما.",
            R`[[int *]] = pointer لـ int، و [[&score]] = عنوان score.`,
            R`[[*ptr]] بتروح للعنوان وتجيب 100.`,
            R`[[&score]] و ptr نفس العنوان. [[%p]] محتاجة [[void *]].`,
            "اكتب 250 في العنوان اللي ptr بيشاور عليه، يعني في score.",
            "score بقى 250.",
            "متغيرين.",
            R`نبعت عناوينهم مش قيمهم، فـ swap تقدر تغيّرهم.`,
            "اتبدّلوا: x=2 y=1.",
            R`[[NULL]]: pointer مش بيشاور على حاجة.`,
            R`اتشيّك قبل ما تعمل [[*]].`,
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج (العنوان عندك هيختلف، وهيتغيّر كل مرة):
[[score=100 *ptr=100]]
[[&score=0x7fff96a249fc ptr=0x7fff96a249fc]]
[[score after *ptr = 250: 250]]
[[x=2 y=1]]
[[nothing points nowhere]]

[[min_max]] بتكتب في [[*min]] و [[*max]]، والنداء [[min_max(a, 5, &lo, &hi)]].

[[*bad = 5;]] مع [[-Wall]]: [[warning: 'bad' is used uninitialized [-Wuninitialized]]]، والبرنامج ممكن يقع بـ [[Segmentation fault]]، وممكن ميقعش ويكتب في مكان عشوائي بهدوء (ده اللي حصل عندي على gcc 14: كمّل عادي). والحالة التانية أسوأ، لأن الغلط بيبان بعدين في مكان ملوش علاقة.`,
          solCode: R`#include <stdio.h>

void min_max(const int arr[], int len, int *min, int *max) {
    *min = arr[0];
    *max = arr[0];
    for (int i = 1; i < len; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int a[5] = {4, 9, 1, 7, 3};
    int lo, hi;
    min_max(a, 5, &lo, &hi);
    printf("min=%d max=%d\n", lo, hi);
    return 0;
}`
        },
        {
          cmd: "pointer arithmetic",
          title: "يعني إيه p + 1 في الـ pointers، وليه arr[i] هي نفسها *(arr + i)؟",
          desc: R`لما تزوّد رقم على pointer، هو مبيزيدش bytes، بيزيد عناصر. لو [[p]] من نوع [[int *]] و الـ int بـ 4 bytes، يبقى [[p + 1]] العنوان اللي بعده بـ 4 bytes، يعني العنصر اللي بعده.

ومن هنا: [[arr[i]]] في C معناها بالظبط [[*(arr + i)]]: روح لأول عنصر، واتحرك i عناصر، وهات اللي هناك. الأقواس المربعة مجرد اختصار.

array decay: اسم الـ array في أغلب الأماكن بيتحول لوحده لـ pointer لأول عنصر. فـ [[int *p = arr;]] صح من غير [[&]]، ولما تبعت array لدالة اللي بيتبعت pointer. وده سبب إن الدالة متعرفش الطول، وسبب إن [[scanf("%s", name)]] من غير [[&]].

بس الـ array مش pointer:
• [[sizeof(arr)]] حجم الـ array كلها (16 لـ 4 أرقام)، و [[sizeof(p)]] حجم الـ pointer (8).
• [[p++]] مسموح، و [[arr++]] لأ: الـ array مكانها ثابت.

عمليات مسموحة: pointer + رقم، و pointer - pointer (عدد العناصر بينهم، لو الاتنين في نفس الـ array)، والمقارنة ([[it != arr + 4]]). و [[arr + 4]] (واحد بعد الآخر) مسموح تحسبه وتقارن بيه، بس متعملوش [[*]].`,
          example: R`#include <stdio.h>

int sum(const int *p, int len) {
    int total = 0;
    for (int i = 0; i < len; i++) total += *(p + i);
    return total;
}

int main(void) {
    int arr[4] = {10, 20, 30, 40};
    int *p = arr;
    printf("%d %d %d\n", *p, *(p + 1), p[2]);
    printf("bytes from p to p+1: %td\n", (char *)(p + 1) - (char *)p);
    p++;
    printf("after p++: %d\n", *p);
    printf("sizeof(arr)=%zu sizeof(p)=%zu\n", sizeof(arr), sizeof(p));
    printf("sum=%d\n", sum(arr, 4));
    for (int *it = arr; it != arr + 4; it++) printf("%d ", *it);
    printf("\n");
    return 0;
}`,
          try: R`اكتب [[size_t my_strlen(const char *s)]] بالـ pointers بس، من غير [[[ ]]] ولا index: امشي بـ pointer لحد ما [[*s]] تبقى [['\0']]، والطول هو الفرق بين الـ pointer في الآخر وفي الأول. وجرّب تطبع [[3[arr]]]: ليه بتشتغل؟`,
          flag: "script",
          deep: {
            why: R`ده اللي بيخلي الـ arrays سريعة، وده اللي ورا الـ iterators في C++ (فكرتها نفس فكرة [[it != arr + 4]] بالظبط). ولو فهمت الدرس ده هتفهم ليه الدوال محتاجة الطول، وليه الـ buffer overflow سهل يحصل.`,
            how: R`[[p + i]] الـ compiler بيحسبها: العنوان + i × [[sizeof(*p)]]. عشان كده النوع مهم: [[char *]] بيتحرك byte، و [[int *]] أربعة، و [[double *]] تمانية. وفي المثال عملنا cast لـ [[char *]] عشان نشوف المسافة بالـ bytes.

الفرق بين pointerين نوعه [[ptrdiff_t]] وبيتطبع بـ [[%td]].

ولأن [[a[b]]] معناها [[*(a + b)]] والجمع بيقبل الترتيب، [[3[arr]]] هي [[*(3 + arr)]] = [[arr[3]]]. معلومة غريبة للانترفيو، متكتبهاش في كود حقيقي.`,
            when: R`قراية كود C الحقيقي (المكتبات، نواة Linux) مليانة pointer arithmetic. في كودك استخدم [[arr[i]]] لأنها أوضح، والـ pointers لما تمشي على buffer (parsing لنص أو بروتوكول). وفي C++ الـ iterators والـ [[std::span]] بيدّوك نفس الفكرة بأمان أكتر.`,
            mistakes: R`تفتكر إن [[p + 1]] بتزوّد byte واحد. وتعمل [[*]] على [[arr + len]] (واحد بعد الآخر). وتطرح pointers من arrays مختلفة. وتعمل [[sizeof]] على pointer وتفتكره حجم الـ array. وتعدّل الـ pointer الأصلي اللي جالك من malloc ([[p++]]) وبعدين تعمل [[free(p)]] على العنوان الجديد: لازم free على نفس العنوان اللي malloc رجّعته.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيمشي على array من ٤ أرقام بالـ pointer بدل الـ index: يقرا بـ [[*(p + 1)]]، ويقيس [[p + 1]] بيتحرك كام byte، ويحرّك الـ pointer نفسه، ويقارن [[sizeof]] بتاع array و pointer، ويلف على الـ array بـ pointer لحد «واحد بعد الآخر». اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]].

~~~text الناتج كله
10 20 30
bytes from p to p+1: 4
after p++: 20
sizeof(arr)=16 sizeof(p)=8
sum=100
10 20 30 40 
~~~

---

## ١. [[int *p = arr;]]: الـ array decay

~~~c
    int arr[4] = {10, 20, 30, 40};
    int *p = arr;
~~~

اسم الـ array في أغلب الأماكن بيتحوّل لوحده لعنوان أول عنصر (ده اسمه decay). فـ [[int *p = arr;]] زي [[int *p = &arr[0];]] بالظبط، ومحتاجتش [[&]].

---

## ٢. تلات طرق تقرا بيها

~~~c
    printf("%d %d %d\n", *p, *(p + 1), p[2]);
~~~

| المكتوب | معناه | القيمة |
|---|---|---|
| [[*p]] | اللي في أول عنوان | 10 |
| [[*(p + 1)]] | اتحرك **عنصر** واحد، وهات اللي هناك | 20 |
| [[p[2]]] | اختصار لـ [[*(p + 2)]] | 30 |

الأقواس في [[*(p + 1)]] لازمة: [[*p + 1]] من غيرها = (اللي في p) + 1 = 11.

---

## ٣. [[p + 1]] بيتحرك كام byte؟

~~~c
    printf("bytes from p to p+1: %td\n", (char *)(p + 1) - (char *)p);
~~~

من جوه لبرة:

- [[p + 1]]: العنوان اللي بعد p بعنصر int.
- [[(char *)]]: cast لـ pointer لـ char. الـ char بـ byte واحد، فلما نطرح pointerين من نوع [[char *]] الفرق بيطلع بالـ bytes.
- [[-]] بين pointerين = عدد العناصر بينهم (بنوع الـ pointer)، ونوع الناتج [[ptrdiff_t]].
- [[%td]]: [[t]] = حجم ptrdiff_t، و [[d]] = رقم صحيح.

~~~text الناتج
bytes from p to p+1: 4
~~~

يعني [[p + 1]] = العنوان + 1 × [[sizeof(int)]] = + 4. جربت نفس الحسبة على [[double *]] و [[char *]] وطلعوا [[8 1]]: كل pointer بيتحرك بحجم النوع بتاعه.

---

## ٤. [[p++]]: تحريك الـ pointer نفسه

~~~c
    p++;
    printf("after p++: %d\n", *p);
~~~

p بقى بيشاور على العنصر التاني: [[after p++: 20]]. الـ array نفسها متحركتش. ولو كتبت [[arr++]] الـ compiler يرفض ([[error: lvalue required as increment operand]]، يعني «ده مش حاجة ينفع تتغيّر»): الـ array مكانها ثابت، والـ pointer متغير.

---

## ٥. الـ array مش pointer

~~~c
    printf("sizeof(arr)=%zu sizeof(p)=%zu\n", sizeof(arr), sizeof(p));
~~~

~~~text الناتج
sizeof(arr)=16 sizeof(p)=8
~~~

[[sizeof]] هو المكان اللي الـ decay مبيحصلش فيه: [[arr]] هنا الـ array كلها (4 × 4 = 16)، و [[p]] عنوان (8 bytes على 64-bit) مهما كان بيشاور على إيه.

---

## ٦. [[sum]]: دالة بـ pointer صريح

~~~c
int sum(const int *p, int len) {
    int total = 0;
    for (int i = 0; i < len; i++) total += *(p + i);
    return total;
}
~~~

- [[const int *p]]: نفس [[const int arr[]]] بتاعة درس الـ arrays بالظبط. الكتابتين في parameter معناهم pointer.
- [[*(p + i)]] = [[p[i]]]. الـ for هنا جسمها جملة واحدة من غير [[{ }]].
- [[sum(arr, 4)]]: 10 + 20 + 30 + 40 = [[100]].

---

## ٧. اللف بالـ pointer

~~~c
    for (int *it = arr; it != arr + 4; it++) printf("%d ", *it);
~~~

| الجزء | هنا |
|---|---|
| البداية | [[int *it = arr]]: it على أول عنصر |
| الشرط | [[it != arr + 4]]: طول ما مش وصلنا «واحد بعد الآخر» |
| الخطوة | [[it++]]: العنصر اللي بعده |

[[arr + 4]] عنوان بعد آخر عنصر. C بتسمح تحسبه وتقارن بيه (جربت [[(arr + 4) - arr]] وطلع [[4]])، بس [[*(arr + 4)]] ممنوع: مفيش عنصر هناك. وده بالظبط شكل الـ iterators في C++: [[begin()]] و [[end()]].

~~~text الناتج
10 20 30 40 
~~~

---

## ٨. الـ try

### [[3[arr]]]

جربت [[printf("%d\n", 3[arr]);]] وطبعت [[40]]. [[a[b]]] مجرد [[*(a + b)]]، والجمع مش فارق معاه الترتيب: [[*(3 + arr)]] = [[*(arr + 3)]] = [[arr[3]]]. معلومة للانترفيو بس.

### الـ solCode: [[my_strlen]]

~~~c
size_t my_strlen(const char *s) {
    const char *start = s;
    while (*s != '\0') s++;
    return (size_t)(s - start);
}
~~~

- [[stddef.h]] فيها [[size_t]] و [[ptrdiff_t]].
- [[start]]: احفظ عنوان البداية قبل ما تحرّك s.
- [[while (*s != '\0') s++;]]: طول ما الحرف اللي s عليه مش الصفر، اتحرك حرف.
- [[s - start]]: عدد الحروف بين الآخر والأول. نوعه [[ptrdiff_t]] (ممكن يبقى سالب)، فبنعمل cast لـ [[size_t]] اللي الدالة بترجّعه.

[[my_strlen("pointer")]] طبعت [[7]].

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[p + i]] | العنوان + i × حجم النوع |
| [[*(p + i)]] = [[p[i]]] | العنصر رقم i |
| [[q - p]] | عدد العناصر بينهم ([[%td]]) |
| [[int *p = arr]] | decay: عنوان أول عنصر |
| [[arr + len]] | واحد بعد الآخر: قارن بيه، متقراش منه |

- [[sizeof(arr)]] = الـ array كلها، و [[sizeof(p)]] = 8.
- النوع هو اللي بيحدد [[p + 1]] بيتحرك كام byte.`,
          lines: [
            "فيها printf.",
            R`نفس الدالة بتاعة الـ array، بس مكتوبة كـ pointer صريح.`,
            "مجموع.",
            R`[[*(p + i)]] = العنصر رقم i، زي [[p[i]]] بالظبط.`,
            "رجّع المجموع.",
            "قفلة الدالة.",
            "بداية main.",
            "array من ٤ أرقام.",
            R`اسم الـ array بيتحول لعنوان أول عنصر، من غير [[&]].`,
            R`أول عنصر، والتاني بالـ arithmetic، والتالت بالأقواس.`,
            R`المسافة بين p و p+1 بالـ bytes = حجم int.`,
            "الـ pointer اتحرك عنصر واحد.",
            "بقى بيشاور على 20.",
            "الـ array 16 byte، والـ pointer 8.",
            "نبعت الـ array، واللي بيتبعت عنوان أول عنصر.",
            R`لف بالـ pointer: من أول عنصر لحد «واحد بعد الآخر».`,
            "سطر جديد.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[10 20 30]]
[[bytes from p to p+1: 4]]
[[after p++: 20]]
[[sizeof(arr)=16 sizeof(p)=8]]
[[sum=100]]
[[10 20 30 40 ]]

[[my_strlen]]: احفظ البداية، وامشي لحد الصفر، واطرح.
[[3[arr]]] بتطبع 40، لأنها [[*(3 + arr)]] = [[*(arr + 3)]].`,
          solCode: R`#include <stdio.h>
#include <stddef.h>

size_t my_strlen(const char *s) {
    const char *start = s;
    while (*s != '\0') s++;
    return (size_t)(s - start);
}

int main(void) {
    printf("%zu\n", my_strlen("pointer"));
    return 0;
}`
        },
        {
          cmd: "إدارة الذاكرة: malloc و free",
          title: "malloc و calloc و realloc و free: إمتى تحجز من الـ heap، والفرق بينه وبين الـ stack",
          desc: R`لحد دلوقتي كل المتغيرات كانت على الـ stack: الـ compiler بيعرف حجمها وقت الـ compile، وبتتمسح لوحدها لما الدالة تخلص. ده سريع جدًا، بس ليه حدود:
• الحجم لازم يبقى معروف (أو صغير)، والـ stack نفسه صغير (غالبًا ٨ ميجا على Linux و ١ ميجا على Windows).
• المتغير بيموت مع الدالة، فمينفعش ترجّع array محلية.

الـ heap مساحة كبيرة تحجز منها وقت التشغيل بالحجم اللي محتاجه، والذاكرة دي بتفضل موجودة لحد ما انت تقول. الدوال في [[stdlib.h]]:
• [[malloc(bytes)]]: احجز عدد bytes، والقيم جواها زبالة. بترجّع pointer لأول byte، أو [[NULL]] لو مفيش ذاكرة.
• [[calloc(count, size)]]: احجز count عنصر وصفّرهم.
• [[realloc(p, new_bytes)]]: كبّر أو صغّر حجز قديم. ممكن ينقله لمكان تاني ويرجّع عنوان جديد، أو [[NULL]] لو فشل (والقديم لسه سليم).
• [[free(p)]]: رجّع الذاكرة. بعدها p بيشاور على حاجة مش بتاعتك.

القاعدة: كل malloc أو calloc ليها free واحدة بالظبط. لو نسيت يبقى memory leak (البرنامج بياكل ذاكرة ومبيرجعهاش). ولو عملت free مرتين (double free) أو استخدمت الذاكرة بعد free (use after free) ده undefined behavior، وغالبًا ثغرة أمنية.

[[n * sizeof *arr]]: [[sizeof *arr]] = حجم العنصر اللي arr بيشاور عليه. أحسن من [[sizeof(int)]] لأن لو غيّرت نوع arr بعدين الحجم هيتظبط لوحده.`,
          example: R`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 3;
    int *arr = malloc(n * sizeof *arr);
    if (arr == NULL) {
        fprintf(stderr, "out of memory\n");
        return 1;
    }
    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    int *bigger = realloc(arr, 5 * sizeof *arr);
    if (bigger == NULL) {
        free(arr);
        return 1;
    }
    arr = bigger;
    arr[3] = 40;
    arr[4] = 50;
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\n");
    int *zeros = calloc(4, sizeof *zeros);
    if (!zeros) {
        free(arr);
        return 1;
    }
    printf("calloc gives zeros: %d %d\n", zeros[0], zeros[3]);
    free(zeros);
    free(arr);
    arr = NULL;
    return 0;
}`,
          try: R`اكتب برنامج يقرا أرقام من الـ input لحد ما يخلص (scanf ترجّع حاجة غير 1)، ويخزنهم في array بتكبر لوحدها: ابدأ بسعة 4، ولما تتملي اعمل realloc بالضعف. في الآخر اطبع العدد والمجموع واعمل free. جرّبه بـ [[seq 1 100 | ./app]]. وبعدين امسح الـ free واعمل compile بـ [[-fsanitize=address]]: إيه اللي اتطبع في الآخر؟`,
          flag: "script",
          deep: {
            why: "أي برنامج حقيقي بيتعامل مع داتا حجمها مش معروف مسبقًا: ملف، أو طلبات من الشبكة، أو صورة. والـ heap هو المكان الوحيد لده في C. وأخطاء الذاكرة (leaks و use after free و double free) من أشهر أسباب الـ crashes والثغرات في برامج C و C++، عشان كده C++ عملت RAII و smart pointers (المستوى ٢ و ٣).",
            how: R`[[malloc]] مش بتكلم نظام التشغيل كل مرة: مكتبة C عندها مدير ذاكرة بياخد chunks كبيرة من النظام ويقسمها. وبيحفظ قبل كل حجز حجمه، وده اللي بيخلي [[free(p)]] تعرف تحرر كام من غير ما تقولها.

[[realloc]] لو فيه مكان فاضي بعد الحجز بتكبّره في مكانه، ولو مفيش بتحجز مكان جديد وتنسخ وتحرر القديم. عشان كده لازم تاخد العنوان اللي رجع. والتكبير بالضعف (مش +1 كل مرة) بيخلي متوسط تكلفة الإضافة ثابت، وده نفس اللي [[std::vector]] بيعمله.

لما البرنامج يخلص، نظام التشغيل بياخد كل ذاكرته. بس في برنامج شغال طول الوقت (سيرفر، لعبة) الـ leak بيتراكم لحد ما الذاكرة تخلص.`,
            when: R`لما الحجم بيتحدد وقت التشغيل، أو كبير على الـ stack، أو الداتا لازم تعيش بعد ما الدالة اللي عملتها تخلص. وفي C++ متستخدمش malloc خالص تقريبًا: [[std::vector]] و [[std::string]] و [[std::make_unique]] بيعملوا الحجز والتحرير لوحدهم.`,
            mistakes: R`[[arr = realloc(arr, ...)]] مباشرة: لو فشلت، arr بقى NULL وضاع عنوان الذاكرة القديمة (leak). ومتتشيّكش على NULL. و [[malloc(n)]] بدل [[malloc(n * sizeof *arr)]]: حجزت n bytes مش n عنصر. و free مرتين، أو استخدام بعد free. والحل البسيط: [[arr = NULL;]] بعد free، لأن [[free(NULL)]] مسموحة ومبتعملش حاجة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيحجز array من 3 أرقام على الـ heap بـ [[malloc]]، ويكبّرها لـ 5 بـ [[realloc]]، ويحجز 4 أصفار بـ [[calloc]]، وفي الآخر يرجّع كل اللي حجزه بـ [[free]]. وكل حجز بيتشيّك عليه لو فشل. اتشغّل في [[docker run --rm gcc:14]] (gcc 14.4.0) بـ [[gcc -std=c17 -Wall -Wextra]]، ومرة كمان بـ [[-fsanitize=address,undefined]] ومطلعش ولا تقرير.

~~~text الناتج
10 20 30 40 50 
calloc gives zeros: 0 0
~~~

---

## ١. [[malloc]]

~~~c
    int n = 3;
    int *arr = malloc(n * sizeof *arr);
~~~

من جوه لبرة:

- [[sizeof *arr]]: حجم الحاجة اللي [[arr]] بيشاور عليها = [[sizeof(int)]] = 4. مش محتاج أقواس لأنها مش اسم نوع. وميزتها: لو غيّرت [[int *arr]] لـ [[double *arr]] بعدين، الحجم يتظبط لوحده.
- [[n * sizeof *arr]] = 3 × 4 = 12 byte.
- [[malloc(12)]] (memory allocate): «احجزلي 12 byte في الـ heap». بترجّع عنوان أول byte كـ [[void *]] (pointer من غير نوع)، و C بتحوّله لـ [[int *]] لوحدها.
- [[int *arr]]: من هنا arr بيتعامل زي array من 3 int.

الذاكرة دي قيمها زبالة لحد ما تكتب فيها، ومش بتتمسح لما الدالة تخلص: بتفضل لحد [[free]].

---

## ٢. اتشيّك على [[NULL]]

~~~c
    if (arr == NULL) {
        fprintf(stderr, "out of memory\n");
        return 1;
    }
~~~

لو مفيش ذاكرة، malloc بترجّع [[NULL]]. ولو كمّلت من غير ما تتشيّك، أول [[arr[0] = ...]] هتبقى كتابة على العنوان 0 = crash.

---

## ٣. الاستخدام زي array

~~~c
    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
~~~

[[arr[i]]] = [[*(arr + i)]] زي درس الـ pointer arithmetic. القيم: 10 و 20 و 30.

---

## ٤. [[realloc]]: كبّر

~~~c
    int *bigger = realloc(arr, 5 * sizeof *arr);
    if (bigger == NULL) {
        free(arr);
        return 1;
    }
    arr = bigger;
~~~

- [[realloc(arr, 20)]]: «خلي الحجز ده 20 byte». لو فيه مكان فاضي بعده بيكبّره في مكانه، ولو مفيش بيحجز مكان جديد، **وينسخ** الـ 10 و 20 و 30، ويحرر القديم.
- عشان كده العنوان اللي بيرجع ممكن يبقى جديد، ولازم تستخدمه هو.
- ليه في [[bigger]] مش في [[arr]] على طول؟ لو realloc فشلت بترجّع [[NULL]] **والحجز القديم لسه موجود**. لو كتبت [[arr = realloc(arr, ...)]] هتكتب NULL فوق العنوان الوحيد اللي معاك، والذاكرة القديمة تضيع (leak).
- لو فشلت: نحرر القديم ونخرج. لو نجحت: [[arr = bigger]].

~~~c
    arr[3] = 40;
    arr[4] = 50;
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
~~~

العنصرين الجداد فيهم زبالة فبنملاهم.

~~~text الناتج
10 20 30 40 50 
~~~

---

## ٥. [[calloc]]: احجز وصفّر

~~~c
    int *zeros = calloc(4, sizeof *zeros);
    if (!zeros) {
        free(arr);
        return 1;
    }
    printf("calloc gives zeros: %d %d\n", zeros[0], zeros[3]);
~~~

- [[calloc(count, size)]] (c = clear): 4 عناصر × 4 byte، **وكلهم أصفار**. الفرق عن malloc: الـ argumentين منفصلين، والتصفير مضمون.
- [[!zeros]] = [[zeros == NULL]] (NULL قيمته صفر، و [[!]] بتقلبه).
- لو فشلت، لازم نحرر [[arr]] اللي اتحجزت قبلها قبل ما نخرج.

~~~text الناتج
calloc gives zeros: 0 0
~~~

---

## ٦. [[free]]

~~~c
    free(zeros);
    free(arr);
    arr = NULL;
~~~

- كل حجز له [[free]] واحدة بالظبط، على **نفس** العنوان اللي رجع (هنا العنوان اللي رجع من realloc).
- [[arr = NULL]]: بعد free العنوان لسه جوه arr بس الذاكرة مش بتاعتك (dangling pointer). NULL بيخلي أي استخدام غلط بعد كده يقع بوضوح، و [[free(NULL)]] مسموحة ومبتعملش حاجة.

| الدالة | الـ arguments | القيم | لو فشلت |
|---|---|---|---|
| [[malloc]] | bytes | زبالة | [[NULL]] |
| [[calloc]] | عدد، حجم | أصفار | [[NULL]] |
| [[realloc]] | pointer، bytes جديدة | القديمة محفوظة، الجديدة زبالة | [[NULL]] والقديم سليم |
| [[free]] | pointer | | |

---

## ٧. الـ solCode: array بتكبر لوحدها

~~~c
    size_t count = 0, cap = 4;
    int *nums = malloc(cap * sizeof *nums);
    if (!nums) return 1;
    int x;
    while (scanf("%d", &x) == 1) {
        if (count == cap) {
            cap *= 2;
            int *bigger = realloc(nums, cap * sizeof *nums);
            if (!bigger) {
                free(nums);
                return 1;
            }
            nums = bigger;
        }
        nums[count++] = x;
    }
~~~

- [[count]] عدد العناصر اللي فيها، و [[cap]] (capacity) عدد اللي تساعهم. الاتنين [[size_t]] لأنهم أحجام.
- [[while (scanf(...) == 1)]]: كمّل طول ما قريت رقم. لما الـ input يخلص (EOF) أو ييجي حاجة مش رقم، scanf بترجّع حاجة تانية فنقف.
- لو اتملت ([[count == cap]]): ضاعف السعة بنفس طريقة المثال.
- [[nums[count++] = x]]: اكتب في [[nums[count]]] وبعدين زوّد count (الـ [[++]] بعد الاسم = القيمة القديمة الأول).
- بعد الـ loop: مجموع في [[long long]] وطباعة بـ [[%zu]] و [[%lld]]، و [[free(nums)]].

~~~bash
seq 1 100 | ./app
~~~

~~~text الناتج
count=100 sum=5050
~~~

[[seq 1 100]] بيطبع الأرقام من 1 لـ 100 كل واحد في سطر. والسعة اتضاعفت 4 ثم 8 ثم 16 ثم 32 ثم 64 ثم 128: ٥ مرات realloc بس لـ 100 رقم. وجربت كمان input فاضي ([[count=0 sum=0]]) و [[3 4 x 5]] ([[count=2 sum=7]]: وقف عند x).

---

## ٨. الـ try: امسح الـ [[free]]

مسحت [[free(nums);]] وعملت compile بـ [[-g -fsanitize=address]]:

~~~text الناتج
count=100 sum=5050

=================================================================
==67==ERROR: LeakSanitizer: detected memory leaks

Direct leak of 512 byte(s) in 1 object(s) allocated from:
    #0 0x7425b980c998  (/usr/local/lib64/libasan.so.8+0xf3998)
    #1 0x4012ba in main /w/L5leak.c:12

SUMMARY: AddressSanitizer: 512 byte(s) leaked in 1 allocation(s).
exit=1
~~~

- [[LeakSanitizer]]: جزء من AddressSanitizer بيشتغل لما البرنامج يخلص، ويدوّر على ذاكرة اتحجزت ومحدش حررها.
- [[512 byte(s)]] = السعة الأخيرة 128 × 4 byte.
- [[#1 ... main /w/L5leak.c:12]]: السطر اللي الحجز ده اتعمل فيه، وهو سطر الـ [[realloc]] (آخر realloc هو اللي ادّى الحجز ده).
- [[exit=1]]: الـ sanitizer غيّر الـ exit code لفشل، فالـ CI هيمسكها.

---

## الخلاصة

- [[T *p = malloc(n * sizeof *p);]] وبعدها على طول [[if (!p)]].
- realloc في متغير جديد، وبعدين [[p = bigger]].
- كل حجز = [[free]] واحدة، وبعدها [[p = NULL]].
- [[-fsanitize=address]] بيمسك الـ leaks والـ use after free والـ double free.`,
          lines: [
            "فيها printf.",
            R`فيها [[malloc]] و [[calloc]] و [[realloc]] و [[free]].`,
            "بداية main.",
            "عدد العناصر، ممكن ييجي من اليوزر.",
            R`احجز n × حجم int من الـ heap. [[sizeof *arr]] = حجم اللي arr بيشاور عليه.`,
            R`malloc بترجّع [[NULL]] لو مفيش ذاكرة.`,
            "رسالة على stderr.",
            "اخرج بفشل.",
            "قفلة الـ if.",
            R`نستخدمها زي array عادية: 10 و 20 و 30.`,
            R`كبّر لـ 5 عناصر. النتيجة في متغير جديد عشان لو فشلت منضيّعش arr.`,
            "realloc فشلت.",
            "القديم لسه سليم، فنحرره.",
            "ونخرج.",
            "قفلة الـ if.",
            "نجحت: خد العنوان الجديد (ممكن يكون اتنقل).",
            "العناصر الجديدة فيها زبالة، فنملاها.",
            "العنصر الأخير.",
            "اطبع الخمسة.",
            "سطر جديد.",
            R`[[calloc]]: 4 عناصر متصفّرة.`,
            R`[[!zeros]] = لو NULL.`,
            "متنساش الحجز التاني قبل ما تخرج.",
            "اخرج بفشل.",
            "قفلة الـ if.",
            "calloc بتضمن أصفار.",
            "free لكل حجز.",
            R`وده كمان. ولاحظ إن [[free]] على العنوان اللي رجع من realloc.`,
            "عشان أي استخدام بالغلط بعد كده يبقى NULL واضح.",
            "نجاح.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[10 20 30 40 50 ]]
[[calloc gives zeros: 0 0]]

برنامج الـ array اللي بتكبر مع [[seq 1 100 | ./app]] لازم يطبع [[count=100 sum=5050]].

ولما تمسح الـ free وتعمل compile بـ [[-g -fsanitize=address]]، في آخر التشغيل بيطلع تقرير LeakSanitizer:
[[ERROR: LeakSanitizer: detected memory leaks]]
[[Direct leak of 512 byte(s) in 1 object(s) allocated from:]]
ومعاه السطر اللي اتعمل فيه الحجز. (الـ 512 = سعة 128 × 4 bytes، لأن السعة اتضاعفت 4 ثم 8 ... لحد 128.)`,
          solCode: R`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t count = 0, cap = 4;
    int *nums = malloc(cap * sizeof *nums);
    if (!nums) return 1;
    int x;
    while (scanf("%d", &x) == 1) {
        if (count == cap) {
            cap *= 2;
            int *bigger = realloc(nums, cap * sizeof *nums);
            if (!bigger) {
                free(nums);
                return 1;
            }
            nums = bigger;
        }
        nums[count++] = x;
    }
    long long sum = 0;
    for (size_t i = 0; i < count; i++) sum += nums[i];
    printf("count=%zu sum=%lld\n", count, sum);
    free(nums);
    return 0;
}`
        }
      ]
    },
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
