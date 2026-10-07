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
          teach: R`## الكود ده بيعمل إيه؟

بيعرّف ٢ providers: واحد بيعمل [[http.Client]] واحد للتطبيق كله، والتاني بيقرا عنوان الـ API. وبعدين widget بيقرا العنوان من الـ provider ويعرضه، والتطبيق كله ملفوف في [[ProviderScope]]. كل الناتج تحت اتشغّل فعلًا في مشروع [[flutter create]] جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44، Dart 3.12، flutter_riverpod 3.4.3)، بـ [[flutter test]] بيبني نفس الـ widget ويطبع النص اللي ظاهر.

---

## ١. الـ imports

~~~dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
~~~

- [[package:]] معناها «من package متسطّبة»، مش ملف في مشروعك. الاتنين التانيين بيتسطبوا بـ [[flutter pub add flutter_riverpod http]].
- [[flutter_riverpod]] فيها [[Provider]] و [[ProviderScope]] و [[ConsumerWidget]] و [[WidgetRef]].
- [[as http]]: كل حاجة من الـ package دي هتتكتب قبلها [[http.]] ([[http.Client]]). بنعمل كده عشان أسامي زي [[get]] و [[Client]] متتلخبطش مع حاجات تانية.

---

## ٢. العنوان وقت الـ build: [[String.fromEnvironment]]

~~~dart
const apiBase = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');
~~~

- [[String.fromEnvironment('API_URL')]]: بيقرا قيمة اسمها [[API_URL]] اتبعتت للـ compiler بـ [[--dart-define=API_URL=...]]. القيمة بتتحط في الكود **وقت الترجمة**، مش وقت التشغيل.
- [[const]]: لازم، لأن القيمة معروفة وقت الترجمة. والـ docs بتاعة Dart بتقول إن [[fromEnvironment]] مضمون يشتغل بس لما يتنادى كـ const.
- [[defaultValue:]]: لو مفيش [[--dart-define]]. و [[10.0.2.2]] هو الـ localhost بتاع الكمبيوتر من جوه Android emulator.

جربت نفس الاختبار مرتين:

~~~text flutter test
default -> API: 10.0.2.2:3000
~~~

~~~text flutter test --dart-define=API_URL=http://192.168.1.10:8000
default -> API: 192.168.1.10:8000
~~~

ولأن القيمة اتطبخت جوه الكود، hot reload مش هيغيّرها: محتاج تشغيل جديد بالـ define الجديد.

---

## ٣. أول provider: [[Provider<http.Client>]]

~~~dart
final httpClientProvider = Provider<http.Client>((ref) {
  final client = http.Client();
  ref.onDispose(client.close);
  return client;
});
~~~

نفكّه حتة حتة:

- [[final httpClientProvider]]: متغير top-level (بره أي class). دا **مش** الـ client نفسه، دا «وصفة» بتقول الـ client بيتعمل إزاي.
- [[Provider<http.Client>]]: أبسط نوع provider: قيمة بتتحسب مرة ومش بتتغير من بره. و [[<http.Client>]] نوع القيمة (generic).
- [[(ref) { ... }]]: دالة بتاخد [[ref]] وترجّع القيمة. Riverpod بينادي الدالة دي أول مرة حد يطلب الـ provider.
- [[http.Client()]]: اتصال HTTP واحد يتعاد استخدامه في كل الطلبات (أسرع من اتصال جديد كل مرة).
- [[ref.onDispose(client.close)]]: «لما الـ provider ده يتشال، نادي [[client.close]]». لاحظ إن مفيش [[()]] بعد close: احنا بنبعت الدالة نفسها (tear-off) عشان تتنادى بعدين، مش بننفّذها دلوقتي.
- [[return client;]]: دي القيمة اللي أي حد هياخدها.

### lazy ونسخة واحدة

كتبت اختبار صغير بـ [[ProviderContainer]] (الـ ProviderScope من غير UI) بيعدّ الدالة اتنادت كام مرة:

~~~text flutter test
before read: created=0
after 2 reads: created=1 a=42 b=42
same client: true
after dispose: disposed=1
~~~

- قبل أي قراية: الدالة متنادتش خالص (lazy).
- بعد قرايتين: اتنادت **مرة واحدة**، والقراية التانية خدت نفس القيمة. وقرايتين لـ [[httpClientProvider]] رجّعوا نفس الـ object ([[identical]] = true).
- بعد [[dispose]] للـ container: الـ [[onDispose]] اشتغل.

---

## ٤. تاني provider بسطر واحد

~~~dart
final baseUrlProvider = Provider<Uri>((ref) => Uri.parse(apiBase));
~~~

- [[=>]]: دالة بسطر واحد بترجّع اللي بعده على طول.
- [[Uri.parse(apiBase)]]: بيحوّل النص لـ [[Uri]] فيه أجزاء جاهزة: [[scheme]] (http) و [[host]] و [[port]] و [[path]].
- [[ref]] مش مستخدم هنا، بس لو عايز تبني على provider تاني كنت هتكتب [[ref.watch(otherProvider)]] جوه الدالة.

---

## ٥. الـ widget: [[ConsumerWidget]]

~~~dart
class ApiStatus extends ConsumerWidget {
  const ApiStatus({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final base = ref.watch(baseUrlProvider);
    return Text('API: $__{base.host}:$__{base.port}');
  }
}
~~~

- [[extends ConsumerWidget]]: زي [[StatelessWidget]] بالظبط، بس build بتاخد باراميتر زيادة.
- [[const ApiStatus({super.key});]]: constructor عادي بيبعت الـ key للأب.
- [[@override]]: احنا بنكتب نسخة build بتاعتنا بدل اللي في الأب.
- [[WidgetRef ref]]: الباب اللي الـ widget بيقرا منه الـ providers.
- [[ref.watch(baseUrlProvider)]]: هات القيمة **واشترك فيها**: لو اتغيرت، build يتنادى تاني لوحده. ودا الفرق عن [[ref.read]] اللي بيقرا مرة من غير اشتراك (مكانه جوه [[onPressed]]).
- [[$__{base.host}]] و [[$__{base.port}]]: interpolation، بيحط القيمة جوه النص.

---

## ٦. [[main]] و [[ProviderScope]]

~~~dart
void main() {
  runApp(const ProviderScope(child: MaterialApp(home: Scaffold(body: Center(child: ApiStatus())))));
}
~~~

من برة لجوه: [[ProviderScope]] ← [[MaterialApp]] ← [[Scaffold]] ← [[Center]] ← [[ApiStatus]]. الـ ProviderScope لازم يبقى **فوق** أي widget بيقرا providers، لأنه المكان اللي القيم بتتخزن فيه فعلًا. والـ providers نفسها global، بس قيمها جوه الـ scope.

---

## ٧. التجارب اللي في «جرّب»

### override

~~~dart
ProviderScope(
  overrides: [baseUrlProvider.overrideWithValue(Uri.parse('https://staging.example.com'))],
  child: ...,
)
~~~

~~~text flutter test
override -> API: staging.example.com:443
~~~

- [[overrides:]]: لستة بتبدّل providers بقيم تانية جوه الـ scope ده بس.
- [[overrideWithValue(...)]]: «متناديش الوصفة، استخدم القيمة دي».
- [[443]]: الـ URL مفيهوش port، فـ [[Uri.port]] رجّع الافتراضي لـ [[https]]. (والافتراضي لـ http هو 80.)
- [[ApiStatus]] متعدلش خالص. دي نفس الفكرة اللي هتستخدمها في الاختبارات.

### من غير ProviderScope

~~~text flutter test
no scope -> StateError: Bad state: No ProviderScope found
~~~

أول ما [[ref.watch]] يدوّر على scope فوقه ومش يلاقي، بيرمي [[StateError]].

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[Provider<T>((ref) => ...)]] | وصفة لقيمة، بتتعمل أول مرة حد يطلبها، ونسخة واحدة للكل |
| [[ref.onDispose(f)]] | نظّف لما الـ provider يتشال |
| [[ConsumerWidget]] + [[WidgetRef ref]] | widget يقدر يقرا providers |
| [[ref.watch(p)]] | اقرا واعمل rebuild لو اتغيرت (في build) |
| [[ref.read(p)]] | اقرا مرة (في callbacks) |
| [[ProviderScope]] | مخزن القيم، فوق التطبيق كله |
| [[overrideWithValue]] | بدّل provider بقيمة تانية من غير ما تلمس الكود |

> الـ provider مش القيمة، الـ provider عنوانها. والقيمة عايشة جوه الـ ProviderScope، ومن غيره مفيش قيم أصلًا.`,
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
          teach: R`## الكود ده بيعمل إيه؟

سلة مشتريات: class واحد ([[CartNotifier]]) شايل لستة العناصر وفيه الدوال اللي بتعدّلها، و provider تاني بيحسب الإجمالي لوحده، وزرار بيعرض العدد والإجمالي ويضيف شاي لما تدوس. الناتج تحت من [[flutter test]] حقيقي في [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44، flutter_riverpod 3.4.3): زرارين [[CartButton]] في نفس الشاشة، ودوست على الأول بس.

---

## ١. شكل العنصر: [[typedef]] و record

~~~dart
typedef CartItem = ({String name, double price, int qty});
~~~

- [[({String name, double price, int qty})]]: **record**، يعني قيمة فيها كذا حقل بأسامي، من غير ما تكتب class. بتقرا منه [[e.name]] و [[e.price]] و [[e.qty]].
- [[typedef CartItem = ...]]: اسم مختصر للنوع ده، عشان متكتبش الأقواس كلها في كل حتة.
- الـ records **immutable**: مفيش [[e.qty++]]. لو عايز كمية تانية تعمل record جديد. ودا بالظبط اللي Riverpod محتاجه.
- و record بيتطبع كده: [[(name: Tea, price: 10.0, qty: 2)]].

---

## ٢. الـ Notifier والقيمة الأولية

~~~dart
class CartNotifier extends Notifier<List<CartItem>> {
  @override
  List<CartItem> build() => [];
~~~

- [[Notifier<List<CartItem>>]]: class من Riverpod، والـ [[<...>]] نوع الـ state اللي شايله: لستة عناصر.
- [[build()]]: Riverpod بيناديها أول مرة حد يطلب السلة، واللي بترجّعه هو الـ state الأولية: لستة فاضية.
- جوه أي method في الـ class فيه [[state]]: تقرا منه القيمة الحالية، وتكتب فيه قيمة جديدة.

---

## ٣. [[add]]: منتج جديد ولا موجود؟

~~~dart
  void add(String name, double price) {
    final i = state.indexWhere((e) => e.name == name);
~~~

- [[indexWhere(...)]]: بيلف على اللستة ويرجّع رقم (index) أول عنصر الشرط بتاعه true. ولو مفيش: [[-1]].
- [[(e) => e.name == name]]: الشرط: اسم العنصر هو نفس الاسم اللي جاي.

### لو مش موجود ([[i == -1]])

~~~dart
      state = [...state, (name: name, price: price, qty: 1)];
~~~

- [[[ ... ]]]: لستة **جديدة**.
- [[...state]]: الـ spread، «فك كل عناصر اللستة القديمة هنا».
- وبعدها record جديد بكمية 1.
- [[state = ...]]: هنا السحر: Riverpod بيقارن اللستة الجديدة بالقديمة، ولقاها object تاني، فبيبلّغ كل اللي عاملين watch.

### لو موجود

~~~dart
      state = [
        for (final (j, e) in state.indexed)
          j == i ? (name: e.name, price: e.price, qty: e.qty + 1) : e,
      ];
~~~

من جوه لبرة:

1. [[state.indexed]]: بيحوّل اللستة لأزواج [[(index, عنصر)]]: [[(0, شاي)]] و [[(1, لبن)]].
2. [[final (j, e)]]: pattern بيفك كل زوج: j الرقم، و e العنصر.
3. [[for (...) ...]] جوه [[[ ]]]: collection for، بتبني لستة عنصر عنصر.
4. [[j == i ? ... : e]]: لو ده العنصر اللي بندوّر عليه اعمل record جديد بكمية +1، غير كده حط العنصر زي ما هو.

النتيجة لستة جديدة فيها نفس العناصر وواحد بس اتغير.

### [[clear]]

~~~dart
  void clear() => state = [];
}
~~~

سطر واحد: state بقت لستة فاضية جديدة.

---

## ٤. الـ provider: [[NotifierProvider]]

~~~dart
final cartProvider = NotifierProvider<CartNotifier, List<CartItem>>(CartNotifier.new);
~~~

- نوعين بين [[< >]]: الـ class اللي فيه المنطق، ونوع الـ state.
- [[CartNotifier.new]]: tear-off للـ constructor، يعني «دي الطريقة اللي تعمل بيها CartNotifier». Riverpod بيعمله بنفسه أول مرة حد يطلبه.

جربت الـ Notifier من غير أي UI بـ [[ProviderContainer]]: [[add('Tea', 10)]] مرتين و [[add('Milk', 15.5)]]:

~~~text flutter test
state: [(name: Tea, price: 10.0, qty: 2), (name: Milk, price: 15.5, qty: 1)]
total: 35.5
~~~

الشاي اتجمع في عنصر واحد كميته 2 بدل ما يتكرر.

---

## ٥. provider مشتق: الإجمالي

~~~dart
final cartTotalProvider = Provider<double>((ref) {
  return ref.watch(cartProvider).fold(0.0, (sum, e) => sum + e.price * e.qty);
});
~~~

- [[ref.watch(cartProvider)]] جوه provider: «أنا معتمد على السلة». أي تغيير في السلة بيخلي الإجمالي يتحسب تاني لوحده.
- [[fold(0.0, (sum, e) => ...)]]: بيلف على اللستة شايل مجموع بيبدأ من [[0.0]]، ومع كل عنصر بيرجّع المجموع الجديد: [[sum + سعر × كمية]]. هنا: [[10 × 2 + 15.5 × 1 = 35.5]].
- [[0.0]] مش [[0]]: عشان نوع المجموع يبقى double من الأول.

---

## ٦. الزرار: [[select]] و [[.notifier]]

~~~dart
    final count = ref.watch(cartProvider.select((items) => items.length));
    final total = ref.watch(cartTotalProvider);
    return TextButton(
      onPressed: () => ref.read(cartProvider.notifier).add('Tea', 10),
      child: Text('$count items • $__{total.toStringAsFixed(2)} EGP'),
    );
~~~

- [[cartProvider.select((items) => items.length)]]: اشترك في **العدد بس**. الـ widget يعمل rebuild لو العدد اتغير، مش لو كمية عنصر زادت.
- [[ref.read(cartProvider.notifier)]]: [[.notifier]] بيرجّع الـ CartNotifier نفسه عشان تنادي [[add]]. و [[ref.read]] لأننا جوه callback.
- [[toStringAsFixed(2)]]: الرقم كنص برقمين بعد العلامة: [[20.00]].

### الناتج

~~~text flutter test (زرارين، والضغط على الأول بس)
start: a="0 items • 0.00 EGP" b="0 items • 0.00 EGP" selectBuilds=1
tap1:  a="1 items • 10.00 EGP" b="1 items • 10.00 EGP" selectBuilds=2
tap2:  a="1 items • 20.00 EGP" b="1 items • 20.00 EGP" selectBuilds=2
~~~

- الزرار التاني (b) اتحدث مع إن محدش داس عليه: الاتنين بيقروا نفس الـ provider.
- بعد الضغطة التانية: العدد لسه 1 (منتج واحد كميته 2) والإجمالي 20.
- [[selectBuilds]]: widget تالت عامل watch على العدد بس بـ select. في الضغطة الأولى اتبني تاني (العدد 0 بقى 1)، وفي التانية **لأ** (العدد فضل 1).

---

## ٧. ليه [[state.add]] غلط؟

ضيفت method بتعمل [[state.add(...)]] بدل لستة جديدة، وناديتها:

~~~text flutter test
after addMutating: text="0 items • 0.00 EGP" listLen=1 notified=0
~~~

اللستة فعلًا بقى فيها عنصر ([[listLen=1]])، بس محدش اتبلّغ ([[notified=0]]) والزرار لسه بيقول 0. لأن [[state]] لسه نفس الـ object، فـ Riverpod شايف إن مفيش تغيير.

---

## ٨. الـ solCode: [[remove]]

~~~dart
void remove(String name) {
  state = [
    for (final e in state)
      if (e.name != name) e
      else if (e.qty > 1) (name: e.name, price: e.price, qty: e.qty - 1),
  ];
}
~~~

- [[for]] على كل عنصر، و collection [[if]] بيقرر يحط إيه في اللستة الجديدة:
  - مش العنصر ده: حطه زي ما هو.
  - هو العنصر وكميته أكتر من 1: حط نسخة بكمية أقل.
  - هو العنصر وكميته 1: **مفيش** فرع، فالعنصر مش بيتحط، يعني اتشال.

~~~text flutter test (بعد شاي ×2 ولبن ×1)
remove Tea: [(name: Tea, price: 10.0, qty: 1), (name: Milk, price: 15.5, qty: 1)]
remove Tea again: [(name: Milk, price: 15.5, qty: 1)]
clear: [] total=0.0
~~~

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[Notifier<T>]] + [[build()]] | الـ state الأولية والمنطق في class واحد |
| [[state = جديد]] | الطريقة الوحيدة اللي بتبلّغ الـ widgets |
| [[NotifierProvider<N, T>(N.new)]] | تعريف الـ provider |
| [[ref.watch(p.select(f))]] | rebuild لما جزء معين يتغير بس |
| [[ref.read(p.notifier).method()]] | نادي دالة في الـ Notifier من callback |
| provider بيعمل [[ref.watch]] لـ provider | قيمة مشتقة بتتحسب لوحدها |

> متعدّلش الـ state من جوه ([[add]] و [[qty++]]): اعمل لستة جديدة وحطها في [[state]].`,
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

[[ref.invalidate(todosProvider)]] بيعلّم القيمة إنها قديمة ويعيد build (والقيمة أو الخطأ القديم بيفضلوا موجودين لحد ما النتيجة الجديدة توصل). و [[ref.refresh(todosProvider.future)]] نفس الكلام ويرجّع Future تستنى عليه (مناسب لـ [[RefreshIndicator]]).

وللـ parameters (todo واحد بالـ id): [[AsyncNotifierProvider.family]] والـ id بيتبعت للـ constructor: [[ref.watch(todoProvider(42))]].

[[throw UnimplementedError(...)]] في todoRepoProvider: pattern مشهور معناه «الـ provider ده لازم يتعمله override». لو نسيت، الخطأ واضح من أول تشغيل.`,
            when: "أي بيانات جاية من API وأكتر من مكان محتاجها أو بتتعدل: لستة المنتجات، والطلبات، والبروفايل. ولقراية بسيطة من غير methods: [[FutureProvider]] كفاية ([[final p = FutureProvider((ref) => repo.fetch());]]).",
            mistakes: R`[[state = AsyncData([...state.value!, created])]] و [[!]] يضرب لو لسه بيحمّل. وتنسى [[ref.mounted]] بعد await فيطلع error من Riverpod في الـ console. وتحط [[AsyncValue.guard]] على كل عملية فأي فشل صغير يمسح الشاشة. وتعمل [[ref.watch]] جوه [[add]] بدل [[ref.read]]: في methods الـ Notifier استخدم read.`
          },
          teach: R`## الكود ده بيعمل إيه؟

لستة مهام جاية من API: موديل [[Todo]]، و «عقد» ([[TodoRepo]]) بيقول أي مصدر بيانات لازم يعرف يعمل إيه، و provider للـ repo، و [[AsyncNotifier]] بيحمّل اللستة ويضيف عليها. الـ widget مش في المثال (هو الدرس الجاي). الناتج تحت من [[flutter test]] حقيقي في [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44، flutter_riverpod 3.4.3)، بـ [[ProviderContainer]] بيطبع كل حالة بتعدّي على الـ provider، ومرة مع API وهمي بـ Node شغال على الجهاز.

---

## ١. الموديل

~~~dart
class Todo {
  const Todo(this.id, this.title);
  final int id;
  final String title;
}
~~~

- [[const Todo(this.id, this.title)]]: constructor بيحط الـ arguments في الحقول على طول، و [[const]] عشان تقدر تعمل [[const Todo(1, 'buy milk')]].
- [[final]]: الحقول متتغيرش بعد ما الـ object يتعمل.

---

## ٢. العقد: [[abstract interface class]]

~~~dart
abstract interface class TodoRepo {
  Future<List<Todo>> fetchAll();
  Future<Todo> create(String title);
}
~~~

- [[abstract]]: مينفعش تعمل منه object مباشرة، والدوال من غير جسم ([[;]] بدل [[{ }]]).
- [[interface]]: اللي هيستخدمه لازم يعمل [[implements TodoRepo]] ويكتب الدالتين بنفسه.
- [[Future<List<Todo>>]]: «لستة مهام هتوصل بعدين» (شبكة أو ديسك).

الفايدة: [[HttpTodoRepo]] بيكلم السيرفر، و [[FakeTodoRepo]] بيرجّع بيانات ثابتة، والاتنين «شكلهم» واحد، فالباقي مش فارق معاه مين فيهم.

---

## ٣. provider لازم يتعمله override

~~~dart
final todoRepoProvider = Provider<TodoRepo>((ref) => throw UnimplementedError('override in main'));
~~~

- الدالة مش بترجّع repo، بترمي [[UnimplementedError]]. يعني «انت لازم تبدّلني».
- في main بتعمل [[overrideWithValue(HttpTodoRepo())]]، وفي الاختبار [[overrideWithValue(FakeTodoRepo())]].

لو نسيت، جربت:

~~~text flutter test (من غير override)
no override: ProviderException: Tried to use a provider that is in error state.
A provider threw the following exception:
UnimplementedError: override in main
~~~

الرسالة اللي كتبتها بنفسك ظاهرة، فالسبب واضح من أول تشغيل.

---

## ٤. الـ provider والـ AsyncNotifier

~~~dart
final todosProvider = AsyncNotifierProvider<TodosNotifier, List<Todo>>(TodosNotifier.new);

class TodosNotifier extends AsyncNotifier<List<Todo>> {
  @override
  Future<List<Todo>> build() => ref.watch(todoRepoProvider).fetchAll();
~~~

- [[AsyncNotifierProvider<TodosNotifier, List<Todo>>]]: زي NotifierProvider، بس الـ state اللي بره هيبقى [[AsyncValue<List<Todo>>]] مش اللستة نفسها.
- [[build()]] هنا بترجّع **Future**. Riverpod بيحط الحالة loading، ويستنى الـ Future، ولو خلص يحط data، ولو رمى يحط error.
- [[ref.watch(todoRepoProvider)]]: هات الـ repo واعتمد عليه. لو الـ repo اتغير، build يتنادى تاني.

### الحالات اللي حصلت فعلًا

مع [[FakeTodoRepo]] (من الـ solCode، بيستنى ثانية):

~~~text flutter test
  -> AsyncLoading<List<Todo>> isLoading=true value=null error=null
  -> AsyncData<List<Todo>> isLoading=false value=[1:buy milk, 2:call mom] error=null
loaded after 1002ms
~~~

- الأول [[AsyncLoading]]: لسه مفيش قيمة ([[value=null]]).
- بعد ثانية [[AsyncData]] باللستة.
- [[ref.read(todosProvider.future)]] (اللي استنيت بيه) بيرجّع Future بيخلص لما البيانات توصل.

---

## ٥. [[add]]: السيرفر الأول وبعدين الـ state

~~~dart
  Future<void> add(String title) async {
    final created = await ref.read(todoRepoProvider).create(title);
    if (!ref.mounted) return;
    state = AsyncData([...?state.value, created]);
  }
}
~~~

- [[ref.read]] مش watch: احنا جوه method مش build، عايزين القيمة مرة.
- [[await ... create(title)]]: ابعت للسيرفر واستنى الـ Todo اللي اتعمل (بالـ id بتاعه). لو السيرفر فشل، الـ exception بيطلع من [[add]] للي ناداها، والسطر اللي بعده مش بيتنفذ، فالـ state القديمة سليمة.
- [[ref.mounted]]: بعد الـ await ممكن الـ provider يكون اتقفل (الشاشة اتقفلت). لو كده، اخرج من غير ما تلمس state.
- [[state.value]]: اللستة الحالية أو null لو لسه بيحمّل.
- [[...?]]: spread «null-aware»: لو null متحطش حاجة، غير كده فك العناصر. فلو لسه مفيش لستة، الجديدة هتبقى فيها العنصر ده بس.
- [[AsyncData([...])]]: حالة data جديدة باللستة الجديدة.

~~~text flutter test (بعد add('pay rent'))
  -> AsyncData<List<Todo>> isLoading=false value=[1:buy milk, 2:call mom, 3:pay rent] error=null
~~~

مفيش loading في النص: اللستة زادت عنصر على طول.

---

## ٦. refresh: البيانات القديمة بتفضل

عملت [[ref.refresh(todosProvider.future)]]:

~~~text flutter test
  -> AsyncData<List<Todo>> isLoading=true value=[1:buy milk, 2:call mom, 3:pay rent] error=null
  -> AsyncData<List<Todo>> isLoading=false value=[1:buy milk, 2:call mom] error=null
~~~

- أثناء الـ refresh: [[isLoading=true]] بس [[value]] لسه فيها اللستة القديمة. فالشاشة تقدر تفضل تعرضها (الدرس الجاي بيستغل ده).
- بعد الـ refresh: «pay rent» اختفت، لأن [[create]] في FakeTodoRepo بيرجّع Todo بس من غير ما يضيفه لـ [[_items]]. يعني الـ fake ده مش بيحفظ. مع سيرفر حقيقي العنصر كان هيرجع.

---

## ٧. التجربة: [[HttpTodoRepo]] مع سيرفر حقيقي

كتبت [[HttpTodoRepo implements TodoRepo]]: [[fetchAll]] بيعمل [[GET /todos]] ويحوّل كل JSON لـ Todo، و [[create]] بيعمل [[POST /todos]]. وشغّلت API وهمي بـ Node على البورت 5995، والاختبار بـ [[--dart-define=API_URL=http://host.docker.internal:5995]] ([[host.docker.internal]] هو الجهاز من جوه Docker، زي [[10.0.2.2]] من الـ emulator):

~~~text flutter test
http: [1:buy milk, 2:call mom]
http after add: AsyncData<List<Todo>> isLoading=false value=[1:buy milk, 2:call mom, 3:from flutter] error=null
~~~

~~~text log السيرفر
GET /todos auth=- ct=- body=
POST /todos auth=- ct=application/json body={"title":"from flutter"}
~~~

نفس [[TodosNotifier]] بالظبط، اتغير بس الـ override.

---

## ٨. لو التحميل فشل: AsyncError و retry

repo بيرمي [[Exception('no internet')]] دايمًا، مع قفل الـ retry ([[retry: (n, e) => null]]):

~~~text flutter test
build failed: AsyncError<List<Todo>> isLoading=false value=null error=Exception: no internet
~~~

ومن غير ما أقفله (الافتراضي في Riverpod 3)، عدّيت كام مرة الـ repo اتنادى في 1.6 ثانية:

~~~text flutter test
calls after 1.6s with default retry: 4
~~~

ليه 4؟ أول محاولة عند 0، وبعدها retry بعد 200ms (عند 200)، ثم بعد 400ms (عند 600)، ثم بعد 800ms (عند 1400). التأخير بيتضاعف لحد 6.4 ثانية، وبحد أقصى 10 مرات، وده مكتوب في [[ProviderContainer.defaultRetry]] في كود Riverpod نفسه. ولو اللي اترمى [[Error]] (bug) مش [[Exception]]، مفيش retry.

---

## ٩. الـ solCode: [[FakeTodoRepo]] و main

~~~dart
class FakeTodoRepo implements TodoRepo {
  final _items = [const Todo(1, 'buy milk'), const Todo(2, 'call mom')];
  @override
  Future<List<Todo>> fetchAll() async {
    await Future.delayed(const Duration(seconds: 1));
    return _items;
  }
  @override
  Future<Todo> create(String title) async => Todo(_items.length + 1, title);
}
~~~

- [[implements TodoRepo]]: لازم يكتب الدالتين، و [[@override]] على كل واحدة.
- [[_items]]: الـ [[_]] في أول الاسم معناها private للملف ده.
- [[Future.delayed(...)]]: بيمثّل وقت الشبكة عشان تشوف الـ loader.
- [[async =>]]: دالة async بسطر واحد، الـ Todo بيتلف في Future لوحده.

~~~dart
void main() {
  runApp(ProviderScope(
    overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo())],
    child: const MaterialApp(home: Scaffold(body: TodosScreen())),
  ));
}
~~~

الـ ProviderScope من غير [[const]] لأن [[FakeTodoRepo()]] مش const. والـ [[TodosScreen]] من الدرس الجاي.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[AsyncNotifier<T>]] + [[Future<T> build()]] | تحميل async والحالات بتتدار لوحدها |
| [[AsyncValue]] | [[AsyncLoading]] أو [[AsyncData]] أو [[AsyncError]]، وفيه [[value]] و [[error]] و [[isLoading]] |
| repo كـ provider بـ [[throw UnimplementedError]] | لازم override: حقيقي في main و fake في الاختبار |
| [[ref.mounted]] بعد await | متحدّثش state لـ provider اتقفل |
| [[...?state.value]] | ضيف على الموجود حتى لو لسه null |
| retry تلقائي | 200ms ويتضاعف لحد 6.4s، 10 مرات، للـ Exception بس |

> الـ widget مش عارف البيانات جاية منين. بدّل الـ repo بـ override، والشاشة والـ Notifier زي ما هم.`,
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

[[ref.invalidate]] في زرار retry: بيعيد build فورًا من غير ما يستنى الـ retry التلقائي. وفي Riverpod 3 الحالة أثناء التحميل بتفضل شايلة الخطأ القديم ([[isLoading]] و [[isRefreshing]] بـ true)، فالـ case بتاع الخطأ لسه بيطابق والـ ErrorView بيفضل ظاهر لحد ما النتيجة توصل. لو عايز spinner في الزرار نفسه أثناء المحاولة، اسأل [[todos.isLoading]] جوه ErrorView.

الـ RefreshIndicator محتاج ابن scrollable. لو EmptyView كانت Column، السحب مش هيشتغل وهي فاضية. عشان كده ListView حتى لو فيها عنصرين.

رسالة الخطأ: [[$error]] بيعرض النص الخام للـ exception، كويس للتطوير. في الإنتاج اعمل دالة بتحوّل [[ClientException]] لـ «مفيش اتصال بالنت» و [[ApiException]] بـ 401 لـ «سجّل دخول تاني»، وغيره «حصل خطأ، حاول تاني».

البديل الأقدم: [[todos.when(data: ..., error: ..., loading: ...)]] لسه موجود، والـ switch بقى الأوضح مع sealed.

وبدل spinner: skeleton loaders (مستطيلات رمادي بشكل المحتوى) بتحسّس المستخدم إن التحميل أسرع. package [[skeletonizer]] مشهورة ليها.`,
            when: "كل شاشة بتعرض بيانات من الشبكة أو قاعدة البيانات. واعمل EmptyView و ErrorView widgets مشتركة في التطبيق كله عشان الشكل يبقى واحد.",
            mistakes: R`تعرض loader بس، والخطأ مبيظهرش فيفضل يلف. وتنسى حالة الفاضي. وتحط الخطأ قبل البيانات في الـ switch فأي refresh فاشل يمسح الشاشة. و RefreshIndicator حوالين Column أو Center فالسحب مش شغال في حالة الفاضي أو الخطأ. وتعرض [[Exception: SocketException: Failed host lookup...]] للمستخدم.`
          },
          teach: R`## الكود ده بيعمل إيه؟

شاشة بتقرا [[todosProvider]] من الدرس اللي فات، وبـ [[switch]] واحد بتختار تعرض إيه من ٤ حاجات: رسالة «فاضي»، أو اللستة، أو شاشة خطأ بزرار «حاول تاني»، أو spinner. وكلها جوه [[RefreshIndicator]] عشان السحب لتحت يعيد التحميل. اتجرّب في مشروع حقيقي جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44، flutter_riverpod 3.4.3): widget tests بتطبع اللي ظاهر في كل لحظة، والتطبيق نفسه بـ [[flutter run -d web-server]] واتصوّر بـ Chrome headless.

---

## ١. القراية

~~~dart
class TodosScreen extends ConsumerWidget {
  const TodosScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todos = ref.watch(todosProvider);
~~~

- [[ConsumerWidget]] و [[WidgetRef ref]]: زي درس ProviderScope.
- [[todos]] نوعه [[AsyncValue<List<Todo>>]]: مش اللستة، دي «الحالة» اللي جواها اللستة أو الخطأ أو ولا حاجة.
- [[ref.watch]]: كل ما الحالة تتغير (loading ← data مثلًا) build يتنادى تاني.

---

## ٢. [[RefreshIndicator]]: اسحب لتحت

~~~dart
    return RefreshIndicator(
      onRefresh: () => ref.refresh(todosProvider.future),
~~~

- [[RefreshIndicator]]: widget بيلف ابن scrollable، ولما المستخدم يسحب من فوق لتحت يظهر spinner صغير وينادي [[onRefresh]].
- [[onRefresh]] لازم ترجّع **Future**: الـ spinner بيفضل لحد ما يخلص.
- [[ref.refresh(todosProvider.future)]]: أعد build للـ provider، ورجّع Future بيخلص لما البيانات الجديدة توصل. ([[ref.refresh(todosProvider)]] من غير [[.future]] كان هيرجّع AsyncValue مش Future.)

---

## ٣. الـ [[switch]] و الـ patterns

~~~dart
      child: switch (todos) {
~~~

[[switch (x) { ... }]] هنا **expression**: بيرجّع قيمة (الـ widget)، وكل سطر شكله [[pattern => قيمة]]، وبيتجرّبوا بالترتيب، وأول واحد يطابق يكسب.

### الـ case الأول: فيه بيانات بس فاضية

~~~dart
        AsyncValue(:final value?) when value.isEmpty => const EmptyView(),
~~~

نفكّه:

- [[AsyncValue(...)]]: object pattern: «لو todos من نوع AsyncValue، بص جواه».
- [[:final value]]: هات الـ getter اللي اسمه [[value]] وحطه في متغير بنفس الاسم. ودي اختصار لـ [[value: final value]].
- [[?]] بعدها: null-check pattern: يطابق **بس** لو value مش null، ويدّيك value نوعه [[List<Todo>]] من غير [[?]].
- [[when value.isEmpty]]: شرط زيادة (guard): اللستة موجودة **وفاضية**.

### التاني: فيه بيانات

~~~dart
        AsyncValue(:final value?) => ListView.builder(
            itemCount: value.length,
            itemBuilder: (context, i) => ListTile(title: Text(value[i].title)),
          ),
~~~

- نفس الـ pattern من غير شرط: أي بيانات مش null (وهنا مش فاضية، لأن الفاضية اتمسكت فوق).
- [[ListView.builder]]: لستة بتبني العناصر اللي ظاهرة على الشاشة بس.
- [[itemCount]]: كام عنصر. و [[itemBuilder: (context, i) => ...]]: بيتنادى لكل رقم [[i]] ويرجّع الـ widget بتاعه.
- [[ListTile(title: Text(...))]]: صف جاهز من Material.

### التالت: خطأ

~~~dart
        AsyncValue(:final error?) => ErrorView(
            message: '$error',
            onRetry: () => ref.invalidate(todosProvider),
          ),
~~~

- [[:final error?]]: يطابق لو فيه خطأ (ومفيش بيانات، لأن البيانات اتمسكت قبله).
- [[$error]] جوه النص: بينادي [[toString()]] بتاع الـ exception، فبيطلع زي [[Exception: no internet]].
- [[ref.invalidate(todosProvider)]]: «القيمة دي قديمة، أعد build دلوقتي».

### الرابع: أي حاجة تانية

~~~dart
        _ => const Center(child: CircularProgressIndicator()),
      },
    );
~~~

[[_]] wildcard: بيطابق أي حاجة. هنا معناه: لا بيانات ولا خطأ، يبقى أول تحميل. [[CircularProgressIndicator]] الدايرة اللي بتلف.

---

## ٤. اللي حصل فعلًا

[[EmptyView]] و [[ErrorView]] عملتهم [[ListView]] فيها أيقونة ونص («مفيش مهام لسه» و الخطأ + زرار «حاول تاني»)، والـ repo هو [[FakeTodoRepo]] بتاع الـ solCode (بيستنى ثانية).

### لستة فاضية

~~~text flutter test
empty t=0: spinner
empty t=1s: EmptyView
~~~

### fail = true، وبعدين «حاول تاني»

~~~text flutter test (retry التلقائي مقفول)
fail t=1s: ErrorView(Exception: no internet)
after retry tap: ErrorView(Exception: no internet)
retry +1s: list[buy milk]
~~~

لاحظ السطر التاني: بعد الضغط مفيش spinner كبير، الـ ErrorView لسه ظاهر. ليه؟ طبعت الحالة نفسها بعد [[invalidate]]:

~~~text flutter test
  -> AsyncError<List<Todo>> isLoading=true hasValue=false error=Exception: no internet isRefreshing=true
  -> AsyncData<List<Todo>> isLoading=false hasValue=true error=null isRefreshing=false
~~~

في Riverpod 3 الحالة أثناء إعادة التحميل بتفضل شايلة الخطأ القديم ([[isLoading=true]] ومعاه [[error]])، فالـ case التالت لسه بيطابق لحد ما البيانات توصل.

### retry تلقائي من غير ما تدوس

نفس الكلام بس بالـ retry الافتراضي، وغيّرت fail لـ false ومدستش على حاجة:

~~~text flutter test
auto t=1s: ErrorView(Exception: no internet)
auto +3s (no tap): list[buy milk]
~~~

الشاشة اتصلّحت لوحدها: Riverpod عاد المحاولة (200ms ثم 400ms ثم 800ms...).

### pull-to-refresh وانت عندك بيانات

~~~text flutter test
data: list[buy milk, call mom]
during pull: list[buy milk, call mom] + pull-spinner
after pull: list[buy milk, call mom]
~~~

البيانات **مختفتش** أثناء السحب: الحالة loading بس [[value]] لسه فيها اللستة، فالـ case التاني هو اللي طابق. ودا سبب إن case البيانات جاي قبل case الخطأ وقبل الـ [[_]].

### السحب على الشاشة الفاضية

~~~text flutter test
pull on empty: EmptyView + pull-spinner
~~~

اشتغل لأن EmptyView نفسها [[ListView]]. لو كانت [[Column]] مكانش فيه حاجة تتسحب.

### على الشاشة

شغّلت الـ main بتاع الدرس اللي فات (FakeTodoRepo بعنصرين) بـ [[flutter run -d web-server --web-port 5994]] وصوّرت بـ Chrome headless: بعد ٢٠٠ms دايرة بتلف في نص الشاشة، وبعد الثانية [[buy milk]] و [[call mom]] كصفين.

---

## ٥. الـ solCode: [[FakeTodoRepo]] بـ flag

~~~dart
class FakeTodoRepo implements TodoRepo {
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
}
~~~

- [[FakeTodoRepo(this.items, {this.fail = false})]]: الـ items إجباري، و [[fail]] named اختياري افتراضيه false. فتعمل [[FakeTodoRepo([])]] أو [[FakeTodoRepo(items, fail: true)]].
- [[bool fail;]] من غير [[final]]: عشان تقدر تغيّره وانت شغال ([[r.fail = false]]) وتجرّب «حاول تاني».
- [[throw Exception('no internet')]]: [[Exception]] مش [[Error]]، فالـ retry التلقائي بيشتغل عليه.

---

## الخلاصة

| الـ case | بيطابق إمتى | بيعرض |
|---|---|---|
| [[AsyncValue(:final value?) when value.isEmpty]] | فيه لستة وفاضية | EmptyView |
| [[AsyncValue(:final value?)]] | فيه لستة (حتى أثناء refresh) | ListView |
| [[AsyncValue(:final error?)]] | خطأ ومفيش لستة | ErrorView + retry |
| [[_]] | غير كده: أول تحميل | spinner |

> الترتيب هو الشغل كله: البيانات قبل الخطأ قبل الـ loading، فالـ refresh ميمسحش الشاشة. والفاضي والخطأ يبقوا scrollable عشان السحب يشتغل.`,
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
          teach: R`## الكود ده بيعمل إيه؟

نفس السلة مكتوبة مرتين جنب بعض: مرة بـ [[provider]] ([[ChangeNotifier]]) ومرة بـ [[flutter_bloc]] ([[Cubit]])، وشاشة فيها عدّادين وزرار واحد بيضيف «tea» في الاتنين. الهدف إنك تعرف تقرا الاتنين. اتجرّب بـ widget tests في مشروع حقيقي ([[flutter pub add provider flutter_bloc]]: provider 6.1.5، flutter_bloc 9.1.1) جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44)، والاختبار بيدوس الزرار مرتين ويطبع العدّادين.

---

## ١. الـ imports

~~~dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
~~~

[[flutter_bloc]] فيها [[Cubit]] و [[BlocBuilder]] و [[BlocProvider]]. و [[provider]] فيها [[ChangeNotifierProvider]] و [[MultiProvider]] والـ extensions [[context.watch]] و [[context.read]].

---

## ٢. Provider: [[ChangeNotifier]]

~~~dart
class CartModel extends ChangeNotifier {
  final _items = <String>[];
  int get count => _items.length;
  void add(String item) {
    _items.add(item);
    notifyListeners();
  }
}
~~~

- [[extends ChangeNotifier]]: [[ChangeNotifier]] جاي من Flutter نفسه (مش من الـ package)، فيه لستة «سامعين» ودالة تبلّغهم.
- [[final _items = <String>[];]]: لستة نصوص عادية **بتتعدل من جوه** (mutable). [[final]] معناها المتغير ميشاورش على لستة تانية، مش إن اللستة متتغيرش.
- [[int get count => ...]]: getter، بتقراه كأنه حقل: [[model.count]].
- [[_items.add(item)]]: عدّل اللستة نفسها.
- [[notifyListeners()]]: «يا كل اللي سامعين، حاجة اتغيرت». من غيرها محدش يعرف.

---

## ٣. Bloc: [[Cubit]]

~~~dart
class CartCubit extends Cubit<List<String>> {
  CartCubit() : super(const []);
  void add(String item) => emit([...state, item]);
}
~~~

- [[Cubit<List<String>>]]: الـ state لستة نصوص، و **immutable**.
- [[CartCubit() : super(const [])]]: الـ [[:]] بعد الـ constructor اسمها initializer list، و [[super(...)]] بيبعت القيمة الأولية للأب: لستة فاضية [[const]] (متتعدلش خالص).
- [[emit(...)]]: الطريقة الوحيدة لتغيير الـ state. بتحط قيمة جديدة وتبلّغ.
- [[[...state, item]]]: لستة جديدة فيها القديم + الجديد. زي Notifier في Riverpod بالظبط.

---

## ٤. الشاشة

~~~dart
class CartPage extends StatelessWidget {
  ...
  Widget build(BuildContext context) {
    final providerCount = context.watch<CartModel>().count;
~~~

- [[StatelessWidget]] عادي: مفيش [[ref]]. الاتنين بيقروا من [[context]]، لأنهم بيحطوا القيم **في شجرة الـ widgets**.
- [[context.watch<CartModel>()]]: دوّر لفوق في الشجرة على CartModel، واشترك فيه. لما يعمل notifyListeners، **الـ build ده كله** يتنادى تاني.

~~~dart
        Text('Provider: $providerCount'),
        BlocBuilder<CartCubit, List<String>>(
          builder: (context, items) => Text('Bloc: $__{items.length}'),
        ),
~~~

- [[BlocBuilder<CartCubit, List<String>>]]: widget بيسمع الـ Cubit، والنوعين: الـ Cubit ونوع الـ state.
- [[builder: (context, items) => ...]]: بيتنادى مع كل state جديدة، و [[items]] هي الـ state. وبيعيد build **للجزء ده بس**، مش الشاشة كلها.

~~~dart
        FilledButton(
          onPressed: () {
            context.read<CartModel>().add('tea');
            context.read<CartCubit>().add('tea');
          },
          child: const Text('Add tea'),
        ),
~~~

- [[context.read<T>()]]: هات القيمة مرة من غير اشتراك. نفس قاعدة Riverpod: read في الـ callbacks، و watch في build.

---

## ٥. main: فين الحاجات دي متحطوطة؟

~~~dart
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
}
~~~

- [[MultiProvider(providers: [...])]]: بيحط كذا provider فوق بعض من غير تداخل. هنا واحد بس، بس دا الشكل المعتاد.
- [[ChangeNotifierProvider(create: (_) => CartModel())]]: بيعمل الـ CartModel أول مرة حد يطلبه، ويحطه في الشجرة، ويعمله dispose لما يتشال. [[(_)]] معناها «فيه باراميتر (context) بس مش محتاجه».
- [[BlocProvider(create: ...)]]: نفس الفكرة للـ Cubit، وبيقفله ([[close]]) لوحده.
- الترتيب: الاتنين **فوق** [[MaterialApp]]، فأي شاشة تحتهم تلاقيهم.

---

## ٦. اللي حصل فعلًا

~~~text flutter test (ضغطتين)
normal: Provider: 2 | Bloc: 2
~~~

### من غير [[notifyListeners()]]

~~~text flutter test
no notifyListeners: Provider: 0 | Bloc: 2
~~~

اللستة جوه CartModel فيها عنصرين، بس محدش اتبلّغ فـ [[context.watch]] معملش rebuild. وعدّاد Bloc شغال، ومش بيصلّح عدّاد Provider لأن BlocBuilder بيعيد build لنفسه بس.

### [[state.add(item); emit(state);]] في الـ Cubit

~~~text flutter test
state.add on const []: Provider: 2 | Bloc: 0
Unsupported operation: Cannot add to an unmodifiable list
~~~

الـ [[const []]] متتعدلش، فأول [[state.add]] ضرب. وعدّاد Provider زاد عادي لأن سطره اتنفذ قبل الـ Cubit.

وجربت نفس الغلطة بلستة أولية عادية [[<String>[]]]، مع CartModel من غير notify عشان محدش يعيد build للشاشة كلها:

~~~text flutter test
state.add growable + no notify: Provider: 0 | Bloc: 1
~~~

أول [[emit(state)]] عدّى (لسه محصلش emit قبل كده)، والتاني اتجاهل لأن [[emit]] بيعمل [[if (state == _state && _emitted) return;]] (من كود bloc نفسه): نفس الـ object. فالعدّاد واقف على 1 والحقيقة 2. ومع CartModel العادي الرقم كان طالع 2 بالصدفة، لأن notifyListeners عاد build للشاشة كلها.

### غلطتين تانيين جربتهم

[[context.watch]] جوه onPressed:

~~~text flutter test
Failed assertion: ... 'context.owner!.debugBuilding || listen == false || ...'
Tried to listen to a value exposed with provider, from outside of the widget tree.
~~~

و CartPage من غير ChangeNotifierProvider فوقها:

~~~text flutter test
Error: Could not find the correct Provider<CartModel> above this CartPage Widget
~~~

ودا الفرق الكبير عن Riverpod: هنا الخطأ وقت التشغيل لو الترتيب في الشجرة غلط.

---

## الخلاصة

| | Provider | Bloc (Cubit) | Riverpod |
|---|---|---|---|
| الـ state | mutable + [[notifyListeners()]] | immutable + [[emit]] | immutable + [[state =]] |
| فين بتتخزن | في الشجرة | في الشجرة | ProviderScope |
| القراية في build | [[context.watch<T>()]] | [[BlocBuilder]] | [[ref.watch]] |
| في callback | [[context.read<T>()]] | [[context.read<C>()]] | [[ref.read]] |
| تنساه فيحصل | الـ UI ميتحدثش | الـ UI ميتحدثش أو يضرب | الـ UI ميتحدثش |

> الثلاثة نفس الفكرة: قيمة بره الـ widget، و watch في build، و read في الأحداث. الفرق في مين بيبلّغ ومين بيخزّن.`,
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

ومع [[state.add(item); emit(state);]]: عدّاد Bloc بيفضل 0، وعدّاد Provider شغال. السبب المباشر إن الـ [[const []]] الأولية unmodifiable، فأول [[state.add]] بيضرب [[Unsupported operation: Cannot add to an unmodifiable list]]. ولو الأولية لستة عادية ([[super(<String>[])]])، أول emit بيعدّي (لسه محصلش emit قبله)، وبعد كده emit بيقارن بـ [[==]] ويلاقي نفس الـ object فبيتجاهله: العدّاد بيقف على 1. وخلي بالك إن notifyListeners بتاع Provider بيعيد build للشاشة كلها فبيخبّي المشكلة ويظهر 2. نفس الدرس بتاع Notifier في Riverpod: الـ state immutable.`
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
          teach: R`## الكود ده بيعمل إيه؟

class صغير ([[SettingsStore]]) بيحفظ ويقرا إعدادين: الثيم، وهل المستخدم شاف شاشة التعريف. و [[main]] بتقرا الثيم المحفوظ **قبل** أول frame وتشغّل التطبيق بيه. اتجرّب في مشروع حقيقي جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44، shared_preferences 2.5): unit test بتخزين في الذاكرة، والتطبيق نفسه مع الـ SegmentedButton بتاع الـ solCode بـ [[flutter run -d web-server]] وفتحته في Chrome headless.

---

## ١. الـ imports والـ store

~~~dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsStore {
  final _prefs = SharedPreferencesAsync();
~~~

- [[material.dart]] هنا عشان [[ThemeMode]] (enum فيه [[system]] و [[light]] و [[dark]]).
- [[SharedPreferencesAsync()]]: الـ API الجديد: كل قراية وكتابة [[await]]، ومفيش cache في الذاكرة، فدايمًا بتقرا آخر قيمة من التخزين.
- ليه class؟ عشان باقي التطبيق ينادي [[loadTheme()]] ومايعرفش اسم المفتاح [[theme]] ولا إزاي بيتخزن. ولو غيّرت التخزين بعدين، بتغيّر هنا بس.

---

## ٢. [[loadTheme]]: من نص لـ enum

~~~dart
  Future<ThemeMode> loadTheme() async {
    final raw = await _prefs.getString('theme');
    return ThemeMode.values.asNameMap()[raw] ?? ThemeMode.system;
  }
~~~

من جوه لبرة:

1. [[_prefs.getString('theme')]]: هات النص المتخزن تحت المفتاح [[theme]]. نوعه [[Future<String?>]]: ممكن null لو أول مرة.
2. [[ThemeMode.values]]: لستة كل قيم الـ enum.
3. [[.asNameMap()]]: بيحوّلها لـ Map من الاسم للقيمة.
4. [[[raw]]]: دوّر بالنص اللي جه. لو مش موجود (أو null) بيرجّع null.
5. [[?? ThemeMode.system]]: لو null خد الافتراضي.

~~~text flutter test
asNameMap: {system: ThemeMode.system, light: ThemeMode.light, dark: ThemeMode.dark}
unknown -> ThemeMode.system
~~~

---

## ٣. الحفظ والـ onboarding

~~~dart
  Future<void> saveTheme(ThemeMode mode) => _prefs.setString('theme', mode.name);

  Future<bool> seenOnboarding() async => await _prefs.getBool('onboarding_done') ?? false;

  Future<void> markOnboardingDone() => _prefs.setBool('onboarding_done', true);
}
~~~

- [[mode.name]]: اسم القيمة كنص: [[dark]]. بنخزّن الاسم مش [[mode.index]] (اللي هو [[2]] لـ dark): لو حد غيّر ترتيب الـ enum، الأرقام تبوظ والأسامي لأ.

~~~text flutter test
ThemeMode.dark.name=dark index=2
~~~

- [[setString]] و [[setBool]]: كل نوع ليه دالة. والأنواع المسموحة: String و int و double و bool و [[List<String>]].
- [[await _prefs.getBool(...) ?? false]]: الـ [[await]] بيتنفذ الأول فيدّي [[bool?]]، وبعدين [[??]]. يعني «لو مفيش قيمة يبقى لسه مشافهاش».

### التجربة في الذاكرة

في الاختبار مفيش موبايل، فحطيت تخزين وهمي ([[InMemorySharedPreferencesAsync.empty()]]) وعملت store جديد بعد الحفظ عشان أتأكد إن القيمة اتقرت من التخزين مش من متغير:

~~~text flutter test
first run: theme=ThemeMode.system onboarding=false
after save (new store): theme=ThemeMode.dark onboarding=true
~~~

---

## ٤. [[main]] بقت async

~~~dart
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final store = SettingsStore();
  final theme = await store.loadTheme();
  runApp(MaterialApp(themeMode: theme, darkTheme: ThemeData.dark(), home: const Placeholder()));
}
~~~

- [[Future<void> main() async]]: عشان نقدر نعمل [[await]] قبل [[runApp]].
- [[WidgetsFlutterBinding.ensureInitialized()]]: الـ «binding» هو الحتة اللي بتربط Dart بالـ engine والـ native (Android و iOS). الـ plugins بتكلم الـ native عن طريقه. [[runApp]] بيجهّزه لوحده، بس احنا بنكلم plugin **قبل** runApp، فلازم نجهّزه بإيدينا.
- [[await store.loadTheme()]]: استنى الثيم. فأول frame يترسم بالثيم الصح من غير «وميض».
- [[themeMode: theme]]: يختار بين [[theme]] (الفاتح الافتراضي) و [[darkTheme]]. و [[system]] معناها «زي الجهاز».
- [[Placeholder()]]: مربع بخطين متقاطعين، مكان مؤقت للشاشة الحقيقية.

### من غير ensureInitialized

الرسالة دي بتطلع لما أي كود يكلم الـ native قبل ما الـ binding يتجهز. طلّعتها في [[flutter test]] بـ [[MethodChannel]] (نفس الطريق اللي الـ plugins بتكلم بيه الـ native):

~~~text flutter test
Binding has not yet been initialized.
The "instance" getter on the ServicesBinding binding mixin is only available once that binding has been initialized.
Typically, this is done by calling "WidgetsFlutterBinding.ensureInitialized()" or "runApp()" (the latter calls the former).
~~~

على Android و iOS دي اللي بتظهر لأن الـ plugin بيكلم الـ native من نفس الطريق (من الـ docs، مفيش موبايل هنا). وعلى الويب جربت التطبيق من غير السطر ده واشتغل عادي، لأن plugin الويب مش بيعدّي على channel. فمتعتمدش على تجربة الويب: السطر ده لازم.

---

## ٥. على المتصفح: هل افتكر؟

شغّلت الـ solCode (SegmentedButton فوق MaterialApp في StatefulWidget) بـ [[flutter run -d web-server --web-port 5994]] وفتحته في Chrome headless:

1. أول فتح: «النظام» متعلّم والشاشة فاتحة، و localStorage فاضي:

~~~text Chrome
localStorage before: {}
~~~

2. دوست «غامق»: الشاشة بقت غامقة فورًا، والقيمة اتحفظت:

~~~text Chrome
localStorage after click: {"theme":"\"dark\""}
~~~

3. عملت reload للصفحة: فتحت غامقة من أول frame، و «غامق» متعلّم.

على الويب [[SharedPreferencesAsync]] بيخزّن في localStorage (المفتاح زي ما هو، والقيمة JSON). وعلى Android في DataStore، وعلى iOS في [[NSUserDefaults]] (من الـ docs، مفيش موبايل هنا). وفي كل الحالات **مش مشفّر**.

---

## ٦. الـ solCode: [[SegmentedButton]]

~~~dart
SegmentedButton<ThemeMode>(
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
)
~~~

- [[SegmentedButton<ThemeMode>]]: أزرار لازقة في بعض، وكل واحد ليه قيمة من النوع ده.
- [[ButtonSegment(value: ..., label: ...)]]: زرار واحد: القيمة اللي بيمثلها والنص.
- [[selected: {_theme}]]: **Set** (الأقواس [[{ }]] من غير [[:]])، لأن الـ widget ده ممكن يسمح باختيار أكتر من واحد.
- [[onSelectionChanged: (s)]]: [[s]] الـ Set الجديدة، و [[s.first]] القيمة اللي اختارها.
- [[setState]] يغيّر الثيم على الشاشة فورًا، و [[saveTheme]] يحفظه للمرة الجاية. مفيش [[await]] لأن المستخدم مش محتاج يستنى الحفظ.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[SharedPreferencesAsync()]] | key-value على الجهاز، كله async |
| [[getString]] / [[setString]] (و Bool و Int و Double و StringList) | قراية وكتابة، والقراية ممكن null |
| [[enum.name]] + [[values.asNameMap()]] | خزّن الاسم ورجّعه enum |
| [[WidgetsFlutterBinding.ensureInitialized()]] | قبل أي plugin قبل runApp |
| قراية في main قبل runApp | أول frame بالإعداد الصح |

> إعدادات صغيرة بس. مش مشفّر، فلا توكن ولا باسورد، ومش قاعدة بيانات.`,
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
          teach: R`## الكود ده بيعمل إيه؟

class بيفتح ملف SQLite اسمه [[notes.db]] (أو يعمله)، فيه جدول ملاحظات، ويرقّي الجدول لو التطبيق القديم كان عامله بشكل أقدم، وفيه ٣ عمليات: إضافة وبحث ومسح. sqflite محتاج Android أو iOS، فشغّلته في [[flutter test]] جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44، sqflite 2.4) بـ [[sqflite_common_ffi]]: نفس الـ API بالظبط بس فوق SQLite بتاع الكمبيوتر، بسطرين في أول الاختبار ([[sqfliteFfiInit(); databaseFactory = databaseFactoryFfi;]]). الكود نفسه متغيرش.

---

## ١. الـ imports

~~~dart
import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart';
~~~

- [[path]]: package لبناء المسارات صح على كل نظام ([[/]] على Android و iOS). [[as p]] عشان تكتب [[p.join]].
- [[sqflite]]: فيها [[Database]] و [[openDatabase]] و [[getDatabasesPath]].

---

## ٢. constructor private و [[open()]]

~~~dart
class NotesDb {
  NotesDb._(this._db);
  final Database _db;
~~~

- [[NotesDb._(...)]]: named constructor اسمه [[_]]، والـ [[_]] معناها private: محدش بره الملف يقدر يكتب [[NotesDb._(...)]].
- ليه؟ عشان فتح الـ database **async** (لازم await)، والـ constructor مينفعش يبقى async. فبنعمل دالة static async هي الطريق الوحيد.
- [[final Database _db]]: الاتصال المفتوح، بيتفتح مرة ويفضل.

~~~dart
  static Future<NotesDb> open() async {
    final path = p.join(await getDatabasesPath(), 'notes.db');
~~~

- [[static]]: بتتنادى على الـ class نفسه: [[await NotesDb.open()]].
- [[getDatabasesPath()]]: الفولدر اللي النظام بيحط فيه قواعد البيانات للتطبيق ده. في الاختبار طلع:

~~~text flutter test
getDatabasesPath: /w/app/.dart_tool/sqflite_common_ffi/databases
~~~

على Android بيبقى جوه فولدر التطبيق الخاص (من الـ docs). و [[p.join(...)]] بيلزق الفولدر واسم الملف بالفاصل الصح.

---

## ٣. [[openDatabase]]: version و onCreate و onUpgrade

~~~dart
    final db = await openDatabase(
      path,
      version: 2,
      onCreate: (db, version) async {
        await db.execute('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, pinned INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)');
      },
~~~

- [[version: 2]]: رقم «شكل الجداول». sqflite بيحفظه جوه الملف نفسه.
- [[onCreate]]: بيتنادى **بس** لو الملف مكانش موجود (أول تسطيب). بيعمل الجداول بآخر شكل.
- [[db.execute('...')]]: نفّذ SQL مبيرجّعش صفوف.

الجملة نفسها:

| الحتة | معناها |
|---|---|
| [[id INTEGER PRIMARY KEY AUTOINCREMENT]] | رقم بيزيد لوحده، ومتكررش |
| [[title TEXT NOT NULL]] | نص، وإجباري |
| [[pinned INTEGER NOT NULL DEFAULT 0]] | SQLite مفيهوش bool، فـ 0 و 1، والافتراضي 0 |
| [[created_at TEXT NOT NULL]] | التاريخ كنص ISO 8601 |

~~~dart
      onUpgrade: (db, oldVersion, newVersion) async {
        if (oldVersion < 2) await db.execute('ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0');
      },
    );
    return NotesDb._(db);
  }
~~~

- [[onUpgrade]]: بيتنادى لو الملف موجود ورقمه **أقل** من [[version]]. [[oldVersion]] اللي في الملف، و [[newVersion]] اللي في الكود.
- [[if (oldVersion < 2)]]: طبّق الفرق بين 1 و 2 بس: ضيف العمود.
- [[ALTER TABLE ... ADD COLUMN]]: ضيف عمود لجدول موجود من غير ما تمسح بياناته.

### التجربة: تطبيق قديم عنده version 1

عملت ملف بـ version 1 (جدول من غير [[pinned]]) وفيه ملاحظة، وبعدين فتحته بـ [[NotesDb.open()]]:

~~~text flutter test
version now: 2
columns: [id, title, created_at, pinned]
~~~

العمود اتضاف في الآخر، والملاحظة القديمة لسه موجودة (هتشوفها تحت بـ [[id]] 1).

ولو نسيت onUpgrade (onCreate بس بالشكل الجديد)، الملف القديم مش بيتعمله حاجة، وأول query فيها pinned:

~~~text flutter test
no onUpgrade: SqfliteFfiException(sqlite_error: 1, , SqliteException(1): while preparing statement, no such column: pinned, SQL logic error (code 1)
~~~

---

## ٤. [[add]]: insert بـ Map

~~~dart
  Future<int> add(String title) => _db.insert('notes', {'title': title, 'created_at': DateTime.now().toIso8601String()});
~~~

- [[_db.insert('notes', {...})]]: اسم الجدول و Map من اسم العمود للقيمة. sqflite بيبني [[INSERT]] لوحده بـ [[?]].
- [[DateTime.now().toIso8601String()]]: الوقت كنص زي [[2026-10-07T19:37:30.178925]]. الشكل ده بيترتّب صح كنص.
- [[id]] و [[pinned]] مش مكتوبين: الأول بيتولّد والتاني افتراضيه 0.
- بيرجّع [[Future<int>]]: الـ id الجديد.

~~~text flutter test
add -> id 2
add -> id 3
add -> id 4
~~~

بدأ من 2 لأن الملاحظة القديمة أخدت 1.

---

## ٥. [[search]]: query بـ [[?]]

~~~dart
  Future<List<Map<String, Object?>>> search(String q) =>
      _db.query('notes', where: 'title LIKE ?', whereArgs: ['%$q%'], orderBy: 'pinned DESC, id DESC');
~~~

- [[_db.query('notes', ...)]]: [[SELECT * FROM notes]] مع شروط.
- [[where: 'title LIKE ?']]: الشرط، و [[?]] مكان فاضي للقيمة.
- [[whereArgs: ['%$q%']]]: القيمة اللي هتتحط مكان الـ [[?]]. [[%]] في LIKE معناها «أي حروف»، فـ [[%milk%]] = فيه milk في أي مكان.
- [[orderBy: 'pinned DESC, id DESC']]: المتثبّت الأول، وبعدين الأحدث.
- النتيجة [[List<Map<String, Object?>>]]: كل صف Map من اسم العمود للقيمة.

~~~text flutter test
search("milk"): [{id: 4, title: milk prices, created_at: 2026-10-07T19:37:30.178925, pinned: 0}, {id: 2, title: buy milk, created_at: 2026-10-07T19:37:30.145650, pinned: 0}]
~~~

بعد [[togglePin(2)]] (الـ solCode) والبحث بنص فاضي (يعني الكل):

~~~text flutter test
after togglePin(2), search(""): [2:buy milk:pinned=1, 4:milk prices:pinned=0, 3:call mom:pinned=0, 1:old note:pinned=0]
~~~

المتثبّت طلع أول، والباقي من الأحدث للأقدم.

### ليه [[?]] مش interpolation؟

جربت البحث بـ [[' OR 1=1 --]] بالطريقتين:

~~~text flutter test
safe search(evil): []
interpolated SQL: title LIKE '%' OR 1=1 --%'
interpolated rows: 4
~~~

- بـ whereArgs: اتعامل معاه كنص عادي بيدوّر عليه، فمفيش نتايج.
- بـ [[where: "title LIKE '%$evil%'"]]: الـ [[']] قفل النص بدري، و [[OR 1=1]] بقى شرط دايمًا صح، و [[--]] خلّى الباقي تعليق. فرجع **كل** الملاحظات. ودا SQL injection.

---

## ٦. [[remove]]

~~~dart
  Future<int> remove(int id) => _db.delete('notes', where: 'id = ?', whereArgs: [id]);
}
~~~

بيرجّع عدد الصفوف اللي اتمسحت:

~~~text flutter test
remove(1) -> 1 rows
remove(99) -> 0 rows
~~~

ولما جربت insert من غير title، الـ [[NOT NULL]] اشتغل:

~~~text flutter test
NOT NULL: ... NOT NULL constraint failed: notes.title, constraint failed (code 1299)
~~~

---

## ٧. الـ solCode: togglePin و version 3

~~~dart
Future<int> togglePin(int id) =>
    _db.rawUpdate('UPDATE notes SET pinned = 1 - pinned WHERE id = ?', [id]);
~~~

- [[rawUpdate]]: SQL مكتوب بإيدك، والـ list التانية هي قيم الـ [[?]].
- [[pinned = 1 - pinned]]: لو 0 تبقى 1، ولو 1 تبقى 0. قلب في سطر واحد من غير ما تقرا القيمة الأول.

~~~dart
version: 3,
onCreate: ... body TEXT ...,
onUpgrade: (db, oldVersion, newVersion) async {
  if (oldVersion < 2) await db.execute('ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0');
  if (oldVersion < 3) await db.execute('ALTER TABLE notes ADD COLUMN body TEXT');
},
~~~

فتحت نفس الملف (اللي بقى version 2) بالكود ده:

~~~text flutter test
onUpgrade 2 -> 3
v3 rows: [{id: 2, title: buy milk, created_at: ..., pinned: 1, body: null}, {id: 3, title: call mom, ...}, {id: 4, title: milk prices, ...}]
~~~

- اتنفذ شرط [[< 3]] بس (لأن الملف كان 2)، والبيانات فضلت، و [[body]] بـ [[null]] في القديم.
- تطبيق عنده version 1 كان هيعدّي على الشرطين بالترتيب. وتطبيق جديد خالص: onCreate بس، وفيها body من الأول.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[openDatabase(path, version:, onCreate:, onUpgrade:)]] | افتح أو اعمل، وارقّي الشكل |
| onCreate | أول تسطيب: آخر شكل |
| [[if (oldVersion < N)]] في onUpgrade | كل تغيير خطوة، بالترتيب |
| [[insert]] / [[query]] / [[delete]] / [[rawUpdate]] | العمليات، والـ id أو عدد الصفوف بيرجع |
| [[where: 'x = ?', whereArgs: [v]]] | القيم منفصلة عن الـ SQL: مفيش injection |

> onCreate لأي حد جديد، و onUpgrade لأي حد قديم، والاتنين لازم يوصلوا لنفس الشكل. والـ bug بتاع onUpgrade مش هيظهر عندك، هيظهر عند اللي عندهم التطبيق القديم.`,
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
          teach: R`## الكود ده بيعمل إيه؟

class صغير ([[TokenStore]]) بيحفظ توكنين بعد الـ login، ويقرا الـ access token، ويمسح كله في الـ logout، وكله فوق [[flutter_secure_storage]]. اتجرّب في مشروع حقيقي (flutter_secure_storage 11.2.0) جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44): بـ [[flutter test]] مع التخزين الوهمي اللي الـ package نفسها بتوفّره، وعلى الويب في Chrome headless. الـ Keychain والـ Keystore محتاجين موبايل، فكلامهم من الـ docs والـ CHANGELOG بتاع الـ package.

---

## ١. الـ class و الـ storage

~~~dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TokenStore {
  const TokenStore();
  static const _storage = FlutterSecureStorage();
~~~

- [[const TokenStore();]]: constructor [[const]]: الـ class مفيهوش حقول بتتغير، فتقدر تكتب [[const TokenStore()]] في أي مكان ويبقى نفس الـ object.
- [[static]]: الحقل ده تبع الـ class نفسه مش كل object، فنسخة واحدة بس.
- [[const FlutterSecureStorage()]]: الـ object نفسه خفيف ومفيهوش state، هو بس «باب» للتخزين الآمن بتاع النظام. والقيم نفسها مش جواه.
- [[_storage]]: الـ [[_]] private: باقي التطبيق ميكلمش التخزين مباشرة.

---

## ٢. [[save]]: كتابة توكنين

~~~dart
  Future<void> save(String access, String refresh) async {
    await _storage.write(key: 'access_token', value: access);
    await _storage.write(key: 'refresh_token', value: refresh);
  }
~~~

- [[write(key: ..., value: ...)]]: named parameters: المفتاح والقيمة، والاتنين String.
- [[await]] على كل واحدة: كل write بتروح للـ native (تشفير وكتابة)، فبنستنى تخلص.
- **access token**: قصير العمر، بيتبعت مع كل طلب. **refresh token**: أطول، بيجيب access جديد لما القديم ينتهي.

---

## ٣. [[get access]]: getter async

~~~dart
  Future<String?> get access => _storage.read(key: 'access_token');
~~~

- [[get access]]: getter، بتستخدمه من غير أقواس: [[await store.access]].
- [[Future<String?>]]: القيمة هتوصل بعدين، وممكن [[null]] لو مفيش توكن (مش عامل login).

---

## ٤. [[clear]]

~~~dart
  Future<void> clear() => _storage.deleteAll();
}
~~~

[[deleteAll()]] بيمسح كل اللي التطبيق ده حاطه في الـ secure storage. ولو عايز واحد بس: [[delete(key: 'access_token')]].

---

## ٥. اللي حصل فعلًا

في الاختبار مفيش موبايل، فـ [[FlutterSecureStorage.setMockInitialValues({})]] بيحط تخزين وهمي في الذاكرة بنفس الـ API:

~~~text flutter test
before login: null
after save: eyJhbGciOi.access
all: {access_token: eyJhbGciOi.access, refresh_token: r-123}
after clear: null  all={}
~~~

- قبل الـ login: [[null]].
- [[readAll()]]: كل المفاتيح والقيم، اتنين بعد save.
- بعد clear: فاضي.

### على الويب

نفس الـ class في تطبيق ويب بيحفظ التوكن لو مش موجود ويعرضه، وفتحته مرتين في Chrome: الفتحة التانية لقت التوكن محفوظ ([[before=eyJhbGciOi.access]]). وده اللي اتخزن في localStorage:

~~~text Chrome localStorage
"FlutterSecureStorage.refresh_token": "+eGTqHbuntb+8nBu.ivQCDLufNmHBLQYheDsBj1VzALCR",
"FlutterSecureStorage": "HSrty/tIMFblJgy8UQo5f8gFvyCktEVu+jNDEMqJRvk=",
"FlutterSecureStorage.access_token": "BlmG8emTZvutsFsX.Uf5cN0IP+pFXmVQXMy9dmvQZYhlzRzbFFyZCwJmDgM8U"
~~~

القيم مشفّرة (مش [[eyJ...]] كنص)، بس لاحظ إن **المفتاح نفسه** ([[FlutterSecureStorage]]) متخزن جنبها في نفس المكان. يعني أي script بيشتغل في الصفحة (XSS) يقدر يفكهم. عشان كده على الويب الأحسن httpOnly cookies.

### على الموبايل (من الـ docs)

| النظام | فين | ملاحظة |
|---|---|---|
| Android | ملف مشفّر بـ AES-GCM، ومفتاحه متغلّف بـ RSA OAEP في Android Keystore | من نسخة 10 الـ package سابت Jetpack Security، ونسخة 11 شالت [[encryptedSharedPreferences]] خالص ورفعت minSdk لـ 24 (من الـ CHANGELOG) |
| iOS | Keychain | بيفضل بعد مسح التطبيق |
| Web | localStorage مشفّر بـ WebCrypto | المفتاح جنب البيانات |

و [[resetOnError]] افتراضيه [[true]] من نسخة 10 (اتأكدت منه في [[android_options.dart]] جوه الـ package: [[bool resetOnError = true]]).

---

## ٦. الـ solCode: اقرا التوكن قبل runApp

~~~dart
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  session.value = await const TokenStore().access;
  runApp(MaterialApp.router(routerConfig: router));
}
~~~

- [[ensureInitialized()]]: لازم قبل أي plugin قبل runApp (درس shared_preferences).
- [[session]]: الـ [[ValueNotifier<String?>]] بتاع درس redirect، اللي الـ GoRouter بيسمعه بـ [[refreshListenable]].
- [[await const TokenStore().access]]: اقرا التوكن **مرة واحدة** قبل أول frame. لو موجود، الـ redirect مش هيودّي login.
- [[MaterialApp.router(routerConfig: router)]]: التطبيق بالـ GoRouter.

جربت ده بـ widget test بالـ router بتاع درس redirect، مرة بتخزين فاضي ومرة فيه توكن:

~~~text flutter test
startup storage={} -> screen "login" path=/login?from=%2F
startup storage={access_token: eyJ.saved} -> screen "home" path=/
~~~

- من غير توكن: اتحوّل لـ login، و [[from=%2F]] هي [[/]] متشفّرة في الـ URL (عشان يرجع لها بعد الدخول).
- بتوكن: فتح على الرئيسية على طول.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[const FlutterSecureStorage()]] | باب للتخزين الآمن بتاع النظام |
| [[write(key:, value:)]] / [[read(key:)]] | String بس، وكله async |
| [[delete]] / [[deleteAll]] | logout |
| قراية مرة في main | أول شاشة صح، ومتقراش في build |
| [[setMockInitialValues({})]] | تخزين وهمي للاختبارات |

> التوكن هنا مش في shared_preferences. وعلى iOS بيفضل بعد مسح التطبيق، وعلى الويب مش آمن زي الموبايل.`,
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
          teach: R`## الكود ده بيعمل إيه؟

class واحد ([[ApiClient]]) بيعمل ٣ حاجات: login بيبعت الإيميل والباسورد ويخزّن التوكن اللي راجع في الـ secure storage، و [[get]] بيحط التوكن في كل طلب ويتعامل مع الردود الغلط، و logout بيمسح التوكن. جربته بجد: شغّلت API وهمي بـ Node على الجهاز (بورت 5995) فيه [[POST /auth/login]] و [[GET /me]] محمي و [[GET /boom]] بيرجّع 500، والكود اتشغّل في [[flutter test]] جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44، http 1.6) بـ [[--dart-define=API_URL=http://host.docker.internal:5995]] ([[host.docker.internal]] هو الجهاز من جوه Docker، زي [[10.0.2.2]] من الـ emulator). والـ secure storage بالتخزين الوهمي بتاع الـ package.

---

## ١. الـ imports والعنوان

~~~dart
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

const apiUrl = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');
~~~

- [[dart:convert]]: فيها [[jsonEncode]] (Map ← نص JSON) و [[jsonDecode]] (نص JSON ← Map أو List).
- [[apiUrl]]: نفس فكرة درس ProviderScope: بيتحدد وقت الـ build بـ [[--dart-define]]، والافتراضي الكمبيوتر من الـ Android emulator.

~~~text flutter test
apiUrl=http://host.docker.internal:5995
~~~

---

## ٢. exception خاص و الـ constructor

~~~dart
class UnauthorizedException implements Exception {}

class ApiClient {
  ApiClient({http.Client? client, this.onUnauthorized}) : _http = client ?? http.Client();
  final http.Client _http;
  final void Function()? onUnauthorized;
  final _storage = const FlutterSecureStorage();
~~~

- [[implements Exception]]: نوع خاص بيك، فالشاشة تقدر تعمل [[on UnauthorizedException]] وتفرّقه عن أي خطأ تاني.
- [[{http.Client? client, this.onUnauthorized}]]: الاتنين named واختياريين.
- [[: _http = client ?? http.Client()]]: initializer list: لو حد بعت client (في الاختبار: [[MockClient]]) استخدمه، غير كده اعمل واحد حقيقي.
- [[void Function()?]]: نوعه «دالة مش بتاخد حاجة ومش بترجّع حاجة، أو null». هتتنادى لما الجلسة تنتهي.

---

## ٣. [[login]]

~~~dart
  Future<void> login(String email, String password) async {
    final res = await _http.post(
      Uri.parse('$apiUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
~~~

- [[_http.post(url, headers:, body:)]]: طلب POST.
- [[Content-Type: application/json]]: بنقول للسيرفر «الـ body ده JSON». Express بـ [[express.json()]] و FastAPI بـ Pydantic محتاجينه.
- [[jsonEncode({...})]]: الـ Map بقى نص زي اللي السيرفر استلمه:

~~~text log السيرفر
POST /auth/login auth=- ct=application/json body={"email":"ali@mail.com","password":"secret123"}
~~~

~~~dart
    if (res.statusCode != 200) throw UnauthorizedException();
    final {'token': String token} = jsonDecode(res.body) as Map<String, dynamic>;
    await _storage.write(key: 'token', value: token);
  }
~~~

- [[res.statusCode]]: رقم الرد. أي حاجة غير 200 هنا معناها بيانات غلط.
- [[jsonDecode(res.body) as Map<String, dynamic>]]: نص الرد بقى Map، و [[as]] بيقول للـ compiler نوعه.
- [[final {'token': String token} = ...]]: map pattern: «الـ Map لازم فيه مفتاح [[token]] قيمته String، وحطها في متغير [[token]]». لو مش كده بيرمي فورًا.
- [[_storage.write]]: خزّن التوكن في المكان الآمن.

~~~text flutter test
login wrong password -> THROWS UnauthorizedException: Instance of 'UnauthorizedException'
login ok -> stored token=tok-abc123
~~~

### لو الـ backend بيرجّع [[access_token]]

بعتّ رد زي بتاع FastAPI ([[{"access_token":"abc","token_type":"bearer"}]]) بـ [[MockClient]] من [[package:http/testing.dart]]:

~~~text flutter test
login with access_token response -> THROWS StateError: Bad state: Pattern matching error
~~~

الـ pattern مالقاش [[token]] فرمى على طول، بدل ما يخزّن null ويكمّل. عدّل الـ pattern لشكل الرد بتاعك.

---

## ٤. [[get]]: التوكن في الهيدر

~~~dart
  Future<dynamic> get(String path) async {
    final token = await _storage.read(key: 'token');
    final res = await _http.get(Uri.parse('$apiUrl$path'), headers: {
      'Accept': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    });
~~~

- [[Future<dynamic>]]: الرد ممكن Map أو List، فالنوع مفتوح.
- [[_storage.read]]: هات التوكن (أو null).
- [[Accept: application/json]]: «عايز الرد JSON».
- [[if (token != null) 'Authorization': ...]]: collection if جوه الـ Map: الهيدر ده يتحط **بس** لو فيه توكن.
- [[Bearer $token]]: الشكل القياسي: كلمة [[Bearer]] ومسافة والتوكن. ودا اللي السيرفر شافه:

~~~text log السيرفر
GET /me auth=Bearer tok-abc123 ct=- body=
~~~

~~~text flutter test
get /todos (no token) -> [{id: 1, title: buy milk}, {id: 2, title: call mom}, {id: 3, title: from flutter}]
get /me -> {id: 7, email: ali@mail.com}
~~~

[[/todos]] مش محمي فرجع من غير توكن، و [[/me]] رجع بعد الـ login.

---

## ٥. 401: الجلسة انتهت

~~~dart
    if (res.statusCode == 401) {
      await _storage.delete(key: 'token');
      onUnauthorized?.call();
      throw UnauthorizedException();
    }
~~~

- [[401]] Unauthorized: التوكن مش موجود أو غلط أو انتهى.
- [[_storage.delete]]: التوكن ده خلاص ملوش لازمة.
- [[onUnauthorized?.call()]]: [[?.]] معناها «لو مش null نادي». الـ [[call()]] هي اللي بتنادي الدالة. في التطبيق دي بتعمل [[session.value = null]] فالـ router يرجّعك login.
- [[throw]]: عشان الشاشة اللي طلبت تعرف إن الطلب فشل.

غيّرت التوكن المتخزن لـ [[tampered]]:

~~~text flutter test
get /me (bad token) -> THROWS UnauthorizedException: Instance of 'UnauthorizedException'
after 401: stored token=null onUnauthorized calls=2
~~~

التوكن اتمسح، و [[onUnauthorized]] اتنادت مرتين في الاختبار كله: مرة هنا ومرة لما طلبت [[/me]] من غير توكن في الأول.

---

## ٦. أي خطأ تاني، والرد العادي

~~~dart
    if (res.statusCode >= 400) throw http.ClientException('HTTP $__{res.statusCode}', res.request?.url);
    return jsonDecode(res.body);
  }

  Future<void> logout() => _storage.delete(key: 'token');
}
~~~

- [[>= 400]]: 4xx (غلط من التطبيق) و 5xx (السيرفر وقع).
- [[http.ClientException(message, uri)]]: نوع جاهز من http، فيه الرسالة والعنوان. [[res.request?.url]]: [[?.]] لأن الـ request ممكن يبقى null.
- [[return jsonDecode(res.body)]]: كله تمام.

~~~text flutter test
get /boom -> THROWS ClientException: ClientException: HTTP 500, uri=http://host.docker.internal:5995/boom
~~~

ولو السيرفر مش شغال خالص (جربت بورت مفيش عليه حاجة):

~~~text flutter test
server down -> THROWS _ClientSocketException: ClientException with SocketException: Connection refused (OS Error: Connection refused, errno = 111), ...
~~~

ودي اللي هتشوفها لو العنوان أو البورت غلط، أو استخدمت [[localhost]] من جوه الـ emulator.

---

## ٧. العنوان حسب الجهاز

| بتشغّل على | [[API_URL]] |
|---|---|
| Android emulator | [[http://10.0.2.2:3000]] |
| iOS simulator | [[http://localhost:3000]] |
| موبايل حقيقي على نفس الـ WiFi | IP الكمبيوتر، والسيرفر بيسمع على [[0.0.0.0]] |
| موبايل بـ USB | [[adb reverse tcp:3000 tcp:3000]] و [[http://localhost:3000]] |
| الإنتاج | [[https://...]] من [[--dart-define-from-file]] |

(جوه Docker: [[host.docker.internal]] زي ما استخدمت هنا.)

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| login | POST بـ JSON، وغير 200 = بيانات غلط |
| شكل الرد | [[final {'token': String token} = ...]] بيرمي لو مختلف |
| كل طلب | [[Authorization: Bearer <token>]] لو موجود |
| 401 | امسح التوكن، بلّغ ([[onUnauthorized]])، وارمي |
| 4xx و 5xx التانية | [[ClientException]] |

> class واحد بيعرف العنوان والتوكن والـ 401، وباقي التطبيق بيقول [[api.get('/me')]] وخلاص.`,
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
          teach: R`## الكود ده بيعمل إيه؟

ملف اختبار فيه اختبارين لـ [[LoginForm]] (من درس «Form و validator»): الأول بيدوس Sign in والحقول فاضية ويتأكد إن رسالتين الخطأ ظهروا، والتاني بيكتب إيميل وباسورد صح ويدوس ويتأكد من «Signing in...» وبعدين رسالة الترحيب. حطيت الـ LoginForm في [[lib/login_form.dart]] في مشروع اسمه [[my_app]]، والملف ده في [[test/login_form_test.dart]]، وشغّلت [[flutter test]] جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44). مفيش موبايل ولا emulator.

~~~text flutter test test/login_form_test.dart
00:00 +0: loading /w/app/test/login_form_test.dart
00:00 +0: empty fields show both errors
00:00 +1: valid input signs in
00:01 +2: All tests passed!
~~~

[[+1]] و [[+2]] عدد اللي نجح لحد دلوقتي، و [[00:01]] الوقت: ثانية للاتنين.

---

## ١. الـ imports

~~~dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/login_form.dart';
~~~

- [[flutter_test]]: جاية مع أي مشروع [[flutter create]] في [[dev_dependencies]]. فيها [[testWidgets]] و [[find]] و [[expect]].
- [[package:my_app/...]]: ملف من مشروعك نفسه. [[my_app]] هو [[name:]] في [[pubspec.yaml]]، و [[login_form.dart]] جوه [[lib/]].

---

## ٢. دالة بتبني الشاشة

~~~dart
void main() {
  Widget app() => const MaterialApp(home: Scaffold(body: LoginForm()));
~~~

- [[main]]: [[flutter test]] بيشغّل main بتاعة كل ملف بينتهي بـ [[_test.dart]] جوه [[test/]].
- [[app()]]: دالة صغيرة عشان كل اختبار يبني نسخة جديدة.
- ليه [[MaterialApp]] و [[Scaffold]]؟ الـ [[TextFormField]] محتاج Theme واتجاه الكتابة، و [[ScaffoldMessenger.of(context)]] (اللي بيعرض الـ SnackBar) محتاج Scaffold فوقه. لوحده الـ LoginForm هيضرب.

---

## ٣. الاختبار الأول: الحقول فاضية

~~~dart
  testWidgets('empty fields show both errors', (tester) async {
    await tester.pumpWidget(app());
    await tester.tap(find.text('Sign in'));
    await tester.pump();
    expect(find.text('اكتب إيميل صحيح'), findsOneWidget);
    expect(find.text('8 حروف على الأقل'), findsOneWidget);
  });
~~~

- [[testWidgets('اسم', (tester) async { ... })]]: اختبار widget. الاسم بيظهر في الناتج، و [[tester]] هو اللي بيبني ويدوس ويكتب.
- [[pumpWidget(app())]]: ابني الشاشة وارسم أول frame.
- [[find.text('Sign in')]]: «دوّر على widget فيه النص ده». ده **finder**: وصف للي بتدوّر عليه، مش الـ widget نفسه.
- [[tap(...)]]: دوس عليه. الـ [[_submit]] بيتنادى، والـ validators بيشتغلوا.
- [[pump()]]: ارسم frame جديد. من غيره الشاشة لسه زي ما كانت قبل الضغطة، والرسايل مش هتظهر.
- [[expect(finder, findsOneWidget)]]: «لازم يبقى فيه واحد بالظبط». لو صفر أو اتنين الاختبار يقع.

---

## ٤. الاختبار التاني: بيانات صح

~~~dart
    await tester.enterText(find.byType(TextFormField).first, 'ali@mail.com');
    await tester.enterText(find.byType(TextFormField).last, 'secret123');
    await tester.tap(find.byType(FilledButton));
    await tester.pump();
    expect(find.text('Signing in...'), findsOneWidget);
~~~

- [[find.byType(TextFormField)]]: كل الحقول من النوع ده (اتنين). [[.first]] الإيميل، و [[.last]] الباسورد.
- [[enterText(finder, 'نص')]]: اكتب في الحقل كأن المستخدم كتب.
- [[find.byType(FilledButton)]]: الزرار بنوعه بدل نصه.
- بعد [[pump()]]: [[_busy]] بقى true، فالزرار بيقول «Signing in...».

~~~dart
    await tester.pump(const Duration(seconds: 1));
    await tester.pump();
    expect(find.text('Welcome ali@mail.com'), findsOneWidget);
  });
}
~~~

- الـ LoginForm فيه [[await Future.delayed(const Duration(seconds: 1))]]. في الاختبار **الوقت وهمي**: محدش بيستنى ثانية بجد.
- [[pump(const Duration(seconds: 1))]]: قدّم الساعة الوهمية ثانية وارسم. الـ Future.delayed خلص، و [[setState]] و [[showSnackBar]] اتنادوا.
- [[pump()]] تاني: frame كمان عشان الـ SnackBar يتبني.

### التجربة: [[pumpAndSettle()]] بدل الاتنين

~~~text flutter test
pumpAndSettle advanced fake time: 700ms, busy=true
Expected: exactly one matching candidate
  Actual: _TextWidgetFinder:<Found 0 widgets with text "Welcome ali@mail.com": []>
~~~

قِست الساعة الوهمية: [[pumpAndSettle]] قدّمها 700ms بس، لأنه بيرسم frames لحد ما الـ animations تخلص (ripple الزرار) وبيوقف. الـ delay ثانية، فلسه «Signing in...». الوقت المحدد = [[pump(Duration)]].

---

## ٥. التجربة التالتة: [[TodosScreen]] (الـ solCode)

~~~dart
testWidgets('empty todos', (tester) async {
  await tester.pumpWidget(ProviderScope(
    overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo([]))],
    child: const MaterialApp(home: Scaffold(body: TodosScreen())),
  ));
  expect(find.byType(CircularProgressIndicator), findsOneWidget);
  await tester.pump(const Duration(seconds: 1));
  await tester.pump();
  expect(find.text('مفيش مهام لسه'), findsOneWidget);
});
~~~

- [[ProviderScope(overrides: [...])]]: نفس الـ override بتاع main، بس بـ repo فاضي.
- أول frame: لسه بيحمّل، فالـ spinner موجود.
- [[pump(1s)]]: الـ [[Future.delayed]] بتاع الـ FakeTodoRepo خلص، و [[pump()]] رسم EmptyView.

~~~text flutter test
00:01 +3: /w/app/test/todos_screen_test.dart: empty todos
~~~

ليه مش [[pumpAndSettle()]] من الأول؟ لأن [[CircularProgressIndicator]] animation مبتخلصش، فـ pumpAndSettle هيفضل يستنى لحد ما يضرب timeout.

### والشبكة الحقيقية؟

جربت [[http.get]] حقيقي للـ API الوهمي جوه [[testWidgets]]:

~~~text flutter test
status=400 body=""
~~~

الـ widget tests بتقفل الشبكة عمدًا وبترجّع 400 لأي طلب. عشان كده الـ repo لازم يبقى provider تبدّله بـ fake.

---

## ٦. golden test (من الـ deep)

~~~dart
await expectLater(find.byType(LoginForm), matchesGoldenFile('goldens/login_form.png'));
~~~

جربته ٣ مرات:

~~~text flutter test
Could not be compared against non-existent file: "goldens/login_form.png"
~~~

~~~text flutter test --update-goldens
00:00 +1: All tests passed!
~~~

وبعد ما غيّرت نص الزرار لـ «Log in»:

~~~text flutter test
Golden "goldens/login_form.png": Pixel test failed, 0.25%, 1221px diff detected.
~~~

وعمل فولدر [[test/failures/]] فيه الصورة القديمة والجديدة وصورة الفرق.

و [[flutter test --coverage]] عمل [[coverage/lcov.info]] فيه كل سطر في [[lib/login_form.dart]] اتنفذ كام مرة.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[testWidgets(name, (tester) async {...})]] | اختبار widget من غير جهاز |
| [[pumpWidget]] | ابني |
| [[tap]] / [[enterText]] | دوس واكتب |
| [[pump()]] | frame واحد بعد أي تغيير |
| [[pump(Duration)]] | قدّم الوقت الوهمي (timers و delays) |
| [[pumpAndSettle()]] | لحد ما الـ animations تخلص، مش لحد ما الـ timers تخلص |
| [[find.text]] / [[find.byType]] + [[findsOneWidget]] | دوّر واتأكد |

> بعد أي tap: pump. بعد أي delay: pump بالمدة. وأي spinner ظاهر = متستخدمش pumpAndSettle.`,
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
          teach: R`## الكود ده بيعمل إيه؟

اختبار بيشغّل تطبيق العدّاد الافتراضي (اللي [[flutter create]] بيعمله) كله، ويتأكد إن الرقم 0، ويدوس [[+]]، ويتأكد إنه بقى 1. نفس كلام الـ widget test بالظبط، الفرق إنه بيشتغل **جوه التطبيق الحقيقي على جهاز**.

إيه اللي اتشغّل هنا وإيه اللي من الـ docs: مفيش موبايل ولا emulator، فالتشغيل على الجهاز نفسه من الـ docs. اللي اتعمل فعلًا جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44): الـ package اتضافت، والملف عدّى [[flutter analyze]] من غير مشاكل، ونفس جسم الاختبار (والـ solCode) اتشغّل كـ widget test عادي على نفس التطبيق ونجح، وجربت أمر التشغيل على emulator مش موجود عشان تشوف الرسالة.

---

## ١. السطور اللي فوق: تجهيز

~~~dart
// flutter pub add 'dev:integration_test:{"sdk":"flutter"}'
// integration_test/app_test.dart
~~~

- [[flutter pub add 'dev:...']]: [[dev:]] معناها تتحط في [[dev_dependencies]] (للتطوير بس، مش جوه التطبيق المنشور). و [[{"sdk":"flutter"}]] معناها إن الـ package جاية مع Flutter نفسه مش من pub.dev. والـ quotes حوالين الكلام كله عشان الترمنال ميفهمش [[{ }]] و [[" "]] غلط. بعد التشغيل الـ pubspec بقى فيه:

~~~text pubspec.yaml
  integration_test:
    sdk: flutter
~~~

- المسار: الملفات دي في فولدر [[integration_test/]] جنب [[test/]] مش جواه.

---

## ٢. الـ imports

~~~dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;
~~~

- [[material.dart]]: عشان [[Icons.add]].
- [[flutter_test]]: نفس [[testWidgets]] و [[find]] و [[expect]] بتوع الدرس اللي فات.
- [[integration_test]]: فيها الـ binding بتاع الأجهزة.
- [[my_app/main.dart' as app]]: ملف main بتاع تطبيقك نفسه. [[as app]] عشان [[main]] بتاعته متتلخبطش مع [[main]] بتاعة ملف الاختبار، فبتناديها [[app.main()]].

---

## ٣. الـ binding

~~~dart
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
~~~

الـ binding هو الحتة اللي بتربط Flutter بالمكان اللي شغال فيه. في الـ widget tests بيبقى [[TestWidgetsFlutterBinding]] (بيئة وهمية ووقت وهمي). السطر ده بيبدّله بواحد شغال **جوه التطبيق الحقيقي على الجهاز**، وبيبعت النتايج للترمنال على الكمبيوتر. لازم يبقى أول سطر.

---

## ٤. الاختبار

~~~dart
  testWidgets('counter increments on a real device', (tester) async {
    app.main();
    await tester.pumpAndSettle();
    expect(find.text('0'), findsOneWidget);
    await tester.tap(find.byIcon(Icons.add));
    await tester.pumpAndSettle();
    expect(find.text('1'), findsOneWidget);
  });
}
~~~

- [[app.main()]]: شغّل التطبيق زي ما المستخدم بيفتحه: [[runApp]] الحقيقية، بالـ plugins الحقيقية.
- [[pumpAndSettle()]]: استنى لحد ما الشاشة تهدى (مفيش animations). هنا الوقت **حقيقي**، فبيستنى فعلًا.
- [[find.text('0')]]: الرقم في نص الشاشة.
- [[find.byIcon(Icons.add)]]: دوّر بالأيقونة بدل النص: زرار الـ [[+]] العايم.
- [[tap]] ثم [[pumpAndSettle]] ثم [[expect(find.text('1'), ...)]]: الرقم زاد.

نفس الجسم ده (من غير الـ binding) كـ widget test على نفس الـ [[lib/main.dart]] اللي [[flutter create]] عمله:

~~~text flutter test
00:00 +0: counter increments (same body, widget-test binding)
00:00 +1: three taps (solCode)
00:01 +2: All tests passed!
~~~

---

## ٥. التشغيل (السطرين اللي تحت)

~~~text الأوامر
flutter test integration_test/app_test.dart -d emulator-5554
flutter test integration_test -d chrome   (محتاج chromedriver شغال)
~~~

- [[flutter test <ملف أو فولدر>]]: نفس الأمر بتاع الـ widget tests، بس بيبني التطبيق ويسطّبه على الجهاز الأول.
- [[-d emulator-5554]]: [[-d]] اختصار [[--device-id]]: أنهي جهاز. [[emulator-5554]] الاسم اللي [[flutter devices]] بيدّيه لأول Android emulator.
- [[integration_test]] من غير اسم ملف: كل الملفات اللي في الفولدر.

هنا مفيش emulator، فجربت الأمر عشان تشوف الرسالة:

~~~text flutter test integration_test/app_test.dart -d emulator-5554
No supported devices found with name or id matching 'emulator-5554'.

The following devices were found:
Linux (desktop) • linux • linux-x64 • Ubuntu 24.04.3 LTS ...
~~~

ومع emulator شغال (من الـ docs): أول مرة بياخد دقيقة أو اتنين يبني ويسطّب، والتطبيق بيفتح قدامك والزرار بيتداس لوحده، وفي الآخر [[All tests passed!]].

---

## ٦. الـ solCode: ٣ ضغطات

~~~dart
for (var i = 0; i < 3; i++) {
  await tester.tap(find.byIcon(Icons.add));
  await tester.pumpAndSettle();
}
expect(find.text('3'), findsOneWidget);
~~~

- [[for (var i = 0; i < 3; i++)]]: كرر ٣ مرات: [[i]] بيبدأ 0، ويزيد 1 ([[i++]]) بعد كل لفة، والشرط [[i < 3]].
- كل لفة: دوس واستنى. من غير الـ pumpAndSettle جوه اللفة، الضغطة التانية ممكن تحصل قبل ما الشاشة تتحدث.

ونجح في الناتج اللي فوق ([[three taps (solCode)]]).

---

## الخلاصة

| | widget test | integration test |
|---|---|---|
| فين | [[test/]] | [[integration_test/]] |
| الـ binding | وهمي (تلقائي) | [[IntegrationTestWidgetsFlutterBinding.ensureInitialized()]] |
| الوقت | وهمي | حقيقي |
| الـ plugins والشبكة | لأ (fakes) | حقيقية |
| التشغيل | [[flutter test]] | [[flutter test integration_test -d <device>]] |
| السرعة | ثواني | دقايق |

> نفس الـ API ([[tap]] و [[find]] و [[expect]])، بس على التطبيق كله وعلى جهاز. قليل منها للسيناريوهات المهمة، والباقي widget tests.`,
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

لو ظهر [[No supported devices found with name or id matching 'emulator-5554']] يبقى الـ emulator مش شغال أو اسمه مختلف ([[flutter devices]] بيعرض الأسامي). وعلى Chrome لازم chromedriver شغال على بورت 4444 الأول، وإلا بيفشل.`,
          solCode: R`for (var i = 0; i < 3; i++) {
  await tester.tap(find.byIcon(Icons.add));
  await tester.pumpAndSettle();
}
expect(find.text('3'), findsOneWidget);`
        }
      ]
    }
]);
