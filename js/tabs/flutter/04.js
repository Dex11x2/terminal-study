// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "الـ state بـ Riverpod",
      l: 2,
      n: "providers بتشيل البيانات بره الـ widgets، و Notifier يغيّرها، و AsyncNotifier للي جاي من API بحالات loading و error و data",
      items: [
        {
          cmd: "ProviderScope و ref.watch",
          title: "قيمة واحدة كل الشاشات تقراها وتتحدث لما تتغير",
          desc: R`[[Riverpod]] (نسخة 3، الـ package اسمها [[flutter_riverpod]]) بيحط البيانات والخدمات في «providers» متعرّفة كمتغيرات top-level، وأي widget يقراها. [[ProviderScope]] بيلف التطبيق كله ودا المكان اللي القيم بتتخزن فيه فعلًا.

الـ widget بيبقى [[ConsumerWidget]] بدل StatelessWidget، و build بتاخد [[WidgetRef ref]] زيادة. [[ref.watch(provider)]] بيقرا القيمة ويعيد build لو اتغيرت، و [[ref.read(provider)]] بيقراها مرة من غير اشتراك (جوه onPressed).`,
          example: R`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

const apiBase = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');

final httpClientProvider = Provider<http.Client>((ref) {
  final client = http.Client();
  ref.onDispose(client.close);
  return client;
});

final baseUrlProvider = Provider<Uri>((ref) => Uri.parse(apiBase));

class ApiStatus extends ConsumerWidget {
  const ApiStatus({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final base = ref.watch(baseUrlProvider);
    return Text('API: $__{base.host}:$__{base.port}');
  }
}

void main() {
  runApp(const ProviderScope(child: MaterialApp(home: Scaffold(body: Center(child: ApiStatus())))));
}`,
          try: "شغّل مرة عادي ومرة بـ [[flutter run --dart-define=API_URL=http://192.168.1.10:8000]]. وبعدين في main اعمل override: [[ProviderScope(overrides: [baseUrlProvider.overrideWithValue(Uri.parse('https://staging.example.com'))], child: ...)]] وشوف النص. وآخر حاجة: شيل الـ ProviderScope خالص وشغّل.",
          flag: "script",
          deep: {
            why: "setState بيشتغل جوه widget واحد. أول ما شاشتين محتاجين نفس البيانات (السلة، المستخدم الحالي، الإعدادات) هتبدأ تعدّي القيم في constructors من فوق لتحت ٥ مستويات، أو تعمل singletons global يصعب اختبارها. Riverpod بيدّي كل حاجة مكان واحد، وأي widget يقراها مباشرة، وفي الاختبارات تبدّل أي provider بـ fake من غير ما تلمس الكود.",
            how: R`الـ provider نفسه (المتغير [[baseUrlProvider]]) مش القيمة: هو «وصفة» بتقول القيمة بتتعمل إزاي. القيمة بتتعمل أول مرة حد يطلبها (lazy)، وبتتخزن جوه الـ ProviderScope، وكل اللي يطلبها بعد كده ياخد نفس النسخة. عشان كده التعريف global عادي ومفيش مشكلة: الـ state نفسها مش global.

[[ref]] جوه الـ provider بيخليه يعتمد على providers تانية: [[final base = ref.watch(baseUrlProvider);]] جوه provider تاني، ولو base اتغيرت، التاني يتحسب من جديد. ودا graph تبعيات Riverpod بيديره لوحده. و [[ref.onDispose]] بيقفل الموارد لما الـ provider يتشال.

[[ref.watch]] مقابل [[ref.read]]:
- watch في build (أو جوه provider): بيشترك، والـ widget يعيد build مع كل تغيير.
- read في callbacks ([[onPressed]]): قراية مرة واحدة. read جوه build غلط، لأن الـ widget مش هيتحدث.
- [[ref.listen]] في build: ينفّذ حاجة (SnackBar، تنقل) لما القيمة تتغير من غير rebuild.

أنواع الـ widgets: [[ConsumerWidget]] بدل Stateless، و [[ConsumerStatefulWidget]] مع [[ConsumerState]] بدل Stateful (وهناك [[ref]] property متاحة في كل الدوال)، و [[Consumer(builder: ...)]] لو عايز جزء صغير بس يعيد build.

الـ autoDispose: [[Provider.autoDispose(...)]] بيمسح القيمة لما محدش يبقى بيعمل watch عليها (الشاشة اتقفلت). مناسب لبيانات شاشة واحدة.

الـ overrides: [[overrideWithValue]] و [[overrideWith]] في ProviderScope بيبدّلوا provider بقيمة تانية. دي اللي بتستخدمها في الاختبارات (درس flutter test) وفي تجهيز حاجات async قبل runApp (زي SharedPreferences).

وفيه codegen اختياري: [[@riverpod]] على دالة أو class و [[riverpod_generator]] يولّد الـ provider. نفس المفاهيم، والدروس هنا بالكتابة اليدوية عشان تفهم اللي بيتولّد.`,
            when: "أي حاجة أكتر من widget واحد محتاجها، أو خدمة (API client، repository) عايز تبدّلها في الاختبارات. والـ state المحلية البحتة (checkbox في كارت، tab مختار) خليها setState.",
            mistakes: R`تنسى [[ProviderScope]] فوق التطبيق. و [[ref.read]] جوه build فالشاشة متتحدثش. و [[ref.watch]] جوه onPressed (بيشتغل بس بيعمل اشتراكات ملهاش لازمة، والـ lint بيمسكه). وتعمل الـ provider جوه build أو جوه class ([[final p = Provider(...)]] في كل rebuild) فكل مرة provider جديد وقيمة جديدة: الـ providers تتعرّف top-level أو static final.`
          },
          lines: [
            "مكتبة Material.",
            "Riverpod لـ Flutter (من [[flutter pub add flutter_riverpod]]).",
            "http.",
            "العنوان من [[--dart-define]] وقت الـ build، ولو مش موجود عنوان الـ emulator.",
            "provider بيرجّع http.Client واحد للتطبيق كله.",
            "بيتعمل أول مرة حد يطلبه.",
            "[[ref.onDispose]]: اقفل الـ client لما الـ provider يتشال.",
            "القيمة.",
            "قفلة.",
            "provider بسيط بيرجّع الـ base URL.",
            "[[ConsumerWidget]]: زي StatelessWidget بس build بتاخد ref.",
            "constructor.",
            "بتعيد تعريف build.",
            "build بـ ref زيادة.",
            "[[ref.watch]]: اقرا واعمل rebuild لو اتغيرت.",
            "استخدمها عادي.",
            "قفلة build.",
            "قفلة الـ class.",
            "البداية.",
            "[[ProviderScope]] فوق التطبيق كله: هنا القيم بتتخزن.",
            "قفلة main."
          ],
          sol: R`عادي: [[API: 10.0.2.2:3000]]. ومع [[--dart-define=API_URL=http://192.168.1.10:8000]]: [[API: 192.168.1.10:8000]] (القيمة اتحطت وقت الترجمة، ولازم full restart مش hot reload عشان تتغير).

مع الـ override: [[API: staging.example.com:443]]. الـ port 443 لأن [[Uri.port]] بيرجّع الافتراضي للـ scheme لو مش مكتوب. ولاحظ إن ApiStatus نفسه متعدلش خالص.

من غير ProviderScope: التطبيق بيضرب أول ما ApiStatus يعمل build، والرسالة بتقول إن مفيش ProviderScope فوق الـ widget ([[No ProviderScope found]]).`
        },
        {
          cmd: "Notifier",
          title: "سلة مشتريات أي شاشة تضيف فيها وأي شاشة تشوفها",
          desc: R`[[Notifier<T>]] class فيه [[build()]] بترجّع القيمة الأولية، و methods بتغيّر [[state]]. وبتعرّفه بـ [[NotifierProvider]]. الـ widgets بتقرا القيمة بـ [[ref.watch(cartProvider)]]، وبتنادي الدوال بـ [[ref.read(cartProvider.notifier).add(...)]].

الـ state immutable: متعدّلش في الـ list ([[state.add]])، اعمل list جديدة ([[state = [...state, item]]]). Riverpod بيعرف إن حاجة اتغيرت لما [[state]] يتحط بقيمة جديدة.`,
          example: R`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

typedef CartItem = ({String name, double price, int qty});

class CartNotifier extends Notifier<List<CartItem>> {
  @override
  List<CartItem> build() => [];

  void add(String name, double price) {
    final i = state.indexWhere((e) => e.name == name);
    if (i == -1) {
      state = [...state, (name: name, price: price, qty: 1)];
    } else {
      state = [
        for (final (j, e) in state.indexed)
          j == i ? (name: e.name, price: e.price, qty: e.qty + 1) : e,
      ];
    }
  }

  void clear() => state = [];
}

final cartProvider = NotifierProvider<CartNotifier, List<CartItem>>(CartNotifier.new);

final cartTotalProvider = Provider<double>((ref) {
  return ref.watch(cartProvider).fold(0.0, (sum, e) => sum + e.price * e.qty);
});

class CartButton extends ConsumerWidget {
  const CartButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(cartProvider.select((items) => items.length));
    final total = ref.watch(cartTotalProvider);
    return TextButton(
      onPressed: () => ref.read(cartProvider.notifier).add('Tea', 10),
      child: Text('$count items • $__{total.toStringAsFixed(2)} EGP'),
    );
  }
}`,
          try: "حط CartButton في شاشتين مختلفتين (AppBar في الرئيسية وشاشة المنتج) ودوس في واحدة: التانية اتحدثت؟ ضيف [[remove(String name)]] بتقلل الكمية وتشيل العنصر لما يوصل صفر. وبعدين غيّر add لـ [[state.add(...)]] بدل list جديدة وشوف اللي بيحصل للزرار.",
          flag: "script",
          deep: {
            why: "السلة محتاجاها شاشة المنتجات (زرار أضف)، و AppBar (العدد)، وشاشة الدفع (الإجمالي). لو في setState جوه شاشة واحدة، الباقيين مش هيعرفوا. Notifier بيحط الـ state ومنطق تعديلها في class واحد، بعيد عن الـ UI، وتقدر تختبره من غير ما تعمل widget خالص.",
            how: R`[[CartNotifier.new]] tear-off للـ constructor: Riverpod بيعمل الـ Notifier بنفسه أول مرة حد يطلبه، وينادي [[build()]] للقيمة الأولية. و build ممكن تعمل [[ref.watch]] لـ providers تانية، ولو اتغيرت الـ Notifier يتعمله build من جديد.

[[state]] getter و setter: أي [[state = ...]] بيقارن القيمة الجديدة بالقديمة ([[==]] أو [[identical]])، ولو مختلفة يبلّغ كل اللي عاملين watch. عشان كده [[state.add(x)]] مش بيعمل حاجة للـ UI: نفس الـ list (نفس المرجع) اتعدلت من جوه، فمفيش «تغيير» يتبلّغ. وفوق كده الـ list الافتراضية [[[]]] ممكن تبقى const في مواقف تانية فتضرب.

[[select]]: [[ref.watch(cartProvider.select((items) => items.length))]] بيعمل rebuild بس لو العدد اتغير، مش لو كمية عنصر زادت. مفيد للـ widgets اللي بتتعرض كتير.

provider مشتق: [[cartTotalProvider]] بيعمل watch على السلة ويحسب الإجمالي. بيتحسب من جديد تلقائيًا مع كل تغيير في السلة، ومفيش مكان تنسى فيه تحدّث الإجمالي. زي [[useMemo]] أو computed.

[[ref.read(cartProvider.notifier)]] بيرجّع الـ Notifier نفسه عشان تنادي methods. و [[ref.read(cartProvider)]] بيرجّع الـ state.

Riverpod 3: [[StateProvider]] و [[StateNotifierProvider]] و [[ChangeNotifierProvider]] بقوا legacy واتنقلوا لـ [[package:flutter_riverpod/legacy.dart]]. هتلاقيهم في tutorials ومشاريع قديمة، والجديد Notifier.

الاختبار من غير UI:
[[final c = ProviderContainer(); c.read(cartProvider.notifier).add('Tea', 10); expect(c.read(cartTotalProvider), 10);]]`,
            when: "state متشاركة بين شاشات وليها عمليات: سلة، فلاتر بحث، إعدادات المستخدم، مفضلة. ولو البيانات جاية من API: AsyncNotifier (الدرس الجاي).",
            mistakes: R`[[state.add()]] أو [[state[0].qty++]] بدل ما تعمل state جديدة، فالـ UI مبيتحدثش. ومنطق التعديل مكتوب في onPressed بدل method في الـ Notifier، فيتكرر في كل زرار. و [[ref.watch(cartProvider.notifier)]] في build: الـ notifier نفسه مش بيتغير فمفيش فايدة، الـ watch على القيمة. وتنادي method في Notifier من جوه build بتاع widget فتعمل loop.`
          },
          lines: [
            "مكتبة Material.",
            "Riverpod.",
            "record type لعنصر السلة.",
            "Notifier بيشيل [[List<CartItem>]].",
            "بتعيد تعريف build.",
            "القيمة الأولية: سلة فاضية.",
            "إضافة منتج.",
            "موجود قبل كده؟",
            "لأ...",
            "...list جديدة فيها القديم والجديد.",
            "موجود...",
            "...list جديدة برضه.",
            "[[indexed]] بيدّي (index, عنصر).",
            "العنصر ده يزيد كميته، والباقي زي ما هو.",
            "قفلة الـ list.",
            "قفلة الـ if.",
            "قفلة add.",
            "تفضية.",
            "قفلة الـ class.",
            "الـ provider: بيعمل CartNotifier ويشيل الـ state.",
            "provider مشتق: الإجمالي.",
            "بيتحسب من السلة، ويتحسب تاني لوحده لما تتغير.",
            "قفلة.",
            "widget بيقرا ويكتب.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "[[select]]: rebuild لو العدد اتغير بس.",
            "الإجمالي.",
            "الزرار.",
            "[[ref.read]] في callback، و [[.notifier]] عشان تنادي method.",
            "النص.",
            "قفلة الزرار.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`الشاشتين بيتحدثوا مع بعض: الاتنين عاملين watch على نفس الـ provider في نفس الـ ProviderScope. بعد ضغطتين: [[1 items • 20.00 EGP]] (منتج واحد كميته 2، فالعدد 1 والإجمالي 20).

remove: لو الكمية 1 شيل العنصر، غير كده قلّل. ومع [[state.add(...)]]: الزرار مش بيتحدث خالص (الـ list اتعدلت من جوه بس محدش اتبلّغ)، ولو في مكان تاني حصل rebuild لأي سبب هتلاقي الرقم «نط» فجأة. ودا نفس سلوك setState من غير setState.`,
          solCode: R`void remove(String name) {
  state = [
    for (final e in state)
      if (e.name != name) e
      else if (e.qty > 1) (name: e.name, price: e.price, qty: e.qty - 1),
  ];
}`
        },
        {
          cmd: "AsyncNotifier",
          title: "بيانات من API ليها loading و error و data ويتحدثوا بعد الإضافة",
          desc: R`[[AsyncNotifier<T>]] زي Notifier بس [[build()]] بتاعته async: بترجّع [[Future<T>]]، والـ state بتاعه [[AsyncValue<T>]] اللي هو يا [[AsyncLoading]] يا [[AsyncData]] يا [[AsyncError]]. Riverpod بيدير الحالات دي لوحده: أول ما حد يعمل watch يبدأ التحميل، ولو فشل يحط AsyncError.

والـ methods ([[add]] مثلًا) بتكلم الـ API وبعدين تحدّث [[state]] بالنتيجة. والـ repository بيتحقن كـ provider، فتبدّله بـ fake في الاختبارات.`,
          example: R`import 'package:flutter_riverpod/flutter_riverpod.dart';

class Todo {
  const Todo(this.id, this.title);
  final int id;
  final String title;
}

abstract interface class TodoRepo {
  Future<List<Todo>> fetchAll();
  Future<Todo> create(String title);
}

final todoRepoProvider = Provider<TodoRepo>((ref) => throw UnimplementedError('override in main'));

final todosProvider = AsyncNotifierProvider<TodosNotifier, List<Todo>>(TodosNotifier.new);

class TodosNotifier extends AsyncNotifier<List<Todo>> {
  @override
  Future<List<Todo>> build() => ref.watch(todoRepoProvider).fetchAll();

  Future<void> add(String title) async {
    final created = await ref.read(todoRepoProvider).create(title);
    if (!ref.mounted) return;
    state = AsyncData([...?state.value, created]);
  }
}`,
          try: "اعمل [[HttpTodoRepo implements TodoRepo]] بيكلم الـ API (بـ http و fromJson من الدروس اللي فاتت)، واعمل override في main: [[ProviderScope(overrides: [todoRepoProvider.overrideWithValue(HttpTodoRepo())])]]. وبعدين اعمل [[FakeTodoRepo]] بيرجّع لستة ثابتة بعد ثانية، وبدّله: الشاشة اشتغلت من غير أي تعديل؟",
          flag: "script",
          deep: {
            why: "FutureBuilder بيحل الحالات التلاتة لشاشة واحدة. بس في تطبيق حقيقي اللستة دي متشاركة: شاشة الإضافة محتاجة تحدّثها، والـ badge محتاج العدد، و pull-to-refresh محتاج يعيد التحميل، والبيانات لازم تفضل موجودة لو رجعت للشاشة. AsyncNotifier بيعمل كل ده، وبيفصل منطق البيانات عن الـ widgets.",
            how: R`[[build()]] بتتنادى أول مرة حد يعمل watch. ولأنها بتعمل [[ref.watch(todoRepoProvider)]]، لو الـ repo اتغير (مستخدم تاني عمل login مثلًا) الـ build يتنادى تاني لوحده.

[[AsyncValue]] sealed class في Riverpod 3، فتعمل عليه switch exhaustive (الدرس الجاي). وفيه [[value]] (القيمة أو null)، و [[error]]، و [[isLoading]]، و [[hasValue]]، و [[requireValue]] (بيرمي لو مفيش). ولما تعمل refresh، الحالة بتبقى loading بس [[value]] لسه فيها البيانات القديمة، فتقدر تعرضها ومعاها loader صغير بدل ما تفضّي الشاشة.

[[add]]: بنكلم السيرفر الأول، ولو نجح نضيف النتيجة للـ state الموجودة ([[...?state.value]]، علامة ? عشان لو لسه بيحمّل). ولو السيرفر فشل، الـ exception بيطلع من add للـ widget اللي نادى، فيعرض SnackBar، والـ state القديمة سليمة. بديل: [[state = await AsyncValue.guard(() async {...})]] بيحوّل أي exception لـ AsyncError، بس ساعتها اللستة كلها بتختفي وتظهر شاشة خطأ عشان إضافة فشلت، ودا نادرًا اللي عايزه.

[[ref.mounted]] (جديد في Riverpod 3): بعد await ممكن يكون الـ provider اتعمله dispose (autoDispose والشاشة اتقفلت)، فتحديث state ساعتها غلط. زي [[mounted]] في State.

الـ retry التلقائي في Riverpod 3: provider فشل بـ Exception بيتعاد لوحده (بتأخير بيبدأ ٢٠٠ms ويتضاعف لحد ٦.٤ ثانية، لحد ١٠ مرات). لو الخطأ [[Error]] (bug في الكود) مش بيعيد. وتتحكم فيه بـ [[retry:]] على الـ provider أو على ProviderScope، وتقفله بدالة بترجّع null. ودا سبب تاني إن فرق Exception و Error مهم.

[[ref.invalidate(todosProvider)]] بيمسح القيمة ويعيد build. و [[ref.refresh(todosProvider.future)]] نفس الكلام ويرجّع Future تستنى عليه (مناسب لـ [[RefreshIndicator]]).

وللـ parameters (todo واحد بالـ id): [[AsyncNotifierProvider.family]] والـ id بيتبعت للـ constructor: [[ref.watch(todoProvider(42))]].

[[throw UnimplementedError(...)]] في todoRepoProvider: pattern مشهور معناه «الـ provider ده لازم يتعمله override». لو نسيت، الخطأ واضح من أول تشغيل.`,
            when: "أي بيانات جاية من API وأكتر من مكان محتاجها أو بتتعدل: لستة المنتجات، والطلبات، والبروفايل. ولقراية بسيطة من غير methods: [[FutureProvider]] كفاية ([[final p = FutureProvider((ref) => repo.fetch());]]).",
            mistakes: R`[[state = AsyncData([...state.value!, created])]] و [[!]] يضرب لو لسه بيحمّل. وتنسى [[ref.mounted]] بعد await فيطلع error من Riverpod في الـ console. وتحط [[AsyncValue.guard]] على كل عملية فأي فشل صغير يمسح الشاشة. وتعمل [[ref.watch]] جوه [[add]] بدل [[ref.read]]: في methods الـ Notifier استخدم read.`
          },
          lines: [
            "Riverpod.",
            "موديل بسيط (في مشروعك: الموديل بتاع fromJson أو freezed).",
            "constructor.",
            "id.",
            "العنوان.",
            "قفلة.",
            "العقد: أي repository لازم يعرف يجيب ويضيف.",
            "هات الكل.",
            "ضيف واحد.",
            "قفلة.",
            "provider للـ repo، ولازم يتعمله override (حقيقي في main، و fake في الاختبارات).",
            "الـ provider بتاع اللستة: الـ state بتاعه [[AsyncValue<List<Todo>>]].",
            "AsyncNotifier.",
            "بتعيد تعريف build.",
            "async: Riverpod بيحط loading لحد ما الـ Future يخلص، وبعدين data أو error.",
            "method للإضافة.",
            "كلّم السيرفر. لو فشل الـ exception يطلع للي نادى.",
            "الـ provider ممكن يكون اتقفل وانت مستني.",
            "ضيف للموجود (ولو لسه مفيش قيمة ابدأ من فاضي).",
            "قفلة add.",
            "قفلة الـ class."
          ],
          sol: R`HttpTodoRepo بيعمل [[http.get]] ويحوّل بـ [[Todo.fromJson]]، و create بيعمل POST ويحوّل الرد. بعد الـ override الشاشة (الدرس الجاي) بتعرض loader ثم اللستة الحقيقية.

ولما تبدّل بـ FakeTodoRepo: نفس الشاشة بالظبط بتشتغل بالبيانات الثابتة، من غير ما تعدّل TodosNotifier ولا الـ widget. دا الهدف من الـ repository كـ provider: الـ UI مش عارف البيانات جاية منين.

الغلط الشائع: تكتب [[HttpTodoRepo()]] مباشرة جوه build بتاع الـ Notifier بدل ما تقراه من provider، فمش هتعرف تبدّله في الاختبار.`,
          solCode: R`class FakeTodoRepo implements TodoRepo {
  final _items = [const Todo(1, 'buy milk'), const Todo(2, 'call mom')];
  @override
  Future<List<Todo>> fetchAll() async {
    await Future.delayed(const Duration(seconds: 1));
    return _items;
  }
  @override
  Future<Todo> create(String title) async => Todo(_items.length + 1, title);
}

void main() {
  runApp(ProviderScope(
    overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo())],
    child: const MaterialApp(home: Scaffold(body: TodosScreen())),
  ));
}`
        },
        {
          cmd: "loading و error و empty",
          title: "الشاشة ليها ٤ حالات مش واحدة، وكل واحدة ليها شكل",
          desc: R`أي شاشة بتعرض بيانات من الشبكة ليها ٤ حالات: بيحمّل، وحصل خطأ (ومعاه زرار «حاول تاني»)، وجه فاضي (ومعاه رسالة تشرح)، وفيه بيانات. التطبيقات الضعيفة بتعمل الأخيرة بس، والمستخدم يشوف شاشة بيضا ومش عارف ليه.

مع Riverpod 3، [[AsyncValue]] sealed، فتعمل switch بـ patterns: [[AsyncValue(:final value?)]] فيه بيانات، و [[AsyncValue(:final error?)]] فيه خطأ، والباقي loading. و [[RefreshIndicator]] لـ pull-to-refresh.`,
          example: R`// نفس ملف الدرس اللي فات: todosProvider و imports بتوع material و flutter_riverpod
class TodosScreen extends ConsumerWidget {
  const TodosScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todos = ref.watch(todosProvider);
    return RefreshIndicator(
      onRefresh: () => ref.refresh(todosProvider.future),
      child: switch (todos) {
        AsyncValue(:final value?) when value.isEmpty => const EmptyView(),
        AsyncValue(:final value?) => ListView.builder(
            itemCount: value.length,
            itemBuilder: (context, i) => ListTile(title: Text(value[i].title)),
          ),
        AsyncValue(:final error?) => ErrorView(
            message: '$error',
            onRetry: () => ref.invalidate(todosProvider),
          ),
        _ => const Center(child: CircularProgressIndicator()),
      },
    );
  }
}
// EmptyView و ErrorView: ListView فيها أيقونة ونص (وزرار retry في ErrorView).
// لازم تبقى ListView مش Column عشان الـ pull-to-refresh يشتغل وهي فاضية.`,
          try: "اعمل FakeTodoRepo فيه flag اسمه [[fail]]. جرّب ٣ مرات: لستة فاضية، و fail = true، ولستة فيها عناصر. وفي حالة الخطأ غيّر fail لـ false (من زرار debug مثلًا) ودوس «حاول تاني». وبعدين اعمل pull-to-refresh وانت عندك بيانات: البيانات بتختفي؟",
          flag: "script",
          deep: {
            why: "على الموبايل النت بيقطع طول الوقت (مترو، أسانسير، باقة خلصت). الشاشة لازم تقول للمستخدم إيه اللي حصل وإيه اللي يعمله: «مفيش اتصال، حاول تاني» أحسن من loader بيلف للأبد. و«مفيش طلبات لسه، اطلب أول حاجة» أحسن من شاشة فاضية بيفتكرها bug.",
            how: R`ترتيب الـ cases مقصود:
١. فيه بيانات وفاضية: EmptyView.
٢. فيه بيانات: اللستة. ودي بتيجي قبل الخطأ عشان لو refresh فشل والبيانات القديمة موجودة، نفضل نعرضها (وتقدر تعرض SnackBar بالخطأ بـ [[ref.listen]]).
٣. خطأ ومفيش بيانات: ErrorView.
٤. أي حاجة تانية: أول تحميل.

[[:final value?]] الـ [[?]] pattern null-check: يطابق لو value مش null بس، ويدّيك value من غير ?. و [[when value.isEmpty]] شرط إضافي.

[[ref.refresh(todosProvider.future)]] بيعيد build ويرجّع Future بيخلص لما البيانات الجديدة توصل، و RefreshIndicator بيفضّل الـ spinner لحد ما يخلص. أثناء الـ refresh الـ AsyncValue loading بس [[value]] لسه موجودة، فالـ case التاني بيطابق والبيانات مش بتختفي. ولو عايز تعرف إنه بيعمل refresh: [[todos.isRefreshing]].

[[ref.invalidate]] في زرار retry: بيمسح الحالة ويبدأ من الأول (loader كبير)، ودا مناسب بعد خطأ.

الـ RefreshIndicator محتاج ابن scrollable. لو EmptyView كانت Column، السحب مش هيشتغل وهي فاضية. عشان كده ListView حتى لو فيها عنصرين.

رسالة الخطأ: [[$error]] بيعرض النص الخام للـ exception، كويس للتطوير. في الإنتاج اعمل دالة بتحوّل [[ClientException]] لـ «مفيش اتصال بالنت» و [[ApiException]] بـ 401 لـ «سجّل دخول تاني»، وغيره «حصل خطأ، حاول تاني».

البديل الأقدم: [[todos.when(data: ..., error: ..., loading: ...)]] لسه موجود، والـ switch بقى الأوضح مع sealed.

وبدل spinner: skeleton loaders (مستطيلات رمادي بشكل المحتوى) بتحسّس المستخدم إن التحميل أسرع. package [[skeletonizer]] مشهورة ليها.`,
            when: "كل شاشة بتعرض بيانات من الشبكة أو قاعدة البيانات. واعمل EmptyView و ErrorView widgets مشتركة في التطبيق كله عشان الشكل يبقى واحد.",
            mistakes: R`تعرض loader بس، والخطأ مبيظهرش فيفضل يلف. وتنسى حالة الفاضي. وتحط الخطأ قبل البيانات في الـ switch فأي refresh فاشل يمسح الشاشة. و RefreshIndicator حوالين Column أو Center فالسحب مش شغال في حالة الفاضي أو الخطأ. وتعرض [[Exception: SocketException: Failed host lookup...]] للمستخدم.`
          },
          lines: [
            "ConsumerWidget.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "[[AsyncValue<List<Todo>>]].",
            "السحب لتحت يعيد التحميل.",
            "بيستنى لحد ما البيانات الجديدة توصل.",
            "switch expression على الحالة.",
            "فيه بيانات بس فاضية.",
            "فيه بيانات (حتى لو بيعمل refresh أو الـ refresh فشل).",
            "العدد.",
            "كل عنصر.",
            "قفلة.",
            "خطأ ومفيش بيانات.",
            "الرسالة.",
            "retry: امسح وابدأ من الأول.",
            "قفلة.",
            "غير كده: أول تحميل.",
            "قفلة الـ switch.",
            "قفلة RefreshIndicator.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`لستة فاضية: loader ثانية ثم أيقونة ونص «مفيش مهام لسه». و fail = true: loader ثم ErrorView بالرسالة (زي [[Exception: no internet]]). لاحظ إن Riverpod 3 بيعمل retry لوحده في الخلفية مع الـ Exceptions (٢٠٠ms ثم ٤٠٠ms...)، فلو غيّرت fail لـ false ممكن الشاشة تتصلّح لوحدها قبل ما تدوس. زرار «حاول تاني» بيعمل invalidate فيبدأ فورًا.

الـ pull-to-refresh مع بيانات: البيانات بتفضل ظاهرة والـ spinner بتاع السحب فوق، لأن [[value]] لسه موجودة أثناء الـ loading والـ case التاني مطابق. لو كنت حاطط [[AsyncLoading() => spinner]] كأول case، الشاشة كانت هتفضى مع كل refresh.`,
          solCode: R`class FakeTodoRepo implements TodoRepo {
  FakeTodoRepo(this.items, {this.fail = false});
  final List<Todo> items;
  bool fail;
  @override
  Future<List<Todo>> fetchAll() async {
    await Future.delayed(const Duration(seconds: 1));
    if (fail) throw Exception('no internet');
    return items;
  }
  @override
  Future<Todo> create(String title) async => Todo(items.length + 1, title);
}`
        },
        {
          cmd: "Provider و Bloc",
          title: "هتقابل Provider و Bloc في شغل حد تاني، فلازم تقراهم",
          desc: R`Riverpod مش الوحيد. [[provider]] (نفس المؤلف، أقدم) بيحط [[ChangeNotifier]] في الشجرة، وبتقراه بـ [[context.watch<CartModel>()]]. و [[flutter_bloc]] بيفصل الأحداث عن الحالة: [[Cubit]] فيه methods بتعمل [[emit(state)]]، و [[Bloc]] الكامل بياخد events ويطلّع states.

المثال نفس السلة بالاتنين جنب بعض عشان تشوف الفرق. هتقابلهم في مشاريع موجودة وفي الانترفيوهات، فلازم تعرف تقرا الكود بتاعهم وتختار ما بينهم.`,
          example: R`import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';

class CartModel extends ChangeNotifier {
  final _items = <String>[];
  int get count => _items.length;
  void add(String item) {
    _items.add(item);
    notifyListeners();
  }
}

class CartCubit extends Cubit<List<String>> {
  CartCubit() : super(const []);
  void add(String item) => emit([...state, item]);
}

class CartPage extends StatelessWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    final providerCount = context.watch<CartModel>().count;
    return Column(
      children: [
        Text('Provider: $providerCount'),
        BlocBuilder<CartCubit, List<String>>(
          builder: (context, items) => Text('Bloc: $__{items.length}'),
        ),
        FilledButton(
          onPressed: () {
            context.read<CartModel>().add('tea');
            context.read<CartCubit>().add('tea');
          },
          child: const Text('Add tea'),
        ),
      ],
    );
  }
}

void main() {
  runApp(
    MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => CartModel())],
      child: BlocProvider(
        create: (_) => CartCubit(),
        child: const MaterialApp(home: Scaffold(body: CartPage())),
      ),
    ),
  );
}`,
          try: "اعمل [[flutter pub add provider flutter_bloc]] وشغّل. بعدين في CartModel شيل [[notifyListeners()]] ودوس: أنهي عدّاد وقف؟ رجّعه، وفي الـ Cubit غيّر الـ emit لـ [[state.add(item); emit(state);]]: أنهي عدّاد وقف دلوقتي؟",
          flag: "script",
          deep: {
            why: "مشاريع Flutter اللي هتشتغل عليها في شركة معمولة بأدوات مختلفة حسب سنة ما اتبدأت: كتير بـ Provider (كان الموصى بيه في docs Flutter سنين)، وكتير في الشركات الكبيرة بـ Bloc. ولو مش فاهم الفكرة ورا كل واحد هتتوه في الكود، وفي الانترفيو السؤال شبه أكيد: «بتستخدم إيه في الـ state management وليه؟».",
            how: R`Provider: [[ChangeNotifier]] class عادي فيه state mutable، وبعد كل تعديل [[notifyListeners()]] (من Flutter نفسه، مش من الـ package). و [[ChangeNotifierProvider]] بيحطه في الشجرة فوق الشاشات. [[context.watch<T>()]] بيقرا ويعمل rebuild، و [[context.read<T>()]] للـ callbacks، و [[context.select]] لجزء. العيوب: معتمد على الشجرة (لازم الـ provider فوق الـ widget، ولو لأ [[ProviderNotFoundException]] وقت التشغيل)، ونسيان notifyListeners سهل، ومفيش async state جاهزة.

Bloc: الـ state immutable، والتغيير الوحيد بـ [[emit]]. [[Cubit]] الشكل البسيط (methods بتعمل emit). و [[Bloc]] الكامل: الـ UI بيبعت events ([[bloc.add(AddItem('tea'))]]) و [[on<AddItem>((event, emit) => ...)]] بيحوّلها لـ states. ودا بيدّيك log كامل لكل event و state (BlocObserver)، وسهل تختبره (package bloc_test)، بس الكود أطول. [[BlocBuilder]] للبناء، و [[BlocListener]] للـ side effects (تنقل، SnackBar)، و [[BlocConsumer]] الاتنين.

الـ emit بيقارن بـ [[==]]: لو بعت نفس الـ object (بعد ما عدّلته من جوه) مفيش rebuild. ودا ليه الـ Bloc states غالبًا بـ freezed أو equatable.

Riverpod (الدروس اللي فاتت): مش معتمد على الشجرة (الـ providers global، والـ state في ProviderScope)، فمفيش ProviderNotFoundException، والخطأ بيتمسك وقت الترجمة. و AsyncValue جاهزة للـ async. و overrides سهلة للاختبار.

المقارنة المختصرة:
- مشروع جديد: Riverpod (أو Bloc لو الفريق متعود عليه).
- Provider: لسه شغال ومدعوم، بس للمشاريع الموجودة.
- Bloc: لما عايز قواعد صارمة وفريق كبير وكل تغيير يتسجّل كـ event.
- setState و ValueNotifier: state محلية، ودايمًا الأبسط أحسن لو كفاية (درس «state management» في المستوى ٣).`,
            when: "Provider و Bloc لما تشتغل على مشروع معمول بيهم، أو فريق اختارهم. ومتخلطش أكتر من واحد في مشروع جديد من غير سبب.",
            mistakes: R`تنسى [[notifyListeners()]] بعد التعديل في ChangeNotifier. وتعمل emit لنفس الـ list بعد ما عدّلتها فالـ Bloc مش بيعمل rebuild. و [[context.watch]] جوه onPressed (بيضرب في Provider: [[Tried to listen to a value exposed with provider, from outside of the widget tree]]). وتحط ChangeNotifierProvider تحت الشاشة اللي محتاجاه فيطلع [[ProviderNotFoundException]]. وفي الانترفيو تقول «Bloc أحسن» أو «Riverpod أحسن» من غير trade-offs.`
          },
          lines: [
            "مكتبة Material.",
            "flutter_bloc.",
            "provider.",
            "Provider: class عادي بيورث ChangeNotifier.",
            "state mutable جوه.",
            "getter للعدد.",
            "تعديل.",
            "عدّل الـ list نفسها...",
            "...وبلّغ كل اللي سامعين. من غيرها الـ UI مش هيعرف.",
            "قفلة.",
            "قفلة الـ class.",
            "Bloc: Cubit بـ state immutable.",
            "القيمة الأولية بتتبعت لـ super.",
            "[[emit]] بـ list جديدة.",
            "قفلة.",
            "شاشة عادية StatelessWidget.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "Provider: [[context.watch]] بيقرا ويعمل rebuild.",
            "عمود.",
            "العيال.",
            "عدّاد Provider.",
            "Bloc: BlocBuilder بيعمل rebuild للجزء ده بس.",
            "الـ state هي اللستة.",
            "قفلة.",
            "زرار واحد بيضيف في الاتنين.",
            "callback.",
            "[[context.read]] في callbacks (نفس القاعدة في الاتنين).",
            "الـ Cubit.",
            "قفلة الـ callback.",
            "النص.",
            "قفلة الزرار.",
            "قفلة العيال.",
            "قفلة العمود.",
            "قفلة build.",
            "قفلة الـ class.",
            "البداية.",
            "runApp.",
            "providers فوق الشجرة.",
            "ChangeNotifierProvider بيعمل CartModel ويعمله dispose.",
            "BlocProvider بيعمل الـ Cubit ويقفله.",
            "الـ Cubit.",
            "التطبيق تحتهم.",
            "قفلة BlocProvider.",
            "قفلة MultiProvider.",
            "قفلة runApp.",
            "قفلة main."
          ],
          sol: R`بعد ضغطتين: [[Provider: 2]] و [[Bloc: 2]].

من غير [[notifyListeners()]]: عدّاد Provider بيفضل 0 (الـ list بتكبر جوه بس محدش اتبلّغ)، وعدّاد Bloc بيزيد عادي. وأول ما Bloc يعمل emit، ليه مش بيتحدث Provider؟ لأن BlocBuilder بيعمل rebuild لنفسه بس، مش للشاشة كلها.

ومع [[state.add(item); emit(state);]]: عدّاد Bloc بيفضل 0. الـ Cubit بيقارن الـ state الجديدة بالقديمة، ولقاهم نفس الـ object، فمعملش emit أصلًا. (والـ [[const []]] الأولية كمان هتضرب [[Unsupported operation: Cannot add to an unmodifiable list]] في أول add). وعدّاد Provider شغال. نفس الدرس بتاع Notifier في Riverpod: الـ state immutable.`
        }
      ]
    },
    {
      t: "التخزين والـ backend بتاعك",
      l: 2,
      n: "إعدادات صغيرة في shared_preferences، وبيانات كتير في SQLite، والتوكن في secure storage، والـ API اللي انت كاتبه بـ Express أو FastAPI",
      items: [
        {
          cmd: "shared_preferences",
          title: "تفتكر إعدادات المستخدم بعد ما يقفل التطبيق",
          desc: R`[[shared_preferences]] key-value بسيط بيتحفظ على الجهاز: الثيم، واللغة، وهل شاف شاشة التعريف. زي localStorage في المتصفح. بيخزّن [[String]] و [[int]] و [[double]] و [[bool]] و [[List<String>]] بس.

من نسخة 2.3 فيه ٣ APIs: [[SharedPreferences]] القديم (هيتعمله deprecate)، و [[SharedPreferencesAsync]] (كل حاجة async ومن غير cache)، و [[SharedPreferencesWithCache]] (قراية sync من cache). للكود الجديد استخدم واحد من الجداد.`,
          example: R`import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsStore {
  final _prefs = SharedPreferencesAsync();

  Future<ThemeMode> loadTheme() async {
    final raw = await _prefs.getString('theme');
    return ThemeMode.values.asNameMap()[raw] ?? ThemeMode.system;
  }

  Future<void> saveTheme(ThemeMode mode) => _prefs.setString('theme', mode.name);

  Future<bool> seenOnboarding() async => await _prefs.getBool('onboarding_done') ?? false;

  Future<void> markOnboardingDone() => _prefs.setBool('onboarding_done', true);
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final store = SettingsStore();
  final theme = await store.loadTheme();
  runApp(MaterialApp(themeMode: theme, darkTheme: ThemeData.dark(), home: const Placeholder()));
}`,
          try: "اعمل شاشة فيها [[SegmentedButton<ThemeMode>]] (فاتح، غامق، النظام) بتنادي saveTheme وتغيّر الثيم فورًا. اقفل التطبيق خالص وافتحه: فاكر اختيارك؟ وبعدين امسح [[WidgetsFlutterBinding.ensureInitialized()]] وشغّل.",
          flag: "script",
          deep: {
            why: "المستخدم اختار الوضع الغامق، قفل التطبيق، فتحه لقاه فاتح. أو شاشة التعريف بتظهر كل مرة. الحاجات الصغيرة دي لازم تتحفظ، وقاعدة بيانات كاملة ليها كتير.",
            how: R`تحت الغطا: على Android الـ APIs الجديدة بتستخدم DataStore Preferences (الموصى بيه من Google)، والقديم SharedPreferences بتاع Android. على iOS [[NSUserDefaults]]. وعلى الويب localStorage. يعني بيانات عادية مش مشفّرة: أي حد معاه root أو backup للجهاز يقراها.

الفرق بين الـ APIs:
- [[SharedPreferencesAsync]]: كل قراية await، ودايمًا بتجيب آخر قيمة من التخزين الحقيقي. أبسط وأصح.
- [[SharedPreferencesWithCache]]: [[await SharedPreferencesWithCache.create(cacheOptions: SharedPreferencesWithCacheOptions(allowList: {'theme'}))]] مرة، وبعدين [[getString]] sync من الذاكرة. مفيد لو بتقرا كتير في build.
- [[SharedPreferences.getInstance()]]: القديم، هتلاقيه في كل الأمثلة القديمة، وليه نفس فكرة الـ cache.

خلي بالك: الـ APIs الجديدة على Android بتخزّن في مكان مختلف عن القديم، فلو بتغيّر API في تطبيق منشور لازم تنقل البيانات (الـ README بتاع الـ package فيه migration utility).

[[WidgetsFlutterBinding.ensureInitialized()]]: أي plugin بيكلم الـ native (shared_preferences، sqflite، secure storage) محتاج الـ binding يبقى جاهز. لو هتنادي حاجة زي دي في main قبل runApp، لازم السطر ده الأول.

[[ThemeMode.values.asNameMap()]] نفس فكرة enhanced enum: بنخزّن [[.name]] (نص ثابت) مش [[.index]]، ولو القيمة مش معروفة نرجع للافتراضي.

ومع Riverpod: اعمل provider للـ store، والثيم نفسه في Notifier بيحمّل من الـ store في build ويحفظ في method.`,
            when: "إعدادات وتفضيلات صغيرة: ثيم، لغة، آخر تاب مفتوح، «متعرضش ده تاني». مش لبيانات المستخدم الحقيقية (قواعد بيانات) ولا للتوكنز والباسوردات (secure storage).",
            mistakes: R`تخزّن التوكن أو الباسورد فيه: مش مشفّر. وتخزّن JSON كبير (لستة المنتجات كلها) كـ String: بطيء ومش معمول لكده. وتنسى ensureInitialized فيطلع error عن الـ binding. وتقرا بـ [[.index]] بتاع enum. وتستخدم الـ API القديم والجديد مع بعض فتلاقي القيم «اختفت» لأنهم بيخزّنوا في أماكن مختلفة على Android.`
          },
          lines: [
            "مكتبة Material (فيها ThemeMode).",
            "shared_preferences.",
            "class بيلف التخزين عشان باقي التطبيق ميعرفش التفاصيل.",
            "الـ API الجديد: كل حاجة async ومن غير cache.",
            "تحميل الثيم.",
            "النص المتخزّن أو null لو أول مرة.",
            "من النص للـ enum، ولو مش معروف: النظام.",
            "قفلة.",
            "حفظ: الاسم مش الـ index.",
            "هل شاف شاشة التعريف؟ لو مفيش قيمة يبقى لأ.",
            "علّم إنه شافها.",
            "قفلة الـ class.",
            "main بقت async.",
            "لازم قبل أي plugin قبل runApp.",
            "الـ store.",
            "حمّل الثيم قبل أول frame، فمفيش «وميض» بالثيم الغلط.",
            "شغّل بالثيم المحفوظ.",
            "قفلة main."
          ],
          sol: R`الشاشة: [[SegmentedButton<ThemeMode>]] بـ ٣ segments، و onSelectionChanged بينادي [[saveTheme]] ويحدّث متغير الثيم (في State فوق MaterialApp أو في Notifier). بعد القفل والفتح التطبيق بيفتح على الثيم اللي اخترته من أول frame، لأن main بيقراه قبل runApp.

من غير ensureInitialized: بيضرب قبل ما التطبيق يظهر برسالة إن الـ binding مش متعمله initialize ([[Binding has not yet been initialized]]) وبتقترح عليك تنادي [[WidgetsFlutterBinding.ensureInitialized()]].`,
          solCode: R`SegmentedButton<ThemeMode>(
  segments: const [
    ButtonSegment(value: ThemeMode.light, label: Text('فاتح')),
    ButtonSegment(value: ThemeMode.dark, label: Text('غامق')),
    ButtonSegment(value: ThemeMode.system, label: Text('النظام')),
  ],
  selected: {_theme},
  onSelectionChanged: (s) {
    setState(() => _theme = s.first);
    store.saveTheme(s.first);
  },
)`
        },
        {
          cmd: "sqflite",
          title: "قاعدة بيانات SQLite جوه الموبايل للبيانات الكتير",
          desc: R`لما البيانات تكبر وتحتاج بحث وترتيب (ملاحظات، رسايل offline، cache للمنتجات)، shared_preferences مش كفاية. [[sqflite]] بيدّيك SQLite حقيقي على Android و iOS: جداول، و SQL، و indexes. نفس الـ SQL اللي في «تاب SQL و Prisma».

[[openDatabase]] بيفتح الملف أو يعمله، و [[onCreate]] بيعمل الجداول أول مرة، و [[onUpgrade]] بيعدّل الجداول لما تزوّد [[version]]. وفيه دوال جاهزة: [[insert]] و [[query]] و [[update]] و [[delete]]، و [[rawQuery]] لو عايز SQL بإيدك.`,
          example: R`import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart';

class NotesDb {
  NotesDb._(this._db);
  final Database _db;

  static Future<NotesDb> open() async {
    final path = p.join(await getDatabasesPath(), 'notes.db');
    final db = await openDatabase(
      path,
      version: 2,
      onCreate: (db, version) async {
        await db.execute('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, pinned INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)');
      },
      onUpgrade: (db, oldVersion, newVersion) async {
        if (oldVersion < 2) await db.execute('ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0');
      },
    );
    return NotesDb._(db);
  }

  Future<int> add(String title) => _db.insert('notes', {'title': title, 'created_at': DateTime.now().toIso8601String()});

  Future<List<Map<String, Object?>>> search(String q) =>
      _db.query('notes', where: 'title LIKE ?', whereArgs: ['%$q%'], orderBy: 'pinned DESC, id DESC');

  Future<int> remove(int id) => _db.delete('notes', where: 'id = ?', whereArgs: [id]);
}`,
          try: "ضيف [[togglePin(int id)]] بـ [[update]]. وبعدين زوّد الـ version لـ 3 وضيف عمود [[body TEXT]] في onUpgrade (وفي onCreate كمان). جرّب على تطبيق فيه بيانات قديمة: البيانات فضلت؟ وبعدين جرّب تبني الـ where كده: [[where: \"title LIKE '%$q%'\"]] وابحث بـ [[' OR 1=1 --]].",
          flag: "script",
          deep: {
            why: "تطبيق ملاحظات أو قايمة مهام أو تطبيق لازم يشتغل من غير نت محتاج يخزّن مئات أو آلاف السجلات ويدوّر فيها ويرتّبها بسرعة. SQLite موجود جوه كل موبايل أصلًا، ومعمول بالظبط لكده.",
            how: R`[[getDatabasesPath()]] المكان الصح على كل نظام، و [[p.join]] من package path بيبني المسار. الملف بيفضل موجود لحد ما التطبيق يتمسح.

الـ migrations: الـ [[version]] رقم انت بتزوّده مع كل تغيير في الجداول. تطبيق جديد: onCreate بس (بالشكل الأحدث). تطبيق قديم عنده version 1: onUpgrade بيتنادى بـ oldVersion = 1، فبتطبّق التغييرات خطوة خطوة ([[if (oldVersion < 2)]] ثم [[if (oldVersion < 3)]]). لازم onCreate يبقى دايمًا بالشكل النهائي، و onUpgrade يوصّل أي نسخة قديمة لنفس الشكل. ودا نفس منطق migrations في Prisma بس بإيدك.

[[whereArgs]] و [[?]]: القيم بتتبعت منفصلة عن الـ SQL (parameterized)، فمفيش SQL injection. متبنيش الـ where بـ string interpolation أبدًا.

SQLite مفيهوش bool ولا datetime: bool بيبقى INTEGER (0 و 1)، والتاريخ TEXT بـ ISO 8601 (بيترتّب صح كنص) أو INTEGER millis.

النتايج [[List<Map<String, Object?>>]]، فبتحوّلها لموديل بـ fromMap زي fromJson.

[[transaction]] لو هتعمل كذا عملية لازم تنجح كلها أو متحصلش: [[await db.transaction((txn) async { ... })]]، وجواها استخدم [[txn]] مش [[db]]. و [[batch()]] لإدخال مئات الصفوف مرة واحدة أسرع بكتير من loop.

البديل: [[drift]] (كان اسمه moor) فوق SQLite: الجداول بتتعرّف بـ Dart، والـ queries type-safe بتتولّد بـ build_runner، و migrations بأدوات، و [[watch()]] بيرجّع Stream يتحدث لوحده لما الجدول يتغير. أحسن لمشروع كبير، و sqflite أبسط وأقرب لـ SQL اللي انت عارفه.

sqflite مش شغال على الويب ولا في [[flutter test]] العادي (محتاج الـ native). للاختبار على الكمبيوتر فيه [[sqflite_common_ffi]].`,
            when: "بيانات كتير أو ليها علاقات أو محتاجة بحث: وضع offline، و cache للمحتوى، وتطبيقات ملاحظات ومهام. لو كام إعداد: shared_preferences. ولو البيانات أصلًا على السيرفر ومش محتاج offline: متعملش نسخة محلية من غير سبب.",
            mistakes: R`SQL injection بـ interpolation في where. وتغيّر الجدول في onCreate وتنسى onUpgrade، فالناس اللي عندهم التطبيق يضربوا بـ [[no such column]] والتطبيقات الجديدة سليمة (فمتلاقيش الـ bug عندك). وتفتح الـ database مع كل عملية بدل مرة واحدة. وتنادي [[db]] جوه transaction بدل [[txn]] فيحصل deadlock.`
          },
          lines: [
            "بناء المسارات.",
            "sqflite.",
            "class بيلف الـ database.",
            "constructor private: الطريقة الوحيدة [[open()]].",
            "الاتصال.",
            "دالة static async بتفتح وترجّع object جاهز.",
            "مسار الملف في مكان قواعد البيانات بتاع النظام.",
            "افتح أو اعمل.",
            "المسار.",
            "رقم شكل الجداول الحالي.",
            "أول تسطيب: اعمل الجداول بآخر شكل.",
            "SQL عادي.",
            "قفلة.",
            "تطبيق قديم بـ version أقل: طبّق الفرق بس.",
            "من 1 لـ 2: ضيف العمود.",
            "قفلة.",
            "قفلة openDatabase.",
            "الـ object.",
            "قفلة open.",
            "insert بـ Map، وبيرجّع الـ id الجديد.",
            "بحث.",
            "[[?]] و whereArgs: القيمة منفصلة عن الـ SQL، فمفيش injection.",
            "مسح بالـ id.",
            "قفلة الـ class."
          ],
          sol: R`togglePin: [[rawUpdate('UPDATE notes SET pinned = 1 - pinned WHERE id = ?', [id])]] أو update بقيمة محسوبة. الـ migration لـ 3: [[if (oldVersion < 3) await db.execute('ALTER TABLE notes ADD COLUMN body TEXT');]] في onUpgrade، وتضيف [[body TEXT]] لجملة CREATE في onCreate. البيانات القديمة بتفضل، والعمود الجديد null فيها.

الـ injection: مع [[where: "title LIKE '%$q%'"]] والبحث [[' OR 1=1 --]]، الـ SQL بقى [[title LIKE '%' OR 1=1 --%']] فبيرجع كل الملاحظات. مع whereArgs بيدوّر على النص ده حرفيًا ومش بيلاقي حاجة. نفس درس SQL injection في «تاب الأمان».`,
          solCode: R`Future<int> togglePin(int id) =>
    _db.rawUpdate('UPDATE notes SET pinned = 1 - pinned WHERE id = ?', [id]);

// في open():
version: 3,
onCreate: (db, version) async {
  await db.execute('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, body TEXT, pinned INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)');
},
onUpgrade: (db, oldVersion, newVersion) async {
  if (oldVersion < 2) await db.execute('ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0');
  if (oldVersion < 3) await db.execute('ALTER TABLE notes ADD COLUMN body TEXT');
},`
        },
        {
          cmd: "flutter_secure_storage",
          title: "مكان آمن للتوكن بدل shared_preferences",
          desc: R`التوكن (JWT أو refresh token) هو مفتاح حساب المستخدم: لو اتسرق، أي حد يدخل بيه. [[flutter_secure_storage]] بيخزّنه في المكان الآمن بتاع النظام: [[Keychain]] على iOS، وعلى Android مشفّر بمفتاح في [[Android Keystore]] (مفتاح مبيطلعش من الـ hardware).

الاستخدام زي key-value عادي بس كله async: [[write]] و [[read]] و [[delete]] و [[deleteAll]]. والقيم String بس.`,
          example: R`import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TokenStore {
  const TokenStore();
  static const _storage = FlutterSecureStorage();

  Future<void> save(String access, String refresh) async {
    await _storage.write(key: 'access_token', value: access);
    await _storage.write(key: 'refresh_token', value: refresh);
  }

  Future<String?> get access => _storage.read(key: 'access_token');

  Future<void> clear() => _storage.deleteAll();
}`,
          try: "في main قبل runApp اقرا التوكن ([[await const TokenStore().access]]) وحطه في الـ session بتاع درس redirect، فلو فيه توكن التطبيق يفتح على الرئيسية مباشرة. سجّل دخول، اقفل التطبيق خالص وافتحه. وبعدين امسح التطبيق من الموبايل وسطّبه تاني: التوكن لسه موجود؟",
          flag: "script",
          deep: {
            why: "shared_preferences ملف XML أو DataStore عادي في فولدر التطبيق: على موبايل عليه root، أو من backup، أو من malware بصلاحيات عالية، التوكن بيتقري كنص. الـ secure storage بيشفّر بمفاتيح محمية من الـ hardware، فحتى لو الملف اتسحب مش هيتفك.",
            how: R`على Android من نسخة 10 من الـ package: التشفير بقى RSA OAEP لتغليف المفتاح + AES-GCM للبيانات، والمفتاح في Android Keystore، والخيار القديم [[encryptedSharedPreferences]] (مبني على مكتبة Jetpack Security اللي اتعملها deprecate) بقى deprecated ونسخة 10 بتنقل بياناته. ونسخة 11 (الحالية) شالته خالص، ورفعت أقل Android مدعوم لـ 7.0 (minSdk 24). فلو جاي من نسخة أقدم من 10، عدّي على 10 الأول عشان البيانات تتنقل. وفيه [[AndroidOptions.biometric(...)]] لو عايز بصمة قبل القراية.

على iOS: Keychain. وخلي بالك إن Keychain بيفضل موجود حتى بعد ما التطبيق يتمسح (سلوك النظام)، عكس Android. فمستخدم مسح التطبيق وسطّبه تاني ممكن يلاقي نفسه عامل login. الحل الشائع: flag في shared_preferences اسمه [[first_run]]؛ لو مش موجود امسح الـ secure storage.

Android auto backup: البيانات المشفّرة ممكن تترجع من backup Google Drive على جهاز جديد، بس المفتاح مش هيترجع (في الـ Keystore)، فالقراية تفشل. الـ package بيعمل [[resetOnError]] (افتراضيًا true) فبيمسح بدل ما يضرب. أو استثني ملفاتها من الـ backup في AndroidManifest.

على الويب: شغال بس على HTTPS أو localhost، وفي الآخر مخزّن في المتصفح، فمش بنفس الأمان. التوكنز على الويب الأحسن تبقى httpOnly cookies (درس res.cookie في «تاب Backend بـ Node»).

async: كل قراية بتروح للـ native، فمتقراش في build. اقرا مرة في main أو في provider وخزّن في الذاكرة.

[[static const _storage = FlutterSecureStorage();]]: الـ class نفسه خفيف ومفيهوش state، فـ const عادي.`,
            when: "أي حاجة لو اتسرقت تدخل على حساب: access و refresh tokens، و API keys خاصة بالمستخدم، و PIN. والإعدادات العادية: shared_preferences.",
            mistakes: R`التوكن في shared_preferences. وتقرا من secure storage في كل request (بطيء): اقراه مرة وخزّنه في الذاكرة وحدّثه لما يتغير. وتنسى تمسحه في logout. وتفتكر إن مسح التطبيق على iOS بيمسحه. وتحط API key بتاع خدمة (Stripe secret، OpenAI) في التطبيق أصلًا، مشفّر أو لأ: أي حاجة في الـ APK ممكن تتطلع، الـ secrets دي مكانها السيرفر.`
          },
          lines: [
            "الـ package.",
            "class بيلف التخزين.",
            "const: مفيش state.",
            "instance واحد، و const لأنه خفيف.",
            "حفظ التوكنين بعد login.",
            "access token.",
            "refresh token.",
            "قفلة.",
            "قراية (null لو مفيش).",
            "logout: امسح الكل.",
            "قفلة."
          ],
          sol: R`في main: [[WidgetsFlutterBinding.ensureInitialized();]] ثم [[session.value = await const TokenStore().access;]] ثم runApp. لو فيه توكن، الـ redirect مش هيحوّل لـ login، والتطبيق يفتح على الرئيسية على طول.

بعد القفل والفتح: فاضل عامل login. وبعد المسح والتسطيب: على Android التوكن اتمسح (بيانات التطبيق اتمسحت)، وعلى iOS ممكن تلاقيه لسه موجود لأن الـ Keychain بيفضل. دا مش bug في كودك، دا سلوك iOS، وحله flag الـ first_run في shared_preferences.`,
          solCode: R`Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  session.value = await const TokenStore().access;
  runApp(MaterialApp.router(routerConfig: router));
}`
        },
        {
          cmd: "API client بالتوكن",
          title: "التطبيق يكلم الـ backend اللي كتبته بـ Express أو FastAPI",
          desc: R`دا الدرس اللي بيربط Flutter بباقي الموقع: الـ backend اللي عملته في «تاب Backend بـ Node» أو «تاب Python و FastAPI» فيه [[/auth/login]] بيرجّع توكن، وباقي الـ routes محمية بـ [[Authorization: Bearer <token>]]. التطبيق محتاج class واحد بيعمل login ويخزّن التوكن، ويحطه في كل طلب، ولو السيرفر رد 401 يمسح التوكن ويرجّع المستخدم لشاشة الدخول.

وعنوان السيرفر مش متكتب في الكود: [[String.fromEnvironment('API_URL')]] بيتحدد وقت الـ build بـ [[--dart-define]]. وعلى الـ emulator الـ localhost بتاع جهازك هو [[10.0.2.2]].`,
          example: R`import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

const apiUrl = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');

class UnauthorizedException implements Exception {}

class ApiClient {
  ApiClient({http.Client? client, this.onUnauthorized}) : _http = client ?? http.Client();
  final http.Client _http;
  final void Function()? onUnauthorized;
  final _storage = const FlutterSecureStorage();

  Future<void> login(String email, String password) async {
    final res = await _http.post(
      Uri.parse('$apiUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (res.statusCode != 200) throw UnauthorizedException();
    final {'token': String token} = jsonDecode(res.body) as Map<String, dynamic>;
    await _storage.write(key: 'token', value: token);
  }

  Future<dynamic> get(String path) async {
    final token = await _storage.read(key: 'token');
    final res = await _http.get(Uri.parse('$apiUrl$path'), headers: {
      'Accept': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    });
    if (res.statusCode == 401) {
      await _storage.delete(key: 'token');
      onUnauthorized?.call();
      throw UnauthorizedException();
    }
    if (res.statusCode >= 400) throw http.ClientException('HTTP $__{res.statusCode}', res.request?.url);
    return jsonDecode(res.body);
  }

  Future<void> logout() => _storage.delete(key: 'token');
}`,
          try: "شغّل الـ backend بتاعك (Express على 3000 أو [[fastapi dev]] على 8000) واتأكد إن [[/auth/login]] بيرجّع [[{\"token\": \"...\"}]]. شغّل التطبيق على الـ emulator بـ [[--dart-define=API_URL=http://10.0.2.2:3000]] واعمل login وهات بيانات route محمي. وبعدين جرّب على موبايل حقيقي على نفس الـ WiFi: إيه اللي لازم يتغير؟ وآخر حاجة: غيّر التوكن المتخزّن لقيمة غلط وشوف اللي بيحصل.",
          flag: "script",
          deep: {
            why: "من غير class واحد للـ API، كل شاشة بتكتب الـ headers والـ base URL وفحص 401 بنفسها، وأول ما التوكن ينتهي نص الشاشات تفضل تعرض «خطأ» والنص التاني يرجّع login. ودا الجزء اللي بيحوّل التطبيق من «demo» لتطبيق شغال مع الـ backend الحقيقي بتاعك.",
            how: R`عنوان السيرفر حسب المكان:
- Android emulator: [[10.0.2.2]] هو الـ localhost بتاع الكمبيوتر.
- iOS simulator: [[localhost]] شغال عادي.
- موبايل حقيقي: IP الكمبيوتر على الشبكة ([[ipconfig]] أو [[ip a]])، والسيرفر لازم يسمع على [[0.0.0.0]] مش 127.0.0.1 بس ([[app.listen(3000, '0.0.0.0')]] في Express، و [[fastapi dev --host 0.0.0.0]] أو [[uvicorn --host 0.0.0.0]])، والـ firewall يسمح.
- أو [[adb reverse tcp:3000 tcp:3000]] فالموبايل المتوصل USB يشوف localhost بتاع الكمبيوتر.
- الإنتاج: [[https://api.yourdomain.com]] من [[--dart-define-from-file=env/prod.json]] (درس dart-define في المستوى ٣).

HTTP من غير S: Android بيمنع cleartext في release (وفي debug التيمبليت بتاع Flutter بيسمح). للتطوير بس: [[android:usesCleartextTraffic="true"]] في manifest الـ debug. في الإنتاج HTTPS دايمًا.

CORS: مش موجود في الموبايل (دا قيد متصفح)، فالتطبيق على Android هيشتغل حتى لو السيرفر مش عامل CORS. بس نفس الكود على Flutter web هيتمنع لو الـ backend مش سامح بالـ origin (درس cors في «تاب Backend بـ Node» و «CORS و middleware» في «تاب Python و FastAPI»).

شكل الرد: المثال مستني [[{"token": "..."}]]. لو backend بتاعك بيرجّع [[access_token]] (زي OAuth2PasswordBearer في FastAPI)، عدّل الـ pattern. وخلي بالك: [[OAuth2PasswordRequestForm]] في FastAPI بياخد form-urlencoded بـ [[username]] مش JSON، فالـ body يبقى [[body: {'username': email, 'password': password}]] من غير jsonEncode.

الـ pattern [[final {'token': String token} = ...]]: لو الرد مفيهوش token نص، بيرمي StateError فورًا بدل ما يخزّن null.

401: التوكن انتهى أو اتلغى. بنمسحه ونبلّغ ([[onUnauthorized]]) فالـ session بتاع الـ router يبقى null، والـ redirect يودّي login من أي شاشة. لو عندك refresh token (درس access و refresh في «تاب Backend بـ Node»)، هنا بتحاول refresh مرة وتعيد الطلب قبل ما ترمي.

[[http.Client? client]] في الـ constructor: في الاختبارات بتبعت [[MockClient]] من [[package:http/testing.dart]] فتختبر فحص 401 من غير سيرفر.

وفي Riverpod: [[final apiProvider = Provider((ref) => ApiClient(onUnauthorized: () => ...));]] والـ repositories بتقراه.`,
            when: "أول ما التطبيق يكلم backend فيه auth. class واحد لكل الطلبات، وكل الـ repositories فوقه.",
            mistakes: R`[[localhost]] على الـ emulator. والسيرفر بيسمع على 127.0.0.1 فالموبايل الحقيقي مش شايفه. و HTTP في release فكل الطلبات تفشل بـ [[Cleartext HTTP traffic not permitted]]. والتوكن في shared_preferences. وتقرا التوكن من secure storage في كل طلب في تطبيق بيعمل طلبات كتير (هنا مقبول للتبسيط، بس الأحسن cache في الذاكرة). وتبعت JSON لـ endpoint مستني form (FastAPI OAuth2) فيرجع 422.`
          },
          lines: [
            "jsonEncode و jsonDecode.",
            "التخزين الآمن.",
            "http.",
            "العنوان من [[--dart-define]]، وافتراضيًا الكمبيوتر من الـ emulator.",
            "exception لما السيرفر يرفض التوكن.",
            "الـ client.",
            "http.Client ممكن يتبعت (للاختبارات)، و callback لما الـ session تنتهي.",
            "الاتصال.",
            "هيتنادى عند 401 (مثلًا [[session.value = null]]).",
            "التخزين.",
            "login.",
            "POST للـ backend.",
            "[[/auth/login]] في Express أو FastAPI.",
            "JSON.",
            "الإيميل والباسورد.",
            "قفلة.",
            "أي رد غير 200 يبقى بيانات غلط.",
            "pattern: الرد لازم فيه token نص، وإلا يرمي فورًا.",
            "خزّن التوكن.",
            "قفلة login.",
            "GET لأي route.",
            "هات التوكن.",
            "الطلب.",
            "JSON.",
            "التوكن في الهيدر لو موجود (collection if).",
            "قفلة الـ headers.",
            "التوكن اتلغى أو انتهى...",
            "...امسحه...",
            "...وبلّغ التطبيق (الـ router يرجّع login)...",
            "...وارمي عشان الشاشة تعرف.",
            "قفلة.",
            "أي خطأ تاني من السيرفر.",
            "الرد كـ Map أو List.",
            "قفلة get.",
            "logout.",
            "قفلة."
          ],
          sol: R`على الـ emulator مع [[API_URL=http://10.0.2.2:3000]] الـ login بيخزّن التوكن و [[get('/todos')]] بيرجّع البيانات. لو ظهر [[Connection refused]] يبقى السيرفر مش شغال أو البورت غلط. ولو ظهر 422 من FastAPI يبقى الـ endpoint مستني form مش JSON.

على موبايل حقيقي: [[API_URL]] يبقى IP الكمبيوتر (زي [[http://192.168.1.10:3000]])، والسيرفر لازم يسمع على [[0.0.0.0]]، والـ firewall يسمح بالبورت. أو [[adb reverse tcp:3000 tcp:3000]] وتسيب [[http://localhost:3000]].

توكن غلط: السيرفر بيرد 401، فالـ client بيمسح التوكن، وينادي onUnauthorized، ويرمي UnauthorizedException. لو onUnauthorized بيعمل [[session.value = null]]، الـ router بيرميك على login أوتوماتيك. الغلط الشائع إن التطبيق يعرض «خطأ» ويفضل في نفس الشاشة، لأن الـ 401 اتعامل كأي خطأ.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "widget tests بتشتغل في ثواني من غير موبايل، و integration tests بتشغّل التطبيق الحقيقي على جهاز",
      items: [
        {
          cmd: "flutter test",
          title: "تختبر شاشة بتدوس وتكتب فيها من غير موبايل",
          desc: R`الـ widget test بيبني الـ widget في بيئة وهمية (من غير شاشة ولا emulator)، وتقدر تكتب في الحقول وتدوس الأزرار وتتأكد من اللي ظاهر. بيشتغل بـ [[flutter test]] في ثواني، وفي CI.

[[testWidgets]] بتدّيك [[tester]]: [[pumpWidget]] يبني، و [[tap]] و [[enterText]] يتفاعلوا، و [[pump]] يرسم frame (بعد أي تغيير لازم pump عشان الشاشة تتحدث). و [[find.text]] و [[find.byType]] بيدوّروا، و [[expect(..., findsOneWidget)]] بيتأكد.`,
          example: R`// test/login_form_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/login_form.dart';

void main() {
  Widget app() => const MaterialApp(home: Scaffold(body: LoginForm()));

  testWidgets('empty fields show both errors', (tester) async {
    await tester.pumpWidget(app());
    await tester.tap(find.text('Sign in'));
    await tester.pump();
    expect(find.text('اكتب إيميل صحيح'), findsOneWidget);
    expect(find.text('8 حروف على الأقل'), findsOneWidget);
  });

  testWidgets('valid input signs in', (tester) async {
    await tester.pumpWidget(app());
    await tester.enterText(find.byType(TextFormField).first, 'ali@mail.com');
    await tester.enterText(find.byType(TextFormField).last, 'secret123');
    await tester.tap(find.byType(FilledButton));
    await tester.pump();
    expect(find.text('Signing in...'), findsOneWidget);
    await tester.pump(const Duration(seconds: 1));
    await tester.pump();
    expect(find.text('Welcome ali@mail.com'), findsOneWidget);
  });
}`,
          try: "حط LoginForm من درس «Form و validator» في [[lib/login_form.dart]] وشغّل [[flutter test]]. بعدين بدّل آخر [[pump(const Duration(seconds: 1))]] و [[pump()]] بـ [[pumpAndSettle()]] بس: الاختبار نجح؟ ليه؟ واكتب اختبار تالت لـ TodosScreen بـ FakeTodoRepo فاضي (ProviderScope مع overrides) بيتأكد إن «مفيش مهام لسه» ظاهرة.",
          flag: "script",
          deep: {
            why: "كل ما التطبيق يكبر، تعديل في validator أو provider ممكن يكسر شاشة مش واخد بالك منها، وتكتشفه من تقييم نجمة واحدة على Play. الـ widget tests بتشغّل سيناريوهات المستخدم الأساسية في ثواني مع كل commit، وأرخص بكتير من إنك تجرّب بإيدك.",
            how: R`فيه ٣ أنواع اختبارات في Flutter:
- unit ([[test()]] من package test): دالة أو class من غير UI. أسرع حاجة. زي اختبار CartNotifier بـ [[ProviderContainer]].
- widget ([[testWidgets]]): widget أو شاشة في بيئة وهمية. المثال هنا.
- integration: التطبيق الحقيقي على جهاز (الدرس الجاي).

الوقت في widget tests وهمي (fake async): مفيش حاجة بتحصل لوحدها. [[pump()]] بيرسم frame واحد، و [[pump(Duration)]] بيقدّم الساعة الوهمية المدة دي (فالـ [[Future.delayed]] بتاع ثانية بيخلص فورًا)، و [[pumpAndSettle()]] بيفضل يرسم frames لحد ما مفيش animations. بس pumpAndSettle مش بيقدّم الوقت لـ timers لو مفيش frames مستنية، ودا سبب إنه مش كفاية بعد Future.delayed.

الـ finders: [[find.text]] و [[find.byType]] و [[find.byIcon]] و [[find.byKey(const ValueKey('submit'))]] (أثبت حاجة لو النص ممكن يتغير أو يتترجم)، و [[find.widgetWithText(ListTile, 'milk')]]. والـ matchers: [[findsOneWidget]] و [[findsNothing]] و [[findsNWidgets(3)]].

الشبكة: الـ widget tests بتمنع طلبات HTTP الحقيقية (بترجع 400)، ودا مقصود. عشان كده الـ repository لازم يبقى provider تقدر تعمله override بـ fake:
[[ProviderScope(overrides: [todoRepoProvider.overrideWithValue(FakeRepo([]))], child: ...)]]

الـ plugins (shared_preferences، secure storage) مش موجودة في الاختبار: كل واحد فيه mock ([[SharedPreferencesAsyncPlatform.instance = InMemorySharedPreferencesAsync.empty()]] و [[FlutterSecureStorage.setMockInitialValues({})]])، أو الأحسن تعمل override للـ store نفسه.

golden tests: [[expectLater(find.byType(ProductCard), matchesGoldenFile('card.png'))]] بتقارن شكل الـ widget بصورة محفوظة، و [[flutter test --update-goldens]] بيحدّثها.

[[flutter test --coverage]] بيطلّع [[coverage/lcov.info]].`,
            when: "السيناريوهات المهمة: login، و checkout، و الفورمز، وحالات loading و error و empty. ومع أي bug بتصلّحه: اختبار يمسكه عشان ميرجعش. ومتختبرش كل widget صغير بيعرض نص.",
            mistakes: R`تنسى [[pump()]] بعد tap فالاختبار يشوف الشاشة القديمة. و [[pumpAndSettle]] مع [[CircularProgressIndicator]] ظاهر: الـ animation مبيخلصش فيضرب timeout. وتختبر بـ HTTP حقيقي. وتدوّر بـ [[find.text]] على نص بيتغير مع الترجمة، فالاختبارات تقع لما حد يعدّل كلمة: استخدم keys للحاجات المهمة. والـ widget محتاج MaterialApp أو Scaffold فوقه (Directionality و Theme و ScaffoldMessenger) وانت بتبنيه لوحده.`
          },
          lines: [
            "flutter_test جاية مع كل مشروع.",
            "flutter_test.",
            "الشاشة اللي بتختبرها.",
            "البداية.",
            "الـ widget جوه MaterialApp و Scaffold عشان Theme و SnackBar يشتغلوا.",
            "اختبار widget.",
            "ابني.",
            "دوس الزرار.",
            "ارسم frame بعد التغيير.",
            "رسالة الإيميل ظاهرة مرة.",
            "ورسالة الباسورد.",
            "قفلة.",
            "اختبار تاني.",
            "ابني.",
            "اكتب في أول حقل.",
            "وفي آخر حقل.",
            "دوس.",
            "frame.",
            "الزرار في حالة التحميل.",
            "قدّم الوقت الوهمي ثانية: الـ Future.delayed خلص.",
            "frame تاني عشان الـ setState والـ SnackBar.",
            "رسالة الترحيب.",
            "قفلة.",
            "قفلة main."
          ],
          sol: R`[[flutter test]] بيطبع [[All tests passed!]] للاتنين.

مع [[pumpAndSettle()]] لوحدها بعد [[Signing in...]] الاختبار بيقع: [[Found 0 widgets with text "Welcome ali@mail.com"]]. لأن pumpAndSettle بيرسم frames لحد ما مفيش animations، والزرار خلص الـ animation بتاعه بسرعة، فرجع قبل ما الساعة الوهمية توصل ثانية، والـ Future.delayed لسه مستني. عشان تقدّم الوقت لازم [[pump(Duration)]].

الاختبار التالت: [[pumpWidget(ProviderScope(overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo([]))], child: const MaterialApp(home: Scaffold(body: TodosScreen()))))]]، ثم [[expect(find.byType(CircularProgressIndicator), findsOneWidget)]]، ثم [[pump(const Duration(seconds: 1))]] (لو الـ fake فيه delay) أو [[pumpAndSettle()]]، ثم [[expect(find.text('مفيش مهام لسه'), findsOneWidget)]].`,
          solCode: R`testWidgets('empty todos', (tester) async {
  await tester.pumpWidget(ProviderScope(
    overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo([]))],
    child: const MaterialApp(home: Scaffold(body: TodosScreen())),
  ));
  expect(find.byType(CircularProgressIndicator), findsOneWidget);
  await tester.pump(const Duration(seconds: 1));
  await tester.pump();
  expect(find.text('مفيش مهام لسه'), findsOneWidget);
});`
        },
        {
          cmd: "integration_test",
          title: "تشغّل التطبيق الحقيقي على موبايل وتدوس فيه أوتوماتيك",
          desc: R`الـ integration test بيشغّل التطبيق كله على جهاز حقيقي أو emulator: الـ plugins الحقيقية، والشبكة الحقيقية (أو staging)، والـ rendering الحقيقي. بنفس API الـ widget tests ([[tester.tap]] و [[find]])، بس بعد [[IntegrationTestWidgetsFlutterBinding.ensureInitialized()]].

الملفات في فولدر [[integration_test/]] وبتشغّلها بـ [[flutter test integration_test]] والجهاز متوصل. أبطأ بكتير من widget tests، فبتعمل منها قليل: السيناريوهات الأساسية من أول لآخر.`,
          example: R`// flutter pub add 'dev:integration_test:{"sdk":"flutter"}'
// integration_test/app_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('counter increments on a real device', (tester) async {
    app.main();
    await tester.pumpAndSettle();
    expect(find.text('0'), findsOneWidget);
    await tester.tap(find.byIcon(Icons.add));
    await tester.pumpAndSettle();
    expect(find.text('1'), findsOneWidget);
  });
}
// flutter test integration_test/app_test.dart -d emulator-5554
// flutter test integration_test -d chrome   (محتاج chromedriver شغال)`,
          try: "في مشروع العدّاد الافتراضي ضيف الـ package والملف، وشغّل على الـ emulator. اتفرّج على التطبيق وهو بيتفتح والزرار بيتداس لوحده. وبعدين خلي الاختبار يدوس ٣ مرات ويتأكد من 3، وشغّله تاني.",
          flag: "script",
          deep: {
            why: "الـ widget tests بيمثّلوا الـ plugins والشبكة، فمش هيمسكوا إن الكاميرا محتاجة صلاحية مش مكتوبة في AndroidManifest، أو إن الـ release build فيه مشكلة obfuscation، أو إن الـ API الحقيقي غيّر شكل الرد. الـ integration test بيجرّب التجميعة كلها زي ما المستخدم هيشوفها.",
            how: R`[[IntegrationTestWidgetsFlutterBinding]] binding بيشتغل جوه التطبيق الحقيقي وبيبعت النتايج للأداة على الكمبيوتر. [[app.main()]] بيشغّل main بتاعتك زي ما هي، فكل حاجة حقيقية.

الوقت هنا حقيقي مش وهمي: [[pumpAndSettle]] بيستنى فعلًا. ولو فيه طلب شبكة، استنى على حاجة تظهر بدل وقت ثابت (loop صغيرة بـ [[pump(Duration(milliseconds: 100))]] لحد ما [[find]] يلاقي).

الـ backend: شغّل ضد staging أو backend محلي بـ [[--dart-define=API_URL=...]]، مش الإنتاج. أو اعمل override للـ repositories بـ fakes في main مخصوص للاختبار ([[-t integration_test/main_test.dart]]).

في CI: على GitHub Actions تقدر تشغّل Android emulator (action زي reactivecircus/android-emulator-runner) وده بطيء، أو ترفع الاختبارات لـ Firebase Test Lab يشغّلها على موبايلات حقيقية كتير.

[[flutter drive]] الطريقة الأقدم، وبتحتاجها لو عايز تاخد screenshots أو تقيس أداء ([[traceAction]] وتطلّع timeline).

والأداء: integration test في profile mode ([[flutter drive --profile]]) بيقيس الـ frame times على موبايل حقيقي، ودا الرقم اللي يعتمد عليه، مش debug.`,
            when: "٢ لـ ٥ سيناريوهات أساسية (login، الشراء، إضافة عنصر) قبل كل release، وفي CI ليلي. والتفاصيل الكتير في widget tests لأنها أسرع ١٠٠ مرة.",
            mistakes: R`تحط كل الاختبارات integration فالـ CI ياخد ساعة. وتشغّلها على الإنتاج فتعمل طلبات وحسابات حقيقية. وتستخدم [[pump(Duration(seconds: 3))]] ثابت للشبكة فالاختبار يبقى flaky (يعدّي مرة ويقع مرة). وتنسى [[ensureInitialized()]] فتطلع رسايل غريبة عن الـ binding.`
          },
          lines: [
            "Material (فيها Icons).",
            "نفس API الـ widget tests.",
            "الـ binding بتاع الأجهزة الحقيقية.",
            "main بتاعة التطبيق نفسه.",
            "البداية.",
            "لازم أول سطر.",
            "اختبار.",
            "شغّل التطبيق زي ما المستخدم بيفتحه.",
            "استنى لحد ما الشاشة تهدى.",
            "العدّاد 0.",
            "دوس زرار +.",
            "استنى.",
            "بقى 1.",
            "قفلة.",
            "قفلة main."
          ],
          sol: R`[[flutter test integration_test/app_test.dart -d emulator-5554]] بيبني التطبيق (أول مرة دقيقة أو اتنين)، ويسطّبه، والتطبيق بيفتح على الـ emulator والرقم بيبقى 1 لوحده، وفي الترمنال [[All tests passed!]].

للـ ٣ ضغطات: loop بـ [[for (var i = 0; i < 3; i++)]] فيها tap و pumpAndSettle، ثم [[expect(find.text('3'), findsOneWidget)]].

لو ظهر [[No devices found]] يبقى الـ emulator مش شغال ([[flutter devices]]). وعلى Chrome لازم chromedriver شغال على بورت 4444 الأول، وإلا بيفشل.`,
          solCode: R`for (var i = 0; i < 3; i++) {
  await tester.tap(find.byIcon(Icons.add));
  await tester.pumpAndSettle();
}
expect(find.text('3'), findsOneWidget);`
        }
      ]
    }
]);
