// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
    {
      t: "records و enums و switch",
      l: 1,
      n: "أنواع داتا في سطر، وقيم محددة بالاسم، و switch بيرجع قيمة، و pattern matching زي discriminated unions",
      items: [
        {
          cmd: "records",
          title: "نوع للداتا بس في سطر واحد، زي type في TS",
          desc: R`[[record Money(long cents, String currency) {}]] سطر واحد بيعمل class كامل: حقول [[private final]]، و constructor بالترتيب، و accessor لكل حقل ([[cents()]] مش [[getCents()]])، و [[equals]] و [[hashCode]] و [[toString]] بيقارنوا بالقيم. ده أقرب حاجة في Java لـ [[type Money = { cents: number; currency: string }]] في TS، بس immutable كمان.

وتقدر تضيف فحص في compact constructor (من غير أقواس باراميترات)، وتضيف methods. وده الشكل اللي هتستخدمه في Spring للـ DTOs: الـ request والـ response.`,
          example: R`record Money(long cents, String currency) {
    Money {
        if (cents < 0) throw new IllegalArgumentException("negative");
        currency = currency.toUpperCase();
    }
    Money plus(Money other) { return new Money(cents + other.cents, currency); }
}

void main() {
    var a = new Money(1500, "egp");
    var b = new Money(1500, "EGP");
    IO.println(a);
    IO.println(a.cents() + " " + a.currency());
    IO.println(a.equals(b) + " " + (a == b));
    IO.println(a.plus(b));
    var set = new HashSet<Money>(List.of(a, b));
    IO.println(set.size());
}`,
          try: R`جرّب [[a.cents = 5;]] وشوف الخطأ. وبعدين ضيف method [[withCurrency(String c)]] بترجع Money جديد بنفس المبلغ وعملة تانية (زي [[{ ...money, currency }]] في JS)، وخلي [[plus]] ترمي exception لو العملتين مختلفين.`,
          flag: "script",
          deep: {
            why: R`قبل records (Java 16)، class بسيط فيه حقلين كان محتاج ٥٠ سطر: constructor و getters و equals و hashCode و toString، أو Lombok. ودي بالظبط الحاجات اللي الناس بتنساها أو تغلط فيها (equals من غير hashCode). record بيعملهم صح ومش ممكن يتنسوا.`,
            how: R`الـ record class final (محدش يورث منه) وحقوله final. الـ [[equals]] بيقارن كل الحقول بـ equals، و [[hashCode]] محسوب منهم، فتقدر تحطه في [[HashSet]] أو كمفتاح [[HashMap]] وهو شغال صح. عشان كده الـ set في المثال فيها عنصر واحد.

الـ compact constructor ([[Money {]] من غير باراميترات) بيتنفذ قبل ما الحقول تتحط، فتقدر تفحص وتعدّل الباراميترات ([[currency = ...]] بيعدّل الباراميتر، وبعدين Java بتحطه في الحقل).

records تقدر تعمل implements لـ interfaces، ويبقى فيها static methods وحقول static، بس مفيش حقول instance زيادة غير اللي في الـ header.

ومهم تعرف: الـ immutability سطحية. لو حقل نوعه [[List]]، الـ list نفسها ممكن تتعدّل، فاعمل [[items = List.copyOf(items);]] في الـ compact constructor.`,
            when: R`DTOs (request و response في الـ API)، و value objects ([[Money]] و [[Email]])، ومفاتيح مركّبة في Map، ونتايج methods بترجع أكتر من قيمة. ومش مناسبة لـ JPA entities، لأن Hibernate محتاج class عادي بيتعدّل وفيه constructor فاضي (درس الـ entities).`,
            mistakes: R`تستخدم record كـ entity. وتفتكر إن [[a.cents]] من برّه شغالة زي TS: لازم [[a.cents()]]. وتحط [[List]] في record وتفتكر إنه immutable بالكامل. وتكتب [[getCents()]] بإيدك «عشان Jackson»: Jackson بيفهم الـ records من غير getters.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف [[Money]] (مبلغ وعملة) كـ record، بفحص في الـ constructor وتوحيد للعملة، و method بتجمع مبلغين. وبعدين يجرّب الحاجات اللي الـ record عملها لوحده: الطباعة، والـ accessors، والمقارنة بالقيمة، والـ HashSet. اتشغّل بـ [[java MoneyDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الـ header: سطر بيعمل class كامل

~~~java
record Money(long cents, String currency) {
~~~

الأقواس بعد الاسم اسمها **header**، وفيها الحقول بنوعها. من السطر ده بس، Java ولّدت كل ده. عملنا [[javac]] وبصينا بـ [[javap -p]] ([[-p]] = اعرض الـ private كمان):

~~~text javap -p MoneyDemo$Money
final class MoneyDemo$Money extends java.lang.Record {
  private final long cents;
  private final java.lang.String currency;
  MoneyDemo$Money(long, java.lang.String);
  MoneyDemo$Money plus(MoneyDemo$Money);
  public final java.lang.String toString();
  public final int hashCode();
  public final boolean equals(java.lang.Object);
  public long cents();
  public java.lang.String currency();
}
~~~

| السطر | يعني |
|---|---|
| [[final class ... extends java.lang.Record]] | class عادي، [[final]] (محدش يورث منه) |
| [[private final long cents;]] | الحقول private و final: مبتتغيرش |
| [[MoneyDemo$Money(long, java.lang.String)]] | constructor بالحقول بالترتيب |
| [[toString]] و [[hashCode]] و [[equals]] | متولّدين من **كل** الحقول |
| [[cents()]] و [[currency()]] | accessor لكل حقل، بنفس اسمه (مش [[getCents]]) |
| [[plus]] | الـ method اللي احنا كتبناها |

([[MoneyDemo$]] لأن الملف compact، فالـ record اتحط جوه class مخفي اسمه MoneyDemo.)

---

## ٢. الـ compact constructor

~~~java
    Money {
        if (cents < 0) throw new IllegalArgumentException("negative");
        currency = currency.toUpperCase();
    }
~~~

- [[Money {]] من غير [[( )]]: ده اسمه **compact constructor**. الباراميترات موجودة جواه بنفس أسامي الحقول ([[cents]] و [[currency]]) من غير ما تكتبها.
- بيتنفذ **قبل** ما القيم تتحط في الحقول. فهو المكان بتاع الفحص والتنضيف.
- [[if (cents < 0) throw ...]]: مفيش Money بمبلغ سالب. جرّبنا [[new Money(-1, "egp")]]:

~~~text الناتج
Exception in thread "main" java.lang.IllegalArgumentException: negative
	at MoneyDemo$Money.<init>(MoneyDemo.java:3)
~~~

([[<init>]] هو اسم الـ constructor جوه الـ JVM.)

- [[currency = currency.toUpperCase();]]: بيغيّر **الباراميتر**، مش الحقل. وبعد ما الـ block يخلص، Java بتحط القيم (بعد التعديل) في الحقول. فالعملة دايمًا حروف كبيرة.

---

## ٣. method جوه الـ record

~~~java
    Money plus(Money other) { return new Money(cents + other.cents, currency); }
}
~~~

- الـ record ينفع فيه methods عادي.
- مبيعدّلش نفسه (الحقول final)، بيرجّع **Money جديد**. زي [[toUpperCase]] في String.
- [[other.cents]] من غير أقواس: جوه الـ record نفسه تقدر تقرا الحقل الـ private مباشرة. من برّه لازم [[cents()]].

---

## ٤. main سطر سطر

~~~java
    var a = new Money(1500, "egp");
    var b = new Money(1500, "EGP");
    IO.println(a);
~~~

~~~text الناتج
Money[cents=1500, currency=EGP]
~~~

[[a]] اتعمل بـ [["egp"]] بس الـ constructor كبّرها. و [[toString]] الجاهز شكله [[Name[field=value, ...]]].

~~~java
    IO.println(a.cents() + " " + a.currency());
~~~

~~~text الناتج
1500 EGP
~~~

الـ accessors بأقواس. ولو جرّبت تغيّر الحقل ([[a.cents = 5;]]):

~~~text الناتج
r2/MoneyDemo.java:18: error: cannot assign a value to final variable cents
    a.cents = 5;
     ^
~~~

~~~java
    IO.println(a.equals(b) + " " + (a == b));
~~~

~~~text الناتج
true false
~~~

- [[a.equals(b)]]: الـ equals المتولّد بيقارن كل الحقول: 1500 = 1500 و EGP = EGP، فـ [[true]].
- [[(a == b)]]: الأقواس لازمة عشان [[==]] تتحسب قبل [[+]]. و [[==]] بتسأل «نفس الـ object؟»: لأ، اتنين [[new]]، فـ [[false]].

~~~java
    IO.println(a.plus(b));
~~~

~~~text الناتج
Money[cents=3000, currency=EGP]
~~~

~~~java
    var set = new HashSet<Money>(List.of(a, b));
    IO.println(set.size());
~~~

~~~text الناتج
1
~~~

- [[HashSet]]: مجموعة مفيهاش تكرار. عشان تعرف إن عنصرين «نفس الحاجة» بتستخدم [[hashCode()]] الأول وبعدين [[equals()]].
- الـ record ولّد الاتنين من القيم، فـ a و b ليهم نفس الـ hashCode (اتأكدنا: [[a.hashCode() == b.hashCode()]] طلعت [[true]]) و equals بيقول true. فالـ set شالت عنصر واحد.
- في class عادي من غير equals و hashCode، الـ set كانت هتشيل 2.

---

## ٥. الحل: [[withCurrency]] و [[plus]] بفحص

~~~java
    Money plus(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("currency mismatch: " + currency + " vs " + other.currency);
        return new Money(cents + other.cents, currency);
    }
    Money withCurrency(String c) { return new Money(cents, c); }
~~~

- [[!currency.equals(...)]]: [[!]] = not. ومقارنة String بـ [[equals]] مش [[!=]].
- [[if]] من غير [[{ }]]: مسموح لو جسمه سطر واحد (الـ throw).
- [[withCurrency]]: نسخة جديدة بنفس المبلغ وعملة تانية. زي [[{ ...money, currency: c }]] في JS. والـ compact constructor هيكبّر العملة برضه، لأن أي [[new Money]] بيعدّي عليه.

~~~java
void main() {
    var egp = new Money(1500, "egp");
    var usd = egp.withCurrency("usd");
    IO.println(egp + " " + usd);
    IO.println(egp.plus(usd));
}
~~~

~~~text الناتج
Money[cents=1500, currency=EGP] Money[cents=1500, currency=USD]
Exception in thread "main" java.lang.IllegalArgumentException: currency mismatch: EGP vs USD
	at MoneyDemo$Money.plus(MoneyDemo.java:8)
	at MoneyDemo.main(MoneyDemo.java:18)
~~~

[[egp]] فضل زي ما هو بعد [[withCurrency]] (immutable)، والجمع بين عملتين مختلفتين وقع بالرسالة اللي كتبناها.

---

## الخلاصة

| اللي بتكتبه | اللي بتاخده |
|---|---|
| [[record Money(long cents, String currency)]] | حقول private final، و constructor، و [[cents()]] و [[currency()]]، و equals و hashCode و toString بالقيم |
| [[Money { ... }]] | فحص وتعديل الباراميترات قبل ما تتحفظ |
| [[withX(...)]] | نسخة جديدة بقيمة متغيرة (مفيش setters) |

- [[equals]] بالقيم، فالـ record ينفع في [[HashSet]] وكمفتاح [[HashMap]].
- مفيش حقول زيادة غير اللي في الـ header، ومينفعش يتورث.
- مناسب للـ DTOs والـ value objects، مش للـ JPA entities.`,
          lines: [
            R`الـ header: الحقول والـ constructor والـ accessors في سطر.`,
            R`compact constructor: من غير [[( )]]، وبيتنفذ قبل ما الحقول تتحط.`,
            "فحص: مفيش Money بقيمة سالبة.",
            R`تعديل الباراميتر قبل ما يتحفظ: العملة دايمًا حروف كبيرة.`,
            "قفلة.",
            R`method عادية. جوه الـ record تقدر تقرا [[other.cents]] مباشرة.`,
            "قفلة الـ record.",
            "main.",
            R`عملة بحروف صغيرة، والـ constructor هيكبّرها.`,
            "نفس القيم بالظبط.",
            R`[[toString]] جاهز: [[Money[cents=1500, currency=EGP]]].`,
            R`الـ accessors بأقواس: [[1500 EGP]].`,
            R`[[true false]]: متساويين بالقيمة، بس اتنين objects.`,
            R`[[Money[cents=3000, currency=EGP]]].`,
            R`set فيها الاتنين.`,
            R`[[1]]: الـ hashCode و equals متساويين، فاتحسبوا عنصر واحد.`,
            "قفلة."
          ],
          sol: R`[[a.cents = 5;]] بيطلّع [[cannot assign a value to final variable cents]]: الحقول final.

الحل تحت. [[withCurrency]] بترجع object جديد والأصلي زي ما هو (نفس فكرة الـ spread في JS مع الـ state في React). و [[plus]] بين EGP و USD بترمي [[IllegalArgumentException: currency mismatch: EGP vs USD]]. لاحظ إن [[!currency.equals(...)]] مش [[!=]]، لأنها Strings.`,
          solCode: R`record Money(long cents, String currency) {
    Money {
        if (cents < 0) throw new IllegalArgumentException("negative");
        currency = currency.toUpperCase();
    }
    Money plus(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("currency mismatch: " + currency + " vs " + other.currency);
        return new Money(cents + other.cents, currency);
    }
    Money withCurrency(String c) { return new Money(cents, c); }
}

void main() {
    var egp = new Money(1500, "egp");
    var usd = egp.withCurrency("usd");
    IO.println(egp + " " + usd);
    IO.println(egp.plus(usd));
}`
        },
        {
          cmd: "enum",
          title: "قايمة قيم ثابتة، وكل قيمة ليها بيانات وسلوك",
          desc: R`الـ [[enum]] في Java أقوى بكتير من TS: كل قيمة object حقيقي، وممكن يبقى ليها حقول و constructor و methods. [[Status.DONE]] مش رقم ولا string، ده object واحد بس في البرنامج كله، فمقارنته بـ [[==]] سليمة.

وعندك [[values()]] لكل القيم، و [[valueOf("DONE")]] من string لـ enum (بيقع لو الاسم غلط)، و [[name()]] للاسم، و [[ordinal()]] للترتيب. وفي JPA بتتخزن كـ string بـ [[@Enumerated(EnumType.STRING)]].`,
          example: R`enum Status {
    TODO("Not started"), IN_PROGRESS("In progress"), DONE("Done");

    private final String label;
    Status(String label) { this.label = label; }
    String label() { return label; }
    boolean isOpen() { return this != DONE; }
}

void main() {
    Status s = Status.valueOf("IN_PROGRESS");
    IO.println(s + " " + s.label() + " " + s.ordinal());
    IO.println(s.isOpen());
    for (Status each : Status.values()) IO.print(each.name() + " ");
    IO.println();
    IO.println(Status.valueOf("done"));
}`,
          try: R`اكتب static method اسمها [[parse(String raw)]] جوه الـ enum بترجع [[Optional<Status>]]: بتقبل [["done"]] و [[" Done "]]، وبترجع [[Optional.empty()]] لأي حاجة غلط بدل ما تقع. (لو Optional لسه جديدة عليك، ارجعلها بعد درس Optional.)`,
          flag: "script",
          deep: {
            why: R`حالات الطلب، والأدوار، وأنواع الدفع: كلها قيم محددة. بـ enum الـ compiler بيمنع أي قيمة برّه القايمة، و [[switch]] بيتأكد إنك غطيت كل الحالات (الدرس الجاي)، والسلوك الخاص بكل قيمة بيبقى جوه الـ enum نفسه بدل if متفرقة في الكود.`,
            how: R`الـ enum class خاص: الـ constructor private دايمًا، والـ JVM بيعمل object واحد لكل قيمة وقت تحميل الـ class. عشان كده [[==]] مضمونة، و enum بقيمة واحدة أحسن طريقة لعمل Singleton في Java.

[[valueOf]] بيطابق الاسم بالظبط (حروف كبيرة وصغيرة)، ولو مش لاقي بيرمي [[IllegalArgumentException]]. وفي Spring، لو request بعت [["status": "done"]] والـ enum فيه [[DONE]]، Jackson هيرجع 400 (والرسالة ممكن تكشف القيم المسموحة).

[[ordinal()]] رقم الترتيب في التعريف. متخزنوش في الداتابيز: لو ضفت قيمة في النص كل الأرقام بتتزحزح. عشان كده في JPA [[@Enumerated(EnumType.STRING)]] دايمًا.

وفيه [[EnumMap]] و [[EnumSet]]: map و set مخصوصين للـ enums وأسرع بكتير.`,
            when: R`أي مجموعة قيم ثابتة معروفة وقت الكتابة. لو القيم بتتغير من الـ admin (تصنيفات منتجات مثلًا) دي جدول في الداتابيز مش enum.`,
            mistakes: R`تخزن الـ ordinal في الداتابيز (الافتراضي في JPA لو نسيت [[@Enumerated(EnumType.STRING)]]!). و [[valueOf]] على input من المستخدم من غير ما تمسك الـ exception. وتغيّر اسم قيمة enum والقيم القديمة متخزنة في الداتابيز بالاسم القديم: محتاج migration.`
          },
          teach: R`## البرنامج بيعمل إيه؟

[[enum Status]] فيه ٣ حالات لمهمة، وكل حالة معاها نص للعرض ([[label]]) و method بتقول هل المهمة لسه مفتوحة. وبعدين بيحوّل نص لـ enum، ويلف على كل القيم، ويوقع عمدًا بـ [[valueOf]] باسم غلط. اتشغّل بـ [[java EnumDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. القيم

~~~java
enum Status {
    TODO("Not started"), IN_PROGRESS("In progress"), DONE("Done");
~~~

- [[enum Status]]: نوع ليه عدد قيم ثابت معروف. متغير نوعه Status مينفعش ياخد غير التلاتة دول (أو null).
- [[TODO]] و [[IN_PROGRESS]] و [[DONE]]: الأسامي بحروف كبيرة و [[_]] (عادة الثوابت).
- [[("Not started")]] بعد كل اسم: كل قيمة بتنادي الـ constructor (تحت) بالنص بتاعها. يعني كل قيمة **object حقيقي** جواه بيانات.
- [[,]] بين القيم، و [[;]] في الآخر لازمة لأن فيه كود بعدها. (لو الـ enum فيه أسامي بس من غير كود، الـ [[;]] اختيارية.)

---

## ٢. الحقل والـ constructor والـ methods

~~~java
    private final String label;
    Status(String label) { this.label = label; }
    String label() { return label; }
    boolean isOpen() { return this != DONE; }
}
~~~

- [[private final String label;]]: كل قيمة شايلة label بتاعها.
- [[Status(String label)]]: الـ constructor. في الـ enum بيبقى private دايمًا لوحده، فمحدش يقدر يكتب [[new Status(...)]]: القيم هي التلاتة اللي فوق وبس.
- [[label()]]: getter.
- [[isOpen()]]: [[this]] هو القيمة اللي اتنادت عليها الـ method. و [[!=]] هنا سليمة (مع إنها objects)، لأن الـ JVM بيعمل **object واحد بس** لكل قيمة في البرنامج كله. [[DONE]] في أي مكان هو نفس الـ object.

---

## ٣. [[valueOf]]: من نص لـ enum

~~~java
    Status s = Status.valueOf("IN_PROGRESS");
    IO.println(s + " " + s.label() + " " + s.ordinal());
    IO.println(s.isOpen());
~~~

~~~text الناتج
IN_PROGRESS In progress 1
true
~~~

- [[Status.valueOf("IN_PROGRESS")]]: method جاهزة في أي enum. بتدوّر على قيمة اسمها **بالظبط** كده وترجعها.
- [[s]] لوحدها في الطباعة: [[toString()]] بتاعة الـ enum بترجع الاسم: [[IN_PROGRESS]].
- [[s.label()]]: النص اللي احنا حطيناه: [[In progress]].
- [[s.ordinal()]]: رقم ترتيب القيمة في التعريف، من صفر: TODO = 0 و IN_PROGRESS = 1 و DONE = 2.
- [[isOpen()]]: IN_PROGRESS مش DONE، فـ [[true]].

---

## ٤. [[values()]] و [[name()]]

~~~java
    for (Status each : Status.values()) IO.print(each.name() + " ");
    IO.println();
~~~

~~~text الناتج
TODO IN_PROGRESS DONE 
~~~

- [[Status.values()]]: array فيها كل القيم بترتيب التعريف.
- [[each.name()]]: الاسم كنص. نفس [[toString()]] هنا، بس [[name()]] مضمونة دايمًا ومحدش يقدر يغيّرها (toString ممكن تتعمل لها override).
- [[IO.print]] من غير سطر جديد، فالتلاتة في سطر واحد (وفيه مسافة في الآخر). و [[IO.println()]] الفاضية بتنزل سطر.

---

## ٥. [[valueOf]] باسم غلط

~~~java
    IO.println(Status.valueOf("done"));
~~~

~~~text الناتج
Exception in thread "main" java.lang.IllegalArgumentException: No enum constant EnumDemo.Status.done
	at java.base/java.lang.Enum.valueOf(Enum.java:293)
	at EnumDemo$Status.valueOf(EnumDemo.java:1)
	at EnumDemo.main(EnumDemo.java:16)
~~~

- [["done"]] حروف صغيرة، والاسم [[DONE]]. [[valueOf]] مبتتساهلش: [[No enum constant]] = «مفيش قيمة بالاسم ده».
- [[EnumDemo.Status.done]]: الاسم الكامل اللي دوّر عليه (Status جوه الـ class المخفي EnumDemo).
- الـ stack trace من تحت لفوق: main نادت [[Status.valueOf]]، اللي نادت [[Enum.valueOf]] جوه الـ JDK نفسه ([[java.base]])، وهي اللي رمت.

ولو النص جاي من المستخدم، ده يبقى crash. عشان كده الحل تحت.

---

## ٦. الحل: [[parse]] بترجع [[Optional]]

~~~java
enum Status {
    TODO, IN_PROGRESS, DONE;

    static Optional<Status> parse(String raw) {
        if (raw == null) return Optional.empty();
        String key = raw.strip().toUpperCase();
        return Arrays.stream(values()).filter(s -> s.name().equals(key)).findFirst();
    }
}
~~~

- [[TODO, IN_PROGRESS, DONE;]]: enum من غير labels، والـ [[;]] لأن بعدها method.
- [[static]]: بتتنادى [[Status.parse(...)]] من غير قيمة.
- [[Optional<Status>]]: «صندوق» يا فيه Status يا فاضي. بدل ما ترجع null أو ترمي exception، بترجع صندوق والكود اللي نادى لازم يتعامل مع الحالتين (درس Optional).
- [[if (raw == null) return Optional.empty();]]: [[==]] مع null سليمة. ولو مفحصناش، [[raw.strip()]] كانت هتقع بـ NPE.
- [[raw.strip().toUpperCase()]]: [[" Done "]] تبقى [["DONE"]].
- السطر الأخير من جوه لبرة:
  - [[values()]]: array القيم.
  - [[Arrays.stream(...)]]: بيحوّل الـ array لـ stream، زي ما تمسك array في JS وتعمل عليها [[filter]] و [[find]] (درس streams).
  - [[.filter(s -> s.name().equals(key))]]: سيب بس القيم اللي اسمها يساوي key. [[s -> ...]] lambda زي [[s => ...]] في JS.
  - [[.findFirst()]]: أول واحدة فاضلة، وبترجع [[Optional]] لوحدها: فيه القيمة، أو فاضي لو مفيش.

~~~java
void main() {
    IO.println(Status.parse("done"));
    IO.println(Status.parse(" Done "));
    IO.println(Status.parse("finished"));
}
~~~

~~~text الناتج
Optional[DONE]
Optional[DONE]
Optional.empty
~~~

مفيش ولا exception: [["finished"]] رجعت صندوق فاضي.

---

## الخلاصة

| الـ method | بترجع | مثال |
|---|---|---|
| [[valueOf("DONE")]] | القيمة، أو exception لو الاسم غلط | [[DONE]] |
| [[values()]] | array بكل القيم بالترتيب | [[TODO IN_PROGRESS DONE]] |
| [[name()]] | الاسم كنص | [["DONE"]] |
| [[ordinal()]] | الترتيب من صفر (متخزنوش في داتابيز) | [[2]] |

- كل قيمة object واحد بس، فـ [[==]] سليمة مع الـ enums.
- الـ enum ينفع فيه حقول و constructor و methods.
- [[valueOf]] على input من برّه: امسكها، أو اعمل [[parse]] بترجع Optional.`,
          lines: [
            "enum بتلات قيم.",
            R`كل قيمة بتنادي الـ constructor بالـ label بتاعها، وبعدها [[;]] لأن فيه كود بعدها.`,
            "حقل لكل قيمة.",
            "constructor (private لوحده).",
            "getter.",
            R`سلوك جوه الـ enum، و [[!=]] سليمة لأن كل قيمة object واحد.`,
            "قفلة.",
            "main.",
            R`من string لـ enum بالاسم بالظبط.`,
            R`[[IN_PROGRESS In progress 1]]: toString هو الاسم، والترتيب من صفر.`,
            R`[[true]].`,
            R`[[values()]] بترجع array بكل القيم بالترتيب.`,
            "سطر جديد.",
            R`[["done"]] بحروف صغيرة: [[IllegalArgumentException: No enum constant ...Status.done]].`,
            "قفلة."
          ],
          sol: R`الحل تحت: بيطبع [[Optional[DONE]]] و [[Optional[DONE]]] و [[Optional.empty]].

[[strip()]] بيشيل المسافات و [[toUpperCase()]] بيحوّل للحروف الكبيرة، وبعدين بندوّر في [[values()]] بـ stream بدل [[valueOf]]، فمفيش exception نمسكها. ولو كتبت [[Optional.of(valueOf(...))]] جوه try/catch ده شغال برضه، بس الـ exceptions للحالات الاستثنائية مش لـ input غلط متوقع. وافحص null قبل [[strip]] لو ممكن يجيلك null.`,
          solCode: R`enum Status {
    TODO, IN_PROGRESS, DONE;

    static Optional<Status> parse(String raw) {
        if (raw == null) return Optional.empty();
        String key = raw.strip().toUpperCase();
        return Arrays.stream(values()).filter(s -> s.name().equals(key)).findFirst();
    }
}

void main() {
    IO.println(Status.parse("done"));
    IO.println(Status.parse(" Done "));
    IO.println(Status.parse("finished"));
}`
        },
        {
          cmd: "switch expressions",
          title: "switch بيرجع قيمة، والـ compiler بيتأكد إنك مغطي كل الحالات",
          desc: R`الـ switch الحديث في Java expression: بيرجع قيمة، وبيستخدم [[->]] فمفيش [[break]] ولا fall-through بالغلط. وممكن كذا قيمة في [[case]] واحد ([[case 1, 2, 3 ->]])، ولو محتاج كذا سطر تحط block وترجع بـ [[yield]].

وأهم ميزة: لما الـ switch على enum ومن غير [[default]]، الـ compiler بيتأكد إنك غطيت كل القيم. لو حد ضاف قيمة جديدة للـ enum، كل switch ناقص بيبقى خطأ compile. ده زي الـ exhaustive check بـ [[never]] في TS.`,
          example: R`enum Status { TODO, IN_PROGRESS, DONE }

int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS -> 2;
        case DONE -> 0;
    };
}

String size(int n) {
    return switch (n) {
        case 0 -> "empty";
        case 1, 2, 3 -> "small";
        default -> {
            String label = n > 100 ? "huge" : "big";
            yield label;
        }
    };
}

void main() {
    IO.println(priority(Status.IN_PROGRESS));
    IO.println(size(2) + " " + size(50) + " " + size(500));
}`,
          try: R`ضيف [[BLOCKED]] للـ enum وشغّل: فين الخطأ؟ وبعدين اكتب نفس [[priority]] بالـ switch القديم ([[case TODO: return 1;]]) مع [[default: return 0;]] وضيف BLOCKED: الـ compiler قال حاجة؟`,
          flag: "script",
          deep: {
            why: R`الـ switch القديم (زي JS) كان بيقع في fall-through لو نسيت [[break]]، ومكنش بيرجع قيمة فكنت تعمل متغير وتعيّنه في كل case. والأخطر: لما حد يضيف حالة جديدة، مفيش حاجة بتقولك فين الأماكن اللي محتاجة تتحدّث.`,
            how: R`[[case X ->]] بينفذ اللي بعده بس ومش بيكمّل للـ case اللي تحته. ولو الـ switch expression (بيرجع قيمة)، لازم يغطي كل الاحتمالات: مع enum أو sealed interface (الدرس الجاي) الـ compiler بيعرف القايمة كاملة فمش محتاج [[default]]. مع [[int]] أو [[String]] لازم [[default]].

والـ switch بقى بيشتغل على [[String]] وعلى enums وعلى الأنواع (pattern matching). ولو القيمة null من غير [[case null]]، بيرمي NullPointerException.

والحيلة المهمة: متحطش [[default]] في switch على enum لو عايز الحماية. الـ default بيخلي الـ compiler مطمن إن كله متغطي، فالقيمة الجديدة بتروح للـ default بهدوء.`,
            when: R`بدل سلسلة [[if / else if]] على نفس القيمة، وخصوصًا على enums و sealed types. في Spring: تحويل حالة لـ HTTP status، أو اختيار استراتيجية حسب نوع الدفع.`,
            mistakes: R`[[default]] على enum فتخسر الـ exhaustiveness. وتخلط [[case X:]] (القديم، بيعمل fall-through) و [[case X ->]] في نفس الـ switch: ممنوع أصلًا. وتنسى [[yield]] في الـ block فيطلع خطأ.`
          },
          teach: R`## البرنامج بيعمل إيه؟

method بتحوّل حالة مهمة لرقم أولوية بـ switch على enum، و method تانية بتوصف رقم بكلمة بـ switch على int فيه حالة بكذا سطر. الاتنين بيستخدموا الـ switch كـ **قيمة** بترجع. اتشغّل بـ [[java SwitchDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ تحت اتجرّب بتعديل الملف.

---

## ١. الـ enum و [[priority]]

~~~java
enum Status { TODO, IN_PROGRESS, DONE }

int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS -> 2;
        case DONE -> 0;
    };
}
~~~

- [[enum Status { ... }]] في سطر: أسامي بس، فمفيش [[;]].
- [[int priority(Status s)]]: method بترجع [[int]]. ومن غير [[static]] عادي هنا، لأن [[main]] في الملف الـ compact مش static.
- [[return switch (s) { ... };]]: الـ switch كله **expression** ليه قيمة، والقيمة دي هي اللي بترجع. لاحظ الـ [[;]] بعد [[}]]: لأنه آخر جملة [[return]].
- [[case TODO -> 1;]]: لو s هي TODO، قيمة الـ switch 1. السهم [[->]] بينفذ اللي بعده **بس**: مفيش [[break]]، ومفيش «يكمّل للـ case اللي تحته» (fall-through) زي switch بتاع JS.
- مفيش [[default]]: الـ compiler عارف إن الـ enum فيه ٣ قيم والتلاتة متغطيين.

---

## ٢. [[size]]: switch على int

~~~java
String size(int n) {
    return switch (n) {
        case 0 -> "empty";
        case 1, 2, 3 -> "small";
        default -> {
            String label = n > 100 ? "huge" : "big";
            yield label;
        }
    };
}
~~~

- [[case 1, 2, 3 ->]]: كذا قيمة لنفس النتيجة، مفصولين بـ [[,]].
- [[default ->]]: «أي حاجة تانية». مع [[int]] **لازمة**: فيه ٤ مليار احتمال والـ compiler مش هيعرف إنك غطيتهم.
- [[{ ... }]] بعد السهم: لو محتاج أكتر من سطر.
- [[n > 100 ? "huge" : "big"]]: الـ ternary زي JS: لو الشرط صح القيمة الأولى، غير كده التانية.
- [[yield label;]]: بترجّع القيمة **من الـ block للـ switch**. ليه مش [[return]]؟ لأن return هتخرج من الـ method كلها، واحنا عايزين نطلع من الـ case بس.

جرّبنا نشيل سطر الـ [[yield]] خالص:

~~~text الناتج
w4/SwitchDemo.java:17: error: switch rule completes without providing a value
        }
        ^
  (switch rules in switch expressions must either provide a value or throw)
~~~

«كل case في switch expression لازم يطلّع قيمة أو يرمي exception».

---

## ٣. main

~~~java
void main() {
    IO.println(priority(Status.IN_PROGRESS));
    IO.println(size(2) + " " + size(50) + " " + size(500));
}
~~~

~~~text الناتج
2
small big huge
~~~

- [[IN_PROGRESS]] → 2.
- 2 في [[case 1, 2, 3]] → small. 50 مش في أي case، فالـ default، و 50 مش أكبر من 100 → big. و 500 → huge.

---

## ٤. الـ try: إضافة [[BLOCKED]]

غيّرنا السطر الأول لـ [[enum Status { TODO, IN_PROGRESS, DONE, BLOCKED }]] من غير ما نلمس [[priority]]:

~~~text الناتج
w2/SwitchDemo.java:4: error: the switch expression does not cover all possible input values
    return switch (s) {
           ^
~~~

الـ switch بقى ناقص قيمة، والـ compiler رفض البرنامج كله وورّاك مكانه بالظبط. ده المعنى الحقيقي لـ **exhaustive**: لو عندك ٢٠ switch على Status في المشروع، الـ compiler هيطلّعهم كلهم.

---

## ٥. الحل: القديم مقابل الجديد

~~~java
int priorityOld(Status s) {
    switch (s) {
        case TODO: return 1;
        case IN_PROGRESS: return 2;
        default: return 0;
    }
}
~~~

- ده الـ switch القديم (statement، مش expression): [[case X:]] بنقطتين مش سهم، وكل case بيعمل [[return]] بنفسه.
- [[default: return 0;]]: أي حاجة مش TODO ولا IN_PROGRESS ترجع 0.

~~~java
int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS, BLOCKED -> 2;
        case DONE -> 0;
    };
}

void main() {
    IO.println(priorityOld(Status.BLOCKED) + " " + priority(Status.BLOCKED));
}
~~~

~~~text الناتج
0 2
~~~

- النسخة القديمة اتعملها compile **من غير أي خطأ ولا تحذير** بعد إضافة BLOCKED، ورجّعت 0 بهدوء: المهام المتوقفة بقت أولويتها زي المهام اللي خلصت.
- النسخة الجديدة كانت هتوقف الـ compile لحد ما تقرر BLOCKED قيمتها كام، وهنا ضفناها مع IN_PROGRESS: 2.

> ممنوع تخلط الشكلين في نفس الـ switch. جرّبنا نحط [[case 9: yield "nine";]] جوه switch كله أسهم: [[error: different case kinds used in the switch]].

---

## ٦. لو القيمة null؟

جرّبنا في jshell switch على enum قيمته [[null]] من غير [[case null]]:

~~~text الناتج
|  Exception java.lang.NullPointerException: Cannot invoke "REPL.$JShell$2$S.ordinal()" because "REPL.$JShell$3.x" is null
~~~

الـ switch على enum بيستخدم [[ordinal()]] من جوه، فبيقع بـ NPE. لو null متوقعة، ضيف [[case null ->]].

---

## الخلاصة

| | القديم [[case X:]] | الجديد [[case X ->]] |
|---|---|---|
| بيرجع قيمة؟ | لأ (statement) | أيوه (expression) |
| fall-through | أيوه لو نسيت [[break]] | مفيش |
| كذا قيمة | [[case 1: case 2:]] | [[case 1, 2 ->]] |
| block بكذا سطر | عادي | [[{ ... yield x; }]] |
| بيفحص إنك غطيت كل الـ enum | لأ | أيوه، لو مفيش [[default]] |

- متحطش [[default]] في switch على enum: هيخبّي القيم الجديدة.
- مع [[int]] و [[String]] الـ [[default]] لازمة.`,
          lines: [
            "enum صغير.",
            "method بترجع int.",
            R`[[return switch]]: الـ switch نفسه قيمة.`,
            R`[[->]] ومفيش break.`,
            "حالة.",
            "حالة.",
            R`قفلة الـ switch بـ [[;]] لأنه expression. مفيش default، والـ compiler متأكد إن التلاتة متغطيين.`,
            "قفلة.",
            "switch على int.",
            "نفس الشكل.",
            "قيمة واحدة.",
            R`كذا قيمة مفصولين بـ [[,]].`,
            R`[[default]] لازمة مع int، وهنا block بكذا سطر.`,
            "حساب عادي.",
            R`[[yield]] بترجع القيمة من الـ block (مش [[return]]، لأن return هتطلع من الـ method كلها).`,
            "قفلة الـ block.",
            "قفلة الـ switch.",
            "قفلة.",
            "main.",
            R`[[2]].`,
            R`[[small big huge]].`,
            "قفلة."
          ],
          sol: R`بعد إضافة [[BLOCKED]]: خطأ compile على [[return switch (s)]]: [[the switch expression does not cover all possible input values]]. الـ compiler بيوريك بالظبط كل مكان محتاج يتحدّث.

مع الـ switch القديم و [[default: return 0;]]: مفيش أي خطأ ولا تحذير، و BLOCKED بترجع 0 بهدوء. لو ده منطق أولويات في تطبيق حقيقي، المهام الـ blocked هتتعامل كأنها خلصت ومحدش هياخد باله. وده سبب إن الـ switch expression من غير default على enum أأمن.`,
          solCode: R`enum Status { TODO, IN_PROGRESS, DONE, BLOCKED }

int priorityOld(Status s) {
    switch (s) {
        case TODO: return 1;
        case IN_PROGRESS: return 2;
        default: return 0;
    }
}

int priority(Status s) {
    return switch (s) {
        case TODO -> 1;
        case IN_PROGRESS, BLOCKED -> 2;
        case DONE -> 0;
    };
}

void main() {
    IO.println(priorityOld(Status.BLOCKED) + " " + priority(Status.BLOCKED));
}`
        },
        {
          cmd: "sealed و pattern matching",
          title: "أنواع محدودة ومعروفة، و switch بيفك كل نوع ويقرا حقوله",
          desc: R`[[sealed interface Payment permits Card, Wallet, Cash]] معناها إن الأنواع اللي بتنفذ Payment هي التلاتة دول بس، ومحدش تاني يقدر. ومع records، ده بالظبط الـ discriminated union في TS: [[type Payment = Card | Wallet | Cash]].

والـ pattern matching بيخليك تفحص النوع وتفك الحقول في خطوة: [[if (o instanceof String s)]] بيفحص ويعمل متغير [[s]] من النوع الصح (من غير cast). وفي الـ switch: [[case Card(var last4, var amount) ->]] بيفحص إنه Card ويطلّع حقوله، و [[when]] بيضيف شرط. ولأن النوع sealed، الـ compiler بيتأكد إنك غطيت كل الأنواع.`,
          example: R`sealed interface Payment permits Card, Wallet, Cash {}
record Card(String last4, long amount) implements Payment {}
record Wallet(String phone, long amount) implements Payment {}
record Cash(long amount) implements Payment {}

String describe(Payment p) {
    return switch (p) {
        case Card(var last4, var amount) when amount > 10_000 -> "big card payment ****" + last4;
        case Card c -> "card ****" + c.last4();
        case Wallet(var phone, var amount) -> "wallet " + phone + " " + amount;
        case Cash cash -> "cash " + cash.amount();
    };
}

void main() {
    Object o = "hello";
    if (o instanceof String s && s.length() > 3) IO.println(s.toUpperCase());
    List<Payment> all = List.of(new Card("4242", 50_000), new Card("1111", 200), new Wallet("0100", 90), new Cash(10));
    all.forEach(p -> IO.println(describe(p)));
}`,
          try: R`ضيف [[record Installment(int months, long amount) implements Payment {}]] وضيفه لـ [[permits]]، وشغّل: فين الخطأ؟ غطّيه في الـ switch. وبعدين بدّل ترتيب أول سطرين [[case]] (خلي [[case Card c]] الأول) واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`نتيجة عملية (نجحت أو فشلت بسبب كذا)، وأنواع دفع، وأحداث في نظام: كلها «واحد من كذا شكل، وكل شكل بيانات مختلفة». زمان في Java كان الحل وراثة و [[instanceof]] و casts أو visitor pattern معقد. دلوقتي sealed و records و switch بيعملوا ده بأمان وبكود قصير، زي TS.`,
            how: R`[[sealed]] بيحدد مين مسموحله ينفذ. الأنواع المسموحة لازم تبقى [[final]] (والـ records final لوحدها) أو [[sealed]] أو [[non-sealed]]. وبما إن القايمة مقفولة، الـ switch يقدر يتأكد من التغطية.

الـ record pattern [[Card(var last4, var amount)]] بينادي الـ accessors ويحط القيم في متغيرات. و [[when]] guard: الـ case ده يتطابق بس لو الشرط صح، وإلا يكمّل للي بعده.

الترتيب مهم: الـ switch بيجرب الـ cases من فوق لتحت. لو [[case Card c]] (أي Card) جه قبل [[case Card(...) when ...]]، التاني عمره ما هيتطابق، والـ compiler بيعتبره خطأ (dominated).

والـ pattern في [[instanceof]] (من Java 16): [[o instanceof String s && s.length() > 3]] الـ [[s]] متاح بعد [[&&]] لأنه مضمون إنه String هناك، زي الـ narrowing في TS بالظبط.`,
            when: R`نتايج العمليات في الـ domain، والأحداث، والأوامر، وأي حاجة كنت هتعملها discriminated union في TS. وفي Spring ممكن الـ service يرجع [[sealed interface Result]] والـ controller يعمل switch يحوّله لـ status code.`,
            mistakes: R`[[default]] في switch على sealed type فتخسر الحماية. وترتيب cases غلط. ونسيان إن الأنواع المسموحة لازم تبقى في نفس الـ package أو الـ module. وتستخدم [[instanceof]] وبعدين cast يدوي [[(String) o]]: الـ pattern أنضف.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف [[Payment]] كنوع مقفول ليه ٣ أشكال بس (كارت، ومحفظة، وكاش)، كل شكل record ببيانات مختلفة. وبعدين method بـ switch بيعرف الشكل ويفك حقوله في نفس الخطوة، وفي main فيه كمان [[instanceof]] بالشكل الجديد. ده المقابل في Java لـ [[type Payment = Card | Wallet | Cash]] في TS. اتشغّل بـ [[java SealedDemo.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25)، وكل خطأ تحت اتجرّب بتعديل الملف.

---

## ١. [[sealed interface]]: القايمة مقفولة

~~~java
sealed interface Payment permits Card, Wallet, Cash {}
~~~

- [[sealed]] = مقفول. و [[permits Card, Wallet, Cash]] = دول بس المسموح لهم ينفذوا Payment.
- [[{}]]: الـ interface فاضي، ملوش methods. هو هنا «اسم للعيلة» بس.

جرّبنا نضيف نوع رابع مش في القايمة ([[record Crypto(long amount) implements Payment {}]]):

~~~text الناتج
z5/SealedDemo.java:5: error: class is not allowed to extend sealed class: Payment (as it is not listed in its 'permits' clause)
record Crypto(long amount) implements Payment {}
^
~~~

ليه ده مهم؟ لأن الـ compiler دلوقتي **عارف كل الاحتمالات**، زي ما بيعرف قيم الـ enum. فيقدر يتأكد إن الـ switch مغطيهم (تحت).

---

## ٢. الأنواع التلاتة

~~~java
record Card(String last4, long amount) implements Payment {}
record Wallet(String phone, long amount) implements Payment {}
record Cash(long amount) implements Payment {}
~~~

- كل واحد record (درس records) ببيانات مختلفة: الكارت آخر ٤ أرقام، والمحفظة رقم تليفون، والكاش مبلغ بس.
- الأنواع المسموحة لازم تبقى [[final]] أو [[sealed]] أو [[non-sealed]]، عشان محدش يورث منها ويفتح القايمة من الباب الخلفي. والـ records [[final]] لوحدها، فمش محتاج تكتب حاجة.

---

## ٣. الـ switch على النوع

~~~java
String describe(Payment p) {
    return switch (p) {
~~~

switch expression (درس switch) بس المرة دي على **نوع** الـ object مش على قيمة. كل [[case]] اسمه **pattern**.

### الـ case الأول: record pattern مع [[when]]

~~~java
        case Card(var last4, var amount) when amount > 10_000 -> "big card payment ****" + last4;
~~~

من الشمال لليمين:

1. [[Card(...)]]: هل p نوعه Card؟
2. [[(var last4, var amount)]]: لو أيوه، فكّه: نادي [[last4()]] و [[amount()]] وحط القيم في متغيرين جداد. ده **record pattern**، زي الـ destructuring في JS: [[const { last4, amount } = card]]. و [[var]] = النوع يتستنتج ([[String]] و [[long]]).
3. [[when amount > 10_000]]: **guard**، شرط زيادة. الـ case ده يتطابق بس لو الكارت ومبلغه أكبر من ١٠ آلاف. لو لأ، يكمّل للـ case اللي بعده.
4. [[-> "big card payment ****" + last4]]: النتيجة، و [[last4]] متاح هنا لأنه اتفك.

### الـ case التاني: type pattern

~~~java
        case Card c -> "card ****" + c.last4();
~~~

- [[Card c]]: «لو p نوعه Card، سمّيه [[c]]»، و [[c]] نوعه Card فعلًا، من غير cast. ده **type pattern**.
- هنا ما فكّيناش الحقول، فبنقراها بالـ accessor: [[c.last4()]].
- ده بيلقط أي Card **ما اتلقطش** في اللي فوق (يعني المبلغ 10,000 أو أقل).

### المحفظة والكاش

~~~java
        case Wallet(var phone, var amount) -> "wallet " + phone + " " + amount;
        case Cash cash -> "cash " + cash.amount();
    };
}
~~~

نفس الشكلين: record pattern للمحفظة، و type pattern للكاش. ومفيش [[default]]: الـ compiler عارف من الـ [[permits]] إن التلاتة اتغطوا.

---

## ٤. main

~~~java
void main() {
    Object o = "hello";
    if (o instanceof String s && s.length() > 3) IO.println(s.toUpperCase());
~~~

~~~text الناتج
HELLO
~~~

- [[o]] نوعه Object (والقيمة الحقيقية String).
- [[o instanceof String s]]: بيسأل «هل o String؟»، ولو أيوه بيعمل متغير [[s]] نوعه String. الطريقة القديمة كانت [[instanceof]] وبعدين [[String s = (String) o;]] في سطر لوحده.
- [[&& s.length() > 3]]: [[s]] متاح بعد [[&&]] لأن الجزء التاني مش بيتنفذ غير لو الأول صح، يعني مضمون إنه String هناك. زي الـ narrowing في TS.
- [["hello"]] طولها 5، فاتطبعت بحروف كبيرة.

~~~java
    List<Payment> all = List.of(new Card("4242", 50_000), new Card("1111", 200), new Wallet("0100", 90), new Cash(10));
    all.forEach(p -> IO.println(describe(p)));
}
~~~

~~~text الناتج
big card payment ****4242
card ****1111
wallet 0100 90
cash 10
~~~

- [[all.forEach(p -> ...)]]: لكل عنصر، نفّذ الـ lambda. زي [[forEach(p => ...)]] في JS.
- كارت ٥٠ ألف: عدّى الـ guard → big. كارت ٢٠٠: الـ guard فشل، فنزل لـ [[case Card c]]. والمحفظة والكاش كل واحد في الـ case بتاعه.

---

## ٥. الـ try (١): نوع جديد في الـ permits

ضفنا [[record Installment(int months, long amount) implements Payment {}]] وضفنا [[Installment]] للـ [[permits]]، من غير ما نلمس الـ switch:

~~~text الناتج
z2/SealedDemo.java:8: error: the switch expression does not cover all possible input values
    return switch (p) {
           ^
~~~

نفس رسالة الـ enum بالظبط. وبعد ما ضفنا الـ case:

~~~java
        case Installment(var months, var amount) -> months + " months of " + amount / months;
~~~

وضفنا [[new Installment(3, 900)]] للـ list:

~~~text الناتج
HELLO
big card payment ****4242
card ****1111
wallet 0100 90
cash 10
3 months of 300
~~~

[[amount / months]]: [[long]] على [[int]] = قسمة صحيحة: 900 / 3 = 300.

---

## ٦. الـ try (٢): ترتيب الـ cases

بدّلنا أول سطرين، فبقى [[case Card c]] قبل [[case Card(...) when ...]]:

~~~text الناتج
z4/SealedDemo.java:9: error: this case label is dominated by a preceding case label
        case Card(var last4, var amount) when amount > 10_000 -> "big card payment ****" + last4;
             ^
~~~

الـ switch بيجرّب من فوق لتحت. [[case Card c]] بيلقط **أي** Card، فاللي تحته مستحيل يتوصل له. **dominated** = «مغطّى بواحد قبله». والـ compiler بيعتبرها غلطة بدل ما يسيبك تكتب كود ميت.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[sealed interface X permits A, B]] | A و B بس هما X |
| [[case A a ->]] | type pattern: لو A، سمّيه a |
| [[case A(var f, var g) ->]] | record pattern: لو A، فك حقوله |
| [[case A a when cond ->]] | guard: ونفس الوقت الشرط صح |
| [[o instanceof String s]] | افحص وسمّي في خطوة |

- sealed + records + switch من غير default = discriminated union في TS، والـ compiler بيمسك أي حالة ناقصة.
- الـ cases المحددة (بشروط أو أنواع أضيق) قبل العامة.`,
          lines: [
            R`[[sealed]]: التلاتة دول بس هما Payment.`,
            "record لكل نوع، وكل واحد بياناته مختلفة.",
            "المحفظة: رقم تليفون.",
            "الكاش: مبلغ بس.",
            "method بتاخد أي Payment.",
            "switch على النوع.",
            R`record pattern بيفك الحقول، و [[when]] شرط زيادة: الكروت الكبيرة الأول.`,
            R`type pattern: أي Card تاني، والمتغير [[c]] نوعه Card.`,
            "فك حقول المحفظة.",
            "الكاش.",
            R`مفيش default: الـ compiler متأكد إن التلاتة متغطيين.`,
            "قفلة.",
            "main.",
            R`متغير نوعه Object.`,
            R`[[instanceof String s]] بيفحص ويعمل [[s]] من النوع String: [[HELLO]].`,
            "أربع عمليات دفع.",
            R`[[big card payment ****4242]] و [[card ****1111]] و [[wallet 0100 90]] و [[cash 10]].`,
            "قفلة."
          ],
          sol: R`بعد إضافة [[Installment]] للـ permits: [[the switch expression does not cover all possible input values]] على الـ switch، زي enum بالظبط. الحل: [[case Installment(var months, var amount) -> months + " months of " + amount / months;]].

ولما تحط [[case Card c]] قبل [[case Card(...) when ...]]: [[error: this case label is dominated by a preceding case label]]. أي Card هيتطابق مع الأول، فالتاني مستحيل يتوصله، والـ compiler بيعتبر ده غلط بدل ما يسيبه يعدّي. القاعدة: الـ cases المحددة (بشروط) قبل العامة.`
        }
      ]
    }
]);
