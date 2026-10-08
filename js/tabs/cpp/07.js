// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
    {
      t: "الـ STL: containers و iterators و algorithms",
      l: 2,
      n: "المكتبة القياسية: vector و map و set و unordered_map و deque و array، والـ iterators، والـ algorithms والـ lambdas، و auto و structured bindings",
      items: [
        {
          cmd: "الـ std::vector في C++",
          title: "std::vector: array بتكبر لوحدها (push_back و at و size و reserve و erase)",
          desc: R`[[std::vector<T>]] أهم container في C++، واختيارك الافتراضي لأي «قايمة». array على الـ heap بتكبر لوحدها وبتحرر نفسها (RAII)، والعناصر جنب بعض في الذاكرة زي array الـ C بالظبط.

[[< >]] بعد اسم الـ container بتقول نوع العناصر: [[std::vector<int>]] و [[std::vector<std::string>]].

أهم العمليات:
• [[v.push_back(x)]]: ضيف في الآخر. و [[v.emplace_back(args)]]: نفس الفكرة بس بيبني العنصر في مكانه من الـ arguments (مفيد مع الـ objects).
• [[v.size()]]: عدد العناصر. و [[v.empty()]]: فاضي ولا لأ.
• [[v[i]]]: العنصر رقم i من غير فحص حدود (سريع، و UB لو بره).
• [[v.at(i)]]: نفس الحاجة بس بتتشيّك، ولو بره بترمي exception ([[std::out_of_range]]).
• [[v.front()]] و [[v.back()]]: أول وآخر عنصر.
• [[v.pop_back()]]: شيل الأخير.
• [[v.erase(v.begin() + i)]]: شيل العنصر رقم i. [[v.begin()]] iterator لأول عنصر (الـ iterators ليها درس).
• [[v.reserve(n)]]: احجز مكان لـ n عنصر مقدمًا من غير ما تضيف. و [[v.capacity()]]: المكان المحجوز فعلًا.
• [[std::vector<int> v(5, 0)]]: خمس عناصر كلهم 0. خلي بالك: الأقواس [[( )]] غير [[{ }]]، فـ [[std::vector<int> v{5, 0}]] = عنصرين: 5 و 0.

و vector جوه vector = جدول: [[std::vector<std::vector<int>> grid(3, std::vector<int>(4, 0));]] تلات صفوف في كل صف ٤ أصفار.`,
          example: R`#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {5, 3, 8};
    v.push_back(1);
    v.emplace_back(9);
    std::cout << "size=" << v.size() << " front=" << v.front() << " back=" << v.back() << '\n';
    v[0] = 50;
    std::cout << "at(1)=" << v.at(1) << '\n';
    v.erase(v.begin() + 1);
    v.pop_back();
    for (int x : v) std::cout << x << ' ';
    std::cout << '\n';
    std::vector<int> big;
    big.reserve(1000);
    std::cout << "size=" << big.size() << " capacity=" << big.capacity() << '\n';
    std::vector<std::vector<int>> grid(2, std::vector<int>(3, 7));
    std::cout << "grid " << grid.size() << "x" << grid[0].size() << " = " << grid[1][2] << '\n';
}`,
          try: R`اعمل vector فاضي، وضيف فيه الأرقام من 1 لـ 20 بـ push_back، واطبع [[size]] و [[capacity]] بعد كل إضافة: إمتى الـ capacity بتتغير، وبكام؟ وبعدين اطبع [[v.at(100)]]، وبعدين [[v[100]]] واعمل compile بـ [[-fsanitize=address]].`,
          flag: "script",
          deep: {
            why: R`vector بيحل كل مشاكل الـ array في C: بيعرف طوله، وبيكبر لوحده، وبيحرر نفسه، وبيتنسخ صح، وبيتبعت لدالة بـ [[const &]] من غير ما يضيع الطول. ولأن العناصر جنب بعض، اللف عليه أسرع من أغلب الـ containers التانية بفرق كبير (درس الأداء في المستوى ٣). القاعدة المشهورة: استخدم vector إلا لو عندك سبب.`,
            how: R`جوه الـ vector ٣ حاجات: pointer للعناصر على الـ heap، والـ size، والـ capacity. لما الـ size يوصل للـ capacity و تعمل push_back، بيحجز مكان أكبر (في libstdc++ بتاع gcc ضعف القديم)، وينقل العناصر، ويحرر القديم. عشان كده push_back متوسطها [[O(1)]] (amortized) مع إن مرة كل فين وفين بتبقى [[O(n)]].

ونتيجة النقل ده: أي pointer أو reference أو iterator لعنصر في الـ vector بيبقى باظ بعد push_back لو حصل نقل. ده اسمه iterator invalidation.

[[erase]] من النص [[O(n)]] لأنه بيزق كل اللي بعده خطوة. ومن الآخر ([[pop_back]]) [[O(1)]].`,
            when: R`أي قايمة. لو عارف الحجم التقريبي اعمل [[reserve]] عشان توفّر النقل. ولو الحجم ثابت ومعروف وقت الـ compile ممكن [[std::array]]. ولو بتضيف وتشيل من الأول كتير [[std::deque]].`,
            mistakes: R`تحتفظ بـ pointer أو reference لعنصر وبعدين تعمل push_back. وتعمل erase جوه range-for على نفس الـ vector (درس الـ iterators). وتستخدم [[v[i]]] بـ i ممكن يبقى بره، والأحسن [[at]] وانت بتطوّر. و [[for (int i = 0; i < v.size(); i++)]]: مقارنة int بـ unsigned و [[-Wextra]] بينبّهك، استخدم range-for أو [[std::size_t]]. و [[reserve]] مش بتغيّر الـ size: [[v[0]]] بعدها لسه UB.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيجرّب أهم عمليات [[std::vector]]: يضيف ويقرا ويشيل، ويحجز مكان مقدمًا، ويعمل جدول من vector جوه vector. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
size=5 front=5 back=9
at(1)=3
50 8 1 
size=0 capacity=1000
grid 2x3 = 7
~~~

---

## ١. التعريف والإضافة

~~~cpp
    std::vector<int> v = {5, 3, 8};
    v.push_back(1);
    v.emplace_back(9);
~~~

- [[std::vector<int>]]: الـ [[< >]] فيها نوع العناصر.
- [[= {5, 3, 8}]]: قيم أولية.
- [[push_back(1)]]: ضيف 1 في الآخر.
- [[emplace_back(9)]]: نفس النتيجة. الفرق بيبان مع objects: [[emplace_back]] بتبني العنصر جوه الـ vector من الـ arguments على طول، و [[push_back]] بتاخد object جاهز.

v دلوقتي: [[5 3 8 1 9]]. فـ [[size()]] = 5، و [[front()]] = 5، و [[back()]] = 9.

## ٢. القراية: [[[ ]]] و [[at]]

~~~cpp
    v[0] = 50;
    std::cout << "at(1)=" << v.at(1) << '\n';
~~~

| الطريقة | لو الرقم بره الحدود |
|---|---|
| [[v[i]]] | مفيش فحص: undefined behavior |
| [[v.at(i)]] | بترمي [[std::out_of_range]] |

جربنا الاتنين على vector فيه 20 عنصر:

~~~text v.at(100)
terminate called after throwing an instance of 'std::out_of_range'
  what():  vector::_M_range_check: __n (which is 100) >= this->size() (which is 20)
~~~

[[terminate called]] = exception محدش مسكه، فالبرنامج وقف (exit 134). و [[v[100]]] من غير sanitizer طبعت [[0]] وكمّلت عادي (رقم من ذاكرة مش بتاعتنا). مع [[-fsanitize=address]]:

~~~text ASan
ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50c0000001d0
READ of size 4 at 0x50c0000001d0 thread T0
    #0 0x4014ac in main /tmp/b.cpp:6
0x50c0000001d0 is located 272 bytes after 128-byte region
~~~

[[READ of size 4]] = قرا int (4 bytes). و [[128-byte region]] = مكان الـ vector (capacity 32 × 4)، والقراية كانت بعده بـ 272 byte.

## ٣. الشيل

~~~cpp
    v.erase(v.begin() + 1);
    v.pop_back();
~~~

- [[v.begin()]]: iterator (زي pointer) لأول عنصر، و [[+ 1]] = التاني. فبيشيل الـ 3، والباقي بيتزق لورا.
- [[pop_back()]]: يشيل الأخير (9).

[[for (int x : v)]] بتطبع [[50 8 1 ]] (فيه مسافة في الآخر من [[<< ' ']]).

## ٤. [[reserve]] و [[capacity]]

~~~cpp
    std::vector<int> big;
    big.reserve(1000);
~~~

- [[size()]]: عدد العناصر اللي فيه = 0.
- [[capacity()]]: المكان المحجوز = 1000.

الـ vector لما يتملي بيحجز مكان أكبر وينقل كل العناصر. الـ try: ضفنا من 1 لـ 20 وطبعنا [[size:capacity]]:

~~~text الناتج
1:1 2:2 3:4 4:4 5:8 6:8 7:8 8:8 9:16 10:16 11:16 12:16 13:16 14:16 15:16 16:16 17:32 18:32 19:32 20:32
~~~

مع gcc الـ capacity بتتضاعف: 1 ثم 2 ثم 4 ثم 8 ثم 16 ثم 32. فلو عارف العدد مقدمًا، [[reserve]] بيوفّر كل النقل ده.

## ٥. الجدول

~~~cpp
    std::vector<std::vector<int>> grid(2, std::vector<int>(3, 7));
~~~

من جوه لبرة: [[std::vector<int>(3, 7)]] = صف فيه 3 سبعات. و [[grid(2, صف)]] = صفين، كل واحد نسخة من الصف. [[grid[1][2]]] = الصف التاني العنصر التالت = 7.

> الأقواس [[( )]] غير [[{ }]]: [[std::vector<int> a(3, 7)]] = ٣ سبعات، و [[std::vector<int> b{3, 7}]] = عنصرين: 3 و 7.

---

## الخلاصة

| العملية | الشكل |
|---|---|
| ضيف | [[push_back(x)]] و [[emplace_back(args)]] |
| اقرا | [[v[i]]] (سريع) و [[v.at(i)]] (بفحص) |
| أول وآخر | [[front()]] و [[back()]] |
| شيل | [[pop_back()]] و [[erase(v.begin() + i)]] |
| احجز | [[reserve(n)]]، و [[capacity()]] المحجوز |
| جدول | [[vector<vector<int>> g(rows, vector<int>(cols, 0))]] |`,
          lines: [
            "cout.",
            R`[[vector]].`,
            "main.",
            R`[[std::vector<int>]] بقيم أولية.`,
            "ضيف في الآخر.",
            "نفس الفكرة: بيبني العنصر في مكانه.",
            "size=5 front=5 back=9.",
            R`[[[ ]]] من غير فحص.`,
            R`[[at]] بفحص الحدود. at(1)=3.`,
            R`شيل العنصر رقم 1 (3). [[v.begin() + 1]] = iterator للعنصر التاني.`,
            "شيل الأخير (9).",
            "اللي فاضل: 50 8 1.",
            "سطر جديد.",
            "vector فاضي.",
            "احجز مكان لـ 1000 من غير ما تضيف.",
            "size=0 و capacity=1000.",
            "جدول: صفين، كل صف ٣ عناصر قيمتهم 7.",
            R`[[grid[1][2]]]: الصف التاني العنصر التالت.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[size=5 front=5 back=9]]
[[at(1)=3]]
[[50 8 1 ]]
[[size=0 capacity=1000]]
[[grid 2x3 = 7]]

الـ capacity مع gcc بتمشي 1 ثم 2 ثم 4 ثم 8 ثم 16 ثم 32: بتتضاعف لما تتملي (المعيار مش بيحدد الرقم، و MSVC بيزوّد ١.٥ مرة).

[[v.at(100)]] بترمي exception، ولو محدش مسكه البرنامج بيقف:
[[terminate called after throwing an instance of 'std::out_of_range']]
[[what():  vector::_M_range_check: __n (which is 100) >= this->size() (which is 20)]]

[[v[100]]] من غير sanitizer ممكن تطبع أي رقم وتكمّل. مع ASan: [[heap-buffer-overflow]].`
        },
        {
          cmd: "الـ map و unordered_map في C++",
          title: "std::map و std::unordered_map: تخزين key و value، والفرق بينهم، وفخ الـ []",
          desc: R`الـ map بيخزن أزواج: key و value، وتوصل للقيمة بالـ key بسرعة. زي object في JS أو dict في Python.

[[std::map<std::string, int> stock]]: المفتاح string والقيمة int.
• [[stock["book"] = 3;]]: ضيف أو عدّل.
• [[stock["pen"] += 2;]]: عدّل.
• [[stock.count("laptop")]]: 1 لو موجود و 0 لو لأ. وفي C++20 [[stock.contains("laptop")]] أوضح.
• [[stock.find("apple")]]: بترجّع iterator. لو مش موجود بيساوي [[stock.end()]]. والـ iterator بيشاور على pair: [[it->first]] المفتاح و [[it->second]] القيمة.
• [[stock.erase("pen")]]: امسح.
• اللف: [[for (const auto &p : stock)]] كل p فيه [[.first]] و [[.second]]. ([[auto]] = «الـ compiler يعرف النوع لوحده»، ليها درس.)

الفرق:
• [[std::map]]: المفاتيح مترتبة دايمًا (أبجديًا هنا)، والعمليات [[O(log n)]]. مبني على شجرة (red-black tree).
• [[std::unordered_map]]: مفيش ترتيب، والعمليات [[O(1)]] في المتوسط. مبني على hash table. أسرع في أغلب الحالات.

الفخ المشهور: [[m[key]]] لو المفتاح مش موجود بتضيفه بقيمة افتراضية (0 للأرقام، و "" للنصوص) وبعدين ترجّعها. فمجرد إنك «تبص» على مفتاح مش موجود بـ [[[ ]]] بيغيّر الـ map. للقراية بس استخدم [[find]] أو [[contains]] أو [[at]] (بترمي exception لو مش موجود).

وده بالظبط اللي بيخلي العدّ سهل: [[words[w]++]] لو w جديد بيبدأ من 0 ويبقى 1.`,
          example: R`#include <iostream>
#include <map>
#include <string>
#include <unordered_map>

int main() {
    std::map<std::string, int> stock = {{"pen", 10}, {"apple", 5}};
    stock["book"] = 3;
    stock["pen"] += 2;
    for (const auto &p : stock) std::cout << p.first << '=' << p.second << ' ';
    std::cout << '\n';
    std::cout << "laptop? " << stock.count("laptop") << '\n';
    auto it = stock.find("apple");
    if (it != stock.end()) std::cout << "apple " << it->second << '\n';
    std::unordered_map<std::string, int> words;
    for (std::string w : {"a", "b", "a", "c", "a"}) words[w]++;
    std::cout << "a appears " << words["a"] << " times, size=" << words.size() << '\n';
    int ghost = stock["ghost"];
    std::cout << "after [ghost]: size=" << stock.size() << " value=" << ghost << '\n';
}`,
          try: R`اكتب برنامج يقرا كلام من الـ input لحد ما يخلص ([[while (std::cin >> w)]]) ويطبع كل كلمة وعدد مراتها مترتبة أبجديًا. جرّبه بـ [[echo "to be or not to be" | ./app]]. وبعدين بدّل الـ map بـ unordered_map: الترتيب اتغيّر؟ وبعدين اطبع [[stock.at("ghost2")]].`,
          flag: "script",
          deep: {
            why: R`العدّ والتجميع والبحث بالـ key موجودين في كل برنامج تقريبًا، ونص مسائل الانترفيو بتتحل بـ hash map (two sum، و anagrams، و أول حرف مش متكرر). وفهم الفرق بين الشجرة والـ hash بيتسأل.`,
            how: R`[[std::map]] شجرة متوازنة: كل عنصر node لوحده على الـ heap، وكل بحث بينزل من الجذر، فـ [[O(log n)]]. والترتيب بيتحدد بـ [[<]] على المفتاح، فأي نوع ليه [[<]] ينفع مفتاح.

[[std::unordered_map]] array من «buckets». المفتاح بيعدّي على دالة hash تطلّع رقم، والرقم بيحدد الـ bucket. المتوسط [[O(1)]]، بس لو مفاتيح كتير وقعت في نفس الـ bucket ممكن يبقى [[O(n)]]. ولما يتملي بيعمل rehash (يكبر ويوزّع تاني). والمفتاح محتاج hash و [[==]]: الأنواع المدمجة و string جاهزين، ولـ struct بتاعك لازم تكتب hash.

اللف على [[unordered_map]] ترتيبه مش مضمون، وممكن يتغير بين تشغيل وتشغيل أو بين compilers.`,
            when: R`unordered_map كاختيار افتراضي للبحث والعدّ. map لما محتاج ترتيب (تطبع مترتب، أو أصغر مفتاح أكبر من x بـ [[lower_bound]]). ولو المفاتيح أرقام صغيرة من 0 لـ n، vector عادي أسرع من الاتنين.`,
            mistakes: R`تستخدم [[m[key]]] عشان تتشيّك على وجود مفتاح فتضيفه بالغلط. وتعتمد على ترتيب unordered_map. وتعمل [[m[key]]] على map نوعه [[const]]: مش هتتعمل compile لأن [[[ ]]] ممكن تضيف، استخدم [[at]] أو [[find]]. وتمسح عناصر وانت بتلف عليها بالـ range-for.`
          },
          teach: R`## البرنامج بيعمل إيه؟

مخزن ([[std::map]]) فيه أسماء منتجات وكمياتها: بيضيف ويعدّل ويدوّر. وبعدين بيعد الكلمات بـ [[std::unordered_map]]، وفي الآخر بيوريك الفخ: [[[ ]]] على مفتاح مش موجود بتضيفه. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
apple=5 book=3 pen=12 
laptop? 0
apple 5
a appears 3 times, size=3
after [ghost]: size=4 value=0
~~~

---

## ١. التعريف

~~~cpp
    std::map<std::string, int> stock = {{"pen", 10}, {"apple", 5}};
~~~

- [[std::map<الـ key, الـ value>]]: المفتاح string والقيمة int.
- كل [[{ }]] جوه زوج: [[{"pen", 10}]].

## ٢. الإضافة والتعديل بـ [[[ ]]]

~~~cpp
    stock["book"] = 3;
    stock["pen"] += 2;
~~~

- [["book"]] مش موجود: اتضاف بـ 3.
- [["pen"]] موجود: بقى 12.

## ٣. اللف: مترتب

~~~cpp
    for (const auto &p : stock) std::cout << p.first << '=' << p.second << ' ';
~~~

- [[auto]]: الـ compiler يعرف النوع. النوع الحقيقي هنا [[std::pair<const std::string, int>]].
- [[const auto &]]: من غير نسخ ومن غير تعديل.
- [[p.first]] = المفتاح، و [[p.second]] = القيمة.

الناتج [[apple=5 book=3 pen=12]] **مترتب أبجديًا**، مع إننا ضفنا pen الأول. الـ map مبني على شجرة (red-black tree) بتفضل مترتبة، وكل عملية [[O(log n)]]: مع مليون مفتاح حوالي 20 خطوة.

## ٤. موجود ولا لأ؟

~~~cpp
    std::cout << "laptop? " << stock.count("laptop") << '\n';
    auto it = stock.find("apple");
    if (it != stock.end()) std::cout << "apple " << it->second << '\n';
~~~

- [[count(k)]]: 1 أو 0 (الـ map مفيهوش تكرار). [[laptop? 0]].
- [[find(k)]]: بترجّع iterator للزوج، أو [[stock.end()]] (يعني «مش لاقي») لو مش موجود.
- [[it->second]]: [[->]] لأن الـ iterator بيتعامل زي pointer.

## ٥. العدّ بـ [[unordered_map]]

~~~cpp
    std::unordered_map<std::string, int> words;
    for (std::string w : {"a", "b", "a", "c", "a"}) words[w]++;
~~~

- [[unordered_map]]: hash table. مفيش ترتيب، والعمليات [[O(1)]] في المتوسط.
- [[words[w]++]]: لو w جديد، [[[ ]]] بتضيفه بـ 0 وبعدين [[++]] = 1. لو موجود بيزيد.

[["a"]] 3 مرات، و 3 كلمات مختلفة: [[a appears 3 times, size=3]].

## ٦. الفخ: [[stock["ghost"]]]

~~~cpp
    int ghost = stock["ghost"];
~~~

كنا عايزين نقرا بس، بس [[[ ]]] ضافت [["ghost"]] بـ 0: [[size=4 value=0]]. للقراية من غير تعديل: [[find]] أو [[contains]] (C++20) أو [[at]]. و [[at]] على مفتاح مش موجود:

~~~text stock.at("ghost2")
terminate called after throwing an instance of 'std::out_of_range'
  what():  map::at
~~~

---

## ٧. الـ solCode: عدّ كلمات الـ input

~~~cpp
    std::map<std::string, int> count;
    std::string w;
    while (std::cin >> w) count[w]++;
    for (const auto &[word, n] : count) std::cout << word << ' ' << n << '\n';
~~~

- [[while (std::cin >> w)]]: [[>>]] بترجّع الـ stream، والـ stream في شرط بيبقى false لما الـ input يخلص (EOF).
- [[const auto &[word, n]]]: structured bindings (ليها درس): بتفك الزوج لاسمين بدل [[.first]] و [[.second]].

~~~bash
echo "to be or not to be" | ./app
~~~

| بالـ map | بالـ unordered_map |
|---|---|
| [[be 2]] | [[not 1]] |
| [[not 1]] | [[or 1]] |
| [[or 1]] | [[be 2]] |
| [[to 2]] | [[to 2]] |

نفس الأرقام، والـ unordered_map بترتيب الـ hash (ممكن يختلف بين المكتبات).

---

## الخلاصة

| | [[std::map]] | [[std::unordered_map]] |
|---|---|---|
| من جوه | شجرة | hash table |
| مترتب؟ | آه | لأ |
| السرعة | [[O(log n)]] | [[O(1)]] في المتوسط |

| عايز | استخدم |
|---|---|
| ضيف أو عدّل أو عدّ | [[m[k]]] |
| اقرا من غير ما تضيف | [[find]] أو [[contains]] أو [[at]] |
| امسح | [[erase(k)]] |`,
          lines: [
            "cout.",
            R`[[std::map]].`,
            "string.",
            R`[[std::unordered_map]].`,
            "main.",
            "map: المفتاح string والقيمة int، بقيم أولية.",
            R`ضيف مفتاح جديد بـ [[[ ]]].`,
            "عدّل قيمة موجودة: 12.",
            R`اللف بيطلع مترتب أبجديًا. p فيه first و second.`,
            "سطر جديد.",
            R`[[count]]: 0 لأن laptop مش موجود.`,
            R`[[find]] بترجّع iterator، أو [[end()]] لو مش موجود.`,
            R`[[it->second]]: القيمة. السهم لأن الـ iterator بيتصرف زي pointer.`,
            "hash map للعدّ.",
            R`[[words[w]++]]: الكلمة الجديدة بتبدأ من 0.`,
            "a ظهرت 3 مرات، و 3 كلمات مختلفة.",
            R`الفخ: [[[ ]]] على مفتاح مش موجود بتضيفه بـ 0.`,
            "الـ size بقى 4 بدل 3.",
            "قفلة."
          ],
          sol: R`الناتج:
[[apple=5 book=3 pen=12 ]]
[[laptop? 0]]
[[apple 5]]
[[a appears 3 times, size=3]]
[[after [ghost]: size=4 value=0]]

عدّ الكلمات مع [[echo "to be or not to be"]] بالـ map:
[[be 2]] و [[not 1]] و [[or 1]] و [[to 2]] مترتبين. بالـ unordered_map نفس الأرقام بترتيب تاني.

[[stock.at("ghost2")]] بترمي [[std::out_of_range]] برسالة [[map::at]].`,
          solCode: R`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> count;
    std::string w;
    while (std::cin >> w) count[w]++;
    for (const auto &[word, n] : count) std::cout << word << ' ' << n << '\n';
}`
        },
        {
          cmd: "set و deque و array",
          title: "containers تانية: std::array و std::set و std::deque و priority_queue، إمتى كل واحد؟",
          desc: R`غير vector و map، فيه containers لحالات معينة:

• [[std::array<int, 3>]]: array بحجم ثابت معروف وقت الـ compile (الرقم جزء من النوع). زي array الـ C بالظبط في السرعة والمكان (على الـ stack)، بس بتعرف حجمها ([[.size()]])، وبتتنسخ، وبتتبعت لدالة من غير ما تتحول لـ pointer.
• [[std::set<int>]]: مجموعة من غير تكرار ومترتبة. [[insert]] و [[erase]] و [[contains]] (C++20) [[O(log n)]]. و [[std::unordered_set]] نفس الفكرة من غير ترتيب و [[O(1)]] في المتوسط.
• [[std::deque<int>]]: «double-ended queue». زي vector بس الإضافة والشيل من الأول ([[push_front]] و [[pop_front]]) [[O(1)]] كمان.
• [[std::priority_queue<int>]]: heap. [[top()]] دايمًا أكبر عنصر، و [[push]] و [[pop]] [[O(log n)]]. ولو عايز الأصغر: [[std::priority_queue<int, std::vector<int>, std::greater<int>>]].
• [[std::stack]] و [[std::queue]]: واجهات بسيطة (adapters) فوق deque: stack بيطلع آخر واحد دخل (LIFO)، و queue أول واحد دخل (FIFO).
• [[std::list]]: linked list. نادرًا ما بيبقى الاختيار الصح (درس الأداء).

القاعدة: ابدأ بـ vector. لو محتاج «موجود ولا لأ» بسرعة: unordered_set. لو محتاج ترتيب ومن غير تكرار: set. لو بتشيل من الأول: deque. لو دايمًا عايز الأكبر أو الأصغر: priority_queue.`,
          example: R`#include <array>
#include <deque>
#include <iostream>
#include <queue>
#include <set>

int main() {
    std::array<int, 3> rgb = {255, 128, 0};
    std::cout << "rgb size=" << rgb.size() << " g=" << rgb[1] << '\n';
    std::set<int> s = {5, 1, 5, 3};
    s.insert(2);
    for (int x : s) std::cout << x << ' ';
    std::cout << "| has 3? " << s.contains(3) << '\n';
    std::deque<int> d = {2, 3};
    d.push_front(1);
    d.push_back(4);
    d.pop_front();
    std::cout << "deque front=" << d.front() << " back=" << d.back() << '\n';
    std::priority_queue<int> pq;
    for (int x : {4, 9, 1}) pq.push(x);
    std::cout << "max=" << pq.top() << '\n';
    pq.pop();
    std::cout << "next=" << pq.top() << '\n';
}`,
          try: R`اكتب دالة بتاخد [[std::vector<int>]] وترجّع عدد الأرقام المختلفة فيها بـ [[std::unordered_set]] (من غير sort). وبعدين استخدم priority_queue بالأصغر عشان تطبع أصغر ٣ أرقام من [[{7, 2, 9, 4, 1, 8}]].`,
          flag: "script",
          deep: {
            why: "اختيار الـ container الصح بيحوّل حل O(n²) لـ O(n log n) أو O(n)، وده بالظبط اللي بيتقاس في انترفيوهات الـ DSA. ومعرفة إن set مترتبة و unordered_set لأ، وإن priority_queue بتطلّع الأكبر افتراضيًا، بتوفّر bugs.",
            how: R`[[std::array]] مجرد struct جواه array الـ C، فمفيش أي تكلفة زيادة. [[std::set]] شجرة زي map بس من غير values. [[std::deque]] مقسوم chunks صغيرة، فالإضافة من الطرفين رخيصة، بس العناصر مش كلها جنب بعض. [[std::priority_queue]] binary heap جوه vector: الأكبر في الأول، وكل push أو pop بيصلّح الترتيب في [[O(log n)]].

[[std::greater<int>]] function object بيعمل [[a > b]]، فلما تديه للـ priority_queue الترتيب بيتعكس.`,
            when: R`array لحجم ثابت صغير (ألوان، إحداثيات، جدول ثابت). set لـ «مجموعة مترتبة من غير تكرار». deque لـ sliding window أو queue بتشيل من الأول. priority_queue لـ Dijkstra و «أكبر k عنصر» و الـ scheduling.`,
            mistakes: R`تستخدم [[std::list]] عشان «الإضافة في النص O(1)» وتنسى إن الوصول للنص نفسه [[O(n)]] والـ cache بيكرهها. وتفتكر إن priority_queue بتطلّع الأصغر (زي heapq في Python): هي بتطلّع الأكبر. وتعمل [[std::array<int, n>]] و n متغير: لازم ثابت وقت الـ compile.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيجرّب ٤ containers في برنامج واحد: [[std::array]] بحجم ثابت، و [[std::set]] من غير تكرار، و [[std::deque]] بتضيف من الناحيتين، و [[std::priority_queue]] اللي دايمًا فوقها الأكبر. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
rgb size=3 g=128
1 2 3 5 | has 3? 1
deque front=2 back=4
max=9
next=4
~~~

---

## ١. [[std::array<int, 3>]]

~~~cpp
    std::array<int, 3> rgb = {255, 128, 0};
    std::cout << "rgb size=" << rgb.size() << " g=" << rgb[1] << '\n';
~~~

- [[<int, 3>]]: النوع والحجم. الحجم جزء من النوع وثابت وقت الـ compile، فـ [[std::array<int, 4>]] نوع تاني.
- مكانه زي array الـ C (على الـ stack لو محلي)، بس بيعرف حجمه ([[size()]] = 3) وبيتنسخ بـ [[=]].
- [[rgb[1]]] = 128.

## ٢. [[std::set<int>]]

~~~cpp
    std::set<int> s = {5, 1, 5, 3};
    s.insert(2);
    for (int x : s) std::cout << x << ' ';
    std::cout << "| has 3? " << s.contains(3) << '\n';
~~~

- الـ 5 اتكررت، فاتخزنت مرة واحدة.
- [[insert(2)]]: ضيف.
- اللف مترتب دايمًا: [[1 2 3 5]] (شجرة زي الـ map).
- [[contains(3)]] (C++20): true، وبتتطبع 1.

## ٣. [[std::deque<int>]]

~~~cpp
    std::deque<int> d = {2, 3};
    d.push_front(1);
    d.push_back(4);
    d.pop_front();
~~~

deque = double-ended queue. نتابعها:

| السطر | d |
|---|---|
| البداية | 2 3 |
| [[push_front(1)]] | 1 2 3 |
| [[push_back(4)]] | 1 2 3 4 |
| [[pop_front()]] | 2 3 4 |

[[front=2 back=4]]. الإضافة والشيل من الأول [[O(1)]]، وفي vector كانت هتزق كل العناصر.

## ٤. [[std::priority_queue<int>]]

~~~cpp
    std::priority_queue<int> pq;
    for (int x : {4, 9, 1}) pq.push(x);
    std::cout << "max=" << pq.top() << '\n';
    pq.pop();
    std::cout << "next=" << pq.top() << '\n';
~~~

- من جوه heap: [[top()]] دايمًا الأكبر = 9.
- [[pop()]] بيشيل الأكبر، والجديد فوق = 4.
- مفيش لف عليها ولا [[[ ]]]: [[top]] و [[push]] و [[pop]] بس.

---

## ٥. الـ solCode

~~~cpp
std::size_t count_distinct(const std::vector<int> &v) {
    std::unordered_set<int> seen(v.begin(), v.end());
    return seen.size();
}
~~~

- [[seen(v.begin(), v.end())]]: ابني الـ set من كل عناصر v. التكرار بيتشال لوحده.
- [[{1, 2, 2, 3, 3, 3}]] = 3 مختلفين.

~~~cpp
    std::priority_queue<int, std::vector<int>, std::greater<int>> pq;
~~~

الـ ٣ حاجات بين [[< >]]:

| الحتة | معناها |
|---|---|
| [[int]] | نوع العناصر |
| [[std::vector<int>]] | الـ container اللي جوه (الافتراضي، بس لازم يتكتب عشان نوصل للتالت) |
| [[std::greater<int>]] (من [[<functional>]]) | المقارنة: فوق يبقى الأصغر |

وبعدين [[top]] و [[pop]] ٣ مرات:

~~~text الناتج
3
1 2 4 
~~~

---

## الخلاصة

| المحتاجه | الـ container |
|---|---|
| قايمة عادية | [[vector]] |
| حجم ثابت معروف | [[array<T, N>]] |
| من غير تكرار ومترتب | [[set]] |
| من غير تكرار وأسرع | [[unordered_set]] |
| تضيف وتشيل من الأول | [[deque]] |
| دايمًا الأكبر (أو الأصغر بـ [[greater]]) | [[priority_queue]] |`,
          lines: [
            R`[[std::array]].`,
            R`[[std::deque]].`,
            "cout.",
            R`[[std::priority_queue]].`,
            R`[[std::set]].`,
            "main.",
            R`array حجمها 3 (جزء من النوع).`,
            "بتعرف حجمها.",
            "set: التكرار بيتشال، والترتيب أوتوماتيك.",
            "ضيف 2.",
            "1 2 3 5 مترتبين.",
            R`[[contains]] (C++20): 1.`,
            "deque.",
            "ضيف في الأول.",
            "وفي الآخر.",
            "شيل من الأول.",
            "front=2 back=4.",
            "heap: الأكبر فوق.",
            "ضيف 3 أرقام.",
            "max=9.",
            "شيل الأكبر.",
            "اللي بعده 4.",
            "قفلة."
          ],
          sol: R`الناتج:
[[rgb size=3 g=128]]
[[1 2 3 5 | has 3? 1]]
[[deque front=2 back=4]]
[[max=9]]
[[next=4]]

عدد المختلفين: [[std::unordered_set<int> seen(v.begin(), v.end()); return seen.size();]].
أصغر ٣ من [[{7, 2, 9, 4, 1, 8}]]: [[1 2 4]].`,
          solCode: R`#include <functional>
#include <iostream>
#include <queue>
#include <unordered_set>
#include <vector>

std::size_t count_distinct(const std::vector<int> &v) {
    std::unordered_set<int> seen(v.begin(), v.end());
    return seen.size();
}

int main() {
    std::cout << count_distinct({1, 2, 2, 3, 3, 3}) << '\n';
    std::priority_queue<int, std::vector<int>, std::greater<int>> pq;
    for (int x : {7, 2, 9, 4, 1, 8}) pq.push(x);
    for (int i = 0; i < 3; ++i) {
        std::cout << pq.top() << ' ';
        pq.pop();
    }
    std::cout << '\n';
}`
        },
        {
          cmd: "auto و structured bindings",
          title: "auto و range-for و structured bindings (auto [a, b]) و std::pair و std::tuple",
          desc: R`[[auto]]: الـ compiler يستنتج النوع من القيمة. [[auto x = 5;]] = int، و [[auto it = m.find(k);]] بدل [[std::map<std::string, int>::iterator it]]. النوع لسه ثابت وقت الـ compile، دي مش variable زي JS.

بس [[auto]] بتنسخ: [[auto s = name;]] نسخة. لو مش عايز نسخة: [[const auto &s = name;]]. ونفس الكلام في الـ range-for:
• [[for (auto x : v)]]: نسخة من كل عنصر (تمام للأرقام).
• [[for (const auto &x : v)]]: من غير نسخ ومن غير تعديل (للـ strings والـ objects).
• [[for (auto &x : v)]]: من غير نسخ وتقدر تعدّل العناصر.

[[std::pair<A, B>]]: قيمتين مع بعض، [[.first]] و [[.second]]. و [[std::tuple<A, B, C>]]: أي عدد، وتوصل بـ [[std::get<0>(t)]].

structured bindings (C++17): تفك pair أو tuple أو struct لمتغيرات بأسماء في سطر واحد:
• [[auto [lo, hi] = min_max(9, 4);]]
• [[for (const auto &[name, score] : scores)]]: كل عنصر في الـ map بقى [[name]] و [[score]] بدل [[p.first]] و [[p.second]].

ودي طريقة نضيفة ترجّع بيها أكتر من قيمة من دالة: رجّع pair أو tuple أو struct، وفكّه عند النداء.`,
          example: R`#include <iostream>
#include <map>
#include <string>
#include <tuple>
#include <utility>

std::pair<int, int> min_max(int a, int b) {
    if (a < b) return {a, b};
    return {b, a};
}

std::tuple<std::string, int, bool> load_user() {
    return {"Sara", 22, true};
}

int main() {
    auto [lo, hi] = min_max(9, 4);
    std::cout << lo << ' ' << hi << '\n';
    auto [name, age, active] = load_user();
    std::cout << name << ' ' << age << ' ' << active << '\n';
    std::map<std::string, int> score = {{"ali", 7}, {"mona", 9}};
    for (auto &[who, pts] : score) pts += 1;
    for (const auto &[who, pts] : score) std::cout << who << ':' << pts << ' ';
    std::cout << '\n';
    auto p = std::make_pair(1, 2.5);
    std::cout << p.first << ' ' << p.second << ' ' << std::get<0>(load_user()) << '\n';
}`,
          try: R`غيّر [[for (auto &[who, pts] : score)]] لـ [[for (auto [who, pts] : score)]] (من غير [[&]]): الأرقام لسه بتزيد؟ ليه؟ وبعدين اكتب struct [[Stats { int min; int max; double avg; };]] ودالة بترجّعه من vector، وفكّه بـ [[auto [mn, mx, avg] = stats(v);]].`,
          flag: "script",
          deep: {
            why: R`أنواع C++ ممكن تبقى طويلة جدًا (خصوصًا مع الـ iterators والـ templates)، و auto بتخلي الكود يتقري. والـ structured bindings بتخلي اللف على map ورجوع أكتر من قيمة واضحين، بدل [[.first]] و [[.second]] اللي محدش فاكر مين فيهم إيه.`,
            how: R`[[auto]] بتتبع نفس قواعد الـ templates: بتشيل الـ [[&]] والـ [[const]] من القيمة. فـ [[auto x = some_const_ref;]] بتعمل نسخة عادية. عشان كده لازم تكتب [[auto &]] أو [[const auto &]] بإيدك.

structured binding بيعمل object واحد مستخبي، والأسماء بتبقى أسماء لأجزائه. فـ [[auto &[who, pts]]] الـ object المستخبي reference للعنصر الأصلي، و pts بيشاور على الـ value جوه الـ map فعلًا. ومن غير [[&]] بيبقى نسخة.

عناصر الـ map نوعها [[std::pair<const std::string, int>]]: المفتاح const، فـ [[who]] مينفعش يتغير حتى مع [[&]].`,
            when: R`[[auto]] لما النوع واضح من السطر نفسه أو طويل ومش مهم (iterators و lambdas). اكتب النوع صريح لو بيوضّح المعنى ([[int count = 0;]]). و structured bindings في أي لف على map، وأي دالة بترجّع أكتر من قيمة.`,
            mistakes: R`[[for (auto x : v)]] على vector من strings كبيرة: نسخة كل لفة. و [[auto x = {1, 2};]] نوعها [[std::initializer_list<int>]] مش vector. وتستخدم tuple بـ ٥ قيم: الأحسن struct بأسماء. وتفتكر إن [[auto]] بتخلي المتغير يغيّر نوعه بعدين.`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالتين بيرجّعوا أكتر من قيمة (واحدة بـ [[std::pair]] والتانية بـ [[std::tuple]])، والنداء بيفك القيم لمتغيرات بأسماء على طول. وبعدين لف على map بيعدّل القيم ويطبعها. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
4 9
Sara 22 1
ali:8 mona:10 
1 2.5 Sara
~~~

---

## ١. [[std::pair]]: قيمتين

~~~cpp
std::pair<int, int> min_max(int a, int b) {
    if (a < b) return {a, b};
    return {b, a};
}
~~~

- [[std::pair<int, int>]] (من [[<utility>]]): قيمتين، [[.first]] و [[.second]].
- [[return {a, b};]]: الـ compiler عارف نوع الـ return، فالـ [[{ }]] بتعمل pair. الأصغر الأول دايمًا.

## ٢. [[std::tuple]]: أي عدد

~~~cpp
std::tuple<std::string, int, bool> load_user() {
    return {"Sara", 22, true};
}
~~~

[[<tuple>]]: ٣ قيم بأنواع مختلفة. توصل لواحدة بـ [[std::get<0>(t)]]، والرقم بين [[< >]] لازم يبقى ثابت وقت الـ compile.

---

## ٣. structured bindings: [[auto [a, b] = ...]]

~~~cpp
    auto [lo, hi] = min_max(9, 4);
    auto [name, age, active] = load_user();
~~~

- [[auto]]: الـ compiler يستنتج الأنواع.
- [[[lo, hi]]]: فك الـ pair: lo = first = 4، و hi = second = 9. العدد لازم يساوي عدد القيم.
- التلاتة: [[Sara 22 1]] (bool بيتطبع 1).

من غيرها كنت هتكتب [[auto r = min_max(9, 4); int lo = r.first; int hi = r.second;]].

## ٤. اللف على map بـ [[&]]

~~~cpp
    std::map<std::string, int> score = {{"ali", 7}, {"mona", 9}};
    for (auto &[who, pts] : score) pts += 1;
    for (const auto &[who, pts] : score) std::cout << who << ':' << pts << ' ';
~~~

- كل عنصر في الـ map زوج، فبنفكه لـ [[who]] (المفتاح) و [[pts]] (القيمة).
- [[auto &]]: who و pts أسماء للعنصر **الأصلي** جوه الـ map، فـ [[pts += 1]] بتعدّل الـ map: [[ali:8 mona:10]].
- [[const auto &]]: للقراية بس من غير نسخ.

### الـ try: من غير [[&]]

غيّرنا لـ [[for (auto [who, pts] : score)]]:

~~~text الناتج
4 9
Sara 22 1
ali:7 mona:9 
1 2.5 Sara
~~~

الأرقام مزادتش: من غير [[&]] الـ binding بقى على **نسخة** من الزوج، والتعديل راح في النسخة. ولا [[-Wall]] ولا [[-Wextra]] نبّهوا.

| الشكل | نسخة؟ | تعدّل الأصل؟ |
|---|---|---|
| [[auto [k, v]]] | آه | لأ |
| [[auto &[k, v]]] | لأ | آه |
| [[const auto &[k, v]]] | لأ | لأ |

## ٥. [[make_pair]] و [[std::get]]

~~~cpp
    auto p = std::make_pair(1, 2.5);
    std::cout << p.first << ' ' << p.second << ' ' << std::get<0>(load_user()) << '\n';
~~~

- [[std::make_pair(1, 2.5)]]: بيعمل [[std::pair<int, double>]]، الأنواع من القيم.
- [[std::get<0>(load_user())]]: أول عنصر في الـ tuple = Sara.

---

## ٦. الـ solCode: [[Stats]]

~~~cpp
Stats stats(const std::vector<int> &v) {
    auto [mn, mx] = std::minmax_element(v.begin(), v.end());
    double avg = std::accumulate(v.begin(), v.end(), 0.0) / v.size();
    return {*mn, *mx, avg};
}
~~~

- [[std::minmax_element]] (من [[<algorithm>]]): بترجّع pair من **iterators** لأصغر وأكبر عنصر، فبنفكها لـ mn و mx، وبعدين [[*mn]] و [[*mx]] = القيم.
- [[std::accumulate(..., 0.0)]] (من [[<numeric>]]): المجموع. الـ [[0.0]] مهمة: نوع البداية بيحدد نوع الجمع، فـ [[0]] كانت هتخليه int.
- [[return {*mn, *mx, avg};]]: الـ struct بالترتيب.
- [[auto [mn, mx, avg] = stats({4, 8, 1, 7});]]: structured bindings شغالة على struct كمان (الـ members بترتيبهم).

~~~text الناتج
1 8 5
~~~

(4 + 8 + 1 + 7) / 4 = 5.

---

## الخلاصة

- [[auto]] = النوع من القيمة، وبتنسخ. [[const auto &]] من غير نسخ، و [[auto &]] للتعديل.
- [[std::pair]] لقيمتين، و [[std::tuple]] لأكتر، و struct لو للقيم أسماء ليها معنى.
- [[auto [a, b, c] = x;]] بتفك pair أو tuple أو struct.`,
          lines: [
            "cout.",
            "map.",
            "string.",
            R`[[std::tuple]].`,
            R`[[std::pair]].`,
            "دالة بترجّع قيمتين في pair.",
            R`[[{a, b}]] بيعمل pair.`,
            "الترتيب العكسي.",
            "قفلة.",
            "tuple بـ ٣ أنواع مختلفة.",
            "بيعمل tuple من القيم.",
            "قفلة.",
            "main.",
            R`structured binding: فك الـ pair لاسمين.`,
            "4 9.",
            "فك tuple لـ ٣ أسماء.",
            R`Sara 22 1 (bool بيتطبع 1).`,
            "map.",
            R`[[auto &]]: pts reference للقيمة جوه الـ map، فالتعديل حقيقي.`,
            R`[[const auto &]]: قراية بس من غير نسخ.`,
            "سطر جديد.",
            R`[[make_pair]]: النوع اتستنتج pair<int, double>.`,
            R`[[std::get<0>]]: أول عنصر في الـ tuple.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[4 9]]
[[Sara 22 1]]
[[ali:8 mona:10 ]]
[[1 2.5 Sara]]

من غير [[&]] الأرقام مش بتزيد (هتطبع [[ali:7 mona:9]])، لأن pts بقى نسخة من القيمة، والتعديل حصل في النسخة. و gcc 14 بـ [[-Wall -Wextra]] مبيقولش ولا كلمة، فالغلطة دي لازم تاخد بالك منها بنفسك.`,
          solCode: R`#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

struct Stats {
    int min;
    int max;
    double avg;
};

Stats stats(const std::vector<int> &v) {
    auto [mn, mx] = std::minmax_element(v.begin(), v.end());
    double avg = std::accumulate(v.begin(), v.end(), 0.0) / v.size();
    return {*mn, *mx, avg};
}

int main() {
    auto [mn, mx, avg] = stats({4, 8, 1, 7});
    std::cout << mn << ' ' << mx << ' ' << avg << '\n';
}`
        },
        {
          cmd: "iterators",
          title: "الـ iterators: begin و end و ++it و *it، وإزاي تمسح من container وانت بتلف عليه",
          desc: R`الـ iterator «إصبع» بيشاور على عنصر في container، وبيتصرف زي pointer:
• [[*it]]: العنصر نفسه. و [[it->member]] لو العنصر struct أو pair.
• [[++it]]: العنصر اللي بعده.
• [[v.begin()]]: أول عنصر. و [[v.end()]]: «واحد بعد الآخر»، مش عنصر حقيقي، فمتعملش عليه [[*]]. بيستخدم كعلامة نهاية بس.
• [[v.rbegin()]] و [[v.rend()]]: نفس الفكرة بالعكس.

ده نفس اللف بالـ pointers اللي في درس pointer arithmetic في C بالظبط: [[for (int *it = arr; it != arr + 4; it++)]]. الـ iterators عمّموا الفكرة على كل الـ containers، حتى اللي عناصرها مش جنب بعض زي map و list. والـ range-for ([[for (int x : v)]]) بيتحول لـ loop بالـ iterators من جوه.

مش كل الـ iterators زي بعض:
• vector و array و deque: random access. تقدر تعمل [[it + 2]] و [[it - v.begin()]] (المسافة).
• list و map و set: bidirectional، [[++]] و [[--]] بس.

المسح وانت بتلف: [[v.erase(it)]] بتبوّظ الـ iterator ده (وأي iterator بعده في الـ vector). عشان كده erase بترجّع iterator للعنصر اللي بعد اللي اتمسح، وتكمّل منه. ومتزودش [[++it]] في اللفة دي.

وفي C++20 فيه [[std::erase_if(v, condition)]] بتعمل الحكاية دي كلها في سطر.`,
          example: R`#include <iostream>
#include <list>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 30, 40};
    for (auto it = v.begin(); it != v.end(); ++it) std::cout << *it << ' ';
    std::cout << '\n';
    auto it = v.begin() + 2;
    std::cout << "*it=" << *it << " index=" << (it - v.begin()) << '\n';
    for (auto r = v.rbegin(); r != v.rend(); ++r) std::cout << *r << ' ';
    std::cout << '\n';
    for (auto e = v.begin(); e != v.end();) {
        if (*e % 20 == 0) e = v.erase(e);
        else ++e;
    }
    for (int x : v) std::cout << x << ' ';
    std::cout << '\n';
    std::list<int> l = {1, 2, 3};
    auto li = l.begin();
    ++li;
    l.insert(li, 99);
    for (int x : l) std::cout << x << ' ';
    std::cout << '\n';
}`,
          try: R`اكتب نفس loop المسح بس بـ range-for ([[for (int x : v) if (...) v.erase(...)]]) واعمل compile بـ [[-fsanitize=address]]: إيه اللي حصل؟ وبعدين اعمل نفس المسح بسطر واحد بـ [[std::erase_if(v, [](int x) { return x % 20 == 0; });]]. وجرّب [[auto li2 = l.begin() + 1;]] على الـ list.`,
          flag: "script",
          deep: {
            why: R`الـ iterators هما اللغة المشتركة بين الـ containers والـ algorithms: [[std::sort(v.begin(), v.end())]] مش عارفة إنها شغالة على vector، هي شايفة iterators بس. فلو فهمتهم، المكتبة كلها هتبقى مفهومة. وأخطاء الـ iterator invalidation من أشهر أسباب الـ crashes في C++.`,
            how: R`في vector، الـ iterator غالبًا pointer مغلّف، فمفيش تكلفة. في map، الـ iterator بيشاور على node في الشجرة، و [[++]] بيمشي للعنصر اللي بعده بالترتيب.

الـ invalidation: vector لما يكبر بينقل كل العناصر، فكل الـ iterators القديمة بتبوّظ. وerase بيزق اللي بعده خطوة. في list و map، المسح بيبوّظ الـ iterator بتاع العنصر الممسوح بس، والإضافة مش بتبوّظ حاجة.

[[++it]] مقابل [[it++]]: الاتنين بيمشوا خطوة. [[it++]] بيرجّع نسخة من القديم، فلو مش محتاجها [[++it]] أنظف، وده سبب إنك هتشوفها كتير في كود C++.`,
            when: R`الـ range-for لما بتلف على كل حاجة من غير تعديل الـ container. الـ iterators الصريحة لما تمسح أو تضيف وانت بتلف، أو تلف على جزء، أو تبعت مدى لـ algorithm. وفي C++20 الـ ranges ([[std::ranges::sort(v)]]) بتخبي begin و end.`,
            mistakes: R`[[*v.end()]]. و erase جوه range-for. وتحتفظ بـ iterator بعد push_back. وتقارن iterators من containers مختلفة. و [[it + 2]] على list أو map: مش هتتعمل compile، استخدم [[std::next(it, 2)]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيلف على vector بالـ iterators من الأول ومن الآخر، ويحسب مكان عنصر، ويمسح عناصر وهو بيلف بالطريقة الصح، ويضيف عنصر في نص [[std::list]]. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
10 20 30 40 
*it=30 index=2
40 30 20 10 
10 30 
1 99 2 3 
~~~

---

## ١. اللف العادي

~~~cpp
    for (auto it = v.begin(); it != v.end(); ++it) std::cout << *it << ' ';
~~~

| الحتة | معناها |
|---|---|
| [[auto it = v.begin()]] | iterator على أول عنصر. نوعه الحقيقي [[std::vector<int>::iterator]]، فـ [[auto]] بتريّحك |
| [[it != v.end()]] | [[end()]] = «بعد الآخر بواحد»، مش عنصر |
| [[++it]] | العنصر اللي بعده |
| [[*it]] | العنصر نفسه |

نفس شكل اللف بالـ pointers في C. والـ range-for [[for (int x : v)]] بيتحول للـ loop ده من جوه.

## ٢. الحساب على iterator

~~~cpp
    auto it = v.begin() + 2;
    std::cout << "*it=" << *it << " index=" << (it - v.begin()) << '\n';
~~~

- [[v.begin() + 2]]: نط عنصرين = 30.
- [[it - v.begin()]]: المسافة بين iteratorين = الـ index = 2.
- ده مسموح للـ vector لأن عناصره جنب بعض (random access).

## ٣. بالعكس

~~~cpp
    for (auto r = v.rbegin(); r != v.rend(); ++r) std::cout << *r << ' ';
~~~

[[rbegin()]] = آخر عنصر، و [[++r]] بيرجع لورا: [[40 30 20 10]]. الـ r = reverse.

## ٤. المسح وانت بتلف

~~~cpp
    for (auto e = v.begin(); e != v.end();) {
        if (*e % 20 == 0) e = v.erase(e);
        else ++e;
    }
~~~

- الـ for من غير [[++e]] في آخرها: إحنا اللي بنحرّك.
- [[*e % 20 == 0]]: [[%]] باقي القسمة، يعني 20 و 40.
- [[v.erase(e)]]: بتمسح وبتبوّظ e (العناصر اتزقت لورا)، وبترجّع iterator صالح للعنصر اللي **بعد** الممسوح. فبناخده في e ومنزودش.
- لو مسحناش: [[++e]].

الناتج [[10 30]].

## ٥. [[std::list]]

~~~cpp
    std::list<int> l = {1, 2, 3};
    auto li = l.begin();
    ++li;
    l.insert(li, 99);
~~~

- [[std::list]]: linked list، كل عنصر في مكان لوحده في الذاكرة.
- [[++li]]: على العنصر 2.
- [[l.insert(li, 99)]]: حط 99 **قبل** li: [[1 99 2 3]].

الـ list iterator بيعرف [[++]] و [[--]] بس. جربنا [[l.begin() + 1]]:

~~~text الناتج
c.cpp:2:65: error: no match for 'operator+' (operand types are 'std::__cxx11::list<int>::iterator' and 'int')
~~~

الحل [[std::next(l.begin(), 1)]] (بتعمل [[++]] مرة).

---

## ٦. الـ try: المسح جوه range-for

~~~cpp
    for (int x : v) if (x % 20 == 0) v.erase(std::find(v.begin(), v.end(), x));
~~~

اتعمله compile بـ [[-fsanitize=address]] وطبع:

~~~text الناتج
10 
~~~

بدل [[10 30]]، ومن غير أي error ولا ASan report. الـ range-for ماسك iterator و [[end]] اتحسبت مرة واحدة في الأول. بعد أول erase العناصر اتزقت، فالـ loop فوّت 30 وقرا بعد الآخر الجديد (الذاكرة لسه محجوزة للـ vector فـ ASan مشافش حاجة). undefined behavior صامت.

والسطر الصح من C++20:

~~~cpp
    auto n = std::erase_if(w, [](int x) { return x % 20 == 0; });
~~~

~~~text الناتج
10 30 erased=2
~~~

[[std::erase_if]] بتمسح كل عنصر الشرط بتاعه true، وبترجّع عدد الممسوحين. و [[[](int x) { ... }]] lambda (دالة صغيرة من غير اسم، الدرس الجاي).

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[begin()]] / [[end()]] | أول عنصر / بعد الآخر |
| [[rbegin()]] / [[rend()]] | نفس الكلام بالعكس |
| [[*it]] و [[it->m]] و [[++it]] | العنصر، member منه، اللي بعده |
| [[it + n]] و [[it - begin()]] | vector و array و deque بس |
| [[it = v.erase(it)]] | امسح وكمّل من غير [[++]] |
| [[std::erase_if(v, f)]] | المسح كله في سطر (C++20) |`,
          lines: [
            "cout.",
            R`[[std::list]]: linked list.`,
            "vector.",
            "main.",
            "4 عناصر.",
            R`لف بالـ iterator: من begin لحد end، و [[*it]] العنصر.`,
            "سطر جديد.",
            "iterator للعنصر التالت.",
            "30، والمسافة من البداية 2.",
            "لف بالعكس.",
            "سطر جديد.",
            R`loop من غير [[++e]] في الهيدر، عشان المسح بيتحكم فيها.`,
            R`[[erase]] بترجّع iterator للعنصر اللي بعد الممسوح.`,
            "لو مفيش مسح امشي خطوة.",
            "قفلة.",
            "اللي فاضل: 10 30.",
            "سطر جديد.",
            "linked list.",
            "iterator لأول عنصر.",
            R`[[++]] بس: list مفيهاش [[+ 1]].`,
            "insert قبل العنصر اللي li بيشاور عليه.",
            "1 99 2 3.",
            "سطر جديد.",
            "قفلة."
          ],
          sol: R`الناتج:
[[10 20 30 40 ]]
[[*it=30 index=2]]
[[40 30 20 10 ]]
[[10 30 ]]
[[1 99 2 3 ]]

المسح جوه range-for ([[for (int x : v) if (x % 20 == 0) v.erase(std::find(v.begin(), v.end(), x));]]): undefined behavior. عندي طبع [[10]] بس بدل [[10 30]]، ومن غير أي error حتى مع ASan، لأن erase مش بتحرر ذاكرة الـ vector فمفيش حاجة «ممنوعة» اتلمست. السبب إن الـ range-for ماسك iterator ومستني end قديمة، وبعد الـ erase العناصر اتزقت فبيفوّت عناصر ويقرا بعد الآخر الجديد. الغلط الصامت ده أسوأ من crash.

[[l.begin() + 1]] على list:
[[error: no match for 'operator+']]
الحل [[std::next(l.begin(), 1)]].`
        },
        {
          cmd: "algorithms و lambdas",
          title: "std::sort و find و count_if و transform و accumulate مع الـ lambdas ([](int x) { ... })",
          desc: R`[[<algorithm>]] و [[<numeric>]] فيهم أكتر من ١٠٠ دالة جاهزة شغالة على أي مدى [[(begin, end)]]. بدل ما تكتب loop كل مرة، بتنادي اسم بيقول انت بتعمل إيه:
• [[std::sort(b, e)]]: ترتيب [[O(n log n)]].
• [[std::find(b, e, value)]]: بترجّع iterator لأول عنصر بيساوي value، أو e لو مش موجود.
• [[std::count_if(b, e, pred)]]: كام عنصر الشرط صح عليه.
• [[std::transform(b, e, out, f)]]: طبّق f على كل عنصر واكتب الناتج في out.
• [[std::accumulate(b, e, init)]] (من numeric): المجموع. ونوع init بيحدد نوع النتيجة: [[0]] int، و [[0LL]] long long، و [[0.0]] double.
• وفيه [[min_element]] و [[max_element]] و [[reverse]] و [[unique]] و [[binary_search]] و [[any_of]] و [[all_of]] وغيرهم.

الـ lambda دالة صغيرة من غير اسم بتكتبها مكان ما هتستخدمها:
[[[](int x) { return x > 4; }]]
• [[[ ]]]: الـ capture list: متغيرات من بره الـ lambda عايزها جوه. فاضية = مش محتاج حاجة.
• [[[factor]]]: خد نسخة من factor.
• [[[&calls]]]: خد calls بالـ reference، فالتعديل جوه بيأثر بره.
• [[[=]]] كله نسخ، و [[[&]]] كله reference.
• بعد كده parameters و جسم زي أي دالة.

مع [[std::sort]] تقدر تدي lambda بتقارن عنصرين وترجّع true لو الأول يتحط الأول: [[[](const Product &a, const Product &b) { return a.price > b.price; }]] = من الأغلى للأرخص.`,
          example: R`#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

struct Product {
    std::string name;
    double price;
};

int main() {
    std::vector<int> v = {5, 2, 9, 1, 7};
    std::sort(v.begin(), v.end());
    auto it = std::find(v.begin(), v.end(), 7);
    std::cout << "7 at index " << (it - v.begin()) << '\n';
    int sum = std::accumulate(v.begin(), v.end(), 0);
    auto big = std::count_if(v.begin(), v.end(), [](int x) { return x > 4; });
    std::cout << "sum=" << sum << " big=" << big << '\n';
    int factor = 10;
    std::vector<int> scaled(v.size());
    std::transform(v.begin(), v.end(), scaled.begin(), [factor](int x) { return x * factor; });
    std::cout << scaled.front() << ".." << scaled.back() << '\n';
    std::vector<Product> items = {{"pen", 5}, {"bag", 120}, {"book", 60}};
    std::sort(items.begin(), items.end(),
              [](const Product &a, const Product &b) { return a.price > b.price; });
    for (const auto &p : items) std::cout << p.name << ' ';
    std::cout << '\n';
    int calls = 0;
    auto counter = [&calls]() { ++calls; };
    counter();
    counter();
    std::cout << "calls=" << calls << '\n';
}`,
          try: R`على [[items]]: (1) رتّبهم بالاسم أبجديًا. (2) اعرف هل فيه منتج أغلى من 100 بـ [[std::any_of]]. (3) احسب مجموع الأسعار بـ accumulate (خلي بالك من نوع الـ init). وبعدين غيّر [[[&calls]]] لـ [[[calls]]]: إيه اللي حصل؟`,
          flag: "script",
          deep: {
            why: R`[[std::count_if(..., x > 4)]] بتقول «بعدّ اللي أكبر من 4» من أول نظرة، والـ loop بإيدك محتاج تقراه كله عشان تفهمه. والـ algorithms متختبرة كويس ومحسّنة: [[std::sort]] في gcc مثلًا introsort (quicksort بيتحول لـ heapsort لو الحالة وحشة)، فمضمون [[O(n log n)]].`,
            how: R`الـ lambda الـ compiler بيحوّلها لـ class صغير مستخبي جواه الـ captures كـ members، و [[operator()]] فيه جسمها. فـ [[[factor](int x) { ... }]] كأنها object جواه نسخة من factor. وعشان النوع معروف وقت الـ compile، الـ compiler يقدر يعملها inline جوه sort، فبتبقى أسرع غالبًا من [[qsort]] بتاعة C اللي بتاخد pointer لدالة.

الـ capture بالنسخة بتاخد القيمة وقت ما الـ lambda اتعملت، والنسخة جوه const افتراضيًا (عشان تعدّلها لازم [[mutable]]). الـ capture بالـ reference لازم المتغير الأصلي يفضل عايش طول ما الـ lambda ممكن تتنادى.

[[std::count_if]] بترجّع [[std::ptrdiff_t]] مش int، عشان كده [[auto big]].`,
            when: R`أي loop ليه اسم معروف (بحث، عدّ، ترتيب، تحويل، مجموع). اكتب loop بإيدك لو المنطق مش بيتطابق مع algorithm واضح. والـ lambdas في الـ algorithms، والـ callbacks، والـ threads (المستوى ٣). وفي C++20 فيه نسخ ranges: [[std::ranges::sort(v)]] من غير begin و end.`,
            mistakes: R`[[std::accumulate(v.begin(), v.end(), 0)]] على vector من double: الـ init int، فكل جمع بيتقرّب لـ int. استخدم [[0.0]]. و [[std::transform]] لـ vector فاضي من غير ما تحجز مكان (اعمله بالحجم، أو استخدم [[std::back_inserter]]). و lambda بتعمل capture بالـ reference لمتغير محلي وبتعيش بعده (dangling). ودالة مقارنة في sort بترجّع [[<=]] بدل [[<]]: undefined behavior وممكن يقع.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بدل ما يكتب loops، بينادي دوال جاهزة من [[<algorithm>]] و [[<numeric>]]: يرتّب، ويدوّر، ويجمع، ويعدّ، ويحوّل، ويرتّب منتجات بالسعر. وكل ما يحتاج شرط أو عملية بيكتبها lambda. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra]]:

~~~text الناتج
7 at index 3
sum=24 big=3
10..90
bag book pen 
calls=2
~~~

---

## ١. [[sort]] و [[find]]

~~~cpp
    std::vector<int> v = {5, 2, 9, 1, 7};
    std::sort(v.begin(), v.end());
    auto it = std::find(v.begin(), v.end(), 7);
    std::cout << "7 at index " << (it - v.begin()) << '\n';
~~~

- كل الـ algorithms بتاخد **مدى**: [[(begin, end)]]، فتقدر تشتغل على جزء بس.
- [[std::sort]]: v بقى [[1 2 5 7 9]]، [[O(n log n)]].
- [[std::find(..., 7)]]: iterator لأول 7، أو [[end()]] لو مش موجود. والمسافة من الأول = **3**.

## ٢. [[accumulate]] و [[count_if]] و أول lambda

~~~cpp
    int sum = std::accumulate(v.begin(), v.end(), 0);
    auto big = std::count_if(v.begin(), v.end(), [](int x) { return x > 4; });
~~~

- [[std::accumulate(b, e, 0)]]: 0 + 1 + 2 + 5 + 7 + 9 = **24**. نوع الـ [[0]] (int) هو نوع الجمع.
- [[std::count_if]]: كام عنصر الشرط بيرجع true عليه.
- الـ lambda [[[](int x) { return x > 4; }]] نفكها:

| الحتة | معناها |
|---|---|
| [[[]]] | الـ capture list: مش محتاجين متغيرات من بره |
| [[(int x)]] | الـ parameters زي أي دالة |
| [[{ return x > 4; }]] | الجسم |

5 و 7 و 9 = **3**. ونوع [[big]] هنا [[long]] (الـ [[auto]] جابته من count_if اللي بترجّع difference_type).

## ٣. [[transform]] و الـ capture

~~~cpp
    int factor = 10;
    std::vector<int> scaled(v.size());
    std::transform(v.begin(), v.end(), scaled.begin(), [factor](int x) { return x * factor; });
~~~

- [[scaled(v.size())]]: لازم يبقى فيه مكان قبل ما transform تكتب فيه (5 أصفار).
- [[std::transform(من، لحد، فين، f)]]: لكل عنصر اكتب [[f(x)]] في scaled.
- [[[factor]]]: factor متغير من بره، فلازم نمسكه (capture) عشان نستخدمه جوه. هنا نسخة.
- [[10 20 50 70 90]]، والسطر بيطبع [[front]] و [[back]]: [[10..90]].

## ٤. [[sort]] بمقارنة بتاعتك

~~~cpp
    std::sort(items.begin(), items.end(),
              [](const Product &a, const Product &b) { return a.price > b.price; });
~~~

الـ lambda بتاخد عنصرين وترجّع true لو [[a]] يتحط **قبل** [[b]]. [[>]] = الأغلى الأول: bag (120) ثم book (60) ثم pen (5).

## ٥. capture بالـ reference

~~~cpp
    int calls = 0;
    auto counter = [&calls]() { ++calls; };
    counter();
    counter();
~~~

- [[auto counter = ...]]: الـ lambda نفسها متخزنة في متغير، ونناديها زي دالة.
- [[[&calls]]]: الـ [[&]] = reference، فالـ [[++calls]] جوه بيغيّر calls اللي بره: **2**.

---

## ٦. الـ try

جربناهم في برنامج على نفس [[items]]:

~~~cpp
std::sort(..., [](const Product &a, const Product &b) { return a.name < b.name; });
std::any_of(..., [](const Product &p) { return p.price > 100; });
std::accumulate(..., 0.0, [](double s, const Product &p) { return s + p.price; });
~~~

~~~text الناتج
bag book pen 
true
185
~~~

- بالاسم: [[<]] بين strings = أبجدي.
- [[std::any_of]]: true لو عنصر واحد على الأقل حقق الشرط.
- [[accumulate]] بـ ٤ arguments: التالت قيمة البداية [[0.0]] (double، عشان الأسعار)، والرابع lambda بتاخد «المجموع لحد دلوقتي» و العنصر وترجّع المجموع الجديد. لو [[0]] كان الـ s هيبقى int وكسور الأسعار تضيع.

وغيّرنا [[[&calls]]] لـ [[[calls]]]:

~~~text الناتج
b.cpp:30:34: error: increment of read-only variable 'calls'
~~~

النسخة جوه الـ lambda const افتراضيًا. ومع [[mutable]] ([[[calls]() mutable { ++calls; return calls; }]]) جربنا نناديها مرتين: جواها بقت 2، و calls بره لسه **0**.

---

## الخلاصة

| الدالة | بتعمل |
|---|---|
| [[sort(b, e[, cmp])]] | ترتيب |
| [[find(b, e, x)]] | iterator لأول x أو e |
| [[count_if(b, e, pred)]] | كام عنصر بيحقق الشرط |
| [[any_of]] و [[all_of]] | فيه واحد / كلهم |
| [[transform(b, e, out, f)]] | f على كل عنصر |
| [[accumulate(b, e, init[, f])]] | مجموع، ونوع init مهم |

| الـ capture | معناه |
|---|---|
| [[[]]] | ولا حاجة |
| [[[x]]] / [[[=]]] | نسخة (const) |
| [[[&x]]] / [[[&]]] | reference: التعديل بيوصل بره |`,
          lines: [
            R`[[sort]] و [[find]] و [[count_if]] و [[transform]].`,
            "cout.",
            R`[[accumulate]].`,
            "string.",
            "vector.",
            "struct.",
            "الاسم.",
            "السعر.",
            "قفلة.",
            "main.",
            "أرقام مش مترتبة.",
            "رتّب: 1 2 5 7 9.",
            "دوّر على 7.",
            "المسافة من البداية: 3.",
            R`المجموع، و [[0]] = int.`,
            R`lambda من غير captures: كام واحد أكبر من 4؟ (3).`,
            "sum=24 big=3.",
            "متغير هنستخدمه جوه lambda.",
            "vector بنفس الحجم عشان transform تكتب فيه.",
            R`[[[factor]]]: خد نسخة من factor جوه الـ lambda.`,
            "10..90.",
            "vector من structs.",
            "رتّب بدالة مقارنة...",
            "...الأغلى الأول.",
            "bag book pen.",
            "سطر جديد.",
            "عدّاد.",
            R`[[[&calls]]]: بالـ reference، فالتعديل بيوصل لـ calls الأصلي.`,
            "نداء.",
            "نداء.",
            "calls=2.",
            "قفلة."
          ],
          sol: R`الناتج:
[[7 at index 3]]
[[sum=24 big=3]]
[[10..90]]
[[bag book pen ]]
[[calls=2]]

بالاسم: [[[](const Product &a, const Product &b) { return a.name < b.name; }]] = [[bag book pen]] (صدفة نفس الترتيب هنا).
[[std::any_of(items.begin(), items.end(), [](const Product &p) { return p.price > 100; })]] = true.
المجموع: [[std::accumulate(..., 0.0, [](double s, const Product &p) { return s + p.price; })]] = 185.

مع [[[calls]]] بالنسخة: [[error: increment of read-only variable 'calls']]، لأن النسخة جوه الـ lambda const. ولو حطيت [[mutable]] هتتعمل compile بس calls بره هتفضل 0.`
        }
      ]
    }
]);
