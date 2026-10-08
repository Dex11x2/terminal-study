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
    }
]);
