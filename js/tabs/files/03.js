// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "JSON بالتفصيل",
      l: 1,
      n: "أهم صيغة داتا هتقابلها: كل رمز فيها، والـ ٦ أنواع، والأخطاء اللي بتوقّع الملف، وإزاي تفحصه وتدوّر فيه بـ jq، و JSON.parse، وأخواته jsonc و jsonl",
      items: [
        {
          cmd: ".json",
          title: "ملف JSON بيتكتب إزاي، وكل رمز فيه ({} و [] و : و , و \"\") معناه إيه؟",
          desc: R`JSON (اختصار JavaScript Object Notation، وبتتنطق «جيسون») صيغة نصية لكتابة البيانات. هي اللغة اللي أي API بيرد بيها، وكمان [[package.json]] وملفات إعدادات كتير وداتا الموبايل والويب. شكلها شبه الـ object في JavaScript، بس قواعدها أشد بكتير.

الرموز (وده كل اللي في JSON):
• [[{ }]] object: مجموعة أزواج «مفتاح: قيمة». زي بطاقة بيانات شخص.
• [[[ ]]] array: ليستة قيم بالترتيب. زي ليستة طلبات.
• [[:]] بين المفتاح وقيمته.
• [[,]] بين كل عنصر والتاني، ومينفعش بعد آخر عنصر.
• [["..."]] علامات تنصيص مزدوجة بس، حوالين كل مفتاح وكل نص. الـ [[']] ممنوعة.
• [[\]] جوه النص للحروف الخاصة: [[\"]] علامة تنصيص، و [[\\]] backslash، و [[\n]] سطر جديد، و [[\t]] tab، و [[\u0633]] أي حرف برقمه في Unicode (ده حرف «س») (ده «س»).

القيم ليها ٦ أنواع بس:
• string: [["سارة"]] بين [["]].
• number: [[42]] و [[-3]] و [[1250.5]] و [[1.5e3]]. من غير تنصيص، ومن غير [[0]] في الأول ([[0123]] ممنوعة)، ومفيش [[NaN]] ولا [[Infinity]].
• boolean: [[true]] أو [[false]] بحروف صغيرة.
• null: [[null]] يعني «مفيش قيمة».
• object: [[{...}]] جواه أزواج تانية.
• array: [[[...]]] جواها أي نوع، حتى objects.
مفيش [[undefined]] ولا تاريخ ولا دوال ولا تعليقات. التاريخ بيتكتب string بصيغة ISO: [["2026-10-01T09:00:00Z"]].

قواعد تانية:
• الملف كله قيمة واحدة: غالبًا object واحد [[{}]] أو array واحدة.
• المسافات والسطور الجديدة بره النصوص ملهاش أي معنى، فالـ JSON ممكن يتكتب في سطر واحد (minified) أو منسق بمسافتين.
• الأرقام اللي في أولها صفر أو طويلة جدًا (رقم تليفون، رقم بطاقة، رقم بريدي) اكتبها string، زي [["zip": "11511"]].
• الترميز لازم UTF-8.

بتعمله إزاي: في VS Code اعمل ملف [[.json]]، وهو هيلوّن ويحط خط أحمر تحت أي غلط، و [[Shift+Alt+F]] بيرتّبه (على الماك [[Shift+Option+F]]). وبتفحصه بـ [[jq]] (الدرس الجاي) أو [[python3 -m json.tool file.json]].`,
          example: R`{
  "id": 42,
  "name": "سارة أحمد",
  "email": "sara@example.com",
  "active": true,
  "balance": 1250.5,
  "manager": null,
  "roles": ["admin", "editor"],
  "address": {
    "city": "القاهرة",
    "zip": "11511"
  },
  "orders": [
    { "id": 1, "total": 300 },
    { "id": 2, "total": 950.75 }
  ]
}`,
          flag: "script",
          try: R`اعمل [[user.json]] في [[lab/files]] واكتبه بإيدك (متنسخش، عشان تتعود على الرموز). بعدين نفّذ [[python3 -m json.tool user.json]] وبعدها [[node -e 'const u = require("./user.json"); console.log(u.orders[1].total, u.address.city)']]. بعدين بوّظه بإيدك: شيل [[,]] بعد [["active": true]] وشوف VS Code والأمر بيقولوا إيه، ورجّعها.`,
          deep: {
            why: R`أي برنامجين بلغتين مختلفتين (سيرفر Python وموبايل Kotlin ومتصفح JavaScript) محتاجين يتبادلوا داتا بصيغة الكل يفهمها. XML كان الحل زمان بس كان طويل ومعقد. JSON جه أبسط بكتير: ٦ أنواع بس، ومحدش يختلف على معناها، وكل لغة فيها مكتبة جاهزة تقراه في سطر.`,
            how: R`الـ parser بيقرا حرف حرف: [[{]] يبقى «هبدأ object»، بعدها لازم [["]] مفتاح، بعدها [[:]]، بعدها قيمة، بعدها [[,]] (فيه كمان) أو [[}]] (خلص). أي حرف في غير مكانه بيوقف القراية كلها بغلط فيه رقم السطر والعمود. ولما الـ JSON يتقري بيتحول لنوع اللغة: في JavaScript object و array، وفي Python [[dict]] و [[list]] و [[True]] و [[None]].`,
            when: R`داتا رايحة أو جاية من API، وملفات إعدادات بسيطة ([[package.json]] و [[composer.json]] و [[appsettings.json]])، وتخزين داتا صغيرة. أما ملف إعدادات كبير الناس بتعدله بإيدها وعايز تعليقات، فـ YAML أو TOML أريح (درس المقارنة في المستوى ٣).`,
            mistakes: R`تكتب JSON كأنه JavaScript: [[']] بدل [["]]، أو مفتاح من غير تنصيص، أو [[,]] بعد آخر عنصر، أو تعليق [[//]] (الدرس الجاي كله عن الأخطاء دي). وتكتب [["true"]] بين تنصيص وانت قصدك boolean، فـ [[if (user.active === true)]] يبقى false. وتحط رقم تليفون [[01012345678]] من غير تنصيص فيبوظ بسبب الصفر.`
          },
          teach: R`## الفكرة

المثال ملف [[user.json]] واحد فيه الـ ٦ أنواع اللي JSON يعرفها كلهم، و object جوه object، و array من objects. هنمشي عليه سطر سطر، وبعدين نقراه بـ ٣ أدوات ونشوف كل نوع اتحوّل لإيه. Python و [[jq]] اتشغّلوا على أوبونتو 24.04 جوه Docker، و Node 24 و PowerShell 7.6 و 5.1 على ويندوز.

---

## ١. الهيكل من بره

~~~text الشكل العام
{                     ← بداية object (الملف كله قيمة واحدة)
  "مفتاح": قيمة,      ← زوج، وبعده , لأن فيه زوج كمان
  "مفتاح": قيمة       ← آخر زوج: من غير ,
}                     ← نهاية الـ object
~~~

كل زوج: مفتاح بين [["]]، وبعده [[:]]، وبعده القيمة. والـ [[,]] **بين** الأزواج، مش بعد كل واحد.

## ٢. القيم البسيطة (سطر ٢ لـ ٧)

| السطر | النوع | ليه مكتوب كده |
|---|---|---|
| [["id": 42,]] | number | رقم صحيح من غير تنصيص |
| [["name": "سارة أحمد",]] | string | أي نص بين [["]]، والعربي عادي لأن الملف UTF-8 |
| [["email": "sara@example.com",]] | string | الـ [[@]] والـ [[.]] جوه النص ملهمش أي معنى خاص |
| [["active": true,]] | boolean | [[true]] بحروف صغيرة ومن غير تنصيص. [["true"]] بتنصيص هتبقى string |
| [["balance": 1250.5,]] | number | الكسر بنقطة. ومفيش فرق في JSON بين صحيح وعشري، الاتنين number |
| [["manager": null,]] | null | «المفتاح موجود وقيمته فاضية» |

> [[null]] غير إن المفتاح مش موجود. جرّبنا في Node: [[typeof u.manager]] طلع [[object]] (أيوه، ده غريب بس كده JavaScript بيقول على [[null]])، و [["manager" in u]] طلع [[true]]. أما [[u.nothing]] (مفتاح مش موجود) فطلع [[undefined]].

## ٣. الـ array: [["roles": ["admin", "editor"],]]

[[[ ]]] = ليستة بالترتيب، والعناصر بينها [[,]]. العد بيبدأ من صفر: [[roles[0]]] = [["admin"]]، و [[roles[1]]] = [["editor"]]. وعددهم ([[length]]) = 2.

## ٤. object جوه object (سطر ٩ لـ ١٢)

~~~text المثال
  "address": {
    "city": "القاهرة",
    "zip": "11511"
  },
~~~

- قيمة [["address"]] نفسها object، فبيفتح [[{]] جديدة. ده اسمه nested.
- [["zip": "11511"]] string مش number عن قصد: الرقم البريدي مش حاجة بتجمعها أو تطرحها، ولو بدأ بصفر الصفر هيضيع لو اتكتب رقم.
- [["zip"]] آخر زوج جوه [[address]]، فمفيش [[,]] بعده.
- [[},]]: [[}]] بتقفل [[address]]، و [[,]] لأن [["orders"]] لسه جاي في الـ object الكبير.

والمسافات في أول السطور (التنسيق) ملهاش أي معنى عند الـ parser. هي للعين بس.

## ٥. array من objects (سطر ١٣ لـ ١٦)

~~~text المثال
  "orders": [
    { "id": 1, "total": 300 },
    { "id": 2, "total": 950.75 }
  ]
~~~

ده أشهر شكل في أي API: ليستة حاجات، كل حاجة object بنفس المفاتيح. كل object هنا مكتوب في سطر واحد، وده عادي جدًا لأن السطور الجديدة ملهاش معنى. وآخر object من غير [[,]]، و [[]]] بتقفل الـ array من غير [[,]] لأنها آخر حاجة، و [[}]] الأخيرة بتقفل الملف.

ولاحظ إن [["id"]] موجود مرتين: مرة في الـ object الكبير ومرة جوه كل طلب. ده مسموح لأن كل object ليه مفاتيحه. الممنوع (أو اللي بيبوّظ) هو مفتاح متكرر جوه **نفس** الـ object.

---

## ٦. نقراه: [[python3 -m json.tool user.json]]

- [[python3]] = Python، و [[-m json.tool]] = شغّل الموديول [[json.tool]] اللي جاي مع Python كبرنامج. بيقرا الملف، ولو سليم يطبعه منسق.

~~~text الناتج (أول ٧ سطور)
{
    "id": 42,
    "name": "\u0633\u0627\u0631\u0629 \u0623\u062d\u0645\u062f",
    "email": "sara@example.com",
    "active": true,
    "balance": 1250.5,
    "manager": null,
~~~

حاجتين:

- التنسيق بـ ٤ مسافات (ده الافتراضي بتاعه).
- العربي اتكتب [[\u0633\u0627...]]: ده نفس الحروف، بس مكتوبة بأرقامها في Unicode ([[\u0633]] = س). JSON بيسمح بالشكلين، و Python بيستخدم ده افتراضيًا عشان الناتج يبقى ASCII بس. ضيف [[--no-ensure-ascii]] وهيطبع [["سارة أحمد"]] عادي.

## ٧. نقراه من JavaScript (سطر «جرّب»)

~~~bash
node -e 'const u = require("./user.json"); console.log(u.orders[1].total, u.address.city)'
~~~

- [[node -e '...']] شغّل الكود اللي بين [[']] على طول من غير ملف.
- [[require("./user.json")]] في Node بيقرا الملف ويعمله parse لوحده، فـ [[u]] بقى object عادي.
- [[u.orders[1].total]] = جوه [[orders]] خد العنصر رقم 1 (التاني) وهات [[total]] بتاعه.
- [[u.address.city]] = جوه [[address]] هات [[city]].

~~~text الناتج (Node 24)
950.75 القاهرة
~~~

## ٨. وفي PowerShell: [[ConvertFrom-Json]]

~~~powershell
$u = Get-Content user.json -Raw -Encoding UTF8 | ConvertFrom-Json
$u.orders[1].total
$u.roles[0]
~~~

- [[-Raw]] اقرا الملف كنص واحد (من غيرها [[Get-Content]] بيرجّع ليستة سطور).
- [[-Encoding UTF8]] عشان Windows PowerShell 5.1 يقرا العربي صح.
- [[ConvertFrom-Json]] بيحوّل النص لـ object، و [[$u]] متغير شايله.

الناتج [[950.75]] و [[admin]] في النسختين. بس كل نسخة حوّلت الأرقام لنوع مختلف ([[.GetType().Name]]):

| القيمة في JSON | PowerShell 7.6 | Windows PowerShell 5.1 |
|---|---|---|
| [[42]] | [[Int64]] | [[Int32]] |
| [[1250.5]] | [[Double]] | [[Decimal]] |
| [[true]] | [[Boolean]] | [[Boolean]] |

وده بيوريك إن JSON نفسه عنده «number» بس، وكل لغة (وكل نسخة) بتقرر تحطه في أنهي نوع.

| JSON | JavaScript | Python | PowerShell |
|---|---|---|---|
| [[{ }]] object | object | [[dict]] | [[PSCustomObject]] |
| [[[ ]]] array | Array | [[list]] | Array |
| string | string | [[str]] | [[String]] |
| number | number | [[int]] أو [[float]] | [[Int64]] أو [[Double]] (في 7) |
| [[true]] / [[false]] | [[true]] / [[false]] | [[True]] / [[False]] | [[$true]] / [[$false]] |
| [[null]] | [[null]] | [[None]] | [[$null]] |

---

## ٩. نبوّظه عن قصد (تجربة «جرّب»)

شيلنا الـ [[,]] بعد [["active": true]]:

~~~text python3 -m json.tool
Expecting ',' delimiter: line 6 column 3 (char 87)
~~~

~~~text jq . (jq 1.7)
jq: parse error: Expected separator between values at line 6, column 11
~~~

الغلط في سطر ٥، والاتنين قالوا سطر ٦: الـ parser مكتشفش إن فيه [[,]] ناقصة غير لما لقى [["balance"]] في السطر اللي بعده. و [[char 87]] = الحرف رقم 87 من أول الملف (العد من صفر).

## الخلاصة

| الرمز | معناه |
|---|---|
| [[{ }]] | object: أزواج مفتاح وقيمة |
| [[[ ]]] | array: قيم بالترتيب، العد من 0 |
| [[:]] | بين المفتاح وقيمته |
| [[,]] | بين العناصر، ومش بعد آخر واحد |
| [["..."]] | كل مفتاح وكل string، والمزدوجة بس |

والأنواع ٦: string و number و boolean و null و object و array. ولما رسالة الغلط تقول سطر، بص على السطر اللي **قبله** كمان.`,
          lines: [
            R`[[{]] بداية الـ object الأساسي، والملف كله جواه.`,
            R`مفتاح [["id"]] بين [["]]، و [[:]]، وقيمته number من غير تنصيص، و [[,]] لأن فيه عناصر بعده.`,
            R`string: أي نص بين [["]]، والعربي عادي لأن الملف UTF-8.`,
            R`string تاني.`,
            R`boolean: [[true]] بحروف صغيرة ومن غير تنصيص.`,
            R`number بكسور: النقطة بس، مفيش فاصلة.`,
            R`[[null]]: مفيش مدير. ده غير إن المفتاح مش موجود.`,
            R`array من strings بين [[[ ]]] ومفصولة بـ [[,]].`,
            R`المفتاح ده قيمته object تاني جواه (nested).`,
            R`أول مفتاح جوه الـ object الداخلي.`,
            R`الرقم البريدي string عشان ميتحسبش رقم، ومفيش [[,]] لأنه آخر عنصر.`,
            R`[[}]] بتقفل الـ address، وبعدها [[,]] لأن [["orders"]] لسه جاي.`,
            R`array من objects: أشهر شكل في أي API (ليستة حاجات).`,
            R`أول object في الـ array، مكتوب في سطر واحد.`,
            R`آخر عنصر في الـ array: من غير [[,]] بعده.`,
            R`[[]]] بتقفل الـ array، ومفيش [[,]] لأنها آخر مفتاح.`,
            R`[[}]] بتقفل الـ object الأساسي، وده آخر حرف في الملف.`
          ],
          sol: R`[[python3 -m json.tool user.json]] بيطبع نفس الملف منسق بـ ٤ مسافات، والعربي بيظهر كده [["\u0633\u0627\u0631\u0629 \u0623\u062d\u0645\u062f"]] (ضيف [[--no-ensure-ascii]] عشان يظهر عربي). وأمر node بيطبع:
[[950.75 القاهرة]]

لما تشيل الـ [[,]] بعد [["active": true]]: VS Code بيحط خط أحمر ويقول [[Expected comma]]، و [[python3 -m json.tool]] بيقول:
[[Expecting ',' delimiter: line 6 column 3 (char 87)]]
لاحظ إنه بيشاور على السطر اللي بعد الغلط، لأنه مكتشفش إن فيه حاجة ناقصة غير لما لقى [["balance"]].`,
          check: {
            lang: "js",
            starter: R`// النص ده جاي من API. اقراه ورجّع ملخص
function summary(jsonText) {
  // رجّع { name, city, ordersTotal }
  // ordersTotal مجموع total في كل الطلبات
}`,
            tests: R`const text = '{"id":42,"name":"سارة أحمد","active":true,"address":{"city":"القاهرة","zip":"11511"},"orders":[{"id":1,"total":300},{"id":2,"total":950.75}]}';
test("بيرجّع الاسم والمدينة ومجموع الطلبات", () => expect(summary(text)).toEqual({ name: "سارة أحمد", city: "القاهرة", ordersTotal: 1250.75 }));
test("يوزر من غير طلبات ← ordersTotal صفر", () => expect(summary('{"name":"Ali","address":{"city":"Giza"},"orders":[]}')).toEqual({ name: "Ali", city: "Giza", ordersTotal: 0 }));
test("النص لازم يتقري بـ JSON.parse مش يتعامل كـ string", () => expect(typeof summary(text).ordersTotal).toBe("number"));`,
            solution: R`function summary(jsonText) {
  const user = JSON.parse(jsonText);
  const ordersTotal = user.orders.reduce((sum, o) => sum + o.total, 0);
  return { name: user.name, city: user.address.city, ordersTotal };
}`
          }
        },
        {
          cmd: "JSON غلط",
          title: "إيه الأخطاء اللي بتخلي ملف JSON مش صالح، وإزاي تقرا رسالة الغلط؟",
          desc: R`JSON مبيسامحش: غلطة حرف واحد في أي مكان والملف كله مبيتقريش، والبرنامج بيقع أو [[npm]] بيرفض يشتغل. والأخطاء دي تقريبًا كلها جاية من إن الناس بتكتبه كأنه JavaScript:

• تعليقات: JSON مفيهوش تعليقات خالص، لا [[//]] ولا [[/* */]] ولا [[#]]. لو محتاج تشرح حاجة: حط مفتاح زي [["_comment": "..."]]، أو استخدم صيغة بتقبل تعليقات (jsonc أو YAML).
• [[,]] بعد آخر عنصر (trailing comma): [[["a", "b",]]] أو [[{"a": 1,}]]. JavaScript بيقبلها و JSON لأ. وأشهر سبب: مسحت آخر سطر ونسيت الـ [[,]] اللي قبله.
• [[']] بدل [["]]: [[{'name': 'Ali'}]] غلط.
• مفتاح من غير تنصيص: [[{name: "Ali"}]] غلط.
• [[True]] أو [[TRUE]] أو [[None]] (عادات Python): لازم [[true]] و [[null]].
• [[undefined]] و [[NaN]] و [[Infinity]]: مش موجودين في JSON.
• أرقام زي [[.5]] أو [[0123]] أو [[1_000]] أو [[+5]] أو [[0x1F]]: اكتب [[0.5]] و [["0123"]] و [[1000]].
• سطر جديد حقيقي جوه string: لازم تكتبه [[\n]].
• حاجتين في الملف بدل واحدة: [[{...}{...}]] (لو محتاج كده ده JSON Lines، درس [[.jsonl]]).
• علامات تنصيص Word ([[“ ”]]) أو BOM في أول الملف (درس UTF-8).

قراية رسالة الغلط: كل parser بيقولك أول مكان وقف عنده، بالسطر والعمود أو بالـ position (رقم الحرف من أول الملف، بيبدأ من 0). والمكان ده ساعات بيبقى بعد الغلط الحقيقي: لو نسيت [[,]] الغلط بيظهر في أول السطر اللي بعده. وكمان الـ parser بيقف عند أول غلط بس، فلو الملف فيه ٥ أخطاء هتصلّح واحد واحد.

أسهل طريقة: افتحه في VS Code، كل غلط تحته خط أحمر، و [[Ctrl+Shift+M]] بيفتح ليستة الأخطاء كلها مرة واحدة.`,
          example: R`{
  name: "api",
  'port': 3000,
  "debug": True,
  "hosts": ["a.com", "b.com",],
  "retries": 3, // عدد المحاولات
  "price": .5,
  "code": 0123,
  "missing": undefined,
}`,
          flag: "script",
          try: R`اعمل [[bad.json]] بالمحتوى ده بالظبط (ده ملف غلط عن قصد)، وجرّب عليه التلاتة: [[jq . bad.json]] و [[python3 -m json.tool bad.json]] و [[node -e 'JSON.parse(require("fs").readFileSync("bad.json","utf8"))']]. صلّح أول غلط بس، وعيد الأمر وشوف الغلط التاني. كمّل لحد ما [[jq empty bad.json && echo OK]] يطبع [[OK]]. وبعدين حل التمرين تحت.`,
          deep: {
            why: R`JSON اتعمل عشان البرامج تتبادل بيه داتا، فكان المهم إن الـ parser يبقى بسيط وسريع ومفيش حالتين ممكن يتفهموا بطريقتين. عشان كده اتشال أي حاجة «مريحة للإنسان» زي التعليقات والـ trailing comma والـ [[']]. مؤلفه (Douglas Crockford) قال إنه شال التعليقات عن قصد عشان الناس كانت بتحط فيها أوامر للـ parser.`,
            how: R`أي parser بيمشي على الحروف وعنده «أنا مستني إيه دلوقتي». بعد [[{]] مستني [["]] أو [[}]]، فلو لقى [[n]] (أول حرف في [[name]]) بيقف. [[jq]] بيقول [[Invalid numeric literal]] لأنه بيحاول يقرا أي حرف مش متوقع كأنه رقم. و Node بيقول [[Expected property name or '}']]، و Python بيقول [[Expecting property name enclosed in double quotes]]. نفس الغلط بـ ٣ صياغات.`,
            when: R`كل ما [[npm install]] يقول [[EJSONPARSE]]، أو API يرد بـ 400 ويقولك [[Unexpected token]]، أو التطبيق يقع وهو بيقرا ملف إعدادات. وقبل ما تعمل commit لأي [[.json]] عدّلته بإيدك: [[jq empty file.json]].`,
            mistakes: R`تحط تعليق في [[package.json]] فـ npm يرفض: [[npm error code EJSONPARSE]] و [[Note: package.json must be actual JSON, not just JavaScript.]]. تبني JSON بإيدك بلزق strings في الكود ([['{"name": "' + name + '"}']]) فأول اسم فيه [["]] يبوّظ كل حاجة: استخدم [[JSON.stringify]] دايمًا. وتفتكر إن [[tsconfig.json]] و [[.vscode/settings.json]] قواعدهم زي JSON: دول jsonc بيقبلوا تعليقات (درس [[.jsonc]]).`
          },
          teach: R`## الفكرة

المثال ملف JSON فيه ٨ أخطاء عن قصد، كل سطر غلطة مشهورة. هنعدّيه على ٣ parsers ونشوف كل واحد بيقول إيه، وبعدين نصلّح غلطة غلطة ونشوف الرسالة بتتغير إزاي. [[jq]] 1.7 و Python 3.12 اتشغّلوا على أوبونتو 24.04 جوه Docker، و Node 24 و PowerShell على ويندوز.

---

## ١. الأخطاء سطر سطر

| السطر | الغلط | ليه غلط | الصح |
|---|---|---|---|
| [[name: "api",]] | مفتاح من غير تنصيص | كل مفتاح لازم يبقى string بين [["]] | [["name": "api",]] |
| [['port': 3000,]] | تنصيص مفرد | JSON بيعرف [["]] بس | [["port": 3000,]] |
| [["debug": True,]] | [[T]] كبيرة | الـ boolean [[true]] و [[false]] بحروف صغيرة. [[True]] عادة Python | [["debug": true,]] |
| [["hosts": ["a.com", "b.com",],]] | [[,]] بعد آخر عنصر | trailing comma ممنوعة | [["hosts": ["a.com", "b.com"],]] |
| [["retries": 3, // عدد المحاولات]] | تعليق | JSON مفيهوش تعليقات خالص | امسح التعليق |
| [["price": .5,]] | رقم من غير صفر قبل النقطة | لازم رقم قبل [[.]] | [["price": 0.5,]] |
| [["code": 0123,]] | رقم بيبدأ بصفر | الأصفار في الأول ممنوعة | [["code": "0123",]] لو هو كود |
| [["missing": undefined,]] | [[undefined]] و [[,]] في الآخر | [[undefined]] مش من الـ ٦ أنواع، وده آخر زوج | [["missing": null]] |

وده بالظبط الـ solCode اللي تحت: نفس البيانات، بس كل قيمة مكتوبة بقواعد JSON.

---

## ٢. الـ parsers بيقولوا إيه

الـ parser بيقف عند **أول** غلط بس، فالتلاتة اشتكوا من سطر ٢:

~~~text jq . bad.json
jq: parse error: Invalid numeric literal at line 2, column 7
~~~

~~~text python3 -m json.tool bad.json
Expecting property name enclosed in double quotes: line 2 column 3 (char 4)
~~~

~~~text Node 24: JSON.parse
SyntaxError: Expected property name or '}' in JSON at position 4 (line 2 column 3)
~~~

نقرا الأرقام:

| | يعني |
|---|---|
| [[line 2]] | السطر التاني |
| [[column 3]] | الحرف التالت في السطر: بعد المسافتين، يعني [[n]] أول حرف في [[name]] |
| [[char 4]] / [[position 4]] | رقم الحرف من أول الملف، والعد من صفر: [[{]] (0) و [[\n]] (1) ومسافتين (2 و 3) وبعدين [[n]] (4) |
| [[column 7]] في [[jq]] | [[jq]] مقالش «مفتاح من غير تنصيص»، حاول يقرا [[name]] كقيمة ووقف عند آخرها، فرسالته أبعد عن الحقيقة |

Python و Node وصفوا المشكلة صح: «مستني اسم مفتاح بين [["]]». و [[jq]] قال «رقم مكتوب غلط» لأي حرف مش متوقع. عشان كده لو رسالة [[jq]] محيّرة، جرّب Python.

## ٣. نصلّح واحدة واحدة

صلّحنا الأخطاء بالترتيب في Node 24، وبعد كل تصليح شغّلنا [[JSON.parse]] تاني:

| بعد ما صلّحنا | الرسالة اللي ظهرت |
|---|---|
| (ولا حاجة) | [[Expected property name or '}' in JSON at position 4 (line 2 column 3)]] |
| [[name]] | [[Expected double-quoted property name in JSON at position 21 (line 3 column 3)]] |
| [['port']] | [[Unexpected token 'T', ..." "debug": True,...]] |
| [[True]] | [[Unexpected token ']', ...", "b.com",],...]] |
| الـ [[,]] الزيادة | [[Expected double-quoted property name in JSON at position 99 (line 6 column 17)]] |
| التعليق | [[Unexpected token '.', ..." "price": .5,...]] |
| [[.5]] | [[Unexpected number in JSON at position 126 (line 8 column 12)]] |
| [[0123]] | [[Unexpected token 'u', ..."missing": undefined,...]] |
| [[undefined]] و [[,]] الأخيرة | مفيش غلط |

٨ أخطاء = ٨ مرات تشغيل. وده ليه VS Code أريح: بيحط خط أحمر تحت كلهم مرة واحدة، و [[Ctrl+Shift+M]] بيفتح ليستتهم.

لاحظ رسالة التعليق: Node قال «مستني اسم مفتاح» عند [[/]]، لأنه بعد [[,]] مستني [["]]، ومش عارف إن ده تعليق أصلًا.

## ٤. [[jq empty bad.json && echo OK]]

| الحتة | معناها |
|---|---|
| [[jq empty]] | اقرا الملف ومتطبعش حاجة. لو سليم بيخلص بـ exit code صفر، ولو لأ بيطبع الغلط ويخلص بـ 5 |
| [[&&]] | شغّل اللي بعدي **بس لو** اللي قبلي نجح (exit code صفر) |
| [[echo OK]] | اطبع OK |

على [[bad.json]] طبع الغلط بس ومفيش OK. وعلى الملف المتصلّح (الـ solCode) طبع:

~~~text الناتج
OK
~~~

ده السطر اللي تحطه في سكربت أو CI قبل أي commit فيه JSON.

---

## ٥. تحذير: PowerShell 7 متسامح زيادة

جرّبنا [[ConvertFrom-Json]] على نفس [[bad.json]]:

~~~text PowerShell 7.6
Conversion from JSON failed with error: Unexpected character encountered while parsing value: T. Path 'debug', line 4, position 11.
~~~

~~~text Windows PowerShell 5.1
Invalid JSON primitive: True.
~~~

الاتنين عدّوا [[name]] من غير تنصيص و [['port']] من غير ما يشتكوا، ووقفوا عند [[True]]. ولما جرّبنا باقي الأخطاء (من غير [[True]]) على PowerShell 7.6، **قبلهم كلهم**: الـ trailing commas والتعليق و [[undefined]] (بقت [[null]]) و [[.5]] (بقت [[0.50]])، والأغرب [[0123]] اللي بقت [[83]] لأنه قراها رقم بالنظام الثماني (octal).

يعني PowerShell بيقرا JSON «تقريبًا» عشان يريّحك، بس متستخدموش تتأكد إن ملف سليم. الملف اللي PowerShell قبله ممكن [[npm]] أو المتصفح يرفضوه. للفحص: [[jq empty]] أو [[python3 -m json.tool]] أو VS Code.

## الخلاصة

- أشهر ٤ أخطاء: تعليق، و [[,]] بعد آخر عنصر، و [[']]، ومفتاح من غير تنصيص. كلهم «JavaScript مش JSON».
- الـ parser بيقف عند أول غلط، والمكان اللي بيقوله ممكن يبقى بعد الغلط الحقيقي.
- [[position]] و [[char]] بيتعدّوا من صفر من أول الملف.
- [[jq empty f.json && echo OK]] للفحص، ومتعتمدش على PowerShell كفاحص.`,
          lines: [
            R`[[{]] بداية سليمة.`,
            R`المفتاح [[name]] من غير تنصيص: غلط. لازم [["name"]].`,
            R`[['port']] بتنصيص مفرد: غلط. JSON بيقبل [["]] بس.`,
            R`[[True]] بحرف كبير (عادة Python): غلط. لازم [[true]].`,
            R`[[,]] بعد [["b.com"]] وهو آخر عنصر في الـ array: غلط.`,
            R`تعليق [[//]] في آخر السطر: غلط. JSON مفيهوش تعليقات.`,
            R`[[.5]] من غير صفر قبل النقطة: غلط. لازم [[0.5]].`,
            R`رقم بيبدأ بـ [[0]]: غلط. لو هو كود، خليه string [["0123"]].`,
            R`[[undefined]] مش من أنواع JSON (استخدم [[null]] أو شيل المفتاح)، و [[,]] اللي في آخره غلط تاني لأنه آخر مفتاح.`,
            R`[[}]] القفلة سليمة، بس الـ parser عمره ما هيوصلها.`
          ],
          sol: R`أول غلط بس هو اللي بيظهر في كل أداة:
[[jq: parse error: Invalid numeric literal at line 2, column 7]]
[[Expecting property name enclosed in double quotes: line 2 column 3 (char 4)]] (Python)
[[Expected property name or '}' in JSON at position 4 (line 2 column 3)]] (Node 24)

ولما تصلّح واحد واحد، رسايل Node للباقيين بتبقى زي:
[[Unexpected token 'T', ..."debug": True... is not valid JSON]]
[[Unexpected token ']' ...]] (الـ trailing comma)
[[Unexpected token '.' ...]] (الـ [[.5]])
[[Unexpected number in JSON]] (الـ [[0123]])
[[Unexpected token 'u' ...]] (الـ [[undefined]])

والملف بعد التصليح (وده بيعدّي [[jq empty]]):`,
          solCode: R`{
  "name": "api",
  "port": 3000,
  "debug": true,
  "hosts": ["a.com", "b.com"],
  "retries": 3,
  "price": 0.5,
  "code": "0123",
  "missing": null
}`,
          check: {
            lang: "js",
            starter: R`// النص ده مش JSON صالح. صلّحه لحد ما JSON.parse يقبله
// من غير ما تغيّر البيانات نفسها: نفس المفاتيح ونفس القيم
const configText = $__bt{
  name: "api",
  'port': 3000,
  "debug": True,
  "hosts": ["a.com", "b.com",],
  "timeout": .5,
  "owner": undefined,
}$__bt;`,
            tests: R`const parse = () => JSON.parse(configText);
test("JSON.parse بيقبل النص من غير error", () => { parse(); });
test("القيم زي ما هي: name و port و debug", () => { const c = parse(); expect([c.name, c.port, c.debug]).toEqual(["api", 3000, true]); });
test("hosts فيها عنصرين بس", () => expect(parse().hosts).toEqual(["a.com", "b.com"]));
test("timeout رقم 0.5", () => expect(parse().timeout).toBe(0.5));
test("owner بقت null (مفيش undefined في JSON)", () => expect(parse().owner).toBe(null));`,
            solution: R`const configText = $__bt{
  "name": "api",
  "port": 3000,
  "debug": true,
  "hosts": ["a.com", "b.com"],
  "timeout": 0.5,
  "owner": null
}$__bt;`
          }
        },
        {
          cmd: "jq",
          title: "تفحص ملف JSON وترتّبه وتطلّع منه قيمة إزاي من الترمنال؟",
          desc: R`ساعات هتحتاج تعمل حاجة سريعة على JSON من غير ما تكتب كود: تتأكد إنه سليم، أو ترتّب رد API جاي في سطر واحد طويل، أو تطلّع منه قيمة واحدة. الأدوات:

[[jq]]: أشهر أداة للـ JSON في الترمنال. بتنزلها بـ [[sudo apt install jq]] على أوبونتو، و [[brew install jq]] على الماك، و [[winget install jqlang.jq]] على ويندوز. بتاخد «فلتر» بين [[' ']] وملف:
• [[.]] الملف كله منسق وملوّن. وده كمان أسرع طريقة تتأكد إنه سليم.
• [[.name]] قيمة مفتاح، و [[.address.city]] جوه object جوه object.
• [[.roles[0]]] أول عنصر في array (العد من صفر)، و [[.orders[]]] كل عنصر لوحده.
• [[|]] بيبعت الناتج للفلتر اللي بعده، زي الـ pipe في bash.
• [[map(.total)]] ياخد [[total]] من كل عنصر، و [[add]] يجمع، و [[length]] العدد.
• [[select(.total > 500)]] يسيب العناصر اللي الشرط عليها صح بس.
• [[-r]] (raw) بيطبع النص من غير [["]]، مفيد لو هتحطه في متغير في سكربت. و [[-c]] بيطبع في سطر واحد (compact).
• [[jq empty file.json]] مبيطبعش حاجة لو سليم، ويطبع الغلط لو لأ: مثالي للفحص في سكربت أو CI.

[[python3 -m json.tool]]: جاي مع Python، يرتّب ويفحص بس (مش بيفلتر). كويس على أي جهاز مفيهوش [[jq]].

PowerShell: [[Get-Content user.json -Raw | ConvertFrom-Json]] بيحوّله object تقدر تعمل عليه [[.name]]، و [[ConvertTo-Json]] بيرجّعه.

VS Code: [[Shift+Alt+F]] بيرتّبه. والمتصفح (Firefox بالذات) بيعرض أي رابط بيرجّع JSON كشجرة تقدر تفتحها وتقفلها.

وأشهر استخدام: [[curl -s https://api.github.com/users/octocat | jq .name]].`,
          example: R`jq . user.json
jq '.name' user.json
jq -r '.name' user.json
jq '.roles[0]' user.json
jq '.orders | map(.total) | add' user.json
jq '.orders[] | select(.total > 500) | .id' user.json
jq -c '.address' user.json
jq empty bad.json && echo OK
python3 -m json.tool user.json`,
          try: R`على [[user.json]] من درس [[.json]]: نفّذ المثال كله. بعدين طلّع عدد الـ roles بـ [[jq '.roles | length' user.json]]. وجرّب على API حقيقي: [[curl -s https://api.github.com/users/octocat | jq '{name, public_repos}']] (الـ [[{name, public_repos}]] بيعمل object جديد فيه المفتاحين دول بس).`,
          deep: {
            why: R`الـ JSON اللي جاي من API بيبقى سطر واحد بآلاف الحروف، مستحيل يتقري. و [[grep]] مينفعش معاه لأنه مبيفهمش الهيكل. [[jq]] بيفهم الهيكل فبتقدر تقوله «هات الحاجة دي» بدقة، وفي سكربتات الـ deploy و CI بتستخدمه تقرا قيمة من ملف إعدادات أو من رد API.`,
            how: R`[[jq]] بيقرا الـ JSON ويحوّله لقيمة جوه الذاكرة، وبعدين يعدّيها على الفلتر خطوة خطوة. [[.orders[]]] بيطلّع كل عنصر كناتج منفصل، فاللي بعد [[|]] بيتنفذ على كل واحد لوحده. و [[jq]] مبيعدّلش الملف أبدًا: لو عايز تحفظ النتيجة اكتب [[jq '.version = "2.0.0"' package.json > tmp.json && mv tmp.json package.json]].`,
            when: R`تفحص ملف قبل commit، تقرا رد API وانت بتجرب بـ curl، تطلّع قيمة في سكربت bash (زي [[VERSION=$(jq -r .version package.json)]])، أو تدوّر في logs مكتوبة JSON.`,
            mistakes: R`تكتب الفلتر من غير [[' ']] فالشيل ياكل الرموز زي [[|]] و [[[]]]. تنسى [[-r]] فالمتغير في السكربت يبقى فيه [["]]. وتكتب [[jq '.x' file.json > file.json]]: الشيل بيفضّي الملف قبل ما [[jq]] يقراه فتخسره، اكتب في ملف تاني الأول.`
          },
          teach: R`## الفكرة

[[jq]] بياخد ملف JSON وفلتر، ويطبع ناتج الفلتر. كل سطر في المثال فلتر أصعب شوية من اللي قبله، كلهم على [[user.json]] بتاع درس [[.json]]. اتشغّل [[jq]] 1.7 على أوبونتو 24.04 جوه Docker (بعد [[apt install jq]]).

شكل أي أمر:

~~~text
jq  [خيارات]  'الفلتر'  الملف
~~~

الفلتر دايمًا بين [[' ']]، عشان رموز زي [[|]] و [[[ ]]] و [[>]] ليها معنى عند الشيل، والتنصيص المفرد بيمنعه يلمسها.

---

## ١. [[jq . user.json]]

[[.]] أبسط فلتر: «القيمة اللي جاتلك زي ما هي». فـ [[jq]] بيطبع الملف كله منسق بمسافتين، وفي الترمنال بيلوّنه:

~~~text الناتج (أول ٥ سطور)
{
  "id": 42,
  "name": "سارة أحمد",
  "email": "sara@example.com",
  "active": true,
~~~

ولأنه لازم يقرا الملف عشان ينسقه، ده كمان فحص: لو فيه غلط بيقولك فين. ولاحظ إن العربي بيطلع عربي، مش [[\u....]] زي Python.

## ٢. [[jq '.name' user.json]]

[[.name]] = «من الـ object ده هات قيمة المفتاح [[name]]»:

~~~text الناتج
"سارة أحمد"
~~~

طلع بـ [["]] لأن [[jq]] بيطبع JSON، والـ string في JSON بين تنصيص.

## ٣. [[jq -r '.name' user.json]]

[[-r]] (raw output): لو الناتج string، اطبعه نص خام من غير [["]]:

~~~text الناتج
سارة أحمد
~~~

ده اللي هتحتاجه في السكربت: [[NAME=$(jq -r .name user.json)]] يحط في المتغير الاسم نفسه، مش الاسم بين تنصيص.

## ٤. [[jq '.roles[0]' user.json]]

[[.roles]] هات الـ array، و [[[0]]] أول عنصر فيها (العد من صفر):

~~~text الناتج
"admin"
~~~

و [[.roles[1]]] = [["editor"]]، و [[.roles[-1]]] = آخر عنصر.

## ٥. [[jq '.orders | map(.total) | add' user.json]]

ده أول فلتر فيه [[|]]، فنفكّه بنفس ترتيب التنفيذ. الـ [[|]] جوه [[jq]] زي اللي في bash: ناتج اللي على الشمال بيدخل للي على اليمين.

### الخطوة ١: [[.orders]]

بيطلّع الـ array:

~~~text الناتج
[
  { "id": 1, "total": 300 },
  { "id": 2, "total": 950.75 }
]
~~~

(بشكل مختصر هنا، [[jq]] بيطبع كل مفتاح في سطر.)

### الخطوة ٢: [[| map(.total)]]

[[map(f)]] بيطبّق الفلتر [[f]] على كل عنصر في الـ array ويرجّع array جديدة بالنتايج. [[.total]] من كل طلب:

~~~text الناتج
[
  300,
  950.75
]
~~~

### الخطوة ٣: [[| add]]

[[add]] بياخد array ويجمع عناصرها (أرقام بتتجمع، و strings بتتلزق):

~~~text الناتج
1250.75
~~~

| الخطوة | الفلتر | الناتج |
|---|---|---|
| ١ | [[.orders]] | array فيها طلبين |
| ٢ | [[map(.total)]] | [[[300, 950.75]]] |
| ٣ | [[add]] | [[1250.75]] |

## ٦. [[jq '.orders[] | select(.total > 500) | .id' user.json]]

### الخطوة ١: [[.orders[]]]

[[[]]] فاضية = «فك الـ array». بدل ناتج واحد (array)، بيطلع **ناتجين منفصلين**، كل طلب لوحده:

~~~text الناتج
{
  "id": 1,
  "total": 300
}
{
  "id": 2,
  "total": 950.75
}
~~~

ومن هنا كل فلتر بعد [[|]] بيتنفذ على كل طلب لوحده. ده الفرق بينها وبين [[map]]: [[map]] بترجّع array واحدة، و [[[]]] بتطلّع العناصر سايبة.

### الخطوة ٢: [[| select(.total > 500)]]

[[select(شرط)]] بيعدّي العنصر لو الشرط صح، ويرميه لو غلط. [[.total > 500]] على الطلب الأول = [[false]] فاتشال، وعلى التاني [[true]] فعدّى:

~~~text الناتج
{
  "id": 2,
  "total": 950.75
}
~~~

### الخطوة ٣: [[| .id]]

من اللي فضل، هات [[id]]:

~~~text الناتج
2
~~~

## ٧. [[jq -c '.address' user.json]]

[[-c]] (compact): اطبع كل ناتج في سطر واحد من غير مسافات:

~~~text الناتج
{"city":"القاهرة","zip":"11511"}
~~~

مفيد لما الناتج رايح لأمر تاني أو لملف JSON Lines (درس [[.jsonl]]).

## ٨. [[jq empty bad.json && echo OK]]

[[empty]] فلتر مبيطلّعش أي ناتج، فـ [[jq]] بيقرا الملف بس. لو سليم يخلص بنجاح (exit code 0) و [[&&]] بتشغّل [[echo OK]]. على [[bad.json]] بتاع الدرس اللي فات:

~~~text الناتج
jq: parse error: Invalid numeric literal at line 2, column 7
~~~

ومفيش OK، لأن [[jq]] خلص بـ exit code [[5]] فـ [[&&]] موقفة [[echo]].

## ٩. [[python3 -m json.tool user.json]]

البديل لو [[jq]] مش متسطّب: بيفحص وبينسق بـ ٤ مسافات، بس مبيفلترش، والعربي بيطلع [[\u....]] إلا لو ضفت [[--no-ensure-ascii]].

---

## ١٠. حاجات من «جرّب»

~~~text jq '.roles | length' user.json
2
~~~

[[length]] على array = عدد عناصرها (وعلى string = عدد الحروف، وعلى object = عدد المفاتيح).

~~~text curl -s https://api.github.com/users/octocat | jq '{name, public_repos}'
{
  "name": "The Octocat",
  "public_repos": 8
}
~~~

- [[curl -s]] بيجيب رد الـ API ([[-s]] = silent، من غير شريط التحميل)، و [[|]] بيبعته لـ [[jq]] بدل الملف.
- [[{name, public_repos}]] بيبني object جديد فيه المفتاحين دول بس، اختصار لـ [[{name: .name, public_repos: .public_repos}]].

(اتشغّل من الحاوية بتاريخ النهارده، والرقم ممكن يتغير.)

## ١١. فخ: [[jq '.x' f.json > f.json]]

جرّبناها: الملف بقى **فاضي** ([[wc -c]] قال 0). الشيل بيفتح [[f.json]] للكتابة ويفضّيه **قبل** ما [[jq]] يبدأ يقرا. اكتب في ملف تاني وبعدين غيّر الاسم: [[jq '...' f.json > tmp.json && mv tmp.json f.json]].

---

## ١٢. وعلى ويندوز

[[jq]] بيتسطّب بـ [[winget install jqlang.jq]] ويشتغل بنفس الشكل، بس في PowerShell [[' ']] و [["]] جوه الفلتر ليهم قواعد مختلفة شوية. والبديل اللي جاي مع PowerShell: [[ConvertFrom-Json]]. جرّبنا الأوامر دي في 7.6 و 5.1 وطلّعوا نفس النتايج:

| jq | PowerShell ([[$u = Get-Content user.json -Raw -Encoding UTF8 | ConvertFrom-Json]]) | الناتج |
|---|---|---|
| [[jq -r .name]] | [[$u.name]] | [[سارة أحمد]] |
| [[jq '.roles[0]']] | [[$u.roles[0]]] | [[admin]] |
| [[jq '.orders | map(.total) | add']] | [[($u.orders.total | Measure-Object -Sum).Sum]] | [[1250.75]] |
| [[jq '.orders[] | select(.total > 500) | .id']] | [[$u.orders | Where-Object total -gt 500 | ForEach-Object id]] | [[2]] |
| [[jq -c .address]] | [[$u.address | ConvertTo-Json -Compress]] | [[{"city":"القاهرة","zip":"11511"}]] |
| [[jq '.roles | length']] | [[$u.roles.Count]] | [[2]] |

## الخلاصة

| الفلتر | بيعمل إيه |
|---|---|
| [[.]] | الكل منسق (وفحص) |
| [[.key]] و [[.a.b]] | قيمة مفتاح، وجوه object |
| [[.arr[0]]] و [[.arr[]]] | عنصر واحد، أو كل العناصر سايبة |
| [[|]] | ودّي الناتج للفلتر اللي بعده |
| [[map(f)]] و [[select(شرط)]] | حوّل كل عنصر، وفلتر بالشرط |
| [[add]] و [[length]] | اجمع، وعدّ |
| [[-r]] و [[-c]] | نص خام، وسطر واحد |
| [[empty]] | افحص بس |`,
          lines: [
            R`الملف كله منسق وملوّن، ولو فيه غلط بيقول فين.`,
            R`قيمة مفتاح واحد، والـ string بيطلع بـ [["]].`,
            R`[[-r]] بيطبع النص خام من غير [["]].`,
            R`أول عنصر في array الـ roles (العد بيبدأ من 0).`,
            R`[[map]] بياخد [[total]] من كل طلب، و [[add]] بيجمعهم.`,
            R`كل طلب لوحده، وبعدين اللي الـ total بتاعه أكبر من 500، وبعدين الـ id بس.`,
            R`[[-c]] بيطبع الـ object في سطر واحد.`,
            R`[[empty]] مبيطبعش حاجة، فلو الملف سليم [[&&]] بيكمّل ويطبع OK.`,
            R`البديل اللي جاي مع Python: يرتّب ويفحص.`
          ],
          sol: R`الناتج الحقيقي على [[user.json]]:
[[jq .]] الملف منسق بمسافتين وملوّن.
[["سارة أحمد"]]
[[سارة أحمد]]
[["admin"]]
[[1250.75]]
[[2]]
[[{"city":"القاهرة","zip":"11511"}]]
وعلى [[bad.json]]: [[jq: parse error: Invalid numeric literal at line 2, column 7]] ومفيش OK (لو صلّحته هيطبع OK).
و [[python3 -m json.tool]] بيطبعه منسق بـ ٤ مسافات.

[[jq '.roles | length']] بيطبع [[2]]. وطلب GitHub بيطبع حاجة زي [[{"name": "The Octocat", "public_repos": 8}]].`
        },
        {
          cmd: "JSON.parse",
          title: "تقرا JSON وتكتبه من الكود إزاي (JSON.parse و JSON.stringify و json.loads)؟",
          desc: R`الـ JSON نص. عشان تستخدمه في الكود لازم تحوّله لـ object (اسمها parse أو deserialize)، وعشان تبعته أو تحفظه بتحوّل الـ object لنص (stringify أو serialize).

في JavaScript:
• [[JSON.parse(text)]]: نص ← قيمة. لو النص مش JSON سليم بيرمي [[SyntaxError]]، فلو النص جاي من بره (يوزر، ملف، API) حطه في [[try/catch]].
• [[JSON.stringify(value)]]: قيمة ← نص في سطر واحد.
• [[JSON.stringify(value, null, 2)]]: نفس الكلام بس منسق بمسافتين. التاني ([[null]]) مكان فلتر نادرًا ما بتستخدمه.
• [[res.json()]] في [[fetch]] بيعمل [[JSON.parse]] للرد، و [[require("./file.json")]] في Node بيقرا الملف ويعمل parse.

إيه اللي بيحصل للأنواع اللي مش في JSON وانت بتعمل stringify:
• [[Date]] بيتحول string بصيغة ISO، ولما تعمل parse بيفضل string مش Date. لازم تعمل [[new Date(value)]] بإيدك.
• [[undefined]] والدوال: المفتاح بيختفي خالص.
• [[NaN]] و [[Infinity]]: بيبقوا [[null]].
• [[Map]] و [[Set]]: بيبقوا [[{}]] فاضي.
• [[BigInt]]: بيرمي error.

في Python: [[import json]] وبعدين [[json.loads(text)]] و [[json.dumps(obj)]]، وللملفات [[json.load(f)]] و [[json.dump(obj, f)]]. وخد بالك: [[json.dumps]] بيحوّل العربي لـ [[\u0633...]] إلا لو كتبت [[ensure_ascii=False]].

وأي لغة تانية فيها نفس الفكرة: [[json_decode]] في PHP، و [[encoding/json]] في Go، و Jackson في Java، و [[System.Text.Json]] في C#.`,
          example: R`const text = '{"name":"سارة","age":28,"tags":["a","b"]}';
const user = JSON.parse(text);
console.log(user.name, user.age + 1, user.tags.length);
console.log(JSON.stringify(user));
console.log(JSON.stringify(user, null, 2));
console.log(JSON.stringify({ when: new Date(0), skip: undefined, n: NaN, run() {} }));
const copy = JSON.parse(JSON.stringify({ when: new Date(0) }));
console.log(typeof copy.when, copy.when);
try { JSON.parse("{'a': 1}"); } catch (e) { console.log(e.name + ": " + e.message); }`,
          flag: "script",
          try: R`احفظ المثال في [[parse.js]] وشغّله بـ [[node parse.js]]. بعدين في Python جرّب [[python3 -c 'import json; print(json.dumps({"name": "سارة"}))']] ومرة تانية بـ [[ensure_ascii=False]]. وآخر حاجة حل التمرين تحت.`,
          deep: {
            why: R`الشبكة والملفات بيفهموا bytes ونصوص بس، مش objects. فلازم خطوة تحوّل الـ object لنص قبل ما يتبعت وترجّعه بعد ما يوصل. JSON بقى الصيغة الافتراضية للخطوة دي لأنه مدعوم في كل لغة من غير مكتبات إضافية.`,
            how: R`[[JSON.stringify]] بيمشي على الـ object: كل قيمة بيكتبها على حسب نوعها، ولو لقى object فيه دالة [[toJSON]] بيستخدمها (وده اللي [[Date]] عنده، فبيرجّع [[toISOString()]]). و [[JSON.parse]] بيعمل objects و arrays عادية جديدة، فمفيش أي method أو class بيرجع. عشان كده [[JSON.parse(JSON.stringify(x))]] كانت طريقة قديمة لعمل نسخة عميقة، بس بتبوّظ التواريخ و undefined. دلوقتي استخدم [[structuredClone(x)]].`,
            when: R`كل ما تبعت أو تستقبل داتا من API، أو تحفظ حاجة في [[localStorage]] (بيقبل strings بس)، أو تقرا وتكتب ملف إعدادات.`,
            mistakes: R`تعمل [[JSON.parse]] على حاجة هي أصلًا object فيطلعلك [[SyntaxError: "[object Object]" is not valid JSON]] (لأنه حوّله string الأول). تعمل [[JSON.stringify]] مرتين فتبعت [["\"{\\\"name\\\"...\""]]. تنسى إن التاريخ رجع string فتعمل عليه [[.getFullYear()]] فيقع. وتعمل parse لنص جاي من بره من غير try/catch فالسيرفر كله يقع بسبب request واحد بايظ.`
          },
          teach: R`## الفكرة

JSON نص، والكود بيشتغل على objects. المثال بيعمل الرحلة في الاتجاهين: نص ← object بـ [[JSON.parse]]، و object ← نص بـ [[JSON.stringify]]، وبعدين يوريك الأنواع اللي بتضيع في السكة، وإزاي تمسك نص بايظ. الكود اتشغّل بـ [[node parse.js]] على Node 24.

---

## سطر ١: النص

~~~javascript
const text = '{"name":"سارة","age":28,"tags":["a","b"]}';
~~~

- [[const]] بيعمل متغير مش هيتغير.
- القيمة **string** عادي في JavaScript: بين [[']] من بره، وجواه JSON بـ [["]]. استخدمنا [[']] بره عشان منضطرش نعمل escape لكل [["]] جوه.
- لحد دلوقتي [[text.name]] مش هيجيب حاجة: ده نص، مفيهوش مفاتيح.

## سطر ٢: [[JSON.parse(text)]]

~~~javascript
const user = JSON.parse(text);
~~~

[[JSON]] object جاهز في JavaScript، و [[.parse]] دالة فيه بتقرا النص حرف حرف وتبني منه قيمة حقيقية: object فيه [[name]] (string) و [[age]] (number) و [[tags]] (array). اسم العملية دي parse أو deserialize.

## سطر ٣: نستخدمه

~~~javascript
console.log(user.name, user.age + 1, user.tags.length);
~~~

~~~text الناتج
سارة 29 2
~~~

- [[user.name]] بقى ينفع، لأن [[user]] object.
- [[user.age + 1]] = [[29]]: [[age]] رقم بجد فـ [[+]] بتجمع. لو كان [["28"]] string كان هيطلع [[281]] (لزق).
- [[user.tags.length]] = عدد عناصر الـ array.

## سطر ٤: [[JSON.stringify(user)]]

العكس: قيمة ← نص JSON (serialize):

~~~text الناتج
{"name":"سارة","age":28,"tags":["a","b"]}
~~~

سطر واحد من غير ولا مسافة: ده الشكل اللي بيتبعت على الشبكة، لأنه أصغر.

## سطر ٥: [[JSON.stringify(user, null, 2)]]

~~~text الناتج
{
  "name": "سارة",
  "age": 28,
  "tags": [
    "a",
    "b"
  ]
}
~~~

[[stringify]] بياخد ٣ حاجات (arguments):

| الترتيب | هنا | معناه |
|---|---|---|
| الأول | [[user]] | القيمة اللي هتتحوّل |
| التاني | [[null]] | مكان الـ replacer: دالة أو ليستة مفاتيح تفلتر بيها. [[null]] = «مش عايز فلتر» |
| التالت | [[2]] | المسافات في كل مستوى. [[2]] = مسافتين، ده الشكل المعتاد في الملفات |

ولاحظ إن الـ array اتفردت كل عنصر في سطر.

## سطر ٦: الأنواع اللي JSON ميعرفهاش

~~~javascript
console.log(JSON.stringify({ when: new Date(0), skip: undefined, n: NaN, run() {} }));
~~~

الـ object ده فيه ٤ حاجات مش من أنواع JSON:

- [[new Date(0)]]: تاريخ. الـ [[0]] معناها صفر ملّي ثانية من بداية عدّ الوقت في الكمبيوتر (1 يناير 1970 UTC).
- [[undefined]]: «مفيش قيمة» بتاعة JavaScript.
- [[NaN]]: Not a Number، اللي بيطلع من حاجة زي [[0 / 0]].
- [[run() {}]]: دالة (method).

~~~text الناتج
{"when":"1970-01-01T00:00:00.000Z","n":null}
~~~

| الحاجة | بقت | ليه |
|---|---|---|
| [[Date]] | string بصيغة ISO | الـ Date عنده دالة [[toJSON]] بترجّع [[toISOString()]]، و [[stringify]] بيستخدمها |
| [[undefined]] | المفتاح اختفى | مفيش حاجة في JSON تتكتب بيها |
| [[NaN]] | [[null]] | JSON مفيهوش NaN، فبيكتب أقرب حاجة |
| الدالة | اختفت | JSON داتا بس، مش كود |

وجرّبنا كمان: [[Map]] و [[Set]] بيبقوا [[{}]] فاضيين، و [[Infinity]] بيبقى [[null]]، و [[BigInt]] (زي [[1n]]) بيرمي [[TypeError: Do not know how to serialize a BigInt]].

## سطر ٧ و ٨: التاريخ مبيرجعش تاريخ

~~~javascript
const copy = JSON.parse(JSON.stringify({ when: new Date(0) }));
console.log(typeof copy.when, copy.when);
~~~

نقراه من جوه لبرة:

1. [[{ when: new Date(0) }]]: object فيه Date.
2. [[JSON.stringify(...)]]: بقى نص، والـ Date بقى string جواه.
3. [[JSON.parse(...)]]: رجع object، بس [[parse]] ميعرفش إن الـ string ده كان تاريخ، فسابه string.
4. [[typeof]] بيقول نوع القيمة.

~~~text الناتج
string 1970-01-01T00:00:00.000Z
~~~

عشان كده أي تاريخ جاي من API هيوصلك string، ولازم تحوّله بإيدك لو عايز تعمل عليه حسابات (الـ desc بيقولك إزاي).

## سطر ٩: نص بايظ و [[try/catch]]

~~~javascript
try { JSON.parse("{'a': 1}"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

- [["{'a': 1}"]] شبه JSON بس بـ [[']]، فمش JSON.
- [[JSON.parse]] لما يلاقي غلط **بيرمي** error: يوقف التنفيذ ويطلع لبرة. من غير حاجة تمسكه البرنامج كله بيقع.
- [[try { ... }]] = جرّب الكود ده، و [[catch (e) { ... }]] = لو رمى error، امسكه في المتغير [[e]] ونفّذ ده بدل ما تقع.
- [[e.name]] نوع الـ error، و [[e.message]] الرسالة.

~~~text الناتج
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

[[position 1]] = الحرف التاني ([[']])، لأن العد من صفر و [[{]] هي صفر.

---

## ونفس الكلام في Python

~~~text python3 -c 'import json; print(json.dumps({"name": "سارة"}))'
{"name": "\u0633\u0627\u0631\u0629"}
~~~

~~~text نفس الأمر مع ensure_ascii=False
{"name": "سارة"}
~~~

[[json.dumps]] = [[stringify]]، و [[json.loads]] = [[parse]] (الـ s من string). و [[ensure_ascii]] افتراضيًا [[True]]، فبيكتب أي حرف مش إنجليزي برقمه. وجرّبنا [[json.loads('{"a": true, "b": null}')]] رجّع [[{'a': True, 'b': None}]] من نوع [[dict]].

| | JavaScript | Python |
|---|---|---|
| نص ← قيمة | [[JSON.parse(text)]] | [[json.loads(text)]] |
| قيمة ← نص | [[JSON.stringify(v)]] | [[json.dumps(v)]] |
| منسق | [[JSON.stringify(v, null, 2)]] | [[json.dumps(v, indent=2)]] |
| من/لـ ملف | [[require("./f.json")]] أو [[fs]] | [[json.load(f)]] و [[json.dump(v, f)]] |
| نص بايظ | [[SyntaxError]] | [[json.JSONDecodeError]] |

## الخلاصة

- [[parse]]: نص ← قيمة، و [[stringify]]: قيمة ← نص.
- اللي مش من أنواع JSON بيتغير في السكة: Date بيبقى string، و undefined بيختفي، و NaN بيبقى null.
- أي نص جاي من بره ممكن يبقى بايظ، و [[JSON.parse]] بيرمي error عليه.`,
          lines: [
            R`نص JSON (string عادي في JavaScript، بين [[']] من بره و [["]] جوه).`,
            R`[[JSON.parse]] بيحوّله object حقيقي.`,
            R`دلوقتي تقدر توصل للمفاتيح، و [[age]] رقم فـ [[+ 1]] بتجمع.`,
            R`بيرجّعه نص في سطر واحد.`,
            R`نفس النص منسق بمسافتين، أريح للقراية وللملفات.`,
            R`التاريخ بقى string، و [[undefined]] والدالة اختفوا، و [[NaN]] بقت [[null]].`,
            R`رحلة ذهاب وعودة: الـ Date بيرجع string مش Date.`,
            R`[[typeof]] بيأكد إنه string.`,
            R`[[']] مش JSON، فـ [[JSON.parse]] بيرمي [[SyntaxError]] و [[catch]] بتمسكه.`
          ],
          sol: R`[[node parse.js]] بيطبع:
[[سارة 29 2]]
[[{"name":"سارة","age":28,"tags":["a","b"]}]]
وبعده نفس الـ object منسق على ٩ سطور، والـ array كل عنصر في سطر.
[[{"when":"1970-01-01T00:00:00.000Z","n":null}]]
[[string 1970-01-01T00:00:00.000Z]]
[[SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)]]

و Python بيطبع [[{"name": "\u0633\u0627\u0631\u0629"}]] (عربي سليم بس مكتوب بأرقام)، ومع [[ensure_ascii=False]] بيطبع [[{"name": "سارة"}]].`,
          check: {
            lang: "js",
            starter: R`// 1) safeParse: لو النص JSON سليم رجّع القيمة، ولو لأ رجّع fallback (من غير ما ترمي error)
function safeParse(text, fallback) {
  return JSON.parse(text);
}
// 2) pretty: رجّع النص منسق بمسافتين
function pretty(value) {
  return JSON.stringify(value);
}
// 3) loadOrder: النص فيه createdAt كـ string، رجّع الـ object و createdAt جواه Date حقيقي
function loadOrder(text) {
  return JSON.parse(text);
}`,
            tests: R`test("safeParse لـ JSON سليم", () => expect(safeParse('{"a":1}', null)).toEqual({ a: 1 }));
test("safeParse لـ نص بايظ ← fallback", () => expect(safeParse("{'a': 1}", { a: 0 })).toEqual({ a: 0 }));
test("safeParse لـ نص فاضي ← fallback", () => expect(safeParse("", [])).toEqual([]));
test("pretty بمسافتين", () => expect(pretty({ a: 1, b: [1, 2] })).toBe('{\n  "a": 1,\n  "b": [\n    1,\n    2\n  ]\n}'));
test("loadOrder: createdAt بقى Date", () => expect(loadOrder('{"id":7,"createdAt":"2026-10-01T09:00:00.000Z"}').createdAt instanceof Date).toBe(true));
test("loadOrder: نفس اللحظة ونفس باقي المفاتيح", () => { const o = loadOrder('{"id":7,"createdAt":"2026-10-01T09:00:00.000Z"}'); expect([o.id, o.createdAt.getTime()]).toEqual([7, Date.UTC(2026, 9, 1, 9)]); });`,
            solution: R`function safeParse(text, fallback) {
  try { return JSON.parse(text); } catch { return fallback; }
}
function pretty(value) {
  return JSON.stringify(value, null, 2);
}
function loadOrder(text) {
  const order = JSON.parse(text);
  order.createdAt = new Date(order.createdAt);
  return order;
}`
          }
        },
        {
          cmd: ".jsonc",
          title: "ليه tsconfig.json وإعدادات VS Code بيقبلوا تعليقات وهما JSON؟",
          desc: R`فيه ملفات امتدادها [[.json]] بس مكتوب فيها تعليقات و trailing commas، وشغالة عادي. السر إنها مش JSON عادي، هي JSONC (JSON with Comments): نفس JSON بالظبط، وزيادة عليه:
• تعليق سطر [[//]] وتعليق بلوك [[/* ... */]].
• [[,]] بعد آخر عنصر (في معظم الأدوات).

مين بيقبلها؟ البرنامج اللي بيقرا الملف هو اللي بيقرر، مش الامتداد:
• [[tsconfig.json]] و [[jsconfig.json]]: TypeScript بيقراها بـ parser بيقبل التعليقات.
• إعدادات VS Code: [[settings.json]] و [[.vscode/launch.json]] و [[tasks.json]] و [[extensions.json]] و [[keybindings.json]]. VS Code بيكتب تحت [[JSON with Comments]] بدل [[JSON]].
• [[.devcontainer/devcontainer.json]]، و [[.eslintrc.json]]، و [[deno.json]].
• وفيه امتداد صريح [[.jsonc]] لأي ملف عايز تقول إنه JSONC.

ومين مش بيقبلها؟ [[package.json]] (npm بيقع بـ [[EJSONPARSE]])، و [[composer.json]]، و [[appsettings.json]] في .NET (بيقبل التعليقات فعلًا، بس متعتمدش عليه)، وأي JSON رايح أو جاي من API، و [[JSON.parse]] نفسه.

وأخ تالت اسمه JSON5 ([[.json5]]): بيقبل كمان مفاتيح من غير تنصيص و [[']] و [[Infinity]]. نادر، بس هتشوفه في [[babel.config.json5]] وأدوات قليلة.

في VS Code لو ملف [[.json]] عادي وانت عارف إن برنامجه بيقبل تعليقات، دوس على [[JSON]] تحت في الـ status bar واختار [[JSON with Comments]] عشان يبطّل يعلّم عليها أحمر.`,
          example: R`{
  // كل ملف يتنسّق لوحده وانت بتحفظ
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  /* الملفات دي متظهرش في الـ Explorer */
  "files.exclude": {
    "**/node_modules": true,
    "**/.DS_Store": true,
  },
  "files.eol": "\n",
}`,
          flag: "script",
          try: R`في VS Code دوس [[Ctrl+Shift+P]] واكتب [[Preferences: Open User Settings (JSON)]]، وبص تحت على الـ status bar هتلاقي [[JSON with Comments]]. ضيف تعليق فوق أي إعداد. بعدين اعمل [[package.json]] فيه [[{"name": "demo", "version": "1.0.0"}]] وضيف سطر تعليق ونفّذ [[npm install]] وشوف الغلط، ورجّعه.`,
          deep: {
            why: R`ملف الإعدادات الناس بتعدّله بإيدها وبتنسى هي ليه حطت القيمة دي، فالتعليقات ضرورية. بس كانت المشاريع اتعودت على JSON، فبدل ما تغيّر الصيغة لـ YAML، الأدوات زي TypeScript و VS Code كتبت parser بيقبل تعليقات وخلاص.`,
            how: R`الـ parser بتاع JSONC بيشيل التعليقات الأول (ويتجاهل الـ trailing commas)، وبعدين يقرا الباقي كـ JSON عادي. VS Code بيعرف الملف JSONC من اسمه (فيه ليستة أسماء معروفة)، أو من [[files.associations]] في الإعدادات لو عايز تضيف أسماء تانية.`,
            when: R`ملفات إعدادات الأدوات اللي بتقبلها (tsconfig و VS Code). أما ملف انت هتقراه بكودك بـ [[JSON.parse]]، فيا إما JSON عادي، يا إما تستخدم مكتبة زي [[jsonc-parser]] أو صيغة تانية.`,
            mistakes: R`تنسخ تعليقات من [[tsconfig.json]] لـ [[package.json]] فـ npm يقع. تقرا [[tsconfig.json]] بـ [[require()]] أو [[JSON.parse]] في سكربت فيقع على أول تعليق: استخدم [[ts.readConfigFile]] أو [[tsc --showConfig]]. وتفتكر إن JSON5 و JSONC واحد: JSONC تعليقات بس، و JSON5 أوسع.`
          },
          teach: R`## الفكرة

المثال ملف [[settings.json]] بتاع VS Code: شكله JSON، بس فيه تعليقات و [[,]] بعد آخر عنصر. هنمشي عليه سطر سطر، وبعدين نعدّيه على أدوات JSON العادية ونشوف مين بيقبله ومين لأ. [[jq]] و Python اتشغّلوا على أوبونتو 24.04 جوه Docker، و npm 11 و TypeScript و PowerShell على ويندوز.

---

## ١. المثال سطر سطر

### [[// كل ملف يتنسّق لوحده وانت بتحفظ]]

تعليق سطر: من [[//]] لآخر السطر بيتشال قبل القراية. نفس شكل تعليقات JavaScript.

### [["editor.formatOnSave": true,]] و [["editor.tabSize": 2,]]

أزواج JSON عادية. النقطة في [["editor.formatOnSave"]] جزء من اسم المفتاح، مش object جوه object. VS Code بيسمّي إعداداته كده: [[editor]] = المجموعة، و [[formatOnSave]] = الإعداد.

### [[/* الملفات دي متظهرش في الـ Explorer */]]

تعليق بلوك: كل اللي بين [[/*]] و [[*/]]، حتى لو على كذا سطر.

### [["files.exclude": { ... },]]

مفتاح قيمته object، وجواه:

- [["**/node_modules": true,]]: المفتاح هنا نمط glob مش رمز JSON: [[**]] = أي فولدر بأي عمق، يعني «أي [[node_modules]] في أي مكان، خبّيه».
- [["**/.DS_Store": true,]]: الملف اللي الماك بيعمله في كل فولدر. والـ [[,]] بعده **trailing comma**: آخر عنصر في الـ object وبعده [[,]].
- [[},]]: قفل الـ object، و [[,]] عشان فيه إعداد كمان.

### [["files.eol": "\n",]]

[[eol]] = end of line. و [["\n"]] string فيه escape: [[\n]] = حرف LF. يعني «احفظ الملفات بنهايات لينكس» (درس LF و CRLF). وبعده trailing comma تانية قبل [[}]].

| السطر | JSON عادي | JSONC |
|---|---|---|
| [[// ...]] | غلط | مقبول |
| [[/* ... */]] | غلط | مقبول |
| [[,]] قبل [[}]] أو [[]]] | غلط | مقبول (في VS Code و TypeScript) |
| أي حاجة تانية | زي بعض | زي بعض |

---

## ٢. أدوات JSON العادية بترفضه

~~~text jq . settings.jsonc
jq: parse error: Invalid numeric literal at line 2, column 5
~~~

~~~text python3 -m json.tool settings.jsonc
Expecting property name enclosed in double quotes: line 2 column 3 (char 4)
~~~

الاتنين وقفوا عند [[//]] في سطر ٢. يعني الملف ده مش JSON بالنسبة لأي حد غير البرنامج اللي معمول عشانه.

## ٣. npm بيرفض التعليق في [[package.json]]

عملنا [[package.json]] فيه سطر [[// my app]] وشغّلنا [[npm install]] (npm 11):

~~~text الناتج
npm error code EJSONPARSE
npm error JSON.parse Invalid package.json: JSONParseError: Expected property name or '}' in JSON at position 4 (line 2 column 3) while parsing near "{\n  // my app\n  \"name\": ..."
npm error JSON.parse Failed to parse JSON data.
npm error JSON.parse Note: package.json must be actual JSON, not just JavaScript.
~~~

- [[EJSONPARSE]] كود الغلط: E = error، و JSONPARSE = قراية الـ JSON فشلت.
- npm بيقرا [[package.json]] بـ JSON parser عادي، فنفس رسالة Node بتاعة [[JSON.parse]].
- آخر سطر هو النصيحة كلها: [[package.json]] لازم يبقى JSON حقيقي.

## ٤. TypeScript بيقبل التعليق في [[tsconfig.json]]

عملنا [[tsconfig.json]] فيه تعليق سطر وتعليق بلوك و trailing commas:

~~~text tsconfig.json
{
  // settings
  "compilerOptions": {
    "strict": true, /* types */
    "target": "ES2022",
  },
}
~~~

وشغّلنا [[npx -p typescript tsc --showConfig]]:

- [[npx]] بيشغّل أداة من npm من غير ما تسطّبها في المشروع، و [[-p typescript]] = الأداة جاية من الباكدج اللي اسمها typescript (عشان فيه باكدج قديمة اسمها [[tsc]] بس مش هي).
- [[tsc --showConfig]] بيقرا [[tsconfig.json]] ويطبع الإعدادات النهائية كـ JSON عادي.

~~~text الناتج
{
    "compilerOptions": {
        "strict": true,
        "target": "es2022"
    },
    "files": [
        "./a.ts"
    ]
}
~~~

قراه من غير ولا غلط، والتعليقات اختفت من الناتج. ده الدليل إن **البرنامج** هو اللي بيقرر، مش الامتداد: الملفين امتدادهم [[.json]].

## ٥. PowerShell

| | PowerShell 7.6 | Windows PowerShell 5.1 |
|---|---|---|
| [[Get-Content settings.jsonc -Raw | ConvertFrom-Json]] | قبله، والتعليقات والـ trailing commas اتجاهلوا | رفضه: [[Invalid object passed in, ':' or '}' expected.]] |

PowerShell 7 متسامح زي ما شفنا في درس «JSON غلط»، فقبول PowerShell لملف مش معناه إنه JSON سليم.

---

## الخلاصة

| الملف | بيقبل تعليقات؟ | مين بيقراه |
|---|---|---|
| [[tsconfig.json]] و [[jsconfig.json]] | أيوه | TypeScript |
| [[.vscode/settings.json]] و [[launch.json]] و [[tasks.json]] | أيوه | VS Code |
| [[.jsonc]] | أيوه | أي أداة بتفهم JSONC |
| [[package.json]] | لأ | npm |
| أي JSON من أو لـ API، و [[JSON.parse]] | لأ | أي parser عادي |

- JSONC = JSON + تعليقات ([[//]] و [[/* */]]) + trailing commas.
- لو هتقرا ملف JSONC بكودك، متستخدمش [[JSON.parse]]: استخدم مكتبة زي [[jsonc-parser]] أو أداة البرنامج نفسه ([[tsc --showConfig]]).`,
          lines: [
            R`[[{]] بداية عادية زي JSON.`,
            R`إعداد عادي: مفتاح string وقيمة boolean.`,
            R`رقم عادي.`,
            R`تعليق بلوك [[/* */]]: مسموح في JSONC، وكان هيوقّع JSON.parse.`,
            R`مفتاح قيمته object.`,
            R`[[**]] في القيمة دي معناها «أي فولدر» (glob)، مش رمز JSON.`,
            R`[[,]] بعد آخر عنصر في الـ object: مقبولة في JSONC.`,
            R`[[},]] قفل الـ object، وبعده [[,]] لأن فيه إعداد كمان.`,
            R`[[\n]] جوه string: معناها LF، يعني VS Code يحفظ الملفات بنهايات لينكس.`,
            R`trailing comma تانية قبل الـ [[}]]، وبرضه مقبولة هنا.`
          ],
          sol: R`ملف الإعدادات بيقبل التعليق عادي ومفيش خط أحمر. أما [[npm install]] مع تعليق في [[package.json]]:
[[npm error code EJSONPARSE]]
[[npm error JSON.parse Invalid package.json: JSONParseError: Expected property name or '}' in JSON at position 4 (line 2 column 3) while parsing near "{\n  // my app\n  \"name\": ..."]]
[[npm error JSON.parse Note: package.json must be actual JSON, not just JavaScript.]]

وللتأكيد إن TypeScript بيقبل JSONC: [[tsconfig.json]] فيه تعليقات و trailing commas، و [[npx tsc --showConfig]] بيطبع الإعدادات النهائية عادي من غير أي غلط.`
        },
        {
          cmd: ".jsonl",
          title: "يعني إيه JSON Lines (.jsonl و .ndjson)، وليه السطر الواحد مهم؟",
          desc: R`JSON Lines (ويتقال عليه NDJSON: newline-delimited JSON) ملف كل سطر فيه JSON كامل لوحده، والسطر الجديد هو الفاصل. مفيش [[[ ]]] حوالين الكل، ومفيش [[,]] بين السطور.

ليه مش array عادية؟
• تقدر تضيف سطر في الآخر ([[>>]]) من غير ما تقرا الملف وتعدّله. ده مثالي للـ logs.
• تقدر تقراه سطر سطر حتى لو حجمه ١٠ جيجا، من غير ما تحمّله كله في الذاكرة.
• لو سطر باظ، الباقي سليم. أما array فيها غلط واحد فالملف كله مبيتقريش.
• أدوات لينكس العادية بتشتغل عليه: [[wc -l]] عدد السجلات، و [[head]] و [[tail]] و [[grep]] و [[split]].

قواعده:
• كل سطر قيمة JSON صالحة (غالبًا object)، ومينفعش السطر يتقسم على سطرين، فمفيش تنسيق بمسافات.
• UTF-8، والسطر بيخلص بـ [[\n]].
• الامتدادات: [[.jsonl]] و [[.ndjson]]، وأحيانًا [[.log]].

هتقابله فين: logs بتاعة pino و winston في Node وأي structured logging، وداتا تدريب الذكاء الاصطناعي (OpenAI و Anthropic fine-tuning و batch APIs بتاخد [[.jsonl]])، و exports من قواعد بيانات زي MongoDB و BigQuery، والـ streaming APIs (كل event في سطر).

بتقراه إزاي: [[jq]] بيفهمه لوحده (بيعدّي كل سطر على الفلتر)، و [[jq -s]] (slurp) بيجمعهم في array واحدة. وفي الكود: [[text.split("\n")]] وبعدين [[JSON.parse]] لكل سطر مش فاضي.`,
          example: R`{"time":"2026-10-01T09:00:01Z","level":"info","msg":"server started","port":3000}
{"time":"2026-10-01T09:02:33Z","level":"error","msg":"payment failed","userId":42}
{"time":"2026-10-01T09:03:00Z","level":"error","msg":"db connection lost"}`,
          flag: "script",
          try: R`احفظ المثال في [[events.jsonl]] ونفّذ: [[wc -l events.jsonl]] و [[jq -c 'select(.level == "error")' events.jsonl]] و [[jq -r .msg events.jsonl]] و [[jq -s length events.jsonl]]. ضيف سطر جديد بـ [[echo '{"level":"info","msg":"new"}' >> events.jsonl]]. وجرّب [[python3 -m json.tool events.jsonl]] من غير وبعدين مع [[--json-lines]]. وبعدين حل التمرين.`,
          deep: {
            why: R`JSON العادي معمول لرسالة واحدة كاملة. لكن الـ logs والـ exports والـ streams داتا مستمرة ملهاش آخر، ومحتاج تكتب فيها وتقرا منها حتة حتة. JSON Lines بيدي الاتنين: كل سجل JSON مفهوم، والسطر الجديد فاصل بسيط أي أداة تفهمه.`,
            how: R`لأن JSON نفسه بيمنع السطر الجديد الحقيقي جوه النصوص (لازم يتكتب [[\n]])، فمستحيل سجل يكون فيه [[\n]] حقيقي. فالـ [[\n]] دايمًا فاصل بين سجلين. البرنامج بيقرا لحد [[\n]]، يعمل parse، يعالج، ويكمّل.`,
            when: R`logs، أو export داتا كبيرة، أو ملفات تدريب و batch للـ AI، أو أي ملف هتضيف عليه باستمرار.`,
            mistakes: R`تعمل [[JSON.parse]] للملف كله مرة واحدة فيقع بعد أول سطر ([[Unexpected non-whitespace character after JSON at position 82 (line 2 column 1)]]). تنسق كل سجل على كذا سطر فيبطل JSONL. تنسى إن آخر الملف فيه [[\n]] فالـ split يطلّع سطر فاضي في الآخر و [[JSON.parse("")]] يقع: اتجاهل السطور الفاضية.`
          },
          teach: R`## الفكرة

المثال ملف [[events.jsonl]] فيه ٣ سجلات log، كل سجل JSON كامل في سطر لوحده. هنفهم شكله، وبعدين نشغّل عليه أوامر «جرّب» ونشوف ليه أدوات JSON العادية بتتلخبط فيه وأدوات السطور لأ. اتشغّل على أوبونتو 24.04 جوه Docker ([[jq]] 1.7 و Python 3.12)، و Node 24 على ويندوز.

---

## ١. الملف سطر سطر

| السطر | فيه إيه |
|---|---|
| ١ | object فيه [[time]] و [[level]] [["info"]] و [[msg]] و [[port]] |
| ٢ | object تاني: [[level]] [["error"]] ومعاه [[userId]] |
| ٣ | object تالت: [[level]] [["error"]] من غير مفاتيح زيادة |

ولاحظ اللي **مش** موجود:

- مفيش [[[ ]]] حوالين الكل: الملف مش array.
- مفيش [[,]] في آخر السطور: السطر الجديد هو الفاصل.
- مفيش تنسيق ولا مسافات: كل سجل لازم يفضل في سطر واحد.
- المفاتيح مش لازم تبقى نفسها في كل سطر ([[port]] في الأول بس، و [[userId]] في التاني بس).

وكل سطر لوحده JSON سليم 100%. يعني تقدر تاخد أي سطر وتعمله [[JSON.parse]].

---

## ٢. [[wc -l events.jsonl]]: عدد السجلات

~~~text الناتج
3 events.jsonl
~~~

[[wc -l]] بيعدّ السطور، وفي JSONL السطر = سجل. ده مستحيل مع JSON عادي منسق، لأن السجل الواحد بياخد كذا سطر.

## ٣. [[jq -c 'select(.level == "error")' events.jsonl]]

[[jq]] بيفهم JSONL لوحده: بيقرا قيمة، يعدّيها على الفلتر، ويقرا اللي بعدها. فالفلتر بيتنفذ على كل سطر لوحده:

- [[select(...)]] سيب السجل لو الشرط صح.
- [[.level == "error"]] الشرط: [[==]] مقارنة، والـ [["error"]] بين [["]] لأنه string. والفلتر كله بين [[' ']] عشان الـ [["]] جواه.
- [[-c]] اطبع كل نتيجة في سطر، فالناتج نفسه JSONL.

~~~text الناتج
{"time":"2026-10-01T09:02:33Z","level":"error","msg":"payment failed","userId":42}
{"time":"2026-10-01T09:03:00Z","level":"error","msg":"db connection lost"}
~~~

## ٤. [[jq -r .msg events.jsonl]]

[[.msg]] من كل سجل، و [[-r]] من غير [["]]:

~~~text الناتج
server started
payment failed
db connection lost
~~~

## ٥. [[jq -s length events.jsonl]]

[[-s]] (slurp: «اشفط»): بدل ما يعدّي كل سطر لوحده، بيجمع السجلات كلها في array واحدة، وبعدين يطبّق الفلتر عليها مرة واحدة. فـ [[length]] = عدد عناصر الـ array:

~~~text الناتج
3
~~~

وجرّبنا [[jq -s -c 'map(.level)']] وطلّع [[["info","error","error"]]]. يعني [[-s]] هي الطريقة اللي تحوّل بيها JSONL لـ JSON array عادية.

## ٦. نضيف سجل

~~~bash
echo '{"level":"info","msg":"new"}' >> events.jsonl
~~~

[[>>]] بيكتب في الآخر من غير ما يلمس اللي فوق، و [[echo]] بيحط [[\n]] في الآخر، فالسجل الجديد في سطر لوحده. بعدها [[wc -l]] قال [[4]]، و [[jq -r .msg]] طلّع [[new]] في الآخر.

ده بالظبط اللي يخلّي JSONL مثالي للـ logs: لو الملف كان array، كنت هتحتاج تقرا الملف كله، تشيل [[]]] الأخيرة، تحط [[,]] وسجلك و [[]]]، وتكتبه تاني.

---

## ٧. أدوات JSON العادية بتقع

~~~text python3 -m json.tool events.jsonl
Extra data: line 2 column 1 (char 82)
~~~

~~~text Node 24: JSON.parse على الملف كله
SyntaxError: Unexpected non-whitespace character after JSON at position 82 (line 2 column 1)
~~~

الاتنين بيقولوا نفس الحاجة: «قريت قيمة JSON كاملة، ولقيت بعدها كلام تاني». JSON العادي = قيمة واحدة بس في الملف. و [[82]]؟ أول سطر طوله ٨٢ حرف (جرّبنا: [[head -1 events.jsonl | wc -c]] = 82 ومعاه الـ [[\n]])، فالحرف رقم 82 من الصفر هو أول حرف في السطر التاني.

ومع [[--json-lines]] Python بيفهم:

~~~text python3 -m json.tool --json-lines events.jsonl (أوله)
{
    "time": "2026-10-01T09:00:01Z",
    "level": "info",
    "msg": "server started",
    "port": 3000
}
~~~

وكل سجل بيطلع منسق لوحده.

---

## ٨. في PowerShell

[[Get-Content]] بيرجّع الملف سطر سطر، فكل سطر تقدر تعدّيه على [[ConvertFrom-Json]] لوحده. جرّبنا في PowerShell 7.6 و 5.1:

~~~powershell
Get-Content events.jsonl | ForEach-Object { ($_ | ConvertFrom-Json).msg }
~~~

~~~text الناتج
server started
payment failed
db connection lost
~~~

[[$_]] = السطر الحالي. وده نفس فكرة [[jq]]: كل سطر لوحده.

## الخلاصة

| | JSON عادي | JSON Lines |
|---|---|---|
| الملف | قيمة واحدة (غالبًا [[[...]]] أو [[{...}]]) | سجل في كل سطر |
| الفاصل | [[,]] جوه array | السطر الجديد |
| تضيف سجل | تقرا وتعدّل وتكتب الملف كله | [[>>]] |
| تقراه | [[JSON.parse]] مرة واحدة | سطر سطر، وكل سطر [[JSON.parse]] |
| مع [[jq]] | [[jq '.[]']] | [[jq]] على طول، و [[-s]] لو عايزه array |

وفي الكود: متعملش [[JSON.parse]] للملف كله، والسطور الفاضية (زي اللي بعد آخر [[\n]]) سيبها.`,
          lines: [
            R`سجل كامل في سطر: object فيه الوقت والمستوى والرسالة والبورت.`,
            R`سجل تاني مستقل، ومفيش [[,]] بينه وبين اللي فوقه.`,
            R`سجل تالت، والمفاتيح مش لازم تبقى نفسها في كل سطر.`
          ],
          sol: R`الناتج الحقيقي:
[[3 events.jsonl]]
[[{"time":"2026-10-01T09:02:33Z","level":"error","msg":"payment failed","userId":42}]]
[[{"time":"2026-10-01T09:03:00Z","level":"error","msg":"db connection lost"}]]
[[server started]] و [[payment failed]] و [[db connection lost]] كل واحدة في سطر.
[[3]]

[[python3 -m json.tool events.jsonl]] من غير الخيار بيقول [[Extra data: line 2 column 1 (char 82)]]، يعني «قريت JSON وفضل كلام بعده». ومع [[--json-lines]] بيطبع كل سجل منسق لوحده.`,
          check: {
            lang: "js",
            starter: R`// النص ملف JSON Lines: كل سطر object
// 1) parseJsonl: رجّع array فيها كل الـ objects (واتجاهل السطور الفاضية)
function parseJsonl(text) {
  return JSON.parse(text);
}
// 2) toJsonl: العكس، array ← نص كل عنصر في سطر، وآخره \n
function toJsonl(items) {
  return JSON.stringify(items);
}`,
            tests: R`const text = '{"level":"info","msg":"start"}\n{"level":"error","msg":"fail","userId":42}\n';
test("parseJsonl بيطلّع عنصرين", () => expect(parseJsonl(text)).toEqual([{ level: "info", msg: "start" }, { level: "error", msg: "fail", userId: 42 }]));
test("السطور الفاضية في النص متبوظش حاجة", () => expect(parseJsonl('{"a":1}\n\n{"a":2}\n\n').length).toBe(2));
test("نهايات سطور ويندوز \\r\\n", () => expect(parseJsonl('{"a":1}\r\n{"a":2}\r\n')).toEqual([{ a: 1 }, { a: 2 }]));
test("toJsonl: كل عنصر في سطر من غير [ ] ولا ,", () => expect(toJsonl([{ a: 1 }, { b: "x" }])).toBe('{"a":1}\n{"b":"x"}\n'));
test("رحلة ذهاب وعودة", () => expect(parseJsonl(toJsonl([{ n: 1 }, { n: 2 }, { n: 3 }]))).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]));`,
            solution: R`function parseJsonl(text) {
  return text.split(/\r?\n/).filter(line => line.trim()).map(line => JSON.parse(line));
}
function toJsonl(items) {
  return items.map(item => JSON.stringify(item)).join("\n") + "\n";
}`
          }
        }
      ]
    }
]);
