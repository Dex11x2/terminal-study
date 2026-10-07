// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "Dart: الأخطاء والأنواع المتقدمة",
      l: 1,
      n: "exceptions صح، و generics، و mixins، و extensions، و enums فيها بيانات: الحاجات اللي هتقابلها في كود أي package",
      items: [
        {
          cmd: "try و on و rethrow",
          title: "تمسك نوع الخطأ اللي تعرف تتعامل معاه بس",
          desc: R`في Dart فيه نوعين حاجات بتترمي: [[Exception]] يعني حاجة متوقعة ممكن تحصل (النت فاصل، JSON بايظ، السيرفر رجّع 404)، و [[Error]] يعني غلطة في الكود نفسه (index بره الـ list، [[!]] على null، cast غلط). الأولى بتمسكها وتتعامل معاها، والتانية بتصلّحها في الكود.

[[on FormatException catch (e)]] بيمسك نوع معين بس، و [[catch (e, st)]] بيدّيك الـ stack trace كمان. و [[rethrow]] بيرمي نفس الخطأ تاني بعد ما تسجّله مثلًا، و [[finally]] بيتنفذ في كل الأحوال. وتعمل exception خاص بيك بـ class بيعمل [[implements Exception]].`,
          example: R`class ApiException implements Exception {
  ApiException(this.statusCode, this.message);
  final int statusCode;
  final String message;
  @override
  String toString() => 'ApiException($statusCode): $message';
}

int parseAge(String raw) {
  final age = int.parse(raw);
  if (age < 0) throw ApiException(422, 'age must be positive');
  return age;
}

int saveAge(String raw) {
  try {
    return parseAge(raw);
  } on ApiException {
    print('log: rejected $raw');
    rethrow;
  }
}

void main() {
  for (final raw in ['30', 'abc', '-5']) {
    try {
      print('age $__{saveAge(raw)}');
    } on FormatException catch (e) {
      print('not a number: $__{e.source}');
    } on ApiException catch (e, st) {
      print('invalid: $__{e.message} $__{e.statusCode}');
      print(st.toString().split('\n').first);
    } finally {
      print('checked $raw');
    }
  }
}`,
          try: "شغّل المثال بـ [[dart run]] واقرا الناتج. بعدين امسح سطر [[rethrow;]] من [[saveAge]] وشوف الـ compiler بيقول إيه، وحط مكانه [[return -1;]] وشغّل تاني: إيه اللي اتغير في ناتج [['-5']]؟ وآخر حاجة: ضيف [['']] (نص فاضي) للـ list وقول هيطبع إيه قبل ما تشغّل.",
          flag: "script",
          deep: {
            why: "لو مسكت كل حاجة بـ [[catch (e)]] هتبلع الأخطاء اللي المفروض تكسّر التطبيق وانت بتطوّر، زي null أو index غلط، وتفضل الشاشة فاضية من غير ما تعرف ليه. ولو مسكتش حاجة خالص، أول مرة النت يقطع التطبيق هيقع. الحل في النص: امسك الأنواع اللي تعرف تعمل معاها حاجة مفيدة (تعرض رسالة، تعيد المحاولة)، وسيب الباقي يطلع.",
            how: R`[[throw]] في Dart بيرمي أي object، حتى String ([[throw 'oops']])، بس دا ممنوع عرفًا والـ lint [[only_throw_errors]] بيمسكه. ارمي حاجة بتعمل implements لـ Exception أو extends لـ Error.

ترتيب الـ [[on]] مهم: أول واحد يطابق يكسب، فالأنواع المحددة الأول والعامة ([[on Exception]]) في الآخر. و [[catch (e)]] من غير [[on]] بيمسك أي حاجة، حتى الـ Errors.

الفرق في الـ stack trace: [[rethrow]] بيحافظ على الـ stack trace الأصلي (من [[parseAge]] زي ما بيطبع المثال). إنما [[throw e]] جوه الـ catch بيبدأ trace جديد من السطر ده، فتضيع مكان المشكلة الحقيقي. ولو عايز ترمي نوع تاني وتحافظ على الـ trace: [[Error.throwWithStackTrace(MyException(), st)]].

الـ exceptions الجاهزة اللي هتقابلها: [[FormatException]] (من [[int.parse]] و [[jsonDecode]] و [[DateTime.parse]])، و [[TimeoutException]] (من [[.timeout()]])، و [[SocketException]] و [[HttpException]] من dart:io، و [[ClientException]] من package http. والـ Errors: [[RangeError]] و [[TypeError]] و [[StateError]] و [[ArgumentError]] و [[UnimplementedError]].

وفي async نفس الكلام بالظبط: [[try]] حوالين [[await]]، والـ Future الفاشل بيتمسك بـ [[on]] زي أي exception عادي (درس async و await).

جوه Flutter: أي exception مش ممسوك في build أو في callback بيوصل لـ [[FlutterError.onError]]، وفي debug بيطلع الشاشة الحمرا. والأخطاء اللي بره الـ framework (Futures مش ممسوكة) بتروح لـ [[PlatformDispatcher.instance.onError]]. الاتنين دول اللي بتوصّل فيهم Sentry أو Crashlytics.`,
            when: "أي كود بيكلم حاجة بره تطبيقك: شبكة، ملفات، parsing، تخزين. وعرّف exception خاص (ApiException، NotFoundException) لما الطبقة اللي فوق محتاجة تفرّق بين الحالات وتعرض رسالة مختلفة لكل واحدة.",
            mistakes: R`[[catch (e) {}]] فاضي: الخطأ اختفى ومحدش هيعرف. على الأقل سجّله. وتمسك [[Error]] (زي [[on TypeError]]) عشان تخبّي bug بدل ما تصلّحه. و [[throw e]] بدل [[rethrow]] فيضيع الـ stack trace. وتعمل [[class MyError extends Error]] لحاجة متوقعة زي «المستخدم مش موجود»: دي Exception مش Error. وسؤال انترفيو: «إيه الفرق بين Exception و Error في Dart؟» Exception حالة متوقعة المفروض تتمسك، و Error غلطة برمجية المفروض تتصلّح، والـ linter والـ packages (زي Riverpod اللي مبيعملش retry لو الخطأ Error) بيعتمدوا على الفرق ده.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف exception خاص اسمه [[ApiException]]، ودالة [[parseAge]] بتحوّل نص لسن وممكن ترمي نوعين أخطاء، ودالة في النص [[saveAge]] بتسجّل نوع واحد منهم وترميه تاني لفوق. و [[main]] بتجرّب ٣ نصوص وتمسك كل نوع لوحده. كل اللي تحت اتشغّل بـ [[dart run]] في [[docker run --rm dart:stable]] (Dart 3.13.5)، ومعاه تجارب «جرّب» كلها.

---

## ١. الـ exception بتاعك

~~~dart
class ApiException implements Exception {
  ApiException(this.statusCode, this.message);
  final int statusCode;
  final String message;
  @override
  String toString() => 'ApiException($statusCode): $message';
}
~~~

- [[class ApiException]]: نوع جديد عادي (درس class).
- [[implements Exception]]: [[Exception]] في Dart interface فاضي، مفيهوش methods لازم تكتبها. إنك تعمله implements معناه «النوع ده حالة متوقعة ممكن تتمسك»، ودا اللي بيفرّقه عن [[Error]] (غلطة في الكود).
- [[ApiException(this.statusCode, this.message);]]: constructor بيحط القيمتين في الـ fields على طول.
- [[statusCode]] رقم زي 404 أو 422 (422 = Unprocessable Content: البيانات وصلت بس قيمتها مش مقبولة)، و [[message]] النص.
- [[@override String toString()]]: [[print]] بتنادي [[toString]]. من غيرها كان هيطبع [[Instance of 'ApiException']].

جربت [[print(1 is Exception)]] و [[print(FormatException('x') is Exception)]] و [[print(RangeError('x') is Error)]]:

~~~text الناتج
false
true
true
~~~

يعني [[FormatException]] من نوع Exception، و [[RangeError]] من نوع Error.

---

## ٢. دالة بترمي: [[parseAge]]

~~~dart
int parseAge(String raw) {
  final age = int.parse(raw);
  if (age < 0) throw ApiException(422, 'age must be positive');
  return age;
}
~~~

فيها مكانين ممكن يرموا:

| السطر | يرمي إيه | إمتى |
|---|---|---|
| [[int.parse(raw)]] | [[FormatException]] | النص مش رقم ([['abc']] أو [['']]) |
| [[throw ApiException(...)]] | [[ApiException]] | الرقم سالب |

- [[throw]]: بيوقف الدالة فورًا ويرمي الـ object لفوق، لحد أول [[try]] يمسكه. لو مفيش، البرنامج يقع.
- [[int.parse]] نفسه بيرمي FormatException. جربت أمسكه وأطبع تفاصيله:

~~~text الناتج
message=Invalid radix-10 number source=abc
FormatException: Invalid radix-10 number (at character 1)
abc
^
~~~

[[radix-10]] يعني «رقم بالنظام العشري». و [[e.source]] هو النص اللي فشل، ودا اللي المثال بيطبعه.

---

## ٣. الطبقة اللي في النص: [[saveAge]]

~~~dart
int saveAge(String raw) {
  try {
    return parseAge(raw);
  } on ApiException {
    print('log: rejected $raw');
    rethrow;
  }
}
~~~

- [[try { ... }]]: «جرّب الكود ده، ولو رمى حاجة شوف الـ on اللي تحت».
- [[on ApiException]]: امسك النوع ده **بس**. الـ FormatException مش هيتمسك هنا، هيعدّي لفوق لوحده. ومفيش [[catch (e)]] لأننا مش محتاجين الـ object نفسه، بنسجّل بس.
- [[rethrow;]]: ارمي **نفس** الخطأ تاني لفوق، بنفس الـ stack trace. يعني الطبقة دي سجّلت وسابت القرار للي فوقها.

### ليه [[rethrow]] لازم هنا؟

جربت أمسح السطر. [[dart run]] رفض يترجم:

~~~text dart run
t1a.dart:15:5: Error: A non-null value must be returned since the return type 'int' doesn't allow null.
int saveAge(String raw) {
    ^
~~~

و [[dart analyze]] بيقول نفس المعنى بصيغة تانية (ودي اللي هتشوفها في VS Code):

~~~text dart analyze
error - The body might complete normally, causing 'null' to be returned, but the return type, 'int', is a potentially non-nullable type. Try adding either a return or a throw statement at the end. - body_might_complete_normally
~~~

الدالة وعدت ترجّع [[int]]. لو الـ [[on]] خلص من غير return ولا throw، الدالة هتخلص فاضية (null)، والـ null safety مانعها.

---

## ٤. [[main]]: كل نوع ليه تصرّف

~~~dart
  for (final raw in ['30', 'abc', '-5']) {
    try {
      print('age $__{saveAge(raw)}');
    } on FormatException catch (e) {
      print('not a number: $__{e.source}');
    } on ApiException catch (e, st) {
      print('invalid: $__{e.message} $__{e.statusCode}');
      print(st.toString().split('\n').first);
    } finally {
      print('checked $raw');
    }
  }
~~~

- [[for (final raw in [...])]]: لف على ٣ نصوص: سليم، ومش رقم، وسالب. والـ try **جوه** الـ loop، فلو واحد فشل الباقي يكمّل.
- [[on FormatException catch (e)]]: [[catch (e)]] بيدّيك الـ object اللي اترمى في متغير اسمه [[e]] (أي اسم).
- [[on ApiException catch (e, st)]]: المتغير التاني [[st]] هو الـ **stack trace**: لستة الدوال اللي كانت شغالة لما الخطأ اترمى، من الأحدث للأقدم.
- [[st.toString().split('\n').first]]: حوّل الـ trace لنص، وقسّمه سطور ([[\n]] = سطر جديد)، وخد أول سطر بس.
- [[finally]]: بيتنفذ **في كل الحالات**: نجح، أو اتمسك خطأ، أو حتى لو خطأ عدّى لفوق من غير ما يتمسك. مكانه أي تنضيف لازم يحصل (تقفل ملف، توقف loading).
- ترتيب الـ [[on]]: أول واحد يطابق هو اللي بيكسب. ولو كتبت [[catch (e)]] من غير [[on]] بيمسك أي حاجة، حتى الـ Errors. جربت [[print(list[5])]] على لستة فيها ٣ عناصر وتحتها [[on Exception]] ثم [[catch (e)]]: الأولى معدّتهوش لأن RangeError مش Exception، والتانية مسكته:

~~~text الناتج
caught RangeError: RangeError (length): Invalid value: Not in inclusive range 0..2: 5
~~~

---

## ٥. الناتج كله

~~~text dart run
age 30
checked 30
not a number: abc
checked abc
log: rejected -5
invalid: age must be positive 422
#0      parseAge (file:///w/l1.dart:11:16)
checked -5
~~~

نقرا الـ ٣ حالات:

| النص | اللي حصل | اتطبع |
|---|---|---|
| [['30']] | مفيش خطأ | [[age 30]] ثم [[checked 30]] |
| [['abc']] | FormatException من int.parse، عدّى من saveAge لأنها مش بتمسكه | [[not a number: abc]] ثم [[checked abc]] |
| [['-5']] | ApiException: saveAge سجّلت ورمته تاني، و main مسكته | [[log: rejected -5]] ثم [[invalid: ...]] ثم سطر الـ trace ثم [[checked -5]] |

### سطر الـ trace: [[#0 parseAge (file:///w/l1.dart:11:16)]]

- [[#0]]: أول دالة في اللستة، يعني المكان اللي الخطأ اترمى فيه بالظبط.
- [[parseAge]]: اسم الدالة، مش saveAge. دا لأن [[rethrow]] حافظ على الـ trace الأصلي.
- [[l1.dart:11:16]]: الملف، والسطر 11 (سطر الـ throw في ملفي)، والعمود 16 (مكان كلمة throw في السطر).

### نفس الكلام بـ [[throw e]] بدل [[rethrow]]

جربت أغيّر [[on ApiException]] لـ [[on ApiException catch (e)]] و [[rethrow;]] لـ [[throw e;]]. كله زي ما هو ماعدا سطر الـ trace:

~~~text الناتج
#0      saveAge (file:///w/t1d.dart:20:5)
~~~

بقى بيشاور على [[saveAge]]، يعني على سطر [[throw e]] نفسه. المكان الحقيقي للمشكلة ([[parseAge]]) ضاع. عشان كده [[rethrow]] دايمًا.

---

## ٦. التجارب في «جرّب»

### [[return -1;]] بدل [[rethrow;]]

بيترجم عادي، بس آخر حالة بقت:

~~~text الناتج
log: rejected -5
age -1
checked -5
~~~

الخطأ «اتبلع»: [[main]] فاكرة إن كله تمام وطبعت سن [[-1]]. دا أخطر من إن التطبيق يقع، لأن محدش هياخد باله.

### نص فاضي [['']]

ضفته للستة. [[int.parse('')]] بيرمي FormatException، و [[e.source]] نص فاضي:

~~~text آخر سطرين
not a number:
checked
~~~

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| exception خاص | [[class X implements Exception]] | حالة متوقعة ليها بيانات |
| مسك نوع | [[on FormatException catch (e)]] | النوع ده بس، والباقي يعدّي لفوق |
| الـ trace | [[catch (e, st)]] | فين الخطأ حصل |
| ارمي تاني | [[rethrow;]] | نفس الخطأ ونفس الـ trace |
| دايمًا | [[finally]] | بيتنفذ في كل الحالات |

> Exception تمسكه وتتعامل معاه، و Error تصلّحه في الكود. ومتكتبش [[catch (e) {}]] فاضي.`,
          lines: [
            "exception خاص بيك: [[implements Exception]] يعني «حالة متوقعة».",
            "constructor بيحط الكود والرسالة.",
            "كود HTTP زي 404 أو 422.",
            "رسالة تتعرض أو تتسجل.",
            "بتعيد تعريف toString...",
            "...عشان لما يتطبع يبقى مفهوم.",
            "قفلة الـ class.",
            "دالة ممكن ترمي نوعين أخطاء.",
            "[[int.parse]] بيرمي [[FormatException]] لو النص مش رقم.",
            "[[throw]]: ارمي الـ exception بتاعك لو الرقم سالب.",
            "رجّع السن.",
            "قفلة.",
            "دالة في النص بين الـ UI والـ parsing.",
            "جرّب.",
            "نادي الدالة اللي ممكن ترمي.",
            "[[on ApiException]] من غير catch: مش محتاج المتغير هنا.",
            "سجّل...",
            "...وارمي نفس الخطأ تاني لفوق بنفس الـ stack trace.",
            "قفلة الـ on.",
            "قفلة الدالة.",
            "البداية.",
            "جرّب ٣ قيم: سليمة، ومش رقم، وسالبة.",
            "try لكل قيمة لوحدها.",
            "age 30 للأولى.",
            "[[on FormatException]]: يمسك النوع ده بس، و [[e.source]] النص اللي فشل.",
            "not a number: abc.",
            "النوع التاني. [[st]] الـ stack trace.",
            "invalid: age must be positive 422.",
            "أول سطر في الـ trace: بيشاور على [[parseAge]] مش [[saveAge]]، بفضل rethrow.",
            "[[finally]]: بيتنفذ سواء نجح أو فشل.",
            "checked مع كل قيمة.",
            "قفلة try.",
            "قفلة الـ loop.",
            "قفلة main."
          ],
          sol: R`الناتج بالترتيب: [[age 30]] ثم [[checked 30]]، وبعدين [[not a number: abc]] ثم [[checked abc]]، وبعدين [[log: rejected -5]] ثم [[invalid: age must be positive 422]] ثم سطر [[#0      parseAge (...)]] ثم [[checked -5]]. لاحظ إن finally بيتنفذ في التلات حالات.

لما تمسح [[rethrow;]] الـ compiler بيرفض: [[The body might complete normally, causing 'null' to be returned, but the return type, 'int', is a potentially non-nullable type]]. لأن الدالة وعدت ترجّع int، والـ catch بيخلص من غير return. ولما تحط [[return -1;]] الكود يترجم، بس [['-5']] بقت تطبع [[log: rejected -5]] ثم [[age -1]]: الخطأ اتبلع والـ UI فاكر إن كله تمام. دا بالظبط ليه rethrow موجود.

والنص الفاضي [['']]: [[int.parse('')]] بيرمي FormatException، فهيطبع [[not a number: ]] (فاضي بعد النقطتين) ثم [[checked ]].`,
          solCode: R`// saveAge بعد استبدال rethrow (مثال على الغلط):
int saveAge(String raw) {
  try {
    return parseAge(raw);
  } on ApiException {
    print('log: rejected $raw');
    return -1; // الخطأ اتبلع: اللي فوق مش هيعرف إن فيه مشكلة
  }
}`
        },
        {
          cmd: "generics",
          title: "كود واحد يشتغل مع أي نوع ويفضل type-safe",
          desc: R`[[List<String>]] و [[Future<User>]] دي generics: الـ class مكتوب مرة، والنوع اللي جواه بيتحدد وقت الاستخدام. وتقدر تعمل بتوعك: [[class Page<T>]] لرد API فيه لستة من أي حاجة، أو دالة [[T? findById<T extends Entity>(...)]].

[[extends]] جوه الـ generic بيحط شرط: [[T extends Entity]] يعني «أي نوع، بشرط يبقى فيه id». فجوه الدالة تقدر تكتب [[item.id]] والـ compiler مطمن.`,
          example: R`class Page<T> {
  const Page(this.items, this.total);
  final List<T> items;
  final int total;

  Page<R> map<R>(R Function(T item) convert) =>
      Page(items.map(convert).toList(), total);
}

abstract class Entity {
  int get id;
}

class Todo implements Entity {
  Todo(this.id, this.title);
  @override
  final int id;
  final String title;
}

T? findById<T extends Entity>(List<T> list, int id) {
  for (final item in list) {
    if (item.id == id) return item;
  }
  return null;
}

void main() {
  final todos = [Todo(1, 'buy milk'), Todo(2, 'call mom')];
  final page = Page(todos, 40);
  final titles = page.map((t) => t.title.toUpperCase());
  print('$__{titles.items} of $__{titles.total}');
  final found = findById(todos, 2);
  print(found?.title);
  print(titles.runtimeType);
}`,
          try: "نادي [[findById([1, 2], 1)]] وشوف الـ error. وبعدين جرّب الفخ ده: [[final List<Object> objs = <String>['a']; objs.add(1);]]. هل الـ compiler مسكه؟ وإيه اللي حصل وقت التشغيل؟",
          flag: "script",
          deep: {
            why: "من غير generics يا تكتب [[TodoPage]] و [[UserPage]] و [[OrderPage]] نفس الكود ٣ مرات، يا تكتب [[Page]] واحد فيه [[List<dynamic>]] وتخسر فحص الأنواع وتعمل cast في كل حتة. الـ generics بتدّيك الاتنين: كود واحد، والـ compiler عارف إن [[page.items.first]] نوعه Todo.",
            how: R`Dart بيستنتج النوع من القيم: [[Page(todos, 40)]] بقت [[Page<Todo>]] من غير ما تكتبها، و [[page.map((t) => t.title)]] بقت [[Page<String>]] لأن الدالة بترجّع String.

الـ generics في Dart «reified»: النوع بيفضل موجود وقت التشغيل، مش بيتمسح زي Java أو TypeScript. عشان كده [[titles.runtimeType]] بيطبع [[Page<String>]]، و [[x is List<int>]] بيشتغل فعلًا.

الـ generics في Dart covariant: [[List<String>]] ينفع تتحط في متغير [[List<Object>]]. دا مريح، بس معناه إن فحص الـ [[add]] بيتأجل لوقت التشغيل: لو حطيت int في list هي في الحقيقة [[List<String>]] هيضرب [[type 'int' is not a subtype of type 'String']]. ودا من الحاجات القليلة اللي الـ compiler مش بيمسكها.

الأماكن اللي هتشوف فيها generics في Flutter كل يوم: [[State<Counter>]]، و [[FutureBuilder<List<Todo>>]]، و [[ValueNotifier<int>]]، و [[Provider<ApiClient>]] و [[AsyncNotifier<List<Todo>>]] في Riverpod، و [[Navigator.push<bool>]] لما الشاشة ترجّع نتيجة.

الـ typedef بيدّي اسم لنوع طويل: [[typedef Json = Map<String, dynamic>;]] ودي بتتكتب في معظم المشاريع.`,
            when: "أي class أو دالة بتشيل أو بتلف على بيانات من غير ما يهمها نوعها بالظبط: رد API فيه pagination، و cache، و Result<T> فيه نجاح أو فشل، و repository أساسي. ومتعملهاش لو هتستخدم نوع واحد بس.",
            mistakes: R`تسيب الـ generic من غير نوع ([[final list = [];]]) فيبقى [[List<dynamic>]] وتخسر الفحص كله: اكتب [[<String>[]]]. وتعمل [[as List<String>]] على list جاية من [[jsonDecode]]: هيضرب لأنها في الحقيقة [[List<dynamic>]]، والصح [[(json['tags'] as List).cast<String>()]] (درس null safety بعمق). وتكتب generics معقدة ٣ مستويات عشان «يبقى reusable» ومحدش يعرف يقرا الكود.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل class اسمه [[Page]] بيشيل لستة من **أي نوع** مع العدد الكلي (زي رد API فيه pagination)، ودالة [[findById]] بتدوّر في أي لستة بشرط عناصرها يكون ليها id. وبيجرّبهم على لستة [[Todo]]. اتشغّل بـ [[dart run]] في [[docker run --rm dart:stable]] (Dart 3.13.5)، ومعاه تجارب «جرّب».

---

## ١. [[class Page<T>]]

~~~dart
class Page<T> {
  const Page(this.items, this.total);
  final List<T> items;
  final int total;
~~~

- [[<T>]] بعد اسم الـ class: **type parameter**، يعني «نوع لسه مش معروف، اسمه T». T اسم متعارف عليه (Type)، وممكن أي اسم: [[E]] للـ Element و [[K]] و [[V]] للـ Key و Value.
- [[List<T> items]]: لستة من T، أيًا كان. لو حد عمل [[Page<Todo>]] تبقى [[List<Todo>]]، ولو [[Page<String>]] تبقى [[List<String>]].
- [[const Page(...)]]: constructor ثابت، ينفع يتعمل بيه object وقت الترجمة لو القيم ثابتة. وعشان كده الـ fields كلها [[final]].
- [[total]] العدد الكلي على السيرفر (40)، مش عدد اللي في الصفحة دي (2).

---

## ٢. method بـ generic تاني: [[map<R>]]

~~~dart
  Page<R> map<R>(R Function(T item) convert) =>
      Page(items.map(convert).toList(), total);
}
~~~

نفكّها من الشمال:

| الحتة | معناها |
|---|---|
| [[Page<R>]] | نوع الرجوع: صفحة من نوع جديد R |
| [[map<R>]] | الـ method نفسها ليها type parameter خاص بيها |
| [[R Function(T item) convert]] | parameter اسمه convert، نوعه «دالة بتاخد T وترجّع R» |
| [[items.map(convert)]] | طبّق الدالة على كل عنصر (بيرجّع Iterable) |
| [[.toList()]] | حوّل الـ Iterable لـ List |
| [[total]] | العدد الكلي زي ما هو |

يعني [[Page<Todo>]] و [[(t) => t.title]] يطلّعوا [[Page<String>]].

---

## ٣. الشرط: [[Entity]] و [[T extends Entity]]

~~~dart
abstract class Entity {
  int get id;
}

class Todo implements Entity {
  Todo(this.id, this.title);
  @override
  final int id;
  final String title;
}
~~~

- [[abstract class]]: class مينفعش تعمل منه object مباشرة، وظيفته يحدد «عقد». و [[int get id;]] من غير جسم معناه «أي حد يطبّقني لازم يكون عنده id».
- [[Todo implements Entity]]: Todo بيوعد إنه هيحقق العقد. و [[@override final int id;]]: field عادي بيحقق الـ getter المطلوب (الـ field في Dart بيعمل getter لوحده).

~~~dart
T? findById<T extends Entity>(List<T> list, int id) {
  for (final item in list) {
    if (item.id == id) return item;
  }
  return null;
}
~~~

- [[<T extends Entity>]]: T أي نوع **بشرط** يكون Entity أو بيطبّقها. دا الـ **bound**.
- ليه الشرط؟ عشان سطر [[item.id]]. من غيره T ممكن تبقى int، و int ملهاش id، فالـ compiler يرفض.
- [[T?]]: بترجّع نفس نوع العناصر أو null لو ملقتش. لاحظ إنها مش بترجّع [[Entity?]]: اللي بعت [[List<Todo>]] ياخد [[Todo?]] ويقدر يقرا [[title]].

---

## ٤. [[main]]: الـ compiler بيستنتج الأنواع

~~~dart
  final todos = [Todo(1, 'buy milk'), Todo(2, 'call mom')];
  final page = Page(todos, 40);
  final titles = page.map((t) => t.title.toUpperCase());
  print('$__{titles.items} of $__{titles.total}');
  final found = findById(todos, 2);
  print(found?.title);
  print(titles.runtimeType);
~~~

مفيش ولا نوع مكتوب، والـ compiler عارفهم كلهم:

| المتغير | النوع المستنتج | منين |
|---|---|---|
| [[todos]] | [[List<Todo>]] | العناصر كلها Todo |
| [[page]] | [[Page<Todo>]] | من نوع todos |
| [[titles]] | [[Page<String>]] | الدالة بترجّع String، فـ R = String |
| [[found]] | [[Todo?]] | T = Todo |

- [[toUpperCase()]]: النص بحروف كبيرة.
- [[found?.title]]: [[?.]] يعني «لو found مش null هات title، ولو null رجّع null من غير ما تضرب».
- [[runtimeType]]: النوع الحقيقي للـ object وقت التشغيل.

~~~text dart run
[BUY MILK, CALL MOM] of 40
call mom
Page<String>
~~~

السطر التالت مهم: [[Page<String>]] مش [[Page]] بس. في Dart الـ generics **reified**، يعني النوع بيفضل موجود وقت التشغيل (في Java و TypeScript بيتمسح). جربت كمان:

~~~text الناتج
Page([1, 2], 2).runtimeType        → Page<int>
[].runtimeType                     → List<dynamic>
<String>[].runtimeType             → List<String>
page.items is List<int>            → true
~~~

لاحظ إن اللستة الفاضية من غير نوع بقت [[List<dynamic>]]: مفيش عناصر يستنتج منها، فبيحط dynamic وانت خسرت الفحص. اكتب النوع قبل القوسين المربعين زي السطر التالت.

---

## ٥. التجارب في «جرّب»

### [[findById([1, 2], 1)]]

~~~text dart run
t2a.dart:3:24: Error: The argument type 'List<int>' can't be assigned to the parameter type 'List<Entity>'.
~~~

الـ compiler حاول يخلي T = int، ولقى إن int مش Entity، فرفض. دا اللي الـ [[extends]] بيضمنه.

### فخ الـ covariance

~~~dart
  final List<Object> objs = <String>['a'];
  print(objs.runtimeType);
  objs.add(1);
~~~

الـ compiler سكت (مفيش أي error)، لأن [[List<String>]] يعتبر نوع من [[List<Object>]]. ودا اسمه **covariance**: لو String نوع من Object، يبقى List<String> نوع من List<Object>. بس وقت التشغيل:

~~~text dart run
List<String>
Unhandled exception:
type 'int' is not a subtype of type 'String' of 'value'
#0      List.add (dart:core-patch/growable_array.dart:285:14)
~~~

- [[List<String>]]: الـ object الحقيقي لسه List<String>، النوع المكتوب على المتغير مش بيغيّره.
- [[List.add]] فحص القيمة وقت التشغيل ولقاها int فرمى TypeError.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| class بـ generic | [[class Page<T>]] | النوع بيتحدد وقت الاستخدام |
| method بـ generic | [[Page<R> map<R>(...)]] | نوع جديد خاص بالـ method |
| نوع دالة | [[R Function(T item)]] | دالة بتاخد T وترجّع R |
| شرط | [[<T extends Entity>]] | أي نوع، بشرط يكون Entity |
| reified | [[runtimeType]] → [[Page<String>]] | النوع موجود وقت التشغيل |

> متسيبش لستة أو map فاضية من غير نوع، والـ compiler مش بيمسك كل حاجة: الـ add على list متحطوطة في متغير بنوع أعم بيتفحص وقت التشغيل بس.`,
          lines: [
            "class بـ generic اسمه T: النوع بيتحدد لما حد يستخدمه.",
            "constructor.",
            "لستة من T، أيًا كان T.",
            "العدد الكلي (للـ pagination).",
            "دالة بـ generic تاني R: بتحوّل [[Page<T>]] لـ [[Page<R>]] بدالة تحويل.",
            "بتطبّق التحويل على كل عنصر وتحافظ على total.",
            "قفلة.",
            "class مجرد: أي حاجة ليها id.",
            "getter لازم أي class يطبّقه.",
            "قفلة.",
            "Todo بيحقق شرط Entity.",
            "constructor.",
            "بيعيد تعريف getter الـ id...",
            "...بـ field عادي.",
            "العنوان.",
            "قفلة.",
            "[[T extends Entity]]: أي نوع بشرط يبقى فيه id، والنتيجة [[T?]] لأن ممكن ميلاقيش.",
            "لف على اللستة.",
            "[[item.id]] مسموح لأن T أكيد Entity.",
            "قفلة الـ loop.",
            "ملقاش.",
            "قفلة.",
            "البداية.",
            "[[List<Todo>]] من القيم.",
            "[[Page<Todo>]] من غير ما تكتب النوع.",
            "[[Page<String>]]: R اتستنتجت من الدالة.",
            "[BUY MILK, CALL MOM] of 40.",
            "[[findById]] رجّعت [[Todo?]] مش Entity: الـ generic حافظ على النوع.",
            "call mom.",
            "Page<String>: النوع موجود وقت التشغيل.",
            "قفلة."
          ],
          sol: R`الناتج: [[[BUY MILK, CALL MOM] of 40]] ثم [[call mom]] ثم [[Page<String>]].

[[findById([1, 2], 1)]] مش هيترجم: [[The argument type 'List<int>' can't be assigned to the parameter type 'List<Entity>']]. الـ compiler عرف إن int مش Entity، ودا لازمة [[extends]] في الـ generic.

والفخ: الـ compiler سكت خالص، لأن [[List<String>]] يعتبر [[List<Object>]] (covariance). بس وقت التشغيل ضرب: [[type 'int' is not a subtype of type 'String' of 'value']]. الـ list في الحقيقة لسه List<String> والـ runtime فحصها عند الـ add. الغلط الشائع إنك تفتكر إن النوع المكتوب على المتغير هو اللي بيتحكم، والصح إن نوع الـ object الحقيقي هو اللي بيتفحص.`
        },
        {
          cmd: "mixin",
          title: "تضيف قدرات جاهزة لكذا class من غير وراثة",
          desc: R`الـ class في Dart بيورث من أب واحد بس ([[extends]]). إنما [[mixin]] حتة كود (fields و methods) تقدر تحطها في أي عدد classes بـ [[with]]: [[class ProductRepo extends Repository with Logger, Cache]].

و [[mixin Cache on Repository]] معناها إن الـ mixin ده يتحط بس على classes بتورث Repository، فيقدر ينادي دوالها. وانت بتستخدم mixins من Flutter من أول يوم: [[with SingleTickerProviderStateMixin]] في أي animation.`,
          example: R`mixin Logger {
  final logs = <String>[];
  void log(String msg) => logs.add('[$runtimeType] $msg');
}

abstract class Repository {
  Future<List<String>> fetchAll();
}

mixin Cache on Repository {
  List<String>? _cached;
  Future<List<String>> cachedFetch() async => _cached ??= await fetchAll();
}

class ProductRepo extends Repository with Logger, Cache {
  int calls = 0;
  @override
  Future<List<String>> fetchAll() async {
    calls++;
    log('network call $calls');
    return ['tea', 'coffee'];
  }
}

Future<void> main() async {
  final repo = ProductRepo();
  await repo.cachedFetch();
  final items = await repo.cachedFetch();
  print('$items calls=$__{repo.calls}');
  print(repo.logs);
  final Logger logger = repo;
  logger.log('done');
  print(repo.logs.length);
}`,
          try: "اعمل [[class Settings with Cache {}]] (من غير extends Repository) وشوف الـ error. وبعدين اعمل mixin تاني اسمه [[Timestamps]] فيه [[DateTime? updatedAt]] و [[void touch()]]، وضيفه على ProductRepo ونادي [[touch()]] جوه fetchAll.",
          flag: "script",
          deep: {
            why: "فيه قدرات بتتكرر في classes ملهاش أب مشترك: logging، و cache، و validation. لو حطيتها في أب واحد، كل class لازم يورث منه حتى لو مش محتاجها، ولو عايز قدرتين من أبين مختلفين مش هينفع لأن الوراثة واحدة بس. الـ mixin بيخليك تركّب القدرات زي قطع ليجو.",
            how: R`[[with A, B]] بيتقري من الشمال لليمين كأنه سلسلة: [[Repository]] ثم [[Repository+Logger]] ثم [[Repository+Logger+Cache]] ثم ProductRepo. ولو اتنين mixins فيهم method بنفس الاسم، اللي على اليمين (الأخير) هو اللي بيكسب، و [[super.method()]] جواه بينادي اللي قبله في السلسلة. عشان كده الترتيب مهم.

[[on Repository]] بيعمل حاجتين: بيسمح للـ mixin ينادي [[fetchAll()]] كأنه موجود، وبيمنع أي حد يحطه على class مش Repository (الـ error اللي في التجربة).

من Dart 3 فيه فرق واضح: [[mixin]] للـ mixins بس (مينفعش تعمل منه object)، و [[class]] عادي مينفعش يتحط بعد with إلا لو كتبته [[mixin class]]. قبل Dart 3 أي class من غير constructor كان ينفع يبقى mixin، ودا اتقفل.

الفرق بين الـ ٣ كلمات:
- [[extends]]: وراثة، أب واحد، بتاخد الكود والنوع.
- [[implements]]: عقد، أي عدد، بتاخد النوع بس ولازم تكتب كل method بنفسك.
- [[with]]: mixin، أي عدد، بتاخد الكود جاهز.

في Flutter: [[SingleTickerProviderStateMixin]] بيضيف للـ State القدرة إنه يبقى [[vsync]] لـ AnimationController، و [[AutomaticKeepAliveClientMixin]] بيخلي عنصر في ListView ميتشالش لما يخرج من الشاشة، و [[WidgetsBindingObserver]] بيسمع لحالة التطبيق (background و foreground).`,
            when: "قدرة صغيرة مستقلة بتتكرر في classes مختلفة. ولو العلاقة «هو نوع من» (Circle هو Shape) استخدم extends. ولو محتاج تبدّل التنفيذ في الاختبارات (repository حقيقي و fake) استخدم implements على abstract interface.",
            mistakes: R`تعمل mixin فيه state كتير ودوال بتعتمد على بعض، فيبقى أب مستخبي بس أصعب في القراية. وتنسى إن الترتيب في with بيفرق لما فيه method بنفس الاسم. وتعمل [[with SingleTickerProviderStateMixin]] وعندك اتنين AnimationControllers: هيضرب، والصح [[TickerProviderStateMixin]]. وسؤال انترفيو: «إيه الفرق بين extends و implements و with؟» (فوق)، و«ليه Dart معندهاش multiple inheritance؟» لأن mixins بتحل المشكلة من غير diamond problem، بسبب الترتيب الخطي.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل قدرتين جاهزين: [[Logger]] (يسجّل رسايل) و [[Cache]] (يحفظ نتيجة أول طلب ومايطلبش تاني)، ويركّبهم على [[ProductRepo]] بـ [[with]] من غير وراثة. وبعدين يطلب البيانات مرتين ويتأكد إن الطلب الحقيقي حصل مرة واحدة. اتشغّل بـ [[dart run]] و [[dart analyze]] في [[docker run --rm dart:stable]] (Dart 3.13.5)، ومعاه الـ solCode والتجارب.

---

## ١. [[mixin Logger]]

~~~dart
mixin Logger {
  final logs = <String>[];
  void log(String msg) => logs.add('[$runtimeType] $msg');
}
~~~

- [[mixin]]: حتة كود (fields و methods) معمولة عشان تتحط جوه classes تانية. مش class تعمل منه object: جربت [[Logger()]] و [[dart analyze]] قال [[Mixins can't be instantiated.]]
- [[final logs = <String>[];]]: لستة نصوص فاضية. كل class هيحط Logger جواه هياخد **نسخة خاصة بيه** من اللستة دي، زي أي field عادي.
- [[runtimeType]]: هنا مش «Logger»، هو نوع الـ object الحقيقي اللي الـ mixin اتحط فيه. فهيطبع [[ProductRepo]].
- [[$runtimeType]] جوه النص: [[$]] وبعدها اسم بيحط القيمة في النص.

---

## ٢. العقد: [[abstract class Repository]]

~~~dart
abstract class Repository {
  Future<List<String>> fetchAll();
}
~~~

أي repository لازم يعرف يجيب البيانات. [[Future<List<String>>]] يعني «هترجّع لستة نصوص بعدين» (درس async و await). ومفيش جسم، فده عقد بس.

---

## ٣. [[mixin Cache on Repository]]

~~~dart
mixin Cache on Repository {
  List<String>? _cached;
  Future<List<String>> cachedFetch() async => _cached ??= await fetchAll();
}
~~~

- [[on Repository]]: شرط. «الـ mixin ده يتحط بس على class هو أصلًا Repository». والمكسب: جوه الـ mixin تقدر تنادي [[fetchAll()]] كأنها موجودة، لأن أكيد هتبقى موجودة.
- [[List<String>? _cached]]: الـ cache، بيبدأ null. و [[_]] = private على مستوى الملف.
- [[async]] و [[await fetchAll()]]: استنى النتيجة.
- [[??=]]: «لو المتغير اللي على الشمال null، احسب اللي على اليمين وخزّنه فيه. ولو مش null، سيبه ورجّع قيمته». فأول مرة بينادي fetchAll، وأي مرة بعدها بيرجّع المحفوظ من غير ما ينادي حاجة.

---

## ٤. التركيب: [[extends Repository with Logger, Cache]]

~~~dart
class ProductRepo extends Repository with Logger, Cache {
  int calls = 0;
  @override
  Future<List<String>> fetchAll() async {
    calls++;
    log('network call $calls');
    return ['tea', 'coffee'];
  }
}
~~~

- [[extends Repository]]: الوراثة الوحيدة (أب واحد بس في Dart).
- [[with Logger, Cache]]: حط القدرتين دول. الترتيب بيتقري من الشمال لليمين كأنها طبقات: Repository، فوقيه Logger، فوقيه Cache، وفوق الكل ProductRepo.
- [[calls]]: عدّاد عشان نشوف الطلب الحقيقي حصل كام مرة.
- [[@override fetchAll()]]: ProductRepo بيحقق العقد. والجسم بيمثّل طلب شبكة: يزوّد العدّاد، ويسجّل بـ [[log]] (جاية من Logger)، ويرجّع لستة ثابتة.

---

## ٥. [[main]]

~~~dart
  final repo = ProductRepo();
  await repo.cachedFetch();
  final items = await repo.cachedFetch();
  print('$items calls=$__{repo.calls}');
  print(repo.logs);
  final Logger logger = repo;
  logger.log('done');
  print(repo.logs.length);
~~~

- [[Future<void> main() async]]: main نفسها async عشان نقدر نعمل await جواها.
- [[repo.cachedFetch()]] مرتين: الأولى نادت fetchAll وخزّنت، والتانية رجّعت المخزّن.
- [[$__{repo.calls}]]: [[$__{ }]] لما اللي جوه النص فيه نقطة أو عملية مش اسم بس.
- [[final Logger logger = repo;]]: الـ mixin **نوع** كمان. ProductRepo يتحط في متغير نوعه Logger، زي ما يتحط في متغير نوعه Repository. جربت [[repo is Logger]] و [[repo is Cache]] والاتنين [[true]].

~~~text dart run
[tea, coffee] calls=1
[[ProductRepo] network call 1]
2
~~~

- [[calls=1]]: طلبنا مرتين والطلب الحقيقي حصل مرة. الـ cache شغال.
- السطر التاني: لستة فيها عنصر واحد. القوسين المربعين اللي بره بتوع اللستة، واللي جوه من الـ log نفسه وفيهم اسم الـ class.
- [[2]]: الـ log التاني [[done]] اتضاف من خلال المتغير [[logger]].

---

## ٦. الترتيب في [[with]] بيفرق

جربت ٣ mixins فيهم method بنفس الاسم:

~~~dart
mixin A { String hi() => 'A'; }
mixin B { String hi() => 'B'; }
mixin C on A { @override String hi() => 'C>' + super.hi(); }
class X with A, B {}
class Y with B, A {}
class Z with A, C {}
~~~

~~~text dart run
B
A
C>A
~~~

- [[X with A, B]]: اللي على اليمين (B) هو اللي فوق، فهو اللي بيكسب.
- [[Y with B, A]]: العكس.
- [[Z with A, C]]: [[super.hi()]] جوه C بينادي الطبقة اللي تحتها مباشرة (A). دا معنى إن الترتيب خطي: كل طبقة عارفة اللي تحتها، فمفيش «diamond problem».

---

## ٧. التجارب في «جرّب»

### [[class Settings with Cache {}]]

~~~text dart analyze
error - Missing concrete implementation of 'Repository.fetchAll'. ... - non_abstract_class_inherits_abstract_member
error - 'Cache' can't be mixed onto 'Object' because 'Object' doesn't implement 'Repository'. Try extending the class 'Cache'. - mixin_application_not_implemented_interface
~~~

خطأين: التاني هو الشرط [[on Repository]] (Settings أبوه Object مش Repository)، والأول نتيجة طبيعية: الـ Cache بيعتمد على fetchAll ومحدش كتبها.

### الـ solCode: mixin تالت [[Timestamps]]

~~~dart
mixin Timestamps {
  DateTime? updatedAt;
  void touch() => updatedAt = DateTime.now();
}
~~~

- [[DateTime? updatedAt]]: وقت آخر تحديث، null في الأول.
- [[touch()]]: يحط الوقت الحالي. و [[DateTime.now()]] الوقت دلوقتي.
- واتضاف [[with Logger, Cache, Timestamps]] و [[touch();]] جوه fetchAll.

جربته: ناديت cachedFetch، وخزّنت updatedAt، واستنيت 50ms، وناديت تاني، وطبعت [[calls]] و «هل الوقت زي ما هو» و «هل اتحط وقت أصلًا»:

~~~text dart run
1 true true
~~~

الوقت متغيرش في المرة التانية، لأنها جت من الـ cache ومعدّتش على fetchAll.

---

## الخلاصة

| الكلمة | بتاخد إيه | العدد |
|---|---|---|
| [[extends]] | الكود والنوع | أب واحد |
| [[implements]] | النوع بس، والكود تكتبه انت | أي عدد |
| [[with]] | الكود الجاهز والنوع | أي عدد، والترتيب بيفرق |
| [[mixin X on Y]] | زي with، بس بشرط الـ class يبقى Y | |

> في Flutter هتكتب [[with SingleTickerProviderStateMixin]] على الـ State عشان الـ animations، ودا نفس الفكرة بالظبط.`,
          lines: [
            "[[mixin]]: حتة كود تتحط في أي class.",
            "field جوه الـ mixin: كل class بياخد نسخة خاصة بيه.",
            "method بتستخدم [[runtimeType]] بتاع الـ class اللي اتحطت فيه.",
            "قفلة.",
            "class مجرد فيه عقد واحد.",
            "أي repository لازم يعرف يجيب البيانات.",
            "قفلة.",
            "[[on Repository]]: الـ mixin ده يتحط بس على Repository.",
            "cache خاص بالـ mixin.",
            "[[??=]]: لو الـ cache فاضي نادي fetchAll (موجودة بفضل on) وخزّن.",
            "قفلة.",
            "وراثة واحدة + اتنين mixins.",
            "عدّاد للنداءات الحقيقية.",
            "بيطبّق العقد.",
            "الدالة الحقيقية (زي طلب شبكة).",
            "زوّد العدّاد.",
            "[[log]] جاية من Logger.",
            "النتيجة.",
            "قفلة.",
            "قفلة الـ class.",
            "البداية.",
            "object.",
            "أول مرة: بيروح للـ «شبكة».",
            "تاني مرة: من الـ cache.",
            "[tea, coffee] calls=1: اتنادت مرة واحدة بس.",
            "لستة فيها سطر واحد: اسم الـ class بين أقواس مربعة ثم network call 1.",
            "الـ mixin نوع كمان: ProductRepo يتحط في متغير Logger.",
            "نادي من خلاله.",
            "2.",
            "قفلة."
          ],
          sol: R`الناتج: [[[tea, coffee] calls=1]] ثم لستة فيها سطر log واحد (ProductRepo بين أقواس مربعة ثم network call 1) ثم [[2]].

[[class Settings with Cache {}]] مش هيترجم: [['Cache' can't be mixed onto 'Object' because 'Object' doesn't implement 'Repository']]. الـ [[on]] شرط والـ compiler بيطبّقه.

الـ Timestamps: بعد ما تضيفه ([[with Logger, Cache, Timestamps]]) وتنادي [[touch()]] جوه fetchAll، [[repo.updatedAt]] هيبقى فيه وقت أول نداء، ومش هيتغير في النداء التاني لأن التاني جه من الـ cache ومعدّاش على fetchAll. لو اتغير يبقى الـ cache مش شغال.`,
          solCode: R`mixin Timestamps {
  DateTime? updatedAt;
  void touch() => updatedAt = DateTime.now();
}

class ProductRepo extends Repository with Logger, Cache, Timestamps {
  int calls = 0;
  @override
  Future<List<String>> fetchAll() async {
    calls++;
    touch();
    log('network call $calls');
    return ['tea', 'coffee'];
  }
}`
        },
        {
          cmd: "extension",
          title: "تضيف دوال لـ String أو أي نوع مش بتاعك",
          desc: R`[[extension StringX on String]] بيضيف methods و getters لنوع موجود من غير ما تعدّل فيه ولا تورث منه: [['ali'.capitalized]] بدل [[capitalize('ali')]]. بتشتغل على أي نوع: String و num و List و DateTime و BuildContext.

و [[extension type]] (من Dart 3.3) حاجة مختلفة: نوع جديد وقت الترجمة بس فوق نوع موجود. [[UserId(42)]] وقت التشغيل هو int عادي، بس الـ compiler مش هيسيبك تبعت int مكان UserId بالغلط.`,
          example: R`extension StringX on String {
  String get capitalized => isEmpty ? this : this[0].toUpperCase() + substring(1);
  bool get isValidEmail => RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(this);
}

extension PriceFormat on num {
  String get egp => '$__{toStringAsFixed(2)} EGP';
}

extension ListSum<T extends num> on Iterable<T> {
  num get sum => fold<num>(0, (a, b) => a + b);
}

extension type UserId(int value) {
  bool get isValid => value > 0;
}

void main() {
  print('ali'.capitalized);
  print('ali@mail.com'.isValidEmail);
  print(450.egp);
  print([10, 25, 15].sum.egp);
  final id = UserId(42);
  print('$__{id.value} $__{id.isValid}');
}`,
          try: "اعمل [[extension on DateTime]] فيها getter اسمه [[ago]] بيرجّع «من X دقيقة» أو «من X ساعة». وبعدين جرّب تبعت [[42]] لدالة parameter بتاعها [[UserId]]: الـ compiler هيقول إيه؟ وجرّب [[final dynamic s = 'ali'; print(s.capitalized);]].",
          flag: "script",
          deep: {
            why: "كل مشروع فيه دوال صغيرة بتتكرر: تنسيق سعر، و validation لإيميل، و «من ٥ دقايق». لو عملتها دوال عادية هتتوه في ملف utils ومحدش هيلاقيها. الـ extension بيحطها على النوع نفسه، فالـ autocomplete بيقترحها أول ما تكتب نقطة بعد String.",
            how: R`الـ extension مش بيعدّل الـ class فعلًا: الـ compiler بيحوّل [['ali'.capitalized]] لنداء دالة static وقت الترجمة. عشان كده:
- بتشتغل على النوع المعروف وقت الترجمة بس. متغير [[dynamic]] مش هيشوفها وهيضرب [[NoSuchMethodError]].
- مينفعش تضيف fields (state) جوه extension، getters و methods بس.
- لو الـ class نفسه فيه method بنفس الاسم، بتاعة الـ class هي اللي بتكسب.
- لازم تعمل import للملف اللي فيه الـ extension عشان تبان.

[[extension ListSum<T extends num> on Iterable<T>]] extension بـ generic: بتشتغل على [[List<int>]] و [[Set<double>]] وأي Iterable أرقام.

في Flutter هتلاقي extensions كتير على [[BuildContext]]: [[context.go('/home')]] في go_router و [[context.mounted]] نفسها. ومشاريع كتير بتعمل [[extension on BuildContext { ThemeData get theme => Theme.of(this); }]] عشان تكتب [[context.theme]].

[[extension type UserId(int value)]]: zero-cost wrapper. وقت التشغيل مفيش object جديد، هو int. بس وقت الترجمة [[UserId]] نوع مختلف، فدالة [[deleteUser(UserId id)]] مش هتقبل [[productId]] بالغلط. و [[package:web]] كله مبني بيها عشان JS interop.`,
            when: "دوال مساعدة صغيرة مرتبطة بنوع واحد (تنسيق، تحويل، validation). و extension type لـ ids ومبالغ من نفس النوع الأساسي عايز تمنع الخلط بينها.",
            mistakes: R`تحط business logic كبير في extension على String، فيبقى [['...'.saveToDatabase()]]: دي مكانها class. وتعمل extension باسم مستخدم في package تانية فيحصل تعارض ([[ambiguous extension member]]): اديها اسم مميز أو استخدم [[hide]] في الـ import. وتفتكر إنها هتشتغل على dynamic.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيضيف getters جديدة لأنواع موجودة مش بتاعتك: [[String]] (أول حرف كابيتال، وفحص إيميل)، و [[num]] (سعر بالجنيه)، وأي Iterable أرقام (المجموع). وبيعمل نوع جديد [[UserId]] فوق int بـ [[extension type]]. اتشغّل بـ [[dart run]] و [[dart analyze]] في [[docker run --rm dart:stable]] (Dart 3.13.5)، ومعاه الـ solCode والتجارب.

---

## ١. [[extension StringX on String]]

~~~dart
extension StringX on String {
  String get capitalized => isEmpty ? this : this[0].toUpperCase() + substring(1);
  bool get isValidEmail => RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(this);
}
~~~

- [[extension]]: «ضيف الحاجات دي للنوع ده». و [[StringX]] اسم الـ extension (اختياري، بس مهم لو حصل تعارض أسماء). و [[on String]]: النوع اللي بتضيف عليه.
- جوه الـ extension، [[this]] هو النص نفسه اللي اتنادت عليه الدالة. وتقدر تنادي methods بتاعته من غير [[this.]]: [[isEmpty]] و [[substring]].

### [[capitalized]] حتة حتة

| الحتة | معناها |
|---|---|
| [[isEmpty ? this : ...]] | لو النص فاضي رجّعه زي ما هو (من غيرها [[this[0].toUpperCase()]] هيضرب RangeError) |
| [[this[0].toUpperCase()]] | أول حرف، كابيتال |
| [[+ substring(1)]] | ولزّق عليه باقي النص من الحرف رقم 1 |

جربت [[''.capitalized.isEmpty]] وطلع [[true]]: النص الفاضي عدّى بسلام.

### [[isValidEmail]]: الـ regex

[[RegExp(r'...')]] بيعمل regular expression، و [[r]] قبل النص يعني raw string: الـ [[\]] يفضل زي ما هو. و [[.hasMatch(this)]] هل النص مطابق.

| الحتة | معناها |
|---|---|
| [[^]] و [[$]] | أول النص وآخره (النص كله لازم يطابق) |
| [[[^@\s]+]] | حرف واحد أو أكتر، مش [[@]] ومش مسافة ([[\s]]) |
| [[@]] | علامة @ |
| [[\.]] | نقطة حقيقية (النقطة لوحدها في regex معناها «أي حرف») |

يعني «حاجة @ حاجة . حاجة» من غير مسافات. جربت [['a b'.isValidEmail]] وطلع [[false]].

---

## ٢. extension على الأرقام

~~~dart
extension PriceFormat on num {
  String get egp => '$__{toStringAsFixed(2)} EGP';
}
~~~

- [[num]]: النوع الأب لـ [[int]] و [[double]]، فالـ getter بيشتغل على الاتنين.
- [[toStringAsFixed(2)]]: الرقم كنص برقمين بعد العلامة: [[450]] تبقى [[450.00]].

---

## ٣. extension بـ generic

~~~dart
extension ListSum<T extends num> on Iterable<T> {
  num get sum => fold<num>(0, (a, b) => a + b);
}
~~~

- [[<T extends num>]]: الـ extension ليه type parameter بشرط يكون رقم (درس generics). فبيشتغل على [[List<int>]] و [[Set<double>]]، ومش هيظهر على [[List<String>]].
- [[Iterable]]: أي حاجة تتلف عليها (List و Set وغيرهم).
- [[fold<num>(0, (a, b) => a + b)]]: ابدأ من 0، ولكل عنصر [[b]] ضيفه على المجموع [[a]]. يعني 0+10، ثم +25، ثم +15 = 50.

---

## ٤. [[extension type UserId(int value)]]

~~~dart
extension type UserId(int value) {
  bool get isValid => value > 0;
}
~~~

- دي حاجة تانية خالص (من Dart 3.3): **نوع جديد** وقت الترجمة، ملفوف حوالين int.
- [[(int value)]]: القيمة اللي جوه واسمها [[value]].
- [[isValid]]: getter خاص بالنوع ده.

جربت أطبع [[id.runtimeType]] و [[id is int]]:

~~~text الناتج
int
true
~~~

وقت التشغيل مفيش object جديد خالص، هو int عادي. الحماية كلها وقت الترجمة، ودا معنى «zero-cost».

---

## ٥. [[main]] والناتج

~~~dart
  print('ali'.capitalized);
  print('ali@mail.com'.isValidEmail);
  print(450.egp);
  print([10, 25, 15].sum.egp);
  final id = UserId(42);
  print('$__{id.value} $__{id.isValid}');
~~~

~~~text dart run
Ali
true
450.00 EGP
50.00 EGP
42 true
~~~

- [[450.egp]]: الـ getter اتنادى على رقم مكتوب في الكود على طول.
- [[[10, 25, 15].sum.egp]]: extensionين ورا بعض: sum رجّع 50 (نوعه num)، و egp اتنادت عليه.

---

## ٦. التجارب في «جرّب»

### الـ solCode: [[extension Ago on DateTime]]

~~~dart
extension Ago on DateTime {
  String get ago {
    final diff = DateTime.now().difference(this);
    if (diff.inMinutes < 60) return 'من $__{diff.inMinutes} دقيقة';
    if (diff.inHours < 24) return 'من $__{diff.inHours} ساعة';
    return 'من $__{diff.inDays} يوم';
  }
}
~~~

- [[String get ago { ... }]]: getter بجسم كامل بدل [[=>]]، عشان فيه أكتر من سطر.
- [[DateTime.now().difference(this)]]: الفرق بين دلوقتي والوقت ده، نوعه [[Duration]] (مدة).
- [[diff.inMinutes]] و [[inHours]] و [[inDays]]: المدة كلها بالدقايق أو الساعات أو الأيام (أرقام صحيحة).
- [[subtract(const Duration(minutes: 5))]] في main: الوقت دلوقتي ناقص ٥ دقايق.

~~~text dart run
من 5 دقيقة
من 3 ساعة
~~~

### تبعت [[42]] مكان [[UserId]]

~~~text dart run
Error: The argument type 'int' can't be assigned to the parameter type 'UserId'.
  deleteUser(42);
             ^
~~~

مع إنه int وقت التشغيل، الـ compiler بيعامله نوع مختلف. دا اللي بيمنعك تبعت id منتج لدالة مستنية id يوزر.

### extension على [[dynamic]]

~~~dart
  final dynamic s = 'ali';
  print(s.capitalized);
~~~

بيترجم عادي، وبيضرب وقت التشغيل:

~~~text dart run
Unhandled exception:
NoSuchMethodError: Class 'String' has no instance getter 'capitalized'.
Receiver: "ali"
Tried calling: capitalized
~~~

الـ extension مش بيعدّل الـ String فعلًا. الـ compiler بيشوف النوع المكتوب وقت الترجمة ([[String]]) فيحوّل [['ali'.capitalized]] لنداء دالة عادية. ولما النوع [[dynamic]] مبيعرفش يعمل كده، فوقت التشغيل الـ String نفسه بيتسأل عن capitalized ومعندوش.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| extension | [[extension StringX on String]] | دوال جديدة على نوع موجود |
| [[this]] جواها | [[this.isEmpty]] | القيمة اللي اتنادت عليها |
| بـ generic | [[on Iterable<T>]] مع [[T extends num]] | على أي Iterable أرقام |
| extension type | [[extension type UserId(int value)]] | نوع جديد وقت الترجمة، int وقت التشغيل |
| حدودها | [[dynamic]] | مش بتشتغل، لأنها بتتحل وقت الترجمة |`,
          lines: [
            "extension على String، واسمها StringX.",
            "getter: أول حرف كابيتال. [[this]] هو النص نفسه.",
            "getter بيتأكد من شكل الإيميل بـ regex بسيط.",
            "قفلة.",
            "extension على num (يعني int و double).",
            "السعر بجنيه ورقمين عشري.",
            "قفلة.",
            "extension بـ generic على أي Iterable أرقام.",
            "المجموع بـ fold.",
            "قفلة.",
            "[[extension type]]: نوع جديد فوق int، من غير تكلفة وقت التشغيل.",
            "getter خاص بالنوع ده.",
            "قفلة.",
            "البداية.",
            "Ali.",
            "true.",
            "450.00 EGP.",
            "50.00 EGP: extensionين ورا بعض.",
            "[[UserId]] بيتعمل زي class.",
            "42 true.",
            "قفلة."
          ],
          sol: R`الـ extension على DateTime: بتحسب [[DateTime.now().difference(this)]]، ولو أقل من ساعة ترجّع الدقايق، وإلا الساعات، وإلا الأيام. [[DateTime.now().subtract(const Duration(minutes: 5)).ago]] لازم تطبع «من 5 دقيقة».

بعت [[42]] مكان [[UserId]]: [[The argument type 'int' can't be assigned to the parameter type 'UserId']]. دا الهدف من extension type. والصح [[deleteUser(UserId(42))]].

والـ dynamic: بيترجم عادي، وبيضرب وقت التشغيل بـ [[NoSuchMethodError: Class 'String' has no instance getter 'capitalized']]. لأن الـ extension بتتحل وقت الترجمة من النوع المكتوب، والنوع هنا dynamic.`,
          solCode: R`extension Ago on DateTime {
  String get ago {
    final diff = DateTime.now().difference(this);
    if (diff.inMinutes < 60) return 'من $__{diff.inMinutes} دقيقة';
    if (diff.inHours < 24) return 'من $__{diff.inHours} ساعة';
    return 'من $__{diff.inDays} يوم';
  }
}

void main() {
  print(DateTime.now().subtract(const Duration(minutes: 5)).ago);
  print(DateTime.now().subtract(const Duration(hours: 3)).ago);
}`
        },
        {
          cmd: "enhanced enum",
          title: "enum فيه بيانات ودوال بدل switch في كل حتة",
          desc: R`[[enum OrderStatus { pending, shipped }]] العادي قايمة أسماء. ومن Dart 2.17 الـ enum ينفع يبقى فيه fields و constructor و methods: كل حالة ليها label بالعربي ولون، و [[isFinal]] getter، و [[fromApi]] بتحوّل النص الجاي من السيرفر.

وكل enum فيه جاهز: [[.name]] (الاسم كنص)، و [[.index]]، و [[values]] (كل الحالات). و [[switch]] على enum لازم يغطي كل الحالات، فلو ضفت حالة جديدة الـ compiler يوريك كل الأماكن اللي محتاجة تتعدل.`,
          example: R`enum OrderStatus {
  pending('في الانتظار', 0xFFFFA000),
  shipped('اتشحن', 0xFF1976D2),
  delivered('وصل', 0xFF388E3C),
  cancelled('اتلغى', 0xFFD32F2F);

  const OrderStatus(this.label, this.color);
  final String label;
  final int color;

  bool get isFinal => this == delivered || this == cancelled;

  static OrderStatus fromApi(String raw) =>
      values.asNameMap()[raw] ?? OrderStatus.pending;
}

String nextStep(OrderStatus s) => switch (s) {
  OrderStatus.pending => 'جهّز الطلب',
  OrderStatus.shipped => 'تابع الشحنة',
  OrderStatus.delivered || OrderStatus.cancelled => 'مفيش',
};

void main() {
  final s = OrderStatus.fromApi('shipped');
  print('$__{s.name} $__{s.index} $__{s.label} $__{s.isFinal}');
  print(OrderStatus.fromApi('lost'));
  print(nextStep(OrderStatus.cancelled));
  print(OrderStatus.values.where((x) => !x.isFinal).map((x) => x.label).toList());
}`,
          try: "ضيف حالة [[returned('مرتجع', 0xFF6D4C41)]] وشغّل: الـ compiler هيقف فين؟ صلّحه. وبعدين في Flutter اعرض badge لكل حالة بـ [[Chip(label: Text(s.label), backgroundColor: Color(s.color))]].",
          flag: "script",
          deep: {
            why: "الحالة (pending و shipped) بتيجي معاها بيانات: النص اللي يتعرض، واللون، وهل ينفع يتلغى. من غير enhanced enum بتكتب switch للنص في مكان، و switch للون في مكان تاني، وأول حالة جديدة تنسى تضيفها في واحد منهم. هنا كل حاجة عن الحالة في مكان واحد.",
            how: R`كل قيمة في الـ enum object ثابت (const) بيتعمل مرة واحدة، عشان كده الـ constructor لازم [[const]] وكل الـ fields لازم [[final]]. والقيم بتتكتب الأول، وبعد آخر واحدة [[;]] مش [[,]].

[[values.asNameMap()]] بترجّع [[Map<String, OrderStatus>]] من الاسم للقيمة، فلو قريت منها بالمفتاح [['shipped']] بترجّع القيمة أو null لو السيرفر بعت حاجة مش معروفة. وفيه كمان [[OrderStatus.values.byName('shipped')]] بس دي بترمي [[ArgumentError]] لو الاسم مش موجود، ودا مش اللي عايزه مع بيانات جاية من بره.

switch على enum exhaustive: لو نسيت حالة، الـ compiler بيرفض الـ switch expression. و [[||]] في الـ pattern بيجمع أكتر من حالة في سطر.

الـ enum ينفع يعمل [[implements]] و [[with]] (mixin)، بس مينفعش [[extends]] ولا تعمل منه object جديد.

وخلي بالك من [[.index]]: بيتغير لو رتّبت الحالات، فمتخزّنهوش في قاعدة بيانات ولا تبعته للسيرفر. خزّن [[.name]].`,
            when: "أي مجموعة حالات ثابتة معروفة: حالة طلب، ونوع مستخدم، وثيم، ولغة، وأنواع إشعارات. ولو الحالات بتيجي من السيرفر وممكن تزيد من غير تحديث التطبيق، خلي فيه قيمة احتياطية (زي pending أو unknown).",
            mistakes: R`تخزّن [[.index]] في shared_preferences أو ترسله للـ API، وبعدين ترتّب القيم فكل البيانات القديمة تتقري غلط. وتستخدم [[byName]] على نص من السيرفر فيقع التطبيق أول ما الـ backend يضيف حالة. وتكتب [[default:]] أو [[_]] في switch على enum فتقفل فحص الحالات الناقصة بإيدك.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف حالات الطلب ([[OrderStatus]]) كـ enum كل حالة فيه شايلة نص عربي ولون، ومعاه getter بيقول الحالة نهائية ولا لأ، ودالة بتحوّل النص الجاي من السيرفر لحالة. وبعدين switch بيقول الخطوة الجاية لكل حالة. اتشغّل بـ [[dart run]] و [[dart analyze]] في [[docker run --rm dart:stable]] (Dart 3.13.5)، ومعاه التجارب.

---

## ١. القيم: [[pending('في الانتظار', 0xFFFFA000)]]

~~~dart
enum OrderStatus {
  pending('في الانتظار', 0xFFFFA000),
  shipped('اتشحن', 0xFF1976D2),
  delivered('وصل', 0xFF388E3C),
  cancelled('اتلغى', 0xFFD32F2F);
~~~

- [[enum]]: نوع ليه عدد ثابت من القيم، ومحدش يقدر يعمل قيمة جديدة وقت التشغيل.
- كل قيمة بعدها أقواس: دي نداء للـ constructor (تحت) بقيمتين: النص واللون.
- [[0xFFFFA000]]: رقم مكتوب بالـ hex ([[0x]] = نظام ستاشر). اقراه ٤ أزواج: [[FF]] الشفافية (Alpha، FF = مش شفاف خالص)، و [[FF]] الأحمر، و [[A0]] الأخضر، و [[00]] الأزرق. دا لون برتقالي. وفي Flutter [[Color(0xFFFFA000)]] بياخد نفس الرقم.
- القيم بينها [[,]]، وبعد آخر واحدة [[;]] لأن بعدها كود تاني (constructor و fields).

---

## ٢. الـ constructor والـ fields

~~~dart
  const OrderStatus(this.label, this.color);
  final String label;
  final int color;
~~~

- [[const]] إجباري: كل قيمة في الـ enum object ثابت بيتعمل مرة واحدة وقت الترجمة.
- وعشان كده الـ fields كلها [[final]] لازم.

---

## ٣. getter و static method

~~~dart
  bool get isFinal => this == delivered || this == cancelled;

  static OrderStatus fromApi(String raw) =>
      values.asNameMap()[raw] ?? OrderStatus.pending;
}
~~~

- [[isFinal]]: [[this]] هي الحالة اللي اتنادى عليها. و [[||]] = «أو». فـ true لو وصل أو اتلغى.
- [[static]]: الدالة تتنادى على الـ enum نفسه ([[OrderStatus.fromApi(...)]]) مش على قيمة.
- [[values]]: لستة فيها كل القيم بالترتيب. جوه الـ enum تقدر تكتبها كده من غير [[OrderStatus.]].
- [[asNameMap()]]: بتحوّل اللستة لـ map من الاسم للقيمة.
- [[asNameMap()[raw] ?? OrderStatus.pending]]: هات القيمة بالمفتاح [[raw]] من الـ map، ولو مش موجود بيرجع null، و [[??]] تحط pending مكانه. يعني نص غريب من السيرفر مش هيوقّع التطبيق.

جربت أطبع الحاجات دي:

~~~text dart run
[OrderStatus.pending, OrderStatus.shipped, OrderStatus.delivered, OrderStatus.cancelled]
{pending: OrderStatus.pending, shipped: OrderStatus.shipped, delivered: OrderStatus.delivered, cancelled: OrderStatus.cancelled}
null
~~~

السطر الأول [[values]]، والتاني [[asNameMap()]]، والتالت قراية المفتاح [['lost']] منها.

### وليه مش [[byName]]؟

[[values.byName('lost')]] بيعمل نفس الحكاية بس بيرمي error لو الاسم مش موجود. جربته:

~~~text dart run
Unhandled exception:
Invalid argument (name): No enum value with that name: "lost"
~~~

[[Invalid argument]] دا شكل [[ArgumentError]] لما يتطبع. مع بيانات جاية من بره، asNameMap و [[??]] أأمن.

---

## ٤. [[switch]] على الـ enum

~~~dart
String nextStep(OrderStatus s) => switch (s) {
  OrderStatus.pending => 'جهّز الطلب',
  OrderStatus.shipped => 'تابع الشحنة',
  OrderStatus.delivered || OrderStatus.cancelled => 'مفيش',
};
~~~

- [[switch (s) { ... }]] هنا **expression**: بيرجّع قيمة، فالدالة كلها [[=>]] سطر واحد.
- كل سطر: [[pattern => القيمة]]. أول pattern يطابق يكسب.
- [[||]] جوه الـ pattern: «دي أو دي» بنفس النتيجة.
- مفيش [[default]] ولا [[_]]: الـ compiler بيتأكد بنفسه إن كل الحالات متغطية (exhaustive).

---

## ٥. [[main]] والناتج

~~~dart
  final s = OrderStatus.fromApi('shipped');
  print('$__{s.name} $__{s.index} $__{s.label} $__{s.isFinal}');
  print(OrderStatus.fromApi('lost'));
  print(nextStep(OrderStatus.cancelled));
  print(OrderStatus.values.where((x) => !x.isFinal).map((x) => x.label).toList());
~~~

~~~text dart run
shipped 1 اتشحن false
OrderStatus.pending
مفيش
[في الانتظار, اتشحن]
~~~

| اللي اتطبع | جاي منين |
|---|---|
| [[shipped]] | [[.name]]: اسم القيمة كنص (جاهز في أي enum) |
| [[1]] | [[.index]]: ترتيبها من صفر (pending = 0) |
| [[اتشحن]] | [[label]] بتاعنا |
| [[false]] | [[isFinal]]: shipped مش نهائية |
| [[OrderStatus.pending]] | [['lost']] مش معروف، فرجعنا للاحتياطي. وطباعة قيمة enum بتطلع اسم النوع ونقطة واسمها |
| [[مفيش]] | سطر الـ [[||]] في الـ switch |
| آخر سطر | [[where]] سابت اللي مش نهائي ([[!]] = عكس)، و [[map]] خدت الـ label، و [[toList]] عملتها لستة |

---

## ٦. التجربة: حالة جديدة [[returned]]

ضفت [[returned('مرتجع', 0xFF6D4C41);]] ونقلت الـ [[;]] لآخرها. [[dart analyze]] وقف عند الـ switch:

~~~text dart analyze
error - The type 'OrderStatus' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'OrderStatus.returned'. Try adding a wildcard pattern or cases that match 'OrderStatus.returned'. - non_exhaustive_switch_expression
~~~

و [[dart run]] بيقول نفس المعنى: [[The type 'OrderStatus' is not exhaustively matched by the switch cases since it doesn't match 'OrderStatus.returned'.]] دي الميزة: أي حالة جديدة الـ compiler يوديك لكل switch محتاج يتعدل. بس [[isFinal]] مش switch، فمحدش هيفكّرك تعدّلها.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| قيمة ببيانات | [[pending('...', 0xFF...)]] | نداء للـ constructor |
| constructor | [[const OrderStatus(...)]] | لازم const، والـ fields final |
| جاهز في أي enum | [[.name]] و [[.index]] و [[values]] | الاسم، والترتيب، وكل القيم |
| من نص | [[values.asNameMap()[raw] ?? احتياطي]] | من غير ما يضرب |
| switch | من غير [[_]] | الـ compiler يمسك الحالة الناقصة |

> خزّن [[.name]] مش [[.index]]: الـ index بيتغير لو رتّبت القيم.`,
          lines: [
            "enum فيه بيانات.",
            "كل قيمة بتنادي الـ constructor: نص ولون (ARGB).",
            "قيمة.",
            "قيمة.",
            "آخر قيمة وبعدها [[;]].",
            "constructor لازم const.",
            "field لازم final.",
            "اللون كرقم (في Flutter: [[Color(color)]]).",
            "getter: هل الحالة نهائية؟",
            "دالة static بتحوّل نص السيرفر لقيمة...",
            "...ولو مش معروف ترجع pending بدل ما تضرب.",
            "قفلة الـ enum.",
            "switch expression على الـ enum.",
            "حالة.",
            "حالة.",
            "[[||]]: حالتين نفس النتيجة.",
            "قفلة الـ switch.",
            "البداية.",
            "من نص جاي من API.",
            "shipped 1 اتشحن false.",
            "نص مش معروف: OrderStatus.pending.",
            "مفيش.",
            "[في الانتظار, اتشحن]: الحالات اللي لسه مخلصتش.",
            "قفلة."
          ],
          sol: R`بعد ما تضيف [[returned]] (وتنقل الـ [[;]] لآخرها)، الـ compiler بيقف عند [[nextStep]]: [[The type 'OrderStatus' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'OrderStatus.returned']]. تصلّحه بإنك تضيف [[OrderStatus.returned => 'استلم المرتجع',]] أو تضمها لسطر مفيش. ولو عايزها حالة نهائية زوّدها في [[isFinal]] كمان، ودي الحاجة اللي الـ compiler مش هيفكّرك بيها لأنها مش switch.

ولو كنت كاتب [[_ => 'مفيش']] بدل الحالتين، الكود كان هيترجم عادي والحالة الجديدة كانت هتقع في «مفيش» من غير ما تاخد بالك.`
        }
      ]
    },
    {
      t: "كل حاجة widget",
      l: 1,
      n: "الشاشة شجرة widgets، والـ widget وصف بيتعمل من جديد كل ما حاجة تتغير، زي component في React",
      items: [
        {
          cmd: "runApp",
          title: "أول تطبيق: شجرة widgets من main للشاشة",
          desc: R`في Flutter كل حاجة widget: النص، والمسافة، والتوسيط، والشاشة كلها. والتطبيق شجرة: widget جوه widget. [[runApp]] بياخد الـ widget اللي فوق خالص ويخليه يملى الشاشة.

الشكل المعتاد: [[MaterialApp]] (الثيم والتنقل)، وجواه [[Scaffold]] (هيكل الشاشة: appBar و body و زرار عايم)، وجواه المحتوى. زي JSX بالظبط، بس بـ constructors بدل tags.`,
          example: R`import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('My first app')),
        body: const Center(child: Text('Hello Flutter')),
        floatingActionButton: FloatingActionButton(
          onPressed: () => debugPrint('tapped'),
          child: const Icon(Icons.add),
        ),
      ),
    ),
  );
}`,
          try: "امسح محتوى [[lib/main.dart]] وحط المثال ده، وشغّل. بعدين شيل الـ [[Scaffold]] وخلي [[home: const Text('Hello')]] بس، وشوف شكل النص.",
          flag: "script",
          deep: {
            why: "في Android أو iOS القديم فيه XML للشكل وكود منفصل للسلوك، ولازم تعدّل الشاشة بإيدك ([[textView.setText]]). Flutter زي React: بتوصف الشاشة لازم تبان إزاي حسب البيانات، و Flutter يتصرف.",
            how: R`الـ widget في Flutter object خفيف immutable: وصف للشكل، مش الحاجة المرسومة نفسها. بيتعمل ويترمي آلاف المرات في الثانية من غير مشكلة، زي React elements.

Flutter مبيستخدمش أزرار أو نصوص النظام (مش زي React Native اللي بيحوّل لـ views native). هو بيرسم كل بكسل بنفسه بمحرك الرسم Impeller. عشان كده الشكل واحد بالظبط على Android و iOS، وعشان كده الـ layout كله widgets: [[Center]] و [[Padding]] و [[Row]]، مش properties على العنصر زي CSS.

الـ widgets نوعين: فيه اللي بيرسم أو بيرتّب فعلًا (RichText و Padding و Row، ليهم RenderObject)، وفيه اللي بيجمّع widgets تانية (Text و Scaffold و MaterialApp وأي حاجة هتكتبها؛ Text مثلًا جواه RichText). والتطبيق كله بيبقى شجرة كبيرة، و Flutter بيحوّلها لشجرة elements ثم render objects (سؤال انترفيو في آخر التاب).

[[MaterialApp]] بيحط فوق الشجرة حاجات كتير: Theme و Navigator و Localizations و MediaQuery. أي widget تحته بيوصلها بـ [[Theme.of(context)]] وأخواتها. وفيه [[CupertinoApp]] لشكل iOS، بس معظم التطبيقات Material وبتظبط الشكل بالثيم.

وخلي بالك من الـ trailing commas: من Dart 3.7 الـ [[dart format]] هو اللي بيقرر يكسّر الشجرة سطور حسب طول السطر، وبيضيف أو يشيل الفاصلة الأخيرة بنفسه، فمتتعبش نفسك فيها. ولو عايز السلوك القديم (الفاصلة تجبره يكسّر)، حط [[trailing_commas: preserve]] تحت [[formatter:]] في [[analysis_options.yaml]].`,
            when: "كل تطبيق. MaterialApp مرة واحدة فوق خالص، و Scaffold لكل شاشة.",
            mistakes: R`تحط [[MaterialApp]] جوه كل شاشة: كده كل شاشة ليها Navigator وثيم منفصل، والتنقل والثيم يبوظوا. واحد بس فوق. وتنسى الـ Scaffold فالنص يطلع أحمر وتحته خطين أصفر: دا معناه مفيش Material فوقه يدّيله style.`
          },
          teach: R`## الكود بيعمل إيه؟

بيشغّل تطبيق شاشة واحدة: شريط فوق مكتوب فيه عنوان، ونص في نص الشاشة، وزرار عايم تحت لما تدوسه يطبع في الترمنال. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]] بطريقتين: [[flutter run -d web-server]] وفتحته في Chrome بعرض 411 وطول 800 (مقاس موبايل)، و widget test بـ [[flutter test]] قاس مكان كل حاجة بالـ pixel. مفيش موبايل هنا، بس الشكل واحد لأن Flutter بيرسم بنفسه.

---

## ١. [[import 'package:flutter/material.dart';]]

- [[import]]: هات الكود اللي في الملف ده.
- [[package:flutter/]]: من package اسمها flutter (جاية مع الـ SDK).
- [[material.dart]]: مكتبة Material Design: فيها [[MaterialApp]] و [[Scaffold]] و [[AppBar]] و [[Text]] و [[Icons]] وكل اللي في المثال.

---

## ٢. [[void main()]] و [[runApp(...)]]

~~~dart
void main() {
  runApp(
    MaterialApp( ... ),
  );
}
~~~

- [[main]]: أول دالة بتتنفذ، زي أي برنامج Dart.
- [[runApp]]: بتاخد widget واحد وتخليه **جذر** الشجرة (root)، وتمطّه على الشاشة كلها. كل اللي جواه بيبقى «عيال» ليه.

---

## ٣. الشجرة من فوق لتحت

~~~dart
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('My first app')),
        body: const Center(child: Text('Hello Flutter')),
        floatingActionButton: FloatingActionButton(
          onPressed: () => debugPrint('tapped'),
          child: const Icon(Icons.add),
        ),
      ),
    ),
~~~

كل widget هنا class، وبتعمله بنداء الـ constructor بتاعه، و **named parameters** ([[home:]] و [[appBar:]]) هي الـ «props». كده الشجرة شكلها:

~~~text الشجرة
MaterialApp
└─ Scaffold
   ├─ appBar: AppBar
   │          └─ title: Text('My first app')
   ├─ body: Center
   │        └─ child: Text('Hello Flutter')
   └─ floatingActionButton: FloatingActionButton
                            └─ child: Icon(Icons.add)
~~~

| الـ widget | بيعمل إيه |
|---|---|
| [[MaterialApp]] | الجذر: بيحط الثيم (الألوان والخطوط)، والتنقل بين الشاشات (Navigator)، واللغة لكل اللي تحته |
| [[home:]] | أول شاشة تظهر |
| [[Scaffold]] | هيكل شاشة Material جاهز: ليه أماكن معروفة (appBar و body و floatingActionButton)، وبيرسم الخلفية |
| [[AppBar]] | الشريط اللي فوق، و [[title:]] اللي مكتوب فيه |
| [[Center]] | بيحط ابنه في النص بالظبط |
| [[Text]] | نص |
| [[FloatingActionButton]] | الزرار العايم (FAB)، بيتحط تحت في الركن لوحده |
| [[Icon(Icons.add)]] | أيقونة +. و [[Icons]] فيه آلاف الأيقونات الجاهزة |

### الكلمات الصغيرة

- [[child:]] (ابن واحد) و [[children:]] (لستة عيال، هتشوفها في Row و Column): كده بتتبني الشجرة.
- [[const]] قدام [[Text('My first app')]]: الـ widget ثابت، بيتعمل مرة واحدة وقت الترجمة، ولما Flutter يعيد البناء يلاقيه هو هو فيتخطاه. قدام [[Center(...)]] الـ const بتغطي كل اللي جواه.
- [[onPressed: () => debugPrint('tapped')]]: [[() => ...]] دالة من غير اسم (closure) هتتنفذ لما الزرار يتداس. و [[debugPrint]] زي print بس مخصوصة لـ Flutter، وبتطبع في الترمنال اللي فيه [[flutter run]].
- مفيش [[const]] قدام [[FloatingActionButton]]: لأن الـ closure بيتعمل وقت التشغيل، فمستحيل يبقى ثابت.
- الفاصلة بعد آخر argument ([[),]]): اسمها trailing comma، وبتخلي [[dart format]] يكسّر الشجرة سطور بالشكل ده.

---

## ٤. اللي ظهر على الشاشة

في Chrome بعرض 411: شريط فوق مكتوب فيه [[My first app]] على خلفية بنفسجي فاتح جدًا (ألوان Material 3 الافتراضية)، و [[Hello Flutter]] في النص، وزرار مربع زواياه مدورة فيه + تحت على اليمين، وعلامة DEBUG في الركن (معناها إن ده debug build).

و widget test قاس الأماكن (x و y من الركن الشمال اللي فوق، بالـ logical pixels، ورتّبتهم تحت بعض):

~~~text flutter test (شاشة 411×800)
AppBar          x=0.0    y=0.0    w=411.0  h=56.0
Hello Flutter   x=112.9  y=418.0  w=185.3  h=20.0
FAB             x=339.0  y=728.0  w=56.0   h=56.0
~~~

- الـ AppBar ارتفاعه 56 وعرضه الشاشة كلها.
- الـ body بيبدأ تحت الـ AppBar (من 56 لـ 800، يعني 744). ونصه 56 + 372 = 428، والنص ارتفاعه 20، فبدايته 418. دا شغل [[Center]].
- الـ FAB مقاسه 56×56، وبعيد 16 عن اليمين وعن تحت: 411 − 56 − 16 = 339، و 800 − 56 − 16 = 728.
- عرض النص في الاختبار (185.3) مختلف شوية عن الحقيقي، لأن [[flutter test]] بيستخدم خط اختبار عرض كل حرف فيه ثابت.

لما دوست الزرار في Chrome، الـ console طبع:

~~~text الناتج
tapped
~~~

على الشاشة نفسها مفيش أي تغيير. debugPrint للـ developer بس.

### الشجرة الحقيقية أكبر بكتير

انت كتبت ٨ widgets تقريبًا. عدّيت الـ elements في الشجرة بعد ما الشاشة اتبنت:

~~~text flutter test
elements 262
~~~

كل widget جاهز (MaterialApp و Scaffold و AppBar) بيبني widgets تانية جواه: Theme و Navigator و Material و Padding و DefaultTextStyle وغيرهم. و [[Text]] نفسه جواه [[RichText]]. دا اللي يقصدوه بـ «كل حاجة widget».

---

## ٥. التجربة: [[home: const Text('Hello')]] من غير Scaffold

في Chrome: كلمة [[Hello]] كبيرة لازقة في الركن الشمال فوق، بلون أحمر وتحتها خطين أصفر، والخلفية بيضا من غير شريط. قريت الـ style اللي اتحط عليها في widget test (كل خاصية في سطر):

~~~text flutter test
color=Color(alpha: 0.8157, red: 1.0000, green: 0.0000, blue: 0.0000, colorSpace: ColorSpace.sRGB)
deco=TextDecoration.underline
decoColor=Color(alpha: 1.0000, red: 1.0000, green: 1.0000, blue: 0.0000, colorSpace: ColorSpace.sRGB)
style=TextDecorationStyle.double
size=48.0
~~~

- أحمر شفافيته حوالي ٨٢٪، وخط تحت [[double]] (خطين) لونه أصفر (أحمر + أخضر = أصفر)، وحجم 48.
- دا مش error. دا style «إنذار» بيحطه Flutter لأي نص مفيش فوقه [[Material]] (الـ Scaffold هو اللي كان بيحطه) عشان تاخد بالك.
- والنص واخد الشاشة كلها (411×800) لأن [[home]] بيدّي ابنه حجم الشاشة بالظبط، فمفيش Center يوسّطه.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[runApp(widget)]] | الـ widget ده جذر الشجرة ويملى الشاشة |
| [[MaterialApp]] | مرة واحدة فوق خالص: ثيم وتنقل ولغة |
| [[Scaffold]] | هيكل كل شاشة: appBar و body و FAB، وبيدّي النصوص شكلها |
| [[child:]] و [[children:]] | كده الشجرة بتتبني |
| [[const]] | widget ثابت، Flutter بيتخطاه في إعادة البناء |
| نص أحمر وتحته خطين أصفر | مفيش Material فوقه: رجّع الـ Scaffold |`,
          lines: [
            "مكتبة Material: فيها كل الـ widgets الجاهزة.",
            "نقطة البداية.",
            "اعرض الـ widget ده على الشاشة كلها.",
            "الـ root: بيدّي ثيم وتنقل ولغة لكل اللي تحته.",
            "[[home]]: أول شاشة. و Scaffold هيكل شاشة Material.",
            "الشريط اللي فوق وفيه العنوان.",
            "المحتوى: نص في النص بالظبط.",
            "زرار عايم تحت في الركن.",
            "الدالة اللي تتنفذ لما تدوس. [[debugPrint]] بيطبع في الترمنال.",
            "الأيقونة جوه الزرار.",
            "قفلة الزرار.",
            "قفلة الـ Scaffold.",
            "قفلة الـ MaterialApp.",
            "قفلة runApp.",
            "قفلة main."
          ],
          sol: R`المثال زي ما هو: شريط فوق مكتوب فيه [[My first app]]، و [[Hello Flutter]] في نص الشاشة بالظبط، وزرار + تحت في الركن. لما تدوس عليه الترمنال اللي فيه [[flutter run]] يطبع [[tapped]] (مش على الشاشة).

لما تخلي [[home: const Text('Hello')]] بس: كلمة Hello بتظهر لازقة في الركن اللي فوق خالص (ممكن تحت الـ status bar بتاع الموبايل)، بلون أحمر وتحتها خطين أصفر. دا مش error بيوقّف التطبيق، دا الـ style الاحتياطي اللي Flutter بيحطه لأي نص مفيش فوقه Material (Scaffold أو Material widget) عشان يلفت نظرك. ومفيش خلفية بيضا كمان، لأن الـ Scaffold هو اللي كان بيرسمها.

الغلط الشائع إنك تصلّح الشكل ده بإنك تحط [[TextStyle(color: ..., decoration: TextDecoration.none)]] على النص. الحل الصح إنك ترجّع الـ Scaffold (أو تلف المحتوى في [[Material]])، فالنص ياخد الخط والألوان من الثيم.`
        },
        {
          cmd: "StatelessWidget",
          title: "widget بتاعك بياخد بيانات ويرسمها ومفيش حاجة جواه بتتغير",
          desc: R`لما الشجرة تكبر بتقسّمها لـ widgets بتاعتك. [[StatelessWidget]] class فيه دالة [[build]] بترجّع شجرة widgets، والبيانات بتيجي من الـ constructor. زي function component في React من غير state، والـ fields هي الـ props.

كل الـ fields لازم [[final]]: الـ widget مبيتغيرش، ولو البيانات اتغيرت الأب بيعمل widget جديد بالقيم الجديدة.`,
          example: R`import 'package:flutter/material.dart';

class ProductTile extends StatelessWidget {
  const ProductTile({super.key, required this.name, required this.price, this.onTap});

  final String name;
  final double price;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(name),
      subtitle: Text('$__{price.toStringAsFixed(2)} EGP'),
      onTap: onTap,
    );
  }
}`,
          try: R`استخدمه في body: [[Column(children: [ProductTile(name: 'Tea', price: 10, onTap: () => debugPrint('tea')), const ProductTile(name: 'Coffee', price: 25)])]]. لاحظ إن التاني ينفع const والأول لأ (بسبب الدالة).`,
          flag: "script",
          deep: {
            why: "لو كتبت الشاشة كلها في build واحدة هتبقى ٣٠٠ سطر متداخلين. الـ widgets الصغيرة بتتقرا، وتتعاد في أكتر من مكان، وكمان أسرع: Flutter بيقدر يتخطى rebuild لـ widget مبيتغيرش.",
            how: R`[[build]] بتتنادى كل مرة Flutter محتاج يعرف شكل الـ widget: أول مرة يتحط في الشجرة، ولما الأب يعيد البناء ويبعت widget جديد، ولما حاجة الـ widget معتمد عليها تتغير (زي [[Theme.of(context)]] أو [[MediaQuery]]). ممكن تتنادى ٦٠ مرة في الثانية أثناء animation، فلازم تبقى سريعة ومن غير side effects: متعملش فيها طلب API ولا تكتب في ملف.

[[super.key]] اختصار لإنك تاخد [[Key? key]] وتبعته للأب. الـ key بيساعد Flutter يعرف مين مين لما widgets من نفس النوع تتحرك (درس ValueKey في المستوى ٣).

[[const]] constructor: لو كل الـ arguments ثابتة، اللي بيستخدمه يكتب [[const ProductTile(name: 'Tea', price: 10)]] والـ object يتعمل مرة واحدة بس. ولما الأب يعيد البناء، Flutter بيلاقي نفس الـ object بالظبط فبيتخطاه كله.

[[BuildContext]] هو مكان الـ widget في الشجرة. من خلاله بتوصل للحاجات اللي فوقك: الثيم، وحجم الشاشة، والـ Navigator.

المقارنة بـ React: [[function ProductTile({ name, price, onTap })]] بترجّع JSX. هنا class و build، والـ props fields final. وليه class مش دالة؟ عشان Flutter بيقارن نوع الـ widget ومكانه، وبيقدر يعمله const، ودا أسهل بالـ classes.`,
            when: "أي جزء في الشاشة بيعرض بيانات جاية من بره ومفيش حاجة جواه بتتغير لوحدها: كارت منتج، هيدر، زرار مخصوص، صف في لستة.",
            mistakes: R`تقسّم الشاشة لدوال زي [[Widget _buildHeader()]] بدل widgets: الدالة بتتنفذ مع كل rebuild للأب ومبتقدرش تبقى const ولا ليها context خاص بيها، و docs Flutter نفسها بتفضّل الـ widget. وتحط field مش final في StatelessWidget وتغيّره وتستنى الشاشة تتحدث: مش هتتحدث، دا مكانه StatefulWidget.`
          },
          teach: R`## الكود بيعمل إيه؟

بيعرّف widget بتاعك اسمه [[ProductTile]]: بياخد اسم منتج وسعر ودالة ضغط اختيارية، ويرسمهم سطر في لستة. مفيش حاجة جواه بتتغير، فهو [[StatelessWidget]]. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: [[flutter analyze]]، و widget test على شاشة 411×800، و [[flutter run -d web-server]] في Chrome، بالاستخدام اللي في «جرّب» (Tea و Coffee في Column).

---

## ١. [[class ProductTile extends StatelessWidget]]

- [[class ProductTile]]: الـ widget بتاعك class عادي، واسمه بحرف كبير.
- [[extends StatelessWidget]]: بيورث من StatelessWidget، فـ Flutter يعرف يحطه في الشجرة. والشرط الوحيد: تكتب دالة [[build]].

---

## ٢. الـ constructor: [[const ProductTile({super.key, required this.name, ...})]]

~~~dart
  const ProductTile({super.key, required this.name, required this.price, this.onTap});
~~~

| الحتة | معناها |
|---|---|
| [[const]] | ينفع يتعمل منه object ثابت لو القيم كلها ثابتة |
| [[{ ... }]] | الأقواس المعقوفة = named parameters: بتتكتب بالاسم [[name: 'Tea']] |
| [[super.key]] | خد parameter اسمه key وابعته للأب (StatelessWidget). الـ key بيساعد Flutter يفرّق بين widgets من نفس النوع |
| [[required this.name]] | لازم يتبعت، وقيمته تروح للـ field على طول |
| [[this.onTap]] | من غير required: اختياري، ولو متبعتش يبقى null |

---

## ٣. الـ fields (الـ props)

~~~dart
  final String name;
  final double price;
  final VoidCallback? onTap;
~~~

- كلها [[final]]: الـ widget مبيتغيرش بعد ما يتعمل. لو الأب عايز سعر جديد، بيعمل ProductTile جديد.
- [[VoidCallback]]: اسم جاهز في Flutter لنوع «دالة مش بتاخد حاجة ومش بترجّع حاجة»، يعني [[void Function()]].
- [[?]] بعده: ممكن تبقى null (درس null safety). ودا اللي بيخلي onTap اختياري.

---

## ٤. [[build]]

~~~dart
  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(name),
      subtitle: Text('$__{price.toStringAsFixed(2)} EGP'),
      onTap: onTap,
    );
  }
~~~

- [[@override]]: بتكتب نسخة من [[build]] اللي الأب طالبها.
- [[Widget build(BuildContext context)]]: بترجّع [[Widget]] (شكل الـ widget ده)، وبتاخد [[context]]: مكان الـ widget في الشجرة، ومنه بتوصل للثيم وحجم الشاشة.
- [[ListTile]]: widget جاهز في Material: سطر فيه [[title]] (عنوان) وتحته [[subtitle]] (عنوان فرعي)، وبيتعامل مع الضغط.
- [[Text(name)]]: [[name]] من غير [[this.]] لأننا جوه الـ class.
- [[$__{price.toStringAsFixed(2)}]]: السعر برقمين بعد العلامة. و [[$__{ }]] لأن جوه النص فيه نداء دالة.
- [[onTap: onTap]]: الشمال اسم الـ parameter في ListTile، واليمين الـ field بتاعنا. يعني «وصّل دالة الضغط اللي جاتلي للـ ListTile».

---

## ٥. الاستخدام والناتج

~~~dart
Column(children: [
  ProductTile(name: 'Tea', price: 10, onTap: () => debugPrint('tea')),
  const ProductTile(name: 'Coffee', price: 25),
])
~~~

الـ widget test قرا النصوص بالترتيب، وقاس السطرين، ودوس على الاتنين:

~~~text flutter test (شاشة 411×800)
texts [Tea, 10.00 EGP, Coffee, 25.00 EGP]
tile1 x=0.0 y=0.0 w=411.0 h=72.0
tile2 x=0.0 y=72.0 w=411.0 h=72.0
logs [tea]
inkwell enabled: [true, false]
~~~

- [[10.00 EGP]]: بعتنا [[10]] بس، و [[toStringAsFixed(2)]] كتبها برقمين.
- [[price: 10]] من غير [[.0]] اترجم مع إن النوع double: Dart بيحوّل الرقم الصحيح المكتوب في الكود لـ double لوحده.
- كل سطر 72 ارتفاع (ListTile فيه عنوان فرعي)، وعرضه الشاشة كلها، والتاني بيبدأ عند 72.
- سطر [[logs]]: دوست على الاتنين واتطبع [[tea]] بس. وفي Chrome لما دوست على Tea الـ console طبع [[tea]] كمان.
- سطر [[inkwell enabled]]: الـ ListTile جواه [[InkWell]] (اللي بيعمل تأثير الضغط). بتاع Tea شغال، وبتاع Coffee مقفول لأن onTap بتاعه null، فمفيش حتى تأثير ضغط.

### ليه Coffee ينفع [[const]] و Tea لأ؟

حطيت [[const]] قدام Tea، و [[flutter analyze]] قال:

~~~text flutter analyze
error • Invalid constant value • lib/ex/l07const.dart:4:84 • invalid_constant
~~~

العمود 84 هو بداية [[() => debugPrint('tea')]]. الـ closure بيتعمل وقت التشغيل، فالـ widget كله ميبقاش ثابت. Coffee كل قيمه نص ورقم، فـ const تمام، ولما الأب يعيد البناء Flutter يتخطاه.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| widget بتاعك | [[extends StatelessWidget]] | لازم تكتب build |
| الـ props | [[final]] fields | الـ widget مبيتغيرش |
| parameters | [[{super.key, required this.x, this.y}]] | named، واللي من غير required اختياري |
| دالة ضغط | [[VoidCallback?]] | دالة من غير arguments، وممكن null |
| [[build]] | [[Widget build(BuildContext context)]] | بترجّع الشكل، ومن غير side effects |
| [[const]] | لما كل القيم ثابتة | Flutter يتخطاه في إعادة البناء |`,
          lines: [
            "مكتبة Material.",
            "widget بتاعك: class بيورث StatelessWidget.",
            "constructor [[const]] بـ named parameters، و [[super.key]] بيبعت الـ key للأب.",
            "البيانات: final كلها.",
            "السعر.",
            "دالة الضغط، ممكن متتبعتش ([[VoidCallback]] = دالة من غير arguments ولا return).",
            "بتعيد تعريف build من الأب.",
            "build بتاخد context وبترجّع الشكل.",
            "ListTile: سطر جاهز فيه عنوان وتحته عنوان فرعي.",
            "العنوان.",
            "السعر برقمين بعد العلامة.",
            "وصّل الضغط للي بعت الدالة (زي onClick في props).",
            "قفلة ListTile.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`هتشوف سطرين تحت بعض: [[Tea]] وتحته [[10.00 EGP]]، و [[Coffee]] وتحته [[25.00 EGP]] (السعر برقمين بعد العلامة حتى لو بعته 10 بس، بسبب [[toStringAsFixed(2)]]). لما تدوس على Tea الترمنال يطبع [[tea]] وفيه تأثير ضغط، و Coffee مش بيعمل حاجة ولا حتى تأثير ضغط، لأن onTap بتاعها null.

ولو حاولت تكتب [[const]] قدام Tea: [[Invalid constant value]] على الـ [[() => debugPrint('tea')]]. الـ closure بيتعمل وقت التشغيل، فمستحيل الـ widget كله يبقى const. Coffee كل قيمه ثابتة (نص ورقم) فـ const تمام.

وملحوظة: [[price: 10]] من غير [[.0]] بيترجم عادي مع إن النوع double، لأن Dart بيحوّل الرقم الصحيح المكتوب في الكود لـ double لوحده.`
        },
        {
          cmd: "setState",
          title: "شاشة بتتغير لما المستخدم يدوس",
          desc: R`لما حاجة جوه الـ widget نفسه بتتغير (عدّاد، checkbox، تاب مختار)، بتستخدم [[StatefulWidget]]. هو class صغير بيعمل [[State]]، والـ State هو اللي فيه المتغيرات و build.

وعشان الشاشة تتحدث، بتغيّر المتغير جوه [[setState(() { ... })]]. دي بتقول لـ Flutter «الـ state اتغيرت، ابني الـ widget ده تاني». زي [[setCount]] في [[useState]]، بس هنا بتعدّل المتغير بنفسك جوه الدالة.`,
          example: R`import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  const Counter({super.key, this.start = 0});
  final int start;
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  late int _count = widget.start;
  @override
  Widget build(BuildContext context) => TextButton(
        onPressed: () => setState(() => _count++),
        child: Text('Tapped $_count times'),
      );
}`,
          try: "شيل [[setState]] وخلي [[onPressed: () => _count++]] ودوس كام مرة: الرقم مش بيتغير. اعمل hot reload: فجأة يظهر الرقم الصح. دا معناه إن المتغير اتغير بس محدش قال لـ Flutter يرسم.",
          flag: "script",
          deep: {
            why: "الـ widget نفسه immutable، يعني مينفعش يغيّر نفسه. فالـ state اللي بتعيش أطول من widget واحد لازم تتحط في حتة تانية: الـ State object، اللي Flutter بيحتفظ بيه بين كل rebuild والتاني.",
            how: R`ليه classين؟ الـ [[Counter]] widget بيتعمل من جديد كل ما الأب يعيد البناء (ممكن كل frame). لو الـ count جواه كان هيرجع للصفر كل مرة. فـ Flutter بيعمل الـ [[_CounterState]] مرة واحدة ويربطه بمكان الـ widget في الشجرة (الـ element)، ولما widget جديد من نفس النوع ييجي في نفس المكان، بيحدّث [[widget]] جوه الـ State ويسيب المتغيرات زي ما هي.

[[setState]] مش بيعيد البناء على طول. بيعلّم الـ element إنه dirty، وفي الـ frame الجاي Flutter بيعيد build لكل الـ dirty elements مرة واحدة. فلو ناديت setState ٥ مرات ورا بعض، build بيحصل مرة.

الـ callback بتاع setState لازم يبقى sync ويغيّر الـ state بس. ينفع تغيّر المتغير قبلها وتنادي [[setState(() {})]] فاضية وهتشتغل، بس اكتب التغيير جواها عشان اللي يقرا يعرف إيه اللي اتغير.

الـ rebuild بيشمل الـ widget ده وكل اللي تحته، مش الشاشة كلها. عشان كده حط الـ state في أصغر widget محتاجها.

والفرق عن React: [[useState]] بيرجّع قيمة جديدة ومبتعدّلش القديمة. هنا بتعدّل الـ field نفسه ([[_count++]]) والـ setState بتقول «ابني تاني» بس. فلو عندك list، [[_items.add(x)]] جوه setState تمام، مش لازم list جديدة.`,
            when: "state محلية تخص widget واحد: حقل مفتوح ولا مقفول، التاب المختار، قيمة slider، animation. لو أكتر من شاشة محتاجة نفس البيانات، ارفعها لفوق أو استخدم Riverpod (المستوى ٢).",
            mistakes: R`تغيّر المتغير من غير setState فالشاشة متتحدثش، وتلاقيها اتحدثت فجأة بعد hot reload. وتنادي setState بعد await والشاشة اتقفلت، فيضرب [[setState() called after dispose()]]: اسأل [[if (!mounted) return;]] قبلها. وتحط async جوه setState ([[setState(() async {...})]]): Flutter بيرفضها، اعمل await الأول وبعدين setState بالنتيجة.`
          },
          teach: R`## الكود بيعمل إيه؟

زرار مكتوب عليه [[Tapped 0 times]]، وكل ما تدوسه الرقم يزيد. الرقم ده **state**: حاجة جوه الـ widget بتتغير، فمحتاجين [[StatefulWidget]] و [[setState]]. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]] بـ widget tests بتدوس الزرار وتقرا النص وتعدّ مرات [[build]]، ومعاها تجربة «جرّب» (من غير setState ثم hot reload).

---

## ١. الجزء الأول: الـ widget نفسه

~~~dart
class Counter extends StatefulWidget {
  const Counter({super.key, this.start = 0});
  final int start;
  @override
  State<Counter> createState() => _CounterState();
}
~~~

- [[extends StatefulWidget]]: widget ليه state. بس الـ class ده نفسه لسه immutable: فيه الإعدادات اللي جاية من بره بس.
- [[this.start = 0]]: named parameter ليه قيمة افتراضية. [[Counter()]] يبدأ من 0، و [[Counter(start: 5)]] من 5.
- [[createState()]]: Flutter بيناديها **مرة واحدة** لما الـ widget يدخل الشجرة، عشان يعمل الـ object اللي هيشيل الـ state.
- [[State<Counter>]]: نوع الرجوع: State خاص بـ Counter (درس generics). و [[=> _CounterState()]] بيعمل واحد جديد.

---

## ٢. الجزء التاني: الـ State

~~~dart
class _CounterState extends State<Counter> {
  late int _count = widget.start;
~~~

- [[_CounterState]]: الـ [[_]] في أول الاسم = private للملف، لأن محدش بره محتاج يشوفه.
- [[extends State<Counter>]]: الـ State ده مربوط بـ Counter، فجواه [[widget]] نوعها Counter.
- [[widget.start]]: كده بتقرا الـ props من جوه الـ State.
- [[late]]: القيمة الأولية دي مش هتتحسب غير أول مرة حد يقرا [[_count]] (في أول build). من غيرها Dart بيحسبها وقت إنشاء الـ object، قبل ما [[widget]] تبقى متاحة، فبيرفض يترجم. جربت أشيلها:

~~~text flutter analyze
error • The instance member 'widget' can't be accessed in an initializer. Try replacing the reference to the instance member with a different expression • lib/ex/l08nolate.dart:11:16 • implicit_this_reference_in_initializer
~~~

- [[_count]] field عادي **مش final**: دا اللي بيتغير.

---

## ٣. [[build]] و [[setState]]

~~~dart
  @override
  Widget build(BuildContext context) => TextButton(
        onPressed: () => setState(() => _count++),
        child: Text('Tapped $_count times'),
      );
}
~~~

- [[build]] هنا **في الـ State** مش في الـ widget، عشان تقدر تقرا [[_count]].
- [[TextButton]]: زرار نص من غير خلفية. [[onPressed]] اللي يحصل لما يتداس.
- [[setState(() => _count++)]]: من جوه لبرة:
  - [[_count++]]: زوّد واحد.
  - [[() => ...]]: حطيناها في دالة صغيرة.
  - [[setState(...)]]: نفّذ الدالة دي، وبعدين علّم الـ widget ده إنه محتاج يتبني تاني (dirty). في الـ frame الجاي Flutter ينادي build، والنص يتحدث.

### الناتج

دوست الزرار ٣ مرات في widget test:

~~~text flutter test
after 3 taps: Tapped 3 times
~~~

---

## ٤. ليه classين؟ الـ State بيعيش أطول من الـ widget

بعد الـ ٣ ضغطات، الأب بعت widget جديد: [[Counter(start: 5)]] في نفس المكان:

~~~text flutter test
parent sends start 5: Tapped 3 times
~~~

الرقم **فضل 3**. Flutter لقى widget من نفس النوع في نفس المكان، فسابه يستخدم نفس الـ State (والـ [[_count]] زي ما هو)، وبس حدّث [[widget]] جواه. و [[late int _count = widget.start]] اتحسبت مرة واحدة في الأول ومش هتتحسب تاني. لو عايز تتفاعل مع start جديدة، دا شغل [[didUpdateWidget]] (الدرس الجاي).

ولما بعت نفس الـ widget بـ key مختلف [[Counter(key: ValueKey(2), start: 5)]]:

~~~text flutter test
new key start 5: Tapped 5 times
~~~

الـ key الجديد قال لـ Flutter «دا واحد تاني»، فرمى الـ State القديم وعمل واحد جديد قرا start = 5.

---

## ٥. [[setState]] ٥ مرات = build مرة

عملت زرار بينادي [[setState(() => _count++)]] جوه loop ٥ مرات، وعدّيت مرات build:

~~~text flutter test
Tapped 5 times builds added=1
~~~

الـ ٥ زيادات حصلوا، بس build اتنادت مرة واحدة. setState مش بتبني على طول: بتعلّم إن فيه تغيير، و Flutter بيبني مرة في الـ frame الجاي.

---

## ٦. التجربة: من غير [[setState]]

خليت [[onPressed: () => _count++]]، ودوست ٣ مرات، وقريت النص والـ field وعدد مرات build:

~~~text flutter test
before reload: Tapped 0 times field=3 builds=1
~~~

- الشاشة لسه [[0]]، ومفيش أي error.
- بس الـ field فيه [[3]]: المتغير اتغير فعلًا.
- و build اتنادت مرة واحدة بس (أول ما الشاشة اتبنت). محدش طلب إعادة بناء.

وبعدين عملت hot reload (في الاختبار: [[reassembleApplication]]، ودا اللي [[r]] بيعمله):

~~~text flutter test
after reload: Tapped 3 times builds=2
~~~

الـ reload بيعيد build لكل حاجة، فـ build قرت القيمة الحالية. ودا بيثبت إن الـ State فضل عايش، وإن المشكلة كانت إن محدش قال لـ Flutter «ارسم».

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| الـ widget | [[extends StatefulWidget]] + [[createState]] | الإعدادات من بره، و immutable |
| الـ State | [[extends State<Counter>]] | المتغيرات و build، وبيعيش بين كل rebuild |
| الـ props جوه الـ State | [[widget.start]] | |
| [[late]] | [[late int _count = widget.start]] | تتحسب أول ما تتقري، مرة واحدة |
| [[setState(() { ... })]] | غيّر وقول «ابني تاني» | build مرة في الـ frame الجاي |

> المتغير بيتغير من غير setState، اللي ناقص هو طلب الرسم.`,
          lines: [
            "مكتبة Material.",
            "الجزء الثابت: StatefulWidget، وفيه الإعدادات اللي جاية من بره بس.",
            "constructor، و start ليها قيمة افتراضية.",
            "قيمة البداية (زي prop).",
            "بتعيد تعريف دالة من الأب.",
            "بيعمل الـ State. Flutter بيناديها مرة لما الـ widget يدخل الشجرة.",
            "قفلة.",
            "الـ State: هنا المتغيرات اللي بتتغير، و [[_]] عشان محدش بره الملف يحتاجها.",
            "[[widget.start]] بيقرا الـ props. و [[late]] عشان [[widget]] مش متاح غير بعد الإنشاء.",
            "بتعيد تعريف build.",
            "build هنا في الـ State مش في الـ widget.",
            "غيّر المتغير جوه setState، فـ Flutter يعيد build.",
            "النص بالقيمة الحالية.",
            "قفلة الزرار.",
            "قفلة الـ State."
          ],
          sol: R`مع [[setState]]: كل ضغطة النص يزيد [[Tapped 1 times]] ثم [[Tapped 2 times]]. من غيرها: دوس ٣ مرات والشاشة لسه [[Tapped 0 times]]، ومفيش أي error ولا warning. واعمل hot reload (r): الشاشة تقول [[Tapped 3 times]] مرة واحدة. (جرّبت ده في widget test: قبل الـ reload الـ Text كان 0، وبعد reassemble بقى 3.)

التفسير: [[_count++]] اشتغلت فعلًا ٣ مرات والـ field فيه 3، بس محدش علّم الـ element إنه dirty، فـ build متنادتش. الـ hot reload بيعمل rebuild للشجرة كلها، فـ build اتنادت وقرت القيمة الحالية. ودا بيثبت إن الـ State فاضلة بعد reload.

الغلط الشائع في التفسير: «الضغط مش شغال» أو «المتغير مش بيتغير». الاتنين غلط: المتغير بيتغير، اللي ناقص هو طلب إعادة الرسم. ونفس العَرَض هتشوفه لما تعدّل list أو object جوه State من غير setState.`
        },
        {
          cmd: "initState و dispose",
          title: "كود يشتغل مرة لما الشاشة تفتح ومرة لما تتقفل",
          desc: R`[[initState]] بيتنادى مرة واحدة لما الـ State يتعمل، قبل أول build: هنا تعمل controllers، وتبدأ تحميل البيانات، وتعمل listen. و [[dispose]] بيتنادى مرة لما الـ widget يتشال من الشجرة نهائيًا: هنا تقفل كل اللي فتحته.

زي [[useEffect]] بـ dependency array فاضية ومعاه cleanup في React، بس متقسّم على دالتين واضحين. وفيه [[didUpdateWidget]] لما الأب يبعت props جديدة.`,
          example: R`// imports: dart:async و material. و Clock نفسه StatefulWidget عادي زي Counter.
class _ClockState extends State<Clock> {
  late final Timer _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => setState(() {}));
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Text(DateTime.now().toString().substring(11, 19));
}`,
          try: "حط الساعة في شاشة تانية بتفتحها بـ Navigator، وضيف [[debugPrint('tick')]] جوه الـ timer. ارجع من الشاشة: الـ tick وقف. امسح [[_timer.cancel()]] وجرّب تاني: الـ tick شغال والشاشة مقفولة، ومعاه error.",
          flag: "script",
          deep: {
            why: "فيه حاجات لازم تتعمل مرة واحدة مش مع كل build: تبدأ timer، تفتح اتصال، تعمل controller، تطلب بيانات. ولو فتحتها لازم تقفلها لما الشاشة تمشي، وإلا هتفضل شغالة في الخلفية تاكل بطارية وذاكرة وتنادي setState على شاشة مش موجودة.",
            how: R`دورة حياة الـ State بالترتيب:
- [[createState]]: الـ widget بيعمل الـ State.
- [[initState]]: مرة واحدة. و [[mounted]] بقت true. و [[context]] موجود، بس متستخدموش في حاجات بتعتمد على inherited widgets (زي Theme و MediaQuery)، ودي مكانها didChangeDependencies أو build.
- [[didChangeDependencies]]: بعد initState، وكل ما inherited widget انت معتمد عليه يتغير.
- [[build]]: كتير.
- [[didUpdateWidget(oldWidget)]]: الأب بعت widget جديد من نفس النوع في نفس المكان. هنا تقارن [[oldWidget.userId != widget.userId]] وتعيد التحميل لو لازم.
- [[deactivate]] ثم [[dispose]]: الـ widget اتشال. بعد dispose [[mounted]] بقت false، وأي setState هيضرب.

ترتيب [[super]]: في initState نادي [[super.initState()]] الأول، وفي dispose [[super.dispose()]] في الآخر. زي ما بتبني من الأساس وتهد من فوق.

الحاجات اللي لازم تتقفل في dispose: [[Timer]]، و [[StreamSubscription]]، و [[TextEditingController]] و [[ScrollController]] و [[AnimationController]] و [[FocusNode]]، وأي listener ضفته بـ [[addListener]].

initState مينفعش تبقى async (Flutter بيرمي error لو رجّعت Future). ابدأ العملية جواها من غير [[await]] وخزّن الـ Future في متغير (درس FutureBuilder في المستوى ٢).`,
            when: "أي controller، أو timer، أو subscription، أو تحميل بيانات أول ما الشاشة تفتح.",
            mistakes: R`تكتب [[void initState() async]]. وتنسى dispose لـ controller فيبقى memory leak. وتعمل الـ controller جوه build: كل rebuild يعمل واحد جديد والنص اللي المستخدم كتبه يروح. وتستخدم [[Theme.of(context)]] جوه initState فيطلع error، حطه في build.`
          },
          teach: R`## الكود بيعمل إيه؟

ساعة بتعرض الوقت [[HH:mm:ss]] وبتتحدث كل ثانية. الـ timer بيتعمل مرة واحدة لما الساعة تظهر ([[initState]])، وبيتقفل لما تختفي ([[dispose]]). اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: الـ solCode كامل اتشغّل بـ [[flutter run -d web-server]] وفتحته في Chrome (دوست «open clock»، واستنيت ٣ ثواني، ورجعت)، و widget tests سجّلت ترتيب دوال الـ lifecycle وعدّت الـ ticks.

---

## ١. الـ State والـ timer

~~~dart
class _ClockState extends State<Clock> {
  late final Timer _timer;
~~~

- [[Clock]] نفسه StatefulWidget عادي (الـ solCode فيه الـ class كامل)، وده الـ State بتاعه.
- [[Timer]]: من [[dart:async]]. بيشغّل دالة بعد مدة، أو كل مدة.
- [[late final]]: [[final]] يعني هيتحط مرة واحدة بس، و [[late]] يعني «مش دلوقتي، هحطه بعدين قبل ما حد يقراه». هيتحط في initState.

---

## ٢. [[initState]]

~~~dart
  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => setState(() {}));
  }
~~~

- [[initState]]: Flutter بيناديها **مرة واحدة** بعد ما الـ State يتعمل، قبل أول build.
- [[super.initState()]]: خلّي الأب يعمل اللي عليه الأول. لازم أول سطر.
- [[Timer.periodic(مدة, دالة)]]: نادي الدالة كل مدة لحد ما حد يعمل cancel.
- [[const Duration(seconds: 1)]]: ثانية واحدة.
- [[(_)]]: الدالة بتاخد الـ timer نفسه كـ argument، ومش محتاجينه، فاسمه [[_]] (عرف: «مش هستخدمه»).
- [[setState(() {})]]: فاضية. مفيش متغير بيتغير، بس عايزين build تتنادى تاني عشان تقرا الوقت الجديد.

---

## ٣. [[dispose]]

~~~dart
  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }
~~~

- [[dispose]]: Flutter بيناديها **مرة واحدة** لما الـ widget يتشال من الشجرة نهائيًا.
- [[_timer.cancel()]]: وقّف الـ timer.
- [[super.dispose()]]: **آخر** سطر. انت بتقفل حاجاتك الأول، وبعدين الأب يقفل حاجاته. (عكس initState.)

---

## ٤. [[build]]: الوقت كنص

~~~dart
  @override
  Widget build(BuildContext context) => Text(DateTime.now().toString().substring(11, 19));
~~~

- [[DateTime.now()]]: الوقت دلوقتي.
- [[.toString()]]: جربته على وقت ثابت في [[dart run]]:

~~~text dart run
2026-10-07 14:03:05.000
14:03:05
~~~

- [[.substring(11, 19)]]: الحروف من رقم 11 لحد قبل 19. الترقيم من صفر، فـ [[2026-10-07 ]] (التاريخ والمسافة) هما أول 11 حرف، والـ 8 اللي بعدهم هما الساعة.

---

## ٥. ترتيب دوال الـ lifecycle

عملت State بيسجّل كل دالة بتتنادى، وحطيته في الشجرة، وبعدين بعت نفس الـ widget بـ id جديد، وبعدين شلته:

~~~text flutter test
constructor
initState mounted=true
didChangeDependencies
build id=1
didUpdateWidget 1->2
build id=2
deactivate
dispose mounted=true
~~~

| الدالة | إمتى | تعمل فيها إيه |
|---|---|---|
| [[initState]] | مرة، أول ما يدخل الشجرة | controllers و timers وتبدأ تحمّل |
| [[didChangeDependencies]] | بعدها على طول، وكل ما Theme أو MediaQuery اللي بتستخدمه يتغير | اللي محتاج [[context]] من فوق |
| [[build]] | كتير | ترجّع الشكل بس |
| [[didUpdateWidget]] | الأب بعت widget جديد في نفس المكان | قارن [[oldWidget]] بـ [[widget]] |
| [[deactivate]] ثم [[dispose]] | اتشال | اقفل كل اللي فتحته |

- [[mounted]]: هل الـ State لسه في الشجرة. [[true]] من initState لحد جوه dispose، وبعد dispose بتبقى false.

---

## ٦. التجربة: الساعة في شاشة تانية

الـ solCode بيعمل شاشة فيها زرار [[open clock]]:

- [[Builder(builder: (context) => ...)]]: بيدّيك [[context]] **تحت** الـ MaterialApp، عشان [[Navigator.push]] تلاقي الـ Navigator.
- [[Navigator.push(context, MaterialPageRoute(builder: ...))]]: افتح شاشة جديدة فوق الحالية، والـ builder بيبنيها.
- الشاشة الجديدة [[Scaffold]] فيه [[AppBar()]] (وبيحط سهم رجوع لوحده) والساعة في النص.
- و [[debugPrint('tick')]] جوه الـ timer.

### مع [[cancel]]

في Chrome: دوست open clock، واستنيت ٣ ثواني، ودوست سهم الرجوع، واستنيت ٣ تاني. الـ console:

~~~text Chrome console
tick
tick
tick
--- back
~~~

([[--- back]] سطر أنا اللي طبعته وقت الضغط على الرجوع.) بعد الرجوع مفيش ولا tick: dispose اتنادت ووقّفت الـ timer. وفي widget test نفس الحكاية: ٣ ticks والشاشة مفتوحة، وواحد زيادة أثناء animation الرجوع (الشاشة لسه في الشجرة لحد ما الـ animation يخلص)، و 0 في الـ ٣ ثواني اللي بعدها.

### من غير [[cancel]]

مسحت [[_timer.cancel();]] وعملت نفس الخطوات في Chrome:

~~~text Chrome console
tick
tick
tick
--- back
tick
tick
tick
~~~

الشاشة اتقفلت والـ timer مكمّل. ومع كل tick الـ setState بترمي error. ده نصه من widget test:

~~~text flutter test
setState() called after dispose(): _ClockBState#d634b(lifecycle
state: defunct, not mounted)
This error happens if you call setState() on a State object for a
widget that no longer appears in the widget tree (e.g., whose
parent widget no longer includes the widget in its build). This
error can occur when code calls setState() from a timer or an
animation callback.
The preferred solution is to cancel the timer or stop listening
to the animation in the dispose() callback. Another solution is
to check the "mounted" property of this object before calling
setState() to ensure the object is still in the tree.
This error might indicate a memory leak if setState() is being
called because another object is retaining a reference to this
State object after it has been removed from the tree. ...
~~~

- [[_ClockBState#d634b]]: اسم الـ class (غيّرت اسمه في التجربة) ورقم مميز للـ object.
- [[defunct, not mounted]]: الـ State «ميت»، اتعمله dispose.
- الرسالة نفسها بتقول الحل: cancel في dispose، أو [[mounted]] قبل setState. وبتنبّه لـ **memory leak**: الـ timer ماسك الـ State، فمش هيتمسح من الذاكرة.

وكمان [[flutter test]] نفسه بيرفض: [[A Timer is still pending even after the widget tree was disposed.]]

---

## الخلاصة

| الحاجة | القاعدة |
|---|---|
| [[initState]] | مرة، و [[super.initState()]] أول سطر |
| [[dispose]] | مرة، و [[super.dispose()]] آخر سطر |
| أي حاجة فتحتها | Timer و StreamSubscription و controllers: تتقفل في dispose |
| [[late final]] | field هيتحط مرة واحدة في initState |
| [[mounted]] | مكانها بعد [[await]]، مش بديل للـ cancel |`,
          lines: [
            "الـ State بتاع widget اسمه Clock.",
            "الـ timer هيتعمل في initState، فـ [[late]].",
            "بتعيد تعريف دالة من الأب.",
            "مرة واحدة لما الـ State يتعمل.",
            "لازم الأول.",
            "ابدأ timer كل ثانية يعمل rebuild.",
            "قفلة initState.",
            "بتعيد تعريف دالة من الأب.",
            "مرة واحدة لما الـ widget يتشال نهائيًا.",
            "اقفل الـ timer. من غير السطر ده هيفضل شغال بعد ما الشاشة تتقفل.",
            "لازم في الآخر.",
            "قفلة dispose.",
            "بتعيد تعريف build.",
            "الساعة دلوقتي بالشكل HH:mm:ss.",
            "قفلة."
          ],
          sol: R`وانت في شاشة الساعة الترمنال يطبع [[tick]] كل ثانية. لما ترجع، الـ tick بيقف (ممكن tick واحد زيادة أثناء animation الرجوع، لأن الشاشة لسه في الشجرة لحد ما الـ animation يخلص). دا dispose اشتغل و [[cancel]] وقّف الـ timer.

من غير [[_timer.cancel()]]: بعد ما ترجع الـ tick مكمّل كل ثانية، ومع كل واحد error في الترمنال: [[setState() called after dispose(): _ClockState#... (lifecycle state: defunct, not mounted)]]، ومعاها شرح إن الحل تلغي الـ timer في dispose أو تسأل [[mounted]]، وإن دا ممكن يكون memory leak. الـ timer ماسك reference للـ State فمش هيتمسح من الذاكرة، ولو فتحت الشاشة ٥ مرات هيبقى عندك ٥ timers شغالين.

الغلط الشائع إنك تحل الـ error بـ [[if (mounted) setState(...)]] جوه الـ timer وتسيب الـ cancel: الـ error اختفى بس الـ timer لسه شغال في الخلفية للأبد. mounted مكانها بعد await، إنما أي حاجة انت فتحتها (timer، subscription، controller) مكان قفلها dispose.`,
          solCode: R`import 'dart:async';
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: Builder(
      builder: (context) => Scaffold(
        body: Center(
          child: FilledButton(
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => Scaffold(appBar: AppBar(), body: const Center(child: Clock()))),
            ),
            child: const Text('open clock'),
          ),
        ),
      ),
    )));

class Clock extends StatefulWidget {
  const Clock({super.key});
  @override
  State<Clock> createState() => _ClockState();
}

class _ClockState extends State<Clock> {
  late final Timer _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      debugPrint('tick');
      setState(() {});
    });
  }

  @override
  void dispose() {
    _timer.cancel(); // امسح السطر ده عشان تشوف الـ error
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Text(DateTime.now().toString().substring(11, 19));
}`
        }
      ]
    },
    {
      t: "الـ layout",
      l: 1,
      n: "مفيش CSS: المسافات والترتيب والتوسيط كلها widgets، والقاعدة: الحدود بتنزل والأحجام بتطلع",
      items: [
        {
          cmd: "Row و Column",
          title: "رص العناصر جنب بعض أو تحت بعض",
          desc: R`[[Column]] بيرص الـ children تحت بعض، و [[Row]] جنب بعض. زي flexbox بـ [[flex-direction: column]] و [[row]].

[[mainAxisAlignment]] الترتيب على الاتجاه الأساسي (زي justify-content)، و [[crossAxisAlignment]] على الاتجاه التاني (زي align-items). و [[spacing]] مسافة ثابتة بين العناصر (زي gap).`,
          example: R`// في body بتاع Scaffold:
Row(
  spacing: 12,
  children: [
    const CircleAvatar(radius: 28, child: Icon(Icons.person)),
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: const [Text('Ali Hassan'), Text('Flutter developer')],
    ),
    const Spacer(),
    IconButton(onPressed: () {}, icon: const Icon(Icons.edit)),
  ],
)`,
          try: "غيّر [[crossAxisAlignment]] لـ [[center]] وبعدين [[end]] وشوف النصين بيتحركوا إزاي. وشيل الـ [[Spacer]] وحط [[mainAxisAlignment: MainAxisAlignment.spaceBetween]] على الـ Row.",
          flag: "script",
          deep: {
            why: "كل شاشة عبارة عن صفوف وأعمدة جوه بعض: هيدر فيه صورة واسم، وكارت فيه عنوان وسعر، وفورم حقول تحت بعض. Row و Column هم الـ flexbox بتاع Flutter، وهتكتبهم في كل ملف.",
            how: R`قاعدة الـ layout في Flutter: «constraints go down, sizes go up, parent sets position». الأب بيقول للابن «عرضك من كذا لكذا»، والابن بيختار حجمه جوه الحدود دي ويرجّعه، والأب يقرر مكانه.

Column بيدّي كل ابن ارتفاع غير محدود (unbounded) على الاتجاه الأساسي، ويقيسهم واحد واحد، وبعدين يوزعهم حسب [[mainAxisAlignment]]: [[start]] و [[center]] و [[end]] و [[spaceBetween]] و [[spaceAround]] و [[spaceEvenly]]. و [[crossAxisAlignment]] على العرض: [[start]] و [[center]] و [[stretch]] (يمط الابن على العرض كله).

[[mainAxisSize]]: الافتراضي [[max]] يعني Column بياخد كل الارتفاع المتاح. [[min]] ياخد على قد العيال بس، ودا المهم لما Column جوه Row أو جوه Dialog.

الاتجاهات بتفهم RTL: [[start]] في العربي يعني اليمين. عشان كده استخدم start و end مش left و right.

ومن Dart 3.10 تقدر تختصر: [[mainAxisAlignment: .center]] بدل [[MainAxisAlignment.center]] (dot shorthands)، لأن النوع معروف من الـ parameter.`,
            when: "دايمًا. Row لحاجات جنب بعض (أيقونة ونص، أزرار)، و Column لحاجات تحت بعض (فورم، كارت). ولو المحتوى أطول من الشاشة: ListView مش Column.",
            mistakes: R`نص طويل في Row فيطلع الشريط الأصفر والأسود و [[A RenderFlex overflowed by 42 pixels on the right]]: الـ Row مدّي النص عرض غير محدود، فالنص مش عارف يلف. الحل تحطه في [[Expanded]] (الدرس الجاي). و Column فيه عناصر أطول من الشاشة: نفس الـ overflow تحت، والحل ListView أو [[SingleChildScrollView]].`
          },
          teach: R`## الكود بيعمل إيه؟

صف profile: صورة دايرية، وجنبها الاسم وتحته الوظيفة، وزرار قلم في آخر السطر. يعني [[Row]] جواه [[Column]]. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: في Chrome بـ [[flutter run -d web-server]] (عرض 411)، و widget tests قاست مكان كل عنصر بـ [[tester.getRect]] على شاشة 411×800، وجربت كل تعديلات «جرّب».

---

## ١. القاعدة اللي بتشرح كل حاجة

> «constraints go down, sizes go up, parent sets position»

الأب بيقول للابن «حجمك من كذا لكذا» (constraints)، والابن بيختار حجمه جوه الحدود دي ويرجّعه (size)، والأب يحط الابن في مكانه (position). كل اللي تحت تطبيق للجملة دي.

---

## ٢. [[Row(spacing: 12, children: [...])]]

~~~dart
Row(
  spacing: 12,
  children: [
~~~

- [[Row]]: يرص العيال جنب بعض. الاتجاه ده اسمه **main axis** (أفقي)، والتاني **cross axis** (رأسي).
- [[spacing: 12]]: 12 pixel بين كل عنصرين (زي [[gap]] في CSS).
- [[children:]]: لستة العيال بين قوسين مربعين، بالترتيب.

---

## ٣. العيال واحد واحد

### الصورة

~~~dart
    const CircleAvatar(radius: 28, child: Icon(Icons.person)),
~~~

[[CircleAvatar]] دايرة، و [[radius: 28]] نص القطر، يعني 56×56. وجواها أيقونة شخص لحد ما يبقى فيه صورة حقيقية ([[backgroundImage]]).

### العمود

~~~dart
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: const [Text('Ali Hassan'), Text('Flutter developer')],
    ),
~~~

- [[Column]]: يرص تحت بعض. هنا الـ main axis رأسي والـ cross axis أفقي (العكس).
- [[crossAxisAlignment: CrossAxisAlignment.start]]: على العرض، رص العيال من **البداية**. الافتراضي [[center]].
- [[mainAxisSize: MainAxisSize.min]]: خد ارتفاع على قد العيال بس. الافتراضي [[max]] (كل الارتفاع المتاح).
- [[const]] قبل اللستة: اللستة وكل اللي فيها ثابت.

### الـ Spacer والزرار

~~~dart
    const Spacer(),
    IconButton(onPressed: () {}, icon: const Icon(Icons.edit)),
~~~

- [[Spacer]]: ياخد كل المساحة الفاضية في الصف، فيزق اللي بعده لآخر السطر.
- [[IconButton]]: زرار أيقونة. [[onPressed: () {}]] دالة فاضية (من غيرها، أو لو null، الزرار يبقى مقفول ورمادي).

---

## ٤. الأماكن الحقيقية

~~~text flutter test (شاشة 411×800، رتّبتهم تحت بعض)
row         x=0.0    y=0.0  w=411.0  h=56.0
avatar      x=0.0    y=0.0  w=56.0   h=56.0
column      x=68.0   y=8.0  w=242.3  h=40.0
spacer      x=322.3  y=28.0 w=28.8   h=0.0
iconbutton  x=363.0  y=4.0  w=48.0   h=48.0
~~~

نقراهم:

1. **ارتفاع الـ Row = 56**: أطول عيل (الصورة). الـ Row بياخد ارتفاع على قد أطول ابن.
2. **العمود عند x=68**: الصورة 56 + spacing 12.
3. **العمود y=8 وارتفاعه 40**: نصين كل واحد 20. وبيتوسّط رأسيًا جوه الـ 56 (الـ Row الافتراضي [[CrossAxisAlignment.center]]): (56 − 40) ÷ 2 = 8.
4. **عرض العمود 242.3**: على قد أعرض نص فيه ([[Flutter developer]]). (عرض النص في [[flutter test]] أكبر من الحقيقي، لأنه بيستخدم خط اختبار كل حرف فيه مربع. في Chrome الصف شكله زي ما تتوقع: الدايرة، والاسمين جنبها، والقلم على اليمين.)
5. **الـ Spacer عرضه 28.8**: اللي فضل: 411 − (56 + 242.3 + 48) − 3 × 12 = 28.7. لاحظ إن الـ spacing بيتحسب حوالين الـ Spacer كمان (٣ فواصل بين ٤ عيال).
6. **الزرار 48×48** مع إن الأيقونة 24: الـ IconButton بيكبّر مساحة اللمس لـ 48 عشان الصباع.

### بالعربي (RTL)

لفّيت الشاشة في [[Directionality(textDirection: TextDirection.rtl)]]:

~~~text flutter test
avatar x=355.0  icon x=0.0
~~~

الصورة بقت على اليمين (411 − 56 = 355) والقلم على الشمال. الـ Row بيبدأ من [[start]]، و start في العربي هو اليمين.

---

## ٥. التجارب في «جرّب»

### [[crossAxisAlignment]]: start ثم center ثم end

~~~text flutter test
start   name x=68.0   desc x=68.0
center  name x=117.9  desc x=68.0
end     name x=167.8  desc x=68.0
~~~

- اللي اتحرك **الاسم بس**. الوصف أعرض، فهو اللي محدد عرض العمود ومش بيتحرك.
- center: الاسم في نص عرض الوصف: 68 + (242.3 − 142.5) ÷ 2 = 117.9 (142.5 عرض الاسم).
- end: آخر الاسم على آخر الوصف: 68 + 242.3 − 142.5 = 167.8.

### من غير Spacer و [[mainAxisAlignment: MainAxisAlignment.spaceBetween]]

~~~text flutter test
column x=88.4   icon x=363.0
~~~

- [[mainAxisAlignment]]: إزاي تتوزع المساحة الفاضية على الـ main axis. و [[spaceBetween]]: بالتساوي **بين** العيال.
- الفاضي: 411 − (56 + 242.3 + 48) − 2 × 12 = 40.7، مقسوم على فاصلين = 20.35. فالعمود بقى عند 56 + 12 + 20.35 = 88.4: بعد عن الصورة، وراح ناحية النص.
- الفرق: Spacer بيحط الفاضي كله في مكان واحد انت اخترته. spaceBetween بيقسمه على كل الفواصل.

---

## ٦. أخطاء هتقابلها

### [[mainAxisSize]] الافتراضي جوه Row

[[Column]] من غير [[MainAxisSize.min]] جوه Row:

~~~text flutter test
column x=0.0 y=0.0 w=14.3 h=800.0
~~~

خد الارتفاع كله (800) عشان نص واحد. ودا بيخلي الـ Row نفسه طويل.

### نص طويل في Row

حطيت أيقونة ونص طويل جدًا في Row:

~~~text flutter test
A RenderFlex overflowed by 682 pixels on the right.
~~~

- [[RenderFlex]]: الـ render object اللي ورا Row و Column.
- الـ Row بيدّي العيال عرض **غير محدود**، فالنص مش عارف إن الشاشة خلصت، ومش بيلف لسطر تاني. والحل [[Expanded]] (الدرس الجاي).

---

## الخلاصة

| الخاصية | على إيه | القيم |
|---|---|---|
| [[mainAxisAlignment]] | اتجاه الرص (أفقي في Row) | start و center و end و spaceBetween و spaceAround و spaceEvenly |
| [[crossAxisAlignment]] | الاتجاه التاني | start و center و end و stretch |
| [[mainAxisSize]] | الطول على اتجاه الرص | max (الافتراضي) و min |
| [[spacing]] | بين كل عنصرين | رقم |
| [[Spacer]] | ابن | ياخد الفاضي كله |`,
          lines: [
            "صف: العناصر جنب بعض (في RTL بيبدأ من اليمين).",
            "١٢ بين كل عنصر والتاني.",
            "العناصر.",
            "صورة دايرية، وجواها أيقونة لحد ما يبقى فيه صورة.",
            "عمود جوه الصف: الاسم وتحته الوصف.",
            "رصّهم من أول السطر (start) بدل التوسيط.",
            "العمود ياخد أقل ارتفاع محتاجه بس.",
            "النصين.",
            "قفلة العمود.",
            "[[Spacer]] ياخد كل المساحة الفاضية، فيزق اللي بعده للآخر.",
            "زرار أيقونة في آخر الصف.",
            "قفلة الـ children.",
            "قفلة الصف."
          ],
          sol: R`[[crossAxisAlignment]] هنا بيحرّك النصين بالنسبة لبعض، مش بالنسبة للشاشة. [[Flutter developer]] أطول، فهو اللي بيحدد عرض الـ Column ومش بيتحرك خالص. اللي بيتحرك [[Ali Hassan]]: مع [[start]] بدايته على بداية التاني، ومع [[center]] بيبقى في نص عرض التاني، ومع [[end]] آخره على آخر التاني. (قست ده في widget test: [[Ali Hassan]] اتنقل مسافة متساوية مع كل خطوة، و [[Flutter developer]] فضل مكانه.) لو الاسم كان أطول من الوصف كان الوصف هو اللي هيتحرك.

ولما تشيل الـ Spacer وتحط [[spaceBetween]]: الصورة في الأول والقلم في الآخر زي ما هم، بس الاسم والوصف راحوا في نص الصف بدل ما يفضلوا لازقين في الصورة. لأن spaceBetween بيوزّع المساحة الفاضية بالتساوي بين كل عنصرين، مش بيحطها كلها قبل آخر عنصر. دا الفرق بين Spacer (المساحة كلها في مكان واحد انت اخترته) و spaceBetween (مقسومة على كل الفواصل).

ولو سبت الـ Spacer وحطيت spaceBetween كمان، مش هتلاقي أي فرق: Spacer أكل المساحة الفاضية كلها، فمفيش حاجة فاضلة يوزّعها spaceBetween.`
        },
        {
          cmd: "Expanded",
          title: "عنصر ياخد المساحة الفاضية كلها أو نسبة منها",
          desc: R`جوه Row أو Column، [[Expanded]] بيخلي الابن ياخد كل المساحة الفاضية على الاتجاه الأساسي. ولو أكتر من واحد، [[flex]] بيقسم بينهم بالنسبة: flex 3 و flex 1 يعني ٣ أرباع وربع. زي [[flex: 1]] في CSS.

و [[Flexible]] نفس الفكرة بس الابن مش مجبر يملى نصيبه: ياخد على قده لحد الحد ده.`,
          example: R`Row(
  children: [
    const Icon(Icons.description),
    const Expanded(
      flex: 3,
      child: Text('a_very_long_file_name_that_would_overflow_any_phone_screen.pdf', overflow: TextOverflow.ellipsis),
    ),
    Expanded(
      child: FilledButton(onPressed: () {}, child: const Text('Open')),
    ),
  ],
)`,
          try: "شيل الـ Expanded من حوالين النص وشوف الشريط الأصفر والأسود. وبعدين غيّر flex لـ 1 وشوف الزرار والنص بياخدوا قد إيه.",
          flag: "script",
          deep: {
            why: "أشهر error في Flutter للمبتدئين هو الشريط الأصفر والأسود بتاع overflow، وغالبًا سببه نص أو صورة في Row من غير Expanded. وأي تقسيم بالنسبة (قايمة جانبية وتلتين محتوى) بيتعمل بيه.",
            how: R`Row بيعمل layout على مرحلتين. الأول يقيس العيال اللي مش flex (الأيقونة والأزرار العادية) ويدّيهم عرض غير محدود، فكل واحد ياخد عرضه الطبيعي. بعدين ياخد المساحة اللي فضلت ويقسمها على الـ Expanded و Flexible حسب الـ flex، ويدّي كل واحد حد محدود.

عشان كده نص من غير Expanded بياخد عرض غير محدود: مش عارف إن الشاشة خلصت، فبيطلب عرض النص كله في سطر واحد ويعمل overflow. جوه Expanded بياخد عرض محدد، فيلف لسطور أو يعمل ellipsis.

[[Expanded]] هو في الحقيقة [[Flexible(fit: FlexFit.tight)]]: الابن لازم يملى نصيبه. و [[Flexible]] العادي [[FlexFit.loose]]: الابن ياخد لحد نصيبه، ولو محتاج أقل ياخد أقل.

[[Spacer]] هو Expanded فاضي، بيزق اللي بعده.

والـ Expanded لازم يبقى ابن مباشر لـ Row أو Column أو Flex. لو حطيته جوه Padding جوه Row، هيطلع error [[Incorrect use of ParentDataWidget]]. الصح: Expanded بره والـ Padding جواه.`,
            when: "نص ممكن يطول في صف. تقسيم نسب (٢:١). عنصر يملى الباقي من الشاشة في Column (زي ListView تحت هيدر).",
            mistakes: R`ListView جوه Column من غير Expanded: الـ ListView عايز ارتفاع محدود والـ Column بيدّيه غير محدود، فيطلع [[Vertical viewport was given unbounded height]]. حطه في Expanded. و Expanded جوه حاجة مش Row ولا Column. و Expanded جوه Row جوه SingleChildScrollView أفقي: مفيش «مساحة فاضية» أصلًا لأن العرض غير محدود، فيضرب.`
          },
          teach: R`## الكود بيعمل إيه؟

سطر ملف: أيقونة، واسم ملف طويل جدًا، وزرار [[Open]]. الاسم أطول من الشاشة، فلو سبناه على راحته هيطلع بره. [[Expanded]] بيدّيه عرض محدود (٣ أرباع المساحة الفاضية)، فيقص نفسه ويحط [[…]] في الآخر، والزرار ياخد الربع. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: في Chrome بـ [[flutter run -d web-server]] بعرض 411، و widget tests قاست العروض على شاشة 411×800.

---

## ١. [[Row]] والأيقونة

~~~dart
Row(
  children: [
    const Icon(Icons.description),
~~~

[[Icons.description]] أيقونة ورقة، ومقاسها الافتراضي 24×24. مش جوه Expanded، فبتاخد حجمها الطبيعي.

---

## ٢. النص جوه [[Expanded]]

~~~dart
    const Expanded(
      flex: 3,
      child: Text('a_very_long_file_name_that_would_overflow_any_phone_screen.pdf', overflow: TextOverflow.ellipsis),
    ),
~~~

- [[Expanded]]: «خد من المساحة الفاضية في الـ Row، واملى نصيبك كله».
- [[flex: 3]]: نصيبه ٣ أجزاء. الافتراضي 1.
- [[overflow: TextOverflow.ellipsis]]: لو النص مش مكفّي في العرض، اقطعه وحط [[…]]. ودا بيشتغل بس لأن Expanded إدّاه عرض محدود.
- [[const]] قدام Expanded: كل اللي جواه ثابت.

---

## ٣. الزرار جوه [[Expanded]] تاني

~~~dart
    Expanded(
      child: FilledButton(onPressed: () {}, child: const Text('Open')),
    ),
~~~

- مفيش [[flex]]، فهو 1. يعني المساحة مقسومة ٣ + ١ = ٤ أجزاء.
- [[FilledButton]]: زرار Material مليان بلون الثيم. وجوه Expanded بيتمط على عرض نصيبه كله.

---

## ٤. Row بيقيس على مرحلتين

1. **العيال اللي مش flex الأول** (الأيقونة): ياخدوا حجمهم الطبيعي.
2. **اللي فضل يتقسم** على الـ Expanded حسب الـ flex، وكل واحد ياخد عرض **محدود** بالظبط.

القياس الحقيقي:

~~~text flutter test (شاشة 411×800، رتّبتهم تحت بعض)
icon    x=0.0    y=12.0  w=24.0   h=24.0
text    x=24.0   y=14.0  w=290.3  h=20.0
button  x=314.3  y=0.0   w=96.8   h=48.0
~~~

- اللي فضل بعد الأيقونة: 411 − 24 = 387.
- النص: 387 × ٣ ÷ ٤ = 290.25، والزرار 387 ÷ ٤ = 96.75. (الاختبار بيطبع رقم واحد بعد العلامة، فطلعوا 290.3 و 96.8.)
- ارتفاع الـ Row 48 (الزرار أطول حاجة)، والأيقونة والنص متوسطين رأسيًا: الأيقونة (48 − 24) ÷ 2 = 12، والنص (48 − 20) ÷ 2 = 14.

وفي Chrome: الاسم ظاهر لحد [[a_very_long_file_name_that_would_overflo…]] وجنبه زرار Open بنفسجي.

---

## ٥. التجربة: من غير Expanded حوالين النص

~~~dart
    const Text('a_very_long_file_name_that_would_overflow_any_phone_screen.pdf', overflow: TextOverflow.ellipsis),
~~~

في Chrome بعرض 411: الاسم مكتوب لحد ما الشاشة خلصت، وعلى الحافة اليمين شريط مخطط أصفر وأسود، ومكتوب جنبه بالطول بخط أحمر صغير [[RIGHT OVERFLOWED BY 48 PIXELS]] (الشاشة قطعت آخره). والزرار اختفى. والـ console:

~~~text Chrome console (جزء)
══╡ EXCEPTION CAUGHT BY RENDERING LIBRARY ╞═════════════════════════════════════════════════════════
The following assertion was thrown during layout:
A RenderFlex overflowed by 48 pixels on the right.

The relevant error-causing widget was:
  Row Row:file:///w/app/lib/main.dart:30:19

The overflowing RenderFlex has an orientation of Axis.horizontal.
The edge of the RenderFlex that is overflowing has been marked in the rendering with a yellow and
black striped pattern. This is usually caused by the contents being too big for the RenderFlex.
Consider applying a flex factor (e.g. using an Expanded widget) to force the children of the
RenderFlex to fit within the available space instead of being sized to their natural size.
...
  constraints: BoxConstraints(0.0<=w<=411.0, 0.0<=h<=744.0)
  size: Size(411.0, 80.0)
~~~

نقراها:

- [[A RenderFlex overflowed by 48 pixels on the right]]: العيال محتاجين 48 pixel أكتر من عرض الـ Row.
- [[The relevant error-causing widget was]]: الملف والسطر والعمود اللي فيه الـ Row ([[main.dart:30:19]] في ملف التجربة بتاعي).
- [[Consider applying a flex factor (e.g. using an Expanded widget)]]: الرسالة نفسها بتقولك الحل.
- [[constraints: BoxConstraints(0.0<=w<=411.0, ...)]]: الـ Row نفسه أخد حدود من أبوه: عرض لحد 411. يعني المشكلة مش في الـ Row، في العيال.

ليه حصل كده؟ في المرحلة الأولى النص بقى «مش flex»، فالـ Row قاسه بعرض **غير محدود**. فالنص قال «أنا محتاج عرضي كله في سطر واحد»، و ellipsis مبتعملش حاجة لأنه شايف المكان مفتوح. وفي المرحلة التانية مفضلش حاجة للزرار، فالـ Expanded بتاعه خد عرض صفر. (في widget test: عرض الزرار [[w=0.0]].)

---

## ٦. التجربة: [[flex: 1]] للنص

~~~text flutter test
text x=24.0 y=14.0 w=193.5 h=20.0   button x=217.5 y=0.0 w=193.5 h=48.0
~~~

387 ÷ 2 = 193.5 لكل واحد. الأيقونة مش داخلة في القسمة.

---

## ٧. خطأين هتقابلهم مع Expanded

### ListView جوه Column

~~~text flutter test
Vertical viewport was given unbounded height.
~~~

الـ Column بيدّي العيال ارتفاع غير محدود، والـ ListView عايز يملى ارتفاع محدود. والخطأ ده جرّ وراه 14 error في نفس الاختبار. الحل: [[Expanded(child: ListView(...))]].

### Expanded جوه Padding جوه Row

~~~text flutter test
Incorrect use of ParentDataWidget.
~~~

Expanded لازم يبقى **ابن مباشر** لـ Row أو Column. الصح: [[Expanded(child: Padding(...))]].

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Expanded(child: ...)]] | خد من الفاضي واملاه كله |
| [[flex: n]] | نصيبك n أجزاء (الافتراضي 1) |
| [[Flexible]] | زي Expanded بس مش لازم تملى نصيبك |
| ترتيب القياس | اللي مش flex الأول بحجمه الطبيعي، وبعدين الباقي يتقسم |
| شريط أصفر وأسود | عيال Row أعرض منه: حط النص الطويل في Expanded |
| [[ellipsis]] | بيشتغل بس لما العرض محدود |`,
          lines: [
            "صف.",
            "العناصر.",
            "أيقونة بحجمها الطبيعي.",
            "النص ياخد من المساحة الفاضية...",
            "...٣ أجزاء من ٤.",
            "ومعاه عرض محدود، فيقدر يقص نفسه ويحط ... في الآخر.",
            "قفلة.",
            "الزرار ياخد الجزء الرابع (flex الافتراضي 1)...",
            "...ويتمط على عرض نصيبه.",
            "قفلة.",
            "قفلة الـ children.",
            "قفلة الصف."
          ],
          sol: R`لما تشيل الـ Expanded من حوالين النص: شريط أصفر وأسود مخطط على الحافة اليمين (أو الشمال في RTL)، ومكتوب عليه الرقم، وفي الترمنال رسالة زي [[A RenderFlex overflowed by 48 pixels on the right.]] (الرقم ده من Chrome بعرض 411، وعندك هيختلف حسب عرض الشاشة والخط). لاحظ إن [[TextOverflow.ellipsis]] مبقاش بيعمل حاجة: النص خد عرض غير محدود، فشايف إن فيه مكان لكل الحروف ومش محتاج يقص. والزرار اختفى: الـ Expanded بتاعه خد عرض صفر، لأن مفيش مساحة فاضلة أصلًا يتقسم عليها.

ولما ترجّع الـ Expanded وتخلي flex بتاع النص 1: النص والزرار بياخدوا نفس العرض بالظبط (نص المساحة بعد الأيقونة لكل واحد؛ على شاشة عرضها 411 كانوا 193.5 و 193.5). ومع flex 3 كانوا 290.3 للنص و 96.8 للزرار، يعني ٣ لـ ١ بالظبط. الأيقونة مش داخلة في القسمة لأنها اتقاست الأول بحجمها الطبيعي.

الغلط الشائع إنك تحل الـ overflow بإنك تحط [[width]] ثابت أو تصغّر الخط: هيشتغل على موبايلك ويبوظ على شاشة أصغر. Expanded (أو Flexible) هو الحل لأنه بيدّي النص «الباقي» مهما كان.`
        },
        {
          cmd: "Container و Padding",
          title: "مسافات وخلفية وحدود وحجم ثابت حوالين أي عنصر",
          desc: R`[[Padding]] مسافة جوه حوالين الابن. و [[SizedBox]] حجم ثابت أو مسافة فاضية بين عنصرين ([[SizedBox(height: 16)]]). و [[Container]] الـ div بتاع Flutter: padding و margin ولون وحدود وزوايا مدورة وحجم في widget واحد.

القاعدة: لو محتاج حاجة واحدة استخدم الـ widget بتاعها (Padding أو SizedBox أو ColoredBox). و Container لما تحتاج كذا حاجة مع بعض.`,
          example: R`Container(
  width: double.infinity,
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.black12),
    boxShadow: const [BoxShadow(blurRadius: 8, color: Colors.black26)],
  ),
  child: const Column(
    mainAxisSize: MainAxisSize.min,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [Text('Order #1042'), SizedBox(height: 8), Text('3 items, 450 EGP')],
  ),
)`,
          try: "ضيف [[color: Colors.red]] على الـ Container نفسه (جنب decoration) وشوف الـ error. وبعدين غيّر الـ margin لـ [[EdgeInsetsDirectional.only(start: 32)]] وشغّل التطبيق بالعربي.",
          flag: "script",
          deep: {
            why: "مفيش CSS في Flutter، فمفيش [[margin: 16px]] تحطها على أي عنصر. كل مسافة ولون وحدود widget بيلف العنصر. Container و Padding و SizedBox هم الأدوات اللي هتبني بيها أي كارت.",
            how: R`Container مش render object لوحده: هو widget مجمّع، build بتاعه بيرجّع Padding و DecoratedBox و ConstrainedBox وغيرهم حسب اللي انت حاطه. عشان كده [[Padding]] لوحده أخف وأوضح لما مش محتاج غيره.

[[EdgeInsets.all(16)]] من كل ناحية، و [[symmetric(horizontal:, vertical:)]]، و [[only(left: 8)]]. وفي تطبيق عربي استخدم [[EdgeInsetsDirectional.only(start: 8)]] عشان تتقلب مع RTL.

حجم Container من غير ابن ومن غير width و height: بياخد أكبر مساحة متاحة. ومعاه ابن: بياخد على قد الابن. ولو حطيت width وهو جوه حاجة بتفرض حجم (زي ابن مباشر للشاشة كلها)، حدود الأب بتكسب، ودا سبب «حطيت width: 100 ومش بيسمع».

[[color]] و [[decoration]] مع بعض error: [[Cannot provide both a color and a decoration]]. حط اللون جوه BoxDecoration.

و [[SizedBox]] بقيمة ثابتة widget const رخيص جدًا، ودا الأحسن للمسافات بين العناصر (أو [[spacing]] في Row و Column).`,
            when: "كارت، أو badge، أو خلفية ملونة بحدود. و Padding لوحده للمسافات. و SizedBox للفراغات والأحجام الثابتة.",
            mistakes: R`Container في كل حتة حتى لو محتاج padding بس. و [[color]] مع [[decoration]] في نفس الوقت. و [[EdgeInsets.only(left: ...)]] في تطبيق عربي فالمسافة تطلع في الناحية الغلط.`
          },
          teach: R`## الكود بيعمل إيه؟

كارت طلب: صندوق أبيض بزوايا مدورة وحدود رفيعة وضل، بعيد عن حواف الشاشة، وجواه عنوان وتحته تفاصيل. كله [[Container]] واحد. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: widget tests قاست الكارت والنصوص على شاشة 411×800، وجربت تعديلات «جرّب»، وفتحته في Chrome بـ [[flutter run -d web-server]].

---

## ١. الحجم: [[width: double.infinity]]

~~~dart
Container(
  width: double.infinity,
~~~

- [[double.infinity]]: «لانهاية». معناها هنا «خد أكبر عرض الأب يسمح بيه». مش هيبقى لانهاية فعلًا، هيقف عند حدود الأب (عرض الشاشة).

---

## ٢. المسافات: [[margin]] و [[padding]]

~~~dart
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
  padding: const EdgeInsets.all(16),
~~~

- [[margin]]: مسافة **بره** الصندوق (بينه وبين اللي حواليه). و [[padding]]: مسافة **جوه** الصندوق (بين حدوده والمحتوى).
- [[EdgeInsets]]: ٤ أرقام للـ ٤ نواحي:

| الشكل | معناه |
|---|---|
| [[EdgeInsets.all(16)]] | 16 من كل ناحية |
| [[EdgeInsets.symmetric(horizontal: 16, vertical: 8)]] | 16 يمين وشمال، و 8 فوق وتحت |
| [[EdgeInsets.only(left: 8)]] | ناحية واحدة |
| [[EdgeInsetsDirectional.only(start: 8)]] | زي only بس بـ start و end، فبتتقلب في العربي |

- [[const]]: القيم ثابتة، فالـ object يتعمل مرة واحدة.

---

## ٣. الشكل: [[BoxDecoration]]

~~~dart
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.black12),
    boxShadow: const [BoxShadow(blurRadius: 8, color: Colors.black26)],
  ),
~~~

| الخاصية | معناها |
|---|---|
| [[color: Colors.white]] | الخلفية. ولما فيه decoration، اللون جواها مش على Container |
| [[BorderRadius.circular(12)]] | الـ ٤ زوايا مدورة بنص قطر 12 |
| [[Border.all(color: Colors.black12)]] | حدود من الـ ٤ نواحي، سُمكها الافتراضي 1. و [[black12]] أسود شفافيته حوالي ١٢٪ (رمادي فاتح) |
| [[BoxShadow(blurRadius: 8, ...)]] | ضل، و [[blurRadius]] قد إيه مِبَهّت. و [[black26]] أسود حوالي ٢٦٪ |
| [[boxShadow:]] | لستة (قوسين مربعين) لأن ممكن تحط أكتر من ضل |

---

## ٤. المحتوى

~~~dart
  child: const Column(
    mainAxisSize: MainAxisSize.min,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [Text('Order #1042'), SizedBox(height: 8), Text('3 items, 450 EGP')],
  ),
~~~

- [[mainAxisSize: MainAxisSize.min]]: العمود على قد النصين بس (السطر ده اتضاف للمثال بعد التجربة، تحت ليه).
- [[CrossAxisAlignment.start]]: النصين من بداية السطر مش في النص.
- [[SizedBox(height: 8)]]: صندوق فاضي ارتفاعه 8، يعني مسافة بين النصين.

---

## ٥. القياس الحقيقي

حطيت الكارت [[body]] بتاع Scaffold:

~~~text flutter test (شاشة 411×800، كتبت جنب كل رقم هو بتاع إيه)
Container (بالـ margin)  x=0.0   y=0.0   w=411.0  h=98.0
الصندوق الأبيض          x=16.0  y=8.0   w=379.0  h=82.0
Order #1042             x=33.0  y=25.0
3 items, 450 EGP        x=33.0  y=53.0
~~~

- الصندوق الأبيض بيبدأ عند 16 من الشمال و 8 من فوق: دا الـ margin.
- عرضه 411 − 16 − 16 = 379.
- النص عند x=33 مش 32: الـ margin 16 + الـ border 1 + الـ padding 16. الـ Container بيضيف سُمك الحدود للـ padding عشان المحتوى ميركبش عليها.
- الارتفاع 82: 1 + 16 + 20 (نص) + 8 (SizedBox) + 20 (نص) + 16 + 1.

### من غير [[MainAxisSize.min]] (المثال قبل التعديل)

~~~text flutter test
الصندوق الأبيض  x=16.0 y=8.0 w=379.0 h=784.0
~~~

الكارت اتمط لآخر الشاشة: 800 − 8 − 8 = 784. الـ Scaffold بيدّي الـ body حدود **loose** (من 0 لحد الشاشة؛ Chrome طبع لـ body تحت AppBar [[BoxConstraints(0.0<=w<=411.0, 0.0<=h<=744.0)]])، والـ Column الافتراضي بياخد أقصى ارتفاع مسموح. جوه [[ListView]] الكارت كان 82 حتى من غير التعديل، لأن الـ ListView بيدّي ارتفاع غير محدود فالـ Column بياخد على قده. بس الكارت لازم يبان صح في أي مكان، فاتضاف السطر.

---

## ٦. Container من جوه

سجّلت الـ widgets اللي الـ Container ده بناها جواه:

~~~text flutter test
Padding, ConstrainedBox, DecoratedBox, Padding, Column
~~~

| الـ widget | جه منين |
|---|---|
| [[Padding]] الأولاني | [[margin]] |
| [[ConstrainedBox]] | [[width: double.infinity]] |
| [[DecoratedBox]] | [[decoration]] |
| [[Padding]] التاني | [[padding]] (ومعاه سُمك الـ border) |
| [[Column]] | [[child]] |

يعني Container مش بيرسم حاجة بنفسه: بيجمّع widgets صغيرة حسب اللي انت حاطه. عشان كده لو محتاج مسافة بس، [[Padding]] لوحده أوضح.

### و [[width]] مش دايمًا بيسمع

[[Container(width: 100, height: 100, color: Colors.red)]]:

~~~text flutter test
body بتاع Scaffold   w=100.0  h=100.0
home على طول         w=411.0  h=800.0
~~~

الـ body حدوده loose فالـ 100 اتطبقت. إنما [[home]] بيدّي ابنه حدود **tight** (لازم الشاشة كلها بالظبط)، وحدود الأب دايمًا بتكسب.

---

## ٧. التجارب في «جرّب»

### [[color]] و [[decoration]] مع بعض

~~~text flutter test
Cannot provide both a color and a decoration.
The color argument is just a shorthand for "decoration: BoxDecoration(color: color)".
To use both a color and other decoration properties, set the color in the BoxDecoration instead.
'package:flutter/src/widgets/container.dart':
Failed assertion: line 277 pos 10: 'color == null || decoration == null'
~~~

- مفيش compile error. دا **assert**: فحص بيشتغل في debug بس، وبيضرب لحظة ما الـ Container يتعمل.
- [[color]] اختصار لـ [[decoration: BoxDecoration(color: ...)]]، فمينفعش الاتنين. حط اللون جوه BoxDecoration.

### [[EdgeInsetsDirectional.only(start: 32)]]

حطيته margin على Container بعرض [[double.infinity]]، مرة بـ [[TextDirection.ltr]] ومرة [[rtl]]:

~~~text flutter test
ltr  x=32.0  w=379.0
rtl  x=0.0   w=379.0
~~~

في الإنجليزي المسافة شمال (x بيبدأ من 32)، وفي العربي يمين (الصندوق لازق في الشمال وبيخلص عند 379). عشان كده في تطبيق عربي استخدم Directional.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[margin]] | مسافة بره |
| [[padding]] | مسافة جوه (والـ border بيتضاف عليها) |
| [[BoxDecoration]] | اللون والزوايا والحدود والضل |
| [[color]] مع [[decoration]] | assert error: اللون جوه الـ decoration |
| [[width]] و [[height]] | طلب، وحدود الأب بتكسب |
| [[EdgeInsetsDirectional]] | start و end بدل left و right |`,
          lines: [
            "صندوق: زي div عليه style.",
            "ياخد العرض كله المتاح.",
            "مسافة بره الصندوق: ١٦ يمين وشمال و٨ فوق وتحت.",
            "مسافة جوه الصندوق حوالين المحتوى.",
            "الشكل: لما تستخدم decoration، اللون بيتحط جواها مش على Container.",
            "خلفية بيضا.",
            "زوايا مدورة.",
            "حدود رفيعة.",
            "ضل خفيف.",
            "قفلة الـ decoration.",
            "المحتوى: عمود.",
            "على قد النصين بس: من غيرها العمود بياخد كل الارتفاع المتاح والكارت يتمط لآخر الشاشة.",
            "النصوص من البداية.",
            "عنوان، ومسافة ٨ فاضية، وتفاصيل.",
            "قفلة العمود.",
            "قفلة الصندوق."
          ],
          sol: R`مع [[color: Colors.red]] جنب decoration الكود بيترجم عادي (مفيش compile error)، بس أول ما الشاشة تتبني في debug بتطلع الشاشة الحمرا ومعاها في الترمنال: [[Failed assertion: ... 'color == null || decoration == null': Cannot provide both a color and a decoration.]] وبعدها [[The color argument is just a shorthand for "decoration: BoxDecoration(color: color)".]]. يعني color نفسها بتتحول لـ BoxDecoration، فمينفعش اتنين. الحل: اللون جوه الـ BoxDecoration (وهو أصلًا هناك: [[Colors.white]]). وفي release الـ asserts مش بتشتغل، فمتعتمدش إن حد هيشوفها غيرك.

و [[EdgeInsetsDirectional.only(start: 32)]]: في تطبيق إنجليزي الكارت بيبعد 32 من الشمال، وفي العربي بيبعد 32 من اليمين وبيلزق في الشمال (في widget test بـ [[TextDirection.rtl]] الكارت كان من 0 لـ 768 على شاشة عرضها 800، وفي ltr من 32 لـ 800). عشان تشوف ده في تطبيقك: [[locale: const Locale('ar')]] مع [[flutter_localizations]] في MaterialApp، أو للتجربة السريعة لف الـ Scaffold في [[Directionality(textDirection: TextDirection.rtl, child: ...)]].

الغلط الشائع إنك تستخدم [[EdgeInsets.only(left: 32)]] وتجرّب بالإنجليزي بس، فالمسافة تطلع في الناحية الغلط عند المستخدم العربي.`
        },
        {
          cmd: "Stack",
          title: "عناصر فوق بعض: badge على أيقونة أو نص على صورة",
          desc: R`[[Stack]] بيحط الـ children فوق بعض، أول واحد تحت وآخر واحد فوق. و [[Positioned]] بيثبت ابن في مكان من حواف الـ Stack ([[top]] و [[bottom]] و [[left]] و [[right]]). زي [[position: relative]] على الأب و [[absolute]] على الابن في CSS.

اللي من غير Positioned بيتحط حسب [[alignment]] بتاع الـ Stack (الافتراضي أول الزاوية اللي فوق). و [[PositionedDirectional]] بـ start و end عشان RTL.`,
          example: R`Stack(
  clipBehavior: Clip.none,
  children: [
    const Icon(Icons.shopping_cart, size: 32),
    PositionedDirectional(
      top: -4,
      end: -6,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
        child: const Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
  ],
)`,
          try: "شيل [[clipBehavior: Clip.none]] وشوف الـ badge اتقص. وبعدين اعمل صورة وتحتها نص أبيض على شريط أسود نص شفاف بـ [[Positioned(left: 0, right: 0, bottom: 0, child: ...)]].",
          flag: "script",
          deep: {
            why: "Row و Column بيرصوا جنب بعض، مش فوق بعض. أي تصميم فيه طبقات (رقم على أيقونة السلة، نص فوق صورة، زرار عايم فوق خريطة) محتاج Stack.",
            how: R`حجم الـ Stack بيتحدد من العيال اللي مش Positioned: بياخد حجم أكبر واحد فيهم. الـ Positioned مش بيأثر على الحجم، عشان كده لو كل العيال Positioned الـ Stack بياخد أكبر مساحة متاحة.

[[Positioned(top: 0, left: 0, right: 0)]] يعني لازق فوق وعلى العرض كله. و [[Positioned.fill]] يملى الـ Stack كله (مفيد لطبقة تدرج فوق صورة). و [[PositionedDirectional]] بيستخدم start و end عشان RTL.

[[clipBehavior]] الافتراضي [[Clip.hardEdge]]: أي حاجة طالعة بره حدود الـ Stack بتتقص. و [[Clip.none]] بيسيبها تبان، بس اللمس عليها بره الحدود مش هيوصل (الـ hit testing بيقف عند حدود الأب).

و [[IndexedStack]] بيعرض ابن واحد بس من العيال بس بيحتفظ بالـ state بتاع الكل، ودا اللي بيتعمل بيه bottom navigation من غير ما كل تاب يرجع من الأول.`,
            when: "badge، ونص على صورة، و loading overlay فوق الشاشة، وعناصر عايمة. لو الحاجات جنب بعض: Row و Column مش Stack.",
            mistakes: R`تبني layout كامل بـ Stack و Positioned بأرقام ثابتة زي CSS absolute: هيبوظ على أي شاشة بحجم مختلف. وتحط Positioned جوه حاجة مش Stack فيطلع error. وزرار طالع بره الـ Stack بـ Clip.none ومش بيستجيب للمس.`
          },
          teach: R`## الكود بيعمل إيه؟

أيقونة سلة، وفوق ركنها دايرة حمرا صغيرة فيها رقم 3 (badge)، طالعة شوية بره حدود الأيقونة. الحاجتين **فوق بعض**، فدا شغل [[Stack]] مش Row. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: في Chrome بـ [[flutter run -d web-server]] (كبّرت الـ Stack ٤ مرات بـ [[Transform.scale]] عشان التفاصيل تبان في الصورة)، و widget tests قاست الأماكن على شاشة 411×800، والـ solCode اتجرّب بصورة في الذاكرة.

---

## ١. [[Stack(clipBehavior: Clip.none, children: [...])]]

~~~dart
Stack(
  clipBehavior: Clip.none,
  children: [
~~~

- [[Stack]]: بيحط العيال فوق بعض. **أول** واحد في اللستة تحت خالص، و**آخر** واحد فوق خالص.
- [[clipBehavior]]: يعمل إيه في الحاجات اللي طالعة بره حدوده. الافتراضي [[Clip.hardEdge]] (يقصها). و [[Clip.none]]: سيبها تبان.

---

## ٢. الطبقة الأولى: الأيقونة

~~~dart
    const Icon(Icons.shopping_cart, size: 32),
~~~

أيقونة سلة مقاسها 32×32. هي الوحيدة **مش Positioned**، فهي اللي بتحدد حجم الـ Stack.

---

## ٣. الطبقة التانية: الـ badge

~~~dart
    PositionedDirectional(
      top: -4,
      end: -6,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
        child: const Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
~~~

- [[PositionedDirectional]]: ثبّت الابن ده بمسافة من حواف الـ Stack. نسخة Directional يعني بـ [[start]] و [[end]] بدل left و right، فبتتقلب في العربي. (والعادي [[Positioned]] بـ [[top]] و [[bottom]] و [[left]] و [[right]].)
- [[top: -4]]: حافته اللي فوق على بعد 4 **فوق** حافة الـ Stack (الرقم السالب = بره).
- [[end: -6]]: آخره طالع 6 بره ناحية النهاية (يمين في الإنجليزي، شمال في العربي).
- [[Container]]: [[padding]] 4 حوالين الرقم، و [[BoxShape.circle]] يخلي الخلفية دايرة بدل مستطيل.
- [[TextStyle(color: Colors.white, fontSize: 10)]]: الرقم أبيض وخطه صغير.

---

## ٤. القياس

الـ Stack في نص الشاشة ([[Center]]):

~~~text flutter test (شاشة 411×800، رتّبتهم تحت بعض)
stack  x=189.5  y=384.0  w=32.0  h=32.0
icon   x=189.5  y=384.0  w=32.0  h=32.0
badge  x=209.3  y=380.0  w=18.3  h=22.0
~~~

- الـ Stack نفس مقاس الأيقونة بالظبط (32×32). الـ badge مش داخل في الحساب لأنه Positioned.
- الـ badge بيبدأ عند y=380، يعني 4 فوق الـ Stack (384).
- آخر الـ badge: 209.3 + 18.3 = 227.6، وآخر الـ Stack: 189.5 + 32 = 221.5. يعني طالع 6 من اليمين (الفرق في الكسر تقريب).

وبالعربي ([[TextDirection.rtl]]):

~~~text flutter test
rtl badge x=183.5
~~~

بقى على الشمال: بيبدأ 6 قبل بداية الـ Stack (189.5 − 6 = 183.5). دا اللي [[end]] عمله.

---

## ٥. التجربة: من غير [[Clip.none]]

في Chrome (مكبّر ٤ مرات):

- **مع** [[Clip.none]]: الدايرة الحمرا كاملة فوق ركن السلة، وفيها 3.
- **من غير**: الدايرة مقصوصة من فوق ومن اليمين، وبتبان نص دايرة لازقة في حافة الأيقونة، والرقم مقطوع.

مفيش أي error ولا warning: [[Clip.hardEdge]] قص كل حاجة بره الـ 32×32 بهدوء.

> و Clip.none بيخلي الشكل يبان بس، اللمس على الجزء اللي بره الحدود مش بيوصل (الـ hit testing بيقف عند حدود الـ Stack). الكلام ده من الـ docs.

---

## ٦. الـ solCode: صورة وتحتها شريط

~~~dart
    return Stack(
      children: [
        Image(image: image, width: double.infinity, height: 200, fit: BoxFit.cover),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: Colors.black54,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Text(caption, style: const TextStyle(color: Colors.white)),
          ),
        ),
      ],
    );
~~~

- [[final ImageProvider image]]: مصدر الصورة: [[NetworkImage(url)]] من النت، أو [[AssetImage]] من ملفات التطبيق، أو [[MemoryImage]] من bytes.
- [[Image(... width: double.infinity, height: 200, fit: BoxFit.cover)]]: الصورة بعرض المتاح وارتفاع 200. و [[BoxFit.cover]]: كبّرها لحد ما تغطي المساحة كلها، ولو النسبة مختلفة يتقص الزيادة (زي [[object-fit: cover]] في CSS). وهي مش Positioned، فهي اللي بتحدد حجم الـ Stack.
- [[Positioned(left: 0, right: 0, bottom: 0)]]: لازق في الشمال واليمين وتحت، فعرضه = عرض الـ Stack، ومفيش [[top]]، فارتفاعه على قد محتواه.
- [[Colors.black54]]: أسود شفافيته حوالي ٥٤٪، فالصورة باينة تحته.
- [[EdgeInsets.symmetric(horizontal: 12, vertical: 8)]]: مسافة جوه الشريط.

جربته بصورة صغيرة في الذاكرة ([[MemoryImage]]) وكابشن [[Cairo, Egypt]]:

~~~text flutter test (شاشة 411×800)
stack  x=0.0  y=0.0    w=411.0  h=200.0
image  x=0.0  y=0.0    w=411.0  h=200.0
bar    x=0.0  y=164.0  w=411.0  h=36.0
~~~

- الـ Stack قد الصورة بالظبط (411×200).
- الشريط بعرض الصورة كله، وارتفاعه 36 = 8 + 20 (النص) + 8، ولازق تحت: 200 − 36 = 164.

### Positioned بره Stack

حطيت [[Positioned]] جوه Column:

~~~text flutter test
Incorrect use of ParentDataWidget.
~~~

نفس الخطأ بتاع Expanded بره Row: Positioned بيكلّم أبوه المباشر، ولازم يكون Stack.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Stack]] | العيال فوق بعض، الأول تحت والأخير فوق |
| حجم الـ Stack | من العيال اللي مش Positioned |
| [[Positioned(top:, left:, ...)]] | مسافات من حواف الـ Stack، والسالب = بره |
| [[PositionedDirectional]] | start و end عشان RTL |
| [[clipBehavior: Clip.none]] | متقصّش اللي طالع بره (بس اللمس عليه مش هيوصل) |
| [[left: 0, right: 0, bottom: 0]] | شريط بالعرض كله لازق تحت |`,
          lines: [
            "طبقات فوق بعض.",
            "متقصّش اللي طالع بره حدود الـ Stack (الـ badge طالع شوية).",
            "الطبقات من تحت لفوق.",
            "الأيقونة: أول طبقة، وهي اللي بتحدد حجم الـ Stack.",
            "الـ badge مثبّت، و Directional عشان يتقلب في RTL.",
            "٤ فوق الحافة.",
            "وطالع شوية من ناحية النهاية (يمين في الإنجليزي، شمال في العربي).",
            "الدايرة الحمرا.",
            "مسافة جواها.",
            "شكل دايرة بلون أحمر.",
            "الرقم بخط صغير أبيض.",
            "قفلة الـ Container.",
            "قفلة الـ Positioned.",
            "قفلة الطبقات.",
            "قفلة الـ Stack."
          ],
          sol: R`لما تشيل [[clipBehavior: Clip.none]]: الدايرة الحمرا بتتقص من فوق ومن الجنب، وتبان كأنها ربع أو نص دايرة لازقة في ركن الأيقونة. لأن الـ Stack حجمه على قد الأيقونة بس (32×32)، والـ badge بـ [[top: -4]] و [[end: -6]] طالع بره الحدود دي، والافتراضي [[Clip.hardEdge]] بيقص أي حاجة بره. مفيش error ولا warning، الشكل بس اللي بيبوظ، ودا اللي بيخلي الغلطة دي تعدّي كتير.

الصورة بالشريط: الـ Stack فيه الصورة كأول طبقة (ودي اللي بتحدد حجمه)، وفوقها Positioned بـ [[left: 0, right: 0, bottom: 0]] من غير top. كده الشريط لازق تحت، وعرضه قد الصورة بالظبط، وارتفاعه على قد النص والـ padding. واللون [[Colors.black54]] أسود بشفافية حوالي ٥٤٪. (في widget test الصورة كانت 800×200 والشريط من y=164 لـ 200 بعرض 800.)

الغلط الشائع: تنسى [[left: 0, right: 0]] وتكتب [[bottom: 0]] بس، فالشريط ياخد عرض النص بس ويلزق في الركن. أو تحط [[top: 0]] كمان فالشريط يتمط على الصورة كلها.`,
          solCode: R`import 'package:flutter/material.dart';

class CaptionedImage extends StatelessWidget {
  const CaptionedImage({super.key, required this.image, required this.caption});

  final ImageProvider image;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Image(image: image, width: double.infinity, height: 200, fit: BoxFit.cover),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: Colors.black54,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Text(caption, style: const TextStyle(color: Colors.white)),
          ),
        ),
      ],
    );
  }
}

// الاستخدام:
// const CaptionedImage(image: NetworkImage('https://picsum.photos/600/400'), caption: 'Cairo, Egypt')`
        }
      ]
    }
]);
