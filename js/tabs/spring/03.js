// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
    {
      t: "الكلاسات والـ interfaces",
      l: 1,
      n: "class بـ fields و constructor و methods، و static و final، و interfaces، والوراثة",
      items: [
        {
          cmd: "class و constructor",
          title: "تعمل class فيه بيانات وسلوك ومحدش يلعب في حالته من برّه",
          desc: R`الـ class في Java شبه class في TS: حقول (fields) و constructor و methods. الفرق إن الحقول لازم تتعلن بنوعها فوق، والـ constructor اسمه نفس اسم الـ class (مش [[constructor]])، و [[this.]] اختيارية لو مفيش تعارض في الأسماء.

العادة في Java: الحقول [[private]]، والوصول ليها من برّه بـ methods: [[getBalance()]] للقراية، و methods ليها معنى زي [[deposit]] بدل setter عام. وكل class ليه [[toString]] و [[equals]] و [[hashCode]] جايين من [[Object]]، وتقدر تعمل override ليهم.`,
          example: R`public class Account {
    private final String owner;
    private long balance;

    public Account(String owner, long balance) {
        if (balance < 0) throw new IllegalArgumentException("negative balance");
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(long amount) {
        balance += amount;
    }

    public long getBalance() { return balance; }

    @Override
    public String toString() { return owner + ": " + balance; }

    public static void main(String[] args) {
        Account acc = new Account("Sara", 100);
        acc.deposit(50);
        System.out.println(acc);
        System.out.println(acc.getBalance());
    }
}`,
          try: R`ضيف method اسمها [[withdraw(long amount)]] ترمي [[IllegalStateException]] لو الرصيد مش كفاية، وجرّبها بسحب ٥٠ مرة و ٥٠٠ مرة. وبعدين جرّب [[acc.balance = 1_000_000;]] من [[main]] ومن class تاني في نفس الملف: الفرق إيه؟`,
          flag: "script",
          deep: {
            why: R`لو الرصيد حقل public، أي حتة في الكود ممكن تحطه سالب. الـ encapsulation (حقول private و methods بتفحص) بيخلي القواعد في مكان واحد: مفيش طريقة يبقى فيها Account برصيد سالب. وده أساس الـ entities في JPA والـ services في Spring.`,
            how: R`الـ access modifiers: [[private]] جوه الـ class بس، ومن غير أي كلمة (package-private) جوه نفس الـ package، و [[protected]] الـ package والكلاسات الوارثة، و [[public]] أي حد. ده أشد من TS: في Java الـ private بيتفحص وقت التشغيل كمان، مش بس في الـ compiler.

[[new Account(...)]] بيحجز object في الـ heap وينادي الـ constructor. لو معملتش أي constructor، Java بتعمل واحد فاضي من غير باراميترات. ولو عملت واحد بباراميترات، الفاضي بيختفي (وده مهم في JPA اللي محتاج constructor فاضي، درس الـ entities).

[[@Override]] annotation بتقول للـ compiler «أنا قصدي أعمل override لـ method في الأب»، فلو كتبت الاسم غلط ([[tostring]]) بيطلع خطأ بدل ما يعمل method جديدة من غير ما تاخد بالك.

وفي الملف ده عندنا [[public class Account]] و [[main]] جواه بالشكل الكلاسيكي: الملف لازم يبقى اسمه [[Account.java]] بالظبط، لأن الـ public class اسمه لازم يطابق اسم الملف.`,
            when: "أي حاجة ليها حالة وقواعد: حساب، وطلب، وسلة. لو مجرد بيانات بتتنقل من غير قواعد (DTO) استخدم record (درس records).",
            mistakes: R`getter و setter لكل حقل أوتوماتيك (IDE بيولّدهم) فالـ class بقى struct مفتوح وكأن مفيش encapsulation. و ترجّع list داخلية من getter فاللي برّه يعدّل فيها: رجّع [[List.copyOf(items)]]. وتنسى [[this.]] لما اسم الباراميتر زي الحقل: [[owner = owner;]] بيعيّن الباراميتر لنفسه والحقل يفضل null (ولو الحقل [[final]] زي هنا، الـ compiler بيمسكها: [[variable owner might not have been initialized]]).

وفي الكود القديم هتلاقي Lombok ([[@Getter]] و [[@Setter]] و [[@Data]]) بيولّد الحاجات دي. شائع جدًا في الشركات، بس records قللت الحاجة ليه.`
          },
          teach: R`## البرنامج بيعمل إيه؟

class اسمه [[Account]] (حساب بنكي) فيه صاحب الحساب والرصيد، والرصيد مقفول من برّه: مفيش طريقة تغيّره غير بالـ methods اللي الـ class بيسمح بيها. وفي نفس الـ class فيه [[main]] بالشكل الكلاسيكي اللي هتشوفه في كل كود Java قديم. الملف لازم اسمه [[Account.java]]، واتشغّل بـ [[java Account.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. تعريف الـ class والحقول

~~~java
public class Account {
    private final String owner;
    private long balance;
~~~

- [[public class Account]]: [[class]] قالب للـ objects، و [[public]] معناها أي كود في أي مكان يقدر يستخدمه.
- القاعدة: الـ public class لازم اسم الملف يبقى هو هو. جرّبنا نحط الكود ده في [[Acc.java]] ونعمل [[javac Acc.java]]:

~~~text الناتج
Acc.java:1: error: class Account is public, should be declared in a file named Account.java
~~~

(الغريب إن [[java Acc.java]] نفسها اشتغلت: الـ source-file mode مش بيفحص الاسم. بس [[javac]] و Maven بيفحصوا، فخليك على القاعدة.)

- الحقول (fields): المتغيرات اللي كل object شايلها. في Java **لازم** تتعلن فوق بنوعها.
- [[private]]: محدش برّه الـ class يشوفها أو يلمسها.
- [[final]] على [[owner]]: بيتحط مرة واحدة في الـ constructor ومش بيتغير بعد كده (صاحب الحساب مبيتغيرش).
- [[long balance]]: من غير final، لأن الرصيد بيتغير. و [[long]] مش [[double]]: الفلوس أرقام صحيحة (قروش مثلًا).

---

## ٢. الـ constructor

~~~java
    public Account(String owner, long balance) {
        if (balance < 0) throw new IllegalArgumentException("negative balance");
        this.owner = owner;
        this.balance = balance;
    }
~~~

- الـ constructor هو الكود اللي بيشتغل لما حد يكتب [[new Account(...)]]. اسمه **نفس اسم الـ class** بالظبط، ومفيش قبله نوع رجوع (ولا حتى [[void]]). في TS كان اسمه [[constructor]].
- [[if (balance < 0) throw ...]]: الفحص هنا، في المكان الوحيد اللي الـ object بيتولد فيه. فمستحيل يبقى فيه Account برصيد سالب.
- [[throw new IllegalArgumentException("...")]]: [[throw]] زي JS، و [[IllegalArgumentException]] exception جاهزة معناها «الباراميتر اللي بعتهولي غلط».
- [[this.owner = owner;]]: فيه حاجتين بنفس الاسم: الباراميتر [[owner]] والحقل. [[this.owner]] = الحقل بتاع الـ object ده، و [[owner]] لوحدها = الباراميتر.

ولو نسيت [[this.]] وكتبت [[owner = owner;]]؟ انت بتحط الباراميتر في نفسه والحقل ميتلمسش. ولأن الحقل [[final]] هنا، الـ compiler مسكها:

~~~text الناتج
Account.java:9: error: variable owner might not have been initialized
    }
    ^
~~~

(لو الحقل مش final، مفيش خطأ خالص، والحقل بيفضل [[null]] بهدوء. فايدة تانية لـ final.)

---

## ٣. الـ methods

~~~java
    public void deposit(long amount) {
        balance += amount;
    }

    public long getBalance() { return balance; }
~~~

- [[public void deposit(long amount)]]: method عامة، [[void]] يعني مبترجعش قيمة، وبتاخد باراميتر [[long]].
- [[balance += amount;]]: من جوه الـ class الحقل الـ private متاح عادي، ومن غير [[this.]] لأن مفيش اسم تاني بيغطيه.
- [[getBalance()]]: بيرجع [[long]]. ده **getter**: الطريقة الوحيدة لقراية الرصيد من برّه. ومفيش [[setBalance]]: عايز تغيّر الرصيد؟ اعمل deposit.
- الـ method كلها ممكن تبقى في سطر واحد زي [[getBalance]]: المسافات والسطور في Java ملهاش معنى، الأقواس هي اللي بتحدد.

---

## ٤. [[@Override toString]]

~~~java
    @Override
    public String toString() { return owner + ": " + balance; }
~~~

- كل class في Java بيورث من [[Object]] methods جاهزة، منها [[toString()]]: النص اللي بيظهر لما تطبع الـ object. النسخة الأصلية بتطبع حاجة زي [[Account@1b6d3586]] (اسم الـ class ورقم).
- إحنا بنعيد تعريفها (override) ترجع [["Sara: 150"]].
- [[@Override]] اسمها **annotation**: علامة للـ compiler. معناها «أنا قاصد أعيد تعريف method موجودة في الأب». جرّبنا نكتب الاسم غلط [[tostring]] (t صغيرة):

~~~text الناتج
Account.java:17: error: method does not override or implement a method from a supertype
    @Override
    ^
~~~

من غير [[@Override]] كان هيعدّي، ويبقى عندك method جديدة اسمها tostring ومحدش بيناديها، والطباعة ترجع للشكل القديم من غير ما تفهم ليه.

---

## ٥. [[main]] الكلاسيكي

~~~java
    public static void main(String[] args) {
        Account acc = new Account("Sara", 100);
        acc.deposit(50);
        System.out.println(acc);
        System.out.println(acc.getBalance());
    }
}
~~~

| الحتة | معناها |
|---|---|
| [[public]] | الـ JVM لازم يقدر يناديها من برّه |
| [[static]] | بتتنادى من غير object (الـ JVM لسه مش عامل أي Account) |
| [[void]] | مبترجعش حاجة |
| [[String[] args]] | array نصوص فيها اللي بتكتبه بعد اسم الملف: [[java Account.java Sara]] تبقى [[args[0]]] = [["Sara"]] |
| [[System.out.println]] | الطباعة القديمة: [[System]] class، و [[out]] الـ stream بتاع الشاشة، و [[println]] اطبع وانزل سطر |

ده الشكل اللي كان إجباري قبل Java 25، وهتلاقيه في كل مشروع Spring ([[@SpringBootApplication]] جواه main بالشكل ده).

- [[new Account("Sara", 100)]]: object جديد، والـ constructor اتنادى بالقيمتين.
- [[acc.deposit(50)]]: الرصيد بقى 150.
- [[System.out.println(acc)]]: بتنادي [[toString()]] لوحدها.

~~~text الناتج
Sara: 150
150
~~~

---

## ٦. الـ try: [[withdraw]] و private

الـ solCode مش ملف كامل: الـ method دي تتحط جوه الـ class (تحت [[deposit]] مثلًا)، والسطور اللي تحت [[// في main:]] تتحط في آخر [[main]]:

~~~java
public void withdraw(long amount) {
    if (amount > balance) throw new IllegalStateException("insufficient balance");
    balance -= amount;
}
~~~

- الفحص قبل التغيير: لو المبلغ أكبر من الرصيد، ارمي exception والرصيد ميتلمسش.
- [[IllegalStateException]] مش [[IllegalArgumentException]]: المبلغ نفسه سليم، المشكلة في **حالة** الحساب دلوقتي.
- [[-=]]: اطرح وخزّن.

شغّلناه بعد السطرين بتوع main (الرصيد 150)، وجرّبنا كمان [[acc.balance = 1_000_000;]] من جوه main:

~~~text الناتج
Sara: 150
150
Sara: 100
Sara: 1000000
Exception in thread "main" java.lang.IllegalStateException: insufficient balance
	at Account.withdraw(Account.java:16)
	at Account.main(Account.java:34)
~~~

- سحب 50: الرصيد 100.
- [[acc.balance = 1_000_000;]] **اشتغلت**! ليه؟ لأن main جوه نفس الـ class، و [[private]] معناها «جوه الـ class»، مش «جوه الـ object».
- سحب أكبر من الرصيد: exception. والسطور اللي بتبدأ بـ [[at]] اسمها **stack trace**: مين نادى مين. اقراها من فوق: الوقعة في [[withdraw]] سطر 16، اللي اتنادت من [[main]] سطر 34.

ومن class تاني في نفس الملف (ضفنا [[class Other { void hack(Account a) { a.balance = 1; } }]] تحت قفلة Account):

~~~text الناتج
Account.java:27: error: balance has private access in Account
class Other { void hack(Account a) { a.balance = 1; } }
                                      ^
~~~

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[private]] | جوه الـ class بس |
| (من غير كلمة) | جوه نفس الـ package |
| [[protected]] | الـ package والكلاسات الوارثة |
| [[public]] | أي حد |
| [[final]] على حقل | بيتحط مرة واحدة في الـ constructor |
| [[this.x]] | الحقل، لما فيه باراميتر بنفس الاسم |
| [[@Override]] | الـ compiler يتأكد إنك فعلًا بتعيد تعريف method موجودة |

- الـ constructor اسمه اسم الـ class ومن غير نوع رجوع، والفحص بتاع القواعد بيبقى فيه.
- الحقول private، والتغيير بـ methods ليها معنى ([[deposit]] و [[withdraw]]) مش setters.`,
          lines: [
            R`[[public class]]: اسم الملف لازم يبقى Account.java.`,
            R`حقل [[private final]]: بيتحط في الـ constructor ومش بيتغير.`,
            R`حقل private بيتغير، بس من جوه الـ class بس.`,
            R`الـ constructor: نفس اسم الـ class ومفيش نوع رجوع.`,
            R`الفحص في مكان واحد: مفيش Account برصيد سالب. [[throw]] زي JS.`,
            R`[[this.owner]] الحقل، و [[owner]] الباراميتر.`,
            "نفس الكلام.",
            "قفلة الـ constructor.",
            R`method عامة بتغيّر الحالة. [[void]] يعني مبترجعش حاجة.`,
            "بتعدّل الحقل الخاص.",
            "قفلة.",
            R`getter: الطريقة الوحيدة لقراية الرصيد من برّه.`,
            R`[[@Override]]: بنعيد تعريف method جاية من Object.`,
            R`[[toString]] هو اللي println بتناديه.`,
            R`الشكل الكلاسيكي لـ main: [[public static void]] و [[String[] args]] للـ arguments.`,
            R`[[new]] بيعمل object وبينادي الـ constructor.`,
            "إيداع ٥٠.",
            R`[[System.out.println]] الطريقة القديمة للطباعة (شغالة في كل الإصدارات)، وبتنادي toString: [[Sara: 150]].`,
            R`[[150]].`,
            "قفلة main.",
            "قفلة الـ class."
          ],
          sol: R`[[withdraw]] زي الكود تحت. السحب الأول بيطبع [[Sara: 100]]، والتاني بيرمي [[IllegalStateException: insufficient balance]].

[[acc.balance = 1_000_000;]] من [[main]] بيشتغل لأن main جوه نفس الـ class، والـ private معناها «جوه الـ class» مش «جوه الـ object». من class تاني (اكتب [[class Other { void hack(Account a) { a.balance = 1; } }]] تحت قفلة Account في نفس الملف) بيطلع خطأ compile: [[balance has private access in Account]]. خلي بالك: في ملف compact (اللي بيبدأ بـ [[void main()]] من غير class) كل الـ classes بتبقى nested جوه class واحد مخفي، والـ nested classes بيشوفوا الـ private بتاع بعض، فالتجربة دي لازم تبقى في ملف فيه [[public class]] زي ده.

ليه [[IllegalStateException]] مش [[IllegalArgumentException]]؟ المبلغ نفسه سليم، المشكلة في حالة الحساب. الاتنين unchecked (درس الأخطاء).`,
          solCode: R`public void withdraw(long amount) {
    if (amount > balance) throw new IllegalStateException("insufficient balance");
    balance -= amount;
}

// في main:
acc.withdraw(50);
System.out.println(acc);
acc.withdraw(500);`
        },
        {
          cmd: "static و final",
          title: "حاجة بتاعة الـ class كله مش كل object، وحاجة متتغيرش",
          desc: R`[[static]] معناها إن الحقل أو الـ method بتاع الـ class نفسه، مش كل object: [[Counter.created]] نسخة واحدة مشتركة، و [[Math.max()]] بتتنادى من غير [[new]]. زي [[static]] في classes بتاعة JS و TS بالظبط.

و [[static final]] مع اسم بحروف كبيرة ([[MAX]]) ده الـ constant في Java. و [[final]] على حقل object معناها بيتحط مرة واحدة في الـ constructor، و [[final]] على class معناها محدش يورث منه ([[String]] مثلًا).`,
          example: R`class Counter {
    static int created = 0;
    static final int MAX = 3;
    final int id;

    Counter() {
        created++;
        id = created;
    }

    static boolean full() { return created >= MAX; }
}

void main() {
    var a = new Counter();
    var b = new Counter();
    IO.println(a.id + " " + b.id + " " + Counter.created);
    IO.println(Counter.full());
    final List<String> list = new ArrayList<>();
    list.add("still mutable");
    IO.println(list);
}`,
          try: R`جوه [[full()]] جرّب تقرا [[id]]، واقرا الخطأ. وبعدين فكّر: لو [[created++]] بيتنادى من ١٠٠ thread في نفس الوقت (زي ١٠٠ request في Spring)، الرقم هيطلع صح؟`,
          flag: "script",
          deep: {
            why: R`ثوابت التطبيق، والـ utility methods ([[Math]] و [[List.of]] و [[Objects.equals]])، والـ factory methods ([[Money.of(...)]]) كلها static. وفي Spring هتفهم ليه الـ state المشتركة (static أو حقل في bean) خطر.`,
            how: R`الحقل الـ static بيتخزن مرة واحدة مع الـ class، مش مع كل object. والـ static method ملهاش [[this]]، فمتقدرش تقرا حقول الـ object من جواها.

[[final]] على حقل: لازم يتحط مرة واحدة بالظبط (في التعريف أو في كل constructor)، والـ compiler بيتأكد. وده بيخلي الـ object immutable لو كل حقوله final ونوعها immutable.

ليه [[created++]] مش آمن مع threads: هو ٣ خطوات (اقرا، زوّد، اكتب)، واتنين threads ممكن يقروا نفس القيمة ويكتبوا نفس النتيجة، فيضيع عدّ. الحل [[AtomicInteger]] أو synchronization. JS مفيهاش المشكلة دي لأنها thread واحد، بس Java server بيشغّل كل request على thread.`,
            when: R`[[static final]] للثوابت. static methods للـ utilities اللي ملهاش حالة. في Spring: متخزنش state في حقول static أو حقول عادية في bean (كلهم singletons مشتركين بين كل الـ requests)، إلا لو thread-safe.`,
            mistakes: R`تحط كل حاجة static عشان «أسهل» فالكود يبقى زي procedural ومتقدرش تعمل mock في التستات. وتفتكر إن [[final]] معناها immutable: [[final List]] الـ list نفسها بتتعدّل عادي. ومتغير static بيتعدّل من كذا request: race condition بيطلع تحت الضغط بس.`
          },
          teach: R`## البرنامج بيعمل إيه؟

class [[Counter]] بيعدّ كام object اتعمل منه: العداد نفسه واحد مشترك ([[static]])، وكل object بياخد رقم خاص بيه ([[id]]) مش بيتغير ([[final]]). وفي الآخر بيوريك إن [[final]] على list مش بيمنع تعديلها. اتشغّل بـ [[java Counter.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. حقول الـ class

~~~java
class Counter {
    static int created = 0;
    static final int MAX = 3;
    final int id;
~~~

- [[class Counter]] من غير [[public]]: ينفع كذا class في نفس الملف، واسم الملف مش لازم يطابق.
- [[static int created = 0;]]: [[static]] معناها «بتاع الـ class نفسه». فيه **نسخة واحدة** من [[created]] مهما عملت objects، وكلهم بيشوفوها ويعدّلوا فيها.
- [[static final int MAX = 3;]]: static (نسخة واحدة) و final (متتغيرش) = **constant**. والعادة في Java إن اسم الـ constant حروف كبيرة و [[_]] بين الكلمات: [[MAX_RETRIES]].
- [[final int id;]]: من غير static، فكل object ليه [[id]] خاص بيه. ومن غير قيمة هنا: final بتسمح تتحط القيمة بعدين، بس **مرة واحدة**، والـ compiler بيتأكد إنها اتحطت في الـ constructor.

---

## ٢. الـ constructor

~~~java
    Counter() {
        created++;
        id = created;
    }
~~~

- [[Counter()]]: constructor من غير باراميترات.
- [[created++]]: [[++]] تزود ١. ده العداد المشترك: أول object يخليه 1، والتاني 2.
- [[id = created;]]: الـ id بتاع الـ object ده ياخد القيمة الحالية. ده أول وآخر تعيين لـ id.

---

## ٣. static method

~~~java
    static boolean full() { return created >= MAX; }
}
~~~

- method بتاعة الـ class: بتتنادى [[Counter.full()]] من غير ما يبقى معاك object.
- عشان كده جواها مفيش [[this]]، وتقدر تقرا الحاجات الـ static بس ([[created]] و [[MAX]]).
- [[>=]] أكبر من أو يساوي، والنتيجة [[boolean]].

جرّبنا نقرا [[id]] جواها ([[return id >= MAX;]]):

~~~text الناتج
st2/Counter.java:11: error: non-static variable id cannot be referenced from a static context
    static boolean full() { return id >= MAX; }
                                   ^
~~~

«non-static variable» = حقل بتاع object. والـ method دي ملهاش object، فـ id بتاع مين؟

---

## ٤. main

~~~java
void main() {
    var a = new Counter();
    var b = new Counter();
    IO.println(a.id + " " + b.id + " " + Counter.created);
    IO.println(Counter.full());
~~~

~~~text الناتج
1 2 2
false
~~~

- بعد [[a]]: created = 1 و a.id = 1. بعد [[b]]: created = 2 و b.id = 2.
- [[a.id]] و [[b.id]]: من الـ object (كل واحد بتاعه). [[Counter.created]]: من اسم الـ class (واحد للكل).
- [[Counter.full()]]: 2 أكبر من أو يساوي 3؟ لأ: [[false]].

---

## ٥. [[final]] على متغير object

~~~java
    final List<String> list = new ArrayList<>();
    list.add("still mutable");
    IO.println(list);
}
~~~

~~~text الناتج
[still mutable]
~~~

[[final]] هنا بتقفل **المتغير** [[list]]: مينفعش تكتب [[list = new ArrayList<>();]] تاني. بس الـ object اللي بيشاور عليه عادي بيتعدّل، و [[add]] اشتغلت. نفس [[const]] مع array في JS بالظبط. عايز list متتعدلش خالص؟ [[List.of(...)]] أو [[List.copyOf(list)]].

---

## ٦. الـ try: [[created++]] مع ١٠٠ thread

[[created++]] شكلها خطوة واحدة، بس هي ٣: اقرا القيمة، زوّد، اكتب. لو اتنين threads قروا نفس القيمة في نفس اللحظة، الاتنين يكتبوا نفس النتيجة، ويضيع عدّة. عشان نشوف ده بعينينا، كتبنا برنامج بيشغّل ١٠٠ thread، كل واحد بيزود عداد عادي وعداد [[AtomicInteger]] ألف مرة:

~~~java
static int plain = 0;
static final AtomicInteger safe = new AtomicInteger();

void main() throws Exception {
    Thread[] ts = new Thread[100];
    for (int i = 0; i < ts.length; i++) {
        ts[i] = new Thread(() -> {
            for (int j = 0; j < 1000; j++) { plain++; safe.incrementAndGet(); }
        });
        ts[i].start();
    }
    for (Thread t : ts) t.join();
    IO.println("plain=" + plain + " safe=" + safe.get());
}
~~~

(مفيش [[import]] لـ [[AtomicInteger]]: الـ compact source file بيعمل import لكل الـ module الأساسي [[java.base]] لوحده. في ملف فيه class عادي محتاج [[import java.util.concurrent.atomic.AtomicInteger;]].) [[new Thread(() -> ...)]] بيعمل thread بيشغّل الكود اللي في الـ lambda، و [[start()]] بيبدأه، و [[join()]] بيستنى لحد ما يخلص. المفروض الناتج 100 × 1000 = 100000. شغّلناه ٣ مرات (الماكينة فيها 16 logical processor):

~~~text الناتج
plain=99998 safe=100000
plain=99719 safe=100000
plain=99992 safe=100000
~~~

- [[plain]]: رقم مختلف كل مرة، وكله أقل من 100000. عدّات ضاعت.
- [[safe]]: 100000 كل مرة. [[incrementAndGet()]] بتعمل القراية والزيادة والكتابة كخطوة واحدة مينفعش حد يدخل في نصها (atomic).

وفي Spring كل request بيشتغل على thread، والـ beans نسخة واحدة مشتركة. فحقل بيتعدّل في bean هو نفس المشكلة دي بالظبط.

---

## الخلاصة

| | من غير static | static |
|---|---|---|
| كام نسخة | واحدة لكل object | واحدة للـ class كله |
| بتتنادى إزاي | [[a.id]] | [[Counter.created]] و [[Counter.full()]] |
| تقرا حقول الـ object؟ | أيوه | لأ، مفيش [[this]] |

- [[static final]] واسم كبير = constant.
- [[final]] = متتعيّنش تاني، مش immutable.
- [[x++]] على حاجة مشتركة بين threads مش آمنة: [[AtomicInteger]].`,
          lines: [
            "class من غير public: ينفع كذا واحد في الملف.",
            R`[[static]]: نسخة واحدة للـ class كله.`,
            R`constant: [[static final]] واسم كبير.`,
            R`حقل [[final]] لكل object، بيتحط في الـ constructor.`,
            "constructor من غير باراميترات.",
            "بيزوّد العداد المشترك.",
            R`أول وآخر مرة الـ [[id]] بيتحط.`,
            "قفلة.",
            R`static method: بتتنادى بـ [[Counter.full()]] ومتقدرش تقرا id.`,
            "قفلة الـ class.",
            "main.",
            "object أول.",
            "object تاني.",
            R`[[1 2 2]]: كل واحد ليه id، والعداد واحد مشترك.`,
            R`[[false]]: ٢ أقل من ٣.`,
            R`[[final]] على متغير object: المرجع ثابت.`,
            "بس الـ object نفسه بيتعدّل عادي.",
            R`[[[still mutable]]].`,
            "قفلة."
          ],
          sol: R`قراية [[id]] جوه [[full()]] بتطلع: [[non-static variable id cannot be referenced from a static context]]. الـ static method ملهاش object، فأنهي id؟

وموضوع الـ threads: لأ، مش مضمون. [[created++]] مش atomic، فمع ١٠٠ thread ممكن يطلع ٩٧ مثلًا، والغلط مش هيبان في التجربة على جهازك غالبًا. الحل: [[static final AtomicInteger created = new AtomicInteger();]] و [[created.incrementAndGet()]]. والأهم في Spring: متخليش الـ beans تحتفظ بحالة بتتغير بين الـ requests أصلًا.`
        },
        {
          cmd: "interfaces",
          title: "تعرّف عقد وكذا class ينفذوه، وتشتغل على العقد مش على الـ class",
          desc: R`الـ [[interface]] في Java عقد: methods من غير تنفيذ، وأي class عايز يلتزم بيه يكتب [[implements]] وينفذ كل الـ methods. والكود اللي بيستخدمه بيشتغل على نوع الـ interface: [[List<Shape>]] فيها circles و squares، وكل واحد بينفذ [[area()]] بطريقته (polymorphism).

وممكن الـ interface يبقى فيه [[default]] method بتنفيذ جاهز، والكلاسات تستخدمها أو تعيد تعريفها. وده بالظبط اللي Spring بيعتمد عليه: [[JpaRepository]] interface وانت مش بتكتب ليه class خالص، و Spring بيعمل التنفيذ.`,
          example: R`interface Shape {
    double area();
    default String describe() { return getClass().getSimpleName() + " " + Math.round(area()); }
}

class Circle implements Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}

class Square implements Shape {
    private final double side;
    Square(double side) { this.side = side; }
    public double area() { return side * side; }
}

void main() {
    List<Shape> shapes = List.of(new Circle(1), new Square(3));
    for (Shape s : shapes) IO.println(s.describe());
}`,
          try: R`اعمل interface اسمه [[PaymentGateway]] فيه [[String charge(long cents)]]، واتنين implementations: [[FakeGateway]] بيرجع [["ok-" + cents]]، و [[FailingGateway]] بيرمي exception. واعمل class [[Checkout]] بياخد [[PaymentGateway]] في الـ constructor. ده بالظبط شكل الـ dependency injection في Spring.`,
          flag: "script",
          deep: {
            why: R`الـ interface بيفصل «إيه المطلوب» عن «إزاي بيتعمل». الـ service بتاعك يعتمد على [[PaymentGateway]] مش على Paymob أو Stripe، فتقدر تغيّر المزود أو تحط fake في التست من غير ما تلمس الـ service. ده حرف D في SOLID (درس SOLID في «تاب الانترفيو»)، وأساس Spring كله.`,
            how: R`الـ methods في الـ interface public و abstract افتراضيًا، فمش محتاج تكتبهم. والـ class اللي بينفذ لازم يكتب [[public]] قبل كل method (لأنه مينفعش يقلل الـ visibility).

الـ class ممكن يعمل implements لأكتر من interface ([[class A implements X, Y]])، بس يورث من class واحد بس. و [[default]] methods اتضافت في Java 8 عشان يقدروا يضيفوا methods لـ interfaces قديمة زي [[List]] من غير ما يكسروا كل الكود.

والـ interface اللي فيه method واحدة abstract اسمه functional interface، وده اللي بيخلي الـ lambdas تشتغل (درس lambdas): [[Shape s = () -> 42;]] مسموحة.

الـ dispatch: لما تنادي [[s.area()]]، الـ JVM بيبص على الـ class الحقيقي للـ object وقت التشغيل ويشغّل الـ method بتاعته (dynamic dispatch).`,
            when: R`بين الطبقات: الـ service بيعتمد على interface لما فيه أكتر من implementation فعلًا (مزودين، أو fake في التست)، أو لما Spring بيولّد التنفيذ (repositories). ومش لازم interface لكل service: [[TaskService]] و [[TaskServiceImpl]] من غير سبب ده تعقيد قديم، و Mockito بيعرف يعمل mock للـ class على طول.`,
            mistakes: R`interface لكل class «عشان الـ best practice» فالمشروع كله ملفات [[Impl]]. و interface ضخم فيه ٢٠ method وكل class بينفذ نصهم ويرمي [[UnsupportedOperationException]] في الباقي (خرق لـ Interface Segregation). ونسيان [[public]] في التنفيذ: [[attempting to assign weaker access privileges]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف عقد اسمه [[Shape]] (أي شكل لازم يعرف يحسب مساحته)، واتنين classes بينفذوه بطريقتين مختلفتين، وبعدين list واحدة فيها الاتنين والكود بيتعامل معاهم كـ Shape من غير ما يعرف هما إيه. اتشغّل بـ [[java Shapes.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الـ interface

~~~java
interface Shape {
    double area();
    default String describe() { return getClass().getSimpleName() + " " + Math.round(area()); }
}
~~~

- [[interface Shape]]: عقد. بيقول «أي حد عايز يبقى Shape لازم يبقى عنده كذا»، ومبيقولش إزاي.
- [[double area();]]: method **من غير جسم**، بتنتهي بـ [[;]] بدل [[{ }]]. اسمها abstract method. وأي method في interface هي [[public]] و [[abstract]] لوحدها، فمش محتاج تكتبهم.
- [[default String describe() {...}]]: [[default]] معناها method **بتنفيذ جاهز** جوه الـ interface. أي class بينفذ Shape بياخدها ببلاش.

نفك [[describe]] من جوه لبرة:

1. [[area()]]: بتنادي الـ abstract method. مين هينفذها؟ الـ object الحقيقي وقت التشغيل (Circle أو Square).
2. [[Math.round(...)]]: بيقرّب لأقرب رقم صحيح. [[Math]] class فيه دوال حسابية كلها static.
3. [[getClass().getSimpleName()]]: اسم الـ class الحقيقي للـ object: [["Circle"]] أو [["Square"]].
4. [[+ " " +]]: لزق النصوص.

---

## ٢. التنفيذ الأول: [[Circle]]

~~~java
class Circle implements Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}
~~~

- [[implements Shape]]: Circle بيوعد إنه ينفذ العقد. ولو نسي method، الـ compiler يرفض. جرّبنا نشيل [[area()]] من Square:

~~~text الناتج
if3/Shapes.java:12: error: Shapes.Square is not abstract and does not override abstract method area() in Shape
~~~

- [[private final double r;]]: نص القطر، بيتحط مرة في الـ constructor.
- [[Math.PI]]: ثابت جاهز (3.141592653589793).
- [[public double area()]]: لازم [[public]]. الـ method في الـ interface public، ومينفعش التنفيذ يبقى أقل منها. جرّبنا نشيل [[public]] من [[area()]] بتاعة Square:

~~~text الناتج
if2/Shapes.java:15: error: area() in Shapes.Square cannot implement area() in Shape
    double area() { return side * side; }
           ^
  attempting to assign weaker access privileges; was public
~~~

«weaker access» = انت بتحاول تخلي الـ method أقل وصولًا من العقد.

---

## ٣. التنفيذ التاني: [[Square]]

~~~java
class Square implements Shape {
    private final double side;
    Square(double side) { this.side = side; }
    public double area() { return side * side; }
}
~~~

نفس العقد، تنفيذ مختلف: الضلع في نفسه. ومفيش [[describe]] هنا ولا في Circle: الاتنين واخدينها من الـ default.

---

## ٤. main: الشغل على العقد

~~~java
void main() {
    List<Shape> shapes = List.of(new Circle(1), new Square(3));
    for (Shape s : shapes) IO.println(s.describe());
}
~~~

~~~text الناتج
Circle 3
Square 9
~~~

- [[List<Shape>]]: list نوع عناصرها الـ interface. ينفع يتحط فيها أي object بينفذ Shape.
- [[for (Shape s : shapes)]]: الكود جوه الـ loop ميعرفش هو بيتعامل مع دايرة ولا مربع.
- [[s.describe()]] بتنادي [[area()]]، والـ JVM بيبص على الـ object الحقيقي ويشغّل نسخته. ده اسمه **dynamic dispatch**، وهو ده الـ **polymorphism**: نفس السطر، سلوك مختلف حسب النوع.
- الأرقام: دايرة نص قطرها 1 مساحتها π = 3.14159، و [[Math.round]] قرّبها لـ 3. مربع ضلعه 3: 9.0 بقت 9.

---

## ٥. الحل: [[PaymentGateway]] و [[Checkout]]

~~~java
interface PaymentGateway { String charge(long cents); }
~~~

العقد: أي بوابة دفع لازم تعرف تسحب مبلغ بالقروش ([[long cents]]) وترجع نص (رقم العملية مثلًا).

~~~java
class FakeGateway implements PaymentGateway {
    public String charge(long cents) { return "ok-" + cents; }
}

class FailingGateway implements PaymentGateway {
    public String charge(long cents) { throw new IllegalStateException("gateway down"); }
}
~~~

تنفيذين: واحد بينجح دايمًا، وواحد بيرمي exception دايمًا. ده بالظبط اللي بتعمله في التستات: تجرّب الحالتين من غير بوابة حقيقية.

~~~java
class Checkout {
    private final PaymentGateway gateway;
    Checkout(PaymentGateway gateway) { this.gateway = gateway; }
~~~

- [[Checkout]] بيشيل حقل نوعه **الـ interface**، مش FakeGateway ولا Paymob.
- وبياخده في الـ constructor من برّه، مش بيعمل [[new]] جواه. ده اسمه **dependency injection**: الـ dependency بتتحقن من برّه.

~~~java
    String pay(long cents) {
        try {
            return "paid: " + gateway.charge(cents);
        } catch (IllegalStateException e) {
            return "failed: " + e.getMessage();
        }
    }
}
~~~

- [[try { ... } catch (IllegalStateException e) { ... }]]: زي try/catch في JS، بس بتحدد **نوع** الـ exception اللي هتمسكه. لو اترمى نوع تاني، مش هيتمسك هنا.
- [[e.getMessage()]]: الرسالة اللي اتبعتت للـ exception: [["gateway down"]].

~~~java
void main() {
    IO.println(new Checkout(new FakeGateway()).pay(5000));
    IO.println(new Checkout(new FailingGateway()).pay(5000));
}
~~~

~~~text الناتج
paid: ok-5000
failed: gateway down
~~~

نفس [[Checkout]] بالظبط، واتصرّف بشكلين حسب الـ gateway اللي اتبعتله. في Spring، [[new Checkout(...)]] ده Spring نفسه هيعمله ويختار الـ implementation (درس الـ DI في المستوى ٢).

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| [[interface]] | عقد: methods من غير تنفيذ |
| [[implements]] | الـ class بيوعد ينفذ العقد، ولازم كل الـ methods و [[public]] |
| [[default]] | method بتنفيذ جاهز جوه الـ interface |
| متغير نوعه interface | يقبل أي class بينفذه، والـ method اللي بتشتغل بتاعة الـ object الحقيقي |

- الـ class ينفذ كذا interface ([[implements A, B]]).
- اشتغل على العقد ([[PaymentGateway]])، وابعت التنفيذ من برّه.`,
          lines: [
            "العقد.",
            R`method من غير جسم: كل واحد لازم ينفذها.`,
            R`[[default]]: تنفيذ جاهز بيستخدم [[area()]] من غير ما يعرف هو شكل إيه.`,
            "قفلة.",
            R`[[implements Shape]]: Circle وعد إنه ينفذ العقد.`,
            "حقل خاص.",
            "constructor.",
            R`التنفيذ، ولازم [[public]].`,
            "قفلة.",
            "class تاني بنفس العقد.",
            "حقل.",
            "constructor.",
            "تنفيذ مختلف لنفس الـ method.",
            "قفلة.",
            "main.",
            R`list نوعها الـ interface وفيها أشكال مختلفة.`,
            R`كل واحد بينفذ [[area]] بتاعته: [[Circle 3]] و [[Square 9]].`,
            "قفلة."
          ],
          sol: R`بيطبع [[paid: ok-5000]] وبعدين [[failed: gateway down]]. [[Checkout]] مبيعرفش ولا بيهمه مين المزود الحقيقي، ده اللي بيتبعتله في الـ constructor. في Spring، [[new Checkout(...)]] ده هيعمله Spring بدالك، وهيختار الـ implementation اللي عليها [[@Component]] (درس الـ DI في المستوى ٢). وفي التست تبعت [[FakeGateway]] أو mock.`,
          solCode: R`interface PaymentGateway { String charge(long cents); }

class FakeGateway implements PaymentGateway {
    public String charge(long cents) { return "ok-" + cents; }
}

class FailingGateway implements PaymentGateway {
    public String charge(long cents) { throw new IllegalStateException("gateway down"); }
}

class Checkout {
    private final PaymentGateway gateway;
    Checkout(PaymentGateway gateway) { this.gateway = gateway; }
    String pay(long cents) {
        try {
            return "paid: " + gateway.charge(cents);
        } catch (IllegalStateException e) {
            return "failed: " + e.getMessage();
        }
    }
}

void main() {
    IO.println(new Checkout(new FakeGateway()).pay(5000));
    IO.println(new Checkout(new FailingGateway()).pay(5000));
}`
        },
        {
          cmd: "extends و abstract",
          title: "class بيورث من class، وإمتى الوراثة فكرة وحشة",
          desc: R`[[extends]] بيخلي الـ class يورث حقول و methods من class أب، ويعيد تعريف اللي عايزه بـ [[@Override]]، ويوصل لنسخة الأب بـ [[super]]. والـ [[abstract class]] أب مينفعش يتعمل منه object، وفيه methods لازم الأبناء ينفذوها، وممكن يبقى فيه حقول وكود مشترك (عكس الـ interface).

القاعدة الحديثة: فضّل الـ interfaces والـ composition (object جواه object تاني) على الوراثة. الوراثة بتربط الابن بتفاصيل الأب، وأي تغيير في الأب ممكن يكسر كل الأبناء.`,
          example: R`abstract class Notifier {
    private final String to;
    protected Notifier(String to) { this.to = to; }
    abstract String channel();
    String send(String msg) { return "[" + channel() + "] " + to + ": " + msg; }
}

class EmailNotifier extends Notifier {
    EmailNotifier(String to) { super(to); }
    @Override String channel() { return "email"; }
}

class SmsNotifier extends Notifier {
    SmsNotifier(String to) { super(to); }
    @Override String channel() { return "sms"; }
    @Override String send(String msg) { return super.send(msg.substring(0, Math.min(10, msg.length()))); }
}

void main() {
    List<Notifier> all = List.of(new EmailNotifier("sara@example.com"), new SmsNotifier("0100"));
    for (Notifier n : all) IO.println(n.send("Your order has shipped"));
}`,
          try: R`جرّب [[new Notifier("x")]]، وجرّب تشيل [[super(to);]] من [[EmailNotifier]]. وبعدين أعد كتابة المثال من غير وراثة: interface [[Channel]] فيه [[String name()]]، و class [[Notifier]] واحد بياخد [[Channel]] في الـ constructor.`,
          flag: "script",
          deep: {
            why: R`هتلاقي الوراثة في كل مكتبة Java قديمة وفي كود الشركات، وهتتسأل عنها في الانترفيو (OOP pillars). وفي Spring هتورث من classes جاهزة زي [[ResponseEntityExceptionHandler]] (درس الأخطاء في المستوى ٢). بس في كودك انت، معرفة إمتى تتجنبها أهم.`,
            how: R`الابن بياخد كل حاجة غير الـ private (هي موجودة بس مش ظاهرة له)، وأول سطر في الـ constructor لازم ينادي constructor الأب بـ [[super(...)]]، ولو مكتبتهوش Java بتحط [[super()]] فاضي، ولو الأب مفيهوش constructor فاضي: خطأ compile.

[[abstract]] method: من غير جسم، والابن لازم ينفذها أو يبقى abstract هو كمان. و [[protected]] يعني الأبناء (والـ package) بس.

الـ override بيتحدد وقت التشغيل: [[send]] في الأب بينادي [[channel()]]، واللي بيتنفذ هو نسخة الابن الحقيقي. ده الـ Template Method pattern.

الفرق عن الـ interface: الـ abstract class فيه state (حقول) و constructor، والـ class بيورث من واحد بس. والـ interface مفيهوش state، والـ class ينفذ كذا واحد.`,
            when: R`abstract class لما فيه كود وحالة مشتركة فعلًا بين أنواع قريبة جدًا (علاقة «is-a» حقيقية). غير كده: interface و composition. و Java حديثة بتقدم [[sealed]] و records لنمذجة الأنواع المحدودة (الدرس الجاي).`,
            mistakes: R`سلسلة وراثة طويلة [[BaseEntity → AuditedEntity → SoftDeletableEntity → User]] ومحدش عارف الـ method دي جاية منين. و [[extends]] عشان تعيد استخدام method واحدة. وتنادي method قابلة للـ override من الـ constructor بتاع الأب: بتتنفذ نسخة الابن قبل ما حقوله تتحط.

في الانترفيو: «abstract class ولا interface؟» interface افتراضيًا، و abstract class لما فيه حالة وكود مشترك. و «ليه Java مفيهاش multiple inheritance للـ classes؟» مشكلة الـ diamond: لو أبين فيهم نفس الـ method، ياخد أنهي؟ (مع default methods في interfaces، لو حصل تعارض لازم تعمل override وتختار).`
          },
          teach: R`## البرنامج بيعمل إيه؟

class أب abstract اسمه [[Notifier]] فيه الكود المشترك لإرسال إشعار، واتنين أبناء (إيميل و SMS) كل واحد بيقول اسم قناته، والـ SMS كمان بيقص الرسالة لـ ١٠ حروف. وبعدين نفس الفكرة من غير وراثة خالص (الحل). اتشغّل بـ [[java Notify.java]] في [[maven:3.9-eclipse-temurin-25]] (JDK 25).

---

## ١. الأب الـ abstract

~~~java
abstract class Notifier {
    private final String to;
    protected Notifier(String to) { this.to = to; }
    abstract String channel();
    String send(String msg) { return "[" + channel() + "] " + to + ": " + msg; }
}
~~~

- [[abstract class]]: class ناقص، **مينفعش** يتعمل منه object. موجود عشان يتورث بس. جرّبنا [[new Notifier("x")]]:

~~~text الناتج
ex2/Notify.java:21: error: Notify.Notifier is abstract; cannot be instantiated
~~~

- [[private final String to;]]: حقل (لمين هيتبعت). الـ interface مينفعش يبقى فيه حقول زي دي، الـ abstract class ينفع.
- [[protected Notifier(String to)]]: constructor. [[protected]] معناها الأبناء (والـ package) بس يقدروا ينادوه. منطقي، لأن محدش تاني هيعمل Notifier أصلًا.
- [[abstract String channel();]]: method من غير جسم. أي ابن **لازم** ينفذها.
- [[send]]: كود مشترك جاهز. بيبني [[[قناة] مستلم: رسالة]]، وبينادي [[channel()]] من غير ما يعرف القناة إيه. اللي هيتنفذ نسخة الابن الحقيقي وقت التشغيل. الشكل ده (الأب كاتب الخطوات والابن بيملا حتة) اسمه **Template Method pattern**.

---

## ٢. الابن الأول: [[EmailNotifier]]

~~~java
class EmailNotifier extends Notifier {
    EmailNotifier(String to) { super(to); }
    @Override String channel() { return "email"; }
}
~~~

- [[extends Notifier]]: EmailNotifier **هو** Notifier، وبياخد كل حاجة فيه ([[send]] جاهزة).
- [[super(to)]]: بينادي constructor الأب ويبعتله [[to]]. لازم يبقى **أول سطر** في constructor الابن، لأن الأب لازم يتجهز الأول.
- ولو مكتبتهوش؟ Java بتحط [[super()]] فاضي لوحدها، والأب مفيهوش constructor فاضي. جرّبنا [[EmailNotifier(String to) { }]]:

~~~text الناتج
ex3/Notify.java:9: error: constructor Notifier in class Notify.Notifier cannot be applied to given types;
    EmailNotifier(String to) { }
                             ^
  required: String
  found:    no arguments
  reason: actual and formal argument lists differ in length
~~~

[[required: String]] = الأب عايز String، و [[found: no arguments]] = اللي اتنادى من غير حاجة (الـ [[super()]] المخفي).

- [[@Override String channel()]]: تنفيذ الـ abstract method. و [[@Override]] ممكن تيجي في نفس السطر عادي.

---

## ٣. الابن التاني: [[SmsNotifier]] بيعيد تعريف [[send]]

~~~java
class SmsNotifier extends Notifier {
    SmsNotifier(String to) { super(to); }
    @Override String channel() { return "sms"; }
    @Override String send(String msg) { return super.send(msg.substring(0, Math.min(10, msg.length()))); }
}
~~~

السطر الأخير طويل، من جوه لبرة:

1. [[msg.length()]]: طول الرسالة. [["Your order has shipped"]] طولها 22.
2. [[Math.min(10, ...)]]: الأصغر بين 10 والطول. ليه؟ لو الرسالة أقصر من 10، [[substring(0, 10)]] هيقع ([[StringIndexOutOfBoundsException]])، فبناخد طولها هي.
3. [[msg.substring(0, 10)]]: الحروف من index 0 لحد 10 (من غير 10): [["Your order"]].
4. [[super.send(...)]]: نادي نسخة **الأب** من send بالرسالة المقصوصة. لو كتبت [[send(...)]] من غير super، هتنادي نفسها تاني وتلف للأبد.

---

## ٤. main

~~~java
void main() {
    List<Notifier> all = List.of(new EmailNotifier("sara@example.com"), new SmsNotifier("0100"));
    for (Notifier n : all) IO.println(n.send("Your order has shipped"));
}
~~~

~~~text الناتج
[email] sara@example.com: Your order has shipped
[sms] 0100: Your order
~~~

- [[List<Notifier>]]: نوعها الأب، وفيها الابنين.
- الإيميل: [[send]] بتاعة الأب، و [[channel()]] رجعت [["email"]].
- الـ SMS: [[send]] بتاعته هو (قص)، وبعدين [[super.send]]، اللي نادت [[channel()]] فرجعت [["sms"]].

---

## ٥. الحل: نفس الفكرة بالـ composition

~~~java
interface Channel { String name(); }
~~~

بدل ما «الإيميل يبقى نوع من Notifier»، نقول «الـ Notifier **عنده** قناة». القناة عقد بـ method واحدة.

~~~java
class Notifier {
    private final String to;
    private final Channel channel;
    Notifier(String to, Channel channel) { this.to = to; this.channel = channel; }
    String send(String msg) { return "[" + channel.name() + "] " + to + ": " + msg; }
}
~~~

- class عادي مش abstract، وحقل [[channel]] نوعه الـ interface.
- [[send]] بتسأل الـ object اللي جواها: [[channel.name()]].

~~~java
void main() {
    Channel email = () -> "email";
    IO.println(new Notifier("sara@example.com", email).send("Your order has shipped"));
}
~~~

~~~text الناتج
[email] sara@example.com: Your order has shipped
~~~

- [[() -> "email"]]: **lambda**، زي [[() => "email"]] في JS بس بسهم [[->]]. ينفع تتحط مكان [[Channel]] لأن Channel فيه method واحدة بس، فالـ lambda بتبقى هي التنفيذ بتاعها (درس lambdas).
- عايز SMS؟ [[() -> "sms"]]. من غير class جديد ولا وراثة. وفي التست تبعت قناة وهمية.
- (الحل بيطبع سطر الإيميل بس. القص بتاع الـ SMS ممكن يبقى method تانية في Channel لو محتاجه.)

---

## الخلاصة

| | abstract class | interface |
|---|---|---|
| حقول (state) | أيوه | لأ |
| constructor | أيوه | لأ |
| class يورث/ينفذ كام واحد | واحد بس ([[extends]]) | كذا واحد ([[implements]]) |
| [[new]] منه مباشرة | لأ | لأ |

- [[super(...)]] أول سطر في constructor الابن، و [[super.method()]] لنسخة الأب.
- [[abstract]] method = الابن لازم ينفذها.
- فضّل الـ composition (object جواه object) على الوراثة، إلا لو فيه علاقة «is-a» حقيقية وكود مشترك فعلًا.`,
          lines: [
            R`[[abstract]]: مينفعش [[new Notifier]].`,
            "حقل خاص بالأب.",
            R`constructor [[protected]]: للأبناء بس.`,
            "method من غير جسم: كل ابن لازم ينفذها.",
            R`كود مشترك بينادي [[channel()]] اللي هيتحدد وقت التشغيل.`,
            "قفلة.",
            R`[[extends]]: EmailNotifier هو Notifier.`,
            R`[[super(to)]] بينادي constructor الأب، ولازم يبقى الأول.`,
            "التنفيذ المطلوب.",
            "قفلة.",
            "ابن تاني.",
            "نفس الكلام.",
            "قناته.",
            R`بيعيد تعريف [[send]] كلها، وبينادي نسخة الأب بـ [[super.send]] بعد ما يقص الرسالة لـ ١٠ حروف.`,
            "قفلة.",
            "main.",
            "list نوعها الأب.",
            R`كل واحد بيتصرف حسب نوعه الحقيقي: [[[email] sara@example.com: Your order has shipped]] و [[[sms] 0100: Your order]].`,
            "قفلة."
          ],
          sol: R`[[new Notifier("x")]]: [[Notifier is abstract; cannot be instantiated]].

من غير [[super(to);]]: Java بتحاول تنادي [[super()]] الفاضي ومش لاقياه: [[constructor Notifier in class Notifier cannot be applied to given types]].

والنسخة بالـ composition تحت: بتطبع نفس سطر الإيميل [[[email] sara@example.com: Your order has shipped]]. [[Notifier]] دلوقتي class واحد، والاختلاف في object بيتبعتله. تقدر تضيف قناة جديدة (WhatsApp) من غير ما تورث، وتقدر تغيّر قناة object وهو شغال، وتختبر [[Notifier]] بـ Channel وهمي. ولاحظ إن [[() -> "email"]] lambda لأن [[Channel]] فيه method واحدة.`,
          solCode: R`interface Channel { String name(); }

class Notifier {
    private final String to;
    private final Channel channel;
    Notifier(String to, Channel channel) { this.to = to; this.channel = channel; }
    String send(String msg) { return "[" + channel.name() + "] " + to + ": " + msg; }
}

void main() {
    Channel email = () -> "email";
    IO.println(new Notifier("sara@example.com", email).send("Your order has shipped"));
}`
        }
      ]
    }
]);
