// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
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
          teach: R`## البرنامج بيعمل إيه؟

دالتين بيكلموا API: [[fetchTodos]] بتجيب أول ٣ مهام (GET)، و [[createTodo]] بتعمل مهمة جديدة (POST). والاتنين بيفحصوا كود الرد ويرموا exception خاص لو السيرفر رد بخطأ.

**اتشغّل إزاي:** مشروع [[dart create -t console api_lab]] و [[dart pub add http]] (نزل [[http 1.6.0]]) جوه [[docker run --rm dart:stable]] (Dart 3.13.5). jsonplaceholder.typicode.com مكانش بيرد من الجهاز ده ([[HandshakeException: Connection terminated during handshake]])، فشغّلت سيرفر Node صغير على الجهاز نفسه (بورت 5993) بيرد بنفس شكل jsonplaceholder: نفس أول ٤ مهام، و POST بيرجّع 201 ومعاه [[id: 201]]، والمسار المش موجود بيرجّع 404 و [[{}]]. الحاجة الوحيدة اللي غيّرتها في الكود: [[base]] بقى [[http://host.docker.internal:5993]] (اسم بيوصل من جوه الـ container للجهاز). والسيرفر كان بيطبع كل طلب بيوصله، عشان نشوف اللي اتبعت فعلًا.

---

## ١. الـ imports

~~~dart
import 'dart:convert';
import 'package:http/http.dart' as http;
~~~

- [[dart:convert]] مكتبة جاية مع Dart، فيها [[jsonDecode]] (نص JSON → Map/List) و [[jsonEncode]] (العكس).
- [[as http]] اسم مستعار: كل حاجة من المكتبة تتكتب [[http.get]] و [[http.post]]. من غيره [[get]] لوحدها اسم عام ممكن يتلخبط مع حاجة تانية.

~~~dart
const base = 'https://jsonplaceholder.typicode.com';
~~~

[[const]] نص ثابت وقت الترجمة. في تطبيق حقيقي ده بييجي من [[--dart-define]] (درس dart-define).

---

## ٢. exception خاص بأخطاء السيرفر

~~~dart
class ApiException implements Exception {
  ApiException(this.statusCode, this.body);
  final int statusCode;
  final String body;
  @override
  String toString() => 'ApiException($statusCode)';
}
~~~

- [[implements Exception]]: الـ class ده نوع من الأخطاء، فينفع [[throw]] و [[on ApiException catch]].
- بيشيل كود الرد ونص الرد (السيرفر غالبًا بيكتب فيه سبب الغلط).
- [[toString]] عشان لما يتطبع يطلع [[ApiException(404)]] مش [[Instance of 'ApiException']].

---

## ٣. GET: [[fetchTodos]]

~~~dart
Future<List<Map<String, dynamic>>> fetchTodos() async {
~~~

[[Future<...>]] = «النتيجة هتيجي بعدين». والنتيجة لستة، كل عنصر Map مفاتيحها نصوص وقيمها أي نوع ([[dynamic]]).

### بناء الـ URL

~~~dart
  final uri = Uri.parse('$base/todos').replace(queryParameters: {'_limit': '3'});
~~~

- [[Uri.parse]] بيحوّل النص لـ [[Uri]] (object فيه الـ host والمسار والـ query متفصلين). [[http.get]] بياخد Uri مش String.
- [[.replace(queryParameters: {...})]] بيحط الـ query ويعمل **encode** للقيم. طبعته:

~~~text الناتج
http://host.docker.internal:5993/todos?_limit=3
https://example.com/search?q=%D9%83%D8%AA%D8%A8+%D8%B9%D8%B1%D8%A8%D9%8A&page=2
~~~

السطر التاني من [[Uri.https('example.com', '/search', {'q': 'كتب عربي', 'page': '2'})]]: العربي اتحوّل لـ [[%D9%83...]] والمسافة لـ [[+]]. لو بنيت الـ query بإيدك بـ string concatenation العربي والمسافات و [[&]] هيبوّظوا الطلب.

### الطلب

~~~dart
  final res = await http.get(uri, headers: {'Accept': 'application/json'}).timeout(const Duration(seconds: 10));
~~~

من جوه لبرة:
1. [[http.get(uri, headers: {...})]] ابعت GET. هيدر [[Accept]] بيقول للسيرفر «عايز الرد JSON».
2. [[.timeout(const Duration(seconds: 10))]] لو مخلصش في 10 ثواني ارمي [[TimeoutException]]. من غيره الطلب ممكن يفضل معلّق على نت ضعيف.
3. [[await]] استنى النتيجة: [[Response]] فيه [[statusCode]] (رقم) و [[body]] (نص).

### الفحص والتحويل

~~~dart
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return (jsonDecode(res.body) as List).cast<Map<String, dynamic>>();
}
~~~

- 200 = OK. أي حاجة تانية: ارمي. **http مش بيرمي لوحده** على 404 أو 500.
- [[jsonDecode(res.body)]] النص → [[List<dynamic>]].
- [[as List]] ثم [[.cast<Map<String, dynamic>>()]]: «عامل كل عنصر كـ Map». جربت [[as List<Map<String, dynamic>>]] مباشرة:

~~~text dart run
List<dynamic>
_TypeError: type 'List<dynamic>' is not a subtype of type 'List<Map<String, dynamic>>' in type cast
~~~

jsonDecode دايمًا بيعمل [[List<dynamic>]]، فالـ cast المباشر بيضرب، و [[cast]] هو الصح.

---

## ٤. POST: [[createTodo]]

~~~dart
Future<Map<String, dynamic>> createTodo(String title) async {
  final res = await http.post(
    Uri.parse('$base/todos'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'title': title, 'completed': false, 'userId': 1}),
  );
~~~

- [[Content-Type: application/json]] بيقول للسيرفر «الـ body اللي معايا JSON».
- [[jsonEncode({...})]] الـ Map → نص JSON.

السيرفر طبع اللي وصله:

~~~text اللي السيرفر استقبله
POST /todos content-type=application/json body={"title":"learn http","completed":false,"userId":1}
~~~

### لو نسيت jsonEncode

جربت [[http.post(uri, body: {'title': 'learn http'})]] (Map مباشرة):

~~~text اللي السيرفر استقبله
POST /todos content-type=application/x-www-form-urlencoded body=title=learn+http
~~~

package http حوّل الـ Map لـ **form** مش JSON، وغيّر الـ Content-Type. سيرفر Express بـ [[express.json()]] بس هيلاقي [[req.body]] فاضي.

~~~dart
  if (res.statusCode != 201) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}
~~~

201 = Created، الكود الطبيعي لإنشاء حاجة جديدة. و [[as Map<String, dynamic>]] على ناتج jsonDecode آمن، لأن الـ Map اللي بيعملها نوعها كده فعلًا.

---

## ٥. [[main]] والناتج

~~~dart
Future<void> main() async {
  final todos = await fetchTodos();
  for (final t in todos) {
    print('$__{t['id']}: $__{t['title']}');
  }
  print(await createTodo('learn http'));
}
~~~

[[main]] نفسها [[async]] عشان تقدر تعمل await. و [[$__{t['id']}]] جوه النص: الأقواس [[{}]] لازمة لأن فيه [[['id']]] مش اسم متغير بس.

~~~text dart run
1: delectus aut autem
2: quis ut nam facilis et officia qui
3: fugiat veniam minus
{title: learn http, completed: false, userId: 1, id: 201}
~~~

السطر الأخير الـ Map اللي السيرفر رجّعها، ومعاها [[id]] جديد. (jsonplaceholder الحقيقي بيرد كده بس مش بيحفظ فعلًا.)

---

## ٦. «جرّب»: الأخطاء التلاتة

### السيرفر رد بخطأ: 404

~~~dart
Future<Map<String, dynamic>> fetchTodo(int id) async {
  final res = await http.get(Uri.parse('$base/todos/$id')).timeout(const Duration(seconds: 10));
  if (res.statusCode == 404) throw ApiException(404, 'todo $id not found');
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}
~~~

~~~text dart run
status 404 body "{}"
caught ApiException(404): todo 99999 not found
~~~

السطر الأول من [[http.get]] لوحده: مفيش exception، الرد عادي بكود 404 و body [[{}]]. السطر التاني من fetchTodo: الفحص هو اللي رمى. ولـ id موجود ([[fetchTodo(1)]]) رجّع [[{userId: 1, id: 1, title: delectus aut autem, completed: false}]].

### الطلب موصلش أصلًا

~~~text dart run (container بـ --network none: مفيش شبكة خالص)
ClientException with SocketException: Failed host lookup: 'host.docker.internal' (OS Error: Temporary failure in name resolution, errno = -3)
~~~

~~~text dart run (بورت مفيش عليه سيرفر)
ClientException with SocketException: Connection refused (OS Error: Connection refused, errno = 111)
~~~

- [[Failed host lookup]]: مقدرش يحوّل اسم السيرفر لعنوان (DNS)، يعني مفيش نت.
- [[Connection refused]]: وصل للجهاز بس مفيش حد بيسمع على البورت ده.
- الاتنين [[ClientException]] (من package http)، ودي اللي تمسكها وتعرض «مفيش اتصال».

### بطيء: [[timeout]]

خليت السيرفر يستنى 15 ثانية:

~~~text dart run
TimeoutException after 0:00:10.000000: Future not completed
~~~

### الرد مش JSON

مسار بيرجّع صفحة HTML (زي nginx لما الـ backend يقع):

~~~text dart run
status 502
FormatException: Unexpected character (at character 1)
<html><body>502 Bad Gateway</body></html>
^
~~~

[[jsonDecode]] ضرب عند أول حرف [[<]]. عشان كده افحص statusCode **قبل** jsonDecode.

---

## الخلاصة

| الحالة | اللي بيحصل | تمسكه بـ |
|---|---|---|
| 200 / 201 | [[res.body]] نص JSON | [[jsonDecode]] |
| 404 / 500 | **مفيش exception**، [[statusCode]] بس | فحص بإيدك + [[ApiException]] |
| مفيش نت / السيرفر واقع | [[ClientException]] | [[on http.ClientException]] |
| بطيء | [[TimeoutException]] (لو حطيت [[.timeout]]) | [[on TimeoutException]] |
| الرد HTML | [[FormatException]] من jsonDecode | افحص الكود الأول |

- [[Uri]] و [[queryParameters]] بدل ما تبني الـ URL بإيدك.
- POST بـ JSON = [[jsonEncode]] + [[Content-Type: application/json]]، وإلا هيتبعت form.
- [[cast<...>()]] على ناتج jsonDecode، مش [[as List<...>]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

class اسمه [[Todo]] بيحوّل الـ Map اللي جاية من JSON لـ object ليه أنواع ([[fromJson]])، ويرجّعه Map تتبعت للسيرفر ([[toJson]])، ويعمل نسخة معدّلة ([[copyWith]]). اتشغّل بـ [[dart run]] في [[docker run --rm dart:stable]] (Dart 3.13.5).

---

## ١. الـ fields والـ constructor

~~~dart
class Todo {
  const Todo({required this.id, required this.title, this.done = false, this.dueAt});

  final int id;
  final String title;
  final bool done;
  final DateTime? dueAt;
~~~

- كل الـ fields [[final]]: الـ object بعد ما يتعمل مبيتغيرش (immutable). عايز تغيّر؟ اعمل نسخة (copyWith تحت).
- [[const]] قبل الـ constructor: ينفع تعمل [[const Todo(...)]] لو كل القيم ثابتة. مسموح لأن كل الـ fields final.
- [[{ }]] named parameters: [[Todo(id: 1, title: 'x')]] بالأسماء.
  - [[required this.id]] لازم تبعته.
  - [[this.done = false]] اختياري، والقيمة الافتراضية false.
  - [[this.dueAt]] اختياري ومن غير default، فبيبقى null. عشان كده نوعه [[DateTime?]].

---

## ٢. [[fromJson]]: Map → Todo

~~~dart
  factory Todo.fromJson(Map<String, dynamic> json) {
    return switch (json) {
~~~

- [[factory]] constructor مش لازم يعمل object جديد بنفسه: ممكن يرجّع object يعمله بطريقة تانية، أو **يرمي** قبل ما يعمل حاجة. ودا بالظبط اللي محتاجينه: يا Todo سليم يا exception.
- [[Todo.fromJson]] اسمه **named constructor** (اسم بعد نقطة)، فبتناديه [[Todo.fromJson(map)]].
- [[switch (json)]] switch expression على شكل الـ Map (درس «patterns بعمق»).

### الحالة السليمة

~~~dart
      {'id': int id, 'title': String title} => Todo(
          id: id,
          title: title,
~~~

الـ map pattern بيسأل: فيه id رقم صحيح؟ وفيه title نص؟ لو آه [[id]] و [[title]] بقوا متغيرات بأنواعها، ومفيش cast.

### الـ field الاختياري: [[as bool? ?? false]]

~~~dart
          done: json['completed'] as bool? ?? false,
~~~

من جوه لبرة:
1. [[json['completed']]] القيمة أو null لو المفتاح مش موجود.
2. [[as bool?]] «دي bool أو null». لو السيرفر بعت حاجة تانية (نص مثلًا) ده هيضرب، وهو كده صح: بيانات غلط.
3. [[?? false]] لو null خد false.

لاحظ: اسم السيرفر [[completed]] واسمنا [[done]]. التحويل بين الأسماء مكانه هنا بس.

### التاريخ: switch جوه switch

~~~dart
          dueAt: switch (json['due_at']) {
            String s => DateTime.parse(s),
            _ => null,
          },
        ),
~~~

- JSON مفيهوش نوع تاريخ، فالسيرفر بيبعته نص بصيغة ISO 8601 زي [[2026-10-01T09:00:00Z]].
- [[String s]] لو القيمة نص حطه في s، و [[DateTime.parse(s)]] بيحوّله DateTime.
- [[_ => null]] مش موجود أو نوعه غلط: null.

طبعت [[todos[1].dueAt]] و [[.isUtc]]:

~~~text الناتج
2026-10-01 09:00:00.000Z
true
~~~

الـ [[Z]] في الآخر معناها UTC (توقيت جرينتش). عشان تعرضه للمستخدم بتوقيته: [[dueAt!.toLocal()]]، وإلا مصر هتشوف الميعاد متأخر ساعتين أو تلاتة.

### أي شكل تاني

~~~dart
      _ => throw FormatException('Invalid todo JSON', json),
    };
  }
~~~

- [[throw]] هنا expression، فينفع جوه switch expression.
- [[FormatException(message, source)]] الـ parameter التاني الحاجة اللي فيها الغلط، مفيدة وانت بتعمل debug.

---

## ٣. [[toJson]]: Todo → Map

~~~dart
  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'completed': done,
        'due_at': ?dueAt?.toIso8601String(),
      };
~~~

- الأسماء ترجع زي السيرفر: [[completed]] و [[due_at]].
- [[dueAt?.toIso8601String()]]: لو dueAt مش null حوّله نص ISO، ولو null النتيجة null.
- [[?]] قبل القيمة في الـ Map (Dart 3.8) اسمها **null-aware element**: لو القيمة null **المفتاح نفسه** مبيتحطش.

~~~text الناتج
{"id":1,"title":"buy milk","completed":true}
~~~

ده toJson للمهمة الأولى اللي ملهاش تاريخ: مفيش [["due_at"]] خالص، مش [["due_at": null]]. والفرق ده بيفرق مع PATCH في السيرفر («متغيرش» مقابل «امسحه»).

---

## ٤. [[copyWith]]: نسخة معدّلة

~~~dart
  Todo copyWith({String? title, bool? done}) =>
      Todo(id: id, title: title ?? this.title, done: done ?? this.done, dueAt: dueAt);
}
~~~

- كل parameter اختياري ونوعه nullable. اللي مبعتهوش بيبقى null.
- [[title ?? this.title]]: لو بعت title جديد خده، وإلا خد القديم ([[this.title]] الـ field، عشان نفرّقه عن الـ parameter اللي بنفس الاسم).
- العيب: مينفعش تستخدمه تمسح قيمة (تخليها null)، لأن null معناها «سيبه زي ما هو».

---

## ٥. [[main]] والناتج

~~~dart
  const body = '[{"id":1,"title":"buy milk","completed":true},{"id":2,"title":"call mom","due_at":"2026-10-01T09:00:00Z"}]';
  final todos = (jsonDecode(body) as List).map((e) => Todo.fromJson(e as Map<String, dynamic>)).toList();
~~~

من جوه لبرة:
1. [[jsonDecode(body)]] النص → [[List<dynamic>]] فيها Maps.
2. [[as List]] عشان نقدر نعمل [[.map]].
3. [[.map((e) => ...)]] لكل عنصر [[e]]: [[e as Map<String, dynamic>]] ثم [[Todo.fromJson]].
4. [[.toList()]] الـ map بيرجّع Iterable (بيتحسب لما تقراه)، و toList بيحوّله List فعلًا.

~~~dart
  print(todos.map((t) => '$__{t.id} $__{t.title} $__{t.done} $__{t.dueAt?.day}').toList());
~~~

~~~text الناتج
[1 buy milk true null, 2 call mom false 1]
~~~

- الأولى [[completed: true]] فـ done = true، وملهاش تاريخ فـ [[dueAt?.day]] = null.
- التانية مفيهاش completed فـ done = false (الافتراضي)، و [[day]] = 1 (أول أكتوبر).

~~~dart
  final updated = todos[1].copyWith(done: true);
  print(jsonEncode(updated.toJson()));
~~~

~~~text الناتج
{"id":2,"title":"call mom","completed":true,"due_at":"2026-10-01T09:00:00.000Z"}
~~~

[[toIso8601String()]] كتب الميلي ثانية [[.000]]، فالنص مش نفس اللي جه بالظبط، بس نفس اللحظة.

~~~dart
  try {
    Todo.fromJson({'id': '3', 'title': 'x'});
  } on FormatException catch (e) {
    print(e.message);
  }
~~~

~~~text الناتج
Invalid todo JSON
~~~

[[id]] نص [['3']] مش int، فالـ pattern مطابقش ووقع في [[_]]. و [[on FormatException catch (e)]] بيمسك النوع ده بس، و [[e.message]] الرسالة من غير اسم النوع.

---

## ٦. «جرّب»: [[tags]] و round-trip

~~~dart
// في fromJson (جوه Todo(...)):
tags: (json['tags'] as List?)?.cast<String>() ?? const [],

// في toJson:
'tags': tags,
~~~

- [[as List?]] لستة من أي نوع أو null، ثم [[?.cast<String>()]] (مش [[as List<String>]] اللي بيضرب على بيانات jsonDecode)، و [[?? const []]] لو مش موجودة لستة فاضية.

شغّلت الـ class بالـ tags:

~~~text الناتج
[home] x false
[]
~~~

- [[Todo.fromJson(t.toJson())]] رجّع نفس القيم: [[[home]]] و [[x]].
- بس [[t == back]] = **false**: الـ class العادي بيقارن بالمرجع (هل دول نفس الـ object في الذاكرة؟)، والاتنين objects مختلفين. عشان مقارنة بالقيم لازم override لـ [[==]] و [[hashCode]]، أو freezed (الدرس الجاي).
- السطر التاني: Todo من غير tags طلع [[[]]] مش null.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| fields [[final]] | الموديل immutable |
| [[factory Todo.fromJson]] | يرجّع object سليم أو يرمي |
| map pattern | يفحص المفاتيح والأنواع مرة واحدة |
| [[as bool? ?? false]] | field اختياري بقيمة افتراضية |
| [[DateTime.parse]] / [[toIso8601String()]] | التاريخ نص ISO في JSON، و [[toLocal()]] للعرض |
| [['key': ?value]] | المفتاح يتحط لو القيمة مش null |
| [[copyWith]] | نسخة معدّلة، بس مبيعرفش يحط null |
| [[==]] | بالمرجع، إلا لو عملت override |`,
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
          teach: R`## الكود بيعمل إيه؟

نفس موديل [[Todo]] بتاع الدرس اللي فات، بس انت بتكتب الـ fields بس، وأداة اسمها [[build_runner]] بتولّد الباقي: fromJson و toJson و copyWith و [[==]] و hashCode و toString. اتجرّب في مشروع Flutter 3.44 جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] بالأمر اللي في أول المثال، و pub نزّل: [[freezed 4.0.0-dev.3]] و [[freezed_annotation 3.1.0]] و [[json_serializable 6.14.1]] و [[json_annotation 4.12.0]] و [[build_runner 2.15.1]]. وبعد التوليد اختبرته بـ [[flutter test]].

---

## ١. التسطيب

~~~bash
flutter pub add json_annotation freezed_annotation dev:build_runner dev:json_serializable dev:freezed
~~~

| الـ package | نوعه | بيعمل إيه |
|---|---|---|
| [[json_annotation]] | عادي | الـ annotations زي [[@JsonKey]] |
| [[freezed_annotation]] | عادي | [[@freezed]] و [[@Default]] |
| [[build_runner]] | [[dev:]] | الأداة اللي بتشغّل المولّدات |
| [[json_serializable]] | [[dev:]] | مولّد fromJson و toJson |
| [[freezed]] | [[dev:]] | مولّد copyWith و == و toString |

[[dev:]] معناها dev_dependency: محتاجها وانت بتطوّر بس، ومبتدخلش في التطبيق اللي بيتبني. الـ annotations لازم تبقى عادية لأن الكود بتاعك بيعمل لها import.

---

## ٢. الـ import والـ parts

~~~dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'todo.freezed.dart';
part 'todo.g.dart';
~~~

- [[freezed_annotation]] بيعمل re-export لـ json_annotation، فـ import واحد كفاية لـ [[@JsonKey]] كمان.
- [[part 'x.dart';]] معناها «الملف ده حتة من الملف بتاعي»: نفس الـ library، فيشوف الحاجات الـ private (اللي بتبدأ بـ [[_]]) والعكس. الملفين دول **مش موجودين لسه**، build_runner هيعملهم.
- اسم الـ part لازم يطابق اسم ملفك: [[todo.dart]] → [[todo.freezed.dart]] و [[todo.g.dart]].

---

## ٣. تعريف الموديل

~~~dart
@freezed
abstract class Todo with _$Todo {
~~~

- [[@freezed]] annotation (علامة) بتقول لـ freezed «ولّد للـ class ده».
- [[abstract class]]: الـ class ده مجرد تعريف، والـ class الحقيقي هيتولّد. جربت أشيل [[abstract]]:

~~~text flutter analyze
error • Missing concrete implementations of '_$Todo.toJson', 'getter _$Todo.done', 'getter _$Todo.dueAt', 'getter _$Todo.id', and 1 more. Try implementing the missing methods, or make the class abstract • non_abstract_class_inherits_abstract_member
~~~

- [[with _$Todo]] **mixin** متولّد في todo.freezed.dart، فيه الـ getters و copyWith و == و toString. [[$]] جزء عادي من الاسم.

~~~dart
  const factory Todo({
    required int id,
    required String title,
    @JsonKey(name: 'completed') @Default(false) bool done,
    @JsonKey(name: 'due_at') DateTime? dueAt,
  }) = _Todo;
~~~

- الـ parameters دي **هي** تعريف الـ fields.
- [[@JsonKey(name: 'completed')]] اسمه في JSON مختلف عن اسمه في Dart.
- [[@Default(false)]] قيمة افتراضية في الـ constructor وفي fromJson لو المفتاح مش موجود.
- [[= _Todo;]] اسمه **redirecting constructor**: [[Todo(...)]] بيعمل في الحقيقة object من [[_Todo]]، الـ class المتولّد.

~~~dart
  factory Todo.fromJson(Map<String, dynamic> json) => _$TodoFromJson(json);
}
~~~

fromJson بتنادي دالة هتتولّد في todo.g.dart. و toJson مش محتاج تكتبه: freezed بيضيفه لوحده لما يلاقي fromJson.

---

## ٤. التوليد

~~~bash
dart run build_runner build
~~~

~~~text الناتج (آخر سطر)
Built with build_runner/aot in 45s; wrote 3 outputs.
~~~

- [[build]] يولّد مرة ويخرج. أول مرة بطيئة (45 ثانية هنا) لأنه بيحلل المشروع كله، والمرات اللي بعدها ثانية.
- [[watch]] بيفضل شغال ويولّد تاني مع كل حفظ. سيبه في ترمنال لوحده وانت شغال.

### اللي اتولّد في [[todo.g.dart]] (٢٣ سطر)

~~~dart
_Todo _$TodoFromJson(Map<String, dynamic> json) => _Todo(
  id: (json['id'] as num).toInt(),
  title: json['title'] as String,
  done: json['completed'] as bool? ?? false,
  dueAt: json['due_at'] == null
      ? null
      : DateTime.parse(json['due_at'] as String),
);

Map<String, dynamic> _$TodoToJson(_Todo instance) => <String, dynamic>{
  'id': instance.id,
  'title': instance.title,
  'completed': instance.done,
  'due_at': instance.dueAt?.toIso8601String(),
};
~~~

تقريبًا نفس اللي كتبناه بإيدنا في الدرس اللي فات، بـ ٣ فروق:
- [[(json['id'] as num).toInt()]]: بيقبل [[30]] و [[30.0]] الاتنين.
- بيستخدم [[as]] مش patterns، فالنوع الغلط بيرمي [[TypeError]] (تحت).
- و [['due_at']] بيتكتب حتى لو null (عكس [[?dueAt]] بتاعنا).

و [[todo.freezed.dart]] (٢٨٧ سطر) فيه [[mixin _$Todo]] و [[class _Todo implements Todo]] و [[copyWith]] و [[operator ==]] و [[hashCode]] (بـ [[Object.hash(runtimeType,id,title,done,dueAt)]]) و [[toString]]. أول سطر فيهم: [[// GENERATED CODE - DO NOT MODIFY BY HAND]]، يعني أي تعديل بإيدك هيتمسح في أول build.

---

## ٥. «جرّب»: اللي اتجرّب

~~~dart
print(Todo(id: 1, title: 'a') == Todo(id: 1, title: 'a'));
final t = Todo.fromJson({'id': 2, 'title': 'call mom', 'due_at': '2026-10-01T09:00:00Z'});
print(t);
print(t.copyWith(dueAt: null));
print(t.toJson());
print(Todo.fromJson({'id': 1, 'title': 'x'}).done);
~~~

~~~text flutter test
true
Todo(id: 2, title: call mom, done: false, dueAt: 2026-10-01 09:00:00.000Z)
Todo(id: 2, title: call mom, done: false, dueAt: null)
{id: 2, title: call mom, completed: false, due_at: 2026-10-01T09:00:00.000Z}
false
~~~

| السطر | ليه |
|---|---|
| [[true]] | [[==]] المتولّد بيقارن القيم، عكس الـ class العادي اللي طلّع false في الدرس اللي فات |
| [[Todo(id: 2, ...)]] | toString المتولّد بيكتب كل الـ fields |
| [[dueAt: null]] | [[copyWith(dueAt: null)]] **مسح** التاريخ فعلًا. freezed بيفرّق بين «مبعتش dueAt» و«بعته null»، والـ copyWith اليدوي مبيعرفش |
| [[completed]] و [[due_at]] | toJson بأسماء السيرفر |
| [[false]] | completed مش موجود فـ [[@Default(false)]] اشتغل |

### id نص

~~~dart
Todo.fromJson({'id': '3', 'title': 'x'});
~~~

~~~text flutter test
_TypeError: type 'String' is not a subtype of type 'num' in type cast
~~~

من [[json['id'] as num]] في الكود المتولّد. ده **TypeError مش FormatException**، فلو بتمسك [[on FormatException]] بس هيفوتك. امسكه عند حدود الـ API وحوّله لرسالة واضحة.

### نسيت تشغّل build_runner

ضفت [[@Default([]) List<String> tags,]] للموديل من غير ما أولّد تاني، واستخدمت [[todo.tags]]:

~~~text flutter analyze
error • The redirected constructor '_Todo Function({bool done, DateTime? dueAt, required int id, required String title})' has incompatible parameters with 'Todo Function({bool done, DateTime? dueAt, required int id, List<String> tags, required String title})' • redirect_to_invalid_function_type
error • The getter 'tags' isn't defined for the type 'Todo' • undefined_getter
~~~

[[_Todo]] القديم مفيهوش tags. [[dart run build_runner build]] تاني وبيتحل.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[part 'todo.freezed.dart';]] | الملف المتولّد جزء من ملفك، والاسم لازم يطابق |
| [[@freezed abstract class Todo with _$Todo]] | التعريف، و abstract لازم |
| [[const factory Todo({...}) = _Todo;]] | الـ fields، والـ class الحقيقي متولّد |
| [[@JsonKey(name:)]] / [[@Default()]] | اسم JSON مختلف / قيمة افتراضية |
| [[dart run build_runner build]] / [[watch]] | ولّد مرة / ولّد مع كل حفظ |

- أي تعديل في الـ fields = شغّل build_runner تاني.
- متعدّلش في [[.g.dart]] و [[.freezed.dart]] بإيدك.
- النوع الغلط في fromJson المتولّد بيرمي [[TypeError]] مش [[FormatException]].`,
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
            onPressed: () => setState(() { _future = fetchNames(); }),
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

والـ retry: [[setState(() { _future = fetchNames(); })]] بيحط future جديد فـ FutureBuilder يبدأ من الأول. والأقواس [[{ }]] مهمة: [[setState(() => _future = fetchNames())]] بالسهم بترجّع الـ Future نفسه (قيمة الـ assignment)، و Flutter في debug بيرمي [[setState() callback argument returned a Future]].

initState مينفعش تبقى async (درس initState و dispose)، ودا بالظبط ليه FutureBuilder موجود: بتبدأ العملية في initState وتسيب الـ widget يعرض الحالة.

الحدود: مفيش cache (الشاشة تتقفل وتتفتح = طلب جديد)، ومفيش refresh من شاشة تانية، ومفيش مشاركة للبيانات بين شاشتين. لما تحتاج أي حاجة من دول، Riverpod و AsyncNotifier (درس AsyncNotifier) بيحلّوها.`,
            when: "شاشة بسيطة بتحمّل حاجة مرة لما تفتح ومحدش تاني محتاجها: تفاصيل صفحة، أو إعدادات من السيرفر. ولأي حاجة أكبر: state management.",
            mistakes: R`[[future: api.fetch()]] جوه build (أشهر غلطة في Flutter). و [[snapshot.data!]] قبل ما تتأكد من الحالة فيضرب وهو لسه بيحمّل. ومتعرضش حالة الخطأ خالص فالـ loader يلف للأبد أو الشاشة تفضى. وتنسى حالة «فاضي»: اللستة رجعت [] فالشاشة بيضا والمستخدم فاكر إنها لسه بتحمّل.`
          },
          teach: R`## الكود بيعمل إيه؟

شاشة بتطلب لستة أسماء أول ما تفتح، وبتعرض واحدة من ٤ حالات: بيحمّل (دايرة بتلف)، أو خطأ بزرار retry، أو «مفيش أسماء»، أو اللستة. اتجرّب في Flutter 3.44 جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]: [[flutter analyze]] نضيف، و widget tests بتعدّ كام مرة fetchNames اتنادت، وبتستخدم [[tester.pump(const Duration(seconds: 1))]] عشان تقدّم الوقت ثانية من غير ما تستنى بجد.

---

## ١. الطلب الوهمي

~~~dart
Future<List<String>> fetchNames() async {
  await Future.delayed(const Duration(seconds: 1));
  return ['Ali', 'Sara'];
}
~~~

[[async]] دالة نتيجتها هتيجي بعدين، فنوعها [[Future<List<String>>]]. بتستنى ثانية (زي الشبكة) وترجّع اسمين. مكانها في تطبيق حقيقي [[http.get]] (درس http).

---

## ٢. الـ Future بيتعمل مرة واحدة

~~~dart
class NamesScreen extends StatefulWidget {
  const NamesScreen({super.key});
  @override
  State<NamesScreen> createState() => _NamesScreenState();
}

class _NamesScreenState extends State<NamesScreen> {
  late Future<List<String>> _future = fetchNames();
~~~

- [[StatefulWidget]] عشان نخزّن الـ Future في الـ State، وهو بيعيش طول ما الشاشة مفتوحة.
- [[late]] مع قيمة أولية = **lazy**: [[fetchNames()]] مبتتنادىش وقت إنشاء الـ State، بتتنادى **أول مرة حد يقرا [[_future]]** (أول build)، ومرة واحدة بس. وفي الحالتين (بـ late أو من غيره) الطلب بيتبعت مرة واحدة لكل State، و late بس بتأخّره لحد ما يتقري. لكن لو الطلب محتاج حاجة من [[widget]] (زي [[widget.id]]) لازم late أو initState، لأن الـ field العادي مينفعش يقرا [[widget]] وقت إنشاءه.

### اتجرّب: field مقابل جوه build

حطيت زرار بيعمل [[setState(() {})]] (rebuild من غير أي تغيير) ودوسته ٥ مرات:

~~~text flutter test
5 rebuilds fetches=1 loading=false
~~~

الطلب اتبعت **مرة واحدة**، والأسماء فضلت ظاهرة. وبعدين غيّرت [[future: _future]] لـ [[future: fetchNames()]] (جوه build مباشرة):

~~~text flutter test
in build: 5 rebuilds fetches=6 loading=true
~~~

٦ طلبات (واحد أول ما فتحت + واحد مع كل rebuild)، والشاشة رجعت للـ loader. كل build بيعمل Future **جديد**، و FutureBuilder لما يلاقي future مختلف بيبدأ من الأول. وفي تطبيق حقيقي build بتتنادى كتير: setState في الأب، والكيبورد يفتح، والثيم يتغير.

---

## ٣. [[FutureBuilder]]

~~~dart
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<String>>(
      future: _future,
      builder: (context, snapshot) {
~~~

- [[FutureBuilder<List<String>>]] نوع النتيجة بين [[< >]]، فـ [[snapshot.data]] نوعها [[List<String>?]].
- [[future:]] الـ Future اللي بيتابعه.
- [[builder:]] بيتنادى أول مرة، وتاني كل ما حالة الـ Future تتغير.
- [[snapshot]] (لقطة) = حالة الـ Future دلوقتي: [[connectionState]] و [[data]] و [[error]].

### الحالة ١: بيحمّل

~~~dart
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
~~~

| [[connectionState]] | معناها |
|---|---|
| [[none]] | مفيش future أصلًا |
| [[waiting]] | شغال |
| [[done]] | خلص (بنتيجة أو بخطأ) |
| [[active]] | للـ Streams بس (StreamBuilder) |

أي حاجة غير done: دايرة بتلف ([[CircularProgressIndicator]]) في النص ([[Center]]).

~~~text flutter test
t=0 loading=true
t=1s names=2 loading=false
~~~

### الحالة ٢: خطأ

~~~dart
        if (snapshot.hasError) {
          return TextButton(
            onPressed: () => setState(() { _future = fetchNames(); }),
            child: Text('Error: $__{snapshot.error}. Tap to retry'),
          );
        }
~~~

- [[hasError]] الـ Future خلص بـ exception، و [[snapshot.error]] هو الـ exception نفسه.
- الـ retry: [[_future = fetchNames()]] بيحط Future **جديد**، و setState بيعيد البناء، فـ FutureBuilder يشوف future مختلف ويبدأ من الأول.

خليت fetchNames ترمي [[Exception('offline')]]:

~~~text flutter test
error texts: [rebuild, Error: Exception: offline. Tap to retry]
retry: fetches=2 loading=true
after retry ok: Ali=1
~~~

[[Exception: offline]] ده toString بتاع [[Exception('offline')]]. دوست retry: طلب تاني والـ loader رجع، ولما رجّعت الدالة سليمة الأسماء ظهرت.

### ليه [[{ }]] مش [[=>]] جوه setState؟

المثال كان مكتوب [[setState(() => _future = fetchNames())]]. لما دوست retry في الاختبار:

~~~text flutter test
The following assertion was thrown while handling a gesture:
setState() callback argument returned a Future.
The setState() method on _NamesScreenState#6aaeb was called with a closure or method that returned a
Future. Maybe it is marked as "async".
~~~

- السهم [[=>]] معناه «رجّع القيمة دي». والـ assignment في Dart ليه قيمة: [[_future = fetchNames()]] قيمته الـ Future نفسه. فالـ closure رجّع Future.
- Flutter بيرفض ده في debug عشان يحميك من [[setState(() async {...})]] (شغل async جوه setState). و [[flutter analyze]] مقالش حاجة، الغلطة بتظهر بس لما تدوس.
- بالأقواس [[{ _future = fetchNames(); }]] الـ closure مبيرجّعش حاجة. اتصلّح في المثال.

### الحالة ٣ و ٤: فاضي أو بيانات

~~~dart
        final names = snapshot.data!;
        if (names.isEmpty) return const Center(child: Text('No names yet'));
        return ListView(children: [for (final n in names) ListTile(title: Text(n))]);
      },
    );
  }
}
~~~

- [[snapshot.data!]]: هنا متأكدين إن فيه data (خلص ومفيش error)، فالـ [[!]] آمنة. لو حطيتها قبل فحص الحالة هتضرب وهو لسه بيحمّل.
- [[isEmpty]]: الطلب نجح بس اللستة فاضية. من غير الحالة دي الشاشة تبقى بيضا والمستخدم يفتكرها لسه بتحمّل. خليت fetchNames ترجّع [[[]]]:

~~~text flutter test
empty: 1
~~~

- [[ListView(children: [for ...])]] هنا مقبول لأن اللستة صغيرة (درس ListView.builder للستات الكبيرة).

---

## الخلاصة

| الحالة | الشرط | العرض |
|---|---|---|
| بيحمّل | [[connectionState != done]] | [[CircularProgressIndicator]] |
| خطأ | [[hasError]] | الرسالة + retry |
| فاضي | [[data!.isEmpty]] | «No names yet» |
| بيانات | الباقي | اللستة |

- الـ Future في field ([[late ... = fetchNames()]] أو initState)، **مش** [[future: fetchNames()]] جوه build.
- الـ retry = Future جديد جوه [[setState(() { ... })]] بأقواس، و [[setState(() {})]] الفاضية مش بتعمل حاجة لأن الـ future هو هو.
- الترتيب: connectionState الأول، وبعدين error، وبعدين data.`,
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
