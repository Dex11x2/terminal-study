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
    },
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
(string مفيهوش ضرب في رقم)، ومعاه سطور كتير عن كل نسخ [[operator*]] اللي جرّبها. ولاحظ اسم النوع الحقيقي لـ std::string جوه الـ compiler.`,
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
• [[set(CMAKE_CXX_STANDARD 20)]]: C++20 (بيحط [[-std=c++20]] أو الـ flag المناسب للـ compiler).
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
