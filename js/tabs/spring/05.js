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
    }
]);
