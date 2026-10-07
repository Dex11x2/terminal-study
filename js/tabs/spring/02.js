// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
    {
      t: "الأنواع والمتغيرات",
      l: 1,
      n: "primitives و wrappers، و String، و var، والـ arrays و null",
      items: [
        {
          cmd: "primitives و wrappers",
          title: "ليه فيه int و Integer، وإمتى الفرق بيعضّك؟",
          desc: R`Java فيها ٨ أنواع primitive: [[int]] و [[long]] و [[double]] و [[boolean]] و [[char]] و [[byte]] و [[short]] و [[float]]. دول قيم خام، مش objects، مينفعش يبقوا [[null]] ومفيهمش methods.

ولكل واحد wrapper class: [[Integer]] و [[Long]] و [[Double]] و [[Boolean]]... دول objects، ممكن يبقوا [[null]]، وهما اللي بيتحطوا في الـ collections، لأن [[List<int>]] مش مسموحة، لازم [[List<Integer>]]. والتحويل بينهم أوتوماتيك (autoboxing و unboxing).

الفخ المشهور: [[==]] على wrappers بيقارن المرجع مش القيمة، فـ [[Integer]] قيمته 1000 ممكن ميساويش [[Integer]] تاني قيمته 1000.`,
          example: R`void main() {
    int count = 5;
    long views = 3_000_000_000L;
    double price = 19.99;
    boolean active = true;
    char grade = 'A';
    Integer boxed = count;
    List<Integer> ids = new ArrayList<>();
    ids.add(count);
    Integer a = 127, b = 127, c = 1000, d = 1000;
    IO.println(a == b);
    IO.println(c == d);
    IO.println(c.equals(d));
    IO.println(7 / 2);
    IO.println(0.1 + 0.2);
}`,
          try: R`شغّل المثال واتوقع كل سطر قبلها. وبعدين ضيف [[Integer missing = null; int n = missing;]] وشغّل: إيه اللي حصل، وإمتى ممكن ده يحصلك في Spring (فكّر في عمود في الداتابيز قيمته null)؟`,
          flag: "script",
          deep: {
            why: R`في JS كل الأرقام [[number]] واحد. في Java لازم تختار، والاختيار الغلط بيعمل bugs: [[int]] بيلف لما يعدّي ٢ مليار، و [[Integer]] ممكن يبقى null ويوقع البرنامج، و [[==]] على wrappers بيشتغل في التست (أرقام صغيرة) ويبوظ في الإنتاج (أرقام كبيرة).`,
            how: R`الـ primitives بتتخزن كقيمة مباشرة (على الـ stack أو جوه الـ object)، فهي أسرع وأخف. الـ wrappers objects في الـ heap.

autoboxing: لما تحط [[int]] مكان [[Integer]]، الـ compiler بيكتب [[Integer.valueOf(count)]] بدالك. و unboxing: لما تحط [[Integer]] مكان [[int]]، بيكتب [[boxed.intValue()]]، ولو boxed كانت null ده بيرمي [[NullPointerException]].

[[Integer.valueOf]] عنده cache للأرقام من -128 لـ 127: بيرجع نفس الـ object كل مرة. عشان كده [[a == b]] مع 127 طلعت true (نفس الـ object)، ومع 1000 false (اتنين objects مختلفين). القاعدة: [[equals]] دايمًا مع الـ objects.

الأرقام: [[int]] ٣٢ بت (لحد حوالي ٢.١ مليار)، و [[long]] ٦٤ بت (ولازم [[L]] في الآخر للأرقام الكبيرة)، و [[double]] كسور. والـ underscore في [[3_000_000_000L]] للقراية بس. والقسمة بين [[int]] و [[int]] بتشيل الكسر.`,
            when: R`[[int]] و [[long]] و [[boolean]] للمتغيرات المحلية والحسابات. [[Integer]] و [[Long]] في الـ collections، وفي الحقول اللي ممكن تبقى فاضية فعلًا (عمود nullable، أو باراميتر اختياري في request). و [[long]] للـ ids في الداتابيز (مش [[int]]). والفلوس: [[long]] بالقروش أو [[BigDecimal]]، ومتستخدمش [[double]] أبدًا.`,
            mistakes: R`[[if (user.getAge() == other.getAge())]] والاتنين [[Integer]]: بيشتغل مع ٢٥ وبيبوظ مع ٢٠٠. وحقل [[int]] في entity لعمود nullable: Hibernate هيوقع أو يحط 0 مكان null. وحقل [[Integer]] في entity وتعمل [[int x = entity.getX()]] على صف قيمته null: NullPointerException.

في الانترفيو: «[[Integer a = 127, b = 127; a == b]]؟» true بسبب الـ Integer cache، ومع 128 false. والسؤال الأهم بعدها: «طب إزاي تقارن؟» [[equals]] أو [[Objects.equals(a, b)]] لو ممكن يبقوا null.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف متغير من كل نوع primitive مهم، وبعدين يحط رقم في [[Integer]] وفي [[List]]، ويقارن wrappers ببعض بـ [[==]] وبـ [[equals]] عشان يوريك الفخ، ويختم بقسمة صحيحة وكسور. اتشغّل بـ [[java Prim.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ تحت اتجرّب بتعديل الملف فعلًا.

---

## ١. الـ primitives: قيم خام

~~~java
    int count = 5;
    long views = 3_000_000_000L;
    double price = 19.99;
    boolean active = true;
    char grade = 'A';
~~~

| النوع | بيشيل إيه | الحجم | ملاحظة |
|---|---|---|---|
| [[int]] | رقم صحيح | ٣٢ بت | لحد 2,147,483,647 تقريبًا ٢.١ مليار |
| [[long]] | رقم صحيح كبير | ٦٤ بت | لحد حوالي ٩.٢ × ١٠^١٨ |
| [[double]] | كسر | ٦٤ بت | زي [[number]] في JS |
| [[boolean]] | [[true]] أو [[false]] | | مفيش truthy و falsy |
| [[char]] | حرف واحد | ١٦ بت | بين [[' ']] مش [[" "]] |

وفيه تلاتة كمان نادرًا ما هتستخدمهم: [[byte]] (٨ بت) و [[short]] (١٦ بت) و [[float]] (كسر ٣٢ بت). المجموع ٨.

### ليه [[L]] و [[_]] في [[3_000_000_000L]]؟

- الـ [[_]] للقراية بس، Java بتتجاهلها: [[3_000_000_000]] = تلاتة مليار.
- أي رقم صحيح مكتوب في الكود Java بتعتبره [[int]] الأول. وتلاتة مليار أكبر من حد الـ int، فلازم [[L]] (من Long) تقول «ده long». جرّبنا نشيلها:

~~~text الناتج
P3/Prim.java:3: error: integer number too large
    long views = 3_000_000_000;
                 ^
~~~

### مفيش truthy في Java

جرّبنا نكتب [[if (count) {}]] زي JS:

~~~text الناتج
P4/Prim.java:5: error: incompatible types: int cannot be converted to boolean
~~~

الشرط في Java لازم يبقى [[boolean]] حقيقي: [[if (count > 0)]].

---

## ٢. الـ wrapper و autoboxing

~~~java
    Integer boxed = count;
    List<Integer> ids = new ArrayList<>();
    ids.add(count);
~~~

- [[Integer]] (بحرف كبير) **class**، يعني object في الـ heap بيلف قيمة int جواه. وكل primitive ليه wrapper: [[Long]] و [[Double]] و [[Boolean]] و [[Character]]...
- [[Integer boxed = count;]]: بنحط [[int]] في متغير [[Integer]]. الـ compiler بيكتب بدالك [[Integer.valueOf(count)]]. ده اسمه **autoboxing**.
- [[List<Integer>]]: الـ collections بتشيل objects بس. [[List<int>]] خطأ compile، فلازم الـ wrapper. ومفيش [[import java.util.*;]] فوق لأن الـ compact source file (اللي بيبدأ بـ [[void main()]]) بيعمل import لكل الـ module الأساسي [[java.base]] لوحده، فـ [[List]] و [[ArrayList]] جاهزين.
- [[ids.add(count)]]: [[count]] int، والـ list عايزة Integer، فـ autoboxing تاني.

وتقدر تتأكد إن ده بيحصل فعلًا: عملنا [[javac]] وبصينا في الـ bytecode بـ [[javap -c]]، ولقينا سطور زي دي في الأماكن دي بالظبط:

~~~text javap -c Prim (جزء)
19: invokestatic  #11   // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
~~~

---

## ٣. الفخ: [[==]] على الـ wrappers

~~~java
    Integer a = 127, b = 127, c = 1000, d = 1000;
    IO.println(a == b);
    IO.println(c == d);
    IO.println(c.equals(d));
~~~

~~~text الناتج
true
false
true
~~~

السطر الأول بيعرّف أربع متغيرات [[Integer]] مرة واحدة، مفصولين بـ [[,]]. وبعدين:

- [[==]] بين objects بيسأل «هل الاتنين **نفس الـ object** في الذاكرة؟»، مش «هل القيمة واحدة؟».
- [[Integer.valueOf]] (اللي الـ autoboxing بيناديها) عندها **cache** جاهز للأرقام من -128 لـ 127. لو طلبت 127 مرتين، بترجعلك نفس الـ object المتخزن. عشان كده [[a == b]] طلعت [[true]].
- 1000 برّه الـ cache، فكل مرة بيتعمل object جديد. [[c]] و [[d]] اتنين objects مختلفين قيمتهم واحدة، فـ [[c == d]] = [[false]].
- [[c.equals(d)]] بتقارن **القيمة**: [[true]]. دي الطريقة الصح دايمًا مع الـ objects.

> ليه ده خطير؟ في التست بتستخدم أرقام صغيرة (id = 1 و 2) فـ [[==]] بتشتغل. في الإنتاج الـ ids بقت ٥٠٠٠، فنفس الكود يبوظ من غير ما حاجة تتغير.

---

## ٤. القسمة والكسور

~~~java
    IO.println(7 / 2);
    IO.println(0.1 + 0.2);
~~~

~~~text الناتج
3
0.30000000000000004
~~~

- [[7 / 2]]: int على int = قسمة صحيحة، والكسر بيتشال (مش بيتقرّب). لو عايز 3.5 خلي واحد منهم double: [[7 / 2.0]].
- [[0.1 + 0.2]]: [[double]] بيتخزن بالـ binary، و 0.1 ملهاش تمثيل binary مظبوط (زي 1/3 بالعشري). نفس النتيجة في JS. عشان كده الفلوس **مش** double: [[long]] بالقروش أو [[BigDecimal]].

---

## ٥. الـ try: [[Integer]] قيمته null يتحط في [[int]]

ضفنا في آخر main:

~~~java
    Integer missing = null; int n = missing;
~~~

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because "<local14>" is null
	at Prim.main(Prim.java:16)
~~~

- [[Integer]] object، فممكن يبقى [[null]]. [[int]] لأ.
- [[int n = missing;]] شكلها مفيهاش أي method. بس الـ compiler كتب بدالك [[missing.intValue()]] عشان يطلّع الـ int من الـ object. ده **unboxing**.
- و [[intValue()]] على [[null]] = [[NullPointerException]] (اختصارها NPE): «حاولت تنادي method على مفيش».
- [[<local14>]]: الـ JVM مش عارف اسم المتغير، عارف رقمه بس (المتغير المحلي رقم ١٤). لو عملت compile بـ [[javac -g]] (اللي بيحفظ أسامي المتغيرات في الـ class) وشغّلت، الرسالة بتبقى أوضح:

~~~text الناتج مع javac -g
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because "missing" is null
~~~

وفي Spring: عمود في الداتابيز قيمته NULL، والـ entity فيه [[Integer]]، وانت كتبت [[int x = entity.getX();]]. الصفحة تقع بـ 500 في الصف ده بس.

---

## الخلاصة

| | primitive ([[int]]) | wrapper ([[Integer]]) |
|---|---|---|
| هو إيه | قيمة خام | object |
| ينفع [[null]]؟ | لأ | أيوه |
| في [[List]] و [[Map]] | لأ | أيوه |
| المقارنة | [[==]] سليمة | [[equals]] (أو [[Objects.equals(a, b)]] لو ممكن null) |

- autoboxing = [[Integer.valueOf(...)]] مخفية، و unboxing = [[.intValue()]] مخفية (وبتقع مع null).
- [[==]] على Integer بتشتغل لحد 127 بالصدفة بس.
- [[L]] للأرقام الكبيرة، و [[int / int]] بيشيل الكسر، والفلوس مش [[double]].`,
          lines: [
            "main.",
            R`[[int]] رقم صحيح ٣٢ بت.`,
            R`[[long]] ٦٤ بت، و [[L]] لازمة لأن الرقم أكبر من حد الـ int.`,
            R`[[double]] كسر (زي number في JS).`,
            R`[[boolean]]: true أو false بس، ومفيش truthy و falsy: [[if (count)]] خطأ compile.`,
            R`[[char]] حرف واحد بـ quotes مفردة. [["A"]] بـ double quotes ده String.`,
            R`autoboxing: الـ int اتحوّل لـ Integer لوحده.`,
            R`الـ collections بتاخد objects بس، فالنوع [[Integer]] مش [[int]].`,
            R`[[add(count)]]: autoboxing تاني.`,
            "أربع wrappers: اتنين قيمتهم 127 واتنين 1000.",
            R`[[true]]: الاتنين نفس الـ object من الـ cache.`,
            R`[[false]]: اتنين objects مختلفين، و [[==]] بيقارن المرجع.`,
            R`[[true]]: [[equals]] بيقارن القيمة. دي الطريقة الصح.`,
            R`[[3]]: قسمة int على int بتشيل الكسر.`,
            R`[[0.30000000000000004]]: نفس مشكلة الكسور في JS.`,
            "قفلة."
          ],
          sol: R`الناتج بالترتيب: [[true]] ثم [[false]] ثم [[true]] ثم [[3]] ثم [[0.30000000000000004]].

ولما تضيف [[Integer missing = null; int n = missing;]] البرنامج بيقع بـ [[NullPointerException]]، والرسالة بتقول [[Cannot invoke "java.lang.Integer.intValue()" because ... is null]]. السطر مفيهوش أي method call ظاهرة، بس الـ compiler كتب [[missing.intValue()]] بدالك (unboxing).

في Spring: entity فيه [[Integer discount]] والعمود null في الداتابيز، وبعدين service بيعمل [[int d = product.getDiscount();]]: الصفحة بتقع بـ 500 في منتج واحد بس. الحل: [[int]] لو العمود NOT NULL فعلًا، أو تتعامل مع null صريح (مثلًا [[Objects.requireNonNullElse(product.getDiscount(), 0)]]).`
        },
        {
          cmd: "String",
          title: "تقارن النصوص وتبنيها إزاي في Java؟",
          desc: R`[[String]] في Java object ثابت (immutable): أي method زي [[toUpperCase]] بترجع String جديد والأصلي زي ما هو. نفس JS.

الفرق الكبير: المقارنة بـ [[equals]] مش [[==]]. الـ [[==]] بيسأل «هل دول نفس الـ object؟» ومش «هل النص واحد؟».

ومفيش template literals بـ [[$__{}]] زي JS. البدايل: [[+]] للحاجات الصغيرة، و [["...%s...".formatted(x)]]، و text blocks بـ [["""]] للنصوص اللي فيها كذا سطر (JSON و SQL). ولو بتجمّع نص في loop استخدم [[StringBuilder]].`,
          example: R`void main() {
    String a = "java";
    String b = new String("java");
    IO.println(a == b);
    IO.println(a.equals(b));
    String name = "Sara";
    IO.println("Hi %s, you have %d tasks".formatted(name, 3));
    String json = """
        {"name": "%s", "admin": false}
        """.formatted(name);
    IO.print(json);
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 3; i++) sb.append(i).append(',');
    IO.println(sb);
    IO.println(" a,b ,c ".strip().split(",").length);
}`,
          try: R`اكتب method اسمها [[isAdmin(String role)]] ترجع true لو الـ role هو "admin" بأي حالة حروف ("ADMIN" أو "Admin"). جرّبها بـ [["admin"]] و [["ADMIN"]] و [[null]]. هل كتبتها بشكل ميقعش مع null؟`,
          flag: "script",
          deep: {
            why: R`[[if (role == "admin")]] من أشهر bugs المبتدئين في Java: ساعات بتشتغل (لأن الـ literals بتتخزن مرة واحدة) وساعات لأ (لما النص جاي من request أو داتابيز). ولازم تعرف تبني نصوص بشكل نضيف من غير template literals.`,
            how: R`الـ string literals زي [["java"]] بتتخزن في String pool: أي literal بنفس النص بيشاور على نفس الـ object، فـ [[==]] بينهم بيطلع true بالصدفة. أما [[new String(...)]] أو أي نص جاي من برّه (JSON، أو داتابيز، أو [[substring]]) ده object جديد، فـ [[==]] بتطلع false.

[[equals]] بيقارن الحروف، و [[equalsIgnoreCase]] من غير حالة الحروف. ولو المتغير ممكن يبقى null، اكتب الـ literal الأول: [["admin".equals(role)]] مبتقعش مع null، و [[role.equals("admin")]] بتقع.

[[formatted]] (زي [[String.format]]) بتاخد [[%s]] لأي حاجة، و [[%d]] للأرقام الصحيحة، و [[%.2f]] لكسر برقمين. والـ text block [["""]] بيشيل المسافات المشتركة على الشمال، وبيحافظ على السطور، ومش محتاج تهرب [["]] جواه.

الـ [[+]] في loop بيعمل String جديد كل لفة (لأنه immutable)، و [[StringBuilder]] بيبني في buffer واحد. الـ compiler بيحسّن [[+]] في السطر الواحد لوحده، فمتقلقش منه برّه الـ loops.`,
            when: R`[[equals]] دايمًا لمقارنة النصوص. [[formatted]] للرسايل. text blocks للـ SQL في [[@Query]] والـ JSON في التستات. [[StringBuilder]] في loops. و [[isBlank()]] بدل [[trim().isEmpty()]].`,
            mistakes: R`[[==]] مع النصوص. و [[role.equals("admin")]] و role ممكن تبقى null. ونسيان إن [[split]] بياخد regex: [["a.b".split(".")]] بيرجع array فاضية لأن [[.]] في regex معناها أي حرف، والصح [[split("\\.")]].

في الانترفيو: «ليه String immutable؟» عشان الأمان (نص الـ URL أو الـ password محدش يغيّره بعد الفحص)، وعشان الـ pool، وعشان يبقى آمن بين الـ threads، وعشان الـ hashCode يتحسب مرة ويتخزن (مفتاح HashMap ممتاز). و «الفرق بين String و StringBuilder و StringBuffer؟» الأخير زي StringBuilder بس synchronized وأبطأ، ونادرًا ما تحتاجه.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيقارن نصين بـ [[==]] وبـ [[equals]]، وبعدين يبني نصوص بـ ٣ طرق: [[formatted]] و text block و [[StringBuilder]]، وفي الآخر يقص نص ويقسمه. اتشغّل بـ [[java Str.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، والسطور الصغيرة الزيادة اتجرّبت في [[jshell]].

---

## ١. [[==]] مقابل [[equals]]

~~~java
    String a = "java";
    String b = new String("java");
    IO.println(a == b);
    IO.println(a.equals(b));
~~~

~~~text الناتج
false
true
~~~

- [["java"]] مكتوبة في الكود كده اسمها **literal**. Java بتخزن الـ literals في مكان اسمه **String pool**: كل literal بنفس النص بيشاور على نفس الـ object.
- [[new String("java")]]: [[new]] بتجبر Java تعمل object **جديد** بنفس الحروف، برّه الـ pool.
- [[a == b]]: [[==]] بين objects بتسأل «نفس الـ object؟». لأ، اتنين مختلفين: [[false]].
- [[a.equals(b)]]: بتقارن الحروف واحد واحد: [[true]].

والفخ إن [[==]] **ساعات** بتطلع true بالصدفة. جرّبنا في jshell:

~~~text الناتج
jshell> String c = "java"
jshell> "java" == c
$2 ==> true

jshell> String x = "jav"; String y = x + "a"
jshell> y == "java"
$3 ==> false
~~~

الأولى literal و literal: نفس الـ object من الـ pool. التانية النص اتبنى وقت التشغيل (زي نص جاي من request أو داتابيز)، فبقى object جديد. نفس الحروف، و [[==]] بتقول false. القاعدة: **[[equals]] دايمًا**.

---

## ٢. [[formatted]]: نص بفراغات

~~~java
    String name = "Sara";
    IO.println("Hi %s, you have %d tasks".formatted(name, 3));
~~~

~~~text الناتج
Hi Sara, you have 3 tasks
~~~

النص فيه **أماكن فاضية** بتبدأ بـ [[%]]، و [[formatted(...)]] بتملاها بالقيم بالترتيب:

| الرمز | بيتملي بإيه | مثال |
|---|---|---|
| [[%s]] | أي حاجة (s = string) | [[name]] |
| [[%d]] | رقم صحيح (d = decimal) | [[3]] |
| [[%.2f]] | كسر برقمين بعد العلامة (f = floating point) | [["%.2f".formatted(19.989)]] بتطلع [["19.99"]] |

ولو حطيت نوع غلط بيقع وقت التشغيل: [["%d".formatted("x")]] رمت [[IllegalFormatConversionException: d != java.lang.String]].

---

## ٣. text block بـ [["""]]

~~~java
    String json = """
        {"name": "%s", "admin": false}
        """.formatted(name);
    IO.print(json);
~~~

~~~text الناتج
{"name": "Sara", "admin": false}
~~~

- [["""]] بتبدأ text block: نص على كذا سطر. ولازم **تنزل سطر** بعد الـ [["""]] الأولى على طول.
- جواه تكتب [["]] عادي من غير [[\"]]: مريح جدًا للـ JSON والـ SQL.
- المسافات اللي على الشمال: Java بتشيل المسافة المشتركة بين كل السطور (بما فيهم سطر الـ [["""]] اللي بيقفل). فالـ JSON طلع من أول السطر من غير مسافات.
- الـ [["""]] اللي بتقفل في سطر لوحدها، فالنص بيخلص بسطر جديد ([[\n]]). عشان كده استخدمنا [[IO.print]] (من غير ln): لو كانت [[println]] كان هيبقى فيه سطر فاضي زيادة.
- [[.formatted(name)]]: الـ text block String عادي، فبتنادي عليه أي method.

---

## ٤. [[StringBuilder]]: تبني نص في loop

~~~java
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 3; i++) sb.append(i).append(',');
    IO.println(sb);
~~~

~~~text الناتج
0,1,2,
~~~

- [[for (int i = 0; i < 3; i++)]]: نفس الـ for بتاعة JS بس بـ [[int]] بدل [[let]]: i بتاخد 0 و 1 و 2.
- الـ String **immutable**: أي [[+]] بيعمل String جديد. في loop طويل ده يعني آلاف الـ objects اللي بتترمي. [[StringBuilder]] فيه buffer واحد بيكبر.
- [[append(i)]] بتضيف للـ buffer وبترجع **نفس** الـ builder، فتقدر تكمّل [[.append(',')]] على طول (chaining). و [[',']] بـ single quotes: [[char]].
- [[IO.println(sb)]]: الطباعة بتنادي [[toString()]] لوحدها.

---

## ٥. [[strip]] و [[split]]

~~~java
    IO.println(" a,b ,c ".strip().split(",").length);
~~~

من الشمال لليمين:

~~~text خطوة خطوة في jshell
jshell> " a,b ,c ".strip()
$3 ==> "a,b ,c"

jshell> " a,b ,c ".strip().split(",")
$4 ==> String[3] { "a", "b ", "c" }
~~~

1. [[strip()]]: بتشيل المسافات من **الأطراف** بس، فالمسافة اللي بعد [[b]] فضلت.
2. [[split(",")]]: بتقسم عند كل [[,]] وبترجع **array** من النصوص.
3. [[.length]]: طول الـ array (خاصية من غير أقواس): [[3]].

> [[split]] بتاخد **regex** مش نص عادي. [["a.b".split(".")]] بترجع array طولها 0، لأن [[.]] في الـ regex معناها «أي حرف» فكل حاجة بقت فاصل. الصح [[split("\\.")]]، وبيرجع طولها 2. والـ [[\\]] اتنين لأن الـ [[\]] نفسها لازم تتهرب جوه نص Java: بـ [[\]] واحدة الـ compiler بيرفض ([[illegal escape character]]).

---

## ٦. الحل: [[isAdmin]] من غير ما يقع مع null

~~~java
static boolean isAdmin(String role) {
    return "admin".equalsIgnoreCase(role);
}
~~~

- [[static]]: الـ method مش محتاجة object عشان تتنادى (درس static).
- [[boolean]]: بترجع true أو false.
- [[equalsIgnoreCase]]: زي [[equals]] بس من غير ما تفرق بين الحروف الكبيرة والصغيرة.
- الترتيب هو السر: [["admin".equalsIgnoreCase(role)]] الـ method بتتنادى على الـ literal (مستحيل يبقى null)، و [[role]] بيتبعت كباراميتر. ولو [[role]] null الـ method بترجع false بهدوء.

~~~text الناتج
true
true
false
~~~

ولو عكست وكتبت [[role.equals("admin")]] و role قيمتها null، جرّبناها في jshell:

~~~text الناتج
|  Exception java.lang.NullPointerException: Cannot invoke "String.equals(Object)" because "REPL.$JShell$11.role" is null
~~~

(الاسم الغريب [[REPL.$JShell$11.role]] هو اسم المتغير جوه الـ class المخفي اللي jshell بيلف فيه كل سطر.)

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تقارن نصين | [[a.equals(b)]]، أو [["literal".equals(x)]] لو x ممكن null |
| من غير حالة الحروف | [[equalsIgnoreCase]] |
| نص فيه قيم | [["...%s...".formatted(x)]] |
| نص على كذا سطر | text block [["""]] |
| تبني نص في loop | [[StringBuilder]] و [[append]] |
| تقص المسافات | [[strip()]]، و [[isBlank()]] تسأل هل فاضي |

- الـ String immutable: كل method بترجع نص جديد.
- [[split]] بياخد regex.`,
          lines: [
            "main.",
            "literal: بيتخزن في الـ String pool.",
            R`[[new String]] بيعمل object جديد بنفس النص.`,
            R`[[false]]: مش نفس الـ object.`,
            R`[[true]]: نفس الحروف. دي المقارنة الصح.`,
            "متغير عادي.",
            R`[[%s]] مكان النص و [[%d]] مكان الرقم: [[Hi Sara, you have 3 tasks]].`,
            R`text block: بيبدأ بـ [["""]] وبعدها سطر جديد لازم.`,
            R`النص نفسه، و [["]] جواه من غير escape.`,
            R`قفلة الـ text block، و [[formatted]] عليه زي أي String.`,
            R`[[print]] من غير سطر جديد، لأن الـ text block فيه سطر جديد في آخره أصلًا.`,
            R`[[StringBuilder]] لبناء نص على مراحل.`,
            R`[[append]] بترجع نفس الـ builder فتقدر تكمّل عليها (chaining).`,
            R`[[0,1,2,]]: println بينادي [[toString]] لوحده.`,
            R`[[strip]] بيشيل المسافات من الأطراف، و [[split]] بيقسم: ٣ أجزاء.`,
            "قفلة."
          ],
          sol: R`الحل تحت. بيطبع [[true]] و [[true]] و [[false]].

كتبنا [["admin".equalsIgnoreCase(role)]] مش [[role.equalsIgnoreCase("admin")]]: لو role قيمتها null، الأولى بترجع false بهدوء، والتانية بترمي NullPointerException لأنك بتنادي method على null. لو استخدمت [[==]] كان [[isAdmin("ADMIN")]] هيرجع false، وممكن [[isAdmin("admin")]] يرجع true بالصدفة بس بسبب الـ String pool، ومع نص جاي من request هيرجع false.`,
          solCode: R`static boolean isAdmin(String role) {
    return "admin".equalsIgnoreCase(role);
}

void main() {
    IO.println(isAdmin("admin"));
    IO.println(isAdmin("ADMIN"));
    IO.println(isAdmin(null));
}`
        },
        {
          cmd: "var و final",
          title: "تخلي Java تستنتج النوع، وتمنع المتغير يتغير",
          desc: R`[[var]] بيخلي الـ compiler يستنتج نوع المتغير المحلي من القيمة: [[var names = new ArrayList<String>();]] نوعها [[ArrayList<String>]]. زي [[let]] مع الاستنتاج في TS، بس النوع بيتحدد مرة وخلاص، و [[var]] ينفع في المتغيرات المحلية بس (مش حقول ولا باراميترات).

و [[final]] زي [[const]] في JS: المتغير مينفعش يتعيّن تاني. بس زي const بالظبط، لو القيمة object، الـ object نفسه ممكن يتعدّل.`,
          example: R`void main() {
    var names = new ArrayList<String>();
    names.add("Sara");
    var total = 0;
    for (var n : names) total += n.length();
    final int limit = 10;
    int[] scores = {90, 75, 60};
    IO.println(scores.length + " " + scores[0]);
    String missing = null;
    IO.println(total + " " + limit);
    IO.println(missing.length());
}`,
          try: R`جرّب: [[var x;]] من غير قيمة، و [[var y = null;]]، و [[limit = 20;]] بعد تعريفه final، و [[scores[3]]]. اقرا رسالة كل واحد، وقول أنهي بيطلع وقت الـ compile وأنهي وقت التشغيل.`,
          flag: "script",
          deep: {
            why: R`الكود القديم في Java كان بيكرر النوع مرتين: [[Map<String, List<Order>> byCity = new HashMap<String, List<Order>>();]]. [[var]] بيشيل التكرار ده. و [[final]] بيوضّح للي بيقرا إن القيمة دي مش هتتغير، وبيسمح للـ lambdas تستخدم المتغير.`,
            how: R`[[var]] استنتاج وقت الـ compile بس، والنوع ثابت بعد كده: [[var total = 0;]] بعدها [[total = "x";]] خطأ. مش dynamic typing.

الـ arrays في Java طولها ثابت من وقت ما تتعمل: [[scores.length]] (خاصية مش method)، ولو قريت برّه الحدود بيرمي [[ArrayIndexOutOfBoundsException]] بدل ما يرجع undefined زي JS. عشان كده في الغالب هتستخدم [[List]] مش arrays.

و [[null]]: أي متغير نوعه object (String أو List أو أي class) ممكن يبقى null، والـ compiler مش هيمنعك. لو ناديت method عليه: [[NullPointerException]]. ومن Java 14 الرسالة بتقولك إيه اللي كان null بالظبط (helpful NPE messages).

والـ lambda مينفعش تستخدم متغير محلي غير لو هو [[final]] أو effectively final (يعني محدش غيّره بعد أول قيمة).`,
            when: R`[[var]] لما النوع واضح من اليمين ([[new]] أو method اسمها واضح). اكتب النوع صريح لما القيمة جاية من method مش واضح بترجع إيه. و [[final]] على الحقول اللي بتتحط في الـ constructor (وده الأهم، في Spring كل الـ dependencies [[private final]]).`,
            mistakes: R`[[var x = service.process();]] ومحدش فاهم x نوعها إيه غير لما يفتح IDE. و [[var list = new ArrayList<>();]] من غير نوع جوه الـ diamond: النوع بيبقى [[ArrayList<Object>]]. وتفتكر إن [[final List]] بيمنع [[add]]: لأ، ده للـ variable بس، وعشان list متتعدلش استخدم [[List.of]] أو [[List.copyOf]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيستخدم [[var]] في ٣ أماكن، ويعمل متغير [[final]]، و array صغيرة، وفي الآخر بينادي method على [[null]] عشان يوريك الـ NullPointerException. اتشغّل بـ [[java VarFinal.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ في الـ try اتجرّب بتعديل الملف فعلًا.

---

## ١. [[var]]: الـ compiler يستنتج النوع

~~~java
    var names = new ArrayList<String>();
    names.add("Sara");
    var total = 0;
~~~

- [[var]] مش نوع. هي كلمة معناها «يا compiler، بص على القيمة اللي على اليمين وحط نوعها هنا».
- [[new ArrayList<String>()]]: list بتتعدّل، والعناصر [[String]]. فـ [[names]] نوعها [[ArrayList<String>]]. لاحظ إن النوع مكتوب **جوه** [[<>]] على اليمين: لو كتبت [[new ArrayList<>()]] فاضية مع [[var]]، مفيش حاجة يستنتج منها فيبقى [[ArrayList<Object>]].
- [[var total = 0;]]: [[0]] رقم صحيح، فـ total نوعها [[int]].

والنوع ده **اتحدد خلاص**، مش dynamic زي JS. جرّبنا [[total = "x";]]:

~~~text الناتج
V5/VarFinal.java:4: error: incompatible types: String cannot be converted to int
    var total = 0; total = "x";
                           ^
~~~

---

## ٢. الـ for-each

~~~java
    for (var n : names) total += n.length();
~~~

- [[for (X n : names)]]: «لكل عنصر في names، سمّيه n». زي [[for (const n of names)]] في JS. والـ [[:]] هنا تتقري «في».
- [[var n]]: n نوعها [[String]] (مستنتج من نوع عناصر الـ list).
- [[n.length()]]: طول النص، method بأقواس. و [[+=]] بيزود total. "Sara" طولها 4.

---

## ٣. [[final]]: مفيش تعيين تاني

~~~java
    final int limit = 10;
~~~

[[final]] زي [[const]] في JS: القيمة اتحطت مرة ومش هتتغير. جرّبنا [[limit = 20;]] بعدها:

~~~text الناتج
V3/VarFinal.java:6: error: cannot assign a value to final variable limit
    final int limit = 10; limit = 20;
                          ^
~~~

---

## ٤. الـ array

~~~java
    int[] scores = {90, 75, 60};
    IO.println(scores.length + " " + scores[0]);
~~~

~~~text الناتج
3 90
~~~

- [[int[]]]: الـ [[[]]] بعد النوع معناها array من النوع ده.
- [[{90, 75, 60}]]: القيم بين أقواس معقوفة (مش [[[ ]]] زي JS). والطول بيتحدد هنا (٣) **ومش بيتغير** بعد كده: مفيش [[push]].
- [[scores.length]]: خاصية من غير أقواس (عكس [[n.length()]] بتاعة النص، فخ مشهور).
- [[scores[0]]]: أول عنصر، الترقيم من صفر.
- [[+ " " +]]: المسافة نص، فكل حاجة بقت تجميع نصوص: [["3 90"]].

ولو قريت index برّه الحدود (جرّبنا [[scores[3]]]) مش هيرجع [[undefined]] زي JS، هيقع:

~~~text الناتج
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
	at VarFinal.main(VarFinal.java:8)
~~~

---

## ٥. [[null]] و NullPointerException

~~~java
    String missing = null;
    IO.println(total + " " + limit);
    IO.println(missing.length());
~~~

~~~text الناتج
4 10
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "<local4>" is null
	at VarFinal.main(VarFinal.java:11)
~~~

- [[null]] = «مفيش object». أي متغير نوعه class ([[String]] و [[List]] و أي class بتاعك) ممكن يبقى null، والـ compiler مش هيمنعك.
- [[4 10]]: طول Sara، والـ limit.
- [[missing.length()]]: بتنادي method على مفيش، فالـ JVM بيرمي [[NullPointerException]].
- الرسالة بتقولك بالظبط **إيه** اللي كان null ([[String.length()]] اتنادت على حاجة null). ده من Java 14 (helpful NPE messages).
- [[<local4>]]: المتغير المحلي رقم ٤، لأن الـ class اتعمله compile من غير أسامي المتغيرات. عملنا [[javac -g VarFinal.java]] (الـ [[-g]] بيحفظ أسامي المتغيرات للـ debugging) وبعدين [[java VarFinal]]:

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "missing" is null
~~~

---

## ٦. الـ try: الأربع أخطاء

~~~text var x;
V1/VarFinal.java:6: error: cannot infer type for local variable x
    final int limit = 10; var x;
                              ^
  (cannot use 'var' on variable without initializer)
~~~

~~~text var y = null;
V2/VarFinal.java:6: error: cannot infer type for local variable y
    final int limit = 10; var y = null;
                              ^
  (variable initializer is 'null')
~~~

| التعديل | إمتى بيطلع | ليه |
|---|---|---|
| [[var x;]] | compile | مفيش قيمة يستنتج منها |
| [[var y = null;]] | compile | null ملهاش نوع |
| [[limit = 20;]] | compile | [[final]] |
| [[scores[3]]] | تشغيل | الـ compiler مبيعرفش الـ index وقت الكتابة |
| [[missing.length()]] | تشغيل | الـ compiler مبيتابعش مين ممكن يبقى null |

---

## الخلاصة

- [[var]]: النوع بيتستنتج **مرة** وقت الـ compile وبعدين ثابت. للمتغيرات المحلية بس، ولازم قيمة مش null.
- [[final]]: مفيش تعيين تاني. بس [[final List]] الـ list نفسها بتتعدّل عادي (زي const).
- الـ array طولها ثابت، و [[.length]] من غير أقواس، والـ index الغلط بيقع. في الغالب هتستخدم [[List]].
- أي object ممكن يبقى [[null]]، و [[javac -g]] بيخلي رسالة الـ NPE فيها اسم المتغير.`,
          lines: [
            "main.",
            R`[[var]]: النوع اتستنتج [[ArrayList<String>]].`,
            "إضافة عادية.",
            R`[[int]] مستنتج من الـ 0.`,
            R`for-each: زي [[for (const n of names)]] في JS، و [[var]] جواها كمان.`,
            R`[[final]]: زي const، مينفعش يتعيّن تاني.`,
            R`array: طوله ثابت (٣)، والقيم بين [[{}]].`,
            R`[[length]] من غير أقواس في الـ arrays، والـ index من صفر.`,
            R`[[null]] مسموحة في أي نوع object.`,
            R`[[4 10]]: طول "Sara" والـ limit.`,
            R`NullPointerException: بتنادي method على null.`,
            "قفلة."
          ],
          sol: R`الأربعة:

[[var x;]]: خطأ compile [[cannot infer type for local variable x]] و [[(cannot use 'var' on variable without initializer)]].

[[var y = null;]]: خطأ compile [[variable initializer is 'null']]، لأن null ملهاش نوع يتستنتج.

[[limit = 20;]]: خطأ compile [[cannot assign a value to final variable limit]].

[[scores[3]]]: بيعدّي الـ compile، ويقع وقت التشغيل بـ [[ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3]]. الـ compiler مبيعرفش الـ index هيبقى إيه.

وسطر [[missing.length()]] في المثال نفسه بيقع وقت التشغيل بـ [[NullPointerException: Cannot invoke "String.length()" because "<local4>" is null]]. لو عملت compile بـ [[javac -g]] الرسالة بتذكر اسم المتغير [["missing"]] بدل [[<local4>]].`
        }
      ]
    }
]);
