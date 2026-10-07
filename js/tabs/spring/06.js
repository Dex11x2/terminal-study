// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
    }
]);
