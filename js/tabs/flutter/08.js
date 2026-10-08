// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
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
    }
]);
