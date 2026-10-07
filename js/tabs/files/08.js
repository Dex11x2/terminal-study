// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات لغات البرمجة",
      l: 2,
      n: "كل لغة ليها امتداد، وبعضها بيطلّع ملفات تانية وهو بيشتغل (.pyc و .class و .o و .jar). هنا هتعرف كل ملف بيتشغّل بإيه، وإيه اللي بيتعمله commit وإيه لأ",
      items: [
        {
          cmd: ".py و .pyc",
          title: "ملف .py بيتشغّل إزاي، وإيه __pycache__ و .pyc و .ipynb؟",
          desc: R`[[.py]] ملف كود Python، نص عادي. بيتشغّل بالـ interpreter: [[python3 file.py]] على لينكس والماك، و [[python file.py]] أو [[py file.py]] على ويندوز. التفاصيل في تاب Python.

حاجات في الملف نفسه:
• الـ indentation جزء من اللغة: ٤ مسافات هو العُرف، وخلط Tab ومسافات بيطلّع [[TabError]].
• [[#]] تعليق.
• [[#!/usr/bin/env python3]] أول سطر (shebang): يخلي الملف يتشغّل لوحده بـ [[./file.py]] على لينكس والماك بعد [[chmod +x]] (درس [[.sh]]).
• [[if __name__ == "__main__":]]: الكود اللي تحتها بيتنفذ لما تشغّل الملف مباشرة بس، مش لما ملف تاني يعمله [[import]].
• كل ملف [[.py]] هو module: [[from prices import total]] بيدوّر على [[prices.py]] جنبه.

الملفات اللي Python بيعملها لوحده:
• [[__pycache__/]] وجواه [[.pyc]] (زي [[prices.cpython-312.pyc]]): لما تعمل [[import]] لملف، Python بيحوّله لـ bytecode (تعليمات وسيطة) ويحفظه عشان المرة الجاية يبقى أسرع. ده ملف binary، مبتعدّلوش، وبيتمسح ويتعمل تاني عادي، ومكانه [[.gitignore]].
• [[.venv/]] أو [[venv/]]: البيئة الافتراضية فيها المكتبات المتسطّبة. برضه [[.gitignore]].

أخوات:
• [[.ipynb]]: Jupyter Notebook. ده ملف JSON فيه الخلايا (كود وكلام) والنتايج والصور. بيتفتح في Jupyter أو VS Code أو Google Colab.
• [[.pyi]]: ملف أنواع زي [[.d.ts]] في TypeScript.
• [[.pyw]]: على ويندوز بيتشغّل من غير ما يفتح شباك ترمنال (للبرامج اللي ليها واجهة).
• [[.whl]]: مكتبة Python جاهزة للتسطيب (wheel)، وهو في الحقيقة zip.`,
          example: R`cat main.py
python3 main.py
ls __pycache__
file __pycache__/prices.cpython-312.pyc
chmod +x main.py
./main.py`,
          try: R`اعمل [[prices.py]] فيه دالة [[total(items)]] بترجّع [[sum(i["price"] * i["qty"] for i in items)]]، و [[main.py]] أول سطر فيه [[#!/usr/bin/env python3]] وبعدين [[from prices import total]] و [[if __name__ == "__main__":]] وتحتها [[print(total([{"price": 250, "qty": 2}]))]]. نفّذ المثال (رقم الـ [[cpython-312]] هيختلف على حسب نسخة Python عندك). وبعدين في ملف تاني اكتب دالة سطر فيها Tab وسطر فيه مسافات وشغّله.`,
          deep: {
            why: R`Python لغة interpreted: مفيش خطوة compile تطلّع برنامج منفصل، فالملف نفسه هو اللي بيتنقل ويتشغّل. بس تحليل الكود كل مرة بياخد وقت، فالـ [[.pyc]] حل وسط: Python بيحفظ نتيجة التحليل ويستخدمها طول ما الـ [[.py]] متغيرش.`,
            how: R`لما تعمل [[import prices]]، Python بيشوف [[__pycache__/prices.cpython-312.pyc]]: لو وقت تعديل [[prices.py]] وحجمه زي المسجل في الـ pyc، بيحمّل الـ bytecode علطول. لو لأ بيعمل compile تاني. أما الملف اللي بتشغّله مباشرة ([[main.py]]) فمبيتعملوش pyc. و [[file]] بيقرا رأس الـ pyc ويقولك النسخة ووقت الـ py وحجمه.`,
            when: R`سكربتات أتمتة، و APIs بـ FastAPI و Django، وتحليل داتا، والذكاء الاصطناعي. و [[.ipynb]] للتجارب وتحليل الداتا خطوة خطوة.`,
            mistakes: R`تعمل commit لـ [[__pycache__]] و [[.venv]]. تسمّي ملفك باسم مكتبة ([[json.py]] أو [[random.py]] أو [[requests.py]]) فـ [[import json]] يجيب ملفك انت ويطلعلك أخطاء غريبة. تخلط Tab ومسافات ([[TabError: inconsistent use of tabs and spaces in indentation]]). وتعمل commit لـ notebook فيه نتايج كبيرة وصور: امسح الـ outputs الأول.`
          },
          teach: R`## الفكرة

عندنا ملفين: [[prices.py]] فيه دالة، و [[main.py]] بيستخدمها. هنشغّل [[main.py]] ونشوف Python عمل ملف [[.pyc]] لوحده لمين وليه، وبعدين نخلّي [[main.py]] يشتغل لوحده بالـ shebang. اتشغّل على أوبونتو 24.04 في Docker (Python 3.12.3)، وجزء ويندوز في PowerShell بـ Python 3.14.

~~~text prices.py
def total(items):
    return sum(i["price"] * i["qty"] for i in items)
~~~

- [[def]] بتعرّف دالة، و [[:]] في آخر السطر معناها «اللي جاي جسمها»، والجسم **لازم** يبقى مزحوق (indented) لجوه.
- [[sum(... for i in items)]]: لف على كل [[i]] في [[items]]، احسب [[price * qty]]، واجمعهم.

---

## ١. [[cat main.py]]

~~~text الناتج
#!/usr/bin/env python3
from prices import total

if __name__ == "__main__":
    print(total([{"price": 250, "qty": 2}]))
~~~

| السطر | معناه |
|---|---|
| [[#!/usr/bin/env python3]] | الـ shebang. لـ Python هو مجرد تعليق (بيبدأ بـ [[#]])، بس لينكس بيقراه (خطوة ٥) |
| [[from prices import total]] | دوّر على [[prices.py]] جنبي، وهات منه [[total]] |
| [[if __name__ == "__main__":]] | [[__name__]] متغير Python بيحطه لوحده: بيبقى [["__main__"]] لو الملف ده اللي اتشغّل مباشرة، وبيبقى اسم الملف ([["main"]]) لو حد عمله import. فالسطر اللي تحته بيشتغل في الحالة الأولى بس |
| [[print(total([...]))]] | list فيها dict واحد (منتج)، والنتيجة بتتطبع |

## ٢. [[python3 main.py]]

~~~text الناتج
500
~~~

[[python3]] هو الـ interpreter: برنامج بيقرا الملف ويشغّله علطول، من غير خطوة compile منفصلة زي C.

## ٣. [[ls __pycache__]]

~~~text الناتج
prices.cpython-312.pyc
~~~

فولدر [[__pycache__]] اتعمل لوحده، وفيه ملف لـ [[prices.py]] **بس**، مش لـ [[main.py]]. Python بيحفظ نسخة جاهزة (bytecode) للملفات اللي بتتعمل [[import]] بس، عشان المرة الجاية ميحللهاش من الأول. الملف اللي بتشغّله مباشرة بيتحلل كل مرة.

والاسم:

| الحتة | معناها |
|---|---|
| [[prices]] | اسم الملف الأصلي |
| [[cpython]] | الـ interpreter: CPython هو Python العادي (فيه غيره زي PyPy) |
| [[312]] | النسخة 3.12. على ويندوز بـ Python 3.14 طلع [[prices.cpython-314.pyc]] |
| [[.pyc]] | Python compiled |

النسخة في الاسم عشان لو عندك أكتر من Python، كل واحد يعمل ملفه وميبوّظش التاني.

## ٤. [[file __pycache__/prices.cpython-312.pyc]]

[[file]] بيقرا أول bytes في الملف ويقولك نوعه:

~~~text الناتج
__pycache__/prices.cpython-312.pyc: Byte-compiled Python module for CPython 3.12 or newer, timestamp-based, .py timestamp: Wed Oct  7 09:39:18 2026 UTC, .py size: 71 bytes
~~~

- [[Byte-compiled]]: bytecode، يعني binary مش نص. متفتحوش في محرر.
- [[timestamp-based]] و [[.py timestamp]] و [[.py size: 71 bytes]]: Python كاتب في رأس الملف وقت تعديل [[prices.py]] وحجمه. وفعلًا [[wc -c prices.py]] طلّع [[71]]. المرة الجاية لو الرقمين زي ما هما يستخدم الـ pyc، ولو [[prices.py]] اتغيّر يعمله من جديد. عشان كده مسحه آمن تمامًا.

## ٥. [[chmod +x main.py]] ثم [[./main.py]]

قبل [[chmod]] (ملف جديد اتعمل جوه الكونتينر):

~~~text الناتج
-rw-r--r-- 1 root root 34 Oct  7 09:40 main.py
bash: line 1: ./main.py: Permission denied
~~~

[[rw-r--r--]] مفيهاش [[x]] (execute)، فلينكس رفض، والـ exit code كان [[126]] (= لقى الملف بس مش قادر يشغّله). وبعد [[chmod +x main.py]]:

~~~text الناتج
-rwxr-xr-x 1 root root 34 Oct  7 09:40 main.py
500
~~~

[[+x]] ضاف صلاحية التشغيل. ولما كتبنا [[./main.py]]، لينكس شاف [[#!]] في أول الملف فشغّل فعليًا [[/usr/bin/env python3 ./main.py]]. و [[env]] بيدوّر على [[python3]] في الـ PATH بدل ما نكتب مساره. التفاصيل في درس [[.sh]].

## ٦. TabError

ملف فيه سطر مزحوق بـ Tab وسطر بعده بـ ٨ مسافات:

~~~text الناتج
  File "/w/tabs.py", line 3
    return x
TabError: inconsistent use of tabs and spaces in indentation
~~~

المسافات في أول السطر جزء من اللغة في Python، فلازم البلوك كله بنفس الطريقة. خلّي المحرر يحوّل Tab لـ ٤ مسافات.

---

## ٧. على ويندوز

~~~powershell
python main.py
py main.py
~~~

الاتنين طبعوا [[500]] في PowerShell. [[py]] هو Python Launcher بتاع ويندوز (بيختار أحدث نسخة متسطّبة). الـ shebang و [[chmod]] ملهمش لازمة: ويندوز بيعرف يشغّل الملف بالامتداد مش بأول سطر.

| | لينكس والماك | ويندوز |
|---|---|---|
| تشغيل | [[python3 main.py]] | [[python main.py]] أو [[py main.py]] |
| لوحده | [[chmod +x]] ثم [[./main.py]] | مش بالطريقة دي |
| الكاش | [[__pycache__/*.cpython-312.pyc]] | نفسه بنسختك ([[314]]) |

## الخلاصة

- [[.py]] نص بتكتبه، و [[.pyc]] نسخة bytecode Python بيعملها لوحده للملفات اللي بتتعمل import، وبيعيدها لو الأصلي اتغيّر.
- [[__pycache__/]] و [[.venv/]] في [[.gitignore]].
- متسمّيش ملفك باسم مكتبة ([[json.py]]): [[import json]] هيجيب ملفك.`,
          lines: [
            R`الملف فيه shebang و [[import]] و [[if __name__]].`,
            R`التشغيل العادي بالـ interpreter.`,
            R`الـ [[.pyc]] اتعمل لـ [[prices.py]] بس، لأنه اتعمله import.`,
            R`[[file]] بيقول إنه bytecode ولأنهي نسخة Python.`,
            R`صلاحية تشغيل، عشان الـ shebang يشتغل.`,
            R`بيتشغّل لوحده من غير ما تكتب [[python3]].`
          ],
          sol: R`الناتج الحقيقي (Python 3.12):
[[500]]
[[prices.cpython-312.pyc]]
[[__pycache__/prices.cpython-312.pyc: Byte-compiled Python module for CPython 3.12 or newer, timestamp-based, .py timestamp: ..., .py size: 71 bytes]]
[[500]]

وملف فيه Tab ومسافات بيطلّع:
[[TabError: inconsistent use of tabs and spaces in indentation]]

على ويندوز [[./main.py]] مش هيشتغل كده: استخدم [[py main.py]].`
        },
        {
          cmd: ".java و .class و .jar",
          title: "إيه الفرق بين .java و .class و .jar، وفين .kt و .kts؟",
          desc: R`Java بتمشي على خطوتين:
• [[.java]]: الكود اللي بتكتبه (نص).
• [[javac Hello.java]] بيعمل compile ويطلّع [[Hello.class]]: bytecode (binary) مش لمعالج معيّن، لـ JVM (Java Virtual Machine).
• [[java Hello]] بيشغّل الـ JVM اللي بتقرا الـ [[.class]] وتنفذه على أي نظام. ده معنى «اكتب مرة وشغّل في أي حتة».

قواعد الملف:
• الـ class الـ [[public]] لازم اسمها يبقى نفس اسم الملف بالظبط بالحروف الكبيرة: [[public class Hello]] في [[Hello.java]].
• الـ [[package com.gym.api;]] في أول الملف لازم يطابق مكان الملف في الفولدرات: [[src/main/java/com/gym/api/]].

[[.jar]] (Java ARchive): zip فيه ملفات [[.class]] كتير وملف [[META-INF/MANIFEST.MF]] بيقول أنهي class فيها [[main]]. ده اللي بتسلّمه أو بتشغّله على السيرفر: [[java -jar app.jar]]. و Spring Boot بيطلّع jar واحد فيه كل حاجة (fat jar). و [[.war]] نسخة للسيرفرات القديمة زي Tomcat.

Kotlin على نفس الـ JVM:
• [[.kt]]: كود Kotlin. [[kotlinc]] أو Gradle بيحوّلوه لـ [[.class]] برضه، فـ Java و Kotlin بيشتغلوا مع بعض في نفس المشروع. وده اللغة الأساسية في Android (تاب Kotlin).
• [[.kts]]: Kotlin Script، وأشهر استخدام ليه [[build.gradle.kts]] (ملف إعدادات Gradle مكتوب Kotlin، المستوى ده).

ومن Java 11 تقدر تشغّل ملف واحد من غير javac: [[java Hello.java]].

[[build/]] و [[target/]] و [[out/]] و [[*.class]] مكانهم [[.gitignore]].`,
          example: R`cat Hello.java
javac Hello.java
ls
java Hello
file Hello.class
jar cfe hello.jar Hello Hello.class
java -jar hello.jar
unzip -l hello.jar`,
          try: R`اعمل [[Hello.java]] فيه [[public class Hello { public static void main(String[] args) { System.out.println("Hello من Java"); } }]] ونفّذ المثال (محتاج JDK: [[sudo apt install openjdk-21-jdk]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w eclipse-temurin:21-jdk javac Hello.java]]). بعدين اعمل ملف [[Hello2.java]] فيه [[public class Wrong {}]] وجرّب [[javac Hello2.java]].`,
          deep: {
            why: R`زمان كان لازم تعمل compile لكل نظام لوحده (ويندوز ولينكس وماك). Java حلت ده بالـ JVM: البرنامج بيتحول مرة واحدة لـ bytecode، وكل نظام عليه JVM بيشغّله. ونفس الفكرة خلّت Kotlin و Scala يقدروا يستخدموا كل مكتبات Java.`,
            how: R`[[javac]] بيفحص الأنواع ويكتب ملف [[.class]] لكل class. الملف بيبدأ بالـ bytes [[CA FE BA BE]] (اسمها cafe babe، بصمة Java)، وبعدها رقم النسخة (65 يعني Java 21). الـ JVM بتقرا الـ bytecode وتحوّل الأجزاء اللي بتتكرر لكود المعالج الحقيقي وهي شغالة (JIT). والـ [[.jar]] مجرد zip، فـ [[unzip]] بيفتحه.`,
            when: R`Spring Boot و Android وأنظمة الشركات الكبيرة. وعمليًا مش هتكتب [[javac]] بإيدك كتير: Maven أو Gradle بيعملوا كل ده ([[mvn package]] أو [[./gradlew build]]).`,
            mistakes: R`اسم الملف مش زي اسم الـ class ([[class Wrong is public, should be declared in a file named Wrong.java]]). تشغّل [[java Hello.class]] بالامتداد بدل [[java Hello]]. تشغّل jar اتعمل بـ Java 21 على Java 17 فيطلعلك [[UnsupportedClassVersionError]]. وتعمل commit لـ [[.class]] أو [[target/]].`
          },
          teach: R`## الفكرة

المثال بيمشي رحلة Java كاملة: ملف [[.java]] بتكتبه، يتحوّل لـ [[.class]]، يتشغّل، وبعدين يتحط في [[.jar]] ويتشغّل منه. كل النواتج اللي تحت اتشغّلت فعلًا في Docker: [[javac]] و [[java]] و [[jar]] بـ Temurin JDK 21.0.12.1 (نفس الـ JDK اللي في [[eclipse-temurin:21-jdk]]، اتشغّل من الـ image الرسمية [[maven:3.9-eclipse-temurin-21]] اللي مبنية عليها)، و [[file]] و [[xxd]] و [[unzip]] في [[ubuntu:24.04]] على نفس الملفات (الـ image بتاعة Java مفيهاش الأدوات دي).

الملف [[Hello.java]]:

~~~text Hello.java
public class Hello { public static void main(String[] args) { System.out.println("Hello من Java"); } }
~~~

| الحتة | معناها |
|---|---|
| [[public class Hello]] | class اسمها [[Hello]]، و [[public]] = متاحة لأي حد. ولأنها public **لازم** الملف اسمه [[Hello.java]] بالظبط |
| [[public static void main(String[] args)]] | نقطة البداية اللي الـ JVM بتدوّر عليها: [[static]] = من غير ما تعمل object، و [[void]] = مبترجّعش حاجة، و [[String[] args]] = الـ arguments |
| [[System.out.println(...)]] | اطبع سطر |

---

## ١. [[javac Hello.java]]

[[javac]] = Java compiler. بيفحص الكود ويكتب [[Hello.class]]، ولو نجح مبيطبعش حاجة.

## ٢. [[ls]]

~~~text الناتج
Hello.class  Hello.java
~~~

ملف [[.class]] لكل class. ده **bytecode**: تعليمات مش لمعالج Intel ولا ARM، لمعالج «وهمي» اسمه JVM (Java Virtual Machine).

## ٣. [[java Hello]]

~~~text الناتج
Hello من Java
~~~

[[java]] بيشغّل الـ JVM، وبتديله **اسم الـ class** مش اسم الملف. [[java Hello.class]] غلط: هيدوّر على class اسمها [[Hello.class]] ومش هيلاقيها:

~~~text java Hello.class
Error: Could not find or load main class Hello.class
Caused by: java.lang.ClassNotFoundException: Hello.class
~~~

## ٤. [[file Hello.class]]

~~~text الناتج
Hello.class: compiled Java class data, version 65.0
~~~

[[65]] رقم نسخة الصيغة، و 65 = Java 21 (القاعدة: رقم الـ Java + 44). وده مكتوب في أول الملف:

~~~text xxd -l 8 Hello.class
00000000: cafe babe 0000 0041                      .......A
~~~

[[-l 8]] = أول ٨ bytes بس. [[00000000:]] مكانهم في الملف (من البداية)، وعلى اليمين نفس الـ bytes كحروف: اللي مش حرف بيطلع [[.]]، و [[0x41]] بالصدفة هو كود حرف [[A]].

- [[cafe babe]]: أول ٤ bytes في **أي** [[.class]]. اسمها magic number، وبيه [[file]] عرف النوع (درس magic bytes).
- [[0000]]: minor version.
- [[0041]]: major version بالـ hex: ٤×١٦ + ١ = 65.

وده سبب [[UnsupportedClassVersionError]]: JVM نسخة 17 بتفهم لحد 61 بس (17 + 44)، فلو قرت 65 بترفض. شغّلنا نفس [[Hello.class]] على Java 17 ([[eclipse-temurin:17-jre]]، OpenJDK 17.0.20.1):

~~~text java Hello (على Java 17)
Error: LinkageError occurred while loading main class Hello
    java.lang.UnsupportedClassVersionError: Hello has been compiled by a more recent version of the Java Runtime (class file version 65.0), this version of the Java Runtime only recognizes class file versions up to 61.0
~~~

الرسالة بتقولك الرقمين: الملف 65.0 والـ JVM لحد 61.0. والحل: JVM أحدث، أو تعمل compile لنسخة أقدم ([[javac --release 17]]). و [[java -jar hello.jar]] بيطلّع نفس الرسالة بالظبط.

## ٥. [[jar cfe hello.jar Hello Hello.class]]

[[jar]] أداة بتعمل أرشيف. الحروف [[cfe]] options لازقة في بعض (زي [[tar]]):

| الحرف | معناه | قيمته |
|---|---|---|
| [[c]] | create: اعمل أرشيف جديد | |
| [[f]] | file: اسم الأرشيف | [[hello.jar]] |
| [[e]] | entry point: الـ class اللي فيها main | [[Hello]] |

والقيم بعدها بنفس ترتيب الحروف، وفي الآخر الملفات اللي تتحط جوه ([[Hello.class]]).

## ٦. [[java -jar hello.jar]]

~~~text الناتج
Hello من Java
~~~

[[-jar]] = شغّل الأرشيف. الـ JVM بتفتح ملف [[META-INF/MANIFEST.MF]] اللي جوه وتقرا منه سطر [[Main-Class: Hello]] (اللي [[e]] كتبه) وتشغّلها. ده الـ manifest اللي اتعمل فعلًا:

~~~text META-INF/MANIFEST.MF
Manifest-Version: 1.0
Created-By: 21.0.12.1 (Eclipse Adoptium)
Main-Class: Hello
~~~

[[Created-By]] = نسخة الـ JDK اللي عملت الأرشيف. ده نفس اللي بيحصل مع [[java -jar app.jar]] بتاع Spring Boot.

## ٧. [[unzip -l hello.jar]]

الـ jar مجرد zip، فـ [[unzip]] بيفتحه، و [[-l]] (list) بيعرض اللي جواه من غير ما يفكّه:

~~~text الناتج
Archive:  hello.jar
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  2026-10-07 12:12   META-INF/
       86  2026-10-07 12:12   META-INF/MANIFEST.MF
      415  2026-10-07 12:12   Hello.class
---------                     -------
      501                     3 files
~~~

[[Length]] الحجم بالـ bytes قبل الضغط: الـ [[.class]] كله 415 byte، و [[META-INF/]] فولدر (0). والـ jar نفسه على الديسك طلع 742 byte (الضغط بيوفّر، بس الـ zip بيضيف بيانات لكل ملف).

## ٨. لما اسم الملف ميطابقش

~~~text javac Hello2.java (فيه public class Wrong {})
Hello2.java:1: error: class Wrong is public, should be declared in a file named Wrong.java
public class Wrong {}
       ^
1 error
~~~

[[Hello2.java:1]] = الملف والسطر، وتحت السطر نفسه و [[^]] بتشاور على الكلمة الغلط، و [[1 error]] العدد. والرسالة بتقولك الحل بالظبط، ومفيش [[.class]] اتعمل.

---

## ٩. وفين Kotlin؟

[[.kt]] بيتحوّل بـ [[kotlinc]] أو Gradle لـ [[.class]] بنفس الشكل ([[cafe babe]] برضه)، فالـ JVM مش فارق معاها اتكتب بأنهي لغة. و [[.kts]] = Kotlin script، أشهره [[build.gradle.kts]].

## الخلاصة

~~~text
Hello.java  --javac-->  Hello.class  --jar-->  hello.jar
  نص              bytecode (cafe babe)       zip + MANIFEST
                  java Hello                 java -jar hello.jar
~~~

- اسم الـ public class = اسم الملف، و [[java Hello]] من غير [[.class]].
- رقم النسخة في الـ [[.class]] (65 = Java 21) لازم الـ JVM تبقى قدّه أو أحدث.
- [[*.class]] و [[target/]] و [[build/]] في [[.gitignore]]. وعمليًا Maven و Gradle بيعملوا كل ده.`,
          lines: [
            R`الكود: class اسمها [[Hello]] في ملف [[Hello.java]].`,
            R`compile: بيطلّع [[Hello.class]].`,
            R`هتلاقي [[Hello.class]] جنب الـ [[.java]].`,
            R`بيشغّل الـ class (من غير [[.class]] في الآخر).`,
            R`[[file]] بيعرف إنه Java bytecode ونسخته.`,
            R`بيعمل jar: [[c]] create و [[f]] اسم الملف و [[e]] الـ class اللي فيها main.`,
            R`بيشغّل الـ jar كله.`,
            R`الـ jar zip: ده اللي جواه.`
          ],
          sol: R`الناتج الحقيقي (اتشغّل في Docker: Temurin JDK 21.0.12.1 من [[maven:3.9-eclipse-temurin-21]]، و [[file]] و [[unzip]] في [[ubuntu:24.04]]):
[[Hello.class  Hello.java]]
[[Hello من Java]]
[[Hello.class: compiled Java class data, version 65.0]]
[[Hello من Java]]
و [[unzip -l]] بيعرض [[META-INF/]] (0) و [[META-INF/MANIFEST.MF]] (86 byte) و [[Hello.class]] (415 byte)، والمجموع [[3 files]].

و [[javac Hello2.java]]:
[[Hello2.java:1: error: class Wrong is public, should be declared in a file named Wrong.java]]
وتحتها السطر و [[^]] تحت [[class]]، وبعدين [[1 error]].

و [[xxd -l 8 Hello.class]] بيطبع [[00000000: cafe babe 0000 0041                      .......A]]: البصمة، و [[0x41]] = 65 = Java 21.`
        },
        {
          cmd: ".c و .h و .cpp و .o",
          title: "إيه .c و .h و .cpp و .hpp و .o، وإزاي بيبقوا برنامج؟",
          desc: R`C و C++ بيتحولوا لبرنامج بيشتغل على المعالج مباشرة (native)، من غير interpreter ولا JVM. الملفات:

• [[.c]]: كود C. و [[.cpp]] (أو [[.cc]] أو [[.cxx]]): كود C++.
• [[.h]] (header): فيه «التعريفات» بس: أسامي الدوال وأنواعها من غير جسمها، عشان الملفات التانية تعرف إن الدالة موجودة. و [[.hpp]] نفس الفكرة لـ C++.
• [[#include "calc.h"]]: بيلزق محتوى الـ header مكانه حرفيًا. [[" "]] للملفات بتاعتك، و [[< >]] لملفات النظام زي [[<stdio.h>]].
• [[#ifndef CALC_H]] و [[#define]] و [[#endif]] (include guard): عشان الـ header ميتلزقش مرتين.

البناء (build) بيمشي على مرحلتين:
• compile: كل [[.c]] لوحده يتحول لـ [[.o]] (object file، على ويندوز [[.obj]]): كود معالج بس لسه ناقص، لأن [[main.o]] بينادي [[add]] اللي في ملف تاني.
• link: الـ linker بيجمّع كل الـ [[.o]] مع المكتبات ويطلّع البرنامج: ملف من غير امتداد على لينكس والماك، و [[.exe]] على ويندوز.

مكتبات: [[.a]] (static، بتتلزق جوه البرنامج) و [[.so]] (shared على لينكس)، و [[.lib]] و [[.dll]] على ويندوز، و [[.dylib]] على الماك (المستوى ٣).

وملفات البناء: [[Makefile]] (المستوى ده) و [[CMakeLists.txt]] (CMake، الأشهر في C++). والناتج ([[*.o]] و [[build/]] والبرنامج) مكانه [[.gitignore]].`,
          example: R`cat calc.h
gcc -c calc.c
gcc -c main.c
gcc main.o calc.o -o app
./app
file calc.o app
gcc main.c -o app2`,
          try: R`اعمل الـ ٣ ملفات: [[calc.h]] فيه include guard و [[int add(int a, int b);]]، و [[calc.c]] فيه [[#include "calc.h"]] وجسم الدالة، و [[main.c]] فيه [[#include <stdio.h>]] و [[#include "calc.h"]] و [[main]] بتطبع [[add(2, 3)]]. نفّذ المثال (محتاج [[sudo apt install build-essential]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w gcc:14 sh -c 'gcc -c calc.c && gcc -c main.c && gcc main.o calc.o -o app && ./app']]). آخر سطر في المثال هيفشل، اقرا الغلط.`,
          deep: {
            why: R`تقسيم البناء لمرحلتين بيوفّر وقت: في مشروع فيه ١٠٠٠ ملف، لو عدّلت ملف واحد، بتعمل compile ليه هو بس وتعيد الـ link، بدل ما تعيد كل حاجة. والـ header هو «العقد» اللي بيخلي الملفات تعرف بعض من غير ما تشوف الكود.`,
            how: R`أول حاجة الـ preprocessor بينفذ أي سطر بيبدأ بـ [[#]] (يلزق الـ includes ويشيل اللي جوه [[#ifndef]] لو اتعرّف). بعدين الـ compiler يحوّل الناتج لـ assembly ثم [[.o]]، والـ [[.o]] فيه «أنا محتاج دالة اسمها add». الـ linker بيدوّر على [[add]] في باقي الـ [[.o]] والمكتبات، ولو ملقاهاش بيقول [[undefined reference]].`,
            when: R`برامج الأداء العالي، والألعاب، والأنظمة المدمجة، و Qt، ومكتبات Python و Node السريعة (اللي بتتبني لما تعمل install). التفاصيل في تاب C و C++.`,
            mistakes: R`تنسى تضيف [[calc.c]] في أمر البناء ([[undefined reference to 'add']]). تحط جسم دالة في [[.h]] وتعمله include في ملفين ([[multiple definition]]). تنسى الـ include guard. وتعمل commit للـ [[.o]] والبرنامج.`
          },
          teach: R`## الفكرة

٣ ملفات C بيتحوّلوا لبرنامج على خطوتين: كل [[.c]] لوحده يبقى [[.o]]، وبعدين الـ [[.o]] يتجمّعوا في برنامج. وآخر سطر بيوريك إيه اللي بيحصل لو نسيت ملف. كل النواتج اتشغّلت فعلًا في Docker في الـ image الرسمية [[gcc:14]] (GCC 14.4.0 على لينكس x86-64)، و [[file]] و [[nm]] من نفس الـ image.

الملفات:

~~~text calc.h
#ifndef CALC_H
#define CALC_H
int add(int a, int b);
#endif
~~~

~~~text calc.c
#include "calc.h"
int add(int a, int b) { return a + b; }
~~~

~~~text main.c
#include <stdio.h>
#include "calc.h"
int main(void) { printf("%d\n", add(2, 3)); return 0; }
~~~

---

## ١. [[cat calc.h]]: الـ header

| السطر | معناه |
|---|---|
| [[#ifndef CALC_H]] | «لو [[CALC_H]] **مش** متعرّف» (if not defined) كمّل، وإلا اقفز لـ [[#endif]] |
| [[#define CALC_H]] | عرّفه دلوقتي، فالمرة الجاية الشرط اللي فوق يفشل |
| [[int add(int a, int b);]] | **declaration**: «فيه دالة اسمها add بتاخد رقمين وترجّع [[int]]». من غير جسم، و [[;]] في الآخر |
| [[#endif]] | نهاية الشرط |

الـ ٣ سطور اللي بـ [[#]] اسمهم **include guard**: لو ملف عمل include لـ [[calc.h]] مرتين (مباشرة أو عن طريق header تاني) التعريف ميتكررش.

وأي سطر بيبدأ بـ [[#]] ده للـ **preprocessor**: مرحلة قبل الـ compile بتعدّل النص نفسه. [[#include "calc.h"]] حرفيًا بتلزق محتوى الملف مكانها. [[" "]] = دوّر جنبي الأول، و [[< >]] زي [[<stdio.h>]] = ملفات النظام.

## ٢. [[gcc -c calc.c]] و [[gcc -c main.c]]

- [[gcc]] = GNU Compiler Collection.
- [[-c]] = compile بس، من غير link.

الناتج [[calc.o]] و [[main.o]]. الـ [[main.o]] فيه كود معالج حقيقي، بس فيه «خرم»: بينادي [[add]] ومش عارف عنوانها، لأنه شاف الـ declaration بس من [[calc.h]]. والـ compile نجح عادي لأن الـ declaration كفاية للـ compiler.

تقدر تشوف الخرم بعينك بـ [[nm]] (بيعرض الأسامي اللي جوه ملف [[.o]]):

~~~text nm main.o
                 U add
0000000000000000 T main
                 U printf
~~~

[[U]] = undefined: «محتاجها ومش عندي»، و [[T]] = موجودة في جزء الكود ([[.text]]) عند العنوان ده. فـ [[main.o]] عنده [[main]] وناقصه [[add]] و [[printf]]، والـ linker هو اللي هيسدهم.

## ٣. [[gcc main.o calc.o -o app]]

هنا gcc بيشغّل الـ **linker** ([[ld]]): بياخد الـ [[.o]] ويسد الخروم ([[add]] لقاها في [[calc.o]]، و [[printf]] في مكتبة C)، ويكتب برنامج واحد. [[-o app]] (output) = اسم الناتج. من غيره كان هيبقى [[a.out]].

## ٤. [[./app]]

~~~text الناتج
5
~~~

[[./]] لأن الفولدر الحالي مش في الـ PATH (درس [[.sh]]).

## ٥. [[file calc.o app]]

~~~text الناتج
calc.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
app:    ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, not stripped
~~~

| الكلمة | معناها |
|---|---|
| [[ELF]] | صيغة البرامج على لينكس (على ويندوز PE و [[.exe]]، وعلى الماك Mach-O) |
| [[64-bit LSB]] | 64 بت، و LSB = little-endian (البايت الصغير الأول) |
| [[x86-64]] | لمعالج Intel أو AMD. مش هيشتغل على ARM |
| [[relocatable]] | [[.o]]: حتة لسه هتتجمّع، مش بتتشغّل |
| [[executable]] | برنامج جاهز |
| [[dynamically linked]] | بيستخدم مكتبة C الموجودة على الجهاز وقت التشغيل ([[.so]]) بدل ما ينسخها جواه |
| [[interpreter /lib64/ld-linux-x86-64.so.2]] | البرنامج اللي بيحمّل المكتبات دي قبل ما [[app]] يبدأ (الـ dynamic loader) |
| [[for GNU/Linux 3.2.0]] | أقل نسخة kernel لينكس يشتغل عليها |
| [[not stripped]] | لسه فيه أسامي الدوال (مفيدة للـ debugging) |

## ٦. [[gcc main.c -o app2]]: نسينا [[calc.c]]

~~~text الناتج
/usr/bin/ld: /tmp/ccr9uSjY.o: in function $__btmain':
main.c:(.text+0xf): undefined reference to $__btadd'
collect2: error: ld returned 1 exit status
~~~

- الـ compile لـ [[main.c]] **نجح**: gcc عمله [[.o]] مؤقت في [[/tmp]] (اسمه عشوائي، [[ccr9uSjY.o]] هنا، وهيطلع غيره عندك) وبعدين ادّاه للـ linker.
- [[/usr/bin/ld:]] في أول السطر = اللي بيتكلم هو الـ linker، و [[in function $__btmain']] = النداء الناقص جوه [[main]].
- [[undefined reference to $__btadd']]: الـ linker ملقاش جسم [[add]] في أي ملف اتدّاله.
- [[(.text+0xf)]]: [[.text]] جزء الكود في الملف، و [[0xf]] المكان (byte 15 من أول [[main]]) اللي المفروض يتكتب فيه عنوان [[add]] جوه تعليمة النداء ([[call]]).
- [[collect2]] و [[ld returned 1]]: الغلط من الـ linker مش من الـ compiler. لما تشوف [[ld]] دوّر على ملف أو مكتبة ناقصة في أمر البناء، مش على غلط في الكود.

## الخلاصة

~~~text
calc.c --gcc -c--> calc.o ┐
                          ├--link--> app (executable)
main.c --gcc -c--> main.o ┘
~~~

| الامتداد | فيه |
|---|---|
| [[.c]] / [[.cpp]] | الكود (C / C++) |
| [[.h]] / [[.hpp]] | declarations بس + include guard |
| [[.o]] ([[.obj]] على ويندوز) | كود معالج ناقص (relocatable) |
| البرنامج ([[.exe]] على ويندوز) | الناتج بعد الـ link |

- غلط فيه [[ld]] = ملف ناقص في الـ link، و [[.o]] والبرنامج في [[.gitignore]].`,
          lines: [
            R`الـ header: تعريف الدالة بس من غير جسمها، وحواليه include guard.`,
            R`[[-c]] compile بس من غير link: بيطلّع [[calc.o]].`,
            R`نفس الكلام لـ [[main.c]]: [[main.o]].`,
            R`link: بيجمّع الاتنين في برنامج اسمه [[app]] ([[-o]] اسم الناتج).`,
            R`تشغيل البرنامج.`,
            R`[[.o]] اسمه relocatable (ناقص)، و [[app]] executable.`,
            R`من غير [[calc.c]]: الـ compile ينجح والـ link يفشل.`
          ],
          sol: R`الناتج الحقيقي (اتشغّل في Docker: [[gcc:14]]، GCC 14.4.0):
[[5]]
[[calc.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped]]
[[app:    ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, not stripped]]
وآخر أمر:
[[/usr/bin/ld: /tmp/ccr9uSjY.o: in function $__btmain':]] (اسم الملف المؤقت بيتغير كل مرة)
[[main.c:(.text+0xf): undefined reference to $__btadd']]
[[collect2: error: ld returned 1 exit status]]
لاحظ إن الغلط من [[ld]] (الـ linker)، مش من الـ compiler: الكود سليم بس ناقصه ملف.`
        },
        {
          cmd: ".go و go.mod",
          title: "مشروع Go فيه إيه: .go و go.mod و go.sum؟",
          desc: R`Go بيتحول لبرنامج native زي C، بس الأداة [[go]] بتعمل كل حاجة: compile و link وتنزيل المكتبات والـ format والاختبارات. التفاصيل في تاب Go.

الملفات:
• [[.go]]: كود Go. أول سطر لازم [[package name]]، والبرنامج بيبدأ من [[package main]] و [[func main()]]. وكل ملفات الفولدر الواحد لازم تبقى نفس الـ package.
• [[_test.go]]: أي ملف اسمه بيخلص كده ملف اختبارات، [[go test]] بيشغّله والـ build العادي بيتجاهله.
• [[go.mod]]: بيعرّف المشروع (module): اسمه ونسخة Go والمكتبات المطلوبة ونسخها. بيتعمل بـ [[go mod init example.com/gym]]. الصيغة سطور بسيطة:
  [[module example.com/gym]]: اسم المشروع (غالبًا رابط الـ repo).
  [[go 1.25]]: أقل نسخة Go.
  [[require github.com/google/uuid v1.6.0]]: مكتبة ونسختها، و [[// indirect]] يعني مش انت اللي بتستخدمها مباشرة.
• [[go.sum]]: lock file: لكل مكتبة hash بيضمن إن الكود اللي هيتنزل هو هو بالظبط (درس lock files). بيتعمله commit، ومبتعدّلوش بإيدك.

الأوامر: [[go run .]] (يبني ويشغّل)، و [[go build -o app .]] (يطلّع برنامج واحد، وغالبًا static مفيهوش أي اعتماد على حاجة، تنقله على السيرفر وخلاص)، و [[go get pkg@version]] (يضيف مكتبة ويعدّل go.mod و go.sum)، و [[go mod tidy]] (يشيل اللي مش مستخدم ويضيف الناقص).`,
          example: R`go mod init example.com/gym
cat go.mod
go run .
go build -o gym .
file gym
go get github.com/google/uuid@v1.6.0
cat go.sum`,
          try: R`في فولدر فاضي نفّذ أول سطرين، وبعدين اعمل [[main.go]] فيه [[package main]] و [[import "fmt"]] و [[func main() { fmt.Println("Hello من Go") }]] وكمّل المثال. (محتاج Go، أو Docker: [[docker run --rm -v "$PWD":/w -w /w golang:1.25 go run .]].) بعد [[go get]] افتح [[go.mod]] تاني وشوف إيه اللي اتضاف.`,
          deep: {
            why: R`Go اتعمل في Google عشان مشاريع كبيرة تتبني بسرعة وتتنقل بسهولة. عشان كده البرنامج الناتج ملف واحد، وغالبًا static ملوش أي اعتماد (مش محتاج Go على السيرفر؛ ولو بتستخدم [[net]] ابنيه بـ [[CGO_ENABLED=0]] عشان يفضل static)، و [[go.mod]] بيحدد المكتبات بالظبط من غير أداة تانية زي npm.`,
            how: R`[[go build]] بيقرا [[go.mod]]، وينزّل المكتبات (لو مش موجودة) في cache على جهازك، ويتأكد من الـ hash في [[go.sum]]، ويعمل compile لكل الـ packages ويعملهم link في ملف واحد. والـ cache بيخلي المرة التانية سريعة جدًا.`,
            when: R`APIs وأدوات command line وأي حاجة في عالم الـ cloud (Docker و Kubernetes نفسهم مكتوبين Go).`,
            mistakes: R`تنسى [[go mod init]] فيطلعلك [[go: go.mod file not found in current directory or any parent directory; see 'go help modules']]. تعدّل [[go.sum]] بإيدك أو متعملهوش commit. تحط ملفين في نفس الفولدر بـ package مختلفة ([[found packages main (main.go) and utils (u.go) in ...]] وبعد [[in]] مسار الفولدر). وتعمل commit للبرنامج الناتج.`
          },
          teach: R`## الفكرة

المثال بيبني مشروع Go من الصفر: يعرّفه بـ [[go.mod]]، يشغّله، يبنيه برنامج، ويضيف له مكتبة فيظهر [[go.sum]]. كل النواتج اتشغّلت فعلًا في Docker في الـ image الرسمية [[golang:1.25]] (Go 1.25.14 على لينكس x86-64)، و [[file]] في [[ubuntu:24.04]] على نفس البرنامج.

الملف [[main.go]]:

~~~text main.go
package main

import "fmt"

func main() { fmt.Println("Hello من Go") }
~~~

- [[package main]]: كل ملف Go بيبدأ باسم الـ package بتاعته. [[main]] اسم خاص معناه «ده برنامج بيتشغّل» مش مكتبة.
- [[import "fmt"]]: مكتبة الطباعة (format) اللي جاية مع Go.
- [[func main()]]: البرنامج بيبدأ من هنا. [[func]] = دالة.

---

## ١. [[go mod init example.com/gym]]

~~~text الناتج
go: creating new go.mod: module example.com/gym
~~~

- [[mod]] = module، يعني المشروع.
- [[example.com/gym]]: اسم المشروع. غالبًا بيبقى رابط الـ repo ([[github.com/ali/gym]]) عشان يبقى فريد في الدنيا، والـ import جوه المشروع بيبدأ بيه ([[example.com/gym/api]]).

## ٢. [[cat go.mod]]

~~~text الناتج
module example.com/gym

go 1.25.14
~~~

سطرين بس: اسم المشروع، وأقل نسخة Go المشروع محتاجها. [[go mod init]] بيكتب نسخة Go اللي عندك بالظبط (هنا 1.25.14)، فالرقم عندك هيبقى حسب نسختك.

## ٣. [[go run .]]

~~~text الناتج
Hello من Go
~~~

[[.]] = الـ package اللي في الفولدر الحالي (كل ملفات [[.go]] فيه مع بعض). [[go run]] بيبني في فولدر مؤقت ويشغّل ويمسح، مفيش ملف بيفضل.

## ٤. [[go build -o gym .]]

نفس البناء، بس الناتج بيتحفظ: [[-o gym]] (output) = اسمه [[gym]]. على ويندوز اسمه يبقى [[gym.exe]]. ومبيطبعش حاجة لو نجح. حجمه طلع 2254540 byte (حوالي 2.2 MB، والرقم بيختلف شوية من جهاز لجهاز) لبرنامج بيطبع سطر واحد، لأن Go بيحط جواه الـ runtime كله.

## ٥. [[file gym]]

~~~text الناتج
gym: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, BuildID[sha1]=f33cdedf0d4a4f119c59576d7d071fadc33affc5, with debug_info, not stripped
~~~

[[BuildID]] بصمة البناء ده (هتطلع غيرها عندك)، و [[with debug_info, not stripped]] = فيه أسامي الدوال ومعلومات الـ debugging (عشان كده الحجم كبير شوية).

الكلمة المهمة [[statically linked]]: كل حاجة البرنامج محتاجها جواه (قارن بـ [[dynamically linked]] في درس [[.c]]). فتنسخ الملف ده لأي سيرفر لينكس x86-64 ويشتغل، حتى لو مفيش Go عليه.

بس خد بالك: ده مش مضمون دايمًا. جرّبنا برنامج تاني بيعمل [[import "net"]] (وبينادي [[net.LookupHost]]) في نفس الـ image، و [[ldd]] (بيعرض المكتبات اللي برنامج محتاجها) قال:

~~~text ldd n1 (go build عادي)
    linux-vdso.so.1 (0x00007fffd6f46000)
    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x0000764d6fd76000)
    /lib64/ld-linux-x86-64.so.2 (0x0000764d6ff6f000)
~~~

يعني بقى dynamically linked ومحتاج [[libc.so.6]]. السبب: لما يكون فيه C compiler على الجهاز، Go بيشغّل cgo افتراضيًا ([[go env CGO_ENABLED]] طلّع [[1]])، وبعض الـ packages زي [[net]] بتستخدم مكتبة C بتاعة النظام. ولما بنيناه بـ [[CGO_ENABLED=0 go build -o n2 .]]:

~~~text ldd n2
    not a dynamic executable
~~~

رجع static. عشان كده في الـ Dockerfiles هتلاقي [[CGO_ENABLED=0]] كتير قبل [[go build]].

## ٦. [[go get github.com/google/uuid@v1.6.0]]

~~~text الناتج
go: downloading github.com/google/uuid v1.6.0
go: added github.com/google/uuid v1.6.0
~~~

[[downloading]] بيظهر بس أول مرة، بعد كده المكتبة بتبقى في الـ cache.

- [[go get]]: نزّل مكتبة وسجّلها في المشروع.
- [[@v1.6.0]]: النسخة بالظبط. من غيرها بياخد آخر نسخة.

[[go.mod]] بقى فيه سطر جديد:

~~~text go.mod
require github.com/google/uuid v1.6.0 // indirect
~~~

[[// indirect]] تعليق Go بيحطه لأن مفيش ملف في المشروع بيعمل [[import]] للمكتبة دي لسه. لو عملت import وشغّلت [[go mod tidy]] التعليق يختفي، ولو مستخدمتهاش خالص [[go mod tidy]] يشيل السطر كله. جربناها على نفس المشروع: [[go mod tidy]] شال سطر الـ [[require]] وفضّى [[go.sum]] كمان، لأن [[main.go]] مش بيستخدم المكتبة.

## ٧. [[cat go.sum]]

~~~text الناتج
github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=
github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=
~~~

| الحتة | معناها |
|---|---|
| [[github.com/google/uuid v1.6.0]] | المكتبة ونسختها |
| [[/go.mod]] في السطر التاني | الـ hash ده لملف [[go.mod]] بتاع المكتبة بس |
| [[h1:]] | نوع الـ hash (SHA-256) |
| الباقي | الـ hash نفسه بـ Base64 |

لو حد غيّر كود المكتبة على GitHub، الـ hash مش هيطابق و [[go]] هيرفض يبني. عشان كده [[go.sum]] بيتعمله commit ومحدش بيعدّله بإيده.

## الخلاصة

| الملف | بيتعمله commit؟ | بيتعمل بـ |
|---|---|---|
| [[*.go]] | آه | انت |
| [[*_test.go]] | آه | انت، و [[go test]] بيشغّله |
| [[go.mod]] | آه | [[go mod init]] و [[go get]] و [[go mod tidy]] |
| [[go.sum]] | آه | [[go]] لوحده |
| البرنامج ([[gym]]) | لأ | [[go build]] |

- أداة واحدة ([[go]]) بتعمل كل حاجة، والناتج ملف واحد (static، ولو استخدمت [[net]] ابنيه بـ [[CGO_ENABLED=0]]).`,
          lines: [
            R`بيعمل [[go.mod]] باسم المشروع.`,
            R`فيه [[module]] و [[go]] ونسخة.`,
            R`يبني ويشغّل الـ package اللي في الفولدر الحالي.`,
            R`يبني برنامج اسمه [[gym]].`,
            R`برنامج لينكس static: ملوش أي اعتماد.`,
            R`يضيف مكتبة بنسخة محددة.`,
            R`الـ hashes اللي بتضمن الكود.`
          ],
          sol: R`الناتج الحقيقي (اتشغّل في Docker: [[golang:1.25]]، Go 1.25.14، و [[file]] في [[ubuntu:24.04]]):
[[go: creating new go.mod: module example.com/gym]]
[[module example.com/gym]]
[[go 1.25.14]] (رقم نسختك بالظبط)
[[Hello من Go]]
[[gym: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, BuildID[sha1]=..., with debug_info, not stripped]]
[[go: downloading github.com/google/uuid v1.6.0]]
[[go: added github.com/google/uuid v1.6.0]]
و [[go.sum]] فيه سطرين:
[[github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=]]
[[github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=]]
و [[go.mod]] اتضاف فيه [[require github.com/google/uuid v1.6.0 // indirect]] (indirect لأن الكود لسه مش بيعمله import، و [[go mod tidy]] بيشيله ويفضّي [[go.sum]]).`
        },
        {
          cmd: ".php",
          title: "ملف .php فيه إيه، وإزاي PHP و HTML بيبقوا في نفس الملف؟",
          desc: R`[[.php]] ملف بيتنفذ على السيرفر قبل ما يتبعت للمتصفح. والميزة الغريبة فيه: الملف أساسًا HTML، وأي حاجة بين [[<?php]] و [[?>]] كود PHP بيتنفذ ويتحط ناتجه مكانه. المتصفح عمره ما بيشوف كود PHP، بيشوف الناتج بس. التفاصيل في تاب PHP و MySQL.

الرموز:
• [[<?php ... ?>]]: بلوك كود.
• [[<?= $x ?>]]: اختصار لـ [[<?php echo $x; ?>]]، يطبع قيمة جوه الـ HTML.
• [[$]] قبل أي متغير: [[$name]].
• [[;]] في آخر كل جملة، إجباري.
• [[//]] و [[#]] و [[/* */]] تعليقات.
• [[foreach (...):]] و [[endforeach;]]: شكل تاني للـ loops بيتقري أحسن جوه HTML.
• [[htmlspecialchars($x)]]: بيهرّب [[<]] و [[&]] وغيرهم قبل ما تطبع حاجة جاية من اليوزر (وإلا XSS، تاب الأمان).

قاعدة مهمة: الملف اللي كله PHP (من غير HTML)، زي الـ classes والـ config، متقفلوش بـ [[?>]] في الآخر. أي مسافة أو سطر بعد [[?>]] بيتبعت للمتصفح وبيعمل [[headers already sent]]. ونفس المشكلة لو الملف فيه BOM.

بيتشغّل إزاي: [[php file.php]] من الترمنال (يطبع الناتج)، أو [[php -S localhost:8000]] سيرفر للتطوير، أو على السيرفر الحقيقي Nginx أو Apache بيبعتوا الملف لـ PHP-FPM. ولو فتحت [[.php]] بدبل كليك أو السيرفر مش متظبط، هتشوف الكود نفسه أو المتصفح هينزّله كملف، وده تسريب للكود.

وأخوات: [[composer.json]] و [[composer.lock]] (زي package.json)، و [[.blade.php]] (قوالب Laravel)، و [[php.ini]] (درس INI).`,
          example: R`<?php
$name = $_GET["name"] ?? "زائر";
$items = ["تيشيرت" => 250, "مج" => 120];
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<body>
  <h1>أهلًا يا <?= htmlspecialchars($name) ?></h1>
  <ul>
    <?php foreach ($items as $item => $price): ?>
      <li><?= $item ?>: <?= $price ?> جنيه</li>
    <?php endforeach; ?>
  </ul>
</body>
</html>`,
          flag: "script",
          try: R`احفظ المثال في [[index.php]] ونفّذ [[php -l index.php]] (فحص) و [[php index.php]] (الناتج). وبعدين [[php -S localhost:8000]] وافتح [[http://localhost:8000/?name=سارة]] واعمل [[Ctrl+U]] تشوف اللي وصل المتصفح. (Docker: [[docker run --rm -v "$PWD":/w -w /w php:8.3-cli php index.php]].) وجرّب [[?name=<b>hi</b>]] مع وبدون [[htmlspecialchars]].`,
          deep: {
            why: R`PHP اتعمل أصلًا كطريقة تحط حتت ديناميكية جوه صفحات HTML. عشان كده الملف بيبدأ «HTML» وانت بتفتح فيه نوافذ كود. ده خلّى PHP أسهل لغة تعمل بيها موقع ديناميكي، وأغلب الويب (WordPress) لسه عليه.`,
            how: R`السيرفر لما يتطلب منه [[.php]] مش بيبعته، بيدّيه لـ PHP. PHP بيقرا الملف: أي حاجة بره [[<?php ?>]] بتتطبع زي ما هي، واللي جواه بيتنفذ. والناتج النهائي (HTML عادي) هو اللي بيتبعت. عشان كده [[Ctrl+U]] مبيوريكش أي [[<?php]].`,
            when: R`مواقع WordPress و Laravel وأي استضافة مشتركة (shared hosting) لأنها كلها بتدعم PHP جاهز.`,
            mistakes: R`تنسى [[;]] فيطلعلك [[Parse error: syntax error, unexpected end of file]]. تقفل ملف الـ class بـ [[?>]] وبعده سطر فاضي. تطبع داتا اليوزر من غير [[htmlspecialchars]]. وتحط [[.php]] على سيرفر مش متظبط فالكود (بالباسوردات اللي فيه) يتنزّل.`
          },
          teach: R`## الفكرة

الملف ده نصه PHP ونصه HTML. PHP بيمشي عليه من فوق لتحت: الـ HTML بيطلع زي ما هو، وأي حاجة بين [[<?php]] و [[?>]] بتتنفذ وناتجها بيتحط مكانها. كل النواتج اتشغّلت فعلًا في Docker في الـ image الرسمية [[php:8.3-cli]] (PHP 8.3.35)، وصفحة السيرفر اتجابت بـ [[curl]] جوه نفس الكونتينر.

---

## ١. البلوك الأول: كود بس

~~~text الأسطر ١ لـ ٤
<?php
$name = $_GET["name"] ?? "زائر";
$items = ["تيشيرت" => 250, "مج" => 120];
?>
~~~

| الحتة | معناها |
|---|---|
| [[<?php]] | من هنا كود PHP |
| [[$name]] | متغير: في PHP كل متغير بيبدأ بـ [[$]] |
| [[$_GET["name"]]] | array جاهزة فيها اللي بعد [[?]] في الرابط: [[?name=سارة]] يبقى [[$_GET["name"]]] = [["سارة"]] |
| [[??]] | null coalescing: «لو اللي على الشمال مش موجود، خد اللي على اليمين». فلو مفيش [[name]] في الرابط، [[$name]] = [["زائر"]] |
| [[["تيشيرت" => 250, ...]]] | array بمفاتيح (associative): [[=>]] بين المفتاح والقيمة. زي object في JS |
| [[;]] | آخر كل جملة، إجباري |
| [[?>]] | خلص الكود. اللي بعده بيتبعت للمتصفح زي ما هو |

البلوك ده مطبعش حاجة، بس جهّز متغيرين.

## ٢. HTML عادي

[[<!DOCTYPE html>]] و [[<html lang="ar" dir="rtl">]] و [[<body>]]: PHP مبيبصلهمش، بيطبعهم حرف بحرف (درس [[.html]]).

## ٣. [[<?= htmlspecialchars($name) ?>]]

- [[<?=]] اختصار [[<?php echo]]: «اطبع القيمة دي هنا».
- [[htmlspecialchars]]: بتحوّل الرموز الخطيرة لـ entities: [[<]] تبقى [[&lt;]] و [[>]] تبقى [[&gt;]] و [[&]] تبقى [[&amp;]] و [["]] تبقى [[&quot;]].

ليه؟ لأن [[$name]] جاي من الرابط، يعني أي حد يكتب اللي هو عايزه. لو حد بعت [[?name=<b>hi</b>]]:

| | اللي بيوصل المتصفح | بيظهر |
|---|---|---|
| مع [[htmlspecialchars]] | [[&lt;b&gt;hi&lt;/b&gt;]] | النص [[<b>hi</b>]] زي ما هو |
| من غيرها | [[<b>hi</b>]] | hi بخط عريض: اليوزر حط HTML في صفحتك |

والحالة التانية هي نفسها اللي بتسمح بـ [[<script>]]، يعني XSS (تاب الأمان).

## ٤. الـ loop جوه HTML

~~~text الأسطر ١١ لـ ١٣
<?php foreach ($items as $item => $price): ?>
  <li><?= $item ?>: <?= $price ?> جنيه</li>
<?php endforeach; ?>
~~~

- [[foreach ($items as $item => $price)]]: لف على الـ array: كل لفة المفتاح في [[$item]] والقيمة في [[$price]].
- [[:]] بدل [[{]]، و [[endforeach;]] بدل [[}]]: الشكل ده (alternative syntax) معمول مخصوص عشان يتقري وهو متقطّع بين بلوكات PHP.
- السطر اللي في النص HTML عادي، بس بيتكرر مرة لكل منتج، وكل مرة بقيم مختلفة.

## ٥. التشغيل

~~~bash
php -l index.php
php index.php
~~~

- [[-l]] (lint): افحص الـ syntax بس من غير تشغيل:

~~~text الناتج
No syntax errors detected in index.php
~~~

- [[php index.php]]: شغّل واطبع الناتج على الشاشة. اللي بيطلع HTML مفيهوش ولا [[<?php]]:

~~~text الناتج
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<body>
  <h1>أهلًا يا زائر</h1>
  <ul>
          <li>تيشيرت: 250 جنيه</li>
          <li>مج: 120 جنيه</li>
      </ul>
</body>
</html>
~~~

«زائر» لأن من الترمنال مفيش رابط، فـ [[$_GET]] فاضية و [[??]] اشتغلت. ولاحظ ٣ حاجات:

- الناتج بيبدأ بـ [[<!DOCTYPE html>]] على طول من غير سطر فاضي: PHP بياكل الـ newline اللي بعد [[?>]] مباشرة.
- المسافات في أول سطور [[<li>]] بقت 10: الـ 4 مسافات اللي قبل [[<?php foreach]] بتتطبع (هي بره البلوك)، والـ newline اللي بعد [[?>]] بيتاكل، فبتتلزق في الـ 6 مسافات بتوع [[<li>]].
- نفس السبب خلّى [[</ul>]] مزاح 6 مسافات. المتصفح مش فارق معاه المسافات دي، بس ده بيوريك إن PHP بيطبع كل حرف بره البلوكات زي ما هو.

- [[php -S localhost:8000]]: سيرفر تطوير جاهز (S = server). افتح [[http://localhost:8000/?name=سارة]] والعنوان يبقى «أهلًا يا سارة»، و [[Ctrl+U]] هيوريك الـ HTML اللي وصل بس. جبنا الصفحة بـ [[curl]] بالرابطين:

~~~text سطر الـ h1 من الصفحة
?name=سارة          ->    <h1>أهلًا يا سارة</h1>
?name=<b>hi</b>     ->    <h1>أهلًا يا &lt;b&gt;hi&lt;/b&gt;</h1>
~~~

والسيرفر بيطبع في الترمنال سطر لكل طلب، فيه [[GET /?name=%D8%B3%D8%A7%D8%B1%D8%A9]] و [[[200]]]: [[200]] = نجح، والحروف العربي في الرابط متشفّرة (URL encoding).

## ٦. لما تنسى [[;]]

الملف [[bad.php]] سطرين: [[<?php]] وبعده [[echo "hi"]] من غير [[;]].

~~~text php -l bad.php
Parse error: syntax error, unexpected end of file, expecting "," or ";" in bad.php on line 3
Errors parsing bad.php
~~~

و [[php bad.php]] بيطلّع نفس الرسالة بالمسار الكامل ([[in /w/bad.php on line 3]]).

[[Parse error]] = PHP مقدرش يقرا الملف أصلًا، فمفيش ولا سطر اتنفذ. والملف سطرين بس والغلط «on line 3»: رقم السطر بيشاور غالبًا على السطر **اللي بعد** الغلطة (هنا آخر الملف، [[unexpected end of file]])، لأن PHP مكتشفش إن الجملة خلصت غير لما وصل هناك.

## الخلاصة

| الرمز | معناه |
|---|---|
| [[<?php ... ?>]] | بلوك كود |
| [[<?= x ?>]] | اطبع قيمة |
| [[$x]] | متغير |
| [[??]] | قيمة افتراضية |
| [[=>]] | مفتاح وقيمة في array |
| [[foreach (...):]] ... [[endforeach;]] | loop جوه HTML |

- المتصفح عمره ما بيشوف كود PHP، بيشوف الناتج بس.
- أي حاجة جاية من اليوزر تتطبع بـ [[htmlspecialchars]]، والملف اللي كله PHP متقفلوش بـ [[?>]].`,
          lines: [
            R`بداية بلوك PHP.`,
            R`[[$_GET["name"]]] من الرابط، و [[??]] قيمة افتراضية لو مش موجود.`,
            R`array بمفاتيح: [[=>]] بين المفتاح والقيمة.`,
            R`قفل البلوك، واللي بعده HTML بيتبعت زي ما هو.`,
            R`HTML عادي.`,
            R`HTML عادي.`,
            R`HTML عادي.`,
            R`[[<?=]] يطبع القيمة، بعد ما [[htmlspecialchars]] يهرّبها.`,
            R`HTML.`,
            R`[[foreach]] بالشكل اللي بينتهي بـ [[:]]، وكل اللي لحد [[endforeach]] بيتكرر.`,
            R`عنصر بيتكرر لكل منتج، وفيه قيمتين.`,
            R`نهاية الـ loop.`,
            R`HTML.`,
            R`HTML.`,
            R`HTML.`
          ],
          sol: R`اتشغّل في Docker ([[php:8.3-cli]]، PHP 8.3.35):
[[php -l index.php]] ← [[No syntax errors detected in index.php]]
[[php index.php]] بيطبع HTML عادي بيبدأ بـ [[<!DOCTYPE html>]] وفيه [[<h1>أهلًا يا زائر</h1>]] و [[<li>تيشيرت: 250 جنيه</li>]] و [[<li>مج: 120 جنيه</li>]]، ومفيش ولا [[<?php]].

مع [[?name=سارة]] العنوان بيبقى «أهلًا يا سارة». ومع [[?name=<b>hi</b>]] و [[htmlspecialchars]] السيرفر بيبعت [[&lt;b&gt;hi&lt;/b&gt;]] فبيظهر النص [[<b>hi</b>]] زي ما هو، ومن غيرها بيظهر hi بخط عريض: يعني اليوزر قدر يحط HTML في صفحتك (وبنفس الطريقة يحط [[<script>]]).

وملف فيه [[<?php]] و [[echo "hi"]] من غير [[;]]: [[php -l bad.php]] ← [[Parse error: syntax error, unexpected end of file, expecting "," or ";" in bad.php on line 3]] وبعدها [[Errors parsing bad.php]].`
        },
        {
          cmd: ".swift و .dart و .rs و .rb",
          title: "إيه ملفات .swift و .dart و .rs و .rb و .cs، وبتتشغّل بإيه؟",
          desc: R`لغات تانية هتقابلها، كل واحدة بملفها وأداتها:

• [[.swift]]: Swift، لغة تطبيقات iOS والماك. [[swift file.swift]] بيشغّل ملف لوحده، والمشاريع الحقيقية في Xcode ([[.xcodeproj]] و [[.xcworkspace]]، وهي فولدرات مش ملفات) أو Swift Package Manager ([[Package.swift]]). تاب Swift و iOS.
• [[.dart]]: Dart، لغة Flutter. [[dart run file.dart]] أو [[flutter run]]، والمشروع معرّف في [[pubspec.yaml]] (YAML) و [[pubspec.lock]]. تاب Flutter و Dart.
• [[.rs]]: Rust. المشروع بيتعمل بـ [[cargo new app]] وبيتعرّف في [[Cargo.toml]] (TOML) و [[Cargo.lock]]، و [[cargo run]] بيبني ويشغّل، والناتج في [[target/]].
• [[.rb]]: Ruby (و Rails). [[ruby file.rb]]، والمكتبات في [[Gemfile]] و [[Gemfile.lock]]، و [[.erb]] قوالب HTML فيها Ruby زي PHP.
• [[.cs]]: C#، والمشروع في [[.csproj]] (درس [[.csproj]] تحت).
• [[.kt]]: Kotlin (درس [[.java]]).
• [[.lua]] (إعدادات Neovim والألعاب)، و [[.r]] (إحصاء)، و [[.scala]]، و [[.ex]] و [[.exs]] (Elixir).

الفكرة اللي بتتكرر في كل لغة، ولو فهمتها هتعرف أي لغة جديدة بسرعة:
• ملف الكود نفسه (نص).
• ملف بيعرّف المشروع والمكتبات: [[package.json]] و [[pyproject.toml]] و [[go.mod]] و [[Cargo.toml]] و [[pubspec.yaml]] و [[Gemfile]] و [[pom.xml]] و [[.csproj]].
• lock file بالنسخ المضبوطة: بيتعمله commit.
• فولدر ناتج أو مكتبات: [[node_modules/]] و [[target/]] و [[build/]] و [[.dart_tool/]] و [[bin/]] و [[obj/]]: في [[.gitignore]].`,
          example: R`swift hello.swift
dart run hello.dart
cargo new app && cd app && cargo run
ruby hello.rb`,
          try: R`اختار لغة منهم واعمل [[hello]] بيها وشغّله (لو مش متسطّبة، Docker: [[docker run --rm -v "$PWD":/w -w /w swift:6.4 swift hello.swift]] و [[docker run --rm -v "$PWD":/w -w /w dart:stable dart run hello.dart]]). ولو عندك مشروع Flutter أو Rust افتح الفولدر وطلّع فيه الأربع حاجات: ملف الكود، وملف المشروع، والـ lock، وفولدر الناتج.`,
          deep: {
            why: R`كل لغة ليها نظام بناء ومكتبات خاص بيها، بس كلهم وصلوا لنفس الحل: ملف بيوصف المشروع، و lock file، وأداة واحدة بتعمل كل حاجة (cargo و dart و swift و go و npm).`,
            how: R`[[swift file.swift]] و [[dart run]] بيعملوا compile في الذاكرة ويشغّلوا (زي [[go run]]). [[cargo]] بيقرا [[Cargo.toml]] وينزّل المكتبات من crates.io ويبني في [[target/debug/]]. و Ruby زي Python: interpreter بيقرا الملف ويشغّله.`,
            when: R`Swift لـ iOS، و Dart لـ Flutter، و Rust للأدوات السريعة والأنظمة (وأدوات JS كتير زي SWC و Turbopack مكتوبة Rust)، و Ruby لو بتشتغل في مشروع Rails.`,
            mistakes: R`تعمل commit لـ [[target/]] أو [[.dart_tool/]] أو [[build/]]. تنسى الـ lock file. وتفتح [[.xcodeproj]] كأنه ملف: هو فولدر جواه [[project.pbxproj]] (نص)، وده أكتر ملف بيعمل conflicts في Git في مشاريع iOS.`
          },
          teach: R`## الفكرة

الدرس ده مش عن لغة واحدة، عن **نمط** بيتكرر في كل اللغات: ملف كود، وأداة بتشغّله، وملف بيعرّف المشروع، و lock file، وفولدر ناتج. المثال ٤ أوامر، كل واحد بيشغّل hello في لغة. الأربعة اتشغّلوا فعلًا في Docker، كل لغة في الـ image الرسمية بتاعتها: [[swift:latest]] (Swift 6.4)، و [[dart:stable]] (Dart 3.13.5)، و [[rust:1-slim]] (cargo و rustc 1.99.0)، و [[ruby:3.4-slim]] (Ruby 3.4.11).

---

## ١. [[swift hello.swift]]

~~~text hello.swift
print("Hello من Swift")
~~~

~~~text الناتج
Hello من Swift
~~~

[[swift]] لما تدّيله ملف بيعمله compile ويشغّله على طول (زي [[go run]]). ولاحظ: الـ image الـ [[slim]] بتاعة Swift فيها الـ runtime بس من غير compiler، فمحتاج الـ image الكاملة ([[swift:6.4]] أو [[swift:latest]]). Swift مش محتاج [[main]]: أول سطر في الملف هو البداية. على الماك جاي مع Xcode، وفيه نسخ للينكس وويندوز.

## ٢. [[dart run hello.dart]]

~~~text hello.dart
void main() { print("Hello من Dart"); }
~~~

~~~text الناتج
Hello من Dart
~~~

Dart محتاج [[main]] زي Java و Go. [[void]] = مبترجّعش حاجة. و [[dart run]] بيشغّل الملف علطول. في Flutter مش بتشغّل ملف لوحده، بتشغّل المشروع كله بـ [[flutter run]].

## ٣. [[cargo new app && cd app && cargo run]]

ده ٣ أوامر في سطر، و [[&&]] معناها «لو اللي قبلي نجح، شغّلني». فلو [[cargo new]] فشل مش هيدخل الفولدر.

- [[cargo]]: أداة Rust (زي [[go]] و [[npm]] مع بعض).
- [[cargo new app]]: بيعمل فولدر [[app]] ويطبع:

~~~text الناتج
    Creating binary (application) $__btapp$__bt package
note: see more $__btCargo.toml$__bt keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
~~~

[[binary (application)]] = برنامج بيتشغّل (مش مكتبة، المكتبة بـ [[cargo new --lib]]). والفولدر فيه:

~~~text app/
Cargo.toml     تعريف المشروع (TOML): الاسم والنسخة والمكتبات
src/main.rs    fn main() { println!("Hello, world!"); }
.gitignore     فيه /target
.git/          git repo جديد
~~~

و [[Cargo.toml]] اللي اتعمل:

~~~text Cargo.toml
[package]
name = "app"
version = "0.1.0"
edition = "2024"

[dependencies]
~~~

[[edition]] = نسخة قواعد اللغة اللي المشروع ماشي عليها، و [[[dependencies]]] فاضي لسه. والـ [[.git/]] اتعمل حتى والـ image مفيهاش برنامج [[git]] أصلًا: cargo بيعمله بنفسه.

- [[cargo run]]: بيبني ويشغّل:

~~~text الناتج
   Compiling app v0.1.0 (/w/app)
    Finished $__btdev$__bt profile [unoptimized + debuginfo] target(s) in 0.80s
     Running $__bttarget/debug/app$__bt
Hello, world!
~~~

| السطر | معناه |
|---|---|
| [[Compiling app v0.1.0 (/w/app)]] | بيبني المشروع ([[0.1.0]] النسخة اللي في [[Cargo.toml]]، وبين القوسين مكانه: [[/w/app]] جوه الكونتينر) |
| [[dev profile [unoptimized + debuginfo]]] | بناء للتطوير: سريع في البناء، بطيء شوية في التشغيل. [[cargo run --release]] العكس |
| [[Running target/debug/app]] | مكان البرنامج الناتج: فولدر [[target/]]، وده في [[.gitignore]] |

وبعد أول [[cargo run]] ظهر [[Cargo.lock]] جنب [[Cargo.toml]]، حتى من غير ولا مكتبة:

~~~text Cargo.lock
# This file is automatically @generated by Cargo.
# It is not intended for manual editing.
version = 4

[[package]]
name = "app"
version = "0.1.0"
~~~

فيه المشروع نفسه بس دلوقتي، وكل مكتبة تضيفها بتتسجّل فيه بنسختها المضبوطة. وأول سطرين بيقولولك متعدّلوش بإيدك.

## ٤. [[ruby hello.rb]]

[[ruby]] interpreter زي [[python3]]: بيقرا الملف وينفذه. ملف فيه [[puts "Hello من Ruby"]]:

~~~text الناتج
Hello من Ruby
~~~

[[puts]] = put string، زي [[print]] بسطر جديد في الآخر.

---

## الجدول اللي يلخّص كل اللغات

| اللغة | الكود | المشروع | الـ lock | الناتج (في [[.gitignore]]) |
|---|---|---|---|---|
| JavaScript | [[.js]] [[.ts]] | [[package.json]] | [[package-lock.json]] | [[node_modules/]] [[dist/]] |
| Python | [[.py]] | [[pyproject.toml]] | [[uv.lock]] أو [[poetry.lock]] | [[.venv/]] [[__pycache__/]] |
| Go | [[.go]] | [[go.mod]] | [[go.sum]] | البرنامج |
| Rust | [[.rs]] | [[Cargo.toml]] | [[Cargo.lock]] | [[target/]] |
| Dart و Flutter | [[.dart]] | [[pubspec.yaml]] | [[pubspec.lock]] | [[build/]] [[.dart_tool/]] |
| Ruby | [[.rb]] | [[Gemfile]] | [[Gemfile.lock]] | [[vendor/bundle/]] |
| Swift | [[.swift]] | [[Package.swift]] أو [[.xcodeproj]] | [[Package.resolved]] | [[.build/]] |
| Java و Kotlin | [[.java]] [[.kt]] | [[pom.xml]] أو [[build.gradle.kts]] | | [[target/]] [[build/]] |
| C# | [[.cs]] | [[.csproj]] | [[packages.lock.json]] (اختياري) | [[bin/]] [[obj/]] |

## الخلاصة

- لغة جديدة؟ دوّر على الـ ٤ حاجات: ملف الكود، وملف المشروع، والـ lock، وفولدر الناتج.
- ملف المشروع والـ lock بيتعملهم commit، وفولدر الناتج لأ.`,
          lines: [
            R`Swift: يبني ويشغّل ملف واحد.`,
            R`Dart: نفس الكلام.`,
            R`Rust: [[cargo new]] بيعمل مشروع فيه [[Cargo.toml]] و [[src/main.rs]]، و [[cargo run]] يبني ويشغّل.`,
            R`Ruby: interpreter زي Python.`
          ],
          sol: R`[[swift hello.swift]] (الملف فيه [[print("Hello من Swift")]]) بيطبع [[Hello من Swift]]، و [[dart run hello.dart]] (فيه [[void main() { print("Hello من Dart"); }]]) بيطبع [[Hello من Dart]]. و [[cargo run]] في مشروع جديد بيطبع سطور [[Compiling app v0.1.0]] و [[Running $__bttarget/debug/app$__bt]] وبعدين [[Hello, world!]]، وبيظهر [[Cargo.lock]]. و [[ruby hello.rb]] (فيه [[puts "Hello من Ruby"]]) بيطبع [[Hello من Ruby]]. (اتشغّلوا في Docker: Swift 6.4 و Dart 3.13.5 و Rust 1.99.0 و Ruby 3.4.11.)

وفي مشروع Flutter: الكود [[lib/main.dart]]، والمشروع [[pubspec.yaml]]، والـ lock [[pubspec.lock]]، والناتج [[build/]] و [[.dart_tool/]].`
        },
        {
          cmd: ".sql",
          title: "ملف .sql جواه إيه، وبتشغّله على قاعدة البيانات إزاي؟",
          desc: R`[[.sql]] ملف نصي فيه أوامر SQL ورا بعض، كل أمر بيخلص بـ [[;]]. مش برنامج بيتشغّل لوحده: بتدّيه لقاعدة البيانات وهي تنفذه أمر أمر. التفاصيل في تاب SQL و Prisma و PostgreSQL.

هتقابله في ٣ أشكال:
• migration: ملف بيغيّر شكل القاعدة (يعمل جدول أو يضيف عمود)، وغالبًا اسمه فيه رقم أو تاريخ عشان الترتيب: [[001_create_members.sql]] أو [[migrations/20261001_add_phone/migration.sql]] (Prisma). كل الـ migrations بالترتيب بتبني القاعدة من الصفر.
• seed: داتا أولية للتجربة ([[seed.sql]]).
• dump أو backup: ملف بيطلّعه [[pg_dump]] أو [[mysqldump]]، فيه القاعدة كلها كأوامر ([[CREATE TABLE]] و [[INSERT]] أو [[COPY]]). ممكن يبقى حجمه جيجات، ومكانه مش Git.

الرموز:
• [[;]] نهاية كل أمر.
• [[--]] تعليق لحد آخر السطر، و [[/* */]] تعليق بلوك.
• [[' ']] حوالين النصوص، و [[']] جوه النص بتتكتب مرتين: [['O''Brien']].
• [[" "]] في PostgreSQL للأسامي (جداول وأعمدة) مش للنصوص.

بتشغّله إزاي:
• PostgreSQL: [[psql -U user -d db -f file.sql]]، أو [[psql ... < file.sql]].
• MySQL: [[mysql -u user -p db < file.sql]].
• SQLite: [[sqlite3 app.db < file.sql]].
• أو من برامج زي DBeaver و pgAdmin و TablePlus.

مهم: كل قاعدة ليها لهجة (dialect): [[SERIAL]] في PostgreSQL، و [[AUTO_INCREMENT]] في MySQL، و [[AUTOINCREMENT]] في SQLite. فملف [[.sql]] مكتوب لقاعدة غالبًا مش هيشتغل على التانية من غير تعديل.`,
          example: R`-- جدول الأعضاء
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  joined_at DATE DEFAULT CURRENT_DATE
);
INSERT INTO members (name, email) VALUES
  ('سارة', 'sara@example.com'),
  ('O''Brien', 'ob@example.com');
SELECT name, email FROM members ORDER BY id;`,
          flag: "script",
          try: R`احفظ المثال في [[001_create_members.sql]] وشغّله على PostgreSQL في Docker:
[[docker run -d --name pg -e POSTGRES_PASSWORD=pw -v "$PWD":/w postgres:17]]
استنى ثواني وبعدين [[docker exec pg psql -U postgres -v ON_ERROR_STOP=1 -f /w/001_create_members.sql]]. شغّله مرة تانية واقرا الغلط. وبعدين اعمل dump: [[docker exec pg pg_dump -U postgres --table=members --inserts > backup.sql]] وافتح [[backup.sql]]. ولما تخلص: [[docker rm -f pg]].`,
          deep: {
            why: R`تغييرات القاعدة لازم تبقى متسجلة ومتكررة: لو عملت جدول بإيدك في pgAdmin، مفيش حد في التيم ولا السيرفر هيعرف. ملف [[.sql]] في Git (أو migration من Prisma أو Django) بيخلي أي حد يبني نفس القاعدة بالظبط.`,
            how: R`[[psql -f]] بيقرا الملف ويبعت كل أمر لحد [[;]] للسيرفر وينفذه ويطبع النتيجة ([[CREATE TABLE]] و [[INSERT 0 2]]). و [[ON_ERROR_STOP=1]] بيخليه يوقف عند أول غلط بدل ما يكمّل الباقي على قاعدة نصها اتغيّر. والـ dump هو العكس: [[pg_dump]] بيقرا القاعدة ويكتب الأوامر اللي تبنيها تاني.`,
            when: R`migrations و seeds في أي مشروع فيه قاعدة بيانات، و backup قبل أي تغيير كبير على الـ production، ونقل داتا بين سيرفرين.`,
            mistakes: R`تشغّل migration مرتين فيطلعلك [[relation "members" already exists]] (أدوات الـ migrations بتسجل اللي اتنفذ عشان كده). تنسى [[;]] فأمرين يتلزقوا. تحط باسورد أو داتا حقيقية للعملاء في [[seed.sql]] في Git. وترفع dump حجمه جيجا على GitHub (فيه داتا العملاء كمان).`
          },
          teach: R`## الفكرة

ملف [[.sql]] = أوامر SQL ورا بعض، والقاعدة بتنفذها بالترتيب. المثال migration صغيرة: تعمل جدول، تضيف صفين، وتعرضهم. شغّلناه فعلًا على PostgreSQL 16 في Docker (كونتينر باسم خاص واتمسح بعدها)، بنفس أوامر الـ «جرّب».

---

## ١. التعليق: [[-- جدول الأعضاء]]

[[--]] لحد آخر السطر تعليق، القاعدة بتتجاهله. (في SQL مش [[#]] ولا [[//]].)

## ٢. [[CREATE TABLE members ( ... );]]

~~~text
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  joined_at DATE DEFAULT CURRENT_DATE
);
~~~

أمر واحد على ٦ سطور: القاعدة مش فارق معاها السطور، بتقرا لحد ما تلاقي [[;]]. وكل عمود: اسمه، ونوعه، وبعدين شروط:

| العمود | النوع | الشرط | معناه |
|---|---|---|---|
| [[id]] | [[SERIAL]] | [[PRIMARY KEY]] | رقم بيزيد لوحده (1، 2، 3...)، ومفتاح الجدول: مش بيتكرر ومش فاضي |
| [[name]] | [[TEXT]] | [[NOT NULL]] | نص، وإجباري |
| [[email]] | [[TEXT]] | [[UNIQUE]] | نص، وممنوع اتنين بنفس الإيميل |
| [[joined_at]] | [[DATE]] | [[DEFAULT CURRENT_DATE]] | تاريخ، ولو محدش حطه ياخد تاريخ النهارده |

[[SERIAL]] كلمة PostgreSQL بس. في MySQL [[AUTO_INCREMENT]]، وفي SQLite [[INTEGER PRIMARY KEY AUTOINCREMENT]]: ده معنى إن كل قاعدة ليها لهجة.

## ٣. [[INSERT INTO members (name, email) VALUES ...;]]

~~~text
INSERT INTO members (name, email) VALUES
  ('سارة', 'sara@example.com'),
  ('O''Brien', 'ob@example.com');
~~~

- [[(name, email)]]: العواميد اللي هنملاها بس. [[id]] و [[joined_at]] هياخدوا قيمهم لوحدهم.
- كل صف بين [[( )]]، والصفوف مفصولة بـ [[,]]، و [[;]] بعد آخر صف.
- النصوص بين [[' ']] (علامة واحدة). وعشان تكتب [[']] **جوه** نص بتكتبها مرتين: [['O''Brien']] = O'Brien.

## ٤. [[SELECT name, email FROM members ORDER BY id;]]

هات عمودين من الجدول، مترتبين بالـ [[id]].

---

## ٥. التشغيل: [[psql -U postgres -v ON_ERROR_STOP=1 -f /w/001_create_members.sql]]

| الحتة | معناها |
|---|---|
| [[docker exec pg]] | شغّل الأمر اللي بعدي جوه الكونتينر [[pg]] |
| [[psql]] | برنامج PostgreSQL بتاع الترمنال |
| [[-U postgres]] | (user) ادخل باليوزر ده |
| [[-v ON_ERROR_STOP=1]] | (variable) اقف عند أول غلط |
| [[-f /w/...sql]] | (file) نفّذ الملف ده. [[/w]] هو فولدرك اللي ربطناه بـ [[-v "$PWD":/w]] |

~~~text الناتج
CREATE TABLE
INSERT 0 2
  name   |      email
---------+------------------
 سارة    | sara@example.com
 O'Brien | ob@example.com
(2 rows)
~~~

- [[CREATE TABLE]]: الأمر الأول نجح.
- [[INSERT 0 2]]: الرقم التاني (2) عدد الصفوف اللي اتضافت. الأول (0) من زمان ودايمًا صفر.
- الجدول: ناتج الـ [[SELECT]]، ولاحظ [[O'Brien]] اتخزنت بعلامة واحدة.

## ٦. شغّلناه مرة تانية

~~~text الناتج
psql:/w/001_create_members.sql:7: ERROR:  relation "members" already exists
~~~

- [[:7:]]: الغلط في الأمر اللي بيخلص في السطر 7 (الـ [[CREATE TABLE]]).
- [[relation]] = جدول (في كلام PostgreSQL).
- بسبب [[ON_ERROR_STOP=1]] [[psql]] وقف هنا: الـ [[INSERT]] والـ [[SELECT]] متنفذوش، والـ exit code كان [[3]]. من غير الخيار ده [[psql]] بيطبع الغلط ويكمّل الأوامر اللي بعده، وفي migration حقيقية ده معناه إن نصها يتنفذ ونصها لأ.

عشان كده أدوات الـ migrations (Prisma و Django وغيرهم) بتسجّل الملفات اللي اتنفذت في جدول خاص، وبتشغّل الجديد بس.

## ٧. الـ dump: [[pg_dump -U postgres --table=members --inserts > backup.sql]]

- [[pg_dump]]: بيقرا القاعدة ويكتبها أوامر SQL.
- [[--table=members]]: الجدول ده بس.
- [[--inserts]]: الداتا تتكتب [[INSERT]] (من غيرها بتتكتب [[COPY]]، أسرع بس أصعب في القراية).
- [[> backup.sql]]: الناتج في ملف على جهازك (الـ [[>]] بتاع الـ shell بتاعك، مش جوه الكونتينر).

أهم اللي جوه الملف (من غير التعليقات):

~~~text backup.sql (مختصر)
SET client_encoding = 'UTF8';
...
CREATE TABLE public.members (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    joined_at date DEFAULT CURRENT_DATE
);
CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
...
ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);
INSERT INTO public.members VALUES (1, 'سارة', 'sara@example.com', '2026-10-07');
INSERT INTO public.members VALUES (2, 'O''Brien', 'ob@example.com', '2026-10-07');
SELECT pg_catalog.setval('public.members_id_seq', 2, true);
ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);
~~~

حاجات تتعلمها من الملف ده:
- [[SERIAL]] مش نوع حقيقي: PostgreSQL حوّله لـ [[integer]] + [[SEQUENCE]] (عدّاد) + [[DEFAULT nextval(...)]].
- [[setval(..., 2, true)]]: العدّاد بيتظبط على 2، فأول صف جديد ياخد 3.
- الـ [[PRIMARY KEY]] و [[UNIQUE]] اتضافوا في **الآخر** بعد الداتا، لأن ده أسرع في الملفات الكبيرة.
- [[public.]] اسم الـ schema الافتراضي.
- في أول الملف وآخره سطرين [[\restrict ...]] و [[\unrestrict ...]]: نسخ [[pg_dump]] الحديثة بتحطهم كحماية لما الملف يتشغّل بـ [[psql]]، و [[psql]] بيفهمهم لوحده.

## الخلاصة

| الرمز | معناه |
|---|---|
| [[;]] | نهاية الأمر (مش نهاية السطر) |
| [[--]] و [[/* */]] | تعليق |
| [['نص']] و [['O''Brien']] | نص، و [[']] جواه مرتين |
| [[psql -v ON_ERROR_STOP=1 -f]] | نفّذ ملف واقف عند أول غلط |
| [[pg_dump --inserts]] | القاعدة ← ملف [[.sql]] |

- الـ migration بتتنفذ مرة واحدة بس، والـ dump فيه داتا حقيقية فمكانه مش Git.`,
          lines: [
            R`تعليق [[--]] (بيتحسب سطر هنا لأنه SQL): بيتجاهل لحد آخر السطر.`,
            R`بداية أمر عمل جدول.`,
            R`[[SERIAL]] رقم بيزيد لوحده (لهجة PostgreSQL)، و [[PRIMARY KEY]] المفتاح.`,
            R`[[NOT NULL]]: إجباري.`,
            R`[[UNIQUE]]: ممنوع يتكرر.`,
            R`قيمة افتراضية: تاريخ النهارده.`,
            R`[[;]] نهاية الأمر الأول.`,
            R`أمر إضافة صفوف.`,
            R`النصوص بين [[' ']].`,
            R`[['']] جوه النص يعني [[']] واحدة، و [[;]] نهاية الأمر.`,
            R`استعلام يطبع اللي اتضاف.`
          ],
          sol: R`أول تشغيل:
[[CREATE TABLE]]
[[INSERT 0 2]]
وبعدين جدول فيه [[سارة | sara@example.com]] و [[O'Brien | ob@example.com]] و [[(2 rows)]].

تاني تشغيل (مع [[ON_ERROR_STOP=1]]):
[[psql:/w/001_create_members.sql:7: ERROR:  relation "members" already exists]]
ومبيكملش.

[[backup.sql]] فيه سطور [[SET ...]] في الأول، وبعدين [[CREATE TABLE public.members (...)]] و [[CREATE SEQUENCE]]، وبعدين [[INSERT INTO public.members VALUES (1, 'سارة', ...)]]. ولما تنقله لقاعدة فاضية وتشغّله بـ [[psql -f]] الجدول يرجع بالداتا.`
        }
      ]
    }
]);
