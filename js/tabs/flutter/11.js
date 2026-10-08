// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
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
    }
]);
