// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
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
    }
]);
