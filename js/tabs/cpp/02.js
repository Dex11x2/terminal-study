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
