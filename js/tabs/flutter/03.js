// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "Dart: الكلاسات والـ async",
      l: 1,
      n: "كل حاجة object، والـ constructors ليها أشكال، والـ async شبه JS بالظبط",
      items: [
        {
          cmd: "class",
          title: "تعمل نوع بيانات خاص بيك بحقوله ودواله",
          desc: R`الـ class بيجمع البيانات والدوال اللي بتشتغل عليها. [[Product(this.name, this.price)]] أقصر constructor: بياخد القيم ويحطها في الـ fields على طول. وأي اسم بيبدأ بـ [[_]] يبقى private على مستوى الملف كله، ومفيش كلمة private.

والـ getter ([[get isCheap]]) قيمة محسوبة بتتقري كأنها field. وكل قيمة في Dart object من class، حتى [[int]] و [[null]].`,
          example: R`class Product {
  Product(this.name, this.price);

  final String name;
  double price;
  int _views = 0;

  bool get isCheap => price < 100;
  int get views => _views;
  void view() => _views++;
}

void main() {
  final p = Product('Mouse', 80)..view()..view();
  p.price = 120;
  print('$__{p.name} cheap=$__{p.isCheap} views=$__{p.views}');
}`,
          try: "ضيف [[toString()]] بـ [[@override]] ترجّع [[Product(Mouse, 120)]] واطبع [[p]] نفسه. وبعدين حاول تعمل [[p.name = 'X']] وشوف الـ error.",
          flag: "script",
          deep: {
            why: "من غير classes بتلف بـ Maps: [[product['price']]] ممكن تكتبها غلط ومحدش يقولك. الـ class بيدّي كل حقل اسم ونوع، والـ compiler يمسك الغلط، والـ editor يكمّل وانت بتكتب. وكل widget في Flutter class.",
            how: R`[[new]] اختيارية ومحدش بيكتبها: [[Product('Mouse', 80)]] كفاية.

الـ fields الـ final لازم تتحط قبل ما جسم الـ constructor يبدأ، يا بـ [[this.x]] يا في initializer list (الدرس الجاي). ودا اللي بيضمن إن [[final String name]] مستحيل يبقى null.

الـ privacy في Dart على مستوى الـ library (الملف)، مش الـ class. يعني أي كود في نفس الملف يقدر يقرا [[_views]]، وأي ملف تاني لأ. عشان كده الـ State في Flutter اسمها [[_CounterState]]: محدش بره الملف يحتاجها.

الـ cascade [[..]] بينادي على نفس الـ object ويرجّع الـ object مش نتيجة الدالة. هتشوفه في [[Paint()..color = Colors.red..strokeWidth = 2]].

كل class بيورث من [[Object]] ضمنيًا، وتقدر تعمل [[extends]] لوراثة واحدة، و [[implements]] لأي عدد interfaces (أي class ينفع يبقى interface)، و [[with]] للـ mixins. ومن Dart 3 فيه modifiers زي [[sealed]] و [[final class]] و [[interface class]] بتتحكم مين يورث.

ومن Dart 3.13 فيه primary constructors: [[class Point(final int x, final int y);]] بتعرّف الـ fields والـ constructor في سطر. هتلاقيها في كود جديد، بس معظم الكود والأمثلة لسه بالشكل العادي.`,
            when: "أي بيانات ليها شكل ثابت: موديل جاي من API، أو إعدادات، أو حالة شاشة. وكل widget هتكتبه.",
            mistakes: R`تحط [[_]] وتفتكر إن ملف تاني في نفس الفولدر هيشوفه: لأ، الـ privacy بالملف. وتخلي كل الـ fields مش final فأي حتة تعدّل فيها وتتوه مين غيّر إيه: خليها final وغيّر بنسخة جديدة ([[copyWith]]). وتنسى [[@override]] وانت بتعيد تعريف method، فلو كتبت الاسم غلط بتعمل method جديدة من غير ما تاخد بالك.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف نوع جديد اسمه [[Product]] فيه اسم وسعر وعدّاد مشاهدات، ويعمل منه object ويزوّد المشاهدات مرتين ويغيّر السعر ويطبع. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والـ solCode والأخطاء اتجربوا كمان.

---

## ١. [[class Product {]]

~~~dart
class Product {
~~~

[[class]] بتعرّف **نوع جديد**، زي [[String]] و [[int]] بس انت اللي عامله. الـ class «قالب»، وكل حاجة بتتعمل منه اسمها object (أو instance). والعرف: اسم الـ class بيبدأ بحرف كبير (PascalCase).

---

## ٢. الـ constructor

~~~dart
  Product(this.name, this.price);
~~~

- الـ constructor دالة **اسمها نفس اسم الـ class**، وبتتنادى لما تعمل object جديد. مالهاش نوع رجوع.
- [[this]] معناها «الـ object اللي بيتعمل دلوقتي». و [[this.name]] في الـ parameters اختصار: «القيمة اللي هتيجي هنا حطها على طول في الـ field اللي اسمه name».
- ومفيش جسم ([[;]] بدل [[{ }]]) لأن مفيش حاجة تانية محتاجين نعملها.

من غير الاختصار كان هيبقى أطول بكتير، ومش هينفع أصلًا مع [[final]] (درس «named و factory» بيشرح ليه).

---

## ٣. الـ fields

~~~dart
  final String name;
  double price;
  int _views = 0;
~~~

الـ fields هي البيانات اللي كل object شايلها:

| الـ field | النوع | يتغير؟ | ملاحظة |
|---|---|---|---|
| [[name]] | [[String]] | لأ ([[final]]) | بيتحط مرة في الـ constructor |
| [[price]] | [[double]] | آه | |
| [[_views]] | [[int]] | آه | بيبدأ من 0، و [[_]] = private |

### [[_]]: private

أي اسم بيبدأ بـ underscore يبقى **private على مستوى الملف**. يعني أي كود في نفس الملف يشوفه، إنما أي ملف تاني يعمل [[import]] للملف ده ميقدرش يوصل لـ [[_views]]. ومفيش كلمة [[private]] في Dart أصلًا.

### [[price]] نوعها double وبعتنا 80

جربت [[print(Product('Mouse', 80).price)]]:

~~~text الناتج
80.0
~~~

[[80]] مكتوبة من غير كسور، بس Dart حوّلها [[80.0]] لأن الـ field نوعه [[double]].

---

## ٤. الـ getters والـ method

~~~dart
  bool get isCheap => price < 100;
  int get views => _views;
  void view() => _views++;
}
~~~

- [[get]]: getter. «field محسوب»: بيتقري **من غير أقواس** ([[p.isCheap]] مش [[p.isCheap()]])، بس كل مرة بيحسب من جديد. [[price < 100]] مقارنة بترجّع bool.
- [[int get views => _views;]]: بيطلّع قيمة [[_views]] للقراية بس. اللي بره الملف يقدر يقرا views، بس مفيش setter (طريقة كتابة)، فميقدرش يغيّرها.
- [[void view() => _views++;]]: method (دالة جوه class). بتزوّد العدّاد واحد. [[void]] لأنها مش بترجّع حاجة مهمة.
- [[}]] قفلة الـ class.

جربت أكتب في getter: [[p.isCheap = true;]]:

~~~text dart run
Error: The setter 'isCheap' isn't defined for the type 'Product'.
~~~

---

## ٥. [[main]]: نعمل object

~~~dart
  final p = Product('Mouse', 80)..view()..view();
~~~

نفكّها بالترتيب:

1. [[Product('Mouse', 80)]]: نادي الـ constructor. name = Mouse و price = 80.0. ومفيش [[new]]: موجودة في اللغة بس اختيارية ومحدش بيكتبها.
2. [[..view()]]: الـ **cascade** (نقطتين). «نادي view على نفس الـ object، ورجّع الـ object نفسه مش نتيجة view». فـ _views بقت 1.
3. [[..view()]] تاني: _views بقت 2، والنتيجة لسه الـ object.
4. [[final p =]]: p بقى شايل الـ object.

لو كتبت [[.view()]] بنقطة واحدة، p كان هياخد نتيجة view نفسها ([[void]]) مش الـ Product. جربتها و [[p.name]] بعدها طلّع: [[This expression has type 'void' and can't be used.]]

---

## ٦. تغيير field وطباعة

~~~dart
  p.price = 120;
  print('$__{p.name} cheap=$__{p.isCheap} views=$__{p.views}');
~~~

- [[p.price = 120;]]: price مش final فتتغير. وبعدها isCheap بقت false لوحدها، لأنها بتتحسب من price كل مرة.
- [[$__{p.name}]]: جوه النص لازم [[$__{ }]] لأن فيه نقطة.

~~~text الناتج
Mouse cheap=false views=2
~~~

---

## ٧. الـ solCode: [[toString]] و [[@override]]

لو طبعت [[print(p)]] من غير حاجة، بيطلع [[Instance of 'Product']]: Dart ميعرفش يوصف الـ object. فالحل:

~~~dart
  @override
  String toString() => 'Product($name, $__{price.toStringAsFixed(0)})';
~~~

- كل class بيورث من [[Object]] لوحده، و [[Object]] فيه [[toString()]]. و [[print]] بتناديها.
- [[@override]] اسمها annotation: «أنا قاصد أكتب نسخة جديدة من method موجودة في الأب». لو كتبت الاسم غلط ([[tostring]] بحرف صغير)، الـ analyzer بيقول: [[The method doesn't override an inherited method.]] فتاخد بالك.
- جوه الـ class تقدر تكتب [[$name]] على طول من غير [[this.]] ولا نقطة.
- [[price.toStringAsFixed(0)]]: الرقم كنص بـ 0 أرقام بعد العلامة. جربت من غيرها ([[$price]]) وطلع [[Product(Mouse, 120.0)]]، ومعاها:

~~~text الناتج (solCode)
Product(Mouse, 120)
~~~

### و [[p.name = 'X']]

~~~text dart analyze
'name' can't be used as a setter because it's final.
~~~

و [[dart run]] بيقول نفس المعنى بصيغة تانية: [[The setter 'name' isn't defined for the type 'Product'.]] الـ field الـ final ملوش setter أصلًا.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| constructor | [[Product(this.name, this.price);]] | القيم تروح للـ fields على طول |
| private | [[_views]] | مستخبي عن أي ملف تاني |
| getter | [[bool get isCheap => ...;]] | قيمة محسوبة من غير أقواس |
| cascade | [[obj..a()..b()]] | نادي على نفس الـ object ورجّعه |
| [[@override]] | فوق [[toString]] | بتعيد تعريف method من الأب |`,
          lines: [
            "تعريف class.",
            "constructor: [[this.name]] بتحط الـ argument في الـ field على طول.",
            "field مبيتغيرش بعد الإنشاء.",
            "field يتغير.",
            "[[_]] في الأول = private على مستوى الملف.",
            "getter: قيمة محسوبة بتتقري من غير أقواس.",
            "getter بيطلّع الـ private field للقراءة بس.",
            "method بتزوّد العدّاد.",
            "قفلة الـ class.",
            "البداية.",
            "اعمل object من غير new، و [[..]] (cascade) بينادي method على نفس الـ object ويرجّعه هو.",
            "عدّل الـ field اللي مش final.",
            "Mouse cheap=false views=2.",
            "قفلة."
          ],
          sol: R`بعد ما تضيف [[toString]] و [[print(p)]]، الناتج: [[Mouse cheap=false views=2]] ثم [[Product(Mouse, 120.0)]]. لاحظ [[120.0]] مش 120: price نوعه double، و [[dart run]] بيطبع الـ double بالعلامة العشرية. (في DartPad ممكن يطلع 120 لأنه بيشتغل على JavaScript ومفيهاش فرق بين int و double.) لو عايزها 120 بالظبط: [[price.toStringAsFixed(0)]].

ومن غير toString كان هيطبع [[Instance of 'Product']]، ودا الشكل اللي هتشوفه في اللوج لأي class مش عامل override.

و [[p.name = 'X']] مش بيترجم: [['name' can't be used as a setter because it's final]]. و [[@override]] مهم: لو كتبت [[tostring]] غلط من غيره هتعمل method جديدة ساكتة، ومعاه الـ analyzer بيقولك إن مفيش حاجة في الأب بالاسم ده.`,
          solCode: R`class Product {
  Product(this.name, this.price);

  final String name;
  double price;
  int _views = 0;

  bool get isCheap => price < 100;
  int get views => _views;
  void view() => _views++;

  @override
  String toString() => 'Product($name, $__{price.toStringAsFixed(0)})';
}

void main() {
  final p = Product('Mouse', 80)..view()..view();
  p.price = 120;
  print(p); // Product(Mouse, 120)
  // p.name = 'X'; // error: 'name' can't be used as a setter because it's final
}`
        },
        {
          cmd: "named و factory",
          title: "أكتر من طريقة تعمل بيها object من نفس النوع",
          desc: R`الـ class يقدر يبقى ليه constructors بأسماء: [[User.guest()]] و [[User.fromJson(json)]]. والـ initializer list بعد [[:]] بتحط قيم الـ fields قبل ما جسم الـ constructor يشتغل.

و [[factory]] constructor مش لازم يعمل object جديد: ممكن يرجّع واحد من cache، أو subclass، أو يحسب حاجات قبل ما ينادي الـ constructor الحقيقي. ودا الشكل اللي بيتكتب بيه [[fromJson]] في كل تطبيق.`,
          example: R`class User {
  const User(this.name, this.age);
  const User.guest() : this('Guest', 0);
  User.adult(this.name) : age = 18;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'] as String, json['age'] as int);
  }

  final String name;
  final int age;
}

void main() {
  const g = User.guest();
  final u = User.fromJson({'name': 'Ali', 'age': 30});
  print('$__{g.name} $__{u.name} $__{User.adult('Sara').age}');
}`,
          try: "ابعت [[{'name': 'Ali', 'age': '30'}]] (السن نص) لـ fromJson وشوف الـ error بيقول إيه. وبعدين ضيف [[toJson()]] بترجّع Map.",
          flag: "script",
          deep: {
            why: "object واحد بيتعمل من أماكن مختلفة: من فورم، أو من JSON جاي من API، أو بقيم افتراضية. بدل constructor واحد فيه ١٠ parameters اختيارية وشروط، كل طريقة ليها اسم واضح.",
            how: R`ترتيب إنشاء الـ object: الأول الـ initializer list (والـ [[this.x]])، وبعدين constructor الأب (super)، وبعدين جسم الـ constructor. الـ fields الـ final لازم تتحط قبل الجسم، عشان كده مينفعش تكتب [[age = 18;]] جوه الجسم لـ field final.

[[factory]] مفيهوش [[this]]: مفيش object اتعمل لسه، وهو لازم يرجّع object بنفسه. عشان كده ينفع:
- يرجّع من cache: [[factory Logger(String name) => _cache.putIfAbsent(name, () => Logger._internal(name));]]
- يرجّع subclass حسب البيانات ([[Shape.fromJson]] يرجّع Circle أو Square).
- يعمل validation أو parsing قبل الإنشاء، زي fromJson.

[[const]] constructor: كل الـ fields لازم final، ومفيش جسم. ولما تناديه بـ const بقيم ثابتة، Dart بيعمل object واحد بس في الذاكرة لأي استدعاء بنفس القيم. ودا نفس اللي بيحصل في [[const Text('Hi')]].

في Dart 3 تقدر تكتب fromJson بـ pattern matching بدل [[as]]، ودا اللي docs Flutter بتستخدمه دلوقتي (درس «fromJson و toJson» في المستوى ٢).`,
            when: "fromJson و toJson في أي موديل جاي من API. و named constructors لحالات جاهزة (empty، guest، initial). و factory لـ singleton أو cache.",
            mistakes: R`تكتب [[json['age']]] من غير [[as int]] فالنوع يفضل dynamic ويعدّي أي حاجة لحد ما يضرب بعيد عن مكان الغلط. وتفتكر إن [[factory]] لازم يرجّع object جديد. وتخلي field مش final وتستغرب إن const constructor مش راضي.`
          },
          teach: R`## البرنامج بيعمل إيه؟

class [[User]] واحد ليه ٤ constructors: الأساسي، و [[guest]] بقيم جاهزة، و [[adult]] بسن ثابت، و [[fromJson]] بيقرا Map. وفي main بنعمل object بكل طريقة. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والـ solCode والأخطاء اتجربوا كمان.

---

## ١. الـ constructor الأساسي و [[const]]

~~~dart
  const User(this.name, this.age);
~~~

- [[User(this.name, this.age)]]: نفس اللي في درس «class»: القيم تروح للـ fields على طول.
- [[const]] قبله: constructor ينفع يتنادى **وقت الترجمة**. شرطه إن كل الـ fields تبقى [[final]] (وهي كده تحت)، ومفيش جسم.

---

## ٢. named constructor بيحوّل للأساسي

~~~dart
  const User.guest() : this('Guest', 0);
~~~

- [[User.guest]]: اسم الـ class، نقطة، اسم تختاره. ده **named constructor**: طريقة تانية تعمل بيها User. Dart مفيهوش overloading (دالتين بنفس الاسم)، فالأسامي دي هي البديل.
- [[:]] بعد القوسين: من هنا الكلام بيتنفذ **قبل** جسم الـ constructor.
- [[this('Guest', 0)]]: هنا [[this(...)]] بأقواس معناها «نادي الـ constructor الأساسي بالقيم دي». اسمها redirecting constructor.
- وهو كمان [[const]]، فـ [[const User.guest()]] ينفع.

---

## ٣. initializer list

~~~dart
  User.adult(this.name) : age = 18;
~~~

- [[this.name]] بياخد الاسم من اللي بيناديه.
- [[: age = 18]]: الـ **initializer list**: بتحط قيمة لـ field قبل ما الجسم يبدأ. age هنا [[final]]، والـ final لازم ياخد قيمته **قبل** الجسم.

جربت أكتب الـ final جوه الجسم بدلها ([[U2(String n) { name = n; }]]):

~~~text dart run
Error: The setter 'name' isn't defined for the type 'U2'.
Error: Final field 'name' is not initialized.
~~~

لما الجسم بيبدأ، الـ object خلاص اتعمل، والـ final اتقفل. عشان كده [[this.x]] أو initializer list.

- و [[adult]] مش [[const]]، فـ [[const User.adult('x')]] بيطلّع [[Cannot invoke a non-'const' constructor where a const expression is expected.]] (جربتها).

---

## ٤. [[factory]] و [[fromJson]]

~~~dart
  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'] as String, json['age'] as int);
  }
~~~

- [[factory]]: constructor **مش بيعمل object لوحده**. انت اللي لازم ترجّع object بـ [[return]]. ومفيش [[this]] جواه، لأن مفيش object لسه.
- [[Map<String, dynamic> json]]: الـ parameter Map مفاتيحه نصوص، وقيمه [[dynamic]]. [[dynamic]] يعني «أي نوع، ومتفحصش». ودا شكل أي JSON بعد ما يتفك ([[jsonDecode]] بيرجّع كده).
- [[json['name']]]: القيمة نوعها dynamic، فالـ compiler ميعرفش هي إيه.
- [[as String]]: **cast**: «أنا بقولك إنها String». لو طلعت مش String، يرمي error هنا على طول.
- [[return User(...)]]: بينادي الأساسي ويرجّع الناتج.

ليه factory هنا وانت ممكن تعمل نفس الحكاية في دالة عادية؟ لأن الاستخدام بيبقى زي أي constructor: [[User.fromJson(data)]]، وكل الموديلات في Flutter بتتكتب كده.

---

## ٥. الـ fields

~~~dart
  final String name;
  final int age;
}
~~~

الاتنين [[final]]، ودا اللي سمح بـ [[const]] في الأساسي و guest. لو واحد فيهم مش final، [[const User(...)]] مش هيترجم.

---

## ٦. [[main]]

~~~dart
  const g = User.guest();
  final u = User.fromJson({'name': 'Ali', 'age': 30});
  print('$__{g.name} $__{u.name} $__{User.adult('Sara').age}');
~~~

- [[const g]]: object اتعمل وقت الترجمة. وجربت: [[identical(User.guest(), User.guest())]] بـ const الاتنين رجّعت [[true]] (نفس الـ object في الذاكرة)، و [[identical(User('a', 1), User('a', 1))]] من غير const رجّعت [[false]].
- [[{'name': 'Ali', 'age': 30}]]: Map مكتوب على طول، زي JSON.
- [[User.adult('Sara').age]]: اعمل object ونادي age منه في نفس الحتة.

~~~text الناتج
Guest Ali 18
~~~

---

## ٧. لما الـ JSON يبقى غلط

في التجربة بعتنا السن نص: [[{'name': 'Ali', 'age': '30'}]]. الكود **ترجم عادي** (القيم dynamic، محدش فحص)، وضرب وقت التشغيل:

~~~text dart run (الـ solCode)
{name: Ali, age: 30}
Unhandled exception:
type 'String' is not a subtype of type 'int' in type cast
#0      new User.fromJson (file:///w/main.dart:7:53)
#1      main (file:///w/main.dart:19:8)
~~~

- [[type 'String' is not a subtype of type 'int' in type cast]]: «القيمة String، وانت قلت [[as int]]».
- [[new User.fromJson]] و [[7:53]]: الغلطة جوه fromJson، عمود ٥٣ هو [[as int]] بالظبط. يعني [[as]] وقّف القيمة الغلط عند الباب.
- وأول سطر [[{name: Ali, age: 30}]] جه من [[toJson()]] في الـ solCode قبل الغلطة.

---

## ٨. [[toJson]] في الـ solCode

~~~dart
  Map<String, dynamic> toJson() => {'name': name, 'age': age};
~~~

العكس: method عادية بترجّع Map بنفس المفاتيح اللي fromJson بيقراها. والاتنين لازم يتفقوا على أسامي المفاتيح.

---

## الخلاصة

| الشكل | الكود | إمتى |
|---|---|---|
| أساسي | [[User(this.name, this.age)]] | الطريقة العادية |
| named + redirect | [[User.guest() : this('Guest', 0)]] | قيم جاهزة |
| initializer list | [[User.adult(this.name) : age = 18]] | تحط final قبل الجسم |
| factory | [[factory User.fromJson(...) { return ...; }]] | parsing أو cache أو subclass |
| const | [[const User(...)]] | كل الـ fields final، و object واحد لنفس القيم |`,
          lines: [
            "class فيه كذا constructor.",
            "الأساسي، و const عشان كل الـ fields final.",
            "named constructor بيحوّل (redirect) للأساسي بقيم ثابتة.",
            "initializer list بعد [[:]]: بتحط age قبل الجسم.",
            "factory: بيقرا Map ويقرر هو هيرجّع إيه.",
            "[[as]] بيأكد النوع، ولو غلط يرمي error واضح.",
            "قفلة الـ factory.",
            "حقل الاسم.",
            "حقل السن. كلهم final فينفع const constructor.",
            "قفلة الـ class.",
            "البداية.",
            "object ثابت وقت الترجمة.",
            "من Map (زي JSON بعد ما يتفك).",
            "Guest Ali 18.",
            "قفلة."
          ],
          sol: R`لما تبعت [[{'name': 'Ali', 'age': '30'}]] الكود بيترجم عادي (لأن القيم dynamic)، ووقت التشغيل بيضرب جوه fromJson بالظبط: [[type 'String' is not a subtype of type 'int' in type cast]]، والـ stack بيشاور على سطر [[json['age'] as int]]. دا اللي [[as]] بيعمله: بيوقّف الغلط عند الباب بدل ما القيمة الغلط تدخل التطبيق وتضرب بعدين في حتة ملهاش علاقة. ولو الـ API فعلًا بيبعت السن نص، الحل [[int.parse(json['age'] as String)]]، مش إنك تشيل الـ as.

و toJson بترجّع Map بنفس المفاتيح اللي fromJson بيقراها، فـ [[print(u.toJson())]] يطبع [[{name: Ali, age: 30}]]. الغلط الشائع إنك تكتب المفاتيح بشكل مختلف في الاتجاهين ([[userName]] هنا و [[name]] هناك) فالبيانات تروح وترجع ناقصة.`,
          solCode: R`class User {
  const User(this.name, this.age);
  const User.guest() : this('Guest', 0);
  User.adult(this.name) : age = 18;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'] as String, json['age'] as int);
  }

  Map<String, dynamic> toJson() => {'name': name, 'age': age};

  final String name;
  final int age;
}

void main() {
  final u = User.fromJson({'name': 'Ali', 'age': 30});
  print(u.toJson()); // {name: Ali, age: 30}
  User.fromJson({'name': 'Ali', 'age': '30'});
  // Unhandled exception: type 'String' is not a subtype of type 'int' in type cast
}`
        },
        {
          cmd: "records و patterns",
          title: "ترجّع أكتر من قيمة وتفكّها وتختار حسب شكل البيانات",
          desc: R`من Dart 3 الدالة تقدر ترجّع record: [[(double, double)]] أو بأسماء [[({int total, int done})]]، من غير ما تعمل class عشان حاجة صغيرة. وتفكّها على طول: [[final (lat, lng) = location();]].

والـ patterns بتخليك تسأل عن شكل البيانات: [[switch]] كـ expression بترجّع قيمة، وكل case بيفحص النوع والقيم ويطلّع متغيرات. ومع [[sealed class]] الـ compiler بيتأكد إنك غطّيت كل الحالات.`,
          example: R`(double, double) location() => (30.04, 31.23);

sealed class Result {}
class Ok extends Result { Ok(this.data); final String data; }
class Failure extends Result { Failure(this.code); final int code; }

String describe(Result r) => switch (r) {
  Ok(:var data) => 'got $data',
  Failure(code: 404) => 'not found',
  Failure(:var code) when code >= 500 => 'server error $code',
  Failure() => 'failed',
};

void main() {
  final (lat, lng) = location();
  final stats = (total: 10, done: 4);
  print('$lat $lng $__{stats.total - stats.done} $__{describe(Failure(503))}');
}`,
          try: "امسح سطر [[Failure() => 'failed']] وشوف الـ compile error. وبعدين ضيف [[class Loading extends Result {}]] وشوف الـ compiler بيطلب منك تضيف حالة.",
          flag: "script",
          deep: {
            why: "قبل Dart 3 لو دالة محتاجة ترجّع قيمتين كنت بتعمل class أو ترجّع List وتفتكر مين فين. ولو عندك حالات (نجاح، فشل، تحميل) كنت بتكتب if و is و cast، وتنسى حالة. records و patterns بيحلّوا الاتنين، والـ compiler بيمسك الحالة المنسية.",
            how: R`الـ record قيمة immutable ليها شكل ثابت: الـ positional بتتقري بـ [[$1]] و [[$2]]، والـ named بأسمائها. واتنين records بنفس الشكل والقيم بيبقوا [[==]] لوحدهم، من غير ما تكتب [[operator ==]]. مناسب لقيم صغيرة بترجع من دالة، مش بديل لموديل مستخدم في التطبيق كله.

الـ patterns بتشتغل في كذا مكان:
- فك في تعريف: [[final (lat, lng) = location();]] أو [[final (:total, :done) = stats;]].
- [[switch]] statement أو expression: كل case pattern، وأول واحد يطابق يكسب.
- [[if (json case {'name': String name})]]: يطابق شكل الـ Map ونوع القيمة ويطلّع name في نفس الخطوة. لو المفتاح مش موجود أو النوع غلط، الشرط false بس، مفيش exception.

exhaustiveness: مع [[sealed class]] أو enum أو bool، الـ compiler بيعرف كل الاحتمالات. switch expression لازم يغطي الكل، ولو ضفت subclass جديد لـ Result (زي Loading)، كل switch مش مغطيه هيطلّع compile error. ودا بالظبط اللي بتحتاجه في state الشاشة: loading و data و error.

والـ [[_]] pattern بيطابق أي حاجة (default). ومن Dart 3.7 [[_]] كمان wildcard في الـ parameters: [[(_, _) => ...]] من غير تعارض أسماء.`,
            when: "دالة بترجّع قيمتين أو تلاتة مرتبطين. و state ليها حالات محددة (sealed). وقراءة JSON بشكل آمن (if-case أو switch على الـ Map).",
            mistakes: R`تستخدم records لموديل كبير متشارك في التطبيق كله: مفيش methods ولا اسم للنوع في رسايل الـ errors، اعمل class. وتكتب [[_]] في switch على sealed class فتقفل فحص الـ exhaustiveness بإيدك، وأي حالة جديدة هتعدّي من غير ما تاخد بالك. وتنسى إن ترتيب الـ cases مهم: [[Failure()]] لو جه قبل [[Failure(code: 404)]] هياكله.`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالة بترجّع إحداثيتين مرة واحدة في **record**، ونوع نتيجة ليه حالتين بس ([[Ok]] و [[Failure]])، ودالة بتوصف النتيجة بـ [[switch]] بيفحص شكل البيانات. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأخطاء اتجربت بتعديل الملف.

---

## ١. دالة بترجّع record

~~~dart
(double, double) location() => (30.04, 31.23);
~~~

- [[(double, double)]] في مكان نوع الرجوع: **record type**، «قيمتين، الأولى double والتانية double». مش محتاج تعمل class عشان ترجّع حاجتين.
- [[(30.04, 31.23)]]: الـ record نفسه، قيم بين قوسين ومفصولة بـ [[,]].

جربت أطبعه وأقرا أول قيمة:

~~~text الناتج
(30.04, 31.23)
30.04
~~~

التاني جه من [[location().$1]]: الـ positional fields بتتقري بـ [[$1]] و [[$2]] (بتبدأ من 1 مش 0). و record بنفس القيم بيساوي التاني لوحده: [[(1, 2) == (1, 2)]] طلعت [[true]].

---

## ٢. [[sealed class]] و subclasses

~~~dart
sealed class Result {}
class Ok extends Result { Ok(this.data); final String data; }
class Failure extends Result { Failure(this.code); final int code; }
~~~

- [[Result]]: الأب. والـ [[{}]] فاضية: مالوش fields.
- [[extends Result]]: «Ok نوع من Result» (وراثة). أي مكان مستني Result يقبل Ok أو Failure.
- [[sealed]]: «الأبناء كلهم في الملف ده ومفيش غيرهم». فالـ compiler **عارف** إن Result يا Ok يا Failure، ودا اللي هيخليه يمسك الحالة الناقصة تحت. وكمان sealed class مينفعش تعمل منه object مباشرة ([[Result()]]).
- كل subclass مكتوب في سطر: constructor و field.

---

## ٣. [[switch]] كـ expression

~~~dart
String describe(Result r) => switch (r) {
~~~

- [[switch (r)]] بعد [[=>]]: هنا switch **expression** بترجّع قيمة، مش جملة. كل case شكله [[pattern => قيمة,]]، وأول pattern يطابق يكسب.
- وبيخلص بـ [[};]] (القوس وبعده [[;]] لأنه آخر الـ expression).

### case بـ case

~~~dart
  Ok(:var data) => 'got $data',
~~~

[[Ok(...)]] هنا **object pattern**: «لو r نوعه Ok». و [[:var data]] جواه: «خد الـ field اللي اسمه data وحطه في متغير اسمه data». الـ [[:]] قبل الاسم اختصار لـ [[data: var data]].

~~~dart
  Failure(code: 404) => 'not found',
~~~

«لو Failure **و** الـ code بيساوي 404 بالظبط». القيمة الثابتة pattern لوحدها.

~~~dart
  Failure(:var code) when code >= 500 => 'server error $code',
~~~

طلّع code، وبعدين [[when]] (guard): شرط زيادة. لو false، يكمّل للـ case اللي بعده.

~~~dart
  Failure() => 'failed',
};
~~~

أي Failure فاضل (400 مثلًا). جربت الحالات كلها:

~~~text describe(Ok('x')), Failure(404), Failure(400), Failure(503)
[got x, not found, failed, server error 503]
~~~

### exhaustiveness: الـ compiler بيعدّ الحالات

مسحت سطر [[Failure() => 'failed']]:

~~~text dart run
Error: The type 'Result' is not exhaustively matched by the switch cases since it doesn't match 'Failure(code: int())'.
Try adding a wildcard pattern or cases that match 'Failure()'.
~~~

- [[exhaustively]]: «مغطي كل الاحتمالات». الـ compiler لقى Failure كوده مش 404 ومش داخل في when، وكتبلك شكله: [[Failure(code: int())]].
- الـ [[when]] **مش بيتحسب** في التغطية: الـ compiler مش بيحاول يفهم الشرط.

وضفت [[class Loading extends Result {}]] من غير ما ألمس الـ switch:

~~~text dart analyze
The type 'Result' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'Loading()'.
~~~

ودي الفايدة كلها: ضفت حالة، وكل switch ناسيها وقف لحد ما تضيف [[Loading() => 'loading...']] (ده الـ solCode، وطبع [[loading...]]).

---

## ٤. [[main]]: فك record

~~~dart
  final (lat, lng) = location();
~~~

**destructuring**: الشمال pattern فيه متغيرين، فأول قيمة راحت lat والتانية lng. وأنواعهم [[double]] (اتأكدت بـ runtimeType).

~~~dart
  final stats = (total: 10, done: 4);
~~~

record بـ **أسماء**: [[stats.total]] بدل [[$1]]. نوعه اتطبع [[({int done, int total})]]: الـ named جوه [[{ }]]، و Dart بيرتّبهم أبجديًا في الطباعة. وتفكّه بـ [[final (:total, :done) = stats;]] (جربتها وطلعت [[10 4]]).

~~~dart
  print('$lat $lng $__{stats.total - stats.done} $__{describe(Failure(503))}');
~~~

~~~text الناتج
30.04 31.23 6 server error 503
~~~

---

## ٥. pattern مع Map: [[if-case]]

مش في المثال بس هتحتاجه مع JSON:

~~~dart
  if (json case {'name': String name}) print('name=$name');
~~~

«لو json فيه مفتاح name وقيمته String، حطها في name». جربتها على [[{'name': 'Ali'}]] وطلعت [[name=Ali]]، وعلى مفتاح مش موجود ([[{'age': int age}]]) الشرط بقى false بس من غير exception.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| record | [[(1, 2)]] أو [[(a: 1, b: 2)]] | أكتر من قيمة من غير class |
| فك | [[final (x, y) = rec;]] | قيمة لكل متغير |
| sealed | [[sealed class Result {}]] | الأبناء معروفين كلهم |
| object pattern | [[Ok(:var data)]] | النوع + طلّع field |
| guard | [[when code >= 500]] | شرط زيادة، مش بيتحسب في التغطية |

> متسكّتش الـ exhaustiveness بـ [[_ => ...]] على sealed class: كده أي حالة جديدة هتعدّي من غير ما الـ compiler يقولك.`,
          lines: [
            "الدالة بترجّع record فيه رقمين، من غير class.",
            "[[sealed]]: الـ subclasses كلها لازم تبقى في نفس الملف، فالـ compiler عارفهم كلهم.",
            "نجاح ومعاه بيانات.",
            "فشل ومعاه كود.",
            "switch كـ expression بترجّع String.",
            "لو Ok، طلّع الـ data في متغير.",
            "لو Failure والكود 404 بالظبط.",
            "لو Failure والكود 500 أو أكتر ([[when]] شرط زيادة).",
            "أي Failure تاني. لو شلت السطر ده الكود مش هيترجم، لأن فيه حالة ناقصة.",
            "قفلة الـ switch.",
            "البداية.",
            "فك الـ record لمتغيرين في سطر.",
            "record بأسماء: [[stats.total]] بدل [[$1]].",
            "30.04 31.23 6 server error 503.",
            "قفلة."
          ],
          sol: R`لما تمسح [[Failure() => 'failed']] الكود مش بيترجم: [[The type 'Result' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'Failure(code: int())']]. الـ compiler لقى Failure بكود زي 400 مش داخل في 404 ولا في [[>= 500]]، وبيقولك بالظبط أنهي شكل ناقص. لاحظ إن [[when]] مش بيتحسب في الـ exhaustiveness، فالحالة اللي فيها when لوحدها مش بتغطي Failure.

ولما تضيف [[class Loading extends Result {}]]: [[... doesn't match the pattern 'Loading()']]. تصلّحه بـ [[Loading() => 'loading...']]. وده بالظبط اللي بتستفيده من sealed: كل switch في التطبيق مش مغطي الحالة الجديدة هيقف لحد ما تصلّحه. الغلط الشائع إنك تسكّته بـ [[_ => '']]، وساعتها أي حالة جديدة بعد كده هتعدّي من غير ما حد ياخد باله.`,
          solCode: R`sealed class Result {}
class Ok extends Result { Ok(this.data); final String data; }
class Failure extends Result { Failure(this.code); final int code; }
class Loading extends Result {}

String describe(Result r) => switch (r) {
  Ok(:var data) => 'got $data',
  Failure(code: 404) => 'not found',
  Failure(:var code) when code >= 500 => 'server error $code',
  Failure() => 'failed',
  Loading() => 'loading...',
};

void main() => print(describe(Loading())); // loading...`
        },
        {
          cmd: "async و await",
          title: "تستنى نتيجة بطيئة من غير ما الشاشة تهنج",
          desc: R`[[Future<T>]] هو Promise بتاع Dart: قيمة هتيجي بعدين (رد API، قراءة ملف). والدالة اللي فيها [[async]] بترجّع Future، وجواها [[await]] بيستنى من غير ما يوقّف التطبيق. والأخطاء بـ [[try]] و [[on]] و [[catch]] عادي، زي الكود الـ sync بالظبط.

Dart شغال على thread واحد (event loop زي JS)، فالـ await مش بيوقّف الرسم: الشاشة بتفضل ترد لحد ما النتيجة توصل.`,
          example: R`Future<String> fetchName(int id) async {
  await Future.delayed(const Duration(seconds: 1));
  if (id < 0) throw FormatException('bad id', id);
  return 'User $id';
}

Future<void> main() async {
  final name = await fetchName(1);
  final both = await Future.wait([fetchName(2), fetchName(3)]);
  print('$name $both');
  try {
    await fetchName(-1);
  } on FormatException catch (e) {
    print('error: $__{e.message} ($__{e.source})');
  }
}`,
          try: "بدّل [[Future.wait]] بـ await لكل واحد ورا التاني واحسب الوقت بـ [[Stopwatch]]: ثانيتين بدل ثانية. وبعدين شيل await من [[fetchName(1)]] واطبع name.",
          flag: "script",
          deep: {
            why: "طلب API ممكن ياخد ثانيتين. لو الكود وقف يستنى، الشاشة هتقف ومش هترد على اللمس، وأندرويد ممكن يقولك «التطبيق مش بيستجيب». الـ Future بيخلي الشغل البطيء يستنى على جنب والـ UI شغال.",
            how: R`Dart شغال بـ event loop على isolate واحد (الـ main isolate)، زي JS. الـ await بيقسم الدالة: اللي قبله بيتنفذ، وبعدين الدالة بتسيب الـ event loop يشتغل (يرسم frames ويرد على اللمس)، ولما الـ Future يخلص الباقي بيتحط في الطابور ويكمّل.

فيه طابورين: microtask queue (بيخلص الأول دايمًا، وفيه تكملة الـ Futures)، و event queue (timers و I/O واللمس). عشان كده [[Future.delayed(Duration.zero)]] مش بيتنفذ «دلوقتي»، بيروح آخر الطابور.

الفرق عن JS: [[then]] و [[catchError]] موجودين زي Promise، بس اكتب async و await دايمًا. و [[Future.wait]] زي Promise.all. ومن Dart 3 فيه كمان [[await (f1(), f2()).wait]] بيرجّع record بأنواع مختلفة.

async مش threads: لو عملت loop تقيلة (parse JSON ضخم، معالجة صورة) جوه async، هتوقّف الـ UI برضه، لأن الكود نفسه على نفس الـ thread. الحل [[Isolate.run(() => heavyWork())]] (أو [[compute]] في Flutter) بيشغّلها على isolate تاني بذاكرة منفصلة.

وخد بالك: Future من غير await ومن غير catch، لو فشل، الـ error بيطلع «unhandled» في اللوج والكود اللي بعده كمّل كأن مفيش حاجة. الـ lint [[unawaited_futures]] بيمسكها.`,
            when: "أي حاجة بتاخد وقت: شبكة، ملفات، قاعدة بيانات، تخزين. وفي Flutter بتنادي الـ async في initState أو في onPressed، ومش جوه build.",
            mistakes: R`تنسى [[await]] فالمتغير يبقى [[Future<String>]] مش String، وتطبعه تلاقي [[Instance of 'Future<String>']]. وترمي [[ArgumentError]] أو تمسك بـ [[catch (e)]] عام: دا Error يعني bug، والـ catch العام بيبلع الـ bugs مع الأخطاء المتوقعة، فارمي Exception وامسكه بـ [[on]] (درس try و on و rethrow). وتعمل await ورا بعض لحاجات مستقلة (٣ طلبات = ٣ ثواني) بدل Future.wait (ثانية). وبعد await في Flutter تستخدم [[context]] والشاشة ممكن تكون اتقفلت: اسأل [[if (!context.mounted) return;]] الأول.`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالة بتمثّل طلب API: بتستنى ثانية وترجّع اسم، أو ترمي error لو الـ id سالب. والـ main بتستناها مرة، وبعدين تبعت طلبين مع بعض، وبعدين تمسك الـ error. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأوقات تحت متقاسة بـ [[Stopwatch]] فعلًا.

---

## ١. [[Future<String>]] و [[async]]

~~~dart
Future<String> fetchName(int id) async {
~~~

- [[Future<String>]]: «String هيوصل **بعدين**». زي Promise في JavaScript. الدالة مش بترجّع الاسم نفسه، بترجّع وعد بيه.
- [[async]] قبل [[{]]: الدالة دي asynchronous. معناها حاجتين: تقدر تستخدم [[await]] جواها، وأي [[return]] بيتلف تلقائي في Future. فانت بتكتب [[return 'User $id';]] (String) والدالة بترجّع [[Future<String>]].

---

## ٢. [[await Future.delayed]]

~~~dart
  await Future.delayed(const Duration(seconds: 1));
~~~

- [[Duration(seconds: 1)]]: مدة زمنية، ثانية. [[seconds:]] named parameter. و [[const]] لأن القيمة معروفة وقت الترجمة.
- [[Future.delayed(...)]]: Future بيخلص بعد المدة دي. هنا بيمثّل وقت الشبكة.
- [[await]]: «استنى الـ Future ده يخلص، وبعدين كمّل السطر اللي بعده». الاستنا ده **مش بيوقّف البرنامج**: Dart بيسيب الدالة على جنب ويشتغل في حاجات تانية (في Flutter: يرسم الشاشة ويرد على اللمس)، ولما الثانية تخلص يرجع يكمّل.

---

## ٣. [[throw]] جوه async

~~~dart
  if (id < 0) throw FormatException('bad id', id);
  return 'User $id';
}
~~~

- [[throw]]: ارمي error ووقّف الدالة.
- [[FormatException('bad id', id)]]: نوع جاهز في Dart، معناه «البيانات شكلها غلط». أول argument الرسالة ([[message]])، والتاني القيمة اللي سببت المشكلة ([[source]]).
- في دالة async الـ throw مش بيضرب على طول: بيخلّي الـ Future **يفشل**، واللي بيعمل await هو اللي يستلم الـ error.
- [[return 'User $id';]]: لو كله تمام، دي قيمة الـ Future.

---

## ٤. [[main]] نفسها async

~~~dart
Future<void> main() async {
  final name = await fetchName(1);
~~~

- [[Future<void>]]: main بقت async، فبترجّع Future مالوش قيمة ([[void]]). Dart بيستنى الـ Future ده يخلص قبل ما يقفل البرنامج.
- [[await fetchName(1)]]: استنى. name نوعه [[String]] مش Future، لأن await «فك» الـ Future.

جربت أقيس الوقت بعد السطر ده: [[1007ms]]. ثانية + شوية.

### من غير await

ده التجربة التانية في «جرّب». [[final name = fetchName(1);]] و [[print(name);]]:

~~~text الناتج
Instance of 'Future<String>'
~~~

الكود ترجم عادي، بس name بقى الوعد نفسه مش الاسم. ولو كتبت [[fetchName(1).length]]:

~~~text dart run
Error: The getter 'length' isn't defined for the type 'Future<String>'.
~~~

---

## ٥. [[Future.wait]]: اتنين مع بعض

~~~dart
  final both = await Future.wait([fetchName(2), fetchName(3)]);
  print('$name $both');
~~~

نفكّها من جوه لبرة:

1. [[fetchName(2)]] و [[fetchName(3)]]: الاتنين **بيبدأوا دلوقتي** وكل واحد رجّع Future.
2. [[[ ... ]]]: لستة فيها الـ Futures.
3. [[Future.wait(...)]]: Future واحد بيخلص لما **كلهم** يخلصوا، وقيمته لستة النتايج بنفس الترتيب. زي [[Promise.all]].
4. [[await]]: استنى. both نوعه [[List<String>]] (اتطبع كده بـ runtimeType).

الوقت اللي اتقاس بعد الخطوة دي: [[2009ms]] من أول البرنامج، يعني الاتنين خدوا **ثانية واحدة** مع بعض مش اتنين.

~~~text الناتج
User 1 [User 2, User 3]
~~~

### ورا بعض بدل مع بعض (الـ solCode)

~~~text الناتج (solCode)
wait: [User 2, User 3] 1007ms
sequential: [User 2, User 3] 2002ms
Instance of 'Future<String>'
~~~

- [[Stopwatch()..start()]]: ساعة إيقاف، والـ cascade [[..]] بيشغّلها ويرجّعها هي.
- [[sw.elapsedMilliseconds]]: الوقت من ساعة start بالميلي ثانية (1000 = ثانية). و [[sw.reset()]] بيرجّعها صفر.
- [[await]] ورا [[await]]: التاني مبيبدأش غير لما الأول يخلص، فـ ٢ ثانية. نفس النتيجة، ضعف الوقت.

---

## ٦. [[try]] و [[on]] و [[catch]]

~~~dart
  try {
    await fetchName(-1);
  } on FormatException catch (e) {
    print('error: $__{e.message} ($__{e.source})');
  }
}
~~~

- [[try { }]]: «جرّب الكود ده، ولو رمى error متقعش».
- [[await fetchName(-1)]]: الـ Future فشل، والـ await بيحوّل الفشل ده لـ exception عادي في السطر ده. يعني نفس [[try]] بتاعة الكود العادي بتمسكه.
- [[on FormatException]]: امسك النوع ده **بس**. أي نوع تاني يعدّي لفوق.
- [[catch (e)]]: حط الـ error في متغير اسمه e عشان تقرا منه.
- [[e.message]] و [[e.source]]: الرسالة والقيمة اللي اتبعتوا في الـ throw.

~~~text الناتج
error: bad id (-1)
~~~

### لو النوع مش متطابق

جربت [[on ArgumentError]] بدل [[on FormatException]]: الـ catch متنفذش، والـ error عدّى وقفل البرنامج:

~~~text dart run
Unhandled exception:
FormatException: bad id
#0      fetchName (file:///w/main.dart:3:15)
<asynchronous suspension>
~~~

[[<asynchronous suspension>]] في الـ stack trace معناها «هنا الدالة كانت مستنية await».

---

## ٧. ترتيب التنفيذ: event loop

Dart بيشغّل كودك على thread واحد. جربت ده:

~~~dart
  final f = Future.delayed(Duration.zero, () => print('event: delayed zero'));
  scheduleMicrotask(() => print('microtask'));
  print('sync');
~~~

~~~text الناتج
sync
microtask
event: delayed zero
~~~

الكود العادي الأول، وبعدين طابور الـ microtasks (فيه تكملة الـ Futures)، وبعدين طابور الـ events (timers والشبكة واللمس). حتى [[Duration.zero]] بيستنى دوره.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Future<T>]] | قيمة T هتوصل بعدين |
| [[async]] | الدالة ترجّع Future، وتقدر تعمل await جواها |
| [[await f]] | استنى من غير ما توقّف الشاشة، وخد القيمة |
| [[Future.wait([...])]] | ابدأ الكل مع بعض واستنى الأبطأ |
| [[on Type catch (e)]] | امسك نوع error معين |

> await ورا await للحاجات المستقلة = وقت ضايع. و Future من غير await = قيمة مش هي اللي انت فاكرها.`,
          lines: [
            "دالة async بترجّع Future<String>.",
            "استنى ثانية (زي طلب شبكة). [[const Duration]] عشان القيمة ثابتة.",
            "الـ throw جوه async بيتحوّل لـ Future فاشل. و FormatException نوع Exception (حالة متوقعة)، مش Error.",
            "الـ return بيبقى قيمة الـ Future.",
            "قفلة.",
            "main نفسها ينفع تبقى async.",
            "[[await]]: استنى النتيجة. ثانية.",
            "[[Future.wait]]: الاتنين مع بعض، فثانية مش اتنين.",
            "User 1 [User 2, User 3].",
            "الأخطاء بتتمسك عادي.",
            "await على Future هيفشل.",
            "[[on FormatException]]: امسك النوع اللي متوقعه بس، والباقي يطلع لفوق.",
            "error: bad id (-1).",
            "قفلة try.",
            "قفلة main."
          ],
          sol: R`مع [[Future.wait]] الاتنين بياخدوا حوالي [[1000ms]] (الـ Stopwatch طلّع 1007 عندي)، ولما تكتب await لكل واحد ورا التاني بياخدوا حوالي [[2000ms]]. لأن Future.wait بيبدأ الطلبين مع بعض ويستنى الأبطأ، إنما await ورا await بيبدأ التاني بعد ما الأول يخلص. والناتج نفسه واحد في الحالتين: [[[User 2, User 3]]].

ولما تشيل await من [[fetchName(1)]] وتطبع name: [[Instance of 'Future<String>']]. الكود بيترجم عادي والـ analyzer مش بيعترض، لأن تخزين Future في متغير كلام صح. المشكلة إنك فاكر إنه String. لو حاولت تعمل [[name.length]] ساعتها بس الـ compiler هيقولك إن Future مفيهوش length.`,
          solCode: R`Future<String> fetchName(int id) async {
  await Future.delayed(const Duration(seconds: 1));
  return 'User $id';
}

Future<void> main() async {
  final sw = Stopwatch()..start();
  final both = await Future.wait([fetchName(2), fetchName(3)]);
  print('wait: $both $__{sw.elapsedMilliseconds}ms'); // ~1000ms

  sw.reset();
  final a = await fetchName(2);
  final b = await fetchName(3);
  print('sequential: $__{[a, b]} $__{sw.elapsedMilliseconds}ms'); // ~2000ms

  final name = fetchName(1); // من غير await
  print(name); // Instance of 'Future<String>'
}`
        },
        {
          cmd: "Stream",
          title: "قيم كتير بتوصل على مراحل مش قيمة واحدة",
          desc: R`الـ Future قيمة واحدة بتيجي مرة. الـ [[Stream<T>]] سلسلة قيم بتيجي على مدار الوقت: رسايل chat، أو موقع GPS، أو تقدّم رفع ملف، أو تغييرات قاعدة بيانات realtime.

بتسمع عليه بـ [[listen]] (وتقفل الاشتراك بـ [[cancel]])، أو بـ [[await for]] جوه دالة async. وتعمل stream بنفسك بدالة [[async*]] و [[yield]]، أو بـ [[StreamController]]. وفي Flutter بتعرضه بـ [[StreamBuilder]].`,
          example: R`import 'dart:async';

Stream<int> countdown(int from) async* {
  for (var i = from; i >= 0; i--) {
    await Future.delayed(const Duration(milliseconds: 300));
    yield i;
  }
}

Future<void> main() async {
  await for (final n in countdown(3)) print(n);
  final controller = StreamController<String>();
  final sub = controller.stream.listen((msg) => print('got $msg'));
  controller.add('hello');
  await controller.close();
  await sub.cancel();
}`,
          try: "اعمل listen تاني على [[controller.stream]] وشوف الـ error. وبعدين غيّره لـ [[StreamController<String>.broadcast()]] وجرّب تاني.",
          flag: "script",
          deep: {
            why: "فيه بيانات مش بتيجي مرة وخلاص: رسايل جديدة، ومكان المستخدم بيتحرك، وحالة تسجيل الدخول بتتغير. لو استخدمت Future هتضطر تسأل كل شوية (polling). الـ Stream بيقولك أول ما حاجة تتغير.",
            how: R`نوعين streams: single-subscription (الافتراضي) ينفع يتسمع مرة واحدة بس، ولو حد تاني عمل listen هيضرب [[Bad state: Stream has already been listened to]]. و broadcast ([[StreamController.broadcast()]] أو [[stream.asBroadcastStream()]]) أي عدد يسمع، بس اللي يشترك متأخر مش بياخد القديم.

الـ subscription بيفضل شغال لحد ما الـ stream يخلص أو تعمل [[cancel]]. في Flutter لو عملت listen في initState ونسيت cancel في dispose، الـ callback هيفضل يتنادى بعد ما الشاشة تتقفل، و [[setState]] هيضرب [[setState() called after dispose()]]، ودا memory leak.

الـ Stream ليه دوال زي List: [[map]] و [[where]] و [[take]] و [[distinct]]، وكلها بترجّع stream جديد. و [[await for]] بيوقف الدالة لحد ما الـ stream يخلص، فلو stream مبيخلصش (زي حالة تسجيل الدخول) الكود اللي بعده مش هيتنفذ أبدًا.

في Flutter، [[StreamBuilder(stream: ..., builder: (context, snapshot) => ...)]] بيعمل listen و cancel لوحده ويعيد البناء مع كل قيمة جديدة. وأمثلة حقيقية: [[FirebaseAuth.instance.authStateChanges()]]، و realtime في [[supabase_flutter]]، و [[onConnectivityChanged]] في connectivity_plus.`,
            when: "بيانات realtime، أو أحداث متكررة (sensors، موقع)، أو حالة بتتغير وأكتر من مكان عايز يعرف. لو قيمة واحدة: Future.",
            mistakes: R`تعمل listen ومتعملش cancel. وتعمل listen مرتين على single-subscription stream. وتعمل [[StreamBuilder(stream: repo.watchMessages())]] جوه build، فكل rebuild يعمل stream جديد ويبدأ من الأول: اعمله مرة في initState وخزّنه.`
          },
          teach: R`## البرنامج بيعمل إيه؟

جزئين: الأول دالة بتطلّع عدّ تنازلي 3 و 2 و 1 و 0، رقم كل ٣٠٠ ميلي ثانية، والـ main بتاخدهم واحد واحد. والتاني [[StreamController]] بنبعت فيه رسالة بإيدنا ومستمع بيستلمها. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأوقات متقاسة فعلًا.

---

## ١. [[import 'dart:async';]]

~~~dart
import 'dart:async';
~~~

[[import]] بيجيب كود من مكتبة تانية. [[dart:]] في الأول معناها مكتبة جاية مع Dart نفسها. و [[Future]] و [[Stream]] موجودين من غير import، إنما [[StreamController]] لأ، فمحتاجينه.

---

## ٢. [[Stream<int>]] و [[async*]]

~~~dart
Stream<int> countdown(int from) async* {
~~~

- [[Stream<int>]]: «أرقام هتوصل **واحد ورا التاني** على مدار الوقت». الـ Future قيمة واحدة، الـ Stream سلسلة.
- [[async*]] (بالنجمة): الدالة دي **generator** بيطلّع stream. [[async]] من غير نجمة بترجّع Future، و [[async*]] بترجّع Stream.

---

## ٣. الـ loop و [[yield]]

~~~dart
  for (var i = from; i >= 0; i--) {
    await Future.delayed(const Duration(milliseconds: 300));
    yield i;
  }
}
~~~

- [[for (var i = from; i >= 0; i--)]]: الـ for الكلاسيكي بـ ٣ حتت: ابدأ i من [[from]]، كمّل طول ما [[i >= 0]]، وبعد كل لفة [[i--]] (نقّص واحد). فـ i هتبقى 3 ثم 2 ثم 1 ثم 0.
- [[await Future.delayed(...)]]: استنى ٣٠٠ ميلي ثانية من غير ما توقّف حاجة.
- [[yield i]]: «ابعت i للي سامع، **وكمّل** من هنا». مش زي [[return]] اللي بتخلّص الدالة.
- لما الـ loop تخلص والدالة توصل [[}]]، الـ stream بيبعت إشارة «خلصت» (done).

ملحوظة: الدالة مش بتبدأ تشتغل غير لما حد يسمع على الـ stream.

---

## ٤. [[await for]]

~~~dart
Future<void> main() async {
  await for (final n in countdown(3)) print(n);
~~~

- [[for (final n in ...)]] زي اللفة على List، بس [[await]] قبلها معناها «كل عنصر استناه لحد ما يوصل».
- الـ loop **مش بتخلص** غير لما الـ stream يبعت done. فالسطر اللي بعدها بيستنى العدّ كله.

حطيت وقت جنب كل رقم:

~~~text الناتج
3 316ms
2 619ms
1 920ms
0 1221ms
~~~

كل رقم بعد التاني بـ ٣٠٠ms تقريبًا. والـ ١٦ms الزيادة في الأول وقت تشغيل البرنامج نفسه.

---

## ٥. [[StreamController]]

~~~dart
  final controller = StreamController<String>();
~~~

الـ [[async*]] بتعمل stream من كود. إنما لو القيم جاية من برّه (رسالة وصلت، زرار اتداس) بتحتاج controller: object ليه طرفين:

| الطرف | بتعمل بيه إيه |
|---|---|
| [[controller.add(x)]] | تبعت قيمة |
| [[controller.stream]] | الـ Stream اللي الناس بتسمع عليه |
| [[controller.close()]] | تقفل وتبعت done |

---

## ٦. [[listen]] و subscription

~~~dart
  final sub = controller.stream.listen((msg) => print('got $msg'));
  controller.add('hello');
~~~

- [[listen(...)]]: سجّل دالة تتنادى مع كل قيمة. الـ [[(msg) => print(...)]] دالة من غير اسم.
- [[listen]] بترجّع [[StreamSubscription]]، خزّناها في sub عشان نقفلها بعدين.
- [[add('hello')]]: ابعت قيمة.

### القيمة مش بتوصل في نفس اللحظة

جربت [[print('after add')]] بعد الـ add على طول، و [[onDone]] في الـ listen:

~~~text الناتج
after add
got hello
done
closed
~~~

[[after add]] اتطبعت **قبل** [[got hello]]: الـ controller مش بينادي المستمع جوه add، بيحط القيمة في الطابور وبتوصل بعد الكود العادي ما يخلص (زي ما شفنا في درس «async و await»).

---

## ٧. القفل

~~~dart
  await controller.close();
  await sub.cancel();
}
~~~

- [[close()]]: مفيش قيم تاني، والمستمعين ياخدوا done. بترجّع Future فبنعمل await.
- [[sub.cancel()]]: الغي الاشتراك. هنا الـ stream خلص أصلًا، بس العادة دي هي اللي هتحميك في Flutter: لو عملت listen في [[initState]]، لازم [[cancel]] في [[dispose]]، وإلا الدالة تفضل تتنادى بعد ما الشاشة تتقفل.

~~~text الناتج الكامل
3
2
1
0
got hello
~~~

---

## ٨. مستمعين اتنين: single-subscription و broadcast

جربت listen تاني على نفس [[controller.stream]] (سطر جديد بعد سطر الـ sub). العدّ 3 2 1 0 اتطبع عادي، وبعدين:

~~~text dart run
Unhandled exception:
Bad state: Stream has already been listened to.
#0      _StreamController._subscribe (dart:async/stream_controller.dart:695:7)
...
#3      main (file:///w/main.dart:14:21)
~~~

- [[Bad state]]: العملية مش مسموحة في الحالة دي.
- الـ StreamController العادي **single-subscription**: مستمع واحد بس طول عمره. والـ stack بيشاور على سطر الـ listen التاني.

والحل في الـ solCode: [[StreamController<String>.broadcast()]] (named constructor). أي عدد يسمع:

~~~text الناتج (solCode)
got hello
second hello
~~~

بس الـ broadcast مش بيحفظ قيم: اللي يعمل listen بعد الـ add مش هياخدها.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Stream<T>]] | قيم كتير على مدار الوقت |
| [[async*]] + [[yield]] | دالة بتطلّع stream، و yield تبعت وتكمّل |
| [[await for]] | خد القيم واحدة واحدة، والـ loop تخلص مع done |
| [[StreamController]] | تبعت فيه بإيدك بـ add، والناس تسمع على stream |
| [[listen]] / [[cancel]] | اشترك / الغي (في Flutter: initState / dispose) |
| [[.broadcast()]] | أكتر من مستمع، ومن غير حفظ للقديم |`,
          lines: [
            "StreamController موجود في dart:async.",
            "[[async*]]: دالة بترجّع Stream بدل Future.",
            "loop من الرقم لحد صفر.",
            "استنى شوية بين كل قيمة.",
            "[[yield]]: ابعت قيمة للي سامع، وكمّل.",
            "قفلة الـ loop.",
            "قفلة الدالة: الـ stream بيخلص هنا.",
            "البداية.",
            "[[await for]]: خد كل قيمة أول ما توصل، ويكمّل بعد ما الـ stream يخلص. بيطبع 3 2 1 0.",
            "controller: stream بتبعت فيه بإيدك.",
            "[[listen]] بيرجّع subscription، ودي اللي بتقفلها بعدين.",
            "ابعت قيمة: got hello.",
            "اقفل الـ stream (يبعت done).",
            "الغي الاشتراك. في Flutter دي مكانها dispose.",
            "قفلة."
          ],
          sol: R`المثال الأصلي بيطبع [[3]] و [[2]] و [[1]] و [[0]] (كل واحد بعد ٣٠٠ms) وبعدين [[got hello]].

لما تعمل listen تاني على نفس الـ controller العادي، البرنامج بيضرب على سطر الـ listen التاني نفسه: [[Bad state: Stream has already been listened to.]]. الـ stream العادي single-subscription: مستمع واحد بس طول عمره، حتى لو الأول عمل cancel.

ولما تغيّره لـ [[StreamController<String>.broadcast()]] الاتنين بيشتغلوا: [[got hello]] ثم [[second hello]]. بس خد بالك من الفرق التاني: في broadcast لو عملت listen بعد [[add]]، القيمة دي ضاعت عليك، مفيش buffer. عشان كده لو محتاج آخر قيمة للي بيشترك متأخر (زي حالة تسجيل الدخول)، ده شغل ValueNotifier أو Riverpod مش broadcast stream.`,
          solCode: R`import 'dart:async';

Future<void> main() async {
  final controller = StreamController<String>.broadcast();
  final sub = controller.stream.listen((msg) => print('got $msg'));
  final sub2 = controller.stream.listen((msg) => print('second $msg'));
  controller.add('hello'); // got hello, second hello
  await controller.close();
  await sub.cancel();
  await sub2.cancel();
}`
        }
      ]
    }
]);
