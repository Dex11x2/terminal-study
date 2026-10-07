// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
    {
      t: "الستايل و flexbox",
      l: 1,
      n: "StyleSheet، و flexbox بافتراضات مختلفة عن الويب، و Platform والأبعاد، و NativeWind لو بتحب Tailwind",
      items: [
        {
          cmd: "StyleSheet",
          title: "StyleSheet: CSS من غير cascade ولا selectors",
          desc: R`الستايل في RN objects بأسماء camelCase ([[backgroundColor]] مش [[background-color]])، والأرقام من غير وحدة (بتتحسب dp)، وفيه نسب مئوية كـ string ([['50%']]). [[StyleSheet.create]] بيجمعهم في مكان واحد تحت الـ component، وبيدّيك autocomplete وفحص للأنواع.

مفيش cascade ولا selectors ولا [[:hover]] ولا media queries. كل عنصر بياخد ستايله صريح. وعشان تدمج: array [[style={[styles.base, active && styles.active]}]]، والأخير بيكسب.`,
          example: R`import { StyleSheet, Text, View } from 'react-native';

export function Badge({ label, tone = 'info' }: { label: string; tone?: 'info' | 'danger' }) {
  return (
    <View style={[styles.badge, tone === 'danger' && styles.danger]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#dbeafe',
  },
  danger: { backgroundColor: '#fee2e2' },
  text: { fontSize: 12, fontWeight: '600', color: '#1e293b' },
});`,
          try: R`شيل [[alignSelf: 'flex-start']] وشوف الـ badge بقى عرضه قد إيه. وبعدين جرّب تكتب [[padding: '10px']] أو [['background-color': 'red']] وشوف TypeScript قال إيه.`,
          flag: "script",
          deep: {
            why: R`لو جاي من CSS، أول أسبوع هتدوّر على الـ cascade والـ classes. فهم إن كل حاجة صريحة ومحلية بيوفّر وقت، وبيوضّح ليه الـ design system في RN بيتعمل كـ components (Button و Card و AppText) مش كـ classes.`,
            how: R`[[StyleSheet.create]] في RN الحديث بيرجّع نفس الـ object تقريبًا (مبقاش فيه تحويل لأرقام IDs زي زمان)، فالفايدة الأساسية: الأنواع، والتنظيم، وإن الـ object بيتعمل مرة واحدة برّه الـ render. الـ inline style [[style={{...}}]] شغال عادي ومش كارثة في الأداء، بس بيتعمل object جديد كل render.

الأسماء: [[paddingHorizontal]] و [[paddingVertical]] و [[marginHorizontal]] اختصارات مش موجودة في CSS. والـ shorthand زي [[border: '1px solid red']] مش موجود: [[borderWidth]] و [[borderColor]] و [[borderStyle]]. والظل: [[boxShadow]] (string زي CSS، مدعوم من 0.76 على الـ New Architecture) أو القديم [[shadowColor]]/[[elevation]].

[[StyleSheet.hairlineWidth]] أرفع خط الشاشة تقدر ترسمه. و [[StyleSheet.absoluteFill]] اختصار لـ [[position: 'absolute']] بكل الحواف 0.

الـ theme (فاتح/غامق): [[useColorScheme()]] بيرجّع [['light']] أو [['dark']]، وبتختار ألوانك منه. والقالب فيه [[use-theme]] hook بيعمل كده.`,
            when: R`StyleSheet للستايلات الثابتة، و inline للحاجات اللي بتتحسب (عرض من state، لون من prop). ولو الفريق بيحب Tailwind: NativeWind (آخر درس في الـ category دي).`,
            mistakes: R`[[fontSize: '16px']] أو [[padding: '10px']]: غلط، أرقام بس. وتستنى [[color]] على [[View]] يأثّر على الـ Text اللي جواه: مفيش وراثة. و [[margin: 'auto']] للتوسيط: استخدم [[alignItems]] و [[justifyContent]].`
          },
          teach: R`## الفكرة: الستايل objects، والدمج array

[[Badge]] شارة صغيرة (pill) بنوعين ألوان. الستايلات متجمعة تحت في [[StyleSheet.create]]، والـ component بيختار منها، ولو النوع [['danger']] بيضيف ستايل فوق الأساسي. مفيش classes ولا cascade: كل عنصر ستايله مكتوب عليه صريح.

> اتجرّب على Expo SDK 57 على الويب في Chrome في صندوق عرضه 300، و [[npx tsc --noEmit]] للأخطاء.

---

## ١. [[export function Badge({ label, tone = 'info' }: { label: string; tone?: 'info' | 'danger' })]]

- [[tone = 'info']]: قيمة افتراضية. لو مبعتش [[tone]] بيبقى [['info']].
- [[tone?: 'info' | 'danger']]: النوع union: القيمة لازم واحدة من الاتنين دول بالظبط. لو كتبت [[tone="warning"]]، TypeScript يطلّع خطأ.

---

## ٢. [[<View style={[styles.badge, tone === 'danger' && styles.danger]}>]]

[[style]] هنا array:

1. [[styles.badge]]: الأساسي، دايمًا.
2. [[tone === 'danger' && styles.danger]]: لو danger النتيجة [[styles.danger]]، غير كده [[false]]، و RN بيتجاهل الـ [[false]].

الدمج من الشمال لليمين، واللي بعد بيكسب: [[styles.danger]] فيه [[backgroundColor]] بس، فبيغيّر اللون ويسيب الباقي زي ما هو.

---

## ٣. [[<Text style={styles.text}>{label}</Text>]]

النص ليه ستايل لوحده. لو حطيت [[color]] على الـ View، النص **مش** هياخده: View مبيورّثش.

---

## ٤. [[const styles = StyleSheet.create({ ... })]]

برّه الـ component، فالـ object بيتعمل مرة واحدة مش مع كل render. و [[StyleSheet.create]] بيخلي TypeScript يفحص كل ستايل.

### [[badge]]

| الخاصية | معناها |
|---|---|
| [[alignSelf: 'flex-start']] | العنصر ده بالذات ميتمدّش بعرض أبوه، ياخد قد محتواه |
| [[paddingHorizontal: 10]] | padding يمين وشمال (اختصار مش موجود في CSS) |
| [[paddingVertical: 4]] | padding فوق وتحت |
| [[borderRadius: 999]] | رقم أكبر من نص الارتفاع = الطرفين نص دايرة (pill) |
| [[backgroundColor: '#dbeafe']] | أزرق فاتح |

### [[danger]] و [[text]]

- [[danger: { backgroundColor: '#fee2e2' }]]: أحمر فاتح.
- [[text: { fontSize: 12, fontWeight: '600', color: '#1e293b' }]]: خط صغير تقيل، لونه رمادي غامق.

---

## ٥. القياس

~~~text الناتج (Chrome، الأب عرضه 300 وفيه padding 10)
<Badge label="جديد" />:                width=43    height=24   bg=rgb(219, 234, 254)   padding=4px 10px   radius=999px
<Badge label="ملغي" tone="danger" />:  width=48.1  height=24   bg=rgb(254, 226, 226)
النص:                                  font-size=12px   font-weight=600   color=rgb(30, 41, 59)
~~~

- العرض 43 = 10 + عرض كلمة «جديد» (حوالي 23) + 10. الارتفاع 24 = 4 + 16 (سطر النص) + 4.
- الـ danger أخد اللون الأحمر بس، والـ padding والـ radius زي ما هما.

على الويب كمان RN بيحوّل كل ستايل لـ CSS class صغيرة (زي [[r-alignSelf-k200y]])، بس ده تفصيلة داخلية: انت مبتكتبش classes.

---

## ٦. التجربة الأولى: من غير [[alignSelf]]

~~~text الناتج (Chrome)
width=280   height=24
~~~

280 = 300 − 10 − 10، يعني اتمدّ بعرض أبوه كله. ليه؟ الأب View عمودي، و [[alignItems]] الافتراضي [[stretch]]: كل ولد بيتمدّ على المحور التاني (العرض). [[alignSelf]] بيكسر القاعدة دي للعنصر ده بس.

---

## ٧. التجربة التانية: ستايل غلط و TypeScript

كتبت الستايلات دي في ملف وشغّلت [[npx tsc --noEmit]] ([[--noEmit]] = افحص الأنواع بس، متطلّعش ملفات):

~~~text الكود
a: { padding: '10px' },
b: { 'background-color': 'red' },
c: { fontWeight: 700 },
d: { fontSize: '16px' },
~~~

~~~text الناتج
BadBadge.tsx(4,8): error TS2322: Type '"10px"' is not assignable to type 'DimensionValue | undefined'.
BadBadge.tsx(5,8): error TS2353: Object literal may only specify known properties, and ''background-color'' does not exist in type 'ViewStyle | ImageStyle | TextStyle'.
BadBadge.tsx(7,8): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

| السطر | ليه |
|---|---|
| [[padding: '10px']] | [[DimensionValue]] = رقم، أو نسبة string زي [['50%']]، أو [['auto']]. مفيش px |
| [['background-color']] | الخاصية مش موجودة. الاسم [[backgroundColor]] |
| [[fontWeight: 700]] | **مفيش خطأ**: النوع بيقبل 100 لحد 900 رقم أو string |
| [[fontSize: '16px']] | [[fontSize]] رقم بس |

و [[(4,8)]] يعني سطر 4 حرف 8 في الملف.

---

## الخلاصة

| CSS | React Native |
|---|---|
| [[background-color]] | [[backgroundColor]] |
| [[padding: 10px]] | [[padding: 10]] |
| [[padding: 4px 10px]] | [[paddingVertical: 4, paddingHorizontal: 10]] |
| [[class="badge danger"]] | [[style={[styles.badge, isDanger && styles.danger]}]] |
| وراثة من الأب | مفيش (إلا Text جوه Text) |
| [[:hover]] و media queries | مفيش: [[pressed]] و [[useWindowDimensions]] |`,
          lines: [
            "StyleSheet من react-native.",
            "badge بنوعين ألوان.",
            "بيرجّع JSX.",
            R`array ستايلات: الأساسي، والـ danger لو الشرط صح ([[false]] بيتجاهل).`,
            "النص.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة.",
            "كل الستايلات في مكان واحد برّه الـ component.",
            "الـ badge.",
            "ميتمدّش بعرض الأب: ياخد قد محتواه.",
            "padding يمين وشمال.",
            "padding فوق وتحت.",
            "رقم كبير = pill كاملة.",
            "لون الخلفية.",
            "قفلة.",
            "اللون البديل.",
            "ستايل النص (مش بيتورث من الـ View).",
            "قفلة."
          ],
          sol: R`من غير [[alignSelf: 'flex-start']] الـ badge بيتمدّ بعرض الأب كله، لأن افتراضي [[alignItems]] في RN هو [[stretch]] (زي الويب في flex column). [[alignSelf]] بيخلي العنصر ده بالذات ياخد قد محتواه.

[[padding: '10px']]: TypeScript بيقول إن النوع مش متوافق مع [[DimensionValue]]، ولو شغّلته من غير typecheck الـ padding مش هيتطبق. و [[background-color]]: TS بيقول إن الخاصية مش موجودة في [[ViewStyle]] (Object literal may only specify known properties).`
        },
        {
          cmd: "flexbox في RN",
          title: "flexbox في RN: column افتراضي و flex: 1",
          desc: R`كل [[View]] في RN هو flex container من غير ما تكتب [[display: flex]]، والفرق عن الويب في الافتراضيات: [[flexDirection]] افتراضيًا [[column]] (مش row)، و [[alignContent]] [[flex-start]]، و [[flexShrink]] 0. و [[flex: 1]] معناها «خد كل المساحة الفاضية» وده أكتر سطر هتكتبه.

باقي الـ properties زي CSS: [[justifyContent]] على المحور الأساسي، و [[alignItems]] على المحور التاني، و [[gap]] و [[flexWrap]] و [[position: 'absolute']].`,
          example: R`import { Text, View } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <Text>رجوع</Text>
        <Text style={{ fontWeight: '600' }}>سارة</Text>
        <Text>⋯</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: '#f1f5f9' }} />
      <View style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
        <View style={{ flex: 1, height: 44, borderRadius: 22, backgroundColor: '#e2e8f0' }} />
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563eb' }} />
      </View>
    </View>
  );
}`,
          try: R`شيل [[flex: 1]] من أول View (الجذر) وشوف الشاشة. وبعدين شيله من الـ View الرمادي في النص. وأخيرًا غيّر الـ footer لـ [[flexDirection: 'column']] وشوف إيه اللي اتكسر.`,
          flag: "script",
          deep: {
            why: R`كل layout في RN flexbox، مفيش grid ولا float. أغلب مشاكل «الشاشة فاضية» أو «العنصر مش ظاهر» سببها [[flex: 1]] ناقص في مكان، أو إنك متوقع row والافتراضي column.`,
            how: R`الـ layout بيتحسب بـ Yoga (مكتبة C++ من Meta بتطبق flexbox). [[flex: 1]] في RN مش زي [[flex: 1]] في CSS بالظبط: رقم موجب يعني [[flexGrow]] بالرقم ده و [[flexBasis: 0]]، و [[flexShrink]] بيفضل على الافتراضي 0 (ده من كود Yoga نفسه؛ على الويب react-native-web بيحوّلها [[flex: 1 1 0%]])، فالعناصر اللي عليها flex بتتقسم المساحة الفاضية بالنسبة (1 و 2 يعني تلت وتلتين).

عشان [[flex: 1]] تشتغل، الأب لازم يكون ليه حجم. الجذر بتاع الشاشة بياخد حجم الشاشة من الـ navigator، فأول View لازم [[flex: 1]] عشان يمدّ، وإلا ارتفاعه قد محتواه، والولد اللي عليه [[flex: 1]] جوه أب ارتفاعه صفر = صفر.

[[position: 'absolute']] بيطلّع العنصر من الـ flow، ومكانه بالنسبة للأب المباشر (مفيش حاجة اسمها relative لازم تكتبها، كل حاجة relative افتراضيًا). و [[zIndex]] شغال بين الإخوات.

على الـ RTL: [[flexDirection: 'row']] بيتقلب لوحده لما التطبيق يبقى RTL، وده من أهم مزايا RN مع العربي (درس RTL في المستوى ٢).`,
            when: R`دايمًا. القاعدة العملية: الشاشة [[flex: 1]]، والجزء اللي بيتمدّ (المحتوى، أو الـ list) [[flex: 1]]، والباقي (header و footer) حجمه ثابت أو قد محتواه.`,
            mistakes: R`تنسى [[flex: 1]] على الجذر فالشاشة فاضية أو الـ list مش بتعمل scroll. وتكتب [[display: 'flex']] (ملهاش لازمة) أو [[display: 'grid']] (مش موجود). وتستخدم [[width: '100%']] في row عشان عنصر ياخد الباقي: ده بيزق التاني برّه الشاشة، الصح [[flex: 1]]. و [[height: '100%']] جوه ScrollView: مفيش ارتفاع ثابت تتحسب منه النسبة.`
          },
          teach: R`## الفكرة: شاشة شات = ٣ صفوف، واحد منهم بيتمدّ

الشاشة مقسومة: header ارتفاعه ثابت فوق، ومنطقة الرسايل في النص بتاخد كل اللي فاضل، و footer تحت قد محتواه. كل ده بـ flexbox، ومن غير ما تكتب [[display: flex]] لأن كل View أصلًا flex.

> اتجرّب على Expo SDK 57 على الويب في Chrome بشاشة 390×844 (من غير header للـ navigator)، وكل الأرقام من [[getBoundingClientRect]]. الـ layout على الموبايل بيتحسب بمكتبة Yoga بنفس القواعد.

---

## ١. الجذر: [[<View style={{ flex: 1 }}>]]

[[flex: 1]] معناها «خد كل المساحة الفاضية عند أبوك». أبو أول View في الشاشة هو الـ navigator (أو الشاشة نفسها)، فالجذر بياخد الشاشة كلها.

### [[flex: 1]] بالظبط إيه؟

| | [[flexGrow]] | [[flexShrink]] | [[flexBasis]] |
|---|---|---|---|
| RN على الموبايل (Yoga) | 1 | 0 | 0 |
| react-native-web (اتقاست) | 1 | 1 | 0% |

الأهم [[flexBasis: 0]]: العنصر بيبدأ من حجم صفر على المحور الأساسي، وبعدين [[flexGrow]] بيدّيله نصيبه من المساحة الفاضية. فـ [[flex: 1]] و [[flex: 2]] جنب بعض = تلت وتلتين.

---

## ٢. الـ header

~~~text ChatScreen.tsx
<View style={{ height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
~~~

| الخاصية | معناها هنا |
|---|---|
| [[height: 56]] | ارتفاع ثابت |
| [[flexDirection: 'row']] | الأولاد جنب بعض. المحور الأساسي بقى الأفقي |
| [[alignItems: 'center']] | على المحور **التاني** (الرأسي هنا): في النص |
| [[justifyContent: 'space-between']] | على المحور **الأساسي** (الأفقي): أول واحد على طرف، وآخر واحد على الطرف التاني، والباقي متوزع بينهم |
| [[paddingHorizontal: 16]] | 16 يمين وشمال |

وجواه ٣ [[Text]]: «رجوع»، و «سارة» بخط [[fontWeight: '600']]، و «⋯» (زرار قايمة).

---

## ٣. منطقة الرسايل: [[<View style={{ flex: 1, backgroundColor: '#f1f5f9' }} />]]

[[flex: 1]] تاني: خد كل اللي فاضل بعد الـ header والـ footer. و [[/>]] في الآخر يعني View فاضي من غير أولاد (هنا مكان الرسايل، في التطبيق الحقيقي FlatList).

---

## ٤. الـ footer

~~~text ChatScreen.tsx
<View style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
  <View style={{ flex: 1, height: 44, borderRadius: 22, backgroundColor: '#e2e8f0' }} />
  <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563eb' }} />
</View>
~~~

- row، ومسافة 8 بين الاتنين، و padding 8.
- خانة الكتابة [[flex: 1]]: خد العرض الباقي.
- زرار الإرسال [[width: 44]]: ثابت. و [[borderRadius: 22]] نص الـ 44 = دايرة.
- مفيش ارتفاع للـ footer نفسه: قد محتواه.

---

## ٥. القياس

~~~text الناتج (Chrome، 390x844)
root:    y=0    w=390  h=844
header:  y=0    w=390  h=56
mid:     y=56   w=390  h=728
footer:  y=784  w=390  h=60
input:   x=8    y=792  w=322  h=44
send:    x=338  y=792  w=44   h=44
~~~

| الرقم | جه منين |
|---|---|
| mid = 728 | 844 − 56 (header) − 60 (footer) |
| footer = 60 | 8 + 44 + 8 |
| input = 322 | 390 − 8 − 8 (padding) − 8 (gap) − 44 (الزرار) |
| send x = 338 | 8 + 322 + 8 |

---

## ٦. التجربة: شيل [[flex: 1]] من ٣ أماكن

~~~text من غير flex: 1 على الجذر
root:    h=116
header:  y=0   h=56
mid:     y=56  h=0
footer:  y=56  h=60
~~~

الجذر بقى طوله قد محتواه (56 + 0 + 60 = 116). مفيش مساحة فاضية، فالـ mid بـ [[flexBasis: 0]] فضل صفر، والـ footer طلع لفوق تحت الـ header على طول.

~~~text من غير flex: 1 على الـ mid
root:    h=844
mid:     y=56  h=0
footer:  y=56  h=60
~~~

الجذر لسه 844، بس مفيش حد بياخد الفاضي: الـ footer لزق في الـ header، وتحته 728 فاضيين.

~~~text الـ footer بـ flexDirection: 'column'
footer:  y=776  h=68
input:   x=8  y=784  w=374  h=0
send:    x=8  y=792  w=44   h=44
~~~

خانة الكتابة **اختفت** (ارتفاعها 0) مع إن مكتوب [[height: 44]]. ليه؟ [[flex: 1]] بيشتغل على المحور الأساسي، وفي column المحور الأساسي هو الارتفاع. فـ [[flexBasis: 0]] كسب على [[height]]، والـ footer ارتفاعه قد محتواه فمفيش مساحة فاضية تكبر فيها. وفي نفس الوقت عرضها بقى 374 (اتمدّت بـ [[stretch]] على المحور التاني)، والزرار نزل تحتها عند x=8. و 68 = 8 + 0 + 8 (gap) + 44 + 8.

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| الافتراضي [[column]] مش [[row]] | عكس الويب |
| [[justifyContent]] = المحور الأساسي، [[alignItems]] = التاني | بيتبدلوا لما [[flexDirection]] يتغير |
| [[flex: 1]] على الجذر | من غيره مفيش مساحة فاضية يتوزع منها |
| [[flex: 1]] على الجزء اللي بيتمدّ بس | الـ header والـ footer حجمهم ثابت أو قد محتواهم |
| [[flex: 1]] في row لعنصر ياخد الباقي | مش [[width: '100%']] اللي بيزق التاني برّه |`,
          lines: [
            "الـ components.",
            "شاشة شات.",
            "بيرجّع JSX.",
            "الجذر ياخد الشاشة كلها.",
            "header: ارتفاع ثابت، و row، والعناصر في النص رأسيًا ومتوزعة أفقيًا.",
            "يمين/شمال حسب اتجاه اللغة.",
            "العنوان.",
            "زرار القايمة.",
            "قفلة الـ header.",
            R`منطقة الرسايل: [[flex: 1]] تاخد كل اللي فاضل.`,
            "footer: row بمسافة بين العناصر.",
            "خانة الكتابة تاخد العرض الباقي.",
            "زرار الإرسال عرضه ثابت.",
            "قفلة الـ footer.",
            "قفلة الجذر.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`من غير [[flex: 1]] على الجذر: الـ header والـ footer يظهروا ورا بعض فوق، والمنطقة الرمادية تختفي (ارتفاعها صفر)، لأن الجذر بقى ارتفاعه قد محتواه، فمفيش «مساحة فاضية» يوزعها.

من غير [[flex: 1]] على الـ View الرمادي: الـ footer يطلع لتحت الـ header على طول وتحته فراغ أبيض.

و الـ footer بـ [[column]]: الزرار ينزل تحت، وخانة الكتابة تختفي (على الويب اتقاست ارتفاعها 0 مع إن مكتوب [[height: 44]])، لأن [[flex: 1]] بقى على المحور الرأسي: [[flexBasis: 0]] بيلغي الـ height، والـ footer ارتفاعه قد محتواه فمفيش مساحة فاضية تكبر فيها. وده بيوضّح إن [[flex]] بيشتغل على المحور الأساسي بس.`
        },
        {
          cmd: "Platform و الأبعاد",
          title: "Platform.OS و useWindowDimensions: كود لكل نظام وكل شاشة",
          desc: R`[[Platform.OS]] بيقولك [['ios']] ولا [['android']] ولا [['web']]، و [[Platform.select({ ios: ..., android: ..., default: ... })]] بيختار قيمة. ولو الفرق كبير، اعمل ملفين: [[Button.ios.tsx]] و [[Button.android.tsx]]، و Metro هيختار المناسب لوحده.

ومفيش media queries: [[useWindowDimensions()]] بيدّيك [[width]] و [[height]] و [[fontScale]]، وبيتحدث لما الشاشة تلف أو تتقسم، فتعمل layout مختلف للتابلت بـ if عادي.`,
          example: R`import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export function ProductGrid({ names }: { names: string[] }) {
  const { width, fontScale } = useWindowDimensions();
  const columns = width >= 768 ? 3 : 2;
  const itemWidth = (width - 16 * (columns + 1)) / columns;
  return (
    <View style={styles.grid}>
      {names.map((n) => (
        <View key={n} style={[styles.card, { width: itemWidth }]}>
          <Text numberOfLines={fontScale > 1.3 ? 2 : 1}>{n}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16 },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
      default: { boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
    }),
  },
});`,
          try: R`شغّل التطبيق على الويب ([[w]] في expo start) وصغّر وكبّر نافذة المتصفح: عدد الأعمدة بيتغير؟ وبعدين كبّر حجم الخط من إعدادات الموبايل (Accessibility) وشوف [[fontScale]].`,
          flag: "script",
          deep: {
            why: R`«كود واحد» مش معناه «مفيش فروق». الظل، وشكل الـ header، والكيبورد، والصلاحيات بيختلفوا. وفيه تابلت وموبايلات صغيرة ومستخدمين مكبّرين الخط لأقصى حد. لازم تعرف تتعامل مع ده من غير ما تكرر الشاشة.`,
            how: R`[[Platform]] ثابت وقت التشغيل، و Metro بيعمل dead-code elimination للـ [[Platform.OS === 'ios']] في الـ build بتاع Android. وامتدادات الملفات: [[.ios.tsx]] و [[.android.tsx]] و [[.native.tsx]] (الاتنين) و [[.web.tsx]]، و الـ import بيكون من غير الامتداد ([[import { Button } from './Button']]). القالب نفسه فيه [[app-tabs.web.tsx]] و [[app-tabs.tsx]] بالشكل ده.

[[useWindowDimensions]] أحسن من [[Dimensions.get('window')]] لأنه hook وبيعمل re-render لما الحجم يتغير (تلف الشاشة، أو split screen، أو الويب). [[fontScale]] حجم الخط اللي المستخدم اختاره: لو 1.5 يبقى كل [[fontSize]] بيتضرب في 1.5 تلقائيًا، فالتصميم لازم يستحمل.

الظل: iOS بيستخدم [[shadow*]]، و Android القديم [[elevation]]، و [[boxShadow]] الجديد (string زي CSS) شغال على الاتنين مع الـ New Architecture، فممكن تبسّط لـ [[boxShadow]] بس لو مش هتدعم حاجة قديمة.`,
            when: R`[[Platform.select]] للفروق الصغيرة (ظل، padding، behavior الكيبورد). ملفات [[.ios]]/[[.android]] للفروق الكبيرة. و [[useWindowDimensions]] لأي layout بيتغير مع الحجم.`,
            mistakes: R`[[Dimensions.get('window')]] برّه الـ component: القيمة بتتحسب مرة ومش بتتحدث. و [[if (Platform.OS === 'ios')]] منتشرة في كل حتة بدل ما تتجمع في component واحد. و [[allowFontScaling={false}]] على كل النصوص عشان التصميم ميبوظش: كده بتكسر الـ accessibility لناس محتاجاها فعلًا، الأحسن [[maxFontSizeMultiplier]].`
          },
          teach: R`## الفكرة: grid بيعدّ أعمدته من عرض الشاشة، وظل لكل نظام

[[ProductGrid]] بيعرض أسامي منتجات في كروت: عمودين على الموبايل و ٣ على التابلت. مفيش media queries، فبنسأل عن العرض بـ [[useWindowDimensions]] ونحسب بـ JavaScript عادي. والظل بيختلف بين iOS و Android، فبنختار بـ [[Platform.select]].

> اتجرّب على Expo SDK 57 على الويب في Chrome: فتحت الصفحة بعرض 390، وبعدين غيّرت حجم النافذة لـ 768 و 767 وقست الكروت. على الويب [[Platform.OS]] بـ [['web']]، فظل iOS و Android من الـ docs.

---

## ١. الـ import

[[Platform]] و [[StyleSheet]] و [[Text]] و [[useWindowDimensions]] و [[View]]، كلهم من [[react-native]].

---

## ٢. [[const { width, fontScale } = useWindowDimensions();]]

[[useWindowDimensions()]] hook بيرجّع object فيه:

| الخاصية | معناها |
|---|---|
| [[width]] و [[height]] | مقاس النافذة بالـ dp |
| [[scale]] | كام بكسل حقيقي في الـ dp الواحد (2 أو 3 على أغلب الموبايلات) |
| [[fontScale]] | حجم الخط اللي المستخدم اختاره في الإعدادات (1 = عادي) |

وكلمة hook معناها إن الـ component بيعمل re-render لوحده لما المقاس يتغير (تلف الموبايل، أو split screen، أو تصغّر نافذة المتصفح). إحنا فكّينا [[width]] و [[fontScale]] بس.

---

## ٣. [[const columns = width >= 768 ? 3 : 2;]]

768 أو أعرض (تابلت) = ٣ أعمدة، أصغر = ٢.

---

## ٤. [[const itemWidth = (width - 16 * (columns + 1)) / columns;]]

من جوه لبرة:

1. [[columns + 1]]: عدد المسافات. ٢ عمود = ٣ مسافات (شمال، وبينهم، ويمين).
2. [[16 * (...)]]: كل مسافة 16، فده مجموعهم.
3. [[width - ...]]: العرض الباقي للكروت.
4. [[/ columns]]: نصيب الكارت الواحد.

---

## ٥. الـ JSX

- [[{names.map((n) => ( ... ))}]]: كارت لكل اسم.
- [[style={[styles.card, { width: itemWidth }]}]]: الستايل الثابت + العرض المحسوب. ده المكان الطبيعي للـ inline style: قيمة بتتحسب.
- [[key={n}]]: الاسم نفسه مفتاح (لازم يكونوا مش متكررين).
- [[numberOfLines={fontScale > 1.3 ? 2 : 1}]]: لو الخط مكبّر أكتر من 1.3 مرة اسمح بسطرين، غير كده سطر.

---

## ٦. الستايلات

### [[grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16 }]]

row، و [[flexWrap: 'wrap']]: لما الصف يتملى، الكارت اللي بعده ينزل سطر جديد. ده grid بسيط من غير [[display: grid]] (مش موجود في RN).

### [[...Platform.select({ ... })]]

~~~text ProductGrid.tsx
...Platform.select({
  ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  android: { elevation: 3 },
  default: { boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
}),
~~~

1. [[Platform.select({...})]]: بيرجّع القيمة بتاعة النظام اللي شغال دلوقتي. على iOS الـ object الأول، على Android التاني، وعلى أي حاجة تانية (الويب) [[default]].
2. [[...]] (spread): يفرد خصايص الـ object اللي رجع جوه ستايل [[card]]، كأنك كاتبها بإيدك.

| النظام | الظل | الخصايص |
|---|---|---|
| iOS | لون وشفافية ونعومة وإزاحة | [[shadowColor]] و [[shadowOpacity]] و [[shadowRadius]] و [[shadowOffset]] |
| Android (القديم) | رقم بيقول العنصر «عالي» قد إيه | [[elevation]] |
| الويب (و iOS و Android مع الـ New Architecture) | string زي CSS | [[boxShadow]] |

---

## ٧. القياس

~~~text الناتج (Chrome)
عرض 390:  info="web 390x844 fontScale=1"   ٦ كروت في ٣ صفوف   عرض الكارت 171      x = 16, 203
عرض 768:  info="web 768x1024 fontScale=1"  ٦ كروت في صفين     عرض الكارت 234.66   x = 16, 267, 517
عرض 767:  info="web 767x1024 fontScale=1"  ٦ كروت في ٣ صفوف   عرض الكارت 359.5    x = 16, 392
box-shadow في الكل: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px
~~~

نحسبهم بالمعادلة:

| العرض | الأعمدة | (العرض − 16 × (الأعمدة + 1)) ÷ الأعمدة |
|---|---|---|
| 390 | 2 | (390 − 48) ÷ 2 = 171 |
| 768 | 3 | (768 − 64) ÷ 3 = 234.67 |
| 767 | 2 | (767 − 48) ÷ 2 = 359.5 |

- بكسل واحد (767 لـ 768) قلب الـ layout، ومن غير reload: [[useWindowDimensions]] عمل re-render.
- [[x = 16, 203]]: 16 padding، والكارت التاني عند 16 + 171 + 16.
- [[Platform.OS]] على الويب [['web']]، فـ [[Platform.select]] اختار [[default]] والظل جه من [[boxShadow]].
- [[fontScale=1]] على الويب دايمًا تقريبًا. على الموبايل لما تكبّر الخط من الإعدادات بيبقى 1.3 أو أكتر (من الـ docs).

---

## ٨. لو الفرق كبير: ملفات لكل نظام

بدل [[Platform.select]] في كل حتة، تعمل [[Button.ios.tsx]] و [[Button.android.tsx]] (أو [[Button.web.tsx]] و [[Button.tsx]])، وتستورد [[from './Button']] من غير امتداد، و Metro بيختار. القالب نفسه فيه [[app-tabs.tsx]] و [[app-tabs.web.tsx]] بالشكل ده.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تعرف النظام | [[Platform.OS]]: [['ios']] أو [['android']] أو [['web']] |
| قيمة مختلفة لكل نظام | [[Platform.select({ ios, android, default })]] |
| component مختلف خالص | ملفات [[.ios.tsx]] و [[.android.tsx]] و [[.web.tsx]] |
| layout حسب المقاس | [[useWindowDimensions()]] جوه الـ component، مش [[Dimensions.get]] برّه |
| احترام حجم الخط | [[fontScale]]، ومتقفلش [[allowFontScaling]] |`,
          lines: [
            "كل الأدوات من react-native.",
            "grid منتجات.",
            "عرض الشاشة ومقياس الخط، وبيتحدثوا لوحدهم.",
            "تابلت 3 أعمدة، وموبايل 2.",
            "عرض الكارت: العرض ناقص المسافات ومقسوم على الأعمدة.",
            "بيرجّع JSX.",
            "الـ grid.",
            "لكل اسم.",
            "كارت بالعرض المحسوب.",
            "لو الخط كبير نسمح بسطرين.",
            "قفلة الكارت.",
            "قفلة الـ map.",
            "قفلة الـ grid.",
            "قفلة الـ return.",
            "قفلة الدالة.",
            "الستايلات.",
            R`row و [[flexWrap]] بيعمل grid بسيط.`,
            "الكارت.",
            "padding.",
            "زوايا.",
            "خلفية.",
            R`نفرد قيمة [[Platform.select]] جوه الستايل.`,
            "ظل iOS.",
            "ظل Android.",
            R`الويب وأي حاجة تانية: [[boxShadow]].`,
            "قفلة.",
            "قفلة الكارت.",
            "قفلة."
          ],
          sol: R`على الويب: لما النافذة 768 أو أعرض بيبقى ٣ أعمدة، وأصغر بيبقى ٢، والكروت بتتظبط مع كل تغيير في الحجم من غير reload، لأن [[useWindowDimensions]] بيعمل re-render.

ولما تكبّر الخط من الإعدادات، [[fontScale]] بيبقى أكبر من 1 (مثلًا 1.3 أو 1.5)، والنص بيكبر في كل التطبيق تلقائيًا، وأسماء المنتجات بتاخد سطرين بدل ما تتقص من أولها. لو شفت [[fontScale]] 1 دايمًا على الويب ده طبيعي، المتصفح مش بيبعته بنفس الطريقة.`
        },
        {
          cmd: "NativeWind",
          title: "NativeWind: تكتب classes بتاعة Tailwind في React Native",
          desc: R`لو بتحب Tailwind في «تاب HTML و CSS» أو في مشاريع Next، [[NativeWind]] بيخليك تكتب [[className="flex-1 items-center bg-white dark:bg-slate-900"]] على components الـ RN، وبيحوّلها لـ style objects وقت الـ build.

النسخة المستقرة وقت كتابة الدرس (سبتمبر 2026) هي 4.x ومبنية على Tailwind v3، ونسخة 5 (مبنية على Tailwind v4) لسه release candidate. الإعداد محتاج babel و metro و tailwind config، فاتبع صفحة الـ installation بتاعة النسخة اللي هتركّبها بالظبط.`,
          example: R`// بعد إعداد NativeWind 4 (tailwind.config.js و global.css و babel و metro)
import { Pressable, Text, View } from 'react-native';

export function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-white p-6 dark:bg-slate-900">
      <Text className="text-lg font-semibold text-slate-900 dark:text-white">مفيش نتايج</Text>
      <Pressable onPress={onRetry} className="rounded-xl bg-blue-600 px-5 py-3 active:opacity-70">
        <Text className="font-semibold text-white">جرّب تاني</Text>
      </Pressable>
    </View>
  );
}`,
          try: R`اكتب نفس الكومبوننت بـ [[StyleSheet]] من غير NativeWind، وقارن: كام سطر؟ وإيه اللي محتاج تعمله بإيدك عشان [[dark:]] و [[active:]] يشتغلوا؟`,
          flag: "script",
          deep: {
            why: R`فرق كتير بيستخدموا Tailwind على الويب، و NativeWind بيخليهم يشاركوا نفس الـ design tokens (الألوان، والمسافات) ونفس طريقة التفكير بين الموقع والتطبيق.`,
            how: R`NativeWind بيحوّل الـ classes لـ style objects (جزء وقت الـ build بـ babel و metro، وجزء وقت التشغيل للحاجات اللي بتتغير زي [[dark:]] و [[active:]] والـ breakpoints). وبيضيف [[className]] كـ prop على components الـ RN عن طريق TypeScript declaration ([[nativewind-env.d.ts]]).

مش كل Tailwind شغال: أي حاجة ملهاش مقابل في RN (grid، و hover على الموبايل، وبعض الـ selectors) مش هتشتغل أو ليها بديل. و [[active:]] بيشتغل على Pressable. والـ breakpoints ([[md:]]) بتتحسب من عرض الشاشة.

جربته على الويب بس (nativewind 4.2.7 و tailwindcss 3.4 مع Expo SDK 57)، والـ classes اتطبقت بنفس قيم نسخة StyleSheet بالظبط، بس الوضع الغامق احتاج ظبط (التفاصيل في «الشرح خطوة بخطوة»). على الموبايل متجربش، والإعداد بيختلف بين 4 و 5، فالمرجع صفحة التركيب الرسمية لنسختك.`,
            when: R`فريق بيستخدم Tailwind أصلًا، أو monorepo فيه موقع Tailwind. لو الفريق مرتاح لـ StyleSheet أو عنده design system كـ components، مش لازم تضيف طبقة تانية. وفيه بدايل تانية بنفس الفكرة زي Unistyles و Tamagui.`,
            mistakes: R`تركّب 4 وتتبع docs بتاعة 5 أو العكس. وتنسى تضيف الملفات في [[content]] بتاع tailwind config فالـ classes مش بتتطبق من غير أي error. وتتوقع كل class من الويب يشتغل. وتخلط [[className]] و [[style]] على نفس العنصر وتستغرب مين كسب.`
          },
          teach: R`## الفكرة: نفس الشاشة، مرة بـ classes ومرة بـ StyleSheet

[[EmptyState]] شاشة «مفيش نتايج» فيها عنوان وزرار «جرّب تاني»، في نص الشاشة، وليها شكل غامق. المثال مكتوب بـ NativeWind ([[className]] بتاع Tailwind)، والـ solCode نفس الشاشة بـ [[StyleSheet]]. هنفك الـ classes واحدة واحدة ونقابل كل واحدة بالستايل اللي بتتحول له.

> اتجرّب على Expo SDK 57 على الويب في Chrome: الـ solCode زي ما هو، والمثال بعد ما ركّبت nativewind 4.2.7 و tailwindcss 3.4.19 بخطوات صفحة التركيب. على Android و iOS متجربش (من الـ docs).

---

## ١. الإعداد (اللي التعليق في أول المثال بيتكلم عنه)

NativeWind مش بيشتغل بمجرد التسطيب. دي الملفات اللي عملتها:

~~~text الملفات
tailwind.config.js    content: ['./src/**/*.{js,jsx,ts,tsx}'] و presets: [require('nativewind/preset')]
global.css            @tailwind base; @tailwind components; @tailwind utilities;
babel.config.js       presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel']
metro.config.js       withNativeWind(getDefaultConfig(__dirname), { input: './global.css' })
nativewind-env.d.ts   /// <reference types="nativewind/types" />
src/app/_layout.tsx   import '../../global.css';
~~~

- [[content]]: الملفات اللي Tailwind بيدوّر فيها على أسامي الـ classes. لو ملفك مش فيها، الـ classes بتاعته مش هتتطبق ومن غير أي error.
- [[jsxImportSource: 'nativewind']]: بيخلي JSX يعدّي على NativeWind، وده اللي بيخلي [[className]] على [[View]] يشتغل.
- [[nativewind-env.d.ts]]: بيعرّف TypeScript إن [[className]] prop مقبول. وأول تشغيل لـ [[expo start]] ضافه لوحده في [[tsconfig.json]]:

~~~text الناتج
NativeWind made the following changes to your project to support TypeScript:
  - Updated ./tsconfig.json to include the nativewind-env.d.ts file
~~~

و TypeScript 6 اشتكى من [[import '../../global.css']] (TS2882: مش لاقي تعريف لملف css)، فضفت [[declare module "*.css";]] في نفس الملف. بعدها [[npx tsc --noEmit]] عدّى.

---

## ٢. الـ View: [[className="flex-1 items-center justify-center gap-3 bg-white p-6 dark:bg-slate-900"]]

| الـ class | بيتحول لـ | في الـ solCode |
|---|---|---|
| [[flex-1]] | [[flex: 1]] | [[box.flex]] |
| [[items-center]] | [[alignItems: 'center']] | نفسه |
| [[justify-center]] | [[justifyContent: 'center']] | نفسه |
| [[gap-3]] | [[gap: 12]] (كل وحدة في Tailwind = 4) | [[gap: 12]] |
| [[p-6]] | [[padding: 24]] | [[padding: 24]] |
| [[bg-white]] | [[backgroundColor: '#fff']] | لون الـ light |
| [[dark:bg-slate-900]] | نفس الخلفية بس لما الوضع غامق: [['#0f172a']] | [[dark ? '#0f172a' : '#fff']] |

[[dark:]] اسمه variant: «طبّق الـ class دي بس في الحالة دي».

---

## ٣. العنوان: [[className="text-lg font-semibold text-slate-900 dark:text-white"]]

- [[text-lg]]: [[fontSize: 18]] (ومعاها [[lineHeight: 28]]).
- [[font-semibold]]: [[fontWeight: '600']].
- [[text-slate-900]] و [[dark:text-white]]: اللون في الوضعين.

---

## ٤. الزرار

~~~text EmptyState.tsx
<Pressable onPress={onRetry} className="rounded-xl bg-blue-600 px-5 py-3 active:opacity-70">
  <Text className="font-semibold text-white">جرّب تاني</Text>
</Pressable>
~~~

| الـ class | معناها |
|---|---|
| [[rounded-xl]] | [[borderRadius: 12]] |
| [[bg-blue-600]] | [[#2563eb]] |
| [[px-5]] و [[py-3]] | [[paddingHorizontal: 20]] و [[paddingVertical: 12]] |
| [[active:opacity-70]] | [[opacity: 0.7]] وانت ضاغط. ده بديل [[style={({ pressed }) => ...}]] |

---

## ٥. الـ solCode بـ StyleSheet

اللي NativeWind بيعمله لوحده، هنا بإيدك:

- [[const dark = useColorScheme() === 'dark';]]: [[useColorScheme()]] بيرجّع [['light']] أو [['dark']] حسب إعداد الجهاز، و [[dark]] بقى boolean.
- [[style={[styles.box, { backgroundColor: dark ? '#0f172a' : '#fff' }]}]]: الستايل الثابت + اللون حسب الوضع.
- [[style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}]]: بديل [[active:]].
- [[StyleSheet.create]] تحت فيه نفس القيم اللي في الجدول.

---

## ٦. القياس: النسختين جنب بعض

~~~text الناتج (Chrome، 390x844)
                 StyleSheet (solCode)        NativeWind (المثال)
الخلفية          rgb(255, 255, 255)          rgb(255, 255, 255)
padding / gap    24px / 12px                 24px / 12px
العنوان          18px، 600، rgb(15, 23, 42)   18px، 600، rgb(15, 23, 42)، line-height 28px
الزرار           -                           rgb(37, 99, 235)، padding 12px 20px، radius 12px
وقت الضغط        opacity 0.7                 opacity 0.7
الوضع الغامق      الخلفية rgb(15, 23, 42) والعنوان أبيض
~~~

- الضغطتين على «جرّب تاني» زوّدوا العداد 2 في الاتنين.
- على الويب، NativeWind بيحط الـ classes نفسها في الصفحة ([[class="... rounded-xl bg-blue-600 px-5 py-3 active:opacity-70"]]) و CSS حقيقي. على الموبايل بيحوّلها style objects (من الـ docs).

### الوضع الغامق: فرق لقيته في التجربة

- نسخة StyleSheet: لما المتصفح بقى dark، الألوان اتقلبت على طول.
- NativeWind بالإعداد الافتراضي ([[darkMode: 'media']]): [[dark:]] اشتغل مع وضع النظام، بس الصفحة رمت وقت التحميل [[Cannot manually set color scheme, as dark mode is type 'media'. Please use StyleSheet.setFlag('darkMode', 'class')]]، و Expo في وضع التطوير غطى الصفحة بطبقة الأخطاء فالزرار مبقاش بيستقبل ضغط.
- مع [[darkMode: 'class']] في [[tailwind.config.js]]: الخطأ راح والضغط و [[active:]] اشتغلوا، بس [[dark:]] مبقاش يتبع النظام لوحده على الويب، لازم تقلبه انت (من [[colorScheme.set('dark')]]).

يعني الإعداد الدقيق بيفرق بين النسخ والمنصات، وده بالظبط ليه الدرس بيقولك اتبع صفحة التركيب بتاعة نسختك.

---

## الخلاصة

| | StyleSheet | NativeWind |
|---|---|---|
| إعداد | مفيش | ٥ ملفات + import |
| الوضع الغامق | [[useColorScheme()]] وتختار اللون بإيدك | [[dark:]] |
| وقت الضغط | [[style]] دالة بـ [[pressed]] | [[active:]] |
| الطول | أطول (ستايلات تحت) | أقصر (كله على العنصر) |
| مشاركة مع موقع Tailwind | لأ | نفس الـ classes والألوان |

الاتنين بيوصلوا لنفس الستايل في الآخر. اختار NativeWind لو الفريق بيكتب Tailwind أصلًا.`,
          lines: [
            "نفس components الـ RN.",
            "empty state.",
            "بيرجّع JSX.",
            R`[[className]] بدل [[style]]: نفس Tailwind، و [[dark:]] للوضع الغامق.`,
            "النص.",
            R`[[active:]] بيشتغل وقت الضغط على Pressable.`,
            "نص الزرار.",
            "قفلة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`نسخة StyleSheet حوالي ٢٥ سطر بدل ١١، ولازم تعمل بنفسك: [[useColorScheme()]] عشان تختار ألوان الـ dark، و [[style={({ pressed }) => ...}]] على الـ Pressable بدل [[active:]]. وده بالظبط اللي NativeWind بيوفّره. في المقابل، StyleSheet مفيهوش أي إعداد ولا build step إضافي.`,
          solCode: R`import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

export function EmptyState({ onRetry }: { onRetry: () => void }) {
  const dark = useColorScheme() === 'dark';
  return (
    <View style={[styles.box, { backgroundColor: dark ? '#0f172a' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#0f172a' }]}>مفيش نتايج</Text>
      <Pressable onPress={onRetry} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}>
        <Text style={styles.btnText}>جرّب تاني</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  title: { fontSize: 18, fontWeight: '600' },
  btn: { borderRadius: 12, backgroundColor: '#2563eb', paddingHorizontal: 20, paddingVertical: 12 },
  btnText: { color: '#fff', fontWeight: '600' },
});`
        }
      ]
    }
]);
