// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "أسئلة الانترفيو",
      l: 3,
      n: "الأسئلة اللي بتتسأل في كل انترفيو Flutter: التلات شجرات، ودورة حياة الـ widgets، والـ keys، و BuildContext، واختيار الـ state management",
      items: [
        {
          cmd: "widget و element و render",
          title: "ليه Flutter فيه ٣ شجرات مش واحدة",
          desc: R`أشهر سؤال: Flutter فيه ٣ شجرات. الـ [[Widget]] وصف immutable خفيف (config) بيتعمل ويترمي مع كل build. والـ [[Element]] هو الـ instance الحقيقي في مكان معين في الشجرة، عايش طول ما الـ widget في مكانه، وهو اللي بيمسك الـ State ويقرر يعيد استخدام إيه. والـ [[RenderObject]] هو اللي بيعمل layout ويرسم فعلًا، وتقيل فبيتعاد استخدامه قد ما يقدر.

و [[BuildContext]] اللي بتاخده في build هو نفسه الـ Element.`,
          example: R`import 'package:flutter/material.dart';

class Inspect extends StatelessWidget {
  const Inspect({super.key});

  @override
  Widget build(BuildContext context) {
    final element = context as Element;
    debugPrint('widget=$__{element.widget.runtimeType} element=$__{element.runtimeType} depth=$__{element.depth}');
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final box = context.findRenderObject() as RenderBox;
      debugPrint('render=$__{box.runtimeType} size=$__{box.size}');
    });
    return const Padding(padding: EdgeInsets.all(8), child: Text('hi'));
  }
}`,
          try: "حط [[Inspect]] في [[MaterialApp(home: Center(child: Inspect()))]] وشغّل. اقرا الـ depth: ليه رقم كبير كده وانت كاتب ٣ widgets بس؟ وبعدين اضغط [[w]] ثم [[t]] في ترمنال flutter run وقارن طول الشجرتين.",
          flag: "script",
          deep: {
            why: "السؤال ده بيفرز اللي بيحفظ widgets من اللي فاهم Flutter بيشتغل إزاي. ومنه بتفهم حاجات عملية: ليه const بيوفّر، وليه الـ State بيفضل موجود مع إن الـ widget اتعمل من جديد، وليه الـ keys مهمة، وليه build ممكن يتنادى ٦٠ مرة في الثانية ومفيش مشكلة.",
            how: R`الرحلة: [[build()]] بترجّع widgets جديدة. الـ Element بيقارن كل widget جديد بالقديم اللي في نفس المكان بـ [[Widget.canUpdate]]: لو نفس الـ runtimeType ونفس الـ key، الـ element بيفضل زي ما هو، وبياخد الـ widget الجديد كـ config ([[update]])، ويبلّغ الـ RenderObject بالقيم الجديدة (زي padding اتغير). لو النوع أو الـ key مختلف، الـ element القديم (والـ State والـ RenderObject بتوعه) بيتشال ويتعمل جديد.

عشان كده:
- الـ widgets رخيصة (objects صغيرة immutable)، وبيتعملوا ويترموا عادي.
- الـ State بيعيش في الـ Element مش في الـ widget، فبيفضل بعد الـ rebuild.
- الـ RenderObject (layout و paint) هو المكلف، والنظام كله معمول عشان يتعاد استخدامه.
- لو الـ widget الجديد هو نفس الـ object القديم ([[identical]]، زي const)، الـ element بيتخطاه خالص.

أنواع الـ elements: [[StatelessElement]] و [[StatefulElement]] (للـ widgets اللي بتجمّع)، و [[RenderObjectElement]] (للي بيرسموا زي Padding و RichText). مش كل widget ليه RenderObject: Text و Container و StatelessWidget بتاعك بيرجّعوا widgets تانية، والـ render tree أقصر من الـ widget tree بكتير.

[[findRenderObject()]] من context بتاع StatelessWidget بيرجّع أقرب RenderObject تحته (هنا RenderPadding)، وبعد الـ layout بس ([[addPostFrameCallback]]) عشان الـ size تبقى معروفة.

والشجرة الرابعة لو اتسألت: الـ Layer tree اللي بيروح للـ raster thread و Impeller.

المقارنة بـ React: Widget زي React element (وصف)، و Element زي الـ fiber (الـ instance والـ state)، و RenderObject زي الـ DOM node.`,
            when: "في الانترفيو، وكل ما تحتاج تفهم ليه حاجة اتعملها rebuild أو ليه state ضاعت أو اتنقلت.",
            mistakes: R`تقول «الـ widget هو اللي بيترسم على الشاشة». وتقول إن setState «بيعيد رسم الشاشة كلها»: بيعلّم الـ element dirty، والـ build بيحصل للـ subtree ده بس، والـ RenderObjects بتتحدث مش بتتعمل من جديد. وتنسى إن BuildContext هو الـ Element، فمتعرفش تشرح ليه [[Scaffold.of(context)]] بيفشل (درس BuildContext).`
          },
          teach: R`## الكود ده بيعمل إيه؟

widget صغير بيطبع عن نفسه ٣ حاجات: الـ widget، والـ Element اللي ماسكه، والـ RenderObject اللي بيرسمه. يعني بيوريك الـ ٣ شجرات من جوه build واحد.

اتشغّل في widget test بـ [[flutter test]] في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0) على [[MaterialApp(home: Center(child: Inspect()))]] زي الـ try. شاشة الاختبار ٨٠٠ في ٦٠٠.

---

## ١. [[final element = context as Element;]]

- [[context]]: الـ [[BuildContext]] اللي build بتاخده.
- [[as Element]]: «اعتبره من نوع [[Element]]» (cast). لو مكانش Element كان هيضرب، بس [[BuildContext]] في Flutter هو interface والـ Element هو اللي بينفّذه، فالـ cast بيعدّي.
- [[final]]: متغير مبيتغيرش بعد ما يتحط.

## ٢. السطر اللي بيطبع

~~~text الكود
debugPrint('widget=$__{element.widget.runtimeType} element=$__{element.runtimeType} depth=$__{element.depth}');
~~~

- [[debugPrint]]: زي [[print]] بس بيقسّم الرسايل الطويلة ومش بيغرق الـ log.
- [[$__{...}]] جوه نص Dart: حط قيمة الـ expression هنا (string interpolation).
- [[element.widget]]: الـ widget اللي الـ element ماسكه دلوقتي (الـ config).
- [[.runtimeType]]: نوع الـ object الحقيقي وقت التشغيل.
- [[element.depth]]: الـ element ده بعيد عن أول الشجرة بكام مستوى.

~~~text الناتج
widget=Inspect element=StatelessElement depth=135
~~~

- [[StatelessElement]]: كل [[StatelessWidget]] بيتعمله element من النوع ده.
- [[depth=135]] وانت كاتب ٣ widgets بس: [[MaterialApp]] لوحده بيحط فوقك أكتر من ١٣٠ مستوى (Theme و MediaQuery و Navigator و Overlay و Localizations وغيرهم).

## ٣. [[addPostFrameCallback]]

~~~text الكود
WidgetsBinding.instance.addPostFrameCallback((_) {
  final box = context.findRenderObject() as RenderBox;
  debugPrint('render=$__{box.runtimeType} size=$__{box.size}');
});
~~~

- [[WidgetsBinding.instance]]: الحتة اللي بتربط Flutter بالـ engine، وفيها جدول الـ frames.
- [[addPostFrameCallback((_) {...})]]: نفّذ الدالة دي **بعد** ما الـ frame الحالي يخلص (build ثم layout ثم paint). [[_]] اسم للـ parameter (وقت الـ frame) معناه «مش محتاجه». ليه بعدين؟ لأن وقت build لسه مفيش layout، فالحجم مش معروف.
- [[context.findRenderObject()]]: Inspect نفسه مالوش RenderObject، فبيرجّع أقرب واحد تحته.
- [[as RenderBox]]: [[RenderBox]] نوع RenderObject بيتعامل بالمستطيلات (عرض وطول)، وده اللي فيه [[.size]].

~~~text الناتج
render=RenderPadding size=Size(112.0, 64.0)
~~~

أقرب RenderObject هو بتاع [[Padding]]. والحجم: النص [[hi]] طلع ٩٦ في ٤٨ (بخط الاختبار)، + ٨ من كل ناحية = ١١٢ في ٦٤.

## ٤. [[return const Padding(padding: EdgeInsets.all(8), child: Text('hi'));]]

- [[Padding]] بيعمل [[RenderPadding]].
- [[Text]] مالوش RenderObject: بيبني [[RichText]]، و RichText هو اللي بيعمل [[RenderParagraph]].

ودا اللي [[debugDumpApp()]] (حرف [[w]]) طبعه تحت Center:

~~~text الناتج (آخر ٥ سطور)
└Center(alignment: Alignment.center, dependencies: [Directionality], renderObject: RenderPositionedBox#35cc0)
 └Inspect
  └Padding(padding: EdgeInsets.all(8.0), dependencies: [Directionality], renderObject: RenderPadding#06c1a relayoutBoundary=up1)
   └Text("hi", dependencies: [DefaultSelectionStyle, DefaultTextStyle, MediaQuery])
    └RichText(... text: "hi", ... renderObject: RenderParagraph#ba9c7 relayoutBoundary=up2)
~~~

اللي جنبه [[renderObject:]] بس هو اللي ليه RenderObject: Center و Padding و RichText. أما Inspect و Text فمالهمش. والرقم بعد [[#]] (زي [[06c1a]]) hash قصير بيميّز الـ object.

---

## ٥. الشجرات بالأرقام

عدّيت الشجرتين بـ [[visitChildren]] في نفس الاختبار:

~~~text الناتج
elements=153 renderObjects=40
~~~

ومن أول الـ render tree لآخره، آخر حلقات السلسلة:

~~~text الناتج (آخر السلسلة)
... > RenderPositionedBox > RenderPadding > RenderParagraph
~~~

| الشجرة | العدد | بتتعمل امتى | تقيلة؟ |
|---|---|---|---|
| Widget | جديدة في كل build | كل build | لأ، objects صغيرة immutable |
| Element | ١٥٣ | مرة، وبتتحدث | متوسطة، فيها الـ State |
| RenderObject | ٤٠ | مرة، وبتتحدث | أيوه، layout و paint |

---

## الخلاصة

- الـ widget وصف، والـ Element الـ instance اللي في مكانه (وهو الـ [[BuildContext]])، والـ RenderObject اللي بيعمل layout ويرسم.
- مش كل widget ليه RenderObject: StatelessWidget و Text بيبنوا widgets تانية.
- الحجم معروف بعد الـ layout بس: [[addPostFrameCallback]].
- [[depth]] كبير لأن MaterialApp بيحط عشرات المستويات فوقك.`,
          lines: [
            "مكتبة Material.",
            "widget عادي.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "BuildContext هو الـ Element نفسه، فالـ cast بيشتغل.",
            "نوع الـ widget، ونوع الـ element (StatelessElement)، وعمقه في الشجرة.",
            "بعد ما الـ frame يترسم (الـ layout خلص)...",
            "...أقرب RenderObject تحت الـ element ده.",
            "RenderPadding وحجمه الحقيقي.",
            "قفلة الـ callback.",
            "Padding ليه RenderObject، و Text جواه RichText ليه واحد.",
            "قفلة build.",
            "قفلة."
          ],
          sol: R`هتلاقي [[widget=Inspect element=StatelessElement depth=...]] برقم فوق ١٠٠، ثم [[render=RenderPadding size=Size(...)]]. الـ depth كبير لأن MaterialApp لوحده بيحط عشرات الـ widgets فوقك (Theme و MediaQuery و Navigator و Overlay و Localizations و ScrollConfiguration وغيرهم)، وكل واحد element.

[[w]] (debugDumpApp) بيطبع الـ widget tree (عنصر في كل سطر)، و [[t]] (debugDumpRenderTree) فيها عناصر أقل بكتير (عدّيتهم في widget test: ١٥٣ element قصاد ٤٠ RenderObject)، مع إن نصها المطبوع أطول لأن كل RenderObject بيطبع constraints و size وخصايصه في كذا سطر. العناصر أقل لأن widgets كتير (StatelessWidget بتاعك، و Container، و Text نفسه) مالهاش RenderObject خاص، بتجمّع widgets تانية بس. دي بالظبط الإجابة: ٣ شجرات لأن كل واحدة ليها دور، واللي بيتعمل كل frame هو الأرخص.`
        },
        {
          cmd: "lifecycle",
          title: "إيه اللي بيتنادى امتى في StatelessWidget و StatefulWidget",
          desc: R`StatelessWidget ليه [[build]] بس، بتتنادى لما يدخل الشجرة ولما الأب يبعت widget جديد ولما inherited widget معتمد عليه يتغير. StatefulWidget ليه دورة كاملة في الـ State: [[createState]] ثم [[initState]] ثم [[didChangeDependencies]] ثم [[build]]، ومع كل widget جديد من الأب [[didUpdateWidget]] ثم build، وفي الآخر [[deactivate]] و [[dispose]].

وفيه دورة تانية للتطبيق كله: foreground و background و detached، وبتسمع لها بـ [[AppLifecycleListener]].`,
          example: R`class _ProbeState extends State<Probe> {
  late final AppLifecycleListener _app;

  @override
  void initState() {
    super.initState();
    debugPrint('initState');
    _app = AppLifecycleListener(onStateChange: (s) => debugPrint('app: $__{s.name}'));
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    debugPrint('didChangeDependencies');
  }

  @override
  void didUpdateWidget(Probe oldWidget) {
    super.didUpdateWidget(oldWidget);
    debugPrint('didUpdateWidget $__{oldWidget.label} -> $__{widget.label}');
  }

  @override
  void dispose() {
    _app.dispose();
    debugPrint('dispose');
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    debugPrint('build $__{widget.label}');
    return Text(widget.label);
  }
}`,
          try: "اعمل [[Probe]] StatefulWidget فيه [[final String label]]. في الأب اعرضه بـ label بيتغير مع زرار، وبعدين بـ [[key: ValueKey(label)]]، وبعدين شيله من الشجرة. اكتب ترتيب الرسايل في كل حالة. وآخر حاجة: اقفل التطبيق للـ background وارجع، وشوف رسايل app.",
          flag: "script",
          deep: {
            why: "أسئلة زي «فين تعمل طلب الـ API؟» و«فين تقفل الـ controller؟» و«ليه الـ state متحدثتش لما الأب بعت id جديد؟» كلها إجابتها في الترتيب ده. والانترفيوهات بتسأله مباشرة، وبتسأل عن الفرق بين الاتنين.",
            how: R`الترتيب بالتفصيل:
- [[createState]]: مرة واحدة لما الـ element يتعمل. متحطش فيها منطق (الـ lint [[no_logic_in_create_state]]).
- [[initState]]: مرة. controllers و subscriptions وبداية التحميل. [[context]] موجود بس متعملش [[Theme.of]] أو [[MediaQuery.of]] هنا.
- [[didChangeDependencies]]: بعد initState مباشرة، وكل ما InheritedWidget عملت عليه [[.of(context)]] يتغير (الثيم، اللغة، حجم الشاشة). المكان الصح لحاجة بتعتمد على inherited وتتعمل مرة لكل تغيير.
- [[build]]: كتير.
- [[didUpdateWidget(old)]]: الأب عمل rebuild وبعت widget جديد من نفس النوع والـ key. الـ State نفسه فاضل، و [[widget]] بقى الجديد. هنا تقارن: [[if (old.userId != widget.userId) _load();]]. من غيرها، الشاشة هتفضل تعرض بيانات المستخدم القديم.
- [[deactivate]]: اتشال من مكانه (ممكن يرجع في نفس الـ frame لو اتنقل بـ GlobalKey). نادرًا بتحتاجها.
- [[dispose]]: اتشال نهائيًا. اقفل كل حاجة. بعدها [[mounted]] false.
- [[reassemble]]: مع hot reload بس (debug).

الـ key بيغيّر كل ده: لو الـ key اتغير، مفيش didUpdateWidget، فيه dispose للقديم و createState و initState للجديد. ودي طريقة مشروعة لـ «reset» الـ state: [[key: ValueKey(userId)]].

StatelessWidget: build بس. مفيش state تعيش بين الـ builds، وأي بيانات جاية من الـ constructor أو من inherited widgets أو providers.

دورة التطبيق ([[AppLifecycleState]]): [[resumed]] (قدام المستخدم)، و [[inactive]] (مكالمة جاية، الـ app switcher)، و [[hidden]]، و [[paused]] (في الخلفية)، و [[detached]]. [[AppLifecycleListener]] (من Flutter 3.13) أبسط من [[WidgetsBindingObserver]] القديم، وليه callbacks زي [[onResume]] و [[onPause]]. استخدامات: توقف فيديو في paused، وتعيد تحميل البيانات أو تتأكد من التوكن في resumed. ولازم dispose.`,
            when: "كل StatefulWidget بتكتبه. و didUpdateWidget بالذات في أي widget بياخد id أو config من الأب وبيحمّل حاجة على أساسه.",
            mistakes: R`تحمّل البيانات في build. وتنسى didUpdateWidget فالشاشة تعرض بيانات id قديم. و [[initState]] async. و [[super.dispose()]] في الأول بدل الآخر. وفي الانترفيو: «الفرق بين Stateless و Stateful؟» الإجابة الناقصة «واحد بيتغير وواحد لأ»، والصح: الاتنين immutable كـ widgets، والـ Stateful بيعمل State object عايش في الـ element بيحتفظ بالقيم بين الـ builds وليه lifecycle.`
          },
          teach: R`## الكود ده بيعمل إيه؟

State بتاع widget اسمه [[Probe]]، كل دالة من دوال الـ lifecycle فيه بتطبع اسمها. فلما تحطه في الشاشة وتغيّره وتشيله، الرسايل بتقولك بالترتيب Flutter نادى إيه وامتى. وفوق كده بيسمع لحالة التطبيق كله (قدام المستخدم ولا في الخلفية).

كتبت [[Probe]] نفسه (StatefulWidget فيه [[final String label]] زي الـ try)، و widget test بيعمل كل حالات الـ try بالترتيب بـ [[tester.pumpWidget]] (بيحط widget جديد في الشجرة ويرسم frame)، وشغّلته بـ [[flutter test]] في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0).

---

## ١. الحقل: [[late final AppLifecycleListener _app;]]

- [[late]]: «هتتحط قيمته بعدين، قبل أول استخدام». محتاجينها لأن الـ listener بيتعمل في initState مش في السطر ده.
- [[final]]: مرة واحدة بس.
- [[AppLifecycleListener]]: class من Flutter بيسمع لحالة التطبيق.

## ٢. [[initState]]

~~~text الكود
@override
void initState() {
  super.initState();
  debugPrint('initState');
  _app = AppLifecycleListener(onStateChange: (s) => debugPrint('app: $__{s.name}'));
}
~~~

- [[@override]]: الدالة دي موجودة في [[State]] وانت بتكتب نسختك منها.
- [[super.initState()]]: نادي نسخة الأب **الأول**، وبعدين شغلك.
- [[onStateChange: (s) => ...]]: دالة بتتنادى مع كل تغيير، و [[s]] من نوع [[AppLifecycleState]]، و [[.name]] اسمه كنص.

## ٣. [[didChangeDependencies]] و [[didUpdateWidget]]

- [[didChangeDependencies]]: بعد initState على طول، وكل ما inherited widget انت بتقراه بـ [[.of(context)]] يتغير.
- [[didUpdateWidget(Probe oldWidget)]]: الأب بعت widget جديد من نفس النوع والـ key. [[oldWidget]] القديم، و [[widget]] (من غير ما تعرّفه، موجود في State) الجديد. والسطر بيطبع الاتنين.

## ٤. [[dispose]] و [[build]]

- [[dispose]]: [[_app.dispose()]] الأول (اقفل حاجاتك)، و [[super.dispose()]] **في الآخر**.
- [[build]]: بيقرا [[widget.label]] كل مرة، فالنص دايمًا من آخر widget.

---

## ٥. اللي اتطبع

~~~text الناتج: أول ظهور بـ label a
initState
didChangeDependencies
build a
~~~

~~~text الناتج: الأب بعت label b (من غير key)
didUpdateWidget a -> b
build b
~~~

نفس الـ State (مفيش initState)، و [[widget]] بقى الجديد.

~~~text الناتج: الأب بعت Probe(label: 'b') تاني بنفس القيمة
didUpdateWidget b -> b
build b
~~~

القيمة نفسها مش فارقة: widget object جديد يعني didUpdateWidget و build.

### const ونفس الـ object

لما بعت **نفس** المتغير [[const p = Probe(label: 'b')]] مرتين: ولا رسالة، لأن Flutter بيتخطى الـ widget اللي [[identical]] للقديم. بس لما كتبت [[const Probe(label: 'b')]] في سطر تاني، طلع [[didUpdateWidget b -> b]] و [[build b]]، و [[identical(p, const Probe(label: 'b'))]] طبع [[false]]! السبب إن debug و [[flutter test]] شغالين بـ [[--track-widget-creation]] (اللي الـ Inspector بيستخدمه عشان يعرف كل widget اتكتب في أنهي سطر)، فكل const في مكان مختلف في الكود بيبقى object مختلف. بـ [[flutter test --no-track-widget-creation]] نفس السطر طبع [[identical: true]]. في release مفيش الحكاية دي.

~~~text الناتج: key: ValueKey('b') ثم ValueKey('c')
initState
didChangeDependencies
build b
dispose
initState
didChangeDependencies
build c
dispose
~~~

اقرا بالراحة: لما ضفت key لأول مرة (كان null وبقى [[ValueKey('b')]]) ده key مختلف، فـ State جديد اتعمل ([[initState]] .. [[build b]]) والقديم اتقفل ([[dispose]]). وبعدين [[ValueKey('c')]]: نفس الحكاية تاني. الـ key المختلف = element و State جديد، مش didUpdateWidget. لاحظ إن الجديد بيتعمل قبل ما القديم يتقفل في نفس الـ frame.

~~~text الناتج: الخلفية وبعدين الرجوع
app: inactive
app: hidden
app: paused
app: hidden
app: inactive
app: resumed
~~~

دي اتعملت بـ [[tester.binding.handleAppLifecycleStateChanged(...)]] بنفس الترتيب اللي الموبايل بيبعته. على الموبايل الحقيقي الترتيب ممكن يختلف شوية بين Android و iOS (من الـ docs).

~~~text الناتج: شيلته من الشجرة
dispose
~~~

---

## الخلاصة

| الحدث | اللي بيتنادى |
|---|---|
| أول ظهور | [[initState]] ← [[didChangeDependencies]] ← [[build]] |
| الأب بعت widget جديد، نفس النوع والـ key | [[didUpdateWidget]] ← [[build]] |
| نفس الـ object بالظبط | ولا حاجة |
| الـ key اتغير | State جديد ([[initState]] ...) و [[dispose]] للقديم |
| اتشال | [[dispose]] |
| التطبيق للخلفية | [[inactive]] ← [[hidden]] ← [[paused]] |

- [[super.initState()]] في الأول و [[super.dispose()]] في الآخر.
- أي حاجة بتتفتح في initState (listener، controller) بتتقفل في dispose.
- عايز تعمل reset للـ State؟ غيّر الـ key.`,
          lines: [
            "الـ State بتاع widget اسمه Probe.",
            "listener لحالة التطبيق.",
            "بتعيد تعريف initState.",
            "مرة واحدة.",
            "الأول.",
            "رسالة.",
            "اسمع لتغييرات التطبيق (background و foreground).",
            "قفلة.",
            "بتعيد تعريف didChangeDependencies.",
            "بعد initState ومع تغيير أي inherited widget.",
            "الأول.",
            "رسالة.",
            "قفلة.",
            "بتعيد تعريف didUpdateWidget.",
            "الأب بعت widget جديد من نفس النوع والـ key.",
            "الأول.",
            "القديم والجديد.",
            "قفلة.",
            "بتعيد تعريف dispose.",
            "dispose.",
            "اقفل الـ listener.",
            "رسالة.",
            "في الآخر.",
            "قفلة.",
            "بتعيد تعريف build.",
            "build.",
            "رسالة.",
            "النص.",
            "قفلة.",
            "قفلة الـ State."
          ],
          sol: R`أول ظهور: [[initState]] ثم [[didChangeDependencies]] ثم [[build a]]. تغيير الـ label من غير key: [[didUpdateWidget a -> b]] ثم [[build b]]: نفس الـ State. ولو الأب عمل rebuild بنفس القيمة، برضه didUpdateWidget و build (إلا لو الـ widget const ونفس الـ object).

مع [[key: ValueKey(label)]] وتغيير الـ label: [[initState]] و [[didChangeDependencies]] و [[build c]] للجديد، و [[dispose]] للقديم. الـ State اتعمل من جديد لأن الـ key اختلف. ولما تشيله: [[dispose]].

الـ background: [[app: inactive]] ثم [[app: hidden]] ثم [[app: paused]]، والرجوع بالعكس لحد [[app: resumed]] (الترتيب الدقيق بيختلف شوية بين Android و iOS).

(الترتيب ده اتأكد بـ widget test على Flutter 3.44.0.)`
        },
        {
          cmd: "ValueKey",
          title: "ليه الـ checkbox اتنقل لعنصر تاني لما رتّبت اللستة",
          desc: R`لما عناصر من نفس النوع تتحرك في لستة (ترتيب، مسح من النص، إضافة في الأول)، Flutter بيطابق القديم بالجديد بالمكان بس. فالـ State بتاع أول عنصر بيروح لأي widget بقى أول، حتى لو ده عنصر تاني. النتيجة: checkbox «متعلّم» بيتنقل لحاجة المستخدم معلّمهاش.

[[key: ValueKey(item.id)]] بيخلي المطابقة بالـ key، فالـ State بيمشي مع العنصر بتاعه. وفيه [[ObjectKey]] و [[UniqueKey]] و [[GlobalKey]] لحالات تانية.`,
          example: R`import 'package:flutter/material.dart';

class TaskTile extends StatefulWidget {
  const TaskTile({super.key, required this.title});
  final String title;
  @override
  State<TaskTile> createState() => _TaskTileState();
}

class _TaskTileState extends State<TaskTile> {
  bool _done = false;
  @override
  Widget build(BuildContext context) => CheckboxListTile(
        title: Text(widget.title),
        value: _done,
        onChanged: (v) => setState(() => _done = v!),
      );
}

class _TaskListState extends State<TaskList> {
  final _tasks = ['milk', 'bread', 'eggs'];

  @override
  Widget build(BuildContext context) => Column(
        children: [
          for (final t in _tasks) TaskTile(key: ValueKey(t), title: t),
          TextButton(
            onPressed: () => setState(() => _tasks.insert(0, _tasks.removeLast())),
            child: const Text('rotate'),
          ),
        ],
      );
}`,
          try: "علّم milk، ودوس rotate: العلامة فضلت على milk؟ شيل [[key: ValueKey(t)]] وكرر: العلامة راحت فين؟ وبعدين جرّب [[key: UniqueKey()]]: إيه اللي بيحصل للعلامات مع كل rotate؟",
          flag: "script",
          deep: {
            why: "دا bug بيوصل للإنتاج كتير: لستة مهام أو سلة فيها state محلي (checkbox، حقل كمية، animation)، والمستخدم يمسح عنصر فالقيم تتلخبط بين العناصر. وسؤال انترفيو مشهور جدًا: «امتى تستخدم keys؟».",
            how: R`[[Widget.canUpdate(old, new)]] بيرجّع true لو [[runtimeType]] و [[key]] متساويين. من غير keys، الاتنين null، فأي TaskTile يطابق أي TaskTile في نفس المكان. بعد rotate، أول TaskTile (بقى eggs) بياخد الـ element والـ State بتاع أول واحد قديم (milk)، فـ [[_done = true]] بتاعة milk بقت على eggs. الـ title اتغير لأنه جاي من الـ widget، والـ _done فضل لأنه في الـ State.

مع keys، الـ element بتاع الأب بيدوّر بين العيال بالـ key، فيلاقي element بتاع milk في المكان التاني ويحرّكه، والـ State يمشي معاه.

أنواع الـ keys:
- [[ValueKey(id)]]: قيمة فريدة وثابتة للعنصر. الأشهر. متستخدمش الـ index: بيتغير مع الترتيب ودا نفس المشكلة.
- [[ObjectKey(obj)]]: المطابقة بـ identity الـ object لو مفيش id.
- [[UniqueKey()]]: مختلف كل مرة بيتعمل، فلو اتعمل جوه build كل rebuild يعمل element جديد ويضيّع الـ state. مفيد بس لما تعوز تجبر reset.
- [[GlobalKey]]: فريد في التطبيق كله، بيوصلك للـ State من بره ([[_formKey.currentState!.validate()]])، وبيسمح بنقل widget لمكان تاني في الشجرة من غير ما يخسر الـ state. تقيل نسبيًا، فمتستخدمهوش كبديل لـ ValueKey.
- [[PageStorageKey]]: بيحفظ مكان الـ scroll لكل تاب.

الـ keys مهمة بس بين أخوات (عيال نفس الأب). ومش محتاجها لو العناصر Stateless ومفيهاش animations: الغلط في المطابقة مش هيبان لأن كل حاجة جاية من الـ widget.

واستخدام تاني: [[key: ValueKey(userId)]] على شاشة، عشان لما الـ id يتغير الـ State يتعمل من جديد بدل ما تكتب منطق reset في didUpdateWidget.`,
            when: "أي لستة عناصرها Stateful أو فيها animation وممكن تترتب أو يتمسح منها من النص: todo list، و ReorderableListView (الـ keys إجبارية فيه)، و AnimatedList، و Dismissible (إجباري برضه).",
            mistakes: R`[[ValueKey(index)]]: بيتغير مع الترتيب فمش بيحل حاجة. و [[UniqueKey()]] جوه build فكل rebuild بيمسح الـ state. والـ key على widget جوه العنصر بدل العنصر نفسه اللي هو ابن مباشر للـ Column أو اللستة. و GlobalKey في كل عنصر في لستة طويلة.`
          },
          teach: R`## الكود ده بيعمل إيه؟

لستة مهام، كل مهمة [[TaskTile]] فيها checkbox حالته محفوظة في الـ State بتاعها، وزرار [[rotate]] بيخلي آخر مهمة تبقى أول واحدة. السؤال: لما الترتيب يتغير، العلامة بتمشي مع المهمة ولا بتفضل في مكانها؟

اتجرّب بـ widget test في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0): بيدوس على milk، وبعدين rotate مرتين، ويطبع كل مهمة وعلامتها ([[X]] متعلّمة و [[_]] لأ). ٣ مرات: بـ [[ValueKey(t)]]، ومن غير key، وبـ [[UniqueKey()]]. وضفت [[class TaskList extends StatefulWidget]] اللي المثال بيفترضه.

---

## ١. [[TaskTile]]: widget فيه state محلي

~~~text الكود
class TaskTile extends StatefulWidget {
  const TaskTile({super.key, required this.title});
  final String title;
  @override
  State<TaskTile> createState() => _TaskTileState();
}
~~~

- [[{super.key, required this.title}]]: parameters بالاسم. [[super.key]] بيوصّل الـ key للأب ([[Widget]] نفسه هو اللي شايله)، و [[required this.title]] لازم يتبعت وبيتحط في الحقل [[title]] على طول.
- [[createState()]]: Flutter بيناديها مرة لما الـ element يتعمل، و [[=>]] بترجّع State جديد.

~~~text الكود
class _TaskTileState extends State<TaskTile> {
  bool _done = false;
  @override
  Widget build(BuildContext context) => CheckboxListTile(
        title: Text(widget.title),
        value: _done,
        onChanged: (v) => setState(() => _done = v!),
      );
}
~~~

- [[_done]]: الـ state. عايش في الـ State object، مش في الـ widget.
- [[CheckboxListTile]]: سطر فيه عنوان و checkbox.
- [[title: Text(widget.title)]]: العنوان **من الـ widget** (بيتغير لو الأب بعت widget جديد).
- [[value: _done]]: العلامة **من الـ State**.
- [[onChanged: (v) => setState(() => _done = v!)]]: لما تدوس، [[v]] القيمة الجديدة ونوعها [[bool?]] (ممكن null في checkbox بـ tristate)، و [[!]] معناها «أنا متأكد إنها مش null».

الفرق ده (العنوان من الـ widget والعلامة من الـ State) هو قلب الدرس.

---

## ٢. اللستة و rotate

~~~text الكود
final _tasks = ['milk', 'bread', 'eggs'];
...
for (final t in _tasks) TaskTile(key: ValueKey(t), title: t),
TextButton(
  onPressed: () => setState(() => _tasks.insert(0, _tasks.removeLast())),
  child: const Text('rotate'),
),
~~~

- [[for (final t in _tasks) TaskTile(...)]] جوه لستة [[children:]]: «collection for»، بيحط widget لكل عنصر جوه اللستة مباشرة.
- [[ValueKey(t)]]: key قيمته اسم المهمة نفسه ([['milk']]).
- [[_tasks.removeLast()]] بتشيل آخر عنصر وترجّعه، و [[insert(0, ...)]] بتحطه في الأول. فـ [[milk bread eggs]] تبقى [[eggs milk bread]].

---

## ٣. النتايج

~~~text الناتج بـ ValueKey(t)
[value] after tap milk: milk=X  bread=_  eggs=_
[value] after rotate 1:  eggs=_  milk=X  bread=_
[value] after rotate 2:  bread=_  eggs=_  milk=X
~~~

العلامة ماشية مع milk مهما اتحرك.

~~~text الناتج من غير key
[none] after tap milk: milk=X  bread=_  eggs=_
[none] after rotate 1:  eggs=X  milk=_  bread=_
[none] after rotate 2:  bread=X  eggs=_  milk=_
~~~

العلامة فضلت في **المكان الأول**، فراحت لـ eggs وبعدين bread. ليه؟ Flutter بيقارن القديم بالجديد بـ [[Widget.canUpdate]]: نفس [[runtimeType]] ونفس [[key]]. من غير keys الاتنين [[null]]، فأول TaskTile جديد (eggs) خد element وState أول واحد قديم (milk). العنوان اتغير (جاي من الـ widget)، و [[_done = true]] فضلت (في الـ State).

~~~text الناتج بـ UniqueKey()
[unique] after tap milk: milk=X  bread=_  eggs=_
[unique] after rotate 1:  eggs=_  milk=_  bread=_
[unique] after rotate 2:  bread=_  eggs=_  milk=_
~~~

[[UniqueKey()]] جوه build بيعمل key جديد مختلف عن أي key قبله في كل build. فمفيش element قديم بيطابق، وكل الـ States اتمسحت واتعملت من جديد بـ [[_done = false]].

| الـ key | المطابقة بـ | بعد rotate |
|---|---|---|
| [[ValueKey(t)]] | اسم المهمة | العلامة مع milk ✓ |
| مفيش | المكان | العلامة في المكان الأول ✗ |
| [[UniqueKey()]] في build | ولا حاجة تطابق | كل العلامات اتمسحت ✗ |

---

## الخلاصة

- الـ State عايش في الـ element، والـ element بيتطابق بالنوع والـ key والمكان.
- عناصر Stateful في لستة بتتحرك: [[key: ValueKey(id)]] على العنصر المباشر نفسه.
- متستخدمش [[ValueKey(index)]] (بيتغير مع الترتيب) ولا [[UniqueKey()]] جوه build.`,
          lines: [
            "مكتبة Material.",
            "عنصر فيه state محلي.",
            "constructor بياخد key.",
            "العنوان من الـ widget.",
            "بتعيد تعريف createState.",
            "الـ State.",
            "قفلة.",
            "الـ State.",
            "الـ state المحلي: متعلّم ولا لأ.",
            "بتعيد تعريف build.",
            "checkbox بعنوان.",
            "العنوان من الـ widget (بيتغير مع الترتيب).",
            "القيمة من الـ State (بتفضل مع الـ element).",
            "التغيير.",
            "قفلة.",
            "قفلة.",
            "State بتاع اللستة (TaskList StatefulWidget عادي).",
            "العناصر.",
            "بتعيد تعريف build.",
            "عمود.",
            "العيال.",
            "[[ValueKey(t)]]: كل عنصر مربوط بقيمته، مش بمكانه.",
            "زرار.",
            "آخر عنصر يبقى أول.",
            "النص.",
            "قفلة الزرار.",
            "قفلة العيال.",
            "قفلة الـ Column.",
            "قفلة الـ State."
          ],
          sol: R`مع [[ValueKey(t)]]: علّمت milk ودوست rotate، الترتيب بقى eggs و milk و bread، والعلامة فضلت على milk.

من غير key: الترتيب اتغير بس العلامة راحت على eggs (بقى في المكان الأول)، و milk بقى مش متعلّم. الـ State بتاع المكان الأول فضل مكانه.

مع [[UniqueKey()]] (جوه build): كل rebuild بيعمل keys جديدة، فكل العناصر بتتعمل States جديدة، والعلامات بتتمسح كلها مع أي rotate. (اتأكد من التلات حالات بـ widget test.)`
        },
        {
          cmd: "BuildContext",
          title: "ليه Scaffold.of(context) بيقولك مفيش Scaffold وهو قدامك",
          desc: R`[[BuildContext]] هو مكان الـ widget في الشجرة (الـ Element). [[Theme.of(context)]] و [[Navigator.of(context)]] و [[Scaffold.of(context)]] بيدوّروا لـ فوق من المكان ده. فلو الـ context بتاع widget فوق الـ Scaffold (زي الـ context بتاع build اللي بيرجّع الـ Scaffold نفسه)، مفيش Scaffold فوقه.

الحل: [[Builder]] بيدّيك context جديد تحت الـ Scaffold، أو تقسّم لـ widget منفصل. وبعد أي [[await]]، الـ context ممكن يكون اتشال: اسأل [[context.mounted]] الأول.`,
          example: R`import 'package:flutter/material.dart';

class SaveScreen extends StatelessWidget {
  const SaveScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Drawer(child: Text('menu')),
      body: Builder(
        builder: (inner) => FilledButton(
          onPressed: () async {
            final messenger = ScaffoldMessenger.of(inner);
            await Future.delayed(const Duration(seconds: 1));
            if (!inner.mounted) return;
            Scaffold.of(inner).openDrawer();
            messenger.showSnackBar(const SnackBar(content: Text('Saved')));
          },
          child: const Text('Save'),
        ),
      ),
    );
  }
}`,
          try: "بدّل [[inner]] بـ [[context]] بتاع build في سطر [[Scaffold.of]] ودوس: الرسالة بتقول إيه؟ رجّعه. وبعدين اعمل الشاشة دي في route بـ push، ودوس Save وارجع فورًا قبل الثانية: الـ mounted عمل إيه؟ ولو شلته؟",
          flag: "script",
          deep: {
            why: "أخطاء الـ context من أكتر الحاجات اللي بتلخبط الناس في Flutter: «مفيش Scaffold»، «مفيش Provider»، «Navigator operation requested with a context that does not include a Navigator»، و «Looking up a deactivated widget's ancestor is unsafe» بعد await. كلهم نفس الفكرة: الـ context بيدوّر لفوق من مكانه، ومكانه ممكن يكون غلط أو اتشال.",
            how: R`[[X.of(context)]] بتعمل [[context.dependOnInheritedWidgetOfExactType]] أو [[findAncestorStateOfType]]: بتطلع من الـ element ده لفوق لحد ما تلاقي. الـ context بتاع build في SaveScreen هو element بتاع SaveScreen، والـ Scaffold ابن ليه، يعني تحت، فالبحث لفوق مش هيلاقيه. [[Builder]] بيعمل element جديد تحت الـ Scaffold، فالـ inner context يلاقيه.

الفرق بين dependOn و find: [[Theme.of]] و [[MediaQuery.of]] بيسجّلوا dependency، فلو الثيم اتغير الـ widget ده يعيد build. عشان كده متتنادوش في initState (مفيش build يتعاد). و [[MediaQuery.sizeOf(context)]] أحسن من [[MediaQuery.of(context).size]] لأنه بيعيد build لما الحجم يتغير بس مش لما الكيبورد تفتح.

بعد await: الشاشة ممكن تكون اتقفلت، والـ element اتعمله unmount. استخدام الـ context ساعتها بيضرب أو بيعمل حاجة على شاشة مش موجودة. [[context.mounted]] (أو [[mounted]] في State) قبل أي استخدام بعد await. والـ lint [[use_build_context_synchronously]] بيمسكها. والحيلة التانية في المثال: خد [[ScaffoldMessenger.of(inner)]] قبل الـ await، لأن الـ messenger فوق الـ route وبيفضل عايش حتى لو الشاشة اتقفلت.

الـ context مش object تخزّنه: متحطهوش في field أو في singleton عشان تستخدمه بعدين.

في Riverpod: [[ref]] بديل context للوصول للـ providers ومش معتمد على مكانك في الشجرة، فمفيش «ProviderNotFound». بس الـ context لسه لازم للـ Theme و Navigator و ScaffoldMessenger.`,
            when: "كل ما تنادي [[.of(context)]]، وكل callback فيه await. ولو لقيت نفسك محتاج Builder كتير، دي علامة إن الشاشة محتاجة تتقسم لـ widgets.",
            mistakes: R`[[Scaffold.of(context)]] بـ context فوق الـ Scaffold. واستخدام context بعد await من غير mounted. و [[Theme.of(context)]] في initState. وتخزين الـ context في متغير global. وفي الانترفيو: «إيه هو BuildContext؟» الإجابة: هو الـ Element، يعني مكان الـ widget في الشجرة، وكل الـ [[.of]] بتدوّر لفوق منه.`
          },
          teach: R`## الكود ده بيعمل إيه؟

شاشة فيها Scaffold بـ drawer وزرار Save. لما تدوس: بيستنى ثانية (كأنه بيحفظ على السيرفر)، وبعدين يفتح الـ drawer ويعرض SnackBar مكتوب فيه Saved. الكود متكتب عشان يتجنّب غلطتين مشهورتين: context في المكان الغلط، و context اتشال بعد [[await]].

اتجرّب بـ widget tests في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0) بـ ٣ نسخ: الكود زي ما هو، ونسخة فيها [[Scaffold.of(context)]] بدل [[inner]]، ونسخة من غير سطر [[mounted]]. وكل نسخة مرتين: الشاشة لوحدها، ومرة متعملها push وبنرجع منها بعد ٢٠٠ مللي ثانية من الضغطة.

---

## ١. فين الـ context؟

~~~text الكود
@override
Widget build(BuildContext context) {
  return Scaffold(
    drawer: const Drawer(child: Text('menu')),
    body: Builder(
      builder: (inner) => FilledButton(
~~~

- [[context]] بتاع build هو الـ element بتاع [[SaveScreen]]. الـ Scaffold **ابن** ليه، يعني تحته.
- [[Builder(builder: (inner) => ...)]]: widget كل شغلته إنه يعمل element جديد وينادي الدالة بالـ context بتاعه. و [[inner]] ده تحت الـ Scaffold.

~~~text الترتيب في الشجرة
SaveScreen   ← context
  Scaffold
    Builder  ← inner
      FilledButton
~~~

و [[Scaffold.of(x)]] بيطلع من [[x]] لفوق لحد ما يلاقي Scaffold. من [[context]] لفوق مفيش، ومن [[inner]] لفوق فيه.

## ٢. [[onPressed: () async {...}]]

- [[async]]: الدالة فيها [[await]]، فبترجع [[Future]] وتكمّل بعدين.

~~~text الكود
final messenger = ScaffoldMessenger.of(inner);
await Future.delayed(const Duration(seconds: 1));
if (!inner.mounted) return;
Scaffold.of(inner).openDrawer();
messenger.showSnackBar(const SnackBar(content: Text('Saved')));
~~~

| السطر | ليه |
|---|---|
| [[ScaffoldMessenger.of(inner)]] قبل الـ await | الـ messenger اللي بيعرض SnackBars موجود فوق كل الـ routes (جوه MaterialApp)، فبناخده وإحنا متأكدين إن الـ context سليم |
| [[await Future.delayed(...)]] | يستنى ثانية، وفي الثانية دي ممكن المستخدم يرجع |
| [[if (!inner.mounted) return;]] | [[mounted]] بتقول الـ element لسه في الشجرة. [[!]] نفي. لو اتشال، اخرج |
| [[Scaffold.of(inner).openDrawer()]] | افتح الـ drawer بتاع أقرب Scaffold فوق inner |
| [[messenger.showSnackBar(...)]] | اعرض الرسالة بالـ messenger اللي اتاخد بدري |

---

## ٣. النتايج

### الكود زي ما هو

~~~text الناتج
[good direct] exception: null
[good direct] menu visible: true  Saved visible: true
~~~

بعد ثانية: الـ drawer مفتوح (كلمة menu ظاهرة) و Saved ظاهرة، ومفيش exception.

### [[Scaffold.of(context)]] بدل [[inner]]

~~~text الناتج
Scaffold.of() called with a context that does not contain a Scaffold.
No Scaffold ancestor could be found starting from the context that was passed to Scaffold.of(). This
usually happens when the context provided is from the same StatefulWidget as that whose build
function actually creates the Scaffold widget being sought.
There are several ways to avoid this problem. The simplest is to use a Builder to get a context that
is "under" the Scaffold.
...
The context used was:
  SaveScreen
~~~

[[ancestor]] يعني جد (حاجة فوق). والرسالة نفسها بتقترح الـ ٣ حلول: Builder، أو تقسيم الـ widget، أو GlobalKey. و [[The context used was: SaveScreen]] بيقولك الـ context كان بتاع مين. ولأن الخطأ قبل [[showSnackBar]]، Saved مظهرتش.

### push ورجوع قبل الثانية

~~~text الناتج (الكود زي ما هو)
[good back] SaveScreen still in tree: false
[good back] exception: null
[good back] home: true  Saved visible: false
~~~

الشاشة اتشالت، و [[inner.mounted]] بقت [[false]]، فالدالة رجعت بهدوء.

~~~text الناتج (من غير سطر mounted)
[nomounted back] SaveScreen still in tree: false
Looking up a deactivated widget's ancestor is unsafe.
To safely refer to a widget's ancestor in its dispose() method, save a reference to the ancestor by
...
~~~

[[Scaffold.of(inner)]] حاول يطلع لفوق من element اتشال ([[deactivated]]) فـ Flutter رفض.

> ملحوظة من التجربة: في الاختبار الأول رجعت بـ [[pop()]] ومستنتش الـ animation، فالشاشة كانت لسه في الشجرة وقت ما الثانية خلصت ومحصلش error. الشاشة بتفضل mounted طول animation الخروج، و [[mounted]] بتبقى false بعدها بس.

---

## الخلاصة

| المشكلة | الحل في الكود |
|---|---|
| [[X.of(context)]] بـ context فوق X | [[Builder]] (أو widget منفصل) يدّيك context تحت |
| context بعد [[await]] ممكن يكون اتشال | [[if (!inner.mounted) return;]] |
| حاجة محتاجها بعد الـ await | خدها قبله ([[ScaffoldMessenger.of(inner)]]) |

- الـ BuildContext هو الـ Element: مكانك في الشجرة، وكل [[.of]] بتدوّر لفوق منه.
- الـ lint [[use_build_context_synchronously]] (موجود في flutter_lints) بيمسك استخدام context بعد await من غير mounted. [[flutter analyze]] على نسخة من غير mounted طلّع:

~~~text الناتج
   info • Don't use 'BuildContext's across async gaps. Try rewriting the code to not use the 'BuildContext', or guard the use with a 'mounted' check • lib/save_nomounted.dart:16:25 • use_build_context_synchronously
~~~

وعلى الكود الأصلي: [[No issues found!]].`,
          lines: [
            "مكتبة Material.",
            "شاشة.",
            "constructor.",
            "بتعيد تعريف build.",
            "الـ context هنا بتاع SaveScreen، يعني فوق الـ Scaffold.",
            "الـ Scaffold ابن للـ context ده.",
            "drawer عشان نفتحه.",
            "[[Builder]]: element جديد تحت الـ Scaffold...",
            "...و [[inner]] هو الـ context بتاعه.",
            "async callback.",
            "خد الـ messenger قبل الـ await (بيعيش أطول من الشاشة).",
            "حاجة بطيئة (حفظ على السيرفر).",
            "الشاشة ممكن تكون اتقفلت: اقف.",
            "inner تحت الـ Scaffold، فـ Scaffold.of بيلاقيه.",
            "رسالة.",
            "قفلة الـ callback.",
            "النص.",
            "قفلة الزرار.",
            "قفلة Builder.",
            "قفلة Scaffold.",
            "قفلة build.",
            "قفلة."
          ],
          sol: R`بـ context بتاع build: [[Scaffold.of() called with a context that does not contain a Scaffold.]] (والرسالة نفسها بتقترح Builder أو تقسيم الـ widget). مع [[inner]]: بعد ثانية الـ drawer بيفتح و Saved بتظهر.

لو رجعت قبل الثانية: [[inner.mounted]] بقت false، فالكود وقف، ومفيش error. لو شلت السطر: [[Scaffold.of(inner)]] على element اتشال بيطلع error زي [[Looking up a deactivated widget's ancestor is unsafe]]، والـ SnackBar (لو كان قبله) كان هيظهر في الشاشة اللي رجعتلها، لأن الـ messenger متشارك.

الغلط الشائع: تحل الأولى بـ GlobalKey للـ Scaffold. شغال، بس Builder أو widget منفصل أبسط.`
        },
        {
          cmd: "state management",
          title: "setState ولا ValueNotifier ولا Riverpod ولا Bloc: تختار إزاي",
          desc: R`مفيش إجابة واحدة، والانترفيو بيدوّر على إنك تعرف الـ trade-offs. القاعدة: ابدأ بأبسط حاجة تكفي. [[setState]] لـ state جوه widget واحد. [[ValueNotifier]] مع [[ValueListenableBuilder]] (جوه Flutter نفسه، من غير packages) لقيمة صغيرة متشاركة. وبعدين Riverpod أو Bloc لما البيانات تبقى متشاركة بين شاشات، وجاية من API، ومحتاجة تتختبر.

المثال: نفس الفكرة (عدّاد السلة) بـ ValueNotifier بس، عشان تشوف إن Flutter فيه أدوات جاهزة قبل أي package.`,
          example: R`import 'package:flutter/material.dart';

final cartCount = ValueNotifier<int>(0);

class CartBadge extends StatelessWidget {
  const CartBadge({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<int>(
      valueListenable: cartCount,
      builder: (context, count, _) => Badge(
        isLabelVisible: count > 0,
        label: Text('$count'),
        child: const Icon(Icons.shopping_cart),
      ),
    );
  }
}

class AddButton extends StatelessWidget {
  const AddButton({super.key});

  @override
  Widget build(BuildContext context) {
    return FilledButton(onPressed: () => cartCount.value++, child: const Text('Add'));
  }
}`,
          try: "حط CartBadge في AppBar و AddButton في body، وجرّب. وبعدين فكّر واكتب: لو السلة لازم تتحفظ على السيرفر، وتظهر loading وخطأ، وتتختبر بـ fake API، وتتمسح لما المستخدم يعمل logout، إيه اللي هيوجعك في الـ ValueNotifier الـ global ده؟ وإمتى تنقله لـ Riverpod؟",
          flag: "script",
          deep: {
            why: "«بتستخدم إيه في الـ state management؟» سؤال في كل انترفيو Flutter تقريبًا. الإجابة «Bloc لأنه الأحسن» بتبين إنك مش فاهم. الإجابة الكويسة بتفرّق بين أنواع الـ state وبتشرح امتى كل أداة تكفي وامتى تبقى تقيلة.",
            how: R`أنواع الـ state:
- ephemeral (محلية): التاب المختار، و checkbox، و animation، وحقل مفتوح. setState. محدش تاني محتاجها.
- app state (متشاركة): المستخدم الحالي، والسلة، والإعدادات، والبيانات من الـ API. محتاجة مكان بره الـ widgets.

الأدوات من الأبسط:
- [[setState]]: جوه widget. أبسط حاجة، ومفيش packages.
- رفع الـ state للأب وتمريرها كـ parameters و callbacks: كويس لمستويين تلاتة.
- [[ValueNotifier]] / [[ChangeNotifier]] + [[ValueListenableBuilder]] / [[ListenableBuilder]]: جوه Flutter. كويس لقيم قليلة. بس لو global زي المثال: صعب تعمله reset في logout، وصعب تبدّله في الاختبارات، ومفيش async state جاهزة.
- [[InheritedWidget]]: الأساس اللي Theme و MediaQuery و provider مبنيين عليه. نادرًا بتكتبه بإيدك.
- Provider: ChangeNotifier في الشجرة. بسيط، ومنتشر في المشاريع القديمة.
- Riverpod: providers بره الشجرة، و AsyncValue، و overrides للاختبار، و autoDispose و family. أقل boilerplate من Bloc، ومعظم المشاريع الجديدة بتختاره.
- Bloc: events و states صريحة، وكل تغيير متسجّل، وقواعد صارمة. مناسب لفرق كبيرة ومنطق معقد. كود أكتر.

إجابة انترفيو كويسة (مثال): «setState للـ state المحلية. للـ app state بستخدم Riverpod: الـ repositories providers فبعملهم override في الاختبارات، والبيانات من الـ API AsyncNotifier فالـ loading والـ error جاهزين، والـ state immutable. واشتغلت على Bloc/Provider في مشروع X، والفرق الأساسي إن Bloc بيفصل الأحداث عن الحالة، ودا مفيد لو محتاج audit لكل تغيير، بس الكود أطول.»

المعايير اللي تقارن بيها: قابلية الاختبار (تبدّل الاعتماديات)، والـ async (loading و error)، والـ boilerplate، ومنحنى التعلم للفريق، والـ rebuilds (select و Consumer)، والـ lifecycle (dispose لما محدش محتاج).`,
            when: "في الانترفيو، وأول أسبوع في أي مشروع جديد. ومتغيّرش الأداة في نص مشروع شغال من غير سبب قوي، الاتساق أهم من «الأحسن».",
            mistakes: R`تجيب Bloc أو Riverpod لتطبيق شاشتين. أو العكس: global ValueNotifiers وsingletons في تطبيق كبير فالاختبار والـ logout بيبقوا كابوس. وتخلط ٣ أدوات في مشروع واحد. وفي الانترفيو تقول «الأحسن» من غير trade-offs، أو تقول «setState وحش» (مش وحش، هو الصح للـ state المحلية).`
          },
          teach: R`## الكود ده بيعمل إيه؟

عدّاد سلة متشارك بين widget-ين مالهمش علاقة ببعض: [[CartBadge]] بيعرض الرقم على أيقونة السلة، و [[AddButton]] بيزوّده. مفيش package ومفيش setState: [[ValueNotifier]] واحد global، وكل اللي محتاج الرقم بيسمعله.

اتجرّب بـ widget test في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0): شاشة [[Shop]] فيها CartBadge في الـ AppBar و AddButton في النص زي الـ try، وعدّاد بيعدّ الشاشة اتبنت كام مرة.

---

## ١. [[final cartCount = ValueNotifier<int>(0);]]

- بره أي class، فده متغير **global**: أي ملف يعمل import يوصله.
- [[ValueNotifier<int>(0)]]: صندوق فيه [[int]] بيبدأ بـ ٠. لما [[.value]] تتغير لقيمة مختلفة، بيبلّغ كل اللي بيسمعوا.
- [[final]]: المتغير نفسه مش هيشاور على صندوق تاني، بس القيمة اللي جوه بتتغير عادي.

## ٢. [[CartBadge]]

~~~text الكود
return ValueListenableBuilder<int>(
  valueListenable: cartCount,
  builder: (context, count, _) => Badge(
    isLabelVisible: count > 0,
    label: Text('$count'),
    child: const Icon(Icons.shopping_cart),
  ),
);
~~~

- [[ValueListenableBuilder<int>]]: بيسمع لـ [[cartCount]] وينادي [[builder]] أول مرة ومع كل تغيير.
- [[(context, count, _)]]: [[count]] القيمة الحالية، و [[_]] مكان الـ [[child]] اللي مش مستخدمينه.
- [[Badge]]: widget من Material 3 بيحط علامة صغيرة فوق الـ child. [[isLabelVisible: count > 0]] يخفيها لما السلة فاضية، و [[label: Text('$count')]] الرقم ([[$count]] جوه النص = قيمة المتغير).

## ٣. [[AddButton]]

~~~text الكود
FilledButton(onPressed: () => cartCount.value++, child: const Text('Add'))
~~~

[[cartCount.value++]] بيزوّد القيمة، والـ notifier بيبلّغ الـ badge لوحده. الزرار مش محتاج يعرف مين بيعرض الرقم.

---

## ٤. اللي حصل

~~~text الناتج
start: isLabelVisible=false label=0 cartCount=0
after 3 Add: isLabelVisible=true label=3 screenBuilds=1
~~~

- في الأول الـ badge مخفي (٠).
- بعد ٣ ضغطات: ظاهر وفيه ٣، و [[screenBuilds=1]]: الشاشة نفسها متبنتش غير أول مرة. اللي اتبنى هو الـ builder بس.

### المشكلة اللي هتوجعك بعدين

ضفت اختبار تاني بعد الأول في نفس الملف، بيبدأ الشاشة من الأول:

~~~text الناتج
second test starts with: isLabelVisible=true label=3 cartCount=3
~~~

الاختبار التاني بدأ بسلة فيها ٣ من الاختبار اللي قبله! الـ global عايش طول عمر البرنامج، فمفيش حاجة بتصفّره: لا بين الاختبارات، ولا لما المستخدم يعمل logout. ده بالظبط نقطة ٢ و ٣ في الـ sol، وسبب إن Riverpod بيعمل [[ProviderScope]] جديد لكل اختبار.

---

## ٥. إمتى تستخدم إيه (من الدرس)

| الأداة | مناسبة لـ | بتوجع في |
|---|---|---|
| [[setState]] | state جوه widget واحد | مشاركة بين شاشات |
| [[ValueNotifier]] + builder | قيمة صغيرة متشاركة، من غير packages | async و reset و الاختبار |
| Riverpod | بيانات من API، متشاركة، محتاجة اختبار | boilerplate شوية |
| Bloc | فرق كبيرة ومنطق محتاج يتسجّل | كود أكتر |

---

## الخلاصة

- [[ValueNotifier]] + [[ValueListenableBuilder]] جوه Flutter نفسه، وبيبني الـ builder بس.
- الـ global مبيتصفّرش لوحده: الاختبار التاني ورث ٣ من الأول.
- ابدأ بأبسط أداة تكفي، وانقل لـ Riverpod أو Bloc لما البيانات تبقى async ومتشاركة ومحتاجة اختبار.`,
          lines: [
            "مكتبة Material (فيها ValueNotifier و Badge).",
            "قيمة واحدة متشاركة: أي تغيير في value بيبلّغ.",
            "widget بيعرض.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "builder بيعيد بناء نفسه بس لما القيمة تتغير.",
            "المصدر.",
            "القيمة الحالية.",
            "الـ badge يختفي لو صفر.",
            "الرقم.",
            "الأيقونة.",
            "قفلة الـ Badge.",
            "قفلة الـ builder.",
            "قفلة build.",
            "قفلة.",
            "widget تاني في مكان تاني.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "بيغيّر القيمة مباشرة، والـ badge يتحدث لوحده.",
            "قفلة build.",
            "قفلة."
          ],
          sol: R`الـ badge بيظهر بعد أول Add وبيزيد مع كل ضغطة، من غير أي package ومن غير setState في الشاشة.

اللي هيوجعك لما السلة تكبر:
١. الـ async: محتاج loading و error، فهتعمل ValueNotifier تاني لكل واحد وتنسّق بينهم بإيدك. AsyncNotifier بيدّيهم جاهزين.
٢. الاختبار: الـ notifier global، فكل اختبار بيأثر على اللي بعده، ومفيش طريقة نضيفة تبدّل الـ API بـ fake. Riverpod بيعمل ProviderScope جديد لكل اختبار مع overrides.
٣. الـ logout: لازم تفتكر تصفّر كل global بإيدك. في Riverpod: [[ref.invalidate]] أو تعتمد السلة على provider المستخدم فتتصفّر لوحدها لما يتغير.
٤. الـ dispose: الـ global عايش للأبد.

فالانتقال لـ Riverpod (أو Bloc) منطقي أول ما البيانات تبقى جاية من السيرفر أو متشاركة بين شاشات كتير أو محتاجة اختبارات. لحد كده ValueNotifier كفاية.`
        }
      ]
    }
]);
