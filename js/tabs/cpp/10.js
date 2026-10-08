// تكملة تاب cpp: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cpp/01.js (شرح حقول الدرس في أوله)
MORE("cpp", [
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
          teach: R`## البرنامج بيعمل إيه؟

٤ threads شغالين في نفس الوقت، وكل واحد بيزوّد نفس العدّاد 100000 مرة. الـ mutex بيضمن إن الزيادات متضيعش، فالنتيجة 400000 بالظبط. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra -pthread]]:

~~~text الناتج
counter=400000
~~~

---

## ١. المتغيرات المشتركة

~~~cpp
    long long counter = 0;
    std::mutex m;
~~~

- [[counter]]: كل الـ threads هيكتبوا فيه.
- [[std::mutex]] (من [[<mutex>]]، mutual exclusion): قفل. thread واحد بس يمسكه في المرة، والباقيين بيستنوا.

## ٢. الشغل: lambda

~~~cpp
    auto work = [&] {
        for (int i = 0; i < 100000; ++i) {
            std::lock_guard<std::mutex> lock(m);
            ++counter;
        }
    };
~~~

- [[[&]]]: الـ lambda ماسكة counter و m بالـ reference، فكل الـ threads بيشوفوا نفس الاتنين.
- [[std::lock_guard<std::mutex> lock(m);]]: RAII للقفل. الـ constructor بيقفل m، والـ destructor (عند [[}]] بتاعة الـ for) بيفتحه. فكل لفة: اقفل، زوّد، افتح.

## ٣. تشغيل الـ threads

~~~cpp
    std::vector<std::thread> threads;
    for (int t = 0; t < 4; ++t) threads.emplace_back(work);
    for (auto &th : threads) th.join();
~~~

- [[std::thread]] (من [[<thread>]]): أول ما يتعمل بيبدأ ينفّذ الدالة اللي اتبعتتله، بالتوازي مع main.
- [[emplace_back(work)]]: بيبني الـ thread جوه الـ vector على طول (الـ thread مبيتنسخش، بيتنقل بس).
- [[th.join()]]: main تستنى الـ thread ده يخلص. [[auto &]] لأن الـ thread مبيتنسخش. لو thread اتمسح من غير join، البرنامج بيقع بـ [[std::terminate]].
- [[-pthread]]: بيربط مكتبة الـ threads على Linux. مع gcc 14 مش لازمة، بس مبتضرش.

---

## ٤. الـ try: من غير الـ lock

مسحنا سطر الـ lock_guard، وعملنا compile بـ [[-O0]] (عشان الـ compiler ميحوّلش الـ loop لـ [[counter += 100000]])، و ٥ تشغيلات:

~~~text الناتج
counter=268697
counter=203435
counter=241264
counter=185488
counter=400000
~~~

ليه؟ [[++counter]] في الحقيقة ٣ خطوات:

| thread 1 | thread 2 | counter |
|---|---|---|
| اقرا: 5 | | 5 |
| | اقرا: 5 | 5 |
| زوّد واكتب 6 | | 6 |
| | زوّد واكتب 6 | 6 (زيادة ضاعت) |

ده اسمه **data race**، وهو undefined behavior. ولاحظ المرة الخامسة طلعت 400000 بالصدفة: «اشتغلت مرة» مش دليل.

### ThreadSanitizer

[[-g -fsanitize=thread]] (TSan) بيمسك الـ race حتى لو النتيجة طلعت صح. أول مرة جوه Docker وقع بـ:

~~~text الناتج
FATAL: ThreadSanitizer: unexpected memory mapping 0x7338f3f72000-0x7338f4400000
~~~

ده من الـ kernel الحديث (عناوين عشوائية كتير)، والحل تقفل العشوائية للبرنامج ده بس: [[setarch $(uname -m) -R ./app]]. وجوه Docker [[setarch]] محتاج [[--security-opt seccomp=unconfined]] على الـ container. وبعدها:

~~~text الناتج
WARNING: ThreadSanitizer: data race (pid=15)
  Read of size 8 at 0x7fffffffe9b8 by thread T2:
    #0 operator() /tmp/a.cpp:11 (at+0x401278)
  Previous write of size 8 at 0x7fffffffe9b8 by thread T1:
    #0 operator() /tmp/a.cpp:11 (at+0x401287)
  Location is stack of main thread.
~~~

نقراه: thread T2 قرا 8 bytes (الـ long long) في سطر 11 ([[++counter]])، و T1 كتب نفس المكان من غير حماية. و [[stack of main thread]] = counter متغير محلي في main.

### الوقت: ٤ threads بقفل ولا thread واحد؟

قسنا بـ [[-O2]]، ٣ مرات:

~~~text الناتج
4 threads: 8592 us, 1 thread: 3009 us
4 threads: 8451 us, 1 thread: 3701 us
4 threads: 9165 us, 1 thread: 2988 us
~~~

الـ ٤ threads **أبطأ** حوالي ٣ مرات: الشغل كله جوه القفل، فهما عمليًا بيشتغلوا واحد ورا التاني، وفوقهم تكلفة إن القفل بيتنقل بين الـ cores.

## ٥. الـ solCode: كل thread يعدّ لوحده

~~~cpp
        threads.emplace_back([&] {
            long long local = 0;
            for (int i = 0; i < 100000; ++i) ++local;
            std::lock_guard<std::mutex> lock(m);
            counter += local;
        });
~~~

[[local]] بتاع كل thread لوحده (مفيش race)، والقفل مرة واحدة بس في الآخر بدل 100000 مرة:

~~~text الناتج
counter=400000
~~~

---

## الخلاصة

| المكتوب | معناه |
|---|---|
| [[std::thread t(f);]] | ابدأ f بالتوازي |
| [[t.join()]] | استنى، ولازمة قبل ما t يموت ([[std::jthread]] بيعملها لوحده) |
| [[std::mutex m;]] | قفل |
| [[std::lock_guard<std::mutex> lock(m);]] | اقفل لحد آخر الـ scope |
| [[-fsanitize=thread]] | بيمسك الـ data races |

- اقفل أقل حاجة ممكنة، والأحسن كل thread يشتغل على داتا بتاعته.`,
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
          teach: R`## البرنامج بيعمل إيه؟

جزئين: ٤ threads بيزوّدوا عدّاد [[std::atomic]] من غير mutex، وبعدين مجموع مليون رقم بيتقسم نصين: نص في thread تاني بـ [[std::async]]، والنص التاني في main، والنتيجة بترجع بـ [[std::future]]. اتشغّل في [[gcc:14]] بـ [[g++ -std=c++20 -Wall -Wextra -pthread]]:

~~~text الناتج
hits=200000
total=1000000
~~~

---

## ١. [[std::atomic<int>]]

~~~cpp
    std::atomic<int> hits{0};
    std::vector<std::thread> ts;
    for (int t = 0; t < 4; ++t)
        ts.emplace_back([&hits] { for (int i = 0; i < 50000; ++i) hits++; });
    for (auto &t : ts) t.join();
~~~

- [[std::atomic<int>]] (من [[<atomic>]]): int عملياته البسيطة بتحصل كخطوة واحدة مبتتقطعش. [[hits++]] هنا تعليمة واحدة على مستوى الـ CPU (على x86 [[lock xadd]])، فمفيش زيادة بتضيع.
- [[{0}]]: قيمة أولية. الـ atomic مبيتنسخش، فبيتعمل بالأقواس دي.
- [[[&hits]]]: الـ lambda ماسكة hits بس بالـ reference.
- ٤ × 50000 = **200000**.

### الـ try: [[int]] عادي

غيّرناه لـ [[int hits{0};]] وعملنا compile بـ [[-O0]]، و 10 تشغيلات:

~~~text الناتج
hits=200000 hits=200000 hits=200000 hits=105215 hits=186766 hits=200000 hits=200000 hits=200000 hits=200000 hits=200000
~~~

أغلب المرات صح، ومرتين ضاعت زيادات. الـ 50000 لفة بتخلص بسرعة، فساعات thread بيخلص قبل ما اللي بعده يبدأ ومفيش تداخل. ده بالظبط اللي بيخلي الـ data race خطير: بيعدّي في الـ testing ويقع في الإنتاج.

---

## ٢. [[sum_range]]

~~~cpp
long long sum_range(const std::vector<int> &v, std::size_t from, std::size_t to) {
    return std::accumulate(v.begin() + from, v.begin() + to, 0LL);
}
~~~

مجموع من index [[from]] لحد قبل [[to]].

## ٣. [[std::async]] و [[std::future]]

~~~cpp
    std::vector<int> v(1'000'000, 1);
    std::size_t half = v.size() / 2;
    auto left = std::async(std::launch::async, sum_range, std::cref(v), 0, half);
    long long right = sum_range(v, half, v.size());
    std::cout << "total=" << left.get() + right << '\n';
~~~

نفك سطر الـ async:

| الحتة | معناها |
|---|---|
| [[std::async]] (من [[<future>]]) | شغّل دالة وارجع على طول |
| [[std::launch::async]] | لازم في thread جديد (من غيرها ممكن يتأجل لحد [[get]]) |
| [[sum_range]] | الدالة |
| [[std::cref(v)]] (من [[<functional>]]) | ابعت v كـ const reference. async بتنسخ الـ arguments افتراضيًا، والنسخ هنا مليون عنصر |
| [[0, half]] | باقي الـ arguments |

- [[left]] نوعه [[std::future<long long>]]: «وعد» بنتيجة.
- main بتحسب النص التاني في نفس الوقت: [[right]] = 500000.
- [[left.get()]]: استنى النتيجة = 500000. المجموع **1000000**.

### exception من الـ thread التاني

جربنا دالة بترمي [[std::runtime_error("from must be 0")]] لو from أكبر من 0:

~~~cpp
    auto left = std::async(std::launch::async, f, 5);
    try { std::cout << left.get() << '\n'; } catch (const std::exception &e) { std::cout << "caught: " << e.what() << '\n'; }
~~~

~~~text الناتج
caught: from must be 0
~~~

الـ exception اترمى في الـ thread التاني، واتخزن جوه الـ future، واترمى تاني عند [[get()]].

---

## ٤. الـ solCode: على كل الـ cores

~~~cpp
    unsigned parts = std::thread::hardware_concurrency();
    if (parts == 0) parts = 4;
    std::size_t chunk = v.size() / parts;
~~~

- [[hardware_concurrency()]]: عدد الـ threads اللي الجهاز يقدر يشغّلها في نفس الوقت (logical processors). ممكن ترجع 0 لو مش معروف، فبنحط 4.

~~~cpp
    for (unsigned p = 0; p < parts; ++p) {
        auto from = v.begin() + p * chunk;
        auto to = (p + 1 == parts) ? v.end() : from + chunk;
        futures.push_back(std::async(std::launch::async, [from, to] {
            return std::accumulate(from, to, 0LL);
        }));
    }
~~~

- كل جزء من [[from]] لـ [[to]]. آخر جزء لحد [[v.end()]] عشان لو القسمة فيها باقي.
- [[[from, to]]]: الـ lambda ماسكة نسخة من الـ iterators (صغيرين).
- vector من futures، وبعدين [[f.get()]] لكل واحد ونجمع.

~~~text الناتج (Ryzen 9 5900HX: 16 logical processors)
16 parts, total=10000000
~~~

---

## الخلاصة

| الأداة | امتى |
|---|---|
| [[std::atomic<T>]] | عدّاد أو flag واحد بين threads |
| [[std::mutex]] | أكتر من متغير لازم يتغيروا مع بعض |
| [[std::async(std::launch::async, f, args)]] | احسب في الخلفية |
| [[future.get()]] | استنى النتيجة (أو الـ exception) |
| [[std::cref(x)]] | ابعت reference بدل نسخة |`,
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
