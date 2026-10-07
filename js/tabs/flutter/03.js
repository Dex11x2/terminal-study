// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "Dart بعمق",
      l: 2,
      n: "patterns على JSON وعلى الحالات، و null safety في الأماكن اللي بتوقع فيها فعلًا: fields و JSON و casts",
      items: [
        {
          cmd: "patterns بعمق",
          title: "تفك JSON وتختار حسب شكل البيانات في سطر واحد",
          desc: R`درس «records و patterns» في المستوى ١ وراك الأساس. هنا الأشكال اللي هتستخدمها في تطبيق حقيقي: map pattern ([[{'name': String name}]]) بيتأكد من المفتاح ونوع القيمة في نفس الخطوة، و list pattern ([[[final first, ...]]])، و relational ([[>= 400 && < 500]])، و logical-or ([[200 || 201]])، و object pattern على sealed class بأسماء fields مختلفة.

و [[if (json case {...})]] هو أأمن طريقة تقرا بيها JSON: لو الشكل مش مطابق الشرط false وخلاص، مفيش exception.`,
          example: R`sealed class Shape {}
class Circle extends Shape { Circle(this.r); final double r; }
class Rect extends Shape { Rect(this.w, this.h); final double w, h; }

double area(Shape s) => switch (s) {
  Circle(:final r) => 3.14 * r * r,
  Rect(w: final side, h: final h) when side == h => side * side,
  Rect(:final w, :final h) => w * h,
};

String parseUser(Object? json) {
  if (json case {'name': String name, 'age': int age} when age >= 18) {
    return '$name adult';
  }
  return switch (json) {
    {'name': String name} => '$name (no valid age)',
    [final first, ...] => 'got a list starting with $first',
    null => 'empty response',
    _ => 'unknown shape',
  };
}

String classify(int code) => switch (code) {
  200 || 201 || 204 => 'ok',
  >= 400 && < 500 => 'client error',
  >= 500 => 'server error',
  _ => 'other',
};

void main() {
  print([area(Circle(1)), area(Rect(2, 2)), area(Rect(2, 3))]);
  print(parseUser({'name': 'Ali', 'age': 30}));
  print(parseUser({'name': 'Sara', 'age': '30'}));
  print(parseUser([1, 2]));
  print(parseUser(null));
  print('$__{classify(201)} $__{classify(404)} $__{classify(503)}');
  final scores = {'ali': 90, 'sara': 75};
  for (final MapEntry(:key, :value) in scores.entries) {
    print('$key=$value');
  }
  var (a, b) = (1, 2);
  (a, b) = (b, a);
  print('$a $b');
}`,
          try: "اكتب دالة [[String describeOrder(Map<String, dynamic> json)]] بـ switch على الـ Map: لو [[{'status': 'shipped', 'tracking': String t}]] ترجّع رقم الشحنة، ولو [[{'status': 'cancelled', 'reason': String r}]] ترجّع السبب، ولو [[{'items': [_, _, ...]}]] (عنصرين أو أكتر) ترجّع «طلب كبير»، وغير كده «مش معروف». جرّبها على ٤ maps.",
          flag: "script",
          deep: {
            why: "JSON اللي جاي من API نوعه [[Map<String, dynamic>]]، يعني الـ compiler مش عارف أي حاجة عن جواه. الطريقة القديمة: [[json['age'] as int]] في كل سطر، وأول ما السيرفر يبعت [['30']] نص بدل رقم، التطبيق يضرب في حتة بعيدة. الـ patterns بتخليك تسأل «هل الشكل ده مطابق؟» وتطلّع المتغيرات بأنواعها مرة واحدة، ولو مش مطابق تقرر انت هتعمل إيه.",
            how: R`أنواع الـ patterns المهمة:
- map: [[{'name': String name}]] بيطابق لو المفتاح موجود والقيمة String. المفاتيح الزيادة في الـ Map مش مشكلة.
- list: [[[a, b]]] طول 2 بالظبط، و [[[first, ...]]] واحد أو أكتر، و [[[..., last]]] آخر عنصر، و [[[_, _, ...rest]]] بيحط الباقي في rest.
- object: [[Circle(:final r)]] بيتأكد إن النوع Circle ويطلّع [[r]]. و [[Rect(w: final side)]] لو عايز اسم متغير مختلف عن اسم الـ field.
- relational: [[>= 400]] و [[< 500]]، و [[&&]] بينهم.
- logical-or: [[200 || 201]]. لو فيه متغيرات، لازم الاتنين يطلّعوا نفس الأسماء.
- null-check [[final x?]]: يطابق لو مش null ويدّيك x من غير ?.
- [[_]] يطابق أي حاجة، و [[when]] شرط زيادة بعد ما الشكل يطابق.

الـ destructuring في for: [[for (final MapEntry(:key, :value) in map.entries)]] بيفك كل entry. و [[(a, b) = (b, a)]] swap في سطر بـ records.

exhaustiveness مع sealed: الـ compiler بيعرف إن Shape يا Circle يا Rect، فالـ switch من غير [[_]] مقبول. بس لاحظ في المثال: [[Rect(...) when side == h]] مش بتعد تغطية كاملة لـ Rect (بسبب الـ when)، فلازم [[Rect(:final w, :final h)]] بعدها. لو شلتها الـ compiler يقولك Rect مش متغطية.

[[if-case]] مقابل [[switch]]: if-case لما عندك شكل واحد بتدوّر عليه، و switch لما فيه كذا احتمال.`,
            when: "قراءة JSON من API (خصوصًا لو مش هتستخدم codegen)، و state فيها حالات (sealed + switch)، و status codes، وأي if/else طويل بيسأل عن نوع أو شكل.",
            mistakes: R`تحط case عام قبل الخاص فالخاص عمره ما يتنفذ (الـ analyzer بيقولك [[dead code]] أو [[unreachable switch case]] أحيانًا، مش دايمًا). وتفتكر إن [[{'name': String name}]] معناه إن الـ Map فيها name بس: لأ، بيطابق حتى لو فيها ١٠ مفاتيح تانية. وتكتب [[{'age': int age}]] وتنسى إن JSON فيه الأرقام العشرية [[double]]: [[30.0]] مش هتطابق int. ولو السيرفر ممكن يبعت الاتنين: [[{'age': num age}]] وبعدين [[age.toInt()]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

٣ دوال، كل واحدة بتستخدم نوع patterns مختلف: [[area]] بتختار حسب **نوع** الشكل (object pattern)، و [[parseUser]] بتقرا JSON حسب **شكله** (map و list patterns)، و [[classify]] بتختار حسب **مدى** الرقم (relational و logical-or). وفي الآخر [[main]] بتجرّبهم كلهم. اتشغّل بـ [[dart run]] في [[docker run --rm dart:stable]] (Dart 3.13.5).

الفكرة الأساسية في كل الدرس: الـ **pattern** سؤال «القيمة دي شكلها كده؟». لو آه، بيطلّع منها متغيرات جاهزة بأنواعها. لو لأ، بيروح للاحتمال اللي بعده من غير ما يرمي exception.

---

## ١. الأشكال: [[sealed class]]

~~~dart
sealed class Shape {}
class Circle extends Shape { Circle(this.r); final double r; }
class Rect extends Shape { Rect(this.w, this.h); final double w, h; }
~~~

- [[sealed]] (مقفول) معناها: الـ subclasses بتاعة Shape كلها لازم تبقى في **نفس الملف**. فالـ compiler عارف إن أي Shape يا Circle يا Rect، ومفيش تالت.
- [[extends Shape]]: Circle نوع من Shape.
- [[Circle(this.r);]] constructor مختصر: الـ parameter اللي جاي يتحط في الـ field اللي اسمه r على طول.
- [[final double w, h;]] تعريف اتنين fields من نفس النوع في سطر.

---

## ٢. object pattern: [[area]]

~~~dart
double area(Shape s) => switch (s) {
  Circle(:final r) => 3.14 * r * r,
  Rect(w: final side, h: final h) when side == h => side * side,
  Rect(:final w, :final h) => w * h,
};
~~~

- [[=>]] بعد الدالة معناه «الدالة دي بترجّع القيمة دي على طول» من غير [[{ return ...; }]].
- [[switch (s) { ... }]] هنا **switch expression**: بيرجّع قيمة (مش جمل). كل سطر شكله [[pattern => القيمة,]]، وأول pattern يطابق هو اللي بيكسب.

### [[Circle(:final r)]]

ده object pattern. بيسأل سؤالين مرة واحدة:
1. s نوعه Circle؟
2. لو آه، هات الـ field اللي اسمه [[r]] في متغير اسمه [[r]].

النقطتين [[:]] قبل الاسم اختصار لـ [[r: final r]] (اسم الـ field واسم المتغير واحد). وجوه السطر ده r نوعه [[double]] من غير أي cast.

### [[Rect(w: final side, h: final h) when side == h]]

- [[w: final side]]: هات الـ field اللي اسمه w، بس حطه في متغير اسمه [[side]] (اسم تاني).
- [[when side == h]] اسمها **guard**: شرط زيادة بيتسأل **بعد** ما الشكل يطابق. المستطيل لو أضلاعه متساوية يبقى مربع، فالمساحة [[side * side]].

### [[Rect(:final w, :final h)]]

أي مستطيل تاني. السطر ده **لازم**، ودا اللي جربته: مسحته وشغّلت:

~~~text dart run (من غير السطر الأخير)
Error: The type 'Shape' is not exhaustively matched by the switch cases since it doesn't match 'Rect()'.
~~~

**exhaustive** يعني «مغطّي كل الاحتمالات». الـ compiler عارف إن Shape يا Circle يا Rect (بسبب sealed)، بس الـ case بتاع Rect فيه [[when]]، والـ compiler مبيحسبش الـ guard تغطية كاملة (المستطيل اللي مش مربع راح فين؟). فلازم case لكل Rect.

~~~text الناتج
[3.14, 4.0, 6.0]
~~~

[[4.0]] مش [[4]] لأن w و h نوعهم double، فـ [[Rect(2, 2)]] اتحوّلت [[2.0]] والضرب طلّع double.

---

## ٣. map pattern مع [[if-case]]: [[parseUser]]

~~~dart
String parseUser(Object? json) {
  if (json case {'name': String name, 'age': int age} when age >= 18) {
    return '$name adult';
  }
~~~

- [[Object?]]: أي حاجة، حتى null. ودا نوع JSON اللي مش عارف شكله لسه.
- [[if (json case PATTERN)]] اسمها **if-case**: الشرط صح لو json مطابق للـ pattern.
- الـ pattern [[{'name': String name, 'age': int age}]] بيسأل: json ده Map؟ فيه مفتاح ['name'] قيمته String؟ وفيه 'age' قيمته int؟ لو كله آه، [[name]] و [[age]] بقوا متغيرات بأنواعها جوه الـ if.
- [[when age >= 18]] نفس الـ guard اللي فوق.

حاجتين جربتهم:

~~~dart
if ({'name': 'A', 'x': 1, 'y': 2} case {'name': String n}) print('extra keys ok: $n');
if ({'age': 30.0} case {'age': int a}) ... else print('int: no match');
~~~

~~~text الناتج
extra keys ok: A
int: no match
~~~

يعني المفاتيح الزيادة مش مشكلة، و [[30.0]] (double) **مش** int. لو السيرفر ممكن يبعت الاتنين اكتب [[num age]] (num = int أو double).

### الباقي بـ switch

~~~dart
  return switch (json) {
    {'name': String name} => '$name (no valid age)',
    [final first, ...] => 'got a list starting with $first',
    null => 'empty response',
    _ => 'unknown shape',
  };
}
~~~

| الـ pattern | بيطابق إيه |
|---|---|
| [[{'name': String name}]] | Map فيها name نص (الـ age ناقص أو نوعه غلط أو أقل من 18) |
| [[[final first, ...]]] | **list pattern**: List فيها عنصر واحد على الأقل. [[...]] اسمها rest: «وأي عدد بعده» |
| [[null]] | القيمة null بالظبط (constant pattern) |
| [[_]] | wildcard: أي حاجة. لازم في الآخر لأن [[Object?]] ملهاش نهاية |

أشكال list تانية جربتها على [[[1, 2, 3]]]:

~~~text الناتج
[final f, ...final rest]   →  1 [2, 3]
[..., final last]          →  3
[final a, final b]         →  not exactly 2   (طولها 3 مش 2)
~~~

[[...final rest]] بيحط الباقي في لستة اسمها rest، و [[[a, b]]] من غير [[...]] معناها «طولها بالظبط ٢».

---

## ٤. relational و logical-or: [[classify]]

~~~dart
String classify(int code) => switch (code) {
  200 || 201 || 204 => 'ok',
  >= 400 && < 500 => 'client error',
  >= 500 => 'server error',
  _ => 'other',
};
~~~

- [[||]] جوه pattern اسمه **logical-or**: يطابق لو أي واحد منهم طابق.
- [[>= 400]] **relational pattern**: بيقارن القيمة بالرقم. و [[&&]] (logical-and) يربط اتنين: من 400 لحد 499.
- [[_]] الباقي (زي 301).

---

## ٥. [[main]]: الناتج كله

~~~dart
  print(parseUser({'name': 'Ali', 'age': 30}));
  print(parseUser({'name': 'Sara', 'age': '30'}));
  print(parseUser([1, 2]));
  print(parseUser(null));
  print('$__{classify(201)} $__{classify(404)} $__{classify(503)}');
~~~

~~~text الناتج
Ali adult
Sara (no valid age)
got a list starting with 1
empty response
ok client error server error
~~~

Sara الـ age بتاعها [['30']] نص، فالـ if-case مطابقش ونزلت للـ case التاني. ومفيش exception في أي حتة، حتى مع null.

### destructuring في [[for]] وفي التبديل

~~~dart
  final scores = {'ali': 90, 'sara': 75};
  for (final MapEntry(:key, :value) in scores.entries) {
    print('$key=$value');
  }
  var (a, b) = (1, 2);
  (a, b) = (b, a);
  print('$a $b');
~~~

- [[scores.entries]] بيدّيك كل زوج في الـ Map كـ [[MapEntry]] (فيه [[key]] و [[value]]).
- [[MapEntry(:key, :value)]] object pattern تاني: بيفك كل entry لمتغيرين في سطر الـ for نفسه.
- [[(1, 2)]] اسمه **record**: قيمتين مع بعض. و [[var (a, b) = ...]] بيفكه لمتغيرين.
- [[(a, b) = (b, a);]] الطرف اليمين بيتحسب الأول ([[(2, 1)]]) وبعدين يتفك، فبيبدّلوا من غير متغير مؤقت.

~~~text الناتج
ali=90
sara=75
2 1
~~~

---

## ٦. الحل: [[describeOrder]]

~~~dart
String describeOrder(Map<String, dynamic> json) => switch (json) {
  {'status': 'shipped', 'tracking': String t} => 'رقم الشحنة $t',
  {'status': 'cancelled', 'reason': String r} => 'اتلغى: $r',
  {'items': [_, _, ...]} => 'طلب كبير',
  _ => 'مش معروف',
};
~~~

- [['status': 'shipped']] القيمة هنا نص ثابت مش نوع، فده بيطابق لو status **بيساوي** 'shipped' (constant pattern).
- [[{'items': [_, _, ...]}]] pattern جوه pattern: Map فيها items، و items لستة فيها عنصرين على الأقل. [[_]] يعني «عنصر موجود ومش مهم قيمته».

~~~text الناتج
رقم الشحنة EG123
اتلغى: out of stock
طلب كبير
مش معروف
~~~

[[{'items': [1]}]] طلع «مش معروف» لأن فيها عنصر واحد بس.

### الترتيب مهم

جربت أحط الـ case العام قبل الخاص:

~~~dart
  {'name': String name} => 'name $name',
  {'name': String name, 'age': int age} => '$name $age',
~~~

[[dart analyze]] قال:

~~~text dart analyze
warning - This case is covered by the previous cases. Try removing the case clause, or restructuring the preceding patterns. - unreachable_switch_case
~~~

وفعلًا [[{'name': 'A', 'age': 3}]] طلع [[name A]]: الأول مسك كل حاجة فيها name.

---

## الخلاصة

| الـ pattern | مثال | معناه |
|---|---|---|
| object | [[Circle(:final r)]] | النوع Circle؟ هات r |
| map | [[{'name': String name}]] | المفتاح موجود ونوعه String؟ (الزيادة مش مشكلة) |
| list | [[[final first, ...]]] | لستة فيها عنصر أو أكتر |
| relational | [[>= 400 && < 500]] | الرقم في المدى ده |
| logical-or | [[200 || 201]] | أي واحد منهم |
| constant | [['shipped']] و [[null]] | يساوي القيمة دي |
| wildcard | [[_]] | أي حاجة |
| guard | [[when age >= 18]] | شرط بعد ما الشكل يطابق |

- [[if-case]] لشكل واحد، و [[switch]] لكذا شكل. والاتنين مبيرموش exception لو الشكل غلط.
- الخاص الأول والعام بعده، و [[when]] مبيعدّش تغطية كاملة.
- [[int]] مش بيطابق [[30.0]]: استخدم [[num]] لو مش متأكد.`,
          lines: [
            "sealed: كل الأشكال معروفة للـ compiler.",
            "دايرة ليها نص قطر.",
            "مستطيل ليه عرض وطول.",
            "switch expression على نوع الشكل.",
            "object pattern: لو Circle طلّع r.",
            "مستطيل بأسماء متغيرات مختلفة، و [[when]] للمربع.",
            "أي مستطيل تاني. من غيره الـ switch مش exhaustive.",
            "قفلة.",
            "Object? لأن JSON ممكن يبقى أي حاجة.",
            "if-case: Map فيها name نص و age رقم، والسن 18 أو أكتر.",
            "هنا name و age متغيرات بأنواعها.",
            "قفلة الـ if.",
            "باقي الاحتمالات بـ switch.",
            "Map فيها name بس (أو age نوعه غلط).",
            "list pattern: عنصر أو أكتر.",
            "null.",
            "أي حاجة تانية.",
            "قفلة.",
            "قفلة الدالة.",
            "switch على رقم.",
            "logical-or: أي واحد من التلاتة.",
            "relational: من 400 لحد 499.",
            "500 أو أكتر.",
            "الباقي.",
            "قفلة.",
            "البداية.",
            "[3.14, 4.0, 6.0].",
            "Ali adult.",
            "Sara (no valid age): age نص مش int، فالـ if-case مطابقش.",
            "got a list starting with 1.",
            "empty response.",
            "ok client error server error.",
            "Map عادي.",
            "فك كل entry لـ key و value في الـ for نفسه.",
            "ali=90 ثم sara=75.",
            "قفلة الـ for.",
            "record destructuring لمتغيرين.",
            "swap من غير متغير مؤقت.",
            "2 1.",
            "قفلة."
          ],
          sol: R`الدالة بـ switch على الـ Map، والترتيب مهم: الحالات المحددة الأول. [[describeOrder({'status': 'shipped', 'tracking': 'EG123'})]] ترجّع رقم الشحنة، و [[{'status': 'cancelled', 'reason': 'out of stock'}]] ترجّع السبب، و [[{'items': [1, 2, 3]}]] ترجّع «طلب كبير»، و [[{'items': [1]}]] ترجّع «مش معروف» لأن [[[_, _, ...]]] محتاج عنصرين على الأقل.

الغلط الشائع: تكتب [[{'status': 'shipped'}]] من غير tracking في case قبل اللي فيه tracking، فيمسك كل الـ shipped. أو تكتب [['tracking': tracking]] من غير نوع، فيطابق حتى لو القيمة null.`,
          solCode: R`String describeOrder(Map<String, dynamic> json) => switch (json) {
  {'status': 'shipped', 'tracking': String t} => 'رقم الشحنة $t',
  {'status': 'cancelled', 'reason': String r} => 'اتلغى: $r',
  {'items': [_, _, ...]} => 'طلب كبير',
  _ => 'مش معروف',
};

void main() {
  print(describeOrder({'status': 'shipped', 'tracking': 'EG123'}));
  print(describeOrder({'status': 'cancelled', 'reason': 'out of stock'}));
  print(describeOrder({'items': [1, 2, 3]}));
  print(describeOrder({'items': [1]}));
}`
        },
        {
          cmd: "null safety بعمق",
          title: "ليه الـ compiler مش مصدّق إن الـ field مش null وانت لسه فاحصه",
          desc: R`درس «null safety» في المستوى ١ وراك [[?]] و [[??]] و [[!]]. هنا الحالات اللي بتوقع فيها في تطبيق حقيقي: field عام nullable مش بيعمله promotion حتى بعد if، و JSON اللي فيه null في النص ([[json['user']?['phones']]])، و [[as List<String>]] اللي بيضرب على بيانات jsonDecode، و [[nonNulls]] و [[?item]] جوه الـ list و [[...?]].

القاعدة: انسخ الـ field في متغير محلي قبل ما تفحصه، واقرا JSON بـ patterns أو casts آمنة، و [[!]] آخر حل مش أول حل.`,
          example: R`String? couponFor(String user) => user == 'vip' ? 'SAVE10' : null;

class Profile {
  Profile(this.bio, this._nick);
  final String? bio;
  final String? _nick;

  int bioLength() {
    final bio = this.bio;
    if (bio == null) return 0;
    return bio.length;
  }

  String nick() => _nick != null ? _nick.toUpperCase() : 'none';
}

void main() {
  final Map<String, dynamic> json = {'user': {'phones': null}};
  final phones = json['user']?['phones'] as List<String>?;
  print(phones?.first.length);
  final List<String?> raw = ['a', null, 'b'];
  print(raw.nonNulls.toList());
  final coupon = couponFor('vip');
  print(['subtotal', ?coupon, ...?phones]);
  print(Profile('hi', null).bioLength());
  print(Profile(null, 'ali').nick());
}`,
          try: "في [[bioLength]] امسح سطر [[final bio = this.bio;]] وشوف الـ error. وبعدين غيّر الـ json لـ [[{'user': {'phones': ['010', '011']}}]] وخليه جاي من [[jsonDecode]] (نص JSON حقيقي): السطر بتاع [[as List<String>?]] هيعمل إيه؟ صلّحه.",
          flag: "script",
          deep: {
            why: "الـ null safety في المستوى ١ سهلة لأن كل حاجة متغيرات محلية. في التطبيق الحقيقي البيانات في fields جوه classes، وجاية من JSON نوعه dynamic، ودول بالظبط المكانين اللي الـ compiler مبيقدرش يحميك فيهم لوحده، والناس بتحط [[!]] عشان تسكّته فترجع الـ crashes.",
            how: R`type promotion: بعد [[if (x != null)]] الـ compiler بيعامل x كأنه مش nullable، بس بشرط يبقى متأكد إن قيمته مش هتتغير بين الفحص والاستخدام. دا مضمون للمتغيرات المحلية والـ parameters. ومن Dart 3.2 للـ fields الـ private الـ final (زي [[_nick]] في المثال) لأن محدش بره الملف يقدر يعمل override ليها. إنما field عام زي [[bio]]: ممكن subclass يعمله getter بيرجّع قيمة مختلفة كل مرة، فالـ compiler بيرفض. الحل: [[final bio = this.bio;]] ثم الفحص على المحلي.

الـ null-aware chain: [[json['user']?['phones']]] لو user مش موجود السلسلة كلها بتقف وترجع null. و [[?.]] بيعمل short-circuit لباقي السلسلة كلها: [[phones?.first.length]] لو phones null مش هيكمّل لـ length.

JSON و casts: [[jsonDecode]] بيرجّع [[List<dynamic>]] و [[Map<String, dynamic>]] دايمًا، حتى لو كل العناصر نصوص. فـ [[as List<String>]] بيضرب [[type 'List<dynamic>' is not a subtype of type 'List<String>?']]. الصح [[(json['phones'] as List?)?.cast<String>()]] أو [[List<String>.from(...)]] أو pattern.

أدوات الـ collections: [[nonNulls]] بيشيل الـ nulls ويرجّع [[Iterable<String>]] مش [[Iterable<String?>]]. و [[?coupon]] جوه list literal (Dart 3.8) بيحط العنصر لو مش null بس. و [[...?phones]] بيفك list لو مش null. وفي الـ Map: [['due_at': ?dueAt]] بيحط المفتاح لو القيمة مش null.

[[Object?]] مقابل [[dynamic]]: الاتنين بيقبلوا أي حاجة، بس Object? بيجبرك تفحص النوع ([[if (x is int)]]) قبل ما تستخدمه، و dynamic بيسيبك تنادي أي حاجة وتضرب وقت التشغيل. لما تستقبل حاجة مش عارف نوعها: Object?.`,
            when: "كل model جاي من API، وكل field nullable في State أو class. ولما الـ compiler يقولك [[can't be unconditionally accessed]] على field: متحطش [[!]]، انسخه في متغير محلي.",
            mistakes: R`تحط [[!]] على field بعد ما فحصته بسطر: شغال النهارده، ولو حد غيّر الكود بين السطرين الـ crash رجع. وتكتب [[as List<String>]] على بيانات jsonDecode. وتعمل [[late]] لـ field ممكن فعلًا ميتحطش (الـ API فشل مثلًا) فيطلع [[LateInitializationError]] بدل شاشة خطأ. وسؤال انترفيو: «ليه promotion مش بيشتغل على field عام؟» لأن الـ field في Dart بيتقري من خلال getter ممكن يتعمله override، فمفيش ضمان إن القراية التانية هترجع نفس القيمة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيوريك ٣ أماكن الـ null بيوقع فيها في تطبيق حقيقي: field جوه class، و JSON فيه null في النص، و list فيها nulls. ولكل واحدة الطريقة اللي بتخلي الـ compiler مطمّن من غير [[!]]. اتشغّل بـ [[dart run]] في [[docker run --rm dart:stable]] (Dart 3.13.5)، وكل error تحت اتجرّب فعلًا.

تذكير سريع: [[String?]] معناها «String أو null». و [[String]] من غير [[?]] عمرها ما تبقى null، والـ compiler بيمنعك تنادي [[.length]] على حاجة ممكن تبقى null.

---

## ١. دالة ممكن ترجّع null

~~~dart
String? couponFor(String user) => user == 'vip' ? 'SAVE10' : null;
~~~

- [[String?]] نوع الرجوع: نص أو null.
- [[شرط ? أ : ب]] اسمه ternary: لو الشرط صح رجّع أ، غير كده ب. يعني لو المستخدم [['vip']] ياخد كوبون، وغير كده null.

---

## ٢. الـ field العام: انسخه الأول

~~~dart
class Profile {
  Profile(this.bio, this._nick);
  final String? bio;
  final String? _nick;

  int bioLength() {
    final bio = this.bio;
    if (bio == null) return 0;
    return bio.length;
  }
~~~

- [[bio]] field **عام** (public)، و [[_nick]] بيبدأ بـ [[_]] فهو **private**: محدش بره الملف ده يشوفه.
- [[final bio = this.bio;]]: متغير **محلي** اسمه bio، قيمته الـ field. [[this.bio]] معناها «الـ field بتاع الـ object ده» عشان نفرّقه عن المتغير المحلي اللي بنفس الاسم.
- [[if (bio == null) return 0;]]: لو null اخرج. بعد السطر ده الـ compiler **متأكد** إن bio (المحلي) مش null، فبيعامله كـ [[String]]. ودا اسمه **type promotion** (ترقية النوع).
- [[bio.length]] عدد الحروف.

### ليه النسخة المحلية؟

مسحت سطر [[final bio = this.bio;]] (يعني الفحص بقى على الـ field نفسه) وشغّلت:

~~~text dart run
Error: Property 'length' cannot be accessed on 'String?' because it is potentially null.
Try accessing using ?. instead.
    return bio.length;
               ^^^^^^
Context: 'bio' refers to a public property so it couldn't be promoted.
~~~

و [[dart analyze]] قال نفس الكلام برسالة تانية:

~~~text dart analyze
error - The property 'length' can't be unconditionally accessed because the receiver can be 'null'. ... - unchecked_use_of_nullable_value
         - 'bio' refers to a public property so it couldn't be promoted.
~~~

- [[couldn't be promoted]]: مقدرش يرقّي النوع. ليه؟ الـ field العام في Dart بيتقري من خلال **getter**، وأي class بيورث Profile ممكن يعمل override للـ getter ده ويرجّع قيمة مختلفة كل مرة. فقراية في الـ if وقراية في الـ return ممكن يطلعوا مختلفين.
- المتغير المحلي مفيش حد يقدر يغيّره بين السطرين، فالـ promotion شغال.

### الـ private: شغال مباشرة

~~~dart
  String nick() => _nick != null ? _nick.toUpperCase() : 'none';
~~~

هنا فحصنا [[_nick]] نفسه واستخدمناه من غير نسخة، واترجم عادي. من Dart 3.2 الـ field اللي **private و final** بيتعمله promotion، لأن مفيش حد بره الملف يقدر يعمل override ليه. [[toUpperCase()]] بيحوّل الحروف لكابيتال.

~~~text الناتج
2
ALI
~~~

[[Profile('hi', null).bioLength()]] طلّع 2 (طول "hi")، و [[Profile(null, 'ali').nick()]] طلّع ALI.

---

## ٣. JSON فيه null في النص: [[?[]]]

~~~dart
  final Map<String, dynamic> json = {'user': {'phones': null}};
  final phones = json['user']?['phones'] as List<String>?;
  print(phones?.first.length);
~~~

نفكّ السطر التاني من جوه لبرة:

### الخطوة ١: [[json['user']]]

هات قيمة المفتاح user. النوع [[dynamic]] (الـ compiler مش عارف حاجة عنه)، وممكن يبقى null لو المفتاح مش موجود.

### الخطوة ٢: [[?['phones']]]

[[?[]]] اسمه **null-aware index**: «لو اللي قبلي null، وقف ورجّع null. غير كده هات المفتاح phones». جربت على Map فاضية:

~~~dart
  final Map<String, dynamic> empty = {};
  print(empty['user']?['phones']);
~~~

~~~text الناتج
null
~~~

من غير [[?]] كان هيضرب، لأنك بتعمل [[null['phones']]].

### الخطوة ٣: [[as List<String>?]]

[[as]] معناها «أنا متأكد إن النوع ده كذا» (cast). والـ [[?]] في الآخر عشان القيمة هنا null فعلًا، و [[as List<String>]] من غير [[?]] كانت هتضرب على null.

### [[phones?.first.length]]

- [[?.]] اسمه **null-aware access**: لو phones null، رجّع null ومتكمّلش.
- والمهم: [[?.]] بيوقف **السلسلة كلها**. يعني [[.first]] و [[.length]] اللي بعدها مش بيتنفذوا خالص. مش محتاج تكتب [[?.]] تاني بعد كل خطوة.

~~~text الناتج
null
~~~

---

## ٤. أدوات الـ collections

### [[nonNulls]]

~~~dart
  final List<String?> raw = ['a', null, 'b'];
  print(raw.nonNulls.toList());
~~~

~~~text الناتج
[a, b]
~~~

[[nonNulls]] بيشيل الـ nulls، والأهم إن النوع اتغير: طبعت [[raw.nonNulls.runtimeType]] وطلع [[NonNullsIterable<String>]]، يعني [[String]] من غير [[?]]. و [[toList()]] بيحوّله List عادية.

### [[?coupon]] و [[...?phones]] جوه list

~~~dart
  final coupon = couponFor('vip');
  print(['subtotal', ?coupon, ...?phones]);
~~~

~~~text الناتج
[subtotal, SAVE10]
~~~

- [[?coupon]] (Dart 3.8) اسمه **null-aware element**: «حط العنصر ده لو مش null، ولو null متحطوش خالص». جربت [[['subtotal', ?couponFor('x')]]] وطلع [[[subtotal]]].
- [[...]] اسمه **spread**: بيفك list جوه list. و [[...?]] نفس الكلام بس لو الـ list نفسها null بيتجاهلها. phones هنا null فمحطّش حاجة.
- ونفس الفكرة في الـ Map: جربت [[{'title': 'x', 'due_at': ?dueAt}]] و dueAt null، وطلع [[{title: x}]] من غير المفتاح.

---

## ٥. الـ cast اللي بيضرب: [[jsonDecode]]

ده اللي «جرّب» بيطلبه. خليت الـ JSON جاي من نص حقيقي:

~~~dart
  final Map<String, dynamic> json = jsonDecode('{"user": {"phones": ["010", "011"]}}');
  print(json['user']['phones'].runtimeType);
  final phones = json['user']?['phones'] as List<String>?;
~~~

~~~text dart run
List<dynamic>
Unhandled exception:
type 'List<dynamic>' is not a subtype of type 'List<String>?' in type cast
~~~

- [[jsonDecode]] (من [[dart:convert]]) بيحوّل نص JSON لـ Map أو List. بس **دايمًا** بيعمل [[List<dynamic>]]، حتى لو كل العناصر نصوص، لأنه مش عارف وهو بيقرا إيه اللي جاي.
- [[List<dynamic>]] و [[List<String>]] نوعين مختلفين، فالـ [[as]] فشل. والأسوأ إن ده بيحصل **وقت التشغيل** مش وقت الترجمة، فالكود اترجم عادي.

### التصليح: [[as List?]] ثم [[cast<String>()]]

~~~dart
import 'dart:convert';

void main() {
  final json = jsonDecode('{"user": {"phones": ["010", "011"]}}') as Map<String, dynamic>;
  final phones = (json['user']?['phones'] as List?)?.cast<String>();
  print(phones?.first.length);
  print(['subtotal', ...?phones]);
}
~~~

- [[as Map<String, dynamic>]] على ناتج jsonDecode: ده آمن، لأن الـ Map اللي jsonDecode بيعملها نوعها كده فعلًا.
- [[as List?]]: «دي List (من أي نوع) أو null». ده مبيضربش.
- [[?.cast<String>()]]: لو مش null، اعمل منها List<String>. كل عنصر بيتفحص لما تقراه.

~~~text الناتج
3
[subtotal, 010, 011]
~~~

[[3]] طول "010". و [[...?phones]] فك الرقمين جوه اللستة. ولما ضفت [[?coupon]] تاني طلع [[[subtotal, SAVE10, 010, 011]]] زي ما الـ sol بيقول.

---

## الخلاصة

| المشكلة | الحل |
|---|---|
| field عام nullable مبيتعملوش promotion | [[final x = this.x;]] وافحص المحلي |
| field private final | الفحص المباشر شغال (Dart 3.2+) |
| مفتاح ممكن يبقى مش موجود | [[json['a']?['b']]] |
| قيمة ممكن تبقى null وعايز منها حاجة | [[x?.first.length]] (بيوقف السلسلة كلها) |
| list فيها nulls | [[nonNulls]] |
| عنصر أو list ممكن null جوه list | [[?item]] و [[...?list]] |
| list من jsonDecode | [[(x as List?)?.cast<String>()]] مش [[as List<String>]] |

و [[!]] آخر حل: بيقول للـ compiler «اسكت»، ولو طلعت null التطبيق يضرب.`,
          lines: [
            "دالة ممكن ترجّع null.",
            "class فيه field عام nullable و field private nullable.",
            "constructor.",
            "عام: مفيش promotion عليه.",
            "private final: فيه promotion من Dart 3.2.",
            "دالة بتستخدم الـ field العام.",
            "انسخه في متغير محلي بنفس الاسم.",
            "افحص المحلي...",
            "...فيتعامل كـ String. لو فحصت this.bio مباشرة السطر ده مش هيترجم.",
            "قفلة.",
            "private final: الفحص المباشر شغال.",
            "قفلة الـ class.",
            "البداية.",
            "JSON فيه null في النص.",
            "[[?[]]]: لو user مش موجود وقف. والـ cast لـ nullable عشان القيمة null.",
            "null: السلسلة وقفت عند phones من غير ما تضرب.",
            "list فيها nulls.",
            "[a, b]، ونوعها List<String>.",
            "SAVE10.",
            "[[?coupon]] يتحط لو مش null، و [[...?phones]] يتفك لو مش null: [subtotal, SAVE10].",
            "2.",
            "ALI.",
            "قفلة."
          ],
          sol: R`لما تمسح السطر: [[The property 'length' can't be unconditionally accessed because the receiver can be 'null']] على [[bio.length]]، مع إنك فاحصه في السطر اللي قبله. لأن bio field عام، والـ compiler مش ضامن إن قراية تانية هترجع نفس القيمة.

ومع [[jsonDecode('{"user": {"phones": ["010", "011"]}}')]] السطر بيضرب وقت التشغيل: [[type 'List<dynamic>' is not a subtype of type 'List<String>?' in type cast]]. الـ list نصوص فعلًا، بس نوعها الحقيقي List<dynamic>. التصليح: [[(json['user']?['phones'] as List?)?.cast<String>()]]، وساعتها [[phones?.first.length]] تطبع 3، والـ list اللي بعدها [subtotal, SAVE10, 010, 011].

الغلط الشائع: تحل الـ error الأول بـ [[this.bio!.length]]. شغال، بس رجّعت الـ crash المحتمل بإيدك.`,
          solCode: R`import 'dart:convert';

void main() {
  final json = jsonDecode('{"user": {"phones": ["010", "011"]}}') as Map<String, dynamic>;
  final phones = (json['user']?['phones'] as List?)?.cast<String>();
  print(phones?.first.length);
  print(['subtotal', ...?phones]);
}`
        }
      ]
    },
    {
      t: "اللستات والتنقل والفورم",
      l: 2,
      n: "لستة طويلة من غير تقطيع، وشاشات بـ URLs و redirect للي مش عامل login، وفورم بيتأكد من البيانات قبل ما تتبعت",
      items: [
        {
          cmd: "ListView.builder",
          title: "لستة فيها ألف عنصر وبتتحرك ناعمة",
          desc: R`[[ListView(children: [...])]] بيعمل كل العناصر مرة واحدة، حتى اللي تحت خالص ومحدش شافها. [[ListView.builder]] بيعمل العناصر اللي ظاهرة على الشاشة بس (وشوية حواليها)، ولما تعمل scroll بيعمل الجديدة ويرمي اللي خرجت. فلستة فيها ١٠ آلاف منتج بتتكلف زي لستة فيها ١٥.

بتدّيه [[itemCount]] و [[itemBuilder]] بياخد index ويرجّع widget. و [[ListView.separated]] نفس الفكرة ومعاها فاصل بين العناصر.`,
          example: R`import 'package:flutter/material.dart';

typedef Product = ({int id, String name, double price});

class ProductList extends StatelessWidget {
  const ProductList({super.key, required this.products});
  final List<Product> products;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: products.length,
      itemExtent: 72,
      itemBuilder: (context, index) {
        final p = products[index];
        return ListTile(
          key: ValueKey(p.id),
          leading: CircleAvatar(child: Text('$__{p.id}')),
          title: Text(p.name),
          trailing: Text('$__{p.price.toStringAsFixed(2)} EGP'),
        );
      },
    );
  }
}`,
          try: R`اعرض [[ProductList(products: List.generate(10000, (i) => (id: i, name: 'Item $i', price: i * 1.5)))]] وحط [[debugPrint('build $index')]] جوه itemBuilder. اعمل scroll وشوف الأرقام اللي بتتطبع. وبعدين بدّله بـ [[ListView(children: [for (final p in products) ...])]] ولاحظ الفرق في أول فتحة.`,
          flag: "script",
          deep: {
            why: "أي تطبيق فيه لستة بتكبر: منتجات، رسايل، إشعارات. لو اتعملت كلها مرة واحدة، أول فتحة للشاشة بتاخد وقت والذاكرة بتتملي، والـ scroll بيقطّع على الموبايلات الرخيصة. builder بيخلي التكلفة على قد اللي ظاهر بس.",
            how: R`الـ ListView جواه Sliver بيعرف مساحة الشاشة، وبيسأل itemBuilder عن الـ indexes اللي داخلة في المساحة دي بس (زائد [[cacheExtent]]، حوالي ٢٥٠ بكسل فوق وتحت، عشان الـ scroll السريع ميبانش فاضي). العناصر اللي بتخرج بتتشال من الشجرة، والـ State بتاعها بيتمسح.

[[itemExtent: 72]] بيقول إن كل العناصر ارتفاعها ثابت. من غيره الـ ListView لازم يقيس العناصر عشان يعرف مكانه، ولما تعمل jump لآخر اللستة لازم يقدّر. معاه الحساب ضرب بس. ولو الارتفاع ثابت بس مش عارفه: [[prototypeItem: ListTile(title: Text('x'))]].

الـ key: [[ValueKey(p.id)]] بيربط كل عنصر بالـ id بتاعه، فلو اللستة اترتبت أو اتمسح منها عنصر، Flutter يعرف مين مين (درس ValueKey في المستوى ٣).

الـ State بتاع العنصر بيضيع لما يخرج من الشاشة: لو فيه checkbox محلي أو TextField، لما ترجع له هتلاقيه اتصفّر. الحل الصح إن الـ state تبقى في الـ model (برا الـ widget). والحل التاني [[AutomaticKeepAliveClientMixin]].

الـ pagination (infinite scroll): [[ScrollController]] وتسمع لـ [[position.pixels >= position.maxScrollExtent - 200]] وتجيب الصفحة الجاية. أو أبسط: لما [[index == items.length - 1]] في itemBuilder، اطلب اللي بعده واعرض loader في آخر عنصر.

وللـ grids: [[GridView.builder]] بنفس الفكرة. وللشاشات اللي فيها هيدر كبير ولستة: [[CustomScrollView]] و [[SliverList.builder]] و [[SliverAppBar]].`,
            when: "أي لستة جاية من بيانات ممكن تكبر. و [[ListView(children:)]] العادي بس للحاجات الثابتة الصغيرة (صفحة إعدادات فيها ٨ سطور).",
            mistakes: R`ListView جوه Column من غير [[Expanded]] فيطلع [[Vertical viewport was given unbounded height]]. و [[shrinkWrap: true]] كحل للـ error ده: بيشتغل بس بيقتل الـ lazy loading، لأنه بيقيس كل العناصر عشان يعرف طوله، يعني رجعت لنفس مشكلة children. وتعمل حاجة تقيلة في itemBuilder (parse تاريخ، فلترة اللستة كلها) فتتكرر مع كل scroll: جهّز البيانات قبلها.`
          },
          teach: R`## الكود بيعمل إيه؟

widget اسمه [[ProductList]] بياخد لستة منتجات ويعرضها سطر تحت سطر، بس مش بيعمل غير السطور اللي على الشاشة. اتجرّب في مشروع [[flutter create]] جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44): [[flutter analyze]] قال [[No issues found!]]، وكتبت widget test بـ [[flutter test]] بيعدّ كل مرة [[itemBuilder]] بيتنادى (نفس فكرة [[debugPrint]] اللي في «جرّب»). شاشة الاختبار مقاسها 800×600.

---

## ١. نوع المنتج: [[typedef]] و record

~~~dart
import 'package:flutter/material.dart';

typedef Product = ({int id, String name, double price});
~~~

- [[import 'package:flutter/material.dart']] بيجيب widgets الـ Material: [[ListView]] و [[ListTile]] و [[Text]] وغيرهم.
- [[({int id, String name, double price})]] اسمه **record** بـ named fields: ٣ قيم مع بعض ليهم أسامي، من غير ما تكتب class.
- [[typedef Product = ...]] بيدّي النوع ده اسم قصير. فبدل ما تكتب الـ record كله في كل مكان تكتب [[Product]].

وبتعمل منتج كده: [[(id: 3, name: 'Item 3', price: 4.5)]]، وتقرا [[p.name]].

---

## ٢. الـ widget نفسه

~~~dart
class ProductList extends StatelessWidget {
  const ProductList({super.key, required this.products});
  final List<Product> products;
~~~

- [[StatelessWidget]]: widget ملوش state جوّاه، بيعرض اللي اتبعتله بس.
- [[{super.key, required this.products}]]: الـ parameters بين [[{ }]] اسمها named. [[super.key]] بيبعت الـ key للأب (StatelessWidget)، و [[required]] معناها لازم تبعته.
- [[final List<Product> products;]] اللستة نفسها.

~~~dart
  @override
  Widget build(BuildContext context) {
~~~

[[@override]] معناها «أنا بكتب نسخة جديدة من دالة موجودة في الأب». و [[build]] هي الدالة اللي Flutter بيناديها عشان يعرف يرسم إيه.

---

## ٣. [[ListView.builder]]: القلب

~~~dart
    return ListView.builder(
      itemCount: products.length,
      itemExtent: 72,
      itemBuilder: (context, index) {
~~~

- [[ListView.builder]] اسمه **named constructor** (اسم بعد نقطة). بدل ما تدّيه widgets جاهزة، بتدّيه **دالة** يناديها لما يحتاج عنصر.
- [[itemCount]]: كام عنصر في الكل. من غيره الـ ListView مش هيعرف إمتى يقف، وهيفضل يطلب indexes لحد ما الـ builder يرجّع null (من الـ docs)، و [[products[index]]] كانت هتضرب [[RangeError]] قبلها.
- [[itemExtent: 72]]: كل عنصر ارتفاعه 72 بكسل بالظبط. فمكان العنصر رقم 500 = 500 × 72، حساب من غير ما يقيس اللي قبله.
- [[itemBuilder: (context, index) { ... }]]: الدالة اللي بتتنادى لكل عنصر محتاج يظهر. [[index]] رقمه من 0.

### بيتنادى لمين بالظبط؟ (اتجرّب)

حطيت عدّاد جوه itemBuilder، وعرضت 10000 منتج على شاشة ارتفاعها 600:

~~~text flutter test
first frame built: 12 -> 0..11
~~~

١٢ عنصر بس من ١٠ آلاف. الحساب:
- الشاشة 600 ÷ 72 = 8.3، يعني العناصر 0 لحد 8 ظاهرة (التاسع ظاهر جزء منه).
- وفيه **cacheExtent** افتراضيًا 250 بكسل زيادة تحت الشاشة (وفوقها) بيتعملوا مقدمًا عشان الـ scroll السريع ميبانش فاضي: (600 + 250) ÷ 72 = 11.8، يعني لحد العنصر 11.

بعدها عملت scroll لتحت 720 بكسل (١٠ عناصر بالظبط):

~~~text flutter test
after scroll 720px built: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
~~~

العناصر الجديدة بس اتعملت. ورجعت لفوق:

~~~text flutter test
back to top built: [5, 4, 3, 2, 1, 0]
~~~

العناصر 0 لـ 5 **اتعملت تاني**: لما بعدت عنهم خرجوا من الشاشة ومن مساحة الـ cache فاتشالوا. ودا معناه إن أي state جوه العنصر (checkbox مثلًا) بيضيع، فخلي الـ state في البيانات نفسها مش في الـ widget.

---

## ٤. العنصر: [[ListTile]]

~~~dart
        final p = products[index];
        return ListTile(
          key: ValueKey(p.id),
          leading: CircleAvatar(child: Text('$__{p.id}')),
          title: Text(p.name),
          trailing: Text('$__{p.price.toStringAsFixed(2)} EGP'),
        );
~~~

- [[products[index]]] هات المنتج اللي رقمه index.
- [[ListTile]] سطر جاهز من Material فيه ٣ أماكن: [[leading]] (في الأول)، و [[title]] (النص الأساسي)، و [[trailing]] (في الآخر).
- [[key: ValueKey(p.id)]]: هوية ثابتة للعنصر مربوطة بالـ id مش بمكانه، فلو اللستة اترتبت أو اتمسح منها عنصر Flutter يعرف مين مين.
- [[CircleAvatar]] دايرة، وجواها رقم المنتج. [['$__{p.id}']] بيحوّل الرقم لنص: [[$__{}]] جوه نص بيحط قيمة أي expression.
- [[toStringAsFixed(2)]] بيكتب الرقم برقمين بعد العلامة. منتج رقم 3 سعره 3 × 1.5 = 4.5، والاختبار لقى النص [[4.50 EGP]].

---

## ٥. «جرّب»: builder مقابل [[ListView(children: ...)]]

~~~dart
ListView(children: [for (final p in products) ListTile(...)])
~~~

[[for]] جوه list literal بيعمل عنصر لكل منتج **قبل** ما الـ ListView يتبني. حطيت عدّاد جوه:

~~~text flutter test
eager tiles created: 10000 in 61ms
builder first frame in 57ms
~~~

- الـ 10000 ListTile اتعملوا كلهم، مع إن الشاشة بتعرض ٩.
- الوقت قريب هنا لأن ListTile بسيط جدًا والاختبار مش بيرسم فعلًا، و ListView نفسه بيعمل layout للظاهر بس في الحالتين. الفرق بيكبر مع عناصر تقيلة (صور، تنسيق تواريخ، حسابات في الـ constructor) ومع لستات أطول وعلى موبايلات ضعيفة. والمهم إن تكلفة builder ثابتة على قد الشاشة مهما اللستة كبرت، والتانية بتكبر مع اللستة.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[ListView.builder]] | بيعمل العناصر الظاهرة بس (+ cacheExtent حوالي 250 بكسل) |
| [[itemCount]] | العدد الكلي، عشان يعرف يقف |
| [[itemExtent: 72]] | ارتفاع ثابت: حساب المكان ضرب بس |
| [[itemBuilder]] | دالة بتتنادى لكل index محتاج يظهر، وتتنادى تاني لو العنصر خرج ورجع |
| [[ValueKey(p.id)]] | هوية ثابتة للعنصر |

- لستة جاية من بيانات = [[ListView.builder]] (أو [[ListView.separated]] لو عايز فاصل).
- العنصر اللي خرج من الشاشة بيتشال والـ state بتاعه بيضيع.
- متعملش شغل تقيل جوه itemBuilder: بيتكرر مع كل scroll.`,
          lines: [
            "مكتبة Material.",
            "record type بسيط للمنتج (بدل class في مثال صغير).",
            "widget بياخد اللستة.",
            "constructor.",
            "البيانات.",
            "بتعيد تعريف build.",
            "build.",
            "lazy: العناصر بتتعمل وقت ما تظهر.",
            "العدد عشان يعرف امتى يقف.",
            "كل عنصر ارتفاعه 72 بالظبط: حساب أسرع وقفز أسرع.",
            "بيتنادى لكل index ظاهر بس.",
            "العنصر.",
            "سطر جاهز.",
            "key ثابت من الـ id عشان الترتيب والمسح.",
            "دايرة فيها الرقم.",
            "الاسم.",
            "السعر في الآخر.",
            "قفلة ListTile.",
            "قفلة itemBuilder.",
            "قفلة ListView.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`مع builder: أول فتحة بتطبع [[build 0]] لحد رقم صغير (حوالي ١٠ لـ ١٥ حسب طول الشاشة، زائد شوية بسبب cacheExtent). ولما تعمل scroll بتظهر أرقام جديدة بس، ولو رجعت لفوق هتلاقي [[build 0]] بيتطبع تاني: العنصر اتشال واتعمل من جديد.

مع [[ListView(children: [...])]]: الـ debugPrint في itemBuilder مش موجود أصلًا، بس الـ 10000 ListTile اتعملوا كـ objects في build قبل أول frame. في widget test الوقت كان قريب (61ms مقابل 57ms) لأن ListTile خفيف و ListView بيعمل layout للظاهر بس في الحالتين، والفرق بيكبر مع عناصر أتقل ولستات أطول وموبايلات أضعف. ولو حطيت print جوه الـ for هتلاقيه طبع ١٠ آلاف سطر مرة واحدة.

الغلط الشائع إنك تحكم إن الاتنين «زي بعض» عشان جربت على ٢٠ عنصر.`
        },
        {
          cmd: "go_router",
          title: "كل شاشة ليها URL وبتفتحها بـ id في المسار",
          desc: R`[[go_router]] هو الـ router الرسمي اللي فريق Flutter بيحافظ عليه: بتعرّف الشاشات كـ routes بمسارات زي الويب ([[/products/:id]])، وبتتنقل بـ [[context.go('/products/42')]] أو [[context.push(...)]]. ودا بيدّيك deep links (لينك يفتح شاشة جوه التطبيق) و URLs حقيقية على الويب ببلاش.

[[state.pathParameters['id']]] بيقرا الجزء المتغير في المسار، و [[state.uri.queryParameters]] بيقرا اللي بعد [[?]]. وبتربطه بـ [[MaterialApp.router(routerConfig: router)]].`,
          example: R`import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
      routes: [
        GoRoute(
          path: 'products/:id',
          builder: (context, state) {
            final id = int.parse(state.pathParameters['id']!);
            final tab = state.uri.queryParameters['tab'] ?? 'info';
            return ProductScreen(id: id, tab: tab);
          },
        ),
      ],
    ),
  ],
);

void main() => runApp(MaterialApp.router(routerConfig: router));
// HomeScreen فيها زرار: onPressed: () => context.push('/products/42?tab=reviews')
// ProductScreen فيها: context.pop() للرجوع، و context.go('/') للرئيسية`,
          try: "اعمل الشاشتين (HomeScreen و ProductScreen) وشغّل على Chrome. افتح [[/#/products/7]] من شريط العنوان مباشرة (أو [[/products/7]] لو فعّلت path URLs): الـ tab هيبقى إيه؟ وهل فيه زرار رجوع؟ وبعدين افتح [[/products/abc]] وشوف اللي بيحصل.",
          flag: "script",
          deep: {
            why: "[[Navigator.push(MaterialPageRoute(...))]] كويس لتطبيق فيه ٣ شاشات. بس أول ما تحتاج لينك من إيميل أو إشعار يفتح منتج معين، أو التطبيق يشتغل على الويب وزرار back والـ URL يشتغلوا صح، أو تمنع شاشات من غير login، هتحتاج routing مبني على مسارات. go_router بيعمل ده فوق Router API بتاع Flutter من غير ما تكتب الكود المعقد بتاعه.",
            how: R`الـ routes متداخلة: [[products/:id]] جوه [[/]] يعني المسار الكامل [[/products/:id]]، والأهم إن الـ stack بيتبني من الشجرة: لو فتحت اللينك ده مباشرة، go_router بيحط HomeScreen تحت ProductScreen، فزرار الرجوع يرجّعك للرئيسية. الـ routes الفرعية مش بتبدأ بـ [[/]].

[[context.go(path)]] بيروح للمسار ويبني الـ stack من الشجرة، زي ما تكتب URL في المتصفح. [[context.push(path)]] بيحط الشاشة فوق الـ stack الحالي، ودا اللي عايزه لما الشاشة ترجّع نتيجة: [[final ok = await context.push<bool>('/confirm');]] والشاشة بتقفل بـ [[context.pop(true)]].

الـ parameters كلها نصوص، فانت اللي بتحوّل ([[int.parse]]). و [[state.extra]] بيبعت object كامل، بس مبيتحفظش في الـ URL، فلو المستخدم عمل refresh على الويب أو فتح deep link هيبقى null. ابعت الـ id في المسار وهات البيانات في الشاشة.

[[name:]] على الـ route يخليك تتنقل بالاسم: [[context.goNamed('product', pathParameters: {'id': '42'})]] بدل ما تبني الـ string بإيدك.

[[ShellRoute]] و [[StatefulShellRoute.indexedStack]] للشاشات اللي ليها bottom navigation ثابت: كل تاب ليه stack خاص بيه وبيحافظ على مكانه.

و [[errorBuilder]] للشاشة اللي تظهر لما المسار مش موجود أو الـ redirect رمى exception. أما exception جوه الـ builder نفسه فمبيوصلوش: دا error عادي وقت الـ build.`,
            when: "أي تطبيق فيه أكتر من كام شاشة، أو deep links، أو ويب، أو شاشات محمية بـ login. ولو تطبيق صغير جدًا من غير لينكات، Navigator العادي كفاية.",
            mistakes: R`تبعت الـ object في [[extra]] وتعتمد عليه، فالـ deep link والـ refresh يضربوا. وتنسى إن الـ path params نصوص فتعمل [[state.pathParameters['id'] as int]]. وتستخدم [[go]] وانت عايز ترجع بنتيجة، فالـ await مبيرجعش حاجة. وتحط [[/]] في أول مسار route فرعي. وتعمل [[GoRouter(...)]] جوه build فكل rebuild يعمل router جديد ويرجعك لأول شاشة: اعمله مرة واحدة بره (top-level أو في provider).`
          },
          teach: R`## الكود بيعمل إيه؟

بيعرّف شاشتين بمسارات زي الويب: الرئيسية على [[/]]، وصفحة المنتج على [[/products/:id]]، وبيقرا رقم المنتج من المسار والتاب من الـ query. اتجرّب في مشروع Flutter 3.44 مع [[go_router 18.0.2]] (من [[flutter pub add go_router]]) جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]: [[flutter analyze]] نضيف، و widget test بيدوس الزراير ويطبع [[router.state.uri]] (المسار الحالي)، وبعدين [[flutter build web]] وفتحته في Chrome headless عشان أشوف شريط العنوان. الشاشتين HomeScreen و ProductScreen أنا اللي كتبتهم زي التعليقات اللي في آخر المثال.

---

## ١. الـ imports

~~~dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
~~~

التاني هو الـ package. [[package:]] معناها «من مكتبة متسطبة في pubspec.yaml» مش من ملف في مشروعك.

---

## ٢. الـ router: بيتعمل مرة واحدة بره أي widget

~~~dart
final router = GoRouter(
  routes: [
~~~

- [[GoRouter(...)]] object واحد فيه خريطة التطبيق كله.
- متعرّف **top-level** (بره أي class)، فبيتعمل مرة واحدة. لو اتعمل جوه [[build]] كل rebuild هيعمل router جديد ويرجعك لأول شاشة.
- [[routes: [ ... ]]] لستة الشاشات.

### الـ route الرئيسي

~~~dart
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
~~~

- [[GoRoute]] = شاشة واحدة ليها مسار.
- [[path: '/']] المسار. [[/]] لوحدها = الرئيسية.
- [[builder]] دالة بترجّع الـ widget اللي يتعرض. بتاخد [[context]] (مكان الشاشة في الشجرة) و [[state]] (تفاصيل الـ URL اللي اتفتح: المسار والـ parameters).

### route فرعي

~~~dart
      routes: [
        GoRoute(
          path: 'products/:id',
~~~

- [[routes:]] **جوه** الـ route الرئيسي = routes فرعية. المسار الكامل بيبقى [[/]] + [[products/:id]] = [[/products/:id]].
- مفيش [[/]] في أول المسار الفرعي، لأنه بيتلزق في مسار الأب.
- [[:id]] النقطتين قبل الاسم معناها **جزء متغير**: [[/products/42]] و [[/products/7]] الاتنين بيطابقوا، والقيمة بتتحط في [[id]].

---

## ٣. قراية الـ URL جوه الـ builder

~~~dart
          builder: (context, state) {
            final id = int.parse(state.pathParameters['id']!);
            final tab = state.uri.queryParameters['tab'] ?? 'info';
            return ProductScreen(id: id, tab: tab);
          },
~~~

نفك السطر الأول من جوه لبرة:
1. [[state.pathParameters]] Map فيها الأجزاء المتغيرة: [[{'id': '42'}]]. لاحظ إن القيمة **نص** [['42']] مش رقم.
2. [[['id']]] هات القيمة. نوعها [[String?]] لأن الـ Map ممكن متكونش فيها المفتاح.
3. [[!]] «أنا متأكد إنها مش null». هنا آمنة لأن المسار مستحيل يطابق من غير id.
4. [[int.parse(...)]] بيحوّل النص لرقم.

والسطر التاني:
- [[state.uri]] الـ URL كامل. و [[queryParameters]] اللي بعد [[?]]: في [[/products/42?tab=reviews]] هي [[{'tab': 'reviews'}]].
- [[?? 'info']] لو مفيش tab خالص خد 'info'.

---

## ٤. ربطه بالتطبيق

~~~dart
void main() => runApp(MaterialApp.router(routerConfig: router));
~~~

[[MaterialApp.router]] بدل [[MaterialApp]] العادي: مفيش [[home:]]، والشاشة اللي تظهر بيقررها الـ router حسب الـ URL.

---

## ٥. التنقل: [[push]] و [[pop]] و [[go]]

~~~dart
// HomeScreen فيها زرار: onPressed: () => context.push('/products/42?tab=reviews')
// ProductScreen فيها: context.pop() للرجوع، و context.go('/') للرئيسية
~~~

في الاختبار دوست الزراير بالترتيب ده، وطبعت المسار بعد كل خطوة:

~~~text flutter test
start: /
after push: /products/42?tab=reviews | 1 | back btn: 1
after pop: / home visible: 1
direct go /products/7: /products/7 tab info: 1 back btn: 1
after back: /
~~~

- [[context.push(...)]]: حط الشاشة **فوق** اللي انت فيها. الـ [[1]] في النص عدد مرات ما النص [[tab: reviews]] ظهر على الشاشة، وظهر كمان زرار رجوع ([[BackButton]]) في الـ AppBar.
- [[context.pop()]]: شيل الشاشة اللي فوق وارجع.
- [[router.go('/products/7')]] (زي [[context.go]] بالظبط): روح للمسار ده و**ابني الـ stack من شجرة الـ routes**. ولأن products جوه [[/]]، go_router حط HomeScreen تحت ProductScreen، فظهر زرار رجوع ودوسته رجعني [[/]]. والـ tab بقى [[info]] لأن مفيش [[?tab=]].

| | [[go]] | [[push]] |
|---|---|---|
| الـ stack | بيتبني من شجرة الـ routes | الشاشة فوق الحالية |
| ترجّع نتيجة بـ [[await]] | لأ | آه: [[await context.push<bool>(...)]] |
| الـ URL على الويب | بيتغير | **بيفضل زي ما هو** (تحت) |

---

## ٦. على الويب: شريط العنوان

بنيت التطبيق بـ [[flutter build web]] وفتحته في Chrome:

~~~text Chrome headless
فتحت /#/products/7 مباشرة   →  Product 7 و tab: info وسهم رجوع في الـ AppBar
دوست Open 42 (push)         →  Product 42 و tab: reviews، والعنوان فضل http://localhost:5992/
فتحت /#/products/7 ودوست Home (go)  →  العنوان بقى /
زرار back بتاع المتصفح      →  رجع /#/products/7
~~~

- [[#]] في العنوان: Flutter web افتراضيًا بيحط المسار بعد [[#]] (hash URL)، عشان أي سيرفر static يقدر يقدّم الصفحة. لو عايز [[/products/7]] من غير [[#]] بتنادي [[usePathUrlStrategy()]] (من [[flutter_web_plugins]]) قبل runApp، والسيرفر لازم يرجّع index.html لأي مسار.
- [[push]] مغيّرش العنوان: في go_router الحالي [[GoRouter.optionURLReflectsImperativeAPIs]] افتراضيًا false. فالشاشة اللي عايزها يبقى ليها لينك يتنسخ، افتحها بـ [[go]].

---

## ٧. [[/products/abc]]

المسار اتطابق عادي (أي نص ينفع يبقى [[:id]])، بس [[int.parse('abc')]] ضرب جوه الـ builder:

~~~text flutter test
abc exception: FormatException: Invalid radix-10 number (at character 1)
abc
^
~~~

وفي Chrome (نسخة debug بـ [[flutter run -d web-server]]) الشاشة بقت حمرا ومكتوب فيها [[FormatException: abc]]. [[radix-10]] يعني «رقم عشري»، و [[character 1]] أول حرف مش رقم. go_router مش بيمسك الـ exception ده: [[errorBuilder]] بتاعه للمسارات اللي ملهاش route. الحل [[int.tryParse]] اللي بترجّع null بدل ما ترمي، وتعرض «المنتج مش موجود».

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[GoRouter(routes: [...])]] | خريطة الشاشات، تتعمل مرة واحدة بره build |
| [[GoRoute(path:, builder:)]] | شاشة ليها مسار |
| [[routes:]] جوه route | routes فرعية من غير [[/]] في الأول، والـ stack بيتبني منها |
| [[:id]] | جزء متغير، وقيمته في [[state.pathParameters['id']]] كنص |
| [[state.uri.queryParameters]] | اللي بعد [[?]] |
| [[MaterialApp.router(routerConfig:)]] | ربط الـ router بالتطبيق |
| [[context.go]] / [[context.push]] / [[context.pop]] | روح وابني الـ stack / فوق الحالي / ارجع |

- الـ parameters دايمًا نصوص: [[int.tryParse]] أأمن من [[int.parse]].
- على الويب [[push]] مش بيغيّر الـ URL افتراضيًا، و [[go]] بيغيّره.`,
          lines: [
            "مكتبة Material.",
            "go_router (من [[flutter pub add go_router]]).",
            "الـ router: بيتعمل مرة واحدة بره أي widget.",
            "لستة الـ routes.",
            "route.",
            "المسار الرئيسي.",
            "الشاشة اللي تتعرض.",
            "routes فرعية: بتتحط فوق الرئيسية في الـ stack.",
            "route.",
            "[[:id]] جزء متغير. ومن غير [[/]] في الأول لأنه فرعي.",
            "builder بياخد state فيه تفاصيل الـ URL.",
            "اقرا الـ id كنص وحوّله لرقم.",
            "query parameter اختياري بقيمة افتراضية.",
            "ابعت القيم للشاشة كـ constructor عادي.",
            "قفلة الـ builder.",
            "قفلة الـ route.",
            "قفلة الـ routes الفرعية.",
            "قفلة.",
            "قفلة الـ routes.",
            "قفلة الـ router.",
            "[[MaterialApp.router]] بدل MaterialApp، و routerConfig هو الـ router."
          ],
          sol: R`[[/products/7]] مباشرة: ProductScreen بيظهر بـ [[tab: info]] (القيمة الافتراضية لأن مفيش [[?tab=]])، وفيه زرار رجوع في الـ AppBar لأن go_router بنى الـ stack من الشجرة وحط HomeScreen تحته. لو كنت عامل الـ route ده top-level (مش جوه [[/]]) مكانش هيبقى فيه رجوع.

[[/products/abc]]: المسار نفسه اتطابق عادي (أي نص ينفع يبقى [[:id]])، بس [[int.parse('abc')]] بيرمي FormatException جوه الـ builder وقت بناء الشاشة. go_router مش بيمسك الـ exception ده ([[errorBuilder]] بتاعه للمسارات اللي ملهاش route أو لأخطاء الـ redirect)، فهتشوف الشاشة الحمرا بتاعة Flutter في debug وفي الترمنال [[FormatException: Invalid radix-10 number]]. الحل الصح: [[int.tryParse(...)]] ولو null اعرض شاشة «المنتج مش موجود» من الـ builder نفسه.

على الويب: [[context.go]] والفتح المباشر من شريط العنوان بيغيّروا الـ URL، وزرار back بتاع المتصفح بيرجّعك. إنما [[context.push]] بيفتح الشاشة والـ URL بيفضل زي ما هو (جربتها على go_router 18: دوست زرار [[push('/products/42?tab=reviews')]] والشاشة اتفتحت والعنوان فضل [[/]])، لأن [[GoRouter.optionURLReflectsImperativeAPIs]] افتراضيًا false. فاللي عايزه يبقى ليه لينك ابعته بـ go.`
        },
        {
          cmd: "redirect",
          title: "اللي مش عامل login يروح لشاشة الدخول ويرجع مكانه بعدها",
          desc: R`[[redirect]] دالة على الـ GoRouter بتتنادى قبل أي تنقل: ترجّع null يعني «كمّل»، أو ترجّع مسار تاني يعني «روح هنا بدل كده». ودا المكان الوحيد اللي بتحط فيه قاعدة «لازم login» بدل ما تكررها في كل شاشة.

و [[refreshListenable]] بيخلي الـ router يعيد تشغيل الـ redirect لما حالة الدخول تتغير: المستخدم عمل login يتنقل لوحده، وعمل logout أو التوكن انتهى يترمي على شاشة الدخول من أي مكان.`,
          example: R`import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final session = ValueNotifier<String?>(null);

final router = GoRouter(
  refreshListenable: session,
  redirect: (context, state) {
    final loggedIn = session.value != null;
    final atLogin = state.matchedLocation == '/login';
    if (!loggedIn && !atLogin) {
      return Uri(path: '/login', queryParameters: {'from': state.uri.toString()}).toString();
    }
    if (loggedIn && atLogin) return state.uri.queryParameters['from'] ?? '/';
    return null;
  },
  routes: [
    GoRoute(path: '/', builder: (context, state) => const Text('home')),
    GoRoute(path: '/login', builder: (context, state) => const Text('login')),
  ],
);`,
          try: "ضيف route [[/orders]]، وافتحه وانت مش عامل login: المسار في شريط العنوان بقى إيه؟ وبعدين حط زرار في شاشة login بيعمل [[session.value = 'token']]: رحت فين؟ وأخيرًا ضيف زرار logout في أي شاشة بيعمل [[session.value = null]].",
          flag: "script",
          deep: {
            why: "لو كل شاشة محمية فيها [[if (!loggedIn) Navigator.push(LoginScreen)]] هتنسى واحدة، ولينك من إشعار هيفتح شاشة الطلبات لحد مش عامل login. والـ redirect مكان واحد بيتنفذ قبل أي شاشة، سواء التنقل من زرار، أو من deep link، أو من زرار back في المتصفح.",
            how: R`الـ redirect بيتنادى في كل تنقل، وكمان كل ما الـ [[refreshListenable]] يعمل notify. [[ValueNotifier]] هنا أبسط Listenable: أي تغيير في [[.value]] بيعمل notify. في تطبيق حقيقي بيبقى ChangeNotifier بتاع الـ auth، أو stream حالة Firebase Auth، أو listener على provider في Riverpod.

[[state.matchedLocation]] المسار اللي اتطابق من غير query، و [[state.uri]] الـ URL كامل. بنحط المسار الأصلي في [[from]] عشان بعد الـ login نرجّع المستخدم لنفس المكان بدل الرئيسية. و [[Uri(...)]] بيعمل encode للـ query صح ([[/login?from=%2Forders]]).

لازم الشرطين: «مش عامل login ومش في شاشة login» يروح login، و«عامل login وفي شاشة login» يروح من مكان ما جه. من غير الشرط التاني المستخدم هيفضل واقف في login بعد ما يدخل. ومن غير [[!atLogin]] هتعمل redirect loop: login بيعمل redirect لـ login، و go_router بيوقف بعد عدد معين ويرمي error.

فيه كمان redirect على مستوى route واحد ([[GoRoute(redirect: ...)]]) لقواعد خاصة (صفحة admin بس).

الـ redirect بيتنادى sync في الغالب، فمتعملش فيه طلب شبكة. الحالة لازم تبقى جاهزة في الذاكرة (التوكن اتقرا من secure storage في main قبل runApp، درس flutter_secure_storage).

والحماية دي UX بس: الـ backend لازم يرفض أي طلب من غير توكن صحيح (درس requireAuth في «تاب Backend بـ Node» و «auth dependency» في «تاب Python و FastAPI»).`,
            when: "أي تطبيق فيه login. وكمان onboarding (أول فتحة تروح شاشة التعريف)، و«لازم تكمّل بياناتك الأول»، وصلاحيات (admin).",
            mistakes: R`redirect loop لأنك نسيت تستثني شاشة login. ونسيان [[refreshListenable]] فالمستخدم يعمل login والشاشة متتحركش لحد ما يدوس حاجة. وتقرا التوكن من secure storage جوه redirect (async) بدل ما يبقى جاهز في الذاكرة. وتفتكر إن redirect في التطبيق كفاية للأمان: أي حد يقدر يبعت request للـ API مباشرة.`
          },
          teach: R`## الكود بيعمل إيه؟

قاعدة واحدة للتطبيق كله: اللي مش عامل login أي مسار يفتحه بيتحوّل لشاشة الدخول، ومعاه المكان اللي كان رايحه في [[?from=]]، وأول ما يعمل login يرجع له لوحده. اتجرّب بـ go_router 18.0.2 في Flutter 3.44 جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]: widget test بيطبع [[router.state.uri]] بعد كل خطوة، و [[flutter build web]] اتفتح في Chrome headless عشان شريط العنوان. ضفت route [[/orders]] وزرار Login زي الـ solCode.

---

## ١. حالة الدخول: [[ValueNotifier]]

~~~dart
final session = ValueNotifier<String?>(null);
~~~

- [[ValueNotifier<T>]] (من Flutter) علبة فيها قيمة واحدة في [[.value]]، وأي تغيير في القيمة بيبعت إشعار (notify) لكل اللي سامعين.
- [[<String?>]] نوع القيمة: التوكن (نص) أو null.
- [[(null)]] القيمة الأولى: مش عامل login.

---

## ٢. الـ router يسمع للحالة: [[refreshListenable]]

~~~dart
final router = GoRouter(
  refreshListenable: session,
~~~

[[refreshListenable]] بياخد أي [[Listenable]] (حاجة ينفع تسمع لها، و ValueNotifier واحدة منهم). كل ما session تتغير، الـ router بيعيد تشغيل الـ redirect على الشاشة الحالية. من غيره: المستخدم يعمل login والشاشة متتحركش لحد ما يدوس حاجة.

---

## ٣. الـ [[redirect]]: سطر سطر

~~~dart
  redirect: (context, state) {
    final loggedIn = session.value != null;
    final atLogin = state.matchedLocation == '/login';
~~~

- [[redirect]] دالة بتتنادى **قبل** أي تنقل. بترجّع [[String?]]: مسار = «روح هنا بدل كده»، و null = «كمّل عادي».
- [[loggedIn]]: فيه توكن؟
- [[state.matchedLocation]] المسار اللي اتطابق **من غير** الـ query. في [[/login?from=%2Forders]] هو [[/login]] بس، فالمقارنة تنجح حتى لو فيه from.

### الشرط الأول: مش عامل login

~~~dart
    if (!loggedIn && !atLogin) {
      return Uri(path: '/login', queryParameters: {'from': state.uri.toString()}).toString();
    }
~~~

- [[!]] قبل متغير bool = «مش». يعني: مش عامل login **و** ([[&&]]) مش في شاشة login.
- [[state.uri.toString()]] المسار اللي كان رايحه كامل، زي [[/orders]].
- [[Uri(path:, queryParameters:)]] بيبني URL ويعمل **encode** للقيم: الـ [[/]] جوه قيمة الـ query بتتكتب [[%2F]]، عشان متتلخبطش مع الـ [[/]] بتاعة المسار. و [[.toString()]] بيحوّله نص.

### الشرط التاني: عمل login وهو في شاشة login

~~~dart
    if (loggedIn && atLogin) return state.uri.queryParameters['from'] ?? '/';
    return null;
  },
~~~

- رجّعه للمكان اللي كان رايحه. [[queryParameters]] بيفك الـ encoding لوحده، فـ [[%2Forders]] بترجع [[/orders]].
- [[?? '/']] لو فتح login مباشرة من غير from، يروح الرئيسية.
- [[return null;]] أي حالة تانية: كمّل.

---

## ٤. الـ routes

~~~dart
  routes: [
    GoRoute(path: '/', builder: (context, state) => const Text('home')),
    GoRoute(path: '/login', builder: (context, state) => const Text('login')),
  ],
);
~~~

شاشات بسيطة للتجربة. ولما فتحتها في Chrome النص ظهر **أحمر وتحته خط أصفر**: ده شكل Flutter لـ [[Text]] مش جوه [[Scaffold]] أو [[Material]] (مفيش ستايل نص افتراضي). في تطبيق حقيقي كل شاشة جواها Scaffold.

---

## ٥. اللي حصل فعلًا (اتجرّب)

ضفت [[/orders]] وخليت شاشة login زرار بيعمل [[session.value = 'token']]:

~~~text flutter test
start: /login?from=%2F
go /orders not logged in: /login?from=%2Forders matched=/login
from param: /orders
after login: /orders orders shown: 1
after logout: /login?from=%2Forders
~~~

| الخطوة | ليه |
|---|---|
| أول ما التطبيق فتح: [[/login?from=%2F]] | حتى الرئيسية [[/]] محمية، فاتحوّلت login ومعاها from = [[/]] |
| [[go('/orders')]] → [[/login?from=%2Forders]] | الشرط الأول. و matchedLocation بقى [[/login]] |
| دوست Login → [[/orders]] | session اتغيرت، refreshListenable شغّل الـ redirect، والشرط التاني رجّعه لـ from. ومفيش أي [[context.go]] في الزرار |
| [[session.value = null]] → [[/login?from=%2Forders]] | logout من أي شاشة بيرميك على login ومعاك مكانك |

وفي Chrome فتحت [[/#/orders]]:

~~~text Chrome headless
open /#/orders -> http://localhost:5992/#/login?from=/orders
after Login -> http://localhost:5992/#/orders
~~~

شريط العنوان عرض from من غير [[%2F]]، بس القيمة نفسها اللي الـ router شايفها.

---

## ٦. ليه [[!atLogin]] لازم؟ (redirect loop)

شلت [[&& !atLogin]] من الشرط الأول وشغّلت. على شاشة login نفسها الـ redirect رجّع login تاني بـ from جديد، وهكذا:

~~~text flutter test (الشاشة اللي ظهرت)
Page Not Found
GoException: too many redirects /login?from=%2F => /login?from=%2Flogin%3Ffrom%3D%252F => /login?from=%2Flogin%3Ffrom%3D%252Flogin%253Ffrom%253D%25252F => ...
Go to home page
~~~

- كل لفة الـ from بيتلف جوه from تاني، والـ encoding بيتراكم ([[%2F]] بقت [[%252F]] لأن [[%]] نفسها اتعملها encode لـ [[%25]]).
- go_router بيوقف بعد [[redirectLimit]] (افتراضيًا 5) ويعرض شاشة الخطأ الافتراضية. ولو redirect رجّع **نفس** المسار بالظبط go_router بيعتبره «كمّل» ومفيش loop، بس هنا المسار كان بيتغير كل مرة.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[ValueNotifier<String?>]] | حالة الدخول، وأي تغيير بيعمل notify |
| [[refreshListenable: session]] | الـ redirect يتشغّل تاني لما الحالة تتغير |
| [[redirect: (context, state) {...}]] | قبل كل تنقل: مسار = حوّل، null = كمّل |
| [[state.matchedLocation]] | المسار من غير query |
| [[Uri(path:, queryParameters:)]] | يبني URL و encode صح |
| [[!loggedIn && !atLogin]] | الشرط اللي بيمنع الـ loop |

- مكان واحد للقاعدة بدل [[if]] في كل شاشة، وبيشتغل مع الزراير والـ deep links وزرار back في المتصفح.
- دي حماية للـ UX بس: الـ backend لازم يرفض أي طلب من غير توكن.`,
          lines: [
            "مكتبة Material (فيها ValueNotifier).",
            "go_router.",
            "حالة الدخول: التوكن أو null. أي تغيير فيها بيعمل notify.",
            "الـ router.",
            "لما session تتغير، الـ redirect يتنادى تاني.",
            "بيتنادى قبل كل تنقل.",
            "عامل login؟",
            "رايح لشاشة login أصلًا؟",
            "مش عامل login ورايح لحتة تانية...",
            "...روح login وخد معاك المكان الأصلي في from (مع encoding صح).",
            "قفلة الـ if.",
            "عمل login وهو في شاشة login: رجّعه مكان ما كان رايح.",
            "null: كمّل عادي.",
            "قفلة الـ redirect.",
            "الـ routes.",
            "الرئيسية.",
            "شاشة الدخول.",
            "قفلة.",
            "قفلة الـ router."
          ],
          sol: R`لما تفتح [[/orders]] من غير login، المسار بيبقى [[/login?from=%2Forders]] (ده [[router.state.uri]]: الـ [[/]] اتعمله encode لـ [[%2F]]) والشاشة login. وفي شريط عنوان Chrome (نسخة web) ظهر [[#/login?from=/orders]]. لما الزرار يغيّر session، الـ router بيسمع (refreshListenable) ويشغّل redirect تاني: loggedIn بقت true و atLogin true، فيرجّعك لـ [[/orders]] من غير ما تكتب أي navigation في شاشة login.

الـ logout من أي شاشة: session بقت null، فالـ redirect يرميك على [[/login?from=...]] بالمسار اللي كنت فيه.

الغلط الشائع: تكتب [[context.go('/')]] في زرار الـ login كمان. مش محتاج، والأسوأ إنه بيبوّظ الرجوع لـ from.`,
          solCode: R`GoRoute(path: '/orders', builder: (context, state) => const Text('orders')),
GoRoute(
  path: '/login',
  builder: (context, state) => TextButton(
    onPressed: () => session.value = 'token',
    child: const Text('Login'),
  ),
),
// في أي شاشة:
TextButton(onPressed: () => session.value = null, child: const Text('Logout')),`
        },
        {
          cmd: "Form و validator",
          title: "فورم يطلّع الغلط تحت كل حقل قبل ما يبعت",
          desc: R`[[Form]] بيجمّع كذا [[TextFormField]]، وكل حقل ليه [[validator]]: دالة بتاخد النص وترجّع null لو سليم، أو رسالة الخطأ اللي تظهر تحته. و [[_formKey.currentState!.validate()]] بيشغّل كل الـ validators مرة واحدة ويرجّع true لو كلهم سليمين.

و [[TextEditingController]] بيقرا النص أو يغيّره، ولازم يتقفل في [[dispose]]. و [[autovalidateMode: AutovalidateMode.onUserInteraction]] بيخلي الخطأ يظهر وهو بيكتب بعد أول لمسة، مش من أول ما الشاشة تفتح.`,
          example: R`import 'package:flutter/material.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});
  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _busy = false;

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _busy = true);
    await Future.delayed(const Duration(seconds: 1));
    if (!mounted) return;
    setState(() => _busy = false);
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Welcome $__{_email.text}')));
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: Column(
        spacing: 12,
        children: [
          TextFormField(
            controller: _email,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: 'Email'),
            validator: (v) => v != null && v.contains('@') ? null : 'اكتب إيميل صحيح',
          ),
          TextFormField(
            controller: _password,
            obscureText: true,
            decoration: const InputDecoration(labelText: 'Password'),
            validator: (v) => (v ?? '').length >= 8 ? null : '8 حروف على الأقل',
          ),
          FilledButton(
            onPressed: _busy ? null : _submit,
            child: Text(_busy ? 'Signing in...' : 'Sign in'),
          ),
        ],
      ),
    );
  }
}`,
          try: "ضيف حقل «تأكيد الباسورد» بـ validator بيقارن بـ [[_password.text]]. وخلي Enter في حقل الإيميل ينقل للباسورد، و Enter في آخر حقل يعمل submit. وبعدين دوس Sign in مرتين بسرعة: الطلب بيتبعت كام مرة؟",
          flag: "script",
          deep: {
            why: "لو بعت بيانات غلط للسيرفر، المستخدم هيستنى الشبكة عشان يعرف إن الإيميل ناقصه @. والـ validation في التطبيق بيدّيه الرد فورًا وتحت الحقل الغلط بالظبط. بس مش بديل لـ validation السيرفر: أي حد يقدر يبعت request من غير التطبيق.",
            how: R`[[GlobalKey<FormState>]] مفتاح بيوصلك للـ State بتاع الـ Form من بره الشجرة بتاعته. [[currentState!.validate()]] بيلف على كل TextFormField تحته، ينادي الـ validator، ويعرض الرسايل، ويرجّع true لو كلهم رجّعوا null. وفيه [[save()]] بينادي [[onSaved]] لكل حقل، و [[reset()]] بيرجّع القيم الأولية.

الـ validator لازم sync. لو محتاج تسأل السيرفر «الإيميل ده مستخدم؟»، اعملها بعد validate: ابعت الطلب، ولو السيرفر رجّع خطأ حطه في متغير state واعرضه بـ [[InputDecoration(errorText: _serverError)]] أو في الـ validator نفسه وأعد validate.

منع الإرسال المزدوج: [[onPressed: _busy ? null : _submit]]. null بيقفل الزرار (وبيتلوّن رمادي لوحده)، فالضغطة التانية ملهاش أثر.

[[if (!mounted) return;]] بعد أي await: المستخدم ممكن يكون قفل الشاشة وهو مستني، و setState أو [[ScaffoldMessenger.of(context)]] على State اتشال بيضرب.

التنقل بين الحقول: [[textInputAction: TextInputAction.next]] بيغيّر زرار الكيبورد لـ «التالي» وبينقل الـ focus لوحده، و [[TextInputAction.done]] مع [[onFieldSubmitted: (_) => _submit()]] في آخر حقل.

وأنواع الكيبورد: [[TextInputType.emailAddress]] و [[phone]] و [[number]]، و [[autofillHints: const [AutofillHints.email]]] عشان مدير الباسوردات يملاها.`,
            when: "أي شاشة بتدخّل فيها بيانات: login، و register، و checkout، وإضافة منتج. ولو حقل واحد (بحث) مش محتاج Form، TextField و controller كفاية.",
            mistakes: R`تعمل الـ controller جوه build فكل rebuild يمسح اللي المستخدم كتبه. وتنسى dispose. وتعرض الأخطاء من أول ما الشاشة تفتح ([[AutovalidateMode.always]]) فالمستخدم يلاقي كل الحقول حمرا قبل ما يكتب. ومتقفلش الزرار وقت الإرسال فيتبعت طلبين ويتعمل طلب شراء مرتين. وتعتمد على validation التطبيق بس.`
          },
          teach: R`## الكود بيعمل إيه؟

فورم login فيه حقلين وزرار. لما تدوس الزرار كل حقل بيتفحص، ولو فيه غلط الرسالة بتظهر تحته والطلب مبيتبعتش. ولو كله تمام الزرار بيتقفل ثانية (مكان طلب الـ API) وبعدين تظهر رسالة ترحيب. اتجرّب في Flutter 3.44 جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]: [[flutter analyze]] نضيف، و widget tests بـ [[tester.enterText]] (يكتب في حقل) و [[tester.tap]] (يدوس) و [[pump]] (يرسم frame)، وبعدين [[flutter build web]] وصورة من Chrome headless. الفورم جوه [[Scaffold]] عشان الـ SnackBar يلاقي مكان يظهر فيه.

---

## ١. ليه [[StatefulWidget]]؟

~~~dart
class LoginForm extends StatefulWidget {
  const LoginForm({super.key});
  @override
  State<LoginForm> createState() => _LoginFormState();
}
~~~

الفورم عنده حاجات لازم تعيش طول ما الشاشة مفتوحة: الـ controllers، وحالة «بيبعت». ودي مكانها **State**. [[createState()]] بيعمل الـ object ده مرة واحدة، و [[_LoginFormState]] بيبدأ بـ [[_]] يعني private للملف ده.

---

## ٢. الـ fields

~~~dart
class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _busy = false;
~~~

- [[GlobalKey<FormState>]]: مفتاح بيتحط على الـ Form، وبيه توصل للـ [[FormState]] بتاعه من أي مكان عشان تقوله «افحص». [[<FormState>]] نوع الـ State اللي المفتاح بيشاور عليه.
- [[TextEditingController]]: بيمسك النص اللي في الحقل. [[_email.text]] تقرا، و [[_email.text = '...']] تكتب.
- [[_busy]]: فيه طلب شغال؟ بنستخدمه نقفل الزرار.

كلهم fields في الـ State، **مش** جوه build. لو controller اتعمل في build، كل rebuild هيعمل واحد جديد فاضي والمستخدم يلاقي اللي كتبه اتمسح.

---

## ٣. [[dispose]]: اقفل اللي فتحته

~~~dart
  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }
~~~

[[dispose]] بتتنادى لما الشاشة تتشال نهائيًا. الـ controller بيمسك listeners وموارد، فبتقفله. و [[super.dispose()]] في **الآخر** عشان الأب يقفل حاجته بعد ما انت تخلص.

---

## ٤. [[_submit]]: الإرسال خطوة خطوة

~~~dart
  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
~~~

نفكّه من جوه لبرة:
1. [[_formKey.currentState]] الـ FormState. نوعه [[FormState?]] (لو الـ Form مش على الشاشة يبقى null)، فـ [[!]] «أنا متأكد إنه موجود».
2. [[.validate()]] بيلف على كل [[TextFormField]] جوه الـ Form، ينادي الـ validator بتاعه، يعرض الرسايل، ويرجّع true لو **كلهم** رجّعوا null.
3. [[!]] قبلها = «مش». يعني لو فيه غلط: [[return]] واقف هنا.

~~~dart
    setState(() => _busy = true);
    await Future.delayed(const Duration(seconds: 1));
~~~

- [[setState]] غيّر _busy وأعد بناء الشاشة، فالزرار يتقفل ونصه يتغير.
- [[Future.delayed(...)]] استنى ثانية، مكان [[await api.login(...)]] الحقيقي. [[await]] بيوقف الدالة دي لحد ما يخلص من غير ما يجمّد الشاشة.

~~~dart
    if (!mounted) return;
    setState(() => _busy = false);
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Welcome $__{_email.text}')));
  }
~~~

- [[mounted]] true لو الـ State لسه على الشاشة. وانت مستني الثانية دي المستخدم ممكن يكون رجع ورا وقفل الشاشة، و setState أو [[context]] على State اتشال بيضرب. فاسأل الأول.
- [[ScaffoldMessenger.of(context)]] بيدوّر لفوق في الشجرة على اللي بيدير الـ SnackBars، و [[showSnackBar]] بيعرض الشريط اللي تحت.

---

## ٥. الـ [[Form]]

~~~dart
    return Form(
      key: _formKey,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: Column(
        spacing: 12,
        children: [
~~~

- [[key: _formKey]] ربط المفتاح بالـ Form ده.
- [[AutovalidateMode.onUserInteraction]]: الحقل يتفحص لوحده **بعد** ما المستخدم يلمسه ويكتب فيه، مش من أول ما الشاشة تفتح.
- [[Column]] الحقول تحت بعض، و [[spacing: 12]] مسافة 12 بكسل بين كل اتنين.

---

## ٦. الحقول والـ validators

~~~dart
          TextFormField(
            controller: _email,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: 'Email'),
            validator: (v) => v != null && v.contains('@') ? null : 'اكتب إيميل صحيح',
          ),
~~~

- [[TextFormField]] = حقل نص بيعرف يشتغل جوه Form (عنده validator).
- [[keyboardType: TextInputType.emailAddress]] على الموبايل الكيبورد بيظهر فيه [[@]].
- [[InputDecoration(labelText: 'Email')]] العنوان اللي جوه الحقل.
- [[validator: (v) => ...]] دالة بتاخد النص ([[v]]، ونوعه [[String?]]) وترجّع **null لو سليم**، أو **نص الغلط** اللي يظهر تحت الحقل. [[contains('@')]] فيه @؟

~~~dart
          TextFormField(
            controller: _password,
            obscureText: true,
            decoration: const InputDecoration(labelText: 'Password'),
            validator: (v) => (v ?? '').length >= 8 ? null : '8 حروف على الأقل',
          ),
~~~

- [[obscureText: true]] النص يظهر نقط.
- [[(v ?? '')]] لو v بـ null اعتبره نص فاضي، وبعدين [[.length >= 8]].

### اللي ظهر (اتجرّب)

~~~text flutter test
on open errors: []
empty submit errors: [اكتب إيميل صحيح, 8 حروف على الأقل] submits=0
typed ali: [اكتب إيميل صحيح, 8 حروف على الأقل]
valid: []
~~~

- أول ما الشاشة فتحت: مفيش ولا رسالة (بسبب onUserInteraction).
- دوست Sign in والحقول فاضية: الرسالتين ظهروا والطلب متبعتش ([[submits=0]]).
- كتبت [[ali]]: لسه غلط لأن مفيش @. وبعد [[ali@x.com]] و [[12345678]] الرسايل اختفت وهو بيكتب.

وفي Chrome بعد ما دوست Sign in على الفورم الفاضي: عناوين الحقلين بقت حمرا والرسالة تحت كل واحد. ولاحظ إن [[8 حروف على الأقل]] اتعرضت والـ 8 في الطرف التاني، لأن التطبيق اتجاهه LTR (مفيش locale عربي)، فالرقم بيتحط حسب اتجاه الفقرة.

---

## ٧. الزرار ومنع الإرسال المزدوج

~~~dart
          FilledButton(
            onPressed: _busy ? null : _submit,
            child: Text(_busy ? 'Signing in...' : 'Sign in'),
          ),
~~~

- [[onPressed: null]] في Flutter معناها **الزرار مقفول** (وبيتلوّن رمادي لوحده).
- [[_submit]] من غير [[()]]: بتدّيه الدالة نفسها يناديها لما يتداس، مش بتناديها دلوقتي.

~~~text flutter test
busy text: 1 onPressed null: true
snack: 1 submits=1
~~~

بعد أول ضغطة: النص بقى [[Signing in...]] و onPressed بقى null، فالضغطة التانية ملهاش أثر، والطلب اتبعت مرة واحدة والـ SnackBar ظهر. ولما شلت الشرط ([[onPressed: _submit]]) ودوست مرتين:

~~~text flutter test
no guard submits=2
~~~

طلبين. في checkout يعني الطلب يتعمل مرتين.

---

## ٨. الحل: تأكيد الباسورد و Enter

~~~dart
TextFormField(
  obscureText: true,
  textInputAction: TextInputAction.done,
  onFieldSubmitted: (_) => _submit(),
  decoration: const InputDecoration(labelText: 'Confirm password'),
  validator: (v) => v == _password.text ? null : 'الباسورد مش متطابق',
),
~~~

- الـ validator بيقرا الحقل التاني من الـ controller بتاعه: [[_password.text]].
- [[textInputAction: TextInputAction.next]] (على الإيميل والباسورد في الـ solCode) زرار الكيبورد يبقى «التالي» وبينقل الـ focus للحقل اللي بعده لوحده.
- [[TextInputAction.done]] في آخر حقل، و [[onFieldSubmitted]] بيتنادى لما يدوس Enter. [[(_)]] الـ parameter (النص) مش محتاجينه فاسمه [[_]].

~~~text flutter test (بعد ما ضفت الحقل)
focus moved to password: true
mismatch: [الباسورد مش متطابق] submits=0
match: [] submits=1
~~~

Enter (next) في الإيميل نقل الـ focus للباسورد من غير أي كود، و Enter (done) في التأكيد عمل submit.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[GlobalKey<FormState>]] | يوصلك للـ Form عشان [[validate()]] |
| [[TextEditingController]] | يقرا ويكتب النص، ويتقفل في dispose |
| [[validator]] | null = سليم، نص = رسالة الغلط تحت الحقل |
| [[AutovalidateMode.onUserInteraction]] | الغلط يظهر بعد ما يلمس الحقل مش من الأول |
| [[if (!mounted) return;]] | بعد أي await قبل setState أو context |
| [[onPressed: _busy ? null : _submit]] | الزرار يتقفل وقت الإرسال |
| [[TextInputAction.next]] / [[done]] | التنقل بين الحقول و Enter يبعت |

والـ validation في التطبيق للسرعة بس: السيرفر لازم يفحص تاني.`,
          lines: [
            "مكتبة Material.",
            "الفورم StatefulWidget لأن فيه controllers و state.",
            "constructor.",
            "بتعيد تعريف createState.",
            "بيعمل الـ State.",
            "قفلة.",
            "الـ State.",
            "مفتاح يوصلك للـ Form عشان تعمل validate.",
            "controller للإيميل.",
            "controller للباسورد.",
            "هل فيه طلب شغال دلوقتي؟",
            "بتعيد تعريف dispose.",
            "dispose.",
            "اقفل الـ controllers.",
            "والتاني.",
            "في الآخر.",
            "قفلة.",
            "الإرسال.",
            "شغّل كل الـ validators، ولو فيه غلط اقف (والرسايل ظهرت).",
            "اقفل الزرار واعرض حالة التحميل.",
            "مكان طلب الـ API الحقيقي.",
            "الشاشة ممكن تكون اتقفلت وانت مستني.",
            "رجّع الزرار.",
            "رسالة نجاح.",
            "قفلة _submit.",
            "بتعيد تعريف build.",
            "build.",
            "الـ Form.",
            "المفتاح.",
            "الأخطاء تظهر بعد ما المستخدم يلمس الحقل.",
            "الحقول تحت بعض.",
            "مسافة بينهم.",
            "الحقول.",
            "حقل إيميل.",
            "مربوط بالـ controller.",
            "كيبورد فيه @.",
            "العنوان.",
            "null يعني سليم، والنص رسالة الخطأ.",
            "قفلة.",
            "حقل باسورد.",
            "controller.",
            "النص مستخبي.",
            "العنوان.",
            "٨ حروف على الأقل.",
            "قفلة.",
            "الزرار.",
            "null وهو شغال = الزرار مقفول.",
            "النص حسب الحالة.",
            "قفلة الزرار.",
            "قفلة children.",
            "قفلة Column.",
            "قفلة Form.",
            "قفلة build.",
            "قفلة الـ State."
          ],
          sol: R`حقل التأكيد: validator بيرجّع رسالة لو [[v != _password.text]]. لاحظ إنه بيقرا الـ controller التاني مباشرة. والتنقل: [[textInputAction: TextInputAction.next]] على الإيميل والباسورد، و [[TextInputAction.done]] مع [[onFieldSubmitted: (_) => _submit()]] على التأكيد.

الضغط مرتين: الطلب بيتبعت مرة واحدة. أول ضغطة عملت [[_busy = true]] والـ rebuild خلّى onPressed null قبل الضغطة التانية. لو شلت الشرط ده ([[onPressed: _submit]]) هتلاقي الـ SnackBar ظهر مرتين، يعني الطلب اتبعت مرتين.`,
          solCode: R`TextFormField(
  controller: _password,
  obscureText: true,
  textInputAction: TextInputAction.next,
  decoration: const InputDecoration(labelText: 'Password'),
  validator: (v) => (v ?? '').length >= 8 ? null : '8 حروف على الأقل',
),
TextFormField(
  obscureText: true,
  textInputAction: TextInputAction.done,
  onFieldSubmitted: (_) => _submit(),
  decoration: const InputDecoration(labelText: 'Confirm password'),
  validator: (v) => v == _password.text ? null : 'الباسورد مش متطابق',
),`
        }
      ]
    },
    {
      t: "الداتا من الـ API",
      l: 2,
      n: "http بيجيب نص، و jsonDecode بيحوّله Map، و fromJson بيحوّله object ليه نوع، و FutureBuilder بيعرضه",
      items: [
        {
          cmd: "http",
          title: "تطلب بيانات من API وتبعت بيانات ليه",
          desc: R`package [[http]] (من فريق Dart) هو أبسط طريقة تكلم بيها أي API: [[http.get(uri)]] و [[http.post(uri, body: ...)]]، والاتنين بيرجّعوا [[Future<Response>]] فيه [[statusCode]] و [[body]] (نص). وبعدين [[jsonDecode(res.body)]] يحوّل النص لـ Map أو List.

http مش بيرمي exception لو السيرفر رجّع 404 أو 500: انت اللي لازم تبص على statusCode. وبيرمي بس لو الطلب موصلش أصلًا (مفيش نت، DNS، timeout).`,
          example: R`import 'dart:convert';
import 'package:http/http.dart' as http;

const base = 'https://jsonplaceholder.typicode.com';

class ApiException implements Exception {
  ApiException(this.statusCode, this.body);
  final int statusCode;
  final String body;
  @override
  String toString() => 'ApiException($statusCode)';
}

Future<List<Map<String, dynamic>>> fetchTodos() async {
  final uri = Uri.parse('$base/todos').replace(queryParameters: {'_limit': '3'});
  final res = await http.get(uri, headers: {'Accept': 'application/json'}).timeout(const Duration(seconds: 10));
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return (jsonDecode(res.body) as List).cast<Map<String, dynamic>>();
}

Future<Map<String, dynamic>> createTodo(String title) async {
  final res = await http.post(
    Uri.parse('$base/todos'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'title': title, 'completed': false, 'userId': 1}),
  );
  if (res.statusCode != 201) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}

Future<void> main() async {
  final todos = await fetchTodos();
  for (final t in todos) {
    print('$__{t['id']}: $__{t['title']}');
  }
  print(await createTodo('learn http'));
}`,
          try: "اعمل مشروع [[dart create -t console api_lab]] وضيف [[dart pub add http]] وشغّل المثال. بعدين غيّر المسار لـ [[/todos/99999]] في دالة تجيب todo واحد: إيه اللي بيحصل؟ وجرّب تقطع النت وتشغّل: أنهي exception بيطلع؟",
          flag: "script",
          deep: {
            why: "أي تطبيق حقيقي بيكلم backend: يجيب المنتجات، ويبعت الطلب، ويعمل login. ولازم تعرف تفرّق بين «الطلب نجح» و«السيرفر رد بخطأ» و«الطلب موصلش أصلًا»، لأن كل واحدة ليها رسالة مختلفة للمستخدم.",
            how: R`[[import 'package:http/http.dart' as http]]: الـ [[as http]] عشان الدوال اسمها عام ([[get]] و [[post]]) فتكتب [[http.get]] ومتتلخبطش.

[[Uri]] مش String: [[Uri.parse]] للمسار، و [[replace(queryParameters: ...)]] أو [[Uri.https('host', '/path', {...})]] بيعمل encode للـ query صح (مسافات وعربي). متبنيش الـ query بـ string concatenation.

الـ body: لو بعت Map مباشرة في [[body:]] package http بيبعتها form-urlencoded مش JSON. عشان كده [[jsonEncode]] + هيدر [[Content-Type: application/json]]. ودا أشهر سبب إن Express يستقبل [[req.body]] فاضي.

الأخطاء: [[ClientException]] (من http) لما الاتصال يفشل، و [[TimeoutException]] من [[.timeout()]]، و [[FormatException]] لو الرد مش JSON (صفحة HTML من nginx مثلًا). والـ statusCode انت اللي بتفحصه وترمي exception خاص بيك (درس try و on و rethrow).

[[http.get]] المباشر بيفتح اتصال ويقفله كل مرة. لو هتعمل طلبات كتير لنفس السيرفر: [[final client = http.Client();]] واستخدم [[client.get]] (بيعيد استخدام الاتصال)، واقفله بـ [[client.close()]] في الآخر. ودا كمان اللي بيخليك تبعت [[MockClient]] في الاختبارات.

[[jsonDecode]] بيرجّع dynamic: [[List<dynamic>]] أو [[Map<String, dynamic>]]، والأرقام int أو double حسب شكلها. و JSON كبير (ميجات) بـ jsonDecode على الـ main isolate ممكن يعمل تقطيع: [[await Isolate.run(() => jsonDecode(body))]].

وفيه [[dio]] كبديل مشهور فيه interceptors و retries و progress للرفع. http كفاية لمعظم التطبيقات، ولو احتجت interceptor للتوكن اعمل class صغير زي درس «API client بالتوكن».

على Android، الطلبات لـ [[http://]] (مش https) ممنوعة افتراضيًا في release. وعلى iOS نفس الكلام (App Transport Security). في التطوير على الـ emulator الـ localhost بتاع جهازك هو [[10.0.2.2]].`,
            when: "أي كلام مع REST API. ولو الـ API بتاعك GraphQL أو Firebase أو Supabase، استخدم الـ SDK بتاعهم بدل http مباشرة.",
            mistakes: R`تبعت Map في body من غير jsonEncode. وتفتكر إن 404 هيرمي exception فتعمل [[jsonDecode]] على صفحة الخطأ. ومفيش timeout، فالطلب يفضل معلّق دقيقة على نت ضعيف والـ spinner شغال. وتكتب [[localhost]] في التطبيق وهو على الـ emulator: localhost هناك هو الـ emulator نفسه. وتعمل [[as List<Map<String, dynamic>>]] على ناتج jsonDecode فيضرب: استخدم [[cast]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالتين بيكلموا API: [[fetchTodos]] بتجيب أول ٣ مهام (GET)، و [[createTodo]] بتعمل مهمة جديدة (POST). والاتنين بيفحصوا كود الرد ويرموا exception خاص لو السيرفر رد بخطأ.

**اتشغّل إزاي:** مشروع [[dart create -t console api_lab]] و [[dart pub add http]] (نزل [[http 1.6.0]]) جوه [[docker run --rm dart:stable]] (Dart 3.13.5). jsonplaceholder.typicode.com مكانش بيرد من الجهاز ده ([[HandshakeException: Connection terminated during handshake]])، فشغّلت سيرفر Node صغير على الجهاز نفسه (بورت 5993) بيرد بنفس شكل jsonplaceholder: نفس أول ٤ مهام، و POST بيرجّع 201 ومعاه [[id: 201]]، والمسار المش موجود بيرجّع 404 و [[{}]]. الحاجة الوحيدة اللي غيّرتها في الكود: [[base]] بقى [[http://host.docker.internal:5993]] (اسم بيوصل من جوه الـ container للجهاز). والسيرفر كان بيطبع كل طلب بيوصله، عشان نشوف اللي اتبعت فعلًا.

---

## ١. الـ imports

~~~dart
import 'dart:convert';
import 'package:http/http.dart' as http;
~~~

- [[dart:convert]] مكتبة جاية مع Dart، فيها [[jsonDecode]] (نص JSON → Map/List) و [[jsonEncode]] (العكس).
- [[as http]] اسم مستعار: كل حاجة من المكتبة تتكتب [[http.get]] و [[http.post]]. من غيره [[get]] لوحدها اسم عام ممكن يتلخبط مع حاجة تانية.

~~~dart
const base = 'https://jsonplaceholder.typicode.com';
~~~

[[const]] نص ثابت وقت الترجمة. في تطبيق حقيقي ده بييجي من [[--dart-define]] (درس dart-define).

---

## ٢. exception خاص بأخطاء السيرفر

~~~dart
class ApiException implements Exception {
  ApiException(this.statusCode, this.body);
  final int statusCode;
  final String body;
  @override
  String toString() => 'ApiException($statusCode)';
}
~~~

- [[implements Exception]]: الـ class ده نوع من الأخطاء، فينفع [[throw]] و [[on ApiException catch]].
- بيشيل كود الرد ونص الرد (السيرفر غالبًا بيكتب فيه سبب الغلط).
- [[toString]] عشان لما يتطبع يطلع [[ApiException(404)]] مش [[Instance of 'ApiException']].

---

## ٣. GET: [[fetchTodos]]

~~~dart
Future<List<Map<String, dynamic>>> fetchTodos() async {
~~~

[[Future<...>]] = «النتيجة هتيجي بعدين». والنتيجة لستة، كل عنصر Map مفاتيحها نصوص وقيمها أي نوع ([[dynamic]]).

### بناء الـ URL

~~~dart
  final uri = Uri.parse('$base/todos').replace(queryParameters: {'_limit': '3'});
~~~

- [[Uri.parse]] بيحوّل النص لـ [[Uri]] (object فيه الـ host والمسار والـ query متفصلين). [[http.get]] بياخد Uri مش String.
- [[.replace(queryParameters: {...})]] بيحط الـ query ويعمل **encode** للقيم. طبعته:

~~~text الناتج
http://host.docker.internal:5993/todos?_limit=3
https://example.com/search?q=%D9%83%D8%AA%D8%A8+%D8%B9%D8%B1%D8%A8%D9%8A&page=2
~~~

السطر التاني من [[Uri.https('example.com', '/search', {'q': 'كتب عربي', 'page': '2'})]]: العربي اتحوّل لـ [[%D9%83...]] والمسافة لـ [[+]]. لو بنيت الـ query بإيدك بـ string concatenation العربي والمسافات و [[&]] هيبوّظوا الطلب.

### الطلب

~~~dart
  final res = await http.get(uri, headers: {'Accept': 'application/json'}).timeout(const Duration(seconds: 10));
~~~

من جوه لبرة:
1. [[http.get(uri, headers: {...})]] ابعت GET. هيدر [[Accept]] بيقول للسيرفر «عايز الرد JSON».
2. [[.timeout(const Duration(seconds: 10))]] لو مخلصش في 10 ثواني ارمي [[TimeoutException]]. من غيره الطلب ممكن يفضل معلّق على نت ضعيف.
3. [[await]] استنى النتيجة: [[Response]] فيه [[statusCode]] (رقم) و [[body]] (نص).

### الفحص والتحويل

~~~dart
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return (jsonDecode(res.body) as List).cast<Map<String, dynamic>>();
}
~~~

- 200 = OK. أي حاجة تانية: ارمي. **http مش بيرمي لوحده** على 404 أو 500.
- [[jsonDecode(res.body)]] النص → [[List<dynamic>]].
- [[as List]] ثم [[.cast<Map<String, dynamic>>()]]: «عامل كل عنصر كـ Map». جربت [[as List<Map<String, dynamic>>]] مباشرة:

~~~text dart run
List<dynamic>
_TypeError: type 'List<dynamic>' is not a subtype of type 'List<Map<String, dynamic>>' in type cast
~~~

jsonDecode دايمًا بيعمل [[List<dynamic>]]، فالـ cast المباشر بيضرب، و [[cast]] هو الصح.

---

## ٤. POST: [[createTodo]]

~~~dart
Future<Map<String, dynamic>> createTodo(String title) async {
  final res = await http.post(
    Uri.parse('$base/todos'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'title': title, 'completed': false, 'userId': 1}),
  );
~~~

- [[Content-Type: application/json]] بيقول للسيرفر «الـ body اللي معايا JSON».
- [[jsonEncode({...})]] الـ Map → نص JSON.

السيرفر طبع اللي وصله:

~~~text اللي السيرفر استقبله
POST /todos content-type=application/json body={"title":"learn http","completed":false,"userId":1}
~~~

### لو نسيت jsonEncode

جربت [[http.post(uri, body: {'title': 'learn http'})]] (Map مباشرة):

~~~text اللي السيرفر استقبله
POST /todos content-type=application/x-www-form-urlencoded body=title=learn+http
~~~

package http حوّل الـ Map لـ **form** مش JSON، وغيّر الـ Content-Type. سيرفر Express بـ [[express.json()]] بس هيلاقي [[req.body]] فاضي.

~~~dart
  if (res.statusCode != 201) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}
~~~

201 = Created، الكود الطبيعي لإنشاء حاجة جديدة. و [[as Map<String, dynamic>]] على ناتج jsonDecode آمن، لأن الـ Map اللي بيعملها نوعها كده فعلًا.

---

## ٥. [[main]] والناتج

~~~dart
Future<void> main() async {
  final todos = await fetchTodos();
  for (final t in todos) {
    print('$__{t['id']}: $__{t['title']}');
  }
  print(await createTodo('learn http'));
}
~~~

[[main]] نفسها [[async]] عشان تقدر تعمل await. و [[$__{t['id']}]] جوه النص: الأقواس [[{}]] لازمة لأن فيه [[['id']]] مش اسم متغير بس.

~~~text dart run
1: delectus aut autem
2: quis ut nam facilis et officia qui
3: fugiat veniam minus
{title: learn http, completed: false, userId: 1, id: 201}
~~~

السطر الأخير الـ Map اللي السيرفر رجّعها، ومعاها [[id]] جديد. (jsonplaceholder الحقيقي بيرد كده بس مش بيحفظ فعلًا.)

---

## ٦. «جرّب»: الأخطاء التلاتة

### السيرفر رد بخطأ: 404

~~~dart
Future<Map<String, dynamic>> fetchTodo(int id) async {
  final res = await http.get(Uri.parse('$base/todos/$id')).timeout(const Duration(seconds: 10));
  if (res.statusCode == 404) throw ApiException(404, 'todo $id not found');
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}
~~~

~~~text dart run
status 404 body "{}"
caught ApiException(404): todo 99999 not found
~~~

السطر الأول من [[http.get]] لوحده: مفيش exception، الرد عادي بكود 404 و body [[{}]]. السطر التاني من fetchTodo: الفحص هو اللي رمى. ولـ id موجود ([[fetchTodo(1)]]) رجّع [[{userId: 1, id: 1, title: delectus aut autem, completed: false}]].

### الطلب موصلش أصلًا

~~~text dart run (container بـ --network none: مفيش شبكة خالص)
ClientException with SocketException: Failed host lookup: 'host.docker.internal' (OS Error: Temporary failure in name resolution, errno = -3)
~~~

~~~text dart run (بورت مفيش عليه سيرفر)
ClientException with SocketException: Connection refused (OS Error: Connection refused, errno = 111)
~~~

- [[Failed host lookup]]: مقدرش يحوّل اسم السيرفر لعنوان (DNS)، يعني مفيش نت.
- [[Connection refused]]: وصل للجهاز بس مفيش حد بيسمع على البورت ده.
- الاتنين [[ClientException]] (من package http)، ودي اللي تمسكها وتعرض «مفيش اتصال».

### بطيء: [[timeout]]

خليت السيرفر يستنى 15 ثانية:

~~~text dart run
TimeoutException after 0:00:10.000000: Future not completed
~~~

### الرد مش JSON

مسار بيرجّع صفحة HTML (زي nginx لما الـ backend يقع):

~~~text dart run
status 502
FormatException: Unexpected character (at character 1)
<html><body>502 Bad Gateway</body></html>
^
~~~

[[jsonDecode]] ضرب عند أول حرف [[<]]. عشان كده افحص statusCode **قبل** jsonDecode.

---

## الخلاصة

| الحالة | اللي بيحصل | تمسكه بـ |
|---|---|---|
| 200 / 201 | [[res.body]] نص JSON | [[jsonDecode]] |
| 404 / 500 | **مفيش exception**، [[statusCode]] بس | فحص بإيدك + [[ApiException]] |
| مفيش نت / السيرفر واقع | [[ClientException]] | [[on http.ClientException]] |
| بطيء | [[TimeoutException]] (لو حطيت [[.timeout]]) | [[on TimeoutException]] |
| الرد HTML | [[FormatException]] من jsonDecode | افحص الكود الأول |

- [[Uri]] و [[queryParameters]] بدل ما تبني الـ URL بإيدك.
- POST بـ JSON = [[jsonEncode]] + [[Content-Type: application/json]]، وإلا هيتبعت form.
- [[cast<...>()]] على ناتج jsonDecode، مش [[as List<...>]].`,
          lines: [
            "jsonDecode و jsonEncode.",
            "package http باسم مستعار.",
            "عنوان الـ API (مكانه الحقيقي config أو dart-define).",
            "exception خاص بأخطاء السيرفر.",
            "constructor.",
            "كود الرد.",
            "نص الرد (فيه رسالة الخطأ غالبًا).",
            "toString.",
            "عشان يتطبع مفهوم.",
            "قفلة.",
            "دالة بترجّع لستة Maps.",
            "بناء الـ URL بـ query من غير ما تكتب [[?]] بإيدك.",
            "GET بهيدر، ولو عدّى 10 ثواني يرمي TimeoutException.",
            "أي كود غير 200 يبقى خطأ انت بترميه.",
            "النص لـ List، و [[cast]] عشان كل عنصر Map.",
            "قفلة.",
            "POST.",
            "الطلب.",
            "العنوان.",
            "لازم تقول للسيرفر إن الـ body JSON.",
            "الـ Map لنص JSON.",
            "قفلة.",
            "الإنشاء بيرجّع 201 Created.",
            "الـ object اللي اتعمل (فيه id جديد).",
            "قفلة.",
            "البداية.",
            "هات أول ٣.",
            "لف عليهم.",
            "1: delectus aut autem وهكذا.",
            "قفلة الـ loop.",
            "{title: learn http, completed: false, userId: 1, id: 201}.",
            "قفلة."
          ],
          sol: R`الناتج: ٣ سطور شكلها [[1: delectus aut autem]] وبعدها Map فيه [[id: 201]] (jsonplaceholder بيرجّع 201 بس مش بيحفظ فعلًا).

[[/todos/99999]]: السيرفر بيرد 404 و body [[{}]]. http مش بيرمي حاجة، فلو دالتك بتفحص [[statusCode != 200]] هترمي [[ApiException(404)]]. ولو مش بتفحص، هتعمل fromJson على Map فاضي وتضرب في حتة تانية.

من غير نت: [[ClientException]] برسالة زي [[Failed host lookup]] أو [[Connection refused]] (حسب نوع الانقطاع)، ولو الشبكة موجودة بس بطيئة جدًا: [[TimeoutException after 0:00:10]]. دي اللي بتمسكها وتعرض «مفيش اتصال، حاول تاني».`,
          solCode: R`Future<Map<String, dynamic>> fetchTodo(int id) async {
  final res = await http.get(Uri.parse('$base/todos/$id')).timeout(const Duration(seconds: 10));
  if (res.statusCode == 404) throw ApiException(404, 'todo $id not found');
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}`
        },
        {
          cmd: "fromJson و toJson",
          title: "تحوّل الـ Map اللي جاي من الـ API لـ object ليه نوع",
          desc: R`[[Map<String, dynamic>]] مينفعش تبني عليه تطبيق: كل سطر فيه [[json['title']]] ممكن تكتبه غلط، والنوع dynamic. فبتعمل class للموديل فيه [[factory Todo.fromJson(Map<String, dynamic> json)]] بيقرا ويتأكد مرة واحدة، و [[toJson()]] بيرجّع Map تتبعت للسيرفر.

الطريقة الحديثة (زي docs Flutter): switch على الـ Map بـ pattern، فلو الشكل غلط ترمي [[FormatException]] واضح في مكان واحد. و [[copyWith]] بيعمل نسخة معدّلة بدل ما تغيّر الـ object.`,
          example: R`import 'dart:convert';

class Todo {
  const Todo({required this.id, required this.title, this.done = false, this.dueAt});

  final int id;
  final String title;
  final bool done;
  final DateTime? dueAt;

  factory Todo.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'id': int id, 'title': String title} => Todo(
          id: id,
          title: title,
          done: json['completed'] as bool? ?? false,
          dueAt: switch (json['due_at']) {
            String s => DateTime.parse(s),
            _ => null,
          },
        ),
      _ => throw FormatException('Invalid todo JSON', json),
    };
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'completed': done,
        'due_at': ?dueAt?.toIso8601String(),
      };

  Todo copyWith({String? title, bool? done}) =>
      Todo(id: id, title: title ?? this.title, done: done ?? this.done, dueAt: dueAt);
}

void main() {
  const body = '[{"id":1,"title":"buy milk","completed":true},{"id":2,"title":"call mom","due_at":"2026-10-01T09:00:00Z"}]';
  final todos = (jsonDecode(body) as List).map((e) => Todo.fromJson(e as Map<String, dynamic>)).toList();
  print(todos.map((t) => '$__{t.id} $__{t.title} $__{t.done} $__{t.dueAt?.day}').toList());
  final updated = todos[1].copyWith(done: true);
  print(jsonEncode(updated.toJson()));
  try {
    Todo.fromJson({'id': '3', 'title': 'x'});
  } on FormatException catch (e) {
    print(e.message);
  }
}`,
          try: "ضيف field اسمه [[tags]] نوعه [[List<String>]] (من JSON [[\"tags\": [\"home\"]]])، واقراه صح في fromJson، ورجّعه في toJson. وبعدين اكتب اختبار صغير: [[Todo.fromJson(todo.toJson())]] لازم يطلع نفس القيم. هل [[==]] بين الاتنين بترجّع true؟ ليه؟",
          flag: "script",
          deep: {
            why: "الـ API هو الحاجة الوحيدة في التطبيق اللي مش تحت سيطرتك: الـ backend ممكن يغيّر اسم field، أو يبعت null، أو رقم كنص. لو الـ Maps متوزعة في كل الشاشات، الغلط هيظهر في أي حتة. الـ fromJson بيخلي نقطة التحويل واحدة: يا الـ object يطلع سليم بأنواعه، يا exception واضح في مكان معروف.",
            how: R`[[factory]] مناسب لـ fromJson لأنه ممكن يرمي قبل ما يعمل object، وممكن يرجّع subclass حسب البيانات (درس named و factory في المستوى ١).

الـ pattern [[{'id': int id, 'title': String title}]] بيفحص وجود المفاتيح والأنواع مرة واحدة. الـ fields الاختيارية بتتقري بـ [[as bool?]] ومعاها [[??]] قيمة افتراضية.

التواريخ: JSON مفيهوش نوع تاريخ، فالسيرفر بيبعت نص ISO 8601، و [[DateTime.parse]] بيقراه (والـ Z معناها UTC). ولما تعرضه للمستخدم [[.toLocal()]]. وفي toJson [[toIso8601String()]].

الأسماء: السيرفر غالبًا snake_case ([[due_at]]) و Dart بـ camelCase ([[dueAt]]). التحويل مكانه fromJson و toJson بس.

[['due_at': ?dueAt?.toIso8601String()]] (Dart 3.8): المفتاح يتحط في الـ Map لو القيمة مش null بس. فرق بين «مبعتش المفتاح» و«بعته null» ممكن يفرق مع PATCH في السيرفر.

[[copyWith]]: الموديلات immutable (كل الـ fields final)، فلو عايز تعلّم todo إنه خلص بتعمل نسخة جديدة. ودا اللي بيخلي Riverpod و setState يعرفوا إن حاجة اتغيرت. عيبه إنه مبيعرفش يحط field بـ null (لأن null معناها «سيبه زي ما هو»)، ودي من الحاجات اللي freezed بيحلها.

[[==]]: الـ class العادي بيقارن بالمرجع (نفس الـ object في الذاكرة)، فنسختين بنفس القيم مش متساويين. لو محتاج مقارنة بالقيم (في الاختبارات أو [[select]] في Riverpod) لازم تعمل override لـ [[==]] و [[hashCode]]، أو تستخدم freezed (الدرس الجاي).`,
            when: "كل موديل جاي من API أو رايح له. ولو المشروع فيه ١٠ موديلات أو أكتر أو fields كتير، اكتبهم بـ json_serializable أو freezed بدل الإيد.",
            mistakes: R`[[json['id'] as int]] من غير فحص، وأول مرة السيرفر يبعت id كنص التطبيق يضرب برسالة مش واضحة بعيد عن المكان. وتنسى [[.toLocal()]] فالتواريخ تظهر متأخرة ساعتين أو تلاتة. وتعمل [[as List<String>]] على list جاية من JSON. وتحط منطق الشاشة (تنسيق سعر مثلًا) جوه الموديل: الموديل بيوصف البيانات بس.`
          },
          teach: R`## البرنامج بيعمل إيه؟

class اسمه [[Todo]] بيحوّل الـ Map اللي جاية من JSON لـ object ليه أنواع ([[fromJson]])، ويرجّعه Map تتبعت للسيرفر ([[toJson]])، ويعمل نسخة معدّلة ([[copyWith]]). اتشغّل بـ [[dart run]] في [[docker run --rm dart:stable]] (Dart 3.13.5).

---

## ١. الـ fields والـ constructor

~~~dart
class Todo {
  const Todo({required this.id, required this.title, this.done = false, this.dueAt});

  final int id;
  final String title;
  final bool done;
  final DateTime? dueAt;
~~~

- كل الـ fields [[final]]: الـ object بعد ما يتعمل مبيتغيرش (immutable). عايز تغيّر؟ اعمل نسخة (copyWith تحت).
- [[const]] قبل الـ constructor: ينفع تعمل [[const Todo(...)]] لو كل القيم ثابتة. مسموح لأن كل الـ fields final.
- [[{ }]] named parameters: [[Todo(id: 1, title: 'x')]] بالأسماء.
  - [[required this.id]] لازم تبعته.
  - [[this.done = false]] اختياري، والقيمة الافتراضية false.
  - [[this.dueAt]] اختياري ومن غير default، فبيبقى null. عشان كده نوعه [[DateTime?]].

---

## ٢. [[fromJson]]: Map → Todo

~~~dart
  factory Todo.fromJson(Map<String, dynamic> json) {
    return switch (json) {
~~~

- [[factory]] constructor مش لازم يعمل object جديد بنفسه: ممكن يرجّع object يعمله بطريقة تانية، أو **يرمي** قبل ما يعمل حاجة. ودا بالظبط اللي محتاجينه: يا Todo سليم يا exception.
- [[Todo.fromJson]] اسمه **named constructor** (اسم بعد نقطة)، فبتناديه [[Todo.fromJson(map)]].
- [[switch (json)]] switch expression على شكل الـ Map (درس «patterns بعمق»).

### الحالة السليمة

~~~dart
      {'id': int id, 'title': String title} => Todo(
          id: id,
          title: title,
~~~

الـ map pattern بيسأل: فيه id رقم صحيح؟ وفيه title نص؟ لو آه [[id]] و [[title]] بقوا متغيرات بأنواعها، ومفيش cast.

### الـ field الاختياري: [[as bool? ?? false]]

~~~dart
          done: json['completed'] as bool? ?? false,
~~~

من جوه لبرة:
1. [[json['completed']]] القيمة أو null لو المفتاح مش موجود.
2. [[as bool?]] «دي bool أو null». لو السيرفر بعت حاجة تانية (نص مثلًا) ده هيضرب، وهو كده صح: بيانات غلط.
3. [[?? false]] لو null خد false.

لاحظ: اسم السيرفر [[completed]] واسمنا [[done]]. التحويل بين الأسماء مكانه هنا بس.

### التاريخ: switch جوه switch

~~~dart
          dueAt: switch (json['due_at']) {
            String s => DateTime.parse(s),
            _ => null,
          },
        ),
~~~

- JSON مفيهوش نوع تاريخ، فالسيرفر بيبعته نص بصيغة ISO 8601 زي [[2026-10-01T09:00:00Z]].
- [[String s]] لو القيمة نص حطه في s، و [[DateTime.parse(s)]] بيحوّله DateTime.
- [[_ => null]] مش موجود أو نوعه غلط: null.

طبعت [[todos[1].dueAt]] و [[.isUtc]]:

~~~text الناتج
2026-10-01 09:00:00.000Z
true
~~~

الـ [[Z]] في الآخر معناها UTC (توقيت جرينتش). عشان تعرضه للمستخدم بتوقيته: [[dueAt!.toLocal()]]، وإلا مصر هتشوف الميعاد متأخر ساعتين أو تلاتة.

### أي شكل تاني

~~~dart
      _ => throw FormatException('Invalid todo JSON', json),
    };
  }
~~~

- [[throw]] هنا expression، فينفع جوه switch expression.
- [[FormatException(message, source)]] الـ parameter التاني الحاجة اللي فيها الغلط، مفيدة وانت بتعمل debug.

---

## ٣. [[toJson]]: Todo → Map

~~~dart
  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'completed': done,
        'due_at': ?dueAt?.toIso8601String(),
      };
~~~

- الأسماء ترجع زي السيرفر: [[completed]] و [[due_at]].
- [[dueAt?.toIso8601String()]]: لو dueAt مش null حوّله نص ISO، ولو null النتيجة null.
- [[?]] قبل القيمة في الـ Map (Dart 3.8) اسمها **null-aware element**: لو القيمة null **المفتاح نفسه** مبيتحطش.

~~~text الناتج
{"id":1,"title":"buy milk","completed":true}
~~~

ده toJson للمهمة الأولى اللي ملهاش تاريخ: مفيش [["due_at"]] خالص، مش [["due_at": null]]. والفرق ده بيفرق مع PATCH في السيرفر («متغيرش» مقابل «امسحه»).

---

## ٤. [[copyWith]]: نسخة معدّلة

~~~dart
  Todo copyWith({String? title, bool? done}) =>
      Todo(id: id, title: title ?? this.title, done: done ?? this.done, dueAt: dueAt);
}
~~~

- كل parameter اختياري ونوعه nullable. اللي مبعتهوش بيبقى null.
- [[title ?? this.title]]: لو بعت title جديد خده، وإلا خد القديم ([[this.title]] الـ field، عشان نفرّقه عن الـ parameter اللي بنفس الاسم).
- العيب: مينفعش تستخدمه تمسح قيمة (تخليها null)، لأن null معناها «سيبه زي ما هو».

---

## ٥. [[main]] والناتج

~~~dart
  const body = '[{"id":1,"title":"buy milk","completed":true},{"id":2,"title":"call mom","due_at":"2026-10-01T09:00:00Z"}]';
  final todos = (jsonDecode(body) as List).map((e) => Todo.fromJson(e as Map<String, dynamic>)).toList();
~~~

من جوه لبرة:
1. [[jsonDecode(body)]] النص → [[List<dynamic>]] فيها Maps.
2. [[as List]] عشان نقدر نعمل [[.map]].
3. [[.map((e) => ...)]] لكل عنصر [[e]]: [[e as Map<String, dynamic>]] ثم [[Todo.fromJson]].
4. [[.toList()]] الـ map بيرجّع Iterable (بيتحسب لما تقراه)، و toList بيحوّله List فعلًا.

~~~dart
  print(todos.map((t) => '$__{t.id} $__{t.title} $__{t.done} $__{t.dueAt?.day}').toList());
~~~

~~~text الناتج
[1 buy milk true null, 2 call mom false 1]
~~~

- الأولى [[completed: true]] فـ done = true، وملهاش تاريخ فـ [[dueAt?.day]] = null.
- التانية مفيهاش completed فـ done = false (الافتراضي)، و [[day]] = 1 (أول أكتوبر).

~~~dart
  final updated = todos[1].copyWith(done: true);
  print(jsonEncode(updated.toJson()));
~~~

~~~text الناتج
{"id":2,"title":"call mom","completed":true,"due_at":"2026-10-01T09:00:00.000Z"}
~~~

[[toIso8601String()]] كتب الميلي ثانية [[.000]]، فالنص مش نفس اللي جه بالظبط، بس نفس اللحظة.

~~~dart
  try {
    Todo.fromJson({'id': '3', 'title': 'x'});
  } on FormatException catch (e) {
    print(e.message);
  }
~~~

~~~text الناتج
Invalid todo JSON
~~~

[[id]] نص [['3']] مش int، فالـ pattern مطابقش ووقع في [[_]]. و [[on FormatException catch (e)]] بيمسك النوع ده بس، و [[e.message]] الرسالة من غير اسم النوع.

---

## ٦. «جرّب»: [[tags]] و round-trip

~~~dart
// في fromJson (جوه Todo(...)):
tags: (json['tags'] as List?)?.cast<String>() ?? const [],

// في toJson:
'tags': tags,
~~~

- [[as List?]] لستة من أي نوع أو null، ثم [[?.cast<String>()]] (مش [[as List<String>]] اللي بيضرب على بيانات jsonDecode)، و [[?? const []]] لو مش موجودة لستة فاضية.

شغّلت الـ class بالـ tags:

~~~text الناتج
[home] x false
[]
~~~

- [[Todo.fromJson(t.toJson())]] رجّع نفس القيم: [[[home]]] و [[x]].
- بس [[t == back]] = **false**: الـ class العادي بيقارن بالمرجع (هل دول نفس الـ object في الذاكرة؟)، والاتنين objects مختلفين. عشان مقارنة بالقيم لازم override لـ [[==]] و [[hashCode]]، أو freezed (الدرس الجاي).
- السطر التاني: Todo من غير tags طلع [[[]]] مش null.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| fields [[final]] | الموديل immutable |
| [[factory Todo.fromJson]] | يرجّع object سليم أو يرمي |
| map pattern | يفحص المفاتيح والأنواع مرة واحدة |
| [[as bool? ?? false]] | field اختياري بقيمة افتراضية |
| [[DateTime.parse]] / [[toIso8601String()]] | التاريخ نص ISO في JSON، و [[toLocal()]] للعرض |
| [['key': ?value]] | المفتاح يتحط لو القيمة مش null |
| [[copyWith]] | نسخة معدّلة، بس مبيعرفش يحط null |
| [[==]] | بالمرجع، إلا لو عملت override |`,
          lines: [
            "jsonDecode و jsonEncode.",
            "الموديل.",
            "constructor بـ named parameters، و done افتراضيًا false.",
            "id.",
            "العنوان.",
            "خلصت ولا لأ.",
            "تاريخ اختياري.",
            "factory: بيقرر يرجّع object أو يرمي.",
            "switch على شكل الـ Map.",
            "لازم id رقم و title نص، وغير كده مش مطابق.",
            "id متأكد إنه int.",
            "title.",
            "اختياري: bool أو null، والافتراضي false.",
            "التاريخ: لو نص...",
            "...حوّله DateTime.",
            "...ولو مش موجود أو نوعه غلط: null.",
            "قفلة.",
            "قفلة الـ Todo.",
            "أي شكل تاني: FormatException ومعاه الـ Map للـ debugging.",
            "قفلة الـ switch.",
            "قفلة fromJson.",
            "toJson: الـ object لـ Map بأسماء السيرفر.",
            "id.",
            "title.",
            "done باسم السيرفر.",
            "[[?]] قبل القيمة: المفتاح يتحط لو التاريخ موجود بس.",
            "قفلة.",
            "copyWith: نسخة جديدة، والـ null معناها «سيبه زي ما هو».",
            "القيم الجديدة أو القديمة.",
            "قفلة الـ class.",
            "البداية.",
            "نص JSON زي اللي بيرجع من السيرفر.",
            "النص لـ List، وكل عنصر لـ Todo.",
            "[1 buy milk true null, 2 call mom false 1].",
            "نسخة معدّلة.",
            "الـ due_at موجود لأنه مش null: {...\"completed\":true,\"due_at\":\"2026-10-01T09:00:00.000Z\"}.",
            "JSON غلط: id نص.",
            "fromJson هيرمي.",
            "النوع اللي انت رميته.",
            "Invalid todo JSON.",
            "قفلة.",
            "قفلة main."
          ],
          sol: R`fromJson بيقرا tags بأمان: [[(json['tags'] as List?)?.cast<String>() ?? const []]]، و toJson بيرجّعها زي ما هي. الاختبار: [[Todo.fromJson(todo.toJson())]] بيطلع نفس القيم (id و title و done و tags)، بس [[==]] بين الاتنين بترجّع false. لأن الـ class مفيهوش [[operator ==]]، فالمقارنة بالمرجع، والاتنين objects مختلفين في الذاكرة. عشان true لازم override لـ [[==]] و [[hashCode]] (أو freezed).

الغلط الشائع: [[json['tags'] as List<String>]]، بيضرب وقت التشغيل بـ [[List<dynamic> is not a subtype of List<String>]].`,
          solCode: R`// جوه الـ class:
final List<String> tags;

// في fromJson (جوه Todo(...)):
tags: (json['tags'] as List?)?.cast<String>() ?? const [],

// في toJson:
'tags': tags,

// اختبار round-trip:
void main() {
  final t = Todo.fromJson({'id': 1, 'title': 'x', 'tags': ['home']});
  final back = Todo.fromJson(t.toJson());
  print('$__{back.tags} $__{back.title} $__{t == back}'); // [home] x false
}`
        },
        {
          cmd: "json_serializable و freezed",
          title: "fromJson و copyWith و == بتتكتب لوحدها",
          desc: R`لما الموديلات تكتر، كتابة fromJson و toJson و copyWith و [[==]] بإيدك مملة وسهل تغلط فيها. [[json_serializable]] بيولّد fromJson و toJson من annotations، و [[freezed]] بيولّد فوقها copyWith و [[==]] و [[hashCode]] و [[toString]]، وبيعمل sealed unions كمان.

الكود المتولّد بيتكتب في ملفات [[.g.dart]] و [[.freezed.dart]] جنب ملفك بأمر [[dart run build_runner build]]، أو [[watch]] يفضل شغال ويولّد مع كل حفظ.`,
          example: R`// flutter pub add json_annotation freezed_annotation dev:build_runner dev:json_serializable dev:freezed
// lib/models/todo.dart:
import 'package:freezed_annotation/freezed_annotation.dart';

part 'todo.freezed.dart';
part 'todo.g.dart';

@freezed
abstract class Todo with _$Todo {
  const factory Todo({
    required int id,
    required String title,
    @JsonKey(name: 'completed') @Default(false) bool done,
    @JsonKey(name: 'due_at') DateTime? dueAt,
  }) = _Todo;

  factory Todo.fromJson(Map<String, dynamic> json) => _$TodoFromJson(json);
}
// في الترمنال:
// dart run build_runner build
// dart run build_runner watch`,
          try: "اعمل الموديل ده وشغّل build_runner، وافتح [[todo.freezed.dart]] و [[todo.g.dart]] واقراهم. جرّب [[Todo(id: 1, title: 'a') == Todo(id: 1, title: 'a')]] و [[print(todo.copyWith(dueAt: null))]] على todo فيه تاريخ. وبعدين ابعت لـ fromJson Map فيها [[id]] نص وشوف الـ error.",
          flag: "script",
          deep: {
            why: "في تطبيق فيه ٣٠ موديل، الكود اليدوي لـ fromJson و copyWith و == بيبقى آلاف السطور، وأي field جديد لازم تفتكر تضيفه في ٥ أماكن. الـ codegen بيخلي الموديل تعريف الـ fields بس، والباقي بيتولّد صح كل مرة.",
            how: R`[[part 'todo.g.dart';]] بيقول إن الملف المتولّد جزء من نفس الـ library، فيقدر يشوف الـ private ([[_$TodoFromJson]]). واسم الـ part لازم يطابق اسم ملفك بالظبط.

freezed (من v3): الـ class لازم يبقى [[abstract class]] (أو [[sealed class]] لو فيه أكتر من factory، زي Loading و Data و Error)، و [[with _$Todo]] بيجيب الـ getters و copyWith. و [[const factory Todo({...}) = _Todo;]] بيعرّف الـ fields كـ parameters، والـ class الحقيقي [[_Todo]] متولّد.

annotations مهمة:
- [[@JsonKey(name: 'due_at')]] اسم مختلف في JSON. أو على الـ class كله [[@JsonSerializable(fieldRename: FieldRename.snake)]].
- [[@Default(false)]] قيمة افتراضية في الـ constructor وفي fromJson لو المفتاح مش موجود.
- [[DateTime]] بيتحوّل من وإلى ISO string أوتوماتيك.
- موديل جوه موديل: بيعمل fromJson ليه لوحده لو فيه fromJson.

الـ copyWith بتاع freezed بيفرّق بين «متبعتش» و «بعت null»، فـ [[copyWith(dueAt: null)]] بيمسح التاريخ فعلًا، عكس الـ copyWith اليدوي.

json_serializable لوحده (من غير freezed): [[@JsonSerializable()]] على class عادي، و [[factory X.fromJson(json) => _$XFromJson(json);]] و [[Map<String, dynamic> toJson() => _$XToJson(this);]] و [[part 'x.g.dart';]]. مناسب لو مش محتاج copyWith و ==.

الأخطاء في fromJson المتولّد: الكود فيه [[as num]] و [[as String]]، فالنوع الغلط بيرمي [[TypeError]] زي [[type 'String' is not a subtype of type 'num' in type cast]]، مش FormatException. اعمل catch ليه عند حدود الـ API لو عايز رسالة أوضح.

[[--delete-conflicting-outputs]] هتلاقيه في tutorials قديمة، النسخ الحالية من build_runner مبقتش محتاجاه.

الملفات المتولّدة: فرق بتعمله commit (عشان الـ CI والـ review يبقوا أسرع)، وفرق بتضيفه لـ .gitignore وتولّده في CI. اختار واحد وخليك عليه.`,
            when: "أكتر من ٥ موديلات، أو موديلات فيها fields كتير، أو محتاج == بالقيم (مقارنة state في Riverpod و Bloc، واختبارات). ولمشروع صغير فيه ٢ موديل، الكتابة بالإيد (الدرس اللي فات) أوضح.",
            mistakes: R`تنسى تشغّل build_runner بعد ما تضيف field فالـ compiler يقولك [[_$Todo]] مش فيه الـ getter الجديد. واسم الـ part مختلف عن اسم الملف. وتكتب [[class Todo with _$Todo]] من غير abstract في freezed 3 فيطلع error. وتعدّل في [[.g.dart]] بإيدك وأول build يمسح تعديلك.`
          },
          teach: R`## الكود بيعمل إيه؟

نفس موديل [[Todo]] بتاع الدرس اللي فات، بس انت بتكتب الـ fields بس، وأداة اسمها [[build_runner]] بتولّد الباقي: fromJson و toJson و copyWith و [[==]] و hashCode و toString. اتجرّب في مشروع Flutter 3.44 جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] بالأمر اللي في أول المثال، و pub نزّل: [[freezed 4.0.0-dev.3]] و [[freezed_annotation 3.1.0]] و [[json_serializable 6.14.1]] و [[json_annotation 4.12.0]] و [[build_runner 2.15.1]]. وبعد التوليد اختبرته بـ [[flutter test]].

---

## ١. التسطيب

~~~bash
flutter pub add json_annotation freezed_annotation dev:build_runner dev:json_serializable dev:freezed
~~~

| الـ package | نوعه | بيعمل إيه |
|---|---|---|
| [[json_annotation]] | عادي | الـ annotations زي [[@JsonKey]] |
| [[freezed_annotation]] | عادي | [[@freezed]] و [[@Default]] |
| [[build_runner]] | [[dev:]] | الأداة اللي بتشغّل المولّدات |
| [[json_serializable]] | [[dev:]] | مولّد fromJson و toJson |
| [[freezed]] | [[dev:]] | مولّد copyWith و == و toString |

[[dev:]] معناها dev_dependency: محتاجها وانت بتطوّر بس، ومبتدخلش في التطبيق اللي بيتبني. الـ annotations لازم تبقى عادية لأن الكود بتاعك بيعمل لها import.

---

## ٢. الـ import والـ parts

~~~dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'todo.freezed.dart';
part 'todo.g.dart';
~~~

- [[freezed_annotation]] بيعمل re-export لـ json_annotation، فـ import واحد كفاية لـ [[@JsonKey]] كمان.
- [[part 'x.dart';]] معناها «الملف ده حتة من الملف بتاعي»: نفس الـ library، فيشوف الحاجات الـ private (اللي بتبدأ بـ [[_]]) والعكس. الملفين دول **مش موجودين لسه**، build_runner هيعملهم.
- اسم الـ part لازم يطابق اسم ملفك: [[todo.dart]] → [[todo.freezed.dart]] و [[todo.g.dart]].

---

## ٣. تعريف الموديل

~~~dart
@freezed
abstract class Todo with _$Todo {
~~~

- [[@freezed]] annotation (علامة) بتقول لـ freezed «ولّد للـ class ده».
- [[abstract class]]: الـ class ده مجرد تعريف، والـ class الحقيقي هيتولّد. جربت أشيل [[abstract]]:

~~~text flutter analyze
error • Missing concrete implementations of '_$Todo.toJson', 'getter _$Todo.done', 'getter _$Todo.dueAt', 'getter _$Todo.id', and 1 more. Try implementing the missing methods, or make the class abstract • non_abstract_class_inherits_abstract_member
~~~

- [[with _$Todo]] **mixin** متولّد في todo.freezed.dart، فيه الـ getters و copyWith و == و toString. [[$]] جزء عادي من الاسم.

~~~dart
  const factory Todo({
    required int id,
    required String title,
    @JsonKey(name: 'completed') @Default(false) bool done,
    @JsonKey(name: 'due_at') DateTime? dueAt,
  }) = _Todo;
~~~

- الـ parameters دي **هي** تعريف الـ fields.
- [[@JsonKey(name: 'completed')]] اسمه في JSON مختلف عن اسمه في Dart.
- [[@Default(false)]] قيمة افتراضية في الـ constructor وفي fromJson لو المفتاح مش موجود.
- [[= _Todo;]] اسمه **redirecting constructor**: [[Todo(...)]] بيعمل في الحقيقة object من [[_Todo]]، الـ class المتولّد.

~~~dart
  factory Todo.fromJson(Map<String, dynamic> json) => _$TodoFromJson(json);
}
~~~

fromJson بتنادي دالة هتتولّد في todo.g.dart. و toJson مش محتاج تكتبه: freezed بيضيفه لوحده لما يلاقي fromJson.

---

## ٤. التوليد

~~~bash
dart run build_runner build
~~~

~~~text الناتج (آخر سطر)
Built with build_runner/aot in 45s; wrote 3 outputs.
~~~

- [[build]] يولّد مرة ويخرج. أول مرة بطيئة (45 ثانية هنا) لأنه بيحلل المشروع كله، والمرات اللي بعدها ثانية.
- [[watch]] بيفضل شغال ويولّد تاني مع كل حفظ. سيبه في ترمنال لوحده وانت شغال.

### اللي اتولّد في [[todo.g.dart]] (٢٣ سطر)

~~~dart
_Todo _$TodoFromJson(Map<String, dynamic> json) => _Todo(
  id: (json['id'] as num).toInt(),
  title: json['title'] as String,
  done: json['completed'] as bool? ?? false,
  dueAt: json['due_at'] == null
      ? null
      : DateTime.parse(json['due_at'] as String),
);

Map<String, dynamic> _$TodoToJson(_Todo instance) => <String, dynamic>{
  'id': instance.id,
  'title': instance.title,
  'completed': instance.done,
  'due_at': instance.dueAt?.toIso8601String(),
};
~~~

تقريبًا نفس اللي كتبناه بإيدنا في الدرس اللي فات، بـ ٣ فروق:
- [[(json['id'] as num).toInt()]]: بيقبل [[30]] و [[30.0]] الاتنين.
- بيستخدم [[as]] مش patterns، فالنوع الغلط بيرمي [[TypeError]] (تحت).
- و [['due_at']] بيتكتب حتى لو null (عكس [[?dueAt]] بتاعنا).

و [[todo.freezed.dart]] (٢٨٧ سطر) فيه [[mixin _$Todo]] و [[class _Todo implements Todo]] و [[copyWith]] و [[operator ==]] و [[hashCode]] (بـ [[Object.hash(runtimeType,id,title,done,dueAt)]]) و [[toString]]. أول سطر فيهم: [[// GENERATED CODE - DO NOT MODIFY BY HAND]]، يعني أي تعديل بإيدك هيتمسح في أول build.

---

## ٥. «جرّب»: اللي اتجرّب

~~~dart
print(Todo(id: 1, title: 'a') == Todo(id: 1, title: 'a'));
final t = Todo.fromJson({'id': 2, 'title': 'call mom', 'due_at': '2026-10-01T09:00:00Z'});
print(t);
print(t.copyWith(dueAt: null));
print(t.toJson());
print(Todo.fromJson({'id': 1, 'title': 'x'}).done);
~~~

~~~text flutter test
true
Todo(id: 2, title: call mom, done: false, dueAt: 2026-10-01 09:00:00.000Z)
Todo(id: 2, title: call mom, done: false, dueAt: null)
{id: 2, title: call mom, completed: false, due_at: 2026-10-01T09:00:00.000Z}
false
~~~

| السطر | ليه |
|---|---|
| [[true]] | [[==]] المتولّد بيقارن القيم، عكس الـ class العادي اللي طلّع false في الدرس اللي فات |
| [[Todo(id: 2, ...)]] | toString المتولّد بيكتب كل الـ fields |
| [[dueAt: null]] | [[copyWith(dueAt: null)]] **مسح** التاريخ فعلًا. freezed بيفرّق بين «مبعتش dueAt» و«بعته null»، والـ copyWith اليدوي مبيعرفش |
| [[completed]] و [[due_at]] | toJson بأسماء السيرفر |
| [[false]] | completed مش موجود فـ [[@Default(false)]] اشتغل |

### id نص

~~~dart
Todo.fromJson({'id': '3', 'title': 'x'});
~~~

~~~text flutter test
_TypeError: type 'String' is not a subtype of type 'num' in type cast
~~~

من [[json['id'] as num]] في الكود المتولّد. ده **TypeError مش FormatException**، فلو بتمسك [[on FormatException]] بس هيفوتك. امسكه عند حدود الـ API وحوّله لرسالة واضحة.

### نسيت تشغّل build_runner

ضفت [[@Default([]) List<String> tags,]] للموديل من غير ما أولّد تاني، واستخدمت [[todo.tags]]:

~~~text flutter analyze
error • The redirected constructor '_Todo Function({bool done, DateTime? dueAt, required int id, required String title})' has incompatible parameters with 'Todo Function({bool done, DateTime? dueAt, required int id, List<String> tags, required String title})' • redirect_to_invalid_function_type
error • The getter 'tags' isn't defined for the type 'Todo' • undefined_getter
~~~

[[_Todo]] القديم مفيهوش tags. [[dart run build_runner build]] تاني وبيتحل.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[part 'todo.freezed.dart';]] | الملف المتولّد جزء من ملفك، والاسم لازم يطابق |
| [[@freezed abstract class Todo with _$Todo]] | التعريف، و abstract لازم |
| [[const factory Todo({...}) = _Todo;]] | الـ fields، والـ class الحقيقي متولّد |
| [[@JsonKey(name:)]] / [[@Default()]] | اسم JSON مختلف / قيمة افتراضية |
| [[dart run build_runner build]] / [[watch]] | ولّد مرة / ولّد مع كل حفظ |

- أي تعديل في الـ fields = شغّل build_runner تاني.
- متعدّلش في [[.g.dart]] و [[.freezed.dart]] بإيدك.
- النوع الغلط في fromJson المتولّد بيرمي [[TypeError]] مش [[FormatException]].`,
          lines: [
            "import الـ annotations (freezed بيعمل re-export لـ json_annotation).",
            "الملف اللي freezed هيولّده (copyWith و == و toString).",
            "الملف اللي json_serializable هيولّده (fromJson و toJson).",
            "[[@freezed]]: ولّد لي الـ class ده.",
            "abstract و mixin من الملف المتولّد.",
            "الـ constructor هو تعريف الـ fields.",
            "إجباري.",
            "إجباري.",
            "اسمه completed في JSON، وافتراضيًا false.",
            "اسمه due_at في JSON، و DateTime بيتحوّل لوحده.",
            "[[_Todo]] الـ class الحقيقي المتولّد.",
            "fromJson بتنادي الدالة المتولّدة، و toJson بيتولّد لوحده.",
            "قفلة."
          ],
          sol: R`بعد [[dart run build_runner build]] هتلاقي [[todo.freezed.dart]] فيه [[copyWith]] و [[operator ==]] و [[hashCode]] و [[toString]]، و [[todo.g.dart]] فيه [[_$TodoFromJson]] و [[_$TodoToJson]] بالأسماء [['completed']] و [['due_at']].

[[Todo(id: 1, title: 'a') == Todo(id: 1, title: 'a')]] بترجّع true (مقارنة بالقيم). و [[copyWith(dueAt: null)]] بيطبع [[Todo(id: ..., dueAt: null)]]: التاريخ اتمسح فعلًا.

fromJson بـ id نص: [[_TypeError]] ورسالته [[type 'String' is not a subtype of type 'num' in type cast]]. مش FormatException، فلو بتمسك [[on FormatException]] بس هتفوتك.`
        },
        {
          cmd: "FutureBuilder",
          title: "تعرض loading لحد ما البيانات توصل وبعدين تعرضها",
          desc: R`[[FutureBuilder]] widget بياخد [[future]] ودالة [[builder]] بتتنادى كل ما حالة الـ Future تتغير: وهو شغال، ولما يخلص بنتيجة، ولما يفشل. و [[snapshot]] فيه [[connectionState]] و [[data]] و [[error]].

القاعدة الأهم: الـ Future بيتعمل مرة واحدة ويتخزّن في الـ State (في initState أو [[late]] field)، مش جوه build. لو كتبت [[future: fetchNames()]] جوه build، كل rebuild هيبعت طلب جديد.`,
          example: R`import 'package:flutter/material.dart';

Future<List<String>> fetchNames() async {
  await Future.delayed(const Duration(seconds: 1));
  return ['Ali', 'Sara'];
}

class NamesScreen extends StatefulWidget {
  const NamesScreen({super.key});
  @override
  State<NamesScreen> createState() => _NamesScreenState();
}

class _NamesScreenState extends State<NamesScreen> {
  late Future<List<String>> _future = fetchNames();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<String>>(
      future: _future,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return TextButton(
            onPressed: () => setState(() { _future = fetchNames(); }),
            child: Text('Error: $__{snapshot.error}. Tap to retry'),
          );
        }
        final names = snapshot.data!;
        if (names.isEmpty) return const Center(child: Text('No names yet'));
        return ListView(children: [for (final n in names) ListTile(title: Text(n))]);
      },
    );
  }
}`,
          try: "حط [[debugPrint('fetch')]] في أول fetchNames. انقل [[fetchNames()]] من الـ field لجوه build مباشرة ([[future: fetchNames()]])، وضيف زرار بيعمل [[setState(() {})]]: دوس عليه كام مرة وعدّ الـ fetch. رجّعه، وخلي fetchNames ترمي [[Exception('offline')]] وجرّب زرار retry.",
          flag: "script",
          deep: {
            why: "أول ما شاشة تفتح وتطلب بيانات، فيه ٣ حالات لازم تتعرض: بيحمّل، ووصل، وفشل. FutureBuilder بيدّيك ده من غير ما تعمل متغيرات [[_loading]] و [[_error]] و [[_data]] بإيدك وتنسى تصفّر واحد فيهم.",
            how: R`الـ connectionState: [[none]] (مفيش future)، و [[waiting]] (شغال)، و [[done]] (خلص بنتيجة أو بخطأ). و [[active]] دي للـ Streams بس (StreamBuilder).

[[hasData]] و [[hasError]] بيقولوا الـ Future خلص بإيه. لاحظ إن لما تبدّل الـ future بواحد جديد (retry)، الـ snapshot بيرجع waiting بس [[data]] ممكن تفضل فيها النتيجة القديمة لحد ما الجديدة توصل. فالترتيب في المثال (connectionState الأول) بيعرض loader في الـ retry.

ليه مش جوه build: build بتتنادى كتير (setState في الأب، تغيير الثيم، الكيبورد فتح وغيّر MediaQuery). كل مرة [[fetchNames()]] بيعمل Future جديد، و FutureBuilder بيشوف future مختلف فيبدأ من الأول: طلب شبكة جديد، و loader يظهر ويختفي. عشان كده [[late Future<...> _future = fetchNames();]] في الـ State: [[late]] بيأجل التنفيذ لأول قراية، ودا بيحصل مرة واحدة.

والـ retry: [[setState(() { _future = fetchNames(); })]] بيحط future جديد فـ FutureBuilder يبدأ من الأول. والأقواس [[{ }]] مهمة: [[setState(() => _future = fetchNames())]] بالسهم بترجّع الـ Future نفسه (قيمة الـ assignment)، و Flutter في debug بيرمي [[setState() callback argument returned a Future]].

initState مينفعش تبقى async (درس initState و dispose)، ودا بالظبط ليه FutureBuilder موجود: بتبدأ العملية في initState وتسيب الـ widget يعرض الحالة.

الحدود: مفيش cache (الشاشة تتقفل وتتفتح = طلب جديد)، ومفيش refresh من شاشة تانية، ومفيش مشاركة للبيانات بين شاشتين. لما تحتاج أي حاجة من دول، Riverpod و AsyncNotifier (درس AsyncNotifier) بيحلّوها.`,
            when: "شاشة بسيطة بتحمّل حاجة مرة لما تفتح ومحدش تاني محتاجها: تفاصيل صفحة، أو إعدادات من السيرفر. ولأي حاجة أكبر: state management.",
            mistakes: R`[[future: api.fetch()]] جوه build (أشهر غلطة في Flutter). و [[snapshot.data!]] قبل ما تتأكد من الحالة فيضرب وهو لسه بيحمّل. ومتعرضش حالة الخطأ خالص فالـ loader يلف للأبد أو الشاشة تفضى. وتنسى حالة «فاضي»: اللستة رجعت [] فالشاشة بيضا والمستخدم فاكر إنها لسه بتحمّل.`
          },
          teach: R`## الكود بيعمل إيه؟

شاشة بتطلب لستة أسماء أول ما تفتح، وبتعرض واحدة من ٤ حالات: بيحمّل (دايرة بتلف)، أو خطأ بزرار retry، أو «مفيش أسماء»، أو اللستة. اتجرّب في Flutter 3.44 جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]: [[flutter analyze]] نضيف، و widget tests بتعدّ كام مرة fetchNames اتنادت، وبتستخدم [[tester.pump(const Duration(seconds: 1))]] عشان تقدّم الوقت ثانية من غير ما تستنى بجد.

---

## ١. الطلب الوهمي

~~~dart
Future<List<String>> fetchNames() async {
  await Future.delayed(const Duration(seconds: 1));
  return ['Ali', 'Sara'];
}
~~~

[[async]] دالة نتيجتها هتيجي بعدين، فنوعها [[Future<List<String>>]]. بتستنى ثانية (زي الشبكة) وترجّع اسمين. مكانها في تطبيق حقيقي [[http.get]] (درس http).

---

## ٢. الـ Future بيتعمل مرة واحدة

~~~dart
class NamesScreen extends StatefulWidget {
  const NamesScreen({super.key});
  @override
  State<NamesScreen> createState() => _NamesScreenState();
}

class _NamesScreenState extends State<NamesScreen> {
  late Future<List<String>> _future = fetchNames();
~~~

- [[StatefulWidget]] عشان نخزّن الـ Future في الـ State، وهو بيعيش طول ما الشاشة مفتوحة.
- [[late]] مع قيمة أولية = **lazy**: [[fetchNames()]] مبتتنادىش وقت إنشاء الـ State، بتتنادى **أول مرة حد يقرا [[_future]]** (أول build)، ومرة واحدة بس. وفي الحالتين (بـ late أو من غيره) الطلب بيتبعت مرة واحدة لكل State، و late بس بتأخّره لحد ما يتقري. لكن لو الطلب محتاج حاجة من [[widget]] (زي [[widget.id]]) لازم late أو initState، لأن الـ field العادي مينفعش يقرا [[widget]] وقت إنشاءه.

### اتجرّب: field مقابل جوه build

حطيت زرار بيعمل [[setState(() {})]] (rebuild من غير أي تغيير) ودوسته ٥ مرات:

~~~text flutter test
5 rebuilds fetches=1 loading=false
~~~

الطلب اتبعت **مرة واحدة**، والأسماء فضلت ظاهرة. وبعدين غيّرت [[future: _future]] لـ [[future: fetchNames()]] (جوه build مباشرة):

~~~text flutter test
in build: 5 rebuilds fetches=6 loading=true
~~~

٦ طلبات (واحد أول ما فتحت + واحد مع كل rebuild)، والشاشة رجعت للـ loader. كل build بيعمل Future **جديد**، و FutureBuilder لما يلاقي future مختلف بيبدأ من الأول. وفي تطبيق حقيقي build بتتنادى كتير: setState في الأب، والكيبورد يفتح، والثيم يتغير.

---

## ٣. [[FutureBuilder]]

~~~dart
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<String>>(
      future: _future,
      builder: (context, snapshot) {
~~~

- [[FutureBuilder<List<String>>]] نوع النتيجة بين [[< >]]، فـ [[snapshot.data]] نوعها [[List<String>?]].
- [[future:]] الـ Future اللي بيتابعه.
- [[builder:]] بيتنادى أول مرة، وتاني كل ما حالة الـ Future تتغير.
- [[snapshot]] (لقطة) = حالة الـ Future دلوقتي: [[connectionState]] و [[data]] و [[error]].

### الحالة ١: بيحمّل

~~~dart
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
~~~

| [[connectionState]] | معناها |
|---|---|
| [[none]] | مفيش future أصلًا |
| [[waiting]] | شغال |
| [[done]] | خلص (بنتيجة أو بخطأ) |
| [[active]] | للـ Streams بس (StreamBuilder) |

أي حاجة غير done: دايرة بتلف ([[CircularProgressIndicator]]) في النص ([[Center]]).

~~~text flutter test
t=0 loading=true
t=1s names=2 loading=false
~~~

### الحالة ٢: خطأ

~~~dart
        if (snapshot.hasError) {
          return TextButton(
            onPressed: () => setState(() { _future = fetchNames(); }),
            child: Text('Error: $__{snapshot.error}. Tap to retry'),
          );
        }
~~~

- [[hasError]] الـ Future خلص بـ exception، و [[snapshot.error]] هو الـ exception نفسه.
- الـ retry: [[_future = fetchNames()]] بيحط Future **جديد**، و setState بيعيد البناء، فـ FutureBuilder يشوف future مختلف ويبدأ من الأول.

خليت fetchNames ترمي [[Exception('offline')]]:

~~~text flutter test
error texts: [rebuild, Error: Exception: offline. Tap to retry]
retry: fetches=2 loading=true
after retry ok: Ali=1
~~~

[[Exception: offline]] ده toString بتاع [[Exception('offline')]]. دوست retry: طلب تاني والـ loader رجع، ولما رجّعت الدالة سليمة الأسماء ظهرت.

### ليه [[{ }]] مش [[=>]] جوه setState؟

المثال كان مكتوب [[setState(() => _future = fetchNames())]]. لما دوست retry في الاختبار:

~~~text flutter test
The following assertion was thrown while handling a gesture:
setState() callback argument returned a Future.
The setState() method on _NamesScreenState#6aaeb was called with a closure or method that returned a
Future. Maybe it is marked as "async".
~~~

- السهم [[=>]] معناه «رجّع القيمة دي». والـ assignment في Dart ليه قيمة: [[_future = fetchNames()]] قيمته الـ Future نفسه. فالـ closure رجّع Future.
- Flutter بيرفض ده في debug عشان يحميك من [[setState(() async {...})]] (شغل async جوه setState). و [[flutter analyze]] مقالش حاجة، الغلطة بتظهر بس لما تدوس.
- بالأقواس [[{ _future = fetchNames(); }]] الـ closure مبيرجّعش حاجة. اتصلّح في المثال.

### الحالة ٣ و ٤: فاضي أو بيانات

~~~dart
        final names = snapshot.data!;
        if (names.isEmpty) return const Center(child: Text('No names yet'));
        return ListView(children: [for (final n in names) ListTile(title: Text(n))]);
      },
    );
  }
}
~~~

- [[snapshot.data!]]: هنا متأكدين إن فيه data (خلص ومفيش error)، فالـ [[!]] آمنة. لو حطيتها قبل فحص الحالة هتضرب وهو لسه بيحمّل.
- [[isEmpty]]: الطلب نجح بس اللستة فاضية. من غير الحالة دي الشاشة تبقى بيضا والمستخدم يفتكرها لسه بتحمّل. خليت fetchNames ترجّع [[[]]]:

~~~text flutter test
empty: 1
~~~

- [[ListView(children: [for ...])]] هنا مقبول لأن اللستة صغيرة (درس ListView.builder للستات الكبيرة).

---

## الخلاصة

| الحالة | الشرط | العرض |
|---|---|---|
| بيحمّل | [[connectionState != done]] | [[CircularProgressIndicator]] |
| خطأ | [[hasError]] | الرسالة + retry |
| فاضي | [[data!.isEmpty]] | «No names yet» |
| بيانات | الباقي | اللستة |

- الـ Future في field ([[late ... = fetchNames()]] أو initState)، **مش** [[future: fetchNames()]] جوه build.
- الـ retry = Future جديد جوه [[setState(() { ... })]] بأقواس، و [[setState(() {})]] الفاضية مش بتعمل حاجة لأن الـ future هو هو.
- الترتيب: connectionState الأول، وبعدين error، وبعدين data.`,
          lines: [
            "مكتبة Material.",
            "دالة async بتقلّد طلب API.",
            "ثانية.",
            "النتيجة.",
            "قفلة.",
            "StatefulWidget عشان نخزّن الـ Future.",
            "constructor.",
            "بتعيد تعريف createState.",
            "الـ State.",
            "قفلة.",
            "الـ State.",
            "الـ Future بيتعمل مرة واحدة أول ما يتقري، مش مع كل build.",
            "بتعيد تعريف build.",
            "build.",
            "FutureBuilder بنوع النتيجة.",
            "الـ Future المتخزّن.",
            "بيتنادى مع كل تغيير في الحالة.",
            "لسه مخلصش (أو بيعيد بعد retry).",
            "loader.",
            "قفلة.",
            "خلص بخطأ.",
            "زرار retry.",
            "future جديد فالـ FutureBuilder يبدأ من الأول.",
            "رسالة الخطأ.",
            "قفلة.",
            "قفلة الـ if.",
            "هنا متأكدين إن فيه data.",
            "حالة الفاضي.",
            "البيانات.",
            "قفلة الـ builder.",
            "قفلة FutureBuilder.",
            "قفلة build.",
            "قفلة الـ State."
          ],
          sol: R`لما [[fetchNames()]] جوه build: كل ضغطة على الزرار بتطبع [[fetch]] تاني والـ loader يظهر ثانية. ٥ ضغطات = ٥ طلبات. ورجّعه للـ field: [[fetch]] بتتطبع مرة واحدة مهما دوست.

مع [[throw Exception('offline')]]: بعد ثانية بيظهر [[Error: Exception: offline. Tap to retry]]. الضغط عليه بيطبع fetch تاني، ويعرض loader ثانية، ويرجع نفس الخطأ (لأن الدالة لسه بترمي). لو رجّعتها سليمة وعملت hot reload ثم retry، الأسماء بتظهر.

الغلط الشائع: تعمل retry بـ [[setState(() {})]] فاضية. مفيش حاجة هتحصل، لأن الـ future نفسه متغيرش.`
        }
      ]
    }
]);
