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
    }
]);
