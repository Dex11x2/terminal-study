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
    }
]);
