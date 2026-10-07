// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
    {
      t: "Generics والـ Collections",
      l: 1,
      n: "List و Map و Set، والـ generics بقيودها، والترتيب بـ Comparator",
      items: [
        {
          cmd: "List و Map و Set",
          title: "الـ arrays والـ objects بتوع JS: إيه اللي يقابلهم في Java؟",
          desc: R`[[List]] زي الـ array في JS (بترتيب، وبتكبر)، والتنفيذ المعتاد [[ArrayList]]. و [[Map]] زي [[Map]] في JS (مفتاح وقيمة)، والتنفيذ المعتاد [[HashMap]]، و [[TreeMap]] لو عايز المفاتيح مرتبة. و [[Set]] زي [[Set]] في JS، و [[HashSet]] أشهرها.

المتغير نوعه الـ interface ([[List<String>]])، والقيمة التنفيذ ([[new ArrayList<>()]]). و [[List.of(...)]] و [[Map.of(...)]] بيعملوا collections ثابتة متتعدلش: أي [[add]] عليها بيرمي exception وقت التشغيل.`,
          example: R`void main() {
    List<String> tags = new ArrayList<>(List.of("java", "spring"));
    tags.add("jpa");
    Map<String, Integer> stock = new HashMap<>();
    stock.put("pen", 10);
    stock.merge("pen", 5, Integer::sum);
    stock.putIfAbsent("book", 1);
    Set<String> seen = new HashSet<>(List.of("a", "b", "a"));
    IO.println(tags + " " + tags.get(0) + " " + tags.size());
    IO.println(stock.get("pen") + " " + stock.getOrDefault("cup", 0));
    IO.println(seen.size() + " " + seen.contains("a"));
    for (var e : new TreeMap<>(stock).entrySet()) IO.println(e.getKey() + "=" + e.getValue());
    List<String> fixed = List.of("x", "y");
    fixed.add("z");
}`,
          try: R`اكتب method [[wordCount(String text)]] بترجع [[Map<String, Integer>]] بعدد كل كلمة (من غير حالة الحروف). جرّبها على [["the cat and The dog and THE end"]]. ولو اتنين كلمات عددهم زي بعض، ترتيبهم في الناتج مضمون؟`,
          flag: "script",
          deep: {
            why: R`كل كود backend فيه ليستات ومابات: نتايج queries، وتجميع، وعدّ، وإزالة تكرار. واختيار النوع الصح (List ولا Set، و HashMap ولا TreeMap) بيفرق في السرعة والصحة، وبيتسأل في الانترفيو.`,
            how: R`[[ArrayList]] array جوه بيكبر لوحده: [[get(i)]] سريع O(1)، والإضافة في الآخر O(1) في المتوسط، والإضافة أو المسح من النص O(n). وفيه [[LinkedList]] بس نادرًا ما بتكون أحسن.

[[HashMap]] بيحسب [[hashCode]] للمفتاح ويحطه في bucket: [[get]] و [[put]] O(1) في المتوسط، ومفيش ترتيب مضمون (درس HashMap من جوه في الانترفيو). [[LinkedHashMap]] بيحافظ على ترتيب الإضافة (زي Map في JS)، و [[TreeMap]] بيرتب بالمفتاح O(log n).

methods مفيدة: [[getOrDefault]]، و [[putIfAbsent]]، و [[merge(key, 1, Integer::sum)]] (أنضف طريقة للعدّ)، و [[computeIfAbsent(key, k -> new ArrayList<>())]] لتجميع قيم تحت مفتاح.

[[List.of]] و [[Map.of]] (Java 9+) immutable وكمان مبيقبلوش null. و [[Arrays.asList]] القديمة حجمها ثابت بس [[set]] شغالة: متلخبطش بينهم.`,
            when: R`List لأي ليستة مرتبة. Set لما التكرار ممنوع أو محتاج [[contains]] سريع. Map للبحث بمفتاح والتجميع. [[List.of]] للثوابت ولما ترجع list من method ومش عايز حد يعدّل.`,
            mistakes: R`[[List.of(...)]] وبعدين [[add]]: [[UnsupportedOperationException]] وقت التشغيل مش compile. وتعتمد على ترتيب [[HashMap]] في تست فيعدّي عندك ويقع في CI. وتعدّل list وانت بتلف عليها بـ for-each: [[ConcurrentModificationException]] (استخدم [[removeIf]]). و [[map.get(k)]] بيرجع null لو مش موجود، فـ [[int n = map.get(k);]] ممكن يعمل NullPointerException.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل التلات أنواع الأساسية: [[List]] فيها tags، و [[Map]] فيها مخزون، و [[Set]] بتشيل التكرار. وبعدين يطبع منهم، ويلف على الـ map مرتبة، وفي الآخر يحاول يضيف عنصر لـ list ثابتة فيقع. الكود ده ملف واحد اتشغّل بـ [[java Main.java]] في الـ image [[maven:3.9-eclipse-temurin-25]] (JDK 25.0.4)، وده كل الناتج:

~~~text الناتج
[java, spring, jpa] java 3
15 0
2 true
book=1
pen=15
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.ImmutableCollections.uoe(ImmutableCollections.java:159)
	at java.base/java.util.ImmutableCollections$AbstractImmutableCollection.add(ImmutableCollections.java:164)
	at Main.main(Main.java:14)
~~~

> [[void main()]] من غير class ولا [[import]]: ده الـ compact source file بتاع Java 25 (درس jshell و JDK في أول التاب). الملف ده بيعمل import لكل [[java.base]] لوحده، فـ [[List]] و [[HashMap]] و [[TreeMap]] جاهزين.

---

## ١. الـ List

~~~java
    List<String> tags = new ArrayList<>(List.of("java", "spring"));
    tags.add("jpa");
~~~

نفكه من جوه لبرة:

- [[List.of("java", "spring")]]: بيعمل list فيها عنصرين، بس **ثابتة** (immutable): مينفعش تضيف فيها ولا تمسح.
- [[new ArrayList<>(...)]]: بيعمل [[ArrayList]] جديدة وينسخ فيها العناصر دي. دي بقى تتعدّل عادي. فالسطر ده الطريقة المعتادة لـ «list بقيم أولية وتتعدّل».
- [[<>]] اسمها diamond: الـ compiler بيبص على الشمال ([[List<String>]]) ويفهم إن النوع [[String]]، فمش محتاج تكتب [[new ArrayList<String>]].
- [[List<String> tags]]: نوع المتغير هو الـ interface ([[List]])، والقيمة هي التنفيذ ([[ArrayList]]). كده لو غيّرت التنفيذ بعدين، باقي الكود ميتأثرش.
- [[<String>]]: الـ generic. الـ list دي فيها Strings بس، ولو حاولت تحط رقم الـ compiler هيرفض.
- [[tags.add("jpa")]]: زي [[push]] في JS، بيضيف في الآخر.

---

## ٢. الـ Map: put و merge و putIfAbsent

~~~java
    Map<String, Integer> stock = new HashMap<>();
    stock.put("pen", 10);
    stock.merge("pen", 5, Integer::sum);
    stock.putIfAbsent("book", 1);
~~~

- [[Map<String, Integer>]]: المفتاح String والقيمة Integer. ليه [[Integer]] مش [[int]]؟ لأن الـ generics بتقبل objects بس، فبنستخدم الـ wrapper (درس primitives و wrappers).
- [[put("pen", 10)]]: حط القيمة 10 تحت المفتاح [["pen"]]. زي [[map.set]] في JS.
- [[merge("pen", 5, Integer::sum)]]: لو المفتاح **مش موجود** حط 5، ولو **موجود** نادي الدالة على القيمة القديمة والجديدة: [[Integer.sum(10, 5)]] = 15. و [[Integer::sum]] ده method reference، يعني «الدالة [[sum]] اللي في [[Integer]]» (درس lambdas). ده أنضف شكل للعدّ: جرّبنا [[m.merge("x", 1, Integer::sum)]] مرتين على map فاضية فرجعت [[1]] وبعدين [[2]].
- [[putIfAbsent("book", 1)]]: حط بس لو المفتاح مش موجود. [["book"]] مش موجود، فاتحط.

---

## ٣. الـ Set

~~~java
    Set<String> seen = new HashSet<>(List.of("a", "b", "a"));
~~~

الـ list فيها [["a"]] مرتين، و [[HashSet]] مبيقبلش تكرار، فبيفضل فيه [[a]] و [[b]] بس.

---

## ٤. الطباعة سطر سطر

~~~java
    IO.println(tags + " " + tags.get(0) + " " + tags.size());
~~~

~~~text الناتج
[java, spring, jpa] java 3
~~~

- [[IO.println]]: الطباعة في Java 25 (زي [[console.log]]).
- [[tags + " "]]: لما تجمع object مع String، Java بتنادي [[toString()]]، والـ collections بتطبع نفسها بشكل مقروء بين أقواس مربعة.
- [[get(0)]]: العنصر رقم صفر، زي [[tags.at(0)]] في JS. و [[size()]] زي [[length]].

~~~java
    IO.println(stock.get("pen") + " " + stock.getOrDefault("cup", 0));
~~~

~~~text الناتج
15 0
~~~

- [[get("pen")]]: [[15]] بعد الـ merge.
- [[getOrDefault("cup", 0)]]: [["cup"]] مش موجود، فبدل null رجّع 0.

ليه ده مهم؟ [[stock.get("cup")]] لوحدها بترجع [[null]]. ولو حطيتها في [[int]] البرنامج بيقع. جرّبنا [[int n = stock.get("cup");]]:

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because the return value of "java.util.Map.get(Object)" is null
~~~

Java حاولت تحوّل [[Integer]] لـ [[int]] (unboxing) بإنها تنادي [[intValue()]] على null.

~~~java
    IO.println(seen.size() + " " + seen.contains("a"));
~~~

~~~text الناتج
2 true
~~~

[[contains]] في الـ Set سريعة جدًا (O(1) في المتوسط)، عكس [[contains]] في الـ List اللي بتلف على العناصر كلها.

---

## ٥. اللف على Map مرتبة

~~~java
    for (var e : new TreeMap<>(stock).entrySet()) IO.println(e.getKey() + "=" + e.getValue());
~~~

من جوه لبرة:

1. [[new TreeMap<>(stock)]]: نسخة من الـ map بس **مرتبة بالمفتاح**.
2. [[.entrySet()]]: كل الأزواج (مفتاح وقيمة)، زي [[Object.entries]] في JS.
3. [[for (var e : ...)]]: الـ for-each بتاع Java، زي [[for...of]]. و [[var]] خلّى الـ compiler يستنتج نوع [[e]] (هو [[Map.Entry<String, Integer>]]).
4. [[e.getKey()]] و [[e.getValue()]]: المفتاح والقيمة.

~~~text الناتج
book=1
pen=15
~~~

[["book"]] قبل [["pen"]] أبجديًا. لو طبعت الـ [[HashMap]] نفسها هنا طلعت [[{book=1, pen=15}]] بالصدفة، بس ده مش مضمون: الـ HashMap مبيوعدش بأي ترتيب.

---

## ٦. الـ list الثابتة بتقع وقت التشغيل

~~~java
    List<String> fixed = List.of("x", "y");
    fixed.add("z");
~~~

الكود ده بيعدّي الـ compile عادي، لأن [[List]] فيها [[add]]. بس الـ object اللي رجع من [[List.of]] بيرفض:

~~~text الناتج
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.ImmutableCollections.uoe(ImmutableCollections.java:159)
	at java.base/java.util.ImmutableCollections$AbstractImmutableCollection.add(ImmutableCollections.java:164)
	at Main.main(Main.java:14)
~~~

نقرا الـ stack trace من تحت لفوق: [[Main.java:14]] هو سطر [[fixed.add]] في كودنا، وفوقه الـ [[add]] جوه [[ImmutableCollections]] (الـ class اللي [[List.of]] بيرجعه)، وهي اللي رمت [[UnsupportedOperationException]] ومن غير رسالة.

---

## ٧. الحل: [[wordCount]]

~~~java
static Map<String, Integer> wordCount(String text) {
    Map<String, Integer> counts = new TreeMap<>();
    for (String w : text.toLowerCase().split("\\s+")) {
        counts.merge(w, 1, Integer::sum);
    }
    return counts;
}
~~~

- [[static]]: الـ method مش محتاجة object عشان تتنادى.
- [[text.toLowerCase()]]: كل الحروف صغيرة، فـ [[The]] و [[THE]] و [[the]] نفس الكلمة.
- [[split("\\s+")]]: بيقسم بـ regex. [[\s]] يعني أي مسافة (space أو tab أو سطر جديد)، و [[+]] يعني واحدة أو أكتر. والـ [[\\]] لأن الـ backslash جوه String في Java لازم يتكتب مرتين.
- [[counts.merge(w, 1, Integer::sum)]]: أول مرة الكلمة تظهر قيمتها 1، وبعد كده بتزيد 1.
- [[TreeMap]]: عشان الناتج يطلع مرتب.

~~~text الناتج
{and=2, cat=1, dog=1, end=1, the=3}
~~~

---

## الخلاصة

| محتاج | استخدم | زي في JS |
|---|---|---|
| ليستة مرتبة بتتعدّل | [[new ArrayList<>()]] | array |
| ليستة ثابتة | [[List.of(...)]] | [[Object.freeze([...])]] |
| مفتاح وقيمة | [[new HashMap<>()]] | [[new Map()]] |
| مفاتيح مرتبة | [[new TreeMap<>()]] | مفيش، بتعمل sort |
| ترتيب الإضافة | [[new LinkedHashMap<>()]] | [[Map]] العادي |
| من غير تكرار | [[new HashSet<>()]] | [[new Set()]] |

- [[List.of]] و [[Map.of]] ثابتين، والغلطة بتظهر وقت التشغيل مش الـ compile.
- [[map.get]] بترجع null لو المفتاح مش موجود: [[getOrDefault]] أأمن.
- للعدّ: [[merge(key, 1, Integer::sum)]].`,
          lines: [
            "main.",
            R`list تتعدّل، بادئة بقيمتين. النوع الـ interface والقيمة ArrayList.`,
            R`[[add]] زي [[push]].`,
            R`map من String لـ Integer (مش int: الـ generics محتاجة objects).`,
            R`[[put]] زي [[set]] في JS.`,
            R`[[merge]]: لو المفتاح موجود اجمع ٥ على القديم. [[15]].`,
            "حط قيمة لو المفتاح مش موجود بس.",
            R`set من list فيها تكرار: [[a]] و [[b]] بس.`,
            R`[[[java, spring, jpa] java 3]]: الـ toString بتاع الـ collections مقروء.`,
            R`[[15 0]]: [[getOrDefault]] بدل null.`,
            R`[[2 true]].`,
            R`[[TreeMap]] بيرتب المفاتيح، و [[entrySet]] زي [[Object.entries]]: [[book=1]] وبعدين [[pen=15]].`,
            R`list ثابتة.`,
            R`[[UnsupportedOperationException]] وقت التشغيل.`,
            "قفلة."
          ],
          sol: R`الحل تحت: بيطبع [[{and=2, cat=1, dog=1, end=1, the=3}]] مرتب لأننا استخدمنا [[TreeMap]].

لو استخدمت [[HashMap]] الترتيب مش مضمون: ممكن يطلع بأي شكل، وممكن يتغير بين إصدارات Java أو لو الحجم اتغير. لو محتاج ترتيب الإضافة استخدم [[LinkedHashMap]]، ولو مرتب أبجديًا [[TreeMap]]، ولو مرتب بالعدد لازم تعمل sort للـ entries (درس Comparator). و [[split("\\s+")]] بيقسم على أي مسافات حتى لو أكتر من واحدة.`,
          solCode: R`static Map<String, Integer> wordCount(String text) {
    Map<String, Integer> counts = new TreeMap<>();
    for (String w : text.toLowerCase().split("\\s+")) {
        counts.merge(w, 1, Integer::sum);
    }
    return counts;
}

void main() {
    IO.println(wordCount("the cat and The dog and THE end"));
}`
        },
        {
          cmd: "generics",
          title: "class و method بيشتغلوا مع أي نوع، ومن غير ما تخسر الفحص",
          desc: R`نفس فكرة الـ generics في TS: [[record Page<T>(List<T> items, ...)]] صفحة من أي حاجة، و [[<T extends Comparable<T>> T max(List<T> list)]] method بتشتغل مع أي نوع ينفع يتقارن (زي [[T extends ...]] في TS).

والجديد عليك: الـ wildcards. [[List<? extends Number>]] يعني «list من أي نوع أرقام» (Integer أو Double...)، لأن في Java [[List<Integer>]] مش [[List<Number>]] حتى لو Integer هو Number. والأنواع دي بتتمسح وقت التشغيل (type erasure)، زي TS بس للـ generics بس.`,
          example: R`record Page<T>(List<T> items, int page, long total) {
    <R> Page<R> map(java.util.function.Function<T, R> fn) {
        return new Page<>(items.stream().map(fn).toList(), page, total);
    }
}

static <T extends Comparable<T>> T max(List<T> list) {
    T best = list.get(0);
    for (T x : list) if (x.compareTo(best) > 0) best = x;
    return best;
}

static double sum(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}

void main() {
    Page<Integer> ids = new Page<>(List.of(1, 2, 3), 1, 3);
    Page<String> labels = ids.map(id -> "task-" + id);
    IO.println(labels);
    IO.println(max(List.of(3, 9, 4)) + " " + max(List.of("b", "z", "a")));
    IO.println(sum(List.of(1, 2.5, 3L)));
    List<String> a = new ArrayList<>();
    List<Integer> b = new ArrayList<>();
    IO.println(a.getClass() == b.getClass());
}`,
          try: R`جرّب [[max(List.of(new Object()))]] واقرا الخطأ. وبعدين غيّر [[sum(List<? extends Number> nums)]] لـ [[sum(List<Number> nums)]] وجرّب تبعتلها [[List<Integer>]] متعرّفة في متغير: [[List<Integer> ints = List.of(1, 2); sum(ints);]].`,
          flag: "script",
          deep: {
            why: R`كل الـ collections و Spring Data ([[JpaRepository<Task, Long>]]) و [[ResponseEntity<T>]] و [[Optional<T>]] generics. لازم تقرا signatures زي [[<S extends T> S save(S entity)]] من غير ما تتخض، وتكتب helpers بسيطة زي [[Page<T>]] و [[ApiResponse<T>]].`,
            how: R`الـ generics بتتفحص وقت الـ compile، وبعدين بتتمسح: [[List<String>]] و [[List<Integer>]] وقت التشغيل الاتنين [[ArrayList]] بس (عشان كده آخر سطر [[true]]). النتايج: مينفعش [[new T()]]، ولا [[instanceof List<String>]]، ولا [[List<int>]] (primitives مش مسموحة، لازم wrapper).

الـ invariance: [[List<Integer>]] مش subtype من [[List<Number>]]. لو كانت، كنت هتقدر تعمل [[numbers.add(2.5)]] على list أصلها Integer. عشان كده الـ wildcards:
[[? extends Number]]: تقرا منها كـ Number، بس متقدرش تضيف (producer).
[[? super Integer]]: تضيف فيها Integer، بس لما تقرا بتاخد Object (consumer).
القاعدة اللي بتتحفظ: PECS، Producer Extends Consumer Super.

و [[<>]] (diamond) بيخلي الـ compiler يستنتج النوع من الشمال: [[new ArrayList<>()]].`,
            when: R`استخدمها في كل الـ collections. واكتبها لما عندك كود بيتكرر لكذا نوع (wrapper لـ response، أو result، أو صفحة). ومتعقدهاش: لو الـ signature محتاج ٣ wildcards عشان تفهمه، غالبًا في طريقة أبسط.`,
            mistakes: R`raw types: [[List list = new ArrayList();]] من غير [[<>]]: الـ compiler بيطلّع warning بس، والفحص كله راح، وده في كود قديم كتير. وتفتكر إن [[List<Object>]] بتاخد أي list: لأ، [[List<?>]] هي اللي بتاخد. و [[max(List<T>)]] مع list فاضية: [[IndexOutOfBoundsException]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

فيه ٣ حاجات generic: record اسمه [[Page<T>]] (صفحة من أي نوع) فيه method بتحوّل الصفحة لنوع تاني، و method اسمها [[max]] بتجيب أكبر عنصر من أي نوع ينفع يتقارن، و method اسمها [[sum]] بتجمع list من أي نوع أرقام. وفي الآخر سطر بيثبت إن الأنواع بتتمسح وقت التشغيل. اتشغّل بـ [[java Main.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25):

~~~text الناتج
Page[items=[task-1, task-2, task-3], page=1, total=3]
9 z
6.5
true
~~~

---

## ١. [[Page<T>]]: record بنوع متغير

~~~java
record Page<T>(List<T> items, int page, long total) {
~~~

- [[<T>]] بعد الاسم: **type parameter**. [[T]] اسم مؤقت لنوع هيتحدد لما حد يستخدم الـ record: [[Page<Integer>]] يبقى [[T]] = Integer، و [[Page<String>]] يبقى String.
- [[List<T> items]]: العناصر من النوع ده. والاسم [[T]] مجرد عرف (Type)، وفيه كمان [[R]] (Result) و [[E]] (Element) و [[K]] و [[V]] (Key و Value).

### الـ method اللي جواه

~~~java
    <R> Page<R> map(java.util.function.Function<T, R> fn) {
        return new Page<>(items.stream().map(fn).toList(), page, total);
    }
~~~

نقراها من الشمال:

| الحتة | معناها |
|---|---|
| [[<R>]] | الـ method دي ليها نوع جديد خاص بيها اسمه R (نوع الناتج) |
| [[Page<R>]] | بترجع صفحة من النوع الجديد |
| [[Function<T, R> fn]] | بتاخد دالة بتحوّل T لـ R (درس lambdas). اسمها الكامل [[java.util.function.Function]] |
| [[items.stream().map(fn).toList()]] | طبّق الدالة على كل عنصر واعمل list جديدة (درس streams) |
| [[new Page<>(..., page, total)]] | صفحة جديدة بنفس رقم الصفحة والإجمالي. الـ [[<>]] استنتج [[Page<R>]] من نوع الرجوع |

---

## ٢. [[max]]: نوع بقيد

~~~java
static <T extends Comparable<T>> T max(List<T> list) {
    T best = list.get(0);
    for (T x : list) if (x.compareTo(best) > 0) best = x;
    return best;
}
~~~

- [[<T extends Comparable<T>>]]: T أي نوع، **بشرط** يكون بيعرف يقارن نفسه بنفسه. [[Comparable<T>]] interface فيه method واحدة [[compareTo]]، و [[Integer]] و [[String]] و [[LocalDate]] بينفذوه. وكلمة [[extends]] هنا معناها «من نوع» حتى لو Comparable interface.
- [[T best = list.get(0)]]: نبدأ بأول عنصر.
- [[x.compareTo(best) > 0]]: [[compareTo]] بترجع رقم موجب لو [[x]] أكبر، وصفر لو متساويين، وسالب لو أصغر. فلو [[x]] أكبر نحفظه.
- نوع الرجوع [[T]]: لو بعتّ Integers هترجع Integer، من غير أي cast.

~~~java
    IO.println(max(List.of(3, 9, 4)) + " " + max(List.of("b", "z", "a")));
~~~

~~~text الناتج
9 z
~~~

نفس الـ method اشتغلت مع أرقام ومع Strings (الـ Strings بتتقارن أبجديًا، فـ [["z"]] الأكبر).

### لو النوع مبيعرفش يقارن؟

جرّبنا [[max(List.of(new Object()))]]:

~~~text الناتج
Main.java:7: error: method max in class Main cannot be applied to given types;
    IO.println(max(List.of(new Object())));
               ^
  required: List<T>
  found:    List<Object>
  reason: inference variable E has incompatible bounds
    upper bounds: Comparable<T>,Object
    lower bounds: Object
~~~

- [[required: List<T>]] و [[found: List<Object>]]: الـ method عايزة list من نوع Comparable، وانت بعت list من Object.
- [[inference variable E]]: [[E]] هو الـ type parameter بتاع [[List.of]]. الـ compiler حاول يلاقي نوع واحد يرضي الشرطين (Comparable و Object) وملقاش.
- الخلاصة: الغلطة اتمسكت **وقت الـ compile**، قبل ما البرنامج يشتغل. ده كل فايدة الـ generics.

---

## ٣. [[sum]]: الـ wildcard

~~~java
static double sum(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}
~~~

- [[?]] اسمها **wildcard**: «نوع معيّن مش هيهمني اسمه».
- [[? extends Number]]: أي نوع تحت [[Number]]، يعني [[Integer]] أو [[Double]] أو [[Long]]...
- [[n.doubleValue()]]: كل [[Number]] فيه الـ method دي، بتحوّله لـ double.

~~~java
    IO.println(sum(List.of(1, 2.5, 3L)));
~~~

~~~text الناتج
6.5
~~~

[[1]] Integer و [[2.5]] Double و [[3L]] Long ([[L]] في الآخر يعني long). المجموع 6.5.

### ليه مش [[List<Number>]] على طول؟

في Java، [[List<Integer>]] **مش** نوع من [[List<Number>]]، حتى لو Integer نوع من Number. ده اسمه invariance. غيّرنا الـ signature لـ [[sum(List<Number> nums)]] وبعتنا [[List<Integer> ints = List.of(1, 2);]]:

~~~text الناتج
Main.java:8: error: method sum in class Main cannot be applied to given types;
    IO.println(sum(ints));
               ^
  required: List<Number>
  found:    List<Integer>
  reason: argument mismatch; List<Integer> cannot be converted to List<Number>
~~~

ليه Java بتمنع ده؟ لو كان مسموح، الـ method كانت هتقدر تعمل [[nums.add(2.5)]] وتحط Double جوه list أصلها Integer. ومع [[? extends Number]] الإضافة نفسها ممنوعة. جرّبنا [[nums.add(2.5)]] على [[List<? extends Number>]]:

~~~text الناتج
Main.java:3: error: no suitable method found for add(double)
    nums.add(2.5);
        ^
    method List.add(CAP#1) is not applicable
      (argument mismatch; double cannot be converted to CAP#1)
~~~

[[CAP#1]] هو الاسم اللي الـ compiler اداه للنوع المجهول ورا الـ [[?]] (capture). هو عارف إنه «حاجة تحت Number»، بس مش عارف هي إيه بالظبط، فمش هيسمح تحط فيه Double. فالقاعدة: [[? extends]] للقراية بس.

---

## ٤. main

~~~java
    Page<Integer> ids = new Page<>(List.of(1, 2, 3), 1, 3);
    Page<String> labels = ids.map(id -> "task-" + id);
    IO.println(labels);
~~~

- [[ids]] صفحة أرقام. [[ids.map(id -> "task-" + id)]] بتاخد كل رقم وترجع String، فالـ compiler استنتج [[R]] = String، والنتيجة [[Page<String>]].
- لو كتبت [[Page<Integer> labels = ids.map(...)]] كان هيرفض، لأن الدالة بترجع String.

~~~text الناتج
Page[items=[task-1, task-2, task-3], page=1, total=3]
~~~

### الـ type erasure

~~~java
    List<String> a = new ArrayList<>();
    List<Integer> b = new ArrayList<>();
    IO.println(a.getClass() == b.getClass());
~~~

~~~text الناتج
true
~~~

[[getClass()]] بيرجع الـ class الحقيقي وقت التشغيل. الاتنين [[ArrayList]] بس، لأن الـ [[<String>]] و [[<Integer>]] اتفحصوا وقت الـ compile واتمسحوا. عشان كده مينفعش تكتب [[new T()]] ولا [[instanceof List<String>]].

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[class Box<T>]] أو [[record Page<T>]] | نوع بيشتغل مع أي T |
| [[<R> R convert(...)]] | method ليها نوع خاص بيها |
| [[<T extends Comparable<T>>]] | أي T بشرط يعرف يتقارن |
| [[List<? extends Number>]] | تقرا منها كـ Number، ومتضيفش |
| [[List<? super Integer>]] | تضيف فيها Integer |
| [[<>]] | الـ compiler يستنتج النوع |

- [[List<Integer>]] مش [[List<Number>]]. الـ wildcard هو الحل.
- الفحص كله وقت الـ compile، ووقت التشغيل الأنواع ممسوحة.`,
          lines: [
            R`record generic: [[T]] نوع العناصر.`,
            R`method generic جواه: [[<R>]] نوع جديد، و [[Function<T, R>]] دالة من T لـ R.`,
            R`[[stream().map(fn).toList()]] (درس streams)، والـ diamond [[<>]] استنتج [[Page<R>]].`,
            "قفلة.",
            "قفلة الـ record.",
            R`[[T extends Comparable<T>]]: أي نوع يعرف يقارن نفسه (String و Integer و LocalDate...).`,
            "أول عنصر.",
            R`[[compareTo]] بترجع موجب لو الأول أكبر.`,
            "النتيجة من نفس النوع T.",
            "قفلة.",
            R`wildcard: list من Integer أو Double أو Long، أي نوع تحت Number.`,
            "المجموع.",
            R`كل عنصر Number فيه [[doubleValue()]].`,
            "رجوع.",
            "قفلة.",
            "main.",
            "صفحة أرقام.",
            R`[[map]] حوّلتها لصفحة strings، والنوع اتفحص.`,
            R`[[Page[items=[task-1, task-2, task-3], page=1, total=3]]].`,
            R`نفس الـ method مع أرقام ومع strings: [[9 z]].`,
            R`Integer و Double و Long في list واحدة: [[6.5]].`,
            "list strings.",
            "list أرقام.",
            R`[[true]]: وقت التشغيل الاتنين ArrayList، والـ generic اتمسح.`,
            "قفلة."
          ],
          sol: R`[[max(List.of(new Object()))]]: خطأ compile [[method max ... cannot be applied to given types]] وتحته [[reason: inference variable E has incompatible bounds]] و [[upper bounds: Comparable<T>,Object]]. بالبلدي: T لازم يبقى Comparable، و Object مش Comparable. الـ constraint اشتغل: Object مبيعرفش يقارن نفسه.

ومع [[sum(List<Number> nums)]] و [[sum(ints)]]: [[method sum ... cannot be applied to given types]] وتحته [[reason: argument mismatch; List<Integer> cannot be converted to List<Number>]]. ده الـ invariance. لو كتبت [[sum(List.of(1, 2))]] مباشرة هيعدّي، لأن الـ compiler هيستنتج [[List<Number>]] للـ literal نفسه. رجّع [[? extends Number]] والاتنين يشتغلوا.`
        },
        {
          cmd: "Comparator",
          title: "ترتّب objects بأكتر من حقل، وتمسح من list وانت بتلف عليها",
          desc: R`[[Comparator.comparing(User::age)]] بيرتب بحقل، و [[.thenComparing(...)]] بحقل تاني لو الأول متساوي، و [[.reversed()]] أو [[Comparator.reverseOrder()]] للعكس. أنضف بكتير من [[(a, b) => a.age - b.age]] اللي بتكتبها في JS.

و [[list.sort(...)]] بيرتب في مكانه، و [[stream().sorted(...)]] بيرجع نسخة. وعشان تمسح عناصر بشرط: [[removeIf]]. أما [[remove]] جوه for-each فبيوقع البرنامج.`,
          example: R`record User(String name, int age, String city) {}

void main() {
    var users = new ArrayList<>(List.of(
        new User("Sara", 27, "Cairo"),
        new User("Omar", 22, "Alex"),
        new User("Mona", 27, "Alex")));
    users.sort(Comparator.comparingInt(User::age));
    IO.println(users.stream().map(User::name).toList());
    users.sort(Comparator.comparing(User::city).thenComparing(User::age, Comparator.reverseOrder()));
    IO.println(users.stream().map(User::name).toList());
    var adults = new ArrayList<>(users);
    adults.removeIf(u -> u.age() < 25);
    IO.println(adults.size());
    for (User u : users) if (u.age() > 25) users.remove(u);
}`,
          try: R`رتّب الـ users بالاسم من غير حالة الحروف ([[String.CASE_INSENSITIVE_ORDER]])، وبعدين بالسن تنازلي ولو متساويين بالاسم. وضيف user اسمه [[null]] وشوف إيه اللي بيحصل، وصلّحه بـ [[Comparator.nullsLast]].`,
          flag: "script",
          deep: {
            why: R`الترتيب في كل حتة: جداول، وليدربورد، وتقارير. والطرح [[a - b]] اللي متعود عليه من JS ممكن يعمل overflow مع أرقام كبيرة في Java. والمسح أثناء اللف من أشهر أخطاء المبتدئين.`,
            how: R`[[Comparator<T>]] functional interface فيه [[compare(a, b)]] بيرجع سالب أو صفر أو موجب. [[comparing(keyExtractor)]] بيبني واحد من دالة بتطلّع المفتاح، و [[comparingInt]] نفس الحكاية من غير boxing. و [[thenComparing]] بيتنادى بس لو الأول قال متساويين.

[[List.sort]] و [[Collections.sort]] stable: العناصر المتساوية بتحافظ على ترتيبها القديم. عشان كده في أول ترتيب، Sara فضلت قبل Mona (الاتنين ٢٧).

[[ConcurrentModificationException]]: الـ iterator بتاع ArrayList بيحفظ عدد التعديلات (modCount)، ولو الـ list اتغيرت من برّه الـ iterator بيرمي exception في الخطوة الجاية. الحلول: [[removeIf]]، أو [[Iterator.remove()]]، أو تبني list جديدة بـ stream و filter.`,
            when: R`[[Comparator.comparing]] في أي ترتيب. وفي JPA الأحسن الداتابيز ترتب ([[ORDER BY]] أو [[Sort.by("createdAt")]] في Spring Data) بدل ما تجيب كله وترتب في Java.`,
            mistakes: R`[[(a, b) -> a.getBalance() - b.getBalance()]] مع [[long]] كبيرة: overflow وترتيب غلط؛ استخدم [[Long.compare]] أو [[comparingLong]]. وتنسى إن [[reversed()]] في نص سلسلة بيعكس كل اللي قبله مش آخر حقل بس. و [[remove]] جوه for-each.`
          },
          teach: R`## البرنامج بيعمل إيه؟

عنده ٣ users، بيرتبهم مرة بالسن، ومرة بالمدينة وجوه المدينة بالسن من الكبير للصغير. وبعدين يمسح منهم بشرط بالطريقة الصح ([[removeIf]])، وفي الآخر يجرّب الطريقة الغلط (مسح جوه for-each) فيقع. اتشغّل بـ [[java Main.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25):

~~~text الناتج
[Omar, Sara, Mona]
[Mona, Omar, Sara]
2
Exception in thread "main" java.util.ConcurrentModificationException
	at java.base/java.util.ArrayList$Itr.checkForComodification(ArrayList.java:1096)
	at java.base/java.util.ArrayList$Itr.next(ArrayList.java:1050)
	at Main.main(Main.java:15)
~~~

---

## ١. الداتا

~~~java
record User(String name, int age, String city) {}

    var users = new ArrayList<>(List.of(
        new User("Sara", 27, "Cairo"),
        new User("Omar", 22, "Alex"),
        new User("Mona", 27, "Alex")));
~~~

- [[record User]]: class صغير فيه ٣ حقول، وليه accessors جاهزة: [[name()]] و [[age()]] و [[city()]] (درس records).
- [[new ArrayList<>(List.of(...))]]: list بتتعدّل، لأن [[sort]] بيرتب **جوه** الـ list نفسها، و [[List.of]] لوحده ثابت ومبيقبلش ترتيب.
- لاحظ إن سارة ومنى الاتنين ٢٧، وده مقصود عشان نشوف إيه اللي بيحصل للمتساويين.

---

## ٢. ترتيب بحقل واحد

~~~java
    users.sort(Comparator.comparingInt(User::age));
    IO.println(users.stream().map(User::name).toList());
~~~

### [[User::age]]

method reference: اختصار لـ [[u -> u.age()]]. يعني «هات السن من كل user».

### [[Comparator.comparingInt(...)]]

بيبني [[Comparator]] (حاجة بتقارن اتنين) من دالة بتطلّع رقم. الـ [[Int]] في الاسم معناه إن المفتاح [[int]]، فمفيش تحويل لـ Integer (boxing). ولو المفتاح String أو أي object تستخدم [[comparing]] من غير Int.

### [[users.sort(...)]]

بيرتب الـ list في مكانها. بعد كده بنطبع الأسماء بس: [[stream().map(User::name).toList()]] (درس streams).

~~~text الناتج
[Omar, Sara, Mona]
~~~

عمر (٢٢) الأول. وسارة قبل منى مع إن الاتنين ٢٧. ليه؟ لأن [[List.sort]] **stable**: لما عنصرين يتساووا، بيفضلوا بنفس ترتيبهم القديم، وسارة كانت قبل منى.

---

## ٣. ترتيب بحقلين، والتاني تنازلي

~~~java
    users.sort(Comparator.comparing(User::city).thenComparing(User::age, Comparator.reverseOrder()));
~~~

نفكه بالترتيب:

| الحتة | بتعمل إيه |
|---|---|
| [[Comparator.comparing(User::city)]] | رتّب بالمدينة أبجديًا: Alex قبل Cairo |
| [[.thenComparing(User::age, ...)]] | لو المدينة واحدة، رتّب بالسن |
| [[Comparator.reverseOrder()]] | بس السن بالعكس: الكبير الأول |

[[thenComparing]] بيتنادى بس لما الأول يقول «متساويين». فعمر ومنى (اسكندرية الاتنين) اترتبوا بالسن: منى ٢٧ قبل عمر ٢٢، وبعدين سارة لوحدها في القاهرة:

~~~text الناتج
[Mona, Omar, Sara]
~~~

---

## ٤. المسح بشرط: [[removeIf]]

~~~java
    var adults = new ArrayList<>(users);
    adults.removeIf(u -> u.age() < 25);
    IO.println(adults.size());
~~~

- [[new ArrayList<>(users)]]: نسخة، عشان منلمسش الأصل.
- [[removeIf(u -> u.age() < 25)]]: امسح كل user سنه أقل من ٢٥. الـ lambda بترجع true للي هيتمسح. زي [[filter]] في JS بس بالعكس، وبيعدّل الـ list نفسها.

~~~text الناتج
2
~~~

عمر (٢٢) اتمسح، وفضلت منى وسارة.

---

## ٥. الغلطة: [[remove]] جوه for-each

~~~java
    for (User u : users) if (u.age() > 25) users.remove(u);
~~~

~~~text الناتج
Exception in thread "main" java.util.ConcurrentModificationException
	at java.base/java.util.ArrayList$Itr.checkForComodification(ArrayList.java:1096)
	at java.base/java.util.ArrayList$Itr.next(ArrayList.java:1050)
	at Main.main(Main.java:15)
~~~

نقرا الـ stack trace:

- [[for (User u : users)]] من جوه بيستخدم **iterator** ([[ArrayList$Itr]]): object بيمشي على العناصر واحد واحد بـ [[next()]].
- الـ iterator ده حافظ عدد التعديلات اللي حصلت على الـ list (اسمه modCount). لما [[users.remove(u)]] مسحت منى، العدد اتغير.
- في اللفة الجاية [[next()]] نادت [[checkForComodification]]، لقت العدد مش زي ما كان، فرمت [[ConcurrentModificationException]]. الاسم معناه «الـ list اتعدّلت وانت بتلف عليها»، مش ليه علاقة بالـ threads هنا.

الحل: [[removeIf]] زي الخطوة اللي فاتت.

---

## ٦. الحل: ترتيب من غير حالة الحروف، و null

~~~java
    users.sort(Comparator.comparing(User::name, String.CASE_INSENSITIVE_ORDER));
~~~

[[comparing]] ليها شكل تاني بياخد باراميتر تاني: **comparator للمفتاح نفسه**. [[String.CASE_INSENSITIVE_ORDER]] comparator جاهز بيقارن من غير ما يفرق بين الحروف الكبيرة والصغيرة، فـ [["sara"]] بتترتب كأنها [["Sara"]].

~~~java
    users.sort(Comparator.comparingInt(User::age).reversed()
        .thenComparing(User::name, String.CASE_INSENSITIVE_ORDER));
~~~

- [[comparingInt(User::age).reversed()]]: بالسن، و [[reversed()]] بتعكس **كل** اللي قبلها في السلسلة. هنا قبلها السن بس، فالسن بقى تنازلي.
- [[.thenComparing(User::name, ...)]]: لو السن واحد، بالاسم.

لو نسيت [[nullsLast]] وفيه user اسمه null:

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot read field "value" because "s1" is null
	at java.base/java.lang.String$CaseInsensitiveComparator.compare(String.java:2140)
~~~

الـ comparator حاول يقرا حروف الاسم ([[value]] هو الحقل اللي جوه String) والاسم null. والحل:

~~~java
    users.sort(Comparator.comparing(User::name, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)));
~~~

[[Comparator.nullsLast(...)]] بيلف الـ comparator: أي null يروح للآخر، والباقي يتقارن عادي.

ناتج الحل كله:

~~~text الناتج
[Mona, Omar, sara]
[Mona, sara, Omar]
[Mona, Omar, sara, null]
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| بحقل رقم | [[Comparator.comparingInt(User::age)]] |
| بحقل أي نوع | [[Comparator.comparing(User::city)]] |
| حقل تاني لو متساويين | [[.thenComparing(...)]] |
| الحقل ده بس بالعكس | [[thenComparing(key, Comparator.reverseOrder())]] |
| كل السلسلة بالعكس | [[.reversed()]] |
| من غير حالة الحروف | [[String.CASE_INSENSITIVE_ORDER]] |
| الـ null في الآخر | [[Comparator.nullsLast(...)]] |
| مسح بشرط | [[list.removeIf(...)]] |

- [[sort]] stable: المتساويين بيحافظوا على ترتيبهم.
- متمسحش من list وانت بتلف عليها بـ for-each.`,
          lines: [
            "record بتلات حقول.",
            "main.",
            R`list تتعدّل من [[List.of]].`,
            "سارة ٢٧ القاهرة.",
            "عمر ٢٢ اسكندرية.",
            "منى ٢٧ اسكندرية.",
            R`ترتيب بالسن. [[User::age]] method reference (درس lambdas).`,
            R`[[[Omar, Sara, Mona]]]: الترتيب stable فسارة فضلت قبل منى.`,
            "بالمدينة، وجوه نفس المدينة بالسن تنازلي.",
            R`[[[Mona, Omar, Sara]]]: اسكندرية الأول (منى ٢٧ ثم عمر ٢٢)، وبعدين القاهرة.`,
            "نسخة.",
            R`[[removeIf]]: المسح بشرط بأمان.`,
            R`[[2]].`,
            R`[[remove]] جوه for-each: [[ConcurrentModificationException]].`,
            "قفلة."
          ],
          sol: R`الحل تحت (كتبنا [[sara]] بحرف صغير عشان نختبر الـ case-insensitive): الناتج [[[Mona, Omar, sara]]] وبعدين [[[Mona, sara, Omar]]] (منى وسارة ٢٧ فمرتبين بالاسم، وبعدين عمر ٢٢)، وبعد ما ضفنا null: [[[Mona, Omar, sara, null]]]. لو استخدمت [[Comparator.comparing(User::name)]] العادي، [[sara]] كانت هتيجي بعد [[Omar]] و [[Mona]] برضه هنا بالصدفة، بس [["sara"]] و [["Sara"]] مش هيترتبوا جنب بعض مع أسماء تانية، لأن الحروف الكبيرة كلها قبل الصغيرة في الترتيب العادي.

لو ضفت user اسمه null ورتبت بالاسم: [[NullPointerException]] جوه الـ comparator. الحل: [[Comparator.comparing(User::name, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER))]]، فالـ null بيروح للآخر. ولاحظ إن [[comparingInt(User::age).reversed()]] جت الأول لوحدها، لأن [[reversed()]] بتعكس كل السلسلة اللي قبلها.`,
          solCode: R`record User(String name, int age, String city) {}

void main() {
    var users = new ArrayList<>(List.of(
        new User("sara", 27, "Cairo"), new User("Omar", 22, "Alex"), new User("Mona", 27, "Alex")));
    users.sort(Comparator.comparing(User::name, String.CASE_INSENSITIVE_ORDER));
    IO.println(users.stream().map(User::name).toList());
    users.sort(Comparator.comparingInt(User::age).reversed()
        .thenComparing(User::name, String.CASE_INSENSITIVE_ORDER));
    IO.println(users.stream().map(User::name).toList());
    users.add(new User(null, 30, "Giza"));
    users.sort(Comparator.comparing(User::name, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)));
    IO.println(users.stream().map(User::name).toList());
}`
        }
      ]
    },
    {
      t: "Lambdas و Streams و Optional",
      l: 1,
      n: "الدوال كقيم، و map و filter و reduce بتوع Java، والتعامل مع القيمة اللي ممكن متكونش موجودة",
      items: [
        {
          cmd: "lambdas",
          title: "تبعت دالة لدالة: lambdas و method references",
          desc: R`الـ lambda في Java [[x -> x * 2]] (سهم بشرطة، مش [[=>]]). بس في Java مفيش نوع اسمه «دالة»: الـ lambda لازم تتحط مكان interface فيه method واحدة (functional interface)، وهي بتبقى تنفيذ الـ method دي.

فيه interfaces جاهزة في [[java.util.function]]: [[Function<T, R>]] (بياخد ويرجع)، و [[Predicate<T>]] (بيرجع boolean)، و [[Consumer<T>]] (بياخد ومبيرجعش)، و [[Supplier<T>]] (مبياخدش وبيرجع). و method reference [[String::length]] اختصار لـ [[s -> s.length()]].`,
          example: R`import java.util.function.*;

@FunctionalInterface
interface PriceRule { long apply(long cents); }

void main() {
    Function<String, Integer> len = s -> s.length();
    Predicate<Integer> isEven = n -> n % 2 == 0;
    Supplier<List<String>> fresh = ArrayList::new;
    BiFunction<Long, Long, Long> add = Long::sum;
    PriceRule tenOff = c -> c * 90 / 100;
    PriceRule minus5 = c -> c - 500;
    IO.println(len.apply("spring") + " " + isEven.test(4) + " " + fresh.get() + " " + add.apply(2L, 3L));
    IO.println(minus5.apply(tenOff.apply(10_000)));
    int discount = 10;
    Function<Integer, Integer> apply = p -> p - discount;
    IO.println(apply.apply(100));
}`,
          try: R`ضيف [[discount = 20;]] بعد سطر الـ lambda الأخيرة واقرا الخطأ. وبعدين اعمل [[List<PriceRule>]] فيها الاتنين وطبّقهم على السعر بالترتيب في loop.`,
          flag: "script",
          deep: {
            why: R`Streams و Optional و Spring Security config ([[auth -> auth.anyRequest()...]]) و Comparators كلها lambdas. لازم تكون مرتاح تقرا [[http.authorizeHttpRequests(a -> a.requestMatchers(...))]] من غير ما تتلخبط.`,
            how: R`الـ compiler بيبص على المكان اللي فيه الـ lambda (target type): لو المطلوب [[Predicate<Integer>]]، يبقى الـ lambda تنفيذ لـ [[test(Integer)]] وبترجع boolean. نفس الـ lambda ممكن تبقى أنواع مختلفة حسب المكان. و [[@FunctionalInterface]] annotation اختيارية بتخلي الـ compiler يتأكد إن فيه method abstract واحدة بس.

أشكال الـ method reference: [[Integer::parseInt]] (static)، و [[String::length]] (method على الباراميتر)، و [[user::getName]] (على object معين)، و [[ArrayList::new]] (constructor).

الـ capture: الـ lambda تقدر تقرا متغيرات محلية من برّه بس لو final أو effectively final (محدش غيّرها). في JS الـ closure بيشوف أحدث قيمة، في Java القيمة بتتنسخ وقت عمل الـ lambda، فمنعوا التغيير عشان ميبقاش فيه لخبطة. الحقول (fields) مش عليها القيد ده.

والأنواع الـ primitive ليها نسخ خاصة من غير boxing: [[IntPredicate]] و [[ToLongFunction]] وغيرهم.`,
            when: R`callbacks وأي حاجة بتاخد سلوك: ترتيب، وفلترة، ومعالجة events. لو الـ lambda بقت أكتر من ٣ سطور، طلّعها method واستخدم method reference.`,
            mistakes: R`تعدّل متغير محلي من جوه lambda ([[count++]] جوه forEach): خطأ compile؛ استخدم stream بـ [[count()]] أو [[sum()]]. وتكتب interface جديد لكل lambda وفيه واحد جاهز في [[java.util.function]]. وتحط checked exception جوه lambda في stream: الـ interfaces الجاهزة مبتسمحش بيها (درس الأخطاء).`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل ٤ lambdas بالـ interfaces الجاهزة، وبعدين interface بتاعه هو ([[PriceRule]]) واتنين قواعد خصم يركّبهم على سعر، وفي الآخر lambda بتقرا متغير من برّه. اتشغّل بـ [[java Main.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25):

~~~text الناتج
6 true [] 5
8500
90
~~~

---

## ١. الـ import

~~~java
import java.util.function.*;
~~~

[[java.util.function]] package فيه الـ interfaces الجاهزة للدوال. والـ [[*]] معناها «هات كل اللي فيه».

---

## ٢. functional interface بتاعك

~~~java
@FunctionalInterface
interface PriceRule { long apply(long cents); }
~~~

- [[interface PriceRule]] فيه method واحدة بس من غير تنفيذ: [[apply]] بتاخد [[long]] وترجع [[long]]. أي interface بالشكل ده اسمه **functional interface**، وأي lambda بنفس الشكل (تاخد رقم وترجع رقم) ينفع تبقى PriceRule.
- [[@FunctionalInterface]]: annotation اختيارية. بتخلي الـ compiler يتأكد إن فيه method abstract واحدة بس، فلو حد ضاف تانية يطلع خطأ.
- [[cents]]: بنحسب الفلوس بالقروش في [[long]]، عشان الكسور العشرية ([[double]]) بتعمل أخطاء تقريب في الفلوس.

---

## ٣. الـ ٤ interfaces الجاهزة

~~~java
    Function<String, Integer> len = s -> s.length();
    Predicate<Integer> isEven = n -> n % 2 == 0;
    Supplier<List<String>> fresh = ArrayList::new;
    BiFunction<Long, Long, Long> add = Long::sum;
~~~

| السطر | الـ interface | بياخد | بيرجع | بتناديه بـ |
|---|---|---|---|---|
| [[len]] | [[Function<String, Integer>]] | String | Integer | [[apply]] |
| [[isEven]] | [[Predicate<Integer>]] | Integer | boolean | [[test]] |
| [[fresh]] | [[Supplier<List<String>>]] | ولا حاجة | List | [[get]] |
| [[add]] | [[BiFunction<Long, Long, Long>]] | اتنين Long | Long | [[apply]] |

والرموز:

- [[s -> s.length()]]: الـ lambda. الشمال الباراميتر، واليمين اللي بيرجع. سهم بشرطة واحدة [[->]]، مش [[=>]] زي JS.
- [[n % 2 == 0]]: [[%]] باقي القسمة. لو الباقي صفر يبقى زوجي.
- [[ArrayList::new]]: constructor reference، اختصار لـ [[() -> new ArrayList<>()]]. كل [[get()]] بترجع list جديدة فاضية.
- [[Long::sum]]: static method reference، اختصار لـ [[(a, b) -> Long.sum(a, b)]].

~~~java
    IO.println(len.apply("spring") + " " + isEven.test(4) + " " + fresh.get() + " " + add.apply(2L, 3L));
~~~

~~~text الناتج
6 true [] 5
~~~

[["spring"]] ٦ حروف، و ٤ زوجي، والـ list الجديدة فاضية فاتطبعت قوسين مربعين فاضيين، و ٢ + ٣ = ٥. و [[2L]] الـ [[L]] بتخلي الرقم long، لأن [[add]] مستني Long ورقم من غير L يبقى int.

لاحظ إن في Java مفيش [[len("spring")]] زي JS: لازم تنادي اسم الـ method بتاعة الـ interface ([[apply]] أو [[test]] أو [[get]]). الـ lambda مش «دالة»، هي object بينفّذ الـ interface.

---

## ٤. تركيب قاعدتين

~~~java
    PriceRule tenOff = c -> c * 90 / 100;
    PriceRule minus5 = c -> c - 500;
    IO.println(minus5.apply(tenOff.apply(10_000)));
~~~

- نفس شكل الـ lambda ([[c -> ...]]) بقى [[PriceRule]] لأن ده النوع اللي على الشمال. الـ compiler بيبص على المكان اللي الـ lambda رايحة له (اسمه target type).
- [[c * 90 / 100]]: خصم ١٠٪. الضرب الأول عشان القسمة على أرقام صحيحة متضيّعش الكسور.
- [[10_000]]: الـ [[_]] جوه الرقم للقراية بس، هو 10000.
- من جوه لبرة: [[tenOff.apply(10_000)]] = 9000، وبعدين [[minus5.apply(9000)]] = 8500.

~~~text الناتج
8500
~~~

---

## ٥. الـ lambda بتقرا متغير من برّه

~~~java
    int discount = 10;
    Function<Integer, Integer> apply = p -> p - discount;
    IO.println(apply.apply(100));
~~~

~~~text الناتج
90
~~~

الـ lambda «مسكت» [[discount]] (ده اسمه capture). والشرط: المتغير يبقى **effectively final**، يعني محدش غيّر قيمته بعد ما اتعمل. جرّبنا نضيف [[discount = 20;]] بعد سطر الـ lambda:

~~~text الناتج
Main.java:4: error: local variables referenced from a lambda expression must be final or effectively final
    Function<Integer, Integer> apply = p -> p - discount;
                                                ^
~~~

لاحظ إن الخطأ بيشاور على **سطر الـ lambda** مش سطر التغيير: المتغير بقى بيتغير، فالـ lambda مبقتش تقدر تمسكه. السبب إن Java بتنسخ القيمة جوه الـ lambda وقت ما بتتعمل، فلو سمحت بالتغيير هيبقى فيه نسختين مختلفتين.

---

## ٦. الحل: list من القواعد

~~~java
    List<PriceRule> rules = List.of(c -> c * 90 / 100, c -> c - 500);
    long price = 10_000;
    for (PriceRule r : rules) price = r.apply(price);
    IO.println(price);
~~~

- [[List<PriceRule>]]: list من سلوكيات. كل lambda جواها بقت PriceRule.
- الـ loop بيطبّق كل قاعدة على ناتج اللي قبلها.

~~~text الناتج
8500
~~~

[[price]] هنا بيتغير، بس ده مسموح لأنه **مش** متقري جوه lambda. الـ lambdas نفسها مش بتلمسه.

---

## الخلاصة

| الشكل | يعني |
|---|---|
| [[x -> x * 2]] | lambda بباراميتر واحد |
| [[(a, b) -> a + b]] | باراميترين |
| [[() -> ...]] | من غير باراميترات |
| [[String::length]] | method على الباراميتر نفسه |
| [[Long::sum]] | static method |
| [[ArrayList::new]] | constructor |

- الـ lambda لازم تروح لـ interface فيه method واحدة، وبتتنادى باسم الـ method دي.
- المتغيرات المحلية اللي بتقراها لازم متتغيرش.`,
          lines: [
            R`الـ interfaces الجاهزة للدوال.`,
            R`annotation بتتأكد إن فيه method واحدة.`,
            "functional interface بتاعنا.",
            "main.",
            R`[[Function<String, Integer>]]: بياخد String ويرجع Integer. نداءها [[apply]].`,
            R`[[Predicate]]: بيرجع boolean. نداءها [[test]].`,
            R`[[Supplier]] مع constructor reference.`,
            R`[[Long::sum]] static method reference.`,
            R`lambda بقت PriceRule: خصم ١٠٪.`,
            "خصم ٥ جنيه (٥٠٠ قرش).",
            R`[[6 true [] 5]].`,
            R`تركيب القاعدتين: ١٠٠٠٠ → ٩٠٠٠ → [[8500]].`,
            "متغير محلي.",
            "الـ lambda بتقراه (effectively final).",
            R`[[90]].`,
            "قفلة."
          ],
          sol: R`[[discount = 20;]] بعد الـ lambda: [[local variables referenced from a lambda expression must be final or effectively final]]. المتغير بقى بيتغير، فالـ lambda مينفعش تمسكه.

وتطبيق القواعد بالترتيب زي الكود تحت: [[8500]]. لاحظ إن [[rules]] ليستة سلوكيات، وده Strategy pattern بكود قصير جدًا. لو عكست الترتيب (الـ ٥ الأول وبعدين ١٠٪) الناتج [[8550]]، فالترتيب جزء من المنطق.`,
          solCode: R`@FunctionalInterface
interface PriceRule { long apply(long cents); }

void main() {
    List<PriceRule> rules = List.of(c -> c * 90 / 100, c -> c - 500);
    long price = 10_000;
    for (PriceRule r : rules) price = r.apply(price);
    IO.println(price);
}`
        },
        {
          cmd: "streams",
          title: "map و filter و reduce بتوع Java، والتجميع بـ groupingBy",
          desc: R`الـ Stream API هو [[map]] و [[filter]] و [[reduce]] اللي متعود عليهم في JS، بس بتبدأ بـ [[.stream()]] وبتنتهي بعملية نهائية: [[toList()]] أو [[count()]] أو [[sum()]] أو [[collect(...)]]. من غير العملية النهائية مفيش حاجة بتتنفذ أصلًا (lazy).

و [[Collectors.groupingBy]] بيعمل اللي بتعمله بـ [[reduce]] معقد في JS: يجمّع حسب مفتاح ويحسب مجموع أو عدد لكل مجموعة، زي [[GROUP BY]] في SQL.`,
          example: R`record Order(String customer, String city, long total, boolean paid) {}

void main() {
    var orders = List.of(
        new Order("Sara", "Cairo", 500, true),
        new Order("Omar", "Alex", 1200, true),
        new Order("Sara", "Cairo", 300, false),
        new Order("Mona", "Alex", 800, true));
    long paidTotal = orders.stream().filter(Order::paid).mapToLong(Order::total).sum();
    List<String> bigCustomers = orders.stream()
        .filter(o -> o.total() >= 800)
        .map(Order::customer)
        .distinct()
        .sorted()
        .toList();
    Map<String, Long> byCity = orders.stream()
        .collect(Collectors.groupingBy(Order::city, TreeMap::new, Collectors.summingLong(Order::total)));
    IO.println(paidTotal);
    IO.println(bigCustomers);
    IO.println(byCity);
    IO.println(orders.stream().anyMatch(o -> !o.paid()));
}`,
          try: R`من نفس الـ orders طلّع: (١) عدد الطلبات لكل عميل [[Map<String, Long>]]، (٢) أكبر طلب (استخدم [[max]] مع Comparator، ولاحظ إنها بترجع Optional)، (٣) أسماء العملاء مفصولين بـ [[", "]] في string واحد.`,
          flag: "script",
          deep: {
            why: R`تحويل الـ entities لـ DTOs في كل controller: [[tasks.stream().map(TaskResponse::from).toList()]]. والتقارير والتجميع الصغير. والكود بيبقى قريب من الـ JS اللي انت متعود عليه.`,
            how: R`الـ stream pipeline: مصدر ([[list.stream()]])، وعمليات وسيطة lazy ([[filter]] و [[map]] و [[sorted]] و [[distinct]] و [[limit]])، وعملية نهائية واحدة بتشغّل كله. العناصر بتعدّي على السلسلة واحد واحد، مش كل خطوة بتعمل list جديدة زي JS. والـ stream بيتستخدم مرة واحدة بس.

[[mapToLong]] و [[mapToInt]] بيدوك stream أرقام primitive فيه [[sum()]] و [[average()]] من غير boxing.

[[toList()]] (Java 16) بترجع list ثابتة. [[collect(Collectors.toList())]] القديمة بترجع ArrayList تتعدّل. و [[Collectors]] فيها [[groupingBy]] و [[partitioningBy]] (قسمين بشرط) و [[joining(", ")]] و [[toMap]] و [[counting()]].

و [[parallelStream()]] موجودة بس نادرًا ما تفيد في backend (الـ requests أصلًا شغالة بالتوازي).`,
            when: R`تحويل وفلترة وتجميع على داتا في الذاكرة. أما لو الداتا في الداتابيز، فلتر وجمّع هناك ([[WHERE]] و [[GROUP BY]] أو query method)، ومتجيبش ١٠٠ ألف صف عشان تعمل filter في Java.`,
            mistakes: R`تستخدم الـ stream مرتين: [[IllegalStateException: stream has already been operated upon or closed]]. وتعدّل حاجة برّه من جوه [[map]] أو [[forEach]] (side effects). و [[Collectors.toMap]] مع مفاتيح متكررة: [[IllegalStateException: Duplicate key]] إلا لو اديته merge function. و stream طويل ومعقد بدل for loop واضح: مش كل حاجة لازم تبقى stream.`
          },
          teach: R`## البرنامج بيعمل إيه؟

عنده ٤ طلبات، وبيطلع منهم ٤ أجوبة بالـ streams: مجموع المدفوع، وأسماء العملاء اللي عندهم طلبات كبيرة، ومجموع كل مدينة، وهل فيه طلب مش مدفوع. اتشغّل بـ [[java Main.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25):

~~~text الناتج
2500
[Mona, Omar]
{Alex=2000, Cairo=800}
true
~~~

---

## ١. الداتا

~~~java
record Order(String customer, String city, long total, boolean paid) {}

    var orders = List.of(
        new Order("Sara", "Cairo", 500, true),
        new Order("Omar", "Alex", 1200, true),
        new Order("Sara", "Cairo", 300, false),
        new Order("Mona", "Alex", 800, true));
~~~

record فيه العميل والمدينة والمبلغ وهل اتدفع. و [[List.of]] هنا كفاية لأن الـ streams مبتعدّلش الـ list الأصلية، بتقرا منها بس.

---

## ٢. مجموع المدفوع: سطر واحد

~~~java
    long paidTotal = orders.stream().filter(Order::paid).mapToLong(Order::total).sum();
~~~

ده pipeline، بيتقرا من الشمال لليمين:

| الخطوة | بتعمل إيه | اللي بيطلع منها |
|---|---|---|
| [[orders.stream()]] | حوّل الـ list لـ stream (مصدر) | الـ ٤ طلبات |
| [[.filter(Order::paid)]] | سيب اللي [[paid()]] بتاعه true | سارة ٥٠٠، عمر ١٢٠٠، منى ٨٠٠ |
| [[.mapToLong(Order::total)]] | خد المبلغ كرقم [[long]] | 500، 1200، 800 |
| [[.sum()]] | اجمع (العملية النهائية) | 2500 |

- [[Order::paid]] اختصار لـ [[o -> o.paid()]]، وبترجع boolean فتنفع شرط للـ filter.
- [[mapToLong]] بدل [[map]]: بتطلّع stream أرقام primitive اسمه [[LongStream]]، وده اللي فيه [[sum()]]. الـ stream العادي مفيهوش sum.

~~~text الناتج
2500
~~~

---

## ٣. أسماء العملاء الكبار

~~~java
    List<String> bigCustomers = orders.stream()
        .filter(o -> o.total() >= 800)
        .map(Order::customer)
        .distinct()
        .sorted()
        .toList();
~~~

- [[filter(o -> o.total() >= 800)]]: عمر (١٢٠٠) ومنى (٨٠٠).
- [[map(Order::customer)]]: خد الاسم بس. زي [[map]] في JS.
- [[distinct()]]: شيل التكرار (مفيش هنا، بس لو سارة كان عندها طلبين كبار كانت هتظهر مرة).
- [[sorted()]]: ترتيب طبيعي، والـ Strings أبجدي.
- [[toList()]]: العملية النهائية. بترجع list **ثابتة** (Java 16+).

~~~text الناتج
[Mona, Omar]
~~~

### ليه بنعمل [[orders.stream()]] تاني؟

الـ stream بيتستخدم **مرة واحدة**. جرّبنا نادينا [[count()]] مرتين على نفس الـ stream:

~~~text الناتج
3
Exception in thread "main" java.lang.IllegalStateException: stream has already been operated upon or closed
~~~

الـ list نفسها تقدر تعمل منها streams كتير، بس كل stream لعملية نهائية واحدة.

### lazy: مفيش حاجة بتحصل قبل العملية النهائية

[[filter]] و [[map]] و [[distinct]] و [[sorted]] اسمهم عمليات وسيطة: بيوصفوا الشغل بس. أول ما [[toList()]] تتنادى، العناصر بتعدّي على السلسلة. ومن غير عملية نهائية الكود مش بيعمل أي حاجة.

---

## ٤. التجميع: [[groupingBy]]

~~~java
    Map<String, Long> byCity = orders.stream()
        .collect(Collectors.groupingBy(Order::city, TreeMap::new, Collectors.summingLong(Order::total)));
~~~

[[collect(...)]] عملية نهائية بتاخد «طريقة تجميع» من [[Collectors]]. و [[groupingBy]] هنا ليها ٣ باراميترات:

| الباراميتر | معناه |
|---|---|
| [[Order::city]] | المفتاح: جمّع حسب المدينة |
| [[TreeMap::new]] | اعمل الناتج في [[TreeMap]] عشان المدن تطلع مرتبة |
| [[Collectors.summingLong(Order::total)]] | قيمة كل مجموعة: مجموع المبالغ |

بالأرقام: اسكندرية = ١٢٠٠ + ٨٠٠ = ٢٠٠٠، والقاهرة = ٥٠٠ + ٣٠٠ = ٨٠٠ (المجموع هنا مش بيبص على [[paid]]).

~~~text الناتج
{Alex=2000, Cairo=800}
~~~

ده نفس [[SELECT city, SUM(total) FROM orders GROUP BY city ORDER BY city]] في SQL. ولو كتبت [[groupingBy(Order::city)]] بباراميتر واحد بس، هتاخد [[Map<String, List<Order>>]]: الطلبات نفسها متجمعة.

---

## ٥. [[anyMatch]]

~~~java
    IO.println(orders.stream().anyMatch(o -> !o.paid()));
~~~

- [[!o.paid()]]: [[!]] يعني not، يعني «مش مدفوع».
- [[anyMatch]]: true لو عنصر واحد على الأقل حقق الشرط، وبيقف أول ما يلاقي واحد. زي [[some]] في JS، وأخواتها [[allMatch]] (زي [[every]]) و [[noneMatch]].

~~~text الناتج
true
~~~

طلب سارة التاني (٣٠٠) مش مدفوع.

---

## ٦. الحل

~~~java
    Map<String, Long> perCustomer = orders.stream()
        .collect(Collectors.groupingBy(Order::customer, TreeMap::new, Collectors.counting()));
~~~

نفس [[groupingBy]]، بس القيمة [[counting()]]: عدد العناصر، وبترجع [[Long]].

~~~java
    Order biggest = orders.stream().max(Comparator.comparingLong(Order::total)).orElseThrow();
~~~

- [[max(...)]] بتاخد Comparator (درس Comparator) وبترجع [[Optional<Order>]]، لأن لو الـ list فاضية مفيش أكبر.
- [[orElseThrow()]]: طلّع القيمة، ولو فاضي ارمي exception (درس Optional).

~~~java
    String names = orders.stream().map(Order::customer).distinct().sorted().collect(Collectors.joining(", "));
~~~

[[Collectors.joining(", ")]] بيلزق الـ Strings بالفاصل، زي [[join(", ")]] في JS.

~~~text الناتج
{Mona=1, Omar=1, Sara=2}
Order[customer=Omar, city=Alex, total=1200, paid=true]
Mona, Omar, Sara
~~~

---

## الخلاصة

| في JS | في Java |
|---|---|
| [[arr.filter(f)]] | [[list.stream().filter(f)]] |
| [[arr.map(f)]] | [[.map(f)]] |
| [[reduce]] للمجموع | [[.mapToLong(f).sum()]] |
| [[Array.from(new Set(arr))]] | [[.distinct()]] |
| [[arr.some(f)]] | [[.anyMatch(f)]] |
| [[arr.join(", ")]] | [[.collect(Collectors.joining(", "))]] |
| [[reduce]] لتجميع | [[Collectors.groupingBy(...)]] |
| النتيجة array | [[.toList()]] (ثابتة) |

- لازم عملية نهائية، وإلا مفيش حاجة بتتنفذ.
- كل stream مرة واحدة.`,
          lines: [
            "record للطلب.",
            "main.",
            "أربع طلبات.",
            "سارة، مدفوع.",
            "عمر، مدفوع.",
            "سارة، مش مدفوع.",
            "منى، مدفوع.",
            R`filter بـ method reference، وبعدين مجموع: ٥٠٠ + ١٢٠٠ + ٨٠٠.`,
            "stream تاني (كل stream مرة واحدة).",
            "الطلبات الكبيرة.",
            R`اسم العميل. زي [[map]] في JS.`,
            "من غير تكرار.",
            "ترتيب أبجدي.",
            "عملية نهائية: list ثابتة.",
            "التجميع بالمدينة.",
            R`[[groupingBy]] بمفتاح المدينة، في TreeMap مرتب، والقيمة مجموع الـ totals.`,
            R`[[2500]].`,
            R`[[[Mona, Omar]]].`,
            R`[[{Alex=2000, Cairo=800}]].`,
            R`[[anyMatch]] زي [[some]] في JS: [[true]].`,
            "قفلة."
          ],
          sol: R`الناتج من الحل تحت:

[[{Mona=1, Omar=1, Sara=2}]]: [[counting()]] بترجع Long.

[[Order[customer=Omar, city=Alex, total=1200, paid=true]]]: [[max]] بترجع [[Optional<Order>]] لأن الـ list ممكن تبقى فاضية، فلازم [[orElseThrow()]] أو [[orElse]].

[[Mona, Omar, Sara]]: [[distinct]] شالت سارة المكررة، و [[joining]] زي [[join(", ")]] في JS.`,
          solCode: R`record Order(String customer, String city, long total, boolean paid) {}

void main() {
    var orders = List.of(new Order("Sara", "Cairo", 500, true), new Order("Omar", "Alex", 1200, true),
        new Order("Sara", "Cairo", 300, false), new Order("Mona", "Alex", 800, true));
    Map<String, Long> perCustomer = orders.stream()
        .collect(Collectors.groupingBy(Order::customer, TreeMap::new, Collectors.counting()));
    Order biggest = orders.stream().max(Comparator.comparingLong(Order::total)).orElseThrow();
    String names = orders.stream().map(Order::customer).distinct().sorted().collect(Collectors.joining(", "));
    IO.println(perCustomer);
    IO.println(biggest);
    IO.println(names);
}`
        },
        {
          cmd: "Optional",
          title: "method ممكن متلاقيش حاجة: ترجع null ولا Optional؟",
          desc: R`[[Optional<User>]] صندوق يا فيه User يا فاضي. بدل ما [[findById]] ترجع null وتنسى تفحص، النوع نفسه بيقولك «ممكن متلاقيش»، وبيجبرك تقرر: [[orElse(default)]]، أو [[orElseThrow(...)]]، أو [[map]] للتحويل، أو [[ifPresent]].

ده اللي Spring Data بيرجعه: [[repository.findById(id)]] نوعها [[Optional<Task>]]، والشكل المعتاد في الـ service: [[findById(id).orElseThrow(() -> new NotFoundException(...))]]. قريب من [[user?.name ?? "guest"]] في JS بس بـ methods.`,
          example: R`record User(long id, String name, String email) {}

Map<Long, User> db = Map.of(1L, new User(1, "Sara", "sara@example.com"), 2L, new User(2, "Omar", null));

Optional<User> findById(long id) {
    return Optional.ofNullable(db.get(id));
}

void main() {
    IO.println(findById(1).map(User::name).orElse("guest"));
    IO.println(findById(9).map(User::name).orElse("guest"));
    IO.println(findById(2).map(User::email).orElse("no email"));
    findById(1).ifPresent(u -> IO.println("found " + u.id()));
    User u = findById(9).orElseThrow(() -> new NoSuchElementException("user 9 not found"));
}`,
          try: R`جرّب [[findById(9).get()]] وشوف الـ exception. وبعدين اكتب [[Optional<String> emailDomain(long id)]] بترجع الـ domain بتاع الإيميل ([["example.com"]]) أو فاضي، من غير ولا [[if]] ولا null check (استخدم [[map]] و [[filter]]).`,
          flag: "script",
          deep: {
            why: R`[[NullPointerException]] أشهر exception في Java. Java مفيهاش [[strictNullChecks]] زي TS، فـ Optional هو الطريقة إن الـ signature نفسه يقول «القيمة دي ممكن متكونش موجودة». لما تشوف [[Optional<Task>]] مش هتنسى الحالة الفاضية.`,
            how: R`[[Optional.of(x)]] (x مينفعش يبقى null)، و [[Optional.ofNullable(x)]] (فاضي لو null)، و [[Optional.empty()]].

[[map(f)]]: لو فيه قيمة طبّق f، ولو f رجّعت null بقى فاضي (عشان كده Omar اللي إيميله null طلع [["no email"]]). و [[flatMap]] لو f نفسها بترجع Optional. و [[filter]] بيفضّيه لو الشرط مش متحقق.

[[orElse(x)]] بيحسب x دايمًا حتى لو فيه قيمة، و [[orElseGet(() -> x)]] بيحسبه بس لو فاضي؛ فرق مهم لو x استعلام أو object تقيل. و [[orElseThrow()]] من غير باراميتر بيرمي [[NoSuchElementException]]، ومع supplier بيرمي الـ exception بتاعك.

[[get()]] من غير ما تفحص بيرمي [[NoSuchElementException: No value present]]، فاستخدامه بيضيّع الفايدة كلها.`,
            when: R`نوع رجوع لـ methods ممكن متلاقيش (find و search و parse). مش للحقول، ولا باراميترات methods، ولا جوه collections (list فاضية أحسن من [[Optional<List>]])، ولا في الـ entities. Jackson بيعرف يحوّل Optional بس الـ DTOs الأحسن تبقى نوع عادي ممكن يبقى null.`,
            mistakes: R`[[if (opt.isPresent()) { opt.get() }]]: ده null check بشكل أطول؛ استخدم map و orElse. و method نوعها Optional وبترجع [[null]]: أسوأ الاتنين. و [[orElse(repository.save(...))]] وتستغرب إن الـ save بيتنفذ دايمًا: استخدم [[orElseGet]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل داتابيز وهمية فيها اتنين users، و method اسمها [[findById]] بترجع [[Optional<User>]] بدل null. وبعدين يجرّب الحالات: موجود، ومش موجود، وموجود بس الحقل اللي عايزه null، وفي الآخر [[orElseThrow]] برسالة بتاعتنا. اتشغّل بـ [[java Main.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25):

~~~text الناتج
Sara
guest
no email
found 1
Exception in thread "main" java.util.NoSuchElementException: user 9 not found
	at Main.lambda$main$1(Main.java:14)
	at java.base/java.util.Optional.orElseThrow(Optional.java:403)
	at Main.main(Main.java:14)
~~~

---

## ١. الداتا

~~~java
record User(long id, String name, String email) {}

Map<Long, User> db = Map.of(1L, new User(1, "Sara", "sara@example.com"), 2L, new User(2, "Omar", null));
~~~

- [[Map.of(k1, v1, k2, v2)]]: map ثابتة بزوجين. [[1L]] الـ [[L]] عشان المفتاح [[Long]].
- عمر إيميله [[null]]. ده مسموح لأن الـ null جوه الـ User، مش قيمة في الـ map. ([[Map.of]] نفسه بيرفض null كمفتاح أو قيمة.)
- [[db]] متعرّفة برّه main: في الـ compact source file الحقول دي بتبقى حقول في الـ class المخفي.

---

## ٢. [[findById]]

~~~java
Optional<User> findById(long id) {
    return Optional.ofNullable(db.get(id));
}
~~~

- نوع الرجوع [[Optional<User>]]: صندوق يا فيه User يا فاضي. مجرد ما تشوف النوع ده تعرف إن «ممكن متلاقيش».
- [[db.get(id)]]: بترجع User أو null.
- [[Optional.ofNullable(...)]]: لو القيمة null اعمل صندوق فاضي، وإلا صندوق فيه القيمة. أخواتها: [[Optional.of(x)]] (لو x بـ null بترمي exception) و [[Optional.empty()]] (فاضي على طول). جرّبنا نطبعهم: [[Optional.ofNullable(null)]] بيطبع [[Optional.empty]]، و [[Optional.of("x")]] بيطبع [[Optional[x]]].

---

## ٣. [[map]] و [[orElse]]

~~~java
    IO.println(findById(1).map(User::name).orElse("guest"));
    IO.println(findById(9).map(User::name).orElse("guest"));
~~~

خطوة خطوة لـ id = 1:

| الخطوة | الناتج |
|---|---|
| [[findById(1)]] | Optional فيه User سارة |
| [[.map(User::name)]] | [[Optional[Sara]]] |
| [[.orElse("guest")]] | [[Sara]] |

ولـ id = 9: [[findById(9)]] فاضي، و [[map]] على صندوق فاضي مبتعملش حاجة وبترجعه فاضي، و [[orElse]] بترجع البديل [["guest"]].

~~~text الناتج
Sara
guest
~~~

ده بالظبط [[findById(9)?.name ?? "guest"]] في JS.

---

## ٤. [[map]] لما الحقل نفسه null

~~~java
    IO.println(findById(2).map(User::email).orElse("no email"));
~~~

عمر موجود، بس [[email()]] بترجع null. و [[map]] لما الدالة ترجع null بتحوّل الصندوق لفاضي، فـ [[orElse]] رجّعت البديل:

~~~text الناتج
no email
~~~

---

## ٥. [[ifPresent]]

~~~java
    findById(1).ifPresent(u -> IO.println("found " + u.id()));
~~~

نفّذ الـ lambda لو فيه قيمة بس، ولو فاضي متعملش حاجة. بترجع void، يعني آخر السلسلة.

~~~text الناتج
found 1
~~~

---

## ٦. [[orElseThrow]] برسالة بتاعتك

~~~java
    User u = findById(9).orElseThrow(() -> new NoSuchElementException("user 9 not found"));
~~~

- [[orElseThrow(...)]]: لو فيه قيمة رجّعها، ولو فاضي ارمي الـ exception اللي الـ lambda بتعمله.
- [[() -> new ...]]: lambda من غير باراميترات (Supplier). مكتوبة كـ lambda عشان الـ exception ميتعملش غير لو احتجناه.

~~~text الناتج
Exception in thread "main" java.util.NoSuchElementException: user 9 not found
	at Main.lambda$main$1(Main.java:14)
	at java.base/java.util.Optional.orElseThrow(Optional.java:403)
	at Main.main(Main.java:14)
~~~

من تحت لفوق: [[main]] نادت [[orElseThrow]]، اللي نادت الـ lambda بتاعتنا ([[lambda$main$1]] هو الاسم اللي الـ compiler اداه للـ lambda التانية في main)، واللي عملت الـ exception. في Spring ده الشكل اللي هتكتبه في كل service، مع exception بيتحول لـ 404.

### و [[get()]]؟

جرّبنا [[Optional.empty().get()]]:

~~~text الناتج
Exception in thread "main" java.util.NoSuchElementException: No value present
~~~

نفس الـ exception بس برسالة مش مفيدة. [[get()]] من غير فحص بيضيّع فايدة الـ Optional.

---

## ٧. الحل: [[emailDomain]] من غير ولا if

~~~java
Optional<String> emailDomain(long id) {
    return findById(id)
        .map(User::email)
        .filter(e -> e.contains("@"))
        .map(e -> e.substring(e.indexOf('@') + 1));
}
~~~

| الخطوة | لـ id = 1 | لـ id = 2 | لـ id = 9 |
|---|---|---|---|
| [[findById(id)]] | فيه سارة | فيه عمر | فاضي |
| [[.map(User::email)]] | [[sara@example.com]] | فاضي (null) | فاضي |
| [[.filter(e -> e.contains("@"))]] | فيه [[@]]، يفضل | فاضي | فاضي |
| [[.map(e -> e.substring(...))]] | [[example.com]] | فاضي | فاضي |

- [[filter]] على Optional: لو الشرط false يفضّيه.
- [[e.indexOf('@')]]: مكان الـ [[@]] (رقم). و [['@']] بعلامة واحدة يعني حرف واحد ([[char]]) مش String.
- [[substring(n + 1)]]: من بعد الـ [[@]] للآخر.

~~~text الناتج
Optional[example.com] Optional.empty Optional.empty
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| قيمة ممكن تبقى null | [[Optional.ofNullable(x)]] |
| حوّل القيمة لو موجودة | [[.map(f)]] |
| شرط | [[.filter(p)]] |
| بديل ثابت | [[.orElse(x)]] |
| بديل بيتحسب لو احتجته بس | [[.orElseGet(() -> ...)]] |
| exception لو فاضي | [[.orElseThrow(() -> new ...)]] |
| نفّذ لو موجود | [[.ifPresent(...)]] |

- متستخدمش [[get()]] من غير فحص.
- Optional لنوع الرجوع بس، مش للحقول ولا الباراميترات.`,
          lines: [
            "record فيه email ممكن يبقى null.",
            R`داتابيز وهمية. [[Map.of]] مبيقبلش null كقيمة، بس القيمة هنا User (وجواه null عادي).`,
            R`نوع الرجوع بيقول «ممكن متلاقيش».`,
            R`[[ofNullable]]: لو [[get]] رجّعت null يبقى Optional فاضي.`,
            "قفلة.",
            "main.",
            R`موجود: [[Sara]].`,
            R`مش موجود: [[guest]].`,
            R`موجود بس الإيميل null، و [[map]] بتحوّل null لفاضي: [[no email]].`,
            R`[[ifPresent]]: نفّذ لو موجود بس: [[found 1]].`,
            R`[[orElseThrow]] بـ exception بتاعنا. ده الشكل اللي هتكتبه في كل service.`,
            "قفلة."
          ],
          sol: R`[[findById(9).get()]]: [[NoSuchElementException: No value present]]. متستخدمش [[get()]] من غير ما تبقى متأكد، واستخدم [[orElseThrow]] برسالة واضحة.

و [[emailDomain]] تحت: [[Optional[example.com]]] لـ 1، و [[Optional.empty]] لـ 2 (إيميل null) و 9 (مش موجود). [[map(User::email)]] بتفضّي لو null، و [[filter]] بتفضّي لو مفيش [[@]]، و [[map]] التانية بتقص. كل خطوة بتعدّي الفاضي زي ما هو، زي [[?.]] في JS.`,
          solCode: R`record User(long id, String name, String email) {}

Map<Long, User> db = Map.of(1L, new User(1, "Sara", "sara@example.com"), 2L, new User(2, "Omar", null));

Optional<User> findById(long id) { return Optional.ofNullable(db.get(id)); }

Optional<String> emailDomain(long id) {
    return findById(id)
        .map(User::email)
        .filter(e -> e.contains("@"))
        .map(e -> e.substring(e.indexOf('@') + 1));
}

void main() {
    IO.println(emailDomain(1) + " " + emailDomain(2) + " " + emailDomain(9));
}`
        }
      ]
    },
    {
      t: "الأخطاء (exceptions)",
      l: 1,
      n: "checked و unchecked، و try-with-resources، و exceptions بتاعتك",
      items: [
        {
          cmd: "checked و unchecked",
          title: "ليه Java بتجبرك تمسك بعض الأخطاء، وبعضها لأ؟",
          desc: R`في Java فيه نوعين exceptions. الـ checked (زي [[IOException]]): الـ compiler بيجبرك يا تمسكها بـ [[try/catch]]، يا تكتب [[throws IOException]] في الـ signature. والـ unchecked (أي حاجة تحت [[RuntimeException]] زي [[IllegalArgumentException]] و [[NullPointerException]]): مش لازم تتمسك.

الفكرة الأصلية: checked للحاجات اللي برّه تحكّمك وممكن تتعافى منها (ملف مش موجود، شبكة وقعت)، و unchecked للغلطات في الكود نفسه. عمليًا، الكود الحديث و Spring بيميلوا للـ unchecked، و Spring بيحوّل أخطاء الداتابيز لـ [[DataAccessException]] وهي unchecked.`,
          example: R`import java.io.IOException;
import java.nio.file.*;

static String readConfig(Path path) throws IOException {
    return Files.readString(path);
}

static int parsePort(String raw) {
    return Integer.parseInt(raw.strip());
}

void main() {
    try {
        IO.println(readConfig(Path.of("missing.txt")));
    } catch (NoSuchFileException e) {
        IO.println("no file: " + e.getMessage());
    } catch (IOException e) {
        throw new UncheckedIOException(e);
    }
    IO.println(parsePort(" 8080 "));
    try {
        parsePort("abc");
    } catch (NumberFormatException e) {
        IO.println(e.getMessage());
    } finally {
        IO.println("finally runs always");
    }
}`,
          try: R`شيل [[throws IOException]] من [[readConfig]] واقرا الخطأ. وبعدين رجّعه وشيل الـ try/catch حوالين النداء. وأخيرًا بدّل ترتيب الـ catch (خلي [[IOException]] قبل [[NoSuchFileException]]).`,
          flag: "script",
          deep: {
            why: R`هتقابل الـ checked exceptions في أول مرة تقرا ملف أو تعمل HTTP call، وهتقابلها في الانترفيو («checked ولا unchecked؟»). وفي Spring هتحتاج تفهمها عشان [[@Transactional]] بيتعامل معاهم بشكل مختلف: بيعمل rollback على الـ unchecked بس افتراضيًا (درس فخاخ @Transactional).`,
            how: R`الشجرة: [[Throwable]] فوق الكل، وتحته [[Error]] (مشاكل في الـ JVM زي [[OutOfMemoryError]]، متمسكهاش) و [[Exception]]. تحت [[Exception]] فيه [[RuntimeException]] ودي وكل اللي تحتها unchecked، والباقي checked.

الـ catch بيتجرب بالترتيب، والأول اللي النوع بتاعه يطابق بيمسك. عشان كده الأخص ([[NoSuchFileException]] وهي IOException) لازم قبل الأعم، والـ compiler بيطلّع خطأ لو العكس. وتقدر تمسك كذا نوع في catch واحد: [[catch (IOException | SQLException e)]].

[[finally]] بيتنفذ دايمًا، سواء حصل exception أو لأ أو حتى لو فيه return.

[[UncheckedIOException]] طريقة شائعة تلف checked جوه unchecked لما مش هتعرف تتعافى منها، ومعاها الـ cause الأصلي فالـ stack trace كامل. الـ lambdas في streams مبتسمحش بـ checked exceptions، فهتحتاج الحركة دي كتير.`,
            when: R`اعمل throw لـ unchecked في كودك للأخطاء المنطقية (not found، و validation، و conflict)، وخلي [[@ControllerAdvice]] يحوّلها لـ HTTP response (درس الأخطاء في المستوى ٢). وامسك الـ checked في الحدود (ملفات وشبكة) ولفّها أو تعامل معاها.`,
            mistakes: R`[[catch (Exception e) {}]] فاضي: الغلطة اختفت ومحدش هيعرف. وأقل منه سوءًا [[e.printStackTrace()]] في الإنتاج بدل logger. و [[throws Exception]] على كل method عشان الـ compiler يسكت. وتلف exception من غير الـ cause: [[new RuntimeException("failed")]] بدل [[new RuntimeException("failed", e)]] فتضيع السبب الأصلي.`
          },
          teach: R`## البرنامج بيعمل إيه؟

فيه method بتقرا ملف (ممكن ترمي [[IOException]] وهي checked)، و method بتحوّل String لرقم (ممكن ترمي [[NumberFormatException]] وهي unchecked). وبيجرّب الاتنين: الملف مش موجود، والـ String مش رقم، وبيوري [[finally]]. اتشغّل بـ [[java Main.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25) في فولدر مفيهوش [[missing.txt]]:

~~~text الناتج
no file: missing.txt
8080
For input string: "abc"
finally runs always
~~~

---

## ١. الـ imports

~~~java
import java.io.IOException;
import java.nio.file.*;
~~~

- [[java.io.IOException]]: الـ exception الأم لكل أخطاء القراية والكتابة (ملفات وشبكة).
- [[java.nio.file.*]]: [[Files]] (methods جاهزة للملفات) و [[Path]] (مسار ملف) و [[NoSuchFileException]]. و [[nio]] اختصار New I/O.

---

## ٢. method بترمي checked exception

~~~java
static String readConfig(Path path) throws IOException {
    return Files.readString(path);
}
~~~

- [[Files.readString(path)]]: اقرا الملف كله في String. الـ method دي مكتوب في الـ signature بتاعها [[throws IOException]].
- [[throws IOException]] في الـ signature بتاعتنا: بنقول «أنا مش هتعامل مع الخطأ ده، اللي بيناديني هو اللي يتصرف».

لو شلت [[throws IOException]]:

~~~text الناتج
Main.java:4: error: unreported exception IOException; must be caught or declared to be thrown
    return Files.readString(path);
                           ^
~~~

ده **خطأ compile**، البرنامج مش هيشتغل أصلًا. ده معنى checked: الـ compiler بيفحص إنك قررت: يا تمسكها (caught) يا تعلن عنها (declared).

---

## ٣. method بترمي unchecked exception

~~~java
static int parsePort(String raw) {
    return Integer.parseInt(raw.strip());
}
~~~

- [[raw.strip()]]: شيل المسافات من الأول والآخر.
- [[Integer.parseInt(...)]]: حوّل لـ int. لو الـ String مش رقم بترمي [[NumberFormatException]]، وده تحت [[RuntimeException]]، يعني unchecked: مفيش [[throws]] ومفيش حد بيجبرك تمسكها.

---

## ٤. main: مسك الـ checked

~~~java
    try {
        IO.println(readConfig(Path.of("missing.txt")));
    } catch (NoSuchFileException e) {
        IO.println("no file: " + e.getMessage());
    } catch (IOException e) {
        throw new UncheckedIOException(e);
    }
~~~

- [[Path.of("missing.txt")]]: مسار لملف في الفولدر الحالي.
- [[try { ... }]]: جرّب الكود ده.
- [[catch (NoSuchFileException e)]]: لو حصل exception من النوع ده امسكه، و [[e]] هو الـ exception نفسه. [[NoSuchFileException]] نوع من [[IOException]] (بيورث منها).
- [[e.getMessage()]]: رسالة الخطأ. هنا اسم الملف بس.
- [[catch (IOException e)]]: أي IOException تانية (مثلًا مفيش صلاحية). مش عارفين نتصرف، فـ [[throw new UncheckedIOException(e)]]: بنلفها في exception unchecked وبنرميها، والـ [[e]] اللي جواها اسمه **cause**، فالسبب الأصلي مش بيضيع.

~~~text الناتج
no file: missing.txt
~~~

### الترتيب مهم

الـ catch بيتجرب من فوق لتحت، وأول واحد يطابق هو اللي بيمسك. جرّبنا نحط [[IOException]] الأول:

~~~text الناتج
Main.java:11: error: exception NoSuchFileException has already been caught
    } catch (NoSuchFileException e) {
      ^
~~~

[[IOException]] أعم، فهتمسك [[NoSuchFileException]] قبل ما توصل للـ catch بتاعها، والـ compiler بيرفض كود عمره ما هيتنفذ. القاعدة: **الأخص الأول**.

### لو شلت الـ try/catch خالص

نفس خطأ «unreported exception» بس على سطر النداء:

~~~text الناتج
Main.java:7: error: unreported exception IOException; must be caught or declared to be thrown
    IO.println(readConfig(Path.of("missing.txt")));
                         ^
~~~

ولو كتبت [[void main() throws IOException]] الـ compile يعدّي، والبرنامج يقع وقت التشغيل:

~~~text الناتج
Exception in thread "main" java.nio.file.NoSuchFileException: missing.txt
	at java.base/sun.nio.fs.UnixException.translateToIOException(UnixException.java:92)
	...
	at java.base/java.nio.file.Files.readString(Files.java:3006)
	at Main.main(Main.java:4)
~~~

(جرّبناها بنسخة أقصر فيها [[Files.readString]] جوه main على طول، وشلنا سطور من النص. [[UnixException]] لأنه اتشغّل على لينكس، وعلى ويندوز هتلاقي [[WindowsException]].)

---

## ٥. main: الـ unchecked و finally

~~~java
    IO.println(parsePort(" 8080 "));
~~~

~~~text الناتج
8080
~~~

[[strip()]] شالت المسافات، و [[parseInt]] حوّلت.

~~~java
    try {
        parsePort("abc");
    } catch (NumberFormatException e) {
        IO.println(e.getMessage());
    } finally {
        IO.println("finally runs always");
    }
~~~

- مسكنا [[NumberFormatException]] مع إنها unchecked، لأننا عارفين نتصرف (اختياري، مش إجباري).
- [[finally]]: بيتنفذ **دايمًا**: لو حصل exception أو لأ، ولو فيه [[return]] جوه الـ try.

~~~text الناتج
For input string: "abc"
finally runs always
~~~

ولو مسكتهاش، البرنامج كان هيقع بـ:

~~~text الناتج
Exception in thread "main" java.lang.NumberFormatException: For input string: "abc"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
	at java.base/java.lang.Integer.parseInt(Integer.java:565)
~~~

---

## ٦. الشجرة

| النوع | تحت مين | checked؟ | أمثلة |
|---|---|---|---|
| [[Error]] | [[Throwable]] | لأ | [[OutOfMemoryError]]: متمسكهاش |
| [[Exception]] | [[Throwable]] | أيوه | [[IOException]] و [[NoSuchFileException]] |
| [[RuntimeException]] | [[Exception]] | لأ | [[NumberFormatException]] و [[NullPointerException]] و [[IllegalArgumentException]] |

القاعدة: أي حاجة تحت [[RuntimeException]] (أو [[Error]]) unchecked، والباقي checked.

---

## الخلاصة

- checked ([[IOException]]): الـ compiler بيجبرك: [[try/catch]] أو [[throws]].
- unchecked (تحت [[RuntimeException]]): مش لازم، والغلطة بتظهر وقت التشغيل.
- الـ catch الأخص قبل الأعم.
- [[finally]] بيتنفذ دايمًا.
- لو هتلف exception، ابعت الأصل معاها ([[new UncheckedIOException(e)]]).`,
          lines: [
            "الـ checked exception الأشهر.",
            R`[[Files]] و [[Path]] للملفات.`,
            R`[[throws IOException]]: الـ method بتقول «ممكن أرمي ده، واللي بيناديني يتصرف».`,
            R`[[readString]] بترمي IOException (checked).`,
            "قفلة.",
            R`مفيش [[throws]]: [[parseInt]] بترمي [[NumberFormatException]] وهي unchecked.`,
            "تحويل string لـ int.",
            "قفلة.",
            "main.",
            R`[[try]] زي JS.`,
            "الملف مش موجود.",
            R`الأخص الأول: [[NoSuchFileException]] نوع من IOException.`,
            R`[[no file: missing.txt]].`,
            R`أي IOException تانية.`,
            R`نلفها في unchecked ونرميها، ومعاها الأصل.`,
            "قفلة.",
            R`[[8080]].`,
            "try تاني.",
            "string مش رقم.",
            R`نمسك unchecked لأننا عارفين نتصرف.`,
            R`[[For input string: "abc"]].`,
            R`[[finally]]: بيتنفذ في كل الحالات.`,
            R`[[finally runs always]].`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`١. من غير [[throws IOException]]: [[error: unreported exception IOException; must be caught or declared to be thrown]] على سطر [[Files.readString]]. الـ compiler بيجبرك تقرر.

٢. من غير الـ try/catch حوالين النداء: نفس الخطأ بس على سطر النداء في main. المسؤولية اتنقلت للي بينادي. (أو اكتب [[void main() throws IOException]]، ولو الملف مش موجود البرنامج هيقع بـ stack trace.)

٣. [[IOException]] قبل [[NoSuchFileException]]: [[error: exception NoSuchFileException has already been caught]]. الـ catch الأعم بيمسك كل حاجة قبل ما الأخص يتوصله.`
        },
        {
          cmd: "try-with-resources و custom exceptions",
          title: "تقفل الملفات والاتصالات لوحدها، وتعمل exception بمعلومات مفيدة",
          desc: R`أي حاجة لازم تتقفل بعد ما تخلص (ملف، أو connection، أو stream) بتتفتح في [[try (...)]]: Java بتقفلها أوتوماتيك في الآخر، حتى لو حصل exception. زي [[await using]] في JS الحديث.

والـ exception بتاعك: class بيورث من [[RuntimeException]] (غالبًا)، وفيه رسالة واضحة، ولو محتاج حقول زيادة (المبلغ الناقص، أو الـ id) ضيفها. وفي Spring كل exception من دول بيتحول لـ HTTP status برسالة مفهومة في مكان واحد.`,
          example: R`import java.io.*;
import java.nio.file.*;

class InsufficientFundsException extends RuntimeException {
    private final long missing;
    InsufficientFundsException(long missing) {
        super("missing " + missing + " cents");
        this.missing = missing;
    }
    long missing() { return missing; }
}

void withdraw(long balance, long amount) {
    if (amount > balance) throw new InsufficientFundsException(amount - balance);
}

void main() throws IOException {
    Path file = Files.writeString(Path.of("notes.txt"), "line 1\nline 2\n");
    try (BufferedReader reader = Files.newBufferedReader(file)) {
        IO.println(reader.readLine());
    }
    try {
        withdraw(100, 250);
    } catch (InsufficientFundsException e) {
        IO.println(e.getMessage() + " / " + e.missing());
    }
    Files.delete(file);
}`,
          try: R`اعمل class اسمه [[Resource]] بيعمل implements لـ [[AutoCloseable]] وبيطبع [["open"]] في الـ constructor و [["close"]] في [[close()]]. استخدمه في try-with-resources وارمي exception من جوه الـ try: [["close"]] اتطبعت قبل ولا بعد الـ catch؟`,
          flag: "script",
          deep: {
            why: R`connection مفتوحة ومتقفلتش = connection pool بيخلص بعد ساعة والتطبيق يهنج (أشهر مشاكل الإنتاج). والـ exceptions العامة ([[RuntimeException("error")]]) بتخلي الـ API يرجع 500 لكل حاجة، والـ logs مش مفهومة.`,
            how: R`أي class بينفذ [[AutoCloseable]] (فيه [[close()]]) ينفع في try-with-resources. Java بتنادي [[close()]] بعد الـ try block بالعكس من ترتيب الفتح، وقبل الـ catch و finally. ولو الـ try رمى exception والـ close كمان رمى، الأصلي هو اللي بيطلع والتاني بيتحط جواه كـ suppressed ([[getSuppressed()]]).

الـ custom exception: بيورث من [[RuntimeException]] عشان متجبرش كل اللي فوق يكتبوا throws، و [[super(message)]] للرسالة، وكمان [[super(message, cause)]] لو بتلف exception تاني.

في Spring غالبًا مش هتفتح connections بإيدك (Spring و Hibernate بيعملوا كده)، بس هتفتح ملفات و HTTP clients و streams.`,
            when: R`try-with-resources مع أي [[Closeable]] أو [[AutoCloseable]]، دايمًا. و custom exceptions لكل خطأ business ليه معنى: [[NotFoundException]] و [[InsufficientFundsException]] و [[DuplicateEmailException]]، عشان تتحول لـ 404 و 422 و 409 في مكان واحد.`,
            mistakes: R`تفتح stream أو reader وتقفله في آخر الـ try بإيدك: لو حصل exception قبله مش هيتقفل. و exception لكل حاجة صغيرة لحد ما يبقى عندك ٥٠ class. وتستخدم exceptions للـ flow العادي (زي «لو المستخدم مش موجود اعمل واحد»): الأبطأ والأصعب في القراية؛ استخدم Optional.`
          },
          teach: R`## البرنامج بيعمل إيه؟

جزئين: بيكتب ملف ويقرا أول سطر منه بـ reader بيتقفل لوحده (try-with-resources)، وبيعرّف exception بتاعه ([[InsufficientFundsException]]) فيه حقل زيادة، ويرميه ويمسكه. اتشغّل بـ [[java Main.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25):

~~~text الناتج
line 1
missing 150 cents / 150
~~~

---

## ١. الـ imports

~~~java
import java.io.*;
import java.nio.file.*;
~~~

[[java.io]] فيه [[BufferedReader]] و [[IOException]]، و [[java.nio.file]] فيه [[Files]] و [[Path]].

---

## ٢. الـ exception بتاعك

~~~java
class InsufficientFundsException extends RuntimeException {
    private final long missing;
    InsufficientFundsException(long missing) {
        super("missing " + missing + " cents");
        this.missing = missing;
    }
    long missing() { return missing; }
}
~~~

- [[extends RuntimeException]]: بيورث من RuntimeException، فبقى **unchecked** (درس checked و unchecked): اللي بينادي مش مجبر يكتب [[throws]].
- [[private final long missing]]: معلومة زيادة غير الرسالة: المبلغ الناقص. اللي يمسك الـ exception يقدر يستخدمها كرقم (يعرضها، أو يرجعها في JSON) من غير ما يقرا الرسالة ويقطّعها.
- [[super("missing " + missing + " cents")]]: بينادي constructor الأب ([[RuntimeException]]) بالرسالة. دي اللي [[getMessage()]] هترجعها. ولازم يبقى أول سطر في الـ constructor.
- [[this.missing = missing]]: [[this.missing]] الحقل، و [[missing]] لوحدها الباراميتر.
- [[long missing()]]: getter بنفس شكل الـ records.

---

## ٣. رمي الـ exception

~~~java
void withdraw(long balance, long amount) {
    if (amount > balance) throw new InsufficientFundsException(amount - balance);
}
~~~

[[throw new ...]] زي JS: اعمل الـ object وارميه. البرنامج بيسيب الـ method فورًا ويطلع لحد أول catch مناسب.

---

## ٤. main: try-with-resources

~~~java
void main() throws IOException {
    Path file = Files.writeString(Path.of("notes.txt"), "line 1\nline 2\n");
~~~

- [[throws IOException]] على main: الكتابة والقراية ممكن ترمي IOException (checked)، ومش هنمسكها هنا.
- [[Files.writeString(path, text)]]: بيكتب الملف (ويعمله لو مش موجود) وبيرجع الـ [[Path]] نفسه، فحفظناه في [[file]].
- [[\n]] سطر جديد، فالملف فيه سطرين.

~~~java
    try (BufferedReader reader = Files.newBufferedReader(file)) {
        IO.println(reader.readLine());
    }
~~~

- [[try (...)]]: الأقواس بعد [[try]] هي الفرق. أي object بيتعمل جواها لازم يكون [[AutoCloseable]] (يعني فيه method اسمها [[close()]])، و Java بتنادي [[close()]] لوحدها أول ما الـ block يخلص، حتى لو حصل exception.
- [[Files.newBufferedReader(file)]]: reader بيقرا الملف حتة حتة (buffered) بدل ما يحمّله كله.
- [[reader.readLine()]]: السطر الأول من غير الـ [[\n]].
- مفيش [[catch]] هنا ولا [[finally]]: الـ try ده وظيفته القفل بس.

~~~text الناتج
line 1
~~~

من غير try-with-resources كنت هتكتب [[reader.close()]] بإيدك في [[finally]]، ولو نسيته الملف يفضل مفتوح. ومع connections الداتابيز ده بيخلّص الـ pool ويهنّج التطبيق.

---

## ٥. main: مسك الـ exception بتاعك

~~~java
    try {
        withdraw(100, 250);
    } catch (InsufficientFundsException e) {
        IO.println(e.getMessage() + " / " + e.missing());
    }
    Files.delete(file);
~~~

- [[withdraw(100, 250)]]: الرصيد ١٠٠ والمطلوب ٢٥٠، فـ [[amount - balance]] = ١٥٠.
- [[catch (InsufficientFundsException e)]]: بنمسك النوع بتاعنا بالظبط، فنقدر ننادي [[e.missing()]].
- [[Files.delete(file)]]: بيمسح ملف التجربة.

~~~text الناتج
missing 150 cents / 150
~~~

الجزء الأول من [[getMessage()]] (الرسالة اللي بعتناها لـ super)، والتاني من الحقل كرقم.

---

## ٦. ترتيب القفل لما يحصل exception

الحل في «جرّب»: class بيطبع [["open"]] و [["close"]]:

~~~java
class Resource implements AutoCloseable {
    Resource() { IO.println("open"); }
    @Override public void close() { IO.println("close"); }
}

void main() {
    try (var r = new Resource()) {
        throw new IllegalStateException("boom");
    } catch (IllegalStateException e) {
        IO.println("caught: " + e.getMessage());
    } finally {
        IO.println("finally");
    }
}
~~~

- [[implements AutoCloseable]]: الـ class وعد إن فيه [[close()]]، فينفع في [[try (...)]].
- [[@Override public void close()]]: تنفيذنا لـ close. لازم [[public]] لأنها في الـ interface public.

~~~text الناتج
open
close
caught: boom
finally
~~~

الترتيب: الـ resource اتفتح، والـ exception اترمى، وبعدين **[[close]] الأول**، وبعدين [[catch]]، وبعدين [[finally]]. يعني جوه الـ catch الـ resource مقفول خلاص.

### أكتر من resource، والـ close نفسه بيرمي

جرّبنا اتنين resources ([[a]] و [[b]])، والـ body بيرمي، وكل [[close]] كمان بيرمي:

~~~text الناتج
open a
open b
close b
close a
caught: body failed
suppressed: close failed b
suppressed: close failed a
~~~

- القفل **بالعكس** من الفتح: [[b]] الأول (زي ما بتقفل الأبواب وانت خارج).
- الـ exception اللي وصل للـ catch هو الأصلي ([[body failed]])، وأخطاء الـ close اتحطت جواه كـ suppressed، وبتجيبها بـ [[e.getSuppressed()]]. فمفيش خطأ بيضيع.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| قفل أوتوماتيك | [[try (var x = ...) { }]] مع أي [[AutoCloseable]] |
| ترتيب القفل | بالعكس من الفتح، وقبل catch و finally |
| exception بتاعك | [[class XException extends RuntimeException]] |
| الرسالة | [[super(message)]] أو [[super(message, cause)]] |
| معلومة زيادة | حقل [[final]] و getter |

- أي ملف أو reader أو connection: try-with-resources دايمًا.
- exception لكل خطأ business ليه معنى، عشان يتحول لـ HTTP status في مكان واحد في Spring.`,
          lines: [
            "الـ IO القديم (Reader).",
            R`[[Files]].`,
            R`exception بتاعنا، unchecked لأنه تحت RuntimeException.`,
            "معلومة زيادة: المبلغ الناقص.",
            "constructor.",
            R`[[super]] بيحط الرسالة اللي [[getMessage()]] هترجعها.`,
            "الحقل.",
            "قفلة.",
            "getter.",
            "قفلة الـ class.",
            "method بترمي الـ exception بتاعنا.",
            R`[[throw new]] زي JS.`,
            "قفلة.",
            R`main بتقول إنها ممكن ترمي IOException (checked).`,
            "نكتب ملف تجربة.",
            R`try-with-resources: الـ reader هيتقفل لوحده.`,
            R`[[line 1]].`,
            "هنا الـ reader اتقفل.",
            "try عادي.",
            "سحب أكتر من الرصيد.",
            "نمسك النوع بتاعنا بالظبط.",
            R`[[missing 150 cents / 150]].`,
            "قفلة.",
            "نمسح ملف التجربة.",
            "قفلة."
          ],
          sol: R`الترتيب: [[open]]، وبعدين [[close]]، وبعدين [[caught: boom]]، وبعدين [[finally]]. الـ close بيتنادى أول ما الـ try block يخلص (حتى لو بـ exception)، وقبل الـ catch. ده مهم: جوه الـ catch الـ resource مقفول خلاص، فمتحاولش تستخدمه هناك.`,
          solCode: R`class Resource implements AutoCloseable {
    Resource() { IO.println("open"); }
    @Override public void close() { IO.println("close"); }
}

void main() {
    try (var r = new Resource()) {
        throw new IllegalStateException("boom");
    } catch (IllegalStateException e) {
        IO.println("caught: " + e.getMessage());
    } finally {
        IO.println("finally");
    }
}`
        }
      ]
    },
    {
      t: "تطبيقات ديسكتوب بـ Java (JavaFX و Swing)",
      l: 1,
      n: "برنامج ليه شباك وزراير على الكمبيوتر، وبعدين jar أو installer يتسطّب من غير ما اليوزر يكون عنده Java",
      items: [
        {
          cmd: "تطبيقات ديسكتوب: واجهات JavaFX و Swing",
          title: "تعمل برنامج ديسكتوب بشباك وزرار بـ Java إزاي، وتختار JavaFX ولا Swing؟",
          desc: R`Java مش للسيرفرات بس: تقدر تعمل بيها برنامج ليه شباك وزراير يشتغل على Windows و macOS و Linux. IntelliJ IDEA نفسه و NetBeans و Apache JMeter برامج ديسكتوب مكتوبة بـ Java.

عندك مكتبتين:
• [[Swing]]: جوه الـ JDK من زمان ([[javax.swing]])، فمش محتاج تنزّل أي حاجة. شكلها الافتراضي قديم شوية، بس ثابتة ومستخدمة في برامج كبيرة وأدوات داخلية كتير.
• [[JavaFX]]: أحدث، وفيها تنسيق بـ CSS، وتصميم الشاشات في ملفات FXML، و animations. بس من Java 11 مبقتش جوه الـ JDK: بتضيفها كمكتبة اسمها OpenJFX (من Maven أو Gradle، أو SDK بتنزّله من openjfx.io).
لو هتبدأ برنامج جديد، JavaFX غالبًا الاختيار الأريح. ولو بتعدّل برنامج قديم، غالبًا هتلاقيه Swing.

برنامج JavaFX شكله ثابت:
• الكلاس بيورث من [[Application]] ([[extends]] من درس «extends و abstract»).
• JavaFX بينادي دالة [[start]] وبيديك [[Stage]]: ده الشباك نفسه (العنوان وزراير القفل).
• جوه الشباك [[Scene]]: المحتوى كله، ومقاسه.
• والمحتوى عناصر (اسمها nodes) زي [[Label]] (كلام) و [[Button]] (زرار)، جوه layout زي [[VBox]] اللي بيرصهم تحت بعض.
• [[main]] بتنادي [[launch]]، و launch هي اللي بتجهّز JavaFX وتنادي start.

[[e -> message.setText(...)]] ده lambda (درس «lambdas»): الكود اللي يتنفذ لما الزرار يتضغط. و [[@Override]] بتقول إن start دي بتاعة Application وانت بتكتب نسختك منها.

الدرس الجاي بيحوّل البرنامج لملف تقدر تديه لحد يسطّبه.`,
          example: R`import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

// البرنامج بيورث من Application
public class DesktopApp extends Application {
  // JavaFX بينادي start وبيديك الشباك (Stage)
  @Override
  public void start(Stage stage) {
    Label message = new Label("Hello from JavaFX!");
    Button button = new Button("Click me");
    button.setOnAction(e -> message.setText("Button clicked!"));

    // VBox بيرص العناصر تحت بعض بمسافة 15 بيكسل
    VBox root = new VBox(15, message, button);
    Scene scene = new Scene(root, 360, 200);

    stage.setTitle("My first JavaFX app");
    stage.setScene(scene);
    stage.show();
  }

  public static void main(String[] args) {
    launch(args);
  }
}`,
          try: R`أسهل طريق: في IntelliJ IDEA اعمل New Project واختار JavaFX من القايمة الشمال (بيعمل مشروع Maven فيه JavaFX جاهزة). اعمل class جديدة اسمها [[DesktopApp]] جنب الكلاس اللي اتعمل، والصق الكود تحت سطر الـ [[package]]، واضغط Run الأخضر جنب [[main]]. اضغط الزرار وشوف الكلام بيتغير. ولو مش عايز تنزّل JavaFX دلوقتي، جرّب نسخة Swing اللي تحت في الحل: بتشتغل بـ [[java SwingApp.java]] على طول.`,
          flag: "script",
          deep: {
            why: R`فيه برامج مكانها الكمبيوتر مش المتصفح: برنامج كاشير في محل، أو أداة بتشتغل على ملفات كتير على الجهاز، أو برنامج لازم يشتغل من غير نت. ولو انت عارف Java أصلًا، تقدر تعملها من غير ما تتعلم لغة تانية، ونفس الكود يشتغل على الأنظمة التلاتة.`,
            how: R`JavaFX بيبني الشاشة شجرة: الـ Stage جواه Scene، والـ Scene جواها root (هنا VBox)، والـ root جواه الـ Label والـ Button. لما تغيّر حاجة في الشجرة (زي [[setText]]) JavaFX بيرسم التغيير في الفريم الجاي، وبيستخدم كارت الشاشة في الرسم لما يقدر.

كل حاجة ليها علاقة بالواجهة لازم تحصل على thread واحد اسمه JavaFX Application Thread. [[start]] والـ lambda بتاعة الزرار بيشتغلوا عليه أصلًا، فمفيش مشكلة هنا. بس لو عملت شغل تقيل (تحميل ملف كبير) على thread تاني وعايز تحدّث الواجهة بعده، استخدم [[Platform.runLater(() -> ...)]].

ليه مش [[java DesktopApp.java]] على طول زي باقي دروس Java؟ لأن JavaFX مش جوه الـ JDK. لو نزّلت الـ SDK من openjfx.io بتترجم وتشغّل كده:
[[javac --module-path PATH_TO_FX/lib --add-modules javafx.controls -d out DesktopApp.java]]
[[java --module-path PATH_TO_FX/lib --add-modules javafx.controls -cp out DesktopApp]]
وطريقة الملف الواحد اشتغلت كمان مع JDK 25 و JavaFX 25 لو ضفت نفس الـ module-path: [[java --module-path PATH_TO_FX/lib --add-modules javafx.controls DesktopApp.java]]. بس أول ما البرنامج يبقى أكتر من ملف، الترجمة بـ javac الأول (أو Maven) هي الطريقة العادية.`,
            when: "أدوات داخلية لشركة، أو برامج نقاط بيع، أو برامج لازم تشتغل offline أو تتعامل مع ملفات وأجهزة متوصلة بالكمبيوتر. لو البرنامج محتاج يتفتح من أي مكان ومن الموبايل، غالبًا موقع ويب أنسب.",
            mistakes: R`تحاول [[java DesktopApp.java]] من غير JavaFX فيطلعلك [[package javafx.application does not exist]]. تحدّث الواجهة من thread تاني فيطلعلك [[IllegalStateException: Not on FX application thread]] أو الواجهة تتصرف غلط: استخدم [[Platform.runLater]]. وتعمل شغل تقيل جوه الـ lambda بتاعة الزرار، فالشباك كله يهنّج لحد ما يخلص.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيفتح شباك عنوانه «My first JavaFX app»، فيه كلام وتحته زرار. لما تدوس الزرار الكلام بيتغير. والحل فيه نفس البرنامج بـ Swing.

> **اتجرّب إزاي؟** الشباك محتاج شاشة، والـ container مفيهوش. فترجمنا الكود بـ JDK 25 (الـ image [[maven:3.9-eclipse-temurin-25]]) مع JavaFX 25 من Maven Central، وشغّلناه على شاشة وهمية اسمها Xvfb (برنامج لينكس بيعمل شاشة في الذاكرة من غير ما تتعرض). البرنامج اشتغل من غير أخطاء، وبنسخة فيها سطور طباعة زيادة اتأكدنا من العنوان والمقاس وإن الزرار بيغيّر الكلام. شكل الشباك نفسه على الشاشة من الـ docs.

---

## ١. الـ imports: كل حاجة جاية منين

~~~java
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
~~~

| الـ class | الـ package | هو إيه |
|---|---|---|
| [[Application]] | [[javafx.application]] | الأساس اللي البرنامج بيورث منه |
| [[Stage]] | [[javafx.stage]] | الشباك نفسه (العنوان وزراير القفل والتصغير) |
| [[Scene]] | [[javafx.scene]] | المحتوى اللي جوه الشباك |
| [[Button]] و [[Label]] | [[javafx.scene.control]] | عناصر (controls): زرار وكلام |
| [[VBox]] | [[javafx.scene.layout]] | layout بيرص العناصر تحت بعض (V = Vertical) |

الـ packages دي **مش** جوه الـ JDK. لو ترجمت من غير JavaFX:

~~~text الناتج
DesktopApp.java:1: error: package javafx.application does not exist
import javafx.application.Application;
                         ^
DesktopApp.java:2: error: package javafx.scene does not exist
import javafx.scene.Scene;
                   ^
~~~

---

## ٢. الكلاس

~~~java
public class DesktopApp extends Application {
  @Override
  public void start(Stage stage) {
~~~

- [[extends Application]]: البرنامج «نوع من» Application (درس extends و abstract). [[Application]] فيه method اسمها [[start]] abstract، يعني لازم انت تكتبها.
- [[@Override]]: بتقول للـ compiler «أنا بكتب نسختي من method موجودة في الأب». لو كتبت الاسم غلط ([[strat]]) هيطلع خطأ بدل ما يعدّي ساكت.
- [[start(Stage stage)]]: انت مش بتنادي start. JavaFX هو اللي بيناديها لما يجهز، وبيديك الشباك الأساسي في [[stage]].
- الملف لازم اسمه [[DesktopApp.java]] لأن الكلاس [[public]].

---

## ٣. العناصر والزرار

~~~java
    Label message = new Label("Hello from JavaFX!");
    Button button = new Button("Click me");
    button.setOnAction(e -> message.setText("Button clicked!"));
~~~

- [[new Label("...")]]: كلام بيتعرض، والنص الأولي بين القوسين.
- [[new Button("Click me")]]: زرار مكتوب عليه Click me.
- [[setOnAction(...)]]: «لما الزرار يتضغط نفّذ ده». بتاخد lambda (درس lambdas):
  - [[e]]: الـ event (معلومات عن الضغطة). مش مستخدم هنا بس لازم يتكتب.
  - [[message.setText("Button clicked!")]]: غيّر كلام الـ Label. والـ lambda قادرة تشوف [[message]] لأنه متغير محلي محدش بيغيّره (effectively final).

في التجربة ناديت [[button.fire()]] (بيعمل نفس الضغطة من الكود)، وبعدها [[message.getText()]] رجعت:

~~~text الناتج
after fire: Button clicked!
~~~

---

## ٤. الـ layout والـ Scene

~~~java
    VBox root = new VBox(15, message, button);
    Scene scene = new Scene(root, 360, 200);
~~~

- [[new VBox(15, message, button)]]: أول رقم المسافة بين العناصر (15 بيكسل)، وبعده العناصر بالترتيب: الكلام فوق، والزرار تحته. اسمه [[root]] لأنه أول عنصر في شجرة الشاشة.
- [[new Scene(root, 360, 200)]]: المحتوى بمقاس 360 عرض × 200 طول.

الشجرة كلها:

~~~text شجرة الشاشة
Stage (الشباك)
  Scene (360 × 200)
    VBox (root، مسافة 15)
      Label  "Hello from JavaFX!"
      Button "Click me"
~~~

في التجربة طبعنا الأماكن بعد العرض: الـ Label عند [[y=0]] والزرار عند [[y=31]]. يعني الكلام طوله حوالي 16 بيكسل + الـ 15 مسافة.

---

## ٥. عرض الشباك

~~~java
    stage.setTitle("My first JavaFX app");
    stage.setScene(scene);
    stage.show();
  }
~~~

- [[setTitle]]: الكلام اللي في شريط الشباك فوق.
- [[setScene(scene)]]: حط المحتوى في الشباك.
- [[show()]]: اعرضه. من غيرها الشباك موجود في الذاكرة بس مش ظاهر.

~~~text الناتج
shown: My first JavaFX app 360.0x200.0 label=Hello from JavaFX! at x=0.0 y=0.0 button y=31.0
~~~

---

## ٦. main و launch

~~~java
  public static void main(String[] args) {
    launch(args);
  }
~~~

[[launch(args)]] (method static في [[Application]]) هي اللي بتعمل كل الشغل: بتشغّل JavaFX، وتعمل object من [[DesktopApp]]، وتعمل الشباك الأساسي، وتنادي [[start]] عليه. وبتفضل مستنية لحد ما آخر شباك يتقفل، وبعدين البرنامج يخلص.

---

## ٧. الترجمة والتشغيل من الترمنال

لو نزّلت JavaFX SDK من openjfx.io (أو jars من Maven Central زي ما عملنا):

~~~bash
javac --module-path PATH_TO_FX/lib --add-modules javafx.controls -d out DesktopApp.java
java --module-path PATH_TO_FX/lib --add-modules javafx.controls -cp out DesktopApp
~~~

| الحتة | معناها |
|---|---|
| [[--module-path PATH_TO_FX/lib]] | فين ملفات JavaFX (الـ modules) |
| [[--add-modules javafx.controls]] | استخدم module الـ controls، وهو بيجيب معاه [[javafx.graphics]] و [[javafx.base]] |
| [[-d out]] | حط الـ [[.class]] في فولدر out |
| [[-cp out]] | الـ classpath: دوّر على الكلاسات بتاعتي في out |

وجرّبنا كمان طريقة الملف الواحد من غير javac: [[java --module-path fxlib --add-modules javafx.controls DesktopApp.java]] واشتغلت برضه على JDK 25.

ولو حطيت JavaFX في الـ classpath بدل الـ module-path ([[java -cp "out:fxlib/*" DesktopApp]]):

~~~text الناتج
Error: JavaFX runtime components are missing, and are required to run this application
~~~

وفي التجربة، تحذيرات زي [[WARNING: A restricted method in java.lang.System has been called]] بتظهر مع JDK 25 لأن JavaFX بيحمّل مكتبات native. مش خطأ، وبتختفي لو زوّدت [[--enable-native-access=javafx.graphics]].

---

## ٨. الحل: نفس البرنامج بـ Swing

~~~java
import javax.swing.*;
~~~

Swing جوه الـ JDK ([[javax.swing]])، فمفيش أي حاجة تنزّلها: [[java SwingApp.java]] على طول.

~~~java
    SwingUtilities.invokeLater(() -> {
~~~

كل حاجة في الواجهة لازم تحصل على thread واحد اسمه Event Dispatch Thread. [[invokeLater]] بتاخد lambda (من غير باراميترات) وبتنفذها على الـ thread ده. ده المقابل لـ [[Platform.runLater]] في JavaFX.

~~~java
      JFrame frame = new JFrame("My first Swing app");
      JLabel message = new JLabel("Hello from Swing!");
      JButton button = new JButton("Click me");
      button.addActionListener(e -> message.setText("Button clicked!"));
~~~

| Swing | JavaFX |
|---|---|
| [[JFrame]] (الشباك والعنوان) | [[Stage]] |
| [[JLabel]] | [[Label]] |
| [[JButton]] | [[Button]] |
| [[addActionListener]] | [[setOnAction]] |

~~~java
      JPanel panel = new JPanel();
      panel.add(message);
      panel.add(button);
      frame.add(panel);
~~~

[[JPanel]] حاوية. الـ layout الافتراضي بتاعها اسمه FlowLayout: بيرص العناصر **جنب بعض** في سطر، ومتوسطين. اتأكدنا: الـ layout طلع [[FlowLayout]]، والكلام عند [[x=70]] والزرار عند [[x=199]] في نفس السطر.

~~~java
      frame.setSize(360, 200);
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setVisible(true);
~~~

- [[setSize]]: المقاس.
- [[EXIT_ON_CLOSE]]: لما الشباك يتقفل، البرنامج كله يخلص. من غيرها الشباك يختفي والبرنامج يفضل شغال في الخلفية.
- [[setVisible(true)]]: اعرض (زي [[show()]]).

في التجربة [[button.doClick()]] غيّرت الكلام لـ [[Button clicked!]]. ولو شغّلت Swing من غير أي شاشة (container عادي):

~~~text الناتج
Exception in thread "AWT-EventQueue-0" java.awt.HeadlessException:
No X11 DISPLAY variable was set,
or no headful library support was found,
but this program performed an operation which requires it.
~~~

[[AWT-EventQueue-0]] هو اسم الـ Event Dispatch Thread، و [[X11]] نظام الشاشات على لينكس. على ويندوز أو ماك عادي مش هتشوف ده.

---

## الخلاصة

| | JavaFX | Swing |
|---|---|---|
| موجود في الـ JDK؟ | لأ، مكتبة OpenJFX | أيوه |
| الشباك | [[Stage]] | [[JFrame]] |
| المحتوى | [[Scene]] + layout | [[JPanel]] |
| تحت بعض | [[VBox]] | [[BoxLayout]] أو [[GridLayout]] |
| الزرار | [[setOnAction(e -> ...)]] | [[addActionListener(e -> ...)]] |
| thread الواجهة | [[Platform.runLater]] | [[SwingUtilities.invokeLater]] |
| البداية | [[launch(args)]] ← [[start]] | [[main]] على طول |

- الشغل التقيل ميتعملش جوه lambda الزرار، وإلا الشباك يهنّج.
- أي تحديث للواجهة من thread تاني يروح عن طريق [[runLater]] أو [[invokeLater]].`,
          lines: [
            R`[[Application]]: الأساس اللي أي برنامج JavaFX بيورث منه.`,
            R`[[Scene]]: المحتوى اللي جوه الشباك.`,
            R`[[Button]]: زرار.`,
            R`[[Label]]: كلام بيتعرض.`,
            R`[[VBox]]: layout بيرص العناصر تحت بعض.`,
            R`[[Stage]]: الشباك نفسه.`,
            R`الكلاس بيورث من Application.`,
            R`[[@Override]]: هنكتب نسختنا من start.`,
            R`JavaFX بينادي start ويديك الشباك في [[stage]].`,
            R`[[new Label(...)]]: كلام أوله «Hello from JavaFX!».`,
            R`زرار مكتوب عليه «Click me».`,
            R`لما الزرار يتضغط، غيّر كلام الـ Label. [[e]] هو الـ event (مش مستخدم هنا).`,
            R`VBox: مسافة 15 بين العناصر، وجواه الكلام والزرار.`,
            R`المحتوى بمقاس 360 عرض × 200 طول.`,
            R`العنوان اللي فوق في شريط الشباك.`,
            R`حط المحتوى في الشباك.`,
            R`اعرض الشباك.`,
            R`آخر start.`,
            R`[[main]] نقطة البداية.`,
            R`[[launch]] بيجهّز JavaFX وينادي start.`,
            R`آخر main.`,
            R`آخر الكلاس.`
          ],
          sol: R`بيفتح شباك صغير عنوانه «My first JavaFX app»، فيه فوق «Hello from JavaFX!» وتحته زرار «Click me»، الاتنين على الشمال لأن VBox بيرص من فوق ومن الشمال افتراضيًا. لما تضغط الزرار الكلام بيبقى «Button clicked!». والبرنامج بيقفل لما تقفل الشباك.

لو طلعلك [[package javafx.application does not exist]] أو [[JavaFX runtime components are missing]]، يبقى JavaFX مش متضافة للمشروع: استخدم مشروع IntelliJ بتاع JavaFX أو أوامر [[--module-path]] اللي في «إزاي».

نسخة Swing من نفس البرنامج (احفظها [[SwingApp.java]] وشغّلها بـ [[java SwingApp.java]]، مش محتاجة أي حاجة غير الـ JDK): بتفتح شباك فيه الكلام والزرار جنب بعض في سطر واحد في نص الشباك من فوق، لأن [[JPanel]] بيرص العناصر جنب بعض افتراضيًا. نفس الفكرة بالظبط: شباك ([[JFrame]])، وعناصر، و lambda للزرار. و [[SwingUtilities.invokeLater]] هي اللي بتخلي الواجهة تتعمل على الـ thread بتاعها، زي [[Platform.runLater]] في JavaFX.`,
          solCode: R`import javax.swing.*;

public class SwingApp {
  public static void main(String[] args) {
    SwingUtilities.invokeLater(() -> {
      JFrame frame = new JFrame("My first Swing app");
      JLabel message = new JLabel("Hello from Swing!");
      JButton button = new JButton("Click me");
      button.addActionListener(e -> message.setText("Button clicked!"));
      JPanel panel = new JPanel();
      panel.add(message);
      panel.add(button);
      frame.add(panel);
      frame.setSize(360, 200);
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setVisible(true);
    });
  }
}`
        },
        {
          cmd: "تحزيم ونشر برنامج ديسكتوب بـ jpackage",
          title: "تدّي برنامج Java لحد يسطّبه من غير ما يكون عنده Java إزاي؟ (jar و jpackage)",
          desc: R`لما البرنامج يخلص، مش هتبعت للناس ملفات [[.java]] ولا [[.class]]. عندك خطوتين:

١) ملف [[jar]]: كل الـ [[.class]] بتوع البرنامج متجمعين في ملف واحد (هو zip في الحقيقة)، وجواه سطر بيقول أنهي class فيها [[main]]. بيشتغل بـ [[java -jar app.jar]]، أو بدبل كليك عند ناس كتير. بس لازم الجهاز يكون عليه Java بنسخة مناسبة.

٢) [[jpackage]]: أداة جوه الـ JDK (من Java 16). بتاخد الـ jar، وتحط جنبه Java runtime خاص بالبرنامج (معمول بأداة اسمها [[jlink]])، وتطلّع installer عادي للنظام:
• Windows: [[.exe]] أو [[.msi]]. محتاج WiX Toolset متسطّب.
• macOS: [[.dmg]] أو [[.pkg]].
• Linux: [[.deb]] أو [[.rpm]].
اللي هيسطّب البرنامج مش محتاج يعرف إن فيه Java أصلًا.

حاجتين لازم تعرفهم قبل ما تبدأ:
• jpackage بيعمل installer للنظام اللي شغال عليه بس: الـ [[.exe]] لازم يتعمل على Windows، والـ [[.dmg]] على Mac. عشان كده الفرق بتعمل الـ installers على CI فيه أجهزة من الأنظمة التلاتة.
• الحجم: لأن جوه البرنامج Java runtime، حتى برنامج صغير بيطلع عشرات الميجات. تقدر تصغّره بإنك تحدد الـ modules اللي محتاجها بـ [[--add-modules]].

المثال بيحزّم نسخة Swing من الدرس اللي فات ([[SwingApp.java]] اللي في الحل هناك)، لأنها مش محتاجة أي مكتبة برا الـ JDK. برنامج JavaFX نفس الخطوات، بس بتزوّد لـ jpackage مكان JavaFX ([[--module-path]] لفولدر الـ jmods بتاعها) و [[--add-modules javafx.controls]].`,
          example: R`# ترجم الكود لـ bytecode في فولدر bin
javac -d bin SwingApp.java

# اجمعه في jar في فولدر dist، وقول فيه مين الكلاس اللي فيها main
jar --create --file dist/app.jar --main-class SwingApp -C bin .

# جرّب الـ jar
java -jar dist/app.jar

# installer لويندوز (على Windows، و WiX متسطّب)
jpackage --input dist --main-jar app.jar --name MyDesktopApp --type exe --win-shortcut --win-dir-chooser`,
          try: R`في فولدر فيه [[SwingApp.java]] نفّذ أول ٣ أوامر، واتأكد إن الشباك فتح من الـ jar. بعدين جرّب jpackage من غير installer خالص، وده بيشتغل على أي نظام ومش محتاج WiX: [[jpackage --input dist --main-jar app.jar --name MyDesktopApp --type app-image]]، وشغّل البرنامج من الفولدر اللي اتعمل، وشوف حجمه. ولو على Windows ومسطّب WiX، جرّب الأمر الرابع.`,
          flag: "script",
          deep: {
            why: R`أكبر مشكلة كانت في برامج Java الديسكتوب إن اليوزر لازم يسطّب Java الأول، وبالنسخة الصح. jpackage بيحل ده: كل برنامج معاه الـ runtime بتاعه، فمش فارق إيه اللي متسطّب على الجهاز، والبرنامج بيتسطّب ويتشال زي أي برنامج تاني.`,
            how: R`[[javac -d bin]] بيحط الـ [[.class]] في فولدر bin. [[jar --create]] بيجمعهم، و [[--main-class]] بيكتب في ملف جوه الـ jar اسمه [[MANIFEST.MF]] سطر [[Main-Class: SwingApp]]، ودا اللي بيخلي [[java -jar]] يعرف يبدأ منين. و [[-C bin .]] معناها «خش فولدر bin وخد كل اللي فيه».

jpackage بياخد كل اللي في فولدر [[--input]] (عشان كده بنحط الـ jar لوحده في dist، مش في فولدر فيه الكود كله)، ويعمل runtime بـ jlink، ويحطهم مع launcher (البرنامج اللي اليوزر بيدوس عليه) في installer. [[--win-shortcut]] بيعمل اختصار على الديسكتوب، و [[--win-dir-chooser]] بيخلي اليوزر يختار مكان التسطيب.

ومن غير ما تحدد modules، jpackage بيحط runtime كبير فيه modules كتير. لو شغّلت [[jdeps --print-module-deps dist/app.jar]] هيقولك البرنامج محتاج إيه بالظبط (هنا [[java.base,java.desktop]])، وتبعتهم لـ jpackage بـ [[--add-modules java.desktop]]. في تجربة على Linux بـ JDK 25، فولدر app-image لنسخة Swing دي طلع حوالي 137 ميجا من غير تحديد، وحوالي 92 ميجا مع [[--add-modules java.desktop]]، والـ installer بيبقى أصغر لأنه مضغوط.`,
            when: "لما تسلّم برنامج ديسكتوب لناس مش مبرمجين: عميل، أو موظفين في شركة. للتجربة بينك وبين مبرمجين تانيين الـ jar كفاية.",
            mistakes: R`تبعت ملفات [[.class]] أو الكود نفسه لليوزر. تشغّل jpackage بـ [[--input .]] فيتحط في البرنامج كل اللي في الفولدر (الكود والـ bin وأي حاجة تانية). تحاول تعمل [[.exe]] من Linux أو Mac، أو من غير WiX فيطلعلك error إنه مش لاقي الأدوات. وتنسى [[--main-class]] في الـ jar فيطلعلك [[no main manifest attribute, in dist/app.jar]].`
          },
          teach: R`## الأوامر بتعمل إيه؟

٤ أوامر ورا بعض: تترجم [[SwingApp.java]]، وتجمع الناتج في ملف [[jar]]، وتجرّب الـ jar، وفي الآخر تعمل installer لويندوز بـ [[jpackage]]. أول ٣ أوامر والـ [[app-image]] اللي في «جرّب» اتشغّلوا على لينكس في [[maven:3.9-eclipse-temurin-25]] (JDK 25.0.4). الأمر الرابع ([[--type exe]]) لازم يتعمل على ويندوز ومعاه WiX، فناتجه من الـ docs.

---

## ١. [[javac -d bin SwingApp.java]]

~~~bash
javac -d bin SwingApp.java
~~~

- [[javac]]: الـ Java compiler. بيحوّل الكود لـ bytecode (ملفات [[.class]]) اللي الـ JVM بتشغّله.
- [[-d bin]]: (d = directory) حط الناتج في فولدر [[bin]]، وبيعمله لو مش موجود.

~~~text محتوى bin
SwingApp.class
~~~

ملف واحد بس، حتى مع الـ lambdas اللي جوه الكود: الـ lambdas مش بتعمل ملفات [[.class]] منفصلة.

---

## ٢. [[jar --create ...]]

~~~bash
jar --create --file dist/app.jar --main-class SwingApp -C bin .
~~~

| الحتة | معناها |
|---|---|
| [[jar]] | أداة جوه الـ JDK بتعمل ملفات jar (هي zip في الحقيقة) |
| [[--create]] | اعمل jar جديد |
| [[--file dist/app.jar]] | اسمه ومكانه. فولدر [[dist]] بيتعمل لوحده |
| [[--main-class SwingApp]] | الكلاس اللي فيه [[main]] |
| [[-C bin]] | (C = change directory) خش فولدر bin الأول |
| [[.]] | وخد كل اللي فيه |

ليه [[-C bin .]] مش [[bin/SwingApp.class]]؟ لأن التانية هتحط الملف جوه الـ jar في مسار [[bin/SwingApp.class]]، والـ JVM هتدوّر على [[SwingApp.class]] في أول الـ jar. اللي جوه الـ jar ([[jar --list --file dist/app.jar]]):

~~~text الناتج
META-INF/
META-INF/MANIFEST.MF
SwingApp.class
~~~

و [[MANIFEST.MF]] ملف إعدادات الـ jar، وده اللي [[--main-class]] كتبه فيه:

~~~text META-INF/MANIFEST.MF
Manifest-Version: 1.0
Created-By: 25.0.4.1 (Eclipse Adoptium)
Main-Class: SwingApp
~~~

حجم الـ jar طلع 1406 بايت.

---

## ٣. [[java -jar dist/app.jar]]

~~~bash
java -jar dist/app.jar
~~~

[[-jar]] معناها «شغّل الـ jar ده»: Java بتقرا [[Main-Class]] من الـ manifest وتنادي [[main]] بتاعه. على جهاز عادي بيفتح شباك Swing. في الـ container جرّبناه على شاشة وهمية (Xvfb) وفضل شغال لحد ما قفلناه بعد ٦ ثواني، يعني مفيش أخطاء. ومن غير شاشة خالص بيطلع [[java.awt.HeadlessException]] (درس الواجهات).

لو نسيت [[--main-class]] وعملت الـ jar:

~~~text الناتج
no main manifest attribute, in tmp/nomain.jar
~~~

Java مش عارفة تبدأ منين. (جرّبناها على jar اسمه [[tmp/nomain.jar]].)

---

## ٤. [[jpackage]]

~~~bash
jpackage --input dist --main-jar app.jar --name MyDesktopApp --type exe --win-shortcut --win-dir-chooser
~~~

| الحتة | معناها |
|---|---|
| [[--input dist]] | الفولدر اللي فيه الـ jar. كل اللي فيه بيتنسخ جوه البرنامج، عشان كده الـ jar لوحده فيه |
| [[--main-jar app.jar]] | أنهي jar فيهم اللي فيه البداية (اسمه بس، من جوه [[--input]]) |
| [[--name MyDesktopApp]] | اسم البرنامج والـ installer |
| [[--type exe]] | نوع الناتج: installer ويندوز |
| [[--win-shortcut]] | اعمل اختصار على الديسكتوب |
| [[--win-dir-chooser]] | خلّي اليوزر يختار مكان التسطيب |

الـ [[--type]] بيحدد النظام:

| النظام | الأنواع | محتاج |
|---|---|---|
| Windows | [[exe]] و [[msi]] | WiX Toolset |
| macOS | [[dmg]] و [[pkg]] | أدوات Xcode |
| Linux | [[deb]] و [[rpm]] | [[fakeroot]] للـ deb، و [[rpmbuild]] للـ rpm |
| أي نظام | [[app-image]] | ولا حاجة |

جرّبنا [[--type exe]] على لينكس:

~~~text الناتج
Error: Invalid or unsupported type: [exe]
~~~

و [[--win-shortcut]] لوحده على لينكس:

~~~text الناتج
Error: Option [--win-shortcut] is not valid on this platform
~~~

يعني jpackage بيعمل installer للنظام اللي شغال عليه بس. وجرّبنا [[--type deb]] في الـ container:

~~~text الناتج
Bundler DEB Bundle skipped because of a configuration problem: Can not find fakeroot.
~~~

على ويندوز ومعاك WiX، الأمر بيطلّع [[MyDesktopApp-1.0.exe]] (من الـ docs). الـ [[1.0]] النسخة الافتراضية، وتغيّرها بـ [[--app-version]].

---

## ٥. [[--type app-image]]: البرنامج من غير installer

ده اللي في «جرّب»، وبيشتغل على أي نظام:

~~~bash
jpackage --input dist --main-jar app.jar --name MyDesktopApp --type app-image
~~~

على لينكس عمل فولدر كده:

~~~text MyDesktopApp
bin/MyDesktopApp          البرنامج اللي بتشغّله (launcher)
lib/app/app.jar           الـ jar بتاعك
lib/app/MyDesktopApp.cfg  إعدادات الـ launcher
lib/runtime/              Java runtime خاص بالبرنامج
lib/libapplauncher.so
lib/MyDesktopApp.png      الأيقونة الافتراضية
~~~

و [[MyDesktopApp.cfg]] فيه:

~~~text الناتج
[Application]
app.mainjar=$APPDIR/app.jar

[JavaOptions]
java-options=-Djpackage.app-version=1.0
~~~

شغّلنا [[MyDesktopApp/bin/MyDesktopApp]] على الشاشة الوهمية واشتغل، من غير ما يستخدم Java الـ image: بيستخدم اللي في [[lib/runtime]]. على ويندوز البرنامج بيبقى [[MyDesktopApp\MyDesktopApp.exe]]، وعلى ماك [[MyDesktopApp.app]].

### الحجم

~~~text الناتج
137M	MyDesktopApp
~~~

١٣٧ ميجا لبرنامج الـ jar بتاعه ١.٤ كيلو! كل ده الـ runtime. نسأل [[jdeps]] البرنامج محتاج إيه بالظبط:

~~~bash
jdeps --print-module-deps dist/app.jar
~~~

~~~text الناتج
java.base,java.desktop
~~~

[[jdeps]] أداة في الـ JDK بتقرا الـ bytecode وتقول أنهي modules مستخدمة. نعيد الـ app-image بعد ما نمسح القديم، ونزوّد [[--add-modules java.desktop]]:

~~~text الناتج
92M	MyDesktopApp
~~~

وملف [[lib/runtime/release]] بيقول إيه اللي اتحط:

~~~text الناتج
JAVA_VERSION="25.0.4.1"
MODULES="java.base java.datatransfer java.xml java.prefs java.desktop"
~~~

[[java.desktop]] جاب معاه الـ modules اللي هو محتاجها ([[java.datatransfer]] و [[java.xml]] و [[java.prefs]]) لوحده. والـ installer الحقيقي بيبقى أصغر لأنه مضغوط.

---

## الخلاصة

| الخطوة | الأمر | الناتج |
|---|---|---|
| ترجمة | [[javac -d bin SwingApp.java]] | [[bin/SwingApp.class]] |
| تجميع | [[jar --create --file dist/app.jar --main-class SwingApp -C bin .]] | [[dist/app.jar]] |
| تجربة | [[java -jar dist/app.jar]] | الشباك (محتاج Java على الجهاز) |
| برنامج بـ runtime | [[jpackage ... --type app-image]] | فولدر فيه launcher و runtime |
| installer | [[jpackage ... --type exe]] على ويندوز | [[MyDesktopApp-1.0.exe]] |

- الـ jar محتاج Java على جهاز اليوزر. jpackage لأ.
- كل نظام installer بتاعه بيتعمل عليه.
- [[--add-modules]] (من [[jdeps]]) بيصغّر الحجم كتير.`,
          lines: [
            R`ترجم [[SwingApp.java]]، و [[-d bin]] معناها حط الـ [[.class]] في فولدر bin.`,
            R`اعمل [[dist/app.jar]] من محتوى bin، واكتب فيه إن البداية من [[SwingApp]].`,
            R`شغّل الـ jar زي ما اليوزر هيشغّله لو عنده Java.`,
            R`اعمل installer اسمه MyDesktopApp من الـ jar اللي في dist، مع اختصار على الديسكتوب واختيار مكان التسطيب.`
          ],
          sol: R`بعد أول أمرين هتلاقي [[bin/SwingApp.class]] و [[dist/app.jar]] (حجمه أقل من 2 كيلو). [[java -jar dist/app.jar]] بيفتح نفس شباك Swing.

[[--type app-image]] بيعمل فولدر اسمه [[MyDesktopApp]]، والبرنامج جواه: على Windows [[MyDesktopApp\MyDesktopApp.exe]]، وعلى Linux [[MyDesktopApp/bin/MyDesktopApp]]، وعلى Mac [[MyDesktopApp.app]]. دوس عليه: نفس الشباك، من غير ما يستخدم Java اللي على جهازك. حجم الفولدر حوالي 140 ميجا لأن جواه runtime كامل تقريبًا. أعد الأمر وزوّد [[--add-modules java.desktop]] (بعد ما تمسح الفولدر القديم) وهتلاقيه حوالي 90 ميجا.

والأمر الرابع على Windows بيطلّع [[MyDesktopApp-1.0.exe]] (1.0 هي النسخة الافتراضية، وتغيّرها بـ [[--app-version]]). لو طلعلك إنه مش لاقي WiX، سطّبه وزوّده للـ PATH وجرّب تاني.`
        }
      ]
    },
    {
      t: "Maven و Gradle",
      l: 2,
      n: "الـ package.json والـ npm بتوع Java: ملف المشروع، والمكتبات، وأوامر الـ build",
      items: [
        {
          cmd: "pom.xml",
          title: "ملف المشروع في Maven: المكتبات والإصدارات فين؟",
          desc: R`[[pom.xml]] هو [[package.json]] بتاع Maven: اسم المشروع، ونسخة Java، والمكتبات (dependencies)، والـ plugins اللي بتعمل build. المكتبات بتتحمّل من Maven Central (زي npm registry) وبتتخزن في [[~/.m2/repository]] مرة واحدة لكل الجهاز، مش [[node_modules]] لكل مشروع.

في Spring Boot الـ pom بيورث من [[spring-boot-starter-parent]]: ده بيحدد إصدارات كل المكتبات المتوافقة مع بعض، فانت بتكتب المكتبة من غير version. والـ starters ([[spring-boot-starter-webmvc]] و [[spring-boot-starter-data-jpa]]...) كل واحد بيجيب مجموعة مكتبات متظبطة مع بعض.`,
          example: R`<project>
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
  </parent>
  <groupId>com.example</groupId>
  <artifactId>tasks-api</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <properties>
    <java.version>25</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>`,
          try: R`في مشروع من start.spring.io شغّل [[./mvnw dependency:tree]] ودوّر على [[jackson]] و [[tomcat]]: جم منين وانت مكتبتهمش؟ وبعدين ضيف [[<version>1.0</version>]] على [[spring-boot-starter-webmvc]] وشوف Maven بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`كل مشروع Java في الشغل بيبدأ من الملف ده. لو فهمته هتعرف تضيف مكتبة، وتعرف ليه مكتبتين بيتخانقوا على إصدار، وليه التست مش شايف مكتبة معينة.`,
            how: R`كل مكتبة ليها إحداثيات: [[groupId]] (الشركة، زي scope في npm) و [[artifactId]] (الاسم) و [[version]]. والـ scope: [[compile]] (الافتراضي، زي dependencies)، و [[runtime]] (مش محتاجها وقت الـ compile، زي driver الداتابيز)، و [[test]] (زي devDependencies بس للتستات)، و [[provided]].

الـ parent بيعمل حاجتين: dependencyManagement (جدول إصدارات مجرّبة مع بعض، اسمه BOM) وإعدادات plugins جاهزة. لو محتاج إصدار مختلف لمكتبة، بتغيّر property زي [[<postgresql.version>]] بدل ما تكتب version على الـ dependency.

Maven بيحل الـ transitive dependencies (مكتبات المكتبات) لوحده، ولو فيه نسختين من نفس المكتبة بياخد الأقرب في الشجرة. وده سبب مشاكل [[NoSuchMethodError]] الغريبة، و [[dependency:tree]] هو اللي بيكشفها.

في Spring Boot 4 الـ starters اتقسمت أكتر: [[spring-boot-starter-webmvc]] (الاسم القديم [[spring-boot-starter-web]] لسه موجود بس deprecated)، ولكل starter غالبًا starter تست خاص بيه زي [[spring-boot-starter-webmvc-test]].`,
            when: R`كل ما تضيف مكتبة. واستخدم start.spring.io أو صفحة المكتبة على Maven Central عشان تجيب الإحداثيات الصح.`,
            mistakes: R`تكتب [[<version>]] لمكتبة الـ parent بيديرها فتكسر التوافق. وتحط مكتبة تست من غير [[<scope>test</scope>]] فتدخل في الـ jar النهائي. وتنسى [[runtime]] للـ driver ده مش غلط كبير بس بيوضح النية. وتنسخ dependency من مقالة قديمة لـ Boot 2 فيها [[javax.*]]: من Boot 3 كل حاجة بقت [[jakarta.*]].`
          },
          teach: R`## الملف ده بيقول إيه؟

[[pom.xml]] بيوصف المشروع لـ Maven: هو مين (الاسم والنسخة)، وبيورث إعداداته من مين (Spring Boot)، وبيستخدم Java كام، ومحتاج أنهي مكتبات. حطينا الملف ده لوحده في فولدر وشغّلنا عليه [[mvn dependency:tree]] في [[maven:3.9-eclipse-temurin-25]] (Maven 3.9 و JDK 25)، والنتايج تحت.

و [[pom]] اختصار Project Object Model. والملف XML: كل حاجة بين tag بيفتح [[<name>]] و tag بيقفل [[</name>]].

---

## ١. البداية

~~~xml
<project>
  <modelVersion>4.0.0</modelVersion>
~~~

- [[<project>]]: الـ tag اللي كل حاجة جواه.
- [[<modelVersion>4.0.0</modelVersion>]]: نسخة **صيغة** الملف نفسه، مش نسخة مشروعك. ثابتة [[4.0.0]] في Maven 3.

(الـ pom اللي start.spring.io بيعمله فيه كمان [[xmlns]] و [[xsi:schemaLocation]] على [[<project>]]: دول عشان الـ editor يعرف يكمّل ويفحص، و Maven مش محتاجهم.)

---

## ٢. الـ parent

~~~xml
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
  </parent>
~~~

المشروع بيورث pom تاني جاهز، زي [[extends]] في Java. وأي مكتبة في Maven ليها ٣ إحداثيات:

| الإحداثي | معناه | هنا |
|---|---|---|
| [[groupId]] | مين عاملها، عادة الدومين بالعكس | [[org.springframework.boot]] |
| [[artifactId]] | اسمها | [[spring-boot-starter-parent]] |
| [[version]] | نسختها | [[4.1.1]] (آخر نسخة مستقرة لما اتكتب الدرس، وهي اللي start.spring.io اداهالنا) |

الـ parent بيديك جدول بإصدارات مئات المكتبات المجرّبة مع بعض (اسمه BOM = Bill of Materials). سألنا Maven عن قيمتين جاية من الـ parent:

~~~bash
mvn help:evaluate -Dexpression=postgresql.version -q -DforceStdout
~~~

~~~text الناتج
42.7.13
~~~

إحنا مكتبناش رقم نسخة لـ PostgreSQL في أي حتة، وده اللي الـ parent حدده.

---

## ٣. مشروعك نفسه

~~~xml
  <groupId>com.example</groupId>
  <artifactId>tasks-api</artifactId>
  <version>0.0.1-SNAPSHOT</version>
~~~

نفس الـ ٣ إحداثيات بس لمشروعك. اسم الـ jar اللي هيطلع بيتعمل منهم: [[tasks-api-0.0.1-SNAPSHOT.jar]]. و [[SNAPSHOT]] معناها «نسخة لسه بتتطور»، ولما تعمل release بتشيلها ([[1.0.0]]).

---

## ٤. الإعدادات

~~~xml
  <properties>
    <java.version>25</java.version>
  </properties>
~~~

[[<properties>]] متغيرات. [[java.version]] property الـ parent بتاع Spring Boot بيقراها ويظبط بيها الـ compiler. اتأكدنا:

~~~bash
mvn help:evaluate -Dexpression=maven.compiler.release -q -DforceStdout
~~~

~~~text الناتج
25
~~~

يعني الكود هيتعمل له compile لـ Java 25.

---

## ٥. المكتبات

~~~xml
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
~~~

- [[<dependencies>]] زي [[dependencies]] في package.json، وكل مكتبة في [[<dependency>]].
- مفيش [[<version>]]: الـ parent بيحددها (4.1.1).
- [[spring-boot-starter-webmvc]]: starter، يعني مكتبة فاضية تقريبًا وظيفتها تجيب مجموعة مكتبات مع بعض: Spring MVC و Tomcat و Jackson (JSON).

~~~xml
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
~~~

[[<scope>]] بيحدد المكتبة متاحة إمتى:

| الـ scope | وقت الـ compile | وقت التشغيل | في التستات | زي في npm |
|---|---|---|---|---|
| [[compile]] (الافتراضي) | أيوه | أيوه | أيوه | dependencies |
| [[runtime]] | لأ | أيوه | أيوه | مفيش |
| [[test]] | للتستات بس | لأ | أيوه | devDependencies |
| [[provided]] | أيوه | السيرفر بيوفرها | أيوه | peerDependencies تقريبًا |

الـ driver بتاع PostgreSQL [[runtime]] لأن كودك مبيكتبش [[import org.postgresql...]] أبدًا: بيتكلم مع [[DataSource]] و JPA، والـ driver بيتحمّل وقت التشغيل.

~~~xml
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
~~~

أدوات التست (JUnit و Mockito و AssertJ و MockMvc)، بـ [[test]] فمش هتدخل الـ jar النهائي.

---

## ٦. الشجرة: [[dependency:tree]]

~~~bash
mvn dependency:tree
~~~

ده جزء من الناتج (شلنا سطور جوه الفروع):

~~~text الناتج
[INFO] com.example:tasks-api:jar:0.0.1-SNAPSHOT
[INFO] +- org.springframework.boot:spring-boot-starter-webmvc:jar:4.1.1:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:4.1.1:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter-jackson:jar:4.1.1:compile
[INFO] |  |  \- org.springframework.boot:spring-boot-jackson:jar:4.1.1:compile
[INFO] |  |     \- tools.jackson.core:jackson-databind:jar:3.1.5:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter-tomcat:jar:4.1.1:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-tomcat-runtime:jar:4.1.1:compile
[INFO] |  ...
[INFO] +- org.postgresql:postgresql:jar:42.7.13:runtime
[INFO] |  \- org.checkerframework:checker-qual:jar:3.55.1:runtime
[INFO] \- org.springframework.boot:spring-boot-starter-webmvc-test:jar:4.1.1:test
[INFO] BUILD SUCCESS
~~~

نقرا سطر: [[groupId:artifactId:jar:version:scope]]. و [[+-]] و [[\-]] فروع الشجرة: كل مكتبة تحت اللي جابها. احنا كتبنا ٣ مكتبات بس، والباقي اسمه **transitive dependencies** (مكتبات المكتبات). و [[tomcat-embed-core]] جاية تحت [[spring-boot-starter-tomcat-runtime]] تحت [[spring-boot-starter-tomcat]] تحت الـ webmvc starter.

ولاحظ [[tools.jackson.core]]: ده Jackson 3 اللي Spring Boot 4 بيستخدمه، بدل [[com.fasterxml.jackson.core:jackson-databind]] بتاع Boot 3.

---

## ٧. لو كتبت version غلط

ضفنا [[<version>1.0</version>]] تحت [[spring-boot-starter-webmvc]] وعملنا [[mvn compile]]:

~~~text الناتج
[WARNING] The POM for org.springframework.boot:spring-boot-starter-webmvc:jar:1.0 is missing, no dependency information available
[INFO] BUILD FAILURE
[ERROR] Failed to execute goal on project tasks-api: Could not resolve dependencies for project com.example:tasks-api:jar:0.0.1-SNAPSHOT
[ERROR] dependency: org.springframework.boot:spring-boot-starter-webmvc:jar:1.0 (compile)
[ERROR] 	Could not find artifact org.springframework.boot:spring-boot-starter-webmvc:jar:1.0 in central (https://repo.maven.apache.org/maven2)
~~~

الـ version اللي بتكتبه بيكسب على الـ parent، و Maven راح يدوّر على [[1.0]] في Maven Central (الـ registry) وملقاهاش. والمكتبات اللي بتتحمّل بتتحفظ في [[~/.m2/repository]].

---

## الخلاصة

| الجزء | زي في package.json |
|---|---|
| [[groupId]] و [[artifactId]] و [[version]] | [[name]] و [[version]] |
| [[<parent>]] | مفيش: إصدارات جاهزة متوافقة |
| [[<properties>]] | إعدادات ومتغيرات |
| [[<dependencies>]] | [[dependencies]] |
| [[<scope>test</scope>]] | [[devDependencies]] |
| [[~/.m2/repository]] | [[node_modules]] بس واحد للجهاز كله |

- متكتبش version لمكتبة الـ parent بيديرها.
- [[dependency:tree]] أول حاجة تبص فيها لما مكتبة تتصرف غريب.`,
          lines: [
            "بداية ملف المشروع.",
            "نسخة صيغة الـ pom، ثابتة دايمًا 4.0.0.",
            R`الأب: منه بتيجي إصدارات كل المكتبات.`,
            "الـ group بتاع Spring Boot.",
            "الـ parent الرسمي.",
            R`إصدار Spring Boot. في سبتمبر ٢٠٢٦ آخر إصدار مستقر 4.1.x.`,
            "قفلة الـ parent.",
            R`الـ group بتاع مشروعك، عادة الدومين بالعكس.`,
            "اسم المشروع.",
            R`[[SNAPSHOT]] يعني نسخة لسه بتتطور.`,
            "إعدادات.",
            R`نسخة Java اللي هيتعمل بيها compile.`,
            "قفلة.",
            "المكتبات.",
            "مكتبة.",
            "من Spring Boot.",
            R`starter الويب: Spring MVC و Tomcat و Jackson. من غير version لأن الـ parent بيحدده.`,
            "قفلة.",
            "مكتبة.",
            "driver بتاع PostgreSQL.",
            "الاسم.",
            R`[[runtime]]: الكود مش بيستخدمه مباشرة، بس لازم يبقى موجود وقت التشغيل.`,
            "قفلة.",
            "مكتبة.",
            "من Spring Boot.",
            R`أدوات التست: JUnit و Mockito و AssertJ و MockMvc.`,
            R`[[test]]: متاحة للتستات بس، ومش هتدخل الـ jar.`,
            "قفلة.",
            "قفلة المكتبات.",
            "قفلة الملف."
          ],
          sol: R`في [[dependency:tree]] هتلاقي [[tomcat-embed-core]] تحت [[spring-boot-starter-tomcat-runtime]] تحت [[spring-boot-starter-tomcat]] تحت [[spring-boot-starter-webmvc]]، و Jackson تحت [[spring-boot-starter-jackson]]. مكتبتهمش لأن الـ starter جابهم (transitive). وفي Spring Boot 4 هتلاقي Jackson 3 ([[tools.jackson.core:jackson-databind]]) بدل [[com.fasterxml.jackson]] القديم.

ولما تكتب [[<version>1.0</version>]] على الـ starter: Maven هيحاول يجيب [[spring-boot-starter-webmvc:1.0]] ومش هيلاقيها، فالـ build يقع بـ [[Could not find artifact]]. ولو كتبت version موجودة بس مختلفة عن الـ parent، الـ build ممكن يعدّي ويقع وقت التشغيل بسبب عدم توافق. القاعدة: سيب الـ parent يحدد.`
        },
        {
          cmd: "mvnw",
          title: "تعمل build وتشغّل وتختبر المشروع بأوامر Maven",
          desc: R`[[mvnw]] (Maven wrapper) سكربت جوه المشروع بيحمّل نسخة Maven المظبوطة لوحده، فمش محتاج تسطّب Maven، وكل الفريق والـ CI بيستخدموا نفس النسخة. زي [[npx]] بالظبط.

الأوامر الأساسية: [[./mvnw spring-boot:run]] يشغّل (زي [[npm run dev]])، و [[./mvnw test]] التستات، و [[./mvnw package]] يطلّع jar في [[target/]] تشغّله بـ [[java -jar]] (زي [[npm run build]]). على ويندوز [[mvnw.cmd]].`,
          example: R`./mvnw spring-boot:run
./mvnw test
./mvnw test -Dtest=TaskControllerTest
./mvnw clean package -DskipTests
java -jar target/tasks-api-0.0.1-SNAPSHOT.jar
./mvnw dependency:tree
./mvnw versions:display-dependency-updates`,
          try: R`في مشروع من start.spring.io شغّل [[./mvnw package]] وشوف الـ jar طلع فين وحجمه كام ([[ls -lh target/*.jar]]). شغّله بـ [[java -jar]]، وبعدين بـ [[java -jar target/*.jar --server.port=9090]]. إيه اللي اتغير؟`,
          deep: {
            why: R`ده اللي هتكتبه كل يوم، وهو نفسه اللي بيتكتب في Dockerfile والـ CI. والـ jar الواحد اللي فيه كل حاجة (fat jar) هو طريقة الـ deploy العادية لـ Spring Boot.`,
            how: R`Maven بيشتغل بـ lifecycle phases بالترتيب: [[validate]] ← [[compile]] ← [[test]] ← [[package]] ← [[verify]] ← [[install]]. لما تطلب [[package]] بيعدّي على اللي قبله كله، فالتستات بتشتغل إلا لو [[-DskipTests]]. و [[clean]] بيمسح [[target/]].

[[spring-boot:run]] ده goal من الـ plugin بتاع Spring Boot: بيعمل compile ويشغّل من غير ما يعمل jar. والـ plugin نفسه في [[package]] بيعمل repackage: بيحط كودك وكل المكتبات في jar واحد ومعاه launcher. عشان كده الحجم عشرات الميجات.

[[-D]] بيحط system property: [[-Dtest=...]] يختار تست، و [[-DskipTests]] يتخطاهم. والـ arguments بعد [[java -jar app.jar]] زي [[--server.port=9090]] بتغيّر أي إعداد في Spring (درس الإعدادات).`,
            when: R`[[spring-boot:run]] أو زرار Run في IntelliJ وانت بتطوّر. [[test]] قبل كل push. [[package]] في الـ CI والـ Docker. و [[dependency:tree]] لما مكتبة تتصرف غريب.`,
            mistakes: R`تستخدم [[mvn]] المتسطّب على جهازك بدل [[./mvnw]] فتشتغل بنسخة مختلفة عن الـ CI. و [[-DskipTests]] كعادة فالتستات تبوظ ومحدش ياخد باله. وتنسى إن [[./mvnw]] محتاج صلاحية تشغيل على لينكس ([[chmod +x mvnw]]) لو اتنسخ من ويندوز. وتشغّل بـ JDK غلط: Maven بياخد [[JAVA_HOME]].`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

دي الأوامر اليومية لمشروع Spring Boot بـ Maven: تشغّل، وتختبر، وتعمل jar وتشغّله، وتبص على المكتبات. جرّبناها كلها على مشروع من start.spring.io فيه Spring Web بس (Spring Boot 4.1.1، و [[artifactId]] اسمه [[tasks-api]])، وضفنا فيه controller صغير ([[/hello]]) وتستين، جوه [[maven:3.9-eclipse-temurin-25]] (JDK 25)، والبورت 8080 بتاع الـ container متوصّل بـ 5945 على الجهاز.

---

## ١. الأول: [[./mvnw]] نفسه

- [[mvnw]] = Maven Wrapper: سكربت shell في فولدر المشروع. أول مرة بيشتغل بيقرا [[.mvn/wrapper/maven-wrapper.properties]] ويعرف النسخة المطلوبة، ويحمّلها في [[~/.m2/wrapper/dists]]، وبعدين يشغّلها.
- [[./]] قبله: «الملف ده اللي في الفولدر الحالي»، لأن لينكس والماك مبيدوروش في الفولدر الحالي لوحدهم. على ويندوز: [[mvnw.cmd]] أو [[.\mvnw]] في PowerShell.

~~~bash
./mvnw --version
~~~

~~~text الناتج
Apache Maven 3.9.16 (2bdd9fddda4b155ebf8000e807eb73fd829a51d5)
Maven home: /root/.m2/wrapper/dists/apache-maven-3.9.16/56ba1f9f
Java version: 25.0.4.1, vendor: Eclipse Adoptium, runtime: /opt/java/openjdk
~~~

- [[Maven home]] جوه [[.m2/wrapper]]: يعني دي النسخة اللي الـ wrapper حمّلها، مش Maven متسطّب.
- [[Java version]]: Maven بيستخدم الـ JDK اللي في [[JAVA_HOME]] أو الـ PATH.

---

## ٢. [[./mvnw spring-boot:run]]

~~~bash
./mvnw spring-boot:run
~~~

[[spring-boot:run]] شكله [[plugin:goal]]: الـ plugin [[spring-boot]] (اللي في [[<build>]] في الـ pom)، والمهمة [[run]]: compile وشغّل من غير jar. الناتج (آخر سطور):

~~~text الناتج
[INFO] Attaching agents: []
... Tomcat started on port 8080 (http) with context path '/'
... Started TasksApplication in 5.816 seconds (process running for 7.071)
~~~

ومن الجهاز:

~~~bash
curl "localhost:5945/hello?name=Mona"
~~~

~~~text الناتج
Good evening, Mona
~~~

التطبيق بيفضل شغال لحد ما توقفه بـ Ctrl+C.

---

## ٣. [[./mvnw test]] و [[-Dtest=...]]

~~~bash
./mvnw test
~~~

~~~text الناتج
[INFO] Running com.example.tasks.GreetingServiceTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.458 s -- in com.example.tasks.GreetingServiceTest
[INFO] Running com.example.tasks.TaskControllerTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.024 s -- in com.example.tasks.TaskControllerTest
[INFO] Running com.example.tasks.TasksApplicationTests
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 9.364 s -- in com.example.tasks.TasksApplicationTests
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
~~~

- [[test]] هنا **phase** مش goal: Maven بيعدّي على كل اللي قبلها (compile الكود، و compile التستات) وبعدين يشغّل التستات.
- [[Failures]] تست قال النتيجة غلط، و [[Errors]] تست وقع بـ exception.
- لاحظ الوقت: التستين العاديين في أجزاء من الثانية، و [[TasksApplicationTests]] (اللي start.spring.io بيعمله، بيشغّل Spring كله) ٩ ثواني.

~~~bash
./mvnw test -Dtest=TaskControllerTest
~~~

~~~text الناتج
[INFO] Running com.example.tasks.TaskControllerTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
~~~

[[-D]] بيحط system property: [[-Dname=value]]. والـ property [[test]] بيقراها الـ plugin اللي بيشغّل التستات (Surefire) ويختار الـ class ده بس. وتقدر تكتب [[-Dtest=TaskControllerTest#helloUsesService]] لتست واحد (من docs الـ Surefire).

---

## ٤. [[./mvnw clean package -DskipTests]]

~~~bash
./mvnw clean package -DskipTests
~~~

phases بالترتيب:

| الـ phase | بتعمل إيه |
|---|---|
| [[clean]] | تمسح فولدر [[target/]] كله |
| [[validate]] | تتأكد إن الـ pom سليم |
| [[compile]] | تترجم [[src/main/java]] |
| [[test]] | التستات (اتخطت بسبب [[-DskipTests]]) |
| [[package]] | تعمل الـ jar |

~~~text الناتج
[INFO] Tests are skipped.
[INFO] Building jar: /w/web/target/tasks-api-0.0.1-SNAPSHOT.jar
[INFO] Replacing main artifact /w/web/target/tasks-api-0.0.1-SNAPSHOT.jar with repackaged archive, adding nested dependencies in BOOT-INF/.
[INFO] BUILD SUCCESS
~~~

السطر التالت هو الـ Spring Boot plugin: أخد الـ jar العادي (كودك بس) وعمل منه **fat jar** فيه كل المكتبات جوه فولدر [[BOOT-INF/]]. الحجم:

~~~text ls -lh target (الحجم والاسم بس)
19M  target/tasks-api-0.0.1-SNAPSHOT.jar
4.7K target/tasks-api-0.0.1-SNAPSHOT.jar.original
~~~

[[.jar.original]] كودك قبل الـ repackage: ٤.٧ كيلو. والـ ١٩ ميجا معظمهم Tomcat و Spring و Jackson. الاسم [[artifactId-version.jar]] من الـ pom.

---

## ٥. [[java -jar target/tasks-api-0.0.1-SNAPSHOT.jar]]

السيرفر مش محتاج Maven ولا الكود: Java والـ jar بس.

~~~text الناتج
 :: Spring Boot ::                (v4.1.1)
... Starting TasksApplication v0.0.1-SNAPSHOT using Java 25.0.4.1 with PID 1
... Tomcat started on port 8080 (http) with context path '/'
... Started TasksApplication in 3.942 seconds (process running for 5.062)
~~~

([[...]] مكان التاريخ واسم الـ logger، شلناهم عشان السطر يبان.) أسرع من [[spring-boot:run]] لأن مفيش compile.

ومع [[--server.port=9090]] (الحل في «جرّب»):

~~~text الناتج
... Tomcat started on port 9090 (http) with context path '/'
~~~

أي argument بيبدأ بـ [[--]] بعد اسم الـ jar Spring بيعتبره إعداد، وبيكسب على [[application.properties]].

---

## ٦. [[./mvnw dependency:tree]]

goal من الـ dependency plugin: الشجرة كاملة ومين جاب مين (درس pom.xml). أول سطور:

~~~text الناتج
[INFO] com.example:tasks-api:jar:0.0.1-SNAPSHOT
[INFO] +- org.springframework.boot:spring-boot-starter-webmvc:jar:4.1.1:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:4.1.1:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-logging:jar:4.1.1:compile
[INFO] |  |  |  +- ch.qos.logback:logback-classic:jar:1.5.38:compile
~~~

---

## ٧. [[./mvnw versions:display-dependency-updates]]

goal من الـ Versions plugin (Maven بيحمّله لوحده أول مرة). بيقارن الإصدارات اللي عندك بآخر إصدارات في Maven Central:

~~~text الناتج
[INFO] The following dependencies in Dependency Management have newer versions:
[INFO]   ch.qos.logback:logback-classic ....................... 1.5.38 -> 1.6.5
[INFO]   ch.qos.logback:logback-core .......................... 1.5.38 -> 1.6.5
[INFO]   com.fasterxml.jackson.core:jackson-annotations ....... 2.21 -> 3.0-rc5
~~~

خلي بالك: في مشروع Spring Boot القايمة طويلة جدًا، لأنه بيعدّ كل مكتبة في جدول الـ parent حتى اللي مش بتستخدمها، وبيعرض نسخ تجريبية زي [[3.0-rc5]] (rc = release candidate). الطريقة الصح للتحديث إنك ترفع نسخة Spring Boot نفسها في [[<parent>]]، مش كل مكتبة لوحدها.

---

## الخلاصة

| الأمر | زي في npm | بيعمل |
|---|---|---|
| [[./mvnw spring-boot:run]] | [[npm run dev]] | يشغّل من الكود |
| [[./mvnw test]] | [[npm test]] | compile + كل التستات |
| [[./mvnw test -Dtest=X]] | [[npm test -- X]] | تست class واحد |
| [[./mvnw clean package -DskipTests]] | [[npm run build]] | fat jar في [[target/]] |
| [[java -jar target/*.jar]] | [[node dist/index.js]] | تشغيل الإنتاج |
| [[./mvnw dependency:tree]] | [[npm ls --all]] | شجرة المكتبات |
| [[./mvnw versions:display-dependency-updates]] | [[npm outdated]] | الإصدارات الأحدث |

- phases ([[test]] و [[package]]) بتعدّي على كل اللي قبلها. goals ([[plugin:goal]]) بتعمل حاجة واحدة.
- استخدم [[./mvnw]] مش [[mvn]]، عشان كله يشتغل بنفس النسخة.`,
          lines: [
            "شغّل التطبيق وانت بتطوّر.",
            "شغّل كل التستات.",
            R`تست class واحد بس.`,
            R`امسح القديم واعمل jar من غير تستات (في Docker مثلًا بعد ما الـ CI اختبر).`,
            "شغّل الـ jar: ده كل اللي محتاجه السيرفر، Java بس.",
            "شجرة المكتبات ومين جاب مين.",
            "إيه المكتبات اللي ليها إصدارات أحدث."
          ],
          sol: R`الـ jar بيطلع في [[target/]] باسم [[artifactId-version.jar]]، وحجمه حوالي ٢٠ ميجا لمشروع فيه Spring Web بس (طلع 19M في تجربتنا على Boot 4.1.1)، وبيكبر مع كل starter، لأن فيه Tomcat و Spring وكل المكتبات. (هتلاقي كمان [[.jar.original]] صغير: ده كودك بس قبل الـ repackage.)

مع [[--server.port=9090]] اللوج هيقول [[Tomcat started on port 9090]] بدل 8080: أي إعداد في [[application.yaml]] ينفع يتغير من الـ command line أو من environment variable ([[SERVER_PORT=9090]]) من غير ما تعيد build. ولو لقيت [[Port 8080 was already in use]]، فيه نسخة تانية شغالة.`
        },
        {
          cmd: "Gradle",
          title: "نفس المشروع بـ Gradle: build.gradle.kts",
          desc: R`Gradle هو البديل التاني الشائع (وهو اللي Android بيستخدمه). بدل XML، الـ build مكتوب كود بـ Kotlin DSL في [[build.gradle.kts]]، وأقصر بكتير. وفيه wrapper برضه: [[./gradlew]].

الأوامر المقابلة: [[./gradlew bootRun]] للتشغيل، و [[./gradlew test]]، و [[./gradlew bootJar]] يطلّع الـ jar في [[build/libs/]]. والـ scopes بقت أسماء configurations: [[implementation]] و [[runtimeOnly]] و [[testImplementation]].`,
          example: R`plugins {
    java
    id("org.springframework.boot") version "4.1.1"
    id("io.spring.dependency-management") version "1.1.7"
}
group = "com.example"
java {
    toolchain { languageVersion = JavaLanguageVersion.of(25) }
}
repositories { mavenCentral() }
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
tasks.withType<Test> { useJUnitPlatform() }`,
          try: R`اعمل مشروع من start.spring.io واختار «Gradle - Kotlin». شغّل [[./gradlew bootJar]] مرتين ورا بعض وقارن الوقت. وبعدين [[./gradlew dependencies --configuration runtimeClasspath]].`,
          flag: "script",
          deep: {
            why: R`هتلاقي الاتنين في الشركات بنسب قريبة، والمهم تعرف تقرا الاتنين. Gradle أسرع في المشاريع الكبيرة بسبب الكاش والـ incremental builds، و Maven أبسط وأثبت.`,
            how: R`Gradle بيبني graph من الـ tasks ([[compileJava]] و [[test]] و [[bootJar]]...)، وكل task بيعرف مدخلاته ومخرجاته، فلو ماتغيرش حاجة بيقول [[UP-TO-DATE]] ومبيعيدش. وفيه daemon بيفضل شغال في الخلفية عشان المرات الجاية تبقى أسرع.

الـ toolchain بيقول «اعمل compile بـ Java 25» حتى لو Gradle نفسه شغال بـ JDK تاني، و Gradle بيدوّر على JDK مناسب على الجهاز.

الـ plugin [[io.spring.dependency-management]] بيعمل نفس شغل الـ parent في Maven: إصدارات المكتبات من غير ما تكتبها. و [[testRuntimeOnly("org.junit.platform:junit-platform-launcher")]] مطلوبة في Gradle الحديث عشان JUnit يشتغل.`,
            when: R`لو المشروع أو الفريق عنده اختيار موجود امشي عليه. في مشروع جديد: Maven لو عايز أبسط حاجة، و Gradle لو المشروع كبير أو multi-module أو عندك خبرة Kotlin.`,
            mistakes: R`تخلط Groovy DSL ([[build.gradle]] بـ [[implementation '...']]) و Kotlin DSL ([[build.gradle.kts]] بـ [[implementation("...")]]): الأمثلة على النت نصها ده ونصها ده. وتسطّب Gradle globally بإصدار مختلف عن الـ wrapper. وتنسى إن الـ jar في [[build/libs]] مش [[target]] وانت بتكتب Dockerfile.`
          },
          teach: R`## الملف ده بيقول إيه؟

[[build.gradle.kts]] بيقول نفس اللي الـ [[pom.xml]] في الدرس اللي فات بيقوله، بس كود Kotlin بدل XML: الـ plugins، ونسخة Java، ومنين تتحمّل المكتبات، والمكتبات نفسها. [[.kts]] = Kotlin Script. جبنا مشروع «Gradle - Kotlin» من start.spring.io (فيه Spring Web و PostgreSQL Driver)، وحطينا الملف ده مكان اللي جه معاه (الفرق الوحيد إن بتاع الموقع فيه كمان [[version = "0.0.1-SNAPSHOT"]])، وشغّلناه بـ [[./gradlew]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25). الـ wrapper حمّل Gradle 9.7.1 لوحده.

---

## ١. الـ plugins

~~~kotlin
plugins {
    java
    id("org.springframework.boot") version "4.1.1"
    id("io.spring.dependency-management") version "1.1.7"
}
~~~

- [[plugins { ... }]]: block. في Kotlin DSL أي [[name { }]] معناها «نادي [[name]] واديها الكود اللي جوه الأقواس».
- [[java]]: plugin جوه Gradle نفسه: بيضيف tasks زي [[compileJava]] و [[test]] و [[jar]].
- [[id("org.springframework.boot") version "4.1.1"]]: plugin من برّه، بالـ id والنسخة. ده بيضيف [[bootRun]] (زي [[spring-boot:run]]) و [[bootJar]] (الـ fat jar).
- [[io.spring.dependency-management]]: بيقرا جدول الإصدارات (BOM) بتاع Spring Boot، فتكتب المكتبات من غير version. ده شغل الـ [[<parent>]] في Maven.

---

## ٢. الـ group و Java

~~~kotlin
group = "com.example"
java {
    toolchain { languageVersion = JavaLanguageVersion.of(25) }
}
~~~

- [[group]]: زي [[groupId]]. واسم المشروع نفسه (زي [[artifactId]]) في ملف تاني اسمه [[settings.gradle.kts]]: [[rootProject.name = "tasks-api"]].
- [[toolchain]]: «اعمل compile بـ Java 25»، حتى لو Gradle نفسه شغال بـ JDK تاني. لو مفيش JDK 25 على الجهاز، Gradle بيقول. هنا الـ image فيها JDK 25 أصلًا.

---

## ٣. منين والمكتبات

~~~kotlin
repositories { mavenCentral() }
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
~~~

- [[mavenCentral()]]: نفس الـ registry بتاع Maven. Gradle بيستخدم نفس المكتبات.
- كل مكتبة String واحد: [["group:artifact"]] (أو [["group:artifact:version"]]).
- الكلمة اللي قبلها اسمها **configuration**، ودي المقابل للـ scope:

| Gradle | Maven | متاحة فين |
|---|---|---|
| [[implementation]] | [[compile]] | الكود والتشغيل والتستات |
| [[runtimeOnly]] | [[runtime]] | التشغيل بس |
| [[testImplementation]] | [[test]] | كود التستات |
| [[testRuntimeOnly]] | [[test]] (وقت التشغيل) | تشغيل التستات بس |

- [[junit-platform-launcher]]: المكتبة اللي Gradle بيستخدمها عشان يلاقي التستات ويشغّلها. Gradle الحديث بيطلب إنك تضيفها بنفسك.

---

## ٤. التستات

~~~kotlin
tasks.withType<Test> { useJUnitPlatform() }
~~~

- [[tasks.withType<Test>]]: كل الـ tasks اللي نوعها [[Test]]. و [[<Test>]] هنا generic بتاع Kotlin، نفس فكرة Java.
- [[useJUnitPlatform()]]: شغّل التستات بـ JUnit 5 أو أحدث (Spring Boot 4 بيجيب JUnit 6).

---

## ٥. [[./gradlew bootJar]] مرتين

~~~bash
./gradlew bootJar
~~~

أول مرة (آخر سطور الناتج):

~~~text الناتج
Starting a Gradle Daemon (subsequent builds will be faster)
> Task :compileJava
> Task :processResources
> Task :classes
> Task :resolveMainClassName
> Task :bootJar

BUILD SUCCESSFUL in 2m 17s
4 actionable tasks: 4 executed
~~~

- [[Starting a Gradle Daemon]]: Gradle بيشغّل process في الخلفية يفضل شغال، عشان المرات الجاية ميبدأش من الصفر.
- كل [[> Task :name]] task اتنفذت بالترتيب: compile الكود، ونسخ [[resources]]، و [[classes]] (task بتجمع اللي قبلها)، وتحديد الـ main class، وعمل الـ jar.
- الدقيقتين معظمهم تحميل Gradle نفسه والمكتبات.

تاني مرة:

~~~text الناتج
> Task :compileJava UP-TO-DATE
> Task :processResources UP-TO-DATE
> Task :classes UP-TO-DATE
> Task :resolveMainClassName UP-TO-DATE
> Task :bootJar UP-TO-DATE

BUILD SUCCESSFUL in 3s
4 actionable tasks: 4 up-to-date
~~~

[[UP-TO-DATE]]: كل task عارفة مدخلاتها (الكود والمكتبات) ومخرجاتها، ومفيش حاجة اتغيرت، فمتعادتش. ده سبب إن Gradle أسرع في المشاريع الكبيرة. (Maven مع [[package]] بيعدّي على الـ phases كلها كل مرة.)

~~~text ls -lh build/libs (الحجم والاسم بس)
21M tasks-api.jar
~~~

الـ jar في [[build/libs/]] مش [[target/]]. والاسم [[tasks-api.jar]] من غير نسخة، لأننا شلنا سطر [[version]].

---

## ٦. شجرة المكتبات

~~~bash
./gradlew dependencies --configuration runtimeClasspath
~~~

[[runtimeClasspath]] = كل اللي هيبقى موجود وقت التشغيل ([[implementation]] + [[runtimeOnly]] ومكتباتهم). أول سطور:

~~~text الناتج
runtimeClasspath - Runtime classpath of source set 'main'.
+--- org.springframework.boot:spring-boot-starter-webmvc -> 4.1.1
|    +--- org.springframework.boot:spring-boot-starter:4.1.1
|    |    +--- org.springframework.boot:spring-boot-starter-logging:4.1.1
|    |    |    +--- ch.qos.logback:logback-classic:1.5.38
|    |    |    |    +--- ch.qos.logback:logback-core:1.5.38
|    |    |    |    \--- org.slf4j:slf4j-api:2.0.17 -> 2.0.18
~~~

| الرمز | معناه |
|---|---|
| [[-> 4.1.1]] بعد مكتبة من غير نسخة | الـ dependency-management اختار النسخة دي |
| [[2.0.17 -> 2.0.18]] | مكتبة طلبت 2.0.17، و Gradle اختار 2.0.18 لأن حد تاني طلبها (بياخد الأعلى) |
| [[(*)]] | المكتبة دي اتعرضت فوق بفروعها، فمش هيكررها |
| [[(c)]] | constraint: قيد على النسخة جاي من BOM، مش مكتبة اتطلبت |

لاحظ الفرق عن Maven: Gradle بياخد **أعلى** نسخة مطلوبة، و Maven بياخد **الأقرب** في الشجرة.

---

## الخلاصة

| Maven | Gradle (Kotlin DSL) |
|---|---|
| [[pom.xml]] | [[build.gradle.kts]] + [[settings.gradle.kts]] |
| [[<parent>]] | plugin [[io.spring.dependency-management]] |
| [[<java.version>]] | [[toolchain { languageVersion = ... }]] |
| [[<scope>test</scope>]] | [[testImplementation(...)]] |
| [[./mvnw spring-boot:run]] | [[./gradlew bootRun]] |
| [[./mvnw package]] | [[./gradlew bootJar]] |
| [[target/]] | [[build/libs/]] |
| [[dependency:tree]] | [[dependencies --configuration runtimeClasspath]] |

- [[UP-TO-DATE]] يعني Gradle مأعادش task مفيش حاجة اتغيرت فيها.
- [[build.gradle]] (Groovy) و [[build.gradle.kts]] (Kotlin) نفس الفكرة بكتابة مختلفة شوية.`,
          lines: [
            "الـ plugins.",
            "دعم Java الأساسي.",
            R`plugin بتاع Spring Boot: بيضيف [[bootRun]] و [[bootJar]].`,
            "إدارة إصدارات المكتبات من الـ BOM بتاع Boot.",
            "قفلة.",
            R`زي [[groupId]].`,
            "إعدادات Java.",
            R`اعمل compile بـ Java 25.`,
            "قفلة.",
            R`المكتبات من Maven Central.`,
            "المكتبات.",
            R`[[implementation]] زي compile scope.`,
            R`[[runtimeOnly]] زي runtime.`,
            R`[[testImplementation]] زي test.`,
            "الـ launcher بتاع JUnit، مطلوب لتشغيل التستات.",
            "قفلة.",
            R`شغّل التستات بـ JUnit 5/6 (Jupiter).`
          ],
          sol: R`أول [[bootJar]] بياخد وقت (تحميل Gradle والمكتبات والـ daemon)، والتاني ثواني وهتلاقي [[BUILD SUCCESSFUL]] والـ tasks كلها [[UP-TO-DATE]]، لأن مفيش مدخلات اتغيرت. الـ jar في [[build/libs/]].

و [[dependencies --configuration runtimeClasspath]] بيطبع نفس فكرة [[mvn dependency:tree]]: الشجرة الكاملة، والإصدارات اللي اتحلت بـ [[->]] لو فيه أكتر من نسخة اتطلبت.`
        }
      ]
    },
    {
      t: "أول تطبيق Spring Boot",
      l: 2,
      n: "تعمل المشروع، وتفهم الـ auto-configuration، وإزاي Spring بيعمل الـ objects ويوصّلها ببعض",
      items: [
        {
          cmd: "start.spring.io",
          title: "تعمل مشروع Spring Boot جديد وتفهم شكله",
          desc: R`start.spring.io هو [[npm create vite]] بتاع Spring: تختار Maven أو Gradle، و Java 25، والـ dependencies (Spring Web و Spring Data JPA و PostgreSQL Driver و Validation و Flyway...)، وتنزّل zip فيه مشروع جاهز. ونفس الحاجة موجودة جوه IntelliJ و VS Code.

المشروع فيه: [[src/main/java]] للكود، و [[src/main/resources/application.properties]] (أو [[.yaml]]) للإعدادات، و [[src/test/java]] للتستات، والـ wrapper ([[mvnw]]). والـ packages بالدومين بالعكس: [[com.example.tasks]].`,
          example: R`curl https://start.spring.io/starter.zip -d type=maven-project -d javaVersion=25 -d groupId=com.example -d artifactId=tasks-api -d dependencies=web,data-jpa,postgresql,validation,flyway,actuator -o tasks-api.zip
unzip tasks-api.zip -d tasks-api && cd tasks-api
tree src
./mvnw spring-boot:run`,
          try: R`اعمل مشروع فيه Spring Web بس، وشغّله، وافتح [[localhost:8080]]. إيه اللي ظهر؟ وبعدين ضيف PostgreSQL Driver و Spring Data JPA من غير أي إعدادات وشغّل تاني: التطبيق قام؟`,
          deep: {
            why: R`البداية الصح بتوفّر ساعات: إصدارات متوافقة، وهيكل كل مطور Java يعرفه، و wrapper، وتست جاهز بيتأكد إن التطبيق بيقوم.`,
            how: R`الـ package الأساسي فيه class عليه [[@SpringBootApplication]] (الدرس الجاي)، وكل الكود لازم يبقى في الـ package ده أو تحته عشان Spring يلاقيه. التنظيم الشائع: package لكل feature ([[tasks]] و [[users]]) جواه controller و service و repository و entity، أحسن من package لكل نوع ([[controllers]] و [[services]]) في المشاريع الكبيرة.

الـ dependency IDs في الـ API ([[web]] و [[data-jpa]]...) هي نفس اللي في الواجهة. وفيه starters مهمة للتطوير: [[devtools]] (restart أوتوماتيك لما تحفظ) و [[docker-compose]] (بيشغّل [[compose.yaml]] اللي في المشروع لوحده وبيوصّل الـ datasource).

التطبيق فيه Tomcat جواه (embedded server)، فمش محتاج تسطّب server: [[java -jar]] بيفتح بورت 8080.`,
            when: R`كل مشروع جديد. ولو بتضيف feature لمشروع موجود، استخدم الموقع عشان تعرف اسم الـ starter الصح وبعدين ضيفه للـ pom.`,
            mistakes: R`تحط classes برّه الـ package الأساسي فـ Spring ميلاقيهاش (الـ endpoint يرجع 404 من غير أي خطأ). وتختار كل الـ dependencies «عشان لو احتجتها»: كل starter بيعمل auto-configuration، و JPA من غير داتابيز بيوقع التطبيق. وتنزّل مثال من النت بـ Spring Boot 2 و [[javax]].`
          },
          teach: R`## الأوامر بتعمل إيه؟

بدل ما تفتح الموقع وتدوس بالماوس، أول أمر بيطلب نفس الـ zip من start.spring.io بـ [[curl]]. وبعدين تفكه، وتبص على الهيكل، وتشغّل. الـ [[curl]] اتشغّل من Git Bash على ويندوز، والباقي جوه [[maven:3.9-eclipse-temurin-25]] (JDK 25، وسطّبنا فيه [[unzip]] و [[tree]] لأنهم مش موجودين في الـ image).

---

## ١. [[curl]]: طلب المشروع

~~~bash
curl https://start.spring.io/starter.zip -d type=maven-project -d javaVersion=25 -d groupId=com.example -d artifactId=tasks-api -d dependencies=web,data-jpa,postgresql,validation,flyway,actuator -o tasks-api.zip
~~~

| الحتة | معناها |
|---|---|
| [[curl URL]] | اطلب الرابط ده |
| [[/starter.zip]] | الـ endpoint اللي بيرجّع المشروع كـ zip |
| [[-d key=value]] | (d = data) ابعت قيمة مع الطلب. وجود [[-d]] بيخلي الطلب POST |
| [[type=maven-project]] | Maven. والبديل [[gradle-project-kotlin]] أو [[gradle-project]] (Groovy) |
| [[javaVersion=25]] | نسخة Java |
| [[groupId]] و [[artifactId]] | إحداثيات مشروعك (درس pom.xml) |
| [[dependencies=...]] | الـ starters، مفصولين بفاصلة من غير مسافات |
| [[-o tasks-api.zip]] | (o = output) احفظ الرد في ملف بدل ما تطبعه |

الـ dependencies اللي اخترناها:

| الـ id | بيجيب |
|---|---|
| [[web]] | Spring MVC و Tomcat و Jackson: REST APIs |
| [[data-jpa]] | Spring Data JPA و Hibernate: الداتابيز بالـ objects |
| [[postgresql]] | الـ driver |
| [[validation]] | [[@NotBlank]] و [[@Email]] (Jakarta Validation) |
| [[flyway]] | migrations للداتابيز بملفات SQL |
| [[actuator]] | [[/actuator/health]] وغيره للمراقبة |

الملف اللي نزل: ١٥٧٦٨ بايت. ومن غير [[bootVersion]] الموقع بيختار آخر نسخة مستقرة، وهنا كانت Spring Boot 4.1.1.

---

## ٢. [[unzip ... && cd ...]]

~~~bash
unzip tasks-api.zip -d tasks-api && cd tasks-api
~~~

- [[unzip tasks-api.zip -d tasks-api]]: فك الـ zip في فولدر اسمه tasks-api (d = directory).
- [[&&]]: نفّذ اللي بعدها بس لو اللي قبلها نجح. لو الفك فشل، مش هتدخل فولدر مش موجود.

الملفات اللي طلعت:

~~~text الناتج
.gitattributes
.gitignore
.mvn/wrapper/maven-wrapper.properties
HELP.md
mvnw
mvnw.cmd
pom.xml
src/main/java/com/example/tasks_api/TasksApiApplication.java
src/main/resources/application.properties
src/test/java/com/example/tasks_api/TasksApiApplicationTests.java
~~~

| الملف | هو إيه |
|---|---|
| [[pom.xml]] | ملف المشروع (درس pom.xml) |
| [[mvnw]] و [[mvnw.cmd]] و [[.mvn/]] | الـ Maven wrapper للينكس والماك ولويندوز (درس mvnw) |
| [[HELP.md]] | روابط docs للـ starters اللي اخترتها |
| [[.gitignore]] | بيتجاهل [[target/]] وملفات الـ IDE |

---

## ٣. [[tree src]]

~~~bash
tree src
~~~

~~~text الناتج
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── tasks_api
│   │               └── TasksApiApplication.java
│   └── resources
│       ├── application.properties
│       ├── db
│       │   └── migration
│       ├── static
│       └── templates
└── test
    └── java
        └── com
            └── example
                └── tasks_api
                    └── TasksApiApplicationTests.java

16 directories, 3 files
~~~

- [[src/main/java]]: الكود. الـ package [[com.example.tasks_api]] جاي من groupId + artifactId، والشرطة اتحولت [[_]] لأن [[-]] مش مسموحة في أسماء packages. ولو عايز [[com.example.tasks]] ابعت [[-d packageName=com.example.tasks]].
- [[TasksApiApplication.java]]: الـ main class (الدرس الجاي).
- [[src/main/resources]]: الملفات اللي مش كود: [[application.properties]] (الإعدادات، وجواه سطر واحد [[spring.application.name=tasks-api]])، و [[db/migration]] اتعمل عشان اخترنا Flyway (هنا هتحط ملفات زي [[V1__init.sql]])، و [[static]] و [[templates]] لصفحات HTML لو احتجتها.
- [[src/test/java]]: التستات، وفيها تست جاهز [[contextLoads]] بيتأكد إن التطبيق بيقوم.
- لو [[tree]] مش موجود عندك: على ويندوز [[tree /f src]] في CMD، أو استخدم [[find src]].

---

## ٤. [[./mvnw spring-boot:run]]: وبيقع!

~~~bash
./mvnw spring-boot:run
~~~

بالـ dependencies دي التطبيق مش هيقوم. آخر الناتج:

~~~text الناتج
... Tomcat initialized with port 8080 (http)
... Exception encountered during context initialization - cancelling refresh attempt: ... Error creating bean with name 'dataSource' ... Failed to determine a suitable driver class

***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class

Action:

Consider the following:
	If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
	If you have database settings to be loaded from a particular profile you may need to activate it (no profiles are currently active).
~~~

نقراها:

- [[Description]]: Spring لقى JPA و Flyway فعايز DataSource (اتصال بداتابيز)، ومش لاقي [[url]] (عنوان الداتابيز).
- [[Reason]]: من غير url مش عارف يختار driver.
- [[Action]]: الحلول: داتابيز embedded (زي H2) في الـ classpath، أو تفعّل profile فيه الإعدادات.

يعني الـ auto-configuration شغال بالظبط زي ما المفروض (الدرس الجاي). الحل [[spring.datasource.url]] (درس الإعدادات و JPA)، أو starter [[docker-compose]] مع [[compose.yaml]] فيه postgres.

### ومشروع فيه Spring Web بس؟

عملنا مشروع بـ [[dependencies=web]]، وشغّلناه، وطلبنا [[/]]:

~~~text الناتج
... Tomcat started on port 8080 (http) with context path '/'
~~~

~~~bash
curl localhost:5945/
~~~

~~~text الناتج
{"timestamp":"2026-10-07T17:48:25.367Z","status":404,"error":"Not Found","path":"/"}
~~~

([[5945]] لأن بورت 8080 بتاع الـ container متوصّل بـ 5945 على الجهاز.) [[curl]] خد الـ 404 كـ JSON. والمتصفح بيطلب HTML، فبيشوف صفحة «Whitelabel Error Page». طلبناها زيه بـ [[curl -H "Accept: text/html" localhost:5945/]]:

~~~text الناتج
<html><body><h1>Whitelabel Error Page</h1><p>This application has no explicit mapping for /error, so you are seeing this as a fallback.</p>...
~~~

404 لأن مفيش controller لسه. ده طبيعي، ومعناه إن Tomcat شغال.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| مشروع جديد | start.spring.io أو [[curl https://start.spring.io/starter.zip -d ...]] |
| فكه | [[unzip ... -d folder]] |
| الهيكل | [[src/main/java]] و [[src/main/resources]] و [[src/test/java]] |
| شغّل | [[./mvnw spring-boot:run]] |

- كل starter بتختاره بيعمل auto-configuration، و JPA من غير داتابيز بيوقع التطبيق.
- الكود كله لازم تحت الـ package بتاع الـ main class.`,
          lines: [
            R`بيطلب zip من الموقع بالاختيارات: Maven و Java 25 والـ starters. (دي نفس اختيارات الواجهة.)`,
            "فك الملف وادخل الفولدر.",
            "شوف الهيكل.",
            "شغّل. بالـ dependencies دي هيقع بـ «Failed to configure a DataSource» لحد ما تدّيله عنوان داتابيز (شوف الحل)."
          ],
          sol: R`مع Spring Web بس: التطبيق بيقوم على 8080، و [[localhost:8080]] بيعرض «Whitelabel Error Page» بـ 404، لأن مفيش controller لسه. ده طبيعي ومعناه إن Tomcat شغال.

ولما تضيف JPA و PostgreSQL من غير إعدادات: التطبيق بيقع وقت البداية بـ [[APPLICATION FAILED TO START]] و [[Failed to configure a DataSource: 'url' attribute is not specified]]. الـ auto-configuration شاف JPA فحاول يوصّل بداتابيز ومش لاقي عنوان. الحل: [[spring.datasource.url]] (درس الـ entities)، أو starter [[docker-compose]] مع [[compose.yaml]] فيه postgres.`
        },
        {
          cmd: "@SpringBootApplication",
          title: "إزاي Spring بيشغّل Tomcat ويوصّل الداتابيز من غير ما تكتب حاجة؟",
          desc: R`[[@SpringBootApplication]] على الـ main class بيجمع ٣ حاجات: [[@Configuration]] (الـ class ده ممكن يعرّف beans)، و [[@ComponentScan]] (دوّر في الـ package ده وتحته على classes عليها [[@Component]] و [[@Service]] و [[@RestController]]...)، و [[@EnableAutoConfiguration]].

الـ auto-configuration هي السحر: Spring Boot بيبص على المكتبات الموجودة والإعدادات، ويعمل الحاجات المعتادة لوحده. لقى Tomcat و Spring MVC؟ يشغّل web server. لقى driver وعنوان داتابيز؟ يعمل connection pool. وأي حاجة تعرّفها انت بنفسك بتكسب على الافتراضي.`,
          example: R`package com.example.tasks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TasksApplication {
  public static void main(String[] args) {
    SpringApplication.run(TasksApplication.class, args);
  }
}`,
          try: R`شغّل التطبيق بـ [[--debug]] ([[./mvnw spring-boot:run -Dspring-boot.run.arguments=--debug]] أو [[java -jar app.jar --debug]]) ودوّر في اللوج على «CONDITIONS EVALUATION REPORT». لاقي [[DataSourceAutoConfiguration]] في أنهي قسم، وليه.`,
          flag: "script",
          deep: {
            why: R`في Spring القديم كنت بتكتب مئات السطور XML عشان توصّل كل حاجة. Boot بيعمل الافتراضي المعقول وانت بتغيّر اللي محتاجه بس. لكن لو مفهمتش الآلية، أول ما حاجة متشتغلش هتحس إنه سحر أسود.`,
            how: R`[[SpringApplication.run]] بيعمل الـ ApplicationContext: الحاوية اللي فيها كل الـ beans (الـ objects اللي Spring بيديرها). بيقرا الإعدادات، ويعمل scan للـ components، وبعدين يحمّل الـ auto-configurations.

كل auto-configuration class فيه شروط: [[@ConditionalOnClass(DataSource.class)]] (لو المكتبة موجودة)، و [[@ConditionalOnMissingBean]] (لو انت معملتش واحد)، و [[@ConditionalOnProperty]] (لو إعداد معين). عشان كده لو عرّفت [[@Bean ObjectMapper]] أو [[@Bean SecurityFilterChain]] بتاعك، الافتراضي بيتلغي.

والتقرير اللي بيطلع بـ [[--debug]] بيقسم الـ configurations لـ Positive matches (اشتغلت وليه) و Negative matches (مااشتغلتش وليه). ودي أداة التشخيص الأهم لما حاجة «مش بتتعمل لوحدها». وفي Actuator فيه endpoint [[/actuator/conditions]] بنفس المعلومات.`,
            when: R`كل تطبيق فيه واحد بس. وبتحتاج تفهمه لما: حاجة مش بتتعمل أوتوماتيك، أو عايز تلغي حاجة ([[@SpringBootApplication(exclude = ...)]])، أو bean متعرّف مرتين.`,
            mistakes: R`كذا class عليهم [[@SpringBootApplication]]. والـ main class في package أعمق من الكود ([[com.example.tasks.app]] والـ controllers في [[com.example.tasks.web]]) فالـ scan مش بيشوفهم. وتعمل [[exclude]] لـ auto-configuration عشان خطأ بدل ما تفهم الخطأ.

في الانترفيو: «Spring Boot بيعمل auto-configuration إزاي؟» الإجابة: conditional beans بتتحمّل من قايمة في الـ jars ([[META-INF/spring/...AutoConfiguration.imports]])، وشروط على الـ classpath والـ beans والـ properties، وكودك بيكسب.`
          },
          teach: R`## الكلاس ده بيعمل إيه؟

ده كل اللي محتاجه عشان تطبيق Spring Boot يقوم: class عليه annotation واحدة، و [[main]] فيها سطر واحد. السطر ده بيعمل الـ objects كلها، ويشغّل Tomcat، ويوصّل الحاجات ببعض. حطيناه بالظبط في مشروع من start.spring.io (Spring Web بس، Spring Boot 4.1.1)، وشغّلناه بـ [[java -jar]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الـ package

~~~java
package com.example.tasks;
~~~

- [[package]]: «الكلاس ده في الفولدر [[com/example/tasks]]». أسماء الـ packages عادة الدومين بالعكس ([[example.com]] ← [[com.example]]) وبعده اسم المشروع.
- ده **أهم سطر** في الملف: Spring بيدوّر على الكلاسات بتاعتك في الـ package ده وكل اللي تحته بس. أي controller في [[com.example.other]] مش هيتشاف.

---

## ٢. الـ imports

~~~java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
~~~

[[SpringApplication]]: الكلاس اللي بيشغّل كل حاجة. و [[SpringBootApplication]]: الـ annotation. لاحظ إن الـ annotation في package اسمه [[autoconfigure]].

---

## ٣. [[@SpringBootApplication]]

~~~java
@SpringBootApplication
public class TasksApplication {
~~~

الـ [[@]] قبل الاسم معناها annotation: علامة على الكلاس بيقراها Spring. والـ annotation دي ٣ في واحدة:

| جواها | بتقول لـ Spring |
|---|---|
| [[@SpringBootConfiguration]] (نوع من [[@Configuration]]) | الكلاس ده ممكن يعرّف beans بـ [[@Bean]] (درس beans و DI) |
| [[@ComponentScan]] | دوّر في الـ package ده وتحته على كلاسات عليها [[@Component]] و [[@Service]] و [[@RestController]]... واعمل منهم objects |
| [[@EnableAutoConfiguration]] | شغّل الـ auto-configuration: اعمل الحاجات المعتادة حسب المكتبات الموجودة |

---

## ٤. [[main]]

~~~java
  public static void main(String[] args) {
    SpringApplication.run(TasksApplication.class, args);
  }
}
~~~

- [[public static void main(String[] args)]]: نقطة البداية العادية في أي برنامج Java. [[args]] الـ arguments اللي بتتكتب بعد اسم البرنامج.
- [[TasksApplication.class]]: الـ class نفسه كـ object. Spring بيبص على الـ annotations اللي عليه وعلى الـ package بتاعه، عشان يعرف يبدأ منين.
- [[args]]: بيتبعتوا لـ Spring، فـ [[--server.port=9090]] أو [[--debug]] بيوصلوا.

[[SpringApplication.run]] بيعمل بالترتيب:

1. يقرا الإعدادات ([[application.properties]] والـ args والـ environment variables).
2. يعمل الـ **ApplicationContext**: الحاوية اللي فيها كل الـ beans (الـ objects اللي Spring بيديرها).
3. الـ component scan: يلاقي كلاساتك ويسجّلها.
4. الـ auto-configurations: يقيّم شروط كل واحدة ويشغّل اللي اتحققت.
5. يعمل الـ beans ويوصّلهم ببعض، ويشغّل Tomcat.

الناتج:

~~~text الناتج
 :: Spring Boot ::                (v4.1.1)
... Starting TasksApplication v0.0.1-SNAPSHOT using Java 25.0.4.1 with PID 1
... No active profile set, falling back to 1 default profile: "default"
... Tomcat initialized with port 8080 (http)
... Starting Servlet engine: [Apache Tomcat/11.0.24]
... Root WebApplicationContext: initialization completed in 2119 ms
... Tomcat started on port 8080 (http) with context path '/'
... Started TasksApplication in 3.942 seconds (process running for 5.062)
~~~

إحنا مكتبناش ولا سطر عن Tomcat. الـ auto-configuration لقى Tomcat في الـ classpath (جاي مع starter الويب) فشغّله. و [[run]] مبترجعش: البرنامج بيفضل شغال طول ما Tomcat شغال.

---

## ٥. «ليه اشتغل؟»: [[--debug]]

~~~bash
java -jar target/tasks-api-0.0.1-SNAPSHOT.jar --debug
~~~

[[--debug]] بيطبع تقرير اسمه CONDITIONS EVALUATION REPORT، فيه كل auto-configuration واتشغّلت ولا لأ وليه:

~~~text الناتج
CONDITIONS EVALUATION REPORT
============================

Positive matches:
-----------------

   AopAutoConfiguration matched:
   ...
   DispatcherServletAutoConfiguration matched:
      - @ConditionalOnClass found required class 'org.springframework.web.servlet.DispatcherServlet' (OnClassCondition)
      - found 'session' scope (OnWebApplicationCondition)
   ...
   TomcatServletWebServerAutoConfiguration matched:
      - @ConditionalOnClass found required classes 'jakarta.servlet.ServletRequest', 'org.apache.catalina.startup.Tomcat', ...
~~~

| الشرط | معناه |
|---|---|
| [[@ConditionalOnClass]] | اشتغل لو الـ class ده موجود في الـ classpath (يعني المكتبة موجودة) |
| [[OnWebApplicationCondition]] | اشتغل لو ده تطبيق ويب ([[session]] scope موجود بس في تطبيقات الويب) |
| [[@ConditionalOnMissingBean]] | اشتغل لو انت معرّفتش bean من النوع ده بنفسك |
| [[@ConditionalOnProperty]] | اشتغل لو إعداد معين قيمته كذا |

والـ Negative matches: اللي ماشتغلتش وليه. مثلًا:

~~~text الناتج
Negative matches:
-----------------

   AopAutoConfiguration.AspectJAutoProxyingConfiguration:
      Did not match:
         - @ConditionalOnClass did not find required class 'org.aspectj.weaver.Advice' (OnClassCondition)
~~~

مكتبة AspectJ مش موجودة، فالجزء ده متعملش.

### Spring بيجيب القايمة دي منين؟

كل jar فيه auto-configurations فيه ملف [[META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports]]، وفيه أسماء الكلاسات سطر سطر. فتحنا اللي في [[spring-boot-webmvc-4.1.1.jar]]:

~~~text الناتج
org.springframework.boot.webmvc.autoconfigure.DispatcherServletAutoConfiguration
org.springframework.boot.webmvc.autoconfigure.WebMvcAutoConfiguration
org.springframework.boot.webmvc.autoconfigure.WebMvcObservationAutoConfiguration
...
~~~

في Spring Boot 4 كل تقنية في jar لوحدها ([[spring-boot-webmvc]] و [[spring-boot-tomcat]] و [[spring-boot-jackson]]...)، وكل واحد معاه الملف ده. عشان كده في مشروع Web بس، [[DataSourceAutoConfiguration]] مش موجودة في التقرير خالص (بحثنا عنها: صفر مرات): الـ jar بتاعها مش في المشروع أصلًا.

وفي المشروع اللي فيه JPA (اتشغّل بـ [[./mvnw spring-boot:run -Dspring-boot.run.arguments=--debug]]، وده الشكل لما تشغّل من Maven):

~~~text الناتج
   DataSourceAutoConfiguration matched:
      - @ConditionalOnClass found required classes 'javax.sql.DataSource', 'org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType' (OnClassCondition)
      - @ConditionalOnMissingBean (types: io.r2dbc.spi.ConnectionFactory; SearchStrategy: all) did not find any beans (OnBeanCondition)
~~~

الشرطين اتحققوا: المكتبات موجودة، ومفيش bean بتاع R2DBC (داتابيز reactive). فحاول يعمل DataSource، ووقع لأن مفيش url (درس start.spring.io).

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[package com.example.tasks]] | الـ scan بيبدأ من هنا ولتحت |
| [[@SpringBootApplication]] | configuration + component scan + auto-configuration |
| [[SpringApplication.run(X.class, args)]] | يعمل الـ context والـ beans ويشغّل Tomcat |
| [[--debug]] | تقرير الشروط: Positive و Negative matches |
| [[@ConditionalOn...]] | الشروط اللي كل auto-configuration مستنياها |

- الـ main class في أعلى package، وكل الكود تحته.
- أي bean بتعرّفه بنفسك بيكسب على الافتراضي ([[@ConditionalOnMissingBean]]).`,
          lines: [
            R`الـ package الأساسي: كل الكود تحته.`,
            R`[[SpringApplication]] اللي بيشغّل كل حاجة.`,
            "الـ annotation.",
            R`configuration و component scan و auto-configuration في annotation واحدة.`,
            "الـ class الرئيسي.",
            R`[[main]] العادي بتاع Java.`,
            R`بيعمل الـ context ويشغّل Tomcat، ويفضل شغال لحد ما توقفه.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`في التقرير هتلاقي قسمين: Positive matches و Negative matches. في مشروعنا (فيه JPA و datasource) لقينا تحت Positive matches: [[DataSourceAutoConfiguration matched:]] وتحتها [[@ConditionalOnClass found required classes 'javax.sql.DataSource', ...]] و [[@ConditionalOnMissingBean (types: io.r2dbc.spi.ConnectionFactory ...) did not find any beans]].

ولو المشروع فيه Web بس: مش هتلاقي [[DataSourceAutoConfiguration]] في التقرير خالص. في Spring Boot 4 الـ auto-configurations اتقسمت على modules، و JDBC في module لوحده بييجي مع starter الـ JPA أو JDBC، فمن غيرهم الـ class مش موجود أصلًا عشان يتقيّم. في Boot 3 كنت هتلاقيه في Negative matches بسبب [[did not find required class]].

الدرس: كل حاجة Boot بيعملها ليها شرط مكتوب، والتقرير بيقولك بالظبط ليه اتعملت أو لأ. (الـ [[-Dspring-boot.run.arguments]] بيعدّي arguments للتطبيق من Maven.)`
        },
        {
          cmd: "beans و DI",
          title: "Spring بيعمل الـ objects ويوصّلها ببعض: dependency injection",
          desc: R`الـ bean object بيديره Spring: هو اللي بيعمله، وبيديله اللي محتاجه، وبيقفله في الآخر. بتقول لـ Spring «اعمل ده» بطريقتين: annotation على الـ class ([[@Service]] و [[@Component]] و [[@Repository]] و [[@RestController]])، أو method عليها [[@Bean]] جوه class عليه [[@Configuration]] (للـ objects من مكتبات مش بتاعتك، زي [[Clock]]).

والـ dependency injection: الـ class بيكتب اللي محتاجه في الـ constructor، و Spring بيدوّر على bean من النوع ده ويبعته. انت عمرك ما بتكتب [[new GreetingService(...)]]. ده نفس فكرة درس الـ interfaces في المستوى الأول، بس Spring هو اللي بيعمل الـ [[new]]. (لو استخدمت NestJS، نفس الفكرة بالظبط.)`,
          example: R`@Configuration
public class AppConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}

@Service
public class GreetingService {
    private final Clock clock;

    public GreetingService(Clock clock) {
        this.clock = clock;
    }

    public String greet(String name) {
        int hour = LocalTime.now(clock).getHour();
        return (hour < 12 ? "Good morning, " : "Good evening, ") + name;
    }
}

@RestController
public class HelloController {
    private final GreetingService greetings;

    public HelloController(GreetingService greetings) {
        this.greetings = greetings;
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "world") String name) {
        return greetings.greet(name);
    }
}`,
          try: R`اعمل الـ ٣ classes (كل واحد في ملف في الـ package الأساسي) وافتح [[localhost:8080/hello?name=Sara]]. وبعدين شيل [[@Service]] من GreetingService وشغّل: اقرا رسالة الخطأ كاملة. وأخيرًا اكتب unit test لـ [[GreetingService]] من غير Spring خالص، بـ [[Clock.fixed(...)]] الساعة ٩ الصبح.`,
          flag: "script",
          deep: {
            why: R`لو كل class بيعمل [[new]] للي محتاجه، مستحيل تبدّل حاجة في التست (الساعة، أو الـ payment gateway، أو الإيميل). الـ DI بيخلي كل class يطلب اللي محتاجه بس، فتقدر في التست تبعتله fake. ومعظم Spring (الـ transactions والـ security والـ caching) شغال عن طريق إن Spring هو اللي بيعمل الـ objects.`,
            how: R`وقت البداية Spring بيجمع تعريفات كل الـ beans، ويرتبهم حسب مين محتاج مين، ويعملهم. الـ constructor injection: لو فيه constructor واحد، Spring بيستخدمه لوحده من غير [[@Autowired]].

الـ beans افتراضيًا singleton: نسخة واحدة للتطبيق كله، مشتركة بين كل الـ requests (درس bean scopes في الانترفيو). عشان كده الحقول تبقى [[final]] ومفيش state بتتغير.

لو فيه أكتر من bean من نفس النوع (مثلًا اتنين implementations لـ [[PaymentGateway]])، Spring مش هيعرف يختار: [[NoUniqueBeanDefinitionException]]. الحل [[@Primary]] على واحد، أو [[@Qualifier("paymob")]] في الـ constructor، أو تطلب [[List<PaymentGateway>]] تاخدهم كلهم.

[[@Component]] و [[@Service]] و [[@Repository]] كلهم نفس الحاجة تقريبًا، الفرق في المعنى (و [[@Repository]] بيحوّل أخطاء الداتابيز لـ exceptions بتاعة Spring). و [[@RestController]] = [[@Controller]] + إن الرجوع يبقى JSON.`,
            when: R`[[@Service]] للـ business logic، و [[@RestController]] للـ HTTP، و [[@Repository]] (أو interfaces بتورث من JpaRepository، مش محتاجة annotation) للداتابيز. و [[@Bean]] للحاجات من مكتبات تانية أو اللي محتاجة إعداد (Clock، و HTTP client، و ObjectMapper مخصوص).`,
            mistakes: R`field injection: [[@Autowired private GreetingService greetings;]]: شائع في الكود القديم، بس بيخبي الـ dependencies وبيمنع [[final]] وبيصعّب التست من غير Spring؛ استخدم الـ constructor. و circular dependency (A محتاج B و B محتاج A): Spring Boot بيرفضها افتراضيًا، والحل تصميم أحسن مش [[@Lazy]]. وتعمل [[new MyService()]] بإيدك فتلاقي كل حاجة جواه null ومفيش transactions.`
          },
          teach: R`## الكود بيعمل إيه؟

٣ classes: [[AppConfig]] بيعرّف ساعة ([[Clock]])، و [[GreetingService]] بتستخدم الساعة عشان تقول صباح الخير أو مساء الخير، و [[HelloController]] بيرد على [[GET /hello]] بالرسالة. ولا واحد فيهم بيعمل [[new]] للتاني: Spring هو اللي بيعمل الـ ٣ ويوصّلهم.

اتجرّب كده: كل class في ملف لوحده في [[com.example.tasks]] (جنب [[TasksApplication]] من الدرس اللي فات)، في مشروع Spring Web بس على Spring Boot 4.1.1، واتشغّل في [[maven:3.9-eclipse-temurin-25]] (JDK 25) والبورت 8080 متوصّل بـ 5945 على الجهاز.

> المثال مكتوب من غير [[package]] و [[import]] عشان يبقى قصير. في الملفات الحقيقية كل ملف أوله [[package com.example.tasks;]] وبعده الـ imports: [[java.time.Clock]] و [[java.time.LocalTime]]، و [[org.springframework.context.annotation.Bean]] و [[Configuration]]، و [[org.springframework.stereotype.Service]]، و [[org.springframework.web.bind.annotation.GetMapping]] و [[RequestParam]] و [[RestController]]. الـ IDE بيضيفهم لوحده.

---

## ١. [[AppConfig]]: bean من مكتبة مش بتاعتك

~~~java
@Configuration
public class AppConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
~~~

- [[@Configuration]]: «الكلاس ده فيه تعريفات beans». الـ component scan بيلاقيه زي أي component.
- [[@Bean]] على method: Spring بينادي الـ method دي مرة واحدة وقت البداية، والـ object اللي بترجعه بيتسجّل كـ bean. النوع [[Clock]] واسمه [[clock]] (اسم الـ method).
- ليه [[@Bean]] مش [[@Component]]؟ لأن [[Clock]] class من Java نفسها، مش هتقدر تحط عليه annotation. فبتقول لـ Spring «اعمله كده».
- [[Clock.systemUTC()]]: ساعة حقيقية بتوقيت UTC (توقيت جرينتش، مصر +3 في الصيف).

---

## ٢. [[GreetingService]]: بيطلب اللي محتاجه

~~~java
@Service
public class GreetingService {
    private final Clock clock;

    public GreetingService(Clock clock) {
        this.clock = clock;
    }
~~~

- [[@Service]]: «اعمل object من الكلاس ده وسجّله كـ bean». هو [[@Component]] بالظبط، بس الاسم بيقول إنه business logic.
- [[private final Clock clock]]: الـ dependency. [[final]] لأنها بتتحط مرة واحدة ومبتتغيرش.
- الـ constructor بياخد [[Clock]]: ده **الطلب**. Spring وهو بيعمل [[GreetingService]] بيشوف إنها محتاجة Clock، يدوّر على bean من النوع ده، يلاقي اللي [[AppConfig]] عرّفه، ويبعته. ده اسمه **constructor injection**.
- مفيش [[@Autowired]]: لو الكلاس فيه constructor واحد، Spring بيستخدمه لوحده.

~~~java
    public String greet(String name) {
        int hour = LocalTime.now(clock).getHour();
        return (hour < 12 ? "Good morning, " : "Good evening, ") + name;
    }
}
~~~

- [[LocalTime.now(clock)]]: الوقت دلوقتي **حسب الساعة دي**. لو كتبت [[LocalTime.now()]] من غير باراميتر، هتاخد ساعة الجهاز ومش هتقدر تغيّرها في التست.
- [[.getHour()]]: الساعة من 0 لـ 23.
- [[hour < 12 ? A : B]]: الـ ternary زي JS: لو الشرط صح A وإلا B.

---

## ٣. [[HelloController]]: الـ HTTP

~~~java
@RestController
public class HelloController {
    private final GreetingService greetings;

    public HelloController(GreetingService greetings) {
        this.greetings = greetings;
    }
~~~

- [[@RestController]]: bean كمان، والـ methods بتاعته بترد على HTTP، واللي بترجعه بيبقى body الـ response (String كده زي ما هو، و object بيتحول JSON).
- نفس الحكاية: الـ constructor بيطلب [[GreetingService]]، و Spring بيبعت الـ bean اللي عمله.

ترتيب البناء اللي Spring بيعمله لوحده (حسب مين محتاج مين):

~~~text مين محتاج مين
Clock            (من AppConfig.clock())
  └── GreetingService(clock)
        └── HelloController(greetings)
~~~

~~~java
    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "world") String name) {
        return greetings.greet(name);
    }
}
~~~

- [[@GetMapping("/hello")]]: أي [[GET /hello]] يروح للـ method دي.
- [[@RequestParam]]: الباراميتر [[name]] جاي من الـ query string ([[?name=Sara]]). و [[defaultValue = "world"]]: لو مش موجود خده [["world"]] بدل ما يرجع 400.
- الـ controller مش بيعمل أي logic: بيسلّم الشغل للـ service.

---

## ٤. التشغيل

~~~bash
curl -i "localhost:5945/hello?name=Sara"
~~~

~~~text الناتج
HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 18
Date: Wed, 07 Oct 2026 17:48:25 GMT

Good evening, Sara
~~~

- [[-i]]: اطبع الـ headers كمان.
- [[text/plain]]: لأن الـ method رجّعت String.
- [[Good evening]]: الطلب اتعمل الساعة 17:48 بتوقيت UTC، يعني 17 مش أقل من 12.

~~~bash
curl "localhost:5945/hello"
~~~

~~~text الناتج
Good evening, world
~~~

الـ [[defaultValue]] اشتغل.

---

## ٥. لو شلت [[@Service]]

كتبنا [[// @Service]] (يعني بقت comment) وشغّلنا:

~~~text الناتج
***************************
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of constructor in com.example.tasks.HelloController required a bean of type 'com.example.tasks.GreetingService' that could not be found.


Action:

Consider defining a bean of type 'com.example.tasks.GreetingService' in your configuration.
~~~

- [[Parameter 0 of constructor in ...HelloController]]: أول باراميتر (العدّ من صفر) في constructor الـ controller.
- [[required a bean of type ... that could not be found]]: محتاج GreetingService، ومفيش bean منها: من غير [[@Service]] الـ scan عدّى عليها ومعملهاش.
- التطبيق **مقامش خالص**. ده كويس: الغلطة بتبان أول ما تشغّل، مش لما request يوصل.

---

## ٦. الحل: تست من غير Spring

~~~java
import static org.assertj.core.api.Assertions.assertThat;

import java.time.*;
import org.junit.jupiter.api.Test;

class GreetingServiceTest {
    @Test
    void morningGreeting() {
        Clock nineAm = Clock.fixed(Instant.parse("2026-09-30T09:00:00Z"), ZoneOffset.UTC);
        var service = new GreetingService(nineAm);
        assertThat(service.greet("Sara")).isEqualTo("Good morning, Sara");
    }
}
~~~

- [[import static ...assertThat]]: [[static]] import بيخليك تكتب [[assertThat(...)]] من غير اسم الكلاس قبلها. و AssertJ مكتبة جاية مع starter التست.
- [[@Test]]: JUnit هيشغّل الـ method دي كتست. (التست مكانه [[src/test/java/com/example/tasks/]] وأوله [[package com.example.tasks;]] زي الكلاس اللي بيختبره.)
- [[Instant.parse("2026-09-30T09:00:00Z")]]: لحظة معينة. الـ [[Z]] في الآخر يعني UTC.
- [[Clock.fixed(instant, ZoneOffset.UTC)]]: ساعة **واقفة** على اللحظة دي دايمًا.
- [[new GreetingService(nineAm)]]: هنا احنا اللي بنعمل [[new]] وبنبعت الساعة الوهمية. مفيش Spring خالص.
- [[assertThat(x).isEqualTo(y)]]: لو x مش y التست يفشل.

جوه [[./mvnw test]]:

~~~text الناتج
[INFO] Running com.example.tasks.GreetingServiceTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.458 s -- in com.example.tasks.GreetingServiceTest
~~~

أقل من نص ثانية، مقابل ٩ ثواني للتست اللي بيشغّل Spring كله ([[TasksApplicationTests]]). ده مكسب الـ constructor injection: الكلاس مش عارف ولا مهتم مين اللي بيبعتله الساعة.

---

## الخلاصة

| الطريقة | إمتى |
|---|---|
| [[@Service]] و [[@Component]] و [[@Repository]] و [[@RestController]] على الكلاس | كلاساتك انت |
| [[@Bean]] على method جوه [[@Configuration]] | objects من مكتبات تانية أو محتاجة إعداد |
| constructor فيه الـ dependencies | الطريقة الصح للحقن، والحقول [[final]] |

- Spring بيعمل كل bean مرة واحدة (singleton) ويبعته لكل اللي طالبه.
- لو bean مطلوب ومش موجود، التطبيق مش بيقوم، والرسالة بتقولك مين طلب إيه.
- في التست ابعت fake بنفسك بـ [[new]].`,
          lines: [
            R`[[@Configuration]]: class فيه تعريفات beans.`,
            "بداية الـ class.",
            R`[[@Bean]]: الـ method دي بترجع object، و Spring يسجّله كـ bean.`,
            R`الـ bean نوعه [[Clock]] (من Java نفسها) واسمه clock.`,
            "الساعة الحقيقية بتوقيت UTC.",
            "قفلة.",
            "قفلة.",
            R`[[@Service]]: Spring هيعمل object من الـ class ده.`,
            "بداية الـ class.",
            R`الـ dependency: [[final]] لأنها بتتحط مرة في الـ constructor.`,
            R`الـ constructor بيطلب Clock، و Spring بيبعت الـ bean اللي عرّفناه فوق.`,
            "بيحفظه.",
            "قفلة.",
            R`الـ business logic.`,
            R`الساعة من الـ Clock المحقون، مش من [[LocalTime.now()]] مباشرة، عشان التست يقدر يثبّتها.`,
            "الرسالة حسب الوقت.",
            "قفلة.",
            "قفلة.",
            R`[[@RestController]]: bean كمان، والـ methods بترجع body الـ response.`,
            "بداية.",
            "الـ dependency.",
            R`Spring بيحقن [[GreetingService]] هنا.`,
            "بيحفظه.",
            "قفلة.",
            R`[[GET /hello]] بيروح للـ method دي.`,
            R`[[?name=...]] من الـ URL، واختيارية بقيمة افتراضية.`,
            "بيسلّم الشغل للـ service.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[/hello?name=Sara]] بيرجع [[Good morning, Sara]] أو [[Good evening, Sara]] حسب الساعة بتوقيت UTC (مش توقيت مصر! ده بالظبط سبب إننا خلينا الـ Clock bean: تقدر تغيّره لـ [[Clock.system(ZoneId.of("Africa/Cairo"))]] في مكان واحد).

من غير [[@Service]]: التطبيق مش بيقوم، و [[APPLICATION FAILED TO START]] و [[Parameter 0 of constructor in ...HelloController required a bean of type '...GreetingService' that could not be found.]] ومعاها [[Action: Consider defining a bean of type ...]].

والتست تحت: مفيش Spring خالص، بس [[new]] وبتبعت ساعة ثابتة. بيشتغل في أجزاء من الثانية. ده مكسب الـ constructor injection.`,
          solCode: R`import static org.assertj.core.api.Assertions.assertThat;

import java.time.*;
import org.junit.jupiter.api.Test;

class GreetingServiceTest {
    @Test
    void morningGreeting() {
        Clock nineAm = Clock.fixed(Instant.parse("2026-09-30T09:00:00Z"), ZoneOffset.UTC);
        var service = new GreetingService(nineAm);
        assertThat(service.greet("Sara")).isEqualTo("Good morning, Sara");
    }
}`
        }
      ]
    }
]);
