// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("pyapi", {
  label: "Python و FastAPI",
  prompt: "$ ",
  lab: R`python3 -m venv .venv && source .venv/bin/activate
pip install "fastapi[standard]"
fastapi dev main.py`,
  labText: "تاب Python بيغطي venv و pip و pytest؛ هنا اللغة نفسها وبناء API. fastapi dev بيفتح docs تفاعلية على /docs.",
  levels: {"1":["اللغة","الأنواع، و if و for و match، و lists و dicts، والدوال، والـ classes، والمكتبة الأساسية، والسكربتات"],"2":["FastAPI","routes و pydantic و dependencies و errors و async"],"3":["الإنتاج والانترفيو","قاعدة بيانات، و background tasks، و httpx، والأداء، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "الأسماء والأنواع",
      l: 1,
      n: "المتغير اسم بيشاور على object، والنوع بتاع القيمة مش الاسم، والـ type hints للأدوات مش للتشغيل",
      items: [
        {
          cmd: "مقدمة بايثون والـ print",
          title: "تشغّل أول كود Python إزاي، وتطبع بـ print وتعرّف متغيرات بأنواعها؟",
          desc: R`[[Python]] لغة كتابتها قريبة من الإنجليزي ومفيهاش رموز كتير، وبتستخدم في الـ backend (زي FastAPI و Django)، والـ AI وتحليل البيانات، والسكربتات اللي بتأتمت شغل متكرر. في التاب ده هنستخدمها لحد ما نوصل لـ API كامل بـ FastAPI.

بتشغّلها بطريقتين:
• REPL: اكتب [[python3]] في الترمنال (أو [[python]] أو [[py]] على ويندوز) هيظهرلك [[>>>]]، تكتب سطر وتشوف نتيجته على طول. [[exit()]] للخروج.
• ملف: تكتب الكود في [[hello.py]] وتشغّله بـ [[python3 hello.py]].

[[print(...)]] بتطبع اللي بين القوسين. ولو بعتلها كذا قيمة مفصولين بـ [[,]] بتطبعهم في سطر واحد وبينهم مسافة.

المتغير: الاسم وبعده [[=]] وبعده القيمة، من غير أي كلمة قبله (مفيش let ولا var). والأنواع الأساسية:
• [[str]] نص بين علامتين تنصيص: [["Ali"]] أو [['Ali']].
• [[int]] رقم صحيح: [[150]].
• [[float]] رقم بكسور: [[4.95]].
• [[bool]] قيمتين بس: [[True]] و [[False]]، بأول حرف كبير.
و [[type(x)]] بتقولك نوع أي قيمة.

العمليات: [[+]] و [[-]] و [[*]] عادي، و [[/]] قسمة بتطلّع float دايمًا، و [[//]] قسمة بترمي الكسر، و [[%]] باقي القسمة.

و [[#]] أول السطر تعليق، Python بيتجاهله.

الدرس الجاي («names و objects») بيشرح المتغير في Python بيشاور على القيمة إزاي، ودرس «f-strings» بيوريك أسهل طريقة تحط متغير جوه نص.`,
          example: R`# أول سطر Python
print("Hello, Python!")

# متغيرات: الاسم = القيمة
course_title = "FastAPI Basics"
students = 150
rating = 4.95
is_published = True

# print بتاخد كذا قيمة وتحط بينهم مسافة
print("Course:", course_title)
print("Seats after adding 50:", students + 50)
print(type(students), type(rating), type(is_published))
print(7 / 2, 7 // 2, 7 % 2)`,
          try: R`اكتب [[python3]] في الترمنال (على ويندوز [[python]] أو [[py]]) وانسخ سطور المثال سطر سطر. بعدين جرّب: [[price = 200]] و [[discount = 30]] و [[print(price - discount)]]. وجرّب غلطتين واقرا الرسالة: [[is_open = true]] بحرف صغير، و [[print("Total: " + 5)]]. واخرج بـ [[exit()]].`,
          flag: "script",
          deep: {
            why: R`Python بتشغّل السطر وتوريك نتيجته على طول، فتقدر تتعلم بالتجربة من غير خطوة build. وكل اللي هتعمله بعد كده في التاب (الـ dicts والدوال والـ classes و FastAPI) مبني على نفس المتغيرات والأنواع دي.`,
            how: R`لما تشغّل ملف، Python (النسخة العادية اسمها CPython) بيحوّل الكود لـ bytecode وبعدين ينفّذه سطر سطر. لو فيه غلطة كتابة في أي حتة، مش هيشغّل حاجة خالص. لكن الغلطات زي [[NameError]] و [[TypeError]] بتظهر بس لما السطر بتاعها يتنفذ.

النوع بيتحدد من القيمة نفسها مش من الاسم: [[students = 150]] تبقى int، ولو كتبت بعدها [[students = "many"]] نفس الاسم بقى بيشاور على str. بس Python مش هتحوّل الأنواع من نفسها في العمليات: [["Total: " + 5]] بترفضها بدل ما تخمّن قصدك (عكس JavaScript).`,
            when: "أول حاجة في التاب. وكل ما تحب تجرّب سطر بسرعة (حساب، أو method على نص، أو شكل dict) افتح REPL بدل ما تعمل ملف.",
            mistakes: R`تكتب [[true]] بحرف صغير زي JavaScript فيطلعلك [[NameError]]. تجمع نص على رقم بـ [[+]] فيطلعلك [[TypeError]]: حوّل الرقم بـ [[str(5)]] أو استخدم f-string. وتحط مسافات في أول السطر من غير سبب: في Python المسافة في أول السطر ليها معنى (indentation)، فبيطلعلك [[IndentationError: unexpected indent]].`
          },
          teach: R`## المثال بيعمل إيه؟

بيطبع سطر ترحيب، وبيعمل ٤ متغيرات من ٤ أنواع مختلفة، وبعدين يطبعهم ويحسب بيهم. كل سطر هنا هتشوفه في أي كود Python بعد كده، فهنمشي عليه سطر سطر.

المثال كله اتشغّل كملف على ويندوز 11 بـ Python 3.14.3، وعلى لينكس جوه Docker بصورة [[python:3.13-slim]] (Python 3.13)، والناتج طلع هو هو.

---

## ١. تشغّل الكود فين؟

### الـ REPL: سطر سطر

اكتب في الترمنال:

| النظام | الأمر |
|---|---|
| لينكس والماك | [[python3]] |
| ويندوز | [[python]] أو [[py]] |

هيظهرلك [[>>>]]، ودي معناها «Python مستني منك سطر». REPL اختصار Read-Eval-Print Loop: بيقرا السطر، ويقيّمه (eval)، ويطبع النتيجة، ويرجع يستنى. وفي الـ REPL مش محتاج [[print]] عشان تشوف قيمة: اكتب [[7 / 2]] لوحدها هيطبع [[3.5]]. تخرج بـ [[exit()]].

### ملف: [[hello.py]]

تحط السطور في ملف امتداده [[.py]] وتشغّله بـ [[python3 hello.py]] (أو [[py hello.py]] على ويندوز). هنا Python بينفّذ الملف من أول سطر لآخره، ومش بيطبع غير اللي انت قلتله [[print]].

---

## ٢. [[# أول سطر Python]]

أي حاجة بعد [[#]] لحد آخر السطر **تعليق** (comment): Python بيتجاهله، ومكتوب للي بيقرا الكود بس. عشان كده التعليقات العربي في المثال مش بتعمل مشكلة.

---

## ٣. [[print("Hello, Python!")]]

~~~python
print("Hello, Python!")
~~~

| الحتة | معناها |
|---|---|
| [[print]] | اسم دالة (function) جاهزة في Python بتكتب على الشاشة |
| [[( )]] | القوسين بعد اسم الدالة معناهم «نادي الدالة دي»، واللي جواهم بيتبعتلها |
| [["Hello, Python!"]] | نص (string)، والعلامتين [["]] بيقولوا لـ Python «ده كلام، مش كود» |

~~~text الناتج
Hello, Python!
~~~

العلامتين نفسهم مش بيتطبعوا، هما بس بيحددوا النص بيبدأ وبيخلص فين. و [['Hello']] بعلامة واحدة نفس الحاجة بالظبط.

---

## ٤. المتغيرات: [[الاسم = القيمة]]

~~~python
course_title = "FastAPI Basics"
students = 150
rating = 4.95
is_published = True
~~~

[[=]] هنا مش «يساوي» بتاعة الرياضة، معناها **«خلّي الاسم ده يشاور على القيمة دي»** (assignment). ومفيش كلمة قبل الاسم زي [[let]] أو [[var]] في JavaScript: أول ما تكتب [[students = 150]] المتغير اتعمل.

والأسماء بالحروف الصغيرة والكلمات بينها [[_]] ([[course_title]])، ودي اسمها snake_case وهي العادة في Python.

### النوع بيتعرف من القيمة

| السطر | النوع | ليه |
|---|---|---|
| [[course_title = "FastAPI Basics"]] | [[str]] (string) | بين علامتين تنصيص |
| [[students = 150]] | [[int]] (integer) | رقم صحيح من غير علامة عشرية |
| [[rating = 4.95]] | [[float]] (floating point) | فيه علامة عشرية |
| [[is_published = True]] | [[bool]] (boolean) | [[True]] أو [[False]] بس |

ومش بتكتب النوع بإيدك: Python بيعرفه من شكل القيمة. و [[True]] لازم بأول حرف كبير. لو كتبتها [[true]] زي JavaScript، Python هيفتكرها اسم متغير مش موجود (جرّبناها في الـ REPL على ويندوز):

~~~text الناتج
>>> is_open = true
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    is_open = true
              ^^^^
NameError: name 'true' is not defined. Did you mean: 'True'?
~~~

اقرا الـ error من **آخر سطر**: نوعه [[NameError]] (اسم مش معروف)، والسبب، وكمان اقتراح. و [[<stdin>]] معناها إن الكود جه من الكيبورد (standard input) مش من ملف.

---

## ٥. [[print]] بكذا قيمة

~~~python
print("Course:", course_title)
print("Seats after adding 50:", students + 50)
~~~

لما تبعت لـ [[print]] كذا حاجة مفصولة بـ [[,]]، بتطبعهم في سطر واحد وبتحط **مسافة** بين كل اتنين لوحدها. فمش محتاج تكتب مسافة في آخر [["Course:"]].

وفي السطر التاني [[students + 50]] بيتحسب **الأول** (150 + 50 = 200)، والنتيجة هي اللي بتتبعت لـ [[print]]:

~~~text الناتج
Course: FastAPI Basics
Seats after adding 50: 200
~~~

وليه مكتبناش [["Seats: " + students]]؟ لأن [[+]] بين نص ورقم ممنوع في Python:

~~~text الناتج
>>> print("Total: " + 5)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    print("Total: " + 5)
          ~~~~~~~~~~^~~
TypeError: can only concatenate str (not "int") to str
~~~

يعني «أقدر ألزق (concatenate) str في str بس، مش int». Python مش بيخمّن قصدك زي JavaScript. الحل: [[print("Total:", 5)]] بالفاصلة، أو [[str(5)]] تحوّل الرقم لنص الأول.

---

## ٦. [[type()]]

~~~python
print(type(students), type(rating), type(is_published))
~~~

[[type(x)]] بترجع نوع القيمة اللي الاسم بيشاور عليها:

~~~text الناتج
<class 'int'> <class 'float'> <class 'bool'>
~~~

كلمة [[class]] معناها «نوع». كل نوع في Python عبارة عن class، وهتفهمها في قسم الـ Classes.

---

## ٧. القسمة التلاتة: [[/]] و [[//]] و [[%]]

~~~python
print(7 / 2, 7 // 2, 7 % 2)
~~~

~~~text الناتج
3.5 3 1
~~~

| الرمز | اسمه | 7 و 2 | ملاحظة |
|---|---|---|---|
| [[/]] | قسمة عادية | [[3.5]] | دايمًا float، حتى [[10 / 5]] بتطلع [[2.0]] |
| [[//]] | floor division | [[3]] | بترمي الكسر (بتقرّب لتحت) |
| [[%]] | modulo | [[1]] | باقي القسمة: 7 = 2×3 + **1** |

وخد بالك من السالب: «لتحت» يعني ناحية السالب، فـ [[-7 // 2]] بتطلع [[-4]] مش [[-3]]، و [[-7 % 2]] بتطلع [[1]] (جرّبناهم في الـ REPL). و [[%]] بتستخدم كتير عشان تعرف الرقم زوجي ولا لأ: [[n % 2 == 0]].

---

## اللي في «جرّب»: [[price - discount]]

~~~text الناتج (REPL على ويندوز)
>>> price = 200
>>> discount = 30
>>> print(price - discount)
170
~~~

## الخلاصة

| عايز | تكتب |
|---|---|
| تطبع | [[print(a, b)]]: مسافة بينهم لوحدها |
| متغير | [[name = value]] من غير let ولا var |
| تعرف النوع | [[type(x)]] |
| قسمة بكسور / من غير كسر / الباقي | [[/]] و [[//]] و [[%]] |

- [[True]] و [[False]] بأول حرف كبير.
- نص + رقم بـ [[+]] = [[TypeError]]: استخدم الفاصلة أو [[str()]] أو f-string.
- الـ error بيتقري من آخر سطر.`,
          lines: [
            R`اطبع النص.`,
            R`متغير [[str]].`,
            R`متغير [[int]].`,
            R`متغير [[float]].`,
            R`متغير [[bool]]: [[True]] بحرف كبير.`,
            R`[[print]] بقيمتين: بتحط بينهم مسافة لوحدها.`,
            R`الحساب بيحصل الأول (150 + 50) وبعدين بيتطبع.`,
            R`[[type()]] بترجّع نوع كل قيمة.`,
            R`قسمة عادية، وقسمة من غير كسر، وباقي القسمة.`
          ],
          sol: R`ناتج المثال:
[[Hello, Python!]]
[[Course: FastAPI Basics]]
[[Seats after adding 50: 200]]
[[<class 'int'> <class 'float'> <class 'bool'>]]
[[3.5 3 1]]

[[print(price - discount)]] بتطبع [[170]].

[[is_open = true]]: [[NameError: name 'true' is not defined. Did you mean: 'True'?]] (الاقتراح ده بيظهر في Python 3.10 وأحدث).
[[print("Total: " + 5)]]: [[TypeError: can only concatenate str (not "int") to str]]. الصح [[print("Total: " + str(5))]] أو [[print("Total:", 5)]].`
        },
        {
          cmd: "names و objects",
          title: "المتغير في Python علبة ولا لافتة؟",
          desc: R`المتغير في Python مش علبة جواها قيمة، هو اسم (لافتة) بيشاور على object. [[a = [1, 2]]] وبعدين [[b = a]] معناها إن الاسمين بيشاوروا على نفس الـ list، فأي تعديل من [[b]] بيبان في [[a]].

[[==]] بيسأل «القيمتين زي بعض؟»، و [[is]] بيسأل «دول نفس الـ object؟». والقاعدة: [[is]] مع [[None]] بس ([[x is None]])، و [[==]] لأي مقارنة تانية.

والنوع بتاع القيمة مش الاسم: نفس الاسم ممكن يشاور على int وبعدين على str (dynamic typing)، بس Python مش هيجمع int على str من نفسه (strong typing).`,
          example: R`a = [1, 2, 3]
b = a
b.append(4)
print(a)               # [1, 2, 3, 4]
c = a.copy()
print(a == c, a is c)  # True False
c.append(5)
print(a)               # [1, 2, 3, 4]، النسخة اتعدّلت لوحدها
x = None
if x is None:
    print("مفيش قيمة")
n = 5
n = "five"
"5" + 5  # TypeError: can only concatenate str (not "int") to str`,
          try: R`افتح [[python3]] في الترمنال (الـ REPL) وجرّب المثال سطر سطر. وبعدين جرّب [[id(a)]] و [[id(b)]] و [[id(c)]] وشوف مين رقمه زي مين.`,
          flag: "script",
          deep: {
            why: R`أغلب bugs المبتدئين في Python من هنا: تبعت list لدالة فتعدّلها من غير ما تقصد، أو تعمل «نسخة» وهي نفس الـ object. وفي الانترفيو [[is]] و [[==]] سؤال ثابت.`,
            how: R`كل حاجة في Python object ليه نوع وقيمة وهوية ([[id]]). التعيين [[b = a]] مبينسخش حاجة: بيربط اسم جديد بنفس الـ object. والدوال نفس الكلام: الباراميتر اسم جديد لنفس الـ object اللي اتبعت (اسمها call by sharing). فلو الدالة عملت [[append]] على list جاتلها، اللي برّه هيشوف التعديل. بس لو عملت [[items = []]] جوه الدالة، ده ربط الاسم المحلي بـ object جديد ومش هيأثر برّه.

[[a.copy()]] و [[list(a)]] و [[a[:]]] نسخة سطحية (shallow): list جديدة بس العناصر اللي جواها نفس الـ objects. لو جواها lists أو dicts وعايز تنسخهم هما كمان: [[copy.deepcopy(a)]].

[[is]] بيقارن الهوية (نفس [[id]])، و [[==]] بينادي [[__eq__]] ويقارن القيمة. و [[None]] object واحد بس في البرنامج كله (singleton)، عشان كده [[is None]] هي الطريقة الصح والأسرع. وفيه أرقام صغيرة (من -5 لـ 256) و strings قصيرة Python بيعيد استخدامها (interning)، فـ [[is]] ساعات «يشتغل» بالصدفة معاهم، وده بالظبط سبب إنك متعتمدش عليه.

Python dynamic: النوع بيتحدد وقت التشغيل ومرتبط بالقيمة مش بالاسم. و strong: مفيش تحويل ضمني بين أنواع مختلفة زي JS. [["5" + 5]] في JS بيطلع [["55"]]، هنا TypeError.`,
            when: R`[[is]] مع [[None]] (ومع sentinels بتعملها بنفسك)، و [[==]] في كل حاجة تانية. و [[.copy()]] أو [[deepcopy]] قبل ما تعدّل داتا جاتلك من برّه وانت مش عايز تغيّر الأصل.`,
            mistakes: R`[[if x == None]]: شغالة غالبًا بس مش مضمونة (أي class ممكن يعرّف [[__eq__]] غريب)، والـ linters بتعلّم عليها. و [[if name is "admin"]]: ممكن تنجح في الـ REPL وتفشل في الإنتاج، و Python من 3.8 بيطلّع SyntaxWarning عليها. وتعمل مصفوفة بـ [[[row] * 3]] فالتلات صفوف يطلعوا نفس الـ list: عدّل واحد يتعدّلوا كلهم.`
          },
          teach: R`## المثال بيعمل إيه؟

بيثبت ٣ أفكار: إن [[=]] مبينسخش حاجة، والفرق بين [[==]] و [[is]]، وإن النوع ماشي مع القيمة مش مع الاسم. اتشغّل كملف [[names.py]] على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، ونفس الناتج.

---

## ١. [[a = [1, 2, 3]]] و [[b = a]]

~~~python
a = [1, 2, 3]
b = a
~~~

- [[[1, 2, 3]]] بالأقواس المربعة دي **list**: مجموعة عناصر مرتبة (ليها درس «list» تحت).
- السطر الأول بيعمل object واحد (الـ list) في الذاكرة، وبيلزق عليه اسم [[a]].
- السطر التاني **مبيعملش list تانية**. بيلزق اسم تاني [[b]] على نفس الـ object.

فكّر في الاسم كلافتة متعلقة على حاجة، مش علبة شايلة الحاجة جواها. دلوقتي فيه لافتتين ([[a]] و [[b]]) على list واحدة.

---

## ٢. [[b.append(4)]] و [[print(a)]]

~~~python
b.append(4)
print(a)
~~~

- [[.append(4)]] method (دالة تابعة للـ object، بتتنادى بالنقطة) بتضيف 4 في آخر الـ list، **وبتعدّلها مكانها**.
- عدّلنا من خلال [[b]]، وطبعنا [[a]]:

~~~text الناتج
[1, 2, 3, 4]
~~~

الـ 4 ظهرت في [[a]]، لأن مفيش غير list واحدة.

---

## ٣. نسخة حقيقية: [[c = a.copy()]]

~~~python
c = a.copy()
print(a == c, a is c)
~~~

[[.copy()]] بتعمل list **جديدة** فيها نفس العناصر. وبعدين بنسأل سؤالين:

| السؤال | الرمز | الإجابة | ليه |
|---|---|---|---|
| القيمتين زي بعض؟ | [[a == c]] | [[True]] | الاتنين [[[1, 2, 3, 4]]] |
| دول نفس الـ object؟ | [[a is c]] | [[False]] | [[c]] object تاني اتعمل جديد |

~~~text الناتج
True False
~~~

### طيب [[id()]] دي إيه؟

كل object ليه رقم هوية [[id]] ثابت طول ما هو عايش. و [[a is b]] هي نفسها [[id(a) == id(b)]]. جرّبنا ده:

~~~text الناتج
>>> print(id(a) == id(b), id(a) == id(c), a is b)
True False True
~~~

الأرقام نفسها بتتغير كل تشغيلة (في CPython هي عنوان الـ object في الذاكرة)، المهم مين زي مين.

### [[c.append(5)]] و [[print(a)]]

~~~text الناتج
[1, 2, 3, 4]
~~~

الـ 5 راحت للنسخة بس، والأصل متأثرش. ده معنى التعليق في المثال: التعديل حصل في النسخة لوحدها.

> [[.copy()]] نسخة **سطحية** (shallow): الـ list الخارجية جديدة، بس لو جواها lists تانية، الداخلية دي مشتركة. و [[copy.deepcopy()]] بتنسخ كل حاجة لجوه.

~~~python
import copy
x = [[1], [2]]
s = x.copy(); d = copy.deepcopy(x)
x[0].append(99)
print(s, d)
~~~

~~~text الناتج
[[1, 99], [2]] [[1], [2]]
~~~

---

## ٤. [[None]] و [[is None]]

~~~python
x = None
if x is None:
    print("مفيش قيمة")
~~~

- [[None]] قيمة معناها «مفيش قيمة» (زي null في لغات تانية). نوعها [[NoneType]]، وفيه **object واحد بس** منه في البرنامج كله.
- [[if]] بتشغّل السطر اللي تحتها لو الشرط صح، والمسافات الأربعة قبل [[print]] هي اللي بتقول إنه جوه الـ if (ليها درس «if و elif و else»).
- عشان [[None]] واحد بس، السؤال الصح «هو هو نفس الـ object؟» يعني [[is]]:

~~~text الناتج
مفيش قيمة
~~~

ومتستخدمش [[is]] مع النصوص والأرقام. Python نفسه بيحذّرك (جرّبناها على ويندوز):

~~~text الناتج
<string>:2: SyntaxWarning: "is" with 'str' literal. Did you mean "=="?
True
~~~

طلعت [[True]] بالصدفة لأن Python ساعات بيعيد استخدام نفس الـ string القصيرة، ومفيش ضمان لده.

---

## ٥. النوع مع القيمة: [[n = 5]] ثم [[n = "five"]]

~~~python
n = 5
n = "five"
~~~

[[type(n)]] بعد السطر الأول [[<class 'int'>]]، وبعد التاني [[<class 'str'>]]. الاسم نفسه ملوش نوع، اتنقل يشاور على object تاني. ده معنى **dynamic typing**.

---

## ٦. [["5" + 5]]: الـ TypeError

السطر الأخير بيوقّع البرنامج، وده مقصود. ده الناتج الحقيقي في Docker:

~~~text الناتج
Traceback (most recent call last):
  File "/app/names.py", line 14, in <module>
    "5" + 5  # TypeError: can only concatenate str (not "int") to str
    ~~~~^~~
TypeError: can only concatenate str (not "int") to str
~~~

- [[Traceback]] يعني «البرنامج وقع، ودي الطريق اللي وصّلته هنا».
- [[line 14]] رقم السطر، وتحته السطر نفسه، والعلامات [[~~~~^~~]] بتشاور على الحتة اللي وقعت بالظبط: الـ [[+]].
- آخر سطر النوع والسبب.

ده معنى **strong typing**: Python مش بيحوّل بين الأنواع من نفسه. في JavaScript [["5" + 5]] بتطلع [["55"]].

---

## الخلاصة

| | معناها |
|---|---|
| [[b = a]] | اسم تاني لنفس الـ object، مش نسخة |
| [[a.copy()]] | object جديد (نسخة سطحية) |
| [[a == c]] | القيم زي بعض؟ |
| [[a is c]] | نفس الـ object؟ (نفس [[id]]) |
| [[x is None]] | الطريقة الصح تسأل «مفيش قيمة؟» |

- [[is]] مع [[None]] بس، و [[==]] لأي مقارنة تانية.
- النوع بتاع القيمة مش الاسم (dynamic)، ومفيش تحويل ضمني (strong).`,
          lines: [
            R`list، والاسم [[a]] بيشاور عليها.`,
            R`مفيش نسخ: [[b]] اسم تاني لنفس الـ list.`,
            R`التعديل من [[b]]...`,
            R`...بيبان من [[a]]، لأنهم object واحد.`,
            "نسخة جديدة (shallow copy).",
            R`نفس القيمة ([[==]]) بس object تاني ([[is]]).`,
            "التعديل في النسخة...",
            "...مبيأثرش على الأصل.",
            R`[[None]] معناها «مفيش قيمة»، وهو object واحد في البرنامج كله.`,
            R`[[is None]] هي الطريقة الصح.`,
            "جوه الـ if.",
            R`[[n]] بيشاور على int.`,
            "نفس الاسم بقى يشاور على str: مسموح (dynamic).",
            "بس مفيش تحويل ضمني: TypeError (strong)."
          ],
          sol: R`هتلاقي [[id(a)]] و [[id(b)]] نفس الرقم بالظبط، و [[id(c)]] رقم تاني. يعني [[a]] و [[b]] اسمين لنفس الـ list، و [[c]] object جديد. والأرقام نفسها هتختلف كل مرة تشغّل فيها Python (هي عنوان في الذاكرة في CPython)، المهم مين زي مين. واختصارها: [[id(a) == id(b)]] هي هي [[a is b]] وبتطلع [[True]]، و [[id(a) == id(c)]] بتطلع [[False]].

ولما توصل لآخر سطر هتشوف [[TypeError: can only concatenate str (not "int") to str]]. لو اتلخبطت وتوقعت إن [[print(a)]] بعد [[c.append(5)]] هيطلع فيه 5، فده بالظبط الفرق: [[copy()]] عملت object جديد، فالتعديل عليه ميوصلش للأصل.`
        },
        {
          cmd: "mutable و immutable",
          title: "أنهي أنواع بتتعدّل مكانها، وأنهي لأ؟",
          desc: R`الأنواع اللي بتتعدّل مكانها (mutable): [[list]] و [[dict]] و [[set]] والـ objects بتاعتك. واللي مبتتعدّلش (immutable): [[int]] و [[float]] و [[str]] و [[tuple]] و [[frozenset]] و [[bool]] و [[None]].

«مبتتعدّلش» يعني أي عملية عليها بتطلّع object جديد: [[s.upper()]] مبتغيّرش [[s]]، بترجع string جديدة. وده بيفرق في حاجتين: الدوال اللي بتعدّل الـ list اللي جاتلها، ومفاتيح الـ dict اللي لازم تكون immutable (hashable).`,
          example: R`s = "sara"
s.upper()
print(s)                 # sara: الأصل متغيرش
s = s.upper()
nums = [3, 1, 2]
nums.sort()
print(nums)              # [1, 2, 3]: اتعدّلت مكانها
sorted_copy = sorted([3, 1, 2])
point = (30.0, 31.2)
point[0] = 1             # TypeError: 'tuple' object does not support item assignment
cache = {(30.0, 31.2): "Cairo"}
cache[[30.0, 31.2]] = "x"  # TypeError: unhashable type: 'list'`,
          try: R`اكتب دالة [[add_tag(tags, t)]] بتعمل [[tags.append(t)]]، وناديها على list وشوف الـ list الأصلية اتغيرت. وبعدين غيّرها تعمل [[tags = tags + [t]]] وشوف الفرق.`,
          flag: "script",
          deep: {
            why: R`لما تفهم الفرق ده، هتفهم ليه [[s.upper()]] «مش شغالة»، وليه list جوه dict اتغيرت من مكان تاني، وليه مينفعش تحط list مفتاح في dict. وده أساس سؤال الانترفيو الشهير عن الـ default argument (في أسئلة الانترفيو آخر التاب).`,
            how: R`الـ immutable object قيمته ثابتة طول عمره. [[s += "x"]] على string مبيعدّلش الـ string، بيعمل string جديدة ويربط [[s]] بيها. أما على list، [[+=]] بيعدّل مكانها (زي [[extend]]). عشان كده [[a += [1]]] و [[a = a + [1]]] مختلفين لو فيه اسم تاني بيشاور على نفس الـ list.

الـ methods اللي بتعدّل الـ list مكانها بترجع [[None]]: [[sort]] و [[append]] و [[reverse]]. واللي بترجع list جديدة: [[sorted()]] والـ slicing. أما [[reversed()]] فمبتعدّلش الأصل بس بترجع iterator مش list (لو عايز list: [[list(reversed(a))]] أو [[a[::-1]]]).

الـ dict والـ set مبنيين على hash table: المفتاح بيتحسبله [[hash()]] مرة ويتحط في خانة. لو المفتاح اتغير بعد ما اتحط، مكانه يبقى غلط. عشان كده المفاتيح لازم hashable، وده عمليًا immutable: str و int و tuple (لو كل اللي جواها hashable). والـ tuple نفسها immutable، بس لو جواها list، الـ list دي تتعدّل عادي.`,
            when: "tuple للقيم الثابتة اللي بتوصف حاجة واحدة (إحداثيات، صف من القاعدة، مفتاح مركّب في dict). list لمجموعة عناصر بتكبر وتصغر. و [[frozenset]] لو محتاج set كمفتاح.",
            mistakes: R`[[nums = nums.sort()]] فـ [[nums]] تبقى None. وتفتكر إن [[s.replace("a", "b")]] غيّرت s. وتعدّل list وانت بتلف عليها بـ for فتتخطى عناصر: لف على نسخة ([[for x in items[:]]]) أو اعمل list جديدة بـ comprehension.`
          },
          teach: R`## المثال بيعمل إيه؟

بيقارن نوع **مبيتعدّلش** (str و tuple) بنوع **بيتعدّل مكانه** (list)، وبيوريك ليه الـ list متنفعش مفتاح في dict. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]. آخر سطرين كل واحد فيهم بيوقّع البرنامج، فاتشغّلوا لوحدهم.

الكلمتين:

- **mutable** يعني «قابل للتعديل»: الـ object نفسه يتغير وهو هو ([[list]] و [[dict]] و [[set]]).
- **immutable** يعني «مش قابل للتعديل»: أي «تعديل» بيطلّع object جديد ([[int]] و [[float]] و [[str]] و [[tuple]] و [[bool]] و [[None]] و [[frozenset]]).

---

## ١. الـ string مبتتغيرش

~~~python
s = "sara"
s.upper()
print(s)
s = s.upper()
~~~

- [[s.upper()]] method بترجع نسخة من النص بحروف كبيرة. **بترجعها**، مش بتغيّر [[s]]. وفي السطر التاني الناتج [['SARA']] اتعمل ومحدش خده، فضاع.
- [[print(s)]] بيطبع الأصل:

~~~text الناتج
sara
~~~

- [[s = s.upper()]] هي الطريقة الصح: خد الناتج الجديد، وخلّي الاسم [[s]] يشاور عليه. الـ string القديمة [["sara"]] متغيرتش، الاسم هو اللي اتنقل.

ونفس الكلام على [[replace]] و [[strip]] و [[lower]]: كلها بترجع string جديدة.

---

## ٢. الـ list بتتعدّل مكانها

~~~python
nums = [3, 1, 2]
nums.sort()
print(nums)
sorted_copy = sorted([3, 1, 2])
~~~

| الحتة | بتعمل إيه | بترجع إيه |
|---|---|---|
| [[nums.sort()]] | بترتّب [[nums]] نفسها | [[None]] |
| [[sorted([3, 1, 2])]] | بتعمل list **جديدة** مترتبة | الـ list الجديدة |

~~~text الناتج
[1, 2, 3]
~~~

وعشان [[sort]] بترجع [[None]]، الغلطة المشهورة [[nums = nums.sort()]] بتخلّي [[nums]] تبقى [[None]]. جرّبناها: [[r = nums.sort()]] ثم [[print(r, nums)]] طبعت [[None [1, 2, 3]]].

### [[+=]] مع list مش زي [[= a +]]

~~~python
a = [1]; b = a
a += [2]; print(a, b)
a = a + [3]; print(a, b)
~~~

~~~text الناتج
[1, 2] [1, 2]
[1, 2, 3] [1, 2]
~~~

[[;]] بتفصل أكتر من أمر في سطر واحد. و [[+=]] على list بيعدّلها مكانها، فـ [[b]] شافت الـ 2. أما [[a + [3]]] بتعمل list جديدة، و [[a =]] نقل الاسم [[a]] ليها، و [[b]] فضلت على القديمة.

---

## ٣. الـ tuple: [[point[0] = 1]]

~~~python
point = (30.0, 31.2)
point[0] = 1
~~~

[[( , )]] بالأقواس العادية والفاصلة ده **tuple**: زي list بس immutable. [[point[0]]] أول عنصر (العد بيبدأ من 0)، ومحاولة تغييره:

~~~text الناتج (Docker، Python 3.13)
Traceback (most recent call last):
  File "/app/mutable.py", line 10, in <module>
    point[0] = 1             # TypeError: 'tuple' object does not support item assignment
    ~~~~~^^^
TypeError: 'tuple' object does not support item assignment
~~~

يعني «الـ tuple مبتقبلش تعيين عنصر» (item assignment). وده نفس الناتج على ويندوز بـ 3.14.

---

## ٤. مفاتيح الـ dict لازم hashable

~~~python
cache = {(30.0, 31.2): "Cairo"}
cache[[30.0, 31.2]] = "x"
~~~

- [[{مفتاح: قيمة}]] ده **dict** (درس «dict» تحت). المفتاح هنا tuple، وده مسموح.
- السطر التاني بيحاول يحط **list** مفتاح: [[cache[...]]] بالقوسين المربعين معناها «المفتاح ده»، وجواهم list.

ليه ممنوع؟ الـ dict بيحسب لكل مفتاح رقم اسمه **hash** بـ [[hash()]]، وبيحط القيمة في خانة على أساسه. لو المفتاح اتغير بعد كده، الـ hash بتاعه يتغير، والـ dict مش هيلاقيه تاني. عشان كده Python بيرفض أي حاجة ممكن تتغير:

~~~text الناتج (Docker، Python 3.13)
TypeError: unhashable type: 'list'
~~~

~~~text الناتج (ويندوز، Python 3.14)
TypeError: cannot use 'list' as a dict key (unhashable type: 'list')
~~~

نفس الغلطة، و 3.14 بس كتب رسالة أوضح. والتعليق في المثال مكتوب بصيغة 3.13. أما [[hash((30.0, 31.2))]] فبيرجع رقم عادي، لأن الـ tuple (اللي كل اللي جواها immutable) hashable.

---

## اللي في «جرّب»: [[add_tag]]

~~~python
def add_tag(tags, t):
    tags.append(t)
my = ["python"]
add_tag(my, "api")
print(my)
~~~

[[def]] بتعرّف دالة، و [[tags]] و [[t]] الباراميترات. لما ناديناها بـ [[my]]، [[tags]] بقى اسم تاني لنفس الـ list (زي [[b = a]])، و [[append]] عدّلتها:

~~~text الناتج
['python', 'api']
~~~

وفي النسخة التانية [[tags = tags + [t]]] بتعمل list جديدة ويتربط بيها الاسم المحلي [[tags]] بس، فـ [[my]] فضلت [[['python']]] والدالة لازم [[return]]. الناتج الكامل للحل: [[['python'] ['python', 'api']]].

---

## الخلاصة

| النوع | mutable؟ | ينفع مفتاح dict؟ |
|---|---|---|
| [[int]] و [[float]] و [[str]] و [[bool]] و [[None]] | لأ | أيوه |
| [[tuple]] | لأ | أيوه (لو اللي جواها hashable) |
| [[list]] و [[dict]] و [[set]] | أيوه | لأ |

- methods الـ string بترجع string جديدة: خد الناتج في متغير.
- [[list.sort()]] بتعدّل وترجع [[None]]، و [[sorted()]] بترجع list جديدة.
- [[+=]] على list بيعدّل مكانه، و [[a = a + ...]] بيعمل جديدة.`,
          lines: [
            "string.",
            "بترجع string جديدة، والناتج ضاع لأننا محطناهوش في متغير.",
            "الأصل زي ما هو: str immutable.",
            "الصح: اربط الاسم بالناتج الجديد.",
            "list.",
            R`[[sort]] بتعدّل الـ list مكانها وبترجع [[None]].`,
            "اتعدّلت.",
            R`[[sorted]] بترجع list جديدة ومبتلمسش الأصل.`,
            "tuple: قيم ثابتة.",
            "ممنوع تتعدّل.",
            "الـ tuple ينفع مفتاح في dict لأنها hashable.",
            "الـ list لأ: ممكن تتغير فمكانها في الـ hash table يبوظ."
          ],
          sol: R`النسخة الأولى ([[tags.append(t)]]) بتعدّل الـ list الأصلية: لو ناديتها على [[my = ["python"]]] هتلاقي [[my]] بقت [[['python', 'api']]]، لأن الباراميتر اسم تاني لنفس الـ object و [[append]] بتعدّله مكانه.

النسخة التانية ([[tags = tags + [t]]]) مش هتغيّر حاجة برّه: [[my]] هتفضل [[['python']]]. الـ [[+]] بيعمل list جديدة، والتعيين بيربط الاسم المحلي [[tags]] بيها بس. فلو عايزها تفيد لازم [[return tags]] واللي نادى ياخد الناتج. وخد بالك: [[tags += [t]]] مش زي [[tags = tags + [t]]]؛ الـ [[+=]] على list بيعدّل مكانه، فهيغيّر الأصل زي [[append]].`,
          solCode: R`def add_tag(tags, t):
    tags.append(t)
my = ["python"]
add_tag(my, "api")
print(my)         # ['python', 'api']
def add_tag2(tags, t):
    tags = tags + [t]
    return tags
my = ["python"]
r = add_tag2(my, "api")
print(my, r)      # ['python'] ['python', 'api']`
        },
        {
          cmd: "type hints",
          title: "تكتب أنواع في Python: بتتفحص ولا لأ؟",
          desc: R`الـ type hints بتتكتب زي TypeScript: [[def get_user(user_id: int) -> User | None:]]. بس Python نفسه مبيفحصهاش وقت التشغيل: لو بعت string مكان int، الكود هيشتغل عادي لحد ما يقع في حتة تانية. اللي بيفحصها أدوات: mypy أو pyright (Pylance في VS Code).

إلا في FastAPI و Pydantic: هناك الأنواع ليها شغل حقيقي وقت التشغيل، FastAPI بيقراها ويفحص ويحوّل الـ request على أساسها. عشان كده في التاب ده الأنواع مش ديكور.

الصيغة الحديثة: [[list[int]]] و [[dict[str, int]]] و [[X | None]]، من غير [[from typing import List, Optional]].`,
          example: R`from typing import Literal
type UserId = int
type Role = Literal["admin", "user"]
def get_user(user_id: UserId, active: bool = True) -> dict[str, str] | None:
    return None
def first[T](items: list[T]) -> T | None:
    return items[0] if items else None
names: list[str] = []
scores: dict[str, float] = {}
role: Role = "admin"
get_user("5")  # بيشتغل عادي! Python مبيفحصش، بس mypy و Pylance بيعلّموا عليه`,
          try: R`سطّب [[pip install mypy]] وشغّل [[mypy file.py]] على المثال، وشوف الخطأ على آخر سطر. وبعدين [[python file.py]] وشوف إنه اشتغل عادي.`,
          flag: "script",
          deep: {
            why: "Python من غير أنواع سهل في سكربت صغير، بس في API فيه ٥٠ endpoint محدش فاكر الدالة دي بترجع إيه أو بتاخد إيه. الأنواع بتخلّي المحرر يكمّلك ويمسك الغلط، و FastAPI بيبني عليها الفحص والتوثيق.",
            how: R`الـ annotation بتتخزن ومحدش بيفحصها. وفي Python 3.14 (PEP 649) الـ annotations بقت بتتقيّم متأخر (lazy)، يعني مش محتاج [[from __future__ import annotations]] ولا تكتب النوع بين علامات تنصيص لما الكلاس لسه متعرّفش (forward reference). ومكتبات زي Pydantic و FastAPI بتقراها وقت التشغيل وتبني عليها الفحص.

التطور: من 3.9 [[list[int]]] مباشرة، ومن 3.10 [[int | None]]، ومن 3.12 [[type Alias = ...]] و generics بـ [[def first[T](...)]] من غير TypeVar. و [[Literal]] زي literal types في TS: قيم محددة بس.

ووقت التشغيل مفيش أي تحويل: [[get_user("5")]] بتوصل "5" string. الفحص الحقيقي بيحصل لو القيمة عدّت على Pydantic (المستوى ٢).`,
            when: "في أي كود هيعيش: باراميترات ونوع الرجوع لكل دالة، وأنواع الـ models. وشغّل mypy أو pyright في CI. السكربت اللي هترميه بعد ساعة مش لازم.",
            mistakes: R`[[Optional[str]]] تفتكرها «اختياري» وهي معناها [[str | None]] بس، والباراميتر لسه إجباري لو ملوش default. وتستخدم [[List]] و [[Dict]] من typing في كود جديد: شغالين بس طريقة قديمة. وتفتكر إن الـ hints بتحمي وقت التشغيل.`
          },
          teach: R`## المثال بيعمل إيه؟

بيكتب أنواع (type hints) لمتغيرات ودوال بكل الصيغ الحديثة، وفي الآخر بينادي دالة بنوع غلط عشان تشوف إن Python **مش** بيعترض، وإن mypy بيعترض. اتشغّل على ويندوز بـ Python 3.14.3 و mypy 2.4.0 (متسطّب في venv مؤقت)، وفي Docker بـ [[python:3.13-slim]]. الصيغ دي محتاجة Python 3.12 أو أحدث.

---

## ١. [[from typing import Literal]]

[[typing]] موديول في المكتبة الأساسية فيه أدوات للأنواع. [[from X import Y]] معناها «هات [[Y]] بس من الموديول [[X]]» عشان تستخدمه باسمه على طول.

---

## ٢. أسماء للأنواع: [[type]]

~~~python
type UserId = int
type Role = Literal["admin", "user"]
~~~

- [[type Name = ...]] (من Python 3.12) بتدّي اسم لنوع، اسمه **type alias**. [[UserId]] هنا هو [[int]] بالظبط، بس الاسم بيقول للي بيقرا «ده id مش أي رقم».
- [[Literal["admin", "user"]]] نوع قيمه محددة بالاسم: النص [["admin"]] أو [["user"]] بس، مش أي string.

وده اللي بيتخزن فعلًا (طبعناه على ويندوز):

~~~text الناتج
>>> print(UserId, UserId.__value__, Role.__value__)
UserId <class 'int'> typing.Literal['admin', 'user']
~~~

---

## ٣. دالة بأنواع

~~~python
def get_user(user_id: UserId, active: bool = True) -> dict[str, str] | None:
    return None
~~~

نفكّها حتة حتة:

| الحتة | معناها |
|---|---|
| [[def get_user(...):]] | تعريف دالة اسمها [[get_user]] |
| [[user_id: UserId]] | باراميتر، وبعد [[:]] نوعه المتوقع |
| [[active: bool = True]] | باراميتر نوعه bool، و [[= True]] قيمته لو محدش بعته (default) |
| [[->]] | «الدالة دي بترجع...» |
| [[dict[str, str]]] | dict مفاتيحه str وقيمه str |
| [[X | None]] | واحد من الاتنين: dict أو [[None]]. [[|]] هنا معناها «أو» |
| [[return None]] | الجسم: بيرجع [[None]] (مثال بس) |

Python بيشيل الأنواع دي في [[__annotations__]] وخلاص:

~~~text الناتج
>>> print(get_user.__annotations__)
{'user_id': UserId, 'active': <class 'bool'>, 'return': dict[str, str] | None}
~~~

---

## ٤. دالة generic: [[def first[T](...)]]

~~~python
def first[T](items: list[T]) -> T | None:
    return items[0] if items else None
~~~

- [[[T]]] بعد اسم الدالة (من 3.12) معناها «فيه نوع اسمه [[T]] هيتحدد وقت النداء». اسمها **generic**.
- [[items: list[T]]]: list عناصرها من النوع [[T]]، و [[-> T | None]]: بترجع عنصر من نفس النوع أو [[None]].
- يعني لو بعت [[list[int]]] الأدوات هتعرف إن الناتج [[int]]، ولو [[list[str]]] يبقى [[str]].
- الجسم: [[A if cond else B]] (درس «if و elif و else»). [[if items]] صح لو الـ list مش فاضية، فبيرجع [[items[0]]] أول عنصر، وإلا [[None]].

~~~text الناتج
>>> print(first([10, 20]), first([]))
10 None
~~~

---

## ٥. متغيرات بأنواع

~~~python
names: list[str] = []
scores: dict[str, float] = {}
role: Role = "admin"
~~~

[[الاسم: النوع = القيمة]]. مفيد لما القيمة فاضية: [[[]]] لوحدها مش بتقول الـ list هتشيل إيه، فبتقول إنت [[list[str]]].

---

## ٦. السطر الأخير: [[get_user("5")]]

[[get_user]] مستنية [[UserId]] (يعني int)، وإحنا بعتنا [["5"]] نص.

### Python نفسه

~~~powershell
python file.py
~~~

مطلعش أي حاجة، وكود الخروج (exit code) [[0]] يعني «نجح». Python مبيفحصش الأنواع وقت التشغيل خالص، و [[get_user("5")]] رجّعت [[None]] عادي.

### mypy

[[mypy]] برنامج منفصل (بيتسطّب بـ [[pip install mypy]]) بيقرا الكود من غير ما يشغّله ويفحص الأنواع:

~~~powershell
mypy file.py
~~~

~~~text الناتج
file.py:11: error: Argument 1 to "get_user" has incompatible type "str"; expected "int"  [arg-type]
Found 1 error in 1 file (checked 1 source file)
~~~

| الحتة | معناها |
|---|---|
| [[file.py:11]] | الملف والسطر |
| [[Argument 1 to "get_user"]] | أول argument اتبعت للدالة |
| [[incompatible type "str"; expected "int"]] | بعت str وهي مستنية int. كتب int مش UserId لأن الـ alias اسم تاني لنفس النوع |
| [[[arg-type]]] | كود الغلطة، تقدر تدوّر بيه في docs بتاعة mypy |

وكود الخروج [[1]]، فلو mypy في CI هيوقف الـ build. وجرّبنا كمان [[r: Role = "superuser"]] فـ mypy قال [[Incompatible types in assignment (expression has type "Literal['superuser']", variable has type "Literal['admin', 'user']")]]، بينما Python شغّله عادي.

---

## ليه بنهتم في FastAPI؟

في الكود العادي الأنواع للأدوات (mypy و Pylance في VS Code) بس. لكن FastAPI و Pydantic **بيقروها وقت التشغيل** ويفحصوا ويحوّلوا الداتا اللي جاية على أساسها، فهناك [[user_id: int]] بتعمل شغل حقيقي (المستوى ٢).

## الخلاصة

| الصيغة | معناها | من |
|---|---|---|
| [[list[int]]] و [[dict[str, float]]] | أنواع الـ collections | 3.9 |
| [[int | None]] | واحد من الاتنين | 3.10 |
| [[type X = ...]] | اسم لنوع | 3.12 |
| [[def f[T](...)]] | دالة generic | 3.12 |
| [[Literal["a", "b"]]] | قيم محددة بس | 3.8 |

- Python مبيفحصش الأنواع وقت التشغيل. mypy و pyright هما اللي بيفحصوا.
- [[-> النوع]] نوع اللي الدالة بترجعه، و [[: النوع]] نوع الباراميتر أو المتغير.`,
          lines: [
            R`[[Literal]] لقيم محددة بالاسم.`,
            R`اسم لنوع (Python 3.12+)، زي [[type]] في TS.`,
            "نوع قيمه اتنين بس.",
            R`باراميترات بأنواع، و [[->]] نوع الرجوع: dict أو None.`,
            "الجسم.",
            R`دالة generic بصيغة 3.12: [[T]] بيتحدد من الـ list اللي اتبعتت.`,
            "أول عنصر لو الـ list مش فاضية.",
            "متغير بنوعه، مفيد لما القيمة الأولى فاضية.",
            "dict مفاتيحه str وقيمه float.",
            "لازم تبقى واحدة من القيمتين (الفحص في mypy بس).",
            "Python بيشغّله عادي، والأدوات بس اللي بتعترض."
          ],
          sol: R`[[mypy file.py]] هيطلّع حاجة زي: [[file.py:11: error: Argument 1 to "get_user" has incompatible type "str"; expected "int"  [arg-type]]] وبعدها [[Found 1 error in 1 file]] وكود خروج 1. لاحظ إنه كتب [[int]] مش [[UserId]]، لأن [[type UserId = int]] اسم تاني لنفس النوع (alias) مش نوع جديد.

وبعدين [[python file.py]] هيشتغل ويخلص من غير أي رسالة وكود خروج 0. ودي الفكرة كلها: الـ hints للأدوات (mypy و Pylance) وPython نفسه بيتجاهلها وقت التشغيل. لو mypy مطلعش خطأ، اتأكد إنك شغّلته على الملف الصح وإن السطر [[get_user("5")]] موجود؛ ولو [[python]] رمى [[SyntaxError]] عند [[type]] أو [[first[T]]]، فإنت على Python أقدم من 3.12.`
        },
        {
          cmd: "f-strings",
          title: "تبني string من متغيرات وتنسّق الأرقام",
          desc: R`[[f"..."]] بتحط أي expression جوه [[{}]]: [[f"Hi {name}"]]. وبعد [[:]] تنسيق: [[{price:.2f}]] رقمين عشريين، و [[{n:,}]] فواصل الآلاف، و [[{x=}]] بيطبع الاسم والقيمة (للـ debugging).

وأهم methods للـ strings: [[split]] و [[join]] و [[strip]] و [[startswith]] و [[replace]]، و [[in]] للبحث.`,
          example: R`name, price, qty = "Sara", 1234.5, 3
print(f"{name} دفعت {price * qty:,.2f} جنيه")
print(f"{qty=}")                  # qty=3
print(f"{'id':<6}|{'name':>10}|")
tags = " python, fastapi ,api "
clean = [t.strip() for t in tags.split(",")]
print(", ".join(clean))           # python, fastapi, api
print("fast" in "fastapi", "a.py".endswith(".py"))
path = r"C:\new\folder"`,
          try: R`اطبع [[f"{3.14159:.3f}"]] و [[f"{0.256:.1%}"]] و [[f"{42:05d}"]]، وخمّن الناتج قبل ما تشوفه.`,
          flag: "script",
          deep: {
            why: R`الـ strings في كل حتة: رسايل لوج، و keys في Redis، وأسماء ملفات، وردود. الـ f-strings أسرع وأوضح من [[+]] و [[%]] و [[.format()]].`,
            how: R`الـ f-string بتتقيّم وقت التنفيذ: أي expression ينفع جوه القوسين، حتى نداء دالة. ومن 3.12 (PEP 701) تقدر تستخدم نفس نوع علامة التنصيص جوه ([[f"{d["key"]}"]]).

بعد [[:]] الـ format spec: [[,]] فواصل، و [[.2f]] عشريين، و [[<]] و [[>]] و [[^]] محاذاة، و [[%]] نسبة. و [[!r]] بيستخدم [[repr]]، فبيبيّن علامات التنصيص والمسافات المخفية.

[[join]] method على الفاصل مش على الـ list: [[", ".join(items)]]، والعناصر لازم تكون strings. وتجميع strings بـ [[+=]] في loop كبير بطيء؛ جمّعها في list واعمل join.

و [[r"..."]] raw string: الـ backslash بيفضل زي ما هو، مفيد للـ regex ومسارات ويندوز.

وفي 3.14 فيه template strings: [[t"..."]] شبه f-string بس بترجع object من نوع [[Template]] مش string، فالمكتبة تقدر تعمل escape لكل قيمة قبل ما تتحط (للـ SQL و HTML). لسه جديدة، بس اعرف إنها موجودة.`,
            when: R`أي string فيها متغيرات. استثناءين مهمين: رسايل الـ logging ([[log.info("user %s", uid)]]، درس logging في المستوى ٣)، والـ SQL (باراميترات، مش f-string أبدًا).`,
            mistakes: R`[[f"SELECT * FROM users WHERE id = {user_id}"]]: SQL injection (درس asyncpg). وتنسى الـ f فيطلع [[{name}]] حرفيًا. و float للفلوس: [[0.1 + 0.2]] بيطلع [[0.30000000000000004]]، فالفلوس تتخزن [[Decimal]] أو قروش كـ int.`
          },
          teach: R`## المثال بيعمل إيه؟

بيبني نصوص فيها متغيرات وحسابات بالـ f-strings، وبينسّق الأرقام والمحاذاة، وبعدين ينضّف نص فيه مسافات زيادة بـ [[split]] و [[strip]] و [[join]]. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، ونفس الناتج.

---

## ١. [[name, price, qty = "Sara", 1234.5, 3]]

ده **tuple unpacking**: على اليمين ٣ قيم مفصولة بفواصل، وعلى الشمال ٣ أسماء، فكل اسم بياخد القيمة اللي قصاده بالترتيب. نفس [[name = "Sara"]] و [[price = 1234.5]] و [[qty = 3]].

---

## ٢. [[f"{name} دفعت {price * qty:,.2f} جنيه"]]

### الـ [[f]] والقوسين [[{}]]

[[f]] قبل علامة التنصيص بتحوّل النص لـ **f-string** (f من formatted). أي حاجة بين [[{ }]] بتتحسب كـ Python وقيمتها بتتحط مكانها. [[{name}]] بقت [[Sara]]، و [[{price * qty}]] بيتحسب الأول: 1234.5 × 3 = [[3703.5]].

### بعد النقطتين: الـ format spec

اللي بعد [[:]] جوه القوسين اسمه **format spec**، يعني «اكتب الرقم بالشكل ده». [[,.2f]] بتتقري كده:

| الحتة | معناها |
|---|---|
| [[,]] | حط فاصلة كل ٣ أرقام (فواصل الآلاف) |
| [[.2]] | رقمين بعد العلامة العشرية |
| [[f]] | اكتبه كرقم عشري ثابت (fixed-point) |

~~~text الناتج
Sara دفعت 3,703.50 جنيه
~~~

من غير تنسيق كان هيطلع [[3703.5]]. والـ [[.2f]] بتقرّب، مش بتقص.

---

## ٣. [[f"{qty=}"]]

[[=]] بعد الاسم بيطبع **الكلام اللي جوه القوسين** وبعده قيمته. مفيد وانت بتدوّر على bug عشان مش محتاج تكتب الاسم مرتين:

~~~text الناتج
qty=3
~~~

---

## ٤. المحاذاة: [[f"{'id':<6}|{'name':>10}|"]]

- [['id']] و [['name']] نصوص جوه القوسين. استخدمنا [[']] عشان الـ f-string نفسها بـ [["]].
- [[<6]]: اكتبه في ٦ خانات، **ملزوق شمال** والباقي مسافات.
- [[>10]]: في ١٠ خانات، **ملزوق يمين**.
- و [[^]] (مش في المثال) بيوسّط.

الـ [[|]] حروف عادية حطيناها عشان تشوف حدود كل خانة. طبعنا السطر بـ [[repr()]] عشان المسافات تبان:

~~~text الناتج
'id    |      name|'
~~~

[[id]] + ٤ مسافات = ٦، و ٦ مسافات + [[name]] = ١٠. ده اللي بيخلّي الجداول في الترمنال عواميدها مظبوطة.

---

## ٥. تنضيف النص: [[split]] و [[strip]] و [[join]]

~~~python
tags = " python, fastapi ,api "
clean = [t.strip() for t in tags.split(",")]
print(", ".join(clean))
~~~

### [[tags.split(",")]]

بتقطّع النص عند كل [[,]] وبترجع list:

~~~text الناتج
[' python', ' fastapi ', 'api ']
~~~

الحتت لسه فيها مسافات من الناحيتين.

### [[t.strip() for t in ...]]

ده **list comprehension** (ليه درس «comprehensions»): «لكل حتة [[t]] في الـ list، خد [[t.strip()]]». و [[strip()]] بتشيل المسافات من أول وآخر النص بس:

~~~text الناتج
['python', 'fastapi', 'api']
~~~

### [[", ".join(clean)]]

[[join]] بتلزق عناصر list في نص واحد، وبتحط بينهم النص اللي اتنادت عليه ([[", "]]). خد بالك إنها method على **الفاصل** مش على الـ list:

~~~text الناتج
python, fastapi, api
~~~

والعناصر لازم كلها strings. [[", ".join(["a", 1])]] بترمي [[TypeError: sequence item 1: expected str instance, int found]].

---

## ٦. [[in]] و [[endswith]]

~~~python
print("fast" in "fastapi", "a.py".endswith(".py"))
~~~

- [[in]] بين نصين: «النص ده موجود جوه التاني؟».
- [[endswith(".py")]]: «النص بيخلص بكده؟» وأختها [[startswith]].

~~~text الناتج
True True
~~~

---

## ٧. [[path = r"C:\new\folder"]]

[[r]] قبل النص = **raw string**: الـ backslash [[\]] بيفضل حرف عادي. من غيرها [[\n]] معناها سطر جديد و [[\f]] حرف تحكم. جرّبنا الاتنين:

~~~text الناتج: print(r"C:\new\folder") ثم print("C:\new\folder")
C:\new\folder
C:
ewolder
~~~

التانية اتكسرت: [[\n]] عملت سطر جديد، و [[\f]] (form feed) اختفت فبقت [[ewolder]]. عشان كده مسارات ويندوز والـ regex بتتكتب بـ [[r]].

---

## اللي في «جرّب»

~~~text الناتج
3.142 25.6% 00042
~~~

| الكود | المعنى |
|---|---|
| [[{3.14159:.3f}]] | ٣ أرقام بعد العلامة مع تقريب |
| [[{0.256:.1%}]] | اضرب في 100، رقم واحد بعد العلامة، وحط [[%]] |
| [[{42:05d}]] | عدد صحيح ([[d]])، عرضه ٥، والفاضي يتملى أصفار ([[0]]) |

## الخلاصة

- [[f"...{x}..."]]: أي expression جوه القوسين.
- بعد [[:]] التنسيق: [[,]] فواصل، و [[.2f]] عشريين، و [[<]] [[>]] [[^]] محاذاة، و [[%]] نسبة.
- [[{x=}]] للـ debugging، و [[r"..."]] للـ backslash.
- [[split]] بتقطّع، و [[strip]] بتنضّف الأطراف، و [[sep.join(list)]] بتلزق.
- متستخدمش f-string تبني بيها SQL (SQL injection، درس asyncpg).`,
          lines: [
            "كذا متغير في سطر (tuple unpacking).",
            R`expression جوه القوسين، و [[:,.2f]] فواصل آلاف ورقمين عشريين.`,
            R`[[=]] بيطبع اسم المتغير وقيمته: مفيد وانت بتدوّر على bug.`,
            R`محاذاة: [[<6]] شمال في ٦ خانات، و [[>10]] يمين في ١٠.`,
            "string فيها مسافات زيادة.",
            "قسّم على الفاصلة وشيل المسافات من كل حتة.",
            R`[[join]] على الفاصل، والعناصر strings.`,
            R`[[in]] للبحث، و [[endswith]] للنهاية.`,
            "raw string: الـ backslash مش escape."
          ],
          sol: R`الناتج: [[3.142]] و [[25.6%]] و [[00042]].

[[.3f]] يعني ٣ أرقام بعد العلامة مع تقريب (فـ 3.14159 بقت 3.142 مش 3.141). و [[.1%]] بيضرب في 100 ويحط علامة % برقم واحد بعد العلامة. و [[05d]] يعني عدد صحيح عرضه ٥ ويتملى أصفار من الشمال. الغلطة المشهورة إنك تتوقع [[0.3%]] من [[.1%]]، ناسي إنه بيضرب في 100 لوحده، فمتضربش إنت كمان.`
        }
      ]
    }
  ]
});
