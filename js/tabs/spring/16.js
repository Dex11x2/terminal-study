// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
    {
      t: "أسئلة انترفيو Java و Spring",
      l: 3,
      n: "الأسئلة اللي بتتكرر: الـ JVM والـ GC، و equals و hashCode، و HashMap، والـ bean scopes، و @Transactional، و lazy loading",
      items: [
        {
          cmd: "JVM والـ GC",
          title: "الذاكرة في Java متقسمة إزاي، والـ Garbage Collector بيشتغل إزاي؟",
          desc: R`الإجابة المختصرة: كل thread ليه stack فيه المتغيرات المحلية والـ primitives والـ references. والـ objects كلها في الـ heap المشترك. والـ class metadata في الـ metaspace (برّه الـ heap). الـ GC بيدوّر على الـ objects اللي مفيش حد بيشاور عليها (من الـ GC roots: الـ stacks والـ static fields) ويمسحها.

الـ heap متقسم لأجيال: young (الـ objects الجديدة، ومعظمها بيموت بسرعة) و old (اللي عاشوا كذا GC). الـ GC الافتراضي G1: بيقسم الـ heap لـ regions وبيحاول يخلي الـ pauses قصيرة. و ZGC للـ pauses تحت الـ ms مع heaps كبيرة.`,
          example: R`void main() {
    Runtime rt = Runtime.getRuntime();
    IO.println("max heap MB: " + rt.maxMemory() / 1024 / 1024);
    IO.println("cpus: " + rt.availableProcessors());
    List<byte[]> keep = new ArrayList<>();
    for (int i = 0; i < 50; i++) {
        byte[] garbage = new byte[1024 * 1024];
        if (i % 10 == 0) keep.add(garbage);
    }
    IO.println("kept: " + keep.size());
    for (var gc : java.lang.management.ManagementFactory.getGarbageCollectorMXBeans())
        IO.println(gc.getName() + " runs=" + gc.getCollectionCount());
}
// java -Xmx64m -Xlog:gc Gc.java`,
          try: R`شغّل بـ [[java -Xmx64m -Xlog:gc Gc.java]] واقرا سطور الـ GC. وبعدين غيّر [[if (i % 10 == 0)]] لـ [[if (true)]] (يعني احتفظ بكله): إيه اللي حصل، وإيه اسمه؟ وجاوب بصوتك: «Java فيها memory leaks مع إن فيها GC؟»`,
          flag: "script",
          deep: {
            why: R`بيتسأل في أي انترفيو Java تقريبًا، ومهم في الشغل: OutOfMemoryError، و pauses بتبطّأ الـ API، و container بيتقتل. الانترفيوير عايز يعرف إنك فاهم الـ stack والـ heap والـ reachability، مش حافظ أسماء collectors.`,
            how: R`نقط لو اتسألت أكتر: الـ young GC (minor) سريع لأنه بينسخ الأحياء القليلين بس ([[Pause Young]] في اللوج). الـ objects اللي عاشت كذا مرة بتترقى للـ old. الـ full GC أو الـ concurrent cycle للـ old أغلى.

الـ reachability: الـ GC مش بيعد references (زي Python)، بيعمل tracing من الـ roots، فالـ cycles (A بيشاور على B و B على A) بتتمسح عادي لو محدش من برّه بيشاور عليهم.

الـ memory leak في Java: objects لسه reachable ومحدش محتاجها: static map بتكبر للأبد (cache من غير حد)، أو listeners متسجلة ومتشالتش، أو ThreadLocal في thread pool. الـ GC مش هيمسحهم لأنهم «مستخدمين» من وجهة نظره.

الـ objects الكبيرة (أكبر من نص region في G1) اسمها humongous وبتتحط مباشرة في مناطق خاصة، وده اللي ظهر في اللوج ([[G1 Humongous Allocation]]).

أدوات: [[-Xlog:gc]]، و [[jcmd <pid> GC.heap_info]]، و heap dump بـ [[-XX:+HeapDumpOnOutOfMemoryError]] وتحلله بـ Eclipse MAT، و JFR ([[jcmd <pid> JFR.start]]).`,
            when: R`«اشرح الـ heap والـ stack»، و «الـ GC بيشتغل إزاي؟»، و «إيه اللي بيعمل OutOfMemoryError؟»، و «إزاي تحقق في memory leak في الإنتاج؟»، و «G1 ولا ZGC؟».`,
            mistakes: R`«الـ primitives على الـ stack والـ objects على الـ heap» بشكل مطلق: الـ primitive حقل في object بيبقى في الـ heap مع الـ object. و «System.gc() بيشغّل الـ GC»: ده طلب ممكن يتجاهل. و «Java مفيهاش memory leaks». و «أزوّد -Xmx» كحل لأي OOM من غير ما تعرف السبب.`
          },
          teach: R`## البرنامج بيعمل إيه؟

برنامج صغير يخليك **تشوف** الـ GC بعينك: بيطبع حجم الـ heap، وبيعمل ٥٠ array كل واحدة ١ ميجا، بيحتفظ بـ ٥ منهم بس والباقي بيبقى زبالة (garbage)، وفي الآخر بيسأل الـ JVM: الـ collectors اشتغلوا كام مرة؟ ومع [[-Xlog:gc]] الـ JVM بيطبع سطر لكل GC.

اتشغّل في [[maven:3.9-eclipse-temurin-25]] (Java 25.0.4.1) بـ [[java Gc.java]] (ملف واحد من غير [[javac]]).

---

## ١. معلومات الـ JVM

~~~text السطور
    Runtime rt = Runtime.getRuntime();
    IO.println("max heap MB: " + rt.maxMemory() / 1024 / 1024);
    IO.println("cpus: " + rt.availableProcessors());
~~~

- [[Runtime.getRuntime()]]: object واحد بيمثّل الـ JVM اللي شغال.
- [[rt.maxMemory()]]: أقصى حجم ممكن الـ heap يوصله، بالـ byte. القسمة على ١٠٢٤ مرتين بتحوّله ميجا.
- [[rt.availableProcessors()]]: عدد الـ cores اللي الـ JVM شايفها. جوه container بيحترم حدود الـ container ([[--cpus]]).

~~~text الناتج (java Gc.java من غير أي flags)
max heap MB: 3926
cpus: 16
~~~

٣٩٢٦ ميجا جت منين؟ مفيش [[-Xmx]]، فالـ JVM بياخد **٢٥٪ من الذاكرة** اللي شايفها. الـ VM بتاع Docker هنا فيه حوالي ١٦ جيجا، وربعهم حوالي ٣.٩ جيجا.

---

## ٢. اللوب: زبالة وحاجات بنحتفظ بيها

~~~text السطور
    List<byte[]> keep = new ArrayList<>();
    for (int i = 0; i < 50; i++) {
        byte[] garbage = new byte[1024 * 1024];
        if (i % 10 == 0) keep.add(garbage);
    }
    IO.println("kept: " + keep.size());
~~~

- [[byte[]]]: array من bytes. [[new byte[1024 * 1024]]] = ١ ميجا (١٠٢٤ × ١٠٢٤ byte) في الـ heap.
- [[garbage]] متغير محلي: الـ reference نفسه على الـ **stack** بتاع الـ thread، والـ array على الـ **heap**. في اللفة الجاية المتغير بيشاور على array جديدة، فالقديمة محدش بيشاور عليها: بقت **unreachable**، والـ GC يقدر يمسحها.
- [[i % 10 == 0]]: [[%]] باقي القسمة. الشرط صح لما [[i]] = 0 و 10 و 20 و 30 و 40: ٥ مرات.
- [[keep.add(garbage)]]: الـ list بقت بتشاور على الـ array، فهي **reachable** من [[keep]] (و [[keep]] نفسها على الـ stack، يعني GC root)، فالـ GC مش هيلمسها.

~~~text الناتج
kept: 5
~~~

---

## ٣. الـ collectors

~~~text السطور
    for (var gc : java.lang.management.ManagementFactory.getGarbageCollectorMXBeans())
        IO.println(gc.getName() + " runs=" + gc.getCollectionCount());
~~~

- [[ManagementFactory.getGarbageCollectorMXBeans()]]: list بالـ collectors الشغالة في الـ JVM (MXBean = object بيعرض معلومات عن الـ JVM). كتبنا الاسم كامل بالـ package بدل import.
- [[getCollectionCount()]]: اشتغل كام مرة.

~~~text الناتج (من غير -Xmx)
G1 Young Generation runs=0
G1 Concurrent GC runs=0
G1 Old Generation runs=0
~~~

صفر! ٥٠ ميجا بس، والـ heap ممكن يوصل ٣.٩ جيجا، فالـ JVM ملقاش سبب يجمع زبالة. الـ GC بيشتغل لما المساحة تقرّب تخلص، مش كل ما object يموت.

---

## ٤. [[java -Xmx64m -Xlog:gc Gc.java]]

- [[-Xmx64m]]: أقصى heap ٦٤ ميجا. دلوقتي الـ ٥٠ ميجا هتزحم.
- [[-Xlog:gc]]: اطبع سطر لكل GC.

~~~text الناتج
[0.004s][info][gc] Using G1
[0.451s][info][gc] GC(0) Pause Young (Normal) (G1 Evacuation Pause) 35M->7M(64M) 9.846ms
max heap MB: 64
cpus: 16
[0.590s][info][gc] GC(1) Pause Young (Concurrent Start) (G1 Humongous Allocation) 41M->13M(64M) 6.474ms
[0.590s][info][gc] GC(2) Concurrent Undo Cycle
...
[0.602s][info][gc] GC(11) Pause Young (Concurrent Start) (G1 Humongous Allocation) 29M->19M(64M) 1.577ms
kept: 5
G1 Young Generation runs=7
G1 Concurrent GC runs=0
G1 Old Generation runs=0
~~~

نقرا سطر واحد حتة حتة:

| الحتة | معناها |
|---|---|
| [[[0.590s]]] | بعد قد إيه من بداية الـ JVM |
| [[GC(1)]] | رقم الـ GC |
| [[Pause Young]] | جمع للـ young generation، والبرنامج **واقف** (pause) وهو شغال |
| [[(G1 Humongous Allocation)]] | السبب: object «ضخم» (أكبر من نص region في G1) اتطلب، و ١ ميجا ضخم في heap صغير كده |
| [[41M->13M(64M)]] | الـ heap كان ٤١ ميجا، بقى ١٣، من أقصى ٦٤ |
| [[6.474ms]] | مدة الوقفة |

- [[GC(0)]] حصل **قبل** ما برنامجنا يطبع حاجة: ده [[java Gc.java]] نفسه وهو بيعمل compile للملف في الذاكرة.
- الرقم بعد السهم بيطلع شوية شوية (١٣ ثم ١٥ ثم ١٧ ثم ١٩): دي الـ arrays اللي في [[keep]] بتتراكم، والباقي بيتمسح.
- [[Concurrent Undo Cycle]]: G1 كان ناوي يبدأ جمع للـ old بالتوازي، ولما لقى الـ young GC فضّى كفاية، لغاه.
- [[runs=7]]: الـ ٧ مرات [[Pause Young]] اللي في اللوج.

---

## ٥. التجربة: [[if (true)]]

بنحتفظ بكل الـ ٥٠ ميجا، والحد ٦٤:

~~~text الناتج (آخره)
[0.751s][info][gc] GC(17) Pause Young (Normal) (G1 Humongous Allocation) 63M->63M(64M) 0.457ms
[0.757s][info][gc] GC(18) Pause Full (G1 Compaction Pause) 63M->63M(64M) 5.443ms
[0.763s][info][gc] GC(19) Pause Full (G1 Compaction Pause) 63M->63M(64M) 5.691ms
[0.764s][info][gc] GC(20) Pause Young (Normal) (G1 Evacuation Pause) 63M->63M(64M) 0.557ms
[0.769s][info][gc] GC(21) Pause Full (G1 Compaction Pause) 63M->3M(14M) 5.231ms
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
	at GcAll.main(GcAll.java:7)
~~~

- [[63M->63M]]: الـ GC اشتغل ومعرفش يمسح حاجة: كله reachable من [[keep]].
- [[Pause Full]]: جمع كامل للـ heap كله، آخر محاولة قبل ما الـ JVM يستسلم. مرتين ورا بعض ومفيش مكان لـ array جديدة، فـ [[OutOfMemoryError: Java heap space]] في السطر ٧ ([[new byte[...]]]).
- آخر سطر ([[63M->3M]]) غالبًا جه بعد ما الـ exception خرجت من [[main]]: ساعتها [[keep]] مبقاش حد بيشاور عليها فاتمسحت. والـ stack trace بيتطبع في الآخر خالص.
- ده نفس شكل الـ memory leak: objects reachable بتتراكم لحد ما الذاكرة تخلص، بس هنا عن قصد.

---

## الخلاصة

| المكان | فيه إيه |
|---|---|
| stack (لكل thread) | المتغيرات المحلية والـ references |
| heap (مشترك) | كل الـ objects والـ arrays |
| metaspace (برّه الـ heap) | معلومات الـ classes |

- الـ GC بيمسح اللي **مش reachable** من الـ roots (الـ stacks والـ static fields)، ومش بيشتغل غير لما المساحة تحتاج.
- young GC سريع لأن أغلب الـ objects بتموت صغيرة، وده اللي شفناه: ٣٥ ميجا نزلت ٧ في أقل من ١٠ms.
- الـ leak في Java = reachable ومحدش محتاجه، والـ GC مش هيلمسه.
- [[-Xmx]] للحد، و [[-Xlog:gc]] للمراقبة، والافتراضي ٢٥٪ من الذاكرة.`,
          lines: [
            "main.",
            "معلومات الـ JVM.",
            R`أقصى heap (من [[-Xmx]] أو ٢٥٪ من الذاكرة افتراضيًا).`,
            "الـ cores اللي الـ JVM شايفها (في container: حدود الـ container).",
            "list بنحتفظ فيها ببعض الـ objects.",
            "٥٠ مرة.",
            R`١ ميجا جديدة كل لفة. لو محدش مسكها، بتبقى garbage بعد اللفة.`,
            R`كل عاشر واحدة بنحتفظ بيها: reachable من [[keep]]، فالـ GC مش هيمسحها.`,
            "قفلة.",
            R`[[kept: 5]].`,
            "الـ collectors الشغالة.",
            "اسمها وعدد مرات تشغيلها.",
            "قفلة."
          ],
          sol: R`مع [[-Xmx64m -Xlog:gc]] عندنا: [[Using G1]]، و [[max heap MB: 64]]، وسطور زي [[GC(0) Pause Young (Normal) (G1 Evacuation Pause) 29M->6M(64M) 10.428ms]]: الـ heap كان ٢٩ ميجا ونزل لـ ٦ في ١٠ms، لأن معظم الـ arrays كانت garbage. و [[kept: 5]].

ولما تخلي [[if (true)]]: الـ ٥٠ ميجا كلهم reachable، ومع حد ٦٤ ميجا والـ overhead، البرنامج بيقع بـ [[java.lang.OutOfMemoryError: Java heap space]]. ده مش leak بالمعنى الحرفي، بس نفس الآلية: objects reachable بتتراكم.

الإجابة على السؤال: أيوة. الـ GC بيمسح اللي مش reachable بس، والـ leak في Java هو object لسه reachable ومحدش محتاجه، زي cache في static map من غير حد أو eviction.`
        },
        {
          cmd: "equals و hashCode",
          title: "ليه لو عملت override لـ equals لازم تعمل hashCode؟",
          desc: R`العقد: لو [[a.equals(b)]] يبقى لازم [[a.hashCode() == b.hashCode()]]. الـ HashSet والـ HashMap بيدوّروا بالـ hashCode الأول (يروحوا للـ bucket)، وبعدين بـ equals جوه الـ bucket. لو عملت equals بس، اتنين objects «متساويين» ليهم hashCode مختلف (الافتراضي من الـ identity)، فبيروحوا buckets مختلفة، و [[contains]] بترجع false.

العكس مش لازم: اتنين hashCode بتاعهم واحد ممكن ميبقوش equal (collision)، وده عادي. والـ records بتعمل الاتنين صح لوحدها.`,
          example: R`class Point {
    final int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        return o instanceof Point p && p.x == x && p.y == y;
    }
}

class FixedPoint extends Point {
    FixedPoint(int x, int y) { super(x, y); }
    @Override
    public int hashCode() { return Objects.hash(x, y); }
}

void main() {
    IO.println(new Point(1, 2).equals(new Point(1, 2)));
    Set<Point> broken = new HashSet<>(List.of(new Point(1, 2)));
    IO.println(broken.contains(new Point(1, 2)));
    Set<Point> fixed = new HashSet<>(List.of(new FixedPoint(1, 2)));
    IO.println(fixed.contains(new FixedPoint(1, 2)));
}`,
          try: R`اكتب equals و hashCode لـ JPA entity [[Task]] بالشكل الآمن: على الـ id بس، و hashCode ثابت. وجاوب: ليه hashCode على الـ id مباشرة ([[Objects.hash(id)]]) مشكلة لو حطيت entity جديد (id null) في HashSet وبعدين عملتله save؟`,
          flag: "script",
          deep: {
            why: R`سؤال كلاسيكي، وبيطلع في bugs حقيقية: entities في Set، ومفاتيح Map مركّبة، ومقارنات في التستات. وفي JPA بالذات الإجابة الصح مش بديهية.`,
            how: R`[[Object.equals]] الافتراضي هو [[==]] (نفس الـ object)، و [[hashCode]] الافتراضي مبني على الـ identity. شروط equals: reflexive و symmetric و transitive و consistent، و [[x.equals(null)]] false.

الخطوات في HashSet.contains: احسب hashCode ← روح الـ bucket ← قارن بـ equals مع اللي فيه. hashCode غلط = bucket غلط = مش لاقي حتى لو equals صح.

في JPA: الـ id بيتولّد عند الـ persist، فـ hashCode مبني على الـ id بيتغير بعد الـ save، والـ object يبقى في bucket غلط جوه الـ Set. الحل الشائع: equals على الـ id (ولو null يبقى مش متساوي غير مع نفسه)، و hashCode ثابت ([[getClass().hashCode()]]). كمان خلي بالك إن Hibernate proxies بتبقى subclass، فـ [[getClass() != o.getClass()]] ممكن يطلع false غلط.

ومفاتيح HashMap لازم تبقى immutable: لو غيّرت حقل داخل في الـ hashCode بعد ما حطيته، ضاع (هتشوفه في الدرس الجاي).`,
            when: R`«إيه العقد بين equals و hashCode؟»، و «إيه اللي يحصل لو عملت equals بس؟»، و «إزاي تكتب equals لـ JPA entity؟»، و «ليه records حلّت المشكلة؟».`,
            mistakes: R`«hashCode متساوي يعني equal». و equals بتاخد [[Point]] بدل [[Object]] (ده overload مش override، والـ HashSet مش هيناديه؛ [[@Override]] بتمسك الغلطة دي). و Lombok [[@Data]] على entity: equals و hashCode على كل الحقول بما فيها العلاقات lazy.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيوريك الـ bug بعينك: class [[Point]] عامل [[equals]] بس، فنقطتين «متساويتين» بـ equals، بس الـ [[HashSet]] مش لاقي واحدة فيهم. وبعدين [[FixedPoint]] بيضيف [[hashCode]] والمشكلة بتتحل.

اتشغّل بـ [[java Eq.java]] في [[maven:3.9-eclipse-temurin-25]] (Java 25).

---

## ١. [[class Point]]

~~~text السطور
class Point {
    final int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
~~~

- [[final int x, y;]]: حقلين [[int]]، و [[final]] يعني بيتحددوا مرة واحدة في الـ constructor ومش بيتغيروا.
- [[this.x = x]]: [[this.x]] الحقل، و [[x]] لوحده الباراميتر.

---

## ٢. [[equals]]

~~~text السطور
    @Override
    public boolean equals(Object o) {
        return o instanceof Point p && p.x == x && p.y == y;
    }
~~~

- [[@Override]]: «أنا بكتب method موجودة في الأب (هنا [[Object]])». لو غلطت في الـ signature، الـ compiler يرفض. من غيرها، لو كتبت [[equals(Point o)]] هتبقى method **جديدة** (overload)، والـ HashSet عمره ما هيناديها لأنه بينادي [[equals(Object)]].
- [[Object o]]: لازم [[Object]]، لأن ده الـ signature الأصلي.
- [[o instanceof Point p]]: pattern matching (من درس sealed و pattern matching): لو [[o]] من نوع Point، حطه في متغير [[p]] من نوع Point. ولو [[o]] بـ [[null]] النتيجة [[false]] من غير exception.
- [[&& p.x == x && p.y == y]]: [[&&]] «و»، وبتقف أول ما حاجة تطلع false. [[==]] على [[int]] بيقارن القيم.

ومفيش [[hashCode]]! يعني [[Point]] بيورث [[hashCode]] من [[Object]]، وده رقم مبني على **هوية** الـ object: كل [[new]] رقم مختلف تقريبًا.

---

## ٣. [[FixedPoint]]

~~~text السطور
class FixedPoint extends Point {
    FixedPoint(int x, int y) { super(x, y); }
    @Override
    public int hashCode() { return Objects.hash(x, y); }
}
~~~

- [[extends Point]]: بيورث الحقول والـ [[equals]].
- [[super(x, y)]]: ينادي constructor الأب.
- [[Objects.hash(x, y)]]: بيحسب رقم من القيم، فنقطتين بنفس الـ x والـ y ليهم نفس الرقم دايمًا. وهو بيستخدم **نفس الحقول** اللي في [[equals]]، وده شرط العقد.

---

## ٤. [[main]] والناتج

~~~text السطور
    IO.println(new Point(1, 2).equals(new Point(1, 2)));
    Set<Point> broken = new HashSet<>(List.of(new Point(1, 2)));
    IO.println(broken.contains(new Point(1, 2)));
    Set<Point> fixed = new HashSet<>(List.of(new FixedPoint(1, 2)));
    IO.println(fixed.contains(new FixedPoint(1, 2)));
~~~

~~~text الناتج
true
false
true
~~~

### السطر الأول: [[true]]

نقطتين جداد، و [[equals]] بتاعتنا قارنت القيم. تمام.

### السطر التاني: [[false]]، ليه؟

[[new HashSet<>(List.of(...))]] عمل Set فيها نقطة واحدة. و [[contains]] بيمشي كده:

1. يحسب [[hashCode()]] للنقطة اللي بتدوّر عليها.
2. يروح للـ **bucket** (الخانة) اللي الرقم ده بيشاور عليها.
3. يقارن بـ [[equals]] مع اللي في الخانة دي **بس**.

النقطتين ليهم hashCode مختلف (هوية مختلفة)، فالـ [[contains]] راح خانة تانية خالص، ملقاش حد، ورجّع [[false]]، و [[equals]] متنادتش أصلًا.

### السطر التالت: [[true]]

[[FixedPoint]] ليهم نفس الـ hashCode، فراحوا نفس الخانة، و [[equals]] قالت متساويين.

---

## ٥. الحل: equals و hashCode لـ JPA entity

~~~text الحل
@Override
public boolean equals(Object o) {
  if (this == o) return true;
  if (!(o instanceof Task other)) return false;
  return id != null && id.equals(other.getId());
}

@Override
public int hashCode() {
  return Task.class.hashCode();
}
~~~

- [[this == o]]: نفس الـ object بالظبط؟ يبقى متساوي (وأسرع check).
- [[!(o instanceof Task other)]]: [[!]] «مش». لو مش Task ارجع false. [[instanceof]] (مش [[getClass()]]) عشان الـ Hibernate proxy subclass من Task ولازم يتساوى معاه.
- [[id != null && id.equals(other.getId())]]: متساويين لو ليهم نفس الـ id. ولو الـ id لسه [[null]] (entity جديد متحفظش)، مش متساوي مع غير نفسه. و [[other.getId()]] مش [[other.id]]، عشان مع الـ proxy الـ getter هو اللي بيرجّع القيمة.
- [[Task.class.hashCode()]]: رقم **ثابت** لكل الـ tasks، مش بيتغير لما الـ id يتولّد.

جربنا الفكرة دي بـ class صغير من غير JPA: حطينا task جديدة (id بـ null) في HashSet، وبعدين حطينا [[id = 42]] كأنها اتحفظت:

~~~text الناتج
Objects.hash(id):      contains=false remove=false size=1
Task.class.hashCode(): contains=true remove=true size=0
~~~

مع [[Objects.hash(id)]]: الـ object اتحط في خانة محسوبة من [[null]]، وبعد ما الـ id بقى ٤٢ الـ hash اتغير، فـ [[contains]] و [[remove]] بيدوّروا في خانة غلط، والـ Set لسه فيها عنصر (size=1) مش عارفين نوصله. مع الـ hashCode الثابت: لاقاه وشاله.

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| [[a.equals(b)]] ⇒ نفس [[hashCode]] | HashSet/HashMap بيروحوا للخانة بالـ hash الأول |
| نفس الـ hash مش لازم يعني equal | collision عادي، و equals بتفصل |
| [[equals(Object o)]] + [[@Override]] | وإلا overload محدش بيناديه |
| في JPA: equals على الـ id و hashCode ثابت | الـ id بيتولّد بعد الـ save |

- [[record]] بيعمل equals و hashCode على كل الحقول صح لوحده.
- override لـ equals من غير hashCode = Set و Map مش هيلاقوا الـ object.`,
          lines: [
            "class عادي.",
            "حقلين.",
            "constructor.",
            "override لـ equals.",
            R`الـ signature: بتاخد [[Object]] مش Point، وإلا تبقى overload والـ HashSet مش هيناديها.`,
            R`pattern matching: نفس النوع ونفس القيم. ومفيش hashCode!`,
            "قفلة.",
            "قفلة.",
            "class بيصلّح المشكلة.",
            "constructor.",
            "override.",
            R`hashCode من نفس الحقول اللي في equals.`,
            "قفلة.",
            "main.",
            R`[[true]]: equals شغالة.`,
            "Set فيها نقطة.",
            R`[[false]]: hashCode مختلف فراح bucket تاني.`,
            "Set بالنوع المتصلّح.",
            R`[[true]].`,
            "قفلة."
          ],
          sol: R`الشكل الآمن تحت. المشكلة مع [[Objects.hash(id)]]: وانت بتضيف entity جديد لـ HashSet الـ id null، فالـ hash محسوب من null. بعد [[save]] الـ id بقى 42 والـ hash اتغير، بس الـ object لسه في الـ bucket القديم. [[set.contains(task)]] بقت false و [[set.remove(task)]] مش بتشيله، مع إنه جوه. الـ hashCode الثابت بيضمن إن الـ bucket مايتغيرش، وتمنه إن كل الـ entities من النوع ده في نفس الـ bucket (أبطأ مع Set فيها آلاف، ونادرًا ما ده بيحصل مع entities).`,
          solCode: R`@Override
public boolean equals(Object o) {
  if (this == o) return true;
  if (!(o instanceof Task other)) return false;
  return id != null && id.equals(other.getId());
}

@Override
public int hashCode() {
  return Task.class.hashCode();
}`
        },
        {
          cmd: "HashMap من جوه",
          title: "HashMap بيشتغل إزاي من جوه، وإيه اللي يبوظه؟",
          desc: R`HashMap فيه array من buckets (افتراضيًا ١٦). لما تعمل [[put(k, v)]]: يحسب [[k.hashCode()]]، ويخلط البتات العليا في السفلى ([[h ^ (h >>> 16)]])، وياخد [[& (n - 1)]] عشان يحدد الـ bucket. لو الـ bucket فيه عناصر، يقارن بـ equals: لو لقى نفس المفتاح يغيّر القيمة، لو لأ يضيف.

لما العناصر توصل ٧٥٪ من عدد الـ buckets (load factor)، بيضاعف الـ array ويوزّع كله من جديد (resize). ولو bucket واحد فيه أكتر من ٨ عناصر (والـ array ٦٤ أو أكبر)، بيتحول من linked list لشجرة (red-black tree) عشان البحث يبقى O(log n) بدل O(n).`,
          example: R`record Key(String name) {
    @Override public int hashCode() { return 42; }
}

void main() {
    Map<String, Integer> m = new HashMap<>();
    m.put("Aa", 1);
    m.put("BB", 2);
    IO.println("Aa".hashCode() + " " + "BB".hashCode() + " " + m);
    int h = "spring".hashCode();
    IO.println("bucket in 16: " + ((h ^ (h >>> 16)) & 15));
    Map<Key, Integer> slow = new HashMap<>();
    long t = System.nanoTime();
    for (int i = 0; i < 20_000; i++) slow.put(new Key("k" + i), i);
    IO.println("all in one bucket: " + slow.size() + " in " + (System.nanoTime() - t) / 1_000_000 + "ms");
    List<Integer> mutableKey = new ArrayList<>(List.of(1));
    Map<List<Integer>, String> byList = new HashMap<>();
    byList.put(mutableKey, "found");
    mutableKey.add(2);
    IO.println(byList.get(mutableKey) + " " + byList.size());
}`,
          try: R`غيّر [[return 42]] في [[Key]] لـ [[return name.hashCode()]] وقارن الوقت. وبعدين خلي [[Key]] يعمل [[implements Comparable<Key>]] (قارن بالـ name) ورجّع [[return 42]]: الوقت اتحسن؟ ليه؟`,
          flag: "script",
          deep: {
            why: R`من أكتر أسئلة Java تكرارًا. والإجابة بتوري إنك فاهم hashing و equals و hashCode و complexity مع بعض. وليها أثر عملي: مفاتيح بتتغير، و hashCode وحش، و HashMap بين threads.`,
            how: R`نقط لو اتسألت أكتر: [[get]] و [[put]] O(1) في المتوسط، O(log n) أسوأ حالة من Java 8 (بسبب الـ treeification)، وقبلها كانت O(n). الـ treeification بتستخدم [[compareTo]] لو المفاتيح Comparable، ولو لأ بتستخدم ترتيب احتياطي (tie-break) مش بيساعد في البحث، عشان كده [[Key]] مع hash ثابت فضل بطيء.

الـ resize بيحصل لما [[size > capacity * 0.75]]، وبيعيد توزيع كل العناصر O(n). لو عارف الحجم تقريبًا: [[HashMap.newHashMap(expectedSize)]] (Java 19+).

المفتاح null مسموح (واحد، في bucket 0). و HashMap مش thread-safe: من كذا thread استخدم [[ConcurrentHashMap]] (مش [[Collections.synchronizedMap]] ولا [[Hashtable]] القديم).

والمفتاح اللي بيتغير: الـ hash اتحسب وقت الـ put، فلو المفتاح اتغير، الـ get بيحسب hash جديد ويروح bucket تاني: [[null]]، والعنصر لسه جوه (size 1). ده اللي حصل في آخر سطرين.`,
            when: R`«HashMap بيشتغل إزاي؟»، و «إيه اللي يحصل في collision؟»، و «إيه الـ load factor؟»، و «HashMap ولا ConcurrentHashMap؟»، و «ليه مفاتيح HashMap لازم تبقى immutable؟»، و «ليه String مفتاح كويس؟» (immutable و hashCode متكاش).`,
            mistakes: R`«O(1) دايمًا». و «الـ collisions بتمسح القيمة القديمة». ونسيان خطوة الـ equals. و «HashMap بيحافظ على الترتيب» (ده LinkedHashMap). و HashMap عادي كـ cache مشترك بين الـ requests في Spring bean.`
          },
          teach: R`## البرنامج بيعمل إيه؟

٤ تجارب صغيرة في برنامج واحد، كل واحدة بتكشف حتة من HashMap من جوه: (١) مفتاحين ليهم نفس الـ hashCode وعايشين مع بعض، (٢) الحسبة اللي بتختار الخانة (bucket)، (٣) إيه اللي يحصل لو كل المفاتيح في خانة واحدة، (٤) مفتاح اتغير بعد ما اتحط.

اتشغّل بـ [[java Hm.java]] في [[maven:3.9-eclipse-temurin-25]] (Java 25).

---

## ١. [[record Key]] بـ hashCode وحش

~~~text السطور
record Key(String name) {
    @Override public int hashCode() { return 42; }
}
~~~

- [[record Key(String name)]]: class فيه حقل [[name]]، والـ record بيعمل [[equals]] و [[hashCode]] و [[toString]] لوحده.
- بس إحنا عملنا override لـ [[hashCode]] يرجّع [[42]] دايمًا. ده **قانوني** (مفاتيح متساوية ليها نفس الرقم، فالعقد ماشي)، بس أسوأ hash ممكن: كل المفاتيح هتروح نفس الخانة.

---

## ٢. collision: [["Aa"]] و [["BB"]]

~~~text السطور
    Map<String, Integer> m = new HashMap<>();
    m.put("Aa", 1);
    m.put("BB", 2);
    IO.println("Aa".hashCode() + " " + "BB".hashCode() + " " + m);
~~~

~~~text الناتج
2112 2112 {Aa=1, BB=2}
~~~

ليه نفس الرقم؟ [[String.hashCode()]] بيتحسب كده: لكل حرف، اضرب اللي فات في ٣١ وزوّد كود الحرف:

~~~text الحسبة
"Aa":  'A'=65,  'a'=97   →  65 × 31 + 97  = 2015 + 97 = 2112
"BB":  'B'=66,  'B'=66   →  66 × 31 + 66  = 2046 + 66 = 2112
~~~

نفس الخانة، بس الاتنين موجودين في الـ map: لما [["BB"]] وصل للخانة ولقى [["Aa"]]، قارن بـ [[equals]]، لقاهم مختلفين، فضافه جنبه (linked list جوه الخانة) بدل ما يكتب فوقه. ده الـ **collision**.

---

## ٣. الخانة: [[(h ^ (h >>> 16)) & 15]]

~~~text السطور
    int h = "spring".hashCode();
    IO.println("bucket in 16: " + ((h ^ (h >>> 16)) & 15));
~~~

ده نفس اللي HashMap بيعمله جوه. من جوه لبرة:

| الخطوة | الرمز | معناه | القيمة لـ "spring" |
|---|---|---|---|
| ١ | [[h]] | الـ hashCode | [[-895679987]] |
| ٢ | [[h >>> 16]] | زق البتات ١٦ خانة يمين ([[>>>]] بيدخّل أصفار من الشمال)، فالنص العالي ينزل تحت | [[51869]] |
| ٣ | [[h ^ ...]] | XOR: البت يبقى 1 لو البتين مختلفين. بيخلط النص العالي في النص الواطي | [[-895629168]] |
| ٤ | [[& 15]] | AND مع 15 (يعني [[1111]] بالـ binary): خد آخر ٤ بتات بس = رقم من 0 لـ 15 | [[0]] |

~~~text الناتج
bucket in 16: 0
~~~

- ليه [[& 15]] مش [[% 16]]؟ لأن عدد الخانات دايمًا قوة لـ ٢ (16، 32، 64...)، و [[& (n - 1)]] بيدّي نفس نتيجة باقي القسمة بس أسرع.
- ليه الخلط في الخطوة ٣؟ لأن [[& 15]] بيبص على آخر ٤ بتات بس. لو hashCodes كتير مختلفين في البتات العالية بس، كانوا هيقعوا كلهم في نفس الخانة. من غير الخلط، [["spring"]] كان هيروح خانة [[13]] ([[h & 15]])، ومع الخلط راح [[0]].

---

## ٤. كل المفاتيح في خانة واحدة

~~~text السطور
    Map<Key, Integer> slow = new HashMap<>();
    long t = System.nanoTime();
    for (int i = 0; i < 20_000; i++) slow.put(new Key("k" + i), i);
    IO.println("all in one bucket: " + slow.size() + " in " + (System.nanoTime() - t) / 1_000_000 + "ms");
~~~

- [[System.nanoTime()]]: عدّاد بالنانو ثانية، للقياس بس. القسمة على [[1_000_000]] بتحوّل لمللي ثانية.
- كل [[put]] بيروح نفس الخانة، ولازم يقارن بـ [[equals]] مع اللي فيها عشان يتأكد إن المفتاح مش موجود. فالـ put رقم ٢٠٠٠٠ بيقارن مع آلاف.

~~~text الناتج (مرتين)
all in one bucket: 20000 in 1666ms
all in one bucket: 20000 in 2512ms
~~~

ومع [[return name.hashCode();]] (التجربة):

~~~text الناتج
all in one bucket: 20000 in 8ms
all in one bucket: 20000 in 12ms
~~~

مئتين ضعف تقريبًا. (الرقم بيختلف كل مرة وكل جهاز، بس الفرق دايمًا بالشكل ده.)

---

## ٥. المفتاح اللي اتغير

~~~text السطور
    List<Integer> mutableKey = new ArrayList<>(List.of(1));
    Map<List<Integer>, String> byList = new HashMap<>();
    byList.put(mutableKey, "found");
    mutableKey.add(2);
    IO.println(byList.get(mutableKey) + " " + byList.size());
~~~

- الـ list نفسها مفتاح. و [[List.hashCode()]] محسوب من العناصر.
- [[put]] حسب الـ hash من [[[1]]] وحط القيمة في الخانة بتاعته.
- [[mutableKey.add(2)]]: نفس الـ object بقى [[[1, 2]]]، فالـ hashCode بتاعه اتغير.
- [[get(mutableKey)]]: حسب hash جديد، راح خانة تانية، ملقاش.

~~~text الناتج
null 1
~~~

[[null]]: مش لاقيه. و [[1]]: هو لسه جوه الـ map! محدش يقدر يوصله تاني ولا يشيله. عشان كده مفاتيح HashMap لازم تبقى immutable (String و Integer و records فيها حقول immutable).

---

## ٦. التجربة: [[Comparable]] مع hash ثابت

~~~text الحل
record Key(String name) implements Comparable<Key> {
    @Override public int hashCode() { return 42; }
    @Override public int compareTo(Key o) { return name.compareTo(o.name); }
}
~~~

- [[implements Comparable<Key>]]: «المفاتيح دي ليها ترتيب».
- [[compareTo]]: سالب لو أصغر، صفر لو متساوي، موجب لو أكبر. هنا ترتيب أبجدي بالاسم.

~~~text الناتج
20000 in 42ms
~~~

من ثانيتين لـ ٤٢ms. ليه؟ لما خانة توصل أكتر من ٨ عناصر (والـ array ٦٤ خانة أو أكتر)، HashMap بيحوّلها من linked list لـ **شجرة** (red-black tree). والشجرة لو المفاتيح [[Comparable]] بترتبهم بـ [[compareTo]]، فالبحث بقى O(log n) (حوالي ١٥ مقارنة لـ ٢٠٠٠٠) بدل O(n). من غير Comparable، الشجرة موجودة بس مش عارفة ترتب بشكل يفيد البحث، فبتلف على الكل.

---

## الخلاصة

| الحالة | تكلفة [[get]] / [[put]] |
|---|---|
| hashCode كويس | O(1) في المتوسط |
| collisions كتير في خانة، مفاتيح Comparable | O(log n) (شجرة) |
| collisions كتير، مش Comparable | قريب من O(n) |

- الخطوات: hashCode ← خلط البتات ← [[& (n-1)]] للخانة ← equals جوه الخانة.
- لما العناصر توصل ٧٥٪ من عدد الخانات (load factor)، الـ array بتتضاعف وكل حاجة تتوزع من جديد.
- المفتاح لازم immutable، و hashCode كويس أهم من أي حاجة.`,
          lines: [
            R`record مفتاح بـ hashCode ثابت (أسوأ hash ممكن).`,
            "كل المفاتيح نفس الرقم.",
            "قفلة.",
            "main.",
            "map عادية.",
            "مفتاح.",
            "مفتاح تاني.",
            R`[[2112 2112 {Aa=1, BB=2}]]: نفس الـ hashCode (collision) والاتنين موجودين بفضل equals.`,
            "hash لـ string.",
            R`نفس الحسبة اللي HashMap بيعملها: bucket رقم [[0]] من ١٦.`,
            "map بالمفتاح الوحش.",
            "وقت.",
            "٢٠٠٠٠ مفتاح كلهم في bucket واحد.",
            R`ثانيتين تقريبًا ([[1666ms]] و [[2512ms]] في تجربتين عندنا)، والمفروض أجزاء من الثانية.`,
            "list هتبقى مفتاح.",
            "map مفتاحها list.",
            "put.",
            R`غيّرنا المفتاح بعد ما اتحط: الـ hashCode اتغير.`,
            R`[[null 1]]: مش لاقيه، وهو لسه جوه.`,
            "قفلة."
          ],
          sol: R`مع [[name.hashCode()]] الـ ٢٠٠٠٠ مفتاح اتحطوا عندنا في حوالي ١٠ ms بدل ٢ لـ ٣ ثواني: كل مفتاح في bucket تقريبًا لوحده.

ومع [[Comparable]] و hash ثابت: حوالي ٤٠ ms عندنا، يعني أسرع بعشرات المرات من غير Comparable (ثانيتين ونص بقوا ٤٢ ms)، بس لسه أبطأ من الـ hash الكويس. لما الـ bucket يتحول لشجرة، الشجرة بتترتب بـ [[compareTo]]، فالبحث جوه الـ bucket بقى O(log n) بدل O(n). من غير Comparable، الشجرة مش بتعرف ترتب المفاتيح بشكل مفيد في البحث، فبتدوّر في كله. الدرس: hashCode كويس أهم حاجة، والـ treeification شبكة أمان.`,
          solCode: R`record Key(String name) implements Comparable<Key> {
    @Override public int hashCode() { return 42; }
    @Override public int compareTo(Key o) { return name.compareTo(o.name); }
}

void main() {
    Map<Key, Integer> m = new HashMap<>();
    long t = System.nanoTime();
    for (int i = 0; i < 20_000; i++) m.put(new Key("k" + i), i);
    IO.println(m.size() + " in " + (System.nanoTime() - t) / 1_000_000 + "ms");
}`
        },
        {
          cmd: "bean scopes",
          title: "الـ beans singleton ولا بيتعمل واحد لكل request؟",
          desc: R`الافتراضي singleton: object واحد للـ ApplicationContext كله، مشترك بين كل الـ requests والـ threads. عشان كده الـ services لازم تبقى stateless (أو thread-safe). [[prototype]]: object جديد كل مرة حد يطلب الـ bean. وفي الويب: [[request]] (واحد لكل HTTP request) و [[session]].

الفخ المشهور: prototype محقون في singleton بيتحقن مرة واحدة وقت عمل الـ singleton، فبيبقى عملًيا singleton. عشان تاخد واحد جديد كل مرة: [[ObjectProvider<Proto>]] و [[getObject()]].`,
          example: R`@Component static class Single {}
@Component @Scope("prototype") static class Proto {}
@Component static class Holder {
  final Proto injected; final ObjectProvider<Proto> provider;
  Holder(Proto injected, ObjectProvider<Proto> provider) { this.injected = injected; this.provider = provider; }
}

@Test
void scopes() {
  try (var ctx = new AnnotationConfigApplicationContext(Single.class, Proto.class, Holder.class)) {
    assertThat(ctx.getBean(Single.class)).isSameAs(ctx.getBean(Single.class));
    assertThat(ctx.getBean(Proto.class)).isNotSameAs(ctx.getBean(Proto.class));
    Holder h = ctx.getBean(Holder.class);
    assertThat(h.injected).isSameAs(h.injected);
    assertThat(h.provider.getObject()).isNotSameAs(h.provider.getObject());
  }
}`,
          try: R`اعمل [[@Service]] فيه [[private int counter;]] و method بتزوّده وترجّعه، وناديها من endpoint ([[GET /api/count]]، ومع الـ security بتاعتنا محتاج token). ابعت ١٠٠٠ request بالتوازي، وبعدين request واحد كمان: المفروض يرجع 1001. رجع كام؟ وبعدين اشرح بصوتك ليه. (لينكس أو Git Bash: [[seq 1000 | xargs -P 50 -I{} curl -s -o /dev/null localhost:8080/api/count -H "Authorization: Bearer $TOKEN"]].)`,
          flag: "script",
          deep: {
            why: R`بيختبر إنك فاهم إن الـ bean مشترك بين كل الـ requests، وده سبب bugs خطيرة: بيانات يوزر بتظهر ليوزر تاني لأن حد حطها في حقل في service.`,
            how: R`نقط أكتر: الـ lifecycle: Spring بيعمل الـ bean، ويحقن الـ dependencies، وينادي [[@PostConstruct]]، وفي الآخر [[@PreDestroy]] (للـ singletons بس؛ الـ prototype Spring بيسيبه بعد ما يسلّمه ومبينداش destroy).

الـ singletons بتتعمل وقت بداية التطبيق (eager)، فالأخطاء بتظهر بدري. و [[@Lazy]] بيأجلها لأول استخدام.

الـ request و session scopes بيتحقنوا في الـ singletons عن طريق proxy ([[proxyMode = ScopedProxyMode.TARGET_CLASS]]، أو [[@RequestScope]] اللي بيعمله لوحده): الـ proxy بيروح للـ object بتاع الـ request الحالي كل نداء.

Spring singleton مش Singleton pattern: واحد لكل context، ممكن تعمل [[new]] للـ class عادي، وممكن يبقى فيه اتنين beans من نفس الـ class بأسماء مختلفة.`,
            when: R`«إيه الـ scopes الموجودة؟»، و «Spring beans thread-safe؟» (لأ، Spring مبيعملش حاجة؛ انت اللي تخليها stateless)، و «إيه اللي يحصل لو حقنت prototype في singleton؟»، و «إزاي تخزن بيانات خاصة بالـ request؟» (request scope، أو ThreadLocal، أو الأحسن تعدّيها كباراميتر).`,
            mistakes: R`«كل request بيعمل service جديد». و «الـ singleton thread-safe لأنه واحد». وحقول بتتغير في services «عشان أوفر نداء للداتابيز» (cache في HashMap عادي).`
          },
          teach: R`## التست ده بيعمل إيه؟

بيقوّم Spring container صغير جدًا (من غير Spring Boot) فيه ٣ beans، ويثبت بالـ assertions: الـ singleton بيرجع نفس الـ object كل مرة، والـ prototype بيرجع واحد جديد كل مرة، والـ prototype المحقون في singleton بيتحقن **مرة واحدة**، و [[ObjectProvider]] هو اللي بيجيب جديد كل مرة.

اتشغّل في المشروع كـ [[ScopesTest]] ([[mvn test -Dtest=ScopesTest]]):

~~~text الناتج
[INFO] Running com.example.tasks.ScopesTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.815 s -- in com.example.tasks.ScopesTest
~~~

---

## ١. الـ beans

~~~text السطور
@Component static class Single {}
@Component @Scope("prototype") static class Proto {}
~~~

- الـ classes دي **جوه** class التست، و [[static]] معناها إنها مش محتاجة object من class التست عشان تتعمل (nested static class). Spring محتاجها كده عشان يعرف يعمل منها بنفسه.
- [[@Component]]: «ده bean». ومن غير أي scope = **singleton** (الافتراضي).
- [[@Scope("prototype")]]: object جديد كل ما حد يطلبه.

---

## ٢. الـ [[Holder]]: singleton محتاج prototype

~~~text السطور
@Component static class Holder {
  final Proto injected; final ObjectProvider<Proto> provider;
  Holder(Proto injected, ObjectProvider<Proto> provider) { this.injected = injected; this.provider = provider; }
}
~~~

- الـ constructor طالب حاجتين، و Spring بيحقنهم (constructor injection):
  - [[Proto injected]]: Spring بيعمل Proto **دلوقتي**، وقت ما بيعمل الـ Holder، ويحطه.
  - [[ObjectProvider<Proto> provider]]: مش Proto، ده «مندوب» تقدر تطلب منه Proto بعدين. كل [[getObject()]] بيروح للـ container ويطلب الـ bean من جديد.
- [[<Proto>]]: generics، يعني المندوب ده بيجيب Proto بالتحديد.

---

## ٣. الـ container

~~~text السطر
  try (var ctx = new AnnotationConfigApplicationContext(Single.class, Proto.class, Holder.class)) {
~~~

- [[AnnotationConfigApplicationContext]]: الـ ApplicationContext الأساسي في Spring Framework، اللي Spring Boot نفسه بيستخدم نسخة منه. هنا بنديله الـ classes بإيدنا بدل الـ component scan.
- [[try (...)]]: الـ context بيتقفل في الآخر لوحده (بينادي [[@PreDestroy]] للـ singletons).
- مفيش [[@SpringBootTest]]: ده JUnit عادي، فالتست خلص في أقل من ٢ ثانية.

---

## ٤. الـ assertions، واحدة واحدة

~~~text السطر ١
assertThat(ctx.getBean(Single.class)).isSameAs(ctx.getBean(Single.class));
~~~

- [[ctx.getBean(Single.class)]]: اطلب الـ bean بالنوع.
- [[isSameAs]]: نفس الـ object بالظبط ([[==]])، مش [[equals]]. طلبناه مرتين ورجع نفس الـ object: **singleton**.

~~~text السطر ٢
assertThat(ctx.getBean(Proto.class)).isNotSameAs(ctx.getBean(Proto.class));
~~~

[[isNotSameAs]]: كل [[getBean]] عمل object جديد: **prototype**.

~~~text السطر ٣ و ٤
Holder h = ctx.getBean(Holder.class);
assertThat(h.injected).isSameAs(h.injected);
~~~

[[h.injected]] حقل [[final]] اتحط مرة واحدة، فطبيعي يبقى نفس الـ object كل مرة تقراه. ده **الفخ**: إنت كنت عايز prototype، بس لأن الـ Holder singleton واتعمل مرة، الـ Proto اللي جواه اتعمل مرة واحدة بس، وكل اللي هيستخدم الـ Holder هيشارك نفس الـ Proto.

~~~text السطر ٥
assertThat(h.provider.getObject()).isNotSameAs(h.provider.getObject());
~~~

[[getObject()]] كل مرة بيطلب من الـ container، والـ container بيعمل Proto جديد: ده الحل.

---

## ٥. التجربة: counter في singleton

[[CounterService]] فيه [[private int counter;]] و [[next()]] بتعمل [[counter++]] وترجّعه، ومن [[GET /api/count]]. بعتنا ١٠٠٠ request من ٥٠ thread في نفس الوقت، وبعدين request زيادة:

~~~text الناتج (٣ دفعات ورا بعض، بعد restart)
last = 951      ← المفروض 1001
last = 1877     ← المفروض 2002
last = 11432    ← المفروض 13003 (بعد ١٠٠٠٠ request)
~~~

ليه؟ [[counter++]] شكله خطوة واحدة، بس هو ٣:

~~~text اللي بيحصل
thread A: يقرا counter = 500
thread B: يقرا counter = 500
thread A: يكتب 501
thread B: يكتب 501        ← زيادة A ضاعت
~~~

اسمها **lost update** أو race condition. والـ [[CounterService]] **singleton**: object واحد بين كل الـ threads. Spring مبيعملش أي حماية؛ الـ bean thread-safe بس لو انت كتبته كده (أو خليته stateless). الحل لو محتاج عداد: [[AtomicInteger]] و [[incrementAndGet()]]، والأحسن الـ state تبقى في الداتابيز.

> ولما بعتنا الـ ١٠٠٠ request بـ [[xargs -P 50]] و [[curl]] من Git Bash على ويندوز، الرقم طلع 1001 مظبوط: كل curl بياخد وقت يقوم، فالـ requests نادرًا ما اتزامنت. الـ bug موجود بس محتاج ضغط حقيقي يبان.

---

## الخلاصة

| الـ scope | كام object | إمتى |
|---|---|---|
| singleton (الافتراضي) | واحد للـ context | services و repositories و controllers |
| prototype | جديد لكل طلب | objects فيها state قصيرة العمر |
| request | واحد لكل HTTP request | بيانات الـ request الحالي |
| session | واحد لكل HTTP session | بيانات اليوزر في الـ session |

- prototype محقون في singleton = بيتحقن مرة واحدة. عايز جديد كل مرة؟ [[ObjectProvider]] و [[getObject()]].
- الـ singleton مشترك بين كل الـ threads، فمتحطش فيه حقول بتتغير.`,
          lines: [
            "singleton (الافتراضي).",
            "prototype.",
            "singleton بيطلب prototype بطريقتين.",
            R`حقن مباشر، و [[ObjectProvider]] (lazy lookup).`,
            "constructor injection.",
            "قفلة.",
            "تست.",
            "method.",
            R`context صغير من غير Spring Boot.`,
            R`singleton: نفس الـ object.`,
            "prototype: جديد كل مرة.",
            "الـ holder.",
            R`المحقون مباشرة ثابت (اتحقن مرة وقت عمل الـ Holder).`,
            R`[[getObject()]] بيعمل جديد كل مرة.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`جربناها: ١٠٠٠ request من ٥٠ thread في نفس الوقت (برنامج Java صغير في container على نفس شبكة الـ app)، والـ request رقم 1001 رجع [[951]] مش 1001: ٥٠ زيادة ضاعوا. ومرة تانية فوقها: [[1877]] بدل 2002. ولما بعتناهم بـ [[xargs]] و [[curl]] من Git Bash على ويندوز رجع 1001 مظبوط، لأن كل curl process بياخد وقت يقوم فالـ requests مكانتش بتتزامن فعلًا. يعني الـ bug ده ممكن يعدّي في التجربة ويظهر تحت الضغط الحقيقي. السبب: الـ service singleton، وكل request على thread مختلف، و [[counter++]] مش atomic (اقرا، زوّد، اكتب)، فاتنين threads بيقروا نفس القيمة ويكتبوا نفس النتيجة (lost update). (مع virtual threads أو من غيرها نفس المشكلة.)

الحل لو محتاج عداد فعلًا: [[AtomicInteger]]. والأهم: الـ state المشتركة مكانها الداتابيز أو Redis، مش حقل في bean، لأن مع أكتر من نسخة من التطبيق كل واحدة هيبقى ليها عدادها. (التست اللي في المثال عدّى في المشروع.)`
        },
        {
          cmd: "فخاخ @Transactional",
          title: "ليه @Transactional ساعات مبيعملش rollback أو مبيشتغلش خالص؟",
          desc: R`تلات فخاخ مشهورة: (١) الـ self-invocation: method في نفس الـ class بتنادي method عليها [[@Transactional]] بـ [[this]]، فالنداء مش بيعدّي على الـ proxy والـ transaction مش بتتفتح. (٢) الـ checked exceptions: الـ rollback افتراضيًا على RuntimeException و Error بس، فـ [[throws Exception]] بتعمل commit. (٣) private أو final methods: الـ proxy مش بيقدر يلفها.

وكمان: لو مسكت الـ exception جوه الـ method، الـ proxy مش بيشوفها فبيعمل commit.`,
          example: R`@Service
public class AuditService {
  public boolean outer() {
    return inner();
  }

  @Transactional
  public boolean inner() {
    return TransactionSynchronizationManager.isActualTransactionActive();
  }
}

@Service
public class ImportService {
  @Transactional
  public void importChecked(String name) throws Exception {
    projects.save(new Project(name));
    throw new Exception("csv broken");
  }

  @Transactional
  public void importUnchecked(String name) {
    projects.save(new Project(name));
    throw new IllegalStateException("csv broken");
  }
}`,
          try: R`اكتب integration test (بـ Testcontainers): [[audit.inner()]] و [[audit.outer()]] بيرجعوا إيه؟ ونادي الـ import بالطريقتين وبعدين دوّر على المشروعين بالاسم: مين اتحفظ؟ وصلّح الاتنين.`,
          flag: "script",
          deep: {
            why: R`أشهر سؤال Spring في الانترفيوهات المتقدمة، وأشهر سبب لـ «الداتا اتحفظت نصها» في الإنتاج. والإجابة بتوري إنك فاهم إن Spring شغال بـ proxies.`,
            how: R`Spring بيحقن proxy (subclass بـ CGLIB) مكان الـ bean الحقيقي. لما controller ينادي [[auditService.outer()]]، النداء بيعدّي على الـ proxy، و [[outer]] مفيهاش annotation فالـ proxy بيسلّم للـ object الحقيقي. جوه، [[inner()]] يعني [[this.inner()]]، و [[this]] هو الـ object الحقيقي مش الـ proxy، فمفيش transaction.

الحلول: حط الـ annotation على الـ method اللي بتتنادى من برّه، أو انقل الـ method لـ bean تاني، أو (نادرًا) احقن الـ bean في نفسه. ونفس الكلام لـ [[@Async]] و [[@Cacheable]] و [[@PreAuthorize]].

الـ rollback rules: [[@Transactional(rollbackFor = Exception.class)]] يخلي الـ checked exceptions تعمل rollback. الافتراضي ده جاي من EJB زمان: الـ checked كانت تعتبر «أخطاء business متوقعة».

كمان: [[readOnly]] مش بيمنع الكتابة في كل الحالات، و propagation [[REQUIRES_NEW]] محتاج connection تانية (ممكن deadlock للـ pool لو صغير)، والـ transaction بتبدأ من أول نداء وبتمسك connection لحد الآخر.`,
            when: R`«@Transactional مش شغالة، ليه؟»، و «هل بيعمل rollback على checked exceptions؟»، و «إيه الـ propagation levels؟»، و «Spring AOP بيشتغل إزاي؟».`,
            mistakes: R`«ضيف @Transactional على الـ class كله وخلاص» من غير ما تفهم. و [[catch (Exception e) { log.error(...) }]] جوه method transactional فالـ commit يحصل لنص الشغل. و [[@Transactional]] على private method (Spring 6 بيدعم protected و package-private مع CGLIB، بس private لأ).`
          },
          teach: R`## الكود ده بيعمل إيه؟

اتنين services صغيرين، كل واحد فيه فخ:

- [[AuditService]]: method من غير annotation بتنادي method عليها [[@Transactional]] في **نفس الـ class**. وبنسأل Spring من جوه: فيه transaction فعلًا؟
- [[ImportService]]: method بتحفظ مشروع وبعدين ترمي exception. مرة checked ومرة unchecked. وبنشوف: المشروع اتحفظ ولا الـ rollback شاله؟

جربناهم في integration test بـ Testcontainers ([[@SpringBootTest]] + Postgres حقيقي، زي درس Testcontainers) في المشروع، و [[ImportService]] فيه constructor بياخد [[ProjectRepository projects]] (المثال مش كاتبه عشان يقصر).

---

## ١. الفكرة اللي ورا الاتنين: الـ proxy

لما Spring يلاقي [[@Transactional]] على method في bean، مبيحقنش الـ object بتاعك نفسه في اللي محتاجه. بيعمل **proxy**: subclass متولّد (بـ CGLIB) بيلف كل method:

~~~text اللي الـ proxy بيعمله لكل method عليها @Transactional
1. افتح transaction
2. نادي الـ method الحقيقية على الـ object بتاعك
3. لو رجعت عادي: commit
   لو رمت RuntimeException أو Error: rollback
~~~

يعني الـ transaction بتحصل **بس** لو النداء عدّى على الـ proxy.

---

## ٢. [[AuditService]]: الـ self-invocation

~~~text السطور
@Service
public class AuditService {
  public boolean outer() {
    return inner();
  }

  @Transactional
  public boolean inner() {
    return TransactionSynchronizationManager.isActualTransactionActive();
  }
}
~~~

- [[TransactionSynchronizationManager.isActualTransactionActive()]]: method static من Spring بترجع [[true]] لو فيه transaction شغالة على الـ thread ده دلوقتي. بنستخدمها كـ «جهاز كشف».
- [[return inner();]] جوه [[outer]]: ده في الحقيقة [[this.inner()]]. و [[this]] هو الـ object بتاعك، **مش** الـ proxy.

في التست:

~~~text الكود
System.out.println("inner=" + audit.inner() + " outer=" + audit.outer());
~~~

~~~text الناتج
inner=true outer=false
~~~

| النداء | المسار | transaction؟ |
|---|---|---|
| [[audit.inner()]] من التست | التست ← proxy ← inner | أيوة: الـ proxy شاف [[@Transactional]] |
| [[audit.outer()]] من التست | التست ← proxy ← outer ← [[this.inner()]] | لأ: [[outer]] مفيهاش annotation، و [[inner]] اتنادت من جوه من غير proxy |

نفس الـ method، ونتيجتين مختلفتين حسب مين ناداها. والـ annotation على [[inner]] اتجاهلت من غير أي warning.

---

## ٣. [[ImportService]]: الـ checked exception

~~~text السطور
  @Transactional
  public void importChecked(String name) throws Exception {
    projects.save(new Project(name));
    throw new Exception("csv broken");
  }

  @Transactional
  public void importUnchecked(String name) {
    projects.save(new Project(name));
    throw new IllegalStateException("csv broken");
  }
~~~

- [[throws Exception]]: لازم تتكتب لأن [[Exception]] **checked**: الـ compiler بيجبرك تعلن عنها.
- [[IllegalStateException]]: subclass من [[RuntimeException]]، يعني **unchecked**، فمش محتاج [[throws]].
- الاتنين بيحفظوا مشروع ثم يرموا بنفس الرسالة. الفرق النوع بس.

في التست ناديناهم بـ [[assertThatThrownBy]] (عشان التست ميقعش من الـ exception)، وبعدين دوّرنا:

~~~text الكود
assertThatThrownBy(() -> importer.importChecked("Checked")).hasMessage("csv broken");
assertThatThrownBy(() -> importer.importUnchecked("Unchecked")).hasMessage("csv broken");
System.out.println("Checked saved? " + projects.findByName("Checked").isPresent()
    + " Unchecked saved? " + projects.findByName("Unchecked").isPresent());
~~~

~~~text الناتج
Checked saved? true Unchecked saved? false
~~~

- [[Unchecked]] مش موجود: [[IllegalStateException]] عدّت على الـ proxy، فعمل rollback، والـ INSERT اتلغى.
- [[Checked]] **موجود**: الـ exception طلعت للي نادى زي ما هي، بس الـ proxy عمل **commit** قبلها. القاعدة الافتراضية: rollback على [[RuntimeException]] و [[Error]] بس.

والتست كله عدّى:

~~~text الناتج
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 31.58 s -- in com.example.tasks.PitfallsTest
~~~

---

## ٤. الإصلاح

| الفخ | الإصلاح |
|---|---|
| self-invocation | حط [[@Transactional]] على [[outer]] (الـ method اللي بتتنادى من برّه)، أو انقل [[inner]] لـ bean تاني وناديه من خلال الـ proxy بتاعه |
| checked exception بتعمل commit | [[@Transactional(rollbackFor = Exception.class)]]، أو ارمي unchecked |
| [[catch]] جوه الـ method وبلعت الـ exception | الـ proxy مش هيشوفها فبيعمل commit. ارميها تاني أو متمسكهاش |
| private method | الـ proxy (subclass) مش بيشوفها أصلًا. خليها public |

---

## الخلاصة

- [[@Transactional]] شغالة عن طريق proxy، فهي بتشتغل بس لما النداء **ييجي من برّه** الـ bean.
- الـ rollback الافتراضي على unchecked بس ([[RuntimeException]] و [[Error]]). الـ checked بتعمل commit.
- نفس منطق الـ proxy ده بيأثر على [[@Async]] و [[@Cacheable]] و [[@PreAuthorize]].
- [[TransactionSynchronizationManager.isActualTransactionActive()]] طريقة سريعة تتأكد بيها في تست.`,
          lines: [
            "service.",
            "بداية.",
            R`method عادية من غير annotation.`,
            R`[[this.inner()]]: مش عن طريق الـ proxy.`,
            "قفلة.",
            R`[[@Transactional]] هنا.`,
            "لو اتنادت من برّه: فيه transaction.",
            "بترجع هل فيه transaction فعلًا.",
            "قفلة.",
            "قفلة.",
            "service تاني.",
            "بداية.",
            "transactional.",
            R`[[throws Exception]]: checked.`,
            "بنحفظ.",
            "checked exception.",
            "قفلة.",
            "transactional.",
            "unchecked.",
            "بنحفظ.",
            "RuntimeException.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`اللي حصل في المشروع (التست عدّى):

[[audit.inner()]] ← [[true]]، و [[audit.outer()]] ← [[false]]: نفس الـ method، بس من جوه الـ class مفيش transaction.

بعد الـ import بالطريقتين: [[findByName("Checked")]] موجود، و [[findByName("Unchecked")]] مش موجود. الـ checked exception خرجت من الـ method بس الـ transaction اتعملها commit.

الإصلاح: [[@Transactional(rollbackFor = Exception.class)]] على [[importChecked]] (أو ارمي unchecked)، وفي [[AuditService]] حط [[@Transactional]] على [[outer]] أو انقل [[inner]] لـ bean تاني.`
        },
        {
          cmd: "LazyInitializationException",
          title: "could not initialize proxy - no session: ليه، وإزاي تصلّحها صح؟",
          desc: R`العلاقة LAZY بترجع proxy فاضي، وبيتحمّل أول ما تلمسه، بشرط إن الـ Hibernate session (الـ persistence context) لسه مفتوحة. لو لمسته بعد ما الـ transaction خلصت (في الـ controller، أو في Jackson وهو بيعمل JSON)، بيرمي [[LazyInitializationException: Could not initialize proxy [...] - no session]].

الحلول الصح: حمّل اللي محتاجه جوه الـ transaction (fetch join أو [[@EntityGraph]])، وحوّل لـ DTO جوه الـ service. الحلول الغلط: EAGER، أو [[open-in-view: true]]، أو [[hibernate.enable_lazy_load_no_trans]].`,
          example: R`// برّه أي transaction (مثلًا في controller مع open-in-view: false):
Task t = tasks.findById(1L).orElseThrow();
t.getProject().getClass().getSimpleName();
t.getProject().getName();
// الصح: جوه service بـ @Transactional(readOnly = true)، أو query بيجيب العلاقة:
@Query("select t from Task t join fetch t.project where t.done = false")
List<Task> findOpenWithProject();
// وبعدين DTO جوه الـ transaction:
// return tasks.findOpenWithProject().stream().map(TaskResponse::from).toList();`,
          try: R`في المشروع، شيل [[@Transactional(readOnly = true)]] من [[open()]] وغيّر الـ query لـ [[findByDoneFalse()]] (من غير fetch join): الـ endpoint رجّع إيه؟ وبعدين خلي [[spring.jpa.open-in-view: true]]: اشتغل؟ وليه ده مش الحل؟`,
          flag: "script",
          deep: {
            why: R`أشهر exception في مشاريع JPA، وسؤال انترفيو ثابت. والطريقة اللي بتصلّحها بيها بتوري إنك فاهم الـ transactions والـ lazy loading، ولا بتدوّر على أول إعداد يخفي المشكلة.`,
            how: R`[[findById]] من غير transaction خارجية بيفتح transaction قصيرة ويقفلها. الـ project بيرجع كـ proxy (subclass من Project اسمه زي [[Project$HibernateProxy]]) فيه الـ id بس. [[getClass()]] أو [[getId()]] مش محتاجين داتابيز، إنما [[getName()]] محتاج SELECT، ومفيش session: exception.

open-in-view (OSIV): Spring Boot افتراضيًا بيفتح session من أول الـ request لآخره (حتى بعد الـ transaction)، فالـ lazy loading بيشتغل في الـ controller و Jackson. ده بيخفي المشكلة، بس: كل lazy load برّه الـ service بيعمل query جديد (N+1 مخفي في الـ JSON)، والـ connection بتفضل ماسكة طول الـ request (حتى وهو بيكتب الـ response لعميل بطيء). عشان كده Boot بيطبع warning لو سبته افتراضي.

الترتيب الصح: الـ service بـ [[@Transactional(readOnly = true)]]، والـ query بيجيب اللي محتاجه (join fetch أو EntityGraph أو DTO projection)، والـ service بيرجّع DTOs، والـ controller عمره ما بيشوف entity.`,
            when: R`«إيه LazyInitializationException وإزاي تحلها؟»، و «open-in-view كويس ولا وحش؟»، و «LAZY ولا EAGER؟»، و «ليه متعملش return للـ entity من الـ controller؟».`,
            mistakes: R`تحط EAGER على العلاقة: المشكلة بتختفي هنا وبيظهر N+1 في كل حتة تانية. أو [[Hibernate.initialize()]] في كل مكان. أو [[enable_lazy_load_no_trans=true]]: كل lazy load بيفتح transaction لوحده (أسوأ من N+1). أو «ضيف @Transactional على الـ controller».`
          },
          teach: R`## الكود ده بيعمل إيه؟

أول ٣ سطور بيعملوا الـ exception بالقصد: يجيبوا task برّه أي transaction، ويلمسوا المشروع بتاعها (علاقة LAZY). وآخر سطرين الحل: query بيجيب المشروع مع الـ task في نفس الـ SELECT، فمفيش حاجة تتحمّل بعدين.

اتجرّب مرتين: مرة في تست ([[PitfallsTest]] بـ [[@SpringBootTest]] و Testcontainers)، ومرة في التطبيق الحقيقي وهو شغال في Docker (التجربة تحت).

---

## ١. [[tasks.findById(1L).orElseThrow()]]

~~~text السطر
Task t = tasks.findById(1L).orElseThrow();
~~~

- مفيش transaction برّه ([[open-in-view: false]] والـ controller مش [[@Transactional]])، فـ Spring Data بيفتح transaction صغيرة حوالين [[findById]] بس، يجيب الـ task، ويقفلها. ومعاها بتتقفل الـ **session** (الـ persistence context اللي بيعرف يحمّل من الداتابيز).
- الـ SQL اللي خرج جاب الـ task بس، ومعاها [[project_id]]:

~~~text الـ SQL
select t1_0.id,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.id=?
~~~

- [[t.project]] مش null: Hibernate حط مكانه **proxy** فيه الـ id بس ([[1]]).

---

## ٢. [[t.getProject().getClass().getSimpleName()]]

~~~text الناتج
Project$HibernateProxy
~~~

- [[getClass()]]: النوع الحقيقي للـ object، و [[getSimpleName()]] اسمه من غير الـ package.
- [[Project$HibernateProxy]]: subclass من [[Project]] Hibernate عمله وقت التشغيل. الـ [[$]] في الاسم علامة إنه class متولّد.
- [[getClass()]] و [[getId()]] مش محتاجين داتابيز (الـ id موجود في الـ proxy)، فمفيش exception لحد هنا.

---

## ٣. [[t.getProject().getName()]]

[[getName()]] محتاج الصف من جدول [[project]]. الـ proxy بيحاول يحمّل، ملقاش session مفتوحة:

~~~text الناتج
org.hibernate.LazyInitializationException: Could not initialize proxy [com.example.tasks.Project#1] - no session
~~~

| الحتة | معناها |
|---|---|
| [[Could not initialize proxy]] | معرفتش أملا الـ proxy بالداتا |
| [[com.example.tasks.Project#1]] | الـ entity والـ id |
| [[- no session]] | السبب: مفيش session مفتوحة |

---

## ٤. الحل: [[join fetch]]

~~~text السطور
@Query("select t from Task t join fetch t.project where t.done = false")
List<Task> findOpenWithProject();
~~~

- [[@Query("...")]]: JPQL مكتوب بإيدك بدل ما Spring Data يولّده من الاسم. JPQL بيتكلم بأسامي الـ entities والحقول ([[Task]] و [[t.project]])، مش الجداول.
- [[join fetch t.project]]: «اعمل JOIN مع المشروع **وحمّله** في نفس الـ query». من غير [[fetch]] الـ JOIN بيتعمل للـ WHERE بس، والمشروع يفضل proxy.
- [[where t.done = false]]: المهام المفتوحة بس.

والسطر الأخير:

~~~text السطر
return tasks.findOpenWithProject().stream().map(TaskResponse::from).toList();
~~~

- ده جوه [[TaskService.open()]] اللي عليه [[@Transactional(readOnly = true)]]: الـ session مفتوحة طول الـ method.
- [[map(TaskResponse::from)]]: [[::]] method reference، يعني [[t -> TaskResponse.from(t)]]. بيحوّل كل entity لـ DTO **جوه** الـ transaction، و [[from]] بيقرا [[getProject().getName()]] وهو محمّل أصلًا.
- [[.toList()]]: list ثابتة. والـ controller بياخد DTOs بس، عمره ما بيلمس entity.

~~~text الـ SQL (query واحد)
select t1_0.id,t1_0.done,t1_0.project_id,p1_0.id,p1_0.name,t1_0.title from task t1_0 join project p1_0 on p1_0.id=t1_0.project_id where t1_0.done=false
~~~

---

## ٥. التجربة: شلنا الحل

شلنا [[@Transactional(readOnly = true)]] من [[open()]] وخليناها [[tasks.findByDoneFalse()]] (من غير fetch join)، وشغّلنا التطبيق في Docker و [[curl]] على [[/api/tasks]] بـ token:

~~~text الناتج
{"timestamp":"2026-10-07T18:07:17.370Z","status":500,"error":"Internal Server Error","path":"/api/tasks"}  [500]
~~~

~~~text من اللوج
DEBUG org.hibernate.SQL : select t1_0.id,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.done=false
ERROR ... threw exception [Request processing failed: org.hibernate.LazyInitializationException: Could not initialize proxy [com.example.tasks.Project#1] - no session] ...
~~~

وبعدين نفس الكود مع [[--spring.jpa.open-in-view=true]]:

~~~text الناتج
[{"id":1,"title":"Write docs","done":false,"project":"Website"},{"id":2,...  [200]
~~~

~~~text من اللوج
select t1_0.id,t1_0.done,t1_0.project_id,t1_0.title from task t1_0 where t1_0.done=false
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
select p1_0.id,p1_0.name from project p1_0 where p1_0.id=?
~~~

اشتغل، بس بـ ٤ queries بدل واحد: ١ للمهام + ١ لكل مشروع مختلف (٣ مشاريع؛ الـ ٩ مهام بيتشاركوهم، و Hibernate مش بيحمّل نفس المشروع مرتين في نفس الـ session). ده N+1 مستخبي، والـ connection فضلت محجوزة لحد ما الـ JSON اتكتب.

---

## الخلاصة

| الحل | الحكم |
|---|---|
| [[join fetch]] أو [[@EntityGraph]] + [[@Transactional(readOnly = true)]] + DTO | الصح |
| [[open-in-view: true]] | بيخفي المشكلة، و N+1 والـ connection محجوزة |
| [[FetchType.EAGER]] | بيحمّل العلاقة في كل حتة حتى لو مش محتاجها |
| [[enable_lazy_load_no_trans]] | transaction جديدة لكل lazy load |

- LAZY = proxy فاضي بيتحمّل أول ما تلمسه، **بشرط** إن الـ session مفتوحة.
- حمّل اللي محتاجه في الـ query، وحوّل لـ DTO جوه الـ service.`,
          lines: [
            R`[[findById]] بـ transaction قصيرة خلصت.`,
            R`[[Project$HibernateProxy]]: proxy، ولسه متحمّلش.`,
            R`هنا الـ exception: [[Could not initialize proxy [com.example.tasks.Project#1] - no session]].`,
            "query بيجيب المشروع مع المهام.",
            "النتيجة جاهزة ومفيش lazy."
          ],
          sol: R`من غير transaction ومن غير fetch join: [[500]]، واللوج فيه [[LazyInitializationException: Could not initialize proxy [com.example.tasks.Project#1] - no session]] من [[TaskResponse.from]] وهو بيقرا [[getProject().getName()]]. ده بالظبط اللي التست في درس Testcontainers بيثبته (عدّى معانا، والـ class كان [[Project$HibernateProxy]]).

مع [[open-in-view: true]]: بيشتغل، بس لو فيه ١٠٠ task هتلاقي في اللوج ١٠١ query (أو أقل بحسب عدد المشاريع المختلفة، لأن Hibernate بيكاش اللي اتحمّل): الـ N+1 رجع وبقى مخفي، والـ connection محجوزة طول الـ request. الحل الصح: رجّع [[@Transactional(readOnly = true)]] و [[findOpenWithProject()]] بالـ fetch join: query واحد ومفيش exception.`
        }
      ]
    }
]);
