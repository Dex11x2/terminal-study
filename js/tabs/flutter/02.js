// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "Dart: المتغيرات والدوال",
      l: 1,
      n: "لغة شبه TypeScript و Java، بس الـ null مقفول عليه من الأول",
      items: [
        {
          cmd: "مقدمة Dart ودالة main()",
          title: "برنامج Dart بيبدأ منين، وبتطبع وتعرّف متغير بنوعه إزاي؟",
          desc: R`[[Dart]] لغة Google عملتها، وهي اللغة اللي بتكتب بيها تطبيقات [[Flutter]] كلها. كل widget في Flutter هو كود Dart، فلو فهمت أساسيات اللغة الأول، كود Flutter هيبقى مقروء.

كل برنامج Dart بيبدأ من دالة اسمها [[main]]. لما تشغّل الملف، Dart بيدوّر عليها وينفّذ اللي جواها سطر سطر من فوق لتحت. وفي Flutter نفس الكلام: [[main]] هي اللي بتنادي [[runApp]] (درس «runApp»).

الرموز اللي هتشوفها في أول سطر:
• [[void main()]]: [[void]] معناها الدالة مش بترجّع قيمة، و [[()]] مكان الـ parameters (فاضي هنا).
• [[{ }]]: جسم الدالة، كل اللي بينهم بيتنفّذ.
• [[;]]: آخر كل جملة. Dart بيطلّع error لو نسيتها.
• [[//]]: تعليق، Dart بيتجاهل باقي السطر.

[[print()]] بتطبع اللي جواها في الـ console. والنص بين علامتين تنصيص مفردة [['...']] أو مزدوجة [["..."]].

المتغير بتكتب نوعه قبل اسمه:
• [[String]] نص: [['Khaled']].
• [[int]] رقم صحيح: [[5]].
• [[double]] رقم بكسور: [[4.8]].
• [[bool]] صح أو غلط: [[true]] أو [[false]].

وعشان تحط قيمة متغير جوه نص: [[$]] قبل اسمه ([['Hi $name']])، ولو عايز حساب أو أي expression حطه بين [[$__{ }]] ([['$__{count + 1}']]).

الدرس الجاي («final و const») بيوريك إمتى تكتب النوع بنفسك وإمتى تسيب Dart يستنتجه بـ [[var]] و [[final]].`,
          example: R`// كل برنامج Dart بيبدأ من main
void main() {
  print('Hello, Dart!');

  String developer = 'Khaled';
  int appsCount = 5;
  double rating = 4.8;
  bool isAvailable = true;

  print('$developer built $appsCount apps, rating $rating');
  print('Next year: $__{appsCount + 1} apps');
  print('Available: $isAvailable');
}`,
          try: R`افتح [[dartpad.dev]] في المتصفح (مش محتاج تسطّب حاجة)، امسح الكود اللي فيه والصق المثال واضغط Run. بعدين جرّب ٣ حاجات واحدة واحدة وشوف الرسالة اللي تطلع: امسح [[;]] من آخر سطر الـ print الأول، وبعدين غيّر [[int appsCount = 5;]] لـ [[int appsCount = '5';]]، وبعدين غيّر [[appsCount + 1]] لـ [[appsCount * 2]].`,
          flag: "script",
          deep: {
            why: R`في Flutter بتكتب widgets جوه widgets، ولو مش فاهم الـ [[{ }]] والـ [[;]] والأنواع، الأخطاء هتبان كأنها مشاكل Flutter وهي في الحقيقة Dart. وكمان الـ type checker بتاع Dart بيمسك أخطاء زي «حطيت نص في متغير رقم» وانت بتكتب، قبل ما تشغّل التطبيق.`,
            how: R`Dart بيشتغل بطريقتين: وانت بتطوّر بيشغّل الكود بـ JIT (بيترجمه وهو شغال)، ودا اللي بيخلي hot reload يعدّل التطبيق في ثانية من غير ما يبدأ من الأول. ولما تعمل build للنسخة اللي هتنزل على المتجر بيترجمه AOT لـ machine code مرة واحدة قبل التشغيل، فالتطبيق بيفتح أسرع.

[[$]] جوه النص اسمها string interpolation: Dart بيبدّل [[$developer]] بقيمته. من غير الأقواس، [[$]] بتاخد اسم متغير بس، فـ [['$appsCount + 1']] هتطبع «5 + 1» مش 6. عشان كده الحساب لازم [[$__{ }]].`,
            when: R`أول حاجة قبل أي widget. وكل ما تحب تجرب حتة Dart لوحدها (دالة أو حساب) جرّبها في DartPad أو في ملف [[.dart]] تشغّله بـ [[dart run file.dart]].`,
            mistakes: R`تنسى [[;]] فيطلعلك [[Expected to find ';'.]]. تحط نص في متغير [[int]] فيطلعلك error قبل التشغيل. تكتب [[$appsCount + 1]] من غير أقواس وتستغرب إن الحساب متعملش. وتكتب [[Print]] أو [[Main]] بحرف كبير: Dart بيفرّق بين الحروف الكبيرة والصغيرة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيطبع سطر ترحيب، وبيعرّف ٤ متغيرات من ٤ أنواع مختلفة، وبعدين بيحط قيمهم جوه نصوص ويطبعها. كل اللي تحت اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5) بـ [[dart run main.dart]]، والأخطاء اتجربت بتعديل الملف فعلًا.

---

## ١. التعليق

~~~dart
// كل برنامج Dart بيبدأ من main
~~~

[[//]] معناها «من هنا لآخر السطر كلام للبني آدم مش للكمبيوتر». Dart بيتجاهله خالص، فممكن تكتب فيه عربي أو أي حاجة.

---

## ٢. [[void main() {]]

~~~dart
void main() {
~~~

السطر ده فيه ٤ حتت:

| الحتة | معناها |
|---|---|
| [[void]] | نوع اللي الدالة بترجّعه. void = «ولا حاجة»، الدالة بتعمل شغل ومش بترجّع قيمة |
| [[main]] | اسم الدالة. الاسم ده بالذات هو اللي Dart بيدوّر عليه أول ما يشغّل الملف |
| [[()]] | مكان الـ parameters (القيم اللي الدالة بتستلمها). فاضي هنا |
| [[{]] | بداية جسم الدالة. كل اللي لحد [[}]] اللي في الآخر هو البرنامج |

لو مفيش [[main]] في الملف، [[dart run]] بيرفض يشغّله أصلًا. وفي Flutter نفس الكلام: [[lib/main.dart]] فيه [[main]] وهي اللي بتنادي [[runApp]].

---

## ٣. أول طباعة

~~~dart
  print('Hello, Dart!');
~~~

- [[print]] دالة جاهزة في اللغة بتطبع اللي جوه القوسين في الترمنال (أو الـ console في DartPad).
- [['Hello, Dart!']] نص (String). بين علامتين تنصيص مفردة، ولو كتبته بـ [["..."]] نفس الحاجة بالظبط.
- [[;]] آخر الجملة. في Dart إجبارية مش اختيارية زي JavaScript.

~~~text الناتج
Hello, Dart!
~~~

### لو نسيت [[;]]

مسحتها من السطر ده وشغّلت:

~~~text dart run
main.dart:2:23: Error: Expected ';' after this.
  print('Hello, Dart!')
                      ^
~~~

- [[2:23]] يعني سطر ٢ عمود ٢٣، والسهم [[^]] بيشاور على المكان.
- ومفيش ولا سطر اتطبع، حتى [[Hello]] نفسه. Dart بيترجم الملف كله الأول، ولو فيه error مبينفّذش حاجة.
- [[dart analyze]] (والـ editor) بيقول نفس الغلطة بصيغة تانية: [[Expected to find ';'.]].

---

## ٤. المتغيرات الأربعة

~~~dart
  String developer = 'Khaled';
  int appsCount = 5;
  double rating = 4.8;
  bool isAvailable = true;
~~~

الشكل كل مرة: **النوع، بعده الاسم، بعده [[=]] والقيمة، بعده [[;]]**.

| النوع | يعني | القيمة هنا |
|---|---|---|
| [[String]] | نص | [['Khaled']] |
| [[int]] | integer: رقم صحيح من غير كسور | [[5]] |
| [[double]] | رقم بكسور (العلامة العشرية) | [[4.8]] |
| [[bool]] | boolean: صح أو غلط بس | [[true]] |

- [[=]] هنا مش «يساوي» بتاعة الرياضة، معناها «حط القيمة اللي على اليمين في المتغير اللي على الشمال».
- الأسامي بالشكل ده [[appsCount]] (أول كلمة small وكل كلمة بعدها أول حرف capital) اسمه camelCase، ودا العرف في Dart للمتغيرات والدوال.
- Dart بيفرّق بين الكبير والصغير: [[String]] نوع، إنما [[string]] مش موجود.

### النوع بيتفحص قبل التشغيل

غيّرت السطر لـ [[int appsCount = '5';]]:

~~~text dart run
main.dart:2:19: Error: A value of type 'String' can't be assigned to a variable of type 'int'.
  int appsCount = '5';
                  ^
~~~

[['5']] بين علامتين تنصيص يبقى نص، حتى لو شكله رقم. والمتغير قال من الأول إنه [[int]]، فالـ compiler رفض قبل ما يشغّل حاجة.

---

## ٥. [[$]] جوه النص (string interpolation)

~~~dart
  print('$developer built $appsCount apps, rating $rating');
~~~

[[$]] قبل اسم متغير جوه النص معناها «حط قيمة المتغير ده هنا». Dart بيبدّل كل [[$اسم]] بقيمته قبل ما يطبع:

~~~text الناتج
Khaled built 5 apps, rating 4.8
~~~

---

## ٦. حساب جوه النص: [[$__{ }]]

~~~dart
  print('Next year: $__{appsCount + 1} apps');
~~~

[[$]] لوحدها بتاخد **اسم** بس وتقف عند أول حاجة مش جزء من الاسم. فلو كتبت [['$appsCount + 1']] جربتها وطلعت:

~~~text الناتج
5 + 1
~~~

يعني حط 5 وكمّل الباقي كنص عادي. عشان أي حساب أو expression (أي حاجة بتتحسب لقيمة) لازم تتحط بين [[$__{]] و [[}]]:

~~~text الناتج
Next year: 6 apps
~~~

---

## ٧. طباعة الـ bool وقفلة الدالة

~~~dart
  print('Available: $isAvailable');
}
~~~

الـ bool بيتحوّل لنص [[true]] أو [[false]] جوه الجملة. و [[}]] بتقفل جسم [[main]]: البرنامج خلص.

~~~text الناتج الكامل (dart run)
Hello, Dart!
Khaled built 5 apps, rating 4.8
Next year: 6 apps
Available: true
~~~

---

## ٨. اتأكد من الأنواع بنفسك

كل قيمة في Dart تعرف نوعها، و [[.runtimeType]] بيقولهولك. جربت:

~~~dart
  print(4.8.runtimeType);
  print(true.runtimeType);
~~~

~~~text الناتج
double
bool
~~~

مفيدة لما تبقى مش متأكد Dart شايف المتغير إيه.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[void main() { }]] | نقطة البداية، ومش بترجّع حاجة |
| [[;]] | آخر كل جملة، ونسيانها يوقف الملف كله |
| [[النوع الاسم = القيمة;]] | تعريف متغير، والنوع بيتفحص قبل التشغيل |
| [[$name]] | قيمة متغير جوه نص |
| [[$__{a + 1}]] | أي حساب جوه نص |

> الأخطاء في Dart بتطلع قبل التشغيل مش وانت شغال: دي ميزة. اقرا رقم السطر والعمود في الرسالة الأول.`,
          lines: [
            R`نقطة البداية: [[void]] = مش بترجّع حاجة، و [[{]] بداية جسم الدالة.`,
            R`أول طباعة. الـ [[;]] بتقفل الجملة.`,
            R`متغير نوعه [[String]] (نص).`,
            R`متغير نوعه [[int]] (رقم صحيح).`,
            R`متغير نوعه [[double]] (رقم بكسور).`,
            R`متغير نوعه [[bool]] (صح أو غلط).`,
            R`[[$]] قبل اسم المتغير بتحط قيمته جوه النص.`,
            R`حساب جوه النص لازم بين [[$__{ }]].`,
            R`الـ bool بيتطبع [[true]] أو [[false]].`,
            R`[[}]] قفلة الدالة: البرنامج خلص.`
          ],
          sol: R`الناتج في DartPad:
[[Hello, Dart!]]
[[Khaled built 5 apps, rating 4.8]]
[[Next year: 6 apps]]
[[Available: true]]

لما تمسح [[;]]: DartPad بيعلّم على السطر بالأحمر والرسالة [[Expected to find ';'.]]، ولو ضغطت Run مفيش ولا سطر بيتطبع، حتى السطور اللي قبل الغلطة. يعني Dart بيفحص الملف كله قبل ما ينفّذ أي حاجة. (لو شغّلت الملف بـ [[dart run]] نفس الغلطة بتظهر بصيغة [[Expected ';' after this.]].)

لما تكتب [[int appsCount = '5';]]: برضه مفيش حاجة بتشتغل، والـ error [[A value of type 'String' can't be assigned to a variable of type 'int'.]] ده الـ type checker: [['5']] نص مش رقم.

ولما تغيّر لـ [[appsCount * 2]]: السطر بيطبع [[Next year: 10 apps]].`
        },
        {
          cmd: "final و const",
          title: "متغير مبيتغيرش، والفرق بين وقت التشغيل ووقت الترجمة",
          desc: R`[[var]] متغير عادي و Dart بيستنتج نوعه ([[var n = 1]] يبقى int للأبد). [[final]] بيتحط مرة واحدة ومش بيتغير، وقيمته ممكن تتحسب وقت التشغيل. [[const]] قيمته لازم تبقى معروفة وقت الترجمة، ودا اللي Flutter بيستفيد منه في الأداء.

القاعدة: اكتب [[final]] في كل حتة، و [[var]] بس لما هتغيّر القيمة، و [[const]] للثوابت الحقيقية وللـ widgets اللي مبتتغيرش.`,
          example: R`void main() {
  var count = 0;
  count++;
  final now = DateTime.now();
  const maxItems = 50;
  String name = 'Ali';
  double price = 9.99;
  final tags = ['a'];
  tags.add('b');
  const days = ['sat', 'sun'];
  // days.add('mon'); // runtime error: Unsupported operation
  print('$name paid $__{price * 2} at $now, max $maxItems, $count');
}`,
          try: "شغّل المثال في DartPad (dartpad.dev) أو بـ [[dart run]]. شيل التعليق من [[days.add]] وشوف الـ error. وبعدين جرّب [[const now = DateTime.now();]] وشوف الـ compiler بيقول إيه.",
          flag: "script",
          deep: {
            why: "لو كل متغير ممكن يتغير في أي وقت، لازم تتبّع كل سطر عشان تعرف قيمته. final بيقولك «دا مش هيتغير» فتقرا الكود أسرع، والـ compiler بيمنعك لو غلطت. و const في Flutter بيخلي الـ widget يتعمل مرة واحدة ويتشارك بدل ما يتعمل تاني مع كل rebuild.",
            how: R`Dart لغة statically typed: كل متغير ليه نوع معروف وقت الترجمة، حتى لو كتبت [[var]] (الـ compiler بيستنتجه). الأنواع الأساسية: [[int]] و [[double]] (والاتنين تحت [[num]])، و [[String]]، و [[bool]]، و [[List]] و [[Map]] و [[Set]]. و [[dynamic]] بيقفل الفحص خالص (زي any في TypeScript)، فابعد عنه.

الفرق بين final و const: [[final now = DateTime.now()]] تمام لأن القيمة بتتحسب مرة وقت التشغيل. إنما [[const now = DateTime.now()]] error لأن الوقت مش معروف وقت الترجمة.

و const مش على المتغير بس، على القيمة نفسها: [[const ['sat', 'sun']]] list متجمّدة بالكامل. وأي قيمتين const متطابقتين هما نفس الـ object في الذاكرة، فـ [[identical(const [1], const [1])]] بترجع true.

والفرق عن JavaScript: [[const]] في JS زي [[final]] هنا (المرجع ثابت والمحتوى يتغير). const بتاعة Dart أقوى.

النصوص: [[$name]] للمتغير، و [[$__{user.name}]] لأي expression، وعلامة تنصيص واحدة أو اتنين زي بعض، وتلات علامات لنص على كذا سطر.`,
            when: "final افتراضيًا لأي متغير محلي أو field. و const لأي ثابت (أرقام، ألوان، مسافات) ولأي widget كل اللي جواه ثابت. و var لما القيمة هتتغير فعلًا.",
            mistakes: R`تفتكر إن [[final list]] معناها list متجمّدة، وهي المرجع بس. وتكتب [[dynamic]] أو تسيب النوع يبقى dynamic من غير ما تاخد بالك ([[var x;]] من غير قيمة)، فتخسر فحص الأنواع. وفي الانترفيو: «إيه الفرق بين final و const؟» الإجابة الناقصة «الاتنين مبيتغيروش»، والصح إن const محسوبة وقت الترجمة ومتجمّدة بالكامل ومتشاركة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف متغيرات بالطرق الأربعة اللي في Dart ([[var]] و [[final]] و [[const]] والنوع الصريح)، ويوريك إن [[final]] بتثبّت المتغير بس، إنما [[const]] بتجمّد القيمة نفسها. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، وكل error تحت اتجرّب بتعديل الملف.

---

## ١. [[var]]: متغير عادي

~~~dart
  var count = 0;
  count++;
~~~

- [[var]] (variable) معناها «عرّف متغير، واستنتج نوعه من القيمة». القيمة [[0]] فالنوع بقى [[int]]، **وفضل int للأبد**. [[var]] مش زي [[var]] بتاعة JavaScript اللي تقبل أي حاجة بعدين.
- [[count++]] اختصار [[count = count + 1]]: زوّد واحد. فـ count بقت 1.

جربت أحط فيه نص بعدها ([[count = 'x';]]):

~~~text dart run
Error: A value of type 'String' can't be assigned to a variable of type 'int'.
~~~

---

## ٢. [[final]]: يتحط مرة واحدة

~~~dart
  final now = DateTime.now();
~~~

- [[final]] معناها «المتغير ده هياخد قيمة مرة واحدة ومش هيتغير بعدها». النوع هنا كمان بيتستنتج ([[DateTime]]).
- [[DateTime.now()]] بيرجّع الوقت دلوقتي. قيمته مش معروفة غير **وقت التشغيل** (runtime)، ودا مسموح مع final.

لو حاولت تغيّره:

~~~text dart run (بعد ما ضفت f = 2 لمتغير final)
Error: Can't assign to the final variable 'f'.
~~~

---

## ٣. [[const]]: ثابت وقت الترجمة

~~~dart
  const maxItems = 50;
~~~

[[const]] أقوى من final: القيمة لازم تبقى معروفة **وقت الترجمة** (compile time)، يعني قبل ما البرنامج يشتغل. [[50]] رقم مكتوب في الكود، فتمام.

جربت [[const now = DateTime.now();]] (التجربة اللي في «جرّب»):

~~~text dart run
Error: Cannot invoke a non-'const' constructor where a const expression is expected.
Try using a constructor or factory that is 'const'.
  const now = DateTime.now();
                       ^^^
~~~

والـ analyzer (اللي بيظهر في الـ editor) بيقول نفس المعنى في رسالتين: [[Const variables must be initialized with a constant value]] و [[The constructor being called isn't a const constructor]]. الوقت مستحيل يبقى معروف قبل التشغيل.

| | [[var]] | [[final]] | [[const]] |
|---|---|---|---|
| تغيّره بعدين؟ | آه | لأ | لأ |
| القيمة تتحسب وقت التشغيل؟ | آه | آه | لأ، لازم معروفة وقت الترجمة |
| المحتوى جوه list يتغير؟ | آه | آه | لأ، متجمّد |

---

## ٤. النوع الصريح

~~~dart
  String name = 'Ali';
  double price = 9.99;
~~~

بدل [[var]] كتبت النوع بنفسك. الاتنين نفس النتيجة، والفرق في القراية بس. والعرف في Dart: اكتب [[final]] أو [[var]] للمتغيرات المحلية وسيب الاستنتاج، والنوع الصريح في الـ fields وparameters الدوال.

---

## ٥. [[final]] مع list: المرجع ثابت والمحتوى لأ

~~~dart
  final tags = ['a'];
  tags.add('b');
~~~

- [[['a']]] أقواس مربعة = [[List]] (لستة). نوعها [[List<String>]].
- [[final]] ثبّتت **المتغير** tags: مينفعش تكتب [[tags = ['x'];]] بعدها.
- إنما اللستة نفسها object عادي يتعدّل، فـ [[add]] (ضيف عنصر في الآخر) عدّت. tags دلوقتي [[[a, b]]].

---

## ٦. [[const]] مع list: كل حاجة متجمّدة

~~~dart
  const days = ['sat', 'sun'];
  // days.add('mon'); // runtime error: Unsupported operation
~~~

شيلت أول [[//]] من السطر التاني (التعليق التاني بيفضل تعليق) وشغّلت. الكود **اترجم عادي** وضرب وهو شغال:

~~~text dart run
Unhandled exception:
Unsupported operation: Cannot add to an unmodifiable list
#0      UnmodifiableListMixin.add (dart:_internal/list.dart:112:5)
#1      main (file:///w/main.dart:11:8)
~~~

- [[Unhandled exception]]: حصل error ومحدش مسكه، فالبرنامج وقف.
- [[unmodifiable list]]: لستة متتعدلش. [[const]] عملت اللستة نفسها متجمّدة، مش المتغير بس.
- السطور اللي بتبدأ بـ [[#0]] و [[#1]] اسمها stack trace: مين نادى مين لحد الغلطة. [[main.dart:11:8]] = سطر ١١ عمود ٨ في ملفك.

> لاحظ: [[dart analyze]] على المثال الأصلي بيطلّع warning واحد: [[The value of the local variable 'days' isn't used]]، لأن days متعرّفة ومحدش بيستخدمها (السطر اللي بيستخدمها متعلّق). warning مش error، فالبرنامج بيشتغل.

### قيمتين const متطابقتين = object واحد

~~~dart
  print(identical(const [1], const [1]));
  print(identical([1], [1]));
~~~

~~~text الناتج
true
false
~~~

[[identical]] بتسأل «دول نفس الحاجة في الذاكرة؟». الـ const اتعملت مرة واحدة واتشاركت، والعادية اتعملت مرتين. ودا اللي Flutter بيستفيد منه لما تكتب [[const Text('Hi')]].

---

## ٧. سطر الطباعة

~~~dart
  print('$name paid $__{price * 2} at $now, max $maxItems, $count');
~~~

[[$name]] قيمة متغير، و [[$__{price * 2}]] حساب (لازم الأقواس). الناتج اللي طلعلي:

~~~text الناتج
Ali paid 19.98 at 2026-10-07 18:36:29.284777, max 50, 1
~~~

- [[19.98]] = 9.99 × 2.
- الوقت بصيغة [[سنة-شهر-يوم ساعة:دقيقة:ثانية.ميكروثانية]]، وهيطلعلك وقتك انت.
- [[1]] قيمة count بعد [[++]].

---

## الخلاصة

- [[final]] افتراضيًا، و [[var]] لو هتغيّر القيمة، و [[const]] للي معروف وقت الترجمة.
- [[final]] بتثبّت المتغير، و [[const]] بتجمّد القيمة كلها.
- [[const]] مع حاجة وقت تشغيل ([[DateTime.now()]]) = compile error. وتعديل const list = runtime error.`,
          lines: [
            "نقطة البداية لأي برنامج Dart.",
            "متغير عادي، نوعه int من القيمة، وينفع يتغير.",
            "يزيد واحد.",
            "[[final]]: يتحط مرة واحدة، وقيمته بتتحسب وقت التشغيل.",
            "[[const]]: قيمة ثابتة معروفة وقت الترجمة.",
            "نوع مكتوب صريح بدل var.",
            "رقم عشري.",
            "الـ list نفسها final، بس محتواها يتغير عادي.",
            "فبنضيف عنصر من غير مشكلة.",
            "[[const]] بتجمّد الـ list كلها: أي add هيضرب وقت التشغيل.",
            "[[$name]] جوه النص بتحط القيمة، و [[$__{...}]] لأي expression.",
            "قفلة main."
          ],
          sol: R`المثال زي ما هو بيطبع سطر واحد شبه [[Ali paid 19.98 at 2026-09-29 22:06:10.477578, max 50, 1]] (الوقت هيبقى وقتك انت).

لما تشيل التعليق من [[days.add('mon')]] الكود بيترجم عادي، بس وقت التشغيل بيضرب: [[Unsupported operation: Cannot add to an unmodifiable list]]. يعني const مجمّدة الـ list نفسها، مش المتغير بس. وقارنها بـ [[tags.add('b')]] اللي عدّت عادي لأن final بتثبّت المرجع بس.

و [[const now = DateTime.now();]] مش بيترجم أصلًا: الـ analyzer بيقول [[The constructor being called isn't a const constructor]] و [[Const variables must be initialized with a constant value]]. لأن الوقت مش معروف وقت الترجمة. لو لقيت نفسك بتكتب [[const]] وبيزعّق، غالبًا اللي محتاجه [[final]].`
        },
        {
          cmd: "null safety",
          title: "المتغير ده ممكن يبقى فاضي ولا لأ؟",
          desc: R`في Dart أي نوع مش بيقبل null إلا لو قلت. [[String name]] لازم فيه نص دايمًا، و [[String? name]] ممكن يبقى null. والـ compiler مش هيسيبك تستخدم متغير [[?]] كأنه موجود قبل ما تتأكد.

أدوات التعامل: [[?.]] ينادي لو مش null، و [[??]] قيمة بديلة، و [[??=]] يحط قيمة لو فاضي، و [[!]] «أنا متأكد إنه مش null» (ولو طلع null التطبيق يضرب). و [[late]] يعني «هتتحط بعدين قبل أول استخدام».`,
          example: R`String? findUser(int id) => id == 1 ? 'Ali' : null;

void main() {
  String? name = findUser(2);
  print(name?.length);
  print(name ?? 'Guest');
  if (name != null) print(name.toUpperCase());
  name ??= 'Unknown';
  print(name.length);
  final ali = findUser(1)!;
  print(ali.length);
  late final String token;
  token = 'abc';
  print(token);
}`,
          try: "امسح سطر [[name ??= 'Unknown';]] وشوف الـ compiler بيقول إيه على [[name.length]]. وبعدين غيّر [[findUser(1)!]] لـ [[findUser(5)!]] وشغّل: ده الـ crash اللي ! بيجيبه.",
          flag: "script",
          deep: {
            why: "أشهر crash في أي لغة: «null is not an object» أو NullPointerException، بيحصل في وقت التشغيل عند المستخدم. Dart بتنقل المشكلة لوقت الترجمة: لو ممكن يبقى null لازم تتعامل معاه قبل ما الكود يترجم أصلًا.",
            how: R`من Dart 3 الـ null safety إجباري و sound: لو النوع مش [[?]]، مستحيل القيمة تبقى null وقت التشغيل. والـ compiler بيستفيد من ده ويشيل فحوصات null من الكود المترجم، فالكود أسرع كمان.

[[String?]] في الحقيقة نوع أوسع من [[String]]: يا String يا Null. عشان كده تقدر تحط String في String? بس مش العكس.

flow analysis: لما تكتب [[if (name != null)]] الـ compiler بيعمل «promotion» جوه الـ if ويعامل name كـ String. بيشتغل على المتغيرات المحلية والـ parameters، ومن Dart 3.2 على الـ private final fields. إنما field عام في class مش بيتعمله promotion، لأن ممكن getter أو subclass يرجّع قيمة مختلفة كل مرة. الحل: انسخه في متغير محلي الأول ([[final n = this.name;]]).

[[!]] مش بيحوّل حاجة: بيعمل فحص وقت التشغيل ويرمي error لو null. يعني بترجع للمشكلة القديمة بإيدك.

[[late]] ليه استخدامين: متغير non-nullable هتديله قيمة بعدين (في [[initState]] مثلًا)، أو قيمة تقيلة تتحسب أول مرة تتقري بس ([[late final data = loadBigFile();]]). لو قريته قبل ما يتحط: [[LateInitializationError]].`,
            when: "كل يوم: أي حاجة جاية من API أو من المستخدم ممكن تكون null، فخليها [[?]] واتعامل معاها بـ [[??]] أو if. و late للـ controllers اللي بتتعمل في initState.",
            mistakes: R`تحط [[!]] في كل حتة عشان الـ errors تسكت: كده رجعت الـ crashes، بس المرة دي انت اللي كاتبها. وتستخدم [[late]] لحاجة ممكن فعلًا متتحطش، فالتطبيق يضرب في حالة نادرة: لو ممكن متبقاش موجودة خليها [[?]]. وفي الانترفيو: «إيه الفرق بين [[late String x]] و [[String? x]]؟» late معناه «هتبقى موجودة أكيد قبل الاستخدام، ولو لأ اضرب»، و ? معناه «ممكن فعلًا تبقى فاضية، والكود لازم يتعامل مع ده».`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالة بتدوّر على يوزر وممكن متلاقيهوش (ترجّع [[null]])، والبرنامج بيجرّب كل أداة في Dart للتعامل مع القيمة اللي ممكن تبقى فاضية: [[?]] و [[?.]] و [[??]] و [[if]] و [[??=]] و [[!]] و [[late]]. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأخطاء اتجربت بتعديل الملف.

---

## ١. الدالة: [[String?]] و [[=>]] و [[? :]]

~~~dart
String? findUser(int id) => id == 1 ? 'Ali' : null;
~~~

نفكّها من الشمال:

- [[String?]]: نوع اللي الدالة بترجّعه. [[String]] لوحدها معناها «نص أكيد». الـ [[?]] بعد النوع معناها «نص **أو** [[null]]». و [[null]] يعني «مفيش قيمة».
- [[findUser(int id)]]: اسم الدالة، وبتاخد parameter اسمه [[id]] نوعه [[int]].
- [[=>]] (arrow): اختصار لـ [[{ return ...; }]]. الدالة بترجّع قيمة الـ expression اللي بعده على طول.
- [[id == 1]]: [[==]] مقارنة («هل يساوي؟») بترجّع [[true]] أو [[false]]. مش زي [[=]] اللي بتحط قيمة.
- [[شرط ? أ : ب]]: اسمها ternary (conditional) operator. لو الشرط true خد [[أ]]، غير كده خد [[ب]]. فـ id بـ 1 يرجّع [['Ali']]، وأي رقم تاني يرجّع [[null]].

ودي أول حاجة null safety بتعملها: النوع **نفسه** بيقولك إن ممكن ميبقاش فيه قيمة. جربت أكتب [[String s = null;]]:

~~~text dart run
Error: A value of type 'Null' can't be assigned to a variable of type 'String'.
~~~

---

## ٢. متغير ممكن يبقى null

~~~dart
  String? name = findUser(2);
~~~

[[findUser(2)]] رجّعت [[null]]، و name نوعه [[String?]] فقبلها.

### من غير أي أداة: الـ compiler بيرفض

لو كتبت [[print(name.length);]] على طول (التجربة اللي في «جرّب»، لما تمسح سطر [[??=]]):

~~~text dart run
Error: Property 'length' cannot be accessed on 'String?' because it is potentially null.
Try accessing using ?. instead.
~~~

[[length]] طول النص. والـ compiler شايف إن name ممكن تبقى null، ومفيش طول لحاجة مش موجودة، فمش هيترجم. الـ editor بيقول نفس الكلام: [[The property 'length' can't be unconditionally accessed because the receiver can be 'null']].

---

## ٣. [[?.]]: نادي لو موجود بس

~~~dart
  print(name?.length);
~~~

[[?.]] اسمها null-aware access: «لو name مش null هات length، ولو null رجّع null على طول من غير ما تضرب».

~~~text الناتج
null
~~~

---

## ٤. [[??]]: قيمة بديلة

~~~dart
  print(name ?? 'Guest');
~~~

[[أ ?? ب]]: «لو أ مش null خده، لو null خد ب». ونوع النتيجة [[String]] عادي (مش ?) لأن البديل نص أكيد.

~~~text الناتج
Guest
~~~

---

## ٥. [[if (name != null)]]: الـ promotion

~~~dart
  if (name != null) print(name.toUpperCase());
~~~

- [[!=]] «مش بيساوي».
- جوه الـ if الـ compiler **فاهم** إن name أكيد مش null، فبيعامله كـ [[String]] وتنادي [[toUpperCase()]] (حوّل لحروف كبيرة) من غير أي ?. ودا اسمه type promotion.
- هنا name كانت null، فالسطر ده **مطبعش حاجة**.

---

## ٦. [[??=]]: حط قيمة لو فاضي

~~~dart
  name ??= 'Unknown';
  print(name.length);
~~~

- [[name ??= 'Unknown']] = «لو name null حط فيه [['Unknown']]، ولو فيه قيمة سيبه». نفس [[name = name ?? 'Unknown']].
- بعد السطر ده الـ compiler عارف إن name مستحيل يبقى null، فـ [[name.length]] عدّت من غير ?.

~~~text الناتج
7
~~~

[['Unknown']] ٧ حروف.

---

## ٧. [[!]]: «أنا متأكد»

~~~dart
  final ali = findUser(1)!;
  print(ali.length);
~~~

- [[!]] بعد قيمة اسمها null assertion (أو bang operator): «أنا متأكد إن دي مش null، عاملها كـ String».
- [[findUser(1)]] رجّعت [['Ali']] فعدّت، و ali نوعها [[String]]:

~~~text الناتج
3
~~~

### لما تطلع مش متأكد

غيّرت [[findUser(1)!]] لـ [[findUser(5)!]]. الكود **اترجم عادي**، واشتغل لحد السطر ده وضرب:

~~~text dart run
null
Guest
7
Unhandled exception:
Null check operator used on a null value
#0      main (file:///w/main.dart:10:26)
~~~

التلات سطور الأولانيين اتطبعوا عادي، والـ crash على سطر ١٠ عمود ٢٦ بالظبط: مكان الـ [[!]].

[[!]] مش بيحل حاجة: بيعمل فحص وقت التشغيل ولو لقى null يرمي error. يعني الـ compiler كان هيحميك، وانت قلتله «سيبني».

---

## ٨. [[late]]: هتتحط بعدين

~~~dart
  late final String token;
  token = 'abc';
  print(token);
~~~

- [[late]]: «المتغير ده نوعه [[String]] (مش null)، بس القيمة هتيجي بعدين، قبل أول ما حد يقراه».
- [[final]] معاها: يتحط مرة واحدة بس.
- [[token = 'abc';]] أول وآخر تعيين، وبعدين بنطبعه:

~~~text الناتج
abc
~~~

جربت الغلطتين:

| الغلطة | اللي حصل (dart run) |
|---|---|
| [[print(token)]] قبل ما يتحط (متغير محلي) | compile error: [[Late variable 'token' without initializer is definitely unassigned.]] |
| [[token = 'b';]] تاني بعد [['abc']] | compile error: [[Late final variable 'token' definitely assigned.]] |
| field [[late]] في class واتقرا قبل ما يتحط | runtime: [[LateInitializationError: Field 't' has not been initialized.]] |

يعني في المتغير المحلي الـ compiler بيلحقك، إنما في field جوه class الفحص بيتأجل لوقت التشغيل. ودا الاستخدام الحقيقي لـ late في Flutter: controller بيتعمل في [[initState]].

---

## الناتج الكامل

~~~text dart run
null
Guest
7
3
abc
~~~

خمس سطور مش ست: سطر الـ if متنفذش لأن name كانت null.

---

## الخلاصة

| الأداة | معناها | لو null |
|---|---|---|
| [[String?]] | ممكن تبقى null | مسموح |
| [[x?.prop]] | نادي لو موجود | يرجّع null |
| [[x ?? y]] | بديل | ياخد y |
| [[x ??= y]] | حط لو فاضي | x بقت y |
| [[if (x != null)]] | جوه الـ if بقت أكيدة | الـ if متتنفذش |
| [[x!]] | «متأكد» | crash وقت التشغيل |
| [[late]] | هتتحط قبل الاستخدام | error (compile أو runtime) |

> رتّب اختياراتك: [[?.]] و [[??]] و [[if]] الأول، و [[!]] آخر حاجة ولما تبقى متأكد فعلًا.`,
          lines: [
            "دالة بترجّع [[String?]]: يا نص يا null.",
            "البداية.",
            "[[?]] بعد النوع: المتغير ده مسموح يبقى null.",
            "[[?.]]: لو null يرجّع null بدل ما يضرب. هنا بيطبع null.",
            "[[??]]: لو null خد القيمة اللي بعدها. بيطبع Guest.",
            "جوه الـ if الـ compiler عارف إنه String، فتستخدمه عادي.",
            "[[??=]]: حط القيمة دي لو المتغير فاضي بس.",
            "من هنا name مش null أكيد، فـ [[.length]] من غير ?.",
            "[[!]]: «متأكد إنه مش null». لو طلع null هنا التطبيق يضرب.",
            "ali نوعه String عادي.",
            "[[late]]: المتغير هيتحط بعدين، والفحص بيتأجل لوقت التشغيل.",
            "أول وآخر مرة يتحط فيها (final).",
            "لو قريته قبل ما يتحط هنا الـ compiler هيمسكها (متغير محلي definitely unassigned)، إنما في field أو حالة مش مضمونة هيضرب [[LateInitializationError]] وقت التشغيل.",
            "قفلة."
          ],
          sol: R`المثال الأصلي بيطبع: [[null]] ثم [[Guest]] ثم [[7]] (طول Unknown) ثم [[3]] ثم [[abc]]. ومفيش سطر للـ if لأن name كانت null.

لما تمسح [[name ??= 'Unknown';]] الكود مش بيترجم: [[The property 'length' can't be unconditionally accessed because the receiver can be 'null']] (ولو بـ [[dart run]]: [[Property 'length' cannot be accessed on 'String?' because it is potentially null]]). الـ compiler شايف إن name لسه ممكن تبقى null، وبيقترح [[?.]] أو [[!]]. الصح هنا [[?.]] أو [[??]]، مش [[!]].

ولما تغيّر لـ [[findUser(5)!]] الكود بيترجم عادي، بس وقت التشغيل: [[Null check operator used on a null value]] على السطر ده بالظبط. دا الفرق كله: من غير ! الـ compiler كان هيحميك، ومع ! انت اللي قلت «متأكد» وطلعت مش متأكد.`
        },
        {
          cmd: "named parameters",
          title: "دالة بتاخد arguments بالاسم وبعضها إجباري",
          desc: R`في Dart فيه ٣ أنواع parameters: positional عادية بالترتيب، و named جوه [[{}]] بتتبعت بالاسم ([[greet(name: 'Ali')]])، و optional positional جوه أقواس مربعة. الـ named اختيارية إلا لو كتبت قبلها [[required]]، ولازم يا تبقى [[?]] يا ليها قيمة افتراضية.

دا اللي هتشوفه في كل widget في Flutter: [[Text('Hi', style: ..., maxLines: 2)]]. والـ arrow [[=>]] اختصار لدالة فيها expression واحدة بترجّع قيمتها.`,
          example: R`int add(int a, int b) => a + b;

String greet({required String name, String greeting = 'Hi', int? age}) {
  final suffix = age == null ? '' : ' ($age)';
  return '$greeting, $name$suffix';
}

String shout(String text, [int times = 1]) => text.toUpperCase() * times;

void main() {
  print(add(2, 3));
  print(greet(name: 'Ali'));
  print(greet(age: 30, name: 'Sara', greeting: 'Hello'));
  print(shout('hey', 2));
  final twice = (int x) => x * 2;
  print([1, 2, 3].map(twice).toList());
}`,
          try: "نادي [[greet()]] من غير name وشوف الـ error. وبعدين شيل [[required]] وشوف الـ compiler بيطلب إيه تاني.",
          flag: "script",
          deep: {
            why: "دالة فيها ٥ parameters بالترتيب زي [[createUser('Ali', 30, true, false, null)]] محدش يعرف يقراها: true دي إيه؟ الـ named بتخلي كل قيمة جنبها اسمها، و required بيخلي الـ compiler يمسك لو نسيت واحدة مهمة. ودا السبب إن كل widgets Flutter مكتوبة كده.",
            how: R`قواعد الـ named: اللي من غير [[required]] لازم يبقى ليه default أو نوعه [[?]]، لأن null safety مش هتسمح إنه يفضل من غير قيمة. والقيمة الافتراضية لازم تبقى const.

والفرق عن JavaScript: في JS بتعمل object وتفكّه ([[function greet({ name, age })]])، ودا object حقيقي بيتعمل في الذاكرة. في Dart الـ named parameters جزء من اللغة نفسها، فمفيش object ولا تكلفة، والـ compiler بيفحص الأسماء والأنواع.

الدوال في Dart objects عادية (first-class): تتخزن في متغير، وتتبعت لدالة، وترجع من دالة. ودا اللي بتستخدمه في [[onPressed: () { ... }]] في كل زرار. و closure زي JS: الدالة بتفتكر المتغيرات اللي حواليها.

[[=>]] مش زي JS بالظبط: بعده expression واحدة بس، مش block. [[() => print('x')]] تمام، إنما [[() => { ... }]] معناها حاجة تانية خالص (دالة بترجّع Set أو Map literal)، ودا فخ.`,
            when: "named لأي دالة فيها أكتر من ٢ parameters أو فيها bool. و positional للحاجات الواضحة من غير اسم ([[add(a, b)]]).",
            mistakes: R`تكتب [[() => { setState(...) }]] زي React فتتفاجئ بسلوك غريب أو warning: في Dart يا [[() => setState(...)]] يا [[() { setState(...); }]]. وتنسى إن named من غير required ومن غير default لازم تبقى [[?]]، فالـ compiler يزعّق. وتحط [[required]] على parameter ليه default: دا compile error أصلًا (Required named parameters can't have a default value)، يا required يا default، مش الاتنين.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف ٣ دوال، كل واحدة بنوع parameters مختلف (positional و named و optional positional)، وبعدين دالة من غير اسم متخزنة في متغير. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأخطاء اتجربت بتعديل الملف.

---

## ١. positional + [[=>]]

~~~dart
int add(int a, int b) => a + b;
~~~

- [[int]] في الأول: الدالة بترجّع رقم صحيح.
- [[(int a, int b)]]: two **positional** parameters، يعني بيتبعتوا بالترتيب. أول قيمة تروح a، والتانية b. وكل واحد ليه نوع.
- [[=> a + b]]: الـ arrow معناها «رجّع قيمة الـ expression دي». نفس [[{ return a + b; }]] بالظبط، بس في سطر.

> [[=>]] بعدها **expression واحدة** بس. مش زي arrow function في JavaScript اللي تقبل [[{ ... }]] كـ block.

---

## ٢. named parameters جوه [[{ }]]

~~~dart
String greet({required String name, String greeting = 'Hi', int? age}) {
~~~

الأقواس المعقوفة [[{ }]] **جوه** أقواس الـ parameters معناها: دول named، بيتبعتوا بالاسم مش بالترتيب. وفيهم ٣ أشكال:

| الـ parameter | الشكل | لو متبعتش |
|---|---|---|
| [[required String name]] | [[required]] = إجباري | compile error |
| [[String greeting = 'Hi']] | ليه قيمة افتراضية (default) | ياخد [['Hi']] |
| [[int? age]] | النوع nullable ([[?]]) | ياخد [[null]] |

وفيه قاعدة: named parameter **لازم** يبقى واحد من التلاتة دول. شيلت [[required]] من name وسيبت الباقي زي ما هو:

~~~text dart run
Error: The parameter 'name' can't have a value of 'null' because of its type 'String', but the implicit default value is 'null'.
Try adding either an explicit non-'null' default value or the 'required' modifier.
~~~

يعني: «لو محدش بعت name هيبقى null، والنوع [[String]] مش بيقبل null». فاختار: [[required]]، أو default، أو [[String?]].

---

## ٣. جسم greet

~~~dart
  final suffix = age == null ? '' : ' ($age)';
  return '$greeting, $name$suffix';
}
~~~

- [[شرط ? أ : ب]] (ternary): لو مفيش سن، suffix نص فاضي [['']]. لو فيه، [[' (30)']].
- [[return]]: رجّع القيمة دي من الدالة وخلّص. هنا محتاجينها لأن الجسم [[{ }]] مش [[=>]].
- [[$name$suffix]]: متغيرين لازقين في بعض جوه النص، كل [[$]] بتقف عند آخر الاسم.

---

## ٤. optional positional بين [[[ ]]]

~~~dart
String shout(String text, [int times = 1]) => text.toUpperCase() * times;
~~~

- [[text]] positional إجباري.
- [[[int times = 1]]]: الأقواس المربعة معناها «positional بس اختياري». لو متبعتش ياخد 1.
- [[text.toUpperCase()]]: النص بحروف كبيرة.
- [[* times]]: في Dart ضرب نص في رقم بيكرره. جربت [[print('ab' * 3);]] وطلع [[ababab]].

---

## ٥. النداءات

~~~dart
  print(add(2, 3));
  print(greet(name: 'Ali'));
  print(greet(age: 30, name: 'Sara', greeting: 'Hello'));
  print(shout('hey', 2));
~~~

~~~text الناتج
5
Hi, Ali
Hello, Sara (30)
HEYHEY
~~~

- [[name: 'Ali']]: الاسم، بعده [[:]]، بعده القيمة. greeting خد [['Hi']] و age خد null فمفيش قوسين.
- النداء التالت مكتوب بترتيب مختلف عن التعريف (age الأول) وشغال عادي: الـ named **الترتيب مش مهم فيها**.
- [[shout('hey', 2)]]: 2 راحت لـ times. ولو ناديت [[shout('hey')]] بيطبع [[HEY]] (جربتها).

### غلطتين الـ compiler بيمسكهم

| اللي كتبته | الرسالة (dart run) |
|---|---|
| [[greet()]] من غير name | [[Required named parameter 'name' must be provided.]] |
| [[greet(name: 'A', nick: 'b')]] اسم مش موجود | [[No named parameter with the name 'nick'.]] |

والـ editor (analyzer) بيقول الأولى كده: [[The named parameter 'name' is required, but there's no corresponding argument]]. ودي نفس الرسالة اللي هتشوفها لما تنسى [[child]] أو [[onPressed]] في widget.

---

## ٦. دالة في متغير

~~~dart
  final twice = (int x) => x * 2;
  print([1, 2, 3].map(twice).toList());
~~~

- [[(int x) => x * 2]]: دالة **من غير اسم** (anonymous function). بتاخد x وترجّع ضعفه. واتخزنت في متغير اسمه twice. الدوال في Dart قيم عادية زي الأرقام والنصوص.
- نوعها: [[print(twice.runtimeType)]] طلعت [[(int) => int]]، يعني «دالة بتاخد int وترجّع int».
- [[[1, 2, 3].map(twice)]]: [[map]] بتعدّي على كل عنصر في اللستة وتبعته للدالة. بعتنالها twice نفسها (من غير قوسين: الدالة مش نتيجتها).
- [[.toList()]]: map بترجّع Iterable، و toList بتحوّله List (درس «List و Map و Set»).

~~~text الناتج
[2, 4, 6]
~~~

### فخ [[=> { }]]

جربت [[final f = () => {1};]] و [[print(f())]]:

~~~text الناتج
{1}
~~~

مطبعش 1، رجّع **Set** فيها 1. لأن بعد [[=>]] الـ [[{ }]] بتتقري كـ Set أو Map literal مش block. عشان كده في Flutter بتكتب [[onPressed: () => doIt()]] أو [[onPressed: () { doIt(); }]]، مش الاتنين مع بعض.

---

## الخلاصة

| الشكل | التعريف | النداء |
|---|---|---|
| positional | [[f(int a)]] | [[f(1)]] بالترتيب |
| named | [[f({required int a, int b = 0, int? c})]] | [[f(a: 1)]] بالاسم، أي ترتيب |
| optional positional | [[f(int a, [int b = 1])]] | [[f(1)]] أو [[f(1, 2)]] |
| arrow | [[=> expression]] | expression واحدة بس |`,
          lines: [
            "دالة عادية بـ parameters بالترتيب، و [[=>]] يعني «رجّع القيمة دي».",
            "named جوه [[{}]]: [[name]] إجباري، و [[greeting]] ليه قيمة افتراضية، و [[age]] ممكن null.",
            "لو فيه سن نحطه بين قوسين.",
            "رجّع النص.",
            "قفلة الدالة.",
            "optional positional بين أقواس مربعة: [[times]] ممكن متتبعتش وتبقى 1.",
            "البداية.",
            "5.",
            "Hi, Ali: الباقي خد الافتراضي.",
            "الترتيب مش مهم في الـ named. بيطبع Hello, Sara (30).",
            "HEYHEY.",
            "دالة من غير اسم متخزنة في متغير، زي arrow function في JS.",
            "الدوال بتتبعت لدوال تانية: [2, 4, 6].",
            "قفلة."
          ],
          sol: R`المثال بيطبع: [[5]] ثم [[Hi, Ali]] ثم [[Hello, Sara (30)]] ثم [[HEYHEY]] ثم [[[2, 4, 6]]].

[[greet()]] من غير name مش بيترجم: [[The named parameter 'name' is required, but there's no corresponding argument]]. الغلط اتمسك قبل التشغيل، ودا اللي بيحصل لما تنسى [[child]] أو [[onPressed]] في widget.

ولما تشيل [[required]] من غير ما تغيّر حاجة تانية، الغلط بيتنقل لتعريف الدالة نفسها: [[The parameter 'name' can't have a value of 'null' because of its type, but the implicit default value is 'null']]. يعني الـ compiler بيقولك اختار واحدة من تلاتة: [[required]]، أو قيمة افتراضية ([[String name = 'Guest']])، أو تخلي النوع [[String?]]. ناس كتير بتتوقع إن شيل required هيعدّي عادي ويبقى name فاضي، ودا مش بيحصل مع null safety.`
        },
        {
          cmd: "List و Map و Set",
          title: "القوايم والقواميس والمجموعات وإزاي تلف عليها",
          desc: R`[[List]] زي array في JS، و [[Map]] زي object أو Map (مفتاح وقيمة)، و [[Set]] قيم من غير تكرار. والنوع جوه أقواس: [[List<String>]] و [[Map<String, int>]].

وفيه حاجة هتستخدمها كتير في Flutter: [[if]] و [[for]] جوه الـ list نفسها، و [[...]] (spread) تفك list جوه list. ودي اللي بتبني بيها لستة widgets.`,
          example: R`void main() {
  final names = ['Ali', 'Sara', 'Omar'];
  names.add('Mona');
  final long = names.where((n) => n.length > 3).toList();
  final upper = names.map((n) => n.toUpperCase()).toList();
  final prices = {'tea': 10, 'coffee': 25};
  prices['juice'] = 15;
  print(prices['milk'] ?? 0);
  final tags = ['dart', 'flutter', 'dart'].toSet();
  final isAdmin = true;
  final menu = ['Home', if (isAdmin) 'Admin', for (final n in names) 'User $n', ...long];
  for (final entry in prices.entries) print('$__{entry.key}: $__{entry.value}');
  print('$upper $tags $menu');
}`,
          try: "غيّر [[isAdmin]] لـ false وشوف menu. وبعدين اشيل [[.toList()]] من سطر [[upper]] واطبعه: هتلاقي شكل مختلف (Iterable مش List).",
          flag: "script",
          deep: {
            why: "كل شاشة تقريبًا فيها لستة: منتجات، رسايل، إعدادات. ولازم تفلترها وتحوّلها لـ widgets. الأدوات دي هي اللي هتكتب بيها ده من غير loops طويلة.",
            how: R`[[where]] و [[map]] مش بيرجّعوا List، بيرجّعوا [[Iterable]] lazy: مفيش حاجة بتتحسب لحد ما حد يقرا. عشان كده [[toList()]] في الآخر. ودا مختلف عن JS اللي فيها filter و map بيرجّعوا array على طول. وخد بالك: Iterable لو لفّيت عليه مرتين، الدالة بتتنفذ مرتين.

قراءة مفتاح مش موجود من Map بترجّع null (عشان كده نوع [[prices['tea']]] هو [[int?]] مش int)، مش error. و [[containsKey]] لو محتاج تفرّق بين «مش موجود» و «موجود وقيمته null».

collection if و for: [[if (isAdmin) 'Admin']] جوه الـ list بيحط العنصر لو الشرط صح بس. وفي Flutter بتكتب [[children: [Header(), if (loading) Spinner(), for (final p in products) ProductTile(p)]]] بدل ما تبني list بـ add. ومن Dart 3.8 تقدر تكتب [[?item]] جوه الـ list فيتحط لو مش null بس.

وأهم دوال تانية: [[firstWhere]] و [[any]] و [[every]] و [[fold]] (زي reduce بقيمة بداية) و [[sort]] (بيرتّب في مكانها زي JS).`,
            when: "أي بيانات فيها أكتر من عنصر. و Set لما التكرار ممنوع (tags، ids متختارة)، و Map للبحث بالمفتاح.",
            mistakes: R`تنسى [[toList()]] وتبعت Iterable لحاجة مستنية List فيطلع type error. وتعدّل list وانت بتلف عليها بـ for فيضرب [[Concurrent modification]]. وتستخدم [[list.map(...)]] عشان side effects ([[print]] مثلًا) ومتعملش toList، فمفيش حاجة بتتنفذ أصلًا لأنه lazy: استخدم for أو [[forEach]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل لستة أسماء ويفلترها ويحوّلها، وقاموس أسعار يضيف فيه ويقرا منه، و Set بتشيل التكرار، وفي الآخر لستة بتتبني بـ [[if]] و [[for]] و [[...]] جواها. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، وكل [[runtimeType]] تحت طبعته فعلًا.

---

## ١. [[List]]: لستة

~~~dart
  final names = ['Ali', 'Sara', 'Omar'];
  names.add('Mona');
~~~

- الأقواس المربعة [[[ ]]] = List، والعناصر بالترتيب وبيتعدّوا من 0 ([[names[0]]] = Ali).
- النوع اتستنتج من القيم: [[print(names.runtimeType)]] طلع [[List<String>]]. الـ [[<String>]] اسمها type argument: «لستة **نصوص**». لو حاولت تضيف رقم فيها الـ compiler يرفض.
- [[final]] بتثبّت المتغير بس، فـ [[add]] (ضيف في الآخر) شغالة. names بقت ٤.

---

## ٢. [[where]]: فلتر

~~~dart
  final long = names.where((n) => n.length > 3).toList();
~~~

من جوه لبرة:

1. [[(n) => n.length > 3]]: دالة من غير اسم، بتاخد اسم n وترجّع true لو طوله أكتر من ٣.
2. [[names.where(...)]]: بتسيب العناصر اللي الدالة رجّعت لها true بس. زي [[filter]] في JavaScript.
3. [[.toList()]]: where مش بترجّع List، بترجّع [[Iterable]]. ودي ليها كلام تحت.

النتيجة: [[[Sara, Omar, Mona]]] (Ali ٣ حروف بس).

### الـ Iterable كسلان (lazy)

جربت where بدالة فيها print ومن غير toList:

~~~text الناتج
before
check Ali
check Sara
check Omar
[Sara, Omar]
~~~

[[before]] اتطبعت **الأول**، والفحص محصلش غير لما [[toList()]] طلبت النتيجة. يعني where و map بيجهزوا «وصفة» ومش بينفّذوها لحد ما حد يقرا.

---

## ٣. [[map]]: حوّل كل عنصر

~~~dart
  final upper = names.map((n) => n.toUpperCase()).toList();
~~~

[[map]] بتعدّي على كل عنصر وتحطه مكانه نتيجة الدالة. فـ upper = [[[ALI, SARA, OMAR, MONA]]].

ومن غير [[toList()]] (التجربة التانية في «جرّب»):

~~~text الناتج
(ALI, SARA, OMAR, MONA)
~~~

أقواس عادية مش مربعة: ده شكل طباعة الـ Iterable. ونوعه الحقيقي [[MappedListIterable<String, String>]]. ولو حطيته في متغير نوعه [[List<String>]]:

~~~text dart run
Error: A value of type 'Iterable<String>' can't be assigned to a variable of type 'List<String>'.
~~~

---

## ٤. [[Map]]: مفتاح وقيمة

~~~dart
  final prices = {'tea': 10, 'coffee': 25};
  prices['juice'] = 15;
  print(prices['milk'] ?? 0);
~~~

- [[{ مفتاح: قيمة, ... }]] = Map. النوع [[Map<String, int>]]: المفاتيح نصوص والقيم أرقام. (طبعت runtimeType وطلع [[_Map<String, int>]]: الـ [[_]] في الأول معناها class داخلي جوه Dart بينفّذ Map.)
- [[prices['juice'] = 15]]: الأقواس المربعة بالمفتاح. لو المفتاح موجود بتعدّل قيمته، لو مش موجود بتضيفه.
- [[prices['milk']]]: مفتاح مش موجود **مش error**، بيرجّع [[null]]. عشان كده نوع القراية [[int?]].
- [[?? 0]]: لو null خد 0.

~~~text الناتج
0
~~~

---

## ٥. [[Set]]: من غير تكرار

~~~dart
  final tags = ['dart', 'flutter', 'dart'].toSet();
~~~

[[toSet()]] بتحوّل اللستة Set، و Set مبتقبلش نفس القيمة مرتين، فـ [['dart']] التانية اتشالت: [[{dart, flutter}]]. والـ Set بتتكتب بـ [[{ }]] من غير [[:]].

جربت [[add]] على Set: إضافة قيمة موجودة رجّعت [[false]] (متضافتش)، وقيمة جديدة رجّعت [[true]].

---

## ٦. collection if و for و spread

~~~dart
  final isAdmin = true;
  final menu = ['Home', if (isAdmin) 'Admin', for (final n in names) 'User $n', ...long];
~~~

اللستة دي بتتبني من ٤ حتت، بالترتيب:

| الحتة | بتعمل إيه | اللي اتحط |
|---|---|---|
| [['Home']] | عنصر عادي | Home |
| [[if (isAdmin) 'Admin']] | **collection if**: العنصر يتحط لو الشرط true بس | Admin |
| [[for (final n in names) 'User $n']] | **collection for**: عنصر لكل اسم | User Ali ... User Mona |
| [[...long]] | **spread**: النقط التلاتة بتفك لستة long وتحط عناصرها هنا | Sara, Omar, Mona |

مفيش أقواس [[{ }]] بعد if و for هنا، ومفيش [[;]]: دول جزء من اللستة مش جمل. ودا الشكل اللي هتبني بيه [[children: [...]]] في Flutter.

ولما [[isAdmin]] تبقى [[false]] (أول تجربة)، Admin بس بتختفي. والـ analyzer بيقول [[Dead code]] على [['Admin']] لأنه شايف إن الشرط دايمًا false: warning مش error.

---

## ٧. لف على الـ Map

~~~dart
  for (final entry in prices.entries) print('$__{entry.key}: $__{entry.value}');
~~~

- [[prices.entries]]: الـ Map كأزواج، كل زوج نوعه [[MapEntry<String, int>]] (اتطبع كده: [[MapEntry(tea: 10)]]).
- [[for (final entry in ...)]]: لف على كل زوج، واحد واحد.
- [[entry.key]] المفتاح و [[entry.value]] القيمة. ولأنهم فيهم نقطة لازم [[$__{ }]] جوه النص.

~~~text الناتج
tea: 10
coffee: 25
juice: 15
~~~

الترتيب هو ترتيب الإضافة: Map في Dart افتراضيًا بتحافظ عليه.

---

## ٨. الطباعة الأخيرة

~~~dart
  print('$upper $tags $menu');
~~~

~~~text الناتج
[ALI, SARA, OMAR, MONA] {dart, flutter} [Home, Admin, User Ali, User Sara, User Omar, User Mona, Sara, Omar, Mona]
~~~

List بـ [[[ ]]]، و Set بـ [[{ }]]، و Iterable (لو نسيت toList) بـ [[( )]]. من شكل الأقواس في اللوج تعرف النوع.

---

## الخلاصة

| النوع | الشكل | مميزاته |
|---|---|---|
| [[List<T>]] | [[[a, b]]] | مرتّبة، بالـ index، تقبل تكرار |
| [[Map<K, V>]] | [[{k: v}]] | بالمفتاح، والمفتاح الناقص = null |
| [[Set<T>]] | [[{a, b}]] | من غير تكرار |

> [[where]] و [[map]] بيرجّعوا Iterable lazy: كمّلهم بـ [[toList()]] لو محتاج List.`,
          lines: [
            "البداية.",
            "List<String>، النوع اتستنتج.",
            "ضيف في الآخر.",
            "[[where]] زي filter في JS، و [[toList()]] عشان ترجع List.",
            "[[map]] بيحوّل كل عنصر.",
            "Map<String, int>.",
            "ضيف أو عدّل مفتاح.",
            "مفتاح مش موجود بيرجّع null، فـ [[??]] تدّي بديل: 0.",
            "Set: dart المكررة بتتشال.",
            "متغير للشرط اللي جاي.",
            "collection if و for و spread جوه الـ list نفسها.",
            "لف على الـ Map مفتاح وقيمة.",
            "[ALI, SARA, OMAR, MONA] و {dart, flutter} والـ menu.",
            "قفلة."
          ],
          sol: R`الأصلي آخر سطر فيه: [[[ALI, SARA, OMAR, MONA] {dart, flutter} [Home, Admin, User Ali, User Sara, User Omar, User Mona, Sara, Omar, Mona]]]. ولما [[isAdmin]] تبقى false، [[Admin]] بتختفي من menu بس والباقي زي ما هو: [[[Home, User Ali, ...]]]. (والـ analyzer ممكن يقولك [[Dead code]] على [['Admin']] لأنه شايف إن الشرط دايمًا false، ودا طبيعي في التجربة دي.)

ولما تشيل [[.toList()]] من سطر upper، نفس الأسماء بتطبع بين أقواس عادية بدل المربعة: [[(ALI, SARA, OMAR, MONA)]]. دا شكل طباعة الـ Iterable: لسه مش List، وكل مرة تلف عليه الـ map بتتنفذ من جديد. لو بعته لحاجة مستنية [[List<String>]] الـ compiler هيرفض.`
        }
      ]
    }
]);
