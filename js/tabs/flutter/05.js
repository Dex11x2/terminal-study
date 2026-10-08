// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
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
    }
]);
