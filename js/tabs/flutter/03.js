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

مع [[ListView(children: [...])]]: الـ debugPrint في itemBuilder مش موجود أصلًا، بس الـ 10000 ListTile اتعملوا كـ objects في build قبل أول frame، وهتحس بتأخير في فتح الشاشة (في debug واضح جدًا). ولو حطيت print جوه الـ for هتلاقيه طبع ١٠ آلاف سطر مرة واحدة.

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

على الويب لاحظ إن الـ URL في المتصفح بيتغير مع كل تنقل، وزرار back بتاع المتصفح بيشتغل.`
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
          sol: R`لما تفتح [[/orders]] من غير login، الـ URL بيبقى [[/login?from=%2Forders]] (الـ [[/]] اتعمله encode لـ [[%2F]]) والشاشة login. لما الزرار يغيّر session، الـ router بيسمع (refreshListenable) ويشغّل redirect تاني: loggedIn بقت true و atLogin true، فيرجّعك لـ [[/orders]] من غير ما تكتب أي navigation في شاشة login.

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
            onPressed: () => setState(() => _future = fetchNames()),
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

والـ retry: [[setState(() => _future = fetchNames())]] بيحط future جديد فـ FutureBuilder يبدأ من الأول.

initState مينفعش تبقى async (درس initState و dispose)، ودا بالظبط ليه FutureBuilder موجود: بتبدأ العملية في initState وتسيب الـ widget يعرض الحالة.

الحدود: مفيش cache (الشاشة تتقفل وتتفتح = طلب جديد)، ومفيش refresh من شاشة تانية، ومفيش مشاركة للبيانات بين شاشتين. لما تحتاج أي حاجة من دول، Riverpod و AsyncNotifier (درس AsyncNotifier) بيحلّوها.`,
            when: "شاشة بسيطة بتحمّل حاجة مرة لما تفتح ومحدش تاني محتاجها: تفاصيل صفحة، أو إعدادات من السيرفر. ولأي حاجة أكبر: state management.",
            mistakes: R`[[future: api.fetch()]] جوه build (أشهر غلطة في Flutter). و [[snapshot.data!]] قبل ما تتأكد من الحالة فيضرب وهو لسه بيحمّل. ومتعرضش حالة الخطأ خالص فالـ loader يلف للأبد أو الشاشة تفضى. وتنسى حالة «فاضي»: اللستة رجعت [] فالشاشة بيضا والمستخدم فاكر إنها لسه بتحمّل.`
          },
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
