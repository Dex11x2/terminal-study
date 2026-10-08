// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "الـ layout",
      l: 1,
      n: "مفيش CSS: المسافات والترتيب والتوسيط كلها widgets، والقاعدة: الحدود بتنزل والأحجام بتطلع",
      items: [
        {
          cmd: "Row و Column",
          title: "رص العناصر جنب بعض أو تحت بعض",
          desc: R`[[Column]] بيرص الـ children تحت بعض، و [[Row]] جنب بعض. زي flexbox بـ [[flex-direction: column]] و [[row]].

[[mainAxisAlignment]] الترتيب على الاتجاه الأساسي (زي justify-content)، و [[crossAxisAlignment]] على الاتجاه التاني (زي align-items). و [[spacing]] مسافة ثابتة بين العناصر (زي gap).`,
          example: R`// في body بتاع Scaffold:
Row(
  spacing: 12,
  children: [
    const CircleAvatar(radius: 28, child: Icon(Icons.person)),
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: const [Text('Ali Hassan'), Text('Flutter developer')],
    ),
    const Spacer(),
    IconButton(onPressed: () {}, icon: const Icon(Icons.edit)),
  ],
)`,
          try: "غيّر [[crossAxisAlignment]] لـ [[center]] وبعدين [[end]] وشوف النصين بيتحركوا إزاي. وشيل الـ [[Spacer]] وحط [[mainAxisAlignment: MainAxisAlignment.spaceBetween]] على الـ Row.",
          flag: "script",
          deep: {
            why: "كل شاشة عبارة عن صفوف وأعمدة جوه بعض: هيدر فيه صورة واسم، وكارت فيه عنوان وسعر، وفورم حقول تحت بعض. Row و Column هم الـ flexbox بتاع Flutter، وهتكتبهم في كل ملف.",
            how: R`قاعدة الـ layout في Flutter: «constraints go down, sizes go up, parent sets position». الأب بيقول للابن «عرضك من كذا لكذا»، والابن بيختار حجمه جوه الحدود دي ويرجّعه، والأب يقرر مكانه.

Column بيدّي كل ابن ارتفاع غير محدود (unbounded) على الاتجاه الأساسي، ويقيسهم واحد واحد، وبعدين يوزعهم حسب [[mainAxisAlignment]]: [[start]] و [[center]] و [[end]] و [[spaceBetween]] و [[spaceAround]] و [[spaceEvenly]]. و [[crossAxisAlignment]] على العرض: [[start]] و [[center]] و [[stretch]] (يمط الابن على العرض كله).

[[mainAxisSize]]: الافتراضي [[max]] يعني Column بياخد كل الارتفاع المتاح. [[min]] ياخد على قد العيال بس، ودا المهم لما Column جوه Row أو جوه Dialog.

الاتجاهات بتفهم RTL: [[start]] في العربي يعني اليمين. عشان كده استخدم start و end مش left و right.

ومن Dart 3.10 تقدر تختصر: [[mainAxisAlignment: .center]] بدل [[MainAxisAlignment.center]] (dot shorthands)، لأن النوع معروف من الـ parameter.`,
            when: "دايمًا. Row لحاجات جنب بعض (أيقونة ونص، أزرار)، و Column لحاجات تحت بعض (فورم، كارت). ولو المحتوى أطول من الشاشة: ListView مش Column.",
            mistakes: R`نص طويل في Row فيطلع الشريط الأصفر والأسود و [[A RenderFlex overflowed by 42 pixels on the right]]: الـ Row مدّي النص عرض غير محدود، فالنص مش عارف يلف. الحل تحطه في [[Expanded]] (الدرس الجاي). و Column فيه عناصر أطول من الشاشة: نفس الـ overflow تحت، والحل ListView أو [[SingleChildScrollView]].`
          },
          teach: R`## الكود بيعمل إيه؟

صف profile: صورة دايرية، وجنبها الاسم وتحته الوظيفة، وزرار قلم في آخر السطر. يعني [[Row]] جواه [[Column]]. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: في Chrome بـ [[flutter run -d web-server]] (عرض 411)، و widget tests قاست مكان كل عنصر بـ [[tester.getRect]] على شاشة 411×800، وجربت كل تعديلات «جرّب».

---

## ١. القاعدة اللي بتشرح كل حاجة

> «constraints go down, sizes go up, parent sets position»

الأب بيقول للابن «حجمك من كذا لكذا» (constraints)، والابن بيختار حجمه جوه الحدود دي ويرجّعه (size)، والأب يحط الابن في مكانه (position). كل اللي تحت تطبيق للجملة دي.

---

## ٢. [[Row(spacing: 12, children: [...])]]

~~~dart
Row(
  spacing: 12,
  children: [
~~~

- [[Row]]: يرص العيال جنب بعض. الاتجاه ده اسمه **main axis** (أفقي)، والتاني **cross axis** (رأسي).
- [[spacing: 12]]: 12 pixel بين كل عنصرين (زي [[gap]] في CSS).
- [[children:]]: لستة العيال بين قوسين مربعين، بالترتيب.

---

## ٣. العيال واحد واحد

### الصورة

~~~dart
    const CircleAvatar(radius: 28, child: Icon(Icons.person)),
~~~

[[CircleAvatar]] دايرة، و [[radius: 28]] نص القطر، يعني 56×56. وجواها أيقونة شخص لحد ما يبقى فيه صورة حقيقية ([[backgroundImage]]).

### العمود

~~~dart
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: const [Text('Ali Hassan'), Text('Flutter developer')],
    ),
~~~

- [[Column]]: يرص تحت بعض. هنا الـ main axis رأسي والـ cross axis أفقي (العكس).
- [[crossAxisAlignment: CrossAxisAlignment.start]]: على العرض، رص العيال من **البداية**. الافتراضي [[center]].
- [[mainAxisSize: MainAxisSize.min]]: خد ارتفاع على قد العيال بس. الافتراضي [[max]] (كل الارتفاع المتاح).
- [[const]] قبل اللستة: اللستة وكل اللي فيها ثابت.

### الـ Spacer والزرار

~~~dart
    const Spacer(),
    IconButton(onPressed: () {}, icon: const Icon(Icons.edit)),
~~~

- [[Spacer]]: ياخد كل المساحة الفاضية في الصف، فيزق اللي بعده لآخر السطر.
- [[IconButton]]: زرار أيقونة. [[onPressed: () {}]] دالة فاضية (من غيرها، أو لو null، الزرار يبقى مقفول ورمادي).

---

## ٤. الأماكن الحقيقية

~~~text flutter test (شاشة 411×800، رتّبتهم تحت بعض)
row         x=0.0    y=0.0  w=411.0  h=56.0
avatar      x=0.0    y=0.0  w=56.0   h=56.0
column      x=68.0   y=8.0  w=242.3  h=40.0
spacer      x=322.3  y=28.0 w=28.8   h=0.0
iconbutton  x=363.0  y=4.0  w=48.0   h=48.0
~~~

نقراهم:

1. **ارتفاع الـ Row = 56**: أطول عيل (الصورة). الـ Row بياخد ارتفاع على قد أطول ابن.
2. **العمود عند x=68**: الصورة 56 + spacing 12.
3. **العمود y=8 وارتفاعه 40**: نصين كل واحد 20. وبيتوسّط رأسيًا جوه الـ 56 (الـ Row الافتراضي [[CrossAxisAlignment.center]]): (56 − 40) ÷ 2 = 8.
4. **عرض العمود 242.3**: على قد أعرض نص فيه ([[Flutter developer]]). (عرض النص في [[flutter test]] أكبر من الحقيقي، لأنه بيستخدم خط اختبار كل حرف فيه مربع. في Chrome الصف شكله زي ما تتوقع: الدايرة، والاسمين جنبها، والقلم على اليمين.)
5. **الـ Spacer عرضه 28.8**: اللي فضل: 411 − (56 + 242.3 + 48) − 3 × 12 = 28.7. لاحظ إن الـ spacing بيتحسب حوالين الـ Spacer كمان (٣ فواصل بين ٤ عيال).
6. **الزرار 48×48** مع إن الأيقونة 24: الـ IconButton بيكبّر مساحة اللمس لـ 48 عشان الصباع.

### بالعربي (RTL)

لفّيت الشاشة في [[Directionality(textDirection: TextDirection.rtl)]]:

~~~text flutter test
avatar x=355.0  icon x=0.0
~~~

الصورة بقت على اليمين (411 − 56 = 355) والقلم على الشمال. الـ Row بيبدأ من [[start]]، و start في العربي هو اليمين.

---

## ٥. التجارب في «جرّب»

### [[crossAxisAlignment]]: start ثم center ثم end

~~~text flutter test
start   name x=68.0   desc x=68.0
center  name x=117.9  desc x=68.0
end     name x=167.8  desc x=68.0
~~~

- اللي اتحرك **الاسم بس**. الوصف أعرض، فهو اللي محدد عرض العمود ومش بيتحرك.
- center: الاسم في نص عرض الوصف: 68 + (242.3 − 142.5) ÷ 2 = 117.9 (142.5 عرض الاسم).
- end: آخر الاسم على آخر الوصف: 68 + 242.3 − 142.5 = 167.8.

### من غير Spacer و [[mainAxisAlignment: MainAxisAlignment.spaceBetween]]

~~~text flutter test
column x=88.4   icon x=363.0
~~~

- [[mainAxisAlignment]]: إزاي تتوزع المساحة الفاضية على الـ main axis. و [[spaceBetween]]: بالتساوي **بين** العيال.
- الفاضي: 411 − (56 + 242.3 + 48) − 2 × 12 = 40.7، مقسوم على فاصلين = 20.35. فالعمود بقى عند 56 + 12 + 20.35 = 88.4: بعد عن الصورة، وراح ناحية النص.
- الفرق: Spacer بيحط الفاضي كله في مكان واحد انت اخترته. spaceBetween بيقسمه على كل الفواصل.

---

## ٦. أخطاء هتقابلها

### [[mainAxisSize]] الافتراضي جوه Row

[[Column]] من غير [[MainAxisSize.min]] جوه Row:

~~~text flutter test
column x=0.0 y=0.0 w=14.3 h=800.0
~~~

خد الارتفاع كله (800) عشان نص واحد. ودا بيخلي الـ Row نفسه طويل.

### نص طويل في Row

حطيت أيقونة ونص طويل جدًا في Row:

~~~text flutter test
A RenderFlex overflowed by 682 pixels on the right.
~~~

- [[RenderFlex]]: الـ render object اللي ورا Row و Column.
- الـ Row بيدّي العيال عرض **غير محدود**، فالنص مش عارف إن الشاشة خلصت، ومش بيلف لسطر تاني. والحل [[Expanded]] (الدرس الجاي).

---

## الخلاصة

| الخاصية | على إيه | القيم |
|---|---|---|
| [[mainAxisAlignment]] | اتجاه الرص (أفقي في Row) | start و center و end و spaceBetween و spaceAround و spaceEvenly |
| [[crossAxisAlignment]] | الاتجاه التاني | start و center و end و stretch |
| [[mainAxisSize]] | الطول على اتجاه الرص | max (الافتراضي) و min |
| [[spacing]] | بين كل عنصرين | رقم |
| [[Spacer]] | ابن | ياخد الفاضي كله |`,
          lines: [
            "صف: العناصر جنب بعض (في RTL بيبدأ من اليمين).",
            "١٢ بين كل عنصر والتاني.",
            "العناصر.",
            "صورة دايرية، وجواها أيقونة لحد ما يبقى فيه صورة.",
            "عمود جوه الصف: الاسم وتحته الوصف.",
            "رصّهم من أول السطر (start) بدل التوسيط.",
            "العمود ياخد أقل ارتفاع محتاجه بس.",
            "النصين.",
            "قفلة العمود.",
            "[[Spacer]] ياخد كل المساحة الفاضية، فيزق اللي بعده للآخر.",
            "زرار أيقونة في آخر الصف.",
            "قفلة الـ children.",
            "قفلة الصف."
          ],
          sol: R`[[crossAxisAlignment]] هنا بيحرّك النصين بالنسبة لبعض، مش بالنسبة للشاشة. [[Flutter developer]] أطول، فهو اللي بيحدد عرض الـ Column ومش بيتحرك خالص. اللي بيتحرك [[Ali Hassan]]: مع [[start]] بدايته على بداية التاني، ومع [[center]] بيبقى في نص عرض التاني، ومع [[end]] آخره على آخر التاني. (قست ده في widget test: [[Ali Hassan]] اتنقل مسافة متساوية مع كل خطوة، و [[Flutter developer]] فضل مكانه.) لو الاسم كان أطول من الوصف كان الوصف هو اللي هيتحرك.

ولما تشيل الـ Spacer وتحط [[spaceBetween]]: الصورة في الأول والقلم في الآخر زي ما هم، بس الاسم والوصف راحوا في نص الصف بدل ما يفضلوا لازقين في الصورة. لأن spaceBetween بيوزّع المساحة الفاضية بالتساوي بين كل عنصرين، مش بيحطها كلها قبل آخر عنصر. دا الفرق بين Spacer (المساحة كلها في مكان واحد انت اخترته) و spaceBetween (مقسومة على كل الفواصل).

ولو سبت الـ Spacer وحطيت spaceBetween كمان، مش هتلاقي أي فرق: Spacer أكل المساحة الفاضية كلها، فمفيش حاجة فاضلة يوزّعها spaceBetween.`
        },
        {
          cmd: "Expanded",
          title: "عنصر ياخد المساحة الفاضية كلها أو نسبة منها",
          desc: R`جوه Row أو Column، [[Expanded]] بيخلي الابن ياخد كل المساحة الفاضية على الاتجاه الأساسي. ولو أكتر من واحد، [[flex]] بيقسم بينهم بالنسبة: flex 3 و flex 1 يعني ٣ أرباع وربع. زي [[flex: 1]] في CSS.

و [[Flexible]] نفس الفكرة بس الابن مش مجبر يملى نصيبه: ياخد على قده لحد الحد ده.`,
          example: R`Row(
  children: [
    const Icon(Icons.description),
    const Expanded(
      flex: 3,
      child: Text('a_very_long_file_name_that_would_overflow_any_phone_screen.pdf', overflow: TextOverflow.ellipsis),
    ),
    Expanded(
      child: FilledButton(onPressed: () {}, child: const Text('Open')),
    ),
  ],
)`,
          try: "شيل الـ Expanded من حوالين النص وشوف الشريط الأصفر والأسود. وبعدين غيّر flex لـ 1 وشوف الزرار والنص بياخدوا قد إيه.",
          flag: "script",
          deep: {
            why: "أشهر error في Flutter للمبتدئين هو الشريط الأصفر والأسود بتاع overflow، وغالبًا سببه نص أو صورة في Row من غير Expanded. وأي تقسيم بالنسبة (قايمة جانبية وتلتين محتوى) بيتعمل بيه.",
            how: R`Row بيعمل layout على مرحلتين. الأول يقيس العيال اللي مش flex (الأيقونة والأزرار العادية) ويدّيهم عرض غير محدود، فكل واحد ياخد عرضه الطبيعي. بعدين ياخد المساحة اللي فضلت ويقسمها على الـ Expanded و Flexible حسب الـ flex، ويدّي كل واحد حد محدود.

عشان كده نص من غير Expanded بياخد عرض غير محدود: مش عارف إن الشاشة خلصت، فبيطلب عرض النص كله في سطر واحد ويعمل overflow. جوه Expanded بياخد عرض محدد، فيلف لسطور أو يعمل ellipsis.

[[Expanded]] هو في الحقيقة [[Flexible(fit: FlexFit.tight)]]: الابن لازم يملى نصيبه. و [[Flexible]] العادي [[FlexFit.loose]]: الابن ياخد لحد نصيبه، ولو محتاج أقل ياخد أقل.

[[Spacer]] هو Expanded فاضي، بيزق اللي بعده.

والـ Expanded لازم يبقى ابن مباشر لـ Row أو Column أو Flex. لو حطيته جوه Padding جوه Row، هيطلع error [[Incorrect use of ParentDataWidget]]. الصح: Expanded بره والـ Padding جواه.`,
            when: "نص ممكن يطول في صف. تقسيم نسب (٢:١). عنصر يملى الباقي من الشاشة في Column (زي ListView تحت هيدر).",
            mistakes: R`ListView جوه Column من غير Expanded: الـ ListView عايز ارتفاع محدود والـ Column بيدّيه غير محدود، فيطلع [[Vertical viewport was given unbounded height]]. حطه في Expanded. و Expanded جوه حاجة مش Row ولا Column. و Expanded جوه Row جوه SingleChildScrollView أفقي: مفيش «مساحة فاضية» أصلًا لأن العرض غير محدود، فيضرب.`
          },
          teach: R`## الكود بيعمل إيه؟

سطر ملف: أيقونة، واسم ملف طويل جدًا، وزرار [[Open]]. الاسم أطول من الشاشة، فلو سبناه على راحته هيطلع بره. [[Expanded]] بيدّيه عرض محدود (٣ أرباع المساحة الفاضية)، فيقص نفسه ويحط [[…]] في الآخر، والزرار ياخد الربع. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: في Chrome بـ [[flutter run -d web-server]] بعرض 411، و widget tests قاست العروض على شاشة 411×800.

---

## ١. [[Row]] والأيقونة

~~~dart
Row(
  children: [
    const Icon(Icons.description),
~~~

[[Icons.description]] أيقونة ورقة، ومقاسها الافتراضي 24×24. مش جوه Expanded، فبتاخد حجمها الطبيعي.

---

## ٢. النص جوه [[Expanded]]

~~~dart
    const Expanded(
      flex: 3,
      child: Text('a_very_long_file_name_that_would_overflow_any_phone_screen.pdf', overflow: TextOverflow.ellipsis),
    ),
~~~

- [[Expanded]]: «خد من المساحة الفاضية في الـ Row، واملى نصيبك كله».
- [[flex: 3]]: نصيبه ٣ أجزاء. الافتراضي 1.
- [[overflow: TextOverflow.ellipsis]]: لو النص مش مكفّي في العرض، اقطعه وحط [[…]]. ودا بيشتغل بس لأن Expanded إدّاه عرض محدود.
- [[const]] قدام Expanded: كل اللي جواه ثابت.

---

## ٣. الزرار جوه [[Expanded]] تاني

~~~dart
    Expanded(
      child: FilledButton(onPressed: () {}, child: const Text('Open')),
    ),
~~~

- مفيش [[flex]]، فهو 1. يعني المساحة مقسومة ٣ + ١ = ٤ أجزاء.
- [[FilledButton]]: زرار Material مليان بلون الثيم. وجوه Expanded بيتمط على عرض نصيبه كله.

---

## ٤. Row بيقيس على مرحلتين

1. **العيال اللي مش flex الأول** (الأيقونة): ياخدوا حجمهم الطبيعي.
2. **اللي فضل يتقسم** على الـ Expanded حسب الـ flex، وكل واحد ياخد عرض **محدود** بالظبط.

القياس الحقيقي:

~~~text flutter test (شاشة 411×800، رتّبتهم تحت بعض)
icon    x=0.0    y=12.0  w=24.0   h=24.0
text    x=24.0   y=14.0  w=290.3  h=20.0
button  x=314.3  y=0.0   w=96.8   h=48.0
~~~

- اللي فضل بعد الأيقونة: 411 − 24 = 387.
- النص: 387 × ٣ ÷ ٤ = 290.25، والزرار 387 ÷ ٤ = 96.75. (الاختبار بيطبع رقم واحد بعد العلامة، فطلعوا 290.3 و 96.8.)
- ارتفاع الـ Row 48 (الزرار أطول حاجة)، والأيقونة والنص متوسطين رأسيًا: الأيقونة (48 − 24) ÷ 2 = 12، والنص (48 − 20) ÷ 2 = 14.

وفي Chrome: الاسم ظاهر لحد [[a_very_long_file_name_that_would_overflo…]] وجنبه زرار Open بنفسجي.

---

## ٥. التجربة: من غير Expanded حوالين النص

~~~dart
    const Text('a_very_long_file_name_that_would_overflow_any_phone_screen.pdf', overflow: TextOverflow.ellipsis),
~~~

في Chrome بعرض 411: الاسم مكتوب لحد ما الشاشة خلصت، وعلى الحافة اليمين شريط مخطط أصفر وأسود، ومكتوب جنبه بالطول بخط أحمر صغير [[RIGHT OVERFLOWED BY 48 PIXELS]] (الشاشة قطعت آخره). والزرار اختفى. والـ console:

~~~text Chrome console (جزء)
══╡ EXCEPTION CAUGHT BY RENDERING LIBRARY ╞═════════════════════════════════════════════════════════
The following assertion was thrown during layout:
A RenderFlex overflowed by 48 pixels on the right.

The relevant error-causing widget was:
  Row Row:file:///w/app/lib/main.dart:30:19

The overflowing RenderFlex has an orientation of Axis.horizontal.
The edge of the RenderFlex that is overflowing has been marked in the rendering with a yellow and
black striped pattern. This is usually caused by the contents being too big for the RenderFlex.
Consider applying a flex factor (e.g. using an Expanded widget) to force the children of the
RenderFlex to fit within the available space instead of being sized to their natural size.
...
  constraints: BoxConstraints(0.0<=w<=411.0, 0.0<=h<=744.0)
  size: Size(411.0, 80.0)
~~~

نقراها:

- [[A RenderFlex overflowed by 48 pixels on the right]]: العيال محتاجين 48 pixel أكتر من عرض الـ Row.
- [[The relevant error-causing widget was]]: الملف والسطر والعمود اللي فيه الـ Row ([[main.dart:30:19]] في ملف التجربة بتاعي).
- [[Consider applying a flex factor (e.g. using an Expanded widget)]]: الرسالة نفسها بتقولك الحل.
- [[constraints: BoxConstraints(0.0<=w<=411.0, ...)]]: الـ Row نفسه أخد حدود من أبوه: عرض لحد 411. يعني المشكلة مش في الـ Row، في العيال.

ليه حصل كده؟ في المرحلة الأولى النص بقى «مش flex»، فالـ Row قاسه بعرض **غير محدود**. فالنص قال «أنا محتاج عرضي كله في سطر واحد»، و ellipsis مبتعملش حاجة لأنه شايف المكان مفتوح. وفي المرحلة التانية مفضلش حاجة للزرار، فالـ Expanded بتاعه خد عرض صفر. (في widget test: عرض الزرار [[w=0.0]].)

---

## ٦. التجربة: [[flex: 1]] للنص

~~~text flutter test
text x=24.0 y=14.0 w=193.5 h=20.0   button x=217.5 y=0.0 w=193.5 h=48.0
~~~

387 ÷ 2 = 193.5 لكل واحد. الأيقونة مش داخلة في القسمة.

---

## ٧. خطأين هتقابلهم مع Expanded

### ListView جوه Column

~~~text flutter test
Vertical viewport was given unbounded height.
~~~

الـ Column بيدّي العيال ارتفاع غير محدود، والـ ListView عايز يملى ارتفاع محدود. والخطأ ده جرّ وراه 14 error في نفس الاختبار. الحل: [[Expanded(child: ListView(...))]].

### Expanded جوه Padding جوه Row

~~~text flutter test
Incorrect use of ParentDataWidget.
~~~

Expanded لازم يبقى **ابن مباشر** لـ Row أو Column. الصح: [[Expanded(child: Padding(...))]].

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Expanded(child: ...)]] | خد من الفاضي واملاه كله |
| [[flex: n]] | نصيبك n أجزاء (الافتراضي 1) |
| [[Flexible]] | زي Expanded بس مش لازم تملى نصيبك |
| ترتيب القياس | اللي مش flex الأول بحجمه الطبيعي، وبعدين الباقي يتقسم |
| شريط أصفر وأسود | عيال Row أعرض منه: حط النص الطويل في Expanded |
| [[ellipsis]] | بيشتغل بس لما العرض محدود |`,
          lines: [
            "صف.",
            "العناصر.",
            "أيقونة بحجمها الطبيعي.",
            "النص ياخد من المساحة الفاضية...",
            "...٣ أجزاء من ٤.",
            "ومعاه عرض محدود، فيقدر يقص نفسه ويحط ... في الآخر.",
            "قفلة.",
            "الزرار ياخد الجزء الرابع (flex الافتراضي 1)...",
            "...ويتمط على عرض نصيبه.",
            "قفلة.",
            "قفلة الـ children.",
            "قفلة الصف."
          ],
          sol: R`لما تشيل الـ Expanded من حوالين النص: شريط أصفر وأسود مخطط على الحافة اليمين (أو الشمال في RTL)، ومكتوب عليه الرقم، وفي الترمنال رسالة زي [[A RenderFlex overflowed by 48 pixels on the right.]] (الرقم ده من Chrome بعرض 411، وعندك هيختلف حسب عرض الشاشة والخط). لاحظ إن [[TextOverflow.ellipsis]] مبقاش بيعمل حاجة: النص خد عرض غير محدود، فشايف إن فيه مكان لكل الحروف ومش محتاج يقص. والزرار اختفى: الـ Expanded بتاعه خد عرض صفر، لأن مفيش مساحة فاضلة أصلًا يتقسم عليها.

ولما ترجّع الـ Expanded وتخلي flex بتاع النص 1: النص والزرار بياخدوا نفس العرض بالظبط (نص المساحة بعد الأيقونة لكل واحد؛ على شاشة عرضها 411 كانوا 193.5 و 193.5). ومع flex 3 كانوا 290.3 للنص و 96.8 للزرار، يعني ٣ لـ ١ بالظبط. الأيقونة مش داخلة في القسمة لأنها اتقاست الأول بحجمها الطبيعي.

الغلط الشائع إنك تحل الـ overflow بإنك تحط [[width]] ثابت أو تصغّر الخط: هيشتغل على موبايلك ويبوظ على شاشة أصغر. Expanded (أو Flexible) هو الحل لأنه بيدّي النص «الباقي» مهما كان.`
        },
        {
          cmd: "Container و Padding",
          title: "مسافات وخلفية وحدود وحجم ثابت حوالين أي عنصر",
          desc: R`[[Padding]] مسافة جوه حوالين الابن. و [[SizedBox]] حجم ثابت أو مسافة فاضية بين عنصرين ([[SizedBox(height: 16)]]). و [[Container]] الـ div بتاع Flutter: padding و margin ولون وحدود وزوايا مدورة وحجم في widget واحد.

القاعدة: لو محتاج حاجة واحدة استخدم الـ widget بتاعها (Padding أو SizedBox أو ColoredBox). و Container لما تحتاج كذا حاجة مع بعض.`,
          example: R`Container(
  width: double.infinity,
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.black12),
    boxShadow: const [BoxShadow(blurRadius: 8, color: Colors.black26)],
  ),
  child: const Column(
    mainAxisSize: MainAxisSize.min,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [Text('Order #1042'), SizedBox(height: 8), Text('3 items, 450 EGP')],
  ),
)`,
          try: "ضيف [[color: Colors.red]] على الـ Container نفسه (جنب decoration) وشوف الـ error. وبعدين غيّر الـ margin لـ [[EdgeInsetsDirectional.only(start: 32)]] وشغّل التطبيق بالعربي.",
          flag: "script",
          deep: {
            why: "مفيش CSS في Flutter، فمفيش [[margin: 16px]] تحطها على أي عنصر. كل مسافة ولون وحدود widget بيلف العنصر. Container و Padding و SizedBox هم الأدوات اللي هتبني بيها أي كارت.",
            how: R`Container مش render object لوحده: هو widget مجمّع، build بتاعه بيرجّع Padding و DecoratedBox و ConstrainedBox وغيرهم حسب اللي انت حاطه. عشان كده [[Padding]] لوحده أخف وأوضح لما مش محتاج غيره.

[[EdgeInsets.all(16)]] من كل ناحية، و [[symmetric(horizontal:, vertical:)]]، و [[only(left: 8)]]. وفي تطبيق عربي استخدم [[EdgeInsetsDirectional.only(start: 8)]] عشان تتقلب مع RTL.

حجم Container من غير ابن ومن غير width و height: بياخد أكبر مساحة متاحة. ومعاه ابن: بياخد على قد الابن. ولو حطيت width وهو جوه حاجة بتفرض حجم (زي ابن مباشر للشاشة كلها)، حدود الأب بتكسب، ودا سبب «حطيت width: 100 ومش بيسمع».

[[color]] و [[decoration]] مع بعض error: [[Cannot provide both a color and a decoration]]. حط اللون جوه BoxDecoration.

و [[SizedBox]] بقيمة ثابتة widget const رخيص جدًا، ودا الأحسن للمسافات بين العناصر (أو [[spacing]] في Row و Column).`,
            when: "كارت، أو badge، أو خلفية ملونة بحدود. و Padding لوحده للمسافات. و SizedBox للفراغات والأحجام الثابتة.",
            mistakes: R`Container في كل حتة حتى لو محتاج padding بس. و [[color]] مع [[decoration]] في نفس الوقت. و [[EdgeInsets.only(left: ...)]] في تطبيق عربي فالمسافة تطلع في الناحية الغلط.`
          },
          teach: R`## الكود بيعمل إيه؟

كارت طلب: صندوق أبيض بزوايا مدورة وحدود رفيعة وضل، بعيد عن حواف الشاشة، وجواه عنوان وتحته تفاصيل. كله [[Container]] واحد. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: widget tests قاست الكارت والنصوص على شاشة 411×800، وجربت تعديلات «جرّب»، وفتحته في Chrome بـ [[flutter run -d web-server]].

---

## ١. الحجم: [[width: double.infinity]]

~~~dart
Container(
  width: double.infinity,
~~~

- [[double.infinity]]: «لانهاية». معناها هنا «خد أكبر عرض الأب يسمح بيه». مش هيبقى لانهاية فعلًا، هيقف عند حدود الأب (عرض الشاشة).

---

## ٢. المسافات: [[margin]] و [[padding]]

~~~dart
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
  padding: const EdgeInsets.all(16),
~~~

- [[margin]]: مسافة **بره** الصندوق (بينه وبين اللي حواليه). و [[padding]]: مسافة **جوه** الصندوق (بين حدوده والمحتوى).
- [[EdgeInsets]]: ٤ أرقام للـ ٤ نواحي:

| الشكل | معناه |
|---|---|
| [[EdgeInsets.all(16)]] | 16 من كل ناحية |
| [[EdgeInsets.symmetric(horizontal: 16, vertical: 8)]] | 16 يمين وشمال، و 8 فوق وتحت |
| [[EdgeInsets.only(left: 8)]] | ناحية واحدة |
| [[EdgeInsetsDirectional.only(start: 8)]] | زي only بس بـ start و end، فبتتقلب في العربي |

- [[const]]: القيم ثابتة، فالـ object يتعمل مرة واحدة.

---

## ٣. الشكل: [[BoxDecoration]]

~~~dart
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.black12),
    boxShadow: const [BoxShadow(blurRadius: 8, color: Colors.black26)],
  ),
~~~

| الخاصية | معناها |
|---|---|
| [[color: Colors.white]] | الخلفية. ولما فيه decoration، اللون جواها مش على Container |
| [[BorderRadius.circular(12)]] | الـ ٤ زوايا مدورة بنص قطر 12 |
| [[Border.all(color: Colors.black12)]] | حدود من الـ ٤ نواحي، سُمكها الافتراضي 1. و [[black12]] أسود شفافيته حوالي ١٢٪ (رمادي فاتح) |
| [[BoxShadow(blurRadius: 8, ...)]] | ضل، و [[blurRadius]] قد إيه مِبَهّت. و [[black26]] أسود حوالي ٢٦٪ |
| [[boxShadow:]] | لستة (قوسين مربعين) لأن ممكن تحط أكتر من ضل |

---

## ٤. المحتوى

~~~dart
  child: const Column(
    mainAxisSize: MainAxisSize.min,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [Text('Order #1042'), SizedBox(height: 8), Text('3 items, 450 EGP')],
  ),
~~~

- [[mainAxisSize: MainAxisSize.min]]: العمود على قد النصين بس (السطر ده اتضاف للمثال بعد التجربة، تحت ليه).
- [[CrossAxisAlignment.start]]: النصين من بداية السطر مش في النص.
- [[SizedBox(height: 8)]]: صندوق فاضي ارتفاعه 8، يعني مسافة بين النصين.

---

## ٥. القياس الحقيقي

حطيت الكارت [[body]] بتاع Scaffold:

~~~text flutter test (شاشة 411×800، كتبت جنب كل رقم هو بتاع إيه)
Container (بالـ margin)  x=0.0   y=0.0   w=411.0  h=98.0
الصندوق الأبيض          x=16.0  y=8.0   w=379.0  h=82.0
Order #1042             x=33.0  y=25.0
3 items, 450 EGP        x=33.0  y=53.0
~~~

- الصندوق الأبيض بيبدأ عند 16 من الشمال و 8 من فوق: دا الـ margin.
- عرضه 411 − 16 − 16 = 379.
- النص عند x=33 مش 32: الـ margin 16 + الـ border 1 + الـ padding 16. الـ Container بيضيف سُمك الحدود للـ padding عشان المحتوى ميركبش عليها.
- الارتفاع 82: 1 + 16 + 20 (نص) + 8 (SizedBox) + 20 (نص) + 16 + 1.

### من غير [[MainAxisSize.min]] (المثال قبل التعديل)

~~~text flutter test
الصندوق الأبيض  x=16.0 y=8.0 w=379.0 h=784.0
~~~

الكارت اتمط لآخر الشاشة: 800 − 8 − 8 = 784. الـ Scaffold بيدّي الـ body حدود **loose** (من 0 لحد الشاشة؛ Chrome طبع لـ body تحت AppBar [[BoxConstraints(0.0<=w<=411.0, 0.0<=h<=744.0)]])، والـ Column الافتراضي بياخد أقصى ارتفاع مسموح. جوه [[ListView]] الكارت كان 82 حتى من غير التعديل، لأن الـ ListView بيدّي ارتفاع غير محدود فالـ Column بياخد على قده. بس الكارت لازم يبان صح في أي مكان، فاتضاف السطر.

---

## ٦. Container من جوه

سجّلت الـ widgets اللي الـ Container ده بناها جواه:

~~~text flutter test
Padding, ConstrainedBox, DecoratedBox, Padding, Column
~~~

| الـ widget | جه منين |
|---|---|
| [[Padding]] الأولاني | [[margin]] |
| [[ConstrainedBox]] | [[width: double.infinity]] |
| [[DecoratedBox]] | [[decoration]] |
| [[Padding]] التاني | [[padding]] (ومعاه سُمك الـ border) |
| [[Column]] | [[child]] |

يعني Container مش بيرسم حاجة بنفسه: بيجمّع widgets صغيرة حسب اللي انت حاطه. عشان كده لو محتاج مسافة بس، [[Padding]] لوحده أوضح.

### و [[width]] مش دايمًا بيسمع

[[Container(width: 100, height: 100, color: Colors.red)]]:

~~~text flutter test
body بتاع Scaffold   w=100.0  h=100.0
home على طول         w=411.0  h=800.0
~~~

الـ body حدوده loose فالـ 100 اتطبقت. إنما [[home]] بيدّي ابنه حدود **tight** (لازم الشاشة كلها بالظبط)، وحدود الأب دايمًا بتكسب.

---

## ٧. التجارب في «جرّب»

### [[color]] و [[decoration]] مع بعض

~~~text flutter test
Cannot provide both a color and a decoration.
The color argument is just a shorthand for "decoration: BoxDecoration(color: color)".
To use both a color and other decoration properties, set the color in the BoxDecoration instead.
'package:flutter/src/widgets/container.dart':
Failed assertion: line 277 pos 10: 'color == null || decoration == null'
~~~

- مفيش compile error. دا **assert**: فحص بيشتغل في debug بس، وبيضرب لحظة ما الـ Container يتعمل.
- [[color]] اختصار لـ [[decoration: BoxDecoration(color: ...)]]، فمينفعش الاتنين. حط اللون جوه BoxDecoration.

### [[EdgeInsetsDirectional.only(start: 32)]]

حطيته margin على Container بعرض [[double.infinity]]، مرة بـ [[TextDirection.ltr]] ومرة [[rtl]]:

~~~text flutter test
ltr  x=32.0  w=379.0
rtl  x=0.0   w=379.0
~~~

في الإنجليزي المسافة شمال (x بيبدأ من 32)، وفي العربي يمين (الصندوق لازق في الشمال وبيخلص عند 379). عشان كده في تطبيق عربي استخدم Directional.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[margin]] | مسافة بره |
| [[padding]] | مسافة جوه (والـ border بيتضاف عليها) |
| [[BoxDecoration]] | اللون والزوايا والحدود والضل |
| [[color]] مع [[decoration]] | assert error: اللون جوه الـ decoration |
| [[width]] و [[height]] | طلب، وحدود الأب بتكسب |
| [[EdgeInsetsDirectional]] | start و end بدل left و right |`,
          lines: [
            "صندوق: زي div عليه style.",
            "ياخد العرض كله المتاح.",
            "مسافة بره الصندوق: ١٦ يمين وشمال و٨ فوق وتحت.",
            "مسافة جوه الصندوق حوالين المحتوى.",
            "الشكل: لما تستخدم decoration، اللون بيتحط جواها مش على Container.",
            "خلفية بيضا.",
            "زوايا مدورة.",
            "حدود رفيعة.",
            "ضل خفيف.",
            "قفلة الـ decoration.",
            "المحتوى: عمود.",
            "على قد النصين بس: من غيرها العمود بياخد كل الارتفاع المتاح والكارت يتمط لآخر الشاشة.",
            "النصوص من البداية.",
            "عنوان، ومسافة ٨ فاضية، وتفاصيل.",
            "قفلة العمود.",
            "قفلة الصندوق."
          ],
          sol: R`مع [[color: Colors.red]] جنب decoration الكود بيترجم عادي (مفيش compile error)، بس أول ما الشاشة تتبني في debug بتطلع الشاشة الحمرا ومعاها في الترمنال: [[Failed assertion: ... 'color == null || decoration == null': Cannot provide both a color and a decoration.]] وبعدها [[The color argument is just a shorthand for "decoration: BoxDecoration(color: color)".]]. يعني color نفسها بتتحول لـ BoxDecoration، فمينفعش اتنين. الحل: اللون جوه الـ BoxDecoration (وهو أصلًا هناك: [[Colors.white]]). وفي release الـ asserts مش بتشتغل، فمتعتمدش إن حد هيشوفها غيرك.

و [[EdgeInsetsDirectional.only(start: 32)]]: في تطبيق إنجليزي الكارت بيبعد 32 من الشمال، وفي العربي بيبعد 32 من اليمين وبيلزق في الشمال (في widget test بـ [[TextDirection.rtl]] الكارت كان من 0 لـ 768 على شاشة عرضها 800، وفي ltr من 32 لـ 800). عشان تشوف ده في تطبيقك: [[locale: const Locale('ar')]] مع [[flutter_localizations]] في MaterialApp، أو للتجربة السريعة لف الـ Scaffold في [[Directionality(textDirection: TextDirection.rtl, child: ...)]].

الغلط الشائع إنك تستخدم [[EdgeInsets.only(left: 32)]] وتجرّب بالإنجليزي بس، فالمسافة تطلع في الناحية الغلط عند المستخدم العربي.`
        },
        {
          cmd: "Stack",
          title: "عناصر فوق بعض: badge على أيقونة أو نص على صورة",
          desc: R`[[Stack]] بيحط الـ children فوق بعض، أول واحد تحت وآخر واحد فوق. و [[Positioned]] بيثبت ابن في مكان من حواف الـ Stack ([[top]] و [[bottom]] و [[left]] و [[right]]). زي [[position: relative]] على الأب و [[absolute]] على الابن في CSS.

اللي من غير Positioned بيتحط حسب [[alignment]] بتاع الـ Stack (الافتراضي أول الزاوية اللي فوق). و [[PositionedDirectional]] بـ start و end عشان RTL.`,
          example: R`Stack(
  clipBehavior: Clip.none,
  children: [
    const Icon(Icons.shopping_cart, size: 32),
    PositionedDirectional(
      top: -4,
      end: -6,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
        child: const Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
  ],
)`,
          try: "شيل [[clipBehavior: Clip.none]] وشوف الـ badge اتقص. وبعدين اعمل صورة وتحتها نص أبيض على شريط أسود نص شفاف بـ [[Positioned(left: 0, right: 0, bottom: 0, child: ...)]].",
          flag: "script",
          deep: {
            why: "Row و Column بيرصوا جنب بعض، مش فوق بعض. أي تصميم فيه طبقات (رقم على أيقونة السلة، نص فوق صورة، زرار عايم فوق خريطة) محتاج Stack.",
            how: R`حجم الـ Stack بيتحدد من العيال اللي مش Positioned: بياخد حجم أكبر واحد فيهم. الـ Positioned مش بيأثر على الحجم، عشان كده لو كل العيال Positioned الـ Stack بياخد أكبر مساحة متاحة.

[[Positioned(top: 0, left: 0, right: 0)]] يعني لازق فوق وعلى العرض كله. و [[Positioned.fill]] يملى الـ Stack كله (مفيد لطبقة تدرج فوق صورة). و [[PositionedDirectional]] بيستخدم start و end عشان RTL.

[[clipBehavior]] الافتراضي [[Clip.hardEdge]]: أي حاجة طالعة بره حدود الـ Stack بتتقص. و [[Clip.none]] بيسيبها تبان، بس اللمس عليها بره الحدود مش هيوصل (الـ hit testing بيقف عند حدود الأب).

و [[IndexedStack]] بيعرض ابن واحد بس من العيال بس بيحتفظ بالـ state بتاع الكل، ودا اللي بيتعمل بيه bottom navigation من غير ما كل تاب يرجع من الأول.`,
            when: "badge، ونص على صورة، و loading overlay فوق الشاشة، وعناصر عايمة. لو الحاجات جنب بعض: Row و Column مش Stack.",
            mistakes: R`تبني layout كامل بـ Stack و Positioned بأرقام ثابتة زي CSS absolute: هيبوظ على أي شاشة بحجم مختلف. وتحط Positioned جوه حاجة مش Stack فيطلع error. وزرار طالع بره الـ Stack بـ Clip.none ومش بيستجيب للمس.`
          },
          teach: R`## الكود بيعمل إيه؟

أيقونة سلة، وفوق ركنها دايرة حمرا صغيرة فيها رقم 3 (badge)، طالعة شوية بره حدود الأيقونة. الحاجتين **فوق بعض**، فدا شغل [[Stack]] مش Row. اتجرّب على Flutter 3.44.0 في [[ghcr.io/cirruslabs/flutter:stable]]: في Chrome بـ [[flutter run -d web-server]] (كبّرت الـ Stack ٤ مرات بـ [[Transform.scale]] عشان التفاصيل تبان في الصورة)، و widget tests قاست الأماكن على شاشة 411×800، والـ solCode اتجرّب بصورة في الذاكرة.

---

## ١. [[Stack(clipBehavior: Clip.none, children: [...])]]

~~~dart
Stack(
  clipBehavior: Clip.none,
  children: [
~~~

- [[Stack]]: بيحط العيال فوق بعض. **أول** واحد في اللستة تحت خالص، و**آخر** واحد فوق خالص.
- [[clipBehavior]]: يعمل إيه في الحاجات اللي طالعة بره حدوده. الافتراضي [[Clip.hardEdge]] (يقصها). و [[Clip.none]]: سيبها تبان.

---

## ٢. الطبقة الأولى: الأيقونة

~~~dart
    const Icon(Icons.shopping_cart, size: 32),
~~~

أيقونة سلة مقاسها 32×32. هي الوحيدة **مش Positioned**، فهي اللي بتحدد حجم الـ Stack.

---

## ٣. الطبقة التانية: الـ badge

~~~dart
    PositionedDirectional(
      top: -4,
      end: -6,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
        child: const Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
~~~

- [[PositionedDirectional]]: ثبّت الابن ده بمسافة من حواف الـ Stack. نسخة Directional يعني بـ [[start]] و [[end]] بدل left و right، فبتتقلب في العربي. (والعادي [[Positioned]] بـ [[top]] و [[bottom]] و [[left]] و [[right]].)
- [[top: -4]]: حافته اللي فوق على بعد 4 **فوق** حافة الـ Stack (الرقم السالب = بره).
- [[end: -6]]: آخره طالع 6 بره ناحية النهاية (يمين في الإنجليزي، شمال في العربي).
- [[Container]]: [[padding]] 4 حوالين الرقم، و [[BoxShape.circle]] يخلي الخلفية دايرة بدل مستطيل.
- [[TextStyle(color: Colors.white, fontSize: 10)]]: الرقم أبيض وخطه صغير.

---

## ٤. القياس

الـ Stack في نص الشاشة ([[Center]]):

~~~text flutter test (شاشة 411×800، رتّبتهم تحت بعض)
stack  x=189.5  y=384.0  w=32.0  h=32.0
icon   x=189.5  y=384.0  w=32.0  h=32.0
badge  x=209.3  y=380.0  w=18.3  h=22.0
~~~

- الـ Stack نفس مقاس الأيقونة بالظبط (32×32). الـ badge مش داخل في الحساب لأنه Positioned.
- الـ badge بيبدأ عند y=380، يعني 4 فوق الـ Stack (384).
- آخر الـ badge: 209.3 + 18.3 = 227.6، وآخر الـ Stack: 189.5 + 32 = 221.5. يعني طالع 6 من اليمين (الفرق في الكسر تقريب).

وبالعربي ([[TextDirection.rtl]]):

~~~text flutter test
rtl badge x=183.5
~~~

بقى على الشمال: بيبدأ 6 قبل بداية الـ Stack (189.5 − 6 = 183.5). دا اللي [[end]] عمله.

---

## ٥. التجربة: من غير [[Clip.none]]

في Chrome (مكبّر ٤ مرات):

- **مع** [[Clip.none]]: الدايرة الحمرا كاملة فوق ركن السلة، وفيها 3.
- **من غير**: الدايرة مقصوصة من فوق ومن اليمين، وبتبان نص دايرة لازقة في حافة الأيقونة، والرقم مقطوع.

مفيش أي error ولا warning: [[Clip.hardEdge]] قص كل حاجة بره الـ 32×32 بهدوء.

> و Clip.none بيخلي الشكل يبان بس، اللمس على الجزء اللي بره الحدود مش بيوصل (الـ hit testing بيقف عند حدود الـ Stack). الكلام ده من الـ docs.

---

## ٦. الـ solCode: صورة وتحتها شريط

~~~dart
    return Stack(
      children: [
        Image(image: image, width: double.infinity, height: 200, fit: BoxFit.cover),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: Colors.black54,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Text(caption, style: const TextStyle(color: Colors.white)),
          ),
        ),
      ],
    );
~~~

- [[final ImageProvider image]]: مصدر الصورة: [[NetworkImage(url)]] من النت، أو [[AssetImage]] من ملفات التطبيق، أو [[MemoryImage]] من bytes.
- [[Image(... width: double.infinity, height: 200, fit: BoxFit.cover)]]: الصورة بعرض المتاح وارتفاع 200. و [[BoxFit.cover]]: كبّرها لحد ما تغطي المساحة كلها، ولو النسبة مختلفة يتقص الزيادة (زي [[object-fit: cover]] في CSS). وهي مش Positioned، فهي اللي بتحدد حجم الـ Stack.
- [[Positioned(left: 0, right: 0, bottom: 0)]]: لازق في الشمال واليمين وتحت، فعرضه = عرض الـ Stack، ومفيش [[top]]، فارتفاعه على قد محتواه.
- [[Colors.black54]]: أسود شفافيته حوالي ٥٤٪، فالصورة باينة تحته.
- [[EdgeInsets.symmetric(horizontal: 12, vertical: 8)]]: مسافة جوه الشريط.

جربته بصورة صغيرة في الذاكرة ([[MemoryImage]]) وكابشن [[Cairo, Egypt]]:

~~~text flutter test (شاشة 411×800)
stack  x=0.0  y=0.0    w=411.0  h=200.0
image  x=0.0  y=0.0    w=411.0  h=200.0
bar    x=0.0  y=164.0  w=411.0  h=36.0
~~~

- الـ Stack قد الصورة بالظبط (411×200).
- الشريط بعرض الصورة كله، وارتفاعه 36 = 8 + 20 (النص) + 8، ولازق تحت: 200 − 36 = 164.

### Positioned بره Stack

حطيت [[Positioned]] جوه Column:

~~~text flutter test
Incorrect use of ParentDataWidget.
~~~

نفس الخطأ بتاع Expanded بره Row: Positioned بيكلّم أبوه المباشر، ولازم يكون Stack.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Stack]] | العيال فوق بعض، الأول تحت والأخير فوق |
| حجم الـ Stack | من العيال اللي مش Positioned |
| [[Positioned(top:, left:, ...)]] | مسافات من حواف الـ Stack، والسالب = بره |
| [[PositionedDirectional]] | start و end عشان RTL |
| [[clipBehavior: Clip.none]] | متقصّش اللي طالع بره (بس اللمس عليه مش هيوصل) |
| [[left: 0, right: 0, bottom: 0]] | شريط بالعرض كله لازق تحت |`,
          lines: [
            "طبقات فوق بعض.",
            "متقصّش اللي طالع بره حدود الـ Stack (الـ badge طالع شوية).",
            "الطبقات من تحت لفوق.",
            "الأيقونة: أول طبقة، وهي اللي بتحدد حجم الـ Stack.",
            "الـ badge مثبّت، و Directional عشان يتقلب في RTL.",
            "٤ فوق الحافة.",
            "وطالع شوية من ناحية النهاية (يمين في الإنجليزي، شمال في العربي).",
            "الدايرة الحمرا.",
            "مسافة جواها.",
            "شكل دايرة بلون أحمر.",
            "الرقم بخط صغير أبيض.",
            "قفلة الـ Container.",
            "قفلة الـ Positioned.",
            "قفلة الطبقات.",
            "قفلة الـ Stack."
          ],
          sol: R`لما تشيل [[clipBehavior: Clip.none]]: الدايرة الحمرا بتتقص من فوق ومن الجنب، وتبان كأنها ربع أو نص دايرة لازقة في ركن الأيقونة. لأن الـ Stack حجمه على قد الأيقونة بس (32×32)، والـ badge بـ [[top: -4]] و [[end: -6]] طالع بره الحدود دي، والافتراضي [[Clip.hardEdge]] بيقص أي حاجة بره. مفيش error ولا warning، الشكل بس اللي بيبوظ، ودا اللي بيخلي الغلطة دي تعدّي كتير.

الصورة بالشريط: الـ Stack فيه الصورة كأول طبقة (ودي اللي بتحدد حجمه)، وفوقها Positioned بـ [[left: 0, right: 0, bottom: 0]] من غير top. كده الشريط لازق تحت، وعرضه قد الصورة بالظبط، وارتفاعه على قد النص والـ padding. واللون [[Colors.black54]] أسود بشفافية حوالي ٥٤٪. (في widget test الصورة كانت 800×200 والشريط من y=164 لـ 200 بعرض 800.)

الغلط الشائع: تنسى [[left: 0, right: 0]] وتكتب [[bottom: 0]] بس، فالشريط ياخد عرض النص بس ويلزق في الركن. أو تحط [[top: 0]] كمان فالشريط يتمط على الصورة كلها.`,
          solCode: R`import 'package:flutter/material.dart';

class CaptionedImage extends StatelessWidget {
  const CaptionedImage({super.key, required this.image, required this.caption});

  final ImageProvider image;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Image(image: image, width: double.infinity, height: 200, fit: BoxFit.cover),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: Colors.black54,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Text(caption, style: const TextStyle(color: Colors.white)),
          ),
        ),
      ],
    );
  }
}

// الاستخدام:
// const CaptionedImage(image: NetworkImage('https://picsum.photos/600/400'), caption: 'Cairo, Egypt')`
        }
      ]
    }
]);
