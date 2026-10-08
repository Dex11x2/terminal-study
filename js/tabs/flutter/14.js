// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "الأداء",
      l: 3,
      n: "تقيس على موبايل حقيقي في profile mode، وتقلل الـ rebuilds بـ const وتقسيم الـ widgets، وتلاقي الـ jank في DevTools",
      items: [
        {
          cmd: "DevTools",
          title: "تعرف الشاشة بتقطّع ليه بدل ما تخمّن",
          desc: R`Flutter DevTools أداة في المتصفح بتتوصل بالتطبيق الشغال: Performance (كل frame أخد قد إيه وليه)، و Widget inspector (الشجرة وأحجام كل حاجة)، و CPU profiler، و Memory، و Network (كل الطلبات)، و Logging.

بتفتحها بـ [[v]] في ترمنال [[flutter run]]، أو من VS Code. والقياس الحقيقي للأداء يبقى في [[--profile]] على موبايل حقيقي، مش debug ومش emulator.`,
          example: R`flutter run --profile -d <device-id>
v        في ترمنال flutter run: افتح DevTools في المتصفح
P        شغّل/اقفل performance overlay (خطين: UI و raster)
w        اطبع شجرة الـ widgets (debugDumpApp)
t        اطبع شجرة الـ render objects
dart devtools`,
          try: "شغّل تطبيقك بـ [[--profile]] على موبايل حقيقي، وافتح DevTools ← Performance، واعمل scroll سريع في أطول لستة. دوّر على frames حمرا. اضغط على واحدة وشوف في Frame analysis أنهي thread اتأخر (UI ولا Raster). وبعدين فعّل «Track widget rebuilds» واعمل حاجة بسيطة (تدوس زرار) وشوف أنهي widgets اتبنت.",
          flag: "keys",
          deep: {
            why: "«التطبيق تقيل» مش معلومة تقدر تصلّحها. DevTools بيقولك إن frame رقم كذا أخد ٤٠ms، و٣٠ منهم في build بتاع ProductCard لأنه بيعمل parse للتاريخ ١٠٠ مرة. من غير قياس هتقضي يوم تعدّل حاجات مش هي المشكلة.",
            how: R`عشان ٦٠ frame في الثانية، كل frame عنده حوالي 16ms (و 8ms على شاشات 120Hz). Flutter بيشتغل على threadين أساسيين:
- UI thread: كود Dart بتاعك (build و layout). لو اتأخر: rebuilds كتير، أو شغل تقيل في build، أو parse JSON كبير على الـ main isolate.
- Raster thread: بيرسم على الـ GPU. لو اتأخر: effects تقيلة (blur، shadows كتير، [[saveLayer]] من Opacity على شجرة كبيرة، clip)، أو صور كبيرة أكبر من مكانها.

الـ performance overlay (P): عمودين، أي خط أحمر يعني frame فات الوقت، وتعرف من أنهي عمود مين المتأخر.

ليه profile مش debug: debug فيه JIT و assertions وأدوات، فممكن يبقى أبطأ عدة مرات. profile نفس release تقريبًا (AOT) بس سايب أدوات القياس. والـ emulator بيستخدم GPU الكمبيوتر فالأرقام ملهاش علاقة بموبايل رخيص.

Widget rebuild stats في Performance أو Flutter Inspector: بتعد كل widget اتبنى كام مرة. لو widget مبيتغيرش بيتبني مع كل frame، دا مكان const أو تقسيم (الدرس الجاي).

Memory: الـ leaks (controllers مش متقفلة، listeners) بتظهر كـ objects بتزيد ومش بتقل. و «Diff snapshots» بين قبل وبعد فتح وقفل شاشة.

Network tab: كل طلب http بالـ headers والـ body والوقت، مفيد جدًا مع الـ API client.

وفي الكود: [[debugPrintRebuildDirtyWidgets = true]] بيطبع كل rebuild في الـ console (debug بس)، و [[Timeline.startSync]] لو عايز تعلّم حتة كود بتاعك في الـ timeline.`,
            when: "لما تحس بتقطيع، وقبل كل release على أضعف موبايل عندك، ولما تلاقي البطارية أو الذاكرة بتزيد. ومش وانت بتكتب أول نسخة من الشاشة: الأول تشتغل، وبعدين تقيس.",
            mistakes: R`تقيس في debug أو على emulator وتحكم. وتعمل «تحسينات» (const في كل حتة، caching) من غير ما تقيس قبل وبعد. وتفتكر إن كل frame أحمر سببه build، وهو ممكن يبقى raster من shadow أو blur. وتسيب [[debugPrintRebuildDirtyWidgets]] شغال وتنسى.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

السطر الأول بيشغّل التطبيق في وضع القياس، والـ ٤ سطور اللي بعده **مش أوامر ترمنال**: دي حروف بتدوسها في نفس الترمنال وهو [[flutter run]] شغال، وكل حرف بيطلب حاجة من التطبيق. وآخر سطر بيفتح DevTools لوحده.

DevTools نفسه (الـ Performance والـ frames الحمرا) واجهة رسومية محتاجة موبايل حقيقي، فالشرح ده من docs Flutter. اللي اتشغّل بجد في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0، DevTools 2.57.0): [[dart devtools]]، و [[flutter run --profile]] على web-server، والشجر اللي [[w]] و [[t]] بيطبعوه (من widget test بيندَه نفس الدوال).

---

## ١. [[flutter run --profile -d <device-id>]]

- [[--profile]]: واحد من ٣ أوضاع بناء. [[flutter run -h]] بيقول:

~~~text الناتج
    --debug      Build a debug version of your app (default mode).
    --profile    Build a version of your app specialized for performance profiling.
    --release    Build a release version of your app.
~~~

| الوضع | الكود | hot reload | أدوات القياس | تستخدمه في |
|---|---|---|---|---|
| debug | JIT + assertions | ✓ | ✓ بس الأرقام غلط | التطوير |
| profile | AOT زي release | ✗ | ✓ | قياس الأداء |
| release | AOT | ✗ | ✗ | المستخدمين |

JIT = Just In Time (بيترجم وهو شغال، عشان hot reload)، و AOT = Ahead Of Time (مترجم قبلها، أسرع). فالـ debug ممكن يبقى أبطأ عدة مرات، وأي قياس فيه مضلل.

- [[-d <device-id>]]: على أنهي جهاز. [[< >]] معناها «حط هنا قيمتك» (مش بتتكتب). [[flutter devices]] بيطلّع الـ ids.

جرّبته على الويب ([[-d web-server]]) عشان مفيش موبايل في الـ container:

~~~text flutter run --profile -d web-server --web-port 5997
Launching lib/main.dart on Web Server in profile mode...
Compiling lib/main.dart for the Web...                             25.6s
✓ Built build/web
lib/main.dart is being served at http://localhost:5997
~~~

[[in profile mode]]، و [[Compiling ... for the Web]] زي الـ release بالظبط (مش الـ DDC بتاع debug). والـ device id هنا [[web-server]]. على موبايل حقيقي بيبقى حاجة زي الرقم التسلسلي بتاعه. والـ emulator لأ: بيستخدم GPU الكمبيوتر فالأرقام ملهاش علاقة بموبايل حقيقي.

---

## ٢. الحروف جوه [[flutter run]]

| الحرف | بيعمل إيه |
|---|---|
| [[v]] | يفتح DevTools في المتصفح متوصّل بالتطبيق ده |
| [[P]] | (كابيتال) يظهر/يخفي الـ performance overlay: رسمين فوق التطبيق، الفوقاني للـ raster thread والتحتاني للـ UI thread، وأي عمود أحمر frame اتأخر |
| [[w]] | يطبع شجرة الـ widgets (بينده [[debugDumpApp()]]) |
| [[t]] | يطبع شجرة الـ render objects ([[debugDumpRenderTree()]]) |

الفرق بين [[p]] الصغيرة و [[P]] الكبيرة: الصغيرة بتعرض خطوط الـ layout (حدود كل widget)، والكبيرة الـ overlay بتاع الأداء.

### [[w]] بيطبع إيه

ناديت [[debugDumpApp()]] من widget test على [[MaterialApp(home: Center(child: Inspect()))]] (الـ widget اللي في درس «widget و element و render»):

~~~text الناتج (أول سطور وآخر سطور)
[root]
└View(state: _ViewState#24469)
  ...
      └Center(alignment: Alignment.center, dependencies: [Directionality], renderObject: RenderPositionedBox#35cc0)
       └Inspect
        └Padding(padding: EdgeInsets.all(8.0), dependencies: [Directionality], renderObject: RenderPadding#06c1a relayoutBoundary=up1)
         └Text("hi", dependencies: [DefaultSelectionStyle, DefaultTextStyle, MediaQuery])
          └RichText(... text: "hi", ... renderObject: RenderParagraph#ba9c7 relayoutBoundary=up2)
~~~

١٥٥ سطر لـ ٣ widgets كتبتهم انت: الباقي MaterialApp. وكل سطر بيقول الـ widget وإعداداته، و [[renderObject:]] لو ليه واحد.

### [[t]] بيطبع إيه

~~~text الناتج (جزء)
└─child: RenderPadding#06c1a relayoutBoundary=up1
  │ creator: Padding ← Inspect ← Center ← Semantics ← Builder ← ...
  │ parentData: offset=Offset(344.0, 268.0) (can use size)
  │ constraints: BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)
  │ size: Size(112.0, 64.0)
  │ padding: EdgeInsets.all(8.0)
~~~

هنا الأرقام الحقيقية بعد الـ layout: [[constraints]] (أقصى وأقل حجم مسموح من الأب)، و [[size]] (الحجم اللي اختاره)، و [[offset]] (مكانه جوه الأب). مفيد لما حاجة طالعة بحجم مش متوقع.

---

## ٣. [[dart devtools]]

بيشغّل سيرفر DevTools من غير ما يكون فيه تطبيق شغال (تقدر تلزق فيه رابط VM service بعدين، أو تفتح ملف حجم من [[--analyze-size]]):

~~~text الناتج
Unable to launch Chrome: ProcessException: No such file or directory
  Command: google-chrome http://127.0.0.1:9100?

Serving DevTools at http://127.0.0.1:9100.
~~~

حاول يفتح Chrome لوحده وملقاهوش في الـ container، بس السيرفر اشتغل على port [[9100]]. على جهازك المتصفح هيفتح على طول.

---

## ٤. جوه DevTools (من الـ docs)

| التاب | بيوريك إيه | بتدوّر على إيه |
|---|---|---|
| Performance | كل frame ووقته، والأحمر اللي عدّى الـ budget | frame أحمر ← UI ولا Raster؟ |
| Inspector | الشجرة وأحجام كل widget، و Track widget rebuilds | widgets بتتبني كتير |
| CPU profiler | الدوال اللي واكلة الوقت | دالة بتاعتك في الأول |
| Memory | الـ objects في الذاكرة و diff بين snapshots | حاجة بتزيد ومبتقلّش (leak) |
| Network | كل طلب http | طلبات مكررة أو بطيئة |

الـ budget: ٦٠ frame في الثانية يعني ١٠٠٠ ÷ ٦٠ = ١٦.٧ مللي ثانية لكل frame، وعلى شاشة 120Hz النص (٨.٣).

---

## الخلاصة

- القياس في [[--profile]] على موبايل حقيقي، مش debug ومش emulator.
- [[v]] و [[P]] و [[w]] و [[t]] حروف جوه [[flutter run]]، مش أوامر.
- [[w]] شجرة الـ widgets وإعداداتها، و [[t]] الـ render objects بأحجامها الحقيقية.
- frame أحمر: شوف الأول هو UI (كودك في build) ولا Raster (الرسم) قبل ما تغيّر حاجة.`,
          sol: R`في Performance، الـ frames الحمرا هي اللي عدّت الـ budget. لو العمود الأحمر UI: شوف الـ timeline (build و layout)، وغالبًا هتلاقي widget تقيل بيتبني كتير أو شغل حسابي في build. لو Raster: شوف لو فيه [[Opacity]] أو [[BackdropFilter]] أو [[ClipRRect]] أو shadows كتير في عناصر اللستة، أو صور بتتحمّل بحجمها الكامل.

Track widget rebuilds بعد ضغطة زرار: المفروض تلاقي الـ widget اللي فيه الـ state وعياله بس. لو لقيت الشاشة كلها (AppBar و header و كل اللستة) اتبنت، يبقى الـ setState أو الـ ref.watch في مكان عالي أوي، ودا الدرس الجاي.

الغلط الشائع: تعمل ده على emulator وتلاقي كله أخضر وتقول «التطبيق سريع».`
        },
        {
          cmd: "const و rebuilds",
          title: "تخلي الـ rebuild يلمس الجزء اللي اتغير بس",
          desc: R`لما [[setState]] يتنادى، الـ widget ده وكل اللي تحته بيتعمله build. لو الـ state في أول الشاشة، الشاشة كلها بتتبني مع كل ضغطة. ٣ أدوات بتحل ده: [[const]] (Flutter بيتخطى أي widget const لأنه نفس الـ object)، وتقسيم الشاشة لـ widgets صغيرة والـ state في أصغر واحدة محتاجاها، و builders صغيرة زي [[ValueListenableBuilder]] بتعيد بناء حتتها بس.

والـ [[child]] parameter في الـ builders: الجزء اللي مبيتغيرش بتبعته مرة ويتعاد استخدامه.`,
          example: R`int headerBuilds = 0;

class Header extends StatelessWidget {
  const Header({super.key});
  @override
  Widget build(BuildContext context) {
    headerBuilds++;
    return const Text('Shop');
  }
}

class _CounterPageState extends State<CounterPage> {
  int _count = 0;
  final _likes = ValueNotifier<int>(0);

  @override
  void dispose() {
    _likes.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Header(),
        Text('count $_count'),
        TextButton(onPressed: () => setState(() => _count++), child: const Text('inc')),
        ValueListenableBuilder<int>(
          valueListenable: _likes,
          builder: (context, likes, child) => Row(children: [child!, Text('$likes')]),
          child: const Icon(Icons.favorite),
        ),
        TextButton(onPressed: () => _likes.value++, child: const Text('like')),
      ],
    );
  }
}`,
          try: "اطبع [[headerBuilds]] بعد ٥ ضغطات على inc. وبعدين شيل [[const]] من قبل [[Header()]] وكرر. وبعدين ضيف [[debugPrint('page build')]] في build بتاع الصفحة، واضغط like ٥ مرات: كام مرة اتطبع؟",
          flag: "script",
          deep: {
            why: "معظم مشاكل الأداء في Flutter مش إن الـ build بطيء، إنه بيحصل لحاجات كتير ملهاش لازمة. شاشة فيها لستة ١٠٠ عنصر وعدّاد فوق: لو الـ setState على الشاشة كلها، كل ضغطة بتبني ١٠٠ عنصر. نقل الـ state لتحت أو const بيخلي التكلفة widget واحد.",
            how: R`ليه const بيشتغل: وقت الـ rebuild، الـ element بيقارن الـ widget الجديد بالقديم. لو هو نفس الـ object بالظبط ([[identical]])، Flutter مش بينادي build عليه ولا على اللي تحته. و [[const Header()]] بيرجّع نفس الـ object في كل مرة (canonicalized)، فالـ Header اتبنى مرة واحدة مهما الأب اتبنى. من غير const، كل build للأب بيعمل Header جديد، فيتعمله build.

الـ lints: [[prefer_const_constructors]] و [[prefer_const_literals_to_create_immutables]] بيقولولك فين تحط const، و [[dart fix --apply]] بيحطها لوحده. بس دول اتشالوا من [[flutter_lints]] من نسخة 5، فلازم تفعّلهم بنفسك في [[analysis_options.yaml]] تحت [[linter:]] ثم [[rules:]].

تقسيم الـ widgets: بدل [[Widget _buildHeader()]] (دالة بتتنادى مع كل build للأب)، اعمل [[class Header extends StatelessWidget]]: ليه element خاص، فيقدر يبقى const ويتخطى.

نقل الـ state لتحت: لو الـ counter بس هو اللي بيتغير، اعمل [[CounterText]] StatefulWidget صغير فيه الـ setState، والشاشة الكبيرة Stateless.

الـ builders الصغيرة: [[ValueListenableBuilder]] و [[ListenableBuilder]] و [[AnimatedBuilder]] و [[StreamBuilder]] و [[Consumer]] في Riverpod، كلهم بيعيدوا build للـ builder بتاعهم بس. و [[child]] بيتبني مرة بره ويتبعت جوه في كل مرة، فالأيقونة في المثال مش بتتبني مع كل like.

في Riverpod: [[ref.watch(p.select((s) => s.count))]] بدل الـ state كلها، و [[Consumer]] حوالين الحتة اللي محتاجاها بدل الشاشة كلها.

حاجات تانية بتفرق:
- الصور: [[Image.network(url, cacheWidth: 300)]] بيفك الصورة بالحجم اللي هيتعرض بدل ٤٠٠٠ بكسل.
- [[RepaintBoundary]] حوالين حاجة بتتحرك كتير (animation) عشان الرسم ميشملش اللي حواليها.
- [[Opacity]] على شجرة كبيرة مكلف، [[FadeTransition]] أو لون بـ alpha أخف.
- [[ListView.builder]] بدل children (درس ListView.builder).
- شغل تقيل بره build، و JSON كبير في [[Isolate.run]].`,
            when: "const دايمًا (فعّل [[prefer_const_constructors]] عشان الـ linter يفكّرك). والتقسيم ونقل الـ state لما DevTools يوريك rebuilds كتير، أو في شاشات فيها animation أو input سريع (كتابة، slider).",
            mistakes: R`تحط الـ state في أعلى الشاشة عشان «أسهل». ودوال [[_buildX()]] بدل widgets. وتفتكر إن const على widget فيه متغير ممكن: لو أي حاجة جواه مش const، الـ compiler هيرفض. وتعمل كل حاجة ValueNotifier وتعقّد الكود عشان توفّر rebuild رخيص: build لـ Text عادي رخيص جدًا، اشتغل على اللي DevTools بيقول إنه مكلف.`
          },
          teach: R`## الكود ده بيعمل إيه؟

شاشة فيها عدّاد بـ [[setState]] وعدّاد تاني (likes) في [[ValueNotifier]]، وفوقهم [[Header]] بيعدّ هو اتبنى كام مرة. الهدف تشوف بالأرقام مين بيتبني مع كل ضغطة.

الأرقام تحت حقيقية: كتبت [[CounterPage]] (الـ StatefulWidget اللي المثال بيفترضه) وزوّدت عدّاد [[pageBuilds]] جنب [[debugPrint('page build')]] بتاع الـ try، وكتبت widget test بيدوس inc ٥ مرات و like ٥ مرات، وشغّلته بـ [[flutter test]] في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0) مرة بـ [[const Header()]] ومرة من غيرها.

---

## ١. [[Header]] والعدّاد

~~~text الكود
int headerBuilds = 0;

class Header extends StatelessWidget {
  const Header({super.key});
  @override
  Widget build(BuildContext context) {
    headerBuilds++;
    return const Text('Shop');
  }
}
~~~

- [[int headerBuilds = 0;]]: متغير global (بره أي class)، للتجربة بس.
- [[const Header({super.key});]]: constructor بـ [[const]]. ده شرط عشان حد يقدر يكتب [[const Header()]]: كل حقول الـ widget لازم [[final]] وقيمها معروفة وقت الترجمة. و [[super.key]] بيبعت الـ key للأب ([[StatelessWidget]]).
- [[headerBuilds++]] جوه build: كل مرة Flutter ينادي build، العدّاد يزيد.

---

## ٢. الـ State: نوعين state

~~~text الكود
int _count = 0;
final _likes = ValueNotifier<int>(0);
~~~

- [[_count]]: رقم عادي. [[_]] في أول الاسم يعني private للملف ده.
- [[ValueNotifier<int>(0)]]: صندوق فيه قيمة [[int]] بتبدأ بـ ٠، وأي حد بيسمعله بيتبلّغ لما [[.value]] تتغير. [[<int>]] نوع القيمة اللي جواه.

~~~text الكود
@override
void dispose() {
  _likes.dispose();
  super.dispose();
}
~~~

الـ ValueNotifier ماسك لستة listeners، فلازم يتقفل لما الشاشة تتشال. و [[super.dispose()]] في الآخر (Flutter بيقفل حاجاته بعد ما انت تقفل حاجاتك).

---

## ٣. build: كل widget بيتعامل إزاي

| السطر | مين بيعيد بناءه |
|---|---|
| [[const Header()]] | ولا حد بعد أول مرة |
| [[Text('count $_count')]] | كل [[setState]] |
| [[TextButton(onPressed: () => setState(() => _count++), ...)]] | الضغطة دي بتعيد build الشاشة كلها |
| [[ValueListenableBuilder<int>(...)]] | الـ builder بس، لما [[_likes]] يتغير |
| [[TextButton(onPressed: () => _likes.value++, ...)]] | الضغطة دي مبتنادييش setState خالص |

### [[setState(() => _count++)]]

[[setState]] بتاخد دالة، تنفّذها (تزوّد العدّاد)، وبعدين تعلّم الـ element بتاع الشاشة إنه «dirty» (محتاج يتبني). في الـ frame الجاي build الشاشة يتنادى، وكل widget جواه بيتعمل من جديد، **إلا** اللي هو نفس الـ object.

### [[ValueListenableBuilder]]

~~~text الكود
ValueListenableBuilder<int>(
  valueListenable: _likes,
  builder: (context, likes, child) => Row(children: [child!, Text('$likes')]),
  child: const Icon(Icons.favorite),
),
~~~

- [[valueListenable: _likes]]: اسمع للصندوق ده.
- [[builder: (context, likes, child) => ...]]: دالة بتتنادى أول مرة ومع كل تغيير. [[likes]] القيمة الحالية، و [[child]] هو اللي اتبعت تحت.
- [[child!]]: [[!]] معناها «أنا متأكد إنه مش null» (لأن الـ parameter نوعه [[Widget?]]).
- [[child: const Icon(Icons.favorite)]]: الأيقونة بتتعمل مرة واحدة بره الـ builder وتتبعت له جاهزة، فمبتتعملش من جديد مع كل like.

---

## ٤. الأرقام

~~~text الناتج بـ const Header()
[const] after 5 inc: headerBuilds=1 pageBuilds=6
[const] after 5 like: headerBuilds=1 pageBuilds=6
~~~

~~~text الناتج من غير const
[noconst] after 5 inc: headerBuilds=6 pageBuilds=6
[noconst] after 5 like: headerBuilds=6 pageBuilds=6
~~~

نقرا:

- [[pageBuilds=6]] بعد ٥ inc: مرة أول ما الشاشة ظهرت + ٥ setState. و [[page build]] اتطبع ٦ مرات بالظبط.
- بـ const: [[headerBuilds=1]]. الشاشة اتبنت ٦ مرات، والـ Header مرة. وقت الـ rebuild الـ element بيقارن الـ widget الجديد بالقديم، ولو [[identical]] (نفس الـ object في الذاكرة) بيتخطاه هو واللي تحته. و [[const Header()]] بيرجّع نفس الـ object كل مرة.
- من غير const: [[headerBuilds=6]]. كل build للشاشة عمل [[Header()]] جديد، فاتبنى معاها.
- بعد ٥ like: [[pageBuilds]] لسه ٦ في الحالتين. الـ like مبيعملش setState، فالـ builder بس اللي اتبنى. والاختبار اتأكد إن الرقم [[5]] ظاهر جنب القلب.

---

## ٥. الـ linter يفكّرك

[[flutter analyze]] على النسخة اللي من غير const: [[No issues found!]]، لأن [[prefer_const_constructors]] مش في [[flutter_lints]] 6. لما فعّلته:

~~~text analysis_options.yaml
include: package:flutter_lints/flutter.yaml
linter:
  rules:
    prefer_const_constructors: true
~~~

~~~text flutter analyze
   info • Use 'const' with the constructor to improve performance. Try adding the 'const' keyword to the constructor invocation • lib/perf/noconst.dart:37:9 • prefer_const_constructors
~~~

و [[dart fix --apply]] حطها لوحده:

~~~text الناتج
noconst.dart
  prefer_const_constructors - 1 fix

1 fix made in 1 file.
~~~

---

## الخلاصة

| الأداة | بتوفّر إيه | في المثال |
|---|---|---|
| [[const]] | الـ widget ده وكل اللي تحته ميتبنوش مع الأب | [[headerBuilds]] ١ بدل ٦ |
| [[ValueNotifier]] + [[ValueListenableBuilder]] | التغيير يبني الـ builder بس | ٥ like والشاشة متبنتش |
| [[child]] في الـ builder | الجزء الثابت يتعمل مرة | الأيقونة |
| widget صغير فيه الـ state | الـ setState يلمس حتته بس | (الدرس بيشرحه في deep) |

- [[setState]] بيعيد build الـ widget اللي هو فيه وكل اللي تحته، إلا اللي const.
- [[prefer_const_constructors]] مش مفعّل في flutter_lints الحالي: فعّله بنفسك.
- قيس الأول (DevTools)، build لـ Text رخيص.`,
          lines: [
            "عدّاد لعدد مرات بناء الـ Header (للتجربة بس).",
            "widget ثابت.",
            "const constructor.",
            "بتعيد تعريف build.",
            "build.",
            "زوّد العدّاد.",
            "النص.",
            "قفلة build.",
            "قفلة.",
            "State بتاع شاشة (CounterPage StatefulWidget عادي).",
            "state عادية بـ setState.",
            "state تانية في ValueNotifier: مش بتعيد بناء الشاشة.",
            "بتعيد تعريف dispose.",
            "dispose.",
            "الـ ValueNotifier لازم يتقفل.",
            "في الآخر.",
            "قفلة.",
            "بتعيد تعريف build.",
            "build الشاشة.",
            "عمود.",
            "العيال.",
            "[[const]]: نفس الـ object كل مرة، فـ Flutter بيتخطاه.",
            "بيتغير مع setState.",
            "setState: الشاشة كلها تعيد build (ماعدا اللي const).",
            "builder بيسمع للـ ValueNotifier بس.",
            "المصدر.",
            "بيتبني لوحده مع كل تغيير، و child جاهز.",
            "الجزء الثابت: اتعمل مرة ويتبعت للـ builder.",
            "قفلة الـ builder.",
            "تغيير القيمة: الـ builder بس اللي يتبني، مش الشاشة.",
            "قفلة العيال.",
            "قفلة العمود.",
            "قفلة build.",
            "قفلة الـ State."
          ],
          sol: R`بـ const: [[headerBuilds]] بيفضل 1 بعد ٥ ضغطات على inc. الـ Header اتبنى مرة واحدة أول ما الشاشة ظهرت، وكل rebuild للأب لقى نفس الـ object فعدّاه. من غير const: 6 (مرة أول ما ظهرت + ٥ ضغطات).

page build مع like: بيتطبع مرة واحدة بس (أول build)، والضغطات الخمسة مطبعتش حاجة. الرقم اللي جنب القلب اتغير من غير ما الشاشة تتبني، لأن ValueListenableBuilder بيعيد بناء نفسه بس. ومع inc بيتطبع مع كل ضغطة.`
        }
      ]
    }
]);
