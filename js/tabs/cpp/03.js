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
    }
]);
